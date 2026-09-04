'use strict';
// Mobile layout audit — reveals EVERY .screen at phone widths and measures
// which elements actually stick out of the viewport.
//
// Run: node scripts/audit-mobile-screens.js [width]   (default sweeps 360 and 320)
//
// ⚠ Detection is per-element rects, NOT "can the page scroll sideways":
//   body carries overflow-x: clip, which makes every page look clean to a
//   scrollWidth check while the content is simply cut off — the exact
//   "not displaying properly" a phone user reports.
// ⚠ Fresh Chrome profile + SW bypass, or a stale shell measures old CSS.
// Elements inside a deliberate horizontal scroller (overflow-x auto/scroll
// ancestor) are fine and skipped; decorative empty boxes are skipped too.
const http = require('http');
const fs   = require('fs');
const path = require('path');
const os   = require('os');
const { spawn } = require('child_process');

const ROOT   = path.resolve(__dirname, '..');
const PORT   = 8797;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const WIDTHS = process.argv[2] ? [parseInt(process.argv[2], 10)] : [360, 320];

const MIME = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css',
  '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png',
  '.jpg':'image/jpeg', '.geojson':'application/json',
  '.webmanifest':'application/manifest+json', '.ico':'image/x-icon' };

const server = http.createServer(function (req, res) {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); res.end('not found'); return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream',
                       'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
});

function getJson(url) {
  return new Promise(function (ok, no) {
    http.get(url, function (r) {
      let b = ''; r.on('data', c => { b += c; }); r.on('end', () => ok(JSON.parse(b)));
    }).on('error', no);
  });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Runs inside the page. Reveals one screen, returns its protruding elements.
const PROBE_FN = `
(function (screenId, vw) {
  const screen = document.getElementById(screenId);
  if (!screen) return { error: 'missing' };
  for (const s of document.querySelectorAll('.screen')) { s.classList.add('hidden'); }
  screen.classList.remove('hidden');
  screen.style.display = 'block';
  const sel = el => {
    let out = el.tagName.toLowerCase();
    if (el.id) return out + '#' + el.id;
    if (el.classList.length) out += '.' + Array.from(el.classList).slice(0, 3).join('.');
    return out;
  };
  // A deliberate horizontal scroller OR a clipping ancestor (truncate,
  // overflow-hidden) contains its child — the child cannot cause visible
  // breakage. Stop at body: its overflow-x clip is the page-level mask this
  // audit exists to see through.
  const inScroller = el => {
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      const o = getComputedStyle(p).overflowX;
      if (o === 'auto' || o === 'scroll' || o === 'hidden' || o === 'clip') return true;
    }
    return false;
  };
  const bad = [];
  for (const el of screen.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const overR = r.right - vw, overL = -r.left;
    if (overR <= 8 && overL <= 8) continue;
    // only report things a person would miss: text, controls, media, tables
    const isControl = /^(BUTTON|INPUT|SELECT|TEXTAREA|IMG|TABLE|A|LABEL)$/.test(el.tagName);
    // a non-interactive box whose text has no letters or digits is decoration
    // (the 🎈 hanging off a card corner on purpose)
    const hasText = /[\\p{L}\\p{N}]/u.test(el.textContent || '');
    if (!isControl && !hasText) continue;
    if (inScroller(el)) continue;
    // skip if a reported ancestor already covers it
    if (bad.some(b => b.el.contains(el))) continue;
    bad.push({ el, entry: { sel: sel(el), width: Math.round(r.width),
      left: Math.round(r.left), right: Math.round(r.right), over: Math.round(Math.max(overR, overL)),
      text: (el.textContent || '').trim().slice(0, 60) } });
  }
  const out = bad.slice(0, 8).map(b => b.entry);
  screen.style.display = '';
  screen.classList.add('hidden');
  return { offenders: out };
})`;

(async function () {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-maudit-'));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9341',
    '--user-data-dir=' + profile, '--no-first-run', '--no-default-browser-check',
    '--disable-gpu', '--window-size=400,900', 'about:blank'], { stdio: 'ignore' });

  let ver = null;
  for (let i = 0; i < 80 && !ver; i++) {
    try { ver = await getJson('http://127.0.0.1:9341/json/version'); } catch (e) { await sleep(250); }
  }
  if (!ver) throw new Error('Chrome never came up');

  const ws = new globalThis.WebSocket(ver.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

  let id = 0;
  const pending = new Map();
  ws.onmessage = function (ev) {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const q = pending.get(m.id); pending.delete(m.id);
      if (m.error) q.reject(new Error(m.error.message)); else q.resolve(m.result);
    }
  };
  function send(method, params, sessionId) {
    const mid = ++id;
    return new Promise(function (resolve, reject) {
      const t = setTimeout(() => { pending.delete(mid); reject(new Error('CDP timeout: ' + method)); }, 20000);
      pending.set(mid, { resolve: r => { clearTimeout(t); resolve(r); },
                         reject:  e => { clearTimeout(t); reject(e); } });
      ws.send(JSON.stringify({ id: mid, method, params: params || {}, sessionId }));
    });
  }

  const t1 = await send('Target.createTarget', { url: 'about:blank' });
  const t2 = await send('Target.attachToTarget', { targetId: t1.targetId, flatten: true });
  const S  = (m, p) => send(m, p, t2.sessionId);

  await S('Page.enable');
  await S('Runtime.enable');
  await S('Network.enable');
  await S('Network.setCacheDisabled', { cacheDisabled: true });
  for (const dom of ['Network.setBypassServiceWorker', 'Page.setBypassServiceWorker']) {
    try { await S(dom, { bypass: true }); break; } catch (_) {}
  }

  let totalBad = 0;
  for (const vw of WIDTHS) {
    await S('Emulation.setDeviceMetricsOverride',
      { width: vw, height: 900, deviceScaleFactor: 1, mobile: true });
    await S('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/index.html' });
    // The first load can still be parsing the 45 blocking manifests when a
    // fixed sleep expires — poll until the screens exist instead.
    let screens = [];
    for (let i = 0; i < 30 && !screens.length; i++) {
      await sleep(1000);
      const list = await S('Runtime.evaluate', { returnByValue: true,
        expression: 'Array.from(document.querySelectorAll(".screen")).map(s => s.id).filter(Boolean)' });
      screens = list.result.value || [];
    }
    console.log('\n══ ' + vw + 'px — ' + screens.length + ' screens ══');

    for (const sid of screens) {
      const res = await S('Runtime.evaluate', { returnByValue: true,
        expression: '(' + PROBE_FN + ')(' + JSON.stringify(sid) + ',' + vw + ')' });
      const m = res.result.value;
      if (!m || m.error) { console.log('  ?    ' + sid + ' — ' + ((m && m.error) || 'no result')); continue; }
      if (!m.offenders.length) { console.log('  ok   ' + sid); continue; }
      totalBad += m.offenders.length;
      console.log('  BAD  ' + sid);
      for (const o of m.offenders) {
        console.log('       ' + o.sel + '  w=' + o.width + ' L=' + o.left + ' R=' + o.right
          + ' over=' + o.over + 'px  "' + o.text.replace(/\s+/g, ' ') + '"');
      }
    }
  }

  ws.close(); chrome.kill(); server.close();
  console.log('\n' + (totalBad ? totalBad + ' protruding element(s) found' : 'all screens clean'));
  process.exit(0);
})().catch(function (e) { console.error('HARNESS FAIL:', e.message); process.exit(1); });
