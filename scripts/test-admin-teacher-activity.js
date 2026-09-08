'use strict';
// Admin › Teachers activity summary.
//
// summarise() is exercised with fixture rows so every bucket a teacher can land
// in is asserted, not eyeballed: never signed in, signed in but set nothing,
// active in the window, dormant. Also asserts the client wiring and the route,
// because the function is useless if admin.js never calls it.
//
// Run: node scripts/test-admin-teacher-activity.js
const fs     = require('node:fs');
const assert = require('node:assert/strict');
const { summarise, WINDOW_DAYS } = require('../netlify/lib/teacher-activity');

const DAY = 86400000;
const NOW = Date.parse('2026-09-06T12:00:00Z');
const ago = d => new Date(NOW - d * DAY).toISOString();

const T_ACTIVE = '11111111-1111-4111-8111-111111111111';
const T_DORMANT = '22222222-2222-4222-8222-222222222222';
const T_SIGNED = '33333333-3333-4333-8333-333333333333';
const T_NEVER = '44444444-4444-4444-8444-444444444444';

const rows = {
  classrooms: [
    { id: 'c1', teacher_id: T_ACTIVE, name: 'Std 5 Blue', subject: 'Maths', grade_level: 5, is_active: true, created_at: ago(80) },
    { id: 'c2', teacher_id: T_DORMANT, name: 'Old class', subject: null, grade_level: 4, is_active: false, created_at: ago(200) },
  ],
  enrollments: [
    { classroom_id: 'c1', student_id: 's1', is_active: true }, { classroom_id: 'c1', student_id: 's2', is_active: true },
    { classroom_id: 'c1', student_id: 's2', is_active: true },           // duplicate row, counted once
    { classroom_id: 'c1', student_id: 's3', is_active: false },          // left the class
    { classroom_id: 'c2', student_id: 's9', is_active: true },
  ],
  classAssignments: [
    { classroom_id: 'c1', student_id: 's1', created_at: ago(3) }, { classroom_id: 'c1', student_id: 's2', created_at: ago(3) },
    { classroom_id: 'c2', student_id: 's9', created_at: ago(150) },
  ],
  classSubmissions: [{ classroom_id: 'c1', submitted_at: ago(2) }, { classroom_id: 'c2', submitted_at: ago(140) }],
  guestClasses: [{ id: 'g1', teacher_id: T_ACTIVE, name: 'Saturday group', active: true, deleted_at: null, created_at: ago(40) }],
  guestPupils: [{ classroom_id: 'g1', active: true }, { classroom_id: 'g1', active: true }, { classroom_id: 'g1', active: false }],
  guestAssignments: [
    { id: 'a1', teacher_id: T_ACTIVE, title: 'Fractions quiz', status: 'active', classroom_label: 'Saturday group', created_at: ago(1), deleted_at: null },
    { id: 'a2', teacher_id: T_ACTIVE, title: 'Old quiz', status: 'archived', classroom_label: null, created_at: ago(45), deleted_at: null },
  ],
  guestSubmissions: [
    { assignment_id: 'a1', started_at: ago(1), submitted_at: ago(1) },
    { assignment_id: 'a1', started_at: ago(1), submitted_at: null },     // started, never finished
    { assignment_id: 'a2', started_at: ago(44), submitted_at: ago(44) },
  ],
  posts: [{ teacher_id: T_ACTIVE, classroom_id: 'c1', created_at: ago(10) }],
  homework: [],
  materials: [{ teacher_id: T_DORMANT, created_at: ago(190) }],
  logins: [
    { user_id: T_ACTIVE, created_at: ago(0) }, { user_id: T_ACTIVE, created_at: ago(5) }, { user_id: T_ACTIVE, created_at: ago(70) },
    { user_id: T_SIGNED, created_at: ago(12) },
  ],
  partial: [],
};
const auth = {
  [T_ACTIVE]: { email: 'a@example.com', last_sign_in_at: ago(0) },
  [T_DORMANT]: { email: 'd@example.com', last_sign_in_at: ago(120) },
  [T_SIGNED]: { email: 's@example.com', last_sign_in_at: ago(12) },
  [T_NEVER]: { email: 'n@example.com', last_sign_in_at: null },
};

const out = summarise([T_ACTIVE, T_DORMANT, T_SIGNED, T_NEVER], rows, auth, NOW);

// Active teacher: every count reflects what they actually did.
const a = out[T_ACTIVE];
assert.equal(a.status, 'active');
assert.equal(a.email, 'a@example.com');
assert.equal(a.classrooms.length, 1);
assert.equal(a.pupils, 2, 'distinct ACTIVE enrolments only');
assert.equal(a.guest_classes.length, 1);
assert.equal(a.guest_pupils, 2, 'inactive guest pupils are not counted');
assert.deepEqual(a.assignments, { total: 4, recent: 3, classroom: 2, guest: 2 });
assert.deepEqual(a.results, { total: 3, recent: 2 }, 'a started-but-unsubmitted guest attempt is not a result');
assert.deepEqual(a.content, { posts: 1, homework: 0, materials: 0 });
assert.deepEqual(a.sign_ins, { total: 3, recent: 2 });
assert.equal(a.last_activity_what, 'set a guest assignment');
assert.equal(a.last_activity_at, ago(1));
assert.equal(a.last_result_at, ago(1));
assert.equal(a.classrooms[0].pupils, 2);
assert.equal(a.classrooms[0].assignments, 2);
assert.equal(a.classrooms[0].submissions, 1);
assert.equal(a.recent_guest_assignments[0].title, 'Fractions quiz', 'newest first');
assert.equal(a.recent_guest_assignments[0].started, 2);
assert.equal(a.recent_guest_assignments[0].submitted, 1);

// Dormant: has a footprint, nothing inside the window.
const d = out[T_DORMANT];
assert.equal(d.status, 'dormant');
assert.equal(d.assignments.total, 1);
assert.equal(d.assignments.recent, 0);
assert.equal(d.results.total, 1);
assert.equal(d.content.materials, 1);
assert.equal(d.classrooms[0].active, false);
assert.equal(d.last_activity_at, ago(150));

// Signed in, never set anything.
const s = out[T_SIGNED];
assert.equal(s.status, 'signed_in_only');
assert.equal(s.last_sign_in_at, ago(12));
assert.equal(s.last_activity_at, null);
assert.equal(s.assignments.total, 0);

// Never signed in at all.
const n = out[T_NEVER];
assert.equal(n.status, 'never_signed_in');
assert.equal(n.last_sign_in_at, null);
assert.deepEqual(n.sign_ins, { total: 0, recent: 0 });

// A teacher with NO auth row (profile outlived auth.users) and no rows at all
// must not throw and must read as never signed in.
const ghost = summarise(['55555555-5555-4555-8555-555555555555'], {}, {}, NOW);
assert.equal(ghost['55555555-5555-4555-8555-555555555555'].status, 'never_signed_in');

// The window is the one the client prints beside its counts.
assert.equal(WINDOW_DAYS, 30);

// Wiring: the function is routed, admin-gated, and the tab actually calls it.
const toml  = fs.readFileSync('netlify.toml', 'utf8');
const fn    = fs.readFileSync('netlify/functions/admin-teacher-activity.js', 'utf8');
const admin = fs.readFileSync('engine/admin.js', 'utf8');
const html  = fs.readFileSync('index.html', 'utf8');
assert.match(toml, /from\s+=\s+"\/api\/admin-teacher-activity"[\s\S]*?to\s+=\s+"\/\.netlify\/functions\/admin-teacher-activity"/);
assert.match(fn, /requireAdmin\(event\)/, 'must go through the shared admin gate');
assert.match(fn, /slice\(0, MAX_IDS\)/, 'ids are capped');
assert.doesNotMatch(fn, /\.from\('profiles'\)\.select\([^)]*\)\s*\.eq\('role'/, 'not a directory endpoint');
assert.match(admin, /_adminApi\('\/api\/admin-teacher-activity', \{ user_ids: missing \}\)/);
assert.match(admin, /_loadTeacherActivity\(rows\.map\(t => t\.id\)\)/, 'every loaded page is annotated');
assert.match(admin, /\$\{_teacherActivityHtml\(t\.id\)\}/, 'the card renders the summary');
assert.match(admin, /sortTeachers, refreshTeacherActivity/, 'exported for the tab controls');
assert.match(admin, /_TACT = \{[\s\S]*never_signed_in/, 'all four buckets have a label');
assert.match(html, /id="admin-teachers-sort"/);
assert.match(html, /id="admin-teachers-activity"/);
assert.match(html, /AdminPanel\.refreshTeacherActivity\(\);AdminPanel\.loadTeachers\(\)/);

console.log('Admin teacher activity: four status buckets, distinct-pupil and submitted-only counts, missing-auth safety, route, admin gate and tab wiring passed.');
