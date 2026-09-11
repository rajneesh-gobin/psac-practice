'use strict';
// Science Labs › Separation Station, driven in a real browser.
//
// Opens the lab through the shell, then proves: the start panel says what to do;
// a guided experiment builds and runs a distillation rig end to end; every
// hazard and result card stops the experiment and explains itself; each bench
// (distil, crystallise, sublime, choose) does what the data says; every
// discovery unlocks by following its own "Show me how"; all three missions can
// be finished with three stars; Calm Mode applies effects at once; the bench fits
// a 360px phone; and nothing throws.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-separation.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
// ⚠ Debugging port 9403 - the other lab builds use 9401, 9402 and 9404.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9403;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail).slice(0, 900) : '')); } };

(async () => {
  const tmp = process.env.LAB_TMP || os.tmpdir();
  fs.mkdirSync(tmp, { recursive: true });
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + fs.mkdtempSync(path.join(tmp, 'psac-labs-sep-')),
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
    const id = ++serial, t = setTimeout(() => { waiting.delete(id); rej(Error('Timeout ' + method)); }, 60000);
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
  const must = async sel => { const r = await click(sel); if (r !== true) ok('clicked ' + sel, false, r); return r; };
  const dbg = () => ev('LabSeparation._debug()');
  const tick = s => ev(`LabSeparation._tick(${s}); true`);
  const overlay = () => ev(`(() => { const o = document.getElementById('lab-overlay'); if (!o) return null;
    return { cls: o.className, text: o.textContent.replace(/\\s+/g, ' ').slice(0, 3000),
             signs: [...o.querySelectorAll('.lab-sign figcaption')].map(f => f.textContent) }; })()`);
  const closeOv = () => click('#lab-overlay [data-ov-close]');
  const part = (k, v) => must(`#lab-panel [data-part="${k}"][data-opt="${v}"]`);
  const tool = act => must(`#lab-tools [data-act="${act}"]`);
  const mode = m => must(`[data-mode="${m}"]`);
  const hasCard = (ov, re) => !!(ov && re.test(ov.text));

  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof openLabs === 'function' && typeof RoleModules !== 'undefined'"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url + ', not the file we navigated to.'); quit(1); }
  ok('app loaded', ready === true);
  await sleep(2500);

  // ── Opening the lab ─────────────────────────────
  console.log('\n-- opening the Separation Station');
  await ev("SELECTED_GRADE = 9; openLabs(); true");
  let hub = false;
  for (let i = 0; i < 40 && !hub; i++) { await sleep(250); hub = await ev("!!document.querySelector('#labs-root .lab-hub')"); }
  ok('Grade 9: the Labs hub renders', hub);
  await ev("Labs.openLab('separation'); true");
  let open = false;
  for (let i = 0; i < 60 && !open; i++) { await sleep(200); open = await ev("!!window.LabSeparation && !!document.querySelector('#labs-root .lab-separation')"); }
  ok('Labs.openLab("separation") loads the bench and it renders', open);
  const labScripts = () => ev("[...document.scripts].map(s => s.src).filter(s => /engine\\/labs\\//.test(s)).map(s => s.split('/').pop()).join()");
  ok('it fetches its own data and bench files, after the shell', (await labScripts()) === 'lab_core.js,lab_separation_data.js,lab_separation.js', await labScripts());
  await sleep(500);
  ok('lab_separation.css is linked and styles the bench',
     await ev("!!document.querySelector('link[data-lab-css=\"separation\"]') && getComputedStyle(document.querySelector('.lab-separation-modes')).display === 'grid'"));
  let ov = await overlay();
  ok('first visit shows the welcome card with “Show me how”', ov && /Welcome to the Separation Station/.test(ov.text) && /Show me how/.test(ov.text), ov);
  await closeOv();
  ok('the welcome is remembered', await ev("Labs.store('separation').intro === true"));
  await ev('LabSeparation._test({ instant: true }); true');

  // ── The start panel ─────────────────────────────
  console.log('\n-- what to do here');
  const start = await ev(`({ start: !!document.querySelector('.lab-start'), h: (document.querySelector('.lab-start h2') || {}).textContent,
    guides: document.querySelectorAll('.lab-start [data-guide]').length, missions: document.querySelectorAll('.lab-start [data-mission]').length,
    tabs: [...document.querySelectorAll('.lab-tabs [data-panel]')].map(b => b.textContent.trim().split(' ')[1]).join() })`);
  ok('the Bench tab opens with “What would you like to do?”, 4 guided experiments and 3 missions',
     start.start && /What would you like to do/.test(start.h) && start.guides === 4 && start.missions === 3, start);
  ok('tabs: Bench, Missions, Discoveries', start.tabs === 'Bench,Missions,Discoveries', start.tabs);

  // ── A guided experiment, end to end ─────────────
  console.log('\n-- guided experiment: Build a distillation rig');
  await must('.lab-start [data-guide="rig"]');
  const guideState = () => ev(`({ box: !document.getElementById('lab-guide').hidden,
    text: document.getElementById('lab-guide').textContent.replace(/\\s+/g, ' '),
    next: (() => { const n = document.querySelector('.is-next'); return n ? (n.dataset.part ? n.dataset.part + ':' + n.dataset.opt : n.dataset.act || n.dataset.mode || n.id) : null; })(),
    start: !!document.querySelector('.lab-start') })`);
  let gs = await guideState();
  ok('it skips "open the bench" (already there) and asks for the flask of sea water, which glows',
     gs.box && /Step 2 of 11/.test(gs.text) && /sea water/.test(gs.text) && gs.next === 'flask:sea' && !gs.start, gs);
  await must('[data-guide-do]');
  gs = await guideState();
  ok('next: anti-bumping granules glow', gs.next === 'granules:yes' && /Step 3 of 11/.test(gs.text), gs);
  await must('[data-part="granules"][data-opt="yes"]');
  gs = await guideState();
  ok('tapping the glowing shelf button itself also moves the guide on (thermometer at the side arm next)', gs.next === 'thermo:arm', gs);
  for (let i = 0; i < 4; i++) await must('[data-guide-do]');
  gs = await guideState();
  ok('after condenser, receiver and burner: goggles glow', gs.next === 'goggles' && /goggles/i.test(gs.text), gs);
  let d = await dbg();
  ok('the rig on the bench is the correct one', JSON.stringify(d.dist.parts) === JSON.stringify({ flask: 'sea', granules: 'yes', thermo: 'arm', condenser: 'bottom', receiver: 'open', burner: 'yes' }), d.dist.parts);
  await must('[data-guide-do]');
  gs = await guideState();
  ok('then the Heat button glows', gs.next === 'heat', gs);
  await must('[data-guide-do]');
  gs = await guideState();
  ok('while it heats, the guide says to keep watching', /Keep watching/.test(gs.text) && d.goggles !== undefined, gs);
  await tick(3);
  d = await dbg();
  ok('after 3 minutes the flask is hot but not boiling, and the thermometer at the side arm still reads room temperature',
     d.dist.T > 70 && !d.dist.boiling && Math.abs(d.dist.read - 25) < 0.01, d.dist);
  await tick(3);
  d = await dbg();
  ok('then it boils at 100.6 °C (salty) and the side-arm thermometer climbs to 100.0 °C', d.dist.boiling && d.dist.read === 100 && d.dist.T >= 100.6, d.dist);
  ok('the readout chip shows 100.0 °C at the side arm', /100\.0 °C.*side arm/.test(await ev("document.getElementById('lab-read').textContent")));
  await tick(12);
  ov = await overlay();
  d = await dbg();
  ok('25 cm³ of distillate collects and the guide completes with “What you found out”',
     d.dist.done && d.dist.dist >= 25 && ov && /Experiment complete/.test(ov.text) && /What you found out/.test(ov.text), { dist: d.dist, ov });
  ok('the salt stayed behind: the flask lost only water', d.dist.vol < 100 && Math.abs((100 - d.dist.vol) - (d.dist.dist + d.dist.escaped)) < 2.5, d.dist);
  ok('it is remembered, and offers the next one', await ev("!!Labs.store('separation').guides.rig") && /Next: Grow copper sulfate crystals/.test(ov.text));
  await closeOv();
  const nb = await ev("document.getElementById('lab-notebook').textContent.replace(/\\s+/g,' ')");
  ok('the notebook has a readings table (time, thermometer, distillate) and the result', /Thermometer \(°C\)/.test(nb) && /100\.0/.test(nb) && /Distilled: sea water/.test(nb), nb.slice(0, 400));
  ok('discoveries: pure water from sea water, steady at 100 °C', await ev("['d_sea','d_100'].every(id => Labs.store('separation').disc[id])"));
  const counter = () => ev("({ shown: document.getElementById('lab-found-n').textContent, saved: Object.keys(Labs.store('separation').disc).length + '/' + LabSeparationData.DISCOVERIES.length })");
  let cnt = await counter();
  ok('the ✨ counter matches what is saved', cnt.shown === cnt.saved, cnt);
  await tool('drop');
  ok('💧 Test a drop: no residue, so the distillate is pure', (await dbg()).log[0].includes('no residue') && await ev("!!Labs.store('separation').disc.d_residue"));

  // ── Hazards ─────────────────────────────────────
  console.log('\n-- hazards');
  await must('#lab-goggles');
  ok('goggles off', (await dbg()).goggles === false);
  await ev("LabSeparation.build('correct'); true");
  await tool('heat');
  ov = await overlay();
  ok('heating without goggles is stopped with a HOT SURFACE hazard card', ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Hot surface') && /protect your eyes/.test(ov.text), ov);
  ok('…which says what happened, why, what to do instead and the NCE paper point',
     ov && /What happened/.test(ov.text) && /Why it’s dangerous/.test(ov.text) && /Do this instead/.test(ov.text) && /On the NCE paper/.test(ov.text));
  ok('…and the burner never lit', (await dbg()).dist.heat === false);
  await closeOv();
  await must('#lab-goggles');

  await ev("LabSeparation.build('no_granules'); true");
  await tool('heat');
  await tick(6);
  ov = await overlay();
  ok('no anti-bumping granules: the flask BUMPS - hot hazard card', ov && ov.signs.includes('Hot surface') && /Bumping/.test(ov.text) && /granules/.test(ov.text), ov);
  await closeOv();
  d = await dbg();
  ok('…the flask is left to cool before anything else is added', d.dist.T === 25 && !d.dist.heat, d.dist);

  await ev("LabSeparation.build('sealed'); true");
  await tool('heat');
  await tick(8);
  ov = await overlay();
  ok('a sealed receiver: pressure builds and the glassware blows apart - GAS UNDER PRESSURE', ov && ov.signs.includes('Gas under pressure') && /1700 cm³/.test(ov.text), ov);
  await closeOv();
  ok('…and the bench gets fresh glassware', (await dbg()).dist.parts.flask === null);

  await mode('sublime');
  await part('mixture', 'iodine'); await part('place', 'bench'); await part('cover', 'funnel_plug');
  await tool('heat');
  await tick(3);
  ov = await overlay();
  ok('iodine heated on the open bench: HARMFUL fumes hazard card', ov && ov.signs.includes('Harmful') && /fume cupboard/.test(ov.text), ov);
  await closeOv();

  // ── Result cards ────────────────────────────────
  console.log('\n-- wrong-but-safe mistakes');
  await mode('distil');
  await ev("LabSeparation.build('two_errors'); true");
  await tool('heat');
  await tick(8);
  ov = await overlay();
  d = await dbg();
  ok('a rig with two errors: first card - water in at the top, the condenser never filled',
     ov && /is-result/.test(ov.cls) && /condenser never filled/.test(ov.text) && /What you should have done/.test(ov.text) && d.dist.jacket < 0.3, { ov, jacket: d.dist.jacket });
  ok('…while little distillate collected and steam escaped', d.dist.dist < 3 && d.dist.escaped > 1, d.dist);
  await closeOv();
  ov = await overlay();
  ok('…second card - the thermometer bulb in the liquid read the boiling salty water (above 100 °C)',
     hasCard(ov, /thermometer read the wrong thing/) && /read 100\.[1-9] °C/.test(ov.text), ov);
  await closeOv();
  await part('condenser', 'bottom'); await part('thermo', 'arm');
  await tool('heat');
  await tick(16);
  ok('fixing both on the shelf gives a clean run to 25 cm³', (await dbg()).dist.done);

  await mode('crystal');
  await tool('heat');
  await tick(3);
  await tool('rod');
  d = await dbg();
  ok('crystallisation: an early glass-rod test shows no crystals', d.cry.rods === 1 && !d.cry.rodOK && /No crystals on the rod/.test(d.log[0]), d);
  await tick(16);
  await tool('rod');
  d = await dbg();
  ok('keep heating: below about 40 cm³ of water the rod grows crystals - the crystallisation point', d.cry.rodOK && d.cry.water <= 39.8 && d.cry.water > 12, d.cry);
  await tool('heat');
  await tool('cool-slow');
  await tick(14);
  d = await dbg();
  ok('heat off and cool slowly: crystals appear at the saturation temperature and grow big', d.cry.done && d.cry.onset > 24 && d.cry.onset < 40 && /Big crystals/.test(d.log[0]), d.cry);
  ok('the chip says when crystals started forming', /Crystals from \d+ °C/.test(await ev("document.getElementById('lab-status').textContent")));
  if (await overlay()) await closeOv();
  await tool('reset');
  await tool('heat');
  await tick(50);
  ov = await overlay();
  ok('heated to dryness: result card - it spits and turns into a white powder', hasCard(ov, /Heated to dryness/) && /white powder/.test(ov.text) && (await dbg()).cry.dry, ov);
  await closeOv();
  await tool('reset');
  await tool('heat'); await tick(1); await tool('heat');
  await tool('cool-fast');
  await tick(5);
  ov = await overlay();
  ok('cooled far too soon: result card - no crystals, not saturated', hasCard(ov, /stopped too soon/) && /cm³ of water still in the basin/.test(ov.text), ov);
  await closeOv();

  await mode('sublime');
  await part('place', 'hood');
  await tool('heat');
  await tick(12);
  d = await dbg();
  ok('iodine in the fume cupboard under a plugged funnel: it all sublimes onto the funnel, sand left behind',
     d.sub.done && Math.abs(d.sub.sublimate - 2) < 1e-6 && d.sub.left === 0 && /grey-black crystals of iodine/.test(d.log[0]), d.sub);
  await part('cover', 'none');
  await tool('heat'); await tick(6);
  ov = await overlay();
  ok('nothing over the dish: result card - nothing was collected', hasCard(ov, /Nothing was collected/) && /inverted funnel/.test(ov.text), ov);
  await closeOv();
  await part('cover', 'funnel');
  await tool('heat'); await tick(6);
  ov = await overlay();
  d = await dbg();
  ok('a funnel with no plug: result card - vapour escaped up the stem (2024 Q2(b)(ii))',
     hasCard(ov, /escaped up the stem/) && /2024 Q2\(b\)\(ii\)/.test(ov.text) && d.sub.escaped > 0 && d.sub.sublimate > 0, { ov, sub: d.sub });
  await closeOv();

  await mode('choose');
  await must('[data-tech="filtration"]');
  ov = await overlay();
  ok('choosing filtration for sea water: “Not the right technique” - the dissolved salt goes through the paper',
     hasCard(ov, /Not the right technique/) && /passes straight through the filter paper/.test(ov.text) && /distillation/i.test(ov.text), ov);
  await closeOv();
  await must('[data-tech="distillation"]');
  await must('[data-why="solubility"]');
  ok('the right technique with the wrong reason is not accepted', (await dbg()).ch.done.length === 0);
  await must('[data-why="bp"]');
  d = await dbg();
  ok('distillation + different boiling points sorts sea water and moves on', d.ch.done.includes('sea_water') && d.ch.idx === 1 && d.ch.phase === 'tech', d.ch);

  // ── Discoveries tab ─────────────────────────────
  console.log('\n-- discoveries');
  await must('[data-panel="found"]');
  ok('the Discoveries tab shows found cards and clues for the rest',
     await ev("document.querySelectorAll('.lab-found-card.is-found').length >= 10 && /Clue:/.test(document.querySelector('.lab-found').textContent)"));
  await must('.lab-found-card.is-found[data-disc="d_sea"]');
  ov = await overlay();
  ok('tapping a found discovery: what you saw, why it happens, “Do it again”', ov && /What you saw/.test(ov.text) && /Why it happens/.test(ov.text) && /1413 °C/.test(ov.text) && /Do it again/.test(ov.text), ov);
  await closeOv();
  const lockedId = await ev("(document.querySelector('.lab-found-card:not(.is-found)') || {}).dataset?.disc || null");
  if (lockedId) {
    await must(`.lab-found-card[data-disc="${lockedId}"]`);
    ov = await overlay();
    ok('tapping a locked discovery shows how to find it, with “Show me how”', ov && /How to find it/.test(ov.text) && /Show me how/.test(ov.text), ov);
    await closeOv();
  }

  // Every clue must be solvable: follow each discovery's own "Show me how" from
  // a clean bench, reading (closing) any card it produces on the way.
  const discIds = await ev('LabSeparationData.DISCOVERIES.map(d => d.id)');
  const unsolved = [];
  for (const id of discIds) {
    const res = await ev(`(() => {
      const st = Labs.store('separation'); delete st.disc['${id}'];
      document.getElementById('lab-overlay')?.remove();
      LabSeparation.discoveryGuide('${id}');
      for (let k = 0; k < 220 && LabSeparation._debug().guide; k++) {
        const ov = document.getElementById('lab-overlay');
        if (ov) { const b = ov.querySelector('[data-ov-close]'); if (b) b.click(); else ov.remove(); continue; }
        const btn = document.querySelector('#lab-guide [data-guide-do]');
        if (btn) btn.click();
        LabSeparation._tick(0.5);
      }
      if (LabSeparation._debug().guide) return 'guide never finished at step ' + LabSeparation._debug().guide.step;
      document.getElementById('lab-overlay')?.remove();
      return !!st.disc['${id}'];
    })()`);
    if (res !== true) unsolved.push(id + ' → ' + res);
  }
  ok(`all ${discIds.length} discoveries unlock by following their own “Show me how”`, unsolved.length === 0, unsolved);
  cnt = await counter();
  ok('…and the counter says so', cnt.shown === `${discIds.length}/${discIds.length}` && cnt.saved === cnt.shown, cnt);

  // ── Missions ────────────────────────────────────
  console.log('\n-- missions');
  const answerAll = idx => ev(`(() => {
    const qs = LabSeparationData.MISSIONS[${idx}].quiz;
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

  await must('[data-panel="missions"]');
  await must('.lab-missions [data-mission="seawater"]');
  ok('Pure water from sea water: the mission card lists its steps', /Build the rig \(0 of 6 parts\)/.test(await ev("document.getElementById('lab-mission').textContent")));
  for (const [k, v] of [['flask', 'sea'], ['granules', 'yes'], ['thermo', 'arm'], ['condenser', 'bottom'], ['receiver', 'open'], ['burner', 'yes']]) await part(k, v);
  await tool('heat');
  await tick(20);
  d = await dbg();
  ok('built from the shelf and run: 25 cm³ of pure water - mission success', d.mission && d.mission.success && d.mission.hazards === 0 && d.mission.mistakes === 0, d.mission);
  await must('[data-act="quiz"]');
  ok('its exam-style quiz (word-bank labels, condenser water, two errors) ends with 3 stars', (await answerAll(0)) === '3 of 3 stars');
  ok('the stars are saved', await ev("Labs.store('separation').missions.seawater.stars === 3"));
  await closeOv();

  await ev("LabSeparation.startMission('crystals'); true");
  await tool('heat');
  for (let i = 0; i < 40 && !(await dbg()).cry.rodOK; i++) { await tick(1); await tool('rod'); }
  await tool('heat');
  await tool('cool-slow');
  await tick(14);
  d = await dbg();
  ok('Grow crystals: rod test, heat off, cool slowly - mission success', d.mission && d.mission.success && d.mission.mistakes === 0, d.mission);
  await must('[data-act="quiz"]');
  ok('…3 stars', (await answerAll(1)) === '3 of 3 stars');
  await closeOv();

  await ev("LabSeparation.startMission('sorter'); true");
  for (let i = 0; i < 6; i++) {
    await ev(`(() => { const D = LabSeparationData, m = D.MIXTURES[LabSeparation._debug().ch.idx];
      document.querySelector('[data-tech="' + m.tech + '"]').click();
      document.querySelector('[data-why="' + D.TECH_PRINCIPLE[m.tech] + '"]').click(); return true; })()`);
  }
  d = await dbg();
  ok('Choose the technique: all six mixtures sorted - mission success', d.mission && d.mission.success && d.ch.done.length === 6, d);
  await must('[data-act="quiz"]');
  ok('…3 stars', (await answerAll(2)) === '3 of 3 stars');
  await closeOv();

  // ── Motion, Calm Mode, phone ─────────────────────
  console.log('\n-- motion, calm, phone');
  await ev("LabSeparation._test({ instant: false }); true");
  await must('[data-panel="sandbox"]');
  await mode('sublime');
  await tool('reset');
  await part('mixture', 'iodine'); await part('place', 'hood'); await part('cover', 'funnel_plug');
  await tool('heat');
  await sleep(2200);
  d = await dbg();
  ok('with animation on, the loop runs: vapour particles rise and sublimate builds up in real time', d.particles > 0 && d.sub.sublimate > 0, { p: d.particles, s: d.sub });
  ok('the canvas has drawn the scene', await ev("(() => { const c = document.getElementById('lab-canvas'); const p = c.getContext('2d').getImageData(c.width / 2, c.height / 2, 1, 1).data; return p[3] > 0; })()"));
  await tool('heat');
  await mode('crystal');
  await tool('reset');
  await tool('heat');
  await sleep(2400);
  await tool('rod');
  d = await dbg();
  ok('the glass-rod test animates first (the bench waits for it)', d.busy === true && d.fx === 1 && d.cry.rods === 0, d);
  await sleep(1400);
  ok('…then its result lands', (await dbg()).cry.rods === 1);
  await ev("document.documentElement.classList.add('kid-calm'); true");
  const w0 = (await dbg()).cry.water;
  await tool('rod');
  d = await dbg();
  ok('in Calm Mode the rod test applies at once, with no animation', d.busy === false && d.cry.rods === 2 && d.fx === 0, d);
  await sleep(1500);
  ok('…and the simulation still runs (water keeps evaporating)', (await dbg()).cry.water < w0);
  await tool('heat');
  await ev("document.documentElement.classList.remove('kid-calm'); true");

  const fitAll = [];
  for (const m of ['distil', 'crystal', 'sublime', 'choose']) {
    await mode(m);
    fitAll.push(await ev(`(() => { const vw = innerWidth;
      const off = [...document.querySelectorAll('#labs-root button, #labs-root canvas')]
        .filter(e => e.getBoundingClientRect().width && e.getBoundingClientRect().right > vw + 0.5)
        .map(e => (e.dataset.part || e.dataset.act || e.dataset.mode || e.dataset.tech || e.tagName) + ' → ' + Math.round(e.getBoundingClientRect().right));
      const small = [...document.querySelectorAll('#labs-root .lab-body button')].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.height < 40); })
        .map(e => e.className + ':' + Math.round(e.getBoundingClientRect().height));
      return { m: '${m}', root: document.getElementById('labs-root').scrollWidth, vw, off, small }; })()`));
  }
  ok('every bench fits a 360px phone (no control past the edge of the screen)', fitAll.every(f => f.root <= f.vw && !f.off.length), fitAll);
  ok('…with tap targets at least 40px tall', fitAll.every(f => !f.small.filter(s => !/lab-link/.test(s)).length), fitAll.map(f => f.small));

  await ev("showScreen('student-home'); true");
  ok('leaving the screen stops the animation loop cleanly', await ev("typeof S !== 'undefined' && S.currentScreen !== 'labs'"));
  ok('no page errors along the way', errors.length === 0, errors.slice(0, 5));

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
