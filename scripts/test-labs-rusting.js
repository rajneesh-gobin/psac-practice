'use strict';
// Science Labs › Rusting Lab (PSAC Grade 6), driven in a real browser.
//
// Proves the lab end to end: it loads its own three files when opened, lands
// with "What would you like to do?", the PSAC three-tube guided experiment runs
// to its end with only nail B rusty, every discovery unlocks by following its
// own "Show me how", every hazard and result card fires and explains itself,
// both missions can be finished with three stars, 🔊 read-aloud speaks only
// when tapped and is cancelled on a step change, an overlay and a screen
// change, Calm Mode applies the days at once, and the bench fits a 360px
// phone with 44px tap targets and no page errors.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-rusting.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
// ⚠ Port 9409 is this lab's; the other lab builds use 9401-9408 and 9410+.
// ⚠ Never drive the installed Chrome: it joins the user's live browser.
// ⚠ The Chrome profile goes in LAB_TMP (or the OS temp dir) and is removed on
//   every exit, pass or fail.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9409;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); } };

let chrome = null, profile = null;
const quit = code => {
  try { if (chrome) chrome.kill(); } catch (_) {}
  setTimeout(() => { try { if (profile) fs.rmSync(profile, { recursive: true, force: true }); } catch (_) {} process.exit(code); }, 800);
};
process.on('SIGINT', () => quit(130));

(async () => {
  if (!process.env.CHROME_PATH) { console.log('Set CHROME_PATH to Chrome for Testing (never the installed Chrome).'); process.exit(1); }
  profile = fs.mkdtempSync(path.join(process.env.LAB_TMP || os.tmpdir(), 'psac-labs-rusting-'));
  chrome = spawn(process.env.CHROME_PATH, [
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
  const dbg = () => ev('LabRusting._debug()');
  const overlay = () => ev(`(() => { const o = document.getElementById('lab-overlay'); if (!o) return null;
    return { cls: o.className, text: o.textContent.replace(/\\s+/g, ' ').slice(0, 3000),
             signs: [...o.querySelectorAll('.lab-sign figcaption')].map(f => f.textContent) }; })()`);
  const closeOv = () => click('#lab-overlay [data-ov-close]');
  const set = (k, v) => clicks(`[data-set="${k}"][data-v="${v}"]`);
  const act = a => clicks(`[data-act="${a}"]`);
  const speech = () => ev('({ spoken: window.__tts.spoken.slice(), cancels: window.__tts.cancels })');
  // A clean bench with no guide and no mission: start a guide, stop it (that
  // resets the bench), then pick the bench.
  const freshBench = async (rig = 'tubes') => {
    await ev("document.getElementById('lab-overlay')?.remove(); LabRusting.startGuide('three_tubes'); true");
    await act('guide-stop');
    await set('rig', rig);
  };

  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof showScreen === 'function' && typeof RoleModules !== 'undefined'"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url + ', not the file we navigated to.'); quit(1); return; }
  ok('app loaded', ready === true);
  await sleep(2000);
  // A stand-in for the speech engine: records what is spoken and cancelled.
  await ev(`(() => { const t = { spoken: [], cancels: 0, speaking: false, pending: false,
      speak(u) { this.spoken.push(u.text); }, cancel() { this.cancels++; }, getVoices() { return []; } };
    Object.defineProperty(window, 'speechSynthesis', { value: t, configurable: true, writable: true });
    window.__tts = t; return true; })()`);

  // ── Opening the lab ─────────────────────────────
  console.log('\n-- opening the lab');
  await ev("SELECTED_GRADE = 6; showScreen('labs'); true");
  let hub = false;
  for (let i = 0; i < 40 && !hub; i++) { await sleep(250); hub = await ev("typeof window.Labs !== 'undefined' && !!document.querySelector('#labs-root .lab-hub')"); }
  ok('Grade 6: showScreen("labs") loads the Labs shell', hub);
  await ev("Labs.openLab('rusting'); true");
  let mounted = false;
  for (let i = 0; i < 60 && !mounted; i++) { await sleep(200); mounted = await ev("typeof window.LabRusting !== 'undefined' && !!document.querySelector('#labs-root .lab-rusting')"); }
  ok('Labs.openLab("rusting") loads LabRusting and renders the bench', mounted);
  const labScripts = await ev("[...document.scripts].map(s => s.src).filter(s => /engine\\/labs\\//.test(s)).map(s => s.split('/').pop()).join()");
  ok('it fetched its own data file and bench, after the shell', /lab_core\.js/.test(labScripts) && /lab_rusting_data\.js,lab_rusting\.js/.test(labScripts), labScripts);
  await sleep(500);
  ok('its stylesheet is linked and styles the set-up buttons',
     await ev("!!document.querySelector('link[data-lab-css=\"rusting\"]') && getComputedStyle(document.querySelector('.lab-rusting-opt')).minHeight === '44px'"));
  let ov = await overlay();
  ok('first visit shows the welcome card with “Show me how”', ov && /Welcome to the Rusting Lab/.test(ov.text) && /Show me how/.test(ov.text), ov);
  ok('nothing was read aloud on its own', (await speech()).spoken.length === 0);
  await closeOv();
  ok('the welcome is remembered', await ev("Labs.store('rusting').intro === true"));
  ok('top bar: back, Science · Grade 6, title, adult helper and help',
     await ev("!!document.querySelector('.lab-rusting .lab-top [data-act=\"hub\"]') && /Science · Grade 6/.test(document.querySelector('.lab-rusting .lab-eyebrow').textContent) && /Rusting Lab/.test(document.querySelector('.lab-rusting h1').textContent) && !!document.getElementById('lab-rusting-adult') && !!document.querySelector('.lab-rusting [data-act=\"help\"]')"));
  await act('help');
  ov = await overlay();
  ok('help explains air AND water and the three PSAC tubes', ov && /air AND water/.test(ov.text) && /Diagram 6/.test(ov.text), ov && ov.text.slice(0, 200));
  await closeOv();
  await act('tip');
  ok('💡 gives a fact', /💡/.test(await ev("document.getElementById('lab-coach-text').textContent")));

  // ── Read aloud ─────────────────────────────────
  console.log('\n-- read aloud');
  const coachText = await ev("document.getElementById('lab-coach-text').textContent");
  await act('say-coach');
  let sp = await speech();
  ok('🔊 on the lab assistant speaks its words (without the emoji)', sp.spoken.length === 1 && sp.spoken[0].length > 10 && coachText.includes(sp.spoken[0].slice(0, 12)) && !/💡/.test(sp.spoken[0]), sp);
  const c0 = sp.cancels;
  await act('help');
  ok('opening an overlay cancels the speech', (await speech()).cancels === c0 + 1);
  await closeOv();
  await ev('LabRusting._test({ instant: true }); true');

  // ── Landing ─────────────────────────────────────
  console.log('\n-- what to do here');
  ok('the Bench tab opens with “What would you like to do?”, 4 guided experiments and 2 missions',
     await ev("!!document.querySelector('.lab-start') && /What would you like to do/.test(document.querySelector('.lab-start').textContent) && document.querySelectorAll('.lab-start [data-guide]').length === 4 && document.querySelectorAll('.lab-start [data-mission]').length === 2"));
  ok('the tabs are Bench, Missions and Discoveries, with a counter', await ev("[...document.querySelectorAll('.lab-tabs [data-panel]')].map(b => b.dataset.panel).join() === 'sandbox,missions,found' && /\\/12$/.test(document.getElementById('lab-found-n').textContent)"));

  await click('.lab-start [data-guide="three_tubes"]');
  const gs = () => ev(`({ box: !document.getElementById('lab-guide').hidden, text: document.getElementById('lab-guide').textContent.replace(/\\s+/g, ' '),
    next: (() => { const e = document.querySelector('.is-next'); return e ? (e.dataset.set ? e.dataset.set + ':' + e.dataset.v : e.dataset.act) : null; })(),
    start: !!document.querySelector('.lab-start') })`);
  let g = await gs();
  ok('The three test tubes: already on the rack, so it opens at step 2 - ask an adult - and the adult button glows',
     g.box && /Step 2 of 11/.test(g.text) && /adult/.test(g.text) && g.next === 'adult:on' && !g.start, g);
  await click('[data-guide-do]');
  g = await gs();
  ok('tube A is already chosen, so “boiled water” glows next (step 4)', g.next === 'water:boiled' && /Step 4 of 11/.test(g.text), g);
  await click('[data-guide-do]'); await click('[data-guide-do]');
  g = await gs();
  ok('…then tube B', g.next === 'tube:B' && /Step 6 of 11/.test(g.text), g);
  await click('[data-guide-do]'); await click('[data-guide-do]'); await click('[data-guide-do]');
  g = await gs();
  ok('…then the drying agent for tube C', g.next === 'dryer:on' && /Step 9 of 11/.test(g.text), g);
  await click('[data-act="say-guide"]');
  sp = await speech();
  ok('🔊 in the guide box reads the step', /drying agent/.test(sp.spoken[sp.spoken.length - 1]), sp.spoken.slice(-1));
  const c1 = sp.cancels;
  await click('[data-guide-do]');
  ok('the next step cancels the speech', (await speech()).cancels === c1 + 1, await speech());
  await click('[data-guide-do]');
  g = await gs();
  ok('…the cork, then “Wait 7 days” glows under the picture', g.next === 'week' && /Step 11 of 11/.test(g.text), g);
  await click('[data-guide-do]');
  let d = await dbg();
  ok('after 7 days only nail B rusted: A (boiled + oil) and C (dry air) stay shiny',
     d.tubes.day === 7 && d.tubes.items.A.rust === 0 && d.tubes.items.B.rust === 1 && d.tubes.items.C.rust === 0 && !d.tubes.items.D.on, d.tubes.items);
  ov = await overlay();
  ok('it completes with “What you found out”', ov && /Experiment complete/.test(ov.text) && /What you found out/.test(ov.text) && /needs both air and water/.test(ov.text), ov);
  ok('the finished experiment is remembered, and the next one offered', await ev("!!Labs.store('rusting').guides.three_tubes") && /Next: Salt water and rust/.test(ov.text));
  ok('discoveries were collected on the way', await ev("['needs_both','no_air','dry_air','first_rust'].every(id => Labs.store('rusting').disc[id])"));
  const counter = () => ev("({ shown: document.getElementById('lab-found-n').textContent, saved: Object.keys(Labs.store('rusting').disc).length + '/' + LabRustingData.DISCOVERIES.length })");
  let cnt = await counter();
  ok('the ✨ counter matches what is saved', cnt.shown === cnt.saved, cnt);
  const nb = await ev("document.getElementById('lab-notebook').textContent.replace(/\\s+/g, ' ')");
  ok('the notebook has a table: tube, water?, air?, what the nail looked like after 7 days',
     /What I saw after 7 days/.test(nb) && /Water\?/.test(nb) && /Air\?/.test(nb) && /Covered in rust/.test(nb) && /No rust/.test(nb), nb.slice(0, 300));
  await closeOv();
  ok('back on the Bench tab, the start panel shows it done', await ev("/✓ done/.test(document.querySelector('.lab-start').textContent)"));

  // ── Hazards ─────────────────────────────────────
  console.log('\n-- hazards');
  await freshBench();
  await ev('LabRusting._test({ instant: false }); true');
  await set('water', 'boiled');
  const mid = { ov: await overlay(), busy: (await dbg()).busy };
  await sleep(1500);
  ov = await overlay();
  ok('boiled water with no adult: steam on the canvas first, then the card', mid.ov === null && mid.busy === true && ov && /is-hazard/.test(ov.cls), { mid, ov });
  ok('…a HOT hazard card: what happened, why, ask an adult, and the PSAC point',
     ov && ov.signs.includes('Hot surface') && /What happened/.test(ov.text) && /Why it’s dangerous/.test(ov.text) && /Ask an adult/.test(ov.text) && /In the PSAC exam/.test(ov.text) && !/NCE/.test(ov.text), ov);
  await closeOv();
  await ev('LabRusting._test({ instant: true }); true');
  ok('…and tube A was not filled', (await dbg()).tubes.items.A.water === 'none');
  await clicks('[data-set="tube"][data-v="B"]', '[data-set="water"][data-v="tap"]', '[data-act="week"]');
  await ev("document.getElementById('lab-overlay')?.remove(); true");
  await act('hand');
  ov = await overlay();
  ok('picking up the rusty nail by hand: SHARP hazard - tell an adult, wash the cut', ov && /is-hazard/.test(ov.cls) && ov.signs.includes('Sharp - can cut') && /tell an adult/i.test(ov.text) && /Wash the cut/.test(ov.text), ov);
  await closeOv();
  ok('the hazards are counted in the lab store', await ev("Labs.store('rusting').hazards.kettle >= 1 && Labs.store('rusting').hazards.sharp >= 1"));
  await act('tweezers');
  ok('the tweezers are the safe way: rust flakes off', await ev("!!Labs.store('rusting').disc.flaky"));

  // ── Result cards ────────────────────────────────
  console.log('\n-- mistakes that teach');
  const resultCard = async (label, re) => { const o = await overlay(); ok(label, o && /is-result/.test(o.cls) && /What happened/.test(o.text) && /What you should have done/.test(o.text) && re.test(o.text), o); await closeOv(); };
  await freshBench();
  await clicks('[data-set="tube"][data-v="B"]', '[data-set="water"][data-v="tap"]', '[data-act="hour"]');
  ok('looking after one hour: every nail still shiny', (await dbg()).tubes.items.B.rust < 0.05);
  await resultCard('…“Too soon to tell!” card: rusting takes days', /Too soon to tell[\s\S]*Wait a few days/);
  await freshBench();
  await clicks('[data-set="water"][data-v="tap"]', '[data-set="oil"][data-v="on"]', '[data-act="week"]');
  ok('oil on unboiled water: nail A rusts a little', (await dbg()).tubes.items.A.rust > 0.05);
  await resultCard('…“The water still had air in it” card', /not boiled/);
  await freshBench();
  await clicks('[data-set="adult"][data-v="on"]', '[data-set="water"][data-v="boiled"]', '[data-act="week"]');
  await resultCard('boiled water with no oil: “You forgot the oil layer” card', /oil/);
  await freshBench();
  await clicks('[data-set="tube"][data-v="C"]', '[data-set="cork"][data-v="on"]', '[data-act="week"]');
  await resultCard('a cork but no drying agent: “The air was not dry” card', /no drying agent/);
  await freshBench('coats');
  await clicks('[data-set="jar"][data-v="2"]', '[data-set="coat"][data-v="paint"]', '[data-set="jwater"][data-v="salt"]', '[data-act="wait"]');
  await resultCard('painted nail in salt water, bare nail in tap water: “two things changed” card', /Two things were different/);
  await act('reset');
  ok('Start again empties the jars and goes back to day 0', (await dbg()).coats.day === 0 && (await dbg()).coats.items['2'].coat === 'none');

  // ── Missions ───────────────────────────────────
  console.log('\n-- missions');
  const answerAll = id => ev(`(() => {
    const qs = LabRustingData.MISSIONS.find(m => m.id === '${id}').quiz;
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
  await ev("LabRusting.startMission('needs'); true");
  await clicks('[data-set="adult"][data-v="on"]', '[data-set="water"][data-v="boiled"]', '[data-set="oil"][data-v="on"]',
    '[data-set="tube"][data-v="B"]', '[data-set="water"][data-v="tap"]', '[data-set="tube"][data-v="C"]', '[data-set="dryer"][data-v="on"]', '[data-set="cork"][data-v="on"]');
  await act('wait'); await act('wait');
  ok('What does iron need?: not done at day 2', (await dbg()).mission.success === false);
  await act('wait');
  d = await dbg();
  ok('…done at day 3, with no mistakes', d.mission.success && d.mission.errors === 0, d.mission);
  await act('quiz');
  ok('…the quiz ends with 3 stars', (await answerAll('needs')) === '3 of 3 stars');
  ok('the stars are saved', await ev("Labs.store('rusting').missions.needs.stars === 3"));
  await closeOv();

  await ev("LabRusting.startMission('stop'); true");
  for (const [j, c] of [['2', 'paint'], ['3', 'grease'], ['4', 'plastic'], ['5', 'zinc']]) await clicks(`[data-set="jar"][data-v="${j}"]`, `[data-set="coat"][data-v="${c}"]`);
  await act('week');
  d = await dbg();
  ok('Stop the rust!: only the bare nail in jar 1 rusted', d.mission.success && d.coats.items['1'].rust === 1 && ['2', '3', '4', '5'].every(j => d.coats.items[j].rust === 0), d.coats.items);
  await act('quiz');
  ok('…3 stars', (await answerAll('stop')) === '3 of 3 stars');
  await closeOv();

  // ── Motion, calm, phone ────────────────────────
  console.log('\n-- motion, calm, phone');
  await freshBench();
  await clicks('[data-set="tube"][data-v="B"]', '[data-set="water"][data-v="tap"]');
  await ev('LabRusting._test({ instant: false }); true');
  await act('wait');
  await sleep(300);
  d = await dbg();
  const chips = await ev("document.getElementById('lab-rusting-chips').textContent");
  ok('with animation on, a day passes as a time-lapse (the loop is running)', d.busy === true && d.tubes.shown > 0 && d.tubes.shown < 1 && /Time passing/.test(chips), { shown: d.tubes.shown, chips });
  await ev('LabRusting._tick(1); true');
  d = await dbg();
  ok('…and ends on day 1 with rust on nail B', d.busy === false && d.tubes.shown === 1 && d.tubes.items.B.rust > 0.05, d.tubes);
  ok('the canvas has drawn the rack', await ev("(() => { const c = document.getElementById('lab-canvas'); const p = c.getContext('2d').getImageData(c.width / 2, c.height / 2, 1, 1).data; return p[3] > 0; })()"));
  await ev("document.documentElement.classList.add('kid-calm'); true");
  await act('wait');
  d = await dbg();
  ok('in Calm Mode a day passes at once, with no animation', d.tubes.day === 2 && d.tubes.shown === 2 && d.busy === false, d.tubes);
  await ev("document.documentElement.classList.remove('kid-calm'); LabRusting._test({ instant: true }); true");
  const fit = async label => {
    const f = await ev(`(() => { const vw = innerWidth;
      const off = [...document.querySelectorAll('#labs-root button, #labs-root canvas')]
        .filter(e => e.getBoundingClientRect().width > 0 && e.getBoundingClientRect().right > vw + 0.5)
        .map(e => (e.getAttribute('data-set') || e.getAttribute('data-act') || e.getAttribute('data-panel') || e.tagName) + ' → ' + Math.round(e.getBoundingClientRect().right));
      const small = [...document.querySelectorAll('#labs-root .lab-rusting-opt, #labs-root .lab-tool, #labs-root .lab-rusting-rigs button, #labs-root .lab-rusting-say, #labs-root .lab-coach-tip, #labs-root .lab-goggles, #labs-root .lab-tabs button, #labs-root .lab-icon-btn, #labs-root .lab-btn')]
        .filter(e => e.getBoundingClientRect().width > 0 && (e.getBoundingClientRect().height < 43.5 || e.getBoundingClientRect().width < 43.5))
        .map(e => (e.getAttribute('data-set') || e.getAttribute('data-act') || e.className) + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height));
      return { vw, root: document.getElementById('labs-root').scrollWidth, off, small }; })()`);
    ok(label, f.root <= f.vw && f.off.length === 0 && f.small.length === 0, f);
  };
  await ev("LabRusting.startGuide('three_tubes'); true");
  await fit('360px, tubes, a guide running: no control past the screen edge, every tap target at least 44px');
  await act('guide-stop');
  await fit('360px, tubes, the start panel: the same');
  await set('rig', 'coats');
  await fit('360px, the five jars: the same');

  // ── Discoveries ────────────────────────────────
  console.log('\n-- discoveries');
  await click('[data-panel="found"]');
  ok('the Discoveries tab shows 12 cards, found and locked', await ev("document.querySelectorAll('.lab-found-card').length === 12 && document.querySelectorAll('.lab-found-card.is-found').length >= 5 && /Clue:/.test(document.querySelector('.lab-found').textContent)"));
  await click('.lab-found-card.is-found[data-disc="needs_both"]');
  ov = await overlay();
  ok('a found discovery explains itself: what you saw, why, the PSAC point, do it again',
     ov && /What you saw/.test(ov.text) && /Why it happens/.test(ov.text) && /PSAC 2024 Q4/.test(ov.text) && /Do it again/.test(ov.text), ov);
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
  const discIds = await ev('LabRustingData.DISCOVERIES.map(d => d.id)');
  const unsolved = [];
  for (const id of discIds) {
    const res = await ev(`(() => {
      const st = Labs.store('rusting'); delete st.disc['${id}'];
      document.getElementById('lab-overlay')?.remove();
      LabRusting.discoveryGuide('${id}');
      for (let k = 0; k < 30 && LabRusting._debug().guide; k++) {
        const o = document.querySelector('#lab-overlay.is-hazard, #lab-overlay.is-result');
        if (o) return 'card: ' + o.textContent.replace(/\\s+/g, ' ').slice(0, 90);
        const btn = document.querySelector('#lab-guide [data-guide-do]');
        if (btn) btn.click(); else LabRusting._tick(3);
      }
      if (LabRusting._debug().guide) return 'guide never finished at step ' + LabRusting._debug().guide.step;
      document.getElementById('lab-overlay')?.remove();
      return !!st.disc['${id}'];
    })()`);
    if (res !== true) unsolved.push(id + ' → ' + res);
  }
  ok(`all ${discIds.length} discoveries unlock by following their own “Show me how”`, unsolved.length === 0, unsolved);
  cnt = await counter();
  ok('…and the counter says so', cnt.shown === cnt.saved && cnt.shown === `${discIds.length}/${discIds.length}`, cnt);

  // ── Leaving ────────────────────────────────────
  console.log('\n-- leaving');
  const before = await ev('({ looping: LabRusting._debug().looping, screen: S.currentScreen })');
  await act('say-coach');
  const c2 = (await speech()).cancels;
  // ⚠ showScreen('student-home') can bounce with no child signed in, and then
  //   the lab never leaves the screen. Go somewhere that certainly hides it,
  //   and check that it did before judging the speech.
  ok('…the lab knows it is speaking', (await dbg()).talking === true);
  await ev("showScreen('landing'); true");
  await sleep(400);
  // ⚠ showScreen() runs the app's own _ttsStop(), which cancels too - so the
  //   count rises by 2, not 1 (measured). Only the LAB clears its own
  //   `talking` flag, so that is the proof the lab stopped its speech itself.
  const left = await ev("({ hidden: document.getElementById('screen-labs').classList.contains('hidden'), screen: S.currentScreen, talking: LabRusting._debug().talking, looping: LabRusting._debug().looping })");
  ok('leaving the Labs screen cancels the speech (and stops the loop)', left.hidden && !left.talking && !left.looping && (await speech()).cancels > c2, { before, left, speech: await speech() });
  await ev("showScreen('labs'); true");
  await sleep(300);
  await ev("Labs.openLab('rusting'); true");
  await sleep(300);
  await act('say-coach');
  const c3 = (await speech()).cancels;
  ok('…speaking again after coming back (the loop restarted too)', await ev('LabRusting._debug().talking && LabRusting._debug().looping'));
  await ev('Labs.backToHub(); true');
  ok('unmounting the lab cancels the speech', (await speech()).cancels > c3 && (await dbg()).talking === false, await speech());
  ok('progress lives in the lab store (DB.labs.rusting when there is a child)', await ev("!!Labs.store('rusting').missions.needs && (typeof DB === 'undefined' || !DB || !DB.labs || !!DB.labs.rusting)"));
  ok('no page errors along the way', errors.length === 0, errors.slice(0, 5));

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); quit(1); });
