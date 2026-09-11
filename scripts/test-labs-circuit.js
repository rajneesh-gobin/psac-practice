'use strict';
// Science Labs › Circuit Board, driven in a real browser.
//
// Proves the board end to end: it loads its own files only when opened, the
// start panel says what to do, all three guided experiments finish with the
// right meter readings, parts are placed by tap (palette → space) and by mouse
// drag, ✋ closes a switch, every discovery unlocks by following its own "Show
// me how", the short-circuit hazard and all four "what went wrong" cards show
// (and the board recovers), both missions reach three stars, the charge dots
// move, Calm Mode applies at once, and the board fits a 360px phone.
//
// Then the PSAC levels (LAB_SPEC §8-§9), at Grade 4 and at Grade 6: the
// eyebrow says "Science · Grade n", only that grade's guides, missions and
// discoveries show (not Grade 9's, not the other primary grade's), its
// counter counts only its own set, every guide runs and every discovery
// unlocks by its own "Show me how", the short circuit (HOT) and the three
// ⚠️ safety cards (ELECTRIC) and every "what went wrong" card show, both
// missions reach three stars, read-aloud 🔊 speaks only when tapped and stops
// on a step change, an overlay, leaving the screen and closing the lab, Calm
// Mode, and 360px.
//
// Then Grade 7 (NCE, g7s-electricity): "Science · Grade 7", every component
// with its symbol, 📝 readings and the ⚠️ row; only Grade 7's guides, missions
// and discoveries; every guide runs; its own wording on the short circuit,
// the three ⚠️ cards and all six "what went wrong" cards (a break, no cell,
// cells facing each other, a burnt-out lamp, the ammeter across the lamp, the
// voltmeter in the loop); no Q = It / V = IR on a reading; the three missions
// (build it from the diagram, series and parallel, measure it) to three stars;
// every discovery by its own "Show me how", "📝 In your exams" on a found card;
// Calm Mode and 360px. Finally Grade 9 again: untouched by any of it.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-circuit.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
// ⚠ Debugging port 9421 - the other lab builds use their own.
// ⚠ Until the lead lists a grade on the circuit row of Labs.LABS,
//   Labs.grade() answers 9 for this lab whatever the pupil's grade. atGrade()
//   then overrides Labs.grade (and prints a NOTE); once registered it takes the
//   real path with no edit here. The shared card's exam heading comes from
//   Labs' own grade, so "In the PSAC exam" / "In your exams" is only asserted
//   once registered.
// ⚠ The Chrome profile goes in $LAB_SCRATCH (a scratch folder), not the repo.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9421;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0, d;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); } };
const near = (a, b, e = 0.006) => Math.abs(a - b) < e;

const scratch = process.env.LAB_SCRATCH || os.tmpdir();
fs.mkdirSync(scratch, { recursive: true });
const profile = fs.mkdtempSync(path.join(scratch, 'psac-labs-circuit-'));
const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--remote-debugging-port=' + DBG, '--user-data-dir=' + profile,
  '--allow-file-access-from-files', '--no-first-run', '--hide-scrollbars', 'about:blank',
], { stdio: 'ignore' });
const quit = code => {
  try { chrome.kill(); } catch (_) {}
  setTimeout(() => { try { fs.rmSync(profile, { recursive: true, force: true }); } catch (_) {} process.exit(code); }, 500);
};

(async () => {
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
  const dbg = () => ev('LabCircuit._debug()');
  const overlay = () => ev(`(() => { const o = document.getElementById('lab-overlay'); if (!o) return null;
    return { cls: o.className, text: o.textContent.replace(/\\s+/g, ' ').slice(0, 3000),
             signs: [...o.querySelectorAll('.lab-sign figcaption')].map(f => f.textContent) }; })()`);
  const closeOv = () => click('#lab-overlay [data-ov-close]');
  const L = js => ev(`(() => { ${js}; return true; })()`);
  const speech = () => ev('({ spoken: window.__speech.spoken.slice(), cancels: window.__speech.cancels })');

  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof openLabs === 'function' && typeof RoleModules !== 'undefined'"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url + ', not the file we navigated to.'); quit(1); return; }
  ok('app loaded', ready === true);
  await sleep(2500);
  // speechSynthesis is stubbed so the test can see every speak() and cancel().
  await ev(`(() => { window.__speech = { spoken: [], cancels: 0 };
    const stub = { speaking: false, pending: false, getVoices: () => [],
      speak(u) { window.__speech.spoken.push({ text: u.text, lang: u.lang }); }, cancel() { window.__speech.cancels++; } };
    Object.defineProperty(window, 'speechSynthesis', { value: stub, configurable: true }); return true; })()`);

  // ── Opening the board ─────────────────────────
  console.log('\n-- opening the Circuit Board (Grade 9)');
  await ev("SELECTED_GRADE = 9; openLabs(); true");
  let hub = false;
  for (let i = 0; i < 40 && !hub; i++) { await sleep(250); hub = await ev("typeof Labs !== 'undefined' && !!document.querySelector('#labs-root .lab-hub')"); }
  ok('Grade 9: the Labs hub renders', hub);
  const labScripts = () => ev("[...document.scripts].map(s => s.src).filter(s => /engine\\/labs\\//.test(s)).map(s => s.split('/').pop()).join()");
  ok('no Circuit Board code before it is opened', !/lab_circuit/.test(await labScripts()), await labScripts());
  await ev("Labs.openLab('circuit'); true");
  let up = false;
  for (let i = 0; i < 60 && !up; i++) { await sleep(200); up = await ev("typeof window.LabCircuit !== 'undefined' && !!document.querySelector('#labs-root .lab-circuit')"); }
  ok("Labs.openLab('circuit') loads LabCircuit and renders the board", up);
  ok('it fetched its own data file, then the bench', /lab_circuit_data\.js,lab_circuit\.js/.test(await labScripts()), await labScripts());
  await sleep(500);
  ok('lab_circuit.css is linked and styles the palette', await ev("!!document.querySelector('link[data-lab-css=\"circuit\"]') && getComputedStyle(document.querySelector('.lab-circuit-palette')).display === 'grid'"));
  let ov = await overlay();
  ok('first visit shows the welcome card with “Show me how”', ov && /Welcome to the Circuit Board/.test(ov.text) && /Show me how/.test(ov.text), ov);
  await closeOv();
  ok('the welcome is remembered', await ev("Labs.store('circuit').intro === true"));
  ok('the top bar has back, the symbols/picture toggle and help', await ev("!!document.querySelector('.lab-circuit [data-act=\"hub\"]') && !!document.getElementById('lab-circuit-view') && !!document.querySelector('.lab-circuit [data-act=\"help\"]')"));
  ok('Grade 9: the eyebrow says “Physics · Grade 9”, with no read-aloud, no ⚠️ safety row and no things-to-test',
     await ev("document.querySelector('.lab-circuit .lab-eyebrow').textContent === 'Physics · Grade 9' && !document.querySelector('[data-act=\"say-coach\"]') && !document.querySelector('.lab-circuit-safety') && !document.querySelector('#lab-circuit-palette [data-tool=\"spoon\"]')"));
  ok('17 spaces on the board are real buttons', await ev("document.querySelectorAll('#lab-circuit-slots button.lab-circuit-slot').length === 17"));
  ok('the shelf shows every component with its picture AND its standard symbol', await ev("document.querySelectorAll('.lab-circuit-kind').length === 8 && [...document.querySelectorAll('.lab-circuit-kind')].every(b => b.querySelector('.lab-circuit-pic') && b.querySelector('svg'))"));
  await ev('LabCircuit._test({ instant: true }); true');

  // ── Start panel and a guided experiment ─────────
  console.log('\n-- what to do here');
  ok('the Bench tab opens with “What would you like to do?”, 3 guided experiments and 2 missions',
     await ev("/What would you like to do/.test(document.querySelector('.lab-start').textContent) && document.querySelectorAll('.lab-start [data-guide]').length === 3 && document.querySelectorAll('.lab-start [data-mission]').length === 2"));
  const guideState = () => ev(`(() => { const g = document.getElementById('lab-guide');
    return { box: !g.hidden, text: g.textContent.replace(/\\s+/g, ' '),
             next: [...document.querySelectorAll('.is-next')].map(n => n.id || n.getAttribute('data-slot') || n.getAttribute('data-tool') || n.getAttribute('data-act')),
             start: !!document.querySelector('.lab-start') }; })()`);
  await click('.lab-start [data-guide="light"]');
  let gs = await guideState();
  ok('Light a bulb: step 1 of 5 lays out the circuit', gs.box && /Step 1 of 5/.test(gs.text) && /Lay out the circuit/.test(gs.text) && !gs.start, gs);
  await click('[data-guide-do]');
  gs = await guideState();
  ok('step 2: the gap on the right glows, and so does the wire in the palette', /Step 2 of 5/.test(gs.text) && gs.next.includes('v31') && gs.next.includes('wire'), gs);
  d = await dbg();
  ok('…with the gap there is no current', d.cellI < 1e-6 && !d.layout.v31);
  await click('[data-guide-do]');
  gs = await guideState();
  ok('step 3: close the switch - and the switch glows', /Step 3 of 5/.test(gs.text) && gs.next.includes('v00'), gs);
  await click('[data-guide-do]');
  d = await dbg();
  ok('switch closed: the bulb lights at normal brightness with 0.50 A', d.bulbs.h12.lit && near(d.bulbs.h12.I, 0.5) && near(d.bulbs.h12.b, 1, 0.01), d.bulbs);
  gs = await guideState();
  ok('step 4: open it again', /Step 4 of 5/.test(gs.text), gs);
  await click('[data-guide-do]');
  ok('switch open: no current', (await dbg()).cellI < 1e-6);
  gs = await guideState();
  ok('step 5: the ✏️ symbols toggle glows', /Step 5 of 5/.test(gs.text) && gs.next.includes('lab-circuit-view'), gs);
  await click('[data-guide-do]');
  ov = await overlay();
  ok('it completes, with “What you found out”', ov && /Experiment complete/.test(ov.text) && /What you found out/.test(ov.text) && /COMPLETE/.test(ov.text), ov);
  ok('…remembered, and offers the next one', await ev("!!Labs.store('circuit').guides.light") && /Next: Series or parallel/.test(ov.text));
  ok('the board is now in circuit-diagram view', (await dbg()).view === 'symbols');
  ok('the notebook logged the switch', /Switch closed/.test(await ev("document.getElementById('lab-notebook').textContent")));
  await click('#lab-overlay [data-guide="sp"]');
  const runGuide = () => ev(`(() => { for (let k = 0; k < 24 && LabCircuit._debug().guide; k++) {
      const c = document.querySelector('#lab-overlay.is-hazard, #lab-overlay.is-result'); if (c) return 'card: ' + c.textContent.replace(/\\s+/g, ' ').slice(0, 90);
      const b = document.querySelector('#lab-guide [data-guide-do]'); if (b) b.click(); else LabCircuit._tick(6); }
    const o = document.getElementById('lab-overlay'); return o ? o.textContent.replace(/\\s+/g, ' ') : 'no overlay'; })()`);
  let txt = await runGuide();
  ok('“Series or parallel?” runs to the end', /Experiment complete/.test(txt) && /SERIES/.test(txt) && /PARALLEL/.test(txt), txt.slice(0, 200));
  d = await dbg();
  ok('…ending with the parallel bulb still lit at full brightness', d.bulbs.h11.lit && near(d.bulbs.h11.b, 1, 0.01) && !d.bulbs.h12.lit, d.bulbs);
  await closeOv();
  await ev("LabCircuit.startGuide('meters'); true");
  txt = await runGuide();
  ok('“Measure current and voltage” runs to the end', /Experiment complete/.test(txt) && /3 Ω/.test(txt), txt.slice(0, 200));
  d = await dbg();
  const last2 = d.readings.slice(-2);
  ok('…its readings: 0.50 A / 1.50 V with one cell, 1.00 A / 3.00 V with two', last2.length === 2 && last2[0].amps[0] === 0.5 && last2[0].volts[0] === 1.5 && last2[1].amps[0] === 1 && last2[1].volts[0] === 3, last2);
  ok('the readings table shows them', /1\.00 A/.test(await ev("document.querySelector('#lab-notebook table').textContent")));
  await closeOv();
  ok('all three guides are ticked off on the start panel', (await ev("document.querySelectorAll('.lab-start .lab-start-card.is-done').length")) === 3);

  // ── Building by hand ────────────────────────────
  console.log('\n-- building by hand');
  await click('.lab-circuit-actions [data-act="clear"]');
  ok('Clear the board empties it', Object.keys((await dbg()).layout).length === 0);
  await click('#lab-circuit-palette [data-tool="cell"]');
  ok('picking a part marks it pressed and shows the empty spaces', await ev("document.querySelector('#lab-circuit-palette [data-tool=\"cell\"]').getAttribute('aria-pressed') === 'true' && document.getElementById('lab-circuit-slots').classList.contains('is-placing')"));
  await click('[data-slot="h00"]');
  ok('tapping a space places the part there', (await dbg()).layout.h00?.kind === 'cell');
  ok('…and the space says so to a screen reader', /top row, left: cell/.test(await ev("document.querySelector('[data-slot=\"h00\"]').getAttribute('aria-label')")));
  await click('[data-build="single"]');
  await click('#lab-circuit-palette [data-tool="hand"]');
  await click('[data-slot="v00"]');
  d = await dbg();
  ok('✋ on the switch closes it and the bulb lights', d.layout.v00.open === false && d.bulbs.h12.lit, d.layout.v00);
  await click('#lab-circuit-palette [data-tool="eraser"]');
  await click('[data-slot="v31"]');
  ok('🧽 Remove takes a wire off - the bulb goes out', !(await dbg()).layout.v31 && !(await dbg()).bulbs.h12.lit);
  await click('.lab-circuit-actions [data-act="undo"]');
  ok('↩️ Undo puts it back - lit again', (await dbg()).bulbs.h12.lit);
  // mouse drag: a bulb from the palette onto a space
  const pos = await ev(`(() => { const a = document.querySelector('#lab-circuit-palette [data-tool="bulb"]').getBoundingClientRect();
    const s = document.querySelector('[data-slot="h11"]'); s.scrollIntoView({ block: 'center' }); const a2 = document.querySelector('#lab-circuit-palette [data-tool="bulb"]').getBoundingClientRect(); const b = s.getBoundingClientRect();
    return { ax: a2.left + a2.width / 2, ay: a2.top + a2.height / 2, bx: b.left + b.width / 2, by: b.top + b.height / 2 }; })()`);
  await call('Input.dispatchMouseEvent', { type: 'mousePressed', x: pos.ax, y: pos.ay, button: 'left', clickCount: 1 });
  await call('Input.dispatchMouseEvent', { type: 'mouseMoved', x: (pos.ax + pos.bx) / 2, y: (pos.ay + pos.by) / 2, button: 'left', buttons: 1 });
  await call('Input.dispatchMouseEvent', { type: 'mouseMoved', x: pos.bx, y: pos.by, button: 'left', buttons: 1 });
  await call('Input.dispatchMouseEvent', { type: 'mouseReleased', x: pos.bx, y: pos.by, button: 'left', clickCount: 1 });
  ok('with a mouse, dragging a bulb from the palette onto a space places it', (await dbg()).layout.h11?.kind === 'bulb', { pos, layout: (await dbg()).layout.h11 });

  // ── Mistakes that teach ────────────────────────
  console.log('\n-- mistakes');
  await L("LabCircuit.build('single'); LabCircuit.toggleSwitch(true); LabCircuit.place('v11','wire'); LabCircuit.place('v21','wire')");
  ok('two stub wires on their own change nothing - still lit', (await dbg()).bulbs.h12.lit);
  await L("LabCircuit.place('h11','wire')");
  ov = await overlay();
  d = await dbg();
  ok('a wire across the bulb: short circuit - the bulb goes dark and a huge current flows', d.short && d.cellI > 20 && !d.bulbs.h12.lit, { short: d.short, I: d.cellI });
  ok('…HOT SURFACE hazard card', ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Hot surface') && /Short circuit/.test(ov.text), ov);
  ok('…which says what happened, why, what to do instead and the exam point',
     ov && /What happened/.test(ov.text) && /Why it’s dangerous/.test(ov.text) && /Do this instead/.test(ov.text) && /On the NCE paper/.test(ov.text));
  await closeOv();
  d = await dbg();
  ok('closing it takes the shorting wire back off, and the bulb lights again', !d.layout.h11 && !d.short && d.bulbs.h12.lit, d.layout.h11);
  ok('…and the hazard is counted', await ev("Labs.store('circuit').hazards.short_circuit >= 1"));
  await L("LabCircuit.place('h11','ammeter')");
  ov = await overlay();
  ok('an ammeter across the bulb: “What went wrong” card - it belongs in series', ov && /is-result/.test(ov.cls) && /ammeter is across the bulb/.test(ov.text) && /IN SERIES/.test(ov.text) && /What you should have done/.test(ov.text), ov);
  await closeOv();
  ok('…and the meter comes back off', !(await dbg()).layout.h11);
  await L("LabCircuit.build('single'); LabCircuit.toggleSwitch(true); LabCircuit.place('h20','voltmeter')");
  ov = await overlay();
  d = await dbg();
  ok('a voltmeter in the loop: the bulb goes out and the card quotes its 1.50 V', ov && /voltmeter is in the loop/.test(ov.text) && /1\.50 V/.test(ov.text) && !d.bulbs.h12.lit && near(d.meters.h20, 1.5), ov);
  await closeOv();
  await L("LabCircuit.build('gap'); LabCircuit.toggleSwitch(true)");
  ov = await overlay();
  ok('closing the switch on a circuit with a gap: “the circuit has a gap” card', ov && /is-result/.test(ov.cls) && /has a gap/.test(ov.text) && /Physics 2025 Q6\(b\)\(iv\)/.test(ov.text), ov);
  await closeOv();
  await L("LabCircuit.build('twocells'); LabCircuit.toggleSwitch(true); LabCircuit.place('h20','cell')");
  ov = await overlay();
  d = await dbg();
  ok('three cells on one bulb: it blows - card with 3 cells and 4.5 V', ov && /bulb blew/.test(ov.text) && /3 cells \(4\.5 V\)/.test(ov.text) && d.layout.h12.blown && !d.bulbs.h12.lit, ov);
  await closeOv();
  await L("LabCircuit.place('h20','wire'); LabCircuit.setTool('hand'); LabCircuit.tapSlot('h12')");
  d = await dbg();
  ok('a wire in place of the third cell, then ✋ fits a new bulb: with two cells it lights very bright', d.bulbs.h12.lit && !d.layout.h12.blown && d.bulbs.h12.b > 3, { b: d.bulbs.h12, l: d.layout.h12 });

  // ── Missions ───────────────────────────────────
  console.log('\n-- missions');
  const answerAll = id => ev(`(() => {
    const qs = LabCircuitData.MISSIONS.find(m => m.id === '${id}').quiz;
    for (let i = 0; i < qs.length; i++) {
      const card = document.querySelector('#lab-overlay .lab-ov-card');
      const q = card.querySelector('.lab-quiz-q').textContent;
      const def = qs.find(x => x.q === q);
      const want = typeof def.options[0] === 'object' ? def.options[0].label : def.options[0];
      const btn = [...card.querySelectorAll('.lab-quiz-opt')].find(b => b.lastElementChild.textContent === want);
      btn.click();
      card.querySelector('[data-next]').click();
    }
    const done = document.querySelector('#lab-overlay .lab-done .lab-stars');
    return done ? done.getAttribute('aria-label') : 'no result card';
  })()`);
  const buildLight = "['h00:cell','h10:wire','h20:ammeter','v30:wire','v31:wire','h22:wire','h12:bulb','h02:wire','v01:wire','v00:switch'].forEach(x => { const [s, k] = x.split(':'); LabCircuit.place(s, k); })";
  await ev("LabCircuit.startMission('light'); true");
  ok('Light the bulb starts on an empty board', Object.keys((await dbg()).layout).length === 0);
  await L("LabCircuit.build('single')");
  ok('…and will not let a ready-made layout do it for you', Object.keys((await dbg()).layout).length === 0);
  await L(buildLight);
  ok('built part by part: all four parts ticked, the loop ticked', (await ev("document.querySelectorAll('#lab-mission .lab-steps li.is-done').length")) === 2);
  await L("LabCircuit.toggleSwitch(true); LabCircuit.read()");
  d = await dbg();
  ok('switch closed and a reading taken: 0.50 A in series completes it', d.mission.success && d.mission.read && !d.mission.mistakes && !d.mission.hazards, d.mission);
  ok('the mission panel ticks every step', await ev("document.querySelectorAll('#lab-mission .lab-steps li.is-done').length === 4"));
  await click('[data-act="quiz"]');
  ok('all answers right and no mistakes: 3 stars', (await answerAll('light')) === '3 of 3 stars');
  ok('the stars are saved', await ev("Labs.store('circuit').missions.light.stars === 3"));
  await closeOv();

  await ev("LabCircuit.startMission('compare'); true");
  await click('#lab-mission [data-build="series_amm"]');
  await L("LabCircuit.toggleSwitch(true); LabCircuit.read(); LabCircuit.setBulb('h12', true)");
  d = await dbg();
  ok('Series or parallel: the series reading is 0.25 A and unscrewing puts both out', d.mission.series === 0.25 && d.mission.sBreak && !d.mission.success, d.mission);
  await click('#lab-mission [data-build="parallel_amm"]');
  await L("LabCircuit.toggleSwitch(true); LabCircuit.read(); LabCircuit.setBulb('h12', true)");
  d = await dbg();
  ok('…the parallel reading is 1.00 A, one bulb keeps shining, and the mission is complete', d.mission.parallel === 1 && d.mission.pBreak && d.mission.success, d.mission);
  await click('[data-act="quiz"]');
  ok('Series or parallel: 3 stars', (await answerAll('compare')) === '3 of 3 stars');
  await closeOv();
  await ev("LabCircuit.startMission('light'); true");
  await L(buildLight.replace("'h20:ammeter'", "'h20:voltmeter'") + "; LabCircuit.toggleSwitch(true)");
  ov = await overlay();
  ok('a voltmeter in the loop during the mission shows its card', ov && /voltmeter is in the loop/.test(ov.text));
  await closeOv();
  await L("LabCircuit.place('h20','ammeter'); LabCircuit.read()");
  await click('[data-act="quiz"]');
  ok('a wiring mistake during the mission costs a star: 2 stars (best of 3 is kept)', (await answerAll('light')) === '2 of 3 stars' && await ev("Labs.store('circuit').missions.light.stars === 3"));
  await closeOv();

  // ── Discoveries ────────────────────────────────
  // Every discovery at the grade on the bench unlocks by its own "Show me how".
  const unlockAll = async () => {
    const discIds = await ev('LabCircuitData.forGrade(LabCircuitData.DISCOVERIES, LabCircuit._debug().grade).map(d => d.id)');
    const unsolved = [];
    for (const id of discIds) {
      const res = await ev(`(() => {
        const st = Labs.store('circuit'); delete st.disc['${id}'];
        document.getElementById('lab-overlay')?.remove();
        LabCircuit.discoveryGuide('${id}');
        for (let k = 0; k < 24 && LabCircuit._debug().guide; k++) {
          const hz = document.querySelector('#lab-overlay.is-hazard, #lab-overlay.is-result');
          if (hz) return 'card: ' + hz.textContent.replace(/\\s+/g, ' ').slice(0, 90);
          const btn = document.querySelector('#lab-guide [data-guide-do]');
          if (btn) btn.click(); else LabCircuit._tick(6);
        }
        if (LabCircuit._debug().guide) return 'guide never finished at step ' + LabCircuit._debug().guide.step;
        document.getElementById('lab-overlay')?.remove();
        return !!st.disc['${id}'];
      })()`);
      if (res !== true) unsolved.push(id + ' → ' + res);
    }
    return { discIds, unsolved };
  };
  const counter = g => ev(`(() => { const set = LabCircuitData.forGrade(LabCircuitData.DISCOVERIES, ${g}), st = Labs.store('circuit');
    return { shown: document.getElementById('lab-found-n').textContent, saved: set.filter(x => st.disc[x.id]).length + '/' + set.length }; })()`);

  console.log('\n-- discoveries');
  await click('[data-panel="found"]');
  ok('the Discoveries tab lists every Grade 9 card', await ev("document.querySelectorAll('.lab-found-card').length === LabCircuitData.forGrade(LabCircuitData.DISCOVERIES, 9).length && document.querySelectorAll('.lab-found-card.is-found').length >= 8"));
  await ev("Labs.store('circuit').disc.first_light = Labs.store('circuit').disc.first_light || Date.now(); true");
  await click('[data-panel="sandbox"]'); await click('[data-panel="found"]');
  await click('.lab-found-card.is-found[data-disc="first_light"]');
  ov = await overlay();
  ok('a found card: what you saw, the rule, why, the paper, “Do it again”',
     ov && /What you saw/.test(ov.text) && /The rule/.test(ov.text) && /Why it happens/.test(ov.text) && /Physics 2025 Q6\(b\)\(iv\)/.test(ov.text) && /Do it again/.test(ov.text), ov);
  await closeOv();
  await ev("delete Labs.store('circuit').disc.cells_oppose; true");
  await click('[data-panel="sandbox"]'); await click('[data-panel="found"]');
  await click('.lab-found-card[data-disc="cells_oppose"]');
  ov = await overlay();
  ok('a locked card: the clue, “How to find it” and “Show me how”', ov && /Locked discovery/.test(ov.text) && /How to find it/.test(ov.text) && /Show me how/.test(ov.text), ov);
  await click('#lab-overlay [data-disc-go]');
  ok('“Show me how” starts a guide from its recipe', (await dbg()).guide && (await dbg()).guide.id === 'disc-cells_oppose');
  await ev("document.querySelector('[data-act=\"guide-stop\"]').click(); true");
  let un = await unlockAll();
  ok(`all ${un.discIds.length} Grade 9 discoveries unlock by following their own “Show me how” (with no hazard or wrong-card on the way)`, un.unsolved.length === 0, un.unsolved);
  let cnt = await counter(9);
  ok('the ✨ counter matches what is saved', cnt.shown === cnt.saved, cnt);
  await L("LabCircuit.build('meters'); LabCircuit.toggleSwitch(true); LabCircuit._tick(10); LabCircuit.read()");
  const nbText = await ev("document.querySelector('#lab-notebook .lab-log li').textContent.replace(/\\s+/g, ' ')");
  ok('a reading after 10 s at 0.50 A logs Q = It = 5.0 C and W = QV = 7.5 J', /Q = It = 0\.50 A × 10 s = 5\.0 C/.test(nbText) && /W = QV = 5\.0 C × 1\.50 V = 7\.5 J/.test(nbText), nbText);
  ok('…and the strip under the board keeps the running total', /Q = It = 5\.0 C/.test(await ev("document.getElementById('lab-circuit-contents').textContent")));

  // ── Motion, calm, phone ─────────────────────────
  console.log('\n-- motion, calm, phone');
  await ev("LabCircuit._test({ instant: false }); LabCircuit.setView('picture'); LabCircuit.build('single'); LabCircuit.toggleSwitch(true); true");
  const c0 = (await dbg()).clock;
  await sleep(1200);
  const c1 = (await dbg()).clock;
  ok('with animation on, the charge dots move (the loop is running)', c1 - c0 > 0.5, { c0, c1 });
  const px = () => ev("(() => { const c = document.getElementById('lab-circuit-canvas'); const p = c.getContext('2d').getImageData(4, 4, 1, 1).data; return [p[0], p[1], p[2], p[3]]; })()");
  const pic = await px();
  await ev("LabCircuit.setView('symbols'); true"); await sleep(200);
  const symv = await px();
  ok('the canvas draws the board, and the symbols view is a different (paper) picture', pic[3] > 0 && symv[3] > 0 && (pic[0] !== symv[0] || pic[2] !== symv[2]), { pic, symv });
  await ev("LabCircuit.setView('picture'); true");
  await ev("document.documentElement.classList.add('kid-calm'); true");
  await L("LabCircuit.place('v11','wire'); LabCircuit.place('v21','wire'); LabCircuit.place('h11','wire')");
  ov = await overlay();
  ok('in Calm Mode the short-circuit hazard applies at once (no animation first)', ov && ov.signs.includes('Hot surface'), ov);
  await closeOv();
  const k0 = (await dbg()).clock; await sleep(600); const k1 = (await dbg()).clock;
  ok('in Calm Mode the charge dots stand still', k1 === k0, { k0, k1 });
  await ev("document.documentElement.classList.remove('kid-calm'); true");

  const fitCheck = () => ev(`(() => { const vw = innerWidth;
      const off = [...document.querySelectorAll('#labs-root button, #labs-root canvas')]
        .filter(e => e.getClientRects().length && (e.getBoundingClientRect().right > vw + 0.5 || e.getBoundingClientRect().left < -0.5))
        .map(e => (e.getAttribute('data-slot') || e.getAttribute('data-tool') || e.getAttribute('data-panel') || e.getAttribute('data-act') || e.tagName) + ' → ' + Math.round(e.getBoundingClientRect().right));
      const small = [...document.querySelectorAll('#labs-root .lab-circuit-palette button, #labs-root .lab-circuit-actions button, #labs-root .lab-top button, #labs-root .lab-circuit-slot, #labs-root .lab-tabs button, #labs-root .lab-coach button, #labs-root #lab-guide .lab-circuit-say, #labs-root .lab-start button')]
        .filter(e => e.getClientRects().length && (e.getBoundingClientRect().height < 43.5 || e.getBoundingClientRect().width < 43.5)).map(e => e.getAttribute('data-slot') || e.getAttribute('data-act') || e.textContent.trim().slice(0, 20));
      const r = [...document.querySelectorAll('.lab-circuit-slot')].map(b => b.getBoundingClientRect());
      let overlap = 0; for (let i = 0; i < r.length; i++) for (let j = i + 1; j < r.length; j++) {
        const w = Math.min(r[i].right, r[j].right) - Math.max(r[i].left, r[j].left), h = Math.min(r[i].bottom, r[j].bottom) - Math.max(r[i].top, r[j].top);
        if (w > 1 && h > 1) overlap++; }
      const cv = document.getElementById('lab-circuit-canvas').getBoundingClientRect();
      const outside = r.filter(b => b.left < cv.left - 0.5 || b.right > cv.right + 0.5 || b.top < cv.top - 0.5 || b.bottom > cv.bottom + 0.5).length;
      return { vw, root: document.getElementById('labs-root').scrollWidth, off, small, overlap, outside }; })()`);
  const fitOk = fit => fit.root <= fit.vw && fit.off.length === 0 && fit.small.length === 0 && fit.overlap === 0 && fit.outside === 0;
  for (const [view, panel] of [['picture', 'sandbox'], ['symbols', 'missions'], ['picture', 'found']]) {
    await ev(`LabCircuit.setView('${view}'); true`);
    await click(`[data-panel="${panel}"]`);
    await ev("LabCircuit.build('meters'); LabCircuit.setTool('bulb'); true");
    const fit = await fitCheck();
    ok(`${view} / ${panel}: fits a 360px phone - nothing past the edge, tap targets ≥ 44px, no two spaces overlap`, fitOk(fit), fit);
  }
  const g9found = await ev("LabCircuitData.forGrade(LabCircuitData.DISCOVERIES, 9).filter(x => Labs.store('circuit').disc[x.id]).length");
  const g9stars = await ev("JSON.stringify(Labs.store('circuit').missions)");

  // ══ The PSAC levels ═══════════════════════════
  await ev('window.__labsGrade = Labs.grade; true');
  const atGrade = async n => {
    await ev(`(() => { if (typeof Labs !== 'undefined') { Labs.closeOverlay(true); Labs.backToHub(); } SELECTED_GRADE = ${n}; showScreen('labs'); return true; })()`);
    for (let i = 0; i < 40; i++) { await sleep(150); if (await ev("typeof window.Labs !== 'undefined' && !!document.getElementById('labs-root')")) break; }
    await ev('Labs.grade = window.__labsGrade; Labs.backToHub(); true');
    const registered = await ev(`Labs.labsFor(${n}).some(l => l.id === 'circuit')`);
    if (!registered) {
      console.log(`NOTE Grade ${n}: Labs.LABS does not list Grade ${n} on the circuit row yet, so Labs.grade is overridden to ${n} for this run.`);
      await ev(`Labs.grade = () => ${n}; true`);
    }
    await ev("Labs.openLab('circuit'); true");
    for (let i = 0; i < 60; i++) { await sleep(150); if (await ev(`!!document.querySelector('#labs-root .lab-circuit') && LabCircuit._debug().grade === ${n}`)) break; }
    return registered;
  };

  const primaryRun = async g => {
    const other = g === 4 ? 6 : 4;
    console.log(`\n-- Grade ${g}: opening`);
    const registered = await atGrade(g);
    const sp0 = (await speech()).spoken.length;
    ok(`Grade ${g}: the board opens at Grade ${g}`, (await dbg()).grade === g);
    ov = await overlay();
    const first = await ev(`LabCircuitData.forGrade(LabCircuitData.GUIDES, ${g})[0].id`);
    ok(`Grade ${g}: its own first-visit welcome, whose “Show me how” starts its own first guide`,
       ov && /Welcome to the Circuit Board/.test(ov.text) && /Test things/.test(ov.text) && await ev(`!!document.querySelector('#lab-overlay [data-guide="${first}"]')`), ov);
    ok(`Grade ${g}: nothing was read aloud on its own (no auto-play)`, (await speech()).spoken.length === sp0);
    await closeOv();
    ok(`Grade ${g}: the welcome is remembered for Grade ${g} only`, await ev(`Labs.store('circuit').intro${g} === true`));
    ok(`Grade ${g}: the eyebrow says “Science · Grade ${g}”`, (await ev("document.querySelector('.lab-circuit .lab-eyebrow').textContent")) === `Science · Grade ${g}`);
    ok(`Grade ${g}: the lab assistant has 🔊 read-aloud and 💡; the ⚠️ row has a wall socket, wet hands and a split cable`,
       await ev("!!document.querySelector('.lab-coach [data-act=\"say-coach\"]') && !!document.querySelector('.lab-coach [data-act=\"tip\"]') && ['mains','wet','cable'].every(a => document.querySelector('.lab-circuit-safety [data-act=\"' + a + '\"]'))"));
    ok(`Grade ${g}: parts and six things to test - no meters, no resistor, no fuse, no “Take a reading”`,
       await ev("['hand','wire','cell','bulb','switch','eraser','spoon','coin','lead','rubber','ruler','stick'].every(t => document.querySelector('#lab-circuit-palette [data-tool=\"' + t + '\"]')) && !['ammeter','voltmeter','resistor','fuse'].some(t => document.querySelector('#lab-circuit-palette [data-tool=\"' + t + '\"]')) && !document.querySelector('[data-act=\"read\"]')"));
    ok(`Grade ${g}: ${g === 4 ? 'no symbols view (Grade 4 has no circuit symbols)' : 'the symbols view is there, as an extra'}`,
       (await ev("!!document.getElementById('lab-circuit-view')")) === (g === 6));
    await ev('LabCircuit._test({ instant: true }); true');

    console.log(`\n-- Grade ${g}: only this grade's set`);
    const want = await ev(`({ guides: LabCircuitData.forGrade(LabCircuitData.GUIDES, ${g}).map(x => x.id), missions: LabCircuitData.forGrade(LabCircuitData.MISSIONS, ${g}).map(x => x.id),
      discs: LabCircuitData.forGrade(LabCircuitData.DISCOVERIES, ${g}).map(x => x.id) })`);
    const shown = await ev(`({ guides: [...document.querySelectorAll('.lab-start [data-guide]')].map(b => b.dataset.guide), missions: [...document.querySelectorAll('.lab-start [data-mission]')].map(b => b.dataset.mission) })`);
    ok(`Grade ${g}: the start panel shows exactly its ${want.guides.length} guides and ${want.missions.length} missions - no Grade 9, no Grade ${other}`,
       shown.guides.join() === want.guides.join() && shown.missions.join() === want.missions.join(), { shown, want });
    await click('[data-panel="missions"]');
    const mlist = await ev("[...document.querySelectorAll('.lab-missions [data-mission]')].map(b => b.dataset.mission)");
    ok(`Grade ${g}: the Missions tab lists only its own missions`, mlist.join() === want.missions.join(), mlist);
    await click('[data-panel="found"]');
    const dlist = await ev("[...document.querySelectorAll('.lab-found-card')].map(b => b.dataset.disc)");
    cnt = await counter(g);
    ok(`Grade ${g}: the Discoveries tab lists only its ${want.discs.length} cards, and its counter starts at 0 although Grade 9's are all found`,
       dlist.join() === want.discs.join() && cnt.shown === `0/${want.discs.length}` && g9found > 0, { dlist, cnt, g9found });
    await click('[data-panel="sandbox"]');

    console.log(`\n-- Grade ${g}: a guided experiment and read-aloud`);
    await click(`.lab-start [data-guide="${first}"]`);
    gs = await guideState();
    const say0 = await ev(`LabCircuitData.GUIDES.find(x => x.id === '${first}').steps[0].say`);
    ok(`Grade ${g}: step 1 is in the yellow box, with a 🔊 button`, gs.box && /Step 1 of/.test(gs.text) && gs.text.includes(say0) && await ev("!!document.querySelector('#lab-guide [data-act=\"say-guide\"]')"), gs);
    await click('#lab-guide [data-act="say-guide"]');
    let sp = await speech();
    ok(`Grade ${g}: 🔊 on the guide box reads the step aloud, in English`, sp.spoken.length === sp0 + 1 && sp.spoken[sp.spoken.length - 1].text === say0 && /^en/.test(sp.spoken[sp.spoken.length - 1].lang), sp.spoken.slice(-1));
    const cA = sp.cancels;
    await click('[data-guide-do]');
    ok(`Grade ${g}: …and the next step cancels the speech`, (await speech()).cancels > cA);
    txt = await runGuide();
    ok(`Grade ${g}: “${await ev(`LabCircuitData.GUIDES.find(x => x.id === '${first}').title`)}” runs to the end with “What you found out”`, /Experiment complete/.test(txt) && /What you found out/.test(txt), txt.slice(0, 160));
    await closeOv();
    for (const id of want.guides.slice(1)) {
      await ev(`LabCircuit.startGuide('${id}'); true`);
      txt = await runGuide();
      ok(`Grade ${g}: guide ${id} runs to the end, with no card on the way`, /Experiment complete/.test(txt), txt.slice(0, 160));
      await closeOv();
    }
    ok(`Grade ${g}: every guide is ticked off on the start panel`, (await ev("document.querySelectorAll('.lab-start .lab-start-card.is-done').length")) === want.guides.length);
    const coachText = await ev("document.getElementById('lab-coach-text').textContent");
    await click('[data-act="say-coach"]');
    sp = await speech();
    const lastSp = sp.spoken[sp.spoken.length - 1];
    ok(`Grade ${g}: 🔊 on the lab assistant reads its words aloud (emoji left out)`, lastSp && lastSp.text.length > 5 && coachText.includes(lastSp.text.slice(0, 12)) && !/[\u{1F300}-\u{1FAFF}]/u.test(lastSp.text), { coachText, lastSp });
    const cB = sp.cancels;
    await click('.lab-circuit [data-act="help"]');
    ok(`Grade ${g}: opening an overlay cancels the speech`, (await speech()).cancels > cB);
    ov = await overlay();
    ok(`Grade ${g}: the help card explains the words (circuit, conductor, insulator, short circuit) and the safety rules`,
       ov && /Words to know/.test(ov.text) && /Conductor/.test(ov.text) && /Insulator/.test(ov.text) && /Short circuit/.test(ov.text) && /Stay safe/.test(ov.text) && /Symbols \(an extra\)/.test(ov.text) === (g === 6), ov && ov.text.slice(0, 200));
    await closeOv();

    console.log(`\n-- Grade ${g}: testing things`);
    await L("LabCircuit.build('tester')");
    await click('#lab-circuit-palette [data-tool="coin"]');
    await click('[data-slot="v31"]');
    await L("LabCircuit.toggleSwitch(true)");
    d = await dbg();
    ok(`Grade ${g}: a coin, picked from the palette and tapped into the gap, lights the bulb - “conductor” in the notebook`,
       d.layout.v31.kind === 'coin' && d.bulbs.h12.lit && d.tests.coin === 'conductor' && /conductor/.test(await ev("document.getElementById('lab-notebook').textContent")), d.tests);
    await L("LabCircuit.place('v31', 'rubber')");
    d = await dbg();
    ov = await overlay();
    ok(`Grade ${g}: the rubber leaves the bulb dark - an insulator, and no “gap” card (it is a test, not a mistake)`,
       !d.bulbs.h12.lit && d.tests.rubber === 'insulator' && !ov && /insulator/.test(await ev("document.getElementById('lab-coach-text').textContent")), { tests: d.tests, ov });
    ok(`Grade ${g}: the notebook has a results table: thing, made of, bulb, conductor or insulator`,
       /Conductor or insulator\?/.test(await ev("(document.querySelector('#lab-notebook table') || {}).textContent || ''")));

    console.log(`\n-- Grade ${g}: mistakes that teach`);
    await L("LabCircuit.build('single'); LabCircuit.toggleSwitch(true); LabCircuit.place('v11','wire'); LabCircuit.place('v21','wire'); LabCircuit.place('h11','wire')");
    ov = await overlay();
    d = await dbg();
    ok(`Grade ${g}: a wire across the bulb - short circuit: HOT SURFACE card in Grade ${g} words`,
       d.short && ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Hot surface') && /short cut/.test(ov.text) && !/resistance/i.test(ov.text), ov);
    if (registered) ok(`Grade ${g}: …its exam point says “In the PSAC exam”`, /In the PSAC exam/.test(ov.text) && !/NCE paper/.test(ov.text), ov);
    else console.log('NOTE the exam heading on a shared card comes from Labs’ own grade: it will read “In the PSAC exam” once Grade ' + g + ' is registered.');
    await closeOv();
    ok(`Grade ${g}: closing it takes the wire back off - lit again`, !(await dbg()).layout.h11 && (await dbg()).bulbs.h12.lit);
    for (const [act, re, name] of [['mains', /mains electricity/i, 'wall socket'], ['wet', /Wet hands/, 'wet hands'], ['cable', /damaged cable/i, 'split cable']]) {
      await click(`.lab-circuit-safety [data-act="${act}"]`);
      ov = await overlay();
      ok(`Grade ${g}: ⚠️ ${name}: an ELECTRIC SHOCK hazard card - what happened, why, what to do (ask an adult)`,
         ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Electric shock') && re.test(ov.text) && /Do this instead/.test(ov.text), ov && { signs: ov.signs, t: ov.text.slice(0, 120) });
      await closeOv();
    }
    ok(`Grade ${g}: the notebook logs each danger`, /mains electricity/i.test(await ev("document.getElementById('lab-notebook').textContent")));
    for (const [js, re, name] of [
      ["LabCircuit.build('gap'); LabCircuit.toggleSwitch(true)", /there is a gap/, 'a gap'],
      ["LabCircuit.build('single'); LabCircuit.remove('h00'); LabCircuit.toggleSwitch(true)", /No cell/, 'no cell'],
      ["LabCircuit.build('twocells'); LabCircuit.flip('h10'); LabCircuit.toggleSwitch(true)", /facing each other/, 'cells the wrong way'],
      ["LabCircuit.build('twocells'); LabCircuit.toggleSwitch(true); LabCircuit.place('h20','cell')", /Too many cells/, 'three cells blow the bulb']]) {
      await L(js);
      ov = await overlay();
      ok(`Grade ${g}: ${name}: a “What went wrong” card in Grade ${g} words`, ov && /is-result/.test(ov.cls) && re.test(ov.text) && !/\d V\b|voltage/.test(ov.text), ov && ov.text.slice(0, 160));
      await closeOv();
    }

    console.log(`\n-- Grade ${g}: missions`);
    for (const id of want.missions) {
      await ev(`LabCircuit.startMission('${id}'); true`);
      const kind = (await dbg()).mission.kind;
      if (kind === 'torch') {
        await L("LabCircuit.build('single')");
        ok(`Grade ${g}: ${id} starts empty and will not take a ready-made layout`, Object.keys((await dbg()).layout).length === 0);
        await L("['h00:cell','h10:wire','h20:wire','v30:wire','v31:wire','h22:wire','h12:bulb','h02:wire','v01:wire','v00:switch'].forEach(x => { const [s, k] = x.split(':'); LabCircuit.place(s, k); }); LabCircuit.toggleSwitch(true)");
      } else if (kind === 'fix') {
        d = await dbg();
        ok(`Grade ${g}: ${id} starts with a broken torch - a gap and a loose bulb`, !d.layout.v31 && d.layout.h12.out === true);
        await L("LabCircuit.place('v31','wire'); LabCircuit.setBulb('h12', false); LabCircuit.toggleSwitch(true)");
      } else {
        await L("LabCircuit.place('v31','spoon'); LabCircuit.toggleSwitch(true); ['coin','lead','rubber','ruler','stick'].forEach(o => LabCircuit.place('v31', o))");
        d = await dbg();
        ok(`Grade ${g}: ${id}: all six tested - three conductors, three insulators`, Object.values(d.mission.tested).filter(v => v === 'conductor').length === 3 && Object.keys(d.mission.tested).length === 6, d.mission.tested);
      }
      d = await dbg();
      ok(`Grade ${g}: ${id} (${kind}) is complete with no mistakes`, d.mission.success && !d.mission.mistakes && !d.mission.hazards, d.mission);
      await click('[data-act="quiz"]');
      ok(`Grade ${g}: ${id}: every answer right, three stars, saved under its own id`, (await answerAll(id)) === '3 of 3 stars' && await ev(`Labs.store('circuit').missions['${id}'].stars === 3`));
      await closeOv();
    }

    console.log(`\n-- Grade ${g}: discoveries`);
    un = await unlockAll();
    ok(`Grade ${g}: all ${un.discIds.length} discoveries unlock by following their own “Show me how” (no card on the way)`, un.unsolved.length === 0, un.unsolved);
    cnt = await counter(g);
    ok(`Grade ${g}: the ✨ counter counts only Grade ${g}'s set`, cnt.shown === cnt.saved && cnt.saved === `${un.discIds.length}/${un.discIds.length}`, cnt);
    ok(`Grade ${g}: none of it counts towards Grade 9 - its found total and its stars are unchanged`,
       (await ev("LabCircuitData.forGrade(LabCircuitData.DISCOVERIES, 9).filter(x => Labs.store('circuit').disc[x.id]).length")) === g9found
       && JSON.stringify(JSON.parse(g9stars).light) === (await ev("JSON.stringify(Labs.store('circuit').missions.light)"))
       && JSON.stringify(JSON.parse(g9stars).compare) === (await ev("JSON.stringify(Labs.store('circuit').missions.compare)")));
    await click('[data-panel="found"]');
    const withExam = await ev(`LabCircuitData.forGrade(LabCircuitData.DISCOVERIES, ${g}).find(x => x.exam).id`);
    await click(`.lab-found-card.is-found[data-disc="${withExam}"]`);
    ov = await overlay();
    ok(`Grade ${g}: a found card: what you saw, why it happens, “In the PSAC exam”, “Do it again”`,
       ov && /What you saw/.test(ov.text) && /Why it happens/.test(ov.text) && /In the PSAC exam/.test(ov.text) && !/NCE/.test(ov.text) && /Do it again/.test(ov.text), ov && ov.text.slice(0, 200));
    await closeOv();

    console.log(`\n-- Grade ${g}: calm, phone, leaving`);
    await ev("LabCircuit._test({ instant: false }); document.documentElement.classList.add('kid-calm'); true");
    await click('[data-panel="sandbox"]');
    await click('.lab-circuit-safety [data-act="mains"]');
    ov = await overlay();
    ok(`Grade ${g}: in Calm Mode the mains card applies at once (no flash first)`, ov && ov.signs.includes('Electric shock'), ov);
    await closeOv();
    await L("LabCircuit.build('single'); LabCircuit.toggleSwitch(true)");
    const q0 = (await dbg()).clock; await sleep(500); const q1 = (await dbg()).clock;
    ok(`Grade ${g}: in Calm Mode the dots stand still, but the bulb is lit`, q1 === q0 && (await dbg()).bulbs.h12.lit, { q0, q1 });
    await ev("document.documentElement.classList.remove('kid-calm'); LabCircuit._test({ instant: true }); true");
    const fits = [];
    for (const panel of ['sandbox', 'missions', 'found']) {
      await ev(`LabCircuit.startGuide('${first}'); true`);
      await click(`[data-panel="${panel}"]`);
      const fit = await fitCheck();
      if (!fitOk(fit)) fits.push({ panel, fit });
    }
    ok(`Grade ${g}: fits a 360px phone on every tab (guide box open) - nothing past the edge, every tap target ≥ 44px`, fits.length === 0, fits);
    await ev("document.querySelector('[data-act=\"guide-stop\"]') && document.querySelector('[data-act=\"guide-stop\"]').click(); true");
    await click('[data-act="say-coach"]');
    const cC = (await speech()).cancels;
    await ev("showScreen('student-home'); true");
    await sleep(400);
    ok(`Grade ${g}: leaving the Labs screen cancels the speech`, (await speech()).cancels > cC);
    await ev("showScreen('labs'); true");
    await sleep(400);
    await click('[data-act="say-coach"]');
    const cD = (await speech()).cancels;
    await ev('Labs.backToHub(); true');
    ok(`Grade ${g}: closing the lab (unmount) cancels the speech`, (await speech()).cancels > cD);
  };

  await primaryRun(4);
  await primaryRun(6);

  // ══ Grade 7 (NCE, lower secondary) ═════════════
  const grade7Run = async () => {
    console.log('\n-- Grade 7: opening');
    const registered = await atGrade(7);
    ok('Grade 7: the board opens at Grade 7', (await dbg()).grade === 7);
    const want = await ev(`({ guides: LabCircuitData.forGrade(LabCircuitData.GUIDES, 7).map(x => x.id), missions: LabCircuitData.forGrade(LabCircuitData.MISSIONS, 7).map(x => x.id),
      discs: LabCircuitData.forGrade(LabCircuitData.DISCOVERIES, 7).map(x => x.id) })`);
    ov = await overlay();
    ok('Grade 7: its own first-visit welcome (symbols, meters, safety), whose “Show me how” starts its own first guide',
       ov && /Welcome to the Circuit Board/.test(ov.text) && /Read the symbols/.test(ov.text) && /voltmeter goes ACROSS/.test(ov.text) && !/Test things/.test(ov.text)
       && await ev(`!!document.querySelector('#lab-overlay [data-guide="${want.guides[0]}"]')`), ov && ov.text.slice(0, 300));
    await closeOv();
    ok('Grade 7: the welcome is remembered for Grade 7 only', await ev("Labs.store('circuit').intro7 === true"));
    ok('Grade 7: the eyebrow says “Science · Grade 7”', (await ev("document.querySelector('.lab-circuit .lab-eyebrow').textContent")) === 'Science · Grade 7');
    ok('Grade 7: every component with its picture AND its symbol, the ✏️ view, 📝 Take a reading and the ⚠️ row - no things-to-test, no 🔊',
       await ev(`document.querySelectorAll('.lab-circuit-kind').length === 8 && [...document.querySelectorAll('.lab-circuit-kind')].every(b => b.querySelector('svg'))
         && ['ammeter','voltmeter','resistor','fuse'].every(t => document.querySelector('#lab-circuit-palette [data-tool="' + t + '"]'))
         && !!document.getElementById('lab-circuit-view') && !!document.querySelector('[data-act="read"]')
         && ['mains','wet','cable'].every(a => document.querySelector('.lab-circuit-safety [data-act="' + a + '"]'))
         && !document.querySelector('#lab-circuit-palette [data-tool="spoon"]') && !document.querySelector('[data-act="say-coach"]')`));
    ok('Grade 7: the shelf gives each part its Grade 7 job', /Its symbol is a plain rectangle/.test(await ev("document.getElementById('lab-circuit-shelf').textContent")));
    ok('Grade 7: its own quick layouts, with the house-wiring one', (await ev("[...document.querySelectorAll('#lab-circuit-shelf [data-build]')].map(b => b.dataset.build).join()")) === (await ev('LabCircuitData.QUICK_BY_GRADE[7].join()')));
    await ev('LabCircuit._test({ instant: true }); true');

    console.log("\n-- Grade 7: only this grade's set");
    const shown = await ev(`({ guides: [...document.querySelectorAll('.lab-start [data-guide]')].map(b => b.dataset.guide), missions: [...document.querySelectorAll('.lab-start [data-mission]')].map(b => b.dataset.mission) })`);
    ok(`Grade 7: the start panel shows exactly its ${want.guides.length} guides and ${want.missions.length} missions - nothing of Grades 4, 6 or 9`,
       shown.guides.join() === want.guides.join() && shown.missions.join() === want.missions.join() && want.guides.length >= 3 && want.missions.length >= 2, { shown, want });
    await click('[data-panel="missions"]');
    const mlist = await ev("[...document.querySelectorAll('.lab-missions [data-mission]')].map(b => b.dataset.mission)");
    ok('Grade 7: the Missions tab lists only its own missions', mlist.join() === want.missions.join(), mlist);
    await click('[data-panel="found"]');
    const dlist = await ev("[...document.querySelectorAll('.lab-found-card')].map(b => b.dataset.disc)");
    cnt = await counter(7);
    ok(`Grade 7: the Discoveries tab lists only its ${want.discs.length} cards, and its counter starts at 0 although Grade 9's are all found`,
       dlist.join() === want.discs.join() && cnt.shown === `0/${want.discs.length}` && want.discs.length >= 10 && g9found > 0, { dlist, cnt });
    await click('[data-panel="sandbox"]');

    console.log('\n-- Grade 7: guided experiments');
    await click(`.lab-start [data-guide="${want.guides[0]}"]`);
    gs = await guideState();
    ok('Grade 7: step 1 of the first guide is in the yellow box (no 🔊 at Grade 7)', gs.box && /Step 1 of/.test(gs.text) && !(await ev("!!document.querySelector('#lab-guide [data-act=\"say-guide\"]')")), gs);
    txt = await runGuide();
    ok(`Grade 7: “${await ev(`LabCircuitData.GUIDES.find(x => x.id === '${want.guides[0]}').title`)}” runs to the end with “What you found out”`, /Experiment complete/.test(txt) && /What you found out/.test(txt) && /standard symbol/.test(txt), txt.slice(0, 200));
    ok('…ending in the circuit-diagram view with the resistor dimming the lamp', (await dbg()).view === 'symbols' && (await dbg()).bulbs.h12.b < 0.5);
    await closeOv();
    for (const id of want.guides.slice(1)) {
      await ev(`LabCircuit.startGuide('${id}'); true`);
      txt = await runGuide();
      ok(`Grade 7: guide ${id} runs to the end, with no card on the way`, /Experiment complete/.test(txt), txt.slice(0, 160));
      if (id === 'g7-meters') {
        d = await dbg();
        const l2 = d.readings.slice(-2);
        ok('…its readings: 0.50 A / 1.50 V with one cell, 1.00 A / 3.00 V with two', l2.length === 2 && l2[0].amps[0] === 0.5 && l2[0].volts[0] === 1.5 && l2[1].amps[0] === 1 && l2[1].volts[0] === 3, l2);
        const nb = await ev("document.getElementById('lab-notebook').textContent");
        ok('…and the notebook shows no Grade 9 arithmetic (no R = V ÷ I, no Q = It)', /Reading/.test(nb) && !/R = V ÷ I|Q = It|W = QV/.test(nb));
      }
      if (id === 'g7-fuse') ok('…the fuse melted and no current flows', (await dbg()).layout.h20.blown === true && (await dbg()).cellI < 1e-6);
      await closeOv();
    }
    ok('Grade 7: every guide is ticked off on the start panel', (await ev("document.querySelectorAll('.lab-start .lab-start-card.is-done').length")) === want.guides.length);
    await click('.lab-circuit [data-act="help"]');
    ov = await overlay();
    ok('Grade 7: the help card has the symbols, the words (current, voltage, resistance with their units) and safety - no Grade 9 formulas',
       ov && /Circuit symbols/.test(ov.text) && /amperes \(A\)/.test(ov.text) && /volts \(V\)/.test(ov.text) && /ohms \(Ω\)/.test(ov.text) && /Series/.test(ov.text) && /Safety/.test(ov.text)
       && !/Q = It|W = QV|V = IR/.test(ov.text) && ov.text.includes('Its symbol is a plain rectangle'), ov && ov.text.slice(0, 200));
    await closeOv();
    await L("LabCircuit.setView('picture'); LabCircuit.build('meters'); LabCircuit.toggleSwitch(true); LabCircuit._tick(12); LabCircuit.read()");
    ok('Grade 7: a reading after 12 s records the meters and no Q = It; the strip and chips under the board show none either',
       !/Q = It/.test(await ev("document.querySelector('#lab-notebook .lab-log li').textContent")) && !/Q = It/.test(await ev("document.getElementById('lab-circuit-contents').textContent"))
       && !/⏱️/.test(await ev("document.getElementById('lab-circuit-status').textContent")) && /0\.50 A/.test(await ev("document.getElementById('lab-circuit-contents').textContent")));

    console.log('\n-- Grade 7: mistakes that teach');
    await L("LabCircuit.build('single'); LabCircuit.toggleSwitch(true); LabCircuit.place('v11','wire'); LabCircuit.place('v21','wire'); LabCircuit.place('h11','wire')");
    ov = await overlay();
    d = await dbg();
    ok('Grade 7: a wire across the lamp - short circuit: HOT SURFACE card in Grade 7 words (the fuse as the exam point)',
       d.short && ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Hot surface') && /nothing limits the current/.test(ov.text) && /weak point built in on purpose/.test(ov.text) && !/Chemistry 20|Physics 20/.test(ov.text), ov);
    if (registered) ok('Grade 7: …its exam heading says “In your exams”', /In your exams/.test(ov.text) && !/NCE paper|PSAC exam/.test(ov.text), ov);
    else console.log('NOTE the exam heading on a shared card comes from Labs’ own grade: it will read “In your exams” once Grade 7 is registered.');
    await closeOv();
    ok('Grade 7: closing it takes the wire back off - lit again', !(await dbg()).layout.h11 && (await dbg()).bulbs.h12.lit);
    for (const [act, re, name] of [['mains', /230 V/, 'wall socket'], ['wet', /Tap water conducts/, 'wet hands'], ['cable', /Copper is a very good conductor/, 'split cable']]) {
      await click(`.lab-circuit-safety [data-act="${act}"]`);
      ov = await overlay();
      ok(`Grade 7: ⚠️ ${name}: an ELECTRIC SHOCK card in Grade 7 words`, ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Electric shock') && re.test(ov.text) && /Do this instead/.test(ov.text), ov && { signs: ov.signs, t: ov.text.slice(0, 160) });
      await closeOv();
    }
    ok('Grade 7: the hazards are counted under their Grade 7 ids', await ev("['g7_short_circuit','g7_mains','g7_wet_hands','g7_cable'].every(k => Labs.store('circuit').hazards[k] >= 1)"));
    for (const [js, re, name, after] of [
      ["LabCircuit.build('gap'); LabCircuit.toggleSwitch(true)", /has a break/, 'a break in the wire', null],
      ["LabCircuit.build('single'); LabCircuit.remove('h00'); LabCircuit.toggleSwitch(true)", /nothing pushes the current/, 'no cell', null],
      ["LabCircuit.build('twocells'); LabCircuit.flip('h10'); LabCircuit.toggleSwitch(true)", /facing each other[\s\S]*long line \(\+\)/, 'cells the wrong way', null],
      ["LabCircuit.build('twocells'); LabCircuit.toggleSwitch(true); LabCircuit.place('h20','cell')", /burnt out[\s\S]*3 cells in series \(4\.5 V\)/, 'three cells burn out the lamp', null],
      ["LabCircuit.build('single'); LabCircuit.toggleSwitch(true); LabCircuit.place('v11','wire'); LabCircuit.place('v21','wire'); LabCircuit.place('h11','ammeter')", /ammeter is across the lamp[\s\S]*IN SERIES/, 'the ammeter across the lamp (Grade 7 card)', 'amm'],
      ["LabCircuit.build('single'); LabCircuit.toggleSwitch(true); LabCircuit.place('h20','voltmeter')", /voltmeter is in the loop[\s\S]*1\.50 V/, 'the voltmeter in the loop (Grade 7 card)', null]]) {
      await L(js);
      ov = await overlay();
      // The card's exam heading is Labs' own: "In your exams" only once Grade 7 is registered.
      ok(`Grade 7: ${name}: a “What went wrong” card in Grade 7 words`, ov && /is-result/.test(ov.cls) && re.test(ov.text) && /What you should have done/.test(ov.text)
         && !/Physics 20|PSAC 20/.test(ov.text) && (!registered || (/In your exams/.test(ov.text) && !/NCE|PSAC/.test(ov.text))), ov && ov.text.slice(0, 200));
      await closeOv();
      if (after === 'amm') ok('…and the ammeter comes back off', !(await dbg()).layout.h11);
    }
    ok('Grade 7: the cards are counted under their Grade 7 ids', await ev("['g7_open_circuit','g7_no_cell','g7_cells_wrong','g7_bulb_blown','g7_ammeter_parallel','g7_voltmeter_series'].every(k => Labs.store('circuit').hazards[k] >= 1)"));

    console.log('\n-- Grade 7: missions');
    const ringDiagram = "['h00:cell','h10:wire','h20:wire','v30:resistor','v31:wire','h22:wire','h12:bulb','h02:wire','v01:wire','v00:switch'].forEach(x => { const [s, k] = x.split(':'); LabCircuit.place(s, k); })";
    await ev("LabCircuit.startMission('g7_diagram'); true");
    await L("LabCircuit.build('single')");
    ok('Build it from the diagram: starts on an empty board and will not take a ready-made layout', Object.keys((await dbg()).layout).length === 0);
    ok('…the mission box shows the circuit diagram to build', await ev("!!document.querySelector('#lab-mission .lab-circuit-target svg rect')"));
    await L(ringDiagram.replace("'v30:resistor'", "'v30:wire'") + "; LabCircuit.place('h11','resistor'); LabCircuit.place('v11','wire'); LabCircuit.place('v21','wire'); LabCircuit.toggleSwitch(true)");
    d = await dbg();
    ok('…a resistor on a side branch lights the lamp but is not the diagram (one loop): not complete yet', d.bulbs.h12.lit && !d.mission.success, d.mission);
    await L("LabCircuit.clearBoard(); " + ringDiagram + "; LabCircuit.toggleSwitch(true)");
    d = await dbg();
    ok('…the four parts in one loop, switch closed: the lamp lights (dim) and the mission is complete', d.mission.success && d.bulbs.h12.lit && d.bulbs.h12.b < 0.5 && !d.mission.hazards, d.mission);
    await click('[data-act="quiz"]');
    ok('…its first question offers four symbol pictures', await ev("document.querySelectorAll('#lab-overlay .lab-quiz-pic svg').length === 4"));
    ok('Build it from the diagram: three stars (no mistakes, every answer right)', (await answerAll('g7_diagram')) === '3 of 3 stars' && await ev("Labs.store('circuit').missions.g7_diagram.stars === 3"));
    await closeOv();

    await ev("LabCircuit.startMission('g7_sp'); true");
    await click('#lab-mission [data-build="series2"]');
    await L("LabCircuit.toggleSwitch(true); LabCircuit.setBulb('h12', true)");
    d = await dbg();
    ok('Two lamps, two ways: series - one lamp out puts the other out', d.mission.sBreak && !d.mission.success, d.mission);
    await click('#lab-mission [data-build="parallel2"]');
    await L("LabCircuit.toggleSwitch(true); LabCircuit.setBulb('h12', true)");
    d = await dbg();
    ok('…parallel - the other lamp stays on, and the mission is complete', d.mission.pBreak && d.mission.success && !d.mission.mistakes, d.mission);
    await click('[data-act="quiz"]');
    ok('Two lamps, two ways: three stars', (await answerAll('g7_sp')) === '3 of 3 stars' && await ev("Labs.store('circuit').missions.g7_sp.stars === 3"));
    await closeOv();

    await ev("LabCircuit.startMission('g7_meters'); true");
    d = await dbg();
    ok('Measure it: starts with a lamp circuit and no meters, the ammeter in the hand', d.layout.h12.kind === 'bulb' && d.layout.v00.kind === 'switch' && !Object.values(d.layout).some(p => /meter/.test(p.kind)) && d.tool === 'ammeter');
    await L("LabCircuit.build('meters')");
    ok('…and will not take the ready-made meters layout', !Object.values((await dbg()).layout).some(p => /meter/.test(p.kind)));
    await L("LabCircuit.place('h20','ammeter'); LabCircuit.place('v11','wire'); LabCircuit.place('v21','wire'); LabCircuit.place('h11','voltmeter'); LabCircuit.toggleSwitch(true); LabCircuit.read()");
    d = await dbg();
    ok('…ammeter in the loop, voltmeter across the lamp, a reading: 0.50 A and 1.50 V, and the mission is complete', d.mission.success && d.mission.read && near(d.meters.h20, 0.5) && near(d.meters.h11, 1.5) && !d.mission.mistakes, d.mission);
    await click('[data-act="quiz"]');
    ok('Measure it: three stars', (await answerAll('g7_meters')) === '3 of 3 stars' && await ev("Labs.store('circuit').missions.g7_meters.stars === 3"));
    await closeOv();

    console.log('\n-- Grade 7: discoveries');
    un = await unlockAll();
    ok(`Grade 7: all ${un.discIds.length} discoveries unlock by following their own “Show me how” (no card on the way)`, un.unsolved.length === 0 && un.discIds.join() === want.discs.join(), un.unsolved);
    cnt = await counter(7);
    ok("Grade 7: the ✨ counter counts only Grade 7's set", cnt.shown === cnt.saved && cnt.saved === `${un.discIds.length}/${un.discIds.length}`, cnt);
    ok('Grade 7: none of it counts towards Grade 9 - its found total and its stars are unchanged',
       (await ev("LabCircuitData.forGrade(LabCircuitData.DISCOVERIES, 9).filter(x => Labs.store('circuit').disc[x.id]).length")) === g9found
       && JSON.stringify(JSON.parse(g9stars).light) === (await ev("JSON.stringify(Labs.store('circuit').missions.light)"))
       && JSON.stringify(JSON.parse(g9stars).compare) === (await ev("JSON.stringify(Labs.store('circuit').missions.compare)")));
    await click('[data-panel="found"]');
    await click('.lab-found-card.is-found[data-disc="g7_branch"]');
    ov = await overlay();
    ok('Grade 7: a found card: what you saw, why, “📝 In your exams” (not PSAC, not the NCE paper), “Do it again”',
       ov && /What you saw/.test(ov.text) && /Why it happens/.test(ov.text) && /In your exams/.test(ov.text) && !/NCE paper|PSAC/.test(ov.text) && /Do it again/.test(ov.text), ov && ov.text.slice(0, 200));
    await closeOv();

    console.log('\n-- Grade 7: calm, phone');
    await ev("LabCircuit._test({ instant: false }); document.documentElement.classList.add('kid-calm'); true");
    await click('[data-panel="sandbox"]');
    await L("LabCircuit.build('single'); LabCircuit.toggleSwitch(true); LabCircuit.place('v11','wire'); LabCircuit.place('v21','wire'); LabCircuit.place('h11','wire')");
    ov = await overlay();
    ok('Grade 7: in Calm Mode the short-circuit card applies at once (no animation first)', ov && ov.signs.includes('Hot surface'), ov);
    await closeOv();
    const q0 = (await dbg()).clock; await sleep(500); const q1 = (await dbg()).clock;
    ok('Grade 7: in Calm Mode the dots stand still, but the lamp is lit', q1 === q0 && (await dbg()).bulbs.h12.lit, { q0, q1 });
    await ev("document.documentElement.classList.remove('kid-calm'); LabCircuit._test({ instant: true }); true");
    const fits = [];
    for (const [view, panel] of [['picture', 'sandbox'], ['symbols', 'missions'], ['picture', 'found']]) {
      await ev(`LabCircuit.startGuide('${want.guides[0]}'); LabCircuit.setView('${view}'); true`);
      await click(`[data-panel="${panel}"]`);
      const fit = await fitCheck();
      if (!fitOk(fit)) fits.push({ view, panel, fit });
    }
    await ev("document.querySelector('[data-act=\"guide-stop\"]') && document.querySelector('[data-act=\"guide-stop\"]').click(); LabCircuit.startMission('g7_diagram'); true");
    await click('[data-panel="missions"]');
    const fitM = await fitCheck();
    if (!fitOk(fitM) || !(await ev("document.querySelector('#lab-mission .lab-circuit-target').getBoundingClientRect().right <= innerWidth"))) fits.push({ panel: 'diagram mission', fit: fitM });
    ok('Grade 7: fits a 360px phone on every tab, in both views and with the diagram mission open - nothing past the edge, tap targets ≥ 44px', fits.length === 0, fits);
    await ev("document.querySelector('[data-act=\"exit-mission\"]') && document.querySelector('[data-act=\"exit-mission\"]').click(); LabCircuit.setView('picture'); Labs.backToHub(); true");
  };
  await grade7Run();

  // ── Grade 9 again, untouched ─────────────────
  console.log('\n-- Grade 9 again');
  await atGrade(9);
  await ev("document.getElementById('lab-overlay') && document.getElementById('lab-overlay').remove(); true");
  cnt = await counter(9);
  ok('Grade 9 again: “Physics · Grade 9”, its own 3 guides and 2 missions, and its counter as it was',
     (await ev("document.querySelector('.lab-circuit .lab-eyebrow').textContent")) === 'Physics · Grade 9'
     && (await ev("[...document.querySelectorAll('.lab-start [data-guide]')].map(b => b.dataset.guide).join()")) === 'light,sp,meters'
     && (await ev("[...document.querySelectorAll('.lab-start [data-mission]')].map(b => b.dataset.mission).join()")) === 'light,compare'
     && cnt.shown === cnt.saved && cnt.saved === `${g9found}/${g9found}`, cnt);
  ok('Grade 9 again: the meters and the reading button are back; no things-to-test, no ⚠️ row, no 🔊',
     await ev("!!document.querySelector('#lab-circuit-palette [data-tool=\"ammeter\"]') && !!document.querySelector('[data-act=\"read\"]') && !document.querySelector('#lab-circuit-palette [data-tool=\"spoon\"]') && !document.querySelector('.lab-circuit-safety') && !document.querySelector('[data-act=\"say-coach\"]')"));
  await ev("Labs.grade = window.__labsGrade; showScreen('student-home'); true");
  ok('no page errors along the way', errors.length === 0, errors.slice(0, 5));

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); quit(1); });
