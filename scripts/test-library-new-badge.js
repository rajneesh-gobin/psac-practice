'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  The "Past Exam Papers" header button and its TEMPORARY "New" badge,
//  measured in real Chrome.
//
//  Three things this has to get right, all of which have bitten this header:
//   1. ⚠ THE HEADER ROW MUST NOT WRAP. style.css records that with all eight
//      controls showing, the labelled toolbar once came out 2px wider than its
//      container and wrapped the whole row — the padding is 0.55rem rather than
//      0.6rem for exactly that reason. Both a badge and a longer label add
//      width to that row.
//   2. ⚠ THE LABEL MUST NOT BE CLIPPED. .hdr-word is max-width:7rem with
//      text-overflow:ellipsis, so a long label does not overflow visibly — it
//      is silently cut to "Past Exam Pap…", which reads as a typo rather than
//      a layout problem. Only scrollWidth > clientWidth reveals it.
//   3. ⚠ THE BADGE IS A SIBLING of .hdr-word, never inside it.
//      _renderHeaderMenu() builds each mobile menu row's label from
//      `.hdr-word`.textContent, so a badge inside that span would put the word
//      "New" into the label itself.
//
//  Run:  node scripts/test-library-new-badge.js
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

  try {
    // ── desktop width: the labelled toolbar is at its widest here ─────────
    await call('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
    await call('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
    for (let i = 0; i < 90; i++) {
      if (await ev(`!!document.getElementById('btn-open-library')`)) break;
      await sleep(200);
    }
    await sleep(1200);

    // ⚠ The whole <header> is display:none on the landing screen, which is
    //   where the app settles when Auth cannot reach Supabase from a test rig.
    //   Measuring through that returns 0x0 for everything and reads as a broken
    //   badge. Reveal the header — the layout under test is the one a SIGNED-IN
    //   user sees — and confirm it actually became visible before trusting any
    //   number that follows.
    const revealed = await ev(`(() => {
      const h = document.querySelector('header');
      if (!h) return false;
      h.style.display = 'block';
      return getComputedStyle(h).display !== 'none'
        && document.getElementById('hdr-actions').getBoundingClientRect().width > 0;
    })()`);
    ok('the header can be measured (revealed for the test)', revealed);

    const badge = await ev(`(() => {
      const b = document.querySelector('#btn-open-library .hdr-new');
      if (!b) return null;
      const r = b.getBoundingClientRect(), cs = getComputedStyle(b);
      return { text: b.textContent.trim(), w: Math.round(r.width), h: Math.round(r.height),
               bg: cs.backgroundColor, visible: r.width > 0 && r.height > 0 };
    })()`);
    ok('the badge exists on the Past Exam Papers button', !!badge, badge);
    ok('it reads "New"', badge && badge.text === 'New', badge && badge.text);
    ok('it is actually rendered, not a 0x0 box', badge && badge.visible, badge);
    ok('it is small - under 34px wide', badge && badge.w > 0 && badge.w < 34, badge && badge.w);

    // ⚠ the whole point of the sibling placement
    const word = await ev(`document.querySelector('#btn-open-library .hdr-word').textContent.trim()`);
    ok('.hdr-word reads exactly "Past Exam Papers"', word === 'Past Exam Papers', word);

    // ⚠ .hdr-word is max-width:7rem with text-overflow:ellipsis. A long label
    //   does not overflow — it gets SILENTLY CLIPPED to "Past Exam Pap…", which
    //   looks like a typo rather than a layout bug. scrollWidth > clientWidth is
    //   the only way to see it from the DOM.
    const clip = await ev(`(() => {
      const w = document.querySelector('#btn-open-library .hdr-word');
      const cs = getComputedStyle(w);
      return { scrollW: w.scrollWidth, clientW: w.clientWidth, maxW: cs.maxWidth, overflow: cs.textOverflow };
    })()`);
    ok('the label is not clipped by the 7rem cap',
      clip && clip.scrollW <= clip.clientW + 1, clip);

    // ⚠ the header must still be ONE row
    const row = await ev(`(() => {
      const bar = document.getElementById('hdr-actions');
      if (!bar) return null;
      const kids = [...bar.children].filter(el => el.getBoundingClientRect().height > 0);
      const tops = [...new Set(kids.map(el => Math.round(el.getBoundingClientRect().top)))];
      return { rows: tops.length, buttons: kids.length, barW: Math.round(bar.getBoundingClientRect().width),
               scrollW: bar.scrollWidth };
    })()`);
    ok('the header action bar is still a single row', row && row.rows === 1, row);
    ok('and it does not overflow its container', row && row.scrollW <= row.barW + 1, row);

    // ── mobile: the button is hidden, the menu row carries the badge ──────
    await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    await sleep(500);
    const hiddenOnMobile = await ev(`(() => {
      const b = document.getElementById('btn-open-library');
      return getComputedStyle(b).display === 'none';
    })()`);
    ok('the button is hidden at phone width (menu takes over)', hiddenOnMobile);

    const menu = await ev(`(() => {
      if (typeof openHeaderMenu === 'function') openHeaderMenu();
      const rows = [...document.querySelectorAll('.hdr-menu-item')];
      const lib = rows.find(r => /Past Exam Papers/.test(r.textContent));
      if (!lib) return { found: false, rows: rows.length };
      const label = lib.querySelector('.mi-label');
      const nb = lib.querySelector('.mi-new');
      return { found: true, labelText: label ? label.textContent.trim() : null,
               hasBadge: !!nb, badgeText: nb ? nb.textContent.trim() : null };
    })()`);
    ok('the Past Exam Papers row appears in the mobile menu', menu && menu.found, menu);
    ok('the menu row carries its own New badge', menu && menu.hasBadge, menu);
    // The menu row's badge sits INSIDE .mi-label, so textContent legitimately
    // reads "Past Exam PapersNew" — label followed by badge. What would be
    // wrong is the label text itself being anything other than the button's.
    ok('the menu label is the full button label, with its badge appended',
      menu && /^Past Exam Papers\s*New$/.test(menu.labelText || ''), menu && menu.labelText);
  } catch (e) {
    fail++; console.log('FAIL harness -- ' + e.message);
  }

  console.log(`\nLibrary New badge: ${pass} passed, ${fail} failed.`);
  ws.close(); chrome.kill(); server.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
