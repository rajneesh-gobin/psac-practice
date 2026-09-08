'use strict';
// Question images — do they actually reach a child's screen?
//
// Run: node scripts/test-question-images.js [--shots DIR]
//
// This exists because 26 questions shipped for months pointing at Wikimedia
// `Special:FilePath` URLs that had NEVER existed, and nothing in the repo
// noticed: the source read correctly, the build succeeded, and the only symptom
// was a broken-image icon on a child's phone. A path that looks right is not a
// picture that loads.
//
// So every check here is made on a REAL page over REAL HTTP:
//   · the asset answers 200 with an image content-type (a 404 on this site
//     returns the SPA fallback — HTML at status 404 — which a naive check reads
//     as "something came back")
//   · the <img> DECODED — `complete && naturalWidth > 0`. `complete` alone is
//     true for a failed load, which is exactly how a broken image passes a
//     careless test
//   · it fits a 360px phone, the narrowest device this app targets
//   · inline SVG illustrations have real geometry
//   · alt text does not hand over the answer
//
// ⚠ The question HTML is read from the BUILT BUNDLES, never from the source
//   files. Fields have twice been silently dropped at build time in this
//   project while the source looked perfect.
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8799;
const DBG = 9343;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const SHOTS = process.argv.includes('--shots')
  ? process.argv[process.argv.indexOf('--shots') + 1] : null;

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
  '.ico': 'image/x-icon', '.md': 'text/markdown' };

let pass = 0, fail = 0;
const failures = [];
function ok(cond, label, detail) {
  if (cond) { pass++; return true; }
  fail++; failures.push(label + (detail ? '  — ' + detail : ''));
  return false;
}

// ── static server ───────────────────────────────────────────────────────────
const server = http.createServer(function (req, res) {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    // Mirror production: an unknown path yields the SPA shell at status 404,
    // so a missing image is NOT a network error the browser reports cleanly.
    res.writeHead(404, { 'Content-Type': 'text/html', 'Cache-Control': 'no-store' });
    res.end('<!doctype html><title>not found</title>');
    return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
});

const sleep = ms => new Promise(r => setTimeout(r, ms));
function getJson(url) {
  return new Promise(function (res, rej) {
    http.get(url, function (r) {
      let b = ''; r.on('data', c => { b += c; }); r.on('end', () => res(JSON.parse(b)));
    }).on('error', rej);
  });
}
function head(p) {
  return new Promise(function (res) {
    http.get({ host: '127.0.0.1', port: PORT, path: p }, function (r) {
      r.resume();
      res({ status: r.statusCode, type: r.headers['content-type'] || '' });
    }).on('error', () => res({ status: 0, type: '' }));
  });
}

// ── collect every question that carries an image, from the BUILT bundles ────
function collect() {
  const dir = path.join(ROOT, 'netlify', 'question-bundles');
  if (!fs.existsSync(dir)) {
    console.error('question-bundles/ missing — run: node netlify/build-questions.js');
    process.exit(2);
  }
  const out = [];
  for (const f of fs.readdirSync(dir).filter(n => /^grade\d\.json$/.test(n))) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    for (const [pack, qs] of Object.entries(data)) {
      if (!Array.isArray(qs)) continue;
      for (const q of qs) {
        const html = String(q.question || '');
        const hasImg = /<img\s/i.test(html);
        const hasSvg = /<svg[\s>]/i.test(html);
        if (!hasImg && !hasSvg) continue;
        out.push({ pack, id: q.id, html, hasImg, hasSvg,
          options: q.options || [], answer: q.answer });
      }
    }
  }
  return out;
}

// ── runs in the page: inject one question, measure what rendered ────────────
// ⚠ ASYNCHRONOUS ON PURPOSE. Setting innerHTML does not load the images — the
//   browser has not even issued the requests when the statement returns, so a
//   synchronous read finds `complete === false` on every one and reports the
//   whole bank broken. The first cut of this did exactly that: 264 "broken"
//   images that all served 200 in the very same run. Wait for each image to
//   settle, then measure.
// ⚠ Only TOP-LEVEL <svg> is measured. A nested <svg> (inside <defs>, <symbol>,
//   <marker>, <pattern>) legitimately has no box, and counting those as
//   zero-sized drawings produced 179 phantom failures.
const PROBE = `
(function (html, vw) {
  // ⚠ Re-reveal the practice screen on EVERY question, not once before the loop.
  //   The app keeps routing after the harness starts (Auth.init lands on a
  //   screen), which puts .hidden back on #screen-practice — and everything
  //   inside a display:none subtree measures 0x0 with a COMPUTED width of
  //   'auto'. That is what made 179 inline drawings look blank while they
  //   render at 296x85; the first question measured fine because routing had
  //   not finished yet, which is exactly what made the fault look like content.
  for (const s of document.querySelectorAll('.screen')) s.classList.add('hidden');
  const screen = document.getElementById('screen-practice');
  screen.classList.remove('hidden');
  screen.style.display = 'block';
  const host = document.getElementById('practice-q-text');
  host.innerHTML = html.replace(/loading="lazy"/g, 'loading="eager"');
  try { if (typeof _makeImgsZoomable === 'function') _makeImgsZoomable(host); } catch (e) {}
  // ⚠ Measure the inline SVGs NOW, synchronously. They are laid out the moment
  //   innerHTML is set and need nothing loaded; measuring them after the image
  //   await instead reported 0x0 for 179 drawings that render at 296x85 — a
  //   harness artefact that read as a fifth of the illustrated bank being blank.
  const svgs = Array.from(host.querySelectorAll('svg')).filter(function (s) {
    return !s.parentElement || !s.parentElement.closest('svg');
  }).map(function (s) {
    const r = s.getBoundingClientRect();
    const cs = getComputedStyle(s);
    return { w: Math.round(r.width), h: Math.round(r.height),
      over: Math.round(r.right - vw), kids: s.children.length,
      why: cs.display + ' css=' + cs.width + 'x' + cs.height };
  });
  const imgEls = Array.from(host.querySelectorAll('img'));
  // ⚠ Most question images carry loading="lazy", which is correct for the app
  //   and fatal to a naive probe: Chrome will not fetch an image that is below
  //   the fold, so it never completes and the test calls a perfectly good
  //   picture broken. Scrolling it into view is what a child does anyway.
  imgEls.forEach(function (im) { try { im.scrollIntoView({ block: 'center' }); } catch (e) {} });
  const settle = imgEls.map(function (im) {
    if (im.complete) return Promise.resolve();
    return new Promise(function (res) {
      let done = false;
      const fin = function () { if (!done) { done = true; res(); } };
      im.addEventListener('load', fin, { once: true });
      im.addEventListener('error', fin, { once: true });
      setTimeout(fin, 8000);
    });
  });
  // ⚠ Retry an image that has not decoded before calling it broken. The per-image
  //   wait can expire simply because the machine is busy (a concurrent rebuild
  //   was enough to produce one spurious "broken" here), and a flaky test that
  //   reports content failures nobody can reproduce is worse than no test.
  //   Re-requesting is cheap and a genuinely missing file still fails twice.
  const retry = () => Promise.all(imgEls.filter(function (im) {
    return !(im.complete && im.naturalWidth > 0);
  }).map(function (im) {
    return new Promise(function (res) {
      let done = false;
      const fin = function () { if (!done) { done = true; res(); } };
      im.addEventListener('load', fin, { once: true });
      im.addEventListener('error', fin, { once: true });
      const src = im.src; im.src = ''; im.src = src;
      setTimeout(fin, 10000);
    });
  }));

  return Promise.all(settle).then(retry).then(function () {
    return new Promise(function (res) {
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        const imgs = imgEls.map(function (im) {
          const r = im.getBoundingClientRect();
          return {
            src: im.getAttribute('src') || '',
            alt: im.getAttribute('alt') || '',
            decoded: im.complete && im.naturalWidth > 0,
            natural: im.naturalWidth + 'x' + im.naturalHeight,
            w: Math.round(r.width), h: Math.round(r.height),
            over: Math.round(Math.max(r.right - vw, -r.left))
          };
        });
        const hr = host.getBoundingClientRect();
        res({ imgs: imgs, svgs: svgs,
          hostW: Math.round(hr.width), hostH: Math.round(hr.height) });
      }); });
    });
  });
})`;

(async function () {
  const items = collect();
  console.log('Question images — measured in headless Chrome at 360px\n');
  console.log(items.length + ' questions carry an image or an inline drawing');

  const srcs = new Set();
  for (const it of items) {
    for (const m of it.html.matchAll(/<img[^>]+src="([^"]+)"/gi)) srcs.add(m[1]);
  }
  console.log([...srcs].length + ' distinct image sources\n');

  // ⚠ Start the server BEFORE probing it. The first cut asked for all 182
  //   assets while nothing was listening, got status 0 for every one, and
  //   printed "0 answered 200" — a harness fault dressed as a total failure.
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));

  // ── 1. every source is local, and answers 200 with an image type ──────────
  console.log('── serving ──');
  const external = [...srcs].filter(s => /^https?:/i.test(s));
  ok(external.length === 0, 'no question loads an image from another site',
    external.length ? external.length + ' external: ' + external.slice(0, 3).join(', ') : '');
  if (external.length === 0) console.log('  ok   all ' + srcs.size + ' sources are local paths');

  let served = 0;
  for (const s of srcs) {
    if (/^https?:/i.test(s) || s.startsWith('data:')) continue;
    const r = await head('/' + s.replace(/^\//, ''));
    const good = r.status === 200 && /^image\//.test(r.type);
    if (!ok(good, 'serves as an image: ' + s, 'status ' + r.status + ', type ' + (r.type || 'none'))) continue;
    served++;
  }
  console.log('  ok   ' + served + ' answered 200 with an image content-type');

  // ── 2. render each question in the real app shell ─────────────────────────
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-imgtest-'));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + profile, '--no-first-run', '--no-default-browser-check',
    '--disable-gpu', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });

  let ver = null;
  for (let i = 0; i < 80 && !ver; i++) {
    try { ver = await getJson('http://127.0.0.1:' + DBG + '/json/version'); }
    catch (e) { await sleep(250); }
  }
  if (!ver) { console.error('Chrome never came up'); process.exit(2); }

  const ws = new globalThis.WebSocket(ver.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let msgId = 0;
  const pending = new Map();
  ws.onmessage = function (ev) {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const q = pending.get(m.id); pending.delete(m.id);
      if (m.error) q.reject(new Error(m.error.message)); else q.resolve(m.result);
    }
  };
  // ⚠ Every call gets its own timeout: page JS that wedges the renderer stops
  //   CDP answering at all, and without this you cannot tell that apart from a
  //   bug in the harness.
  function send(method, params, sessionId) {
    const id = ++msgId;
    return new Promise(function (resolve, reject) {
      const t = setTimeout(() => { pending.delete(id); reject(new Error(method + ' timed out')); }, 30000);
      pending.set(id, { resolve: v => { clearTimeout(t); resolve(v); },
        reject: e => { clearTimeout(t); reject(e); } });
      ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }

  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  const S = (m, p) => send(m, p, sessionId);
  await S('Page.enable');
  await S('Runtime.enable');
  await S('Network.enable');
  // ⚠ A real 360px viewport comes from setDeviceMetricsOverride. --window-size
  //   does NOT give one: measured innerWidth 512 for --window-size=360,900.
  await S('Emulation.setDeviceMetricsOverride',
    { width: 360, height: 900, deviceScaleFactor: 1, mobile: true });
  // ⚠ Without both of these the service worker serves a stale shell and this
  //   measures the previous CSS.
  // ⚠ This lives on Network, not Page — `Page.setBypassServiceWorker` does not
  //   exist and throws "wasn't found", which reads as a page problem.
  await S('Network.setBypassServiceWorker', { bypass: true });
  await S('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/index.html' });

  let ready = false;
  for (let i = 0; i < 120 && !ready; i++) {
    await sleep(250);
    try {
      const r = await S('Runtime.evaluate', {
        expression: "!!document.getElementById('practice-q-text') && typeof _makeImgsZoomable === 'function'",
        returnByValue: true });
      ready = r.result && r.result.value === true;
    } catch (e) { /* still loading */ }
  }
  ok(ready, 'the app shell loaded with its question renderer');
  if (!ready) { finish(chrome, profile); return; }

  // Reveal the practice screen so the question is measured under the real CSS.
  await S('Runtime.evaluate', { expression:
    "(function(){for(const s of document.querySelectorAll('.screen'))s.classList.add('hidden');" +
    "const p=document.getElementById('screen-practice');p.classList.remove('hidden');p.style.display='block';})()" });

  const vw = (await S('Runtime.evaluate', { expression: 'window.innerWidth', returnByValue: true })).result.value;
  ok(vw === 360, 'viewport really is 360px', 'measured ' + vw);

  console.log('\n── rendering ' + items.length + ' questions ──');
  let decoded = 0, brokenList = [], overflowList = [], leakList = [], svgCount = 0;
  let hostReported = false;

  for (const it of items) {
    const r = await S('Runtime.evaluate', {
      expression: '(' + PROBE + ')(' + JSON.stringify(it.html) + ',' + vw + ')',
      returnByValue: true, awaitPromise: true });
    const out = r.result.value;
    if (!hostReported) {
      hostReported = true;
      // If the container has no width, an SVG sized by its container measures
      // 0 and the test is wrong about the app, not the other way round.
      ok(out.hostW > 100, 'the question container has a real width',
        out.hostW + 'x' + out.hostH);
      console.log('  ok   question container is ' + out.hostW + 'px wide');
    }

    for (const im of out.imgs) {
      if (im.decoded) decoded++;
      else brokenList.push(it.pack + '/' + it.id + '  ' + im.src);
      // 8px of tolerance matches the mobile audit: a shadow or border can
      // legitimately sit a hair past the edge.
      if (im.over > 8) overflowList.push(it.pack + '/' + it.id + '  ' + im.over + 'px past ' + vw);
      // Alt text that names the answer hands over a free mark to a screen
      // reader — and to anyone who long-presses the image.
      const alt = (im.alt || '').toLowerCase();
      const ans = String(it.answer == null ? '' : it.answer).toLowerCase().trim();
      if (ans && ans.length > 3 && alt.includes(ans)) {
        leakList.push(it.pack + '/' + it.id + '  alt="' + im.alt + '" answer="' + it.answer + '"');
      }
    }
    for (const s of out.svgs) {
      svgCount++;
      ok(s.w > 0 && s.h > 0, 'inline drawing has geometry: ' + it.id,
        s.w + 'x' + s.h + '  [' + s.why + ']');
      ok(s.over <= 8, 'inline drawing fits 360px: ' + it.id, s.over + 'px past');
      ok(s.kids > 0, 'inline drawing has shapes: ' + it.id);
    }
  }

  ok(brokenList.length === 0, 'every question image decodes',
    brokenList.length + ' broken');
  console.log('  ' + (brokenList.length ? 'FAIL' : 'ok  ') + '   ' + decoded +
    ' images decoded, ' + brokenList.length + ' broken');
  brokenList.slice(0, 12).forEach(b => console.log('        ' + b));

  ok(overflowList.length === 0, 'no question image overflows a 360px phone',
    overflowList.length + ' overflow');
  console.log('  ' + (overflowList.length ? 'FAIL' : 'ok  ') + '   ' +
    (overflowList.length ? overflowList.length + ' overflow' : 'all fit within 360px'));
  overflowList.slice(0, 12).forEach(b => console.log('        ' + b));

  ok(leakList.length === 0, 'no alt text contains its own answer', leakList.length + ' leak');
  console.log('  ' + (leakList.length ? 'FAIL' : 'ok  ') + '   ' +
    (leakList.length ? leakList.length + ' alt texts name the answer' : 'no alt text names its answer'));
  leakList.slice(0, 12).forEach(b => console.log('        ' + b));

  console.log('  ok   ' + svgCount + ' inline drawings rendered with real geometry');

  if (SHOTS) {
    fs.mkdirSync(SHOTS, { recursive: true });
    const sample = items.filter(i => i.hasImg).slice(0, 6).concat(items.filter(i => i.hasSvg).slice(0, 2));
    for (const it of sample) {
      await S('Runtime.evaluate', {
        expression: '(' + PROBE + ')(' + JSON.stringify(it.html) + ',' + vw + ')', returnByValue: true, awaitPromise: true });
      await sleep(150);
      const shot = await S('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(SHOTS, it.id + '.png'), Buffer.from(shot.data, 'base64'));
    }
    console.log('\nscreenshots → ' + SHOTS);
  }

  finish(chrome, profile);
})().catch(function (e) {
  console.error('\nHARNESS FAILED (this is not a finding about the app): ' + e.message);
  process.exit(2);
});

function finish(chrome, profile) {
  try { chrome.kill(); } catch (e) {}
  try { server.close(); } catch (e) {}
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) {}
  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  if (fail) { console.log('\nfailures:'); failures.forEach(f => console.log('  ✗ ' + f)); }
  process.exit(fail ? 1 : 0);
}
