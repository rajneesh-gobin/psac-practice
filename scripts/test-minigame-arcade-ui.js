'use strict';
// Word Builder + Island Explorer rendered in real headless Chrome at 360px:
// the hub shows four live cards, each game's stage draws inside the phone with
// no horizontal scroll, and a real click on a tile / an option does what the
// child expects. Run: node scripts/test-minigame-arcade-ui.js
//
// WARNING Runs on a FRESH Chrome profile with the service worker bypassed - a
//   stale shell reports a layout fix as landed when it is not.
const http = require('http');
const fs   = require('fs');
const path = require('path');
const os   = require('os');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8797;
const CDP_PORT = 9341;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PHONE_W = 360;

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

(async function () {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-arcade-'));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + CDP_PORT,
    '--user-data-dir=' + profile, '--no-first-run', '--no-default-browser-check',
    '--disable-gpu', '--window-size=' + PHONE_W + ',900', 'about:blank'], { stdio: 'ignore' });

  let ver = null;
  for (let i = 0; i < 80 && !ver; i++) {
    try { ver = await getJson('http://127.0.0.1:' + CDP_PORT + '/json/version'); } catch (e) { await sleep(250); }
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
  const evl = async expr => {
    const r = await S('Runtime.evaluate', { returnByValue: true, expression: expr });
    if (r.exceptionDetails) throw new Error('page threw: ' + (r.exceptionDetails.exception && r.exceptionDetails.exception.description || r.exceptionDetails.text));
    return r.result.value;
  };

  await S('Page.enable');
  await S('Runtime.enable');
  await S('Network.enable');
  await S('Network.setCacheDisabled', { cacheDisabled: true });
  for (const dom of ['Network.setBypassServiceWorker', 'Page.setBypassServiceWorker']) {
    try { await S(dom, { bypass: true }); break; } catch (_) {}
  }
  await S('Emulation.setDeviceMetricsOverride',
    { width: PHONE_W, height: 900, deviceScaleFactor: 1, mobile: true });
  await S('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/index.html' });
  // A fixed sleep is flaky on a busy machine - poll until the app is genuinely
  // up (parsed, engine loaded, the section in the DOM) instead.
  let ready = false;
  for (let i = 0; i < 60 && !ready; i++) {
    await sleep(500);
    try {
      const r = await S('Runtime.evaluate', { returnByValue: true, expression:
        `document.readyState === 'complete' && typeof MiniGames !== 'undefined' && !!document.getElementById('student-games-section')` });
      ready = r.result.value === true;
    } catch (_) {}
  }
  if (!ready) throw new Error('app never finished loading');
  await sleep(500);

  let fails = 0;
  function ck(name, ok, detail) {
    if (ok) { console.log('  ok   ' + name); return; }
    fails++; console.log('  FAIL ' + name + (detail ? '  -> ' + detail : ''));
  }
  // Stop at the document element: body carries overflow-x: clip, which makes
  // every page look clean to a naive check.
  const OVERFLOW = 'document.documentElement.scrollWidth - document.documentElement.clientWidth';

  // ── Homepage Game Zone banner ──
  // The gradient has no single colour to sample, so the labels are measured
  // against EVERY stop - the worst is what a reader actually gets.
  const banner = await evl(`(() => {
    const rgb = v => (String(v).match(/[0-9.]+/g) || []).map(Number);
    const lum = c => { const f = c.map(v => { v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
      return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2]; };
    const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b);
      return Math.round(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)) * 100) / 100; };
    const scr = document.getElementById('screen-subject-select');
    const sec = document.getElementById('student-games-section');
    if (!scr || !sec) return { error: 'missing: ' + (scr ? '' : 'screen ') + (sec ? '' : 'section ')
      + '| readyState=' + document.readyState + ' screens=' + document.querySelectorAll('.screen').length };
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    scr.classList.remove('hidden');
    sec.classList.remove('hidden');
    const link = sec.querySelector('.student-games-link');
    const title = sec.querySelector('strong'), sub = sec.querySelector('strong + span');
    const go = sec.querySelector('.student-games-go');
    const stops = (getComputedStyle(link).backgroundImage.match(/rgb\\([^)]+\\)/g) || []).map(rgb);
    const worst = el => Math.min.apply(null, stops.map(s => ratio(rgb(getComputedStyle(el).color).slice(0, 3), s.slice(0, 3))));
    const r = link.getBoundingClientRect();
    return {
      visible: r.width > 200 && r.height > 40,
      right: Math.round(r.right),
      stops: stops.length,
      titleRatio: worst(title), subRatio: worst(sub),
      goRatio: ratio(rgb(getComputedStyle(go).color).slice(0, 3), rgb(getComputedStyle(go).backgroundColor).slice(0, 3)),
      namesGames: /Billion/.test(sub.textContent) && /lagoon/.test(sub.textContent) && /Mauritius/.test(sub.textContent),
      overflow: ${OVERFLOW},
    };
  })()`);
  if (banner.error) throw new Error(banner.error);
  ck('the banner draws at phone width', banner.visible && banner.right <= PHONE_W, JSON.stringify(banner));
  ck('its pitch names the real games', banner.namesGames === true);
  ck('GAME ZONE clears 4.5:1 on every gradient stop', banner.stops >= 2 && banner.titleRatio >= 4.5, banner.titleRatio + ':1 over ' + banner.stops + ' stops');
  ck('the game list clears 4.5:1 too', banner.subRatio >= 4.5, banner.subRatio + ':1');
  ck('the PLAY chip clears 4.5:1', banner.goRatio >= 4.5, banner.goRatio + ':1');
  ck('the banner adds no horizontal scroll', banner.overflow <= 1, banner.overflow + 'px');

  // ── Hub ──
  const hub = await evl(`(() => {
    const scr = document.getElementById('screen-minigames');
    if (!scr) return { error: 'no #screen-minigames' };
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    scr.classList.remove('hidden');
    MiniGames.renderHub();
    const cards = Array.from(document.querySelectorAll('#mg-hub .mg-card'));
    return {
      liveNames: cards.filter(c => c.classList.contains('mg-card-live')).map(c => c.querySelector('b').textContent),
      soonNames: cards.filter(c => c.classList.contains('mg-card-soon')).map(c => c.querySelector('b').textContent),
      widths: cards.map(c => Math.round(c.getBoundingClientRect().width)),
      overflow: ${OVERFLOW},
    };
  })()`);
  if (hub.error) throw new Error(hub.error);
  // Other sessions keep adding games - assert ours are live, not an exact count.
  ck('Word Builder and Island Explorer are live cards',
    hub.liveNames.includes('Word Builder') && hub.liveNames.includes('Island Explorer'), JSON.stringify(hub.liveNames));
  ck('neither is a coming-soon teaser',
    !hub.soonNames.some(n => /Word Builder|Island Explorer/.test(n)), JSON.stringify(hub.soonNames));
  ck('hub cards fit the phone', hub.widths.every(w => w > 200 && w <= PHONE_W), JSON.stringify(hub.widths));
  ck('hub adds no horizontal scroll', hub.overflow <= 1, hub.overflow + 'px');

  // ── Word Builder ──
  const wb = await evl(`(() => {
    MiniGames.startWords();
    const d = MiniGames._wbDebug();
    const tiles = Array.from(document.querySelectorAll('.wb-tile'));
    const slots = document.querySelectorAll('.wb-slot').length;
    const stones = document.querySelectorAll('.wb-stone').length;
    const clue = document.querySelector('.wb-clue');
    return {
      word: d && d.word, tiles: tiles.length, slots, stones,
      clueShown: !!clue && clue.textContent.trim().length > 10,
      tilesLetters: tiles.map(t => t.textContent.trim()).sort().join(''),
      maxRight: Math.max.apply(null, tiles.map(t => Math.round(t.getBoundingClientRect().right))),
      overflow: ${OVERFLOW},
    };
  })()`);
  ck('a crossing starts with 10 stones', wb.stones === 10, String(wb.stones));
  ck('tiles and slots both match the word', !!wb.word && wb.tiles === wb.word.length && wb.slots === wb.word.length,
    wb.word + ': ' + wb.tiles + ' tiles, ' + wb.slots + ' slots');
  ck('the tiles are the word, scrambled', wb.tilesLetters === (wb.word || '').split('').sort().join(''), wb.tilesLetters);
  ck('the crab reads a clue', wb.clueShown === true);
  ck('every tile stays inside the phone', wb.maxRight <= PHONE_W, wb.maxRight + 'px');
  ck('word builder adds no horizontal scroll', wb.overflow <= 1, wb.overflow + 'px');

  const tap = await evl(`(() => {
    const before = MiniGames._wbDebug().typed;
    document.querySelector('.wb-tile:not(.used)').click();
    const d = MiniGames._wbDebug();
    const filled = document.querySelectorAll('.wb-slot.filled').length;
    document.querySelector('.wb-actions .mg-btn-ghost').click();   // ⌫ Undo
    const after = MiniGames._wbDebug().typed;
    return { before, typedNow: d.typed, filled, after };
  })()`);
  ck('a real tap fills the first slot', tap.before === '' && tap.typedNow.length === 1 && tap.filled === 1, JSON.stringify(tap));
  ck('a real Undo empties it again', tap.after === '', JSON.stringify(tap.after));
  await evl('MiniGames.wbQuit()');   // idx 0 - quits without a confirm

  // ── Island Explorer ──
  const ex = await evl(`(() => {
    MiniGames.startExplorer();
    const dots = document.querySelectorAll('.ex-dot').length;
    const opts = document.querySelectorAll('.qf-opt').length;
    const stop = document.querySelector('.ex-stop-body b');
    const district = document.querySelector('.ex-district');
    return {
      dots, opts,
      stopName: stop && stop.textContent,
      districtShown: !!district && /district/.test(district.textContent),
      overflow: ${OVERFLOW},
    };
  })()`);
  ck('the tour has 12 route dots', ex.dots === 12, String(ex.dots));
  ck('the first stop is Port Louis with 4 options', ex.stopName === 'Port Louis' && ex.opts === 4, JSON.stringify(ex));
  ck('the stop card teaches its district', ex.districtShown === true);
  ck('island explorer adds no horizontal scroll', ex.overflow <= 1, ex.overflow + 'px');

  const gold = await evl(`(() => {
    const stash = JSON.parse(sessionStorage.getItem('psac-mg-state:anon'));
    const q = window.MINIGAME_GEO[0].qs[stash.ex.qsIdx[0]];
    const btns = Array.from(document.querySelectorAll('.qf-opt'));
    const right = btns.findIndex(b => b.querySelector('.mg-optext').textContent === q.answer);
    btns[right].click();
    const msg = document.getElementById('mg-msg');
    return { clicked: right, msg: msg ? msg.textContent : '', debug: MiniGames._exDebug() };
  })()`);
  ck('clicking the right answer wins a gold stamp', /Gold stamp/.test(gold.msg), gold.msg);
  await sleep(1600);
  const moved = await evl(`(() => ({ d: MiniGames._exDebug(),
    stop: (document.querySelector('.ex-stop-body b') || {}).textContent }))()`);
  ck('the tour rolls on to stop 2', moved.d.idx === 1 && moved.stop === 'Pamplemousses',
    JSON.stringify(moved));
  ws.close(); chrome.kill(); server.close();
  console.log('');
  console.log(fails ? fails + ' check(s) failed' : 'all checks passed');
  process.exit(fails ? 1 : 0);
})().catch(function (e) { console.error('HARNESS FAIL:', e.message); process.exit(1); });
