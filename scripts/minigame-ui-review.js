'use strict';
// UI review tool for the Game Zone: drives every live minigame to its key
// screens in headless Chrome at phone size, captures screenshots, and measures
// what a reviewer would otherwise eyeball - horizontal overflow, elements
// leaking past the viewport, tap targets under 40px, sub-11px text.
// Not a pass/fail test (that is test-minigame-arcade-ui.js) - it prints a
// report and writes PNGs for a human (or model) to look at.
// Run: node scripts/minigame-ui-review.js [outDir]
const http = require('http');
const fs   = require('fs');
const path = require('path');
const os   = require('os');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8799;
const CDP_PORT = 9343;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const OUT = path.resolve(process.argv[2] || path.join(os.tmpdir(), 'psac-mg-review'));
fs.mkdirSync(OUT, { recursive: true });

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
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
});
function getJson(url) {
  return new Promise(function (ok, no) {
    http.get(url, function (r) { let b = ''; r.on('data', c => { b += c; }); r.on('end', () => ok(JSON.parse(b))); }).on('error', no);
  });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Every visible element that leaks past the viewport, every small tap target,
// every sub-11px text - reported with enough of a selector to find it.
const METRICS = `(() => {
  const W = document.documentElement.clientWidth;
  const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
  const name = el => el.tagName.toLowerCase() + (el.id ? '#' + el.id : el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).slice(0,2).join('.') : '');
  const root = document.getElementById('screen-minigames') || document.body;
  const all = Array.from(root.querySelectorAll('*')).filter(vis);
  const leaks = all.filter(el => el.getBoundingClientRect().right > W + 1 || el.getBoundingClientRect().left < -1)
    .slice(0, 8).map(el => name(el) + ' right=' + Math.round(el.getBoundingClientRect().right));
  const smallTaps = all.filter(el => (el.tagName === 'BUTTON') && (el.getBoundingClientRect().height < 38 || el.getBoundingClientRect().width < 38))
    .slice(0, 8).map(el => name(el) + ' ' + Math.round(el.getBoundingClientRect().width) + 'x' + Math.round(el.getBoundingClientRect().height));
  const tinyText = all.filter(el => el.children.length === 0 && el.textContent.trim().length > 2 && parseFloat(getComputedStyle(el).fontSize) < 10.6)
    .slice(0, 8).map(el => name(el) + ' ' + getComputedStyle(el).fontSize);
  return {
    overflow: document.documentElement.scrollWidth - W,
    pageH: Math.round((document.getElementById('mg-game') || root).getBoundingClientRect().height),
    leaks, smallTaps, tinyText,
  };
})()`;

(async function () {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-rev-'));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + CDP_PORT,
    '--user-data-dir=' + profile, '--no-first-run', '--no-default-browser-check',
    '--disable-gpu', '--window-size=360,740', 'about:blank'], { stdio: 'ignore' });
  let ver = null;
  for (let i = 0; i < 80 && !ver; i++) {
    try { ver = await getJson('http://127.0.0.1:' + CDP_PORT + '/json/version'); } catch (e) { await sleep(250); }
  }
  if (!ver) throw new Error('Chrome never came up');
  const ws = new globalThis.WebSocket(ver.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0; const pending = new Map();
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
      const t = setTimeout(() => { pending.delete(mid); reject(new Error('CDP timeout: ' + method)); }, 30000);
      pending.set(mid, { resolve: r => { clearTimeout(t); resolve(r); }, reject: e => { clearTimeout(t); reject(e); } });
      ws.send(JSON.stringify({ id: mid, method, params: params || {}, sessionId }));
    });
  }
  const t1 = await send('Target.createTarget', { url: 'about:blank' });
  const t2 = await send('Target.attachToTarget', { targetId: t1.targetId, flatten: true });
  const S = (m, p) => send(m, p, t2.sessionId);
  const evl = async (expr, awaitP) => {
    const r = await S('Runtime.evaluate', { returnByValue: true, expression: expr, awaitPromise: !!awaitP });
    if (r.exceptionDetails) throw new Error('page threw: ' + ((r.exceptionDetails.exception || {}).description || r.exceptionDetails.text));
    return r.result.value;
  };

  await S('Page.enable'); await S('Runtime.enable'); await S('Network.enable');
  await S('Network.setCacheDisabled', { cacheDisabled: true });
  for (const dom of ['Network.setBypassServiceWorker', 'Page.setBypassServiceWorker']) {
    try { await S(dom, { bypass: true }); break; } catch (_) {}
  }
  const setSize = (w, h) => S('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 2, mobile: true });
  await setSize(360, 740);
  await S('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/index.html' });
  let ready = false;
  for (let i = 0; i < 60 && !ready; i++) {
    await sleep(500);
    try { ready = (await evl(`document.readyState === 'complete' && typeof MiniGames !== 'undefined'`)) === true; } catch (_) {}
  }
  if (!ready) throw new Error('app never finished loading');

  // Seed a question pool so the bank-driven games can start; vary the text
  // length because long questions are where phone layouts break.
  await evl(`(() => {
    const long = 'A market vendor in Port Louis sells 3 pineapples for Rs 75 and offers a fourth at half price. How much would a customer pay for 4 pineapples in total?';
    const short = 'What is 7 × 8?';
    for (let i = 0; i < 60; i++) STATIC_QUESTIONS.push({
      type: 'mcq', id: 'uirev-' + i, chapterId: 'uirev', difficulty: (i % 4) + 1,
      question: i % 3 === 0 ? long : short,
      options: i % 3 === 0 ? ['Rs 112.50', 'Rs 100', 'Rs 87.50', 'Rs 125'] : ['56', '54', '63', '48'],
      answer: i % 3 === 0 ? 'Rs 112.50' : '56',
      hint: 'Take it step by step.', explanation: 'Worked answer here.',
    });
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById('screen-minigames').classList.remove('hidden');
    return STATIC_QUESTIONS.length;
  })()`);

  const report = [];
  async function shoot(tag, extra) {
    for (const theme of ['light', 'dark']) {
      await evl(`document.documentElement.classList.${theme === 'dark' ? 'add' : 'remove'}('dark')`);
      await sleep(150);
      const png = await S('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(OUT, tag + '-' + theme + '.png'), Buffer.from(png.data, 'base64'));
    }
    await evl(`document.documentElement.classList.remove('dark')`);
    const m = await evl(METRICS);
    m.screen = tag; if (extra) m.note = extra;
    report.push(m);
    console.log(tag + ': overflow=' + m.overflow + 'px h=' + m.pageH
      + (m.leaks.length ? ' LEAKS[' + m.leaks.join(' | ') + ']' : '')
      + (m.smallTaps.length ? ' SMALL-TAPS[' + m.smallTaps.join(' | ') + ']' : '')
      + (m.tinyText.length ? ' TINY-TEXT[' + m.tinyText.join(' | ') + ']' : ''));
  }

  // ── Hub ──
  await evl(`MiniGames.renderHub()`); await sleep(200);
  await shoot('01-hub');
  await setSize(320, 640); await sleep(150); await shoot('01-hub-320');
  await setSize(360, 740); await sleep(150);

  // ── Billionaire Q1 (long question) ──
  await evl(`MiniGames.renderHub(); MiniGames.startBillionaire()`); await sleep(300);
  await shoot('02-billionaire');
  await evl(`MiniGames.life('owl')`); await sleep(150);
  await shoot('03-billionaire-owl');
  await evl(`MiniGames.confirmQuit()`);

  // ── Quick Fire ──
  await evl(`MiniGames.startQuick()`); await sleep(300);
  await shoot('04-quickfire');
  await evl(`MiniGames.qfQuit()`);

  // ── Word Builder: fresh, half-typed, and the lose end-screen ──
  await evl(`MiniGames.startWords()`); await sleep(300);
  await shoot('05-wordbuilder');
  await evl(`(() => { MiniGames.wbTap(0); MiniGames.wbTap(1); })()`); await sleep(150);
  await shoot('06-wordbuilder-typed');
  await evl(`(async () => {
    const sl = ms => new Promise(r => setTimeout(r, ms));
    for (let round = 0; round < 5 && !(MiniGames._wbDebug() || {}).over; round++) {
      const d = MiniGames._wbDebug(); if (!d || d.over) break;
      const undo = d.typed.length;
      for (let u = 0; u < undo; u++) MiniGames.wbUndo();
      const len = d.word.length;
      for (let i = 0; i < len; i++) MiniGames.wbTap(i);
      await sl(1400);
    }
  })()`, true);
  await shoot('07-wordbuilder-end');

  // ── Island Explorer: play + gold-run to the passport ──
  await evl(`MiniGames.startExplorer()`); await sleep(300);
  await shoot('08-explorer');
  await evl(`(async () => {
    const sl = ms => new Promise(r => setTimeout(r, ms));
    for (let i = 0; i < 15; i++) {
      const d = MiniGames._exDebug(); if (!d || d.over) break;
      const stash = JSON.parse(sessionStorage.getItem('psac-mg-state:anon'));
      const q = window.MINIGAME_GEO[d.idx].qs[stash.ex.qsIdx[d.idx]];
      MiniGames.exAnswer(q.options.indexOf(q.answer));
      await sl(1500);
    }
  })()`, true);
  await shoot('09-explorer-passport');

  // ── Number Ninja ──
  await evl(`MiniGames.startNinja()`); await sleep(300);
  await shoot('10-ninja');
  await evl(`MiniGames.njQuit()`);

  // ── Brain Battle: handover + question ──
  await evl(`MiniGames.startBattle()`); await sleep(300);
  await shoot('11-battle-ready');
  await evl(`MiniGames.bbReady()`); await sleep(300);
  await shoot('12-battle-question');
  await evl(`MiniGames.bbQuit()`);

  // ── Time Traveller (only if its bank is wired in) ──
  const hasTT = await evl(`typeof MiniGames.startTimeTravel === 'function' && !!window.MINIGAME_TIME`);
  if (hasTT) {
    await evl(`MiniGames.startTimeTravel()`); await sleep(300);
    await shoot('13-timetravel');
    await evl(`MiniGames.ttQuit()`);
  } else console.log('13-timetravel: skipped (bank not wired yet)');

  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  ws.close(); chrome.kill(); server.close();
  console.log('\nscreenshots + report.json in ' + OUT);
})().catch(function (e) { console.error('HARNESS FAIL:', e.message); process.exit(1); });
