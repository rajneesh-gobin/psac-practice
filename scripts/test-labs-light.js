'use strict';
// Science Labs › Light Bench, driven in a real browser.
//
// Proves the bench end to end: it loads its own files only when opened, the
// start panel says what to do, all three guided experiments finish, every
// discovery unlocks by following its own "Show me how", both hazards stop the
// experiment with the right sign, both "what went wrong" cards show the wrong
// number, readings fill the notebook, both missions reach three stars, the
// ray box turns by button and by mouse drag, the animation loop runs, Calm
// Mode applies at once, and the bench fits a 360px phone.
//
// Grade 4 (PSAC, LAB_SPEC §8/§9): only that grade's guides, missions and
// discoveries show; the eyebrow names the grade; 🔊 read-aloud speaks only
// when tapped and is cancelled by an overlay, a step change, leaving the
// screen and closing the lab; the three hazards and three result cards; the
// four guides; both missions to three stars; every discovery by its own "Show
// me how"; Calm Mode; 360px. Progress for the two grades stays apart.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-light.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
// ⚠ Debugging port 9416 is this lab's; the other lab builds use their own.
// ⚠ Until the lead registers Grade 4 on the light row of Labs.LABS,
//   Labs.grade() says 9 for this lab whatever the pupil's grade. atGrade()
//   then overrides Labs.grade (and prints a NOTE); once registered, the test
//   takes the real path with no edit.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9416;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0, d;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); } };

(async () => {
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-labs-light-')),
    '--allow-file-access-from-files', '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  global.__chrome = chrome;
  const quit = code => { try { chrome.kill(); } catch (_) {} process.exit(code); };
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
  const dbg = () => ev('LabLight._debug()');
  const overlay = () => ev(`(() => { const o = document.getElementById('lab-overlay'); if (!o) return null;
    return { cls: o.className, text: o.textContent.replace(/\\s+/g, ' ').slice(0, 3000),
             signs: [...o.querySelectorAll('.lab-sign figcaption')].map(f => f.textContent) }; })()`);
  const closeOv = () => click('#lab-overlay [data-ov-close]');
  const shelf = (kind, id) => click(`[data-add="${kind}"][data-id="${id}"]`);
  const tool = act => click(`#lab-light-controls [data-act="${act}"]`);
  const power = want => ev(`(() => { if (LabLight._debug().power !== ${want}) document.getElementById('lab-light-power').click(); return LabLight._debug().power; })()`);

  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof openLabs === 'function' && typeof RoleModules !== 'undefined'"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url + ', not the file we navigated to.'); quit(1); }
  ok('app loaded', ready === true);
  await sleep(2500);
  // A stand-in for the speech engine: records what is spoken and cancelled.
  await ev(`(() => { const t = { spoken: [], cancels: 0, speaking: false, pending: false,
      speak(u) { this.spoken.push(u.text); }, cancel() { this.cancels++; }, getVoices() { return []; } };
    Object.defineProperty(window, 'speechSynthesis', { value: t, configurable: true, writable: true });
    window.__tts = t; return true; })()`);
  const speech = () => ev('({ spoken: window.__tts.spoken.slice(), cancels: window.__tts.cancels })');
  const forGrade = (kind, g) => `LabLightData.${kind}.filter(x => (x.grades || [9]).includes(${g}))`;
  const counter = g => ev(`(() => { const all = ${forGrade('DISCOVERIES', g)}, st = Labs.store('light');
    return { shown: document.getElementById('lab-found-n').textContent, saved: all.filter(d => st.disc[d.id]).length + '/' + all.length }; })()`);

  // ── Opening the bench ─────────────────────────
  console.log('\n-- opening the Light Bench');
  await ev("SELECTED_GRADE = 9; openLabs(); true");
  let hub = false;
  for (let i = 0; i < 40 && !hub; i++) { await sleep(250); hub = await ev("typeof Labs !== 'undefined' && !!document.querySelector('#labs-root .lab-hub')"); }
  ok('Grade 9: the Labs hub renders', hub);
  const labScripts = () => ev("[...document.scripts].map(s => s.src).filter(s => /engine\\/labs\\//.test(s)).map(s => s.split('/').pop()).join()");
  ok('no Light Bench code before it is opened', !/lab_light/.test(await labScripts()), await labScripts());
  await ev("Labs.openLab('light'); true");
  let up = false;
  for (let i = 0; i < 60 && !up; i++) { await sleep(200); up = await ev("typeof window.LabLight !== 'undefined' && !!document.querySelector('#labs-root .lab-light')"); }
  ok('Labs.openLab(\'light\') loads LabLight and renders the bench', up);
  ok('it fetched its own data file, then the bench', /lab_light_data\.js,lab_light\.js/.test(await labScripts()), await labScripts());
  await sleep(500);
  ok('lab_light.css is linked and styles the tools', await ev("!!document.querySelector('link[data-lab-css=\"light\"]') && getComputedStyle(document.querySelector('.lab-light-tools')).display === 'grid'"));
  let ov = await overlay();
  ok('first visit shows the welcome card with “Show me how”', ov && /Welcome to the Light Bench/.test(ov.text) && /Show me how/.test(ov.text), ov);
  await closeOv();
  ok('the welcome is remembered', await ev("Labs.store('light').intro === true"));
  ok('the top bar has back, the ray-box switch and help', await ev("!!document.querySelector('.lab-light [data-act=\"hub\"]') && !!document.getElementById('lab-light-power') && !!document.querySelector('.lab-light [data-act=\"help\"]')"));
  ok('Grade 9: the eyebrow says “Physics · Grade 9”, with no 🔊 and no Grade 4 apparatus',
     await ev("document.querySelector('.lab-light .lab-eyebrow').textContent === 'Physics · Grade 9' && !document.querySelector('.lab-light [data-act=\"say-coach\"]') && !document.querySelector('[data-id=\"shadow\"], [data-id=\"bounce\"], [data-id=\"cracked\"], [data-id=\"torch\"], [data-id=\"lamp\"]')"));
  await ev('LabLight._test({ instant: true }); true');

  // ── Start panel and a guided experiment ─────────
  console.log('\n-- what to do here');
  ok('the Bench tab opens with “What would you like to do?”, 3 guided experiments and 2 missions',
     await ev("/What would you like to do/.test(document.querySelector('.lab-start').textContent) && document.querySelectorAll('.lab-start [data-guide]').length === 3 && document.querySelectorAll('.lab-start [data-mission]').length === 2"));
  const guideState = () => ev(`(() => { const g = document.getElementById('lab-guide'), n = document.querySelector('.is-next');
    return { box: !g.hidden, text: g.textContent.replace(/\\s+/g, ' '),
             next: n ? (n.id || n.getAttribute('data-act') || n.getAttribute('data-ref') || (n.getAttribute('data-rot') ? n.getAttribute('data-rot') + n.getAttribute('data-d') : null)
                        || n.getAttribute('data-obj') || n.getAttribute('data-name') || (n.getAttribute('data-pos') ? 'pos' + n.getAttribute('data-pos') : null) || n.getAttribute('data-id')) : null,
             start: !!document.querySelector('.lab-start') }; })()`);
  await click('.lab-start [data-guide="reflect"]');
  let gs = await guideState();
  ok('Bounce a beam: the mirror is already there, so it opens at step 2 - switch on - and the switch glows',
     gs.box && /Step 2 of 7/.test(gs.text) && /Switch on the ray box/.test(gs.text) && gs.next === 'lab-light-power' && !gs.start, gs);
  await click('[data-guide-do]');
  gs = await guideState();
  ok('then “Draw the normal”, and that tool glows', /Step 3 of 7/.test(gs.text) && gs.next === 'normal', gs);
  await click('[data-guide-do]');
  gs = await guideState();
  ok('then the protractor', /Step 4 of 7/.test(gs.text) && gs.next === 'protractor', gs);
  await click('[data-guide-do]');
  gs = await guideState();
  ok('then “Read the angles”', /Step 5 of 7/.test(gs.text) && gs.next === 'read', gs);
  await click('[data-guide-do]');
  gs = await guideState();
  ok('the reading is taken and the guide asks for 50°, with the clockwise turn button glowing', /Step 6 of 7/.test(gs.text) && gs.next === 'box1', gs);
  let nb = await ev("[...document.querySelectorAll('#lab-notebook tr')].map(r => [...r.children].map(c => c.textContent.trim()).join(' ')).join(' | ')");
  ok('the notebook table has i = 30°, r = 30°',
     /30° 30° ✓ i = r/.test(nb) && await ev("/Reflection at a plane mirror/.test(document.querySelector('#lab-notebook caption').textContent)"), nb.slice(0, 300));
  ok('the canvas shows the reading chip', /i = 30°, r = 30°/.test(await ev("document.getElementById('lab-light-contents').textContent")));
  await click('[data-guide-do]');
  ok('turning to 50° set the angle of incidence to 50°', (await dbg()).i === 50);
  await click('[data-guide-do]');
  ov = await overlay();
  ok('the second reading completes it, with “What you found out”', ov && /Experiment complete/.test(ov.text) && /What you found out/.test(ov.text) && /NORMAL/.test(ov.text), ov);
  ok('…remembered, and offers the next one', await ev("!!Labs.store('light').guides.reflect") && /Next: Bend a beam with glass/.test(ov.text));
  ok('both readings are in the table: 30/30 and 50/50', /50° 50°/.test(await ev("[...document.querySelectorAll('#lab-notebook tr')].map(r => [...r.children].map(c => c.textContent.trim()).join(' ')).join(' | ')")));
  await click('#lab-overlay [data-guide="bend"]');
  const runGuide = () => ev(`(() => { for (let k = 0; k < 20 && LabLight._debug().guide; k++) {
      const b = document.querySelector('#lab-guide [data-guide-do]'); if (b) b.click(); else LabLight._tick(6); }
    const o = document.getElementById('lab-overlay'); return o ? o.textContent.replace(/\\s+/g, ' ') : 'no overlay'; })()`);
  let txt = await runGuide();
  ok('“Bend a beam with glass” runs to the end: towards the normal, parallel out', /Experiment complete/.test(txt) && /TOWARDS the normal/.test(txt) && /parallel/.test(txt), txt.slice(0, 200));
  d = await dbg();
  ok('…having measured 40° in air and 25° in glass', d.readings.some(r => r.setup === 'block' && r.i === 40 && r.r === 25 && r.ok), d.readings);
  await closeOv();
  await ev("LabLight.startGuide('straight'); true");
  txt = await runGuide();
  ok('“Does light travel in straight lines?” runs to the end', /Experiment complete/.test(txt) && /straight line/.test(txt), txt.slice(0, 200));
  await closeOv();
  ok('all three guides are ticked off on the start panel', (await ev("document.querySelectorAll('.lab-start .lab-start-card.is-done').length")) === 3);

  // ── Controls ────────────────────────────────────
  console.log('\n-- turning things');
  await shelf('setup', 'mirror');
  await power(true);
  await click('[data-rot="box"][data-d="1"]');
  d = await dbg();
  ok('↻ Ray box turns it 5°: i 30° → 35°', d.beta === 35 && d.i === 35, d);
  await click('[data-rot="tilt"][data-d="1"]');
  d = await dbg();
  ok('↻ Mirror turns the mirror 5°, and the angle of incidence with it', d.tau === 5 && d.i === 40, d);
  await click('[data-rot="tilt"][data-d="-1"]');
  const bp = (await dbg()).boxPx;
  const L = Math.hypot(bp.x - bp.px, bp.y - bp.py), tgt = [bp.px - L * Math.sin(60 * Math.PI / 180), bp.py - L * Math.cos(60 * Math.PI / 180)];
  await call('Input.dispatchMouseEvent', { type: 'mousePressed', x: bp.x, y: bp.y, button: 'left', clickCount: 1 });
  await call('Input.dispatchMouseEvent', { type: 'mouseMoved', x: (bp.x + tgt[0]) / 2, y: (bp.y + tgt[1]) / 2, button: 'left', buttons: 1 });
  await call('Input.dispatchMouseEvent', { type: 'mouseMoved', x: tgt[0], y: tgt[1], button: 'left', buttons: 1 });
  await call('Input.dispatchMouseEvent', { type: 'mouseReleased', x: tgt[0], y: tgt[1], button: 'left', clickCount: 1 });
  d = await dbg();
  ok('with a mouse, dragging the ray box round turns it (to about 60°)', Math.abs(d.beta - 60) <= 2, { beta: d.beta, bp, tgt });

  // ── Mistakes that teach ────────────────────────
  console.log('\n-- mistakes');
  await shelf('setup', 'mirror');
  await power(true);
  await tool('normal'); await tool('protractor');
  await click('[data-ref="surface"]');
  ok('the protractor now counts from the mirror, and a chip says so', /Counting from the surface/.test(await ev("document.getElementById('lab-light-status').textContent")));
  await tool('read');
  ov = await overlay();
  ok('reading from the mirror: “What went wrong” card with the 90° − θ working',
     ov && /is-result/.test(ov.cls) && /measured from the mirror, not the normal/.test(ov.text) && /90° − 30° = 60°/.test(ov.text) && /What you should have done/.test(ov.text) && /On the NCE paper/.test(ov.text), ov);
  await closeOv();
  nb = await ev("[...document.querySelectorAll('#lab-notebook tr')].map(r => [...r.children].map(c => c.textContent.trim()).join(' ')).join(' | ')");
  ok('…and the wrong reading stays in the table, struck through', /60° 60° ✗ measured from the mirror/.test(nb) && await ev("!!document.querySelector('.lab-light-bad-row')"), nb.slice(0, 400));
  await click('[data-ref="normal"]');
  await tool('eye');
  await tool('read');
  ov = await overlay();
  ok('reading with the eye to the side: PARALLAX card, and the two readings split (34° / 26°)',
     ov && /is-result/.test(ov.cls) && /Parallax error/.test(ov.text) && /34°/.test(ov.text) && /26°/.test(ov.text), ov);
  await closeOv();
  await tool('eye');
  ok('the eye is back above the scale', (await dbg()).eye === 'above');

  await shelf('setup', 'cards'); await shelf('source', 'laser'); await power(true);
  ok('laser through three lined-up holes lights a spot on the screen (discovery)', await ev("!!Labs.store('light').disc.laser_spot"));
  await tool('look');
  ov = await overlay();
  ok('looking through the holes with the laser on: BRIGHT LIGHT hazard card', ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Bright light') && /never look along a laser beam/i.test(ov.text), ov);
  ok('…which says what happened, why, what to do instead and the exam point',
     ov && /What happened/.test(ov.text) && /Why it’s dangerous/.test(ov.text) && /Do this instead/.test(ov.text) && /On the NCE paper/.test(ov.text));
  await closeOv();
  ok('…and the hazard is counted', await ev("Labs.store('light').hazards.laser_eye >= 1"));

  await shelf('source', 'raybox'); await shelf('setup', 'mirror'); await power(true);
  await ev('LabLight._tick(30); true');
  ok('after 30 s on, the lamp housing is hot and the chip says so', /Lamp housing hot/.test(await ev("document.getElementById('lab-light-status').textContent")));
  await power(false);
  await tool('pack');
  ov = await overlay();
  ok('packing it away straight after switching off: HOT SURFACE hazard card', ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Hot surface') && /lamp housing is hot/.test(ov.text), ov);
  await closeOv();
  await ev('LabLight._tick(60); true');
  await tool('pack');
  d = await dbg();
  ok('once it has cooled, it packs away safely and the bench is empty', d.setup === null && !(await overlay()) && await ev("!!Labs.store('light').disc.safe_pack"), d.setup);

  // ── Missions ───────────────────────────────────
  console.log('\n-- missions');
  const answerAll = idx => ev(`(() => {
    const qs = LabLightData.MISSIONS[${idx}].quiz;
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
  await ev("LabLight.startMission('law'); true");
  await power(true); await tool('normal'); await tool('protractor');
  for (const a of [20, 45, 70]) { await ev(`LabLight.setAngle(${a}); true`); await tool('read'); }
  d = await dbg();
  ok('Prove the law of reflection: three readings at three angles complete it', d.mission && d.mission.success && d.mission.n === 3 && !d.mission.mistakes, d.mission);
  ok('the mission panel ticks every step', await ev("document.querySelectorAll('#lab-mission .lab-steps li.is-done').length === 4"));
  await click('[data-act="quiz"]');
  ok('all answers right and no mistakes: 3 stars', (await answerAll(0)) === '3 of 3 stars');
  ok('the stars are saved', await ev("Labs.store('light').missions.law.stars === 3"));
  await closeOv();

  await ev("LabLight.startMission('bend'); true");
  ok('Bend the beam puts the glass block on the bench', (await dbg()).setup === 'block');
  await power(true); await tool('normal'); await tool('protractor');
  for (const a of [0, 30, 60]) { await ev(`LabLight.setAngle(${a}); true`); await tool('read'); }
  d = await dbg();
  ok('three readings are not enough - the block still has to be traced and lifted', !d.mission.success, d.mission);
  await tool('lift');
  d = await dbg();
  ok('…lifting it completes the mission', d.mission.success && d.lifted, d.mission);
  nb = await ev("[...document.querySelectorAll('#lab-notebook tr')].map(r => [...r.children].map(c => c.textContent.trim()).join(' ')).join(' | ')");
  ok('the refraction table: 0°/0° no bend, 30°/19°, 60°/35° bent towards the normal',
     /0° 0° no bend/.test(nb) && /30° 19° bent towards the normal/.test(nb) && /60° 35° bent towards the normal/.test(nb), nb.slice(0, 500));
  await click('[data-act="quiz"]');
  ok('Bend the beam: 3 stars', (await answerAll(1)) === '3 of 3 stars');
  await closeOv();
  await ev("LabLight.startMission('law'); true");
  await power(true); await tool('normal'); await tool('protractor');
  await click('[data-ref="surface"]'); await tool('read'); await closeOv(); await click('[data-ref="normal"]');
  for (const a of [20, 45, 70]) { await ev(`LabLight.setAngle(${a}); true`); await tool('read'); }
  await click('[data-act="quiz"]');
  ok('a wrong reading during the mission costs a star: 2 stars (best of 3 is kept)', (await answerAll(0)) === '2 of 3 stars' && await ev("Labs.store('light').missions.law.stars === 3"));
  await closeOv();

  // ── Discoveries ────────────────────────────────
  console.log('\n-- discoveries');
  await click('[data-panel="found"]');
  ok('the Discoveries tab lists found cards and clues - Grade 9’s only', await ev(`document.querySelectorAll('.lab-found-card').length === ${forGrade('DISCOVERIES', 9)}.length && document.querySelectorAll('.lab-found-card.is-found').length >= 8 && ![...document.querySelectorAll('.lab-found-card')].some(c => c.dataset.disc.startsWith('g4_'))`));
  await click('.lab-found-card.is-found[data-disc="law_reflection"]');
  ov = await overlay();
  ok('a found card: what you saw, the rule, why, the paper, “Do it again”',
     ov && /What you saw/.test(ov.text) && /angle of incidence i = angle of reflection r/.test(ov.text) && /Why it happens/.test(ov.text) && /Physics 2022 Q4\(b\)/.test(ov.text) && /Do it again/.test(ov.text), ov);
  await closeOv();
  await ev("delete Labs.store('light').disc.turn_mirror; true");
  await click('[data-panel="sandbox"]'); await click('[data-panel="found"]');
  await click('.lab-found-card[data-disc="turn_mirror"]');
  ov = await overlay();
  ok('a locked card: the clue, “How to find it” and “Show me how”', ov && /Locked discovery/.test(ov.text) && /How to find it/.test(ov.text) && /Show me how/.test(ov.text), ov);
  await click('#lab-overlay [data-disc-go]');
  ok('“Show me how” starts a guide from its recipe', (await dbg()).guide && (await dbg()).guide.id === 'disc-turn_mirror');
  await ev("LabLight.startGuide('reflect'); document.querySelector('[data-act=\"guide-stop\"]').click(); true");

  // Follow every discovery's own "Show me how" from a fresh bench.
  const unlockAll = async g => {
    const ids = await ev(`${forGrade('DISCOVERIES', g)}.map(d => d.id)`);
    const unsolved = [];
    for (const id of ids) {
      const res = await ev(`(() => {
        const st = Labs.store('light'); delete st.disc['${id}'];
        document.getElementById('lab-overlay')?.remove();
        LabLight.discoveryGuide('${id}');
        if (!LabLight._debug().guide) return 'no guide started';
        for (let k = 0; k < 24 && LabLight._debug().guide; k++) {
          const hz = document.querySelector('#lab-overlay.is-hazard, #lab-overlay.is-result');
          if (hz) return 'card: ' + hz.textContent.replace(/\\s+/g, ' ').slice(0, 90);
          const btn = document.querySelector('#lab-guide [data-guide-do]');
          if (btn) btn.click(); else LabLight._tick(6);
        }
        if (LabLight._debug().guide) return 'guide never finished at step ' + LabLight._debug().guide.step;
        document.getElementById('lab-overlay')?.remove();
        return !!st.disc['${id}'];
      })()`);
      if (res !== true) unsolved.push(id + ' → ' + res);
    }
    return { ids, unsolved };
  };
  let un = await unlockAll(9);
  ok(`all ${un.ids.length} Grade 9 discoveries unlock by following their own “Show me how”`, un.unsolved.length === 0, un.unsolved);
  let cnt = await counter(9);
  ok('the ✨ counter matches what is saved', cnt.shown === cnt.saved, cnt);

  // ── Motion, calm, phone ─────────────────────────
  console.log('\n-- motion, calm, phone');
  await ev("LabLight._test({ instant: false }); true");
  await click('[data-panel="sandbox"]');
  await shelf('setup', 'mirror');
  await power(false); await power(true);
  const grow0 = (await dbg()).beamT;
  await sleep(1200);
  const grow1 = (await dbg()).beamT;
  // ⚠ A frame can land between the click and the read, so grow0 is "barely started", not exactly 0.
  ok('with animation on, the ray grows out of the box (the loop is running)', grow0 < 0.3 && grow1 === 1, { grow0, grow1 });
  ok('the canvas has drawn the bench', await ev("(() => { const c = document.getElementById('lab-light-canvas'); const p = c.getContext('2d').getImageData(c.width / 2, c.height / 2, 1, 1).data; return p[3] > 0; })()"));
  await ev("document.documentElement.classList.add('kid-calm'); true");
  await shelf('setup', 'cards'); await shelf('source', 'laser'); await power(true);
  await tool('look');
  ov = await overlay();
  ok('in Calm Mode a hazard applies at once (no animation first)', ov && ov.signs.includes('Bright light'), ov);
  await closeOv();
  await power(false); await power(true);
  await sleep(200);
  ok('in Calm Mode the ray is drawn at full length straight away', (await dbg()).beamT === 1);
  await ev("document.documentElement.classList.remove('kid-calm'); true");
  await power(false); await shelf('source', 'raybox');

  for (const setup of ['mirror', 'block', 'cards']) {
    await click('[data-panel="sandbox"]');
    await shelf('setup', setup);
    if (setup !== 'cards') { await tool('protractor'); }
    const fit = await ev(`(() => { const vw = innerWidth;
      const off = [...document.querySelectorAll('#labs-root button, #labs-root canvas')]
        .filter(e => e.getClientRects().length && e.getBoundingClientRect().right > vw + 0.5)
        .map(e => (e.getAttribute('data-panel') || e.getAttribute('data-act') || e.getAttribute('data-id') || e.getAttribute('data-rot') || e.tagName) + ' → ' + Math.round(e.getBoundingClientRect().right));
      const small = [...document.querySelectorAll('#labs-root .lab-light-controls button, #labs-root .lab-top button')]
        .filter(e => e.getClientRects().length && e.getBoundingClientRect().height < 43.5).map(e => e.textContent.trim().slice(0, 20));
      return { vw, root: document.getElementById('labs-root').scrollWidth, off, small }; })()`);
    ok(`${setup}: fits a 360px phone - no control past the edge, tap targets ≥ 44px`, fit.root <= fit.vw && fit.off.length === 0 && fit.small.length === 0, fit);
  }

  // ══════════════════════════════════════════════
  //  GRADE 4 - the PSAC level
  // ══════════════════════════════════════════════
  const nbRows = () => ev("[...document.querySelectorAll('#lab-notebook tr')].map(r => [...r.children].map(c => c.textContent.trim()).join(' ')).join(' | ')");
  // Open the lab at grade n - the real way when the lab is registered for n.
  const atGrade = async n => {
    await ev("document.getElementById('lab-overlay')?.remove(); if (typeof Labs !== 'undefined' && document.querySelector('#labs-root .lab-light')) Labs.backToHub(); true");
    await ev(`SELECTED_GRADE = ${n}; showScreen('labs'); true`);
    let up2 = false;
    for (let i = 0; i < 40 && !up2; i++) { await sleep(250); up2 = await ev("typeof window.Labs !== 'undefined' && !!document.querySelector('#labs-root .lab-hub')"); }
    const real = await ev(`Labs.labsFor(${n}).some(l => l.id === 'light')`);
    if (real) await ev('if (window.__realGrade) { Labs.grade = window.__realGrade; } true');
    else {
      console.log(`NOTE Grade ${n}: the Light Bench is not registered for Grade ${n} yet (Labs.LABS / _LAB_GRADES), so Labs.grade is overridden to ${n}.`);
      await ev(`window.__realGrade = window.__realGrade || Labs.grade; Labs.grade = () => ${n}; true`);
    }
    await ev("Labs.openLab('light'); true");
    let m = false;
    for (let i = 0; i < 60 && !m; i++) { await sleep(150); m = await ev("!!document.querySelector('#labs-root .lab-light')"); }
    const g0 = (await dbg()).grade;
    ok(`Grade ${n}: the lab opens at Grade ${n}`, m && g0 === n, g0);
    return real;
  };
  const idxOf = id => ev(`LabLightData.MISSIONS.findIndex(m => m.id === '${id}')`);

  console.log('\n-- Grade 4: opening');
  const real4 = await atGrade(4);
  await sleep(300);
  ov = await overlay();
  ok('Grade 4: a first visit shows its own welcome, with 🔊 and “Show me how”, and no protractor',
     ov && /Welcome to the Light Bench/.test(ov.text) && /🔊/.test(ov.text) && /Show me how/.test(ov.text) && !/protractor/i.test(ov.text), ov && ov.text.slice(0, 300));
  ok('Grade 4: nothing was read aloud on its own', (await speech()).spoken.length === 0);
  await closeOv();
  ok('Grade 4: the welcome is remembered for this grade only', await ev("Labs.store('light').intro_g4 === true && Labs.store('light').intro === true"));
  ok('Grade 4: the eyebrow says “Science · Grade 4”, and the switch is the torch',
     await ev("document.querySelector('.lab-light .lab-eyebrow').textContent === 'Science · Grade 4' && /Torch off/.test(document.getElementById('lab-light-power').textContent)"));
  ok('Grade 4: no Grade 9 apparatus - no ray box, laser, glass block, plane mirror, protractor or normal',
     await ev("!document.querySelector('[data-id=\"raybox\"], [data-id=\"laser\"], [data-id=\"block\"], [data-id=\"mirror\"], [data-act=\"protractor\"], [data-act=\"normal\"], [data-act=\"read\"]')"));
  await ev('LabLight._test({ instant: true }); true');
  const want = await ev(`({ g: ${forGrade('GUIDES', 4)}.map(x => x.id), m: ${forGrade('MISSIONS', 4)}.map(x => x.id), d: ${forGrade('DISCOVERIES', 4)}.length })`);
  const shown = await ev("({ g: [...document.querySelectorAll('.lab-start [data-guide]')].map(b => b.dataset.guide), m: [...document.querySelectorAll('.lab-start [data-mission]')].map(b => b.dataset.mission), n: document.getElementById('lab-found-n').textContent })");
  ok(`Grade 4: the start panel shows exactly its ${want.g.length} guides and ${want.m.length} missions, none from Grade 9`,
     JSON.stringify(shown.g) === JSON.stringify(want.g) && JSON.stringify(shown.m) === JSON.stringify(want.m) && want.g.length >= 3 && want.m.length >= 2, { shown, want });
  ok(`Grade 4: the ✨ counter counts its own ${want.d} discoveries and starts at 0 (Grade 9’s ${await ev(`${forGrade('DISCOVERIES', 9)}.length`)} do not count)`, shown.n === `0/${want.d}` && want.d >= 10, shown.n);
  await click('[data-panel="missions"]');
  ok('Grade 4: the Missions tab lists only its missions', await ev(`JSON.stringify([...document.querySelectorAll('.lab-missions [data-mission]')].map(b => b.dataset.mission)) === JSON.stringify(${JSON.stringify(want.m)})`));
  await click('[data-panel="found"]');
  ok(`Grade 4: the Discoveries tab shows only its ${want.d} cards`, await ev(`document.querySelectorAll('.lab-found-card').length === ${want.d} && [...document.querySelectorAll('.lab-found-card')].every(c => c.dataset.disc.startsWith('g4_'))`));
  await click('[data-panel="sandbox"]');

  console.log('\n-- Grade 4: read aloud');
  await click('[data-act="tip"]');
  const coachText = await ev("document.getElementById('lab-coach-text').textContent");
  await click('[data-act="say-coach"]');
  let sp = await speech();
  ok('Grade 4: 🔊 on the lab assistant speaks its words, without the emoji', sp.spoken.length === 1 && coachText.includes(sp.spoken[0].slice(0, 12)) && !/💡/.test(sp.spoken[0]), sp);
  const c0 = sp.cancels;
  await click('.lab-light [data-act="help"]');
  ok('Grade 4: opening an overlay cancels the speech', (await speech()).cancels > c0);
  ov = await overlay();
  ok('Grade 4: help is written for Grade 4 (shadows, the Sun, broken glass) with no protractor',
     ov && /shadow/i.test(ov.text) && /Sun/.test(ov.text) && /broken glass/i.test(ov.text) && !/protractor|normal/i.test(ov.text), ov && ov.text.slice(0, 200));
  await closeOv();

  console.log('\n-- Grade 4: guided experiments');
  await click('.lab-start [data-guide="g4_shadows"]');
  gs = await guideState();
  ok('Make a shadow: the bench and the card tree are already there, so it opens at step 3 - switch on - the switch glows, with a 🔊 button',
     gs.box && /Step 3 of 5/.test(gs.text) && gs.next === 'lab-light-power' && !!(await ev("document.querySelector('#lab-guide [data-act=\"say-guide\"]')")), gs);
  const sp0 = (await speech()).spoken.length;
  await click('#lab-guide [data-act="say-guide"]');
  sp = await speech();
  ok('Grade 4: 🔊 on the guide box reads the step', sp.spoken.length === sp0 + 1 && /Switch on the torch/.test(sp.spoken[sp.spoken.length - 1]), sp.spoken.slice(-1));
  const c1 = sp.cancels;
  await click('[data-guide-do]');
  ok('Grade 4: the next step cancels the speech', (await speech()).cancels > c1, await speech());
  gs = await guideState();
  ok('…then the tracing paper, and its button glows', /Step 4 of 5/.test(gs.text) && gs.next === 'tracing', gs);
  txt = await runGuide();
  ok('Make a shadow runs to “What you found out”: dark, pale, almost none', /Experiment complete/.test(txt) && /What you found out/.test(txt) && /Translucent/.test(txt), txt.slice(0, 250));
  ok('…remembered', await ev("!!Labs.store('light').guides.g4_shadows"));
  cnt = await counter(4);
  ok('Grade 4: discoveries came on the way (source, dark, shape, pale, clear), and the counter matches',
     cnt.shown === cnt.saved && await ev("['g4_source','g4_shadow','g4_shape','g4_pale','g4_clear'].every(k => Labs.store('light').disc[k])"), cnt);
  await closeOv();
  await ev("LabLight.startGuide('g4_size'); true");
  txt = await runGuide();
  d = await dbg();
  ok('Big shadow, small shadow runs to the end: 20 cm, then 30 cm near the torch, then 6 cm far away',
     /Experiment complete/.test(txt) && d.shadows.map(s => s.cm).join() === '20,30,6', { txt: txt.slice(0, 120), shadows: d.shadows });
  nb = await nbRows();
  ok('…the notebook table has the three measurements', /15 cm 0 cm 20 cm ✓/.test(nb) && /10 cm 0 cm 30 cm ✓/.test(nb) && /50 cm 0 cm 6 cm ✓/.test(nb), nb.slice(0, 400));
  await closeOv();
  for (const [id, name] of [['g4_straight', 'Does light go in straight lines?'], ['g4_mirror', 'Bounce the light']]) {
    await ev(`LabLight.startGuide('${id}'); true`);
    txt = await runGuide();
    ok(`${name} runs to the end`, /Experiment complete/.test(txt) && /What you found out/.test(txt), txt.slice(0, 200));
    await closeOv();
  }
  ok('…the bounced light is on the teddy', (await dbg()).hit === true);
  ok('all four Grade 4 guides are ticked off on the start panel', (await ev("document.querySelectorAll('.lab-start .lab-start-card.is-done').length")) === 4);

  console.log('\n-- Grade 4: mistakes');
  await ev('LabLight._test({ instant: false }); true');
  await shelf('setup', 'shadow'); await power(true);
  await tool('stare');
  const mid = { ov: await overlay(), busy: (await dbg()).busy };
  await sleep(1400);
  ov = await overlay();
  ok('staring into the torch: the flash on the canvas first, then a BRIGHT LIGHT hazard card',
     mid.ov === null && mid.busy === true && ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Bright light') && /never stare/i.test(ov.text), { mid, ov });
  ok('…which says what happened, why, what to do instead (the Sun too) and the exam point',
     ov && /What happened/.test(ov.text) && /Why it’s dangerous/.test(ov.text) && /Do this instead/.test(ov.text) && /Sun/.test(ov.text));
  if (real4) ok('…its exam section says “In the PSAC exam”, from Labs.grade()', /In the PSAC exam/.test(ov.text), ov.text.slice(0, 400));
  else console.log('NOTE Grade 4: the exam heading follows the shell’s own grade, so “In the PSAC exam” is checked only once the lab is registered for Grade 4.');
  await closeOv();
  await ev('LabLight._test({ instant: true }); true');
  await shelf('setup', 'cracked');
  ov = await overlay();
  ok('picking up the old cracked mirror: a SHARP hazard card, and it never reaches the table',
     ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Sharp - can cut') && /broken glass/i.test(ov.text) && (await dbg()).setup === 'shadow', ov);
  await closeOv();
  await shelf('source', 'lamp'); await power(true);
  await ev('LabLight._tick(30); true');
  ok('after 30 s on, the desk lamp is hot and a chip says so', /Lamp is hot/.test(await ev("document.getElementById('lab-light-status').textContent")));
  await power(false);
  await tool('pack');
  ov = await overlay();
  ok('packing the lamp straight after switching off: a HOT SURFACE hazard card', ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Hot surface') && /lamp is hot/.test(ov.text), ov);
  await closeOv();
  await ev('LabLight._tick(60); true');
  await tool('pack');
  ok('once it has cooled, it packs away safely (a discovery)', (await dbg()).setup === null && !(await overlay()) && await ev("!!Labs.store('light').disc.g4_safe_pack"));
  ok('the three Grade 4 hazards are counted', await ev("['g4_eye', 'g4_sharp', 'g4_hot'].every(k => Labs.store('light').hazards[k] >= 1)"));
  await shelf('source', 'torch');

  const fresh4 = async () => { await ev("document.getElementById('lab-overlay')?.remove(); LabLight.startGuide('g4_shadows'); true"); await click('[data-act="guide-stop"]'); };
  await fresh4(); await power(true);
  await click('[data-obj="tracing"]'); await click('[data-name="transparent"]');
  ov = await overlay();
  ok('calling tracing paper transparent: “Tracing paper is not transparent” - it made a pale shadow, so it is translucent',
     ov && /is-result/.test(ov.cls) && /Tracing paper is not transparent/.test(ov.text) && /pale, fuzzy shadow/.test(ov.text) && /What you should have done/.test(ov.text), ov);
  await closeOv();
  await fresh4(); await power(true);
  await tool('measure'); await tool('torch'); await click('[data-pos="1"]'); await tool('measure');
  ov = await overlay();
  ok('moving the torch AND the tree between measurements: “Not a fair test”, with both numbers (20 cm → 10 cm)',
     ov && /is-result/.test(ov.cls) && /Not a fair test/.test(ov.text) && /20 cm to 10 cm/.test(ov.text), ov);
  await closeOv();
  await fresh4(); await power(true);
  await tool('ruler');
  ok('the ruler chip says it is upside down', /Ruler upside down/.test(await ev("document.getElementById('lab-light-status').textContent")));
  await tool('measure');
  ov = await overlay();
  ok('measuring with the ruler upside down: the wrong-end card, with 30 − 10 = 20', ov && /is-result/.test(ov.cls) && /wrong end/.test(ov.text) && /30 − 10 = 20/.test(ov.text), ov);
  await closeOv();
  nb = await nbRows();
  ok('…and both wrong measurements stay in the table, struck through', /✗ not a fair test/.test(nb) && /✗ ruler upside down/.test(nb) && await ev("!!document.querySelector('.lab-light-bad-row')"), nb.slice(0, 500));

  console.log('\n-- Grade 4: missions');
  await ev("LabLight.startMission('g4_detective'); true");
  await power(true);
  for (const [o, w] of [['glass', 'transparent'], ['tracing', 'translucent'], ['wood', 'opaque']]) { await click(`[data-obj="${o}"]`); await click(`[data-name="${w}"]`); }
  d = await dbg();
  ok('Shadow detective: one of each named right, with no mistakes', d.mission && d.mission.success && !d.mission.mistakes, d.mission);
  ok('…the mission panel ticks every step', await ev("document.querySelectorAll('#lab-mission .lab-steps li.is-done').length === 4"));
  await click('[data-act="quiz"]');
  ok('Shadow detective: 3 stars', (await answerAll(await idxOf('g4_detective'))) === '3 of 3 stars');
  await closeOv();
  await ev("LabLight.startMission('g4_sizes'); true");
  await power(true);
  await tool('measure'); await click('[data-pos="-1"]'); await tool('measure'); await click('[data-pos="1"]'); await click('[data-pos="1"]'); await tool('measure');
  d = await dbg();
  ok('Grow a shadow: three fair measurements (the 15, 12 and 25 cm marks), torch never moved', d.mission && d.mission.success && !d.mission.mistakes, d.mission);
  await click('[data-act="quiz"]');
  ok('Grow a shadow: 3 stars', (await answerAll(await idxOf('g4_sizes'))) === '3 of 3 stars');
  await closeOv();
  ok('the stars are saved under the Grade 4 mission ids', await ev(`${forGrade('MISSIONS', 4)}.every(M => Labs.store('light').missions[M.id] && Labs.store('light').missions[M.id].stars === 3)`));

  console.log('\n-- Grade 4: motion, calm, phone');
  await ev("LabLight._test({ instant: false }); true");
  await click('[data-panel="sandbox"]');
  await shelf('setup', 'shadow');
  await power(false); await power(true);
  const gA = (await dbg()).beamT;
  await sleep(1200);
  const gB = (await dbg()).beamT;
  ok('Grade 4: with animation on, the light spreads out to the screen (the loop is running)', gA < 0.3 && gB === 1, { gA, gB });
  ok('Grade 4: the canvas has drawn the shadow bench', await ev("(() => { const c = document.getElementById('lab-light-canvas'); const p = c.getContext('2d').getImageData(c.width / 2, c.height / 2, 1, 1).data; return p[3] > 0; })()"));
  await ev("document.documentElement.classList.add('kid-calm'); true");
  await tool('stare');
  ov = await overlay();
  ok('Grade 4: in Calm Mode a hazard applies at once', ov && ov.signs.includes('Bright light'), ov);
  await closeOv();
  await power(false); await power(true);
  await sleep(200);
  ok('Grade 4: in Calm Mode the light is drawn at full length straight away', (await dbg()).beamT === 1);
  await ev("document.documentElement.classList.remove('kid-calm'); LabLight._test({ instant: true }); true");
  for (const setup of ['shadow', 'bounce', 'cards']) {
    await click('[data-panel="sandbox"]');
    await shelf('setup', setup);
    const fit = await ev(`(() => { const vw = innerWidth;
      const off = [...document.querySelectorAll('#labs-root button, #labs-root canvas')]
        .filter(e => e.getClientRects().length && e.getBoundingClientRect().right > vw + 0.5)
        .map(e => (e.getAttribute('data-panel') || e.getAttribute('data-act') || e.getAttribute('data-id') || e.getAttribute('data-obj') || e.getAttribute('data-name') || e.tagName) + ' → ' + Math.round(e.getBoundingClientRect().right));
      const small = [...document.querySelectorAll('#labs-root .lab-light-controls button, #labs-root .lab-top button, #labs-root .lab-coach button')]
        .filter(e => e.getClientRects().length && (e.getBoundingClientRect().height < 43.5 || e.getBoundingClientRect().width < 43.5)).map(e => e.textContent.trim().slice(0, 20));
      return { vw, root: document.getElementById('labs-root').scrollWidth, off, small }; })()`);
    ok(`Grade 4, ${setup}: fits a 360px phone - no control past the edge, tap targets ≥ 44px`, fit.root <= fit.vw && fit.off.length === 0 && fit.small.length === 0, fit);
  }

  console.log('\n-- Grade 4: discoveries');
  un = await unlockAll(4);
  ok(`Grade 4: all ${un.ids.length} discoveries unlock by following their own “Show me how”`, un.unsolved.length === 0 && un.ids.length >= 10, un.unsolved);
  cnt = await counter(4);
  ok('Grade 4: …and the counter says so', cnt.shown === cnt.saved && cnt.shown === `${un.ids.length}/${un.ids.length}`, cnt);
  await click('[data-panel="found"]');
  await click('.lab-found-card.is-found[data-disc="g4_pale"]');
  ov = await overlay();
  ok('Grade 4: a found discovery explains itself in Grade 4 words, with no NCE paper', ov && /What you saw/.test(ov.text) && /translucent/.test(ov.text) && !/NCE/.test(ov.text), ov && ov.text.slice(0, 300));
  await closeOv();
  await click('[data-panel="sandbox"]');

  // ── Progress kept apart ──────────────────────────
  console.log('\n-- progress per grade');
  const st = await ev("(() => { const s = Labs.store('light'); return { disc: Object.keys(s.disc), missions: Object.keys(s.missions), guides: Object.keys(s.guides) }; })()");
  ok('the store keeps each grade under its own ids (g4_… and the Grade 9 ones), nothing shared',
     st.disc.some(x => x.startsWith('g4_')) && st.disc.includes('law_reflection') && st.missions.includes('law') && st.missions.includes('g4_sizes') && st.guides.includes('reflect') && st.guides.includes('g4_shadows'), st);
  await atGrade(9);
  await sleep(300);
  cnt = await counter(9);
  const n9 = await ev(`${forGrade('DISCOVERIES', 9)}.length`);
  ok(`back at Grade 9: its counter still reads ${n9}/${n9} - the Grade 4 discoveries do not count toward it`, cnt.shown === `${n9}/${n9}` && cnt.shown === cnt.saved, cnt);
  ok('…the Grade 9 eyebrow, guides and missions are back, with no 🔊',
     await ev("document.querySelector('.lab-light .lab-eyebrow').textContent === 'Physics · Grade 9' && document.querySelectorAll('.lab-start [data-guide]').length === 3 && !document.querySelector('[data-guide^=\"g4_\"], [data-mission^=\"g4_\"], [data-act=\"say-coach\"]')"));
  await atGrade(4);
  await sleep(300);
  cnt = await counter(4);
  ok('back at Grade 4: its own counter, from its own ids', cnt.shown === cnt.saved && cnt.shown === `${un.ids.length}/${un.ids.length}`, cnt);

  // ── Leaving ─────────────────────────────────────
  console.log('\n-- leaving');
  await click('[data-act="say-coach"]');
  ok('…the lab knows it is speaking', (await dbg()).talking === true);
  const c2 = (await speech()).cancels;
  // ⚠ showScreen('student-home') can bounce with no child signed in; go
  //   somewhere that certainly hides the Labs screen, and check that it did.
  await ev("showScreen('landing'); true");
  await sleep(400);
  const left = await ev("({ hidden: document.getElementById('screen-labs').classList.contains('hidden'), talking: LabLight._debug().talking, looping: LabLight._debug().looping })");
  ok('leaving the Labs screen cancels the speech and stops the loop', left.hidden && !left.talking && !left.looping && (await speech()).cancels > c2, left);
  await ev("showScreen('labs'); true");
  await sleep(300);
  await ev("if (!document.querySelector('#labs-root .lab-light')) Labs.openLab('light'); true");
  await sleep(300);
  await click('[data-act="say-coach"]');
  const c3 = (await speech()).cancels;
  ok('…speaking again after coming back, and the loop restarted', await ev('LabLight._debug().talking && LabLight._debug().looping'));
  await ev('Labs.backToHub(); true');
  ok('closing the lab (unmount) cancels the speech', (await speech()).cancels > c3 && (await dbg()).talking === false, await speech());
  if (await ev('!!window.__realGrade')) await ev('Labs.grade = window.__realGrade; true');
  ok('no page errors along the way', errors.length === 0, errors.slice(0, 5));

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
// ⚠ A thrown error must kill Chrome too, or it keeps holding this lab's port.
})().catch(e => { console.error(e); try { if (global.__chrome) global.__chrome.kill(); } catch (_) {} process.exit(1); });
