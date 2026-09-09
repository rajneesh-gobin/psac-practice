'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 3 - ICT Skills   ·   PLACEHOLDER PACK
//
//  ⚠ comingSoon: true keeps this pack invisible to children and out of
//    QuestionLoader / assembleExamPaper until real content lands.
//    Flip it to false ONLY when this pack has real chapters and questions.
//
//  TO FILL THIS IN
//    1. Replace the sample chapter with real MIE chapters (id, name, icon,
//       examWeight, syllabus prose).
//    2. Write questions/ch01_*.js. IDs: g3ict-samp-001 style.
//    3. Add files to LOCAL_FILES in engine/question_loader.js and bump
//       _CACHE_VERSION.
//    4. Delete questions/ch01_sample.js.
//    5. Set comingSoon: false.
// ══════════════════════════════════════════════════════════════════════════

const G3ICT_SYLLABUS = {};

registerSubject({
  id:         'grade3-ict',
  name:       'ICT Skills',
  grade:      3,
  icon:       '💻',
  subject:    'ICT Skills',
  curriculum: 'MIE Mauritius',
  comingSoon: true,
  syllabus:   G3ICT_SYLLABUS,
  chapters: [
    { id: 'g3ict-sample', name: 'Sample Chapter', icon: '📝', examWeight: 0,
      syllabus: '' },
  ],
});
