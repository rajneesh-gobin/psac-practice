'use strict';
// Bundled question images survive going offline — and a version bump.
//
// Run: node scripts/test-question-image-offline.js
//
// Companion to test-question-images.js, which asks whether a picture reaches a
// child's screen. This asks whether it is still there when the network is not:
// the whole reason the bank stopped hotlinking Wikimedia on 2026-09-08.
//
// ⚠ The service worker DELIBERATELY never caches cross-origin requests (see the
//   long note in its fetch handler). So while the pictures were hotlinked, every
//   picture question was a broken icon offline, and no test said so.
// ⚠ Making them same-origin created a NEW hazard: they land in SHELL_CACHE,
//   which `activate` deletes on every SHELL_VERSION bump — and this project
//   bumps that constantly. That would re-download 7.4 MB of photographs after
//   every deploy, on connections that are often metered. Hence ASSET_CACHE,
//   which is unversioned and which `activate` keeps.
// ⚠ Network.emulateNetworkConditions is NOT sufficient on its own. It applies to
//   the page target, and the service worker is a separate target — a cache MISS
//   still reached the network and answered 404, which made the offline result
//   unfalsifiable. The origin server is shut down instead.

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'assets', 'questions');
const BUNDLES = path.join(ROOT, 'netlify', 'question-bundles');
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 8841;
const DBG = 9361;
const sleep = ms => new Promise(r => setTimeout(r, ms));

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif',
  '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.md': 'text/markdown' };

let pass = 0;
const failures = [];
const ok = (cond, label, detail) => {
  if (cond) { pass++; console.log('  ok   ' + label); }
  else { failures.push(label + (detail ? ' — ' + detail : '')); console.log('  FAIL ' + label + (detail ? ' — ' + detail : '')); }
};

const getJson = url => new Promise((res, rej) => {
  http.get(url, r => { let b = ''; r.on('data', c => { b += c; }); r.on('end', () => { try { res(JSON.parse(b)); } catch (e) { rej(e); } }); }).on('error', rej);
});

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/html', 'Cache-Control': 'no-store' });
    res.end('<!doctype html><title>not found</title>');
    return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  console.log('\nBundled question images — offline, and across a version bump\n');

  // ── 1. the service worker's routing, read from sw.js ───────────────────────
  const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  const imgCache = (sw.match(/const ASSET_CACHE\s*=\s*'([^']+)'/) || [])[1];
  ok(!!imgCache, 'sw.js declares ASSET_CACHE', imgCache || 'not found');
  ok(/url\.pathname\.startsWith\('\/assets\/'\)/.test(sw),
    'sw.js routes /assets/ into the unversioned cache');
  ok(/url\.pathname\.startsWith\('\/fonts\/'\)/.test(sw),
    'sw.js routes /fonts/ there too');
  ok(/k !== ASSET_CACHE/.test(sw),
    'activate keeps ASSET_CACHE — a SHELL_VERSION bump must not evict the assets');
  // ⚠ Read the ARRAY, not "everything after the declaration": the routing added
  //   below SHELL_FILES makes a naive split match every time.
  const shellArr = (sw.match(/const SHELL_FILES = \[([\s\S]*?)\n\];/) || [])[1] || '';
  ok(shellArr.length > 0, 'sw.js SHELL_FILES array is readable');
  ok(!shellArr.includes('/assets/questions/'),
    'the pictures are NOT in the all-or-nothing pre-cache list');

  // ── 2. what the built bundles actually ask for ─────────────────────────────
  if (!fs.existsSync(BUNDLES)) {
    ok(false, 'question bundles are built', 'run: node netlify/build-questions.js');
    return report();
  }
  const referenced = new Set();
  for (const f of fs.readdirSync(BUNDLES).filter(x => x.endsWith('.json'))) {
    const s = fs.readFileSync(path.join(BUNDLES, f), 'utf8');
    for (const m of s.matchAll(/assets\/questions\/([^"'\\?\s>)]+)/g)) referenced.add(m[1]);
  }
  const list = [...referenced].sort();
  ok(list.length > 0, 'the built bundles reference bundled images', list.length + ' distinct');
  const absent = list.filter(n => !fs.existsSync(path.join(IMG_DIR, n)));
  ok(absent.length === 0, 'every referenced image exists on disk', absent.join(', '));

  // ── 3. provenance is recorded, not guessable ───────────────────────────────
  // ⚠ Provenance must be captured FORWARD, from the API response that produced
  //   the file. The local names are lossy slugs, so turning one back into a
  //   Commons title fails for almost all of them — 'adrien-d-epinay1.jpg' will
  //   never match "File:Adrien d'Epinay1.jpg" — and a reverse lookup therefore
  //   reports fully-attributed images as having unknown provenance.
  const provPath = path.join(IMG_DIR, 'provenance.json');
  if (fs.existsSync(provPath)) {
    const prov = JSON.parse(fs.readFileSync(provPath, 'utf8'));
    const have = new Map((prov.images || []).map(i => [i.file, i]));
    const noLicence = [...have.values()].filter(i => !i.licence).map(i => i.file);
    ok(noLicence.length === 0, 'every recorded image states a licence', noLicence.slice(0, 5).join(', '));
    // ⚠ Asserted, not reported. Serving a CC BY / BY-SA image with no reachable
    //   attribution discharges nothing, so an image in use that nobody recorded
    //   is a licence failure — not a note to read past.
    const uncovered = list.filter(n => !have.has(n));
    ok(uncovered.length === 0,
      'provenance is recorded for every image in use (' + list.length + ')',
      uncovered.length + ' unrecorded: ' + uncovered.slice(0, 6).join(', '));
    // The public page is generated from that record; both must exist together.
    const credits = path.join(ROOT, 'image-credits.html');
    const html = fs.existsSync(credits) ? fs.readFileSync(credits, 'utf8') : '';
    const shown = new Set([...html.matchAll(/assets\/questions\/([^"'\s>)]+)/g)].map(m => m[1]));
    const missingFromPage = list.filter(n => !shown.has(n));
    ok(html.length > 0 && missingFromPage.length === 0,
      'image-credits.html credits every image in use',
      !html.length ? 'image-credits.html missing — run node scripts/build-image-credits.js'
        : missingFromPage.length + ' uncredited: ' + missingFromPage.slice(0, 6).join(', '));
  } else {
    ok(false, 'assets/questions/provenance.json exists',
      'the licence record is the source of truth — do not ship without it');
  }

  // ── 4. offline, in a real browser, against the real worker ─────────────────
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-imgoffline-'));
  const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run',
    '--no-default-browser-check', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + profile, 'about:blank'], { stdio: 'ignore' });

  let ver = null;
  for (let i = 0; i < 80 && !ver; i++) {
    try { ver = await getJson('http://127.0.0.1:' + DBG + '/json/version'); } catch { await sleep(250); }
  }
  if (!ver) { ok(false, 'chrome started'); return report(chrome, profile); }

  const ws = new globalThis.WebSocket(ver.webSocketDebuggerUrl);
  await new Promise(r => { ws.onopen = r; });
  let id = 0; const pending = new Map();
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result || m.error); pending.delete(m.id); }
  };
  const send = (method, params, sessionId) => new Promise((res, rej) => {
    const mid = ++id; pending.set(mid, res);
    ws.send(JSON.stringify({ id: mid, method, params: params || {}, sessionId }));
    setTimeout(() => { if (pending.has(mid)) { pending.delete(mid); rej(new Error('CDP timeout: ' + method)); } }, 180000);
  });
  const t1 = await send('Target.createTarget', { url: 'about:blank' });
  const t2 = await send('Target.attachToTarget', { targetId: t1.targetId, flatten: true });
  const S = (m, p) => send(m, p, t2.sessionId);
  await S('Page.enable');
  await S('Network.enable');
  await S('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/' });
  await sleep(5000);

  const ready = await S('Runtime.evaluate', {
    awaitPromise: true, returnByValue: true,
    expression: "navigator.serviceWorker.ready.then(r => !!r.active).catch(e => 'ERR ' + e.message)",
  });
  ok(ready.result && ready.result.value === true, 'the service worker is active',
    String(ready.result && ready.result.value));

  // ⚠ One retry each. 100+ sequential fetches against a throwaway Node server
  //   drop one occasionally, and reporting a dropped socket as a missing image
  //   is worse than not testing at all.
  const warm = await S('Runtime.evaluate', {
    awaitPromise: true, returnByValue: true,
    expression: `(async () => {
      const names = ${JSON.stringify(list)};
      const bad = [];
      for (const n of names) {
        let err = null;
        for (let a = 0; a < 2; a++) {
          try {
            const r = await fetch('/assets/questions/' + n, { cache: 'no-store' });
            if (!r.ok) { err = 'HTTP ' + r.status; continue; }
            await r.blob(); err = null; break;
          } catch (e) { err = e.message; }
        }
        if (err) bad.push(n + ' ' + err);
      }
      return bad;
    })()`,
  });
  const warmBad = (warm.result && warm.result.value) || ['no result'];
  ok(warmBad.length === 0, 'all ' + list.length + ' images load while online',
    warmBad.slice(0, 5).join('; '));

  const cached = await S('Runtime.evaluate', {
    awaitPromise: true, returnByValue: true,
    expression: `(async () => {
      const c = await caches.open('${imgCache}');
      const k = await c.keys();
      return k.filter(r => r.url.includes('/assets/questions/')).length;
    })()`,
  });
  const nCached = (cached.result && cached.result.value) || 0;
  ok(nCached === list.length, 'the worker put every one of them in ' + imgCache,
    nCached + ' of ' + list.length);

  // ⚠ Both, and the server shutdown is the one that counts — see the header.
  await S('Network.emulateNetworkConditions', {
    offline: true, latency: 0, downloadThroughput: -1, uploadThroughput: -1,
  });
  await new Promise(r => { server.closeAllConnections(); server.close(r); });

  // ⚠ No cache-busting query string. The worker's cache is keyed on the full
  //   URL, so '?x=1' turns every lookup into a MISS and the test then measures
  //   the exact opposite of what it claims. `cache: 'no-store'` is the right
  //   tool: it bypasses Chrome's HTTP cache but still runs the fetch handler.
  //   Decoding the blob proves real pixels came back, not an error body.
  const off = await S('Runtime.evaluate', {
    awaitPromise: true, returnByValue: true,
    expression: `(async () => {
      const names = ${JSON.stringify(list)};
      const bad = [];
      for (const n of names) {
        try {
          const r = await fetch('/assets/questions/' + n, { cache: 'no-store' });
          if (!r.ok) { bad.push(n + ' HTTP ' + r.status); continue; }
          const b = await r.blob();
          if (!b.size) { bad.push(n + ' empty'); continue; }
          if (b.type === 'image/svg+xml') continue;
          const bmp = await createImageBitmap(b);
          if (!bmp.width || !bmp.height) bad.push(n + ' decoded to 0px');
          bmp.close();
        } catch (e) { bad.push(n + ' ' + (e && e.message || e)); }
      }
      return bad;
    })()`,
  });
  const offBad = (off.result && off.result.value) || ['no result'];
  ok(offBad.length === 0, 'every image still decodes with the origin GONE',
    offBad.length + ' failed: ' + offBad.slice(0, 5).join(', '));

  // ⚠ Expect 'threw' OR a 5xx, never a 404. cacheFirstWithNetwork catches a dead
  //   network and answers a SYNTHETIC 503 of its own, so a 503 here is the worker
  //   reporting the origin is gone. A 404 would mean the server was still up and
  //   the whole section proved nothing.
  const control = await S('Runtime.evaluate', {
    awaitPromise: true, returnByValue: true,
    expression: "fetch('/assets/questions/__no_such_image__.jpg').then(r => 'HTTP ' + r.status).catch(() => 'threw')",
  });
  const cv = String(control.result && control.result.value);
  ok(cv === 'threw' || /^HTTP 5/.test(cv),
    'the origin really is unreachable (an uncached url fails)', cv);

  report(chrome, profile, ws);

  function report(ch, prof, sock) {
    if (sock) { try { sock.close(); } catch {} }
    if (ch) ch.kill();
    try { server.close(); } catch {}
    if (prof) { try { fs.rmSync(prof, { recursive: true, force: true }); } catch {} }
    console.log('\n  ' + pass + ' passed, ' + failures.length + ' failed');
    if (failures.length) { console.log('\n  failures:'); for (const f of failures) console.log('    ✗ ' + f); }
    process.exit(failures.length ? 1 : 0);
  }
})().catch(e => { console.error('\n  harness error: ' + e.stack); process.exit(1); });
