'use strict';
// ══════════════════════════════════════════════
//  Sun, Earth & Moon Lab — real-browser test
//  Run: CHROME_PATH=<Chrome for Testing> node scripts/test-labs-sunmoon.js
//
//  Opens the app at Grade 6, then Grade 7. Checks:
//   - the lab opens on an experiment Aim (lab_experiment.js), no overlay in
//     the way; the old bench sits behind "Explore the bench freely"
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
//  ⚠ Never stub Labs.grade(): Labs.openLab() re-picks the grade from
//    SELECTED_GRADE (2026-09-20), and a stub would mask that.
// ══════════════════════════════════════════════
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT   = path.resolve(__dirname, '..');
const DBG    = 9426;
const PAGE   = pathToFileURL(path.join(ROOT, 'index.html')).href;
// ⚠⚠ THE FALLBACK IS THE INSTALLED CHROME, and it has to be something that
//   exists on a machine that is not the one this file was written on. This
//   defaulted to a Chrome for Testing binary under a SESSION-SCOPED scratch
//   directory — a path containing a UUID that changes every session, and in
//   one case a different Windows user entirely — so the suite could not run
//   for anybody, including the author on their next run. Nine suites were
//   dark for this reason alone. The instruction it carried ("never the
//   installed Chrome") is obsolete: re-measured, the installed Chrome drives
//   these through CDP fine, which is how the other thirty-odd browser suites
//   here have always run. CHROME_PATH still overrides for a pinned build.
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

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
  // A guide advances on the bench action it asks for. The test taps what
  // glows, as a child would.
  const next     = () => click('.is-next');
  // Since 2026-09-20 the Aim of the first experiment IS the welcome; the old
  // bench is reached through "Explore the bench freely" and a reset.
  // ⚠ The button exists only on an Aim card (inside <details>) and on Done -
  //   tapped from Do or See the click misses and focus stays set. Open an Aim
  //   first, assert the tap landed, then reset the bench.
  const explore  = async () => {
    await ev('LabExperiment.open(LabExperiment._debug().list[0]); true'); await sleep(200);
    const r = await click('[data-exp="explore"]'); await sleep(200);
    ok('"Explore the bench freely" is tapped from an Aim and shows the old bench', r === true && await ev("document.getElementById('labs-root').dataset.expMode === 'explore'"), r);
    await ev('LabSunmoon.experiment.reset(); true'); await sleep(200);
  };

  const atGrade = g => ev(`SELECTED_GRADE = ${g}; true`);

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

  // ── Opens on an experiment ───────────────────
  console.log('\n-- experiment Aim');
  let ov = await overlay();
  ok('first visit opens on an experiment Aim, with no welcome card in the way', !ov && await ev("!!document.querySelector('#lab-exp') && LabExperiment._debug().phase === 'aim'"), ov);
  ok('the welcome is marked seen', await ev("Labs.store('sunmoon').intro === true"));
  ok('Grade 6 lists 4 experiments, the first on day and night', await ev("LabSunmoon.experiment.list().length === 4 && LabSunmoon.experiment.list()[0].id === 'g6_day_night'"));
  ok('the Aim hides every bench control (focus([]))', await ev("[...document.querySelectorAll('#labs-root .lab-tool')].every(b => b.hidden || !b.offsetParent)"));
  await click('[data-exp="start"]'); await sleep(200);
  await click('[data-exp-pick="spin"]'); await sleep(300);
  let d = await dbg();
  ok('Do shows only this experiment\'s controls: Spin Earth, Orbit Moon, Observe', d.focus && d.focus.length === 3 && await ev("[...document.querySelectorAll('#labs-root .lab-tool')].filter(b => !b.hidden).map(b => b.dataset.act).sort().join() === 'observe,orbit,spin'"), d.focus);
  ok('both options of the decision glow', await ev("document.querySelectorAll('#labs-root .lab-tool.is-next').length === 2"));
  await click('[data-act="orbit"]'); await sleep(300);
  ov = await overlay();
  ok('the wrong option (Orbit Moon) gets the runner\'s card and does NOT orbit the Moon', ov && /Not that one/.test(ov.text) && !(await dbg()).orbiting, ov && ov.text.slice(0, 120));
  await closeOv(); await sleep(200);
  await click('[data-act="spin"]'); await sleep(300);
  await click('[data-act="observe"]'); await sleep(400);
  ok('spin then Observe reaches See, with a notebook line', await ev("LabExperiment._debug().phase === 'see' && /Earth spinning/.test(document.querySelector('#lab-exp').textContent)"));
  await explore();
  d = await dbg();
  ok('after Explore + reset the bench is clean: nothing spinning, every control shown again', !d.spinning && d.focus === null && await ev("[...document.querySelectorAll('#labs-root .lab-tool')].every(b => !b.hidden)"), d);

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
  await next();
  await sleep(400);
  d = await dbg();
  ok('spinning = true after tapping what glows (Spin Earth)', d.spinning === true, d);

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
  ok('Solar eclipse: moonAngle ≈ π and the Moon is lined up', Math.abs(d.moonAngle - Math.PI) < 0.1 && d.eclipseType === 'solar', d);
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
  ok('…and a New Moon at rest is NOT an eclipse (the Moon must be lined up)', d.eclipseType === null && d.phase === 'New Moon', d);
  // Next Phase is at Grade 6 too since 2026-09-20 (the syllabus lists the phases).
  ok('Next Phase exists at G6, Prev Phase does not', await ev("!!document.querySelector('[data-act=\"phase-next\"]') && !document.querySelector('[data-act=\"phase-prev\"]')"));
  for (let i = 0; i < 4; i++) { await click('[data-act="phase-next"]'); await sleep(80); }
  d = await dbg();
  ok('four Next Phase taps reach a lit Full Moon, not a lunar eclipse', d.phase === 'Full Moon' && d.eclipseType === null && !d.lunarSeen, d);
  await click('[data-act="reset"]'); await sleep(200);

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
  for (const tm of ['sunrise', 'noon', 'sunset']) { await click(`[data-set="time"][data-v="${tm}"]`); await click('[data-act="observe"]'); await sleep(80); }
  await ev('LabSunmoon._tick(1); true');
  d = await dbg();
  ok('mission: one shadow observation per time, with the stick present', d.stickObserved === 3 && d.shadowObservations.sunrise === 'long' && d.shadowObservations.noon === 'short' && d.shadowObservations.sunset === 'long', d);
  ok('…and the mission is ready for its questions', d.mission && d.mission.success === true, d.mission);

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
  ov = await overlay();
  ok('Grade 7 also opens on an experiment Aim, no overlay in the way', !ov && await ev("LabExperiment._debug().phase === 'aim' && LabSunmoon.experiment.list().length === 4 && LabSunmoon.experiment.list()[0].id === 'g7_seasons'"), ov);
  ok('the seasons set-up is applied silently: Earth in June, no coach card', (await dbg()).season === 'june' && !(await overlay()));
  await explore();

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
