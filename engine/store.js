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
      // Purely cosmetic, student-chosen customisation for their own kid-home
      // and dashboard screens (My Settings). Rides along in the same jsonb
      // blob as everything else here, so it needs no schema change and syncs
      // across the student's own devices for free - see save()/saveStudent().
      kidPrefs:     { vibe: 'default', bigText: false, calm: false },
      // Plan-cap counters (daily questions, weekly exams). Deliberately in this
      // jsonb rather than a new column on `students`: no migration, no new
      // column-level GRANT to forget (see the students grant note in CLAUDE.md),
      // and loadStudentProgress() backfills it into every existing child for
      // free. day/week are Mauritius date keys - see _muDayKey()/_muWeekKey().
      usage:        { day: '', questions: 0, week: '', exams: 0 },
    };
  }

  // Declared HERE, above saveStudentSession/clearStudentSession which cancel it,
  // rather than beside saveStudentProgress further down: both are let bindings,
  // and a let read before its declaration line throws rather than reading
  // undefined.
  let _saveDebounceTimer = null;

  function _cancelPendingFlush() {
    clearTimeout(_saveDebounceTimer);
    _saveDebounceTimer = null;
  }

  // ── Student session (PIN-based, not Supabase Auth) ────
  // sess.token is the x-student-token that RLS uses to identify this student.
  // Saving or restoring a session also installs/clears that header, so callers
  // never have to remember to do it separately.
  //
  // Changing WHO is signed in must also drop any progress write still sitting in
  // the 30s debounce. That write carries the PREVIOUS student's id, and the
  // header it would go out with belongs to whoever is signed in now - so on a
  // shared family tablet, child A answering a question and child B logging in
  // within 30s made the timer fire A's row under B's token. RLS rejects that as
  // a row-level violation, which _flushProgressToSupabase reads as an expired
  // session and signs B straight back out. The data is not lost: localStorage is
  // written synchronously on every save, before the debounce is ever armed.
  function saveStudentSession(sess) {
    _cancelPendingFlush();
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
    _cancelPendingFlush();
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
    const { data, error } = await _sb.from('families').select('id, family_name, family_code, parent_id, created_at').eq('parent_id', parentId).maybeSingle();
    if (error) console.warn('[Store.getMyFamily]', error.message);
    return data || null;
  }

  async function createFamily(parentId, familyName) {
    if (!_sb) return null;
    const { data, error } = await _sb.from('families')
      .insert({ parent_id: parentId, family_name: familyName })
      .select('id, family_name, family_code, parent_id').single();
    if (error) {
      console.error("[Store.createFamily]", error);
      // 23505 = the family name is already in use. Children log in with it, so
      // two families cannot share one; the caller has to say which name to change.
      return { _error: { code: error.code, message: error.message } };
    }
    return data;
  }

  // Reports whether the rename actually landed. The family name is one of the
  // three things a child types at login, so a rename that silently failed while
  // the parent was told it worked locks every child out of the account.
  async function updateFamilyName(familyId, name) {
    if (!_sb) return { ok: false, error: 'offline' };
    const { error } = await _sb.from('families').update({ family_name: name }).eq('id', familyId);
    if (error) {
      console.error('[Store.updateFamilyName]', error.message);
      // The caller distinguishes 23505 (name taken by another family) from a
      // connection failure - they need very different messages.
      return { ok: false, code: error.code, error: error.message };
    }
    return { ok: true };
  }

  // ── Students (children) ───────────────────────
  // Deleting a child is a soft delete (see supabase-migration.sql), so
  // every read path has to skip the dead rows. The retry is for a database that
  // has not run that migration yet: `deleted_at` would be an unknown column and
  // the query would 42703, leaving a parent staring at an empty dashboard.
  const _STUDENT_COLS = 'id, username, display_name, avatar, grade, settings, session_version, expires_at';

  // "No children" and "could not read your children" are different answers and
  // the caller has to be able to tell them apart - an empty array for both is
  // what let a freshly created child look like an empty dashboard. The reason
  // for the last empty result is kept here and read by renderParentDashboard.
  let _familyStudentsError = null;
  function lastFamilyStudentsError() { return _familyStudentsError; }

  async function getFamilyStudents(familyId) {
    _familyStudentsError = null;
    if (!_sb) { _familyStudentsError = 'Not connected.'; return []; }
    const { data, error } = await _sb.from('students')
      .select(_STUDENT_COLS + ', deleted_at')
      .eq('family_id', familyId)
      .is('deleted_at', null)
      .order('created_at');

    if (!error) return (data || []).filter(s => !s.deleted_at);

    // ⚠ ONLY fall back when the column genuinely does not exist yet (42703 /
    //   PGRST204). The first version of this retried on ANY error and dropped
    //   the `deleted_at IS NULL` filter to do it — which meant a transient
    //   failure silently returned the DELETED children too, and the parent saw
    //   a child they had just removed sitting next to the one they recreated.
    //   Any other error is a real failure and must look like one.
    // 42501 belongs here too, and it is not obvious why. students has
    // COLUMN-LEVEL grants (supabase-migration.sql), so a column added
    // later is unreadable rather than absent — same practical state, completely
    // different error code, and the message says "permission denied for table
    // students" without ever naming the column. Treating it as a hard failure
    // is what turned a missing GRANT into an empty parent dashboard.
    const missingColumn = error.code === '42703' || error.code === 'PGRST204'
      || error.code === '42501' || /deleted_at/.test(error.message || '');
    if (!missingColumn) {
      console.error('[Store.getFamilyStudents]', error.message);
      _familyStudentsError = error.message || 'Unknown database error.';
      return [];
    }
    console.warn(error.code === '42501'
      ? '[Store.getFamilyStudents] deleted_at is not readable — run: GRANT SELECT (deleted_at) '
        + 'ON public.students TO anon, authenticated; (see supabase-migration.sql). '
        + 'Falling back to the unfiltered list, so a soft-deleted child may appear until then.'
      : '[Store.getFamilyStudents] no deleted_at column — run supabase-migration.sql.');
    const { data: legacy, error: legacyErr } = await _sb.from('students').select(_STUDENT_COLS)
      .eq('family_id', familyId).order('created_at');
    if (legacyErr) {
      console.error('[Store.getFamilyStudents] legacy', legacyErr.message);
      _familyStudentsError = legacyErr.message || 'Unknown database error.';
      return [];
    }
    return legacy || [];
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

  // 'username_taken' covers two cases the parent must not be able to tell
  // apart: the name is used inside their own family, or it is used by a child
  // in a DIFFERENT family that happens to share their family name. Naming the
  // second would disclose another family's children. Both mean the same thing
  // to the parent - pick another username - so both get the same words.
  const _CREATE_ERRORS = {
    username_taken:   'That username is not available. Please try another.',
    invalid_pin:      'PIN must be exactly 4 digits.',
    invalid_username: 'Username must be 3-20 characters, start with a letter, and use only letters, numbers, dots or underscores.',
    not_authorised:   'You do not have permission to add a child to this family.',
    // Raised by the students_max_children trigger. The cap comes back on the
    // response, so the static wording here is only the fallback.
    plan_child_limit: 'Your plan does not include another child account.',
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
      let message = _CREATE_ERRORS[code] || 'Could not create the child account.';
      if (code === 'plan_child_limit' && Number.isFinite(data?.limit)) {
        message = `Your plan covers ${data.limit} child account${data.limit === 1 ? '' : 's'}. `
                + 'Upgrade to add another, or remove a child first.';
      }
      return { _error: { code, message, limit: data?.limit } };
    }
    return data.student;
  }

  // Returns { ok } so callers never announce a change the database refused.
  // An RLS denial comes back as a normal error here, not an exception.
  async function updateStudent(studentId, updates) {
    if (!_sb) return { ok: false, error: 'offline' };
    const row = {};
    if (updates.displayName !== undefined) row.display_name = updates.displayName;
    if (updates.avatar      !== undefined) row.avatar       = updates.avatar;
    if (updates.grade       !== undefined) row.grade        = parseInt(updates.grade);
    if (updates.settings    !== undefined) row.settings     = updates.settings;
    if (Object.keys(row).length) {
      const { error } = await _sb.from('students').update(row).eq('id', studentId);
      if (error) { console.error('[Store.updateStudent]', error.message); return { ok: false, error: error.message }; }
    }
    // A PIN never goes through a plain UPDATE - always via the hashing RPC.
    if (updates.pin && !await setStudentPin(studentId, updates.pin)) {
      return { ok: false, error: 'pin_not_saved' };
    }
    return { ok: true };
  }

  // Soft delete. The row and all its progress stay in the database — the child
  // disappears from the app and their username is freed so the family can
  // recreate a child with the same name, but nothing is destroyed.
  //
  // Falls back to the old hard delete ONLY when the RPC does not exist, i.e. a
  // database that has not run supabase-migration.sql. That is exactly the
  // behaviour such a database had yesterday, so nothing regresses — but the
  // delete is irreversible there, hence the warning.
  async function deleteStudent(studentId) {
    if (!_sb) return { ok: false };
    try { localStorage.removeItem(_sKey(studentId)); } catch(e) {}

    const { data, error } = await _sb.rpc('soft_delete_student', { p_student: studentId });
    if (!error) return data || { ok: true };

    if (error.code !== 'PGRST202') {
      console.error('[Store.deleteStudent]', error.message);
      return { ok: false, error: error.message };
    }
    console.warn('[Store.deleteStudent] soft_delete_student missing — run supabase-migration.sql. Falling back to a HARD delete.');
    await _sb.from('student_progress').delete().eq('student_id', studentId);

    // .select() is not decoration. Under RLS a DELETE whose policy matches no
    // row is a SILENT no-op: no error, no rows, and the old code took that as
    // success. The child vanished from the screen, came back on the next
    // reload, and if the parent had recreated them in between they now had two.
    const { data: removed, error: delErr } = await _sb.from('students')
      .delete().eq('id', studentId).select('id');
    if (delErr) {
      console.error('[Store.deleteStudent]', delErr.message);
      return { ok: false, error: delErr.message };
    }
    if (!removed || !removed.length) {
      console.error('[Store.deleteStudent] delete affected 0 rows (blocked by RLS?)');
      return { ok: false, error: 'not_deleted' };
    }
    return { ok: true, hard: true };
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

  async function _flushProgressToSupabase(studentId, progressData) {
    if (!_sb) return;
    // Belt-and-braces alongside the cancel in saveStudentSession/clearStudentSession:
    // never write one student's row while a DIFFERENT student's token is installed.
    // RLS would reject it anyway, but that rejection is indistinguishable from a
    // genuinely expired session and would sign the wrong child out.
    // A parent previewing a child has no student session at all and is authorised
    // by owns_student_txt() instead, so only a mismatched session blocks the write.
    const _sess = getStudentSession();
    if (_sess && _sess.id && _sess.id !== studentId) {
      console.warn('[Store.saveStudentProgress] dropped a stale write for', studentId,
        '- the signed-in student is now', _sess.id, '(kept in localStorage)');
      return;
    }
    _sb.from('student_progress').upsert({
      student_id: studentId, data: progressData, updated_at: new Date().toISOString(),
    }).then(({ error }) => {
      if (error) {
        console.error('[Store.saveStudentProgress] write failed:', error.message,
          '- progress is saved locally only. Check the x-student-token header.');
        // Same signature/handling as the read path in loadStudentProgress() below:
        // an expired or revoked x-student-token makes RLS reject every write with
        // exactly this wording. Without this, a student can sit indefinitely with
        // everything "saving locally only" and zero indication anything is wrong -
        // this is what silently ate a bug report too (see reportQuestion below).
        if (typeof Events !== 'undefined' && /jwt|permission|denied|row-level/i.test(error.message || '')) {
          Events.emit('session-invalid', { source: 'saveStudentProgress' });
        }
      }
    }).catch(err => console.error('[Store.saveStudentProgress]', err));
  }

  async function saveStudentProgress(studentId, progressData, immediate = false) {
    // Write to localStorage immediately (zero latency during practice)
    try { localStorage.setItem(_sKey(studentId), JSON.stringify(progressData)); } catch(e) {}
    // Debounce Supabase writes: batch rapid question answers into one write every 30s.
    // Pass immediate=true on exam submit / explicit checkpoints so data is never lost.
    if (immediate) {
      _cancelPendingFlush();
      _flushProgressToSupabase(studentId, progressData);
    } else {
      _cancelPendingFlush();
      _saveDebounceTimer = setTimeout(() => {
        _saveDebounceTimer = null;
        _flushProgressToSupabase(studentId, progressData);
      }, 30_000);
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

  function saveStudent(id, data, immediate = false) {
    saveStudentProgress(id, data, immediate);
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
    // referral_code is deliberately NOT in this list - see getMyReferralCode().
    // This query gates login for every parent/teacher; a column this codebase
    // adds but the live DB doesn't have yet (migration not run) would error the
    // whole fetch and bounce every returning user into family-setup again.
    const { data, error } = await _sb.from('profiles')
      .select('id, role, full_name, disabled, expires_at, is_super_admin, teacher_status, teacher_tier')
      .eq('id', userId).maybeSingle();
    if (error) console.error('[Store.getProfile]', error.message);
    return data || null;
  }

  // ── Referrals ──────────────────────────────────
  // Isolated from getProfile() on purpose (see the comment there): fetched only
  // when the invite UI actually needs it, so a not-yet-migrated database (no
  // referral_code column, or the RPCs below not created yet) degrades to "no
  // code to show" instead of breaking login for everyone.
  async function getMyReferralCode(userId) {
    if (!_sb || !userId) return '';
    const { data, error } = await _sb.from('profiles')
      .select('referral_code').eq('id', userId).maybeSingle();
    if (error) { console.warn('[Store.getMyReferralCode]', error.message); return ''; }
    return data?.referral_code || '';
  }

  // Credits whoever owns p_code with referring the CURRENTLY authenticated
  // ── One-tap login links ───────────────────────
  // The token is returned in the clear ONCE, here, and only a hash of it is
  // stored - so it cannot be looked up again. If the parent loses the message
  // they mint a new link, which invalidates the old one.
  async function createStudentInvite(studentId, hours) {
    if (!_sb) return { ok: false, error: 'offline' };
    const { data, error } = await _sb.rpc('create_student_invite',
      { p_student: studentId, p_hours: hours || 48 });
    if (error) {
      console.error('[Store.createStudentInvite]', error.message);
      // PGRST202: the RPC is not deployed yet, which is a different problem
      // from "you may not do that" and needs a different message.
      return { ok: false, error: error.code === 'PGRST202' ? 'not_deployed' : error.message };
    }
    return data || { ok: false, error: 'unknown' };
  }

  async function redeemStudentInvite(token) {
    if (!_sb) return { ok: false, error: 'offline' };
    const { data, error } = await _sb.rpc('redeem_student_invite', { p_token: token });
    if (error) {
      console.error('[Store.redeemStudentInvite]', error.message);
      return { ok: false, error: error.code === 'PGRST202' ? 'not_deployed' : error.message };
    }
    return data || { ok: false, error: 'unknown' };
  }

  // user. Call once, right after that user's own profile row is created -
  // record_referral() is SECURITY DEFINER and always credits auth.uid(), so it
  // can only ever be called for yourself, never on someone else's behalf.
  async function recordReferral(code) {
    if (!_sb || !code) return { ok: false, error: 'no_code' };
    const { data, error } = await _sb.rpc('record_referral', { p_code: code });
    if (error) { console.warn('[Store.recordReferral]', error.message); return { ok: false, error: error.message }; }
    return data || { ok: false, error: 'unknown' };
  }

  // List of people the current user referred: [{referred_name, status, created_at}].
  async function getMyReferrals() {
    if (!_sb) return [];
    const { data, error } = await _sb.rpc('my_referrals');
    if (error) { console.warn('[Store.getMyReferrals]', error.message); return []; }
    return data || [];
  }

  // ── Credits & shop ─────────────────────────────
  // Every one of these degrades quietly on a database that has not run
  // supabase-credits-shop.sql yet: PGRST202 is "that function does not exist",
  // which for this feature means "no credits, no shop" — exactly the state
  // every family is in before it is deployed. Nothing here may throw into a
  // login path or a practice answer.
  function _rpcMissing(error) {
    return error && (error.code === 'PGRST202' || error.code === '42883');
  }

  async function getShopSettings() {
    if (!_sb) return null;
    const { data, error } = await _sb.rpc('shop_settings');
    if (error) {
      if (!_rpcMissing(error)) console.warn('[Store.getShopSettings]', error.message);
      return null;
    }
    return data || null;
  }

  async function getMyCredits() {
    if (!_sb) return null;
    const { data, error } = await _sb.rpc('my_credits');
    if (error) {
      if (!_rpcMissing(error)) console.warn('[Store.getMyCredits]', error.message);
      return null;
    }
    return data || null;
  }

  // ⚠ Returns NULL on failure, never []. An empty array is a real answer —
  // "this family owns nothing" — and the caller acts on it by clearing what it
  // has. Conflating a dropped request with that answer made a flaky network, or
  // a database without these RPCs, silently wipe the local list of unlocked
  // chapters and re-lock them in the UI. (It could never unlock anything it
  // should not: the server decides what is actually served.)
  async function getMyEntitlements() {
    if (!_sb) return null;
    const { data, error } = await _sb.rpc('my_entitlements');
    if (error) {
      if (!_rpcMissing(error)) console.warn('[Store.getMyEntitlements]', error.message);
      return null;
    }
    return data || [];
  }

  // The child's view of the same list. They are not the account holder, so this
  // is a SECURITY DEFINER RPC keyed off their session token that returns chapter
  // ids and expiry dates only — nothing about credits or money.
  // Same null-on-failure contract as getMyEntitlements above.
  async function getFamilyEntitlements() {
    if (!_sb) return null;
    const { data, error } = await _sb.rpc('family_entitlements');
    if (error) {
      if (!_rpcMissing(error)) console.warn('[Store.getFamilyEntitlements]', error.message);
      return null;
    }
    return data || [];
  }

  // ⚠ Sends the chapter id and nothing else. The price, the balance check and
  // the length of the unlock are all read server-side inside purchase_chapter();
  // there is deliberately no amount parameter for a browser to tamper with.
  async function purchaseChapter(chapterId) {
    if (!_sb) return { ok: false, error: 'offline' };
    const { data, error } = await _sb.rpc('purchase_chapter', { p_chapter_id: chapterId });
    if (error) {
      console.warn('[Store.purchaseChapter]', error.message);
      return { ok: false, error: _rpcMissing(error) ? 'not_deployed' : error.message };
    }
    return data || { ok: false, error: 'unknown' };
  }

  // Same contract as purchaseChapter: the subject id and nothing else. The
  // price, the balance check and which chapters the subject contains are all
  // resolved server-side from the admin-published catalogue.
  async function purchaseSubject(subjectId) {
    if (!_sb) return { ok: false, error: 'offline' };
    const { data, error } = await _sb.rpc('purchase_subject', { p_subject_id: subjectId });
    if (error) {
      console.warn('[Store.purchaseSubject]', error.message);
      return { ok: false, error: _rpcMissing(error) ? 'not_deployed' : error.message };
    }
    return data || { ok: false, error: 'unknown' };
  }

  // Called by a STUDENT session after a practice answer. Takes no arguments:
  // the RPC resolves who is calling from the x-student-token header, so a
  // browser cannot claim activity for an account it does not hold.
  async function recordStudentActivity() {
    if (!_sb) return null;
    const { data, error } = await _sb.rpc('record_student_activity');
    if (error) {
      if (!_rpcMissing(error)) console.warn('[Store.recordStudentActivity]', error.message);
      return null;
    }
    return data || null;
  }

  // A hint for the security log, not evidence. See flag_security_event().
  async function flagSecurityEvent(kind, detail) {
    if (!_sb) return;
    try { await _sb.rpc('flag_security_event', { p_kind: kind, p_detail: detail || {} }); } catch (_) {}
  }

  // ── Parent preferences (profiles.preferences jsonb) ──
  // Isolated from getProfile() for exactly the reason spelled out there: a
  // database that has not run supabase-migration.sql yet must degrade to
  // "no saved preferences" instead of erroring the query that gates login.
  async function getMyPreferences(userId) {
    if (!_sb || !userId) return {};
    const { data, error } = await _sb.from('profiles')
      .select('preferences').eq('id', userId).maybeSingle();
    if (error) { console.warn('[Store.getMyPreferences]', error.message); return {}; }
    return data?.preferences || {};
  }

  // Whole-blob write. Callers pass the merged object, not a patch — these are
  // a handful of scalar settings edited one screen at a time, so a read-modify-
  // write race would need two parent devices on the same page at once.
  async function saveMyPreferences(userId, prefs) {
    if (!_sb || !userId) return { ok: false, error: 'no_user' };
    const { error } = await _sb.from('profiles')
      .update({ preferences: prefs || {} }).eq('id', userId);
    if (error) { console.warn('[Store.saveMyPreferences]', error.message); return { ok: false, error: error.message }; }
    return { ok: true };
  }

  // Soft-deletes the signed-in parent, their family and every child under it.
  // Always acts on auth.uid() - it takes no target - see supabase-migration.sql.
  // The auth user survives, which is what makes restoreMyAccount() possible.
  async function deleteMyAccount() {
    if (!_sb) return { ok: false, error: 'offline' };
    const { data, error } = await _sb.rpc('delete_my_account');
    if (error) { console.error('[Store.deleteMyAccount]', error.message); return { ok: false, error: error.message }; }
    return data || { ok: false, error: 'unknown' };
  }

  async function restoreMyAccount() {
    if (!_sb) return { ok: false, error: 'offline' };
    const { data, error } = await _sb.rpc('restore_my_account');
    if (error) { console.error('[Store.restoreMyAccount]', error.message); return { ok: false, error: error.message }; }
    return data || { ok: false, error: 'unknown' };
  }

  // Separate from getProfile() for the usual reason: an un-migrated database has
  // no deleted_at column, and this must degrade to "not deleted" rather than
  // erroring the query that decides whether a parent may log in at all.
  async function getAccountDeletedAt(userId) {
    if (!_sb || !userId) return null;
    const { data, error } = await _sb.from('profiles')
      .select('deleted_at').eq('id', userId).maybeSingle();
    if (error) return null;
    return data?.deleted_at || null;
  }

  async function createProfile(userId, role, fullName) {
    if (!_sb) return null;
    const { data, error } = await _sb.from('profiles')
      .insert({ id: userId, role, full_name: fullName })
      .select('id, role, full_name, disabled, expires_at, is_super_admin, teacher_status, teacher_tier').single();
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
  async function reportQuestion(questionId, questionText, message, studentId, studentName, mode, options, answer) {
    if (!_sb || !questionId) return { ok: false, sessionExpired: false };
    // Pack extra context into question_text as JSON suffix (no schema change needed)
    const meta = JSON.stringify({ studentName: studentName || null, mode: mode || 'practice', options: options || null, answer: answer || null });
    const { error } = await _sb.from('question_reports').insert({
      question_id:   questionId,
      question_text: (questionText || '').slice(0, 400) + '\n__meta__' + meta,
      message:       (message || '').trim().slice(0, 1000),
      student_id:    studentId || null,
      status:        'open',
    });
    let sessionExpired = false;
    if (error) {
      console.error('[Store.reportQuestion] insert failed:', error.message);
      // Same expired/revoked-token signature as loadStudentProgress()/
      // _flushProgressToSupabase() above - this is the exact failure that made a
      // student's report vanish with no trace and no error anyone saw.
      sessionExpired = /jwt|permission|denied|row-level/i.test(error.message || '');
      if (sessionExpired && typeof Events !== 'undefined') {
        Events.emit('session-invalid', { source: 'reportQuestion' });
      }
    }
    return { ok: !error, sessionExpired };
  }

  // offset/limit, not a flat .limit(100): at ~1000 users/month the report
  // queue would eventually exceed 100 open items and the tab would silently
  // stop showing anything past that, with no "load more" to reach the rest.
  async function loadReports(offset = 0, limit = 30) {
    if (!_sb) return [];
    const { data } = await _sb.from('question_reports')
      .select('*, students!student_id(display_name, grade)')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    return data || [];
  }

  // Total reports, for the "showing N of M" line. Separate from loadReports()
  // rather than a second return value: the total only has to be fetched when
  // the list resets, not on every Load more page.
  // head:true means the rows are not transferred, only the count header.
  async function countReports() {
    if (!_sb) return null;
    const { count, error } = await _sb.from('question_reports')
      .select('id', { count: 'exact', head: true });
    return error ? null : (count ?? null);
  }

  async function resolveReport(id) {
    if (!_sb || !id) return false;
    const { error } = await _sb.from('question_reports')
      .update({ status: 'resolved' }).eq('id', id);
    return !error;
  }

  // ── Student assignments (Supabase) ────────────
  // show_hints arrived after this table shipped, so the select falls back to the
  // older column list if the database has not run supabase-migration.sql
  // yet. Without the retry an un-migrated database returns 42703 and the parent
  // sees "no assignments" for work that exists.
  const _ASGN_COLS     = 'id, subject_id, chapter_id, difficulty, note, show_answers, created_at';
  const _ASGN_COLS_NEW = _ASGN_COLS + ', show_hints';

  async function loadAssignments(studentId) {
    if (!_sb) return [];
    const q = cols => _sb.from('student_assignments')
      .select(cols).eq('student_id', studentId)
      .is('completed_at', null)
      .order('created_at', { ascending: false });
    let { data, error } = await q(_ASGN_COLS_NEW);
    if (error) ({ data } = await q(_ASGN_COLS));
    return data || [];
  }

  async function createAssignment(studentId, parentId, { subjectId, chapterId, difficulty, note, showAnswers, showHints }) {
    if (!_sb) return null;
    const base = {
      student_id: studentId, parent_id: parentId || null,
      subject_id: subjectId || null, chapter_id: chapterId || null,
      difficulty: difficulty ? parseInt(difficulty) : null,
      note: note || null,
      show_answers: showAnswers !== false,
    };
    // Same un-migrated-database fallback as loadAssignments: assigning work must
    // not fail outright just because the hint switch has nowhere to be stored.
    let { data, error } = await _sb.from('student_assignments')
      .insert({ ...base, show_hints: showHints !== false })
      .select(_ASGN_COLS_NEW).single();
    if (error) {
      ({ data, error } = await _sb.from('student_assignments')
        .insert(base).select(_ASGN_COLS).single());
    }
    return error ? null : data;
  }

  async function deleteAssignment(id) {
    if (!_sb) return { ok: false, error: 'offline' };
    const { error } = await _sb.from('student_assignments').delete().eq('id', id);
    if (error) { console.error('[Store.deleteAssignment]', error.message); return { ok: false, error: error.message }; }
    return { ok: true };
  }

  async function completeAssignment(id) {
    if (!_sb) return { ok: false, error: 'offline' };
    const { error } = await _sb.from('student_assignments')
      .update({ completed_at: new Date().toISOString() }).eq('id', id);
    if (error) { console.error('[Store.completeAssignment]', error.message); return { ok: false, error: error.message }; }
    return { ok: true };
  }

  // ── Friends ───────────────────────────────────
  async function getFriends() {
    if (!_sb) return [];
    const { data, error } = await _sb.rpc('get_my_friends');
    if (error) { console.warn('[Store.getFriends]', error.message); return []; }
    return data || [];
  }

  async function getMyFriendCode() {
    if (!_sb) return null;
    const { data, error } = await _sb.rpc('get_my_friend_code');
    if (error) { console.warn('[Store.getMyFriendCode]', error.message); return null; }
    return data || null;
  }

  async function removeFriend(friendId) {
    if (!_sb) return;
    await _sb.rpc('remove_friend', { p_friend_id: friendId });
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

  async function listPlans() {
    if (!_sb) return [];
    const { data, error } = await _sb.from('plans')
      .select('id, name, price_mur, max_children, features')
      .eq('is_active', true).order('price_mur');
    if (error) { console.warn('[Store.listPlans]', error.message); return []; }
    return data || [];
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

    _sb.from('login_events').insert({
      user_id:     String(userId),
      user_type:   userType || 'student',
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
    getFamilyStudents, lastFamilyStudentsError,
    createStudent, updateStudent, deleteStudent, setStudentPin,
    // Progress
    loadStudentProgress, saveStudentProgress,
    // Legacy API (used by app.js / existing screens)
    getAccounts, saveAccounts, getParentPin, setParentPin, loadStudent, saveStudent, clearStudent,
    // Profiles
    getProfile, createProfile, getMyPreferences, saveMyPreferences,
    deleteMyAccount, restoreMyAccount, getAccountDeletedAt,
    // Referrals
    recordReferral, getMyReferrals, getMyReferralCode,
    // credits + shop
    getShopSettings, getMyCredits, getMyEntitlements, getFamilyEntitlements,
    purchaseChapter, purchaseSubject, recordStudentActivity, flagSecurityEvent,
    createStudentInvite, redeemStudentInvite,
    // mm_data (teacher + global settings)
    getGlobalSettings, mmGet, mmSet,
    generateId,
    // Question reports
    reportQuestion, loadReports, countReports, resolveReport,
    // Assignments
    loadAssignments, createAssignment, deleteAssignment, completeAssignment,
    // Friends
    getFriends, getMyFriendCode, removeFriend,
    // Login tracking
    logLoginEvent,
    // Plans & billing
    getUserPlan, listPlans, activatePlan, getPaymentHistory,
  };
})();
