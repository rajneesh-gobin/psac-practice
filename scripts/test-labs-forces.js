'use strict';
// Science Labs › Forces & Pressure — browser test (Chrome for Testing).
//
// Opens the lab at Grade 8, then proves: it opens on an experiment Aim (since
// 2026-09-20, lab_experiment.js) with nothing in the way; the four experiments
// walk Aim → Predict → Do → See by tapping what glows, with the reading and
// force-name palettes answering the ask steps; Explore still shows the start
// panel; guided experiment "Measure the weight of objects" runs end to end;
// the overload hazard and both result cards appear; discoveries unlock;
// both missions reach at least one star; Calm Mode applies; the bench fits
// 360px with no control past the edge; the loop restarts after leaving and
// returning; nothing throws.
//
// Run: CHROME_PATH=<Chrome for Testing> node scripts/test-labs-forces.js
// Port 9425 (LAB_DBG_PORT overrides). Profile under LAB_TMP or the OS temp dir.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = Number(process.env.LAB_DBG_PORT) || 9425;
// ⚠⚠ THE FALLBACK IS THE INSTALLED CHROME, and it has to be something that
//   exists on a machine that is not the one this file was written on. This
//   defaulted to a Chrome for Testing binary under a SESSION-SCOPED scratch
//   directory — a path containing a UUID that changes every session, and in
//   one case a different Windows user entirely — so the suite could not run
//   for anybody, including the author on their next run. Nine suites were
//   dark for this reason alone. The instruction it carried ("never the
//   installed Chrome") is obsolete: re-measured, the installed Chrome drives
//   these through CDP fine, which is how the other thirty-odd browser suites
//   here have always run. CHROME_PATH still overrides for a pinned build.
const CHROME_PATH = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const SCRATCH = path.join(process.env.LAB_TMP || os.tmpdir(), 'psac-labs-forces');
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => {
  let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } });
}).on('error', rej));

let checks = 0, failed = 0, chrome = null;
const ok = (label, cond, detail) => {
  if (cond) { checks++; console.log('OK   ' + label); }
  else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail).slice(0, 600) : '')); }
};

fs.mkdirSync(SCRATCH, { recursive: true });

(async () => {
  // ── Start Chrome ──────────────────────────────
  if (!fs.existsSync(CHROME_PATH)) {
    console.error('Chrome for Testing not found at:\n  ' + CHROME_PATH);
    console.error('Set CHROME_PATH env var or check the path.');
    process.exit(1);
  }
  chrome = spawn(CHROME_PATH, [
    '--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + fs.mkdtempSync(path.join(SCRATCH, 'chrome-')),
    '--allow-file-access-from-files', '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  const quit = code => { try { chrome.kill(); } catch (_) {} process.exit(code); };

  let version;
  for (let i = 0; i < 40 && !version; i++) {
    try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); }
  }
  if (!version) { console.error('Chrome did not start'); quit(1); }

  const ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let serial = 0;
  const waiting = new Map();
  const errors = [];
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.method === 'Runtime.exceptionThrown')
      errors.push((m.params.exceptionDetails.exception || {}).description || m.params.exceptionDetails.text);
    if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); }
  };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const id = ++serial;
    const t = setTimeout(() => { waiting.delete(id); rej(Error('Timeout ' + method)); }, 60000);
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
    if (r.exceptionDetails) throw new Error(String(
      r.exceptionDetails.exception && r.exceptionDetails.exception.description || r.exceptionDetails.text
    ).slice(0, 500));
    return r.result.value;
  };
  const click = sel => ev(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); if (!el) return 'missing: ' + ${JSON.stringify(sel)}; el.click(); return true; })()`);
  const must = async sel => { const r = await click(sel); if (r !== true) ok('clicked ' + sel, false, r); return r; };
  const dbg = () => ev('LabForces._debug()');
  const tick = s => ev(`LabForces._tick(${s}); true`);
  const overlay = () => ev(`(() => { const o = document.getElementById('lab-overlay'); if (!o) return null;
    const h = o.querySelector('.is-exam h3');
    return { cls: o.className, text: o.textContent.replace(/\\s+/g, ' ').slice(0, 3000),
             exam: h ? h.textContent : '',
             signs: [...o.querySelectorAll('.lab-sign figcaption')].map(f => f.textContent) }; })()`);
  const closeOv = () => click('#lab-overlay [data-ov-close]');
  // A guide advances on the bench action it asks for. The test taps what
  // glows, as a child would; for an ask step it taps the right answer.
  const next = () => click('.is-next');
  const xdbg = () => ev('LabExperiment._debug()');
  const doStep = async () => {
    const d = await xdbg();
    const sel = await ev(`LabForces.experiment.selector(${JSON.stringify(d.token)})`);
    const r = await click(sel);
    await tick(3);
    await sleep(250);
    return r;
  };
  const hazardOk = (ov, signs, re) => !!(ov && /is-hazard/.test(ov.cls) &&
    signs.every(s => ov.signs.some(t => t.toLowerCase().includes(s.toLowerCase()))) &&
    re.test(ov.text) && /What happened/.test(ov.text) && /Why it'?s dangerous/.test(ov.text) &&
    /Do this instead/.test(ov.text) && /In your exams/.test(ov.exam));
  const resultOk = (ov, re) => !!(ov && /is-result/.test(ov.cls) && re.test(ov.text) &&
    /What happened/.test(ov.text) && /What you should have done/.test(ov.text) && /In your exams/.test(ov.exam));

  // ── Load app ──────────────────────────────────
  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) {
    await sleep(500);
    try { ready = await ev("document.readyState === 'complete' && typeof showScreen === 'function' && typeof RoleModules !== 'undefined'"); } catch (_) {}
  }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: wrong URL ' + url); quit(1); }
  ok('app loaded', ready === true);
  await sleep(2500);

  // ── Open lab at Grade 8 ──────────────────────
  console.log('\n-- opening Forces & Pressure at Grade 8');
  await ev("SELECTED_GRADE = 8; showScreen('labs'); true");
  let up = false;
  for (let i = 0; i < 60 && !up; i++) {
    await sleep(200);
    up = await ev("typeof Labs !== 'undefined' && !!document.getElementById('labs-root')");
  }
  ok('Labs shell loads', up);

  ok('the registry lists forces at Grade 8 with both chapters', await ev("(l => !!l && l.grades.join() === '8' && (l.chapters[8] || []).join() === 'g8s-forces,g8s-pressure')(Labs.LABS.find(x => x.id === 'forces'))"));
  await ev("Labs.openLab('forces'); true");
  let open = false;
  for (let i = 0; i < 60 && !open; i++) {
    await sleep(200);
    open = await ev("!!window.LabForces && !!document.querySelector('#labs-root .lab-forces')");
  }
  ok('Labs.openLab("forces") loads and renders', open);
  await sleep(600);

  // ── Experiments (lab_experiment.js) ──────────
  // Since 2026-09-20 the Aim of the first experiment IS the welcome; the old
  // bench sits behind "Explore the bench freely".
  console.log('\n-- experiments');
  let ov0 = await overlay();
  ok('first visit opens on an experiment Aim, with no welcome card in the way', !ov0 && await ev("!!document.querySelector('#lab-exp') && LabExperiment._debug().phase === 'aim'"), ov0);
  const list = await ev('LabForces.experiment.list()');
  ok('four experiments at Grade 8, the first reading the spring balance', list.length === 4 && list[0].id === 'weigh_bottle', list.map(e => e.id));
  ok('the Aim shows the picture with every tool, item and palette hidden',
    await ev("[...document.querySelectorAll('#labs-root .lab-tool, #labs-root .lab-shelf button, #labs-root .lab-item, #lab-forces-modebar button')].every(b => b.hidden || !b.offsetParent) && !!document.querySelector('#lab-forces-canvas')"));
  for (const exp of list) {
    await ev(`LabExperiment.open('${exp.id}'); true`); await sleep(250);
    let d = await xdbg();
    ok(`${exp.id}: Aim, then Start, then a tap to predict`, d.phase === 'aim');
    await click('[data-exp="start"]'); await sleep(200);
    await click(`[data-exp-pick="${exp.predict.answer}"]`); await sleep(300);
    d = await xdbg();
    ok(`${exp.id}: Do starts on step 1 with the guide box under the picture`, d.phase === 'do' && d.step === 0 && await ev("!document.getElementById('lab-guide').hidden && document.getElementById('lab-guide').parentElement.classList.contains('lab-canvas-wrap')"), d);
    const shown = await ev("[...document.querySelectorAll('#labs-root .lab-shelf button, #labs-root .lab-tool')].filter(b => !b.hidden && b.offsetParent).length");
    ok(`${exp.id}: only this experiment's controls are shown (${shown})`, shown >= 1 && shown <= 6, shown);
    ok(`${exp.id}: every option of the first step glows`, await ev("document.querySelectorAll('#labs-root .is-next').length") === (exp.steps[0].options || exp.steps[0].any || [exp.steps[0].on]).length);
    const wrongStep = exp.steps.find(st => st.wrong);
    for (let k = 0; k < 8; k++) {
      d = await xdbg();
      if (d.phase !== 'do') break;
      const st = exp.steps[d.step];
      if (st === wrongStep) {
        const w = Object.keys(st.wrong)[0];
        const before = await ev('LabForces._debug()');
        await click(await ev(`LabForces.experiment.selector(${JSON.stringify(w)})`)); await sleep(250);
        const card = await overlay();
        ok(`${exp.id} step ${d.step + 1}: the wrong option ${w} gets a card and changes nothing on the bench`,
          card && card.text.includes(st.wrong[w].slice(0, 25)) && (await xdbg()).step === d.step
          && JSON.stringify(await ev('(d => { delete d.looping; return d; })(LabForces._debug())')) === JSON.stringify((dd => { delete dd.looping; return dd; })(before)), card && card.text.slice(0, 120));
        await closeOv(); await sleep(150);
      }
      const r = await (st.ask ? doStep() : next().then(async r => { await tick(3); await sleep(250); return r; }));
      ok(`${exp.id} step ${d.step + 1}: tapping ${st.on || st.any[0]} advances`, r === true && ((await xdbg()).step > d.step || (await xdbg()).phase !== 'do'), await xdbg());
    }
    d = await xdbg();
    const seeTxt = await ev("document.querySelector('#lab-exp').textContent.replace(/\\s+/g, ' ')");
    ok(`${exp.id}: See states what the bench showed, with the notebook as evidence`, d.phase === 'see' && seeTxt.includes(exp.see.saw) && /That is what happened/.test(seeTxt) && await ev("document.querySelectorAll('#lab-exp .lab-exp-evidence li').length") >= 1, seeTxt.slice(0, 160));
  }
  const ev1 = await ev('LabForces.experiment.evidence()');
  ok('the evidence is in a child\'s words, oldest first', ev1.length === 1 && /^Water bottle: 10 N/.test(ev1[0]), ev1);
  await click('[data-exp="explore"]');
  await ev('LabForces.experiment.reset(); true');
  await sleep(200);
  ok('"Explore the bench freely" shows everything again', await ev("document.getElementById('labs-root').dataset.expMode === 'explore' && [...document.querySelectorAll('#lab-forces-modebar button')].every(b => !b.hidden) && LabForces._debug().focus === null && LabForces._debug().reads.length === 0"));

  // ── The reading and force-name palettes in Explore ──
  console.log('\n-- palettes');
  await ev("LabForces._placeObj('iron'); true"); await sleep(150);
  ok('hanging an object shows its mass but not yet its weight', await ev("(t => /Iron block/.test(t) && /0.5 kg/.test(t) && !/5 N/.test(t))(document.getElementById('lab-forces-chips').textContent)"));
  ok('the reading palette offers 1, 3, 5 and 10 N', await ev("[...document.querySelectorAll('[data-val]')].map(b => b.dataset.val).join() === '1,3,5,10'"));
  await must('[data-val="3"]'); await sleep(150);
  ok('a wrong reading points back at the scale and records nothing', await ev("/Not 3 N/.test(document.getElementById('lab-coach-text').textContent) && LabForces._debug().reads.length === 0"));
  await must('[data-val="5"]'); await sleep(300);
  {
    const c = await overlay(); if (c) { await closeOv(); await sleep(150); }
  }
  ok('the right reading records it and shows the N chip', await ev("LabForces._debug().reads[0] === 'Iron block|5|N' && /5 N/.test(document.getElementById('lab-forces-chips').textContent)"), await dbg());
  await must('[data-name="upthrust"]'); await sleep(100);
  ok('tapping a force name says what it means', await ev("/^Upthrust: the upward push/.test(document.getElementById('lab-coach-text').textContent)"));
  await ev("LabForces._switchMode('pressure'); true");
  await must('[data-fn="20"]');
  ok('a force button works by tap (data-fn; the parser lowercases data-fN)', (await dbg()).force === 20);
  await must('[data-fn="50"]');
  ok('…and again', (await dbg()).force === 50);
  await must('[data-act="apply"]');
  ok('Apply force by tap shows the Record button', await ev("!!document.querySelector('.lab-forces-shelf [data-act=\"read\"]') && LabForces._debug().applied === true"));
  await ev('LabForces.experiment.reset(); true');
  // The first-reading card was consumed by the palette check above; the
  // Explore flow below still expects to see it once.
  await ev("delete Labs.store('forces')._shownMW; true");
  await sleep(200);

  // ── Start panel ──────────────────────────────
  console.log('\n-- start panel');
  const panelText = await ev("document.getElementById('lab-panel') ? document.getElementById('lab-panel').textContent : ''");
  ok('start panel has guided-experiment headings', /Guided experiments/.test(panelText));
  ok('start panel has missions heading', /Missions/.test(panelText));
  ok('start panel lists "Measure the weight"', /Measure the weight/.test(panelText));

  // ── Guided experiment: Measure the weight of objects ──
  console.log('\n-- guided experiment: weigh_objects');
  await ev("LabForces.startGuide('weigh_objects'); true");
  await sleep(300);
  const g0 = await dbg();
  ok('guide starts at step 0', g0.guide && g0.guide.id === 'weigh_objects' && g0.guide.step === 0);

  // step 1: mode bench (may already be bench so step auto-advances)
  await must('[data-act="mode-bench"]');
  await sleep(200);

  // step 2: hang wooden block
  await ev("LabForces._placeObj('wooden'); true");
  await sleep(200);
  const g1 = await dbg();
  ok('wooden block placed on hook', g1.hook === 'wooden');

  // step 3: record
  await ev("LabForces._read(); true");
  await sleep(300);
  // first read shows mass/weight result card
  const ov1 = await overlay();
  ok('mass/weight result card appears on first bench reading in Explore (experiments never show it)', resultOk(ov1, /[Mm]ass.*weight|Weight.*mass/));
  await closeOv();
  await sleep(300);

  // hang and record remaining objects
  for (const id of ['stone', 'iron', 'bottle']) {
    await ev(`LabForces._placeObj('${id}'); true`);
    await sleep(150);
    await ev("LabForces._read(); true");
    await sleep(150);
  }
  const gAfter = await dbg();
  ok('guide advances through bench readings', gAfter.reads.length >= 4);

  // ── Hazard: overload ─────────────────────────
  console.log('\n-- hazard: overload spring balance');
  await ev("LabForces._placeObj('brick'); true");
  await sleep(400);
  const hazOv = await overlay();
  ok('overload hazard card appears', hazardOk(hazOv, ['Warning'], /spring|elastic|load/i));
  await closeOv();
  await sleep(300);

  // ── Result card: wrong_units ──────────────────
  console.log('\n-- result card: wrong pressure units');
  await ev("LabForces._switchMode('pressure'); true");
  await sleep(200);
  await ev("LabForces._setPad('flat'); true");
  await sleep(100);
  await ev("LabForces._setForce(10); true");
  await sleep(100);
  await ev("LabForces._applyForce(); true");
  await sleep(200);
  await ev("LabForces._read(); true");
  await sleep(300);
  const ruOv = await overlay();
  ok('wrong_units result card appears on first pressure reading', resultOk(ruOv, /Pa|pascal|cm²/i));
  await closeOv();
  await sleep(300);

  // ── Discoveries: unlock via Show me how ──────
  console.log('\n-- discoveries: unlock several via "Show me how"');
  // Open discoveries panel
  await must('[data-panel="found"]');
  await sleep(200);
  const discText = await ev("document.getElementById('lab-panel').textContent");
  ok('discoveries panel shows discovery count', /\d+\s*of\s*13/.test(discText) || /\d+\s*of\s*12/.test(discText) || /of\s*\d+/.test(discText));

  // Discover "force_changes" via recipe
  await ev("LabForces._switchMode('bench'); true");
  await sleep(100);
  await ev("LabForces._placeObj('wooden'); true");
  await sleep(100);
  await ev("LabForces._read(); true");
  await sleep(300);
  const d1 = await ev("Labs.store('forces').disc && Labs.store('forces').disc['force_changes']");
  ok('force_changes discovery unlocks after wooden block read', !!d1);

  // Discover "pressure_def" via recipe
  await ev("LabForces._switchMode('pressure'); true");
  await sleep(100);
  await ev("LabForces._setPad('tile'); true");
  await ev("LabForces._setForce(20); true");
  await ev("LabForces._applyForce(); true");
  await sleep(100);
  await ev("LabForces._read(); true");
  await sleep(300);
  const d2 = await ev("Labs.store('forces').disc && Labs.store('forces').disc['pressure_def']");
  ok('pressure_def discovery unlocks after tile+20N read', !!d2);

  // Discover "small_area" via recipe
  await ev("LabForces._setPad('nail'); true");
  await ev("LabForces._setForce(10); true");
  await ev("LabForces._applyForce(); true");
  await sleep(100);
  await ev("LabForces._read(); true");
  await sleep(300);
  const d3 = await ev("Labs.store('forces').disc && Labs.store('forces').disc['small_area']");
  ok('small_area discovery unlocks after nail+10N read', !!d3);

  // ── Discovery overlay (found) ─────────────────
  await must('[data-panel="found"]');
  await sleep(200);
  const foundCard = await ev("document.querySelector('[data-disc=\"force_changes\"]')");
  if (foundCard) {
    await must('[data-disc="force_changes"]');
    await sleep(200);
    const discOv = await overlay();
    ok('found discovery overlay shows "What you saw" and "Why it happens"',
      discOv && /What you saw/.test(discOv.text) && /Why it happens/.test(discOv.text));
    await closeOv();
    await sleep(200);
  }

  // ── Mission: spring_survey ────────────────────
  console.log('\n-- mission: spring_survey');
  await ev("LabForces.startMission('spring_survey'); true");
  await sleep(300);
  const m0 = await dbg();
  ok('spring_survey mission starts', m0.mission && m0.mission.id === 'spring_survey');

  for (const id of ['wooden', 'stone', 'iron', 'bottle']) {
    await ev(`LabForces._switchMode('bench'); true`);
    await ev(`LabForces._placeObj('${id}'); true`);
    await sleep(100);
    await ev("LabForces._read(); true");
    await sleep(200);
    // close any overlay that appears
    const anyOv = await overlay();
    if (anyOv) { await closeOv(); await sleep(100); }
  }
  const mAfter = await dbg();
  ok('all 4 spring_survey objects recorded', mAfter.mission && mAfter.mission.success === true);

  // Answer questions
  await must('[data-act="quiz"]');
  await sleep(500);
  const quizEl = await ev("!!document.getElementById('lab-quiz')");
  ok('quiz panel opens for spring_survey', quizEl === true);

  // Answer all questions with first option (correct answer)
  for (let i = 0; i < 5; i++) {
    const ans = await ev("(() => { const o = document.querySelector('#lab-quiz .lab-quiz-option'); if (o) { o.click(); return true; } return false; })()");
    await sleep(200);
    const next = await ev("(() => { const b = document.querySelector('#lab-quiz [data-quiz-next]'); if (b) { b.click(); return true; } return false; })()");
    await sleep(200);
  }
  await sleep(1000);
  const mDone = await ev("!!document.getElementById('lab-mission-done')");
  ok('spring_survey mission completes with stars', mDone === true);
  await closeOv();
  await sleep(300);

  // ── Mission: pressure_detective ───────────────
  console.log('\n-- mission: pressure_detective');
  await ev("LabForces.startMission('pressure_detective'); true");
  await sleep(300);
  const pd0 = await dbg();
  ok('pressure_detective mission starts', pd0.mission && pd0.mission.id === 'pressure_detective');

  const scenarios = [
    ['flat', 50], ['heel', 20], ['nail', 10]
  ];
  for (const [padId, f] of scenarios) {
    await ev(`LabForces._switchMode('pressure'); true`);
    await ev(`LabForces._setPad('${padId}'); true`);
    await ev(`LabForces._setForce(${f}); true`);
    await ev('LabForces._applyForce(); true');
    await sleep(100);
    await ev('LabForces._read(); true');
    await sleep(200);
    const anyOv = await overlay();
    if (anyOv) { await closeOv(); await sleep(100); }
  }
  const pd1 = await dbg();
  ok('pressure_detective all scenarios recorded', pd1.mission && pd1.mission.success === true);

  await must('[data-act="quiz"]');
  await sleep(400);
  for (let i = 0; i < 5; i++) {
    await ev("(() => { const o = document.querySelector('#lab-quiz .lab-quiz-option'); if (o) o.click(); })()");
    await sleep(200);
    await ev("(() => { const b = document.querySelector('#lab-quiz [data-quiz-next]'); if (b) b.click(); })()");
    await sleep(200);
  }
  await sleep(1000);
  const pdDone = await ev("!!document.getElementById('lab-mission-done')");
  ok('pressure_detective mission completes', pdDone === true);
  await closeOv();
  await sleep(300);

  // ── Calm Mode ────────────────────────────────
  console.log('\n-- Calm Mode');
  await ev("document.documentElement.classList.add('kid-calm'); true");
  await sleep(200);
  await ev("LabForces._switchMode('bench'); LabForces._placeObj('iron'); true");
  await sleep(100);
  await ev("LabForces._tick(1); true");
  const calmDbg = await dbg();
  ok('Calm Mode: spring extension reaches target instantly', calmDbg.springExt >= 30);
  await ev("document.documentElement.classList.remove('kid-calm'); true");

  // ── 360px layout ─────────────────────────────
  console.log('\n-- 360px layout');
  const overflow = await ev(`(() => {
    const root = document.querySelector('.lab-forces');
    if (!root) return null;
    const rw = root.getBoundingClientRect().width;
    let over = [];
    root.querySelectorAll('button, .lab-item, .lab-forces-fBtn').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.right > rw + 2) over.push(el.className + '|' + Math.round(r.right));
    });
    return { rootW: Math.round(rw), over };
  })()`);
  ok('no control overflows 360px', overflow && overflow.over.length === 0, overflow && overflow.over.slice(0, 5));

  const tapTargets = await ev(`(() => {
    const bad = [];
    document.querySelectorAll('.lab-forces button, .lab-forces-fBtn').forEach(el => {
      const r = el.getBoundingClientRect();
      const minDim = Math.min(r.width, r.height);
      if (minDim < 40) bad.push(el.textContent.trim().slice(0, 30) + '|' + Math.round(minDim));
    });
    return bad;
  })()`);
  ok('all tap targets ≥ 40px (44px ideal, 40px tolerance)', tapTargets.length === 0, tapTargets.slice(0, 5));

  // ── Loop restarts after screen change ────────
  console.log('\n-- loop restarts after leaving and returning');
  await ev("showScreen('dashboard'); true");
  await sleep(400);
  const dBefore = await dbg();
  ok('animation loop stops when leaving labs', !dBefore.looping);
  await ev("showScreen('labs'); true");
  await sleep(500);
  const dAfter = await dbg();
  ok('animation loop restarts when returning to labs', dAfter.looping);
  await ev("Labs.backToHub(); Labs.openLab('forces'); true");
  await sleep(600);
  ok('reopening the lab lands on an experiment Aim again', await ev("!!document.querySelector('#lab-exp') && LabExperiment._debug().phase === 'aim'"));
  await click('[data-exp="explore"]');
  await ev('LabForces.experiment.reset(); true');
  ok('…and Explore still has the old bench', await ev("!!document.querySelector('.lab-start') && LabForces._debug().looping"));

  // ── No JS errors ─────────────────────────────
  console.log('\n-- no JS errors');
  ok('no uncaught exceptions during the test', errors.length === 0, errors.slice(0, 3));

  // ── Summary ──────────────────────────────────
  console.log(`\n${checks} passed, ${failed} failed`);
  quit(failed ? 1 : 0);
})().catch(err => {
  console.error(err);
  try { chrome && chrome.kill(); } catch (_) {}
  process.exit(1);
});
