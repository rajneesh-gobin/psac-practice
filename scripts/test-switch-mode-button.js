'use strict';
// "Switch to student mode" measured on the parent dashboard.
//
// It used to be one of eight identical .pd-action tiles labelled "Student view",
// which is why the app carries a one-time onboarding nudge pointing AT it -
// parents could not find the way to hand the device over. Prominence is a claim
// about pixels, so it is measured here rather than eyeballed: is it outside the
// tile row, is it actually bigger than a tile, does its label clear contrast,
// and does it stay inside a 360px phone.
//
// Run: node scripts/test-switch-mode-button.js
//
// WARNING Runs on a FRESH Chrome profile with the service worker bypassed - a
//   stale shell reports a layout fix as landed when it is not.
const http = require('http');
const fs   = require('fs');
const path = require('path');
const os   = require('os');
const { spawn } = require('child_process');

const ROOT   = path.resolve(__dirname, '..');
const PORT   = 8793;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const MIN_RATIO = 4.5;
const PHONE_W   = 360;

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
      let b = ''; r.on('data', c => { b += c; }); r.on('end', () => ok(JSON.parse(b)));
    }).on('error', no);
  });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

// The parent dashboard is a hidden .screen until someone signs in, and nothing
// here should sign in. Reveal the screen directly and measure it in place -
// a clone would not carry the row's flex context, which is half the question.
const PROBE = [
  '(() => {',
  '  const rgb = v => (String(v).match(/[0-9.]+/g) || []).map(Number);',
  '  const lum = c => { const f = c.map(v => { v /= 255;',
  '    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });',
  '    return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2]; };',
  '  const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b);',
  '    return Math.round(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)) * 100) / 100; };',
  '',
  '  const screen = document.getElementById("screen-parent");',
  '  if (!screen) return { error: "no #screen-parent" };',
  '  screen.classList.remove("hidden");',
  '  screen.style.display = "block";',
  '',
  '  const btn = document.getElementById("pd-student-view-btn");',
  '  if (!btn) return { error: "no #pd-student-view-btn" };',
  '  const row = document.querySelector(".pd-action") && document.querySelector(".pd-action").parentElement;',
  '  const tiles = Array.from(document.querySelectorAll(".pd-action"))',
  '    .filter(el => !el.classList.contains("hidden"));',
  '',
  '  const b  = btn.getBoundingClientRect();',
  '  const cs = getComputedStyle(btn);',
  '  const title = btn.querySelector(".pd-switch-title");',
  '  const sub   = btn.querySelector(".pd-switch-sub");',
  '',
  '  // The gradient has no single colour to sample, so measure the label against',
  '  // BOTH stops - the worst of the two is what a reader actually gets.',
  '  const stops = [[79, 70, 229], [124, 58, 237]];',
  '  const worst = (el) => { const c = rgb(getComputedStyle(el).color);',
  '    return Math.min.apply(null, stops.map(s => ratio(c.slice(0, 3), s))); };',
  '',
  '  const tileArea = tiles.map(t => { const r = t.getBoundingClientRect(); return r.width * r.height; });',
  '  return {',
  '    label: title ? title.textContent.trim() : null,',
  '    subLabel: sub ? sub.textContent.trim() : null,',
  '    visible: b.width > 0 && b.height > 0 && cs.visibility !== "hidden" && cs.display !== "none",',
  '    inTileRow: !!(row && row.contains(btn)),',
  '    isTile: btn.classList.contains("pd-action"),',
  '    area: Math.round(b.width * b.height),',
  '    width: Math.round(b.width),',
  '    right: Math.round(b.right),',
  '    biggestTileArea: Math.round(Math.max.apply(null, tileArea.concat([0]))),',
  '    tiles: tiles.length,',
  '    titleRatio: title ? worst(title) : 0,',
  '    subRatio: sub ? worst(sub) : 0,',
  '    docWidth: document.documentElement.clientWidth,',
  '    bodyScrollW: document.documentElement.scrollWidth,',
  '    calloutHidden: !!document.getElementById("pd-student-view-callout")',
  '      && document.getElementById("pd-student-view-callout").classList.contains("hidden"),',
  '  };',
  '})()',
].join(String.fromCharCode(10));

(async function () {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-switch-'));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9338',
    '--user-data-dir=' + profile, '--no-first-run', '--no-default-browser-check',
    '--disable-gpu', '--window-size=' + PHONE_W + ',900', 'about:blank'], { stdio: 'ignore' });

  let ver = null;
  for (let i = 0; i < 80 && !ver; i++) {
    try { ver = await getJson('http://127.0.0.1:9338/json/version'); } catch (e) { await sleep(250); }
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
  // Every call gets its own timeout: page JS that wedges the renderer would
  // otherwise be indistinguishable from a broken harness.
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
  // Moved domains between Chrome versions (Page.* -> Network.*), and a fresh
  // --user-data-dir has no worker registered on the first load anyway. Try, and
  // do not fail the run over the name.
  for (const dom of ['Network.setBypassServiceWorker', 'Page.setBypassServiceWorker']) {
    try { await S(dom, { bypass: true }); break; } catch (_) {}
  }
  await S('Emulation.setDeviceMetricsOverride',
    { width: PHONE_W, height: 900, deviceScaleFactor: 1, mobile: true });
  await S('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/index.html' });
  await sleep(6000);

  const res = await S('Runtime.evaluate', { returnByValue: true, expression: PROBE });
  const m = res.result.value;
  ws.close(); chrome.kill(); server.close();

  if (!m || m.error) { console.error('HARNESS FAIL:', (m && m.error) || 'no result'); process.exit(1); }

  let fails = 0;
  function ck(name, ok, detail) {
    if (ok) { console.log('  ok   ' + name); return; }
    fails++; console.log('  FAIL ' + name + (detail ? '  -> ' + detail : ''));
  }

  console.log('measured at ' + PHONE_W + 'px: button ' + m.width + 'px wide, area ' + m.area
    + 'px2 against a biggest tile of ' + m.biggestTileArea + 'px2 (' + m.tiles + ' tiles)');

  ck('the button is called "Switch to student mode"', m.label === 'Switch to student mode', String(m.label));
  ck('it says what it does', !!m.subLabel && /hand the device/i.test(m.subLabel), String(m.subLabel));
  ck('it is visible', m.visible === true);
  ck('it is NOT one of the tiles', m.isTile === false);
  ck('it is NOT inside the tile row', m.inTileRow === false);
  // The whole point: it must not read as a peer of Calendar/Invite/Shop.
  ck('it is at least twice the area of the largest tile',
    m.area >= m.biggestTileArea * 2, m.area + ' vs ' + m.biggestTileArea);
  ck('it spans the phone width', m.width >= m.docWidth * 0.8, m.width + ' of ' + m.docWidth);
  ck('the title clears ' + MIN_RATIO + ':1 on both gradient stops',
    m.titleRatio >= MIN_RATIO, m.titleRatio + ':1');
  ck('the subtitle clears ' + MIN_RATIO + ':1 too', m.subRatio >= MIN_RATIO, m.subRatio + ':1');
  // ⚠ Stop at the document element: body carries overflow-x: clip, which makes
  // every page look clean to a naive check.
  ck('it introduces no horizontal scroll',
    m.bodyScrollW <= m.docWidth + 1, m.bodyScrollW + ' > ' + m.docWidth);
  ck('the onboarding callout starts hidden', m.calloutHidden === true);

  console.log('');
  console.log(fails ? fails + ' check(s) failed' : 'all checks passed');
  process.exit(fails ? 1 : 0);
})().catch(function (e) { console.error('HARNESS FAIL:', e.message); process.exit(1); });
