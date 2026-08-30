'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 1 — Français   ·   PLACEHOLDER PACK
//
//  Registered so the plumbing exists: the grade picker, the admin Content tab,
//  the shop catalogue, the question bundler and the DB importer all discover
//  grades from SUBJECT_PACKS / the subjects/ directory, so nothing else has to
//  be edited when this is filled in.
//
//  ⚠ comingSoon: true is what makes this safe to ship empty. It makes
//    activateSubjectPack() refuse the pack, keeps it out of QuestionLoader's
//    per-grade fetch and out of assembleExamPaper(), and renders the grade card
//    as "Coming Soon" and disabled. Flip it to false ONLY when this pack has
//    real chapters and real questions.
//
// STAGE: Mauritian primary, lower years. Same MIE track as Grades 4-6,
// so the five subjects and the PSAC framing below are correct.
// ⚠ Grades 1-2 will need a picture-first question mode before this is
//   opened to children — the current renderer assumes the child can read
//   the question and all four options. See CLAUDE.md.
//
//  TO FILL THIS IN
//    1. Replace the one sample chapter below with the real MIE chapters.
//       Each needs: id, name, icon, examWeight, and a prose `syllabus` —
//       one idea per sentence (_syllabusPoints splits on sentences).
//    2. Write questions/ch01_*.js files following subjects/grade4-maths as the
//       model. IDs: g1fr-samp-001 style. Every question needs a `subsection:`
//       tag that matches an id declared in G1FR_SYLLABUS below.
//    3. Add each new file to LOCAL_FILES in engine/question_loader.js (for
//       file:// dev only — production auto-discovers) and bump _CACHE_VERSION.
//    4. Delete questions/ch01_sample.js.
//    5. Set comingSoon: false.
// ══════════════════════════════════════════════════════════════════════════

// Sub-topics for the Syllabus screen. Deliberately EMPTY: an id declared here
// with no questions behind it advertises a topic that opens empty, which is
// worse than no subsections at all. Add ids only as questions are tagged.
const G1FR_SYLLABUS = {};

registerSubject({
  id:         'grade1-french',
  name:       'Français',
  grade:      1,
  icon:       '🇫🇷',
  subject:    'French',
  curriculum: 'MIE Mauritius',
  comingSoon: true,
  syllabus:   G1FR_SYLLABUS,
  chapters: [
    // One placeholder so the shape is copyable. examWeight: 0 keeps it out of
    // exam papers even if comingSoon is flipped before real content lands.
    { id: 'g1fr-sample', name: 'Sample Chapter', icon: '📝', examWeight: 0,
      syllabus: '' },
  ],
});
