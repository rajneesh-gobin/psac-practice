'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Shelf scroll arrows in Past Exam Papers, measured in real Chrome.
//
//  WHY — reported from the app: "when we have many papers in a row, on a PC I
//  am having difficulty to scroll horizontally, maybe it would be easier in
//  mobile." Exactly right: .lb-row is a horizontal scroll row with scroll-snap,
//  which is effortless with a thumb and awkward with a mouse — the wheel
//  scrolls the PAGE, and shift+wheel is a trick most people never learn.
//
//  ⚠ The arrows are gated on `@media (hover:hover) and (pointer:fine)`, so a
//    test has to emulate the POINTER, and Emulation.setDeviceMetricsOverride
//    does not do that. Measured here: with {mobile:true, 390x844} Chrome still
//    reports pointer:fine and hover:hover. Only setTouchEmulationEnabled flips
//    them (fine:false coarse:true hover:none). A test that resizes the viewport
//    and calls it 'mobile' therefore asserts nothing about this media query.
//
//  ⚠ They are also hidden on rows that cannot scroll (.is-static), because a
//    shelf holding two papers is common and arrows that do nothing are
//    furniture. Both states are asserted.
//
//  Run:  node scripts/test-library-shelf-arrows.js
// ══════════════════════════════════════════════════════════════════════════

const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8857, DBG = 9401;
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

// The markup _shelf() produces, with enough cards to overflow.
const SHELF = (n) => `
  <section class="lb-shelf">
    <div class="lb-rowbox">
      <button type="button" class="lb-arrow lb-arrow-l" onclick="Library.scrollShelf(this, -1)">\u2039</button>
      <div class="lb-row">${Array.from({ length: n }, (_, i) =>
        `<div style="flex:0 0 112px;height:150px;background:#ddd">${i}</div>`).join('')}</div>
      <button type="button" class="lb-arrow lb-arrow-r" onclick="Library.scrollShelf(this, 1)">\u203a</button>
    </div>
  </section>`;

(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-arrows-'));
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
    // A desktop viewport with NO touch emulation: pointer:fine, hover:hover.
    await call('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
    await call('Emulation.setTouchEmulationEnabled', { enabled: false });
    await call('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
    for (let i = 0; i < 90; i++) {
      if (await ev(`typeof Library !== 'undefined'`)) break;
      await sleep(200);
    }
    await sleep(800);
    ok('the Library module loaded', await ev(`typeof Library === 'object'`));
    ok('scrollShelf is exported', await ev(`typeof Library.scrollShelf === 'function'`));

    // Build a long shelf and a short one in a visible host.
    await ev(`(() => {
      const host = document.createElement('div');
      host.id = 'arrowtest';
      host.style.cssText = 'width:600px;position:fixed;top:0;left:0;z-index:99999;background:#fff';
      host.innerHTML = \`${SHELF(30).replace(/`/g, '\\`')}\` + \`${SHELF(2).replace(/`/g, '\\`')}\`;
      document.body.appendChild(host);
      // mirror what _syncShelfArrows() does after a render
      host.querySelectorAll('.lb-rowbox').forEach(box => {
        const row = box.querySelector('.lb-row');
        box.classList.toggle('is-static', row.scrollWidth <= row.clientWidth + 4);
      });
      return 1;
    })()`);

    const state = await ev(`(() => {
      const boxes = [...document.querySelectorAll('#arrowtest .lb-rowbox')];
      return boxes.map(b => {
        const row = b.querySelector('.lb-row');
        const arrow = b.querySelector('.lb-arrow-r');
        const cs = getComputedStyle(arrow);
        return { cards: row.children.length, overflows: row.scrollWidth > row.clientWidth + 4,
                 isStatic: b.classList.contains('is-static'), display: cs.display };
      });
    })()`);
    ok('the long shelf overflows and is not marked static',
      state[0] && state[0].overflows && !state[0].isStatic, state[0]);
    ok('its arrows are rendered for a mouse (display is not none)',
      state[0] && state[0].display !== 'none', state[0]);
    ok('the two-card shelf is marked static', state[1] && state[1].isStatic, state[1]);
    ok('and its arrows are hidden', state[1] && state[1].display === 'none', state[1]);

    // ── the arrow actually scrolls ───────────────────────────────────────
    const scrolled = await ev(`(async () => {
      const box = document.querySelector('#arrowtest .lb-rowbox');
      const row = box.querySelector('.lb-row');
      const before = row.scrollLeft;
      box.querySelector('.lb-arrow-r').click();
      await new Promise(r => setTimeout(r, 700));   // smooth scroll needs time
      const after = row.scrollLeft;
      box.querySelector('.lb-arrow-l').click();
      await new Promise(r => setTimeout(r, 700));
      return { before, after, back: row.scrollLeft, max: row.scrollWidth - row.clientWidth };
    })()`);
    ok('the right arrow scrolls the row forward', scrolled && scrolled.after > scrolled.before, scrolled);
    ok('the left arrow brings it back', scrolled && scrolled.back < scrolled.after, scrolled);
    // ⚠ Not a full screenful: leaving a card visible keeps the reader's place.
    ok('it moves by most of a screenful, not all of it',
      scrolled && scrolled.after > 200 && scrolled.after < scrolled.max, scrolled);

    // ── on touch the arrows must not appear at all ───────────────────────
    await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    // ⚠ This line, not the one above, is what makes the media query see a thumb.
    await call('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
    await sleep(400);
    ok('the emulated device really does report a coarse pointer',
      await ev("matchMedia('(pointer:coarse)').matches && matchMedia('(hover:none)').matches"));
    const touch = await ev(`getComputedStyle(document.querySelector('#arrowtest .lb-arrow-r')).display`);
    ok('on a touch screen the arrows are hidden (swipe is enough)', touch === 'none', touch);
  } catch (e) {
    fail++; console.log('FAIL harness -- ' + e.message);
  }

  console.log(`\nShelf arrows: ${pass} passed, ${fail} failed.`);
  ws.close(); chrome.kill(); server.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
