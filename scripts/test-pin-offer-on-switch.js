'use strict';
// Parent → child hand-over: the offer to set a Parent PIN, measured in a real
// browser.
//
// Without a PIN the only way back from a kid-only screen is 🔒 Parent → full
// email and password, on a phone, with a child waiting. The offer is made at
// the moment that cost is about to be paid.
//
// ⚠ The switch MUST happen on every path out of the box - accept, decline,
//   backdrop, ✕, Escape, and backing out of the PIN pad afterwards. A parent
//   tapped "hand this to my child"; a box that swallows that action is worse
//   than no box.
// ⚠ Auth internals are driven through the real exported entry point
//   (Auth.switchToStudentSelect), with only the things that would need a live
//   Supabase session stubbed.
//
// Run:  node scripts/test-pin-offer-on-switch.js
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const ROOT = path.resolve(__dirname, '..');
const PORT = 8827, DBG = 9367;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const name = path.resolve(ROOT, '.' + p);
  if (!name.startsWith(ROOT + path.sep) || !fs.existsSync(name) || fs.statSync(name).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(name)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(name).pipe(res);
});
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); } };

(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-pinoffer-')),
    '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  let version; for (let i = 0; i < 40 && !version; i++) { try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); } }
  if (!version) throw new Error('Chrome did not start');
  const ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let serial = 0; const waiting = new Map();
  ws.onmessage = e => { const m = JSON.parse(e.data); if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); } };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const id = ++serial, t = setTimeout(() => { waiting.delete(id); rej(Error('Timeout ' + method)); }, 30000);
    waiting.set(id, m => { clearTimeout(t); m.error ? rej(Error(m.error.message)) : res(m.result); });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const target = await send('Target.createTarget', { url: 'about:blank' });
  const session = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
  const call = (m, p) => send(m, p, session.sessionId);
  await call('Page.enable'); await call('Runtime.enable'); await call('Network.enable');
  await call('Network.setBypassServiceWorker', { bypass: true }); await call('Network.setCacheDisabled', { cacheDisabled: true });
  const ev = async expr => {
    const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(String(r.exceptionDetails.exception && r.exceptionDetails.exception.description || r.exceptionDetails.text).slice(0, 400));
    return r.result.value;
  };
  await call('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/' });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof Auth !== 'undefined' && !!Auth.switchToStudentSelect"); } catch (_) {} }
  ok('app and Auth loaded', ready === true);

  // A signed-in parent with no PIN. Only the two things that would need a live
  // Supabase session are replaced: the profiles lookup and the switch target.
  const setup = async ({ dbHash = null, dbFails = false, role = 'parent', declined = false }) => ev(`
    (async () => {
      window.__switched = 0;
      Auth.__test = Auth.__test || {};
      localStorage.clear();
      ${declined ? "localStorage.setItem('psac_pin_offer_declined_v1_p1', '1');" : ''}
      Auth.__testSetup({
        parentUser: { id: 'p1' },
        parentProfile: { id: 'p1', role: ${JSON.stringify(role)} },
        dbHash: ${JSON.stringify(dbHash)},
        dbFails: ${dbFails},
        onSwitch: () => { window.__switched++; },
      });
      return true;
    })()
  `);

  const visible = id => ev(`!document.getElementById('${id}').classList.contains('hidden')`);
  const hasHook = await ev("typeof Auth.__testSetup === 'function'");
  ok('the auth module exposes a test seam', hasHook === true);
  if (!hasHook) { console.log('\n' + checks + ' passed, ' + (failed + 1) + ' failed'); ws.close(); chrome.kill(); server.close(); process.exit(1); }

  // ── The offer appears, and only when it should.
  await setup({});
  await ev('Auth.switchToStudentSelect()');
  ok('a parent with no PIN is offered one', await visible('modal-pin-offer'));
  ok('and is NOT switched behind the box', (await ev('window.__switched')) === 0);

  await ev('Auth.pinOfferDecline()');
  ok('"Not now" closes the box', !(await visible('modal-pin-offer')));
  ok('"Not now" still performs the switch', (await ev('window.__switched')) === 1);

  // ⚠ Declining is remembered: this box sits in front of an action the parent
  // already chose, so a second showing is an obstacle, not a nudge.
  await ev('Auth.switchToStudentSelect()');
  ok('a declined offer is never shown again', !(await visible('modal-pin-offer')));
  ok('and the switch happens straight away', (await ev('window.__switched')) === 2);

  // ── Accepting leads into the PIN pad, and saving continues the switch.
  await setup({});
  await ev('Auth.switchToStudentSelect()');
  await ev('Auth.pinOfferAccept()');
  ok('"Set my PIN" closes the offer', !(await visible('modal-pin-offer')));
  ok('and opens the PIN pad', await visible('modal-parent-pin-setup'));
  ok('the switch waits for the PIN', (await ev('window.__switched')) === 0);

  await ev("['1','2','3','4','1','2','3','4'].forEach(d => Auth._pinSetupKey(d)); true;");
  ok('a matching PIN closes the pad', !(await visible('modal-parent-pin-setup')));
  ok('saving the PIN then performs the switch', (await ev('window.__switched')) === 1);
  ok('the PIN is stored scoped to this parent', !!(await ev("localStorage.getItem('psac_parent_pin_v1:p1')")));

  // A mismatched confirmation must not switch - the parent is still typing.
  // ⚠ AWAIT the switch before acting on the box. switchToStudentSelect() is
  // async (it may consult the server for an existing PIN), so firing
  // pinOfferAccept() in the same evaluation ran it before the offer existed -
  // which then left the offer modal open behind every later assertion.
  await setup({});
  await ev('Auth.switchToStudentSelect()');
  await ev('Auth.pinOfferAccept()');
  await ev("['1','1','1','1','2','2','2','2'].forEach(d => Auth._pinSetupKey(d)); true;");
  ok('a mismatched PIN keeps the pad open', await visible('modal-parent-pin-setup'));
  ok('and does not switch', (await ev('window.__switched')) === 0);

  // ⚠ Backing out of the pad still switches: they tapped "hand this to my
  // child", not "set a PIN".
  await ev('Auth.closeParentPinSetup()');
  await sleep(50);
  ok('backing out of the pad still performs the switch', (await ev('window.__switched')) === 1);

  // ⚠ And the continuation is one-shot: Settings opens the same pad, and a
  // stale one would teleport a parent editing their PIN into a child sign-in.
  await ev('Auth.openParentPinSetup(); Auth.closeParentPinSetup();');
  await sleep(50);
  ok('opening the pad from Settings never switches', (await ev('window.__switched')) === 1);

  // ── Who is not offered.
  await setup({ dbHash: 'abc123' });
  await ev('Auth.switchToStudentSelect()');
  ok('a parent who already has a PIN on the server is not offered one', !(await visible('modal-pin-offer')));
  ok('and switches straight away', (await ev('window.__switched')) === 1);

  // ⚠ A failed lookup is UNKNOWN, not "no PIN". Offering a second PIN to
  // someone who has one, because they are on a train, is worse than silence.
  await setup({ dbFails: true });
  await ev('Auth.switchToStudentSelect()');
  ok('a failed PIN lookup does not trigger the offer', !(await visible('modal-pin-offer')));
  ok('and still switches', (await ev('window.__switched')) === 1);

  // A teacher handing a tablet to a pupil is a different case with different copy.
  await setup({ role: 'teacher' });
  await ev('Auth.switchToStudentSelect()');
  ok('a teacher is not shown the parent-PIN box', !(await visible('modal-pin-offer')));
  ok('and switches straight away', (await ev('window.__switched')) === 1);

  // ── Escape and the backdrop are exits too, and must not swallow the switch.
  await setup({});
  await ev('Auth.switchToStudentSelect()');
  await ev("document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })); true;");
  ok('Escape closes the offer', !(await visible('modal-pin-offer')));
  ok('Escape still performs the switch', (await ev('window.__switched')) === 1);

  await setup({});
  await ev('Auth.switchToStudentSelect()');
  await ev("document.getElementById('modal-pin-offer').click(); true;");
  ok('a backdrop click closes the offer', !(await visible('modal-pin-offer')));
  ok('a backdrop click still performs the switch', (await ev('window.__switched')) === 1);

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close(); chrome.kill(); server.close(); process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e.message || e); process.exit(1); });
