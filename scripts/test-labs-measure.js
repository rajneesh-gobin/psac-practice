'use strict';
// Science Labs › Measurement Lab, driven in a real browser.
//
// Proves the lab end to end at 360px: it loads only its own files, the
// welcome and the start panel say what to do, a guided experiment runs from
// the first tap to "Experiment complete", every instrument draws at every zoom
// for everything it can measure, every result card and the hazard card fire
// from the mistake they explain, all three missions finish and score, EVERY
// discovery unlocks by following its own "Show me how", Calm Mode applies
// effects at once, nothing sticks out past a phone screen, and no page errors.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-measure.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
// ⚠ Port 9423 is this lab's for the Grade 7/8 build (the other lab builds use
//   their own ports). DBG_PORT overrides it.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = Number(process.env.DBG_PORT) || 9423;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail).slice(0, 900) : '')); } };

(async () => {
  const profile = fs.mkdtempSync(path.join(process.env.LAB_SCRATCH || os.tmpdir(), 'psac-lab-measure-'));
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG, '--user-data-dir=' + profile,
    '--allow-file-access-from-files', '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  const quit = code => {
    try { chrome.kill(); } catch (_) {}
    setTimeout(() => { try { fs.rmSync(profile, { recursive: true, force: true }); } catch (_) {} process.exit(code); }, 600);
  };
  let version; for (let i = 0; i < 40 && !version; i++) { try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); } }
  if (!version) throw new Error('Chrome did not start');
  const ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let serial = 0; const waiting = new Map(); const errors = [];
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.method === 'Runtime.exceptionThrown') errors.push((m.params.exceptionDetails.exception || {}).description || m.params.exceptionDetails.text);
    if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); }
  };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const id = ++serial, t = setTimeout(() => { waiting.delete(id); rej(Error('Timeout ' + method)); }, 30000);
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
    if (r.exceptionDetails) throw new Error(String(r.exceptionDetails.exception && r.exceptionDetails.exception.description || r.exceptionDetails.text).slice(0, 500));
    return r.result.value;
  };
  const click = sel => ev(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); if (!el) return 'missing: ' + ${JSON.stringify(sel)}; el.click(); return true; })()`);
  const dbg = () => ev('LabMeasure._debug()');
  const overlay = () => ev(`(() => { const o = document.getElementById('lab-overlay'); if (!o) return null;
    return { cls: o.className, text: o.textContent.replace(/\\s+/g, ' ').slice(0, 3000),
             signs: [...o.querySelectorAll('.lab-sign figcaption')].map(f => f.textContent) }; })()`);
  const closeOv = () => click('#lab-overlay [data-ov-close]');
  const coach = () => ev("document.getElementById('lab-coach-text').textContent");
  // Type a reading the way a pupil does - into the box - and tap Check.
  const type = v => ev(`(() => { const i = document.getElementById('lab-measure-input'); i.value = ${JSON.stringify(String(v))};
    document.querySelector('[data-act="check"]').click(); return i.className; })()`);
  const want = (inst, spec, o) => ev(`LabMeasureData.measure(${JSON.stringify(inst)}, ${JSON.stringify(spec)}, ${JSON.stringify(o || {})}).want`);
  const pick = async (inst, spec) => { await ev(`LabMeasure.selectInstrument('${inst}'); true`); if (spec) await ev(`LabMeasure.selectSpecimen('${spec}'); true`); };
  const fit = () => ev(`(() => { const vw = innerWidth;
    const off = [...document.querySelectorAll('#labs-root button, #labs-root canvas, #labs-root input, #labs-root select')]
      .filter(e => e.offsetParent !== null && e.getBoundingClientRect().right > vw + 0.5)
      .map(e => (e.getAttribute('data-panel') || e.getAttribute('data-act') || e.getAttribute('data-inst') || e.getAttribute('data-spec') || e.getAttribute('data-choose') || e.id || e.tagName) + ' → ' + Math.round(e.getBoundingClientRect().right));
    return { vw, root: document.getElementById('labs-root').scrollWidth, doc: document.documentElement.scrollWidth, off }; })()`);
  const fits = f => f.root <= f.vw && f.doc <= f.vw && f.off.length === 0;

  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof openLabs === 'function' && typeof RoleModules !== 'undefined'"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url + ', not the file we navigated to.'); quit(1); return; }
  ok('app loaded', ready === true);
  await sleep(2000);

  // ── Opening the lab ─────────────────────────────
  console.log('\n-- opening the Measurement Lab');
  await ev('SELECTED_GRADE = 9; openLabs(); true');
  let hub = false;
  for (let i = 0; i < 40 && !hub; i++) { await sleep(250); hub = await ev("!!document.querySelector('#labs-root .lab-hub')"); }
  ok('Grade 9: the Labs hub opens', hub);
  await ev("Labs.openLab('measure'); true");
  let up = false;
  for (let i = 0; i < 60 && !up; i++) { await sleep(200); up = await ev("typeof window.LabMeasure !== 'undefined' && !!document.querySelector('#labs-root .lab-measure')"); }
  ok('Labs.openLab("measure") loads LabMeasure and renders the bench', up);
  const labScripts = await ev("[...document.scripts].map(s => s.src).filter(s => /engine\\/labs\\//.test(s)).map(s => s.split('/').pop()).join()");
  ok('it fetches its own two files, data first, after the shell', /lab_core\.js/.test(labScripts) && /lab_measure_data\.js,lab_measure\.js/.test(labScripts), labScripts);
  await sleep(500);
  ok('lab_measure.css is linked and styles the reading box',
     await ev("!!document.querySelector('link[data-lab-css=\"measure\"]') && getComputedStyle(document.getElementById('lab-measure-read')).borderRadius === '14px'"));
  let ov = await overlay();
  ok('first visit shows the welcome card with “Show me how”', ov && /Welcome to the Measurement Lab/.test(ov.text) && /Show me how/.test(ov.text), ov);
  await closeOv();
  ok('the welcome is remembered', await ev("Labs.store('measure').intro === true"));
  ok('the start panel: “What would you like to do?”, the three steps, ≥3 guided experiments and ≥2 missions',
     await ev(`(() => { const s = document.querySelector('.lab-start'); return !!s && /What would you like to do/.test(s.textContent)
       && s.querySelectorAll('.lab-how li').length === 3 && s.querySelectorAll('[data-guide]').length >= 3 && s.querySelectorAll('[data-mission]').length >= 2; })()`));
  ok('Grade 9 shows none of the Grade 4 set: no g4_ guide or mission, no Grade 4 tool, no unit picker, no 🔊',
     await ev(`!document.querySelector('.lab-start [data-guide^="g4_"], .lab-start [data-mission^="g4_"], #lab-panel [data-inst="ruler30"], #lab-panel [data-inst="jug"]')
       && !document.getElementById('lab-measure-uselect') && !document.querySelector('[data-act="say-coach"]')`));
  ok('top bar: back, eyebrow “Physics · Grade 9”, title and help',
     await ev("!!document.querySelector('.lab-measure [data-act=\"hub\"]') && /Physics · Grade 9/.test(document.querySelector('.lab-measure .lab-eyebrow').textContent) && !!document.querySelector('.lab-measure [data-act=\"help\"]')"));
  ok('tabs Bench / Missions / Discoveries and the lab assistant with 💡', await ev("document.querySelectorAll('.lab-measure .lab-tabs [role=tab]').length === 3 && !!document.querySelector('.lab-measure .lab-coach-tip')"));
  let f0 = await fit();
  ok('the landing fits a 360px phone', fits(f0), f0);

  // ── A guided experiment, end to end ─────────────
  console.log('\n-- guided experiment: Read a vernier caliper');
  await ev('LabMeasure._test({ instant: true }); true');
  await click('.lab-start [data-guide="vernier"]');
  const gs = () => ev(`({ box: !document.getElementById('lab-guide').hidden, text: document.getElementById('lab-guide').textContent.replace(/\\s+/g, ' '),
    next: (() => { const n = document.querySelector('.lab-measure .is-next'); return n ? (n.getAttribute('data-inst') || n.getAttribute('data-spec') || n.getAttribute('data-act')) : null; })(),
    start: !!document.querySelector('.lab-start') })`);
  let g = await gs();
  ok('step 1 of 5 asks for the vernier caliper, and that shelf item glows', g.box && /Step 1 of 5/.test(g.text) && g.next === 'vernier' && !g.start, g);
  await click('[data-guide-do]');
  g = await gs();
  ok('step 2: the coin glows', /Step 2 of 5/.test(g.text) && g.next === 'coin', g);
  await click('[data-spec="coin"]');
  g = await gs();
  ok('tapping the coin on the shelf (not the yellow button) also moves the guide on: zoom glows', /Step 3 of 5/.test(g.text) && g.next === 'zin', g);
  await click('[data-guide-do]'); await click('[data-guide-do]');
  g = await gs();
  ok('zoomed to 3×, the Check button glows', (await dbg()).zoom === 3 && /Step 5 of 5/.test(g.text) && g.next === 'check', g);
  ok('the canvas has drawn the scales', await ev("(() => { const c = document.getElementById('lab-canvas'); const p = c.getContext('2d').getImageData(c.width / 2, c.height * 0.3, 1, 1).data; return p[3] > 0; })()"));
  let cls = await type('2.36');
  ok('a reading one vernier division out: marked wrong, and the assistant says look again at the vernier line', /is-wrong/.test(cls) && /vernier line/.test(await coach()), await coach());
  cls = await type('2.37');
  ov = await overlay();
  ok('the right reading, 2.37 cm, completes it with “What you found out”', /is-right/.test(cls) && ov && /Experiment complete/.test(ov.text) && /What you found out/.test(ov.text) && /main scale|Main scale/.test(ov.text), ov);
  ok('…the guide is remembered and the next one is offered', await ev("!!Labs.store('measure').guides.vernier") && /Next:/.test(ov.text));
  await closeOv();
  const nb = await ev("document.getElementById('lab-notebook').textContent.replace(/\\s+/g, ' ')");
  ok('the notebook records it with its unit, its conversions and the instrument’s precision',
     /the diameter of a coin/.test(nb) && /2\.37 cm/.test(nb) && /= 23\.7 mm = 0\.0237 m/.test(nb) && /0\.01 cm \(0\.1 mm\)/.test(nb), nb.slice(0, 400));
  ok('the discovery “Reading a vernier” is collected and the ✨ counter matches what is saved',
     await ev(`(() => { const all = LabMeasureData.forGrade(LabMeasureData.DISCOVERIES, 9), disc = Labs.store('measure').disc;
       return !!disc.vernier_read && document.getElementById('lab-found-n').textContent === all.filter(d => disc[d.id]).length + '/' + all.length; })()`));
  ok('back on the Bench tab, the start panel shows it done', await ev("/✓ done/.test(document.querySelector('.lab-start').textContent)"));

  // ── Every instrument draws at every zoom ────────
  console.log('\n-- drawing');
  const drawn = await ev(`(() => { const out = []; const D = LabMeasureData;
    for (const i of Object.keys(D.INSTRUMENTS).filter(k => !D.INSTRUMENTS[k].grades)) for (const s of [null, ...D.specimensFor(i)]) {
      if (s && D.measure(i, s, {}).why === 'burst') continue;
      for (const al of (i === 'rule' ? ['end', 'mark'] : ['end'])) {
        LabMeasure.selectInstrument(i); if (i === 'rule') LabMeasure.setAlign(al); if (s) LabMeasure.selectSpecimen(s);
        for (let z = 1; z <= 3; z++) { LabMeasure._tick(0.05); out.push(i + '/' + s + '/' + z); LabMeasure.zoomIn(); }
      } }
    return out.length; })()`);
  ok(`every instrument, with everything it can measure, draws at zoom 1-3 without an error (${drawn} views)`, drawn > 150 && errors.length === 0, errors.slice(0, 3));
  // LAB_SHOTS=<dir> saves the canvas for a set of views, to LOOK at the scales:
  // a test can prove a reading is judged right, not that the drawing is readable.
  if (process.env.LAB_SHOTS) {
    const dir = process.env.LAB_SHOTS;
    fs.mkdirSync(dir, { recursive: true });
    const shots = {
      vernier_coin_z3: "LabMeasure.selectInstrument('vernier'); LabMeasure.selectSpecimen('coin'); LabMeasure.zoomIn(); LabMeasure.zoomIn()",
      vernier_coin_z1: "LabMeasure.selectInstrument('vernier'); LabMeasure.selectSpecimen('coin')",
      vernierA_closed_z3: "LabMeasure.selectInstrument('vernier_old'); LabMeasure.selectSpecimen('closed'); LabMeasure.zoomIn(); LabMeasure.zoomIn()",
      vernierB_closed_z3: "LabMeasure.selectInstrument('vernier_bent'); LabMeasure.selectSpecimen('closed'); LabMeasure.zoomIn(); LabMeasure.zoomIn()",
      micrometer_wire_z3: "LabMeasure.selectInstrument('micrometer'); LabMeasure.selectSpecimen('wire'); LabMeasure.zoomIn(); LabMeasure.zoomIn()",
      micrometer_coin_z2: "LabMeasure.selectInstrument('micrometer'); LabMeasure.selectSpecimen('coin'); LabMeasure.zoomIn()",
      cylinder_above_z2: "LabMeasure.selectInstrument('cylinder'); LabMeasure.selectSpecimen('water'); LabMeasure.zoomIn(); LabMeasure.setEye('above')",
      cylinder_water_z3: "LabMeasure.selectInstrument('cylinder'); LabMeasure.selectSpecimen('water'); LabMeasure.zoomIn(); LabMeasure.zoomIn()",
      cylinder_stone_z1: "LabMeasure.selectInstrument('cylinder'); LabMeasure.selectSpecimen('stone')",
      rule_pencil_end_z1: "LabMeasure.selectInstrument('rule'); LabMeasure.setAlign('end'); LabMeasure.selectSpecimen('pencil')",
      rule_pencil_mark_z3: "LabMeasure.selectInstrument('rule'); LabMeasure.setAlign('mark'); LabMeasure.selectSpecimen('pencil'); LabMeasure.zoomIn(); LabMeasure.zoomIn()",
      thermo_hot_z2: "LabMeasure.selectInstrument('thermometer'); LabMeasure.selectSpecimen('hot'); LabMeasure.zoomIn()",
      thermo_ice_z1: "LabMeasure.selectInstrument('thermometer'); LabMeasure.selectSpecimen('ice')",
      clinical_body_z3: "LabMeasure.selectInstrument('clinical'); LabMeasure.selectSpecimen('body'); LabMeasure.zoomIn(); LabMeasure.zoomIn()",
      stopwatch_kettle: "LabMeasure.selectInstrument('stopwatch'); LabMeasure.selectSpecimen('kettle'); LabMeasure.startTiming()",
      balance_stone: "LabMeasure.selectInstrument('balance'); LabMeasure.selectSpecimen('stone')",
    };
    for (const [name, setup] of Object.entries(shots)) {
      await ev(`(() => { ${setup}; LabMeasure._tick(0.05); return true; })()`);
      const png = await ev("document.getElementById('lab-canvas').toDataURL('image/png')");
      fs.writeFileSync(path.join(dir, name + '.png'), Buffer.from(png.split(',')[1], 'base64'));
    }
    console.log('     saved ' + Object.keys(shots).length + ' canvas views to ' + dir);
  }
  ok('Calm-free stopwatch: a pendulum is timed and stops by itself', await (async () => {
    await ev('LabMeasure._test({ instant: false }); true');
    await pick('stopwatch', 'pendulum');
    await click('[data-act="ctx"]');
    await sleep(1200);
    const mid = await dbg();
    await ev('LabMeasure._tick(10); true');
    const end = await dbg();
    await ev('LabMeasure._test({ instant: true }); true');
    return mid.clock.run && mid.clock.t > 0.5 && mid.clock.t < 16 && !mid.timed && end.timed && end.clock.t === 16;
  })());
  cls = await type('16');
  ok('…and reads 16 s on the dial (10 swings; the notebook says 1.6 s a swing)', /is-right/.test(cls) && /1\.6 s/.test(await coach()));

  // ── Mistakes that teach ─────────────────────────
  console.log('\n-- result cards and the hazard');
  const cardOk = o => o && /is-result/.test(o.cls) && /What happened/.test(o.text) && /What you should have done/.test(o.text) && /On the NCE paper/.test(o.text);
  await pick('cylinder', 'water');
  await click('[data-act="eye"]');
  ok('the eye button moves the eye above the level, and the canvas says so', (await dbg()).eye === 'above' && /Eye above/.test(await ev("document.getElementById('lab-status').textContent")));
  await type('66');
  ov = await overlay();
  ok('eye above, reading 66 cm³: PARALLAX card - too high, eye level, the paper reference', cardOk(ov) && /Parallax error/.test(ov.text) && /too HIGH/.test(ov.text) && /2021 Q3\(b\)\(i\)/.test(ov.text), ov);
  ok('…and the scale shows where you read and the true level', (await dbg()).marks.join() === 'you read,true level');
  await closeOv();
  await ev("LabMeasure.setEye('level'); true");
  await type('65');
  ov = await overlay();
  ok('eye level, reading 65 cm³: TOP OF THE MENISCUS card', cardOk(ov) && /top of the meniscus/.test(ov.text) && /BOTTOM/.test(ov.text), ov);
  await closeOv();
  await pick('vernier_old', 'rod');
  await type('1.25');
  ov = await overlay();
  ok('old caliper A, rod read straight off as 1.25 cm: ZERO ERROR card with the worked correction to 1.22 cm',
     cardOk(ov) && /Zero error/.test(ov.text) && /1\.25 cm − \(\+0\.03 cm\) = 1\.22 cm/.test(ov.text), ov);
  await closeOv();
  await type('1.28');
  ok('adding the zero error instead is caught by the assistant', /ADDED the zero error/.test(await coach()));
  await pick('rule', 'pencil');
  await ev("LabMeasure.setAlign('end'); true");
  await type('16.5');
  ov = await overlay();
  ok('pencil against the worn end, 16.5 cm: END ERROR card', cardOk(ov) && /End error/.test(ov.text) && /1\.0 cm mark/.test(ov.text), ov);
  await closeOv();
  ok('…after which the pencil starts at the 1 cm mark', (await dbg()).align === 'mark');
  await type('17.3');
  ok('reading the far end without subtracting the 1 cm start is caught', /Subtract 1\.0 cm/.test(await coach()));
  await pick('rule', 'wire');
  await type('0.1');
  ov = await overlay();
  ok('a thin wire on the metre rule: right reading, NOT PRECISE ENOUGH card naming the micrometer', cardOk(ov) && /wrong instrument/.test(ov.text) && /micrometer/.test(ov.text), ov);
  await closeOv();
  await pick('clinical', 'boiling');
  ov = await overlay();
  ok('clinical thermometer into boiling water: HAZARD card with a real TOXIC sign',
     ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Toxic') && /burst/.test(ov.text), ov);
  ok('…which says what happened, why it is dangerous, what to do instead and the exam point',
     ov && /What happened/.test(ov.text) && /Why it’s dangerous/.test(ov.text) && /Do this instead/.test(ov.text) && /On the NCE paper/.test(ov.text) && /mercury/.test(ov.text));
  await closeOv();
  ok('…and the thermometer is taken out (nothing selected to read)', (await dbg()).spec === null);
  ok('the pencil will not fit in the vernier - it says so and picks nothing', await (async () => { await pick('vernier', 'pencil'); return (await dbg()).spec === null && /too big/.test(await coach()); })());
  await pick('vernier_bent', 'closed');
  await ev("document.getElementById('lab-measure-input').value = '0.02'; true");
  await click('[data-act="neg"]');
  cls = await type(await ev("document.getElementById('lab-measure-input').value"));
  ok('old caliper B closed: the ± button makes “−0.02”, a negative zero error, accepted', /is-right/.test(cls) && (await dbg()).log[0].includes('−0.02'), (await dbg()).log[0]);

  // ── Discoveries tab: found and locked cards ─────
  console.log('\n-- discoveries tab');
  await click('[data-panel="found"]');
  ok('the Discoveries tab lists all of them, found ones and clues', await ev("document.querySelectorAll('.lab-found-card').length === LabMeasureData.forGrade(LabMeasureData.DISCOVERIES, 9).length && document.querySelectorAll('.lab-found-card.is-found').length >= 5 && /Clue:/.test(document.querySelector('.lab-found').textContent)"));
  await click('.lab-found-card.is-found[data-disc="vernier_read"]');
  ov = await overlay();
  ok('a found card: what you saw, the rule, why it happens, “Do it again”', ov && /What you saw/.test(ov.text) && /main scale \+ \(vernier division × 0\.01 cm\)/.test(ov.text) && /Why it happens/.test(ov.text) && /Do it again/.test(ov.text), ov);
  await closeOv();
  const locked = await ev("(document.querySelector('.lab-found-card:not(.is-found)') || {}).dataset?.disc || null");
  if (locked) {
    await click(`.lab-found-card[data-disc="${locked}"]`);
    ov = await overlay();
    ok('a locked card: the clue, how to find it, “Show me how”', ov && /Clue:/.test(ov.text) && /How to find it/.test(ov.text) && /Show me how/.test(ov.text), ov);
    await closeOv();
  }

  // ── Missions ────────────────────────────────────
  console.log('\n-- missions');
  // A mission by index (Grade 9, as before) or by id; an option is text or a
  // picture { label, svg }, whose label is the button's last span.
  const answerAll = which => ev(`(() => {
    const w = ${JSON.stringify(which)};
    const M = typeof w === 'number' ? LabMeasureData.MISSIONS[w] : LabMeasureData.MISSIONS.find(m => m.id === w);
    const label = o => (o && typeof o === 'object' ? o.label : o);
    const qs = M.quiz;
    for (let i = 0; i < qs.length; i++) {
      const card = document.querySelector('#lab-overlay .lab-ov-card');
      const q = card.querySelector('.lab-quiz-q').textContent;
      const def = qs.find(x => x.q === q);
      const btn = [...card.querySelectorAll('.lab-quiz-opt')].find(b => b.lastElementChild.textContent === label(def.options[0]));
      btn.click();
      card.querySelector('[data-next]').click();
    }
    const done = document.querySelector('#lab-overlay .lab-done .lab-stars');
    return done ? done.getAttribute('aria-label') : 'no result card';
  })()`);
  await ev("LabMeasure.startMission('vernier'); true");
  ok('Read the vernier: the Missions tab shows the three jobs and the shelf', await ev("document.querySelectorAll('#lab-mission .lab-steps li').length === 4 && !!document.querySelector('#lab-panel [data-inst=\"vernier\"]')"));
  for (const s of ['coin', 'marble', 'rod']) {
    await click(`[data-spec="${s}"]`);
    await type(String(await want('vernier', s)));
  }
  let d = await dbg();
  ok('…coin, marble and rod read to 0.01 cm: mission success', d.mission && d.mission.success && d.mission.done.length === 3, d.mission);
  await click('[data-act="quiz"]');
  ok('…the quiz (main scale M / vernier V, combining, least count) ends with 3 stars', (await answerAll(0)) === '3 of 3 stars');
  ok('…and the stars are saved', await ev("Labs.store('measure').missions.vernier.stars === 3"));
  await closeOv();

  await ev("LabMeasure.startMission('errors'); true");
  await pick('vernier_old', 'closed'); await type('0.03');
  await ev("LabMeasure.selectSpecimen('rod'); true"); await type(String(await want('vernier_old', 'rod')));
  await pick('cylinder', 'water'); await type('64');
  await pick('balance', 'stone'); await type('38.6');
  d = await dbg();
  ok('Beat the errors: zero error found and corrected, cylinder at eye level, balance corrected by hand', d.mission.success && d.mission.done.length === 4 && d.mission.cards === 0, d.mission);
  await click('[data-act="quiz"]');
  ok('…3 stars', (await answerAll(1)) === '3 of 3 stars');
  await closeOv();

  await ev("LabMeasure.startMission('choose'); true");
  ok('Right tool for the job: the first job and the instruments to pick from', await ev("/copper wire/.test(document.querySelector('.lab-measure-job').textContent) && document.querySelectorAll('[data-choose]').length === 8"));
  await click('[data-choose="rule"]');
  ov = await overlay();
  ok('picking the metre rule for a wire: WRONG TOOL card naming the micrometer', cardOk(ov) && /Not the metre rule/.test(ov.text) && /micrometer/i.test(ov.text), ov);
  await closeOv();
  for (const best of await ev('LabMeasureData.CHOICES.map(c => c.best)')) await click(`[data-choose="${best}"]`);
  d = await dbg();
  ok('…then the best instrument for all six jobs', d.mission.success && d.mission.i === 6, d.mission);
  f0 = await fit();
  ok('the mission panel fits a 360px phone', fits(f0), f0);
  await click('[data-act="quiz"]');
  ok('…one wrong pick costs a star: 2 stars', (await answerAll(2)) === '2 of 3 stars');
  await closeOv();

  // ── Calm Mode ───────────────────────────────────
  console.log('\n-- calm mode');
  await ev("LabMeasure._test({ instant: false }); document.documentElement.classList.add('kid-calm'); true");
  await click('[data-panel="sandbox"]');
  await pick('stopwatch', 'kettle');
  await click('[data-act="ctx"]');
  d = await dbg();
  ok('in Calm Mode the stopwatch stops at once on the true time (200 s)', d.timed && d.clock.t === 200 && !d.clock.run, d.clock);
  await type('200');
  ok('…3 min 20 s is read as 200 s', (await dbg()).rows[0].includes('200 s'));
  await pick('cylinder', 'water');
  await ev("LabMeasure.setEye('below'); true");
  await type('62');
  ov = await overlay();
  ok('…and a mistake card appears straight away, with no animation', ov && /too LOW/.test(ov.text), ov);
  await closeOv();
  await ev("document.documentElement.classList.remove('kid-calm'); LabMeasure._test({ instant: true }); true");

  // ── Every discovery by its own "Show me how" ────
  console.log('\n-- every discovery');
  const ids = await ev('LabMeasureData.forGrade(LabMeasureData.DISCOVERIES, 9).map(d => d.id)');
  const unsolved = [];
  // Follows a discovery's own "Show me how", closing any result card on the way.
  const solve = id => ev(`(() => {
      const st = Labs.store('measure'); delete st.disc['${id}'];
      document.getElementById('lab-overlay')?.remove();
      LabMeasure.discoveryGuide('${id}');
      for (let k = 0; k < 24 && LabMeasure._debug().guide; k++) {
        const hz = document.querySelector('#lab-overlay.is-hazard');
        if (hz) return 'hazard: ' + hz.textContent.replace(/\\s+/g, ' ').slice(0, 90);
        const rc = document.querySelector('#lab-overlay.is-result [data-ov-close]');
        if (rc) { rc.click(); continue; }
        const btn = document.querySelector('#lab-guide [data-guide-do]');
        if (btn) btn.click(); else LabMeasure._tick(20);
      }
      if (LabMeasure._debug().guide) return 'guide never finished at step ' + LabMeasure._debug().guide.step + ': ' + document.getElementById('lab-guide').textContent.replace(/\\s+/g, ' ').slice(0, 120);
      document.getElementById('lab-overlay')?.remove();
      return !!st.disc['${id}'];
    })()`);
  for (const id of ids) {
    const res = await ev(`(() => {
      const st = Labs.store('measure'); delete st.disc['${id}'];
      document.getElementById('lab-overlay')?.remove();
      LabMeasure.discoveryGuide('${id}');
      for (let k = 0; k < 24 && LabMeasure._debug().guide; k++) {
        const hz = document.querySelector('#lab-overlay.is-hazard');
        if (hz) return 'hazard: ' + hz.textContent.replace(/\\s+/g, ' ').slice(0, 90);
        const rc = document.querySelector('#lab-overlay.is-result [data-ov-close]');
        if (rc) { rc.click(); continue; }
        const btn = document.querySelector('#lab-guide [data-guide-do]');
        if (btn) btn.click(); else LabMeasure._tick(20);
      }
      if (LabMeasure._debug().guide) return 'guide never finished at step ' + LabMeasure._debug().guide.step + ': ' + document.getElementById('lab-guide').textContent.replace(/\\s+/g, ' ').slice(0, 120);
      document.getElementById('lab-overlay')?.remove();
      return !!st.disc['${id}'];
    })()`);
    if (res !== true) unsolved.push(id + ' → ' + res);
  }
  ok(`all ${ids.length} discoveries unlock by following their own “Show me how”`, unsolved.length === 0, unsolved);
  ok('the ✨ counter reads all of them', await ev("(n => document.getElementById('lab-found-n').textContent === n + '/' + n)(LabMeasureData.forGrade(LabMeasureData.DISCOVERIES, 9).length)"));

  // ── Phone fit with everything open ──────────────
  console.log('\n-- phone');
  await click('[data-panel="sandbox"]');
  await pick('micrometer', 'coin');
  await ev("LabMeasure.zoomIn(); LabMeasure.zoomIn(); true");
  f0 = await fit();
  ok('the bench with a shelf, specimens, the reading box and a notebook fits 360px (no control past the edge)', fits(f0), f0);
  const tap = await ev(`[...document.querySelectorAll('#labs-root .lab-measure button')].filter(b => b.offsetParent !== null && !b.classList.contains('lab-link'))
    .filter(b => { const r = b.getBoundingClientRect(); return r.height < 40 || r.width < 40; }).map(b => (b.dataset.act || b.dataset.panel || b.textContent.trim()).slice(0, 30))`);
  ok('every button is a comfortable tap target (≥ 40px)', tap.length === 0, tap);
  await click('[data-act="help"]');
  ov = await overlay();
  ok('help explains every instrument, the SI units and both errors', ov && /SI units/.test(ov.text) && /kelvin \(K\)/.test(ov.text) && /Parallax error/.test(ov.text) && /Zero \(end\) error/.test(ov.text), ov && ov.text.slice(0, 200));
  await closeOv();

  // ════════ Grade 4 (PSAC) ════════
  // ⚠ Until the lead adds 4 to the measure row of Labs.LABS, Labs.grade() is 9
  //   for this lab whatever the pupil's grade, so atGrade() stands in for it
  //   and says so. Once 4 is registered it takes the real path, no edit here.
  console.log('\n-- Grade 4: opening');
  // speechSynthesis is stubbed so the test can see every speak() and cancel().
  await ev(`(() => { window.__speech = { spoken: [], cancels: 0 };
    const stub = { speaking: false, pending: false, getVoices: () => [],
      speak(u) { window.__speech.spoken.push({ text: u.text, lang: u.lang }); }, cancel() { window.__speech.cancels++; } };
    Object.defineProperty(window, 'speechSynthesis', { value: stub, configurable: true }); return true; })()`);
  const speech = () => ev('({ spoken: window.__speech.spoken.slice(), cancels: window.__speech.cancels })');
  async function atGrade(n) {
    await ev(`SELECTED_GRADE = ${n}; showScreen('labs'); true`);
    for (let i = 0, on = false; i < 40 && !on; i++) { await sleep(250); on = await ev("typeof window.Labs !== 'undefined' && !!document.getElementById('labs-root')"); }
    const registered = await ev(`(() => { window.__labsGrade = window.__labsGrade || Labs.grade; Labs.grade = window.__labsGrade;
      Labs.backToHub(); return Labs.labsFor(${n}).some(l => l.id === 'measure'); })()`);
    if (!registered) {
      console.log(`NOTE Grade ${n} is not on the measure row of Labs.LABS yet - Labs.grade() is overridden to ${n} for this run.`);
      await ev(`Labs.grade = () => ${n}; true`);
    }
    await ev("Labs.openLab('measure'); true");
    let on = false;
    for (let i = 0; i < 60 && !on; i++) { await sleep(200); on = await ev("!!document.querySelector('#labs-root .lab-measure')"); }
    await sleep(300);
    return { up: on, registered };
  }
  const type4 = (v, u) => ev(`(() => { const i = document.getElementById('lab-measure-input'), s = document.getElementById('lab-measure-uselect');
    i.value = ${JSON.stringify(String(v))}; s.value = ${JSON.stringify(u)}; document.querySelector('[data-act="check"]').click(); return i.className; })()`);

  const at4 = await atGrade(4);
  ok('Grade 4: the Measurement Lab opens', at4.up);
  ok('Labs.grade() is 4, and the eyebrow says “Science · Grade 4”',
     await ev("Labs.grade() === 4 && LabMeasure._debug().grade === 4 && document.querySelector('.lab-measure .lab-eyebrow').textContent.trim() === 'Science · Grade 4'"));
  const examHead = at4.registered ? /In the PSAC exam/ : /In the PSAC exam|On the NCE paper/;
  if (!at4.registered) console.log('NOTE the cards’ exam heading comes from the grade the shell opened the lab at, so “In the PSAC exam” is asserted only once Grade 4 is registered.');
  const cardOk4 = o => o && /is-result/.test(o.cls) && /What happened/.test(o.text) && /What you should have done/.test(o.text) && examHead.test(o.text);
  ov = await overlay();
  ok('first visit at Grade 4: its own short welcome (pick cm, ml, °C, g or s) and “Show me how”',
     ov && /Welcome to the Measurement Lab/.test(ov.text) && /pick cm, ml, °C, g or s/.test(ov.text) && /Show me how/.test(ov.text) && !/vernier/i.test(ov.text), ov);
  await closeOv();
  ok('…remembered as intro4, apart from the Grade 9 welcome', await ev("Labs.store('measure').intro4 === true && Labs.store('measure').intro === true"));
  const exp4 = await ev(`(() => { const D = LabMeasureData; return { g: D.forGrade(D.GUIDES, 4).map(x => x.id), m: D.forGrade(D.MISSIONS, 4).map(x => x.id), d: D.forGrade(D.DISCOVERIES, 4).map(x => x.id) }; })()`);
  const s4 = await ev(`({ guides: [...document.querySelectorAll('.lab-start [data-guide]')].map(b => b.dataset.guide), missions: [...document.querySelectorAll('.lab-start [data-mission]')].map(b => b.dataset.mission),
    insts: [...document.querySelectorAll('#lab-panel [data-inst]')].map(b => b.dataset.inst), seg: !!document.querySelector('#lab-panel .lab-seg'), found: document.getElementById('lab-found-n').textContent })`);
  ok(`the start panel shows only the Grade 4 guides (${exp4.g.length}) and missions (${exp4.m.length})`,
     s4.guides.join() === exp4.g.join() && s4.missions.join() === exp4.m.join() && exp4.g.length >= 3 && exp4.m.length >= 2, s4);
  ok('the shelf holds the six Grade 4 tools - no vernier, no micrometer, no Length/Other split', s4.insts.join() === 'ruler30,tape,jug,thermo4,scale4,watch4' && !s4.seg, s4);
  ok(`the ✨ counter counts Grade 4 discoveries only (0/${exp4.d.length}) - not the ${ids.length} found at Grade 9`, s4.found === `0/${exp4.d.length}`, s4.found);
  await click('[data-panel="missions"]');
  ok('the Missions tab lists the Grade 4 missions only', await ev(`[...document.querySelectorAll('#lab-panel [data-mission]')].map(b => b.dataset.mission).join() === ${JSON.stringify(exp4.m.join())}`));
  await click('[data-panel="found"]');
  ok('the Discoveries tab lists the Grade 4 discoveries only', await ev(`[...document.querySelectorAll('.lab-found-card')].map(b => b.dataset.disc).join() === ${JSON.stringify(exp4.d.join())}`));
  await click('.lab-found-card[data-disc="g4_ice"]');
  ov = await overlay();
  ok('a locked Grade 4 card: the clue, how to find it, “Show me how”', ov && /Clue: Put the thermometer in ice and water/.test(ov.text) && /How to find it/.test(ov.text) && /Show me how/.test(ov.text), ov);
  await closeOv();
  await click('[data-panel="sandbox"]');
  ok('🔊 on the lab assistant, and a unit picker (cm, m, ml, l, g, kg, °C, s) instead of a fixed unit',
     await ev(`!!document.querySelector('.lab-measure .lab-coach [data-act="say-coach"]') && ['cm','m','ml','l','g','kg','°C','s'].every(u => [...document.querySelectorAll('#lab-measure-uselect option')].some(o => o.value === u)) && document.getElementById('lab-measure-unit').hidden`));
  ok('read-aloud never plays by itself', (await speech()).spoken.length === 0);

  console.log('\n-- Grade 4 guided experiment: Measure with a ruler');
  await ev('LabMeasure._test({ instant: true }); true');
  await click('.lab-start [data-guide="g4_ruler"]');
  g = await gs();
  ok('step 1 of 4 asks for the ruler, it glows, and the guide box has its own 🔊',
     g.box && /Step 1 of 4/.test(g.text) && g.next === 'ruler30' && await ev("!!document.querySelector('#lab-guide [data-act=\"say-guide\"]')"), g);
  await click('#lab-guide [data-act="say-guide"]');
  let spk = await speech();
  ok('🔊 reads the step aloud, in English, when tapped', spk.spoken.length === 1 && /Pick the ruler/.test(spk.spoken[0].text) && /^en/.test(spk.spoken[0].lang) && (await dbg()).talking, spk);
  await click('[data-guide-do]');
  ok('…and the next step stops it', (await speech()).cancels > spk.cancels && !(await dbg()).talking);
  await click('[data-guide-do]');
  g = await gs();
  ok('step 3: put the pencil’s end on 0 - the “Start” tool glows', /Step 3 of 4/.test(g.text) && g.next === 'ctx' && /Start: ruler end/.test(await ev("document.getElementById('lab-measure-ctx').textContent")), g);
  await type4('13', 'cm');
  ov = await overlay();
  ok('the pencil read against the ruler’s end (13 cm): RULER card - a 1 cm gap before 0, so start at 0',
     cardOk4(ov) && /did not start at 0/.test(ov.text) && /1 cm gap before 0/.test(ov.text) && /0 mark/.test(ov.text), ov);
  ok('…and the scale shows the ruler’s end and the 0 mark', (await dbg()).marks.join() === 'ruler end,0 mark');
  await closeOv();
  g = await gs();
  ok('…after it the pencil starts at 0, and the guide moves on to reading', (await dbg()).align === 'zero' && /Step 4 of 4/.test(g.text), g);
  await type4('14', '');
  ok('a number with no unit: the assistant asks for the unit', /pick the unit/.test(await coach()));
  await type4('14', 'm');
  ov = await overlay();
  ok('14 m: WRONG UNIT card - the right number, 100 times too big', cardOk4(ov) && /Right number - wrong unit/.test(ov.text) && /100 times too big/.test(ov.text), ov);
  await closeOv();
  cls = await type4('14', 'cm');
  ov = await overlay();
  ok('14 cm completes it with “What you found out”', /is-right/.test(cls) && ov && /Experiment complete/.test(ov.text) && /centimetres/.test(ov.text), ov);
  ok('…saved under its own id (g4_ruler), and the next Grade 4 guide is offered', await ev("!!Labs.store('measure').guides.g4_ruler") && /Next: Read a measuring jug/.test(ov.text), ov && ov.text);
  await closeOv();
  const nb4 = await ev("document.getElementById('lab-notebook').textContent.replace(/\\s+/g, ' ')");
  ok('the notebook: 14 cm, = 140 mm, each mark 1 cm', /the length of a pencil/.test(nb4) && /14 cm/.test(nb4) && /= 140 mm/.test(nb4) && /Each mark/.test(nb4), nb4.slice(0, 300));
  ok('“The gap before 0”, “Numbers need units” and “Start at 0” are collected, and the counter is Grade 4’s',
     await ev(`['g4_ruler_end', 'g4_unit', 'g4_ruler_zero'].every(k => Labs.store('measure').disc[k]) && document.getElementById('lab-found-n').textContent === '3/${exp4.d.length}'`));

  console.log('\n-- Grade 4 drawing');
  const drawn4 = await ev(`(() => { const out = []; const D = LabMeasureData;
    for (const i of Object.keys(D.INSTRUMENTS).filter(k => (D.INSTRUMENTS[k].grades || []).includes(4))) for (const s of [null, ...D.specimensFor(i)]) {
      if (s && D.SPECIMENS[s].hazard) continue;
      for (const al of (i === 'ruler30' ? ['end', 'zero'] : ['end'])) for (const eye of (i === 'jug' && s ? ['level', 'above', 'below'] : ['level'])) {
        LabMeasure.selectInstrument(i); if (i === 'ruler30') LabMeasure.setAlign(al); if (s) LabMeasure.selectSpecimen(s);
        if (i === 'jug' && s) LabMeasure.setEye(eye);
        if (i === 'watch4' && s) LabMeasure.startTiming();
        for (let z = 1; z <= 3; z++) { LabMeasure._tick(0.05); out.push(i + '/' + s + '/' + z); LabMeasure.zoomIn(); }
      } }
    return out.length; })()`);
  ok(`every Grade 4 tool, with everything it can measure, draws at zoom 1-3 without an error (${drawn4} views)`, drawn4 > 80 && errors.length === 0, errors.slice(0, 3));
  if (process.env.LAB_SHOTS) {
    const dir = process.env.LAB_SHOTS;
    fs.mkdirSync(dir, { recursive: true });
    const shots4 = {
      g4_ruler_pencil_end_z1: "LabMeasure.selectInstrument('ruler30'); LabMeasure.selectSpecimen('pencil4')",
      g4_ruler_pencil_zero_z2: "LabMeasure.selectInstrument('ruler30'); LabMeasure.setAlign('zero'); LabMeasure.selectSpecimen('pencil4'); LabMeasure.zoomIn()",
      g4_tape_door_z1: "LabMeasure.selectInstrument('tape'); LabMeasure.selectSpecimen('door4')",
      g4_jug_juice_above_z1: "LabMeasure.selectInstrument('jug'); LabMeasure.selectSpecimen('juice4'); LabMeasure.setEye('above')",
      g4_jug_juice_z3: "LabMeasure.selectInstrument('jug'); LabMeasure.selectSpecimen('juice4'); LabMeasure.zoomIn(); LabMeasure.zoomIn()",
      g4_thermo_tap_z2: "LabMeasure.selectInstrument('thermo4'); LabMeasure.selectSpecimen('tap4'); LabMeasure.zoomIn()",
      g4_thermo_tap_z3: "LabMeasure.selectInstrument('thermo4'); LabMeasure.selectSpecimen('tap4'); LabMeasure.zoomIn(); LabMeasure.zoomIn()",
      g4_scale_mango_z1: "LabMeasure.selectInstrument('scale4'); LabMeasure.selectSpecimen('mango4')",
      g4_scale_mango_z3: "LabMeasure.selectInstrument('scale4'); LabMeasure.selectSpecimen('mango4'); LabMeasure.zoomIn(); LabMeasure.zoomIn()",
      g4_watch_ball: "LabMeasure.selectInstrument('watch4'); LabMeasure.selectSpecimen('ball4'); LabMeasure.startTiming()",
    };
    for (const [name, setup] of Object.entries(shots4)) {
      await ev(`(() => { ${setup}; LabMeasure._tick(0.05); return true; })()`);
      const png = await ev("document.getElementById('lab-canvas').toDataURL('image/png')");
      fs.writeFileSync(path.join(dir, name + '.png'), Buffer.from(png.split(',')[1], 'base64'));
    }
    console.log('     saved ' + Object.keys(shots4).length + ' Grade 4 canvas views to ' + dir);
  }

  console.log('\n-- Grade 4 hazards and result cards');
  await pick('thermo4', 'kettle4');
  ov = await overlay();
  ok('pouring kettle water yourself: HAZARD card with the Hot sign - ask an adult',
     ov && /is-hazard/.test(ov.cls) && ov.signs.join() === 'Hot surface' && /hot water can burn you/.test(ov.text) && /Ask an adult/.test(ov.text)
     && /Why it’s dangerous/.test(ov.text) && /Do this instead/.test(ov.text) && examHead.test(ov.text), ov);
  await closeOv();
  ok('…nothing is left to read, and the assistant points to “an adult pours”', (await dbg()).spec === null && /an adult pours/.test(await coach()));
  await pick('thermo4', 'tap4');
  await click('[data-act="ctx"]');
  const crack4 = (await dbg()).crack;
  ov = await overlay();
  ok('stirring with the thermometer: it snaps on the canvas, then a HAZARD card with the Sharp sign',
     crack4 > 0 && ov && /is-hazard/.test(ov.cls) && ov.signs.join() === 'Sharp - can cut' && /snapped/.test(ov.text) && /Never stir with a thermometer/.test(ov.text), { crack4, ov });
  await closeOv();
  ok('…a new thermometer: the crack is gone', (await dbg()).crack === 0 && (await dbg()).spec === null);
  await pick('jug', 'juice4');
  await ev("LabMeasure.setEye('above'); true");
  await type4('450', 'ml');
  ov = await overlay();
  ok('the jug read from above (450 ml): EYE card - the real level is 350 ml, and the scale shows both',
     cardOk4(ov) && /Your eye was not level/.test(ov.text) && /350 ml/.test(ov.text) && (await dbg()).marks.join() === 'you read,true level', ov);
  await closeOv();
  await ev("LabMeasure.setEye('below'); true");
  await type4('250', 'ml');
  ov = await overlay();
  ok('…and from below (250 ml)', cardOk4(ov) && /from below/.test(ov.text), ov);
  await closeOv();
  await ev("LabMeasure.setEye('level'); true");
  cls = await type4('0.35', 'l');
  ok('at eye level, 0.35 l is accepted: it is 350 ml', /is-right/.test(cls));
  await pick('scale4', 'mango4');
  await type4('380', 'g');
  ov = await overlay();
  ok('the mango on a scale that started at 40 g, read as 380 g: SCALE card - turn the knob to 0 first',
     cardOk4(ov) && /did not start at 0/.test(ov.text) && /40 g too heavy/.test(ov.text) && /turn the knob/.test(ov.text), ov);
  await closeOv();
  await click('[data-act="ctx"]');
  d = await dbg();
  ok('“Set to 0” takes the mango off and zeroes the pointer', d.tared && d.spec === null && /took the mango off/.test(await coach()), d);
  await click('[data-spec="mango4"]');
  cls = await type4('340', 'g');
  ok('…then the mango reads 340 g and “Set the scale to 0” is found', /is-right/.test(cls) && await ev("!!Labs.store('measure').disc.g4_scale_zero"));
  await pick('ruler30', 'door4');
  ok('the door will not fit the 30 cm ruler: “Use the tape measure”', (await dbg()).spec === null && /Use the tape measure/.test(await coach()));
  await pick('tape', 'door4');
  cls = await type4('90', 'cm');
  ok('…and the tape reads it: 90 cm', /is-right/.test(cls));
  await pick('ruler30', 'pencil4');
  await type4('3', 'kg');
  ov = await overlay();
  ok('a length written in kg: WRONG UNIT card - kilograms measure mass (how heavy)', cardOk4(ov) && /That unit is for something else/.test(ov.text) && /kilograms \(kg\) measure mass \(how heavy\)/.test(ov.text), ov);
  await closeOv();

  console.log('\n-- Grade 4: measure three times');
  await pick('watch4', 'ball4');
  for (const v of [5, 5]) { await click('[data-act="ctx"]'); await type4(v, 's'); }
  ok('the stopwatch tool now says “Time it again”', /Time it again/.test(await ev("document.getElementById('lab-measure-ctx').textContent")));
  await click('[data-act="ctx"]');
  cls = await type4('8', 's');
  d = await dbg();
  ok('three tries: 5 s, 5 s, 8 s - the assistant names 8 s as the odd one out', /is-right/.test(cls) && /8 s is the odd one out/.test(await coach()) && d.trials.join() === '5,5,8', { c: await coach(), t: d.trials });
  await type4('8', 's');
  ok('typing the same try again does not count twice', (await dbg()).trials.join() === '5,5,8');
  ok('“Measure three times” is found, and the notebook numbers the tries', await ev("!!Labs.store('measure').disc.g4_repeat") && (await dbg()).rows[0].includes('(try 3)'), (await dbg()).rows);
  await click('[data-act="ctx"]');
  await type4('5', 's');
  ok('try 4 agrees with the first two: the ball takes 5 s', /agrees: the ball takes 5 s/.test(await coach()), await coach());

  console.log('\n-- Grade 4: calm mode, read-aloud and help');
  await ev("LabMeasure._test({ instant: false }); document.documentElement.classList.add('kid-calm'); true");
  await pick('watch4', 'ball4');
  await click('[data-act="ctx"]');
  d = await dbg();
  ok('in Calm Mode the ball’s time (5 s) is there at once', d.timed && d.clock.t === 5 && !d.clock.run, d.clock);
  await pick('jug', 'water4');
  await ev("LabMeasure.setEye('above'); true");
  await type4('900', 'ml');
  ov = await overlay();
  ok('…and a mistake card appears straight away, with no animation', ov && /Your eye was not level/.test(ov.text), ov);
  await closeOv();
  await ev("document.documentElement.classList.remove('kid-calm'); LabMeasure._test({ instant: true }); true");
  await click('[data-act="say-coach"]');
  spk = await speech();
  ok('🔊 on the lab assistant reads its words aloud (without the emoji)',
     spk.spoken.length > 1 && spk.spoken[spk.spoken.length - 1].text === (await coach()).replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '').replace(/\s+/g, ' ').trim() && (await dbg()).talking, spk.spoken.slice(-1));
  await click('[data-act="help"]');
  ok('opening an overlay (help) stops the speech', (await speech()).cancels > spk.cancels && !(await dbg()).talking);
  ov = await overlay();
  ok('Grade 4 help: each tool with its unit and the rules of good measuring - no SI units, no vernier',
     ov && /Each tool and its unit/.test(ov.text) && /Kitchen scale/.test(ov.text) && /Start at 0/.test(ov.text) && !/vernier|kelvin|SI unit/i.test(ov.text), ov && ov.text.slice(0, 200));
  await closeOv();

  console.log('\n-- Grade 4 missions');
  await ev("LabMeasure.startMission('g4_read'); true");
  ok('Read the scales: four jobs, on the Grade 4 shelf', await ev("document.querySelectorAll('#lab-mission .lab-steps li').length === 5 && !!document.querySelector('#lab-panel [data-inst=\"jug\"]') && !document.querySelector('#lab-panel [data-inst=\"vernier\"]')"));
  await pick('ruler30', 'pencil4'); await ev("LabMeasure.setAlign('zero'); true"); await type4('14', 'cm');
  await pick('jug', 'juice4'); await type4('350', 'ml');
  await pick('thermo4', 'tap4'); await type4('28', '°C');
  await pick('scale4'); await click('[data-act="ctx"]'); await click('[data-spec="mango4"]'); await type4('340', 'g');
  d = await dbg();
  ok('…pencil from 0, juice at eye level, tap water, mango on a zeroed scale: mission success, no mistakes', d.mission.success && d.mission.done.length === 4 && d.mission.cards === 0 && d.mission.wrong === 0, d.mission);
  await click('[data-act="quiz"]');
  ok('…6 questions right first time: 3 stars', (await answerAll('g4_read')) === '3 of 3 stars');
  ok('…saved as g4_read beside the Grade 9 stars - the two grades kept apart', await ev("Labs.store('measure').missions.g4_read.stars === 3 && Labs.store('measure').missions.vernier.stars === 3"));
  await closeOv();
  await ev("LabMeasure.startMission('g4_choose'); true");
  ok('Right tool for the job: the first job and the six Grade 4 tools',
     await ev("/How long is a pencil/.test(document.querySelector('.lab-measure-job').textContent) && [...document.querySelectorAll('[data-choose]')].map(b => b.dataset.choose).join() === 'ruler30,tape,jug,thermo4,scale4,watch4'"));
  await click('[data-choose="scale4"]');
  ov = await overlay();
  ok('the kitchen scale for a pencil: WRONG TOOL card, in plain words', cardOk4(ov) && /Not the kitchen scale/.test(ov.text) && /mass \(how heavy\), not length \(how long\)/.test(ov.text), ov);
  await closeOv();
  for (const best of await ev('LabMeasureData.CHOICES4.map(c => c.best)')) await click(`[data-choose="${best}"]`);
  d = await dbg();
  ok('…then the right tool for all six jobs', d.mission.success && d.mission.i === 6, d.mission);
  let f4 = await fit();
  ok('the Grade 4 mission panel fits a 360px phone', fits(f4), f4);
  await click('[data-act="quiz"]');
  ok('the quiz asks “pick the instrument” with four pictures', await ev("document.querySelectorAll('#lab-overlay .lab-quiz-opt .lab-quiz-pic svg').length === 4"));
  ok('…one wrong pick costs a star: 2 stars', (await answerAll('g4_choose')) === '2 of 3 stars');
  await closeOv();
  await ev("LabMeasure.startMission('g4_fair'); true");
  await pick('watch4', 'ball4');
  for (const v of [5, 5, 8]) { await click('[data-act="ctx"]'); await type4(v, 's'); }
  d = await dbg();
  ok('Fair measuring: three tries of the ball, each counted once', d.mission.success && d.mission.done.length === 3, d.mission);
  await click('[data-act="quiz"]');
  ok('…3 stars', (await answerAll('g4_fair')) === '3 of 3 stars');
  await closeOv();

  console.log('\n-- every Grade 4 discovery');
  const unsolved4 = [];
  for (const id of exp4.d) { const res = await solve(id); if (res !== true) unsolved4.push(id + ' → ' + res); }
  ok(`all ${exp4.d.length} Grade 4 discoveries unlock by following their own “Show me how”`, unsolved4.length === 0 && exp4.d.length >= 10, unsolved4);
  ok('the ✨ counter reads all of the Grade 4 ones', await ev(`document.getElementById('lab-found-n').textContent === '${exp4.d.length}/${exp4.d.length}'`));

  console.log('\n-- Grade 4 phone');
  await click('[data-panel="sandbox"]');
  await pick('jug', 'juice4');
  f4 = await fit();
  ok('the Grade 4 bench (shelf, things to measure, reading box with its unit picker, notebook) fits 360px', fits(f4), f4);
  await ev("LabMeasure.startGuide('g4_jug'); true");
  f4 = await fit();
  ok('…and with a guide open (🔊 beside the step)', fits(f4), f4);
  const tap4 = await ev(`[...document.querySelectorAll('#labs-root .lab-measure button, #labs-root .lab-measure select')].filter(b => b.offsetParent !== null && !b.classList.contains('lab-link'))
    .filter(b => { const r = b.getBoundingClientRect(); return r.height < 44 || r.width < 44; }).map(b => (b.dataset.act || b.dataset.panel || b.id || b.textContent.trim()).slice(0, 30))`);
  ok('every Grade 4 control is a 44px tap target', tap4.length === 0, tap4);
  await click('[data-act="guide-stop"]');

  console.log('\n-- Grade 4: leaving and coming back');
  await click('[data-act="say-coach"]');
  const c2 = (await speech()).cancels;
  ok('…the lab knows it is speaking', (await dbg()).talking === true);
  await ev("showScreen('landing'); true");
  await sleep(400);
  const left = await ev("({ hidden: document.getElementById('screen-labs').classList.contains('hidden'), talking: LabMeasure._debug().talking, looping: LabMeasure._debug().looping })");
  ok('leaving the Labs screen cancels the speech and stops the loop', left.hidden && !left.talking && !left.looping && (await speech()).cancels > c2, left);
  await ev("showScreen('labs'); true");
  await sleep(500);
  ok('coming back to the Labs screen restarts the loop', await ev("!document.getElementById('screen-labs').classList.contains('hidden') && LabMeasure._debug().looping"));
  await click('[data-act="say-coach"]');
  const c3 = (await speech()).cancels;
  await ev('Labs.backToHub(); true');
  ok('closing the lab (unmount) cancels the speech', (await speech()).cancels > c3 && (await dbg()).talking === false);

  // ════════ Grades 7 and 8 ════════
  // Same stand-in as Grade 4: until 7 and 8 are on the measure row, atGrade()
  // overrides Labs.grade(), and the cards' exam heading is whatever the shell
  // opened the lab at - so "In your exams" is asserted only once registered.
  let reg78 = false;
  const cardOk78 = o => o && /is-result/.test(o.cls) && /What happened/.test(o.text) && /What you should have done/.test(o.text)
    && (reg78 ? /In your exams/ : /In your exams|On the NCE paper/).test(o.text);
  const hzOk78 = (o, sign) => o && /is-hazard/.test(o.cls) && o.signs.join() === sign && /What happened/.test(o.text) && /Why it’s dangerous/.test(o.text) && /Do this instead/.test(o.text);
  async function openAt(G, shelf, welcome) {
    console.log(`\n-- Grade ${G}: opening`);
    const at = await atGrade(G);
    reg78 = at.registered;
    ok(`Grade ${G}: the Measurement Lab opens`, at.up);
    ok(`Labs.grade() is ${G}, and the eyebrow says “Science · Grade ${G}”`,
       await ev(`Labs.grade() === ${G} && LabMeasure._debug().grade === ${G} && document.querySelector('.lab-measure .lab-eyebrow').textContent.trim() === 'Science · Grade ${G}'`));
    const o = await overlay();
    ok(`first visit at Grade ${G}: its own welcome and “Show me how”, no vernier`, o && /Welcome to the Measurement Lab/.test(o.text) && welcome.test(o.text) && /Show me how/.test(o.text) && !/vernier/i.test(o.text), o);
    await closeOv();
    ok(`…remembered as intro${G}, apart from the other grades’ welcomes`, await ev(`Labs.store('measure').intro${G} === true && Labs.store('measure').intro4 === true && Labs.store('measure').intro === true`));
    const exp = await ev(`(() => { const D = LabMeasureData; return { g: D.forGrade(D.GUIDES, ${G}).map(x => x.id), m: D.forGrade(D.MISSIONS, ${G}).map(x => x.id), d: D.forGrade(D.DISCOVERIES, ${G}).map(x => x.id) }; })()`);
    const s = await ev(`({ guides: [...document.querySelectorAll('.lab-start [data-guide]')].map(b => b.dataset.guide), missions: [...document.querySelectorAll('.lab-start [data-mission]')].map(b => b.dataset.mission),
      insts: [...document.querySelectorAll('#lab-panel [data-inst]')].map(b => b.dataset.inst), seg: !!document.querySelector('#lab-panel .lab-seg'), found: document.getElementById('lab-found-n').textContent,
      units: [...document.querySelectorAll('#lab-measure-uselect option')].map(o => o.value).filter(Boolean) })`);
    ok(`the start panel shows only the Grade ${G} guides (${exp.g.length}) and missions (${exp.m.length})`,
       s.guides.join() === exp.g.join() && s.missions.join() === exp.m.join() && exp.g.length >= 3 && exp.m.length >= 2 && exp.g.every(x => x.startsWith(`g${G}_`)), s);
    ok(`the shelf holds the Grade ${G} tools (${shelf}) - no vernier, no Grade 4 tool, no Length/Other split`, s.insts.join() === shelf && !s.seg, s);
    ok(`the ✨ counter counts Grade ${G} discoveries only (0/${exp.d.length})`, s.found === `0/${exp.d.length}`, s.found);
    ok(`the unit picker offers this grade’s units (${s.units.join(' ')})`, s.units.join() === (await ev(`LabMeasureData.UNIT_CHOICES_BY_GRADE[${G}].join()`)).split(',').join() && !!(await ev("!!document.querySelector('[data-act=\"say-coach\"]')")));
    await click('[data-panel="missions"]');
    ok(`the Missions tab lists the Grade ${G} missions only`, await ev(`[...document.querySelectorAll('#lab-panel [data-mission]')].map(b => b.dataset.mission).join() === ${JSON.stringify(exp.m.join())}`));
    await click('[data-panel="found"]');
    ok(`the Discoveries tab lists the Grade ${G} discoveries only`, await ev(`[...document.querySelectorAll('.lab-found-card')].map(b => b.dataset.disc).join() === ${JSON.stringify(exp.d.join())}`));
    await click('[data-panel="sandbox"]');
    return exp;
  }
  // Every Grade 7/8 tool, with everything it can measure (not the hazards), at zoom 1-3.
  const draw78 = G => ev(`(() => { const out = []; const D = LabMeasureData;
    for (const i of Object.keys(D.INSTRUMENTS).filter(k => (D.INSTRUMENTS[k].grades || []).includes(${G}))) for (const s of [null, ...D.specimensFor(i, ${G})]) {
      if (s && D.SPECIMENS[s].hazard) continue;
      for (const eye of (i === 'cyl78' && s ? ['level', 'above', 'below'] : ['level'])) {
        LabMeasure.selectInstrument(i); if (s) LabMeasure.selectSpecimen(s); if (i === 'cyl78' && s) LabMeasure.setEye(eye);
        for (let z = 1; z <= 3; z++) { LabMeasure._tick(0.05); out.push(i + '/' + s + '/' + z); LabMeasure.zoomIn(); }
        if (s && D.measure(i, s, {}).ok) { LabMeasure.showReading(); document.getElementById('lab-overlay')?.remove(); LabMeasure._tick(0.05); }
      } }
    return out.length; })()`);
  // LAB_SHOTS=<dir>: save Grade 7/8 canvas views to LOOK at them.
  const shots78 = async list => {
    if (!process.env.LAB_SHOTS) return;
    fs.mkdirSync(process.env.LAB_SHOTS, { recursive: true });
    for (const [name, setup] of Object.entries(list)) {
      await ev(`(() => { ${setup}; LabMeasure._tick(0.05); return true; })()`);
      const png = await ev("document.getElementById('lab-canvas').toDataURL('image/png')");
      fs.writeFileSync(path.join(process.env.LAB_SHOTS, name + '.png'), Buffer.from(png.split(',')[1], 'base64'));
      await ev("document.getElementById('lab-overlay')?.remove(); true");
    }
    console.log('     saved ' + Object.keys(list).length + ' Grade 7/8 canvas views');
  };
  const tap44 = () => ev(`[...document.querySelectorAll('#labs-root .lab-measure button, #labs-root .lab-measure select')].filter(b => b.offsetParent !== null && !b.classList.contains('lab-link'))
    .filter(b => { const r = b.getBoundingClientRect(); return r.height < 44 || r.width < 44; }).map(b => (b.dataset.act || b.dataset.panel || b.id || b.textContent.trim()).slice(0, 30))`);

  // ── Grade 7 ──
  const exp7 = await openAt(7, 'cyl78,block7,bal78', /displacement/);
  console.log('\n-- Grade 7 guided experiment: Read a measuring cylinder');
  await ev('LabMeasure._test({ instant: true }); true');
  await click('.lab-start [data-guide="g7_cyl"]');
  g = await gs();
  ok('step 1 of 5 asks for the measuring cylinder, and it glows', g.box && /Step 1 of 5/.test(g.text) && g.next === 'cyl78', g);
  for (let k = 0; k < 4; k++) await click('[data-guide-do]');
  g = await gs();
  ok('…zoomed to 3× on the water, the Check button glows', (await dbg()).zoom === 3 && /Step 5 of 5/.test(g.text) && g.next === 'check', g);
  await type4('47', 'cm³');
  ov = await overlay();
  ok('47 cm³: TOP OF THE MENISCUS card (the bottom is 46 cm³), and the scale shows both', cardOk78(ov) && /top of the meniscus/.test(ov.text) && /46 cm³/.test(ov.text) && (await dbg()).marks.join() === 'top of curve,bottom', ov);
  await closeOv();
  cls = await type4('46', 'cm³');
  ov = await overlay();
  ok('46 cm³ completes it with “What you found out”', /is-right/.test(cls) && ov && /Experiment complete/.test(ov.text) && /meniscus/.test(ov.text), ov);
  ok('…saved as g7_cyl; the notebook says 46 cm³ = 46 ml', await ev("!!Labs.store('measure').guides.g7_cyl") && /46 cm³/.test(await ev("document.getElementById('lab-notebook').textContent")) && /= 46 ml/.test(await ev("document.getElementById('lab-notebook').textContent")));
  await closeOv();
  ok('“Read the meniscus” and “Top of the meniscus” are collected, and the counter is Grade 7’s',
     await ev(`['g7_cyl_read', 'g7_top'].every(k => Labs.store('measure').disc[k]) && document.getElementById('lab-found-n').textContent === '2/${exp7.d.length}'`));

  console.log('\n-- Grade 7 drawing, cards and hazards');
  const n7 = await draw78(7);
  ok(`every Grade 7 tool draws at zoom 1-3, and with its answer shown, without an error (${n7} views)`, n7 > 40 && errors.length === 0, errors.slice(0, 3));
  await shots78({
    g7_bubble_z1: "LabMeasure.selectInstrument('cyl78'); LabMeasure.selectSpecimen('bubble78')",
    g7_stone_z3: "LabMeasure.selectInstrument('cyl78'); LabMeasure.selectSpecimen('stone78'); LabMeasure.zoomIn(); LabMeasure.zoomIn()",
    g7_block: "LabMeasure.selectInstrument('block7'); LabMeasure.selectSpecimen('box7')",
    g7_crack: "LabMeasure.selectInstrument('cyl78'); LabMeasure.selectSpecimen('drop78')",
  });
  await pick('cyl78', 'water78'); await ev("LabMeasure.setEye('above'); true"); await type4('48', 'cm³');
  ov = await overlay();
  ok('eye above, 48 cm³: PARALLAX card - too high', cardOk78(ov) && /Parallax error/.test(ov.text) && /too high/.test(ov.text) && (await dbg()).marks.join() === 'you read,true level', ov);
  await closeOv();
  await pick('cyl78', 'stone78'); await type4('68', 'cm³');
  ov = await overlay();
  ok('the stone read as 68 cm³: FORGOT THE FIRST READING card - 68 − 50 = 18 cm³', cardOk78(ov) && /forgot the water/.test(ov.text) && /68 − 50 = 18 cm³/.test(ov.text) && (await dbg()).marks.join() === 'new level,first reading', ov);
  await closeOv();
  await pick('cyl78', 'bubble78');
  ok('the rough stone has a bubble on it: the chip says so and the fourth tool is “Tap the glass”',
     /Air bubble/.test(await ev("document.getElementById('lab-status').textContent")) && /Tap the glass/.test(await ev("document.getElementById('lab-measure-ctx').textContent")));
  await type4('24', 'cm³');
  ov = await overlay();
  ok('24 cm³ with the bubble on: AIR BUBBLE card', cardOk78(ov) && /air bubble/i.test(ov.text) && /1 cm³ more/.test(ov.text), ov);
  await closeOv();
  await click('[data-act="ctx"]');
  cls = await type4('23', 'cm³');
  ok('…tap the glass: the level falls, and 23 cm³ is right (“Tap the bubble free” found)', (await dbg()).tapped && /is-right/.test(cls) && await ev("!!Labs.store('measure').disc.g7_bubble_free"));
  await pick('block7', 'box7'); await type4('15', 'cm³');
  ov = await overlay();
  ok('the block as 5 × 3 = 15: NOT A VOLUME card (the area of one face)', cardOk78(ov) && /area of one face/.test(ov.text) && /5 × 3 × 2 = 30 cm³/.test(ov.text), ov);
  await closeOv();
  await type4('30', 'cm²');
  ov = await overlay();
  ok('30 cm²: a unit for area, not volume', cardOk78(ov) && /That unit is for something else/.test(ov.text) && /square centimetres \(cm²\) measure area/.test(ov.text), ov);
  await closeOv();
  cls = await type4('30', 'cm³');
  ok('…30 cm³ is right', /is-right/.test(cls));
  await pick('bal78', 'stone78'); await type4('47.4', 'g');
  ov = await overlay();
  ok('the stone on a balance that read 2.4 g empty, typed 47.4 g: NOT ZEROED card - 47.4 − 2.4 = 45.0 g', cardOk78(ov) && /did not start at 0\.0 g/.test(ov.text) && /47\.4 g − 2\.4 g = 45\.0 g/.test(ov.text), ov);
  await closeOv();
  await click('[data-spec="closed"]'); await click('[data-act="ctx"]'); await click('[data-spec="stone78"]');
  await type4('45', 'N');
  ov = await overlay();
  ok('zeroed, then 45 N: MASS IS NOT WEIGHT card - newtons measure weight', cardOk78(ov) && /Mass is not weight/.test(ov.text) && /Newtons \(N\) measure weight/.test(ov.text), ov);
  await closeOv();
  cls = await type4('0.045', 'kg');
  ok('…0.045 kg is right (45 g); “Zero the balance” and “Mass is not weight” are found',
     /is-right/.test(cls) && await ev("!!Labs.store('measure').disc.g7_balance && !!Labs.store('measure').disc.g7_weight"));
  await pick('cyl78', 'drop78');
  const crack7 = (await dbg()).crack;
  ov = await overlay();
  ok('dropping a steel block into the glass cylinder: it cracks on the canvas, then a HAZARD card with the Sharp sign',
     crack7 > 0 && hzOk78(ov, 'Sharp - can cut') && /cracked/.test(ov.text) && /thread/.test(ov.text), { crack7, ov });
  await closeOv();
  ok('…a new cylinder, nothing selected', (await dbg()).crack === 0 && (await dbg()).spec === null);
  await pick('cyl78', 'water78');
  ok('reading the water, the fourth tool is “Lift it to read”', /Lift it to read/.test(await ev("document.getElementById('lab-measure-ctx').textContent")));
  await click('[data-act="ctx"]');
  ov = await overlay();
  ok('lifting the cylinder to your eye: it slips and smashes - HAZARD card, Sharp, “bend down”', hzOk78(ov, 'Sharp - can cut') && /smashed/.test(ov.text) && /Bend down/.test(ov.text), ov);
  await closeOv();
  await pick('cyl78', 'big78');
  const spl7 = (await dbg()).splash;
  ov = await overlay();
  ok('a big stone in 70 cm³ of water: it overflows on the canvas, then a HAZARD card with the Caution sign - water on the floor',
     spl7 > 0 && hzOk78(ov, 'Caution') && /water on the floor/.test(ov.text) && /slippery/.test(ov.text), { spl7, ov });
  await closeOv();

  console.log('\n-- Grade 7 missions');
  await ev("LabMeasure.startMission('g7_volume'); true");
  await pick('cyl78', 'water78'); await type4('46', 'cm³');
  await click('[data-spec="stone78"]'); await type4('18', 'cm³');
  await pick('block7', 'box7'); await type4('30', 'cm³');
  d = await dbg();
  ok('Measure volume: water at eye level, the stone by displacement, the block by its sides - success, no mistakes', d.mission.success && d.mission.done.length === 3 && d.mission.cards === 0 && d.mission.wrong === 0, d.mission);
  await click('[data-act="quiz"]');
  ok('…the quiz opens on “pick the apparatus” with four pictures', await ev("document.querySelectorAll('#lab-overlay .lab-quiz-opt .lab-quiz-pic svg').length === 4"));
  ok('…3 stars', (await answerAll('g7_volume')) === '3 of 3 stars');
  await closeOv();
  await ev("LabMeasure.startMission('g7_mass'); true");
  await pick('bal78', 'closed'); await type4('2.4', 'g');
  await click('[data-act="ctx"]'); await click('[data-spec="stone78"]'); await type4('45', 'g');
  await click('[data-spec="sugar7"]'); await type4('0.25', 'kg');
  d = await dbg();
  ok('Mass, not weight: the empty pan read, then the stone and 0.25 kg of sugar on a zeroed balance - success', d.mission.success && d.mission.done.length === 3 && d.mission.cards === 0, d.mission);
  await click('[data-act="quiz"]');
  ok('…3 stars, saved as g7_mass', (await answerAll('g7_mass')) === '3 of 3 stars' && await ev("Labs.store('measure').missions.g7_mass.stars === 3"));
  await closeOv();

  console.log('\n-- Grade 7: calm mode, help, every discovery, phone');
  await ev("LabMeasure._test({ instant: false }); document.documentElement.classList.add('kid-calm'); true");
  await pick('cyl78', 'water78'); await ev("LabMeasure.setEye('below'); true"); await type4('44', 'cm³');
  ov = await overlay();
  ok('in Calm Mode a mistake card appears straight away (too low)', ov && /too low/.test(ov.text), ov);
  await closeOv();
  await pick('cyl78', 'big78');
  ok('…and a hazard stops it at once, the overflow still drawn', !!(await overlay()) && (await dbg()).splash > 0);
  await closeOv();
  await ev("document.documentElement.classList.remove('kid-calm'); LabMeasure._test({ instant: true }); true");
  await click('[data-act="help"]');
  ov = await overlay();
  ok('Grade 7 help: each tool and its unit, its own rules - no vernier, no zero error', ov && /Each tool and its unit/.test(ov.text) && /Displacement: final reading − first reading/.test(ov.text) && !/vernier|zero error/i.test(ov.text), ov && ov.text.slice(0, 200));
  await closeOv();
  const uns7 = [];
  for (const id of exp7.d) { const res = await solve(id); if (res !== true) uns7.push(id + ' → ' + res); }
  ok(`all ${exp7.d.length} Grade 7 discoveries unlock by following their own “Show me how”`, uns7.length === 0 && exp7.d.length >= 10, uns7);
  ok('the ✨ counter reads all of the Grade 7 ones', await ev(`document.getElementById('lab-found-n').textContent === '${exp7.d.length}/${exp7.d.length}'`));
  await click('[data-panel="sandbox"]');
  await pick('cyl78', 'stone78');
  let f7 = await fit();
  ok('the Grade 7 bench fits 360px', fits(f7), f7);
  await ev("LabMeasure.startGuide('g7_bubble'); true");
  f7 = await fit();
  ok('…and with a guide open', fits(f7), f7);
  const t7 = await tap44();
  ok('every Grade 7 control is a 44px tap target', t7.length === 0, t7);
  await click('[data-act="guide-stop"]');

  // ── Grade 8 ──
  const exp8 = await openAt(8, 'cyl78,bal78,dens8', /density/);
  ok('Grade 8 sees none of Grade 7’s things: no block ruler, no sugar', await ev("!document.querySelector('#lab-panel [data-inst=\"block7\"]') && !LabMeasureData.specimensFor('bal78', 8).includes('sugar7')"));
  console.log('\n-- Grade 8 guided experiment: Density of a metal block');
  await ev('LabMeasure._test({ instant: true }); true');
  await click('.lab-start [data-guide="g8_block"]');
  g = await gs();
  ok('step 1 of 4 asks for the density bench, and it glows', g.box && /Step 1 of 4/.test(g.text) && g.next === 'dens8', g);
  await click('[data-guide-do]'); await click('[data-guide-do]');
  ok('…the aluminium block shows its mass and sides; nothing to zoom', (await dbg()).spec === 'alu8' && await ev("document.querySelector('[data-act=\"zin\"]').disabled"));
  await click('[data-guide-do]');
  ov = await overlay();
  ok('the upside-down slip, 40 ÷ 108 = 0.37: FORMULA UPSIDE DOWN card', cardOk78(ov) && /upside down/.test(ov.text) && /108 ÷ 40 = 2\.70 g\/cm³/.test(ov.text), ov);
  await closeOv();
  cls = await type4('2.7', 'g/cm³');
  ov = await overlay();
  ok('2.7 g/cm³ completes it; it sinks in the tank on the canvas', /is-right/.test(cls) && (await dbg()).hit && ov && /Experiment complete/.test(ov.text) && /sinks/.test(ov.text), ov);
  ok('…the notebook: 2.70 g/cm³ = 2700 kg/m³', /2\.70 g\/cm³/.test(await ev("document.getElementById('lab-notebook').textContent")) && /= 2700 kg\/m³/.test(await ev("document.getElementById('lab-notebook').textContent")));
  await closeOv();
  console.log('\n-- Grade 8 drawing and cards');
  const n8 = await draw78(8);
  ok(`every Grade 8 tool draws at zoom 1-3, and with its answer (the float tank) shown, without an error (${n8} views)`, n8 > 50 && errors.length === 0, errors.slice(0, 3));
  await shots78({
    g8_alu: "LabMeasure.selectInstrument('dens8'); LabMeasure.selectSpecimen('alu8')",
    g8_ice_float: "LabMeasure.selectInstrument('dens8'); LabMeasure.selectSpecimen('ice8'); LabMeasure.showReading()",
    g8_copper_sink: "LabMeasure.selectInstrument('dens8'); LabMeasure.selectSpecimen('copper8'); LabMeasure.showReading()",
    g8_oil: "LabMeasure.selectInstrument('dens8'); LabMeasure.selectSpecimen('oil8'); LabMeasure.showReading()",
  });
  await pick('dens8', 'copper8'); await type4('1.48', 'g/cm³');
  ov = await overlay();
  ok('copper ÷ the final level (89 ÷ 60 = 1.48): DIVIDED BY THE FINAL READING card - 60 − 50 = 10 cm³', cardOk78(ov) && /divided by the final reading/.test(ov.text) && /60 − 50 = 10 cm³/.test(ov.text), ov);
  await closeOv();
  await pick('dens8', 'oil8'); await type4('2.52', 'g/cm³');
  ov = await overlay();
  ok('oil with its cylinder (126 ÷ 50): FORGOT THE CYLINDER card - 126 − 80 = 46 g', cardOk78(ov) && /forgot the mass of the cylinder/.test(ov.text) && /126 − 80 = 46 g/.test(ov.text), ov);
  await closeOv();
  await pick('dens8', 'wood8'); await type4('0.6', 'kg/m³');
  ov = await overlay();
  ok('wood as 0.6 kg/m³: WRONG UNIT card - 1000 times too small', cardOk78(ov) && /Right number - wrong unit/.test(ov.text) && /1000 times too small/.test(ov.text), ov);
  await closeOv();
  cls = await type4('600', 'kg/m³');
  ok('…600 kg/m³ is the same density, and is right; wood floats on the canvas', /is-right/.test(cls) && (await dbg()).hit && /floats/.test(await coach()));
  await pick('bal78', 'stone78'); await type4('47.4', 'N');
  ov = await overlay();
  ok('at Grade 8 too, a mass in newtons: MASS IS NOT WEIGHT card', cardOk78(ov) && /Mass is not weight/.test(ov.text), ov);
  await closeOv();
  await pick('cyl78', 'big78');
  ov = await overlay();
  ok('the big stone overflows at Grade 8 too: Caution', hzOk78(ov, 'Caution'), ov);
  await closeOv();

  console.log('\n-- Grade 8 missions');
  await ev("LabMeasure.startMission('g8_density'); true");
  await pick('dens8', 'alu8'); await type4('2.7', 'g/cm³');
  await click('[data-spec="stone8"]'); await type4('2.5', 'g/cm³');
  await click('[data-spec="oil8"]'); await type4('0.92', 'g/cm³');
  d = await dbg();
  ok('Find the density: aluminium 2.7, the stone 2.5, oil 0.92 g/cm³ - success', d.mission.success && d.mission.done.length === 3 && d.mission.cards === 0 && d.mission.wrong === 0, d.mission);
  await click('[data-act="quiz"]');
  ok('…3 stars', (await answerAll('g8_density')) === '3 of 3 stars');
  await closeOv();
  await ev("LabMeasure.startMission('g8_float'); true");
  await pick('dens8', 'cork8'); await type4('0.24', 'g/cm³');
  await click('[data-spec="ice8"]'); await type4('0.92', 'g/cm³');
  await click('[data-spec="copper8"]'); await type4('8.9', 'g/cm³');
  d = await dbg();
  ok('Float or sink: cork, ice and copper - success', d.mission.success && d.mission.done.length === 3, d.mission);
  let f8 = await fit();
  ok('the Grade 8 mission panel fits a 360px phone', fits(f8), f8);
  await click('[data-act="quiz"]');
  ok('…the quiz asks “which picture” with four floating blocks', await ev("document.querySelectorAll('#lab-overlay .lab-quiz-opt .lab-quiz-pic svg').length === 4"));
  ok('…3 stars, saved as g8_float', (await answerAll('g8_float')) === '3 of 3 stars' && await ev("Labs.store('measure').missions.g8_float.stars === 3"));
  await closeOv();

  console.log('\n-- Grade 8: calm mode, every discovery, phone');
  await ev("LabMeasure._test({ instant: false }); document.documentElement.classList.add('kid-calm'); true");
  await pick('dens8', 'alu8'); await type4('0.37', 'g/cm³');
  ov = await overlay();
  ok('in Calm Mode the upside-down card appears at once', ov && /upside down/.test(ov.text), ov);
  await closeOv();
  await ev("document.documentElement.classList.remove('kid-calm'); LabMeasure._test({ instant: true }); true");
  const uns8 = [];
  for (const id of exp8.d) { const res = await solve(id); if (res !== true) uns8.push(id + ' → ' + res); }
  ok(`all ${exp8.d.length} Grade 8 discoveries unlock by following their own “Show me how”`, uns8.length === 0 && exp8.d.length >= 10, uns8);
  ok('the ✨ counter reads all of the Grade 8 ones', await ev(`document.getElementById('lab-found-n').textContent === '${exp8.d.length}/${exp8.d.length}'`));
  await click('[data-panel="sandbox"]');
  await pick('dens8', 'stone8'); await ev('LabMeasure.showReading(); true'); await closeOv();
  f8 = await fit();
  ok('the Grade 8 bench (density bench with its float tank, reading box, notebook) fits 360px', fits(f8), f8);
  await ev("LabMeasure.startGuide('g8_stone'); true");
  f8 = await fit();
  ok('…and with the 10-step guide open', fits(f8), f8);
  const t8 = await tap44();
  ok('every Grade 8 control is a 44px tap target', t8.length === 0, t8);
  await click('[data-act="guide-stop"]');
  await click('[data-act="help"]');
  ov = await overlay();
  ok('Grade 8 help: density = mass ÷ volume, and water 1.0 g/cm³', ov && /Density = mass ÷ volume/.test(ov.text) && /1\.0 g\/cm³/.test(ov.text) && !/vernier/i.test(ov.text), ov && ov.text.slice(0, 200));
  await closeOv();

  console.log('\n-- back to Grade 9');
  const at9 = await atGrade(9);
  const s9 = await ev(`({ eyebrow: document.querySelector('.lab-measure .lab-eyebrow').textContent.trim(), guides: [...document.querySelectorAll('.lab-start [data-guide]')].map(b => b.dataset.guide),
    missions: [...document.querySelectorAll('.lab-start [data-mission]')].map(b => b.dataset.mission), insts: [...document.querySelectorAll('#lab-panel [data-inst]')].map(b => b.dataset.inst),
    found: document.getElementById('lab-found-n').textContent, say: !!document.querySelector('[data-act="say-coach"]'), uselect: !!document.getElementById('lab-measure-uselect') })`);
  const exp9 = await ev(`(() => { const D = LabMeasureData; return { g: D.forGrade(D.GUIDES, 9).map(x => x.id), m: D.forGrade(D.MISSIONS, 9).map(x => x.id) }; })()`);
  ok('Grade 9 again: “Physics · Grade 9”, its own guides, missions and shelf - none of Grade 4’s',
     at9.up && at9.registered && s9.eyebrow === 'Physics · Grade 9' && s9.guides.join() === exp9.g.join() && s9.missions.join() === exp9.m.join()
     && s9.insts.includes('rule') && !s9.insts.some(i => ['ruler30', 'tape', 'jug', 'thermo4', 'scale4', 'watch4'].includes(i)), s9);
  ok(`…its ✨ counter still reads ${ids.length}/${ids.length}: Grade 4 progress did not touch it`, s9.found === `${ids.length}/${ids.length}`, s9.found);
  ok('…no unit picker and no 🔊 at Grade 9 (unchanged)', !s9.say && !s9.uselect);
  ok('…and the Grade 4 progress is still saved beside it', await ev("!!Labs.store('measure').guides.g4_ruler && Labs.store('measure').missions.g4_read.stars === 3 && !!Labs.store('measure').disc.g4_repeat"));

  await ev("showScreen('student-home'); true");
  await sleep(300);
  ok('leaving the screen stops the lab loop without errors', errors.length === 0);
  ok('no page errors along the way', errors.length === 0, errors.slice(0, 5));

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
