'use strict';
// Every <option> in the app, measured in both themes.
//
// An <option> is painted by the PLATFORM, not by the page: it inherits the
// select's `color` and NOT its `background`, which computes to transparent
// unless something sets it. That is how the family-setup grade picker
// (`bg-white/10 text-white`) rendered "Grade 4 / 5 / 6" as white on the popup's
// own white ground - invisible. index.html carries 30 more selects with
// `dark:text-white`, every one of them one light popup away from the same bug,
// so this asserts the rule for ALL of them and not just the two reported.
//
// Run: node scripts/test-select-contrast.js
//
// WARNING Runs on a FRESH Chrome profile so the service worker cannot serve a
//   stale style.css - that failure mode reports a fix as landed when it is not.
const http = require('http');
const fs   = require('fs');
const path = require('path');
const os   = require('os');
const { spawn } = require('child_process');

const ROOT   = path.resolve(__dirname, '..');
const PORT   = 8791;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const MIN_RATIO = 4.5;   // WCAG AA for body text

const MIME = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css',
  '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png',
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
      let b = '';
      r.on('data', function (c) { b += c; });
      r.on('end', function () { ok(JSON.parse(b)); });
    }).on('error', no);
  });
}
function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

// A select inside a display:none screen has no computed style to read, and most
// of these screens are hidden. So each select's classes are measured on a clone
// parked off-screen in the live document, rather than by walking every screen.
const PROBE = [
  '(() => {',
  '  const rgb = v => (String(v).match(/[0-9.]+/g) || []).map(Number);',
  '  const lum = c => {',
  '    const f = x => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); };',
  '    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);',
  '  };',
  '  const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b);',
  '    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };',
  '  const measure = theme => {',
  '    document.documentElement.classList.toggle("dark", theme === "dark");',
  '    const rows = [];',
  '    document.querySelectorAll("select").forEach(sel => {',
  '      const probeSel = document.createElement("select");',
  '      probeSel.className = sel.className;',
  '      const o = document.createElement("option");',
  '      o.textContent = "Grade 4";',
  '      probeSel.appendChild(o);',
  '      probeSel.style.position = "fixed";',
  '      probeSel.style.left = "-9999px";',
  '      document.body.appendChild(probeSel);',
  '      const co = getComputedStyle(o);',
  '      const fg = rgb(co.color), bg = rgb(co.backgroundColor);',
  '      const alpha = bg.length > 3 ? bg[3] : 1;',
  '      rows.push({',
  '        id: sel.id || "(no id)",',
  '        color: co.color,',
  '        background: co.backgroundColor,',
  '        transparent: alpha === 0,',
  '        ratio: (alpha === 0) ? 0 : Math.round(ratio(fg, bg) * 10) / 10,',
  '      });',
  '      probeSel.remove();',
  '    });',
  '    return rows;',
  '  };',
  '  return { light: measure("light"), dark: measure("dark") };',
  '})()',
].join(String.fromCharCode(10));

(async function () {
  await new Promise(function (r) { server.listen(PORT, '127.0.0.1', r); });
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-select-'));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9336',
    '--user-data-dir=' + profile, '--no-first-run', '--no-default-browser-check',
    '--disable-gpu', '--window-size=420,900', 'about:blank'], { stdio: 'ignore' });

  let ver = null;
  for (let i = 0; i < 80 && !ver; i++) {
    try { ver = await getJson('http://127.0.0.1:9336/json/version'); } catch (e) { await sleep(250); }
  }
  if (!ver) throw new Error('Chrome never came up');

  const ws = new globalThis.WebSocket(ver.webSocketDebuggerUrl);
  await new Promise(function (res, rej) { ws.onopen = res; ws.onerror = rej; });

  let id = 0;
  const pending = new Map();
  ws.onmessage = function (ev) {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const q = pending.get(m.id); pending.delete(m.id);
      if (m.error) q.reject(new Error(m.error.message)); else q.resolve(m.result);
    }
  };
  // WARNING every call gets its own timeout. An infinite loop in page JS blocks
  //   the renderer's message loop so CDP never answers; without this you cannot
  //   tell "page wedged" from "harness bug".
  function send(method, params, sessionId) {
    const mid = ++id;
    return new Promise(function (resolve, reject) {
      const t = setTimeout(function () {
        pending.delete(mid); reject(new Error('CDP timeout: ' + method));
      }, 20000);
      pending.set(mid, {
        resolve: function (r) { clearTimeout(t); resolve(r); },
        reject:  function (e) { clearTimeout(t); reject(e); },
      });
      ws.send(JSON.stringify({ id: mid, method: method, params: params || {}, sessionId: sessionId }));
    });
  }

  const t1 = await send('Target.createTarget', { url: 'about:blank' });
  const t2 = await send('Target.attachToTarget', { targetId: t1.targetId, flatten: true });
  const S  = function (m, p) { return send(m, p, t2.sessionId); };

  await S('Page.enable');
  await S('Runtime.enable');
  await S('Network.enable');
  await S('Network.setCacheDisabled', { cacheDisabled: true });
  await S('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/index.html' });
  await sleep(6000);

  const res = await S('Runtime.evaluate', { returnByValue: true, expression: PROBE });
  const out = res.result.value;
  ws.close(); chrome.kill(); server.close();

  let pass = 0;
  const fails = [];
  ['light', 'dark'].forEach(function (theme) {
    const rows = (out && out[theme]) || [];
    if (!rows.length) { fails.push(theme + ': no selects found - the page did not load'); return; }
    rows.forEach(function (r) {
      if (r.transparent) {
        fails.push(theme + ' #' + r.id + ': option background is transparent (' + r.background
          + ') - the platform paints the popup, so "' + r.color + '" text can land on anything');
      } else if (r.ratio < MIN_RATIO) {
        fails.push(theme + ' #' + r.id + ': contrast ' + r.ratio + ':1 (' + r.color + ' on '
          + r.background + ') is below ' + MIN_RATIO + ':1');
      } else pass++;
    });
    const solid = rows.filter(function (r) { return !r.transparent; });
    const worst = solid.length
      ? solid.reduce(function (m, r) { return Math.min(m, r.ratio); }, Infinity) : 'n/a';
    console.log('  ' + theme + '  ' + rows.length + ' selects, worst option contrast ' + worst + ':1');
  });

  if (fails.length) {
    console.log('');
    console.log(fails.length + ' FAILED:');
    fails.slice(0, 12).forEach(function (f) { console.log('  FAIL  ' + f); });
    process.exit(1);
  }
  console.log('');
  console.log(pass + ' option colour checks passed (>= ' + MIN_RATIO + ':1 in both themes)');
  process.exit(0);
})().catch(function (e) { console.error('HARNESS FAIL:', e.message); process.exit(1); });
