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
  let _pinAttempts         = 0;
  let _pinLockedUntil      = 0;

  function _el(id) { return document.getElementById(id); }

  function getActiveAccount()  { return _activeAccount; }
  function getParentProfile()  { return _parentProfile; }

  // ── App init ───────────────────────────────────
  async function init() {
    // Show a loading state so there's no blank flash
    document.body.style.opacity = '0';

    // 1. Listen for Supabase auth state changes (email verification callback lands here)
    if (_sb) {
      _sb.auth.onAuthStateChange(async (event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          showScreen('reset-password');
          return;
        }
        if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session && !_parentUser) {
          await _handleParentSession(session);
        } else if (event === 'SIGNED_OUT') {
          _parentUser    = null;
          _parentProfile = null;
          _family        = null;
          _familyStudents = [];
          Store.clearStudentSession();
          _activeAccount = null;
          showScreen('auth');
        }
      });

      // 2. Check existing Supabase session (parent/teacher logged in)
      const { data: { session } } = await _sb.auth.getSession();
      if (session) {
        document.body.style.opacity = '1';
        await _handleParentSession(session);
        return;
      }
    }

    // 3. Check stored student session (PIN login persists across refresh)
    const studentSess = Store.getStudentSession();
    if (studentSess) {
      document.body.style.opacity = '1';
      await _resumeStudent(studentSess);
      return;
    }

    document.body.style.opacity = '1';
    showScreen('landing');
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
      showScreen('family-setup');
      return;
    }

    _parentProfile = profile;

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

  function _openParentDashboard() {
    renderParentDashboard();
    showScreen('parent');
    const hdrLogout = document.getElementById('header-logout-btn');
    if (hdrLogout) { hdrLogout.classList.remove('hidden'); hdrLogout.classList.add('flex'); }
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

  function _startSessionGuard(studentId, version) {
    _stopSessionGuard(); // clear any previous guard first
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

    _sessionGuardTimer    = setInterval(_checkVersion, 5 * 60 * 1000);
    _sessionGuardOnlineFn = _checkVersion;
    window.addEventListener('online', _sessionGuardOnlineFn);
  }

  function _stopSessionGuard() {
    if (_sessionGuardTimer)    { clearInterval(_sessionGuardTimer); _sessionGuardTimer = null; }
    if (_sessionGuardOnlineFn) { window.removeEventListener('online', _sessionGuardOnlineFn); _sessionGuardOnlineFn = null; }
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
  async function _loginStudentRow(studentRow, { navigate = true, bumpSession = true, token = null, applyUserTheme = true } = {}) {
    let sessionVersion = studentRow.session_version || 0;

    // Bump session_version in DB to invalidate any existing sessions on other devices
    if (bumpSession && _sb) {
      try {
        sessionVersion = sessionVersion + 1;
        await _sb.from('students').update({ session_version: sessionVersion }).eq('id', studentRow.id);
      } catch(_) { /* offline — keep existing version */ }
    }

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

    // Fetch global settings (disabled grades/subjects set by admin)
    Store.getGlobalSettings().then(gs => { window.GLOBAL_SETTINGS = gs || {}; }).catch(() => {});

    // Pre-load questions for this student's grade
    const studentGrade = studentRow.grade || 5;
    if (typeof QuestionLoader !== 'undefined') {
      QuestionLoader.loadForStudent(studentGrade).catch(() => {});
    }

    // Show header logout button
    const hdrLogout = document.getElementById('header-logout-btn');
    if (hdrLogout) { hdrLogout.classList.remove('hidden'); hdrLogout.classList.add('flex'); }
    Store.logLoginEvent(studentRow.id, 'student');
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
    // onAuthStateChange handles routing
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
  async function studentSignIn() {
    if (!_sb) return;

    // Client-side lockout: first line of defence (server is the real gate)
    if (Date.now() < _pinLockedUntil) {
      const secs = Math.ceil((_pinLockedUntil - Date.now()) / 1000);
      _showAuthError(`Too many wrong PINs. Please wait ${secs} seconds.`);
      return;
    }

    const username = (_el('student-username')?.value || '').trim();
    const pin      = (_el('student-pin')?.value      || '').trim();
    if (!username) { _showAuthError('Please enter your username.'); return; }
    if (!pin)      { _showAuthError('Please enter your PIN.');      return; }

    _setAuthLoading(true);

    // Single verification path for EVERY environment: verify_student_pin(),
    // which (after supabase-fold-token-into-verify.sql) delegates the credential
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
    const { data, error } = await _sb.rpc('verify_student_pin', { p_username: username, p_pin: pin });
    _setAuthLoading(false);

    if (error) {
      // 42883 = undefined_function. Transient right after the RPC is created,
      // while PostgREST's schema cache catches up - and permanent if
      // supabase-student-session-rpc.sql was never run at all. Distinguish it,
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
        _showAuthError(`Username or PIN is incorrect. ${left} attempt${left === 1 ? '' : 's'} left.`);
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
      console.error('[auth] mint_student_session returned no session_token - run supabase-student-session-rpc.sql');
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

    // Create family
    const family = await Store.createFamily(_parentUser.id, familyName);
    if (!family) { toast('Error creating family. Please try again.', 3000); return; }
    _family = family;

    // Create first student
    const student = await Store.createStudent(family.id, {
      username: childUser, displayName: childName,
      avatar: _setupAvatar, grade: childGrade, pin: childPin,
    });
    if (!student || student._error) {
      const err = student?._error;
      const msg = (err?.code === '23505')
        ? 'That username is already taken. Please choose another.'
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
    _isAdminUser      = false;
    _isSuperAdmin     = false;
    _isTeacherUser    = false;
    _teacherStatus    = 'none';
    // Re-hide the privileged buttons, or they persist into the next session on
    // a shared device.
    ['btn-open-teacher', 'btn-open-admin'].forEach(id => {
      const b = document.getElementById(id);
      if (b) { b.classList.add('hidden'); b.classList.remove('flex'); }
    });
    const hdrLogout = document.getElementById('header-logout-btn');
    if (hdrLogout) { hdrLogout.classList.add('hidden'); hdrLogout.classList.remove('flex'); }
    if (_sb) await _sb.auth.signOut();
    showScreen('landing');
  }

  // ── Parent adds/manages children ───────────────
  async function addStudent() {
    if (!_family) {
      // Family may not have loaded yet - retry with explicit parent ID fallback
      _family = await Store.getMyFamily(_parentUser?.id);
      if (!_family && _parentUser) {
        // Still null - could be a fresh account that skipped setup, create a default family
        const name = _parentProfile?.full_name || _parentUser.email?.split('@')[0] || 'My Family';
        _family = await Store.createFamily(_parentUser.id, `${name}'s Family`);
      }
      if (!_family) { toast('Could not load family data. Please refresh and try again.', 3000); return; }
      _familyStudents = await Store.getFamilyStudents(_family.id);
    }
    if (_familyStudents.length >= 3) { toast('Maximum 3 children per family.', 2500); return; }
    showScreen('add-student');
    if (_el('add-student-title')) _el('add-student-title').textContent = 'Add Child';
    _buildAddStudentAvatarGrid('add');
    _el('add-student-id') && (_el('add-student-id').value = '');
  }

  // Hash a student's PIN via Supabase RPC (bcrypt inside the DB, 0 Netlify credits).
  // There is no plaintext fallback in ANY environment: if hashing fails we
  // surface the error rather than silently storing a readable PIN.
  async function _setStudentPin(studentId, pin) {
    const ok = await Store.setStudentPin(studentId, pin);
    if (!ok) toast('Could not save the PIN. Please try again.', 3500);
    return ok;
  }

  async function saveNewStudent() {
    if (!_family) return;

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
      const updates = { displayName: name, grade, avatar: _addAvatar,
        settings: ((_familyStudents.find(s => s.id === existingId))?.settings || { lockedChapters:[], maxDifficulty:4, examDisabled:false }) };
      await Store.updateStudent(existingId, updates);
      if (pin) await _setStudentPin(existingId, pin);
      toast('Child updated! ✅', 1500);
    } else {
      // Create mode - PIN is required
      if (!/^\d{4}$/.test(pin)) { toast('PIN must be exactly 4 digits.', 2000); return; }
      const student = await Store.createStudent(_family.id, {
        username: uname, displayName: name, avatar: _addAvatar, grade, pin,
      });
      if (!student || student._error) {
        const err = student?._error;
        // PostgreSQL unique violation code = 23505
        const msg = (err?.code === '23505')
          ? 'Username already taken in this family.'
          : (err?.message || 'Could not create child account. Check the browser console for details.');
        toast(msg, 3500);
        return;
      }
      // Store.createStudent already hashed the PIN via set_student_pin().
      toast('Child added! 🎉', 2000);
    }

    // Reload family students
    _familyStudents = await Store.getFamilyStudents(_family.id);
    _cacheAccountsLocally(_familyStudents);
    _openParentDashboard();
  }

  async function deleteStudent(id) {
    const target = _familyStudents.find(s => s.id === id);
    if (!target) return;
    if (!confirm(`Delete ${target.display_name}'s account and all their progress?`)) return;
    await Store.deleteStudent(id);
    _familyStudents = _familyStudents.filter(s => s.id !== id);
    _cacheAccountsLocally(_familyStudents);
    renderParentDashboard();
    toast(`${target.display_name}'s account deleted.`, 2000);
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
    if (_el('add-child-pin'))      _el('add-child-pin').value       = ''; // never pre-fill PIN
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
  async function enterParentMode() {
    if (_parentProfile) {
      // Refresh student list so edit/switch always has current data
      if (_family && _sb) {
        try {
          _familyStudents = await Store.getFamilyStudents(_family.id);
          _cacheAccountsLocally(_familyStudents);
        } catch(e) {}
      }
      _openParentDashboard();
    } else {
      // Prompt for parent login
      showScreen('auth');
      setRole('parent');
    }
  }

  function exitParentMode() {
    if (_activeAccount) {
      showScreen('dashboard');
    } else {
      showScreen('auth');
    }
  }

  async function resetProgress() {
    if (!ACTIVE_STUDENT_ID) return;
    if (!confirm('Delete ALL progress for this student? This cannot be undone.')) return;
    if (!confirm('Final confirmation - all chapters, XP and badges will be permanently lost.')) return;
    Store.clearStudent(ACTIVE_STUDENT_ID);
    // Resetting PROGRESS must not reset presentation preferences, so theme is
    // carried over rather than forced back to a default. (Matches the Analytics
    // reset button, which preserves theme, assignments and parent restrictions.)
    const keepTheme = DB.theme;
    const fresh = { stats:{totalAttempted:0,totalCorrect:0,examCount:0,bestScore:0,maxStreak:0,streak:0,lastDate:null},chapters:{},examHistory:[],badges:[],theme:keepTheme,xp:0,level:1,assignments:[],restrictions:{lockedChapters:[],maxDifficulty:4,examDisabled:false} };
    Object.assign(DB, fresh);
    applyTheme(_preferredTheme(keepTheme));
    renderDashboard();
    updateXPBar();
    showScreen('dashboard');
    toast('Progress reset. 🗑', 2000);
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
      await _loginStudentRow(student, { navigate: false, bumpSession: false, applyUserTheme: false });
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
    if (!chId && !diff) { toast('Select a chapter or difficulty.', 2000); return; }
    if (!ACTIVE_STUDENT_ID) { toast('Select a student first.', 2000); return; }
    const profile = _parentProfile;
    const result  = await Store.createAssignment(ACTIVE_STUDENT_ID, profile?.id, {
      subjectId: subjId, chapterId: chId, difficulty: diff, note, showAnswers,
    });
    if (!result) { toast('Could not save. Please try again.', 2500); return; }
    if (_el('pd-assign-note')) _el('pd-assign-note').value = '';
    if (typeof PD !== 'undefined') PD.renderDetail();
    toast('Assignment added! 📋', 1500);
  }

  async function removeAssignment(id) {
    await Store.deleteAssignment(id);
    if (typeof PD !== 'undefined') PD.renderDetail();
    toast('Assignment removed.', 1500);
  }

  // ── Access controls ────────────────────────────
  async function toggleChapterLock(chapterId, lock) {
    const r = DB.restrictions = DB.restrictions || { lockedChapters:[], maxDifficulty:4, examDisabled:false };
    r.lockedChapters = r.lockedChapters || [];
    if (lock) { if (!r.lockedChapters.includes(chapterId)) r.lockedChapters.push(chapterId); }
    else        r.lockedChapters = r.lockedChapters.filter(id => id !== chapterId);
    save(DB);
    // Sync restriction to student record in Supabase
    if (ACTIVE_STUDENT_ID) await Store.updateStudent(ACTIVE_STUDENT_ID, { settings: r });
    renderParentDashboard();
    toast(lock ? '🔒 Chapter locked.' : '🔓 Chapter unlocked.', 1500);
  }

  async function setMaxDifficulty(level) {
    DB.restrictions = DB.restrictions || { lockedChapters:[], maxDifficulty:4, examDisabled:false };
    DB.restrictions.maxDifficulty = parseInt(level);
    save(DB);
    if (ACTIVE_STUDENT_ID) await Store.updateStudent(ACTIVE_STUDENT_ID, { settings: DB.restrictions });
    toast(`Max difficulty set to Level ${level}.`, 1500);
  }

  async function toggleExamDisabled() {
    DB.restrictions = DB.restrictions || { lockedChapters:[], maxDifficulty:4, examDisabled:false };
    DB.restrictions.examDisabled = !DB.restrictions.examDisabled;
    save(DB);
    if (ACTIVE_STUDENT_ID) await Store.updateStudent(ACTIVE_STUDENT_ID, { settings: DB.restrictions });
    renderParentDashboard();
    toast(DB.restrictions.examDisabled ? '🔒 Exam mode locked.' : '🔓 Exam mode unlocked.', 1500);
  }

  async function toggleCrossGradeSearch() {
    DB.restrictions = DB.restrictions || { lockedChapters:[], maxDifficulty:4, examDisabled:false };
    DB.restrictions.crossGradeSearch = !DB.restrictions.crossGradeSearch;
    save(DB);
    if (ACTIVE_STUDENT_ID) await Store.updateStudent(ACTIVE_STUDENT_ID, { settings: DB.restrictions });
    renderParentDashboard();
    toast(DB.restrictions.crossGradeSearch ? '🔍 Cross-grade search enabled.' : '🔒 Cross-grade search off.', 1500);
  }

  async function toggleCrossGradePractice() {
    DB.restrictions = DB.restrictions || { lockedChapters:[], maxDifficulty:4, examDisabled:false };
    DB.restrictions.crossGradePractice = !DB.restrictions.crossGradePractice;
    save(DB);
    if (ACTIVE_STUDENT_ID) await Store.updateStudent(ACTIVE_STUDENT_ID, { settings: DB.restrictions });
    renderParentDashboard();
    toast(DB.restrictions.crossGradePractice ? '📚 Cross-grade revision enabled.' : '🔒 Cross-grade revision off.', 1500);
  }

  // ── Auth helpers ───────────────────────────────
  function _showAuthError(msg) {
    const el = _el('auth-error');
    if (el) { el.textContent = msg; el.classList.remove('hidden'); }
  }

  function _clearAuthError() {
    const el = _el('auth-error');
    if (el) { el.textContent = ''; el.classList.add('hidden'); }
  }

  function _setAuthLoading(on) {
    const btns = document.querySelectorAll('#screen-auth button[onclick]');
    btns.forEach(b => b.disabled = on);
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
    init, getActiveAccount, getParentProfile,
    // Auth screen
    setRole, showSignIn, showSignUp, emailSignIn, emailSignUp,
    showForgotPassword, backToSignIn, forgotPassword, backToSignUp,
    resendVerification, setNewPassword, togglePass,
    googleSignIn, openAdminPanel, openTeacherDashboard,
    requestTeacherAccess, getTeacherStatus, refreshAdminBadge: _refreshAdminBadge,
    isTeacher: () => _isTeacherUser,
    openPasswordModal, closePasswordModal, changePassword,
    confirmResetStudentProgress,
    studentSignIn,
    // Family setup
    completeSetup, _pickSetupAvatar,
    // Add/edit student
    addStudent, saveNewStudent, deleteStudent, editStudent, editCurrentStudent,
    _pickAddAvatar,
    // Session
    loginStudent, logout, switchStudent, switchToStudentSelect,
    // Parent mode
    enterParentMode, exitParentMode, resetProgress,
    pdTab, pdSwitchStudent,
    getStudents: () => _familyStudents,
    isSuperAdmin: () => _isSuperAdmin,
    addAssignment, removeAssignment, pdUpdateAssignChapters,
    toggleChapterLock, setMaxDifficulty, toggleExamDisabled,
    toggleCrossGradeSearch, toggleCrossGradePractice,
  };
})();

// Start app
Auth.init();
