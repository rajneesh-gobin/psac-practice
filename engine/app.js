'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice Grade 5 - Application Logic
// ══════════════════════════════════════════════

// ── STATE ─────────────────────────────────────
const S = {
  exam: { qs: [], answers: {}, flagged: new Set(), idx: 0, timer: null, duration: 0, endTime: null },
  practice: { chapterId: null, difficulty: 1, qs: [], idx: 0, answers: {}, hintShown: false, session: { attempted: 0, correct: 0, points: 0 } },
  currentScreen: 'dashboard',
};

// Maps question id → true when that MCQ is randomly displayed as fill-in-the-blank
// this session. Decided once per question on first render, then memoised.
// Cleared when a new exam or practice session starts.
const _blankQuestions = new Map();

// ── GAMIFICATION STATE ────────────────────────
// pref_* localStorage keys are scoped per student, not global to the device -
// a shared family tablet has a parent and several kids taking turns on it,
// and "sound off"/"haptic off" is a personal preference, not a device fact.
// Falls back to a bare 'guest' bucket before any student has logged in.
//
// ACTIVE_STUDENT_ID is declared HERE, above _prefKey's first caller, and must
// stay above it. A `typeof` guard does NOT make a later declaration safe: for a
// let/const binding still in the temporal dead zone `typeof` throws instead of
// returning "undefined". _soundEnabled below calls _prefKey() at load time, so
// declaring it further down threw and killed the whole of app.js on load.
let ACTIVE_STUDENT_ID = null;

function _prefKey(base) {
  return `pref_${base}_${ACTIVE_STUDENT_ID || 'guest'}`;
}
let _soundEnabled  = localStorage.getItem(_prefKey('sound'))  !== 'false';
let _hapticEnabled = localStorage.getItem(_prefKey('haptic')) !== 'false';
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

// ⚠ UI only, and it always has been - the enforcement that counts is in
// netlify/functions/questions.js. Two things now override the plan list:
//
//   · A chapter bought with referral credits is open regardless of tier.
//   · An EXPIRED account gets ONLY its credit-bought chapters, whatever the
//     plan says and whether or not plan enforcement is switched on. That is the
//     point of the 30-day window: it outlives the account it was bought on.
function _planAllowsChapter(chapterId) {
  // Grades 1-2 are free for everyone, permanently - above plan, expiry and
  // credits alike. Checked FIRST so a lapsed account still opens them, which
  // is what the server does too (see questions.js). Kill switches are not
  // bypassed here: those are handled by _adminBlocksChapter().
  if (typeof isFreeChapter === 'function' && isFreeChapter(chapterId)) return true;
  const bought = (typeof Shop !== 'undefined') && Shop.isUnlocked(chapterId);
  if (typeof Auth !== 'undefined' && Auth.isAccessExpired && Auth.isAccessExpired()) return bought;
  if (bought) return true;
  if (!window.PLAN_ENFORCEMENT) return true;
  const allowed = (typeof Auth !== 'undefined' ? Auth.getPlanFeatures?.() : null)?.allowed_chapters;
  if (!allowed) return true; // null = unlimited plan
  return allowed.includes(chapterId);
}

// ── PLAN CAPS ─────────────────────────────────
// Every check below is behind window.PLAN_ENFORCEMENT, exactly like
// _planAllowsChapter: with the admin switch off nothing is capped and the app
// behaves as it always has. That is what lets this ship dark.
//
// Mauritius is UTC+4 all year with no DST, so the day/week keys are a FIXED
// offset from UTC. Never toLocaleDateString() here - that follows the device
// clock, so a child on a travelling parent's phone, or one who simply changes
// the device timezone, would roll their own daily cap over at will.
const _MU_OFFSET_MS = 4 * 60 * 60 * 1000;
function _muNow()     { return new Date(Date.now() + _MU_OFFSET_MS); }
function _muDayKey()  { return _muNow().toISOString().slice(0, 10); }
function _muWeekKey() {
  const d = _muNow();
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7)); // back to Monday
  return d.toISOString().slice(0, 10);
}

// null = no cap. A plan states a cap as a number; anything else (missing key,
// null, a string someone typed into the admin form) means unlimited, so a
// malformed plan row can never lock a child out of the app.
function _planFeature(key) {
  if (!window.PLAN_ENFORCEMENT) return null;
  const f = (typeof Auth !== 'undefined' ? Auth.getPlanFeatures?.() : null) || {};
  return f[key];
}
function _planCap(key) {
  const v = _planFeature(key);
  return (typeof v === 'number' && isFinite(v) && v >= 0) ? v : null;
}
function _planAllowsFeature(key) {
  if (!window.PLAN_ENFORCEMENT) return true;
  return _planFeature(key) !== false;   // absent/unset = allowed
}

// Resets lazily on read rather than on a timer: the app can sit open across
// midnight, and a child who leaves it open overnight must get their new day.
function _usage() {
  if (!DB.usage) DB.usage = { day: '', questions: 0, week: '', exams: 0 };
  const u = DB.usage, dk = _muDayKey(), wk = _muWeekKey();
  if (u.day  !== dk) { u.day  = dk; u.questions = 0; }
  if (u.week !== wk) { u.week = wk; u.exams     = 0; }
  return u;
}
const _CAP_KEY = { questions: 'daily_question_cap', exams: 'weekly_exam_cap' };

function _capReached(kind) {
  const cap = _planCap(_CAP_KEY[kind]);
  if (cap === null) return false;
  return (_usage()[kind] || 0) >= cap;
}
function _usageBump(kind) {
  if (!window.PLAN_ENFORCEMENT) return;   // do not accumulate while dark
  const u = _usage();
  u[kind] = (u[kind] || 0) + 1;
  save(DB);
}

// _buildHints() always builds exactly 3 steps, so 3 is the ceiling whatever a
// plan says. One helper because three places need the same number: the badge
// reset per question, the reveal handler, and the disable-at-cap decision.
function _hintCap() { return Math.min(3, _planCap('hints_per_question') ?? 3); }

const _CAP_COPY = {
  questions: cap => `You've done ${cap} question${cap === 1 ? '' : 's'} today - great work! 🎉\n\nCome back tomorrow for more, or ask a parent about upgrading for unlimited practice.`,
  exams:     cap => `You've done your ${cap} mock exam${cap === 1 ? '' : 's'} for this week - well done! 🎉\n\nA new one unlocks on Monday, or ask a parent about upgrading for unlimited exams.`,
  // cap 0 gets its own wording: "You've used all 0 hints" fires on the very
  // first tap and reads as a bug rather than a plan limit.
  hints:     cap => cap === 0
    ? 'Hints are not included in your plan.\n\nHave a go at answering it, or ask a parent about upgrading to unlock hints.'
    : `You've used all ${cap} hint${cap === 1 ? '' : 's'} for this question.\n\nHave a go at answering it, or ask a parent about upgrading for more hints.`,
};

// screen id -> the plan feature that unlocks it. Read by showScreen().
const _PLAN_GATED_SCREENS = {
  analytics:     'advanced_analytics',
  'past-papers': 'past_papers',
  search:        'question_search',
  forum:         'community_forum',
  calendar:      'study_calendar',
  minigames:     'minigames',
};

const _FEATURE_COPY = {
  minigames:           'The Game Zone is part of a paid plan.\n\nAsk a parent about upgrading to unlock Peak Quest and the games that follow it.',
  advanced_analytics:  'Advanced analytics is part of a paid plan.\n\nIt shows chapter-by-chapter progress over time. Ask a parent about upgrading to switch it on.',
  printable_papers:    'Printable exam papers are part of a paid plan.\n\nYou can still take the exam on screen. Ask a parent about upgrading to print papers.',
  timetable_generator: 'The study timetable generator is part of a paid plan.\n\nAsk a parent about upgrading to build a revision timetable automatically.',
  push_reminders:      'Daily study reminders are part of a paid plan.\n\nAsk a parent about upgrading to switch them on.',
  // Parent-facing wording: only a signed-in adult ever reaches this one.
  tutor_status:        'Applying for tutor access is part of the Premium plan.\n\nUpgrade to apply, then an administrator reviews your application.',
  past_papers:         'Real past exam papers are part of a paid plan.\n\nAsk a parent about upgrading to practise with them.',
  question_search:     'Searching across every subject is part of a paid plan.\n\nAsk a parent about upgrading to switch it on.',
  // Parent-facing wording: the forum is adult-only now (see
  // _ADULT_ONLY_SCREENS), so a child never reaches this modal.
  community_forum:     'The community forum is part of a paid plan.\n\nUpgrade to ask questions and compare notes with other parents and teachers.',
  study_calendar:      'The study timetable is part of a paid plan.\n\nAsk a parent about upgrading to plan revision with it.',
  weak_area_drill:     'Weak-area drills are part of a paid plan.\n\nThey pick the topics you find hardest. Ask a parent about upgrading.',
};

function _showFeatureModal(key) {
  _confirmModal(_FEATURE_COPY[key] || 'That feature is part of a paid plan.',
    () => { if (typeof openPlansModal === 'function') openPlansModal(); },
    { icon: '🔒', okLabel: 'See plans', danger: false, cancelLabel: 'OK' });
}

// Paints the lock state onto controls that are still visible but gated. Called
// from showScreen for the screens that own them rather than once at login: the
// plan can change under a live session (an admin activates one, a parent
// upgrades), and re-reading on every visit costs nothing.
function _applyPlanGates(screenId) {
  const mark = (el, locked, lockedTitle) => {
    if (!el) return;
    el.classList.toggle('plan-locked', locked);
    if (locked) el.setAttribute('title', lockedTitle);
    else if (el.getAttribute('title') === lockedTitle) el.removeAttribute('title');
  };

  if (screenId === 'dashboard') {
    const locked = !_planAllowsFeature('advanced_analytics');
    mark(document.querySelector('.tabbar-btn[data-nav="progress"]'), locked, 'Paid plan feature');
    mark(document.getElementById('dash-analytics-tile'), locked, 'Paid plan feature');
  }

  if (screenId === 'exam-config') {
    // The radio is disabled as well as marked: an exam type that cannot run
    // should not be selectable at all, so the child never gets as far as
    // pressing Start and being refused.
    const locked = !_planAllowsFeature('printable_papers');
    const radio  = document.querySelector('input[name="exam-type"][value="print"]');
    if (radio) {
      radio.disabled = locked;
      if (locked && radio.checked) {
        radio.checked = false;
        const first = document.querySelector('input[name="exam-type"]:not([disabled])');
        if (first) first.checked = true;
      }
    }
    mark(radio?.closest('.exam-opt'), locked, 'Paid plan feature');
  }
}

// A child must never be told to go and pay for something. The upgrade route is
// the plans modal, which is the parent's screen - the wording points at asking
// a parent, and the button is the softer of the two.
function _showCapModal(kind) {
  // _hintCap(), not the raw plan value: the copy must state the number actually
  // enforced, which is clamped to the 3 hints _buildHints can produce.
  const cap = kind === 'hints' ? _hintCap() : _planCap(_CAP_KEY[kind]);
  const msg = (_CAP_COPY[kind] || (() => 'Limit reached.'))(cap ?? 0);
  _confirmModal(msg, () => { if (typeof openPlansModal === 'function') openPlansModal(); },
    { icon: '🔒', okLabel: 'See plans', danger: false, cancelLabel: 'OK' });
}

// Switched off by an administrator, either for everyone (global settings) or
// for this family's plan tier. Distinct from a PARENT's own lock: a parent can
// undo their own lock, but not this one. Mirrored server-side in
// netlify/functions/questions.js, which simply does not serve these questions -
// so editing the DOM or localStorage buys a cheat nothing.
function _adminBlocksChapter(chapterId) {
  const gs = window.GLOBAL_SETTINGS || {};
  if ((gs.disabled_chapters || []).includes(chapterId)) return true;
  return !_planAllowsChapter(chapterId);
}

function toggleSound() {
  _soundEnabled = !_soundEnabled;
  const btn = document.getElementById('sound-toggle-btn');
  if (!btn) return;
  // Writes into the icon/label spans when they exist (the practice toolbar,
  // where every tool is an icon over a word) and falls back to replacing the
  // whole button text. textContent on the button itself would delete the spans.
  const ico = btn.querySelector('.pr-tool-ico');
  const lbl = btn.querySelector('.pr-tool-lbl');
  if (ico && lbl) {
    ico.textContent = _soundEnabled ? '🔔' : '🔕';
    lbl.textContent = _soundEnabled ? 'Sound on' : 'Muted';
  } else {
    btn.textContent = _soundEnabled ? '🔔 Sound On' : '🔕 Sound Off';
  }
  btn.classList.toggle('muted', !_soundEnabled);
}

// The streak is shown twice in the header: with the branding on a phone, in the
// action row from `sm:` up. One writer for both, so they can never disagree -
// the alternative was three call sites each remembering two element ids.
function _setStreakDisplay(n) {
  ['streak-count', 'streak-count-m'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(n);
  });
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

const _PRAISE_REACTIONS = [
  ['🌟', 'Brilliant thinking!'], ['🦊', 'You got it!'], ['🚀', 'Great job!'],
  ['🎈', 'That was spot on!'], ['🐼', 'Clever answer!'], ['✨', 'Yes! Keep going!'],
];
const _TRY_AGAIN_REACTIONS = [
  ['🐢', 'That one was tricky - let’s learn it together.'],
  ['🦉', 'Nearly there. Have a look at the helpful steps below.'],
  ['🌱', 'Mistakes help your brain grow. Let’s try the next one.'],
  ['🧩', 'Good try. This is a puzzle we can solve step by step.'],
];

function _celebrationMotionAllowed() {
  if (document.documentElement.classList.contains('kid-calm')) return false;
  return !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

function _practiceReaction(correct, streak) {
  if (correct && streak >= 10) return { icon: '🏆', text: 'Legendary streak! You are on fire!', confetti: 120 };
  if (correct && streak >= 5)  return { icon: '🔥', text: `${streak} in a row - amazing focus!`, confetti: 75 };
  const choices = correct ? _PRAISE_REACTIONS : _TRY_AGAIN_REACTIONS;
  const [icon, text] = choices[Math.floor(Math.random() * choices.length)];
  // A small surprise roughly once every five correct answers keeps delight
  // without turning each question into an interruption.
  return { icon, text, confetti: correct && Math.random() < 0.2 ? 34 : 0 };
}

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
// ACTIVE_STUDENT_ID is declared up beside _prefKey, which reads it at load time.
let DB = {};   // populated by Auth.init() after student is selected

// ── GRADE / SUBJECT SELECTION ─────────────────
let SELECTED_GRADE = null;
let ACTIVE_PACK    = null; // set when student selects a subject; defaults to first non-comingSoon pack

// ⚠ Returns null when no subject has been chosen, and that is deliberate.
//
// It used to fall back to `SUBJECT_PACKS.find(p => !p.comingSoon)` - the first
// pack registered, which is grade4-maths. So before a child picked anything,
// the breadcrumb said "Grade 4 Mathematics", the syllabus screen showed maths,
// packBadges() offered maths badges and _ttsLang() answered for maths. Combined
// with the global CHAPTERS starting full of GRADE 5 maths (fixed in that
// manifest), the app confidently showed two DIFFERENT maths subjects at once to
// a child who had tapped Science.
//
// A guess dressed as an answer is worse than no answer: every caller already
// handles null (`(p && p.badges) || []` and friends), and an empty chapter grid
// has a real empty state that points at the Subjects screen.
function _activePack() {
  return ACTIVE_PACK || null;
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
// Chapter-grid filter (All / Not started / In progress / Needs work).
// ⚠ Declared HERE, above activateSubjectPack, not beside the filter bar that
// uses it. It is a `let`, so a reference from activateSubjectPack() while the
// declaration was still below would sit in the temporal dead zone and throw
// ReferenceError rather than reading undefined. Nothing calls that function
// during app.js's own top-level run today - but auth.js and the resume path
// both call it, and the ordering is not something a future edit should have to
// know about.
let _chapterFilter = 'all';

function activateSubjectPack(packId, { allowComingSoon = false } = {}) {
  const packs = (typeof SUBJECT_PACKS !== 'undefined') ? SUBJECT_PACKS : [];
  const pack  = packs.find(p => p.id === packId);
  if (!pack) return null;
  if (pack.comingSoon && !allowComingSoon) return null;

  ACTIVE_PACK    = pack;
  SELECTED_GRADE = pack.grade;
  // Subject selection should survive a normal refresh. Scope it to the child
  // rather than the device, because families can switch between siblings here.
  try {
    const key = `psac-active-subject:${typeof ACTIVE_STUDENT_ID !== 'undefined' && ACTIVE_STUDENT_ID ? ACTIVE_STUDENT_ID : 'current'}`;
    sessionStorage.setItem(key, pack.id);
  } catch (_) {}

  const chs = pack._chapters || pack.chapters || [];
  CHAPTERS.length = 0;
  chs.forEach(ch => CHAPTERS.push(ch));

  // ⚠ Reset here, not in the filter bar. A filter left on "Not started" would
  // otherwise follow the child into the next subject, where it can legitimately
  // match nothing - and an empty chapter grid reads as a broken app, not as an
  // active filter.
  _chapterFilter = 'all';

  return pack;
}
window.activateSubjectPack = activateSubjectPack;

function _activeSubjectLabel() {
  const pack  = _activePack();
  const acct  = (typeof Auth !== 'undefined') ? Auth.getActiveAccount() : null;
  const grade = acct?.grade || pack?.grade || 5;
  // ⚠ Not 'Maths'. With no subject chosen this string went into the breadcrumb
  // and the dashboard tagline, so a child who had picked nothing was told they
  // were in Maths - the same guess _activePack() used to make, one level up.
  const name  = pack?.name  || 'your subject';
  return { grade, name, chosen: !!pack };
}

// ── ASSIGNMENT MODE ───────────────────────────
let ASSIGNMENT_MODE         = false;
let ASSIGNMENT_CONFIG       = null;
let ASSIGNMENT_STUDENT_NAME = '';
let ASSIGNMENT_SCORE        = { attempted: 0, correct: 0 };
let ASSIGNMENT_IS_TEST      = false;   // test mode = no feedback until submission
let ASSIGNMENT_TEST_ANSWERS = [];      // [{question,userAnswer,correctAnswer,correct,explanation}]

// True for EITHER assignment flow this codebase has: the teacher/guest one
// above (ASSIGNMENT_MODE) and the separate parent-assignment one
// (startAssignmentDirect(), which never sets ASSIGNMENT_MODE - it only hands
// startChapterDirect() a one-shot _practiceMode). _saveResume() must never
// write a resume record while either is active: parent assignments run on a
// REAL chapterId, so pausing one would land in that SAME chapter's resume
// slot as any genuine paused practice session on it - whichever saved last
// silently overwrites the other, and resuming an assignment as if it were
// ordinary practice drops its showAnswers/showHints restriction entirely.
let _assignmentActive = false;

// EVERY practice entry point must declare whether it is an assignment run, and
// every exit must clear it. _assignmentActive suppresses three things at once -
// the resume record (_saveResume), the daily question cap and its counter
// (practiceSubmit), and the "⏸️ Continue Later" button - so a stale `true` left
// over from a finished assignment silently disables all three for the rest of
// the session. It used to be cleared only by showAssignmentComplete(), which
// belongs to the guest/teacher ASSIGNMENT_MODE flow; a PARENT-assigned round
// finishes through the round-complete modal instead and never reached it.
function _setAssignmentContext(on) {
  S.practice.coachMission = null;
  _assignmentActive = !!on;
  document.getElementById('practice-pause-btn')?.classList.toggle('hidden', _assignmentActive);
  // Leaving an assignment also has to hand back the two things an assignment is
  // allowed to withhold. showAnswers/showHints are set from `mode` in
  // startChapterDirect, but startSearchPractice and startSubsectionPractice
  // never set them at all - so a parent's "no hints" homework silently removed
  // the hint button from every Search and Syllabus round for the rest of the
  // session, and "no answers" left those rounds giving no feedback whatsoever.
  // Done here, after the caller's own assignment on the `on === true` path, so
  // a real assignment's restrictions are never clobbered.
  if (!_assignmentActive) {
    S.practice.showAnswers = true;
    S.practice.showHints   = true;
  }
}

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
  const shThemeIcon = document.getElementById('sh-theme-icon');
  if (shThemeIcon) shThemeIcon.textContent = t === 'dark' ? '🌙' : '💡';
  try { localStorage.setItem('mm_global_theme', t); } catch(e) {}
  // Only a child's OWN session may write a theme into their progress. A parent
  // viewing a child also has ACTIVE_STUDENT_ID set (pdSwitchStudent), and their
  // theme choice is theirs, not the child's.
  if (ACTIVE_STUDENT_ID && !_isParentSession()) { DB.theme = t; save(DB); }
  ['scratchpad-exam', 'scratchpad-practice'].forEach(id => {
    const c = document.getElementById(id);
    if (c && c._ctx) c._ctx.strokeStyle = t === 'dark' ? '#fff' : '#1e293b';
  });
}
// ── Kid Home customisation (My Settings → My Colours / Big Text / Calm Mode) ──
// Purely cosmetic and purely for the kid-facing screens (see the .kid-* rules
// in style.css) - never touches the parent/teacher/admin UI, which doesn't
// use any of these classes. Reads straight off DB.kidPrefs, so it stays in
// sync with whatever _renderStudentProfile() just saved.
function _applyKidPrefs() {
  const prefs = (typeof DB !== 'undefined' && DB.kidPrefs) || {};
  const root  = document.documentElement;
  if (prefs.vibe && prefs.vibe !== 'default') root.dataset.kidVibe = prefs.vibe;
  else root.removeAttribute('data-kid-vibe');
  root.classList.toggle('kid-text-lg', !!prefs.bigText);
  root.classList.toggle('kid-calm',    !!prefs.calm);

  // _soundEnabled is a plain JS variable cached at page-load time (before
  // ACTIVE_STUDENT_ID existed), from whatever the *global* pref_sound key
  // used to hold. Re-read it now that _prefKey() can actually resolve to
  // THIS student's own scoped key - otherwise a sibling logging in after
  // someone who muted sound would inherit "muted" for the rest of the
  // session (or vice versa) until they happened to tap the toggle themselves.
  _soundEnabled  = localStorage.getItem(_prefKey('sound'))  !== 'false';
  _hapticEnabled = localStorage.getItem(_prefKey('haptic')) !== 'false';
}

function _setKidPref(key, value) {
  if (!ACTIVE_STUDENT_ID) return;
  DB.kidPrefs = Object.assign({ vibe: 'default', bigText: false, calm: false }, DB.kidPrefs, { [key]: value });
  save(DB);
  _applyKidPrefs();
}

// ── Theme preference: light | dark | system ───
// applyTheme() only ever deals in a concrete 'light'/'dark'. "Follow my device"
// is a third state that has to be re-resolved every time the OS flips, so it
// lives in its own key and is resolved on the way in. mm_global_theme stays
// exactly what it was - the last CONCRETE theme applied - so nothing that reads
// it (student DB.theme, the boot paint, _preferredTheme) has to change.
const THEME_PREF_KEY = 'mm_theme_pref';

function _systemTheme() {
  try { return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
  catch (e) { return DEFAULT_THEME; }
}

function getThemePreference() {
  try {
    const p = localStorage.getItem(THEME_PREF_KEY);
    if (p === 'light' || p === 'dark' || p === 'system') return p;
    // No stored preference: an existing device has only ever made concrete
    // choices, so report whichever one is currently in force.
    return localStorage.getItem('mm_global_theme') || DEFAULT_THEME;
  } catch (e) { return DEFAULT_THEME; }
}

function setThemePreference(pref) {
  if (!['light', 'dark', 'system'].includes(pref)) pref = 'system';
  try { localStorage.setItem(THEME_PREF_KEY, pref); } catch (e) {}
  applyTheme(pref === 'system' ? _systemTheme() : pref);
}

// Toggle from what is ACTUALLY painted, not DB.theme. DB belongs to the active
// child and is deliberately not rewritten while a parent/teacher is using the
// app. Reading it here made an adult's button request the same theme forever.
function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  setThemePreference(isDark ? 'light' : 'dark');
}

try {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getThemePreference() === 'system') applyTheme(_systemTheme());
  });
} catch (e) {}

// The header toggle is a deliberate concrete choice, so it also drops the
// device out of 'system' - otherwise the next OS flip would silently undo it.
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
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
applyTheme(getThemePreference() === 'system' ? _systemTheme()
                                             : (localStorage.getItem('mm_global_theme') || DEFAULT_THEME));

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
// A student can have MULTIPLE paused practice sessions at once - one per
// chapter they tapped "Continue Later" on - plus at most one paused exam
// (an exam spans the whole subject, not one chapter, so only one at a time
// makes sense). This used to be a single localStorage slot per student, so
// pausing chapter B silently overwrote chapter A's paused progress - there
// was nowhere for a second one to go. Now one key still holds everything for
// the student, but shaped as { exam, practice: { [chapterId]: {...} } }, so
// each chapter gets its own entry. The chapter-select cards
// (renderChapterSelect()) read practice entries directly by chapterId; the
// dashboard banner below shows the exam (if any) or the most recently paused
// chapter, plus a count of anything else still waiting.
const _RESUME_TTL = 24 * 60 * 60 * 1000;

function _resumeKey() { return 'mm_resume_' + ACTIVE_STUDENT_ID; }

function _readResumeStore() {
  if (!ACTIVE_STUDENT_ID) return { exam: null, practice: {} };
  let local = { exam: null, practice: {} };
  try {
    const raw = localStorage.getItem(_resumeKey());
    const parsed = raw ? JSON.parse(raw) : {};
    local = { exam: parsed.exam || null, practice: parsed.practice || {} };
  } catch(e) {}
  // The blob carries the same records so an unfinished set can be picked up on
  // another device. Per chapter, the newer timestamp wins; the exam slot stays
  // device-local because an exam has a running clock that cannot migrate.
  const remote = (DB && DB.resume && DB.resume.practice) || {};
  for (const chId of Object.keys(remote)) {
    const r = remote[chId], l = local.practice[chId];
    if (r && (!l || (r.ts || 0) > (l.ts || 0))) local.practice[chId] = r;
  }
  return local;
}

function _writeResumeStore(store) {
  if (!ACTIVE_STUDENT_ID) return;
  try { localStorage.setItem(_resumeKey(), JSON.stringify(store)); } catch(e) {}
}

// Drops anything past _RESUME_TTL before every read, so a week-old paused
// chapter never resurfaces and there is no separate cleanup pass to forget.
function _pruneResumeStore(store) {
  const now = Date.now();
  if (store.exam && now - store.exam.ts > _RESUME_TTL) store.exam = null;
  for (const id of Object.keys(store.practice || {})) {
    if (now - store.practice[id].ts > _RESUME_TTL) delete store.practice[id];
  }
  return store;
}

// ── Fix My Mistakes ───────────────────────────
// The synthetic chapter id a mistake-drill round runs under. It IS the flag for
// that mode - deliberately, rather than a separate S.practice boolean: every
// launch path already assigns S.practice.chapterId, so this can never be left
// set from the previous round the way a stray flag would be.
// ⚠ Declared here, above _saveResume, not beside _MISTAKE_KEEP further down:
// a const referenced by a function defined earlier in the file is exactly the
// temporal-dead-zone trap this project has already hit once.
const _FIX_CHAPTER_ID = 'fix-mistakes';
// A mistake is not fixed by getting it right once - on a 4-option MCQ that is a
// 1-in-4 guess. Two correct answers, from anywhere in the app, retire it.
const _FIX_TO_RETIRE  = 2;
const _FIX_ROUND_MAX  = 10;

function _saveResume() {
  if (S.practice?.coachMission) return;
  if (!ACTIVE_STUDENT_ID) return;
  const store = _pruneResumeStore(_readResumeStore());
  if (S.exam && S.exam.qs && S.exam.qs.length) {
    store.exam = {
      subjectId: ACTIVE_PACK?.id, examType: S.exam.type,
      qIds: S.exam.qs.map(q => q.id), idx: S.exam.idx,
      answers: S.exam.answers, flagged: [...(S.exam.flagged || [])],
      endTime: S.exam.endTime, ts: Date.now()
    };
  } else if (!_assignmentActive && S.practice && S.practice.chapterId
             && S.practice.chapterId !== _FIX_CHAPTER_ID
             && S.practice.qs && S.practice.qs.length) {
    // A mistake drill is never resumable: the store is keyed by chapter and
    // resolves its ids against ACTIVE_PACK alone, while a drill is a snapshot
    // of a list that changes every time a question is fixed and can span
    // several subjects. Rebuilding it from DB.mistakes costs one tap.
    // Never for an assignment (teacher/test OR parent-assigned) - see
    // _assignmentActive's own comment for why: it runs on a real chapterId
    // and would silently collide with that chapter's genuine practice-resume
    // slot, in either direction.
    store.practice[S.practice.chapterId] = {
      subjectId: ACTIVE_PACK?.id,
      qIds: S.practice.qs.map(q => q.id), idx: S.practice.idx,
      answers: S.practice.answers || {}, ts: Date.now()
    };
  }
  _writeResumeStore(store);
  // Mirror into the progress blob so another device can resume this set. Only
  // the practice slots: the exam slot holds a running endTime that would be
  // wrong the moment it arrived somewhere else.
  if (DB) {
    if (!DB.resume) DB.resume = { practice: {} };
    DB.resume.practice = store.practice || {};
    save(DB);
  }
}

// Each clears exactly the one thing its caller means to abandon (exiting an
// exam, leaving a chapter, finishing a round) - never the whole store, or
// abandoning one paused chapter would wipe out every other paused chapter too.
function _clearExamResume() {
  if (!ACTIVE_STUDENT_ID) return;
  const store = _readResumeStore();
  store.exam = null;
  _writeResumeStore(store);
}

function _clearPracticeResume(chapterId) {
  if (!ACTIVE_STUDENT_ID || !chapterId) return;
  const store = _readResumeStore();
  delete store.practice[chapterId];
  _writeResumeStore(store);
  // Also clear from the DB blob, or _readResumeStore() merges it back in.
  if (DB && DB.resume && DB.resume.practice) {
    delete DB.resume.practice[chapterId];
    save(DB);
  }
}

function _getChapterResume(chapterId) {
  if (!ACTIVE_STUDENT_ID || !chapterId) return null;
  const store = _pruneResumeStore(_readResumeStore());
  return store.practice[chapterId] || null;
}

// kind: 'exam' | 'practice'. chapterId required (and ignored) for practice.
// Reads fresh from storage every call rather than a cached "pending" handoff
// set by whichever banner button was clicked last - with multiple resumable
// chapters now possible at once, a single stashed variable could not safely
// track which one was meant.
async function _doResume(kind, chapterId) {
  const store = _pruneResumeStore(_readResumeStore());
  const saved = kind === 'exam' ? store.exam : store.practice[chapterId];
  if (!saved) { toast('That session is no longer available.', 2500); return; }

  // Loading the questions is not enough: CHAPTERS/ACTIVE_PACK must point at the
  // saved subject too, or resuming a session started in another subject renders
  // the chapter name, badges and help from whichever subject is open now.
  if (saved.subjectId && typeof activateSubjectPack === 'function') {
    if (typeof PackLoader !== 'undefined') await PackLoader.ensure(saved.subjectId).catch(() => {});
    activateSubjectPack(saved.subjectId);
  }
  if (saved.subjectId && typeof QuestionLoader !== 'undefined') {
    await QuestionLoader.loadSubject(saved.subjectId);
  }
  const qMap = {};
  STATIC_QUESTIONS.forEach(q => { if (q) qMap[q.id] = q; });
  const qs = (saved.qIds || []).map(id => qMap[id]).filter(Boolean);
  if (!qs.length) { toast('Could not restore that session - please start again.', 3000); return; }

  if (kind === 'practice') {
    // Handed to startChapterDirect via the one-shot _practiceResume - it adopts
    // this instead of drawing a fresh batch. See its definition for why.
    _practiceResume = { qs, idx: saved.idx || 0, answers: saved.answers || {} };
    startChapterDirect(chapterId);
  } else {
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

function _resumeSubjectLabel(subjectId) {
  const p = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : []).find(x => x.id === subjectId);
  return p ? `${p.subject} (Grade ${p.grade})` : '';
}

function _renderResumeBanner() {
  // Three slots: the dashboard, the old kid-home, and the new student-home.
  // The student-home slot gets chalk-themed markup; the other two get the
  // standard card. All live in the DOM at once - writing to every existing
  // slot is simpler than tracking which is currently visible.
  const slots = ['resume-banner-slot', 'resume-banner-slot-kidhome']
    .map(id => document.getElementById(id)).filter(Boolean);
  const shSlot = document.getElementById('resume-banner-slot-studenthome');
  const setHtml    = html => slots.forEach(s => { s.innerHTML = html; });
  const setShHtml  = html => { if (shSlot) shSlot.innerHTML = html; };
  const store = _pruneResumeStore(_readResumeStore());
  _writeResumeStore(store); // persist the prune so a stale entry doesn't keep reappearing
  const practiceEntries = Object.entries(store.practice); // [chapterId, saved][]

  if (store.exam || practiceEntries.length) {
    let title, detail, continueOnclick, dismissOnclick, extra = '', icon;

    if (store.exam) {
      const s = store.exam;
      const subj = _resumeSubjectLabel(s.subjectId);
      title  = `Continue where you left off${subj ? ` - ${subj}` : ''}`;
      detail = `${s.examType === 'quick' ? 'Quick Exam' : 'Full Exam'} · Question ${(s.idx || 0) + 1} of ${(s.qIds || []).length}`;
      continueOnclick = `_doResume('exam')`;
      dismissOnclick  = `_clearExamResume(); _renderResumeBanner();`;
      icon = '📝';
      if (practiceEntries.length) {
        extra = `+ ${practiceEntries.length} paused practice chapter${practiceEntries.length > 1 ? 's' : ''} - see Chapter Practice`;
      }
    } else {
      // Most recently paused chapter leads; the rest are still each individually
      // resumable from their own chapter-select card, this is just the shortcut.
      practiceEntries.sort((a, b) => b[1].ts - a[1].ts);
      const [chapterId, s] = practiceEntries[0];
      const subj = _resumeSubjectLabel(s.subjectId);
      const chName = (typeof CHAPTERS !== 'undefined' ? CHAPTERS : []).find(c => c.id === chapterId)?.name || 'Practice';
      title  = `Continue where you left off${subj ? ` - ${subj}` : ''}`;
      detail = `${chName} · Question ${(s.idx || 0) + 1} of ${(s.qIds || []).length}`;
      continueOnclick = `_doResume('practice','${chapterId}')`;
      dismissOnclick  = `_clearPracticeResume('${chapterId}'); _renderResumeBanner();`;
      icon = '✏️';
      if (practiceEntries.length > 1) {
        const rest = practiceEntries.length - 1;
        extra = `+ ${rest} more paused chapter${rest > 1 ? 's' : ''} - see Chapter Practice`;
      }
    }

    setHtml(`
      <div class="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-5 mb-5 text-white shadow-xl">
        <div class="flex items-center gap-4">
          <div class="text-4xl select-none shrink-0">▶️</div>
          <div class="flex-1 min-w-0">
            <div class="font-bold text-base mb-0.5">${title}</div>
            <div class="text-sm opacity-90 truncate">${detail}</div>
            ${extra ? `<div class="text-xs opacity-75 mt-1">${extra}</div>` : ''}
          </div>
        </div>
        <div class="flex gap-2 mt-4">
          <button onclick="${continueOnclick}" class="flex-1 bg-white text-green-700 font-bold py-3 rounded-xl hover:bg-green-50 transition-colors shadow text-sm">
            Continue →
          </button>
          <button onclick="${dismissOnclick}" class="px-4 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors">
            Dismiss
          </button>
        </div>
      </div>`);

    // Chalkboard-themed version for the student home board - shows ALL paused
    // sessions so a student who paused several chapters can continue any of them.
    const shItems = [];
    if (store.exam) {
      const es = store.exam;
      const eSubj = _resumeSubjectLabel(es.subjectId);
      shItems.push({
        icon: '📝',
        label: `${es.examType === 'quick' ? 'Quick Exam' : 'Full Exam'}${eSubj ? ' · ' + eSubj : ''}`,
        detail: `Question ${(es.idx || 0) + 1} of ${(es.qIds || []).length}`,
        go: `_doResume('exam')`,
        dismiss: `_clearExamResume(); _renderResumeBanner();`,
      });
    }
    practiceEntries.sort((a, b) => b[1].ts - a[1].ts).forEach(([cid, ps]) => {
      const chName = (typeof CHAPTERS !== 'undefined' ? CHAPTERS : []).find(c => c.id === cid)?.name || 'Practice';
      const pSubj  = _resumeSubjectLabel(ps.subjectId);
      shItems.push({
        icon: '✏️',
        label: `${chName}${pSubj ? ' · ' + pSubj : ''}`,
        detail: `Question ${(ps.idx || 0) + 1} of ${(ps.qIds || []).length}`,
        go: `_doResume('practice','${cid}')`,
        dismiss: `_clearPracticeResume('${cid}'); _renderResumeBanner();`,
      });
    });
    setShHtml(`
      <div class="sh-resume-card">
        <div class="sh-resume-header">📌 Pick up where you left off</div>
        <div class="sh-resume-list">
          ${shItems.map(it => `
            <div class="sh-resume-item">
              <span class="sh-resume-item-icon">${it.icon}</span>
              <div class="sh-resume-item-info">
                <span class="sh-resume-item-label">${it.label}</span>
                <span class="sh-resume-item-detail">${it.detail}</span>
              </div>
              <button onclick="${it.go}" class="sh-resume-go">▶</button>
              <button onclick="${it.dismiss}" class="sh-resume-dismiss" aria-label="Dismiss">✕</button>
            </div>`).join('')}
        </div>
      </div>`);
    return;
  }

  if (typeof DB === 'undefined' || !DB.stats || DB.stats.totalAttempted < 1) {
    setHtml('');
    setShHtml('');
    return;
  }
  // ACTIVE_PACK-dependent, so it only ever makes sense once a subject is
  // actually active - the kid-home slot renders before that's necessarily
  // true (a fresh page load may not have one set yet), and it already has
  // its own "pick a subject" prompt built into the hero, so it stays empty
  // here rather than risk pointing "Start Practice" at a stale/missing pack.
  const dashSlot = document.getElementById('resume-banner-slot');
  const kidSlot  = document.getElementById('resume-banner-slot-kidhome');
  if (kidSlot) kidSlot.innerHTML = '';
  if (shSlot) shSlot.innerHTML = '';
  if (!dashSlot) return;
  const pack = (typeof ACTIVE_PACK !== 'undefined' && ACTIVE_PACK)
    || (typeof SUBJECT_PACKS !== 'undefined' && SUBJECT_PACKS.find(p => !p.comingSoon))
    || null;
  const subjectLabel = pack ? `Grade ${pack.grade} ${pack.name}` : 'your subject';
  dashSlot.innerHTML = `
    <div class="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-5 mb-5 text-white shadow-xl">
      <div class="flex items-center gap-4">
        <div class="text-4xl select-none shrink-0">📚</div>
        <div class="flex-1">
          <div class="font-bold text-base mb-0.5">Ready to practise?</div>
          <div class="text-sm opacity-90">${subjectLabel}</div>
        </div>
      </div>
      <button onclick="PracticeHub.open()" class="w-full mt-4 bg-white text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors shadow text-sm">
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

// A hidden screen still has its buttons in the DOM, and their
// getBoundingClientRect() is all zeros - which used to pin the callout to the
// top-left corner of the viewport, pointing at nothing. Nothing gets hinted
// unless it is actually on screen and laid out.
function _hintTargetVisible(el) {
  if (!el || !el.isConnected) return false;
  if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') return false;
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.height > 0;
}

function _positionHint() {
  if (!_currentHintTarget) return;
  const callout = document.getElementById('hint-callout');
  const target  = document.getElementById(_currentHintTarget.targetId);
  if (!callout) return;
  if (!_hintTargetVisible(target) ||
      (_currentHintTarget.screen && S.currentScreen !== _currentHintTarget.screen)) {
    _hideHint();
    return;
  }

  const rect   = target.getBoundingClientRect();
  const gap    = 12;
  const margin = 8;
  const cw     = callout.offsetWidth  || 240;
  const ch     = callout.offsetHeight || 80;

  const left = Math.max(margin,
    Math.min(rect.left + rect.width / 2 - cw / 2, window.innerWidth - cw - margin));
  callout.style.left = left + 'px';

  const fitsBelow = window.innerHeight - rect.bottom >= ch + gap + margin;
  const fitsAbove = rect.top >= ch + gap + margin;
  const below     = fitsBelow || !fitsAbove;
  callout.style.top       = (below ? rect.bottom + gap : rect.top - gap - ch) + 'px';
  callout.style.transform = '';
  callout.classList.toggle('arrow-top',    below);
  callout.classList.toggle('arrow-bottom', !below);

  // Point the arrow at the middle of the target, not at a fixed 20px inset
  const arrowX = Math.max(16, Math.min(rect.left + rect.width / 2 - left, cw - 16));
  callout.style.setProperty('--hint-arrow-x', arrowX + 'px');
}

function _showHint(targetId, text, key, opts) {
  if (!opts?.ephemeral && _hintDone(key)) return;
  const screen = opts?.screen;
  if (screen && S.currentScreen !== screen) return;
  const target = document.getElementById(targetId);
  if (!_hintTargetVisible(target)) return;
  const callout = document.getElementById('hint-callout');
  const textEl  = document.getElementById('hint-callout-text');
  if (!callout || !textEl) return;

  _currentHintTarget = { key, targetId, screen, ephemeral: !!opts?.ephemeral };
  textEl.textContent = text;

  target.classList.add('hint-pulse');
  if (typeof target.scrollIntoView === 'function') {
    const r = target.getBoundingClientRect();
    if (r.top < 0 || r.bottom > window.innerHeight) {
      target.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }

  callout.classList.remove('hint-hidden');
  _positionHint();
  window.addEventListener('scroll', _positionHint, { passive: true });
  window.addEventListener('resize', _positionHint);
}

// Hide without marking the hint as seen - used when the target scrolls or
// navigates out of view, so the tip can still do its job next time.
function _hideHint() {
  const callout = document.getElementById('hint-callout');
  if (callout) callout.classList.add('hint-hidden');
  if (_currentHintTarget) {
    const t = document.getElementById(_currentHintTarget.targetId);
    if (t) t.classList.remove('hint-pulse');
    _currentHintTarget = null;
  }
  window.removeEventListener('scroll', _positionHint);
  window.removeEventListener('resize', _positionHint);
}

function _dismissHint() {
  // An ephemeral hint (the idle nudge) is a reminder, not a tutorial step, and
  // its key is unique per firing. Persisting those would write a new
  // never-read entry into localStorage every single time one appeared.
  if (_currentHintTarget && !_currentHintTarget.ephemeral) _markHintDone(_currentHintTarget.key);
  _hideHint();
}

// ══════════ IDLE NUDGE ══════════
// The one-off "Tap here to start practising" callout is only ever shown once, to
// a brand-new student, on the dashboard. But someone who has stalled on a screen
// is not necessarily new - they are just unsure which of six things to press,
// and there was nothing in the app that noticed. This watches for a stall on any
// screen with an obvious next action and gives that control a small shake plus a
// one-line prompt.
//
// Deliberate constraints, all of them there so it stays helpful and not naggy:
//   · Never during an exam or a practice question - a timed paper does not need
//     something twitching in the corner of a child's eye.
//   · Never while a modal is open; the thing to do is already on screen.
//   · Never when the parent has turned tips off, and never in a parent session.
//   · Twice per screen per page load, then that screen goes quiet for good.
//   · Calm Mode (My Settings) and the OS reduced-motion setting drop the shake
//     and keep the words - the help is the sentence, the motion is decoration.
const _IDLE_NUDGES = {
  'student-home':   { target: 'sh-notes-grid',           text: 'Tap any sticky note to get started! 📌' },
  'practice-hub':   { target: 'prac-books-grid',         text: 'Tap a subject book to start practising. 📚' },
  'subject-hub':    { target: 'sh-chapter-panel',        text: 'Tap a chapter to begin - any one is fine! ✨' },
  dashboard:        { target: 'btn-chapter-mode',        text: 'Ready when you are - tap here to practise a chapter. 📚' },
  'subject-select': { target: 'subject-cards',           text: 'Pick a subject to get started. Tap any card! 👆' },
  'grade-select':   { target: 'grade-cards',             text: 'Choose your grade to see your subjects. 🎯' },
  'student-select': { target: 'student-cards',           text: 'Tap your name to sign in. 👋' },
  'chapter-select': { target: 'chapter-grid',            text: 'Tap a chapter to start - any one of them is fine. ✨' },
  'exam-config':    { target: 'start-exam-btn',          text: 'All set? Tap here to begin your mock exam. 📝' },
  results:          { target: 'results-review',          text: 'Scroll down to see which ones you got wrong - that is the useful bit. 🔍' },
  syllabus:         { target: 'syllabus-list',           text: 'Tap a chapter to see what it covers, then practise it. 📖' },
  parent:           { target: 'pd-no-children-add-btn',  text: 'Add your child here to start tracking their revision. 👶' },
};

const _IDLE_AFTER_MS   = 15000;
const _IDLE_MAX_PER_SCREEN = 2;
let _idleTimer  = null;
let _idleCounts = {};

function _idleNudgeAllowed() {
  if (typeof _isParentSession === 'function' && _isParentSession() && S.currentScreen !== 'parent') return false;
  if (DB?.restrictions?.hintsDisabled) return false;
  // Any open modal already tells the user what to do.
  //
  // ⚠ `.fixed` is load-bearing, not decoration. A bare [id^="modal-"] also
  // matches #modal-confirm-msg, which is a text div INSIDE #modal-confirm and
  // is never given .hidden - so the plain selector matched on every single
  // page and the nudge could never fire at all. Only the full-screen overlays
  // carry `fixed inset-0`.
  return !document.querySelector('div[id^="modal-"].fixed:not(.hidden)');
}

// The nudge points at something; if that something is off screen, _showHint
// would scroll the page to it, yanking the view out from under someone who may
// simply be reading. Better to stay quiet than to grab the page.
function _inViewport(el) {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < (window.innerHeight || 0);
}

function _clearIdleNudge() {
  clearTimeout(_idleTimer);
  _idleTimer = null;
  document.querySelectorAll('.attn-nudge').forEach(el => el.classList.remove('attn-nudge'));
}

function _armIdleNudge(screenId) {
  _clearIdleNudge();
  const cfg = _IDLE_NUDGES[screenId];
  if (!cfg) return;
  if ((_idleCounts[screenId] || 0) >= _IDLE_MAX_PER_SCREEN) return;

  _idleTimer = setTimeout(() => {
    if (S.currentScreen !== screenId || !_idleNudgeAllowed()) return;
    const el = document.getElementById(cfg.target);
    if (!_hintTargetVisible(el) || !_inViewport(el)) return;

    _idleCounts[screenId] = (_idleCounts[screenId] || 0) + 1;
    el.classList.add('attn-nudge');
    // The class is removed on the next interaction (see the listeners below) or
    // when the animation's own run finishes, whichever comes first.
    setTimeout(() => el.classList.remove('attn-nudge'), 2600);

    // Reuses the existing callout, but with a per-page-load key so it is a
    // reminder rather than a one-time tutorial: _showHint refuses any key
    // already in the persisted seen-list.
    _showHint(cfg.target, cfg.text, `idle_${screenId}`, { screen: screenId, ephemeral: true });
  }, _IDLE_AFTER_MS);
}

// Pointer/key/scroll all count as "they know what they are doing". Passive and
// on the capture phase so nothing can swallow them before we see them.
['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(evt => {
  window.addEventListener(evt, () => {
    if (!_idleTimer && !document.querySelector('.attn-nudge')) return;
    _clearIdleNudge();
    _armIdleNudge(S.currentScreen);
  }, { passive: true, capture: true });
});

function _checkKidHints() {
  // renderDashboard() also runs for a parent previewing a child
  // (pdSwitchStudent -> _loginStudentRow), and a child's tip has no business
  // appearing over the parent dashboard.
  if (_isParentSession()) return;
  if (DB.restrictions?.hintsDisabled) return;
  if ((DB.stats?.totalAttempted || 0) > 0) return;
  const key = 'kid_start_' + (ACTIVE_STUDENT_ID || 'x');
  setTimeout(() => _showHint('btn-chapter-mode',
    'Tap here to start practising! Pick a chapter and get going. 🚀', key,
    { screen: 'dashboard' }), 600);
}

function _checkParentHints() {
  const students = (typeof Auth !== 'undefined' && Auth.getStudents) ? Auth.getStudents() : [];
  if (students.length === 0) {
    setTimeout(() => _showHint('pd-no-children-add-btn',
      'Start by adding your child here! Each child gets their own progress tracker. 👶',
      'parent_add_child', { screen: 'parent' }), 700);
  }
}

function _checkAssignHint() {
  const students = (typeof Auth !== 'undefined' && Auth.getStudents) ? Auth.getStudents() : [];
  if (students.length === 0) return;
  const firstId = students[0].id;
  const key = 'parent_first_assign_' + firstId;
  setTimeout(() => _showHint('pd-assign-btn',
    'Set a chapter for your child to practice - they\'ll see it when they log in! 📋',
    key, { screen: 'parent' }), 400);
}

// ── Send a child their login ────────────────────────────────────────────────
// The link carries a single-use token that expires in 48 hours, NOT the PIN.
// A PIN in a URL would be a permanent key to the account in anyone's chat
// history, and the anti-sharing session guard could never see it being used.
let _childLogin = null;   // { name, family, username, pin, url }

async function openChildLoginModal(student, pin) {
  const modal = document.getElementById('modal-child-login');
  if (!modal) return;
  const family = (typeof Auth !== 'undefined' && Auth.getFamily()) || {};
  _childLogin = {
    name:     student.display_name || student.username || 'your child',
    family:   family.family_name || '',
    username: student.username || '',
    pin:      pin || '',
    url:      '',
  };

  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('cl-child-name', _childLogin.name);
  set('cl-start-child-name', _childLogin.name);
  set('cl-family',     _childLogin.family || '-');
  set('cl-username',   _childLogin.username);
  set('cl-pin',        _childLogin.pin || 'unchanged');
  // A PIN the parent did not just type is not ours to reveal - in edit mode we
  // never see it, and it is bcrypt in the database.
  const pinRow = document.getElementById('cl-include-pin');
  if (pinRow) { pinRow.checked = false; pinRow.disabled = !_childLogin.pin; }
  set('cl-link', 'Creating link…');
  modal.classList.remove('hidden');

  const res = await Store.createStudentInvite(student.id, 48);
  if (!res?.ok) {
    // Without the link the details alone are still worth sending, so the modal
    // stays open and degrades to a details-only message.
    _childLogin.url = '';
    set('cl-link', res?.error === 'not_deployed'
      ? 'One-tap link unavailable (run supabase-schema.sql). The details below still work.'
      : 'Could not create the link - the details below still work.');
    return;
  }
  _childLogin.url = `${location.origin}${location.pathname}?join=${res.token}`;
  _refreshChildLoginPreview();
}

// Re-send from the child's panel. No PIN here: the parent's copy of it exists
// only at creation time, and the stored one is bcrypt. If they have forgotten
// it they reset it in Controls, which is the only honest answer.
function sendCurrentChildLogin() {
  const id = typeof ACTIVE_STUDENT_ID !== 'undefined' ? ACTIVE_STUDENT_ID : null;
  const student = ((typeof Auth !== 'undefined' && Auth.getStudents()) || []).find(s => s.id === id);
  if (!student) { toast('Open a child first.', 2000); return; }
  // If the parent just set/created this PIN (this tab session only - see the
  // Login tab), offer to include it. Otherwise it stays blank: a PIN nobody
  // just typed is bcrypt in the database and nowhere in plaintext to send.
  const pin = (typeof Auth !== 'undefined' && Auth.getJustSetPin) ? Auth.getJustSetPin(id) : '';
  openChildLoginModal(student, pin);
}

function _refreshChildLoginPreview() {
  const el = document.getElementById('cl-link');
  if (el && _childLogin?.url) el.textContent = _childLogin.url;
}

function _childLoginMessage() {
  if (!_childLogin) return '';
  const withPin = document.getElementById('cl-include-pin')?.checked && _childLogin.pin;
  const lines = [
    `Hi ${_childLogin.name}! Here is your PSAC Exam Practice login 📚`,
    '',
    `Family name: ${_childLogin.family}`,
    `Username: ${_childLogin.username}`,
  ];
  if (withPin) lines.push(`PIN: ${_childLogin.pin}`);
  if (_childLogin.url) {
    lines.push('', 'Or just tap this link to sign in (works once, for 48 hours):', _childLogin.url);
  }
  return lines.join('\n');
}

function closeChildLoginModal() {
  document.getElementById('modal-child-login')?.classList.add('hidden');
  _childLogin = null;
}

// First-child handoff: a parent may be holding the same tablet their child
// will use. Make that route explicit instead of expecting them to infer what
// “Switch to student mode” means from a dashboard action.
function startChildPracticeFromWelcome() {
  closeChildLoginModal();
  if (typeof Auth !== 'undefined' && Auth.switchToStudentSelect) {
    Auth.switchToStudentSelect();
  }
}

let _studentViewGuideTimer = null;

function _studentViewGuideKey() {
  const parentId = typeof Auth !== 'undefined' ? Auth.getParentProfile?.()?.id : null;
  return `psac_student_view_guide_seen:${parentId || 'device'}`;
}

function showStudentViewGuide() {
  const callout = document.getElementById('pd-student-view-callout');
  const button = document.getElementById('pd-student-view-btn');
  if (!callout || !button) return;
  // The old unscoped key is honoured so existing parents who already saw this
  // guide are not shown it again after this upgrade. New state is per parent,
  // allowing two families that share a browser to each receive their own help.
  try {
    if (localStorage.getItem('psac_student_view_guide_seen') ||
        localStorage.getItem(_studentViewGuideKey())) return;
    localStorage.setItem(_studentViewGuideKey(), '1');
  } catch (_) {}
  callout.classList.remove('hidden');
  button.classList.remove('student-view-nudge');
  // Restart the short, finite animation without leaving a constantly moving UI.
  void button.offsetWidth;
  button.classList.add('student-view-nudge');
  clearTimeout(_studentViewGuideTimer);
  _studentViewGuideTimer = setTimeout(dismissStudentViewGuide, 12000);
}

function dismissStudentViewGuide() {
  clearTimeout(_studentViewGuideTimer);
  _studentViewGuideTimer = null;
  document.getElementById('pd-student-view-callout')?.classList.add('hidden');
  document.getElementById('pd-student-view-btn')?.classList.remove('student-view-nudge');
}

function shareChildLoginWhatsApp() {
  window.open('https://wa.me/?text=' + encodeURIComponent(_childLoginMessage()), '_blank');
}

// Landing-page "share the app" button. Deliberately plain wa.me (not
// navigator.share) - unlike shareResult()/shareInvite(), this one is asked
// for by name as a WhatsApp button, and wa.me works for a visitor who isn't
// signed in yet (no referral code, no Auth dependency at all).
function _appShareText() {
  // ⚠ All 8 Grade 9 packs are live as of 2026-09-09. Keep this string, the
  //   landing page and _inviteText() (auth.js) in step — a WhatsApp message
  //   cannot be corrected once forwarded.
  return 'PSAC Exam Practice 🎓 - free, fun revision for Grades 4–6! Maths, English, French, '
    + 'Science and History & Geography, all aligned with the Mauritius MIE curriculum. XP, '
    + 'streaks and real-time parent tracking built in.\n\n'
    + '🆕 Full NCE Grade 9 coverage now live: Maths, ICT, Biology, Chemistry, Physics, '
    + 'English, French and Social & Modern Studies — all 8 subjects, '
    + 'just as the exam sets them.\n\nWorth a look:';
}

function shareAppWhatsApp() {
  const msg = `${_appShareText()}\n\n${location.origin}${location.pathname}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
}

// ── CONTACT THE ADMINS (open to anyone, signed in or not) ──────────────────
// Posts to /api/contact-message, which holds the service role and does the
// validating, the honeypot and the throttling server-side.
// ⚠ MEASURED: anon can currently INSERT into question_reports directly (policy
// "anon can insert question reports", WITH CHECK (true), plus a full grant), so
// this is the THROTTLED way in, not the only one. See CLAUDE.md → Pending.
const _CONTACT_ERRORS = {
  message_too_short: 'Please write a little more so we can understand the problem.',
  not_enough_words: 'Please describe the problem in a sentence or two so an admin can act on it.',
  too_many_links: 'That message has too many links in it. Please describe the problem in words instead.',
  too_fast: 'That was sent before the form finished loading. Please try again.',
  bad_email: 'That email address does not look right - check it, or clear it and send anyway.',
  rate_limited: 'You have already sent a few messages. Please wait about 15 minutes, or email us directly.',
  busy: 'We cannot take messages at this moment. Please try again shortly, or email psacpractice@gmail.com.',
  not_configured: 'The message service is not switched on right now. Please email psacpractice@gmail.com instead.',
  save_failed: 'We could not save your message. Please email psacpractice@gmail.com instead.',
};

// When the form was last put on screen. The server refuses anything sent in
// under 3 seconds - a person cannot type a bug report that fast, and a bot
// posts the moment it parses the page.
let _contactShownAt = 0;

// Called from showScreen('contact') - the render, per the module-state rule.
// Without it a visitor who sent a message once could never reach the form again.
function _resetContactForm() {
  _contactShownAt = Date.now();
  const form = document.getElementById('contact-form');
  const done = document.getElementById('contact-done');
  if (done) { done.innerHTML = ''; done.classList.add('hidden'); }
  if (form) form.classList.remove('hidden');
  const msg = document.getElementById('contact-message');
  if (msg) msg.value = '';
  const btn = document.getElementById('contact-submit');
  if (btn) { btn.disabled = false; btn.textContent = 'Send to the admins'; }
  const status = document.getElementById('contact-status');
  if (status) { status.textContent = ''; status.className = 'text-sm font-semibold hidden'; }
}

function _contactSay(text, ok) {
  const el = document.getElementById('contact-status');
  if (!el) return;
  el.textContent = text;
  el.className = `text-sm font-semibold ${ok ? 'text-emerald-300' : 'text-amber-300'}`;
}

async function submitContactMessage(ev) {
  if (ev && ev.preventDefault) ev.preventDefault();
  const btn  = document.getElementById('contact-submit');
  const msg  = (document.getElementById('contact-message')?.value || '').trim();
  const mail = (document.getElementById('contact-email')?.value || '').trim();
  if (msg.length < 5) {
    _contactSay(_CONTACT_ERRORS.message_too_short, false);
    document.getElementById('contact-message')?.focus();
    return;
  }

  const label = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
  _contactSay('Sending your message…', true);

  try {
    const res = await fetch('/api/contact-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type:    document.getElementById('contact-type')?.value || 'message',
        message: msg,
        name:    (document.getElementById('contact-name')?.value || '').trim(),
        email:   mail,
        website: (document.getElementById('contact-website')?.value || ''),
        elapsedMs: _contactShownAt ? Date.now() - _contactShownAt : 0,
      }),
    });
    // ⚠ An undeployed /api route answers with the SPA fallback: HTML, status
    // 404. res.json() then throws, and treating that as {} would report the
    // server's own refusal for a request no server ever saw.
    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('application/json')) {
      _contactSay(`The message service is not available here (HTTP ${res.status}). Please email psacpractice@gmail.com.`, false);
      if (btn) { btn.disabled = false; btn.textContent = label; }
      return;
    }
    const out = await res.json();
    if (!out.ok) {
      _contactSay(_CONTACT_ERRORS[out.error] || 'Could not send your message. Please email psacpractice@gmail.com instead.', false);
      if (btn) { btn.disabled = false; btn.textContent = label; }
      return;
    }
    // ⚠ HIDE the form, never overwrite it. Replacing its innerHTML left a
    // visitor who sent one message looking at the receipt for the rest of the
    // session - reopening the screen could not bring the form back.
    const form = document.getElementById('contact-form');
    const done = document.getElementById('contact-done');
    if (done) {
      done.innerHTML = `<div class="text-4xl mb-3" aria-hidden="true">✅</div>
        <p class="font-black text-lg">Message sent</p>
        <p class="mt-2 text-sm text-indigo-100 leading-relaxed">${out.replyByEmail
          ? 'An administrator will read it and reply to your email address.'
          : 'An administrator will read it. You did not leave an email address, so we have no way to reply - send another message with one if you need an answer.'}</p>
        <button type="button" onclick="_resetContactForm()" class="mt-4 text-sm font-bold text-indigo-200 hover:text-white underline">Write another message</button>`;
      done.classList.remove('hidden');
    }
    if (form) form.classList.add('hidden');
  } catch (_) {
    _contactSay('No connection. Check your internet, or email psacpractice@gmail.com.', false);
    if (btn) { btn.disabled = false; btn.textContent = label; }
  }
}

async function shareChildLogin() {
  const text = _childLoginMessage();
  if (navigator.share) {
    try { await navigator.share({ title: 'PSAC Exam Practice login', text }); return; } catch(_) { return; }
  }
  copyChildLoginMessage();
}

async function copyChildLoginMessage() {
  try {
    await navigator.clipboard.writeText(_childLoginMessage());
    toast('Message copied - paste it to your child. 📋', 2500);
  } catch(_) {
    toast('Could not copy. Select the link above and copy it manually.', 3000);
  }
}

// ── Push notifications ──────────────────────────────────────────────────────
const VAPID_PUBLIC_KEY = 'BCVzi3znFHmX6CYjtL9zO9jc0QGuPUgNACidVVETF35RpxJTu2adr3aERkKBiYLe_6iU0zxEb9PK2UL_DEXgIuQ';

function _urlB64ToUint8Array(b64) {
  const pad  = '='.repeat((4 - b64.length % 4) % 4);
  const raw  = atob(b64.replace(/-/g, '+').replace(/_/g, '/') + pad);
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
}

// push-subscribe holds the service-role key, so it verifies that the caller
// actually owns the studentId in the payload before touching the row. Send
// whichever credentials this device has: a student proves ownership with the
// session token, a parent with their Supabase JWT. Both are sent when both
// exist - the function accepts either, and which one is valid depends on who
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
    // ⚠ A subscription is bound to the applicationServerKey it was created
    //   with. After a VAPID rotation an OLD subscription still exists and still
    //   looks valid here, so `if (!sub)` alone would keep re-sending a dead one
    //   forever — the server can only answer 403 VapidPkHashMismatch, which is
    //   not a code anything prunes on. Compare the key and re-subscribe when it
    //   has moved. Measured: 2 live subscriptions were created under the key
    //   that leaked in git history (dba9b8e) and had to be replaced.
    // ⚠ Only drop the old one when it can be replaced IMMEDIATELY. Permission
    //   is already 'granted' for a device that is subscribed, so
    //   pushManager.subscribe() needs no gesture and cannot fail for want of
    //   one — but unsubscribing first and then hitting the `!prompt` guard
    //   below would leave the device with NO subscription at all, which is
    //   worse than the stale one it started with.
    let stale = false;
    if (sub) {
      const want = _urlB64ToUint8Array(VAPID_PUBLIC_KEY);
      const have = new Uint8Array(sub.options?.applicationServerKey || new ArrayBuffer(0));
      stale = !(have.length === want.length && have.every((b, i) => b === want[i]));
      if (stale && Notification.permission === 'granted') {
        try { await sub.unsubscribe(); } catch (_) {}
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: want,
        });
      }
    }
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
  if (!_hapticEnabled) return;
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

// ── Voice list ────────────────────────────────
// ⚠ speechSynthesis.getVoices() is EMPTY on first call in Chrome (desktop and
// Android): the list is fetched asynchronously and only announced via
// `voiceschanged`. Reading it at the moment the child taps 🔊 therefore returned
// [] for the first tap after every page load, no voice was chosen, and the
// engine fell back to its default - an English voice reading French.
//
// So the list is warmed at load and kept current, rather than asked for at the
// worst possible moment. Nothing is deferred: the tap still calls speak()
// synchronously inside the user gesture, which is what iOS requires.
let _ttsVoices = [];
function _refreshTtsVoices() {
  try { _ttsVoices = window.speechSynthesis.getVoices() || []; } catch (_) { _ttsVoices = []; }
}
if (typeof window !== 'undefined' && window.speechSynthesis) {
  _refreshTtsVoices();
  // addEventListener where it exists; onvoiceschanged is the only hook in older
  // Safari. Assigning both is safe - the property form simply never fires there.
  try { window.speechSynthesis.addEventListener('voiceschanged', _refreshTtsVoices); } catch (_) {}
  if (!window.speechSynthesis.onvoiceschanged) window.speechSynthesis.onvoiceschanged = _refreshTtsVoices;
}

// Best voice for a language tag. An exact region match first (fr-FR over fr-CA
// for a Mauritian child, whose French is metropolitan), then any voice for the
// language, then nothing - in which case utt.lang is the only hint left and
// some engines will ignore it.
// ⚠ LOCAL FIRST inside each match tier. Chrome's "Google <language>" voices are
// `localService: false` - they are synthesised on Google's servers and the audio
// is fetched before playback can begin, which is a visible pause between the tap
// and the first word, and on a phone on mobile data a long one. Measured on this
// machine: _pickVoice('fr-FR') chose "Google français" (remote) while three
// local voices sat unused. Language accuracy still outranks latency, so the tier
// order is unchanged - locality only decides WITHIN a tier.
function _pickVoice(lang) {
  const voices = _ttsVoices.length ? _ttsVoices : (() => { _refreshTtsVoices(); return _ttsVoices; })();
  if (!voices.length) return null;
  const norm = v => (v.lang || '').replace('_', '-').toLowerCase();
  const want = lang.toLowerCase();
  const base = want.slice(0, 2);
  const tiers = [
    v => norm(v) === want,
    v => norm(v).startsWith(base + '-'),
    v => norm(v).startsWith(base),
  ];
  for (const match of tiers) {
    const hit = voices.filter(match);
    if (hit.length) return hit.find(v => v.localService) || hit[0];
  }
  return null;
}

// A stacked fraction is a column flexbox, so innerText reads "1" then "5" and
// the read-aloud button said "one five". Every .frac carries the spoken form in
// data-tts (written by _prettyMath); swap it in on a CLONE so the question the
// child is looking at is not touched.
// ⚠ A TABLE READ IN DOCUMENT ORDER IS NOT A SENTENCE. A frequency table
// linearises to "Fruits chosen Pupils 1 5 2 7 3 4" - the child hears eight
// numbers and no way to pair them with their headings, on exactly the
// questions where the table IS the question. Data questions used to spell
// their table out in prose, which spoke perfectly and taught nothing; drawing
// the table fixed the reading and broke the listening. So the clone rewrites
// each row as "heading cell, heading cell", which is what a person reading a
// table aloud to a child actually says.
// ⚠ Header cells come from the FIRST row that has any <th>, not from a
// <thead> - most question tables in the bank have no <thead> at all.
function _ttsTable(table) {
  const rows = Array.from(table.rows || []);
  if (!rows.length) return '';
  const cellText = c => (c.textContent || '').replace(/\s+/g, ' ').trim();
  const headRow = rows.find(r => r.querySelector('th'));
  const heads = headRow ? Array.from(headRow.cells).map(cellText) : [];
  const out = [];
  for (const row of rows) {
    if (row === headRow) continue;
    const cells = Array.from(row.cells).map(cellText);
    if (!cells.join('')) continue;
    // With no headings there is nothing to pair, so read the cells plainly
    // rather than inventing labels for them.
    out.push(cells.map((c, i) => (heads[i] ? heads[i] + ' ' + c : c)).join(', '));
  }
  return out.join('. ');
}

function _ttsText(el) {
  if (!el) return '';
  let src = el;
  try {
    if (el.querySelector('.frac[data-tts]') || el.querySelector('table')) {
      src = el.cloneNode(true);
      src.querySelectorAll('.frac[data-tts]').forEach(f => {
        f.replaceWith(document.createTextNode(' ' + f.dataset.tts + ' '));
      });
      src.querySelectorAll('table').forEach(t => {
        t.replaceWith(document.createTextNode('. ' + _ttsTable(t) + '. '));
      });
      // innerText needs a laid-out node; a detached clone only has textContent.
      // A table stands in as its own sentence and brings a full stop with it, so
      // collapse the pair when the text in front of it already ended in one.
      return (src.textContent || '').replace(/\s+/g, ' ').replace(/\.\s*\./g, '.').trim();
    }
  } catch (_) {}
  return (src.innerText || src.textContent || '').trim();
}

// ⚠ A run of underscores, dots or ellipses is a BLANK to a reader and a
// disaster to a speech engine: fr-FR reads "___" as "tiret bas tiret bas tiret
// bas", so a child completing « Le chat est ___ la table » hears the gap
// announced three times in a row and never hears the sentence. Measured across
// the bank: 3,188 underscore runs, ~600 dot runs (« ................ ») and
// runs of « ……………… ». They collapse to ONE word in the utterance's own
// language, wrapped in commas so the engine leaves a real pause around it.
// ⚠ Thresholds are deliberate. A single "…" is prose trailing off (1,419 of
// them, "A library is a place where people can…") and "..." likewise, so only
// a RUN counts. A single underscore can sit inside a maths variable.
// ⚠ NOT "trou". It was the pedagogically obvious word - the exercises are
// literally "Textes à Trous" - and it is the wrong word to say out loud to a
// child in Mauritius, where it carries a vulgar reading. A hum has neither
// problem and cannot be mistaken for the answer either: a child hearing
// "Le chat est, blanc, la table" may well write "blanc".
// ⚠ Both are ordinary interjections in their own language, so an engine
// pronounces them rather than spelling them out. Change them here, in one
// place, if a voice renders one badly.
const _TTS_BLANK = { fr: 'hum', en: 'hmm' };
function _ttsBlanks(text, lang) {
  const word = _TTS_BLANK[(lang || 'en').slice(0, 2)] || _TTS_BLANK.en;
  return String(text)
    // Leading \s* absorbs the space before the gap, or "est ___ la" becomes
    // "est , trou, la" and the engine reads the stray comma as its own beat.
    .replace(/\s*(?:_{2,}|\.{4,}|…{2,})\s*/g, ', ' + word + ', ')
    .replace(/\s*,(?:\s*,)+/g, ',')
    .replace(/\s{2,}/g, ' ')
    .replace(/^\s*,\s*/, '')
    .trim();
}

// ⚠ An engine prepares a WHOLE utterance before it plays a word of it, and a
// remote voice fetches that audio over the network first, so a long
// comprehension question has a long silent head between the tap and the first
// word. Splitting on sentence boundaries makes the FIRST utterance short, so
// playback starts while the rest is still being prepared - and it gives a
// Grade 1 child a real pause between sentences, which they need anyway.
// ⚠ No lookbehind: `(?<=[.!?])` is a PARSE error on Safari < 16.4 and would
// take this whole file down, not just read-aloud.
// ⚠ Merged forward by WORD COUNT, not by length. A character threshold ate
// "Lis le texte." - a real instruction sentence, and exactly the short opener
// worth speaking first. Only a 1-2 word fragment ("M.", "2.", "Ex.") is a
// stutter rather than a pause.
function _ttsSentences(text) {
  const raw = String(text).match(/[^.!?…]+[.!?…]*\s*/g) || [text];
  const words = s => (s.match(/\S+/g) || []).length;
  const out = [];
  raw.forEach(piece => {
    const bit = piece.trim();
    if (!bit) return;
    if (out.length && words(out[out.length - 1]) < 3) out[out.length - 1] += ' ' + bit;
    else out.push(bit);
  });
  return out.length ? out : [String(text).trim()];
}

// The child follows the audio with their eyes: the option being spoken carries
// .tts-reading until its utterance ends. Cleared by selector, not by a held
// reference - the answer area re-renders on submit, on Prev, and on every new
// question, and a reference to a detached button cannot untick anything.
function _ttsClearHighlight() {
  document.querySelectorAll('.tts-reading').forEach(el => el.classList.remove('tts-reading'));
}

// Anything that changes what is on screen calls this. Speech outlives the DOM
// that started it: without this, tapping Next left the previous question's
// options being read aloud under the new one.
function _ttsStop() {
  _ttsSpeaking = false;
  _ttsClearHighlight();
  try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (_) {}
}

// ⚠ Warned ONCE per session, not per tap. With no French voice installed the
// engine reads French with whatever it has - "l'école" in an English accent -
// and the child has no way to know the app is not simply wrong. utt.lang is
// still set: some engines honour it without exposing a voice.
let _ttsNoVoiceWarned = false;
function _ttsApplyVoice(utt, lang) {
  utt.lang = lang;
  try {
    const voice = _pickVoice(lang);
    if (voice) { utt.voice = voice; return; }
    if (lang.slice(0, 2) === 'fr' && !_ttsNoVoiceWarned) {
      _ttsNoVoiceWarned = true;
      toast('No French voice is installed on this device, so the reading may sound English.', 4500);
    }
  } catch (_) {}
}

// ⚠ Every utterance is queued SYNCHRONOUSLY inside the tap. Chaining them from
// onend instead means the second speak() happens outside the user gesture,
// which iOS refuses silently - the question reads and the options never do.
function speakQuestion(mode) {
  if (!window.speechSynthesis) { toast('Text-to-speech not supported on this browser.', 2500); return; }
  const elId = mode === 'exam' ? 'exam-q-text' : 'practice-q-text';
  const el   = document.getElementById(elId);
  if (!el) return;
  const text = _ttsText(el);
  if (!text) return;
  // ⚠ Self-heal before trusting the flag. onend is not guaranteed - a cancelled
  // or engine-dropped utterance can leave _ttsSpeaking stuck true, and the
  // button then only ever stops something that finished long ago, so the child
  // has to tap twice to hear anything. `=== false` on purpose: an engine that
  // does not expose .speaking must keep the plain toggle.
  if (_ttsSpeaking && speechSynthesis.speaking === false) _ttsSpeaking = false;
  if (_ttsSpeaking) { _ttsStop(); return; }

  const lang  = _ttsLang();
  const parts = _ttsSentences(_ttsBlanks(text, lang)).map(s => ({ text: s, el: null }));

  // Practice only, and deliberately: reading the choices aloud in an exam
  // would hand a child sitting a timed paper something the paper does not.
  // ⚠ Options are read for MCQ-shaped answers only. A numeric pad, a typed
  // box or a cloze passage has no options to read, and the letters would be
  // announced over nothing.
  if (mode !== 'exam') {
    const opts = document.querySelectorAll('#practice-answer-area .mcq-opt');
    opts.forEach((opt, i) => {
      const label = _ttsText(opt.querySelector('span:last-child')) || _ttsText(opt);
      if (!label) return;
      // The letter maps the audio to the button a child is looking at. Under
      // fr-FR the engine reads it as a French letter name, which is why it is
      // a separate leading word rather than "A)" glued to the option.
      parts.push({ text: String.fromCharCode(65 + i) + '. ' + _ttsBlanks(label, lang), el: opt });
    });
  }

  // ⚠ Only cancel when there is something TO cancel. An unconditional
  // cancel() immediately followed by speak() is a documented Chrome stall: the
  // queue teardown races the new utterance, and the first one is delayed or
  // dropped outright. Nothing is speaking on the common path - the child tapped
  // 🔊 on a fresh question - so the usual case now skips it entirely.
  if (speechSynthesis.speaking || speechSynthesis.pending) speechSynthesis.cancel();
  _ttsClearHighlight();
  _ttsSpeaking = true;
  const last = parts.length - 1;
  parts.forEach((part, i) => {
    const utt = new SpeechSynthesisUtterance(part.text);
    utt.rate  = 0.88;
    _ttsApplyVoice(utt, lang);
    utt.onstart = () => { _ttsClearHighlight(); if (part.el) part.el.classList.add('tts-reading'); };
    const done = () => {
      if (part.el) part.el.classList.remove('tts-reading');
      if (i === last) _ttsSpeaking = false;
    };
    utt.onend   = done;
    utt.onerror = () => { done(); _ttsStop(); };
    speechSynthesis.speak(utt);
  });
}

// ── Mobile: Share exam result ───────────────────────────────────────────────
async function shareResult() {
  const score   = document.getElementById('result-score')?.textContent  || '';
  const grade   = document.getElementById('result-grade')?.textContent  || '';
  const details = document.getElementById('result-details')?.textContent || '';
  const text    = `I scored ${score} (${grade}) on my PSAC Practice exam! ${details} 📚`;
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
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), dur);
}

// ── DIALOG SEMANTICS FOR EVERY #modal-* OVERLAY ─────────────────
// 26 modals are opened from 15 call sites in four files, all by toggling
// .hidden on a fixed inset-0 wrapper, and 23 of them declared no role, none
// trapped focus, none returned it, and 5 closed on Escape. Rather than touch
// every call site, this watches the class attribute of any #modal-* overlay and
// applies the dialog contract when it opens or closes:
//   - role="dialog" aria-modal="true" on the panel, labelled by its first heading
//   - focus moves INTO the dialog (the opener's own .focus(), if any, wins)
//   - Tab / Shift+Tab cycle inside it
//   - Escape closes it through the modal's OWN close control (a backdrop-tap
//     handler, a ✕, or a Cancel/Close/Not now button) - never by hiding the
//     wrapper directly, so whatever cleanup that control does still runs
//   - focus returns to the element that opened it
// A modal with its own Escape handler (student switch, parent PIN) closes once
// through that handler; the extra click here lands on an already-hidden
// control and does nothing.
const _Dialogs = (() => {
  const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const CLOSE_RX = /^(✕|×|✖|❌)|^(close|cancel|not now|later|maybe later|no thanks|got it|ok|okay|done|dismiss|skip)\b/i;
  const stack = [];
  const isOverlay = el => el.nodeType === 1 && /^modal-/.test(el.id || '') && el.classList.contains('fixed') && el.classList.contains('inset-0');
  const visible = el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const focusables = m => [...m.querySelectorAll(FOCUSABLE)].filter(visible);
  const panelOf = m => m.firstElementChild || m;

  function opened(m) {
    if (stack.some(s => s.el === m)) return;
    const panel = panelOf(m);
    if (!panel.hasAttribute('role')) panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    if (!panel.hasAttribute('aria-labelledby') && !panel.hasAttribute('aria-label')) {
      const h = panel.querySelector('h1, h2, h3, h4, [id$="-title"], [id$="-msg"]');
      if (h) { if (!h.id) h.id = m.id + '-title'; panel.setAttribute('aria-labelledby', h.id); }
    }
    if (!panel.hasAttribute('tabindex')) panel.setAttribute('tabindex', '-1');
    stack.push({ el: m, opener: document.activeElement });
    setTimeout(() => {
      if (m.classList.contains('hidden') || m.contains(document.activeElement)) return;
      const f = focusables(m);
      try { (f[0] || panel).focus({ preventScroll: true }); } catch (_) {}
    }, 0);
    _labelUnlabelledFields(m);
  }

  function closed(m) {
    const i = stack.findIndex(s => s.el === m);
    if (i === -1) return;
    const [{ opener }] = stack.splice(i, 1);
    if (stack.length) return;
    if (opener && opener !== document.body && document.contains(opener) && visible(opener)) {
      try { opener.focus({ preventScroll: true }); } catch (_) {}
    }
  }

  function closeControl(m) {
    const explicit = m.querySelector('[data-close], [aria-label="Close"], [aria-label="close"], [title="Close"]');
    if (explicit) return explicit;
    const btns = [...m.querySelectorAll('button, a')].filter(visible);
    return btns.find(b => CLOSE_RX.test((b.getAttribute('aria-label') || b.textContent || '').trim())) || null;
  }

  function onKey(e) {
    const top = stack.length ? stack[stack.length - 1] : null;
    if (!top || top.el.classList.contains('hidden')) return;
    const m = top.el;
    if (e.key === 'Escape') {
      const c = closeControl(m);
      if (c) { c.click(); e.preventDefault(); }
      else if (typeof m.onclick === 'function') { m.click(); e.preventDefault(); }
      return;
    }
    if (e.key !== 'Tab') return;
    const f = focusables(m);
    if (!f.length) { e.preventDefault(); return; }
    const first = f[0], last = f[f.length - 1], cur = document.activeElement;
    if (!m.contains(cur)) { e.preventDefault(); (e.shiftKey ? last : first).focus(); return; }
    if (e.shiftKey && cur === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && cur === last) { e.preventDefault(); first.focus(); }
  }

  function watch() {
    if (!window.MutationObserver) return;
    new MutationObserver(recs => {
      for (const r of recs) {
        const el = r.target;
        if (!isOverlay(el)) continue;
        const hidden = el.classList.contains('hidden');
        const was = stack.some(s => s.el === el);
        if (!hidden && !was) opened(el);
        else if (hidden && was) closed(el);
      }
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'], subtree: true });
    document.addEventListener('keydown', onKey, true);
    document.querySelectorAll('[id^="modal-"]').forEach(el => { if (isOverlay(el) && !el.classList.contains('hidden')) opened(el); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watch);
  else watch();
  return { _stack: stack, _closeControl: closeControl };
})();

// ── CONFIRM MODAL (replaces browser confirm() dialogs) ───────────
let _confirmCallback = null;
function _confirmModal(msg, onConfirm, { icon = '⚠️', okLabel = 'Confirm', danger = true, cancelLabel = 'Cancel' } = {}) {
  const m = document.getElementById('modal-confirm');
  if (!m) { if (onConfirm && confirm(msg)) onConfirm(); return; } // fallback
  document.getElementById('modal-confirm-msg').textContent  = msg;
  document.getElementById('modal-confirm-icon').textContent = icon;
  const okBtn = document.getElementById('modal-confirm-ok');
  if (okBtn) { okBtn.textContent = okLabel; okBtn.className = danger ? 'btn-danger flex-1 text-sm' : 'btn-primary flex-1 text-sm'; }
  // Reset every time: a plan-cap modal renames this to "OK", and without a
  // reset the next genuine destructive confirm would offer "OK" / "Delete".
  const cancelBtn = document.getElementById('modal-confirm-cancel');
  if (cancelBtn) {
    cancelBtn.textContent = cancelLabel;
    // An empty label means "this is a notice, not a choice" - otherwise the
    // dialog shows a blank second button next to the only real one.
    cancelBtn.classList.toggle('hidden', !cancelLabel);
  }
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

// ⚠ 'practice' is deliberately absent. With the tab bar AND the fixed
// Check/Next bar both on screen, the bottom 155px of a 740px phone was chrome:
// two of four options were hidden on first paint and the explanation landed
// under the bars after Check (measured, not reasoned). The practice screen has
// its own way out (← Chapters, Pause), and the tab bar returns on the next screen.
const _BOTTOM_NAV_SCREENS = new Set([
  'student-home','dashboard','subject-select','chapter-select',
  'exam','exam-config','analytics','results',
  // screens reachable via sticky notes that previously hid the nav
  'schedule','inbox','search','interactive-map','syllabus','past-papers',
  'assignment-complete',
  // new chalkboard practice flow
  'practice-hub','subject-hub','cloze-list','cloze-play',
  'leaderboard',
]);
const _NAV_MAP = {
  'student-home':'home','dashboard':'home',
  'subject-select':'practice','chapter-select':'practice','syllabus':'practice',
  'interactive-map':'practice','past-papers':'practice','search':'practice',
  'practice':'practice','cloze-list':'practice','cloze-play':'practice',
  'practice-hub':'practice','subject-hub':'practice',
  'exam-config':'exam','exam':'exam','results':'exam',
  'analytics':'progress','leaderboard':'progress',
  'schedule':'home','inbox':'home','assignment-complete':'home',
};

function _updateBottomNav(screenId) {
  const nav = document.getElementById('student-bottom-nav');
  if (!nav) return;
  const show = _BOTTOM_NAV_SCREENS.has(screenId) && (typeof ACTIVE_STUDENT_ID !== 'undefined') && !!ACTIVE_STUDENT_ID;
  nav.classList.toggle('hidden', !show);
  document.body.classList.toggle('has-bottom-nav', show);
  const active = _NAV_MAP[screenId];
  nav.querySelectorAll('.tabbar-btn').forEach(btn => btn.classList.toggle('nav-active', btn.dataset.nav === active));
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

// Screens that only make sense for someone actually studying: they read/write
// SELECTED_GRADE, ACTIVE_PACK and CHAPTERS. A signed-in PARENT (with or
// without a child currently previewed via Auth.pdSwitchStudent) has no
// business in any of them - previewing loads that child's progress into DB
// exactly like a real login, so the Parent Dashboard's own tabs have
// something to read, but deliberately never touches those three globals,
// because the preview is meant to stay inside the Parent Dashboard. Gating
// this on "is a child currently previewed" was the first version of this fix
// and it was still wrong: a parent with NO child open yet (fresh into Parent
// Dashboard, nothing clicked) could still tap the header's Stats icon and
// land here. The only question that matters is "is this a parent session at
// all" - _isParentSession() alone, full stop. Any button that lands here
// anyway (the Analytics screen's own "← Back", a dashboard tile, a bottom-nav
// tab...) used to render garbage instead: whatever grade/subject was left
// over from an earlier session, matched against whatever child's progress (or
// none) happened to be loaded - "0% mastery" on every chapter of a subject
// nobody was ever studying. Patching each button was a losing game (there are
// a dozen entry points into these screens); this catches all of them at once.
const _KID_ONLY_SCREENS = new Set([
  'student-home', 'dashboard', 'chapter-select', 'syllabus', 'interactive-map', 'past-papers', 'analytics',
  'subject-select', 'grade-select', 'practice', 'exam-config', 'exam',
  'results', 'assignment-complete', 'search', 'schedule', 'inbox',
  'practice-hub', 'subject-hub', 'cloze-list', 'cloze-play',
]);
// Screens only an adult session may open. See the guard in showScreen().
const _ADULT_ONLY_SCREENS = new Set(['forum', 'parent-messages', 'teacher']);

// ── Returning a child to where they were after a full refresh ─────────────
// showScreen() already records `psac-last-screen`, and auth.js already restores
// a game (minigames) and an in-flight round (practice/exam) from it. Everything
// else fell through to the student home hub, so refreshing while browsing a
// subject's chapters read as being thrown out of the subject - even though the
// pack itself had already been restored two lines earlier in that same block.
//
// ⚠ ALLOWLIST, not a denylist. A screen may only be restored if it repaints
// itself from stored state on the way in: `subject-hub` and `practice-hub` do
// that through their own modules, the rest through the render dispatch at the
// foot of showScreen(). `search`, `cloze-play` and `results` are deliberately
// absent - they are painted by whatever opened them, so restoring one shows an
// empty panel or the previous round's answers.
const _REFRESH_RESTORE_SCREENS = new Set([
  'subject-hub', 'practice-hub', 'chapter-select', 'subject-select', 'dashboard',
  'syllabus', 'analytics', 'schedule', 'inbox', 'past-papers', 'interactive-map',
]);
// These paint from CHAPTERS / ACTIVE_PACK. Without a restored pack they open
// empty, and an empty chapter list is worse than the hub.
const _PACK_DEPENDENT_SCREENS = new Set(['subject-hub', 'chapter-select', 'syllabus']);

// Returns true only if it actually put the child somewhere. Every caller must
// fall back to the hub on false - never assume this succeeded.
async function restoreKidScreen(id, packId) {
  if (!id || !_REFRESH_RESTORE_SCREENS.has(id)) return false;
  if (_PACK_DEPENDENT_SCREENS.has(id) && !packId) return false;
  try {
    // SubjectHub.open() re-ensures the pack and repaints before showing, which
    // is exactly what a cold restore needs; showScreen() alone would leave the
    // chapter grid holding the previous subject.
    if (id === 'subject-hub') {
      if (typeof SubjectHub === 'undefined') return false;
      await SubjectHub.open(packId);
      return true;
    }
    if (id === 'practice-hub') {
      if (typeof PracticeHub === 'undefined') return false;
      PracticeHub.open();
      return true;
    }
    showScreen(id);
    return true;
  } catch (e) { return false; }
}

function _isParentContext() {
  return !!(typeof _isParentSession === 'function' && _isParentSession());
}
function _updateTeacherModeButton() {
  const btn = document.getElementById('btn-open-teacher');
  if (!btn) return;
  const allowed = _isParentContext() && typeof Auth !== 'undefined' && Auth.isTeacher();
  btn.classList.toggle('hidden', !allowed);
  btn.classList.toggle('flex', !!allowed);
}
function _returnToParentDashboard() {
  const id = ACTIVE_STUDENT_ID;
  showScreen('parent');
  if (id) {
    if (typeof PD !== 'undefined') PD.selectChild(id);
  } else if (typeof toast === 'function') {
    // Nothing to preview - e.g. Stats tapped before any child card was
    // opened. Land on the grid rather than silently doing nothing.
    toast('Open a child to see their stats.', 2000);
  }
}

function showScreen(id) {
  // Speech outlives the screen that started it - leaving a chapter mid-reading
  // carried the options into whatever came next.
  if (typeof _ttsStop === 'function') _ttsStop();
  if (_KID_ONLY_SCREENS.has(id) && _isParentContext()) {
    _returnToParentDashboard();
    return;
  }

  // Screens that are now rendered inline inside the parent dashboard board frame.
  // When the parent dashboard is the current screen, redirect to the inline tab
  // instead of navigating away. showScreen('parent') is the reset path - let it
  // through so renderParentDashboard() can restore the children panel.
  if (id !== 'parent' && typeof PD !== 'undefined') {
    const _pdInlineMap = { 'shop': 'shop', 'calendar': 'calendar', 'parent-messages': 'messages' };
    if (_pdInlineMap[id] && !document.getElementById('screen-parent')?.classList.contains('hidden')) {
      PD.mainTab(_pdInlineMap[id]);
      return;
    }
  }

  // ── Adult-only screens ──
  // The mirror of _KID_ONLY_SCREENS above. The forum is for parents and
  // teachers: children do not need it, and a community board is not something
  // to hand a nine-year-old alongside their homework.
  //
  // ⚠ This is the UI half only. The half that counts is the RLS in
  // supabase-schema.sql - before it, `posts_read` was `USING (true)` and
  // `posts_insert` explicitly allowed `current_student_id() IS NOT NULL`, so a
  // child could read AND post. Hiding the button would have hidden a door that
  // was still unlocked.
  if (_ADULT_ONLY_SCREENS.has(id) && !_isParentContext()) {
    toast(id === 'forum' ? 'The community forum is for parents and teachers.' : 'This section is for parents and teachers.', 3000);
    showScreen(ACTIVE_STUDENT_ID ? 'student-home' : 'landing');
    return;
  }

  // Plan-gated screens are stopped HERE rather than at each button, because
  // analytics has two entry points (the dashboard tile and the bottom-nav
  // Progress button) and any third one added later gets the gate for free.
  const _gate = _PLAN_GATED_SCREENS[id];
  if (_gate && !_planAllowsFeature(_gate)) { _showFeatureModal(_gate); return; }

  // Dismiss any floating hint callout on navigation
  const _hc = document.getElementById('hint-callout');
  if (_hc && !_hc.classList.contains('hint-hidden')) _dismissHint();

  // A menu row that navigates leaves the sheet sitting over the new screen
  // otherwise. Belt and braces - the row handler closes it too, but Logout and
  // the parent-mode switch also route through here from other places.
  if (typeof closeHeaderMenu === 'function') closeHeaderMenu();

  // ⚠ #tc-classroom-detail is a full-page overlay that is NOT a .screen, so
  // the loop below never touches it. A teacher with a classroom open who
  // tapped 🔒 Parent got the parent dashboard rendered UNDERNEATH a 1394x900
  // panel, with document.body.style.overflow still locked to 'hidden' so the
  // page could not even be scrolled. Measured, not guessed. It is the same
  // defect that stranded #admin-tab-questions outside #screen-admin.
  // ⚠ Hide it, but do NOT call TeacherClassroomDetail.close(): that clears the
  // remembered classroom, and returning to teacher mode is supposed to restore
  // exactly where the teacher was (psac_teacher_loc_v1). Navigating INTO
  // teacher mode is left alone for the same reason.
  if (id !== 'teacher') {
    const _tcd = document.getElementById('tc-classroom-detail');
    if (_tcd && !_tcd.classList.contains('hidden')) {
      _tcd.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

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
    // Authentication re-hydrates asynchronously after a full refresh. Keep the
    // user's last real workspace so that flow can return them there afterwards.
    // Entry/lock screens are deliberately excluded: restoring one of those can
    // bypass a sign-in or leave a valid session looking logged out.
    if (!['landing', 'auth', 'verify-email', 'reset-password', 'biometric-lock'].includes(id)) {
      try {
        sessionStorage.setItem('psac-last-screen', id);
        // ⚠ WHOSE screen it was. This key is per device, and a phone is shared
        // between siblings - without the owner, child B refreshing after child
        // A would be dropped into A's subject. The pack key beside it
        // (psac-active-subject:<id>) has been child-scoped from the start for
        // exactly this reason. The minigames and practice/exam restores need no
        // such check: both resolve their state through ACTIVE_STUDENT_ID and so
        // are already scoped downstream.
        sessionStorage.setItem('psac-last-screen-owner',
          (typeof ACTIVE_STUDENT_ID !== 'undefined' && ACTIVE_STUDENT_ID) ? String(ACTIVE_STUDENT_ID) : '');
      } catch (_) {}
    }
  }
  const _screenChanged = _prevScreen !== id;
  _prevScreen = id;
  _updateBottomNav(id);
  if (_currentHintTarget && _currentHintTarget.screen !== id) _hideHint();
  if (sc && _screenChanged) _focusScreen(sc);

  // Hide header on full-page assignment screens
  const hideHeader = sc?.dataset?.hideHeader === 'true';
  const hdr = document.querySelector('header');
  if (hdr) hdr.classList.toggle('hidden', hideHeader);

  // Show logout button + profile chip in header on all screens except auth/landing
  // Two logout buttons, one rule. #header-logout-btn is the labelled pill shown
  // from 1100px up; #header-logout-mobile is its always-visible twin below that
  // (see the comment on it in index.html). Whether EITHER is on screen is
  // decided by width in CSS - this only decides whether logging out makes sense
  // at all, which is a property of the screen, not the viewport.
  {
    const isAuthScreen = ['landing','auth','verify-email','reset-password','family-setup'].includes(id);
    ['header-logout-btn', 'header-logout-mobile'].forEach(bid => {
      const b = document.getElementById(bid);
      if (!b) return;
      b.classList.toggle('hidden', isAuthScreen);
      b.classList.toggle('flex',  !isAuthScreen);
    });
  }
  _updateTeacherModeButton();
  // Student home has its own parent-mode button in the sh-header just above
  // the board - the global header one is redundant there only. Similarly, the
  // settings (profile) and theme buttons are replicated below the board, so the
  // header copies hide on that screen.
  const onStudentHome = id === 'student-home';
  const hdrParentBtn = document.querySelector('.hdr-btn.is-parent');
  if (hdrParentBtn) hdrParentBtn.classList.toggle('hidden', onStudentHome);
  const hdrProfileBtn = document.getElementById('header-profile-btn');
  if (hdrProfileBtn) hdrProfileBtn.classList.toggle('hidden', onStudentHome);
  const hdrThemeBtn = document.getElementById('theme-toggle');
  if (hdrThemeBtn) hdrThemeBtn.classList.toggle('hidden', onStudentHome);
  // Forum: adult sessions only, same rule the screen guard applies.
  const forumBtn = document.getElementById('btn-open-forum');
  if (forumBtn) {
    const adult = _isParentContext();
    forumBtn.classList.toggle('hidden', !adult);
    forumBtn.classList.toggle('flex',    adult);
  }

  const profileBtn = document.getElementById('header-profile-btn');
  if (profileBtn) {
    const isAuthSc   = ['landing','auth','verify-email','reset-password','family-setup'].includes(id);
    const isLoggedIn = !!(ACTIVE_STUDENT_ID || (typeof Auth !== 'undefined' && Auth.getParentProfile()));
    profileBtn.classList.toggle('hidden', isAuthSc || !isLoggedIn);
    profileBtn.classList.toggle('flex',   !isAuthSc && isLoggedIn);
  }

  _updateBreadcrumb(id);
  _applyPlanGates(id);
  // Not awaited, and failure is silent: the markup ships with real prices in
  // it, so a slow or unreachable database just leaves those on screen.
  if (id === 'landing')         hydrateLandingPrices();
  if (id === 'contact')         _resetContactForm();
  if (id === 'dashboard')       renderDashboard();
  if (id === 'schedule')        renderSchedule();
  if (id === 'analytics')       renderAnalytics();
  if (id === 'leaderboard')     renderGlobalLeaderboard();
  if (id === 'inbox')           renderStudentInbox();
  if (id === 'minigames' && typeof MiniGames !== 'undefined') MiniGames.renderHub();
  if (id === 'chapter-select')  renderChapterSelect();
  if (id === 'syllabus')        renderSyllabus();
  if (id === 'interactive-map') renderInteractiveMap();
  if (id === 'past-papers')     renderPastPapers();
  if (id === 'parent')          renderParentDashboard();
  if (id === 'parent-messages') renderParentMessages();
  if (id === 'shop')            renderShop();
  if (id === 'subject-select')  renderSubjectSelect();
  if (id === 'student-select')  renderStudentSelect();
  if (id === 'grade-select')    renderGradeSelect();
  // ⚠ These two are fetched on demand (RoleModules), so the render has to wait
  //   for the code. showScreen stays SYNCHRONOUS - it is called from everywhere
  //   and dozens of callers focus a field or read the DOM straight afterwards -
  //   so the screen is shown now and fills in when its module lands, exactly as
  //   a lazily-loaded subject pack does. On a repeat visit the module is already
  //   there and withGroup resolves on a microtask.
  if (id === 'teacher') RoleModules.withGroup('teacher', () => TeacherMode.render());
  if (id === 'forum')   RoleModules.withGroup('forum',   () => Forum.render());
  if (id === 'calendar'  && typeof Calendar  !== 'undefined') Calendar.render();
  const searchBtn  = document.getElementById('search-btn');
  const isAuth     = ['landing','auth','verify-email','reset-password','family-setup'].includes(id);
  const hasStudent = typeof SELECTED_GRADE !== 'undefined' && !!SELECTED_GRADE;
  const isStudent  = hasStudent && !_isParentSession();
  if (searchBtn)  searchBtn.classList.toggle('hidden',  isAuth || !hasStudent || isStudent);

  _renderCreditChip();
  _renderLevelChip();
  _renderDailyGoal();
  _renderTaskButtons();

  // Last, so the render calls above have put the target on the page already.
  _armIdleNudge(id);
}

// A screen change used to leave BOTH the scroll position and keyboard focus
// wherever the previous screen had them: a child arriving from a long chapter
// grid landed mid-page, and a screen-reader user was still "on" a button that
// no longer existed. Focus goes to the screen's first heading (tabindex=-1, so
// it is programmatically focusable and never in the Tab order); it is not
// keyboard-initiated, so no ring is drawn. Runs synchronously inside
// showScreen, so a caller that focuses its own field straight after still wins.
function _focusScreen(sc) {
  try { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); } catch (_) { window.scrollTo(0, 0); }
  const h = sc.querySelector('h1, h2, h3');
  if (!h) return;
  if (!h.hasAttribute('tabindex')) h.setAttribute('tabindex', '-1');
  try { h.focus({ preventScroll: true }); } catch (_) {}
  _labelUnlabelledFields(sc);
}

// Fallback accessible names. 68 text inputs and 33 selects in index.html had
// no <label>, aria-label or aria-labelledby - most rely on a placeholder, which
// disappears the moment the user types and is not a name for most screen
// readers. This takes the placeholder (or title, or a short label-like element
// just before the control) as the name. A real <label for> or aria-label in the
// markup always wins; this only fills gaps.
function _labelUnlabelledFields(root) {
  const fields = (root || document).querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]), select, textarea');
  fields.forEach(f => {
    if (f.hasAttribute('aria-label') || f.hasAttribute('aria-labelledby') || f.closest('label')) return;
    if (f.id && document.querySelector('label[for="' + CSS.escape(f.id) + '"]')) return;
    let name = (f.getAttribute('placeholder') || f.getAttribute('title') || '').trim();
    if (!name) {
      const prev = f.previousElementSibling;
      if (prev && !prev.matches('input, select, textarea, button') && (prev.textContent || '').trim().length <= 60) {
        name = prev.textContent.trim().replace(/\s+/g, ' ');
      }
    }
    if (name) f.setAttribute('aria-label', name);
  });
}

function _updateBreadcrumb(screenId) {
  const bar   = document.getElementById('breadcrumb-bar');
  const inner = document.getElementById('breadcrumb-inner');
  if (!bar || !inner) return;

  // ⚠ subject-select, grade-select, results and past-papers were missing, which
  // is most of the "the breadcrumb does not show at all times" report: the
  // subject picker is where a child LANDS, and the results screen is where they
  // end up after an exam - the two moments they are most likely to want a way
  // back - and both showed no trail at all.
  const studentScreens = ['dashboard','chapter-select','syllabus','interactive-map','analytics','practice',
                          'exam-config','exam','results','subject-select','grade-select','past-papers',
                          'practice-hub','subject-hub'];
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

  // The grade crumb goes to the grade picker when there is more than one grade
  // to pick - the screen the child said they could not get back to. Same
  // reachability the "← Back to Grades" button on the subject picker already
  // has, so this opens nothing that was not already open.
  const gradeCrumb = link(`🏠 Home`, `StudentHome.open()`);

  if (screenId === 'grade-select') {
    inner.innerHTML = curr('Choose your grade');
    bar.classList.remove('hidden');
    return;
  }
  if (screenId === 'practice-hub') {
    inner.innerHTML = gradeCrumb + curr('Start Practicing');
    bar.classList.remove('hidden');
    return;
  }
  if (screenId === 'subject-hub') {
    const subjName = (packIcon + ' ' + packName).trim() || 'Subject';
    inner.innerHTML = gradeCrumb + link('Start Practicing', `PracticeHub.open()`) + curr(subjName);
    bar.classList.remove('hidden');
    return;
  }

  let parts = gradeCrumb;

  if (screenId === 'subject-select') {
    parts += curr('Choose a subject');
  } else if (screenId === 'results') {
    parts += link(packLabel, `showScreen('dashboard')`) + curr('Exam results');
  } else if (screenId === 'past-papers') {
    parts += link(packLabel, `showScreen('dashboard')`) + curr('Past papers');
  } else if (screenId === 'dashboard') {
    parts += curr(packLabel);
  } else if (['chapter-select','syllabus','interactive-map','analytics','exam-config'].includes(screenId)) {
    const label = screenId === 'syllabus' ? 'Syllabus' : screenId === 'interactive-map' ? 'Interactive maps' : screenId === 'analytics' ? 'Analytics' : screenId === 'exam-config' ? 'Exam' : 'Chapters';
    parts += link('Start Practicing', `PracticeHub.open()`) + link(packLabel, `SubjectHub.back()`) + curr(label);
  } else if (screenId === 'practice') {
    parts += link('Start Practicing', `PracticeHub.open()`) + link(packLabel, `SubjectHub.back()`) + curr(chLabel);
  } else if (screenId === 'exam') {
    parts += link('Start Practicing', `PracticeHub.open()`) + curr('Exam in progress');
  } else {
    bar.classList.add('hidden'); return;
  }

  inner.innerHTML = parts;
  bar.classList.remove('hidden');
}

// back buttons
document.querySelectorAll('.back-btn[data-target]').forEach(btn => {
  btn.addEventListener('click', () => {
    const t = btn.dataset.target;
    if (t === 'student-home' && typeof StudentHome !== 'undefined') StudentHome.open();
    else if (t === 'practice-hub' && typeof PracticeHub !== 'undefined') PracticeHub.open();
    else if (t === 'subject-hub' && typeof SubjectHub !== 'undefined') SubjectHub.back();
    else showScreen(t);
  });
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
  _setStreakDisplay(DB.stats.streak);
}

// ── CHAPTER PROGRESS ──────────────────────────
function getChapterPct(id) {
  if (!DB.chapters) return 0;
  const c = DB.chapters[id];
  if (!c || !c.attempted) return 0;
  return Math.round(c.correct / c.attempted * 100);
}
// ── PARENT REPORTING: dated activity series ───
// How many days of per-day activity to keep. 120 covers "this term" and any
// week-on-week or 30-day view a parent asks for, and bounds the jsonb: the
// worst case is 120 keys of ~30 bytes, under 4KB.
const _DAILY_KEEP   = 120;
// How many wrong answers to keep. The point is "what is she getting wrong
// lately", not a permanent transcript, and each entry carries question text.
const _MISTAKE_KEEP = 60;

// Prunes on write rather than on a timer: the app can sit open for days, and a
// child who never reopens it must not accumulate an unbounded blob either.
function _dayBucket() {
  if (!DB.daily) DB.daily = {};
  const k = _muDayKey();
  if (!DB.daily[k]) {
    DB.daily[k] = { a: 0, c: 0, e: 0 };
    const keys = Object.keys(DB.daily).sort();
    // Lexicographic sort IS chronological for YYYY-MM-DD - that is the whole
    // reason the key is this format and not a locale date string.
    if (keys.length > _DAILY_KEEP) {
      keys.slice(0, keys.length - _DAILY_KEEP).forEach(k2 => delete DB.daily[k2]);
    }
  }
  return DB.daily[k];
}

// Recorded even in ASSIGNMENT_MODE. A parent-set assignment is the activity a
// parent most wants to see, and recordAnswer() returns early for it - so this
// has to run BEFORE that early return, and must not touch DB.chapters, which
// assignment mode deliberately leaves alone.
// ⚠ chapterId is recorded per day as well as the totals. "How many questions
// yesterday" is a number a parent can already get from the strip; "what did she
// actually work on yesterday" is the question they ask out loud, and a day
// bucket of {a, c} could never answer it.
//
// Bounded on purpose: at most _DAY_CH_KEEP chapters per day. A child cannot
// meaningfully work through more than a handful in one sitting, and without a
// cap a stuck loop could grow one day's entry without limit inside a blob that
// is rewritten on every answer.
const _DAY_CH_KEEP = 12;

// `source` attributes the answer so the calendar does not report the same work
// twice. An exam already gets one row of its own from examHistory, and an
// assignment one from student_assignments.completed_at - so neither writes into
// the per-chapter map. Without this a 40-question mock showed up as five
// "practised X" lines AND an exam line, for one sitting.
// The day totals (a / c) still count every answer, whatever its source: those
// are "how much did she do today", and an exam is emphatically doing something.
// ══════════════════════════════════════════════
//  TODAY'S GOAL
//
//  Everything the app rewarded was either INSTANT (a ding on one answer) or very
//  distant (100 questions, a 7-day streak, 90% on a full mock). Nothing sat in
//  the five-to-fifteen-minute range a child can start AND FINISH, so a session
//  had no ending: they answered questions until bored and closed the tab.
//  Nothing ever told them they were done for the day.
//
//  ⚠ The goal deliberately does NOT drive the streak. updateStreak() still
//  counts days a child showed up at all, for two reasons: breaking a twelve-day
//  streak because a nine-year-old only managed three questions is a punishment
//  no child-facing app should hand out, and re-basing it would silently reset
//  the streak of every existing child on the day this deploys. The goal is
//  recorded per day instead (daily[key].g), so the week strip can show "goal
//  met" and "showed up" as different things without anyone losing what they had.
const DEFAULT_DAILY_GOAL = 10;

// Per-child override, so a parent control or an age-based default can land later
// without touching any reader. Guarded because it rides in the synced blob and a
// corrupt value must never make the goal unreachable.
function _dailyGoal() {
  const n = Number(DB.dailyGoal);
  return Number.isFinite(n) && n >= 1 && n <= 500 ? Math.round(n) : DEFAULT_DAILY_GOAL;
}

function _goalToday() {
  const d    = (DB.daily || {})[_muDayKey()] || { a: 0, c: 0 };
  const goal = _dailyGoal();
  const raw  = d.a || 0;
  return { goal, raw, done: Math.min(raw, goal), correct: d.c || 0,
           met: !!d.g || raw >= goal, left: Math.max(0, goal - raw) };
}

// Fires once, on the answer that completes the goal. `d.g` is the latch, written
// into the same day bucket the parent reports read - so it survives a reload and
// cannot celebrate twice.
function _checkDailyGoal(d) {
  if (d.g || (d.a || 0) < _dailyGoal()) return;
  d.g = 1;
  save(DB);
  // Deliberately after a beat: the answer's own correct/wrong feedback lands
  // first, and two celebrations on one frame read as a single confused flash.
  setTimeout(() => {
    launchConfetti();
    _playSound('levelup');
    if (navigator.vibrate) { try { navigator.vibrate([60, 40, 60, 40, 120]); } catch (_) {} }
    toast(`🎯 Today's goal done - ${_dailyGoal()} questions! See you tomorrow.`, 4500);
    _renderDailyGoal();
  }, 900);
}

// ── Time on task ──────────────────────────────
// ⚠ Measured as the GAP BETWEEN CONSECUTIVE ANSWERS, capped - not by a timer.
//
// A wall-clock timer is the obvious implementation and it is the wrong one: a
// tab left open on the practice screen over lunch would report an hour of study
// that never happened, and that number would then be shown to a parent and an
// administrator as if it were real. The gap between two answers cannot run away:
// anything longer than the cap is a child who wandered off, and is discarded.
//
// It therefore UNDER-reports slightly - the reading time before the first answer
// of a session is never counted, because nothing knows when they started. An
// honest floor beats a flattering guess.
const _TIME_GAP_CAP_MS = 3 * 60 * 1000;   // a hard word problem, generously
let _lastAnswerAt = 0;

function _recordTimeOnTask(d) {
  const now = Date.now();
  const gap = now - _lastAnswerAt;
  if (_lastAnswerAt && gap > 0 && gap < _TIME_GAP_CAP_MS) {
    d.s = (d.s || 0) + Math.round(gap / 1000);
  }
  _lastAnswerAt = now;
}

function _recordDaily(correct, chapterId, source) {
  const d = _dayBucket();
  d.a++;
  if (correct) d.c++;
  _recordTimeOnTask(d);
  // Before the early returns below: an exam question and a parent's assignment
  // are both work done today, and both should count towards the goal even
  // though neither is filed under a chapter.
  _checkDailyGoal(d);
  if (!chapterId) return;
  // An exam gets one row of its own from examHistory, so it contributes no
  // per-chapter breakdown at all.
  if (source === 'exam') return;

  // ⚠ Assignment work goes in its OWN bucket - not in `ch`, and not nowhere.
  //
  // This used to `return` for ASSIGNMENT_MODE, on the assumption that
  // student_assignments.completed_at would supply the row instead. It does not:
  // completed_at is written ONLY by the manual "✓ Done" button in the parent's
  // list, so a child who actually sat the assignment left no completion record -
  // and with that early return, no practice record either. A finished assignment
  // was invisible on the calendar, which is precisely what a parent goes there
  // to check.
  //
  // Both flows are covered, and they are genuinely different: _assignmentActive
  // is the PARENT one (startAssignmentDirect, which deliberately never sets
  // ASSIGNMENT_MODE), ASSIGNMENT_MODE is the teacher/guest one. Keeping `asg`
  // separate from `ch` is what lets the calendar label the row correctly and
  // dedupe it against a completed_at row for the same chapter and day.
  const bucket = (_assignmentActive || ASSIGNMENT_MODE) ? 'asg' : 'ch';
  if (!d[bucket]) d[bucket] = {};
  if (!d[bucket][chapterId] && Object.keys(d[bucket]).length >= _DAY_CH_KEEP) return;
  // [attempted, correct] - two-element array rather than {a,c} because this is
  // the most-repeated structure in the whole blob.
  const row = d[bucket][chapterId] || (d[bucket][chapterId] = [0, 0]);
  row[0]++;
  if (correct) row[1]++;
}

// q may be absent (exam replay passes one, some callers do not).
function _recordMistake(q, userAnswer, chapterId, source) {
  if (!q) return;
  if (!Array.isArray(DB.mistakes)) DB.mistakes = [];
  const chId = chapterId || q.chapterId || '';
  const ch   = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [])
    .flatMap(p => (p._chapters || p.chapters || []).map(c => ({ c, p })))
    .find(x => x.c.id === chId);
  // The same question missed again moves its existing row to the front and
  // counts the miss, instead of being stored twice. _MISTAKE_KEEP is 60, and a
  // child who keeps missing one question used to push every OTHER mistake out
  // of their own list with copies of it.
  const qid  = q.id || '';
  const prev = qid ? DB.mistakes.findIndex(m => m && m.id === qid) : -1;
  const misses = prev >= 0 ? ((DB.mistakes[prev].n || 1) + 1) : 1;
  if (prev >= 0) DB.mistakes.splice(prev, 1);
  DB.mistakes.unshift({
    d:   new Date().toISOString(),
    ch:  chId,
    chn: ch ? ch.c.name : chId,
    sub: ch ? (ch.p.subject || ch.p.name || '') : '',
    // id and pack are what make a mistake PRACTISABLE rather than merely
    // readable: without them the row describes a question with no way back to
    // it. Rows written before this existed carry neither - they are still
    // listed, and simply never drilled.
    id:  qid,
    pk:  ch ? ch.p.id : '',
    n:   misses,
    fix: 0,
    // Strip markup and cap the length: a comprehension question embeds a whole
    // passage (see the subsection-tagging notes in CLAUDE.md), and storing that
    // verbatim on every wrong answer would bloat the blob by kilobytes at a time.
    q:   _plainText(q.question).slice(0, 160),
    // A symmetry grid has no typeable answer - same reasoning as
    // _logPracticeAnswer(), which says so in words rather than printing coordinates.
    ua:  (q.type === 'symmetry' || q.type === 'symmetry-line') ? '' : String(userAnswer ?? '').slice(0, 60),
    ca:  (q.type === 'symmetry' || q.type === 'symmetry-line') ? '' : String(q.answer ?? '').slice(0, 60),
    dif: q.difficulty || 0,
    src: source || 'practice',
  });
  if (DB.mistakes.length > _MISTAKE_KEEP) DB.mistakes.length = _MISTAKE_KEEP;
}

// Answering a recorded mistake correctly. Called from every place an answer is
// marked - practice, a mistake drill and exam grading alike - so a question
// fixed anywhere counts, and the list empties by being learned rather than by
// ageing out. Returns true only on the answer that actually retires the row.
function _retireMistake(questionId) {
  if (!questionId || !Array.isArray(DB.mistakes)) return false;
  const i = DB.mistakes.findIndex(m => m && m.id === questionId);
  if (i < 0) return false;
  const row = DB.mistakes[i];
  row.fix = (row.fix || 0) + 1;
  if (row.fix < _FIX_TO_RETIRE) return false;
  DB.mistakes.splice(i, 1);
  return true;
}

// Only rows carrying a question id can be served back (see _recordMistake).
function _practisableMistakes() {
  return (DB.mistakes || []).filter(m => m && m.id);
}

// Question text is innerHTML by design (see the question file pattern), so it
// can carry <b>, <img> and whole inline SVG maps. textContent on a detached
// node is the only reliable way to get the words out; a regex over tags trips
// on the SVGs. Detached, so nothing loads and no script runs.
function _plainText(html) {
  if (!html) return '';
  const d = document.createElement('div');
  d.innerHTML = String(html);
  return (d.textContent || '').replace(/\s+/g, ' ').trim();
}

function recordAnswer(chapterId, correct, source, questionId) {
  _recordDaily(correct, chapterId, source);
  if (ASSIGNMENT_MODE) {
    ASSIGNMENT_SCORE.attempted++;
    if (correct) ASSIGNMENT_SCORE.correct++;
    // This branch used to return without saving - correct when the only thing
    // it touched was in-memory ASSIGNMENT_SCORE, but _recordDaily() above now
    // writes to DB, and a whole assignment's activity would be lost on reload.
    // save() is debounced in Store, so this costs nothing per answer.
    save(DB);
    return;
  }
  if (!DB.chapters[chapterId]) DB.chapters[chapterId] = { attempted: 0, correct: 0 };
  DB.chapters[chapterId].attempted++;
  if (correct) DB.chapters[chapterId].correct++;
  // The Subject Hub syllabus tab renders once per pack, so without this a
  // child sees the percentage from before the round they have just finished.
  // ⚠ try/catch, not the bare typeof guard it looks like it needs. SubjectHub is
  // a `const` declared 6,000 lines further down this same file, so before that
  // line has been evaluated the identifier is in the temporal dead zone and
  // `typeof` THROWS rather than answering "undefined". Nothing should call
  // recordAnswer that early, but the cost of being wrong is a child unable to
  // answer a question, against a cache flag that does not matter yet.
  try { if (typeof SubjectHub !== 'undefined' && SubjectHub.syllabusStale) SubjectHub.syllabusStale(); } catch (_) {}
  // Read BEFORE QuestionProgress.record() (below) applies this answer to the
  // local cache - afterwards every correct answer looks like a repeat.
  let _wasEverCorrect = false;
  try {
    if (questionId && typeof QuestionProgress !== 'undefined') _wasEverCorrect = QuestionProgress.everCorrect(questionId);
  } catch (_) {}

  if (questionId && STATIC_QUESTIONS.some(q => q.id === questionId && q.chapterId === chapterId)) {
    const chapter = DB.chapters[chapterId];
    chapter.answeredIds = [...new Set([...(Array.isArray(chapter.answeredIds) ? chapter.answeredIds : []), questionId])];
    // Per-question state goes to its own table, not into this blob. The blob is
    // upserted whole on every save, so two devices practising one chapter would
    // destroy each other's per-question history; a (student_id, question_id)
    // row conflicts only with itself. answeredIds stays as it is - it remains
    // the legacy coverage source during rollout and the backfill reads it.
    // ⚠ This line is never reached in ASSIGNMENT_MODE: that branch returns
    //   above, which is the boundary assignment work must keep.
    if (typeof QuestionProgress !== 'undefined') {
      QuestionProgress.record(ACTIVE_STUDENT_ID, { id: questionId, chapterId }, correct);
    }
  }
  // WHEN, not just how much. Without this a child looking at the chapter grid
  // can tell that a chapter has been touched but not whether that was this
  // afternoon or in March, which is most of what "have I done this one?" means.
  // One number per chapter, so the blob grows by ~20 bytes per chapter ever
  // practised - cheap enough not to need its own table.
  if (typeof LearningCoach !== 'undefined' && questionId) {
    LearningCoach.record({ id: questionId }, correct);
  }
  DB.chapters[chapterId].last = Date.now();
  DB.stats.totalAttempted++;
  if (correct) DB.stats.totalCorrect++;
  updateStreak();
  checkBadges();
  // ⚠ A question pays ONCE, EVER. The second time a child answers it correctly
  //   they get the practice, not the points - otherwise the cheapest way to the
  //   top of a leaderboard is one easy chapter on repeat, which is the opposite
  //   of what the score is meant to reward. Enforced in the database on
  //   (student, 'question', question_id); this is the local prediction so the
  //   header moves at once instead of four seconds later.
  //
  //   Note what is NOT required: getting it right FIRST time. A child who gets
  //   it wrong, learns it and comes back is paid the same. That is the app.
  if (correct && _wasEverCorrect === false) {
    gainPoints(_questionPoints(STATIC_QUESTIONS.find(x => x.id === questionId)));
  }
  save(DB);
  Events.emit('answer', { chapterId, correct });
}

// ── FILL-IN-THE-BLANK RANDOMISATION ───────────
// True when the MCQ answer is a single unspaced word (≤ 20 chars). Numeric
// and sentence options are excluded so only language questions qualify.
function _isSingleWordAnswer(q) {
  if (q.type !== 'mcq') return false;
  const a = String(q.answer || '').trim();
  return a.length > 0 && a.length <= 20 && !/[\s\d]/.test(a);
}

// Returns true when this question should be displayed as a typed input instead
// of MCQ buttons. The decision is random (50 %) and memoised per question id
// so navigating away and back keeps the same presentation.
function _shouldShowAsBlank(q) {
  if (!_isSingleWordAnswer(q)) return false;
  if (!_blankQuestions.has(q.id)) _blankQuestions.set(q.id, Math.random() < 0.5);
  return _blankQuestions.get(q.id);
}

// ── ANSWER CHECKING ───────────────────────────
function normalise(v) {
  return String(v).toLowerCase().replace(/\s+/g, '').replace(/,/g, '')
    .replace(/rs\.?/g,'').replace(/cm2/g,'cm²').replace(/m2/g,'m²')
    .replace(/kg/g,'kg').replace(/min/g,'min').replace(/\bpm\b/g,'pm');
}
// Two answers that are the SAME NUMBER written differently: 12.5 / 12.50,
// 0.5 / .5, 007 / 7, 1,200 / 1200. normalise() is a string comparison, so it
// marked every one of those wrong - the child is right and the app says no,
// which teaches them to distrust it. Only used when BOTH sides parse cleanly
// as a bare number, so "3 apples" vs "3" still needs the unit.
function _sameNumber(a, b) {
  const num = s => {
    const t = String(s).replace(/[\s,]/g, '').replace(/^rs\.?/i, '');
    if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(t)) return null;
    const n = parseFloat(t);
    return Number.isFinite(n) ? n : null;
  };
  const x = num(a), y = num(b);
  return x !== null && y !== null && x === y;
}

// ── Kid-legible maths ───────────────────────────────────────────────────────
// "Complete the chain: 2/5 = 4/□ = □/15" is how the question is authored, and
// it is how a spreadsheet writes fractions, not how a Grade 4 book does. On
// screen it reads as three divisions, and with two identical □ there is nothing
// to tell a child which box the "10 and 6" in the options belongs to.
//
// This is DISPLAY ONLY. q.answer, the option values and everything checkAnswer
// touches stay exactly as authored.
//
// ⚠ No lookbehind. A (?<!…) is a PARSE error on Safari before 16.4 - it would
// take the whole of app.js down, not just this function. The leading boundary
// is captured and re-emitted instead.
// ⚠ The trailing guard used to be a flat `(?![\w\/.])`, which excluded a
// following full stop - so "Shade 2/5." and "The answer is 3/4." (a sentence
// ending in a fraction, which is most of the explanations and a good share of
// the questions) were left as raw "2/5" while the same fraction mid-sentence was
// stacked. Two identical fractions rendering differently on one screen is worse
// than neither being stacked. A `.` is only disqualifying when a DIGIT follows
// it, i.e. the "/5.5" of a decimal - that is what `\.\d` tests.
const _FRAC_RE = /(^|[^\w\/.])(\d{1,3}|□)\s*\/\s*(\d{1,3}|□)(?=$|[^\w\/]|\.(?!\d))/g;
const _BOX_NUMERALS = ['①', '②', '③', '④'];

// Unicode fraction glyphs used in authored content (½ ¼ ¾ ⅓ …).
// _prettyMath normalises them to n/d so _FRAC_RE can stack them the same way.
const _UNICODE_FRACS = {'½':'1/2','¼':'1/4','¾':'3/4','⅓':'1/3','⅔':'2/3',
  '⅕':'1/5','⅖':'2/5','⅗':'3/5','⅘':'4/5','⅙':'1/6','⅚':'5/6',
  '⅛':'1/8','⅜':'3/8','⅝':'5/8','⅞':'7/8'};
const _UNICODE_FRAC_RE = /[½¼¾⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]/g;

// A whole number immediately before a fraction is a MIXED number in a PSAC
// paper ("2 1/2 hours"), and a book prints the two tight against each other, not
// with a word space between them. Marked up so .frac-mixed can close that gap.
const _MIXED_RE = /(^|[^\w.])(\d{1,3}) (<span class="frac")/g;

function _prettyMath(html) {
  if (typeof html !== 'string') return html;
  if (html.indexOf('/') < 0 && html.indexOf('□') < 0 && !_UNICODE_FRAC_RE.test(html)) return html;
  _UNICODE_FRAC_RE.lastIndex = 0;
  // Diagrams label themselves; never rewrite anything inside one.
  if (html.indexOf('<svg') >= 0) return html;

  // Only text between tags - never an attribute value.
  // aria-label carries the spoken form: the stacked markup is a column flexbox,
  // so innerText reads it as "1 5" and every screen reader and the app's own
  // read-aloud button would say "one five" instead of "one fifth". See _ttsText.
  // ⚠ A □ inside the spoken label has to become a word BEFORE the blank pass
  // below runs, or that pass would rewrite it into markup inside an attribute
  // value and break the tag. "2/□" is a real, common question shape.
  //
  // ⚠ And the words have to be in the language being READ. "2 over 5" handed to
  // a French voice comes out "deux ovair cinq" - the read-aloud button was
  // saying an English word in the middle of a French sentence. The active pack
  // is what _ttsLang() keys off and it is active at render time, which is the
  // only moment this markup is built.
  const fr    = (typeof _ttsLang === 'function') && _ttsLang().slice(0, 2) === 'fr';
  const OVER  = fr ? 'sur'   : 'over';
  const BLANK = fr ? 'blanc' : 'blank';
  const say = v => v === '□' ? BLANK : v;
  let out = html.replace(/(<[^>]+>)|([^<]+)/g, (m, tag, text) => {
    if (tag) return tag;
    text = text.replace(_UNICODE_FRAC_RE, c => _UNICODE_FRACS[c] || c);
    return text.replace(_FRAC_RE, (_m, pre, n, d) => {
      const spoken = `${say(n)} ${OVER} ${say(d)}`;
      return `${pre}<span class="frac" role="img" aria-label="${spoken}" data-tts="${spoken}">` +
             `<span class="fr-n">${n}</span><span class="fr-d">${d}</span></span>`;
    });
  });

  out = out.replace(_MIXED_RE, (_m, pre, whole, span) =>
    `${pre}<span class="frac-mixed">${whole}</span>${span}`);

  // Number the blanks only when there is more than one to tell apart.
  const boxes = (out.match(/□/g) || []).length;
  let i = 0;
  out = out.replace(/□/g, () =>
    boxes > 1 && i < _BOX_NUMERALS.length
      ? `<span class="q-box">${_BOX_NUMERALS[i++]}</span>`
      : '<span class="q-box"></span>');
  return out;
}

function checkAnswer(q, userAnswer) {
  if (q.type === 'symmetry-line') {
    return typeof SymmetryLine !== 'undefined' && SymmetryLine.checkAnswer(q, userAnswer);
  }
  if (q.type === 'symmetry') {
    try {
      const selected = JSON.parse(userAnswer || '[]');
      const ans = q.answer;
      if (selected.length !== ans.length) return false;
      const selSet = new Set(selected.map(([r,c]) => `${r},${c}`));
      return ans.every(([r,c]) => selSet.has(`${r},${c}`));
    } catch { return false; }
  }
  if (q.type === 'multi') {
    try {
      const selected = JSON.parse(userAnswer || '[]').map(normalise).sort();
      const answers = (Array.isArray(q.answer) ? q.answer : []).map(normalise).sort();
      return selected.length === answers.length && selected.every((v, i) => v === answers[i]);
    } catch { return false; }
  }
  // ⚠ Typed French, not a number. normalise() is the MATHS normaliser: it
  // strips "rs" anywhere in the string (written to drop "Rs." from money
  // answers), so through it "cours" and "cou" are the same word and
  // "toujours" becomes "toujou". matchTypedAnswer() is the French rule.
  if (q.type === 'text') {
    return matchTypedAnswer(q.acceptableAnswers || [q.answer], userAnswer, q).ok;
  }
  // ⚠ Algebra, not arithmetic. normalise() below strips "rs" anywhere in the
  // string and is built for money and units; through it "4x + 8" and "8 + 4x"
  // are different answers. markExpression() is the rule that knows they are
  // the same, and it lives in ONE place.
  if (q.type === 'expr') {
    if (typeof Assessment === 'undefined') return false;
    return Assessment.markExpression(
      { answer: q.answer, accept: (q.acceptableAnswers || []).slice(1) }, userAnswer).correct;
  }
  // ⚠ A multi-blank answer is marked BLANK BY BLANK by markSlots(), which
  //   also knows the three ways the papers share marks across them. Joining
  //   the boxes into one string and comparing it would lose partial credit
  //   and would fail a child who wrote the two roots in the other order.
  if (q.type === 'slots') {
    if (typeof Assessment === 'undefined') return false;
    return Assessment.markPart({ marks: q.marks || 1, response: q.slotResponse }, userAnswer).correct;
  }
  // MCQ shown as fill-in-the-blank this session: use accent-lenient matching
  if (q.type === 'mcq' && _blankQuestions.get(q.id)) {
    return matchTypedAnswer(q.acceptableAnswers || [q.answer], userAnswer, q).ok;
  }
  const ua = normalise(userAnswer);
  const accepted = [q.answer, ...(q.acceptableAnswers || [])];
  return accepted.some(a => normalise(a) === ua || _sameNumber(a, userAnswer));
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

// ── EXAM-STYLE LINE OF SYMMETRY ──────────────────────────────────────────
// This is deliberately a different type from the shaded-cell mirror puzzle.
// A straight SVG stroke behaves like a ruler, is usable by touch, and can be
// marked geometrically without punishing a child for a few pixels.
const _symLineStates = new Map();

const _symLineNum = (v, fallback = 0) => Number.isFinite(Number(v)) ? Number(v) : fallback;
const _symLinePointList = points => (Array.isArray(points) ? points : [])
  .filter(p => Array.isArray(p) && p.length === 2)
  .map(p => `${_symLineNum(p[0])},${_symLineNum(p[1])}`).join(' ');

function _symLineShapeMarkup(q) {
  return (q.shapes || []).map(shape => {
    if (!shape || typeof shape !== 'object') return '';
    const cls = shape.accent ? 'symline-shape symline-shape-accent' : 'symline-shape';
    if (shape.kind === 'polygon') {
      return `<polygon class="${cls}" points="${_attr(_symLinePointList(shape.points))}"></polygon>`;
    }
    if (shape.kind === 'rect') {
      return `<rect class="${cls}" x="${_symLineNum(shape.x)}" y="${_symLineNum(shape.y)}" width="${_symLineNum(shape.width)}" height="${_symLineNum(shape.height)}" rx="${_symLineNum(shape.rx)}"></rect>`;
    }
    if (shape.kind === 'ellipse') {
      return `<ellipse class="${cls}" cx="${_symLineNum(shape.cx)}" cy="${_symLineNum(shape.cy)}" rx="${_symLineNum(shape.rx)}" ry="${_symLineNum(shape.ry)}"></ellipse>`;
    }
    if (shape.kind === 'circle') {
      return `<circle class="${cls}" cx="${_symLineNum(shape.cx)}" cy="${_symLineNum(shape.cy)}" r="${_symLineNum(shape.r)}"></circle>`;
    }
    return '';
  }).join('');
}

function _symLineStaticSvg(q, showAnswers, extraClass = '') {
  const width = _symLineNum(q.canvas?.width, 320);
  const height = _symLineNum(q.canvas?.height, 240);
  const answers = typeof SymmetryLine !== 'undefined' ? SymmetryLine.parseLines(q.answer) : [];
  const lines = showAnswers ? answers.map(l =>
    `<line class="symline-answer" x1="${l[0]}" y1="${l[1]}" x2="${l[2]}" y2="${l[3]}"></line>`
  ).join('') : '';
  return `<svg class="symline-svg ${_attr(extraClass)}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${_attr(q.imageAlt || 'Shape for drawing lines of symmetry')}">
    <rect class="symline-paper" x="1" y="1" width="${width - 2}" height="${height - 2}" rx="12"></rect>
    ${_symLineShapeMarkup(q)}${lines}</svg>`;
}

function _symLineSvgPoint(event, svg, q) {
  const rect = svg.getBoundingClientRect();
  const width = _symLineNum(q.canvas?.width, 320), height = _symLineNum(q.canvas?.height, 240);
  return {
    x: Math.max(0, Math.min(width, (event.clientX - rect.left) * width / Math.max(1, rect.width))),
    y: Math.max(0, Math.min(height, (event.clientY - rect.top) * height / Math.max(1, rect.height))),
  };
}

function _symLineSnap(start, end, q) {
  const dx = end.x - start.x, dy = end.y - start.y, len = Math.hypot(dx, dy);
  if (len < 0.01) return end;
  const snap = Array.isArray(q.snapAngles) ? q.snapAngles : [0, 45, 90, 135];
  const raw = ((Math.atan2(dy, dx) * 180 / Math.PI) % 180 + 180) % 180;
  let best = raw, distance = Infinity;
  for (const angle of snap) {
    const d0 = Math.abs(raw - angle) % 180, d = Math.min(d0, 180 - d0);
    if (d < distance) { distance = d; best = angle; }
  }
  if (distance > _symLineNum(q.snapTolerance, 7)) return end;
  const rad = best * Math.PI / 180;
  const direction = dx * Math.cos(rad) + dy * Math.sin(rad) < 0 ? -1 : 1;
  return { x: start.x + Math.cos(rad) * len * direction, y: start.y + Math.sin(rad) * len * direction };
}

function _symLinePaint(key) {
  const state = _symLineStates.get(key), host = document.getElementById(key);
  if (!state || !host) return;
  const group = host.querySelector('[data-symline-user]');
  if (group) group.innerHTML = state.lines.map((l, i) =>
    `<line class="symline-user" data-line="${i}" x1="${l[0]}" y1="${l[1]}" x2="${l[2]}" y2="${l[3]}"></line>`
  ).join('');
  const count = host.querySelector('[data-symline-count]');
  if (count) count.textContent = state.lines.length
    ? `${state.lines.length} line${state.lines.length === 1 ? '' : 's'} drawn`
    : 'No lines drawn yet';
  const undo = host.querySelector('[data-symline-undo]');
  const clear = host.querySelector('[data-symline-clear]');
  if (undo) undo.disabled = !state.lines.length;
  if (clear) clear.disabled = !state.lines.length;
}

function _symLinePreview(key, start, end) {
  const preview = document.getElementById(key)?.querySelector('[data-symline-preview]');
  if (!preview) return;
  if (!start || !end) { preview.setAttribute('visibility', 'hidden'); return; }
  preview.setAttribute('x1', start.x); preview.setAttribute('y1', start.y);
  preview.setAttribute('x2', end.x); preview.setAttribute('y2', end.y);
  preview.setAttribute('visibility', 'visible');
}

window.symLinePointerDown = function (event, key) {
  const state = _symLineStates.get(key);
  if (!state || state.disabled || event.button > 0) return;
  event.preventDefault();
  const svg = event.currentTarget, p = _symLineSvgPoint(event, svg, state.q);
  // If the child already placed the first point by tapping, the next pointer
  // begins at that saved point. A tap, short drag or stylus movement can all
  // finish the same line without abandoning the visible first endpoint.
  state.down = state.tapStart || p;
  state.moved = !!state.tapStart && Math.hypot(p.x - state.down.x, p.y - state.down.y) > 6;
  try { svg.setPointerCapture(event.pointerId); } catch (_) {}
  _symLinePreview(key, state.down, p);
};

window.symLinePointerMove = function (event, key) {
  const state = _symLineStates.get(key);
  if (!state?.down || state.disabled) return;
  event.preventDefault();
  const p = _symLineSnap(state.down, _symLineSvgPoint(event, event.currentTarget, state.q), state.q);
  if (Math.hypot(p.x - state.down.x, p.y - state.down.y) > 6) state.moved = true;
  _symLinePreview(key, state.down, p);
};

window.symLinePointerUp = function (event, key) {
  const state = _symLineStates.get(key);
  if (!state?.down || state.disabled) return;
  event.preventDefault();
  const end = _symLineSnap(state.down, _symLineSvgPoint(event, event.currentTarget, state.q), state.q);
  const start = state.down, dragged = state.moved && Math.hypot(end.x - start.x, end.y - start.y) >= 18;
  state.down = null; state.moved = false;
  if (dragged) {
    state.tapStart = null;
    state.lines.push([start.x, start.y, end.x, end.y].map(n => Math.round(n * 10) / 10));
  } else if (!state.tapStart) {
    state.tapStart = start;
    const status = document.getElementById(key)?.querySelector('[data-symline-status]');
    if (status) status.textContent = 'First point placed. Tap the other end of the line.';
    _symLinePreview(key, start, start);
    return;
  } else {
    const first = state.tapStart;
    state.tapStart = null;
    if (Math.hypot(end.x - first.x, end.y - first.y) >= 18) {
      const snapped = _symLineSnap(first, end, state.q);
      state.lines.push([first.x, first.y, snapped.x, snapped.y].map(n => Math.round(n * 10) / 10));
    }
  }
  _symLinePreview(key, null, null);
  _symLinePaint(key);
};

window.symLinePointerCancel = function (event, key) {
  const state = _symLineStates.get(key);
  if (!state) return;
  state.down = null; state.moved = false;
  _symLinePreview(key, null, null);
};

window.symLineUndo = key => {
  const state = _symLineStates.get(key);
  if (!state || state.disabled) return;
  state.lines.pop(); state.tapStart = null; _symLinePreview(key, null, null); _symLinePaint(key);
};
window.symLineClear = key => {
  const state = _symLineStates.get(key);
  if (!state || state.disabled) return;
  state.lines = []; state.tapStart = null; _symLinePreview(key, null, null); _symLinePaint(key);
};
window.symLineToggleHelp = (button, key) => {
  const help = document.getElementById(key)?.querySelector('[data-symline-help]');
  if (!help) return;
  const open = help.classList.toggle('hidden') === false;
  button.setAttribute('aria-expanded', String(open));
};

function renderSymmetryLine(q, cont, selectedAnswer, disabled) {
  const key = `${cont.id}-symline`;
  const width = _symLineNum(q.canvas?.width, 320), height = _symLineNum(q.canvas?.height, 240);
  const drawn = typeof SymmetryLine !== 'undefined' ? SymmetryLine.parseLines(selectedAnswer) : [];
  const result = disabled && typeof SymmetryLine !== 'undefined'
    ? SymmetryLine.gradeDetailed(q, selectedAnswer) : null;
  const matchedDrawn = new Set((result?.pairs || []).map(pair => pair[0]));
  const matchedExpected = new Set((result?.pairs || []).map(pair => pair[1]));
  const userLines = drawn.map((l, i) => `<line class="symline-user ${disabled ? (matchedDrawn.has(i) ? 'is-correct' : 'is-wrong') : ''}"
    x1="${l[0]}" y1="${l[1]}" x2="${l[2]}" y2="${l[3]}"></line>`).join('');
  const missed = disabled ? (result?.expected || []).map((l, i) => matchedExpected.has(i) ? '' :
    `<line class="symline-answer is-missed" x1="${l[0]}" y1="${l[1]}" x2="${l[2]}" y2="${l[3]}"></line>`
  ).join('') : '';
  const controls = disabled ? `<div class="symline-legend">
      <span><i class="is-correct"></i>Your correct line</span>
      ${result?.correct ? '' : '<span><i class="is-wrong"></i>Your misplaced line</span><span><i class="is-missed"></i>Correct line</span>'}
    </div>` : `<div class="symline-tools">
      <button type="button" data-symline-undo onclick="symLineUndo('${_attr(key)}')" disabled>↶ Undo</button>
      <button type="button" data-symline-clear onclick="symLineClear('${_attr(key)}')" disabled>Clear</button>
      <button type="button" onclick="symLineToggleHelp(this,'${_attr(key)}')" aria-expanded="false">? How to draw</button>
    </div>
    <div class="symline-help hidden" data-symline-help>Drag across the shape like a ruler. You can also tap once at each end. Draw every line that folds the shape into two matching halves.</div>`;

  cont.innerHTML = `<div class="symline-wrap" id="${_attr(key)}">
    <div class="symline-heading"><span>📏 Draw on the shape</span><span data-symline-count>${drawn.length ? drawn.length + ' line' + (drawn.length === 1 ? '' : 's') + ' drawn' : 'No lines drawn yet'}</span></div>
    <svg class="symline-svg${disabled ? ' is-disabled' : ''}" viewBox="0 0 ${width} ${height}"
      style="aspect-ratio:${width}/${height}" role="img" aria-label="${_attr(q.imageAlt || 'Shape on which to draw lines of symmetry')}"
      onpointerdown="symLinePointerDown(event,'${_attr(key)}')"
      onpointermove="symLinePointerMove(event,'${_attr(key)}')"
      onpointerup="symLinePointerUp(event,'${_attr(key)}')"
      onpointercancel="symLinePointerCancel(event,'${_attr(key)}')">
      <rect class="symline-paper" x="1" y="1" width="${width - 2}" height="${height - 2}" rx="12"></rect>
      ${_symLineShapeMarkup(q)}
      <g data-symline-user>${userLines}</g>${missed}
      <line class="symline-preview" data-symline-preview visibility="hidden"></line>
    </svg>
    ${controls}<div class="sr-only" aria-live="polite" data-symline-status></div>
  </div>`;
  _symLineStates.set(key, { q, lines: drawn.slice(), disabled: !!disabled, down: null, moved: false, tapStart: null });
  if (!disabled) _symLinePaint(key);
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
  // Cleared in the RENDER, not in the branch that sets it: every other type
  // returns early below, so a numeric or typed question following an MCQ would
  // otherwise inherit the previous question's two-column layout.
  cont.classList.remove('pr-answers-pair');
  if (q.type === 'symmetry-line') {
    renderSymmetryLine(q, cont, selectedAnswer, disabled);
    return;
  }
  if (q.type === 'symmetry') {
    renderSymmetryGrid(q, cont, selectedAnswer, disabled);
    return;
  }
  // Single-word MCQ displayed as a typed input this session
  if (q.type === ‘mcq’ && _shouldShowAsBlank(q)) {
    const m   = disabled ? matchTypedAnswer(q.acceptableAnswers || [q.answer], selectedAnswer, q) : null;
    const cls = disabled ? (m && m.ok ? ‘num-input correct’ : ‘num-input wrong’) : ‘num-input’;
    const enter = containerId === ‘exam-answer-area’ ? ‘saveCurrentExamAnswer()’ : ‘practiceSubmit()’;
    const isFr = ACTIVE_PACK && ACTIVE_PACK.subject === ‘French’;
    const placeholder = isFr ? ‘Écris ta réponse…’ : ‘Type your answer…’;
    const langAttr = isFr ? ‘lang="fr"’ : ‘’;
    cont.innerHTML = `<input type="text" class="${cls}" id="num-ans-${containerId}" value="${_attr(selectedAnswer || ‘’)}"
      placeholder="${placeholder}" ${langAttr} inputmode="text" spellcheck="false"
      autocapitalize="off" autocorrect="off" autocomplete="off" ${disabled ? ‘disabled’ : ‘’}
      onkeydown="if(event.key===’Enter’){${enter}}">`;
    if (m && m.ok && m.slip) {
      cont.innerHTML += isFr
        ? `<p class="txt-slip">Juste - attention à l’accent : <b>${_attr(q.answer)}</b></p>`
        : `<p class="txt-slip">Correct — check the spelling: <b>${_attr(q.answer)}</b></p>`;
    }
    return;
  }
  if (q.type === 'mcq' || q.type === 'multi') {
    const multi = q.type === 'multi';
    let selectedValues = [];
    if (multi && selectedAnswer) {
      try { selectedValues = JSON.parse(selectedAnswer || '[]'); } catch {}
    }
    const correctValues = multi ? (Array.isArray(q.answer) ? q.answer : []) : [q.answer];
    cont.innerHTML = (q.options || []).map((opt, i) => {
      let cls = 'mcq-opt';
      const chosen = multi ? selectedValues.includes(opt) : opt === selectedAnswer;
      const correct = correctValues.includes(opt);
      if (disabled) {
        cls += ' disabled';
        if (correct) cls += ' correct';
        else if (chosen) cls += ' wrong';
      } else {
        if (chosen) cls += ' selected';
      }
      // q.answer used to be interpolated into the onclick as a single-quoted JS
      // string. Any answer containing an apostrophe - "c'est", "l'école", most
      // of the French bank - closed that string early and made the handler a
      // syntax error, so the option silently would not select and Check Answer
      // then said "Please answer the question first".
      // selectMCQ never read the argument anyway, so it is gone rather than
      // escaped. data-value is the real data path (getSelectedAnswer reads it)
      // and is now escaped properly.
      return `<button class="${cls}" data-value="${_attr(opt)}" ${multi ? 'role="checkbox" aria-checked="' + chosen + '"' : ''} onclick="this.classList.add('mcq-spring');this.onanimationend=()=>this.classList.remove('mcq-spring');${multi ? 'selectMultiMCQ' : 'selectMCQ'}(this,'${containerId}',${disabled})">
        <span class="opt-letter">${multi ? (chosen ? '☑' : '☐') : String.fromCharCode(65+i)}</span>
        <span>${_prettyMath(opt)}</span>
      </button>`;
    }).join('');
    // ⚠ Pair SHORT options into two columns on a wide screen, and only then.
    // .mcq-opt is width:100%, so on a desktop browser four numeric options
    // became four 736px-wide bars each holding two characters - a column of
    // letterboxes, and 4 x 56px of height for content that needs 2 x 56px.
    // The test is on the CONTENT, not on the viewport alone: a French
    // comprehension option is a whole sentence, and half a column would wrap it
    // to four lines and make a ragged grid. Measured against the live bank:
    // 24 chars keeps every numeric/word option in and every sentence out.
    const shortOpts = (q.options || []).length > 2
      && (q.options || []).every(o => _plainText(String(o)).length <= 24);
    cont.classList.toggle('pr-answers-pair', shortOpts);
  } else if (q.type === 'text') {
    // ⚠ inputmode="text", NOT the numeric branch below - that one sets
    // inputmode="decimal" and draws a digit pad, which under a French sentence
    // is the same defect a cloze item hits when it falls through to it.
    // ⚠ spellcheck="false" is load-bearing: a French spellchecker underlining
    // the child's misspelling hands them the answer before they press Check.
    // autocorrect/autocapitalize likewise - the phone must not answer for them.
    const m   = disabled ? matchTypedAnswer(q.acceptableAnswers || [q.answer], selectedAnswer, q) : null;
    const cls = disabled ? (m.ok ? 'num-input correct' : 'num-input wrong') : 'num-input';
    const enter = containerId === 'exam-answer-area' ? 'saveCurrentExamAnswer()' : 'practiceSubmit()';
    cont.innerHTML = `<input type="text" class="${cls}" id="num-ans-${containerId}" value="${_attr(selectedAnswer || '')}"
      placeholder="Écris le mot…" lang="fr" inputmode="text" spellcheck="false"
      autocapitalize="off" autocorrect="off" autocomplete="off" ${disabled ? 'disabled' : ''}
      onkeydown="if(event.key==='Enter'){${enter}}">`
      + (m && m.ok && m.slip
        ? `<p class="txt-slip">Juste - attention à l\u2019accent : <b>${_attr(q.answer)}</b></p>`
        : '');
  } else if (q.type === 'slots') {
    // ⚠ One input per blank, laid out as the paper prints them: a label
    //   before each box where the question names an unknown ("x = ......"),
    //   and a unit after it where the paper pre-prints one.
    // ⚠ EVERY BOX IS THE SAME WIDTH. Sizing a box to its answer prints the
    //   answer's length on screen - the same rule the French cloze gaps follow.
    const r = q.slotResponse || {};
    const vals = (() => { try { return JSON.parse(selectedAnswer || '[]'); } catch { return []; } })();
    const marks = disabled && typeof Assessment !== 'undefined'
      ? Assessment.markPart({ marks: q.marks || 1, response: r }, selectedAnswer) : null;
    const labels = r.labels || [];
    const n = (r.answer || []).length;
    const enter = containerId === 'exam-answer-area' ? 'saveCurrentExamAnswer()' : 'practiceSubmit()';
    let html = '<div class="slot-row">';
    for (let i = 0; i < n; i++) {
      const lab = labels[i] ? `<span class="slot-label"><i>${_attr(labels[i])}</i> =</span>` : '';
      html += `${lab}<input type="text" class="slot-input" value="${_attr(vals[i] || '')}"
        inputmode="text" spellcheck="false" autocapitalize="off" autocorrect="off" autocomplete="off"
        aria-label="Answer box ${i + 1} of ${n}" ${disabled ? 'disabled' : ''}
        onkeydown="if(event.key==='Enter'){${enter}}">`;
    }
    html += '</div>';
    if (marks) {
      // Partial credit is REPORTED, not hidden behind a plain right/wrong.
      html += `<p class="slot-score">${marks.earned} of ${q.marks || 1} mark`
        + `${(q.marks || 1) === 1 ? '' : 's'}.</p>`;
    }
    cont.innerHTML = html;
  } else if (q.type === 'expr') {
    // ⚠ An ALGEBRAIC answer: "a^8", "4x + 8", "y = 2x + 1". inputmode="text",
    //   never the numeric branch below - that one draws a digit pad, which
    //   cannot type a letter, a caret or a plus. spellcheck/autocorrect are off
    //   for the same reason the French text input turns them off: a phone that
    //   "corrects" 2x to 2X or capitalises the line is answering for the child.
    const okNow = disabled && typeof Assessment !== 'undefined'
      ? Assessment.markExpression({ answer: q.answer, accept: (q.acceptableAnswers || []).slice(1) }, selectedAnswer).correct
      : false;
    const cls = disabled ? (okNow ? 'num-input correct' : 'num-input wrong') : 'num-input';
    const enter = containerId === 'exam-answer-area' ? 'saveCurrentExamAnswer()' : 'practiceSubmit()';
    cont.innerHTML = `<input type="text" class="${cls}" id="num-ans-${containerId}" value="${_attr(selectedAnswer || '')}"
      placeholder="Type your answer, e.g. 4x + 8" inputmode="text" spellcheck="false"
      autocapitalize="off" autocorrect="off" autocomplete="off" ${disabled ? 'disabled' : ''}
      onkeydown="if(event.key==='Enter'){${enter}}">
      <p class="expr-hint">Use <b>^</b> for a power - type <b>a^8</b> for a<sup>8</sup>.</p>`;

    // ⚠ THE PAD IS NOT A CONVENIENCE HERE, IT IS THE ONLY REACHABLE ROUTE TO ^.
    //   inputmode="text" is right (the answer needs letters) but it hands a
    //   phone a QWERTY, where the caret is three layers down: 123 → #+= → ^.
    //   The hint says "use ^" and the keyboard under it cannot easily produce
    //   one. The numeric branch has had a pad since the beginning; this branch
    //   shipped without one, and the first child to meet it had no way in.
    //
    // ⚠ THE KEYS ARE MEASURED, NOT GUESSED. Counting characters across all 60
    //   authored `expression` answers: x 36 · ( ) 30 · / 25 · - 22 · = 18 ·
    //   + 17 · y 9 · pi 9 · ^ 7 · n 7 · sqrt 1. Everything on the pad earns
    //   its place, and the remaining variables (r, h, l, w, A, C, F, P, t)
    //   are one tap away on the ordinary keyboard, which is still there.
    if (!disabled) {
      // π and √ insert the words markExpression() actually normalises - "pi"
      // and "sqrt(" - never the glyph, which would never match an answer.
      const rows = [
        ['7', '8', '9', { d: '^', v: '^', sym: true }, '⌫'],
        ['4', '5', '6', '(', ')'],
        ['1', '2', '3', '+', { d: '−', v: '-' }],
        ['0', '.', '/', '=', 'x'],
        ['y', 'n', { d: 'π', v: 'pi' }, { d: '√', v: 'sqrt(' }, 'C'],
      ];
      const key = k => {
        if (k === '⌫') return `<button type="button" class="num-pad-btn num-pad-del" aria-label="Backspace" onclick="numPadBackspace('${containerId}')">⌫</button>`;
        if (k === 'C')  return `<button type="button" class="num-pad-btn num-pad-clear" aria-label="Clear the answer" onclick="numPadClear('${containerId}')">C</button>`;
        const d = typeof k === 'string' ? k : k.d;
        const v = typeof k === 'string' ? k : k.v;
        return `<button type="button" class="num-pad-btn${k.sym ? ' num-pad-sym' : ''}"`
          + ` aria-label="Insert ${_attr(v)}" onclick="insertSymbol('${containerId}','${v}')">${d}</button>`;
      };
      const padId = 'numpad-' + containerId;
      // ⚠ Open by default on a phone, exactly as the numeric pad is. Unlike
      //   that branch this one does NOT focus the input, so the child meets
      //   our pad rather than the OS keyboard on top of it.
      const _isMobile = ('ontouchstart' in window) || window.matchMedia('(max-width:768px)').matches;
      cont.innerHTML += `
        <button type="button" class="numpad-toggle${_isMobile ? ' active' : ''}" onclick="
          var p=document.getElementById('${padId}');
          var show=p.style.display==='none'||!p.style.display;
          p.style.display=show?'block':'none';
          this.classList.toggle('active',show);
        " title="Show / hide keypad">⌨️ Keypad</button>
        <div id="${padId}" style="display:${_isMobile ? 'block' : 'none'}">
          <div class="num-pad num-pad-5col" role="group" aria-label="Algebra keypad">
            ${rows.map(r => r.map(key).join('')).join('')}
          </div>
        </div>`;
    }
  } else if (q.type && q.type !== 'numeric') {
    // ⚠ THIS BRANCH IS THE POINT. Everything below used to be the `else`, so a
    // question whose type nothing here recognised was drawn as a NUMBER PAD -
    // inputmode="decimal", digit keys and all. That is not a cosmetic slip: it
    // is how a French cloze passage got a digit keypad under it, and it is what
    // every NCE Grade 9 format (blanks, cells, drawing, construction) would do
    // the moment one reached practice. isPoolQuestion() is supposed to keep
    // those out, but a filter that is the ONLY thing standing between a child
    // and a nonsense screen is one edit away from not being there.
    //
    // So an unrecognised type now says so, loudly and in one place, instead of
    // silently pretending to be arithmetic. The ordinary answer-area types are
    // mcq, numeric, text, multi, symmetry-grid and symmetry-line. `cloze` is
    // absent on purpose:
    // it has its own renderer in engine/cloze.js and never arrives here.
    console.warn(`renderAnswerArea: no renderer for question type "${q.type}" (${q.id}) - refusing rather than drawing a number pad`);
    cont.innerHTML = `<div class="answer-unsupported" role="status">
      <p><b>This question can’t be answered on screen.</b></p>
      <p>It needs to be done on paper - print the practice paper to try it.</p>
    </div>`;
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
        <p class="sym-hint">Tap <b>^</b> then the exponent - e.g. <b>5^2</b> means 5²</p>`;
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

window.selectMultiMCQ = (btn, containerId, disabled) => {
  if (disabled) return;
  const selected = btn.classList.toggle('selected');
  btn.setAttribute('aria-checked', String(selected));
  const mark = btn.querySelector('.opt-letter');
  if (mark) mark.textContent = selected ? '☑' : '☐';
};

function getSelectedAnswer(containerId, qType) {
  if (qType === 'mcq') {
    // If this MCQ is rendered as fill-in-the-blank, read from the text input
    const inp = document.getElementById('num-ans-' + containerId);
    if (inp) return inp.value.trim() || null;
    const sel = document.querySelector(`#${containerId} .mcq-opt.selected`);
    return sel ? sel.dataset.value : null;
  }
  if (qType === 'multi') {
    return JSON.stringify([...document.querySelectorAll(`#${containerId} .mcq-opt.selected`)].map(b => b.dataset.value).sort());
  }
  if (qType === 'symmetry') {
    const selected = [];
    document.querySelectorAll(`#${containerId} .sym-clickable.sym-selected`).forEach(el => {
      selected.push([parseInt(el.dataset.r), parseInt(el.dataset.c)]);
    });
    selected.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    return JSON.stringify(selected);
  }
  if (qType === 'symmetry-line') {
    const state = _symLineStates.get(`${containerId}-symline`);
    return JSON.stringify(state?.lines || []);
  }
  // ⚠ 'slots' is `blanks` and `cells`: several small inputs answering one
  //   question - "x = ......, y = ......" and a table row to complete. The
  //   value is a JSON array in the boxes' printed order, because markSlots()
  //   marks each blank against its own position.
  if (qType === 'slots') {
    const boxes = [...document.querySelectorAll('#' + containerId + ' .slot-input')];
    return JSON.stringify(boxes.map(b => b.value.trim()));
  }
  const inp = document.getElementById('num-ans-' + containerId);
  return inp ? inp.value.trim() : null;
}

// ── CONFETTI ──────────────────────────────────
function launchConfetti(count = 160) {
  if (!_celebrationMotionAllowed()) return;
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const cols = ['#ff6b6b','#feca57','#48dbfb','#ff9ff3','#54a0ff','#5f27cd','#00d2d3','#ff9f43'];
  const particles = Array.from({length:count}, () => ({
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

// ── POINTS & LEVELS ────────────────────────────
// ⚠ THE SERVER OWNS THE SCORE. Points are minted by _award_points() in the
//   database, keyed so a thing can only ever pay once, and read back from
//   student_points. Everything here is presentation: it predicts the award so
//   the child sees a number the instant they answer, and is corrected by the
//   server total on the next flush (~4s). DB.xp is now a CACHE of that total,
//   not the score - see migrations/20260909_points_and_leaderboard.sql for why
//   a browser-written number cannot back a global leaderboard.
//
// ⚠ POINTS_THRESHOLDS mirrors points_level() in SQL. Change both together;
//   scripts/test-points-levels.js compares them and fails on drift.
const POINTS_THRESHOLDS = [0, 301, 801, 1500, 2400, 3500, 4800, 6200, 7700, 9300, 11000, 13000];
const LEVEL_NAMES    = ['Beginner','Explorer','Learner','Practiser','Achiever','Expert','Champion','Master','Genius','Legend','Grandmaster','Titan'];

// Kept as an alias so nothing that still spells it XP breaks; the two names
// mean the same number and the bar reads from this one.
const XP_THRESHOLDS  = POINTS_THRESHOLDS;

// A question is worth its difficulty: L1 = 1 point … L4 = 4. This copy only
// draws the float. The SERVER reads questions.difficulty, a column the browser
// cannot write, so claiming an L1 was an L4 buys nothing.
function _questionPoints(q) {
  const d = q && Number(q.difficulty);
  return Number.isFinite(d) ? Math.max(1, Math.min(4, Math.round(d))) : 1;
}

// What THIS answer is worth right now: the question's difficulty the first
// time it is answered correctly, and nothing every time after. The database is
// the authority (student_point_events is unique on (student, 'question', id));
// this predicts it so a "+3" is never shown for points the server will refuse.
//
// ⚠ Must be read BEFORE QuestionProgress.record() updates the local cache, or
//   it answers about the answer just given rather than the ones before it.
function _awardablePoints(q) {
  if (!q || !q.id) return 0;
  try {
    if (typeof QuestionProgress !== 'undefined' && QuestionProgress.everCorrect(q.id)) return 0;
  } catch (_) {}
  return _questionPoints(q);
}


function getLevel(points) {
  for (let i = POINTS_THRESHOLDS.length - 1; i >= 0; i--) {
    if (points >= POINTS_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

// Optimistic local add. ⚠ Call this ONLY where the server will also award, and
// with the same amount - a float that says +4 followed by a total that moved by
// 1 is worse than no float at all.
function gainPoints(amount) {
  const n = Math.max(0, Math.round(Number(amount) || 0));
  if (!n) return 0;
  DB.xp = (DB.xp || 0) + n;
  const newLevel = getLevel(DB.xp);
  const oldLevel = DB.level || 1;
  DB.level = newLevel;
  if (newLevel > oldLevel) { _playSound('levelup'); _haptic('levelup'); showLevelUp(newLevel); }
  updateXPBar();
  return n;
}

// The server's total is the truth. Called from QuestionProgress.flush() and
// after any award RPC. A level that went UP here still celebrates: the child
// earned it, the client just had not counted it yet.
function applyServerPoints(total, level) {
  const t = Number(total);
  if (!Number.isFinite(t) || t < 0) return;
  const oldLevel = DB.level || 1;
  DB.xp = t;
  DB.level = Number(level) || getLevel(t);
  if (DB.level > oldLevel) { _playSound('levelup'); _haptic('levelup'); showLevelUp(DB.level); }
  updateXPBar();
  if (typeof save === 'function') save(DB);
}
if (typeof window !== 'undefined') window.applyServerPoints = applyServerPoints;

// Pull the authoritative total. Called when a child's progress is loaded, so
// the header is right before they answer anything - otherwise a child who
// practised on a phone sees yesterday's number on the tablet until the first
// flush.
//
// ⚠ Points SURVIVE a progress reset, deliberately. The ledger is what makes a
//   question pay once, so wiping the total while keeping the ledger would leave
//   a child unable to re-earn what they lost. Reset clears mastery and history;
//   it does not confiscate a score they did earn.
async function _reconcilePoints() {
  try {
    if (typeof Store === 'undefined' || !Store.getMyPoints) return;
    const p = await Store.getMyPoints();
    if (p) applyServerPoints(p.points, p.level);
  } catch (_) {}
}
if (typeof window !== 'undefined') window._reconcilePoints = _reconcilePoints;

function updateXPBar() {
  const xp = DB.xp || 0;
  const lv = DB.level || 1;
  // The header chip is the only place a child on a phone sees their level, and
  // #xp-display below is display:none there - so it has to be refreshed from
  // the same place, not left to the next navigation.
  _renderLevelChip();
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

// ── GLOBAL LEADERBOARD ────────────────────────
// ⚠ OFF BY DEFAULT, and the switch is in the DATABASE - leaderboard_enabled(),
//   read from the global_settings blob, flipped in Admin › Content. Hiding the
//   entry point is presentation; get_points_leaderboard() returning no rows to
//   anyone is the enforcement. Both exist on purpose: a child must not be able
//   to reach a screen that can only ever be empty, and an admin must not have to
//   trust the browser to respect the switch.
//
// ⚠ This screen shows children from OTHER FAMILIES. Every name goes through
//   _attr(). The RPC deliberately returns no id and no friend_code, so there is
//   nothing here one child could use to reach another.
let _lbGrade = 'mine';   // 'mine' | 'all' — reset on arrival, see below

// ⚠ Reset in the RENDER, not in the toggle (the rule in ui-css.md): arriving
//   from the dashboard must not inherit the filter left over from last time.
function renderGlobalLeaderboard() {
  _lbGrade = 'mine';
  _lbFill();
}

function setLeaderboardGrade(which) {
  _lbGrade = which === 'all' ? 'all' : 'mine';
  _lbFill();
}

function _lbGradeLabel() {
  return SELECTED_GRADE ? ('Grade ' + SELECTED_GRADE) : 'My grade';
}

async function _lbFill() {
  const listEl = document.getElementById('lb-list');
  const rankEl = document.getElementById('lb-rank');
  const tabsEl = document.getElementById('lb-tabs');
  if (!listEl) return;

  if (tabsEl) {
    const btn = (key, label) => `<button onclick="setLeaderboardGrade('${key}')"
      class="px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${_lbGrade === key
        ? 'bg-indigo-500 text-white shadow'
        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}">${label}</button>`;
    tabsEl.innerHTML = btn('mine', _attr(_lbGradeLabel())) + btn('all', 'All grades');
  }

  listEl.innerHTML = '<p class="text-sm text-gray-400 text-center py-6">Loading the board…</p>';
  if (rankEl) rankEl.innerHTML = '';

  const grade = (_lbGrade === 'mine' && SELECTED_GRADE) ? SELECTED_GRADE : null;
  const [rows, rank] = await Promise.all([
    Store.getPointsLeaderboard(grade, 50),
    Store.getMyPointsRank(grade),
  ]);

  // ⚠ null is a FAILED read; [] is a real answer ("nobody has scored yet").
  //   Conflating them would draw "be the first!" over a network blip.
  if (rows === null) {
    listEl.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-6">Could not load the leaderboard. Check your connection and try again.</p>';
    return;
  }

  if (!rows.length) {
    listEl.innerHTML = `<div class="text-center py-8">
      <div class="text-5xl mb-3">🌍</div>
      <p class="text-sm font-bold text-gray-700 dark:text-white mb-1">No scores here yet</p>
      <p class="text-xs text-gray-500 dark:text-gray-400">Answer some questions and you could be the first on this board!</p>
    </div>`;
    return;
  }

  if (rankEl && rank && rank.ok) {
    const inTop = rows.some(r => r.is_me);
    rankEl.innerHTML = `<div class="rounded-xl px-4 py-3 text-center"
      style="background:rgba(99,102,241,.08);border:1px solid rgba(99,102,241,.25)">
      <div class="text-xs text-indigo-600 dark:text-indigo-300">You are</div>
      <div class="text-2xl font-extrabold text-indigo-700 dark:text-indigo-200">#${rank.rank}</div>
      <div class="text-xs text-gray-500 dark:text-gray-400">of ${rank.total} ${rank.total === 1 ? 'player' : 'players'} · ${rank.points} points${inTop ? '' : ' · keep going to reach the top 50!'}</div>
    </div>`;
  }

  const medal = (r) => r === 1 ? '🥇' : r === 2 ? '🥈' : r === 3 ? '🥉' : '';
  listEl.innerHTML = rows.map(r => {
    const m = medal(r.rank);
    const me = !!r.is_me;
    const rowStyle = me
      ? 'background:rgba(99,102,241,.08);border:1px solid rgba(99,102,241,.28)'
      : r.rank <= 3
      ? 'background:rgba(251,191,36,.08);border:1px solid rgba(251,191,36,.25)'
      : 'border:1px solid transparent';
    return `<div class="flex items-center gap-3 rounded-xl px-3 py-2 mb-1" style="${rowStyle}">
      <span class="w-8 shrink-0 text-center ${m ? 'text-xl' : 'text-xs font-bold text-gray-400'}">${m || r.rank}</span>
      <span class="text-xl select-none">${_attr(r.avatar || '⭐')}</span>
      <div class="flex-1 min-w-0">
        <div class="text-sm font-bold text-gray-800 dark:text-white truncate">${_attr(r.display_name)}${me ? ' <span class="text-xs text-indigo-400 font-normal">(you)</span>' : ''}</div>
        <div class="text-xs text-gray-500 dark:text-gray-400">Grade ${_attr(r.grade)} · Level ${_attr(r.level)}</div>
      </div>
      <div class="shrink-0 text-sm font-bold ${r.rank === 1 ? 'text-amber-500' : me ? 'text-indigo-500' : 'text-gray-500 dark:text-gray-300'}">${r.points}<span class="text-xs font-normal ml-0.5">pts</span></div>
    </div>`;
  }).join('');
}

// Whether the child may see the board at all. Cached per session: it is one
// admin switch, and asking on every dashboard render would cost a round trip
// per navigation to answer the same question.
let _lbEnabledCache = null;
async function _lbIsEnabled() {
  if (_lbEnabledCache !== null) return _lbEnabledCache;
  try {
    const on = await Store.leaderboardEnabled();
    // ⚠ A failed read is NOT "enabled". The safe answer for a switch that is
    //   off by default is off.
    _lbEnabledCache = on === true;
  } catch (_) { _lbEnabledCache = false; }
  return _lbEnabledCache;
}

async function _renderGlobalLbEntry() {
  const btn = document.getElementById('dash-global-lb');
  if (!btn) return;
  const on = await _lbIsEnabled();
  btn.classList.toggle('hidden', !on);
}


// ── FAMILY LEADERBOARD ────────────────────────
function _renderLeaderboard() {
  const el = document.getElementById('pd-leaderboard');
  if (!el) return;
  const accounts = Store.getAccounts();
  if (accounts.length < 2) { el.innerHTML = '<p class="text-xs text-gray-500 dark:text-gray-400 text-center py-2">Add more children to see the leaderboard.</p>'; return; }

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
        <div class="text-xs text-gray-500 dark:text-gray-400">Lv.${a.level} · ${a.xp} XP · ${a.acc}% accuracy</div>
      </div>
    </div>`).join('<hr class="border-gray-100 dark:border-gray-700">');
}

// ── PARENT DASHBOARD ──────────────────────────
// Paints the credit balance onto the Shop button, and refreshes it from the
// server in the background. Called from the parent dashboard render, so a
// parent sees a number without opening anything.
function _renderShopChip() {
  if (typeof Shop === 'undefined') return;
  const paint = () => {
    const n = Shop.balance();
    const chip = document.getElementById('pd-credit-chip');
    if (chip) {
      chip.textContent = n > 999 ? '999+' : String(n);
      chip.classList.toggle('hidden', n <= 0);
    }
    _renderCreditChip();
  };
  paint();
  Shop.refresh().then(paint).catch(() => {});
}

// The header credit balance.
//
// Parent sessions only, and deliberately so: a child has no balance of their
// own - the credits belong to the account holder - and putting a number they
// cannot spend in front of them only invites "can I have 250 credits". A parent
// previewing a child (pdSwitchStudent) is still a parent session, so they keep
// seeing theirs.
//
// Hidden at zero as well. "🪙 0" is not information, it is clutter, and the
// Shop button on the parent dashboard is the discovery path for someone who has
// never earned any.
// ── Today's goal card ─────────────────────────
// Rendered into both landing screens: a child with more than one subject lands
// on the kid home, a child with one lands on the dashboard.
// ══════════════════════════════════════════════
//  TASK BUTTONS - today's plan, and anything paused
//
//  The dashboard used to carry two full schedule panels: "Today's Study Plan"
//  and a 14-day upcoming list. A child who had just tapped a subject in order to
//  practise landed on a screen where the first thing under the greeting was a
//  stack of suggestions about something else. Reported as "the scheduler
//  suggestion may confuse the kid", and it is a fair reading of a screen that
//  answered a question nobody had asked.
//
//  Both are now one small button with a count and a one-line summary. The detail
//  did not go anywhere - it is on the Schedule screen, one tap away, which is
//  where a child goes when they actually want to know what is planned.
// ══════════════════════════════════════════════
const _TASK_SLOTS = ['task-slot-kidhome', 'task-slot-dashboard'];

// Everything the CHILD paused, newest first. Parent assignments are deliberately
// absent: work somebody else set is not work you postponed, and piling the two
// into one list is how the old panels became noise.
function _pausedTasks() {
  if (!ACTIVE_STUDENT_ID) return [];
  const store = _pruneResumeStore(_readResumeStore());
  const out = [];

  if (store.exam) {
    const s = store.exam;
    out.push({
      kind: 'exam',
      icon: '📝',
      title: s.examType === 'quick' ? 'Quick Exam' : 'Full Exam',
      sub: `Question ${(s.idx || 0) + 1} of ${(s.qIds || []).length}`,
      subject: _resumeSubjectLabel(s.subjectId) || '',
      ts: s.ts || 0,
      go: `_doResume('exam')`,
      drop: `_clearExamResume()`,
    });
  }

  // A chapter's name has to be looked up across ALL packs, not just CHAPTERS:
  // the global holds only the ACTIVE subject, and a child can have chapters
  // paused in three different subjects at once.
  const allChapters = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [])
    .flatMap(p => (p._chapters || p.chapters || []));

  Object.entries(store.practice)
    .sort((a, b) => (b[1].ts || 0) - (a[1].ts || 0))
    .forEach(([chapterId, s]) => {
      const ch = allChapters.find(c => c.id === chapterId);
      out.push({
        kind: 'practice',
        icon: (ch && ch.icon) || '📘',
        title: (ch && ch.name) || 'Practice',
        sub: `Question ${(s.idx || 0) + 1} of ${(s.qIds || []).length}`,
        subject: _resumeSubjectLabel(s.subjectId) || '',
        ts: s.ts || 0,
        go: `_doResume('practice','${chapterId}')`,
        drop: `_clearPracticeResume('${chapterId}')`,
      });
    });

  return out;
}

function _pausedSummary(tasks) {
  const ex = tasks.filter(t => t.kind === 'exam').length;
  const ch = tasks.length - ex;
  const bits = [];
  if (ch) bits.push(`${ch} chapter${ch === 1 ? '' : 's'}`);
  if (ex) bits.push(`${ex} exam`);
  return bits.join(' · ');
}

function _taskButton({ cls, icon, title, count, sub, meta, onclick, muted }) {
  return `<button class="task-btn ${cls}${muted ? ' is-muted' : ''}" onclick="${onclick}">
    <span class="task-ico" aria-hidden="true">${icon}</span>
    <span class="task-body">
      <span class="task-title">${title}${count ? `<span class="task-badge">${count}</span>` : ''}</span>
      <span class="task-sub">${sub}</span>
      ${meta ? `<span class="task-meta">${meta}</span>` : ''}
    </span>
  </button>`;
}

// Paints synchronously from the resume store (instant, no network), then fills
// the plan half once the calendar answers. A child should never watch a spinner
// where a button is about to be.
function _renderTaskButtons() {
  const slots = _TASK_SLOTS.map(id => document.getElementById(id)).filter(Boolean);
  if (!slots.length) return;

  if (!ACTIVE_STUDENT_ID || (typeof _isParentSession === 'function' && _isParentSession())) {
    slots.forEach(s => { s.innerHTML = ''; });
    return;
  }

  const paused = _pausedTasks();
  const paint = (planBtn) => {
    const resumeBtn = paused.length ? _taskButton({
      cls: 'is-resume', icon: '⏸', title: 'Pick up again', count: paused.length,
      sub: _pausedSummary(paused), meta: 'Tap to choose', onclick: 'openResumeTasks()',
    }) : '';
    const html = (planBtn || '') + resumeBtn;
    // Nothing planned and nothing paused: show nothing at all rather than two
    // empty boxes explaining their own emptiness.
    slots.forEach(s => { s.innerHTML = html ? `<div class="task-row">${html}</div>` : ''; });
  };

  paint('');

  if (typeof Calendar === 'undefined' || !Calendar.getUpcoming) return;
  Calendar.getUpcoming(ACTIVE_STUDENT_ID, 0).then(items => {
    const today = (items || []).filter(e => e.isToday);
    if (!today.length) { paint(''); return; }
    const mins = today.reduce((n, e) => n + (e.minutes || 0), 0);
    const subjects = [...new Set(today.map(e => e.subjectName).filter(Boolean))];
    paint(_taskButton({
      cls: 'is-plan', icon: '🗓️', title: "Today's plan", count: today.length,
      sub: subjects.length ? subjects.join(' · ') : `${today.length} session${today.length === 1 ? '' : 's'}`,
      meta: mins ? `about ${mins} min` : '',
      onclick: `showScreen('schedule')`,
    }));
  }).catch(() => {});
}
window._renderTaskButtons = _renderTaskButtons;

// ── The "pick up again" sheet ──────────────────
window.openResumeTasks = function () {
  const m = document.getElementById('modal-resume-tasks');
  if (!m) return;
  renderResumeTasks();
  m.classList.remove('hidden');
};
window.closeResumeTasks = function () {
  document.getElementById('modal-resume-tasks')?.classList.add('hidden');
};

function renderResumeTasks() {
  const list = document.getElementById('rt-list');
  const sub  = document.getElementById('rt-sub');
  if (!list) return;
  const tasks = _pausedTasks();

  if (sub) sub.textContent = tasks.length
    ? _pausedSummary(tasks) + ' waiting'
    : 'Nothing waiting';

  if (!tasks.length) {
    list.innerHTML = `<div class="text-center py-8">
      <div class="text-4xl mb-2 select-none">✅</div>
      <p class="text-sm font-semibold text-gray-700 dark:text-gray-200">All caught up!</p>
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Anything you pause with "Continue Later" shows up here.</p>
    </div>`;
    return;
  }

  list.innerHTML = tasks.map(t => `<div class="rt-item">
    <span class="rt-ico" aria-hidden="true">${t.icon}</span>
    <div class="rt-body">
      <div class="rt-title">${_profEsc(t.title)}</div>
      <div class="rt-sub">${_profEsc(t.sub)}${t.subject ? ' · ' + _profEsc(t.subject) : ''}</div>
    </div>
    <button class="rt-go" onclick="closeResumeTasks(); ${t.go}">Continue →</button>
    <button class="rt-drop" title="Remove this" aria-label="Remove ${_attr(t.title)}"
      onclick="${t.drop}; renderResumeTasks(); _renderTaskButtons(); _renderResumeBanner();">✕</button>
  </div>`).join('');
}
window.renderResumeTasks = renderResumeTasks;


const _GOAL_SLOTS = ['goal-slot-kidhome', 'goal-slot-dashboard', 'sh-goal-slot'];

function _renderDailyGoal() {
  const slots = _GOAL_SLOTS.map(id => document.getElementById(id)).filter(Boolean);
  if (!slots.length) return;

  // A parent previewing a child is not doing today's practice, and the card
  // would read as the PARENT's goal on the parent's own screen.
  if (!ACTIVE_STUDENT_ID || (typeof _isParentSession === 'function' && _isParentSession())) {
    slots.forEach(s => { s.innerHTML = ''; });
    return;
  }

  const g   = _goalToday();
  const pct = g.goal ? Math.min(1, g.raw / g.goal) : 0;

  // SVG ring. r=26 → circumference 2πr; the dash offset is the unfilled part.
  const R = 26, C = 2 * Math.PI * R;
  const ring = `<svg viewBox="0 0 60 60" class="goal-ring" aria-hidden="true">
      <circle cx="30" cy="30" r="${R}" class="goal-ring-bg"></circle>
      <circle cx="30" cy="30" r="${R}" class="goal-ring-fg${g.met ? ' is-done' : ''}"
        style="stroke-dasharray:${C.toFixed(1)};stroke-dashoffset:${(C * (1 - pct)).toFixed(1)}"></circle>
    </svg>`;

  const headline = g.met
    ? "Today's goal done! 🎉"
    : g.raw === 0 ? "Today's goal" : 'Keep going!';
  const sub = g.met
    ? `${g.raw} question${g.raw === 1 ? '' : 's'} today. Come back tomorrow to keep it up.`
    : `${g.left} more question${g.left === 1 ? '' : 's'} to finish today.`;

  // Level line - the other half of the fix. XP was already awarded on every
  // correct answer and shown nowhere a child on a phone could see it.
  const xp   = DB.xp || 0;
  const lv   = DB.level || 1;
  const curr = XP_THRESHOLDS[lv - 1] || 0;
  const next = XP_THRESHOLDS[lv] || null;
  const lvName = LEVEL_NAMES[lv - 1] || '';
  const lvLine = next
    ? `⭐ Level ${lv} · ${lvName} - ${Math.max(0, next - xp)} XP to Level ${lv + 1}`
    : `⭐ Level ${lv} · ${lvName} - top level reached!`;
  const lvPct = next && next > curr ? Math.min(100, Math.round((xp - curr) / (next - curr) * 100)) : 100;

  const html = `<div class="goal-card${g.met ? ' is-done' : ''}">
    <div class="goal-main">
      <div class="goal-ring-wrap">
        ${ring}
        <span class="goal-ring-txt">${g.met ? '✓' : `${g.raw}<small>/${g.goal}</small>`}</span>
      </div>
      <div class="goal-text">
        <div class="goal-head">${headline}</div>
        <div class="goal-sub">${sub}</div>
        <div class="goal-lv">${lvLine}</div>
        <div class="goal-lv-bar"><span style="width:${lvPct}%"></span></div>
      </div>
    </div>
    ${_goalWeekStrip()}
  </div>`;

  slots.forEach(s => { s.innerHTML = html; });
}
window._renderDailyGoal = _renderDailyGoal;

// Last 7 days. Three states, and they mean different things: goal met, showed up
// but short of it, nothing. A bare streak number cannot say any of that.
function _goalWeekStrip() {
  const daily = DB.daily || {};
  const LETTER = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  let met = 0, active = 0;
  const cells = [];
  for (let i = 6; i >= 0; i--) {
    const key = _muDayKeyBack(i);
    const d   = daily[key] || {};
    const a   = d.a || 0;
    const isMet = !!d.g || (a > 0 && a >= _dailyGoal());
    if (isMet) met++;
    if (a > 0) active++;
    // Day-of-week from the key by hand - new Date('YYYY-MM-DD') parses as UTC
    // midnight and prints in the device timezone, shifting the letter for
    // anyone west of Greenwich.
    const [y, m, dd] = key.split('-').map(Number);
    const dow = new Date(Date.UTC(y, m - 1, dd)).getUTCDay();
    const cls = isMet ? 'is-met' : a > 0 ? 'is-part' : '';
    const title = `${_repNiceDate(key)} - ${a ? `${a} question${a === 1 ? '' : 's'}` : 'nothing'}`;
    cells.push(`<span class="goal-day ${cls}" title="${_attr(title)}"><i>${LETTER[dow]}</i></span>`);
  }
  return `<div class="goal-week">
    <div class="goal-week-days">${cells.join('')}</div>
    <div class="goal-week-note">${
      met ? `Goal met on ${met} of the last 7 days.`
          : active ? `Practised ${active} of the last 7 days - finish today's goal to fill a circle.`
                   : 'Finish today to start filling in your week.'}</div>
  </div>`;
}

// The header level chip - the mobile-visible half of the XP system.
// ⚠ Student sessions only, and the mirror image of _renderCreditChip(): a child
// sees their level where a parent sees their credits, and neither sees the
// other's. A parent previewing a child has that child's DB loaded, so without
// the guard the parent's header would show the child's level as their own.
function _renderLevelChip() {
  const chip = document.getElementById('hdr-level');
  if (!chip) return;
  const isParent = typeof _isParentSession === 'function' && _isParentSession();
  const show = !!ACTIVE_STUDENT_ID && !isParent;
  chip.classList.toggle('hidden', !show);
  if (show) {
    const n = document.getElementById('hdr-level-n');
    if (n) n.textContent = String(DB.level || 1);
    chip.title = `Level ${DB.level || 1} · ${LEVEL_NAMES[(DB.level || 1) - 1] || ''} - tap to see your progress`;
  }
}
window._renderLevelChip = _renderLevelChip;

// ── Parent PIN row (Account & Settings → Security) ──
// ⚠ The PIN is stored in localStorage, which is scoped to the ORIGIN and the
// browser profile - NOT to the device. The copy says "in this browser" for
// that reason, and the distinction is not pedantic: a parent who set a PIN on
// a dev/preview deploy URL and then opens production gets asked to create one
// again, and so does anyone switching browser or opening a private window.
// Safari also deletes script-writable storage after 7 days without a visit.
// "On this device" told them none of that could have happened.
//
// It guards the switch from a child's session back to the parent dashboard on
// a shared phone or tablet. Deliberately NOT an account setting - see the PIN
// notes in CLAUDE.md before moving it.
function _renderParentPinRow() {
  const state = document.getElementById('prof-pin-state');
  const setBtn = document.getElementById('prof-pin-set');
  const clrBtn = document.getElementById('prof-pin-clear');
  if (!state || !setBtn || !clrBtn) return;
  const has = typeof Auth !== 'undefined' && Auth.hasParentPin && Auth.hasParentPin();

  state.textContent = has
    ? 'Set in this browser. You type it to switch back from your child’s view.'
    : 'Not set in this browser. Without one, switching back needs your email and password.';
  setBtn.textContent = has ? 'Change' : 'Set a PIN';
  clrBtn.classList.toggle('hidden', !has);
}
window._renderParentPinRow = _renderParentPinRow;

window._setParentPinFromSettings = function () {
  if (typeof Auth === 'undefined' || !Auth.openParentPinSetup) return;
  Auth.openParentPinSetup();
};

window._clearParentPinFromSettings = function () {
  _confirmModal(
    'Remove the parent PIN from this browser?\n\n'
    + 'Switching back from your child’s view will then need your email and password.',
    () => {
      Auth.clearParentPin();
      _renderParentPinRow();
      toast('Parent PIN removed from this browser.', 3000);
    },
    { icon: '🔢', okLabel: 'Remove it', danger: true }
  );
};

function _renderCreditChip() {
  const chip = document.getElementById('hdr-credits');
  const isParent = typeof _isParentSession === 'function' && _isParentSession();

  // ⚠ Also fixes something that predates credits: the streak and XP chips read
  // DB, and in a parent session DB holds whichever CHILD is loaded. A parent has
  // been looking at "🔥 12 day streak" that was never theirs. One reading of the
  // header per session type - a child sees their streak, a parent sees their
  // credits - and as a bonus the two no longer compete for the same row, which
  // is what pushed the desktop header onto a second line.
  document.body.classList.toggle('is-parent-session', isParent);

  if (!chip) return;
  const n = (typeof Shop !== 'undefined') ? Shop.balance() : 0;
  const show = isParent && n > 0;
  chip.classList.toggle('hidden', !show);
  if (show) {
    const el = document.getElementById('hdr-credits-count');
    if (el) el.textContent = n > 9999 ? '9999+' : String(n);
  }
}
window._renderCreditChip = _renderCreditChip;

// Shown to an account whose access has lapsed. Deliberately not an error: they
// can still reach anything they bought with credits, and saying so is the whole
// reason expiry stopped being a locked door.
function _renderExpiredBanner(slotId) {
  const slot = document.getElementById(slotId);
  if (!slot) return;
  const expired = typeof Auth !== 'undefined' && Auth.isAccessExpired && Auth.isAccessExpired();
  if (!expired) { slot.innerHTML = ''; return; }
  const live = (typeof Shop !== 'undefined') ? Shop.owned().length : 0;
  slot.innerHTML = `
    <div class="rounded-2xl border border-amber-300 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-900/20 p-4 mb-4 flex items-start gap-3">
      <span class="text-2xl select-none shrink-0">⏳</span>
      <div class="flex-1 min-w-0">
        <div class="font-bold text-amber-800 dark:text-amber-200 text-sm">Your access has expired</div>
        <p class="text-xs text-amber-700 dark:text-amber-300 mt-0.5 leading-relaxed">
          ${live
            ? `You can still use the ${live} chapter${live === 1 ? '' : 's'} you unlocked with credits until ${live === 1 ? 'it runs' : 'they run'} out. Everything else is paused.`
            : 'Chapters are paused. You can unlock individual ones with referral credits, or renew your plan.'}
        </p>
        <div class="flex gap-2 mt-2">
          <button onclick="showScreen('shop')" class="text-xs font-bold bg-amber-500 hover:bg-amber-400 text-white px-3 py-1.5 rounded-lg transition-colors">🛒 Shop</button>
          <button onclick="Auth.openInviteModal()" class="text-xs font-bold text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700 px-3 py-1.5 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors">🎁 Earn credits</button>
        </div>
      </div>
    </div>`;
}

async function renderParentDashboard() {
  const _el = id => document.getElementById(id);
  // Reset to the My Children panel on every open
  ['calendar','shop','messages','settings'].forEach(p =>
    _el(`pd-panel-${p}`)?.classList.add('hidden'));
  _el('pd-panel-children')?.classList.remove('hidden');
  const _nav = document.querySelector('#screen-parent .teacher-navigation');
  if (_nav) _nav.querySelectorAll('.ta-tab').forEach(btn =>
    btn.setAttribute('aria-selected', btn.id === 'pd-tab-children' ? 'true' : 'false'));
  _renderShopChip();
  _renderExpiredBanner('pd-expired-slot');
  _refreshParentMessageBadge();
  if (typeof LearningCoach !== 'undefined') LearningCoach.renderParent();

  const students    = Auth.getStudents() || [];
  const hasStudents = students.length > 0;
  // An empty list has two very different causes. Showing "add your first
  // child" over a failed query hides children the parent has already created
  // and invites them to create duplicates.
  // A signed-in parent with no family row is the same kind of failure one step
  // earlier - the children query never even ran, so it left no error behind.
  // ⚠ Only ever a READ failure now. "This parent never finished setup" no
  // longer reaches this screen at all - _handleParentSession() routes it back
  // to family-setup, because there is nothing here for them to retry. So say
  // what the database actually said rather than a sentence that fits both.
  const loadError   = !hasStudents
    ? (Store.lastFamilyStudentsError?.()
       || ((Auth.getParentProfile?.() && !Auth.getFamily?.())
             ? (Store.lastFamilyError?.() || 'Your family record could not be loaded.') : null))
    : null;

  if (_el('pd-load-error'))    _el('pd-load-error').classList.toggle('hidden', !loadError);
  if (_el('pd-load-error-msg')) _el('pd-load-error-msg').textContent = loadError || '';
  if (_el('pd-no-children'))   _el('pd-no-children').classList.toggle('hidden', hasStudents || !!loadError);
  if (_el('pd-children-grid')) _el('pd-children-grid').classList.toggle('hidden', !hasStudents);
  _el('pd-children-heading')?.classList.toggle('hidden', !hasStudents);
  _el('pd-weekly-details')?.classList.toggle('hidden', students.length < 2);
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
          : 'Everything is free right now';
      }
    }).catch(() => {});
  }

  // Show family name so parents know what to tell their kids for login
  const _famNameEl = _el('pd-family-name-display');
  if (_famNameEl) _famNameEl.textContent = Auth.getFamily()?.family_name || '';

  _renderTeacherApplyCard();

  // First-time parent onboarding hints
  _checkParentHints();

  if (!hasStudents) return;

  const grid = _el('pd-children-grid');
  if (!grid) return;

  // Render skeleton cards first for instant paint
  grid.innerHTML = students.map(s => `
    <div role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.click();}" aria-label="View ${_profEsc(s.display_name || s.username)} - progress and controls" class="pd-child-card bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border-2 border-transparent
      hover:border-indigo-300 dark:hover:border-indigo-600 cursor-pointer transition-all active:scale-95"
      onclick="PD.selectChild('${s.id}')">
      <div class="flex items-center gap-3 mb-3">
        <span class="text-4xl select-none">${s.avatar || '🧒'}</span>
        <div class="min-w-0">
          <div class="font-bold text-gray-800 dark:text-white truncate">${_profEsc(s.display_name || s.username)}</div>
          <!-- Login name, not decoration: two children can share a display name
               (and will, if a delete ever half-fails), and this is the only
               thing on the card that tells them apart. -->
          <div class="text-xs text-gray-500 dark:text-gray-400 truncate">Grade ${s.grade || '?'} · @${_profEsc(s.username || '?')}</div>
        </div>
      </div>
      <div id="pd-card-stats-${s.id}">
        <div class="h-3 bg-gray-100 dark:bg-gray-700 rounded-full animate-pulse mb-1.5"></div>
        <div class="h-3 bg-gray-100 dark:bg-gray-700 rounded-full animate-pulse w-2/3"></div>
      </div>
    </div>`).join('');

  // ONE query for every child, not N. The same result also feeds the family
  // overview, so the two views cannot disagree about a child's numbers - they
  // are reading the same objects.
  let progressById = await Store.loadFamilyProgress(students.map(s => s.id));
  if (!Object.keys(progressById).length) {
    // The batch read failed (loadFamilyProgress returns {} rather than a partial
    // result for exactly this reason). Fall back to the original per-child path
    // instead of painting every card empty.
    const pairs = await Promise.all(students.map(s =>
      Store.loadStudentProgress(s.id).then(p => [s.id, p]).catch(() => [s.id, null])));
    progressById = Object.fromEntries(pairs.filter(([, p]) => p));
  }

  _renderFamilyOverview(students, progressById);

  for (const s of students) {
    (prog => {
      const statsEl = document.getElementById(`pd-card-stats-${s.id}`);
      if (!statsEl) return;
      if (!prog) { statsEl.innerHTML='<p class="text-sm text-gray-600 dark:text-gray-300">Progress could not be loaded. Open this child to try again.</p>'; return; }
      const st  = prog.stats || {};
      const todayData = prog.daily?.[_muDayKey()] || {};
      const week = _repWindow(0,6,prog.daily || {});
      const studiedToday = (todayData.a || 0) > 0;
      const lastDate  = st.lastDate ? new Date(st.lastDate) : null;
      const daysSince = lastDate ? Math.floor((Date.now() - lastDate.getTime()) / 86400000) : null;
      const activityPill = studiedToday
        ? '<span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">✅ Studied today</span>'
        : (daysSince !== null && daysSince > 3)
          ? `<span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">⚠️ Last active ${daysSince}d ago</span>`
          : '<span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">⏳ No activity yet today</span>';
      const chips = _subjectChips(prog, s.grade);
      statsEl.innerHTML = `
        <div class="flex items-center gap-2 mb-2">${activityPill}</div>
        <div class="pd-child-today"><strong>Today</strong><p>${todayData.a ? `${todayData.a} answer attempts · ${todayData.c || 0} correct` : 'No practice recorded today yet.'}</p></div>
        <p class="text-sm text-gray-700 dark:text-gray-200 my-3"><strong>Last 7 days:</strong> ${week.a} answer attempts · ${week.days}/7 days practised${week.a ? ` · ${week.c} correct` : ''}</p>
        <p class="text-xs text-gray-600 dark:text-gray-300 mb-3">All time: ${st.totalAttempted || 0} answer attempts${st.totalAttempted ? ` · ${st.totalCorrect || 0} correct` : ''}. Repeats count as attempts, not completed work.</p>
        ${chips ? `<div class="pd-child-subjects"><p class="text-xs font-semibold mb-2">Grade ${_profEsc(String(s.grade || '?'))} subjects · all-time attempts</p><div class="flex flex-wrap gap-2">${chips}</div></div>` : ''}
        <p class="pd-child-next">${studiedToday ? 'See today’s work and choose what comes next.' : 'Open to choose a short practice task for today.'}</p>
        <span class="pd-child-open">View progress &amp; manage homework →</span>`;
    })(progressById[s.id]);
  }
}

// ══════════════════════════════════════════════
//  FAMILY OVERVIEW  (parent dashboard, above the children grid)
//  The one view that reads ALL children at once. Everything else in the app -
//  the detail panel, the Reports tab, the global DB itself - holds exactly one
//  child, so this is the only place a parent can see the household.
//  Fed by the same Store.loadFamilyProgress() result as the child cards, so the
//  two can never disagree about a child's numbers.
// ══════════════════════════════════════════════

// Shown from two children up. With one child it would restate the Reports tab
// directly below it, in less detail.
const _FAMILY_MIN_CHILDREN = 2;
// A child is "quiet" after this many days with nothing. Chosen to match the
// child card's own "⚠️ Last active Nd ago" threshold so the two never disagree
// on the same screen.
const _FAMILY_QUIET_DAYS = 3;

function _famRow(s, prog) {
  const daily = prog.daily || {};
  const now   = _repWindow(0, 6, daily);
  const prev  = _repWindow(7, 13, daily);
  const st    = prog.stats || {};
  // Days since anything at all, from the dated series rather than stats.lastDate:
  // lastDate is a toDateString() written on the device clock, and this table
  // sits next to Mauritius-keyed numbers.
  let quietFor = null;
  for (let i = 0; i < 120; i++) {
    if ((daily[_muDayKeyBack(i)] || {}).a) { quietFor = i; break; }
  }
  return {
    id: s.id,
    name: s.display_name || s.username || '?',
    avatar: s.avatar || '🧒',
    grade: s.grade || '?',
    now, prev, quietFor,
    streak: st.streak || 0,
    everDid: st.totalAttempted || 0,
  };
}

// 14 days, one cell per day. The only genuinely new thing this screen offers:
// who is actually turning up, side by side, at a glance.
function _famStrip(daily) {
  const cells = [];
  for (let i = 13; i >= 0; i--) {
    const k = _muDayKeyBack(i);
    const d = daily[k];
    if (!d || !d.a) {
      cells.push(`<span class="fam-cell" data-empty="1" title="${_attr(_repNiceDate(k))} - nothing"></span>`);
    } else {
      const pct = Math.round(d.c / d.a * 100);
      cells.push(`<span class="fam-cell" style="background:${_repAccColour(pct)}" title="${_attr(`${_repNiceDate(k)} - ${d.a} question${d.a > 1 ? 's' : ''}, ${pct}%`)}"></span>`);
    }
  }
  return `<span class="fam-strip">${cells.join('')}</span>`;
}

// Like _repDelta but appends "vs last week" so the comparison period is visible
// on the family overview cards (where the reader has no surrounding table header
// to supply that context).
function _repFamDelta(now, prev, unit) {
  if (now == null) return '<span class="text-[11px] text-gray-400">-</span>';
  if (prev == null || prev === 0) {
    return now > 0
      ? '<span class="text-[11px] font-semibold text-green-600 dark:text-green-400">new this week</span>'
      : '<span class="text-[11px] text-gray-400">-</span>';
  }
  const d = now - prev;
  if (d === 0) return '<span class="text-[11px] text-gray-400">same as last week</span>';
  const up = d > 0;
  const cls = up ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400';
  return `<span class="text-[11px] font-semibold ${cls}">${up ? '▲' : '▼'} ${Math.abs(d)}${unit || ''}</span><span class="text-[10px] text-gray-400 dark:text-gray-500"> vs last week</span>`;
}

function _renderFamilyOverview(students, progressById) {
  const slot = document.getElementById('pd-family-overview');
  if (!slot) return;
  if (!students || students.length < _FAMILY_MIN_CHILDREN || !progressById) {
    slot.classList.add('hidden');
    slot.innerHTML = '';
    return;
  }

  const rows = students
    .map(s => _famRow(s, progressById[s.id] || {}))
    .sort((a, b) => {
      // Ordered by who needs looking at, NOT by score. Ranking siblings against
      // each other is the wrong thing to put in front of a parent, and across
      // grades an accuracy comparison is not even meaningful.
      const q = (r) => r.quietFor === null ? 999 : r.quietFor;
      if (q(b) !== q(a)) return q(b) - q(a);
      // Both practised equally recently (typically both today). Break the tie on
      // who has done LESS this week, so the ordering keeps meaning something
      // instead of falling back to whatever order the children were created in.
      return a.now.a - b.now.a;
    });

  const fam = rows.reduce((t, r) => ({
    a: t.a + r.now.a, c: t.c + r.now.c, e: t.e + r.now.e,
    active: t.active + (r.now.a ? 1 : 0),
  }), { a: 0, c: 0, e: 0, active: 0 });
  const famPrev = rows.reduce((t, r) => ({ a: t.a + r.prev.a, c: t.c + r.prev.c, e: t.e + r.prev.e }), { a: 0, c: 0, e: 0 });
  const famAcc     = fam.a ? Math.round(fam.c / fam.a * 100) : null;
  const famPrevAcc = famPrev.a ? Math.round(famPrev.c / famPrev.a * 100) : null;
  // Days on which ANY child did something - "was this a week where the house
  // revised", which is not the same as any one child's day count.
  let famDays = 0;
  for (let i = 0; i < 7; i++) {
    const k = _muDayKeyBack(i);
    if (rows.some(r => ((progressById[r.id] || {}).daily || {})[k]?.a)) famDays++;
  }

  const nothingYet = rows.every(r => r.everDid === 0);
  const noDated    = rows.every(r => !Object.keys((progressById[r.id] || {}).daily || {}).length);

  const quiet = rows.filter(r => r.quietFor === null ? r.everDid > 0 : r.quietFor >= _FAMILY_QUIET_DAYS);
  const alerts = quiet.map(r => r.quietFor === null
    ? `${r.name} has not practised in a while`
    : `${r.name} - nothing for ${r.quietFor} day${r.quietFor > 1 ? 's' : ''}`);

  const table = rows.map(r => {
    const accCol = r.now.acc == null ? '' : `color:${_repAccColour(r.now.acc)}`;
    const trend = (r.now.acc != null && r.prev.acc != null)
      ? (r.now.acc - r.prev.acc >= 5 ? '<span class="text-green-600 dark:text-green-400" title="up on last week">▲</span>'
        : r.prev.acc - r.now.acc >= 5 ? '<span class="text-red-500 dark:text-red-400" title="down on last week">▼</span>'
        : '<span class="text-gray-400" title="about the same as last week">–</span>')
      : '<span class="text-gray-300 dark:text-gray-600" title="not enough history to compare">·</span>';
    return `<button class="fam-row" onclick="PD.selectChild('${_attr(r.id)}')" aria-label="${_attr(`Open ${r.name}'s dashboard`)}">
      <span class="text-xl select-none shrink-0">${_attr(r.avatar)}</span>
      <span class="fam-name">
        <span class="block text-sm font-semibold text-gray-800 dark:text-white truncate">${_attr(r.name)}</span>
        <span class="block text-[10px] text-gray-400 dark:text-gray-500">Grade ${_attr(r.grade)}</span>
      </span>
      ${_famStrip((progressById[r.id] || {}).daily || {})}
      <span class="fam-num text-gray-700 dark:text-gray-300">${r.now.a}<span class="fam-unit">Q</span></span>
      <span class="fam-num font-bold" style="${accCol}">${r.now.acc == null ? '-' : r.now.acc + '%'}</span>
      <span class="fam-num text-gray-500 dark:text-gray-400">${r.now.days}<span class="fam-unit">/7d</span></span>
      <span class="fam-num text-orange-500">${r.streak}<span class="fam-unit">🔥</span></span>
      <span class="fam-num">${trend}</span>
    </button>`;
  }).join('');

  const body = noDated
    ? `<p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
         ${nothingYet
           ? 'Once your children start practising, this shows who is keeping up and who has gone quiet.'
           : 'Day-by-day tracking starts with this update, so the week-on-week view fills in from their next practice session. Their totals are on each card below.'}
       </p>`
    : `<div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        ${_repStatCard('Questions answered', fam.a, _repFamDelta(fam.a, famPrev.a), '#2563eb')}
        ${_repStatCard('Family accuracy',    famAcc == null ? '-' : famAcc + '%', _repFamDelta(famAcc, famPrevAcc, '%'), famAcc == null ? '' : _repAccColour(famAcc))}
        ${_repStatCard('Practising',      `${fam.active}/${rows.length}`, `<span class="text-[11px] text-gray-400">children this week</span>`, '#7c3aed')}
        ${_repStatCard('Days covered',    `${famDays}/7`, `<span class="text-[11px] text-gray-400">someone revised</span>`, '#f97316')}
      </div>
      ${alerts.length ? `<div class="rounded-xl px-3 py-2.5 mb-3 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 text-xs leading-relaxed">
        ⚠️ ${_attr(alerts.join(' · '))}
      </div>` : ''}
      <!-- Labels are short because the columns are fixed-width and shared with
           the rows below; a longer word does not widen the column, it overflows
           it. No inline display here either - the mobile rule hides this cell. -->
      <div class="fam-head">
        <span></span>
        <span class="fam-name text-[10px] uppercase tracking-wide">Child</span>
        <span class="fam-strip text-[10px] uppercase tracking-wide">14d</span>
        <span class="fam-num text-[10px]">Qs</span>
        <span class="fam-num text-[10px]">Acc</span>
        <span class="fam-num text-[10px]">Days</span>
        <span class="fam-num text-[10px]">🔥</span>
        <span class="fam-num text-[10px]">vs</span>
      </div>
      <div class="divide-y divide-gray-100 dark:divide-gray-700">${table}</div>
      <p class="text-[10px] text-gray-400 dark:text-gray-500 mt-2.5 leading-relaxed">
        Questions, accuracy and days are the last 7 days; the bars are the last 14.
        Listed by who has been quietest, not by score - children in different grades are answering
        different questions, so their accuracy is not a like-for-like comparison. Tap a row for the full report.
      </p>`;

  slot.classList.remove('hidden');
  slot.innerHTML = `<div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
    <div class="flex items-baseline justify-between gap-2 mb-3">
      <div class="font-bold text-gray-800 dark:text-white text-sm">👨‍👩‍👧‍👦 The whole family, last 7 days</div>
      <div class="text-[11px] text-gray-400 dark:text-gray-500">${rows.length} children</div>
    </div>
    ${body}
  </div>`;
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
    dismissable: true,
  };

  // Only the unsolicited "Are you a tutor?" pitch is dismissable. The pending /
  // rejected / suspended cards report the state of an application the parent
  // actually filed, so hiding those would lose information they need.
  if (v.dismissable && _teacherPitchDismissed()) { slot.innerHTML = ''; return; }

  slot.innerHTML = `
    <div class="rounded-2xl border p-4 mb-4 relative ${v.cls}">
      ${v.dismissable ? `<button onclick="_dismissTeacherPitch()" aria-label="Dismiss"
        class="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-sm leading-none">✕</button>` : ''}
      <div class="flex items-start gap-3">
        <span class="text-2xl select-none shrink-0">${v.icon}</span>
        <div class="flex-1 min-w-0 ${v.dismissable ? 'pr-6' : ''}">
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

// ── PLANS & PAYMENT ────────────────────────────
// Payment is not live. The modal exists so families can see what is coming and
// know they are not about to be charged; every purchase control in it is
// disabled and nothing here talks to a payment provider. When payment does open,
// this is the one place to wire it up.
// There is deliberately no end-date constant here any more. The app is free,
// full stop, and paid plans arrive when they arrive - so FREE_UNTIL_LABEL, the
// <span data-free-until> fallbacks it overwrote and _applyFreeUntilLabel() were
// all removed together. A promise with a date on it has to be maintained on
// every surface at once or the app tells two stories; "free right now, paid
// plans later" needs no maintenance and stays true.

// ── Pricing ───────────────────────────────────
// features.price_was_mur, not a plans column: listPlans() selects explicit
// columns, and a column a not-yet-migrated database lacks makes that whole
// query 42703 and blanks the plans modal entirely. The features jsonb is
// already selected and an absent key just means "no promotion".
// Only shown when it is genuinely HIGHER than the live price - a "was" that is
// lower or equal is a data-entry slip, and striking it out would advertise a
// price rise as a discount.
function _planPromo(p) {
  const now = Number(p?.price_mur) || 0;
  const was = Number(p?.features?.price_was_mur) || 0;
  return (was > now) ? was : null;
}
function _formatMur(n) {
  return n > 0 ? `Rs ${n.toLocaleString('en-GB')}` : 'Free';
}

// "SAVE 57%" reads faster than two numbers the reader has to subtract.
// Rounded DOWN so the badge never overstates the discount: 350 → 150 is
// 57.14%, and claiming 58% off would be a smaller lie than it looks but a lie.
function _planSaveLabel(p) {
  const was = _planPromo(p);
  if (!was) return '';
  const pct = Math.floor(((was - (Number(p.price_mur) || 0)) / was) * 100);
  return pct >= 1 ? `Save ${pct}%` : '';
}

// The public pricing section is hand-written marketing copy, so this only
// replaces the NUMBERS - the bullets stay as authored. Progressive enhancement:
// if Supabase is unreachable or the plan row is missing, the markup's own
// hardcoded price stays on screen rather than blanking.
async function hydrateLandingPrices() {
  if (!document.querySelector('[data-plan-price]')) return;
  let plans = [];
  try { plans = await Store.listPlans(); } catch (e) {
    console.warn('[pricing] could not load plans, keeping the prices in the markup:', e?.message);
    return;
  }
  // Silent failure here is indistinguishable from "no promotion configured",
  // which is exactly the confusion this logging exists to end. listPlans()
  // filters on is_active, so a plan left as DRAFT in the admin Plans tab never
  // arrives and its card keeps whatever price is hardcoded in index.html.
  if (!plans.length) {
    console.warn('[pricing] no ACTIVE plans returned - every card is showing the '
      + 'price hardcoded in index.html. Set the plans to Live in Admin → Plans.');
    return;
  }
  const seen = new Set(plans.map(p => p.id));
  document.querySelectorAll('[data-plan-price]').forEach(el => {
    const id = el.dataset.planPrice;
    if (!seen.has(id)) {
      console.warn(`[pricing] plan "${id}" is not in the active plans list `
        + '(is it set to Draft?) - its card still shows the hardcoded price.');
    }
  });

  for (const p of plans) {
    const box = document.querySelector(`[data-plan-price="${CSS.escape(p.id)}"]`);
    if (!box) continue;
    if (!_planPromo(p) && Number(p?.features?.price_was_mur)) {
      console.warn(`[pricing] plan "${p.id}" has a was-price of `
        + `${p.features.price_was_mur} which is not higher than its price of `
        + `${p.price_mur} - no discount is shown for that.`);
    }
    const nowEl  = box.querySelector('[data-price-now]');
    const wasEl  = box.querySelector('[data-price-was]');
    const saveEl = box.querySelector('[data-price-save]');
    if (nowEl) nowEl.textContent = _formatMur(Number(p.price_mur) || 0);
    const promo = _planPromo(p);
    if (wasEl) {
      wasEl.textContent = promo ? _formatMur(promo) : '';
      wasEl.classList.toggle('hidden', !promo);
    }
    if (saveEl) {
      const label = _planSaveLabel(p);
      saveEl.textContent = label;
      saveEl.classList.toggle('hidden', !label);
    }
  }
}

// ══════════════════════════════════════════════
//  HEADER MENU (mobile / tablet)
//
//  Below 1100px the header's eight controls are hidden and replaced by one
//  "☰ Menu" button. This builds the sheet.
//
//  ⚠ The rows are read OFF the real buttons rather than listed here. Which
//  controls exist at any moment is decided in half a dozen places - auth.js
//  reveals Teacher only for an approved teacher, the beforeinstallprompt
//  handler reveals Install, showScreen() shows Account and Logout everywhere
//  except the auth screens, and Search only once a grade is active. A second
//  hard-coded list would drift out of step with all of that and start offering
//  a button the header had deliberately hidden.
// ══════════════════════════════════════════════

// ⚠ #header-logout-mobile is excluded as well as the menu button itself: it is
// a TWIN of #header-logout-btn, which is already in this list, and including
// both would put two identical "Log out" rows in the sheet.
const _MENU_EXCLUDED = new Set(['hdr-menu-btn', 'header-logout-mobile']);

function _headerMenuButtons() {
  return [...document.querySelectorAll('#hdr-actions .hdr-btn')]
    .filter(b => !_MENU_EXCLUDED.has(b.id) && !b.classList.contains('hidden'));
}

// A header control that kicks off async work has to say it heard the tap.
// Marks the button AND the ☰ sheet row bound to it, because below 1100px the
// row is the only one of the two a person can see.
function setHeaderBtnBusy(selector, busy) {
  const btn = document.querySelector(selector);
  if (!btn) return;
  btn.classList.toggle('is-busy', !!busy);
  btn.setAttribute('aria-busy', busy ? 'true' : 'false');
  if (busy) btn.setAttribute('aria-disabled', 'true'); else btn.removeAttribute('aria-disabled');
  // Rows are bound to these buttons BY INDEX (see below), so the same index
  // is the only correct way back from a button to its row.
  const idx = _headerMenuButtons().indexOf(btn);
  if (idx < 0) return;
  const row = document.querySelector('.hdr-menu-item[data-menu-idx="' + idx + '"]');
  if (!row) return;
  row.classList.toggle('is-busy', !!busy);
  row.setAttribute('aria-busy', busy ? 'true' : 'false');
}

function _buildHeaderMenu() {
  const list = document.getElementById('hdr-menu-list');
  if (!list) return;

  const rows = _headerMenuButtons().map((btn, i) => {
    const icon  = btn.querySelector('.hdr-ico')?.textContent?.trim() || '•';
    // data-menu-label wins where the button's own word is dynamic: the account
    // chip shows the person's NAME, which is right in a header and useless as a
    // menu row ("Priya" does not say what tapping it does).
    const label = btn.dataset.menuLabel || btn.querySelector('.hdr-word')?.textContent?.trim() || 'Open';
    let   desc  = btn.dataset.menuDesc || '';
    if (btn.id === 'theme-toggle') {
      desc = document.documentElement.classList.contains('dark')
        ? 'Currently dark - tap for light' : 'Currently light - tap for dark';
    }
    const danger = btn.id === 'header-logout-btn';
    return `<button type="button" class="hdr-menu-item${danger ? ' is-danger' : ''}" data-menu-idx="${i}">
      <span class="mi-ico" aria-hidden="true">${_profEsc(icon)}</span>
      <span class="flex-1 min-w-0">
        <span class="mi-label block truncate">${_profEsc(label)}</span>
        ${desc ? `<span class="mi-desc block">${_profEsc(desc)}</span>` : ''}
      </span>
    </button>`;
  });

  list.innerHTML = rows.length
    ? rows.join('')
    : '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-6">Nothing here yet.</p>';

  // Bound by index against the same live list the rows were built from, so a
  // row can never fire the wrong button. Re-read on click rather than captured,
  // because opening the sheet does not freeze the header.
  list.querySelectorAll('.hdr-menu-item').forEach(el => {
    el.addEventListener('click', () => {
      const target = _headerMenuButtons()[Number(el.dataset.menuIdx)];
      closeHeaderMenu();
      // After the sheet is gone: several of these open another modal or change
      // screen, and doing that under an overlay that is still up looks broken.
      if (target) setTimeout(() => target.click(), 0);
    });
  });
}

function _headerMenuIdentity() {
  const av   = document.getElementById('hdr-menu-avatar');
  const name = document.getElementById('hdr-menu-name');
  const sub  = document.getElementById('hdr-menu-sub');
  const parent  = (typeof Auth !== 'undefined' && Auth.getParentProfile) ? Auth.getParentProfile() : null;
  const student = (typeof Auth !== 'undefined' && Auth.getActiveAccount) ? Auth.getActiveAccount() : null;

  if (parent) {
    if (av)   av.textContent = '👤';
    if (name) name.textContent = parent.full_name || 'My account';
    if (sub)  sub.textContent  = 'Parent account';
  } else if (student) {
    if (av)   av.textContent = student.avatar || '🎒';
    if (name) name.textContent = student.name || 'My account';
    if (sub)  sub.textContent  = student.grade ? `Grade ${student.grade}` : '';
  } else {
    if (av)   av.textContent = '☰';
    if (name) name.textContent = 'Menu';
    if (sub)  sub.textContent  = '';
  }
}

function openHeaderMenu() {
  const m = document.getElementById('modal-hdr-menu');
  if (!m) return;
  _headerMenuIdentity();
  _buildHeaderMenu();
  m.classList.remove('hidden');
  document.getElementById('hdr-menu-btn')?.setAttribute('aria-expanded', 'true');
  document.addEventListener('keydown', _headerMenuEsc);
}
window.openHeaderMenu = openHeaderMenu;

window.closeHeaderMenu = function () {
  document.getElementById('modal-hdr-menu')?.classList.add('hidden');
  document.getElementById('hdr-menu-btn')?.setAttribute('aria-expanded', 'false');
  document.removeEventListener('keydown', _headerMenuEsc);
};

function _headerMenuEsc(e) { if (e.key === 'Escape') closeHeaderMenu(); }

// ══════════════════════════════════════════════
//  CREDIT SHOP (UI)
//
//  ⚠ Nothing here is a security boundary. The Buy button is a request, not a
//  decision: purchase_chapter() re-reads the price and the balance in the
//  database, and netlify/functions/questions.js decides what a child can
//  actually download. Editing a price, a balance or a disabled attribute in
//  devtools changes what this screen says and nothing else.
// ══════════════════════════════════════════════

// A child tapping a chapter they cannot open. Worth more than the old
// "Upgrade your plan" toast: with credits there is now something a family can
// actually DO about it, and the price is a concrete thing to go and ask for.
//
// Only a parent can buy - this is a kid screen (see _KID_ONLY_SCREENS), so the
// job here is to tell the child what to ask for, not to offer a Buy button
// they cannot use.
function _showChapterLockedModal(chapterId) {
  const ch    = CHAPTERS.find(c => c.id === chapterId);
  const name  = ch ? ch.name : 'This chapter';
  const price = (typeof Shop !== 'undefined') ? Shop.priceFor(chapterId) : null;
  const days  = (typeof Shop !== 'undefined') ? Shop.entitlementDays() : 30;
  const expired = typeof Auth !== 'undefined' && Auth.isAccessExpired && Auth.isAccessExpired();

  const msg = expired
    ? `${name} is paused because your access has expired.\n\nChapters your parent unlocked with credits still work until they run out.`
    : `${name} is not unlocked yet.\n\nYour parent can open it for ${price} credits - that keeps it open for ${days} days. They earn credits by inviting other families.`;

  _confirmModal(msg, () => {}, { icon: '🔒', okLabel: 'OK', cancelLabel: '' });
}

// ── The Shop page ──────────────────────────────
// Two things are sold: a whole SUBJECT (every chapter in it) and a single
// CHAPTER. Both grant the same thing underneath - a row in
// chapter_entitlements with an expiry - so the server-side check in
// questions.js needs no idea that subjects exist at all.
let _shopTab = 'subjects';

async function renderShop() {
  // A child has no balance of their own and must never be shown prices to go
  // and ask a parent about. The Shop is reached from the parent dashboard, but
  // showScreen() is called from a dozen places and one of them will eventually
  // be wrong.
  if (typeof _isParentSession === 'function' && !_isParentSession()) {
    toast('Only a parent can open the shop.', 2500);
    showScreen(ACTIVE_STUDENT_ID ? 'student-home' : 'landing');
    return;
  }
  // Always opens tidy. Which subjects are expanded is a browsing state, not
  // a preference - returning to the shop and finding six subjects still open
  // would undo the point of grouping them. Same rule as _examReviewWrongOnly
  // and _repShowAllMistakes: module-level view state resets where the screen
  // is built, never in the toggle.
  _shopOpen.clear();
  const _srch = document.getElementById('shop-search');
  if (_srch) _srch.value = '';
  const body = document.getElementById('shop-body');
  if (body) body.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-8">Loading…</p>';
  if (typeof Shop !== 'undefined') await Shop.refresh();
  renderShopList();
}

window.shopTab = function (tab) {
  _shopTab = tab === 'chapters' ? 'chapters' : 'subjects';
  [['subjects', 'shop-tab-subjects'], ['chapters', 'shop-tab-chapters']].forEach(([k, id]) => {
    const b = document.getElementById(id);
    if (!b) return;
    const on = _shopTab === k;
    b.classList.toggle('bg-white',           on);
    b.classList.toggle('dark:bg-gray-600',   on);
    b.classList.toggle('shadow',             on);
    b.classList.toggle('text-gray-800',      on);
    b.classList.toggle('dark:text-white',    on);
    b.classList.toggle('text-gray-500',     !on);
    b.classList.toggle('dark:text-gray-400', !on);
  });
  const search = document.getElementById('shop-search');
  if (search) search.placeholder = _shopTab === 'subjects' ? 'Search subjects…' : 'Search chapters…';
  renderShopList();
};

function _shopBadge(text, tone) {
  const tones = {
    owned: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300',
    price: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
    poor:  'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400',
  };
  return `<span class="text-[11px] font-bold px-2 py-1 rounded-full whitespace-nowrap ${tones[tone] || tones.price}">${text}</span>`;
}

function renderShopList() {
  const body = document.getElementById('shop-body');
  if (!body || typeof Shop === 'undefined') return;

  const bal  = Shop.balance();
  const days = Shop.entitlementDays();
  const set  = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = String(v); };
  set('shop-balance', bal);
  set('shop-days-note', days);

  const earn = document.getElementById('shop-earn-note');
  if (earn) {
    earn.textContent = Shop.settings().referral_earning_enabled === false
      ? 'Referral credits are paused at the moment.'
      : `You earn ${Shop.creditsPerRef()} credits each time a family you invited gets their child answering questions.`;
  }
  const note = document.getElementById('shop-note');
  if (note) {
    note.textContent = `Buying something you already have adds another ${days} days to it - `
      + 'you never lose time by unlocking early.';
  }

  if (Shop.settings().shop_enabled === false) {
    body.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-8">The shop is closed at the moment. Check back soon.</p>';
    return;
  }

  const q = (document.getElementById('shop-search')?.value || '').trim().toLowerCase();
  if (_shopTab === 'subjects') _renderShopSubjects(body, bal, days, q);
  else                         _renderShopChapters(body, bal, days, q);
}
window.renderShopList = renderShopList;

// ── Shop list rendering ───────────────────────────────────────────────────
// Reorganised: the old version rendered ONE flat list of every sellable
// chapter - 148 rows of "name / subject / price" with nothing but a search box
// between the parent and the thing they wanted. Now everything is grouped by
// GRADE, and within a grade each SUBJECT is a collapsed row that opens to show
// its chapters. 45 tidy rows instead of 148 loose ones, and the grade a parent
// cares about is one tap away.
//
// Searching deliberately FLATTENS the grouping: someone typing "fractions"
// wants the matches, not a tree to dig through. The groups come back when the
// box is cleared.
let _shopOpen = new Set();   // subjectIds whose chapter list is expanded

window.shopToggleSubject = function (subjectId) {
  if (_shopOpen.has(subjectId)) _shopOpen.delete(subjectId);
  else _shopOpen.add(subjectId);
  renderShopList();
};

function _shopGradeLabel(g) { return Number.isFinite(g) ? `Grade ${g}` : 'Other'; }

// One grade heading. Free grades never reach here (they are not sellable), so
// this is only ever a paid grade.
function _shopGradeHeader(grade, sub) {
  return `<div class="flex items-baseline gap-2 mt-4 first:mt-0 mb-1.5 pb-1 border-b border-gray-200 dark:border-gray-700">
    <span class="text-sm font-black text-gray-800 dark:text-white">${_profEsc(_shopGradeLabel(grade))}</span>
    <span class="text-[11px] text-gray-400 dark:text-gray-500">${_profEsc(sub)}</span>
  </div>`;
}

function _renderShopSubjects(body, bal, days, q) {
  const all = Shop.sellableSubjects();
  if (!all.length) {
    body.innerHTML = _shopEmpty('Subjects are still loading - come back in a moment.');
    return;
  }
  const list = q ? all.filter(s => s.name.toLowerCase().includes(q)) : all;
  if (!list.length) {
    body.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-6">No subject matches that search.</p>';
    return;
  }

  const rowFor = (sub) => {
    const afford = bal >= sub.price;
    const full   = sub.chapters > 0 && sub.unlocked === sub.chapters;
    return `<div class="flex items-center gap-3 py-2.5 border-b border-gray-100 dark:border-gray-700/60 last:border-0">
      <span class="text-2xl select-none shrink-0">${sub.icon}</span>
      <div class="flex-1 min-w-0">
        <div class="text-sm font-bold text-gray-800 dark:text-white truncate">${_profEsc(sub.shortName || sub.name)}</div>
        <div class="text-[11px] text-gray-500 dark:text-gray-400">
          ${sub.chapters} chapter${sub.chapters === 1 ? '' : 's'}${sub.unlocked
            ? ` · <span class="text-green-600 dark:text-green-400 font-semibold">${sub.unlocked} already unlocked</span>` : ''}
        </div>
      </div>
      ${full ? _shopBadge('All active', 'owned') : _shopBadge(sub.price + ' 🪙', afford ? 'price' : 'poor')}
      <button onclick="shopBuySubject('${_attr(sub.id)}', this)" ${afford ? '' : 'disabled'}
        class="shrink-0 text-xs font-bold px-3 py-2 rounded-xl transition-colors ${afford
          ? 'bg-indigo-500 hover:bg-indigo-400 text-white'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'}">
        ${full ? '+' + days + 'd' : 'Unlock'}</button>
    </div>`;
  };

  if (q) { body.innerHTML = list.map(rowFor).join(''); return; }

  let html = '';
  for (const grade of _shopGrades(list)) {
    const rows = list.filter(s => s.grade === grade);
    const chapters = rows.reduce((n, s) => n + s.chapters, 0);
    html += _shopGradeHeader(grade, `${rows.length} subject${rows.length === 1 ? '' : 's'} · ${chapters} chapters`);
    html += rows.map(rowFor).join('');
  }
  body.innerHTML = html + _shopFreeFootnote();
}

function _shopGrades(rows) {
  return [...new Set(rows.map(r => r.grade))].sort((a, b) => a - b);
}

function _shopEmpty(msg) {
  return `<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-8">${_profEsc(msg)}</p>`;
}

// Stated once at the bottom of each tab rather than as a row per grade: a
// parent scanning prices should not have to wonder why grades 1 and 2 are
// missing from a shop.
function _shopFreeFootnote() {
  if (typeof FREE_GRADES === 'undefined' || !FREE_GRADES.length) return '';
  const names = FREE_GRADES.map(g => 'Grade ' + g);
  const label = names.length === 2 ? names.join(' and ') : names.join(', ');
  return `<p class="text-[11px] text-green-700 dark:text-green-400 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/60 text-center leading-snug">
    ✅ <b>${_profEsc(label)}</b> are free for everyone - they are not sold here and never expire.
  </p>`;
}

function _renderShopChapters(body, bal, days, q) {
  const all = Shop.sellableChapters();
  if (!all.length) {
    body.innerHTML = _shopEmpty('Chapters are still loading - come back in a moment.');
    return;
  }

  const chapterRow = (c) => {
    const isOwned = Shop.isUnlocked(c.id);
    const price   = Shop.priceFor(c.id);
    const left    = Shop.daysLeft(c.id);
    const afford  = bal >= price;
    return `<div class="flex items-center gap-3 py-2 pl-2 border-b border-gray-100 dark:border-gray-700/50 last:border-0">
      <span class="text-lg select-none shrink-0">${c.icon}</span>
      <div class="flex-1 min-w-0">
        <div class="text-sm font-semibold text-gray-800 dark:text-white truncate">${_profEsc(c.name)}</div>
        ${q ? `<div class="text-[11px] text-gray-500 dark:text-gray-400 truncate">${_profEsc(c.subjectName)}</div>` : ''}
      </div>
      ${isOwned ? _shopBadge(left + ' day' + (left === 1 ? '' : 's') + ' left', 'owned')
                : _shopBadge(price + ' 🪙', afford ? 'price' : 'poor')}
      <button onclick="shopBuy('${_attr(c.id)}', this)" ${afford ? '' : 'disabled'}
        class="shrink-0 text-xs font-bold px-3 py-2 rounded-xl transition-colors ${afford
          ? 'bg-indigo-500 hover:bg-indigo-400 text-white'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'}">
        ${isOwned ? '+' + days + 'd' : 'Buy'}</button>
    </div>`;
  };

  // Search flattens: matches, not a tree.
  if (q) {
    const hits = all.filter(c => (c.name + ' ' + c.subjectName).toLowerCase().includes(q));
    body.innerHTML = hits.length
      ? hits.map(chapterRow).join('')
      : '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-6">No chapter matches that search.</p>';
    return;
  }

  // What the family already holds, pinned to the top with its remaining days:
  // "what have I got and when does it run out" is what a returning parent
  // opens this tab for, and it must not be buried inside a collapsed subject.
  const owned = all.filter(c => Shop.isUnlocked(c.id));
  let html = '';
  if (owned.length) {
    html += `<div class="mb-3">
      <h4 class="text-xs font-bold uppercase tracking-wide text-green-700 dark:text-green-400 mb-1">Active now (${owned.length})</h4>
      ${owned.map(c => `<div class="flex items-center gap-3 py-2 border-b border-gray-100 dark:border-gray-700/50 last:border-0">
        <span class="text-lg select-none shrink-0">${c.icon}</span>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-gray-800 dark:text-white truncate">${_profEsc(c.name)}</div>
          <div class="text-[11px] text-gray-500 dark:text-gray-400 truncate">${_profEsc(c.subjectName)}</div>
        </div>
        ${_shopBadge(Shop.daysLeft(c.id) + ' day' + (Shop.daysLeft(c.id) === 1 ? '' : 's') + ' left', 'owned')}
        <button onclick="shopBuy('${_attr(c.id)}', this)"
          class="shrink-0 text-xs font-bold px-3 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white transition-colors">+${days}d</button>
      </div>`).join('')}
    </div>`;
  }

  // Grade → subject (collapsed) → chapters.
  const bySubject = new Map();
  for (const c of all) {
    if (!bySubject.has(c.subjectId)) {
      bySubject.set(c.subjectId, { id: c.subjectId, name: c.subjectName, grade: c.grade, icon: c.subjectIcon || '📚', rows: [] });
    }
    bySubject.get(c.subjectId).rows.push(c);
  }
  const subjects = [...bySubject.values()];

  for (const grade of _shopGrades(subjects)) {
    const inGrade = subjects.filter(s => s.grade === grade);
    const chCount = inGrade.reduce((n, s) => n + s.rows.length, 0);
    html += _shopGradeHeader(grade, `${chCount} chapters`);
    for (const s of inGrade) {
      const open   = _shopOpen.has(s.id);
      const mine   = s.rows.filter(c => Shop.isUnlocked(c.id)).length;
      html += `<button type="button" onclick="shopToggleSubject('${_attr(s.id)}')"
          class="w-full flex items-center gap-3 py-2.5 text-left border-b border-gray-100 dark:border-gray-700/60 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors rounded-lg px-1"
          aria-expanded="${open ? 'true' : 'false'}">
        <span class="text-xl select-none shrink-0">${s.icon}</span>
        <span class="flex-1 min-w-0">
          <span class="block text-sm font-bold text-gray-800 dark:text-white truncate">${_profEsc(s.shortName || s.name)}</span>
          <span class="block text-[11px] text-gray-500 dark:text-gray-400">${s.rows.length} chapter${s.rows.length === 1 ? '' : 's'}${
            mine ? ` · <span class="text-green-600 dark:text-green-400 font-semibold">${mine} unlocked</span>` : ''}</span>
        </span>
        <span class="text-gray-400 dark:text-gray-500 text-xs shrink-0 transition-transform ${open ? 'rotate-90' : ''}">▶</span>
      </button>`;
      if (open) html += `<div class="pl-3 border-l-2 border-indigo-100 dark:border-indigo-900/40 ml-2 mb-2">${s.rows.map(chapterRow).join('')}</div>`;
    }
  }
  body.innerHTML = html + _shopFreeFootnote();
}

// One reporter for both purchase kinds - the server returns the same shapes.
function _shopPurchaseResult(res) {
  if (res && res.ok) {
    toast(`Unlocked! ${res.balance} credits left. 🎉`, 3000);
    launchConfetti();
    // ⚠ questions.js caches a family's entitlements for five minutes, so a
    // child already signed in on another device will not see this open
    // instantly. Saying so beats them thinking the purchase failed.
    setTimeout(() => toast('It can take a few minutes to appear on your child’s device.', 5000), 3200);
  } else if (res && res.error === 'insufficient_credits') {
    toast(`Not enough credits - that one costs ${res.price}.`, 3500);
  } else if (res && res.error === 'not_deployed') {
    toast('The shop is not switched on yet. Ask the administrator.', 4000);
  } else if (res && res.error === 'catalog_not_published') {
    toast('Whole subjects are not on sale yet - the administrator needs to publish the catalogue.', 5000);
  } else if (res && res.error === 'account_blocked') {
    toast('Purchases are paused on this account. Please contact support.', 4000);
  } else if (res && res.error === 'shop_closed') {
    toast('The shop is closed at the moment.', 3500);
  } else {
    toast('Could not complete that purchase. Please try again.', 3500);
  }
  renderShopList();
  _renderShopChip();
}

window.shopBuy = async function (chapterId, btn) {
  if (typeof Shop === 'undefined') return;
  const price = Shop.priceFor(chapterId);
  const name  = (Shop.sellableChapters().find(c => c.id === chapterId) || {}).name || 'this chapter';
  _confirmModal(
    `Unlock ${name} for ${price} credits?\n\nIt stays open for ${Shop.entitlementDays()} days.`,
    async () => {
      if (btn) { btn.disabled = true; btn.textContent = '…'; }
      _shopPurchaseResult(await Shop.buy(chapterId));
    },
    { icon: '🪙', okLabel: 'Unlock it', danger: false }
  );
};

window.shopBuySubject = async function (subjectId, btn) {
  if (typeof Shop === 'undefined') return;
  const sub = Shop.sellableSubjects().find(s => s.id === subjectId);
  if (!sub) return;
  _confirmModal(
    `Unlock all ${sub.chapters} chapters of ${sub.name} for ${sub.price} credits?\n\n`
      + `Every chapter stays open for ${Shop.entitlementDays()} days.`,
    async () => {
      if (btn) { btn.disabled = true; btn.textContent = '…'; }
      _shopPurchaseResult(await Shop.buySubject(subjectId));
    },
    { icon: '📚', okLabel: 'Unlock subject', danger: false }
  );
};

// The credits panel inside the Invite modal. Separate from the shop so the two
// can be opened in either order.
function renderInviteCredits() {
  if (typeof Shop === 'undefined') return;
  const bal = document.getElementById('rw-balance');
  if (bal) bal.textContent = String(Shop.balance());

  const rule = document.getElementById('rw-earn-rule');
  if (rule) {
    // An admin can switch earning off entirely. Saying "you earn 15 credits"
    // while the database is paying none would be a straight lie to the parent
    // doing the inviting.
    rule.textContent = Shop.settings().referral_earning_enabled === false
      ? 'Referral credits are paused at the moment - your invites still count and we will let you know when they pay again.'
      : `You earn ${Shop.creditsPerRef()} credits for every family that joins with your link - `
        + `counted once their child has answered their first practice question.`;
  }

  const pending = document.getElementById('rw-pending');
  if (pending) {
    const n = Shop.pendingReferrals();
    pending.textContent = n
      ? `${n} friend${n === 1 ? ' has' : 's have'} signed up but not started practising yet - you'll get the credits when they do.`
      : '';
  }
}
window.renderInviteCredits = renderInviteCredits;

async function openPlansModal() {
  const m = document.getElementById('modal-plans');
  if (!m) return;
  m.classList.remove('hidden');

  const list = document.getElementById('plans-list');
  if (!list) return;
  list.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-3">Loading…</p>';

  const profile = (typeof Auth !== 'undefined' && Auth.getParentProfile) ? Auth.getParentProfile() : null;
  const [plans, current] = await Promise.all([
    Store.listPlans(),
    profile?.id ? Store.getUserPlan(profile.id) : Promise.resolve({ plan_id: 'free' }),
  ]);

  if (!plans.length) {
    list.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-3">Plan details are not available right now.</p>';
    return;
  }

  const ICONS = { free: '🆓', starter: '⭐', premium: '👑', teacher: '👩‍🏫' };
  list.innerHTML = plans.map(p => {
    const isCurrent = p.id === (current?.plan_id || 'free');
    const promo = _planPromo(p);
    const save  = _planSaveLabel(p);
    const price = p.price_mur > 0
      ? `${promo ? `<span class="price-was mr-1">${_formatMur(promo)}</span>` : ''}`
        + `${_formatMur(p.price_mur)}/month`
        + `${save ? `<span class="price-save ml-2">${save}</span>` : ''}`
      : 'Free';
    const kids  = p.max_children === 1 ? '1 child' : `${p.max_children} children`;
    return `<div class="rounded-xl border p-3 ${isCurrent
        ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
        : 'border-gray-200 dark:border-gray-700'}">
      <div class="flex items-center gap-2">
        <span class="text-xl select-none">${ICONS[p.id] || '📦'}</span>
        <span class="flex-1 font-bold text-sm text-gray-800 dark:text-white">${_profEsc(p.name || p.id)}</span>
        ${isCurrent ? '<span class="text-[10px] font-bold uppercase tracking-wide bg-indigo-500 text-white px-2 py-0.5 rounded-full">Current</span>' : ''}
      </div>
      <div class="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-1">${price}</div>
      <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Up to ${kids}</div>
      ${isCurrent ? '' : '<button disabled class="mt-2 w-full py-2 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed">Available later</button>'}
    </div>`;
  }).join('');
}

function closePlansModal() {
  document.getElementById('modal-plans')?.classList.add('hidden');
}

// Keyed by user id so dismissing it on a shared device does not hide it from
// the next parent who signs in there.
function _teacherPitchKey() {
  const p = (typeof Auth !== 'undefined' && Auth.getParentProfile) ? Auth.getParentProfile() : null;
  return 'psac_tutor_pitch_hidden_' + (p?.id || 'anon');
}
function _teacherPitchDismissed() {
  try { return localStorage.getItem(_teacherPitchKey()) === '1'; } catch (e) { return false; }
}
function _dismissTeacherPitch() {
  try { localStorage.setItem(_teacherPitchKey(), '1'); } catch (e) {}
  const slot = document.getElementById('pd-teacher-apply');
  if (slot) slot.innerHTML = '';
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

  // MUST await pdSwitchStudent. It is async - it loads THIS child's progress
  // blob into the global DB - and nothing re-renders the panel when it lands.
  // Called without await, every renderDetail() below read the PREVIOUS child's
  // data, so a parent who tapped child A, went back, then tapped child B saw
  // A's questions, accuracy, streak and weak chapters under B's name.
  async function selectChild(id) {
    _activeId = id;

    const _el = el => document.getElementById(el);
    const s   = (Auth.getStudents() || []).find(st => st.id === id);

    if (_el('pd-children-grid')) _el('pd-children-grid').classList.add('hidden');
    if (_el('pd-no-children'))   _el('pd-no-children').classList.add('hidden');
    const panel = _el('pd-detail-panel');
    if (panel) panel.classList.remove('hidden');

    // Name and avatar come from the already-cached family row, so they can paint
    // immediately - the panel should not sit blank while the blob loads.
    if (s) {
      if (_el('pd-detail-avatar')) _el('pd-detail-avatar').textContent = s.avatar || '🧒';
      if (_el('pd-detail-name'))   _el('pd-detail-name').textContent   = s.display_name || s.username;
      if (_el('pd-detail-grade'))  _el('pd-detail-grade').textContent  = `Grade ${s.grade || '?'} · @${s.username || '?'}`;
    }
    pdTab('progress');

    // Blank the stats panel immediately so the previous child's numbers never
    // sit under the new child's name while the DB load is in flight.
    ['pd-total','pd-acc','pd-streak','pd-badges','pd-best-exam','pd-exam-count']
      .forEach(k => { const e = _el(k); if (e) e.textContent = '…'; });
    const _todayEl = _el('pd-today-status');
    if (_todayEl) _todayEl.innerHTML = '';

    await Auth.pdSwitchStudent(id);
    // The parent may have gone back and tapped a different child while this was
    // in flight. Whoever they picked last wins; this load is stale, and painting
    // it would put one child's numbers under another child's name.
    if (_activeId !== id) return;
    // A concurrent load for a different child may have finished after ours and
    // overwritten DB with the wrong student's data. ACTIVE_STUDENT_ID is set by
    // _loginStudentRow, so if it no longer matches we re-load before painting.
    if (typeof ACTIVE_STUDENT_ID !== 'undefined' && ACTIVE_STUDENT_ID !== id) {
      await Auth.pdSwitchStudent(id);
      if (_activeId !== id) return;
    }

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
    if (tab === 'assign')  { _renderAssignments(); _checkAssignHint(); }
    if (tab === 'reports') { _renderReports(); }
    if (tab === 'login')  { renderLoginTab(); }
  }

  // ── TAB: LOGIN DETAILS ──────────────────────────
  // Family name + username are always plaintext (nothing to hide, and the
  // child has to type them), so they render straight from the cached rows.
  // The PIN is bcrypt in the database with no plaintext fallback anywhere -
  // see engine/auth.js's _setStudentPin() - so it can only ever be shown here
  // in the same tab-session it was just set/reset in-memory (Auth.getJustSetPin).
  function renderLoginTab() {
    // _activeId FIRST. This is the parent dashboard, so the child whose panel is
    // open is the subject - getActiveAccount() is whatever student row happens
    // to be loaded, which after pdSwitchStudent can be a different child, and on
    // a shared device can be a leftover from an earlier session.
    const id = _activeId || Auth.getActiveAccount()?.id;
    if (!id) return;
    const student = (Auth.getStudents() || []).find(s => s.id === id);
    const family  = (Auth.getFamily && Auth.getFamily()) || {};

    const set = (elId, v) => { const el = document.getElementById(elId); if (el) el.textContent = v; };
    set('pd-login-family',   family.family_name || '-');
    // NEVER fall back to the display name here. _activeAccount.name is
    // display_name, not username, and the two routinely differ ("Emma" vs
    // "emma2025"). Printing one as the other under the heading "what your child
    // types on the login screen" hands the parent a credential that cannot log
    // in, with nothing to indicate it is wrong. A dash is the honest answer.
    set('pd-login-username', student?.username || '-');
    if (!student) {
      console.warn('[renderLoginTab] no student row for', id,
        '- sign-in details cannot be shown. Family students loaded:', (Auth.getStudents() || []).length);
    }

    const pin      = (typeof Auth.getJustSetPin === 'function') ? Auth.getJustSetPin(id) : '';
    const knownEl  = document.getElementById('pd-login-pin-known');
    const hiddenEl = document.getElementById('pd-login-pin-hidden');
    const setterEl = document.getElementById('pd-login-pin-setter');
    if (pin) {
      set('pd-login-pin', pin);
      // Tailwind CDN's .hidden can lose to a bare .flex present in the same
      // class list (style.css loads after the CDN) - so 'flex' is only ever
      // added once 'hidden' is gone, never left sitting there inert. Same
      // pattern as the admin/teacher header buttons in auth.js.
      knownEl?.classList.remove('hidden'); knownEl?.classList.add('flex');
      hiddenEl?.classList.add('hidden');
      setterEl?.classList.add('hidden');
    } else {
      knownEl?.classList.add('hidden'); knownEl?.classList.remove('flex');
      hiddenEl?.classList.remove('hidden');
      setterEl?.classList.add('hidden');
    }
    const pinInput = document.getElementById('pd-login-pin-input');
    if (pinInput) pinInput.value = '';
    const err = document.getElementById('pd-login-pin-error');
    if (err) err.classList.add('hidden');
  }

  function openPinSetter() {
    document.getElementById('pd-login-pin-hidden')?.classList.add('hidden');
    document.getElementById('pd-login-pin-setter')?.classList.remove('hidden');
    const input = document.getElementById('pd-login-pin-input');
    if (input) { input.value = ''; input.focus(); }
  }

  function suggestLoginPin() {
    const input = document.getElementById('pd-login-pin-input');
    if (input && typeof Auth !== 'undefined' && Auth.suggestChildPin) input.value = Auth.suggestChildPin();
  }

  async function saveLoginPin(btn) {
    const pin = (document.getElementById('pd-login-pin-input')?.value || '').trim();
    const err = document.getElementById('pd-login-pin-error');
    if (err) err.classList.add('hidden');
    if (btn) btn.disabled = true;
    const res = await Auth.setCurrentChildPin(pin);
    if (btn) btn.disabled = false;
    if (!res.ok) {
      if (err) { err.textContent = res.error; err.classList.remove('hidden'); }
      return;
    }
    toast('PIN updated ✅', 1800);
    renderLoginTab();
  }

  function copyLoginField(elId) {
    const text = document.getElementById(elId)?.textContent || '';
    if (!text || text === '-') return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => toast('Copied ✓', 1200), () => toast('Could not copy.', 1500));
    }
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

    if (_el('pd-total'))      _el('pd-total').textContent      = stats.totalAttempted || 0;
    if (_el('pd-acc'))        _el('pd-acc').textContent        = acc + '%';
    if (_el('pd-streak'))     _el('pd-streak').textContent     = (stats.streak || 0) + ' 🔥';
    if (_el('pd-badges'))     _el('pd-badges').textContent     = (DB.badges || []).length;
    if (_el('pd-best-exam'))  _el('pd-best-exam').textContent  = stats.bestScore ? stats.bestScore + '%' : '-';
    if (_el('pd-exam-count')) _el('pd-exam-count').textContent = stats.examCount || 0;

    _renderExamTimeline(DB);
    _renderWeakChapters(DB);
    _renderSubjectProgress(acct);
    _renderLeaderboard();
    _renderParentAssignDropdown(acct);
    _renderParentControls(acct);
    _renderAssignments();
  }

  async function _renderAssignments() {
    const listEl = document.getElementById('pd-asgn-list');
    if (!listEl || !_activeId) return;
    listEl.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-4">Loading…</p>';
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
          ${a.note ? `<div class="text-xs text-gray-500 dark:text-gray-400 italic">"${a.note}"</div>` : ''}
          <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 flex-wrap">
            <span>${new Date(a.created_at).toLocaleDateString()}</span>
            ${a.show_hints === false ? '<span class="text-amber-600 dark:text-amber-400 font-semibold">🚫 No hints</span>' : ''}
            ${a.show_answers === false ? '<span class="text-amber-600 dark:text-amber-400 font-semibold">🙈 Answers hidden</span>' : ''}
          </div>
        </div>
        <button onclick="Auth.removeAssignment('${a.id}')"
          class="shrink-0 text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-lg hover:bg-red-200 transition-colors">Remove</button>
      </div>`;
    }).join('') : '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No assignments yet. Add one above.</p>';
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
    // This is the PARENT's screen, so it says so plainly rather than using the
    // child-facing "ask a parent" wording.
    if (!_planAllowsFeature('push_reminders')) {
      if (statusEl) statusEl.textContent = 'Daily reminders are not included in your plan.';
      _showFeatureModal('push_reminders');
      return;
    }
    try {
      const res = await fetch('/.netlify/functions/push-subscribe', {
        method: 'POST',
        headers: await _pushAuthHeaders(),
        body: JSON.stringify({ studentId: _activeId, reminderTime: time }),
      });
      // 402 is this feature's own signal from push-subscribe.js, distinct from
      // a genuine failure - the server had the final say and said no.
      if (statusEl) statusEl.textContent = res.ok
        ? `Reminder saved for ${time} MU time. ✅`
        : res.status === 402
          ? 'Daily reminders are not included in your plan.'
          : 'Save failed - make sure the student has notifications enabled.';
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
  const _mounted = {};
  const _PD_PANELS = ['children', 'calendar', 'shop', 'messages', 'settings'];

  function _mountPanel(name, srcId) {
    if (_mounted[name]) return;
    const dest = document.getElementById(`pd-panel-${name}`);
    const src  = document.getElementById(srcId);
    if (!dest || !src) return;
    while (src.firstChild) dest.appendChild(src.firstChild);
    _mounted[name] = true;
  }

  async function _activatePanel(name, scrollTo) {
    switch (name) {
      case 'calendar':
        _mountPanel('calendar', 'screen-calendar');
        if (typeof Calendar !== 'undefined') Calendar.render();
        break;
      case 'shop':
        _mountPanel('shop', 'screen-shop');
        renderShop();
        break;
      case 'messages':
        _mountPanel('messages', 'screen-parent-messages');
        renderParentMessages();
        break;
      case 'settings': {
        const container = document.getElementById('pd-profile-content');
        if (container) {
          container.innerHTML = '<div class="flex justify-center py-10"><div class="w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div></div>';
          await _renderParentProfile(container);
          if (scrollTo) requestAnimationFrame(() =>
            document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
        }
        break;
      }
      case 'children':
      default:
        renderParentDashboard();
    }
  }

  function mainTab(name, scrollTo) {
    const nav = document.querySelector('#screen-parent .teacher-navigation');
    if (nav) {
      nav.querySelectorAll('.ta-tab').forEach(btn => {
        const isMe = btn.id === `pd-tab-${name}`;
        btn.setAttribute('aria-selected', isMe ? 'true' : 'false');
      });
    }
    _PD_PANELS.forEach(p => {
      document.getElementById(`pd-panel-${p}`)?.classList.toggle('hidden', p !== name);
    });
    _activatePanel(name, scrollTo);
  }

  const _origSelectChild = selectChild;
  async function selectChildWithReminder(id) {
    await _origSelectChild(id);
    setTimeout(_loadReminder, 300);
  }

  // Flipping one switch in the Controls tab used to call renderParentDashboard(),
  // which hides pd-detail-panel - so every toggle threw the parent back out to
  // the children grid and they had to tap back in. Only the controls actually
  // changed, so only the controls are re-rendered.
  function refreshControls() {
    _renderParentControls(Auth.getActiveAccount() || {});
  }

  return { selectChild: selectChildWithReminder, closeDetail, pdTab, renderDetail,
           saveReminder, clearReminder, refreshControls, mainTab,
           renderLoginTab, openPinSetter, suggestLoginPin, saveLoginPin, copyLoginField,
           activeId: () => _activeId };
})();

// ── PARENT DASHBOARD HELPERS ──────────────────
function _renderSubjectProgress(acct) {
  const spEl = document.getElementById('pd-subject-progress');
  if (!spEl) return;
  const studentGrade = acct?.grade || 5;
  const packs = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [])
    .filter(p => p.grade === studentGrade && !p.comingSoon);
  const lockedChs = DB.restrictions?.lockedChapters || [];
  if (!packs.length) { spEl.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400">No subjects loaded yet.</p>'; return; }
  spEl.innerHTML = packs.map(pack => {
    const chs    = pack._chapters || pack.chapters || [];
    const dbCh   = DB.chapters || {};
    const total   = chs.reduce((s, ch) => s + ((dbCh[ch.id]?.attempted) || 0), 0);
    const correct = chs.reduce((s, ch) => s + ((dbCh[ch.id]?.correct)   || 0), 0);
    // This is accuracy, not subject completion. A child can answer a handful
    // of familiar questions correctly and still have most of a subject unseen.
    const pct = total ? Math.round(correct / total * 100) : 0;
    const chaptersTried = chs.filter(ch => ((dbCh[ch.id]?.attempted) || 0) > 0).length;
    const col = pct >= 80 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#3b82f6';
    const chapRows = chs.map(ch => {
      const c  = (DB.chapters || {})[ch.id] || { attempted: 0, correct: 0 };
      const cp = c.attempted ? Math.round(c.correct / c.attempted * 100) : 0;
      const cc = cp >= 80 ? '#22c55e' : cp >= 50 ? '#f59e0b' : '#3b82f6';
      const lk = lockedChs.includes(ch.id) ? ' 🔒' : '';
      return `<div class="flex items-center gap-3 py-1.5 border-b border-gray-100 dark:border-gray-700 last:border-0">
        <span class="text-sm text-gray-700 dark:text-gray-300 flex-1 min-w-0 truncate">${ch.icon || '📖'} ${ch.name}${lk}</span>
        <span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-center shrink-0">${c.attempted}</span>
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
            <span class="text-xs font-bold" style="color:${col}">${pct}% accurate</span>
          </div>
        </div>
        <span class="text-xs text-gray-500 dark:text-gray-400 text-right">${total} answers<br>${chaptersTried}/${chs.length} chapters tried ▾</span>
      </button>
      <div class="hidden px-4 py-2">
        <p class="text-xs text-gray-500 dark:text-gray-400 py-1.5">Accuracy shows how often answers were correct - it is not subject completion. More practice questions remain in each chapter.</p>
        <div class="flex text-xs text-gray-500 dark:text-gray-400 uppercase border-b border-gray-100 dark:border-gray-700 pb-1 mb-1">
          <span class="flex-1">Chapter</span><span class="w-8 text-center">Answers</span><span style="width:90px" class="ml-3">Accuracy</span>
        </div>
        ${chapRows}
      </div>
    </div>`;
  }).join('');
}

// ══════════════════════════════════════════════
//  PARENT REPORTS  (parent dashboard → 📈 Reports)
//  Read-only view over DB.daily / DB.mistakes / DB.examHistory / DB.chapters.
//  Nothing here writes, so it works offline and needs no extra network call.
// ══════════════════════════════════════════════

// i days before today, as a Mauritius day key. Built by subtracting whole days
// from the MU-shifted clock, NOT with setDate() on a local Date - Mauritius has
// no DST so a fixed offset is exact, and a local Date would drift for a parent
// checking in from a country that does.
function _muDayKeyBack(i) {
  return new Date(Date.now() + _MU_OFFSET_MS - i * 86400000).toISOString().slice(0, 10);
}

// Sums a daily map over [fromDaysAgo, toDaysAgo] inclusive, counting back from
// today. `dailyMap` defaults to the currently-loaded child, but the family
// overview passes each sibling's own map - only one child's blob is ever in the
// global DB, so anything comparing children must pass it explicitly.
function _repWindow(fromDaysAgo, toDaysAgo, dailyMap) {
  const daily = dailyMap || DB.daily || {};
  let a = 0, c = 0, e = 0, days = 0;
  for (let i = fromDaysAgo; i <= toDaysAgo; i++) {
    const d = daily[_muDayKeyBack(i)];
    if (!d) continue;
    a += d.a || 0; c += d.c || 0; e += d.e || 0;
    if (d.a) days++;
  }
  return { a, c, e, days, acc: a ? Math.round(c / a * 100) : null };
}

// Deltas are shown against the previous window so a parent sees a direction,
// not just a number. A previous window of zero must render as "new"/"-" and
// NOT as a triumphant +100%.
function _repDelta(now, prev, unit) {
  if (now == null) return '<span class="text-[11px] text-gray-400">-</span>';
  if (prev == null || prev === 0) {
    return now > 0
      ? '<span class="text-[11px] font-semibold text-green-600 dark:text-green-400">new</span>'
      : '<span class="text-[11px] text-gray-400">-</span>';
  }
  const d = now - prev;
  if (d === 0) return '<span class="text-[11px] text-gray-400">no change</span>';
  const up = d > 0;
  const cls = up ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400';
  return `<span class="text-[11px] font-semibold ${cls}">${up ? '▲' : '▼'} ${Math.abs(d)}${unit || ''}</span>`;
}

function _repStatCard(label, value, delta, tone) {
  return `<div class="bg-gray-50 dark:bg-gray-700/40 rounded-xl px-3 py-2.5">
    <div class="text-lg font-bold leading-tight" style="${tone ? `color:${tone}` : ''}">${value}</div>
    <div class="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">${label}</div>
    <div class="mt-0.5">${delta}</div>
  </div>`;
}

function _repAccColour(pct) {
  return pct >= 80 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444';
}

// A day key is 'YYYY-MM-DD' and MUST be split by hand, not fed to new Date():
// that parses it as UTC midnight and then prints it in the device's timezone,
// showing the previous day to anyone west of Greenwich.
function _repNiceDate(key) {
  const [y, m, d] = String(key).split('-').map(Number);
  if (!y || !m || !d) return String(key);
  const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${d} ${MON[m - 1]}`;
}

// ── Today / Yesterday, chapter by chapter ─────
// The literal question a parent asks: "what did she do today?" Everything else
// in this tab is a trend; this is the one card that answers it in plain terms.
//
// Reads daily[key].ch, which only exists from the update that started recording
// it - an older day shows its totals and says the breakdown was not kept, which
// is honest and stops the card looking broken for the first two days.
function _repRecentDays() {
  const daily = DB.daily || {};
  const names = {};
  (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : []).forEach(p =>
    (p._chapters || p.chapters || []).forEach(c => {
      names[c.id] = { name: c.name, icon: c.icon || '📘', subject: `Grade ${p.grade} ${p.subject || p.name || ''}`.trim() };
    }));

  const card = (label, key) => {
    const d = daily[key];
    if (!d || !d.a) {
      return `<div class="rep-day-card is-empty">
        <div class="rep-day-when">${label}</div>
        <div class="rep-day-none">Nothing practised</div>
      </div>`;
    }
    const acc = Math.round((d.c || 0) / d.a * 100);
    const rows = Object.entries(d.ch || {})
      .sort((x, y) => y[1][0] - x[1][0])
      .map(([id, [a, c]]) => {
        const meta = names[id] || { name: id, icon: '📘', subject: '' };
        const p = a ? Math.round(c / a * 100) : 0;
        return `<div class="rep-ch-row">
          <span class="rep-ch-ico" aria-hidden="true">${meta.icon}</span>
          <span class="rep-ch-name">${_profEsc(meta.name)}</span>
          <span class="rep-ch-n">${a}q</span>
          <span class="rep-ch-pct" style="color:${_repAccColour(p)}">${p}%</span>
        </div>`;
      }).join('');

    return `<div class="rep-day-card">
      <div class="rep-day-when">${label}</div>
      <div class="rep-day-top">
        <span class="rep-day-q">${d.a} question${d.a === 1 ? '' : 's'}</span>
        <span class="rep-day-acc" style="color:${_repAccColour(acc)}">${acc}%</span>
        ${d.e ? `<span class="rep-day-exam">📝 ${d.e} exam${d.e === 1 ? '' : 's'}</span>` : ''}
      </div>
      ${rows || '<div class="rep-day-none">Chapter breakdown was not recorded for this day.</div>'}
    </div>`;
  };

  return `<div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow mb-4">
    <div class="font-bold text-gray-800 dark:text-white text-sm mb-1">🕘 What they did</div>
    <p class="text-[11px] text-gray-400 dark:text-gray-500 mb-2.5">Today and yesterday, chapter by chapter.</p>
    <div class="rep-days">
      ${card('Today', _muDayKeyBack(0))}
      ${card('Yesterday', _muDayKeyBack(1))}
    </div>
  </div>`;
}

// ── 30-day activity strip ─────────────────────
// Answers "does she actually sit down and do it?" - the question a parent asks
// first, and the one no cumulative total can answer.
function _repActivityStrip() {
  const daily = DB.daily || {};
  const DAYS = 30;
  const days = [];
  for (let i = DAYS - 1; i >= 0; i--) {
    const k = _muDayKeyBack(i);
    const d = daily[k] || { a: 0, c: 0, e: 0 };
    days.push({ k, a: d.a || 0, c: d.c || 0, e: d.e || 0 });
  }
  const max = Math.max(1, ...days.map(d => d.a));
  const active = days.filter(d => d.a).length;

  const bars = days.map(d => {
    if (!d.a) return `<div class="rep-day" data-empty="1" title="${_attr(_repNiceDate(d.k))} - nothing"></div>`;
    const pct = Math.round(d.c / d.a * 100);
    // Floor of 8% so a 2-question day still reads as a day she showed up,
    // instead of a sliver indistinguishable from the empty marker.
    const h = Math.max(8, Math.round(d.a / max * 100));
    const t = `${_repNiceDate(d.k)} - ${d.a} question${d.a > 1 ? 's' : ''}, ${pct}%${d.e ? `, ${d.e} exam${d.e > 1 ? 's' : ''}` : ''}`;
    return `<div class="rep-day" style="height:${h}%;background:${_repAccColour(pct)}" title="${_attr(t)}"></div>`;
  }).join('');

  return `<div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow mb-4">
    <div class="flex items-baseline justify-between gap-2 mb-1">
      <div class="font-bold text-gray-800 dark:text-white text-sm">📅 Last 30 days</div>
      <div class="text-xs text-gray-500 dark:text-gray-400">${active} of 30 days active</div>
    </div>
    <p class="text-[11px] text-gray-400 dark:text-gray-500 mb-2">Bar height is how much they did. Colour is how well.</p>
    <div class="rep-strip">${bars}</div>
    <div class="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 mt-1">
      <span>${_repNiceDate(days[0].k)}</span><span>today</span>
    </div>
    <div class="flex flex-wrap gap-x-3 gap-y-1 mt-2.5 text-[10px] text-gray-500 dark:text-gray-400">
      <span><span class="rep-key" style="background:#22c55e"></span> 80% and up</span>
      <span><span class="rep-key" style="background:#f59e0b"></span> 50–79%</span>
      <span><span class="rep-key" style="background:#ef4444"></span> under 50%</span>
    </div>
  </div>`;
}

// ── Accuracy trend, 8 weeks ───────────────────
function _repTrend() {
  const WEEKS = 8;
  const pts = [];
  for (let w = WEEKS - 1; w >= 0; w--) {
    const win = _repWindow(w * 7, w * 7 + 6);
    pts.push({ w, acc: win.acc, a: win.a });
  }
  const real = pts.filter(p => p.acc != null);
  if (real.length < 2) return '';

  const W = 300, H = 70, PAD = 6;
  const x = i => PAD + (i / (pts.length - 1)) * (W - PAD * 2);
  const y = v => PAD + (1 - v / 100) * (H - PAD * 2);

  // Two lines, deliberately. A SOLID segment joins consecutive active weeks -
  // that stretch is measured. A faint DASHED line spans the whole series so a
  // gap still reads as continuous, without claiming an improvement she was not
  // there to make. Solid-only was wrong: a single silent week between two
  // active ones left every run one point long and drew nothing at all.
  const all  = [];
  const segs = [];
  let run = [];
  pts.forEach((p, i) => {
    if (p.acc == null) { if (run.length > 1) segs.push(run); run = []; return; }
    const pt = `${x(i).toFixed(1)},${y(p.acc).toFixed(1)}`;
    all.push(pt);
    run.push(pt);
  });
  if (run.length > 1) segs.push(run);
  const spine = all.length > 1
    ? `<polyline points="${all.join(' ')}" fill="none" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="4 4" opacity=".45" stroke-linejoin="round"/>`
    : '';

  const first = real[0].acc, last = real[real.length - 1].acc;
  const diff = last - first;
  const verdict = diff >= 5
    ? `<span class="text-green-600 dark:text-green-400 font-semibold">up ${diff} points</span> over the weeks they have been active`
    : diff <= -5
      ? `<span class="text-red-500 dark:text-red-400 font-semibold">down ${Math.abs(diff)} points</span> over the weeks they have been active`
      : `<span class="text-gray-600 dark:text-gray-300 font-semibold">holding steady</span> around ${last}%`;

  return `<div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow mb-4">
    <div class="font-bold text-gray-800 dark:text-white text-sm mb-1">📈 Accuracy trend</div>
    <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-2">${verdict}</p>
    <svg class="rep-svg" viewBox="0 0 ${W} ${H}" role="img"
         aria-label="Weekly accuracy over the last ${WEEKS} weeks, most recently ${last} percent">
      <line x1="${PAD}" y1="${y(50).toFixed(1)}" x2="${W - PAD}" y2="${y(50).toFixed(1)}" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3" opacity=".45"/>
      <line x1="${PAD}" y1="${y(80).toFixed(1)}" x2="${W - PAD}" y2="${y(80).toFixed(1)}" stroke="#22c55e" stroke-width="1" stroke-dasharray="3 3" opacity=".45"/>
      ${spine}
      ${segs.map(s => `<polyline points="${s.join(' ')}" fill="none" stroke="#6366f1" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`).join('')}
      ${pts.map((p, i) => p.acc == null ? '' :
        `<circle cx="${x(i).toFixed(1)}" cy="${y(p.acc).toFixed(1)}" r="3.5" fill="${_repAccColour(p.acc)}"><title>${_attr(`${p.w === 0 ? 'this week' : p.w + ' week' + (p.w > 1 ? 's' : '') + ' ago'}: ${p.acc}% over ${p.a} questions`)}</title></circle>`).join('')}
    </svg>
    <div class="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 mt-1">
      <span>${WEEKS} weeks ago</span><span>dotted: 50% and 80%</span><span>this week</span>
    </div>
  </div>`;
}

// ── Exam scores over time ─────────────────────
function _repExams() {
  // Newest first in storage; a chart reads left to right in time.
  const hist = (DB.examHistory || []).slice().reverse();
  const rows = hist.filter(e => typeof (e.pct ?? e.score) === 'number');
  if (rows.length < 2) return '';
  const pcts = rows.map(e => e.pct ?? e.score);

  const W = 300, H = 70, PAD = 6;
  const x = i => PAD + (i / (pcts.length - 1)) * (W - PAD * 2);
  const y = v => PAD + (1 - v / 100) * (H - PAD * 2);
  const line = pcts.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const best = Math.max(...pcts);
  const avg  = Math.round(pcts.reduce((s, v) => s + v, 0) / pcts.length);

  return `<div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow mb-4">
    <div class="flex items-baseline justify-between gap-2 mb-2">
      <div class="font-bold text-gray-800 dark:text-white text-sm">📝 Exam scores</div>
      <div class="text-xs text-gray-500 dark:text-gray-400">${pcts.length} exams · best ${best}% · avg ${avg}%</div>
    </div>
    <svg class="rep-svg" viewBox="0 0 ${W} ${H}" role="img"
         aria-label="Scores from the last ${pcts.length} exams, most recent ${pcts[pcts.length - 1]} percent">
      <line x1="${PAD}" y1="${y(50).toFixed(1)}" x2="${W - PAD}" y2="${y(50).toFixed(1)}" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3" opacity=".45"/>
      <polyline points="${line}" fill="none" stroke="#0ea5e9" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
      ${pcts.map((v, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="3.5" fill="${_repAccColour(v)}"><title>${_attr(`${_repExamDate(rows[i])}: ${v}%`)}</title></circle>`).join('')}
    </svg>
    <div class="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 mt-1">
      <span>${_attr(_repExamDate(rows[0]))}</span><span>${_attr(_repExamDate(rows[rows.length - 1]))}</span>
    </div>
  </div>`;
}

// Rows written before the iso field existed carry only a locale date string,
// and "30/08/2026" is Invalid Date to every parser. Prefer iso; otherwise show
// the legacy string as-is rather than round-tripping it through Date.
function _repExamDate(e) {
  if (e && e.iso) {
    const d = new Date(e.iso);
    if (!isNaN(d)) return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
  }
  return (e && e.date) || '';
}

// ── Subject ranking ───────────────────────────
// Weakest first: the parent is here to find what to do something about.
function _repSubjects(acct) {
  const grade = acct && acct.grade ? acct.grade : 5;
  const packs = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [])
    .filter(p => p.grade === grade && !p.comingSoon);
  const dbCh = DB.chapters || {};
  const rows = packs.map(pack => {
    const chs = pack._chapters || pack.chapters || [];
    const a = chs.reduce((s, ch) => s + ((dbCh[ch.id] && dbCh[ch.id].attempted) || 0), 0);
    const c = chs.reduce((s, ch) => s + ((dbCh[ch.id] && dbCh[ch.id].correct) || 0), 0);
    // An untouched chapter is a gap, not a weakness - a more useful and more
    // honest thing to tell a parent than a 0% that looks like failure.
    const touched = chs.filter(ch => ((dbCh[ch.id] && dbCh[ch.id].attempted) || 0) > 0).length;
    return { name: pack.subject || pack.name, icon: pack.icon, a, touched, total: chs.length,
             acc: a ? Math.round(c / a * 100) : null };
  }).filter(r => r.total);
  if (!rows.length) return '';

  const done  = rows.filter(r => r.acc != null).sort((x, y) => x.acc - y.acc);
  const never = rows.filter(r => r.acc == null);
  if (!done.length) return '';

  const row = r => {
    const tag = r.acc >= 80 ? ['Strong', 'text-green-600 dark:text-green-400']
              : r.acc >= 50 ? ['Getting there', 'text-amber-600 dark:text-amber-400']
              : ['Needs work', 'text-red-500 dark:text-red-400'];
    return `<div class="flex items-center gap-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <span class="text-lg select-none shrink-0">${r.icon || '📘'}</span>
      <div class="flex-1 min-w-0">
        <div class="text-sm font-semibold text-gray-800 dark:text-white truncate">${_attr(r.name)}</div>
        <div class="text-[11px] text-gray-500 dark:text-gray-400">${r.a} questions · ${r.touched} of ${r.total} chapters started</div>
      </div>
      <div class="text-right shrink-0">
        <div class="text-sm font-bold" style="color:${_repAccColour(r.acc)}">${r.acc}%</div>
        <div class="text-[10px] font-semibold ${tag[1]}">${tag[0]}</div>
      </div>
    </div>`;
  };

  return `<div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow mb-4">
    <div class="font-bold text-gray-800 dark:text-white text-sm mb-0.5">📚 Subjects, weakest first</div>
    <p class="text-[11px] text-gray-400 dark:text-gray-500 mb-1">Where the next hour of revision is worth the most.</p>
    ${done.map(row).join('')}
    ${never.length ? `<div class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 text-[11px] text-gray-500 dark:text-gray-400">
      Not started yet: ${never.map(r => `${r.icon || '📘'} ${_attr(r.name)}`).join(' · ')}
    </div>` : ''}
  </div>`;
}

// ── Recent mistakes ───────────────────────────
// Module-level, and reset in _renderReports() rather than in the toggle - the
// same rule as _examReviewWrongOnly, or the next child's panel opens expanded.
let _repShowAllMistakes = false;
function _repToggleMistakes() { _repShowAllMistakes = !_repShowAllMistakes; _renderReports(true); }

function _repMistakes() {
  const all = DB.mistakes || [];
  if (!all.length) return '';
  const shown = _repShowAllMistakes ? all : all.slice(0, 8);

  const item = m => `<div class="bg-gray-50 dark:bg-gray-700/40 rounded-xl px-3 py-2.5">
    <div class="flex items-center gap-2 mb-1">
      <span class="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 truncate">${_attr(m.chn || m.ch)}</span>
      ${m.sub ? `<span class="text-[10px] text-gray-400 dark:text-gray-500 truncate">${_attr(m.sub)}</span>` : ''}
      <span class="text-[10px] text-gray-400 dark:text-gray-500 ml-auto shrink-0">${_attr(_repRelDate(m.d))}</span>
    </div>
    <div class="text-xs text-gray-800 dark:text-gray-200 mb-1.5 leading-snug">${_attr(m.q)}</div>
    <div class="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px]">
      <span class="text-red-500 dark:text-red-400">Answered <b>${m.ua ? _attr(m.ua) : 'nothing'}</b></span>
      ${m.ca ? `<span class="text-green-600 dark:text-green-400">Correct <b>${_attr(m.ca)}</b></span>` : ''}
    </div>
  </div>`;

  return `<div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow mb-4">
    <div class="font-bold text-gray-800 dark:text-white text-sm mb-0.5">❌ Recent mistakes (${all.length})</div>
    <p class="text-[11px] text-gray-400 dark:text-gray-500 mb-2.5">The actual questions they got wrong. Go over these together.</p>
    <div class="space-y-2">${shown.map(item).join('')}</div>
    ${all.length > 8 ? `<button onclick="_repToggleMistakes()" class="w-full mt-2.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
      ${_repShowAllMistakes ? 'Show fewer ▲' : `Show all ${all.length} ▼`}
    </button>` : ''}
  </div>`;
}

function _repRelDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return '';
  const days = Math.floor((Date.now() - d.getTime()) / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
}

// One plain sentence at the top. A parent who reads nothing else should still
// come away knowing whether this week went well.
function _repHeadline(now, prev, name) {
  let msg, tone;
  if (!now.a) {
    msg = `${name} has not practised in the last 7 days.`;
    tone = 'amber';
  } else if (now.days >= 5) {
    msg = `${name} practised on ${now.days} of the last 7 days. That consistency is the thing that moves exam scores.`;
    tone = 'green';
  } else if (prev.a && now.a < prev.a / 2) {
    msg = `${name} did about half as much as the week before. Worth asking how it is going.`;
    tone = 'amber';
  } else if (now.acc != null && prev.acc != null && now.acc - prev.acc >= 5) {
    msg = `${name}'s accuracy is up ${now.acc - prev.acc} points on last week.`;
    tone = 'green';
  } else if (now.acc != null && prev.acc != null && prev.acc - now.acc >= 10) {
    msg = `Accuracy is down ${prev.acc - now.acc} points. That is often a sign they have moved on to harder chapters rather than that they are doing worse.`;
    tone = 'amber';
  } else {
    msg = `${name} answered ${now.a} question${now.a > 1 ? 's' : ''} across ${now.days} day${now.days > 1 ? 's' : ''} this week.`;
    tone = 'blue';
  }
  const c = { green: 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300',
              amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300',
              blue:  'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300' }[tone];
  return `<div class="mt-3 rounded-xl px-3 py-2.5 text-xs leading-relaxed ${c}">${_attr(msg)}</div>`;
}

// ── Main ──────────────────────────────────────
// keepState is passed only by the mistakes toggle, which re-renders the whole
// tab and must not undo the expansion it just asked for.
function _renderReports(keepState) {
  const el = document.getElementById('pd-reports');
  if (!el) return;
  if (!keepState) _repShowAllMistakes = false;

  const acct = (typeof Auth !== 'undefined' && Auth.getActiveAccount()) || {};
  const name = String(acct.name || 'Your child').trim().split(/\s+/)[0];

  // A child with no dated history. This is also EVERY existing child on the day
  // this ships - DB.daily starts empty and fills from the next answer on - so
  // the empty state has to say that, not read as "no data, something is broken".
  const hasAny = Object.keys(DB.daily || {}).length > 0;
  if (!hasAny) {
    const everDid = (DB.stats && DB.stats.totalAttempted) || 0;
    el.innerHTML = `<div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow text-center">
      <div class="text-4xl mb-3 select-none">📈</div>
      <div class="font-bold text-gray-800 dark:text-white mb-1.5">No reports yet</div>
      <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">${
        everDid
          ? `${_attr(name)} has answered ${everDid} questions, but day-by-day tracking only starts with this update. Reports build up from the next practice session.`
          : `Once ${_attr(name)} starts practising, this tab shows week-on-week progress, which subjects need work, and the questions they got wrong.`
      }</p>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-3">The <b>Progress</b> tab has the running totals in the meantime.</p>
    </div>`;
    return;
  }

  // Rolling 7-day windows, not calendar weeks. On a Monday a calendar week holds
  // one day, and "questions down 95%" would be an artefact of the day it is
  // rather than anything the child did.
  const now  = _repWindow(0, 6);
  const prev = _repWindow(7, 13);

  const summary = `<div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow mb-4">
    <div class="flex items-baseline justify-between gap-2 mb-2.5">
      <div class="font-bold text-gray-800 dark:text-white text-sm">🗓️ Last 7 days</div>
      <div class="text-[11px] text-gray-400 dark:text-gray-500">vs the 7 days before</div>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
      ${_repStatCard('Questions',   now.a, _repDelta(now.a, prev.a), '#2563eb')}
      ${_repStatCard('Accuracy',    now.acc == null ? '-' : now.acc + '%', _repDelta(now.acc, prev.acc, '%'), now.acc == null ? '' : _repAccColour(now.acc))}
      ${_repStatCard('Days active', now.days + '/7', _repDelta(now.days, prev.days), '#f97316')}
      ${_repStatCard('Exams',       now.e, _repDelta(now.e, prev.e), '#0d9488')}
    </div>
    ${_repHeadline(now, prev, name)}
  </div>`;

  // Today/Yesterday goes FIRST, above the trends. It is the question a parent
  // actually opened this tab to answer; a 30-day chart is what they look at
  // second.
  el.innerHTML = summary
    + _repRecentDays()
    + _repActivityStrip()
    + _repTrend()
    + _repExams()
    + _repSubjects(acct)
    + _repMistakes()
    + `<button onclick="_repShare()" class="w-full text-sm font-semibold text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 shadow rounded-2xl py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">📤 Share this summary</button>`;
}

// Same Web Share / clipboard pattern as shareResult(). Plain text on purpose -
// this gets pasted into WhatsApp to a tutor or to the other parent.
async function _repShare() {
  const acct = (typeof Auth !== 'undefined' && Auth.getActiveAccount()) || {};
  const name = acct.name || 'My child';
  const now = _repWindow(0, 6), prev = _repWindow(7, 13);
  const spots = (DB.mistakes || []).slice(0, 3).map(m => `  - ${m.chn || m.ch}`).join('\n');
  const text = [
    `${name} - last 7 days`,
    `Questions: ${now.a}${prev.a ? ` (was ${prev.a})` : ''}`,
    `Accuracy: ${now.acc == null ? '-' : now.acc + '%'}${prev.acc != null ? ` (was ${prev.acc}%)` : ''}`,
    `Days practised: ${now.days} of 7`,
    now.e ? `Exams taken: ${now.e}` : '',
    spots ? `\nRecent trouble spots:\n${spots}` : '',
    `\nPSAC Exam Practice`,
  ].filter(Boolean).join('\n');

  try {
    if (navigator.share) { await navigator.share({ title: `${name} - progress`, text }); return; }
    await navigator.clipboard.writeText(text);
    toast('Summary copied! 📋', 2000);
  } catch (_) { /* dismissed share sheet, or clipboard denied - not an error */ }
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

// One row per live grade. The child's OWN grade is checked and disabled - it is
// not a permission, it is who they are - and every other grade is the parent's
// to grant one at a time. A grade BELOW their own is offered on purpose: that is
// how a parent sets up catch-up revision. The child's own Game Zone control
// cannot reach downwards (see GradeAccess.childChoices).
function _renderGradeAccess(acct) {
  const host = document.getElementById('pd-grade-access');
  if (!host) return;
  if (typeof GradeAccess === 'undefined') { host.innerHTML = ''; return; }
  const own     = Number(acct?.grade) || 5;
  const live    = GradeAccess.liveGrades();
  const granted = new Set(GradeAccess.granted(DB.restrictions));
  if (!live.length) {
    host.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-3">No grades are available yet.</p>';
    return;
  }
  const tag = g => g === own ? 'their grade' : g < own ? 'catch-up' : 'ahead';
  host.innerHTML = live.map(g => {
    const mine = g === own;
    const on   = mine || granted.has(g);
    return `<label class="flex items-center justify-between gap-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0${mine ? '' : ' cursor-pointer'}">
      <span class="text-sm text-gray-700 dark:text-gray-300">Grade ${g}
        <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">${tag(g)}</span>
      </span>
      <input type="checkbox" class="accent-blue-500 w-5 h-5 shrink-0"${on ? ' checked' : ''}${mine ? ' disabled' : ''}
        aria-label="Grade ${g}"${mine ? '' : ` onchange="Auth.toggleGradeAccess(${g}, this.checked)"`}>
    </label>`;
  }).join('') + (granted.size
    ? '<p class="text-xs text-gray-500 dark:text-gray-400 mt-3">Search and cross-grade revision are open for the ticked grades. In games, your child chooses which of the grades at or above their own to include.</p>'
    : `<p class="text-xs text-gray-500 dark:text-gray-400 mt-3">Only Grade ${own} is open. Tick another grade to let them search and revise it.</p>`);
}

function _renderParentControls(acct) {
  const _el     = id => document.getElementById(id);
  const maxDiff = DB.restrictions?.maxDifficulty  ?? 4;
  const examOff = DB.restrictions?.examDisabled   ?? false;
  const lockedChs = DB.restrictions?.lockedChapters || [];

  [1,2,3,4].forEach(lv => { const r = _el(`pd-maxdiff-${lv}`); if (r) r.checked = maxDiff === lv; });
  const examToggle = _el('pd-exam-toggle');
  if (examToggle) examToggle.checked = !examOff;
  _renderGradeAccess(acct);
  const hintsToggle = _el('pd-hints-toggle');
  if (hintsToggle) hintsToggle.checked = !(DB.restrictions?.hintsDisabled ?? false);
  const gamesToggle = _el('pd-games-toggle');
  if (gamesToggle) gamesToggle.checked = !(DB.restrictions?.minigamesDisabled ?? false);
  if (typeof GameSettings !== 'undefined') GameSettings.renderParentCard(acct);

  const chLocks = _el('pd-chapter-locks');
  if (!chLocks) return;

  const lockGrade = acct?.grade || 5;
  const lockPacks = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [])
    .filter(p => p.grade === lockGrade && !p.comingSoon);

  if (!lockPacks.length) { chLocks.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-3">No subjects loaded yet.</p>'; return; }

  chLocks.innerHTML = lockPacks.map((pack, idx) => {
    const packChs    = (pack._chapters || pack.chapters || []).filter(ch => !ch.enrichment);
    const enrichChs  = (pack._chapters || pack.chapters || []).filter(ch =>  ch.enrichment);
    const lockedMain = packChs.filter(ch => lockedChs.includes(ch.id) || _adminBlocksChapter(ch.id)).length;
    const hasLocked  = lockedMain > 0;
    const isOpen     = hasLocked || idx === 0;

    const pill = hasLocked
      ? `<span class="text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">${lockedMain} locked</span>`
      : `<span class="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">All open</span>`;

    const mkRow = (ch, isEnr) => {
      // Admin-disabled beats the parent's own lock: it renders unticked and
      // untickable, and says who did it so the parent does not think it is a bug.
      const adminOff = _adminBlocksChapter(ch.id);
      const isLocked = adminOff || lockedChs.includes(ch.id);
      return `<label class="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors
          ${adminOff ? 'bg-gray-50 dark:bg-gray-700/30 opacity-70 cursor-not-allowed'
                     : isLocked ? 'bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 cursor-pointer'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-700/40 cursor-pointer'}">
        <input type="checkbox" ${isLocked ? '' : 'checked'} ${adminOff ? 'disabled' : `onchange="Auth.toggleChapterLock('${ch.id}',!this.checked)"`}
          class="w-4 h-4 accent-blue-500 shrink-0${adminOff ? ' cursor-not-allowed' : ''}">
        <span class="text-sm ${adminOff ? 'text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300'} flex-1 min-w-0 truncate">${ch.icon || '📖'} ${ch.name}${isEnr ? ' <span class="text-xs text-amber-500">✨</span>' : ''}</span>
        ${adminOff ? '<span class="text-xs font-medium text-gray-500 dark:text-gray-400 shrink-0" title="Disabled by the administrator or not included in your plan">🛡️ Unavailable</span>'
                   : isLocked ? '<span class="text-xs font-medium text-red-400 shrink-0">🔒 Locked</span>' : ''}
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
        <span class="chev text-gray-500 dark:text-gray-400 text-xs transition-transform" style="transform:${isOpen ? 'rotate(180deg)' : ''}">▼</span>
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
        ${canStart ? `<button onclick="startAssignmentDirect('${a.subject_id}','${a.chapter_id}',${a.difficulty || 1},${a.show_answers !== false},${a.show_hints !== false},'${a.id}')"
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

// ── FRIENDS LEADERBOARD (dashboard) ──────────
async function _renderFriendsLeaderboard(studentId) {
  const card   = document.getElementById('dash-friends');
  const listEl = document.getElementById('dash-friends-list');
  if (!card || !listEl || !studentId) return;
  card.classList.remove('hidden');

  _renderGlobalLbEntry();
  const [friends, myCode] = await Promise.all([
    Store.getFriends(),
    Store.getMyFriendCode(),
  ]);
  _friendCode = myCode;

  const self = {
    id: studentId,
    display_name: DB.name || document.getElementById('welcome-name')?.textContent?.trim() || 'You',
    avatar: DB.avatar || (typeof Auth !== 'undefined' && Auth.getActiveAccount?.()?.avatar) || '⭐',
    xp: DB.xp || 0,
    level: DB.level || 1,
    streak: DB.stats?.streak || 0,
    total_attempted: DB.stats?.totalAttempted || 0,
    total_correct: DB.stats?.totalCorrect || 0,
    isSelf: true,
  };

  if (!friends.length) {
    listEl.innerHTML = `
      <div class="text-center py-4">
        <div class="text-5xl mb-2" style="filter:drop-shadow(0 0 8px gold)">🏆</div>
        <p class="text-sm font-bold text-gray-700 dark:text-white mb-1">No rivals yet!</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Invite a friend and compete for the gold trophy 🔥</p>
        <button onclick="openFriendInviteModal()"
          class="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-sm font-bold px-6 py-2.5 rounded-2xl transition-all shadow-md">
          ✉️ Invite Your First Friend
        </button>
      </div>
      ${_friendCodeBar(myCode)}`;
    return;
  }

  const all = [self, ...friends.map(f => ({ ...f, isSelf: false }))];
  all.sort((a, b) => (b.xp || 0) - (a.xp || 0));

  const maxXp  = Math.max(...all.map(f => f.xp || 0), 1);
  const myRank = all.findIndex(f => f.isSelf);

  let callout;
  if (myRank === 0) {
    callout = `<div class="mb-3 rounded-xl px-3 py-2 text-xs font-semibold text-center text-amber-700 dark:text-amber-300"
      style="background:linear-gradient(135deg,#fef3c7,#fde68a);border:1px solid #f59e0b">
      🔥 You're the champion! Keep scoring to hold the gold!
    </div>`;
  } else {
    const gap  = (all[myRank - 1].xp || 0) - (self.xp || 0);
    const name = all[myRank - 1].display_name;
    callout = `<div class="mb-3 rounded-xl px-3 py-2 text-xs text-center text-indigo-700 dark:text-indigo-300"
      style="background:rgba(99,102,241,.08);border:1px solid rgba(99,102,241,.25)">
      You're <strong>#${myRank + 1}</strong> - earn <strong>${gap} more XP</strong> to beat ${name}! 💪
    </div>`;
  }

  const trophyHtml = (rank) => {
    if (rank === 0) return `<span class="text-2xl leading-none" style="filter:drop-shadow(0 0 8px #f59e0b)">🏆</span>`;
    if (rank === 1) return `<span class="text-xl leading-none" style="filter:drop-shadow(0 0 5px #9ca3af)">🥈</span>`;
    if (rank === 2) return `<span class="text-xl leading-none" style="filter:drop-shadow(0 0 5px #b45309)">🥉</span>`;
    return `<span class="text-xs font-bold text-gray-400 w-6 block text-center leading-none">${rank + 1}</span>`;
  };

  listEl.innerHTML = callout + all.map((f, i) => {
    const acc  = f.total_attempted ? Math.round(f.total_correct / f.total_attempted * 100) : 0;
    const pct  = Math.round((f.xp || 0) / maxXp * 100);
    const str  = f.streak || 0;
    const fire = str >= 3 ? `<span class="text-xs ml-1">🔥${str}</span>` : '';
    const bar  = i === 0 ? 'bg-amber-400' : f.isSelf ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-500';
    const rowBg = f.isSelf
      ? 'background:rgba(99,102,241,.07);border:1px solid rgba(99,102,241,.2);border-radius:12px;padding:6px 8px'
      : i === 0
      ? 'background:rgba(251,191,36,.07);border:1px solid rgba(251,191,36,.25);border-radius:12px;padding:6px 8px'
      : 'padding:6px 0';
    return `<div style="${rowBg}" class="mb-1">
      <div class="flex items-center gap-2">
        <div class="w-7 flex items-center justify-center shrink-0">${trophyHtml(i)}</div>
        <span class="text-xl select-none">${f.avatar || '⭐'}</span>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1 leading-tight">
            <span class="text-sm font-bold text-gray-800 dark:text-white truncate">${f.display_name}</span>
            ${f.isSelf ? '<span class="text-xs text-indigo-400 font-normal shrink-0">(you)</span>' : ''}
            ${fire}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400">Lv.${f.level} · ${acc}% accuracy</div>
        </div>
        <div class="shrink-0 text-right">
          <div class="text-sm font-bold ${i === 0 ? 'text-amber-500' : f.isSelf ? 'text-indigo-500' : 'text-gray-500 dark:text-gray-300'}">${f.xp}<span class="text-xs font-normal ml-0.5">XP</span></div>
          ${!f.isSelf ? `<button onclick="_removeFriend('${f.id}',this)" class="text-xs text-gray-300 hover:text-red-400 transition-colors">✕</button>` : ''}
        </div>
      </div>
      <div class="mt-1.5 ml-9 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div class="h-full rounded-full transition-all duration-700 ${bar}" style="width:${pct}%"></div>
      </div>
    </div>`;
  }).join('') + _friendCodeBar(myCode);
}

function _friendCodeBar(code) {
  const display = code ? code.match(/.{1,4}/g).join(' ') : '···';
  return `
    <div class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-2">
      <div class="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl px-3 py-2">
        <span class="text-xs text-gray-400 shrink-0">Your code:</span>
        <span id="fl-my-code" class="text-sm font-mono font-bold text-gray-700 dark:text-white tracking-widest flex-1">${display}</span>
        <button onclick="_copyMyCode()" class="text-xs font-semibold text-indigo-500 hover:text-indigo-700 shrink-0">Copy</button>
        <button onclick="openFriendInviteModal()" class="text-xs font-semibold text-indigo-500 hover:text-indigo-700 shrink-0 ml-1">Share ↗</button>
      </div>
      <div class="flex gap-2">
        <input id="fl-code-input" type="text" maxlength="8" placeholder="Enter friend's code…"
          class="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-mono uppercase text-gray-800 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-300"
          style="font-size:16px" onkeydown="if(event.key==='Enter')_connectByCode()" />
        <button onclick="_connectByCode()"
          class="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors shrink-0">
          Connect
        </button>
      </div>
    </div>`;
}

function _copyMyCode() {
  const el = document.getElementById('fl-my-code');
  const code = (_friendCode || el?.textContent || '').replace(/\s/g, '');
  if (!code || code === '···') return;
  navigator.clipboard?.writeText(code)
    .then(() => toast('Friend code copied! 📋', 1500))
    .catch(() => { prompt('Your friend code:', code); });
}

async function _connectByCode() {
  const input = document.getElementById('fl-code-input');
  if (!input) return;
  const code = input.value.trim().toUpperCase().replace(/\s/g, '');
  if (code.length < 4) { toast('Enter a friend code first.', 1500); return; }
  const btn = input.nextElementSibling;
  if (btn) { btn.disabled = true; btn.textContent = '…'; }
  input.disabled = true;
  const { data } = await _sb.rpc('add_friend', { p_friend_code: code });
  input.disabled = false;
  if (btn) { btn.disabled = false; btn.textContent = 'Connect'; }
  if (data?.ok)                           { input.value = ''; toast('Friend connected! 🎉🎉', 3000); if (typeof confetti === 'function') confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } }); _renderFriendsLeaderboard(ACTIVE_STUDENT_ID); }
  else if (data?.error === 'self')        toast("That's your own code!", 2000);
  else if (data?.error === 'not_found')   toast('Code not found - check and try again.', 2500);
  else if (data?.error === 'max_friends') toast('Friend list is full (max 20).', 2500);
  else                                    toast('Could not connect. Try again.', 2000);
}

async function _removeFriend(friendId, btn) {
  if (btn) { btn.disabled = true; btn.textContent = '…'; }
  await Store.removeFriend(friendId);
  _renderFriendsLeaderboard(ACTIVE_STUDENT_ID);
}

// ── FRIEND INVITE MODAL ───────────────────────
let _friendCode = null;

// ── Lazy CDN scripts ──────────────────────────
// The scanner library is large and only needed from one button in one modal,
// so it is fetched on demand. The much smaller QR encoder is bundled locally
// below so creating an invite does not depend on a third-party CDN.
//
// Never rejects: callers branch on the global, not on a thrown error. A
// failed load is evicted from the cache so an explicit retry can re-attempt.
// The cache hangs off the function object rather than a module-level const,
// so there is no temporal dead zone to fall into if this ever gets called
// from something that runs earlier than it looks.
const _CDN_QR_SCANNER  = 'https://cdn.jsdelivr.net/npm/html5-qrcode@2.3.8/html5-qrcode.min.js';

// Keep invite creation reliable: the QR encoder ships with the app instead of
// relying on a CDN URL which can be blocked by a phone, school network, or an
// offline service-worker session. Dynamic import keeps this code out of the
// normal startup path; it is only fetched when the share dialog is opened.
function _loadLocalQRCode() {
  _loadLocalQRCode._promise = _loadLocalQRCode._promise || import('../assets/vendor/qrcode.mjs')
    .then(module => module.default || module)
    .catch(error => {
      console.warn('[QR] Could not load local encoder:', error);
      _loadLocalQRCode._promise = null;
      return null;
    });
  return _loadLocalQRCode._promise;
}

function _loadScriptOnce(src) {
  _loadScriptOnce._cache = _loadScriptOnce._cache || new Map();
  const cache = _loadScriptOnce._cache;
  if (cache.has(src)) return cache.get(src);
  const p = new Promise(resolve => {
    const el = document.createElement('script');
    el.src = src;
    el.async = true;
    el.onload  = () => resolve(true);
    el.onerror = () => { cache.delete(src); resolve(false); };
    document.head.appendChild(el);
  });
  cache.set(src, p);
  return p;
}
async function openFriendInviteModal() {
  const modal = document.getElementById('modal-friend-invite');
  if (!modal) return;
  modal.classList.remove('hidden');

  const codeEl   = document.getElementById('friend-code-display');
  const canvas   = document.getElementById('friend-qr-canvas');
  const qrLabel  = document.getElementById('friend-qr-label');
  const qrFail   = document.getElementById('friend-qr-fallback');

  if (!_friendCode) {
    if (codeEl) { codeEl.textContent = '···'; codeEl.classList.remove('text-red-400'); }
    _friendCode = await Store.getMyFriendCode();
  }

  // Both the code and the QR (which just encodes it) depend on this one
  // fetch. It used to fail silently - Store.getMyFriendCode() swallows its
  // own error and returns null - leaving the placeholder "···" up top and a
  // blank canvas below a label that still says "scan this QR code", with
  // nothing telling anyone it didn't load. Now a failure is visible and
  // tappable to retry, same button that copies the code once it has one.
  if (!_friendCode) {
    if (codeEl) { codeEl.textContent = 'Tap to retry'; codeEl.classList.add('text-red-400'); }
    if (qrLabel) qrLabel.classList.add('hidden');
    if (canvas)  canvas.classList.add('hidden');
    if (qrFail)  qrFail.classList.remove('hidden');
    toast('Could not load your invite code. Check your connection and try again.', 3000);
    return;
  }

  if (codeEl) codeEl.textContent = _friendCode.match(/.{1,4}/g).join(' ');
  if (qrLabel) qrLabel.classList.remove('hidden');
  if (canvas)  canvas.classList.remove('hidden');
  if (qrFail)  qrFail.classList.add('hidden');

  const qrEncoder = canvas ? await _loadLocalQRCode() : null;

  if (canvas && qrEncoder?.toCanvas) {
    const link = `${location.origin}${location.pathname}?friend=${_friendCode}`;
    qrEncoder.toCanvas(canvas, link, { width: 180, margin: 1, color: { dark: '#1e293b', light: '#ffffff' } }, err => {
      if (err) {
        console.warn('[QR] toCanvas failed:', err);
        canvas.classList.add('hidden');
        if (qrLabel) qrLabel.classList.add('hidden');
        if (qrFail)  qrFail.classList.remove('hidden');
      }
    });
  } else {
    // The local QR module could not load. Keep a clear, usable link fallback.
    if (canvas)  canvas.classList.add('hidden');
    if (qrLabel) qrLabel.classList.add('hidden');
    if (qrFail)  qrFail.classList.remove('hidden');
  }
}

function closeFriendInviteModal() {
  document.getElementById('modal-friend-invite')?.classList.add('hidden');
  closeQRScanner();
}

function _friendInviteLink() {
  return `${location.origin}${location.pathname}?friend=${_friendCode || ''}`;
}

function _friendInviteText() {
  const name = DB.name || (typeof Auth !== 'undefined' && Auth.getActiveAccount?.()?.name) || 'Your friend';
  return `${name} challenges you to beat them on PSAC Practice! 🏆 Tap the link, log in, and see who scores higher!`;
}

function shareFriendLinkWhatsApp() {
  if (!_friendCode) { toast('Loading your code…', 1500); return; }
  const msg = `${_friendInviteText()}\n\n${_friendInviteLink()}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
}

async function shareFriendLink() {
  if (!_friendCode) { toast('Loading your code…', 1500); return; }
  const link = _friendInviteLink();
  if (navigator.share) {
    try { await navigator.share({ title: 'PSAC Practice - Friend Challenge', text: _friendInviteText(), url: link }); return; }
    catch(e) { if (e.name === 'AbortError') return; }
  }
  try { await navigator.clipboard.writeText(link); toast('Link copied! 📋', 2000); }
  catch(_) { prompt('Copy this link:', link); }
}

async function _copyFriendCode() {
  // No code loaded means the earlier fetch failed (see openFriendInviteModal) -
  // the button already reads "Tap to retry" in that state, so make it one.
  if (!_friendCode) { openFriendInviteModal(); return; }
  try { await navigator.clipboard.writeText(_friendCode); toast('Code copied! 📋', 1500); }
  catch(_) { prompt('Your friend code:', _friendCode); }
}

// ── QR SCANNER ────────────────────────────────
let _qrScanner = null;

async function openQRScanner() {
  const overlay = document.getElementById('modal-qr-scanner');
  if (!overlay) return;
  closeFriendInviteModal();
  overlay.classList.remove('hidden');

  await _loadScriptOnce(_CDN_QR_SCANNER);
  if (typeof Html5Qrcode === 'undefined') { toast('Scanner not available.', 2000); return; }

  try {
    _qrScanner = new Html5Qrcode('qr-reader');
    await _qrScanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 220, height: 220 } },
      async (decodedText) => {
        await closeQRScanner();
        let code = decodedText;
        try { const u = new URL(decodedText); code = u.searchParams.get('friend') || decodedText; } catch(_) {}
        if (!code) { toast('Could not read QR code.', 2000); return; }
        const { data } = await (typeof _sb !== 'undefined'
          ? _sb.rpc('add_friend', { p_friend_code: code.toUpperCase() })
          : { data: null });
        if (data?.ok)                           { toast('Friend connected! 🎉', 3000); if (typeof confetti === 'function') confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } }); _renderFriendsLeaderboard(ACTIVE_STUDENT_ID); }
        else if (data?.error === 'self')        toast("That's your own QR code!", 2000);
        else if (data?.error === 'not_found')   toast('QR code not recognised.', 2500);
        else if (data?.error === 'max_friends') toast('Friend list is full (max 20).', 2500);
        else                                    toast('Could not connect. Try again.', 2000);
      },
      () => {}
    );
  } catch(e) {
    toast('Camera not available. Try the link instead.', 3000);
    overlay.classList.add('hidden');
  }
}

async function closeQRScanner() {
  const overlay = document.getElementById('modal-qr-scanner');
  if (overlay) overlay.classList.add('hidden');
  if (_qrScanner) {
    try { await _qrScanner.stop(); } catch(_) {}
    try { _qrScanner.clear(); } catch(_) {}
    _qrScanner = null;
  }
}

// ── SCRATCHPAD ────────────────────────────────
// The scratchpad used to be a permanently-rendered canvas in the sidebar, which
// on a phone meant it sat below the answer buttons where nobody found it. It is
// now opened from the toolbar, and only initialised once it is actually visible
// and can be measured.
function togglePracticeScratchpad() {
  const wrap = document.getElementById('practice-scratch-wrap');
  const btn  = document.getElementById('scratch-toggle-btn');
  if (!wrap) return;
  const opening = wrap.classList.contains('hidden');
  wrap.classList.toggle('hidden', !opening);
  if (btn) btn.classList.toggle('is-on', opening);
  if (opening) {
    initScratchpad('scratchpad-practice');
    wrap.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

// Keep the practice page focused on answering. The full help set is available
// when wanted, but it should not be seven equally prominent choices for a
// child who has just read a question.
function _setPracticeHelpOpen(open) {
  const tray = document.getElementById('practice-help-tray');
  const btn  = document.getElementById('practice-help-toggle');
  if (!tray || !btn) return;
  tray.classList.toggle('hidden', !open);
  btn.classList.toggle('is-on', open);
  btn.setAttribute('aria-expanded', String(open));
}

function togglePracticeHelp() {
  const tray = document.getElementById('practice-help-tray');
  if (!tray) return;
  _setPracticeHelpOpen(tray.classList.contains('hidden'));
}

// ── NUMBER HELPER ─────────────────────────────
// Extracts whole/decimal numbers ≥2 from question HTML (strips tags first).
// Returns up to 8 unique numbers sorted ascending.
function _extractQNumbers(html) {
  const plain = html.replace(/<[^>]+>/g, ' ');
  const seen = {};
  const re = /\b(\d{1,6}(?:\.\d{1,4})?)\b/g;
  let m;
  while ((m = re.exec(plain)) !== null) {
    const n = parseFloat(m[1]);
    if (n >= 2 && n <= 999999) seen[n] = true;
  }
  return Object.keys(seen).map(Number).sort(function(a, b) { return a - b; }).slice(0, 8);
}

function _nhFmt(n) {
  if (!isFinite(n) || Math.abs(n) > 9999999) return null;
  return String(parseFloat(n.toFixed(4)));
}

function _nhCalc() {
  const aEl = document.getElementById('nh-a');
  const bEl = document.getElementById('nh-b');
  const body = document.getElementById('nh-tbody');
  if (!aEl || !bEl || !body) return;
  const a = parseFloat(aEl.value);
  const b = parseFloat(bEl.value);
  if (!isFinite(a) || !isFinite(b)) { body.innerHTML = ''; return; }
  const rows = [
    { op: '+',  expr: a + ' + ' + b,   val: _nhFmt(a + b) },
    { op: '−',  expr: a + ' − ' + b,   val: _nhFmt(a - b) },
    { op: '×',  expr: a + ' × ' + b,   val: _nhFmt(a * b) },
    { op: '÷',  expr: a + ' ÷ ' + b,   val: b !== 0 ? _nhFmt(a / b) : null },
    { op: 'A²', expr: a + '²',          val: _nhFmt(a * a) },
    { op: 'B²', expr: b + '²',          val: _nhFmt(b * b) },
    { op: '√A', expr: '√' + a,          val: a >= 0 ? _nhFmt(Math.sqrt(a)) : null },
    { op: '√B', expr: '√' + b,          val: b >= 0 ? _nhFmt(Math.sqrt(b)) : null },
    { op: 'Aᴮ', expr: a + ' ^ ' + b,   val: _nhFmt(Math.pow(a, b)) },
  ];
  body.innerHTML = rows.map(function(r) {
    const cell = r.val != null ? r.val : '<span class="nh-na">—</span>';
    return '<tr><td class="nh-op">' + r.op + '</td><td class="nh-expr">' +
           r.expr + '</td><td class="nh-val">' + cell + '</td></tr>';
  }).join('');
}

function _nhChipClick(n) {
  const aEl = document.getElementById('nh-a');
  const bEl = document.getElementById('nh-b');
  if (!aEl || !bEl) return;
  if (!aEl.value) { aEl.value = n; }
  else { bEl.value = n; _nhCalc(); }
}

function _nhPopulate(q) {
  const btn   = document.getElementById('num-helper-btn');
  const panel = document.getElementById('num-helper-panel');
  const tools = document.querySelector('.pr-tools');
  if (!btn || !panel) return;
  const isMaths = !!(ACTIVE_PACK && ACTIVE_PACK.subject === 'Maths');
  btn.classList.toggle('hidden', !isMaths);
  if (tools) tools.classList.toggle('pr-tools-4', isMaths);
  if (!isMaths) {
    panel.classList.add('hidden');
    btn.classList.remove('is-on');
    return;
  }
  const nums   = _extractQNumbers(q.question || '');
  const chips  = document.getElementById('nh-chips');
  const aEl    = document.getElementById('nh-a');
  const bEl    = document.getElementById('nh-b');
  const tBody  = document.getElementById('nh-tbody');
  if (chips) chips.innerHTML = nums.map(function(n) {
    return '<button class="nh-chip" type="button" onclick="_nhChipClick(' + n + ')">' + n + '</button>';
  }).join('');
  if (aEl) aEl.value = '';
  if (bEl) bEl.value = '';
  if (tBody) tBody.innerHTML = '';
  if (nums.length >= 2 && aEl && bEl) {
    aEl.value = nums[0];
    bEl.value = nums[1];
    _nhCalc();
  }
}

function toggleNumHelper() {
  const panel = document.getElementById('num-helper-panel');
  const btn   = document.getElementById('num-helper-btn');
  if (!panel) return;
  const opening = panel.classList.contains('hidden');
  panel.classList.toggle('hidden', !opening);
  if (btn) btn.classList.toggle('is-on', opening);
  if (opening) panel.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function initScratchpad(id) {
  const canvas = document.getElementById(id);
  if (!canvas || canvas._initialized) return;
  // A canvas that is not on screen yet measures 0 wide, and the old fallback
  // locked in a 240px backing store for a pad that later stretches to full
  // width - so strokes landed away from the finger. Bail WITHOUT marking it
  // initialised: the screen observer and the scratchpad toggle both retry.
  if (!canvas.offsetWidth) return;
  canvas._initialized = true;
  canvas.width = canvas.offsetWidth || 240;
  canvas.height = parseInt(canvas.getAttribute('height')) || 200;
  // Prevents the browser treating finger draws as scroll gestures.
  // Must be set before any pointer event fires on this element.
  canvas.style.touchAction = 'none';
  const ctx = canvas.getContext('2d');
  canvas._ctx = ctx;
  ctx.strokeStyle = DB.theme === 'dark' ? '#fff' : '#1e293b';
  ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  let drawing = false, lx = 0, ly = 0;
  // Pointer events (mouse + touch + stylus) share clientX/clientY directly.
  const pos = (e) => {
    const r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (canvas.width / r.width),
             y: (e.clientY - r.top)  * (canvas.height / r.height) };
  };
  const start = e => {
    drawing = true;
    const p = pos(e); lx = p.x; ly = p.y;
    // Capture keeps pointermove arriving even when the finger leaves the canvas.
    canvas.setPointerCapture(e.pointerId);
  };
  const draw = e => {
    if (!drawing) return;
    const p = pos(e);
    ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(p.x, p.y); ctx.stroke();
    lx = p.x; ly = p.y;
  };
  const stop = () => drawing = false;
  canvas.addEventListener('pointerdown', start);
  canvas.addEventListener('pointermove', draw);
  canvas.addEventListener('pointerup',     stop);
  // pointercancel fires when the OS interrupts (notification, call, screenshot).
  canvas.addEventListener('pointercancel', stop);

  _scratchPlaceholder(canvas);
}

// The faint prompt, plus the one-shot listener that wipes it on the first
// stroke. Extracted because a reset has to put BOTH back: clearing the canvas
// without re-arming the listener leaves a pad that erases the child's first
// stroke of the next session.
function _scratchPlaceholder(canvas) {
  const ctx = canvas && canvas._ctx;
  if (!ctx) return;
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.font = '13px sans-serif';
  ctx.fillStyle = DB.theme === 'dark' ? '#fff' : '#1e293b';
  ctx.textAlign = 'center';
  ctx.fillText('✏️ Draw your working here', canvas.width / 2, canvas.height / 2);
  ctx.restore();
  canvas._hasPlaceholder = true;

  if (canvas._wipeOnFirstStroke) canvas.removeEventListener('pointerdown', canvas._wipeOnFirstStroke);
  canvas._wipeOnFirstStroke = () => {
    if (canvas._hasPlaceholder) { canvas._hasPlaceholder = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }
  };
  canvas.addEventListener('pointerdown', canvas._wipeOnFirstStroke, { once: true });
}
function clearScratch(id) {
  const c = document.getElementById(id);
  if (c && c._ctx) { c._ctx.clearRect(0, 0, c.width, c.height); c._hasPlaceholder = false; }
}

// ── A NEW SESSION STARTS ON A BLANK PAD ───────────────────────────────────────
// The canvas lives in index.html and is never rebuilt, so working stayed on it
// for the rest of the visit: leave a chapter, open another, and last chapter's
// sums were still there under the new question.
//
// ⚠ The reset is keyed on the SESSION OBJECT, not on the screen becoming
//   visible. Every practice start assigns a fresh `S.practice.session` literal
//   (and every exam a fresh `S.exam.qs` array) immediately before showScreen, so
//   identity alone separates "a new session began" from "the child came back to
//   the one they were already in". Clearing on visibility would wipe the pad on
//   any return to the screen; clearing per question would wipe it mid-question,
//   and working is exactly what a child needs to keep while answering.
// ⚠ It also means a sixth practice entry point gets this for free — it cannot
//   start a session without resetting those counters.
// ⚠ Clear whenever a context exists, visible or not. A pad initialised in an
//   earlier session still holds its strokes while its wrapper is collapsed, and
//   `clearRect` works on a hidden canvas — the dimensions are the backing
//   store's, not the layout's.
let _scratchSessionPractice = null;
let _scratchSessionExam = null;

function _resetScratchpadForSession(id, token, last) {
  if (token === last) return last;
  const canvas = document.getElementById(id);
  if (canvas && canvas._ctx) {
    canvas._ctx.clearRect(0, 0, canvas.width, canvas.height);
    _scratchPlaceholder(canvas);
  }
  return token;
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
  _refreshInboxBadge();
  if (typeof LearningCoach !== 'undefined') LearningCoach.renderChild();

  // ⚠ The two schedule panels are deliberately NOT painted here any more.
  // #dash-today-plan (Calendar.renderTodayPlan) and #dash-schedule stacked a
  // study plan and a fortnight's outlook on the screen a child reaches
  // immediately after tapping a subject TO PRACTISE - a wall of suggestions
  // about something else, in front of the thing they came to do. Both are
  // summarised on the "Today's plan" task button now, with the full detail one
  // tap away on the Schedule screen. renderTodayPlan() and renderDashSchedule()
  // still exist and still work; the dashboard simply stopped calling them, and
  // their containers stay `hidden`.
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

  // Keep this discovery card on the subject home, rather than making children
  // hunt through the syllabus browser for the optional geography activity.
  const mapCard = document.getElementById('btn-interactive-map');
  if (mapCard) {
    const hasGeoMap = /history\s*&?\s*geography/i.test(ACTIVE_PACK?.subject || ACTIVE_PACK?.name || '');
    mapCard.classList.toggle('hidden', !hasGeoMap);
  }

  // Stats bar
  const acc = DB.stats.totalAttempted ? Math.round(DB.stats.totalCorrect / DB.stats.totalAttempted * 100) : 0;
  document.getElementById('dash-total-q').textContent = DB.stats.totalAttempted;
  document.getElementById('dash-accuracy').textContent = acc;
  document.getElementById('dash-exams').textContent = DB.stats.examCount;
  _setStreakDisplay(DB.stats.streak);
  if (typeof MiniGames !== 'undefined') MiniGames.syncTile();

  // The dashboard always gives a child one clear next step.  It is intentionally
  // not a replacement for chapter / subject selection: the secondary action in
  // the card and the Subjects button still expose every existing route.
  const startHere = document.getElementById('dash-start-here');
  if (startHere) startHere.classList.remove('hidden');
  const missionTitle = document.getElementById('dash-mission-title');
  const missionCopy = document.getElementById('dash-mission-copy');
  const isFirstVisit = !DB.stats.totalAttempted;
  if (missionTitle) missionTitle.textContent = isFirstVisit ? 'Your first mission' : 'A quick mission';
  if (missionCopy) missionCopy.textContent = isFirstVisit
    ? 'Try 5 friendly warm-up questions. You can ask for a hint any time.'
    : 'Keep your skills sharp with 5 quick questions. Hints and working space are always ready.';

  // Expired-access notice, above the resume banner: a child whose access has
  // lapsed needs to know why most chapters stopped opening.
  _renderExpiredBanner('student-expired-slot');

  // Resume banner (unfinished session from a previous page load)
  _renderResumeBanner();

  // First-time hint for brand-new students
  _checkKidHints();

  // Assignments from parent (Supabase - async, non-blocking)
  _renderStudentAssignments(ACTIVE_STUDENT_ID);


  // Friends leaderboard (Supabase - async, non-blocking)
  _renderFriendsLeaderboard(ACTIVE_STUDENT_ID);

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
    // Same rule as the syllabus screen and the chapter cards: a chapter with
    // no attempts is not a 0% score, and an empty bar beside "0%" is the one
    // reading a child should never be given for work they have not done yet.
    const chProgress = _chapterProgress(ch.id);
    const pct     = chProgress.acc;
    const col     = pct >= 80 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#3b82f6';
    const pctText = chProgress.attempted ? pct + '%' : 'Not started';
    const isLocked = locked.includes(ch.id);
    const click   = isLocked ? `toast('🔒 This chapter is locked by your parent.', 2000)` : `startChapterDirect('${ch.id}')`;
    const lockBadge = isLocked ? '<span class="text-xs ml-1" title="Locked">🔒</span>' : '';
    return `<div class="mastery-item ${isLocked ? 'opacity-50' : 'cursor-pointer hover:opacity-80'} transition-opacity" onclick="${click}">
      <div class="flex justify-between items-center mb-1">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${ch.icon} ${ch.name}${lockBadge}</span>
        <span class="text-xs font-bold text-gray-500 dark:text-gray-400">${pctText}</span>
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

// ── PARENT REPORTING HELPERS ───────────────────
function _renderExamTimeline(studentData) {
  const el = document.getElementById('pd-exam-timeline');
  if (!el) return;
  const history = (studentData.examHistory || []).slice(0, 5);
  if (!history.length) { el.innerHTML = ''; return; }
  el.innerHTML = `
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
      <div class="font-bold text-gray-800 dark:text-white text-sm mb-3">📝 Last ${history.length} Exam${history.length > 1 ? 's' : ''}</div>
      <div class="flex gap-2 flex-wrap">
        ${history.map(e => {
          const pct = e.pct ?? e.score ?? null;
          const color = pct >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : pct >= 50 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
          const date = e.date ? new Date(e.date).toLocaleDateString('en-GB',{day:'numeric',month:'short'}) : '';
          const type = e.type === 'quick' ? 'Quick' : 'Full';
          return `<div class="flex flex-col items-center ${color} rounded-xl px-3 py-2 min-w-[60px]">
            <div class="text-lg font-bold">${pct != null ? pct + '%' : '?'}</div>
            <div class="text-[10px] font-medium">${type}</div>
            <div class="text-[10px] opacity-70">${date}</div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

function _renderWeakChapters(studentData) {
  const el = document.getElementById('pd-weak-chapters');
  if (!el) return;
  const chapters = studentData.chapters || {};
  const allChapters = [];
  Object.values(typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : {}).forEach(pack => {
    (pack._chapters || pack.chapters || []).forEach(c => allChapters.push({ ...c, subjectName: pack.name }));
  });
  const weak = allChapters.filter(c => {
    const p = chapters[c.id];
    if (!p) return false;
    const flagged  = !!p.flagged;
    const attempted = p.attempted || 0;
    const accuracy  = attempted > 0 ? (p.correct || 0) / attempted : null;
    return flagged || (attempted > 0 && accuracy < 0.5);
  }).map(c => {
    const p = chapters[c.id] || {};
    const attempted = p.attempted || 0;
    const accuracy  = attempted > 0 ? Math.round((p.correct || 0) / attempted * 100) : null;
    return { ...c, attempted, accuracy, flagged: !!p.flagged };
  });
  if (!weak.length) { el.innerHTML = ''; return; }
  el.innerHTML = `
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
      <div class="font-bold text-gray-800 dark:text-white text-sm mb-3">⚠️ Needs Attention (${weak.length})</div>
      <div class="space-y-2">
        ${weak.map(c => `
          <div class="flex items-center justify-between gap-2 bg-red-50 dark:bg-red-900/20 rounded-xl px-3 py-2">
            <div class="min-w-0">
              <div class="text-xs font-semibold text-gray-800 dark:text-white truncate">${c.name}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">${c.subjectName}</div>
            </div>
            <div class="text-right shrink-0">
              ${c.flagged && c.attempted === 0
                ? '<span class="text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-semibold">🚩 Flagged</span>'
                : `<div class="text-sm font-bold ${c.accuracy < 40 ? 'text-red-500' : 'text-amber-500'}">${c.accuracy}%</div>
                   <div class="text-[10px] text-gray-500 dark:text-gray-400">${c.attempted} tries${c.flagged ? ' · 🚩' : ''}</div>`
              }
            </div>
          </div>`).join('')}
      </div>
    </div>`;
}

function _subjectChips(studentData, grade) {
  // Keep each child's card scoped to their grade, not every registered pack.
  const packs = Object.values(typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : {})
    .filter(p => !p.comingSoon && String(p.grade) === String(grade));
  if (!packs.length) return '';
  return packs.map(pack => {
    const chs = pack._chapters || pack.chapters || [];
    let att = 0, cor = 0;
    chs.forEach(c => { const p = studentData.chapters?.[c.id]; if (p) { att += p.attempted||0; cor += p.correct||0; } });
    return `<span class="pd-subject-chip">${_profEsc(pack.name)}: ${att ? `${att} attempts` : 'Not started'}</span>`;
  }).join('');
}

function toggleChapterFlag(chapterId) {
  if (!DB.chapters) DB.chapters = {};
  if (!DB.chapters[chapterId]) DB.chapters[chapterId] = { attempted:0, correct:0, flagged:false };
  DB.chapters[chapterId].flagged = !DB.chapters[chapterId].flagged;
  save(DB);
  renderChapterSelect();
  toast(DB.chapters[chapterId].flagged ? '🚩 Flagged - your parent will see this.' : 'Flag removed.', 1800);
}

// ── CHAPTER SELECT ─────────────────────────────
// ── CHAPTER SELECT ────────────────────────────────────────────────────────
// ⚠ THE CARD MUST NOT BE A <button>.
// It used to be, with the 🚩 flag as a nested <button> inside it. That is not
// "tolerated by the browser" as the old CSS comment claimed: when the HTML
// parser meets a <button> start tag while a button is still open it CLOSES the
// outer one. So every card actually rendered as an empty bordered box, followed
// by a loose flag button, followed by the icon, title, mastery bar and CTA
// spilled out as bare flow content in the grid cell. That is what made this
// screen look broken.
//
// The card is now an <article> with a transparent full-bleed <button> layered
// over it (.ch-hit) as the click target, so the whole card is still one big
// tap target and still keyboard-reachable, while the flag sits above it as a
// separate, valid button.
// ══════════════════════════════════════════════
//  CHAPTER PROGRESS - one reading, used by the card AND the summary
//
//  ⚠ getChapterPct() is ACCURACY (correct / attempted), and the chapter card
//  had been printing it as "% mastery" with a three-star rating beside it. So a
//  child who answered two questions and got both right saw "100% mastery ★★★"
//  on a nineteen-question chapter they had barely opened - and every chapter
//  they had actually worked through looked the same as one they had glanced at.
//  That is why "I cannot see which chapters I have already done" was a fair
//  complaint about a screen that already showed numbers.
//
//  Historical totals include repeats and skipped answers. Stable bank question
//  IDs are tracked from this update onward, without inventing historical IDs.
//  Neither loaded-bank coverage nor answer accuracy proves syllabus mastery.
// ══════════════════════════════════════════════
function _chapterProgress(chId) {
  const c = (DB.chapters || {})[chId] || {};
  const attempted = c.attempted || 0;
  const correct   = c.correct || 0;
  const bankIds = new Set((typeof STATIC_QUESTIONS !== 'undefined' ? STATIC_QUESTIONS : [])
    .filter(q => q && q.id && q.chapterId === chId).map(q => q.id));
  const total = bankIds.size;
  const acc = attempted ? Math.round(correct / attempted * 100) : 0;

  // ⚠ `total` is 0 whenever the question pool has not loaded yet - the grid can
  // paint before QuestionLoader has answered. Effort must then be UNKNOWN, not
  // 1: an earlier version fell back to `attempted ? 1 : 0`, which handed a
  // "✓ Mastered ★★★" badge to any chapter with two correct answers the moment
  // the pool was slow. That is the exact bug this function exists to kill, so
  // an unknown denominator has to withhold the claim rather than assume it.
  const known  = total > 0;
  const unique = new Set((Array.isArray(c.answeredIds) ? c.answeredIds : []).filter(id => bankIds.has(id))).size;
  const effort = known ? unique / total : null;

  let state = 'new';
  if (attempted > 0)                state = 'started';

  return { attempted, correct, acc, total, unique, effort, known, state, last: c.last || 0 };
}

// "Today" / "Yesterday" / "3 days ago". Uses the Mauritius day key rather than
// the raw millisecond gap so that "today" means the calendar day the child is
// living in, not "within the last 24 hours".
function _chapterWhen(ms) {
  if (!ms) return '';
  const key   = new Date(ms + _MU_OFFSET_MS).toISOString().slice(0, 10);
  const today = _muDayKey();
  if (key === today) return 'Today';
  const days = Math.round((Date.parse(today) - Date.parse(key)) / 86400000);
  if (days === 1)  return 'Yesterday';
  if (days < 7)    return `${days} days ago`;
  if (days < 14)   return 'Last week';
  if (days < 60)   return `${Math.round(days / 7)} weeks ago`;
  return 'A while ago';
}

function _chapterCard(ch, borderColor) {
  const c         = (DB.chapters || {})[ch.id] || { attempted: 0, correct: 0 };
  const pct       = getChapterPct(ch.id);
  const attempted = c.attempted || 0;
  const isEnr     = !!ch.enrichment;
  const isFlagged = !!c.flagged;
  const planLocked   = !_planAllowsChapter(ch.id);
  // A parent's own lock used to be invisible here: the card looked normal and
  // only said "locked by your parent" in a toast AFTER the child tapped it.
  const parentLocked = (DB.restrictions?.lockedChapters || []).includes(ch.id);
  const locked       = planLocked || parentLocked;

  // A chapter paused via "Continue Later" (see pausePracticeForLater()) gets
  // its own entry in the resume store, independent of every other chapter's -
  // this is what makes pausing chapter A then chapter B keep BOTH resumable,
  // instead of the second pause silently overwriting the first.
  const resume = locked ? null : _getChapterResume(ch.id);

  const prog  = _chapterProgress(ch.id);
  const total = prog.total;

  const tone  = pct >= 80 ? 'good' : pct >= 50 ? 'mid' : 'low';

  const style = borderColor ? ` style="--ch-accent:${borderColor}"` : '';
  const cls   = ['ch-card', isEnr ? 'is-bonus' : '', locked ? 'is-locked' : '', resume ? 'is-paused' : ''].filter(Boolean).join(' ');

  // Status line: one clear sentence per state, never two competing signals.
  let status;
  if (planLocked)        status = '<span class="ch-status lock">🔒 Upgrade to unlock</span>';
  else if (parentLocked) status = '<span class="ch-status lock">🔒 Locked by your parent</span>';
  // ⚠ "resumes at", not "Question N of M". `resume.idx` is a BOOKMARK, not a
  // score - it only moves when the child presses Next, so a round paused on an
  // unanswered first question read "Question 1 of 20" directly above
  // "0 of 125 questions explored" and the two looked like they contradicted
  // each other. They never did: one is where the round restarts, the other is
  // distinct questions in the whole chapter that carry a recorded answer.
  else if (resume)       status = `<span class="ch-status resume">⏸ Paused · resumes at question ${(resume.idx || 0) + 1} of ${(resume.qIds || []).length}</span>`;
  else if (!attempted)   status = `<span class="ch-status new">Not started${total ? ` · ${total} questions` : ''}</span>`;
  // ⚠ "correct", not "mastery". It is accuracy, and calling it mastery told a
  // child who had answered two questions that they had mastered the chapter.
  // Effort sits beside it so the two can be read apart.
  else                   status = `<span class="ch-status">${prog.correct} correct out of ${attempted} answer${attempted === 1 ? '' : 's'}${attempted < 5 ? ' · small sample' : ''}</span>`;

  // The line that actually answers "have I done this one?" - a done-ness badge
  // and when it was last touched.
  const doneBadge = locked ? ''
    : prog.state === 'started'  ? '<span class="ch-done is-started">In progress</span>'
    : '';
  const whenTxt = (!locked && prog.last) ? _chapterWhen(prog.last) : '';
  const metaRow = (doneBadge || whenTxt)
    ? `<div class="ch-meta">${doneBadge}${whenTxt ? `<span class="ch-when">🕘 ${whenTxt}</span>` : ''}</div>`
    : '';

  const hit = locked
    ? `<button class="ch-hit" onclick="toast('${planLocked ? '⭐ Upgrade your plan to access this chapter.' : '🔒 This chapter is locked by your parent.'}', 2500)" aria-label="${_profEsc(ch.name)} - locked"></button>`
    : resume
    ? `<button class="ch-hit" onclick="_doResume('practice','${ch.id}')" aria-label="Resume ${_profEsc(ch.name)}"></button>`
    : `<button class="ch-hit" onclick="startChapterDirect('${ch.id}')" aria-label="Practise ${_profEsc(ch.name)}"></button>`;

  return `<article class="${cls}"${style}>
    ${hit}
    ${locked ? '' : `<button class="ch-flag${isFlagged ? ' on' : ''}" onclick="toggleChapterFlag('${ch.id}')"
      title="${isFlagged ? 'Remove flag' : 'Flag this chapter for your parent'}"
      aria-label="${isFlagged ? 'Remove flag' : 'Flag for parent'}">${isFlagged ? '🚩' : '⚐'}</button>`}
    ${locked ? '' : `<button class="ch-options" onclick="event.stopPropagation();PracticeJourney.openOptions('${ch.id}')"
      aria-label="Practice options for ${_profEsc(ch.name)}" title="Practice options">⚙ Options</button>`}
    ${resume ? `<button class="ch-restart" onclick="event.stopPropagation();_discardChapterResume('${ch.id}')"
      title="Discard paused progress and start fresh" aria-label="Discard paused progress and start fresh">↺</button>` : ''}
    <div class="ch-body">
      <div class="ch-head">
        <span class="ch-icon" aria-hidden="true">${ch.icon || '📘'}</span>
        ${isEnr ? '<span class="ch-badge">✨ Bonus</span>' : ''}
      </div>
      <h3 class="ch-name">${_profEsc(ch.name)}</h3>
      ${ch.part != null ? `<div class="ch-part">Part ${ch.part}</div>` : ''}
      <div class="ch-spacer"></div>
      ${metaRow}
      ${status}
      ${locked ? '' : `<p class="ch-status">${_journeyCoverage(ch.id, prog, total)}</p>`}
      <div class="ch-foot">
        <span class="ch-cta">${locked ? 'Locked' : _journeyCta(ch.id, resume, attempted)}</span>
      </div>
    </div>
  </article>`;
}

// The chapter card's label and coverage line, both truthful.
//
// ⚠ These read only what is ALREADY cached. The grid draws every chapter at
//   once, so asking the server for per-question progress here would be one
//   request per chapter on every render. The full picture is loaded when a
//   chapter is actually opened, or when the Question Map is asked for.
// ⚠ Falls back to the old wording whenever PracticeJourney is not loaded, so a
//   failed script tag degrades to the previous behaviour rather than a blank card.
function _journeyCta(chapterId, resume, attempted) {
  if (typeof PracticeJourney === 'undefined') {
    return resume ? '▶ Resume →' : attempted ? 'Continue →' : 'Start →';
  }
  try { return _profEsc(PracticeJourney.cardLabel(chapterId).label) + ' →'; }
  catch (e) { return resume ? '▶ Resume →' : attempted ? 'Continue →' : 'Start →'; }
}

function _journeyCoverage(chapterId, prog, total) {
  if (typeof PracticeJourney !== 'undefined') {
    try { return _profEsc(PracticeJourney.coverageLine(chapterId)); } catch (e) {}
  }
  return prog.known
    ? `${prog.unique} of ${total} questions explored`
    : 'Question bank not loaded yet';
}

function _discardChapterResume(chapterId) {
  _clearPracticeResume(chapterId);
  toast('Paused progress discarded - next tap starts fresh.', 2200);
  renderChapterSelect();
}

function renderChapterSelect() {
  const grid = document.getElementById('chapter-grid');
  if (!grid) return;
  const accent = _SUBJECT_BORDER_COLOR[ACTIVE_PACK?.subject] || '';

  const regular    = CHAPTERS.filter(ch => !ch.enrichment);
  const enrichment = CHAPTERS.filter(ch =>  ch.enrichment);

  // Says which subject this actually is. The old page just said "Pick a
  // chapter", so a child two taps deep had nothing on screen naming the subject.
  const sub = document.getElementById('chapter-subtitle');
  if (sub) {
    const { grade, name } = _activeSubjectLabel();
    sub.textContent = `Grade ${grade} ${name} · ${regular.length} chapter${regular.length === 1 ? '' : 's'}`
      + (enrichment.length ? ` + ${enrichment.length} bonus` : '');
  }

  if (!CHAPTERS.length) {
    grid.innerHTML = `<div class="ch-empty">
      <div class="text-4xl mb-2">📭</div>
      <p class="font-semibold text-gray-700 dark:text-gray-200">No chapters here yet</p>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Pick a different subject from the Subjects screen.</p>
    </div>`;
    _renderChapterSummary(CHAPTERS);
    return;
  }

  // "Which ones have I not done yet" is a question about the WHOLE list, and no
  // amount of per-card detail answers it on a screen of eighteen cards. The
  // filter answers it directly.
  const keep = ch => {
    const p = _chapterProgress(ch.id);
    if (_chapterFilter === 'todo')  return p.attempted === 0;
    if (_chapterFilter === 'doing') return p.attempted > 0 && p.state !== 'mastered';
    if (_chapterFilter === 'weak')  return p.attempted >= 5 && p.acc < 60;
    return true;
  };
  const shownRegular    = regular.filter(keep);
  const shownEnrichment = enrichment.filter(keep);

  let html = _chapterFilterBar(regular.concat(enrichment));

  if (!shownRegular.length && !shownEnrichment.length) {
    html += `<div class="ch-empty">
      <div class="text-4xl mb-2">🎉</div>
      <p class="font-semibold text-gray-700 dark:text-gray-200">Nothing in this list</p>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${
        _chapterFilter === 'todo' ? 'You have started every chapter here. Nice.'
        : _chapterFilter === 'weak' ? 'No chapter is giving you trouble right now.'
        : 'Try another filter.'}</p>
    </div>`;
  } else {
    html += `<div class="ch-grid">${shownRegular.map(ch => _chapterCard(ch, accent)).join('')}</div>`;
    if (shownEnrichment.length) {
      html += `<div class="ch-section">
          <span class="ch-section-line"></span>
          <span class="ch-section-label">✨ Bonus topics</span>
          <span class="ch-section-line"></span>
        </div>
        <p class="ch-section-note">Extra themes drawn from the syllabus - great once the main chapters feel easy. Some questions here also appear in the main chapters, gathered together by theme.</p>
        <div class="ch-grid">${shownEnrichment.map(ch => _chapterCard(ch, accent)).join('')}</div>`;
    }
  }

  grid.innerHTML = html;
  _renderChapterSummary(CHAPTERS);
}

window.setChapterFilter = function (f) {
  _chapterFilter = f;
  renderChapterSelect();
};

function _chapterFilterBar(all) {
  const counts = { all: all.length, todo: 0, doing: 0, weak: 0 };
  all.forEach(ch => {
    const p = _chapterProgress(ch.id);
    if (p.attempted === 0) counts.todo++;
    else if (p.state !== 'mastered') counts.doing++;
    if (p.attempted >= 5 && p.acc < 60) counts.weak++;
  });
  const tab = (id, label) => `<button class="ch-filter${_chapterFilter === id ? ' on' : ''}"
      onclick="setChapterFilter('${id}')">${label} <span class="ch-filter-n">${counts[id]}</span></button>`;
  return `<div class="ch-filters">
    ${tab('all', 'All')}${tab('todo', 'Not started')}${tab('doing', 'In progress')}
    ${counts.weak ? tab('weak', 'Needs work') : ''}
  </div>`;
}

// A one-line "where am I" strip above the grid, so the child does not have to
// read every card to know how the subject is going.
function _renderChapterSummary(chapters) {
  const el = document.getElementById('chapter-summary');
  if (!el) return;
  if (!chapters.length) { el.innerHTML = ''; return; }

  // ⚠ Same correction as the card: "Mastered" used to be accuracy >= 80% with a
  // single answer, so a child who got two lucky questions right was told they
  // had mastered the chapter and the tile was meaningless. It now needs real
  // effort as well - see _chapterProgress().
  const prog     = chapters.map(ch => _chapterProgress(ch.id));
  const done     = prog.filter(p => p.attempted > 0);
  const answers = prog.reduce((sum,p) => sum + p.attempted, 0);
  const unique = prog.reduce((sum,p) => sum + p.unique, 0);
  const available = prog.reduce((sum,p) => sum + p.total, 0);

  // "When did I last touch this subject" - the other half of "what have I done".
  const lastMs   = Math.max(0, ...prog.map(p => p.last || 0));
  const todayKey = _muDayKey();
  const doneToday = prog.filter(p => p.last &&
    new Date(p.last + _MU_OFFSET_MS).toISOString().slice(0, 10) === todayKey).length;

  el.innerHTML = `
    <div class="ch-sum-tile"><span class="ch-sum-num">${done.length}<span class="ch-sum-of">/${chapters.length}</span></span><span class="ch-sum-lbl">Started</span></div>
    <div class="ch-sum-tile"><span class="ch-sum-num">${answers}</span><span class="ch-sum-lbl">Answers given</span></div>
    <div class="ch-sum-tile"><span class="ch-sum-num${doneToday ? ' good' : ''}">${doneToday}</span><span class="ch-sum-lbl">Practised today</span></div>
    <div class="ch-sum-bar">
      <div class="ch-sum-bar-head">
        <span>${unique} different bank questions recorded${available ? ` · ${available} questions currently loaded` : ''}</span>
      </div>
      <p class="ch-sum-last">Includes bonus chapters. Answers may include repeats, not chapter completion. Different-question tracking starts with this update; earlier answers are kept but cannot be reconstructed. Counts refer to the loaded bank, not syllabus mastery.</p>
      <div class="ch-sum-last">${lastMs ? `Last practised: ${_chapterWhen(lastMs)}` : 'Nothing practised yet - pick any chapter to begin.'}</div>
    </div>`;
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

// Set by startAssignmentDirect immediately before it calls startChapterDirect,
// and consumed exactly once. A parameter would have been cleaner, but
// startChapterDirect(chapterId, forceDiff) is called from a dozen places and
// from inline onclick handlers in index.html, so its signature is effectively
// public API. Anything that is NOT an assignment therefore gets the normal
// defaults - which also fixes showAnswers:false leaking from a finished
// assignment into the next ordinary practice session.
// Plain names for the four levels, for messages that must tell a child which
// level is thin. _updateDiffBadge has its own richer LEVELS map for the badge;
// this is deliberately just the words, so a toast reads as a sentence.
const _DIFF_NAMES = { 1: 'Basic', 2: 'Medium', 3: 'Hard', 4: 'Challenge' };

let _practiceMode = null;

// Same one-shot handover pattern as _practiceMode, set by _doResume() right
// before it calls startChapterDirect() to resume a paused practice session at
// its exact question instead of drawing a fresh batch. Carries the already
// resolved question objects (not ids) plus idx/answers - startChapterDirect
// just adopts them instead of the usual qs:[]/idx:0 reset.
let _practiceResume = null;

// ── CHILD DASHBOARD MISSION ───────────────────────────────────────────────
// A five-question mission is an on-ramp, not a second practice system.  By
// handing its small, ordinary question list through startChapterDirect(), every
// established behaviour still applies: parent chapter locks, plan access,
// hints, scratchpad, answer review, XP, progress and the normal pause/resume
// system.  A child can always choose another subject from the dashboard card.
window.startKidMission = async function() {
  const packs = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [])
    .filter(p => !p.comingSoon);
  if (!packs.length) { toast('Your subjects are being set up. Please try again soon.', 3000); return; }

  const acct = (typeof Auth !== 'undefined') ? Auth.getActiveAccount() : null;
  const grade = acct?.grade || SELECTED_GRADE;
  const gradePacks = grade ? packs.filter(p => String(p.grade) === String(grade)) : packs;
  const choices = (gradePacks.length ? gradePacks : packs).slice().sort((a, b) => {
    // Maths is a dependable first subject for this app, but retain the child's
    // already-selected subject as their first choice on later visits.
    const score = p => p.id === ACTIVE_PACK?.id ? 0 : (/math/i.test(`${p.subject || ''} ${p.name || ''}`) ? 1 : 2);
    return score(a) - score(b);
  });
  const previousPackId = ACTIVE_PACK?.id;

  for (const candidate of choices) {
    const pack = activateSubjectPack(candidate.id);
    if (!pack) continue;
    try {
      if (typeof QuestionLoader !== 'undefined') await QuestionLoader.loadSubject(pack.id);
    } catch (_) {
      // Try the next available subject; a child should get a useful next step,
      // not a technical loading error, whenever another pack is ready.
      continue;
    }

    const locked = DB.restrictions?.lockedChapters || [];
    const chapter = CHAPTERS.find(ch => !locked.includes(ch.id) && _planAllowsChapter(ch.id));
    if (!chapter) continue;

    const questions = getQuestionsForChapter(chapter.id, 1, 5);
    if (!questions.length) continue;

    _practiceResume = { qs: questions, idx: 0, answers: {} };
    startChapterDirect(chapter.id, 1);
    return;
  }

  // Do not leave the child in a different, unusable subject after a loading
  // failure. Their previous choice remains intact and all normal navigation is
  // still available.
  if (previousPackId) activateSubjectPack(previousPackId);
  toast('We could not find an open mission yet. Pick a subject to explore instead.', 3500);
};

// ⚠ _attempt is INTERNAL. It exists because the "questions are not loaded yet"
// branch below re-calls this function, and that retry was unbounded.
//
// QuestionLoader.loadSubject() short-circuits on its _done set, so the second
// call resolves INSTANTLY doing no work at all. If the chapter's questions were
// still missing - a subject the server filtered out, a chapter with no question
// file, or a first load that failed and marked the subject done with nothing in
// it - hasQs stayed false and this recursed through resolved promises as fast as
// the event loop would go, running STATIC_QUESTIONS.some() over ~5,400 questions
// and firing a toast on every pass. That is a pegged CPU and a dead tab, and it
// is what a child saw as the browser crashing shortly after tapping a chapter.
//
// Every call from markup passes two arguments, so the default keeps the public
// signature exactly as it was.
function startChapterDirect(chapterId, forceDiff, _attempt) {
  const mode = _practiceMode;
  _practiceMode = null;
  const resume = _practiceResume;
  _practiceResume = null;
  const locked = DB.restrictions?.lockedChapters || [];
  if (locked.includes(chapterId)) { toast('🔒 This chapter is locked by your parent.', 2000); return; }
  if (!_planAllowsChapter(chapterId)) { _showChapterLockedModal(chapterId); return; }
  // A Textes a Trous chapter opens its own screen, not the practice flow.
  // MUST be after the lock/plan checks above, and BEFORE the pool lookup below:
  // getStaticQs() excludes type 'cloze', so hasQs is false for these chapters
  // for ever and the one-shot retry would end on "These questions could not be
  // loaded" every single time.
  if (typeof ClozeText !== 'undefined' && ClozeText.isClozeChapter(chapterId) && ClozeText.open(chapterId)) return;
  // A Chasse aux Erreurs chapter opens its own screen too, and for the same
  // reason: getStaticQs() excludes type 'errorhunt', so hasQs below is false
  // for these chapters for ever and the one-shot retry would end on "These
  // questions could not be loaded" every single time.
  if (typeof ErrorHunt !== 'undefined' && ErrorHunt.isHuntChapter(chapterId) && ErrorHunt.open(chapterId)) return;
  const maxDiff = DB.restrictions?.maxDifficulty ?? 4;

  // If questions for this chapter aren't loaded yet, wait for the active subject to load first
  const hasQs = STATIC_QUESTIONS.some(q => q && q.chapterId === chapterId);
  if (!hasQs && !(resume && resume.qs.length) && typeof QuestionLoader !== 'undefined' && typeof ACTIVE_PACK !== 'undefined' && ACTIVE_PACK) {
    // ONE retry. A second failure is a real answer - the questions are not
    // coming - and must be said out loud rather than tried again for ever.
    if (_attempt) {
      console.warn('[startChapterDirect] no questions for', chapterId,
        'after reloading', ACTIVE_PACK.id, '- giving up rather than retrying.');
      toast('These questions could not be loaded. Check your connection, or ask your parent whether this chapter is unlocked.', 4000);
      return;
    }
    toast('⏳ Loading questions…', 2000);
    QuestionLoader.loadSubject(ACTIVE_PACK.id)
      .then(() => { _practiceMode = mode; _practiceResume = resume; startChapterDirect(chapterId, forceDiff, 1); })
      .catch(() => toast('Could not load questions. Please try again.', 3000));
    return;
  }

  // null diff = mixed mode (random across all levels up to parent cap)
  const diff = forceDiff ? Math.min(forceDiff, maxDiff) : null;

  _blankQuestions.clear();
  S.practice.chapterId = chapterId;
  S.practice.difficulty = diff;
  if (resume && resume.qs.length) {
    S.practice.qs      = resume.qs;
    S.practice.idx      = Math.min(resume.idx || 0, resume.qs.length - 1);
    S.practice.answers  = resume.answers || {};
  } else {
    S.practice.qs = [];
    S.practice.idx = 0;
    S.practice.answers = {};
  }
  S.practice.session = { attempted: 0, correct: 0, points: 0 };
  S.practice.showAnswers = mode ? mode.showAnswers !== false : true;
  S.practice.showHints   = mode ? mode.showHints   !== false : true;
  // See _assignmentActive's own comment: true only when THIS launch came from
  // startAssignmentDirect (mode is its one-shot handover) - false for every
  // ordinary practice start and every resume, which is exactly right, since
  // _practiceResume can only ever be set by resuming a genuine paused PRACTICE
  // session, never an assignment (assignments are never saved to the resume
  // store in the first place - see _saveResume()).
  _setAssignmentContext(!!mode);
  loadPracticeQuestion();
  showScreen('practice');
  const ch = CHAPTERS.find(c => c.id === chapterId);
  document.getElementById('practice-ch-name').textContent = ch ? `${ch.icon} ${ch.name}` : chapterId;
  _setPracticeBackLabel('← Chapters', 'Back to chapters');
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

// Hands startChapterDirect() an explicit, already-chosen question list.
//
// PracticeJourney selects the set (see engine/practice_selector.js); this only
// carries it across. It deliberately reuses _practiceResume rather than setting
// S.practice itself, so the parent lock, the plan check, the cloze redirect,
// the "questions not loaded yet" retry and the assignment-context reset all
// still run exactly once, in one place. startSearchPractice() bypasses them and
// can afford to, because it runs on the synthetic 'search-results' chapter;
// this runs on a REAL chapter id and must not.
function startChapterWithSet(chapterId, questions, startIdx) {
  if (!Array.isArray(questions) || !questions.length) return false;
  _practiceResume = { qs: questions.slice(), idx: startIdx || 0, answers: {} };
  startChapterDirect(chapterId);
  return true;
}

// ── SEARCH PRACTICE LAUNCH ────────────────────
// Called by Search.practiceOwn / practiceOther with a pre-built question array
function startSearchPractice(questions, label, coachMission = null) {
  if (!questions || !questions.length) { toast('No questions to practise. Try a different search.', 2500); return; }
  // Ordinary practice, whatever ran before it - see _setAssignmentContext.
  _setAssignmentContext(false);
  S.practice.coachMission = coachMission;
  S.practice.chapterId  = 'search-results';
  S.practice.difficulty = null;
  S.practice.qs         = shuffle(questions.slice());
  S.practice.idx        = 0;
  S.practice.answers    = {};
  S.practice.hintShown  = false;
  S.practice.session    = { attempted: 0, correct: 0 };
  S.practice.showAnswers = !coachMission || coachMission.kind === 'practice';
  S.practice.showHints = !coachMission || coachMission.kind === 'practice';
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
// ── SCHEDULED STUDY SESSIONS (child view) ─────────────────────────────────
// A scheduled session is the child's OWN study plan, not homework, so it opens
// as ordinary practice: no _practiceMode, which means hints and answers stay
// on, it counts toward the daily cap, and the round is resumable. That is the
// whole difference from startAssignmentDirect below.
// forceDiff is optional and defaults to the mixed round this has always
// started; the calendar day popup passes a level when the child picks one.
async function startScheduledSession(subjectId, chapterId, forceDiff) {
  if (!subjectId || !chapterId) { toast('This session has no topic set. 📚', 2500); return; }
  if (typeof PackLoader !== 'undefined') await PackLoader.ensure(subjectId).catch(() => {});
  const pack = activateSubjectPack(subjectId);
  if (!pack) { toast('Subject coming soon! 📚', 2500); return; }
  if (typeof QuestionLoader !== 'undefined') await QuestionLoader.loadSubject(pack.id);
  startChapterDirect(chapterId, forceDiff || null);
}

// "Mon 15 Sep", plus a friendlier word for the two days that matter most.
function _scheduleDayLabel(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d)) return dateStr;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const diff = Math.round((d - today) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

// Ids reach an inline onclick, where _profEsc is NOT enough - it escapes text
// content but leaves quotes intact. Subject and chapter ids are manifest slugs,
// so requiring the slug shape is both true and safer than escaping: anything
// else simply gets no button.
const _SLUG_RE = /^[a-z0-9][a-z0-9_-]*$/i;

function _scheduleRow(e, compact) {
  const startable = _SLUG_RE.test(e.subjectId || '') && _SLUG_RE.test(e.chapterId || '');
  const start = startable
    ? `<button onclick="startScheduledSession('${e.subjectId}','${e.chapterId}')"
         class="shrink-0 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg">Start</button>`
    // No matching chapter: the label is still shown, but there is nothing
    // honest to start. Better than hiding a session the child was told about.
    : `<span class="shrink-0 text-[11px] text-gray-400">see timetable</span>`;
  return `<div class="flex items-center gap-3 p-3 rounded-xl border ${e.isToday
      ? 'border-indigo-300 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
      : 'border-gray-200 dark:border-gray-700'}">
    <span class="text-xl select-none">${e.icon}</span>
    <div class="flex-1 min-w-0">
      <div class="text-sm font-semibold text-gray-800 dark:text-white truncate">${_profEsc(e.label)}</div>
      <div class="text-[11px] text-gray-500 dark:text-gray-400 truncate">
        ${compact ? _scheduleDayLabel(e.date) + (e.subjectName ? ' · ' : '') : ''}${_profEsc(e.subjectName || '')}${e.minutes ? ` · ${e.minutes} min` : ''}
      </div>
    </div>
    ${start}
  </div>`;
}

// Dashboard: the next few sessions only. A full month here would bury the
// practice tiles underneath it.
async function renderDashSchedule(studentId) {
  const box  = document.getElementById('dash-schedule');
  const list = document.getElementById('dash-schedule-list');
  if (!box || !list || !studentId || typeof Calendar === 'undefined') return;
  let items = [];
  try { items = await Calendar.getUpcoming(studentId, 14); } catch (_) { }
  if (!items.length) { box.classList.add('hidden'); return; }
  box.classList.remove('hidden');
  list.innerHTML = items.slice(0, 4).map(e => _scheduleRow(e, true)).join('');
}

// ── MY TIMETABLE (child view) ─────────────────────────────────────────────
// Two readings of the same rows, chosen by the toggle above the body:
//   list     - backlog first, then upcoming grouped by day ("what do I do next")
//   calendar - a month grid with big dates and the sessions written into the
//              squares ("where does my week go"), each square opening a popup
//              with the day's detail and its practice options.
// Both start work through startScheduledSession(), so a session can never
// behave differently depending on which view a child tapped it in.
const _TT_VIEW_KEY  = 'psac_timetable_view_v1';
const _TT_LIST_DAYS = 60;
const _TT_DOW    = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const _TT_MONTHS = ['January','February','March','April','May','June','July',
                    'August','September','October','November','December'];
const _TT_DIFF_ICON = { 1: '🟢', 2: '🟡', 3: '🟠', 4: '🧠' };

// ⚠ Module-level UI state, reset in the RENDER (renderSchedule), never in the
// toggle: opening the screen must land on the current month whatever month the
// last visit - or the last child on this shared device - happened to browse to.
let _ttView  = 'list';
let _ttMonth = null;
let _ttData  = { backlog: [], future: [], byDate: new Map(), actByDate: new Map() };

// One colour per subject for the grid chips. Only the chip's rule and dot are
// tinted; the LABEL keeps the theme's own ink, so a chip's contrast never
// depends on which subject the session happens to be.
const _TT_COLORS   = { maths:'#6366f1', english:'#0ea5e9', french:'#a855f7', science:'#10b981', history:'#f59e0b' };
const _TT_FALLBACK = ['#0891b2','#c026d3','#65a30d','#ea580c','#0369a1','#7c3aed'];
function _ttColor(e) {
  const key = `${e.subjectName || ''} ${e.subjectId || ''}`.toLowerCase();
  for (const k of Object.keys(_TT_COLORS)) if (key.includes(k)) return _TT_COLORS[k];
  let hash = 0;
  for (const ch of (e.subjectId || 'x')) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return _TT_FALLBACK[hash % _TT_FALLBACK.length];
}

// ⚠ LOCAL date key, not _muDayKey. A calendar square IS a local date - the same
// deliberate exception the parent's calendar makes - and schedule_entries.date
// is written from the same local reading.
function _ttDayKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function _ttStoredView() {
  try {
    const v = localStorage.getItem(_TT_VIEW_KEY);
    if (v === 'calendar' || v === 'list') return v;
  } catch (_) { }
  return 'list';
}

function _ttSyncToggle() {
  [['list','tt-view-list'], ['calendar','tt-view-calendar']].forEach(([view, id]) => {
    const b = document.getElementById(id);
    if (!b) return;
    const on = _ttView === view;
    b.classList.toggle('is-on', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}

function setTimetableView(view) {
  _ttView = view === 'calendar' ? 'calendar' : 'list';
  try { localStorage.setItem(_TT_VIEW_KEY, _ttView); } catch (_) { }
  _ttSyncToggle();
  _ttPaint();
}
window.setTimetableView = setTimetableView;

// Full screen. Loads once, then either view paints from _ttData without going
// back to the network - switching view is a repaint, not a refetch.
async function renderSchedule() {
  const body = document.getElementById('schedule-body');
  if (!body) return;
  const now = new Date();
  _ttMonth = { y: now.getFullYear(), m: now.getMonth() };
  _ttView  = _ttStoredView();
  _ttSyncToggle();

  const sid = ACTIVE_STUDENT_ID;
  if (!sid || typeof Calendar === 'undefined') {
    _ttData = { backlog: [], future: [], byDate: new Map(), actByDate: new Map() };
    body.innerHTML = '<p class="text-sm text-gray-400 text-center py-8">No timetable yet.</p>';
    return;
  }

  // 400 days so the month grid can be paged through a whole year. The LIST is
  // still cut to _TT_LIST_DAYS below, which is exactly what it showed before.
  let upcoming = [], backlog = [], activity = [];
  try {
    [upcoming, backlog, activity] = await Promise.all([
      Calendar.getUpcoming(sid, 400),
      Calendar.getBacklog(sid),
      Calendar.getRecentActivity ? Calendar.getRecentActivity(sid, 120) : Promise.resolve([]),
    ]);
  } catch (_) { }

  const until = new Date(); until.setDate(until.getDate() + _TT_LIST_DAYS);
  const untilStr = _ttDayKey(until);

  // getBacklog covers <= today and getUpcoming covers >= today, so today's rows
  // arrive twice - deduped by id here rather than dropped from either list,
  // which is what the list view has always had to do for itself.
  const byDate = new Map(), seen = new Set();
  for (const e of [...(backlog || []), ...(upcoming || [])]) {
    const key = e.id != null ? `id:${e.id}` : `${e.date}|${e.label}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (!byDate.has(e.date)) byDate.set(e.date, []);
    byDate.get(e.date).push(e);
  }
  const actByDate = new Map();
  for (const a of (activity || [])) {
    if (!actByDate.has(a.date)) actByDate.set(a.date, []);
    actByDate.get(a.date).push(a);
  }

  _ttData = {
    backlog: backlog || [],
    future: (upcoming || []).filter(e => !e.isToday && e.date <= untilStr),
    byDate, actByDate,
  };
  _ttPaint();
}

function _ttPaint() {
  const body = document.getElementById('schedule-body');
  const done = document.getElementById('schedule-done');
  if (!body) return;
  if (_ttView === 'calendar') {
    body.innerHTML = _ttCalendarHtml();
    // The recap has its own home in the calendar view: each day's popup shows
    // what was done on that day, next to what was planned for it.
    if (done) done.innerHTML = '';
    return;
  }
  body.innerHTML = _ttListHtml();
  renderMyActivity(ACTIVE_STUDENT_ID);
}

// ── List view: backlog (today + past) at top, then upcoming, grouped by day ──
function _ttListHtml() {
  const backlog = _ttData.backlog, futureItems = _ttData.future;
  if (!backlog.length && !futureItems.length) {
    return `<div class="text-center py-10">
      <div class="text-4xl mb-3 select-none">🗓️</div>
      <p class="text-sm text-gray-500 dark:text-gray-400">Nothing scheduled yet.</p>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">Ask a parent to build you a study timetable - or just pick a chapter yourself.</p>
      <button onclick="showScreen('subject-select')" class="btn-primary text-sm mt-4">📚 Choose a chapter</button>
    </div>`;
  }

  let html = '';

  if (backlog.length) {
    const byDay = new Map();
    for (const e of backlog) {
      if (!byDay.has(e.date)) byDay.set(e.date, []);
      byDay.get(e.date).push(e);
    }
    html += `<div class="sch-section-head sch-section-backlog">
      <span>📌 Today &amp; Backlog</span>
      <span class="sch-section-count">${backlog.length} session${backlog.length !== 1 ? 's' : ''}</span>
    </div>`;
    html += [...byDay.entries()].map(([date, rows]) => {
      const isToday = rows[0].isToday;
      const total   = rows.reduce((n, r) => n + (r.minutes || 0), 0);
      return `<div class="${isToday ? '' : 'sch-backlog-day'}">
        <div class="flex items-baseline justify-between mb-2">
          <h3 class="text-sm font-bold ${isToday ? 'text-amber-600 dark:text-amber-400' : 'text-rose-500 dark:text-rose-400'}">
            ${isToday ? '📅 Today' : '⏰ ' + _scheduleDayLabel(date)}
            ${!isToday ? '<span class="sch-overdue-tag">overdue</span>' : ''}
          </h3>
          ${total ? `<span class="text-[11px] text-gray-400">${total} min</span>` : ''}
        </div>
        <div class="space-y-2">${rows.map(e => _scheduleRow(e, false)).join('')}</div>
      </div>`;
    }).join('');
  }

  if (futureItems.length) {
    const byDay = new Map();
    for (const e of futureItems) {
      if (!byDay.has(e.date)) byDay.set(e.date, []);
      byDay.get(e.date).push(e);
    }
    if (backlog.length) html += `<div class="sch-section-head sch-section-upcoming"><span>📆 Upcoming</span></div>`;
    html += [...byDay.entries()].map(([date, rows]) => {
      const total = rows.reduce((n, r) => n + (r.minutes || 0), 0);
      return `<div>
        <div class="flex items-baseline justify-between mb-2">
          <h3 class="text-sm font-bold text-gray-700 dark:text-gray-200">${_scheduleDayLabel(date)}</h3>
          ${total ? `<span class="text-[11px] text-gray-400">${total} min</span>` : ''}
        </div>
        <div class="space-y-2">${rows.map(e => _scheduleRow(e, false)).join('')}</div>
      </div>`;
    }).join('');
  }

  return html;
}

// ── Calendar view: a real month grid ──────────────────────────────────────
// Monday-first, big dates, sessions written into the square. Past days are
// simply muted: an overdue TAG belongs in the list (where a child can act on
// it), not spread across a month of red squares - see renderMyActivity's note
// on why a child's screen never lists their failures.
function _ttCalendarHtml() {
  // A tap on the toggle can land before renderSchedule() has run at all - the
  // buttons are static markup, the render is not.
  if (!_ttMonth) { const n = new Date(); _ttMonth = { y: n.getFullYear(), m: n.getMonth() }; }
  const { y, m }  = _ttMonth;
  const todayKey  = _ttDayKey(new Date());
  const lead      = (new Date(y, m, 1).getDay() + 6) % 7;
  const daysIn    = new Date(y, m + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < lead; i++) cells.push('<span class="tt-day is-blank" aria-hidden="true"></span>');

  let monthSessions = 0;
  for (let d = 1; d <= daysIn; d++) {
    const key  = _ttDayKey(new Date(y, m, d));
    const rows = _ttData.byDate.get(key) || [];
    const acts = _ttData.actByDate.get(key) || [];
    monthSessions += rows.length;
    const isToday = key === todayKey;
    const isPast  = key < todayKey;
    const chips = rows.slice(0, 2).map(e =>
      `<span class="tt-chip" style="--tt-c:${_ttColor(e)}">
        <span class="tt-chip-ico">${e.icon || '📚'}</span><span class="tt-chip-txt">${_profEsc(e.label)}</span>
      </span>`).join('');
    const more = rows.length > 2
      ? `<span class="tt-more">+${rows.length - 2}<span class="tt-more-word"> more</span></span>` : '';
    const aria = `${d} ${_TT_MONTHS[m]} ${y}${isToday ? ', today' : ''}. ` +
      (rows.length ? `${rows.length} session${rows.length === 1 ? '' : 's'} planned.` : 'Nothing planned.') +
      (acts.length ? ` ${acts.length} thing${acts.length === 1 ? '' : 's'} done.` : '');
    cells.push(`<button type="button" onclick="openTimetableDay('${key}')" aria-label="${_attr(aria)}"
      class="tt-day${isToday ? ' is-today' : ''}${isPast ? ' is-past' : ''}${rows.length ? ' has-work' : ''}">
      <span class="tt-date">${d}</span>
      ${acts.length ? '<span class="tt-done-mark" aria-hidden="true">✓</span>' : ''}
      <span class="tt-chips">${chips}${more}</span>
    </button>`);
  }

  const subjects = new Map();
  for (const rows of _ttData.byDate.values())
    for (const e of rows) if (e.subjectName) subjects.set(e.subjectName, _ttColor(e));

  return `<div class="tt-cal">
    <div class="tt-cal-head">
      <button type="button" class="tt-nav" onclick="ttShiftMonth(-1)" aria-label="Previous month">‹</button>
      <div class="tt-cal-title">${_TT_MONTHS[m]} ${y}</div>
      <button type="button" class="tt-nav" onclick="ttShiftMonth(1)" aria-label="Next month">›</button>
    </div>
    <div class="tt-cal-bar">
      <span class="tt-cal-count">${monthSessions ? `${monthSessions} session${monthSessions === 1 ? '' : 's'} this month` : 'Nothing planned this month'}</span>
      <button type="button" class="tt-today-btn" onclick="ttGoToday()">Today</button>
    </div>
    <div class="tt-dow" aria-hidden="true">${_TT_DOW.map(d => `<span>${d}</span>`).join('')}</div>
    <div class="tt-grid" role="grid">${cells.join('')}</div>
    <p class="tt-hint">Tap any day to see what is on and start practising.</p>
    ${subjects.size ? `<div class="tt-legend">${[...subjects.entries()].map(([name, c]) =>
      `<span class="tt-legend-item"><span class="tt-legend-dot" style="background:${c}"></span>${_profEsc(name)}</span>`).join('')}</div>` : ''}
  </div>`;
}

function ttShiftMonth(delta) {
  if (!_ttMonth) return;
  const d = new Date(_ttMonth.y, _ttMonth.m + delta, 1);
  _ttMonth = { y: d.getFullYear(), m: d.getMonth() };
  const body = document.getElementById('schedule-body');
  if (body) body.innerHTML = _ttCalendarHtml();
}
window.ttShiftMonth = ttShiftMonth;

function ttGoToday() {
  const n = new Date();
  _ttMonth = { y: n.getFullYear(), m: n.getMonth() };
  const body = document.getElementById('schedule-body');
  if (body) body.innerHTML = _ttCalendarHtml();
}
window.ttGoToday = ttGoToday;

// ── One day, opened from a square ─────────────────────────────────────────
// Everything planned for that day, what was already done on it, and the
// practice options for each topic - so a child starts work from the calendar
// instead of going away to hunt for the chapter.
function openTimetableDay(dateKey) {
  const modal = document.getElementById('modal-tt-day');
  const title = document.getElementById('tt-day-title');
  const sub   = document.getElementById('tt-day-sub');
  const body  = document.getElementById('tt-day-body');
  if (!modal || !body) return;

  const rows = _ttData.byDate.get(dateKey) || [];
  const acts = _ttData.actByDate.get(dateKey) || [];
  const d    = new Date(dateKey + 'T00:00:00');
  const todayKey = _ttDayKey(new Date());

  if (title) {
    title.textContent = isNaN(d) ? dateKey
      : d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  }
  if (sub) {
    const mins = rows.reduce((n, r) => n + (r.minutes || 0), 0);
    const bits = [];
    if (dateKey === todayKey) bits.push('Today');
    bits.push(rows.length ? `${rows.length} session${rows.length === 1 ? '' : 's'}` : 'Nothing planned');
    if (mins) bits.push(`about ${mins} min`);
    sub.textContent = bits.join(' · ');
  }

  let html = rows.length
    ? `<div class="tt-sessions">${rows.map(_ttSessionCard).join('')}</div>`
    : `<div class="tt-empty">
         <div class="tt-empty-ico" aria-hidden="true">🌤️</div>
         <p class="tt-empty-msg">Nothing is planned for this day.</p>
         <p class="tt-empty-sub">You can still practise anything you like.</p>
       </div>`;

  if (acts.length) {
    html += `<div class="tt-didsec">
      <h4 class="tt-didsec-head">✅ What you did</h4>
      ${acts.map(a => {
        const col = a.pct == null ? '' : a.pct >= 80 ? '#22c55e' : a.pct >= 50 ? '#f59e0b' : '#ef4444';
        return `<div class="tt-did">
          <span class="tt-did-ico">${a.icon}</span>
          <span class="tt-did-body">
            <span class="tt-did-title">${_profEsc(a.title)}</span>
            <span class="tt-did-meta">${a.subjectName ? _profEsc(a.subjectIcon + ' ' + a.subjectName) + ' · ' : ''}${_profEsc(a.detail || '')}</span>
          </span>
          ${a.pct == null ? '' : `<span class="tt-did-pct" style="color:${col}">${a.pct}%</span>`}
        </div>`;
      }).join('')}
    </div>`;
  }

  html += `<button type="button" class="tt-choose" onclick="ttChooseChapter()">📚 Choose any chapter</button>`;

  body.innerHTML = html;
  body.scrollTop = 0;
  modal.classList.remove('hidden');
}
window.openTimetableDay = openTimetableDay;

function closeTimetableDay() {
  document.getElementById('modal-tt-day')?.classList.add('hidden');
}
window.closeTimetableDay = closeTimetableDay;

function ttChooseChapter() {
  closeTimetableDay();
  showScreen('subject-select');
}
window.ttChooseChapter = ttChooseChapter;

// Ids reach an inline onclick here exactly as they do in _scheduleRow, so the
// same slug requirement applies: anything that is not a manifest slug simply
// gets no buttons rather than being escaped into one.
function _ttSessionCard(e) {
  const startable = _SLUG_RE.test(e.subjectId || '') && _SLUG_RE.test(e.chapterId || '');
  const prog = (startable && typeof _chapterProgress === 'function') ? _chapterProgress(e.chapterId) : null;
  // ⚠ "correct", never "mastery" - _chapterProgress().acc is accuracy.
  const progTxt = !prog ? '' : prog.attempted ? `${prog.acc}% correct so far` : 'Not started yet';
  const meta = [e.subjectName ? _profEsc(e.subjectName) : '', e.minutes ? `${e.minutes} min` : '', progTxt]
    .filter(Boolean).join(' · ');

  // Levels above the parent's cap are not offered: startChapterDirect clamps
  // them silently, and a button that quietly does something else is worse than
  // no button.
  const maxDiff = DB.restrictions?.maxDifficulty ?? 4;
  const diffs = [1, 2, 3, 4].filter(n => n <= maxDiff);

  const opts = startable
    ? `<button type="button" class="tt-start" onclick="startTimetableSession('${e.subjectId}','${e.chapterId}',0)">▶ Start practice</button>
       <div class="tt-diffs">
         <span class="tt-diffs-label">or pick a level</span>
         ${diffs.map(n => `<button type="button" class="tt-diff"
            onclick="startTimetableSession('${e.subjectId}','${e.chapterId}',${n})">${_TT_DIFF_ICON[n]} ${_DIFF_NAMES[n]}</button>`).join('')}
       </div>`
    : `<p class="tt-sess-note">This one has no topic set - open your subject list to practise it.</p>`;

  return `<div class="tt-sess">
    <div class="tt-sess-head">
      <span class="tt-sess-ico">${e.icon || '📚'}</span>
      <span class="tt-sess-info">
        <span class="tt-sess-title">${_profEsc(e.label)}</span>
        ${meta ? `<span class="tt-sess-meta">${meta}</span>` : ''}
      </span>
    </div>
    ${e.notes ? `<p class="tt-sess-note">${_profEsc(e.notes)}</p>` : ''}
    <div class="tt-opts">${opts}</div>
  </div>`;
}

function startTimetableSession(subjectId, chapterId, diff) {
  closeTimetableDay();
  startScheduledSession(subjectId, chapterId, diff || null);
}
window.startTimetableSession = startTimetableSession;

// ── WHAT I HAVE DONE (child timetable screen) ──
// The child's half of the calendar activity layer. The parent gets filters and
// a month grid to audit with; a child gets a short, recent, encouraging recap.
//
// ⚠ Only what they DID. There is no "missed sessions" counterpart here on
// purpose - on a parent's calendar an unticked plan row is information; on a
// child's own screen it is a list of their failures, served every time they
// open it. Nothing here should make a child avoid this screen.
async function renderMyActivity(studentId) {
  const box = document.getElementById('schedule-done');
  if (!box) return;
  if (!studentId || typeof Calendar === 'undefined' || !Calendar.getRecentActivity) {
    box.innerHTML = ''; return;
  }

  let items = [];
  try { items = await Calendar.getRecentActivity(studentId, 14); } catch (_) { items = []; }
  if (!items.length) { box.innerHTML = ''; return; }

  const byDay = new Map();
  for (const a of items) {
    if (!byDay.has(a.date)) byDay.set(a.date, []);
    byDay.get(a.date).push(a);
  }
  const days = byDay.size;
  const qs = items.reduce((n, a) => {
    const m = /^(\d+) question/.exec(a.detail || '');
    return n + (m ? Number(m[1]) : 0);
  }, 0);

  const row = a => {
    const col = a.pct == null ? '' : a.pct >= 80 ? '#22c55e' : a.pct >= 50 ? '#f59e0b' : '#ef4444';
    return `<div class="flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
      <span class="text-lg select-none shrink-0">${a.icon}</span>
      <div class="flex-1 min-w-0">
        <div class="text-sm font-semibold text-gray-800 dark:text-white truncate">${_profEsc(a.title)}</div>
        <div class="text-[11px] text-gray-500 dark:text-gray-400 truncate">
          ${a.subjectName ? _profEsc(a.subjectIcon + ' ' + a.subjectName) + ' · ' : ''}${_profEsc(a.detail || '')}
        </div>
      </div>
      ${a.pct == null ? '' : `<span class="text-sm font-bold shrink-0" style="color:${col}">${a.pct}%</span>`}
    </div>`;
  };

  box.innerHTML = `
    <div class="mt-8">
      <div class="flex items-baseline justify-between mb-1">
        <h3 class="text-sm font-bold text-gray-700 dark:text-gray-200">✅ What you have done</h3>
        <span class="text-[11px] text-gray-400">last 14 days</span>
      </div>
      <p class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-3">
        ${days} day${days === 1 ? '' : 's'} of work${qs ? ` · ${qs} question${qs === 1 ? '' : 's'}` : ''}. Nice going.
      </p>
      <div class="space-y-3">
        ${[...byDay.entries()].map(([date, rows]) => `<div>
          <div class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 mb-1.5">${_scheduleDayLabel(date)}</div>
          <div class="space-y-2">${rows.map(row).join('')}</div>
        </div>`).join('')}
      </div>
    </div>`;
}

async function startAssignmentDirect(subjectId, chapterId, difficulty, showAnswers, showHints, assignmentId) {
  if (typeof PackLoader !== 'undefined') await PackLoader.ensure(subjectId).catch(() => {});
  const pack = activateSubjectPack(subjectId);
  if (!pack) { toast('Subject coming soon! 📚', 2500); return; }

  // Load questions for this subject, then jump straight to practice
  if (typeof QuestionLoader !== 'undefined') {
    await QuestionLoader.loadSubject(pack.id);
  }

  // Which assignment this round IS. Without it, finishing the questions could
  // never mark the assignment done - completed_at was only ever written by the
  // parent's manual "✓ Done" button, so a child who actually did the work left
  // no completion record anywhere.
  _activeAssignmentId = assignmentId || null;
  _practiceMode = { showAnswers: showAnswers !== false, showHints: showHints !== false };
  startChapterDirect(chapterId, difficulty || null);
}

// Set by startAssignmentDirect, consumed once by _finishAssignmentIfAny().
// Module-level rather than threaded through startChapterDirect for the same
// reason _practiceMode is: that function is called from inline onclicks and its
// signature is effectively public API.
let _activeAssignmentId = null;

// Marks the current assignment complete, once, when the child finishes the
// round. Safe to call when no assignment is running.
// Fire-and-forget on purpose: a child must never be blocked from seeing their
// score because a status write did not land, and the calendar has a local
// record of the work either way (daily[date].asg).
function _finishAssignmentIfAny() {
  const id = _activeAssignmentId;
  _activeAssignmentId = null;
  if (!id || typeof Store === 'undefined' || !Store.completeAssignment) return;
  Store.completeAssignment(id)
    .then(() => {
      // Repaint the lists that show assignment status, if the parent or child
      // happens to be looking at one.
      if (typeof ACTIVE_STUDENT_ID !== 'undefined' && ACTIVE_STUDENT_ID) {
        try { _renderStudentAssignments(ACTIVE_STUDENT_ID); } catch (_) {}
      }
    })
    .catch(() => {});
}

// ── EXAM MODE ─────────────────────────────────
document.getElementById('btn-exam-mode').addEventListener('click', () => {
  if (DB.restrictions?.examDisabled) { toast('🔒 Exam mode is locked by your parent.', 2000); return; }
  showScreen('exam-config');
});
document.getElementById('btn-chapter-mode').addEventListener('click', () => { showScreen('chapter-select'); });
document.getElementById('btn-syllabus-mode').addEventListener('click', () => showScreen('syllabus'));
document.getElementById('btn-interactive-map').addEventListener('click', () => {
  showScreen('interactive-map');
});
document.getElementById('btn-weak-areas').addEventListener('click', startWeakAreaDrill);

document.getElementById('start-exam-btn').addEventListener('click', () => {
  const type = document.querySelector('input[name="exam-type"]:checked')?.value || 'full';
  // Belt-and-braces: _applyPlanGates already disables this radio, but a
  // disabled attribute is one devtools edit from gone.
  if (type === 'print') {
    if (!_planAllowsFeature('printable_papers')) { _showFeatureModal('printable_papers'); return; }
    generatePrintablePaper();
    return;
  }
  startExam(type);
});

function startExam(type) {
  // Before assembleExamPaper, not after: building a 40-question paper and then
  // throwing it away is wasted work, and the cap must never fire mid-paper.
  if (_capReached('exams')) { _showCapModal('exams'); return; }

  const paper = assembleExamPaper(type);
  if (!paper.questions.length) {
    toast('🔒 Not enough unlocked chapters/questions to build an exam. Ask your parent to review chapter locks.', 4000);
    return;
  }
  // Bumped once the paper is real and the exam is definitely starting - not at
  // the check above, which would burn the week's allowance on a paper that
  // then failed to assemble.
  _usageBump('exams');

  _blankQuestions.clear();
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

// ── Comprehension passages on a printed paper ──────────────────────────────
// Passage questions carry the WHOLE passage inside every question, because
// practice and exam mode both serve single questions at random and there is no
// shared-stem slot to hang it on. On a printed paper that is wrong twice over:
// a 30-question Section A drawn from a shuffled pool pulls four or five of them,
// so the sheet repeats 1,200 characters of prose several times over, and it
// burns through the passage bank in two or three downloads. Grade 5 English has
// 40 such questions but only SEVEN distinct passages.
//
// So: one passage per paper, printed once, with its own questions under it.
// Every other passage question is kept out of Sections A and B entirely.
const _PASSAGE_MIN_CHARS = 600;

function _splitPassage(q) {
  const html = q?.question || '';
  if (html.length < _PASSAGE_MIN_CHARS) return null;
  // The passage is a styled block; the task follows it. Split on the LAST
  // closing tag of that block so a <div> or <hr> inside the prose is not
  // mistaken for the boundary.
  const cut = Math.max(html.lastIndexOf('</div>') + 6, html.lastIndexOf('<hr>') + 4, html.lastIndexOf('<hr/>') + 5);
  if (cut <= 6) return null;
  const passage = html.slice(0, cut);
  const ask     = html.slice(cut).trim();
  if (!ask || ask.length > passage.length) return null;   // not a passage layout
  return { passage, ask };
}

// Questions sharing a stem are grouped by the stem itself, not by chapter -
// one chapter holds several unrelated texts.
//
// ⚠ SHARED stems only (2+ questions). The same "big block then a question"
// shape also describes a single illustrated maths question, where the <div>
// holds one SVG diagram belonging to that one question. Those are singletons:
// they cannot repeat, so they are not a problem, and treating them as passages
// would have pulled every illustrated question but one OUT of the paper -
// grade 5 maths alone has 21 such stems, 19 of them singletons.
// Genuine shared stems: the English/French comprehension texts, and the
// map-skills SVG that six history questions all read from.
function _groupByPassage(questions) {
  const groups = new Map();
  for (const q of questions) {
    const split = _splitPassage(q);
    if (!split) continue;
    const key = split.passage;
    if (!groups.has(key)) groups.set(key, { passage: split.passage, items: [] });
    groups.get(key).items.push({ q, ask: split.ask });
  }
  return [...groups.values()].filter(g => g.items.length > 1);
}

// ── A CHOICE QUESTION PRINTED WITHOUT ITS OPTIONS ──────────────────────────
// A printed paper that is one A/B/C/D block after another is not the paper a
// PSAC pupil sits, and it is not the practice a written sheet is for: four
// options hand the child the answer's wording, spelling and grammar, and paper
// is the one place that scaffolding can be taken away. So the paper keeps a few
// lettered questions at the top and prints every other choice question as an
// open question - same stem, no options, a line to write on. The answer key is
// unchanged, so the marker still has the model answer.
//
// ⚠ NOT EVERY MCQ SURVIVES THAT, and the ones that do not are the whole
//   difficulty. A stem that points AT its options ("Which of the following…",
//   "Choisis la phrase correcte") asks nothing once they are gone, and a bare
//   statement stem ("British rule began in…") is a sentence, not a question.
//   Those keep their options.
// ⚠ THE RULES BELOW WERE MEASURED, NOT REASONED. Run over the built bundles
//   2026-09-09: 19,579 choice questions across every live pack, of which 20.6%
//   must keep their options - grade5-french 5%, grade4-history 32%, grade9-ict
//   62% (that bank is largely "A computer virus is a program that:"). The
//   spread is why this is a per-question reading and not a per-pack switch.
//   scripts/test-printable-open-ended.js re-measures it and holds the
//   hand-checked verdicts; run it after a content batch lands.
// ⚠ It fails SAFE: anything it cannot read as a self-contained question keeps
//   its options. A question printed with its options is merely less useful; a
//   question printed without the options it needed is unanswerable, and the
//   child finds that out with a pencil in their hand.
const _PRINT_MCQ_KEEP = 5;
// Longer than this and writing the answer out is a handwriting exercise.
const _PRINT_LONG_ANSWER_CHARS = 90;

const _printPlain = s => String(s == null ? '' : s)
  .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ').trim();

// A RUN of underscores or dots is a blank in the sentence itself, so the
// sentence says what the answer must be however the stem is worded. ⚠ A single
// "…" is prose trailing off ("British rule began in…"), which is the opposite
// case - the same distinction _ttsBlanks() has to make.
const _PRINT_GAP = /_{2,}|\.{3,}|…\s*…/;
const _PRINT_QUOTED = /[«"“‘].{2,}[»"”’]/;
const _PRINT_TF = /^(true|false|vrai|faux)$/i;
const _PRINT_META_OPTION = /^(all of the above|none of (the above|these)|both a and b|a and b|toutes ces réponses|aucune( de ces réponses)?|les deux|a et b)\.?$/i;

// The stem points at the options. Nothing rescues these.
const _PRINT_PICKS_AN_OPTION = [
  /\bof the following\b/i,
  /\bfollowing (is|are|words|sentences|options|statements|numbers)\b/i,
  /\bwhich (one|option|of)\b/i,
  /\bodd one out\b/i,
  /\b(choose|select|pick|tick|circle|underline) (the|which|one|a|an)\b/i,
  /\b(is|are) (correct|incorrect|true|false|wrong|right)\b/i,
  /\bbest (describes|explains|answer|completes|fits)\b/i,
  /\ball of (the )?(above|these)\b/i,
  /\bl[ae]quel|lesquel(le)?s/i,
  /\bparmi\b/i,
  /\b(choisis|choisir|choisiss|coche|entour|soulign)/i,
  /\b(suivante?s?|ci-dessous)\b/i,
  /\b(est|sont) (correcte?s?|juste|exacte?s?|vraie?s?|fausse?s?)\b/i,
  // ⚠ "Identifiez la phrase CORRECTE avec les pronoms :" opens with an
  //   instruction verb, so the question-word rule below reads it as open - and
  //   without its four candidate sentences it asks nothing at all.
  /\b(phrase|mot|groupe|réponse|forme|option|proposition)s? (correcte?s?|juste|exacte?s?)\b/i,
];
// Weaker: "Which word is a verb?" needs the options, but "Read: 'The bees
// collect nectar.' Which word is a verb?" does not - the material to answer
// from is quoted in the stem. So these only bite when nothing is quoted.
const _PRINT_PICKS_MAYBE = [
  /\bwhich (word|sentence|phrase|pair|group|set|list|line|version|form|answer|statement|number|verb|noun|adjective|shape|picture)\b/i,
  /\bquell?es?\s+(mot|phrase|groupe|proposition|réponse|forme|verbe|expression|liste|série|image)/i,
];
// A question word or an instruction at the START of a sentence: the stem asks
// for something even though it carries no question mark. ⚠ Anchored on purpose.
// Unanchored, "A post office is a building where people can…" matches "where"
// and a statement stem is printed with nothing to answer.
const _PRINT_ASKS = /(^|[.:;!?»"”]\s+)(how|what|which|who|whom|whose|when|where|why|combien|comment|pourquoi|qui|quand|o[uù]|quel|relie|complèt|complet|écri|ecri|conjugu|remplac|trouv|calcul|corrig|identifi|simplif|arrondi|transform|traduis|observ|imagine|réécri|reecri|mets|range|classe|utilis|join|complete|writ|rewrit|rearrang|arrang|calculate|work out|find|solve|convert|simplify|round|evaluat|express|estimat|reduce|draw|shade|measure|name|give|explain|describe|read|look at|use)/i;

function _printNeedsOptions(q) {
  if (!q || !Array.isArray(q.options) || !q.options.length) return false;
  if (q.type === 'multi') return true;              // "tick all that apply" has no open form
  if (q.type !== 'mcq') return false;
  const opts = q.options.map(_printPlain);
  // Vrai/Faux is ALREADY an open question - two words, printed, cost one line.
  if (opts.length === 2 && opts.every(o => _PRINT_TF.test(o))) return true;
  if (opts.some(o => _PRINT_META_OPTION.test(o))) return true;
  if (_printPlain(q.answer).length > _PRINT_LONG_ANSWER_CHARS) return true;
  const stem = _printPlain(q.question);
  if (_PRINT_GAP.test(stem)) return false;
  if (_PRINT_PICKS_AN_OPTION.some(re => re.test(stem))) return true;
  if (!_PRINT_QUOTED.test(stem) && _PRINT_PICKS_MAYBE.some(re => re.test(stem))) return true;
  return !/\?/.test(stem) && !_PRINT_ASKS.test(stem);
}

// A short answer keeps the short blank the paper has always drawn. A written
// sentence needs the width of the sheet, and two lines once it is long enough
// that one would be cramped.
function _printAnswerSpace(q, marks) {
  const len = _printPlain(q && q.answer).length;
  if (len <= 24 && marks < 4) return `<div class="ans-line"><span class="ans-label">Answer:</span><span class="ans-blank"></span></div>`;
  return `<div class="ans-line ans-wide"><span class="ans-label">Answer:</span><span class="ans-blank"></span></div>`
       + (len > 55 || marks >= 4 ? `<div class="ans-extra"></div>` : '');
}

// Printable papers are often generated several times in one revision week.
// Remembering the last three papers, per child and subject, makes the second
// and third download genuinely useful practice rather than a reshuffle which
// happens to repeat the same memorable graph or diagram. This is local-only:
// no student data or paper content is sent anywhere.
const _PRINT_HISTORY_LIMIT = 3;
function _printHistoryKey() {
  const subject = (typeof ACTIVE_PACK !== 'undefined' && ACTIVE_PACK?.id) || 'unknown-subject';
  return `mm_print_history_${ACTIVE_STUDENT_ID || 'guest'}_${subject}`;
}
function _recentPrintableQuestionIds() {
  try {
    const papers = JSON.parse(localStorage.getItem(_printHistoryKey()) || '[]');
    return new Set(Array.isArray(papers) ? papers.flat().filter(id => typeof id === 'string') : []);
  } catch (_) { return new Set(); }
}
function _rememberPrintablePaper(questions) {
  try {
    const previous = JSON.parse(localStorage.getItem(_printHistoryKey()) || '[]');
    const papers = Array.isArray(previous) ? previous : [];
    papers.unshift(questions.map(q => q?.id).filter(Boolean));
    localStorage.setItem(_printHistoryKey(), JSON.stringify(papers.slice(0, _PRINT_HISTORY_LIMIT)));
  } catch (_) {}
}

function generatePrintablePaper() {
  const year = new Date().getFullYear();
  const isMathsPaper = (typeof ACTIVE_PACK !== 'undefined' && ACTIVE_PACK?.subject === 'Maths');
  // Maths benefits from a longer applied-reasoning section. Other subjects keep
  // their established 30 short + 10 extended format.
  const sectionACount = isMathsPaper ? 20 : 30;
  const sectionBCount = isMathsPaper ? 15 : 10;
  const sectionAMarks = sectionACount * 2;
  const sectionBMarks = sectionBCount * 4;

  // Same restrictions startChapterDirect()/assembleExamPaper() enforce - a
  // locked chapter or a difficulty cap must hold for the printable paper too.
  const lockedChs = new Set(DB.restrictions?.lockedChapters || []);
  const maxDiff   = Math.min(4, Math.max(1, DB.restrictions?.maxDifficulty ?? 4));

  // Build pools: Section A is short/mixed; Section B is extended reasoning.
  // Filter by the active subject's chapters so Science exam doesn't pull maths questions
  const _activeChs = new Set(CHAPTERS.filter(c => !lockedChs.has(c.id)).map(c => c.id));
  // ⚠⚠ isPoolQuestion() IS LOAD-BEARING HERE AND WAS MISSING. Every other pool
  //   in questions_engine.js filters through it; this one filtered on chapter
  //   and difficulty only, so it admitted the types that have no question
  //   field at all. Measured 2026-09-08 on the built banks:
  //       grade9-maths   667 of 1545 admitted items (43%) are raw tasks
  //       grade5/6-french 40 each (cloze / errorhunt)
  //   A raw task has no question text, so _prettyMath(undefined) interpolated
  //   the literal string "undefined", and roughly two in five questions on a printed
  //   Grade 9 Maths paper came out blank. The projected items ARE in
  //   STATIC_QUESTIONS alongside their parent task, so nothing is lost by
  //   excluding the parent - it is the same rule the on-screen exam already
  //   applies (_POOL_TYPES_EXCLUDED).
  const _allSubjectQs = STATIC_QUESTIONS.filter(q =>
    isPoolQuestion(q) && _activeChs.has(q.chapterId) && q.difficulty <= maxDiff);

  // Pick ONE passage for this paper, and take up to 5 questions from it. The
  // rest of the passage questions are removed from the pools below, so no
  // passage prose can reach Section A or B.
  // Which of this subject's questions cannot be printed without their options.
  // ⚠ Computed ONCE over the pool. The rota below consults it inside a loop
  //   bounded by secATarget * 40, and _printNeedsOptions() is ~20 regexes over
  //   a stem - a French pack would have run several million of them per paper.
  const _needsOpts = new Set(_allSubjectQs.filter(_printNeedsOptions).map(q => q.id));
  const _keepsOptions = q => _needsOpts.has(q.id);

  const passageGroups = _groupByPassage(_allSubjectQs);
  // A shared comprehension passage is just as repetitive as a chart. Prefer a
  // passage whose questions were not on one of the recent printed papers.
  const recentPassageIds = _recentPrintableQuestionIds();
  const freshPassageGroups = passageGroups.filter(g => g.items.every(it => !recentPassageIds.has(it.q.id)));
  const chosenGroup   = passageGroups.length ? shuffle(freshPassageGroups.length ? freshPassageGroups : passageGroups)[0] : null;
  const comp          = chosenGroup ? shuffle(chosenGroup.items).slice(0, 5) : [];
  const compIds       = new Set(comp.map(c => c.q.id));
  const passageIds    = new Set();
  for (const g of passageGroups) for (const it of g.items) passageIds.add(it.q.id);

  const _subjectQs = _allSubjectQs.filter(q => !passageIds.has(q.id));
  const recentIds = _recentPrintableQuestionIds();
  // Use unseen questions first; fall back to the whole pool only when a small
  // subject cannot fill a 40-question paper without reuse.
  const preferFresh = pool => {
    const fresh = pool.filter(q => !recentIds.has(q.id));
    return shuffle(fresh.length ? fresh : pool);
  };
  const secAPool = preferFresh(_subjectQs.filter(q => q.difficulty <= Math.min(3, maxDiff)));
  // Section B is L4 word problems - only offer it once the cap actually allows L4.
  // ⚠ Section B is WRITTEN OUT, so a stem that only works with four choices
  //   under it does not belong there. Preference, not a filter: a small pack
  //   that cannot fill the section any other way still gets a paper, and those
  //   questions keep their options rather than being printed unanswerable.
  const preferOpen = pool => {
    const open = pool.filter(q => !_keepsOptions(q));
    return open.length >= sectionBCount ? open : pool;
  };
  const secBPool = maxDiff >= 4 ? preferOpen(preferFresh(_subjectQs.filter(q => q.difficulty === 4))) : [];

  if (!secAPool.length && !comp.length) {
    toast('🔒 Not enough unlocked chapters/questions to build a printable paper. Ask your parent to review chapter locks.', 4000);
    return;
  }

  // The comprehension questions occupy the first slots of Section A rather than
  // adding a section, so the paper stays within its planned marks total.
  const secATarget = Math.max(0, sectionACount - comp.length);

  // Ensure chapter spread for Section A.
  //
  // ⚠ The tail used to be filled straight from one flat pool, which meant the
  //   BIGGEST chapter supplied most of it. grade5-french holds 515 present-tense
  //   questions out of 2,060 - a quarter of the pack, and revision of Grades 3-4
  //   at that - so a quarter of every paper's tail was present tense however
  //   many chapters the first pass had already covered.
  //
  //   The fill is now round-robin over the chapters, so a chapter's SIZE stops
  //   deciding how much of the paper it gets. How much it deserves is
  //   examWeight's job, and a chapter weighted 3 takes a turn three times as
  //   often as one weighted 1.
  const secA = [];
  const usedIds = new Set();
  const chapters = [...new Set(_subjectQs.map(q => q.chapterId))];
  const _chWeight = id => {
    const ch = (typeof CHAPTERS !== 'undefined' ? CHAPTERS : []).find(c => c.id === id);
    const w = ch && Number.isFinite(ch.examWeight) ? ch.examWeight : 1;
    return Math.max(1, w);   // 0 means "not in exams", and such a chapter is not in the pool anyway
  };
  // Chapters take turns; a heavier chapter simply appears more than once in the
  // rota. Shuffled so the same manifest order does not open every paper.
  const rota = shuffle(chapters.flatMap(id => Array(_chWeight(id)).fill(id)));
  let guard = 0;
  while (secA.length < secATarget && guard++ < secATarget * 40) {
    let tookOne = false;
    for (const ch of rota) {
      if (secA.length >= secATarget) break;
      // ⚠ WITHIN the chapter, prefer a question that can be asked without its
      //   options. The rota itself is untouched - which chapter takes this slot
      //   is still examWeight's decision - so this changes WHICH question a
      //   chapter offers, never how much of the paper it gets. Without it a
      //   grade4-history paper printed 15 lettered blocks of 40: a third of that
      //   bank points at its own options, and the rota met them by chance.
      //   Measured after: 6 of 40.
      // ⚠ It is a preference, never a filter. A chapter with nothing else to
      //   give still gives what it has, options and all.
      const free = q => q.chapterId === ch && !usedIds.has(q.id);
      const pick = secAPool.find(q => free(q) && !_keepsOptions(q)) || secAPool.find(free);
      if (pick) { secA.push(pick); usedIds.add(pick.id); tookOne = true; }
    }
    if (!tookOne) break;   // every chapter is exhausted
  }
  // Last resort only: a subject too small to fill the paper by rota.
  for (const q of secAPool) {
    if (secA.length >= secATarget) break;
    if (!usedIds.has(q.id)) { secA.push(q); usedIds.add(q.id); }
  }
  secA.sort((a, b) => a.difficulty - b.difficulty);

  // A full-page SVG/graph at Q1 makes different papers look identical at a
  // glance and can push the first answer line onto the next page. Keep the
  // paper's easiest difficulty first, but choose a non-visual question as Q1
  // whenever that difficulty has one available.
  const hasVisual = q => /<svg\b|<img\b/i.test(q?.question || '');
  const firstDifficulty = secA.length ? secA[0].difficulty : null;
  const firstTextIndex = secA.findIndex(q => q.difficulty === firstDifficulty && !hasVisual(q));
  if (firstTextIndex > 0) {
    const [firstText] = secA.splice(firstTextIndex, 1);
    secA.unshift(firstText);
  }

  // Section B: L4 word problems from varied chapters. Maths has 15 to give
  // children more genuine PSAC-style reading and multi-step practice.
  const secB = [];
  const usedB = new Set();
  for (const ch of shuffle(chapters)) {
    const pick = secBPool.find(q => q.chapterId === ch && !usedB.has(q.id));
    if (pick) { secB.push(pick); usedB.add(pick.id); }
    if (secB.length >= sectionBCount) break;
  }
  // Top up if needed from L3
  if (secB.length < sectionBCount) {
    for (const q of preferOpen(preferFresh(_subjectQs.filter(q => q.difficulty === 3)))) {
      if (secB.length >= sectionBCount) break;
      if (!usedB.has(q.id) && !usedIds.has(q.id)) { secB.push(q); usedB.add(q.id); }
    }
  }

  _rememberPrintablePaper([...comp.map(c => c.q), ...secA, ...secB]);

  // Which questions keep their lettered options. Counted in PAPER order, so
  // "the first few" is the first few a child actually meets, and a question
  // that must keep its options spends one of those slots rather than being
  // added on top - otherwise a history paper, where a third of the bank points
  // at its own options, prints fifteen A/B/C/D blocks and nothing has changed.
  const _secAFinal = secA.slice(0, secATarget);
  const _secBFinal = secB.slice(0, sectionBCount);
  const withOptions = new Set();
  let lettered = 0;
  for (const q of [...comp.map(c => c.q), ..._secAFinal]) {
    if (!Array.isArray(q.options) || !q.options.length) continue;
    if (_keepsOptions(q)) { withOptions.add(q.id); lettered++; continue; }
    if (lettered < _PRINT_MCQ_KEEP) { withOptions.add(q.id); lettered++; }
  }
  for (const q of _secBFinal) if (_keepsOptions(q)) withOptions.add(q.id);

  const diffLabel = d => ['','⭐ Basic','⭐⭐ Medium','⭐⭐⭐ Hard','🏆 Challenge'][d] || '';
  const chName = id => (CHAPTERS.find(c => c.id === id) || {}).name || id;

  // overrideHtml: the question WITHOUT its passage, for the comprehension block
  // where the passage is printed once above the questions instead of inside
  // each one.
  function renderQ(q, num, marks, overrideHtml) {
    let body = `<div class="q-text">${_prettyMath(overrideHtml != null ? overrideHtml : q.question)}`;
    if (q.type === 'symmetry-line') {
      body += _symLineStaticSvg(q, false, 'symline-print');
      body += `<div class="draw-note">Draw directly on the shape using a ruler.</div>`;
    } else if (Array.isArray(q.options) && q.options.length && withOptions.has(q.id)) {
      // ⚠ Lettered from the OPTIONS THAT EXIST, not a hard-coded A-D. A
      //   Vrai/Faux question has two, and this printed two more empty bubbles
      //   labelled C and D under every one of them.
      body += `<div class="mcq-opts">`;
      q.options.forEach((opt, i) => {
        body += `<span class="mcq-opt"><span class="bubble"></span> <b>${'ABCDEFGH'[i] || '?'}.</b> ${_prettyMath(opt)}</span>`;
      });
      body += `</div>`;
    } else {
      body += _printAnswerSpace(q, marks);
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

  // Passage once, then its questions. colspan spans the number and marks
  // columns so the prose gets the full width of the sheet.
  const compRows = comp.length ? `
      <tr class="comp-block"><td colspan="3" style="padding:4px 0 2px">
        <div class="comp-intro">Comprehension - read the passage, then answer questions 1–${comp.length}.</div>
        ${chosenGroup.passage}
      </td></tr>
      ${comp.map((c, i) => renderQ(c.q, i + 1, 2, c.ask)).join('')}` : '';

  const secARows = compRows + secA.slice(0, secATarget)
    .map((q, i) => renderQ(q, comp.length + i + 1, 2)).join('');
  const secBRows = secB.slice(0, sectionBCount).map((q, i) => renderQ(q, i + sectionACount + 1, 4)).join('');

  // Keep the marking material separate from the child paper. The key is a
  // second print window, deliberately opened only by the adult-facing button.
  const answerRows = [
    ...comp.map((c, i) => ({ q:c.q, num:i + 1, marks:2, ask:c.ask })),
    ...secA.slice(0, secATarget).map((q, i) => ({ q, num:comp.length + i + 1, marks:2 })),
    ...secB.slice(0, sectionBCount).map((q, i) => ({ q, num:sectionACount + i + 1, marks:4 })),
  ].map(({ q, num, marks, ask }) => `
    <article class="answer">
      <div class="answer-head"><b>Question ${num}</b> · ${chName(q.chapterId)} · ${marks} marks</div>
      <div class="answer-question">${_prettyMath(ask != null ? ask : q.question)}</div>
      <div><b>Answer:</b> ${q.type === 'symmetry-line'
        ? _symLineStaticSvg(q, true, 'symline-print symline-key')
        : _prettyMath(String(q.answer))}</div>
      <div class="answer-working"><b>Working / explanation:</b> ${_prettyMath(q.explanation || 'No worked explanation is available for this question.')}</div>
    </article>`).join('');
  const answerKeyHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
    <title>Answer Key - Grade ${_activeSubjectLabel().grade} ${_activeSubjectLabel().name} Practice Paper ${year}</title>
    <style>body{font-family:Arial,sans-serif;color:#111;margin:24px;line-height:1.45}.no-print{background:#166534;color:#fff;border:0;border-radius:6px;padding:10px 20px;font-size:12pt;cursor:pointer;margin-bottom:18px}.head{border:2px solid #111;padding:12px 16px;margin-bottom:16px}.head h1{font-size:17pt;margin:0 0 4px}.head p{margin:0;color:#444}.answer{break-inside:avoid;page-break-inside:avoid;border:1px solid #cbd5e1;border-radius:7px;padding:10px 12px;margin:10px 0}.answer-head{color:#1e3a5f;margin-bottom:6px}.answer-question{font-size:10pt;color:#334155;margin-bottom:7px}.answer-working{margin-top:7px;background:#f8fafc;padding:7px;border-radius:4px}.frac{display:inline-flex;flex-direction:column;align-items:center;vertical-align:-.55em;margin:0 .18em;line-height:1.05;font-weight:bold}.frac .fr-n{padding:0 .28em}.frac .fr-d{padding:0 .28em;border-top:1.5px solid currentColor}.symline-print{display:block;width:280px;max-width:100%;margin:8px auto;background:#fff}.symline-paper{fill:#fff;stroke:#cbd5e1}.symline-shape{fill:#f8fafc;stroke:#111;stroke-width:3}.symline-answer{stroke:#15803d;stroke-width:4;stroke-dasharray:9 5}.q-table,.picto-table{border-collapse:collapse;margin:6px 0;font-size:10pt}.q-table th,.picto-table th{background:#f1f5f9;font-weight:700;text-align:left;padding:4px 10px;border:1px solid #94a3b8}.q-table td,.picto-table td{padding:4px 10px;border:1px solid #cbd5e1}@media print{body{margin:10px}.no-print{display:none}}</style>
    </head><body><button class="no-print" onclick="window.print()">🖨️ Print / Save answer key as PDF</button><div class="head"><h1>Answer Key - Practice Paper</h1><p>Grade ${_activeSubjectLabel().grade} · ${_activeSubjectLabel().name} · ${year}</p><p>For parent or teacher use. Keep this separate from the pupil paper.</p><p>Most questions are printed on the paper <b>without</b> multiple-choice options, so the child writes their own answer. Accept any answer that means the same as the one shown here - the wording below is the model answer, not the only one.</p></div>${answerRows}</body></html>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Grade ${_activeSubjectLabel().grade} ${_activeSubjectLabel().name} - Practice Paper ${year}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 10.5pt; color: #111; padding: 20px; background: #fff; }
  .no-print { background:#1d4ed8; color:#fff; border:none; padding:10px 22px; font-size:13pt; border-radius:6px; cursor:pointer; margin:0 10px 18px 0; display:inline-block; }
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
  /* A written sentence needs the width of the sheet, not the 200px stub a
     numeric answer sits on. */
  .ans-wide .ans-blank { max-width: none; }
  .ans-extra { border-bottom: 1px solid #444; height: 18px; margin-top: 11px; }
  .symline-print { display:block; width:280px; max-width:100%; margin:8px auto; background:#fff; }
  .symline-paper { fill:#fff; stroke:#cbd5e1; }
  .symline-shape { fill:#fff; stroke:#111; stroke-width:3; }
  .symline-answer { stroke:#15803d; stroke-width:4; stroke-dasharray:9 5; }
  .draw-note { text-align:center; font-size:8.5pt; color:#555; margin-top:3px; }

  .marks-header { text-align:right; font-size:9pt; color:#555; padding: 3px 4px 3px 0; font-style:italic; }

  /* The paper is a separate document, so _prettyMath()'s markup needs its own
     copy of these rules - style.css is not loaded in the print window. */
  .frac { display:inline-flex; flex-direction:column; align-items:center; vertical-align:-0.55em; margin:0 .18em; line-height:1.05; font-weight:bold; }
  .frac .fr-n { padding:0 .28em; }
  .frac .fr-d { padding:0 .28em; border-top:1.5px solid currentColor; }
  .frac-mixed { font-weight:bold; margin-right:.05em; }
  .frac-mixed + .frac { margin-left:0; }
  .q-box { display:inline-flex; align-items:center; justify-content:center; min-width:1.5em; height:1.5em; padding:0 .15em;
           border:1.2px dashed #444; border-radius:3px; font-weight:bold; font-size:.85em; vertical-align:middle; }
  .frac .q-box { min-width:1.3em; height:1.3em; }

  .comp-intro { font-size:9.5pt; font-weight:bold; color:#1e3a5f; margin-bottom:4px; }
  /* Keep the passage and at least the first question on the same sheet - a
     passage stranded alone at the foot of page 1 is unusable. */
  .comp-block { break-inside: avoid; page-break-inside: avoid; }

  .total-row td { border-top: 2px solid #333; padding: 6px 4px; font-weight:bold; font-size:10.5pt; }
  .footer { margin-top: 20px; border-top: 1px solid #bbb; padding-top: 8px; font-size: 8.5pt; color: #777; text-align:center; }
</style>
</head>
<body>
<div class="paper">
  <button class="no-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
  <button class="no-print" style="background:#166534" onclick="openAnswerKey()">🔐 Open answer key</button>

  <!-- ⚠ The letterhead used to read "Republic of Mauritius - Ministry of
       Education" above "End-of-Year Assessment". Printed out and handed to a
       child, or left on a teacher's desk, that is a generated practice sheet
       presenting itself as a government document - the small-print disclaimer
       at the very bottom does not undo the top of the page. It also is not the
       PSAC format; it is this app's own layout. Both now say so. -->
  <div class="header-box">
    <div class="ministry">PSAC Exam Practice - practice paper</div>
    <div class="title">Exam-Style Practice Paper ${year}</div>
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
    Answer <b>all</b> questions. Where lettered choices are printed, circle or shade the correct letter.
    Every other question is answered in <b>writing</b>, on the line provided - no choices are given.
    In Section B, show all working clearly. Marks may be awarded for correct working.
  </div>

  <!-- SECTION A -->
  <div class="section-head">SECTION A &nbsp;-&nbsp; ${sectionAMarks} Marks &nbsp;(Questions 1–${sectionACount})</div>
  <div class="section-sub">Answer all ${sectionACount} questions. Each question carries <b>2 marks</b>. A few questions print lettered choices - circle the correct letter. For every other question, write your own answer on the line.</div>
  <table>
    <tr><td></td><td></td><td class="marks-header">Marks</td></tr>
    ${secARows}
    <tr class="total-row"><td colspan="2" style="text-align:right;padding-right:8px;">Section A Total</td><td style="text-align:center;">/ ${sectionAMarks}</td></tr>
  </table>

  <!-- SECTION B -->
  <div class="section-head">SECTION B &nbsp;-&nbsp; ${sectionBMarks} Marks &nbsp;(Questions ${sectionACount + 1}–${sectionACount + sectionBCount})</div>
  <div class="section-sub">Answer all ${sectionBCount} questions. Each question carries <b>4 marks</b>. No choices are given - write your own answer and show all working. Read each problem carefully.</div>
  <table>
    <tr><td></td><td></td><td class="marks-header">Marks</td></tr>
    ${secBRows}
    <tr class="total-row"><td colspan="2" style="text-align:right;padding-right:8px;">Section B Total</td><td style="text-align:center;">/ ${sectionBMarks}</td></tr>
  </table>

  <table style="margin-top:14px;">
    <tr class="total-row">
      <td style="text-align:right;padding-right:8px;border-top:2px solid #333;">GRAND TOTAL</td>
      <td style="text-align:center;border-top:2px solid #333;border-left:1px solid #bbb;width:38px;">/ 100</td>
    </tr>
  </table>

  <div class="footer">
    Generated by PSAC Exam Practice · based on the MIE Mauritius curriculum &nbsp;|&nbsp;
    Practice paper in our own layout - NOT the official PSAC paper format, and not
    an MIE or Ministry of Education document.
  </div>
</div>
<script>
const ANSWER_KEY_HTML = ${JSON.stringify(answerKeyHtml).replace(/<\/script/gi, '<\\/script')};
function openAnswerKey() {
  const key = window.open('', '_blank');
  if (!key) { alert('Please allow pop-ups to open the answer key.'); return; }
  key.document.write(ANSWER_KEY_HTML); key.document.close();
}
</script>
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
  document.getElementById('exam-q-text').innerHTML = _prettyMath(q.question);
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
  // ⚠ NOT "Review". A child at the end of an exam wants their score, and
  // "Review" promises exactly that - but the only review worth the name is on
  // the results screen, after submitting. Labelling the last-question button
  // "Review" sent children tapping something that could never do what it said,
  // while the control they actually needed (Submit) was a small pill in the top
  // bar next to Exit. This is the finishing action now, it says so, and it is
  // the biggest thing on the screen at that point.
  const _isLastQ  = S.exam.idx === S.exam.qs.length - 1;
  const _nextBtn  = document.getElementById('exam-next-btn');
  _nextBtn.textContent = _isLastQ ? '✓ Finish exam' : 'Next →';
  _nextBtn.classList.toggle('btn-finish', _isLastQ);
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
// ⚠ On the LAST question the body used to be `if (idx < len-1) { idx++ }`,
// which is false there - so the tap did nothing whatsoever, silently, on the one
// screen where a child is most anxious to move on. It opens the check sheet now,
// which is one tap from submitting and their score.
document.getElementById('exam-next-btn').addEventListener('click', () => {
  saveCurrentExamAnswer();
  if (S.exam.idx < S.exam.qs.length - 1) { S.exam.idx++; renderExamQuestion(); }
  else openExamReview();
});

// ── EXAM REVIEW SHEET ──────────────────────────
// The one thing a child actually needs before submitting: what did I leave
// blank, and what did I flag to come back to. The sidebar Question Navigator
// answers that on a desktop; on a tablet or phone it is a full screen below the
// question, which is why "Review" has to bring it to them.
function openExamReview() {
  const modal = document.getElementById('modal-exam-review');
  if (!modal || !S.exam?.qs?.length) return;
  saveCurrentExamAnswer();

  const total = S.exam.qs.length;
  const isAnswered = i => {
    const a = S.exam.answers[i];
    return a != null && String(a).trim() !== '';
  };
  const blanks  = S.exam.qs.map((_, i) => i).filter(i => !isAnswered(i));
  const flagged = S.exam.qs.map((_, i) => i).filter(i => S.exam.flagged.has(i));

  const sum = document.getElementById('exr-summary');
  if (sum) {
    sum.textContent = blanks.length
      ? `${total - blanks.length} of ${total} answered`
      : `All ${total} questions answered - nice work!`;
  }

  // The warning a child needs BEFORE submitting, in their own terms. Silence
  // here is what made the old flow feel broken: something was wrong with the
  // paper and nothing on screen said so.
  const warn = document.getElementById('exr-warn');
  if (warn) {
    const bits = [];
    if (blanks.length)  bits.push(`${blanks.length} question${blanks.length === 1 ? '' : 's'} still blank`);
    if (flagged.length) bits.push(`${flagged.length} flagged to come back to`);
    warn.textContent = bits.length ? '⚠ ' + bits.join(' · ') : '';
    warn.classList.toggle('hidden', bits.length === 0);
  }

  const grid = document.getElementById('exr-grid');
  if (grid) {
    grid.innerHTML = S.exam.qs.map((_, i) => {
      const cls = S.exam.flagged.has(i) ? 'flagged' : isAnswered(i) ? 'answered' : 'unanswered';
      return `<button class="nav-btn ${cls}" onclick="examGoTo(${i}); closeExamReview()"
                aria-label="Question ${i + 1}, ${cls}">${i + 1}</button>`;
    }).join('');
  }

  const firstBlankBtn = document.getElementById('exr-first-blank-btn');
  if (firstBlankBtn) {
    firstBlankBtn.classList.toggle('hidden', blanks.length === 0);
    firstBlankBtn.dataset.target = blanks.length ? String(blanks[0]) : '';
  }

  modal.classList.remove('hidden');
}
window.openExamReview = openExamReview;

// ── Student Home - mission + badge helpers ────────────────────────────────────
function _renderShMissions() {
  const slot = document.getElementById('sh-missions-slot');
  if (!slot || !ACTIVE_STUDENT_ID) { if (slot) slot.innerHTML = ''; return; }
  const isFirst = !DB?.stats?.totalAttempted;
  const mTitle = isFirst ? 'Your first mission' : 'Quick mission';
  const mSub   = isFirst
    ? 'Try 5 warm-up questions. Hints are always ready.'
    : 'Keep sharp with 5 quick questions.';
  const weakOk = _planAllowsFeature('weak_area_drill');
  // Only offered when there is something to fix. A permanent "0 to fix" card
  // would be a standing reminder of failure on a nine-year-old's home screen.
  const toFix = _practisableMistakes().length;
  slot.innerHTML = `
    <div class="sh-mission-row">
      <button class="sh-mission-card" onclick="startKidMission()">
        <span class="sh-mission-icon">🚀</span>
        <div class="sh-mission-info">
          <span class="sh-mission-title">${mTitle}</span>
          <span class="sh-mission-sub">${mSub}</span>
        </div>
      </button>
      <button class="sh-mission-card" onclick="startWeakAreaDrill()">
        <span class="sh-mission-icon">💪</span>
        <div class="sh-mission-info">
          <span class="sh-mission-title">Weak area drill</span>
          <span class="sh-mission-sub">Targets the chapters you find hardest.</span>
        </div>
        ${!weakOk ? '<span class="sh-mission-lock">🔒</span>' : ''}
      </button>
    </div>
    ${toFix ? `<button class="sh-mission-card sh-mission-fix" onclick="startMistakeDrill()" style="width:100%;margin-top:.55rem">
      <span class="sh-mission-icon">🩹</span>
      <div class="sh-mission-info">
        <span class="sh-mission-title">Fix my mistakes</span>
        <span class="sh-mission-sub">${toFix} question${toFix === 1 ? '' : 's'} you got wrong. Get one right twice and it's gone.</span>
      </div>
      <span class="sh-mission-arrow">›</span>
    </button>` : ''}
    <button class="sh-mission-card sh-mission-schedule" id="sh-schedule-card" onclick="showScreen('schedule')" style="width:100%;margin-top:.55rem">
      <span class="sh-mission-icon">🗓️</span>
      <div class="sh-mission-info">
        <span class="sh-mission-title">Today's Timetable</span>
        <span class="sh-mission-sub" id="sh-schedule-sub">Loading…</span>
      </div>
      <span class="sh-mission-arrow">›</span>
    </button>`;
  if (typeof Calendar !== 'undefined' && Calendar.getBacklog) {
    Calendar.getBacklog(ACTIVE_STUDENT_ID).then(items => {
      const sub = document.getElementById('sh-schedule-sub');
      if (!sub) return;
      const todayItems   = items.filter(e => e.isToday);
      const backlogItems = items.filter(e => e.isPast);
      if (!items.length) { sub.textContent = 'No sessions planned yet'; return; }
      const parts = [];
      if (todayItems.length)   parts.push(`${todayItems.length} today`);
      if (backlogItems.length) parts.push(`${backlogItems.length} overdue`);
      sub.textContent = parts.join(' · ') || 'See your plan';
    }).catch(() => {
      const sub = document.getElementById('sh-schedule-sub');
      if (sub) sub.textContent = 'Tap to see your plan';
    });
  } else {
    const sub = document.getElementById('sh-schedule-sub');
    if (sub) sub.textContent = 'Tap to see your plan';
  }
}

function _renderShBadges() {
  const slot = document.getElementById('sh-badges-slot');
  if (!slot || typeof packBadges !== 'function') { if (slot) slot.innerHTML = ''; return; }
  const earned = packBadges().filter(b => (DB?.badges || []).includes(b.id));
  if (!earned.length) { slot.innerHTML = ''; return; }
  slot.innerHTML = `
    <div class="sh-badges-section">
      <div class="sh-badges-header">🏅 Badges earned</div>
      <div class="sh-badges-strip">
        ${earned.map(b => `
          <div class="sh-badge-item" title="${b.desc}">
            <span class="sh-badge-icon">${b.icon}</span>
            <span class="sh-badge-name">${b.name}</span>
          </div>`).join('')}
      </div>
    </div>`;
}

// ── Student Home Hub ──────────────────────────────────────────────────────────
const StudentHome = (() => {
  function tab(name) {
    const screen = document.getElementById('screen-student-home');
    if (!screen) return;
    screen.querySelectorAll('.ta-tab[data-tab]').forEach(b =>
      b.setAttribute('aria-selected', b.dataset.tab === name ? 'true' : 'false')
    );
    screen.querySelectorAll('.ta-tab-content[data-tab]').forEach(p =>
      p.classList.toggle('hidden', p.dataset.tab !== name)
    );
    if (name === 'missions') _renderShMissions();
    if (name === 'badges')   _renderShBadges();
  }

  function open() {
    const nameEl = document.getElementById('sh-greeting');
    if (nameEl) {
      const kidName = typeof DB !== 'undefined' && DB?.name;
      nameEl.textContent = kidName ? `Hey, ${kidName}! 👋` : 'Hey there! 👋';
    }
    const installBtn = document.getElementById('sh-install-profile');
    if (installBtn) {
      const kidName = typeof Auth !== 'undefined' ? (Auth.getActiveAccount?.()?.name || 'me') : 'me';
      installBtn.textContent = `📲 Install for ${kidName}`;
    }
    tab('board');
    showScreen('student-home');
  }

  function startExam() {
    if (typeof DB !== 'undefined' && DB?.restrictions?.examDisabled) {
      toast('🔒 Exam mode is locked by your parent.', 2000);
      return;
    }
    showScreen('exam-config');
  }

  return { tab, open, startExam };
})();
window.StudentHome = StudentHome;

// ── Practice Hub ─────────────────────────────────────────────────────────────
const PracticeHub = (() => {
  const BOOK_COLORS = {
    'maths':               { from:'rgba(37,99,235,.55)',  to:'rgba(14,40,100,.6)',   border:'rgba(96,165,250,.55)',  glow:'59,130,246' },
    'mathematics':         { from:'rgba(37,99,235,.55)',  to:'rgba(14,40,100,.6)',   border:'rgba(96,165,250,.55)',  glow:'59,130,246' },
    'english':             { from:'rgba(180,110,0,.55)',  to:'rgba(90,50,0,.6)',     border:'rgba(251,191,36,.55)',  glow:'245,158,11' },
    'french':              { from:'rgba(185,28,28,.55)',  to:'rgba(90,10,10,.6)',    border:'rgba(252,165,165,.55)', glow:'239,68,68'  },
    'science':             { from:'rgba(5,140,90,.55)',   to:'rgba(2,60,40,.6)',     border:'rgba(52,211,153,.55)',  glow:'16,185,129' },
    'history':             { from:'rgba(120,50,200,.55)', to:'rgba(55,15,100,.6)',   border:'rgba(196,181,253,.55)', glow:'168,85,247' },
    'history & geography': { from:'rgba(120,50,200,.55)', to:'rgba(55,15,100,.6)',   border:'rgba(196,181,253,.55)', glow:'168,85,247' },
    'geography':           { from:'rgba(120,50,200,.55)', to:'rgba(55,15,100,.6)',   border:'rgba(196,181,253,.55)', glow:'168,85,247' },
  };
  const BOOK_ICONS = {
    'maths':'🔢', 'mathematics':'🔢', 'english':'📖', 'french':'🗣️',
    'science':'🔬', 'history':'🏛️', 'history & geography':'🌍', 'geography':'🗺️',
  };
  const BOOK_TAGLINES = {
    'maths':'Numbers, shapes & problem solving',
    'mathematics':'Numbers, shapes & problem solving',
    'english':'Reading, writing & grammar',
    'french':'Langue et grammaire française',
    'science':'Nature, matter & living things',
    'history':'History & geography of Mauritius',
    'history & geography':'History & geography of Mauritius',
    'geography':'History & geography of Mauritius',
  };
  function _bookStyle(subject) {
    const k = (subject || '').toLowerCase();
    return BOOK_COLORS[k] || { from:'rgba(255,255,255,.15)', to:'rgba(0,0,0,.2)', border:'rgba(255,255,255,.3)', glow:'255,255,255' };
  }
  function _bookIcon(subject) {
    const k = (subject || '').toLowerCase();
    return BOOK_ICONS[k] || '📚';
  }
  function _bookTagline(subject) {
    const k = (subject || '').toLowerCase();
    return BOOK_TAGLINES[k] || '';
  }
  // The child's grade lives on the signed-in account (Auth._activeAccount),
  // never in the progress blob. SELECTED_GRADE is the second-best answer: it
  // follows whatever pack is open, so it is right once a subject is chosen.
  function _practiceHomeGrade() {
    const acct = (typeof Auth !== 'undefined' && Auth.getActiveAccount) ? Auth.getActiveAccount() : null;
    return Number(acct?.grade)
      || Number(typeof SELECTED_GRADE !== 'undefined' ? SELECTED_GRADE : 0)
      || Number((typeof DB !== 'undefined' && DB?.grade) || 0)
      || 5;
  }
  function _renderGradeBar() {
    const sel = document.getElementById('prac-grade-sel');
    const note = document.getElementById('prac-locked-note');
    if (!sel) return;
    // ⚠ THE CHILD'S OWN GRADE, from the account. `DB.grade` was read here and
    //   in _renderBooks below, and it is written NOWHERE - not by the app, not
    //   in Store._defaultStudent(), not in a single stored blob. So it was
    //   always undefined and this always fell through to 5: every child, in
    //   every grade, opened Start Practicing on GRADE 5 and got Grade 5
    //   subjects. Measured on live data - three Grade 6 children carrying
    //   Grade 5 chapters (plants, discovery, eng-verbs, trade-agri). They did
    //   not wander into the wrong grade; the app opened it for them.
    const currentGrade = Number(_practiceHomeGrade());
    // ⚠ The dropdown offers EXACTLY the grades the parent granted, own grade
    //   included - not every live grade with a lock painted on top. It used to
    //   test `gradeRestricted || lockedGrade`, two names that appear NOWHERE
    //   else in the codebase - nothing has ever written either - so it was
    //   permanently unlocked and the parent's setting did nothing on the one
    //   screen that matters. Never fall back to _liveGrades() here: that hands
    //   a child every grade the app ships.
    const grades = (typeof GradeAccess !== 'undefined')
      ? GradeAccess.allowed(currentGrade)
      : [currentGrade];
    const locked = grades.length < 2;
    sel.innerHTML = grades.map(g =>
      `<option value="${g}"${g === currentGrade ? ' selected' : ''}>Grade ${g}</option>`
    ).join('');
    sel.disabled = locked;
    if (note) note.style.display = locked ? '' : 'none';
  }
  function _renderBooks(grade) {
    const grid = document.getElementById('prac-books-grid');
    if (!grid) return;
    const sel = document.getElementById('prac-grade-sel');
    const g = grade !== undefined ? Number(grade) : Number(sel?.value || _practiceHomeGrade());
    const packs = Object.values(SUBJECT_PACKS || {})
      .filter(p => Number(p.grade) === g && !p.comingSoon)
      .sort((a, b) => (a.subject || a.name || '').localeCompare(b.subject || b.name || ''));
    if (!packs.length) {
      grid.innerHTML = '<p style="color:rgba(240,236,220,.7);text-align:center;padding:2rem 0">No subjects available for this grade yet.</p>';
      return;
    }
    grid.innerHTML = packs.map(pack => {
      const subj = pack.subject || pack.name || '';
      const s = _bookStyle(subj);
      const icon = _bookIcon(subj);
      const tagline = _bookTagline(subj);
      const count = pack.questionCount || pack.questions || '';
      const countBadge = count ? `<span class="ph-book-count">${count} questions</span>` : '';
      return `<button class="ph-book" data-pack-id="${_attr(pack.id)}"
        style="--bk-from:${s.from};--bk-to:${s.to};--bk-border:${s.border};--bk-glow:${s.glow}">
        <span class="ph-book-icon">${icon}</span>
        <span class="ph-book-name">${_attr(subj)}</span>
        ${tagline ? `<span class="ph-book-tag">${tagline}</span>` : ''}
        ${countBadge}
      </button>`;
    }).join('');
    grid.querySelectorAll('.ph-book').forEach(btn =>
      btn.addEventListener('click', () => SubjectHub.open(btn.dataset.packId))
    );
  }
  function open() {
    _renderGradeBar();
    _renderBooks();
    showScreen('practice-hub');
  }
  function onGradeChange(grade) {
    _renderBooks(Number(grade));
  }
  return { open, onGradeChange };
})();
window.PracticeHub = PracticeHub;

// ── Subject Hub ───────────────────────────────────────────────────────────────
const SubjectHub = (() => {
  let _packId = null;
  let _shFilter = 'all';

  async function open(packId) {
    if (packId) { _packId = packId; _shFilter = 'all'; }
    const pack = (typeof SUBJECT_PACKS !== 'undefined') && SUBJECT_PACKS?.find(p => p.id === _packId);
    if (!pack) { PracticeHub.open(); return; }
    if (typeof PackLoader !== 'undefined') await PackLoader.ensure(_packId).catch(() => {});
    activateSubjectPack(_packId);
    const crumbSubj = document.getElementById('subj-hub-crumb-subject');
    if (crumbSubj) crumbSubj.textContent = pack.subject || pack.name || '';
    tab('chapters');
    showScreen('subject-hub');
    _renderChapters();
  }

  function back() { open(_packId); }

  function tab(name) {
    const screen = document.getElementById('screen-subject-hub');
    if (!screen) return;
    screen.querySelectorAll('.ta-tab[data-sh-tab]').forEach(b =>
      b.setAttribute('aria-selected', b.dataset.shTab === name ? 'true' : 'false')
    );
    screen.querySelectorAll('.ta-tab-content[data-sh-tab]').forEach(p =>
      p.classList.toggle('hidden', p.dataset.shTab !== name)
    );
    if (name === 'syllabus') _renderSyllabusTab();
    if (name === 'exam') _renderExamTab();
  }

  function _renderChapters() {
    const panel = document.getElementById('sh-chapter-panel');
    if (!panel) return;
    if (!CHAPTERS || !CHAPTERS.length) {
      panel.innerHTML = '<p style="color:rgba(240,236,220,.7);padding:1rem 0">No chapters found for this subject.</p>';
      return;
    }
    const accent = _SUBJECT_BORDER_COLOR[ACTIVE_PACK?.subject] || '';
    const regular = CHAPTERS.filter(ch => !ch.enrichment);
    const enrichment = CHAPTERS.filter(ch => ch.enrichment);
    const all = regular.concat(enrichment);

    const prog = all.map(ch => _chapterProgress(ch.id));
    const done = prog.filter(p => p.attempted > 0);
    const answers = prog.reduce((sum, p) => sum + p.attempted, 0);
    const unique = prog.reduce((sum, p) => sum + p.unique, 0);
    const available = prog.reduce((sum, p) => sum + p.total, 0);
    const lastMs = Math.max(0, ...prog.map(p => p.last || 0));
    const todayKey = _muDayKey();
    const doneToday = prog.filter(p => p.last &&
      new Date(p.last + _MU_OFFSET_MS).toISOString().slice(0, 10) === todayKey).length;
    const summary = `<div class="ch-sum">
      <div class="ch-sum-tile"><span class="ch-sum-num">${done.length}<span class="ch-sum-of">/${all.length}</span></span><span class="ch-sum-lbl">Started</span></div>
      <div class="ch-sum-tile"><span class="ch-sum-num">${answers}</span><span class="ch-sum-lbl">Answers given</span></div>
      <div class="ch-sum-tile"><span class="ch-sum-num${doneToday ? ' good' : ''}">${doneToday}</span><span class="ch-sum-lbl">Practised today</span></div>
      <div class="ch-sum-bar">
        <div class="ch-sum-bar-head"><span>${unique} different bank questions recorded${available ? ` · ${available} questions currently loaded` : ''}</span></div>
        <div class="ch-sum-last">${lastMs ? `Last practised: ${_chapterWhen(lastMs)}` : 'Nothing practised yet - pick any chapter to begin.'}</div>
      </div>
    </div>`;

    const counts = { all: all.length, todo: 0, doing: 0, weak: 0 };
    all.forEach(ch => {
      const p = _chapterProgress(ch.id);
      if (p.attempted === 0) counts.todo++;
      else if (p.state !== 'mastered') counts.doing++;
      if (p.attempted >= 5 && p.acc < 60) counts.weak++;
    });
    const ftab = (id, label) => `<button class="ch-filter${_shFilter === id ? ' on' : ''}"
      onclick="SubjectHub.setFilter('${id}')">${label} <span class="ch-filter-n">${counts[id]}</span></button>`;
    const filters = `<div class="ch-filters">${ftab('all','All')}${ftab('todo','Not started')}${ftab('doing','In progress')}${counts.weak ? ftab('weak','Needs work') : ''}</div>`;

    const keep = ch => {
      const p = _chapterProgress(ch.id);
      if (_shFilter === 'todo')  return p.attempted === 0;
      if (_shFilter === 'doing') return p.attempted > 0 && p.state !== 'mastered';
      if (_shFilter === 'weak')  return p.attempted >= 5 && p.acc < 60;
      return true;
    };
    const shownRegular = regular.filter(keep);
    const shownEnrichment = enrichment.filter(keep);

    let grid = '';
    if (!shownRegular.length && !shownEnrichment.length) {
      grid = `<div class="ch-empty"><div class="text-4xl mb-2">🎉</div>
        <p class="font-semibold">Nothing in this list</p>
        <p class="text-sm" style="opacity:.7;margin-top:.25rem">${
          _shFilter === 'todo' ? 'You have started every chapter here. Nice.'
          : _shFilter === 'weak' ? 'No chapter is giving you trouble right now.'
          : 'Try another filter.'}</p></div>`;
    } else {
      grid = `<div class="ch-grid">${shownRegular.map(ch => _chapterCard(ch, accent)).join('')}</div>`;
      if (shownEnrichment.length) {
        grid += `<div class="ch-section"><span class="ch-section-line"></span><span class="ch-section-label">✨ Bonus topics</span><span class="ch-section-line"></span></div>
          <p class="ch-section-note">Extra themes drawn from the syllabus - great once the main chapters feel easy. Some questions here also appear in the main chapters, gathered together by theme.</p>
          <div class="ch-grid">${shownEnrichment.map(ch => _chapterCard(ch, accent)).join('')}</div>`;
      }
    }
    panel.innerHTML = summary + filters + grid;
  }

  function setFilter(f) {
    _shFilter = f;
    _renderChapters();
  }

  // ⚠ Invalidated by _shSyllabusStale(), called from recordAnswer(). Without
  //   that, this renders once per pack and the chapter percentages a child
  //   has just moved by practising stay at what they were before the round.
  function _renderSyllabusTab() {
    const panel = document.getElementById('sh-syllabus-panel');
    if (!panel || panel.dataset.rendered === _packId) return;
    const orig = document.getElementById('syllabus-list');
    if (orig && typeof renderSyllabus === 'function') {
      panel.innerHTML = '<div></div>';
      const fake = panel.firstElementChild;
      fake.id = 'syllabus-list';
      orig.id = '_syllabus-list-tmp';
      renderSyllabus();
      fake.id = '';
      orig.id = 'syllabus-list';
    } else {
      panel.innerHTML = '<p style="color:rgba(240,236,220,.7)">Syllabus not available.</p>';
    }
    panel.dataset.rendered = _packId || '';
  }

  function _renderExamTab() {
    const panel = document.getElementById('sh-exam-panel');
    if (!panel) return;
    panel.innerHTML = `<div class="sh-exam-opts">
      <button class="sh-exam-card" onclick="SubjectHub._startMockExam()">
        <div class="sh-paper">
          <div class="sh-paper-header"><span class="sh-paper-lines"></span></div>
          <div class="sh-paper-icon">📄</div>
          <div class="sh-paper-corner"></div>
        </div>
        <strong class="sh-exam-label">Mock Exam</strong>
        <span class="sh-exam-meta">40 Qs · 45 min · Timed</span>
        <span class="sh-exam-tag sh-exam-tag-gold">⭐ Full paper</span>
      </button>
      <button class="sh-exam-card" onclick="showScreen('exam-config')">
        <div class="sh-paper sh-paper-blue">
          <div class="sh-paper-header"><span class="sh-paper-lines"></span></div>
          <div class="sh-paper-icon">⚙️</div>
          <div class="sh-paper-corner"></div>
        </div>
        <strong class="sh-exam-label">Custom Exam</strong>
        <span class="sh-exam-meta">Choose type &amp; length</span>
        <span class="sh-exam-tag sh-exam-tag-blue">🎯 Your way</span>
      </button>
      <button class="sh-exam-card sh-exam-card-soon" disabled>
        <div class="sh-paper sh-paper-dim">
          <div class="sh-paper-header"><span class="sh-paper-lines"></span></div>
          <div class="sh-paper-icon">🗂️</div>
          <div class="sh-paper-corner"></div>
        </div>
        <strong class="sh-exam-label">Past Papers</strong>
        <span class="sh-exam-meta">2016 – 2024</span>
        <span class="sh-exam-tag">🔜 Coming Soon</span>
      </button>
    </div>`;
  }

  function _startMockExam() {
    if (typeof DB !== 'undefined' && DB?.restrictions?.examDisabled) {
      toast('🔒 Exam mode is locked by your parent.', 2000);
      return;
    }
    if (typeof startExam === 'function') {
      startExam('mock');
    } else {
      showScreen('exam-config');
    }
  }

  // Answering moves a chapter percentage, and this tab caches per pack.
  function syllabusStale() {
    const panel = document.getElementById('sh-syllabus-panel');
    if (panel) delete panel.dataset.rendered;
  }

  return { open, back, tab, setFilter, syllabusStale, _startMockExam };
})();
window.SubjectHub = SubjectHub;

// Wire Subject Hub tab clicks
document.querySelectorAll('.ta-tab[data-sh-tab]').forEach(btn => {
  btn.addEventListener('click', () => SubjectHub.tab(btn.dataset.shTab));
});

window.closeExamReview = function () {
  document.getElementById('modal-exam-review')?.classList.add('hidden');
};

window.examGoToFirstBlank = function () {
  const t = document.getElementById('exr-first-blank-btn')?.dataset.target;
  if (t === '' || t == null) return;
  closeExamReview();
  examGoTo(Number(t));
};
document.getElementById('exam-flag-btn').addEventListener('click', () => {
  S.exam.flagged.has(S.exam.idx) ? S.exam.flagged.delete(S.exam.idx) : S.exam.flagged.add(S.exam.idx);
  document.getElementById('exam-flag-btn').textContent = S.exam.flagged.has(S.exam.idx) ? '🚩 Flagged' : '🚩 Flag';
  updateNavGrid();
});
document.getElementById('exam-hint-btn').addEventListener('click', () => {
  const q = S.exam.qs[S.exam.idx];
  document.getElementById('exam-hint-text').innerHTML = _prettyMath(q?.hint || 'No hint available.');
  document.getElementById('exam-hint-box').classList.toggle('hidden');
});
document.getElementById('exit-exam-btn').addEventListener('click', () => {
  _confirmModal('Exit this exam? All your answers will be lost.', () => {
    _clearExamResume();
    clearInterval(S.exam.timer);
    S.exam.qs = []; S.exam.answers = {}; S.exam.flagged = new Set();
    showScreen('dashboard');
  }, { icon: '🚪', okLabel: 'Yes, Exit' });
});
document.getElementById('submit-exam-btn').addEventListener('click', () => {
  _confirmModal("Submit your exam now? You can't go back after submission.", submitExam, { icon: '📝', okLabel: 'Submit Exam', danger: false });
});

function submitExam() {
  _clearExamResume();
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
    // Getting it right in an exam retires a recorded mistake too - the child
    // learned it, and where they proved it does not matter.
    if (ok) { correct++; chapterStats[q.chapterId].correct++; _retireMistake(q.id); }
    else if (ans != null) _recordMistake(q, ans, q.chapterId, 'exam');
    recordAnswer(q.chapterId, ok, 'exam', ans != null && ans !== '' ? q.id : undefined);
  });
  const total = S.exam.qs.length;
  const pct = Math.round(correct / total * 100);
  DB.stats.examCount++;
  if (pct > DB.stats.bestScore) DB.stats.bestScore = pct;
  _dayBucket().e++;
  // `date` was toLocaleDateString() ONLY, and _renderExamTimeline read it back
  // with new Date(e.date) - which is Invalid Date for every en-GB browser,
  // because "30/08/2026" is not a format Date can parse. So the parent's exam
  // chips printed "Invalid Date" on exactly the devices this app targets.
  // `iso` is the machine-readable one; `date` stays for rows already written
  // and for anything still reading it.
  DB.examHistory.unshift({ iso: new Date().toISOString(), date: new Date().toLocaleDateString(), pct, correct, total, type: S.exam.type || 'exam', timeTaken });
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

  // Question review. Reset the filter here, not in the toggle: it is
  // module-level state, so without this the next exam's results open already
  // filtered to mistakes from the moment they appear.
  _examReviewWrongOnly = false;
  _renderExamReview();
}

// ── EXAM ANSWER REVIEW ─────────────────────────
// A full mock is 40 questions, so the whole paper is a long read and the point
// of it is the mistakes. `_examReviewWrongOnly` filters to those; the toggle
// says how many there are either way.
let _examReviewWrongOnly = false;

function _renderExamReview() {
  const box = document.getElementById('results-review');
  if (!box || !S.exam?.qs) return;

  const rows = S.exam.qs.map((q, i) => {
    const ua = S.exam.answers[i];
    // S.exam.flagged is a Set, so the old `S.exam.flagged[i]` was always
    // undefined and the 🚩 marker never appeared on a single reviewed question.
    return { q, i, ua, ok: ua != null && checkAnswer(q, ua),
             answered: ua != null && String(ua).trim() !== '',
             flagged: !!(S.exam.flagged && S.exam.flagged.has && S.exam.flagged.has(i)) };
  });
  const wrong = rows.filter(r => !r.ok);

  const toggle = document.getElementById('results-review-toggle');
  if (toggle) {
    toggle.classList.toggle('hidden', wrong.length === 0);
    toggle.textContent = _examReviewWrongOnly
      ? `Showing your ${wrong.length} mistake${wrong.length === 1 ? '' : 's'} - show all ${rows.length}`
      : `Show only what I got wrong (${wrong.length})`;
  }

  const shown = _examReviewWrongOnly ? wrong : rows;
  if (!shown.length) {
    box.innerHTML = `<p class="text-sm text-gray-400 text-center py-6">
      Nothing wrong to review - every question correct. 🎉</p>`;
    return;
  }

  box.innerHTML = shown.map(({ q, i, ua, ok, answered, flagged }) => {
    const ch = CHAPTERS.find(c => c.id === q.chapterId);
    // A symmetry answer is an array of [row,col] pairs. Interpolating it printed
    // "Correct: 1,4,2,6,2,5" - a run of coordinates that means nothing to a
    // child. Say what happened in words instead.
    const isSym = q.type === 'symmetry' || q.type === 'symmetry-line';
    const yours = isSym ? '' : _profEsc(String(ua ?? ''));
    return `<div class="border-l-4 ${ok ? 'border-green-400' : 'border-red-400'} pl-4 py-2">
      <div class="flex items-start gap-2">
        <span class="text-lg shrink-0">${ok ? '✅' : (answered ? '❌' : '⏭️')}</span>
        <div class="flex-1 text-sm min-w-0">
          <div class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
            Q${i + 1} · ${_profEsc(ch?.name || '')}${flagged ? ' · <span class="text-amber-500">🚩 flagged</span>' : ''}
          </div>
          <div class="font-medium text-gray-800 dark:text-gray-200">${_prettyMath(q.question)}</div>
          ${ok ? '' : (isSym
            ? `<div class="mt-1 text-red-600 dark:text-red-400">${answered ? 'Not quite' : 'Not answered'} - the correct ${q.type === 'symmetry-line' ? 'line or lines' : 'cells'} are shown during practice.</div>`
            : `<div class="mt-1 text-red-600 dark:text-red-400">Your answer: ${answered ? yours : '<i>(not answered)</i>'}</div>`)}
          ${isSym ? '' : `<div class="mt-1 text-green-600 dark:text-green-400 font-medium">✓ Correct: ${_prettyMath(_profEsc(String(q.answer ?? '')))}</div>`}
          <div class="mt-1 text-gray-500 dark:text-gray-400 text-xs">${q.explanation || ''}</div>
        </div>
      </div>
    </div>`;
  }).join('');

  // Question text can carry an inline SVG diagram or a photo; without this the
  // review is the one place in the app where they cannot be tapped to enlarge.
  _makeImgsZoomable(box);
}

function _toggleExamReviewWrongOnly() {
  _examReviewWrongOnly = !_examReviewWrongOnly;
  _renderExamReview();
}

document.getElementById('new-exam-btn').addEventListener('click', () => showScreen('exam-config'));
document.getElementById('results-home-btn').addEventListener('click', () => StudentHome.open());

// ── PRACTICE MODE ─────────────────────────────
document.getElementById('practice-back-btn').addEventListener('click', () => {
  // A mistake drill has no chapter to go back to. Branch HERE rather than
  // assigning .onclick at launch: this listener would still fire as well, and
  // the round would navigate twice.
  if (S.practice.chapterId === _FIX_CHAPTER_ID) { _fixBackToHome(); return; }
  _clearPracticeResume(S.practice.chapterId);
  if (typeof SubjectHub !== 'undefined' && ACTIVE_PACK) SubjectHub.back();
  else showScreen('chapter-select');
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
  _ttsStop();
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
    S.practice.answers = {};
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
    _qText.innerHTML = _prettyMath(q.question);
    _qText.classList.add('question-enter');
  } else {
    document.getElementById('practice-q-text').innerHTML = _prettyMath(q.question);
  }
  _makeImgsZoomable(document.getElementById('practice-q-text'));
  _saveResume();

  document.getElementById('practice-hint-box').classList.add('hidden');
  _setPracticeHelpOpen(false);
  _nhPopulate(q);
  S.practice.hintShown = false;
  S.practice.hintIdx   = 0;
  const _hintBtn = document.getElementById('practice-hint-btn');
  if (_hintBtn) {
    _hintBtn.disabled = false;
    _hintBtn.classList.remove('opacity-50');
    // Per-assignment only. NOT restrictions.hintsDisabled - that one governs the
    // first-time onboarding tip callouts, which are a different feature.
    _hintBtn.classList.toggle('hidden', S.practice.showHints === false);
  }
  const _hintBadge = document.getElementById('hint-count-badge');
  if (_hintBadge) _hintBadge.textContent = String(_hintCap());
  document.getElementById('practice-q-counter').textContent =
    `Question ${S.practice.idx + 1} of ${S.practice.qs.length}`;
  const _prevBtn = document.getElementById('practice-prev-btn');
  if (_prevBtn) _prevBtn.disabled = S.practice.idx === 0;

  // Landing on a question already answered this session - via Prev, or a
  // resumed "Continue Later" session - shows it read-only exactly as it
  // looked right after submitting, instead of a blank answer area inviting a
  // second attempt. Everything else (hint state, progress bar, resume save)
  // above still runs the same either way.
  const _saved = S.practice.answers[S.practice.idx];
  if (_saved) {
    _renderPracticeReviewAnswer(q, _saved);
  } else {
    document.getElementById('practice-feedback').classList.add('hidden');
    document.getElementById('practice-submit-btn').classList.remove('hidden');
    document.getElementById('practice-skip-btn').classList.remove('hidden');
    document.getElementById('practice-next-btn').classList.add('hidden');
    // Or last question's "✅ Correct" would sit beside the new question.
    document.getElementById('practice-verdict')?.classList.add('hidden');
    renderAnswerArea(q, 'practice-answer-area', null, false);
  }
  _updateDiffBadge(q);
  updateSessionStats();
}

// Read-only recap for a question S.practice.answers already has a record of -
// same visual language as the live feedback practiceSubmit()/practiceSkip()
// show on first answer, just without the sound/haptics/combo/stat-counting
// that only make sense the first time.
function _renderPracticeReviewAnswer(q, saved) {
  renderAnswerArea(q, 'practice-answer-area', saved.userAnswer, true);
  const fb = document.getElementById('practice-feedback');
  fb.className = `pr-feedback ${saved.correct ? 'feedback-correct' : 'feedback-wrong'}`;
  if (saved.skipped) {
    const skippedAnswer = q.type === 'symmetry-line'
      ? 'You skipped this - the correct line or lines are shown on the diagram.'
      : q.type === 'symmetry'
      ? 'You skipped this - the correct cells are shown on the grid.'
      : `You skipped this - answer: <span class="text-green-600 dark:text-green-400">${_prettyMath(String(q.answer))}</span>`;
    fb.innerHTML = S.practice.showAnswers === false
      ? `<div class="flex items-center gap-3"><span class="text-2xl">⏭️</span><div class="font-bold">You skipped this one.</div></div>`
      : `<div class="flex items-start gap-3"><span class="text-2xl">💡</span><div class="flex-1 min-w-0">
           <div class="font-bold mb-1">${skippedAnswer}</div>
           <div class="text-sm">${_prettyMath(q.explanation || "")}</div>${_learnMoreHTML(q)}</div></div>`;
  } else if (S.practice.showAnswers === false) {
    fb.innerHTML = `<div class="flex items-center gap-3"><span class="text-2xl">${saved.correct ? '🎉' : '❌'}</span>
      <div class="font-bold">${saved.correct ? 'You got this one right!' : 'Not quite, last time.'}</div></div>`;
  } else {
    const answerLine = q.type === 'symmetry'
      ? 'The correct cells are shown in <b style="color:#22c55e">green</b>. Missed cells in orange, wrong selections in red.'
      : q.type === 'symmetry-line'
      ? 'Your correctly placed lines are green. The correct line or lines you missed are shown as orange dashes.'
      : `Your answer wasn't quite right. Correct answer: <b>${_prettyMath(String(q.answer))}</b>`;
    fb.innerHTML = `<div class="flex items-start gap-3"><span class="text-2xl">${saved.correct ? '🎉' : '💡'}</span>
      <div class="flex-1 min-w-0"><div class="font-bold mb-1">${saved.correct ? 'Correct! Well done!' : answerLine}</div>
      <div class="text-sm">${_prettyMath(q.explanation || "")}</div>${_learnMoreHTML(q)}</div></div>`;
  }
  fb.classList.remove('hidden');
  document.getElementById('practice-submit-btn').classList.add('hidden');
  document.getElementById('practice-skip-btn').classList.add('hidden');
  _revealNextButton(saved.correct, saved.skipped ? '👀 Reviewed' : undefined);
}

const _hintWords = s => String(s == null ? '' : s)
  .replace(/<[^>]+>/g, ' ')
  .toLowerCase()
  .replace(/[\u2018\u2019]/g, "'")
  .replace(/[\u201c\u201d]/g, '"')
  // The apostrophe SPLITS words rather than joining them: French elision writes
  // the answer as j'aimerais / l'oiseau / qu'il, and keeping each of those as a
  // single token hid the leak completely - hint 2 could read "J'aimerais visiter
  // Paris" and still be judged clean.
  .replace(/[^a-z0-9\u00e0-\u00ff]+/g, ' ')
  .trim()
  .split(/\s+/)
  .filter(Boolean);

// Does this sentence let a child pick the right option without knowing the
// topic? True when it quotes a run of words that occurs in the answer and in
// NO distractor - recognising it in the list is then the whole task. A run of 3
// is enough on a four-option list; shorter answers are matched whole.
function _sentenceGivesAnswer(sentence, q) {
  const ans = _hintWords(q.answer);
  if (!ans.length) return false;
  const n = Math.min(3, ans.length);
  const hay = ' ' + _hintWords(sentence).join(' ') + ' ';
  const others = (q.options || [])
    .filter(o => o !== q.answer)
    .map(o => ' ' + _hintWords(o).join(' ') + ' ');
  for (let i = 0; i + n <= ans.length; i++) {
    const run = ' ' + ans.slice(i, i + n).join(' ') + ' ';
    if (hay.includes(run) && !others.some(o => o.includes(run))) return true;
  }
  return false;
}

function _explanationSentences(html) {
  if (!html) return [];
  const plain = String(html).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return (plain.match(/[^.!?]+[.!?]*/g) || [])
    .map(t => t.trim())
    .filter(t => t.length > 12);
}

function _buildHints(q) {
  const ch = CHAPTERS.find(c => c.id === q.chapterId);
  const h1 = q.hint || `Think about what you know about ${ch ? ch.name : 'this topic'}.`;
  if (q.type === 'symmetry-line') {
    return [
      h1,
      'Imagine folding the shape. A correct line makes both halves cover each other exactly.',
      'Look for matching corners and equal distances on both sides, then drag a straight line through the centre.',
    ];
  }

  // Hint 2 is not authored - it is lifted from the explanation. On a
  // multiple-choice question the explanation almost always OPENS by quoting the
  // correct option ("<b>He sometimes eats</b>" is correct...), so taking the
  // first sentence handed the answer over on 81% of them, measured. Take the
  // first sentence that does not identify an option instead: still a real step
  // up from the rule in hint 1, but the child still has to choose.
  const sentences = _explanationSentences(q.explanation);
  let h2 = q.type === 'mcq'
    ? sentences.find(t => !_sentenceGivesAnswer(t, q)) || ''
    : sentences[0] || '';
  h2 = h2 || (q.type === 'mcq'
    ? 'Check each option against the rule above - the ones that break it can go.'
    : 'Re-read the question slowly and identify the key numbers.');

  const h3 = q.type === 'mcq'
    ? 'Try eliminating options you know are wrong - that narrows it down quickly.'
    : `The answer is <b>${q.answer}</b> - try to understand why before moving on.`;
  return [h1, h2, h3];
}

document.getElementById('practice-hint-btn').addEventListener('click', () => {
  const q = S.practice.qs[S.practice.idx];
  if (!q) return;
  // _buildHints() always returns 3 steps; a plan may allow fewer. Clamped to
  // that 3 so a plan claiming 99 does not promise hints that do not exist.
  const MAX_HINTS = _hintCap();
  if ((S.practice.hintIdx || 0) >= MAX_HINTS) { _showCapModal('hints'); return; }
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
  if (txtEl)   txtEl.innerHTML    = _prettyMath(hint);
  const left = MAX_HINTS - S.practice.hintIdx;
  if (remEl)   remEl.textContent  = left > 0 ? `${left} more hint${left > 1 ? 's' : ''} available` : 'No more hints';
  if (badgeEl) badgeEl.textContent = left > 0 ? left : '✓';
  box.classList.remove('hidden');

  // Only grey the button out when the child has genuinely seen every hint that
  // exists. When a PLAN is withholding steps, leave it tappable - a disabled
  // button explains nothing, and this is the one moment the upgrade prompt is
  // relevant. It fades either way so the state still reads as "spent".
  if (S.practice.hintIdx >= MAX_HINTS) {
    const btn = document.getElementById('practice-hint-btn');
    if (btn) { btn.disabled = MAX_HINTS >= 3; btn.classList.add('opacity-50'); }
  }
});

document.getElementById('practice-submit-btn').addEventListener('click', practiceSubmit);
document.getElementById('practice-next-btn').addEventListener('click', practiceNext);
document.getElementById('practice-skip-btn').addEventListener('click', practiceSkip);
document.getElementById('practice-prev-btn').addEventListener('click', () => {
  if (S.practice.idx > 0) { S.practice.idx--; loadPracticeQuestion(); }
});

// ── PAUSE / CONTINUE LATER ─────────────────────
// Both modes already auto-save on every question render (_saveResume()) and
// resume fully on return - this just makes that explicit and confirmable
// instead of relying on the student trusting an invisible auto-save. Lands on
// 'dashboard', not 'chapter-select': the resume banner (_renderResumeBanner())
// only exists on the subject dashboard, so that is what "select this subject
// and see the continue option" actually means - chapter-select is one tap
// further in and would not show it at all.
// ⚠ Goes back to the CHAPTER LIST, not the dashboard. Sending a child who
// paused mid-chapter to the top-level home screen threw away the one thing they
// still had - their place in the subject - and made "continue later" feel like
// being ejected from the app. This is the same destination the "← Chapters"
// button uses, minus the _clearPracticeResume() that button calls: the whole
// point here is that the resume slot survives.
function pausePracticeForLater() {
  const backToChapters = () => {
    if (S.practice.chapterId === _FIX_CHAPTER_ID) { _fixBackToHome(); return; }
    if (typeof SubjectHub !== 'undefined' && ACTIVE_PACK) SubjectHub.back();
    else showScreen('chapter-select');
  };
  if (!S.practice.qs.length) { backToChapters(); return; }
  _saveResume();
  toast('Saved - tap this chapter again to pick up where you left off.', 3500);
  backToChapters();
}

function pauseExamForLater() {
  if (!S.exam.qs.length) { showScreen('dashboard'); return; }
  saveCurrentExamAnswer();
  _saveResume();
  // The resume slot now holds everything needed to come back. Leaving the
  // exam live in S would keep the 1s timer ticking on the dashboard and
  // auto-submit an unattended exam when endTime passes, keep _saveResume
  // overwriting later practice with this exam, and re-request the wake lock
  // on every tab focus.
  clearInterval(S.exam.timer);
  _releaseWakeLock(); _unlockOrientation();
  S.exam.qs = []; S.exam.answers = {}; S.exam.flagged = new Set();
  const subj = (typeof ACTIVE_PACK !== 'undefined' && ACTIVE_PACK?.subject) || 'this subject';
  toast(`Saved - pick up where you left off next time you open ${subj}.`, 3500);
  showScreen('dashboard');
}

function practiceSubmit() {
  _ttsStop();
  const q = S.practice.qs[S.practice.idx];
  const ua = getSelectedAnswer('practice-answer-area', q?.type);
  if (q?.type !== 'symmetry' && !ua) { toast('Please answer the question first! 📝'); return; }

  // Daily cap. Checked BEFORE marking, so the child is stopped at the boundary
  // rather than having an answer graded and then discarded. Assignment/test
  // runs are exempt: a parent set that work and the child must be able to
  // finish it - a cap is about free-play practice volume, not homework.
  if (!ASSIGNMENT_IS_TEST && !_assignmentActive && _capReached('questions')) {
    _showCapModal('questions');
    return;
  }

  const ok = checkAnswer(q, ua);

  // This is the event that turns the child's family's referral into credits for
  // whoever invited them - the anti-abuse rule is that a sign-up alone earns
  // nothing, a child actually practising does. Fire-and-forget and idempotent:
  // the RPC takes no arguments, works out who is calling from the session token,
  // and short-circuits after the first success. It must never delay or block the
  // answer the child just gave.
  if (typeof Shop !== 'undefined') Shop.reportPracticeActivity();

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

  // Record it so navigating back to this question (Prev, or a resumed
  // "Continue Later" session) shows the read-only recap instead of a blank
  // answer area - see _renderPracticeReviewAnswer().
  S.practice.answers[S.practice.idx] = { userAnswer: ua, correct: ok, skipped: false };

  // Counts a GRADED answer only. practiceSkip() deliberately does not bump:
  // skipping teaches nothing, and charging a child's daily allowance for it
  // would push them to guess rather than skip.
  if (!_assignmentActive) _usageBump('questions');

  // A short, varied reaction makes success feel noticed without treating every
  // question like a full-screen reward. Wrong answers get a calm, encouraging
  // companion rather than a sad/punishing animation.
  let reaction;
  if (ok) {
    _comboStreak++;
    // Nothing floats on a repeat: a "+0", or a "+3" the server then refuses,
    // teaches the child the number is decorative.
    const _pts = _awardablePoints(q);
    if (_pts) { _floatXP(_pts); S.practice.session.points = (S.practice.session.points || 0) + _pts; }
    _playSound('correct'); _haptic('correct');
    _showCombo(_comboStreak);
    reaction = _practiceReaction(true, _comboStreak);
    if (reaction.confetti) launchConfetti(reaction.confetti);
  } else {
    _comboStreak = 0;
    _playSound('wrong'); _haptic('wrong');
    reaction = _practiceReaction(false, 0);
  }

  // show correct/wrong state
  renderAnswerArea(q, 'practice-answer-area', ua, true);

  // Feedback
  const fb = document.getElementById('practice-feedback');
  fb.className = `pr-feedback ${ok ? 'feedback-correct' : 'feedback-wrong'}`;
  if (S.practice.showAnswers === false) {
    fb.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-3xl feedback-buddy" aria-hidden="true">${reaction.icon}</span>
        <div class="font-bold">${reaction.text}</div>
      </div>`;
  } else {
    const answerLine = q.type === 'symmetry'
      ? 'The correct cells are shown in <b style="color:#22c55e">green</b>. Missed cells in orange, wrong selections in red.'
      : q.type === 'symmetry-line'
      ? 'Your correctly placed lines are green. The correct line or lines you missed are shown as orange dashes.'
      : `Not quite. Correct answer: <b>${_prettyMath(String(q.answer))}</b>`;
    fb.innerHTML = `
      <div class="flex items-start gap-3">
        <span class="text-3xl feedback-buddy" aria-hidden="true">${reaction.icon}</span>
        <div class="flex-1 min-w-0">
          <div class="font-bold mb-1">${reaction.text}</div>
          ${ok ? '' : `<div class="font-semibold mb-1">${answerLine}</div>`}
          <div class="text-sm">${_prettyMath(q.explanation || "")}</div>
          ${_learnMoreHTML(q)}
        </div>
      </div>`;
  }
  // Entrance animation - remove old class first, force reflow, re-add
  fb.classList.remove('hidden', 'feedback-pop', 'feedback-shake', 'feedback-encourage');
  void fb.offsetWidth;
  fb.classList.add(ok ? 'feedback-pop' : 'feedback-encourage');

  // Stats
  _logPracticeAnswer(q, ua, ok, false);
  S.practice.session.attempted++;
  if (ok) S.practice.session.correct++;
  recordAnswer(q.chapterId || S.practice.chapterId, ok, undefined, q.id);
  updateSessionStats();

  document.getElementById('practice-submit-btn').classList.add('hidden');
  document.getElementById('practice-skip-btn').classList.add('hidden');
  _revealNextButton(ok);
}

// Check Answer and Next used to occupy the SAME spot, so the instant feedback
// rendered, the button under the child's thumb changed meaning and a second tap
// skipped the explanation. The action bar now has three fixed lanes and Next
// lives in its own - a repeat tap lands on nothing.
//
// The short disable is belt to that braces (a fast double-tap while the browser
// is still painting), not the fix itself, so it is brief enough not to feel
// sluggish. `verdict` states the result in the bar next to the button, where
// the eye already is.
function _revealNextButton(wasCorrect, verdict) {
  const next = document.getElementById('practice-next-btn');
  const vEl  = document.getElementById('practice-verdict');
  if (vEl) {
    vEl.textContent = verdict || (wasCorrect ? '✅ Correct' : '❌ Not quite');
    vEl.classList.remove('hidden', 'is-right', 'is-wrong');
    vEl.classList.add(wasCorrect ? 'is-right' : 'is-wrong');
  }
  if (!next) return;
  next.classList.remove('hidden');
  next.disabled = true;
  setTimeout(() => { next.disabled = false; }, 250);
  _scrollPracticeFeedbackIntoView();
}

// 'nearest' only brings the feedback inside the VIEWPORT - the fixed action
// bar then covered it (bottom 727px vs bar top 679px at 360×740), so the
// explanation, the one thing a wrong answer is for, was hidden until the child
// scrolled. Measure against the bar and move exactly as far as needed.
function _scrollPracticeFeedbackIntoView() {
  const fb = document.getElementById('practice-feedback');
  if (!fb || fb.classList.contains('hidden')) return;
  const bar = document.querySelector('#screen-practice .pr-actions');
  const limit = bar ? bar.getBoundingClientRect().top - 12 : window.innerHeight;
  const r = fb.getBoundingClientRect();
  if (r.bottom <= limit) return;
  const hdr = document.querySelector('header');
  const minTop = (hdr ? hdr.getBoundingClientRect().bottom : 0) + 12;
  const by = Math.min(r.bottom - limit, Math.max(0, r.top - minTop));
  if (by > 0) window.scrollBy({ top: by, behavior: 'smooth' });
}

function practiceSkip() {
  _ttsStop();
  const q = S.practice.qs[S.practice.idx];
  if (!q) return;
  // See practiceSubmit() for why - same read-only-recap-on-Prev mechanism.
  S.practice.answers[S.practice.idx] = { userAnswer: '', correct: false, skipped: true };
  _comboStreak = 0;
  _playSound('wrong'); _haptic('wrong');
  renderAnswerArea(q, 'practice-answer-area', '', true);
  const fb = document.getElementById('practice-feedback');
  fb.className = 'pr-feedback feedback-wrong';
  if (S.practice.showAnswers === false) {
    fb.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-2xl">⏭️</span>
        <div class="font-bold">Skipped - keep going!</div>
      </div>`;
  } else {
    const skippedAnswer = q.type === 'symmetry-line'
      ? 'The correct line or lines are shown on the diagram.'
      : q.type === 'symmetry'
      ? 'The correct cells are shown on the grid.'
      : `Answer: <span class="text-green-600 dark:text-green-400">${_prettyMath(String(q.answer))}</span>`;
    fb.innerHTML = `
      <div class="flex items-start gap-3">
        <span class="text-2xl">💡</span>
        <div class="flex-1 min-w-0">
          <div class="font-bold mb-1">${skippedAnswer}</div>
          <div class="text-sm">${_prettyMath(q.explanation || "")}</div>
          ${_learnMoreHTML(q)}
        </div>
      </div>`;
  }
  fb.classList.remove('hidden', 'feedback-pop', 'feedback-shake');
  void fb.offsetWidth;
  fb.classList.add('feedback-shake');
  _logPracticeAnswer(q, '', false, true);
  S.practice.session.attempted++;
  recordAnswer(q.chapterId || S.practice.chapterId, false);
  updateSessionStats();
  document.getElementById("practice-submit-btn").classList.add("hidden");
  document.getElementById("practice-skip-btn").classList.add("hidden");
  _revealNextButton(false, '💡 Answer shown');
}

// Per-question record for the end-of-round review.
//
// The log is created lazily rather than in an initialiser: every place that
// starts a fresh round REPLACES S.practice.session with a new object, so the
// log clears itself automatically and there is no reset site to forget.
function _logPracticeAnswer(q, userAnswer, correct, skipped) {
  if (!q) return;
  const log = (S.practice.session.log = S.practice.session.log || []);
  log.push({
    question:      q.question,
    // A symmetry grid has no typeable answer - the result is shown on the grid
    // itself, so the review says so in words rather than printing coordinates.
    userAnswer:    (q.type === 'symmetry' || q.type === 'symmetry-line') ? '' : String(userAnswer ?? ''),
    correctAnswer: (q.type === 'symmetry' || q.type === 'symmetry-line') ? '' : String(q.answer ?? ''),
    explanation:   q.explanation || '',
    type:          q.type,
    correct:       !!correct,
    skipped:       !!skipped,
  });
  // Skips are not mistakes. A child who skipped ran out of ideas or ran out of
  // patience; putting those in the parent's "what she's getting wrong" list
  // would drown the answers she actually got wrong, which are the teachable ones.
  if (!correct && !skipped) {
    // q.chapterId first, matching recordAnswer() below: a mixed round runs
    // under a synthetic S.practice.chapterId, and filing the mistake under
    // that would name a chapter the child has never heard of - and make it
    // unresolvable when the drill tries to serve it back.
    _recordMistake(q, userAnswer, q.chapterId || S.practice.chapterId, 'practice');
  } else if (correct && !skipped && _retireMistake(q.id)) {
    S.practice.session.fixed = (S.practice.session.fixed || 0) + 1;
  }
}

function _learnMoreHTML(q) {
  if (!q || !q.learnMore) return '';
  return `<div class="mt-3 pt-3 border-t border-white/10">
    <button class="flex items-center gap-1.5 text-xs text-indigo-300/70 hover:text-indigo-100 transition-colors" onclick="toggleLearnMore(this)">
      <span>📚</span><span class="underline underline-offset-2">Learn More</span><span class="learn-more-arrow text-[10px]">▼</span>
    </button>
    <div class="learn-more-panel hidden mt-2 text-xs text-indigo-100/80 leading-relaxed space-y-1.5">${q.learnMore}</div>
  </div>`;
}
function toggleLearnMore(btn) {
  const panel = btn.nextElementSibling;
  const arrow = btn.querySelector('.learn-more-arrow');
  const open = panel.classList.toggle('hidden') === false;
  if (arrow) arrow.textContent = open ? '▲' : '▼';
}

function _showRoundComplete() {
  // A PARENT assignment finishes here, not in showAssignmentComplete() - that
  // one belongs to the guest/teacher ASSIGNMENT_MODE flow. This is the only
  // point at which "the child actually did the assignment" becomes known.
  _finishAssignmentIfAny();
  const { attempted, correct } = S.practice.session;
  const acc = attempted ? Math.round(correct / attempted * 100) : 0;
  const stars = acc >= 80 ? '⭐⭐⭐' : acc >= 50 ? '⭐⭐' : '⭐';
  const chName = S.practice.chapterId === _FIX_CHAPTER_ID
    ? 'Fix My Mistakes'
    : (CHAPTERS.find(c => c.id === S.practice.chapterId)?.name || 'Practice');
  // Accumulated per answer in practiceSubmit(), NOT correct x a flat rate:
  // repeats earn nothing and an L4 is worth four times an L1, so a count of
  // correct answers is no longer a points total.
  const xpEarned = S.practice.session.points || 0;
  // A drill's real score is not the percentage - it is how many questions
  // left the list for good. Reported wherever the round happened, because a
  // mistake can be retired in ordinary practice too.
  const fixed = S.practice.session.fixed || 0;
  const el = id => document.getElementById(id);
  if (el('rc-stars'))    el('rc-stars').textContent    = stars;
  if (el('rc-chapter'))  el('rc-chapter').textContent  = chName;
  if (el('rc-score'))    el('rc-score').textContent    = `${correct}/${attempted}`;
  if (el('rc-accuracy')) el('rc-accuracy').textContent = `${acc}%`;
  if (el('rc-xp'))       el('rc-xp').textContent       = `+${xpEarned}`;
  const fixEl = el('rc-fixed');
  if (fixEl) {
    fixEl.textContent = fixed ? `\u{1FA79} ${fixed} mistake${fixed === 1 ? '' : 's'} fixed for good` : '';
    fixEl.classList.toggle('hidden', !fixed);
  }
  // Both buttons are relabelled on EVERY round, which is what keeps a drill's
  // wording from surviving into the next chapter round.
  const isFix = S.practice.chapterId === _FIX_CHAPTER_ID;

  // What this set actually did to the chapter, in the chapter's own terms.
  // \u26a0 Never "mastered", and never a completion percentage read off one set:
  // the sentence is explored-of-available plus how many still need practice.
  // A 20-question set is a practice set, and the copy has to say so.
  const covEl = el('rc-coverage');
  if (covEl) {
    let covTxt = '';
    if (!isFix && typeof PracticeJourney !== 'undefined' && typeof PracticeSelector !== 'undefined') {
      try {
        const qs = PracticeJourney.eligible(S.practice.chapterId);
        const cov = PracticeSelector.coverage(qs, QuestionProgress.forChapter(S.practice.chapterId));
        if (cov.known) {
          covTxt = cov.allExplored
            ? `You have explored all ${cov.total} questions in this chapter \u2014 revision still helps.`
            : `${cov.explored} of ${cov.total} chapter questions explored`;
          if (cov.needs) covTxt += ` \u00b7 ${cov.needs} still need practice`;
        }
      } catch (e) {}
    }
    covEl.textContent = covTxt;
    covEl.classList.toggle('hidden', !covTxt);
  }

  const nextBtn = el('rc-next-btn'), rcBackBtn = el('rc-back-btn');
  // Context-aware, and never more than the two on screen: unseen questions
  // first while any remain, then mistakes, then revision.
  let nextLabel = 'Practice Again \u2192';
  if (isFix) nextLabel = 'Fix more \u2192';
  else if (typeof PracticeJourney !== 'undefined' && typeof PracticeSelector !== 'undefined') {
    try {
      const qs = PracticeJourney.eligible(S.practice.chapterId);
      const bkt = PracticeSelector.bucket(qs, QuestionProgress.forChapter(S.practice.chapterId));
      if (bkt.unseen.length)     nextLabel = 'Continue with new questions \u2192';
      else if (bkt.needs.length) nextLabel = 'Fix my mistakes \u2192';
      else                       nextLabel = 'Revise this chapter \u2192';
    } catch (e) {}
  }
  if (nextBtn)   nextBtn.textContent   = nextLabel;
  if (rcBackBtn) rcBackBtn.textContent = isFix ? '\u2190 Back to Home' : '\u2190 Take a break';
  _renderRoundReview();
  document.getElementById('modal-round-complete')?.classList.remove('hidden');
  _haptic('levelup');
}

// ── End-of-round answer review ─────────────────────────────────────────────
// Shows every question of the round with what the child answered, whether it
// was right, and the correct answer. Collapsed behind a button so the score
// lands first; a 20-question round would otherwise open as a wall of text.
function _renderRoundReview() {
  const box = document.getElementById('rc-review');
  const btn = document.getElementById('rc-review-toggle');
  if (!box || !btn) return;

  const log = S.practice.session.log || [];
  // Reset to collapsed on every round, or the second round opens expanded
  // showing the first round's state.
  box.classList.add('hidden');

  if (!log.length) { btn.classList.add('hidden'); box.innerHTML = ''; return; }
  btn.classList.remove('hidden');
  btn.textContent = `Review my answers (${log.length})`;

  // The parent can turn answers off for an assignment. That setting has to hold
  // here too - otherwise the review hands over every answer they chose to hide.
  const showAnswers = S.practice.showAnswers !== false;

  box.innerHTML = log.map((r, i) => {
    const mark = r.correct ? '✅' : (r.skipped ? '⏭️' : '❌');
    const tone = r.correct
      ? 'border-green-200 dark:border-green-800/50 bg-green-50 dark:bg-green-900/15'
      : 'border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/15';

    let detail = '';
    if (r.correct) {
      detail = `<div class="text-green-700 dark:text-green-400">Your answer: <b>${_prettyMath(_profEsc(r.userAnswer))}</b></div>`;
    } else if (!showAnswers) {
      detail = `<div class="text-gray-500 dark:text-gray-400">${r.skipped ? 'Skipped.' : 'Not correct.'}</div>`;
    } else if (r.type === 'symmetry' || r.type === 'symmetry-line') {
      detail = `<div class="text-gray-600 dark:text-gray-400">${r.skipped ? 'Skipped' : 'Not quite'} - the correct ${r.type === 'symmetry-line' ? 'line or lines were' : 'cells were'} shown on the diagram.</div>`;
    } else {
      detail = `
        ${r.skipped
          ? '<div class="text-gray-500 dark:text-gray-400">Skipped</div>'
          : `<div class="text-red-700 dark:text-red-400">You said: <b>${_prettyMath(_profEsc(r.userAnswer)) || '-'}</b></div>`}
        <div class="text-green-700 dark:text-green-400">Correct answer: <b>${_prettyMath(_profEsc(r.correctAnswer))}</b></div>`;
    }

    return `<div class="rounded-xl border ${tone} px-3 py-2">
      <div class="flex gap-2">
        <span class="shrink-0 select-none">${mark}</span>
        <div class="flex-1 min-w-0">
          <div class="text-xs font-semibold text-gray-800 dark:text-gray-100 mb-1">${i + 1}. ${_prettyMath(r.question)}</div>
          <div class="text-xs space-y-0.5">${detail}</div>
          ${(!r.correct && showAnswers && r.explanation)
            ? `<div class="text-xs text-gray-600 dark:text-gray-400 mt-1.5 pt-1.5 border-t border-black/5 dark:border-white/10">${_prettyMath(r.explanation || "")}</div>`
            : ''}
        </div>
      </div>
    </div>`;
  }).join('');

  _makeImgsZoomable(box);
}

function _toggleRoundReview() {
  const box = document.getElementById('rc-review');
  const btn = document.getElementById('rc-review-toggle');
  if (!box || !btn) return;
  const open = !box.classList.toggle('hidden');
  const n = (S.practice.session.log || []).length;
  btn.textContent = open ? 'Hide review' : `Review my answers (${n})`;
}

function _roundCompleteNext() {
  document.getElementById('modal-round-complete')?.classList.add('hidden');
  // The assignment, if this was one, is over - the next round is ordinary
  // practice and must count against the daily cap like any other.
  _setAssignmentContext(false);
  S.practice.session = { attempted: 0, correct: 0, points: 0 };
  // A drill is rebuilt from DB.mistakes, never re-dealt from a chapter:
  // getMixedQuestions('fix-mistakes') matches nothing, so "Practice Again"
  // would have handed the child an empty round. Rebuilding also drops
  // whatever the round just retired, so the second pass is genuinely shorter.
  if (S.practice.chapterId === _FIX_CHAPTER_ID) { startMistakeDrill(); return; }
  if (S.practice.difficulty !== null) {
    S.practice.qs = getQuestionsForChapter(S.practice.chapterId, S.practice.difficulty, 20);
  } else if (S.practice.chapterId) {
    const _maxD = DB.restrictions?.maxDifficulty ?? 4;
    S.practice.qs = getMixedQuestions(S.practice.chapterId, _maxD, 20);
  }
  S.practice.idx = 0;
  S.practice.answers = {};
  loadPracticeQuestion();
}

function _roundCompleteBack() {
  document.getElementById('modal-round-complete')?.classList.add('hidden');
  _setAssignmentContext(false);
  // The round just finished (this modal only shows once all 20 are answered),
  // so there is nothing left to offer "Continue where you left off" for -
  // without this a completed round left a stale resume record pointing at its
  // own last, fully-answered question.
  if (S.practice.chapterId === _FIX_CHAPTER_ID) { _fixBackToHome(); return; }
  _clearPracticeResume(S.practice.chapterId);
  if (typeof SubjectHub !== 'undefined' && ACTIVE_PACK) SubjectHub.back();
  else showScreen('chapter-select');
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
  S.practice.answers    = {};
  S.practice.hintShown  = false;
  S.practice.session    = { attempted: 0, correct: 0 };
  // Same reasoning as startChapterDirect(): _saveResume() must never write a
  // resume record for this - cfg.chapters?.[0] is very often a REAL chapter
  // id, so pausing this would collide with that chapter's own genuine
  // practice-resume slot.
  // Via the helper so the "⏸️ Continue Later" button is hidden here too - this
  // path set the flag directly and left the button visible on an assignment
  // that _saveResume() deliberately refuses to save, so pausing it lost the run.
  _setAssignmentContext(true);

  showScreen('practice');
  document.getElementById('practice-ch-name').textContent = `📋 ${cfg.label || 'Assignment'}`;
  document.getElementById('practice-back-btn').classList.add('hidden');
  document.getElementById('practice-pause-btn')?.classList.add('hidden');
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
  // The other flow's completion point. ASSIGNMENT_CONFIG.id is the teacher /
  // guest assignment; _finishAssignmentIfAny covers the parent one if a run
  // somehow reached here instead.
  if (ASSIGNMENT_CONFIG && ASSIGNMENT_CONFIG.id && typeof Store !== 'undefined' && Store.completeAssignment) {
    Store.completeAssignment(ASSIGNMENT_CONFIG.id).catch(() => {});
  }
  _finishAssignmentIfAny();
  const { attempted, correct } = ASSIGNMENT_SCORE;
  const pct   = attempted ? Math.round(correct / attempted * 100) : 0;
  const grade = pct >= 80 ? '🌟 Excellent!' : pct >= 60 ? '👍 Good job!' : pct >= 40 ? '📚 Keep practising!' : '💪 You can do it!';
  const el    = id => document.getElementById(id);

  // Notify parent by email (fire-and-forget, only on Netlify)
  if (location.protocol !== 'file:' && ASSIGNMENT_CONFIG) {
    const sess = typeof Store !== 'undefined' && Store.getStudentSession();
    // The token, not the id: the endpoint now resolves the student from the
    // session and ignores any id in the body, so sending one would be theatre.
    if (sess?.token) {
      fetch('/.netlify/functions/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Student-Token': sess.token },
        body: JSON.stringify({
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
  _assignmentActive  = false;

  // Restore practice screen
  document.getElementById('practice-back-btn')?.classList.remove('hidden');
  document.getElementById('practice-pause-btn')?.classList.remove('hidden');
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


function renderAnalytics() {
  // ⚠ `DB` is `{}` until a student loads (declared that way at the top of this
  // file), so every DB.stats read below throws on a bare boot. The three routes
  // in - the header level chip, the Progress tab, the dashboard tile - are all
  // hidden until then, so no tap reaches this today. But showScreen() is a
  // global, and the screen white-screens if a future caller gets here first.
  // Measured: renderAnalytics() on a cold boot threw
  // "Cannot read properties of undefined (reading 'totalAttempted')".
  if (typeof DB === 'undefined' || !DB.stats) return;
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
        // ⚠ "0/0 • 0%" for a chapter nobody has opened. The packs branch below
        // already says "not started"; this fallback never got the same rule.
        const col = !c.attempted ? '#94a3b8' : p >= 80 ? '#22c55e' : p >= 50 ? '#f59e0b' : '#ef4444';
        const label = c.attempted ? c.correct + '/' + c.attempted + ' &bull; ' + p + '%' : 'not started';
        return `<div class="flex items-center gap-2 py-1.5">
          <span class="text-sm text-gray-700 dark:text-gray-300 flex-1 truncate">${ch.icon} ${ch.name}</span>
          <span class="text-xs font-bold shrink-0" style="color:${col}">${label}</span>
          <div class="w-20 shrink-0"><div class="mastery-bar-bg"><div class="mastery-bar-fill" style="width:${c.attempted ? p : 0}%;background:${col}"></div></div></div>
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
            ? '<span class="text-xs text-gray-500 dark:text-gray-400 shrink-0">not started</span>'
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
              ? '<span class="text-xs text-gray-500 dark:text-gray-400">not started yet</span>'
              : `<span class="text-xs font-bold" style="color:${sCol}">${sCorrect}/${sAttempted} &bull; ${sPct}%</span>`}
            <span class="chev text-gray-500 dark:text-gray-400 text-xs transition-transform" style="${sAttempted ? 'transform:rotate(180deg)' : ''}">▼</span>
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
    hist.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400">No exams yet. Take your first exam!</p>';
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
  _setStreakDisplay(0);
  updateXPBar();
  toast('🗑 Progress reset.');
  renderAnalytics();
});

// ── SYLLABUS BROWSER ──────────────────────────
// A chapter's `syllabus` is authored as one paragraph whose sentences ARE its
// sub-topics, so listing them turns a wall of prose into something that reads
// like a syllabus. Split on sentence enders only - these strings contain no
// decimals, and their number ranges use dashes (1834–1924, Class 1–4).
//
// ⚠ Deliberately `.match()` and NOT a lookbehind split. A lookbehind regex is a
//   PARSE error on Safari before 16.4, which would take the whole of app.js down
//   with it, not just this screen.
function _syllabusPoints(text) {
  const parts = String(text || '').match(/[^.!?]+[.!?]*/g) || [];
  return parts.map(s => s.trim()).filter(s => s.length > 1);
}

// English and French packs (notesBased: true) carry a `notes` array of revision
// points per chapter instead of a `syllabus` paragraph. Calendar.showNotes() has
// always rendered them; the syllabus screen never looked, which is why all 55
// English/French chapters had an empty syllabus while the content sat right
// there in the manifest. Same markdown subset as Calendar.showNotes.
function _notesToHtml(note) {
  return String(note || '')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

// ── PAST PAPERS ────────────────────────────────
// Read-only. Every item here is a written or drawn response with a mark
// allocation and NO answer field, so nothing on this screen can be marked and
// the screen must never imply otherwise - no "check", no score, no streak.
let _ppQuestions = null;
let _ppYear = null;

async function renderPastPapers() {
  const list = document.getElementById('pp-list');
  const filters = document.getElementById('pp-filters');
  if (!list) return;

  if (!_ppQuestions) {
    list.innerHTML = '<div class="flex justify-center py-12"><div class="w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div></div>';
    _ppQuestions = (typeof QuestionLoader !== 'undefined')
      ? await QuestionLoader.loadPastPapers(SELECTED_GRADE) : [];
  }

  if (!_ppQuestions.length) {
    if (filters) filters.innerHTML = '';
    list.innerHTML = `<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-10">
      No past papers available for Grade ${SELECTED_GRADE || '?'} yet.</p>`;
    return;
  }

  const years = [...new Set(_ppQuestions.filter(q => !q.needsArtwork).map(q => q.year))].sort((a, b) => b - a);
  if (_ppYear === null || !years.includes(_ppYear)) _ppYear = years[0];

  if (filters) {
    filters.innerHTML = years.map(y => `
      <button onclick="_ppSetYear(${y})" class="text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
        y === _ppYear
          ? 'bg-indigo-500 text-white'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
      }">${y}</button>`).join('');
  }

  // needsArtwork means the question refers to a diagram, map or picture that was
  // never captured - "Study Map 2 … name the feature shown by diagonal shading"
  // with no Map 2. Unanswerable and confusing, so it is not shown at all until
  // the artwork is drawn. Counted in the footer so it is hidden, not lost.
  const usable = _ppQuestions.filter(q => !q.needsArtwork);
  const hidden = _ppQuestions.length - usable.length;

  const shown = usable.filter(q => q.year === _ppYear);
  const bySubject = {};
  for (const q of shown) (bySubject[q.subject] || (bySubject[q.subject] = [])).push(q);

  const chapterName = id => {
    const packs = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : []);
    const ch = packs.flatMap(p => p._chapters || p.chapters || []).find(c => c.id === id);
    return ch ? `${ch.icon || ''} ${ch.name}`.trim() : '';
  };

  list.innerHTML = Object.keys(bySubject).sort().map(subject => {
    const qs = bySubject[subject];
    const marks = qs.reduce((t, q) => t + (Number(q.marks) || 0), 0);
    return `<div class="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
      <div class="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-700">
        <span class="font-bold text-gray-800 dark:text-white text-sm">${_profEsc(subject)}</span>
        <span class="text-xs text-gray-500 dark:text-gray-400">${qs.length} question${qs.length === 1 ? '' : 's'} · ${marks} marks</span>
      </div>
      <ol class="px-5 py-2 space-y-3 list-none">
        ${qs.map((q, i) => {
          const ch = chapterName(q.chapterId);
          return `<li class="py-2 border-b border-gray-50 dark:border-gray-700/50 last:border-0">
            <div class="flex gap-3">
              <span class="text-xs font-bold text-indigo-400 shrink-0 mt-0.5">${i + 1}.</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">${q.question}</p>
                ${q.image ? `<img src="${_profEsc(q.image)}" alt="${_profEsc(q.imageAlt || 'The diagram printed with this question in the exam paper')}"
                  loading="lazy" style="display:block;margin:8px auto;max-width:min(100%,420px);height:auto;border-radius:6px;background:#fff">` : ''}
                <div class="flex items-center gap-2 flex-wrap mt-1.5">
                  ${q.marks ? `<span class="text-[11px] font-bold text-gray-500 dark:text-gray-400">[${q.marks} mark${q.marks === 1 ? '' : 's'}]</span>` : ''}
                  ${ch ? `<span class="text-[11px] text-gray-500 dark:text-gray-400">${_profEsc(ch)}</span>` : ''}
                  ${q.markScheme ? `<button onclick="_ppToggleScheme('${q.id}',this)"
                    class="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">Show mark scheme</button>` : ''}
                </div>
                ${q.markScheme ? `<div id="ms-${q.id}" class="hidden mt-2 text-xs text-gray-600 dark:text-gray-300 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 rounded-xl px-3 py-2 leading-relaxed">${q.markScheme}</div>` : ''}
              </div>
            </div>
          </li>`;
        }).join('')}
      </ol>
    </div>`;
  }).join('');

  if (hidden) {
    list.innerHTML += `<p class="text-xs text-gray-500 dark:text-gray-400 text-center pt-2">
      ${hidden} more question${hidden === 1 ? '' : 's'} from these papers need a diagram or map that is not
      available yet, so they are not shown.</p>`;
  }

  _makeImgsZoomable(list);
}

function _ppSetYear(y) { _ppYear = y; renderPastPapers(); }

// Self-marking: the child writes on paper, then reveals the mark scheme and
// checks their own work. Nothing is scored or stored - these questions cannot
// be marked by the app, and the screen must not pretend they can.
function _ppToggleScheme(id, btn) {
  const box = document.getElementById('ms-' + id);
  if (!box) return;
  const open = box.classList.toggle('hidden');
  if (btn) btn.textContent = open ? 'Show mark scheme' : 'Hide mark scheme';
}

function renderSyllabus() {
  const list = document.getElementById('syllabus-list');
  if (!list) return;

  list.innerHTML = CHAPTERS.map(ch => {
    const syl = packSyllabus()[ch.id] || null;
    const subsections = syl ? syl.subsections : [];
    // ⚠ Not started is not 0%. getChapterPct() is accuracy and answers 0 for a
    // chapter with no attempts, so an untouched chapter used to look exactly
    // like one the child had failed - on the screen a parent opens to see what
    // is left to do. Same rule and same words as the chapter cards.
    const chProg = _chapterProgress(ch.id);
    const chPct = chProg.acc;
    const chColor = !chProg.attempted ? '#94a3b8'
      : chPct >= 80 ? '#22c55e' : chPct >= 50 ? '#f59e0b' : '#3b82f6';
    // ⚠ "correct", never "mastery" - it is accuracy over the answers given,
    // and a bare "50%" beside a question count reads as "50% of them done".
    const chLabel = chProg.attempted ? chPct + '% correct' : 'Not started';

    const subsHTML = subsections.map(sub => {
      const qCount = STATIC_QUESTIONS.filter(q =>
        q.chapterId === ch.id && q.subsection === sub.id
      ).length;
      const hasQs = qCount >= 1;
      const statusDot = hasQs
        ? `<span class="text-xs text-green-600 dark:text-green-400 font-medium">${qCount} question${qCount === 1 ? '' : 's'}</span>`
        : `<span class="text-xs text-gray-500 dark:text-gray-400">practice available</span>`;

      return `<div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
        <div class="flex items-center gap-2 flex-1 min-w-0">
          <span class="text-gray-500 dark:text-gray-400">▸</span>
          <span class="text-sm text-gray-700 dark:text-gray-300 truncate">${sub.name}</span>
          <span class="shrink-0">${statusDot}</span>
        </div>
        <button class="shrink-0 ml-3 text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors font-medium"
          onclick="startSubsectionPractice('${ch.id}','${sub.id}','${sub.name.replace(/'/g, "\\'")}')">
          Practise →
        </button>
      </div>`;
    }).join('');

    // Only grade5-maths defines a real `subsections` array. The rest of the app
    // stores a chapter's content in one of three other shapes, and this screen
    // read NONE of them - which is how English and French ended up with an
    // entirely blank syllabus and every bonus chapter said "No subsections
    // defined yet.":
    //   ch.syllabus       - prose paragraph  (History, Science, G6 Maths)
    //   ch.notes          - revision points  (English, French: notesBased packs)
    //   ch.enrichmentNote - bonus chapters   (History, Science)
    const chQs = STATIC_QUESTIONS.filter(q => q.chapterId === ch.id).length;
    const points = (ch.notes || []).length
      ? ch.notes.map(_notesToHtml)
      : _syllabusPoints(ch.syllabus || ch.enrichmentNote);

    const pointsHTML = points.length ? `<ul class="py-2 space-y-1.5">${points.map(p => `
      <li class="flex gap-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        <span class="text-indigo-400 dark:text-indigo-500 shrink-0">•</span><span>${p}</span>
      </li>`).join('')}</ul>` : '';

    const enrNote = ch.enrichment
      ? `<p class="text-xs text-amber-600 dark:text-amber-400 pt-2 pb-1">✨ Bonus topic - drawn from the syllabus, not a separate MIE chapter. Some questions here also appear in the main chapters, gathered together by theme.</p>`
      : '';

    // ⚠ enrNote is prepended, NOT or-ed. It used to sit inside the middle arm
    // of `subsHTML || ((enrNote + pointsHTML) || fallback)`, so any chapter
    // with subsections dropped it - which is every enrichment chapter there is,
    // leaving the note dead for the only chapters it describes.
    const bodyHTML = enrNote + (subsHTML || pointsHTML || `
      <p class="text-sm text-gray-500 dark:text-gray-400 py-3">${chQs
        ? `${chQs} practice question${chQs === 1 ? '' : 's'} in this chapter.`
        : 'Questions for this chapter are still being written.'}</p>`);

    return `<div class="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
      <div class="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-700 cursor-pointer" onclick="this.nextElementSibling.classList.toggle('hidden')">
        <div class="flex items-center gap-3">
          <span class="text-2xl">${ch.icon}</span>
          <div>
            <span class="font-bold text-gray-800 dark:text-white">${ch.name}</span>
            ${ch.enrichment ? '<span class="ml-2 text-[10px] font-bold uppercase tracking-wide bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded-full align-middle">✨ Bonus</span>' : ''}
            ${ch.part != null ? `<span class="ml-2 text-xs text-gray-500 dark:text-gray-400">Part ${ch.part}</span>` : ''}
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">${chQs} question${chQs === 1 ? '' : 's'} in this chapter</div>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm font-bold whitespace-nowrap" style="color:${chColor}">${chLabel}</span>
          <button class="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
            onclick="event.stopPropagation();startChapterDirect('${ch.id}')">All levels →</button>
          <span class="text-gray-500 dark:text-gray-400 text-sm">▾</span>
        </div>
      </div>
      <div class="px-5 py-1">${bodyHTML}</div>
    </div>`;
  }).join('');
}

// Maps are a stand-alone exploration activity, rather than a large card above
// a course outline. Keeping the mount point on its own screen gives the map
// enough room for its labels, filters and fact panel on phones as well.
function renderInteractiveMap() {
  const panel = document.getElementById('interactive-map-page');
  if (!panel) return;
  if (typeof GeoMap !== 'undefined') GeoMap.render(panel);
}

window.startSubsectionPractice = function(chapterId, subsectionId, subsectionName) {
  // Ordinary practice, whatever ran before it - see _setAssignmentContext.
  _setAssignmentContext(false);
  S.practice.chapterId = chapterId;
  S.practice.difficulty = null; // subsection mode - no level filter
  S.practice.qs = getQuestionsForSubsection(chapterId, subsectionId, 20);
  S.practice.idx = 0;
  S.practice.answers = {};
  S.practice.session = { attempted: 0, correct: 0, points: 0 };
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
// ── FIX MY MISTAKES ───────────────────────────
// Every wrong answer has been recorded since this app shipped, and then only
// ever LISTED. This serves those exact questions back.
//
// It is deliberately NOT the weak-area drill. That one works at chapter
// granularity - the 3 weakest chapters, 15 RANDOM questions from them - so a
// child who has missed one particular question five times may well never see it
// again. This is the opposite: the same question, until they can do it.
//
// Order is newest-first, never shuffled: the freshest mistake is the one still
// worth teaching, and a stable order means a child who repeats the drill is
// working the same short list down rather than sampling a bag.
function _fixBackToHome() {
  if (typeof StudentHome !== 'undefined') StudentHome.open();
  else showScreen('dashboard');
}

// One place sets this label, and startChapterDirect resets it on every ordinary
// round - a render-time reset, not a cleanup call anyone can forget.
function _setPracticeBackLabel(text, aria) {
  const btn = document.getElementById('practice-back-btn');
  if (!btn) return;
  btn.textContent = text;
  btn.setAttribute('aria-label', aria);
}

async function startMistakeDrill() {
  const rows = _practisableMistakes();
  if (!rows.length) {
    toast((DB.mistakes || []).length
      ? 'Your older mistakes were saved before this could re-ask them. New ones can be practised. ✏️'
      : 'Nothing to fix - you have no mistakes saved. 🎉', 4000);
    return;
  }
  // A child's mistakes can span several subjects, and STATIC_QUESTIONS only
  // holds the packs loaded THIS session, so ids from a subject they have not
  // opened today would silently resolve to nothing.
  const packs = [...new Set(rows.map(m => m.pk).filter(Boolean))];
  const missing = packs.filter(p => !rows.some(m => m.pk === p && STATIC_QUESTIONS.some(q => q && q.id === m.id)));
  if (missing.length && typeof QuestionLoader !== 'undefined') {
    toast('⏳ Fetching your mistakes…', 1500);
    // One failed subject must not lose the whole round: whatever loads is
    // served, and anything still unresolved is simply left out below.
    await Promise.all(missing.map(p => QuestionLoader.loadSubject(p).catch(() => {})));
  }

  const locked  = DB.restrictions?.lockedChapters || [];
  const maxDiff = DB.restrictions?.maxDifficulty ?? 4;
  const byId = new Map();
  STATIC_QUESTIONS.forEach(q => { if (q && q.id && !byId.has(q.id)) byId.set(q.id, q); });

  const qs = [];
  let blocked = 0, unresolved = 0;
  for (const m of rows) {
    if (qs.length >= _FIX_ROUND_MAX) break;
    const q = byId.get(m.id);
    if (!q) { unresolved++; continue; }
    // The same gates ordinary practice applies. A chapter the child could
    // answer last week may have been locked by their parent since.
    if (locked.includes(q.chapterId) || !_planAllowsChapter(q.chapterId)) { blocked++; continue; }
    if ((q.difficulty || 1) > maxDiff) { blocked++; continue; }
    qs.push(q);
  }

  if (!qs.length) {
    toast(blocked
      ? '🔒 Your saved mistakes are in chapters that are locked right now.'
      : 'Those questions could not be loaded. Check your connection and try again.', 4000);
    if (unresolved && !blocked) console.warn('[fix-mistakes]', unresolved, 'saved mistakes could not be resolved to a question');
    return;
  }

  _setAssignmentContext(false);
  S.practice.coachMission = null;
  S.practice.chapterId    = _FIX_CHAPTER_ID;
  S.practice.difficulty   = null;
  S.practice.qs           = qs;
  S.practice.idx          = 0;
  S.practice.answers      = {};
  S.practice.hintShown    = false;
  S.practice.session      = { attempted: 0, correct: 0, fixed: 0 };
  S.practice.showAnswers  = true;
  S.practice.showHints    = true;
  showScreen('practice');
  const nameEl = document.getElementById('practice-ch-name');
  if (nameEl) nameEl.textContent = '🩹 Fix My Mistakes';
  _setPracticeBackLabel('← Home', 'Back to home');
  document.getElementById('practice-back-btn')?.classList.remove('hidden');
  _updateDiffBadge(qs[0]);
  loadPracticeQuestion();
}

function startWeakAreaDrill() {
  // Checked HERE as well as in startExam(): the pooled path below builds and
  // runs a full timed exam without ever calling startExam, so without this a
  // child at their weekly cap could take unlimited exams via "💪 Weak Areas".
  if (!_planAllowsFeature('weak_area_drill')) { _showFeatureModal('weak_area_drill'); return; }
  if (_capReached('exams')) { _showCapModal('exams'); return; }

  // A chapter is weak only once there is enough evidence to call it weak.
  // getChapterPct() returns 0 for a chapter with NO attempts, so the old
  // `pct < 60` filter swept up every chapter the child had never opened and
  // announced them as weaknesses - a child three chapters into a fresh pack
  // got "Targeting: <three chapters they have never seen>", and it spent one
  // of their capped exams doing it. Same rule the parent-facing "Needs
  // Attention" card already applies (_renderWeakChapters): no attempts means
  // NOT STARTED, never 0%.
  const _WEAK_MIN_ATTEMPTS = 4;
  const answered = CHAPTERS
    .map(ch => ({ id: ch.id, att: (DB.chapters && DB.chapters[ch.id] && DB.chapters[ch.id].attempted) || 0 }))
    .filter(c => c.att >= _WEAK_MIN_ATTEMPTS);

  const weakChapters = answered
    .map(c => ({ id: c.id, pct: getChapterPct(c.id) }))
    .filter(c => c.pct < 60)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 3); // target 3 weakest

  if (!weakChapters.length) {
    // Two different situations, and telling a beginner "no weak areas found"
    // is both untrue and hides why the drill targeted nothing.
    toast(answered.length
      ? 'Great job - no weak areas right now. Starting a mixed drill.'
      : 'Practise a few chapters first, then this drill can target your weak spots. Starting a mixed drill.',
      3000);
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

  _usageBump('exams');
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
      <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">⭐ Lv.${d.level||1} ${lname}</div>
      <div class="text-xs text-gray-500 dark:text-gray-400">${d.xp||0} XP</div>
    </button>`;
  }).join('');
}

// ── GRADE SELECTOR ────────────────────────────
// ══════════════════════════════════════════════
//  PSAC YEARS vs NCE YEARS
//
//  Grades 1-6 are Mauritian primary and end in the PSAC. Grades 7-9 are
//  lower secondary and end in the NCE - a different exam, a different
//  syllabus, and (once the packs are filled in) a different subject list.
//  Listing all nine as one flat run of cards invites a parent to read
//  "Grade 8" as more of the same PSAC preparation, which it is not.
//
//  ⚠ ONE definition, used by the grade picker, the grade dropdowns and the
//  admin Content tab. If Mauritius ever moves the boundary, it moves here.
// ══════════════════════════════════════════════
const _PSAC_MAX_GRADE = 6;
const _GRADE_STAGES = [
  { id: 'primary',   from: 1, to: _PSAC_MAX_GRADE, name: 'Primary',         exam: 'PSAC',
    note: 'Grades 1-6 · ends with the PSAC' },
  { id: 'secondary', from: _PSAC_MAX_GRADE + 1, to: 99, name: 'Lower secondary', exam: 'NCE',
    note: 'Grades 7-9 · ends with the NCE' },
];
function _gradeStage(grade) {
  return _GRADE_STAGES.find(s => grade >= s.from && grade <= s.to) || _GRADE_STAGES[0];
}
window._gradeStage  = _gradeStage;
window._GRADE_STAGES = _GRADE_STAGES;

function renderGradeSelect() {
  const container = document.getElementById('grade-cards');
  if (!container) return;
  const packs = typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [];

  // Unique grades, sorted
  const grades = [...new Set(packs.map(p => p.grade))].sort((a, b) => a - b);

  // A heading is emitted before the first grade of each stage. It spans the
  // whole grid (sm:col-span-2) so it reads as a divider and not as a card.
  // Only rendered when BOTH stages are present - with 4-6 alone a lone
  // "Primary" header would be labelling the only thing on screen.
  const stagesPresent = new Set(grades.map(g => _gradeStage(g).id));
  const showHeads = stagesPresent.size > 1;
  let lastStage = null;
  let lastHeadShown = false;

  container.innerHTML = grades.map(grade => {
    const stage = _gradeStage(grade);
    let head = '';
    if (showHeads && stage.id !== lastStage) {
      lastStage = stage.id;
      // ⚠ grid-column via an INLINE STYLE, not Tailwind's sm:col-span-2.
      // The Play CDN generates rules from the classes it finds in the document,
      // and this markup is injected by innerHTML long after its initial scan -
      // the class landed in the attribute and no rule was ever produced for it.
      // Measured: the heading rendered 328px wide inside a 672px two-column
      // grid at 768px and up, i.e. sitting in one column with a grade card
      // beside it. Only visible if you measure the WIDTH; asserting that the
      // class is present passes either way.
      head = '<div style="grid-column:1/-1" class="flex items-center gap-3 ' + (lastHeadShown ? 'mt-4' : '') + '">'
           +   '<span class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 whitespace-nowrap">'
           +     _attr(stage.name) + ' · ' + _attr(stage.exam)
           +   '</span>'
           +   '<span class="text-xs text-gray-400 dark:text-gray-500 truncate">' + _attr(stage.note) + '</span>'
           +   '<span class="flex-1 h-px bg-gray-200 dark:bg-gray-700"></span>'
           + '</div>';
      lastHeadShown = true;
    }
    return head + _gradeCard(grade, packs);
  }).join('');
}

function _gradeCard(grade, packs) {
  return (grade => {
    const gradePacks = packs.filter(p => p.grade === grade);
    const hasActive  = gradePacks.some(p => !p.comingSoon);
    const soon       = !hasActive;
    const subjects   = gradePacks.map(p => p.subject).join(' · ');
    const count      = gradePacks.length;
    const click      = soon
      ? `toast('Grade ${grade} is coming soon! 🚀', 2000)`
      : `selectGrade(${grade})`;

          const free = (typeof isFreeGrade === 'function') && isFreeGrade(grade);
      return `
      <button type="button" class="track-card ${soon ? 'opacity-70 cursor-default' : 'cursor-pointer group'} relative text-left"
        onclick="${click}" ${soon ? 'disabled' : ''}>
        <div class="absolute top-3 right-3 flex flex-col items-end gap-1">
          ${soon ? '<span class="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 px-2 py-0.5 rounded-full font-semibold">Coming Soon</span>' : ''}
          ${free ? '<span class="text-xs bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 px-2 py-0.5 rounded-full font-bold">Always free</span>' : ''}
        </div>
        <div class="text-4xl mb-3 select-none">${soon ? '🔜' : '🎓'}</div>
        <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-1 ${soon ? '' : 'group-hover:text-blue-600 dark:group-hover:text-blue-400'} transition-colors">
          Grade ${grade}
        </h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-3">
          ${soon ? 'Coming soon - check back later!' : `${count} subject${count !== 1 ? 's' : ''} available`}
        </p>
        ${!soon ? `<div class="flex flex-wrap gap-2"><span class="chip blue">${subjects}</span></div>` : ''}
      </button>`;
  })(grade);
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

function _kidHomeHero() {
  const greetEl = document.getElementById('kidhome-greeting');
  const subEl   = document.getElementById('kidhome-sub');
  const avEl    = document.getElementById('kidhome-avatar');
  const statsEl = document.getElementById('kidhome-stats');
  if (!greetEl) return; // parent/teacher context or screen not in this build

  const acct = typeof Auth !== 'undefined' && Auth.getActiveAccount ? Auth.getActiveAccount() : null;
  const name = acct?.name || 'there';
  const [greet, emoji] = typeof _greeting === 'function' ? _greeting() : ['Hey', '👋'];
  greetEl.textContent = `${greet}, ${name}! ${emoji}`;

  const attempted = (typeof DB !== 'undefined' && DB.stats?.totalAttempted) || 0;
  subEl.textContent = attempted > 0 ? 'What do you want to learn today?' : "Let's get started - pick a subject below!";
  if (avEl) avEl.textContent = acct?.avatar || DB?.avatar || '🧒';

  if (statsEl) {
    const streak = (typeof DB !== 'undefined' && DB.stats?.streak) || 0;
    const level  = (typeof DB !== 'undefined' && DB.level) || 1;
    const xp     = (typeof DB !== 'undefined' && DB.xp) || 0;
    statsEl.innerHTML = `
      <span class="bg-white/20 px-3 py-1 rounded-full">🔥 ${streak} day streak</span>
      <span class="bg-white/20 px-3 py-1 rounded-full">⭐ Level ${level}</span>
      <span class="bg-white/20 px-3 py-1 rounded-full">✨ ${xp} XP</span>`;
  }
}

function renderSubjectSelect() {
  if (typeof MiniGames !== 'undefined') MiniGames.syncTile();
  if (typeof LearningCoach !== 'undefined') LearningCoach.renderChild();
  const container = document.getElementById('subject-cards');
  if (!container) return;

  _kidHomeHero();
  _renderResumeBanner();

  // Filter to selected grade; fall back to all if none chosen
  const all   = typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [];
  const packs = SELECTED_GRADE ? all.filter(p => p.grade === SELECTED_GRADE) : all;

  // Update heading
  const heading = document.getElementById('subject-select-heading');
  if (heading) heading.textContent = SELECTED_GRADE ? `Grade ${SELECTED_GRADE} - pick a subject` : 'Pick a subject';

  container.innerHTML = packs.map(pack => {
    const soon  = !!pack.comingSoon;
    const theme = _SUBJECT_THEME[pack.subject] || _DEFAULT_THEME;
    const onclk = soon ? `toast('Coming soon!', 2000)` : `selectSubject('${pack.id}')`;
    const chapCount = pack.chapters?.length || 0;
    // Per-subject progress pill - the tile doubles as a tiny progress report,
    // not just a launcher, so a kid can see at a glance which subjects they've
    // already been practising without opening each one.
    const chIds = (pack._chapters || pack.chapters || []).map(c => c.id);
    let progressPill = '';
    if (!soon && chIds.length && typeof DB !== 'undefined' && DB.chapters) {
      const attempted = chIds.reduce((n, id) => n + (DB.chapters[id]?.attempted || 0), 0);
      if (attempted > 0) progressPill = `<span class="text-xs font-bold px-2 py-1 rounded-full bg-white/90 text-gray-700 shadow-sm">✅ ${attempted} done</span>`;
    }
    // Only shown when SELECTED_GRADE is unset (the fallback "every grade" view) -
    // in the normal single-grade view the heading already says the grade, and
    // repeating it on every card would be noise. Without this, three
    // identical-looking "Mathematics" cards (Grade 4/5/6) are impossible to
    // tell apart - see the comment above _shouldExitToParentDashboard().
    const gradeBadge = SELECTED_GRADE ? '' : `<div class="absolute top-4 left-4 text-xs bg-gray-800/80 text-white px-2 py-0.5 rounded-full font-semibold">Grade ${pack.grade}</div>`;
    return `
      <button type="button" class="${soon ? 'opacity-70 cursor-default' : 'kid-subject-card cursor-pointer group'} relative text-left bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl active:scale-95 transition-all overflow-hidden" onclick="${onclk}" ${soon ? 'disabled' : ''}>
        <div class="h-2 bg-gradient-to-r ${theme.bg}"></div>
        <div class="p-5">
          ${gradeBadge}
          ${soon ? '<div class="absolute top-4 right-4 text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 px-2 py-0.5 rounded-full font-semibold">Coming Soon</div>' : ''}
          ${progressPill ? `<div class="absolute top-4 right-4">${progressPill}</div>` : ''}
          <div class="w-14 h-14 rounded-2xl ${theme.icon} flex items-center justify-center text-3xl mb-3 select-none kid-subject-icon">${pack.icon}</div>
          <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-1 transition-colors">${pack.subject}</h3>
          <p class="text-gray-500 dark:text-gray-400 text-sm mb-3">${pack.curriculum || ''}</p>
          <span class="text-xs font-semibold px-2.5 py-1 rounded-full ${soon ? 'bg-gray-100 text-gray-500' : theme.chip}">${soon ? 'Coming Soon' : `${chapCount} chapters`}</span>
        </div>
      </button>`;
  }).join('');
}

// ── "Surprise Me!" - a random unlocked chapter from any of the student's
// subjects. Reuses the exact same gating startChapterDirect already enforces
// (_adminBlocksChapter + the parent's own lockedChapters), so it can never
// hand out a chapter the student wouldn't otherwise be allowed to open.
async function surpriseMe() {
  const grade = (typeof SELECTED_GRADE !== 'undefined' && SELECTED_GRADE)
    || (typeof Auth !== 'undefined' && Auth.getActiveAccount?.()?.grade) || 5;
  const packs = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [])
    .filter(p => p.grade === grade && !p.comingSoon);
  const locked = (typeof DB !== 'undefined' && DB.restrictions?.lockedChapters) || [];

  const candidates = [];
  packs.forEach(pack => {
    (pack._chapters || pack.chapters || []).forEach(ch => {
      if (locked.includes(ch.id)) return;
      if (typeof _adminBlocksChapter === 'function' && _adminBlocksChapter(ch.id)) return;
      candidates.push({ pack, chapter: ch });
    });
  });
  if (!candidates.length) { toast('Nothing to surprise you with yet! 🙈', 2000); return; }

  const pick = candidates[Math.floor(Math.random() * candidates.length)];
  toast(`🎲 Surprise! ${pick.pack.icon} ${pick.chapter.icon || ''} ${pick.chapter.name}`, 2200);
  if (typeof PackLoader !== 'undefined') await PackLoader.ensure(pick.pack.id).catch(() => {});
  activateSubjectPack(pick.pack.id);
  if (typeof QuestionLoader !== 'undefined') {
    QuestionLoader.loadSubject(pick.pack.id)
      .then(() => startChapterDirect(pick.chapter.id))
      .catch(() => startChapterDirect(pick.chapter.id));
  } else {
    startChapterDirect(pick.chapter.id);
  }
}

window.selectSubject = async function(id) {
  const known = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : []).find(p => p.id === id);
  if (known && known.comingSoon) { toast(`${known.subject || known.name} is coming soon! 🚀`, 2500); return; }
  if (typeof PackLoader !== 'undefined') await PackLoader.ensure(id).catch(() => {});
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

// Init scratchpads when their screen becomes visible, and blank them when the
// session behind them has changed - see _resetScratchpadForSession.
const practiceObserver = new MutationObserver(() => {
  if (!document.getElementById('screen-practice')?.classList.contains('hidden')) {
    initScratchpad('scratchpad-practice');
    _scratchSessionPractice = _resetScratchpadForSession(
      'scratchpad-practice', S.practice.session, _scratchSessionPractice);
  }
});
const examObserver = new MutationObserver(() => {
  if (!document.getElementById('screen-exam')?.classList.contains('hidden')) {
    initScratchpad('scratchpad-exam');
    _scratchSessionExam = _resetScratchpadForSession(
      'scratchpad-exam', S.exam.qs, _scratchSessionExam);
  }
});
const pScreen = document.getElementById('screen-practice');
const eScreen = document.getElementById('screen-exam');
if (pScreen) practiceObserver.observe(pScreen, { attributes: true, attributeFilter: ['class'] });
if (eScreen) examObserver.observe(eScreen, { attributes: true, attributeFilter: ['class'] });

// ══════════════════════════════════════════════
//  GRADE DROPDOWNS ARE GENERATED, NOT TYPED
//
//  Four <select>s used to carry a hand-written <option value="4/5/6"> list, in
//  three different files' worth of markup. Adding grades 1-3 and 7-9 meant
//  editing all four and remembering all four again next time.
//
//  They are filled from SUBJECT_PACKS now, which is the same source
//  renderGradeSelect(), the admin Content tab and the shop catalogue already
//  read - so a new pack reaches every one of them together, or none.
//
//  ⚠ TWO MODES, and the difference is deliberate:
//    data-grade-select="live" - only grades with at least one pack that is NOT
//      comingSoon. These are the PARENT-facing ones (family setup, add child).
//      Enrolling a child into a grade with no content gives them an app of
//      "Coming Soon" cards and nothing to do, which is worse than not offering
//      the grade at all. This list opens by itself the moment a pack flips to
//      comingSoon: false - there is no second place to edit.
//    data-grade-select="all" - every registered grade. These are the AUTHORING
//      ones (admin question filter and question form): you have to be able to
//      file a question under Grade 2 before Grade 2 opens to anyone.
//
//  ⚠ Run TWICE, and the second one is not belt-and-braces. The <script> tags
//  sit in the middle of <body>, so a good part of the markup - including
//  #modal-qm-form, which holds #qmf-grade - has not been parsed yet when app.js
//  executes. Filling only at that point left the admin question form with an
//  EMPTY grade dropdown (measured: 0 options), while #qm-grade higher up the
//  document filled correctly. DOMContentLoaded catches the rest.
//
//  Packs themselves are ready either way: the manifest tags all precede app.js,
//  so SUBJECT_PACKS is complete on the first pass.
// ══════════════════════════════════════════════
function _populateGradeSelects() {
  const packs = (typeof SUBJECT_PACKS !== 'undefined') ? SUBJECT_PACKS : [];
  if (!packs.length) return;

  const all  = [...new Set(packs.map(p => p.grade))].sort((a, b) => a - b);
  const live = [...new Set(packs.filter(p => !p.comingSoon).map(p => p.grade))].sort((a, b) => a - b);

  document.querySelectorAll('[data-grade-select]').forEach(sel => {
    const grades = sel.dataset.gradeSelect === 'all' ? all : live;
    if (!grades.length) return;
    // An "All grades" row (or any other authored option with no value) is part
    // of the control, not part of the grade list - keep it and rebuild the rest.
    const keep = [...sel.options].filter(o => o.value === '');
    const prev = sel.value;
    sel.innerHTML = '';
    keep.forEach(o => sel.appendChild(o));
    // Same split as the grade picker, and for the same reason - but only
    // when both stages are actually on offer. A single <optgroup> around
    // every option is noise.
    const stages = [...new Set(grades.map(g => _gradeStage(g).id))];
    if (stages.length > 1) {
      _GRADE_STAGES.forEach(st => {
        const mine = grades.filter(g => _gradeStage(g).id === st.id);
        if (!mine.length) return;
        const grp = document.createElement('optgroup');
        grp.label = st.name + ' (' + st.exam + ')';
        mine.forEach(g => {
          const o = document.createElement('option');
          o.value = String(g);
          o.textContent = 'Grade ' + g;
          grp.appendChild(o);
        });
        sel.appendChild(grp);
      });
    } else {
      grades.forEach(g => {
        const o = document.createElement('option');
        o.value = String(g);
        o.textContent = 'Grade ' + g;
        sel.appendChild(o);
      });
    }
    // Keep whatever was chosen if it is still on offer; otherwise fall back to
    // the authored default rather than silently jumping to Grade 1.
    if ([...sel.options].some(o => o.value === prev)) sel.value = prev;
  });
}
_populateGradeSelects();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _populateGradeSelects);
}

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
    const sel = document.getElementById('report-type');
    if (sel) sel.value = 'wrong_answer';
    modal.classList.remove('hidden');
  }
}

function closeReportModal() {
  const modal = document.getElementById('modal-report');
  if (modal) modal.classList.add('hidden');
}

async function submitReport() {
  const msg = (document.getElementById('report-message')?.value || '').trim();
  const reportType = document.getElementById('report-type')?.value || 'other';
  // The type alone is enough to file a report; the message field is optional.
  if (!reportType) { toast('Please choose a report type.', 2000); return; }

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

  const res = await Store.reportQuestion(
    q.id,
    questionText.slice(0, 300),
    msg || reportType,
    typeof ACTIVE_STUDENT_ID !== 'undefined' ? ACTIVE_STUDENT_ID : null,
    studentName,
    mode,
    q.options || null,
    q.answer || null,
    q.chapterId || null,
    reportType
  );

  closeReportModal();
  if (res.ok) {
    toast('Report sent - thank you! 🙏 Check My Reports for updates.', 3000);
    // Refresh inbox badge if already loaded
    _refreshInboxBadge();
  } else if (!res.sessionExpired) {
    // A session-expired failure already got its own, more useful toast from
    // the 'session-invalid' handler in auth.js (and already sent the student
    // back to the login screen) - piling this generic one on top would just
    // overwrite it, since toast() is a single slot, not a queue.
    toast('Could not send report. Check your connection.', 3000);
  }
}

// ── Student Report Inbox ─────────────────────────────────────────────────────
const _REPORT_TYPE_LABELS = {
  wrong_answer:   '❌ Wrong answer',
  unclear:        '❓ Unclear question',
  typo:           '✏️ Typo / grammar',
  wrong_options:  '🔄 Wrong options',
  other:          '💬 Other',
  topic_question: '🙋 Topic question',
  app_problem:    '🐛 App problem',
  content_issue:  '📖 Content issue',
};

const _REPORT_STATUS_LABELS = {
  open:      '🟡 Open',
  in_review: '🔵 In review',
  resolved:  '✅ Resolved',
  wont_fix:  '⚪ No change needed',
};

let _inboxCache = null;

async function _refreshInboxBadge() {
  if (!ACTIVE_STUDENT_ID) return;
  const reports = await Store.loadStudentReports();
  _inboxCache = reports;
  // Unread = admin replied after student last saw the report
  const hasUnread = reports.some(r =>
    r.reply_count > 0 &&
    (!r.student_last_seen_at || new Date(r.updated_at) > new Date(r.student_last_seen_at))
  );
  // Dashboard tile badge
  const badge = document.getElementById('inbox-badge');
  if (badge) { badge.textContent = 'new'; badge.classList.toggle('hidden', !hasUnread); }
}

async function renderStudentInbox() {
  const el = document.getElementById('inbox-list');
  if (!el) return;

  el.innerHTML = '<p class="text-sm text-gray-400 dark:text-gray-500 text-center py-10 animate-pulse">Loading…</p>';

  // Always reload when opening the screen so the student sees fresh data.
  const reports = await Store.loadStudentReports();
  _inboxCache = reports;

  if (!reports.length) {
    el.innerHTML = `
      <div class="text-center py-10">
        <div class="text-5xl mb-4">📭</div>
        <p class="text-gray-500 dark:text-gray-400 font-semibold mb-1">No reports yet</p>
        <p class="text-sm text-gray-400 dark:text-gray-500 max-w-xs mx-auto">Tap the <strong>🚩 flag</strong> icon while practising to report a question problem, or tap <strong>＋ New Ticket</strong> above to ask us anything.</p>
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-3">Admin replies appear here and in the 📬 header button.</p>
      </div>`;
    return;
  }

  el.innerHTML = reports.map(r => {
    const typeLabel   = _REPORT_TYPE_LABELS[r.report_type] || '💬 Report';
    const statusLabel = _REPORT_STATUS_LABELS[r.status] || r.status;
    const hasNew = r.reply_count > 0 &&
      (!r.student_last_seen_at || new Date(r.updated_at) > new Date(r.student_last_seen_at));
    const borderCls = hasNew ? 'border-indigo-400' : (r.status === 'resolved' ? 'border-green-400' : 'border-gray-200 dark:border-gray-700');
    const safeId = r.id.replace(/[^a-zA-Z0-9-]/g, '');
    const questionPreview = (r.question_text || '').split('\n__meta__')[0].slice(0, 120);

    return `
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow mb-3 border-l-4 ${borderCls}">
      <div class="flex justify-between items-start gap-2 mb-2">
        <span class="text-xs font-medium text-gray-500 dark:text-gray-400">${_attr(typeLabel)}</span>
        <span class="text-xs font-semibold ${r.status === 'resolved' ? 'text-green-600 dark:text-green-400' : r.status === 'in_review' ? 'text-blue-600 dark:text-blue-400' : 'text-amber-600 dark:text-amber-400'}">${_attr(statusLabel)}</span>
      </div>
      ${questionPreview ? `<p class="text-xs text-gray-600 dark:text-gray-300 mb-1 leading-relaxed line-clamp-2">${_attr(questionPreview)}</p>` : ''}
      <p class="text-sm text-gray-800 dark:text-white mb-2">${_attr(r.message || '')}</p>
      ${r.last_admin_message ? `
        <div class="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-xl px-3 py-2 mb-2">
          <p class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-0.5">Admin replied:</p>
          <p class="text-sm text-gray-800 dark:text-white">${_attr(r.last_admin_message)}</p>
        </div>` : ''}
      <div class="flex justify-between items-center mt-2 gap-2 flex-wrap">
        <p class="text-xs text-gray-400 dark:text-gray-500">${new Date(r.created_at).toLocaleDateString()}</p>
        <button onclick="openReportThread('${safeId}')"
          class="text-xs text-indigo-600 dark:text-indigo-400 underline font-medium">
          ${hasNew ? '🔵 View reply' : 'View / reply'}
        </button>
      </div>
    </div>`;
  }).join('');

  // Mark all as seen (fire-and-forget - we have their attention now)
  reports.forEach(r => {
    if (r.reply_count > 0) Store.markReportSeen(r.id);
  });
  if (document.getElementById('inbox-badge')) {
    document.getElementById('inbox-badge').classList.add('hidden');
  }
}

// Thread modal - inline expand rather than a separate screen keeps the back nav simple
async function openReportThread(reportId) {
  const report = (_inboxCache || []).find(r => r.id === reportId);
  if (!report) return;

  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm';
  modal.id = 'modal-report-thread';
  modal.innerHTML = `
    <div class="bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md max-h-[80vh] flex flex-col">
      <div class="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-700 shrink-0">
        <button onclick="document.getElementById('modal-report-thread').remove()" class="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
        <div class="flex-1">
          <p class="font-semibold text-gray-800 dark:text-white text-sm">${_attr(_REPORT_TYPE_LABELS[report.report_type] || 'Report')}</p>
          <p class="text-xs text-gray-400">${_attr(_REPORT_STATUS_LABELS[report.status] || report.status)}</p>
        </div>
      </div>
      <div id="thread-messages" class="flex-1 overflow-y-auto p-4 space-y-3">
        <p class="text-xs text-gray-400 text-center animate-pulse">Loading…</p>
      </div>
      <div id="thread-reply-area" class="p-4 border-t border-gray-100 dark:border-gray-700 shrink-0 ${report.status === 'resolved' || report.status === 'wont_fix' ? 'hidden' : ''}">
        <div class="flex gap-2">
          <textarea id="thread-reply-input" rows="2" maxlength="500" placeholder="Add a follow-up message…"
            class="flex-1 text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"></textarea>
          <button onclick="_sendThreadReply('${reportId}')"
            class="shrink-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors self-end">Send</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);

  // Mark as seen now that the student is viewing the thread.
  Store.markReportSeen(reportId);

  // Student inbox uses the data from get_student_reports (last_admin_message + reply_count).
  // Direct access to question_report_messages requires authenticated (admin) - the student
  // reads the thread through the RPC-provided summary. Show initial report + latest reply.
  const threadEl = document.getElementById('thread-messages');
  if (!threadEl) return;

  const qPreview = (report.question_text || '').split('\n__meta__')[0].slice(0, 200);
  let html = '';
  if (qPreview) {
    html += `<div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 mb-1">
      <p class="text-xs text-gray-400 mb-1">Question</p>
      <p class="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">${_attr(qPreview)}</p>
    </div>`;
  }
  html += `<div class="flex justify-end">
    <div class="max-w-[85%] bg-indigo-600 text-white rounded-2xl rounded-tr-none px-3 py-2">
      <p class="text-sm">${_attr(report.message || '')}</p>
      <p class="text-xs opacity-70 mt-1 text-right">${new Date(report.created_at).toLocaleString()} · You</p>
    </div>
  </div>`;
  if (report.last_admin_message) {
    html += `<div class="flex justify-start">
      <div class="max-w-[85%] bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-none px-3 py-2">
        <p class="text-sm text-gray-800 dark:text-white">${_attr(report.last_admin_message)}</p>
        <p class="text-xs text-gray-400 mt-1">Admin</p>
      </div>
    </div>`;
  } else {
    html += `<p class="text-xs text-gray-400 text-center">No admin reply yet - we'll update this when we review it.</p>`;
  }
  threadEl.innerHTML = html;
}

async function _sendThreadReply(reportId) {
  const input = document.getElementById('thread-reply-input');
  const msg = (input?.value || '').trim();
  if (!msg) { toast('Please type a message first.', 2000); return; }

  const btn = document.querySelector('#modal-report-thread button.bg-indigo-600');
  if (btn) btn.textContent = 'Sending…';

  const res = await Store.sendReportFollowup(reportId, msg);
  if (res.ok) {
    if (input) input.value = '';
    toast('Follow-up sent! 🙏', 2000);
    document.getElementById('modal-report-thread')?.remove();
    _inboxCache = null;
    await renderStudentInbox();
  } else {
    if (btn) btn.textContent = 'Send';
    toast('Could not send. Check your connection.', 3000);
  }
}

// ── New general ticket (from My Reports screen) ──────────────────────────────
function openNewTicketModal() {
  const modal = document.getElementById('modal-new-ticket');
  if (!modal) return;
  document.getElementById('ticket-message').value = '';
  document.getElementById('ticket-type').value = 'topic_question';
  const btn = document.getElementById('ticket-submit-btn');
  if (btn) { btn.textContent = 'Send'; btn.disabled = false; }
  modal.classList.remove('hidden');
}

function closeNewTicketModal() {
  const modal = document.getElementById('modal-new-ticket');
  if (modal) modal.classList.add('hidden');
}

async function submitNewTicket() {
  const msg = (document.getElementById('ticket-message')?.value || '').trim();
  if (!msg) { toast('Please describe your question or problem.', 2500); return; }

  const btn = document.getElementById('ticket-submit-btn');
  if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }

  const ticketType = document.getElementById('ticket-type')?.value || 'other';
  const sess = Store.getStudentSession ? Store.getStudentSession() : null;
  const studentName = sess?.displayName || null;

  const res = await Store.reportQuestion(
    null,          // no question - sentinel '__general__' applied inside Store
    '',            // no question text
    msg,
    typeof ACTIVE_STUDENT_ID !== 'undefined' ? ACTIVE_STUDENT_ID : null,
    studentName,
    'ticket',
    null, null, null,
    ticketType
  );

  closeNewTicketModal();
  if (res.ok) {
    toast('Ticket sent! We\'ll reply in My Reports. 🎫', 3000);
    _inboxCache = null;
    await renderStudentInbox();
  } else if (!res.sessionExpired) {
    toast('Could not send ticket. Check your connection.', 3000);
  }
}

// ── PARENT MESSAGES ──────────────────────────────────────────────────────────

async function _refreshParentMessageBadge() {
  const badge = document.getElementById('pd-msg-badge');
  if (!badge) return;
  const reports = await Store.loadParentReports().catch(() => []);
  // "new" = has an admin reply (admin_note non-null) and the report was updated
  // after it was created (meaning the admin touched it after the parent submitted).
  const hasNew = reports.some(r => r.admin_note && r.updated_at && r.created_at && r.updated_at !== r.created_at);
  badge.classList.toggle('hidden', !hasNew);
}

async function renderParentMessages() {
  const el = document.getElementById('pm-list');
  if (!el) return;
  el.innerHTML = '<p class="text-sm text-gray-400 dark:text-gray-500 text-center py-10 animate-pulse">Loading…</p>';

  const reports = await Store.loadParentReports();

  // Refresh the badge in the parent dashboard tab (clear it - they're looking at it now)
  const badge = document.getElementById('pd-msg-badge');
  if (badge) badge.classList.add('hidden');

  if (!reports.length) {
    el.innerHTML = `
      <div class="text-center py-10">
        <div class="text-5xl mb-4">📭</div>
        <p class="text-gray-500 dark:text-gray-400 font-semibold mb-1">No messages yet</p>
        <p class="text-sm text-gray-400 dark:text-gray-500 max-w-xs mx-auto">Tap <strong>＋ New Message</strong> to send us a bug report, ask about content, or get help with anything.</p>
      </div>`;
    return;
  }

  el.innerHTML = reports.map(r => {
    const typeLabel   = _REPORT_TYPE_LABELS[r.report_type] || '💬 Message';
    const statusLabel = _REPORT_STATUS_LABELS[r.status]   || r.status;
    const hasReply    = !!r.admin_note;
    const isNew       = hasReply && r.updated_at && r.created_at && r.updated_at !== r.created_at;
    const borderCls   = isNew  ? 'border-indigo-400' :
                        r.status === 'resolved' ? 'border-green-400' : 'border-gray-200 dark:border-gray-700';
    return `
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow mb-3 border-l-4 ${borderCls}">
      <div class="flex justify-between items-start gap-2 mb-2">
        <span class="text-xs font-medium text-gray-500 dark:text-gray-400">${_attr(typeLabel)}</span>
        <span class="text-xs font-semibold ${r.status === 'resolved' ? 'text-green-600 dark:text-green-400' : r.status === 'in_review' ? 'text-blue-600 dark:text-blue-400' : 'text-amber-600 dark:text-amber-400'}">${_attr(statusLabel)}</span>
      </div>
      <p class="text-sm text-gray-800 dark:text-white mb-2">${_attr(r.message || '')}</p>
      ${r.admin_note ? `
        <div class="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-xl px-3 py-2 mb-2">
          <p class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-0.5">Admin replied:</p>
          <p class="text-sm text-gray-800 dark:text-white">${_attr(r.admin_note)}</p>
        </div>` : `<p class="text-xs text-gray-400 dark:text-gray-500 italic mb-2">No reply yet - we'll update this when we review it.</p>`}
      <p class="text-xs text-gray-400 dark:text-gray-500">${new Date(r.created_at).toLocaleDateString()}</p>
    </div>`;
  }).join('');
}

function openParentMessageModal() {
  const modal = document.getElementById('modal-parent-message');
  if (!modal) return;
  const msgEl = document.getElementById('pm-message');
  const typeEl = document.getElementById('pm-type');
  if (msgEl) msgEl.value = '';
  if (typeEl) typeEl.value = 'topic_question';
  const btn = document.getElementById('pm-submit-btn');
  if (btn) { btn.textContent = 'Send'; btn.disabled = false; }
  modal.classList.remove('hidden');
}

function closeParentMessageModal() {
  const modal = document.getElementById('modal-parent-message');
  if (modal) modal.classList.add('hidden');
}

async function submitParentMessage() {
  const msg      = (document.getElementById('pm-message')?.value || '').trim();
  const type     = document.getElementById('pm-type')?.value || 'other';
  if (!msg) { toast('Please describe your question or problem.', 2500); return; }

  const btn = document.getElementById('pm-submit-btn');
  if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }

  const res = await Store.submitParentReport(msg, type);
  closeParentMessageModal();

  if (res.ok) {
    toast('Message sent! We\'ll reply in the Messages tab. 💬', 3000);
    await renderParentMessages();
  } else {
    toast('Could not send. Check your connection.', 3000);
  }
}

// ── PROFILE / ACCOUNT SETTINGS ─────────────────────────────────────────────
let _profileFromScreen = null;

// The parent's saved preferences blob, cached so a toggle can write the whole
// object back without re-fetching. Re-read from the database on every render of
// the settings page. Declared here, above its first use, so nothing can land in
// the temporal dead zone if an earlier top-level statement ever throws.
let _parentPrefs = {};

async function showProfile() {
  // When the parent dashboard is the current screen, render Settings inline
  // instead of navigating to a separate screen.
  if (_isParentSession() && !document.getElementById('screen-parent')?.classList.contains('hidden')
      && typeof PD !== 'undefined') {
    PD.mainTab('settings');
    return;
  }
  _profileFromScreen = S.currentScreen;
  showScreen('profile');
  const container = document.getElementById('profile-content');
  if (!container) return;
  container.innerHTML = '<div class="flex justify-center py-16"><div class="w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div></div>';
  // NOT `if (ACTIVE_STUDENT_ID)`. A parent who has tapped a child's card is
  // holding that child in ACTIVE_STUDENT_ID (pdSwitchStudent loads them so the
  // Controls tab has something to read) while still being signed in as a
  // parent - so keying off the student id alone showed them the child's
  // profile instead of their own account. A parent session wins.
  if (_isParentSession()) {
    await _renderParentProfile(container);
  } else {
    await _renderStudentProfile(container);
  }
}

// A parent should not have to infer that sharing family access lives under a
// generic account screen. This shortcut opens the exact card that creates the
// one-use co-parent link.
async function openCoparentSettings() {
  if (document.getElementById('pd-panel-settings')) {
    PD.mainTab('settings', 'coparent-card');
  } else {
    await showProfile();
    requestAnimationFrame(() => {
      document.getElementById('coparent-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

function _isParentSession() {
  return typeof Auth !== 'undefined' && !!Auth.getParentProfile();
}

function _profileBack() {
  const dest = _profileFromScreen && _profileFromScreen !== 'profile'
    ? _profileFromScreen
    : (_isParentSession() ? 'parent' : 'dashboard');
  showScreen(dest);
}

function _profEsc(s) {
  const d = document.createElement('div');
  d.textContent = s == null ? '' : String(s);
  return d.innerHTML;
}

function _profileSaved(btn) {
  const label = btn.dataset.label || btn.textContent;
  btn.dataset.label = label;
  btn.textContent = 'Saved ✓';
  btn.disabled = true;
  setTimeout(() => { btn.textContent = label; btn.disabled = false; }, 2200);
}

// ── Student profile view ─────────────────────────────────
async function _renderStudentProfile(container) {
  const account = typeof Auth !== 'undefined' ? Auth.getActiveAccount() : null;
  const name    = account?.name || DB.display_name || 'Student';
  const avatar  = account?.avatar || DB.avatar || '🧒';
  const grade   = account?.grade  || DB.grade  || '';

  let expiresAt = null;
  if (_sb && ACTIVE_STUDENT_ID) {
    try {
      const { data } = await _sb.from('students').select('expires_at').eq('id', ACTIVE_STUDENT_ID).maybeSingle();
      expiresAt = data?.expires_at || null;
    } catch(_) {}
  }

  const avatarList = ['🧒','👧','🧑','👦','🌟','🎓','🦁','🐯','🦊','🐧','🌈','💫','🏆','⭐','🚀','🎯','🎮','🎲','📚','🌺'];
  const hapticOn = localStorage.getItem(_prefKey('haptic')) !== 'false';
  const soundOn  = localStorage.getItem(_prefKey('sound'))  !== 'false';
  const kidPrefs = Object.assign({ vibe: 'default', bigText: false, calm: false }, DB.kidPrefs);
  const hasPersonalShortcut = typeof ProfileInstall !== 'undefined' &&
    ProfileInstall.hasStudentBinding?.(ACTIVE_STUDENT_ID);

  const toggleHtml = (id, checked, key, label, sub) => `
    <label class="flex items-center justify-between gap-3 cursor-pointer" onclick="_togglePref('${key}')">
      <div>
        <span class="text-sm font-medium text-gray-800 dark:text-white">${label}</span>
        <p class="text-xs text-gray-500 dark:text-gray-400">${sub}</p>
      </div>
      <button id="${id}" role="switch" aria-checked="${checked}" type="button"
        class="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${checked ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'}">
        <span class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}"></span>
      </button>
    </label>`;

  // Same shape as toggleHtml above, but wired to DB.kidPrefs (via
  // _toggleKidBoolPref) instead of the localStorage pref_* keys - these two
  // ride in the synced progress blob, not device-local storage.
  const kidToggleHtml = (id, checked, key, label, sub) => `
    <label class="flex items-center justify-between gap-3 cursor-pointer" onclick="_toggleKidBoolPref('${key}','${label}')">
      <div>
        <span class="text-sm font-medium text-gray-800 dark:text-white">${label}</span>
        <p class="text-xs text-gray-500 dark:text-gray-400">${sub}</p>
      </div>
      <button id="${id}" role="switch" aria-checked="${checked}" type="button"
        class="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${checked ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'}">
        <span class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}"></span>
      </button>
    </label>`;

  // Only offered on a touch device that actually has a platform authenticator
  // (Face/Touch ID, fingerprint reader) set up - see engine/biometric.js.
  let studentBiometricHtml = '';
  if (ACTIVE_STUDENT_ID && typeof Biometric !== 'undefined' && await Biometric.isAvailable()) {
    const bioOn = Biometric.isEnrolled(ACTIVE_STUDENT_ID);
    studentBiometricHtml = `
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow">
        <div class="flex items-center justify-between gap-3">
          <div>
            <div class="font-bold text-gray-800 dark:text-white text-sm">🔒 Fingerprint sign-in</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">${bioOn
              ? 'Enabled on this device - unlock instead of typing your PIN.'
              : 'Skip typing your PIN on this phone next time.'}</div>
          </div>
          <button onclick="${bioOn ? 'Auth.disableStudentBiometricLogin()' : 'Auth.enableStudentBiometricLogin(this)'}"
            class="px-4 py-2 ${bioOn
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              : 'bg-indigo-500 hover:bg-indigo-400 text-white'} font-semibold rounded-xl text-xs transition-colors shrink-0">${bioOn ? 'Disable' : 'Enable'}</button>
        </div>
      </div>`;
  }

  container.innerHTML = `
    <div class="max-w-lg mx-auto space-y-4">
      <div class="flex items-center gap-3 mb-4">
        <button onclick="_profileBack()" class="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" aria-label="Back">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">⚙️ My Settings</h2>
      </div>

      ${expiresAt ? `<div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-2xl p-4">
        <p class="text-sm text-amber-700 dark:text-amber-400">Access expires on <strong>${new Date(expiresAt).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}</strong>.</p>
      </div>` : ''}

      <!-- Avatar picker -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow">
        <div class="flex items-center gap-4 mb-4">
          <div id="prof-av-preview" class="text-5xl select-none">${avatar}</div>
          <div>
            <p class="font-semibold text-gray-800 dark:text-white text-base">${_profEsc(name)}</p>
            <span class="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">Grade ${grade}</span>
          </div>
        </div>
        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Choose your avatar</p>
        <div class="grid grid-cols-10 gap-1.5" id="prof-av-grid">
          ${avatarList.map(a => `<button type="button" aria-label="${a}"
            class="text-2xl p-1 rounded-xl border-2 transition-colors hover:border-indigo-400 ${a === avatar ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-transparent'}"
            onclick="_pickProfileAvatar(this,'${a}')">${a}</button>`).join('')}
        </div>
      </div>

      <!-- Display name (read-only) -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow">
        <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
          Display Name <span class="text-gray-500 dark:text-gray-400 normal-case font-normal ml-1">🔒 set by parent</span>
        </label>
        <p class="text-base font-medium text-gray-800 dark:text-white">${_profEsc(name)}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">To change your name, ask your parent.</p>
      </div>

      <!-- A personal launcher remembers identity, never the four-digit PIN. -->
      <div class="profile-install-card">
        <div class="profile-install-card-icon">📲</div>
        <div class="profile-install-card-copy">
          <h3>${hasPersonalShortcut ? 'Your personal shortcut is ready' : `Install for ${_profEsc(name)}`}</h3>
          <p>Get an icon with your name. It opens your practice space directly, or asks only for your PIN when needed.</p>
          <span>🔒 Your PIN is never saved</span>
        </div>
        <button onclick="ProfileInstall.installStudent()">${hasPersonalShortcut ? 'Install again' : 'Add my icon'} →</button>
      </div>

      <!-- My Colours - purely cosmetic, kid-home only (see .kid-* rules in
           style.css). Kept separate from Preferences below: those two are
           accessibility/feedback settings, this one is just fun. -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow">
        <h3 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">🎨 My Colours</h3>
        <div class="grid grid-cols-3 sm:grid-cols-4 gap-2" id="kidpref-vibe-grid">
          ${KID_VIBES.map(v => `
            <button type="button" onclick="_pickKidVibe('${v.id}')"
              class="kidvibe-swatch flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-colors ${kidPrefs.vibe === v.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-transparent bg-gray-50 dark:bg-gray-700/50'}"
              data-vibe="${v.id}">
              <span class="w-8 h-8 rounded-full shadow-inner" style="background:linear-gradient(135deg,${v.c1},${v.c2})"></span>
              <span class="text-xs font-semibold text-gray-600 dark:text-gray-300">${v.label}</span>
            </button>`).join('')}
        </div>
      </div>

      <!-- Preferences -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow space-y-4">
        <h3 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Preferences</h3>
        ${toggleHtml('pref-haptic-toggle', hapticOn, 'haptic', 'Haptic Feedback', 'Vibration on correct / wrong answers')}
        ${toggleHtml('pref-sound-toggle',  soundOn,  'sound',  'Sound / Read Aloud', 'Audio feedback and text-to-speech')}
        ${kidToggleHtml('kidpref-bigText-toggle', !!kidPrefs.bigText, 'bigText', '🔠 Big Text', 'Larger text on your home screen')}
        ${kidToggleHtml('kidpref-calm-toggle',    !!kidPrefs.calm,    'calm',    '🎬 Calm Mode', 'Turns off the bouncy animations')}
      </div>

      ${studentBiometricHtml}
    </div>`;
}

// 6 hex-only (no CSS var/named colour) so they can drive an inline
// linear-gradient swatch directly - same reasoning as _subjectPrintColor()
// in calendar.js. Keep in step with the :root[data-kid-vibe] rules in
// style.css - each id here must have a matching CSS rule there.
const KID_VIBES = [
  { id: 'default',   label: 'Classic',   c1: '#6366f1', c2: '#ec4899' },
  { id: 'ocean',     label: 'Ocean',     c1: '#0ea5e9', c2: '#14b8a6' },
  { id: 'sunset',    label: 'Sunset',    c1: '#f97316', c2: '#ec4899' },
  { id: 'forest',    label: 'Forest',    c1: '#22c55e', c2: '#0d9488' },
  { id: 'galaxy',    label: 'Galaxy',    c1: '#7c3aed', c2: '#4338ca' },
  { id: 'candy',     label: 'Candy',     c1: '#ec4899', c2: '#f43f5e' },
  { id: 'mango',     label: 'Mango',     c1: '#f59e0b', c2: '#ef4444' },
  { id: 'mint',      label: 'Mint',      c1: '#10b981', c2: '#22d3ee' },
  { id: 'grape',     label: 'Grape',     c1: '#a855f7', c2: '#6366f1' },
  { id: 'bubblegum', label: 'Bubblegum', c1: '#f472b6', c2: '#a78bfa' },
  { id: 'lagoon',    label: 'Lagoon',    c1: '#0891b2', c2: '#3b82f6' },
  { id: 'midnight',  label: 'Midnight',  c1: '#1e40af', c2: '#312e81' },
];

function _pickKidVibe(vibeId) {
  _setKidPref('vibe', vibeId);
  document.querySelectorAll('#kidpref-vibe-grid .kidvibe-swatch').forEach(btn => {
    const sel = btn.dataset.vibe === vibeId;
    btn.classList.toggle('border-indigo-500',     sel);
    btn.classList.toggle('bg-indigo-50',          sel);
    btn.classList.toggle('dark:bg-indigo-900/30', sel);
    btn.classList.toggle('border-transparent',    !sel);
    btn.classList.toggle('bg-gray-50',            !sel);
    btn.classList.toggle('dark:bg-gray-700/50',   !sel);
  });
  toast('Colours updated! 🎨', 1500);
}

function _toggleKidBoolPref(key, label) {
  const next = !(DB.kidPrefs && DB.kidPrefs[key]);
  _setKidPref(key, next);
  const btn = document.getElementById(`kidpref-${key}-toggle`);
  if (btn) {
    btn.setAttribute('aria-checked', String(next));
    btn.classList.toggle('bg-indigo-500',    next);
    btn.classList.toggle('bg-gray-300',      !next);
    btn.classList.toggle('dark:bg-gray-600', !next);
    const knob = btn.querySelector('span');
    if (knob) { knob.classList.toggle('translate-x-6', next); knob.classList.toggle('translate-x-1', !next); }
  }
  toast(`${label} ${next ? 'on' : 'off'}.`, 1500);
}

function _pickProfileAvatar(btn, avatar) {
  document.querySelectorAll('#prof-av-grid button').forEach(b => {
    const sel = b === btn;
    b.classList.toggle('border-indigo-500',        sel);
    b.classList.toggle('bg-indigo-50',             sel);
    b.classList.toggle('dark:bg-indigo-900/30',    sel);
    b.classList.toggle('border-transparent',       !sel);
  });
  const preview = document.getElementById('prof-av-preview');
  if (preview) preview.textContent = avatar;

  if (!_sb || !ACTIVE_STUDENT_ID) { toast('Could not save avatar.', 2000); return; }
  _sb.from('students').update({ avatar }).eq('id', ACTIVE_STUDENT_ID)
    .then(({ error }) => {
      if (error) { toast('Could not save avatar. Please try again.', 2000); return; }
      if (typeof DB !== 'undefined') DB.avatar = avatar;
      const hdrAv = document.getElementById('header-profile-avatar');
      if (hdrAv) hdrAv.textContent = avatar;
      try {
        const raw  = localStorage.getItem('mm_student_sess');
        const sess = raw ? JSON.parse(raw) : {};
        sess.avatar = avatar;
        localStorage.setItem('mm_student_sess', JSON.stringify(sess));
      } catch(_) {}
      toast('Avatar updated! ✓', 1800);
    });
}

function _togglePref(key) {
  const storageKey = _prefKey(key);
  const cur  = localStorage.getItem(storageKey) !== 'false';
  const next = !cur;
  localStorage.setItem(storageKey, String(next));

  if (key === 'sound')  _soundEnabled  = next;
  if (key === 'haptic') _hapticEnabled = next;

  const btn  = document.getElementById(`pref-${key}-toggle`);
  if (btn) {
    btn.setAttribute('aria-checked', String(next));
    btn.classList.toggle('bg-indigo-500',         next);
    btn.classList.toggle('bg-gray-300',           !next);
    btn.classList.toggle('dark:bg-gray-600',      !next);
    const knob = btn.querySelector('span');
    if (knob) {
      knob.classList.toggle('translate-x-6', next);
      knob.classList.toggle('translate-x-1', !next);
    }
  }
  toast(`${key === 'haptic' ? 'Haptic feedback' : 'Sound'} ${next ? 'on' : 'off'}.`, 1500);
}

// ── Parent / Teacher / Admin profile view ────────────────
async function _renderParentProfile(container) {
  const profile = typeof Auth !== 'undefined' ? Auth.getParentProfile() : null;
  if (!profile) {
    container.innerHTML = '<p class="text-center text-gray-500 dark:text-gray-400 py-12">Not logged in.</p>';
    return;
  }

  let email = '';
  if (_sb) {
    try {
      const { data: { user } } = await _sb.auth.getUser();
      email = user?.email || '';
    } catch(_) {}
  }

  const roleLabel  = { admin: 'Admin', teacher: 'Teacher', parent: 'Parent' }[profile.role] || 'Parent';
  const roleColour = {
    admin:   'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    teacher: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    parent:  'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  }[profile.role] || 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';

  // Saved parent preferences. Absent column / un-migrated database returns {},
  // which is also the "everything on its default" state - so the settings below
  // still render and still work locally, they just don't follow to another device.
  _parentPrefs = (typeof Store !== 'undefined') ? (await Store.getMyPreferences(profile.id) || {}) : {};

  // A theme saved from another device wins over whatever this one last used.
  if (_parentPrefs.theme && _parentPrefs.theme !== getThemePreference()) {
    setThemePreference(_parentPrefs.theme);
  }

  const family   = (typeof Auth !== 'undefined' && Auth.getFamily) ? Auth.getFamily() : null;
  const children = (typeof Auth !== 'undefined' && Auth.getStudents) ? (Auth.getStudents() || []) : [];
  // Admins and approved teachers can also own a family. Access to family
  // controls is determined by that family relationship, not by the account's
  // moderation role badge.
  const isParent = profile.role === 'parent' || !!family;

  // Only offered on a touch device that actually has a platform authenticator
  // (Face/Touch ID, fingerprint reader) set up - see engine/biometric.js.
  let biometricHtml = '';
  if (isParent && typeof Biometric !== 'undefined' && await Biometric.isAvailable()) {
    const bioOn = Biometric.isEnrolled(profile.id);
    biometricHtml = `
        <div class="border-t border-gray-100 dark:border-gray-700 pt-4 flex items-center justify-between gap-3">
          <div>
            <div class="font-bold text-gray-800 dark:text-white text-sm">🔒 Fingerprint / Face unlock</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">${bioOn
              ? 'Enabled on this device - unlock the app here instead of typing your password.'
              : 'Skip typing your password on this phone next time.'}</div>
          </div>
          <button onclick="${bioOn ? 'Auth.disableBiometricLogin()' : 'Auth.enableBiometricLogin(this)'}"
            class="px-4 py-2 ${bioOn
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              : 'bg-indigo-500 hover:bg-indigo-400 text-white'} font-semibold rounded-xl text-xs transition-colors shrink-0">${bioOn ? 'Disable' : 'Enable'}</button>
        </div>`;
  }

  let referralHtml = '';
  if (profile.role === 'parent' && _sb) {
    try {
      const code = await Store.getMyReferralCode(profile.id);
      if (code) {
        referralHtml = `
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow">
            <h3 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Referral Code</h3>
            <div class="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
              <span class="font-mono font-black tracking-widest text-indigo-700 dark:text-indigo-300 text-lg select-all">${_profEsc(code)}</span>
              <button onclick="Auth.openInviteModal()" class="text-xs text-indigo-600 dark:text-indigo-300 font-semibold hover:underline shrink-0">Share →</button>
            </div>
          </div>`;
      }
    } catch(_) {}
  }

  // ── Family login name (parents only) ──
  // The child-facing half of the credentials: children type this on the login
  // screen, so a parent who renames it has to know it changes what they type.
  const familyHtml = family ? `
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow space-y-3">
      <h3 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Family Login</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400">Your children type this family name, their own username and their PIN to sign in.</p>
      <div class="flex gap-2">
        <input id="set-family-name" type="text" maxlength="40" value="${_profEsc(family.family_name || '')}"
          class="selectable flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
        <button data-label="Save" onclick="_saveFamilyName(this)"
          class="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-xl text-sm transition-colors">Save</button>
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400">Private family code: <span class="font-mono font-bold select-all">${_profEsc(family.family_code || '-')}</span></p>
    </div>` : '';

  // ── Parents on this account ──
  // Filled in by _renderCoparents() after the markup exists: it needs a round
  // trip, and blocking the whole settings screen on it would make every other
  // setting wait for a list most families will never have more than one row in.
  const coparentHtml = (isParent && family) ? `
    <div id="coparent-card" class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow space-y-3">
      <h3 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Parents on this account</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400">Loading…</p>
    </div>` : '';

  // ── Appearance ──
  const themePref = getThemePreference();
  const themeBtn = (val, icon, label) => `
    <button type="button" data-theme-opt="${val}" onclick="_setParentTheme('${val}')"
      class="flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-colors ${
        themePref === val
          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
          : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-gray-300'
      }">
      <span class="text-xl select-none">${icon}</span>
      <span class="text-xs font-semibold">${label}</span>
    </button>`;
  const appearanceHtml = `
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow space-y-3">
      <h3 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Appearance</h3>
      <div class="flex gap-2">
        ${themeBtn('light', '☀️', 'Light')}${themeBtn('dark', '🌙', 'Dark')}${themeBtn('system', '🖥️', 'System')}
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400">System follows your phone or computer's own light/dark setting. Children keep their own theme.</p>
    </div>`;

  // ── Notifications ──
  const digestOn = _parentPrefs.weekly_digest !== false;
  const notifyHtml = family ? `
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow space-y-4">
      <h3 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Notifications</h3>

      <div class="flex items-center justify-between gap-3">
        <div>
          <div class="font-bold text-gray-800 dark:text-white text-sm">📧 Weekly progress email</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">A Sunday summary of each child's week, sent to ${_profEsc(email) || 'your email'}</div>
        </div>
        <label class="relative inline-flex items-center cursor-pointer shrink-0">
          <input type="checkbox" id="set-digest-toggle" class="sr-only peer" ${digestOn ? 'checked' : ''} onchange="_toggleWeeklyDigest(this)">
          <div class="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-checked:bg-blue-500 rounded-full peer transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
        </label>
      </div>

      ${children.length ? `
      <div class="border-t border-gray-100 dark:border-gray-700 pt-4">
        <div class="font-bold text-gray-800 dark:text-white text-sm mb-1">🔔 Daily study reminder</div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mb-3">Push notification at this time (Mauritius time) for <b>every</b> child. Each child can still be given a different time from their own Controls tab.</div>
        <div class="flex items-center gap-2 flex-wrap">
          <input type="time" id="set-reminder-all" value="${_profEsc(_parentPrefs.reminder_time || '')}"
            class="text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <button data-label="Apply to all" onclick="_applyReminderToAll(this)"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors">Apply to all</button>
          <button onclick="_clearReminderForAll(this)" class="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors">Clear all</button>
        </div>
        <div id="set-reminder-status" class="text-xs text-gray-500 dark:text-gray-400 mt-2"></div>
      </div>` : ''}
    </div>` : '';

  // ── Defaults applied to every child at once ──
  // Chapter locks are deliberately NOT here: they are per-grade and per-child,
  // so "apply to all" would be meaningless at best and would silently wipe a
  // parent's careful per-child locking at worst.
  const d = Object.assign(
    { maxDifficulty: 4, examDisabled: false, hintsDisabled: false },
    (children[0] && children[0].settings) || {},
    _parentPrefs.child_defaults || {}
  );
  const diffOpt = (v, label) => `
    <label class="flex items-center gap-1.5 cursor-pointer">
      <input type="radio" name="set-def-diff" value="${v}" ${Number(d.maxDifficulty) === v ? 'checked' : ''} class="accent-blue-500">
      <span class="text-sm text-gray-700 dark:text-gray-300">${label}</span>
    </label>`;
  const defToggle = (id, checked, title, sub) => `
    <div class="flex items-center justify-between gap-3">
      <div>
        <div class="font-semibold text-gray-800 dark:text-white text-sm">${title}</div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">${sub}</div>
      </div>
      <label class="relative inline-flex items-center cursor-pointer shrink-0">
        <input type="checkbox" id="${id}" class="sr-only peer" ${checked ? 'checked' : ''}>
        <div class="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-checked:bg-blue-500 rounded-full peer transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
      </label>
    </div>`;
  // ⚠ Applied to every child at once, so these are ABSOLUTE grade numbers, not
  //   "one above". Each child's own grade is always open and is never in the
  //   list, so ticking Grade 6 grants it to the Grade 4 child and is a no-op for
  //   the Grade 6 one.
  const defGrades = d => {
    const live = (typeof GradeAccess !== 'undefined') ? GradeAccess.liveGrades() : [];
    if (!live.length) return '';
    // ⚠ Through granted(), not d.allowedGrades: a family still carrying the old
    //   crossGrade* booleans has no list yet, and reading the raw field would show
    //   nothing ticked and then REVOKE every grade the moment Apply is pressed.
    const on = new Set(GradeAccess.granted(d));
    return `
    <div>
      <div class="font-semibold text-gray-800 dark:text-white text-sm mb-1">🎓 Grade access</div>
      <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">Extra grades every child may search and revise. Their own grade is always open.</div>
      <div class="flex gap-3 flex-wrap">${live.map(g => `
        <label class="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" class="accent-blue-500" data-def-grade="${g}"${on.has(g) ? ' checked' : ''}>
          <span class="text-sm text-gray-700 dark:text-gray-300">Grade ${g}</span>
        </label>`).join('')}</div>
    </div>`;
  };

  const defaultsHtml = children.length ? `
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow space-y-4">
      <div>
        <h3 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Defaults For All Children</h3>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Set these once and apply them to all ${children.length} ${children.length === 1 ? 'child' : 'children'}. Chapter locks are left untouched.</p>
      </div>

      <div>
        <div class="font-semibold text-gray-800 dark:text-white text-sm mb-2">🎯 Question difficulty cap</div>
        <div class="flex gap-3 flex-wrap">
          ${diffOpt(1, '⭐ Basic')}${diffOpt(2, '⭐⭐ Medium')}${diffOpt(3, '⭐⭐⭐ Hard')}${diffOpt(4, '🏆 All')}
        </div>
      </div>

      ${defToggle('set-def-exam',  !d.examDisabled,        '📝 Exam mode',            'Allow timed exam papers')}
      ${defGrades(d)}
      ${defToggle('set-def-hints', !d.hintsDisabled,       '💡 In-app hints',         'First-time tip callouts')}

      <button data-label="Apply to all children" onclick="_applyDefaultsToAll(this)"
        class="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl text-sm transition-colors">Apply to all children</button>
      <p id="set-defaults-status" class="text-xs text-gray-500 dark:text-gray-400 text-center"></p>
    </div>` : '';

  // ── Danger zone ──
  const dangerHtml = `
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow border border-red-200 dark:border-red-900/40 space-y-3">
      <h3 class="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">Danger Zone</h3>
      <button onclick="Auth.logout()" class="w-full py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-semibold rounded-xl text-sm transition-colors">🚪 Sign out</button>
      ${isParent ? `
      <div class="pt-2 border-t border-gray-100 dark:border-gray-700">
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Closes your account${children.length ? ` and all ${children.length} ${children.length === 1 ? 'child account' : 'child accounts'}` : ''}. Nothing is erased - sign in again with the same email and you can restore everything.</p>
        <button onclick="_confirmDeleteAccount()" class="btn-danger w-full text-sm">🗑️ Close my account</button>
      </div>` : ''}
    </div>`;

  container.innerHTML = `
    <div class="max-w-lg mx-auto space-y-4">
      <div class="flex items-center gap-3 mb-4">
        <button onclick="_profileBack()" class="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" aria-label="Back">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">Account &amp; Settings</h2>
      </div>

      ${profile.disabled ? `<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-2xl p-4 flex items-center gap-3">
        <span class="text-2xl select-none shrink-0">🔒</span>
        <p class="text-sm text-red-700 dark:text-red-400 font-medium">Your account has been restricted by an administrator.</p>
      </div>` : ''}

      ${profile.expires_at ? `<div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-2xl p-4">
        <p class="text-sm text-amber-700 dark:text-amber-400">Account expires on <strong>${new Date(profile.expires_at).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}</strong>.</p>
      </div>` : ''}

      <!-- Profile info -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow space-y-4">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-black select-none" aria-hidden="true">
            ${_profEsc((profile.full_name || '?')[0].toUpperCase())}
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-bold text-gray-800 dark:text-white text-base truncate">${_profEsc(profile.full_name || '-')}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">${_profEsc(email)}</p>
            <span class="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${roleColour}">${roleLabel}</span>
          </div>
        </div>

        <div>
          <label for="prof-name-input" class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Display Name</label>
          <div class="flex gap-2">
            <input id="prof-name-input" type="text" maxlength="60" value="${_profEsc(profile.full_name || '')}"
              class="selectable flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <button data-label="Save" onclick="_saveProfileName(this)"
              class="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-xl text-sm transition-colors">Save</button>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
            Email <span class="text-gray-500 dark:text-gray-400 font-normal normal-case ml-1">🔒 cannot be changed here</span>
          </label>
          <p class="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-xl break-all">${_profEsc(email) || '-'}</p>
        </div>
      </div>

      <!-- Security -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow space-y-3">
        <h3 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Security</h3>
        <div>
          <label for="prof-pw-new" class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">New Password</label>
          <div class="relative">
            <input id="prof-pw-new" type="password" placeholder="Min. 6 characters" autocomplete="new-password"
              class="selectable w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-10 text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <button type="button" onclick="Auth.togglePass('prof-pw-new',this)" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-white text-sm select-none">👁</button>
          </div>
        </div>
        <div>
          <label for="prof-pw-confirm" class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Confirm New Password</label>
          <div class="relative">
            <input id="prof-pw-confirm" type="password" placeholder="Repeat new password" autocomplete="new-password"
              class="selectable w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-10 text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <button type="button" onclick="Auth.togglePass('prof-pw-confirm',this)" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-white text-sm select-none">👁</button>
          </div>
        </div>
        <p id="prof-pw-error" class="text-red-500 text-xs hidden"></p>
        <button data-label="Change Password" onclick="_saveProfilePassword(this)"
          class="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl text-sm transition-colors">Change Password</button>

        <!-- ⚠ The parent PIN had NO control anywhere. _promptSetParentPin() was
             its only entry point, it ran once from _openParentDashboard(), and it
             returns early when a PIN already exists - so dismissing that one
             prompt meant never being able to set one, and setting one meant never
             being able to change it. This is that control.

             It lives in localStorage, which is scoped to the ORIGIN and the
             browser profile - not to the device - so the row says "in this
             browser". A parent who set a PIN on a preview deploy URL and then
             opens production is asked to create one again, and so is anyone
             who switches browser or opens a private window. -->
        <div class="pt-3 mt-1 border-t border-gray-100 dark:border-gray-700">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <div class="text-sm font-semibold text-gray-800 dark:text-white">🔢 Parent PIN</div>
              <p id="prof-pin-state" class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed"></p>
            </div>
            <div class="flex gap-2 shrink-0">
              <button id="prof-pin-set" onclick="_setParentPinFromSettings()"
                class="text-xs font-bold px-3 py-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/60 transition-colors whitespace-nowrap"></button>
              <button id="prof-pin-clear" onclick="_clearParentPinFromSettings()"
                class="hidden text-xs font-bold px-3 py-2 rounded-xl bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/60 transition-colors whitespace-nowrap">Remove</button>
            </div>
          </div>
        </div>
        ${biometricHtml}
      </div>

      ${familyHtml}
      ${coparentHtml}
      ${appearanceHtml}
      ${notifyHtml}
      ${defaultsHtml}
      ${referralHtml}
      ${dangerHtml}
    </div>`;

  // After the markup exists: this row reports BROWSER-LOCAL state (whether a
  // PIN is stored in this browser's localStorage), so it cannot be baked into
  // the template string above with the rest of the account settings.
  _renderParentPinRow();
  _renderCoparents();
}

// ── Parents on this account ────────────────────────────────────────────────
// A family has one owner (families.parent_id) and up to two co-parents. A
// co-parent signs in with THEIR OWN email and password and gets the same
// dashboard, the same children and the same reports - the alternative people
// actually resort to is sharing one password, which also hands over the forum
// identity, the credits balance and the ability to delete the account.
//
// The one asymmetry: only the owner manages membership. Otherwise a co-parent
// could remove the owner from the family that is keyed on their own user id.
async function _renderCoparents() {
  const card = document.getElementById('coparent-card');
  if (!card) return;

  const info = await Store.listFamilyMembers();

  // null is a transport failure, not an empty family. Rendering "just you" on
  // a dropped request would invite a second invite for a co-parent who is
  // already there, and the cap would then refuse it with no explanation.
  if (!info || !info.ok) {
    card.innerHTML = _coparentShell(`
      <p class="text-xs text-gray-500 dark:text-gray-400">Could not load this list.</p>
      <button onclick="_renderCoparents()" class="text-xs font-semibold text-indigo-500 hover:text-indigo-400">Try again</button>`);
    return;
  }

  const members = Array.isArray(info.members) ? info.members : [];
  const isOwner = !!info.is_owner;
  const cap     = info.cap || 3;
  const full    = members.length >= cap;

  const rows = members.map(m => {
    const owner = m.role === 'owner';
    const badge = owner
      ? '<span class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">Owner</span>'
      : '<span class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">Parent</span>';
    // The owner can remove any co-parent; anyone can remove themselves (leave).
    const canRemove = !owner && (isOwner || m.is_me);
    const label = m.is_me ? 'Leave this account' : 'Remove';
    return `
      <div class="flex items-center justify-between gap-3 py-2">
        <div class="min-w-0">
          <div class="text-sm font-semibold text-gray-800 dark:text-white truncate">
            ${_attr(m.name || 'Parent')}${m.is_me ? ' <span class="font-normal text-gray-400">(you)</span>' : ''}
          </div>
          <div class="mt-0.5">${badge}</div>
        </div>
        ${canRemove ? `<button onclick="_removeCoparent('${_attr(m.user_id)}', this)"
          class="shrink-0 text-xs font-semibold text-red-500 hover:text-red-400 px-2 py-1">${label}</button>` : ''}
      </div>`;
  }).join('');

  let actions = '';
  if (!isOwner) {
    actions = '<p class="text-xs text-gray-500 dark:text-gray-400">Only the account owner can invite or remove parents.</p>';
  } else if (info.pending) {
    const exp = new Date(info.pending.expires_at);
    const when = isNaN(exp) ? '' : ` It stops working on ${exp.toLocaleDateString()}.`;
    actions = `
      <div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 space-y-2">
        <p class="text-xs text-amber-800 dark:text-amber-300">An invite link is waiting to be used.${when}</p>
        <div class="flex gap-2">
          <button onclick="_shareCoparentLink(this)" class="flex-1 px-3 py-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-xl text-xs transition-colors">Send a new link</button>
          <button onclick="_revokeCoparent(this)" class="px-3 py-2 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 font-semibold rounded-xl text-xs">Cancel it</button>
        </div>
      </div>`;
  } else if (full) {
    actions = `<p class="text-xs text-gray-500 dark:text-gray-400">This account is full (${cap} parents).</p>`;
  } else {
    actions = `
      <div class="rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 p-3">
        <p class="text-sm font-bold text-indigo-900 dark:text-indigo-100 mb-2">Share this family account in 3 steps</p>
        <ol class="space-y-1 text-xs text-indigo-800 dark:text-indigo-200 list-decimal list-inside">
          <li>Create a secure invite link below.</li>
          <li>Send it to the other parent (WhatsApp works well).</li>
          <li>They open it, then sign in or create their own account.</li>
        </ol>
      </div>
      <button onclick="_shareCoparentLink(this)" data-label="Invite another parent - create secure link"
        class="w-full px-4 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-xl text-sm transition-colors">
        1. Invite another parent - create secure link
      </button>
      <p class="text-xs text-gray-500 dark:text-gray-400">
        They use their own email and password, not yours. The link works once and expires in 48 hours.
      </p>`;
  }

  card.innerHTML = _coparentShell(`
    <div class="divide-y divide-gray-100 dark:divide-gray-700">${rows}</div>
    ${actions}`);
}

function _coparentShell(inner) {
  return `<h3 class="text-sm font-bold text-gray-800 dark:text-white mb-1">👨‍👩‍👧‍👦 Share parent access</h3>
    <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Give another parent their own secure login to this family's children and progress.</p>
    <div class="space-y-3">${inner}</div>`;
}

// The link carries a one-shot token, never a password, so it is safe to send
// over WhatsApp - which is how it will actually be sent here. Copy is the
// fallback wherever navigator.share is missing.
async function _shareCoparentLink(btn) {
  const old = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = 'Creating…'; }

  const res = await Store.createCoparentInvite(48);
  if (btn) { btn.disabled = false; btn.textContent = old; }

  if (!res || !res.ok) {
    toast({
      not_owner:   'Only the account owner can invite another parent.',
      cap_reached: 'This account already has the maximum number of parents.',
      offline:     'Could not create the link. Check your connection.',
    }[res && res.error] || 'Could not create the invite link.', 4000);
    return;
  }

  const link = `${location.origin}${location.pathname}?coparent=${res.token}`;
  const fam  = (typeof Auth !== 'undefined' && Auth.getFamily) ? Auth.getFamily() : null;
  const msg  = `Join me on PSAC Practice so we can both follow the children's revision.\n\n`
             + `Open this link, then sign in or create your own account:\n${link}\n\n`
             + `It works once and expires in 48 hours.`;

  if (navigator.share) {
    try { await navigator.share({ title: `${fam?.family_name || 'Our family'} on PSAC Practice`, text: msg }); _renderCoparents(); return; }
    catch (e) { if (e.name === 'AbortError') { _renderCoparents(); return; } }
  }
  try { await navigator.clipboard.writeText(link); toast('Invite link copied - send it to them. 📋', 3500); }
  catch (_) { prompt('Copy this invite link and send it to them:', link); }
  _renderCoparents();
}

async function _revokeCoparent(btn) {
  if (btn) { btn.disabled = true; }
  const res = await Store.revokeCoparentInvite();
  if (btn) { btn.disabled = false; }
  toast(res && res.ok ? 'Invite link cancelled.' : 'Could not cancel that link.', 3000);
  _renderCoparents();
}

// _confirmModal is callback-based, not a promise.
function _removeCoparent(userId, btn) {
  const leaving = !!btn && /Leave/i.test(btn.textContent);
  _confirmModal(
    leaving
      ? 'Leave this account? You will lose access to these children and their reports. The account owner can invite you back.'
      : 'Remove this parent? They will immediately lose access to the children and reports on this account.',
    () => _doRemoveCoparent(userId, leaving),
    { icon: leaving ? '👋' : '⚠️', okLabel: leaving ? 'Leave' : 'Remove', danger: true }
  );
}

async function _doRemoveCoparent(userId, leaving) {
  const res = await Store.removeFamilyMember(userId);
  if (!res || !res.ok) {
    toast({
      cannot_remove_owner: 'The account owner cannot be removed.',
      not_authorised:      'Only the account owner can remove another parent.',
      offline:             'Could not save that. Check your connection.',
    }[res && res.error] || 'Could not remove that parent.', 4000);
    return;
  }

  // Leaving revokes this session's own access, so there is nothing left to
  // render - send them back out rather than to a dashboard that is now empty.
  if (res.left) {
    toast('You have left the account.', 3000);
    if (typeof Auth !== 'undefined' && Auth.logout) { await Auth.logout(); return; }
  }
  toast('Parent removed.', 2500);
  _renderCoparents();
}

// ── Parent settings handlers ───────────────────────────────────────────────
async function _savePrefs(patch) {
  const profile = typeof Auth !== 'undefined' ? Auth.getParentProfile() : null;
  if (!profile) return { ok: false };
  _parentPrefs = Object.assign({}, _parentPrefs, patch);
  return Store.saveMyPreferences(profile.id, _parentPrefs);
}

function _setParentTheme(pref) {
  setThemePreference(pref);
  document.querySelectorAll('[data-theme-opt]').forEach(b => {
    const on = b.dataset.themeOpt === pref;
    b.classList.toggle('border-indigo-500',        on);
    b.classList.toggle('bg-indigo-50',             on);
    b.classList.toggle('dark:bg-indigo-900/30',    on);
    b.classList.toggle('text-indigo-700',          on);
    b.classList.toggle('dark:text-indigo-300',     on);
    b.classList.toggle('border-gray-200',         !on);
    b.classList.toggle('dark:border-gray-600',    !on);
    b.classList.toggle('text-gray-500',           !on);
    b.classList.toggle('dark:text-gray-400',      !on);
  });
  _savePrefs({ theme: pref });
}

async function _toggleWeeklyDigest(el) {
  const on = !!el.checked;
  const res = await _savePrefs({ weekly_digest: on });
  if (!res.ok) {
    el.checked = !on;
    toast('Could not save - check your connection.', 2500);
    return;
  }
  toast(on ? '📧 Weekly email on.' : '📧 Weekly email off.', 1800);
}

async function _saveFamilyName(btn) {
  const input = document.getElementById('set-family-name');
  const name  = (input?.value || '').trim();
  if (!name) { toast('Family name cannot be blank.', 2000); return; }
  const family = typeof Auth !== 'undefined' ? Auth.getFamily() : null;
  if (!family) return;
  // Telling a parent to pass a new family name to their children when the
  // rename never reached the database locks every child out - the login lookup
  // joins on this exact string.
  const res = await Store.updateFamilyName(family.id, name);
  if (!res?.ok) {
    if (input) input.value = family.family_name || '';
    // 23505 = another family already answers to this name. Children log in with
    // it, so two families cannot share one - say which problem this is rather
    // than blaming the connection.
    toast(res?.code === '23505'
      ? 'Another family already uses that name. Please choose a different one.'
      : 'Could not save the family name - check your connection and try again.', 4000);
    return;
  }
  family.family_name = name;
  const disp = document.getElementById('pd-family-name-display');
  if (disp) disp.textContent = name;
  _profileSaved(btn);
  toast('Family name updated - tell your children the new name. 👨‍👩‍👧', 3500);
}

// Loops the children rather than doing one bulk write: push-subscribe is a
// per-student endpoint and enforces ownership per request.
async function _applyReminderToAll(btn) {
  const time     = document.getElementById('set-reminder-all')?.value;
  const statusEl = document.getElementById('set-reminder-status');
  if (!time) { if (statusEl) statusEl.textContent = 'Pick a time first.'; return; }
  const children = (typeof Auth !== 'undefined' && Auth.getStudents) ? (Auth.getStudents() || []) : [];
  if (!children.length) return;

  if (statusEl) statusEl.textContent = 'Saving…';
  let ok = 0;
  for (const c of children) {
    try {
      const res = await fetch('/.netlify/functions/push-subscribe', {
        method: 'POST',
        headers: await _pushAuthHeaders(),
        body: JSON.stringify({ studentId: c.id, reminderTime: time }),
      });
      if (res.ok) ok++;
    } catch (_) {}
  }
  await _savePrefs({ reminder_time: time });
  if (statusEl) {
    statusEl.textContent = ok === children.length
      ? `Reminder set for ${time} MU time on all ${ok} ${ok === 1 ? 'child' : 'children'}. ✅`
      : `Saved for ${ok} of ${children.length}. The rest need notifications enabled on their device.`;
  }
  _profileSaved(btn);
}

async function _clearReminderForAll() {
  const statusEl = document.getElementById('set-reminder-status');
  const children = (typeof Auth !== 'undefined' && Auth.getStudents) ? (Auth.getStudents() || []) : [];
  if (statusEl) statusEl.textContent = 'Clearing…';
  for (const c of children) {
    try {
      await fetch('/.netlify/functions/push-subscribe', {
        method: 'POST',
        headers: await _pushAuthHeaders(),
        body: JSON.stringify({ studentId: c.id, reminderTime: null }),
      });
    } catch (_) {}
  }
  await _savePrefs({ reminder_time: null });
  const t = document.getElementById('set-reminder-all');
  if (t) t.value = '';
  if (statusEl) statusEl.textContent = 'Reminders cleared for all children.';
}

async function _applyDefaultsToAll(btn) {
  const children = (typeof Auth !== 'undefined' && Auth.getStudents) ? (Auth.getStudents() || []) : [];
  if (!children.length) return;
  const statusEl = document.getElementById('set-defaults-status');

  const picked = document.querySelector('input[name="set-def-diff"]:checked');
  const defaults = {
    maxDifficulty:      picked ? parseInt(picked.value) : 4,
    examDisabled:      !document.getElementById('set-def-exam')?.checked,
    allowedGrades:     [...document.querySelectorAll('[data-def-grade]')]
                         .filter(el => el.checked).map(el => Number(el.dataset.defGrade)).sort((a, b) => a - b),
    hintsDisabled:     !document.getElementById('set-def-hints')?.checked,
  };
  // The two booleans this list replaced, kept in step so a device still running
  // the old shell reads the same permission. Derived, never authored.
  if (typeof GradeAccess !== 'undefined') Object.assign(defaults, GradeAccess.flagsFor(defaults.allowedGrades));

  if (statusEl) statusEl.textContent = 'Applying…';
  const failed = [];
  for (const c of children) {
    // Merge, never replace: lockedChapters and anything else already in this
    // child's settings must survive.
    const merged = Object.assign({ lockedChapters: [] }, c.settings || {}, defaults);
    const res = await Store.updateStudent(c.id, { settings: merged });
    // A child whose write failed keeps its old settings in the cache too -
    // otherwise the dashboard would show limits the child is not actually under.
    if (!res?.ok) { failed.push(c.display_name || c.username); continue; }
    c.settings = merged;
    // The parent may be looking at one of these children in the detail panel;
    // DB.restrictions is that child's live copy, so keep it in step.
    if (typeof ACTIVE_STUDENT_ID !== 'undefined' && ACTIVE_STUDENT_ID === c.id) DB.restrictions = merged;
  }

  await _savePrefs({ child_defaults: defaults });
  if (failed.length) {
    if (statusEl) statusEl.textContent = `Could not apply to ${failed.join(', ')}. Please try again. ⚠️`;
    toast('Some children could not be updated - check your connection.', 3500);
    return;
  }
  if (statusEl) statusEl.textContent = `Applied to all ${children.length} ${children.length === 1 ? 'child' : 'children'}. ✅`;
  _profileSaved(btn);
}

// Two-step on purpose: a confirm() alone is one stray tap away from wiping a
// family's entire history, and there is no undo on the other side of it.
async function _confirmDeleteAccount() {
  const children = (typeof Auth !== 'undefined' && Auth.getStudents) ? (Auth.getStudents() || []) : [];
  const kids = children.length
    ? `\n\nThis also closes ${children.length} child ${children.length === 1 ? 'account' : 'accounts'}: ${children.map(c => c.display_name || c.username).join(', ')}.`
    : '';
  if (!confirm(`Close your account?${kids}\n\nYou will be signed out and the app will look empty. Nothing is erased - sign in again with the same email and you can restore everything.`)) return;

  const typed = prompt('Type DELETE (in capitals) to confirm.');
  if ((typed || '').trim() !== 'DELETE') { toast('Cancelled - your account is untouched.', 2500); return; }

  toast('Closing your account…', 3000);
  const res = await Store.deleteMyAccount();
  if (!res.ok) {
    const msg = res.error === 'admin_cannot_self_delete'
      ? 'Admin accounts cannot be closed from here.'
      : 'Could not close the account. Please try again or contact support.';
    toast(msg, 4000);
    return;
  }
  try { await _sb?.auth.signOut(); } catch (_) {}
  try { localStorage.clear(); } catch (_) {}
  location.reload();
}

async function _saveProfileName(btn) {
  const input = document.getElementById('prof-name-input');
  const name  = (input?.value || '').trim();
  if (!name) { toast('Name cannot be blank.', 2000); return; }
  if (!_sb) return;
  const profile = typeof Auth !== 'undefined' ? Auth.getParentProfile() : null;
  if (!profile) return;
  const { error } = await _sb.from('profiles').update({ full_name: name }).eq('id', profile.id);
  if (error) { toast('Could not save. Please try again.', 2500); return; }
  profile.full_name = name;
  const hdrNm = document.getElementById('header-profile-name');
  if (hdrNm) hdrNm.textContent = name;
  const hdrAv = document.getElementById('header-profile-avatar');
  if (hdrAv) hdrAv.textContent = name[0].toUpperCase();
  const avatarDiv = document.querySelector('#screen-profile .text-2xl.font-black');
  if (avatarDiv) avatarDiv.textContent = name[0].toUpperCase();
  _profileSaved(btn);
}

async function _saveProfilePassword(btn) {
  if (!_sb) return;
  const pass = (document.getElementById('prof-pw-new')?.value     || '').trim();
  const conf = (document.getElementById('prof-pw-confirm')?.value || '').trim();
  const errEl = document.getElementById('prof-pw-error');
  const showErr = msg => { if (errEl) { errEl.textContent = msg; errEl.classList.remove('hidden'); } };
  if (errEl) errEl.classList.add('hidden');
  if (pass.length < 6) { showErr('Password must be at least 6 characters.'); return; }
  if (pass !== conf)   { showErr('Passwords do not match.'); return; }
  // - The second of the two password forms. A session minted from four digits
  // must not be able to replace the password those digits stood in for - see
  // Auth.isPinOnlySession(). Both copies check, or the guard is decorative.
  if (typeof Auth !== 'undefined' && Auth.isPinOnlySession?.()) {
    showErr(Auth.pinOnlyPasswordMessage()); return;
  }
  const { error } = await _sb.auth.updateUser({ password: pass });
  if (error) { showErr(error.message); return; }
  const pwNew  = document.getElementById('prof-pw-new');
  const pwConf = document.getElementById('prof-pw-confirm');
  if (pwNew)  pwNew.value  = '';
  if (pwConf) pwConf.value = '';
  _profileSaved(btn);
}
