'use strict';
// ══════════════════════════════════════════════
//  MathMaster — Storage Adapter
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
      theme:        'dark',
      xp:           0,
      level:        1,
      assignments:  [],
      restrictions: { lockedChapters:[], maxDifficulty:4, examDisabled:false },
    };
  }

  // ── Student session (PIN-based, not Supabase Auth) ────
  function saveStudentSession(sess) {
    try { localStorage.setItem(STUDENT_SESS, JSON.stringify(sess)); } catch(e) {}
  }

  function getStudentSession() {
    try { return JSON.parse(localStorage.getItem(STUDENT_SESS)) || null; } catch(e) { return null; }
  }

  function clearStudentSession() {
    try { localStorage.removeItem(STUDENT_SESS); } catch(e) {}
  }

  // ── Student lookup by username (Option A login — no family code) ──
  async function findStudentByUsername(username) {
    if (!_sb) return null;
    const { data, error } = await _sb.from('students')
      .select('*')
      .ilike('username', username.trim())
      .maybeSingle();
    return error ? null : data;
  }

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
    if (!_sb) return null;
    // Try RLS-filtered query first; fall back to explicit parent_id filter if provided
    let { data, error } = await _sb.from('families').select('*').maybeSingle();
    if ((!data || error) && parentId) {
      const r2 = await _sb.from('families').select('*').eq('owner_id', parentId).maybeSingle();
      data = r2.data || null;
    }
    return data || null;
  }

  async function createFamily(parentId, familyName) {
    if (!_sb) return null;
    const { data, error } = await _sb.from('families')
      .insert({ owner_id: parentId, family_name: familyName })
      .select().single();
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

  async function createStudent(familyId, { username, displayName, avatar, grade, pin, settings }) {
    if (!_sb) return null;
    const row = {
      family_id: familyId, username, display_name: displayName,
      avatar, grade: parseInt(grade),
      settings: settings || { lockedChapters:[], maxDifficulty:4, examDisabled:false },
    };
    // pin only stored directly in local-dev fallback; production uses set-pin function
    if (pin) row.pin = pin;
    const { data, error } = await _sb.from('students').insert(row).select().single();
    if (error) { console.error('[Store.createStudent]', error); return { _error: error }; }
    return data;
  }

  async function updateStudent(studentId, updates) {
    if (!_sb) return;
    const row = {};
    if (updates.displayName !== undefined) row.display_name = updates.displayName;
    if (updates.avatar      !== undefined) row.avatar       = updates.avatar;
    if (updates.grade       !== undefined) row.grade        = parseInt(updates.grade);
    if (updates.pin         !== undefined) row.pin          = updates.pin; // legacy/local-dev only
    if (updates.settings    !== undefined) row.settings     = updates.settings;
    await _sb.from('students').update(row).eq('id', studentId);
  }

  async function deleteStudent(studentId) {
    if (!_sb) return;
    await _sb.from('students').delete().eq('id', studentId);
  }

  // ── Student progress ──────────────────────────
  async function loadStudentProgress(studentId) {
    if (!_sb) return _defaultStudent();
    const { data } = await _sb.from('student_progress')
      .select('data').eq('student_id', studentId).single();
    const raw  = data?.data || {};
    const def  = _defaultStudent();
    for (const k of Object.keys(def)) { if (!(k in raw)) raw[k] = def[k]; }
    // Cache locally for fast access during practice
    try { localStorage.setItem(_sKey(studentId), JSON.stringify(raw)); } catch(e) {}
    return raw;
  }

  async function saveStudentProgress(studentId, progressData) {
    // Write to localStorage immediately (zero latency during practice)
    try { localStorage.setItem(_sKey(studentId), JSON.stringify(progressData)); } catch(e) {}
    // Push to Supabase in background
    if (_sb) {
      _sb.from('student_progress').upsert({
        student_id: studentId, data: progressData, updated_at: new Date().toISOString(),
      }).then(() => {}).catch(() => {});
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
    const { data } = await _sb.from('profiles').select('*').eq('id', userId).single();
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
    if (!_sb) return false;
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

  return {
    // Auth session
    saveStudentSession, getStudentSession, clearStudentSession,
    // Families
    lookupFamily, getMyFamily, createFamily, updateFamilyName,
    // Students
    findStudentByUsername, getFamilyStudents, createStudent, updateStudent, deleteStudent,
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
  };
})();
