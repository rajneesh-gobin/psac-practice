'use strict';
// Opening a subject must load its QUESTIONS, not just its manifest.
//
// WHY THIS EXISTS — reported from a screenshot:
//   "someone sent me this screenshot and asked me why it says question bank not
//    loaded … i cant figure out from the screenshot its for which grade"
//
// Every chapter card read "Question bank not loaded yet" and the summary said
// "0 different bank questions recorded", on a pack holding 499 questions.
// SubjectHub.open() awaited PackLoader.ensure(), which loads the MANIFEST —
// chapters, syllabus, generators — and nothing ever awaited QuestionLoader.
// The bank is fetched for the child's OWN grade at sign-in (loadForStudent),
// so this only ever appeared on a subject in another grade, which is exactly
// why it looked like a file:// problem. It is not: measured below over
// file://, the questions arrive the moment something asks for them.
//
// The screenshot also named no grade anywhere — not the breadcrumb, not the
// header — so the question "which grade is this?" could not be answered from
// it at all. Both crumbs now carry the pack's grade.
//
// ⚠ file:// ON PURPOSE. It is the environment the report came from, and it
//   exercises QuestionLoader's LOCAL_FILES path with no server at all -
//   scripts/check.js already fails if that list drifts from the question files.
//   --allow-file-access-from-files is required for the subject scripts.
//
// Run:  CHROME_PATH=<chrome-for-testing> node scripts/test-subject-hub-bank.js
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const http = require('node:http'), assert = require('node:assert/strict');
const { spawn } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9373;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));

let checks = 0;
const ok = (label, cond, detail) => { assert(cond, label + (detail !== undefined ? ' — ' + JSON.stringify(detail) : '')); checks++; console.log('✓ ' + label); };

(async () => {
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-hub-')),
    '--allow-file-access-from-files', '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  let v; for (let i = 0; i < 40 && !v; i++) { try { v = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); } }
  assert(v, 'Chrome starts');
  const ws = new WebSocket(v.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let n = 0; const wait = new Map();
  ws.onmessage = e => { const m = JSON.parse(e.data); if (wait.has(m.id)) { wait.get(m.id)(m); wait.delete(m.id); } };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const id = ++n, t = setTimeout(() => { wait.delete(id); rej(Error('Timeout ' + method)); }, 30000);
    wait.set(id, m => { clearTimeout(t); m.error ? rej(Error(m.error.message)) : res(m.result); });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const target = await send('Target.createTarget', { url: 'about:blank' });
  const session = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
  const call = (m, p) => send(m, p, session.sessionId);
  await call('Page.enable'); await call('Runtime.enable'); await call('Network.enable');
  await call('Network.setBypassServiceWorker', { bypass: true }); await call('Network.setCacheDisabled', { cacheDisabled: true });
  const ev = async expr => {
    const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    assert(!r.exceptionDetails, String(r.exceptionDetails && r.exceptionDetails.exception && r.exceptionDetails.exception.description || '').slice(0, 400));
    return r.result.value;
  };

  const url = 'file:///' + path.join(ROOT, 'index.html').replace(/\\/g, '/');
  await call('Page.navigate', { url });
  let ready = false;
  for (let i = 0; i < 60 && !ready; i++) { await sleep(500); try {
    ready = await ev("document.readyState === 'complete' && typeof SubjectHub !== 'undefined' && typeof SUBJECT_PACKS !== 'undefined'");
  } catch (_) {} }
  assert(ready, 'app booted');
  ok('the app boots over file://', await ev("location.protocol") === 'file:');

  // Derived, never a literal: a pack that is live and whose questions the boot
  // has not already pulled in. Picking one by name would rot the day it moves.
  const pick = await ev([
    '(() => {',
    '  const live = SUBJECT_PACKS.filter(p => !p.comingSoon);',
    '  for (const p of live) {',
    '    const ids = (p._chapters || p.chapters || []).map(c => c.id);',
    '    if (!ids.length) continue;',
    '    const held = STATIC_QUESTIONS.filter(q => q && ids.includes(q.chapterId)).length;',
    '    if (!held) return { id: p.id, grade: p.grade, subject: p.subject || p.name, chapters: ids.length };',
    '  }',
    '  return null;',
    '})()',
  ].join('\n'));
  assert(pick, 'a live pack with no questions loaded at boot');
  console.log('  · probing ' + pick.id + ' (Grade ' + pick.grade + ', ' + pick.chapters + ' chapters)');

  const held = () => ev([
    '(() => {',
    "  const p = SUBJECT_PACKS.find(x => x.id === " + JSON.stringify(pick.id) + ");",
    '  const ids = (p._chapters || p.chapters || []).map(c => c.id);',
    '  return STATIC_QUESTIONS.filter(q => q && ids.includes(q.chapterId)).length;',
    '})()',
  ].join('\n'));

  ok('its questions are not in the bank before it is opened', await held() === 0);

  await ev("SubjectHub.open(" + JSON.stringify(pick.id) + ").then(() => 'done')");
  await sleep(1200);

  const after = await held();
  ok('opening the subject loads its question bank', after > 0, after);

  const panel = String(await ev("(document.getElementById('sh-chapter-panel')||{}).textContent || ''"));
  const notLoaded = (panel.match(/Question bank not loaded yet/g) || []).length;
  const explored = (panel.match(/of \d+ questions explored/g) || []).length;
  // ⚠ THE REPORTED SYMPTOM. Not one card may say this on a pack that has
  //   questions - it is the card calling the content missing.
  ok('no chapter card claims the bank is missing', notLoaded === 0, { notLoaded, explored });
  ok('every chapter card reports a real count', explored === pick.chapters, { explored, chapters: pick.chapters });
  ok('the summary counts the loaded questions',
    /\d+ questions currently loaded/.test(panel), panel.slice(0, 200));

  // The other half of the report: a screenshot has to say which grade it is.
  const crumb = String(await ev("(document.getElementById('breadcrumb-inner') || document.querySelector('#breadcrumb-bar') || {}).textContent || ''"));
  ok('the breadcrumb names the grade', crumb.includes('Grade ' + pick.grade), crumb);
  ok('and still names the subject', crumb.includes(pick.subject), crumb);
  const sub = String(await ev("(document.getElementById('subj-hub-sub')||{}).textContent || ''"));
  ok('the subject header names the grade too', sub.startsWith('Grade ' + pick.grade), sub);

  console.log('\nSubject hub question bank: ' + checks + ' checks passed.');
  ws.close(); chrome.kill(); process.exit(0);
})().catch(e => { console.error(e.message || e); process.exit(1); });
