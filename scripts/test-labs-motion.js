'use strict';
// Science Labs › Motion Track, driven in a real browser.
//
// Proves the lab end to end: it loads its own three files only when opened,
// lands with "What would you like to do?", all three guided experiments run
// to their end, every discovery unlocks by following its own "Show me how",
// the hazard and every result card fire and explain themselves (with the
// trolley shown falling before the card), readings fill the notebook tables,
// both missions reach three stars, the trolley and the walker really move in
// real time, Calm Mode applies everything at once, and the bench fits a 360px
// phone with no page errors.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-motion.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
// ⚠ Debugging port 9406 is this lab's; the other lab builds use 9401-9405,
//   9407 and 9408.
// ⚠ Every exit - a pass, a fail, or a thrown error - kills Chrome and removes
//   its profile, so no headless Chrome is left holding the port.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9406;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0, d;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); } };

let chrome = null, profile = null, quitting = false;
const quit = code => {
  if (quitting) return; quitting = true;
  try { if (chrome) chrome.kill(); } catch (_) {}
  setTimeout(() => { try { if (profile) fs.rmSync(profile, { recursive: true, force: true }); } catch (_) {} process.exit(code); }, 800);
};
process.on('SIGINT', () => quit(130));
process.on('uncaughtException', e => { console.error(e); quit(1); });

(async () => {
  profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-labs-motion-'));
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
  const dbg = () => ev('LabMotion._debug()');
  const overlay = () => ev(`(() => { const o = document.getElementById('lab-overlay'); if (!o) return null;
    return { cls: o.className, text: o.textContent.replace(/\\s+/g, ' ').slice(0, 3000),
             signs: [...o.querySelectorAll('.lab-sign figcaption')].map(f => f.textContent) }; })()`);
  const closeOv = () => click('#lab-overlay [data-ov-close]');
  const act = a => clicks(`#lab-motion-controls [data-act="${a}"]`);
  const set = (k, v) => clicks(`[data-set="${k}"][data-v="${v}"]`);
  const shelf = id => clicks(`[data-add="setup"][data-id="${id}"]`);
  const notebook = () => ev("[...document.querySelectorAll('#lab-notebook tr')].map(r => [...r.children].map(c => c.textContent.trim()).join(' ')).join(' | ')");
  // A clean bench, no guide or mission: start a guide and stop it (that resets the bench).
  const fresh = async () => { await ev("document.getElementById('lab-overlay')?.remove(); LabMotion.startGuide('ramp'); document.querySelector('[data-act=\"guide-stop\"]').click(); true"); };

  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof openLabs === 'function' && typeof RoleModules !== 'undefined'"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url + ', not the file we navigated to.'); quit(1); return; }
  ok('app loaded', ready === true);
  await sleep(2500);

  // ── Opening the lab ───────────────────────────
  console.log('\n-- opening the Motion Track');
  await ev("SELECTED_GRADE = 9; openLabs(); true");
  let hub = false;
  for (let i = 0; i < 40 && !hub; i++) { await sleep(250); hub = await ev("typeof Labs !== 'undefined' && !!document.querySelector('#labs-root .lab-hub')"); }
  ok('Grade 9: the Labs hub renders', hub);
  const labScripts = () => ev("[...document.scripts].map(s => s.src).filter(s => /engine\\/labs\\//.test(s)).map(s => s.split('/').pop()).join()");
  ok('no Motion Track code before it is opened', !/lab_motion/.test(await labScripts()), await labScripts());
  await ev("Labs.openLab('motion'); true");
  let up = false;
  for (let i = 0; i < 60 && !up; i++) { await sleep(200); up = await ev("typeof window.LabMotion !== 'undefined' && !!document.querySelector('#labs-root .lab-motion')"); }
  ok('Labs.openLab(\'motion\') loads LabMotion and renders the bench', up);
  ok('it fetched its own data file, then the bench', /lab_motion_data\.js,lab_motion\.js/.test(await labScripts()), await labScripts());
  await sleep(500);
  ok('lab_motion.css is linked and styles the tools', await ev("!!document.querySelector('link[data-lab-css=\"motion\"]') && getComputedStyle(document.querySelector('.lab-motion-tools')).display === 'grid'"));
  let ov = await overlay();
  ok('first visit shows the welcome card with “Show me how”', ov && /Welcome to the Motion Track/.test(ov.text) && /Show me how/.test(ov.text), ov);
  await closeOv();
  ok('the welcome is remembered', await ev("Labs.store('motion').intro === true"));
  ok('the top bar has back, the stop-block switch and help', await ev("!!document.querySelector('.lab-motion [data-act=\"hub\"]') && !!document.getElementById('lab-motion-block') && !!document.querySelector('.lab-motion [data-act=\"help\"]')"));
  await ev('LabMotion._test({ instant: true }); true');

  // ── Start panel and the guided experiments ─────
  console.log('\n-- what to do here');
  ok('the Bench tab opens with “What would you like to do?”, 3 guided experiments and 2 missions',
     await ev("/What would you like to do/.test(document.querySelector('.lab-start').textContent) && document.querySelectorAll('.lab-start [data-guide]').length === 3 && document.querySelectorAll('.lab-start [data-mission]').length === 2"));
  const guideState = () => ev(`(() => { const g = document.getElementById('lab-guide'), n = document.querySelector('.is-next');
    return { box: !g.hidden, text: g.textContent.replace(/\\s+/g, ' '),
             next: n ? (n.id || n.getAttribute('data-act') || (n.getAttribute('data-set') ? n.getAttribute('data-set') + ':' + n.getAttribute('data-v') : null) || (n.getAttribute('data-h') ? 'h' + n.getAttribute('data-h') : null) || n.getAttribute('data-route') || n.getAttribute('data-id')) : null,
             start: !!document.querySelector('.lab-start') }; })()`);
  await clicks('.lab-start [data-guide="ramp"]');
  let gs = await guideState();
  ok('Roll a trolley: ramp, stop block and 20 cm are already set, so it opens at step 4 - release - and ▶ glows',
     gs.box && /Step 4 of 6/.test(gs.text) && /Let go of the trolley/.test(gs.text) && gs.next === 'run' && !gs.start, gs);
  await clicks('[data-guide-do]');
  gs = await guideState();
  ok('the run finishes and the guide asks for the gradient, with 📐 glowing', /Step 5 of 6/.test(gs.text) && gs.next === 'gradient', gs);
  let nb = await notebook();
  ok('the light-gate table fills: 0.5 m at 1.05 s … 2.0 m at 2.11 s, 1.90 m/s', /0\.5 1\.05 0\.95/.test(nb) && /2\.0 2\.11 1\.90/.test(nb), nb.slice(0, 300));
  ok('the runs table has run 1: 20 cm, 2.11 s, average speed 0.95 m/s', /1 20 cm 2\.11 0\.95/.test(nb), nb.slice(0, 500));
  await clicks('[data-guide-do]');
  ok('the gradient reading appears under the canvas: 1.80 ÷ 2.0 = 0.90 m/s²', /gradient = 1\.80 m\/s ÷ 2\.0 s = 0\.90 m\/s²/.test(await ev("document.getElementById('lab-motion-contents').textContent")));
  gs = await guideState();
  ok('then the area, with ▦ glowing', /Step 6 of 6/.test(gs.text) && gs.next === 'area', gs);
  await clicks('[data-guide-do]');
  ov = await overlay();
  ok('the area completes it, with “What you found out”', ov && /Experiment complete/.test(ov.text) && /What you found out/.test(ov.text) && /GRADIENT/.test(ov.text), ov);
  ok('…remembered, and it offers the next one', await ev("!!Labs.store('motion').guides.ramp") && /Next: Steady speed and slowing down/.test(ov.text));
  nb = await notebook();
  ok('the runs table now has the acceleration 0.90 and the distance 2.0', /1 20 cm 2\.11 0\.95 0\.90 2\.0/.test(nb), nb.slice(0, 500));
  await clicks('#lab-overlay [data-guide="steady"]');
  gs = await guideState();
  ok('Steady speed: the first step it needs is the 2 cm runway, and ▼ Lower glows', /Set the track to 2 cm|Raise one end just 2 cm/.test(gs.text) && gs.next === 'h-1', gs);
  const runGuide = () => ev(`(() => { for (let k = 0; k < 30 && LabMotion._debug().guide; k++) {
      const c = document.querySelector('#lab-overlay.is-result [data-ov-close]'); if (c) { c.click(); continue; }
      const b = document.querySelector('#lab-guide [data-guide-do]'); if (b) b.click(); else LabMotion._tick(6); }
    const o = document.getElementById('lab-overlay'); return o ? o.textContent.replace(/\\s+/g, ' ') : 'no overlay'; })()`);
  let txt = await runGuide();
  ok('“Steady speed and slowing down” runs to the end', /Experiment complete/.test(txt) && /HORIZONTAL/.test(txt) && /DOWN/.test(txt), txt.slice(0, 200));
  d = await dbg();
  ok('…a constant 1.00 m/s on the runway, slowing to 0.77 m/s on the flat',
     d.runs.some(r => r.h === 2 && r.start === 'push' && r.t === 2 && r.vEnd === 1) && d.runs.some(r => r.h === 0 && r.start === 'push' && r.vEnd === 0.77), d.runs);
  await closeOv();
  await ev("LabMotion.startGuide('walk'); true");
  txt = await runGuide();
  ok('“Distance or displacement?” runs to the end', /Experiment complete/.test(txt) && /displacement/.test(txt), txt.slice(0, 200));
  nb = await notebook();
  ok('the routes table: there and back 80 m / 0.0 m; round the corner 70 m / 50 m at 53° east of north',
     /There and back 80\.0 0\.0 m 40 2\.00 0\.00/.test(nb) && /Round the corner 70\.0 50\.0 m 53° east of north 35 2\.00 1\.43/.test(nb), nb.slice(0, 600));
  ok('the displacement arrow is drawn: the reading says 50.0 m', /displacement 50\.0 m 53° east of north/.test(await ev("document.getElementById('lab-motion-contents').textContent")));
  await closeOv();
  ok('all three guides are ticked off on the start panel', (await ev("document.querySelectorAll('.lab-start .lab-start-card.is-done').length")) === 3);

  // ── Controls ────────────────────────────────────
  console.log('\n-- controls');
  await fresh();
  await clicks('[data-h="1"]');
  ok('▲ Raise steps the ramp 20 → 30 cm', (await dbg()).h === 30);
  await clicks('[data-h="-1"]', '[data-h="-1"]', '[data-h="-1"]');
  ok('▼ Lower steps it 30 → 20 → 10 → 2 cm (the friction-compensated runway)', (await dbg()).h === 2 && /cancels friction/.test(await ev("document.querySelector('.lab-motion-hval').textContent")));
  await set('start', 'push'); await set('timer', 'stopwatch'); await set('meaning', 'speed');
  d = await dbg();
  ok('the Start / Timing / Gradient-means choices set the bench', d.start === 'push' && d.timer === 'stopwatch' && d.meaning === 'speed', d);
  ok('…and the warning chips say so', /Timed by hand/.test(await ev("document.getElementById('lab-motion-status').textContent")) && /Gradient read as a speed/.test(await ev("document.getElementById('lab-motion-status').textContent")));
  await fresh();

  // ── Mistakes that teach ────────────────────────
  console.log('\n-- mistakes');
  await set('timer', 'stopwatch');
  await act('run');
  ov = await overlay();
  ok('timing by hand: “started the stopwatch late” card, with the hand time and the 2.11 s gate time',
     ov && /is-result/.test(ov.cls) && /started the stopwatch late/.test(ov.text) && /1\.86 s/.test(ov.text) && /2\.11 s/.test(ov.text) && /What you should have done/.test(ov.text) && /On the NCE paper/.test(ov.text), ov);
  await closeOv();
  ok('…and the hand-timed row stays in the table, struck through', await ev("!!document.querySelector('.lab-motion-bad-row')") && /1\.86 ⏱️/.test(await notebook()));
  await set('timer', 'gates'); await set('meaning', 'speed');
  await act('run'); await act('gradient');
  ov = await overlay();
  ok('calling the gradient a speed: “The gradient is not the speed” card, 1.80 ÷ 2.0 = 0.90 and the real speed 1.90 m/s',
     ov && /is-result/.test(ov.cls) && /gradient is not the speed/.test(ov.text) && /1\.80 ÷ 2\.0 = 0\.90/.test(ov.text) && /1\.90 m\/s/.test(ov.text), ov);
  await closeOv();
  ok('…the canvas reading and the table both show it as wrong', /0\.90 m\/s ✗/.test(await ev("document.getElementById('lab-motion-contents').textContent")) && /0\.90 m\/s ✗/.test(await notebook()));
  await set('meaning', 'accel');
  await shelf('walk'); await clicks('[data-route="corner"]'); await set('disp', 'path');
  await act('walk');
  ov = await overlay();
  ok('measuring displacement along the path: “That is the distance, not the displacement” card, 70.0 m vs 50.0 m',
     ov && /is-result/.test(ov.cls) && /distance, not the displacement/.test(ov.text) && /70\.0 m/.test(ov.text) && /50\.0 m/.test(ov.text), ov);
  await closeOv();
  await set('disp', 'straight');
  await shelf('ramp');
  await clicks('#lab-motion-block');
  ok('with the stop block off the top chip turns to a danger warning', /No stop block/.test(await ev("document.getElementById('lab-motion-status').textContent")) && !(await dbg()).block);
  await act('run');
  ov = await overlay();
  ok('running with no stop block: HAZARD card, the trolley came off the end at 1.9 m/s',
     ov && /is-hazard/.test(ov.cls) && ov.signs.length >= 1 && /came off the end/.test(ov.text) && /1\.9 m\/s/.test(ov.text), ov);
  ok('…which says what happened, why, what to do instead and the exam point',
     ov && /What happened/.test(ov.text) && /Why it’s dangerous/.test(ov.text) && /Do this instead/.test(ov.text) && /On the NCE paper/.test(ov.text));
  await closeOv();
  ok('…the hazard is counted, and the run is not recorded as a result', await ev("Labs.store('motion').hazards.no_block >= 1") && !(await dbg()).last);
  await clicks('#lab-motion-block');

  // ── Missions ───────────────────────────────────
  console.log('\n-- missions');
  const answerAll = idx => ev(`(() => {
    const qs = LabMotionData.MISSIONS[${idx}].quiz;
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
  const accelRuns = async () => {
    for (const h of [10, 40]) { await ev(`LabMotion.setHeight(${h}); true`); await act('run'); await act('gradient'); }
    await act('area');
  };
  await ev("LabMotion.startMission('accel'); true");
  await accelRuns();
  d = await dbg();
  ok('Find the acceleration: gradients from 10 cm and 40 cm plus an area complete it', d.mission && d.mission.success && d.mission.heights.join() === '10,40' && d.mission.area && !d.mission.mistakes, d.mission);
  ok('…measured 0.40 and 1.90 m/s²', d.runs.some(r => r.h === 10 && r.a === 0.4) && d.runs.some(r => r.h === 40 && r.a === 1.9), d.runs.slice(0, 3));
  ok('the mission panel ticks every step', await ev("document.querySelectorAll('#lab-mission .lab-steps li.is-done').length === 4"));
  await clicks('[data-act="quiz"]');
  ok('all answers right and no mistakes: 3 stars', (await answerAll(0)) === '3 of 3 stars');
  ok('the stars are saved', await ev("Labs.store('motion').missions.accel.stars === 3"));
  await closeOv();

  await ev("LabMotion.startMission('disp'); true");
  ok('Distance or displacement? takes you to the field', (await dbg()).setup === 'walk');
  for (const r of ['back', 'corner']) { await clicks(`[data-route="${r}"]`); await act('walk'); }
  ok('two routes are not enough - it needs the running track too', !(await dbg()).mission.success);
  await clicks('[data-route="track"]'); await act('walk');
  d = await dbg();
  ok('…once round the track completes it: 400 m walked, displacement 0 m', d.mission.success && d.walks[0].route === 'track' && d.walks[0].distance === 400 && d.walks[0].displacement === 0, d.walks[0]);
  await clicks('[data-act="quiz"]');
  ok('Distance or displacement?: 3 stars', (await answerAll(1)) === '3 of 3 stars');
  await closeOv();

  await ev("LabMotion.startMission('accel'); true");
  await set('timer', 'stopwatch'); await act('run'); await closeOv(); await set('timer', 'gates');
  await accelRuns();
  await clicks('[data-act="quiz"]');
  ok('a hand-timed run during the mission costs a star: 2 stars (best of 3 is kept)', (await answerAll(0)) === '2 of 3 stars' && await ev("Labs.store('motion').missions.accel.stars === 3"));
  await closeOv();

  // ── Discoveries ────────────────────────────────
  console.log('\n-- discoveries');
  await clicks('[data-panel="found"]');
  ok('the Discoveries tab lists found cards and clues', await ev("document.querySelectorAll('.lab-found-card').length === LabMotionData.DISCOVERIES.length && document.querySelectorAll('.lab-found-card.is-found').length >= 8"));
  await clicks('.lab-found-card.is-found[data-disc="gradient"]');
  ov = await overlay();
  ok('a found card: what you saw, the rule, why, the paper, “Do it again”',
     ov && /What you saw/.test(ov.text) && /gradient of a speed-time graph/.test(ov.text) && /Why it happens/.test(ov.text) && /Physics 2023 Q6\(d\)/.test(ov.text) && /Do it again/.test(ov.text), ov);
  await closeOv();
  await ev("delete Labs.store('motion').disc.corner; true");
  await clicks('[data-panel="sandbox"]', '[data-panel="found"]', '.lab-found-card[data-disc="corner"]');
  ov = await overlay();
  ok('a locked card: the clue, “How to find it” and “Show me how”', ov && /Locked discovery/.test(ov.text) && /How to find it/.test(ov.text) && /Show me how/.test(ov.text), ov);
  await clicks('#lab-overlay [data-disc-go]');
  ok('“Show me how” starts a guide from its recipe', (await dbg()).guide && (await dbg()).guide.id === 'disc-corner');
  await clicks('[data-act="guide-stop"]');

  const discIds = await ev('LabMotionData.DISCOVERIES.map(d => d.id)');
  const unsolved = [];
  for (const id of discIds) {
    const res = await ev(`(() => {
      const st = Labs.store('motion'); delete st.disc['${id}'];
      document.getElementById('lab-overlay')?.remove();
      LabMotion.discoveryGuide('${id}');
      for (let k = 0; k < 30 && LabMotion._debug().guide; k++) {
        if (document.querySelector('#lab-overlay.is-hazard')) return 'hazard card';
        const rc = document.querySelector('#lab-overlay.is-result [data-ov-close]');
        if (rc) { rc.click(); continue; }
        const btn = document.querySelector('#lab-guide [data-guide-do]');
        if (btn) btn.click(); else LabMotion._tick(6);
      }
      if (LabMotion._debug().guide) return 'guide never finished at step ' + LabMotion._debug().guide.step;
      document.getElementById('lab-overlay')?.remove();
      return !!st.disc['${id}'];
    })()`);
    if (res !== true) unsolved.push(id + ' → ' + res);
  }
  ok(`all ${discIds.length} discoveries unlock by following their own “Show me how”`, unsolved.length === 0, unsolved);
  const cnt = await ev("({ shown: document.getElementById('lab-found-n').textContent, saved: Object.keys(Labs.store('motion').disc).length + '/' + LabMotionData.DISCOVERIES.length })");
  ok('the ✨ counter matches what is saved', cnt.shown === cnt.saved && cnt.saved === discIds.length + '/' + discIds.length, cnt);

  // ── Real-time motion, calm, phone ───────────────
  console.log('\n-- motion, calm, phone');
  await ev("LabMotion._test({ instant: false }); true");
  await fresh();
  await clicks('[data-panel="sandbox"]');
  await act('run');
  await sleep(800);
  d = await dbg();
  ok('with animation on, the trolley rolls in real time (part-way through its 2.11 s run)', d.running && d.runT > 0.3 && d.runT < 2.1, { running: d.running, t: d.runT });
  ok('…while the chip shows the live time and speed', /t = \d\.\d\d s · v = \d\.\d\d m\/s/.test(await ev("document.getElementById('lab-motion-chip').textContent")));
  for (let i = 0; i < 30 && (await dbg()).running; i++) await sleep(150);
  d = await dbg();
  ok('…and finishes by itself, recorded', !d.running && d.last && d.last.t === 2.11, d.last);
  ok('the canvas has drawn the graph line in red', await ev(`(() => { const c = document.getElementById('lab-motion-canvas'), x = c.getContext('2d');
    const img = x.getImageData(0, Math.round(c.height * 0.4), c.width, Math.round(c.height * 0.55)).data; let red = 0;
    for (let i = 0; i < img.length; i += 4) if (img[i] > 170 && img[i + 1] < 70 && img[i + 2] < 70) red++; return red > 60; })()`));
  await clicks('#lab-motion-block');
  await act('run');
  let fell = false, early = null;
  for (let i = 0; i < 40 && !fell; i++) { await sleep(120); d = await dbg(); if (d.fall) { fell = true; early = await overlay(); } }
  ok('with no stop block, the trolley is shown falling off BEFORE the hazard card', fell && !early, { fell, early });
  for (let i = 0; i < 20 && !(await overlay()); i++) await sleep(150);
  ov = await overlay();
  ok('…then the hazard card appears', ov && /is-hazard/.test(ov.cls), ov);
  await closeOv(); await clicks('#lab-motion-block');
  await shelf('walk'); await act('walk');
  await sleep(700);
  d = await dbg();
  ok('the walker jogs the route in (speeded-up) real time', d.walking && d.walkF > 0.05 && d.walkF < 1, d.walkF);
  for (let i = 0; i < 30 && (await dbg()).walking; i++) await sleep(150);
  ok('…and the walk is recorded when it arrives', !(await dbg()).walking && (await dbg()).walks[0].route === 'straight');

  await ev("document.documentElement.classList.add('kid-calm'); true");
  await shelf('ramp'); await act('run');
  d = await dbg();
  ok('in Calm Mode a run completes at once (no motion)', !d.running && d.last && d.last.t === 2.11, d);
  await clicks('#lab-motion-block'); await act('run');
  ov = await overlay();
  ok('in Calm Mode the hazard card applies at once', ov && /is-hazard/.test(ov.cls), ov);
  await closeOv(); await clicks('#lab-motion-block');
  await shelf('walk'); await act('walk');
  ok('in Calm Mode a walk completes at once', !(await dbg()).walking);
  await ev("document.documentElement.classList.remove('kid-calm'); true");

  for (const setup of ['ramp', 'walk']) {
    await clicks('[data-panel="sandbox"]');
    await shelf(setup);
    const fit = await ev(`(() => { const vw = innerWidth;
      const off = [...document.querySelectorAll('#labs-root button, #labs-root canvas')]
        .filter(e => e.getClientRects().length && e.getBoundingClientRect().right > vw + 0.5)
        .map(e => (e.getAttribute('data-panel') || e.getAttribute('data-act') || e.getAttribute('data-set') || e.getAttribute('data-route') || e.getAttribute('data-id') || e.tagName) + ' → ' + Math.round(e.getBoundingClientRect().right));
      const small = [...document.querySelectorAll('#labs-root .lab-motion-controls button, #labs-root .lab-top button, #lab-guide button.lab-btn')]
        .filter(e => e.getClientRects().length && e.getBoundingClientRect().height < 43.5).map(e => e.textContent.trim().slice(0, 20));
      return { vw, root: document.getElementById('labs-root').scrollWidth, off, small }; })()`);
    ok(`${setup}: fits a 360px phone - no control past the edge, tap targets ≥ 44px`, fit.root <= fit.vw && fit.off.length === 0 && fit.small.length === 0, fit);
  }

  await ev("showScreen('student-home'); true");
  ok('no page errors along the way', errors.length === 0, errors.slice(0, 5));

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); quit(1); });
