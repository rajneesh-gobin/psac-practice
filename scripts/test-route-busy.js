'use strict';
// ── The route-busy overlay ────────────────────────────────────────────────
// Some taps cannot draw the next screen until something has been FETCHED: a
// subject's manifest, or its whole question bank. _withRouteBusy() covers that
// wait. Four properties make it either useful or actively harmful, and none of
// them can be read off a diff:
//
//  1. It must NOT draw for work that finishes quickly. PackLoader keeps a pack
//     for the session and QuestionLoader caches a subject for 7 days, so most
//     of these taps are already instant — an overlay on those adds a flash to
//     a navigation that had none, which reads as slower, not faster.
//  2. It must ALWAYS come down, including when the work throws. It is a
//     body-level node, so showScreen() does not hide it: nothing else can undo
//     a leak, and a leaked overlay is an app that looks frozen.
//  3. It must SURVIVE the screen switch it is covering — which is the same
//     fact as (2), stated from the other side, and the reason it is body-level.
//  4. Nesting must not tear it down early. SubjectHub.open() awaits a manifest
//     and then a bank; the inner finally must not pull it out from under the
//     outer call.
//
// ⚠ Real headless Chrome with the service worker BYPASSED and cache ignored.
//   CLAUDE.md: without both, the SW serves the previous shell and the run
//   measures the code that was there before the change.
//
//   node scripts/test-route-busy.js
//
// Requires Chrome. Set CHROME_PATH to override the default location.

const { spawn } = require('child_process');
const path = require('path');
const http = require('http');

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const CDP_PORT = 9351;
const SRV_PORT = 8903;
const ROOT = path.join(__dirname, '..');

let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  \u2717 ' + m); } };

const sleep = ms => new Promise(r => setTimeout(r, ms));
const getJSON = url => new Promise((res, rej) => {
  http.get(url, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(e); } }); }).on('error', rej);
});

function rpc(ws, method, params, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    const id = rpc._id = (rpc._id || 0) + 1;
    const timer = setTimeout(() => { cleanup(); reject(new Error(`CDP timeout: ${method}`)); }, timeoutMs);
    const onMsg = ev => {
      let m; try { m = JSON.parse(ev.data); } catch { return; }
      if (m.id !== id) return;
      cleanup();
      m.error ? reject(new Error(method + ': ' + m.error.message)) : resolve(m.result);
    };
    const cleanup = () => { clearTimeout(timer); ws.removeEventListener('message', onMsg); };
    ws.addEventListener('message', onMsg);
    ws.send(JSON.stringify({ id, method, params: params || {} }));
  });
}

(async () => {
  const server = spawn(process.execPath, [path.join(ROOT, 'dev-server.js'), String(SRV_PORT)],
    { cwd: ROOT, stdio: 'ignore' });
  const chrome = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${CDP_PORT}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu',
    `--user-data-dir=${path.join(require('os').tmpdir(), 'psac-route-busy')}`,
    'about:blank',
  ], { stdio: 'ignore' });

  const stop = () => { try { chrome.kill(); } catch {} try { server.kill(); } catch {} };
  process.on('exit', stop);

  try {
    let ver = null;
    for (let i = 0; i < 40 && !ver; i++) {
      await sleep(250);
      try { ver = await getJSON(`http://127.0.0.1:${CDP_PORT}/json/version`); } catch {}
    }
    if (!ver) throw new Error('Chrome did not start a debugging endpoint');

    const ws = new globalThis.WebSocket(ver.webSocketDebuggerUrl);
    await new Promise((r, j) => { ws.onopen = r; ws.onerror = () => j(new Error('CDP socket failed')); });

    const { targetId } = await rpc(ws, 'Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await rpc(ws, 'Target.attachToTarget', { targetId, flatten: true });

    const sessionRpc = (method, params, t) => new Promise((resolve, reject) => {
      const id = rpc._id = (rpc._id || 0) + 1;
      const timer = setTimeout(() => { cleanup(); reject(new Error(`CDP timeout: ${method}`)); }, t || 15000);
      const onMsg = ev => {
        let m; try { m = JSON.parse(ev.data); } catch { return; }
        if (m.id !== id) return;
        cleanup();
        m.error ? reject(new Error(method + ': ' + m.error.message)) : resolve(m.result);
      };
      const cleanup = () => { clearTimeout(timer); ws.removeEventListener('message', onMsg); };
      ws.addEventListener('message', onMsg);
      ws.send(JSON.stringify({ id, sessionId, method, params: params || {} }));
    });

    await sessionRpc('Runtime.enable');
    await sessionRpc('Page.enable');
    let bypassed = false;
    for (const m of ['Network.setBypassServiceWorker', 'Page.setBypassServiceWorker']) {
      try { await sessionRpc(m, { bypass: true }); bypassed = true; break; } catch (e) {}
    }
    if (!bypassed) throw new Error('could not bypass the service worker \u2014 refusing to measure a possibly stale shell');

    await sessionRpc('Page.navigate', { url: `http://127.0.0.1:${SRV_PORT}/index.html` });
    await sleep(4000);

    const evalIn = async (expr, awaitPromise) => {
      const r = await sessionRpc('Runtime.evaluate',
        { expression: expr, returnByValue: true, awaitPromise: !!expr && !!awaitPromise });
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' +
        (r.exceptionDetails.exception && r.exceptionDetails.exception.description || ''));
      return r.result && r.result.value;
    };

    console.log('route-busy overlay');

    ok(await evalIn('typeof _withRouteBusy === "function"'),
       '_withRouteBusy is a global — calendar.js and search.js call it by bare identifier');

    // ── Where it lives ────────────────────────────────────────────────────
    // ⚠ showScreen() toggles .hidden on .screen elements only. A busy overlay
    //   INSIDE one would be torn down by the very navigation it exists to
    //   cover, and its transform-animated card would re-anchor every
    //   position:fixed bar on that screen (see the note in ui-css.md).
    ok(await evalIn('!!document.getElementById("route-busy")'), '#route-busy is in the DOM');
    ok(await evalIn('document.getElementById("route-busy").parentElement === document.body'),
       'and is a direct child of <body>');
    ok(await evalIn('!document.getElementById("route-busy").closest(".screen")'),
       'so it is inside no .screen');
    ok(await evalIn('!document.getElementById("route-busy").closest("main")'),
       'and outside <main>');
    ok(await evalIn('document.getElementById("route-busy").classList.contains("hidden")'),
       'it starts hidden');
    ok(await evalIn('document.getElementById("route-busy").getAttribute("aria-live") === "polite"'),
       'and announces itself to a screen reader');

    // Nothing fixed inside it, which is what makes the card transform safe.
    ok(await evalIn(`(function(){
      var n = document.getElementById('route-busy');
      return [].slice.call(n.querySelectorAll('*')).every(function(el){
        return getComputedStyle(el).position !== 'fixed';
      });
    })()`), 'nothing inside it is position:fixed, so the card transform is safe');

    // ── 1. Fast work must not flash ───────────────────────────────────────
    const flashed = await evalIn(`(async function(){
      var n = document.getElementById('route-busy'), seen = false;
      var obs = new MutationObserver(function(){ if (!n.classList.contains('hidden')) seen = true; });
      obs.observe(n, { attributes: true, attributeFilter: ['class'] });
      await _withRouteBusy('t', 's', function(){ return Promise.resolve(1); });
      await new Promise(function(r){ setTimeout(r, 500); });
      obs.disconnect();
      return seen;
    })()`, true);
    ok(flashed === false, 'work that resolves immediately never draws the overlay');

    // ── 2/3. Slow work draws it, and it survives a screen switch ──────────
    const slow = await evalIn(`(async function(){
      var n = document.getElementById('route-busy');
      var out = {};
      var p = _withRouteBusy('Opening\\u2026', 'Getting your questions ready', function(){
        return new Promise(function(r){ setTimeout(r, 900); });
      });
      await new Promise(function(r){ setTimeout(r, 450); });
      out.shownDuring = !n.classList.contains('hidden');
      out.title = (document.getElementById('route-busy-title')||{}).textContent;
      out.step  = (document.getElementById('route-busy-step')||{}).textContent;
      out.visible = getComputedStyle(n).display !== 'none' && getComputedStyle(n).opacity > 0;
      showScreen('dashboard');
      out.survivedShowScreen = !n.classList.contains('hidden');
      await p;
      out.hiddenAfter = n.classList.contains('hidden');
      return out;
    })()`, true);
    ok(slow.shownDuring, 'work still running after the delay DOES draw the overlay');
    ok(slow.visible, 'and it is actually painted, not just un-hidden');
    ok(slow.title === 'Opening\u2026', 'the title it was given is on screen — got ' + JSON.stringify(slow.title));
    ok(slow.step === 'Getting your questions ready', 'so is the step line');
    ok(slow.survivedShowScreen, 'showScreen() does NOT tear it down — it covers the switch');
    ok(slow.hiddenAfter, 'and it comes down when the work finishes');

    // ── 2. It comes down when the work THROWS ─────────────────────────────
    const threw = await evalIn(`(async function(){
      var n = document.getElementById('route-busy'), caught = false;
      try {
        await _withRouteBusy('t', 's', function(){
          return new Promise(function(_, rej){ setTimeout(function(){ rej(new Error('boom')); }, 400); });
        });
      } catch (e) { caught = true; }
      return { caught: caught, hidden: n.classList.contains('hidden') };
    })()`, true);
    ok(threw.caught, 'a rejection still reaches the caller — the overlay swallows nothing');
    ok(threw.hidden, 'and the overlay is cleared in the finally, not left over a frozen app');

    // ── 4. Nesting ────────────────────────────────────────────────────────
    const nested = await evalIn(`(async function(){
      var n = document.getElementById('route-busy'), out = {};
      var outer = _withRouteBusy('outer', '', async function(){
        await _withRouteBusy('inner', '', function(){
          return new Promise(function(r){ setTimeout(r, 400); });
        });
        out.afterInner = !n.classList.contains('hidden');
        await new Promise(function(r){ setTimeout(r, 400); });
      });
      await outer;
      out.afterOuter = n.classList.contains('hidden');
      return out;
    })()`, true);
    ok(nested.afterInner, 'an inner call finishing leaves the overlay up for the outer one');
    ok(nested.afterOuter, 'and the outer one still clears it');

    // ── Reduced motion ────────────────────────────────────────────────────
    // ⚠ The backdrop's fade is dropped, but the RING must keep turning. A
    //   reduced-motion user given a still spinner is looking at a page that has
    //   frozen — the whole point of the overlay is the movement.
    await sessionRpc('Emulation.setEmulatedMedia',
      { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    const rm = await evalIn(`(function(){
      var n = document.getElementById('route-busy');
      n.classList.remove('hidden');
      var back = getComputedStyle(n).animationName;
      var ring = getComputedStyle(n.querySelector('.auth-progress-ring'));
      n.classList.add('hidden');
      return { back: back, ringName: ring.animationName, ringDur: ring.animationDuration };
    })()`);
    ok(rm.back === 'none', 'reduced motion drops the backdrop fade — got ' + rm.back);
    ok(rm.ringName !== 'none', 'but the ring still spins — got ' + rm.ringName);
    ok(parseFloat(rm.ringDur) >= 1.5, 'just slower (' + rm.ringDur + ')');

  } catch (e) {
    fail++; console.log('  \u2717 harness: ' + e.message);
  } finally {
    stop();
  }

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})();
