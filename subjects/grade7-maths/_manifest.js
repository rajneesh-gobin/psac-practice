'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 7 — Mathematics   ·   PLACEHOLDER PACK
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
// STAGE: lower secondary. ⚠ TWO THINGS TO SETTLE BEFORE FILLING THIS IN:
//   1. The exam at the end of Grade 9 is the NCE, NOT the PSAC. The app's
//      branding, the past-papers screen and `curriculum` below all say PSAC.
//   2. The subject list here is a PLACEHOLDER copy of the primary five. The
//      real MIE lower-secondary list differs (Science splits, and Computer
//      Science / Business / Design & Technology enter). Confirm against the
//      MIE syllabus and add or remove packs before writing any questions.
//
//  TO FILL THIS IN
//    1. Replace the one sample chapter below with the real MIE chapters.
//       Each needs: id, name, icon, examWeight, and a prose `syllabus` —
//       one idea per sentence (_syllabusPoints splits on sentences).
//    2. Write questions/ch01_*.js files following subjects/grade4-maths as the
//       model. IDs: g7m-samp-001 style. Every question needs a `subsection:`
//       tag that matches an id declared in G7M_SYLLABUS below.
//    3. Add each new file to LOCAL_FILES in engine/question_loader.js (for
//       file:// dev only — production auto-discovers) and bump _CACHE_VERSION.
//    4. Delete questions/ch01_sample.js.
//    5. Set comingSoon: false.
// ══════════════════════════════════════════════════════════════════════════

// Sub-topics for the Syllabus screen. Deliberately EMPTY: an id declared here
// with no questions behind it advertises a topic that opens empty, which is
// worse than no subsections at all. Add ids only as questions are tagged.
const G7M_SYLLABUS = {};

registerSubject({
  id:         'grade7-maths',
  name:       'Mathematics',
  grade:      7,
  icon:       '🔢',
  subject:    'Maths',
  curriculum: 'MIE Mauritius',
  comingSoon: true,
  syllabus:   G7M_SYLLABUS,
  chapters: [
    // One placeholder so the shape is copyable. examWeight: 0 keeps it out of
    // exam papers even if comingSoon is flipped before real content lands.
    { id: 'g7m-sample', name: 'Sample Chapter', icon: '📝', examWeight: 0,
      syllabus: '' },
  ],
});
