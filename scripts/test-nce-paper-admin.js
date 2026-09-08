'use strict';
// ── The NCE paper generator, driven in a real browser ─────────────────────
//
// `engine/nce_paper.js` could assemble a paper for six batches and nothing in
// the app ever called it, so none of the 75 checks in test-nce-paper.js proved
// a person could get a paper out. This drives the ADMIN card in real headless
// Chrome: render it, pick a subject, press Generate, and read what comes back.
//
//   node scripts/test-nce-paper-admin.js
//
// ⚠ It asserts the generator stays OUT of the child-facing surfaces as firmly
//   as it asserts the paper comes out. `grade9-maths` is `comingSoon: true`
//   because no teacher has reviewed a question in it; a route to it from a
//   dashboard would be the defect, not the feature.
//
// ⚠ Service worker BYPASSED and cache ignored, or this measures the shell as
//   it was before the change.
//
// Requires Chrome. Set CHROME_PATH to override.

const { spawn } = require('child_process');
const path = require('path');
const http = require('http');
const fs = require('fs');

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const CDP_PORT = 9353;
const SRV_PORT = 8903;
const ROOT = path.join(__dirname, '..');

let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  ✗ ' + m); } };

const sleep = ms => new Promise(r => setTimeout(r, ms));
const getJSON = url => new Promise((res, rej) => {
  http.get(url, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(e); } }); }).on('error', rej);
});

// ── Source-level checks: cheap, and they run even with no Chrome ───────────
function sourceChecks() {
  console.log('wiring');
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  const admin = fs.readFileSync(path.join(ROOT, 'engine', 'admin.js'), 'utf8');
  const mod = fs.readFileSync(path.join(ROOT, 'engine', 'nce_paper_admin.js'), 'utf8');

  ok(/<script src="engine\/nce_paper_admin\.js">/.test(html), 'index.html loads nce_paper_admin.js');
  ok(html.indexOf('engine/nce_paper.js') < html.indexOf('engine/nce_paper_admin.js'),
     'nce_paper.js loads BEFORE nce_paper_admin.js');
  ok(/'\/engine\/nce_paper_admin\.js'/.test(sw), 'sw.js pre-caches nce_paper_admin.js');
  ok(/id="admin-nce-paper"/.test(html), 'the card host exists in index.html');
  ok(/NcePaperAdmin\.render\(\)/.test(admin), 'admin.js calls NcePaperAdmin.render()');

  // The host must be inside the admin screen, or showScreen() can never hide
  // it — the exact defect check.js's checkScreenNesting exists for.
  const contentIdx = html.indexOf('id="admin-tab-content"');
  const hostIdx = html.indexOf('id="admin-nce-paper"');
  const statsIdx = html.indexOf('id="admin-tab-stats"');
  ok(contentIdx > 0 && hostIdx > contentIdx && hostIdx < statsIdx,
     'the card is inside the Content tab panel');

  // ⚠ The generator must not appear on any child- or parent-facing surface.
  ok(!/NcePaperAdmin/.test(fs.readFileSync(path.join(ROOT, 'engine', 'app.js'), 'utf8')),
     'app.js does not reference NcePaperAdmin (no child-facing route)');
  // The Generate button's handler is BUILT BY render(), so index.html
  // carries no NcePaperAdmin call at all. Asserting "exactly one inline
  // handler" passed nothing and failed for the right reason. What matters is
  // that no child- or parent-facing screen can reach it.
  const kidScreens = ['screen-dashboard', 'screen-subject-select', 'screen-practice',
                      'screen-parent', 'screen-landing', 'screen-minigames'];
  for (const id of kidScreens) {
    const i = html.indexOf('id="' + id + '"');
    const seg = i < 0 ? '' : html.slice(i, i + 40000);
    ok(!/NcePaperAdmin/.test(seg), 'no NcePaperAdmin reference near #' + id);
  }

  // The traps this module is written around.
  ok(/revokeObjectURL/.test(mod), 'blob urls are revoked rather than leaked');
  // ⚠ Strip comments first. The module's own header WARNS about window.open(),
  //   so a naive scan of the file failed on the comment that documents the rule.
  const code = mod.replace(/\/\*[\s\S]*?\*\//g, '').split('\n')
    .filter(l => !/^\s*\/\//.test(l)).join('\n');
  ok(!/window\.open\s*\(/.test(code), 'no window.open() call (a popup after an await is blocked)');
  ok(/paper\.warnings/.test(mod), 'the blueprint warnings are read, not ignored');
  ok(/own\.has\(q\.chapterId\)/.test(mod),
     'tasks are scoped by chapter id, not by a subject field that does not exist');
  ok(/recentIds:\s*before/.test(mod), 'the recent-paper history is passed to assemblePaper');
  ok(/sourceIds \|\| \[t\.id\]/.test(mod),
     'the MCQ block is recorded by its sourceIds, not its synthetic id');
  ok(/catch\s*\{\s*return \[\];\s*\}/.test(mod),
     'a localStorage read that throws is handled');
  ok(/recentIds:\s*before/.test(mod), 'the recent-paper history is passed to assemblePaper');
  ok(/sourceIds \|\| \[t\.id\]/.test(mod),
     'the MCQ block is recorded by its sourceIds, not its synthetic id');
  ok(/catch\s*\{\s*return \[\];\s*\}/.test(mod),
     'a localStorage read that throws is handled');
}

(async () => {
  sourceChecks();

  const server = spawn(process.execPath, [path.join(ROOT, 'dev-server.js'), String(SRV_PORT)],
    { cwd: ROOT, stdio: 'ignore' });
  const chrome = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${CDP_PORT}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu',
    `--user-data-dir=${path.join(require('os').tmpdir(), 'psac-nce-admin')}`,
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

    const errors = [];
    ws.addEventListener('message', ev => {
      let m; try { m = JSON.parse(ev.data); } catch { return; }
      if (m.sessionId !== sessionId) return;
      if (m.method === 'Runtime.exceptionThrown') {
        const d = m.params.exceptionDetails;
        errors.push((d.exception && d.exception.description) || d.text);
      }
      if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
        errors.push(m.params.args.map(a => a.value || a.description || '').join(' '));
      }
    });

    const S = (method, params, t) => new Promise((resolve, reject) => {
      const id = rpc._id = (rpc._id || 0) + 1;
      const timer = setTimeout(() => { cleanup(); reject(new Error('CDP timeout: ' + method)); }, t || 30000);
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

    await S('Runtime.enable'); await S('Network.enable'); await S('Page.enable');
    let bypassed = false;
    for (const m of ['Network.setBypassServiceWorker', 'Page.setBypassServiceWorker']) {
      try { await S(m, { bypass: true }); bypassed = true; break; } catch {}
    }
    if (!bypassed) throw new Error('could not bypass the service worker — refusing to measure a stale shell');

    await S('Page.navigate', { url: `http://127.0.0.1:${SRV_PORT}/index.html` });
    await sleep(4000);

    const ev = async expr => {
      const r = await S('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' :: ' + expr);
      return r.result && r.result.value;
    };

    console.log('\nin the browser');
    ok(await ev('typeof NcePaper === "object"'), 'NcePaper is loaded');
    ok(await ev('typeof NcePaperAdmin === "object"'), 'NcePaperAdmin is loaded');
    ok(await ev('typeof NcePaper.assemblePaper === "function"'), 'assemblePaper is reachable');

    const subs = await ev('JSON.stringify(NcePaperAdmin.subjects())');
    const list = JSON.parse(subs || '[]');
    ok(list.length >= 1, 'at least one blueprint is offered (' + list.length + ')');
    ok(list.some(s => s.id === 'grade9-maths'), 'grade9-maths is offered');

    console.log('\nthe card renders');
    await ev('NcePaperAdmin.render()');
    ok(await ev('!!document.getElementById("adm-nce-subject")'), 'the subject select is built');
    ok(await ev('!!document.getElementById("adm-nce-seed")'), 'the seed input is built');
    ok(await ev('!!document.getElementById("adm-nce-go")'), 'the Generate button is built');
    ok(await ev('document.getElementById("adm-nce-subject").options.length === '
      + list.length), 'the select holds one option per blueprint');
    // Every field gets a name, per the labelling rule.
    ok(await ev('!!document.getElementById("adm-nce-seed").getAttribute("aria-label")'),
       'the seed input is labelled');

    // ── The honest "no content" path, first ───────────────────────────────
    // ⚠ With no signed-in adult, QuestionLoader has no token and refuses to
    //   ask - which is correct. The generator must then SAY so rather than
    //   render an empty paper that looks like it worked. Measured here.
    console.log('\nan empty bank is reported, not papered over');
    await ev('document.getElementById("adm-nce-subject").value = "grade9-maths";');
    await ev('NcePaperAdmin.generate()');
    for (let i = 0; i < 20; i++) {
      if (await ev('!!document.querySelector("#adm-nce-out .text-rose-500")')) break;
      await sleep(300);
    }
    const noAuth = await ev('(document.querySelector("#adm-nce-out .text-rose-500")||{}).textContent||""');
    ok(/No multi-part tasks reached the browser/.test(noAuth),
       'an unauthenticated session gets a plain refusal, not a blank paper');
    ok(await ev('NcePaperAdmin._state() === null'), 'no paper state is left behind');

    // ── Now seed the bank and drive the real assembly ────────────────────
    // ⚠ THIS DOES NOT PROVE THE FETCH PATH. It loads the same built bundle the
    //   server would have returned, so everything from assembly onwards is the
    //   real code; getting the bundle through questions.js needs an admin JWT
    //   and CLAUDE.md forbids pointing a login probe at a real family.
    console.log('\ngenerating a paper (bank seeded from the built bundle)');
    const seeded = await ev(
      'fetch("/netlify/question-bundles/grade9-maths.json").then(r=>r.json()).then(a=>{'
      + 'const have=new Set(STATIC_QUESTIONS.map(q=>q.id));'
      + 'STATIC_QUESTIONS.push(...a.filter(q=>!have.has(q.id)));'
      + 'return STATIC_QUESTIONS.filter(q=>q&&q.type==="task").length;}).catch(e=>"ERR "+e.message)');
    ok(typeof seeded === 'number' && seeded > 100,
       'the built bundle seeded the bank (' + seeded + ' tasks) - run node netlify/build-questions.js if this fails');
    await ev('document.getElementById("adm-nce-seed").value = "7";');
    await ev('NcePaperAdmin.generate()');
    // generate() awaits network; give the loader room and then read the panel.
    for (let i = 0; i < 30; i++) {
      if (await ev('!!(NcePaperAdmin._state() || document.querySelector("#adm-nce-out .text-rose-500"))')) break;
      await sleep(500);
    }
    const err = await ev('(document.querySelector("#adm-nce-out .text-rose-500")||{}).textContent || ""');
    ok(!err, 'generate() did not report an error' + (err ? ': ' + err : ''));

    const st = JSON.parse(await ev(
      'JSON.stringify((()=>{const s=NcePaperAdmin._state(); if(!s) return null;'
      + 'return {q:s.paper.tasks.length, marks:s.paper.totalMarks, target:s.bp.totalMarks,'
      + ' warn:(s.paper.warnings||[]).length, seed:s.seed,'
      + ' visual:s.paper.compliance&&s.paper.compliance.visualShare,'
      + ' depth:s.paper.compliance&&s.paper.compliance.maxDepth};})())') || 'null');
    ok(!!st, 'a paper was assembled');
    if (st) {
      ok(st.marks === st.target, `the paper totals exactly ${st.target} marks (got ${st.marks})`);
      ok(st.q >= 20 && st.q <= 40, `question count is plausible (${st.q})`);
      ok(st.seed === 7, 'the seed from the input was used');
      ok(st.depth >= 2, `numbering reaches part level (depth ${st.depth})`);
      ok((st.visual || 0) > 0.15, `questions carry figures (${Math.round((st.visual || 0) * 100)}%)`);
    }

    console.log('\nwhat the admin is shown');
    const out = await ev('document.getElementById("adm-nce-out").textContent');
    ok(/Open paper/.test(out), 'an "Open paper" link is offered');
    ok(/Open mark scheme/.test(out), 'an "Open mark scheme" link is offered');
    ok(/not been reviewed by a teacher/.test(out),
       'the panel says the questions are unreviewed');
    ok(/marks/.test(out) && new RegExp(String(st ? st.marks : -1)).test(out),
       'the mark total is shown');
    // Either the warnings are listed, or it says there were none — never silence.
    ok(/⚠/.test(out) || /No blueprint warnings/.test(out),
       'the blueprint verdict is stated either way');
    if (st && st.warn) {
      ok((out.match(/⚠/g) || []).length >= st.warn,
         `all ${st.warn} warning(s) are rendered`);
    }

    const hrefs = JSON.parse(await ev(
      'JSON.stringify([...document.querySelectorAll("#adm-nce-out a")].map(a=>a.getAttribute("href")))'));
    ok(hrefs.length === 2, 'exactly two links');
    ok(hrefs.every(h => /^blob:/.test(h)), 'both are blob: urls (no popup to be blocked)');
    ok(await ev('[...document.querySelectorAll("#adm-nce-out a")].every(a=>a.target==="_blank"&&/noopener/.test(a.rel))'),
       'both open in a new tab with rel=noopener');

    // ⚠ THE SEED ALONE NO LONGER IDENTIFIES A PAPER. The recent-paper history
    //   is a second input, so determinism holds for (seed, history) - and the
    //   history has to be cleared between the two runs for the check to mean
    //   anything. Asserting the old property would have quietly re-broken the
    //   repeat avoidance the history exists for.
    console.log('\nthe same seed AND the same history rebuild the same paper');
    await ev('NcePaperAdmin.clearHistory()');
    await ev('NcePaperAdmin.generate()');
    for (let i = 0; i < 30; i++) {
      if (await ev('!!NcePaperAdmin._state()')) break;
      await sleep(300);
    }
    const first = await ev('NcePaperAdmin._state().paper.tasks.map(t=>t.id).join(",")');
    await ev('NcePaperAdmin.clearHistory()');
    await ev('NcePaperAdmin.generate()');
    for (let i = 0; i < 30; i++) {
      if (await ev('!!NcePaperAdmin._state()')) break;
      await sleep(300);
    }
    const second = await ev('NcePaperAdmin._state().paper.tasks.map(t=>t.id).join(",")');
    ok(first === second && !!first, 'seed 7 is deterministic');

    await ev('document.getElementById("adm-nce-seed").value = "8";');
    await ev('NcePaperAdmin.generate()');
    for (let i = 0; i < 30; i++) {
      if (await ev('NcePaperAdmin._state() && NcePaperAdmin._state().seed === 8')) break;
      await sleep(300);
    }
    const third = await ev('NcePaperAdmin._state().paper.tasks.map(t=>t.id).join(",")');
    ok(third !== first, 'a different seed deals a different paper');

    // ── The recent-paper history ─────────────────────────────────────────
    // ⚠ Without it, a teacher pressing Generate five times got five papers
    //   built with no memory of each other. Measured over five papers, that
    //   is 44.4% memorable-stimulus repeats against 33.8% with a full
    //   history - and a SHORT history is worse than none (60 ids measured
    //   47.3%), so the cap matters as much as its presence.
    console.log('\nthe recent-paper history');
    await ev('NcePaperAdmin.clearHistory()');
    await ev('document.getElementById("adm-nce-subject").value = "grade9-maths";');
    ok(await ev('NcePaperAdmin._history("grade9-maths").length === 0'),
       'clearHistory() empties the store');
    ok(/No recent papers are remembered/.test(
         await ev('document.getElementById("adm-nce-hist").textContent')),
       'the panel says the history is empty');

    await ev('document.getElementById("adm-nce-seed").value = "21";');
    await ev('NcePaperAdmin.generate()');
    for (let i = 0; i < 30; i++) {
      if (await ev('NcePaperAdmin._state() && NcePaperAdmin._state().seed === 21')) break;
      await sleep(300);
    }
    const h1 = await ev('NcePaperAdmin._history("grade9-maths").length');
    ok(h1 > 20, `the paper was recorded in the history (${h1} ids)`);
    ok(/Remembering/.test(await ev('document.getElementById("adm-nce-hist").textContent')),
       'the panel now reports what it is remembering');

    // A second paper on a DIFFERENT seed must reuse less than it would with
    // no history at all - that is the whole point of keeping one.
    const firstIds = await ev('JSON.stringify(NcePaperAdmin._state().paper.tasks.flatMap(t=>t.sourceIds||[t.id]))');
    await ev('document.getElementById("adm-nce-seed").value = "22";');
    await ev('NcePaperAdmin.generate()');
    for (let i = 0; i < 30; i++) {
      if (await ev('NcePaperAdmin._state() && NcePaperAdmin._state().seed === 22')) break;
      await sleep(300);
    }
    const h2 = await ev('NcePaperAdmin._history("grade9-maths").length');
    ok(h2 > h1, `the history grew with the second paper (${h1} -> ${h2})`);
    const secondIds = JSON.parse(await ev('JSON.stringify(NcePaperAdmin._state().paper.tasks.flatMap(t=>t.sourceIds||[t.id]))'));
    const firstSet = new Set(JSON.parse(firstIds));
    const overlap = secondIds.filter(id => firstSet.has(id)).length;
    ok(overlap / secondIds.length < 0.5,
       `the second paper reuses under half of the first (${overlap}/${secondIds.length})`);

    // ⚠ The cap has to hold, or the store grows without bound in a browser
    //   whose quota the question cache is already budgeted against.
    ok(await ev('NcePaperAdmin._history("grade9-maths").length <= 500'),
       'the history is capped');
    await ev('NcePaperAdmin.clearHistory()');


    console.log('\nre-rendering clears the last paper');
    await ev('NcePaperAdmin.render()');
    ok(await ev('NcePaperAdmin._state() === null'), 'render() resets the module state');
    ok(await ev('document.getElementById("adm-nce-out").innerHTML === ""'),
       'the previous paper panel is gone (its blob urls are revoked)');

    console.log('\nno console errors');
    const real = errors.filter(e => !/favicon|manifest\.json|Failed to load resource/i.test(e));
    ok(real.length === 0, 'no page errors' + (real.length ? ': ' + real.slice(0, 3).join(' | ') : ''));

  } catch (e) {
    fail++;
    console.log('  ✗ harness: ' + e.message);
  } finally {
    stop();
  }

  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 1 : 0);
})();

function rpc(ws, method, params, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    const id = rpc._id = (rpc._id || 0) + 1;
    const timer = setTimeout(() => { cleanup(); reject(new Error('CDP timeout: ' + method)); }, timeoutMs);
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
