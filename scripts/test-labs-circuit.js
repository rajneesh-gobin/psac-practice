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
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-circuit.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
// ⚠ Debugging port 9405 - the other lab builds use 9401-9404 and 9406-9408.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9405;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0, d;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); } };
const near = (a, b, e = 0.006) => Math.abs(a - b) < e;

(async () => {
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-labs-circuit-')),
    '--allow-file-access-from-files', '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  const quit = code => { try { chrome.kill(); } catch (_) {} process.exit(code); };
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

  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof openLabs === 'function' && typeof RoleModules !== 'undefined'"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url + ', not the file we navigated to.'); quit(1); }
  ok('app loaded', ready === true);
  await sleep(2500);

  // ── Opening the board ─────────────────────────
  console.log('\n-- opening the Circuit Board');
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
  const answerAll = idx => ev(`(() => {
    const qs = LabCircuitData.MISSIONS[${idx}].quiz;
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
  ok('all answers right and no mistakes: 3 stars', (await answerAll(0)) === '3 of 3 stars');
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
  ok('Series or parallel: 3 stars', (await answerAll(1)) === '3 of 3 stars');
  await closeOv();
  await ev("LabCircuit.startMission('light'); true");
  await L(buildLight.replace("'h20:ammeter'", "'h20:voltmeter'") + "; LabCircuit.toggleSwitch(true)");
  ov = await overlay();
  ok('a voltmeter in the loop during the mission shows its card', ov && /voltmeter is in the loop/.test(ov.text));
  await closeOv();
  await L("LabCircuit.place('h20','ammeter'); LabCircuit.read()");
  await click('[data-act="quiz"]');
  ok('a wiring mistake during the mission costs a star: 2 stars (best of 3 is kept)', (await answerAll(0)) === '2 of 3 stars' && await ev("Labs.store('circuit').missions.light.stars === 3"));
  await closeOv();

  // ── Discoveries ────────────────────────────────
  console.log('\n-- discoveries');
  await click('[data-panel="found"]');
  ok('the Discoveries tab lists every card', await ev("document.querySelectorAll('.lab-found-card').length === LabCircuitData.DISCOVERIES.length && document.querySelectorAll('.lab-found-card.is-found').length >= 8"));
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

  const discIds = await ev('LabCircuitData.DISCOVERIES.map(d => d.id)');
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
  ok(`all ${discIds.length} discoveries unlock by following their own “Show me how” (with no hazard or wrong-card on the way)`, unsolved.length === 0, unsolved);
  const cnt = await ev("({ shown: document.getElementById('lab-found-n').textContent, saved: Object.keys(Labs.store('circuit').disc).length + '/' + LabCircuitData.DISCOVERIES.length })");
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

  for (const [view, panel] of [['picture', 'sandbox'], ['symbols', 'missions'], ['picture', 'found']]) {
    await ev(`LabCircuit.setView('${view}'); true`);
    await click(`[data-panel="${panel}"]`);
    await ev("LabCircuit.build('meters'); LabCircuit.setTool('bulb'); true");
    const fit = await ev(`(() => { const vw = innerWidth;
      const off = [...document.querySelectorAll('#labs-root button, #labs-root canvas')]
        .filter(e => e.getClientRects().length && (e.getBoundingClientRect().right > vw + 0.5 || e.getBoundingClientRect().left < -0.5))
        .map(e => (e.getAttribute('data-slot') || e.getAttribute('data-tool') || e.getAttribute('data-panel') || e.getAttribute('data-act') || e.tagName) + ' → ' + Math.round(e.getBoundingClientRect().right));
      const small = [...document.querySelectorAll('#labs-root .lab-circuit-palette button, #labs-root .lab-circuit-actions button, #labs-root .lab-top button, #labs-root .lab-circuit-slot, #labs-root .lab-tabs button')]
        .filter(e => e.getClientRects().length && (e.getBoundingClientRect().height < 43.5 || e.getBoundingClientRect().width < 43.5)).map(e => e.getAttribute('data-slot') || e.textContent.trim().slice(0, 20));
      const r = [...document.querySelectorAll('.lab-circuit-slot')].map(b => b.getBoundingClientRect());
      let overlap = 0; for (let i = 0; i < r.length; i++) for (let j = i + 1; j < r.length; j++) {
        const w = Math.min(r[i].right, r[j].right) - Math.max(r[i].left, r[j].left), h = Math.min(r[i].bottom, r[j].bottom) - Math.max(r[i].top, r[j].top);
        if (w > 1 && h > 1) overlap++; }
      const cv = document.getElementById('lab-circuit-canvas').getBoundingClientRect();
      const outside = r.filter(b => b.left < cv.left - 0.5 || b.right > cv.right + 0.5 || b.top < cv.top - 0.5 || b.bottom > cv.bottom + 0.5).length;
      return { vw, root: document.getElementById('labs-root').scrollWidth, off, small, overlap, outside }; })()`);
    ok(`${view} / ${panel}: fits a 360px phone - nothing past the edge, tap targets ≥ 44px, no two spaces overlap`,
       fit.root <= fit.vw && fit.off.length === 0 && fit.small.length === 0 && fit.overlap === 0 && fit.outside === 0, fit);
  }

  await ev("showScreen('student-home'); true");
  ok('no page errors along the way', errors.length === 0, errors.slice(0, 5));

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
