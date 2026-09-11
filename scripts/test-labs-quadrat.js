'use strict';
// Science Labs › Quadrat Field, driven in a real browser.
//
// Proves the lab end to end: it loads its own three files when opened, lands
// with "What would you like to do?", a guided experiment runs to its end, every
// discovery unlocks by following its own "Show me how", the hazard card and
// every result card fire and explain themselves (with the consequence drawn
// on the canvas first), a tap on the picture chooses a square and ticks a
// plant, all three missions can be finished with three stars, the animation
// loop really runs, Calm Mode applies effects at once, and the bench fits a
// 360px phone with every control at least 44px and no page errors.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-quadrat.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
// ⚠ Port 9407 is this lab's; the other lab builds use 9401-9406 and 9408.
// ⚠ Random throws are seeded through LabQuadrat._test({ seed }), so every run
//   lands the quadrat on the same squares.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9407;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); } };

// ⚠ Every exit - a pass, a fail, a thrown error or Ctrl+C - kills Chrome and
//   removes its profile, so no headless Chrome is left holding this lab's port.
let chrome = null, profile = null, quitting = false;
const quit = code => {
  if (quitting) return;
  quitting = true;
  try { if (chrome) chrome.kill(); } catch (_) {}
  setTimeout(() => { try { if (profile) fs.rmSync(profile, { recursive: true, force: true }); } catch (_) {} process.exit(code); }, 800);
};
process.on('SIGINT', () => quit(130));
process.on('uncaughtException', e => { console.error(e); quit(1); });

(async () => {
  profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-labs-quadrat-'));
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
  const dbg = () => ev('LabQuadrat._debug()');
  const overlay = () => ev(`(() => { const o = document.getElementById('lab-overlay'); if (!o) return null;
    return { cls: o.className, text: o.textContent.replace(/\\s+/g, ' ').slice(0, 3000),
             signs: [...o.querySelectorAll('.lab-sign figcaption')].map(f => f.textContent) }; })()`);
  const closeOv = () => click('#lab-overlay [data-ov-close]');
  const set = (k, v) => clicks(`.lab-body [data-set="${k}"][data-v="${v}"]`);
  const act = a => clicks(`.lab-body [data-act="${a}"]`);
  // A clean bench with no guide and no mission: start a guide, stop it (that resets the bench).
  const freshBench = async () => {
    await ev("document.getElementById('lab-overlay')?.remove(); LabQuadrat.startGuide('first'); true");
    await clicks('[data-act="guide-stop"]');
  };
  // The first square of the plot, as it now is, that satisfies a test on its classification.
  const findSquare = cond => ev(`(() => { const D = LabQuadratData, f = D.makeField(LabQuadrat._debug().events), sp = LabQuadrat._debug().sp;
    const taken = new Set(LabQuadrat._debug().series ? [] : []);
    for (const [x, y] of D.squares()) { const c = D.classify(f, sp, x, y); const lan = D.countQuad(f, 'lantana', x, y, 'all');
      if ((${cond})(c, lan)) return [x, y]; }
    return null; })()`);

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
  await ev("Labs.openLab('quadrat'); true");
  let mounted = false;
  for (let i = 0; i < 60 && !mounted; i++) { await sleep(200); mounted = await ev("typeof window.LabQuadrat !== 'undefined' && !!document.querySelector('#labs-root .lab-quadrat')"); }
  ok('Labs.openLab("quadrat") loads LabQuadrat and renders the field', mounted);
  const labScripts = await ev("[...document.scripts].map(s => s.src).filter(s => /engine\\/labs\\//.test(s)).map(s => s.split('/').pop()).join()");
  ok('it fetched its own data file and bench, after the shell', /lab_core\.js/.test(labScripts) && /lab_quadrat_data\.js,lab_quadrat\.js/.test(labScripts), labScripts);
  await sleep(500);
  ok('its stylesheet is linked and styles the set-up buttons',
     await ev("!!document.querySelector('link[data-lab-css=\"quadrat\"]') && getComputedStyle(document.querySelector('.lab-quadrat-opt')).minHeight === '44px'"));
  let ov = await overlay();
  ok('first visit shows the welcome card with “Show me how”', ov && /Welcome to the Quadrat Field/.test(ov.text) && /Show me how/.test(ov.text), ov);
  await closeOv();
  ok('the welcome is remembered', await ev("Labs.store('quadrat').intro === true"));
  ok('top bar: back, Biology · Grade 9, title, gloves and help',
     await ev("!!document.querySelector('.lab-quadrat .lab-top [data-act=\"hub\"]') && /Biology · Grade 9/.test(document.querySelector('.lab-quadrat .lab-eyebrow').textContent) && /Quadrat Field/.test(document.querySelector('.lab-quadrat h1').textContent) && !!document.querySelector('.lab-top [data-act=\"gloves\"]') && !!document.querySelector('.lab-quadrat [data-act=\"help\"]')"));
  await clicks('.lab-top [data-act="help"]');
  ov = await overlay();
  ok('help gives the estimate formula, and labels the edge rule beyond the NCE syllabus',
     ov && /mean number per quadrat × \(area of the plot ÷ area of one quadrat\)/.test(ov.text) && /beyond the NCE syllabus/.test(ov.text), ov && ov.text.slice(0, 300));
  await closeOv();
  await act('tip');
  ok('💡 gives a fact', /💡/.test(await ev("document.getElementById('lab-coach-text').textContent")));
  await ev('LabQuadrat._test({ instant: true, seed: 7 }); true');

  // ── Landing ─────────────────────────────────────
  console.log('\n-- what to do here');
  ok('the Bench tab opens with “What would you like to do?”, 4 guided experiments and 3 missions',
     await ev("!!document.querySelector('.lab-start') && /What would you like to do/.test(document.querySelector('.lab-start').textContent) && document.querySelectorAll('.lab-start [data-guide]').length === 4 && document.querySelectorAll('.lab-start [data-mission]').length === 3"));
  const nDisc = await ev('LabQuadratData.DISCOVERIES.length');
  ok(`the tabs are Bench, Missions and Discoveries, with a counter out of ${nDisc}`, await ev(`[...document.querySelectorAll('.lab-tabs [data-panel]')].map(b => b.dataset.panel).join() === 'sandbox,missions,found' && /\\/${nDisc}$/.test(document.getElementById('lab-found-n').textContent)`));

  await click('.lab-start [data-guide="first"]');
  const gs = () => ev(`({ box: !document.getElementById('lab-guide').hidden, text: document.getElementById('lab-guide').textContent.replace(/\\s+/g, ' '),
    next: (() => { const e = document.querySelector('.is-next'); return e ? (e.dataset.set ? e.dataset.set + ':' + e.dataset.v : e.dataset.act) : null; })(),
    start: !!document.querySelector('.lab-start') })`);
  let g = await gs();
  ok('Throw your first quadrats: step 1 - gloves on - and that button glows', g.box && /Step 1 of 8/.test(g.text) && /gloves/i.test(g.text) && g.next === 'gloves:on' && !g.start, g);
  await click('[data-guide-do]');
  g = await gs();
  ok('guava is already chosen, so that step is skipped and “Throw at random” glows under the picture',
     g.next === 'throw' && /Step 3 of 8/.test(g.text) && await ev("!!document.querySelector('.lab-tools .is-next')"), g);
  await click('[data-guide-do]');
  let d = await dbg();
  ok('the quadrat lands on a random square and the picture switches to the quadrat', d.q && d.q.how === 'random' && d.view === 'zoom' && d.q.x >= 0 && d.q.x < 20, d.q);
  g = await gs();
  ok('…then “Count (edge rule)” glows', g.next === 'count' && /Step 4 of 8/.test(g.text), g);
  await click('[data-guide-do]');
  d = await dbg();
  const rule0 = d.q.cls.in.length + d.q.cls.edge_in.length;
  ok('the count follows the edge rule (inside + top/left, never bottom/right) and goes in the table',
     d.q.counted && d.q.count === rule0 && d.series.n === 1 && d.series.counts[0] === rule0
     && await ev("document.querySelectorAll('#lab-notebook .lab-table tbody tr').length === 1"), d.q);
  for (let i = 0; i < 3; i++) await click('[data-guide-do]');
  d = await dbg();
  ok('two quadrats, then five more at random: seven in the table, all random', d.series.n === 7 && d.series.hows.every(h => h === 'random'), d.series);
  await click('[data-guide-do]');
  ov = await overlay();
  ok('working out the estimate completes it, with “What you found out”', ov && /Experiment complete/.test(ov.text) && /What you found out/.test(ov.text), ov);
  d = await dbg();
  const expEst = Math.round(d.series.counts.reduce((a, b) => a + b, 0) / 7 * 400);
  ok(`…the estimate is mean × 400 = ${expEst}, and the true population is revealed`, d.series.est === expEst && d.hist[0].trueN === 900, d.hist[0]);
  const nb = await ev("document.getElementById('lab-notebook').textContent.replace(/\\s+/g, ' ')");
  ok('the notebook shows the working: total, mean, estimate, the true number, and a running-estimate graph',
     /Total = \d+ · Mean = \d+ ÷ 7 =/.test(nb) && /Estimate = .* × \(400 m² ÷ 1 m²\) ≈/.test(nb) && /True population/.test(nb) && await ev("!!document.querySelector('#lab-notebook .lab-quadrat-chart polyline')"), nb.slice(0, 400));
  ok('the finished experiment is remembered, and the next one offered', await ev("!!Labs.store('quadrat').guides.first") && /Next: Is the estimate right/.test(ov.text));
  ok('discoveries were collected on the way (first quadrat, how many species, the estimate)', await ev("['first_quadrat','richness','estimate'].every(id => Labs.store('quadrat').disc[id])"));
  const counter = () => ev("({ shown: document.getElementById('lab-found-n').textContent, saved: Object.keys(Labs.store('quadrat').disc).length + '/' + LabQuadratData.DISCOVERIES.length })");
  let cnt = await counter();
  ok('the ✨ counter matches what is saved', cnt.shown === cnt.saved, cnt);
  await closeOv();
  ok('back on the Bench tab, the start panel shows it done', await ev("/✓ done/.test(document.querySelector('.lab-start').textContent)"));

  // ── A tap on the picture ───────────────────────
  console.log('\n-- tapping the picture');
  await freshBench();
  await set('gloves', 'on');
  const tapAt = (x, y) => ev(`(() => { const r = document.getElementById('lab-canvas').getBoundingClientRect();
    document.getElementById('lab-canvas').dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: r.left + ${x}, clientY: r.top + ${y} })); return true; })()`);
  const sq = await findSquare('(c, lan) => lan === 0 && c.in.length >= 2 && c.edge_in.length >= 1 && c.edge_out.length >= 1');
  d = await dbg();
  await tapAt(d.geom.x0 + (sq[0] + 0.5) * d.geom.k, d.geom.y0 + (sq[1] + 0.5) * d.geom.k);
  d = await dbg();
  ok('a tap on the plot chooses that square (marked “chosen”, not random)', d.q && d.q.x === sq[0] && d.q.y === sq[1] && d.q.how === 'chosen' && d.view === 'zoom', { sq, q: d.q });
  const pts = d.zoomPts, want = d.q.cls.in.concat(d.q.cls.edge_in);
  await tapAt(pts[want[0]][0], pts[want[0]][1]);
  ok('a tap on a plant in the quadrat ticks it', (await dbg()).q.marks.includes(want[0]));
  await ev(`[${JSON.stringify(want.slice(1))}][0].forEach(id => LabQuadrat.tapPlant(id)); true`);
  await act('record');
  d = await dbg();
  ok('ticking exactly the plants the edge rule counts, then recording, is accepted', d.q.counted && d.q.count === want.length && /Exactly right/.test(await ev("document.getElementById('lab-coach-text').textContent")), d.q);

  // ── The hazard ─────────────────────────────────
  console.log('\n-- hazard');
  await freshBench();
  const lsq = await findSquare('(c, lan) => lan > 0');
  await ev(`LabQuadrat.set('species', 'lantana'); LabQuadrat.place(${lsq[0]}, ${lsq[1]}); true`);
  await ev('LabQuadrat._test({ instant: false }); true');
  await act('count');
  const mid = { ov: await overlay(), busy: (await dbg()).busy };
  await sleep(1400);
  ov = await overlay();
  ok('bare hands in the lantana: the prick plays on the canvas first, then the card', mid.ov === null && mid.busy === true && ov && /is-hazard/.test(ov.cls), { mid, ov });
  await ev('LabQuadrat._test({ instant: true }); true');
  ok('…a HARMFUL (irritant) hazard card: what happened, why, what to do instead and the exam point',
     ov && ov.signs.includes('Harmful') && /What happened/.test(ov.text) && /Why it’s dangerous/.test(ov.text) && /Do this instead/.test(ov.text) && /On the NCE paper/.test(ov.text) && /gloves/i.test(ov.text) && /poisonous/.test(ov.text), ov);
  await closeOv();
  ok('…and the quadrat was not counted', (await dbg()).q.counted === false);
  await set('gloves', 'on'); await act('count');
  ok('with gloves on, the same quadrat counts', (await dbg()).q.counted === true);
  ok('the hazard is counted in the lab store', await ev("Labs.store('quadrat').hazards.lantana >= 1"));

  // ── Result cards ────────────────────────────────
  console.log('\n-- mistakes that teach');
  const resultCard = async (label, re) => { const o = await overlay(); ok(label, o && /is-result/.test(o.cls) && /What happened/.test(o.text) && /What you should have done/.test(o.text) && re.test(o.text), o); await closeOv(); };
  await freshBench();
  await set('gloves', 'on');
  const eo = await findSquare('(c, lan) => lan === 0 && c.edge_out.length >= 1 && c.in.length >= 1');
  await ev(`LabQuadrat.place(${eo[0]}, ${eo[1]}); true`);
  await ev('LabQuadrat._test({ instant: false }); true');
  await set('count', 'all');
  const midE = { ov: await overlay(), busy: (await dbg()).busy, view: (await dbg()).view };
  await sleep(1300);
  await ev('LabQuadrat._test({ instant: true }); true');
  ok('counting every plant touching the frame: the plants on the bottom/right flash in the quadrat first', midE.ov === null && midE.busy && midE.view === 'zoom', midE);
  await resultCard('…“Plants on the frame: no rule” card - too HIGH, with the rule labelled beyond the syllabus', /too HIGH.*beyond the NCE syllabus/);
  ok('…and that count was not recorded', (await dbg()).q.counted === false);
  const ei = await findSquare('(c, lan) => lan === 0 && c.edge_in.length >= 1 && c.in.length >= 1');
  await ev(`LabQuadrat.place(${ei[0]}, ${ei[1]}); true`);
  await set('count', 'inside');
  await resultCard('counting only the plants wholly inside: the same card - too LOW', /too LOW/);
  await freshBench();
  await set('gloves', 'on');
  for (let i = 0; i < 5; i++) { await act('thick'); await act('count'); }
  d = await dbg();
  ok('five quadrats where the guava is thickest: every one marked “chosen”', d.series.hows.every(h => h === 'thick') && d.series.n === 5, d.series);
  await act('estimate');
  d = await dbg();
  ok('…the estimate is far above the true population, drawn as bars on the plot', d.est && d.est.est > 3 * d.est.trueN && d.view === 'field', d.est);
  await resultCard('…“Biased sampling” card, explaining the thickest patches', /Biased sampling.*thickest/);
  await act('new');
  for (let i = 0; i < 2; i++) { await act('throw'); await act('count'); }
  await act('estimate');
  await resultCard('two random quadrats, then an estimate: “Too few quadrats to trust”, with the spread one quadrat can give', /Too few quadrats.*anywhere from 0 to/);
  const hist = await ev("document.getElementById('lab-notebook').textContent");
  ok('the notebook keeps every estimate next to the true number', /Every estimate/.test(hist));

  // ── What happens to the plot ───────────────────
  console.log('\n-- threats');
  await set('event', 'cyclone');
  d = await dbg();
  ok('a cyclone changes the plot, starts a new survey and moves the year on', d.events.join() === 'cyclone' && d.series.n === 0 && d.series.year === 1 && /Ranger’s full count: guava 900 → \d+/.test(d.log[0]), d.log[0]);
  await act('restore');
  ok('↺ restores the plot to year 0', (await dbg()).events.length === 0 && (await dbg()).series.year === 0);

  // ── Missions ───────────────────────────────────
  console.log('\n-- missions');
  const answerAll = () => ev(`(() => {
    const defs = LabQuadrat._debug().quiz;
    for (let i = 0; i < defs.length; i++) {
      const card = document.querySelector('#lab-overlay .lab-ov-card');
      const q = card.querySelector('.lab-quiz-q').textContent;
      const def = defs.find(x => x.q === q);
      const btn = [...card.querySelectorAll('.lab-quiz-opt')].find(b => b.lastElementChild.textContent === def.a);
      btn.click();
      card.querySelector('[data-next]').click();
    }
    const done = document.querySelector('#lab-overlay .lab-done .lab-stars');
    return done ? done.getAttribute('aria-label') : 'no result card';
  })()`);
  await ev("LabQuadrat.startMission('estimate'); true");
  await set('gloves', 'on');
  await act('auto5'); await act('auto5');
  await act('estimate');
  d = await dbg();
  ok('Estimate the population: ten random quadrats, estimated cleanly', d.mission.success && d.mission.errors === 0 && d.series.n === 10, d.mission);
  await act('quiz');
  d = await dbg();
  ok('…the quiz opens with a calculation built from the pupil’s own counts', d.quiz && d.quiz.length === 6 && new RegExp('Your 10 quadrats held ' + d.series.counts.reduce((a, b) => a + b, 0)).test(d.quiz[0].q) && d.quiz[0].a === String(d.series.est), d.quiz && d.quiz[0]);
  ok('…3 stars when every answer is right and the survey was clean', (await answerAll()) === '3 of 3 stars');
  ok('the stars are saved', await ev("Labs.store('quadrat').missions.estimate.stars === 3"));
  await closeOv();

  await ev("LabQuadrat.startMission('random'); true");
  await set('gloves', 'on');
  for (let i = 0; i < 5; i++) { await act('thick'); await act('count'); }
  await act('estimate');
  ov = await overlay();
  ok('Why random?: the chosen-spot survey shows the biased card', ov && /Biased sampling/.test(ov.text));
  await closeOv();
  await act('new');
  await act('auto5'); await act('auto5');
  await act('estimate');
  d = await dbg();
  ok('…then ten random quadrats: the random estimate is far closer to the truth, and the mission counts no mistake',
     d.mission.success && d.mission.errors === 0 && Math.abs(d.mission.random - 900) < Math.abs(d.mission.biased - 900), d.mission);
  await act('quiz');
  ok('…3 stars', (await answerAll()) === '3 of 3 stars');
  await closeOv();

  await ev("LabQuadrat.startMission('threat'); true");
  await set('gloves', 'on');
  await act('auto5'); await act('estimate');
  await set('event', 'spread');
  await act('auto5'); await act('estimate');
  await set('event', 'weed');
  await act('auto5'); await act('estimate');
  d = await dbg();
  ok('Invasion and recovery: three surveys, in order', d.mission.success && d.mission.stage === 3 && d.mission.errors === 0, d.mission);
  ok('…the mission panel lists all three surveys against the true numbers', /Survey 1: .*Survey 2: .*Survey 3: /.test(await ev("document.getElementById('lab-mission').textContent")));
  await act('quiz');
  ok('…3 stars', (await answerAll()) === '3 of 3 stars');
  await closeOv();

  // ── Motion, calm, phone ────────────────────────
  console.log('\n-- motion, calm, phone');
  await freshBench();
  await set('gloves', 'on');
  await ev('LabQuadrat._test({ instant: false }); true');
  await act('throw');
  await sleep(250);
  d = await dbg();
  ok('with animation on, the throw flies across the plot in real time (the loop is running)', d.busy === true && d.fx >= 1 && d.q === null, d);
  await sleep(900);
  d = await dbg();
  ok('…and lands by itself, switching to the quadrat', d.busy === false && d.q && d.view === 'zoom', d);
  ok('the canvas has drawn the scene', await ev("(() => { const c = document.getElementById('lab-canvas'); const p = c.getContext('2d').getImageData(c.width / 2, c.height / 2, 1, 1).data; return p[3] > 0; })()"));
  await ev("document.documentElement.classList.add('kid-calm'); true");
  await act('count');
  await act('throw');
  d = await dbg();
  ok('in Calm Mode a throw lands at once', d.busy === false && d.q && !d.q.counted && d.series.n === 1, d);
  await set('event', 'drought');
  ok('in Calm Mode a drought applies at once, with no animation', (await dbg()).events.join() === 'drought' && (await dbg()).busy === false);
  await ev("document.documentElement.classList.remove('kid-calm'); LabQuadrat._test({ instant: true }); true");
  const fit = async label => {
    const f = await ev(`(() => { const vw = innerWidth;
      const vis = e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
      const off = [...document.querySelectorAll('#labs-root button, #labs-root canvas')].filter(vis)
        .filter(e => e.getBoundingClientRect().right > vw + 0.5 || e.getBoundingClientRect().left < -0.5)
        .map(e => (e.getAttribute('data-set') || e.getAttribute('data-act') || e.getAttribute('data-panel') || e.tagName) + ' → ' + Math.round(e.getBoundingClientRect().right));
      const small = [...document.querySelectorAll('#labs-root .lab-quadrat button')].filter(vis)
        .filter(e => e.getBoundingClientRect().height < 43.5 || e.getBoundingClientRect().width < 43.5)
        .map(e => (e.getAttribute('data-set') || e.getAttribute('data-act') || e.getAttribute('data-panel') || e.className) + ' ' + Math.round(e.getBoundingClientRect().width) + '×' + Math.round(e.getBoundingClientRect().height));
      return { vw, root: document.getElementById('labs-root').scrollWidth, doc: document.documentElement.scrollWidth, off, small }; })()`);
    ok(label, f.root <= f.vw && f.doc <= f.vw && f.off.length === 0 && f.small.length === 0, f);
  };
  await fit('360px, quadrat view: no control past the screen edge, every control at least 44 × 44px');
  await set('view', 'field');
  await fit('360px, the plot: the same');
  await ev("document.getElementById('lab-overlay')?.remove(); LabQuadrat.startGuide('census'); true");
  await fit('360px, a guide running (yellow box, stop link): the same');
  await clicks('[data-act="guide-stop"]');
  await ev("LabQuadrat.startMission('random'); true");
  await fit('360px, a mission under way: the same');
  await ev("LabQuadrat.act('exit-mission'); true");

  // ── Discoveries ────────────────────────────────
  console.log('\n-- discoveries');
  await click('[data-panel="found"]');
  ok(`the Discoveries tab shows ${nDisc} cards, found and locked`, await ev(`document.querySelectorAll('.lab-found-card').length === ${nDisc} && document.querySelectorAll('.lab-found-card.is-found').length >= 4 && /Clue:/.test(document.querySelector('.lab-found').textContent)`));
  await click('.lab-found-card.is-found[data-disc="estimate"]');
  ov = await overlay();
  ok('a found discovery explains itself: what you saw, the formula with a worked example, why, do it again',
     ov && /What you saw/.test(ov.text) && /The formula/.test(ov.text) && /5 × \(400 ÷ 1\) = 2000/.test(ov.text) && /Why it happens/.test(ov.text) && /Do it again/.test(ov.text), ov);
  await closeOv();
  const lockedId = await ev("(document.querySelector('.lab-found-card:not(.is-found)') || {}).dataset?.disc || null");
  if (lockedId) {
    await click(`.lab-found-card[data-disc="${lockedId}"]`);
    ov = await overlay();
    ok('a locked discovery shows how to find it, with “Show me how”', ov && /How to find it/.test(ov.text) && /Show me how/.test(ov.text), ov);
    await click('#lab-overlay [data-disc-go]');
    ok('…and “Show me how” starts a guide for it', !!(await dbg()).guide);
    await clicks('[data-act="guide-stop"]');
  }
  const discIds = await ev('LabQuadratData.DISCOVERIES.map(d => d.id)');
  const unsolved = [];
  for (const id of discIds) {
    const res = await ev(`(() => {
      const st = Labs.store('quadrat'); delete st.disc['${id}'];
      document.getElementById('lab-overlay')?.remove();
      LabQuadrat.discoveryGuide('${id}');
      for (let k = 0; k < 30 && LabQuadrat._debug().guide; k++) {
        const o = document.querySelector('#lab-overlay.is-hazard, #lab-overlay.is-result');
        if (o) return 'card: ' + o.textContent.replace(/\\s+/g, ' ').slice(0, 90);
        const btn = document.querySelector('#lab-guide [data-guide-do]');
        if (btn) btn.click(); else LabQuadrat._tick(2);
      }
      if (LabQuadrat._debug().guide) return 'guide never finished at step ' + LabQuadrat._debug().guide.step;
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
