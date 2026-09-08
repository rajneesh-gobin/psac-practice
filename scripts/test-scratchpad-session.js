'use strict';
// The rough-working pad is blank when a new session starts, and only then.
//
// Run: node scripts/test-scratchpad-session.js
//
// The canvas lives in index.html and is never rebuilt, so whatever a child drew
// stayed on it for the rest of the visit: leave a chapter, open another, and the
// last chapter's sums were still sitting under the new question. Reported as
// "if I write something it persists; if I go out and click chapter practice
// again it should be cleared — for one practice session it can persist."
//
// So there are three claims here, and the middle one is the easiest to break by
// over-correcting:
//   · a NEW session starts blank
//   · the SAME session keeps its working across questions and screen returns
//   · the pad still draws, and the first stroke of a new session survives
//
// ⚠ Measured on real pixels, in a real browser, through the real MutationObserver
//   that showScreen trips. Asserting that a reset function was called proves
//   nothing about what is on the canvas.
// ⚠ Drawing is done with real PointerEvents, not by calling the 2d context, so
//   the placeholder's one-shot "wipe on first stroke" listener runs exactly as
//   it does for a child. That listener is why a reset must restore the
//   placeholder AND re-arm the listener: clearing alone leaves a pad that eats
//   the first stroke of the next session.
// ⚠ No login. The practice SCREEN needs a child session, but the pad's lifecycle
//   is driven by `S.practice.session` identity and the screen's own class, both
//   of which can be exercised directly. That is the unit under test; what this
//   does NOT cover is that each start function really does assign a fresh
//   session object, so that is asserted against the source separately below.

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8847;
const DBG = 9367;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif',
  '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.md': 'text/markdown' };

let pass = 0;
const failures = [];
const ok = (cond, label, detail) => {
  if (cond) { pass++; console.log('  ok   ' + label); }
  else { failures.push(label + (detail ? ' — ' + detail : '')); console.log('  FAIL ' + label + (detail ? ' — ' + detail : '')); }
};

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/html', 'Cache-Control': 'no-store' });
    res.end('<!doctype html><title>not found</title>');
    return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
});

const getJson = url => new Promise((res, rej) => {
  http.get(url, r => { let b = ''; r.on('data', c => { b += c; }); r.on('end', () => { try { res(JSON.parse(b)); } catch (e) { rej(e); } }); }).on('error', rej);
});

// ── 1. the source contract the browser test relies on ───────────────────────
function checkSource() {
  const src = fs.readFileSync(path.join(ROOT, 'engine', 'app.js'), 'utf8');

  // Every practice start must mint a FRESH session object immediately before
  // showing the screen — that identity is the whole reset signal.
  const starts = [...src.matchAll(/showScreen\('practice'\)/g)].map(m => m.index);
  let fresh = 0;
  for (const at of starts) {
    const before = src.slice(Math.max(0, at - 1800), at);
    if (/S\.practice\.session\s*=\s*\{/.test(before)) fresh++;
  }
  ok(starts.length > 0 && fresh === starts.length,
    'every practice start assigns a fresh S.practice.session before showScreen',
    fresh + ' of ' + starts.length);

  const exams = [...src.matchAll(/showScreen\('exam'\)/g)].map(m => m.index);
  let freshEx = 0;
  for (const at of exams) {
    const before = src.slice(Math.max(0, at - 1800), at);
    if (/S\.exam\.qs\s*=/.test(before)) freshEx++;
  }
  ok(exams.length > 0 && freshEx === exams.length,
    'every exam start assigns S.exam.qs before showScreen', freshEx + ' of ' + exams.length);

  ok(/_resetScratchpadForSession\(\s*\n?\s*'scratchpad-practice', S\.practice\.session/.test(src),
    'the practice observer keys the reset on S.practice.session');
  ok(/_resetScratchpadForSession\(\s*\n?\s*'scratchpad-exam', S\.exam\.qs/.test(src),
    'the exam observer keys the reset on S.exam.qs');
  ok(/canvas\._wipeOnFirstStroke/.test(src),
    'the placeholder listener is a named handler, so a reset can re-arm it');
}

// ── 2. the pad itself, in a browser ─────────────────────────────────────────
const PAGE = `(() => {
  const c = document.getElementById('scratchpad-practice');
  const wrap = document.getElementById('practice-scratch-wrap');
  const screen = document.getElementById('screen-practice');
  return {
    api: {
      show()  { screen.classList.remove('hidden'); },
      hide()  { screen.classList.add('hidden'); },
      open()  { wrap.classList.remove('hidden'); },
      ready() { return !!(c && c._ctx); },
      ink()   {
        if (!c || !c._ctx) return -1;
        const d = c._ctx.getImageData(0, 0, c.width, c.height).data;
        let n = 0;
        for (let i = 3; i < d.length; i += 4) if (d[i] > 8) n++;
        return n;
      },
      hasPrompt() { return !!(c && c._hasPlaceholder); },
      strong() {
        if (!c || !c._ctx) return -1;
        const d = c._ctx.getImageData(0, 0, c.width, c.height).data;
        let n = 0;
        for (let i = 3; i < d.length; i += 4) if (d[i] > 200) n++;
        return n;
      },
      draw() {
        const r = c.getBoundingClientRect();
        const ev = (type, x, y) => c.dispatchEvent(new PointerEvent(type, {
          pointerId: 1, bubbles: true, cancelable: true,
          clientX: r.left + x, clientY: r.top + y,
        }));
        c.setPointerCapture = () => {};
        ev('pointerdown', 12, 12);
        for (let i = 1; i <= 30; i++) ev('pointermove', 12 + i * 4, 12 + i * 3);
        ev('pointerup', 132, 102);
      },
    },
  };
})().api`;

(async () => {
  console.log('\nRough-working pad — cleared per session, kept within one\n');
  console.log('── source contract ──');
  checkSource();

  console.log('\n── the pad in a browser ──');
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-scratch-'));
  const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run',
    '--no-default-browser-check', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + profile, 'about:blank'], { stdio: 'ignore' });

  let ver = null;
  for (let i = 0; i < 80 && !ver; i++) {
    try { ver = await getJson('http://127.0.0.1:' + DBG + '/json/version'); } catch { await sleep(250); }
  }
  if (!ver) { ok(false, 'chrome started'); return report(chrome, profile); }

  const ws = new globalThis.WebSocket(ver.webSocketDebuggerUrl);
  await new Promise(r => { ws.onopen = r; });
  let id = 0; const pending = new Map();
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result || m.error); pending.delete(m.id); }
  };
  const send = (method, params, sessionId) => new Promise((res, rej) => {
    const mid = ++id; pending.set(mid, res);
    ws.send(JSON.stringify({ id: mid, method, params: params || {}, sessionId }));
    setTimeout(() => { if (pending.has(mid)) { pending.delete(mid); rej(new Error('CDP timeout: ' + method)); } }, 60000);
  });
  const t1 = await send('Target.createTarget', { url: 'about:blank' });
  const t2 = await send('Target.attachToTarget', { targetId: t1.targetId, flatten: true });
  const S = (m, p) => send(m, p, t2.sessionId);
  await S('Page.enable');
  // ⚠ The service worker serves a stale shell (CLAUDE.md). Measure the app.js
  //   on disk, not the one cached from an earlier run of some other harness.
  await S('Page.setBypassServiceWorker', { bypass: true });
  await S('Emulation.setDeviceMetricsOverride', { width: 390, height: 780, deviceScaleFactor: 2, mobile: true });
  await S('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/' });
  await sleep(5000);

  const ev = async expr => {
    const r = await S('Runtime.evaluate', { awaitPromise: true, returnByValue: true, expression: expr });
    if (r && r.exceptionDetails) return { __err: (r.exceptionDetails.exception || {}).description || 'threw' };
    return r && r.result ? r.result.value : undefined;
  };

  const boot = await ev(`typeof initScratchpad === 'function' && typeof _resetScratchpadForSession === 'function'`);
  ok(boot === true, 'app.js loaded and the scratchpad functions exist', JSON.stringify(boot));
  if (boot !== true) return report(chrome, profile, ws);

  await ev(`window.__pad = ${PAGE};`);

  // ── session A ──
  await ev(`S.practice.session = { attempted: 0, correct: 0 }; __pad.show(); __pad.open();`);
  await sleep(300);
  await ev(`initScratchpad('scratchpad-practice');`);
  ok(await ev(`__pad.ready()`) === true, 'the pad initialises once its wrapper is open');

  const placeholderInk = await ev(`__pad.ink()`);
  ok(placeholderInk > 0, 'a fresh pad shows the faint prompt', 'ink=' + placeholderInk);
  const placeholderStrong = await ev(`__pad.strong()`);
  ok(placeholderStrong === 0, 'the prompt is faint, not a real mark', 'strong=' + placeholderStrong);

  await ev(`__pad.draw()`);
  const drawnA = await ev(`__pad.strong()`);
  ok(drawnA > 100, 'drawing on the pad leaves a real mark', 'strong=' + drawnA);

  // ── same session: leave the screen and come back ──
  await ev(`__pad.hide()`); await sleep(150);
  await ev(`__pad.show()`); await sleep(300);
  const sameSession = await ev(`__pad.strong()`);
  ok(sameSession === drawnA,
    'the working SURVIVES leaving and re-entering the same session',
    'strong=' + sameSession + ' was ' + drawnA);

  // ── same session: the question changes ──
  await ev(`S.practice.idx = (S.practice.idx || 0) + 1; __pad.hide(); __pad.show();`);
  await sleep(300);
  const nextQuestion = await ev(`__pad.strong()`);
  ok(nextQuestion === drawnA, 'the working SURVIVES moving to the next question',
    'strong=' + nextQuestion);

  // ── session B: a new practice session ──
  await ev(`__pad.hide(); S.practice.session = { attempted: 0, correct: 0 }; __pad.show();`);
  await sleep(400);
  const afterNew = await ev(`__pad.strong()`);
  ok(afterNew === 0, 'a NEW session starts on a blank pad', 'strong=' + afterNew);
  const afterNewInk = await ev(`__pad.ink()`);
  ok(afterNewInk > 0, 'the faint prompt comes back with it', 'ink=' + afterNewInk);

  ok(await ev(`__pad.hasPrompt()`) === true, 'the reset re-arms the prompt state');

  // ⚠ The regression this pair guards: the one-shot "wipe the prompt" listener
  //   has already fired and been removed by the time the session ends, so a
  //   reset that redraws the prompt WITHOUT re-adding it leaves the faint text
  //   printed under everything the child writes for the rest of the session.
  //   The stroke still lands, so a pixel count alone would not notice — the
  //   prompt state is what has to be asserted.
  await ev(`__pad.draw()`);
  const drawnB = await ev(`__pad.strong()`);
  ok(drawnB > 100, "the new session's first stroke is kept", 'strong=' + drawnB);
  ok(await ev(`__pad.hasPrompt()`) === false,
    'the prompt CLEARS on that first stroke, as it does on a first-ever pad');

  // ── a session started while the pad was closed still clears it ──
  await ev(`__pad.hide(); document.getElementById('practice-scratch-wrap').classList.add('hidden');
            S.practice.session = { attempted: 0, correct: 0 }; __pad.show();`);
  await sleep(400);
  const closedReset = await ev(`__pad.strong()`);
  ok(closedReset === 0,
    'a pad left COLLAPSED is still blanked by a new session', 'strong=' + closedReset);

  // ── the Clear button still works ──
  await ev(`__pad.open(); __pad.draw();`);
  const beforeClear = await ev(`__pad.strong()`);
  await ev(`clearScratch('scratchpad-practice')`);
  const afterClear = await ev(`__pad.strong()`);
  ok(beforeClear > 100 && afterClear === 0, 'the Clear button still empties the pad',
    'before=' + beforeClear + ' after=' + afterClear);

  report(chrome, profile, ws);

  function report(ch, prof, sock) {
    if (sock) { try { sock.close(); } catch {} }
    if (ch) ch.kill();
    try { server.close(); } catch {}
    if (prof) { try { fs.rmSync(prof, { recursive: true, force: true }); } catch {} }
    console.log('\n  ' + pass + ' passed, ' + failures.length + ' failed');
    if (failures.length) { console.log('\n  failures:'); for (const f of failures) console.log('    ✗ ' + f); }
    process.exit(failures.length ? 1 : 0);
  }
})().catch(e => { console.error('\n  harness error: ' + e.stack); process.exit(1); });
