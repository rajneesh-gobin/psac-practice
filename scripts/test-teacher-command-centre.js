'use strict';
// Teacher Command Centre — logic and markup, no browser.
//
//  1. index.html: the main navigation is exactly Home / Classrooms / Set Work /
//     Results, the More menu carries the five secondary tools, and every
//     secondary panel (materials, messages, gradebook, archived work, settings)
//     still exists; the classroom overlay has Overview / Work / Pupils plus a
//     More menu; the initial Set Work form shows only the five simple fields
//     with everything else inside <details id="ta-more-options">; no technical
//     wording ("token", "guest account", "anonymous", "access type") reaches a
//     teacher.
//  2. TeacherInsights: evidence thresholds — nobody is "struggling" or
//     "rushed" on one or two answers, chapters are only named after three,
//     grouping and averages are right, and the pupil roll-up flags correctly.
//  3. TeacherMode in a VM: a non-teacher is bounced; the location survives a
//     refresh; buildAssignment sends PIN / open-link / due date / chosen pupils
//     and falls back with a visible warning when the database lacks the new
//     signature; repeated clicks create once.
//  4. TeacherWorkspace in a VM: loading, empty and failed states are readable
//     and a failure never wipes an already-loaded list.
//
// Run: node scripts/test-teacher-command-centre.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');
let checks = 0;
const ok = (cond, msg) => { assert(cond, msg); checks++; };
const eq = (a, b, msg) => { assert.equal(a, b, msg); checks++; };

// ── 0. Syntax of every edited file ──────────────────────────────────────────
for (const f of ['engine/teacher.js', 'engine/teacher_workspace.js', 'engine/teacher_guest_classes.js', 'engine/teacher_classroom_detail.js', 'engine/teacher_home.js', 'engine/teacher_insights.js', 'engine/app.js', 'sw.js']) {
  execFileSync(process.execPath, ['--check', f]); checks++;
}

// ── 1. Markup ───────────────────────────────────────────────────────────────
const html = fs.readFileSync('index.html', 'utf8');
const teacher = html.slice(html.indexOf('<div id="screen-teacher"'), html.indexOf('<!-- ══════════ ASSIGNMENT ENTRANCE'));
const nav = teacher.slice(teacher.indexOf('class="teacher-navigation"'), teacher.indexOf('<!-- ── TAB: HOME'));
const tabs = [...nav.matchAll(/class="ta-tab" data-tab="([a-z]+)"/g)].map(m => m[1]);
assert.deepEqual(tabs, ['home', 'classes', 'create', 'results'], 'main navigation has exactly four tabs'); checks++;
const more = [...nav.matchAll(/data-more="([a-z]+)"/g)].map(m => m[1]);
assert.deepEqual(more, ['materials', 'messages', 'gradebook', 'assignments', 'settings'], 'More holds the five secondary tools'); checks++;
for (const t of ['home', 'classes', 'create', 'results', 'assignments', 'gradebook', 'materials', 'messages', 'settings']) ok(teacher.includes(`data-tab="${t}"`) && teacher.includes(`class="ta-tab-content${t === 'home' ? '' : ' hidden'}" data-tab="${t}"`), `panel for ${t} exists`);
for (const id of ['tm-title', 'tm-file', 'tm-list', 'tc-msg-list', 'ta-gradebook-root', 'ta-asgn-list', 'ta-results-list', 'ta-results-assign-sel', 'tc-list', 'tc-name', 'ta-classroom', 'ta-access', 'ta-pin', 'ta-chapter-opts-container']) ok(teacher.includes(`id="${id}"`), `existing element #${id} preserved`);
ok(/onclick="Auth\.switchToStudentSelect\(\)"/.test(teacher), 'teacher → student mode switch kept');
ok(teacher.includes('ProfileInstall.installTeacher()') && teacher.includes('Auth.openInviteModal()'), 'install + invite moved into Teacher settings');

const form = teacher.slice(teacher.indexOf('id="ta-create-form"'), teacher.indexOf('<!-- ── TAB: RESULTS'));
const before = form.slice(0, form.indexOf('<details id="ta-more-options"'));
const inside = form.slice(form.indexOf('<details id="ta-more-options"'), form.indexOf('</details>'));
for (const id of ['ta-class-picker', 'ta-share-choice', 'ta-grade', 'ta-subject', 'ta-chapter-opts-container', 'ta-count', 'ta-due']) ok(before.includes(`id="${id}"`), `${id} is on the initial form`);
for (const id of ['ta-difficulty', 'ta-mode', 'ta-duration', 'ta-label', 'ta-random', 'ta-pupils-list']) ok(inside.includes(`id="${id}"`), `${id} is behind More options`);
ok(!before.includes('id="ta-difficulty"') && !before.includes('id="ta-pupils-list"'), 'advanced fields are not on the initial form');
eq((form.match(/class="teacher-step"/g) || []).length, 3, 'three step headings');
ok(/My classroom pupils/.test(form) && /Each pupil uses their personal four-digit PIN/.test(form), 'PIN sharing choice in plain words');
ok(/Anyone with the link/.test(form) && /Pupils enter their name and begin/.test(form), 'open-link sharing choice in plain words');
const visibleCopy = teacher.replace(/<select id="ta-access"[\s\S]*?<\/select>/, '').replace(/<!--[\s\S]*?-->/g, '').replace(/aria-label="[^"]*"/g, '');
for (const word of ['guest account', 'token', 'anonymous', 'access type', 'database record']) ok(!new RegExp(word, 'i').test(visibleCopy), `no "${word}" in teacher-facing copy`);

const overlay = html.slice(html.indexOf('<div id="tc-classroom-detail"'), html.indexOf('<!-- ══════════ ASSIGNMENT ENTRANCE'));
const cdNav = [...overlay.matchAll(/class="tc-cd-nav-btn" role="tab" data-sec="([a-z]+)"/g)].map(m => m[1]);
assert.deepEqual(cdNav, ['overview', 'work', 'pupils', 'materials'], 'classroom overlay has four primary sections, materials among them'); checks++;
const cdMore = [...overlay.matchAll(/role="menuitem" data-sec="([a-z]+)"/g)].map(m => m[1]);
assert.deepEqual(cdMore, ['results', 'settings'], 'classroom More holds only results and settings'); checks++;
for (const s of ['overview', 'work', 'pupils', 'materials', 'results', 'settings']) ok(overlay.includes(`id="tc-cd-${s}"`), `classroom section ${s} exists`);
ok(/id="ta-share-class"/.test(html) && /id="ta-share-due"/.test(html) && /id="ta-share-qr"/.test(html) && /id="ta-share-view"/.test(html) && /TeacherMode\.shareCopyLink\(\)/.test(html), 'success screen shows classroom, due date, copy, QR and View');
// ⚠ NOT <script> TAGS AND NOT IN SHELL_FILES ANY MORE. The eight role
//   modules are injected by RoleModules.ensure() when someone opens one of
//   those screens; scripts/test-role-modules.js fails if a tag or a
//   pre-cache entry comes back. What matters here is that the two newer
//   teacher modules are in the group, in the right order.
const groups = fs.readFileSync('engine/registry.js', 'utf8')
  .match(/const GROUPS = \{([\s\S]*?)\n  \};/)[1];
ok(groups.includes("'engine/teacher_insights.js'") && groups.includes("'engine/teacher_home.js'"),
  'new modules are in the RoleModules teacher group');
const swSrc = fs.readFileSync('sw.js', 'utf8');
ok(!swSrc.includes("'/engine/teacher_insights.js'") && !swSrc.includes("'/engine/teacher_home.js'"),
  'new modules are kept OUT of the all-or-nothing pre-cache list');
ok(/_ADULT_ONLY_SCREENS = new Set\(\[[^\]]*'teacher'/.test(fs.readFileSync('engine/app.js', 'utf8')), 'teacher screen is adult-only in showScreen');

// ── 2. Insights ─────────────────────────────────────────────────────────────
const ictx = vm.createContext({ window: {}, Date, Math, Map, Set, Number, String, Array, Object, JSON, console });
vm.runInContext(fs.readFileSync('engine/teacher_insights.js', 'utf8') + '\nthis.I = TeacherInsights;', ictx);
const I = ictx.I;
const done = (name, key, score, total, secs, answers = []) => ({ name, name_key: key, submitted_at: '2026-09-05T10:00:00Z', score, total, pct: Math.round(score / total * 100), elapsed_secs: secs, answers });
const ans = (ch, okk, i) => ({ id: `g5m-${ch}-00${i}`, correct: okk, userAnswer: 'x', correctAnswer: 'y' });
ok(!I.needsHelp(done('Two answers', 'k1', 0, 2, 10)), 'zero out of two is NOT "needs help" — too little evidence');
ok(!I.rushed(done('Fast but short', 'k2', 0, 2, 3)), 'two questions in 3 s is not "rushed"');
ok(I.needsHelp(done('Low', 'k3', 2, 10, 300)), '2/10 needs help');
ok(!I.needsHelp(done('Fine', 'k4', 7, 10, 300)), '7/10 does not');
ok(I.rushed(done('Rusher', 'k5', 3, 10, 40)), '10 questions in 40 s at 30% is rushed');
ok(!I.rushed(done('Quick but right', 'k6', 10, 10, 40)), 'quick and correct is not rushed');
const rows = [
  done('Aisha', 'p1', 8, 10, 600, [1,2,3,4,5,6,7,8,9,10].map(i => ans('fractions', i <= 8, i))),
  done('Ben', 'p2', 2, 10, 50, [1,2,3,4,5,6,7,8,9,10].map(i => ans('fractions', i <= 2, i))),
  done('Cara', 'p3', 1, 3, 20, [1,2,3].map(i => ans('fractions', false, i))),
  { name: 'Dev', name_key: 'p4', not_started: true, submitted_at: null, answers: [] },
  { name: 'Eli', name_key: 'p5', not_started: false, submitted_at: null, answers: [] },
];
const s = I.summarize(rows);
eq(s.assigned, 5); eq(s.completed, 3); eq(s.working, 1); eq(s.notStarted, 1); eq(s.help, 1, 'only Ben (Cara has 3 answers — not enough)');
eq(s.average, Math.round((80 + 20 + 33) / 3)); eq(s.averageSecs, Math.round((600 + 50 + 20) / 3));
const active = { status: 'active', expires_at: new Date(Date.now() + 86400000).toISOString() };
const ins = I.insights(rows, active, () => null, id => id === 'fractions' ? 'Fractions' : '');
eq(ins.find(x => x.kind === 'chapter').message, '1 pupil struggled with Fractions.');
eq(ins.find(x => x.kind === 'chapter').pupils.join(','), 'Ben');
eq(ins.find(x => x.kind === 'not-submitted').message, '2 pupils have not submitted.');
eq(ins.find(x => x.kind === 'rushed').message, '1 pupil completed very quickly with low accuracy.');
ok(!I.insights(rows, { ...active, status: 'closed' }, () => null).some(x => x.kind === 'not-submitted'), 'no reminder for closed work');
ok(!I.insights([done('Solo', 'k9', 1, 2, 5, [ans('fractions', false, 1), ans('fractions', false, 2)])], active).length, 'one pupil with two answers yields no insight at all');
eq(I.chapterOf('g5m-fractions-012'), 'fractions'); eq(I.chapterOf('bad'), null); eq(I.chapterOf('q1', () => 'looked-up'), 'looked-up');
const roll = I.pupilRollup([{ assignment: active, rows }, { assignment: active, rows: [done('Ben', 'p2', 1, 10, 100)] }]);
ok(roll.get('p2').needsHelp && /correct over 20 questions/.test(roll.get('p2').reason), 'Ben is flagged across two pieces of work');
ok(!roll.get('p1').needsHelp, 'Aisha is not flagged');
eq(roll.get('p4').completed, 0); eq(roll.get('p4').notStarted, 1);
eq(I.fmtDuration(45), '45s'); eq(I.fmtDuration(600), '10 min'); eq(I.fmtDuration(0), '-');
ok(/^Due /.test(I.dueLabel(new Date(Date.now() + 5 * 86400000).toISOString())), 'due label for next week');
eq(I.dueLabel(new Date(Date.now() + 3600000).toISOString()), 'Due today');
ok(/^Closed /.test(I.dueLabel(new Date(Date.now() - 86400000).toISOString())), 'closed label');

// ── 3. TeacherMode in a VM ──────────────────────────────────────────────────
function dom() {
  const nodes = new Map();
  const mk = (id = '') => {
    const n = { id, value: '', innerHTML: '', textContent: '', disabled: false, hidden: false, checked: false, dataset: {}, style: {}, children: [], _cls: new Set(),
      classList: { add: (...c) => c.forEach(x => n._cls.add(x)), remove: (...c) => c.forEach(x => n._cls.delete(x)), toggle: (c, on) => { (on === undefined ? !n._cls.has(c) : on) ? n._cls.add(c) : n._cls.delete(c); }, contains: c => n._cls.has(c) },
      querySelectorAll: () => [], querySelector: () => null, insertAdjacentHTML() {}, setAttribute(k, v) { n['attr_' + k] = v; }, getAttribute(k) { return n['attr_' + k]; },
      replaceChildren() { n.innerHTML = ''; n.children = []; }, append(c) { n.children.push(c); }, appendChild(c) { n.children.push(c); }, remove() {}, focus() {}, select() {}, click() {}, addEventListener() {}, removeEventListener() {}, scrollIntoView() {}, dispatchEvent() {} };
    return n;
  };
  const get = id => { if (!nodes.has(id)) nodes.set(id, mk(id)); return nodes.get(id); };
  const store = new Map();
  return { nodes, get, mk, store,
    document: { getElementById: get, createElement: () => mk(), querySelectorAll: () => [], querySelector: () => null, addEventListener() {}, removeEventListener() {}, body: mk('body'), activeElement: null },
    localStorage: { getItem: k => store.has(k) ? store.get(k) : null, setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k) } };
}
const packs = [{ id: 'grade5-maths', grade: 5, name: 'Mathematics', icon: '🔢', chapters: [{ id: 'fractions', name: 'Fractions' }] }, { id: 'grade5-english', grade: 5, name: 'English', chapters: [{ id: 'nouns', name: 'Nouns' }] }];
packs.forEach(p => { p._chapters = p.chapters; });
function teacherContext({ isTeacher = true, rpc, sessionUser = 'teacher-1' } = {}) {
  const d = dom();
  const calls = [];
  const toasts = [];
  const ctx = vm.createContext({
    ...d, window: {}, console, Date, Math, Map, Set, Number, String, Array, Object, JSON, Promise, RegExp, CSS: { escape: s => s }, navigator: { clipboard: { writeText: async () => {} } }, location: { origin: 'https://example.test' },
    setTimeout: (fn) => { fn(); return 1; }, clearTimeout() {}, confirm: () => true, prompt: () => null,
    SUBJECT_PACKS: packs, ACTIVE_PACK: packs[0], CHAPTERS: [], ACTIVE_STUDENT_ID: null,
    STATIC_QUESTIONS: Array.from({ length: 12 }, (_, i) => ({ id: 'g5m-fractions-' + (100 + i), chapterId: 'fractions', difficulty: 1 + (i % 4) })),
    Auth: { isTeacher: () => isTeacher, getParentProfile: () => ({ id: 'teacher-1', full_name: 'Mrs Devi' }) },
    toast: m => toasts.push(m), showScreen: id => calls.push(['showScreen', id]),
    TeacherWorkspace: { refresh: () => Promise.resolve(true), rememberPin() {}, ensureLoaded: async () => [], openResults: id => calls.push(['openResults', id]), showResults() {}, showList() {} },
    TeacherGuestClasses: { refresh: () => Promise.resolve(), accessChanged() {}, getClasses: () => [{ id: 'c1', name: 'Grade 5 Blue', active: true, pupils: 3 }, { id: 'c2', name: 'Empty room', active: true, pupils: 0 }] },
    TeacherHome: { render: () => calls.push(['home']), invalidate() {} }, TeacherMaterials: { load() {} }, QuestionLoader: { loadSubject: async () => [] },
    Store: { loadParentReports: async () => [] }, _attr: s => s,
    _sb: { auth: { onAuthStateChange() {}, getSession: async () => ({ data: { session: { user: { id: sessionUser } } } }) }, rpc: async (name, args) => { calls.push([name, args]); return rpc(name, args); } },
  });
  vm.runInContext(fs.readFileSync('engine/teacher.js', 'utf8') + '\nthis.T = TeacherMode;', ctx);
  return { ctx, T: ctx.T, calls, toasts, d };
}

{ // a child / non-teacher is bounced
  const { T, calls, toasts } = teacherContext({ isTeacher: false });
  T.render();
  ok(calls.some(c => c[0] === 'showScreen' && c[1] === 'landing'), 'non-teacher is sent away from the teacher screen');
  ok(toasts.some(t => /administrator/.test(t)), 'with an explanation');
  ok(!calls.some(c => c[0] === 'home'), 'and nothing teacher-facing renders');
}
{ // location persists and restores; More menu items switch tabs
  const { T, d, calls } = teacherContext({ rpc: async () => ({ data: { ok: true } }) });
  T.render();
  let loc = JSON.parse(d.localStorage.getItem('psac_teacher_loc_v1'));
  eq(loc.tab, 'home', 'first render lands on Home'); eq(loc.owner, 'teacher-1', 'location is owner-scoped');
  T.switchTab('gradebook');
  loc = JSON.parse(d.localStorage.getItem('psac_teacher_loc_v1')); eq(loc.tab, 'gradebook', 'a More tool is remembered');
  T.rememberClassroom('c1', 'Grade 5 Blue', 'pupils');
  loc = JSON.parse(d.localStorage.getItem('psac_teacher_loc_v1')); eq(loc.classId, 'c1'); eq(loc.section, 'pupils');
  T.rememberClassroom(null); eq(JSON.parse(d.localStorage.getItem('psac_teacher_loc_v1')).classId, null, 'closing a classroom forgets it');
  d.localStorage.setItem('psac_teacher_loc_v1', JSON.stringify({ owner: 'someone-else', tab: 'results' }));
  eq(T.getLocation().tab, undefined, 'another teacher’s location is ignored');
  d.localStorage.setItem('psac_teacher_loc_v1', JSON.stringify({ owner: 'teacher-1', tab: 'nonsense' }));
  T.render();
  eq(JSON.parse(d.localStorage.getItem('psac_teacher_loc_v1')).tab, 'home', 'an unknown tab falls back to Home');
  ok(calls.filter(c => c[0] === 'home').length >= 2, 'Home rendered on each restore');
}
async function publishPaths() { // buildAssignment: classroom PIN, due date, chosen pupils, PGRST202 fallback, repeat clicks
  let mode = 'new';
  const { T, d, calls, toasts } = teacherContext({ rpc: async (name, args) => {
    if (name === 'teacher_guest_manage' && args.p_action === 'roster') return { data: { ok: true, pupils: [{ id: 'p1', name: 'A', active: true }, { id: 'p2', name: 'B', active: true }] } };
    if (name === 'teacher_guest_create_assignment') {
      if (mode === 'old' && ('p_due_at' in args || 'p_pupil_ids' in args)) return { error: { code: 'PGRST202', message: 'Could not find the function public.teacher_guest_create_assignment(p_access, p_chapter_ids, p_classroom, p_due_at, p_duration_mins, p_pupil_ids, p_question_ids, p_subject_pack_id, p_title) in the schema cache' } };
      if (mode === 'slow') await new Promise(r => setImmediate(r));
      return { data: { ok: true, id: 'srv-1', code: 'CODE1', assignments_left_today: 2 } };
    }
    return { data: { ok: true } };
  } });
  T.render();
  d.get('ta-classroom').value = 'c1'; d.get('ta-access').value = 'classroom_pin'; d.get('ta-count').value = '10'; d.get('ta-subject').value = 'grade5-maths'; d.get('ta-grade').value = '5';
  const due = new Date(); due.setDate(due.getDate() + 3); d.get('ta-due').value = `${due.getFullYear()}-${String(due.getMonth() + 1).padStart(2, '0')}-${String(due.getDate()).padStart(2, '0')}`;
  {
    const cfg = await T.buildAssignment();
    ok(cfg && cfg.code === 'CODE1', 'assignment created');
    const call = calls.filter(c => c[0] === 'teacher_guest_create_assignment').pop()[1];
    eq(call.p_access, 'classroom_pin'); eq(call.p_classroom, 'c1'); eq(call.p_question_ids.length, 10);
    ok(typeof call.p_due_at === 'string' && call.p_due_at.endsWith('Z'), 'due date sent as ISO');
    ok(!('p_pupil_ids' in call), 'whole class → no pupil subset sent');
    ok(/homework/.test(cfg.label) && /Mathematics|Fractions/.test(cfg.label), 'a name was generated: ' + cfg.label);
    eq(cfg.classroomName, '', 'classroom name comes from the chip (not rendered in this VM)');
    eq(cfg.warning, '', 'no warning on a current database');
    eq(cfg.dueAt !== null, true, 'due date recorded on the success config');

    d.get('ta-classroom').value = ''; d.get('ta-access').value = 'nickname';
    const open = await T.buildAssignment();
    const c2 = calls.filter(c => c[0] === 'teacher_guest_create_assignment').pop()[1];
    eq(c2.p_access, 'nickname'); eq(c2.p_classroom, null); ok(open.access === 'nickname', 'open link assignment');

    mode = 'old'; d.get('ta-classroom').value = 'c1'; d.get('ta-access').value = 'classroom_pin';
    const legacy = await T.buildAssignment();
    ok(legacy && legacy.code === 'CODE1', 'falls back to the seven-argument call on an old database');
    ok(/closes 48 hours/.test(legacy.warning) && /migration/.test(legacy.warning), 'and warns the teacher plainly: ' + legacy.warning);
    eq(legacy.dueAt, null, 'no due date claimed when it could not be applied');
    const attempts = calls.filter(c => c[0] === 'teacher_guest_create_assignment');
    ok('p_due_at' in attempts[attempts.length - 2][1] && !('p_due_at' in attempts[attempts.length - 1][1]), 'second attempt drops the new parameters');

    mode = 'slow'; const before = calls.filter(c => c[0] === 'teacher_guest_create_assignment').length;
    await Promise.all([T.buildAssignment(), T.buildAssignment(), T.buildAssignment()]);
    eq(calls.filter(c => c[0] === 'teacher_guest_create_assignment').length - before, 1, 'three rapid clicks create one assignment');

    d.get('ta-due').value = '2001-01-01';
    const past = await T.buildAssignment();
    ok(!past && toasts.some(t => /today or later/.test(t)), 'a past due date is refused with a message');
  }
}

// ── 4. TeacherWorkspace states ──────────────────────────────────────────────
async function workspaceStates() {
  const d = dom();
  let fail = false;
  const ctx = vm.createContext({ ...d, window: {}, console, Date, Math, Map, Set, Number, String, Array, Object, JSON, Promise, navigator: {}, location: { origin: 'https://example.test' },
    Auth: { isTeacher: () => true }, toast() {}, setTimeout: fn => { fn(); return 1; },
    _sb: { auth: { onAuthStateChange() {}, getSession: async () => ({ data: { session: { user: { id: 't' } } } }) }, rpc: async (name) => {
      if (fail) return { error: new Error('offline') };
      if (name === 'guest_my_assignments') return { data: { ok: true, assignments: [{ id: 'a1', title: 'Homework', status: 'active', question_count: 5, submissions: 0, expires_at: new Date(Date.now() + 86400000).toISOString() }] } };
      if (name === 'teacher_guest_assignment_modes') return { data: { ok: true, modes: [{ id: 'a1', mode: 'nickname' }] } };
      if (name === 'teacher_guest_results') return { data: { ok: true, submissions: [] } };
      return { data: { ok: true, per_day: 3, left_today: 3, max_students: 15 } };
    } } });
  vm.runInContext(fs.readFileSync('engine/teacher_insights.js', 'utf8') + fs.readFileSync('engine/teacher_workspace.js', 'utf8') + '\nthis.W = TeacherWorkspace;', ctx);
  const W = ctx.W;
  const p = W.refresh();
  ok(/Loading/.test(d.get('ta-asgn-list').children[0]?.textContent || ''), 'loading state is readable');
  ok(await p, 'refresh resolves true on success');
  await W.results('a1');
  ok(/No pupil has opened/.test(d.get('ta-results-list').innerHTML), 'empty results state explains itself');
  const picker = d.get('ta-results-picker');
  ok(picker.innerHTML === '' , 'picker hidden while an assignment is selected');
  fail = true;
  ok(!(await W.refresh()), 'refresh resolves false on failure');
  eq(W.getAssignments().length, 1, 'a failed refresh keeps the already-loaded list');
  await W.results('a1', 'ta-results-list', false, { force: true });
  const errNode = d.get('ta-results-list').children[0];
  ok(/Could not load results/.test(errNode?.textContent || '') && d.get('ta-results-list').children[1]?.textContent === 'Try again', 'failed results show a message and a Try again button');
  eq(W.completion({ id: 'x', access_mode: 'nickname', submissions: 4 }).total, null, 'open link has no roster total');
  eq(W.completion({ id: 'x', access_mode: 'classroom_pin', submissions: 4 }).done, 4);
}

(async () => {
  await publishPaths();
  await workspaceStates();
  console.log(`Teacher command centre: ${checks} checks passed (navigation, progressive form, insight thresholds, location restore, publish paths, states).`);
})().catch(e => { console.error(e); process.exitCode = 1; });
