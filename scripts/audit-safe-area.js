'use strict';
// ── Are the env(safe-area-inset-*) rules actually live? ─────────────────────
//
// Run: CHROME_PATH=<chrome-for-testing> node scripts/audit-safe-area.js
//
// ⚠⚠ style.css spends 9 rules on env(safe-area-inset-*) - the bottom nav, the
//    practice action bar, the exam nav row, the toast, the auth shell - and
//    EVERY ONE OF THEM RESOLVED TO 0px, because index.html carried no
//    `viewport-fit=cover`. env() only returns real insets when the page asks to
//    draw into them. Every other HTML file in this repo already had it; index
//    did not, so the rules were dead in the one place that matters.
//
// ⚠ This is what makes it urgent rather than cosmetic: Play requires targetSdk
//   35, and Android 15 FORCES edge-to-edge at that level. The web content then
//   draws under the status bar and the gesture navigation bar, and dead padding
//   rules mean the bottom nav sits underneath the gesture bar.
//
// ⚠ A desktop browser reports ZERO insets no matter how you emulate a phone, so
//   "it looks fine locally" proves nothing. This drives insets through CDP's
//   Emulation.setSafeAreaInsetsOverride and measures how the layout responds.
//
// ⚠⚠ WHAT THIS CANNOT PROVE, measured 2026-09-18: the CDP override INJECTS the
//    env() values directly and bypasses the viewport-fit gate entirely. Serving
//    index.html with viewport-fit stripped still reported top=47 bottom=34 - the
//    strip worked (the probe prints the meta it parsed), Chrome simply does not
//    apply the spec rule under the override. So an A/B of "with and without the
//    meta" is NOT possible this way, and the earlier version of this script
//    reported a FAIL that was its own artefact, not a defect in the page.
//    The dead-rules claim rests on the spec instead: with the default
//    viewport-fit=auto the viewport is already inset past the unsafe areas, so
//    there is nothing left for env() to return and it is 0. Confirm on a real
//    notched device; that is the on-device step, not this one.
//
// ⚠ What it DOES prove, and what it is for: that index.html ships the meta, and
//   that with insets present the layout actually moves by them rather than
//   ignoring them - which is the half that a regression would break.

const http  = require('http');
const fs    = require('fs');
const path  = require('path');
const os    = require('os');
const { spawn } = require('child_process');

const ROOT   = path.resolve(__dirname, '..');
const PORT   = 8799;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

// An iPhone-ish / Android-15-gesture-bar pair. The exact numbers do not matter;
// what matters is whether the layout MOVES by them.
const INSETS = { top: 47, bottom: 34, left: 0, right: 0 };

const MIME = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css',
               '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png',
               '.webp':'image/webp', '.jpg':'image/jpeg', '.woff2':'font/woff2' };

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  // /nofit/ serves the same tree with viewport-fit stripped from the meta tag.
  const strip = url.startsWith('/nofit/');
  const p = strip ? url.slice('/nofit'.length) : url;
  const file = path.join(ROOT, p === '/' ? '/index.html' : p);
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404); res.end('no'); return; }
    let body = buf;
    if (strip && file.endsWith('index.html')) {
      body = Buffer.from(buf.toString('utf8').replace(', viewport-fit=cover', ''), 'utf8');
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(body);
  });
});

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
function getJson(u) {
  return new Promise((res, rej) => {
    http.get(u, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(e); } }); })
        .on('error', rej);
  });
}

// What the page reports back. Reading the raw env() values through a probe
// element is the only honest measure: a computed padding already has the inset
// folded in, so it cannot tell "the rule is dead" from "the inset is zero".
const PROBE = `(() => {
  const d = document.createElement('div');
  d.style.cssText = 'position:fixed;left:-9999px;'
    + 'padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom);'
    + 'padding-left:env(safe-area-inset-left);padding-right:env(safe-area-inset-right);';
  document.body.appendChild(d);
  const cs = getComputedStyle(d);
  const env = { top: parseFloat(cs.paddingTop)||0, bottom: parseFloat(cs.paddingBottom)||0,
                left: parseFloat(cs.paddingLeft)||0, right: parseFloat(cs.paddingRight)||0 };
  d.remove();

  // The elements the 9 rules are actually for.
  const pick = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const c = getComputedStyle(el);
    return { padBottom: parseFloat(c.paddingBottom)||0, bottom: c.bottom };
  };
  const mv = document.querySelector(String.fromCharCode(109,101,116,97)+'[name=viewport]');

  // ⚠ The bottom-nav rules only apply under body.has-bottom-nav, which is set
  //   when a CHILD is signed in. Nobody is signed in here, so without this the
  //   probe measures plain <main> and reports a padding that proves nothing.
  const had = document.body.classList.contains('has-bottom-nav');
  document.body.classList.add('has-bottom-nav');
  const withNav = {
    main:  pick('main'),
    toast: pick('#toast'),
  };
  if (!had) document.body.classList.remove('has-bottom-nav');

  return JSON.stringify({
    viewport: mv ? mv.getAttribute('content') : null,
    env,
    withNav,
    authShell: pick('#screen-auth .auth-shell'),
  });
})()`;

(async function () {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-safearea-'));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9343',
    '--user-data-dir=' + profile, '--no-first-run', '--no-default-browser-check',
    '--disable-gpu', '--window-size=400,900', 'about:blank'], { stdio: 'ignore' });

  let ver = null;
  for (let i = 0; i < 80 && !ver; i++) {
    try { ver = await getJson('http://127.0.0.1:9343/json/version'); } catch (e) { await sleep(250); }
  }
  if (!ver) throw new Error('Chrome never came up');

  const ws = new globalThis.WebSocket(ver.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0; const pending = new Map();
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const q = pending.get(m.id); pending.delete(m.id);
      if (m.error) q.reject(new Error(m.error.message)); else q.resolve(m.result);
    }
  };
  const send = (method, params, sessionId) => new Promise((resolve, reject) => {
    const mid = ++id;
    const t = setTimeout(() => { pending.delete(mid); reject(new Error('CDP timeout: ' + method)); }, 20000);
    pending.set(mid, { resolve: r => { clearTimeout(t); resolve(r); }, reject: e => { clearTimeout(t); reject(e); } });
    ws.send(JSON.stringify({ id: mid, method, params: params || {}, sessionId }));
  });

  const t1 = await send('Target.createTarget', { url: 'about:blank' });
  const t2 = await send('Target.attachToTarget', { targetId: t1.targetId, flatten: true });
  const S = (m, p) => send(m, p, t2.sessionId);

  await S('Page.enable'); await S('Runtime.enable'); await S('Network.enable');
  await S('Network.setCacheDisabled', { cacheDisabled: true });
  // ⚠ Without this the service worker serves the PREVIOUS style.css and the run
  //   measures a fix that never landed.
  for (const dom of ['Network.setBypassServiceWorker', 'Page.setBypassServiceWorker']) {
    try { await S(dom, { bypass: true }); break; } catch (_) {}
  }
  await S('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });

  let insetsSupported = true;
  try { await S('Emulation.setSafeAreaInsetsOverride', { insets: INSETS }); }
  catch (e) { insetsSupported = false; console.log('  REVIEW Emulation.setSafeAreaInsetsOverride unavailable: ' + e.message); }

  async function run(pathPrefix) {
    await S('Page.navigate', { url: `http://127.0.0.1:${PORT}${pathPrefix}/index.html` });
    for (let i = 0; i < 40; i++) {
      await sleep(250);
      const r = await S('Runtime.evaluate', { returnByValue: true, expression: "document.readyState" });
      if (r.result.value === 'complete') break;
    }
    await sleep(600);
    const r = await S('Runtime.evaluate', { returnByValue: true, expression: PROBE });
    return JSON.parse(r.result.value);
  }

  console.log(`\nSafe-area insets driven through CDP: top=${INSETS.top} bottom=${INSETS.bottom}`);
  console.log(insetsSupported ? '  (Emulation.setSafeAreaInsetsOverride accepted)'
                              : '  (override NOT available - nothing below is meaningful)');
  console.log('  \u26a0 the override bypasses the viewport-fit gate, so it cannot A/B the meta.\n');

  const page = await run('');          // index.html exactly as it ships

  let fail = 0;
  const ok   = (m) => console.log('  ok     ' + m);
  const bad  = (m) => { fail++; console.log('  FAIL   ' + m); };

  console.log('  viewport meta shipped: ' + page.viewport);
  /viewport-fit=cover/.test(page.viewport || '')
    ? ok('index.html asks to draw into the safe areas')
    : bad('index.html is MISSING viewport-fit=cover - the 9 env() rules stay dead on a notched device');

  if (insetsSupported) {
    // Does the layout actually MOVE by the inset, or ignore it?
    const mainPad = page.withNav.main && page.withNav.main.padBottom;
    // body.has-bottom-nav main => calc(var(--tabbar-h,3.75rem) + inset + 0.75rem)
    const expected = 60 + INSETS.bottom + 12;
    console.log('  main padding-bottom under the tab bar: ' + mainPad + 'px (expect ~' + expected + 'px)');
    Math.abs(mainPad - expected) <= 2
      ? ok('the bottom-nav rule consumes the inset, so content clears the gesture bar')
      : bad('expected ~' + expected + 'px, got ' + mainPad + 'px - content would sit under the gesture bar');
  }
  try { ws.close(); } catch (_) {}
  chrome.kill();
  server.close();
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch (_) {}   // Chrome may still hold it
  console.log('');
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FAILED: ' + e.message); process.exit(1); });
