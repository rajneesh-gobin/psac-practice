'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice Grade 5 - Application Logic
// ══════════════════════════════════════════════

// ── STATE ─────────────────────────────────────
const S = {
  exam: { qs: [], answers: {}, flagged: new Set(), idx: 0, timer: null, duration: 0, endTime: null },
  practice: { chapterId: null, difficulty: 1, qs: [], idx: 0, hintShown: false, session: { attempted: 0, correct: 0 } },
  currentScreen: 'dashboard',
};

// ── GAMIFICATION STATE ────────────────────────
let _soundEnabled = true;
let _comboStreak  = 0;
let _audioCtx     = null;

function _getAudioCtx() {
  if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return _audioCtx;
}

function _playTone(freq, dur, start, ctx, vol) {
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = freq;
  osc.type = 'sine';
  gain.gain.setValueAtTime(vol || 0.22, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

function _playSound(type) {
  if (!_soundEnabled) return;
  try {
    const ctx = _getAudioCtx();
    const t   = ctx.currentTime;
    if      (type === 'correct') { _playTone(523, 0.15, t,      ctx, 0.18); _playTone(659, 0.2,  t + 0.1,  ctx, 0.18); }
    else if (type === 'wrong')   { _playTone(300, 0.1,  t,      ctx, 0.18); _playTone(220, 0.28, t + 0.09, ctx, 0.13); }
    else if (type === 'combo')   { _playTone(523, 0.1,  t,      ctx, 0.18); _playTone(659, 0.1,  t + 0.08, ctx, 0.18); _playTone(784, 0.2, t + 0.16, ctx, 0.22); }
    else if (type === 'levelup') { [523,659,784,1047].forEach((f,i) => _playTone(f, 0.15, t + i*0.1, ctx, 0.2)); }
  } catch (_) {}
}

function toggleSound() {
  _soundEnabled = !_soundEnabled;
  const btn = document.getElementById('sound-toggle-btn');
  if (btn) {
    btn.textContent = _soundEnabled ? '🔔 Sound On' : '🔕 Sound Off';
    btn.classList.toggle('muted', !_soundEnabled);
  }
}

function _floatXP(amount) {
  const xpEl = document.getElementById('xp-display');
  if (!xpEl) return;
  const rect = xpEl.getBoundingClientRect();
  const el   = document.createElement('div');
  el.className = 'xp-float';
  el.textContent = `+${amount} XP ✨`;
  el.style.left = `${rect.left + rect.width / 2 - 30}px`;
  el.style.top  = `${rect.top + (window.pageYOffset || document.documentElement.scrollTop) - 10}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1400);
}

const _COMBO_MSGS = { 2:'🔥 2 in a row!', 3:'🔥🔥 3 in a row!', 4:'💪 4 in a row!', 5:'🔥🔥🔥 On fire!', 7:'⚡ 7 in a row!', 10:'🏆 10 in a row! LEGENDARY!' };

function _showCombo(n) {
  const msg = _COMBO_MSGS[n];
  if (!msg) return;
  const el = document.getElementById('practice-combo');
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden', 'combo-out');
  void el.offsetWidth;
  el.classList.add('combo-in');
  clearTimeout(el._comboTimer);
  el._comboTimer = setTimeout(() => {
    el.classList.remove('combo-in');
    el.classList.add('combo-out');
    setTimeout(() => el.classList.add('hidden'), 350);
  }, 1800);
}

// ── STORAGE ───────────────────────────────────
let ACTIVE_STUDENT_ID = null;
let DB = {};   // populated by Auth.init() after student is selected

// ── GRADE / SUBJECT SELECTION ─────────────────
let SELECTED_GRADE = null;
let ACTIVE_PACK    = null; // set when student selects a subject; defaults to first non-comingSoon pack

function _activePack() {
  if (ACTIVE_PACK) return ACTIVE_PACK;
  if (typeof SUBJECT_PACKS !== 'undefined')
    return SUBJECT_PACKS.find(p => !p.comingSoon) || SUBJECT_PACKS[0] || null;
  return null;
}

// ── SUBJECT PACK ACTIVATION ───────────────────
// Single source of truth for "switch the app to this subject". Sets ACTIVE_PACK
// and SELECTED_GRADE, and syncs the global CHAPTERS array IN PLACE (it must be
// mutated, never reassigned - every render function holds a reference to it).
//
// Call this instead of hand-rolling the three assignments. Previously the same
// block was duplicated in selectSubject(), startAssignmentDirect(),
// Calendar.startPractice() and Search.practiceChapter(), which meant a change
// to activation semantics had to be made in four places.
//
// Returns the pack, or null if the id is unknown / the pack is coming soon.
function activateSubjectPack(packId, { allowComingSoon = false } = {}) {
  const packs = (typeof SUBJECT_PACKS !== 'undefined') ? SUBJECT_PACKS : [];
  const pack  = packs.find(p => p.id === packId);
  if (!pack) return null;
  if (pack.comingSoon && !allowComingSoon) return null;

  ACTIVE_PACK    = pack;
  SELECTED_GRADE = pack.grade;

  const chs = pack._chapters || pack.chapters || [];
  CHAPTERS.length = 0;
  chs.forEach(ch => CHAPTERS.push(ch));

  return pack;
}
window.activateSubjectPack = activateSubjectPack;

function _activeSubjectLabel() {
  const pack  = _activePack();
  const acct  = (typeof Auth !== 'undefined') ? Auth.getActiveAccount() : null;
  const grade = acct?.grade || pack?.grade || 5;
  const name  = pack?.name  || 'Maths';
  return { grade, name };
}

// ── ASSIGNMENT MODE ───────────────────────────
let ASSIGNMENT_MODE         = false;
let ASSIGNMENT_CONFIG       = null;
let ASSIGNMENT_STUDENT_NAME = '';
let ASSIGNMENT_SCORE        = { attempted: 0, correct: 0 };
let ASSIGNMENT_IS_TEST      = false;   // test mode = no feedback until submission
let ASSIGNMENT_TEST_ANSWERS = [];      // [{question,userAnswer,correctAnswer,correct,explanation}]

function save(data, immediate = false) {
  if (ACTIVE_STUDENT_ID) Store.saveStudent(ACTIVE_STUDENT_ID, data, immediate);
}

// ── THEME ─────────────────────────────────────
// index.html ships <html class="dark">, so the page paints dark before any JS
// runs. DEFAULT_THEME must therefore be 'dark' as well - when it was 'light',
// the boot call below stripped that class and every first-time visitor got a
// light flash and then a light UI, whatever the markup said.
// One constant, used by all four fallbacks: they have to agree, and when they
// were four separate literals they were one edit away from not agreeing.
const DEFAULT_THEME = 'dark';

// Which theme should we show for a user we just signed in?
//   1. their own saved preference, if they have one
//   2. otherwise whatever is already on screen (last used on this device)
//   3. otherwise DEFAULT_THEME
//
// Step 2 matters: signing in used to slam a hard-coded default over the theme
// the user was already looking at ('dark' for parents, 'light' for students),
// so switching between a parent and a child flipped the whole UI. Worse,
// applyTheme() persists, so that hard-coded default got written into the
// student's saved profile on their first login.
function _preferredTheme(savedTheme) {
  if (savedTheme) return savedTheme;
  try { return localStorage.getItem('mm_global_theme') || DEFAULT_THEME; }
  catch (e) { return DEFAULT_THEME; }
}

function applyTheme(t) {
  t = t || DEFAULT_THEME;
  document.documentElement.classList.toggle('dark', t === 'dark');
  document.getElementById('theme-icon').textContent = t === 'dark' ? '☀️' : '🌙';
  try { localStorage.setItem('mm_global_theme', t); } catch(e) {}
  if (ACTIVE_STUDENT_ID) { DB.theme = t; save(DB); }
  ['scratchpad-exam', 'scratchpad-practice'].forEach(id => {
    const c = document.getElementById(id);
    if (c && c._ctx) c._ctx.strokeStyle = t === 'dark' ? '#fff' : '#1e293b';
  });
}
document.getElementById('theme-toggle').addEventListener('click', () => applyTheme((DB.theme || localStorage.getItem('mm_global_theme') || DEFAULT_THEME) === 'dark' ? 'light' : 'dark'));
// One-time migration. The old default wrote 'light' into mm_global_theme on
// every single boot, so every existing device now stores a "preference" nobody
// actually chose - and it would keep beating DEFAULT_THEME forever. Clear it
// once, behind a flag, so the new default applies. Any toggle after this point
// is a genuine choice and is never touched again.
try {
  if (!localStorage.getItem('mm_theme_default_migrated')) {
    localStorage.removeItem('mm_global_theme');
    localStorage.setItem('mm_theme_default_migrated', '1');
  }
} catch(e) {}

// Restore last-used theme immediately (before auth resolves)
applyTheme(localStorage.getItem('mm_global_theme') || DEFAULT_THEME);

// ── TOAST ─────────────────────────────────────
// ── Image Lightbox ─────────────────────────────
function openLightbox(src) {
  const lb = document.getElementById('img-lightbox');
  const img = document.getElementById('img-lightbox-src');
  if (!lb || !img) return;
  img.src = src;
  lb.classList.remove('hidden');
  lb.classList.add('flex');
  document.addEventListener('keydown', _lbKeyClose);
}
function closeLightbox() {
  const lb = document.getElementById('img-lightbox');
  if (!lb) return;
  lb.classList.add('hidden');
  lb.classList.remove('flex');
  document.removeEventListener('keydown', _lbKeyClose);
}
function _lbKeyClose(e) { if (e.key === 'Escape') closeLightbox(); }

// Make all <img> and inline <svg> tags inside a container zoomable
function _makeImgsZoomable(container) {
  if (!container) return;
  container.querySelectorAll('img').forEach(img => {
    if (img.dataset.zoomWired) return;
    img.dataset.zoomWired = '1';
    img.style.cursor = 'zoom-in';
    img.title = 'Click to zoom';
    img.classList.add('rounded-lg', 'shadow', 'hover:opacity-90', 'transition-opacity');
    img.addEventListener('click', () => openLightbox(img.src));
  });
  container.querySelectorAll('svg').forEach(svg => {
    if (svg.dataset.zoomWired) return;
    svg.dataset.zoomWired = '1';
    svg.style.cursor = 'zoom-in';
    svg.title = 'Click to zoom';
    svg.style.transition = 'opacity 0.2s';
    svg.addEventListener('mouseenter', () => { svg.style.opacity = '0.85'; });
    svg.addEventListener('mouseleave', () => { svg.style.opacity = '1'; });
    svg.addEventListener('click', () => {
      const s = new XMLSerializer().serializeToString(svg);
      openLightbox('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s));
    });
  });
}

// ── SESSION RESUME ─────────────────────────────────────────────────────────
const _RESUME_TTL = 24 * 60 * 60 * 1000;
let _pendingResume = null;

function _saveResume() {
  if (!ACTIVE_STUDENT_ID) return;
  try {
    const key = 'mm_resume_' + ACTIVE_STUDENT_ID;
    if (S.exam && S.exam.qs && S.exam.qs.length) {
      localStorage.setItem(key, JSON.stringify({
        type: 'exam', subjectId: ACTIVE_PACK?.id, examType: S.exam.type,
        qIds: S.exam.qs.map(q => q.id), idx: S.exam.idx,
        answers: S.exam.answers, flagged: [...(S.exam.flagged || [])],
        endTime: S.exam.endTime, ts: Date.now()
      }));
    } else if (S.practice && S.practice.chapterId) {
      localStorage.setItem(key, JSON.stringify({
        type: 'practice', subjectId: ACTIVE_PACK?.id,
        chapterId: S.practice.chapterId, ts: Date.now()
      }));
    }
  } catch(e) {}
}

function _clearResume() {
  if (!ACTIVE_STUDENT_ID) return;
  try { localStorage.removeItem('mm_resume_' + ACTIVE_STUDENT_ID); } catch(e) {}
  _pendingResume = null;
  const slot = document.getElementById('resume-banner-slot');
  if (slot) slot.innerHTML = '';
}

function _getResume() {
  if (!ACTIVE_STUDENT_ID) return null;
  try {
    const raw = localStorage.getItem('mm_resume_' + ACTIVE_STUDENT_ID);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    if (Date.now() - saved.ts > _RESUME_TTL) { _clearResume(); return null; }
    _pendingResume = saved;
    return saved;
  } catch(e) { return null; }
}

async function _doResume() {
  const saved = _pendingResume;
  _clearResume();
  if (!saved) return;
  // Loading the questions is not enough: CHAPTERS/ACTIVE_PACK must point at the
  // saved subject too, or resuming a session started in another subject renders
  // the chapter name, badges and help from whichever subject is open now.
  // startAssignment() already does this; resume was the one entry point missing it.
  if (saved.subjectId && typeof activateSubjectPack === 'function') {
    activateSubjectPack(saved.subjectId);
  }
  if (saved.subjectId && typeof QuestionLoader !== 'undefined') {
    await QuestionLoader.loadSubject(saved.subjectId);
  }
  if (saved.type === 'practice') {
    startChapterDirect(saved.chapterId);
  } else if (saved.type === 'exam') {
    const qMap = {};
    STATIC_QUESTIONS.forEach(q => { if (q) qMap[q.id] = q; });
    const qs = (saved.qIds || []).map(id => qMap[id]).filter(Boolean);
    if (!qs.length) { toast('Could not restore exam — please start a new one.', 3000); return; }
    S.exam.qs      = qs;
    S.exam.answers = saved.answers || {};
    S.exam.flagged = new Set(saved.flagged || []);
    S.exam.idx     = Math.min(saved.idx || 0, qs.length - 1);
    S.exam.type    = saved.examType;
    const remaining = Math.max(60, Math.round((saved.endTime - Date.now()) / 1000));
    S.exam.duration = remaining;
    S.exam.endTime  = Date.now() + remaining * 1000;
    showScreen('exam');
    renderExamQuestion();
    startExamTimer();
    document.getElementById('exam-q-total').textContent = qs.length;
  }
}

function _renderResumeBanner() {
  const slot = document.getElementById('resume-banner-slot');
  if (!slot) return;
  const saved = _getResume();

  if (saved) {
    const chName = saved.type === 'exam'
      ? (saved.examType === 'quick' ? 'Quick Exam' : 'Full Exam')
      : (CHAPTERS.find(c => c.id === saved.chapterId)?.name || 'Practice');
    const detail = saved.type === 'exam'
      ? `Question ${(saved.idx || 0) + 1} of ${(saved.qIds || []).length}`
      : 'Practice session';
    slot.innerHTML = `
      <div class="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-5 mb-5 text-white shadow-xl">
        <div class="flex items-center gap-4">
          <div class="text-4xl select-none shrink-0">▶️</div>
          <div class="flex-1 min-w-0">
            <div class="font-bold text-base mb-0.5">Continue where you left off</div>
            <div class="text-sm opacity-90 truncate">${chName} · ${detail}</div>
          </div>
        </div>
        <div class="flex gap-2 mt-4">
          <button onclick="_doResume()" class="flex-1 bg-white text-green-700 font-bold py-3 rounded-xl hover:bg-green-50 transition-colors shadow text-sm">
            Continue →
          </button>
          <button onclick="_clearResume()" class="px-4 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors">
            Dismiss
          </button>
        </div>
      </div>`;
    return;
  }

  if (typeof DB === 'undefined' || !DB.stats || DB.stats.totalAttempted < 1) {
    slot.innerHTML = '';
    return;
  }
  const pack = (typeof ACTIVE_PACK !== 'undefined' && ACTIVE_PACK)
    || (typeof SUBJECT_PACKS !== 'undefined' && SUBJECT_PACKS.find(p => !p.comingSoon))
    || null;
  const subjectLabel = pack ? `Grade ${pack.grade} ${pack.name}` : 'your subject';
  slot.innerHTML = `
    <div class="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-5 mb-5 text-white shadow-xl">
      <div class="flex items-center gap-4">
        <div class="text-4xl select-none shrink-0">📚</div>
        <div class="flex-1">
          <div class="font-bold text-base mb-0.5">Ready to practise?</div>
          <div class="text-sm opacity-90">${subjectLabel}</div>
        </div>
      </div>
      <button onclick="showScreen('chapter-select')" class="w-full mt-4 bg-white text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors shadow text-sm">
        Start Practice →
      </button>
    </div>`;
}

// ── Onboarding hint callout ─────────────────────────────────────────────────
const _HINTS_KEY = 'psac_hints_v1';

function _getHints() {
  try { return JSON.parse(localStorage.getItem(_HINTS_KEY) || '{}'); } catch { return {}; }
}

function _hintDone(key) {
  return !!_getHints()[key];
}

function _markHintDone(key) {
  const h = _getHints();
  h[key] = true;
  try { localStorage.setItem(_HINTS_KEY, JSON.stringify(h)); } catch {}
}

let _currentHintTarget = null;

function _showHint(targetId, text, key) {
  if (_hintDone(key)) return;
  const target = document.getElementById(targetId);
  if (!target) return;
  const callout = document.getElementById('hint-callout');
  const textEl  = document.getElementById('hint-callout-text');
  if (!callout || !textEl) return;

  _currentHintTarget = { key, targetId };
  textEl.textContent = text;

  // Add pulse ring to target
  target.classList.add('hint-pulse');

  // Position callout below or above the target
  const rect = target.getBoundingClientRect();
  const gap  = 12;
  callout.className = 'arrow-top';
  callout.style.left = Math.max(8, Math.min(rect.left, window.innerWidth - 260)) + 'px';

  const spaceBelow = window.innerHeight - rect.bottom;
  if (spaceBelow >= 120) {
    callout.style.top       = (rect.bottom + gap + (window.pageYOffset || document.documentElement.scrollTop)) + 'px';
    callout.style.transform = '';
    callout.classList.add('arrow-top');
    callout.classList.remove('arrow-bottom');
  } else {
    callout.style.top       = (rect.top - 10 + (window.pageYOffset || document.documentElement.scrollTop)) + 'px';
    callout.style.transform = 'translateY(-100%)';
    callout.classList.add('arrow-bottom');
    callout.classList.remove('arrow-top');
  }

  callout.classList.remove('hint-hidden');
}

function _dismissHint() {
  const callout = document.getElementById('hint-callout');
  if (callout) callout.classList.add('hint-hidden');
  if (_currentHintTarget) {
    _markHintDone(_currentHintTarget.key);
    const t = document.getElementById(_currentHintTarget.targetId);
    if (t) t.classList.remove('hint-pulse');
    _currentHintTarget = null;
  }
}

function _checkKidHints() {
  if (DB.restrictions?.hintsDisabled) return;
  if ((DB.stats?.totalAttempted || 0) > 0) return;
  const key = 'kid_start_' + (ACTIVE_STUDENT_ID || 'x');
  setTimeout(() => _showHint('btn-chapter-mode', 'Tap here to start practising! Pick a chapter and get going. 🚀', key), 600);
}

function _checkParentHints() {
  const students = (typeof Auth !== 'undefined' && Auth.getStudents) ? Auth.getStudents() : [];
  if (students.length === 0) {
    setTimeout(() => _showHint('pd-no-children-add-btn',
      'Start by adding your child here! Each child gets their own progress tracker. 👶', 'parent_add_child'), 700);
  }
}

function _checkAssignHint() {
  const students = (typeof Auth !== 'undefined' && Auth.getStudents) ? Auth.getStudents() : [];
  if (students.length === 0) return;
  const firstId = students[0].id;
  const key = 'parent_first_assign_' + firstId;
  setTimeout(() => _showHint('pd-assign-btn',
    'Set a chapter for your child to practice — they\'ll see it when they log in! 📋', key), 400);
}

// ── Push notifications ──────────────────────────────────────────────────────
const VAPID_PUBLIC_KEY = 'BExWCMEBx-MGkPCv6tm0nC-DebalPys64ivbkWnWN7pxZuHQqUNtuZ85HehLssxBddlvjGB1d99IgtALRFZo8kc';

function _urlB64ToUint8Array(b64) {
  const pad  = '='.repeat((4 - b64.length % 4) % 4);
  const raw  = atob(b64.replace(/-/g, '+').replace(/_/g, '/') + pad);
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
}

// push-subscribe holds the service-role key, so it verifies that the caller
// actually owns the studentId in the payload before touching the row. Send
// whichever credentials this device has: a student proves ownership with the
// session token, a parent with their Supabase JWT. Both are sent when both
// exist — the function accepts either, and which one is valid depends on who
// is driving the UI.
async function _pushAuthHeaders() {
  const h = { 'Content-Type': 'application/json' };
  try {
    const token = (typeof getStudentToken === 'function') ? getStudentToken() : null;
    if (token) h['x-student-token'] = token;
  } catch(_) {}
  try {
    const sess = await _sb?.auth.getSession();
    const jwt  = sess?.data?.session?.access_token;
    if (jwt) h['Authorization'] = `Bearer ${jwt}`;
  } catch(_) {}
  return h;
}

// `prompt` defaults to FALSE: called on login this only refreshes a
// subscription the child already granted, and never asks.
//
// Asking on login could not work on iOS anyway - Safari rejects
// Notification.requestPermission() unless it comes from a user gesture - and on
// Android it fired an unexplained system prompt the instant a child logged in,
// which is the surest way to get "Block" tapped. The dashboard opt-in card
// calls this with { prompt: true } from an actual tap.
//
// Note iOS delivers web push ONLY to a home-screen-installed app (16.4+); in a
// Safari tab PushManager does not exist and we return on the first line.
async function setupPushNotifications(studentId, { prompt = false } = {}) {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return false;
  if (typeof Notification === 'undefined') return false;
  try {
    const reg = await navigator.serviceWorker.ready;
    // Check if already subscribed
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      if (!prompt) return false;                          // no gesture - stay silent
      if (Notification.permission === 'denied') return false;
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return false;
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: _urlB64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }
    // Save subscription to backend
    await fetch('/.netlify/functions/push-subscribe', {
      method: 'POST',
      headers: await _pushAuthHeaders(),
      body: JSON.stringify({ studentId, subscription: sub.toJSON() }),
    });
    return true;
  } catch(e) {
    console.warn('[push] Setup failed:', e.message);
    return false;
  }
}

// ── Notification opt-in card (student dashboard) ────────────────────────────
// Only offered when there is something to offer: push must be supported and the
// permission still un-asked. Once granted or denied, the card never returns -
// a denied permission can only be undone in browser settings, so nagging is
// pointless. "Not now" is remembered per device.
function _renderNotifyOptIn() {
  const card = document.getElementById('dash-notify-optin');
  if (!card) return;
  let dismissed = false;
  try { dismissed = !!localStorage.getItem('mm_notify_optin_dismissed'); } catch(e) {}
  const supported = ('serviceWorker' in navigator) && ('PushManager' in window)
    && typeof Notification !== 'undefined';
  const askable = supported && Notification.permission === 'default';
  card.classList.toggle('hidden', !askable || dismissed || !ACTIVE_STUDENT_ID);
}

function dismissNotifyOptIn() {
  try { localStorage.setItem('mm_notify_optin_dismissed', '1'); } catch(e) {}
  document.getElementById('dash-notify-optin')?.classList.add('hidden');
}

async function enableNotifications() {
  if (typeof Notification === 'undefined') { toast('This device cannot show notifications.', 3500); return; }

  // requestPermission() has to be the FIRST thing the tap does. Calling
  // setupPushNotifications() straight away would await navigator.serviceWorker
  // .ready first, and on iOS that intervening await can drop the user
  // activation, after which Safari refuses to show the prompt at all.
  let permission = Notification.permission;
  if (permission === 'default') {
    try { permission = await Notification.requestPermission(); }
    catch (_) { permission = 'denied'; }
  }

  document.getElementById('dash-notify-optin')?.classList.add('hidden');
  if (permission !== 'granted') {
    toast('Notifications stay off. You can turn them on in your browser settings.', 4000);
    return;
  }

  const ok = await setupPushNotifications(ACTIVE_STUDENT_ID, { prompt: true });
  if (ok) {
    toast('🔔 Notifications on. You\'ll hear about new homework.', 3000);
  } else if (typeof Notification !== 'undefined' && Notification.permission === 'denied') {
    toast('Notifications are blocked for this site. Turn them back on in your browser settings.', 4500);
  } else {
    toast('Could not turn on notifications on this device.', 3500);
  }
}

// ── Mobile: Haptic feedback ─────────────────────────────────────────────────
function _haptic(type) {
  if (!navigator.vibrate) return;
  if (type === 'correct')  navigator.vibrate(50);
  else if (type === 'wrong')    navigator.vibrate([80, 40, 80]);
  else if (type === 'levelup')  navigator.vibrate([50, 30, 50, 30, 150]);
}

// ── Mobile: Screen wake lock (prevent screen sleep during exam) ─────────────
let _wakeLock = null;
async function _requestWakeLock() {
  if (!('wakeLock' in navigator)) return;
  try {
    _wakeLock = await navigator.wakeLock.request('screen');
    _wakeLock.addEventListener('release', () => { _wakeLock = null; });
  } catch(_) {}
}
function _releaseWakeLock() {
  if (_wakeLock) { _wakeLock.release(); _wakeLock = null; }
}
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && S.exam?.qs?.length) _requestWakeLock();
});

// ── Mobile: Portrait orientation lock during exam ───────────────────────────
async function _lockPortrait() {
  try { await screen.orientation.lock('portrait'); } catch(_) {}
}
function _unlockOrientation() {
  try { screen.orientation.unlock(); } catch(_) {}
}

// ── Mobile: Text-to-speech ──────────────────────────────────────────────────
let _ttsSpeaking = false;
// A French passage read out by an English voice is worse than no audio at all,
// so the utterance language follows the active pack rather than being fixed.
function _ttsLang() {
  const p = (typeof _activePack === 'function') ? _activePack() : null;
  return (p && p.subject === 'French') ? 'fr-FR' : 'en-GB';
}

function speakQuestion(mode) {
  if (!window.speechSynthesis) { toast('Text-to-speech not supported on this browser.', 2500); return; }
  const elId = mode === 'exam' ? 'exam-q-text' : 'practice-q-text';
  const el   = document.getElementById(elId);
  if (!el) return;
  const text = (el.innerText || el.textContent || '').trim();
  if (!text) return;
  if (_ttsSpeaking) { speechSynthesis.cancel(); _ttsSpeaking = false; return; }
  const lang  = _ttsLang();
  const utt   = new SpeechSynthesisUtterance(text);
  utt.rate    = 0.88;
  utt.lang    = lang;
  // Setting .lang alone is not always enough - some engines keep the default
  // voice unless one is named. getVoices() can be empty on first call, in which
  // case .lang is the only hint available.
  try {
    const want  = lang.slice(0, 2).toLowerCase();
    const voice = speechSynthesis.getVoices()
      .find(v => (v.lang || '').replace('_', '-').toLowerCase().startsWith(want));
    if (voice) utt.voice = voice;
  } catch(e) {}
  utt.onstart = () => { _ttsSpeaking = true; };
  utt.onend   = () => { _ttsSpeaking = false; };
  utt.onerror = () => { _ttsSpeaking = false; };
  speechSynthesis.cancel();
  speechSynthesis.speak(utt);
}

// ── Mobile: Share exam result ───────────────────────────────────────────────
async function shareResult() {
  const score   = document.getElementById('result-score')?.textContent  || '';
  const grade   = document.getElementById('result-grade')?.textContent  || '';
  const details = document.getElementById('result-details')?.textContent || '';
  const text    = `I scored ${score} (${grade}) on my PSAC Practice exam! ${details} 🇲🇺📚`;
  try {
    await navigator.share({ title: 'My PSAC Exam Result', text, url: location.origin });
  } catch(e) {
    if (e.name !== 'AbortError') {
      try { await navigator.clipboard.writeText(text); toast('Result copied to clipboard! 📋', 2500); }
      catch(_) {}
    }
  }
}
document.getElementById('share-result-btn')?.addEventListener('click', shareResult);

// ── PWA Install prompt ──────────────────────────────────────────────────────
// Capture the browser's install prompt and surface it via the header button.
// The button stays hidden on desktop and iOS (event never fires there).
let _pwaInstallPrompt = null;

// Show a one-time iOS tip banner (Safari doesn't support beforeinstallprompt)
(function _maybeShowIOSTip() {
  const isIOS        = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone = window.navigator.standalone === true; // already installed
  const dismissed    = localStorage.getItem('mm_ios_tip_dismissed');
  if (!isIOS || isStandalone || dismissed) return;

  // Wait until page is interactive before injecting
  window.addEventListener('load', () => {
    const tip = document.createElement('div');
    tip.id = 'ios-install-tip';
    tip.innerHTML = `
      <div style="position:fixed;bottom:0;left:0;right:0;z-index:9998;
                  background:linear-gradient(135deg,#1e3a5f,#2d1b69);
                  color:white;padding:14px 16px 20px;
                  box-shadow:0 -4px 24px rgba(0,0,0,0.4);
                  font-family:system-ui,sans-serif;">
        <button onclick="document.getElementById('ios-install-tip').remove();localStorage.setItem('mm_ios_tip_dismissed','1')"
                style="float:right;background:none;border:none;color:rgba(255,255,255,0.6);font-size:20px;cursor:pointer;line-height:1;padding:0 0 0 12px">✕</button>
        <div style="font-weight:700;font-size:15px;margin-bottom:6px">📲 Install on your iPhone</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.85);display:flex;align-items:center;gap:6px;flex-wrap:wrap">
          Tap
          <span style="background:rgba(255,255,255,0.15);border-radius:6px;padding:2px 8px;display:inline-flex;align-items:center;gap:4px">
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1v11M3.5 4L7 1l3.5 3M1 8v8a1 1 0 001 1h10a1 1 0 001-1V8" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Share
          </span>
          then
          <span style="background:rgba(255,255,255,0.15);border-radius:6px;padding:2px 8px;font-weight:600">
            Add to Home Screen
          </span>
          to install the app
        </div>
      </div>`;
    document.body.appendChild(tip);
  });
})();

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault(); // stop the automatic mini-bar
  _pwaInstallPrompt = e;
  const btn = document.getElementById('pwa-install-btn');
  if (btn) { btn.classList.remove('hidden'); btn.classList.add('flex'); }
});

window.addEventListener('appinstalled', () => {
  _pwaInstallPrompt = null;
  const btn = document.getElementById('pwa-install-btn');
  if (btn) { btn.classList.add('hidden'); btn.classList.remove('flex'); }
  toast('App installed! Find it on your home screen. 🎉', 4000);
});

document.getElementById('pwa-install-btn')?.addEventListener('click', async () => {
  if (!_pwaInstallPrompt) return;
  _pwaInstallPrompt.prompt();
  const { outcome } = await _pwaInstallPrompt.userChoice;
  if (outcome === 'accepted') _pwaInstallPrompt = null;
});

let toastTimer;
function toast(msg, dur = 2500) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), dur);
}

// ── CONFIRM MODAL (replaces browser confirm() dialogs) ───────────
let _confirmCallback = null;
function _confirmModal(msg, onConfirm, { icon = '⚠️', okLabel = 'Confirm', danger = true } = {}) {
  const m = document.getElementById('modal-confirm');
  if (!m) { if (onConfirm && confirm(msg)) onConfirm(); return; } // fallback
  document.getElementById('modal-confirm-msg').textContent  = msg;
  document.getElementById('modal-confirm-icon').textContent = icon;
  const okBtn = document.getElementById('modal-confirm-ok');
  if (okBtn) { okBtn.textContent = okLabel; okBtn.className = danger ? 'btn-danger flex-1 text-sm' : 'btn-primary flex-1 text-sm'; }
  _confirmCallback = onConfirm;
  m.classList.remove('hidden');
}
function _closeConfirmModal(confirmed) {
  document.getElementById('modal-confirm')?.classList.add('hidden');
  if (confirmed && typeof _confirmCallback === 'function') _confirmCallback();
  _confirmCallback = null;
}

// ── SCREEN NAVIGATION ─────────────────────────
const _SCREEN_ORDER = ['dashboard','subject-select','chapter-select','practice','exam'];
let _prevScreen = null;

const _BOTTOM_NAV_SCREENS = new Set(['dashboard','subject-select','chapter-select','practice','exam','exam-config','analytics','results']);
const _NAV_MAP = {
  'dashboard':'home','subject-select':'practice','chapter-select':'practice',
  'practice':'practice','exam-config':'exam','exam':'exam','results':'exam','analytics':'progress',
};

function _updateBottomNav(screenId) {
  const nav = document.getElementById('student-bottom-nav');
  if (!nav) return;
  const show = _BOTTOM_NAV_SCREENS.has(screenId) && (typeof ACTIVE_STUDENT_ID !== 'undefined') && !!ACTIVE_STUDENT_ID;
  nav.classList.toggle('hidden', !show);
  document.body.classList.toggle('has-bottom-nav', show);
  const active = _NAV_MAP[screenId];
  nav.querySelectorAll('.nav-btn').forEach(btn => btn.classList.toggle('nav-active', btn.dataset.nav === active));
}

function _launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;pointer-events:none';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const COLORS = ['#6366f1','#ec4899','#f59e0b','#10b981','#3b82f6','#ef4444','#a855f7'];
  const pieces = Array.from({length: 120}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height * 0.5,
    w: 8 + Math.random() * 8, h: 5 + Math.random() * 5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rot: Math.random() * Math.PI * 2,
    vx: (Math.random() - 0.5) * 3, vy: 2 + Math.random() * 3,
    vrot: (Math.random() - 0.5) * 0.2, opacity: 1,
  }));
  let frame = 0;
  (function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.rot += p.vrot; p.vy += 0.08;
      if (frame > 90) p.opacity = Math.max(0, p.opacity - 0.015);
      ctx.save(); ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (frame < 180) requestAnimationFrame(tick); else canvas.remove();
  })();
}

function showScreen(id) {
  // Dismiss any floating hint callout on navigation
  const _hc = document.getElementById('hint-callout');
  if (_hc && !_hc.classList.contains('hint-hidden')) _dismissHint();

  const prevIdx = _SCREEN_ORDER.indexOf(_prevScreen);
  const nextIdx = _SCREEN_ORDER.indexOf(id);
  const isForward = nextIdx > prevIdx;
  const isBack    = prevIdx !== -1 && nextIdx !== -1 && nextIdx < prevIdx;

  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('screen-enter-right','screen-enter-left');
    s.classList.add('hidden');
  });
  const sc = document.getElementById('screen-' + id);
  if (sc) {
    sc.classList.remove('hidden');
    if (isForward)      sc.classList.add('screen-enter-right');
    else if (isBack)    sc.classList.add('screen-enter-left');
    S.currentScreen = id;
  }
  _prevScreen = id;
  _updateBottomNav(id);

  // Hide header on full-page assignment screens
  const hideHeader = sc?.dataset?.hideHeader === 'true';
  const hdr = document.querySelector('header');
  if (hdr) hdr.classList.toggle('hidden', hideHeader);

  // Show logout button in header on all screens except auth/landing
  const logoutBtn = document.getElementById('header-logout-btn');
  if (logoutBtn) {
    const isAuthScreen = ['landing','auth','verify-email','reset-password','family-setup'].includes(id);
    logoutBtn.classList.toggle('hidden', isAuthScreen);
    logoutBtn.classList.toggle('flex',  !isAuthScreen);
  }

  _updateBreadcrumb(id);

  if (id === 'dashboard')       renderDashboard();
  if (id === 'analytics')       renderAnalytics();
  if (id === 'chapter-select')  renderChapterSelect();
  if (id === 'syllabus')        renderSyllabus();
  if (id === 'parent')          renderParentDashboard();
  if (id === 'subject-select')  renderSubjectSelect();
  if (id === 'student-select')  renderStudentSelect();
  if (id === 'grade-select')    renderGradeSelect();
  if (id === 'teacher' && typeof TeacherMode !== 'undefined') TeacherMode.render();
  if (id === 'forum'     && typeof Forum     !== 'undefined') Forum.render();
  if (id === 'calendar'  && typeof Calendar  !== 'undefined') Calendar.render();
  // Search button in header: visible only when a student grade is active
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    const isAuth = ['landing','auth','verify-email','reset-password','family-setup'].includes(id);
    const hasStudent = typeof SELECTED_GRADE !== 'undefined' && !!SELECTED_GRADE;
    searchBtn.classList.toggle('hidden', isAuth || !hasStudent);
  }
}

function _updateBreadcrumb(screenId) {
  const bar   = document.getElementById('breadcrumb-bar');
  const inner = document.getElementById('breadcrumb-inner');
  if (!bar || !inner) return;

  const studentScreens = ['dashboard','chapter-select','syllabus','analytics','practice','exam-config','exam'];
  if (!studentScreens.includes(screenId)) { bar.classList.add('hidden'); return; }

  const grade    = (typeof SELECTED_GRADE !== 'undefined' ? SELECTED_GRADE : null) || 5;
  const pack     = (typeof ACTIVE_PACK !== 'undefined' && ACTIVE_PACK) || null;
  const packIcon = pack ? (pack.icon || '') : '';
  const packName = pack ? (pack.subject || pack.name || '') : '';
  const packLabel = (packIcon + ' ' + packName).trim() || 'Subject';

  const chId  = S.practice?.chapterId;
  const ch    = chId && pack ? ((pack._chapters || pack.chapters || []).find(c => c.id === chId)) : null;
  const chLabel = ch ? ((ch.icon ? ch.icon + ' ' : '') + ch.name) : 'Practice';

  const link = (label, fn) =>
    `<button class="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-200 hover:underline font-medium whitespace-nowrap transition-colors" onclick="${fn}">${label}</button>` +
    `<span class="text-gray-300 dark:text-gray-600 mx-1.5 select-none">›</span>`;
  const curr = label =>
    `<span class="text-gray-700 dark:text-gray-300 font-semibold whitespace-nowrap">${label}</span>`;

  let parts = link(`Grade ${grade}`, `showScreen('subject-select')`);

  if (screenId === 'dashboard') {
    parts += curr(packLabel);
  } else if (['chapter-select','syllabus','analytics','exam-config'].includes(screenId)) {
    const label = screenId === 'syllabus' ? 'Syllabus' : screenId === 'analytics' ? 'Analytics' : screenId === 'exam-config' ? 'Exam' : 'Chapters';
    parts += link(packLabel, `showScreen('dashboard')`) + curr(label);
  } else if (screenId === 'practice') {
    parts += link(packLabel, `showScreen('dashboard')`) + link('Chapters', `showScreen('chapter-select')`) + curr(chLabel);
  } else if (screenId === 'exam') {
    parts += link(packLabel, `showScreen('dashboard')`) + curr('Exam in progress');
  } else {
    bar.classList.add('hidden'); return;
  }

  inner.innerHTML = parts;
  bar.classList.remove('hidden');
}

// back buttons
document.querySelectorAll('.back-btn[data-target]').forEach(btn => {
  btn.addEventListener('click', () => showScreen(btn.dataset.target));
});

// ── STREAK ────────────────────────────────────
function updateStreak() {
  const today = new Date().toDateString();
  if (DB.stats.lastDate === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  DB.stats.streak = DB.stats.lastDate === yesterday ? DB.stats.streak + 1 : 1;
  DB.stats.lastDate = today;
  if (DB.stats.streak > DB.stats.maxStreak) DB.stats.maxStreak = DB.stats.streak;
  save(DB);
  document.getElementById('streak-count').textContent = DB.stats.streak;
}

// ── CHAPTER PROGRESS ──────────────────────────
function getChapterPct(id) {
  if (!DB.chapters) return 0;
  const c = DB.chapters[id];
  if (!c || !c.attempted) return 0;
  return Math.round(c.correct / c.attempted * 100);
}
function recordAnswer(chapterId, correct) {
  if (ASSIGNMENT_MODE) {
    ASSIGNMENT_SCORE.attempted++;
    if (correct) ASSIGNMENT_SCORE.correct++;
    return;
  }
  if (!DB.chapters[chapterId]) DB.chapters[chapterId] = { attempted: 0, correct: 0 };
  DB.chapters[chapterId].attempted++;
  if (correct) DB.chapters[chapterId].correct++;
  DB.stats.totalAttempted++;
  if (correct) DB.stats.totalCorrect++;
  updateStreak();
  checkBadges();
  if (correct) gainXP();
  save(DB);
  Events.emit('answer', { chapterId, correct });
}

// ── ANSWER CHECKING ───────────────────────────
function normalise(v) {
  return String(v).toLowerCase().replace(/\s+/g, '').replace(/,/g, '')
    .replace(/rs\.?/g,'').replace(/cm2/g,'cm²').replace(/m2/g,'m²')
    .replace(/kg/g,'kg').replace(/min/g,'min').replace(/\bpm\b/g,'pm');
}
function checkAnswer(q, userAnswer) {
  if (q.type === 'symmetry') {
    try {
      const selected = JSON.parse(userAnswer || '[]');
      const ans = q.answer;
      if (selected.length !== ans.length) return false;
      const selSet = new Set(selected.map(([r,c]) => `${r},${c}`));
      return ans.every(([r,c]) => selSet.has(`${r},${c}`));
    } catch { return false; }
  }
  const ua = normalise(userAnswer);
  const correct = [q.answer, ...(q.acceptableAnswers || [])].some(a => normalise(a) === ua);
  return correct;
}

// ── SYMMETRY GRID ─────────────────────────────
window.toggleSymCell = function(el, containerId) {
  el.classList.toggle('sym-selected');
};

function renderSymmetryGrid(q, cont, selectedAnswer, disabled) {
  const { rows, cols, axis, axisPos, given, answer } = q;
  const givenSet  = new Set(given.map(([r,c])  => `${r},${c}`));
  const answerSet = new Set(answer.map(([r,c]) => `${r},${c}`));
  const isVertical = axis === 'vertical';

  // Parse previously-selected cells when disabled (post-submit)
  let selSet = new Set();
  if (disabled && selectedAnswer) {
    try { JSON.parse(selectedAnswer).forEach(([r,c]) => selSet.add(`${r},${c}`)); } catch {}
  }

  let cells = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = `${r},${c}`;
      const isAxisCell = (isVertical && c === axisPos) || (!isVertical && r === axisPos);
      const isAnswerSide = isVertical ? (c > axisPos) : (r > axisPos);

      if (isAxisCell) {
        cells += `<div class="sym-cell ${isVertical?'sym-axis-v':'sym-axis-h'}"></div>`;
      } else if (givenSet.has(key)) {
        cells += `<div class="sym-cell sym-given"></div>`;
      } else if (isAnswerSide) {
        const isAns = answerSet.has(key);
        const wasSel = selSet.has(key);
        if (disabled) {
          let cls = 'sym-cell';
          if (isAns && wasSel)  cls += ' sym-correct';
          else if (isAns)       cls += ' sym-missed';
          else if (wasSel)      cls += ' sym-wrong';
          else                  cls += ' sym-clickable';
          cells += `<div class="${cls}" data-r="${r}" data-c="${c}"></div>`;
        } else {
          cells += `<div class="sym-cell sym-clickable" data-r="${r}" data-c="${c}" onclick="toggleSymCell(this)"></div>`;
        }
      } else {
        cells += `<div class="sym-cell sym-empty"></div>`;
      }
    }
  }

  const colsStyle = `grid-template-columns:repeat(${cols},1fr)`;
  const legend = disabled ? `
    <div class="sym-legend">
      <span class="sym-legend-item"><span class="sym-legend-dot" style="background:#22c55e"></span>Correct</span>
      <span class="sym-legend-item"><span class="sym-legend-dot" style="background:#f97316"></span>Missed</span>
      <span class="sym-legend-item"><span class="sym-legend-dot" style="background:#ef4444"></span>Wrong</span>
    </div>` : `<p style="font-size:0.72rem;color:#64748b;text-align:center;margin-top:4px;">Click cells on the <b>${isVertical?'right':'bottom'}</b> to complete the mirror pattern</p>`;

  cont.innerHTML = `
    <div class="sym-wrap">
      <span class="sym-label">🪞 Symmetry - ${isVertical ? 'Vertical' : 'Horizontal'} axis</span>
      <div class="sym-grid" style="${colsStyle}">${cells}</div>
      ${legend}
    </div>`;
}

// ── SYMBOL KEYBOARD ───────────────────────────
// Extra symbol rows appended to the number pad, keyed by chapterId.
// Each entry is an array of { d: display label, v: value to insert }.
// For powers the symbols go in a 4th column alongside the digit rows.
const SYMBOL_KEYS = {
  powers:   [{ d:'^',   v:'^'  }, { d:'²', v:'²' }, { d:'³', v:'³' }],
  fractions:[{ d:'/',   v:'/'  }, { d:'and', v:'and' }],
  time:     [{ d:'h',   v:'h'  }, { d:'min', v:'min' }, { d:'s', v:'s' }],
  mass:     [{ d:'kg',  v:'kg' }, { d:'g',  v:'g'  }],
  capacity: [{ d:'L',   v:'L'  }, { d:'mL', v:'mL' }],
  length:   [{ d:'km',  v:'km' }, { d:'m',  v:'m'  }, { d:'cm', v:'cm' }, { d:'mm', v:'mm' }],
  area:     [{ d:'m²',  v:'m²' }, { d:'cm²',v:'cm²'}],
  geometry: [{ d:'°',   v:'°'  }],
};

window.insertSymbol = (containerId, sym) => {
  const inp = document.getElementById('num-ans-' + containerId);
  if (!inp) return;
  const s = inp.selectionStart ?? inp.value.length;
  const e = inp.selectionEnd   ?? inp.value.length;
  inp.value = inp.value.slice(0, s) + sym + inp.value.slice(e);
  inp.selectionStart = inp.selectionEnd = s + sym.length;
  inp.focus();
};

window.numPadBackspace = (containerId) => {
  const inp = document.getElementById('num-ans-' + containerId);
  if (!inp) return;
  const s = inp.selectionStart, e = inp.selectionEnd;
  if (s !== e) {
    inp.value = inp.value.slice(0, s) + inp.value.slice(e);
    inp.selectionStart = inp.selectionEnd = s;
  } else if (s > 0) {
    inp.value = inp.value.slice(0, s - 1) + inp.value.slice(s);
    inp.selectionStart = inp.selectionEnd = s - 1;
  }
  inp.focus();
};

window.numPadClear = (containerId) => {
  const inp = document.getElementById('num-ans-' + containerId);
  if (!inp) return;
  inp.value = '';
  inp.focus();
};

// ── RENDER HELPERS ────────────────────────────
// Escape a value for use inside a double-quoted HTML attribute. Only the
// attribute - option text is still injected as HTML on purpose, so an option
// may contain markup.
function _attr(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderAnswerArea(q, containerId, selectedAnswer, disabled) {
  const cont = document.getElementById(containerId);
  if (!cont) return;
  if (q.type === 'symmetry') {
    renderSymmetryGrid(q, cont, selectedAnswer, disabled);
    return;
  }
  if (q.type === 'mcq') {
    cont.innerHTML = (q.options || []).map((opt, i) => {
      let cls = 'mcq-opt';
      if (disabled) {
        cls += ' disabled';
        if (opt === q.answer) cls += ' correct';
        else if (opt === selectedAnswer && opt !== q.answer) cls += ' wrong';
        else if (opt === selectedAnswer) cls += ' selected';
      } else {
        if (opt === selectedAnswer) cls += ' selected';
      }
      // q.answer used to be interpolated into the onclick as a single-quoted JS
      // string. Any answer containing an apostrophe - "c'est", "l'école", most
      // of the French bank - closed that string early and made the handler a
      // syntax error, so the option silently would not select and Check Answer
      // then said "Please answer the question first".
      // selectMCQ never read the argument anyway, so it is gone rather than
      // escaped. data-value is the real data path (getSelectedAnswer reads it)
      // and is now escaped properly.
      return `<button class="${cls}" data-value="${_attr(opt)}" onclick="this.classList.add('mcq-spring');this.onanimationend=()=>this.classList.remove('mcq-spring');selectMCQ(this,'${containerId}',${disabled})">
        <span class="opt-letter">${String.fromCharCode(65+i)}</span>
        <span>${opt}</span>
      </button>`;
    }).join('');
  } else {
    const cls = disabled ? (checkAnswer(q, selectedAnswer) ? 'num-input correct' : 'num-input wrong') : 'num-input';
    const inputExtra = disabled ? 'disabled' : 'inputmode="decimal"';
    cont.innerHTML = `<input type="text" class="${cls}" id="num-ans-${containerId}" value="${_attr(selectedAnswer || '')}" placeholder="Type your answer here…" ${inputExtra}
      onkeydown="if(event.key==='Enter'){${containerId==='exam-answer-area'?'saveCurrentExamAnswer()':'practiceSubmit()'}}" autocomplete="off">`;

    if (!disabled) {
      const chSyms = (q.chapterId && SYMBOL_KEYS[q.chapterId]) || [];
      // Powers gets a 4-column pad (digits + ^ ² ³ in same grid).
      // Other chapters: 3-column digit pad + a dedicated symbol row below.
      const isPowers = q.chapterId === 'powers';

      let padHTML = '';
      if (isPowers) {
        // 4-column grid: digit | digit | digit | symbol
        const cols4 = [
          ['7','8','9', chSyms[0]?.v ?? '^'],
          ['4','5','6', chSyms[1]?.v ?? '²'],
          ['1','2','3', chSyms[2]?.v ?? '³'],
          ['.','0','⌫','C'],
        ];
        const symVals = chSyms.map(s => s.v);
        padHTML = `<div class="num-pad num-pad-4col" role="group" aria-label="Number pad">
          ${cols4.map(row => row.map((k,ci) => {
            if (k === '⌫') return `<button type="button" class="num-pad-btn num-pad-del" onclick="numPadBackspace('${containerId}')">⌫</button>`;
            if (k === 'C')  return `<button type="button" class="num-pad-btn num-pad-clear" onclick="numPadClear('${containerId}')">C</button>`;
            const isSym = symVals.includes(k);
            return `<button type="button" class="num-pad-btn${isSym?' num-pad-sym':''}" onclick="insertSymbol('${containerId}','${k}')">${k}</button>`;
          }).join('')).join('')}
        </div>
        <p class="sym-hint">Tap <b>^</b> then the exponent &mdash; e.g. <b>5^2</b> means 5²</p>`;
      } else {
        // Standard 3-column pad
        const numRows = [['7','8','9'],['4','5','6'],['1','2','3'],['.','0','⌫']];
        padHTML = `<div class="num-pad" role="group" aria-label="Number pad">
          ${numRows.map(row => row.map(k => {
            if (k === '⌫') return `<button type="button" class="num-pad-btn num-pad-del" onclick="numPadBackspace('${containerId}')">⌫</button>`;
            return `<button type="button" class="num-pad-btn" onclick="insertSymbol('${containerId}','${k}')">${k}</button>`;
          }).join('')).join('')}
          <button type="button" class="num-pad-btn num-pad-clear" onclick="numPadClear('${containerId}')">C</button>
          <button type="button" class="num-pad-btn num-pad-space" onclick="insertSymbol('${containerId}',' ')">SPC</button>
          <button type="button" class="num-pad-btn num-pad-minus" onclick="insertSymbol('${containerId}','-')">−</button>
        </div>`;

        // Symbol row for chapters that need special chars
        if (chSyms.length) {
          padHTML += `
          <div class="sym-keyboard" role="toolbar" aria-label="Symbol keyboard">
            <span class="sym-label">Insert:</span>
            ${chSyms.map(k => `<button type="button" class="sym-btn" onclick="insertSymbol('${containerId}','${k.v}')">${k.d}</button>`).join('')}
          </div>`;
        }
      }

      const padId = 'numpad-' + containerId;
      const _isMobile = ('ontouchstart' in window) || window.matchMedia('(max-width:768px)').matches;
      cont.innerHTML += `
        <button type="button" class="numpad-toggle${_isMobile ? ' active' : ''}" onclick="
          var p=document.getElementById('${padId}');
          var show=p.style.display==='none'||!p.style.display;
          p.style.display=show?'block':'none';
          this.classList.toggle('active',show);
        " title="Show / hide keypad">⌨️ Keypad</button>
        <div id="${padId}" style="display:${_isMobile ? 'block' : 'none'}">${padHTML}</div>`;
      setTimeout(() => document.getElementById('num-ans-' + containerId)?.focus(), 50);
    }
  }
}

window.selectMCQ = (btn, containerId, disabled) => {
  if (disabled) return;
  document.querySelectorAll(`#${containerId} .mcq-opt`).forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
};

function getSelectedAnswer(containerId, qType) {
  if (qType === 'mcq') {
    const sel = document.querySelector(`#${containerId} .mcq-opt.selected`);
    return sel ? sel.dataset.value : null;
  }
  if (qType === 'symmetry') {
    const selected = [];
    document.querySelectorAll(`#${containerId} .sym-clickable.sym-selected`).forEach(el => {
      selected.push([parseInt(el.dataset.r), parseInt(el.dataset.c)]);
    });
    selected.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    return JSON.stringify(selected);
  }
  const inp = document.getElementById('num-ans-' + containerId);
  return inp ? inp.value.trim() : null;
}

// ── CONFETTI ──────────────────────────────────
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const cols = ['#ff6b6b','#feca57','#48dbfb','#ff9ff3','#54a0ff','#5f27cd','#00d2d3','#ff9f43'];
  const particles = Array.from({length:160}, () => ({
    x: Math.random() * canvas.width, y: -20,
    r: rnd(4, 10), col: cols[rnd(0, cols.length-1)],
    vx: (Math.random()-0.5)*5, vy: rnd(2, 5),
    angle: Math.random()*360, va: (Math.random()-0.5)*12
  }));
  let af;
  const frame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = 0;
    particles.forEach(p => {
      if (p.y > canvas.height + 20) return;
      alive++;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle * Math.PI / 180);
      ctx.fillStyle = p.col;
      ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r * 0.6);
      ctx.restore();
      p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.angle += p.va;
    });
    if (alive > 0) af = requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  frame();
  setTimeout(() => { cancelAnimationFrame(af); ctx.clearRect(0, 0, canvas.width, canvas.height); }, 6000);
}

// ── BADGES ────────────────────────────────────
function checkBadges() {
  // Generic badges + whatever the ACTIVE subject pack defines.
  packBadges().forEach(b => {
    if (DB.badges.includes(b.id)) return;
    try {
      if (b.cond(DB.stats, DB.chapters)) {
        DB.badges.push(b.id);
        save(DB);
        showBadgeAlert(b);
      }
    } catch(e) {}
  });
}
function showBadgeAlert(b) {
  const el = document.createElement('div');
  el.className = 'fixed top-20 right-4 z-50 bg-yellow-400 text-yellow-900 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 badge-pop';
  el.innerHTML = `<span class="text-2xl">${b.icon}</span><div><div class="font-bold text-sm">Badge Unlocked!</div><div class="text-xs">${b.name}</div></div>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

// ── XP & LEVELS (Phase 4) ─────────────────────
const XP_PER_ANSWER  = 10;
const XP_THRESHOLDS  = [0, 100, 250, 500, 900, 1400, 2000, 2800, 3800, 5000];
const LEVEL_NAMES    = ['Beginner','Explorer','Learner','Practiser','Achiever','Expert','Champion','Master','Genius','Legend'];

function getLevel(xp) {
  for (let i = XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= XP_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

function gainXP() {
  DB.xp = (DB.xp || 0) + XP_PER_ANSWER;
  const newLevel = getLevel(DB.xp);
  const oldLevel = DB.level || 1;
  DB.level = newLevel;
  if (newLevel > oldLevel) { _playSound('levelup'); _haptic('levelup'); showLevelUp(newLevel); }
  updateXPBar();
}

function updateXPBar() {
  const xp = DB.xp || 0;
  const lv = DB.level || 1;
  const el = document.getElementById('xp-display');
  if (!el) return;
  const curr = XP_THRESHOLDS[lv - 1] || 0;
  const next = XP_THRESHOLDS[lv]     || XP_THRESHOLDS[XP_THRESHOLDS.length - 1];
  const pct  = lv >= XP_THRESHOLDS.length ? 100 : Math.min(100, Math.round((xp - curr) / (next - curr) * 100));
  el.innerHTML = `<span class="text-xs font-bold text-purple-700 dark:text-purple-300">⭐ Lv.${lv}</span>
    <div style="width:48px;height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden">
      <div style="width:${pct}%;height:100%;background:linear-gradient(90deg,#8b5cf6,#6366f1);border-radius:3px"></div>
    </div>`;
}

function showLevelUp(level) {
  toast(`🎉 Level Up! You're now Level ${level} - ${LEVEL_NAMES[level - 1] || ''}!`, 4000);
  launchConfetti();
}

// ── FAMILY LEADERBOARD ────────────────────────
function _renderLeaderboard() {
  const el = document.getElementById('pd-leaderboard');
  if (!el) return;
  const accounts = Store.getAccounts();
  if (accounts.length < 2) { el.innerHTML = '<p class="text-xs text-gray-400 dark:text-gray-500 text-center py-2">Add more children to see the leaderboard.</p>'; return; }

  const ranked = accounts.map(a => {
    const d = Store.loadStudent(a.id);
    const acc = d.stats.totalAttempted ? Math.round(d.stats.totalCorrect / d.stats.totalAttempted * 100) : 0;
    return { ...a, xp: d.xp || 0, acc, level: d.level || 1 };
  }).sort((a, b) => b.xp - a.xp || b.acc - a.acc);

  const medals = ['🥇', '🥈', '🥉'];
  el.innerHTML = ranked.map((a, i) => `
    <div class="flex items-center gap-3 py-2 ${a.id === ACTIVE_STUDENT_ID ? 'font-bold' : ''}">
      <span class="text-lg w-6 text-center shrink-0">${medals[i] || `${i+1}.`}</span>
      <span class="text-xl select-none">${a.avatar}</span>
      <div class="flex-1 min-w-0">
        <div class="text-sm text-gray-800 dark:text-white truncate">${a.name}${a.id === ACTIVE_STUDENT_ID ? ' <span class="text-xs text-blue-400 font-normal">(active)</span>' : ''}</div>
        <div class="text-xs text-gray-400">Lv.${a.level} · ${a.xp} XP · ${a.acc}% accuracy</div>
      </div>
    </div>`).join('<hr class="border-gray-100 dark:border-gray-700">');
}

// ── PARENT DASHBOARD ──────────────────────────
async function renderParentDashboard() {
  const _el = id => document.getElementById(id);

  const students    = Auth.getStudents() || [];
  const hasStudents = students.length > 0;

  if (_el('pd-no-children'))   _el('pd-no-children').classList.toggle('hidden', hasStudents);
  if (_el('pd-children-grid')) _el('pd-children-grid').classList.toggle('hidden', !hasStudents);
  if (_el('pd-detail-panel'))  _el('pd-detail-panel').classList.add('hidden');

  // Plan banner - load async, non-blocking
  const parentProfile = Auth.getParentProfile?.();
  if (parentProfile?.id && _el('pd-plan-banner')) {
    Store.getUserPlan(parentProfile.id).then(({ plan_id, plan, subscription }) => {
      const banner = _el('pd-plan-banner');
      if (!banner) return;
      banner.classList.remove('hidden');
      const icons = { free: '🆓', starter: '⭐', premium: '👑' };
      if (_el('pd-plan-icon')) _el('pd-plan-icon').textContent = icons[plan_id] || '🆓';
      if (_el('pd-plan-name')) _el('pd-plan-name').textContent = (plan?.name || plan_id || 'Free') + ' Plan';
      const expEl = _el('pd-plan-expires');
      if (expEl) {
        expEl.textContent = subscription?.expires_at
          ? `Active until ${new Date(subscription.expires_at).toLocaleDateString()}`
          : 'No expiry - free tier';
      }
    }).catch(() => {});
  }

  _renderTeacherApplyCard();

  // First-time parent onboarding hints
  _checkParentHints();

  if (!hasStudents) return;

  const grid = _el('pd-children-grid');
  if (!grid) return;

  // Render skeleton cards first for instant paint
  grid.innerHTML = students.map(s => `
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border-2 border-transparent
      hover:border-indigo-300 dark:hover:border-indigo-600 cursor-pointer transition-all active:scale-95"
      onclick="PD.selectChild('${s.id}')">
      <div class="flex items-center gap-3 mb-3">
        <span class="text-4xl select-none">${s.avatar || '🧒'}</span>
        <div>
          <div class="font-bold text-gray-800 dark:text-white">${s.display_name || s.username}</div>
          <div class="text-xs text-gray-400 dark:text-gray-500">Grade ${s.grade || '?'}</div>
        </div>
      </div>
      <div id="pd-card-stats-${s.id}">
        <div class="h-3 bg-gray-100 dark:bg-gray-700 rounded-full animate-pulse mb-1.5"></div>
        <div class="h-3 bg-gray-100 dark:bg-gray-700 rounded-full animate-pulse w-2/3"></div>
      </div>
    </div>`).join('');

  // Fill real stats asynchronously per card
  for (const s of students) {
    Store.loadStudentProgress(s.id).then(prog => {
      const statsEl = document.getElementById(`pd-card-stats-${s.id}`);
      if (!statsEl) return;
      const st  = prog.stats || {};
      const acc = st.totalAttempted ? Math.round(st.totalCorrect / st.totalAttempted * 100) : 0;
      const col = acc >= 80 ? '#22c55e' : acc >= 50 ? '#f59e0b' : '#3b82f6';
      const today = new Date().toDateString();
      const studiedToday = st.lastDate === today;
      statsEl.innerHTML = `
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs font-semibold px-2 py-0.5 rounded-full ${studiedToday ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}">
            ${studiedToday ? '✅ Studied today' : '⏳ No activity yet today'}
          </span>
        </div>
        <div class="flex gap-3 text-xs text-gray-500 dark:text-gray-400 mb-1.5">
          <span>📝 ${st.totalAttempted || 0}</span>
          <span>🎯 ${acc}%</span>
          <span>🔥 ${st.streak || 0}d streak</span>
        </div>
        <div class="flex items-center gap-2">
          <div style="flex:1;height:5px;background:#e2e8f0;border-radius:3px;overflow:hidden">
            <div style="width:${acc}%;height:100%;background:${col};border-radius:3px"></div>
          </div>
          <span class="text-xs font-bold shrink-0" style="color:${col}">${acc}%</span>
        </div>`;
    }).catch(() => {});
  }
}

// ── TEACHER APPLICATION CARD (parent dashboard) ──
// Rendered into a slot in the parent dashboard. Tutors in Mauritius are usually
// also parents, so this is where they discover that teacher access exists -
// rather than having to email someone and hope.
function _renderTeacherApplyCard() {
  const slot = document.getElementById('pd-teacher-apply');
  if (!slot || typeof Auth === 'undefined' || !Auth.getTeacherStatus) return;

  const status = Auth.getTeacherStatus();
  if (Auth.isTeacher && Auth.isTeacher()) { slot.innerHTML = ''; return; }

  const VIEW = {
    pending: {
      cls: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700/40',
      icon: '⏳', title: 'Teacher application pending',
      body: 'An administrator is reviewing your application. You will get access as soon as it is approved.',
      btn: null,
    },
    rejected: {
      cls: 'bg-gray-50 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700',
      icon: '📄', title: 'Application not approved',
      body: 'Your teacher application was not approved. You can apply again with more detail.',
      btn: 'Apply again',
    },
    suspended: {
      cls: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700/40',
      icon: '🚫', title: 'Teacher access suspended',
      body: 'Please contact the administrator.',
      btn: null,
    },
  };
  const v = VIEW[status] || {
    cls: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700/40',
    icon: '👩‍🏫', title: 'Are you a tutor?',
    body: 'Apply for a teacher account to set homework your students complete without needing an account of their own.',
    btn: 'Apply for teacher access',
  };

  slot.innerHTML = `
    <div class="rounded-2xl border p-4 mb-4 ${v.cls}">
      <div class="flex items-start gap-3">
        <span class="text-2xl select-none shrink-0">${v.icon}</span>
        <div class="flex-1 min-w-0">
          <div class="font-bold text-sm text-gray-800 dark:text-white">${v.title}</div>
          <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">${v.body}</p>
          ${v.btn ? `
          <textarea id="pd-teacher-note" rows="2" maxlength="500"
            class="w-full mt-3 text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Where do you tutor, and which subjects? (helps the reviewer)"></textarea>
          <button onclick="_submitTeacherApplication(this)"
            class="mt-2 text-xs font-semibold bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition-colors">
            ${v.btn}
          </button>` : ''}
        </div>
      </div>
    </div>`;
}

async function _submitTeacherApplication(btn) {
  const note = document.getElementById('pd-teacher-note')?.value || '';
  if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
  await Auth.requestTeacherAccess(note);
  _renderTeacherApplyCard();
}

// ── PD (Parent Dashboard controller) ─────────
const PD = (() => {
  let _activeId = null;

  function selectChild(id) {
    _activeId = id;
    Auth.pdSwitchStudent(id);

    const _el = el => document.getElementById(el);
    const s   = (Auth.getStudents() || []).find(st => st.id === id);

    if (_el('pd-children-grid')) _el('pd-children-grid').classList.add('hidden');
    if (_el('pd-no-children'))   _el('pd-no-children').classList.add('hidden');
    const panel = _el('pd-detail-panel');
    if (panel) panel.classList.remove('hidden');

    if (s) {
      if (_el('pd-detail-avatar')) _el('pd-detail-avatar').textContent = s.avatar || '🧒';
      if (_el('pd-detail-name'))   _el('pd-detail-name').textContent   = s.display_name || s.username;
      if (_el('pd-detail-grade'))  _el('pd-detail-grade').textContent  = `Grade ${s.grade || '?'}`;
    }

    pdTab('progress');
    renderDetail();
  }

  function closeDetail() {
    const panel = document.getElementById('pd-detail-panel');
    if (panel) panel.classList.add('hidden');
    renderParentDashboard();
  }

  function pdTab(tab) {
    const panel = document.getElementById('pd-detail-panel');
    if (!panel) return;
    panel.querySelectorAll('.pd-tab').forEach(b => {
      const active = b.dataset.tab === tab;
      b.classList.toggle('bg-white',          active);
      b.classList.toggle('dark:bg-gray-700',  active);
      b.classList.toggle('shadow-sm',         active);
      b.classList.toggle('font-semibold',     active);
      b.classList.toggle('text-gray-800',     active);
      b.classList.toggle('dark:text-white',   active);
      b.classList.toggle('text-gray-500',    !active);
      b.classList.toggle('dark:text-gray-400',!active);
    });
    panel.querySelectorAll('.pd-tab-content').forEach(c => {
      c.classList.toggle('hidden', c.dataset.tab !== tab);
    });
    if (tab === 'assign') { _renderAssignments(); _checkAssignHint(); }
  }

  function renderDetail() {
    const acct  = Auth.getActiveAccount() || {};
    const _el   = id => document.getElementById(id);
    const stats = DB.stats || {};
    const acc   = stats.totalAttempted ? Math.round(stats.totalCorrect / stats.totalAttempted * 100) : 0;

    const today = new Date().toDateString();
    const studiedToday = stats.lastDate === today;
    const todayEl = document.getElementById('pd-today-status');
    if (todayEl) {
      todayEl.className = `rounded-2xl p-4 mb-4 flex items-center gap-3 ${
        studiedToday
          ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40'
          : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40'
      }`;
      todayEl.innerHTML = `
        <div class="text-2xl select-none">${studiedToday ? '✅' : '⏳'}</div>
        <div>
          <div class="font-semibold ${studiedToday ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'} text-sm">
            ${studiedToday ? 'Studied today' : 'No activity yet today'}
          </div>
          <div class="text-xs ${studiedToday ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}">
            ${stats.streak ? `${stats.streak}-day streak 🔥` : 'No streak yet'}
          </div>
        </div>`;
    }

    if (_el('pd-total'))  _el('pd-total').textContent  = stats.totalAttempted || 0;
    if (_el('pd-acc'))    _el('pd-acc').textContent    = acc + '%';
    if (_el('pd-streak')) _el('pd-streak').textContent = (stats.streak || 0) + ' 🔥';
    if (_el('pd-badges')) _el('pd-badges').textContent = (DB.badges || []).length;

    _renderSubjectProgress(acct);
    _renderLeaderboard();
    _renderParentAssignDropdown(acct);
    _renderParentControls(acct);
  }

  async function _renderAssignments() {
    const listEl = document.getElementById('pd-asgn-list');
    if (!listEl || !_activeId) return;
    listEl.innerHTML = '<p class="text-sm text-gray-400 text-center py-4">Loading…</p>';
    const asgns  = await Store.loadAssignments(_activeId);
    const DLABELS = ['🎲 Random','Basic','Medium','Hard','Challenge'];
    const allChs  = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [])
      .flatMap(p => p._chapters || p.chapters || []);
    listEl.innerHTML = asgns.length ? asgns.map(a => {
      const ch  = allChs.find(c => c.id === a.chapter_id) || CHAPTERS.find(c => c.id === a.chapter_id);
      const dlv = a.difficulty ? (DLABELS[a.difficulty] || `L${a.difficulty}`) : 'All Levels';
      return `<div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
        <span class="text-xl select-none">${ch?.icon || '📚'}</span>
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-sm text-gray-800 dark:text-white">${ch?.name || a.chapter_id || 'Any Chapter'} - ${dlv}</div>
          ${a.note ? `<div class="text-xs text-gray-400 italic">"${a.note}"</div>` : ''}
          <div class="text-xs text-gray-400">${new Date(a.created_at).toLocaleDateString()}</div>
        </div>
        <button onclick="Auth.removeAssignment('${a.id}')"
          class="shrink-0 text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-lg hover:bg-red-200 transition-colors">Remove</button>
      </div>`;
    }).join('') : '<p class="text-sm text-gray-400 text-center py-4">No assignments yet. Add one above.</p>';
  }

  // ── Study reminder ─────────────────────────────
  async function _loadReminder() {
    if (!_activeId) return;
    const timeEl   = document.getElementById('pd-reminder-time');
    const statusEl = document.getElementById('pd-reminder-status');
    if (!timeEl || !statusEl) return;
    try {
      const res  = await fetch(`/.netlify/functions/push-subscribe?studentId=${_activeId}&action=get`, { method: 'GET', headers: await _pushAuthHeaders() });
      if (!res.ok) return;
      const data = await res.json();
      if (data.reminder_time) {
        timeEl.value = data.reminder_time;
        statusEl.textContent = `Reminder set for ${data.reminder_time} Mauritius time.`;
      } else {
        statusEl.textContent = 'No reminder set.';
      }
    } catch(_) {}
  }

  async function saveReminder() {
    if (!_activeId) return;
    const timeEl   = document.getElementById('pd-reminder-time');
    const statusEl = document.getElementById('pd-reminder-status');
    const time     = timeEl?.value;
    if (!time) { if (statusEl) statusEl.textContent = 'Please pick a time first.'; return; }
    try {
      const res = await fetch('/.netlify/functions/push-subscribe', {
        method: 'POST',
        headers: await _pushAuthHeaders(),
        body: JSON.stringify({ studentId: _activeId, reminderTime: time }),
      });
      if (statusEl) statusEl.textContent = res.ok ? `Reminder saved for ${time} MU time. ✅` : 'Save failed — make sure the student has notifications enabled.';
    } catch(_) { if (statusEl) statusEl.textContent = 'Network error.'; }
  }

  async function clearReminder() {
    if (!_activeId) return;
    const timeEl   = document.getElementById('pd-reminder-time');
    const statusEl = document.getElementById('pd-reminder-status');
    try {
      const res = await fetch('/.netlify/functions/push-subscribe', {
        method: 'POST',
        headers: await _pushAuthHeaders(),
        body: JSON.stringify({ studentId: _activeId, reminderTime: null }),
      });
      if (res.ok) { if (timeEl) timeEl.value = ''; if (statusEl) statusEl.textContent = 'Reminder cleared.'; }
    } catch(_) {}
  }

  // Load reminder when detail panel opens
  const _origSelectChild = selectChild;
  function selectChildWithReminder(id) {
    _origSelectChild(id);
    setTimeout(_loadReminder, 300);
  }

  return { selectChild: selectChildWithReminder, closeDetail, pdTab, renderDetail, saveReminder, clearReminder };
})();

// ── PARENT DASHBOARD HELPERS ──────────────────
function _renderSubjectProgress(acct) {
  const spEl = document.getElementById('pd-subject-progress');
  if (!spEl) return;
  const studentGrade = acct?.grade || 5;
  const packs = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [])
    .filter(p => p.grade === studentGrade && !p.comingSoon);
  const lockedChs = DB.restrictions?.lockedChapters || [];
  if (!packs.length) { spEl.innerHTML = '<p class="text-sm text-gray-400">No subjects loaded yet.</p>'; return; }
  spEl.innerHTML = packs.map(pack => {
    const chs    = pack._chapters || pack.chapters || [];
    const dbCh   = DB.chapters || {};
    const total   = chs.reduce((s, ch) => s + ((dbCh[ch.id]?.attempted) || 0), 0);
    const correct = chs.reduce((s, ch) => s + ((dbCh[ch.id]?.correct)   || 0), 0);
    const pct = total ? Math.round(correct / total * 100) : 0;
    const col = pct >= 80 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#3b82f6';
    const chapRows = chs.map(ch => {
      const c  = (DB.chapters || {})[ch.id] || { attempted: 0, correct: 0 };
      const cp = c.attempted ? Math.round(c.correct / c.attempted * 100) : 0;
      const cc = cp >= 80 ? '#22c55e' : cp >= 50 ? '#f59e0b' : '#3b82f6';
      const lk = lockedChs.includes(ch.id) ? ' 🔒' : '';
      return `<div class="flex items-center gap-3 py-1.5 border-b border-gray-100 dark:border-gray-700 last:border-0">
        <span class="text-sm text-gray-700 dark:text-gray-300 flex-1 min-w-0 truncate">${ch.icon || '📖'} ${ch.name}${lk}</span>
        <span class="text-xs text-gray-400 w-8 text-center shrink-0">${c.attempted}</span>
        <div class="shrink-0" style="display:inline-flex;align-items:center;gap:5px;width:90px">
          <div style="flex:1;height:5px;background:#e2e8f0;border-radius:3px;overflow:hidden">
            <div style="width:${cp}%;height:100%;background:${cc};border-radius:3px"></div>
          </div>
          <span class="text-xs font-medium" style="color:${cc};width:28px;text-align:right">${cp}%</span>
        </div>
      </div>`;
    }).join('');
    return `<div class="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <button class="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
        onclick="this.nextElementSibling.classList.toggle('hidden')">
        <span class="text-xl select-none">${pack.icon}</span>
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-sm text-gray-800 dark:text-white">${pack.subject}</div>
          <div style="display:inline-flex;align-items:center;gap:5px;margin-top:3px;width:120px">
            <div style="flex:1;height:5px;background:#e2e8f0;border-radius:3px;overflow:hidden">
              <div style="width:${pct}%;height:100%;background:${col};border-radius:3px"></div>
            </div>
            <span class="text-xs font-bold" style="color:${col}">${pct}%</span>
          </div>
        </div>
        <span class="text-xs text-gray-400">${total} Q done ▾</span>
      </button>
      <div class="hidden px-4 py-2">
        <div class="flex text-xs text-gray-400 uppercase border-b border-gray-100 dark:border-gray-700 pb-1 mb-1">
          <span class="flex-1">Chapter</span><span class="w-8 text-center">Tried</span><span style="width:90px" class="ml-3">Score</span>
        </div>
        ${chapRows}
      </div>
    </div>`;
  }).join('');
}

function _renderParentAssignDropdown(acct) {
  const assignSubjEl = document.getElementById('pd-assign-subject');
  if (!assignSubjEl) return;
  const studentGrade = acct?.grade || 5;
  const packs = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [])
    .filter(p => p.grade === studentGrade && !p.comingSoon);
  assignSubjEl.innerHTML = packs.map(p => `<option value="${p.id}">${p.icon} ${p.subject}</option>`).join('');
  _pdFillAssignChapters(packs[0]);
}

function _renderParentControls(acct) {
  const _el     = id => document.getElementById(id);
  const maxDiff = DB.restrictions?.maxDifficulty  ?? 4;
  const examOff = DB.restrictions?.examDisabled   ?? false;
  const crossSearch   = DB.restrictions?.crossGradeSearch   ?? false;
  const crossPractice = DB.restrictions?.crossGradePractice ?? false;
  const lockedChs = DB.restrictions?.lockedChapters || [];

  [1,2,3,4].forEach(lv => { const r = _el(`pd-maxdiff-${lv}`); if (r) r.checked = maxDiff === lv; });
  const examToggle = _el('pd-exam-toggle');
  if (examToggle) examToggle.checked = !examOff;
  const csToggle = _el('pd-crossgrade-search-toggle');
  if (csToggle) csToggle.checked = crossSearch;
  const cpToggle = _el('pd-crossgrade-practice-toggle');
  if (cpToggle) cpToggle.checked = crossPractice;
  const hintsToggle = _el('pd-hints-toggle');
  if (hintsToggle) hintsToggle.checked = !(DB.restrictions?.hintsDisabled ?? false);

  const chLocks = _el('pd-chapter-locks');
  if (!chLocks) return;

  const lockGrade = acct?.grade || 5;
  const lockPacks = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [])
    .filter(p => p.grade === lockGrade && !p.comingSoon);

  if (!lockPacks.length) { chLocks.innerHTML = '<p class="text-sm text-gray-400 text-center py-3">No subjects loaded yet.</p>'; return; }

  chLocks.innerHTML = lockPacks.map((pack, idx) => {
    const packChs    = (pack._chapters || pack.chapters || []).filter(ch => !ch.enrichment);
    const enrichChs  = (pack._chapters || pack.chapters || []).filter(ch =>  ch.enrichment);
    const lockedMain = packChs.filter(ch => lockedChs.includes(ch.id)).length;
    const hasLocked  = lockedMain > 0;
    const isOpen     = hasLocked || idx === 0;

    const pill = hasLocked
      ? `<span class="text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">${lockedMain} locked</span>`
      : `<span class="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">All open</span>`;

    const mkRow = (ch, isEnr) => {
      const isLocked = lockedChs.includes(ch.id);
      return `<label class="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors
          ${isLocked ? 'bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/40'}">
        <input type="checkbox" ${isLocked ? '' : 'checked'} onchange="Auth.toggleChapterLock('${ch.id}',!this.checked)"
          class="w-4 h-4 accent-blue-500 shrink-0">
        <span class="text-sm text-gray-700 dark:text-gray-300 flex-1 min-w-0 truncate">${ch.icon || '📖'} ${ch.name}${isEnr ? ' <span class="text-xs text-amber-500">✨</span>' : ''}</span>
        ${isLocked ? '<span class="text-xs font-medium text-red-400 shrink-0">🔒 Locked</span>' : ''}
      </label>`;
    };

    const mainRows = packChs.map(ch => mkRow(ch, false)).join('');
    const enrSection = enrichChs.length ? `
      <div class="mt-1 pt-1 border-t border-dashed border-gray-200 dark:border-gray-600">
        <div class="px-3 py-1 text-xs text-amber-500 font-semibold uppercase tracking-wide">✨ Bonus Chapters</div>
        ${enrichChs.map(ch => mkRow(ch, true)).join('')}
      </div>` : '';

    return `<div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden${idx ? ' mt-2' : ''}">
      <button onclick="var b=this.nextElementSibling;b.classList.toggle('hidden');this.querySelector('.chev').style.transform=b.classList.contains('hidden')?'':'rotate(180deg)'"
        class="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors text-left">
        <span class="text-xl select-none">${pack.icon}</span>
        <span class="flex-1 font-semibold text-sm text-gray-800 dark:text-white">${pack.subject}</span>
        ${pill}
        <span class="chev text-gray-400 text-xs transition-transform" style="transform:${isOpen ? 'rotate(180deg)' : ''}">▼</span>
      </button>
      <div class="${isOpen ? '' : 'hidden'} px-2 py-1.5 space-y-0.5">
        ${mainRows}${enrSection}
      </div>
    </div>`;
  }).join('');
}

// ── ASSIGNMENT CHAPTER HELPER ─────────────────
function _pdFillAssignChapters(pack) {
  const el = document.getElementById('pd-assign-chapter');
  if (!el) return;
  const chs = (pack?._chapters || pack?.chapters || []).filter(ch => !ch.enrichment);
  el.innerHTML = `<option value="">Any Chapter</option>` +
    chs.map(ch => `<option value="${ch.id}">${ch.icon || ''} ${ch.name}</option>`).join('');
  // Hide difficulty selector for subjects where difficulty levels don't apply
  const diffRow = document.getElementById('pd-assign-diff-row');
  if (diffRow) diffRow.classList.toggle('hidden', !!pack?.noDifficulty);
}

// ── STUDENT ASSIGNMENTS (dashboard view) ──────
async function _renderStudentAssignments(studentId) {
  const banner = document.getElementById('dash-assignments');
  const listEl = document.getElementById('dash-assignments-list');
  if (!banner || !listEl || !studentId) return;
  const asgns = await Store.loadAssignments(studentId);
  if (!asgns.length) { banner.classList.add('hidden'); return; }
  banner.classList.remove('hidden');
  const packs  = typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [];
  const allChs = packs.flatMap(p => p._chapters || p.chapters || []);
  listEl.innerHTML = asgns.map(a => {
    const pack = packs.find(p => p.id === a.subject_id);
    const ch   = allChs.find(c => c.id === a.chapter_id) || CHAPTERS.find(c => c.id === a.chapter_id);
    const subjectName = pack?.subject || a.subject_id || 'Subject';
    const chName = ch?.name || a.chapter_id || 'Any Chapter';
    const dlv  = a.difficulty ? `Level ${a.difficulty}` : '🎲 Random';
    const canStart = !!(a.subject_id && a.chapter_id);
    return `<div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-300 dark:border-blue-600 shadow-sm">
      <div class="flex items-start gap-3">
        <span class="text-2xl select-none mt-0.5">${ch?.icon || '📚'}</span>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-bold text-gray-800 dark:text-white">${subjectName} - ${chName}</div>
          <div class="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5">${dlv}</div>
          ${a.note ? `<div class="text-xs text-gray-500 dark:text-gray-400 italic mt-1">"${a.note}"</div>` : ''}
        </div>
      </div>
      <div class="flex gap-2 mt-3">
        ${canStart ? `<button onclick="startAssignmentDirect('${a.subject_id}','${a.chapter_id}',${a.difficulty || 1},${a.show_answers !== false})"
          class="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors shadow">
          ▶ Start Now
        </button>` : ''}
        <button onclick="_markAssignmentDone('${a.id}', this)"
          class="${canStart ? 'shrink-0 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300' : 'flex-1 bg-green-500 hover:bg-green-600 text-white'} px-3 py-2 rounded-xl transition-colors text-xs font-semibold">
          ✓ Mark Complete
        </button>
      </div>
    </div>`;
  }).join('');
}

async function _markAssignmentDone(id, btn) {
  if (btn) { btn.disabled = true; btn.textContent = '…'; }
  await Store.completeAssignment(id);
  _renderStudentAssignments(ACTIVE_STUDENT_ID);
}

// ── SCRATCHPAD ────────────────────────────────
function initScratchpad(id) {
  const canvas = document.getElementById(id);
  if (!canvas || canvas._initialized) return;
  canvas._initialized = true;
  canvas.width = canvas.offsetWidth || 240;
  canvas.height = parseInt(canvas.getAttribute('height')) || 200;
  const ctx = canvas.getContext('2d');
  canvas._ctx = ctx;
  ctx.strokeStyle = DB.theme === 'dark' ? '#fff' : '#1e293b';
  ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  let drawing = false, lx = 0, ly = 0;
  const pos = (e) => {
    const r = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: (src.clientX - r.left) * (canvas.width / r.width), y: (src.clientY - r.top) * (canvas.height / r.height) };
  };
  const start = e => { drawing = true; const p = pos(e); lx = p.x; ly = p.y; };
  const draw = e => {
    if (!drawing) return; e.preventDefault();
    const p = pos(e);
    ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(p.x, p.y); ctx.stroke();
    lx = p.x; ly = p.y;
  };
  const stop = () => drawing = false;
  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stop);
  canvas.addEventListener('mouseleave', stop);
  canvas.addEventListener('touchstart', start, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  canvas.addEventListener('touchend', stop);

  // Faint placeholder text
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.font = '13px sans-serif';
  ctx.fillStyle = DB.theme === 'dark' ? '#fff' : '#1e293b';
  ctx.textAlign = 'center';
  ctx.fillText('✏️ Draw your working here', canvas.width / 2, canvas.height / 2);
  ctx.restore();
  canvas._hasPlaceholder = true;

  canvas.addEventListener('mousedown', () => { if (canvas._hasPlaceholder) { canvas._hasPlaceholder = false; ctx.clearRect(0,0,canvas.width,canvas.height); } }, { once: true });
  canvas.addEventListener('touchstart', () => { if (canvas._hasPlaceholder) { canvas._hasPlaceholder = false; ctx.clearRect(0,0,canvas.width,canvas.height); } }, { once: true });
}
function clearScratch(id) {
  const c = document.getElementById(id);
  if (c && c._ctx) c._ctx.clearRect(0, 0, c.width, c.height);
}

// ── DASHBOARD ─────────────────────────────────
function _greeting() {
  const h = new Date().getHours();
  if (h < 12) return ['Good morning', '☀️'];
  if (h < 17) return ['Good afternoon', '🌤️'];
  return ['Good evening', '🌙'];
}

function renderDashboard() {
  if (!ACTIVE_STUDENT_ID) return; // guard: no student loaded yet
  const _acct  = (typeof Auth !== 'undefined') && Auth.getActiveAccount();

  _renderNotifyOptIn();

  // Today's study plan (async, non-blocking)
  if (typeof Calendar !== 'undefined') {
    const grade = _acct?.grade || 5;
    Calendar.renderTodayPlan(ACTIVE_STUDENT_ID, grade);
  }
  const nameEl = document.getElementById('welcome-name');
  const greetEl = document.getElementById('dashboard-greeting');
  if (_acct) {
    if (nameEl) nameEl.textContent = _acct.name;
    if (greetEl) {
      const [greet, emoji] = _greeting();
      greetEl.innerHTML = `${greet}, <span id="welcome-name">${_acct.name}</span>! ${emoji}`;
    }
  }

  // Show "Subjects" button only when multiple subject packs are registered
  const subjectBtn = document.getElementById('btn-change-subject');
  if (subjectBtn) {
    const multiSubject = typeof SUBJECT_PACKS !== 'undefined' && SUBJECT_PACKS.length > 1;
    subjectBtn.classList.toggle('hidden', !multiSubject);
  }

  // Update tagline with student's actual grade + active subject
  const taglineEl = document.getElementById('dash-subject-tagline');
  if (taglineEl) {
    const { grade, name } = _activeSubjectLabel();
    taglineEl.textContent = `Ready to master Grade ${grade} ${name}? Let's go!`;
  }

  // Stats bar
  const acc = DB.stats.totalAttempted ? Math.round(DB.stats.totalCorrect / DB.stats.totalAttempted * 100) : 0;
  document.getElementById('dash-total-q').textContent = DB.stats.totalAttempted;
  document.getElementById('dash-accuracy').textContent = acc;
  document.getElementById('dash-exams').textContent = DB.stats.examCount;
  document.getElementById('streak-count').textContent = DB.stats.streak;

  // "Start here" nudge for brand-new students
  const startHere = document.getElementById('dash-start-here');
  if (startHere) startHere.classList.toggle('hidden', DB.stats.totalAttempted > 0);

  // Resume banner (unfinished session from a previous page load)
  _renderResumeBanner();

  // First-time hint for brand-new students
  _checkKidHints();

  // Assignments from parent (Supabase - async, non-blocking)
  _renderStudentAssignments(ACTIVE_STUDENT_ID);

  // Exam mode visibility (respect restrictions)
  const examCard = document.getElementById('btn-exam-mode');
  if (examCard) {
    const disabled = DB.restrictions?.examDisabled;
    examCard.style.opacity   = disabled ? '0.4' : '';
    examCard.style.pointerEvents = disabled ? 'none' : '';
    examCard.title = disabled ? 'Exam mode is currently locked by your parent' : '';
  }

  // Mastery grid (with lock overlay for restricted chapters)
  const locked = DB.restrictions?.lockedChapters || [];
  const mg = document.getElementById('mastery-grid');
  mg.innerHTML = CHAPTERS.map(ch => {
    const pct     = getChapterPct(ch.id);
    const col     = pct >= 80 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#3b82f6';
    const isLocked = locked.includes(ch.id);
    const click   = isLocked ? `toast('🔒 This chapter is locked by your parent.', 2000)` : `startChapterDirect('${ch.id}')`;
    const lockBadge = isLocked ? '<span class="text-xs ml-1" title="Locked">🔒</span>' : '';
    return `<div class="mastery-item ${isLocked ? 'opacity-50' : 'cursor-pointer hover:opacity-80'} transition-opacity" onclick="${click}">
      <div class="flex justify-between items-center mb-1">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${ch.icon} ${ch.name}${lockBadge}</span>
        <span class="text-xs font-bold text-gray-500 dark:text-gray-400">${pct}%</span>
      </div>
      <div class="mastery-bar-bg"><div class="mastery-bar-fill" style="width:${pct}%;background:${col}"></div></div>
    </div>`;
  }).join('');

  // Badges
  const bg = document.getElementById('badges-grid');
  bg.innerHTML = packBadges().map(b => {
    const earned = DB.badges.includes(b.id);
    return `<div class="badge-item ${earned ? '' : 'locked'}" title="${b.desc}">
      <span class="badge-icon">${b.icon}</span>
      <span class="badge-name">${b.name}</span>
    </div>`;
  }).join('');
}

// ── CHAPTER SELECT ─────────────────────────────
function renderChapterSelect() {
  const grid = document.getElementById('chapter-grid');
  const _borderColor = _SUBJECT_BORDER_COLOR[ACTIVE_PACK?.subject] || '';

  const _card = (ch) => {
    const pct = getChapterPct(ch.id);
    const c = (DB.chapters || {})[ch.id] || { attempted: 0, correct: 0 };
    const partLabel = ch.part != null ? `Part ${ch.part} · ` : '';
    const isEnr = !!ch.enrichment;
    const stars = c.attempted === 0 ? '<span class="text-gray-300 dark:text-gray-600 text-base tracking-tight">☆☆☆</span>'
      : pct >= 80 ? '<span class="text-amber-400 text-base tracking-tight" title="Mastered">★★★</span>'
      : pct >= 50 ? '<span class="text-base tracking-tight"><span class="text-amber-400">★★</span><span class="text-gray-300 dark:text-gray-600">☆</span></span>'
      : '<span class="text-base tracking-tight"><span class="text-amber-400">★</span><span class="text-gray-300 dark:text-gray-600">☆☆</span></span>';
    const borderStyle = _borderColor ? ` style="border-left:4px solid ${_borderColor}"` : '';
    return `<button class="chapter-card${isEnr ? ' enrichment' : ''}" onclick="startChapterDirect('${ch.id}')"${borderStyle}>
      ${isEnr ? '<span class="enr-badge">✨ BONUS</span>' : ''}
      <div class="text-3xl mb-2">${ch.icon}</div>
      <div class="font-bold text-gray-800 dark:text-white text-sm mb-1">${ch.name}</div>
      <div class="flex items-center justify-between mb-1.5">
        <div class="text-xs text-gray-500 dark:text-gray-400">${partLabel}${c.attempted} attempted</div>
        <div>${stars}</div>
      </div>
      <div class="mastery-bar-bg"><div class="mastery-bar-fill" style="width:${pct}%;background:${pct>=80?'#22c55e':pct>=50?'#f59e0b':'#3b82f6'}"></div></div>
      <div class="text-xs mt-1 font-medium" style="color:${pct>=80?'#22c55e':pct>=50?'#f59e0b':'#3b82f6'}">${pct >= 80 ? '🏆 ' : ''}${pct}% mastery</div>
    </button>`;
  };

  const regular    = CHAPTERS.filter(ch => !ch.enrichment);
  const enrichment = CHAPTERS.filter(ch =>  ch.enrichment);

  let html = regular.map(_card).join('');

  if (enrichment.length) {
    html += `<div class="col-span-full mt-4 mb-1">
      <div class="flex items-center gap-3">
        <div class="flex-1 h-px bg-amber-200 dark:bg-amber-800/40"></div>
        <span class="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">✨ Bonus Enrichment Topics</span>
        <div class="flex-1 h-px bg-amber-200 dark:bg-amber-800/40"></div>
      </div>
      <p class="text-center text-xs text-gray-400 dark:text-gray-500 mt-1">Derived from the syllabus - great for extra practice on specific themes</p>
    </div>`;
    html += enrichment.map(_card).join('');
  }

  grid.innerHTML = html;
}

window.startAssignment = function(assignId) {
  const a = (DB.assignments || []).find(x => x.id === assignId);
  if (!a) return;
  // Switch to the right subject first so CHAPTERS is in sync.
  // (5th activation site - not in the original A4 list, found while refactoring.)
  const pack = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [])
    .find(p => (p._chapters || p.chapters || []).some(ch => ch.id === a.chapterId));
  if (pack) activateSubjectPack(pack.id);
  startChapterDirect(a.chapterId, a.difficulty || 1);
};

function startChapterDirect(chapterId, forceDiff) {
  const locked = DB.restrictions?.lockedChapters || [];
  if (locked.includes(chapterId)) { toast('🔒 This chapter is locked by your parent.', 2000); return; }
  const maxDiff = DB.restrictions?.maxDifficulty ?? 4;

  // If questions for this chapter aren't loaded yet, wait for the active subject to load first
  const hasQs = STATIC_QUESTIONS.some(q => q && q.chapterId === chapterId);
  if (!hasQs && typeof QuestionLoader !== 'undefined' && typeof ACTIVE_PACK !== 'undefined' && ACTIVE_PACK) {
    toast('⏳ Loading questions…', 2000);
    QuestionLoader.loadSubject(ACTIVE_PACK.id)
      .then(() => startChapterDirect(chapterId, forceDiff))
      .catch(() => toast('Could not load questions. Please try again.', 3000));
    return;
  }

  // null diff = mixed mode (random across all levels up to parent cap)
  const diff = forceDiff ? Math.min(forceDiff, maxDiff) : null;

  S.practice.chapterId = chapterId;
  S.practice.difficulty = diff;
  S.practice.qs = [];
  S.practice.idx = 0;
  S.practice.session = { attempted: 0, correct: 0 };
  loadPracticeQuestion();
  showScreen('practice');
  const ch = CHAPTERS.find(c => c.id === chapterId);
  document.getElementById('practice-ch-name').textContent = ch ? `${ch.icon} ${ch.name}` : chapterId;
  _updateDiffBadge(null);

  // Disable video help button when no CHAPTER_HELP entry exists for this chapter
  const helpBtn = document.getElementById('help-btn');
  if (helpBtn) {
    const hasHelp = !!packHelp()[chapterId];
    helpBtn.disabled = !hasHelp;
    helpBtn.classList.toggle('opacity-40', !hasHelp);
    helpBtn.classList.toggle('cursor-not-allowed', !hasHelp);
    helpBtn.title = hasHelp ? '' : 'No video help available for this chapter yet';
  }

  setTimeout(() => { initScratchpad('scratchpad-practice'); }, 100);
}

// ── SEARCH PRACTICE LAUNCH ────────────────────
// Called by Search.practiceOwn / practiceOther with a pre-built question array
function startSearchPractice(questions, label) {
  if (!questions || !questions.length) { toast('No questions to practise. Try a different search.', 2500); return; }
  S.practice.chapterId  = 'search-results';
  S.practice.difficulty = null;
  S.practice.qs         = shuffle(questions.slice());
  S.practice.idx        = 0;
  S.practice.hintShown  = false;
  S.practice.session    = { attempted: 0, correct: 0 };
  S.practice.showAnswers = true;
  showScreen('practice');
  const nameEl = document.getElementById('practice-ch-name');
  if (nameEl) nameEl.textContent = `🔍 ${label || 'Search Results'}`;
  const backBtn = document.getElementById('practice-back-btn');
  if (backBtn) {
    backBtn.classList.remove('hidden');
    backBtn.onclick = () => showScreen('search');
  }
  _updateDiffBadge(S.practice.qs[0]);
  loadPracticeQuestion();
}

// ── ASSIGNMENT DIRECT LAUNCH ──────────────────
async function startAssignmentDirect(subjectId, chapterId, difficulty, showAnswers) {
  const pack = activateSubjectPack(subjectId);
  if (!pack) { toast('Subject coming soon! 📚', 2500); return; }

  // Load questions for this subject, then jump straight to practice
  if (typeof QuestionLoader !== 'undefined') {
    await QuestionLoader.loadSubject(pack.id);
  }

  S.practice.showAnswers = showAnswers !== false;
  startChapterDirect(chapterId, difficulty || null);
}

// ── EXAM MODE ─────────────────────────────────
document.getElementById('btn-exam-mode').addEventListener('click', () => {
  if (DB.restrictions?.examDisabled) { toast('🔒 Exam mode is locked by your parent.', 2000); return; }
  showScreen('exam-config');
});
document.getElementById('btn-chapter-mode').addEventListener('click', () => { showScreen('chapter-select'); });
document.getElementById('btn-syllabus-mode').addEventListener('click', () => showScreen('syllabus'));
document.getElementById('btn-weak-areas').addEventListener('click', startWeakAreaDrill);

document.getElementById('start-exam-btn').addEventListener('click', () => {
  const type = document.querySelector('input[name="exam-type"]:checked')?.value || 'full';
  if (type === 'print') { generatePrintablePaper(); return; }
  startExam(type);
});

function startExam(type) {
  const paper = assembleExamPaper(type);
  if (!paper.questions.length) {
    toast('🔒 Not enough unlocked chapters/questions to build an exam. Ask your parent to review chapter locks.', 4000);
    return;
  }
  S.exam.qs = paper.questions;
  S.exam.answers = {};
  S.exam.flagged = new Set();
  S.exam.idx = 0;
  S.exam.type = type;
  S.exam.duration = paper.durationMins * 60;
  S.exam.endTime = Date.now() + S.exam.duration * 1000;
  _requestWakeLock(); _lockPortrait();
  showScreen('exam');
  renderExamNavGrid();
  renderExamQuestion();
  startExamTimer();
  document.getElementById('exam-q-total').textContent = S.exam.qs.length;
}

function generatePrintablePaper() {
  const year = new Date().getFullYear();

  // Same restrictions startChapterDirect()/assembleExamPaper() enforce — a
  // locked chapter or a difficulty cap must hold for the printable paper too.
  const lockedChs = new Set(DB.restrictions?.lockedChapters || []);
  const maxDiff   = Math.min(4, Math.max(1, DB.restrictions?.maxDifficulty ?? 4));

  // Build pools: Section A (Q1-30 mixed difficulty), Section B (Q31-40 hardest)
  // Filter by the active subject's chapters so Science exam doesn't pull maths questions
  const _activeChs = new Set(CHAPTERS.filter(c => !lockedChs.has(c.id)).map(c => c.id));
  const _subjectQs = STATIC_QUESTIONS.filter(q => _activeChs.has(q.chapterId) && q.difficulty <= maxDiff);
  const secAPool = shuffle(_subjectQs.filter(q => q.difficulty <= Math.min(3, maxDiff)));
  // Section B is L4 word problems - only offer it once the cap actually allows L4.
  const secBPool = maxDiff >= 4 ? shuffle(_subjectQs.filter(q => q.difficulty === 4)) : [];

  if (!secAPool.length) {
    toast('🔒 Not enough unlocked chapters/questions to build a printable paper. Ask your parent to review chapter locks.', 4000);
    return;
  }

  // Ensure chapter spread for Section A
  const secA = [];
  const usedIds = new Set();
  const chapters = [...new Set(_subjectQs.map(q => q.chapterId))];
  // 1-2 questions per chapter first pass
  for (const ch of chapters) {
    const pick = secAPool.find(q => q.chapterId === ch && !usedIds.has(q.id));
    if (pick) { secA.push(pick); usedIds.add(pick.id); }
    if (secA.length >= 30) break;
  }
  // Fill remaining from pool, sorted easy→hard
  for (const q of secAPool) {
    if (secA.length >= 30) break;
    if (!usedIds.has(q.id)) { secA.push(q); usedIds.add(q.id); }
  }
  secA.sort((a, b) => a.difficulty - b.difficulty);

  // Section B: 10 L4 word problems from varied chapters
  const secB = [];
  const usedB = new Set();
  for (const ch of shuffle(chapters)) {
    const pick = secBPool.find(q => q.chapterId === ch && !usedB.has(q.id));
    if (pick) { secB.push(pick); usedB.add(pick.id); }
    if (secB.length >= 10) break;
  }
  // Top up if needed from L3
  if (secB.length < 10) {
    for (const q of shuffle(_subjectQs.filter(q => q.difficulty === 3))) {
      if (secB.length >= 10) break;
      if (!usedB.has(q.id) && !usedIds.has(q.id)) { secB.push(q); usedB.add(q.id); }
    }
  }

  const diffLabel = d => ['','⭐ Basic','⭐⭐ Medium','⭐⭐⭐ Hard','🏆 Challenge'][d] || '';
  const chName = id => (CHAPTERS.find(c => c.id === id) || {}).name || id;

  function renderQ(q, num, marks) {
    const stripHTML = s => s.replace(/<[^>]+>/g, '');
    let body = `<div class="q-text">${q.question}`;
    if (q.type === 'mcq' && q.options) {
      body += `<div class="mcq-opts">`;
      ['A','B','C','D'].forEach((ltr, i) => {
        body += `<span class="mcq-opt"><span class="bubble"></span> <b>${ltr}.</b> ${q.options[i] || ''}</span>`;
      });
      body += `</div>`;
    } else {
      body += `<div class="ans-line"><span class="ans-label">Answer:</span><span class="ans-blank"></span></div>`;
    }
    body += `</div>`;
    return `
      <tr class="q-row">
        <td class="q-num">${num}</td>
        <td class="q-body">
          <div class="q-meta">${chName(q.chapterId)}</div>
          ${body}
        </td>
        <td class="q-marks">${marks}</td>
      </tr>`;
  }

  const secARows = secA.slice(0, 30).map((q, i) => renderQ(q, i + 1, 2)).join('');
  const secBRows = secB.slice(0, 10).map((q, i) => renderQ(q, i + 31, 4)).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Grade ${_activeSubjectLabel().grade} ${_activeSubjectLabel().name} - Mock Exam ${year}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 10.5pt; color: #111; padding: 20px; background: #fff; }
  .no-print { background:#1d4ed8; color:#fff; border:none; padding:10px 22px; font-size:13pt; border-radius:6px; cursor:pointer; margin-bottom:18px; display:inline-block; }
  .no-print:hover { background:#1e40af; }
  @media print { .no-print { display:none; } body { padding:10px; } }

  .paper { max-width: 800px; margin: 0 auto; }
  .header-box { border: 2px solid #111; padding: 12px 16px; margin-bottom: 14px; text-align: center; }
  .header-box .ministry { font-size:8.5pt; letter-spacing:1px; text-transform:uppercase; color:#555; }
  .header-box .title { font-size:15pt; font-weight:bold; margin: 6px 0 2px; text-transform:uppercase; letter-spacing:1px; }
  .header-box .subtitle { font-size:11pt; font-weight:bold; }
  .header-box .meta { display:flex; justify-content:center; gap:30px; margin-top:8px; font-size:9.5pt; }

  .student-box { border: 1px solid #888; padding: 8px 12px; margin-bottom: 14px; display: flex; gap: 30px; font-size: 10pt; }
  .student-field { flex: 1; }
  .student-field .label { font-size: 8pt; color:#555; text-transform:uppercase; letter-spacing:.5px; }
  .student-field .line { border-bottom: 1px solid #555; min-width: 140px; height: 20px; margin-top:2px; }

  .instructions { background: #f8f8f8; border: 1px solid #ccc; padding: 8px 12px; margin-bottom:14px; font-size: 9.5pt; border-radius:4px; }
  .instructions b { display:block; margin-bottom:4px; }

  .section-head { background: #1e3a5f; color: #fff; padding: 6px 12px; font-size: 11pt; font-weight: bold; margin: 14px 0 4px; letter-spacing:.5px; }
  .section-sub { font-size: 9pt; background: #e8eef5; padding: 4px 12px; margin-bottom: 6px; color: #333; }

  table { width: 100%; border-collapse: collapse; }
  .q-row { border-bottom: 1px solid #ddd; }
  .q-row:last-child { border-bottom: 2px solid #888; }
  .q-num { width: 30px; font-weight: bold; padding: 6px 4px 6px 0; vertical-align:top; text-align:right; color:#1e3a5f; font-size:10pt; }
  .q-body { padding: 6px 8px; vertical-align:top; }
  .q-marks { width: 38px; text-align:center; padding: 6px 2px; vertical-align:top; border-left: 1px solid #bbb; font-size: 9.5pt; color:#555; }
  .q-meta { font-size: 7.5pt; color: #888; margin-bottom: 2px; text-transform:uppercase; letter-spacing:.4px; }
  .q-text { font-size: 10.5pt; line-height: 1.5; }

  .mcq-opts { display: flex; flex-wrap: wrap; gap: 8px 20px; margin-top: 6px; font-size:10pt; }
  .mcq-opt { display: flex; align-items: center; gap: 5px; min-width: 140px; }
  .bubble { width: 14px; height: 14px; border: 1.5px solid #333; border-radius: 50%; display:inline-block; flex-shrink:0; }

  .ans-line { display: flex; align-items: flex-end; gap: 6px; margin-top: 8px; }
  .ans-label { font-size: 9pt; color: #555; white-space: nowrap; }
  .ans-blank { flex: 1; max-width: 200px; border-bottom: 1px solid #444; height: 18px; }

  .marks-header { text-align:right; font-size:9pt; color:#555; padding: 3px 4px 3px 0; font-style:italic; }

  .total-row td { border-top: 2px solid #333; padding: 6px 4px; font-weight:bold; font-size:10.5pt; }
  .footer { margin-top: 20px; border-top: 1px solid #bbb; padding-top: 8px; font-size: 8.5pt; color: #777; text-align:center; }
</style>
</head>
<body>
<div class="paper">
  <button class="no-print" onclick="window.print()">🖨️ Print / Save as PDF</button>

  <div class="header-box">
    <div class="ministry">Republic of Mauritius - Ministry of Education</div>
    <div class="title">End-of-Year Assessment ${year}</div>
    <div class="subtitle">${_activeSubjectLabel().name} &nbsp;|&nbsp; Grade ${_activeSubjectLabel().grade}</div>
    <div class="meta">
      <span><b>Duration:</b> 1 hour 30 minutes</span>
      <span><b>Total Marks:</b> 100</span>
      <span><b>Date:</b> ______________________</span>
    </div>
  </div>

  <div class="student-box">
    <div class="student-field"><div class="label">Full Name</div><div class="line"></div></div>
    <div class="student-field"><div class="label">Class</div><div class="line"></div></div>
    <div class="student-field"><div class="label">Index Number</div><div class="line"></div></div>
  </div>

  <div class="instructions">
    <b>Instructions to candidates:</b>
    Write your name, class and index number in the spaces provided above.
    Answer <b>all</b> questions. For Section A MCQ questions, circle or shade the correct letter.
    For Section B, show all working clearly. Marks may be awarded for correct working.
  </div>

  <!-- SECTION A -->
  <div class="section-head">SECTION A &nbsp;-&nbsp; 60 Marks &nbsp;(Questions 1–30)</div>
  <div class="section-sub">Answer all 30 questions. Each question carries <b>2 marks</b>. Write your answer on the line provided. For MCQ, circle or fill in the correct letter.</div>
  <table>
    <tr><td></td><td></td><td class="marks-header">Marks</td></tr>
    ${secARows}
    <tr class="total-row"><td colspan="2" style="text-align:right;padding-right:8px;">Section A Total</td><td style="text-align:center;">/ 60</td></tr>
  </table>

  <!-- SECTION B -->
  <div class="section-head">SECTION B &nbsp;-&nbsp; 40 Marks &nbsp;(Questions 31–40)</div>
  <div class="section-sub">Answer all 10 questions. Each question carries <b>4 marks</b>. Show all working. Read each problem carefully.</div>
  <table>
    <tr><td></td><td></td><td class="marks-header">Marks</td></tr>
    ${secBRows}
    <tr class="total-row"><td colspan="2" style="text-align:right;padding-right:8px;">Section B Total</td><td style="text-align:center;">/ 40</td></tr>
  </table>

  <table style="margin-top:14px;">
    <tr class="total-row">
      <td style="text-align:right;padding-right:8px;border-top:2px solid #333;">GRAND TOTAL</td>
      <td style="text-align:center;border-top:2px solid #333;border-left:1px solid #bbb;width:38px;">/ 100</td>
    </tr>
  </table>

  <div class="footer">
    Generated by PSAC Exam Practice · MIE Mauritius Curriculum · psac-master &nbsp;|&nbsp;
    This is a practice paper - not an official MIE document.
  </div>
</div>
</body>
</html>`;

  const win = window.open('', '_blank');
  if (win) {
    win.document.write(html);
    win.document.close();
  } else {
    toast('⚠️ Please allow pop-ups to open the printable paper.', 4000);
  }
}

function startExamTimer() {
  clearInterval(S.exam.timer);
  S.exam.timer = setInterval(() => {
    const left = Math.max(0, Math.round((S.exam.endTime - Date.now()) / 1000));
    const m = Math.floor(left / 60), s = left % 60;
    const el = document.getElementById('exam-timer');
    el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    if (left <= 60) el.classList.add('timer-low'); else el.classList.remove('timer-low');
    if (left === 0) { clearInterval(S.exam.timer); submitExam(); }
  }, 1000);
}

function renderExamQuestion() {
  const q = S.exam.qs[S.exam.idx];
  if (!q) return;
  const ch = CHAPTERS.find(c => c.id === q.chapterId);
  const _l4 = (typeof ACTIVE_PACK !== 'undefined' && ACTIVE_PACK?.level4Label) || 'Challenge';
  const lvlText = ['','⭐ Basic','⭐⭐ Medium','⭐⭐⭐ Hard',`🏆 ${_l4}`][q.difficulty] || '';

  document.getElementById('exam-q-badge').textContent = `Q${S.exam.idx + 1}`;
  document.getElementById('exam-q-chapter').textContent = ch ? ch.name : '';
  document.getElementById('exam-q-level').textContent = lvlText;
  document.getElementById('exam-q-num').textContent = S.exam.idx + 1;
  document.getElementById('exam-q-text').innerHTML = q.question;
  _makeImgsZoomable(document.getElementById('exam-q-text'));
  _saveResume();
  document.getElementById('exam-hint-box').classList.add('hidden');

  const saved = S.exam.answers[S.exam.idx];
  renderAnswerArea(q, 'exam-answer-area', saved, false);

  // Update progress
  const pct = ((S.exam.idx) / S.exam.qs.length) * 100;
  document.getElementById('exam-progress-bar').style.width = pct + '%';

  // Nav
  document.getElementById('exam-prev-btn').disabled = S.exam.idx === 0;
  document.getElementById('exam-next-btn').textContent = S.exam.idx === S.exam.qs.length - 1 ? 'Review →' : 'Next →';
  updateNavGrid();

  const flagBtn = document.getElementById('exam-flag-btn');
  flagBtn.textContent = S.exam.flagged.has(S.exam.idx) ? '🚩 Flagged' : '🚩 Flag';
}

function renderExamNavGrid() {
  const grid = document.getElementById('exam-nav-grid');
  grid.innerHTML = S.exam.qs.map((_, i) => {
    let cls = 'nav-btn unanswered';
    if (S.exam.flagged.has(i)) cls = 'nav-btn flagged';
    else if (S.exam.answers[i] != null) cls = 'nav-btn answered';
    if (i === S.exam.idx) cls = 'nav-btn current';
    return `<button class="${cls}" onclick="examGoTo(${i})">${i+1}</button>`;
  }).join('');
}
function updateNavGrid() {
  const btns = document.querySelectorAll('#exam-nav-grid .nav-btn');
  btns.forEach((btn, i) => {
    btn.className = 'nav-btn ';
    if (S.exam.flagged.has(i)) btn.className += 'flagged';
    else if (S.exam.answers[i] != null) btn.className += 'answered';
    else btn.className += 'unanswered';
    if (i === S.exam.idx) btn.className = 'nav-btn current';
  });
}
window.examGoTo = (i) => { saveCurrentExamAnswer(); S.exam.idx = i; renderExamQuestion(); };

function saveCurrentExamAnswer() {
  const q = S.exam.qs[S.exam.idx];
  const ans = getSelectedAnswer('exam-answer-area', q?.type);
  if (ans != null && ans !== '') S.exam.answers[S.exam.idx] = ans;
}

document.getElementById('exam-prev-btn').addEventListener('click', () => {
  saveCurrentExamAnswer(); if (S.exam.idx > 0) { S.exam.idx--; renderExamQuestion(); }
});
document.getElementById('exam-next-btn').addEventListener('click', () => {
  saveCurrentExamAnswer();
  if (S.exam.idx < S.exam.qs.length - 1) { S.exam.idx++; renderExamQuestion(); }
});
document.getElementById('exam-flag-btn').addEventListener('click', () => {
  S.exam.flagged.has(S.exam.idx) ? S.exam.flagged.delete(S.exam.idx) : S.exam.flagged.add(S.exam.idx);
  document.getElementById('exam-flag-btn').textContent = S.exam.flagged.has(S.exam.idx) ? '🚩 Flagged' : '🚩 Flag';
  updateNavGrid();
});
document.getElementById('exam-hint-btn').addEventListener('click', () => {
  const q = S.exam.qs[S.exam.idx];
  document.getElementById('exam-hint-text').textContent = q?.hint || 'No hint available.';
  document.getElementById('exam-hint-box').classList.toggle('hidden');
});
document.getElementById('exit-exam-btn').addEventListener('click', () => {
  _confirmModal('Exit this exam? All your answers will be lost.', () => {
    _clearResume();
    clearInterval(S.exam.timer);
    S.exam.qs = []; S.exam.answers = {}; S.exam.flagged = new Set();
    showScreen('dashboard');
  }, { icon: '🚪', okLabel: 'Yes, Exit' });
});
document.getElementById('submit-exam-btn').addEventListener('click', () => {
  _confirmModal("Submit your exam now? You can't go back after submission.", submitExam, { icon: '📝', okLabel: 'Submit Exam', danger: false });
});

function submitExam() {
  _clearResume();
  _releaseWakeLock(); _unlockOrientation();
  clearInterval(S.exam.timer);
  saveCurrentExamAnswer();
  const timeTaken = Math.round((S.exam.duration - Math.max(0, (S.exam.endTime - Date.now()) / 1000)));
  let correct = 0;
  const chapterStats = {};
  S.exam.qs.forEach((q, i) => {
    if (!chapterStats[q.chapterId]) chapterStats[q.chapterId] = { name: CHAPTERS.find(c=>c.id===q.chapterId)?.name||q.chapterId, total: 0, correct: 0 };
    chapterStats[q.chapterId].total++;
    const ans = S.exam.answers[i];
    const ok = ans != null && checkAnswer(q, ans);
    if (ok) { correct++; chapterStats[q.chapterId].correct++; }
    recordAnswer(q.chapterId, ok);
  });
  const total = S.exam.qs.length;
  const pct = Math.round(correct / total * 100);
  DB.stats.examCount++;
  if (pct > DB.stats.bestScore) DB.stats.bestScore = pct;
  DB.examHistory.unshift({ date: new Date().toLocaleDateString(), pct, correct, total, type: S.exam.type || 'exam' });
  if (DB.examHistory.length > 20) DB.examHistory.pop();
  save(DB, true);
  if (pct >= 80) launchConfetti();
  renderResults(correct, total, pct, timeTaken, chapterStats);
  showScreen('results');
  const _shareBtn = document.getElementById('share-result-btn');
  if (_shareBtn) _shareBtn.classList.toggle('hidden', !navigator.share && !navigator.clipboard);
}

function renderResults(correct, total, pct, timeTaken, chapterStats) {
  const banner = document.getElementById('results-banner');
  const emoji = pct>=90?'🏆':pct>=70?'🎉':pct>=50?'👍':'💪';
  const grade = pct>=90?'Outstanding - A+':pct>=80?'Excellent - A':pct>=70?'Good - B':pct>=60?'Satisfactory - C':pct>=50?'Pass - D':'Needs more practice - Try again!';
  const cls = pct>=70?'banner-a':pct>=50?'banner-b':pct>=30?'banner-c':'banner-f';
  banner.className = `rounded-2xl p-8 text-white text-center shadow-xl ${cls}`;
  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-score').textContent = `${pct}%`;
  document.getElementById('result-grade').textContent = grade;
  const m = Math.floor(timeTaken/60), s = timeTaken%60;
  document.getElementById('result-details').textContent = `${correct} / ${total} correct · ${m}m ${s}s`;

  // Chapter breakdown
  document.getElementById('results-chapter-breakdown').innerHTML = Object.entries(chapterStats).map(([id, st]) => {
    const p = Math.round(st.correct/st.total*100);
    const col = p>=80?'#22c55e':p>=50?'#f59e0b':'#ef4444';
    return `<div>
      <div class="flex justify-between text-sm mb-1">
        <span class="text-gray-700 dark:text-gray-300">${st.name}</span>
        <span class="font-bold" style="color:${col}">${st.correct}/${st.total} (${p}%)</span>
      </div>
      <div class="mastery-bar-bg"><div class="mastery-bar-fill" style="width:${p}%;background:${col}"></div></div>
    </div>`;
  }).join('');

  // Question review
  document.getElementById('results-review').innerHTML = S.exam.qs.map((q, i) => {
    const ua = S.exam.answers[i];
    const ok = ua != null && checkAnswer(q, ua);
    const ch = CHAPTERS.find(c=>c.id===q.chapterId);
    return `<div class="border-l-4 ${ok?'border-green-400':'border-red-400'} pl-4 py-2">
      <div class="flex items-start gap-2">
        <span class="text-lg shrink-0">${ok?'✅':'❌'}</span>
        <div class="flex-1 text-sm">
          <div class="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Q${i+1} · ${ch?.name||''}</div>
          <div class="font-medium text-gray-800 dark:text-gray-200">${q.question}</div>
          ${!ok?`<div class="mt-1 text-red-600 dark:text-red-400">Your answer: ${ua||'(not answered)'}</div>`:''}
          <div class="mt-1 text-green-600 dark:text-green-400 font-medium">✓ Correct: ${q.answer}</div>
          <div class="mt-1 text-gray-500 dark:text-gray-400 text-xs">${q.explanation}</div>
        </div>
      </div>
    </div>`;
  }).join('');
}

document.getElementById('new-exam-btn').addEventListener('click', () => showScreen('exam-config'));
document.getElementById('results-home-btn').addEventListener('click', () => showScreen('dashboard'));

// ── PRACTICE MODE ─────────────────────────────
document.getElementById('practice-back-btn').addEventListener('click', () => {
  _clearResume();
  showScreen('chapter-select');
});

function _updateDiffBadge(q) {
  const badge = document.getElementById('practice-diff-badge');
  const label = document.getElementById('practice-level-label');
  const desc  = document.getElementById('practice-level-desc');
  const card  = document.getElementById('practice-level-card');
  const noDiff = typeof ACTIVE_PACK !== 'undefined' && ACTIVE_PACK?.noDifficulty;

  if (card) card.classList.toggle('hidden', !!noDiff);
  if (!badge) return;

  if (noDiff) {
    badge.className = 'chip gray text-xs';
    badge.textContent = '📋 Practice';
    return;
  }

  if (S.practice.difficulty === null && !q) {
    badge.className = 'chip gray text-xs';
    badge.textContent = '🎲 Mixed';
    if (label) label.textContent = 'Mixed Practice';
    if (desc)  desc.textContent  = 'Questions are drawn from all levels available for this chapter.';
    return;
  }

  const l4Label = (typeof ACTIVE_PACK !== 'undefined' && ACTIVE_PACK?.level4Label) || 'Challenge';
  const LEVELS = {
    1: { cls: 'chip green text-xs',  badge: '⭐ Basic',    lab: '⭐ Level 1 - Basic',           dsc: 'Recall and recognition. Great for building confidence.' },
    2: { cls: 'chip blue text-xs',   badge: '⭐⭐ Medium',  lab: '⭐⭐ Level 2 - Medium',         dsc: 'Application questions. Tests understanding in context.' },
    3: { cls: 'chip amber text-xs',  badge: '⭐⭐⭐ Hard',  lab: '⭐⭐⭐ Level 3 - Hard',         dsc: 'Multi-step reasoning. Challenges deeper understanding.' },
    4: { cls: 'chip purple text-xs', badge: `🏆 ${l4Label}`, lab: `🏆 Level 4 - ${l4Label}`, dsc: 'Extended problems requiring full working out. PSAC exam style.' },
  };
  const lv = LEVELS[q?.difficulty] || LEVELS[S.practice.difficulty] || LEVELS[1];
  badge.className = lv.cls;
  badge.textContent = lv.badge;
  if (label) label.textContent = lv.lab;
  if (desc)  desc.textContent  = lv.dsc;
}

function loadPracticeQuestion() {
  if (!S.practice.qs.length || S.practice.idx >= S.practice.qs.length) {
    if (S.practice.difficulty !== null) {
      // Specific difficulty assigned (parent assignment)
      S.practice.qs = getQuestionsForChapter(S.practice.chapterId, S.practice.difficulty, 20);
    } else if (S.practice.chapterId) {
      // Mixed mode - random across all levels up to parent cap
      const _maxD = DB.restrictions?.maxDifficulty ?? 4;
      S.practice.qs = getMixedQuestions(S.practice.chapterId, _maxD, 20);
    }
    S.practice.idx = 0;
  }
  const q = S.practice.qs[S.practice.idx];
  if (!q || !q.question) {
    if (S.practice.idx < S.practice.qs.length - 1) { S.practice.idx++; loadPracticeQuestion(); return; }
    // No questions available - clear stale DOM so previous subject's content isn't shown
    const _qt = document.getElementById('practice-q-text');
    if (_qt) _qt.innerHTML = '';
    const _qc = document.getElementById('practice-q-counter');
    if (_qc) _qc.textContent = '';
    return;
  }

  // Progress bar
  const _pbar = document.getElementById('practice-progress-bar');
  if (_pbar && S.practice.qs.length > 1) {
    const _pct = Math.round(S.practice.idx / S.practice.qs.length * 100);
    _pbar.style.width = _pct + '%';
  }

  // Question entrance animation
  const _qText = document.getElementById('practice-q-text');
  if (_qText) {
    _qText.classList.remove('question-enter');
    void _qText.offsetWidth; // force reflow
    _qText.innerHTML = q.question;
    _qText.classList.add('question-enter');
  } else {
    document.getElementById('practice-q-text').innerHTML = q.question;
  }
  _makeImgsZoomable(document.getElementById('practice-q-text'));
  _saveResume();

  document.getElementById('practice-hint-box').classList.add('hidden');
  S.practice.hintShown = false;
  S.practice.hintIdx   = 0;
  const _hintBtn = document.getElementById('practice-hint-btn');
  if (_hintBtn) { _hintBtn.disabled = false; _hintBtn.classList.remove('opacity-50'); }
  const _hintBadge = document.getElementById('hint-count-badge');
  if (_hintBadge) _hintBadge.textContent = '3';
  document.getElementById('practice-q-counter').textContent =
    `Question ${S.practice.idx + 1} of ${S.practice.qs.length}`;
  document.getElementById('practice-feedback').classList.add('hidden');
  document.getElementById('practice-submit-btn').classList.remove('hidden');
  document.getElementById('practice-skip-btn').classList.remove('hidden');
  document.getElementById('practice-next-btn').classList.add('hidden');
  renderAnswerArea(q, 'practice-answer-area', null, false);
  _updateDiffBadge(q);
  updateSessionStats();
}

function _buildHints(q) {
  const ch = CHAPTERS.find(c => c.id === q.chapterId);
  const h1 = q.hint || `Think about what you know about ${ch ? ch.name : 'this topic'}.`;
  let h2 = '';
  if (q.explanation) {
    const plain = q.explanation.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const firstDot = plain.search(/[.!?]/);
    h2 = firstDot > 0 ? plain.slice(0, firstDot + 1) : plain.slice(0, 120);
  }
  h2 = h2 || 'Re-read the question slowly and identify the key numbers.';
  const h3 = q.type === 'mcq'
    ? 'Try eliminating options you know are wrong - that narrows it down quickly.'
    : `The answer is <b>${q.answer}</b> - try to understand why before moving on.`;
  return [h1, h2, h3];
}

document.getElementById('practice-hint-btn').addEventListener('click', () => {
  const q = S.practice.qs[S.practice.idx];
  if (!q) return;
  const MAX_HINTS = 3;
  if ((S.practice.hintIdx || 0) >= MAX_HINTS) return;
  S.practice.hintIdx = (S.practice.hintIdx || 0) + 1;
  S.practice.hintShown = true;

  const hints   = _buildHints(q);
  const hint    = hints[S.practice.hintIdx - 1] || 'Think carefully about the problem.';
  const numEl   = document.getElementById('practice-hint-num');
  const remEl   = document.getElementById('practice-hints-remaining');
  const txtEl   = document.getElementById('practice-hint-text');
  const badgeEl = document.getElementById('hint-count-badge');
  const box     = document.getElementById('practice-hint-box');

  if (numEl)   numEl.textContent  = S.practice.hintIdx;
  if (txtEl)   txtEl.innerHTML    = hint;
  const left = MAX_HINTS - S.practice.hintIdx;
  if (remEl)   remEl.textContent  = left > 0 ? `${left} more hint${left > 1 ? 's' : ''} available` : 'No more hints';
  if (badgeEl) badgeEl.textContent = left > 0 ? left : '✓';
  box.classList.remove('hidden');

  if (S.practice.hintIdx >= MAX_HINTS) {
    const btn = document.getElementById('practice-hint-btn');
    if (btn) { btn.disabled = true; btn.classList.add('opacity-50'); }
  }
});

document.getElementById('practice-submit-btn').addEventListener('click', practiceSubmit);
document.getElementById('practice-next-btn').addEventListener('click', practiceNext);
document.getElementById('practice-skip-btn').addEventListener('click', practiceSkip);

function practiceSubmit() {
  const q = S.practice.qs[S.practice.idx];
  const ua = getSelectedAnswer('practice-answer-area', q?.type);
  if (q?.type !== 'symmetry' && !ua) { toast('Please answer the question first! 📝'); return; }
  const ok = checkAnswer(q, ua);

  // ── TEST MODE: record silently, advance immediately ──────────────
  if (ASSIGNMENT_IS_TEST) {
    ASSIGNMENT_TEST_ANSWERS.push({
      question:      q.question,
      userAnswer:    ua || '-',
      correctAnswer: q.answer,
      correct:       ok,
      explanation:   q.explanation || '',
    });
    ASSIGNMENT_SCORE.attempted++;
    if (ok) ASSIGNMENT_SCORE.correct++;
    S.practice.session.attempted++;
    if (ok) S.practice.session.correct++;
    updateSessionStats();

    const isLast = S.practice.idx >= S.practice.qs.length - 1;
    if (isLast) {
      _submitTestAssignment();
    } else {
      S.practice.idx++;
      loadPracticeQuestion();
    }
    return;
  }
  // ── PRACTICE MODE (existing behaviour) ──────────────────────────

  // Combo + sounds (before rendering so float appears at correct time)
  if (ok) {
    _comboStreak++;
    _floatXP(XP_PER_ANSWER);
    _playSound('correct'); _haptic('correct');
    _showCombo(_comboStreak);
  } else {
    _comboStreak = 0;
    _playSound('wrong'); _haptic('wrong');
  }

  // show correct/wrong state
  renderAnswerArea(q, 'practice-answer-area', ua, true);

  // Feedback
  const fb = document.getElementById('practice-feedback');
  fb.className = `mb-4 p-4 rounded-xl ${ok ? 'feedback-correct' : 'feedback-wrong'}`;
  if (S.practice.showAnswers === false) {
    fb.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-2xl">${ok ? '🎉' : '❌'}</span>
        <div class="font-bold">${ok ? 'Correct! Well done!' : 'Not quite - keep trying!'}</div>
      </div>`;
  } else {
    const answerLine = q.type === 'symmetry'
      ? 'The correct cells are shown in <b style="color:#22c55e">green</b>. Missed cells in orange, wrong selections in red.'
      : `Not quite. Correct answer: <b>${q.answer}</b>`;
    fb.innerHTML = `
      <div class="flex items-start gap-3">
        <span class="text-2xl">${ok ? '🎉' : '💡'}</span>
        <div>
          <div class="font-bold mb-1">${ok ? 'Correct! Well done!' : answerLine}</div>
          <div class="text-sm">${q.explanation}</div>
        </div>
      </div>`;
  }
  // Entrance animation - remove old class first, force reflow, re-add
  fb.classList.remove('hidden', 'feedback-pop', 'feedback-shake');
  void fb.offsetWidth;
  fb.classList.add(ok ? 'feedback-pop' : 'feedback-shake');

  // Stats
  S.practice.session.attempted++;
  if (ok) S.practice.session.correct++;
  recordAnswer(S.practice.chapterId, ok);
  updateSessionStats();

  document.getElementById('practice-submit-btn').classList.add('hidden');
  document.getElementById('practice-skip-btn').classList.add('hidden');
  document.getElementById('practice-next-btn').classList.remove('hidden');
}

function practiceSkip() {
  const q = S.practice.qs[S.practice.idx];
  if (!q) return;
  _comboStreak = 0;
  _playSound('wrong'); _haptic('wrong');
  renderAnswerArea(q, 'practice-answer-area', '', true);
  const fb = document.getElementById('practice-feedback');
  fb.className = 'mb-4 p-4 rounded-xl feedback-wrong';
  if (S.practice.showAnswers === false) {
    fb.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-2xl">⏭️</span>
        <div class="font-bold">Skipped - keep going!</div>
      </div>`;
  } else {
    fb.innerHTML = `
      <div class="flex items-start gap-3">
        <span class="text-2xl">💡</span>
        <div>
          <div class="font-bold mb-1">Answer: <span class="text-green-600 dark:text-green-400">${q.answer}</span></div>
          <div class="text-sm">${q.explanation}</div>
        </div>
      </div>`;
  }
  fb.classList.remove('hidden', 'feedback-pop', 'feedback-shake');
  void fb.offsetWidth;
  fb.classList.add('feedback-shake');
  S.practice.session.attempted++;
  recordAnswer(S.practice.chapterId, false);
  updateSessionStats();
  document.getElementById('practice-submit-btn').classList.add('hidden');
  document.getElementById('practice-skip-btn').classList.add('hidden');
  document.getElementById('practice-next-btn').classList.remove('hidden');
}

function _showRoundComplete() {
  const { attempted, correct } = S.practice.session;
  const acc = attempted ? Math.round(correct / attempted * 100) : 0;
  const stars = acc >= 80 ? '⭐⭐⭐' : acc >= 50 ? '⭐⭐' : '⭐';
  const chName = CHAPTERS.find(c => c.id === S.practice.chapterId)?.name || 'Practice';
  const xpEarned = correct * XP_PER_ANSWER;
  const el = id => document.getElementById(id);
  if (el('rc-stars'))    el('rc-stars').textContent    = stars;
  if (el('rc-chapter'))  el('rc-chapter').textContent  = chName;
  if (el('rc-score'))    el('rc-score').textContent    = `${correct}/${attempted}`;
  if (el('rc-accuracy')) el('rc-accuracy').textContent = `${acc}%`;
  if (el('rc-xp'))       el('rc-xp').textContent       = `+${xpEarned}`;
  document.getElementById('modal-round-complete')?.classList.remove('hidden');
  _haptic('levelup');
}

function _roundCompleteNext() {
  document.getElementById('modal-round-complete')?.classList.add('hidden');
  S.practice.session = { attempted: 0, correct: 0 };
  if (S.practice.difficulty !== null) {
    S.practice.qs = getQuestionsForChapter(S.practice.chapterId, S.practice.difficulty, 20);
  } else if (S.practice.chapterId) {
    const _maxD = DB.restrictions?.maxDifficulty ?? 4;
    S.practice.qs = getMixedQuestions(S.practice.chapterId, _maxD, 20);
  }
  S.practice.idx = 0;
  loadPracticeQuestion();
}

function _roundCompleteBack() {
  document.getElementById('modal-round-complete')?.classList.add('hidden');
  showScreen('chapter-select');
}

function practiceNext() {
  S.practice.idx++;
  if (S.practice.idx >= S.practice.qs.length) {
    if (ASSIGNMENT_MODE) {
      showAssignmentComplete();
      return;
    }
    _showRoundComplete();
    return;
  }
  loadPracticeQuestion();
}

// ── ASSIGNMENT MODE FUNCTIONS ─────────────────
function renderAssignmentEntrance(config) {
  ASSIGNMENT_CONFIG = config;
  const chNames = (config.chapters || []).map(cid => {
    const ch = CHAPTERS.find(c => c.id === cid);
    return ch ? `${ch.icon} ${ch.name}` : cid;
  });
  const diffLabel = !config.difficulty ? 'Mixed levels' : `Level ${config.difficulty}`;
  const el = id => document.getElementById(id);
  if (el('assign-title'))  el('assign-title').textContent  = config.label || 'Assignment';
  if (el('assign-meta'))   el('assign-meta').textContent   =
    `${chNames.join(', ') || 'All chapters'} · ${diffLabel} · ${config.count || 10} questions`;
  if (el('assign-random-badge')) el('assign-random-badge').classList.toggle('hidden', !config.random);
}

window.startAssignmentPractice = function() {
  const nameInput = document.getElementById('assign-student-name');
  const name = (nameInput?.value || '').trim();
  if (!name) { toast('Please enter your name first! 📝', 2000); return; }

  const cfg = ASSIGNMENT_CONFIG;

  // Block / allow re-attempt for test-mode assignments
  if (cfg.mode === 'test' && typeof TeacherMode !== 'undefined') {
    const attempts = TeacherMode.getAttemptCount(cfg.id, name);
    if (attempts > 0) {
      const hasRetry = TeacherMode.hasRetry(cfg.id, name);
      if (hasRetry) {
        toast('🔄 Retry granted by your teacher. Good luck!', 2500);
      } else {
        toast('You already submitted this test. Ask your teacher if you need to retry.', 4000);
        return;
      }
    }
  }

  ASSIGNMENT_STUDENT_NAME = name;
  ASSIGNMENT_MODE         = true;
  ASSIGNMENT_IS_TEST      = cfg.mode === 'test';
  ASSIGNMENT_SCORE        = { attempted: 0, correct: 0 };
  ASSIGNMENT_TEST_ANSWERS = [];

  // Reset breakdown div so stale test results don't appear in practice mode
  const _bd = document.getElementById('asgn-complete-breakdown');
  if (_bd) { _bd.innerHTML = ''; _bd.classList.add('hidden'); }

  // Build question pool from config
  let pool = STATIC_QUESTIONS;
  if (cfg.chapters && cfg.chapters.length) pool = pool.filter(q => cfg.chapters.includes(q.chapterId));
  if (cfg.difficulty)                      pool = pool.filter(q => q.difficulty === cfg.difficulty);
  if (cfg.random !== false)                pool = shuffle([...pool]);
  const questions = pool.slice(0, cfg.count || 10);

  if (!questions.length) {
    toast('No questions available for this assignment. Please contact your teacher.', 4000);
    ASSIGNMENT_MODE = false;
    return;
  }

  // Load into practice state
  S.practice.chapterId = cfg.chapters?.[0] || 'assignment';
  S.practice.difficulty = cfg.difficulty || null;
  S.practice.qs         = questions;
  S.practice.idx        = 0;
  S.practice.hintShown  = false;
  S.practice.session    = { attempted: 0, correct: 0 };

  showScreen('practice');
  document.getElementById('practice-ch-name').textContent = `📋 ${cfg.label || 'Assignment'}`;
  document.getElementById('practice-back-btn').classList.add('hidden');
  document.getElementById('difficulty-btns')?.classList.add('hidden');
  _updateDiffBadge(null);

  if (ASSIGNMENT_IS_TEST) {
    document.getElementById('practice-hint-btn').classList.add('hidden');
    document.getElementById('practice-submit-btn').textContent = '→ Submit Answer';
  }

  loadPracticeQuestion();
};

function _submitTestAssignment() {
  const { attempted, correct } = ASSIGNMENT_SCORE;
  const pct = attempted ? Math.round(correct / attempted * 100) : 0;

  // Save result to teacher dashboard
  if (typeof TeacherMode !== 'undefined' && ASSIGNMENT_CONFIG?.id) {
    TeacherMode.saveResult(ASSIGNMENT_CONFIG.id, ASSIGNMENT_STUDENT_NAME, {
      score:   correct,
      total:   attempted,
      pct,
      answers: ASSIGNMENT_TEST_ANSWERS.map(a => ({
        question:      a.question,
        userAnswer:    a.userAnswer,
        correctAnswer: a.correctAnswer,
        correct:       a.correct,
      })),
      timestamp: Date.now(),
    });
  }

  // Render per-question breakdown on the complete screen
  const breakdown = document.getElementById('asgn-complete-breakdown');
  if (breakdown) {
    breakdown.innerHTML = ASSIGNMENT_TEST_ANSWERS.map((a, i) => `
      <div class="flex items-start gap-3 p-3 rounded-xl text-sm mb-2
        ${a.correct ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}">
        <span class="text-base shrink-0 mt-0.5">${a.correct ? '✅' : '❌'}</span>
        <div class="flex-1 min-w-0">
          <div class="text-gray-800 dark:text-white font-medium mb-1">Q${i + 1}: ${a.question}</div>
          ${!a.correct
            ? `<div class="text-xs text-red-600 dark:text-red-400 mb-0.5">Your answer: <b>${a.userAnswer}</b> &nbsp;·&nbsp; Correct: <b>${a.correctAnswer}</b></div>`
            : ''}
          <div class="text-xs text-gray-500 dark:text-gray-400">${a.explanation}</div>
        </div>
      </div>`).join('');
    breakdown.classList.remove('hidden');
  }

  ASSIGNMENT_IS_TEST = false;
  showAssignmentComplete();
}

function showAssignmentComplete() {
  const { attempted, correct } = ASSIGNMENT_SCORE;
  const pct   = attempted ? Math.round(correct / attempted * 100) : 0;
  const grade = pct >= 80 ? '🌟 Excellent!' : pct >= 60 ? '👍 Good job!' : pct >= 40 ? '📚 Keep practising!' : '💪 You can do it!';
  const el    = id => document.getElementById(id);

  // Notify parent by email (fire-and-forget, only on Netlify)
  if (location.protocol !== 'file:' && ASSIGNMENT_CONFIG) {
    const sess = typeof Store !== 'undefined' && Store.getStudentSession();
    if (sess?.id) {
      fetch('/.netlify/functions/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Student-Id': sess.id },
        body: JSON.stringify({
          studentId:       sess.id,
          assignmentLabel: ASSIGNMENT_CONFIG.label || 'Assignment',
          score:           correct,
          total:           attempted,
          pct,
        }),
      }).catch(() => {});
    }
  }

  if (el('asgn-complete-name'))  el('asgn-complete-name').textContent  = ASSIGNMENT_STUDENT_NAME;
  if (el('asgn-complete-score')) el('asgn-complete-score').textContent = `${correct} / ${attempted}`;
  if (el('asgn-complete-pct'))   el('asgn-complete-pct').textContent   = `${pct}%`;
  if (el('asgn-complete-grade')) el('asgn-complete-grade').textContent = grade;
  if (el('asgn-complete-title')) el('asgn-complete-title').textContent = ASSIGNMENT_CONFIG?.label || 'Assignment';

  ASSIGNMENT_MODE    = false;
  ASSIGNMENT_IS_TEST = false;

  // Restore practice screen
  document.getElementById('practice-back-btn')?.classList.remove('hidden');
  document.getElementById('difficulty-btns')?.classList.remove('hidden');
  document.getElementById('practice-hint-btn')?.classList.remove('hidden');
  const submitBtn = document.getElementById('practice-submit-btn');
  if (submitBtn) submitBtn.textContent = '✅ Check Answer';

  if (pct >= 80) launchConfetti();
  showScreen('assignment-complete');
}

function updateSessionStats() {
  const { attempted, correct } = S.practice.session;
  document.getElementById('sess-attempted').textContent = attempted;
  document.getElementById('sess-correct').textContent = correct;
  document.getElementById('sess-acc').textContent = attempted ? Math.round(correct/attempted*100)+'%' : '-';
}

// ── ANALYTICS ─────────────────────────────────
document.getElementById('analytics-btn').addEventListener('click', () => showScreen('analytics'));

function renderAnalytics() {
  const acc = DB.stats.totalAttempted ? Math.round(DB.stats.totalCorrect / DB.stats.totalAttempted * 100) : 0;
  document.getElementById('a-total').textContent = DB.stats.totalAttempted;
  document.getElementById('a-acc').textContent   = acc + '%';
  document.getElementById('a-streak').textContent = DB.stats.streak + '🔥';
  document.getElementById('a-exams').textContent  = DB.stats.examCount;

  const chapEl = document.getElementById('analytics-chapters');
  if (chapEl) {
    const grade = (typeof SELECTED_GRADE !== 'undefined' && SELECTED_GRADE) || 5;
    const packs = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [])
      .filter(p => p.grade === grade && !p.comingSoon);

    if (!packs.length) {
      // Fallback: active subject only (pre-login or no packs loaded yet)
      chapEl.innerHTML = CHAPTERS.map(ch => {
        const c = (DB.chapters || {})[ch.id] || { attempted: 0, correct: 0 };
        const p = c.attempted ? Math.round(c.correct / c.attempted * 100) : 0;
        const col = p >= 80 ? '#22c55e' : p >= 50 ? '#f59e0b' : '#ef4444';
        return `<div class="flex items-center gap-2 py-1.5">
          <span class="text-sm text-gray-700 dark:text-gray-300 flex-1 truncate">${ch.icon} ${ch.name}</span>
          <span class="text-xs font-bold shrink-0" style="color:${col}">${c.correct}/${c.attempted} &bull; ${p}%</span>
          <div class="w-20 shrink-0"><div class="mastery-bar-bg"><div class="mastery-bar-fill" style="width:${p}%;background:${col}"></div></div></div>
        </div>`;
      }).join('');
    } else {
      chapEl.innerHTML = packs.map(pack => {
        const chs = pack._chapters || pack.chapters || [];
        let sAttempted = 0, sCorrect = 0;
        chs.forEach(ch => {
          const c = (DB.chapters || {})[ch.id] || {};
          sAttempted += c.attempted || 0;
          sCorrect   += c.correct   || 0;
        });
        const sPct = sAttempted ? Math.round(sCorrect / sAttempted * 100) : 0;
        const sCol = !sAttempted ? '#94a3b8' : sPct >= 80 ? '#22c55e' : sPct >= 50 ? '#f59e0b' : '#ef4444';

        const chRows = chs.map(ch => {
          const c   = (DB.chapters || {})[ch.id] || { attempted: 0, correct: 0 };
          const p   = c.attempted ? Math.round(c.correct / c.attempted * 100) : 0;
          const col = !c.attempted ? '#94a3b8' : p >= 80 ? '#22c55e' : p >= 50 ? '#f59e0b' : '#ef4444';
          const badge = !c.attempted
            ? '<span class="text-xs text-gray-400 dark:text-gray-500 shrink-0">not started</span>'
            : `<span class="text-xs font-bold shrink-0" style="color:${col}">${c.correct}/${c.attempted} &bull; ${p}%</span>`;
          return `<div class="flex items-center gap-2 py-1.5">
            <span class="text-sm text-gray-600 dark:text-gray-300 flex-1 min-w-0 truncate">${ch.icon || '📖'} ${ch.name}${ch.enrichment ? ' <span class="text-amber-400 text-[10px]">✨</span>' : ''}</span>
            ${badge}
            <div class="w-16 shrink-0"><div class="mastery-bar-bg"><div class="mastery-bar-fill" style="width:${p}%;background:${col}"></div></div></div>
          </div>`;
        }).join('');

        return `<div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
          <button onclick="var b=this.nextElementSibling;b.classList.toggle('hidden');this.querySelector('.chev').style.transform=b.classList.contains('hidden')?'':'rotate(180deg)'"
            class="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors text-left">
            <span class="text-xl select-none">${pack.icon}</span>
            <span class="flex-1 font-semibold text-sm text-gray-800 dark:text-white">${pack.name}</span>
            ${!sAttempted
              ? '<span class="text-xs text-gray-400 dark:text-gray-500">not started yet</span>'
              : `<span class="text-xs font-bold" style="color:${sCol}">${sCorrect}/${sAttempted} &bull; ${sPct}%</span>`}
            <span class="chev text-gray-400 text-xs transition-transform" style="${sAttempted ? 'transform:rotate(180deg)' : ''}">▼</span>
          </button>
          <div class="${sAttempted ? '' : 'hidden'} px-4 py-1 divide-y divide-gray-100 dark:divide-gray-700/50">
            ${chRows}
          </div>
        </div>`;
      }).join('<div class="mb-2"></div>');
    }
  }

  const hist = document.getElementById('exam-history-list');
  if (!hist) return;
  if (!DB.examHistory.length) {
    hist.innerHTML = '<p class="text-sm text-gray-400 dark:text-gray-500">No exams yet. Take your first exam!</p>';
  } else {
    hist.innerHTML = DB.examHistory.map(e => {
      const col = e.pct >= 80 ? 'text-green-600 dark:text-green-400' : e.pct >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400';
      return `<div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
        <span class="text-sm text-gray-600 dark:text-gray-400">${e.date} &bull; ${e.total}Q exam</span>
        <span class="font-bold ${col}">${e.pct}% (${e.correct}/${e.total})</span>
      </div>`;
    }).join('');
  }
}

document.getElementById('export-btn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(DB, null, 2)], { type:'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `psac-master-progress-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  toast('📥 Progress exported!');
});

document.getElementById('reset-btn').addEventListener('click', () => {
  if (!confirm('Reset ALL progress? This cannot be undone.')) return;
  // Mutate DB in place - other modules hold a reference to it.
  // Theme, assignments and parent restrictions are intentionally preserved.
  Object.assign(DB, {
    stats:       { totalAttempted:0, totalCorrect:0, examCount:0, bestScore:0, maxStreak:0, streak:0, lastDate:null },
    chapters:    {},
    examHistory: [],
    badges:      [],
    xp:          0,
    level:       1,
  });
  save(DB);
  const streakEl = document.getElementById('streak-count');
  if (streakEl) streakEl.textContent = '0';
  updateXPBar();
  toast('🗑 Progress reset.');
  renderAnalytics();
});

// ── SYLLABUS BROWSER ──────────────────────────
function renderSyllabus() {
  const list = document.getElementById('syllabus-list');
  if (!list) return;

  list.innerHTML = CHAPTERS.map(ch => {
    const syl = packSyllabus()[ch.id] || null;
    const subsections = syl ? syl.subsections : [];
    const chPct = getChapterPct(ch.id);
    const chColor = chPct >= 80 ? '#22c55e' : chPct >= 50 ? '#f59e0b' : '#3b82f6';

    const subsHTML = subsections.map(sub => {
      const qCount = STATIC_QUESTIONS.filter(q =>
        q.chapterId === ch.id && q.subsection === sub.id
      ).length;
      const hasQs = qCount >= 1;
      const statusDot = hasQs
        ? `<span class="text-xs text-green-600 dark:text-green-400 font-medium">${qCount} questions</span>`
        : `<span class="text-xs text-gray-400">practice available</span>`;

      return `<div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
        <div class="flex items-center gap-2 flex-1 min-w-0">
          <span class="text-gray-400">▸</span>
          <span class="text-sm text-gray-700 dark:text-gray-300 truncate">${sub.name}</span>
          <span class="shrink-0">${statusDot}</span>
        </div>
        <button class="shrink-0 ml-3 text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors font-medium"
          onclick="startSubsectionPractice('${ch.id}','${sub.id}','${sub.name.replace(/'/g, "\\'")}')">
          Practise →
        </button>
      </div>`;
    }).join('');

    // For non-maths subjects there are no SYLLABUS subsections - show the chapter description instead
    const bodyHTML = subsHTML || (ch.syllabus
      ? `<p class="text-sm text-gray-600 dark:text-gray-400 py-3 leading-relaxed">${ch.syllabus}</p>`
      : '<p class="text-sm text-gray-400 py-3">No subsections defined yet.</p>');

    return `<div class="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
      <div class="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-700 cursor-pointer" onclick="this.nextElementSibling.classList.toggle('hidden')">
        <div class="flex items-center gap-3">
          <span class="text-2xl">${ch.icon}</span>
          <div>
            <span class="font-bold text-gray-800 dark:text-white">${ch.name}</span>
            ${ch.part != null ? `<span class="ml-2 text-xs text-gray-400">Part ${ch.part}</span>` : ''}
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm font-bold" style="color:${chColor}">${chPct}%</span>
          <button class="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
            onclick="event.stopPropagation();startChapterDirect('${ch.id}')">All levels →</button>
          <span class="text-gray-400 text-sm">▾</span>
        </div>
      </div>
      <div class="px-5 py-1">${bodyHTML}</div>
    </div>`;
  }).join('');
}

window.startSubsectionPractice = function(chapterId, subsectionId, subsectionName) {
  S.practice.chapterId = chapterId;
  S.practice.difficulty = null; // subsection mode - no level filter
  S.practice.qs = getQuestionsForSubsection(chapterId, subsectionId, 20);
  S.practice.idx = 0;
  S.practice.session = { attempted: 0, correct: 0 };
  loadPracticeQuestion();
  showScreen('practice');
  const ch = CHAPTERS.find(c => c.id === chapterId);
  document.getElementById('practice-ch-name').textContent =
    `${ch ? ch.icon : ''} ${ch ? ch.name : chapterId} - ${subsectionName}`;
  _updateDiffBadge(null);
  setTimeout(() => initScratchpad('scratchpad-practice'), 100);
};

// ── FORMULA MODAL ─────────────────────────────
window.showFormulaModal = function() {
  const chId = S.practice.chapterId;
  const f = packFormulas()[chId];
  if (!f) { toast('No formula card for this chapter yet.', 2000); return; }
  document.getElementById('formula-title').textContent = f.title;
  document.getElementById('formula-list').innerHTML = f.facts.map(fact =>
    `<li class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
      <span class="text-blue-500 mt-0.5 shrink-0">▸</span>
      <span>${fact}</span>
    </li>`
  ).join('');
  document.getElementById('formula-modal').style.display = 'flex';
};

window.closeFormulaModal = function() {
  document.getElementById('formula-modal').style.display = 'none';
};

// Close formula modal when clicking backdrop
document.getElementById('formula-modal').addEventListener('click', function(e) {
  if (e.target === this) closeFormulaModal();
});

// ── HELP MODAL ────────────────────────────────
window.showHelpModal = function() {
  const chId = S.practice.chapterId;
  const h = packHelp()[chId];
  if (!h) { toast('No help content for this chapter yet.', 2000); return; }

  const ch = CHAPTERS.find(c => c.id === chId);
  document.getElementById('help-chapter-title').textContent =
    `${ch ? ch.icon + ' ' : ''}${ch ? ch.name : chId} - Video Help`;
  document.getElementById('help-video-credit').textContent =
    `"${h.title}" · ${h.channel}`;

  const frame  = document.getElementById('help-video-frame');
  const ytLink = document.getElementById('help-yt-link');
  frame.src = `https://www.youtube.com/embed/${h.videoId}?rel=0`;
  if (ytLink) ytLink.href = `https://www.youtube.com/watch?v=${h.videoId}`;

  document.getElementById('help-bullets').innerHTML = h.bullets.map(b =>
    `<li class="flex gap-2"><span class="shrink-0">&bull;</span><span>${b}</span></li>`
  ).join('');

  document.getElementById('help-modal').style.display = 'flex';
};

window.closeHelpModal = function() {
  document.getElementById('help-video-frame').src = '';
  document.getElementById('help-modal').style.display = 'none';
};

document.getElementById('help-modal').addEventListener('click', function(e) {
  if (e.target === this) closeHelpModal();
});

// ── WEAK AREA DRILL ───────────────────────────
function startWeakAreaDrill() {
  // Find chapters with accuracy < 60% (or never attempted → treat as 0%)
  const weakChapters = CHAPTERS
    .map(ch => ({ id: ch.id, pct: getChapterPct(ch.id) }))
    .filter(ch => ch.pct < 60)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 3); // target 3 weakest

  if (!weakChapters.length) {
    // All strong - just do a random drill
    toast('Great job! No weak areas found. Starting random drill.', 2500);
    startExam('drill');
    return;
  }

  const weakIds = weakChapters.map(c => c.id);
  const pool = shuffle(STATIC_QUESTIONS.filter(q =>
    weakIds.includes(q.chapterId) && q.difficulty >= 1 && q.difficulty <= 3
  )).slice(0, 15);

  if (!pool.length) { startExam('drill'); return; }

  const chNames = weakChapters.map(c => {
    const ch = CHAPTERS.find(x => x.id === c.id);
    return ch ? ch.name : c.id;
  }).join(', ');

  toast(`💪 Targeting: ${chNames}`, 3000);

  S.exam.qs = pool;
  S.exam.answers = {};
  S.exam.flagged = new Set();
  S.exam.idx = 0;
  S.exam.type = 'weak';
  S.exam.duration = 15 * 60;
  S.exam.endTime = Date.now() + S.exam.duration * 1000;
  showScreen('exam');
  renderExamNavGrid();
  renderExamQuestion();
  startExamTimer();
  document.getElementById('exam-q-total').textContent = S.exam.qs.length;
}

// ── STUDENT SELECTOR ──────────────────────────
function renderStudentSelect() {
  const container = document.getElementById('student-cards');
  if (!container) return;
  const accounts = Store.getAccounts();
  if (!accounts.length) { Auth.init(); return; }
  container.innerHTML = accounts.map(acc => {
    const d     = Store.loadStudent(acc.id);
    const lname = LEVEL_NAMES[Math.min((d.level || 1) - 1, LEVEL_NAMES.length - 1)];
    return `<button class="track-card group flex flex-col items-center text-center w-40"
        onclick="Auth.loginStudent('${acc.id}')">
      <div class="text-5xl mb-3 select-none">${acc.avatar}</div>
      <div class="font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">${acc.name}</div>
      <div class="text-xs text-gray-400 mt-1">⭐ Lv.${d.level||1} ${lname}</div>
      <div class="text-xs text-gray-400">${d.xp||0} XP</div>
    </button>`;
  }).join('');
}

// ── GRADE SELECTOR ────────────────────────────
function renderGradeSelect() {
  const container = document.getElementById('grade-cards');
  if (!container) return;
  const packs = typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [];

  // Unique grades, sorted
  const grades = [...new Set(packs.map(p => p.grade))].sort((a, b) => a - b);

  container.innerHTML = grades.map(grade => {
    const gradePacks = packs.filter(p => p.grade === grade);
    const hasActive  = gradePacks.some(p => !p.comingSoon);
    const soon       = !hasActive;
    const subjects   = gradePacks.map(p => p.subject).join(' · ');
    const count      = gradePacks.length;
    const click      = soon
      ? `toast('Grade ${grade} is coming soon! 🚀', 2000)`
      : `selectGrade(${grade})`;

    return `
      <button type="button" class="track-card ${soon ? 'opacity-70 cursor-default' : 'cursor-pointer group'} relative text-left"
        onclick="${click}" ${soon ? 'disabled' : ''}>
        ${soon ? '<div class="absolute top-3 right-3 text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 px-2 py-0.5 rounded-full font-semibold">Coming Soon</div>' : ''}
        <div class="text-4xl mb-3 select-none">${soon ? '🔜' : '🎓'}</div>
        <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-1 ${soon ? '' : 'group-hover:text-blue-600 dark:group-hover:text-blue-400'} transition-colors">
          Grade ${grade}
        </h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-3">
          ${soon ? 'Coming soon - check back later!' : `${count} subject${count !== 1 ? 's' : ''} available`}
        </p>
        ${!soon ? `<div class="flex flex-wrap gap-2"><span class="chip blue">${subjects}</span></div>` : ''}
      </button>`;
  }).join('');
}

window.selectGrade = function(grade) {
  SELECTED_GRADE = grade;
  showScreen('subject-select');
};

// ── SUBJECT SELECTOR ──────────────────────────
const _SUBJECT_THEME = {
  'Maths':               { bg: 'from-blue-500 to-indigo-600',   chip: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',   icon: 'bg-blue-100 dark:bg-blue-900/40' },
  'English':             { bg: 'from-green-500 to-emerald-600', chip: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300', icon: 'bg-green-100 dark:bg-green-900/40' },
  'French':              { bg: 'from-purple-500 to-violet-600', chip: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300', icon: 'bg-purple-100 dark:bg-purple-900/40' },
  'Science':             { bg: 'from-teal-500 to-cyan-600',     chip: 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300',     icon: 'bg-teal-100 dark:bg-teal-900/40' },
  'History & Geography': { bg: 'from-amber-500 to-orange-500',  chip: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',  icon: 'bg-amber-100 dark:bg-amber-900/40' },
};
const _DEFAULT_THEME = { bg: 'from-gray-500 to-gray-600', chip: 'bg-gray-100 text-gray-700', icon: 'bg-gray-100' };
const _SUBJECT_BORDER_COLOR = {
  'Maths':               '#4f46e5',
  'English':             '#10b981',
  'French':              '#9333ea',
  'Science':             '#0d9488',
  'History & Geography': '#f59e0b',
};

function renderSubjectSelect() {
  const container = document.getElementById('subject-cards');
  if (!container) return;

  // Filter to selected grade; fall back to all if none chosen
  const all   = typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [];
  const packs = SELECTED_GRADE ? all.filter(p => p.grade === SELECTED_GRADE) : all;

  // Update heading
  const heading = document.getElementById('subject-select-heading');
  if (heading) heading.textContent = SELECTED_GRADE ? `Grade ${SELECTED_GRADE} - Choose a Subject` : 'Choose a Subject';

  container.innerHTML = packs.map(pack => {
    const soon  = !!pack.comingSoon;
    const theme = _SUBJECT_THEME[pack.subject] || _DEFAULT_THEME;
    const onclk = soon ? `toast('Coming soon!', 2000)` : `selectSubject('${pack.id}')`;
    const chapCount = pack.chapters?.length || 0;
    return `
      <button type="button" class="${soon ? 'opacity-70 cursor-default' : 'cursor-pointer group'} relative text-left bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg active:scale-95 transition-all overflow-hidden" onclick="${onclk}" ${soon ? 'disabled' : ''}>
        <div class="h-2 bg-gradient-to-r ${theme.bg}"></div>
        <div class="p-5">
          ${soon ? '<div class="absolute top-4 right-4 text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 px-2 py-0.5 rounded-full font-semibold">Coming Soon</div>' : ''}
          <div class="w-14 h-14 rounded-2xl ${theme.icon} flex items-center justify-center text-3xl mb-3 select-none">${pack.icon}</div>
          <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-1 transition-colors">${pack.subject}</h3>
          <p class="text-gray-500 dark:text-gray-400 text-sm mb-3">${pack.curriculum || ''}</p>
          <span class="text-xs font-semibold px-2.5 py-1 rounded-full ${soon ? 'bg-gray-100 text-gray-500' : theme.chip}">${soon ? 'Coming Soon' : `${chapCount} chapters`}</span>
        </div>
      </button>`;
  }).join('');
}

window.selectSubject = function(id) {
  const known = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : []).find(p => p.id === id);
  if (known && known.comingSoon) { toast(`${known.subject || known.name} is coming soon! 🚀`, 2500); return; }
  const pack = activateSubjectPack(id);
  if (pack && typeof QuestionLoader !== 'undefined') {
    // Load questions for this subject if not already loaded
    QuestionLoader.loadSubject(pack.id).then(() => {
      renderDashboard(); // refresh mastery grid after questions arrive
    }).catch(() => {});
  }
  showScreen('dashboard');
};

// ── INIT ──────────────────────────────────────
document.getElementById('clear-scratch-practice').addEventListener('click', () => clearScratch('scratchpad-practice'));
document.getElementById('clear-scratch-exam').addEventListener('click', () => clearScratch('scratchpad-exam'));

// Animate mastery bars after a short delay (so CSS transition fires)
setTimeout(() => { document.querySelectorAll('.mastery-bar-fill').forEach(el => { el.style.width = el.style.width; }); }, 100);

// Init scratchpads when their screen becomes visible
const practiceObserver = new MutationObserver(() => {
  if (!document.getElementById('screen-practice')?.classList.contains('hidden')) {
    initScratchpad('scratchpad-practice');
  }
});
const examObserver = new MutationObserver(() => {
  if (!document.getElementById('screen-exam')?.classList.contains('hidden')) {
    initScratchpad('scratchpad-exam');
  }
});
const pScreen = document.getElementById('screen-practice');
const eScreen = document.getElementById('screen-exam');
if (pScreen) practiceObserver.observe(pScreen, { attributes: true, attributeFilter: ['class'] });
if (eScreen) examObserver.observe(eScreen, { attributes: true, attributeFilter: ['class'] });

console.log(`✅ PSAC Exam Practice loaded. ${STATIC_QUESTIONS.length} static questions across ${CHAPTERS.length} chapters.`);

// ── MOBILE CARD CAROUSELS ─────────────────────
// The landing page grids carry 17 cards between them, which on a phone is a
// very long scroll. CSS (style.css, under 640px) turns each [data-carousel]
// grid into a scroll-snap track showing one card at a time; this only builds
// the dots and keeps them in sync. Everything still works with JS disabled -
// it degrades to a plain horizontal swipe with no indicator.
//
// Dots are built even on desktop, where CSS keeps them hidden: positions are
// read lazily (on scroll / on tap), so building them while #screen-landing is
// still display:none is safe.
(function _initMobileCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(track => {
    const items = Array.from(track.children);
    if (items.length < 2) return;

    const dots = document.createElement('div');
    dots.className = 'mcar-dots';

    items.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'mcar-dot' + (i ? '' : ' active');
      dot.setAttribute('aria-label', `Show card ${i + 1} of ${items.length}`);
      dot.addEventListener('click', () => {
        track.scrollTo({ left: items[i].offsetLeft - items[0].offsetLeft, behavior: 'smooth' });
      });
      dots.appendChild(dot);
    });
    track.after(dots);

    // Nearest-card wins, rather than dividing by a card width: the cards are
    // full-bleed but the gap between them is not, so arithmetic drifts.
    let raf = 0;
    track.addEventListener('scroll', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const base = items[0].offsetLeft;
        let best = 0, bestDist = Infinity;
        items.forEach((el, i) => {
          const dist = Math.abs((el.offsetLeft - base) - track.scrollLeft);
          if (dist < bestDist) { bestDist = dist; best = i; }
        });
        Array.from(dots.children).forEach((d, i) => d.classList.toggle('active', i === best));
      });
    }, { passive: true });
  });
})();

// ── OFFLINE DETECTION (K) ─────────────────────
(function _initOffline() {
  const banner = document.getElementById('offline-banner');
  if (!banner) return;
  function _update() {
    banner.classList.toggle('hidden', navigator.onLine);
  }
  window.addEventListener('online',  _update);
  window.addEventListener('offline', _update);
  _update(); // set correct state on load
}());

// ── Report question modal ──────────────────────
function openReportModal() {
  const modal = document.getElementById('modal-report');
  if (modal) {
    document.getElementById('report-message').value = '';
    modal.classList.remove('hidden');
  }
}

function closeReportModal() {
  const modal = document.getElementById('modal-report');
  if (modal) modal.classList.add('hidden');
}

async function submitReport() {
  const msg = (document.getElementById('report-message')?.value || '').trim();
  if (!msg) { toast('Please describe the issue first.', 2000); return; }

  const q = S.practice?.qs?.[S.practice?.idx] ?? S.exam?.qs?.[S.exam?.idx];
  if (!q) { closeReportModal(); return; }

  const btn = document.querySelector('#modal-report .bg-red-500');
  if (btn) btn.textContent = 'Sending…';

  const tmpDiv = document.createElement('div');
  tmpDiv.innerHTML = q.question;
  const questionText = tmpDiv.textContent || tmpDiv.innerText || q.question;

  const sess = Store.getStudentSession ? Store.getStudentSession() : null;
  const studentName = sess?.displayName || null;
  const mode = S.exam?.qs?.length ? 'exam' : 'practice';

  const ok = await Store.reportQuestion(
    q.id,
    questionText.slice(0, 300),
    msg,
    typeof ACTIVE_STUDENT_ID !== 'undefined' ? ACTIVE_STUDENT_ID : null,
    studentName,
    mode,
    q.options || null,
    q.answer || null
  );

  closeReportModal();
  if (ok) {
    toast('Report sent - thank you! 🙏', 2500);
  } else {
    toast('Could not send report. Check your connection.', 3000);
  }
}
