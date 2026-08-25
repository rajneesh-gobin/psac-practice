'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice - Storage Adapter
//  Uses _sb (global from supabase.js).
//  localStorage = fast cache; Supabase = source of truth.
// ══════════════════════════════════════════════

const Store = (() => {
  const ACCOUNTS_KEY = 'mathmaster_accounts';
  const PIN_KEY      = 'mathmaster_pin';
  const _sKey = id  => `mathmaster_s_${id}`;
  const STUDENT_SESS = 'mm_student_sess';

  // ── Default student progress schema ───────────
  function _defaultStudent() {
    return {
      stats:        { totalAttempted:0, totalCorrect:0, examCount:0, bestScore:0, maxStreak:0, streak:0, lastDate:null },
      chapters:     {},
      examHistory:  [],
      badges:       [],
      // null = "no preference expressed yet", NOT "prefers light".
      // loadStudentProgress() fills missing keys from here, so a concrete value
      // would look like a deliberate choice and override whatever theme is
      // already on screen - which is exactly what made viewing a newly created
      // child flip the parent's UI to light.
      theme:        null,
      xp:           0,
      level:        1,
      assignments:  [],
      restrictions: { lockedChapters:[], maxDifficulty:4, examDisabled:false },
    };
  }

  // ── Student session (PIN-based, not Supabase Auth) ────
  // sess.token is the x-student-token that RLS uses to identify this student.
  // Saving or restoring a session also installs/clears that header, so callers
  // never have to remember to do it separately.
  function saveStudentSession(sess) {
    try { localStorage.setItem(STUDENT_SESS, JSON.stringify(sess)); } catch(e) {}
    if (typeof setStudentToken === 'function') setStudentToken(sess?.token || null);
  }

  function getStudentSession() {
    try { return JSON.parse(localStorage.getItem(STUDENT_SESS)) || null; } catch(e) { return null; }
  }

  // Re-install the header from a stored session. Must run BEFORE any
  // student-scoped query on page load, or every policy check sees NULL.
  function restoreStudentToken() {
    const sess = getStudentSession();
    if (typeof setStudentToken === 'function') setStudentToken(sess?.token || null);
    return sess?.token || null;
  }

  function clearStudentSession() {
    try { localStorage.removeItem(STUDENT_SESS); } catch(e) {}
    if (typeof setStudentToken === 'function') setStudentToken(null);
  }

  // Tell the database to drop this student's sessions (logout on all devices).
  // Fire-and-forget: a failure here must never block the local logout.
  async function endStudentSession() {
    if (!_sb) return;
    try { await _sb.rpc('end_student_session'); } catch(e) {}
  }

  // NOTE: findStudentByUsername() was removed. It was only used by the
  // client-side local-dev PIN comparison in auth.js, which is gone - all PIN
  // verification now goes through the verify_student_pin() RPC. It was also the
  // last `select('*')` on students, which the column revoke would have broken.
  //
  // ⚠ Never `select('*')` on students: pin/pin_hash are revoked from
  //   anon/authenticated, so the whole query fails with 42501. Always list
  //   columns explicitly (see getFamilyStudents).

  // ── Families ───────────────────────────────────
  async function lookupFamily(code) {
    if (!_sb) return null;
    const { data, error } = await _sb.from('families')
      .select('id, family_name, family_code')
      .eq('family_code', code.toUpperCase().trim())
      .single();
    return error ? null : data;
  }

  async function getMyFamily(parentId) {
    if (!_sb || !parentId) return null;
    const { data, error } = await _sb.from('families').select('*').eq('parent_id', parentId).maybeSingle();
    if (error) console.warn('[Store.getMyFamily]', error.message);
    return data || null;
  }

  async function createFamily(parentId, familyName) {
    if (!_sb) return null;
    const { data, error } = await _sb.from('families')
      .insert({ parent_id: parentId, family_name: familyName })
      .select().single();
    if (error) console.error('[Store.createFamily]', error);
    return error ? null : data;
  }

  async function updateFamilyName(familyId, name) {
    if (!_sb) return;
    await _sb.from('families').update({ family_name: name }).eq('id', familyId);
  }

  // ── Students (children) ───────────────────────
  async function getFamilyStudents(familyId) {
    if (!_sb) return [];
    const { data } = await _sb.from('students')
      .select('id, username, display_name, avatar, grade, settings, session_version, expires_at')
      .eq('family_id', familyId)
      .order('created_at');
    return data || [];
  }

  // Hash a PIN into students.pin via the bcrypt RPC (pgcrypto crypt(), runs
  // inside the database). This is the ONLY way a PIN may be written — a
  // plaintext PIN must never reach a column, in any environment.
  async function setStudentPin(studentId, pin) {
    if (!_sb || !studentId || !pin) return false;
    const { data, error } = await _sb.rpc('set_student_pin', { p_student_id: studentId, p_pin: pin });
    if (error) { console.error('[Store.setStudentPin]', error.message); return false; }
    // The deployed set_student_pin returns jsonb and reports authorisation
    // failures as { ok:false, error:'unauthorized' } - a SUCCESSFUL rpc call
    // carrying a failure payload. Checking only `error` would report success
    // for a PIN that was never set. (An older revision returned VOID, i.e.
    // data === null, so treat null/undefined as success.)
    if (data && typeof data === 'object' && data.ok === false) {
      console.error('[Store.setStudentPin] rejected:', data.error || 'unknown');
      return false;
    }
    return true;
  }

  const _CREATE_ERRORS = {
    username_taken:   'That username is already taken. Please choose another.',
    invalid_pin:      'PIN must be exactly 4 digits.',
    invalid_username: 'Please enter a username.',
    not_authorised:   'You do not have permission to add a child to this family.',
  };

  // Creates the student and hashes the PIN in ONE database statement.
  // Two reasons it is an RPC rather than a client-side insert:
  //   • students.pin is NOT NULL, so we cannot insert first and hash after;
  //   • doing it in one statement means a plaintext PIN never exists in a
  //     column, not even momentarily, and there is no half-created row to
  //     roll back if hashing fails.
  async function createStudent(familyId, { username, displayName, avatar, grade, pin, settings }) {
    if (!_sb) return null;
    const { data, error } = await _sb.rpc('create_student_with_pin', {
      p_family_id:    familyId,
      p_username:     username,
      p_display_name: displayName,
      p_avatar:       avatar || '🧒',
      p_grade:        parseInt(grade) || 5,
      p_pin:          pin,
      p_settings:     settings || null,
    });

    if (error) { console.error('[Store.createStudent]', error.message); return { _error: error }; }
    if (!data?.ok) {
      const code = data?.error || 'unknown';
      console.error('[Store.createStudent] rejected:', code);
      return { _error: { code, message: _CREATE_ERRORS[code] || 'Could not create the child account.' } };
    }
    return data.student;
  }

  async function updateStudent(studentId, updates) {
    if (!_sb) return;
    const row = {};
    if (updates.displayName !== undefined) row.display_name = updates.displayName;
    if (updates.avatar      !== undefined) row.avatar       = updates.avatar;
    if (updates.grade       !== undefined) row.grade        = parseInt(updates.grade);
    if (updates.settings    !== undefined) row.settings     = updates.settings;
    if (Object.keys(row).length) await _sb.from('students').update(row).eq('id', studentId);
    // A PIN never goes through a plain UPDATE - always via the hashing RPC.
    if (updates.pin) await setStudentPin(studentId, updates.pin);
  }

  async function deleteStudent(studentId) {
    if (!_sb) return;
    // Clean up progress first (student_progress has no FK cascade to students)
    await _sb.from('student_progress').delete().eq('student_id', studentId);
    try { localStorage.removeItem(_sKey(studentId)); } catch(e) {}
    await _sb.from('students').delete().eq('id', studentId);
  }

  // ── Student progress ──────────────────────────
  function _cachedStudent(studentId) {
    try { return JSON.parse(localStorage.getItem(_sKey(studentId))) || null; } catch(e) { return null; }
  }

  async function loadStudentProgress(studentId) {
    if (!_sb) return _defaultStudent();
    // maybeSingle, NOT single: a brand-new student has no student_progress row
    // yet, and .single() reports "0 rows" as an ERROR. With the error logging
    // added below, that would print a scary failure on every first login and,
    // worse, take the cache-fallback branch for what is a perfectly normal state.
    const { data, error } = await _sb.from('student_progress')
      .select('data').eq('student_id', studentId).maybeSingle();

    // A failed read used to fall through to _defaultStudent() AND overwrite the
    // localStorage cache with those blank defaults - silently destroying the
    // offline copy of a student's progress (xp, streak, chapter history, theme)
    // whenever the network blipped or an RLS check failed. Never do that:
    // prefer the local cache, and surface the error.
    if (error) {
      // An expired or revoked x-student-token makes every policy check return
      // NULL, so reads come back empty rather than erroring. Surface that as a
      // session problem so the app can send them back to the PIN screen instead
      // of showing an app with no data in it.
      if (typeof Events !== 'undefined' && /jwt|permission|denied|row-level/i.test(error.message || '')) {
        Events.emit('session-invalid', { source: 'loadStudentProgress' });
      }
      console.error('[Store.loadStudentProgress] read failed:', error.message,
        '- falling back to the local cache; NOT overwriting it.');
      const cached = _cachedStudent(studentId);
      if (cached) {
        const def = _defaultStudent();
        for (const k of Object.keys(def)) { if (!(k in cached)) cached[k] = def[k]; }
        return cached;
      }
      return _defaultStudent();
    }

    const raw  = data?.data || {};
    const def  = _defaultStudent();
    for (const k of Object.keys(def)) { if (!(k in raw)) raw[k] = def[k]; }
    // Preserve locally-saved assignments if Supabase doesn't have them yet
    // (parent may have added assignments while the background Supabase sync was still pending)
    if (!raw.assignments?.length) {
      try {
        const cached = JSON.parse(localStorage.getItem(_sKey(studentId)));
        if (cached?.assignments?.length) raw.assignments = cached.assignments;
      } catch(e) {}
    }
    try { localStorage.setItem(_sKey(studentId), JSON.stringify(raw)); } catch(e) {}
    return raw;
  }

  async function saveStudentProgress(studentId, progressData) {
    // Write to localStorage immediately (zero latency during practice)
    try { localStorage.setItem(_sKey(studentId), JSON.stringify(progressData)); } catch(e) {}
    // Push to Supabase in background.
    // supabase-js resolves with { data, error } rather than rejecting, so the
    // old `.then(() => {}).catch(() => {})` swallowed EVERY write failure -
    // including RLS rejections. A student could practise for an hour with
    // nothing persisting and no indication anywhere.
    if (_sb) {
      _sb.from('student_progress').upsert({
        student_id: studentId, data: progressData, updated_at: new Date().toISOString(),
      }).then(({ error }) => {
        if (error) console.error('[Store.saveStudentProgress] write failed:', error.message,
          '- progress is saved locally only. Check the x-student-token header.');
      }).catch(err => console.error('[Store.saveStudentProgress]', err));
    }
  }

  // ── Local cache helpers (used by existing app.js code) ──
  function getAccounts() {
    try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || []; } catch(e) { return []; }
  }

  function saveAccounts(accounts) {
    try { localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts)); } catch(e) {}
  }

  function getParentPin() {
    try { return localStorage.getItem(PIN_KEY) || null; } catch(e) { return null; }
  }

  function setParentPin(pin) {
    try { localStorage.setItem(PIN_KEY, pin); } catch(e) {}
  }

  function loadStudent(id) {
    try {
      const raw = localStorage.getItem(_sKey(id));
      const data = raw ? JSON.parse(raw) : _defaultStudent();
      const def  = _defaultStudent();
      for (const k of Object.keys(def)) { if (!(k in data)) data[k] = def[k]; }
      return data;
    } catch(e) { return _defaultStudent(); }
  }

  function saveStudent(id, data) {
    saveStudentProgress(id, data);
  }

  function clearStudent(id) {
    try { localStorage.removeItem(_sKey(id)); } catch(e) {}
    if (_sb) _sb.from('student_progress').delete().eq('student_id', id).then(() => {}).catch(() => {});
  }

  // ── Profiles (parent / teacher) ───────────────
  async function getProfile(userId) {
    if (!_sb) return null;
    // maybeSingle: "no profile yet" is the NORMAL path for a freshly verified
    // account - Auth._handleParentSession relies on it to route to family-setup.
    // .single() treated that expected state as an error.
    // ⚠ Explicit column list - anything added to `profiles` must be added HERE
    //   too, or it silently arrives as undefined. teacher_status defaulting to
    //   undefined would have meant no approved teacher was ever recognised.
    const { data, error } = await _sb.from('profiles')
      .select('id, role, full_name, disabled, expires_at, is_super_admin, teacher_status, teacher_tier')
      .eq('id', userId).maybeSingle();
    if (error) console.error('[Store.getProfile]', error.message);
    return data || null;
  }

  async function createProfile(userId, role, fullName) {
    if (!_sb) return null;
    const { data, error } = await _sb.from('profiles')
      .insert({ id: userId, role, full_name: fullName })
      .select().single();
    return error ? null : data;
  }

  // ── mm_data (teacher assignments sync) ────────
  async function getGlobalSettings() {
    if (!_sb) return null;
    const { data } = await _sb.from('mm_data').select('value').eq('key', 'global_settings').maybeSingle();
    return data?.value || { disabled_grades: [], disabled_subjects: [], disabled_chapters: [], registration_open: true };
  }

  async function mmGet(key) {
    if (!_sb) return null;
    const { data } = await _sb.from('mm_data').select('value').eq('key', key).single();
    return data?.value ?? null;
  }

  async function mmSet(key, value) {
    if (!_sb) return;
    _sb.from('mm_data').upsert({ key, value, updated_at: new Date().toISOString() }).then(() => {}).catch(() => {});
  }

  function generateId() {
    return 'stu_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
  }

  // ── Question reports ──────────────────────────
  async function reportQuestion(questionId, questionText, message, studentId) {
    if (!_sb || !questionId) return false;
    const { error } = await _sb.from('question_reports').insert({
      question_id:   questionId,
      question_text: (questionText || '').slice(0, 500),
      message:       (message || '').trim().slice(0, 1000),
      student_id:    studentId || null,
      status:        'open',
    });
    return !error;
  }

  async function loadReports() {
    if (!_sb) return [];
    const { data } = await _sb.from('question_reports')
      .select('*').order('created_at', { ascending: false }).limit(100);
    return data || [];
  }

  // ── Student assignments (Supabase) ────────────
  async function loadAssignments(studentId) {
    if (!_sb) return [];
    const { data } = await _sb.from('student_assignments')
      .select('*').eq('student_id', studentId)
      .is('completed_at', null)
      .order('created_at', { ascending: false });
    return data || [];
  }

  async function createAssignment(studentId, parentId, { subjectId, chapterId, difficulty, note, showAnswers }) {
    if (!_sb) return null;
    const { data, error } = await _sb.from('student_assignments').insert({
      student_id: studentId, parent_id: parentId || null,
      subject_id: subjectId || null, chapter_id: chapterId || null,
      difficulty: difficulty ? parseInt(difficulty) : null,
      note: note || null,
      show_answers: showAnswers !== false,
    }).select().single();
    return error ? null : data;
  }

  async function deleteAssignment(id) {
    if (!_sb) return;
    await _sb.from('student_assignments').delete().eq('id', id);
  }

  async function completeAssignment(id) {
    if (!_sb) return;
    await _sb.from('student_assignments')
      .update({ completed_at: new Date().toISOString() }).eq('id', id);
  }

  // ── Plans / subscriptions ─────────────────────
  async function getUserPlan(userId) {
    if (!_sb || !userId) return { plan_id: 'free', plan: null, subscription: null };
    // Active subscription wins; fall back to free
    const { data: sub } = await _sb.from('subscriptions')
      .select('*, plans(*)')
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('started_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (sub?.plans) return { plan_id: sub.plan_id, plan: sub.plans, subscription: sub };
    // Fetch free plan details for display
    const { data: freePlan } = await _sb.from('plans').select('*').eq('id', 'free').maybeSingle();
    return { plan_id: 'free', plan: freePlan, subscription: null };
  }

  async function activatePlan(userId, planId, months, notes) {
    if (!_sb) return false;
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + (months || 1));
    // Cancel any existing active subscriptions first
    await _sb.from('subscriptions').update({ status: 'cancelled' }).eq('user_id', userId).eq('status', 'active');
    const { error } = await _sb.from('subscriptions').insert({
      user_id: userId, plan_id: planId, status: 'active', expires_at: expiresAt.toISOString(),
    });
    if (!error) {
      // Log a manual payment record
      await _sb.from('payments').insert({
        user_id: userId, plan_id: planId, amount_mur: 0,
        provider: 'manual', status: 'completed',
        notes: notes || 'Admin manual activation', processed_at: new Date().toISOString(),
      });
    }
    return !error;
  }

  async function getPaymentHistory(userId) {
    if (!_sb) return [];
    const { data } = await _sb.from('payments').select('*').eq('user_id', userId)
      .order('created_at', { ascending: false }).limit(20);
    return data || [];
  }

  // ── Login event tracking ──────────────────────
  async function logLoginEvent(userId, userType) {
    if (!_sb || !userId) return;
    const fingerprint = (() => {
      try {
        return btoa([
          navigator.userAgent,
          navigator.language,
          screen.width + 'x' + screen.height,
          Intl.DateTimeFormat().resolvedOptions().timeZone,
        ].join('|')).slice(0, 64);
      } catch(e) { return null; }
    })();

    let ip = null;
    try {
      const r = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(3000) });
      if (r.ok) ip = (await r.json()).ip;
    } catch(e) {}

    _sb.from('login_events').insert({
      user_id:     String(userId),
      user_type:   userType || 'student',
      ip_address:  ip,
      user_agent:  navigator.userAgent.slice(0, 500),
      fingerprint,
    }).then(() => {}).catch(() => {});
  }

  return {
    // Auth session
    saveStudentSession, getStudentSession, clearStudentSession,
    restoreStudentToken, endStudentSession,
    // Families
    lookupFamily, getMyFamily, createFamily, updateFamilyName,
    // Students
    getFamilyStudents, createStudent, updateStudent, deleteStudent, setStudentPin,
    // Progress
    loadStudentProgress, saveStudentProgress,
    // Legacy API (used by app.js / existing screens)
    getAccounts, saveAccounts, getParentPin, setParentPin, loadStudent, saveStudent, clearStudent,
    // Profiles
    getProfile, createProfile,
    // mm_data (teacher + global settings)
    getGlobalSettings, mmGet, mmSet,
    generateId,
    // Question reports
    reportQuestion, loadReports,
    // Assignments
    loadAssignments, createAssignment, deleteAssignment, completeAssignment,
    // Login tracking
    logLoginEvent,
    // Plans & billing
    getUserPlan, activatePlan, getPaymentHistory,
  };
})();
