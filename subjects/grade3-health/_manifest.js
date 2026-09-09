'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 3 - Health Education   ·   PLACEHOLDER PACK
//
//  ⚠ comingSoon: true keeps this pack invisible to children and out of
//    QuestionLoader / assembleExamPaper until real content lands.
//    Flip it to false ONLY when this pack has real chapters and questions.
//
//  TO FILL THIS IN
//    1. Replace the sample chapter with real MIE chapters (id, name, icon,
//       examWeight, syllabus prose).
//    2. Write questions/ch01_*.js. IDs: g3he-samp-001 style.
//    3. Add files to LOCAL_FILES in engine/question_loader.js and bump
//       _CACHE_VERSION.
//    4. Delete questions/ch01_sample.js.
//    5. Set comingSoon: false.
// ══════════════════════════════════════════════════════════════════════════

const G3HE_SYLLABUS = {};

registerSubject({
  id:         'grade3-health',
  name:       'Health Education',
  grade:      3,
  icon:       '❤️',
  subject:    'Health Education',
  curriculum: 'MIE Mauritius',
  comingSoon: true,
  syllabus:   G3HE_SYLLABUS,
  chapters: [
    { id: 'g3he-sample', name: 'Sample Chapter', icon: '📝', examWeight: 0,
      syllabus: '' },
  ],
});
