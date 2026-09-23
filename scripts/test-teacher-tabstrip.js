'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  The teacher workspace tab strip must stay ONE row at laptop width.
//
//  WHY THIS EXISTS — reported from the app: "in teacher mode the past exam
//  paper went to next line". Renaming the Library tab to the longer
//  "📚 Past Exam Papers" pushed the eighth tab onto a second row. This is the
//  SECOND time the strip has outgrown its width: index.html already records
//  that nine tabs did not fit at laptop width, which is why Settings became a
//  button in the header row instead. Messages has now joined it for the same
//  reason.
//
//  ⚠ Measured at 1280px — a common laptop width, and where the strip is
//    tightest relative to its content. It is ALLOWED to wrap on a phone; the
//    failure being guarded is a desktop strip silently spilling a row.
//  ⚠ The teacher screen is display:none until a teacher signs in, and a hidden
//    element measures 0x0 — which would pass this check while proving nothing.
//    The screen is revealed first and the reveal is asserted.
//
//  Run:  node scripts/test-teacher-tabstrip.js
// ══════════════════════════════════════════════════════════════════════════

const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8855, DBG = 9399;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
               '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' };

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

(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-tabs-'));
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

  const ev = async expr => {
    const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(String(r.exceptionDetails.exception?.description || r.exceptionDetails.text).slice(0, 300));
    return r.result.value;
  };

  try {
    await call('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
    await call('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
    for (let i = 0; i < 90; i++) {
      if (await ev(`!!document.querySelector('#screen-teacher .teacher-navigation')`)) break;
      await sleep(200);
    }
    await sleep(1200);

    const shown = await ev(`(() => {
      const s = document.getElementById('screen-teacher');
      if (!s) return false;
      s.classList.remove('hidden'); s.style.display = 'block';
      const nav = document.querySelector('#screen-teacher .teacher-navigation');
      return !!nav && nav.getBoundingClientRect().width > 0;
    })()`);
    ok('the teacher workspace can be measured', shown);

    const strip = await ev(`(() => {
      const nav = document.querySelector('#screen-teacher .teacher-navigation');
      const tabs = [...nav.querySelectorAll('.ta-tab')].filter(b => b.getBoundingClientRect().height > 0);
      const tops = [...new Set(tabs.map(b => Math.round(b.getBoundingClientRect().top)))];
      return { tabs: tabs.length, rows: tops.length,
               labels: tabs.map(b => b.textContent.trim()),
               navW: Math.round(nav.getBoundingClientRect().width), scrollW: nav.scrollWidth };
    })()`);
    ok('the tab strip is a SINGLE row at 1280px', strip && strip.rows === 1,
      strip && { rows: strip.rows, labels: strip.labels });
    ok('and it does not overflow its container', strip && strip.scrollW <= strip.navW + 1, strip);
    ok('Messages is no longer one of the tabs',
      strip && !strip.labels.some(l => /Messages/i.test(l)), strip && strip.labels);
    ok('Past Exam Papers is still a tab',
      strip && strip.labels.some(l => /Past Exam Papers/i.test(l)), strip && strip.labels);
    ok('Chapter preview is no longer one of the tabs',
      strip && !strip.labels.some(l => /Chapter preview/i.test(l)), strip && strip.labels);

    // ── the Messages button in the header row ────────────────────────────
    const btn = await ev(`(() => {
      const b = document.getElementById('tc-messages-btn');
      if (!b) return null;
      const r = b.getBoundingClientRect();
      const badge = document.getElementById('tc-msg-badge');
      const sm = [...document.querySelectorAll('#screen-teacher .ta-btn-pencil')].map(x => x.textContent.trim().replace(/\\s+/g, ' '));
      return { visible: r.width > 0 && r.height > 0, text: b.textContent.trim().replace(/\\s+/g, ' '),
               badgeInside: !!(badge && b.contains(badge)), topRow: sm };
    })()`);
    ok('a Messages button exists in the header row', !!btn && btn.visible, btn);
    ok('it sits alongside Student mode and Settings',
      btn && btn.topRow.some(t => /Student mode/i.test(t)) && btn.topRow.some(t => /Settings/i.test(t)), btn && btn.topRow);
    ok('Chapter preview moved up to the header row too',
      btn && btn.topRow.some(t => /Chapter preview/i.test(t)), btn && btn.topRow);
    // ⚠ teacher.js finds the unread dot by id; losing it in the move would
    //   leave a teacher with no sign that a reply had arrived.
    ok('the #tc-msg-badge unread dot moved with it', btn && btn.badgeInside, btn);

    // ── and it still opens the panel ─────────────────────────────────────
    // ⚠ engine/teacher.js is a LAZY role module, so TeacherMode is undefined
    //   until RoleModules loads it and the inline onclick throws silently.
    //   Without this the click appears to do nothing and reads as a broken
    //   button.
    const modLoaded = await ev(`RoleModules.ensure('teacher').then(() => typeof TeacherMode === 'object')`);
    ok('the teacher role module loads on demand', modLoaded);
    const opened = await ev(`(() => {
      document.getElementById('tc-messages-btn').click();
      const panel = document.querySelector('#screen-teacher .ta-tab-content[data-tab="messages"]');
      return { hidden: panel ? panel.classList.contains('hidden') : null };
    })()`);
    ok('clicking it opens the Messages panel', opened && opened.hidden === false, opened);
  } catch (e) {
    fail++; console.log('FAIL harness -- ' + e.message);
  }

  console.log(`\nTeacher tab strip: ${pass} passed, ${fail} failed.`);
  ws.close(); chrome.kill(); server.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
