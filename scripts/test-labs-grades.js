'use strict';
// Science Labs per grade, in a real browser.
//
// A child sees the labs for THEIR grade: the home note appears only for a grade
// that has a lab; the hub's "My grade" picker offers their own grade plus any a
// parent unlocked above it (never below - a child aims up); Grade 5, which has
// no core science in the app, borrows the Grade 4 and 6 primary labs; and a lab
// knows which grade it is being used at (Labs.grade()), which decides whether
// its exam point says PSAC or NCE. Also: the home note's grade list in app.js
// matches the labs registry, the Sharp sign, picture answer options, 360px.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-labs-grades.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9411;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); } };

(async () => {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-labgrades-'));
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG, '--user-data-dir=' + profile,
    '--allow-file-access-from-files', '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  const quit = code => {
    try { chrome.kill(); } catch (_) {}
    setTimeout(() => { try { fs.rmSync(profile, { recursive: true, force: true }); } catch (_) {} process.exit(code); }, 400);
  };
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

  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof openLabs === 'function'"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url + ', not the file we navigated to.'); quit(1); return; }
  ok('app loaded', ready === true);
  await sleep(2500);

  // ── The home note, before any lab code loads ──────────
  console.log('\n-- the home note');
  const note = (g, grant) => ev(`(() => {
    if (typeof DB === 'undefined' || !DB) DB = {};
    DB.restrictions = ${grant ? `{ allowedGrades: ${JSON.stringify(grant)} }` : '{}'};
    SELECTED_GRADE = ${g}; showScreen('student-home');
    return getComputedStyle(document.getElementById('sh-note-labs')).display !== 'none'; })()`);
  for (const [g, want, why] of [[4, true, 'Materials Tester'], [5, true, 'borrows Grades 4 and 6'], [6, true, 'Rusting Lab'],
                                [7, false, 'no Grade 7 lab yet'], [8, false, 'no Grade 8 lab yet'], [9, true, 'nine labs']]) {
    ok(`Grade ${g} ${want ? 'sees' : 'does not see'} Science Labs (${why})`, (await note(g)) === want);
  }
  ok('Grade 7 sees it once a parent grants Grade 9', await note(7, [9]));
  ok('no lab code has loaded yet', await ev("typeof Labs === 'undefined'"));
  await ev("DB.restrictions = {}; SELECTED_GRADE = 7; showScreen('student-home'); openLabs(); true");
  ok('openLabs() refuses Grade 7 with no grant', (await ev('S.currentScreen')) !== 'labs');

  // ── The hub for each grade ────────────────────────────
  console.log('\n-- the hub');
  const hub = async (g, grant) => {
    await ev(`(() => { DB.restrictions = ${grant ? `{ allowedGrades: ${JSON.stringify(grant)} }` : '{}'};
      SELECTED_GRADE = ${g}; showScreen('student-home'); if (typeof Labs !== 'undefined') Labs.backToHub(); openLabs(); return true; })()`);
    for (let i = 0; i < 40; i++) { await sleep(150); if (await ev("typeof Labs !== 'undefined' && !!document.querySelector('#labs-root .lab-hub')")) break; }
    return ev(`(() => { const r = document.getElementById('labs-root');
      return { screen: S.currentScreen, eyebrow: (r.querySelector('.lab-eyebrow') || {}).textContent || '',
        chips: [...r.querySelectorAll('.lab-grade-chip')].map(b => b.textContent.trim()),
        pressed: (r.querySelector('.lab-grade-chip[aria-pressed="true"]') || {}).textContent || null,
        labs: [...r.querySelectorAll('.lab-card[data-lab]')].map(b => b.dataset.lab),
        soon: [...r.querySelectorAll('.lab-card.is-soon .lab-card-name')].map(s => s.textContent),
        subjects: [...r.querySelectorAll('.lab-hub-subject > h2')].map(h => h.textContent) }; })()`);
  };

  let h = await hub(4);
  ok('Grade 4: "PSAC · Grade 4", no picker, the Materials Tester', h.eyebrow === 'PSAC · Grade 4' && !h.chips.length && h.labs.join() === 'materials', h);
  ok('…with Water & States and Air & Burning coming soon, all under Science',
     h.soon.includes('Water & States') && h.soon.includes('Air & Burning') && h.subjects.join() === 'Science', h);
  h = await hub(6);
  ok('Grade 6: the Rusting Lab, Air & Burning coming soon', h.eyebrow === 'PSAC · Grade 6' && h.labs.join() === 'rusting' && h.soon.join() === 'Air & Burning', h);
  h = await hub(5);
  ok('Grade 5 borrows the primary labs built for Grades 4 and 6', h.eyebrow === 'PSAC · Grade 5' && h.labs.includes('materials') && h.labs.includes('rusting'), h);
  h = await hub(9);
  ok('Grade 9: "NCE · Grade 9", nine labs under Chemistry, Physics and Biology',
     h.eyebrow === 'NCE · Grade 9' && h.labs.length === 9 && h.subjects.join() === 'Chemistry,Physics,Biology' && !h.labs.includes('rusting'), h);
  h = await hub(7, [9]);
  ok('Grade 7 with Grade 9 unlocked opens straight onto Grade 9, no picker', h.screen === 'labs' && h.eyebrow === 'NCE · Grade 9' && !h.chips.length && h.labs.length === 9, h);
  h = await hub(6, [9]);
  ok('Grade 6 with Grade 9 unlocked: "My grade" offers 6 and 9, starting on 6', h.chips.join() === 'Grade 6,Grade 9' && h.pressed === 'Grade 6' && h.labs.join() === 'rusting', h);
  await ev("document.querySelector('.lab-grade-chip[data-grade=\"9\"]').click(); true");
  h = await ev(`({ pressed: (document.querySelector('.lab-grade-chip[aria-pressed="true"]') || {}).textContent, eyebrow: document.querySelector('#labs-root .lab-eyebrow').textContent,
    labs: [...document.querySelectorAll('#labs-root .lab-card[data-lab]')].map(b => b.dataset.lab) })`);
  ok('…and picking Grade 9 shows the Grade 9 labs', h.pressed === 'Grade 9' && h.eyebrow === 'NCE · Grade 9' && h.labs.length === 9, h);
  const fit = await ev(`(() => { const vw = innerWidth;
    const off = [...document.querySelectorAll('#labs-root button')].filter(e => e.getBoundingClientRect().right > vw + 0.5).map(e => e.textContent.trim().slice(0, 20));
    const small = [...document.querySelectorAll('#labs-root .lab-grade-chip')].filter(e => e.getBoundingClientRect().height < 44).length;
    return { off, small, root: document.getElementById('labs-root').scrollWidth, vw }; })()`);
  ok('the hub with its picker fits a 360px phone, chips at least 44px tall', fit.off.length === 0 && fit.small === 0 && fit.root <= fit.vw, fit);
  h = await hub(6, [4]);
  ok('a grant BELOW their own grade (catch-up) adds no picker: a child aims up', !h.chips.length && h.labs.join() === 'rusting', h);

  // ── The sync the home note depends on ─────────────────
  const sync = await ev(`(() => {
    const ready = Labs.LABS.filter(l => l.ready);
    const fromLabs = new Set(ready.flatMap(l => l.grades));
    Object.keys(Labs.GRADE_ALIASES).map(Number).forEach(g => { if (Labs.labsFor(g).some(l => l.ready)) fromLabs.add(g); });
    return { labs: [...fromLabs].sort((a, b) => a - b), app: [..._LAB_GRADES].sort((a, b) => a - b) }; })()`);
  ok('_LAB_GRADES in app.js matches the grades the labs registry serves', sync.labs.join() === sync.app.join(), sync);

  // ── A lab knows its grade ─────────────────────────────
  console.log('\n-- a lab knows its grade');
  const openAt = async (id, globalName) => {
    await ev(`Labs.openLab('${id}'); true`);
    for (let i = 0; i < 60; i++) { await sleep(150); if (await ev(`typeof window.${globalName} !== 'undefined' && !!document.querySelector('#labs-root .lab-top')`)) break; }
    await ev("document.getElementById('lab-overlay') && document.getElementById('lab-overlay').remove(); true");
  };
  await hub(5);
  await openAt('materials', 'LabMaterials');
  ok('a Grade 5 pupil in the Materials Tester is using it at Grade 4', (await ev('Labs.grade()')) === 4);
  await ev('Labs.backToHub(); true');
  await openAt('rusting', 'LabRusting');
  ok('…and in the Rusting Lab at Grade 6', (await ev('Labs.grade()')) === 6);
  await ev(`Labs.hazardCard({ signs: ['sharp'], title: 'Test', happened: 'h', why: 'w', instead: 'i', exam: 'e' }); true`);
  let ov = await ev(`(() => { const o = document.getElementById('lab-overlay'); return o && { text: o.textContent, signs: [...o.querySelectorAll('.lab-sign figcaption')].map(f => f.textContent) }; })()`);
  ok('a primary lab’s exam point says “In the PSAC exam”', ov && /In the PSAC exam/.test(ov.text) && !/NCE paper/.test(ov.text), ov);
  ok('the new Sharp sign has its own label', ov && ov.signs.includes('Sharp - can cut'), ov);
  await ev('Labs.closeOverlay(true); Labs.backToHub(); true');
  await openAt('mixing', 'LabMixing');
  ok('a Grade 9 lab opened from Grade 5 is used at Grade 9', (await ev('Labs.grade()')) === 9);
  await ev(`Labs.hazardCard({ signs: ['corrosive'], title: 'Test', happened: 'h', why: 'w', instead: 'i', exam: 'e' }); true`);
  ok('…and its exam point says “On the NCE paper”', /On the NCE paper/.test(await ev("document.getElementById('lab-overlay').textContent")));
  await ev('Labs.closeOverlay(true); true');

  // ── Picture answer options ─────────────────────────────
  await ev(`Labs.quiz([{ q: 'Which is a beaker?', why: 'It has a lip and straight sides.',
    options: [{ label: 'Beaker', svg: '<svg viewBox="0 0 10 10"><rect x="2" y="2" width="6" height="7"/></svg>' }, 'Flask', 'Funnel', 'Tripod'] }], { title: 'Apparatus' }); true`);
  const q = await ev(`(() => { const o = document.getElementById('lab-overlay'); return { pics: o.querySelectorAll('.lab-quiz-pic svg').length,
    labels: [...o.querySelectorAll('.lab-quiz-opt')].map(b => b.textContent.replace(/^[A-D]/, '').trim()).sort() }; })()`);
  ok('a quiz option can be a picture with a label', q.pics === 1 && q.labels.join() === 'Beaker,Flask,Funnel,Tripod', q);
  await ev(`(() => { const b = [...document.querySelectorAll('.lab-quiz-opt')].find(x => /Beaker/.test(x.textContent)); b.click(); return true; })()`);
  ok('…and choosing the picture answer scores it right', await ev("!!document.querySelector('.lab-quiz-opt.is-right') && /Correct!/.test(document.querySelector('.lab-quiz-fb').textContent)"));
  await ev('Labs.closeOverlay(true); Labs.backToHub(); showScreen(\'student-home\'); true');

  ok('no page errors', errors.length === 0, errors.slice(0, 5));
  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
