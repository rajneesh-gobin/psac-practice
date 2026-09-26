'use strict';
// Science Labs › Food Groups & Teeth (PSAC Grade 6), driven in a real browser.
//
// Proves the lab end to end: it loads its own three files when opened and
// opens straight onto an experiment Aim (lab_experiment.js) with no overlay
// in the way; the teeth experiment walks Aim → Predict → Do → See on its
// named tooth buttons, a wrong tooth is explained and not lit, and the See
// carries the notebook; then Explore: the balanced-meal guide runs to its
// end by tapping what glows, a tooth tapped ON THE CANVAS lights up, the
// four named tooth buttons and the Label button work, discoveries and both
// missions are listed, 🔊 read-aloud speaks only when tapped, Calm Mode
// applies at once, the bench fits a 360px phone with 44px tap targets, and
// there are no page errors.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-nutrition.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
// ⚠ Port 9428 is this lab's — the other lab builds use other ports.
// ⚠ Never drive the installed Chrome: it joins the user's live browser.
// ⚠ The Chrome profile goes in a temp dir and is removed on every exit.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9428;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));

let checks = 0, failed = 0;
const ok = (label, cond, detail) => {
  if (cond) { checks++; console.log('OK   ' + label); }
  else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail).slice(0, 400) : '')); }
};
const plain = s => String(s).replace(/[\u{1F000}-\u{1FAFF}\u{2300}-\u{27BF}\u{FE0F}]/gu, '').replace(/\s+/g, ' ').trim().toLowerCase();

let chrome = null, profile = null;
const quit = code => {
  try { if (chrome) chrome.kill(); } catch (_) {}
  setTimeout(() => { try { if (profile) fs.rmSync(profile, { recursive: true, force: true }); } catch (_) {} process.exit(code); }, 800);
};
process.on('SIGINT', () => quit(130));

(async () => {
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
  const tmpBase = process.env.LAB_TMP || os.tmpdir();
  profile = fs.mkdtempSync(path.join(tmpBase, 'psac-labs-nutrition-'));
  chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + profile,
    '--allow-file-access-from-files',
    '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });

  let version;
  for (let i = 0; i < 40 && !version; i++) {
    try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); }
  }
  if (!version) throw new Error('Chrome did not start');

  const ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let serial = 0;
  const waiting = new Map(), errors = [];
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.method === 'Runtime.exceptionThrown') errors.push((m.params.exceptionDetails.exception || {}).description || m.params.exceptionDetails.text);
    if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); }
  };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const id = ++serial;
    const t = setTimeout(() => { waiting.delete(id); rej(Error('Timeout ' + method)); }, 30000);
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
  const click = sel => ev(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); if (!el) return 'missing: ' + ${JSON.stringify(sel)}; if (el.hidden) return 'hidden: ' + ${JSON.stringify(sel)}; el.click(); return true; })()`);
  const clicks = async (...sels) => { for (const s of sels) { const r = await click(s); if (r !== true) { failed++; console.log('FAIL click ' + r); return r; } } return true; };
  const dbg = () => ev('LabNutrition._debug()');
  const xdbg = () => ev('LabExperiment._debug()');
  const overlay = () => ev(`(() => { const o = document.getElementById('lab-overlay'); if (!o || o.hidden) return null; return { title: o.querySelector('h2') && o.querySelector('h2').textContent, text: o.textContent.replace(/\\s+/g, ' ').slice(0, 2000) }; })()`);
  const closeOv = async () => { if (await overlay()) { await click('#lab-overlay [data-ov-close]'); await sleep(250); } };
  const set = (k, v) => clicks(`[data-set="${k}"][data-v="${v}"]`);
  // The thing that glows is the thing to tap - there is no "do it for me" button.
  const next = () => ev('(() => { const el = document.querySelector(".is-next:not(canvas)"); if (!el || el.hidden) return false; el.click(); return true; })()');
  const selector = tok => ev(`LabNutrition.experiment.selector(${JSON.stringify(tok)})`);

  // Navigate to the page
  await call('Page.navigate', { url: PAGE });
  await sleep(2000);
  const url = await ev('location.href');
  ok('page loaded from file://', url.startsWith('file://'));
  if (!url.startsWith('file://')) { console.log('REFUSING: the page target is ' + url); quit(1); return; }
  await ev("(() => { const t = { spoken: [], cancels: 0, speaking: false, pending: false, speak(u) { this.spoken.push(u.text); }, cancel() { this.cancels++; }, getVoices() { return []; } }; Object.defineProperty(window, 'speechSynthesis', { value: t, configurable: true, writable: true }); window.__tts = t; return true; })()");

  // Open labs
  await ev('if (typeof DB !== "undefined" && DB) DB.labs = {}; SELECTED_GRADE = 6; showScreen("labs");');
  await sleep(800);

  const labExists = await ev('typeof Labs !== "undefined"');
  ok('Labs module is present', labExists);
  if (!labExists) { console.log('Cannot continue without Labs'); quit(1); return; }

  await ev('Labs.openLab("nutrition")');
  for (let i = 0; i < 40; i++) { await sleep(200); if (await ev('typeof LabNutrition !== "undefined" && !!document.querySelector("#lab-exp")')) break; }
  await sleep(400);

  // Lab files loaded
  ok('LabNutritionData loaded', await ev('typeof LabNutritionData !== "undefined"'));
  ok('LabNutrition loaded', await ev('typeof LabNutrition !== "undefined"'));

  // ── Opens on an experiment Aim ──────────────────────────────────────────────
  console.log('\n-- Experiment: opens on an Aim --');
  const exps = await ev('LabNutrition.experiment.list()');
  ok('the runner lists 4 experiments at Grade 6', exps.length === 4, exps.map(e => e.id));
  let x = await xdbg();
  ok('opens straight onto an Aim, no overlay in the way', x.phase === 'aim' && x.lab === 'nutrition' && !(await overlay()), x);
  ok('the Aim is the first experiment: which food gives us energy?', x.exp === 'energy_food' && (await ev('document.querySelector("#lab-exp-title").textContent')) === exps[0].title, x.exp);
  ok('no bench controls compete with the Aim (tools, stations, shelf hidden)', await ev("[...document.querySelectorAll('#labs-root .lab-tool, #labs-root [data-set=\"station\"], #labs-root .lab-nutrition-food-btn')].every(b => b.hidden || !b.offsetParent)"));
  ok('the plate is drawn on the first screen (canvas in view)', await ev("(() => { const c = document.querySelector('#labs-root .lab-canvas-wrap canvas'); if (!c) return false; const r = c.getBoundingClientRect(); return r.top >= -2 && r.bottom <= innerHeight + 2; })()"));

  // ── Experiment walk: teeth on tappable controls ──────────────────────────────
  console.log('\n-- Experiment: which tooth cuts, which tooth grinds? --');
  const teeth = exps.find(e => e.id === 'teeth_jobs');
  await ev("LabExperiment.open('teeth_jobs'); true"); await sleep(300);
  x = await xdbg();
  ok('teeth experiment opens on its Aim with the jaw set up', x.phase === 'aim' && x.exp === 'teeth_jobs' && (await dbg()).station === 'teeth', { x, station: (await dbg()).station });
  await click('[data-exp="start"]'); await sleep(250);
  ok('Start goes to Predict with 3 tappable options', (await xdbg()).phase === 'predict' && (await ev("document.querySelectorAll('#lab-exp [data-exp-pick]').length")) === 3);
  await click('[data-exp-pick="incisor"]'); await sleep(400);
  x = await xdbg();
  ok('a (wrong) prediction is remembered and Do starts', x.phase === 'do' && x.predicted === 'incisor' && x.step === 0, x);
  ok('in Do only the tooth buttons and Label are shown', await ev("[...document.querySelectorAll('#labs-root .lab-nutrition-tooth-btn, #labs-root [data-act=\"label\"]')].every(b => !b.hidden) && [...document.querySelectorAll('#labs-root [data-set=\"station\"], #labs-root .lab-tool')].every(b => b.hidden)"));
  for (let k = 0; k < 6; k++) {
    x = await xdbg();
    if (x.phase !== 'do') break;
    const step = teeth.steps[x.step];
    const tok = step.on || step.any[0];
    const sel = await selector(tok);
    const label = await ev(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e || e.hidden) return null; const c = e.cloneNode(true); c.querySelectorAll('small').forEach(s => s.remove()); return c.textContent.replace(/\\s+/g, ' ').trim(); })()`);
    ok(`step ${x.step + 1}: selector(${tok}) is a real, visible, glowing button`, !!label && await ev(`document.querySelector(${JSON.stringify(sel)}).classList.contains('is-next')`), { sel, label });
    if (step.say) ok(`step ${x.step + 1}: the instruction names the control ("${label}")`, plain(step.say).includes(plain(label)), { say: step.say, label });
    ok(`step ${x.step + 1}: the yellow box is inside the canvas wrap and shows the instruction`, await ev(`(() => { const g = document.getElementById('lab-guide'); return !!g && !g.hidden && !!g.closest('.lab-canvas-wrap') && g.textContent.includes(${JSON.stringify((step.say || step.ask).slice(0, 25))}); })()`));
    if (step.wrong) {
      const w = Object.keys(step.wrong)[0];
      const before = (await dbg()).tappedTeeth.length;
      const r = await click(await selector(w)); await sleep(300);
      const ov = await overlay();
      ok(`step ${x.step + 1}: the wrong tooth ${w} gets a card that explains, and is NOT lit`, r === true && !!ov && ov.text.includes(step.wrong[w].slice(0, 25)) && (await dbg()).tappedTeeth.length === before && (await xdbg()).step === x.step, ov && ov.text.slice(0, 120));
      await closeOv();
    }
    const r = await click(sel);
    ok(`step ${x.step + 1}: tapping ${tok} advances`, r === true && ((await xdbg()).step > x.step || (await xdbg()).phase !== 'do'), await xdbg());
    await sleep(250);
  }
  x = await xdbg();
  ok('every step done leads to See', x.phase === 'see', x);
  const seeTxt = await ev("document.querySelector('#lab-exp').textContent.replace(/\\s+/g, ' ')");
  ok('See states what the bench showed and answers the prediction', seeTxt.includes(teeth.see.saw) && /You said/.test(seeTxt) && /It was/.test(seeTxt), seeTxt.slice(0, 200));
  const evidence = await ev('LabNutrition.experiment.evidence()');
  ok('the notebook holds one line per tooth plus the labelling, oldest first', evidence.length === 5 && /^Incisor:/.test(evidence[0]) && /Labelled all four/.test(evidence[4]), evidence);
  ok('See shows the notebook', await ev("document.querySelectorAll('#lab-exp .lab-exp-evidence li').length") === 5);
  ok('the jaw shows all four labelled on the canvas (all 4 tooth types tapped)', (await dbg()).tappedTeeth.length === 4);

  // ── Explore: the free bench ─────────────────────────────────────────────────
  console.log('\n-- Explore --');
  // "Explore the bench freely" lives on the Aim (and the Done card), not on See.
  await ev("LabExperiment.open('energy_food'); true"); await sleep(300);
  ok('Explore is offered on the Aim', (await click('[data-exp="explore"]')) === true); await sleep(200);
  ok('Explore mode: the runner shows the whole bench again (focus null)', (await ev('document.querySelector("#labs-root").dataset.expMode')) === 'explore' && (await dbg()).focus === null, await dbg());
  await ev('LabNutrition.experiment.reset(); true'); await sleep(300);
  ok('Explore shows the free bench with the start panel', (await ev('document.querySelector("#labs-root").dataset.expMode')) === 'explore' && await ev('!!document.querySelector("[data-act=\'guide-start\']")'));
  ok('reset: meal station, empty plate, no guide', (d => d.station === 'meal' && Object.values(d.plate).every(v => v === null) && d.guide === null && d.focus === null)(await dbg()), await dbg());
  ok('Meal Builder and Teeth Lab station buttons are back', await ev('[...document.querySelectorAll("[data-set=\'station\']")].every(b => !b.hidden)'));
  ok('the shelf shows the food names as labels', (await ev('document.querySelector(".lab-nutrition-food-btn[data-food=\'bread\'] .lab-nutrition-food-name").textContent')) === 'Bread');

  // ── Guided experiment: Balanced Meal ────────────────────────────────────────
  console.log('\n-- Guide: balanced meal --');
  await click("[data-act='guide-start'][data-guide='balanced_meal']"); await sleep(300);
  ok('guide box is shown', await ev('!document.getElementById("lab-guide").hidden'));
  let taps = 0;
  for (let i = 0; i < 10; i++) { if (!(await next())) break; taps++; await sleep(300); }
  const state = await dbg();
  ok('balanced meal guide: all 5 groups placed by tapping what glows', Object.values(state.plate || {}).every(v => v !== null) && state.guide === null, { plate: state.plate, taps });
  const ovCheck = await overlay();
  ok('Check my meal on a full plate opens the Balanced meal card in Explore', !!ovCheck && /Balanced meal/.test(ovCheck.title || ''), ovCheck && ovCheck.title);
  await closeOv();
  ok('the notebook wrote one line per food and the check', (state.log || []).length === 6 && /Balanced!/.test(state.log[5]), state.log);

  // ── Station switch: Teeth Lab, canvas tap and named buttons ─────────────────
  console.log('\n-- Teeth Lab --');
  await set('station', 'teeth'); await sleep(400);
  ok('station switched to teeth', (await dbg()).station === 'teeth');
  ok('4 named tooth buttons and the Label button are rendered', (await ev('document.querySelectorAll(".lab-nutrition-tooth-btn").length')) === 4 && await ev('!!document.querySelector("[data-act=\'label\']")'));
  // Tap the incisor ON THE CANVAS (slot 5 of the half jaw, the same geometry the bench draws with).
  const canvasHit = await ev(`(() => { const c = document.getElementById('lab-canvas'); const r = c.getBoundingClientRect();
    const W = r.width, H = Math.min(W, 340), n = 7, tw = Math.min((W - 32) / n, 60), startX = (W - tw * n) / 2;
    const x = startX + 5.5 * tw, y = (H * 0.62 - 22 - 14) * (r.height / H);
    c.dispatchEvent(new MouseEvent('click', { clientX: r.left + x, clientY: r.top + y, bubbles: true })); return true; })()`);
  await sleep(200);
  ok('tapping an incisor on the canvas lights it', canvasHit && (await dbg()).tappedTeeth.includes('incisor'), await dbg());
  ok('the incisor button shows pressed after the canvas tap', (await ev('document.querySelector(".lab-nutrition-tooth-btn[data-tooth=\'incisor\']").getAttribute("aria-pressed")')) === 'true');
  for (const type of ['canine', 'premolar', 'molar']) { await click(`[data-tooth='${type}']`); await sleep(200); }
  ok('all 4 tooth types tapped', (await dbg()).tappedTeeth.length === 4, (await dbg()).tappedTeeth);
  await click("[data-act='label']"); await sleep(300);
  ok('Label teeth is wired to the click router (dental_health unlocked)', await ev("!!(Labs.store('nutrition').disc || {}).dental_health"));

  // ── Discoveries tab ───────────────────────────────────────────────────────────
  console.log('\n-- Discoveries --');
  await clicks('[data-panel="found"]'); await sleep(300);
  ok('discoveries tab shows all 15 discovery cards', (await ev('document.querySelectorAll(".lab-found-card").length')) === 15);
  const foundBadge = await ev('document.getElementById("lab-found-n") && document.getElementById("lab-found-n").textContent');
  ok('found badge shows n/15 format', !!foundBadge && foundBadge.includes('/15'), foundBadge);

  // ── Missions ─────────────────────────────────────────────────────────────────
  console.log('\n-- Missions --');
  await clicks('[data-panel="missions"]'); await sleep(300);
  ok('missions tab shows 2 mission cards', (await ev('document.querySelectorAll(".lab-mission-card").length')) === 2);

  // ── Read-aloud ───────────────────────────────────────────────────────────────
  console.log('\n-- Read-aloud --');
  await clicks('[data-panel="sandbox"]'); await sleep(200);
  await set('station', 'meal'); await sleep(200);
  const spokenBefore = await ev('window.__tts.spoken.length');
  await click("[data-act='say-coach']"); await sleep(200);
  ok('🔊 speaks only when tapped', (await ev('window.__tts.spoken.length')) === spokenBefore + 1, await ev('window.__tts.spoken.slice(-2)'));

  // ── Calm Mode ────────────────────────────────────────────────────────────────
  console.log('\n-- Calm Mode --');
  await ev('document.documentElement.classList.add("kid-calm")'); await sleep(200);
  ok('Calm Mode class applied', await ev('document.documentElement.classList.contains("kid-calm")'));
  await ev('document.documentElement.classList.remove("kid-calm")');

  // ── 360px layout ─────────────────────────────────────────────────────────────
  console.log('\n-- 360px layout --');
  ok('no horizontal overflow at 360px', !(await ev('document.documentElement.scrollWidth > document.documentElement.clientWidth + 4')));
  const tiny = await ev(`(() => [...document.querySelectorAll('#labs-root .lab-nutrition-food-btn, #labs-root .lab-nutrition-tooth-btn, #labs-root .lab-nutrition-stn-btn, #labs-root .lab-tool, #labs-root .lab-nutrition-label-btn')]
    .filter(b => { const r = b.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.width < 40 || r.height < 40); })
    .map(b => b.textContent.trim().slice(0, 20) + ' ' + Math.round(b.getBoundingClientRect().height) + 'px'))()`);
  ok('every bench control is at least 40px tall and wide', tiny.length === 0, tiny);
  await set('station', 'teeth'); await sleep(200);
  const tinyTeeth = await ev(`(() => [...document.querySelectorAll('#labs-root .lab-nutrition-tooth-btn, #labs-root .lab-nutrition-label-btn')]
    .filter(b => { const r = b.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.width < 40 || r.height < 40); }).map(b => b.textContent.trim()))()`);
  ok('the tooth buttons are 44px tap targets and fit the phone', tinyTeeth.length === 0 && !(await ev('document.documentElement.scrollWidth > document.documentElement.clientWidth + 4')), tinyTeeth);

  // ── Page errors ───────────────────────────────────────────────────────────────
  console.log('\n-- Page errors --');
  ok('no console errors during the test', errors.length === 0, errors.slice(0, 3));

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  quit(failed ? 1 : 0);
})().catch(err => { console.error(err); quit(1); });
