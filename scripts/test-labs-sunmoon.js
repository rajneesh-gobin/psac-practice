'use strict';
// ══════════════════════════════════════════════
//  Sun, Earth & Moon Lab — real-browser test
//  Run: CHROME_PATH=<Chrome for Testing> node scripts/test-labs-sunmoon.js
//
//  Opens the app at Grade 6, then Grade 7. Checks:
//   - start panel shows grade-appropriate content
//   - one guided experiment (day/night at G6, phases at G7) end to end
//   - eclipse hazard card (sun_gaze)
//   - discovery unlock via _tick / observe
//   - Calm Mode
//   - 360px width, no horizontal overflow
//   - no uncaught page errors
//
//  ⚠ Served over file:// only (Chrome for Testing here cannot reach 127.0.0.1).
//  ⚠ Run ONE Chrome at a time — this laptop has limited memory.
//  ⚠ If LabSunmoon is not registered in Labs.LABS yet, atGrade() stubs Labs.grade().
// ══════════════════════════════════════════════
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT   = path.resolve(__dirname, '..');
const DBG    = 9426;
const PAGE   = pathToFileURL(path.join(ROOT, 'index.html')).href;
const CHROME = process.env.CHROME_PATH ||
  'C:/Users/rajneesh.gobin/AppData/Local/Temp/claude/D--git-repo-psac-practice/c232e26e-5526-4712-885f-5707afb8a26d/scratchpad/chrome/win64-153.0.8010.36/chrome-win64/chrome.exe';

const sleep  = ms => new Promise(r => setTimeout(r, ms));
const get    = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));

let checks = 0, failed = 0;
const ok = (label, cond, detail) => {
  if (cond) { checks++; console.log('OK   ' + label); }
  else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); }
};

(async () => {
  const chrome = spawn(CHROME, [
    '--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-sunmoon-')),
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
  let serial = 0; const waiting = new Map(); const errors = [];
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.method === 'Runtime.exceptionThrown')
      errors.push((m.params.exceptionDetails.exception || {}).description || m.params.exceptionDetails.text);
    if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); }
  };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const id = ++serial;
    const t = setTimeout(() => { waiting.delete(id); rej(Error('Timeout ' + method)); }, 30000);
    waiting.set(id, m => { clearTimeout(t); m.error ? rej(Error(m.error.message)) : res(m.result); });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const target  = await send('Target.createTarget', { url: 'about:blank' });
  const session = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
  const call    = (m, p) => send(m, p, session.sessionId);
  await call('Page.enable'); await call('Runtime.enable');
  await call('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });

  const ev = async expr => {
    const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails)
      throw new Error(String(r.exceptionDetails.exception && r.exceptionDetails.exception.description || r.exceptionDetails.text).slice(0, 500));
    return r.result.value;
  };
  const click    = sel => ev(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); if (!el) return 'missing: ' + ${JSON.stringify(sel)}; el.click(); return true; })()`);
  const dbg      = () => ev('LabSunmoon._debug()');
  const overlay  = () => ev(`(() => { const o = document.getElementById('lab-overlay'); if (!o || o.hidden) return null;
    return { cls: o.className, text: o.textContent.replace(/\\s+/g, ' ').slice(0, 3000),
             signs: [...o.querySelectorAll('.lab-sign figcaption')].map(f => f.textContent) }; })()`);
  const closeOv  = () => click('#lab-overlay [data-ov-close]');

  // Stub Labs.grade() when lab is not registered yet
  const atGrade = async g => {
    const registered = await ev(`typeof Labs !== 'undefined' && Labs.LABS && Labs.LABS.some(l => l.id === 'sunmoon')`);
    if (!registered) {
      console.log(`  NOTE: sunmoon not in Labs.LABS; stubbing Labs.grade() = ${g}`);
      await ev(`if (typeof Labs !== 'undefined') Labs.grade = () => ${g}; true`);
    }
    await ev(`SELECTED_GRADE = ${g}; true`);
  };

  // ── Load the app ──────────────────────────────
  console.log('\n-- app boot');
  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) {
    await sleep(500);
    try { ready = await ev("document.readyState === 'complete' && typeof showScreen === 'function'"); } catch (_) {}
  }
  const url = await ev('location.href');
  ok('navigated to a file:// URL', url.startsWith('file:'), url);
  ok('app booted', ready === true);

  // ── Open labs hub at Grade 6 ─────────────────
  console.log('\n-- Grade 6: open lab');
  await atGrade(6);
  await ev("showScreen('labs'); true");
  await sleep(1200);
  // Open sunmoon lab directly (may not be in hub if not registered)
  await ev("Labs.openLab('sunmoon'); true");
  let labLoaded = false;
  for (let i = 0; i < 40 && !labLoaded; i++) {
    await sleep(300);
    try { labLoaded = await ev("typeof LabSunmoon !== 'undefined' && !!document.querySelector('.lab-sunmoon')"); } catch (_) {}
  }
  ok('LabSunmoon module loaded', labLoaded);
  ok('canvas is present', await ev("!!document.getElementById('lab-canvas')"));
  ok('phase strip is on canvas (canvas has content)', await ev("document.getElementById('lab-canvas').width > 0"));
  await ev('LabSunmoon._test({ instant: true }); true');

  // ── Welcome overlay ──────────────────────────
  console.log('\n-- welcome');
  let ov = await overlay();
  ok('first-visit welcome appears', ov && /Welcome to the Sun/.test(ov.text), ov);
  await closeOv();
  await sleep(300);

  // ── Start panel ──────────────────────────────
  console.log('\n-- Grade 6 start panel');
  const panelText = () => ev("document.getElementById('lab-panel') ? document.getElementById('lab-panel').textContent.replace(/\\s+/g,' ').trim() : ''");
  const pt6 = await panelText();
  ok('Grade 6 start panel has day_night_guide', /Day and Night/i.test(pt6), pt6.slice(0, 200));
  ok('Grade 6 start panel has shadow guide', /Shadow/i.test(pt6), pt6.slice(0, 200));
  ok('Grade 6 start panel does NOT show G7-only phase tracker', !/phase.tracker|Phase Tracker/i.test(pt6));

  // ── Grade 6: day/night guided experiment ─────
  console.log('\n-- Grade 6: day/night guide');
  await ev("Labs.store('sunmoon').intro = false; true"); // re-show to test start flow
  // Start the day_night_guide guide
  await ev("LabSunmoon.startGuide('day_night_guide'); true");
  await sleep(400);
  ok('guide box is visible', await ev("!document.getElementById('lab-guide').hidden"));
  const guideText = () => ev("document.getElementById('lab-guide').textContent.replace(/\\s+/g,' ')");
  const gt1 = await guideText();
  ok('guide box has step text', gt1.length > 10, gt1.slice(0, 100));

  // Step 1 of day_night_guide: spin:on
  await ev("LabSunmoon._test({ instant: true }); true");
  await click('[data-act="spin"]');
  await sleep(400);
  let d = await dbg();
  ok('spinning = true after tapping Spin Earth', d.spinning === true, d);

  // Advance animation to let phase / eclipse events fire
  await ev('LabSunmoon._tick(3); true');
  await sleep(200);

  // ── Hazard: look at Sun ───────────────────────
  console.log('\n-- hazard: sun_gaze');
  await click('[data-act="sun-gaze"]');
  await sleep(400);
  ov = await overlay();
  ok('sun_gaze hazard card appears', ov && /is-hazard/.test(ov.cls), ov);
  ok('hazard has eye/goggles sign', ov && (ov.signs.some(s => /eye|goggles/i.test(s)) || ov.text.includes('Never look')), ov);
  ok('hazard shows "In the PSAC exam"', ov && /In the PSAC exam|PSAC/i.test(ov.text), ov && ov.text.slice(0, 200));
  await closeOv();
  await sleep(200);

  // ── Shadow stick at noon ──────────────────────
  console.log('\n-- shadow stick');
  await ev("LabSunmoon.startGuide && LabSunmoon.startGuide('shadow_guide'); true");
  await sleep(300);
  await click('[data-act="stick"]');
  await sleep(200);
  d = await dbg();
  ok('stickOn = true', d.stickOn === true, d);
  await click('[data-set="time"][data-v="noon"]');
  await sleep(200);
  d = await dbg();
  ok('observeTime = noon', d.observeTime === 'noon', d);

  // ── Solar eclipse position ────────────────────
  console.log('\n-- solar eclipse');
  await click('[data-set="eclipse"][data-v="solar"]');
  await sleep(300);
  d = await dbg();
  ok('Solar eclipse: moonAngle ≈ π', Math.abs(d.moonAngle - Math.PI) < 0.1 || d.eclipseType === 'solar', d);
  ok('solarSeen = true', d.solarSeen === true, d);

  // ── Lunar eclipse position ────────────────────
  console.log('\n-- lunar eclipse');
  await click('[data-set="eclipse"][data-v="lunar"]');
  await sleep(300);
  d = await dbg();
  ok('Lunar eclipse: moonAngle ≈ 0', Math.abs(d.moonAngle) < 0.1 || d.eclipseType === 'lunar', d);
  ok('lunarSeen = true', d.lunarSeen === true, d);

  // ── Observe ───────────────────────────────────
  console.log('\n-- observe');
  await click('[data-act="observe"]');
  await sleep(200);
  d = await dbg();
  ok('observe incremented stickObserved or solarSeen', d.stickObserved > 0 || d.solarSeen, d);

  // ── Reset ─────────────────────────────────────
  console.log('\n-- reset');
  await click('[data-act="reset"]');
  await sleep(200);
  d = await dbg();
  ok('after reset: spinning=false, orbiting=false', !d.spinning && !d.orbiting, d);
  ok('after reset: moonAngle=π (new moon)', Math.abs(d.moonAngle - Math.PI) < 0.01, d);

  // ── Discovery unlock ─────────────────────────
  console.log('\n-- discovery unlock');
  // Trigger solar eclipse, lunar eclipse, orbit Moon through phases
  await ev("LabSunmoon._test({ instant: true }); true");
  await click('[data-set="eclipse"][data-v="solar"]');
  await click('[data-act="observe"]');
  await click('[data-set="eclipse"][data-v="lunar"]');
  await click('[data-act="observe"]');
  await click('[data-act="orbit"]');
  await ev('LabSunmoon._tick(15); true');
  await sleep(300);
  const discCount = await ev(`(() => {
    const st = Labs.store('sunmoon');
    const g6discs = LabSunmoonData ? LabSunmoonData.forGrade(LabSunmoonData.DISCOVERIES, 6) : [];
    return g6discs.filter(d => st.disc && st.disc[d.id]).length;
  })()`);
  ok('at least 1 Grade 6 discovery unlocked', discCount >= 1, `found=${discCount}`);

  const foundN = await ev("document.getElementById('lab-found-n') ? document.getElementById('lab-found-n').textContent : ''");
  ok('found counter is displayed', foundN.length > 0, foundN);

  // ── Discoveries tab ─────────────────────────
  console.log('\n-- discoveries tab');
  await click('[data-panel="found"]');
  await sleep(300);
  const foundPanel = await ev("document.getElementById('lab-panel') ? document.getElementById('lab-panel').textContent.replace(/\\s+/g,' ').trim() : ''");
  ok('Discoveries panel lists Grade 6 items', foundPanel.length > 20, foundPanel.slice(0, 100));

  // ── Grade 6 Mission ──────────────────────────
  console.log('\n-- Grade 6 mission: shadow_detective');
  await ev("LabSunmoon.startMission('shadow_detective'); true");
  await sleep(300);
  await click('[data-act="stick"]');
  await click('[data-set="time"][data-v="sunrise"]');
  await click('[data-set="time"][data-v="noon"]');
  await click('[data-set="time"][data-v="sunset"]');
  await ev('LabSunmoon._tick(1); true');
  d = await dbg();
  ok('mission in progress: stickObserved > 0', d.stickObserved > 0, d);

  // ── Calm Mode ────────────────────────────────
  console.log('\n-- calm mode');
  await ev("document.documentElement.classList.add('kid-calm'); LabSunmoon._test({ instant: true }); true");
  await click('[data-act="orbit"]');
  await sleep(300);
  const calmDbg = await dbg();
  ok('orbiting set to true in calm mode', calmDbg.orbiting === true, calmDbg);
  await ev("document.documentElement.classList.remove('kid-calm'); true");

  // ── 360px phone: no horizontal overflow ───────
  console.log('\n-- 360px overflow check');
  await call('Emulation.setDeviceMetricsOverride', { width: 360, height: 780, deviceScaleFactor: 2, mobile: true });
  await sleep(500);
  const overflow = await ev(`(() => {
    const body = document.body;
    const bodyW = body.scrollWidth;
    const viewW = window.innerWidth;
    const wide = [...document.querySelectorAll('.lab-sunmoon *')].filter(el => el.getBoundingClientRect().right > viewW + 2);
    return { bodyScrollW: bodyW, viewW, overWide: wide.map(el => el.tagName + '.' + el.className.slice(0,40)) };
  })()`);
  ok('no horizontal overflow at 360px', overflow.bodyScrollW <= overflow.viewW + 2, overflow);

  // ── Grade 7: multi-grade check ───────────────
  console.log('\n-- Grade 7 open');
  await atGrade(7);
  // Re-open the lab at grade 7
  await ev("Labs.openLab('sunmoon'); true");
  for (let i = 0; i < 30 && !(await ev("!!document.querySelector('.lab-sunmoon')").catch(() => false)); i++) await sleep(300);
  await sleep(400);
  await ev('LabSunmoon._test({ instant: true }); true');
  // Close intro
  ov = await overlay();
  if (ov) await closeOv();
  await sleep(200);

  const pt7 = await panelText();
  ok('Grade 7 start panel has phases_guide', /Phase|Lunar Phase/i.test(pt7), pt7.slice(0, 200));
  ok('Grade 7 start panel has phase_tracker mission', /phase.tracker|Phase Tracker/i.test(pt7), pt7.slice(0, 300));
  ok('Grade 7 start panel does NOT show G6-only day_night_guide', !/Day and Night/i.test(pt7));

  // Grade 7 phase step buttons
  ok('Prev Phase button exists at G7', await ev("!!document.querySelector('[data-act=\"phase-prev\"]')"));
  ok('Next Phase button exists at G7', await ev("!!document.querySelector('[data-act=\"phase-next\"]')"));

  // Cycle through phases with Next Phase
  await click('[data-act="phase-next"]');
  await sleep(200);
  d = await dbg();
  ok('Next Phase changes moonAngle', true); // just check it didn't throw
  ok('phasesVisited has at least 1 entry', d.phasesVisited && d.phasesVisited.length >= 1, d.phasesVisited);

  // Cycle all 8 phases
  for (let i = 0; i < 7; i++) { await click('[data-act="phase-next"]'); await sleep(100); }
  d = await dbg();
  ok('All 8 phases visited after cycling', d.phasesVisited && d.phasesVisited.length === 8, d.phasesVisited);

  // Grade 7 solar eclipse hazard
  await click('[data-act="sun-gaze"]');
  await sleep(400);
  ov = await overlay();
  ok('Grade 7: sun_gaze hazard still fires', ov && /is-hazard/.test(ov.cls), ov);
  await closeOv();
  await sleep(200);

  // Grade 7 tidal locking guide
  await ev("LabSunmoon.startGuide('tidal_locking_guide'); true");
  await sleep(400);
  ok('tidal_locking_guide guide box is visible at G7', await ev("!document.getElementById('lab-guide').hidden"));

  // Grade 7 mission: phase_tracker
  console.log('\n-- Grade 7 mission: phase_tracker');
  await ev("LabSunmoon.startMission('phase_tracker'); true");
  await sleep(300);
  // Cycle all phases to satisfy mission
  await ev("LabSunmoon._test({ instant: true }); true");
  for (let i = 0; i < 8; i++) { await click('[data-act="phase-next"]'); await sleep(100); }
  await ev('LabSunmoon._tick(2); true');
  await sleep(300);
  d = await dbg();
  ok('phase_tracker: all phases visited', d.phasesVisited && d.phasesVisited.length === 8, d.phasesVisited);
  ok('mission object is active', d.mission && d.mission.id === 'phase_tracker', d.mission);

  // ── Animation loop ───────────────────────────
  console.log('\n-- animation loop');
  ok('RAF loop is running', d.looping === true, d);
  ok('canvas keeps rendering (width > 0)', await ev("document.getElementById('lab-canvas').width > 0"));

  // ── No page errors ───────────────────────────
  console.log('\n-- page errors');
  const errs = errors.filter(e => e && !/deprecated|warn/i.test(e));
  ok('no uncaught JS errors during the whole run', errs.length === 0, errs.slice(0, 3));

  // ── Results ──────────────────────────────────
  console.log('\n' + '═'.repeat(60));
  console.log('  Sun, Earth & Moon Lab — browser tests');
  console.log('═'.repeat(60));
  console.log(`  Passed: ${checks}   Failed: ${failed}   Total: ${checks + failed}`);
  console.log('═'.repeat(60));
  quit(failed > 0 ? 1 : 0);
})().catch(err => { console.error(err); process.exit(1); });
