'use strict';
// Per-teacher activity summary for the admin Teachers tab.
//
// "Is this teacher using the system at all?" is not answerable from
// public.profiles - it holds a name, a status and a tier, nothing a teacher
// DOES. What they do is spread over ten tables (classrooms, enrolments, posts,
// homework, materials, classroom assignments and their submissions, guest
// classes, guest pupils, guest assignments and their submissions) plus
// login_events and auth.users.last_sign_in_at, most of which an admin cannot
// read from the browser under RLS. This module is the one place that knows
// how to fold all of that into a summary a person can read in a glance.
//
// fetchRows() does the reads (service role - so it must only ever be reached
// through requireAdmin). summarise() is pure and is what the test exercises.

const DAY = 86400000;
const WINDOW_DAYS = 30;

const _t = v => { const n = v ? Date.parse(v) : NaN; return Number.isFinite(n) ? n : null; };
const _max = (a, b) => (a == null ? b : b == null ? a : Math.max(a, b));
const _iso = ms => (ms == null ? null : new Date(ms).toISOString());

// One query per table, all in parallel; a table that cannot be read (missing
// on an older database, or a transient error) answers [] and is NAMED in
// `partial`, so the summary says "materials: unknown" rather than "0". Zero
// and unknown are different answers and the whole point of this screen is
// telling them apart.
async function fetchRows(sb, ids) {
  const partial = [];
  const q = async (name, build) => {
    try {
      const { data, error } = await build();
      if (error) { partial.push(name); return []; }
      return data || [];
    } catch (_) { partial.push(name); return []; }
  };

  const [classrooms, guestClasses, guestAssignments, posts, homework, materials, logins] = await Promise.all([
    q('classrooms', () => sb.from('classrooms').select('id, teacher_id, name, subject, grade_level, is_active, created_at').in('teacher_id', ids).limit(2000)),
    q('guest_classes', () => sb.from('teacher_guest_classes').select('id, teacher_id, name, active, deleted_at, created_at, expected_students').in('teacher_id', ids).limit(2000)),
    q('guest_assignments', () => sb.from('guest_assignments').select('id, teacher_id, title, status, classroom_label, created_at, deleted_at, due_at').in('teacher_id', ids).limit(5000)),
    q('posts', () => sb.from('classroom_posts').select('teacher_id, classroom_id, created_at').in('teacher_id', ids).limit(5000)),
    q('homework', () => sb.from('physical_homework').select('teacher_id, classroom_id, created_at').in('teacher_id', ids).limit(5000)),
    q('materials', () => sb.from('learning_materials').select('teacher_id, created_at').in('teacher_id', ids).limit(5000)),
    q('logins', () => sb.from('login_events').select('user_id, created_at').in('user_id', ids).order('created_at', { ascending: false }).limit(5000)),
  ]);

  const classroomIds = classrooms.map(c => c.id);
  const guestClassIds = guestClasses.map(c => c.id);
  const guestAssignmentIds = guestAssignments.map(a => a.id);

  const [enrollments, classAssignments, classSubmissions, guestPupils, guestSubmissions] = await Promise.all([
    classroomIds.length ? q('enrollments', () => sb.from('enrollments').select('classroom_id, student_id, is_active, joined_at').in('classroom_id', classroomIds).limit(10000)) : [],
    classroomIds.length ? q('class_assignments', () => sb.from('student_assignments').select('classroom_id, student_id, created_at, completed_at').in('classroom_id', classroomIds).limit(10000)) : [],
    classroomIds.length ? q('class_submissions', () => sb.from('assignment_submissions').select('classroom_id, submitted_at').in('classroom_id', classroomIds).limit(10000)) : [],
    guestClassIds.length ? q('guest_pupils', () => sb.from('teacher_guest_pupils').select('classroom_id, active, created_at').in('classroom_id', guestClassIds).limit(10000)) : [],
    guestAssignmentIds.length ? q('guest_submissions', () => sb.from('guest_submissions').select('assignment_id, started_at, submitted_at').in('assignment_id', guestAssignmentIds).limit(20000)) : [],
  ]);

  return { classrooms, guestClasses, guestAssignments, posts, homework, materials, logins,
           enrollments, classAssignments, classSubmissions, guestPupils, guestSubmissions, partial };
}

// rows: the shape fetchRows() returns. auth: { [id]: { email, last_sign_in_at } }
// (null entries allowed). now: ms, injectable for the test.
function summarise(ids, rows, auth, now) {
  now = now || Date.now();
  const since = now - WINDOW_DAYS * DAY;
  const recent = t => t != null && t >= since;
  const R = rows || {};
  const A = auth || {};
  const by = (list, key) => {
    const m = new Map();
    (list || []).forEach(r => { const k = r[key]; if (!m.has(k)) m.set(k, []); m.get(k).push(r); });
    return m;
  };
  const classroomsBy = by(R.classrooms, 'teacher_id');
  const guestClassesBy = by(R.guestClasses, 'teacher_id');
  const guestAssignmentsBy = by(R.guestAssignments, 'teacher_id');
  const postsBy = by(R.posts, 'teacher_id');
  const homeworkBy = by(R.homework, 'teacher_id');
  const materialsBy = by(R.materials, 'teacher_id');
  const loginsBy = by(R.logins, 'user_id');
  const enrollmentsByClass = by(R.enrollments, 'classroom_id');
  const classAssignmentsByClass = by(R.classAssignments, 'classroom_id');
  const classSubmissionsByClass = by(R.classSubmissions, 'classroom_id');
  const guestPupilsByClass = by(R.guestPupils, 'classroom_id');
  const guestSubmissionsByAssignment = by(R.guestSubmissions, 'assignment_id');

  const out = {};
  for (const id of ids) {
    let lastAuthored = null;   // the teacher DID something
    let lastResult = null;     // a pupil handed something in
    let lastWhat = null;
    const touch = (t, what) => { if (t != null && (lastAuthored == null || t > lastAuthored)) { lastAuthored = t; lastWhat = what; } };

    const classrooms = (classroomsBy.get(id) || []).map(c => {
      const enr = enrollmentsByClass.get(c.id) || [];
      const asg = classAssignmentsByClass.get(c.id) || [];
      const sub = classSubmissionsByClass.get(c.id) || [];
      const pupils = new Set(enr.filter(e => e.is_active !== false).map(e => e.student_id)).size;
      let last = _t(c.created_at);
      asg.forEach(a => { last = _max(last, _t(a.created_at)); });
      touch(_t(c.created_at), 'created a class');
      asg.forEach(a => touch(_t(a.created_at), 'set class work'));
      sub.forEach(s => { lastResult = _max(lastResult, _t(s.submitted_at)); });
      return { id: c.id, name: c.name, subject: c.subject || null, grade: c.grade_level ?? null, active: c.is_active !== false,
               pupils, assignments: asg.length, assignmentsRecent: asg.filter(a => recent(_t(a.created_at))).length,
               submissions: sub.length, created_at: c.created_at, last_activity_at: _iso(last) };
    });

    const guestClasses = (guestClassesBy.get(id) || []).map(c => {
      const pupils = (guestPupilsByClass.get(c.id) || []).filter(p => p.active !== false).length;
      touch(_t(c.created_at), 'created a guest class');
      return { id: c.id, name: c.name, active: !!c.active && !c.deleted_at, pupils, created_at: c.created_at };
    });

    const guestAssignments = (guestAssignmentsBy.get(id) || []).map(a => {
      const subs = guestSubmissionsByAssignment.get(a.id) || [];
      const submitted = subs.filter(s => s.submitted_at);
      submitted.forEach(s => { lastResult = _max(lastResult, _t(s.submitted_at)); });
      touch(_t(a.created_at), 'set a guest assignment');
      return { id: a.id, title: a.title, classroom: a.classroom_label || null, status: a.deleted_at ? 'deleted' : (a.status || 'active'),
               created_at: a.created_at, started: subs.length, submitted: submitted.length,
               submittedRecent: submitted.filter(s => recent(_t(s.submitted_at))).length };
    });

    const posts = postsBy.get(id) || [];
    const homework = homeworkBy.get(id) || [];
    const materials = materialsBy.get(id) || [];
    posts.forEach(p => touch(_t(p.created_at), 'posted to a class'));
    homework.forEach(h => touch(_t(h.created_at), 'set homework'));
    materials.forEach(m => touch(_t(m.created_at), 'uploaded material'));

    const logins = loginsBy.get(id) || [];
    const loginTimes = logins.map(l => _t(l.created_at)).filter(t => t != null);
    const authRow = A[id] || null;
    const lastSignIn = _max(_t(authRow && authRow.last_sign_in_at), loginTimes.length ? Math.max(...loginTimes) : null);

    const classAssignmentsTotal = classrooms.reduce((n, c) => n + c.assignments, 0);
    const classAssignmentsRecent = classrooms.reduce((n, c) => n + c.assignmentsRecent, 0);
    const classSubmissionsTotal = classrooms.reduce((n, c) => n + c.submissions, 0);
    const classSubmissionsRecent = classrooms.reduce((n, c) => n + (classSubmissionsByClass.get(c.id) || []).filter(s => recent(_t(s.submitted_at))).length, 0);
    const guestSubmissionsTotal = guestAssignments.reduce((n, a) => n + a.submitted, 0);
    const guestSubmissionsRecent = guestAssignments.reduce((n, a) => n + a.submittedRecent, 0);
    const authored = classrooms.length + guestClasses.length + guestAssignments.length + posts.length + homework.length + materials.length + classAssignmentsTotal;

    let status;
    if (lastSignIn == null && !authored) status = 'never_signed_in';
    else if (!authored) status = 'signed_in_only';
    else if (recent(lastAuthored) || recent(lastResult)) status = 'active';
    else status = 'dormant';

    out[id] = {
      email: (authRow && authRow.email) || null,
      status,
      last_sign_in_at: _iso(lastSignIn),
      sign_ins: { total: loginTimes.length, recent: loginTimes.filter(recent).length },
      last_activity_at: _iso(lastAuthored),
      last_activity_what: lastWhat,
      last_result_at: _iso(lastResult),
      classrooms: classrooms.sort((a, b) => (_t(b.last_activity_at) || 0) - (_t(a.last_activity_at) || 0)),
      pupils: classrooms.reduce((n, c) => n + c.pupils, 0),
      guest_classes: guestClasses.sort((a, b) => (_t(b.created_at) || 0) - (_t(a.created_at) || 0)),
      guest_pupils: guestClasses.reduce((n, c) => n + c.pupils, 0),
      assignments: {
        total: classAssignmentsTotal + guestAssignments.length,
        recent: classAssignmentsRecent + guestAssignments.filter(a => recent(_t(a.created_at))).length,
        classroom: classAssignmentsTotal,
        guest: guestAssignments.length,
      },
      results: {
        total: classSubmissionsTotal + guestSubmissionsTotal,
        recent: classSubmissionsRecent + guestSubmissionsRecent,
      },
      content: { posts: posts.length, homework: homework.length, materials: materials.length },
      recent_guest_assignments: guestAssignments
        .sort((a, b) => (_t(b.created_at) || 0) - (_t(a.created_at) || 0))
        .slice(0, 6)
        .map(a => ({ title: a.title, classroom: a.classroom, status: a.status, created_at: a.created_at, started: a.started, submitted: a.submitted })),
    };
  }
  return out;
}

module.exports = { fetchRows, summarise, WINDOW_DAYS };
