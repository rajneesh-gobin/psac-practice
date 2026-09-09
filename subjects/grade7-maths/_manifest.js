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
const G7M_SYLLABUS = {
  'g7m-integers': { subsections: [
    { id:'number_types', name:'Types of Numbers' },
    { id:'number_line',  name:'The Number Line' },
    { id:'operations',   name:'Integer Operations' },
  ]},
  'g7m-operations': { subsections: [
    { id:'order_operations', name:'Order of Operations' },
    { id:'properties',       name:'Properties of Operations' },
    { id:'brackets',         name:'Expressions with Brackets' },
  ]},
  'g7m-indices': { subsections: [
    { id:'index_notation',      name:'Index Notation' },
    { id:'prime_factorisation', name:'Prime Factorisation' },
    { id:'evaluating_powers',   name:'Evaluating Powers' },
  ]},
  'g7m-factors': { subsections: [
    { id:'divisibility',  name:'Divisibility Rules' },
    { id:'hcf_lcm',       name:'HCF and LCM' },
    { id:'prime_factors', name:'Prime Factors' },
  ]},
  'g7m-fractions': { subsections: [
    { id:'comparing_fractions',  name:'Comparing Fractions' },
    { id:'converting',           name:'Converting Fractions & Decimals' },
    { id:'operations_fractions', name:'Operations with Fractions' },
  ]},
  'g7m-percentages': { subsections: [
    { id:'percent_basics',   name:'Percentage Basics' },
    { id:'percent_quantity', name:'Percentage of a Quantity' },
    { id:'percent_problems', name:'Percentage Problems' },
  ]},
  'g7m-ratio': { subsections: [
    { id:'simplifying_ratio', name:'Simplifying Ratios' },
    { id:'dividing_ratio',    name:'Dividing in a Ratio' },
    { id:'proportion',        name:'Proportion' },
  ]},
  'g7m-polygons': { subsections: [
    { id:'classifying_polygons',      name:'Classifying Polygons' },
    { id:'angles_polygons',           name:'Angles in Polygons' },
    { id:'triangles_quadrilaterals',  name:'Triangles & Quadrilaterals' },
  ]},
  'g7m-coordinates': { subsections: [
    { id:'plotting_points',    name:'Plotting Points' },
    { id:'quadrants',          name:'The Four Quadrants' },
    { id:'shapes_coordinates', name:'Shapes from Coordinates' },
  ]},
  'g7m-constructions': { subsections: [
    { id:'using_instruments',      name:'Using Instruments' },
    { id:'parallel_perpendicular', name:'Parallel & Perpendicular Lines' },
    { id:'bisecting',              name:'Bisecting Lines & Angles' },
  ]},
  'g7m-symmetry': { subsections: [
    { id:'lines_symmetry',       name:'Lines of Symmetry' },
    { id:'completing_figures',   name:'Completing Figures' },
    { id:'rotational_symmetry',  name:'Rotational Symmetry' },
  ]},
  'g7m-transformation': { subsections: [
    { id:'reflection',  name:'Reflection' },
    { id:'translation', name:'Translation' },
    { id:'congruence',  name:'Congruence' },
  ]},
  'g7m-mass': { subsections: [
    { id:'units_mass',     name:'Units of Mass' },
    { id:'converting_mass', name:'Converting Mass' },
    { id:'mass_problems',  name:'Mass Problems' },
  ]},
  'g7m-length': { subsections: [
    { id:'units_length',     name:'Units of Length' },
    { id:'perimeter',        name:'Perimeter' },
    { id:'distance_problems', name:'Distance Problems' },
  ]},
  'g7m-area': { subsections: [
    { id:'rectangle_area',  name:'Area of Rectangles & Squares' },
    { id:'triangle_area',   name:'Area of Triangles' },
    { id:'compound_shapes', name:'Compound Shapes' },
  ]},
  'g7m-time': { subsections: [
    { id:'reading_time',   name:'Reading & Writing Time' },
    { id:'time_intervals', name:'Time Intervals' },
    { id:'timetables',     name:'Timetables' },
  ]},
  'g7m-speed': { subsections: [
    { id:'speed_formula',   name:'The Speed Formula' },
    { id:'unit_conversion', name:'Unit Conversion' },
    { id:'distance_time',   name:'Distance–Time Problems' },
  ]},
  'g7m-money': { subsections: [
    { id:'money_operations', name:'Money Operations' },
    { id:'profit_loss',      name:'Profit, Loss & Discount' },
    { id:'currency',         name:'Currency Conversion' },
  ]},
  'g7m-algebra': { subsections: [
    { id:'writing_expressions', name:'Writing Expressions' },
    { id:'simplifying',         name:'Simplifying Expressions' },
    { id:'substitution',        name:'Substitution' },
  ]},
  'g7m-equations': { subsections: [
    { id:'solving_equations', name:'Solving Equations' },
    { id:'forming_equations', name:'Forming Equations' },
    { id:'word_equations',    name:'Word Problems' },
  ]},
  'g7m-sets': { subsections: [
    { id:'set_notation',  name:'Set Notation' },
    { id:'venn_diagrams', name:'Venn Diagrams' },
    { id:'set_types',     name:'Types of Sets' },
  ]},
  'g7m-statistics': { subsections: [
    { id:'data_tables', name:'Data Tables' },
    { id:'bar_charts',  name:'Bar Charts' },
    { id:'mean',        name:'The Mean' },
  ]},
};

registerSubject({
  id: 'grade7-maths', name: 'Mathematics', grade: 7, icon: '🔢', subject: 'Maths',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: false,
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
