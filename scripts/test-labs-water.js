'use strict';
// Science Labs › Water & States (PSAC Grade 4), driven in a real browser.
//
// Proves the lab end to end: it loads its own three files only when opened,
// lands with "What would you like to do?", the "From ice to steam" guided
// experiment runs to its end (0 °C, 100 °C, steam, condensation), every
// discovery unlocks by following its own "Show me how", every hazard and
// result card fires and explains itself (with "In the PSAC exam" from the
// shell), all three missions reach three stars and a mistake costs one, 🔊
// read-aloud speaks only when tapped and is cancelled on a step change, an
// overlay and a screen change, the loop restarts after leaving the screen,
// Calm Mode applies time at once, and every bench fits a 360px phone with
// 44px tap targets and no page errors.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-water.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
// ⚠ Debugging port 9412 is this lab's; the other lab builds use 9401-9411.
// ⚠ Never drive the installed Chrome: it joins the user's live browser.
// ⚠ One Chrome, killed and its profile deleted on EVERY exit (pass, fail,
//   crash or Ctrl+C). LAB_PROFILE_DIR chooses where the throwaway profile
//   goes (default: os.tmpdir()).
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9412;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); } };

const profileRoot = process.env.LAB_PROFILE_DIR || os.tmpdir();
fs.mkdirSync(profileRoot, { recursive: true });
const profile = fs.mkdtempSync(path.join(profileRoot, 'psac-labs-water-'));
let chrome = null, ws = null, closing = false;
async function shutdown(code) {
  if (closing) return;
  closing = true;
  try { if (ws) ws.close(); } catch (_) {}
  if (chrome && chrome.exitCode === null) {
    const gone = new Promise(r => chrome.once('exit', r));
    try { chrome.kill(); } catch (_) {}
    await Promise.race([gone, sleep(5000)]);
  }
  for (let i = 0; i < 12; i++) {
    try { fs.rmSync(profile, { recursive: true, force: true }); break; } catch (_) { await sleep(400); }
  }
  process.exit(code);
}
process.on('SIGINT', () => shutdown(130));
process.on('SIGTERM', () => shutdown(143));
process.on('uncaughtException', e => { console.error(e); shutdown(1); });
process.on('unhandledRejection', e => { console.error(e); shutdown(1); });

(async () => {
  if (!process.env.CHROME_PATH) { console.log('Set CHROME_PATH to Chrome for Testing (never the installed Chrome).'); return shutdown(1); }
  chrome = spawn(process.env.CHROME_PATH, [
    '--headless=new', '--remote-debugging-port=' + DBG, '--user-data-dir=' + profile,
    '--allow-file-access-from-files', '--no-first-run', '--no-default-browser-check', '--hide-scrollbars',
    '--disable-extensions', '--disable-background-networking', 'about:blank',
  ], { stdio: 'ignore' });
  let version; for (let i = 0; i < 40 && !version; i++) { try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); } }
  if (!version) throw new Error('Chrome did not start');
  if (!/HeadlessChrome/.test(version['User-Agent'] || version.Browser || '')) { console.log('REFUSING: port ' + DBG + ' is not our headless Chrome: ' + version.Browser); return shutdown(1); }
  ws = new WebSocket(version.webSocketDebuggerUrl);
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
  const dbg = () => ev('LabWater._debug()');
  const overlay = () => ev(`(() => { const o = document.getElementById('lab-overlay'); if (!o) return null;
    return { cls: o.className, text: o.textContent.replace(/\\s+/g, ' ').slice(0, 3000),
             signs: [...o.querySelectorAll('.lab-sign figcaption')].map(f => f.textContent) }; })()`);
  const closeOv = () => click('#lab-overlay [data-ov-close]');
  const set = (k, v) => clicks(`[data-set="${k}"][data-v="${v}"]`);
  const act = a => clicks(`[data-act="${a}"]`);
  const speech = () => ev('({ spoken: window.__tts.spoken.slice(), cancels: window.__tts.cancels })');
  // A clean bench with no guide and no mission: start a guide, stop it (that
  // resets the bench), then pick the bench.
  const freshBench = async (rig = 'heat') => {
    await ev("document.getElementById('lab-overlay')?.remove(); LabWater.startGuide('ice_steam'); true");
    await act('guide-stop');
    await set('rig', rig);
  };

  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof showScreen === 'function' && typeof RoleModules !== 'undefined'"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url + ', not the file we navigated to.'); return shutdown(1); }
  ok('app loaded', ready === true);
  await sleep(2000);
  // A stand-in for the speech engine: records what is spoken and cancelled.
  await ev(`(() => { const t = { spoken: [], cancels: 0, speaking: false, pending: false,
      speak(u) { this.spoken.push(u.text); }, cancel() { this.cancels++; }, getVoices() { return []; } };
    Object.defineProperty(window, 'speechSynthesis', { value: t, configurable: true, writable: true });
    window.__tts = t; return true; })()`);

  // ── Opening the lab ─────────────────────────────
  console.log('\n-- opening the lab');
  await ev("SELECTED_GRADE = 4; showScreen('labs'); true");
  let hub = false;
  for (let i = 0; i < 40 && !hub; i++) { await sleep(250); hub = await ev("typeof window.Labs !== 'undefined' && !!document.getElementById('labs-root')"); }
  ok('Grade 4: showScreen("labs") loads the Labs shell', hub);
  const labScripts = () => ev("[...document.scripts].map(s => s.src).filter(s => /engine\\/labs\\//.test(s)).map(s => s.split('/').pop()).join()");
  ok('no Water & States code before it is opened', !/lab_water/.test(await labScripts()), await labScripts());
  await ev("Labs.openLab('water'); true");
  let mounted = false;
  for (let i = 0; i < 60 && !mounted; i++) { await sleep(200); mounted = await ev("typeof window.LabWater !== 'undefined' && !!document.querySelector('#labs-root .lab-water')"); }
  ok('Labs.openLab("water") loads LabWater and renders the bench', mounted);
  ok('it fetched its own data file, then the bench', /lab_water_data\.js,lab_water\.js/.test(await labScripts()), await labScripts());
  ok('the lab is used at Grade 4', (await ev('Labs.grade()')) === 4);
  await sleep(500);
  ok('its stylesheet is linked and styles the set-up buttons',
     await ev("!!document.querySelector('link[data-lab-css=\"water\"]') && getComputedStyle(document.querySelector('.lab-water-opt')).minHeight === '44px'"));
  let ov = await overlay();
  ok('first visit shows the welcome card with “Show me how”', ov && /Welcome to Water & States/.test(ov.text) && /Show me how/.test(ov.text), ov);
  ok('nothing was read aloud on its own', (await speech()).spoken.length === 0);
  await closeOv();
  ok('the welcome is remembered', await ev("Labs.store('water').intro === true"));
  ok('top bar: back, Science · Grade 4, title, adult helper and help',
     await ev("!!document.querySelector('.lab-water .lab-top [data-act=\"hub\"]') && /Science · Grade 4/.test(document.querySelector('.lab-water .lab-eyebrow').textContent) && /Water & States/.test(document.querySelector('.lab-water h1').textContent) && !!document.getElementById('lab-water-adult') && !!document.querySelector('.lab-water [data-act=\"help\"]')"));
  await act('help');
  ov = await overlay();
  ok('help explains the three states, 0 °C, 100 °C, the water cycle and a fair test',
     ov && /Solid/.test(ov.text) && /Gas/.test(ov.text) && /0 °C/.test(ov.text) && /100 °C/.test(ov.text) && /precipitation/.test(ov.text) && /ONE thing/.test(ov.text), ov && ov.text.slice(0, 200));
  await closeOv();
  await act('tip');
  ok('💡 gives a fact', /💡/.test(await ev("document.getElementById('lab-coach-text').textContent")));

  // ── Read aloud ─────────────────────────────────
  console.log('\n-- read aloud');
  const coachText = await ev("document.getElementById('lab-coach-text').textContent");
  await act('say-coach');
  let sp = await speech();
  ok('🔊 on the lab assistant speaks its words (without the emoji)', sp.spoken.length === 1 && sp.spoken[0].length > 10 && coachText.includes(sp.spoken[0].slice(0, 12)) && !/💡/.test(sp.spoken[0]), sp);
  const c0 = sp.cancels;
  await act('help');
  ok('opening an overlay cancels the speech', (await speech()).cancels === c0 + 1);
  await closeOv();
  await ev('LabWater._test({ instant: true }); true');

  // ── Landing and a guided experiment ─────────────
  console.log('\n-- what to do here');
  ok('the Bench tab opens with “What would you like to do?”, 4 guided experiments and 3 missions',
     await ev("/What would you like to do/.test(document.querySelector('.lab-start').textContent) && document.querySelectorAll('.lab-start [data-guide]').length === 4 && document.querySelectorAll('.lab-start [data-mission]').length === 3"));
  ok('the tabs are Bench, Missions and Discoveries, with a counter', await ev("[...document.querySelectorAll('.lab-tabs [data-panel]')].map(b => b.dataset.panel).join() === 'sandbox,missions,found' && /\\/15$/.test(document.getElementById('lab-found-n').textContent)"));
  await click('.lab-start [data-guide="ice_steam"]');
  const gs = () => ev(`({ box: !document.getElementById('lab-guide').hidden, text: document.getElementById('lab-guide').textContent.replace(/\\s+/g, ' '),
    next: (() => { const e = document.querySelector('.is-next'); return e ? (e.dataset.set ? e.dataset.set + ':' + e.dataset.v : e.dataset.act) : null; })(),
    start: !!document.querySelector('.lab-start') })`);
  let g = await gs();
  ok('From ice to steam: already on the heating bench, so it opens at step 2 - ask an adult - and the adult button glows',
     g.box && /Step 2 of 10/.test(g.text) && /adult/.test(g.text) && g.next === 'adult:on' && !g.start, g);
  await click('[data-guide-do]');
  g = await gs();
  ok('…then “On the hot plate” glows (step 3)', g.next === 'place:hot' && /Step 3 of 10/.test(g.text), g);
  await click('[data-guide-do]'); await click('[data-guide-do]');
  let d = await dbg();
  ok('after 5 minutes on the hot plate the ice is melting, at 0 °C', d.heat.min === 5 && d.heat.phase === 'melting' && d.heat.T === 0, d.heat);
  g = await gs();
  ok('…and “Read at eye level” glows under the picture', g.next === 'read' && /Step 5 of 10/.test(g.text), g);
  await click('[data-act="say-guide"]');
  sp = await speech();
  ok('🔊 in the guide box reads the step', /thermometer/.test(sp.spoken[sp.spoken.length - 1]), sp.spoken.slice(-1));
  const c1 = sp.cancels;
  await click('[data-guide-do]');
  ok('the next step cancels the speech', (await speech()).cancels === c1 + 1, await speech());
  ok('the reading says 0 °C and finds “Ice melts at 0 °C”', /0 °C/.test(await ev("document.getElementById('lab-coach-text').textContent")) && await ev("!!Labs.store('water').disc.zero"));
  await click('[data-guide-do]'); await click('[data-guide-do]');
  d = await dbg();
  ok('five minutes and one more: the water boils at 100 °C', d.heat.min === 11 && d.heat.phase === 'boiling' && d.heat.T === 100 && d.heat.steamy, d.heat);
  await click('[data-guide-do]');
  g = await gs();
  ok('…read again (100 °C), then “It is steam” glows', g.next === 'name:steam' && /Step 9 of 10/.test(g.text) && (await dbg()).heat.readings.join() === '0,100', g);
  await click('[data-guide-do]');
  await click('[data-guide-do]');
  ov = await overlay();
  ok('the cold plate catches the steam and the experiment completes with “What you found out”',
     ov && /Experiment complete/.test(ov.text) && /What you found out/.test(ov.text) && /0 °C/.test(ov.text) && /100 °C/.test(ov.text) && (await dbg()).heat.caught, ov);
  ok('the finished experiment is remembered, and the next one offered', await ev("!!Labs.store('water').guides.ice_steam") && /Next: Freeze it/.test(ov.text));
  ok('discoveries were collected on the way', await ev("['zero','boil','steam','condense','melt'].every(id => Labs.store('water').disc[id])"));
  const counter = () => ev("({ shown: document.getElementById('lab-found-n').textContent, saved: Object.keys(Labs.store('water').disc).length + '/' + LabWaterData.DISCOVERIES.length })");
  let cnt = await counter();
  ok('the ✨ counter matches what is saved', cnt.shown === cnt.saved, cnt);
  const nb = await ev("document.getElementById('lab-notebook').textContent.replace(/\\s+/g, ' ')");
  ok('the notebook table: minute, temperature, what I saw, state - 0 °C melting, 100 °C boiling',
     /My thermometer readings/.test(nb) && /0 °C/.test(nb) && /100 °C/.test(nb) && /Ice melting/.test(nb) && /Boiling/.test(nb), nb.slice(0, 300));
  await closeOv();
  ok('back on the Bench tab, the start panel shows it done', await ev("/✓ done/.test(document.querySelector('.lab-start').textContent)"));

  // ── Hazards ─────────────────────────────────────
  console.log('\n-- hazards');
  await freshBench('heat');
  await ev('LabWater._test({ instant: false }); true');
  await set('place', 'hot');
  const mid = { ov: await overlay(), busy: (await dbg()).busy };
  await sleep(1600);
  ov = await overlay();
  ok('the hot plate with no adult: a burst on the canvas first, then the card', mid.ov === null && mid.busy === true && ov && /is-hazard/.test(ov.cls), { mid, ov });
  ok('…a HOT hazard card: what happened, why, ask an adult, and the PSAC point from the shell',
     ov && ov.signs.includes('Hot surface') && /What happened/.test(ov.text) && /Why it’s dangerous/.test(ov.text) && /Ask an adult/.test(ov.text) && /In the PSAC exam/.test(ov.text) && !/NCE/.test(ov.text), ov);
  await closeOv();
  await ev('LabWater._test({ instant: true }); true');
  ok('…and the beaker stayed on the table', (await dbg()).heat.place === 'table');
  await set('adult', 'on'); await set('place', 'hot'); await act('five'); await act('five'); await act('min');
  await act('hand');
  ov = await overlay();
  ok('a hand over the boiling water: HOT hazard - steam burns', ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Hot surface') && /Steam burns/.test(ov.text) && /oven glove/.test(ov.text), ov);
  await closeOv();
  await freshBench('jar');
  await set('jwater', 'boiling');
  ov = await overlay();
  ok('boiling water in the jar with no adult: HOT hazard - the kettle', ov && ov.signs.includes('Hot surface') && /kettle/.test(ov.text), ov);
  await closeOv();
  await set('adult', 'on'); await set('jwater', 'boiling');
  ov = await overlay();
  ok('…with an adult, the glass jar cracks: SHARP hazard - broken glass, use warm water', ov && ov.signs.includes('Sharp - can cut') && /cracked/.test(ov.text) && /warm water/.test(ov.text), ov);
  await closeOv();
  ok('…and the jar was never filled', (await dbg()).jar.water === 'none');
  ok('the hazards are counted in the lab store', await ev("['hotplate','steam','kettle','crack'].every(id => Labs.store('water').hazards[id] >= 1)"));

  // ── Result cards ────────────────────────────────
  console.log('\n-- mistakes that teach');
  const resultCard = async (label, re) => { const o = await overlay(); ok(label, o && /is-result/.test(o.cls) && /What happened/.test(o.text) && /What you should have done/.test(o.text) && /In the PSAC exam/.test(o.text) && re.test(o.text), o); await closeOv(); };
  await freshBench('heat');
  await set('name', 'smoke');
  ok('naming the cloud before anything rises: nothing to name, no card', !(await overlay()) && /Nothing is rising/.test(await ev("document.getElementById('lab-coach-text').textContent")));
  await set('adult', 'on'); await set('place', 'hot'); await act('five'); await act('five'); await act('min');
  await act('angle');
  await resultCard('reading the boiling water from above: “You read it from above” - it seemed 104 °C', /You read it from above[\s\S]*104 °C[\s\S]*100 °C/);
  ok('…and a wrong reading is not written in the table', (await dbg()).heat.readings.length === 0);
  await set('name', 'smoke');
  await resultCard('calling the steam smoke: “That is not smoke”', /That is not smoke[\s\S]*steam/);
  await freshBench('dry');
  await clicks('[data-set="dish"][data-v="B"]', '[data-set="spot"][data-v="sun"]', '[data-set="fan"][data-v="on"]', '[data-act="hour"]');
  await resultCard('dish B in the sun AND with a fan: “two things changed”', /two things changed[\s\S]*the sun and the fan/);
  await act('reset');
  ok('Start again: three fresh dishes, hour 0', (await dbg()).dry.h === 0 && (await dbg()).dry.items.B.spot === 'shade');
  await clicks('[data-set="dish"][data-v="B"]', '[data-set="amt"][data-v="60"]', '[data-set="spot"][data-v="sun"]', '[data-act="hour"]');
  await resultCard('more water AND the sun: “Not the same amount of water”', /Not the same amount[\s\S]*60 ml/);
  await freshBench('jar');
  await clicks('[data-set="jwater"][data-v="warm"]', '[data-act="ten"]');
  await resultCard('warm water in an open jar: “The vapour escaped”', /vapour escaped/);

  // ── Missions ───────────────────────────────────
  console.log('\n-- missions');
  const answerAll = id => ev(`(() => {
    const qs = LabWaterData.MISSIONS.find(m => m.id === '${id}').quiz;
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
  const states = async withSlip => {
    await ev("LabWater.startMission('states'); true");
    await clicks('[data-set="adult"][data-v="on"]', '[data-set="place"][data-v="hot"]', '[data-act="five"]', '[data-act="read"]', '[data-act="five"]', '[data-act="min"]');
    if (withSlip) { await act('angle'); await closeOv(); }
    await clicks('[data-act="read"]', '[data-set="name"][data-v="steam"]');
    ok(`Ice to steam${withSlip ? ' (with a slip)' : ''}: not done before the steam is caught`, (await dbg()).mission.success === false);
    await act('catch');
    d = await dbg();
    ok('…done once it is caught', d.mission.success && d.mission.errors === (withSlip ? 1 : 0), d.mission);
    await act('quiz');
    return answerAll('states');
  };
  ok('…a thermometer read from above costs a star: 2 stars', (await states(true)) === '2 of 3 stars' && await ev("Labs.store('water').missions.states.stars === 2"));
  await closeOv();
  ok('…done cleanly: 3 stars, and the best is kept', (await states(false)) === '3 of 3 stars' && await ev("Labs.store('water').missions.states.stars === 3"));
  await closeOv();

  await ev("LabWater.startMission('race'); true");
  await clicks('[data-set="dish"][data-v="B"]', '[data-set="spot"][data-v="sun"]', '[data-set="dish"][data-v="C"]', '[data-set="fan"][data-v="on"]');
  await act('hour'); await act('hour');
  ok('The drying race: not done at hour 2', (await dbg()).mission.success === false);
  await act('hour');
  d = await dbg();
  ok('…done at hour 3 with no mistakes: the shade dish A has the most water left', d.mission.success && !d.mission.errors && d.dry.items.A.left > d.dry.items.B.left && d.dry.items.A.left > d.dry.items.C.left, d.dry.items);
  await act('quiz');
  ok('…3 stars', (await answerAll('race')) === '3 of 3 stars');
  await closeOv();

  await ev("LabWater.startMission('cycle'); true");
  await clicks('[data-set="jwater"][data-v="warm"]', '[data-set="jlid"][data-v="ice"]', '[data-act="ten"]');
  ok('Rain in a jar: drops, but no rain yet at 10 minutes', (await dbg()).jar.stage !== 'rain' && (await dbg()).jar.drops > 0 && !(await dbg()).mission.success);
  await act('ten');
  d = await dbg();
  ok('…rain at 20 minutes, mission done', d.jar.stage === 'rain' && d.mission.success, d.jar);
  const jnb = await ev("document.getElementById('lab-notebook').textContent.replace(/\\s+/g, ' ')");
  ok('the notebook ticks evaporation, condensation and precipitation', /Evaporation[^E]*✓ yes/.test(jnb) && /Condensation[^P]*✓ yes/.test(jnb) && /Precipitation[\s\S]*✓ yes/.test(jnb), jnb.slice(0, 300));
  await act('quiz');
  ok('…3 stars', (await answerAll('cycle')) === '3 of 3 stars');
  await closeOv();

  // ── Motion, calm, phone ────────────────────────
  console.log('\n-- motion, calm, phone');
  await freshBench('heat');
  await ev('LabWater._test({ instant: false }); true');
  await act('five');
  await sleep(500);
  d = await dbg();
  const chips = await ev("document.getElementById('lab-water-chips').textContent");
  ok('with animation on, the minutes pass as a time-lapse (the loop is running)', d.busy === true && d.heat.shownMin > 0 && d.heat.shownMin < 5 && /Time passing/.test(chips), { shownMin: d.heat.shownMin, chips });
  await ev('LabWater._tick(3); true');
  d = await dbg();
  ok('…and ends at minute 5, ice sitting at 0 °C on the table', d.busy === false && d.heat.shownMin === 5 && d.heat.T === 0, d.heat);
  ok('the canvas has drawn the bench', await ev("(() => { const c = document.getElementById('lab-water-canvas'); const p = c.getContext('2d').getImageData(c.width / 2, c.height / 2, 1, 1).data; return p[3] > 0; })()"));
  await ev("document.documentElement.classList.add('kid-calm'); true");
  await act('min');
  d = await dbg();
  ok('in Calm Mode a minute passes at once, with no animation', d.heat.min === 6 && d.heat.shownMin === 6 && d.busy === false, d.heat);
  await set('place', 'hot');
  ov = await overlay();
  ok('in Calm Mode a hazard stops the experiment at once (no burst first)', ov && ov.signs.includes('Hot surface'), ov);
  await closeOv();
  await ev("document.documentElement.classList.remove('kid-calm'); LabWater._test({ instant: true }); true");
  const fit = async label => {
    const f = await ev(`(() => { const vw = innerWidth;
      const off = [...document.querySelectorAll('#labs-root button, #labs-root canvas')]
        .filter(e => e.getClientRects().length && e.getBoundingClientRect().right > vw + 0.5)
        .map(e => (e.getAttribute('data-set') || e.getAttribute('data-act') || e.getAttribute('data-panel') || e.tagName) + ' → ' + Math.round(e.getBoundingClientRect().right));
      const small = [...document.querySelectorAll('#labs-root .lab-water-opt, #labs-root .lab-tool, #labs-root .lab-water-rigs button, #labs-root .lab-water-say, #labs-root .lab-coach-tip, #labs-root .lab-goggles, #labs-root .lab-tabs button, #labs-root .lab-icon-btn, #labs-root .lab-btn')]
        .filter(e => e.getClientRects().length && (e.getBoundingClientRect().height < 43.5 || e.getBoundingClientRect().width < 43.5))
        .map(e => (e.getAttribute('data-set') || e.getAttribute('data-act') || e.className) + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height));
      return { vw, root: document.getElementById('labs-root').scrollWidth, off, small }; })()`);
    ok(label, f.root <= f.vw && f.off.length === 0 && f.small.length === 0, f);
  };
  await ev("LabWater.startGuide('ice_steam'); true");
  await fit('360px, heat bench, a guide running: no control past the screen edge, every tap target at least 44px');
  await act('guide-stop');
  await fit('360px, heat bench, the start panel: the same');
  await set('rig', 'dry');
  await fit('360px, the drying race: the same');
  await set('rig', 'jar');
  await fit('360px, the water cycle jar: the same');
  await click('[data-panel="missions"]');
  await fit('360px, the Missions tab: the same');

  // ── Discoveries ────────────────────────────────
  console.log('\n-- discoveries');
  await click('[data-panel="found"]');
  ok('the Discoveries tab shows 15 cards, found and locked', await ev("document.querySelectorAll('.lab-found-card').length === 15 && document.querySelectorAll('.lab-found-card.is-found').length >= 5 && /Clue:/.test(document.querySelector('.lab-found').textContent)"));
  await fit('360px, the Discoveries tab: the same');
  await click('.lab-found-card.is-found[data-disc="boil"]');
  ov = await overlay();
  ok('a found discovery explains itself: what you saw, the science, why, do it again',
     ov && /What you saw/.test(ov.text) && /The science/.test(ov.text) && /100 °C/.test(ov.text) && /Why it happens/.test(ov.text) && /Do it again/.test(ov.text), ov);
  await closeOv();
  await click('.lab-found-card[data-disc="jar_cycle"]');
  ov = await overlay();
  ok('the water-cycle card quotes the PSAC 2022 question on precipitation', ov && /PSAC 2022, Question 1/.test(ov.text) && /precipitation/.test(ov.text), ov);
  await closeOv();
  await ev("delete Labs.store('water').disc.sun_jar; true");
  await click('[data-panel="sandbox"]'); await click('[data-panel="found"]');
  await click('.lab-found-card[data-disc="sun_jar"]');
  ov = await overlay();
  ok('a locked discovery shows the clue, how to find it, and “Show me how”', ov && /Locked discovery/.test(ov.text) && /How to find it/.test(ov.text) && /sunny window/.test(ov.text) && /Show me how/.test(ov.text), ov);
  await click('#lab-overlay [data-disc-go]');
  ok('…and “Show me how” starts a guide for it', ((await dbg()).guide || {}).id === 'disc-sun_jar');
  await act('guide-stop');
  const discIds = await ev('LabWaterData.DISCOVERIES.map(d => d.id)');
  const unsolved = [];
  for (const id of discIds) {
    const res = await ev(`(() => {
      const st = Labs.store('water'); delete st.disc['${id}'];
      document.getElementById('lab-overlay')?.remove();
      LabWater.discoveryGuide('${id}');
      for (let k = 0; k < 30 && LabWater._debug().guide; k++) {
        const o = document.querySelector('#lab-overlay.is-hazard, #lab-overlay.is-result');
        if (o) return 'card: ' + o.textContent.replace(/\\s+/g, ' ').slice(0, 90);
        const btn = document.querySelector('#lab-guide [data-guide-do]');
        if (btn) btn.click(); else LabWater._tick(3);
      }
      if (LabWater._debug().guide) return 'guide never finished at step ' + LabWater._debug().guide.step;
      document.getElementById('lab-overlay')?.remove();
      return !!st.disc['${id}'];
    })()`);
    if (res !== true) unsolved.push(id + ' → ' + res);
  }
  ok(`all ${discIds.length} discoveries unlock by following their own “Show me how”`, unsolved.length === 0, unsolved);
  cnt = await counter();
  ok('…and the counter says so', cnt.shown === cnt.saved && cnt.shown === `${discIds.length}/${discIds.length}`, cnt);

  // ── Leaving ────────────────────────────────────
  console.log('\n-- leaving');
  await act('say-coach');
  const c2 = (await speech()).cancels;
  ok('…the lab knows it is speaking', (await dbg()).talking === true);
  // ⚠ showScreen('student-home') can bounce with no child signed in; go
  //   somewhere that certainly hides the Labs screen.
  await ev("showScreen('landing'); true");
  await sleep(400);
  const left = await ev("({ hidden: document.getElementById('screen-labs').classList.contains('hidden'), talking: LabWater._debug().talking, looping: LabWater._debug().looping })");
  ok('leaving the Labs screen cancels the speech (and stops the loop)', left.hidden && !left.talking && !left.looping && (await speech()).cancels > c2, { left, speech: await speech() });
  await ev("showScreen('labs'); true");
  await sleep(300);
  await ev("Labs.openLab('water'); true");
  await sleep(300);
  await act('say-coach');
  const c3 = (await speech()).cancels;
  ok('…speaking again after coming back, and the loop restarted', await ev('LabWater._debug().talking && LabWater._debug().looping'));
  await ev('Labs.backToHub(); true');
  ok('unmounting the lab cancels the speech', (await speech()).cancels > c3 && (await dbg()).talking === false, await speech());
  ok('progress lives in the lab store (DB.labs.water when there is a child)', await ev("!!Labs.store('water').missions.states && (typeof DB === 'undefined' || !DB || !DB.labs || !!DB.labs.water)"));
  ok('no page errors along the way', errors.length === 0, errors.slice(0, 5));

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  await shutdown(failed ? 1 : 0);
})().catch(e => { console.error(e); shutdown(1); });
