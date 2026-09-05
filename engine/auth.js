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
  // 'pending' until the lookup settles, then 'loaded' (a real answer, which may
  // legitimately be "no plan" = free) or 'failed'. getPlanFeatures() only falls
  // back to the free defaults on 'loaded' - see the comment there.
  let _planFeaturesState   = 'pending';
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
    // 1, not 3: _buildHints() only ever builds 3 steps, so a free tier of 3 is
    // everything that exists and "unlimited hints" on a paid tier would be an
    // empty promise. Step 3 also prints the answer outright for non-MCQ
    // questions (see _buildHints), which is the step worth paying for.
    hints_per_question: 1, printable_papers: false, advanced_analytics: false,
    // weekly_digest_ENABLED, not weekly_digest: the latter is the PARENT's own
    // on/off switch in profiles.preferences, read by weekly-digest.js. Two
    // different concepts that shared a name until this rename - a plan saying
    // "no digest" and a parent saying "not for me" must stay distinguishable.
    push_reminders: false, timetable_generator: false, weekly_digest_enabled: false,
    tutor_status: false,
    // No early_access: it gated nothing, so the switch was removed from the
    // admin form rather than left looking functional. Re-add both together if
    // an actual early-access feature ever exists.
    //
    // No max_children either - that one is a COLUMN on plans (what the pricing
    // page shows and what the students_max_children trigger reads), never a
    // features key. Both copies existed and the form edited the dead one.
  };

  function _el(id) { return document.getElementById(id); }

  // ── Username rules ──────────────────────────────
  // A child types this on the login screen, often on a phone keyboard, and it
  // is also the only thing distinguishing two children who share a display
  // name. So: letters, digits, dot and underscore only.
  //
  // Spaces are the specific hazard. They are invisible at the end of a field,
  // mobile keyboards insert one after autocomplete, and "emma 2025" then fails
  // to log in with no clue why. The two entry paths used to disagree - setup
  // stripped spaces silently, add-child did not strip anything - so the same
  // typed name produced different accounts depending on which screen was used.
  const _USERNAME_RE = /^[a-z][a-z0-9._]{2,19}$/;

  function _normaliseUsername(raw) {
    return (raw || '').trim().toLowerCase().replace(/\s+/g, '');
  }

  // Returns an error string, or null when the username is acceptable.
  function _usernameError(u) {
    if (!u)               return 'Please enter a username.';
    if (u.length < 3)     return 'Username must be at least 3 characters.';
    if (u.length > 20)    return 'Username must be 20 characters or fewer.';
    if (!/^[a-z]/.test(u)) return 'Username must start with a letter.';
    if (!_USERNAME_RE.test(u)) {
      return 'Username can only use letters, numbers, dots and underscores — no spaces or symbols.';
    }
    return null;
  }

  // One place that knows there are two logout buttons: #header-logout-btn (the
  // labelled pill, 1100px and up) and #header-logout-mobile (its twin below
  // that). Which of the two is on screen is a CSS decision; this is only about
  // whether logging out is possible at all.
  function _setLogoutVisible(on) {
    ['header-logout-btn', 'header-logout-mobile'].forEach(id => {
      const b = document.getElementById(id);
      if (!b) return;
      b.classList.toggle('hidden', !on);
      b.classList.toggle('flex',    on);
    });
  }

  function getActiveAccount()  { return _activeAccount; }
  function getParentProfile()  { return _parentProfile; }
  function getFamily()         { return _family; }
  // ⚠ Fails OPEN while the plan is still loading, and if loading FAILED.
  //
  // window.PLAN_ENFORCEMENT comes from one mm_data read; _planFeatures needs a
  // three-hop chain (students → families → subscriptions/plans). Enforcement is
  // therefore ALWAYS on before the features arrive, and returning the free-tier
  // defaults in that window capped a Premium family's child at 20 questions and
  // 1 hint. Worse, any hop failing (RLS, offline) left _planFeatures null for
  // the whole session, silently, with the child capped throughout.
  //
  // `{}` means "no restrictions": every cap reads as unlimited and every
  // feature as allowed - the same direction as _planCap on a malformed value
  // and the same direction the server-side gates fail. A free family briefly
  // uncapped is a far cheaper mistake than a paying one capped.
  function getPlanFeatures() {
    if (_planFeatures) return _planFeatures;
    return _planFeaturesState === 'loaded' ? DEFAULT_FREE_FEATURES : {};
  }

  // ── Account expiry ──────────────────────────────
  // Expiry used to be a hard door: an expired parent or child was refused at
  // sign-in. It is a soft one now, because a chapter bought with referral
  // credits stays live for its full 30 days whether or not the account behind
  // it has lapsed — and a family who spent credits has to be able to get to
  // what they bought.
  //
  // So an expired account signs in and reaches a restricted app: only chapters
  // with a live entitlement load. ⚠ That restriction is NOT this flag. It is
  // applied in netlify/functions/questions.js, which will not send the
  // questions for anything else. This flag only decides what the UI says.
  let _accessExpired = false;
  function isAccessExpired() { return _accessExpired; }
  function _setAccessExpired(v) {
    _accessExpired = !!v;
    document.body.classList.toggle('access-expired', _accessExpired);
  }

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

  // ── Co-parent invite capture ───────────────────
  // Runs before every routing decision, like ?ref= and ?join=. The token is
  // parked rather than redeemed on the spot: the second parent almost never
  // has a session yet, and accept_coparent_invite() requires one - the link
  // says WHICH family to join, it is never itself a credential. That is also
  // why, unlike ?join=, this must NOT sign out an existing session: the
  // invitee signing in as themselves is the entire point.
  const _PENDING_COPARENT_KEY = 'psac_pending_coparent';

  function _captureCoparentLink() {
    try {
      const params = new URLSearchParams(location.search);
      const tok = (params.get('coparent') || '').trim();
      if (!tok || !/^[0-9a-f]{64}$/.test(tok)) return;
      localStorage.setItem(_PENDING_COPARENT_KEY, tok);
      params.delete('coparent');
      const rest = params.toString();
      history.replaceState(null, '', location.pathname + (rest ? `?${rest}` : '') + location.hash);
    } catch (_) {}
  }

  // Redeemed once a parent session exists, from the parent load path below.
  // Cleared on every outcome except a transport failure, so a flaky network
  // retries on the next sign-in but a used or expired link does not nag.
  async function _redeemPendingCoparent() {
    let tok = '';
    try { tok = localStorage.getItem(_PENDING_COPARENT_KEY) || ''; } catch (_) { return; }
    if (!tok) return;

    const res = await Store.acceptCoparentInvite(tok);
    if (res && res.error === 'offline') return;   // keep it, try again next time
    try { localStorage.removeItem(_PENDING_COPARENT_KEY); } catch (_) {}

    if (res && res.ok) {
      if (typeof toast === 'function') {
        toast(res.already ? 'You already have access to this account.'
                          : 'You now have access to this family account. 🎉', 4000);
      }
      return;
    }

    const msg = {
      self:               'That invite is for a different parent - you already own this account.',
      already_in_a_family:'Your account is already linked to a family. Leave it first in Account & Settings.',
      cap_reached:        'That family already has the maximum number of parents.',
      invalid_link:       'That invite link has already been used or has expired. Ask for a new one.',
    }[res && res.error] || 'Could not use that invite link.';
    if (typeof toast === 'function') toast(msg, 5000);
  }

  function getPendingReferralCode() {
    try { return localStorage.getItem(REF_STORAGE_KEY) || ''; } catch(_) { return ''; }
  }

  // ── Friend invite link capture ─────────────────
  const _PENDING_FRIEND_KEY = 'psac_pending_friend';

  function _tryFriendLink() {
    try {
      const params = new URLSearchParams(location.search);
      const code = params.get('friend');
      if (!code) return;
      localStorage.setItem(_PENDING_FRIEND_KEY, code.toUpperCase());
      const url = new URL(location.href);
      url.searchParams.delete('friend');
      history.replaceState({}, '', url.toString());
    } catch(_) {}
  }

  async function _consumePendingFriend() {
    if (!_sb) return;
    let code;
    try { code = localStorage.getItem(_PENDING_FRIEND_KEY); } catch(_) { return; }
    if (!code) return;
    try { localStorage.removeItem(_PENDING_FRIEND_KEY); } catch(_) {}
    const { data, error } = await _sb.rpc('add_friend', { p_friend_code: code });
    if (error) { console.warn('[auth] add_friend failed:', error.message); return; }
    if (data?.ok)                         toast('Friend connected! 🎉', 3000);
    else if (data?.error === 'self')      toast("That's your own invite code!", 2000);
    else if (data?.error === 'not_found') toast('Invite link not found or expired.', 2500);
    else if (data?.error === 'max_friends') toast('Friend list is full (max 20).', 2500);
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
    _clearParentStash();
    try { if (_sb) await _sb.auth.signOut(); } catch(_) {}
    _parentUser = null; _parentProfile = null; _family = null; _familyStudents = [];

    // bumpSession stays TRUE so this behaves exactly like a PIN login - the
    // account-sharing guard starts and push re-subscribes. redeem_student_invite
    // has already dropped every other session server-side.
    await _loginStudentRow(res.student, { token: res.session_token });
    return true;
  }

  // ── Who owns this device right now ─────────────
  //
  // ⚠ A shared family phone can hold BOTH a parent's Supabase session and a
  // child's PIN session at once, and init() used to check the parent's first
  // and `return` — so every reload threw the child into the parent dashboard
  // mid-practice. That is the "suddenly his view switched to parent view"
  // report, and in a PWA it fires on every cold start, not just a refresh.
  //
  // Neither session expiring is the right signal: both are long-lived by
  // design. What matters is who most recently signed in ON PURPOSE, so that is
  // what gets recorded — on the two deliberate acts, never on a restore, or
  // every reload would re-crown the parent and the bug would come straight back.
  const _LAST_MODE_KEY = 'psac_last_mode';

  function _markActiveMode(who) {
    try { localStorage.setItem(_LAST_MODE_KEY, JSON.stringify({ who, at: Date.now() })); } catch (_) {}
  }
  function _lastActiveMode() {
    try { return JSON.parse(localStorage.getItem(_LAST_MODE_KEY) || 'null'); } catch (_) { return null; }
  }

  // ⚠ With no record at all (every account that predates this), a stored STUDENT
  // session wins. It is created only by an explicit PIN login on this device and
  // is explicitly cleared when the parent logs out, so its presence is a far
  // stronger statement about who is using the device than a Supabase session
  // that may have been sitting in localStorage for weeks.
  function _studentOwnsDevice(hasStudentSession, hasParentSession) {
    if (!hasStudentSession) return false;
    if (!hasParentSession)  return true;
    const last = _lastActiveMode();
    return !last || last.who !== 'parent';
  }

  // ⚠ A stored student session with NO token cannot authorise anything, so it
  // is not a session — every routing decision must read it as absent, and it is
  // dropped on sight. Without this, an install poisoned by the parent-preview
  // bug above stays poisoned: init() would resume it, find no token, and send a
  // perfectly valid parent session to the sign-in screen on every single reload.
  function _storedStudentSession() {
    const sess = Store.getStudentSession();
    if (sess && !sess.token) { Store.clearStudentSession(); return null; }
    return sess;
  }

  // Mobile browsers may freeze a PWA for hours. On a normal return, refresh a
  // parent token that is close to expiry instead of treating the saved sign-in
  // as lost. A network failure deliberately leaves the stored session alone.
  async function _refreshParentSessionIfNeeded(session) {
    if (!_sb || !session || !navigator.onLine) return session;
    const expiresMs = Number(session.expires_at || 0) * 1000;
    if (expiresMs && expiresMs > Date.now() + 10 * 60 * 1000) return session;
    try {
      const { data, error } = await _sb.auth.refreshSession();
      if (!error && data?.session) return data.session;
    } catch (_) {}
    return session;
  }

  // ⚠ A correct Parent PIN must never dead-end on "your sign-in has expired".
  // The PIN is browser-local and cannot mint a Supabase session — but the
  // REFRESH TOKEN can, so keep our own copy of it beside the one supabase-js
  // persists. Same origin, same localStorage, no new exposure: persistSession
  // already writes that exact value under `mm_sb_auth`. The point of a second
  // copy is that supabase-js DELETES its own the moment a refresh fails once
  // (a tunnel, a sleeping phone, one flaky 3G hop), and that deletion is
  // indistinguishable from a genuinely revoked session — which is how a parent
  // who was still signed in got sent to the email screen with a correct PIN in
  // their hand.
  const _PARENT_SESS_KEY = 'psac_parent_sess_v1';

  // ⚠ A successful re-mint EMITS SIGNED_IN, so onAuthStateChange would route
  // the parent as well — a second, uninvited trip through the biometric gate
  // and the dashboard, racing the one the caller is already awaiting. The
  // caller owns the routing for as long as it is recovering; the listener is
  // told to stay out of it (the stash is still written, which is the one thing
  // it must not miss).
  let _suppressAuthEvents = false;

  function _stashParentSession(session) {
    if (!session || !session.refresh_token) return;
    try {
      localStorage.setItem(_PARENT_SESS_KEY, JSON.stringify({
        rt: session.refresh_token,
        uid: session.user?.id || null,
        ts: Date.now(),
      }));
    } catch (_) {}
  }
  function _readParentStash() {
    try {
      const raw = localStorage.getItem(_PARENT_SESS_KEY);
      if (!raw) return null;
      const st = JSON.parse(raw);
      return (st && st.rt) ? st : null;
    } catch (_) { return null; }
  }
  // ⚠ Cleared only on a DELIBERATE sign-out — never from the SIGNED_OUT
  // handler. supabase-js emits SIGNED_OUT for a dropped refresh too, and that
  // is precisely the case this stash exists to recover from.
  function _clearParentStash() {
    try { localStorage.removeItem(_PARENT_SESS_KEY); } catch (_) {}
  }

  // The single way to ask "is a parent still signed in on this device?", in
  // escalating order of effort. Returns a live session or null; never throws.
  //   1. what the client already holds
  //   2. one more read, in case it is still restoring after a cold start
  //   3. an explicit refresh through the client's own stored token
  //   4. an explicit refresh through OUR copy of the refresh token
  // Step 4 is the behind-the-scenes sign-in: no email, no password, no prompt.
  async function _ensureParentSession() {
    if (!_sb) return null;
    const alive = (sess) => { if (sess) _stashParentSession(sess); return sess || null; };

    try {
      const { data } = await _sb.auth.getSession();
      if (data?.session) return alive(data.session);
    } catch (_) {}

    // Offline is not "signed out". Nothing below can succeed without the
    // network, and answering null here keeps the caller's wording honest.
    if (!navigator.onLine) return null;

    try {
      await new Promise(r => setTimeout(r, 250));
      const { data } = await _sb.auth.getSession();
      if (data?.session) return alive(data.session);
    } catch (_) {}

    try {
      const { data, error } = await _sb.auth.refreshSession();
      if (!error && data?.session) return alive(data.session);
    } catch (_) {}

    // ⚠ Only now, and only once. Presenting a rotated-out refresh token can
    // revoke the whole token family server-side, so this is reached solely
    // when the session is already gone by every other measure and there is
    // nothing left to lose. A refusal means the token really is dead — drop
    // it rather than replay it on every future PIN entry.
    const stash = _readParentStash();
    if (stash) {
      try {
        const { data, error } = await _sb.auth.refreshSession({ refresh_token: stash.rt });
        if (!error && data?.session) return alive(data.session);
      } catch (_) {}
      _clearParentStash();
    }
    return null;
  }

  let _parentRefreshHooksBound = false;
  function _keepParentSessionFresh() {
    if (!_sb || _parentRefreshHooksBound) return;
    _parentRefreshHooksBound = true;
    const refreshOnReturn = async () => {
      if (document.hidden || !navigator.onLine) return;
      try {
        const { data: { session } } = await _sb.auth.getSession();
        if (session) await _refreshParentSessionIfNeeded(session);
      } catch (_) {}
    };
    window.addEventListener('online', refreshOnReturn);
    document.addEventListener('visibilitychange', refreshOnReturn);
  }

  // ── App init ───────────────────────────────────
  async function init() {
    _captureReferralFromUrl();
    _captureCoparentLink();
    _tryFriendLink();
    // Show a loading state so there's no blank flash
    document.body.style.opacity = '0';

    if (location.search.includes('join=')) {
      document.body.style.opacity = '1';
      if (await _tryJoinLink()) return;
    }

    // 1. Listen for Supabase auth state changes (email verification callback lands here)
    if (_sb) {
      _sb.auth.startAutoRefresh?.();
      _keepParentSessionFresh();
      _sb.auth.onAuthStateChange(async (event, session) => {
        // TOKEN_REFRESHED rotates the refresh token, so a stale copy is worse
        // than none: rewrite the stash on every event that carries a session.
        if (session) _stashParentSession(session);
        if (event === 'PASSWORD_RECOVERY') {
          showScreen('reset-password');
          return;
        }
        if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session && !_parentUser) {
          // ⚠ Suppression is scoped to THIS arm and no other. A re-mint inside
          // _ensureParentSession() emits SIGNED_IN, and routing it here would
          // race the caller that is already awaiting the same session — but
          // SIGNED_OUT must ALWAYS be honoured, including the one
          // _handleParentSession() raises itself for a disabled account. Left
          // suppressed, that sign-out never cleared _parentUser, and the next
          // sign-in hit _handleParentSessionGated's "already handled" branch
          // and opened the dashboard for an account that had just been refused.
          if (_suppressAuthEvents) return;
          // ⚠ Same ownership question as init(). INITIAL_SESSION fires on client
          // start, so without this the listener would hand the device straight
          // back to the parent milliseconds after init() gave it to the child.
          // SIGNED_IN from a real sign-in is unaffected: that path stamps
          // 'parent' before the event lands.
          if (_studentOwnsDevice(!!_storedStudentSession(), true)) return;
          await _handleParentSessionGated(session);
        } else if (event === 'SIGNED_OUT') {
          // A parent and child can have separate saved credentials on one
          // device. An automatic parent-token sign-out must not erase a
          // child's still-valid PIN session. Explicit logout clears it first.
          const keepStudentSession = !!_activeAccount && !!_storedStudentSession();
          _parentUser    = null;
          _parentProfile = null;
          _family        = null;
          _familyStudents = [];
          if (!keepStudentSession) {
            Store.clearStudentSession();
            _activeAccount = null;
          }
          _biometricGateResolved  = false;
          _pendingBiometricSession = null;
          _pendingBiometricKind    = null;
          if (!keepStudentSession) showScreen('auth');
        }
      });

      // 2. Both sessions can exist at once on a shared family device. Resolve
      //    WHO OWNS IT before routing, instead of letting the parent win by
      //    virtue of being checked first — see _studentOwnsDevice().
      let { data: { session } } = await _sb.auth.getSession();
      // On a cold mobile start Supabase can still be restoring/refreshing its
      // persisted token when the first read happens. A missing first read is
      // not enough reason to send a parent back to sign-in; retry once after
      // the auth client has had a short turn to finish initialisation.
      if (!session && navigator.onLine) {
        await new Promise(resolve => setTimeout(resolve, 350));
        const retry = await _sb.auth.getSession();
        session = retry?.data?.session || null;

        // ⚠ Still nothing, but this browser has a parent refresh token stashed:
        // supabase-js drops its own copy the first time a refresh fails, which
        // is not the same as being signed out. Without this, the same lapse the
        // PIN pad now recovers from still logged a parent out on a plain reload
        // — no PIN involved, so nothing on screen even hinted why.
        //
        // Gated on the stash EXISTING so a first-time visitor pays no latency
        // and makes no network call on the landing page, and suppressed for the
        // same reason as the PIN path: a successful re-mint emits SIGNED_IN, and
        // routing below is about to make that decision properly.
        if (!session && _readParentStash()) {
          _suppressAuthEvents = true;
          try { session = await _ensureParentSession(); }
          finally { _suppressAuthEvents = false; }
        }
      }
      session = await _refreshParentSessionIfNeeded(session);
      const storedStudent = _storedStudentSession();

      if (_studentOwnsDevice(!!storedStudent, !!session)) {
        document.body.style.opacity = '1';
        await _resumeStudentGated(storedStudent);
        return;
      }
      if (session) {
        document.body.style.opacity = '1';
        await _handleParentSessionGated(session);
        return;
      }
    }

    // 3. No Supabase client, or no parent session: the stored student session
    //    (PIN login persists across refresh) is the only candidate left.
    const studentSess = _storedStudentSession();
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
    if (_parentUser) {
      // Already handled by onAuthStateChange, so do not redo the work - but DO
      // make sure the parent actually LEFT the auth screen.
      //
      // Returning silently here is what made "Sign in" appear to do nothing:
      // the first click let onAuthStateChange set _parentUser while its routing
      // was still in flight or had failed, and from then on every further click
      // hit this guard and returned before navigating anywhere. The session was
      // valid the whole time, which is why a refresh went straight in - init()
      // routes from the stored session instead of coming through here.
      const authScreen = _el('screen-auth');
      const stuck = authScreen && !authScreen.classList.contains('hidden');
      if (stuck && _parentProfile) _openParentDashboard();
      else if (stuck) await _handleParentSession(session);
      return;
    }
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
      _clearParentStash();
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
  function _showFamilySetup() {
    _buildSetupAvatarGrid();
    const refField = _el('setup-referral-code');
    const pending  = getPendingReferralCode();
    if (refField && pending) refField.value = pending;
    showScreen('family-setup');
  }

  // ⚠ A profile with no family is an INTERRUPTED SETUP, not a broken account.
  // completeSetup() writes the profile row, then the family, then the first
  // child, with no transaction behind it — so anything that went wrong after
  // step 1 leaves precisely this state. Nothing used to route it anywhere: the
  // parent landed on a dashboard whose only message was "Your family record
  // could not be loaded", on every reload, with no way back to the setup
  // screen. Both steps are idempotent now (see Store.createProfile /
  // createFamily), so sending them back finishes the job.
  //
  // Two guards, and neither is optional:
  //   • only when the query ANSWERED "no family" — Store.lastFamilyError()
  //     empty. Routing a failed READ into setup would write a second family
  //     over one that already exists, which a parent cannot undo.
  //   • only role 'parent' — an admin lands on this dashboard with no family of
  //     their own by design, and a co-parent's family arrives through
  //     my_member_family() inside getMyFamily().
  //   • only an account that is actually a FAMILY. A teacher who signs up on
  //     the teacher tab gets role 'parent' on purpose (see _bootstrapTeacherProfile
  //     — the role only becomes 'teacher' when an admin approves) and has no
  //     family and no children, so the role test alone sent them to a screen
  //     demanding a child's name, username and 4-digit PIN before they could go
  //     anywhere. teacher_status is the signal that separates them; the
  //     user_metadata check is the belt to its braces, because
  //     request_teacher_access() is non-fatal and can leave the status at 'none'.
  function _needsFamilySetup(profile) {
    if (profile?.role !== 'parent') return false;
    if ((profile.teacher_status || 'none') !== 'none') return false;
    if (_parentUser?.user_metadata?.role === 'teacher') return false;
    return !(typeof Store.lastFamilyError === 'function' && Store.lastFamilyError());
  }

  let _parentSessionLoad = null;
  async function _handleParentSession(session) {
    if (_parentSessionLoad) return _parentSessionLoad;
    _parentSessionLoad = _hydrateParentSession(session);
    try { return await _parentSessionLoad; }
    finally { _parentSessionLoad = null; }
  }

  async function _loadParentFamily() {
    const parentId = _parentUser?.id;
    if (!parentId) return;
    for (let attempt = 0; attempt < 3; attempt++) {
      const family = await Store.getMyFamily(parentId);
      if (_parentUser?.id !== parentId || !_parentProfile) return;
      if (family) {
        const students = await Store.getFamilyStudents(family.id);
        if (_parentUser?.id !== parentId || !_parentProfile) return;
        if (!Store.lastFamilyStudentsError?.() || attempt === 2) {
          _family = family;
          _familyStudents = students;
          _cacheAccountsLocally(_familyStudents);
          return;
        }
      } else if (attempt === 2) {
        _family = null;
        _familyStudents = [];
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 300 * (attempt + 1)));
    }
  }

  async function _hydrateParentSession(session) {
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
      _showFamilySetup();
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
      _clearParentStash();
      await _sb.auth.signOut();
      showScreen('auth');
      _showAuthError('This account has been disabled. Please contact support.');
      return;
    }

    // Expired is no longer a refusal — see isAccessExpired(). The parent signs
    // in, sees the banner, and can still reach anything they bought with
    // credits (and the Shop, to spend what they have left). `disabled` above
    // stays a hard stop: that is a moderation decision, not a lapsed date.
    _setAccessExpired(!!(profile.expires_at && new Date(profile.expires_at) < new Date()));

    if (profile.role === 'admin') {
      _isAdminUser = true;
      if (profile.is_super_admin) _isSuperAdmin = true;
      // Admin lands on parent dashboard; admin panel accessible via button
      const adminBtn = document.getElementById('btn-open-admin');
      if (adminBtn) adminBtn.classList.remove('hidden');
      _refreshAdminBadge();
      // Return an administrator to the tool they were actively working in
      // before a browser/PWA refresh, rather than forcing a dashboard detour.
      let lastScreen = null;
      try { lastScreen = sessionStorage.getItem('psac-last-screen'); } catch (_) {}
      if (lastScreen === 'admin') {
        showScreen('admin');
        if (typeof AdminPanel !== 'undefined') AdminPanel.render();
        return;
      }
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
    //
    // A pending co-parent invite is redeemed FIRST: getMyFamily() is what
    // decides which family this session sees, so redeeming after it would
    // show the invitee an empty dashboard until they reloaded.
    await _redeemPendingCoparent();
    await _loadParentFamily();
    if (!_family && _needsFamilySetup(profile)) {
      _showFamilySetup();
      return;
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
    // Same load-state handling as the student path - see getPlanFeatures().
    _planFeaturesState = 'pending';
    Store.getUserPlan(_parentUser.id).then(r => {
      if (r?.plan?.features) _planFeatures = r.plan.features;
      _planFeaturesState = 'loaded';
    }).catch(err => {
      _planFeaturesState = 'failed';
      console.warn('[Auth] plan features could not be loaded - plan limits are '
        + 'NOT being applied this session:', err?.message || err);
    });
    // Not awaited and never fatal: with no referrals, or on a database without
    // the rewards RPC, this resolves to 0 and the app behaves as it always has.
    if (typeof Shop !== 'undefined') Shop.refresh().catch(() => {});
  }

  // Note the role passed to createProfile: 'parent', NOT 'teacher'. Signing up
  // on the teacher tab expresses intent, not entitlement - profiles.role only
  // becomes 'teacher' when an admin approves, via admin_set_teacher_status().
  async function _bootstrapTeacherProfile() {
    const name = _parentUser.user_metadata?.full_name
              || _parentUser.email?.split('@')[0] || 'Teacher';
    const created = await Store.createProfile(_parentUser.id, 'parent', name);
    if (!created || created._error) {
      console.error('[auth] could not create teacher profile:', created && created._error);
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
    // Landing on the parent dashboard is a deliberate switch, whether it came
    // from a sign-in, the 🔒 Parent button or the PIN pad. Safe to stamp on the
    // restore path too: with the ownership check in init(), a restore only
    // happens when the parent already owns the device.
    _markActiveMode('parent');
    renderParentDashboard();
    showScreen('parent');
    // Both logout buttons — the labelled desktop pill and its always-visible
    // mobile twin. See the comment beside #header-logout-mobile in index.html.
    _setLogoutVisible(true);
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
          // Same change as the parent path: expired signs in to a restricted
          // app rather than being turned away, because chapters the parent
          // bought with credits outlive the account's expiry date. The server
          // is what actually withholds everything else.
          _setAccessExpired(!!(sv.expires_at && new Date(sv.expires_at) < new Date()));
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

    // ⚠ A game screen (Game Zone) has no resumable server state - the climb
    // lives only in memory. Refreshing on it used to fall through to the subject
    // picker ("pick a subject to practise"), which reads as being kicked out of
    // the game. Return them to the Game Zone hub instead. Checked BEFORE the
    // subject restore so it wins.
    let lastKidScreen = null;
    try { lastKidScreen = sessionStorage.getItem('psac-last-screen'); } catch (_) {}
    if (lastKidScreen === 'minigames' && typeof MiniGames !== 'undefined') {
      MiniGames.resumeOrHub();   // continues a saved game, or shows the hub
      return;
    }

    // Restore the subject the child was using before the refresh. Subject
    // choice used to be memory-only, so a refresh always dropped them back at
    // "Pick a subject" even after they had opened History & Geography.
    let previousSubject = null;
    try { previousSubject = sessionStorage.getItem(`psac-active-subject:${sess.id}`); } catch (_) {}
    const restoredPack = previousSubject && typeof activateSubjectPack === 'function'
      ? activateSubjectPack(previousSubject) : null;
    if (restoredPack) {
      renderDashboard();
      showScreen('dashboard');
    // Skip grade select - go straight to subject picker with the stored grade
    } else if (typeof SUBJECT_PACKS !== 'undefined' && SUBJECT_PACKS.length > 1) {
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
  let _parentRenewing = false;
  if (typeof Events !== 'undefined') {
    Events.on('session-invalid', async () => {
      // ⚠ _activeAccount is NOT proof that a child is signed in. pdSwitchStudent
      // sets it for a parent PREVIEWING a child, and that path deliberately has
      // no student token at all — its reads and writes are authorised by the
      // PARENT's own JWT through owns_student_txt(). So a refusal there means
      // the parent's session lapsed, not the child's, and the old handler
      // answered it by clearing the child's session and dropping the parent onto
      // the student PIN screen reading "Your session has expired" while they sat
      // in their own dashboard. Same root cause as a correct Parent PIN being
      // refused; a different screen to be thrown off.
      //
      // Renew it in place instead — the whole point of _ensureParentSession().
      // Nothing is said to anybody if that works.
      // _parentProfile IS _isParentSession() — that helper in app.js is exactly
      // `!!Auth.getParentProfile()` — read here directly rather than reaching
      // across modules for the same value.
      if (_parentProfile || !_storedStudentSession()) {
        if (_parentRenewing || !(_parentUser || _parentProfile)) return;
        _parentRenewing = true;
        try {
          if (await _ensureParentSession()) return;
          if (!navigator.onLine) {
            toast('You are offline — changes are saved on this device and will sync when you reconnect.', 5000);
            return;
          }
          toast('Your parent sign-in has ended. Please sign in with your email to continue.', 5000);
          showScreen('auth');
          setRole('parent');
        } finally { _parentRenewing = false; }
        return;
      }
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
    //
    // ⚠ Only for a REAL login. A parent previewing a child (pdSwitchStudent)
    // arrives here with NO token, and a preview is not a sign-in. Persisting a
    // tokenless session — and stamping the device 'student' — meant every later
    // reload resumed a session that carries no credential, which _resumeStudent()
    // can only answer with "Please sign in again to continue.". One tap on a
    // child's card in the parent dashboard poisoned the stored session for good,
    // and the parent was bounced to the sign-in screen on every refresh from then
    // on. store.js's _flushProgressToSupabase() already documents the intended
    // contract: a parent previewing a child has no student session at all.
    //
    // A preview still needs the two SIDE-EFFECTS of saveStudentSession — flush
    // the outgoing child's pending write, and drop any x-student-token so no
    // query leaves under a different child's credential — but a real signed-in
    // child's stored session is left untouched, so handing the phone back does
    // not cost them their PIN.
    if (token) {
      Store.saveStudentSession(sess);
      // A PIN login is the clearest statement there is about who is using this
      // device — see _markActiveMode().
      _markActiveMode('student');
    } else {
      try { await Store.flushPendingProgress(); } catch (_) {}
      if (typeof setStudentToken === 'function') setStudentToken(null);
    }
    // Remember what this child had to type, so next time they only need the PIN.
    // ⚠ Family name and username only — never the PIN, which is the credential.
    _rememberKnownStudent(studentRow);

    // Connect any pending friend invite (captured from ?friend= URL before login)
    if (bumpSession) _consumePendingFriend().catch(() => {});

    // Apply parent restrictions to DB
    const progress = await Store.loadStudentProgress(studentRow.id);
    const merged   = Object.assign(progress, { restrictions: studentRow.settings });
    Object.assign(DB, merged);
    // Same guard as the theme line below: pdSwitchStudent (parent previewing
    // a child from the Parent Dashboard) calls this too, with
    // applyUserTheme:false - a read-only preview must not repaint the shared
    // <html> element with THAT child's vibe/text-size/sound preference,
    // which would otherwise still be sitting there the next time the parent
    // (or a different child) looks at a kid-facing screen.
    _activeAccount    = { id: studentRow.id, name: studentRow.display_name, avatar: studentRow.avatar, grade: studentRow.grade };
    ACTIVE_STUDENT_ID = studentRow.id;

    // AFTER ACTIVE_STUDENT_ID, never before. _applyKidPrefs re-reads
    // _soundEnabled through _prefKey(), which scopes the key by the CURRENT
    // student id - so running it first resolved to the previous child, or to
    // the 'guest' bucket on a fresh load. On a shared tablet that meant child B
    // silently inherited child A's sound setting instead of their own.
    if (applyUserTheme && typeof _applyKidPrefs === 'function') _applyKidPrefs();

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
      _planFeaturesState = 'pending';
      // ⚠ ONE server-side call, not a walk from students -> families -> plan.
      // A child is anon + a token header, and `families_own` needs auth.uid() on
      // every arm, so reading families.parent_id here returned NOTHING for every
      // child, every session - plan limits silently never applied. Widening that
      // policy was the wrong fix: `families` also carries `family_code`, the
      // private join secret, and a child's device is the least trusted in the
      // family. student_plan_features() returns the plan and nothing else.
      // Passing the id explicitly also covers a parent PREVIEWING a child, which
      // has no student token and authorises through the parent's JWT.
      _sb.rpc('student_plan_features', { p_student: studentRow.id })
        .then(async ({ data, error }) => {
          if (error) throw new Error(error.message || 'plan lookup failed');
          if (!data || data.ok !== true) throw new Error((data && data.error) || 'plan lookup refused');
          // The child needs the family's live chapter unlocks so the UI stops
          // showing a bought chapter as locked. Credits stay the parent's and are
          // never fetched into a child's session.
          if (typeof Shop !== 'undefined') Shop.refreshFamily().catch(() => {});
          if (data.features) _planFeatures = data.features;
          // 'loaded' even when there is no plan row: that IS the answer (free),
          // and it is what lets getPlanFeatures() start applying free caps.
          _planFeaturesState = 'loaded';
        })
        .catch(err => {
          // Never silent. Enforcement stays OFF for this session rather than
          // capping someone who may well have paid - but somebody has to be
          // able to find out that it happened.
          _planFeaturesState = 'failed';
          console.warn('[Auth] plan features could not be loaded - plan limits are '
            + 'NOT being applied this session:', err?.message || err);
        });
    }

    // Pre-load questions for this student's grade.
    // ⚠ useStudent() FIRST. Switching child never reloads the page, so without
    // it the previous child's questions are still in STATIC_QUESTIONS and _done
    // reports every subject already loaded - the new child would simply inherit
    // them. A no-op when the same child signs back in.
    const studentGrade = studentRow.grade || 5;
    if (typeof QuestionLoader !== 'undefined') {
      QuestionLoader.useStudent?.(studentRow.id);
      QuestionLoader.loadForStudent(studentGrade).catch(() => {});
    }

    // Show header logout button and profile chip
    // Both logout buttons — the labelled desktop pill and its always-visible
    // mobile twin. See the comment beside #header-logout-mobile in index.html.
    _setLogoutVisible(true);
    if (headerChip) _updateHeaderProfileChip('student', studentRow);
    if (bumpSession) Store.logLoginEvent(studentRow.id, 'student');
    if (bumpSession) _startSessionGuard(studentRow.id, sessionVersion);
    if (bumpSession && typeof setupPushNotifications === 'function') {
      setupPushNotifications(studentRow.id).catch(() => {});
    }

    // Skip grade select - parent already set the grade; go straight to subject picker
    if (navigate) {
      // ⚠ This is where the device stops belonging to the parent. Clearing
      // _parentProfile makes _isParentSession() false, so showScreen() below
      // does not hit the _KID_ONLY_SCREENS guard and bounce the child straight
      // back to the parent dashboard.
      //
      // It lives HERE rather than in switchToStudentSelect() because it must
      // happen only once the PIN has actually been accepted — clearing it before
      // the attempt strands a parent who mistypes. pdSwitchStudent() passes
      // navigate:false precisely because it is the parent PREVIEWING a child and
      // must stay a parent.
      //
      // _parentUser is intentionally kept: it stops onAuthStateChange SIGNED_IN
      // re-firing _handleParentSessionGated during the child's session, and
      // enterParentMode() restores _parentProfile via _handleParentSession().
      _parentProfile = null;
      _handovers++;
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
  // ══════════════════════════════════════════════
  //  KNOWN STUDENTS ON THIS DEVICE
  //
  //  A returning child had to type the family name, their username AND a PIN,
  //  every time — on a phone their family has used for months. The family name
  //  in particular is the same for everybody in the house and is the field they
  //  are least likely to get right.
  //
  //  ⚠ Only the two IDENTIFYING fields are remembered. The PIN is the
  //  credential and is never stored — verify_student_pin() still checks it in
  //  the database exactly as before. This removes typing, not a security step.
  // ══════════════════════════════════════════════
  const _KNOWN_KEY = 'psac_known_students';

  function _knownStudents() {
    try {
      const v = JSON.parse(localStorage.getItem(_KNOWN_KEY) || 'null');
      return Array.isArray(v) ? v : [];
    } catch (_) { return []; }
  }

  function _rememberKnownStudent(studentRow) {
    if (!studentRow || !studentRow.id) return;
    const family = (_family && _family.family_name)
      || (_el('student-family-name') && _el('student-family-name').value.trim())
      || '';
    const list = _knownStudents().filter(x => x.id !== studentRow.id);
    list.unshift({
      id:       studentRow.id,
      name:     studentRow.display_name || studentRow.username || '',
      username: studentRow.username || '',
      avatar:   studentRow.avatar || '🎒',
      grade:    studentRow.grade || null,
      family,
    });
    // Bounded: a device shared by a whole class should not grow a roster of
    // every child who ever borrowed it.
    try { localStorage.setItem(_KNOWN_KEY, JSON.stringify(list.slice(0, 8))); } catch (_) {}
  }

  function getKnownStudents() { return _knownStudents(); }

  function forgetKnownStudents() {
    try { localStorage.removeItem(_KNOWN_KEY); } catch (_) {}
  }

  // Collapses the student form to the PIN alone. The other two fields keep
  // their values (checkStudentReady and studentSignIn still read them) — they
  // are hidden, not emptied, so the existing sign-in path is untouched.
  function _setQuickPinMode(on, label) {
    const wrap = _el('student-quick');
    const full = _el('student-full-fields');
    const hint = _el('student-full-hint');
    if (full) full.classList.toggle('hidden', !!on);
    if (hint) hint.classList.toggle('hidden', !!on);
    if (wrap) {
      wrap.classList.toggle('hidden', !on);
      const who = _el('student-quick-who');
      if (who && label) who.textContent = label;
    }
  }
  function useFullStudentSignIn() {
    _setQuickPinMode(false);
    const f = _el('student-family-name');
    if (f) setTimeout(() => f.focus(), 60);
  }

  function loginStudent(id) {
    const student = (_familyStudents || []).find(s => s.id === id);
    const account = student || Store.getAccounts().find(a => a.id === id);
    if (!account) return;

    showScreen('auth');
    setRole('student');

    // Everything except the PIN comes from what this device already knows.
    const known = _knownStudents().find(k => k.id === id) || {};
    const uname = student?.username || known.username || '';
    const fam   = (_family && _family.family_name) || known.family || '';

    const el = _el('student-username');
    if (el) el.value = uname;
    const famEl = _el('student-family-name');
    if (famEl) famEl.value = fam;

    const label = student?.display_name || known.name || account.name || 'your account';

    // PIN-only only when we genuinely have the other two. Without them the
    // button would sit disabled with no visible reason why.
    _setQuickPinMode(!!(uname && fam), label);

    const pinEl = _el('student-pin');
    if (pinEl) { pinEl.value = ''; setTimeout(() => pinEl.focus(), 80); }
    checkStudentReady();
  }

  // ══════════════════════════════════════════════
  //  AUTH SCREEN UI
  // ══════════════════════════════════════════════

  function setRole(role) {
    _currentRole = role;
    // ⚠ Quick sign-in is entered only via loginStudent(), which knows WHO is
    // signing in. Tapping the Student tab directly is the generic route, so the
    // full form must come back — otherwise the previous child's name would sit
    // above a PIN box for whoever tapped next.
    _setQuickPinMode(false);

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
      // ⚠ Route on the CODE first. GoTrue answers 400 with
      // error_code 'email_not_confirmed' (measured), and that identifier is
      // stable in a way the English sentence beside it is not. The substring
      // test stays as a fallback, but it must not be the only thing standing
      // between an unconfirmed parent and the resend screen - if the wording
      // ever shifts, the raw error would be shown instead and they would have
      // no way back in. Reachable for the first time now that
      // mailer_autoconfirm is off.
      const _code = error.code || error.error_code || '';
      const _msg  = (error.message || '').toLowerCase();
      if (_code === 'email_not_confirmed'
          || _msg.includes('not confirmed') || _msg.includes('not verified')) {
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

  // ⚠ Every sign-up, resend and password reset costs ONE email, and they all
  // share one quota. GoTrue answers 429 with two very different situations
  // behind the same status, and its own wording ("email rate limit exceeded")
  // means nothing to a parent and does not say whether the problem is theirs or
  // ours:
  //   • over_request_rate_limit  — the per-ADDRESS floor (smtp_max_frequency,
  //     60s live). This one is the caller's own doing and clears in a minute.
  //   • over_email_send_rate_limit — the PROJECT-WIDE hourly cap, which is
  //     Supabase's built-in test sender at 2/hour until custom SMTP is
  //     configured. Nothing the caller does clears it, and telling them to
  //     "try again" makes them retry immediately and consume the next slot.
  // Anything else keeps its original wording: a made-up friendly message over
  // an unknown error is how a real fault becomes unreportable.
  // `what` names the thing that could not be sent. The same mapper serves
  // sign-up and password recovery, and one generic sentence gets one of them
  // wrong: it said "we will activate your account by hand" on the FORGOT
  // PASSWORD screen, which answers a question nobody there asked.
  function _emailErrorText(error, what) {
    const thing = what || 'email';
    const msg  = String(error?.message || '');
    const code = String(error?.code || '');
    const secs = (msg.match(/after (\d+) seconds?/) || [])[1];
    if (code === 'over_request_rate_limit' || secs) {
      return secs
        ? `Please wait ${secs} seconds before asking for another ${thing}.`
        : `Please wait a minute before asking for another ${thing}.`;
    }
    if (code === 'over_email_send_rate_limit' || /email rate limit|rate limit exceeded/i.test(msg)) {
      return `We could not send your ${thing} — our mail service has hit its hourly limit. `
           + 'This is on our side, not yours. Please try again in an hour, or contact us for help.';
    }
    return msg || 'Something went wrong. Please try again.';
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
      _pendingVerifyEmail = email;
      if (_el('verify-email-addr')) _el('verify-email-addr').textContent = email;
      const msg = _el('verify-email-message');
      if (msg) msg.textContent = 'An account already exists for this email. If it is still waiting for verification, resend the activation email. If it is already activated, reset the password instead.';
      _el('verify-reset-password')?.classList.remove('hidden');
      showScreen('verify-email');
      return;
    }

    if (error) { _showAuthError(_emailErrorText(error, 'activation email')); return; }

    // ⚠ Read the RESULT, never a stored assumption about how this project is
    // configured. signUp() returns a live session when the project confirms
    // email automatically (mailer_autoconfirm), and none when it sends a link.
    // Sending someone who is already signed in to "click the link in the email"
    // leaves them staring at an inbox that will never receive anything — which
    // is exactly what turning autoconfirm on does to this screen. Routing off
    // the session covers both settings, so flipping it back needs no code
    // change either.
    if (data?.session) {
      _clearAuthError();
      await _handleParentSessionGated(data.session);
      return;
    }

    // Show check-email screen
    _pendingVerifyEmail = email;
    if (_el('verify-email-addr')) _el('verify-email-addr').textContent = email;
    const note = _el('verify-teacher-note');
    if (note) note.classList.toggle('hidden', role !== 'teacher');
    const msg = _el('verify-email-message');
    if (msg) msg.textContent = 'Click the link in the email to activate your account. Check your spam folder if you do not see it within a minute.';
    _el('verify-reset-password')?.classList.add('hidden');
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
    _el('auth-magic-panel')?.classList.add('hidden');
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

    if (error) { _showAuthError(_emailErrorText(error, 'password-reset link')); return; }
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
    if (error) toast(_emailErrorText(error, 'activation email'), 6000);
    else toast('Verification email resent! Check your inbox.', 4000);
  }

  async function sendRecoveryForPending() {
    if (!_sb || !_pendingVerifyEmail) return;
    const { error } = await _sb.auth.resetPasswordForEmail(_pendingVerifyEmail, {
      redirectTo: 'https://psac-practice.netlify.app/',
    });
    if (error) { toast(_emailErrorText(error, 'password-reset link'), 6000); return; }
    toast('Password-reset email sent. Check your inbox.', 4000);
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
    _clearParentStash();
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
  // ⚠ Sign-in only: shouldCreateUser is FALSE on purpose. Account creation
  // stays on the sign-up path alone, which is the only place that checks the
  // admin's registration_open kill switch, captures full_name and the
  // teacher-role intent, and stashes a referral code. A magic link that
  // silently created accounts would walk straight past all four.
  //
  // ⚠ GoTrue answers an unknown address with 422 error_code 'otp_disabled' and
  // the message "Signups not allowed for otp" (measured) - which would read to a
  // parent as though the feature were broken rather than as "you have no
  // account yet". Translate it; never show that sentence.
  async function magicLinkSignIn() {
    if (!_sb) { _showAuthError('Supabase not loaded.'); return; }
    const email = (_el('auth-email')?.value || '').trim();
    if (!email) {
      _showAuthError('Please enter your email address first.');
      _el('auth-email')?.focus();
      return;
    }

    _setAuthLoading(true);
    const { error } = await _sb.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false, emailRedirectTo: 'https://psac-practice.netlify.app/' },
    });
    _setAuthLoading(false);

    if (error) {
      const code = error.code || error.error_code || '';
      _showAuthError(code === 'otp_disabled' || /signups not allowed/i.test(error.message || '')
        ? 'We could not find an account with that email. Please sign up first, or use your password.'
        : _emailErrorText(error, 'sign-in link'));
      return;
    }

    _clearAuthError();
    if (_el('auth-magic-addr')) _el('auth-magic-addr').textContent = email;
    _el('auth-signin-fields')?.classList.add('hidden');
    _el('auth-forgot-panel')?.classList.add('hidden');
    _el('auth-magic-panel')?.classList.remove('hidden');
  }

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
    if (!_parentProfile) {
      toast('Please switch to parent mode first.', 3000);
      return;
    }
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
    // Premium is sold as the tier "for big families and private tutors", so the
    // plan decides who may APPLY. Approval is still a separate admin decision -
    // this gate does not grant teacher access, it only opens the application.
    if (typeof _planAllowsFeature === 'function' && !_planAllowsFeature('tutor_status')) {
      if (typeof _showFeatureModal === 'function') _showFeatureModal('tutor_status');
      return null;
    }
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

    // Paint from cache first so the panel is never empty, then from the server.
    if (typeof renderInviteCredits === 'function') renderInviteCredits();

    const referrals = await Store.getMyReferrals();
    if (countEl) countEl.textContent = String(referrals.length);
    if (typeof Shop !== 'undefined') {
      await Shop.refresh();
      if (typeof renderInviteCredits === 'function') renderInviteCredits();
    }
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

    // More than one family is registered under this name, so a name lookup
    // cannot tell which child this is.
    //
    // There IS something the child can type: the 6-character family code is
    // unique, and verify_student_pin now accepts it in the same box. Saying
    // only "ask your parent to rename the family" left a child stranded until
    // an adult was available to change a setting - the code unblocks them now,
    // and the rename is the permanent fix rather than the only one.
    if (data.error === 'ambiguous_family') {
      _showAuthError('Another family uses this name too, so we cannot tell which account is yours. '
        + 'Type your 6-letter family code in the family box instead — your parent can '
        + 'find it in Settings → Family Login.');
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
    const childUser   = _normaliseUsername(_el('setup-child-username')?.value);
    const childGrade  = parseInt(_el('setup-child-grade')?.value || '5');
    const childPin    = (_el('setup-child-pin')?.value    || '').trim();

    if (!childName)             { toast('Please enter the child\'s name.', 2000); return; }
    const _cuErr = _usernameError(childUser);
    if (_cuErr)                 { toast(_cuErr, 3500); return; }
    if (!/^\d{4}$/.test(childPin)) { toast('PIN must be exactly 4 digits.', 2000); return; }

    const role = _parentUser.user_metadata?.role || 'parent';
    const name = _parentUser.user_metadata?.full_name || _parentUser.email;

    // Create profile. createProfile() hands back the EXISTING row when there
    // already is one, so re-running a setup that fell over at the family or
    // child step now resumes instead of dying on a duplicate primary key.
    const profile = await Store.createProfile(_parentUser.id, role, name);
    if (!profile || profile._error) {
      const e = profile && profile._error;
      // ⚠ The code, on screen. This is a dead end for whoever hits it, and
      // "please try again" is unactionable for both them and anyone debugging
      // it — a 42501 (a column with no GRANT) and a dropped connection need
      // completely different answers and used to look identical here.
      toast(e && e.code === 'offline'
        ? 'No connection to the server. Check your internet and try again.'
        : 'Could not create your profile' + (e && e.code ? ' (' + e.code + ')' : '')
          + '. ' + ((e && e.message) || 'Please try again.'), 6000);
      return;
    }
    _parentProfile = profile;
    await _consumePendingReferral(_el('setup-referral-code')?.value);

    // Create family
    // Like the profile above, this returns the family this parent ALREADY owns
    // rather than failing, so a retry picks up where the last attempt stopped.
    const family = await Store.createFamily(_parentUser.id, familyName);
    if (!family || family._error) {
      const fe = family && family._error;
      // 23505 that survived createFamily's own probe: another family already
      // answers to this name, and children log in with it - so it has to be
      // unique. Name the real problem; "try again" would have them retry the
      // same name for ever.
      toast(fe && fe.code === '23505'
        ? 'Another family already uses that name. Please choose a different family name.'
        : 'Could not create your family' + (fe && fe.code ? ' (' + fe.code + ')' : '')
          + '. ' + ((fe && fe.message) || 'Please try again.'), 6000);
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
    _planFeatures      = null;
    _planFeaturesState = 'pending';
    window.PLAN_ENFORCEMENT = false;
    // One family's referral perks must not follow the next account signed in on
    // a shared phone.
    if (typeof Shop !== 'undefined') Shop.reset();
    // Re-hide the privileged buttons, or they persist into the next session on
    // a shared device.
    ['btn-open-teacher', 'btn-open-admin'].forEach(id => {
      const b = document.getElementById(id);
      if (b) { b.classList.add('hidden'); b.classList.remove('flex'); }
    });
    _setLogoutVisible(false);
    const hdrProfile = document.getElementById('header-profile-btn');
    if (hdrProfile) { hdrProfile.classList.add('hidden'); hdrProfile.classList.remove('flex'); }
    // Kid-home customisation (My Settings) is per-student - on a shared
    // family device the next thing shown must not carry a previous child's
    // vibe/text-size into the landing page or the next login.
    document.documentElement.removeAttribute('data-kid-vibe');
    document.documentElement.classList.remove('kid-calm', 'kid-text-lg');
    if (typeof QuestionLoader !== 'undefined') QuestionLoader.useStudent?.(null);
    _clearParentStash();
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
    if (_parentSessionLoad) await _parentSessionLoad;
    await _loadParentFamily();
    if (!_family && _parentUser && _needsFamilySetup(_parentProfile)) {
      // Same reasoning as _handleParentSession(): there is nothing to retry,
      // the family was never created. Finish the setup instead of redrawing
      // the same error.
      _showFamilySetup();
      return;
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
        const mkErr = made && made._error;
        if (mkErr) {
          toast(mkErr.code === '23505'
            ? 'Another family already uses that name. Open Account & Settings → Family Login to set yours.'
            : 'Could not set up your family' + (mkErr.code ? ' (' + mkErr.code + ')' : '')
              + '. ' + (mkErr.message || 'Please try again.'), 6000);
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
    // A suggested PIN is helpful, but the parent must deliberately type the
    // PIN they choose. Never pre-fill a secret into the new-child form.
    if (_el('add-child-pin'))            _el('add-child-pin').value          = '';
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
    const uname = _normaliseUsername(_el('add-child-username')?.value);
    const grade = parseInt(_el('add-child-grade')?.value || '5');
    const pin   = (_el('add-child-pin')?.value      || '').trim();

    if (!name)  { toast('Please enter a name.', 2000); return; }

    const existingId = _el('add-student-id')?.value;
    // Validated on CREATE only. The edit branch below never writes username -
    // it updates displayName/grade/avatar/settings and optionally the PIN - but
    // the field is pre-filled from the stored value, so validating here would
    // lock a child created under the old "not blank" rule out of every edit:
    // no grade change, no PIN reset, and a complaint about a username the form
    // was not going to touch.
    if (!existingId) {
      const _unErr = _usernameError(uname);
      if (_unErr) { toast(_unErr, 3500); return; }
    }
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

  // ⚠ ACTIVE_STUDENT_ID, not the stored student session. This is the ✏️ Edit
  // button in the parent dashboard's child panel, and a parent previewing a
  // child deliberately has no student session — see _loginStudentRow(). Matches
  // deleteCurrentStudent() right below, which always read it from there.
  function editCurrentStudent() {
    if (typeof ACTIVE_STUDENT_ID !== 'undefined' && ACTIVE_STUDENT_ID) editStudent(ACTIVE_STUDENT_ID);
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

  // "Switch to student mode" from the parent dashboard. The parent is signed in on this
  // device and the app already knows every child in the family by name — so
  // asking them to retype the family name and a username on the full sign-in
  // screen was work with no purpose. Pick a face, tap four digits.
  //
  // The full screen is still the fallback, and still the route for a child
  // signing in on a device with no parent session (nothing to list).
  function switchToStudentSelect() {
    if (_swCandidates().length) { openStudentSwitch(); return; }
    _switchToFullStudentSignIn();
  }

  function _switchToFullStudentSignIn() {
    // Only here, where there is no PIN prompt of our own keeping the parent
    // anchored, does the profile have to go up front: the full auth screen is
    // not a modal and _KID_ONLY_SCREENS would fight it.
    _parentProfile = null;
    showScreen('auth');
    setRole('student');
  }

  // ══════════════════════════════════════════════
  //  SWITCH TO A CHILD  (#modal-student-switch)
  //
  //  ⚠ Verification is NOT reimplemented here. Picking a child fills the same
  //  three fields the sign-in screen uses and the pad calls the same
  //  studentSignIn(), so verify_student_pin(), the attempt lockout, the session
  //  minting and the session_version bump are all shared. This modal is an
  //  input surface, not an auth path.
  // ══════════════════════════════════════════════
  // Incremented every time _loginStudentRow() actually hands the device over.
  // ⚠ The switch modal decides success by watching this, NOT by testing whether
  // _parentProfile is now null — null is also the state when no parent was
  // signed in to begin with, which would read a rejected PIN as a success.
  let _handovers = 0;

  let _swPin   = '';
  let _swKidId = null;
  let _swOpen  = false;
  let _swBusy  = false;

  // Children the device can offer. _familyStudents is the live list (the parent
  // is signed in, so it is populated); the remembered roster is the fallback for
  // a session where that fetch has not landed yet.
  function _swCandidates() {
    const live = (_familyStudents || []).filter(s => s && s.id && !s.deleted_at);
    if (live.length) {
      return live.map(s => ({
        id: s.id,
        name: s.display_name || s.username || 'Child',
        avatar: s.avatar || '🧒',
        username: s.username || '',
        family: (_family && _family.family_name) || '',
      })).filter(k => k.username && k.family);
    }
    return _knownStudents().map(k => ({
      id: k.id, name: k.name || k.username || 'Child', avatar: k.avatar || '🧒',
      username: k.username || '', family: k.family || '',
    })).filter(k => k.username && k.family);
  }

  function openStudentSwitch() {
    const kids = _swCandidates();
    if (!kids.length) { _switchToFullStudentSignIn(); return; }
    _swPin = ''; _swKidId = null; _swBusy = false;
    _swOpen = true;
    _el('modal-student-switch')?.classList.remove('hidden');
    _swError('');
    // One child in the family: there is nothing to choose, so choose it. The
    // chip still renders — it is what tells them whose PIN is being asked for.
    if (kids.length === 1) _swPickKid(kids[0].id);
    else { _swRenderKids(kids); _swRenderDots(); }
    document.addEventListener('keydown', _swKeydown);
  }

  function closeStudentSwitch() {
    _swOpen = false; _swPin = ''; _swKidId = null;
    _el('modal-student-switch')?.classList.add('hidden');
    const pinEl = _el('student-pin'); if (pinEl) pinEl.value = '';
    document.removeEventListener('keydown', _swKeydown);
    // Dismissing costs nothing: the parent session was never touched.
  }

  function fullStudentSignInFromSwitch() {
    closeStudentSwitch();
    _switchToFullStudentSignIn();
  }

  function _swKeydown(e) {
    if (e.key === 'Escape')    { closeStudentSwitch(); return; }
    if (e.key === 'Backspace') { _swKey('back'); e.preventDefault(); return; }
    if (/^[0-9]$/.test(e.key)) { _swKey(e.key); e.preventDefault(); }
  }

  function _swRenderKids(kids) {
    const wrap = _el('sw-kids');
    if (!wrap) return;
    wrap.innerHTML = (kids || _swCandidates()).map(k => `
      <button type="button" onclick="Auth._swPickKid('${k.id}')"
        class="sw-kid ${k.id === _swKidId ? 'sw-kid-on' : ''}">
        <span class="sw-kid-face">${k.avatar}</span>
        <span class="sw-kid-name">${_escSw(k.name)}</span>
      </button>`).join('');
  }

  function _escSw(t) {
    return String(t == null ? '' : t)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function _swPickKid(id) {
    const kid = _swCandidates().find(k => k.id === id);
    if (!kid) return;
    _swKidId = id;
    _swPin = '';
    // Fill the fields studentSignIn() reads. They live on the hidden auth
    // screen; this modal deliberately owns no credential logic of its own.
    const f = _el('student-family-name'); if (f) f.value = kid.family;
    const u = _el('student-username');    if (u) u.value = kid.username;
    const p = _el('student-pin');         if (p) p.value = '';
    const hint = _el('sw-hint');
    if (hint) hint.textContent = `Enter ${kid.name}'s 4-digit PIN.`;
    _swError('');
    _swRenderKids();
    _swRenderDots();
  }

  function _swRenderDots() {
    for (let i = 0; i < 4; i++) {
      const d = _el('sw-dot-' + i);
      if (!d) continue;
      const on = i < _swPin.length;
      d.style.background  = on ? '#6366f1' : 'transparent';
      d.style.borderColor = on ? '#6366f1' : '';
    }
  }

  function _swError(msg) {
    const el = _el('sw-error');
    if (!el) return;
    el.textContent = msg || '';
    el.classList.toggle('hidden', !msg);
  }

  async function _swKey(k) {
    if (_swBusy) return;
    if (k === 'clear') { _swPin = ''; _swRenderDots(); _swError(''); return; }
    if (k === 'back')  { _swPin = _swPin.slice(0, -1); _swRenderDots(); return; }
    if (!_swKidId)     { _swError('Choose who is signing in first.'); return; }
    if (_swPin.length >= 4) return;

    _swPin += k;
    _swRenderDots();
    if (_swPin.length < 4) return;

    _swBusy = true;
    _swError('');
    const pinEl = _el('student-pin');
    if (pinEl) pinEl.value = _swPin;
    const before = _handovers;
    try {
      await studentSignIn();
    } finally {
      _swBusy = false;
    }
    // Success is the device actually being handed over. Checking
    // ACTIVE_STUDENT_ID would not work — pdSwitchStudent() has usually already
    // set it to this very child so the Controls tab has something to read.
    if (_handovers > before) {
      closeStudentSwitch();
      return;
    }
    _swPin = '';
    _swRenderDots();
    if (pinEl) pinEl.value = '';
    if (!(_el('sw-error')?.textContent || '').trim()) _swError('Incorrect PIN. Try again.');
  }

  // ── Welcome name helper ────────────────────────
  function _setWelcomeName(name) {
    const el = _el('welcome-name');
    if (el) el.textContent = name;
  }

  // ── Parent dashboard ───────────────────────────
  // ── Parent PIN helpers ─────────────────────────
  const _PARENT_PIN_KEY = 'psac_parent_pin_v1';
  let _parentPinBusy = false;
  let _dbPinHash = null; // cached parent_pin_hash from profiles; '' = confirmed absent

  function _getStoredPinHash() {
    try { return localStorage.getItem(_PARENT_PIN_KEY) || null; } catch(_) { return null; }
  }

  async function _hashPinForDb(pin) {
    try {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pin + ':psac_v1_db'));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
    } catch (_) { return null; }
  }

  async function _fetchDbPinHash() {
    if (_dbPinHash !== null) return _dbPinHash || null;
    if (!_parentUser) return null;
    try {
      const { data } = await _sb.from('profiles').select('parent_pin_hash').eq('id', _parentUser.id).single();
      _dbPinHash = data?.parent_pin_hash || '';
      return _dbPinHash || null;
    } catch (_) { return null; }
  }

  function _storePin(pin) {
    try { localStorage.setItem(_PARENT_PIN_KEY, btoa(pin + ':psac_v1')); } catch(_) {}
    // Also save SHA-256 hash to DB so the PIN survives localStorage clears
    _hashPinForDb(pin).then(hash => {
      if (!hash || !_parentUser) return;
      _sb.from('profiles').update({ parent_pin_hash: hash }).eq('id', _parentUser.id)
        .then(() => { _dbPinHash = hash; }).catch(() => {});
    });
  }

  async function _pinMatches(pin) {
    const local = _getStoredPinHash();
    if (local !== null) return local === btoa(pin + ':psac_v1');
    // localStorage was cleared — fall back to DB
    const [inputHash, dbHash] = await Promise.all([_hashPinForDb(pin), _fetchDbPinHash()]);
    if (!inputHash || !dbHash) return false;
    const ok = inputHash === dbHash;
    // Repopulate localStorage on match so next check is offline-capable
    if (ok) _storePin(pin);
    return ok;
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
    if (_parentPinBusy) return;
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
    if (!await _pinMatches(_parentPinEntry)) {
      _parentPinEntry = '';
      _updatePinDots('pin-dot-', 0);
      document.getElementById('pin-entry-error')?.classList.remove('hidden');
      if (navigator.vibrate) navigator.vibrate([80, 40, 80]);
      return;
    }
    // ⚠ The guard here used to be `if (session && !_parentUser)`, and that one
    // condition made the correct PIN fail for the most ordinary route back into
    // the parent dashboard.
    //
    // Handing the device to a child (_loginStudentRow with navigate:true, or
    // _switchToFullStudentSignIn) deliberately clears _parentProfile — so
    // _isParentSession() is false and the child is not bounced off their own
    // screens — while deliberately KEEPING _parentUser, so onAuthStateChange
    // does not re-fire mid-session. enterParentMode() restores the profile on
    // the way back.
    //
    // So on the way back: _parentUser is set, _parentProfile is null, and the
    // Supabase session is alive and well. The old first branch was skipped
    // (because of !_parentUser), the second was skipped (because _parentProfile
    // is null), and a signed-in parent with a valid session was told "no parent
    // account is signed in on this device yet". enterParentMode() has always
    // had this right — it checks `if (session)` and nothing else — which is why
    // the failure only appeared on devices that had a PIN set.
    //
    // A live session is a live session. Nothing else needs to be true.
    //
    // ⚠ And a LAPSED access token is not a signed-out parent. A correct PIN is
    // the END of this interaction, not the start of a second one, so
    // _ensureParentSession() re-mints an access token from the refresh token
    // before answering. The modal deliberately stays up while that happens —
    // one that vanishes into nothing reads as a crash — and the busy line only
    // appears if the round trip is actually slow enough to be noticed.
    _suppressAuthEvents = true;
    const busyTimer = setTimeout(() => _setPinBusy(true), 400);
    let session;
    try {
      session = await _ensureParentSession();
      clearTimeout(busyTimer);
      _setPinBusy(false);

      // Via closeParentPin so the keydown listener is detached too — otherwise
      // every digit typed on the dashboard afterwards would still feed the pad.
      closeParentPin();

      if (session) {
        if (_parentProfile) {
          if (_parentSessionLoad) await _parentSessionLoad;
          else await _loadParentFamily();
          _openParentDashboard();
        } else {
          await _handleParentSession(session);
        }
        return;
      }
    } finally {
      clearTimeout(busyTimer);
      _setPinBusy(false);
      _suppressAuthEvents = false;
    }

    // Genuinely no session. ⚠ NOT "no parent has ever signed in here": this
    // function is only reachable through the PIN modal, the modal is only shown
    // when _getStoredPinHash() is non-null, and that hash only exists because a
    // parent set it ON THIS DEVICE. Saying "yet" to someone whose PIN just
    // worked is telling them something they know to be false.
    //
    // Navigation is deliberately withheld while a child is signed in: their
    // session was never touched (closeParentPin only hides the modal), so
    // staying put keeps their place in whatever they were doing.
    //
    // ⚠ Offline is its own answer, not an expiry: the stored token may be
    // perfectly good and merely unverifiable this second. Sending that parent
    // to a sign-in form they equally cannot submit would be the worse lie.
    if (!navigator.onLine) {
      toast('You are offline right now — reconnect, then tap 🔒 Parent again. Your PIN was correct.', 5000);
      return;
    }
    if (_activeAccount) {
      const who = _activeAccount.name ? ` ${_activeAccount.name} stays signed in here.` : '';
      _confirmModal(
        `Your parent sign-in could not be renewed in this browser.\n\n`
        + `Your PIN was correct — but signing in again needs your email and password.${who}`,
        () => { showScreen('auth'); setRole('parent'); },
        { icon: '🔑', okLabel: 'Sign in', danger: false, cancelLabel: 'Not now' }
      );
      return;
    }
    toast('Your parent sign-in could not be renewed in this browser — please sign in with your email.', 4000);
    showScreen('auth');
    setRole('parent');
  }

  // Correct PIN, lapsed token: the pad goes quiet and says what is happening
  // rather than disappearing. Under a second on a working connection, which is
  // why the caller only shows it after 400ms — otherwise it is a flash on
  // every single PIN entry.
  function _setPinBusy(busy) {
    _parentPinBusy = busy;
    const box = document.getElementById('modal-parent-pin');
    if (!box) return;
    box.querySelectorAll('button').forEach(b => { b.disabled = busy; });
    document.getElementById('pin-entry-busy')?.classList.toggle('hidden', !busy);
    if (busy) document.getElementById('pin-entry-error')?.classList.add('hidden');
  }

  function _pinForgot() {
    closeParentPin();
    showScreen('auth');
    setRole('parent');
  }

  // The one-time nudge, the first time a parent reaches their dashboard.
  // ⚠ Its early return is why there was no way to CHANGE a PIN: this was the
  // only caller of the setup modal, so once a hash existed nothing could ever
  // open it again. Settings calls openParentPinSetup() instead, which does not
  // guard.
  async function _promptSetParentPin() {
    if (_getStoredPinHash()) return;
    // Check DB before prompting setup — the parent may already have a PIN set on
    // another device. If so, skip the prompt; they'll enter their existing PIN
    // the first time they tap 🔒 Parent and it will repopulate localStorage.
    const dbHash = await _fetchDbPinHash();
    if (dbHash) return;
    setTimeout(() => { _showPinSetupModal(); }, 1800);
  }

  // Always opens, whether or not a PIN already exists — used by
  // Account & Settings to set a first PIN or replace an existing one.
  function openParentPinSetup() { _showPinSetupModal(); }

  function hasParentPin() { return !!_getStoredPinHash() || !!_dbPinHash; }

  function clearParentPin() {
    try { localStorage.removeItem(_PARENT_PIN_KEY); } catch (_) {}
    _dbPinHash = null;
    if (_parentUser) {
      _sb.from('profiles').update({ parent_pin_hash: null }).eq('id', _parentUser.id).catch(() => {});
    }
  }

  function _showPinSetupModal() {
    {
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
    }
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
          toast('Parent PIN saved. Use it next time you tap 🔒 Parent.', 3000);
          // The Settings row may be on screen behind the modal.
          if (typeof window._renderParentPinRow === 'function') window._renderParentPinRow();
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
    if (_parentSessionLoad) { await _parentSessionLoad; return; }
    if (_parentProfile) {
      await _loadParentFamily();
      _openParentDashboard();
      return;
    }
    if (_getStoredPinHash()) {
      _showParentPinModal();
      return;
    }
    if (_sb) {
      _suppressAuthEvents = true;
      try {
        const session = await _ensureParentSession();
        if (session) { await _handleParentSession(session); return; }
      } finally { _suppressAuthEvents = false; }
    }
    showScreen('auth');
    setRole('parent');
  }

  function exitParentMode() {
    if (_activeAccount) {
      // Handing the phone back to the child is the mirror of tapping 🔒 Parent,
      // and without it the next reload would still route to the dashboard the
      // parent had merely visited.
      _markActiveMode('student');
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

  async function toggleMinigamesDisabled() {
    const r    = _ensureRestrictions();
    const prev = JSON.stringify(r);
    r.minigamesDisabled = !r.minigamesDisabled;
    await _saveRestrictions(prev, r.minigamesDisabled ? '🎮 Game Zone locked.' : '🎮 Game Zone unlocked.');
  }

  async function toggleHintsDisabled() {
    const r    = _ensureRestrictions();
    const prev = JSON.stringify(r);
    r.hintsDisabled = !r.hintsDisabled;
    await _saveRestrictions(prev, r.hintsDisabled ? '💡 In-app hints off.' : '💡 In-app hints on.');
  }

  // ── Auth helpers ───────────────────────────────
  function _showAuthError(msg) {
    // While the switch modal is open the auth screen is not on screen, so an
    // error written there is an error nobody ever sees — including the wrong-PIN
    // one, which is the whole reason the modal exists.
    if (_swOpen) { _swError(msg); return; }
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
    init, getActiveAccount, getParentProfile, getFamily, getPlanFeatures, isAccessExpired,
    getKnownStudents, forgetKnownStudents, useFullStudentSignIn,
    // Auth screen
    setRole, showSignIn, showSignUp, emailSignIn, emailSignUp,
    showForgotPassword, backToSignIn, forgotPassword, backToSignUp,
    resendVerification, sendRecoveryForPending, setNewPassword, togglePass,
    googleSignIn, magicLinkSignIn, openAdminPanel, openTeacherDashboard,
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
    openStudentSwitch, closeStudentSwitch, fullStudentSignInFromSwitch,
    _swKey, _swPickKid,
    // Parent mode
    enterParentMode, exitParentMode, resetProgress, confirmResetProgress,
    _pinKey, _pinSetupKey, _pinForgot, closeParentPin, closeParentPinSetup, pinSetupBack,
    openParentPinSetup, hasParentPin, clearParentPin,
    pdTab, pdSwitchStudent,
    getStudents: () => _familyStudents,
    // Being an admin is a property of the ACCOUNT, not of which screen they
    // happen to be on. A moderator browsing the forum in the ordinary parent
    // view is still a moderator, and is_admin() in the database agrees.
    isAdmin: () => _isAdminUser,
    isSuperAdmin: () => _isSuperAdmin,
    addAssignment, removeAssignment, pdUpdateAssignChapters,
    toggleChapterLock, setMaxDifficulty, toggleExamDisabled,
    toggleCrossGradeSearch, toggleCrossGradePractice, toggleHintsDisabled,
    toggleMinigamesDisabled,
    // Biometric lock
    attemptBiometricUnlock: _attemptBiometricUnlock, biometricUsePassword,
    enableBiometricLogin, disableBiometricLogin,
    enableStudentBiometricLogin, disableStudentBiometricLogin,
  };
})();

// Start app
Auth.init();
