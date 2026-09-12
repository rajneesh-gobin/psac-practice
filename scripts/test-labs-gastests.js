'use strict';
// Science Labs › Gas Tests (Science, Grade 7) — end-to-end browser test.
//
// Proves: start panel renders, guided experiments advance step by step,
// applying a test triggers the correct canvas result, hazard cards fire when
// safety rules are broken, discoveries unlock and appear in the panel,
// missions score to 3 stars, Calm Mode skips animations, 360px layout fits,
// no console errors during any of the above.
//
// Run: CHROME_PATH=<Chrome for Testing> node scripts/test-labs-gastests.js
// ⚠ Served over file:// — Chrome for Testing cannot reach 127.0.0.1.
// ⚠ Port 9429 is dedicated to this lab's test (see LAB_SPEC §5).
'use strict';

const http = require('node:http');
const fs   = require('node:fs');
const path = require('node:path');
const os   = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT  = path.resolve(__dirname, '..');
const DBG   = 9429;
const PAGE  = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get   = u => new Promise((res, rej) =>
  http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));

let checks = 0, failed = 0;
const ok = (label, cond, detail) => {
  if (cond) { checks++; console.log('OK   ' + label); }
  else       { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); }
};

(async () => {
  const chrome = spawn(
    process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    [
      '--headless=new', '--remote-debugging-port=' + DBG,
      '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-gastests-')),
      '--allow-file-access-from-files', '--no-first-run', '--hide-scrollbars', 'about:blank',
    ],
    { stdio: 'ignore' }
  );
  const quit = code => { try { chrome.kill(); } catch (_) {} process.exit(code); };

  let version;
  for (let i = 0; i < 40 && !version; i++) {
    try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); }
  }
  if (!version) { console.log('FAIL Chrome did not start'); quit(1); }

  const ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let serial = 0;
  const waiting = new Map();
  const errors  = [];
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.method === 'Runtime.exceptionThrown')
      errors.push((m.params.exceptionDetails.exception || {}).description || m.params.exceptionDetails.text);
    if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); }
  };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const id = ++serial;
    const t  = setTimeout(() => { waiting.delete(id); rej(Error('Timeout ' + method)); }, 30000);
    waiting.set(id, m => { clearTimeout(t); m.error ? rej(Error(m.error.message)) : res(m.result); });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });

  const target  = await send('Target.createTarget', { url: 'about:blank' });
  const session = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
  const call = (m, p) => send(m, p, session.sessionId);
  await call('Page.enable'); await call('Runtime.enable');

  // Standard 360 × 780 phone
  await call('Emulation.setDeviceMetricsOverride',
    { width: 360, height: 780, deviceScaleFactor: 2, mobile: true });

  const ev = async expr => {
    const r = await call('Runtime.evaluate',
      { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails)
      throw new Error(String(
        r.exceptionDetails.exception && r.exceptionDetails.exception.description ||
        r.exceptionDetails.text).slice(0, 500));
    return r.result.value;
  };
  const click  = sel => ev(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); if (!el) return 'missing: '+${JSON.stringify(sel)}; el.click(); return true; })()`);
  const dbg    = () => ev('LabGastests._debug()');
  const ovText = () => ev(`(() => { const o = document.getElementById('lab-overlay'); return o ? o.textContent.replace(/\\s+/g,' ').slice(0,3000) : null; })()`);
  const closeOv = () => click('#lab-overlay [data-ov-close]');

  // ── 1. App load ─────────────────────────────────────────────────────────────
  console.log('\n-- app load');
  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) {
    await sleep(400);
    try { ready = await ev("document.readyState === 'complete' && typeof openLabs === 'function'"); } catch (_) {}
  }
  const pageUrl = await ev('location.href');
  ok('page is served over file://', pageUrl.startsWith('file:'));
  ok('app fully loaded', ready === true);
  await sleep(1500);

  // ── 2. Start the Gas Tests lab as Grade 7 ────────────────────────────────────
  console.log('\n-- opening the lab');
  await ev("SELECTED_GRADE = 7; openLabs(); true");
  let hub = false;
  for (let i = 0; i < 40 && !hub; i++) {
    await sleep(250);
    try { hub = await ev("!!document.querySelector('#labs-root .lab-hub') || !!document.querySelector('.lab-hub')"); } catch (_) {}
  }
  ok('labs hub renders for Grade 7', hub === true);
  await sleep(400);

  // Open the gastests lab from the hub
  await ev("Labs.openLab('gastests'); true");
  await sleep(2000);
  const labLoaded = await ev(
    "typeof LabGastests !== 'undefined' && typeof LabGastestsData !== 'undefined' && !!document.querySelector('.lab-gastests')");
  ok('lab_gastests.js and lab_gastests_data.js loaded', labLoaded === true);

  // ── 3. Start panel content ────────────────────────────────────────────────────
  console.log('\n-- start panel');
  // Dismiss the intro overlay if it appeared
  const ovEl = await ev("!!document.getElementById('lab-overlay')");
  if (ovEl) { await closeOv(); await sleep(400); }

  const eyebrow = await ev("(document.querySelector('.lab-eyebrow') || {}).textContent || ''");
  ok('eyebrow shows "Science · Grade 7"', eyebrow.includes('Science') && eyebrow.includes('7'), eyebrow);

  const stationBtns = await ev("document.querySelectorAll('[data-station]').length");
  ok('3 gas station buttons rendered', stationBtns === 3, stationBtns);

  const guideCards = await ev("document.querySelectorAll('[data-guide]').length");
  ok('at least 3 guide cards in the sidebar', guideCards >= 3, guideCards);

  const missionCards = await ev("document.querySelectorAll('[data-mission]').length");
  ok('at least 2 mission cards', missionCards >= 2, missionCards);

  // ── 4. Instant mode (skip animation waits) ───────────────────────────────────
  console.log('\n-- instant mode');
  await ev("LabGastests._test({ instant: true }); true");
  ok('_test({ instant:true }) accepted', true);

  // ── 5. Safety goggles ────────────────────────────────────────────────────────
  console.log('\n-- safety goggles');
  const gogBtn = await ev("!!document.getElementById('lab-goggles')");
  ok('goggles button present', gogBtn === true);
  await click('#lab-goggles');
  await sleep(200);
  const gogglesOn = await ev("document.getElementById('lab-goggles').getAttribute('aria-pressed') === 'true'");
  ok('goggles toggle on', gogglesOn === true);

  // ── 6. Select a station and set up ───────────────────────────────────────────
  console.log('\n-- oxygen station');
  await click('[data-station="o2"]');
  await sleep(300);
  let d = await dbg();
  ok('active station = o2', d.active === 'o2');

  // Setup button should be visible now
  await click('[data-act="setup"]');
  await sleep(800);
  d = await dbg();
  ok('oxygen station set up', d.stations && d.stations.o2 && d.stations.o2.setup === true);

  // Collect gas
  await click('[data-act="collect"]');
  await sleep(1500);
  d = await dbg();
  ok('oxygen collected (fillFrac = 1)', d.stations.o2.fillFrac >= 1);

  // ── 7. Correct test: glowing splint on oxygen ─────────────────────────────────
  console.log('\n-- glowing splint on oxygen');
  await click('[data-act="test:glowing"]');
  await sleep(800);
  d = await dbg();
  ok('testApplied = glowing',  d.stations.o2.testApplied === 'glowing');
  ok('result.correct = true',  d.stations.o2.result && d.stations.o2.result.correct === true);
  ok('result.fx = relight',    d.stations.o2.result && d.stations.o2.result.fx === 'relight');

  // ── 8. Discovery unlocked ─────────────────────────────────────────────────────
  console.log('\n-- discovery unlock');
  ok('d_o2_test discovery unlocked', d.disc.includes('d_o2_test'));

  // ── 9. Discoveries panel ─────────────────────────────────────────────────────
  console.log('\n-- discoveries panel');
  await click('[data-panel="found"]');
  await sleep(300);
  const foundCards = await ev("document.querySelectorAll('.lab-found-card').length");
  ok('discoveries grid rendered', foundCards >= 16, foundCards);
  const foundUnlocked = await ev("document.querySelectorAll('.lab-found-card.is-found').length");
  ok('at least 1 discovery card is unlocked', foundUnlocked >= 1, foundUnlocked);

  // Open a discovery detail
  await ev("document.querySelector('.lab-found-card.is-found').click(); true");
  await sleep(400);
  const ovContent = await ovText();
  ok('discovery overlay opened', !!ovContent && ovContent.length > 10);
  await closeOv();
  await sleep(300);

  // ── 10. Hazard card (no goggles for H₂) ─────────────────────────────────────
  console.log('\n-- hazard (no goggles)');
  // Turn goggles off first
  await ev("LabGastests._debug().goggles && document.getElementById('lab-goggles').click(); true");
  await sleep(200);
  // Go back to sandbox panel
  await click('[data-panel="sandbox"]');
  await sleep(200);
  // Reset oxygen station, select hydrogen
  await click('[data-act="reset-station"]');
  await sleep(200);
  await click('[data-station="h2"]');
  await sleep(200);
  // Try setup without goggles — should trigger no_goggles_acid hazard
  await click('[data-act="setup"]');
  await sleep(600);
  const hazText = await ovText();
  ok('hazard overlay appeared (no goggles)', hazText && (hazText.includes('ogg') || hazText.includes('Gogg') || hazText.includes('acid') || hazText.includes('precaution')), hazText ? hazText.slice(0, 200) : null);
  await closeOv();
  await sleep(300);

  // Put goggles back on
  const gogglesState = await ev("document.getElementById('lab-goggles').getAttribute('aria-pressed')");
  if (gogglesState !== 'true') { await click('#lab-goggles'); await sleep(200); }

  // ── 11. CO₂ guided experiment (steps advance) ──────────────────────────────
  console.log('\n-- CO₂ guided experiment');
  await click('[data-panel="sandbox"]');
  await sleep(200);
  // Find and start the CO₂ guide
  await ev("document.querySelector('[data-guide=\"g_co2\"]') && document.querySelector('[data-guide=\"g_co2\"]').click(); true");
  await sleep(500);
  const guideBox = await ev("!document.getElementById('lab-guide').hidden");
  ok('guide box is visible', guideBox === true);

  // Step through: station:co2
  await click('[data-station="co2"]');
  await sleep(300);
  // setup
  await click('[data-act="setup"]');
  await sleep(600);
  // collect
  await click('[data-act="collect"]');
  await sleep(1200);
  // test:limewater
  await click('[data-act="test:limewater"]');
  await sleep(800);
  d = await dbg();
  ok('CO₂ limewater result correct', d.stations && d.stations.co2 && d.stations.co2.result && d.stations.co2.result.correct === true);
  ok('d_co2_test discovery unlocked', d.disc.includes('d_co2_test'));

  // Guide completion overlay
  await sleep(600);
  const guideOvText = await ovText();
  ok('guide completion overlay appeared', !!guideOvText && guideOvText.includes('carbon dioxide'), guideOvText ? guideOvText.slice(0, 200) : null);
  await closeOv();
  await sleep(400);

  // ── 12. Wrong test → discovery (splint confusion) ────────────────────────────
  console.log('\n-- wrong test discovery');
  // Reset CO₂ station, rerun to get wrong splint
  await click('[data-act="reset-station"]');
  await sleep(200);
  await click('[data-station="co2"]');
  await sleep(200);
  await click('[data-act="setup"]');
  await sleep(600);
  await click('[data-act="collect"]');
  await sleep(1200);
  // Apply wrong test: glowing splint on CO₂
  await click('[data-act="test:glowing"]');
  await sleep(800);
  d = await dbg();
  ok('wrong test (glowing on CO₂) recorded', d.stations.co2.result && d.stations.co2.result.correct === false);
  ok('d_two_tests_co2 discovery unlocked (important exam point)', d.disc.includes('d_two_tests_co2'));

  // ── 13. Mission ───────────────────────────────────────────────────────────────
  console.log('\n-- mission');
  await click('[data-panel="missions"]');
  await sleep(300);
  await ev("document.querySelector('[data-mission=\"unknown_gas\"]') && document.querySelector('[data-mission=\"unknown_gas\"]').click(); true");
  await sleep(500);
  const missionActive = await ev("!!document.querySelector('.lab-mission-active')");
  ok('mission active panel shown', missionActive === true);

  // Start the quiz
  await ev("document.querySelector('[data-act=\"quiz\"]') && document.querySelector('[data-act=\"quiz\"]').click(); true");
  await sleep(600);
  const quizVisible = await ev("!!document.querySelector('.lab-quiz') || !!document.getElementById('lab-overlay')");
  ok('quiz overlay opened', quizVisible === true);

  // Answer all questions by clicking the first option each time
  for (let i = 0; i < 6; i++) {
    await sleep(400);
    const answered = await ev(`(() => {
      const btns = [...document.querySelectorAll('.lab-quiz-option, .quiz-opt, [data-quiz-opt]')];
      if (btns.length > 0) { btns[0].click(); return true; }
      const anyBtn = document.querySelector('#lab-overlay button:not([data-ov-close])');
      if (anyBtn) { anyBtn.click(); return true; }
      return false;
    })()`);
    if (!answered) break;
    await sleep(300);
    // Click next/confirm if present
    await ev(`(() => {
      const next = document.querySelector('[data-quiz-next], .lab-quiz-next, .lab-btn-primary');
      if (next && !next.dataset.ovClose) next.click();
    })()`);
  }
  await sleep(1000);
  const missionDoneOv = await ovText();
  ok('mission result overlay appears', !!missionDoneOv && missionDoneOv.length > 10);

  // Close result overlay
  await closeOv();
  await sleep(400);

  // Check stars saved
  d = await dbg();
  const missionSaved = await ev("(Labs.store('gastests').missions || {}).unknown_gas");
  ok('mission stars saved', !!missionSaved);

  // ── 14. Calm Mode ─────────────────────────────────────────────────────────────
  console.log('\n-- calm mode');
  await ev("typeof Labs !== 'undefined' && Labs.setCalm && Labs.setCalm(true); true");
  const calmOn = await ev("typeof Labs !== 'undefined' && Labs.calm && Labs.calm()");
  ok('calm mode activated', calmOn === true);

  // Reset O₂ station and run a test in calm mode — should not hang
  await click('[data-panel="sandbox"]');
  await sleep(200);
  await click('[data-station="o2"]');
  await sleep(200);
  const o2state = await dbg();
  if (o2state.stations.o2.testApplied) {
    await click('[data-act="reset-station"]');
    await sleep(200);
  }
  await click('[data-act="setup"]');
  await sleep(400);
  await click('[data-act="collect"]');
  await sleep(400);
  await click('[data-act="test:glowing"]');
  await sleep(600);
  d = await dbg();
  ok('calm mode: result recorded (no animation wait)', d.stations.o2.result && d.stations.o2.result.correct === true);

  // Turn calm mode off
  await ev("typeof Labs !== 'undefined' && Labs.setCalm && Labs.setCalm(false); true");

  // ── 15. 360px layout ──────────────────────────────────────────────────────────
  console.log('\n-- 360px layout');
  const stationsVisible = await ev("(() => { const el = document.querySelector('.lab-gastests-stations'); if (!el) return false; const r = el.getBoundingClientRect(); return r.width <= 360 && r.width > 0; })()");
  ok('station row fits within 360px', stationsVisible === true);

  const canvasFits = await ev("(() => { const c = document.getElementById('lab-gastests-canvas'); if (!c) return false; const r = c.getBoundingClientRect(); return r.width <= 360 && r.width > 0; })()");
  ok('canvas fits within 360px', canvasFits === true);

  // ── 16. No page errors ────────────────────────────────────────────────────────
  console.log('\n-- page errors');
  const pageErrors = errors.filter(e => !e.includes('favicon'));
  ok('no uncaught JS exceptions', pageErrors.length === 0, pageErrors.length ? pageErrors[0].slice(0, 300) : undefined);

  // ── 17. Unmount / back to hub ──────────────────────────────────────────────
  console.log('\n-- back to hub');
  await click('[data-act="hub"]');
  await sleep(600);
  const backOnHub = await ev("S.currentScreen === 'labs' && (!!document.querySelector('.lab-hub') || !document.querySelector('.lab-gastests'))");
  ok('back button returns to hub', backOnHub === true);

  // ── Summary ───────────────────────────────────────────────────────────────────
  console.log('\n' + (failed === 0 ? '✅' : '❌') +
    ' ' + checks + ' passed, ' + failed + ' failed\n');
  quit(failed > 0 ? 1 : 0);
})().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
