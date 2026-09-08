'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 8 - Mathematics   ·   SYLLABUS ONLY, NO QUESTIONS YET
//
//  Chapters below are the real MIE lower-secondary syllabus, taken from the
//  National Curriculum Framework / Teaching and Learning Syllabus, Grades 7 to 9
//  (Nine-Year Continuous Basic Education, MIE). The exam at the end of Grade 9
//  is the NCE, not the PSAC.
//
//  ⚠ comingSoon STAYS true until real questions land. It makes
//    activateSubjectPack() refuse the pack, keeps it out of QuestionLoader's
//    per-grade fetch and out of assembleExamPaper(), and renders the grade card
//    as "Coming Soon" and disabled. Real chapters are NOT on their own a reason
//    to flip it - a child opening a chapter with no questions is worse than a
//    card that says the pack is not ready.
//
//  TO FILL THIS IN
//    1. Write questions/ch01_*.js files, using subjects/grade4-maths as the
//       model. IDs: g8m-<chapter>-001 style. Every question needs a
//       `subsection:` tag, and every tagged id must also be declared in
//       G8M_SYLLABUS below - the two must match exactly per chapter.
//    2. Add each new file to LOCAL_FILES in engine/question_loader.js (file://
//       dev only - production auto-discovers) and bump _CACHE_VERSION.
//    3. Delete questions/ch01_sample.js.
//    4. Set comingSoon: false only once every chapter above has questions.
// ══════════════════════════════════════════════════════════════════════════

// Sub-topics for the Syllabus screen. Deliberately EMPTY: a subsection id
// declared here with no questions behind it advertises a topic that opens
// empty. Add ids only as questions are written and tagged.
const G8M_SYLLABUS = {};

registerSubject({
  id: 'grade8-maths', name: 'Mathematics', grade: 8, icon: '🔢', subject: 'Maths',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: true,
  practiceble: true, notesBased: false, level4Label: 'Word Problems',
  syllabus: G8M_SYLLABUS,
  chapters: [
    { id: 'g8m-sequences',              name: 'Sequences',                            icon: '🔢', examWeight: 3,
      syllabus: 'Recognise and continue number sequences. Describe the rule of a sequence in words. Find a given term of a sequence. Generate a sequence from a given rule.' },
    { id: 'g8m-indices',                name: 'Indices, Square Roots & Cube Roots',   icon: '🔣', examWeight: 3,
      syllabus: 'Use index notation with whole numbers. Find square roots and cube roots. Apply the laws of indices. Evaluate expressions involving powers and roots.' },
    { id: 'g8m-rate',                   name: 'Rate & Proportion',                    icon: '⚖️', examWeight: 3,
      syllabus: 'Understand rate as a comparison of two quantities. Work with direct proportion. Solve problems involving rates such as price per unit. Use proportion in everyday contexts.' },
    { id: 'g8m-finance',                name: 'Personal & Household Finance',         icon: '💰', examWeight: 3,
      syllabus: 'Calculate simple interest. Work out discount, profit and loss. Read and interpret bills and household accounts. Solve problems involving budgeting.' },
    { id: 'g8m-polygons',               name: 'Polygons',                             icon: '📐', examWeight: 3,
      syllabus: 'Calculate interior and exterior angles of polygons. Use the angle sum of a polygon. Identify the properties of regular polygons. Solve problems involving angles in polygons.' },
    { id: 'g8m-coordinates',            name: 'Coordinates',                          icon: '📍', examWeight: 3,
      syllabus: 'Plot points in all four quadrants. Find the midpoint of a line segment. Plot and interpret linear graphs. Use coordinates to solve geometric problems.' },
    { id: 'g8m-circles',                name: 'Circles',                              icon: '⭕', examWeight: 3,
      syllabus: 'Identify the parts of a circle. Calculate the circumference of a circle. Calculate the area of a circle. Solve everyday problems involving circles.' },
    { id: 'g8m-surface-area',           name: 'Surface Area',                         icon: '🧊', examWeight: 3,
      syllabus: 'Find the surface area of cubes and cuboids. Use nets to work out surface area. Calculate the surface area of prisms. Solve problems involving surface area.' },
    { id: 'g8m-volume',                 name: 'Volume',                               icon: '📦', examWeight: 3,
      syllabus: 'Calculate the volume of cubes and cuboids. Convert between units of volume. Find the volume of prisms. Solve everyday problems involving volume.' },
    { id: 'g8m-algebra',                name: 'Algebraic Expressions',                icon: '🔤', examWeight: 4,
      syllabus: 'Expand brackets in algebraic expressions. Factorise simple expressions. Simplify algebraic fractions. Solve linear equations containing brackets.' },
    { id: 'g8m-statistics',             name: 'Statistics',                           icon: '📊', examWeight: 3,
      syllabus: 'Draw and interpret pie charts. Calculate the mean, median and mode. Compare two sets of data. Interpret graphs to draw conclusions.' },
  ],
});
