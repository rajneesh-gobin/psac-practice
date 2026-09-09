'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 2 - Health Education   ·   PLACEHOLDER PACK
//
//  ⚠ comingSoon: true keeps this pack invisible to children and out of
//    QuestionLoader / assembleExamPaper until real content lands.
//    Flip it to false ONLY when this pack has real chapters and questions.
//
//  ⚠ Grades 1-2 will need a picture-first question mode before this is
//    opened to children - the current renderer assumes the child can read.
//
//  TO FILL THIS IN
//    1. Replace the sample chapter with real MIE chapters (id, name, icon,
//       examWeight, syllabus prose).
//    2. Write questions/ch01_*.js. IDs: g2he-samp-001 style.
//    3. Add files to LOCAL_FILES in engine/question_loader.js and bump
//       _CACHE_VERSION.
//    4. Delete questions/ch01_sample.js.
//    5. Set comingSoon: false.
// ══════════════════════════════════════════════════════════════════════════

const G2HE_SYLLABUS = {};

registerSubject({
  id:         'grade2-health',
  name:       'Health Education',
  grade:      2,
  icon:       '❤️',
  subject:    'Health Education',
  curriculum: 'MIE Mauritius',
  comingSoon: true,
  syllabus:   G2HE_SYLLABUS,
  chapters: [
    { id: 'g2he-sample', name: 'Sample Chapter', icon: '📝', examWeight: 0,
      syllabus: '' },
  ],
});
