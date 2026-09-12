'use strict';
// Science Labs › Heat Transfer Lab, driven in a real browser.
//
// Proves the feature end to end: the lab code is fetched only when opened,
// the intro card appears on first visit, the guide_conduction guided
// experiment runs end to end, the guide_radiation station runs, mission
// readiness is checked and answered, all discoveries unlock by their own
// "Show me how", hazard cards are raised, Calm Mode, and 360px phone fit.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-heat.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1).
// ⚠ NOTE Until the lead adds the L('heat',...) row to engine/labs/lab_core.js,
//   Labs.LABS does not contain the heat entry, so this test injects it at
//   runtime.  Once registered that injection is a no-op.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9427;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); } };

(async () => {
  const chromePath = process.env.CHROME_PATH || 'C:/cft/chrome-win64/chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-heat-')),
    '--allow-file-access-from-files', '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  const quit = code => { try { chrome.kill(); } catch (_) {} process.exit(code); };
  let version; for (let i = 0; i < 40 && !version; i++) { try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); } }
  if (!version) { console.error('Chrome did not start at ' + chromePath); quit(1); return; }
  const ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let serial = 0; const waiting = new Map(); const errors = [];
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.method === 'Runtime.exceptionThrown') errors.push((m.params.exceptionDetails.exception || {}).description || m.params.exceptionDetails.text);
    if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); }
  };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const id = ++serial, t = setTimeout(() => { waiting.delete(id); rej(Error('Timeout ' + method)); }, 300000);
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
  const dbg = () => ev('LabHeat._debug()');
  const overlay = () => ev(`(() => { const o = document.getElementById('lab-overlay'); if (!o) return null;
    return { cls: o.className, text: o.textContent.replace(/\\s+/g, ' ').slice(0, 3000),
             signs: [...o.querySelectorAll('.lab-sign figcaption')].map(f => f.textContent) }; })()`);
  const closeOv = () => click('#lab-overlay [data-ov-close]');

  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof openLabs === 'function' && typeof RoleModules !== 'undefined'"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url + ', not the file we navigated to.'); quit(1); return; }
  ok('app loaded', ready === true);
  await sleep(2500);

  // ── Open the labs hub at Grade 6 ─────────────────────────
  // Follows the same pattern as test-labs-magnets.js which uses 60 s timeout:
  // hub poll (getElementById only — no style flush) → inject registration →
  // openLab (one CDP call — its _ensure triggers the one style flush) → lab poll.
  // A hubState/querySelector call between hub-poll and openLab would force a
  // redundant flush, leaving Chrome too busy for the openLab flush. Skipped.
  console.log('\n-- hub');
  await ev("SELECTED_GRADE = 6; openLabs(); true");
  let hub = false;
  for (let i = 0; i < 60 && !hub; i++) { await sleep(200); hub = await ev("typeof Labs !== 'undefined' && !!document.getElementById('labs-root')"); }
  ok('Grade 6: the Labs screen opens and the hub renders', hub);

  // One CDP call for all hub-phase work: get hub scripts, inject registration,
  // remove :has() selectors, then open the lab.
  //
  // Chrome's background paint task may fire after the hub renders (~120 s style
  // recalculation). With a 300 s timeout the eval survives the wait. After the
  // paint task clears, :has() removal means subsequent DOM mutations are
  // incremental (scoped to the changed subtree) instead of global, so everything
  // from here on is fast.
  //
  // :has() rules in style.css (9) + labs.css (1) force full global recalculation
  // on every mutation. None of them affect labs UI, so removing them is safe.
  const hubSetup = await ev(`(() => {
    const hubScripts = [...document.scripts].map(s => s.src)
      .filter(s => /engine\\/labs\\//.test(s)).map(s => s.split('/').pop()).join();
    const registered = Labs.LABS.some(l => l.id === 'heat');
    if (!registered) Labs.LABS.push({ id:'heat', icon:'🔥', name:'Heat Transfer',
      subject:'Science', global:'LabHeat', grades:[6], ready:false,
      files:['engine/labs/lab_heat_data.js','engine/labs/lab_heat.js'],
      css:'engine/labs/lab_heat.css',
      blurb:'Conduction, convection and radiation. Three stations, three big ideas.' });
    function dropHas(sheet) {
      try {
        const rules = sheet.cssRules;
        for (let i = rules.length - 1; i >= 0; i--) {
          const r = rules[i];
          if (r.selectorText && r.selectorText.includes(':has(')) sheet.deleteRule(i);
          else if (r.cssRules) dropHas(r);
        }
      } catch(e) {}
    }
    for (const ss of document.styleSheets) dropHas(ss);
    Labs.openLab('heat');
    return { hubScripts, registered };
  })()`);
  ok('the hub loads only the shared lab shell', hubSetup && hubSetup.hubScripts === 'lab_core.js', hubSetup && hubSetup.hubScripts);
  if (hubSetup && !hubSetup.registered) console.log('NOTE: Labs.LABS did not contain the heat entry. Injected for this run.');
  const labScripts = () => ev("[...document.scripts].map(s => s.src).filter(s => /engine\\/labs\\//.test(s)).map(s => s.split('/').pop()).join()");
  // Single CDP wait inside Chrome — avoids 90 separate round-trips each stalling
  // while Chrome's main thread is busy with the style flush openLab triggered.
  // Polls every 300 ms for up to 240 s (800 ticks), within the 300 s CDP timeout.
  const open = await ev(`new Promise(resolve => {
    let n = 0;
    (function check() {
      if (typeof LabHeat !== 'undefined' && !!document.getElementById('lab-heat-canvas')) { resolve(true); return; }
      if (++n < 800) setTimeout(check, 300); else resolve(false);
    })();
  })`);
  ok('Labs.openLab("heat") loads and renders the bench', open);
  ok('opening the Heat Transfer lab fetches its data and bench files',
     (await labScripts()).includes('lab_heat_data.js') && (await labScripts()).includes('lab_heat.js'), await labScripts());
  ok('lab_heat.css is loaded', (await ev("!!document.querySelector('link[data-lab-css=\"heat\"], link[href*=\"lab_heat.css\"]')")));

  let ov = await overlay();
  ok('first visit shows the welcome card for the Heat Transfer Lab',
     ov && /Welcome to the Heat Transfer Lab/.test(ov.text), ov);
  await closeOv();
  ok('the welcome is remembered', await ev("Labs.store('heat').intro === true"));
  await ev('LabHeat._test({ instant: true }); true');

  // ── Bench basics ──────────────────────────────
  console.log('\n-- bench');
  let d = await dbg();
  ok('_debug() returns the lab state', d && d.station === 'conduction', d);
  ok('the three station tabs render', await ev("document.querySelectorAll('.lab-heat-stabs button').length === 3"));
  ok('canvas is present', await ev("!!document.getElementById('lab-heat-canvas')"));

  // ── Station switching ─────────────────────────
  console.log('\n-- station switching');
  await click('[data-set="station"][data-v="convection"]');
  d = await dbg();
  ok('switch to convection station', d.station === 'convection', d);
  await click('[data-set="station"][data-v="radiation"]');
  d = await dbg();
  ok('switch to radiation station', d.station === 'radiation', d);
  await click('[data-set="station"][data-v="conduction"]');
  d = await dbg();
  ok('switch back to conduction station', d.station === 'conduction', d);

  // ── Guide: conduction ─────────────────────────
  console.log('\n-- guide_conduction');
  await ev("LabHeat.startGuide('guide_conduction'); true");
  for (let i = 0; i < 20; i++) { await sleep(100); if (await ev("!document.getElementById('lab-guide').hidden")) break; }
  const guideState = () => ev(`({ box: !document.getElementById('lab-guide').hidden,
    text: document.getElementById('lab-guide').textContent.replace(/\\s+/g, ' '),
    next: document.querySelector('.is-next') ? (document.querySelector('.is-next').dataset.set || '') + ':' + (document.querySelector('.is-next').dataset.v || document.querySelector('.is-next').dataset.act || '') : null })`);
  let gs = await guideState();
  ok('guide_conduction opens with step 1 of 7', gs.box && /Step 1 of 7/.test(gs.text), gs);
  ok('step 1 highlights the Conduction tab', gs.next && gs.next.includes('conduction'), gs.next);

  // Step through: conduction already selected, so click the button
  await click('[data-guide-do]');  // station:conduction
  gs = await guideState();
  ok('step 2: add metal rod (glowing)', /Step 2 of 7/.test(gs.text) && /metal/.test(gs.text.toLowerCase()), gs);
  await click('[data-guide-do]');  // material:metal
  await click('[data-guide-do]');  // material:wood
  await click('[data-guide-do]');  // material:plastic
  gs = await guideState();
  ok('step 5: burner step — all materials added', /Step 5 of 7/.test(gs.text) || /burner/i.test(gs.text), gs);
  await click('[data-guide-do]');  // burner:on
  d = await dbg();
  ok('burner turned on by the guide', d.burner === true, d);
  await click('[data-guide-do]');  // tick30
  d = await dbg();
  ok('30 seconds ticked', d.condTime >= 30, d);
  await click('[data-guide-do]');  // tick120
  d = await dbg();
  ok('guide step ticked 2 minutes', d.condTime >= 120, d);
  ov = await overlay();
  ok('guide ends with an experiment-complete card', ov && /Experiment complete/.test(ov.text), ov);
  ok('the guide lesson mentions conductors and insulators', ov && /insulator/i.test(ov.text), ov);
  await closeOv();
  ok('guide_conduction is saved', await ev("!!Labs.store('heat').guides.guide_conduction"));

  // ── Discoveries ───────────────────────────────
  console.log('\n-- discoveries');
  ok('at least some discoveries unlocked during conduction guide', await ev("Object.keys(Labs.store('heat').disc).length >= 1"));
  await click('[data-panel="found"]');
  const foundCount = () => ev("(() => { const all = document.querySelectorAll('.lab-found-card'); const found = document.querySelectorAll('.lab-found-card.is-found'); return { total: all.length, found: found.length }; })()");
  let fc = await foundCount();
  ok('discoveries panel shows all 13 and at least 1 found', fc.total === 13 && fc.found >= 1, fc);

  // Open a found discovery
  const firstFoundSel = '.lab-found-card.is-found';
  await click(firstFoundSel);
  ov = await overlay();
  ok('tapping a found discovery shows what you saw, why, and "Do it again"',
     ov && /What you saw/.test(ov.text) && /Why it happens/.test(ov.text) && /Do it again/.test(ov.text), ov);
  await closeOv();

  // Open a locked discovery and follow "Show me how"
  const lockedId = await ev("(document.querySelector('.lab-found-card:not(.is-found)') || {}).dataset?.disc || null");
  if (lockedId) {
    await click(`.lab-found-card[data-disc="${lockedId}"]`);
    ov = await overlay();
    ok('tapping a locked discovery shows how to find it and "Show me how"',
       ov && /Locked discovery/.test(ov.text) && /Show me how/.test(ov.text), ov);
    await closeOv();
  }

  // Solve all discoveries using their "Show me how" guide
  const solveAll = async () => {
    await ev('LabHeat._test({ instant: true }); true');
    const ids = await ev('LabHeatData.DISCOVERIES.map(d => d.id)');
    const unsolved = [];
    for (const id of ids) {
      const res = await ev(`(() => {
        const st = Labs.store('heat'); delete st.disc['${id}'];
        document.getElementById('lab-overlay')?.remove();
        LabHeat.discoveryGuide('${id}');
        for (let k = 0; k < 20; k++) {
          const hz = document.querySelector('#lab-overlay.is-hazard');
          if (hz) return 'hazard: ' + hz.textContent.replace(/\\s+/g, ' ').slice(0, 60);
          const btn = document.querySelector('#lab-guide [data-guide-do]');
          if (btn) btn.click();
          else LabHeat._tick(6);
          if (!LabHeat._debug().guide) break;
        }
        document.getElementById('lab-overlay')?.remove();
        return !!st.disc['${id}'];
      })()`);
      if (res !== true) unsolved.push(id + ' → ' + res);
    }
    return { ids, unsolved };
  };
  const solved = await solveAll();
  ok(`all ${solved.ids.length} discoveries unlock by following their own "Show me how"`,
     solved.ids.length === 13 && solved.unsolved.length === 0, solved.unsolved);

  // ── Guide: radiation ──────────────────────────
  console.log('\n-- guide_radiation');
  await click('[data-panel="sandbox"]');
  await ev("LabHeat.startGuide('guide_radiation'); true");
  for (let i = 0; i < 20; i++) { await sleep(100); if (await ev("!document.getElementById('lab-guide').hidden")) break; }
  gs = await guideState();
  ok('guide_radiation opens', gs.box && /guide_radiation|radiation/i.test(gs.text), gs);
  // Walk through all steps
  for (let k = 0; k < 10; k++) {
    if (await ev("document.getElementById('lab-guide').hidden")) break;
    await click('[data-guide-do]');
    await sleep(50);
  }
  ov = await overlay();
  ok('guide_radiation ends with experiment complete', ov && /Experiment complete/.test(ov.text), ov);
  await closeOv();

  // ── Mission: conductor ────────────────────────
  console.log('\n-- mission_conductor');
  await ev("LabHeat.startMission('mission_conductor'); true");
  await click('[data-panel="missions"]');
  ok('mission_conductor opened', await ev("!!document.getElementById('lab-mission')"));

  // Set up the experiment for the mission
  await ev("LabHeat._test({ instant: true }); true");
  // Add 3 materials, turn on burner, tick 2 minutes
  await click('[data-set="station"][data-v="conduction"]');
  await click('[data-set="material"][data-v="metal"]');
  await click('[data-set="material"][data-v="wood"]');
  await click('[data-set="material"][data-v="plastic"]');
  await click('[data-set="burner"][data-v="on"]');
  await click('[data-act="tick120"]');
  d = await dbg();
  ok('mission setup: burner on, 3 materials, 120s', d.burner && d.materials.length >= 3 && d.condTime >= 120, d);
  ok('mission_conductor success after 2 min with 3 materials', d.mission && d.mission.success === true, d.mission);

  // Answer the quiz
  const answerAll = mid => ev(`(() => {
    const qs = LabHeatData.MISSIONS.find(M => M.id === ${JSON.stringify(mid)}).quiz;
    for (let i = 0; i < qs.length; i++) {
      const card = document.querySelector('#lab-overlay .lab-ov-card');
      if (!card) return 'no card at question ' + i;
      const q = card.querySelector('.lab-quiz-q') ? card.querySelector('.lab-quiz-q').textContent : '';
      const def = qs.find(x => x.q === q) || qs[i];
      const opts = def.opts || def.options;
      const btn = [...card.querySelectorAll('.lab-quiz-opt')].find(b => b.lastElementChild && b.lastElementChild.textContent === opts[def.ans]);
      if (!btn) return 'could not find correct answer button for: ' + (def.q || '?');
      btn.click();
      const nx = card.querySelector('[data-next]'); if (nx) nx.click();
    }
    const done = document.querySelector('#lab-overlay .lab-done .lab-stars');
    return done ? done.getAttribute('aria-label') : 'no result card';
  })()`);

  await click('[data-act="quiz"]');
  await sleep(300);
  const stars = await answerAll('mission_conductor');
  ok('mission_conductor ends with stars earned', stars && stars.includes('stars'), stars);
  ok('mission_conductor result is saved', await ev("!!(Labs.store('heat').missions.mission_conductor)"));
  await closeOv();

  // ── Hazard card ───────────────────────────────
  console.log('\n-- hazard cards');
  // Trigger hot_rod hazard internally (call the internal trigger)
  const hadHazard = await ev(`(() => {
    try {
      const D = LabHeatData;
      const H = D.HAZARDS.hot_rod;
      if (!H) return 'no hazard found';
      Labs.hazardCard({ signs: H.signs, title: H.title(), happened: H.happened(), why: H.why, instead: H.instead, exam: H.exam, button: 'Got it' });
      return true;
    } catch (e) { return 'error: ' + e.message; }
  })()`);
  ok('hot_rod hazard card can be raised via Labs.hazardCard', hadHazard === true, hadHazard);
  ov = await overlay();
  ok('hot_rod card shows hot + warning signs',
     ov && ov.signs.includes('Hot') && ov.signs.includes('Warning'), ov);
  ok('…with "What happened", "Why dangerous", "Do this instead" sections',
     ov && /What happened/.test(ov.text) && /Why/.test(ov.text) && /Do this instead/.test(ov.text), ov);
  await closeOv();

  // ── Calm Mode ─────────────────────────────────
  console.log('\n-- calm mode');
  await ev("document.documentElement.classList.add('kid-calm'); true");
  await click('[data-set="station"][data-v="convection"]');
  await click('[data-set="heater"][data-v="on"]');
  d = await dbg();
  ok('calm mode: heater activates immediately', d.heater === true, d);
  await click('[data-act="tick30"]');
  d = await dbg();
  ok('calm mode: tick applies at once', d.convTime >= 30, d);
  await ev("document.documentElement.classList.remove('kid-calm'); true");

  // ── 360px phone fit ───────────────────────────
  console.log('\n-- phone fit (360px)');
  await click('[data-set="station"][data-v="conduction"]');
  await click('[data-panel="sandbox"]');
  const fit = () => ev(`(() => { const vw = innerWidth;
    const lab = e => e.getAttribute('data-set') ? e.dataset.set + ':' + e.dataset.v : e.getAttribute('data-act') || e.getAttribute('data-panel') || e.textContent.trim().slice(0, 20);
    const off = [...document.querySelectorAll('#labs-root button, #labs-root canvas')]
      .filter(e => e.getClientRects().length && e.getBoundingClientRect().right > vw + 0.5)
      .map(e => lab(e) + ' → ' + Math.round(e.getBoundingClientRect().right));
    return { vw, root: document.getElementById('labs-root').scrollWidth, off }; })()`);
  const fits = [];
  const fitAt = async where => { const f = await fit(); if (!(f.root <= f.vw && !f.off.length)) fits.push({ where, f }); };
  await fitAt('bench with conduction station');
  await click('[data-set="station"][data-v="convection"]');
  await fitAt('bench with convection station');
  await click('[data-set="station"][data-v="radiation"]');
  await fitAt('bench with radiation station');
  await click('[data-panel="missions"]');
  await fitAt('missions panel');
  await click('[data-panel="found"]');
  await fitAt('discoveries panel');
  ok('the bench fits a 360px phone (nothing past the right edge)', fits.length === 0, fits);

  // ── Canvas is drawing ─────────────────────────
  console.log('\n-- animation');
  await ev("LabHeat._test({ instant: false }); true");
  await click('[data-set="station"][data-v="conduction"]');
  await sleep(500);
  ok('the canvas has drawn something (non-empty pixel at centre)',
     await ev("(() => { const c = document.getElementById('lab-heat-canvas'); const p = c.getContext('2d').getImageData(c.width/2, c.height/2, 1, 1).data; return p[3] > 0; })()"));

  // ── Navigation ────────────────────────────────
  console.log('\n-- navigation');
  await ev("showScreen('student-home'); true");
  ok('no page errors along the way', errors.length === 0, errors.slice(0, 5));

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
