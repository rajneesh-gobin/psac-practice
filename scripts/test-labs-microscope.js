'use strict';
// Science Labs › Microscope, driven in a real browser.
//
// Proves the lab end to end: it loads its own three files when opened, lands
// with "What would you like to do?", a guided experiment runs to its end (and
// every other guide does too), every discovery unlocks by following its own
// "Show me how", every hazard and result card fires and explains itself (the
// consequence plays on the canvas first), all three missions can be finished
// with three stars, the animation loop really runs, Calm Mode applies effects
// at once, and the bench fits a 360px phone with no page errors.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-microscope.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
// ⚠ Port 9408 is this lab's; the other lab builds use 9401-9407 and 9409+.
// ⚠ The Chrome profile goes in LAB_TMP when it is set (a per-lab scratch
//   folder), else the system temp folder - and is removed on every exit.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9419;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); } };

// ⚠ Every exit - a pass, a fail, or a thrown error - kills Chrome and removes its profile.
let chrome = null, profile = null;
const quit = code => {
  try { if (chrome) chrome.kill(); } catch (_) {}
  setTimeout(() => { try { if (profile) fs.rmSync(profile, { recursive: true, force: true }); } catch (_) {} process.exit(code); }, 800);
};
process.on('SIGINT', () => quit(130));

(async () => {
  const tmp = process.env.LAB_TMP || os.tmpdir();
  fs.mkdirSync(tmp, { recursive: true });
  profile = fs.mkdtempSync(path.join(tmp, 'psac-labs-microscope-'));
  chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG, '--user-data-dir=' + profile,
    '--allow-file-access-from-files', '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
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
  const clicks = async (...sels) => { for (const s of sels) { const r = await click(s); if (r !== true) { failed++; console.log('FAIL ' + r); return r; } } return true; };
  const dbg = () => ev('LabMicroscope._debug()');
  const overlay = () => ev(`(() => { const o = document.getElementById('lab-overlay'); if (!o) return null;
    return { cls: o.className, text: o.textContent.replace(/\\s+/g, ' ').slice(0, 3000),
             signs: [...o.querySelectorAll('.lab-sign figcaption')].map(f => f.textContent) }; })()`);
  const closeOv = () => click('#lab-overlay [data-ov-close]');
  const set = (k, v) => clicks(`[data-set="${k}"][data-v="${v}"]`);
  const act = a => clicks(`[data-act="${a}"]`);
  // A clean bench with no guide and no mission: start a guide, stop it (that resets the bench).
  const freshBench = async rig => {
    await ev("document.getElementById('lab-overlay')?.remove(); LabMicroscope.startGuide('firstlook'); true");
    await act('guide-stop');
    await set('rig', rig || 'scope');
  };
  const SETUP = ['[data-set="slide"][data-v="blood"]', '[data-act="clips"]', '[data-set="light"][data-v="lamp"]'];
  // Low power, lowered, coarse up twice, fine up twice: sharp at ×40.
  const LOW = [...SETUP, '[data-set="obj"][data-v="4"]', '[data-act="lower"]', '[data-set="coarse"][data-v="up"]', '[data-set="coarse"][data-v="up"]',
               '[data-set="fine"][data-v="up"]', '[data-set="fine"][data-v="up"]'];
  const HIGH = [...LOW, '[data-set="obj"][data-v="40"]', '[data-set="fine"][data-v="up"]'];

  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof openLabs === 'function' && typeof RoleModules !== 'undefined'"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url + ', not the file we navigated to.'); quit(1); return; }
  ok('app loaded', ready === true);
  await sleep(2500);

  // ── Opening the lab ─────────────────────────────
  console.log('\n-- opening the lab');
  await ev("SELECTED_GRADE = 9; openLabs(); true");
  let hub = false;
  for (let i = 0; i < 40 && !hub; i++) { await sleep(250); hub = await ev("typeof Labs !== 'undefined' && !!document.querySelector('#labs-root .lab-hub')"); }
  ok('Grade 9: the Labs hub renders', hub);
  await ev("Labs.openLab('microscope'); true");
  let mounted = false;
  for (let i = 0; i < 60 && !mounted; i++) { await sleep(200); mounted = await ev("typeof window.LabMicroscope !== 'undefined' && !!document.querySelector('#labs-root .lab-microscope')"); }
  ok('Labs.openLab("microscope") loads LabMicroscope and renders the bench', mounted);
  const labScripts = await ev("[...document.scripts].map(s => s.src).filter(s => /engine\\/labs\\//.test(s)).map(s => s.split('/').pop()).join()");
  ok('it fetched its own data file and bench, after the shell', /lab_core\.js/.test(labScripts) && /lab_microscope_data\.js,lab_microscope\.js/.test(labScripts), labScripts);
  await sleep(500);
  ok('its stylesheet is linked and styles the set-up buttons',
     await ev("!!document.querySelector('link[data-lab-css=\"microscope\"]') && getComputedStyle(document.querySelector('.lab-microscope-opt')).minHeight === '44px'"));
  let ov = await overlay();
  ok('first visit shows the welcome card with “Show me how”', ov && /Welcome to the Microscope/.test(ov.text) && /Show me how/.test(ov.text), ov);
  await closeOv();
  ok('the welcome is remembered', await ev("Labs.store('microscope').intro === true"));
  ok('top bar: back, Biology · Grade 9, title and help',
     await ev("!!document.querySelector('.lab-microscope .lab-top [data-act=\"hub\"]') && /Biology · Grade 9/.test(document.querySelector('.lab-microscope .lab-eyebrow').textContent) && !!document.querySelector('.lab-microscope [data-act=\"help\"]')"));
  await act('help');
  ov = await overlay();
  ok('help names the parts, the focusing order, both formulas and the blood components',
     ov && /Fine focus knob/.test(ov.text) && /lower the lens/.test(ov.text) && /image size ÷ actual size/.test(ov.text) && /1 mm = 1000 µm/.test(ov.text) && /Plasma/.test(ov.text), ov && ov.text.slice(0, 200));
  await closeOv();
  await act('tip');
  ok('💡 gives a fact', /💡/.test(await ev("document.getElementById('lab-coach-text').textContent")));
  await ev('LabMicroscope._test({ instant: true }); true');

  // ── Landing ─────────────────────────────────────
  console.log('\n-- what to do here');
  ok('the Bench tab opens with “What would you like to do?”, 5 guided experiments and 3 missions',
     await ev("!!document.querySelector('.lab-start') && /What would you like to do/.test(document.querySelector('.lab-start').textContent) && document.querySelectorAll('.lab-start [data-guide]').length === 5 && document.querySelectorAll('.lab-start [data-mission]').length === 3"));
  ok('the tabs are Bench, Missions and Discoveries, with a counter', await ev("[...document.querySelectorAll('.lab-tabs [data-panel]')].map(b => b.dataset.panel).join() === 'sandbox,missions,found' && /\\/16$/.test(document.getElementById('lab-found-n').textContent)"));

  await click('.lab-start [data-guide="firstlook"]');
  const gs = () => ev(`({ box: !document.getElementById('lab-guide').hidden, text: document.getElementById('lab-guide').textContent.replace(/\\s+/g, ' '),
    next: (() => { const e = document.querySelector('.is-next'); return e ? (e.dataset.set ? e.dataset.set + ':' + e.dataset.v : e.dataset.act) : null; })(),
    start: !!document.querySelector('.lab-start') })`);
  let g = await gs();
  ok('Your first look: already at the microscope, so it opens at step 2 - the blood smear - and that button glows',
     g.box && /Step 2 of 8/.test(g.text) && /blood smear/.test(g.text) && g.next === 'slide:blood' && !g.start, g);
  await click('[data-guide-do]');
  g = await gs();
  ok('then the stage clips glow', g.next === 'clips' && /Step 3 of 8/.test(g.text), g);
  await click('[data-guide-do]');
  g = await gs();
  ok('then the lamp', g.next === 'light:lamp', g);
  await click('[data-guide-do]');
  g = await gs();
  ok('then the LOW-power objective', g.next === 'obj:4' && /LOW-power/.test(g.text), g);
  await click('[data-guide-do]');
  g = await gs();
  ok('then “lower it, watching from the side”', g.next === 'lower' && /SIDE/.test(g.text), g);
  await click('[data-guide-do]');
  let d = await dbg();
  ok('…the lens is now just above the slide, and nothing is visible yet', d.scope.z === -70 && d.view.focus !== 'sharp', d.scope);
  g = await gs();
  ok('then COARSE focus UP glows under the picture', g.next === 'coarse:up' && /UP, away from the slide/.test(g.text), g);
  await click('[data-guide-do]');
  d = await dbg();
  ok('…one turn: still blurred, the step waits', d.view.focus === 'blurred' && (await gs()).next === 'coarse:up', d.view);
  await click('[data-guide-do]');
  g = await gs();
  ok('…two turns: the cells appear, and the FINE focus glows', (await dbg()).view.focus === 'near' && g.next === 'fine:up' && /FINE/.test(g.text), g);
  await click('[data-guide-do]'); await click('[data-guide-do]');
  ov = await overlay();
  ok('two turns of the fine focus make it sharp and complete the experiment', ov && /Experiment complete/.test(ov.text) && /What you found out/.test(ov.text), ov);
  d = await dbg();
  ok('…sharp at ×40 (10 × 4)', d.view.sharp && d.view.total === 40, d.view);
  ok('the finished experiment is remembered, and the next one offered', await ev("!!Labs.store('microscope').guides.firstlook") && /Next: Go to high power/.test(ov.text));
  ok('the notebook recorded the sharp image', /Sharp image at ×40/.test(await ev("document.getElementById('lab-notebook').textContent")));
  ok('a discovery was collected on the way (blood on low power)', await ev("!!Labs.store('microscope').disc.low_power"));
  // The counter shows only the open grade's discoveries.
  const counterG = n => ev(`(() => { const L = LabMicroscopeData.forGrade(LabMicroscopeData.DISCOVERIES, ${n}), st = Labs.store('microscope');
    return { shown: document.getElementById('lab-found-n').textContent, saved: L.filter(d => st.disc[d.id]).length + '/' + L.length }; })()`);
  const counter = () => counterG(9);
  let cnt = await counter();
  ok('the ✨ counter matches what is saved', cnt.shown === cnt.saved, cnt);
  await closeOv();
  ok('back on the Bench tab, the start panel shows it done', await ev("/✓ done/.test(document.querySelector('.lab-start').textContent)"));

  const runAllGuides = g => ev(`(() => {
    const out = {};
    for (const G of LabMicroscopeData.forGrade(LabMicroscopeData.GUIDES, ${g})) {
      document.getElementById('lab-overlay')?.remove();
      LabMicroscope.startGuide(G.id);
      let k = 0;
      for (; k < 60 && LabMicroscope._debug().guide; k++) {
        const o = document.querySelector('#lab-overlay.is-hazard, #lab-overlay.is-result');
        if (o) { out[G.id] = 'card: ' + o.textContent.replace(/\\s+/g, ' ').slice(0, 80); break; }
        document.querySelector('#lab-guide [data-guide-do]').click();
      }
      if (!out[G.id]) out[G.id] = LabMicroscope._debug().guide ? 'stuck' : (/Experiment complete/.test((document.getElementById('lab-overlay') || {}).textContent || '') ? 'done' : 'no end card');
    }
    document.getElementById('lab-overlay')?.remove();
    return out; })()`);
  const guideRuns = await runAllGuides(9);
  ok('every guided experiment runs to its “Experiment complete” with no mistake card', Object.values(guideRuns).every(v => v === 'done'), guideRuns);

  // ── Hazards ─────────────────────────────────────
  console.log('\n-- hazards');
  await freshBench();
  await clicks(...SETUP, '[data-set="obj"][data-v="40"]', '[data-act="lower"]');
  await ev('LabMicroscope._test({ instant: false }); true');
  await click('[data-set="coarse"][data-v="down"]');
  const mid = { ov: await overlay(), d: await dbg() };
  await sleep(1800);
  ov = await overlay();
  ok('high power first, coarse down: the lens comes down and cracks the slide on the canvas first, then the card',
     mid.ov === null && mid.d.busy === true && mid.d.cracked === true && ov && /is-hazard/.test(ov.cls), { mid, ov });
  await ev('LabMicroscope._test({ instant: true }); true');
  ok('…a hazard card with a real sign: what happened, why, what to do instead and the exam point',
     ov && ov.signs.length > 0 && /Crack/.test(ov.text) && /What happened/.test(ov.text) && /Why it’s dangerous/.test(ov.text) && /Do this instead/.test(ov.text) && /On the NCE paper/.test(ov.text) && /LOW-power/.test(ov.text), ov);
  await closeOv();
  d = await dbg();
  ok('…and the broken slide is gone, the lens raised', d.scope.slide === null && d.scope.z === 150 && !d.cracked, d.scope);
  await clicks(...SETUP, '[data-set="obj"][data-v="4"]', '[data-act="lower"]', '[data-set="obj"][data-v="40"]');
  ov = await overlay();
  ok('swinging in ×40 with the lens lowered for ×4: the same crack card, about the nosepiece', ov && /is-hazard/.test(ov.cls) && /swung the ×40/.test(ov.text), ov);
  await closeOv();
  await act('prick');
  ov = await overlay();
  ok('pricking a finger for fresh blood: a BIOLOGICAL HAZARD card - prepared sterile slides, never share lancets',
     ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Biological hazard') && /prepared blood smear/.test(ov.text) && /share/.test(ov.text), ov);
  await closeOv();
  await act('sun');
  ov = await overlay();
  ok('aiming the mirror at the Sun: a BRIGHT LIGHT (eye) card', ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Bright light') && /never at the Sun/.test(ov.text), ov);
  await closeOv();
  ok('the hazards are counted in the lab store', await ev("['crack','blood','sun'].every(k => Labs.store('microscope').hazards[k] >= 1)"));

  // ── Result cards ────────────────────────────────
  console.log('\n-- mistakes that teach');
  const resultCard = async (label, re) => { const o = await overlay(); ok(label, o && /is-result/.test(o.cls) && /What happened/.test(o.text) && /What you should have done/.test(o.text) && re.test(o.text), o); await closeOv(); };
  await freshBench();
  await clicks(...HIGH);
  ok('focused at ×400', (await dbg()).view.sharp && (await dbg()).view.total === 400);
  await click('[data-set="coarse"][data-v="up"]');
  await resultCard('coarse focus at high power: “The image vanished” card', /fine focus knob/i);
  await freshBench('measure');
  await clicks('[data-set="fig"][data-v="rbc"]', '[data-set="ruler"][data-v="cell"]', '[data-act="divide"]', '[data-act="answer"]');
  ok('dividing 60 mm by 8 µm without converting gives ×7.5', (await dbg()).sheet.done.shown === '×7.5');
  await resultCard('…“The units did not match” card, showing the ×1000 error', /1000 times too small/);
  await clicks('[data-set="ruler"][data-v="inner"]', '[data-act="convert"]', '[data-act="divide"]', '[data-act="answer"]');
  await resultCard('measuring the pale centre: “You measured the wrong part” card', /pale centre/);
  await clicks('[data-set="ruler"][data-v="eye"]', '[data-act="convert"]', '[data-act="divide"]', '[data-act="answer"]');
  await resultCard('guessing by eye: “You guessed instead of measuring” card', /by eye/);
  await clicks('[data-set="fig"][data-v="platelet"]', '[data-set="ruler"][data-v="cell"]', '[data-act="multiply"]', '[data-act="answer"]');
  await resultCard('multiplying by ×15 000: “Multiplied instead of divided” card', /450 metres/);
  await clicks('[data-set="ruler"][data-v="cell"]', '[data-act="divide"]', '[data-act="answer"]');
  await resultCard('the platelet left in mm when µm was asked: the units card again', /question asks for µm/);
  const nbText = await ev("document.getElementById('lab-notebook').textContent.replace(/\\s+/g, ' ')");
  ok('the notebook keeps a table of calculations with the working and the right answer', /Magnification calculations/.test(nbText) && /should be ×7500/.test(nbText) && /60 ÷ 8/.test(nbText), nbText.slice(0, 400));

  // ── Missions ───────────────────────────────────
  console.log('\n-- missions');
  const answerAll = id => ev(`(() => {
    const qs = LabMicroscopeData.MISSIONS.find(m => m.id === '${id}').quiz;
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
  await ev("LabMicroscope.startMission('focus'); true");
  await clicks(...HIGH);
  d = await dbg();
  ok('Focus at ×400, safely: low power first, then ×400 sharp with no mistakes', d.mission && d.mission.success && d.mission.lowFirst && d.mission.errors === 0, d.mission);
  await act('quiz');
  ok('…3 stars when every answer is right', (await answerAll('focus')) === '3 of 3 stars');
  ok('the stars are saved', await ev("Labs.store('microscope').missions.focus.stars === 3"));
  await closeOv();

  await ev("LabMicroscope.startMission('cells'); true");
  await clicks(...HIGH, '[data-set="id"][data-v="rbc"]', '[data-set="move"][data-v="left"]', '[data-set="id"][data-v="phago"]',
               '[data-set="move"][data-v="right"]', '[data-set="move"][data-v="right"]', '[data-set="id"][data-v="lympho"]',
               '[data-set="move"][data-v="left"]', '[data-set="move"][data-v="up"]', '[data-set="id"][data-v="platelet"]');
  d = await dbg();
  ok('Name that cell: a red cell, a phagocyte, a lymphocyte and a platelet found by moving the slide', d.mission.success && d.mission.found.length === 4 && d.mission.errors === 0, d.mission);
  ok('…and the notebook has a “Cells I named” table', /Cells I named/.test(await ev("document.getElementById('lab-notebook').textContent")));
  await act('quiz');
  ok('…3 stars', (await answerAll('cells')) === '3 of 3 stars');
  await closeOv();

  await ev("LabMicroscope.startMission('mag'); true");
  await clicks('[data-set="fig"][data-v="rbc"]', '[data-set="ruler"][data-v="cell"]', '[data-act="convert"]', '[data-act="divide"]', '[data-act="answer"]');
  ok('the red cell: 60 mm ÷ 0.008 mm = ×7500', (await dbg()).sheet.done.shown === '×7500' && (await dbg()).sheet.done.correct);
  await clicks('[data-set="fig"][data-v="platelet"]', '[data-set="ruler"][data-v="cell"]', '[data-act="divide"]', '[data-act="convert"]', '[data-act="answer"]');
  d = await dbg();
  ok('the ×15 000 platelet: 30 mm ÷ 15 000 = 0.002 mm = 2 µm, and the mission is done', d.sheet.done.shown === '2 µm' && d.mission.success && d.mission.errors === 0, d);
  await act('quiz');
  ok('Work out the magnification: 3 stars', (await answerAll('mag')) === '3 of 3 stars');
  await closeOv();

  // ── Motion, calm, phone ────────────────────────
  console.log('\n-- motion, calm, phone');
  await freshBench();
  await ev('LabMicroscope._test({ instant: false }); true');
  await clicks(...SETUP, '[data-set="obj"][data-v="4"]', '[data-act="lower"]');
  await sleep(60);
  const moving = await dbg();
  await sleep(1200);
  const settled = await dbg();
  ok('with animation on, the lens glides down (the loop is running) and settles where the knobs put it',
     moving.scope.zv !== moving.scope.z && settled.scope.zv === settled.scope.z, { moving: moving.scope, settled: settled.scope });
  ok('the canvas has drawn the bench', await ev("(() => { const c = document.getElementById('lab-canvas'); const p = c.getContext('2d').getImageData(c.width / 2, c.height / 2, 1, 1).data; return p[3] > 0; })()"));
  await ev("document.documentElement.classList.add('kid-calm'); true");
  await click('[data-set="coarse"][data-v="up"]');
  d = await dbg();
  ok('in Calm Mode the lens moves at once, with no glide', d.scope.zv === d.scope.z, d.scope);
  await act('prick');
  ov = await overlay();
  ok('in Calm Mode a hazard card appears at once, with no animation', ov && /is-hazard/.test(ov.cls) && (await dbg()).busy === false);
  await closeOv();
  await ev("document.documentElement.classList.remove('kid-calm'); LabMicroscope._test({ instant: true }); true");
  const fit = async label => {
    const f = await ev(`(() => { const vw = innerWidth;
      const off = [...document.querySelectorAll('#labs-root button, #labs-root canvas')]
        .filter(e => e.getBoundingClientRect().width > 0 && e.getBoundingClientRect().right > vw + 0.5)
        .map(e => (e.getAttribute('data-set') || e.getAttribute('data-act') || e.getAttribute('data-panel') || e.tagName) + ' → ' + Math.round(e.getBoundingClientRect().right));
      const small = [...document.querySelectorAll('#labs-root .lab-microscope-opt, #labs-root .lab-tool, #labs-root .lab-microscope-rigs button, #labs-root .lab-btn:not(.lab-btn-sm), #labs-root .lab-tabs button')]
        .filter(e => e.getBoundingClientRect().width > 0 && (e.getBoundingClientRect().height < 43.5 || e.getBoundingClientRect().width < 43.5))
        .map(e => (e.getAttribute('data-set') || e.getAttribute('data-act') || e.className) + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height));
      return { vw, root: document.getElementById('labs-root').scrollWidth, off, small }; })()`);
    ok(label, f.root <= f.vw && f.off.length === 0 && f.small.length === 0, f);
  };
  await fit('360px, microscope: no control past the screen edge, every tap target at least 44px');
  await act('labels');
  ok('the 🏷 Parts view draws the labelled microscope', (await dbg()).labels === true);
  await fit('360px, parts view: the same');
  await act('labels');
  await set('rig', 'measure');
  await fit('360px, measuring desk: the same');
  await set('rig', 'scope');

  // ── Discoveries ────────────────────────────────
  console.log('\n-- discoveries');
  await click('[data-panel="found"]');
  ok('the Discoveries tab shows 16 cards, found and locked', await ev("document.querySelectorAll('.lab-found-card').length === 16 && document.querySelectorAll('.lab-found-card.is-found').length >= 6 && /Clue:/.test(document.querySelector('.lab-found').textContent)"));
  await click('.lab-found-card.is-found[data-disc="low_power"]');
  ov = await overlay();
  ok('a found discovery explains itself: what you saw, the rule, why, do it again',
     ov && /What you saw/.test(ov.text) && /The rule/.test(ov.text) && /eyepiece × objective/.test(ov.text) && /Why it happens/.test(ov.text) && /Do it again/.test(ov.text), ov);
  await closeOv();
  const lockedId = await ev("(document.querySelector('.lab-found-card:not(.is-found)') || {}).dataset?.disc || null");
  if (lockedId) {
    await click(`.lab-found-card[data-disc="${lockedId}"]`);
    ov = await overlay();
    ok('a locked discovery shows how to find it, with “Show me how”', ov && /How to find it/.test(ov.text) && /Show me how/.test(ov.text), ov);
    await click('#lab-overlay [data-disc-go]');
    ok('…and “Show me how” starts a guide for it', !!(await dbg()).guide);
    await act('guide-stop');
  }
  const discIds = await ev('LabMicroscopeData.forGrade(LabMicroscopeData.DISCOVERIES, 9).map(d => d.id)');
  const unlockAll = async ids => { const out = []; for (const id of ids) {
    const res = await ev(`(() => {
      const st = Labs.store('microscope'); delete st.disc['${id}'];
      document.getElementById('lab-overlay')?.remove();
      LabMicroscope.discoveryGuide('${id}');
      for (let k = 0; k < 60 && LabMicroscope._debug().guide; k++) {
        const o = document.querySelector('#lab-overlay.is-hazard, #lab-overlay.is-result');
        if (o) return 'card: ' + o.textContent.replace(/\\s+/g, ' ').slice(0, 90);
        const btn = document.querySelector('#lab-guide [data-guide-do]');
        if (btn) btn.click(); else LabMicroscope._tick(2);
      }
      if (LabMicroscope._debug().guide) return 'guide never finished at step ' + LabMicroscope._debug().guide.step;
      document.getElementById('lab-overlay')?.remove();
      return !!st.disc['${id}'];
    })()`);
    if (res !== true) out.push(id + ' → ' + res);
  } return out; };
  const unsolved = await unlockAll(discIds);
  ok(`all ${discIds.length} discoveries unlock by following their own “Show me how”`, unsolved.length === 0, unsolved);
  cnt = await counter();
  ok('…and the counter says so', cnt.shown === cnt.saved && cnt.shown === `${discIds.length}/${discIds.length}`, cnt);

  // ══ Grade 7 ═══════════════════════════════════
  // ⚠ Until the lead adds 7 to the microscope row in Labs.LABS, Labs.grade()
  //   says 9 for this lab. atGrade() then overrides Labs.grade (and prints a
  //   NOTE); once registered, the real path runs with no edit here.
  await ev('window.__labsGrade = Labs.grade; true');
  const atGrade = async n => {
    await ev(`(() => { if (typeof Labs !== 'undefined') { Labs.closeOverlay(true); Labs.backToHub(); } SELECTED_GRADE = ${n}; showScreen('labs'); return true; })()`);
    for (let i = 0; i < 40; i++) { await sleep(150); if (await ev("typeof window.Labs !== 'undefined' && !!document.getElementById('labs-root')")) break; }
    await ev('Labs.grade = window.__labsGrade; Labs.backToHub(); true');
    const registered = await ev(`Labs.labsFor(${n}).some(l => l.id === 'microscope')`);
    if (!registered) {
      console.log(`NOTE Grade ${n}: Labs.LABS does not list Grade ${n} on the microscope row yet, so Labs.grade is overridden to ${n} for this run.`);
      await ev(`Labs.grade = () => ${n}; true`);
    }
    await ev("Labs.openLab('microscope'); true");
    for (let i = 0; i < 60; i++) { await sleep(150); if (await ev(`!!document.querySelector('#labs-root .lab-microscope') && LabMicroscope._debug().grade === ${n}`)) break; }
    return registered;
  };
  const ids = g => ev(`(() => { const D = LabMicroscopeData, f = l => D.forGrade(l, ${g}).map(x => x.id); return { guides: f(D.GUIDES), missions: f(D.MISSIONS), discs: f(D.DISCOVERIES) }; })()`);
  const G7 = await ids(7), G9 = await ids(9);
  const shown = () => ev(`(() => { const all = s => [...document.querySelectorAll(s)];
    return { guides: all('.lab-start [data-guide]').map(b => b.dataset.guide), missions: all('.lab-start [data-mission]').map(b => b.dataset.mission),
             slides: all('#lab-panel [data-set="slide"]').map(b => b.dataset.v), parts: all('#lab-microscope-tools [data-set="part"]').map(b => b.dataset.v),
             kinds: all('#lab-microscope-tools [data-set="kind"]').map(b => b.dataset.v), cells: all('#lab-microscope-tools [data-set="id"]').length,
             draw: !!document.querySelector('#labs-root [data-act="draw"]'), prick: !!document.querySelector('#labs-root [data-act="prick"]'),
             measure: !!document.querySelector('#labs-root [data-set="rig"][data-v="measure"]'),
             eyebrow: document.querySelector('.lab-microscope .lab-eyebrow').textContent, counter: document.getElementById('lab-found-n').textContent }; })()`);

  console.log('\n-- Grade 7: opening');
  const reg7 = await atGrade(7);
  d = await dbg();
  ok('Grade 7: the microscope opens at Grade 7 on a fresh bench', d.grade === 7 && d.scope.slide === null && !d.guide && !d.mission, { grade: d.grade, slide: d.scope.slide });
  ov = await overlay();
  ok('Grade 7: its own welcome - make your own slides - whose “Show me how” starts the onion guide',
     ov && /Make your own slides/.test(ov.text) && /Show me how/.test(ov.text) && (await ev("(document.querySelector('#lab-overlay [data-guide]') || {}).dataset?.guide")) === G7.guides[0], ov);
  await closeOv();
  ok('…remembered for Grade 7 on its own', await ev("Labs.store('microscope').intro7 === true"));
  let sh = await shown();
  ok('Grade 7 top bar: “Science · Grade 7”, and no measuring desk', /Science · Grade 7/.test(sh.eyebrow) && !sh.measure, sh);
  ok('Grade 7 start panel: only the Grade 7 guided experiments and missions',
     sh.guides.join() === G7.guides.join() && sh.missions.join() === G7.missions.join() && G7.guides.length >= 3 && G7.missions.length >= 2
     && !sh.guides.some(x => G9.guides.includes(x)) && !sh.missions.some(x => G9.missions.includes(x)), sh);
  ok('Grade 7 shelf: onion skin, cheek cells and a leaf - no blood smears, no finger prick', sh.slides.join() === 'onion,cheek,leaf' && !sh.prick, sh);
  ok('Grade 7 tools: name the part (6), plant or animal - no blood-cell buttons, no drawing', sh.parts.length === 6 && sh.kinds.join() === 'plant,animal' && sh.cells === 0 && !sh.draw, sh);
  ok(`Grade 7 counter counts only Grade 7 discoveries (0/${G7.discs.length})`, sh.counter === `0/${G7.discs.length}` && G7.discs.length >= 10, sh.counter);
  await act('help');
  ov = await overlay();
  ok('Grade 7 help: making a slide, the cover slip, both stains, the parts of a cell, plant or animal - and no blood',
     ov && /Making a slide/.test(ov.text) && /cover slip/.test(ov.text) && /iodine/.test(ov.text) && /methylene blue/.test(ov.text) && /Chloroplast/.test(ov.text)
     && /Plant cell or animal cell/.test(ov.text) && !/Plasma/.test(ov.text), ov && ov.text.slice(0, 200));
  await closeOv();
  await act('tip');
  ok('Grade 7 💡 gives a Grade 7 fact', await ev("LabMicroscopeData.FACTS_G7.some(f => document.getElementById('lab-coach-text').textContent.includes(f))"));
  await ev('LabMicroscope._test({ instant: true }); true');

  console.log('\n-- Grade 7: a guided experiment');
  await click('.lab-start [data-guide="g7_onion"]');
  g = await gs();
  ok('Onion skin cells: opens at step 2 - make the slide - and the onion-skin button glows', g.box && /Step 2 of 13/.test(g.text) && /onion/.test(g.text) && g.next === 'slide:onion', g);
  await click('[data-guide-do]');
  g = await gs();
  ok('then ONE drop of iodine glows', g.next === 'stain:iodine' && /iodine/.test(g.text), g);
  await click('[data-guide-do]');
  g = await gs();
  ok('then the cover slip, lowered at an angle', g.next === 'cover:angle' && /angle/.test(g.text), g);
  await click('[data-guide-do]');
  d = await dbg();
  ok('…the slide is stained and covered, with no bubbles; then the clips glow', d.scope.stain === 'iodine' && d.scope.cover === 'angle' && !d.view.bubbles && (await gs()).next === 'clips', d.scope);
  let endG = 'stuck';
  for (let k = 0; k < 30; k++) {
    const t = await ev("(() => { if (!LabMicroscope._debug().guide) return 'done'; if (document.querySelector('#lab-overlay.is-hazard, #lab-overlay.is-result')) return 'card'; document.querySelector('#lab-guide [data-guide-do]').click(); return 'step'; })()");
    if (t !== 'step') { endG = t; break; }
  }
  ov = await overlay();
  ok('…it runs to “Experiment complete”, the nucleus named at ×400', endG === 'done' && ov && /Experiment complete/.test(ov.text) && (await dbg()).view.total === 400, { endG, ov });
  ok('…the nucleus discovery is collected and the notebook has a “Parts I named” table',
     await ev("!!Labs.store('microscope').disc.g7_nucleus") && /Parts I named/.test(await ev("document.getElementById('lab-notebook').textContent")));
  ok('…and the next Grade 7 experiment is offered', ov && /Next: Your own cheek cells/.test(ov.text), ov && ov.text.slice(0, 300));
  cnt = await counterG(7);
  ok('the ✨ counter matches what is saved for Grade 7', cnt.shown === cnt.saved, cnt);
  await closeOv();
  const guideRuns7 = await runAllGuides(7);
  ok('every Grade 7 guided experiment runs to its end with no mistake card', Object.keys(guideRuns7).length >= 3 && Object.values(guideRuns7).every(v => v === 'done'), guideRuns7);

  console.log('\n-- Grade 7: hazards');
  const freshBench7 = async () => { await ev("document.getElementById('lab-overlay')?.remove(); LabMicroscope.startGuide('g7_onion'); true"); await act('guide-stop'); };
  const MAKE = (sl, st) => [`[data-set="slide"][data-v="${sl}"]`, ...(st ? [`[data-set="stain"][data-v="${st}"]`] : []), '[data-set="cover"][data-v="angle"]', '[data-act="clips"]', '[data-set="light"][data-v="lamp"]'];
  const LOW7 = (sl, st) => [...MAKE(sl, st), ...LOW.slice(SETUP.length)];
  const HIGH7 = (sl, st) => [...LOW7(sl, st), '[data-set="obj"][data-v="40"]', '[data-set="fine"][data-v="up"]'];
  const examHead = t => reg7 ? /In your exams/.test(t) : true;
  if (!reg7) console.log('NOTE the exam heading on a card comes from Labs’ own grade: it will read “In your exams” once Grade 7 is registered.');
  await freshBench7();
  await act('swab');
  ov = await overlay();
  ok('borrowing a used cotton bud: a BIOLOGICAL HAZARD card - your own cheek, a fresh bud, into disinfectant',
     ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Biological hazard') && /disinfectant/.test(ov.text) && /OWN cheek/.test(ov.text) && examHead(ov.text), ov);
  await closeOv();
  await act('splash');
  ov = await overlay();
  ok('squeezing the stain dropper hard: a HARMFUL (irritant) card - goggles, one drop, rinse an eye',
     ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Harmful') && /goggles/i.test(ov.text) && /rinse/.test(ov.text), ov);
  await closeOv();
  await clicks('[data-set="slide"][data-v="onion"]', '[data-set="stain"][data-v="iodine"]', '[data-set="cover"][data-v="angle"]');
  await ev('LabMicroscope._test({ instant: false }); true');
  await act('press');
  const midP = { ov: await overlay(), d: await dbg() };
  await sleep(1800);
  ov = await overlay();
  ok('pressing hard on the cover slip: it cracks on the canvas first, then a SHARP card',
     midP.ov === null && midP.d.busy && midP.d.cracked && ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Sharp - can cut') && /cover slip broke/.test(ov.text), { mid: midP.ov, busy: midP.d.busy, ov });
  await ev('LabMicroscope._test({ instant: true }); true');
  await closeOv();
  d = await dbg();
  ok('…and the broken slide is gone: make a new one', d.scope.slide === null && d.scope.cover === null && !d.cracked, d.scope);
  await clicks(...MAKE('onion', 'iodine'), '[data-set="obj"][data-v="40"]', '[data-act="lower"]', '[data-set="coarse"][data-v="down"]');
  ov = await overlay();
  ok('high power, lowered, coarse DOWN: the Grade 7 crack card - low power first, focus upwards', ov && /is-hazard/.test(ov.cls) && /lens hit the slide/.test(ov.text) && /LOW-power/.test(ov.text), ov);
  await closeOv();
  await act('sun');
  ov = await overlay();
  ok('aiming the mirror at the Sun: a BRIGHT LIGHT (eye) card in Grade 7 words', ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Bright light') && /never at the Sun/.test(ov.text) && !/Chemistry 20/.test(ov.text), ov);
  await closeOv();
  ok('the Grade 7 hazards are counted in the lab store', await ev("['g7_swab','g7_stain','g7_crack','g7_sun'].every(k => Labs.store('microscope').hazards[k] >= 1)"));

  console.log('\n-- Grade 7: mistakes that teach');
  await freshBench7();
  await clicks('[data-set="slide"][data-v="onion"]', '[data-set="stain"][data-v="iodine"]');
  await ev('LabMicroscope._test({ instant: false }); true');
  await click('[data-set="cover"][data-v="drop"]');
  const midB = { ov: await overlay(), d: await dbg() };
  await sleep(1500);
  ov = await overlay();
  ok('dropping the cover slip flat: it falls on the canvas first, then “Air bubbles” - lower it at an angle',
     midB.ov === null && midB.d.busy && ov && /is-result/.test(ov.cls) && /Air bubbles/.test(ov.text) && /at an angle/.test(ov.text) && examHead(ov.text), { mid: midB.ov, ov });
  ok('…and the bubbles stay on the slide', (await dbg()).view.bubbles === true);
  await ev('LabMicroscope._test({ instant: true }); true');
  await closeOv();
  await freshBench7();
  await clicks(...MAKE('onion', 'iodine'), '[data-set="obj"][data-v="40"]', '[data-act="lower"]', '[data-set="coarse"][data-v="up"]');
  await resultCard('starting on high power: “Nothing to see on high power” - start on low power', /Nothing to see on high power/);
  await freshBench7();
  await clicks(...HIGH7('onion', null));
  d = await dbg();
  ok('unstained onion at ×400 is sharp - and the “Why add a stain?” discovery is collected', d.view.sharp && d.view.total === 400 && !d.view.stained && await ev("!!Labs.store('microscope').disc.g7_stain"), d.view);
  await click('[data-set="part"][data-v="nucleus"]');
  await resultCard('naming the nucleus with no stain: “No stain - the cells are almost invisible”', /No stain/);
  await freshBench7();
  await clicks(...HIGH7('onion', 'iodine'), '[data-set="coarse"][data-v="up"]');
  await resultCard('coarse focus at ×400: the Grade 7 “The image vanished” card', /fine focus knob/i);
  await freshBench7();
  await clicks(...HIGH7('cheek', 'blue'), '[data-set="part"][data-v="wall"]');
  ok('naming a cell wall on a cheek cell: “animal cells have no cell wall”', /animal cells - they have no cell wall/.test(await ev("document.getElementById('lab-coach-text').textContent")));

  console.log('\n-- Grade 7: missions');
  await ev("LabMicroscope.startMission('g7_onionparts'); true");
  await clicks(...HIGH7('onion', 'iodine'), '[data-set="part"][data-v="nucleus"]', '[data-set="move"][data-v="left"]', '[data-set="part"][data-v="vacuole"]',
               '[data-set="move"][data-v="right"]', '[data-set="move"][data-v="right"]', '[data-set="part"][data-v="wall"]',
               '[data-set="move"][data-v="left"]', '[data-set="move"][data-v="up"]', '[data-set="part"][data-v="cytoplasm"]');
  d = await dbg();
  ok('Parts of a plant cell: the nucleus, vacuole, wall and cytoplasm found on stained onion, no mistakes', d.mission && d.mission.success && d.mission.found.length === 4 && d.mission.errors === 0, d.mission);
  await act('quiz');
  ok('…3 stars, the picture questions included', (await answerAll('g7_onionparts')) === '3 of 3 stars');
  ok('…saved', await ev("Labs.store('microscope').missions.g7_onionparts.stars === 3"));
  await closeOv();
  await ev("LabMicroscope.startMission('g7_compare'); true");
  await clicks(...HIGH7('cheek', 'blue'), '[data-set="move"][data-v="left"]', '[data-set="move"][data-v="left"]', '[data-set="part"][data-v="membrane"]', '[data-set="kind"][data-v="animal"]',
               ...HIGH7('leaf', null), '[data-set="part"][data-v="chloroplast"]', '[data-set="kind"][data-v="plant"]');
  d = await dbg();
  ok('Plant or animal?: cheek = animal (membrane), leaf = plant (chloroplast), no mistakes', d.mission && d.mission.success && d.mission.found.length === 4 && d.mission.errors === 0, d.mission);
  await act('quiz');
  ok('…3 stars', (await answerAll('g7_compare')) === '3 of 3 stars');
  await closeOv();
  await click('[data-panel="missions"]');
  ok('the Missions tab lists only the Grade 7 missions', await ev(`[...document.querySelectorAll('#lab-panel [data-mission]')].map(b => b.dataset.mission).join() === ${JSON.stringify(G7.missions.join())}`));
  await click('[data-panel="sandbox"]');

  console.log('\n-- Grade 7: calm, phone');
  await freshBench7();
  await ev("document.documentElement.classList.add('kid-calm'); LabMicroscope._test({ instant: false }); true");
  await clicks('[data-set="slide"][data-v="onion"]', '[data-set="stain"][data-v="iodine"]', '[data-set="cover"][data-v="drop"]');
  ov = await overlay();
  ok('in Calm Mode the bubbles card appears at once, with no animation', ov && /Air bubbles/.test(ov.text) && (await dbg()).busy === false, ov);
  await closeOv();
  await ev("document.documentElement.classList.remove('kid-calm'); LabMicroscope._test({ instant: true }); true");
  await freshBench7();
  await fit('360px, Grade 7 bench and shelf: no control past the screen edge, every tap target at least 44px');
  await click('[data-panel="found"]');
  await fit('360px, Grade 7 discoveries: the same');
  await click('[data-panel="sandbox"]');

  console.log('\n-- Grade 7: discoveries');
  await click('[data-panel="found"]');
  ok('the Discoveries tab shows only the Grade 7 cards', await ev(`[...document.querySelectorAll('.lab-found-card')].map(b => b.dataset.disc).join() === ${JSON.stringify(G7.discs.join())}`));
  const unsolved7 = await unlockAll(G7.discs);
  ok(`all ${G7.discs.length} Grade 7 discoveries unlock by following their own “Show me how”`, unsolved7.length === 0, unsolved7);
  cnt = await counterG(7);
  ok('…and the Grade 7 counter says so', cnt.shown === cnt.saved && cnt.shown === `${G7.discs.length}/${G7.discs.length}`, cnt);

  console.log('\n-- back to Grade 9');
  await atGrade(9);
  sh = await shown();
  ok('Grade 9 again: “Biology · Grade 9”, the measuring desk, the blood slides, the Grade 9 guides and missions - no Grade 7 content',
     /Biology · Grade 9/.test(sh.eyebrow) && sh.measure && sh.slides.join() === 'blood,unstained' && sh.prick && sh.cells === 4 && sh.parts.length === 0
     && sh.guides.join() === G9.guides.join() && sh.missions.join() === G9.missions.join(), sh);
  ok('…and its counter still shows the Grade 9 set, untouched by Grade 7', sh.counter === `${G9.discs.length}/${G9.discs.length}`, sh.counter);
  await click('[data-panel="found"]');
  ok('…its Discoveries tab shows only the Grade 9 cards', await ev(`[...document.querySelectorAll('.lab-found-card')].map(b => b.dataset.disc).join() === ${JSON.stringify(G9.discs.join())}`));
  await ev('Labs.grade = window.__labsGrade; true');

  await ev("showScreen('student-home'); true");
  await sleep(300);
  ok('no page errors along the way', errors.length === 0, errors.slice(0, 5));

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); quit(1); });
