'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  The Back button and the two hubs, measured in a REAL browser.
//
//  WHY THIS EXISTS — reported from the app: "sometimes in the chapter practice
//  section, the dropdown shows nothing, and later when we come back it
//  reappears and works normally".
//
//  The practice hub and the subject hub are the only two child screens whose
//  ENTIRE contents are painted by their own module. Every other screen is
//  painted by the render dispatch at the foot of showScreen(). So any route in
//  that was not PracticeHub.open() / SubjectHub.open() showed the screen with
//  nothing on it — and popstate is exactly such a route:
//
//      _navPopping = true;
//      try { showScreen(target); } finally { _navPopping = false; }
//
//  A child who had not opened the hub earlier in that page life (refresh
//  restored them into a subject, or they went Home → a resume tile → practice)
//  and then pressed Back landed on an empty green board: the Grade <select>
//  still held ZERO options and measured 0x0. Tapping Practice in the tab bar
//  ran open(), painted everything, and the app looked fine again — which is
//  what made it read as "sometimes".
//
//  ⚠ A Node-level check of this is circular: the harness writes the very
//    showScreen() stub whose behaviour is in question. The only way to prove it
//    is to press the real Back button, so this drives history.back() in Chrome.
//  ⚠ Chrome is launched with its own fresh --user-data-dir. Reusing the
//    installed profile attaches the debugger to the user's live browser.
//
//  Run:  node scripts/test-hub-back-button.js
//  Env:  CHROME_PATH to point at another Chrome.
// ══════════════════════════════════════════════════════════════════════════

const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8848, DBG = 9378;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
               '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
               '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const name = path.resolve(ROOT, '.' + p);
  if (!name.startsWith(path.resolve(ROOT) + path.sep) || !fs.existsSync(name) || fs.statSync(name).isDirectory()) {
    res.writeHead(404); res.end(); return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(name)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(name).pipe(res);
});

const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => {
  let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } });
}).on('error', rej));

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('OK   ' + label); }
  else { fail++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail).slice(0, 300) : '')); }
};

// Everything a painted hub must show, read off the live DOM.
const PROBE = `(() => {
  const sel = document.getElementById('prac-grade-sel');
  const r = sel.getBoundingClientRect();
  return {
    options: [...sel.options].map(o => o.textContent),
    box: Math.round(r.width) + 'x' + Math.round(r.height),
    books: document.getElementById('prac-books-grid').childElementCount,
    hubShown: !document.getElementById('screen-practice-hub').classList.contains('hidden'),
    subjShown: !document.getElementById('screen-subject-hub').classList.contains('hidden'),
    chapters: document.getElementById('sh-chapter-panel').querySelectorAll('.ch-card').length,
    subjTitle: (document.getElementById('subj-hub-title').textContent || '').trim(),
  };
})()`;

(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-back-'));
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG, '--user-data-dir=' + profile,
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });

  let version;
  for (let i = 0; i < 60 && !version; i++) {
    try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); }
  }
  if (!version) { console.log('FAIL Chrome did not start'); process.exit(1); }

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
  await call('Network.setBypassServiceWorker', { bypass: true });
  await call('Network.setCacheDisabled', { cacheDisabled: true });
  await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });

  const ev = async expr => {
    const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) {
      throw new Error(String(r.exceptionDetails.exception?.description || r.exceptionDetails.text).slice(0, 400));
    }
    return r.result.value;
  };

  try {
    await call('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
    for (let i = 0; i < 90; i++) {
      if (await ev(`typeof PracticeHub !== 'undefined' && typeof SubjectHub !== 'undefined'`)) break;
      await sleep(200);
    }
    ok('the hub modules loaded', await ev(`typeof PracticeHub === 'object' && typeof SubjectHub === 'object'`));

    // ⚠ Let boot SETTLE first. Auth.init() cannot reach Supabase from here, and
    //   its catch lands on the landing screen a second or two in - which, if it
    //   fires mid-test, yanks the page off the screen under measurement and
    //   reads as a product failure. Wait for it, then navigate.
    for (let i = 0; i < 40; i++) {
      if (await ev(`typeof S !== 'undefined' && !!S.currentScreen`)) break;
      await sleep(200);
    }
    await sleep(800);

    // ⚠ BARE assignments, not window.X - Auth and ACTIVE_STUDENT_ID are
    //   classic-script top-level bindings and never land on window.
    await ev(`(() => {
      ACTIVE_STUDENT_ID = 'back-test-kid';
      _isParentContext = () => false;
      Auth.getActiveAccount = () => ({ id: 'back-test-kid', name: 'Kid', grade: 5 });
      Auth.getParentProfile = () => null;
      DB.restrictions = { allowedGrades: [5, 6] };
      return 1;
    })()`);

    // ── 1. the state the bug needed: a hub nothing has painted yet ────────
    const cold = await ev(PROBE);
    ok('the hub ships unpainted - an empty <select>, which is the bug\'s raw material',
      cold.options.length === 0, cold);

    // A bare showScreen() is EXACTLY what the popstate handler does.
    await ev(`showScreen('practice-hub')`);
    const bare = await ev(PROBE);
    ok('a bare showScreen() paints the grade picker', bare.options.length > 0, bare);
    ok('and the subject books with it', bare.books > 0, bare);
    ok('the picker is a real control, not a 0x0 box', !/^0x/.test(bare.box), bare.box);
    ok('the picker offers the grades the parent granted',
      bare.options.join('|') === 'Grade 5|Grade 6', bare.options);

    // ── 2. a real Back press, through history ─────────────────────────────
    await ev(`PracticeHub.open()`);
    await ev(`SubjectHub.open('grade5-maths')`);
    for (let i = 0; i < 40; i++) {
      if ((await ev(PROBE)).chapters > 0) break;
      await sleep(200);
    }
    const onSubject = await ev(PROBE);
    ok('the subject hub drew its chapters', onSubject.chapters > 0 && onSubject.subjShown, onSubject);

    // Wipe what open() painted, so only a repaint on the way back can restore
    // it. This is the never-opened-in-this-page-life case, made deterministic.
    await ev(`(() => {
      document.getElementById('prac-grade-sel').innerHTML = '';
      document.getElementById('prac-books-grid').innerHTML = '';
      return 1;
    })()`);
    await ev('history.back()');
    await sleep(600);
    const back1 = await ev(PROBE);
    ok('Back lands on the practice hub', back1.hubShown && !back1.subjShown, back1);
    ok('Back repaints the grade picker - the reported symptom', back1.options.length > 0, back1);
    ok('Back repaints the subject books', back1.books > 0, back1);

    // ── 3. the same contract for the subject hub ──────────────────────────
    await ev(`SubjectHub.open('grade5-maths')`);
    for (let i = 0; i < 40; i++) {
      if ((await ev(PROBE)).chapters > 0) break;
      await sleep(200);
    }
    await ev(`showScreen('syllabus')`);
    await sleep(200);
    await ev(`(() => {
      document.getElementById('sh-chapter-panel').innerHTML = '';
      document.getElementById('subj-hub-title').textContent = 'wiped';
      return 1;
    })()`);
    await ev('history.back()');
    await sleep(600);
    const back2 = await ev(PROBE);
    ok('Back lands on the subject hub', back2.subjShown, back2);
    ok('Back repaints its chapter cards', back2.chapters > 0, back2);
    ok('Back repaints its heading, so it still names the subject',
      back2.subjTitle && back2.subjTitle !== 'wiped', back2);

    // ── 4. repaint() must never navigate - showScreen() is its caller ─────
    const noNav = await ev(`(() => {
      const before = history.length;
      PracticeHub.repaint();
      SubjectHub.repaint();
      return { before, after: history.length, screen: S.currentScreen };
    })()`);
    ok('repaint() paints without navigating', noNav.before === noNav.after, noNav);
  } catch (e) {
    fail++; console.log('FAIL harness -- ' + e.message);
  }

  console.log(`\nHub back button: ${pass} passed, ${fail} failed.`);
  ws.close(); chrome.kill(); server.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
