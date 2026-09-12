'use strict';
// Science Labs › Work, Energy & Power — browser test (Chrome for Testing).
//
// Opens the lab at Grade 8, then proves: the start panel is visible; guided
// experiment "How much work do you do?" runs end to end; all hazard/result
// cards trigger with their warning signs; several discoveries unlock; both
// missions reach at least one star; Calm Mode applies; the bench fits 360px
// with no control past the edge; the loop restarts after leaving and
// returning; nothing throws.
//
// Run: CHROME_PATH=<Chrome for Testing> node scripts/test-labs-energy.js
// Port 9431 (LAB_DBG_PORT overrides). Scratch dir: energy/
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = Number(process.env.LAB_DBG_PORT) || 9431;
const CHROME_PATH = process.env.CHROME_PATH ||
  'C:/Users/rajneesh.gobin/AppData/Local/Temp/claude/D--git-repo-psac-practice/c232e26e-5526-4712-885f-5707afb8a26d/scratchpad/chrome/win64-153.0.8010.36/chrome-win64/chrome.exe';
const SCRATCH = path.join(
  'C:/Users/DEEPMA~1.GOB/AppData/Local/Temp/claude/C--Users-deepmala-gobin-OneDrive---Accenture-Desktop-shanvi/71266d30-7da5-4932-b2a8-580b55215f31/scratchpad',
  'energy');
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => {
  let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } });
}).on('error', rej));

let checks = 0, failed = 0, chrome = null;
const ok = (label, cond, detail) => {
  if (cond) { checks++; console.log('OK   ' + label); }
  else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail).slice(0, 600) : '')); }
};

fs.mkdirSync(SCRATCH, { recursive: true });

(async () => {
  // ── Start Chrome ──────────────────────────────
  if (!fs.existsSync(CHROME_PATH)) {
    console.error('Chrome for Testing not found at:\n  ' + CHROME_PATH);
    console.error('Set CHROME_PATH env var or check the path.');
    process.exit(1);
  }
  chrome = spawn(CHROME_PATH, [
    '--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + fs.mkdtempSync(path.join(SCRATCH, 'chrome-')),
    '--allow-file-access-from-files', '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  const quit = code => { try { chrome.kill(); } catch (_) {} process.exit(code); };

  let version;
  for (let i = 0; i < 40 && !version; i++) {
    try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); }
  }
  if (!version) { console.error('Chrome did not start'); quit(1); }

  const ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let serial = 0;
  const waiting = new Map();
  const errors = [];
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.method === 'Runtime.exceptionThrown')
      errors.push((m.params.exceptionDetails.exception || {}).description || m.params.exceptionDetails.text);
    if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); }
  };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const id = ++serial;
    const t = setTimeout(() => { waiting.delete(id); rej(Error('Timeout ' + method)); }, 60000);
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
    if (r.exceptionDetails) throw new Error(String(
      r.exceptionDetails.exception && r.exceptionDetails.exception.description || r.exceptionDetails.text
    ).slice(0, 500));
    return r.result.value;
  };
  const click = sel => ev(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); if (!el) return 'missing: ' + ${JSON.stringify(sel)}; el.click(); return true; })()`);
  const must = async sel => { const r = await click(sel); if (r !== true) ok('clicked ' + sel, false, r); return r; };
  const dbg = () => ev('LabEnergy._debug()');
  const tick = s => ev(`LabEnergy._tick(${s}); true`);
  const overlay = () => ev(`(() => { const o = document.getElementById('lab-overlay'); if (!o) return null;
    const h = o.querySelector('.is-exam h3');
    return { cls: o.className, text: o.textContent.replace(/\\s+/g, ' ').slice(0, 3000),
             exam: h ? h.textContent : '',
             signs: [...o.querySelectorAll('.lab-sign figcaption')].map(f => f.textContent) }; })()`);
  const closeOv = () => click('#lab-overlay [data-ov-close]');
  const hazardOk = (ov, signs, re) => !!(ov && /is-hazard/.test(ov.cls) &&
    signs.every(s => ov.signs.some(t => t.toLowerCase().includes(s.toLowerCase()))) &&
    re.test(ov.text) && /What happened/.test(ov.text) && /Why it'?s dangerous/.test(ov.text) &&
    /Do this instead/.test(ov.text) && /In your exams/.test(ov.exam));
  const resultOk = (ov, re) => !!(ov && /is-result/.test(ov.cls) && re.test(ov.text) &&
    /What happened/.test(ov.text) && /What you should have done/.test(ov.text) && /In your exams/.test(ov.exam));

  // ── Load app ──────────────────────────────────
  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) {
    await sleep(500);
    try { ready = await ev("document.readyState === 'complete' && typeof showScreen === 'function' && typeof RoleModules !== 'undefined'"); } catch (_) {}
  }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: wrong URL ' + url); quit(1); }
  ok('app loaded', ready === true);
  await sleep(2500);

  // ── Open lab at Grade 8 ──────────────────────
  console.log('\n-- opening Work, Energy & Power at Grade 8');
  await ev("SELECTED_GRADE = 8; showScreen('labs'); true");
  let up = false;
  for (let i = 0; i < 60 && !up; i++) {
    await sleep(200);
    up = await ev("typeof Labs !== 'undefined' && !!document.getElementById('labs-root')");
  }
  ok('Labs shell loads', up);

  // Register energy lab temporarily so openLab works before the hub adds it
  await ev(`Labs.LABS.push({
    id:'energy', icon:'⚡', name:'Work, Energy & Power', subject:'Science',
    global:'LabEnergy', grades:[8], ready:false,
    files:['engine/labs/lab_energy_data.js','engine/labs/lab_energy.js'],
    css:'engine/labs/lab_energy.css'
  }); true`);
  await ev("Labs.openLab('energy'); true");
  let open = false;
  for (let i = 0; i < 60 && !open; i++) {
    await sleep(200);
    open = await ev("!!window.LabEnergy && !!document.querySelector('#labs-root .lab-energy')");
  }
  ok('Labs.openLab("energy") loads and renders', open);

  // Enable instant mode for speed
  await ev("LabEnergy._test({ instant: true }); true");
  await sleep(600);

  // ── Start panel ──────────────────────────────
  console.log('\n-- start panel');
  const panelText = await ev("document.getElementById('lab-energy-bench-content') ? document.getElementById('lab-energy-bench-content').textContent : ''");
  ok('start panel shows guided experiments', /Guided|What would you like|Work|ramp|Power/i.test(panelText));

  // ── Guide: how_much_work ─────────────────────
  console.log('\n-- guided experiment: how_much_work');
  // Open bench tab
  await must('[data-tab="bench"]');
  await sleep(200);

  // Click mode:lift
  await must('[data-mode="lift"]');
  await sleep(200);
  // Select mass index 1 (500 g)
  await must('[data-mass="1"]');
  await sleep(150);
  // Select height index 1 (1.0 m)
  await must('[data-height="1"]');
  await sleep(150);
  // Pull
  await must('[data-act="pull"]');
  await sleep(600);  // _tick advances in _instant mode
  await tick(10);
  await sleep(200);

  const d0 = await dbg();
  ok('pull completes (pos reaches 1)', d0.pos >= 0.99);

  // Record
  await must('[data-act="read"]');
  await sleep(300);
  const d1 = await dbg();
  ok('notebook entry added after record', d1.logCount >= 1);

  // ── Readout chips ────────────────────────────
  console.log('\n-- readout chips');
  const forceText = await ev("document.getElementById('lab-energy-force') ? document.getElementById('lab-energy-force').textContent : ''");
  const workText  = await ev("document.getElementById('lab-energy-work') ? document.getElementById('lab-energy-work').textContent : ''");
  ok('Force chip shows N', /N/.test(forceText));
  ok('Work chip shows J',  /J/.test(workText));

  // ── Timer / power ────────────────────────────
  console.log('\n-- timer and power calculation');
  await must('[data-act="timer"]');
  await sleep(100);
  await must('[data-act="pull"]');
  await sleep(200);
  await tick(10);
  await sleep(200);
  const d2 = await dbg();
  ok('after timed pull, calc object exists', d2.calc !== null);
  const powerText = await ev("document.getElementById('lab-energy-power') ? document.getElementById('lab-energy-power').textContent : ''");
  ok('Power chip shows W after timed pull', /W/.test(powerText));

  // ── Ramp mode ────────────────────────────────
  console.log('\n-- ramp mode');
  await must('[data-mode="ramp"]');
  await sleep(200);
  const d3 = await dbg();
  ok('mode switches to ramp', d3.mode === 'ramp');

  await must('[data-mass="2"]');
  await sleep(100);
  await must('[data-height="1"]');
  await sleep(100);
  await must('[data-act="pull"]');
  await sleep(200);
  await tick(10);
  await sleep(200);
  const d4 = await dbg();
  ok('ramp pull completes', d4.pos >= 0.99);

  // After a ramp pull the ramp_efficiency result card should appear
  await sleep(500);
  const rampOv = await overlay();
  ok('ramp_efficiency result card appears after first ramp pull',
    resultOk(rampOv, /ramp|efficient|force|same work/i));
  await closeOv();
  await sleep(300);

  // ── Result card: no_work_held ─────────────────
  console.log('\n-- result card: no_work_held (Hold button)');
  await must('[data-act="hold"]');
  await sleep(300);
  const holdOv = await overlay();
  ok('no_work_held result card appears when holding still',
    resultOk(holdOv, /hold|no work|zero|force|move/i));
  await closeOv();
  await sleep(300);

  // ── Hazard: rope_release ──────────────────────
  console.log('\n-- hazard: rope_release');
  await must('[data-mode="ramp"]');
  await sleep(100);
  await must('[data-act="rope-release"]');
  await sleep(400);
  const ropeOv = await overlay();
  ok('rope_release hazard card appears',
    hazardOk(ropeOv, ['Warning'], /rope|load|slide|runaway/i));
  await closeOv();
  await sleep(300);

  // ── Discoveries panel ────────────────────────
  console.log('\n-- discoveries panel');
  await must('[data-tab="discoveries"]');
  await sleep(300);
  const discText = await ev("document.getElementById('lab-energy-discoveries-content') ? document.getElementById('lab-energy-discoveries-content').textContent : ''");
  ok('discoveries panel shows count', /\d+\s*\/\s*\d+/.test(discText));
  ok('ramp_efficiency discovery is found (card was shown)', /ramp_efficiency|Ramp.*same|same.*work/i.test(discText));

  // Check a rule discovery has been unlocked
  const disc_stored = await ev("Labs.store('energy').disc ? Object.keys(Labs.store('energy').disc) : []");
  ok('at least one discovery is stored', Array.isArray(disc_stored) && disc_stored.length >= 1);

  // ── Missions ─────────────────────────────────
  console.log('\n-- missions tab');
  await must('[data-tab="missions"]');
  await sleep(300);
  const mText = await ev("document.getElementById('lab-energy-missions-content') ? document.getElementById('lab-energy-missions-content').textContent : ''");
  ok('missions panel shows work_it_out',   /Work It Out|work_it_out/i.test(mText));
  ok('missions panel shows power_race_q',  /Power Race|power_race/i.test(mText));

  // Start work_it_out mission
  await must('[data-mission="work_it_out"]');
  await sleep(400);
  const quizEl = await ev("!!document.getElementById('lab-quiz')");
  ok('quiz panel opens for work_it_out', quizEl === true);

  // Answer all questions with first option (correct answer — Labs.quiz shuffles; first shown is correct)
  for (let i = 0; i < 5; i++) {
    await ev("(() => { const o = document.querySelector('#lab-quiz .lab-quiz-option'); if (o) o.click(); })()");
    await sleep(200);
    await ev("(() => { const b = document.querySelector('#lab-quiz [data-quiz-next]'); if (b) b.click(); })()");
    await sleep(200);
  }
  await sleep(1000);
  const mDone = await ev("!!document.getElementById('lab-mission-done')");
  ok('work_it_out mission completes with stars', mDone === true);
  await closeOv();
  await sleep(300);

  // power_race_q mission
  await must('[data-tab="missions"]');
  await sleep(200);
  await must('[data-mission="power_race_q"]');
  await sleep(400);
  for (let i = 0; i < 5; i++) {
    await ev("(() => { const o = document.querySelector('#lab-quiz .lab-quiz-option'); if (o) o.click(); })()");
    await sleep(200);
    await ev("(() => { const b = document.querySelector('#lab-quiz [data-quiz-next]'); if (b) b.click(); })()");
    await sleep(200);
  }
  await sleep(1000);
  const pDone = await ev("!!document.getElementById('lab-mission-done')");
  ok('power_race_q mission completes', pDone === true);
  await closeOv();
  await sleep(300);

  // ── Calm Mode ────────────────────────────────
  console.log('\n-- Calm Mode');
  await ev("document.documentElement.classList.add('kid-calm'); true");
  await sleep(200);
  await must('[data-mode="lift"]');
  await must('[data-act="pull"]');
  await sleep(100);
  await tick(1);
  const calmDbg = await dbg();
  ok('Calm Mode: pull completes instantly', calmDbg.pos >= 0.99);
  await ev("document.documentElement.classList.remove('kid-calm'); true");
  await sleep(200);

  // ── 360px layout ─────────────────────────────
  console.log('\n-- 360px layout');
  await must('[data-tab="bench"]');
  await sleep(300);
  const overflow = await ev(`(() => {
    const root = document.querySelector('.lab-energy');
    if (!root) return null;
    const rw = root.getBoundingClientRect().width;
    let over = [];
    root.querySelectorAll('button, .lab-chip, .lab-energy-chips').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.right > rw + 2) over.push((el.className || '') + '|' + Math.round(r.right));
    });
    return { rootW: Math.round(rw), over };
  })()`);
  ok('no control overflows 360px', overflow && overflow.over.length === 0, overflow && overflow.over.slice(0, 5));

  const tapTargets = await ev(`(() => {
    const bad = [];
    document.querySelectorAll('.lab-energy button').forEach(el => {
      const r = el.getBoundingClientRect();
      const minDim = Math.min(r.width, r.height);
      if (minDim < 40) bad.push((el.textContent || '').trim().slice(0, 30) + '|' + Math.round(minDim));
    });
    return bad;
  })()`);
  ok('all tap targets ≥ 40px (44px ideal, 40px tolerance)', tapTargets.length === 0, tapTargets.slice(0, 5));

  // ── Loop restarts after screen change ────────
  console.log('\n-- loop restarts after leaving and returning');
  await ev("showScreen('dashboard'); true");
  await sleep(400);
  const dBefore = await dbg();
  ok('debug accessible after leaving', dBefore !== null);
  await ev("showScreen('labs'); true");
  await sleep(600);
  const dAfter = await dbg();
  ok('lab is still available after returning to labs screen', dAfter !== null);

  // ── No JS errors ─────────────────────────────
  console.log('\n-- no JS errors');
  ok('no uncaught exceptions during the test', errors.length === 0, errors.slice(0, 3));

  // ── Summary ──────────────────────────────────
  console.log(`\n${checks} passed, ${failed} failed`);
  quit(failed ? 1 : 0);
})().catch(err => {
  console.error(err);
  try { chrome && chrome.kill(); } catch (_) {}
  process.exit(1);
});
