'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 7 - Mathematics   ·   SYLLABUS ONLY, NO QUESTIONS YET
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
//       model. IDs: g7m-<chapter>-001 style. Every question needs a
//       `subsection:` tag, and every tagged id must also be declared in
//       G7M_SYLLABUS below - the two must match exactly per chapter.
//    2. Add each new file to LOCAL_FILES in engine/question_loader.js (file://
//       dev only - production auto-discovers) and bump _CACHE_VERSION.
//    3. Delete questions/ch01_sample.js.
//    4. Set comingSoon: false only once every chapter above has questions.
// ══════════════════════════════════════════════════════════════════════════

// Sub-topics for the Syllabus screen. Deliberately EMPTY: a subsection id
// declared here with no questions behind it advertises a topic that opens
// empty. Add ids only as questions are written and tagged.
const G7M_SYLLABUS = {};

registerSubject({
  id: 'grade7-maths', name: 'Mathematics', grade: 7, icon: '🔢', subject: 'Maths',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: true,
  practiceble: true, notesBased: false, level4Label: 'Word Problems',
  syllabus: G7M_SYLLABUS,
  chapters: [
    { id: 'g7m-integers',               name: 'Integers',                                   icon: '🔢', examWeight: 3,
      syllabus: 'Identify even, odd, prime, composite, triangular and square numbers. Represent integers on a number line. Order and compare positive and negative integers. Add, subtract, multiply and divide integers.' },
    { id: 'g7m-operations',             name: 'Order & Properties of Operations',           icon: '➗', examWeight: 3,
      syllabus: 'Apply the order of operations to numerical expressions. Use the commutative, associative and distributive properties. Evaluate expressions involving brackets.' },
    { id: 'g7m-indices',                name: 'Indices Convention',                         icon: '🔣', examWeight: 2,
      syllabus: 'Write repeated multiplication in index form. Read and interpret index notation. Evaluate powers of whole numbers. Express a number as a product of prime factors in index form.' },
    { id: 'g7m-factors',                name: 'Factors, Multiples & Prime Factorisation',   icon: '🧮', examWeight: 3,
      syllabus: 'Apply common divisibility tests. Find the factors and multiples of a given number. Find the prime factors of a number. Write a number as a product of its prime factors.' },
    { id: 'g7m-fractions',              name: 'Fractions & Decimals',                       icon: '½', examWeight: 4,
      syllabus: 'Compare and order fractions and decimals. Convert between fractions and decimals. Add, subtract, multiply and divide fractions. Perform the four operations on decimals.' },
    { id: 'g7m-percentages',            name: 'Percentages',                                icon: '％', examWeight: 3,
      syllabus: 'Understand percentage as a fraction out of one hundred. Convert between fractions, decimals and percentages. Find a percentage of a quantity. Solve everyday problems involving percentages.' },
    { id: 'g7m-ratio',                  name: 'Ratio & Proportion',                         icon: '⚖️', examWeight: 3,
      syllabus: 'Understand ratio and direct proportion. Compare two quantities multiplicatively. Simplify a ratio to its lowest terms. Divide a quantity in a given ratio.' },
    { id: 'g7m-polygons',               name: 'Polygons',                                   icon: '📐', examWeight: 3,
      syllabus: 'Name and classify polygons by their number of sides. Identify the properties of triangles and quadrilaterals. Calculate unknown angles in polygons. Recognise regular and irregular polygons.' },
    { id: 'g7m-coordinates',            name: 'Coordinates',                                icon: '📍', examWeight: 2,
      syllabus: 'Plot and read points in the Cartesian plane. Use ordered pairs to describe position. Identify the four quadrants. Plot simple shapes from given coordinates.' },
    { id: 'g7m-constructions',          name: 'Geometrical Constructions',                  icon: '📏', examWeight: 2,
      syllabus: 'Use ruler, set squares, protractor, compasses and dividers. Construct parallel and perpendicular lines. Construct and bisect angles. Use digital geometry tools.' },
    { id: 'g7m-symmetry',               name: 'Symmetry',                                   icon: '🦋', examWeight: 2,
      syllabus: 'Identify lines of symmetry in shapes. Complete a figure given its line of symmetry. Recognise rotational symmetry. Describe the order of rotational symmetry.' },
    { id: 'g7m-transformation',         name: 'Transformation',                             icon: '🔄', examWeight: 2,
      syllabus: 'Describe and perform reflections. Describe and perform translations. Identify the image of a shape after a transformation. Recognise congruence under transformation.' },
    { id: 'g7m-mass',                   name: 'Mass',                                       icon: '🏋️', examWeight: 2,
      syllabus: 'Distinguish between milligram, gram, kilogram and tonne. Convert between units of mass. Add, subtract, multiply and divide quantities of mass. Solve everyday problems involving mass.' },
    { id: 'g7m-length',                 name: 'Length',                                     icon: '📏', examWeight: 2,
      syllabus: 'Convert between units of length. Estimate and measure lengths. Perform calculations with lengths. Solve problems involving perimeter and distance.' },
    { id: 'g7m-area',                   name: 'Area',                                       icon: '▭', examWeight: 3,
      syllabus: 'Calculate the area of rectangles, squares and triangles. Convert between units of area. Find the area of compound shapes. Solve everyday problems involving area.' },
    { id: 'g7m-time',                   name: 'Time',                                       icon: '⏰', examWeight: 2,
      syllabus: 'Read and write time in 12-hour and 24-hour notation. Add and subtract intervals of time. Convert between units of time. Interpret timetables.' },
    { id: 'g7m-speed',                  name: 'Speed',                                      icon: '🚗', examWeight: 2,
      syllabus: 'Understand speed and average speed. Convert compound units such as metres per second into kilometres per hour. Calculate speed, distance or time. Solve everyday problems involving speed.' },
    { id: 'g7m-money',                  name: 'Money',                                      icon: '💰', examWeight: 2,
      syllabus: 'Perform the four operations with money. Convert between currencies. Calculate profit, loss and discount. Solve everyday problems involving money.' },
    { id: 'g7m-algebra',                name: 'Algebraic Expressions',                      icon: '🔤', examWeight: 3,
      syllabus: 'Use letters to represent unknown numbers. Write and simplify algebraic expressions. Substitute values into an expression. Add and subtract like terms.' },
    { id: 'g7m-equations',              name: 'Algebraic Equations',                        icon: '🟰', examWeight: 3,
      syllabus: 'Distinguish between an algebraic expression and an equation. Understand additive and multiplicative inverses. Solve simple linear equations. Form and solve equations from word problems.' },
    { id: 'g7m-sets',                   name: 'Sets',                                       icon: '🔗', examWeight: 2,
      syllabus: 'Understand the idea of a set and its elements. Recognise equal, equivalent and disjoint sets. Use set notation. Represent sets with Venn diagrams.' },
    { id: 'g7m-statistics',             name: 'Statistics',                                 icon: '📊', examWeight: 3,
      syllabus: 'Collect and organise data into tables. Draw and interpret bar charts and pictograms. Read information from graphs. Find the mean of a set of values.' },
  ],
});
