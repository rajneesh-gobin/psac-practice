'use strict';
// Science Labs › Mixing Bench, driven in a real browser.
//
// Proves the feature end to end: only an NCE pupil with a lab sees the door,
// the lab code is fetched only when opened, the hazards stop the experiment and
// explain themselves, reactions land in the notebook with their equations, the
// gas test pops, both missions can be finished and scored, the animation loop
// really runs, and the bench fits a 360px phone.
//
// Then the Grade 8 level (LAB_SPEC §9): only its own guides, missions and
// discoveries, its shelf and tools, its three hazards and four result cards,
// a mission to three stars, every discovery by its own "Show me how", Calm
// Mode and a 360px phone - and Grade 9 exactly as it was when you come back.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-mixing.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
// ⚠ Until the lead lists Grade 8 on the mixing row (Labs.LABS / _LAB_GRADES),
//   Labs.grade() says 9 for this lab whatever the pupil's grade. atGrade()
//   then overrides Labs.grade (and prints a NOTE); once registered it takes
//   the real path with no edit here.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9420;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); } };

(async () => {
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-labs-')),
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
  const dbg = () => ev('LabMixing._debug()');
  const overlay = () => ev(`(() => { const o = document.getElementById('lab-overlay'); if (!o) return null;
    return { cls: o.className, text: o.textContent.replace(/\\s+/g, ' ').slice(0, 3000),
             signs: [...o.querySelectorAll('.lab-sign figcaption')].map(f => f.textContent) }; })()`);
  const closeOv = () => click('#lab-overlay [data-ov-close]');
  const add = (kind, id) => click(`[data-add="${kind}"][data-id="${id}"]`);
  const shelf = kind => click(`[data-shelf="${kind}"]`);

  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof openLabs === 'function' && typeof RoleModules !== 'undefined'"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url + ', not the file we navigated to.'); quit(1); }
  ok('app loaded', ready === true);
  await sleep(2500);

  // ── Who sees the door ───────────────────────────
  console.log('\n-- the door');
  ok('no lab code is loaded before anyone opens a lab',
     await ev("typeof Labs === 'undefined' && ![...document.scripts].some(s => /engine\\/labs\\//.test(s.src))"));
  const noteShown = async g => ev(`(() => { SELECTED_GRADE = ${g}; showScreen('student-home'); return getComputedStyle(document.getElementById('sh-note-labs')).display !== 'none'; })()`);
  // Grades 4-7 have labs now (scripts/test-labs-grades.js covers them). Grade 3
  // is never planned a lab, so it is the "no labs" case here.
  ok('a Grade 3 pupil does not see it (no Grade 3 lab)', !(await noteShown(3)));
  ok('a Grade 9 (NCE) pupil sees Science Labs', await noteShown(9));
  // A child whose parent ticked Grade 9 in ⚙️ Controls › Grade access.
  const withGrant = async grant => ev(`(() => {
    if (typeof DB === 'undefined' || !DB) DB = {};
    DB.restrictions = ${grant ? '{ allowedGrades: [9] }' : '{}'};
    SELECTED_GRADE = 3; showScreen('student-home');
    const shown = getComputedStyle(document.getElementById('sh-note-labs')).display !== 'none';
    DB.restrictions = {};
    return shown; })()`);
  ok('a Grade 3 pupil sees Science Labs once a parent grants Grade 9', await withGrant(true));
  ok('…and not without that grant', !(await withGrant(false)));
  await ev("SELECTED_GRADE = 3; openLabs(); true");
  ok('openLabs() refuses a grade with no labs', (await ev('S.currentScreen')) !== 'labs');

  // ── The hub ─────────────────────────────────────
  console.log('\n-- the hub');
  await ev("SELECTED_GRADE = 9; openLabs(); true");
  let hub = false;
  for (let i = 0; i < 40 && !hub; i++) { await sleep(250); hub = await ev("!!document.querySelector('#labs-root .lab-hub')"); }
  ok('Grade 9: the Labs screen opens and the hub renders', hub && (await ev('S.currentScreen')) === 'labs');
  const labScripts = () => ev("[...document.scripts].map(s => s.src).filter(s => /engine\\/labs\\//.test(s)).map(s => s.split('/').pop()).join()");
  ok('the hub loads only the shared lab shell', (await labScripts()) === 'lab_core.js', await labScripts());
  await sleep(600);
  ok('labs.css is loaded and styles the hub', (await ev("getComputedStyle(document.querySelector('.lab-card')).borderRadius")) === '18px');
  ok('the hub groups nine labs by subject; only the ready ones open',
     await ev("document.querySelectorAll('.lab-hub-subject').length === 3 && document.querySelectorAll('.lab-card').length === 9 && !!document.querySelector('.lab-card[data-lab=\"mixing\"]')"));

  // ── The bench ───────────────────────────────────
  console.log('\n-- the bench');
  await click('[data-lab="mixing"]');
  for (let i = 0; i < 40; i++) { await sleep(150); if (await ev("typeof LabMixing !== 'undefined' && !!document.querySelector('.lab-mixing')")) break; }
  ok('opening the Mixing Bench fetches its own two files, after the shell',
     (await labScripts()) === 'lab_core.js,lab_chem_data.js,lab_mixing.js', await labScripts());
  let ov = await overlay();
  ok('first visit shows the welcome card', ov && /Welcome to the Mixing Bench/.test(ov.text), ov);
  await closeOv();
  ok('the welcome is remembered', await ev("Labs.store('mixing').intro === true"));
  await ev('LabMixing._test({ instant: true }); true');

  await add('liquid', 'hcl');
  ov = await overlay();
  ok('acid without goggles is stopped with a CORROSIVE hazard card and the WEAR EYE PROTECTION sign', ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Corrosive') && ov.signs.includes('Wear eye protection'), ov);
  ok('…which says what happened, why, what to do instead and the exam point',
     ov && /What happened/.test(ov.text) && /Why it’s dangerous/.test(ov.text) && /Do this instead/.test(ov.text) && /On the NCE paper/.test(ov.text));
  ok('…and nothing was poured', (await dbg()).v === 0);
  await closeOv();

  await click('[data-act="goggles"]');
  ok('goggles on', (await dbg()).goggles === true);
  await add('liquid', 'hcl');
  await add('liquid', 'indicator');
  let d = await dbg();
  ok('hydrochloric acid and indicator are in the tube', Math.abs(d.v - 5.15) < 1e-9 && d.indicator, d);
  ok('the pH readout says pH 0.0, red, strongly acidic', /pH 0\.0.*red.*strongly acidic/.test(await ev("document.getElementById('lab-ph').textContent")),
     await ev("document.getElementById('lab-ph').textContent"));

  await shelf('metal');
  await add('metal', 'magnesium');
  await ev('LabMixing._tick(3); true');
  d = await dbg();
  ok('magnesium fizzes in the acid', d.metals[0] && d.metals[0].rate > 0.05, d.metals);
  const nb = await ev("document.getElementById('lab-notebook').textContent");
  ok('the notebook records it with the word and symbol equations',
     /Vigorous fizzing/.test(nb) && /magnesium chloride \+ hydrogen/.test(nb) && /Mg \+ 2HCl → MgCl₂ \+ H₂/.test(nb), nb.slice(0, 300));
  ok('discoveries were collected (magnesium in acid, indicator red)',
     await ev("['mg_hcl','ind_acid'].every(id => Labs.store('mixing').disc[id])"));
  const counter = (g = 9) => ev(`(() => { const all = LabChem.forGrade(LabChem.DISCOVERIES, ${g}), st = Labs.store('mixing');
    return { shown: document.getElementById('lab-found-n').textContent, saved: all.filter(d => st.disc[d.id]).length + '/' + all.length }; })()`);
  let cnt = await counter();
  ok('the ✨ counter matches what is saved (it once lagged one behind)', cnt.shown === cnt.saved, cnt);

  await click('[data-act="splint"]');
  ok('the lighted splint gives a squeaky pop and the discovery', (await dbg()).log[0].includes('Squeaky pop') && await ev("!!Labs.store('mixing').disc.pop_test"));

  // sealed tube
  await click('[data-act="rinse"]');
  await shelf('liquid'); await add('liquid', 'hcl');
  await shelf('metal'); await add('metal', 'magnesium');
  await ev('LabMixing._tick(0.6); true');
  await click('[data-act="bung"]');
  await ev('LabMixing._tick(3); true');
  ov = await overlay();
  ok('a bung on a fizzing tube builds pressure and fires out: GAS UNDER PRESSURE hazard', ov && ov.signs.includes('Gas under pressure'), ov);
  await closeOv();
  ok('…and the bung is out afterwards', (await dbg()).bung === false);

  // alkali metal in acid
  await click('[data-act="rinse"]');
  await shelf('liquid'); await add('liquid', 'hcl');
  await shelf('metal'); await add('metal', 'potassium');
  ov = await overlay();
  ok('potassium into acid: EXPLOSIVE + FLAMMABLE hazard card', ov && ov.signs.includes('Explosive') && ov.signs.includes('Flammable'), ov);
  ok('…telling them alkali metals never go in acid', ov && /never added to acids/.test(ov.text));
  await closeOv();
  ok('…and the wrecked tube is replaced with an empty one', (await dbg()).v === 0);

  // teacher demo
  await shelf('liquid'); await add('liquid', 'water');
  await shelf('metal'); await add('metal', 'sodium');
  ok('sodium in pure water runs as a teacher demo behind the safety screen', (await dbg()).demo === true);
  await ev('LabMixing._tick(1); true');
  ok('the demo is logged and discovered', (await dbg()).log.some(l => /Teacher demo: the sodium floats/.test(l)) && await ev("!!Labs.store('mixing').disc.na_water"));
  await ev('LabMixing._tick(5); true');
  ok('the demo ends when the sodium is used up', (await dbg()).demo === false);

  // copper
  await click('[data-act="rinse"]');
  await shelf('liquid'); await add('liquid', 'hcl');
  await shelf('metal'); await add('metal', 'copper');
  await ev('LabMixing._tick(3); true');
  ok('copper in acid: no reaction, and the notebook says why', (await dbg()).log.some(l => /No reaction.*below hydrogen/.test(l)));

  // ── Landing: what to do, and a guided experiment ─────
  console.log('\n-- what to do here');
  await click('[data-panel="sandbox"]');
  ok('the Bench tab opens with "What would you like to do?", 4 guided experiments and both missions',
     await ev("!!document.querySelector('.lab-start') && document.querySelectorAll('.lab-start [data-guide]').length === 4 && document.querySelectorAll('.lab-start [data-mission]').length === 2"));
  await click('.lab-start [data-guide="fizz"]');
  const guideState = () => ev(`({ box: !document.getElementById('lab-guide').hidden,
    text: document.getElementById('lab-guide').textContent.replace(/\\s+/g, ' '),
    next: (document.querySelector('.is-next') || {}).getAttribute ? document.querySelector('.is-next').getAttribute('data-id') || document.querySelector('.is-next').getAttribute('data-act') : null,
    start: !!document.querySelector('.lab-start') })`);
  let gs = await guideState();
  ok('Make it fizz: goggles are already on, so it opens at step 2 - pour hydrochloric acid - and that shelf item glows',
     gs.box && /Step 2 of 6/.test(gs.text) && /hydrochloric acid/.test(gs.text) && gs.next === 'hcl' && !gs.start, gs);
  await click('[data-guide-do]');
  await click('[data-guide-do]');
  gs = await guideState();
  ok('after acid and indicator, magnesium glows (the shelf switched to Metals by itself)', gs.next === 'magnesium' && /Step 4 of 6/.test(gs.text), gs);
  await click('[data-guide-do]');
  gs = await guideState();
  ok('while it reacts, the guide says to keep watching', /Keep watching the tube/.test(gs.text), gs);
  await ev('LabMixing._tick(3); true');
  gs = await guideState();
  ok('then it asks for the lighted splint, which glows', gs.next === 'splint' && /Step 6 of 6/.test(gs.text), gs);
  await click('[data-guide-do]');
  ov = await overlay();
  ok('the squeaky pop completes it, with “What you found out”', ov && /Experiment complete/.test(ov.text) && /What you found out/.test(ov.text) && /hydrogen/.test(ov.text), ov);
  ok('the finished experiment is remembered, and offered next: Acid or alkali?',
     await ev("!!Labs.store('mixing').guides.fizz") && /Next: Acid or alkali/.test(ov.text));
  await closeOv();
  ok('back on the Bench tab, the start panel shows it done', await ev("/✓ done/.test(document.querySelector('.lab-start').textContent)"));

  // ── Missions ───────────────────────────────────
  console.log('\n-- missions');
  const answerAll = mid => ev(`(() => {
    const qs = LabChem.MISSIONS.find(M => M.id === ${JSON.stringify(mid)}).quiz;
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

  await ev("LabMixing.startMission('race'); true");
  for (const m of ['magnesium', 'zinc', 'iron', 'copper']) {
    await click('[data-act="rinse"]');
    await shelf('liquid'); await add('liquid', 'hcl');
    await shelf('metal'); await add('metal', m);
    await ev('LabMixing._tick(3); true');
  }
  d = await dbg();
  ok('Reactivity Race: all four metals recorded', d.mission && d.mission.results.length === 4 && d.mission.success, d.mission);
  const table = await ev("document.querySelector('.lab-table').textContent.replace(/\\s+/g,' ')");
  ok('the results table ranks them Vigorous / Steady / Slow / No bubbles',
     /Magnesium ●●●● Vigorous fizzing\s*Zinc ●●●○ Steady fizzing\s*Iron ●●○○ Slow bubbling\s*Copper ○○○○ No bubbles/.test(table), table);
  await click('[data-act="quiz"]');
  ok('the race quiz ends with 3 stars when every answer is right and nothing was unsafe', (await answerAll('race')) === '3 of 3 stars');
  ok('the stars are saved', await ev("Labs.store('mixing').missions.race.stars === 3"));
  await closeOv();

  await ev("LabMixing.startMission('neutral'); true");
  d = await dbg();
  // 5 mmol of H⁺ in 5.15 cm³ (the indicator adds 0.15) is pH 0.01, not 0.
  ok('Hit pH 7 starts with red acid and indicator', Math.abs(d.v - 5.15) < 1e-9 && d.pH < 0.1, d);
  for (let i = 0; i < 3; i++) await click('[data-drop="5"]');
  for (let i = 0; i < 4; i++) await click('[data-drop="1"]');
  d = await dbg();
  ok('after 19 drops it is still acidic', d.pH < 2 && !d.mission.success, d);
  await click('[data-drop="5"]');
  d = await dbg();
  ov = await overlay();
  ok('one big squirt too many: overshoot card, what happened and what to do instead',
     d.mission.overshot && ov && /Overshot/.test(ov.text) && /What you should have done/.test(ov.text), { d: d.mission, ov });
  await closeOv();
  for (let i = 0; i < 4; i++) await click('[data-drop="acid"]');
  d = await dbg();
  ok('four drops of acid bring it back to exactly pH 7', d.pH === 7 && d.mission.success, d);
  await click('[data-act="quiz"]');
  ok('an overshoot costs a star: 2 stars', (await answerAll('neutral')) === '2 of 3 stars');
  await closeOv();

  // ── Motion, phones, calm ───────────────────────
  console.log('\n-- motion, phone, calm');
  await ev("LabMixing._test({ instant: false }); true");
  // A finished mission leaves the Missions tab open; the shelf is on the Bench tab.
  await click('[data-panel="sandbox"]');
  await click('[data-act="rinse"]');
  await shelf('liquid'); await add('liquid', 'water');
  const mid = (await dbg()).v;
  await sleep(1200);
  ok('with animation on, the pour plays and then lands (the loop is running)', mid === 0 && (await dbg()).v === 5, { mid, after: (await dbg()).v });
  ok('the canvas has drawn the bench', await ev("(() => { const c = document.getElementById('lab-canvas'); const p = c.getContext('2d').getImageData(c.width / 2, c.height / 2, 1, 1).data; return p[3] > 0; })()"));
  await ev("document.documentElement.classList.add('kid-calm'); true");
  await click('[data-act="rinse"]');
  await add('liquid', 'water');
  ok('in Calm Mode the pour applies at once, with no animation', (await dbg()).v === 5);
  await ev("document.documentElement.classList.remove('kid-calm'); true");
  const fit = await ev(`(() => { const vw = innerWidth;
    const off = [...document.querySelectorAll('#labs-root button, #labs-root canvas')]
      .filter(e => e.getBoundingClientRect().right > vw + 0.5)
      .map(e => (e.getAttribute('data-panel') || e.getAttribute('data-act') || e.getAttribute('data-id') || e.tagName) + ' → ' + Math.round(e.getBoundingClientRect().right));
    return { vw, root: document.getElementById('labs-root').scrollWidth, off }; })()`);
  ok('the bench fits a 360px phone (no control past the edge of the screen)', fit.root <= fit.vw && fit.off.length === 0, fit);

  await click('[data-panel="found"]');
  ok('the Discoveries tab shows what was found and clues for the rest',
     await ev("document.querySelectorAll('.lab-found-card.is-found').length >= 8 && /Clue:/.test(document.querySelector('.lab-found').textContent)"));
  await click('.lab-found-card.is-found[data-disc="mg_hcl"]');
  ov = await overlay();
  ok('tapping a found discovery explains it: what you saw, the equation, why it happens',
     ov && /What you saw/.test(ov.text) && /Mg \+ 2HCl → MgCl₂ \+ H₂/.test(ov.text) && /Why it happens/.test(ov.text) && /Do it again/.test(ov.text), ov);
  await closeOv();
  const lockedId = await ev("(document.querySelector('.lab-found-card:not(.is-found)') || {}).dataset?.disc || null");
  if (lockedId) {
    await click(`.lab-found-card[data-disc="${lockedId}"]`);
    ov = await overlay();
    ok('tapping a locked discovery shows how to find it, with “Show me how”', ov && /How to find it/.test(ov.text) && /Show me how/.test(ov.text), ov);
    await closeOv();
  }

  // Every clue must be solvable: follow each discovery's own "Show me how"
  // from a clean tube and check it really unlocks that card.
  const solveAll = async g => {
    await ev("LabMixing._test({ instant: true }); true");
    const ids = await ev(`LabChem.forGrade(LabChem.DISCOVERIES, ${g}).map(d => d.id)`);
    const unsolved = [];
    for (const id of ids) {
      const res = await ev(`(() => {
        const st = Labs.store('mixing'); delete st.disc['${id}'];
        document.getElementById('lab-overlay')?.remove();
        LabMixing.discoveryGuide('${id}');
        for (let k = 0; k < 14 && LabMixing._debug().guide; k++) {
          const hz = document.querySelector('#lab-overlay.is-hazard');
          if (hz) return 'hazard: ' + hz.textContent.replace(/\\s+/g, ' ').slice(0, 90);
          const btn = document.querySelector('#lab-guide [data-guide-do]');
          if (btn) btn.click(); else LabMixing._tick(6);
        }
        if (LabMixing._debug().guide) return 'guide never finished at step ' + LabMixing._debug().guide.step;
        document.getElementById('lab-overlay')?.remove();
        return !!st.disc['${id}'];
      })()`);
      if (res !== true) unsolved.push(id + ' → ' + res);
    }
    return { ids, unsolved };
  };
  let solved = await solveAll(9);
  ok(`all ${solved.ids.length} Grade 9 discoveries unlock by following their own “Show me how”`, solved.ids.length === 21 && solved.unsolved.length === 0, solved.unsolved);
  ok('calcium in plain water is logged as water, not sodium hydroxide', (await dbg()).log.join(' ').indexOf('Calcium + sodium hydroxide') === -1);

  // ══ The Grade 8 level ═════════════════════════
  await ev('window.__labsGrade = Labs.grade; true');
  const atGrade = async n => {
    await ev(`(() => { Labs.closeOverlay(true); Labs.grade = window.__labsGrade; Labs.backToHub(); SELECTED_GRADE = ${n}; showScreen('labs'); return true; })()`);
    for (let i = 0; i < 40; i++) { await sleep(150); if (await ev("typeof window.Labs !== 'undefined' && !!document.getElementById('labs-root')")) break; }
    await ev('Labs.backToHub(); true');
    const registered = await ev(`Labs.labsFor(${n}).some(l => l.id === 'mixing')`);
    if (!registered) {
      console.log(`NOTE Grade ${n}: Labs.LABS does not list Grade ${n} on the mixing row yet, so Labs.grade is overridden to ${n} for this run.`);
      await ev(`Labs.grade = () => ${n}; true`);
    }
    await ev("Labs.openLab('mixing'); true");
    for (let i = 0; i < 60; i++) { await sleep(150); if (await ev(`!!document.querySelector('#labs-root .lab-mixing') && LabMixing._debug().grade === ${n}`)) break; }
    return registered;
  };
  const phText = () => ev("document.getElementById('lab-ph').textContent");
  const nbText = () => ev("document.getElementById('lab-notebook').textContent.replace(/\\s+/g, ' ')");
  const has = id => ev(`!!Labs.store('mixing').disc['${id}']`);
  const examHeading = (reg, g, text) => {
    if (reg) ok(`Grade ${g}: the card’s exam section says “In your exams”, from Labs.grade()`, /In your exams/.test(text), text.slice(0, 300));
    else console.log(`NOTE Grade ${g}: the exam heading follows the shell's own grade, so “In your exams” is checked only once the lab is registered for Grade ${g}.`);
  };

  const g9progress = () => ev("JSON.stringify([LabChem.forGrade(LabChem.DISCOVERIES, 9).map(d => Labs.store('mixing').disc[d.id]), Labs.store('mixing').missions.race, Labs.store('mixing').missions.neutral, Labs.store('mixing').guides.fizz])");
  const g9before = await g9progress();

  console.log('\n-- Grade 8: opening');
  const reg8 = await atGrade(8);
  ok('Grade 8: the bench opens at Grade 8', (await dbg()).grade === 8);
  ov = await overlay();
  ok('Grade 8: its own first-visit welcome, whose “Show me how” starts the kitchen test',
     ov && /Welcome to the Mixing Bench/.test(ov.text) && /Litmus paper/.test(ov.text) && await ev("!!document.querySelector('#lab-overlay [data-guide=\"g8_kitchen\"]')"), ov);
  await closeOv();
  ok('Grade 8: the welcome is remembered for Grade 8 on its own', await ev("Labs.store('mixing').intro8 === true && Labs.store('mixing').intro === true"));
  ok('Grade 8: the eyebrow says “Science · Grade 8”', (await ev("document.querySelector('.lab-mixing .lab-eyebrow').textContent")) === 'Science · Grade 8');
  const g8ids = await ev("({ guides: LabChem.forGrade(LabChem.GUIDES, 8).map(g => g.id), missions: LabChem.forGrade(LabChem.MISSIONS, 8).map(m => m.id), disc: LabChem.forGrade(LabChem.DISCOVERIES, 8).map(d => d.id) })");
  const startIds = () => ev("({ guides: [...document.querySelectorAll('.lab-start [data-guide]')].map(b => b.dataset.guide), missions: [...document.querySelectorAll('.lab-start [data-mission]')].map(b => b.dataset.mission) })");
  let sids = await startIds();
  ok(`Grade 8: the start panel shows exactly its ${g8ids.guides.length} guided experiments and ${g8ids.missions.length} missions`,
     sids.guides.join() === g8ids.guides.join() && sids.missions.join() === g8ids.missions.join() && g8ids.guides.length >= 3 && g8ids.missions.length >= 2, sids);
  ok('Grade 8: …and none of Grade 9’s (no “Make it fizz”, no sodium demo, no Reactivity Race)',
     !['fizz', 'sodium', 'copper', 'acidalk'].some(id => sids.guides.includes(id)) && !['race', 'neutral'].some(id => sids.missions.includes(id)));
  ok('Grade 8: the shelf holds kitchen acids and bases, the lab acid and alkali, and bleach - and no sulfuric acid',
     await ev("['lemon','vinegar','salt','bakingsoda','toothpaste','antacid','hcl','naoh','water','indicator','bleach'].every(id => document.querySelector('[data-add=\"liquid\"][data-id=\"' + id + '\"]')) && !document.querySelector('[data-id=\"h2so4\"]')"));
  await shelf('metal');
  ok('Grade 8: the Solids tab has magnesium, zinc and marble chips - no alkali metal, no copper or calcium',
     await ev("document.querySelector('[data-shelf=\"metal\"]').textContent === 'Solids' && ['magnesium','zinc','marble'].every(id => document.querySelector('[data-add=\"metal\"][data-id=\"' + id + '\"]')) && !['sodium','potassium','copper','calcium','iron','aluminium'].some(id => document.querySelector('[data-add=\"metal\"][data-id=\"' + id + '\"]'))"));
  await shelf('liquid');
  ok('Grade 8: the tools are litmus, the lighted splint, limewater, “taste it” and rinse - no bung, no glowing splint',
     (await ev("[...document.querySelectorAll('.lab-tools [data-act]')].map(b => b.dataset.act).join()")) === 'litmus-red,litmus-blue,splint,lime,taste,rinse');
  await click('[data-panel="missions"]');
  ok('Grade 8: the Missions tab lists only the Grade 8 missions',
     (await ev("[...document.querySelectorAll('.lab-mission-card [data-mission]')].map(b => b.dataset.mission).join()")) === g8ids.missions.join());
  await click('[data-panel="found"]');
  ok(`Grade 8: the Discoveries tab and its counter show only the ${g8ids.disc.length} Grade 8 discoveries, none found yet`,
     await ev(`(() => { const c = [...document.querySelectorAll('.lab-found-card')]; return c.length === ${g8ids.disc.length} && c.every(x => x.dataset.disc.startsWith('g8_')) && document.getElementById('lab-found-n').textContent === '0/${g8ids.disc.length}'; })()`),
     await ev("document.getElementById('lab-found-n').textContent"));
  await click('[data-panel="sandbox"]');

  console.log('\n-- Grade 8: mistakes that teach');
  await ev('LabMixing._test({ instant: true }); true');
  ok('Grade 8: goggles start off (a new level is a new bench)', (await dbg()).goggles === false);
  await add('liquid', 'hcl');
  ov = await overlay();
  ok('Grade 8: the lab acid without goggles is stopped with a CORROSIVE hazard card, “corrosive” explained',
     ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Corrosive') && /attack and damage skin and eyes/.test(ov.text) && /Do this instead/.test(ov.text), ov);
  examHeading(reg8, 8, ov ? ov.text : '');
  ok('…and nothing was poured', (await dbg()).v === 0);
  await closeOv();
  await add('liquid', 'bleach');
  ov = await overlay();
  ok('Grade 8: household bleach is stopped with a CORROSIVE card: a strong alkali, about pH 13',
     ov && ov.signs.includes('Corrosive') && /strong alkali/.test(ov.text) && /pH 13/.test(ov.text), ov);
  await closeOv();
  ok('…and the bleach never reaches the tube', (await dbg()).v === 0);
  await add('liquid', 'vinegar');
  ok('Grade 8: vinegar needs no goggles - it is not corrosive', (await dbg()).v === 5);
  await click('[data-act="taste"]');
  ov = await overlay();
  ok('Grade 8: tasting it to test it is stopped with a TOXIC card that says to use an indicator',
     ov && ov.signs.includes('Toxic') && /taste the vinegar/.test(ov.text) && /never taste/i.test(ov.text) && /indicator/.test(ov.text), ov);
  await closeOv();
  await add('liquid', 'indicator');
  ok('Grade 8: universal indicator in vinegar reads pH 3.0, orange, weakly acidic', /pH 3\.0.*orange.*weakly acidic/.test(await phText()), await phText());
  ok('…and unlocks “Kitchen acids”', await has('g8_ui_weak'));
  await add('liquid', 'indicator');
  ov = await overlay();
  ok('Grade 8: indicator added a second time gives the “Too much indicator” result card',
     ov && /is-result/.test(ov.cls) && /Too much indicator/.test(ov.text) && /What you should have done/.test(ov.text), ov);
  await closeOv();

  await click('[data-act="rinse"]');
  await add('liquid', 'salt');
  await click('[data-act="litmus-red"]');
  ok('Grade 8: red litmus stays red in salt solution, and the notebook asks what that tells you',
     /red litmus paper stayed red/.test(await nbText()) && await ev("!!document.querySelector('[data-conclude=\"acid\"]') && !!document.querySelector('[data-conclude=\"notalk\"]')"));
  await click('[data-conclude="acid"]');
  ov = await overlay();
  ok('Grade 8: “So it is an acid” is a misread - result card: red litmus can’t prove an acid',
     ov && /is-result/.test(ov.cls) && /Red litmus can’t prove an acid/.test(ov.text) && /salt solution/.test(ov.text) && /BLUE litmus/.test(ov.text), ov);
  await closeOv();
  ok('…and nothing was unlocked for it', !(await has('g8_litmus_logic')));
  await click('[data-act="litmus-red"]');
  await click('[data-conclude="notalk"]');
  ok('Grade 8: “So it is not an alkali” is right, and unlocks “What no change means”', await has('g8_litmus_logic'));
  await click('[data-act="rinse"]');
  await add('liquid', 'toothpaste');
  await click('[data-act="litmus-red"]');
  ok('Grade 8: an alkali (toothpaste) turns red litmus blue', /turned blue/.test(await nbText()) && await has('g8_litmus_alkali'));
  cnt = await counter(8);
  ok('Grade 8: the ✨ counter counts only Grade 8 finds', cnt.shown === cnt.saved && /\/16$/.test(cnt.shown), cnt);

  console.log('\n-- Grade 8: gases');
  await click('[data-act="rinse"]');
  await click('[data-act="goggles"]');
  await add('liquid', 'hcl');
  await shelf('metal'); await add('metal', 'marble');
  await ev('LabMixing._tick(3); true');
  let nb8 = await nbText();
  ok('Grade 8: marble chips fizz in the acid; the notebook has the word and the balanced symbol equation',
     /Fizzing/.test(nb8) && /calcium carbonate \+ hydrochloric acid → calcium chloride \+ water \+ carbon dioxide/.test(nb8) && /CaCO₃ \+ 2HCl → CaCl₂ \+ H₂O \+ CO₂/.test(nb8), nb8.slice(0, 400));
  await click('[data-act="lime"]');
  ok('Grade 8: limewater turns milky - carbon dioxide', (await dbg()).lime === 'milky' && await has('g8_limewater'));
  await click('[data-act="splint"]');
  ok('Grade 8: a lighted splint in carbon dioxide goes out, with no pop', (await dbg()).log[0].includes('flame went out') && await has('g8_splint_out'));
  await click('[data-act="rinse"]');
  await shelf('liquid'); await add('liquid', 'hcl');
  await shelf('metal'); await add('metal', 'magnesium');
  await ev('LabMixing._tick(3); true');
  await click('[data-act="splint"]');
  ok('Grade 8: magnesium in acid makes hydrogen: squeaky pop', (await dbg()).log[0].includes('Squeaky pop') && await has('g8_pop') && await has('g8_mg_hcl'));
  ok('Grade 8: none of it touched Grade 9 progress (the same acid and magnesium do not unlock Grade 9 cards)', (await g9progress()) === g9before);

  console.log('\n-- Grade 8: a guided experiment');
  await shelf('liquid');
  await click('.lab-start [data-guide="g8_kitchen"]').catch(() => null);
  if (!(await dbg()).guide) { await click('[data-panel="sandbox"]'); await ev("LabMixing.startGuide('g8_kitchen'); true"); }
  gs = await guideState();
  ok('The kitchen test: step 1 of 5 asks for vinegar, which glows on the shelf', gs.box && /Step 1 of 5/.test(gs.text) && /vinegar/.test(gs.text) && gs.next === 'vinegar', gs);
  await click('[data-guide-do]'); await click('[data-guide-do]');
  gs = await guideState();
  ok('…orange means an acid; then it asks to empty and rinse', /Step 3 of 5/.test(gs.text) && /Orange: pH 3/.test(gs.text) && gs.next === 'rinse', gs);
  await click('[data-guide-do]'); await click('[data-guide-do]'); await click('[data-guide-do]');
  ov = await overlay();
  ok('…and ends with “What you found out”, offering the litmus test next',
     ov && /Experiment complete/.test(ov.text) && /blue-green \(pH 8\)/.test(ov.text) && /Next: The litmus test/.test(ov.text) && await ev("!!Labs.store('mixing').guides.g8_kitchen"), ov);
  await closeOv();

  console.log('\n-- Grade 8: missions');
  await ev("LabMixing.startMission('g8_survey'); true");
  await shelf('liquid');
  await add('liquid', 'lemon'); await add('liquid', 'indicator');
  await add('liquid', 'vinegar');
  ov = await overlay();
  ok('pH Survey: a second sample into an unrinsed tube gives the “Two samples in one tube” result card',
     ov && /is-result/.test(ov.cls) && /Two samples in one tube/.test(ov.text) && /lemon juice/.test(ov.text) && /dirty dropper/.test(ov.text), ov);
  await closeOv();
  ok('…which empties and rinses the tube for you', (await dbg()).v === 0 && (await dbg()).mission.mixed === true);
  for (const s of ['vinegar', 'salt', 'bakingsoda', 'toothpaste']) {
    await click('[data-act="rinse"]');
    await add('liquid', s); await add('liquid', 'indicator');
  }
  d = await dbg();
  ok('pH Survey: all five samples recorded', d.mission.results.length === 5 && d.mission.success, d.mission);
  const survey = await ev("document.querySelector('.lab-table').textContent.replace(/\\s+/g, ' ')");
  ok('pH Survey: the table reads lemon juice pH 2 acid, vinegar 3 acid, salt 7 neutral, baking soda 8 alkali, toothpaste 9 alkali',
     /Lemon juice red 2\s*acid\s*Vinegar orange 3\s*acid\s*Salt solution green 7\s*neutral\s*Baking soda solution blue-green 8\s*alkali\s*Toothpaste blue-green 9\s*alkali/.test(survey), survey);
  await click('[data-act="quiz"]');
  ok('pH Survey: a mixed-up sample costs a star: 2 stars', (await answerAll('g8_survey')) === '2 of 3 stars');
  await closeOv();

  await ev("LabMixing.startMission('g8_antacid'); true");
  d = await dbg();
  ok('Settle the Stomach: starts with red acid and indicator (goggles already on)', Math.abs(d.v - 5.15) < 1e-9 && d.pH < 0.1 && !d.mission.waiting, d);
  ok('…the dropper adds antacid', /Antacid added: 0 drops/.test(await ev("document.getElementById('lab-mission').textContent")));
  for (let i = 0; i < 4; i++) await click('[data-drop="5"]');
  d = await dbg();
  ok('Settle the Stomach: 20 drops of antacid bring it to exactly pH 7, no overshoot', d.pH === 7 && d.mission.success && !d.mission.overshot, d);
  await click('[data-act="quiz"]');
  ok('Settle the Stomach: all right first time and nothing unsafe: 3 stars', (await answerAll('g8_antacid')) === '3 of 3 stars');
  ok('…saved', await ev("Labs.store('mixing').missions.g8_antacid.stars === 3"));
  await closeOv();
  await ev("LabMixing.startMission('g8_antacid'); true");
  for (let i = 0; i < 3; i++) await click('[data-drop="5"]');
  for (let i = 0; i < 4; i++) await click('[data-drop="1"]');
  ok('…after 19 drops it is still acidic', (await dbg()).pH < 2);
  await click('[data-drop="5"]');
  d = await dbg(); ov = await overlay();
  ok('Settle the Stomach: too much antacid - result card, and the pH stops at 10 (an antacid is a weak base), not 14',
     d.mission.overshot && d.pH === 10 && ov && /Too much antacid/.test(ov.text) && /pH 10\.0: blue/.test(ov.text), { d: d.mission, pH: d.pH, ov });
  await closeOv();
  for (let i = 0; i < 4; i++) await click('[data-drop="acid"]');
  d = await dbg();
  ok('…four drops of acid bring it back to pH 7, and the overshoot costs a star', d.pH === 7 && d.mission.success);
  await click('[data-act="quiz"]');
  ok('…2 stars', (await answerAll('g8_antacid')) === '2 of 3 stars');
  ok('…the best, 3, is kept', await ev("Labs.store('mixing').missions.g8_antacid.stars === 3"));
  await closeOv();

  console.log('\n-- Grade 8: calm, phone, every discovery');
  await ev("LabMixing._test({ instant: false }); true");
  await click('[data-panel="sandbox"]');
  await ev("document.documentElement.classList.add('kid-calm'); true");
  await click('[data-act="rinse"]');
  await shelf('liquid'); await add('liquid', 'vinegar');
  ok('Grade 8, Calm Mode: the pour applies at once', (await dbg()).v === 5);
  await add('liquid', 'bakingsoda');
  d = await dbg();
  ok('Grade 8, Calm Mode: baking soda into vinegar fizzes at once, giving off carbon dioxide', d.co2 > 1 && d.fizz > 0 && d.log[0].includes('Fizzing!'), d);
  await sleep(300);
  ok('Grade 8: the canvas has drawn the bench', await ev("(() => { const c = document.getElementById('lab-canvas'); const p = c.getContext('2d').getImageData(c.width / 2, c.height / 2, 1, 1).data; return p[3] > 0; })()"));
  await ev("document.documentElement.classList.remove('kid-calm'); true");
  await ev('LabMixing._test({ instant: true }); true');

  const fit8 = () => ev(`(() => { const vw = innerWidth;
    const lab = e => e.getAttribute('data-act') || e.getAttribute('data-id') || e.getAttribute('data-panel') || e.getAttribute('data-disc') || e.textContent.trim().slice(0, 24);
    const off = [...document.querySelectorAll('#labs-root button, #labs-root canvas')]
      .filter(e => e.getClientRects().length && (e.getBoundingClientRect().right > vw + 0.5 || e.getBoundingClientRect().left < -0.5)).map(e => lab(e) + ' → ' + Math.round(e.getBoundingClientRect().right));
    const small = [...document.querySelectorAll('#labs-root .lab-top button, #labs-root .lab-tabs button, #labs-root .lab-coach button, #labs-root .lab-tools button, #labs-root .lab-item, #labs-root .lab-seg button, #labs-root .lab-start button, #labs-root .lab-dropper button, #labs-root .lab-found-card, #labs-root .lab-mission-card button, #labs-root .lab-link, #labs-root #lab-guide button, #labs-root [data-act="quiz"]')]
      .filter(e => e.getClientRects().length && (e.getBoundingClientRect().height < 43.5 || e.getBoundingClientRect().width < 43.5)).map(lab);
    return { vw, root: document.getElementById('labs-root').scrollWidth, off, small }; })()`);
  const fits = [];
  const fitAt = async where => { const f = await fit8(); if (!(f.root <= f.vw && !f.off.length && !f.small.length)) fits.push({ where, f }); };
  await click('[data-act="rinse"]');
  await add('liquid', 'salt'); await click('[data-act="litmus-red"]');
  await ev("LabMixing.startGuide('g8_litmus'); true");
  await fitAt('bench, guide box open, a litmus question in the notebook');
  await click('[data-act="guide-stop"]');
  await fitAt('bench start panel');
  await click('[data-panel="missions"]'); await fitAt('missions list');
  await click('[data-panel="found"]'); await fitAt('discoveries');
  await ev("LabMixing.startMission('g8_survey'); true"); await fitAt('pH Survey under way');
  await ev("LabMixing.startMission('g8_antacid'); true"); await click('[data-drop="5"]'); await fitAt('Settle the Stomach dropper');
  await click('[data-act="exit-mission"]');
  ok('Grade 8: fits a 360px phone everywhere - nothing past the edge, every tap target ≥ 44px', fits.length === 0, fits);

  solved = await solveAll(8);
  ok(`all ${solved.ids.length} Grade 8 discoveries unlock by following their own “Show me how”`, solved.ids.length >= 10 && solved.unsolved.length === 0, solved.unsolved);
  ok('…and they are the Grade 8 set only (every id starts g8_)', solved.ids.every(id => id.startsWith('g8_')));

  console.log('\n-- back to Grade 9');
  await atGrade(9);
  ok('Grade 9 again: the bench is back at Grade 9 with its eyebrow “Chemistry · Grade 9”',
     (await dbg()).grade === 9 && (await ev("document.querySelector('.lab-mixing .lab-eyebrow').textContent")) === 'Chemistry · Grade 9');
  ok('Grade 9 again: no welcome - it was seen at Grade 9', !(await overlay()));
  sids = await startIds();
  ok('Grade 9 again: the start panel is the Grade 9 set, with no Grade 8 guide or mission',
     sids.guides.join() === 'fizz,acidalk,copper,sodium' && sids.missions.join() === 'race,neutral', sids);
  ok('Grade 9 again: the Grade 9 shelf and tools (sulfuric acid, bung, glowing splint; no litmus, no bleach)',
     await ev("!!document.querySelector('[data-id=\"h2so4\"]') && !document.querySelector('[data-id=\"bleach\"]') && !!document.querySelector('#lab-bung-btn') && !!document.querySelector('[data-act=\"glow\"]') && !document.querySelector('[data-act=\"litmus-red\"]')"));
  cnt = await counter(9);
  ok('Grade 9 again: the counter counts only Grade 9 discoveries - all 21 still found', cnt.shown === '21/21' && cnt.shown === cnt.saved, cnt);
  await add('liquid', 'hcl');
  ov = await overlay();
  ok('Grade 9 again: acid without goggles gives the Grade 9 card, “On the NCE paper”', ov && ov.signs.includes('Corrosive') && /On the NCE paper/.test(ov.text), ov);
  await closeOv();
  await ev('Labs.grade = window.__labsGrade; true');

  await ev("showScreen('student-home'); true");
  ok('no page errors along the way', errors.length === 0, errors.slice(0, 5));

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
