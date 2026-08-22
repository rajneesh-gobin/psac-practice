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
      theme:        'light',
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

  // ── Families ───────────────────────────────────
  async function lookupFamily(code) {
    if (!_sb) return null;
    const { data, error } = await _sb.from('families')
      .select('id, family_name, family_code')
      .eq('family_code', code.toUpperCase().trim())
      .single();
    return error ? null : data;
  }

  async function getMyFamily() {
    if (!_sb) return null;
    const { data } = await _sb.from('families').select('*').single();
    return data || null;
  }

  async function createFamily(parentId, familyName) {
    if (!_sb) return null;
    const { data, error } = await _sb.from('families')
      .insert({ parent_id: parentId, family_name: familyName })
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
      .select('id, username, display_name, avatar, grade, pin, settings')
      .eq('family_id', familyId)
      .order('created_at');
    return data || [];
  }

  async function createStudent(familyId, { username, displayName, avatar, grade, pin, settings }) {
    if (!_sb) return null;
    const { data, error } = await _sb.from('students')
      .insert({
        family_id: familyId, username, display_name: displayName,
        avatar, grade: parseInt(grade), pin,
        settings: settings || { lockedChapters:[], maxDifficulty:4, examDisabled:false },
      })
      .select().single();
    return error ? null : data;
  }

  async function updateStudent(studentId, updates) {
    if (!_sb) return;
    const row = {};
    if (updates.displayName !== undefined) row.display_name = updates.displayName;
    if (updates.avatar      !== undefined) row.avatar       = updates.avatar;
    if (updates.grade       !== undefined) row.grade        = parseInt(updates.grade);
    if (updates.pin         !== undefined) row.pin          = updates.pin;
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

  return {
    // Auth session
    saveStudentSession, getStudentSession, clearStudentSession,
    // Families
    lookupFamily, getMyFamily, createFamily, updateFamilyName,
    // Students
    getFamilyStudents, createStudent, updateStudent, deleteStudent,
    // Progress
    loadStudentProgress, saveStudentProgress,
    // Legacy API (used by app.js / existing screens)
    getAccounts, saveAccounts, getParentPin, setParentPin, loadStudent, saveStudent, clearStudent,
    // Profiles
    getProfile, createProfile,
    // mm_data (teacher)
    mmGet, mmSet,
    generateId,
  };
})();
