'use strict';

// Profile-specific PWA shortcuts and the shared-device account launcher.
// A binding contains identifying data only. Student bearer tokens are kept in a
// separate map and are the same revocable tokens Store already persists; PINs
// and adult passwords are never stored here.
const ProfileInstall = (() => {
  const BINDINGS_KEY = 'psac_profile_bindings_v1';
  const SESSIONS_KEY = 'psac_profile_sessions_v1';
  let installPrompt = null;

  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key) || 'null') || fallback; } catch (_) { return fallback; } };
  const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (_) { return false; } };
  const bindings = () => {
    const value = read(BINDINGS_KEY, {});
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  };
  const sessions = () => {
    const value = read(SESSIONS_KEY, {});
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  };
  const launchKey = () => { try { return (new URLSearchParams(location.search).get('profile') || '').trim(); } catch (_) { return ''; } };
  const getLaunchBinding = () => bindings()[launchKey()] || null;
  const isStudentLaunch = () => getLaunchBinding()?.type === 'student';
  const getLaunchStudentSession = () => isStudentLaunch() ? (sessions()[launchKey()] || null) : null;

  function randomKey() {
    const secure = typeof window !== 'undefined' ? window.crypto : null;
    if (secure?.randomUUID) return secure.randomUUID().replace(/-/g, '');
    const bytes = secure?.getRandomValues
      ? secure.getRandomValues(new Uint8Array(16))
      : Uint8Array.from({length: 16}, () => Math.floor(Math.random() * 256));
    return [...bytes].map(v => v.toString(16).padStart(2, '0')).join('');
  }

  function profileUrl(key, installing = false) {
    const params = new URLSearchParams();
    params.set('profile', key);
    if (installing) params.set('installProfile', '1');
    // location.origin is "file://" on a local file:// run, so an origin-rooted
    // URL lands on the filesystem root and renders a blank page.
    return `${location.pathname || '/'}?${params}`;
  }

  function prepareLaunch() {
    const key = launchKey();
    const binding = key && bindings()[key];
    if (!binding) return null;
    if (binding.type === 'student') {
      const sess = sessions()[key];
      if (sess?.token && sess.id === binding.studentId) {
        try {
          localStorage.setItem('mm_student_sess', JSON.stringify(sess));
          localStorage.setItem('psac_last_mode', JSON.stringify({who:'student',at:Date.now()}));
        } catch (_) {}
        if (typeof setStudentToken === 'function') setStudentToken(sess.token);
      } else {
        try { localStorage.removeItem('mm_student_sess'); } catch (_) {}
        if (typeof setStudentToken === 'function') setStudentToken(null);
      }
    }
    return binding;
  }

  function captureStudentSession(sess, studentRow, familyName) {
    if (!sess?.token || !sess.id) return;
    const all = bindings();
    const saved = sessions();
    Object.entries(all).forEach(([key, binding]) => {
      if (binding.type === 'student' && binding.studentId === sess.id) saved[key] = sess;
    });
    write(SESSIONS_KEY, saved);
    // Keep identity current after a parent changes a display name/avatar.
    // ⚠ username and family are refreshed too, and that is not cosmetic. They
    //   are what _setQuickPinMode() needs to offer "just type your PIN": with
    //   either one missing the child gets the FULL sign-in form - family name,
    //   username and PIN - from their own personal shortcut, which reads as the
    //   device having forgotten them. installStudent() copies them from
    //   psac_known_students, which is capped at 8 and can simply not hold this
    //   child, so a shortcut could be born without them and never recover.
    //   Neither is a secret; the PIN is, and it is never stored here.
    if (studentRow) {
      Object.entries(all).forEach(([, binding]) => {
        if (binding.type !== 'student' || binding.studentId !== sess.id) return;
        binding.name = studentRow.display_name || binding.name;
        binding.avatar = studentRow.avatar || binding.avatar;
        binding.grade = studentRow.grade || binding.grade;
        binding.username = studentRow.username || binding.username || '';
        binding.family = familyName || binding.family || '';
      });
      write(BINDINGS_KEY, all);
    }
  }

  function clearStudentSessions(studentId) {
    if (!studentId) return;
    const all = bindings();
    const saved = sessions();
    Object.entries(all).forEach(([key, binding]) => {
      if (binding.type === 'student' && binding.studentId === studentId) delete saved[key];
    });
    write(SESSIONS_KEY, saved);
  }

  function findOrCreateBinding(data) {
    const all = bindings();
    const match = Object.values(all).find(b => b.type === data.type &&
      (data.type === 'student' ? b.studentId === data.studentId : b.userId === data.userId));
    if (match) {
      Object.assign(match, data, {updatedAt: Date.now()});
      write(BINDINGS_KEY, all);
      return match;
    }
    const key = randomKey();
    all[key] = {...data, key, createdAt: Date.now()};
    write(BINDINGS_KEY, all);
    return all[key];
  }

  function installStudent() {
    const account = typeof Auth !== 'undefined' ? Auth.getActiveAccount() : null;
    const sess = typeof Store !== 'undefined' ? Store.getStudentSession() : null;
    if (!account?.id || !sess?.token || sess.id !== account.id) {
      if (typeof toast === 'function') toast('Please sign in as the student with their PIN before installing.', 4000);
      return;
    }
    const known = (Auth.getKnownStudents?.() || []).find(s => s.id === account.id) || {};
    const binding = findOrCreateBinding({
      type: 'student', studentId: account.id,
      name: account.name || known.name || 'Student', avatar: account.avatar || known.avatar || '🎒',
      grade: account.grade || known.grade || null, username: known.username || '', family: known.family || ''
    });
    const saved = sessions(); saved[binding.key] = sess; write(SESSIONS_KEY, saved);
    location.assign(profileUrl(binding.key, true));
  }

  function hasStudentBinding(studentId) {
    return Object.values(bindings()).some(binding =>
      binding.type === 'student' && binding.studentId === studentId);
  }

  async function installTeacher() {
    if (typeof Auth === 'undefined' || !Auth.isTeacher?.()) {
      if (typeof toast === 'function') toast('Open this from your approved teacher account.', 3500);
      return;
    }
    const profile = Auth.getParentProfile?.();
    const session = await _sb?.auth.getSession();
    const user = session?.data?.session?.user;
    if (!user?.id) { if (typeof toast === 'function') toast('Please sign in before installing.', 3000); return; }
    const binding = findOrCreateBinding({
      type: 'teacher', userId: user.id, name: profile?.full_name || 'Teacher', email: user.email || ''
    });
    location.assign(profileUrl(binding.key, true));
  }

  function openBinding(key) {
    const binding = bindings()[key];
    if (!binding) return;
    location.assign(profileUrl(key));
  }

  function forget(key) {
    const all = bindings(); const saved = sessions();
    delete all[key]; delete saved[key];
    write(BINDINGS_KEY, all); write(SESSIONS_KEY, saved);
    renderLauncher();
  }

  function renderLauncher() {
    const list = document.getElementById('profile-launch-list');
    const empty = document.getElementById('profile-launch-empty');
    if (!list) return;
    const entries = Object.values(bindings()).sort((a,b) => Number(b.updatedAt || b.createdAt)-Number(a.updatedAt || a.createdAt));
    if (empty) empty.classList.toggle('hidden', entries.length > 0);
    list.innerHTML = entries.map(b => `
      <div class="profile-launch-row">
        <button class="profile-launch-main" data-open-profile="${esc(b.key)}">
          <span>${esc(b.type === 'teacher' ? '👩‍🏫' : (b.avatar || '🎒'))}</span>
          <div><strong>${esc(b.name || (b.type === 'teacher' ? 'Teacher' : 'Student'))}</strong><small>${b.type === 'teacher' ? 'Teacher workspace' : `Grade ${esc(b.grade || '-')} · PIN only if needed`}</small></div>
          <b>Open →</b>
        </button>
        <button class="profile-launch-forget" data-forget-profile="${esc(b.key)}" aria-label="Forget ${esc(b.name)}" title="Remove from this device">×</button>
      </div>`).join('');
    list.querySelectorAll('[data-open-profile]').forEach(btn => btn.onclick = () => openBinding(btn.dataset.openProfile));
    list.querySelectorAll('[data-forget-profile]').forEach(btn => btn.onclick = () => forget(btn.dataset.forgetProfile));
  }

  function openLauncher() {
    renderLauncher();
    document.getElementById('profile-launcher-modal')?.classList.remove('hidden');
  }
  function closeLauncher() { document.getElementById('profile-launcher-modal')?.classList.add('hidden'); }

  function showInstallPanel() {
    const binding = getLaunchBinding();
    if (!binding || !new URLSearchParams(location.search).has('installProfile')) return;
    const modal = document.getElementById('profile-install-modal');
    if (!modal) return;
    document.getElementById('profile-install-avatar').textContent = binding.type === 'teacher' ? '👩‍🏫' : (binding.avatar || '🎒');
    document.getElementById('profile-install-title').textContent = `Install for ${binding.name}`;
    document.getElementById('profile-install-copy').textContent = binding.type === 'teacher'
      ? 'This icon will open your teacher workspace directly whenever your sign-in is still valid.'
      : `This icon will always open ${binding.name}’s practice space. Only their PIN is requested if the saved session ends.`;
    modal.classList.remove('hidden');
    const btn = document.getElementById('profile-install-confirm');
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent || '');
    if (ios) {
      btn.classList.add('hidden');
      document.getElementById('profile-install-help').innerHTML = 'Tap <b>Share</b>, then <b>Add to Home Screen</b>. You can confirm the name before adding it.';
    } else if (installPrompt) {
      btn.disabled = false; btn.textContent = `Install ${binding.name}`;
    } else {
      btn.disabled = true; btn.textContent = 'Preparing install…';
      setTimeout(() => {
        if (installPrompt || modal.classList.contains('hidden')) return;
        btn.classList.add('hidden');
        document.getElementById('profile-install-help').innerHTML = 'Use your browser menu and choose <b>Install app</b> or <b>Add to Home screen</b>. If this app is already installed, your browser may support only the shared account launcher.';
      }, 2500);
    }
  }

  async function confirmInstall() {
    if (!installPrompt) return;
    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result?.outcome === 'accepted') {
      installPrompt = null;
      finishInstallFlow();
      closeInstallPanel();
    }
  }
  function closeInstallPanel() { document.getElementById('profile-install-modal')?.classList.add('hidden'); }
  function finishInstallFlow() {
    try {
      const params = new URLSearchParams(location.search);
      params.delete('installProfile');
      history.replaceState(null, '', `${location.pathname}?${params}${location.hash}`);
    } catch (_) {}
  }

  window.addEventListener('beforeinstallprompt', event => {
    if (!getLaunchBinding()) return;
    event.preventDefault();
    installPrompt = event;
    const btn = document.getElementById('profile-install-confirm');
    if (btn) { btn.disabled = false; btn.textContent = `Install ${getLaunchBinding()?.name || 'app'}`; }
  });
  window.addEventListener('appinstalled', finishInstallFlow);
  window.addEventListener('DOMContentLoaded', () => { renderLauncher(); setTimeout(showInstallPanel, 150); });

  return {
    prepareLaunch, getLaunchBinding, isStudentLaunch, getLaunchStudentSession,
    captureStudentSession, clearStudentSessions,
    installStudent, installTeacher, hasStudentBinding, openBinding, openLauncher, closeLauncher,
    confirmInstall, closeInstallPanel, finishInstallFlow, renderLauncher
  };
})();
