'use strict';
// Science Labs › Physical & Chemical Changes — end-to-end browser test.
//
// Drives a real browser (Chrome for Testing, headless) via CDP WebSocket.
// Since 2026-09-20 the lab opens on an EXPERIMENT (lab_experiment.js, LAB_SPEC
// §10) at both grades; the old bench is behind "Explore the bench freely".
// Covers in order:
//   1. The hub — lab card appears for Grade 7
//   2. Lab JS is NOT loaded before the lab is opened (lazy-loading check)
//   3. Opening the lab — an experiment Aim, no welcome card in the way
//   4. Grade 7: every experiment walked Aim → Predict → Do → See → Check → Done,
//      the wrong zone of every step explained, the right one advancing
//   5. Grade 7 Explore: the old guide "Sort the changes" by tapping what glows
//   6. Grade 7 Explore: free classification (cutting — reversibility is not the test)
//   7. Grade 7 Explore: result card when dissolving is dropped in Chemical
//   8. Grade 7 Explore: discoveries, mission, "Show me how", every discovery
//      unlocks by its own recipe, Calm Mode
//   9. Grade 8: every experiment walked (signs, exothermic/endothermic, equations)
//  10. Grade 8 Explore: sign chips, signs_guide, discoveries, signs_m mission
//  11. 360px layout — zones and canvas fit
//  12. No unhandled JS errors throughout
//
// Run:
//   CHROME_PATH=<Chrome for Testing exe> node scripts/test-labs-changes.js
//
// ⚠ The page is served over file:// (Chrome for Testing here cannot reach 127.0.0.1).
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9430;                                           // port specified in lab spec
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => {
  let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } });
}).on('error', rej));

let checks = 0, failed = 0;
const ok = (label, cond, detail) => {
  if (cond) { checks++; console.log('OK   ' + label); }
  else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail).slice(0, 400) : '')); }
};
const plain = s => String(s).replace(/[\u{1F000}-\u{1FAFF}\u{2300}-\u{27BF}\u{FE0F}]/gu, '').replace(/\s+/g, ' ').trim().toLowerCase();

(async () => {
  const chrome = spawn(
    process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    [
      '--headless=new', '--remote-debugging-port=' + DBG,
      '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-changes-')),
      '--allow-file-access-from-files', '--no-first-run', '--hide-scrollbars', 'about:blank',
    ],
    { stdio: 'ignore' }
  );
  const quit = code => { try { chrome.kill(); } catch (_) {} process.exit(code); };

  let version;
  for (let i = 0; i < 40 && !version; i++) {
    try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); }
  }
  if (!version) { console.log('FAIL Chrome did not start'); quit(1); }

  const ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });

  let serial = 0;
  const waiting = new Map();
  const errors = [];
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.method === 'Runtime.exceptionThrown')
      errors.push(((m.params.exceptionDetails.exception || {}).description || m.params.exceptionDetails.text || '').slice(0, 200));
    if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); }
  };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const id = ++serial;
    const t = setTimeout(() => { waiting.delete(id); rej(Error('Timeout ' + method)); }, 30000);
    waiting.set(id, m => { clearTimeout(t); m.error ? rej(Error(m.error.message)) : res(m.result); });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });

  const target = await send('Target.createTarget', { url: 'about:blank' });
  const session = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
  const call = (m, p) => send(m, p, session.sessionId);
  await call('Page.enable'); await call('Runtime.enable');
  await call('Emulation.setDeviceMetricsOverride', { width: 360, height: 780, deviceScaleFactor: 2, mobile: true });

  const ev = async expr => {
    const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails)
      throw new Error(String((r.exceptionDetails.exception && r.exceptionDetails.exception.description) || r.exceptionDetails.text).slice(0, 500));
    return r.result.value;
  };
  const click = sel => ev(`(() => {
    const el = document.querySelector(${JSON.stringify(sel)});
    if (!el) return 'missing: ' + ${JSON.stringify(sel)};
    if (el.hidden) return 'hidden: ' + ${JSON.stringify(sel)};
    el.click(); return true;
  })()`);
  const dbg  = () => ev('LabChanges._debug()');
  const xdbg = () => ev('LabExperiment._debug()');
  const overlay = () => ev(`(() => {
    const o = document.getElementById('lab-overlay');
    if (!o || o.hidden) return null;
    return { cls: o.className, text: o.textContent.replace(/\\s+/g,' ').slice(0, 3000) };
  })()`);
  const closeOv = () => click('#lab-overlay [data-ov-close]');
  // A guide advances on the bench action it asks for. The test taps what glows,
  // as a child would; on a classify step BOTH zones glow, so tap the right one.
  const next = () => click('.is-next:not([hidden])');
  const nextZone = () => ev(`(() => {
    const d = LabChanges._debug();
    const sc = LabChangesData.SCENARIOS.find(s => s.id === d.current);
    const z = sc && document.querySelector('[data-zone="' + sc.type + '"]');
    if (!z) return 'no zone for ' + d.current;
    z.click(); return true;
  })()`);
  const labScripts = () => ev("[...document.scripts].map(s=>s.src).filter(s=>/engine\\/labs\\//.test(s)).map(s=>s.split('/').pop()).join()");
  // Answer a runner quiz with the right option every time (the bench shuffles).
  const answerRight = async exp => {
    for (const ref of exp.check) {
      const first = await ev(`(() => { const q = LabChanges.experiment.question(${JSON.stringify(ref)}); return q ? q.options[0] : null; })()`);
      const hit = await ev(`(() => { const b = [...document.querySelectorAll('#lab-overlay .lab-quiz-opt')].find(x => x.textContent.includes(${JSON.stringify(first)})); if (b) b.click(); return !!b; })()`);
      if (!hit) return false;
      await sleep(150);
      await ev("document.querySelector('#lab-overlay [data-next]')?.click(); true");
      await sleep(250);
    }
    return true;
  };
  // Walk one experiment from its Aim to Done, the way scripts/test-labs-experiments.js does.
  const walkExp = async exp => {
    console.log(`-- ${exp.id}: ${exp.title}`);
    await ev(`LabExperiment.open('${exp.id}'); true`); await sleep(300);
    let x = await xdbg();
    ok(`${exp.id}: Aim shows the question, no overlay in the way`, x.phase === 'aim' && x.exp === exp.id && !(await overlay()) && (await ev("document.querySelector('#lab-exp-title').textContent")) === exp.title, x);
    ok(`${exp.id}: the set-up scenario is on the canvas and nothing on the bench is tappable yet`,
       (await dbg()).current === exp.setup[0].split(':')[1] && await ev("[...document.querySelectorAll('#labs-root [data-zone], #labs-root [data-sign], #labs-root [data-scenario]')].every(b => b.hidden || !b.offsetParent)"), await dbg());
    await click('[data-exp="start"]'); await sleep(250);
    x = await xdbg();
    ok(`${exp.id}: Start → Predict with ${exp.predict.options.length} tappable options`, x.phase === 'predict' && (await ev("document.querySelectorAll('#lab-exp [data-exp-pick]').length")) === exp.predict.options.length, x);
    const wrongP = exp.predict.options.find(o => o.id !== exp.predict.answer) || exp.predict.options[0];
    await click(`[data-exp-pick="${wrongP.id}"]`); await sleep(400);
    x = await xdbg();
    ok(`${exp.id}: a prediction is a tap, then Do starts`, x.phase === 'do' && x.predicted === wrongP.id, x);
    for (let k = 0; k < 10; k++) {
      x = await xdbg();
      if (x.phase !== 'do') break;
      const step = exp.steps[x.step];
      if (!step) { ok(`${exp.id}: runner step ${x.step} exists`, false, x); break; }
      const tok = step.on || step.any[0];
      const sel = await ev(`LabChanges.experiment.selector(${JSON.stringify(tok)})`);
      const bd = await dbg();
      ok(`${exp.id} step ${x.step + 1}: ${tok.split(':')[1]} is on the canvas, zones open`, bd.current === tok.split(':')[1] && bd.phase === 'watch' && bd.classifyOpen, bd);
      const box = await ev("(document.getElementById('lab-guide') || {}).textContent || ''");
      ok(`${exp.id} step ${x.step + 1}: the yellow box asks the question`, plain(box).includes(plain(step.ask).slice(0, 30)), box.slice(0, 120));
      const glow = await ev(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); return e && !e.hidden && !!e.offsetParent && e.classList.contains('is-next'); })()`);
      ok(`${exp.id} step ${x.step + 1}: the control for ${tok} is on screen and glows`, glow === true, { tok, sel });
      const optSels = await Promise.all(step.options.map(t => ev(`LabChanges.experiment.selector(${JSON.stringify(t)})`)));
      ok(`${exp.id} step ${x.step + 1}: every option glows and nothing unlisted is left bright`, await ev(`(() => {
        const opts = ${JSON.stringify(optSels)};
        if (!opts.every(s => { const e = document.querySelector(s); return e && !e.hidden && e.classList.contains('is-next'); })) return false;
        return [...document.querySelectorAll('#labs-root [data-zone], #labs-root [data-sign]')].filter(b => !b.hidden && b.offsetParent)
          .every(b => b.classList.contains('is-next') || b.classList.contains('is-guide-dim'));
      })()`));
      ok(`${exp.id} step ${x.step + 1}: the picture and the instruction are both in the viewport`, await ev(`(() => {
        const r = s => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return [b.top, b.bottom]; };
        const c = r('#labs-root canvas'), g = r('#lab-guide'), vh = innerHeight;
        return !!c && !!g && c[0] >= -2 && c[1] <= vh + 2 && g[0] >= -2 && g[1] <= vh + 2; })()`));
      if (step.wrong) {
        const w = Object.keys(step.wrong)[0];
        const wsel = await ev(`LabChanges.experiment.selector(${JSON.stringify(w)})`);
        const r = await click(wsel); await sleep(300);
        const o = await overlay();
        ok(`${exp.id} step ${x.step + 1}: the wrong option ${w} gets a card that explains`, r === true && !!o && o.text.includes(step.wrong[w].slice(0, 25)), o && o.text.slice(0, 160));
        ok(`${exp.id} step ${x.step + 1}: …and nothing moved: same step, bench still waiting`, (await xdbg()).step === x.step && (await dbg()).phase === 'watch');
        await closeOv(); await sleep(200);
      }
      const r = await click(sel); await sleep(250);
      const bd2 = await dbg();
      ok(`${exp.id} step ${x.step + 1}: the right tap shows a ✓ line under the picture with Next`, r === true && bd2.phase === 'reveal' && bd2.pending === tok && await ev("!!document.querySelector('.lab-changes-exp-reveal') && !!document.querySelector('[data-act=\"exp-next\"]')"), bd2);
      await ev('LabChanges._tick(4); true');
      await sleep(400);
      for (let w = 0; w < 20 && (await xdbg()).phase === 'do' && (await xdbg()).step === x.step; w++) { await ev('LabChanges._tick(2); true'); await sleep(150); }
    }
    x = await xdbg();
    ok(`${exp.id}: every step done leads to See`, x.phase === 'see', x);
    const seeTxt = await ev("document.querySelector('#lab-exp').textContent.replace(/\\s+/g, ' ')");
    ok(`${exp.id}: See says what happened and answers the prediction from the bench`, seeTxt.includes(exp.see.saw) && /You said/.test(seeTxt) && /It was/.test(seeTxt), seeTxt.slice(0, 200));
    const evd = await ev('LabChanges.experiment.evidence()');
    ok(`${exp.id}: the notebook has one line per step, in order`, evd.length === exp.steps.length && (await ev("document.querySelectorAll('#lab-exp .lab-exp-evidence li').length")) === evd.length, evd);
    await click('[data-exp="check"]'); await sleep(400);
    const q = await overlay();
    ok(`${exp.id}: Check opens the quiz with the evidence pinned above the question`, !!q && /What you saw/.test(q.text) && /Question 1 of/.test(q.text), q && q.text.slice(0, 160));
    const answered = await answerRight(exp);
    await sleep(300);
    x = await xdbg();
    ok(`${exp.id}: Done - saved with a perfect score, learn and exam on the card`, answered && x.phase === 'done' && x.result && x.result.firstTry === exp.check.length
       && await ev(`!!Labs.store('changes').done['${exp.id}'] && document.querySelector('#lab-exp').textContent.includes(${JSON.stringify(exp.see.learn)}) && document.querySelector('#lab-exp').textContent.includes(${JSON.stringify(exp.exam)})`), x);
    if (await overlay()) await closeOv();
  };
  // Every discovery of the grade on screen unlocks by following its own "Show me how".
  const allDiscoveries = async grade => {
    const discIds = await ev(`LabChangesData.forGrade(LabChangesData.DISCOVERIES, ${grade}).map(d => d.id)`);
    const unsolved = [];
    for (const id of discIds) {
      const res = await ev(`(() => {
        const st = Labs.store('changes'); delete st.disc['${id}'];
        document.getElementById('lab-overlay')?.remove();
        LabChanges.discoveryGuide('${id}');
        for (let k = 0; k < 40 && LabChanges._debug().guide; k++) {
          const o = document.querySelector('#lab-overlay.is-hazard, #lab-overlay.is-result');
          if (o) return 'card: ' + o.textContent.replace(/\\s+/g, ' ').slice(0, 90);
          const d = LabChanges._debug();
          let btn = null;
          for (const n of document.querySelectorAll('.is-next')) {
            if (n.hidden) continue;
            if (n.dataset.zone) { const sc = LabChangesData.SCENARIOS.find(s => s.id === d.current); if (sc && sc.type === n.dataset.zone) btn = n; }
            else btn = n;
          }
          if (btn) btn.click();
          else if (d.phase === 'reveal') document.querySelector('[data-act="next"]')?.click();
          else LabChanges._tick(3);
        }
        if (LabChanges._debug().guide) return 'guide never finished at step ' + LabChanges._debug().guideStep;
        document.getElementById('lab-overlay')?.remove();
        return !!st.disc['${id}'];
      })()`);
      if (res !== true) unsolved.push(id + ' → ' + res);
    }
    ok(`Grade ${grade}: all ${discIds.length} discoveries unlock by following their own “Show me how”`, unsolved.length === 0, unsolved);
  };
  const openAt = async grade => {
    await ev(`(() => { if (typeof Labs !== 'undefined') { Labs.closeOverlay(true); Labs.backToHub(); } SELECTED_GRADE = ${grade}; showScreen('labs'); return true; })()`);
    for (let i = 0; i < 40; i++) { await sleep(150); if (await ev("typeof window.Labs !== 'undefined' && !!document.getElementById('labs-root')")) break; }
    await ev('Labs.backToHub(); true');
    await ev("Labs.openLab('changes'); true");
    for (let i = 0; i < 60; i++) { await sleep(150); if (await ev(`!!document.querySelector('#labs-root .lab-changes') && LabChanges._debug().grade === ${grade} && !!document.querySelector('#lab-exp')`)) break; }
  };

  // ── 1. Load the page ───────────────────────────────────────────────────────
  console.log('\n-- loading the app');
  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) {
    await sleep(500);
    try { ready = await ev("document.readyState === 'complete' && typeof openLabs === 'function'"); } catch (_) {}
  }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: page target is ' + url); quit(1); }
  ok('app loaded on file://', ready === true);
  await sleep(1500);

  // ── 2. Lazy-loading check ──────────────────────────────────────────────────
  console.log('\n-- lazy-loading');
  ok('lab_changes.js is not loaded before any lab is opened',
    await ev("[...document.scripts].every(s => !/lab_changes\\.js/.test(s.src))"));
  ok('LabChanges is not defined before the lab is opened',
    await ev("typeof LabChanges === 'undefined'"));

  // ── 3. Hub — card visibility ───────────────────────────────────────────────
  console.log('\n-- hub visibility per grade');
  await ev("SELECTED_GRADE = 7; openLabs(); true");
  await sleep(2000);
  ok('Grade 7: labs screen opens', await ev("S.currentScreen === 'labs'"), await ev('S.currentScreen'));
  ok('hub loaded only the shell so far (no lab_changes.js)', !/lab_changes/.test(await labScripts()), await labScripts());
  ok('Grade 7: changes lab card is visible in the hub',
    await ev("!!document.querySelector('[data-lab=\"changes\"]')"));

  // ── 4. Opening the lab ─────────────────────────────────────────────────────
  console.log('\n-- opening the Changes lab (Grade 7)');
  await ev("SELECTED_GRADE = 7; true");
  await click('[data-lab="changes"]');
  let labReady = false;
  for (let i = 0; i < 60 && !labReady; i++) {
    await sleep(250);
    try { labReady = await ev("typeof LabChanges !== 'undefined' && !!document.querySelector('.lab-changes') && !!document.querySelector('#lab-exp')"); } catch (_) {}
  }
  ok('opening the lab fetches lab_changes_data.js and lab_changes.js',
    (await labScripts()).includes('lab_changes_data.js') && (await labScripts()).includes('lab_changes.js'),
    await labScripts());
  ok('lab DOM mounts', labReady, labReady);
  ok('eyebrow shows "Science · Grade 7"',
    await ev("(document.getElementById('lab-changes-eyebrow') || {}).textContent === 'Science · Grade 7'"),
    await ev("(document.getElementById('lab-changes-eyebrow') || {}).textContent"));
  // Since 2026-09-20 the Aim of the first experiment IS the welcome (lab_experiment.js).
  let ov = await overlay();
  ok('first visit opens on an experiment Aim, with no welcome card in the way', !ov && await ev("!!document.querySelector('#lab-exp') && LabExperiment._debug().phase === 'aim'"), ov);
  ok('the welcome is marked seen', await ev("Labs.store('changes').intro === true"));
  const list7 = await ev('LabChanges.experiment.list()');
  ok('Grade 7 lists 4 experiments, the first about melting and freezing', list7.length === 4 && list7[0].id === 'melt_freeze', list7.map(e => e.id));
  ok('the ice is already on the canvas at the Aim, and the zones are hidden',
     (await dbg()).current === 'melting' && await ev("[...document.querySelectorAll('[data-zone]')].every(b => b.hidden) && !!document.querySelector('#labs-root canvas')"), await dbg());
  ok('the runner hides the coach, the task strip and the tabs',
     await ev("['.lab-coach', '.lab-task-strip', '.lab-tabs'].every(s => { const e = document.querySelector(s); return !e || getComputedStyle(e).display === 'none'; })"));

  // ── 5. Grade 7: every experiment, Aim to Done ─────────────────────────────
  console.log('\n-- Grade 7 experiments');
  for (const exp of list7) await walkExp(exp);
  ok('all four Grade 7 experiments are saved as done', await ev("LabChangesData.forGrade(LabChangesData.EXPERIMENTS, 7).every(e => !!Labs.store('changes').done[e.id])"));

  // ── 6. Explore: the old bench and its guides ───────────────────────────────
  console.log('\n-- Explore (Grade 7)');
  await click('[data-exp="explore"]');
  await ev('LabChanges.experiment.reset(); true');
  ok('"Explore the bench" shows the old start panel with 2 guided experiments and the scenario list',
     await ev("document.getElementById('labs-root').dataset.expMode === 'explore' && !!document.querySelector('.lab-start') && document.querySelectorAll('.lab-start [data-guide]').length === 2 && document.querySelectorAll('[data-scenario]').length >= 8"));
  await ev('LabChanges._test({ instant: true }); true');
  await click('[data-guide="sort"]');
  await sleep(300);
  let d = await dbg();
  ok('guide started: sort, step 0, the ice card glows', d.guide === 'sort' && d.guideStep === 0 && await ev("document.querySelector('[data-scenario=\"melting\"]').classList.contains('is-next')"), d);
  await next(); await sleep(300);
  d = await dbg();
  ok('after tapping the ice card the zones open and BOTH glow (step 1: classify)', d.current === 'melting' && d.guideStep === 1 && d.classifyOpen
     && await ev("!document.getElementById('lab-changes-classify').hidden && document.querySelector('[data-zone=\"physical\"]').classList.contains('is-next') && document.querySelector('[data-zone=\"chemical\"]').classList.contains('is-next')"), d);
  await nextZone(); await sleep(300);
  d = await dbg();
  ok('melting dropped in Physical: reveal, guide on step 2 (the candle glows)', d.phase === 'reveal' && d.guideStep === 2 && await ev("document.querySelector('[data-scenario=\"burning\"]').classList.contains('is-next')"), d);
  for (const sc of ['burning', 'rusting', 'dissolving']) {
    await click('[data-act="next"]'); await sleep(200);
    await next(); await sleep(300);
    const dd = await dbg();
    ok(`…${sc} selected by tapping what glows`, dd.current === sc, dd);
    await nextZone(); await sleep(300);
  }
  await sleep(400);
  ov = await overlay();
  ok('guide "Sort the changes" complete — experiment done overlay', ov && /Experiment complete/.test(ov.text) && /Sort the changes/.test(ov.text), ov && ov.text.slice(0, 120));
  await closeOv();
  ok('sort guide saved in store', await ev("!!Labs.store('changes').guides['sort']"));
  d = await dbg();
  ok('at least 4 scenarios correctly classified after the guide', d.classifiedCount >= 4, d.classifiedCount);

  // ── 7. Free classification: cutting (physical but irreversible) ────────────
  console.log('\n-- free classification: cutting');
  await click('[data-act="next"]'); await sleep(200);
  await click('[data-scenario="cutting"]');
  await sleep(300);
  d = await dbg();
  ok('cutting selected, zones open at once in instant mode', d.current === 'cutting' && await ev("!document.getElementById('lab-changes-classify').hidden"), d);
  await click('[data-zone="physical"]');
  await sleep(300);
  d = await dbg();
  ok('cutting: correct classification (physical)', d.phase === 'reveal', d.phase);
  ok('disc_two_questions unlocked', await ev("!!Labs.store('changes').disc['disc_two_questions']"));
  ok('reveal box shows "Physical"',
    await ev("document.getElementById('lab-changes-reveal').textContent.includes('Physical')"),
    await ev("document.getElementById('lab-changes-reveal').textContent.slice(0,80)"));

  // ── 8. Result card: dissolving dropped in Chemical ────────────────────────
  console.log('\n-- result card: dissolving mis-classified as chemical');
  await click('[data-act="next"]');
  await sleep(200);
  await click('[data-scenario="dissolving"]');
  await sleep(300);
  await click('[data-zone="chemical"]');
  await sleep(400);
  ov = await overlay();
  ok('result card fired for dissolving mis-classified', ov && /Dissolving is not a chemical change/.test(ov.text), ov && ov.text.slice(0, 200));
  await closeOv();
  await click('[data-act="next"]'); await sleep(200);

  // ── 9. Discoveries panel (Grade 7) ────────────────────────────────────────
  console.log('\n-- discoveries panel (Grade 7)');
  await click('[data-panel="found"]');
  await sleep(300);
  d = await dbg();
  ok('some discoveries are unlocked', d.discCount >= 4, d.discCount);
  ok('no Grade 8-only discoveries visible for Grade 7',
    await ev(`(() => {
      const items = [...document.querySelectorAll('[data-disc]')];
      return items.length > 0 && !items.some(el => el.dataset.disc.startsWith('g8_'));
    })()`));

  // ── 10. Mission: Physical or Chemical? (Grade 7) ──────────────────────────
  console.log('\n-- mission: Physical or Chemical? (Grade 7)');
  await click('[data-panel="missions"]');
  await sleep(300);
  ok('classify_m mission is shown', await ev("!!document.querySelector('[data-mission=\"classify_m\"]')"));
  ok('signs_m mission is NOT shown for Grade 7',
    await ev("!document.querySelector('[data-mission=\"signs_m\"]')"));
  await click('[data-mission="classify_m"]');
  await sleep(500);
  for (let qi = 0; qi < 5; qi++) {
    await ev(`(() => { const opts = document.querySelectorAll('.lab-quiz-opt'); if (opts.length) opts[0].click(); return true; })()`);
    await sleep(200);
    await ev(`(() => { const btn = document.querySelector('#lab-overlay [data-next]'); if (btn) btn.click(); return true; })()`);
    await sleep(300);
  }
  await sleep(500);
  ov = await overlay();
  ok('mission done overlay appears', ov && /Physical or Chemical/.test(ov.text), ov && ov.text.slice(0, 150));
  ok('mission saved with at least 1 star', await ev("(Labs.store('changes').missions['classify_m'] || {}).stars >= 1"));
  await closeOv();

  // ── 11. Discovery guide: "Show me how" for disc_chemical ─────────────────
  console.log('\n-- Show me how (disc_chemical)');
  await click('[data-panel="found"]');
  await sleep(300);
  await ev("Labs.store('changes').disc = {}; true");
  await click('[data-panel="found"]');
  await sleep(200);
  await click('[data-disc="disc_chemical"]');
  await sleep(400);
  ov = await overlay();
  ok('a locked discovery shows how to find it, with “Show me how”', ov && /How to find it/.test(ov.text) && /Show me how/.test(ov.text), ov && ov.text.slice(0, 120));
  await click('[data-disc-go="disc_chemical"]');
  await sleep(400);
  d = await dbg();
  ok('discoveryGuide started for disc_chemical', d.guide === 'adhoc', d.guide);
  await click('[data-act="guide-stop"]');
  await allDiscoveries(7);

  // ── 12. Calm Mode ─────────────────────────────────────────────────────────
  console.log('\n-- Calm Mode');
  await ev(`(() => {
    const el = document.querySelector('[data-act="calm"], [data-calm]');
    if (el) el.click();
    return !!el;
  })()`);
  await sleep(300);
  ok('canvas element still present in Calm Mode', await ev("!!document.getElementById('lab-canvas')"));

  // ── 13. Grade 8 session ───────────────────────────────────────────────────
  console.log('\n-- Grade 8 session');
  await openAt(8);
  ok('lab opens for Grade 8 on an experiment Aim', await ev("!!document.querySelector('.lab-changes') && LabExperiment._debug().phase === 'aim' && !document.getElementById('lab-overlay')"), await xdbg());
  ok('eyebrow shows "Science · Grade 8"',
    await ev("(document.getElementById('lab-changes-eyebrow') || {}).textContent === 'Science · Grade 8'"),
    await ev("(document.getElementById('lab-changes-eyebrow') || {}).textContent"));
  const list8 = await ev('LabChanges.experiment.list()');
  ok('Grade 8 lists 4 experiments, the first asking which sign shows a reaction', list8.length === 4 && list8[0].id === 'spot_signs', list8.map(e => e.id));
  for (const exp of list8) await walkExp(exp);
  ok('all four Grade 8 experiments are saved as done', await ev("LabChangesData.forGrade(LabChangesData.EXPERIMENTS, 8).every(e => !!Labs.store('changes').done[e.id])"));

  // ── 14. Grade 8 Explore ───────────────────────────────────────────────────
  console.log('\n-- Grade 8 Explore');
  await click('[data-exp="explore"]');
  await ev('LabChanges.experiment.reset(); true');
  await ev('LabChanges._test({ instant: true }); true');
  ok('Grade 8: combustion scenario in list',
    await ev("!!document.querySelector('[data-scenario=\"combustion\"]') && !document.querySelector('[data-scenario=\"combustion\"]').hidden"));
  ok('Grade 8: precipitate scenario in list',
    await ev("!!document.querySelector('[data-scenario=\"precipitate\"]')"));
  await click('[data-scenario="burning"]');
  await sleep(300);
  ok('Grade 8: sign chips area is visible',
    await ev("!document.getElementById('lab-changes-signs-wrap').hidden"),
    await ev("document.getElementById('lab-changes-signs-wrap').hidden"));
  ok('Grade 8: heat and precipitate sign chips are present and shown',
    await ev("['heat', 'precipitate'].every(s => { const e = document.querySelector('[data-sign=\"' + s + '\"]'); return e && !e.hidden; })"));

  // ── 15. 360px layout ──────────────────────────────────────────────────────
  console.log('\n-- 360px layout checks');
  ok('the two zones are visible and fit at 360px',
    await ev(`(() => { const row = document.querySelector('.lab-changes-zones');
      if (!row || row.hidden) return false;
      const r = row.getBoundingClientRect();
      return r.width > 0 && r.right <= 360.5 && document.querySelectorAll('.lab-changes-zone').length === 2; })()`));
  ok('canvas fits 360px viewport',
    await ev(`(() => { const cv = document.getElementById('lab-canvas');
      if (!cv) return false;
      return cv.getBoundingClientRect().width <= 360; })()`));

  await click('[data-sign="heat"]');
  await sleep(200);
  ok('heat sign chip toggles to selected',
    await ev("document.querySelector('[data-sign=\"heat\"]').classList.contains('is-sel')"));
  await click('[data-zone="chemical"]');
  await sleep(300);
  d = await dbg();
  ok('Grade 8: burning classified correctly', d.phase === 'reveal', d.phase);
  ok('g8_disc_exothermic unlocked by identifying heat sign',
    await ev("!!Labs.store('changes').disc['g8_disc_exothermic']"));

  // ── 16. Grade 8 guided experiment: signs_guide ───────────────────────────
  console.log('\n-- Grade 8: signs_guide');
  await click('[data-act="next"]');
  await sleep(200);
  await click('[data-guide="signs_guide"]');
  await sleep(400);
  d = await dbg();
  ok('signs_guide started', d.guide === 'signs_guide', d.guide);
  // watch:rusting → sign:colour_change → watch:fizzing → sign:gas → watch:burning → sign:heat → watch:precipitate → sign:precipitate
  for (let i = 0; i < 8; i++) {
    const r = await next();
    if (r !== true) ok(`signs_guide step ${i + 1}: something glows to tap`, false, r);
    await sleep(300);
  }
  await sleep(500);
  ov = await overlay();
  ok('signs_guide complete — experiment done overlay', ov && /Experiment complete|Signs of a chemical change/.test(ov.text), ov && ov.text.slice(0, 120));
  await closeOv();
  ok('signs_guide saved in store', await ev("!!Labs.store('changes').guides['signs_guide']"));

  // ── 17. Grade 8 discoveries panel ────────────────────────────────────────
  console.log('\n-- Grade 8: discoveries panel');
  await click('[data-panel="found"]');
  await sleep(300);
  ok('Grade 8: g8_disc_signs discovery card is visible',
    await ev(`!!document.querySelector('[data-disc="g8_disc_signs"]')`));
  ok('Grade 8: g8_disc_conservation discovery card is visible',
    await ev(`!!document.querySelector('[data-disc="g8_disc_conservation"]')`));
  d = await dbg();
  ok('Grade 8: at least 4 discoveries unlocked', d.discCount >= 4, d.discCount);
  await allDiscoveries(8);

  // ── 18. Grade 8 mission: signs_m ─────────────────────────────────────────
  console.log('\n-- Grade 8: signs_m mission');
  await click('[data-panel="missions"]');
  await sleep(300);
  ok('signs_m mission is shown for Grade 8', await ev("!!document.querySelector('[data-mission=\"signs_m\"]')"));
  await click('[data-mission="signs_m"]');
  await sleep(500);
  for (let qi = 0; qi < 5; qi++) {
    await ev(`(() => { const opts = document.querySelectorAll('.lab-quiz-opt'); if (opts.length) opts[0].click(); return true; })()`);
    await sleep(200);
    await ev(`(() => { const btn = document.querySelector('#lab-overlay [data-next]'); if (btn) btn.click(); return true; })()`);
    await sleep(300);
  }
  await sleep(500);
  ov = await overlay();
  ok('signs_m mission done overlay appears', ov && /Spot the Signs/.test(ov.text), ov && ov.text.slice(0, 150));
  ok('signs_m saved with at least 1 star', await ev("(Labs.store('changes').missions['signs_m'] || {}).stars >= 1"));
  await closeOv();

  // ── 19. Back to the experiments from Explore ──────────────────────────────
  console.log('\n-- back to the experiments');
  await click('[data-exp="back"]');
  await sleep(300);
  ok('"Back to the experiments" reopens the Aim with a clean bench and hidden zones',
     (await xdbg()).phase === 'aim' && await ev("[...document.querySelectorAll('[data-zone]')].every(b => b.hidden) && !document.getElementById('lab-overlay')"), await xdbg());

  // ── 20. No JS errors ──────────────────────────────────────────────────────
  console.log('\n-- JS errors');
  ok('no unhandled JS errors throughout', errors.length === 0, errors);

  // ── Final report ──────────────────────────────────────────────────────────
  console.log('\n──────────────────────────────────────────────────');
  console.log(`${checks} passed  /  ${failed} failed`);
  quit(failed > 0 ? 1 : 0);
})().catch(e => {
  console.error('Fatal:', e.message || e);
  process.exit(2);
});
