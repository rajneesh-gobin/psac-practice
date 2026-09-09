'use strict';
// ── Does index.html still boot? ───────────────────────────────────────────
// A script tag added to index.html and a file added to SHELL_FILES both look
// correct in a diff and can still take the app down: a 404 on one shell entry
// rejects cache.addAll() wholesale, and a parse error in an early engine file
// stops every file after it from running.
//
// This loads the real page in real headless Chrome and fails on any console
// error, any failed request, or a missing global.
//
// ⚠ Service worker BYPASSED and cache ignored. CLAUDE.md: without both, the SW
//   serves the previous shell and the run measures the code that was there
//   before the change.
//
//   node scripts/test-boot-smoke.js
//
// Requires Chrome. Set CHROME_PATH to override the default location.

const { spawn } = require('child_process');
const path = require('path');
const http = require('http');

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const CDP_PORT = 9347;
const SRV_PORT = 8899;
const ROOT = path.join(__dirname, '..');

let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  ✗ ' + m); } };

const sleep = ms => new Promise(r => setTimeout(r, ms));
const getJSON = url => new Promise((res, rej) => {
  http.get(url, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(e); } }); }).on('error', rej);
});

// ⚠ Every CDP call gets its own timeout. CLAUDE.md: an infinite loop in page JS
//   blocks the renderer's message loop so CDP never answers, and without a
//   timeout you cannot tell "page wedged" from "harness bug".
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
    `--user-data-dir=${path.join(require('os').tmpdir(), 'psac-boot-smoke')}`,
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

    const errors = [], failedReqs = [];
    const sub = ev => {
      let m; try { m = JSON.parse(ev.data); } catch { return; }
      if (m.sessionId !== sessionId) return;
      if (m.method === 'Runtime.exceptionThrown') {
        const d = m.params.exceptionDetails;
        errors.push((d.exception && d.exception.description) || d.text);
      }
      if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
        errors.push(m.params.args.map(a => a.value || a.description || '').join(' '));
      }
      if (m.method === 'Network.loadingFailed') failedReqs.push(m.params.errorText);
      if (m.method === 'Network.responseReceived' && m.params.response.status >= 400) {
        failedReqs.push(`HTTP ${m.params.response.status} ${m.params.response.url}`);
      }
    };
    ws.addEventListener('message', sub);

    const send = (method, params) => rpc(ws, method, params).catch(() => {});
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
    // ⚠ The domain moved. Older Chrome has Page.setBypassServiceWorker; current
    //   Chrome answers "'Page.setBypassServiceWorker' wasn't found" and expects
    //   Network.setBypassServiceWorker. Try both and REFUSE TO CONTINUE if
    //   neither lands — a run that quietly skipped the bypass would measure the
    //   shell the service worker had cached, i.e. the code before this change.
    let bypassed = false;
    for (const m of ['Network.setBypassServiceWorker', 'Page.setBypassServiceWorker']) {
      try { await sessionRpc(m, { bypass: true }); bypassed = true; break; } catch (e) {}
    }
    if (!bypassed) throw new Error('could not bypass the service worker — refusing to measure a possibly stale shell');

    await sessionRpc('Page.navigate', { url: `http://127.0.0.1:${SRV_PORT}/index.html` });
    await sleep(4000);

    const evalIn = async expr => {
      const r = await sessionRpc('Runtime.evaluate', { expression: expr, returnByValue: true });
      return r.result && r.result.value;
    };

    console.log('boot smoke test');

    // The engine globals that must exist for the app to be usable at all.
    ok(await evalIn('typeof showScreen === "function"'), 'app.js ran (showScreen defined)');
    ok(await evalIn('typeof makeMCQ === "function"'), 'helpers.js ran (makeMCQ defined)');
    ok(await evalIn('typeof isPoolQuestion === "function"'), 'questions_engine.js ran');
    ok(await evalIn('typeof Auth === "object"'), 'auth.js ran');
    // ⚠ 49 SINCE grade3-ssee WAS ADDED (0696fe3). The three Grade 1-3 Health
    //   packs in that same commit were already registered and already counted;
    //   only SSEE was new.
    // ⚠ 48 SINCE grade9-science WAS SPLIT into Biology/Chemistry/Physics.
    // ⚠ 46 SINCE grade9-ict WAS ADDED. The count is hard-coded on purpose:
    //   a pack that silently stops registering is exactly what this catches,
    //   and the number should only ever change in the same commit that adds
    //   or removes one. It was 45 before ICT.
    // ⚠ THIS ONE DID NOT: the pack landed in 0696fe3 and the constant stayed
    //   at 48, so the suite failed for a day on a change that was correct. If
    //   you are here because the count is off, check subjects/_index.js first -
    //   a pack that stopped registering and a pack that was legitimately added
    //   fail this line identically.
    ok(await evalIn('Array.isArray(SUBJECT_PACKS) && SUBJECT_PACKS.length === 49'), '49 subject packs registered');

    // The new module.
    ok(await evalIn('typeof Assessment === "object"'), 'assessment.js ran (Assessment defined)');
    ok(await evalIn('typeof makeTask === "function"'), 'makeTask is a global, like the other factories');
    ok(await evalIn('Assessment.markPart({marks:2,response:{kind:"number",answer:"5/6"}},"10/12").correct === true'),
       'Assessment marks an equivalent fraction correctly in the browser');
    ok(await evalIn('Assessment.markPart({marks:2,rubric:"r",response:{kind:"drawing"}},"x").correct === null'),
       'a drawing part still marks as null in the browser');
    ok(await evalIn('isPoolQuestion({question:"q",type:"task"}) === false'), 'a raw task is not dealt into pools');

    // The NCE paper generator.
    ok(await evalIn('typeof NcePaper === "object"'), 'nce_paper.js ran (NcePaper defined)');
    ok(await evalIn('!!NcePaper.BLUEPRINTS["grade9-maths"]'), 'the Grade 9 Maths blueprint is loaded in the browser');
    ok(await evalIn('NcePaper.BLUEPRINTS["grade9-maths"].totalMarks === 100'), 'and carries the measured 100-mark total');
    // ⚠ nce_paper.js reads Assessment off the global in a browser and via
    //   require() in Node. If that branch were wrong the module would load and
    //   then throw on first use, which a "typeof" check would not catch.
    ok(await evalIn('NcePaper.assemblePaper({blueprint:NcePaper.BLUEPRINTS["grade9-maths"],tasks:[],seed:1}).warnings.length > 0'),
       'NcePaper can actually run in the browser, not just load');

    // The refusal branch, in the real DOM rather than a VM stub.
    const refused = await evalIn(`(function(){
      var d = document.createElement('div'); d.id = '__smoke'; document.body.appendChild(d);
      renderAnswerArea({ id:'x', type:'drawing', question:'q', answer:'a' }, '__smoke', '', false);
      var html = d.innerHTML; d.remove(); return html;
    })()`);
    ok(/answer-unsupported/.test(refused || ''), 'renderAnswerArea refuses an unknown type in a real browser');
    ok(!/inputmode="decimal"/.test(refused || ''), 'and does not draw a number pad');

    const realErrors = errors.filter(e => e && !/favicon/i.test(e));
    ok(realErrors.length === 0, 'no console errors — got: ' + JSON.stringify(realErrors.slice(0, 5)));
    const realFails = failedReqs.filter(u => !/favicon|\/api\/|functions\//i.test(u));
    ok(realFails.length === 0, 'no failed requests — got: ' + JSON.stringify(realFails.slice(0, 5)));

  } catch (e) {
    fail++; console.log('  ✗ harness: ' + e.message);
  } finally {
    stop();
  }

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})();
