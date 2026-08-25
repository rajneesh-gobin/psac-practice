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

  SUBJECT_PACKS.push(pack);
  return pack;
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
