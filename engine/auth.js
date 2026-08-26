'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice - Auth
//  Uses _sb (global from supabase.js).
//  Manages: Supabase email auth for parent/teacher,
//           PIN-based student login,
//           family + child account management.
// ══════════════════════════════════════════════

const Auth = (() => {
  const AVATARS = ['🧒','👧','🧑','👦','🌟','🎓','🦁','🐯','🦊','🐧','🌈','💫'];

  // ── Session state ──────────────────────────────
  let _parentUser    = null;   // Supabase auth user
  let _parentProfile = null;   // profiles row
  let _family        = null;   // families row
  let _familyStudents = [];    // students rows for this family

  let _activeAccount       = null;  // { id, name, avatar } - current student
  let _currentRole         = 'student'; // selected tab on auth screen
  let _setupAvatar         = AVATARS[0];
  let _pendingVerifyEmail  = ''; // email stored for resend verification
  let _isAdminUser         = false;  // true when logged-in user is admin role
  let _isTeacherUser       = false;  // role teacher AND approved, or admin
  let _teacherStatus       = 'none'; // none|pending|approved|rejected|suspended
  let _isSuperAdmin        = false;  // true when logged-in user is super admin
  let _planFeatures        = null; // features object from the family's active plan
  let _pinAttempts         = 0;
  let _pinLockedUntil      = 0;
  let _parentPinEntry      = '';
  let _parentPinSetup1     = '';
  let _parentPinSetup2     = '';
  let _parentPinStep       = 1;

  // ── Biometric lock gate (see engine/biometric.js) ──
  // Shared by both parent (Supabase session) and student (PIN token) resume -
  // whichever one is silently restoring on this page load. Never both: only
  // one of a parent session or a student session can be persisted at a time.
  let _biometricGateResolved   = false; // true once this boot has cleared/skipped the gate
  let _pendingBiometricSession = null;  // the session/sess object waiting behind #screen-biometric-lock
  let _pendingBiometricKind    = null;  // 'parent' | 'student'

  const DEFAULT_FREE_FEATURES = {
    allowed_chapters: null, daily_question_cap: 20, weekly_exam_cap: 1,
    hints_per_question: 3, printable_papers: false, advanced_analytics: false,
    push_reminders: false, timetable_generator: false, weekly_digest: false,
    tutor_status: false, early_access: false, max_children: 1,
  };

  function _el(id) { return document.getElementById(id); }

  function getActiveAccount()  { return _activeAccount; }
  function getParentProfile()  { return _parentProfile; }
  function getFamily()         { return _family; }
  function getPlanFeatures()   { return _planFeatures ?? DEFAULT_FREE_FEATURES; }

  const REF_STORAGE_KEY = 'psac_pending_referral';

  // ── Referrals ───────────────────────────────────
  // Capture ?ref=CODE from a shared invite link before any routing happens, so
  // it survives all the way to family-setup even if the visitor browses around
  // (landing page, auth tabs, email verification round-trip) before finishing
  // sign-up. Stripped from the URL immediately so it never gets re-shared by
  // accident if this visitor later copies their own address bar.
  function _captureReferralFromUrl() {
    try {
      const params = new URLSearchParams(location.search);
      const ref = (params.get('ref') || '').trim();
      if (ref) {
        localStorage.setItem(REF_STORAGE_KEY, ref.toUpperCase());
        params.delete('ref');
        const rest = params.toString();
        history.replaceState(null, '', location.pathname + (rest ? `?${rest}` : '') + location.hash);
      }
    } catch(_) {}
  }

  function getPendingReferralCode() {
    try { return localStorage.getItem(REF_STORAGE_KEY) || ''; } catch(_) { return ''; }
  }

  // Called once, right after a brand-new profile row exists (family-setup or
  // teacher bootstrap). Non-fatal either way: signup must never be blocked by
  // a bad or missing referral code.
  async function _consumePendingReferral(explicitCode) {
    const code = (explicitCode || getPendingReferralCode() || '').trim();
    try { localStorage.removeItem(REF_STORAGE_KEY); } catch(_) {}
    if (!code) return;
    try { await Store.recordReferral(code); } catch(e) { console.warn('[auth] referral not recorded:', e.message); }
  }

  // ── One-tap child login (?join=TOKEN) ──────────
  // Runs before every other routing decision: the child tapping this link may
  // already have a stale session, or be on a device where a parent is signed
  // in, and the link has to win in both cases. The token is stripped from the
  // URL immediately - it is single-use, but it should not sit in history or get
  // shared onward by a screenshot of the address bar.
  async function _tryJoinLink() {
    let token = '';
    try {
      const params = new URLSearchParams(location.search);
      token = (params.get('join') || '').trim();
      if (!token) return false;
      params.delete('join');
      const rest = params.toString();
      history.replaceState(null, '', location.pathname + (rest ? `?${rest}` : '') + location.hash);
    } catch(_) { return false; }

    const res = await Store.redeemStudentInvite(token);
    if (!res?.ok) {
      showScreen('auth');
      setRole('student');
      _showAuthError(res?.error === 'account_expired'
        ? 'This practice account has expired. Please ask your parent.'
        : 'That link has already been used or has expired. Ask your parent for a new one, '
          + 'or sign in with your family name, username and PIN.');
      return true;
    }

    // Any parent session on this device belongs to somebody else now.
    try { if (_sb) await _sb.auth.signOut(); } catch(_) {}
    _parentUser = null; _parentProfile = null; _family = null; _familyStudents = [];

    // bumpSession stays TRUE so this behaves exactly like a PIN login - the
    // account-sharing guard starts and push re-subscribes. redeem_student_invite
    // has already dropped every other session server-side.
    await _loginStudentRow(res.student, { token: res.session_token });
    return true;
  }

  // ── App init ───────────────────────────────────
  async function init() {
    _captureReferralFromUrl();
    // Show a loading state so there's no blank flash
    document.body.style.opacity = '0';

    if (location.search.includes('join=')) {
      document.body.style.opacity = '1';
      if (await _tryJoinLink()) return;
    }

    // 1. Listen for Supabase auth state changes (email verification callback lands here)
    if (_sb) {
      _sb.auth.onAuthStateChange(async (event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          showScreen('reset-password');
          return;
        }
        if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session && !_parentUser) {
          await _handleParentSessionGated(session);
        } else if (event === 'SIGNED_OUT') {
          _parentUser    = null;
          _parentProfile = null;
          _family        = null;
          _familyStudents = [];
          Store.clearStudentSession();
          _activeAccount = null;
          _biometricGateResolved  = false;
          _pendingBiometricSession = null;
          _pendingBiometricKind    = null;
          showScreen('auth');
        }
      });

      // 2. Check existing Supabase session (parent/teacher logged in)
      const { data: { session } } = await _sb.auth.getSession();
      if (session) {
        document.body.style.opacity = '1';
        await _handleParentSessionGated(session);
        return;
      }
    }

    // 3. Check stored student session (PIN login persists across refresh)
    const studentSess = Store.getStudentSession();
    if (studentSess) {
      document.body.style.opacity = '1';
      await _resumeStudentGated(studentSess);
      return;
    }

    document.body.style.opacity = '1';
    showScreen('landing');
  }

  // ── Biometric lock gate ─────────────────────────
  // Sits in front of _handleParentSession()/_resumeStudent(): a persisted
  // session (Supabase for a parent, the PIN token for a student) normally
  // resumes silently on reload, which is exactly what a fingerprint lock is
  // supposed to prevent on a shared family device. If this device has
  // enrolled biometrics for whichever account is resuming, the dashboard
  // stays behind #screen-biometric-lock until Biometric.verify() succeeds (or
  // they fall back to password/PIN). Runs at most once per boot - every entry
  // point funnels through _handleParentSessionGated / _resumeStudentGated,
  // guarded by _biometricGateResolved (plus _parentUser/_activeAccount) so
  // none of them can double-fire it.
  async function _handleParentSessionGated(session) {
    if (_parentUser) return;
    if (_biometricGateResolved || typeof Biometric === 'undefined' || !Biometric.isEnrolled(session.user.id)) {
      _biometricGateResolved = true;
      await _handleParentSession(session);
      return;
    }
    _showBiometricLock('parent', session);
  }

  async function _resumeStudentGated(sess) {
    if (_activeAccount) return;
    if (_biometricGateResolved || typeof Biometric === 'undefined' || !sess.id || !Biometric.isEnrolled(sess.id)) {
      _biometricGateResolved = true;
      await _resumeStudent(sess);
      return;
    }
    _showBiometricLock('student', sess);
  }

  function _showBiometricLock(kind, session) {
    _pendingBiometricKind    = kind;
    _pendingBiometricSession = session;
    const fallback = _el('bio-lock-fallback');
    if (fallback) fallback.textContent = kind === 'student' ? 'Use my PIN instead' : 'Use password instead';
    showScreen('biometric-lock');
    _attemptBiometricUnlock();
  }

  async function _attemptBiometricUnlock() {
    const session = _pendingBiometricSession;
    const kind    = _pendingBiometricKind;
    if (!session) return;
    const userId = kind === 'student' ? session.id : session.user.id;
    const statusEl = _el('bio-lock-status');
    if (statusEl) statusEl.textContent = '';
    const res = await Biometric.verify(userId);
    if (res.ok) {
      _biometricGateResolved  = true;
      _pendingBiometricSession = null;
      if (kind === 'student') await _resumeStudent(session);
      else                    await _handleParentSession(session);
    } else if (res.error !== 'cancelled' && statusEl) {
      statusEl.textContent = "Couldn't verify — try again, or use the fallback below.";
    }
  }

  // Abandons the biometric gate for this boot and sends them to the normal
  // sign-in form. Deliberately clears the credential first (signs the parent
  // out / drops the student token): unlike the fingerprint check, typing the
  // password or PIN again is a real second factor, not just a convenience skip.
  function biometricUsePassword() {
    const kind = _pendingBiometricKind;
    _biometricGateResolved  = true;
    _pendingBiometricSession = null;
    if (kind === 'student') {
      Store.clearStudentSession();
      showScreen('auth');
      setRole('student');
    } else {
      if (_sb) _sb.auth.signOut();
      showScreen('auth');
      setRole('parent');
    }
  }

  async function _biometricEnroll(userId, label, btn) {
    if (!userId) return;
    if (btn) btn.disabled = true;
    const res = await Biometric.enroll(userId, label || '');
    if (btn) btn.disabled = false;
    if (!res.ok) { toast(res.error || 'Could not enable fingerprint login.'); return; }
    toast('✅ Fingerprint login enabled on this device');
    if (typeof showProfile === 'function') showProfile();
  }

  function _biometricUnenroll(userId) {
    if (!userId) return;
    Biometric.unenroll(userId);
    toast('Fingerprint login disabled on this device');
    if (typeof showProfile === 'function') showProfile();
  }

  function enableBiometricLogin(btn) {
    if (!_parentProfile) return;
    return _biometricEnroll(_parentProfile.id, _parentUser?.email || '', btn);
  }

  function disableBiometricLogin() {
    if (!_parentProfile) return;
    _biometricUnenroll(_parentProfile.id);
  }

  function enableStudentBiometricLogin(btn) {
    if (!ACTIVE_STUDENT_ID) return;
    return _biometricEnroll(ACTIVE_STUDENT_ID, _activeAccount?.name || '', btn);
  }

  function disableStudentBiometricLogin() {
    if (!ACTIVE_STUDENT_ID) return;
    _biometricUnenroll(ACTIVE_STUDENT_ID);
  }

  // ── Handle parent/teacher Supabase session ─────
  async function _handleParentSession(session) {
    _parentUser = session.user;

    let profile = await Store.getProfile(_parentUser.id);

    // A teacher who has just verified their email has no children to add, so
    // the family-setup screen does not apply to them. Create the profile
    // immediately - as a PLAIN account - and file the application for review.
    if (!profile && _parentUser.user_metadata?.role === 'teacher') {
      profile = await _bootstrapTeacherProfile();
    }

    if (!profile) {
      // Brand-new user after email verification - needs family setup
      _buildSetupAvatarGrid();
      const refField = _el('setup-referral-code');
      const pending  = getPendingReferralCode();
      if (refField && pending) refField.value = pending;
      showScreen('family-setup');
      return;
    }

    _parentProfile = profile;

    // Closed by the parent themselves (Settings → Close my account). Nothing was
    // erased, so offer it back instead of letting them in to an app that looks
    // mysteriously empty. Read separately from getProfile() so a database
    // without the deleted_at column simply never takes this branch.
    const deletedAt = await Store.getAccountDeletedAt(profile.id);
    if (deletedAt) {
      const whenEl = _el('deleted-when');
      if (whenEl) {
        whenEl.textContent = ` on ${new Date(deletedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`;
      }
      showScreen('account-deleted');
      return;
    }

    if (profile.disabled) {
      await _sb.auth.signOut();
      showScreen('auth');
      _showAuthError('This account has been disabled. Please contact support.');
      return;
    }

    if (profile.expires_at && new Date(profile.expires_at) < new Date()) {
      await _sb.auth.signOut();
      showScreen('auth');
      _showAuthError('Your account access has expired. Please contact the administrator.');
      return;
    }

    if (profile.role === 'admin') {
      _isAdminUser = true;
      if (profile.is_super_admin) _isSuperAdmin = true;
      // Admin lands on parent dashboard; admin panel accessible via button
      const adminBtn = document.getElementById('btn-open-admin');
      if (adminBtn) adminBtn.classList.remove('hidden');
      _refreshAdminBadge();
    }

    // Teacher access requires BOTH the role AND an approved status. A pending
    // or suspended teacher is treated as a parent by the UI, and every teacher
    // RPC refuses them server-side regardless of what the UI shows.
    _teacherStatus = profile.teacher_status || 'none';
    _isTeacherUser = profile.role === 'admin'
                  || (profile.role === 'teacher' && _teacherStatus === 'approved');

    if (_isTeacherUser) {
      const tBtn = document.getElementById('btn-open-teacher');
      if (tBtn) { tBtn.classList.remove('hidden'); tBtn.classList.add('flex'); }
    }

    if (profile.role === 'teacher' && _isTeacherUser) {
      _loadTeacherDashboard();
      return;
    }

    // Parent - load family + students (pass parent ID as fallback if RLS query returns null)
    _family = await Store.getMyFamily(_parentUser.id);
    if (_family) {
      _familyStudents = await Store.getFamilyStudents(_family.id);
      _cacheAccountsLocally(_familyStudents);
    }

    // Parents/teachers have no per-user saved theme, so this keeps whatever is
    // already on screen. It used to force 'dark', which is what made switching
    // between a parent and a child flip the whole UI.
    applyTheme(_preferredTheme(null));
    _openParentDashboard();
    _promptSetParentPin();
    // Load global settings + plan features for client-side enforcement
    Store.getGlobalSettings().then(gs => {
      window.GLOBAL_SETTINGS  = gs || {};
      window.PLAN_ENFORCEMENT = !!(gs?.plan_enforcement_enabled);
    }).catch(() => {});
    Store.getUserPlan(_parentUser.id).then(r => {
      if (r?.plan?.features) _planFeatures = r.plan.features;
    }).catch(() => {});
  }

  // Note the role passed to createProfile: 'parent', NOT 'teacher'. Signing up
  // on the teacher tab expresses intent, not entitlement - profiles.role only
  // becomes 'teacher' when an admin approves, via admin_set_teacher_status().
  async function _bootstrapTeacherProfile() {
    const name = _parentUser.user_metadata?.full_name
              || _parentUser.email?.split('@')[0] || 'Teacher';
    const created = await Store.createProfile(_parentUser.id, 'parent', name);
    if (!created) {
      console.error('[auth] could not create teacher profile');
      return null;
    }
    await _consumePendingReferral();
    try {
      await _sb.rpc('request_teacher_access', { p_note: 'Signed up via the teacher tab.' });
    } catch (e) {
      // Non-fatal: they can still apply from the parent dashboard card.
      console.warn('[auth] teacher application not filed:', e.message);
    }
    return await Store.getProfile(_parentUser.id);
  }

  // ── Admin notification badge ───────────────────
  // Shows a count on the header Admin button so pending teacher applications
  // and open question reports are noticed rather than sitting in a tab nobody
  // opens.
  async function _refreshAdminBadge() {
    if (!_isAdminUser || !_sb) return;
    let n = 0, d = null;
    try {
      const { data } = await _sb.rpc('admin_pending_counts');
      if (data?.ok) { d = data; n = data.total || 0; }
    } catch (e) { return; }

    const badge = document.getElementById('admin-pending-badge');
    if (badge) {
      badge.textContent = n > 9 ? '9+' : String(n);
      badge.classList.toggle('hidden', n === 0);
    }
    const btn = document.getElementById('btn-open-admin');
    if (btn && d) {
      btn.title = n === 0 ? 'Admin panel'
        : `${d.teacher_requests} teacher application(s), ${d.open_reports} open report(s)`;
    }
  }

  function _loadTeacherDashboard() {
    applyTheme(_preferredTheme(null));
    showScreen('teacher');
    if (typeof TeacherMode !== 'undefined') TeacherMode.render();
  }

  function _updateHeaderProfileChip(type, account) {
    const btn = document.getElementById('header-profile-btn');
    const av  = document.getElementById('header-profile-avatar');
    const nm  = document.getElementById('header-profile-name');
    if (!btn) return;
    btn.classList.remove('hidden'); btn.classList.add('flex');
    if (type === 'parent' && _parentProfile) {
      if (av) av.textContent = (_parentProfile.full_name || '?')[0].toUpperCase();
      if (nm) nm.textContent = _parentProfile.full_name || (_parentUser && _parentUser.email) || 'Account';
    } else if (account) {
      if (av) av.textContent = account.avatar || '👤';
      if (nm) nm.textContent = account.display_name || account.displayName || 'Student';
    }
  }

  function _openParentDashboard() {
    renderParentDashboard();
    showScreen('parent');
    const hdrLogout = document.getElementById('header-logout-btn');
    if (hdrLogout) { hdrLogout.classList.remove('hidden'); hdrLogout.classList.add('flex'); }
    _updateHeaderProfileChip('parent', null);
    if (_parentUser) Store.logLoginEvent(_parentUser.id, _isSuperAdmin ? 'super_admin' : (_isAdminUser ? 'admin' : 'parent'));
  }

  // ── Cache Supabase students as local accounts ──
  // Keeps existing renderStudentSelect() / renderParentDashboard() working
  function _cacheAccountsLocally(students) {
    const accounts = students.map(s => ({ id: s.id, name: s.display_name, avatar: s.avatar, grade: s.grade }));
    Store.saveAccounts(accounts);
  }

  // ── Resume a stored student session ───────────
  async function _resumeStudent(sess) {
    // Re-install the x-student-token header FIRST. Every query below is
    // student-scoped, and without the header current_student_id() is NULL, so
    // RLS returns nothing.
    Store.restoreStudentToken();

    // A session stored before token auth existed (or one whose token was
    // dropped) can no longer read anything. Send them back to the login screen
    // rather than into an app that silently shows empty data.
    if (!sess.token) {
      Store.clearStudentSession();
      document.body.style.opacity = '1';
      showScreen('auth');
      toast('Please sign in again to continue.', 4000);
      return;
    }

    // Admin force-expire check - validate session_version against DB
    if (_sb) {
      try {
        const { data: sv } = await _sb.from('students').select('session_version, expires_at').eq('id', sess.id).maybeSingle();
        if (sv) {
          if (sv.session_version !== (sess.sessionVersion || 0)) {
            Store.clearStudentSession();
            document.body.style.opacity = '1';
            showScreen('auth');
            toast('Your session was ended by the administrator. Please log in again.', 5000);
            return;
          }
          if (sv.expires_at && new Date(sv.expires_at) < new Date()) {
            Store.clearStudentSession();
            document.body.style.opacity = '1';
            showScreen('auth');
            toast('Your practice access has expired. Please ask your parent.', 5000);
            return;
          }
        }
      } catch (_) { /* offline - allow resume */ }
    }

    _activeAccount    = { id: sess.id, name: sess.displayName, avatar: sess.avatar, grade: sess.grade };
    ACTIVE_STUDENT_ID = sess.id;
    _updateHeaderProfileChip('student', { avatar: sess.avatar, display_name: sess.displayName });

    // Resume session guard so an account-sharing kick still fires on refresh
    _startSessionGuard(sess.id, sess.sessionVersion || 0);

    // Load progress from Supabase (or localStorage cache)
    const progress = await Store.loadStudentProgress(sess.id);
    Object.assign(DB, progress);

    applyTheme(_preferredTheme(DB.theme));
    renderDashboard();
    updateStreak();
    updateXPBar();
    _setWelcomeName(sess.displayName);

    // Pre-load questions for this student's grade
    const resumeGrade = sess.grade || 5;
    if (typeof QuestionLoader !== 'undefined') {
      QuestionLoader.loadForStudent(resumeGrade).catch(() => {});
    }

    // Skip grade select - go straight to subject picker with the stored grade
    if (typeof SUBJECT_PACKS !== 'undefined' && SUBJECT_PACKS.length > 1) {
      SELECTED_GRADE = resumeGrade;
      showScreen('subject-select');
    } else {
      showScreen('dashboard');
    }
  }

  // ── Session guard (anti-sharing) ──────────────
  // Polls DB every 5 min; if session_version changed, another login happened → kick this session.
  // Also checks immediately when the device comes back online after being offline.
  let _sessionGuardTimer = null;
  let _sessionGuardOnlineFn = null;
  let _sessionGuardVisibilityFn = null;

  // A student session can stop working without any visible error: the token
  // expires (30 days) or is revoked, current_student_id() returns NULL, and RLS
  // then returns zero rows for everything. The app would look empty rather than
  // signed out. Anything that detects this raises 'session-invalid'.
  let _sessionEndedHandled = false;
  if (typeof Events !== 'undefined') {
    Events.on('session-invalid', () => {
      if (_sessionEndedHandled || !_activeAccount) return;
      _sessionEndedHandled = true;
      _stopSessionGuard();
      Store.clearStudentSession();
      _activeAccount = null;
      ACTIVE_STUDENT_ID = null;
      showScreen('auth');
      setRole('student');
      toast('Your session has expired. Please sign in again.', 5000);
    });
  }

  function _startSessionGuard(studentId, version) {
    _stopSessionGuard(); // clear any previous guard first
    _sessionEndedHandled = false;
    if (!_sb) return;

    const _checkVersion = async () => {
      try {
        const { data } = await _sb.from('students').select('session_version').eq('id', studentId).maybeSingle();
        if (data && data.session_version !== version) {
          _stopSessionGuard();
          Store.clearStudentSession();
          if (typeof showScreen === 'function') showScreen('auth');
          if (typeof toast === 'function') toast('⚠️ Your account was logged in on another device. You have been signed out.', 6000);
        }
      } catch(_) { /* offline — allow to continue */ }
    };

    _sessionGuardTimer    = setInterval(() => { if (!document.hidden) _checkVersion(); }, 30 * 60 * 1000);
    _sessionGuardOnlineFn = _checkVersion;
    window.addEventListener('online', _sessionGuardOnlineFn);
    _sessionGuardVisibilityFn = () => { if (!document.hidden) _checkVersion(); };
    document.addEventListener('visibilitychange', _sessionGuardVisibilityFn);
  }

  function _stopSessionGuard() {
    if (_sessionGuardTimer)        { clearInterval(_sessionGuardTimer); _sessionGuardTimer = null; }
    if (_sessionGuardOnlineFn)     { window.removeEventListener('online', _sessionGuardOnlineFn); _sessionGuardOnlineFn = null; }
    if (_sessionGuardVisibilityFn) { document.removeEventListener('visibilitychange', _sessionGuardVisibilityFn); _sessionGuardVisibilityFn = null; }
  }

  // ── Login a student (after PIN verified) ──────
  // navigate=false skips showScreen so the caller controls where to go (used by pdSwitchStudent)
  // bumpSession=false skips the session_version bump (parent-supervised switch, not a fresh PIN login)
  // token: the x-student-token from mint_student_session(). Required for a real
  // student login. Omitted when a PARENT switches into a child's view
  // (pdSwitchStudent) - there the parent's own JWT authorises the queries via
  // owns_student(), and minting a student token would hand the parent's browser
  // a credential that outlives the parent session.
  // applyUserTheme: false when a PARENT is previewing a child from the
  // dashboard. Loading a child's data must not restyle the parent's own UI -
  // they did not change user, they opened a panel.
  // headerChip: false for that same preview - the header chip names who is
  // SIGNED IN and opens their profile, so it must keep saying the parent even
  // while a child's row is loaded into ACTIVE_STUDENT_ID.
  //
  // session_version is bumped SERVER-SIDE now, inside verify_student_pin() /
  // redeem_student_invite() (both SECURITY DEFINER, run atomically with the
  // login itself), NOT here. It used to be a separate client-side UPDATE
  // straight after this function ran - but `students` RLS only allows a
  // parent's own auth session (owns_student_txt) or an admin to write to that
  // table, never a plain student token, so on any device with no parent ever
  // signed in that write silently failed every time (wrapped in a try/catch
  // that swallowed it). The LOCAL copy still incremented regardless, so the
  // very next guard check on that same session saw its own un-persisted bump
  // as a mismatch and signed the student out for a "different device" that
  // never existed. studentRow.session_version below is now always the
  // already-current, server-authoritative value - trust it as-is.
  async function _loginStudentRow(studentRow, { navigate = true, bumpSession = true, token = null, applyUserTheme = true, headerChip = true } = {}) {
    const sessionVersion = studentRow.session_version || 0;

    const sess = {
      id:             studentRow.id,
      displayName:    studentRow.display_name,
      avatar:         studentRow.avatar,
      grade:          studentRow.grade,
      settings:       studentRow.settings,
      sessionVersion: sessionVersion,
      token:          token || null,
    };
    // saveStudentSession installs the x-student-token header, so it MUST run
    // before the first student-scoped query below.
    Store.saveStudentSession(sess);

    // Apply parent restrictions to DB
    const progress = await Store.loadStudentProgress(studentRow.id);
    const merged   = Object.assign(progress, { restrictions: studentRow.settings });
    Object.assign(DB, merged);

    _activeAccount    = { id: studentRow.id, name: studentRow.display_name, avatar: studentRow.avatar, grade: studentRow.grade };
    ACTIVE_STUDENT_ID = studentRow.id;

    if (applyUserTheme) applyTheme(_preferredTheme(DB.theme));
    renderDashboard();
    updateStreak();
    updateXPBar();
    _setWelcomeName(studentRow.display_name);

    // Fetch global settings (disabled grades/subjects set by admin) + plan enforcement flag
    Store.getGlobalSettings().then(gs => {
      window.GLOBAL_SETTINGS  = gs || {};
      window.PLAN_ENFORCEMENT = !!(gs?.plan_enforcement_enabled);
    }).catch(() => {});
    // Load plan features for client-side chapter gating
    if (_sb) {
      _sb.from('students').select('family_id').eq('id', studentRow.id).maybeSingle()
        .then(async ({ data: s }) => {
          if (!s?.family_id) return;
          const { data: fam } = await _sb.from('families').select('parent_id').eq('id', s.family_id).maybeSingle();
          if (!fam?.parent_id) return;
          const result = await Store.getUserPlan(fam.parent_id);
          if (result?.plan?.features) _planFeatures = result.plan.features;
        }).catch(() => {});
    }

    // Pre-load questions for this student's grade
    const studentGrade = studentRow.grade || 5;
    if (typeof QuestionLoader !== 'undefined') {
      QuestionLoader.loadForStudent(studentGrade).catch(() => {});
    }

    // Show header logout button and profile chip
    const hdrLogout = document.getElementById('header-logout-btn');
    if (hdrLogout) { hdrLogout.classList.remove('hidden'); hdrLogout.classList.add('flex'); }
    if (headerChip) _updateHeaderProfileChip('student', studentRow);
    if (bumpSession) Store.logLoginEvent(studentRow.id, 'student');
    if (bumpSession) _startSessionGuard(studentRow.id, sessionVersion);
    if (bumpSession && typeof setupPushNotifications === 'function') {
      setupPushNotifications(studentRow.id).catch(() => {});
    }

    // Skip grade select - parent already set the grade; go straight to subject picker
    if (navigate) {
      if (typeof SUBJECT_PACKS !== 'undefined' && SUBJECT_PACKS.length > 1) {
        SELECTED_GRADE = studentGrade;
        showScreen('subject-select');
      } else {
        showScreen('dashboard');
      }
    }
  }

  // ── Public: loginStudent by id (called from student-select cards) ──
  // A PIN is now MANDATORY. This used to log a child straight in from a card,
  // with no credential at all - anyone holding the device could pick any
  // sibling's profile. It also cannot work any more: a session with no
  // x-student-token fails every RLS check, so the child would land in an app
  // showing no progress, no assignments and no timetable.
  //
  // So instead of signing them in, send them to the PIN screen with the
  // username prefilled.
  function loginStudent(id) {
    const student = (_familyStudents || []).find(s => s.id === id);
    const account = student || Store.getAccounts().find(a => a.id === id);
    if (!account) return;

    showScreen('auth');
    setRole('student');

    const uname = student?.username || '';
    const el    = _el('student-username');
    if (el) el.value = uname;
    const pinEl = _el('student-pin');
    if (pinEl) { pinEl.value = ''; setTimeout(() => pinEl.focus(), 80); }

    const label = student?.display_name || account.name || 'your account';
    toast(`Enter the PIN for ${label} to continue.`, 3000);
  }

  // ══════════════════════════════════════════════
  //  AUTH SCREEN UI
  // ══════════════════════════════════════════════

  function setRole(role) {
    _currentRole = role;

    // Update tab styles
    document.querySelectorAll('.auth-tab').forEach(b => {
      const on = b.dataset.role === role;
      b.classList.toggle('bg-white',     on);
      b.classList.toggle('text-indigo-900', on);
      b.classList.toggle('shadow-sm',    on);
      b.classList.toggle('text-white/60', !on);
    });

    // Show correct panel
    const emailPanel   = _el('auth-email-panel');
    const studentPanel = _el('auth-student-panel');
    if (role === 'student') {
      emailPanel?.classList.add('hidden');
      studentPanel?.classList.remove('hidden');
    } else {
      emailPanel?.classList.remove('hidden');
      studentPanel?.classList.add('hidden');
    }

    _clearAuthError();
  }

  function showSignIn() {
    _clearAuthError();
    _el('auth-signin-fields')?.classList.remove('hidden');
    _el('auth-signup-fields')?.classList.add('hidden');
    _el('auth-signin-tab')?.classList.add('bg-white/20', 'text-white', 'font-semibold');
    _el('auth-signin-tab')?.classList.remove('text-white/50');
    _el('auth-signup-tab')?.classList.remove('bg-white/20', 'text-white', 'font-semibold');
    _el('auth-signup-tab')?.classList.add('text-white/50');
  }

  function showSignUp() {
    _el('auth-signup-fields')?.classList.remove('hidden');
    _el('auth-signin-fields')?.classList.add('hidden');
    _el('auth-signup-tab')?.classList.add('bg-white/20', 'text-white', 'font-semibold');
    _el('auth-signup-tab')?.classList.remove('text-white/50');
    _el('auth-signin-tab')?.classList.remove('bg-white/20', 'text-white', 'font-semibold');
    _el('auth-signin-tab')?.classList.add('text-white/50');
    // Pre-fill if a ?ref= link already captured a code - still editable/removable.
    const refField = _el('auth-signup-referral');
    const pending  = getPendingReferralCode();
    if (refField && pending && !refField.value) refField.value = pending;
  }

  async function emailSignIn() {
    if (!_sb) { _showAuthError('Supabase not loaded.'); return; }
    const email = (_el('auth-email')?.value || '').trim();
    const pass  = (_el('auth-pass')?.value  || '').trim();
    if (!email || !pass) { _showAuthError('Please enter your email and password.'); return; }

    _setAuthLoading(true);
    const { data, error } = await _sb.auth.signInWithPassword({ email, password: pass });
    _setAuthLoading(false);

    if (error) {
      if (error.message.toLowerCase().includes('not confirmed') || error.message.toLowerCase().includes('not verified')) {
        _pendingVerifyEmail = email;
        if (_el('verify-email-addr')) _el('verify-email-addr').textContent = email;
        toast('Please verify your email first.', 3000);
        showScreen('verify-email');
      } else {
        _showAuthError(error.message);
      }
      return;
    }
    // onAuthStateChange may handle routing, but it's async and not awaited by
    // Supabase — if the event fires late or is missed, the user stays stuck on
    // the auth screen even though their session was stored. Drive routing here
    // directly using the session returned by signInWithPassword itself.
    // _handleParentSessionGated's own `if (_parentUser) return` guard prevents
    // double-execution if onAuthStateChange already fired.
    if (data?.session) {
      await _handleParentSessionGated(data.session);
    }
  }

  async function emailSignUp() {
    if (!_sb) { _showAuthError('Supabase not loaded.'); return; }
    const name  = (_el('auth-name')?.value         || '').trim();
    const email = (_el('auth-signup-email')?.value || '').trim();
    const pass  = (_el('auth-signup-pass')?.value  || '').trim();
    const passConfirm = (_el('auth-signup-pass-confirm')?.value || '').trim();
    if (!name)                   { _showAuthError('Please enter your name.'); return; }
    if (!email)                  { _showAuthError('Please enter your email.'); return; }
    if (pass.length < 6)         { _showAuthError('Password must be at least 6 characters.'); return; }
    if (pass !== passConfirm)    { _showAuthError('Passwords do not match.'); return; }

    // A code typed here (or already captured from a ?ref= link) has to survive
    // the email-verification round trip before there's even a profile to credit
    // it to - stash it now, _consumePendingReferral() picks it up once that
    // profile exists (family-setup / teacher bootstrap).
    const referralCode = (_el('auth-signup-referral')?.value || '').trim();
    if (referralCode) { try { localStorage.setItem(REF_STORAGE_KEY, referralCode.toUpperCase()); } catch(_) {} }

    // Check if registrations are open
    const gs = await Store.getGlobalSettings();
    if (gs && gs.registration_open === false) {
      _showAuthError('New registrations are currently closed. Please try again later.');
      return;
    }

    // Teachers may now sign up themselves. The account is created immediately
    // but carries NO teacher powers: it becomes a normal account with
    // teacher_status='pending' until an administrator approves it.
    // `role` here is only an INTENT recorded in user_metadata - the actual
    // profiles.role stays 'parent' until approval, so a self-declared teacher
    // can never grant themselves anything.
    const role = (_currentRole === 'teacher') ? 'teacher' : 'parent';

    _setAuthLoading(true);
    const { data, error } = await _sb.auth.signUp({
      email, password: pass,
      options: { data: { full_name: name, role } },
    });
    _setAuthLoading(false);

    // "This email already has an account" arrives two different ways depending
    // on the project's email-enumeration setting: as an explicit error, or as a
    // success with an EMPTY identities array and no new confirmation sent.
    // Either way, silently showing "check your email" would leave them waiting
    // for a message that never comes — and if they closed the account earlier,
    // signing in is exactly what gets it back.
    const alreadyRegistered =
      (error && /already\s*(registered|exists|been registered)|user already/i.test(error.message)) ||
      (!error && Array.isArray(data?.user?.identities) && data.user.identities.length === 0);

    if (alreadyRegistered) {
      _showAuthError('You already have an account with this email. Sign in instead — if you closed it, signing in lets you restore everything.');
      const signInBtn = _el('auth-goto-signin');
      if (signInBtn) signInBtn.classList.remove('hidden');
      return;
    }

    if (error) { _showAuthError(error.message); return; }

    // Show check-email screen
    _pendingVerifyEmail = email;
    if (_el('verify-email-addr')) _el('verify-email-addr').textContent = email;
    const note = _el('verify-teacher-note');
    if (note) note.classList.toggle('hidden', role !== 'teacher');
    showScreen('verify-email');
  }

  function backToSignUp() {
    _pendingVerifyEmail = '';
    showScreen('auth');
    // Switch to sign-up tab
    setTimeout(() => showSignUp(), 50);
  }

  // ── Forgot password ────────────────────────────
  function showForgotPassword() {
    _el('auth-signin-fields')?.classList.add('hidden');
    _el('auth-forgot-panel')?.classList.remove('hidden');
    _clearAuthError();
    setTimeout(() => _el('auth-forgot-email')?.focus(), 100);
  }

  function backToSignIn() {
    _el('auth-forgot-panel')?.classList.add('hidden');
    _el('auth-signin-fields')?.classList.remove('hidden');
    _clearAuthError();
  }

  async function forgotPassword() {
    if (!_sb) return;
    const email = (_el('auth-forgot-email')?.value || '').trim();
    if (!email) { _showAuthError('Please enter your email address.'); return; }

    _setAuthLoading(true);
    const { error } = await _sb.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://psac-practice.netlify.app/',
    });
    _setAuthLoading(false);

    if (error) { _showAuthError(error.message); return; }
    _clearAuthError();
    const panel = _el('auth-forgot-panel');
    if (panel) panel.innerHTML = `
      <div class="text-center">
        <div class="text-4xl mb-3 select-none">📧</div>
        <p class="text-white font-semibold mb-2">Reset link sent!</p>
        <p class="text-white/60 text-sm mb-4">Check your inbox for the reset link. It expires in 1 hour.</p>
        <button onclick="Auth.backToSignIn()" class="text-indigo-300 text-sm hover:text-white transition-colors">← Back to Sign In</button>
      </div>`;
  }

  // ── Resend verification email ───────────────────
  async function resendVerification() {
    if (!_sb) return;
    const email = _pendingVerifyEmail || (_el('verify-email-addr')?.textContent || '').trim();
    if (!email) { toast('Could not find email address. Please go back and sign up again.', 4000); return; }
    const { error } = await _sb.auth.resend({ type: 'signup', email });
    if (error) toast(`Error: ${error.message}`, 4000);
    else toast('Verification email resent! Check your inbox.', 4000);
  }

  // ── Reset password (from email link) ───────────
  async function setNewPassword() {
    if (!_sb) return;
    const pass = (_el('reset-new-pass')?.value    || '').trim();
    const conf = (_el('reset-confirm-pass')?.value || '').trim();
    const errEl = _el('reset-pass-error');
    const showErr = msg => { if (errEl) { errEl.textContent = msg; errEl.classList.remove('hidden'); } };

    if (pass.length < 6) { showErr('Password must be at least 6 characters.'); return; }
    if (pass !== conf)   { showErr('Passwords do not match.'); return; }
    if (errEl) errEl.classList.add('hidden');

    const { error } = await _sb.auth.updateUser({ password: pass });
    if (error) { showErr(error.message); return; }

    toast('Password updated! Please sign in again.', 4000);
    await _sb.auth.signOut();
  }

  // ── Show/hide password toggle ───────────────────
  function togglePass(inputId, btn) {
    const inp = document.getElementById(inputId);
    if (!inp) return;
    inp.type = inp.type === 'password' ? 'text' : 'password';
    btn.textContent = inp.type === 'password' ? '👁' : '🙈';
  }

  // ── Google sign-in ─────────────────────────────
  async function googleSignIn() {
    if (!_sb) return;
    const { error } = await _sb.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'https://psac-practice.netlify.app/' },
    });
    if (error) _showAuthError(error.message);
  }

  // ── Admin panel toggle ─────────────────────────
  function openAdminPanel() {
    if (!_isAdminUser) return;
    showScreen('admin');
    if (typeof AdminPanel !== 'undefined') AdminPanel.render();
  }

  // ── Teacher dashboard toggle ───────────────────
  // Replaces TeacherMode.enter(), which used to offer ANY visitor a "set your
  // teacher PIN" dialog. Teacher status comes from profiles.role and is granted
  // by an administrator; a parent has no route in, by design.
  function openTeacherDashboard() {
    if (!_isTeacherUser) {
      const msg = {
        pending:   'Your teacher application is awaiting approval.',
        rejected:  'Your teacher application was not approved. Contact the administrator.',
        suspended: 'Your teacher access has been suspended. Contact the administrator.',
      }[_teacherStatus] || 'Teacher access is granted by an administrator.';
      toast(msg, 3500);
      return;
    }
    _loadTeacherDashboard();
  }

  // ── Apply for teacher access ───────────────────
  // Any signed-in adult may apply; approval is an admin decision. The RPC is
  // idempotent - re-applying while pending just returns 'pending'.
  async function requestTeacherAccess(note) {
    if (!_sb || !_parentUser) { toast('Please sign in first.', 2500); return null; }
    const { data, error } = await _sb.rpc('request_teacher_access', { p_note: note || null });
    if (error) {
      console.error('[requestTeacherAccess]', error.message);
      toast('Could not send your application. Please try again.', 3000);
      return null;
    }
    if (!data?.ok) {
      toast(data?.error === 'suspended'
        ? 'Your teacher access is suspended. Contact the administrator.'
        : 'Could not send your application.', 3500);
      return data;
    }
    _teacherStatus = data.status;
    toast(data.status === 'approved'
      ? 'You already have teacher access. 👩‍🏫'
      : 'Application sent. An administrator will review it. ⏳', 4000);
    renderParentDashboard();
    return data;
  }

  function getTeacherStatus() { return _teacherStatus; }

  // ── Restore a closed account ───────────────────
  async function restoreAccount() {
    const btn = _el('restore-btn');
    const err = _el('restore-error');
    if (err) err.classList.add('hidden');
    if (btn) { btn.disabled = true; btn.textContent = 'Restoring…'; }

    const res = await Store.restoreMyAccount();
    if (!res.ok) {
      if (btn) { btn.disabled = false; btn.textContent = '♻️ Restore my account'; }
      if (err) { err.textContent = 'Could not restore the account. Please try again.'; err.classList.remove('hidden'); }
      return;
    }

    // Re-enter the normal login path from the top so family and children are
    // re-fetched — they were invisible to every query a moment ago.
    const { data: { session } } = await _sb.auth.getSession();
    if (btn) { btn.disabled = false; btn.textContent = '♻️ Restore my account'; }
    _parentProfile = null;
    if (session) await _handleParentSession(session);
    toast(res.children ? `Welcome back! ${res.children} child account${res.children === 1 ? '' : 's'} restored. 🎉` : 'Welcome back! 🎉', 4000);
  }

  // ── Change password modal ──────────────────────
  function openPasswordModal() {
    const m = document.getElementById('modal-change-password');
    if (m) { m.classList.remove('hidden'); const f = document.getElementById('cp-new'); if (f) f.focus(); }
  }
  function closePasswordModal() {
    const m = document.getElementById('modal-change-password');
    if (m) m.classList.add('hidden');
    ['cp-new','cp-confirm'].forEach(id => { const f = document.getElementById(id); if (f) f.value = ''; });
    const e = document.getElementById('cp-error');
    if (e) e.classList.add('hidden');
  }
  async function changePassword() {
    if (!_sb) return;
    const pass    = (document.getElementById('cp-new')?.value     || '').trim();
    const confirm = (document.getElementById('cp-confirm')?.value || '').trim();
    const errEl   = document.getElementById('cp-error');
    const showErr = msg => { if (errEl) { errEl.textContent = msg; errEl.classList.remove('hidden'); } };
    if (pass.length < 6) { showErr('Password must be at least 6 characters.'); return; }
    if (pass !== confirm){ showErr('Passwords do not match.');                  return; }
    const { error } = await _sb.auth.updateUser({ password: pass });
    if (error) { showErr(error.message); return; }
    closePasswordModal();
    toast('Password updated successfully! ✓', 3000);
  }

  // ── Invite friends / referrals ──────────────────
  // Fetched lazily (not part of _parentProfile - see Store.getMyReferralCode)
  // and cached here once known, so the share buttons below can stay synchronous.
  let _myReferralCode = '';

  function _inviteLink() {
    return _myReferralCode
      ? `${location.origin}${location.pathname}?ref=${_myReferralCode}`
      : location.origin + location.pathname;
  }
  function _inviteText() {
    return `Join me on PSAC Exam Practice — free PSAC revision for Grades 4–6! 📚`;
  }

  async function openInviteModal() {
    const codeEl = _el('invite-code');
    const linkEl = _el('invite-link');
    if (codeEl) codeEl.textContent = _myReferralCode || 'Loading…';
    if (linkEl) linkEl.textContent = _inviteLink();

    const listEl  = _el('invite-list');
    const countEl = _el('invite-count');
    if (listEl) listEl.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-3">Loading…</p>';

    const m = _el('modal-invite');
    if (m) m.classList.remove('hidden');

    if (!_myReferralCode && _parentUser) _myReferralCode = await Store.getMyReferralCode(_parentUser.id);
    if (codeEl) codeEl.textContent = _myReferralCode || '—';
    if (linkEl) linkEl.textContent = _inviteLink();

    const referrals = await Store.getMyReferrals();
    if (countEl) countEl.textContent = String(referrals.length);
    if (listEl) {
      listEl.innerHTML = referrals.length
        ? referrals.map(r => `
          <div class="flex items-center gap-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
            <span class="text-xl select-none">🎉</span>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-semibold text-gray-800 dark:text-white truncate">${_esc(r.referred_name)}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">${new Date(r.created_at).toLocaleDateString()}</div>
            </div>
          </div>`).join('')
        : '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No one yet — share your link to get started!</p>';
    }
  }
  function closeInviteModal() {
    const m = _el('modal-invite');
    if (m) m.classList.add('hidden');
  }
  function _esc(s) {
    const d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
  }

  async function copyInviteLink() {
    const link = _inviteLink();
    try {
      await navigator.clipboard.writeText(link);
      toast('Invite link copied! 📋', 2500);
    } catch(_) {
      prompt('Copy this link and share it:', link);
    }
  }

  async function shareInvite() {
    const link = _inviteLink();
    if (navigator.share) {
      try {
        await navigator.share({ title: 'PSAC Exam Practice', text: _inviteText(), url: link });
        return;
      } catch(e) {
        if (e.name === 'AbortError') return; // user cancelled the share sheet
      }
    }
    // No Web Share API (desktop browsers) or it failed - fall back to copy.
    await copyInviteLink();
  }

  function shareInviteWhatsApp() {
    const msg = `${_inviteText()}\n\n${_inviteLink()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  }

  // ── Reset student progress ─────────────────────
  async function confirmResetStudentProgress(studentId, studentName) {
    if (!confirm(`Delete ALL progress for ${studentName}?\n\nThis cannot be undone.`)) return;
    if (!confirm('Final confirmation - all chapters, XP and badges will be lost.')) return;
    if (!_sb) return;
    await _sb.from('student_progress').delete().eq('student_id', studentId);
    try { localStorage.removeItem(`mathmaster_s_${studentId}`); } catch(e) {}
    toast(`${studentName}'s progress has been reset.`, 3000);
    renderParentDashboard();
  }

  // ── Student login (username + PIN - no family code needed) ────────
  //
  // THREE things can trigger a sign-in: the PIN field auto-submits on the 4th
  // digit, the "Let's Go!" button, and the Enter key. Without a guard they
  // overlap: typing the last digit fires one attempt, and the click that
  // follows a moment later fires a second while the first is still finishing.
  // Two verify_student_pin calls land back to back, each minting a session and
  // bumping session_version, so one of them is immediately stale - the child is
  // told their login is wrong even though the credentials were correct. Waiting
  // for the auto-submit to finish "worked" only because it meant not clicking.
  //
  // The guard also stops a double-fire from inflating _pinAttempts, which could
  // trip the 5-attempt lockout on a single correct login.
  let _signInBusy = false;
  async function studentSignIn() {
    if (_signInBusy) return;
    _signInBusy = true;
    try {
      await _studentSignIn();
    } finally {
      _signInBusy = false;
      _setAuthLoading(false);
    }
  }

  // Enable the sign-in button only when both fields are ready.
  // Called from oninput on both fields so the button is never clickable until
  // the child has typed something in each box.
  function checkStudentReady() {
    const family   = (_el('student-family-name')?.value || '').trim();
    const username = (_el('student-username')?.value    || '').trim();
    const pin      = (_el('student-pin')?.value         || '').trim();
    const btn = _el('student-signin-btn');
    if (btn) btn.disabled = !(family && username && pin.length === 4);
  }

  // Auto-submit when the 4th digit lands - but only once there is a username to
  // submit with, so a child who fills the PIN first is not told off for it.
  function onPinInput(el) {
    checkStudentReady();
    if (el.value.length === 4 && (_el('student-username')?.value || '').trim()) studentSignIn();
  }

  async function _studentSignIn() {
    if (!_sb) return;

    // Client-side lockout: first line of defence (server is the real gate)
    if (Date.now() < _pinLockedUntil) {
      const secs = Math.ceil((_pinLockedUntil - Date.now()) / 1000);
      _showAuthError(`Too many wrong PINs. Please wait ${secs} seconds.`);
      return;
    }

    const family   = (_el('student-family-name')?.value || '').trim();
    const username = (_el('student-username')?.value    || '').trim();
    const pin      = (_el('student-pin')?.value         || '').trim();
    if (!family)   { _showAuthError('Please enter your family name.'); return; }
    if (!username) { _showAuthError('Please enter your name.'); return; }
    if (!pin)      { _showAuthError('Please enter your PIN.');  return; }

    _setAuthLoading(true);

    // Single verification path for EVERY environment: verify_student_pin(),
    // which (after supabase-migration.sql) delegates the credential
    // check to verify_student_pin_core() and appends a session token.
    //
    // We deliberately call verify_student_pin rather than mint_student_session:
    // browsers get PostgREST 42883 for the newly-created function name while
    // server-side clients on the same machine get 200, so we reuse the route
    // PostgREST already resolves instead of fighting it.
    // The PIN hash never leaves the database, and there is no client-side
    // comparison to fall back to. (The old local-dev branch compared
    // `pin !== student.pin` in the browser, which both required plaintext PINs
    // in the DB and needed select('*') on students - the pin column is no
    // longer readable by anon, so that branch could not work anyway.)
    //
    // The response is a superset of verify_student_pin's, so every branch below
    // is unchanged; `data.session_token` is the only addition.
    // Buttons stay disabled until the wrapper's finally runs. Re-enabling here
    // used to reopen the window for a second submit while the success path was
    // still awaiting _loginStudentRow().
    const { data, error } = await _sb.rpc('verify_student_pin', { p_username: username, p_pin: pin, p_family_name: family });

    if (error) {
      // 42883 = undefined_function. Transient right after the RPC is created,
      // while PostgREST's schema cache catches up - and permanent if
      // supabase-migration.sql was never run at all. Distinguish it,
      // because "try again in a moment" and "a migration is missing" need very
      // different reactions.
      const missing = error.code === '42883'
        || /42883|undefined_function|could not find the function/i.test(error.message || '');
      if (missing) {
        _showAuthError('Login service is starting up. Please wait a few seconds and try again.');
        console.error('[auth] verify_student_pin not found (42883) - PostgREST schema cache. '
          + 'In the SQL editor: NOTIFY pgrst, \'reload schema\'; then restart the project.');
      } else {
        _showAuthError('Login error. Please try again.');
        console.error('[auth] verify_student_pin failed:', error);
      }
      return;
    }

    if (data.locked) {
      const secs = data.secsLeft || 60;
      _pinLockedUntil = Date.now() + secs * 1000;
      _showAuthError(`Too many wrong PINs. Please wait ${secs} seconds.`);
      if (_el('student-pin')) _el('student-pin').value = '';
      return;
    }

    // More than one family is registered under this name, so the lookup cannot
    // tell which child this is. Nothing the child types will fix it - a parent
    // has to rename the family in Account & Settings → Family Login.
    if (data.error === 'ambiguous_family') {
      _showAuthError('Two families share this name, so we cannot tell which account this is. '
        + 'Please ask your parent to change the family name in Settings.');
      return;
    }

    if (data.error === 'account_expired') {
      _showAuthError('Your practice access has expired. Please ask your parent.');
      return;
    }

    if (!data.ok) {
      _pinAttempts++;
      if (_pinAttempts >= 5) {
        _pinLockedUntil = Date.now() + 60000;
        _pinAttempts = 0;
        _showAuthError('Too many wrong PINs. Locked for 60 seconds.');
      } else {
        const left = data.attemptsLeft ?? (5 - _pinAttempts);
        // Just-created accounts should log in immediately - there's no server-side
        // activation delay. This hint covers the one scenario that can look like
        // one: an app update rolling out while the account was created, which can
        // leave a browser briefly serving a stale cached shell until it catches up.
        _showAuthError(`Username or PIN is incorrect. ${left} attempt${left === 1 ? '' : 's'} left. `
          + `Just created this account? Wait a minute and try again.`);
      }
      if (_el('student-pin')) _el('student-pin').value = '';
      return;
    }

    _pinAttempts = 0;
    _pinLockedUntil = 0;
    _clearAuthError();

    if (!data.session_token) {
      // mint_student_session() has not been deployed yet (or an older
      // verify_student_pin is still in place). Without a token every RLS policy
      // sees current_student_id() = NULL, so the student can read nothing.
      // Fail loudly rather than dropping them into a silently broken app.
      _showAuthError('Login is temporarily unavailable. Please tell your parent (session service not deployed).');
      console.error('[auth] mint_student_session returned no session_token - run supabase-migration.sql');
      return;
    }

    await _loginStudentRow(data.student, { token: data.session_token });
  }

  // ── Family Setup (first login after email verification) ──
  function _buildSetupAvatarGrid() {
    const grid = _el('setup-avatar-grid');
    if (!grid || grid._built) return;
    grid.innerHTML = AVATARS.map((a, i) =>
      `<button type="button" class="setup-av text-2xl p-1 rounded-lg border-2
        ${i === 0 ? 'border-green-400 bg-green-400/20' : 'border-transparent'}
        hover:border-green-300 transition-colors"
        onclick="Auth._pickSetupAvatar(this,'${a}')">${a}</button>`
    ).join('');
    _setupAvatar = AVATARS[0];
    grid._built = true;
  }

  function _pickSetupAvatar(btn, avatar) {
    _setupAvatar = avatar;
    document.querySelectorAll('.setup-av').forEach(b => {
      b.classList.toggle('border-green-400',    b === btn);
      b.classList.toggle('bg-green-400/20',     b === btn);
      b.classList.toggle('border-transparent', b !== btn);
    });
  }

  async function completeSetup() {
    if (!_sb || !_parentUser) return;

    const familyName  = (_el('setup-family-name')?.value  || '').trim() || 'My Family';
    const childName   = (_el('setup-child-name')?.value   || '').trim();
    const childUser   = (_el('setup-child-username')?.value || '').trim().toLowerCase().replace(/\s+/g,'');
    const childGrade  = parseInt(_el('setup-child-grade')?.value || '5');
    const childPin    = (_el('setup-child-pin')?.value    || '').trim();

    if (!childName)             { toast('Please enter the child\'s name.', 2000); return; }
    if (!childUser)             { toast('Please enter a username for the child.', 2000); return; }
    if (!/^\d{4}$/.test(childPin)) { toast('PIN must be exactly 4 digits.', 2000); return; }

    const role = _parentUser.user_metadata?.role || 'parent';
    const name = _parentUser.user_metadata?.full_name || _parentUser.email;

    // Create profile
    const profile = await Store.createProfile(_parentUser.id, role, name);
    if (!profile) { toast('Error creating profile. Please try again.', 3000); return; }
    _parentProfile = profile;
    await _consumePendingReferral(_el('setup-referral-code')?.value);

    // Create family
    const family = await Store.createFamily(_parentUser.id, familyName);
    if (!family || family._error) {
      // 23505: another family already answers to this name, and children log in
      // with it - so it has to be unique. Name the real problem; "try again"
      // would have them retry the same name for ever.
      toast(family?._error?.code === '23505'
        ? 'Another family already uses that name. Please choose a different family name.'
        : 'Error creating family. Please try again.', 4000);
      return;
    }
    _family = family;

    // Create first student
    const student = await Store.createStudent(family.id, {
      username: childUser, displayName: childName,
      avatar: _setupAvatar, grade: childGrade, pin: childPin,
    });
    if (!student || student._error) {
      const err = student?._error;
      const msg = (err?.code === '23505')
        ? 'That username is not available. Please try another.'
        : (err?.message || 'Error creating student account. Check the browser console.');
      toast(msg, 3500);
      return;
    }

    _familyStudents = [student];
    _cacheAccountsLocally(_familyStudents);

    toast(`Family set up! Family code: ${family.family_code} 🎉`, 5000);
    launchConfetti();
    _openParentDashboard();
  }

  // ── Logout ─────────────────────────────────────
  async function logout() {
    _stopSessionGuard();
    // Drop the server-side session before clearing the local token, otherwise
    // the RPC has no x-student-token to identify which sessions to delete.
    if (_activeAccount) await Store.endStudentSession();
    Store.clearStudentSession();
    _activeAccount    = null;
    ACTIVE_STUDENT_ID = null;
    _parentUser       = null;
    _parentProfile    = null;
    _family           = null;
    _familyStudents   = [];
    _biometricGateResolved   = false;
    _pendingBiometricSession = null;
    _pendingBiometricKind    = null;
    _justSetPins      = {};
    _isAdminUser      = false;
    _isSuperAdmin     = false;
    _isTeacherUser    = false;
    _teacherStatus    = 'none';
    _planFeatures     = null;
    window.PLAN_ENFORCEMENT = false;
    // Re-hide the privileged buttons, or they persist into the next session on
    // a shared device.
    ['btn-open-teacher', 'btn-open-admin'].forEach(id => {
      const b = document.getElementById(id);
      if (b) { b.classList.add('hidden'); b.classList.remove('flex'); }
    });
    const hdrLogout = document.getElementById('header-logout-btn');
    if (hdrLogout) { hdrLogout.classList.add('hidden'); hdrLogout.classList.remove('flex'); }
    const hdrProfile = document.getElementById('header-profile-btn');
    if (hdrProfile) { hdrProfile.classList.add('hidden'); hdrProfile.classList.remove('flex'); }
    if (_sb) await _sb.auth.signOut();
    showScreen('landing');
  }

  // ── PIN security helpers ───────────────────────
  // The 30 most-guessed 4-digit PINs in the wild. Blocking these forces parents
  // away from the "I'll just use 1111" reflex without touching the UX for anyone
  // who picks something thoughtful.
  const _WEAK_PINS = new Set([
    '0000','1111','2222','3333','4444','5555','6666','7777','8888','9999',
    '1234','2345','3456','4567','5678','6789','7890','0123',
    '9876','8765','7654','6543','5432','4321','3210',
    '1212','2121','1010','0101','2020','0202',
    '1122','2211','1100','0011','1221','2112',
  ]);
  function _isWeakPin(pin) { return _WEAK_PINS.has(String(pin)); }
  function _suggestPin() {
    let p;
    do { p = String(Math.floor(Math.random() * 9000) + 1000); } while (_isWeakPin(p));
    return p;
  }
  function suggestPin() {
    const pin = _suggestPin();
    const el = _el('add-child-pin');
    if (el) el.value = pin;
    const disp = _el('pin-suggestion-display');
    if (disp) disp.textContent = pin;
  }
  function suggestChildPin() { return _suggestPin(); }

  // PINs never have a plaintext store anywhere - _setStudentPin() only ever
  // hashes one via the DB's bcrypt RPC. This is the one place a just-set PIN
  // is remembered, purely in memory, so the parent's dashboard "Login" tab can
  // show it back to them for the rest of this tab session. It is per studentId
  // so it survives switching between children, and is wiped on logout() below.
  let _justSetPins = {};
  function getJustSetPin(studentId) { return _justSetPins[studentId || ACTIVE_STUDENT_ID] || ''; }

  async function setCurrentChildPin(pin) {
    if (!ACTIVE_STUDENT_ID) return { ok: false, error: 'Open a child first.' };
    pin = String(pin || '').trim();
    if (!/^\d{4}$/.test(pin)) return { ok: false, error: 'PIN must be exactly 4 digits.' };
    if (_isWeakPin(pin)) return { ok: false, error: 'That PIN is too easy to guess — try something less obvious (not 1111, 1234, etc.).' };
    const ok = await _setStudentPin(ACTIVE_STUDENT_ID, pin);
    if (!ok) return { ok: false, error: 'Could not save the PIN. Please try again.' };
    _justSetPins[ACTIVE_STUDENT_ID] = pin;
    return { ok: true, pin };
  }

  // Retry path behind the dashboard's "could not load your children" banner.
  // renderParentDashboard() reads the cached list, so repainting alone would
  // show the same failure for ever - the fetch has to be redone.
  async function reloadStudents() {
    if (!_family && _parentUser) _family = await Store.getMyFamily(_parentUser.id);
    if (_family) {
      _familyStudents = await Store.getFamilyStudents(_family.id);
      _cacheAccountsLocally(_familyStudents);
    }
    renderParentDashboard();
  }

  // The family name is the first of the three things a child types at login,
  // and it is the one the parent never picks on this form - so it is shown
  // read-only rather than left to memory. Renaming it belongs in Account &
  // Settings, where it applies to the whole family rather than one child.
  function _fillFamilyField() {
    const el = _el('add-child-family');
    if (!el) return;
    el.value = _family?.family_name || '';
  }

  // ── Parent adds/manages children ───────────────
  async function addStudent() {
    if (!_family) {
      // Family may not have loaded yet - retry with explicit parent ID fallback
      _family = await Store.getMyFamily(_parentUser?.id);
      if (!_family && _parentUser) {
        // Still null - could be a fresh account that skipped setup, create a default family
        const name = _parentProfile?.full_name || _parentUser.email?.split('@')[0] || 'My Family';
        const made = await Store.createFamily(_parentUser.id, `${name}'s Family`);
        _family = made?._error ? null : made;
        if (made?._error?.code === '23505') {
          toast('A family already uses that name. Open Settings → Family Login and pick one.', 4500);
          return;
        }
      }
      if (!_family) { toast('Could not load family data. Please refresh and try again.', 3000); return; }
      _familyStudents = await Store.getFamilyStudents(_family.id);
    }
    if (_familyStudents.length >= 3) { toast('Maximum 3 children per family.', 2500); return; }
    showScreen('add-student');
    if (_el('add-student-title')) _el('add-student-title').textContent = 'Add Child';
    _buildAddStudentAvatarGrid('add');
    _el('add-student-id') && (_el('add-student-id').value = '');
    _fillFamilyField();
    // Pre-fill a secure suggested PIN and show it in plain text so the parent can note it down
    const _suggested = _suggestPin();
    if (_el('add-child-pin'))            _el('add-child-pin').value          = _suggested;
    if (_el('pin-suggestion-display'))   _el('pin-suggestion-display').textContent = _suggested;
    if (_el('pin-suggestion-row'))       _el('pin-suggestion-row').classList.remove('hidden');
  }

  // Hash a student's PIN via Supabase RPC (bcrypt inside the DB, 0 Netlify credits).
  // There is no plaintext fallback in ANY environment: if hashing fails we
  // surface the error rather than silently storing a readable PIN.
  async function _setStudentPin(studentId, pin) {
    const ok = await Store.setStudentPin(studentId, pin);
    if (!ok) toast('Could not save the PIN. Please try again.', 3500);
    return ok;
  }

  let _justCreated = null;

  async function saveNewStudent() {
    if (!_family) return;
    _justCreated = null;

    const name  = (_el('add-child-name')?.value     || '').trim();
    const uname = (_el('add-child-username')?.value || '').trim().toLowerCase();
    const grade = parseInt(_el('add-child-grade')?.value || '5');
    const pin   = (_el('add-child-pin')?.value      || '').trim();

    if (!name)  { toast('Please enter a name.', 2000); return; }
    if (!uname) { toast('Please enter a username.', 2000); return; }

    const existingId = _el('add-student-id')?.value;
    if (existingId) {
      // Edit mode - PIN is optional; blank = keep existing PIN
      if (pin && !/^\d{4}$/.test(pin)) { toast('PIN must be exactly 4 digits.', 2000); return; }
      if (pin && _isWeakPin(pin)) { toast('That PIN is too easy to guess — try something less obvious (not 1111, 1234, etc.).', 3500); return; }
      const updates = { displayName: name, grade, avatar: _addAvatar,
        settings: ((_familyStudents.find(s => s.id === existingId))?.settings || { lockedChapters:[], maxDifficulty:4, examDisabled:false }) };
      await Store.updateStudent(existingId, updates);
      // A failed PIN write used to be followed immediately by the success
      // toast below, which replaced the error in the same toast slot. The
      // parent walked away believing the new PIN was live while the child was
      // still on the old one - and had no way to find that out except by the
      // child failing to log in.
      if (pin && !await _setStudentPin(existingId, pin)) return;
      if (pin) _justSetPins[existingId] = pin;
      toast('Child updated! ✅', 1500);
    } else {
      // Create mode - PIN is required
      if (!/^\d{4}$/.test(pin)) { toast('PIN must be exactly 4 digits.', 2000); return; }
      if (_isWeakPin(pin)) { toast('That PIN is too easy to guess — try something less obvious (not 1111, 1234, etc.).', 3500); return; }
      const student = await Store.createStudent(_family.id, {
        username: uname, displayName: name, avatar: _addAvatar, grade, pin,
      });
      if (!student || student._error) {
        const err = student?._error;
        // PostgreSQL unique violation code = 23505
        const msg = (err?.code === '23505')
          // Same wording as _CREATE_ERRORS.username_taken: never hint at WHY a
          // name is unavailable, because one of the reasons is another family's child.
          ? 'That username is not available. Please try another.'
          : (err?.message || 'Could not create child account. Check the browser console for details.');
        toast(msg, 3500);
        return;
      }
      // Store.createStudent already hashed the PIN via set_student_pin().
      _justCreated = student;
      _justSetPins[student.id] = pin;
      toast('Child added! 🎉', 2000);
    }

    // Reload family students. The refetch is the source of truth, but a child
    // the database has definitely just accepted must not disappear because the
    // read that followed it failed - that reads as "the child was not created"
    // and invites the parent to create a duplicate.
    const fetched = await Store.getFamilyStudents(_family.id);
    if (_justCreated && !fetched.some(s => s.id === _justCreated.id)) {
      _familyStudents = [...fetched, _justCreated];
      console.warn('[auth] new child missing from the refetch — showing the created row.',
        Store.lastFamilyStudentsError?.() || '');
    } else {
      _familyStudents = fetched;
    }
    const created = _justCreated;
    _justCreated = null;
    _cacheAccountsLocally(_familyStudents);
    _openParentDashboard();

    // Straight into "send it to them" — the moment the parent has the PIN in
    // front of them is the only moment they can pass it on without resetting it.
    if (created && typeof openChildLoginModal === 'function') {
      openChildLoginModal(created, pin);
    }
  }

  async function deleteStudent(id) {
    const target = _familyStudents.find(s => s.id === id);
    if (!target) return;
    if (!confirm(`Remove ${target.display_name}'s account?\n\nThey will be signed out everywhere and disappear from your dashboard. Their progress is kept, and you can create a new child with the same name straight away.`)) return;
    const res = await Store.deleteStudent(id);
    if (res && res.ok === false) {
      toast('Could not remove the account. Please try again.', 3000);
      return;
    }
    _familyStudents = _familyStudents.filter(s => s.id !== id);
    _cacheAccountsLocally(_familyStudents);
    // A child who was open in the detail panel is gone, so go back to the grid.
    if (ACTIVE_STUDENT_ID === id) ACTIVE_STUDENT_ID = null;
    if (typeof PD !== 'undefined' && PD.closeDetail) PD.closeDetail();
    else renderParentDashboard();
    toast(`${target.display_name}'s account removed.`, 2500);
  }

  function editCurrentStudent() {
    const sess = Store.getStudentSession();
    if (sess?.id) editStudent(sess.id);
  }

  async function editStudent(id) {
    let student = (_familyStudents || []).find(s => s.id === id);
    if (!student && _sb && _family) {
      // Scope query to this family to prevent cross-family data access (H-5)
      const { data } = await _sb.from('students')
        .select('id, display_name, username, grade, avatar, session_version, family_id')
        .eq('id', id).eq('family_id', _family.id).maybeSingle();
      if (data) {
        student = data;
        _familyStudents = [...(_familyStudents || []), student];
      }
    }
    if (!student) { toast('Student not found. Try reloading the dashboard.', 3000); return; }
    showScreen('add-student');
    if (_el('add-student-title')) _el('add-student-title').textContent = `Edit - ${student.display_name}`;
    if (_el('add-student-id'))    _el('add-student-id').value = id;
    if (_el('add-child-name'))     _el('add-child-name').value     = student.display_name;
    if (_el('add-child-username')) _el('add-child-username').value  = student.username;
    if (_el('add-child-grade'))    _el('add-child-grade').value     = student.grade;
    if (_el('add-child-pin'))      _el('add-child-pin').value       = ''; // never pre-fill PIN in edit mode
    _fillFamilyField();
    if (_el('pin-suggestion-row')) _el('pin-suggestion-row').classList.add('hidden');
    _buildAddStudentAvatarGrid('add', student.avatar);
  }

  // Add-student avatar picker
  let _addAvatar = AVATARS[0];
  function _buildAddStudentAvatarGrid(prefix, selected) {
    _addAvatar = selected || AVATARS[0];
    const grid = _el('add-avatar-grid');
    if (!grid) return;
    grid._built = false;
    grid.innerHTML = AVATARS.map(a =>
      `<button type="button" class="add-av text-2xl p-1 rounded-lg border-2
        ${a === _addAvatar ? 'border-indigo-500 bg-indigo-500/20' : 'border-transparent'}
        hover:border-indigo-300 transition-colors"
        onclick="Auth._pickAddAvatar(this,'${a}')">${a}</button>`
    ).join('');
  }

  function _pickAddAvatar(btn, avatar) {
    _addAvatar = avatar;
    document.querySelectorAll('.add-av').forEach(b => {
      b.classList.toggle('border-indigo-500',  b === btn);
      b.classList.toggle('bg-indigo-500/20',   b === btn);
      b.classList.toggle('border-transparent', b !== btn);
    });
  }

  // ── Student switches back to login (logout from student) ──
  async function switchStudent() {
    _stopSessionGuard();
    await Store.endStudentSession();
    Store.clearStudentSession();
    _activeAccount    = null;
    ACTIVE_STUDENT_ID = null;
    showScreen('landing');
  }

  function switchToStudentSelect() {
    // From parent/teacher dashboard → show the student login screen
    showScreen('auth');
    setRole('student');
  }

  // ── Welcome name helper ────────────────────────
  function _setWelcomeName(name) {
    const el = _el('welcome-name');
    if (el) el.textContent = name;
  }

  // ── Parent dashboard ───────────────────────────
  // ── Parent PIN helpers ─────────────────────────
  const _PARENT_PIN_KEY = 'psac_parent_pin_v1';

  function _getStoredPinHash() {
    try { return localStorage.getItem(_PARENT_PIN_KEY) || null; } catch(_) { return null; }
  }
  function _storePin(pin) {
    try { localStorage.setItem(_PARENT_PIN_KEY, btoa(pin + ':psac_v1')); } catch(_) {}
  }
  function _pinMatches(pin) {
    return _getStoredPinHash() === btoa(pin + ':psac_v1');
  }

  function _updatePinDots(prefix, filled) {
    for (let i = 0; i < 4; i++) {
      const dot = document.getElementById(prefix + i);
      if (!dot) continue;
      if (i < filled) {
        dot.classList.add('bg-indigo-500', 'border-indigo-500');
        dot.classList.remove('border-gray-300', 'border-gray-600');
      } else {
        dot.classList.remove('bg-indigo-500', 'border-indigo-500');
        dot.classList.add('border-gray-300');
      }
    }
  }

  function _showParentPinModal() {
    _parentPinEntry = '';
    _updatePinDots('pin-dot-', 0);
    document.getElementById('pin-entry-error')?.classList.add('hidden');
    document.getElementById('modal-parent-pin')?.classList.remove('hidden');
    document.addEventListener('keydown', _parentPinKeydown);
  }

  // Escape closes; the number keys drive the pad so a parent on a laptop is not
  // forced to click twelve buttons.
  function _parentPinKeydown(e) {
    if (e.key === 'Escape')            { closeParentPin(); return; }
    if (/^[0-9]$/.test(e.key))         { _pinKey(e.key); return; }
    if (e.key === 'Backspace')         { e.preventDefault(); _pinKey('back'); }
  }

  // The child tapped "Parent" by mistake. Put them back exactly where they were:
  // no sign-out, no navigation, no PIN attempt recorded. Before this the modal
  // had no exit at all except the correct PIN or "Forgot PIN?", which signs the
  // student out of their own session.
  function closeParentPin() {
    _parentPinEntry = '';
    _updatePinDots('pin-dot-', 0);
    document.getElementById('pin-entry-error')?.classList.add('hidden');
    document.getElementById('modal-parent-pin')?.classList.add('hidden');
    document.removeEventListener('keydown', _parentPinKeydown);
  }

  function _pinKey(k) {
    document.getElementById('pin-entry-error')?.classList.add('hidden');
    if (k === 'clear')      { _parentPinEntry = ''; }
    else if (k === 'back')  { _parentPinEntry = _parentPinEntry.slice(0, -1); }
    else if (_parentPinEntry.length < 4) { _parentPinEntry += k; }
    _updatePinDots('pin-dot-', _parentPinEntry.length);
    if (_parentPinEntry.length === 4) _submitParentPin();
  }

  async function _submitParentPin() {
    if (!_pinMatches(_parentPinEntry)) {
      _parentPinEntry = '';
      _updatePinDots('pin-dot-', 0);
      document.getElementById('pin-entry-error')?.classList.remove('hidden');
      if (navigator.vibrate) navigator.vibrate([80, 40, 80]);
      return;
    }
    // Via closeParentPin so the keydown listener is detached too — otherwise
    // every digit typed on the dashboard afterwards would still feed the pad.
    closeParentPin();
    const { data: { session } } = await _sb.auth.getSession();
    if (session && !_parentUser) {
      await _handleParentSession(session);
    } else if (_parentProfile) {
      if (_family && _sb) {
        try { _familyStudents = await Store.getFamilyStudents(_family.id); _cacheAccountsLocally(_familyStudents); } catch(e) {}
      }
      _openParentDashboard();
    } else {
      toast('Your session has expired. Please sign in with your email.', 4000);
      showScreen('auth');
      setRole('parent');
    }
  }

  function _pinForgot() {
    closeParentPin();
    showScreen('auth');
    setRole('parent');
  }

  function _promptSetParentPin() {
    if (_getStoredPinHash()) return;
    setTimeout(() => {
      _parentPinStep   = 1;
      _parentPinSetup1 = '';
      _parentPinSetup2 = '';
      _updatePinDots('setup-dot-', 0);
      const label = document.getElementById('pin-setup-step-label');
      if (label) label.textContent = 'Step 1 of 2 — Enter a 4-digit PIN';
      document.getElementById('pin-setup-error')?.classList.add('hidden');
      document.getElementById('pin-setup-back')?.classList.add('hidden');
      document.getElementById('modal-parent-pin-setup')?.classList.remove('hidden');
      document.addEventListener('keydown', _pinSetupKeydown);
    }, 1800);
  }

  function _pinSetupKeydown(e) {
    if (e.key === 'Escape')    { closeParentPinSetup(); return; }
    if (/^[0-9]$/.test(e.key)) { _pinSetupKey(e.key); return; }
    if (e.key === 'Backspace') { e.preventDefault(); _pinSetupKey('back'); }
  }

  // Same contract as closeParentPin: dismissing costs nothing. The PIN is a
  // convenience shortcut, never a requirement - the parent still signs in with
  // their email either way.
  function closeParentPinSetup() {
    _parentPinStep   = 1;
    _parentPinSetup1 = '';
    _parentPinSetup2 = '';
    _updatePinDots('setup-dot-', 0);
    document.getElementById('pin-setup-error')?.classList.add('hidden');
    document.getElementById('pin-setup-back')?.classList.add('hidden');
    document.getElementById('modal-parent-pin-setup')?.classList.add('hidden');
    document.removeEventListener('keydown', _pinSetupKeydown);
  }

  // Step 2 → step 1, with the first PIN restored so it can be edited rather
  // than retyped.
  function pinSetupBack() {
    _parentPinStep   = 1;
    _parentPinSetup2 = '';
    _updatePinDots('setup-dot-', _parentPinSetup1.length);
    document.getElementById('pin-setup-error')?.classList.add('hidden');
    document.getElementById('pin-setup-back')?.classList.add('hidden');
    const label = document.getElementById('pin-setup-step-label');
    if (label) label.textContent = 'Step 1 of 2 — Enter a 4-digit PIN';
  }

  function _pinSetupKey(k) {
    const errEl = document.getElementById('pin-setup-error');
    if (errEl) errEl.classList.add('hidden');
    if (_parentPinStep === 1) {
      if (k === 'clear')     _parentPinSetup1 = '';
      else if (k === 'back') _parentPinSetup1 = _parentPinSetup1.slice(0, -1);
      else if (_parentPinSetup1.length < 4) _parentPinSetup1 += k;
      _updatePinDots('setup-dot-', _parentPinSetup1.length);
      if (_parentPinSetup1.length === 4) {
        _parentPinStep = 2;
        _updatePinDots('setup-dot-', 0);
        const label = document.getElementById('pin-setup-step-label');
        if (label) label.textContent = 'Step 2 of 2 — Confirm your PIN';
        document.getElementById('pin-setup-back')?.classList.remove('hidden');
      }
    } else {
      // Backspacing off the start of step 2 steps back to step 1, the way it
      // does in every OS passcode screen.
      if (k === 'back' && !_parentPinSetup2) { pinSetupBack(); return; }
      if (k === 'clear')     _parentPinSetup2 = '';
      else if (k === 'back') _parentPinSetup2 = _parentPinSetup2.slice(0, -1);
      else if (_parentPinSetup2.length < 4) _parentPinSetup2 += k;
      _updatePinDots('setup-dot-', _parentPinSetup2.length);
      if (_parentPinSetup2.length === 4) {
        if (_parentPinSetup1 === _parentPinSetup2) {
          _storePin(_parentPinSetup1);
          // Via closeParentPinSetup so the keydown listener goes with it.
          closeParentPinSetup();
          toast('Parent PIN set! Use it next time you tap 🔒 Parent.', 3000);
        } else {
          _parentPinSetup2 = '';
          _updatePinDots('setup-dot-', 0);
          if (errEl) errEl.classList.remove('hidden');
          _parentPinStep   = 1;
          _parentPinSetup1 = '';
          document.getElementById('pin-setup-back')?.classList.add('hidden');
          const label = document.getElementById('pin-setup-step-label');
          if (label) label.textContent = 'Step 1 of 2 — Enter a 4-digit PIN';
        }
      }
    }
  }

  async function enterParentMode() {
    if (_parentProfile) {
      if (_family && _sb) {
        try { _familyStudents = await Store.getFamilyStudents(_family.id); _cacheAccountsLocally(_familyStudents); } catch(e) {}
      }
      _openParentDashboard();
      return;
    }
    if (_getStoredPinHash()) {
      _showParentPinModal();
      return;
    }
    if (_sb) {
      const { data: { session } } = await _sb.auth.getSession();
      if (session) { await _handleParentSession(session); return; }
    }
    showScreen('auth');
    setRole('parent');
  }

  function exitParentMode() {
    if (_activeAccount) {
      showScreen('dashboard');
    } else {
      showScreen('auth');
    }
  }

  function confirmResetProgress() {
    const modal = document.getElementById('modal-reset-confirm');
    if (!modal) { resetProgress(); return; }
    const nameLine = document.getElementById('reset-confirm-name-line');
    if (nameLine) {
      const name = _activeAccount?.name || 'this student';
      nameLine.textContent = `This will permanently delete all of ${name}'s progress, badges, XP, and exam history.`;
    }
    modal.classList.remove('hidden');
  }

  async function resetProgress() {
    document.getElementById('modal-reset-confirm')?.classList.add('hidden');
    if (!ACTIVE_STUDENT_ID) return;
    Store.clearStudent(ACTIVE_STUDENT_ID);
    // Resetting PROGRESS must not reset presentation preferences, so theme is
    // carried over rather than forced back to a default. (Matches the Analytics
    // reset button, which preserves theme, assignments and parent restrictions.)
    const keepTheme = DB.theme;
    const fresh = { stats:{totalAttempted:0,totalCorrect:0,examCount:0,bestScore:0,maxStreak:0,streak:0,lastDate:null},chapters:{},examHistory:[],badges:[],theme:keepTheme,xp:0,level:1,assignments:[],restrictions:{lockedChapters:[],maxDifficulty:4,examDisabled:false} };
    Object.assign(DB, fresh);
    applyTheme(_preferredTheme(keepTheme));
    // This function is shared by two different callers: the student's own
    // Analytics reset button, and the parent dashboard's per-child Progress
    // tab. A parent session (_parentProfile set) got here via pdSwitchStudent,
    // which is called with navigate:false specifically so previewing a child
    // never leaves the parent dashboard - showScreen('dashboard') would break
    // that contract and dump the parent into the child's own dashboard screen.
    if (_parentProfile) {
      if (typeof PD !== 'undefined') PD.selectChild(ACTIVE_STUDENT_ID);
    } else {
      renderDashboard();
      updateXPBar();
      showScreen('dashboard');
    }
    toast('Progress reset. 🗑', 2000);
  }

  // Danger-zone delete from the parent dashboard's Controls tab - a thin
  // wrapper so the button can call a no-arg action like the other Controls
  // toggles, matching editCurrentStudent()'s pattern for the same reason.
  function deleteCurrentStudent() {
    if (ACTIVE_STUDENT_ID) deleteStudent(ACTIVE_STUDENT_ID);
  }

  // ── Parent dashboard tab switching ────────────
  function pdTab(tab) {
    document.querySelectorAll('.pd-tab').forEach(b => {
      const active = b.dataset.tab === tab;
      b.classList.toggle('bg-white',           active);
      b.classList.toggle('dark:bg-gray-700',   active);
      b.classList.toggle('shadow-sm',          active);
      b.classList.toggle('font-semibold',      active);
      b.classList.toggle('text-gray-800',      active);
      b.classList.toggle('dark:text-white',    active);
      b.classList.toggle('text-gray-500',     !active);
    });
    document.querySelectorAll('.pd-tab-content').forEach(c => {
      c.classList.toggle('hidden', c.dataset.tab !== tab);
    });
  }

  async function pdSwitchStudent(id) {
    const student = _familyStudents.find(s => s.id === id);
    if (student) {
      await _loginStudentRow(student, { navigate: false, bumpSession: false, applyUserTheme: false, headerChip: false });
    } else {
      loginStudent(id);
    }
    // Caller (PD.selectChild or _openParentDashboard) is responsible for UI update
  }

  // ── Update assignment chapter dropdown when subject changes ──
  function pdUpdateAssignChapters() {
    const subj = document.getElementById('pd-assign-subject')?.value;
    const pack = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : []).find(p => p.id === subj);
    if (typeof _pdFillAssignChapters !== 'undefined') _pdFillAssignChapters(pack);
  }

  // ── Parent assignments ────────────────────────
  async function addAssignment() {
    const subjId = (_el('pd-assign-subject')?.value || '') || null;
    const chId   = (_el('pd-assign-chapter')?.value  || '') || null;
    const diff   = parseInt(_el('pd-assign-diff')?.value || '0') || null;
    const note        = (_el('pd-assign-note')?.value || '').trim();
    const showAnswers = _el('pd-assign-show-answers')?.checked !== false;
    const showHints   = _el('pd-assign-show-hints')?.checked   !== false;
    if (!chId && !diff) { toast('Select a chapter or difficulty.', 2000); return; }
    if (!ACTIVE_STUDENT_ID) { toast('Select a student first.', 2000); return; }
    const profile = _parentProfile;
    const result  = await Store.createAssignment(ACTIVE_STUDENT_ID, profile?.id, {
      subjectId: subjId, chapterId: chId, difficulty: diff, note, showAnswers, showHints,
    });
    if (!result) { toast('Could not save. Please try again.', 2500); return; }
    if (_el('pd-assign-note')) _el('pd-assign-note').value = '';
    if (typeof PD !== 'undefined') PD.renderDetail();
    toast('Assignment added! 📋', 1500);
  }

  async function removeAssignment(id) {
    const res = await Store.deleteAssignment(id);
    if (typeof PD !== 'undefined') PD.renderDetail();
    toast(res?.ok ? 'Assignment removed.' : 'Could not remove that assignment. Please try again.',
      res?.ok ? 1500 : 3000);
  }

  // ── Access controls ────────────────────────────
  // Keeps the cached student row in step with DB.restrictions and repaints ONLY
  // the Controls tab. It used to call renderParentDashboard(), which hides
  // pd-detail-panel — so every toggle bounced the parent back to the children
  // grid mid-edit.
  function _syncCachedSettings() {
    const row = _familyStudents.find(s => s.id === ACTIVE_STUDENT_ID);
    if (row) row.settings = DB.restrictions;
    if (typeof PD !== 'undefined' && PD.refreshControls) PD.refreshControls();
  }

  function _ensureRestrictions() {
    DB.restrictions = DB.restrictions || { lockedChapters:[], maxDifficulty:4, examDisabled:false };
    DB.restrictions.lockedChapters = DB.restrictions.lockedChapters || [];
    return DB.restrictions;
  }

  // Every Controls toggle mutates DB.restrictions in memory and then persists
  // it. Each one used to announce success whether or not the write landed - so
  // a parent could lock exam mode, read "🔒 Exam mode locked", and have the
  // child sit an exam anyway. On failure the in-memory change is rolled back
  // too, because a switch left ON over a server that still says OFF is the same
  // lie one repaint later.
  async function _saveRestrictions(prevJson, okMsg) {
    if (ACTIVE_STUDENT_ID) {
      const res = await Store.updateStudent(ACTIVE_STUDENT_ID, { settings: DB.restrictions });
      if (!res?.ok) {
        DB.restrictions = JSON.parse(prevJson);
        if (typeof PD !== 'undefined' && PD.refreshControls) PD.refreshControls();
        toast('Could not save that change — check your connection and try again.', 3000);
        return false;
      }
    }
    _syncCachedSettings();
    toast(okMsg, 1500);
    return true;
  }

  async function toggleChapterLock(chapterId, lock) {
    // A chapter the admin has switched off — globally, or for this family's plan
    // tier — is not the parent's to unlock. The checkbox is rendered disabled,
    // but a disabled attribute is one devtools edit away from gone, so refuse
    // here too. The real enforcement is server-side: netlify/functions/questions.js
    // never serves those questions in the first place.
    if (!lock && typeof _adminBlocksChapter === 'function' && _adminBlocksChapter(chapterId)) {
      toast('🔒 This chapter is disabled by the administrator.', 2500);
      if (typeof PD !== 'undefined' && PD.refreshControls) PD.refreshControls();
      return;
    }
    const r    = _ensureRestrictions();
    const prev = JSON.stringify(r);
    if (lock) { if (!r.lockedChapters.includes(chapterId)) r.lockedChapters.push(chapterId); }
    else        r.lockedChapters = r.lockedChapters.filter(id => id !== chapterId);
    // Persist the restriction only - NOT save(DB). DB here is a snapshot taken
    // when the parent opened this child's panel; if the child is practising
    // concurrently on another device, save(DB) would silently overwrite their
    // newer XP/streak/chapter progress with this stale copy. The in-memory
    // mutation above already updates this screen; Store.updateStudent patches
    // just the settings column server-side.
    await _saveRestrictions(prev, lock ? '🔒 Chapter locked.' : '🔓 Chapter unlocked.');
  }

  async function setMaxDifficulty(level) {
    const r    = _ensureRestrictions();
    const prev = JSON.stringify(r);
    r.maxDifficulty = parseInt(level);
    // See toggleChapterLock for why this doesn't also call save(DB).
    await _saveRestrictions(prev, `Max difficulty set to Level ${level}.`);
  }

  async function toggleExamDisabled() {
    const r    = _ensureRestrictions();
    const prev = JSON.stringify(r);
    r.examDisabled = !r.examDisabled;
    // See toggleChapterLock for why this doesn't also call save(DB).
    await _saveRestrictions(prev, r.examDisabled ? '🔒 Exam mode locked.' : '🔓 Exam mode unlocked.');
  }

  async function toggleCrossGradeSearch() {
    const r    = _ensureRestrictions();
    const prev = JSON.stringify(r);
    r.crossGradeSearch = !r.crossGradeSearch;
    // See toggleChapterLock for why this doesn't also call save(DB).
    await _saveRestrictions(prev, r.crossGradeSearch ? '🔍 Cross-grade search enabled.' : '🔒 Cross-grade search off.');
  }

  async function toggleCrossGradePractice() {
    const r    = _ensureRestrictions();
    const prev = JSON.stringify(r);
    r.crossGradePractice = !r.crossGradePractice;
    // See toggleChapterLock for why this doesn't also call save(DB).
    await _saveRestrictions(prev, r.crossGradePractice ? '📚 Cross-grade revision enabled.' : '🔒 Cross-grade revision off.');
  }

  async function toggleHintsDisabled() {
    const r    = _ensureRestrictions();
    const prev = JSON.stringify(r);
    r.hintsDisabled = !r.hintsDisabled;
    await _saveRestrictions(prev, r.hintsDisabled ? '💡 In-app hints off.' : '💡 In-app hints on.');
  }

  // ── Auth helpers ───────────────────────────────
  function _showAuthError(msg) {
    const el = _el('auth-error');
    if (el) { el.textContent = msg; el.classList.remove('hidden'); }
  }

  function _clearAuthError() {
    const el = _el('auth-error');
    if (el) { el.textContent = ''; el.classList.add('hidden'); }
    _el('auth-goto-signin')?.classList.add('hidden');
  }

  function _setAuthLoading(on) {
    const btns = document.querySelectorAll('#screen-auth button[onclick]');
    btns.forEach(b => b.disabled = on);
    // When loading ends, re-evaluate the student button — it must only be
    // re-enabled if both fields are still filled, not unconditionally.
    if (!on) checkStudentReady();
  }

  // Enter key on login
  document.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const authVisible = !_el('screen-auth')?.classList.contains('hidden');
    if (!authVisible) return;
    if (_currentRole === 'student') {
      studentSignIn();
    } else {
      if (!_el('auth-signup-fields')?.classList.contains('hidden')) emailSignUp();
      else emailSignIn();
    }
  });

  return {
    init, getActiveAccount, getParentProfile, getFamily, getPlanFeatures,
    // Auth screen
    setRole, showSignIn, showSignUp, emailSignIn, emailSignUp,
    showForgotPassword, backToSignIn, forgotPassword, backToSignUp,
    resendVerification, setNewPassword, togglePass,
    googleSignIn, openAdminPanel, openTeacherDashboard,
    requestTeacherAccess, getTeacherStatus, restoreAccount, refreshAdminBadge: _refreshAdminBadge,
    isTeacher: () => _isTeacherUser,
    openPasswordModal, closePasswordModal, changePassword,
    openInviteModal, closeInviteModal, copyInviteLink, shareInvite, shareInviteWhatsApp,
    confirmResetStudentProgress,
    studentSignIn, onPinInput, checkStudentReady,
    // Family setup
    completeSetup, _pickSetupAvatar,
    // Add/edit student
    addStudent, saveNewStudent, deleteStudent, editStudent, editCurrentStudent, deleteCurrentStudent, suggestPin,
    suggestChildPin, setCurrentChildPin, getJustSetPin,
    reloadStudents,
    _pickAddAvatar,
    // Session
    loginStudent, logout, switchStudent, switchToStudentSelect,
    // Parent mode
    enterParentMode, exitParentMode, resetProgress, confirmResetProgress,
    _pinKey, _pinSetupKey, _pinForgot, closeParentPin, closeParentPinSetup, pinSetupBack,
    pdTab, pdSwitchStudent,
    getStudents: () => _familyStudents,
    isSuperAdmin: () => _isSuperAdmin,
    addAssignment, removeAssignment, pdUpdateAssignChapters,
    toggleChapterLock, setMaxDifficulty, toggleExamDisabled,
    toggleCrossGradeSearch, toggleCrossGradePractice, toggleHintsDisabled,
    // Biometric lock
    attemptBiometricUnlock: _attemptBiometricUnlock, biometricUsePassword,
    enableBiometricLogin, disableBiometricLogin,
    enableStudentBiometricLogin, disableStudentBiometricLogin,
  };
})();

// Start app
Auth.init();
