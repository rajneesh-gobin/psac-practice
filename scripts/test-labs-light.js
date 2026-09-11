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
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-light.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
// ⚠ Debugging port 9401 - the other lab builds use 9402-9404.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9401;
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
  await ev('LabLight._test({ instant: true }); true');

  // ── Start panel and a guided experiment ─────────
  console.log('\n-- what to do here');
  ok('the Bench tab opens with “What would you like to do?”, 3 guided experiments and 2 missions',
     await ev("/What would you like to do/.test(document.querySelector('.lab-start').textContent) && document.querySelectorAll('.lab-start [data-guide]').length === 3 && document.querySelectorAll('.lab-start [data-mission]').length === 2"));
  const guideState = () => ev(`(() => { const g = document.getElementById('lab-guide'), n = document.querySelector('.is-next');
    return { box: !g.hidden, text: g.textContent.replace(/\\s+/g, ' '),
             next: n ? (n.id || n.getAttribute('data-act') || n.getAttribute('data-ref') || (n.getAttribute('data-rot') ? n.getAttribute('data-rot') + n.getAttribute('data-d') : null) || n.getAttribute('data-id')) : null,
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
  ok('the Discoveries tab lists found cards and clues', await ev("document.querySelectorAll('.lab-found-card').length === LabLightData.DISCOVERIES.length && document.querySelectorAll('.lab-found-card.is-found').length >= 8"));
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

  const discIds = await ev('LabLightData.DISCOVERIES.map(d => d.id)');
  const unsolved = [];
  for (const id of discIds) {
    const res = await ev(`(() => {
      const st = Labs.store('light'); delete st.disc['${id}'];
      document.getElementById('lab-overlay')?.remove();
      LabLight.discoveryGuide('${id}');
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
  ok(`all ${discIds.length} discoveries unlock by following their own “Show me how”`, unsolved.length === 0, unsolved);
  const cnt = await ev("({ shown: document.getElementById('lab-found-n').textContent, saved: Object.keys(Labs.store('light').disc).length + '/' + LabLightData.DISCOVERIES.length })");
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
  ok('with animation on, the ray grows out of the box (the loop is running)', grow0 === 0 && grow1 === 1, { grow0, grow1 });
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

  await ev("showScreen('student-home'); true");
  ok('no page errors along the way', errors.length === 0, errors.slice(0, 5));

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
