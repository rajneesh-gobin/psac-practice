'use strict';
// ══════════════════════════════════════════════
//  MathMaster — Auth
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

  let _activeAccount       = null;  // { id, name, avatar } — current student
  let _currentRole         = 'parent'; // selected tab on auth screen
  let _setupAvatar         = AVATARS[0];
  let _pendingVerifyEmail  = ''; // email stored for resend verification

  function _el(id) { return document.getElementById(id); }

  function getActiveAccount() { return _activeAccount; }

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
    showScreen('auth');
  }

  // ── Handle parent/teacher Supabase session ─────
  async function _handleParentSession(session) {
    _parentUser = session.user;

    const profile = await Store.getProfile(_parentUser.id);
    if (!profile) {
      // Brand-new user after email verification — needs family setup
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

    if (profile.role === 'admin') {
      showScreen('admin');
      if (typeof AdminPanel !== 'undefined') AdminPanel.render();
      return;
    }

    if (profile.role === 'teacher') {
      _loadTeacherDashboard();
      return;
    }

    // Parent — load family + students
    _family = await Store.getMyFamily();
    if (_family) {
      _familyStudents = await Store.getFamilyStudents(_family.id);
      _cacheAccountsLocally(_familyStudents);
    }

    _openParentDashboard();
  }

  function _loadTeacherDashboard() {
    showScreen('teacher');
    if (typeof TeacherMode !== 'undefined') TeacherMode.render();
  }

  function _openParentDashboard() {
    renderParentDashboard();
    showScreen('parent');
  }

  // ── Cache Supabase students as local accounts ──
  // Keeps existing renderStudentSelect() / renderParentDashboard() working
  function _cacheAccountsLocally(students) {
    const accounts = students.map(s => ({ id: s.id, name: s.display_name, avatar: s.avatar }));
    Store.saveAccounts(accounts);
  }

  // ── Resume a stored student session ───────────
  async function _resumeStudent(sess) {
    _activeAccount    = { id: sess.id, name: sess.displayName, avatar: sess.avatar };
    ACTIVE_STUDENT_ID = sess.id;

    // Load progress from Supabase (or localStorage cache)
    const progress = await Store.loadStudentProgress(sess.id);
    Object.assign(DB, progress);

    applyTheme(DB.theme || 'light');
    renderDashboard();
    updateStreak();
    updateXPBar();
    _setWelcomeName(sess.displayName);

    // Pre-load questions for this student's grade
    if (typeof QuestionLoader !== 'undefined') {
      QuestionLoader.loadForStudent(sess.grade).catch(() => {});
    }

    const startScreen = (typeof SUBJECT_PACKS !== 'undefined' && SUBJECT_PACKS.length > 1)
      ? 'grade-select' : 'dashboard';
    showScreen(startScreen);
  }

  // ── Login a student (after PIN verified) ──────
  async function _loginStudentRow(studentRow) {
    const sess = {
      id:          studentRow.id,
      displayName: studentRow.display_name,
      avatar:      studentRow.avatar,
      grade:       studentRow.grade,
      settings:    studentRow.settings,
    };
    Store.saveStudentSession(sess);

    // Apply parent restrictions to DB
    const progress = await Store.loadStudentProgress(studentRow.id);
    const merged   = Object.assign(progress, { restrictions: studentRow.settings });
    Object.assign(DB, merged);

    _activeAccount    = { id: studentRow.id, name: studentRow.display_name, avatar: studentRow.avatar };
    ACTIVE_STUDENT_ID = studentRow.id;

    applyTheme(DB.theme || 'dark');
    renderDashboard();
    updateStreak();
    updateXPBar();
    _setWelcomeName(studentRow.display_name);

    // Fetch global settings (disabled grades/subjects set by admin)
    Store.getGlobalSettings().then(gs => { window.GLOBAL_SETTINGS = gs || {}; }).catch(() => {});

    // Pre-load questions for this student's grade
    if (typeof QuestionLoader !== 'undefined') {
      QuestionLoader.loadForStudent(studentRow.grade).catch(() => {});
    }

    const startScreen = (typeof SUBJECT_PACKS !== 'undefined' && SUBJECT_PACKS.length > 1)
      ? 'grade-select' : 'dashboard';
    showScreen(startScreen);
  }

  // ── Public: loginStudent by id (called from student-select cards) ──
  function loginStudent(id) {
    const student = _familyStudents.find(s => s.id === id);
    if (student) {
      _loginStudentRow(student);
    } else {
      // Fallback for old localStorage-based flow
      const accounts = Store.getAccounts();
      const account  = accounts.find(a => a.id === id);
      if (account) {
        _activeAccount    = account;
        ACTIVE_STUDENT_ID = account.id;
        const data = Store.loadStudent(account.id);
        Object.assign(DB, data);
        applyTheme(DB.theme || 'light');
        renderDashboard();
        updateStreak();
        updateXPBar();
        showScreen((typeof SUBJECT_PACKS !== 'undefined' && SUBJECT_PACKS.length > 1) ? 'grade-select' : 'dashboard');
        _setWelcomeName(account.name);
      }
    }
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
    if (!name)              { _showAuthError('Please enter your name.'); return; }
    if (!email)             { _showAuthError('Please enter your email.'); return; }
    if (pass.length < 6)   { _showAuthError('Password must be at least 6 characters.'); return; }

    // Check if registrations are open
    const gs = await Store.getGlobalSettings();
    if (gs && gs.registration_open === false) {
      _showAuthError('New registrations are currently closed. Please try again later.');
      return;
    }

    const role = _currentRole === 'teacher' ? 'teacher' : 'parent';

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
    showScreen('verify-email');
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

  // ── Student login (username + PIN — no family code needed) ────────
  async function studentSignIn() {
    if (!_sb) return;
    const username = (_el('student-username')?.value || '').trim();
    const pin      = (_el('student-pin')?.value      || '').trim();
    if (!username) { _showAuthError('Please enter your username.'); return; }
    if (!pin)      { _showAuthError('Please enter your PIN.');      return; }

    _setAuthLoading(true);
    const student = await Store.findStudentByUsername(username);
    _setAuthLoading(false);

    if (!student) { _showAuthError('Username not found. Ask your parent to check the spelling.'); return; }
    if (pin !== student.pin) {
      _showAuthError('Wrong PIN. Try again.');
      if (_el('student-pin')) _el('student-pin').value = '';
      return;
    }

    _clearAuthError();
    await _loginStudentRow(student);
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
    if (!student) { toast('Error creating student. Username may already exist.', 3000); return; }

    _familyStudents = [student];
    _cacheAccountsLocally(_familyStudents);

    toast(`Family set up! Family code: ${family.family_code} 🎉`, 5000);
    launchConfetti();
    _openParentDashboard();
  }

  // ── Logout ─────────────────────────────────────
  async function logout() {
    Store.clearStudentSession();
    _activeAccount    = null;
    ACTIVE_STUDENT_ID = null;
    _parentUser       = null;
    _parentProfile    = null;
    _family           = null;
    _familyStudents   = [];
    if (_sb) await _sb.auth.signOut();
    showScreen('auth');
  }

  // ── Parent adds/manages children ───────────────
  async function addStudent() {
    if (!_family) return;
    if (_familyStudents.length >= 3) { toast('Maximum 3 children per family.', 2500); return; }
    showScreen('add-student');
    if (_el('add-student-title')) _el('add-student-title').textContent = 'Add Child';
    _buildAddStudentAvatarGrid('add');
    _el('add-student-id') && (_el('add-student-id').value = '');
  }

  async function saveNewStudent() {
    if (!_family) return;

    const name  = (_el('add-child-name')?.value     || '').trim();
    const uname = (_el('add-child-username')?.value || '').trim().toLowerCase();
    const grade = parseInt(_el('add-child-grade')?.value || '5');
    const pin   = (_el('add-child-pin')?.value      || '').trim();

    if (!name)              { toast('Please enter a name.', 2000); return; }
    if (!uname)             { toast('Please enter a username.', 2000); return; }
    if (!/^\d{4}$/.test(pin)) { toast('PIN must be exactly 4 digits.', 2000); return; }

    const existingId = _el('add-student-id')?.value;
    if (existingId) {
      // Edit mode
      await Store.updateStudent(existingId, {
        displayName: name, grade, pin,
        avatar: _addAvatar,
        settings: ((_familyStudents.find(s => s.id === existingId))?.settings || { lockedChapters:[], maxDifficulty:4, examDisabled:false }),
      });
      toast('Child updated! ✅', 1500);
    } else {
      // Create mode
      const student = await Store.createStudent(_family.id, {
        username: uname, displayName: name, avatar: _addAvatar, grade, pin,
      });
      if (!student) { toast('Username already taken in this family.', 2500); return; }
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

  function editStudent(id) {
    const student = _familyStudents.find(s => s.id === id);
    if (!student) return;
    showScreen('add-student');
    if (_el('add-student-title')) _el('add-student-title').textContent = `Edit — ${student.display_name}`;
    if (_el('add-student-id'))    _el('add-student-id').value = id;
    if (_el('add-child-name'))     _el('add-child-name').value     = student.display_name;
    if (_el('add-child-username')) _el('add-child-username').value  = student.username;
    if (_el('add-child-grade'))    _el('add-child-grade').value     = student.grade;
    if (_el('add-child-pin'))      _el('add-child-pin').value       = student.pin;
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
  function switchStudent() {
    Store.clearStudentSession();
    _activeAccount    = null;
    ACTIVE_STUDENT_ID = null;
    showScreen('auth');
    setRole('student');
  }

  // ── Welcome name helper ────────────────────────
  function _setWelcomeName(name) {
    const el = _el('welcome-name');
    if (el) el.textContent = name;
  }

  // ── Parent dashboard ───────────────────────────
  function enterParentMode() {
    if (_parentProfile) {
      // Already logged in as parent — go straight to dashboard
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
    Store.clearStudent(ACTIVE_STUDENT_ID);
    const fresh = { stats:{totalAttempted:0,totalCorrect:0,examCount:0,bestScore:0,maxStreak:0,streak:0,lastDate:null},chapters:{},examHistory:[],badges:[],theme:'light',xp:0,level:1,assignments:[],restrictions:{lockedChapters:[],maxDifficulty:4,examDisabled:false} };
    Object.assign(DB, fresh);
    applyTheme('light');
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

  function pdSwitchStudent(id) {
    const student = _familyStudents.find(s => s.id === id);
    if (student) {
      _loginStudentRow(student);
    } else {
      loginStudent(id);
    }
    renderParentDashboard();
    showScreen('parent');
  }

  // ── Parent assignments ────────────────────────
  function addAssignment() {
    const chId = (_el('pd-assign-chapter')?.value || '') || null;
    const diff = parseInt(_el('pd-assign-diff')?.value || '0') || null;
    const note = (_el('pd-assign-note')?.value || '').trim();
    if (!chId && !diff) { toast('Select a chapter or difficulty.', 2000); return; }
    DB.assignments = DB.assignments || [];
    DB.assignments.push({ id:'asgn_'+Date.now(), chapterId:chId, difficulty:diff, note, createdAt:Date.now() });
    save(DB);
    renderParentDashboard();
    if (_el('pd-assign-note')) _el('pd-assign-note').value = '';
    toast('Assignment added! 📋', 1500);
  }

  function removeAssignment(id) {
    DB.assignments = (DB.assignments || []).filter(a => a.id !== id);
    save(DB);
    renderParentDashboard();
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
    init, getActiveAccount,
    // Auth screen
    setRole, showSignIn, showSignUp, emailSignIn, emailSignUp,
    showForgotPassword, backToSignIn, forgotPassword,
    resendVerification, setNewPassword, togglePass,
    studentSignIn,
    // Family setup
    completeSetup, _pickSetupAvatar,
    // Add/edit student
    addStudent, saveNewStudent, deleteStudent, editStudent,
    _pickAddAvatar,
    // Session
    loginStudent, logout, switchStudent,
    // Parent mode
    enterParentMode, exitParentMode, resetProgress,
    pdTab, pdSwitchStudent,
    addAssignment, removeAssignment,
    toggleChapterLock, setMaxDifficulty, toggleExamDisabled,
  };
})();

// Start app
Auth.init();
