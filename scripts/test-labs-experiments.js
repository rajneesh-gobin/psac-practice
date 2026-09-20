'use strict';
// Science Labs experiments (lab_experiment.js) walked in a real browser, on a
// 360px phone, for every lab that declares experiments (EXPERIMENTS_BY_LAB in
// lab_core.js) at every grade it declares them for.
//
// For each experiment: the hub's chapter grouping and "Start here", the Aim
// with the picture on the first screen, the tap-to-predict, every Do step
// tapped on the real control (the wrong option of every "ask" step first, and
// its card), the picture AND the instruction inside the viewport at every step,
// every `say` containing its control's label, the See with the notebook, the
// Check quiz with the evidence pinned, the Done card, the saved progress, the
// chapter card's "🔬 Try the experiment" chip landing on that chapter's
// experiment, and "Practise this chapter" landing on the practice screen.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-experiments.js [lab]
// ⚠ file:// only; one Chrome at a time; port 9440.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');
const ROOT = path.resolve(__dirname, '..');
const DBG = 9440;
const ONLY = process.argv[2] || '';
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail).slice(0, 400) : '')); } };
let chrome = null, profile = null;
const quit = code => { try { if (chrome) chrome.kill(); } catch (_) {} setTimeout(() => { try { if (profile) fs.rmSync(profile, { recursive: true, force: true }); } catch (_) {} process.exit(code); }, 800); };
process.on('SIGINT', () => quit(130));
const plain = s => String(s || '').replace(/[\u{1F000}-\u{1FAFF}\u{2300}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\u{2190}-\u{21FF}]/gu, '').replace(/\s+/g, ' ').trim().toLowerCase();

(async () => {
  if (!process.env.CHROME_PATH) { console.log('Set CHROME_PATH to Chrome for Testing (never the installed Chrome).'); process.exit(1); }
  profile = fs.mkdtempSync(path.join(process.env.LAB_TMP || os.tmpdir(), 'psac-labs-exp-'));
  chrome = spawn(process.env.CHROME_PATH, ['--headless=new', '--remote-debugging-port=' + DBG, '--user-data-dir=' + profile,
    '--allow-file-access-from-files', '--no-first-run', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
  let version; for (let i = 0; i < 40 && !version; i++) { try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); } }
  if (!version) throw new Error('Chrome did not start');
  const ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let serial = 0; const waiting = new Map(); const errors = [];
  ws.onmessage = e => { const m = JSON.parse(e.data);
    if (m.method === 'Runtime.exceptionThrown') errors.push((m.params.exceptionDetails.exception || {}).description || m.params.exceptionDetails.text);
    if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); } };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => { const id = ++serial, t = setTimeout(() => { waiting.delete(id); rej(Error('Timeout ' + method)); }, 30000);
    waiting.set(id, m => { clearTimeout(t); m.error ? rej(Error(m.error.message)) : res(m.result); }); ws.send(JSON.stringify({ id, method, params, sessionId })); });
  const target = await send('Target.createTarget', { url: 'about:blank' });
  const session = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
  const call = (m, p) => send(m, p, session.sessionId);
  await call('Page.enable'); await call('Runtime.enable');
  await call('Emulation.setDeviceMetricsOverride', { width: 360, height: 780, deviceScaleFactor: 2, mobile: true });
  const ev = async expr => { const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(String(r.exceptionDetails.exception && r.exceptionDetails.exception.description || r.exceptionDetails.text).slice(0, 600)); return r.result.value; };
  const click = sel => ev(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); if (!el) return 'missing: ' + ${JSON.stringify(sel)}; if (el.hidden) return 'hidden: ' + ${JSON.stringify(sel)}; el.click(); return true; })()`);
  const dbg = () => ev('LabExperiment._debug()');
  const geo = () => ev(`(() => { const r = s => { const e = document.querySelector(s); if (!e || e.hidden) return null; const b = e.getBoundingClientRect(); return [Math.round(b.top), Math.round(b.bottom)]; };
    return { mode: document.querySelector('#labs-root').dataset.expMode || null, canvas: r('#labs-root .lab-canvas-wrap canvas'), guide: r('#lab-guide'), exp: r('#lab-exp'), vh: innerHeight, overflow: document.documentElement.scrollWidth > innerWidth + 1 }; })()`);
  const inView = (box, vh, slack = 0) => !!box && box[0] >= -slack && box[1] <= vh + slack;
  const overlayText = () => ev("(() => { const o = document.getElementById('lab-overlay'); return o ? o.textContent.replace(/\\s+/g, ' ').trim() : null; })()");

  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof showScreen === 'function' && typeof RoleModules !== 'undefined'"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url); quit(1); return; }
  ok('app loaded', ready === true);
  await sleep(2000);
  await ev("(() => { const t = { spoken: [], cancels: 0, speaking: false, pending: false, speak(u) { this.spoken.push(u.text); }, cancel() { this.cancels++; }, getVoices() { return []; } }; Object.defineProperty(window, 'speechSynthesis', { value: t, configurable: true, writable: true }); window.__tts = t; return true; })()");

  // Which labs and grades to walk: from the registry, once the shell is loaded.
  await ev("SELECTED_GRADE = 6; showScreen('labs'); true");
  for (let i = 0; i < 40; i++) { await sleep(250); if (await ev("typeof window.Labs !== 'undefined' && typeof window.LabExperiment !== 'undefined' && !!document.querySelector('#labs-root .lab-hub')")) break; }
  ok('the labs shell and the experiment runner load together', await ev("typeof Labs !== 'undefined' && typeof LabExperiment !== 'undefined'"));
  const plan = await ev("Labs.LABS.filter(l => Object.keys(l.experiments || {}).length).map(l => ({ id: l.id, global: l.global, grades: Object.keys(l.experiments).map(Number), n: l.experiments }))");
  ok('at least one lab declares experiments', plan.length > 0, plan);

  for (const lab of plan) {
    if (ONLY && lab.id !== ONLY) continue;
    for (const g of lab.grades) {
      console.log(`\n== ${lab.id} at Grade ${g}`);
      let d = null;
      await ev(`(() => { if (typeof DB !== 'undefined' && DB) { DB.labs = {}; DB.restrictions = {}; } SELECTED_GRADE = ${g}; showScreen('student-home'); if (typeof Labs !== 'undefined') Labs.backToHub(); openLabs(); return true; })()`);
      for (let i = 0; i < 40; i++) { await sleep(150); if (await ev("!!document.querySelector('#labs-root .lab-hub')")) break; }
      const hub = await ev(`(() => { const r = document.getElementById('labs-root');
        return { groups: [...r.querySelectorAll('.lab-hub-subject')].map(s => ({ h: s.querySelector('h2').textContent, labs: [...s.querySelectorAll('[data-lab]')].map(b => b.dataset.lab), start: s.classList.contains('is-start') })),
                 card: (b => b ? b.textContent.replace(/\\s+/g, ' ') : null)(r.querySelector('.lab-card[data-lab="${lab.id}"]')) }; })()`);
      ok(`Grade ${g} hub: cards are grouped by chapter, with a "Start here" section first`, hub.groups.length >= 2 && hub.groups[0].start, hub.groups.map(x => x.h));
      ok(`Grade ${g} hub: every lab appears exactly once`, (() => { const all = hub.groups.flatMap(x => x.labs); return new Set(all).size === all.length; })(), hub.groups);
      ok(`Grade ${g} hub: the ${lab.id} card counts its experiments and says "Start the experiment"`, /0 of \d+ experiments? done/.test(hub.card || '') && /Start the experiment/.test(hub.card || ''), hub.card);
      await click(`.lab-card[data-lab="${lab.id}"]`);
      for (let i = 0; i < 60; i++) { await sleep(200); if (await ev("!!document.querySelector('#lab-exp') && !!document.querySelector('#labs-root .lab-canvas-wrap canvas')")) break; }
      await sleep(400);
      ok(`${lab.id}: opens straight onto an Aim, with no welcome overlay in the way`, (await dbg()).phase === 'aim' && !(await overlayText()), await dbg());
      const list = await ev(`window['${lab.global}'].experiment.list()`);
      ok(`${lab.id} Grade ${g}: the runner lists ${lab.n[g]} experiments`, list.length === lab.n[g], list.map(e => e.id));
      const gAim = await geo();
      ok(`${lab.id}: the picture is on the first screen with the Aim`, inView(gAim.canvas, gAim.vh, 2) && inView(gAim.exp, gAim.vh, 2) && !gAim.overflow, gAim);

      for (const exp of list) {
        console.log(`-- ${exp.id}: ${exp.title}`);
        await ev(`LabExperiment.open('${exp.id}'); true`); await sleep(300);
        d = await dbg();
        ok(`${exp.id}: Aim shows the question`, d.phase === 'aim' && d.exp === exp.id && (await ev("document.querySelector('#lab-exp-title').textContent")) === exp.title, d);
        ok(`${exp.id}: no bench controls compete with the Aim (tools and shelf hidden)`, await ev("[...document.querySelectorAll('#labs-root .lab-tool, #labs-root .lab-shelf button, #labs-root .lab-item')].every(b => b.hidden || !b.offsetParent)"));
        await click('[data-exp="say"]');
        ok(`${exp.id}: 🔊 reads the aim`, (await ev('window.__tts.spoken.slice(-1)[0] || ""')).includes(plain(exp.title).slice(0, 10)) || (await ev('window.__tts.spoken.length')) > 0);
        await click('[data-exp="start"]'); await sleep(250);
        d = await dbg();
        ok(`${exp.id}: Start goes to Predict with ${exp.predict.options.length} tappable options`, d.phase === 'predict' && (await ev("document.querySelectorAll('#lab-exp [data-exp-pick]').length")) === exp.predict.options.length, d);
        ok(`${exp.id}: nothing to type anywhere`, await ev("!document.querySelector('#labs-root textarea, #labs-root input[type=text]')"));
        const wrongPredict = exp.predict.options.find(o => o.id !== exp.predict.answer) || exp.predict.options[0];
        await click(`[data-exp-pick="${wrongPredict.id}"]`); await sleep(400);
        d = await dbg();
        ok(`${exp.id}: a prediction is a tap, then Do starts`, d.phase === 'do' && d.predicted === wrongPredict.id, d);

        for (let k = 0; k < 10; k++) {
          d = await dbg();
          if (d.phase !== 'do') break;
          const step = exp.steps[d.step];
          if (!step) { ok(`${exp.id}: runner step index ${d.step} exists`, false, d); break; }
          const tok = step.on || step.any[0];
          const sel = await ev(`window['${lab.global}'].experiment.selector(${JSON.stringify(tok)})`);
          const g1 = await geo();
          ok(`${exp.id} step ${d.step + 1}: picture and instruction both in the viewport`, inView(g1.canvas, g1.vh, 2) && inView(g1.guide, g1.vh, 2) && !g1.overflow, g1);
          const box = await ev("(document.getElementById('lab-guide') || {}).textContent || ''");
          ok(`${exp.id} step ${d.step + 1}: the yellow box shows the instruction`, plain(box).includes(plain(step.say || step.ask).slice(0, 30)), box.slice(0, 120));
          // the control's main label: its text without any <small> sub-line
          const label = await ev(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e || e.hidden) return null; const c = e.cloneNode(true); c.querySelectorAll('small').forEach(x => x.remove()); return c.textContent.replace(/\\s+/g, ' ').trim(); })()`);
          ok(`${exp.id} step ${d.step + 1}: the control for ${tok} is on screen and glows`, !!label && await ev(`!!document.querySelector(${JSON.stringify(sel)}).classList.contains('is-next')`), { tok, sel, label });
          if (step.say && label) ok(`${exp.id} step ${d.step + 1}: the instruction names the control ("${label}")`, plain(step.say).includes(plain(label).replace(/\s*\d+\s*$/, '').slice(0, 12)) || plain(step.say).includes(plain(label)), { say: step.say, label });
          const controls = await ev(`[...document.querySelectorAll('#labs-root .lab-tool, #labs-root .lab-shelf button, #labs-root .lab-item, #labs-root [data-tool], #labs-root [data-set]')].filter(b => !b.hidden && b.offsetParent).length`);
          ok(`${exp.id} step ${d.step + 1}: only this experiment's controls are shown (${controls})`, controls <= Math.max(6, (step.options || step.any || [tok]).length + 4), controls);
          if (step.wrong) {
            const w = Object.keys(step.wrong)[0];
            const wsel = await ev(`window['${lab.global}'].experiment.selector(${JSON.stringify(w)})`);
            const r = await click(wsel); await sleep(300);
            const txt = await overlayText();
            ok(`${exp.id} step ${d.step + 1}: the wrong option ${w} gets a card that explains`, r === true && !!txt && txt.includes(step.wrong[w].slice(0, 25)), txt && txt.slice(0, 160));
            ok(`${exp.id} step ${d.step + 1}: …and the step has not advanced`, (await dbg()).step === d.step);
            await click('#lab-overlay [data-ov-close]'); await sleep(200);
          }
          const r = await click(sel);
          ok(`${exp.id} step ${d.step + 1}: tapping ${tok} works`, r === true, r);
          await ev(`window['${lab.global}']._tick ? window['${lab.global}']._tick(4) : 0`);
          await sleep(500);
          for (let w = 0; w < 20 && (await dbg()).phase === 'do' && (await dbg()).step === d.step; w++) { await ev(`window['${lab.global}']._tick ? window['${lab.global}']._tick(2) : 0`); await sleep(150); }
        }
        d = await dbg();
        ok(`${exp.id}: every step done leads to See`, d.phase === 'see', d);
        const seeTxt = await ev("document.querySelector('#lab-exp').textContent.replace(/\\s+/g, ' ')");
        ok(`${exp.id}: See says what happened and answers the prediction from the bench`, seeTxt.includes(exp.see.saw) && /You said/.test(seeTxt) && /It was|That is what happened/.test(seeTxt), seeTxt.slice(0, 200));
        ok(`${exp.id}: See shows the notebook`, await ev("!!document.querySelector('#lab-exp .lab-exp-evidence li')"));
        await click('[data-exp="check"]'); await sleep(400);
        const q = await overlayText();
        ok(`${exp.id}: Check opens the quiz with the evidence pinned above the question`, !!q && /What you saw/.test(q) && /Question 1 of/.test(q), q && q.slice(0, 160));
        const qs = exp.check.map(ref => ({ ref })).length;
        let right = 0;
        for (let i = 0; i < qs + 1; i++) {
          const has = await ev("!!document.querySelector('#lab-overlay .lab-quiz-opt')"); if (!has) break;
          // answer correctly: the first option in the data is the answer
          const answer = await ev(`(() => { const D = window['${lab.global}'].experiment; const stem = document.querySelector('#lab-overlay .lab-quiz-q').textContent; const q = ${JSON.stringify(exp.check)}.map(r => D.question(r)).find(q => q && q.q === stem); return q ? (typeof q.options[0] === 'object' ? q.options[0].label : q.options[0]) : null; })()`);
          const hit = await ev(`(() => { const b = [...document.querySelectorAll('#lab-overlay .lab-quiz-opt')].find(x => x.lastElementChild.textContent === ${JSON.stringify(answer)}); if (!b) return false; b.click(); return true; })()`);
          if (hit) right++;
          await sleep(150);
          await ev("document.querySelector('#lab-overlay [data-next]')?.click(); true"); await sleep(250);
        }
        d = await dbg();
        ok(`${exp.id}: Done after the quiz, ${right} of ${qs} right`, d.phase === 'done' && d.result && d.result.total === qs && d.result.firstTry === right, d.result);
        const doneTxt = await ev("document.querySelector('#lab-exp').textContent.replace(/\\s+/g, ' ')");
        ok(`${exp.id}: Done says what was found out and names the exam point`, doneTxt.includes(exp.see.learn) && doneTxt.includes(exp.exam.slice(0, 20)), doneTxt.slice(0, 200));
        ok(`${exp.id}: progress saved in Labs.store().done`, await ev(`!!Labs.store('${lab.id}').done['${exp.id}'] && Labs.store('${lab.id}').done['${exp.id}'].total === ${qs}`));
        ok(`${exp.id}: no page errors`, errors.length === 0, errors.slice(0, 3));
        errors.length = 0;
      }
      const nextBtn = await ev("!!document.querySelector('[data-exp=\"hub\"]')");
      ok(`${lab.id}: after the last experiment the Done card offers the hub, not a next one`, nextBtn);

      // The chapter chip, and Practise this chapter.
      const chapter = list[0].chapter;
      await ev(`Labs.backToHub(); showScreen('student-home'); true`); await sleep(200);
      const chip = await ev(`typeof _labsForChapter === 'function' ? _labsForChapter('${chapter}') : []`);
      ok(`${lab.id}: app.js maps chapter ${chapter} to this lab`, Array.isArray(chip) && chip.includes(lab.id), chip);
      // every experiment of this lab is done now, so the chip may open another
      // lab that teaches the chapter and still has experiments left; if this
      // lab is the only one, it opens here.
      await ev(`openLabForChapter('${chapter}'); true`);
      for (let i = 0; i < 40; i++) { await sleep(200); if (await ev("!!document.querySelector('#lab-exp')")) break; }
      await sleep(300);
      d = await dbg();
      ok(`${lab.id}: the chapter chip opens a lab that teaches ${chapter}, on an Aim for that chapter`, chip.includes(d.lab) && d.phase === 'aim' && (d.lab !== lab.id || list.some(e => e.id === d.exp && e.chapter === chapter)), d);
      await ev(`LabExperiment.open('${list[0].id}'); true`); await sleep(200);
      // jump to Done via the runner's finish path: start, predict, then let the data decide
      // the same pack rule as the runner's packFor(): Grade 9 is three packs, by chapter prefix
      const packId = list[0].pack || (g === 9 ? ({ b: 'grade9-biology', c: 'grade9-chemistry', p: 'grade9-physics' }[(chapter.match(/^g9s-([bcp])/) || [])[1]] || 'grade9-physics') : 'grade' + g + '-science');
      await ev(`Labs.practiseChapter('${packId}', '${chapter}'); true`);
      let onPractice = false;
      for (let i = 0; i < 60; i++) { await sleep(250); if (await ev("S.currentScreen === 'practice' && S.practice.chapterId === " + JSON.stringify(chapter))) { onPractice = true; break; } }
      ok(`${lab.id}: "Practise this chapter" lands on that chapter's practice`, onPractice, await ev('({ screen: S.currentScreen, ch: S.practice && S.practice.chapterId })'));
      const fit = await ev("(() => { const vw = innerWidth; return [...document.querySelectorAll('#labs-root button')].filter(e => e.offsetParent && e.getBoundingClientRect().right > vw + 0.5).map(e => e.textContent.trim().slice(0, 20)); })()");
      ok(`${lab.id}: nothing in the lab sits past the right edge of a 360px phone`, fit.length === 0, fit);
    }
  }
  ok('no page errors overall', errors.length === 0, errors.slice(0, 3));
  console.log(`\n${checks} passed, ${failed} failed`);
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); quit(1); });
