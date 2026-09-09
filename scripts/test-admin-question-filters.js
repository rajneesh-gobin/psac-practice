'use strict';
// Admin › Question bank — the Grade / Subject / Chapter cascade, measured in a
// real browser.
//
// The filter bar always had a Grade control, but six of the nine registered
// grades are `comingSoon` placeholders, so with "Include unpublished packs"
// off, choosing Grade 1/2/3/7/8/9 emptied the Subject dropdown and the list and
// said nothing — a grade control that visibly does nothing. The Subject list
// also carried all 15 published packs as "Grade N — Subject" until a grade was
// picked, and picking a subject never told the Grade control about it.
//
// Run:  node scripts/test-admin-question-filters.js
// ⚠ Service worker bypassed and cache disabled, or this measures the previous
//   admin.js and reports a fix that never landed.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os'), assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const PORT = 8819, DBG = 9359;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const name = path.resolve(root, '.' + p);
  if (!name.startsWith(root + path.sep) || !fs.existsSync(name) || fs.statSync(name).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(name)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(name).pipe(res);
});
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));

let checks = 0;
const ok = (label, cond, detail) => { assert(cond, label + (detail ? ' — ' + JSON.stringify(detail) : '')); checks++; console.log('✓ ' + label); };

(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG, '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-qmf-')), '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  let version; for (let i = 0; i < 40 && !version; i++) { try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); } }
  assert(version, 'Chrome starts');
  const ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let serial = 0; const waiting = new Map();
  ws.onmessage = e => { const m = JSON.parse(e.data); if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); } };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const id = ++serial, t = setTimeout(() => { waiting.delete(id); rej(Error('Timeout ' + method)); }, 20000);
    waiting.set(id, m => { clearTimeout(t); m.error ? rej(Error(m.error.message)) : res(m.result); });
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
  await call('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/' });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { // ⚠ AdminPanel is injected by RoleModules on the admin route, so ask for
//   the group rather than waiting for a global that a plain boot never defines.
ready = await ev("document.readyState === 'complete' && typeof SUBJECT_PACKS !== 'undefined' " +
  "? RoleModules.ensure('admin').then(() => typeof AdminPanel !== 'undefined') : false"); } catch (_) {} }
  assert(ready, 'app globals loaded');
  await sleep(800);

  // The cascade is a DOM concern; _sb is unauthenticated here, so the list
  // fetch is stubbed out rather than left to fail asynchronously mid-assert.
  await ev('AdminPanel.qmSearch = () => {};');

  const state = () => ev([
    '(() => {',
    "  const vals = s => [...document.querySelectorAll(s + ' option')].map(o => o.value);",
    "  const hint = document.getElementById('qm-filter-hint');",
    '  return {',
    "    grade: document.getElementById('qm-grade').value,",
    "    subject: document.getElementById('qm-subject').value,",
    "    subjects: vals('#qm-subject'),",
    "    subjectLabel1: (document.querySelectorAll('#qm-subject option')[1] || {}).textContent || '',",
    "    optgroups: [...document.querySelectorAll('#qm-subject optgroup')].map(g => g.label),",
    "    chapter: document.getElementById('qm-chapter').value,",
    "    chapters: vals('#qm-chapter').length,",
    "    chapterDisabled: document.getElementById('qm-chapter').disabled,",
    "    unpublished: document.getElementById('qm-include-unpublished').checked,",
    '    hint: hint.textContent,',
    "    hintShown: !hint.classList.contains('hidden'),",
    '  };',
    '})()',
  ].join('\n'));
  const pick = (id, val) => ev("(() => { const e = document.getElementById('" + id + "'); e.value = " + JSON.stringify(val) + "; e.dispatchEvent(new Event('change')); })()");
  const tick = on => ev("(() => { const e = document.getElementById('qm-include-unpublished'); e.checked = " + (!!on) + "; e.dispatchEvent(new Event('change')); })()");

  const liveGrades = await ev('[...new Set(SUBJECT_PACKS.filter(p => !p.comingSoon).map(p => p.grade))].sort()');
  const allGrades = await ev('[...new Set(SUBJECT_PACKS.map(p => p.grade))].sort()');
  // Derived, never a literal: publishing a pack (the Grade 9 packs went live)
  // changes how many subjects this control offers.
  const liveCount = await ev('SUBJECT_PACKS.filter(p => !p.comingSoon).length');
  const liveGradeCount = await ev('new Set(SUBJECT_PACKS.filter(p => !p.comingSoon).map(p => p.grade)).size');

  await pick('qm-grade', ''); let s = await state();
  ok('no grade: every published pack is offered, grouped by grade',
    s.subjects.length === liveCount + 1 && s.optgroups.length === liveGradeCount
    && s.optgroups.every(l => /^Grade \d+$/.test(l)), s);
  // The grade is carried by the group label now. Repeating it on every row is
  // what made 42 published packs read as one subject listed nine times over.
  ok('no grade: the row itself is not grade-prefixed', !/^Grade \d+ - /.test(s.subjectLabel1), s);

  await pick('qm-grade', '5'); s = await state();
  ok('grade 5: subject list narrows to that grade, flat and unprefixed',
    s.subjects.length === 6 && s.subjects.every(v => !v || v.startsWith('grade5-'))
    && s.optgroups.length === 0 && !/^Grade /.test(s.subjectLabel1), s);

  await pick('qm-subject', 'grade5-french'); s = await state();
  ok('subject enables the chapter list', s.chapter === '' && s.chapters > 1 && !s.chapterDisabled, s);

  await pick('qm-grade', '6'); s = await state();
  ok('changing grade drops a subject that cannot survive it',
    s.subject === '' && s.chapterDisabled && s.subjects.every(v => !v || v.startsWith('grade6-')), s);

  await pick('qm-grade', ''); await pick('qm-subject', 'grade4-history'); s = await state();
  ok('choosing a subject under "All grades" sets the grade to match and shortens the list',
    s.grade === '4' && s.subject === 'grade4-history' && s.subjects.length === 6, s);

  const firstChapter = await ev("document.querySelectorAll('#qm-chapter option')[1].value");
  await pick('qm-chapter', firstChapter); s = await state();
  ok('a chapter can be chosen', s.chapter === firstChapter, s);

  // The dead end: a grade whose packs are all placeholders. Derived, and it
  // can legitimately not exist - every registered grade published at least
  // one pack on 2026-09-09. Asserting on String(undefined) tested nothing and
  // reported it as a failure of the control.
  const deadGradeNum = allGrades.find(g => !liveGrades.includes(g));
  const deadGrade = deadGradeNum === undefined ? null : String(deadGradeNum);
  await tick(false);
  if (deadGrade === null) {
    console.log('- no placeholder-only grade left to test (every registered grade has a published pack)');
  } else {
    await pick('qm-grade', deadGrade); s = await state();
    ok('grade ' + deadGrade + ' (placeholders only) opens its packs instead of emptying the control',
      s.subjects.length > 1 && s.unpublished === true, s);
    ok('grade ' + deadGrade + ' says why', s.hintShown && /no published packs/.test(s.hint), s);
  }

  await pick('qm-grade', String(liveGrades[0])); s = await state();
  ok('a published grade shows no notice', !s.hintShown && s.hint === '', s);

  // Derived, never a literal: this read `=== 6` because liveGrades[0] was
  // Grade 4 and Grade 4 publishes five packs. Grades 1-3 went live on
  // 2026-09-09 with three packs each, so the literal started failing over a
  // control that was working.
  const firstLiveCount = await ev('SUBJECT_PACKS.filter(p => !p.comingSoon && p.grade === ' + liveGrades[0] + ').length');
  await tick(false); s = await state();
  ok('unticking "include unpublished" rebuilds the subject list',
    s.subjects.length === firstLiveCount + 1 && s.subjects.every(v => !v || v.startsWith('grade' + liveGrades[0] + '-')), s);

  // The notice sits inside the panel, which is a different ground in each theme.
  // With no placeholder-only grade the notice cannot be raised, so its
  // contrast is unmeasurable rather than wrong.
  if (deadGrade === null) { console.log('- notice contrast not measurable without a placeholder-only grade'); }
  else await pick('qm-grade', deadGrade);
  const colours = await ev([
    '(() => {',
    "  const e = document.getElementById('qm-filter-hint'), p = e.closest('.qm-filter-panel');",
    "  const was = document.documentElement.classList.contains('dark');",
    "  document.documentElement.classList.remove('dark');",
    '  const light = [getComputedStyle(e).color, getComputedStyle(p).backgroundColor];',
    "  document.documentElement.classList.add('dark');",
    '  const dark = [getComputedStyle(e).color, getComputedStyle(p).backgroundColor];',
    "  document.documentElement.classList.toggle('dark', was);",
    '  return { light, dark };',
    '})()',
  ].join('\n'));
  const lum = c => c.match(/[\d.]+/g).slice(0, 3).map(Number).map(v => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }).reduce((n, v, i) => n + v * [.2126, .7152, .0722][i], 0);
  const ratio = pair => (Math.max(lum(pair[0]), lum(pair[1])) + .05) / (Math.min(lum(pair[0]), lum(pair[1])) + .05);
  for (const theme of ['light', 'dark']) {
    const r = ratio(colours[theme]);
    ok('the notice clears 4.5:1 in ' + theme + ' (' + r.toFixed(2) + ':1)', r >= 4.5, colours[theme]);
  }

  console.log('\nAdmin question filters: ' + checks + ' checks passed.');
  ws.close(); chrome.kill(); server.close(); process.exit(0);
})().catch(e => { console.error(e.message || e); process.exit(1); });
