'use strict';
// The parent dashboard's idle nudge, measured in a real browser.
//
// New parents who had just added a child did not know where to go next. The
// dashboard now points at the parent's NEXT step: "Add your first child" while
// there are none, then "Switch to student mode" - the same .attn-nudge shake and
// callout every other nudge uses, after 15s idle, up to 3 times per page load,
// until the parent first uses student mode.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-parent-switch-nudge.js
//
// ⚠ Served over file://, not a local http server: Chrome for Testing on this
//   machine cannot reach 127.0.0.1. ⚠ The installed Chrome must not be used for
//   headless work here - its debug port answers for the user's own tabs - so the
//   page target's URL is asserted before anything is driven.
// ⚠ Takes ~90s: the nudge waits a real 15s of idleness, five times.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9391;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const IDLE_WAIT = 16500;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); } };

(async () => {
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-switchnudge-')),
    '--allow-file-access-from-files', '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  const quit = code => { try { chrome.kill(); } catch (_) {} process.exit(code); };
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
  await call('Page.enable'); await call('Runtime.enable');
  await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  const ev = async expr => {
    const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(String(r.exceptionDetails.exception && r.exceptionDetails.exception.description || r.exceptionDetails.text).slice(0, 400));
    return r.result.value;
  };

  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof _armIdleNudge === 'function' && typeof Auth !== 'undefined'"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url + ', not the file we navigated to.'); quit(1); }
  ok('app loaded from ' + url.replace(/^.*\//, ''), ready === true);
  await sleep(2500); // let Auth.init() finish routing before we take over the screen

  // A signed-in parent with one child, on the dashboard. Only who-is-signed-in is
  // stubbed; the nudge code, the callout and the CSS are all the real thing.
  await ev(`(() => {
    Auth.getParentProfile = () => ({ id: 'p1', role: 'parent' });
    try { localStorage.clear(); } catch (_) {}
    document.querySelectorAll('div[id^="modal-"].fixed').forEach(m => m.classList.add('hidden'));
    showScreen('parent');
    document.getElementById('pd-no-children').classList.add('hidden');
    _idleCounts = {};
    _armIdleNudge('parent');
    return true;
  })()`);
  ok('the parent dashboard is the current screen', (await ev('S.currentScreen')) === 'parent');

  const state = () => ev(`(() => {
    const b = document.getElementById('pd-student-view-btn'), r = b.getBoundingClientRect();
    const c = document.getElementById('hint-callout');
    return { shaking: b.classList.contains('attn-nudge'),
             anim: getComputedStyle(b).animationName,
             callout: !!c && !c.classList.contains('hint-hidden'),
             text: document.getElementById('hint-callout-text')?.textContent || '',
             count: _idleCounts['parent:pd-student-view-btn'] || 0,
             addShaking: document.getElementById('pd-no-children-add-btn').classList.contains('attn-nudge'),
             left: r.left, right: r.right, vw: innerWidth };
  })()`);
  const idle = async () => { await ev("window.dispatchEvent(new PointerEvent('pointerdown')); true"); await sleep(IDLE_WAIT); };

  // ── 1. After 15s idle, the switch shakes and says why.
  await sleep(IDLE_WAIT);
  let s = await state();
  ok('after 15s idle the switch shakes', s.shaking, s);
  ok('with the same attnNudge animation every other nudge uses', s.anim === 'attnNudge', s.anim);
  ok('and the callout tells the parent what it is for', s.callout && /hand the device over/.test(s.text), s.text);
  ok('the shaking button stays inside a 390px phone', s.left >= 0 && s.right <= s.vw, s);

  // ── 2. Time to time: after the next idle spell it shakes again.
  await idle();
  s = await state();
  ok('it shakes again after the next idle spell', s.shaking && s.count === 2, s);

  // ── 3. But not for ever on one visit.
  await ev("_idleCounts['parent:pd-student-view-btn'] = 3; true");
  await idle();
  s = await state();
  ok('after 3 shakes on one visit it goes quiet', !s.shaking, s);

  // ── 4. Once they have used student mode, never again.
  await ev("_idleCounts = {}; _markStudentModeUsed(); true");
  await idle();
  s = await state();
  ok('a parent who has used student mode is not nudged', !s.shaking, s);
  ok('the flag is scoped to this parent', (await ev("localStorage.getItem('psac_student_mode_used:p1')")) === '1');

  // ── 5. With no children the next step is adding one, not switching.
  // ⚠ Scrolled into view first: the nudge deliberately never fires on an
  //   off-screen target (it would yank the page), and this stubbed dashboard
  //   still carries the one-child layout above the empty state.
  await ev(`(() => { localStorage.clear(); _idleCounts = {};
    document.getElementById('pd-no-children').classList.remove('hidden');
    document.getElementById('pd-no-children-add-btn').scrollIntoView({ block: 'center' }); return true; })()`);
  const why = await ev(`(() => { const a = document.getElementById('pd-no-children-add-btn');
    return { next: _parentIdleNudge()?.target, visible: _hintTargetVisible(a), inView: _inViewport(a) }; })()`);
  ok('with no children the next step is "Add your first child"', why.next === 'pd-no-children-add-btn', why);
  await idle();
  s = await state();
  ok('and that is what shakes', s.addShaking && !s.shaking, Object.assign({}, s, why));

  // ── 6. The first-child guide shakes the same way.
  await ev(`(() => { document.getElementById('pd-no-children').classList.add('hidden');
    localStorage.clear(); showStudentViewGuide(); return true; })()`);
  s = await state();
  ok('the first-child guide uses the same shake', s.shaking && s.anim === 'attnNudge', s);
  ok('and shows its own callout', await ev("!document.getElementById('pd-student-view-callout').classList.contains('hidden')"));
  await ev('dismissStudentViewGuide(); true');

  // ── 7. The real switch records that it was used.
  await ev("localStorage.clear(); Auth.switchToStudentSelect().catch(() => {}); true");
  ok('tapping Switch to student mode records it', (await ev("localStorage.getItem('psac_student_mode_used:p1')")) === '1');

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
