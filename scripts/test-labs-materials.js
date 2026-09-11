'use strict';
// Science Labs › Materials Tester (PSAC Grade 4), driven in a real browser.
//
// Proves the bench end to end: it loads its own files only when opened, the
// welcome and the start panel say what to do, every guided experiment
// finishes, every discovery unlocks by following its own "Show me how", both
// hazards stop the test with the right sign, all three "what went wrong" cards
// appear, the sorting board and the jobs work, missions reach three stars (and
// a hazard costs one), read-aloud speaks only when tapped and is cancelled on
// a step change, an overlay and a screen change, the animation loop runs, Calm
// Mode applies at once, and the bench fits a 360px phone.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-materials.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
// ⚠ Debugging port 9410 - the other lab builds use 9401-9409.
// ⚠ One Chrome, killed and its profile deleted on EVERY exit (pass, fail,
//   crash or Ctrl+C): this laptop runs several builds at once.
//   LAB_PROFILE_DIR chooses where the throwaway profile goes (default: os.tmpdir()).
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9410;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0, d;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); } };

const profileRoot = process.env.LAB_PROFILE_DIR || os.tmpdir();
fs.mkdirSync(profileRoot, { recursive: true });
const profile = fs.mkdtempSync(path.join(profileRoot, 'psac-labs-materials-'));
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
  chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
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
  const dbg = () => ev('LabMaterials._debug()');
  const overlay = () => ev(`(() => { const o = document.getElementById('lab-overlay'); if (!o) return null;
    return { cls: o.className, text: o.textContent.replace(/\\s+/g, ' ').slice(0, 3000),
             signs: [...o.querySelectorAll('.lab-sign figcaption')].map(f => f.textContent) }; })()`);
  const closeOv = () => click('#lab-overlay [data-ov-close]');
  const station = id => click(`#lab-materials-controls [data-station="${id}"]`);
  const tray = id => click(`#lab-materials-controls [data-obj="${id}"]`);
  const speech = () => ev('({ spoken: window.__speech.spoken.slice(), cancels: window.__speech.cancels })');

  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof showScreen === 'function' && typeof RoleModules !== 'undefined'"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url + ', not the file we navigated to.'); return shutdown(1); }
  ok('app loaded', ready === true);
  await sleep(2000);

  // speechSynthesis is stubbed so the test can see every speak() and cancel().
  await ev(`(() => { window.__speech = { spoken: [], cancels: 0 };
    const stub = { speaking: false, pending: false, getVoices: () => [],
      speak(u) { window.__speech.spoken.push({ text: u.text, lang: u.lang }); }, cancel() { window.__speech.cancels++; } };
    Object.defineProperty(window, 'speechSynthesis', { value: stub, configurable: true }); return true; })()`);

  // ── Opening the lab ─────────────────────────────
  console.log('\n-- opening the Materials Tester');
  await ev("SELECTED_GRADE = 4; showScreen('labs'); true");
  let hub = false;
  for (let i = 0; i < 40 && !hub; i++) { await sleep(250); hub = await ev("typeof window.Labs !== 'undefined' && !!document.getElementById('labs-root')"); }
  ok('Grade 4: showScreen(\'labs\') loads the Labs shell', hub);
  const labScripts = () => ev("[...document.scripts].map(s => s.src).filter(s => /engine\\/labs\\//.test(s)).map(s => s.split('/').pop()).join()");
  ok('no Materials Tester code before it is opened', !/lab_materials/.test(await labScripts()), await labScripts());
  await ev("Labs.openLab('materials'); true");
  let up = false;
  for (let i = 0; i < 60 && !up; i++) { await sleep(200); up = await ev("typeof window.LabMaterials !== 'undefined' && !!document.querySelector('#labs-root .lab-materials')"); }
  ok('Labs.openLab(\'materials\') loads LabMaterials and renders the bench', up);
  ok('it fetched its own data file, then the bench', /lab_materials_data\.js,lab_materials\.js/.test(await labScripts()), await labScripts());
  await sleep(400);
  ok('lab_materials.css is linked and styles the tray', await ev("!!document.querySelector('link[data-lab-css=\"materials\"]') && getComputedStyle(document.querySelector('.lab-materials-tray')).display === 'grid'"));
  let ov = await overlay();
  ok('first visit shows the welcome card with “Show me how”', ov && /Welcome to the Materials Tester/.test(ov.text) && /Show me how/.test(ov.text), ov);
  ok('nothing was read aloud on its own (no auto-play)', (await speech()).spoken.length === 0);
  await closeOv();
  ok('the welcome is remembered', await ev("Labs.store('materials').intro === true"));
  ok('top bar: back, help, and the eyebrow “Science · Grade 4”',
     await ev("!!document.querySelector('.lab-materials [data-act=\"hub\"]') && !!document.querySelector('.lab-materials [data-act=\"help\"]') && /Science · Grade 4/.test(document.querySelector('.lab-materials .lab-eyebrow').textContent)"));
  ok('the lab assistant has a 🔊 read-aloud button and a 💡 fact button',
     await ev("!!document.querySelector('.lab-coach [data-act=\"say-coach\"]') && !!document.querySelector('.lab-coach [data-act=\"tip\"]')"));
  ok('seven test stations and a tray of objects', await ev("document.querySelectorAll('[data-station]').length === 7 && document.querySelectorAll('#lab-materials-controls [data-obj]').length === LabMaterialsData.OBJECTS.length"));
  await ev('LabMaterials._test({ instant: true }); true');

  // ── Start panel and a guided experiment ─────────
  console.log('\n-- what to do here');
  ok('the Bench tab opens with “What would you like to do?”, the guided experiments and the missions',
     await ev("/What would you like to do/.test(document.querySelector('.lab-start').textContent) && document.querySelectorAll('.lab-start [data-guide]').length === LabMaterialsData.GUIDES.length && LabMaterialsData.GUIDES.length >= 3 && document.querySelectorAll('.lab-start [data-mission]').length === LabMaterialsData.MISSIONS.length"));
  const guideState = () => ev(`(() => { const g = document.getElementById('lab-guide'), n = document.querySelector('.is-next');
    return { box: !g.hidden, text: g.textContent.replace(/\\s+/g, ' '),
             next: n ? (n.getAttribute('data-obj') || n.getAttribute('data-station') || n.getAttribute('data-act') || n.id) : null,
             start: !!document.querySelector('.lab-start') }; })()`);
  await click('.lab-start [data-guide="magnet"]');
  let gs = await guideState();
  ok('Magnet test: the magnet is already chosen, so it opens at step 2 - the iron nail - and the nail glows',
     gs.box && /Step 2 of 5/.test(gs.text) && /Test the iron nail/.test(gs.text) && gs.next === 'nail' && !gs.start, gs);
  await click('#lab-guide [data-act="say-guide"]');
  let sp = await speech();
  ok('🔊 on the guide box reads the step aloud, in English', sp.spoken.length === 1 && sp.spoken[0].text === 'Test the iron nail.' && /^en/.test(sp.spoken[0].lang), sp);
  const c0 = sp.cancels;
  await click('[data-guide-do]');
  sp = await speech();
  ok('…and the next step cancels the speech', sp.cancels > c0, sp);
  d = await dbg();
  ok('the nail went to the magnet: attracted, and the picture says so', d.results.nail && d.results.nail.magnet === true && d.verdict === 'Attracted', d);
  gs = await guideState();
  ok('then the steel pin, glowing', /Step 3 of 5/.test(gs.text) && gs.next === 'pin', gs);
  await click('[data-guide-do]');
  await click('[data-guide-do]');
  ok('the foil is a metal but is not attracted - and inside a guide no card interrupts', (await dbg()).results.foil.magnet === false && !(await overlay()));
  let nb = await ev("[...document.querySelectorAll('#lab-notebook tr')].map(r => [...r.children].map(c => c.textContent.trim()).join(' ')).join(' | ')");
  ok('the notebook table has the nail “attracted” and the foil “not attracted”', /Iron nail attracted/.test(nb) && /Aluminium foil not attracted/.test(nb), nb.slice(0, 300));
  await click('[data-guide-do]');
  ov = await overlay();
  ok('the wooden block completes it, with “What you found out”', ov && /Experiment complete/.test(ov.text) && /What you found out/.test(ov.text) && /Only iron and steel/.test(ov.text), ov);
  ok('…remembered, and offers the next one', await ev("!!Labs.store('materials').guides.magnet") && /Next: Torch test/.test(ov.text));
  await closeOv();

  // ── Read aloud ─────────────────────────────────
  console.log('\n-- read aloud');
  const coachText = await ev("document.getElementById('lab-coach-text').textContent");
  await click('[data-act="say-coach"]');
  sp = await speech();
  const last = sp.spoken[sp.spoken.length - 1];
  ok('🔊 on the lab assistant reads its words aloud (emoji left out)', last && last.text.length > 5 && coachText.includes(last.text.slice(0, 12)) && !/[\u{1F300}-\u{1FAFF}]/u.test(last.text), { coachText, last });
  const c1 = sp.cancels;
  await click('.lab-materials [data-act="help"]');
  ok('opening an overlay cancels the speech', (await speech()).cancels > c1);
  ok('the help card explains every science word', /Transparent/.test((await overlay()).text) && /Absorbent/.test((await overlay()).text));
  await closeOv();

  const runGuide = () => ev(`(() => { for (let k = 0; k < 30 && LabMaterials._debug().guide; k++) {
      const b = document.querySelector('#lab-guide [data-guide-do]'); if (b) b.click(); else LabMaterials._tick(3); }
    const o = document.getElementById('lab-overlay'); return o ? o.textContent.replace(/\\s+/g, ' ') : 'no overlay'; })()`);
  for (const [id, re] of [['torch', /translucent/], ['bulb', /conductors/], ['water', /absorbent/], ['bend', /flexible/], ['origin', /natural/]]) {
    await ev(`LabMaterials.startGuide('${id}'); true`);
    const txt = await runGuide();
    ok(`guided experiment “${id}” runs to the end`, /Experiment complete/.test(txt) && re.test(txt), txt.slice(0, 160));
    await closeOv();
  }
  d = await dbg();
  ok('…having measured glass transparent, frosted translucent, wood opaque (lights off)', d.results.glass.torch === 'transparent' && d.results.frosted.torch === 'translucent' && d.results.wood.torch === 'opaque' && d.lights === false, d.results);
  ok('…the copper and pencil lead conduct, the plastic does not', d.results.copper.circuit === true && d.results.lead.circuit === true && d.results.bottle.circuit === false);
  ok('…cork floats, stone sinks, sponge absorbent, rubber waterproof', d.results.cork.bowl === 'floats' && d.results.stone.bowl === 'sinks' && d.results.sponge.drop === 'absorbent' && d.results.ball.drop === 'waterproof');
  ok('all guided experiments are ticked off on the start panel', (await ev("document.querySelectorAll('.lab-start .lab-start-card.is-done').length")) === await ev('LabMaterialsData.GUIDES.length'));

  // ── Mistakes that teach ────────────────────────
  console.log('\n-- mistakes');
  await station('magnet'); await tray('copper');
  ov = await overlay();
  ok('a metal that does not stick (copper), outside a guide: “All metals stick to a magnet? No!” card',
     ov && /is-result/.test(ov.cls) && /All metals stick to a magnet\? No!/.test(ov.text) && /Only iron and steel/.test(ov.text) && /What you should have done/.test(ov.text), ov);
  await closeOv();
  await station('torch');
  await click('[data-act="lights"]');
  ok('the room lights are back on, and a chip says so', (await dbg()).lights === true && /Room lights on/.test(await ev("document.getElementById('lab-materials-status').textContent")));
  await tray('paper');
  ov = await overlay();
  ok('torch test with the lights on: “The room lights were on” card - an unfair test', ov && /is-result/.test(ov.cls) && /room lights were on/.test(ov.text) && /fair test/.test(ov.text), ov);
  await closeOv();
  ok('…and the unfair result is NOT recorded', !((await dbg()).results.paper || {}).hasOwnProperty('torch'));
  await click('[data-act="lights"]'); await tray('paper');
  d = await dbg();
  ok('lights off, test again: tracing paper is translucent', d.results.paper.torch === 'translucent' && d.verdict === 'Translucent', d.verdict);
  await station('circuit');
  await click('[data-power="socket"]');
  ov = await overlay();
  ok('choosing the wall socket: ELECTRIC SHOCK hazard card - mains electricity can kill', ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Electric shock') && /kill/.test(ov.text), ov);
  ok('…which says what happened, why, what to do instead and the exam point',
     ov && /What happened/.test(ov.text) && /Why it’s dangerous/.test(ov.text) && /Do this instead/.test(ov.text) && /PSAC 2025 Q6c/.test(ov.text));
  await closeOv();
  ok('…the tester is back on the battery, and the hazard is counted', (await dbg()).power === 'battery' && await ev("Labs.store('materials').hazards.mains >= 1"));
  await station('bend'); await tray('glass');
  ov = await overlay();
  ok('trying to bend the glass tile: it cracks - HARMFUL hazard card, “tell an adult”', ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Harmful') && /Glass breaks/.test(ov.text) && /tell an adult/.test(ov.text), ov);
  await closeOv();
  ok('…and glass is recorded as rigid', (await dbg()).results.glass.bend === 'rigid');
  await tray('cork');
  ok('the cork: the bend test honestly says it cannot bend-test it', /too short and thick/.test(await ev("document.getElementById('lab-coach-text').textContent")) && (await dbg()).results.cork.bend === null);

  // ── Sort it and jobs ────────────────────────────
  console.log('\n-- sort it, and the right material for the job');
  await click('[data-panel="sandbox"]');
  await click('[data-sort="magnetic"]');
  const cols = await ev("[...document.querySelectorAll('.lab-materials-col')].map(c => c.textContent.replace(/\\s+/g, ' '))");
  ok('the sorting board fills from the tests: nail and pin under “Attracted”, foil and copper under “Not attracted”',
     /Attracted.*Iron nail.*Steel pin/.test(cols[0]) && /Not attracted.*Aluminium foil.*Copper wire/.test(cols[1]), cols);
  await click('[data-untested="towel"]');
  ov = await overlay();
  ok('an untested object asks: test it, or put it in a group yourself', ov && /Where does the cotton towel go/.test(ov.text) && /Test it/.test(ov.text), ov);
  await click('#lab-overlay [data-guess^="magnetic|towel|"]');
  ov = await overlay();
  ok('guessing without testing: “You guessed without testing” card', ov && /is-result/.test(ov.cls) && /guessed without testing/.test(ov.text), ov);
  await closeOv();
  ok('…and the guess is not a result', !((await dbg()).results.towel || {}).hasOwnProperty('magnet'));
  await click('[data-untested="towel"]');
  await click('#lab-overlay [data-test-first="magnetic|towel"]');
  d = await dbg();
  ok('“Test it” goes to the magnet and tests the towel: not attracted', d.station === 'magnet' && d.results.towel.magnet === false, d.results.towel);
  await click('[data-panel="sandbox"]');
  await click('#lab-panel [data-job="window"]');
  await click('#lab-overlay [data-job-pick="window|wood"]');
  ok('a job, wrong pick: “Wood is opaque. A window must be transparent.”', /Wood is opaque\. A window must be transparent\./.test((await overlay()).text));
  await click('#lab-overlay [data-job-pick="window|glass"]');
  ov = await overlay();
  ok('…right pick: glass, because it is transparent - saved, and the next job is offered', /Yes!/.test(ov.text) && /transparent/.test(ov.text) && await ev("!!Labs.store('materials').jobs.window") && /Next job/.test(ov.text), ov);
  await closeOv();

  // ── Missions ───────────────────────────────────
  console.log('\n-- missions');
  const answerAll = id => ev(`(() => {
    const qs = LabMaterialsData.MISSIONS.find(m => m.id === '${id}').quiz;
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
  await ev("LabMaterials.startMission('magnet_hunt'); true");
  ok('Magnet hunt puts the magnet on the bench', (await dbg()).station === 'magnet');
  for (const id of ['nail', 'pin', 'foil', 'copper', 'wood']) await tray(id);
  ok('four metals and one other thing are not enough', !(await dbg()).mission.success);
  await tray('stone');
  d = await dbg();
  ok('…the second non-metal completes it', d.mission.success && d.mission.tested.length === 6 && !d.mission.mistakes, d.mission);
  ok('the mission panel ticks every requirement', await ev("document.querySelectorAll('#lab-mission .lab-steps li.is-done').length === 2"));
  await click('[data-act="quiz"]');
  ok('Magnet hunt: all answers right, no mistakes: 3 stars', (await answerAll('magnet_hunt')) === '3 of 3 stars');
  ok('the stars are saved', await ev("Labs.store('materials').missions.magnet_hunt.stars === 3"));
  await closeOv();

  await ev("LabMaterials.startMission('bulb'); true");
  await click('[data-power="socket"]'); await closeOv();
  for (const id of ['lead', 'copper', 'bottle', 'wood', 'nail', 'ball']) await tray(id);
  ok('Bulb on, bulb off: six things including the pencil lead complete it', (await dbg()).mission.success);
  await click('[data-act="quiz"]');
  ok('…but the wall socket during the mission costs a star: 2 stars', (await answerAll('bulb')) === '2 of 3 stars' && await ev("Labs.store('materials').missions.bulb.stars === 2"));
  await closeOv();
  await ev("LabMaterials.startMission('bulb'); true");
  for (const id of ['lead', 'copper', 'bottle', 'wood', 'nail', 'ball']) await tray(id);
  await click('[data-act="quiz"]');
  ok('done safely: 3 stars, and the best is kept', (await answerAll('bulb')) === '3 of 3 stars' && await ev("Labs.store('materials').missions.bulb.stars === 3"));
  await closeOv();

  await ev("LabMaterials.startMission('right_job'); true");
  ok('Pick the right material shows the jobs in the mission panel', await ev("document.querySelectorAll('#lab-panel [data-job]').length >= 5"));
  await click('#lab-panel [data-job="umbrella"]');
  await click('#lab-overlay [data-job-pick="umbrella|bottle"]');
  await closeOv();
  for (const j of ['cable', 'pot', 'net', 'recycle']) await ev(`LabMaterials.pickJob('${j}', LabMaterialsData.JOBS.find(x => x.id === '${j}').choices[0]); true`);
  d = await dbg();
  ok('five jobs right complete it', d.mission.success && d.mission.jobs.length === 5, d.mission);
  await click('[data-act="quiz"]');
  ok('Pick the right material: 3 stars', (await answerAll('right_job')) === '3 of 3 stars');
  await closeOv();

  // ── Discoveries ────────────────────────────────
  console.log('\n-- discoveries');
  await click('[data-panel="found"]');
  ok('the Discoveries tab lists every card, with many already found',
     await ev("document.querySelectorAll('.lab-found-card').length === LabMaterialsData.DISCOVERIES.length && document.querySelectorAll('.lab-found-card.is-found').length >= 10"));
  await click('.lab-found-card.is-found[data-disc="magnet_pull"]');
  ov = await overlay();
  ok('a found card: what you saw, the rule, why it matters, “Do it again”',
     ov && /What you saw/.test(ov.text) && /iron and steel → attracted/.test(ov.text) && /Why it matters/.test(ov.text) && /Do it again/.test(ov.text), ov);
  await closeOv();
  await ev("delete Labs.store('materials').disc.natural; true");
  await click('[data-panel="sandbox"]'); await click('[data-panel="found"]');
  await click('.lab-found-card[data-disc="natural"]');
  ov = await overlay();
  ok('a locked card: the clue, “How to find it” and “Show me how”', ov && /Locked discovery/.test(ov.text) && /How to find it/.test(ov.text) && /Show me how/.test(ov.text), ov);
  await click('#lab-overlay [data-disc-go]');
  ok('“Show me how” starts a guide from its recipe', ((await dbg()).guide || {}).id === 'disc-natural');
  await ev("document.querySelector('[data-act=\"guide-stop\"]').click(); true");

  const discIds = await ev('LabMaterialsData.DISCOVERIES.map(d => d.id)');
  const unsolved = [];
  for (const id of discIds) {
    const res = await ev(`(() => {
      const st = Labs.store('materials'); delete st.disc['${id}'];
      document.getElementById('lab-overlay')?.remove();
      LabMaterials.discoveryGuide('${id}');
      for (let k = 0; k < 24 && LabMaterials._debug().guide; k++) {
        const hz = document.querySelector('#lab-overlay.is-hazard, #lab-overlay.is-result');
        if (hz) return 'card: ' + hz.textContent.replace(/\\s+/g, ' ').slice(0, 90);
        const btn = document.querySelector('#lab-guide [data-guide-do]');
        if (btn) btn.click(); else LabMaterials._tick(3);
      }
      if (LabMaterials._debug().guide) return 'guide never finished at step ' + LabMaterials._debug().guide.step;
      document.getElementById('lab-overlay')?.remove();
      return !!st.disc['${id}'];
    })()`);
    if (res !== true) unsolved.push(id + ' → ' + res);
  }
  ok(`all ${discIds.length} discoveries unlock by following their own “Show me how”`, unsolved.length === 0, unsolved);
  const cnt = await ev("({ shown: document.getElementById('lab-found-n').textContent, saved: Object.keys(Labs.store('materials').disc).length + '/' + LabMaterialsData.DISCOVERIES.length })");
  ok('the ✨ counter matches what is saved', cnt.shown === cnt.saved, cnt);

  // ── Motion, calm, phone ─────────────────────────
  console.log('\n-- motion, calm, phone');
  await ev("LabMaterials._test({ instant: false }); true");
  await click('[data-panel="sandbox"]');
  await station('magnet'); await tray('nail');
  const t0 = (await dbg()).scene;
  await sleep(1900);
  const t1 = await dbg();
  ok('with animation on, the test plays out over time (the loop is running) and ends “Attracted”', t0.t < 1 && t1.scene.t === 1 && t1.verdict === 'Attracted' && !t1.busy, { t0, t1: t1.scene });
  ok('the canvas has drawn the bench', await ev("(() => { const c = document.getElementById('lab-materials-canvas'); const p = c.getContext('2d').getImageData(c.width / 2, c.height / 2, 1, 1).data; return p[3] > 0; })()"));
  await ev("document.documentElement.classList.add('kid-calm'); true");
  await station('bowl'); await tray('stone');
  d = await dbg();
  ok('in Calm Mode a test shows its result at once', d.scene.t === 1 && d.verdict === 'Sinks' && !d.busy, d.scene);
  await station('circuit'); await click('[data-power="socket"]');
  ov = await overlay();
  ok('in Calm Mode a hazard stops the test at once (no flash first)', ov && ov.signs.includes('Electric shock'), ov);
  await closeOv();
  await ev("document.documentElement.classList.remove('kid-calm'); LabMaterials._test({ instant: true }); true");

  const fitIssues = [];
  for (const st of await ev('LabMaterialsData.STATIONS.map(s => s.id)')) {
    await station(st);
    const fit = await ev(`(() => { const vw = innerWidth;
      const off = [...document.querySelectorAll('#labs-root button, #labs-root canvas')]
        .filter(e => e.getClientRects().length && e.getBoundingClientRect().right > vw + 0.5)
        .map(e => (e.getAttribute('data-station') || e.getAttribute('data-obj') || e.getAttribute('data-act') || e.getAttribute('data-panel') || e.tagName) + ' → ' + Math.round(e.getBoundingClientRect().right));
      const small = [...document.querySelectorAll('#labs-root .lab-materials-controls button, #labs-root .lab-top button, #labs-root .lab-coach button, #labs-root .lab-materials-sortpick button, #labs-root .lab-start button')]
        .filter(e => e.getClientRects().length && e.getBoundingClientRect().height < 43.5).map(e => e.textContent.trim().slice(0, 20));
      return { vw, root: document.getElementById('labs-root').scrollWidth, off, small }; })()`);
    if (!(fit.root <= fit.vw && fit.off.length === 0 && fit.small.length === 0)) fitIssues.push({ st, fit });
  }
  ok('every station fits a 360px phone - no control past the edge, tap targets ≥ 44px', fitIssues.length === 0, fitIssues);

  await click('[data-act="say-coach"]');
  const c2 = (await speech()).cancels;
  await ev("showScreen('student-home'); true");
  await sleep(400);
  ok('leaving the Labs screen cancels the speech', (await speech()).cancels > c2);
  await ev("showScreen('labs'); true");
  await sleep(400);
  await click('[data-act="say-coach"]');
  const c3 = (await speech()).cancels;
  await ev("Labs.backToHub(); true");
  ok('closing the lab (unmount) cancels the speech', (await speech()).cancels > c3);
  await ev("showScreen('student-home'); true");
  ok('no page errors along the way', errors.length === 0, errors.slice(0, 5));

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  await shutdown(failed ? 1 : 0);
})().catch(e => { console.error(e); shutdown(1); });
