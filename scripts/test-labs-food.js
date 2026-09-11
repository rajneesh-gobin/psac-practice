'use strict';
// Science Labs › Food Tests, driven in a real browser.
//
// Opens the lab through the shell at Grade 8, then proves: the start panel says
// what to do; a guided experiment (Test for sugar) runs end to end and the
// Benedict's colour climbs the ladder as it heats; every hazard card stops the
// experiment with its real signs (the mandatory "Wear eye protection" sign
// beside the hazard); every result card explains a false result; every
// discovery unlocks by following its own "Show me how"; both missions reach
// three stars; Calm Mode applies effects at once; the bench fits a 360px phone
// with 44px tap targets; the loop restarts after leaving the Labs screen and
// coming back; and nothing throws.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-food.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
// ⚠ Debugging port 9422 (LAB_DBG_PORT overrides) - other lab builds use other ports.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = Number(process.env.LAB_DBG_PORT) || 9422;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0, chrome = null;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail).slice(0, 900) : '')); } };

(async () => {
  const tmp = process.env.LAB_TMP || os.tmpdir();
  fs.mkdirSync(tmp, { recursive: true });
  chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + fs.mkdtempSync(path.join(tmp, 'psac-labs-food-')),
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
  const dbg = () => ev('LabFood._debug()');
  const tick = s => ev(`LabFood._tick(${s}); true`);
  const overlay = () => ev(`(() => { const o = document.getElementById('lab-overlay'); if (!o) return null;
    const h = o.querySelector('.is-exam h3');
    return { cls: o.className, text: o.textContent.replace(/\\s+/g, ' ').slice(0, 3000), exam: h ? h.textContent : '',
             signs: [...o.querySelectorAll('.lab-sign figcaption')].map(f => f.textContent),
             blueDisc: !!o.querySelector('.lab-sign svg circle[fill="#1F5FAD"]') }; })()`);
  const closeOv = () => click('#lab-overlay [data-ov-close]');
  const tool = act => must(`#lab-food-tools [data-act="${act}"]`);
  const slot = n => must(`#lab-food-slots [data-slot="${n}"]`);
  const food = async id => { await must('[data-shelf="food"]'); await must(`[data-add="food"][data-id="${id}"]`); };
  const test = async id => { await must('[data-shelf="test"]'); await must(`[data-add="test"][data-id="${id}"]`); };
  const setGoggles = async on => { if ((await dbg()).goggles !== on) await must('#lab-goggles'); };
  const hazardOk = (ov, signs, re) => !!(ov && /is-hazard/.test(ov.cls) && signs.every(s => ov.signs.includes(s)) && re.test(ov.text)
    && /What happened/.test(ov.text) && /Why it’s dangerous/.test(ov.text) && /Do this instead/.test(ov.text) && /In your exams/.test(ov.exam));
  const resultOk = (ov, re) => !!(ov && /is-result/.test(ov.cls) && re.test(ov.text) && /What happened/.test(ov.text) && /What you should have done/.test(ov.text) && /In your exams/.test(ov.exam));

  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof showScreen === 'function' && typeof RoleModules !== 'undefined'"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url + ', not the file we navigated to.'); quit(1); }
  ok('app loaded', ready === true);
  await sleep(2500);

  // ── Opening the lab ─────────────────────────────
  console.log('\n-- opening Food Tests at Grade 8');
  await ev("SELECTED_GRADE = 8; showScreen('labs'); true");
  let up = false;
  for (let i = 0; i < 60 && !up; i++) { await sleep(200); up = await ev("typeof Labs !== 'undefined' && !!document.getElementById('labs-root')"); }
  ok('the Labs shell loads', up);
  await ev("Labs.openLab('food'); true");
  let open = false;
  for (let i = 0; i < 60 && !open; i++) { await sleep(200); open = await ev("!!window.LabFood && !!document.querySelector('#labs-root .lab-food')"); }
  ok('Labs.openLab("food") loads the bench and it renders', open);
  const labScripts = await ev("[...document.scripts].map(s => s.src).filter(s => /engine\\/labs\\//.test(s)).map(s => s.split('/').pop()).join()");
  ok('it fetches its own data and bench files, after the shell', labScripts === 'lab_core.js,lab_food_data.js,lab_food.js', labScripts);
  await sleep(500);
  ok('lab_food.css is linked and styles the bench',
     await ev("!!document.querySelector('link[data-lab-css=\"food\"]') && getComputedStyle(document.querySelector('.lab-food-slots')).display === 'grid'"));
  ok('Labs.grade() is 8 (the row is registered for Grade 8) and the bench runs at Grade 8',
     (await ev('Labs.grade()')) === 8 && (await dbg()).grade === 8);
  ok('the eyebrow says “Science · Grade 8”', (await ev("document.querySelector('.lab-eyebrow').textContent")) === 'Science · Grade 8');
  let ov = await overlay();
  ok('first visit shows the welcome card with “Show me how”', ov && /Welcome to Food Tests/.test(ov.text) && /Show me how/.test(ov.text), ov);
  await closeOv();
  ok('the welcome is remembered', await ev("Labs.store('food').intro === true"));
  await ev('LabFood._test({ instant: true }); true');

  // ── The start panel ─────────────────────────────
  console.log('\n-- what to do here');
  const start = await ev(`({ start: !!document.querySelector('.lab-start'), h: (document.querySelector('.lab-start h2') || {}).textContent,
    guides: [...document.querySelectorAll('.lab-start [data-guide]')].map(b => b.dataset.guide).join(),
    missions: [...document.querySelectorAll('.lab-start [data-mission]')].map(b => b.dataset.mission).join(),
    tabs: [...document.querySelectorAll('.lab-tabs [data-panel]')].map(b => b.textContent.trim().split(' ')[1]).join() })`);
  ok('the Bench tab opens with “What would you like to do?”, 5 guided experiments and 2 missions',
     start.start && /What would you like to do/.test(start.h) && start.guides === 'starch,sugar,protein,fat,emulsion' && start.missions === 'name_it,mystery', start);
  ok('tabs: Bench, Missions, Discoveries', start.tabs === 'Bench,Missions,Discoveries', start.tabs);

  // ── A guided experiment, end to end ─────────────
  console.log('\n-- guided experiment: Test for sugar');
  await must('.lab-start [data-guide="sugar"]');
  const gs = () => ev(`({ text: document.getElementById('lab-guide').textContent.replace(/\\s+/g, ' '), hidden: document.getElementById('lab-guide').hidden,
    next: (() => { const n = document.querySelector('.is-next'); return n ? (n.id || (n.dataset.add ? n.dataset.add + ':' + n.dataset.id : n.dataset.act || ('slot:' + n.dataset.slot))) : null; })(),
    start: !!document.querySelector('.lab-start') })`);
  let g = await gs();
  ok('step 1 asks for goggles, and the goggles glow', !g.hidden && /Step 1 of 8/.test(g.text) && g.next === 'lab-goggles' && !g.start, g);
  await must('[data-guide-do]');
  g = await gs();
  ok('tube 1 is already chosen, so the guide skips to the glucose, which glows on the shelf', /Step 3 of 8/.test(g.text) && g.next === 'food:glucose', g);
  await food('glucose');
  g = await gs();
  ok('tapping the glowing shelf item itself moves the guide on: Benedict’s glows next', g.next === 'test:benedicts', g);
  await must('[data-guide-do]');
  g = await gs();
  ok('then the water bath glows', g.next === 'lab-food-bath' &&/never heat it in the flame/i.test(g.text), g);
  await must('[data-guide-do]');
  let d = await dbg();
  ok('the tube is in the bath and the burner is lit', d.slots[0].bath && d.burner && /Keep watching/.test((await gs()).text), d);
  const seen = [];
  for (let i = 0; i < 40 && !d.slots[0].finished; i++) { await tick(0.25); d = await dbg(); if (!seen.includes(d.slots[0].word)) seen.push(d.slots[0].word); }
  ok(`as it heats, Benedict’s climbs the ladder: ${seen.join(' → ')}`, seen.join() === 'blue,green,yellow,orange,brick-red', seen);
  ok('the bath sits at 80 °C and the tube is above 70 °C', Math.round(d.bathT) === 80 && d.slots[0].T >= 70, d);
  ok('the chip over the rack says the colour in words', /brick-red/.test(await ev("document.getElementById('lab-food-now').textContent")));
  g = await gs();
  ok('the guide asks to read it; Read result glows', g.next === 'read', g);
  await must('[data-guide-do]');
  await must('[data-guide-do]');
  ov = await overlay();
  d = await dbg();
  ok('read, burner off - “Experiment complete” with “What you found out”', !d.burner && ov && /Experiment complete/.test(ov.text) && /What you found out/.test(ov.text), ov);
  ok('it is remembered, and offers the next one', await ev("!!Labs.store('food').guides.sugar") && /Next: Test for starch/.test(ov.text));
  await closeOv();
  const nb = await ev("document.getElementById('lab-notebook').textContent.replace(/\\s+/g,' ')");
  ok('the notebook table has the result in words and what it means', /Glucose/.test(nb) && /brick-red/.test(nb) && /reducing sugar present/.test(nb), nb.slice(0, 300));
  ok('discovery: brick-red for glucose', await ev("!!Labs.store('food').disc.sugar_brick"));
  const counter = () => ev(`(() => { const D = LabFoodData, st = Labs.store('food'), mine = D.forGrade(D.DISCOVERIES, 8);
    return { shown: document.getElementById('lab-found-n').textContent, saved: mine.filter(x => st.disc[x.id]).length + '/' + mine.length }; })()`);
  let cnt = await counter();
  ok('the ✨ counter matches what is saved', cnt.shown === cnt.saved, cnt);

  // ── Hazards ─────────────────────────────────────
  console.log('\n-- hazards');
  await tool('clean');
  await food('glucose'); await test('benedicts');
  await tool('flame');
  ov = await overlay();
  ok('heating a tube in the flame: HOT SURFACE + WEAR EYE PROTECTION hazard card', hazardOk(ov, ['Hot surface', 'Wear eye protection'], /never heat a test tube straight in the flame/), ov);
  ok('…the goggles sign is the blue mandatory disc, captioned “Wear eye protection”', ov && ov.blueDisc && ov.signs.includes('Wear eye protection'));
  ok('…and the exam heading is “In your exams” (Grade 8), not the NCE paper', ov && ov.exam === '📝 In your exams', ov && ov.exam);
  await closeOv();
  ok('…the liquid shot out: tube 1 is empty', (await dbg()).slots[0].food === null);

  await setGoggles(false);
  await tool('clean');
  await food('gelatine'); await test('biuret');
  ov = await overlay();
  ok('Biuret without goggles: CORROSIVE + WEAR EYE PROTECTION hazard card', hazardOk(ov, ['Corrosive', 'Wear eye protection'], /sodium hydroxide/), ov);
  await closeOv();
  ok('…and no Biuret went in', (await dbg()).slots[0].test === null);
  await setGoggles(true);

  await tool('clean');
  if (!(await dbg()).burner) await tool('burner');
  await food('oil'); await test('ethanol');
  ov = await overlay();
  ok('the ethanol test with the burner lit: FLAMMABLE hazard card', hazardOk(ov, ['Flammable'], /still lit/), ov);
  await closeOv();
  d = await dbg();
  ok('…the fire is out, the burner is off and no ethanol went in', !d.burner && d.slots[0].test === null, d);
  await test('ethanol');
  await tool('burner');
  ov = await overlay();
  ok('lighting the burner with ethanol on the bench: FLAMMABLE hazard card', hazardOk(ov, ['Flammable'], /You lit the Bunsen burner/), ov);
  await closeOv();
  ok('…and the burner stays off', (await dbg()).burner === false);

  await tool('taste');
  ov = await overlay();
  ok('tasting a food in the lab: TOXIC hazard card', hazardOk(ov, ['Toxic'], /never taste anything in the lab/), ov);
  await closeOv();
  ok('every hazard was counted', await ev("(() => { const h = Labs.store('food').hazards; return ['flame_heat','biuret_eyes','ethanol_flame','tasting'].every(k => h[k] >= 1); })()"));

  // ── Result cards ────────────────────────────────
  console.log('\n-- wrong-but-safe mistakes');
  await tool('clean');
  await food('glucose'); await test('benedicts');
  await tool('read');
  ov = await overlay();
  ok('reading Benedict’s without heating: “never heated” - a false negative', resultOk(ov, /never heated/) && /false negative/.test(ov.text), ov);
  await closeOv();

  await tool('clean');
  await food('gelatine'); await test('biuret');
  await tick(0.5);
  await tool('read');
  ov = await overlay();
  ok('reading Biuret straight away: “too soon”', resultOk(ov, /too soon/), ov);
  await closeOv();
  await tick(3);
  await tool('read');
  ok('…after a few minutes it reads purple, and no card', !(await overlay()) && /gelatine\|biuret\|purple\|$/.test((await dbg()).reads[0]), (await dbg()).reads[0]);

  await tool('clean');
  await food('water'); await test('paper');
  await tool('read');
  ov = await overlay();
  ok('reading a grease spot while wet: “while it was wet”', resultOk(ov, /while it was wet/), ov);
  await closeOv();
  await tick(5);
  await tool('read');
  ok('…dry, the water spot has gone', /no spot/.test((await dbg()).reads[0]));

  await tool('clean');
  await food('glucose'); await slot(2); await food('cornflour');
  d = await dbg();
  ok('an unrinsed spatula carries glucose into tube 2', d.slots[1].trace === 'glucose' && /has cornflour on it/.test(await ev("document.getElementById('lab-contents').textContent")), d.slots[1]);
  await test('benedicts'); await tool('bath'); await tick(8);
  ok('…cornflour turns Benedict’s green on the canvas and in the chip', (await dbg()).slots[1].word === 'green' && /green/.test(await ev("document.getElementById('lab-food-now').textContent")));
  await tool('read');
  ov = await overlay();
  ok('…reading it: “A dirty spatula spoiled the test” (a false positive)', resultOk(ov, /dirty spatula/) && /glucose/.test(ov.text), ov);
  await closeOv();

  await tool('clean');
  await food('cornflour'); await test('iodine'); await tool('rinse');
  await slot(2); await food('glucose'); await test('iodine');
  await tool('read');
  ov = await overlay();
  ok('comparing two foods with iodine and no water tube: “No control tube”', resultOk(ov, /No control tube/), ov);
  await closeOv();
  await tool('rinse'); await slot(3); await food('water'); await test('iodine'); await tool('read');
  ok('…a water control reads orange-brown with no card, and unlocks “The control”', !(await overlay()) && await ev("!!Labs.store('food').disc.control"));

  // ── Discoveries tab ─────────────────────────────
  console.log('\n-- discoveries');
  await must('[data-panel="found"]');
  ok('the Discoveries tab shows found cards and clues for the rest',
     await ev("document.querySelectorAll('.lab-found-card.is-found').length >= 6 && /Clue:/.test(document.querySelector('.lab-found').textContent)"));
  await must('.lab-found-card.is-found[data-disc="sugar_brick"]');
  ov = await overlay();
  ok('tapping a found discovery: what you saw, the test, why it happens, “Do it again”',
     ov && /What you saw/.test(ov.text) && /The test/.test(ov.text) && /blue → green → yellow → orange → brick-red/.test(ov.text) && /Why it happens/.test(ov.text) && /Do it again/.test(ov.text), ov);
  await closeOv();
  const lockedId = await ev("(document.querySelector('.lab-found-card:not(.is-found)') || {}).dataset?.disc || null");
  if (lockedId) {
    await must(`.lab-found-card[data-disc="${lockedId}"]`);
    ov = await overlay();
    ok('tapping a locked discovery shows how to find it, with “Show me how”', ov && /How to find it/.test(ov.text) && /Show me how/.test(ov.text), ov);
    await closeOv();
  }
  const list = await ev('LabFoodData.forGrade(LabFoodData.DISCOVERIES, 8).map(d => d.id)');
  const unsolved = [];
  for (const id of list) {
    const res = await ev(`(() => {
      const st = Labs.store('food'); delete st.disc['${id}'];
      document.getElementById('lab-overlay')?.remove();
      LabFood.discoveryGuide('${id}');
      if (!LabFood._debug().guide) return 'guide did not start';
      for (let k = 0; k < 240 && LabFood._debug().guide; k++) {
        const ov = document.getElementById('lab-overlay');
        if (ov) { const b = ov.querySelector('[data-ov-close]'); if (b) b.click(); else ov.remove(); continue; }
        const btn = document.querySelector('#lab-guide [data-guide-do]');
        if (btn) btn.click();
        LabFood._tick(0.5);
      }
      if (LabFood._debug().guide) return 'guide never finished at step ' + LabFood._debug().guide.step;
      document.getElementById('lab-overlay')?.remove();
      return !!st.disc['${id}'];
    })()`);
    if (res !== true) unsolved.push(id + ' → ' + res);
  }
  ok(`all ${list.length} discoveries unlock by following their own “Show me how”`, list.length >= 12 && unsolved.length === 0, unsolved);
  cnt = await counter();
  ok('…and the counter says so', cnt.shown === `${list.length}/${list.length}` && cnt.saved === cnt.shown, cnt);

  // ── Missions ────────────────────────────────────
  console.log('\n-- missions');
  const answerAll = id => ev(`(() => {
    const qs = LabFoodData.MISSIONS.find(m => m.id === ${JSON.stringify(id)}).quiz;
    for (let i = 0; i < qs.length; i++) {
      const card = document.querySelector('#lab-overlay .lab-ov-card');
      const q = card.querySelector('.lab-quiz-q').textContent;
      const def = qs.find(x => x.q === q), want = typeof def.options[0] === 'object' ? def.options[0].label : def.options[0];
      const btn = [...card.querySelectorAll('.lab-quiz-opt')].find(b => b.lastElementChild.textContent === want);
      btn.click();
      card.querySelector('[data-next]').click();
    }
    const done = document.querySelector('#lab-overlay .lab-done .lab-stars');
    return done ? done.getAttribute('aria-label') : 'no result card';
  })()`);
  await setGoggles(true);
  await must('[data-panel="missions"]');
  await must('.lab-missions [data-mission="name_it"]');
  ok('Name that nutrient: the mission card lists the four foods', /Cornflour: find its nutrient/.test(await ev("document.getElementById('lab-mission').textContent")));
  await food('cornflour'); await test('iodine'); await tool('read'); await tool('rinse');
  await slot(2); await food('glucose'); await test('benedicts'); await tool('bath'); await tick(8); await tool('read'); await tool('rinse');
  await slot(3); await food('gelatine'); await test('biuret'); await tick(4); await tool('read'); await tool('rinse');
  await slot(4); await food('oil'); await test('paper'); await tick(6); await tool('read');
  d = await dbg();
  ok('four foods, four right tests, four positives - mission success with no mistakes', d.mission && d.mission.success && !d.mission.hazards && !d.mission.mistakes, d.mission);
  await must('[data-act="quiz"]');
  ok('the first question shows four picture options (tubes) for “which tube shows starch?”',
     (await ev("document.querySelectorAll('#lab-overlay .lab-quiz-pic svg').length")) === 4 && /Which tube/.test(await ev("document.querySelector('.lab-quiz-q').textContent")));
  ok('…its 5 exam-style questions end with 3 stars', (await answerAll('name_it')) === '3 of 3 stars');
  ok('the stars are saved', await ev("Labs.store('food').missions.name_it.stars === 3"));
  await closeOv();

  await ev("LabFood.startMission('mystery'); true");
  ok('the mystery powder is on the shelf only during its mission', await ev("!!document.querySelector('[data-add=\"food\"][data-id=\"mystery\"]')"));
  await food('mystery'); await test('iodine'); await tool('read'); await tool('rinse');
  await slot(2); await food('mystery'); await test('benedicts'); await tool('bath'); await tick(8); await tool('read'); await tool('rinse');
  await slot(3); await food('mystery'); await test('biuret'); await tick(4); await tool('read'); await tool('rinse');
  await slot(4); await food('mystery'); await test('paper'); await tick(6); await tool('read'); await tool('rinse');
  await slot(5); await food('water'); await test('iodine'); await tool('read');
  d = await dbg();
  ok('four tests on powder X plus a water control - mission success', d.mission && d.mission.success && !d.mission.mistakes && d.mission.results.includes('control'), d.mission);
  ok('…powder X read blue-black and brick-red, Biuret blue and no spot',
     d.reads.some(r => /^mystery\|iodine\|blue-black/.test(r)) && d.reads.some(r => /^mystery\|benedicts\|brick-red/.test(r)) && d.reads.some(r => /^mystery\|biuret\|blue\|/.test(r)), d.reads);
  await must('[data-act="quiz"]');
  ok('…3 stars', (await answerAll('mystery')) === '3 of 3 stars');
  ok('the stars are saved', await ev("Labs.store('food').missions.mystery.stars === 3"));
  await closeOv();
  await ev("LabFood.startMission('mystery'); document.querySelector('[data-act=\"exit-mission\"]').click(); true");
  ok('…and powder X leaves the shelf with the mission', !(await ev("!!document.querySelector('[data-add=\"food\"][data-id=\"mystery\"]')")));

  // ── Motion, Calm Mode ────────────────────────────
  console.log('\n-- motion and calm');
  await ev("LabFood._test({ instant: false }); true");
  await must('[data-panel="sandbox"]');
  await tool('clean');
  await food('glucose');
  d = await dbg();
  ok('with animation on, the spatula drops the food first (the bench waits for it)', d.busy === true && d.fx === 1 && d.slots[0].food === null, d);
  await sleep(900);
  ok('…then the food lands', (await dbg()).slots[0].food === 'glucose');
  ok('the loop is running and the canvas has drawn the scene', (await dbg()).looping
     && await ev("(() => { const c = document.getElementById('lab-food-canvas'); const p = c.getContext('2d').getImageData(c.width / 2, c.height / 2, 1, 1).data; return p[3] > 0; })()"));
  await test('benedicts'); await sleep(700);
  await tool('flame');
  d = await dbg();
  ok('a hazard shows its consequence on the canvas first: the liquid spits before the card', d.busy === true && d.fx === 1 && !(await overlay()), d);
  await sleep(1400);
  ok('…then the card lands', !!(await overlay()));
  await closeOv();
  await ev("document.documentElement.classList.add('kid-calm'); true");
  await food('glucose');
  d = await dbg();
  ok('in Calm Mode a food goes in at once, with no animation', d.busy === false && d.fx === 0 && d.slots[0].food === 'glucose', d);
  await test('benedicts');
  await tool('taste');
  d = await dbg();
  ok('…and a hazard card comes at once', d.fx === 0 && !!(await overlay()));
  await closeOv();
  await tool('bath');
  const T0 = (await dbg()).slots[0].T;
  await sleep(1500);
  ok('…while the simulation still runs (the tube warms in the bath)', (await dbg()).slots[0].T > T0);
  await ev("document.documentElement.classList.remove('kid-calm'); true");
  await ev('LabFood._test({ instant: true }); true');
  await tool('burner');

  // ── Phone ────────────────────────────────────────
  console.log('\n-- phone');
  const fit = label => ev(`(() => { const vw = innerWidth;
    const off = [...document.querySelectorAll('#labs-root button, #labs-root canvas')]
      .filter(e => e.getBoundingClientRect().width && e.getBoundingClientRect().right > vw + 0.5)
      .map(e => (e.dataset.act || e.dataset.slot || e.dataset.id || e.dataset.panel || e.className || e.tagName) + ' → ' + Math.round(e.getBoundingClientRect().right));
    const small = [...document.querySelectorAll('#labs-root .lab button')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height < 44 && !e.classList.contains('lab-link'); })
      .map(e => (e.className || e.tagName) + ':' + Math.round(e.getBoundingClientRect().height));
    return { label: '${label}', root: document.getElementById('labs-root').scrollWidth, body: document.documentElement.scrollWidth, vw, off, small }; })()`);
  const fits = [];
  await tool('clean');
  await must('[data-shelf="food"]'); fits.push(await fit('bench + foods'));
  await must('[data-shelf="test"]'); fits.push(await fit('bench + tests'));
  await must('[data-panel="missions"]'); fits.push(await fit('missions'));
  await must('[data-panel="found"]'); fits.push(await fit('discoveries'));
  await must('[data-panel="sandbox"]');
  ok('the bench fits a 360px phone (no control past the edge of the screen)', fits.every(f => f.root <= f.vw && f.body <= f.vw && !f.off.length), fits);
  ok('…with tap targets at least 44px tall', fits.every(f => !f.small.length), fits.map(f => f.small));

  // ── Leaving and coming back ──────────────────────
  console.log('\n-- leaving and coming back');
  await ev("showScreen('student-home'); true");
  await sleep(500);
  ok('leaving the Labs screen stops the animation loop', (await ev('LabFood._debug().looping')) === false);
  await ev("showScreen('labs'); true");
  let back = false;
  for (let i = 0; i < 20 && !back; i++) { await sleep(200); back = await ev("!!document.querySelector('#labs-root .lab-food') && LabFood._debug().looping"); }
  ok('coming back to the Labs screen restarts it', back);
  ok('no page errors along the way', errors.length === 0, errors.slice(0, 5));

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); try { if (chrome) chrome.kill(); } catch (_) {} process.exit(1); });
