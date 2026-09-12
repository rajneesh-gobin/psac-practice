// Per-teacher activity summary — ported from netlify/lib/teacher-activity.js

const DAY = 86400000;
export const WINDOW_DAYS = 30;

const _t = v => { const n = v ? Date.parse(v) : NaN; return Number.isFinite(n) ? n : null; };
const _max = (a, b) => (a == null ? b : b == null ? a : Math.max(a, b));
const _iso = ms => (ms == null ? null : new Date(ms).toISOString());

// sb here is an object with a .from(table) chain-style helper. Since Workers use raw fetch,
// callers pass a sbFetch helper instead. See admin-teacher-activity.js for usage.
export async function fetchRows(sbFetch, ids) {
  const partial = [];
  const q = async (name, path) => {
    try {
      const res = await sbFetch(path);
      if (!res.ok) { partial.push(name); return []; }
      return await res.json() || [];
    } catch (_) { partial.push(name); return []; }
  };

  const inIds = ids.map(encodeURIComponent).join(',');

  const [classrooms, guestClasses, guestAssignments, posts, homework, materials, logins] = await Promise.all([
    q('classrooms', `/rest/v1/classrooms?teacher_id=in.(${inIds})&select=id,teacher_id,name,subject,grade_level,is_active,created_at&limit=2000`),
    q('guest_classes', `/rest/v1/teacher_guest_classes?teacher_id=in.(${inIds})&select=id,teacher_id,name,active,deleted_at,created_at,expected_students&limit=2000`),
    q('guest_assignments', `/rest/v1/guest_assignments?teacher_id=in.(${inIds})&select=id,teacher_id,title,status,classroom_label,created_at,deleted_at,due_at&limit=5000`),
    q('posts', `/rest/v1/classroom_posts?teacher_id=in.(${inIds})&select=teacher_id,classroom_id,created_at&limit=5000`),
    q('homework', `/rest/v1/physical_homework?teacher_id=in.(${inIds})&select=teacher_id,classroom_id,created_at&limit=5000`),
    q('materials', `/rest/v1/learning_materials?teacher_id=in.(${inIds})&select=teacher_id,created_at&limit=5000`),
    q('logins', `/rest/v1/login_events?user_id=in.(${inIds})&select=user_id,created_at&order=created_at.desc&limit=5000`),
  ]);

  const classroomIds = classrooms.map(c => c.id);
  const guestClassIds = guestClasses.map(c => c.id);
  const guestAssignmentIds = guestAssignments.map(a => a.id);

  const inClassIds = classroomIds.map(encodeURIComponent).join(',');
  const inGuestClassIds = guestClassIds.map(encodeURIComponent).join(',');
  const inGuestAssignmentIds = guestAssignmentIds.map(encodeURIComponent).join(',');

  const [enrollments, classAssignments, classSubmissions, guestPupils, guestSubmissions] = await Promise.all([
    classroomIds.length ? q('enrollments', `/rest/v1/enrollments?classroom_id=in.(${inClassIds})&select=classroom_id,student_id,is_active,joined_at&limit=10000`) : Promise.resolve([]),
    classroomIds.length ? q('class_assignments', `/rest/v1/student_assignments?classroom_id=in.(${inClassIds})&select=classroom_id,student_id,created_at,completed_at&limit=10000`) : Promise.resolve([]),
    classroomIds.length ? q('class_submissions', `/rest/v1/assignment_submissions?classroom_id=in.(${inClassIds})&select=classroom_id,submitted_at&limit=10000`) : Promise.resolve([]),
    guestClassIds.length ? q('guest_pupils', `/rest/v1/teacher_guest_pupils?classroom_id=in.(${inGuestClassIds})&select=classroom_id,active,created_at&limit=10000`) : Promise.resolve([]),
    guestAssignmentIds.length ? q('guest_submissions', `/rest/v1/guest_submissions?assignment_id=in.(${inGuestAssignmentIds})&select=assignment_id,started_at,submitted_at&limit=20000`) : Promise.resolve([]),
  ]);

  return { classrooms, guestClasses, guestAssignments, posts, homework, materials, logins,
           enrollments, classAssignments, classSubmissions, guestPupils, guestSubmissions, partial };
}

export function summarise(ids, rows, auth, now) {
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
    let lastAuthored = null, lastResult = null, lastWhat = null;
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
      return { id: a.id, title: a.title, classroom: a.classroom_label || null,
               status: a.deleted_at ? 'deleted' : (a.status || 'active'),
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
      results: { total: classSubmissionsTotal + guestSubmissionsTotal, recent: classSubmissionsRecent + guestSubmissionsRecent },
      content: { posts: posts.length, homework: homework.length, materials: materials.length },
      recent_guest_assignments: guestAssignments
        .sort((a, b) => (_t(b.created_at) || 0) - (_t(a.created_at) || 0))
        .slice(0, 6)
        .map(a => ({ title: a.title, classroom: a.classroom, status: a.status, created_at: a.created_at, started: a.started, submitted: a.submitted })),
    };
  }
  return out;
}
