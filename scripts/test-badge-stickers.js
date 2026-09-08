'use strict';
// Badge "stickers" — the child's reward art, measured in a real browser.
//
// They were a bare emoji with a 0.6rem caption, and a locked one was the whole
// tile at `opacity: .35`, which took its caption to about 1.7:1. Worse, the
// caption was slate (#374151, with a .dark twin) while #badges-grid only ever
// renders inside #screen-dashboard — a CHALKBOARD in both themes — so on the
// light theme a child read near-black text on dark green.
//
// They are now die-cut discs (gradient, cream rim, gloss) with the locked state
// drawn as an empty dashed slot and a full-strength padlock. This asserts what
// a redesign of that kind can quietly break:
//   • every caption, earned AND locked, clears 4.5:1 against the COMPOSITED
//     ground — the card is translucent, so its own backgroundColor is a lie,
//   • the disc stays a disc (square box, fully round),
//   • the locked slot is visibly a slot (dashed ring, no gradient fill), its
//     padlock is not dimmed with the art, and an earned tile has no padlock,
//   • no tile is dimmed as a whole, which is what made the caption unreadable,
//   • nothing protrudes past a 360px screen.
//
// Run:  node scripts/test-badge-stickers.js
// ⚠ Service worker bypassed and cache disabled, or this measures the previous
//   style.css and reports a change that never landed.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os'), assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const PORT = 8825, DBG = 9365;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const name = path.resolve(root, '.' + p);
  if (!name.startsWith(root + path.sep) || !fs.existsSync(name) || fs.statSync(name).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(name)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(name).pipe(res);
});
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));

let checks = 0;
const ok = (label, cond, detail) => { assert(cond, label + (detail === undefined ? '' : ' — ' + JSON.stringify(detail))); checks++; console.log('✓ ' + label); };
const rgba = c => { const v = c.match(/[\d.]+/g).map(Number); return { r: v[0], g: v[1], b: v[2], a: v.length > 3 ? v[3] : 1 }; };
const lum = c => [c.r, c.g, c.b].map(v => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }).reduce((n, v, i) => n + v * [.2126, .7152, .0722][i], 0);
// ⚠ A caption declared rgba(…,.7) is not its nominal colour: composite the text
// alpha over the ground first, or every translucent chalk value scores as
// though it were opaque.
const ratio = (fgc, bgc) => {
  const f = rgba(fgc), g = rgba(bgc);
  const fg = { r: f.r * f.a + g.r * (1 - f.a), g: f.g * f.a + g.g * (1 - f.a), b: f.b * f.a + g.b * (1 - f.a) };
  const x = lum(fg), y = lum(g);
  return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
};

// A composited-background walk is injected once and reused by both probes: the
// dashboard cards are rgba(0,0,0,.22) over a gradient board, so reading a
// caption against its parent's own backgroundColor measures nothing.
const BG_HELPER = `
window.__bgOf = el => {
  const parse = c => { const m = (c || '').match(/[\\d.]+/g); if (!m) return null; const v = m.map(Number); return { r: v[0], g: v[1], b: v[2], a: v.length > 3 ? v[3] : 1 }; };
  const blend = (t, u) => ({ r: t.r * t.a + u.r * (1 - t.a), g: t.g * t.a + u.g * (1 - t.a), b: t.b * t.a + u.b * (1 - t.a), a: 1 });
  const layers = []; let n = el;
  while (n && n !== document.documentElement) {
    const s = getComputedStyle(n), c = parse(s.backgroundColor);
    if (c && c.a >= 1) { layers.push(c); break; }
    if (c && c.a > 0) layers.push(c);
    // A gradient with no solid colour behind it: sample its darkest declared
    // stop rather than falling through to the page, which would flatter the
    // ratio. #screen-dashboard is exactly this case.
    if (s.backgroundImage && s.backgroundImage !== 'none') {
      const stops = [...s.backgroundImage.matchAll(/rgba?\\(([^)]+)\\)/g)].map(m => parse('rgb(' + m[1] + ')')).filter(c => c && c.a >= 1);
      if (stops.length) { stops.sort((a, b) => (a.r + a.g + a.b) - (b.r + b.g + b.b)); layers.push(stops[0]); break; }
    }
    n = n.parentElement;
  }
  let out = layers.length && layers[layers.length - 1].a >= 1 ? layers.pop() : { r: 255, g: 255, b: 255, a: 1 };
  while (layers.length) out = blend(layers.pop(), out);
  return 'rgb(' + [out.r, out.g, out.b].map(Math.round).join(',') + ')';
};
1`;

// Every other badge is left unearned, so both states are on screen at once.
const RENDER_GRID = `(() => {
  document.querySelectorAll('.screen').forEach(x => x.classList.add('hidden'));
  document.getElementById('screen-dashboard').classList.remove('hidden');
  const all = packBadges();
  document.getElementById('badges-grid').innerHTML = all.map((b, i) =>
    '<div class="badge-item ' + (i % 2 ? 'locked' : '') + '" title="' + b.desc + '">'
    + '<span class="badge-icon">' + b.icon + '</span>'
    + '<span class="badge-name">' + b.name + '</span></div>').join('');
  return all.length;
})()`;

const MEASURE_GRID = `(() => {
  const grid = document.getElementById('badges-grid');
  const out = { ground: window.__bgOf(grid), items: [], overflow: [] };
  grid.querySelectorAll('.badge-item').forEach(it => {
    const ico = it.querySelector('.badge-icon'), nm = it.querySelector('.badge-name');
    const r = ico.getBoundingClientRect(), s = getComputedStyle(ico);
    out.items.push({
      locked: it.classList.contains('locked'),
      w: Math.round(r.width), h: Math.round(r.height),
      radius: s.borderTopLeftRadius, border: s.borderTopStyle,
      bgImage: s.backgroundImage, shadow: s.boxShadow,
      nameColor: getComputedStyle(nm).color,
      itemOpacity: getComputedStyle(it).opacity,
      lock: getComputedStyle(it, '::after').content,
    });
  });
  grid.querySelectorAll('*').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width > 1 && (r.right > window.innerWidth + 1 || r.left < -1)) out.overflow.push(String(el.className) + ' @' + Math.round(r.right));
  });
  return out;
})()`;

const RENDER_STRIP = `(() => {
  document.querySelectorAll('.screen').forEach(x => x.classList.add('hidden'));
  const all = packBadges();
  const host = document.createElement('div');
  host.id = 'screen-student-home';
  host.style.cssText = 'position:fixed;inset:0;z-index:9999;overflow:auto;padding:12px;background:#23422a';
  host.innerHTML = '<div class="sh-badges-section"><div class="sh-badges-strip">'
    + all.map(b => '<div class="sh-badge-item"><span class="sh-badge-icon">' + b.icon + '</span><span class="sh-badge-name">' + b.name + '</span></div>').join('')
    + '</div></div>';
  document.body.appendChild(host);
  const out = { ground: window.__bgOf(host.querySelector('.sh-badges-strip')), names: [], discs: [], overflow: [] };
  host.querySelectorAll('.sh-badge-name').forEach(n => out.names.push(getComputedStyle(n).color));
  host.querySelectorAll('.sh-badge-icon').forEach(i => {
    const r = i.getBoundingClientRect(), s = getComputedStyle(i);
    out.discs.push({ w: Math.round(r.width), h: Math.round(r.height), radius: s.borderTopLeftRadius, bgImage: s.backgroundImage });
  });
  host.querySelectorAll('*').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width > 1 && (r.right > window.innerWidth + 1 || r.left < -1)) out.overflow.push(String(el.className));
  });
  return out;
})()`;

(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG, '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-badge-')), '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  let version; for (let i = 0; i < 40 && !version; i++) { try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); } }
  assert(version, 'Chrome starts');
  const ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let serial = 0; const waiting = new Map();
  ws.onmessage = e => { const m = JSON.parse(e.data); if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); } };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const id = ++serial, t = setTimeout(() => { waiting.delete(id); rej(Error('Timeout ' + method)); }, 20000);
    waiting.set(id, m => { clearTimeout(t); m.error ? rej(Error(m.error.message)) : res(m.result); });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const target = await send('Target.createTarget', { url: 'about:blank' });
  const session = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
  const call = (m, p) => send(m, p, session.sessionId);
  await call('Page.enable'); await call('Runtime.enable'); await call('Network.enable');
  await call('Network.setBypassServiceWorker', { bypass: true }); await call('Network.setCacheDisabled', { cacheDisabled: true });
  const ev = async expr => {
    const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    assert(!r.exceptionDetails, String(r.exceptionDetails && r.exceptionDetails.exception && r.exceptionDetails.exception.description || '').slice(0, 400));
    return r.result.value;
  };
  await call('Emulation.setDeviceMetricsOverride', { width: 360, height: 900, deviceScaleFactor: 2, mobile: true });
  await call('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/' });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof packBadges !== 'undefined'"); } catch (_) {} }
  assert(ready, 'app globals loaded');
  await sleep(800);
  await ev(BG_HELPER);

  for (const theme of ['light', 'dark']) {
    await ev("document.documentElement.classList.toggle('dark', " + (theme === 'dark') + ')');
    const count = await ev(RENDER_GRID);
    ok(theme + ': the grid renders every badge', count >= 7, count);
    const m = await ev(MEASURE_GRID);
    const earned = m.items.filter(i => !i.locked), locked = m.items.filter(i => i.locked);
    ok(theme + ': both states are on screen at once', earned.length > 0 && locked.length > 0, [earned.length, locked.length]);

    const worst = { earned: Infinity, locked: Infinity };
    for (const it of m.items) {
      const r = ratio(it.nameColor, m.ground);
      const key = it.locked ? 'locked' : 'earned';
      worst[key] = Math.min(worst[key], r);
      ok(theme + ': no ' + key + ' tile is dimmed as a whole', Number(it.itemOpacity) === 1, it.itemOpacity);
      if (r < 4.5) ok(theme + ': ' + key + ' caption clears 4.5:1', false, { fg: it.nameColor, bg: m.ground, ratio: +r.toFixed(2) });
    }
    ok(theme + ': earned captions clear 4.5:1 on the board (' + worst.earned.toFixed(2) + ':1)', worst.earned >= 4.5, m.ground);
    ok(theme + ': locked captions clear 4.5:1 on the board (' + worst.locked.toFixed(2) + ':1)', worst.locked >= 4.5, m.ground);

    ok(theme + ': earned discs are round and square-boxed',
      earned.every(i => i.w === i.h && i.w >= 48 && /50%/.test(i.radius)), earned[0]);
    ok(theme + ': earned discs carry the sticker gradient and rim',
      earned.every(i => /gradient/.test(i.bgImage) && i.shadow !== 'none'), earned[0]);
    ok(theme + ': locked slots are a dashed empty ring, not faded art',
      locked.every(i => i.border === 'dashed' && i.bgImage === 'none' && i.shadow === 'none'), locked[0]);
    ok(theme + ': the locked slot carries its own padlock', locked.every(i => /🔒/.test(i.lock)), locked[0].lock);
    ok(theme + ': an earned tile shows no padlock', earned.every(i => !/🔒/.test(i.lock)), earned[0].lock);
    ok(theme + ': nothing protrudes past 360px', m.overflow.length === 0, m.overflow);
  }

  // The chalk strip on the student home board — same sticker, different ground.
  const strip = await ev(RENDER_STRIP);
  const worstStrip = Math.min(...strip.names.map(c => ratio(c, strip.ground)));
  ok('chalk strip captions clear 4.5:1 on the board (' + worstStrip.toFixed(2) + ':1)', worstStrip >= 4.5, strip.ground);
  ok('chalk strip discs are round and carry the gradient',
    strip.discs.length > 0 && strip.discs.every(d => d.w === d.h && /50%/.test(d.radius) && /gradient/.test(d.bgImage)), strip.discs[0]);
  ok('chalk strip does not protrude past 360px', strip.overflow.length === 0, strip.overflow);

  console.log('\nBadge stickers: ' + checks + ' checks passed.');
  ws.close(); chrome.kill(); server.close(); process.exit(0);
})().catch(e => { console.error(e.message || e); process.exit(1); });
