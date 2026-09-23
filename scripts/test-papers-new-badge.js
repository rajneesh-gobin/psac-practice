'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  The TEMPORARY "New" badge on the student-home "Past Exam Papers" tab.
//
//  HISTORY — the badge began on a Past Exam Papers button in the header row.
//  That button was removed as duplication once every role had its own visible
//  tab (student home, parent dashboard, teacher workspace, admin panel), so the
//  badge moved to the child's tab, which is the door it was advertising.
//
//  What this has to get right:
//   1. ⚠ THE TAB STRIP MUST NOT WRAP. A badge adds width to a row of six tabs.
//      The teacher strip has already spilled a second row twice for exactly
//      this reason — see scripts/test-teacher-tabstrip.js — and a wrapped strip
//      is not an error, just quietly worse.
//   2. ⚠ THE BADGE MUST ACTUALLY RENDER. Its first version measured 0x0 because
//      the element it sat in was display:none on the landing screen. A badge
//      that exists in the DOM and paints nothing looks identical to a working
//      one from the markup alone.
//
//  Run:  node scripts/test-papers-new-badge.js
//  Env:  CHROME_PATH to point at another Chrome.
// ══════════════════════════════════════════════════════════════════════════

const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8852, DBG = 9396;
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
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-badge-'));
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

  // ⚠ The student-home strip shares the .teacher-navigation class with THREE
  //   other strips (teacher, parent, and one inside a classroom). An unscoped
  //   querySelector picks whichever comes first in the document, which is not
  //   this one — that mistake made an earlier run measure a hidden element and
  //   report 0 tabs. Always scope to #screen-student-home.
  const NAV = `#screen-student-home .teacher-navigation`;

  try {
    await call('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
    await call('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
    for (let i = 0; i < 90; i++) {
      if (await ev(`!!document.querySelector('${NAV}')`)) break;
      await sleep(200);
    }
    await sleep(1200);

    const shown = await ev(`(() => {
      const s = document.getElementById('screen-student-home');
      if (!s) return false;
      s.classList.remove('hidden'); s.style.display = 'block';
      const nav = document.querySelector('${NAV}');
      return !!nav && nav.getBoundingClientRect().width > 0;
    })()`);
    ok('the student home tab strip can be measured', shown);

    const badge = await ev(`(() => {
      const tab = document.querySelector('${NAV} .ta-tab[data-tab="library"]');
      if (!tab) return { tab: false };
      const b = tab.querySelector('.hdr-new');
      if (!b) return { tab: true, badge: false };
      const r = b.getBoundingClientRect(), cs = getComputedStyle(b);
      return { tab: true, badge: true, text: b.textContent.trim(),
               w: Math.round(r.width), h: Math.round(r.height),
               visible: r.width > 0 && r.height > 0, bg: cs.backgroundColor,
               label: tab.textContent.trim() };
    })()`);
    ok('the Past Exam Papers tab exists on student home', badge && badge.tab, badge);
    ok('it carries the New badge', badge && badge.badge, badge);
    ok('the badge reads "New"', badge && badge.text === 'New', badge && badge.text);
    ok('the badge is actually rendered, not a 0x0 box', badge && badge.visible, badge);
    ok('it is small - under 34px wide', badge && badge.w > 0 && badge.w < 34, badge && badge.w);

    const strip = await ev(`(() => {
      const nav = document.querySelector('${NAV}');
      const tabs = [...nav.querySelectorAll('.ta-tab')].filter(b => b.getBoundingClientRect().height > 0);
      const tops = [...new Set(tabs.map(b => Math.round(b.getBoundingClientRect().top)))];
      return { tabs: tabs.length, rows: tops.length, labels: tabs.map(b => b.textContent.trim()),
               navW: Math.round(nav.getBoundingClientRect().width), scrollW: nav.scrollWidth };
    })()`);
    ok('the student home strip is a SINGLE row at 1280px', strip && strip.rows === 1,
      strip && { rows: strip.rows, labels: strip.labels });
    ok('and it does not overflow its container', strip && strip.scrollW <= strip.navW + 1, strip);

    // ── the header button is gone, and nothing references it ─────────────
    const header = await ev(`(() => ({
      button: !!document.getElementById('btn-open-library'),
      menuNew: document.querySelectorAll('[data-menu-new]').length,
    }))()`);
    ok('the duplicate header button is gone', header && header.button === false, header);
    ok('and no button still carries data-menu-new', header && header.menuNew === 0, header);
  } catch (e) {
    fail++; console.log('FAIL harness -- ' + e.message);
  }

  console.log(`\nPast Exam Papers New badge: ${pass} passed, ${fail} failed.`);
  ws.close(); chrome.kill(); server.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
