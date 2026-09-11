'use strict';
// Science Labs › Photosynthesis Lab, driven in a real browser.
//
// Proves the lab end to end at every grade it serves.
//  Grade 9 (the original level): it loads its own three files when opened,
//  lands with "What would you like to do?", a guided experiment runs to its
//  end, every discovery unlocks by following its own "Show me how", every
//  hazard and result card fires and explains itself, all three missions can be
//  finished with three stars, the animation loop really runs, Calm Mode
//  applies effects at once, and the bench fits a 360px phone.
//  Grades 4 and 6 (PSAC, LAB_SPEC §8/§9): that grade's guides, missions and
//  discoveries show and no other grade's; the eyebrow names the grade; 🔊
//  read-aloud speaks only when tapped and is cancelled by an overlay, a step
//  change, leaving the screen and closing the lab; each new hazard and result
//  card; a guided experiment and missions to three stars; every discovery
//  unlocks by its own "Show me how"; the time-lapse runs; Calm Mode; 360px.
//  Progress for the three grades stays apart in Labs.store('photo').
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-photo.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
// ⚠ Port 9415 is this lab's; the other lab builds use their own.
// ⚠ Until the lead registers grades 4 and 6 on the photo row of Labs.LABS,
//   Labs.grade() says 9 for this lab whatever the pupil's grade. atGrade()
//   then overrides Labs.grade (and prints a NOTE); once registered, the test
//   takes the real path with no edit.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9415;
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
  const speech = () => ev('({ spoken: window.__tts.spoken.slice(), cancels: window.__tts.cancels })');
  // Content for one grade: untagged items are the original Grade 9 level.
  const forGrade = (kind, g) => `LabPhotoData.${kind}.filter(x => (x.grades || [9]).includes(${g}))`;
  // A clean bench with no guide and no mission: start a guide, stop it (that
  // resets the bench), then pick the rig.
  const freshBench = async (rig = 'pond', guide = 'bubbles') => {
    await ev(`document.getElementById('lab-overlay')?.remove(); LabPhoto.startGuide('${guide}'); true`);
    await act('guide-stop');
    await set('rig', rig);
  };
  const counter = g => ev(`(() => { const all = ${forGrade('DISCOVERIES', g)}, st = Labs.store('photo');
    return { shown: document.getElementById('lab-found-n').textContent, saved: all.filter(d => st.disc[d.id]).length + '/' + all.length }; })()`);
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
  const resultCard = async (label, re) => { const o = await overlay(); ok(label, o && /is-result/.test(o.cls) && /What happened/.test(o.text) && /What you should have done/.test(o.text) && re.test(o.text), o); await closeOv(); };
  const fit = async label => {
    const f = await ev(`(() => { const vw = innerWidth;
      const off = [...document.querySelectorAll('#labs-root button, #labs-root canvas')]
        .filter(e => e.getBoundingClientRect().width > 0 && e.getBoundingClientRect().right > vw + 0.5)
        .map(e => (e.getAttribute('data-set') || e.getAttribute('data-act') || e.getAttribute('data-panel') || e.tagName) + ' → ' + Math.round(e.getBoundingClientRect().right));
      const small = [...document.querySelectorAll('#labs-root .lab-photo-opt, #labs-root .lab-tool, #labs-root .lab-photo-rigs button, #labs-root .lab-photo-say')]
        .filter(e => e.getBoundingClientRect().width > 0 && (e.getBoundingClientRect().height < 43.5 || e.getBoundingClientRect().width < 43.5)).length;
      return { vw, root: document.getElementById('labs-root').scrollWidth, off, small }; })()`);
    ok(label, f.root <= f.vw && f.off.length === 0 && f.small === 0, f);
  };
  // Follow every discovery's own "Show me how" from a fresh bench.
  const unlockAll = async g => {
    const ids = await ev(`${forGrade('DISCOVERIES', g)}.map(d => d.id)`);
    const unsolved = [];
    for (const id of ids) {
      const res = await ev(`(() => {
        const st = Labs.store('photo'); delete st.disc['${id}'];
        document.getElementById('lab-overlay')?.remove();
        LabPhoto.discoveryGuide('${id}');
        if (!LabPhoto._debug().guide) return 'no guide started';
        for (let k = 0; k < 24 && LabPhoto._debug().guide; k++) {
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
    return { ids, unsolved };
  };
  // Open the lab at grade n - the real way when the lab is registered for n.
  const atGrade = async n => {
    await ev("document.getElementById('lab-overlay')?.remove(); if (typeof Labs !== 'undefined' && document.querySelector('#labs-root .lab-photo')) Labs.backToHub(); true");
    await ev(`SELECTED_GRADE = ${n}; showScreen('labs'); true`);
    let hub = false;
    for (let i = 0; i < 40 && !hub; i++) { await sleep(250); hub = await ev("typeof window.Labs !== 'undefined' && !!document.querySelector('#labs-root .lab-hub')"); }
    const real = await ev(`Labs.labsFor(${n}).some(l => l.id === 'photo')`);
    if (real) await ev('if (window.__realGrade) { Labs.grade = window.__realGrade; } true');
    else {
      console.log(`NOTE Grade ${n}: the photo lab is not registered for Grade ${n} yet (Labs.LABS / _LAB_GRADES), so Labs.grade is overridden to ${n}.`);
      await ev(`window.__realGrade = window.__realGrade || Labs.grade; Labs.grade = () => ${n}; true`);
    }
    await ev("Labs.openLab('photo'); true");
    let mounted = false;
    for (let i = 0; i < 60 && !mounted; i++) { await sleep(150); mounted = await ev("typeof window.LabPhoto !== 'undefined' && !!document.querySelector('#labs-root .lab-photo')"); }
    ok(`Grade ${n}: the lab opens`, mounted && (await ev('LabPhoto._debug().grade')) === n, await ev('LabPhoto._debug().grade'));
    return real;
  };

  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof openLabs === 'function' && typeof RoleModules !== 'undefined'"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url + ', not the file we navigated to.'); quit(1); return; }
  ok('app loaded', ready === true);
  await sleep(2500);
  // A stand-in for the speech engine: records what is spoken and cancelled.
  await ev(`(() => { const t = { spoken: [], cancels: 0, speaking: false, pending: false,
      speak(u) { this.spoken.push(u.text); }, cancel() { this.cancels++; }, getVoices() { return []; } };
    Object.defineProperty(window, 'speechSynthesis', { value: t, configurable: true, writable: true });
    window.__tts = t; return true; })()`);

  // ══════════════════════════════════════════════
  //  GRADE 9 - the original level
  // ══════════════════════════════════════════════
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
  ok('Grade 9 is unchanged: no read-aloud button, and its own two rigs',
     await ev("!document.querySelector('.lab-photo [data-act=\"say-coach\"]') && [...document.querySelectorAll('.lab-photo-rigs [data-v]')].map(b => b.dataset.v).join() === 'pond,leaf'"));
  await act('help');
  ov = await overlay();
  ok('help explains the word equation and the starch-test order', ov && /carbon dioxide \+ water → glucose \+ oxygen/.test(ov.text) && /Boil the leaf/.test(ov.text), ov && ov.text.slice(0, 200));
  await closeOv();
  await act('tip');
  ok('💡 gives a fact', /💡/.test(await ev("document.getElementById('lab-coach-text').textContent")));
  await ev('LabPhoto._test({ instant: true }); true');

  console.log('\n-- what to do here');
  ok('the Bench tab opens with “What would you like to do?”, 4 guided experiments and 3 missions',
     await ev("!!document.querySelector('.lab-start') && /What would you like to do/.test(document.querySelector('.lab-start').textContent) && document.querySelectorAll('.lab-start [data-guide]').length === 4 && document.querySelectorAll('.lab-start [data-mission]').length === 3"));
  ok('the tabs are Bench, Missions and Discoveries, with a counter', await ev("[...document.querySelectorAll('.lab-tabs [data-panel]')].map(b => b.dataset.panel).join() === 'sandbox,missions,found' && /\\/17$/.test(document.getElementById('lab-found-n').textContent)"));
  ok('no primary guide or mission appears at Grade 9', await ev("[...document.querySelectorAll('.lab-start [data-guide], .lab-start [data-mission]')].every(b => !/^g\\d_/.test(b.dataset.guide || b.dataset.mission))"));

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
  let cnt = await counter(9);
  ok('the ✨ counter matches what is saved', cnt.shown === cnt.saved, cnt);
  await closeOv();
  ok('back on the Bench tab, the start panel shows it done', await ev("/✓ done/.test(document.querySelector('.lab-start').textContent)"));

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

  console.log('\n-- mistakes that teach');
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

  const nbText = await ev("document.getElementById('lab-notebook').textContent.replace(/\\s+/g, ' ')");
  ok('the notebook has a table of every count and a table of starch tests', /Every pondweed count/.test(nbText) && /Starch tests/.test(nbText), nbText.slice(0, 300));

  console.log('\n-- missions');
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
  await fit('360px, starch bench: no control past the screen edge, every tap target at least 44px');
  await set('rig', 'pond');
  await fit('360px, pondweed rig: the same');

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
  let un = await unlockAll(9);
  ok(`all ${un.ids.length} discoveries unlock by following their own “Show me how”`, un.unsolved.length === 0 && un.ids.length === 17, un.unsolved);
  cnt = await counter(9);
  ok('…and the counter says so', cnt.shown === cnt.saved && cnt.shown === `${un.ids.length}/${un.ids.length}`, cnt);

  // ══════════════════════════════════════════════
  //  GRADES 4 AND 6 - the PSAC levels
  // ══════════════════════════════════════════════
  const PRIMARY = {
    4: { rigs: 'pots,seeds', first: 'g4_light', other: 6, mission: 'g4_needs' },
    6: { rigs: 'pots,weed', first: 'g6_bubbles', other: 4, mission: 'g6_gases' },
  };
  for (const n of [4, 6]) {
    const L = PRIMARY[n];
    console.log(`\n-- Grade ${n}: opening`);
    const spokenBefore = (await speech()).spoken.length;
    const real = await atGrade(n);
    await sleep(300);
    ov = await overlay();
    ok(`Grade ${n}: a first visit at this grade shows its own welcome, with “Show me how”`, ov && /Welcome to the Photosynthesis Lab/.test(ov.text) && /Show me how/.test(ov.text) && /🔊/.test(ov.text) && !/starch test/i.test(ov.text), ov && ov.text.slice(0, 300));
    ok(`Grade ${n}: nothing was read aloud on its own`, (await speech()).spoken.length === spokenBefore);
    await closeOv();
    ok(`Grade ${n}: the welcome is remembered for this grade only`, await ev(`Labs.store('photo')['intro_g${n}'] === true`));
    ok(`Grade ${n}: the eyebrow says “Science · Grade ${n}”, and its own rigs`,
       await ev(`document.querySelector('.lab-photo .lab-eyebrow').textContent === 'Science · Grade ${n}' && [...document.querySelectorAll('.lab-photo-rigs [data-v]')].map(b => b.dataset.v).join() === '${L.rigs}'`));
    ok(`Grade ${n}: no Grade 9 apparatus - no starch bench, no iodine, no Bunsen`,
       await ev("!document.querySelector('[data-set=\"rig\"][data-v=\"leaf\"], [data-act=\"iodine\"], [data-set=\"bunsen\"], [data-act=\"flame\"]')"));
    await ev('LabPhoto._test({ instant: true }); true');
    const want = await ev(`({ g: ${forGrade('GUIDES', n)}.map(x => x.id), m: ${forGrade('MISSIONS', n)}.map(x => x.id), d: ${forGrade('DISCOVERIES', n)}.length })`);
    const shown = await ev("({ g: [...document.querySelectorAll('.lab-start [data-guide]')].map(b => b.dataset.guide), m: [...document.querySelectorAll('.lab-start [data-mission]')].map(b => b.dataset.mission), n: document.getElementById('lab-found-n').textContent })");
    ok(`Grade ${n}: the start panel shows exactly this grade's ${want.g.length} guides and ${want.m.length} missions, none from Grade 9 or Grade ${L.other}`,
       JSON.stringify(shown.g) === JSON.stringify(want.g) && JSON.stringify(shown.m) === JSON.stringify(want.m) && want.g.length >= 3 && want.m.length >= 2, { shown, want });
    ok(`Grade ${n}: the ✨ counter counts this grade's ${want.d} discoveries`, new RegExp(`/${want.d}$`).test(shown.n) && want.d >= 10, shown.n);
    await click('[data-panel="missions"]');
    ok(`Grade ${n}: the Missions tab lists only this grade's missions`,
       await ev(`JSON.stringify([...document.querySelectorAll('.lab-missions [data-mission]')].map(b => b.dataset.mission)) === JSON.stringify(${JSON.stringify(want.m)})`));
    await click('[data-panel="found"]');
    ok(`Grade ${n}: the Discoveries tab shows only this grade's ${want.d} cards`,
       await ev(`document.querySelectorAll('.lab-found-card').length === ${want.d} && [...document.querySelectorAll('.lab-found-card')].every(c => c.dataset.disc.startsWith('g${n}_'))`));
    await click('[data-panel="sandbox"]');

    console.log(`\n-- Grade ${n}: read aloud`);
    await act('tip');
    const coachText = await ev("document.getElementById('lab-coach-text').textContent");
    await act('say-coach');
    let sp = await speech();
    ok(`Grade ${n}: 🔊 on the lab assistant speaks its words, without the emoji`, sp.spoken.length >= 1 && coachText.includes(sp.spoken[sp.spoken.length - 1].slice(0, 12)) && !/💡/.test(sp.spoken[sp.spoken.length - 1]), sp);
    const c0 = sp.cancels;
    await act('help');
    ok(`Grade ${n}: opening an overlay cancels the speech`, (await speech()).cancels > c0);
    ov = await overlay();
    ok(`Grade ${n}: help is written for this grade (a fair test, stay safe) with no starch test`, ov && /fair test/i.test(ov.text) && /hot lamp/i.test(ov.text) && !/iodine|ethanol/i.test(ov.text), ov && ov.text.slice(0, 200));
    await closeOv();

    console.log(`\n-- Grade ${n}: a guided experiment`);
    await click(`.lab-start [data-guide="${L.first}"]`);
    g = await gs();
    ok(`Grade ${n}: the guide box opens with a 🔊 button and the thing to tap glows`, g.box && !!(await ev("document.querySelector('#lab-guide [data-act=\"say-guide\"]')")) && !!g.next, g);
    const spoken0 = (await speech()).spoken.length;
    await click('#lab-guide [data-act="say-guide"]');
    sp = await speech();
    ok(`Grade ${n}: 🔊 on the guide box reads the step`, sp.spoken.length === spoken0 + 1 && g.text.includes(sp.spoken[sp.spoken.length - 1].slice(0, 10)), sp.spoken.slice(-1));
    const c1 = sp.cancels;
    await ev("window.__tts.speaking = true; true");
    await click('[data-guide-do]');
    await ev("window.__tts.speaking = false; true");
    ok(`Grade ${n}: the next step cancels the speech`, (await speech()).cancels > c1, await speech());
    for (let k = 0; k < 12 && (await dbg()).guide; k++) await click('[data-guide-do]');
    ov = await overlay();
    ok(`Grade ${n}: the guided experiment runs to “What you found out”`, ov && /Experiment complete/.test(ov.text) && /What you found out/.test(ov.text), ov);
    ok(`Grade ${n}: it is remembered`, await ev(`!!Labs.store('photo').guides['${L.first}']`));
    await closeOv();
    cnt = await counter(n);
    ok(`Grade ${n}: discoveries came on the way, and the counter matches what is saved`, cnt.shown === cnt.saved && !/^0\//.test(cnt.saved), cnt);

    console.log(`\n-- Grade ${n}: the hot lamp`);
    await freshBench('pots', L.first);
    await clicks('[data-set="pot"][data-v="B"]', '[data-set="spot"][data-v="lamp"]');
    await ev('LabPhoto._test({ instant: false }); true');
    await act('week');
    const midH = { ov: await overlay(), busy: (await dbg()).busy };
    await sleep(1800);
    ov = await overlay();
    ok(`Grade ${n}: a plant under a hot lamp: the leaves scorch on the canvas first, then the card`, midH.ov === null && midH.busy === true && ov && /is-hazard/.test(ov.cls), { midH, ov: ov && ov.cls });
    await ev('LabPhoto._test({ instant: true }); true');
    ok(`Grade ${n}: …a HOT SURFACE hazard card: what happened, why, what to do instead and the exam point`,
       ov && ov.signs.includes('Hot surface') && /What happened/.test(ov.text) && /Why it’s dangerous/.test(ov.text) && /Do this instead/.test(ov.text) && /adult/.test(ov.text), ov);
    if (real) ok(`Grade ${n}: …its exam section says “In the PSAC exam”, from Labs.grade()`, /In the PSAC exam/.test(ov.text), ov.text.slice(0, 400));
    else console.log(`NOTE Grade ${n}: the exam heading follows the shell's own grade, so “In the PSAC exam” is checked only once the lab is registered for Grade ${n}.`);
    await closeOv();
    d = await dbg();
    ok(`Grade ${n}: …and the plant is back on the windowsill`, d.pots.B.spot === 'sun' && !d.pots.res, d.pots);
    ok(`Grade ${n}: the hazard is counted in the lab store`, await ev("Labs.store('photo').hazards.hot_lamp >= 1"));

    console.log(`\n-- Grade ${n}: mistakes that teach`);
    await freshBench('pots', L.first);
    await clicks('[data-set="pot"][data-v="B"]', '[data-set="spot"][data-v="dark"]', '[data-set="drink"][data-v="none"]', '[data-act="week"]');
    await resultCard(`Grade ${n}: pot B in the dark AND with no water: “Not a fair test - two things changed”`, /where it stood and the water/);
    await freshBench('pots', L.first);
    await clicks('[data-set="pot"][data-v="B"]', '[data-set="drink"][data-v="flood"]', '[data-act="week"]');
    ok(`Grade ${n}: far too much water: the plant turns yellow and droops`, /roots began to rot/.test((await dbg()).log[0]), (await dbg()).log[0]);
    await resultCard(`Grade ${n}: …the “Too much water” card`, /could not get air/);
    await freshBench('pots', L.first);
    await clicks('[data-set="twin"][data-v="off"]', '[data-set="spot"][data-v="dark"]', '[data-act="week"]');
    await resultCard(`Grade ${n}: one plant in the dark with nothing to compare: the “no control” card`, /control/);
    if (n === 4) {
      await freshBench('seeds', L.first);
      await clicks('[data-set="dish"][data-v="1"]', '[data-set="place"][data-v="window"]', '[data-set="dish"][data-v="2"]', '[data-set="place"][data-v="fridge"]',
                   '[data-set="dish"][data-v="3"]', '[data-set="place"][data-v="window"]', '[data-set="dish"][data-v="4"]', '[data-set="place"][data-v="window"]', '[data-act="days"]');
      await resultCard('Grade 4: fridge seeds against windowsill seeds: “Two things changed: cold AND dark”', /cold AND dark/);
    } else {
      await freshBench('weed', L.first);
      await act('wcount');
      await clicks('[data-set="wwater"][data-v="boiled"]', '[data-set="wlamp"][data-v="off"]', '[data-act="wcount"]');
      await resultCard('Grade 6: lamp off AND boiled water between counts: “Not a fair test - two things changed”', /the light and the water/);
    }

    console.log(`\n-- Grade ${n}: missions`);
    if (n === 4) {
      await ev("LabPhoto.startMission('g4_needs'); true");
      await clicks('[data-set="pot"][data-v="B"]', '[data-set="spot"][data-v="dark"]', '[data-act="week"]');
      await clicks('[data-set="spot"][data-v="sun"]', '[data-set="drink"][data-v="none"]', '[data-act="week"]');
      d = await dbg();
      ok('Grade 4: Light and water: both fair tests done, no mistakes', d.mission && d.mission.success && d.mission.errors === 0, d.mission);
      ok('Grade 4: …the notebook has a table of the plant pots', /Plant pots after 7 days/.test(await ev("document.getElementById('lab-notebook').textContent")));
      await act('quiz');
      ok('Grade 4: …3 stars', (await answerAll('g4_needs')) === '3 of 3 stars');
      await closeOv();
      await ev("LabPhoto.startMission('g4_seeds'); true");
      await clicks('[data-set="dish"][data-v="2"]', '[data-set="wet"][data-v="dry"]', '[data-set="dish"][data-v="3"]', '[data-set="place"][data-v="fridge"]',
                   '[data-set="dish"][data-v="4"]', '[data-set="wet"][data-v="drown"]', '[data-act="days"]');
      d = await dbg();
      ok('Grade 4: Wake up the seeds: water, warmth and air found in one go', d.mission && d.mission.success && d.mission.errors === 0 && d.seeds.sprouted.join() === 'true,false,false,false', d);
      await act('quiz');
      ok('Grade 4: …3 stars', (await answerAll('g4_seeds')) === '3 of 3 stars');
      await closeOv();
    } else {
      await ev("LabPhoto.startMission('g6_gases'); true");
      await clicks('[data-set="wwater"][data-v="boiled"]', '[data-act="wcount"]', '[data-set="wwater"][data-v="soda"]', '[data-act="wcount"]', '[data-set="wlamp"][data-v="off"]', '[data-act="wcount"]');
      d = await dbg();
      ok('Grade 6: Gas A and Gas B: three tests, bubbles only with light AND carbon dioxide', d.mission && d.mission.success && d.mission.errors === 0
         && d.mission.results[0] === 0 && d.mission.results[1] > 0 && d.mission.results[2] === 0, d.mission);
      await act('quiz');
      ok('Grade 6: …3 stars', (await answerAll('g6_gases')) === '3 of 3 stars');
      await closeOv();
      await ev("LabPhoto.startMission('g6_food'); true");
      await clicks('[data-set="pot"][data-v="B"]', '[data-set="leaves"][data-v="off"]', '[data-act="week"]');
      await clicks('[data-set="leaves"][data-v="on"]', '[data-set="spot"][data-v="dark"]', '[data-act="week"]');
      d = await dbg();
      ok('Grade 6: The leaf, the food factory: both fair tests done', d.mission && d.mission.success && d.mission.errors === 0, d.mission);
      await act('quiz');
      ok('Grade 6: …3 stars', (await answerAll('g6_food')) === '3 of 3 stars');
      await closeOv();
    }
    ok(`Grade ${n}: the stars are saved under this grade's own mission ids`, await ev(`${forGrade('MISSIONS', n)}.every(M => Labs.store('photo').missions[M.id] && Labs.store('photo').missions[M.id].stars === 3)`));

    console.log(`\n-- Grade ${n}: time-lapse, calm, phone`);
    await freshBench('pots', L.first);
    await ev('LabPhoto._test({ instant: false }); true');
    await act('week');
    await sleep(1500);
    d = await dbg();
    ok(`Grade ${n}: with animation on, the week runs as a time-lapse (day ${d.pots.day.toFixed(1)} of 7)`, d.busy && d.pots.day > 0.5 && d.pots.day < 6.5
       && /Day [1-6] of 7/.test(await ev("document.getElementById('lab-photo-chips').textContent")), d.pots);
    await ev('LabPhoto._tick(4); true');
    ok(`Grade ${n}: …and ends on day 7 in the notebook`, (await dbg()).pots.day === 7 && !(await dbg()).busy);
    ok(`Grade ${n}: the canvas has drawn the pots`, await ev("(() => { const c = document.getElementById('lab-canvas'); const p = c.getContext('2d').getImageData(c.width / 2, c.height * 0.8, 1, 1).data; return p[3] > 0; })()"));
    await ev("document.documentElement.classList.add('kid-calm'); true");
    await act('fresh');
    await act('week');
    ok(`Grade ${n}: in Calm Mode the week applies at once`, (await dbg()).pots.day === 7 && !(await dbg()).busy);
    const rig2 = L.rigs.split(',')[1];
    await set('rig', rig2);
    await act(rig2 === 'seeds' ? 'days' : 'wcount');
    d = await dbg();
    ok(`Grade ${n}: in Calm Mode the ${rig2 === 'seeds' ? 'four days' : 'count'} apply at once too`, rig2 === 'seeds' ? d.seeds.day === 4 && !d.busy : !d.weed.counting && !!d.weed.last);
    await ev("document.documentElement.classList.remove('kid-calm'); LabPhoto._test({ instant: true }); true");
    await fit(`Grade ${n}, 360px, ${rig2}: no control past the screen edge, every tap target at least 44px`);
    await set('rig', 'pots');
    await fit(`Grade ${n}, 360px, pots: the same`);

    console.log(`\n-- Grade ${n}: discoveries`);
    un = await unlockAll(n);
    ok(`Grade ${n}: all ${un.ids.length} discoveries unlock by following their own “Show me how”`, un.unsolved.length === 0 && un.ids.length >= 10, un.unsolved);
    cnt = await counter(n);
    ok(`Grade ${n}: …and the counter says so`, cnt.shown === cnt.saved && cnt.shown === `${un.ids.length}/${un.ids.length}`, cnt);
    await click('[data-panel="found"]');
    await click(`.lab-found-card.is-found[data-disc="${n === 4 ? 'g4_dark' : 'g6_bubbles'}"]`);
    ov = await overlay();
    ok(`Grade ${n}: a found discovery explains itself in this grade's words`, ov && /What you saw/.test(ov.text) && /Why it happens/.test(ov.text)
       && (n === 6 ? /carbon dioxide \+ water → food \+ oxygen/.test(ov.text) && !/C₆H₁₂O₆/.test(ov.text) : /pale yellow/.test(ov.text)), ov && ov.text.slice(0, 300));
    await closeOv();
    await click('[data-panel="sandbox"]');
  }

  // ── Progress kept apart ──────────────────────────
  console.log('\n-- progress per grade');
  const st = await ev("(() => { const s = Labs.store('photo'); return { disc: Object.keys(s.disc), missions: Object.keys(s.missions), guides: Object.keys(s.guides) }; })()");
  ok('the store holds each grade under its own ids (g4_…, g6_… and the Grade 9 ones), with nothing shared',
     st.disc.some(x => x.startsWith('g4_')) && st.disc.some(x => x.startsWith('g6_')) && st.disc.includes('bubbles') && st.disc.includes('g6_bubbles') && st.missions.includes('light') && st.missions.includes('g4_needs'), st);
  await atGrade(9);
  await sleep(300);
  cnt = await counter(9);
  ok('back at Grade 9: its counter still reads 17/17 - the primary discoveries do not leak into it', cnt.shown === '17/17' && cnt.shown === cnt.saved, cnt);
  ok('…the Grade 9 eyebrow, rigs and missions are back', await ev("/Biology · Grade 9/.test(document.querySelector('.lab-photo .lab-eyebrow').textContent) && [...document.querySelectorAll('.lab-photo-rigs [data-v]')].map(b => b.dataset.v).join() === 'pond,leaf'"));
  await atGrade(4);
  await sleep(300);
  cnt = await counter(4);
  ok('back at Grade 4: its own counter, from its own ids', cnt.shown === cnt.saved && /^11\/11$/.test(cnt.shown), cnt);

  // ── Leaving ─────────────────────────────────────
  console.log('\n-- leaving');
  await act('say-coach');
  ok('…the lab knows it is speaking', (await dbg()).talking === true);
  const c2 = (await speech()).cancels;
  // ⚠ showScreen('student-home') can bounce with no child signed in; go
  //   somewhere that certainly hides the Labs screen, and check that it did.
  await ev("showScreen('landing'); true");
  await sleep(400);
  const left = await ev("({ hidden: document.getElementById('screen-labs').classList.contains('hidden'), talking: LabPhoto._debug().talking, looping: LabPhoto._debug().looping })");
  ok('leaving the Labs screen cancels the speech and stops the loop', left.hidden && !left.talking && !left.looping && (await speech()).cancels > c2, left);
  await ev("showScreen('labs'); true");
  await sleep(300);
  await ev("if (!document.querySelector('#labs-root .lab-photo')) Labs.openLab('photo'); true");
  await sleep(300);
  await act('say-coach');
  const c3 = (await speech()).cancels;
  ok('…speaking again after coming back, and the loop restarted', await ev('LabPhoto._debug().talking && LabPhoto._debug().looping'));
  await ev('Labs.backToHub(); true');
  ok('closing the lab (unmount) cancels the speech', (await speech()).cancels > c3 && (await dbg()).talking === false, await speech());
  if (await ev('!!window.__realGrade')) await ev('Labs.grade = window.__realGrade; true');
  ok('no page errors along the way', errors.length === 0, errors.slice(0, 5));

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); quit(1); });
