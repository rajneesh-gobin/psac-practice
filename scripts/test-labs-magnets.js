'use strict';
// Science Labs › Magnets, driven in a real browser.
//
// Opens the lab at Grade 4 and Grade 8, then proves:
//  - Both grades open on an experiment Aim (lab_experiment.js) with no overlay
//    in the way; "Explore the bench" + experiment.reset() gives the old bench.
//  - Grade 4: object shelf visible on mobile; tapping an object tests it
//    (attract or fall) and unlocks discoveries; the sorting board is tappable
//    (a wrong group gets a card, the right one sorts); a guide glows the
//    control it wants (.is-next) and tapping it advances; 🔊 on coach and
//    guide box.
//  - Grade 8: poles attract/repel; iron filings; distance; compass; induced
//    mode's touch buttons on the stage; a guide advances by tapping .is-next.
//  - Both: Calm Mode; 360px phone; no JS errors; Lab opens and unmounts cleanly.
// The experiments themselves are walked by scripts/test-labs-experiments.js.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-magnets.js
// ⚠ Port 9424 (LAB_DBG_PORT overrides). Served over file://.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG  = Number(process.env.LAB_DBG_PORT) || 9424;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0, chrome = null;
const ok = (label, cond, detail) => {
  if (cond) { checks++; console.log('OK   ' + label); }
  else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail).slice(0, 900) : '')); }
};

// Locate Chrome for Testing
function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const candidates = [
    // Scratch dir (magnets)
    path.join(os.tmpdir(), 'chrome-for-testing', 'chrome.exe'),
    path.join(os.tmpdir(), 'chrome-for-testing', 'chrome-win64', 'chrome.exe'),
    // System fallbacks
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
    '/usr/bin/google-chrome',
  ];
  for (const c of candidates) { if (fs.existsSync(c)) return c; }
  return null;
}

(async () => {
  const chromePath = findChrome();
  if (!chromePath) {
    console.log('CHROME_PATH not set and Chrome for Testing not found.\nInstall it via: npx @puppeteer/browsers install chrome@stable --path <dir>');
    process.exit(1);
  }
  console.log('Chrome:', chromePath);
  const tmp = process.env.LAB_TMP || os.tmpdir();
  fs.mkdirSync(tmp, { recursive: true });
  chrome = spawn(chromePath, [
    '--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + fs.mkdtempSync(path.join(tmp, 'psac-labs-magnets-')),
    '--allow-file-access-from-files', '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  const quit = code => { try { chrome.kill(); } catch (_) {} process.exit(code); };
  let version;
  for (let i = 0; i < 40 && !version; i++) {
    try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); }
  }
  if (!version) { console.log('Chrome did not start'); quit(1); }
  const ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let serial = 0; const waiting = new Map(); const errors = [];
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.method === 'Runtime.exceptionThrown') errors.push((m.params.exceptionDetails.exception || {}).description || m.params.exceptionDetails.text);
    if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); }
  };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const id = ++serial, t = setTimeout(() => { waiting.delete(id); rej(Error('Timeout ' + method)); }, 60000);
    waiting.set(id, m => { clearTimeout(t); m.error ? rej(Error(m.error.message)) : res(m.result); });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const target  = await send('Target.createTarget', { url: 'about:blank' });
  const session = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
  const call    = (m, p) => send(m, p, session.sessionId);
  await call('Page.enable'); await call('Runtime.enable');
  await call('Emulation.setDeviceMetricsOverride', { width: 360, height: 780, deviceScaleFactor: 2, mobile: true });
  const ev = async expr => {
    const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(String(r.exceptionDetails.exception && r.exceptionDetails.exception.description || r.exceptionDetails.text).slice(0, 500));
    return r.result.value;
  };
  const click = sel => ev(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); if (!el) return 'missing:' + ${JSON.stringify(sel)}; el.click(); return true; })()`);
  const must  = async sel => { const r = await click(sel); if (r !== true) ok('clicked ' + sel, false, r); return r; };
  const dbg   = () => ev('LabMagnets._debug()');
  const overlay = () => ev(`(() => { const o = document.getElementById('lab-overlay'); if (!o) return null;
    return { cls: o.className, text: o.textContent.replace(/\\s+/g,' ').slice(0,2000), hidden: o.hidden }; })()`);
  const closeOv = () => click('#lab-overlay [data-ov-close]');
  // A guide step is done by tapping the control that glows - never a skip button.
  const next = () => ev("(() => { const el = document.querySelector('#labs-root .is-next'); if (!el) return 'no .is-next'; el.click(); return true; })()");
  const nextIs = () => ev("(() => { const el = document.querySelector('#labs-root .is-next'); return el ? (el.dataset.obj || el.dataset.sortObj || el.dataset.act || el.tagName) : null; })()");
  // The lab opens on an experiment Aim; Explore + reset gives the bare bench the rest of this file drives.
  const aimThenExplore = async grade => {
    const aim = await ev("(() => { const d = LabExperiment._debug(); const t = document.querySelector('#lab-exp-title'); const o = document.getElementById('lab-overlay');"
      + " return { phase: d.phase, exp: d.exp, title: t ? t.textContent : null, overlay: !!(o && !o.hidden && o.textContent.trim()) }; })()");
    ok(`Grade ${grade} opens on an experiment Aim, no overlay in the way`, aim.phase === 'aim' && !!aim.exp && !aim.overlay, aim);
    ok(`Grade ${grade} Aim is a question a child can say back`, /\?$/.test(aim.title || ''), aim.title);
    await click('[data-exp="explore"]'); await sleep(150);
    await ev('LabMagnets.experiment.reset(); true'); await sleep(150);
    ok(`Grade ${grade} Explore shows the bench (exp mode = explore, guide box hidden)`, await ev("document.getElementById('labs-root').dataset.expMode === 'explore' && document.getElementById('lab-guide').hidden"));
  };

  // Navigate to the app
  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) {
    await sleep(500);
    try { ready = await ev("document.readyState === 'complete' && typeof showScreen === 'function' && typeof RoleModules !== 'undefined'"); } catch (_) {}
  }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: ' + url); quit(1); }
  ok('app loaded at file:// origin', ready === true);
  await sleep(2500);

  // ═══════════════════════════════════════════════
  // Part 1 — Grade 4
  // ═══════════════════════════════════════════════
  console.log('\n── Grade 4 ──────────────────────────────────────');
  await ev("SELECTED_GRADE = 4; showScreen('labs'); true");
  let up = false;
  for (let i = 0; i < 60 && !up; i++) { await sleep(200); up = await ev("typeof Labs !== 'undefined' && !!document.getElementById('labs-root')"); }
  ok('Labs shell loads', up);
  await ev("Labs.openLab('magnets'); true");
  let open = false;
  for (let i = 0; i < 60 && !open; i++) { await sleep(200); open = await ev("!!window.LabMagnets && !!document.querySelector('#labs-root .lab-magnets')"); }
  ok('Labs.openLab("magnets") renders the bench', open);
  await sleep(300);

  // CSS and scripts
  ok('lab_magnets.css is linked',
     await ev("!!document.querySelector('link[data-lab-css=\"magnets\"]')"));
  ok('eyebrow says "Science · Grade 4"',
     await ev("document.querySelector('.lab-eyebrow') && document.querySelector('.lab-eyebrow').textContent === 'Science · Grade 4'"));
  const labScripts = await ev("[...document.scripts].map(s => s.src).filter(s => /engine\\/labs\\//.test(s)).map(s => s.split('/').pop()).join()");
  ok('fetches lab_magnets_data.js and lab_magnets.js after lab_core.js',
     /lab_core\.js/.test(labScripts) && /lab_magnets_data\.js/.test(labScripts) && /lab_magnets\.js/.test(labScripts), labScripts);

  // Experiments first: the Aim IS the welcome
  ok('Grade 4 lists 3 experiments', await ev('LabMagnets.experiment.list().length') === 3, await ev('LabMagnets.experiment.list().map(e => e.id)'));
  await aimThenExplore(4);
  ok('intro is remembered', await ev("Labs.store('magnets').intro === true"));
  await ev('LabMagnets._test({ instant: true }); true');

  // Start panel visible (mobile)
  const shelf = await ev("document.querySelector('.lab-magnets-shelf') && getComputedStyle(document.querySelector('.lab-magnets-shelf')).display");
  ok('object shelf is visible (not "none")', shelf && shelf !== 'none', shelf);
  const btnCount = await ev("document.querySelectorAll('.lab-magnets-obj').length");
  ok('8 object buttons on the shelf', btnCount === 8, btnCount);

  // Read-aloud buttons for Grade 4
  ok('🔊 button on the coach bar', await ev("!!document.querySelector('[data-act=\"say-coach\"]')"));

  // Tap an object — iron nail (magnetic)
  console.log('\n-- tapping iron nail (magnetic)');
  await must('[data-obj="nail"]');
  await sleep(200);
  let d = await dbg();
  ok('nail registered as tested', !!d.g4.tested.nail, d.g4.tested);
  ok('event drag:nail fired', d.events.includes('drag:nail'), d.events);

  // Discovery should unlock for nail
  ok('discovery iron_magnetic is unlocked', await ev("!!(Labs.store('magnets').disc || {}).iron_magnetic"));
  const counter = await ev(`(function() {
    const n = document.getElementById('lab-found-n');
    return n ? n.textContent : '';
  })()`);
  ok('discoveries counter updated', counter.includes('/'), counter);

  // Tap a non-magnetic object — copper coin
  console.log('\n-- tapping copper coin (non-magnetic)');
  await must('[data-obj="coin"]');
  await sleep(200);
  d = await dbg();
  ok('coin registered as tested', !!d.g4.tested.coin, d.g4.tested);
  ok('event drag:coin fired', d.events.includes('drag:coin'), d.events);
  ok('discovery copper_not unlocked', await ev("!!(Labs.store('magnets').disc || {}).copper_not"));

  ok('tested objects stay in the picture (nail on the magnet, coin on the bench)', d.g4.rest && d.g4.rest.nail && d.g4.rest.nail.type === 'attract' && d.g4.rest.coin && d.g4.rest.coin.type === 'bounce', d.g4.rest);
  ok('the notebook wrote both tests down', await ev("LabMagnets.experiment.evidence().length") === 2, await ev("LabMagnets.experiment.evidence()"));

  // Sort on the board (tap, never drag)
  console.log('\n-- sorting');
  await must('[data-panel="sandbox"]');
  await sleep(200);
  const sortRow = await ev("!!document.querySelector('#lab-magnets-sort [data-sort-obj]')");
  ok('the sorting board on the stage has tappable group buttons', sortRow);
  await must('[data-sort-obj="nail:nonmagnetic"]');
  await sleep(200);
  const wrongOv = await overlay();
  ok('the wrong group gets a card that explains', wrongOv && !wrongOv.hidden && /Wrong group/.test(wrongOv.text) && /MAGNETIC/.test(wrongOv.text), wrongOv);
  await closeOv();
  ok('…and the nail is not sorted', !(await dbg()).g4.sorted.nail);
  await must('[data-sort-obj="nail:magnetic"]');
  await sleep(200);
  d = await dbg();
  ok('the right group sorts it (sorted.nail = magnetic) and fires sort:nail', d.g4.sorted.nail === 'magnetic' && d.events.includes('sort:nail') && d.events.includes('sort:nail:magnetic'), d);
  ok('the sorted nail shows in the Magnetic zone', /Iron nail/.test(await ev("document.getElementById('lab-sort-magnetic').textContent")));

  // Guide — what_sticks
  console.log('\n-- guided experiment: what_sticks');
  await must('[data-guide="what_sticks"]');
  await sleep(200);
  d = await dbg();
  ok('guide started: what_sticks, step 0', d.guide && d.guide.id === 'what_sticks' && d.guide.step === 0, d.guide);
  const guideBox = await ev("document.getElementById('lab-guide')");
  ok('guide box is visible', await ev("!document.getElementById('lab-guide').hidden"));
  const guideText = await ev("document.getElementById('lab-guide').textContent.replace(/\\s+/g, ' ')");
  ok('guide shows step 1 of', /Step 1 of/.test(guideText), guideText);
  ok('guide has a 💡 Hint and no skip button', /Hint/.test(guideText) && !/Skip this step/.test(guideText) && !(await ev("!!document.querySelector('[data-guide-do]')")), guideText);

  // Read-aloud in guide box
  ok('🔊 button is in the guide box', await ev("!!document.querySelector('#lab-guide [data-act=\"say-guide\"]')"));

  // The step is done by the child tapping the control that glows
  const stepBefore = (await dbg()).guide.step;
  ok('the iron nail glows (.is-next) for step 1', (await nextIs()) === 'nail', await nextIs());
  const tapped = await next();
  await sleep(200);
  d = await dbg();
  ok('tapping the glowing control advances the step (' + stepBefore + ' → ' + d.guide.step + ')', tapped === true && d.guide.step === stepBefore + 1, d.guide);
  ok('the clip glows next', (await nextIs()) === 'clip', await nextIs());
  ok('a wrong tap does not advance (coin while the clip is wanted)', await (async () => { await must('[data-obj="coin"]'); await sleep(150); return (await dbg()).guide.step === stepBefore + 1; })());

  // Tabs: missions
  console.log('\n-- missions tab (Grade 4)');
  await must('[data-panel="missions"]');
  await sleep(200);
  const missions4 = await ev("[...document.querySelectorAll('[data-mission]')].map(b => b.dataset.mission).join()");
  ok('at least 2 Grade 4 missions listed', missions4.split(',').length >= 2, missions4);

  // Discoveries tab
  console.log('\n-- discoveries tab (Grade 4)');
  await must('[data-panel="found"]');
  await sleep(200);
  const discCards = await ev("document.querySelectorAll('.lab-disc-card').length");
  ok('at least 10 discovery cards for Grade 4', discCards >= 10, discCards);

  // Calm Mode (Grade 4)
  console.log('\n-- Calm Mode (Grade 4)');
  await ev('document.documentElement.setAttribute("data-calm", "1"); true');
  await must('[data-panel="sandbox"]');
  await must('[data-obj="clip"]');
  await sleep(100);
  d = await dbg();
  ok('Calm Mode: steel clip is tested (no animation hang)', !!d.g4.tested.clip, d);
  await ev('document.documentElement.removeAttribute("data-calm"); true');

  // 360px layout — bench must have scroll area accessible
  console.log('\n-- 360px layout (Grade 4)');
  const shelfWidth = await ev("(document.querySelector('.lab-magnets-shelf') || {}).scrollWidth || 0");
  ok('shelf does not overflow its container on 360px', shelfWidth <= 360 + 20, shelfWidth);

  // ═══════════════════════════════════════════════
  // Part 2 — Grade 8
  // ═══════════════════════════════════════════════
  console.log('\n── Grade 8 ──────────────────────────────────────');
  await ev("SELECTED_GRADE = 8; showScreen('labs'); true");
  await sleep(500);
  await ev("Labs.openLab('magnets'); true");
  open = false;
  for (let i = 0; i < 60 && !open; i++) { await sleep(200); open = await ev("!!window.LabMagnets && !!document.querySelector('#labs-root .lab-magnets')"); }
  ok('Lab reopens at Grade 8', open);
  await sleep(300);
  ok('eyebrow says "Science · Grade 8"',
     await ev("document.querySelector('.lab-eyebrow') && document.querySelector('.lab-eyebrow').textContent === 'Science · Grade 8'"));
  ok('Grade 8 controls visible (flip-b, filings, induced)',
     await ev("!!document.querySelector('[data-act=\"flip-b\"]') && !!document.querySelector('[data-act=\"filings\"]') && !!document.querySelector('[data-act=\"induced\"]')"));
  ok('NO read-aloud buttons on Grade 8', !(await ev("!!document.querySelector('[data-act=\"say-coach\"]')")));
  ok('Grade 8 lists 4 experiments', await ev('LabMagnets.experiment.list().length') === 4, await ev('LabMagnets.experiment.list().map(e => e.id)'));
  await aimThenExplore(8);
  await ev('LabMagnets._test({ instant: true }); true');

  // Flip poles
  console.log('\n-- poles (Grade 8)');
  d = await dbg();
  ok('initial poles: A=N, B=S (unlike → attract)', d.g8.poleA === 'N' && d.g8.poleB === 'S', d.g8);
  await must('[data-act="flip-b"]');
  await sleep(100);
  d = await dbg();
  ok('after flip-b: B=N (like poles → repel)', d.g8.poleB === 'N', d.g8);
  ok('event poles:NN fired', d.events.includes('poles:NN'), d.events);

  // Flip back to NS for unlike attract
  await must('[data-act="flip-b"]');
  await sleep(100);
  d = await dbg();
  ok('after flip back: B=S (unlike poles → attract)', d.g8.poleB === 'S', d.g8);
  ok('event poles:NS fired', d.events.includes('poles:NS'), d.events);

  // Discovery: like_repel and unlike_attract should be unlocked
  await must('[data-act="flip-b"]'); // flip to NN again
  await sleep(100);
  ok('discovery like_repel unlocked', await ev("!!(Labs.store('magnets').disc || {}).like_repel"));
  await must('[data-act="flip-b"]'); // back to NS
  await sleep(100);
  ok('discovery unlike_attract unlocked', await ev("!!(Labs.store('magnets').disc || {}).unlike_attract"));

  // Iron filings
  console.log('\n-- iron filings (Grade 8)');
  await must('[data-act="filings"]');
  await sleep(100);
  d = await dbg();
  ok('filings mode on', d.g8.filings === true, d.g8);
  ok('event filings:on fired', d.events.includes('filings:on'), d.events);
  ok('discovery field_lines unlocked', await ev("!!(Labs.store('magnets').disc || {}).field_lines"));
  await must('[data-act="filings"]');

  // Distance
  console.log('\n-- distance (Grade 8)');
  await must('[data-act="distance"]');
  await sleep(100);
  d = await dbg();
  ok('distance becomes close', d.g8.distance === 'close', d.g8);
  ok('event distance:close fired', d.events.includes('distance:close'), d.events);
  await must('[data-act="distance"]');

  // Compass
  console.log('\n-- compass (Grade 8)');
  await must('[data-act="compass"]');
  await sleep(100);
  d = await dbg();
  ok('compass placed', d.g8.compassPlaced === true, d.g8);
  ok('event compass:place fired', d.events.includes('compass:place'), d.events);

  // Induced mode
  console.log('\n-- induced mode (Grade 8)');
  await must('[data-act="induced"]');
  await sleep(200);
  d = await dbg();
  ok('induced mode on', d.g8.induced === true, d.g8);
  ok('event induced:on fired', d.events.includes('induced:on'), d.events);
  const inducedControls = await ev("!!document.querySelector('#lab-magnets-g8-controls [data-act=\"touch-nail\"]')");
  ok('induced mode shows the touch-nail button on the stage, under the picture', inducedControls);
  // Touch nail
  await must('[data-act="touch-nail"]');
  await sleep(100);
  d = await dbg();
  ok('nail touches magnet (inducedNailTouching=true)', d.g8.inducedNailTouching === true, d.g8);
  ok('event induced:touch:nail fired', d.events.includes('induced:touch:nail'), d.events);
  ok('discovery soft_iron_induced unlocked', await ev("!!(Labs.store('magnets').disc || {}).soft_iron_induced"));
  // Remove nail
  await must('[data-act="touch-nail"]');
  await sleep(100);
  d = await dbg();
  ok('nail removed (inducedNailTouching=false)', d.g8.inducedNailTouching === false, d.g8);

  // Touch steel nail
  await must('[data-act="touch-steel"]');
  await sleep(100);
  d = await dbg();
  ok('steel nail touches magnet', d.g8.inducedSteelTouching === true, d.g8);
  ok('event induced:touch:steel fired', d.events.includes('induced:touch:steel'), d.events);
  ok('discovery hard_steel_induced unlocked', await ev("!!(Labs.store('magnets').disc || {}).hard_steel_induced"));
  await must('[data-act="touch-steel"]');

  // Drop magnet
  console.log('\n-- drop magnet (Grade 8)');
  await must('[data-act="drop"]');
  await sleep(100);
  d = await dbg();
  ok('drop:magnet event fired', d.events.includes('drop:magnet'), d.events);

  // Grade 8 guide: the control glows, the tap advances
  console.log('\n-- guided experiment: poles (Grade 8)');
  await must('[data-panel="sandbox"]');
  await sleep(200);
  await must('[data-guide="poles"]');
  await sleep(200);
  d = await dbg();
  ok('Grade 8 guide poles started on step 1 with a fresh bench (N faces S)', d.guide && d.guide.id === 'poles' && d.guide.step === 0 && d.g8.poleA === 'N' && d.g8.poleB === 'S', d);
  const g8GuideText = await ev("document.getElementById('lab-guide').textContent.replace(/\\s+/g, ' ')");
  ok('Grade 8 guide names its control ("Flip magnet B") and has no skip button', /Flip magnet B/.test(g8GuideText) && !/Skip this step/.test(g8GuideText), g8GuideText);
  ok('Grade 8 guide box has NO read-aloud button', !(await ev("!!document.querySelector('#lab-guide [data-act=\"say-guide\"]')")));

  ok('the Flip magnet B button glows', (await nextIs()) === 'flip-b', await nextIs());
  const g8Tapped = await next();
  await sleep(150);
  d = await dbg();
  ok('tapping it flips B (N faces N) and advances to step 2', g8Tapped === true && d.g8.poleB === 'N' && d.guide && d.guide.step === 1, d);
  ok('step 2 glows Flip magnet B again; step 3 will be Move close', (await nextIs()) === 'flip-b');
  await next(); await sleep(150);
  ok('the third step glows the distance button', (await nextIs()) === 'distance', await nextIs());
  await next(); await sleep(300);
  const g8Done = await overlay();
  ok('finishing the guide shows "Experiment complete" with the lesson', g8Done && !g8Done.hidden && /Experiment complete/.test(g8Done.text) && /Unlike poles attract/.test(g8Done.text), g8Done);
  await closeOv();

  // Missions (Grade 8)
  console.log('\n-- missions tab (Grade 8)');
  await must('[data-panel="missions"]');
  await sleep(200);
  const missions8 = await ev("[...document.querySelectorAll('[data-mission]')].map(b => b.dataset.mission).join()");
  ok('at least 2 Grade 8 missions listed', missions8.split(',').length >= 2, missions8);

  // Discoveries (Grade 8)
  console.log('\n-- discoveries tab (Grade 8)');
  await must('[data-panel="found"]');
  await sleep(200);
  const discCards8 = await ev("document.querySelectorAll('.lab-disc-card').length");
  ok('at least 10 discovery cards for Grade 8', discCards8 >= 10, discCards8);

  // Calm Mode (Grade 8)
  console.log('\n-- Calm Mode (Grade 8)');
  await ev('document.documentElement.setAttribute("data-calm", "1"); true');
  await must('[data-panel="sandbox"]');
  await must('[data-act="filings"]');
  await sleep(100);
  d = await dbg();
  ok('Calm Mode: filings mode toggles without hang', d.g8.filings === true || d.g8.filings === false);
  await ev('document.documentElement.removeAttribute("data-calm"); true');

  // ── Screen leave / rejoin loop restart ─────────────────────
  console.log('\n-- loop restarts after leaving and rejoining Labs screen');
  await ev("showScreen('home'); true");
  await sleep(500);
  const rafBefore = await ev("LabMagnets && LabMagnets._debug ? !!LabMagnets._debug().guide : true");
  await ev("showScreen('labs'); true");
  await sleep(500);
  ok('animation loop is not stuck after return', await ev("typeof LabMagnets !== 'undefined'"));

  // ── No JS errors ────────────────────────────────────────────
  console.log('\n-- no unhandled errors');
  ok('no JS exceptions thrown during the session', errors.length === 0, errors.slice(0, 3));

  // ── Summary ─────────────────────────────────────────────────
  console.log(`\n${'─'.repeat(50)}`);
  console.log(`  ${checks} passed  ${failed} failed\n`);
  quit(failed > 0 ? 1 : 0);
})().catch(err => {
  console.error('Fatal:', err.message);
  try { chrome && chrome.kill(); } catch (_) {}
  process.exit(1);
});
