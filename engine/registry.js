'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice Engine - Subject Registry
//  Subject packs call registerSubject() on load.
//
//  A pack MAY supply its own badges / syllabus / formulas / generators / help.
//  All five are optional: a pack that omits them simply has none, and the app
//  falls back to empty defaults. Nothing here is subject-specific.
// ══════════════════════════════════════════════

const SUBJECT_PACKS = [];

// ── The active pack's chapters ─────────────────
// ⚠ MUTATED IN PLACE by activateSubjectPack(), never reassigned: modules
// captured this reference at load time and a reassignment would leave them all
// looking at the old array.
//
// ⚠ It starts EMPTY. With no subject chosen there are no chapters, and a
// fallback here is exactly how a Grade 4 child tapping Science once got Grade 5
// Maths.
//
// ⚠ It lives HERE, not in a pack. It used to be declared at the top of
// subjects/grade5-maths/_manifest.js, which made one arbitrary subject pack a
// load-bearing dependency of app.js - and made lazy pack loading impossible,
// because deferring that one pack would leave app.js referencing an undeclared
// global. registry.js already read CHAPTERS (the all_rounder badge below), so
// the declaration belonged here all along.
const CHAPTERS = [];

// ── Generic badges ─────────────────────────────
// Earned the same way in every subject, so they live in the engine rather than
// in any one pack. Subject-specific badges are appended from the active pack.
// IDs are permanent: they are stored in DB.badges and must never be reused or
// renamed, or previously-earned badges will silently disappear.
const GENERIC_BADGES = [
  { id:'first_blood', name:'First Step',  icon:'👣', desc:'Answer your first question',   cond: s => s.totalAttempted >= 1 },
  { id:'sharp_mind',  name:'Sharp Mind',  icon:'🧠', desc:'Get 10 correct in a row',      cond: s => s.maxStreak >= 10 },
  { id:'speed_demon', name:'Speed Demon', icon:'⚡', desc:'Complete a Quick Drill',       cond: s => s.examCount >= 1 },
  { id:'exam_ace',    name:'Exam Ace',    icon:'🏆', desc:'Score 90%+ on a Full Mock',    cond: s => s.bestScore >= 90 },
  { id:'century',     name:'Centurion',   icon:'💯', desc:'Attempt 100 questions',        cond: s => s.totalAttempted >= 100 },
  { id:'daily_hero',  name:'Daily Hero',  icon:'🔥', desc:'Maintain a 7-day streak',      cond: s => s.streak >= 7 },
  { id:'all_rounder', name:'All Rounder', icon:'🌟', desc:'Practise every chapter',
    cond: (s, c) => CHAPTERS.length > 0 && CHAPTERS.every(ch => c[ch.id] && c[ch.id].attempted > 0) },
];

// ── Registration ───────────────────────────────
function registerSubject(pack) {
  // Immutable copy of chapters, so the mutable global CHAPTERS can be swapped
  // per subject without corrupting the pack.
  pack._chapters = Array.isArray(pack.chapters) ? pack.chapters.slice() : [];

  // Optional per-subject content. Defaulting here means every read site can
  // assume the key exists, so no caller needs a typeof guard.
  pack.badges     = Array.isArray(pack.badges) ? pack.badges : [];
  pack.syllabus   = pack.syllabus   || {};   // chapterId -> { subsections: [...] }
  pack.formulas   = pack.formulas   || {};   // chapterId -> { title, facts: [...] }
  pack.generators = pack.generators || {};   // chapterId -> (level) => question
  pack.help       = pack.help       || {};   // chapterId -> { videoId, title, channel, bullets }

  const i = SUBJECT_PACKS.findIndex(p => p.id === pack.id);
  if (i === -1) { SUBJECT_PACKS.push(pack); return pack; }

  // Re-registration: the pack's real _manifest.js has arrived over the lite
  // entry that subjects/_index.js registered at boot.
  //
  // ⚠ MUTATE the existing object; do not replace the array slot. Callers hold
  // references to it - ACTIVE_PACK among them - so swapping the slot would
  // leave the open subject pointing at the lite copy for the rest of the
  // session, with no chapter prose and no generators.
  const existing = SUBJECT_PACKS[i];
  Object.assign(existing, pack);
  existing._lite = false;

  // ⚠ If this pack is the one on screen, refresh the live CHAPTERS list too.
  // activateSubjectPack() ran while the pack was still lite, so CHAPTERS holds
  // the lite chapter objects - same ids, but no syllabus prose behind them.
  if (typeof ACTIVE_PACK !== 'undefined' && ACTIVE_PACK === existing) {
    CHAPTERS.length = 0;
    existing._chapters.forEach(ch => CHAPTERS.push(ch));
  }
  return existing;
}

// Attach extras to an already-registered pack. Needed when content lives in a
// separate file that loads after the manifest (e.g. grade5-maths/help.js).
function extendSubject(packId, extras) {
  const p = SUBJECT_PACKS.find(x => x.id === packId);
  if (!p) { console.warn('[extendSubject] unknown pack:', packId); return null; }
  Object.assign(p, extras || {});
  return p;
}

// ── Active-pack accessors ──────────────────────
// Every read of subject content goes through these, so switching subject
// switches badges, syllabus, formulas, generators and help together.
function _registryActivePack() {
  // _activePack() lives in app.js, which loads after this file - resolve it at
  // call time, not load time.
  if (typeof _activePack === 'function') return _activePack();
  if (typeof ACTIVE_PACK !== 'undefined' && ACTIVE_PACK) return ACTIVE_PACK;
  return SUBJECT_PACKS.find(p => !p.comingSoon) || SUBJECT_PACKS[0] || null;
}

function packBadges() {
  const p = _registryActivePack();
  return GENERIC_BADGES.concat((p && p.badges) || []);
}
function packSyllabus()   { const p = _registryActivePack(); return (p && p.syllabus)   || {}; }
function packFormulas()   { const p = _registryActivePack(); return (p && p.formulas)   || {}; }
function packGenerators() { const p = _registryActivePack(); return (p && p.generators) || {}; }
function packHelp()       { const p = _registryActivePack(); return (p && p.help)       || {}; }

// ── Lazy pack loading ──────────────────────────
// index.html loads ONE subject script: the generated subjects/_index.js, which
// registers all 45 packs with their chapter lists but without chapter prose,
// subsection maps, generators, badges, formulas or help. Measured: 39.9 KB and
// one request, against 323 KB across 45 blocking requests before this existed.
//
// Everything outside the active pack (admin _allChapters, Shop.sellableChapters,
// the plan chapter picker, reports, calendar, search, the grade and subject
// pickers) reads a chapter's id, name and icon only - checked, not assumed -
// so the index alone satisfies them. The rest arrives here.
const PackLoader = (() => {
  const _inflight = new Map();   // packId -> Promise

  function _inject(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      // ⚠ async=false keeps injected scripts in insertion order. We also chain
      // them below, because a pack's extras (grade5-maths/help.js) call
      // extendSubject() and must run after the manifest that registers it.
      s.async = false;
      s.onload = () => resolve(src);
      s.onerror = () => reject(new Error('could not load ' + src));
      document.head.appendChild(s);
    });
  }

  function _find(packId) {
    return SUBJECT_PACKS.find(p => p.id === packId) || null;
  }

  function isLoaded(packId) {
    const p = _find(packId);
    return !!p && !p._lite;
  }

  // Resolves with the pack once its full manifest is in. Safe to call for an
  // already-loaded pack, an unknown id, or twice concurrently.
  function ensure(packId) {
    const pack = _find(packId);
    if (!pack) return Promise.resolve(null);
    if (!pack._lite) return Promise.resolve(pack);
    if (_inflight.has(packId)) return _inflight.get(packId);

    const srcs = [pack._src].concat(pack._extra || []).filter(Boolean);
    if (!srcs.length) return Promise.resolve(pack);

    let chain = Promise.resolve();
    srcs.forEach(src => { chain = chain.then(() => _inject(src)); });

    const done = chain.then(() => _find(packId) || pack).catch(err => {
      // ⚠ Drop the cached promise so a retry can succeed. Keeping it would turn
      // one dropped request into a permanently prose-less subject for the whole
      // session - the same defect QuestionLoader._done was fixed for.
      _inflight.delete(packId);
      console.warn('[PackLoader]', err && err.message);
      throw err;
    });
    _inflight.set(packId, done);
    return done;
  }

  // Every pack of one grade. Used where a child's grade is known before any
  // subject is picked. Individual failures resolve to null rather than
  // rejecting the batch: one missing subject must not block the other four.
  function ensureGrade(grade) {
    return Promise.all(
      SUBJECT_PACKS.filter(p => String(p.grade) === String(grade))
        .map(p => ensure(p.id).catch(() => null))
    );
  }

  return { ensure, ensureGrade, isLoaded };
})();
if (typeof window !== 'undefined') window.PackLoader = PackLoader;

// ── ROLE MODULES — the admin, teacher and forum code, fetched on demand ──────
//
// These eight files are 0.48 MB of source (126 KB brotli) and EVERY CHILD used
// to download and parse them on first load, for screens they can never open.
// They are now injected only when someone actually goes to one of those screens.
//
// ⚠ Same shape as PackLoader deliberately, and for the same reasons: one cached
//   promise per group so a double tap loads once, `async = false` plus an
//   explicit chain so the files keep the ORDER they had as <script> tags in
//   index.html, and a FAILED load drops the cached promise so a retry can
//   succeed — keeping it would turn one dropped request into a permanently
//   broken admin panel for the rest of the session.
// ⚠ The order below is the order index.html used. teacher.js depends on the
//   four modules above it and teacher_classroom_detail.js on teacher.js; that
//   was previously guaranteed by tag order alone and is now written down.
// ⚠ Nothing here may be loaded on a CHILD's path. Verified before splitting:
//   every reference to these globals from an earlier-loading file is already
//   behind `typeof X !== 'undefined'`, all 81 inline handlers in index.html sit
//   INSIDE their own screen, and the only unguarded-looking uses
//   (TeacherMode.getAttemptCount / hasRetry / saveResult in the assignment
//   flow) are reached through renderAssignmentEntrance(), which nothing calls.
const RoleModules = (() => {
  const GROUPS = {
    admin:   ['engine/admin.js'],
    forum:   ['engine/forum.js'],
    teacher: [
      'engine/teacher_insights.js',
      'engine/teacher_home.js',
      'engine/teacher_workspace.js',
      'engine/teacher_guest_classes.js',
      'engine/teacher.js',
      'engine/teacher_classroom_detail.js',
    ],
    // Science Labs (NCE only): just the shared shell. It fetches each lab's own
    // files (data, bench, stylesheet) when that lab is opened - see
    // Labs.LABS / _ensure() in lab_core.js - so the hub costs one file.
    labs: [
      'engine/labs/lab_study.js',
      'engine/labs/lab_core.js',
    ],
  };
  const READY = {
    admin:   () => typeof AdminPanel !== 'undefined',
    forum:   () => typeof Forum !== 'undefined',
    teacher: () => typeof TeacherMode !== 'undefined' && typeof TeacherClassroomDetail !== 'undefined',
    labs:    () => typeof Labs !== 'undefined',
  };
  const _inflight = new Map();

  function _inject(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = false;
      s.onload = () => resolve(src);
      s.onerror = () => reject(new Error('could not load ' + src));
      document.head.appendChild(s);
    });
  }

  function isLoaded(group) {
    return !!(READY[group] && READY[group]());
  }

  function ensure(group) {
    if (!GROUPS[group]) return Promise.resolve(false);
    if (isLoaded(group)) return Promise.resolve(true);
    if (_inflight.has(group)) return _inflight.get(group);

    let chain = Promise.resolve();
    GROUPS[group].forEach(src => { chain = chain.then(() => _inject(src)); });

    const done = chain.then(() => isLoaded(group)).catch(err => {
      _inflight.delete(group);
      console.warn('[RoleModules]', group, err && err.message);
      return false;
    });
    _inflight.set(group, done);
    return done;
  }

  // Render once the group is in. Used by showScreen and by the auth routing:
  // the screen is shown immediately and fills in when its code arrives, which
  // is the same trade the lazy subject packs already make.
  function withGroup(group, fn) {
    return ensure(group).then(ok => { if (ok) { try { fn(); } catch (e) { console.warn('[RoleModules]', group, e); } } return ok; });
  }

  return { ensure, isLoaded, withGroup, GROUPS };
})();
if (typeof window !== 'undefined') window.RoleModules = RoleModules;
