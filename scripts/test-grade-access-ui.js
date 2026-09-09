'use strict';
// The two grade-access surfaces in REAL headless Chrome at 360px:
//   · the parent's Grade Access card (Parent Controls)
//   · the child's "Questions from" chips in the Game Zone hub
// Measured, not eyeballed: every label clears 4.5:1 in BOTH themes, every
// tappable chip clears 44px, and neither surface adds horizontal scroll.
//
// ⚠ Both surfaces are injected with innerHTML, so the Tailwind Play CDN never
//   generates a rule for the chips - every one of their styles has to be in
//   style.css, and only a real browser can tell you whether it is.
//
// WARNING Fresh Chrome profile with the service worker bypassed - a stale shell
//   reports a CSS fix as landed when it is not.
// Run: node scripts/test-grade-access-ui.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8799;
const CDP_PORT = 9343;
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

// Contrast helpers, run in the page so they read COMPUTED colour.
const CONTRAST_FNS = `
  const _rgb = v => (String(v).match(/[0-9.]+/g) || []).map(Number).slice(0, 3);
  const _lum = c => { const f = c.map(v => { v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2]; };
  const _ratio = (a, b) => { const l1 = _lum(a), l2 = _lum(b);
    return Math.round(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)) * 100) / 100; };
  // The nearest ancestor that actually paints - a transparent chip inherits the
  // card behind it, and comparing against transparent scores everything perfect.
  const _bg = el => { for (let n = el; n; n = n.parentElement) {
      const c = getComputedStyle(n).backgroundColor;
      const p = (String(c).match(/[0-9.]+/g) || []).map(Number);
      if (p.length === 3 || (p.length === 4 && p[3] > 0.5)) return p.slice(0, 3);
    } return [255, 255, 255]; };
  const _contrast = el => _ratio(_rgb(getComputedStyle(el).color), _bg(el));
`;

(async function () {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-gradeaccess-'));
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
  const S = (m, p) => send(m, p, t2.sessionId);
  const evl = async expr => {
    const r = await S('Runtime.evaluate', { returnByValue: true, expression: expr });
    if (r.exceptionDetails) throw new Error('page threw: ' +
      ((r.exceptionDetails.exception && r.exceptionDetails.exception.description) || r.exceptionDetails.text));
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

  let ready = false;
  for (let i = 0; i < 60 && !ready; i++) {
    await sleep(500);
    try {
      const r = await S('Runtime.evaluate', { returnByValue: true, expression:
        `document.readyState === 'complete' && typeof GradeAccess !== 'undefined'
         && typeof GameSettings !== 'undefined' && !!document.getElementById('pd-grade-access')` });
      ready = r.result.value === true;
    } catch (_) {}
  }
  if (!ready) throw new Error('app never finished loading');
  await sleep(400);

  let fails = 0;
  function ck(name, ok, detail) {
    if (ok) { console.log('  ok   ' + name); return; }
    fails++; console.log('  FAIL ' + name + (detail ? '  -> ' + detail : ''));
  }
  // Stop at the document element: body carries overflow-x: clip, which makes
  // every page look clean to a naive check.
  const OVERFLOW = 'document.documentElement.scrollWidth - document.documentElement.clientWidth';

  const live = await evl(`GradeAccess.liveGrades()`);
  ck('the app ships more than one live grade, or nothing here is testable', live.length >= 2, JSON.stringify(live));
  // ⚠ The page decides whose grade this is (GradeAccess.ownGrade reads the
  //   signed-in account, then SELECTED_GRADE). Assuming the lowest live grade
  //   grants the child a grade they already have, and the row correctly
  //   vanishes - which reads as a broken feature rather than a wrong fixture.
  const own = await evl(`GradeAccess.ownGrade()`);
  const higher = live.filter(g => g > own);
  ck(`grade ${own} has a higher live grade to grant`, higher.length >= 1, JSON.stringify(live));

  // ── The parent's Grade Access card ──────────────────────────────────────
  const card = await evl(`(() => {
    ${CONTRAST_FNS}
    DB.restrictions = { lockedChapters: [], allowedGrades: [${higher[0]}] };
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    const scr = document.getElementById('pd-grade-access').closest('.screen');
    if (scr) scr.classList.remove('hidden');
    for (let n = document.getElementById('pd-grade-access'); n; n = n.parentElement) n.classList.remove('hidden');
    _renderGradeAccess({ grade: ${own} });
    const rows = Array.from(document.querySelectorAll('#pd-grade-access label'));
    const boxes = rows.map(r => r.querySelector('input'));
    return {
      rows: rows.length,
      grades: rows.map(r => r.textContent.replace(/\\s+/g, ' ').trim()),
      ownDisabled: boxes.filter(b => b.disabled).length,
      ownChecked: boxes.filter(b => b.disabled).every(b => b.checked),
      checked: boxes.filter(b => b.checked).length,
      handlers: boxes.filter(b => b.getAttribute('onchange')).length,
      ownHandler: boxes.filter(b => b.disabled && b.getAttribute('onchange')).length,
      minContrast: Math.min.apply(null, rows.map(r => _contrast(r.querySelector('span')))),
      right: Math.max.apply(null, rows.map(r => Math.round(r.getBoundingClientRect().right))),
      overflow: ${OVERFLOW},
    };
  })()`);
  ck('the card lists every live grade', card.rows === live.length, JSON.stringify(card.grades));
  ck("the own grade is ticked and cannot be unticked",
    card.ownDisabled === 1 && card.ownChecked === true, JSON.stringify(card));
  ck('it carries no handler either - a disabled box is not the only guard',
    card.ownHandler === 0, String(card.ownHandler));
  ck('the granted grade is ticked too', card.checked === 2, String(card.checked));
  ck("every other grade is the parents to change",
    card.handlers === live.length - 1, String(card.handlers));
  ck('row labels clear 4.5:1', card.minContrast >= 4.5, card.minContrast + ':1');
  ck('the card fits the phone', card.right <= PHONE_W, card.right + 'px');
  ck('the card adds no horizontal scroll', card.overflow <= 1, card.overflow + 'px');

  // ── The child's chips in the Game Zone hub ───────────────────────────────
  const chipsFor = async theme => evl(`(() => {
    ${CONTRAST_FNS}
    document.documentElement.classList.toggle('dark', ${theme === 'dark'});
    DB.restrictions = { lockedChapters: [], allowedGrades: [${higher[0]}] };
    DB.games = { sourceGrades: [${higher[0]}] };
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    const scr = document.getElementById('screen-minigames');
    if (!scr) return { error: 'no #screen-minigames' };
    scr.classList.remove('hidden');
    MiniGames.renderHub();
    const bar = document.querySelector('#mg-hub .mg-gradebar');
    if (!bar) return { error: 'no chips rendered' };
    const chips = Array.from(bar.querySelectorAll('.mg-gchip'));
    return {
      chips: chips.length,
      labels: chips.map(c => c.textContent.replace(/\\s+/g, ' ').trim()),
      minHeight: Math.min.apply(null, chips.map(c => Math.round(c.getBoundingClientRect().height))),
      minContrast: Math.min.apply(null, chips.map(_contrast)),
      labelContrast: _contrast(bar.querySelector('.mg-gradebar-label')),
      pressed: chips.filter(c => c.getAttribute('aria-pressed') === 'true').length,
      // A chip with no border and no background colour of its own means style.css
      // never loaded these rules - which is exactly what the Tailwind CDN cannot do.
      styled: chips.every(c => getComputedStyle(c).borderTopWidth !== '0px'),
      right: Math.max.apply(null, chips.map(c => Math.round(c.getBoundingClientRect().right))),
      overflow: ${OVERFLOW},
    };
  })()`);

  for (const theme of ['light', 'dark']) {
    const c = await chipsFor(theme);
    if (c.error) { ck(theme + ': the chips render at all', false, c.error); continue; }
    // One granted grade, so two choices: their own and that one. Every OTHER
    // live grade must be absent - a chip for a grade the parent did not grant is
    // the whole failure this feature exists to prevent.
    ck(theme + ': one chip per choice the child has',
      c.chips === 2 && c.labels.length === 2, JSON.stringify(c.labels));
    ck(theme + ': the chips are the own grade and the granted one',
      c.labels.some(l => l.includes('Grade ' + own)) && c.labels.some(l => l.includes('Grade ' + higher[0])),
      JSON.stringify(c.labels));
    ck(theme + ': the chips carry their own styling (style.css, not the CDN)', c.styled === true);
    ck(theme + ': every chip clears the 44px touch target', c.minHeight >= 44, c.minHeight + 'px');
    ck(theme + ': chip text clears 4.5:1', c.minContrast >= 4.5, c.minContrast + ':1');
    ck(theme + ': the "Questions from" label clears 4.5:1', c.labelContrast >= 4.5, c.labelContrast + ':1');
    ck(theme + ': own grade and the chosen grade both read as on', c.pressed === 2, String(c.pressed));
    ck(theme + ': the row fits the phone', c.right <= PHONE_W, c.right + 'px');
    ck(theme + ': the row adds no horizontal scroll', c.overflow <= 1, c.overflow + 'px');
  }

  // ── Nothing granted ⇒ no row at all ──────────────────────────────────────
  const bare = await evl(`(() => {
    DB.restrictions = { lockedChapters: [] };
    DB.games = {};
    MiniGames.renderHub();
    return { bar: document.querySelectorAll('#mg-hub .mg-gradebar').length,
             cards: document.querySelectorAll('#mg-hub .mg-card').length };
  })()`);
  ck('with nothing granted the row is absent, not an empty box', bare.bar === 0, String(bare.bar));
  ck('and the hub still draws its games', bare.cards > 0, String(bare.cards));

  ws.close(); chrome.kill(); server.close();
  console.log('');
  console.log(fails ? fails + ' check(s) failed' : 'all checks passed');
  process.exit(fails ? 1 : 0);
})().catch(function (e) { console.error('HARNESS FAIL:', e.message); process.exit(1); });
