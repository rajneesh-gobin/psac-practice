'use strict';
// Timetable sessions the child can actually carry out, and a parent can hold
// them to:
//   - a SUBJECT session ("Maths · 60 min") with a minutes target, done when the
//     minutes are met - any chapter in the subject counts;
//   - a CHAPTER task, done once that chapter is practised that day;
//   - minutes per subject per day recorded beside the whole-day seconds
//     (daily[date].sub[packId]);
//   - "Today's plan first": a parent switch under which a chapter outside
//     today's plan opens the plan instead, until the plan is done.
//
// Driven in a real browser against the real functions. Supabase is stubbed at
// `_sb.from` (the client is a const, its methods are not), so the real
// Calendar.getBacklog() and saveEvent() run end to end without a family.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-timetable-plan.js
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os'), assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const PORT = 8833, DBG = 9373;
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
const ok = (label, cond, detail) => { assert(cond, label + (detail === undefined ? '' : ' — ' + JSON.stringify(detail))); checks++; console.log('✓ ' + label); };

(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG, '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-ttplan-')), '--no-first-run', '--hide-scrollbars', 'about:blank',
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
    assert(!r.exceptionDetails, String(r.exceptionDetails && r.exceptionDetails.exception && r.exceptionDetails.exception.description || '').slice(0, 600));
    return r.result.value;
  };
  await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 850, deviceScaleFactor: 1, mobile: true });
  await call('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/' });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof startChapterDirect === 'function' && typeof Calendar === 'object'"); } catch (_) {} }
  assert(ready, 'app loaded');
  await sleep(600);

  // ── seconds per subject ─────────────────────────────────────────────────
  const t = await ev(`(() => {
    ACTIVE_PACK = { id: 'grade4-maths' };
    _lastAnswerAt = Date.now() - 30000;
    const d = {};
    _recordTimeOnTask(d);
    const today = _muDayKey();
    DB.daily = DB.daily || {};
    DB.daily[today] = { a: 0, c: 0, sub: { 'grade4-maths': 1500, 'grade4-english': 59 } };
    return { s: d.s, sub: d.sub, mins: _subjectMinutesOn(today) };
  })()`);
  ok('an answer gap is credited to the day AND to the active subject', t.s === 30 && t.sub['grade4-maths'] === 30, t);
  ok('minutes per subject floor whole minutes', t.mins['grade4-maths'] === 25 && t.mins['grade4-english'] === 0, t.mins);

  // ── child rows ──────────────────────────────────────────────────────────
  const ROWS = `[
    { id: 'e1', date: _muDayKey(), label: '📚 Maths practice · 60 min', minutes: 60, subjectId: 'grade4-maths', subjectName: 'Maths', chapterId: null, icon: '📐', kind: 'subject', done: false, doneMinutes: 25, questions: 0, isToday: true, isPast: false },
    { id: 'e2', date: _muDayKey(), label: '🔢 Fractions', minutes: null, subjectId: 'grade4-maths', subjectName: 'Maths', chapterId: 'g4m-fractions', icon: '🔢', kind: 'chapter', done: true, doneMinutes: 25, questions: 12, isToday: true, isPast: false },
    { id: 'e3', date: '2026-01-05', label: '📚 English practice · 30 min', minutes: 30, subjectId: 'grade4-english', subjectName: 'English', chapterId: null, icon: '📘', kind: 'subject', done: true, doneMinutes: 31, questions: 0, isToday: false, isPast: true }
  ]`;
  const rows = await ev(`(() => { const R = ${ROWS}; return R.map(r => _scheduleRow(r, false)); })()`);
  ok('a subject session offers "Choose chapter" and shows minutes so far', /Choose chapter/.test(rows[0]) && /25 of 60 min/.test(rows[0]) && /startScheduledSubject\('grade4-maths'\)/.test(rows[0]), rows[0].slice(0, 300));
  ok('a done chapter task shows a tick and the questions done, no Start button', /✅ Done/.test(rows[1]) && /12 questions done/.test(rows[1]) && !/startScheduledSession/.test(rows[1]), rows[1].slice(0, 300));
  ok('a done past subject session is ticked, never "overdue"', /✅ Done/.test(rows[2]) && /30 of 30 min/.test(rows[2]), rows[2].slice(0, 300));
  const card = await ev(`(() => { const R = ${ROWS}; return _ttSessionCard(R[0]); })()`);
  ok('the day popup offers a subject session a chapter picker and says any chapter counts', /Choose a chapter/.test(card) && /Any chapter in Maths counts/.test(card), card.slice(0, 300));

  // ── home card + plan cache ──────────────────────────────────────────────
  const home = await ev(`(async () => {
    ACTIVE_STUDENT_ID = 'kid1';
    const R = ${ROWS};
    Calendar.getBacklog = async () => R;
    Calendar.awardDoneToday = () => {};
    _renderShMissions();
    await new Promise(r => setTimeout(r, 200));
    return { sub: document.getElementById('sh-schedule-sub').textContent, cached: _planToday.rows.length, who: _planToday.studentId };
  })()`);
  ok('the home card counts today\'s sessions done, and a done past session is not overdue', home.sub === '1 of 2 done today' && home.cached === 2 && home.who === 'kid1', home);

  // ── the "today's plan first" gate ───────────────────────────────────────
  const gate = await ev(`(() => {
    DB.restrictions = { planFirst: true };
    ACTIVE_PACK = { id: 'grade4-english' };
    const out = {};
    out.blocksOther = _planFirstBlocks('g4e-grammar');
    out.allowsPlannedChapter = !_planFirstBlocks('g4m-fractions');
    ACTIVE_PACK = { id: 'grade4-maths' };
    out.allowsSubjectOfPlan = !_planFirstBlocks('g4m-anything');
    ACTIVE_PACK = { id: 'grade4-english' };
    startChapterDirect('g4e-grammar');
    out.modalShown = !document.getElementById('modal-plan-first').classList.contains('hidden');
    out.modalRows = document.querySelectorAll('#plan-first-list > div').length;
    closePlanFirst();
    out.modalClosed = document.getElementById('modal-plan-first').classList.contains('hidden');
    _planToday.rows.forEach(r => r.done = true);
    out.openWhenAllDone = !_planFirstBlocks('g4e-grammar');
    _planToday.rows[0].done = false;
    DB.restrictions = {};
    out.openWhenOff = !_planFirstBlocks('g4e-grammar');
    DB.restrictions = { planFirst: true };
    _planToday = { studentId: null, rows: [] };
    out.openWithNoCache = !_planFirstBlocks('g4e-grammar');
    DB.restrictions = {};
    return out;
  })()`);
  ok('outside the plan is gated; a planned chapter and any chapter of a planned subject are not', gate.blocksOther && gate.allowsPlannedChapter && gate.allowsSubjectOfPlan, gate);
  ok('the gate opens the plan dialog with today\'s rows, and closes', gate.modalShown && gate.modalRows === 2 && gate.modalClosed, gate);
  ok('the gate stands down when the plan is done, when the switch is off, and when nothing is cached', gate.openWhenAllDone && gate.openWhenOff && gate.openWithNoCache, gate);

  // ── the real mapper, against a stubbed Supabase ─────────────────────────
  const FAKE_SB = `(() => {
    const chapterId = (SUBJECT_PACKS.find(p => p.id === 'grade4-maths').chapters || [])[0].id;
    const today = _muDayKey();
    window.__entries = [
      { id: 'r1', date: today, entry_type: 'study', topic_label: '📚 Maths practice · 60 min', notes: null, duration_mins: 60, subject_id: 'grade4-maths', schedule_id: 's1', chapter_id: null },
      { id: 'r2', date: today, entry_type: 'study', topic_label: 'Chapter task', notes: null, duration_mins: null, subject_id: 'grade4-maths', schedule_id: 's1', chapter_id: chapterId },
      { id: 'r3', date: today, entry_type: 'exam', topic_label: 'Maths test', notes: null, duration_mins: null, subject_id: null, schedule_id: 's1', chapter_id: null },
    ];
    window.__inserted = null;
    const builder = table => {
      const b = {};
      const self = () => b;
      ['select', 'eq', 'order', 'limit', 'update', 'delete'].forEach(m => { b[m] = self; });
      b.insert = row => { window.__inserted = row; return b; };
      b.single = () => Promise.resolve({ data: Object.assign({ id: 'new1' }, window.__inserted || {}), error: null });
      b.then = (res, rej) => Promise.resolve({ data: table === 'study_schedules' ? [{ id: 's1', settings: null }] : window.__entries, error: null }).then(res, rej);
      return b;
    };
    _sb.from = table => builder(table);
    DB.daily[today] = { a: 5, c: 4, sub: { 'grade4-maths': 1500 }, ch: {} };
    DB.daily[today].ch[chapterId] = [5, 4];
    return chapterId;
  })()`;
  const chapterId = await ev(FAKE_SB);
  // Overwriting Calendar.getBacklog replaced the real function; bring it back by re-evaluating calendar.js.
  await ev(`(async () => { const src = await (await fetch('/engine/calendar.js')).text(); (0, eval)(src.replace(/^\\uFEFF?'use strict';\\s*const Calendar =/, 'window.__Cal2 =')); return true; })()`);
  const back = await ev(`(async () => {
    ACTIVE_STUDENT_ID = 'kid1';
    const rows = await window.__Cal2.getBacklog('kid1');
    return rows.map(r => ({ id: r.id, kind: r.kind, done: r.done, doneMinutes: r.doneMinutes, questions: r.questions, chapterId: r.chapterId, subjectId: r.subjectId }));
  })()`);
  ok('the mapper returns study rows only, with kinds', back.length === 2 && back[0].kind === 'subject' && back[1].kind === 'chapter', back);
  ok('a subject session reads the subject\'s minutes and is not done under target', back[0].doneMinutes === 25 && back[0].done === false && back[0].subjectId === 'grade4-maths', back[0]);
  ok('a chapter task resolves by chapter_id and is done once practised', back[1].chapterId === chapterId && back[1].questions === 5 && back[1].done === true, back[1]);

  // ── the parent modal writes subject + minutes + chapter ─────────────────
  const modal = await ev(`(async () => {
    Store.getAccounts = () => [{ id: 'kid1', name: 'Kid', grade: 4, avatar: '🧒' }];
    Auth.getStudents = () => [{ id: 'kid1', display_name: 'Kid', username: 'kid', grade: 4, settings: {} }];
    Store.updateStudent = async (id, patch) => { window.__patched = { id, patch }; return { ok: true }; };
    const C = window.__Cal2;
    await C.render();
    C.showAddEvent(null, 'study');
    const out = {};
    out.studyVisible = !document.getElementById('add-event-study').classList.contains('hidden');
    out.labelHidden = document.getElementById('add-event-label-wrap').classList.contains('hidden');
    out.subjects = [...document.getElementById('add-event-subject').options].map(o => o.value);
    out.minutes = document.getElementById('add-event-minutes').value;
    await new Promise(r => setTimeout(r, 1500));
    out.chapters = document.getElementById('add-event-chapter').options.length;
    document.getElementById('add-event-subject').value = 'grade4-maths';
    C.onSubjectChange();
    await new Promise(r => setTimeout(r, 1500));
    document.getElementById('add-event-minutes').value = '60';
    document.getElementById('add-event-chapter').value = '${chapterId}';
    await C.saveEvent();
    // inserts are arrays now (weekly repeat); a single session is a one-row array
    out.inserted = Array.isArray(window.__inserted) ? window.__inserted[0] : window.__inserted;
    out.planBox = document.getElementById('cal-plan-first').checked;
    await C.setPlanFirst(true);
    out.patched = window.__patched;
    out.mirrored = DB.restrictions && DB.restrictions.planFirst === true;
    return out;
  })()`);
  ok('choosing "Study session" shows subject, minutes and chapter and hides the free-text name', modal.studyVisible && modal.labelHidden && modal.subjects.includes('grade4-maths') && modal.minutes === '30', { s: modal.studyVisible, l: modal.labelHidden, subjects: modal.subjects, m: modal.minutes });
  ok('the chapter list is filled from the pack (plus the "no specific chapter" choice)', modal.chapters > 1, modal.chapters);
  ok('saving writes subject_id, chapter_id and duration_mins with a derived label',
    modal.inserted && modal.inserted.subject_id === 'grade4-maths' && modal.inserted.chapter_id === chapterId && modal.inserted.duration_mins === 60 && modal.inserted.entry_type === 'study' && /\S/.test(modal.inserted.topic_label), { inserted: modal.inserted, expectedChapter: chapterId });
  ok('"Today\'s plan first" is saved with the child\'s other limits and mirrored live',
    modal.planBox === false && modal.patched && modal.patched.id === 'kid1' && modal.patched.patch.settings.planFirst === true && Array.isArray(modal.patched.patch.settings.lockedChapters) && modal.mirrored, modal.patched);

  // ── the generator's row builder, by shape ──────────────────────────────
  const gen = await ev(`(() => {
    const C = window.__Cal2;
    const maths = { id: 'grade4-maths', icon: '🔢', subject: 'Maths', name: 'Maths' };
    const chapters = [{ id: 'c1', icon: '①', name: 'One' }, { id: 'c2', icon: '②', name: 'Two' }, { id: 'c3', icon: '③', name: 'Three' }];
    let cursor = 0;
    const fill = (sid, mins) => { const picks = []; let left = mins; while (left >= 10) { const m = Math.min(30, left); picks.push({ chapter: chapters[cursor++ % 3], mins: m }); left -= m; } return picks; };
    const plan = { '2026-10-05': [{ subject: maths, mins: 60 }], '2026-10-06': [{ subject: maths, mins: 45 }] };
    const dates = ['2026-10-05', '2026-10-06'];
    const run = shape => { cursor = 0; return C._genEntries({ shape, session: 30 }, dates, plan, fill); };
    return { chapter: run('chapter'), subject: run('subject'), both: run('both'), bad: run('nonsense') };
  })()`);
  ok('shape "chapter" splits the minutes into named-chapter sessions (the original)',
    gen.chapter.length === 4 && gen.chapter.every(r => r.chapter_id && r.duration_mins) && gen.chapter[0].duration_mins === 30 && gen.chapter[3].duration_mins === 15, gen.chapter);
  ok('shape "subject" makes one row per subject-day carrying all the minutes and no chapter',
    gen.subject.length === 2 && gen.subject.every(r => r.chapter_id === null) && gen.subject[0].duration_mins === 60 && gen.subject[1].duration_mins === 45 && /Maths practice · 60 min/.test(gen.subject[0].topic_label), gen.subject);
  ok('shape "both" adds one chapter to complete beside each subject row, with no minutes of its own',
    gen.both.length === 4 && gen.both[0].chapter_id === null && gen.both[0].duration_mins === 60 && gen.both[1].chapter_id === 'c1' && gen.both[1].duration_mins === null && gen.both[3].chapter_id === 'c2', gen.both);
  ok('an unknown shape falls back to the original', gen.bad.length === 4 && gen.bad.every(r => r.chapter_id), gen.bad.length);

  // ── weekly repeat ───────────────────────────────────────────────────────
  const rep = await ev(`(async () => {
    const C = window.__Cal2;
    const out = { dates: C._repeatDates('2026-10-05', '2026-11-02'), capped: C._repeatDates('2026-01-05', '2030-01-01').length, none: C._repeatDates('2026-10-05', '2026-10-04') };
    C.showAddEvent('2026-10-05', 'study');
    out.repeatShown = !document.getElementById('add-event-repeat-wrap').classList.contains('hidden');
    document.getElementById('add-event-subject').value = 'grade4-maths';
    C.onSubjectChange();
    await new Promise(r => setTimeout(r, 300));
    document.getElementById('add-event-minutes').value = '45';
    document.getElementById('add-event-chapter').value = '';
    document.getElementById('add-event-repeat').checked = true;
    C.onRepeatChange();
    out.untilDefault = document.getElementById('add-event-repeat-until').value;
    document.getElementById('add-event-repeat-until').value = '2026-10-26';
    window.__inserted = null;
    await C.saveEvent();
    out.inserted = window.__inserted;
    C.editEntry && C.editEntry('r1');
    out.repeatHiddenOnEdit = document.getElementById('add-event-repeat-wrap').classList.contains('hidden');
    C.closeAddEvent();
    return out;
  })()`);
  ok('repeat dates run a week apart up to and including the last date', rep.dates.join() === '2026-10-05,2026-10-12,2026-10-19,2026-10-26,2026-11-02' && rep.none.length === 0, rep.dates);
  ok('repeat is capped at 26 weeks', rep.capped === 26, rep.capped);
  ok('the planner offers weekly repeat for a new study session and suggests an end date', rep.repeatShown && /^\d{4}-\d{2}-\d{2}$/.test(rep.untilDefault) && rep.untilDefault > '2026-10-05', rep);
  ok('saving with repeat inserts one row per week in a single write, each a subject session',
    Array.isArray(rep.inserted) && rep.inserted.length === 4 && rep.inserted.map(r => r.date).join() === '2026-10-05,2026-10-12,2026-10-19,2026-10-26' && rep.inserted.every(r => r.subject_id === 'grade4-maths' && r.duration_mins === 45 && r.chapter_id === null), rep.inserted);
  ok('editing an existing session never offers repeat', rep.repeatHiddenOnEdit === true, rep);

  console.log('\nTimetable plan: ' + checks + ' checks passed.');
  ws.close(); chrome.kill(); server.close(); process.exit(0);
})().catch(e => { console.error(e.message || e); process.exit(1); });
