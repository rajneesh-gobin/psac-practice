'use strict';
// Science Labs › Air & Burning (PSAC Grades 4 and 6), driven in a real browser.
//
// Opens the lab at Grade 4, Grade 6 and Grade 5 and proves each grade sees
// only its own stations, guides, missions and discoveries. At each grade:
// the welcome and the start panel, every guided experiment to the end, every
// discovery unlocking by following its own "Show me how", every hazard and
// "what went wrong" card, missions to three stars (and a hazard costing one),
// read-aloud only on a tap and cancelled on a step change, an overlay, a
// screen change and unmount, the loop restarting when the Labs screen comes
// back, Calm Mode, and a 360px phone with 44px tap targets.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-air.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
// ⚠ Debugging port 9413 - the other lab builds use their own ports.
// ⚠ One Chrome, killed and its profile deleted on EVERY exit (pass, fail,
//   crash or Ctrl+C). LAB_PROFILE_DIR chooses where the throwaway profile goes.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9413;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0, d;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail).slice(0, 900) : '')); } };

const profileRoot = process.env.LAB_PROFILE_DIR || os.tmpdir();
fs.mkdirSync(profileRoot, { recursive: true });
const profile = fs.mkdtempSync(path.join(profileRoot, 'psac-labs-air-'));
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
  const tok = t => click(`#labs-root [data-tok="${t}"]`);
  const toks = async list => { for (const t of list) { const r = await tok(t); if (r !== true) return r; } return true; };
  const dbg = () => ev('LabAir._debug()');
  const overlay = () => ev(`(() => { const o = document.getElementById('lab-overlay'); if (!o) return null;
    return { cls: o.className, text: o.textContent.replace(/\\s+/g, ' ').slice(0, 3000),
             signs: [...o.querySelectorAll('.lab-sign figcaption')].map(f => f.textContent) }; })()`);
  const closeOv = () => click('#lab-overlay [data-ov-close]');
  const speech = () => ev('({ spoken: window.__speech.spoken.slice(), cancels: window.__speech.cancels })');
  const gids = (list, g) => ev(`LabAirData.${list}.filter(x => x.grades.includes(${g})).map(x => x.id)`);

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

  const labScripts = () => ev("[...document.scripts].map(s => s.src).filter(s => /engine\\/labs\\//.test(s)).map(s => s.split('/').pop()).join()");
  // Open the lab as a pupil of `grade` would: pick the grade, open Labs, back to the hub, open the lab.
  async function openAt(grade) {
    await ev(`SELECTED_GRADE = ${grade}; showScreen('labs'); true`);
    let hub = false;
    for (let i = 0; i < 40 && !hub; i++) { await sleep(250); hub = await ev("typeof window.Labs !== 'undefined' && !!document.getElementById('labs-root')"); }
    await ev('Labs.backToHub(); true');
    await ev("Labs.openLab('air'); true");
    let up = false;
    for (let i = 0; i < 60 && !up; i++) { await sleep(200); up = await ev("typeof window.LabAir !== 'undefined' && !!document.querySelector('#labs-root .lab-air')"); }
    await sleep(300);
    return hub && up;
  }
  const answerAll = id => ev(`(() => {
    const qs = LabAirData.MISSIONS.find(m => m.id === '${id}').quiz;
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
  const runGuide = () => ev(`(() => { for (let k = 0; k < 60 && LabAir._debug().guide; k++) {
      const hz = document.querySelector('#lab-overlay.is-hazard, #lab-overlay.is-result');
      if (hz) return 'card: ' + hz.textContent.replace(/\\s+/g, ' ').slice(0, 120);
      const b = document.querySelector('#lab-guide [data-guide-do]'); if (b) b.click(); else LabAir._tick(3); }
    const o = document.getElementById('lab-overlay'); return o ? o.textContent.replace(/\\s+/g, ' ') : 'no overlay'; })()`);
  const allDiscoveries = g => ev(`(() => {
    const ids = LabAirData.DISCOVERIES.filter(d => d.grades.includes(${g})).map(d => d.id), bad = [];
    for (const id of ids) {
      const st = Labs.store('air'); delete st.disc[id];
      document.getElementById('lab-overlay')?.remove();
      LabAir.discoveryGuide(id);
      let res = null;
      for (let k = 0; k < 40 && LabAir._debug().guide; k++) {
        const hz = document.querySelector('#lab-overlay.is-hazard, #lab-overlay.is-result');
        if (hz) { res = 'card: ' + hz.textContent.replace(/\\s+/g, ' ').slice(0, 90); break; }
        const btn = document.querySelector('#lab-guide [data-guide-do]');
        if (btn) btn.click(); else LabAir._tick(3);
      }
      if (!res && LabAir._debug().guide) res = 'guide never finished at step ' + LabAir._debug().guide.step;
      document.getElementById('lab-overlay')?.remove();
      if (!res && !st.disc[id]) res = 'not unlocked';
      if (res) bad.push(id + ' → ' + res);
    }
    return { n: ids.length, bad };
  })()`);
  const fit = () => ev(`(() => { const vw = innerWidth;
    const off = [...document.querySelectorAll('#labs-root button, #labs-root canvas')]
      .filter(e => e.getClientRects().length && e.getBoundingClientRect().right > vw + 0.5)
      .map(e => (e.getAttribute('data-tok') || e.getAttribute('data-act') || e.getAttribute('data-panel') || e.tagName) + ' → ' + Math.round(e.getBoundingClientRect().right));
    const small = [...document.querySelectorAll('#labs-root .lab-air-controls button, #labs-root .lab-top button, #labs-root .lab-coach button, #labs-root .lab-start button, #labs-root #lab-guide [data-guide-do]')]
      .filter(e => e.getClientRects().length && e.getBoundingClientRect().height < 43.5).map(e => e.textContent.trim().slice(0, 24));
    return { vw, root: document.getElementById('labs-root').scrollWidth, off, small }; })()`);

  // ════════ Grade 4 ════════
  console.log('\n-- Grade 4: opening Air & Burning');
  await ev("SELECTED_GRADE = 4; showScreen('labs'); true");
  await sleep(1200);
  ok('no Air & Burning code before it is opened', !/lab_air/.test(await labScripts()), await labScripts());
  ok('Grade 4: the lab loads and renders', await openAt(4));
  ok('it fetched its own data file, then the bench', /lab_air_data\.js,lab_air\.js/.test(await labScripts()), await labScripts());
  ok('lab_air.css is linked and styles the controls', await ev("!!document.querySelector('link[data-lab-css=\"air\"]') && getComputedStyle(document.querySelector('.lab-air-controls')).display === 'flex'"));
  ok('Labs.grade() is 4, and the eyebrow says “Science · Grade 4”', await ev("Labs.grade() === 4 && /Science · Grade 4/.test(document.querySelector('.lab-air .lab-eyebrow').textContent)"));
  let ov = await overlay();
  ok('first visit shows the welcome card with “Show me how”', ov && /Welcome to Air & Burning/.test(ov.text) && /Show me how/.test(ov.text), ov);
  ok('nothing was read aloud on its own (no auto-play)', (await speech()).spoken.length === 0);
  await closeOv();
  ok('the welcome is remembered', await ev("Labs.store('air').intro === true"));
  ok('top bar: back, the hair-tie safety toggle and help',
     await ev("!!document.querySelector('.lab-air [data-act=\"hub\"]') && !!document.querySelector('.lab-air [data-act=\"help\"]') && document.getElementById('lab-air-safety').dataset.tok === 'safety:on'"));
  ok('the lab assistant has a 🔊 read-aloud button and a 💡 fact button',
     await ev("!!document.querySelector('.lab-coach [data-act=\"say-coach\"]') && !!document.querySelector('.lab-coach [data-act=\"tip\"]')"));
  ok('Grade 4 stations only: candle & jars, glass in water, balloon balance',
     (await ev("[...document.querySelectorAll('.lab-air-stations [data-tok]')].map(b => b.dataset.tok).join()")) === 'station:jars,station:space,station:weight');
  const g4g = await gids('GUIDES', 4), g6g = await gids('GUIDES', 6), g4m = await gids('MISSIONS', 4), g6m = await gids('MISSIONS', 6);
  const startIds = () => ev("({ g: [...document.querySelectorAll('.lab-start [data-guide]')].map(b => b.dataset.guide), m: [...document.querySelectorAll('.lab-start [data-mission]')].map(b => b.dataset.mission) })");
  let sp0 = await startIds();
  ok('the Bench tab opens with “What would you like to do?” and the Grade 4 guided experiments and missions - and none of Grade 6',
     await ev("/What would you like to do/.test(document.querySelector('.lab-start').textContent)") && sp0.g.join() === g4g.join() && sp0.m.join() === g4m.join() && g4g.length >= 3 && g4m.length >= 2
     && !sp0.g.some(x => g6g.includes(x)) && !sp0.m.some(x => g6m.includes(x)), sp0);
  await ev('LabAir._test({ instant: true }); true');

  console.log('\n-- Grade 4: a guided experiment end to end');
  const guideState = () => ev(`(() => { const g = document.getElementById('lab-guide'), n = document.querySelector('.is-next');
    return { box: !g.hidden, text: g.textContent.replace(/\\s+/g, ' '), next: n ? (n.getAttribute('data-tok') || n.id) : null, start: !!document.querySelector('.lab-start') }; })()`);
  await click('.lab-start [data-guide="jars"]');
  let gs = await guideState();
  ok('Candle under a jar: Candle & jars is already chosen, so it opens at the hair tie - which glows', gs.box && /Step 2 of/.test(gs.text) && /Tie your hair back/.test(gs.text) && gs.next === 'safety:on' && !gs.start, gs);
  await click('#lab-guide [data-act="say-guide"]');
  let sp = await speech();
  ok('🔊 on the guide box reads the step aloud, in English', sp.spoken.length === 1 && sp.spoken[0].text === 'Tie your hair back and roll up your sleeves.' && /^en/.test(sp.spoken[0].lang), sp);
  const c0 = sp.cancels;
  await click('[data-guide-do]');
  ok('…and the next step cancels the speech', (await speech()).cancels > c0);
  gs = await guideState();
  ok('hair tied: the next step asks the teacher to light the candle, and that button glows', /light the candle/.test(gs.text) && gs.next === 'light' && (await dbg()).state.safety === true, gs);
  let txt = await runGuide();
  ok('the guide runs to “Experiment complete” with what they found out', /Experiment complete/.test(txt) && /small jar/.test(txt) && /oxygen/.test(txt), txt.slice(0, 200));
  d = await dbg();
  ok('…having timed the small jar at 6 s and the large jar at 24 s, the same candle', d.runs.map(r => `${r.jar}:${r.measured}:${r.candle}`).join() === 'small:6:small,large:24:small', d.runs);
  let nb = await ev("[...document.querySelectorAll('#lab-notebook tr')].map(r => [...r.children].map(c => c.textContent.trim()).join(' ')).join(' | ')");
  ok('the notebook table lists both jars with their times', /Small jar Small candle 6 s ✓/.test(nb) && /Large jar Small candle 24 s ✓/.test(nb), nb);
  ok('…remembered, and it offers the next one', await ev("!!Labs.store('air').guides.jars") && /Next:/.test(txt));
  await closeOv();

  console.log('\n-- Grade 4: read aloud');
  const coachText = await ev("document.getElementById('lab-coach-text').textContent");
  await click('[data-act="say-coach"]');
  sp = await speech();
  const last = sp.spoken[sp.spoken.length - 1];
  ok('🔊 on the lab assistant reads its words aloud (emoji left out)', last && last.text.length > 5 && coachText.includes(last.text.slice(0, 12)) && !/[\u{1F300}-\u{1FAFF}]/u.test(last.text), { coachText, last });
  const c1 = sp.cancels;
  await click('.lab-air [data-act="help"]');
  ok('opening an overlay cancels the speech', (await speech()).cancels > c1);
  ov = await overlay();
  ok('the Grade 4 help card explains its science words (and not Grade 6 ones)', /Fair test/.test(ov.text) && /Takes up space/.test(ov.text) && !/Limewater/.test(ov.text), ov.text.slice(0, 300));
  await closeOv();

  for (const [id, re] of [['space', /Air takes up space/], ['weight', /Air has weight/], ['candles', /bigger flame/]]) {
    await ev(`LabAir.startGuide('${id}'); true`);
    txt = await runGuide();
    ok(`Grade 4 guided experiment “${id}” runs to the end`, /Experiment complete/.test(txt) && re.test(txt), txt.slice(0, 160));
    await closeOv();
  }
  ok('all Grade 4 guided experiments are ticked off on the start panel', (await ev("document.querySelectorAll('.lab-start .lab-start-card.is-done').length")) === g4g.length);

  console.log('\n-- Grade 4: mistakes');
  await toks(['station:jars', 'safety:off']);
  await tok('light');
  ov = await overlay();
  ok('loose hair near the flame: a HOT + CAUTION hazard card, “only an adult lights the candle”',
     ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Hot surface') && ov.signs.includes('Caution') && /Tie your hair back/.test(ov.text) && /adult/.test(ov.text), ov);
  ok('…with what happened, why, what to do instead and “📝 In the PSAC exam”',
     ov && /What happened/.test(ov.text) && /Why it’s dangerous/.test(ov.text) && /Do this instead/.test(ov.text) && /In the PSAC exam/.test(ov.text));
  await closeOv();
  ok('…and the candle was not lit', (await dbg()).state.lit === false);
  await toks(['safety:on', 'jar:small', 'candle:small', 'light', 'watch:ready', 'burn']);
  d = await dbg();
  ok('a fair run: the jar is on and hot, the flame out at 6 s', d.state.jarOn && d.state.hot && d.verdict === 'Out at 6 s', d.verdict);
  ok('the jar controls offer: let it cool, lift it now, cool it under the tap', await ev("['reset','lift','tap'].every(t => !!document.querySelector('#lab-air-controls [data-tok=\"' + t + '\"]'))"));
  await tok('lift');
  ov = await overlay();
  ok('grabbing the hot jar: a HOT SURFACE hazard card', ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Hot surface') && /The jar is hot/.test(ov.text), ov);
  await closeOv();
  await tok('tap');
  ov = await overlay();
  ok('cooling it under the cold tap: the jar cracks - a SHARP hazard card, “tell an adult”', ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Sharp - can cut') && /tell an adult/.test(ov.text), ov);
  await closeOv();
  ok('…and a new jar is ready', (await dbg()).state.jarOn === false);
  await tok('light'); await tok('burn');
  ov = await overlay();
  ok('no stopwatch ready: “You started timing late” - it showed 4 s, not 6 s', ov && /is-result/.test(ov.cls) && /started timing late/.test(ov.text) && /showed 4 s, not 6 s/.test(ov.text), ov);
  await closeOv();
  ok('…the notebook marks it “started late”', /started late/.test(await ev("document.getElementById('lab-notebook').textContent")));
  await toks(['jar:large', 'candle:big', 'light', 'watch:ready', 'burn']);
  ov = await overlay();
  ok('changing the jar AND the candle: “Not a fair test”', ov && /is-result/.test(ov.cls) && /Not a fair test/.test(ov.text) && /only one thing/.test(ov.text), ov);
  await closeOv();
  await ev('LabAir._test({ instant: false }); true');
  await toks(['reset', 'candle:small', 'jar:large', 'light', 'watch:ready', 'burn']);
  await sleep(400);
  ok('while the flame burns under the jar, “Lift the jar a little” is offered', await ev("!!document.querySelector('#lab-air-controls [data-tok=\"peek\"]')"));
  const runsBefore = (await dbg()).runs.length;
  await tok('peek');
  ov = await overlay();
  ok('lifting the jar mid-burn: “You lifted the jar” - fresh air got in', ov && /is-result/.test(ov.cls) && /You lifted the jar/.test(ov.text) && /Fresh air/.test(ov.text), ov);
  await closeOv();
  d = await dbg();
  ok('…the flame is back, nothing is on the candle, and the run is not in the notebook', d.state.lit && !d.state.jarOn && !d.busy && d.runs.length === runsBefore, { lit: d.state.lit, runs: d.runs.length, runsBefore });
  await ev('LabAir._test({ instant: true }); true');

  console.log('\n-- Grade 4: missions');
  await ev("LabAir.startMission('jar_race'); true");
  for (const j of ['small', 'medium', 'large']) await toks([`jar:${j}`, 'light', 'watch:ready', 'burn']);
  d = await dbg();
  ok('Jar race: three jars, the same candle, timed from the start - done', d.mission.success && !d.mission.mistakes && !d.mission.hazards, d.mission);
  ok('the mission panel ticks every requirement', await ev("document.querySelectorAll('#lab-mission .lab-steps li.is-done').length === 3"));
  await click('[data-act="quiz"]');
  ok('Jar race: all answers right, no mistakes: 3 stars', (await answerAll('jar_race')) === '3 of 3 stars');
  ok('the stars are saved', await ev("Labs.store('air').missions.jar_race.stars === 3"));
  await closeOv();
  await ev("LabAir.startMission('jar_race'); true");
  await toks(['jar:small', 'light', 'watch:ready', 'burn', 'tap']);
  await closeOv();
  for (const j of ['medium', 'large']) await toks([`jar:${j}`, 'light', 'watch:ready', 'burn']);
  await click('[data-act="quiz"]');
  ok('…a cracked jar during the mission costs a star: 2 stars, and the best (3) is kept', (await answerAll('jar_race')) === '2 of 3 stars' && await ev("Labs.store('air').missions.jar_race.stars === 3"));
  await closeOv();
  await ev("LabAir.startMission('air_there'); true");
  await toks(['station:space', 'push', 'tilt', 'bottle', 'station:weight', 'fill', 'letout']);
  ok('Air is really there: the glass, the bottle and the balloons complete it', (await dbg()).mission.success);
  await click('[data-act="quiz"]');
  ok('Air is really there: 3 stars', (await answerAll('air_there')) === '3 of 3 stars');
  await closeOv();

  console.log('\n-- Grade 4: discoveries');
  const g4d = await gids('DISCOVERIES', 4), g6d = await gids('DISCOVERIES', 6);
  await click('[data-panel="found"]');
  let cards = await ev("[...document.querySelectorAll('.lab-found-card')].map(b => b.dataset.disc)");
  ok(`the Discoveries tab lists the ${g4d.length} Grade 4 cards and no Grade 6 card`, cards.join() === g4d.join() && g4d.length >= 10 && !cards.some(x => g6d.includes(x)), cards);
  await click('.lab-found-card.is-found');
  ov = await overlay();
  ok('a found card: what you saw, the rule, why it happens, “Do it again”', ov && /What you saw/.test(ov.text) && /The rule/.test(ov.text) && /Why it happens/.test(ov.text) && /Do it again/.test(ov.text), ov);
  await closeOv();
  await ev("delete Labs.store('air').disc.weight_heavy; true");
  await click('[data-panel="sandbox"]'); await click('[data-panel="found"]');
  await click('.lab-found-card[data-disc="weight_heavy"]');
  ov = await overlay();
  ok('a locked card: the clue, “How to find it” and “Show me how”', ov && /Locked discovery/.test(ov.text) && /How to find it/.test(ov.text) && /Show me how/.test(ov.text), ov);
  await click('#lab-overlay [data-disc-go]');
  ok('“Show me how” starts a guide from its recipe', ((await dbg()).guide || {}).id === 'disc-weight_heavy');
  await ev("document.querySelector('[data-act=\"guide-stop\"]').click(); true");
  let all = await allDiscoveries(4);
  ok(`all ${all.n} Grade 4 discoveries unlock by following their own “Show me how”`, all.bad.length === 0 && all.n >= 10, all.bad);
  let cnt = await ev("({ shown: document.getElementById('lab-found-n').textContent, saved: LabAirData.DISCOVERIES.filter(d => d.grades.includes(4) && Labs.store('air').disc[d.id]).length + '/' + LabAirData.DISCOVERIES.filter(d => d.grades.includes(4)).length })");
  ok('the ✨ counter shows the Grade 4 count, matching what is saved', cnt.shown === cnt.saved && cnt.shown === `${g4d.length}/${g4d.length}`, cnt);

  console.log('\n-- Grade 4: motion, calm, phone');
  await ev("LabAir._test({ instant: false }); true");
  await click('[data-panel="sandbox"]');
  await toks(['station:jars']);
  await ev("(() => { const s = LabAir._debug().state; if (s.jarOn) LabAir.act('reset'); LabAir.act('candle:small'); LabAir.act('jar:small'); if (!s.safety) LabAir.act('safety:on'); if (!LabAir._debug().state.lit) LabAir.act('light'); LabAir.act('watch:ready'); return true; })()");
  await tok('burn');
  const t0 = (await dbg()).scene;
  await sleep(700);
  const mid = await ev("({ watch: document.getElementById('lab-air-status').textContent, t: LabAir._debug().scene.t })");
  await sleep(1300);
  const t1 = await dbg();
  ok('with animation on, the burn plays out over time: the stopwatch counts, then “Out at 6 s”', t0.t < 1 && mid.t > 0 && mid.t < 1 && t1.scene.t === 1 && t1.verdict === 'Out at 6 s' && !t1.busy && t1.looping, { t0, mid, t1: t1.scene });
  ok('the canvas has drawn the bench', await ev("(() => { const c = document.getElementById('lab-air-canvas'); const p = c.getContext('2d').getImageData(c.width / 2, c.height / 3, 1, 1).data; return p[3] > 0; })()"));
  await ev("document.documentElement.classList.add('kid-calm'); true");
  await toks(['jar:medium', 'light', 'watch:ready', 'burn']);
  d = await dbg();
  ok('in Calm Mode a burn shows its result at once', d.scene.t === 1 && d.verdict === 'Out at 12 s' && !d.busy, d.scene);
  await tok('safety:off'); await toks(['reset', 'light']);
  ov = await overlay();
  ok('in Calm Mode a hazard stops the test at once (no flash first)', ov && ov.signs.includes('Hot surface'), ov);
  await closeOv();
  await tok('safety:on');
  await ev("document.documentElement.classList.remove('kid-calm'); LabAir._test({ instant: true }); true");
  const fit4 = [];
  for (const st of ['jars', 'space', 'weight']) { await tok(`station:${st}`); const f = await fit(); if (!(f.root <= f.vw && !f.off.length && !f.small.length)) fit4.push({ st, f }); }
  await tok('station:jars'); await toks(['light', 'watch:ready', 'burn']);
  { const f = await fit(); if (!(f.root <= f.vw && !f.off.length && !f.small.length)) fit4.push({ st: 'jars with the jar on', f }); }
  ok('Grade 4 fits a 360px phone at every station - no control past the edge, tap targets ≥ 44px', fit4.length === 0, fit4);

  // ════════ Grade 6 ════════
  console.log('\n-- Grade 6');
  ok('Grade 6: the lab opens again', await openAt(6));
  ok('Labs.grade() is 6, and the eyebrow says “Science · Grade 6”', await ev("Labs.grade() === 6 && /Science · Grade 6/.test(document.querySelector('.lab-air .lab-eyebrow').textContent)"));
  await ev('LabAir._test({ instant: true }); true');
  if (await overlay()) await closeOv();
  ok('Grade 6 stations only: candle & jars, the fire safety yard, what burning makes',
     (await ev("[...document.querySelectorAll('.lab-air-stations [data-tok]')].map(b => b.dataset.tok).join()")) === 'station:jars,station:fire,station:products');
  sp0 = await startIds();
  ok('the start panel shows the Grade 6 guided experiments and missions - and none of Grade 4',
     sp0.g.join() === g6g.join() && sp0.m.join() === g6m.join() && g6g.length >= 3 && g6m.length >= 2 && !sp0.g.some(x => g4g.includes(x)) && !sp0.m.some(x => g4m.includes(x)), sp0);
  ok('the ✨ counter counts only Grade 6 discoveries (none found yet)', (await ev("document.getElementById('lab-found-n').textContent")) === `0/${g6d.length}`);
  await click('[data-panel="found"]');
  cards = await ev("[...document.querySelectorAll('.lab-found-card')].map(b => b.dataset.disc)");
  ok(`the Discoveries tab lists the ${g6d.length} Grade 6 cards and no Grade 4 card`, cards.join() === g6d.join() && !cards.some(x => g4d.includes(x)), cards);
  await click('[data-panel="sandbox"]');
  for (const [id, re] of [['pqrs', /S, with no jar, kept burning/], ['triangle', /took away the fuel/], ['danger', /switch off the power/], ['products', /carbon dioxide/]]) {
    await ev(`LabAir.startGuide('${id}'); true`);
    txt = await runGuide();
    ok(`Grade 6 guided experiment “${id}” runs to the end`, /Experiment complete/.test(txt) && re.test(txt), txt.slice(0, 160));
    await closeOv();
  }
  d = await dbg();
  ok('…Candles P, Q, R, S: 6, 12 and 24 s, and S still burning at 40 s', d.runs.map(r => r.measured + (r.covered ? '' : '+')).join() === '6,12,24,40+', d.runs);
  nb = await ev("document.getElementById('lab-notebook').textContent.replace(/\\s+/g, ' ')");
  ok('the Grade 6 notebook has an “Oxygen at the end” column: about 16% under a jar', /Oxygen at the end/.test(nb) && /about 16%/.test(nb) && /Jar P/.test(nb), nb.slice(0, 300));
  await toks(['station:jars', 'jar:medium', 'light', 'watch:ready', 'burn']);
  ok('the O₂ chip reads 16% when the flame has died under the jar', /O₂ 16%/.test(await ev("document.getElementById('lab-air-status').textContent")));
  await click('.lab-air [data-act="help"]');
  ov = await overlay();
  ok('the Grade 6 help card explains the fire triangle, limewater and a control', /Fire triangle/.test(ov.text) && /Limewater/.test(ov.text) && /Control/.test(ov.text) && /Never use water on burning oil/.test(ov.text), ov.text.slice(0, 200));
  await closeOv();

  console.log('\n-- Grade 6: mistakes');
  await toks(['station:fire', 'fire:oil', 'method:water']);
  ov = await overlay();
  ok('water on the burning pan of oil: FLAMMABLE + HOT hazard card - an adult covers the pan', ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Flammable') && ov.signs.includes('Hot surface') && /Never throw water on burning oil/.test(ov.text) && /adult/.test(ov.text), ov);
  await closeOv();
  await toks(['fire:elec', 'method:water']);
  ov = await overlay();
  ok('water on the electrical fire: ELECTRIC SHOCK hazard card - power off, then carbon dioxide', ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Electric shock') && /carbon dioxide extinguisher/.test(ov.text), ov);
  await closeOv();
  await toks(['station:products', 'jartemp:warm', 'light', 'hold']);
  ov = await overlay();
  ok('a warm jar over the flame: “The jar was warm” - no mist', ov && /is-result/.test(ov.cls) && /The jar was warm/.test(ov.text) && /cold, dry jar/.test(ov.text), ov);
  await closeOv();
  ok('the hazards are counted in the lab store', await ev("Labs.store('air').hazards.oil_water >= 1 && Labs.store('air').hazards.elec_water >= 1"));

  console.log('\n-- Grade 6: missions');
  await ev("LabAir.startMission('pqrs'); true");
  for (const j of ['small', 'medium', 'large', 'none']) await toks([`jar:${j}`, 'light', 'watch:ready', 'burn']);
  ok('Candles P, Q, R and S: done', (await dbg()).mission.success);
  await click('[data-act="quiz"]');
  ok('Candles P, Q, R and S: 3 stars', (await answerAll('pqrs')) === '3 of 3 stars');
  await closeOv();
  await ev("LabAir.startMission('fire_officer'); true");
  await toks(['fire:wood', 'method:water', 'fire:oil', 'method:co2']);
  ok('Fire safety officer: CO₂ on the pan of oil does not count as the safe way', !(await dbg()).mission.keys.includes('fire:oil'));
  await toks(['fire:oil', 'method:blanket', 'fire:elec', 'method:fueloff', 'method:co2']);
  ok('…the fire blanket on the oil, and power-off-then-CO₂ on the electrics, complete it', (await dbg()).mission.success);
  await click('[data-act="quiz"]');
  ok('Fire safety officer: 3 stars', (await answerAll('fire_officer')) === '3 of 3 stars');
  await closeOv();
  await ev("LabAir.startMission('burn_makes'); true");
  await toks(['jartemp:cold', 'light', 'hold', 'lime', 'control']);
  ok('What does burning make?: the mist, the milky limewater and the clear control complete it', (await dbg()).mission.success);
  await click('[data-act="quiz"]');
  ok('What does burning make?: 3 stars', (await answerAll('burn_makes')) === '3 of 3 stars' && await ev("Labs.store('air').missions.burn_makes.stars === 3"));
  await closeOv();

  console.log('\n-- Grade 6: discoveries and phone');
  all = await allDiscoveries(6);
  ok(`all ${all.n} Grade 6 discoveries unlock by following their own “Show me how”`, all.bad.length === 0 && all.n >= 10, all.bad);
  cnt = await ev("document.getElementById('lab-found-n').textContent");
  ok('the ✨ counter shows the Grade 6 count', cnt === `${g6d.length}/${g6d.length}`, cnt);
  const fit6 = [];
  for (const st of ['jars', 'fire', 'products']) { await tok(`station:${st}`); const f = await fit(); if (!(f.root <= f.vw && !f.off.length && !f.small.length)) fit6.push({ st, f }); }
  await ev("LabAir.startGuide('triangle'); true");
  { const f = await fit(); if (!(f.root <= f.vw && !f.off.length && !f.small.length)) fit6.push({ st: 'with a guide open', f }); }
  await ev("document.querySelector('[data-act=\"guide-stop\"]').click(); true");
  ok('Grade 6 fits a 360px phone at every station - no control past the edge, tap targets ≥ 44px', fit6.length === 0, fit6);

  // ════════ Grade 5 ════════
  console.log('\n-- Grade 5');
  ok('Grade 5: the lab opens', await openAt(5));
  ok('a Grade 5 pupil gets the Grade 4 level (Labs.grade() is 4, the eyebrow says Grade 4)',
     await ev("Labs.grade() === 4 && /Science · Grade 4/.test(document.querySelector('.lab-air .lab-eyebrow').textContent) && [...document.querySelectorAll('.lab-air-stations [data-tok]')].map(b => b.dataset.tok).join() === 'station:jars,station:space,station:weight'"));

  console.log('\n-- leaving and coming back');
  await click('[data-act="say-coach"]');
  const c2 = (await speech()).cancels;
  ok('…the lab knows it is speaking', (await dbg()).talking === true);
  await ev("showScreen('landing'); true");
  await sleep(400);
  const left = await ev("({ hidden: document.getElementById('screen-labs').classList.contains('hidden'), talking: LabAir._debug().talking, looping: LabAir._debug().looping })");
  ok('leaving the Labs screen cancels the speech and stops the loop', left.hidden && !left.talking && !left.looping && (await speech()).cancels > c2, left);
  await ev("showScreen('labs'); true");
  await sleep(500);
  ok('coming back to the Labs screen restarts the loop', await ev("!document.getElementById('screen-labs').classList.contains('hidden') && LabAir._debug().looping"));
  await click('[data-act="say-coach"]');
  const c3 = (await speech()).cancels;
  await ev('Labs.backToHub(); true');
  ok('closing the lab (unmount) cancels the speech', (await speech()).cancels > c3 && (await dbg()).talking === false);
  ok('progress lives in the lab store (DB.labs.air when there is a child)', await ev("!!Labs.store('air').missions.pqrs && (typeof DB === 'undefined' || !DB || !DB.labs || !!DB.labs.air)"));
  ok('no page errors along the way', errors.length === 0, errors.slice(0, 5));

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  await shutdown(failed ? 1 : 0);
})().catch(e => { console.error(e); shutdown(1); });
