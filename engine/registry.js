'use strict';
// ══════════════════════════════════════════════
//  MathMaster Engine — Subject Registry (Phase 2)
//  Subject packs call registerSubject() on load.
//  Future subject selector iterates SUBJECT_PACKS.
// ══════════════════════════════════════════════

const SUBJECT_PACKS = [];
function registerSubject(pack) { SUBJECT_PACKS.push(pack); }
