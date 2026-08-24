'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice Engine — Subject Registry (Phase 2)
//  Subject packs call registerSubject() on load.
//  Future subject selector iterates SUBJECT_PACKS.
// ══════════════════════════════════════════════

const SUBJECT_PACKS = [];
function registerSubject(pack) {
  // Save an immutable copy of chapters so CHAPTERS global can be safely mutated later
  pack._chapters = Array.isArray(pack.chapters) ? pack.chapters.slice() : [];
  SUBJECT_PACKS.push(pack);
}
