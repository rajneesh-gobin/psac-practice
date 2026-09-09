'use strict';
// ── The global leaderboard screen ─────────────────────────────────────────
// Loads the real page in real headless Chrome and drives renderGlobalLeaderboard()
// against a stubbed Store, because the interesting cases are the ones a live
// database will not produce on demand: the switch off, a failed read, an empty
// board, and a hostile display name.
//
// ⚠ THE ESCAPING CASE IS THE POINT. This is the only screen in the app that
//   renders text written by a DIFFERENT FAMILY. display_name is chosen by that
//   family and reaches this list through a SECURITY DEFINER RPC that does not
//   sanitise it — nor should it, since escaping belongs at the point of render.
//   If _attr() is ever dropped from that template, one family can run script in
//   every other child's browser.
//
// ⚠ Service worker BYPASSED and cache ignored, per CLAUDE.md: without both, the
//   SW serves the previous shell and the run measures the code that was there
//   before the change.
//
//   node scripts/test-global-leaderboard.js
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
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  ✗ ' + m); } };

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
    `--user-data-dir=${path.join(require('os').tmpdir(), 'psac-lb-test')}`,
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
    await sessionRpc('Network.enable');
    await sessionRpc('Page.enable');

    let bypassed = false;
    for (const m of ['Network.setBypassServiceWorker', 'Page.setBypassServiceWorker']) {
      try { await sessionRpc(m, { bypass: true }); bypassed = true; break; } catch (e) {}
    }
    if (!bypassed) throw new Error('could not bypass the service worker — refusing to measure a possibly stale shell');

    await sessionRpc('Page.navigate', { url: `http://127.0.0.1:${SRV_PORT}/index.html` });
    await sleep(4000);

    const evalIn = async expr => {
      const r = await sessionRpc('Runtime.evaluate', {
        expression: expr, returnByValue: true, awaitPromise: true,
      });
      if (r.exceptionDetails) {
        const d = r.exceptionDetails;
        throw new Error('page threw: ' + ((d.exception && d.exception.description) || d.text));
      }
      return r.result && r.result.value;
    };

    console.log('global leaderboard\n');

    // ── the pieces exist ───────────────────────────────────────────────────
    ok(await evalIn('typeof renderGlobalLeaderboard === "function"'), 'renderGlobalLeaderboard defined');
    ok(await evalIn('typeof setLeaderboardGrade === "function"'), 'setLeaderboardGrade defined (inline onclick target)');
    ok(await evalIn('typeof Store.leaderboardEnabled === "function"'), 'Store.leaderboardEnabled exists');
    ok(await evalIn('!!document.getElementById("screen-leaderboard")'), 'the screen is in the DOM');
    // ⚠ A panel that is not INSIDE a .screen is never hidden by anything —
    //   ui-css.md. showScreen() only toggles .hidden on .screen elements.
    ok(await evalIn('document.getElementById("screen-leaderboard").classList.contains("screen")'),
       'it carries the .screen class, so showScreen() can hide it');
    ok(await evalIn('document.getElementById("screen-leaderboard").classList.contains("hidden")'),
       'it starts hidden');
    ok(await evalIn('!!document.getElementById("dash-global-lb")'), 'the dashboard entry button exists');
    ok(await evalIn('document.getElementById("dash-global-lb").classList.contains("hidden")'),
       'the entry button starts HIDDEN — off is the default');

    // ── the switch gates the entry point ───────────────────────────────────
    await evalIn(`
      window.__lbCalls = [];
      Store.leaderboardEnabled = async () => window.__lbOn;
      Store.getPointsLeaderboard = async (g, n) => { window.__lbCalls.push(['board', g]); return window.__lbRows; };
      Store.getMyPointsRank = async (g) => { window.__lbCalls.push(['rank', g]); return window.__lbRank; };
      true;`);

    await evalIn('window.__lbOn = false; _lbEnabledCache = null; true;');
    await evalIn('_renderGlobalLbEntry()');
    await sleep(150);
    ok(await evalIn('document.getElementById("dash-global-lb").classList.contains("hidden")'),
       'switch off → entry point stays hidden');

    await evalIn('window.__lbOn = true; _lbEnabledCache = null; true;');
    await evalIn('_renderGlobalLbEntry()');
    await sleep(150);
    ok(await evalIn('!document.getElementById("dash-global-lb").classList.contains("hidden")'),
       'switch on → entry point appears');

    // ⚠ A FAILED read must not read as "on". The switch is off by default and a
    //   network blip is not an admin decision.
    await evalIn('Store.leaderboardEnabled = async () => { throw new Error("network"); }; _lbEnabledCache = null; true;');
    await evalIn('_renderGlobalLbEntry()');
    await sleep(150);
    ok(await evalIn('document.getElementById("dash-global-lb").classList.contains("hidden")'),
       'a FAILED switch read hides the entry point (fails closed)');
    await evalIn('Store.leaderboardEnabled = async () => window.__lbOn; _lbEnabledCache = null; true;');

    // ── a normal board ─────────────────────────────────────────────────────
    await evalIn(`
      window.__lbRows = [
        { rank:1, display_name:'Aisha',  avatar:'🦊', grade:6, points:1450, level:4, is_me:false },
        { rank:2, display_name:'Ravi',   avatar:'🐯', grade:6, points:1200, level:3, is_me:true  },
        { rank:3, display_name:'Priya',  avatar:'🐧', grade:6, points:900,  level:3, is_me:false }
      ];
      window.__lbRank = { ok:true, points:1200, rank:2, total:57 };
      true;`);
    await evalIn('renderGlobalLeaderboard()');
    await sleep(300);

    ok((await evalIn('document.getElementById("lb-list").textContent')).includes('Aisha'), 'rows render');
    ok((await evalIn('document.getElementById("lb-list").textContent')).includes('🥇'), 'first place gets a medal');
    ok((await evalIn('document.getElementById("lb-list").textContent')).includes('(you)'), 'the child is marked as themselves');
    ok((await evalIn('document.getElementById("lb-rank").textContent')).includes('#2'), 'the rank card shows the position');
    ok((await evalIn('document.getElementById("lb-rank").textContent')).includes('57'), 'the rank card shows the field size');
    ok((await evalIn('document.getElementById("lb-tabs").children.length')) === 2, 'both grade tabs render');

    // ⚠ Reset in the RENDER, not the toggle (ui-css.md). Arriving fresh must not
    //   inherit the filter from last time.
    await evalIn('setLeaderboardGrade("all")');
    await sleep(200);
    ok(await evalIn('_lbGrade === "all"'), 'the grade toggle changes the filter');
    await evalIn('renderGlobalLeaderboard()');
    await sleep(200);
    ok(await evalIn('_lbGrade === "mine"'), 're-entering the screen resets the filter to "my grade"');

    // ── the hostile name ───────────────────────────────────────────────────
    await evalIn(`
      window.__pwned = 0;
      window.__lbRows = [{ rank:1, display_name:'<img src=x onerror="window.__pwned=1">',
                           avatar:'<script>window.__pwned=2<\\/script>', grade:6, points:10, level:1, is_me:false }];
      true;`);
    await evalIn('renderGlobalLeaderboard()');
    await sleep(400);
    ok(await evalIn('window.__pwned === 0'),
       'a hostile display_name from another family does NOT execute');
    ok(await evalIn('document.getElementById("lb-list").querySelectorAll("img, script").length === 0'),
       'no element was injected from the name or avatar');
    ok((await evalIn('document.getElementById("lb-list").textContent')).includes('<img'),
       'it is shown as literal text instead');

    // ── the empty and failed states are DIFFERENT ──────────────────────────
    await evalIn('window.__lbRows = []; true;');
    await evalIn('renderGlobalLeaderboard()');
    await sleep(300);
    ok((await evalIn('document.getElementById("lb-list").textContent')).includes('No scores here yet'),
       'an empty board says so');

    // ⚠ null is a FAILED read; [] is a real answer. Conflating them draws
    //   "be the first!" over a network blip.
    await evalIn('window.__lbRows = null; true;');
    await evalIn('renderGlobalLeaderboard()');
    await sleep(300);
    ok((await evalIn('document.getElementById("lb-list").textContent')).includes('Could not load'),
       'a FAILED read says so, and does not claim the board is empty');

    console.log(`\n${pass} passed, ${fail} failed`);
    stop();
    process.exit(fail ? 1 : 0);
  } catch (e) {
    console.error('harness error:', e.message);
    stop();
    process.exit(2);
  }
})();
