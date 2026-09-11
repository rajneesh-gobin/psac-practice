'use strict';
// Science Labs › Photosynthesis Lab, driven in a real browser.
//
// Proves the lab end to end: it loads its own three files when opened, lands
// with "What would you like to do?", a guided experiment runs to its end,
// every discovery unlocks by following its own "Show me how", every hazard and
// result card fires and explains itself, all three missions can be finished
// with three stars, the animation loop really runs, Calm Mode applies effects
// at once, and the bench fits a 360px phone with no page errors.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-photo.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
// ⚠ Port 9402 is this lab's; the other lab builds use 9401, 9403 and 9404.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9402;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); } };

// ⚠ Every exit - a pass, a fail, or a thrown error - kills Chrome and removes
//   its profile. An early version exited from .catch() and left a headless
//   Chrome holding this lab's port.
let chrome = null, profile = null;
const quit = code => {
  try { if (chrome) chrome.kill(); } catch (_) {}
  setTimeout(() => { try { if (profile) fs.rmSync(profile, { recursive: true, force: true }); } catch (_) {} process.exit(code); }, 800);
};

(async () => {
  profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-labs-photo-'));
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
  const dbg = () => ev('LabPhoto._debug()');
  const overlay = () => ev(`(() => { const o = document.getElementById('lab-overlay'); if (!o) return null;
    return { cls: o.className, text: o.textContent.replace(/\\s+/g, ' ').slice(0, 3000),
             signs: [...o.querySelectorAll('.lab-sign figcaption')].map(f => f.textContent) }; })()`);
  const closeOv = () => click('#lab-overlay [data-ov-close]');
  const set = (k, v) => clicks(`[data-set="${k}"][data-v="${v}"]`);
  const act = a => clicks(`[data-act="${a}"]`);
  // A clean bench with no guide and no mission, on the pondweed rig: start a
  // guide, stop it (that resets the bench), then pick the rig.
  const freshBench = async () => {
    await ev("document.getElementById('lab-overlay')?.remove(); LabPhoto.startGuide('bubbles'); true");
    await act('guide-stop');
    await set('rig', 'pond');
  };

  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof openLabs === 'function' && typeof RoleModules !== 'undefined'"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url + ', not the file we navigated to.'); quit(1); return; }
  ok('app loaded', ready === true);
  await sleep(2500);

  // ── Opening the lab ─────────────────────────────
  console.log('\n-- opening the lab');
  await ev("SELECTED_GRADE = 9; openLabs(); true");
  let hub = false;
  for (let i = 0; i < 40 && !hub; i++) { await sleep(250); hub = await ev("typeof Labs !== 'undefined' && !!document.querySelector('#labs-root .lab-hub')"); }
  ok('Grade 9: the Labs hub renders', hub);
  await ev("Labs.openLab('photo'); true");
  let mounted = false;
  for (let i = 0; i < 60 && !mounted; i++) { await sleep(200); mounted = await ev("typeof window.LabPhoto !== 'undefined' && !!document.querySelector('#labs-root .lab-photo')"); }
  ok('Labs.openLab("photo") loads LabPhoto and renders the bench', mounted);
  const labScripts = await ev("[...document.scripts].map(s => s.src).filter(s => /engine\\/labs\\//.test(s)).map(s => s.split('/').pop()).join()");
  ok('it fetched its own data file and bench, after the shell', /lab_core\.js/.test(labScripts) && /lab_photo_data\.js,lab_photo\.js/.test(labScripts), labScripts);
  await sleep(500);
  ok('its stylesheet is linked and styles the set-up buttons',
     await ev("!!document.querySelector('link[data-lab-css=\"photo\"]') && getComputedStyle(document.querySelector('.lab-photo-opt')).minHeight === '44px'"));
  let ov = await overlay();
  ok('first visit shows the welcome card with “Show me how”', ov && /Welcome to the Photosynthesis Lab/.test(ov.text) && /Show me how/.test(ov.text), ov);
  await closeOv();
  ok('the welcome is remembered', await ev("Labs.store('photo').intro === true"));
  ok('top bar: back, Biology · Grade 9, title and help',
     await ev("!!document.querySelector('.lab-photo .lab-top [data-act=\"hub\"]') && /Biology · Grade 9/.test(document.querySelector('.lab-photo .lab-eyebrow').textContent) && !!document.querySelector('.lab-photo [data-act=\"help\"]')"));
  await act('help');
  ov = await overlay();
  ok('help explains the word equation and the starch-test order', ov && /carbon dioxide \+ water → glucose \+ oxygen/.test(ov.text) && /Boil the leaf/.test(ov.text), ov && ov.text.slice(0, 200));
  await closeOv();
  await act('tip');
  ok('💡 gives a fact', /💡/.test(await ev("document.getElementById('lab-coach-text').textContent")));
  await ev('LabPhoto._test({ instant: true }); true');

  // ── Landing ─────────────────────────────────────
  console.log('\n-- what to do here');
  ok('the Bench tab opens with “What would you like to do?”, 4 guided experiments and 3 missions',
     await ev("!!document.querySelector('.lab-start') && /What would you like to do/.test(document.querySelector('.lab-start').textContent) && document.querySelectorAll('.lab-start [data-guide]').length === 4 && document.querySelectorAll('.lab-start [data-mission]').length === 3"));
  ok('the tabs are Bench, Missions and Discoveries, with a counter', await ev("[...document.querySelectorAll('.lab-tabs [data-panel]')].map(b => b.dataset.panel).join() === 'sandbox,missions,found' && /\\/17$/.test(document.getElementById('lab-found-n').textContent)"));

  await click('.lab-start [data-guide="bubbles"]');
  const gs = () => ev(`({ box: !document.getElementById('lab-guide').hidden, text: document.getElementById('lab-guide').textContent.replace(/\\s+/g, ' '),
    next: (() => { const e = document.querySelector('.is-next'); return e ? (e.dataset.set ? e.dataset.set + ':' + e.dataset.v : e.dataset.act) : null; })(),
    start: !!document.querySelector('.lab-start') })`);
  let g = await gs();
  ok('Make it bubble: already on the pondweed rig, so it opens at step 2 - add sodium hydrogencarbonate - and that button glows',
     g.box && /Step 2 of 7/.test(g.text) && /sodium hydrogencarbonate/.test(g.text) && g.next === 'water:high' && !g.start, g);
  await click('[data-guide-do]');
  g = await gs();
  ok('then the heat shield glows', g.next === 'shield:on' && /Step 3 of 7/.test(g.text), g);
  await click('[data-guide-do]');
  g = await gs();
  ok('the lamp is already at 30 cm, so that step is skipped and “Count for 1 minute” glows under the picture', g.next === 'count' && /Step 5 of 7/.test(g.text) && (await dbg()).pond.dist === 30, g);
  await click('[data-guide-do]');
  let d = await dbg();
  ok('the count gives 13 bubbles per minute at 30 cm and goes in the notebook', d.pond.last && d.pond.last.bubbles === 13
     && /13 bubbles per minute/.test(await ev("document.getElementById('lab-notebook').textContent")), d.pond.last);
  await click('[data-guide-do]'); await click('[data-guide-do]');
  ov = await overlay();
  ok('bringing the lamp to 10 cm and counting completes it, with “What you found out”', ov && /Experiment complete/.test(ov.text) && /What you found out/.test(ov.text), ov);
  ok('…31 bubbles per minute, more than at 30 cm', (await dbg()).pond.last.bubbles === 31);
  ok('the finished experiment is remembered, and the next one offered', await ev("!!Labs.store('photo').guides.bubbles") && /Next: Test a leaf for starch/.test(ov.text));
  ok('discoveries were collected on the way (the bubbles, closer lamp)', await ev("['bubbles','closer_faster'].every(id => Labs.store('photo').disc[id])"));
  const counter = () => ev("({ shown: document.getElementById('lab-found-n').textContent, saved: Object.keys(Labs.store('photo').disc).length + '/' + LabPhotoData.DISCOVERIES.length })");
  let cnt = await counter();
  ok('the ✨ counter matches what is saved', cnt.shown === cnt.saved, cnt);
  await closeOv();
  ok('back on the Bench tab, the start panel shows it done', await ev("/✓ done/.test(document.querySelector('.lab-start').textContent)"));

  // ── Hazards ─────────────────────────────────────
  console.log('\n-- hazards');
  await freshBench();
  await clicks('[data-set="rig"][data-v="leaf"]', '[data-act="pick"]', '[data-set="bunsen"][data-v="on"]');
  await ev('LabPhoto._test({ instant: false }); true');
  await act('flame');
  const mid = { ov: await overlay(), busy: (await dbg()).busy };
  await sleep(1700);
  ov = await overlay();
  ok('ethanol over the flame: the fire plays on the canvas first, then the card', mid.ov === null && mid.busy === true && ov && /is-hazard/.test(ov.cls), { mid, ov });
  await ev('LabPhoto._test({ instant: true }); true');
  ok('…a FLAMMABLE hazard card: what happened, why, what to do instead and the exam point',
     ov && ov.signs.includes('Flammable') && /What happened/.test(ov.text) && /Why it’s dangerous/.test(ov.text) && /Do this instead/.test(ov.text) && /On the NCE paper/.test(ov.text) && /water bath/.test(ov.text), ov);
  await closeOv();
  ok('…and the Bunsen is out afterwards', (await dbg()).bunsen === false);
  await clicks('[data-set="bunsen"][data-v="on"]', '[data-act="boil"]', '[data-act="ethanol"]');
  ov = await overlay();
  ok('ethanol into the water bath with the Bunsen still lit: FLAMMABLE hazard', ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Flammable') && /still lit/.test(ov.text), ov);
  await closeOv();
  ok('…and the ethanol step did not happen', !(await dbg()).leaf.steps.includes('ethanol'));
  ok('the hazards are counted in the lab store', await ev("Labs.store('photo').hazards.ethanol_flame >= 1 && Labs.store('photo').hazards.ethanol_lit >= 1"));

  // ── Result cards ────────────────────────────────
  console.log('\n-- mistakes that teach');
  const resultCard = async (label, re) => { const o = await overlay(); ok(label, o && /is-result/.test(o.cls) && /What happened/.test(o.text) && /What you should have done/.test(o.text) && re.test(o.text), o); await closeOv(); };
  await freshBench();
  await clicks('[data-set="rig"][data-v="leaf"]', '[data-act="pick"]', '[data-set="bunsen"][data-v="on"]', '[data-act="boil"]', '[data-set="bunsen"][data-v="off"]', '[data-act="iodine"]');
  ok('skip the ethanol: the leaf stays green under the iodine', (await dbg()).leaf.reading === 'masked');
  await resultCard('…“The green hid the colour” card', /green/i);
  await clicks('[data-act="pick"]', '[data-set="bunsen"][data-v="on"]', '[data-set="bunsen"][data-v="off"]', '[data-act="ethanol"]', '[data-act="rinse"]', '[data-act="iodine"]');
  ok('skip the boiling: the iodine cannot get in', (await dbg()).leaf.reading === 'no_boil');
  await resultCard('…“The iodine could not get in” card', /Boil the leaf in water FIRST/);
  const fullTest = ['[data-act="pick"]', '[data-set="bunsen"][data-v="on"]', '[data-act="boil"]', '[data-set="bunsen"][data-v="off"]', '[data-act="ethanol"]', '[data-act="rinse"]', '[data-act="iodine"]'];
  await clicks('[data-set="plant"][data-v="green"]', '[data-set="cover"][data-v="foil"]', '[data-set="day"][data-v="light"]', ...fullTest);
  ok('foil without destarching: blue-black even under the foil', /even under the foil/.test((await dbg()).log[0]), (await dbg()).log[0]);
  await resultCard('…“Not a fair test - the starch was already there” card', /Destarch the plant first/);
  await clicks('[data-set="plant"][data-v="variegated"]', '[data-act="destarch"]', '[data-set="cover"][data-v="foil"]', '[data-set="day"][data-v="light"]', ...fullTest);
  await resultCard('foil on a variegated leaf: “Two things changed at once” card', /VARIEGATED/);
  await freshBench();
  await act('count');
  await clicks('[data-set="dist"][data-v="10"]', '[data-set="water"][data-v="high"]', '[data-set="shield"][data-v="on"]');
  await act('count');
  await resultCard('lamp distance AND water changed between counts: “Not a fair test - two things changed” card', /the light \(lamp distance\) and the carbon dioxide/);
  await clicks('[data-set="shield"][data-v="off"]');
  await act('count');
  ok('no heat shield, lamp at 10 cm: the water warms from 25 °C to 31 °C', (await dbg()).pond.last.tempEnd === 31);
  await resultCard('…“The lamp heated the water” card', /25 °C to 31 °C/);

  // ── The notebook ────────────────────────────────
  const nbText = await ev("document.getElementById('lab-notebook').textContent.replace(/\\s+/g, ' ')");
  ok('the notebook has a table of every count and a table of starch tests', /Every pondweed count/.test(nbText) && /Starch tests/.test(nbText), nbText.slice(0, 300));

  // ── Missions ───────────────────────────────────
  console.log('\n-- missions');
  const answerAll = id => ev(`(() => {
    const qs = LabPhotoData.MISSIONS.find(m => m.id === '${id}').quiz;
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
  await ev("LabPhoto.startMission('light'); true");
  await clicks('[data-set="water"][data-v="high"]', '[data-set="shield"][data-v="on"]');
  for (const dd of [50, 40, 30, 20]) { await set('dist', dd); await act('count'); }
  d = await dbg();
  ok('Light and bubbles: four distances recorded fairly', d.mission && d.mission.success && d.mission.errors === 0, d.mission);
  const tbl = await ev("[...document.querySelectorAll('.lab-notebook .lab-table')[0].tBodies[0].rows].map(r => [...r.cells].map(c => c.textContent.trim()).join(' ')).join(' | ')");
  ok('the results table fills from the runs: 50 cm 5, 40 cm 8, 30 cm 13, 20 cm 30', /^50 4 5 \| 40 6 8 \| 30 11 13 \| 20 25 30 \| 15 44 - \| 10 100 -$/.test(tbl), tbl);
  await act('quiz');
  ok('the quiz ends with 3 stars when every answer is right and the test was fair', (await answerAll('light')) === '3 of 3 stars');
  ok('the stars are saved', await ev("Labs.store('photo').missions.light.stars === 3"));
  await closeOv();

  await ev("LabPhoto.startMission('needs'); true");
  await clicks('[data-set="water"][data-v="none"]'); await act('count');
  await clicks('[data-set="water"][data-v="high"]', '[data-set="lamp"][data-v="off"]'); await act('count');
  await clicks('[data-set="lamp"][data-v="on"]'); await act('count');
  await clicks('[data-set="water"][data-v="none"]', '[data-set="lamp"][data-v="off"]'); await act('count');
  d = await dbg();
  ok('What does a plant need?: the four tests - only light + CO₂ bubbles (as on the 2024 paper)',
     d.mission.success && d.mission.results.LC > 0 && d.mission.results.Lc === 0 && d.mission.results.lC === 0 && d.mission.results.lc === 0, d.mission);
  await act('quiz');
  ok('…3 stars', (await answerAll('needs')) === '3 of 3 stars');
  await closeOv();

  await ev("LabPhoto.startMission('starch'); true");
  await clicks('[data-set="plant"][data-v="variegated"]', '[data-act="destarch"]', '[data-set="day"][data-v="light"]', ...fullTest);
  d = await dbg();
  ok('Is there starch?: the variegated leaf is blue-black only where it was green', d.mission.success && d.leaf.reading === 'clear' && /where it was white/.test(d.log[0]), d);
  await act('quiz');
  ok('…3 stars', (await answerAll('starch')) === '3 of 3 stars');
  await closeOv();

  // ── Motion, calm, phone ────────────────────────
  console.log('\n-- motion, calm, phone');
  await freshBench();
  await ev('LabPhoto._test({ instant: false }); true');
  await act('count');
  await sleep(1500);
  d = await dbg();
  ok('with animation on, a count runs in real time (the loop is running)', d.pond.counting === true
     && /Counting… [1-9]/.test(await ev("document.getElementById('lab-photo-chips').textContent")), await ev("document.getElementById('lab-photo-chips').textContent"));
  await ev('LabPhoto._tick(6); true');
  ok('…and finishes into the notebook', (await dbg()).pond.counting === false);
  ok('the canvas has drawn the rig', await ev("(() => { const c = document.getElementById('lab-canvas'); const p = c.getContext('2d').getImageData(c.width / 2, c.height / 2, 1, 1).data; return p[3] > 0; })()"));
  await ev("document.documentElement.classList.add('kid-calm'); true");
  await act('count');
  ok('in Calm Mode a count applies at once', (await dbg()).pond.counting === false);
  await clicks('[data-set="rig"][data-v="leaf"]', '[data-set="day"][data-v="light"]');
  ok('in Calm Mode a day in the sun applies at once, with no animation', (await dbg()).leaf.day === 'light' && (await dbg()).busy === false);
  await ev("document.documentElement.classList.remove('kid-calm'); LabPhoto._test({ instant: true }); true");
  const fit = async label => {
    const f = await ev(`(() => { const vw = innerWidth;
      const off = [...document.querySelectorAll('#labs-root button, #labs-root canvas')]
        .filter(e => e.getBoundingClientRect().width > 0 && e.getBoundingClientRect().right > vw + 0.5)
        .map(e => (e.getAttribute('data-set') || e.getAttribute('data-act') || e.getAttribute('data-panel') || e.tagName) + ' → ' + Math.round(e.getBoundingClientRect().right));
      const small = [...document.querySelectorAll('#labs-root .lab-photo-opt, #labs-root .lab-tool, #labs-root .lab-photo-rigs button')]
        .filter(e => e.getBoundingClientRect().width > 0 && (e.getBoundingClientRect().height < 43.5 || e.getBoundingClientRect().width < 43.5)).length;
      return { vw, root: document.getElementById('labs-root').scrollWidth, off, small }; })()`);
    ok(label, f.root <= f.vw && f.off.length === 0 && f.small === 0, f);
  };
  await fit('360px, starch bench: no control past the screen edge, every tap target at least 44px');
  await set('rig', 'pond');
  await fit('360px, pondweed rig: the same');

  // ── Discoveries ────────────────────────────────
  console.log('\n-- discoveries');
  await click('[data-panel="found"]');
  ok('the Discoveries tab shows 17 cards, found and locked', await ev("document.querySelectorAll('.lab-found-card').length === 17 && document.querySelectorAll('.lab-found-card.is-found').length >= 6 && /Clue:/.test(document.querySelector('.lab-found').textContent)"));
  await click('.lab-found-card.is-found[data-disc="bubbles"]');
  ov = await overlay();
  ok('a found discovery explains itself: what you saw, the equation (symbol one labelled beyond the syllabus), why, do it again',
     ov && /What you saw/.test(ov.text) && /carbon dioxide \+ water → glucose \+ oxygen/.test(ov.text) && /6CO₂ \+ 6H₂O → C₆H₁₂O₆ \+ 6O₂/.test(ov.text) && /beyond the NCE syllabus/.test(ov.text) && /Why it happens/.test(ov.text) && /Do it again/.test(ov.text), ov);
  await closeOv();
  const lockedId = await ev("(document.querySelector('.lab-found-card:not(.is-found)') || {}).dataset?.disc || null");
  if (lockedId) {
    await click(`.lab-found-card[data-disc="${lockedId}"]`);
    ov = await overlay();
    ok('a locked discovery shows how to find it, with “Show me how”', ov && /How to find it/.test(ov.text) && /Show me how/.test(ov.text), ov);
    await click('#lab-overlay [data-disc-go]');
    ok('…and “Show me how” starts a guide for it', !!(await dbg()).guide);
    await act('guide-stop');
  }
  const discIds = await ev('LabPhotoData.DISCOVERIES.map(d => d.id)');
  const unsolved = [];
  for (const id of discIds) {
    const res = await ev(`(() => {
      const st = Labs.store('photo'); delete st.disc['${id}'];
      document.getElementById('lab-overlay')?.remove();
      LabPhoto.discoveryGuide('${id}');
      for (let k = 0; k < 20 && LabPhoto._debug().guide; k++) {
        const o = document.querySelector('#lab-overlay.is-hazard, #lab-overlay.is-result');
        if (o) return 'card: ' + o.textContent.replace(/\\s+/g, ' ').slice(0, 90);
        const btn = document.querySelector('#lab-guide [data-guide-do]');
        if (btn) btn.click(); else LabPhoto._tick(7);
      }
      if (LabPhoto._debug().guide) return 'guide never finished at step ' + LabPhoto._debug().guide.step;
      document.getElementById('lab-overlay')?.remove();
      return !!st.disc['${id}'];
    })()`);
    if (res !== true) unsolved.push(id + ' → ' + res);
  }
  ok(`all ${discIds.length} discoveries unlock by following their own “Show me how”`, unsolved.length === 0, unsolved);
  cnt = await counter();
  ok('…and the counter says so', cnt.shown === cnt.saved && cnt.shown === `${discIds.length}/${discIds.length}`, cnt);

  await ev("showScreen('student-home'); true");
  await sleep(300);
  ok('leaving the Labs screen stops the animation loop cleanly', errors.length === 0);
  ok('no page errors along the way', errors.length === 0, errors.slice(0, 5));

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); quit(1); });
