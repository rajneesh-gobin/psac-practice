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
// ⚠ Port 9404 is this lab's; the other lab builds use 9401-9403.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9404;
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
    const off = [...document.querySelectorAll('#labs-root button, #labs-root canvas, #labs-root input')]
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
     await ev("!!Labs.store('measure').disc.vernier_read && document.getElementById('lab-found-n').textContent === Object.keys(Labs.store('measure').disc).length + '/' + LabMeasureData.DISCOVERIES.length"));
  ok('back on the Bench tab, the start panel shows it done', await ev("/✓ done/.test(document.querySelector('.lab-start').textContent)"));

  // ── Every instrument draws at every zoom ────────
  console.log('\n-- drawing');
  const drawn = await ev(`(() => { const out = []; const D = LabMeasureData;
    for (const i of Object.keys(D.INSTRUMENTS)) for (const s of [null, ...D.specimensFor(i)]) {
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
  ok('the Discoveries tab lists all of them, found ones and clues', await ev("document.querySelectorAll('.lab-found-card').length === LabMeasureData.DISCOVERIES.length && document.querySelectorAll('.lab-found-card.is-found').length >= 5 && /Clue:/.test(document.querySelector('.lab-found').textContent)"));
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
  const answerAll = idx => ev(`(() => {
    const qs = LabMeasureData.MISSIONS[${idx}].quiz;
    for (let i = 0; i < qs.length; i++) {
      const card = document.querySelector('#lab-overlay .lab-ov-card');
      const q = card.querySelector('.lab-quiz-q').textContent;
      const def = qs.find(x => x.q === q);
      const btn = [...card.querySelectorAll('.lab-quiz-opt')].find(b => b.lastElementChild.textContent === def.options[0]);
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
  const ids = await ev('LabMeasureData.DISCOVERIES.map(d => d.id)');
  const unsolved = [];
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
  ok('the ✨ counter reads all of them', await ev("document.getElementById('lab-found-n').textContent === LabMeasureData.DISCOVERIES.length + '/' + LabMeasureData.DISCOVERIES.length"));

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

  await ev("showScreen('student-home'); true");
  await sleep(300);
  ok('leaving the screen stops the lab loop without errors', errors.length === 0);
  ok('no page errors along the way', errors.length === 0, errors.slice(0, 5));

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
