'use strict';
// Science Labs › Mixing Bench, driven in a real browser.
//
// Proves the feature end to end: only an NCE pupil with a lab sees the door,
// the lab code is fetched only when opened, the hazards stop the experiment and
// explain themselves, reactions land in the notebook with their equations, the
// gas test pops, both missions can be finished and scored, the animation loop
// really runs, and the bench fits a 360px phone.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-mixing.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9394;
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
  // Grades 4-6 have their own primary labs now - scripts/test-labs-grades.js
  // covers them. Grade 7 still has none, so it is the "no labs yet" case here.
  ok('a Grade 7 pupil does not see it yet (no Grade 7 lab)', !(await noteShown(7)));
  ok('a Grade 9 (NCE) pupil sees Science Labs', await noteShown(9));
  // A child whose parent ticked Grade 9 in ⚙️ Controls › Grade access.
  const withGrant = async grant => ev(`(() => {
    if (typeof DB === 'undefined' || !DB) DB = {};
    DB.restrictions = ${grant ? '{ allowedGrades: [9] }' : '{}'};
    SELECTED_GRADE = 7; showScreen('student-home');
    const shown = getComputedStyle(document.getElementById('sh-note-labs')).display !== 'none';
    DB.restrictions = {};
    return shown; })()`);
  ok('a Grade 7 pupil sees Science Labs once a parent grants Grade 9', await withGrant(true));
  ok('…and not without that grant', !(await withGrant(false)));
  await ev("SELECTED_GRADE = 7; openLabs(); true");
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
  ok('acid without goggles is stopped with a CORROSIVE hazard card', ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Corrosive'), ov);
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
  const counter = () => ev("({ shown: document.getElementById('lab-found-n').textContent, saved: Object.keys(Labs.store('mixing').disc).length + '/' + LabChem.DISCOVERIES.length })");
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
  const answerAll = idx => ev(`(() => {
    const qs = LabChem.MISSIONS[${idx}].quiz;
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
  ok('the race quiz ends with 3 stars when every answer is right and nothing was unsafe', (await answerAll(0)) === '3 of 3 stars');
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
  ok('an overshoot costs a star: 2 stars', (await answerAll(1)) === '2 of 3 stars');
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
  await ev("LabMixing._test({ instant: true }); true");
  const discIds = await ev('LabChem.DISCOVERIES.map(d => d.id)');
  const unsolved = [];
  for (const id of discIds) {
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
  ok(`all ${discIds.length} discoveries unlock by following their own “Show me how”`, unsolved.length === 0, unsolved);
  ok('calcium in plain water is logged as water, not sodium hydroxide', (await dbg()).log.join(' ').indexOf('Calcium + sodium hydroxide') === -1);

  await ev("showScreen('student-home'); true");
  ok('no page errors along the way', errors.length === 0, errors.slice(0, 5));

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
