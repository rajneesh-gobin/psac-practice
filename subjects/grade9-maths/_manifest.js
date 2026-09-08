'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 - Mathematics   ·   SYLLABUS ONLY, NO QUESTIONS YET
//
//  Chapters below are the real MIE lower-secondary syllabus, taken from the
//  National Curriculum Framework / Teaching and Learning Syllabus, Grades 7 to 9
//  (Nine-Year Continuous Basic Education, MIE). The exam at the end of Grade 9
//  is the NCE, not the PSAC.
//
//  ⚠ VERIFIED against the syllabus PDF on 2026-09-08, not assumed. The 17
//    content areas below are §3.9 "Content Areas and Specific Learning Outcomes
//    of Mathematics for Grade 9", PDF pages 48–52 (printed 42–46), read page by
//    page. Each chapter's `syllabus` line is that content area's own specific
//    learning outcomes, not a paraphrase. See docs/nce-grade9/syllabus-map.md.
//
//  ⚠ FOUR CONTENT AREAS WERE MISSING and every one of them is examined:
//    Coordinates (2025 Q18, Q29), Matrices (2025 Q4, Q16), Algebraic
//    manipulation (2025 Q23) and Simultaneous Equations (2025 Q25, and 2024
//    Q31 at 6 marks - the second-heaviest question on that paper).
//
//  ⚠ g9m-number-revision IS NOT A GRADE 9 SYLLABUS AREA, deliberately.
//    Measured on the 2025 paper, about 30 of the 100 marks are Grade 7–8
//    arithmetic, fractions, percentages, ratio and metric conversion. A
//    Grade 9-only chapter list cannot cover a third of the paper, so the
//    revision chapter exists and carries the heaviest weight.
//
//  ⚠ examWeight is DERIVED FROM MEASURED MARKS, not guessed - roughly the
//    2025 paper's marks for that content area, halved. g9m-surface-area scored
//    0 marks in 2025 and is floored at 2 anyway: one year is not a weighting,
//    and it is a full syllabus content area.
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
//       model. IDs: g9m-<chapter>-001 style. Every question needs a
//       `subsection:` tag, and every tagged id must also be declared in
//       G9M_SYLLABUS below - the two must match exactly per chapter.
//    2. Add each new file to LOCAL_FILES in engine/question_loader.js (file://
//       dev only - production auto-discovers) and bump _CACHE_VERSION.
//    3. Delete questions/ch01_sample.js.
//    4. Set comingSoon: false only once every chapter above has questions.
//    5. Re-run node scripts/build-subject-index.js after ANY chapter change.
// ══════════════════════════════════════════════════════════════════════════

// Sub-topics for the Syllabus screen. Deliberately EMPTY: a subsection id
// declared here with no questions behind it advertises a topic that opens
// empty. Add ids only as questions are written and tagged.
// ⚠ INVARIANT: a subsection declared here MUST have questions tagged with
//   it, and every tagged subsection MUST be declared here. A declared id
//   with nothing behind it opens an empty screen; a tagged id that is not
//   declared hides those questions from the Syllabus screen entirely.
//   scripts/test-grade9-maths-content.js asserts both directions.
//
// ⚠ Only chapters that have content are listed. The other 16 chapters are
//   deliberately absent rather than declared-and-empty.
const G9M_SYLLABUS = {
  'g9m-indices': { subsections: [
    { id: 'laws', name: 'Laws of indices: multiplication, division, power and zero index' },
    { id: 'negative_indices', name: 'Negative indices' },
  ] },
  'g9m-number-revision': { subsections: [
    { id: 'fractions_decimals_percentages', name: 'Fractions, decimals and percentages' },
    { id: 'ratio_and_measures', name: 'Ratio, proportion, conversion and number properties' },
  ] },
  'g9m-vectors': { subsections: [
    { id: 'column_vectors', name: 'Column vectors, arithmetic and magnitude' },
    { id: 'translation', name: 'Translation: image, object and translation vector' },
  ] },
  'g9m-patterns': { subsections: [
    { id: 'sequences_and_figures', name: 'Number patterns, growing figures and the nth term' },
  ] },
  'g9m-finance': { subsections: [
    { id: 'salaries_and_bills', name: 'Salaries, hire purchase, simple interest and utility bills' },
  ] },
  'g9m-capacity': { subsections: [
    { id: 'units_and_problems', name: 'Millilitres, centilitres and litres, and capacity from volume' },
  ] },
  'g9m-matrices': { subsections: [
    { id: 'order_types_operations', name: 'Order, types of matrix, and matrix arithmetic' },
  ] },
  'g9m-inequalities': { subsections: [
    { id: 'solve_and_represent', name: 'Solving inequalities and showing them on a number line' },
  ] },
  'g9m-manipulation': { subsections: [
    { id: 'formulae_and_subject', name: 'Evaluating a formula and changing its subject' },
  ] },
  'g9m-expressions': { subsections: [
    { id: 'binomials_and_factorising', name: 'Expanding binomials, perfect squares and factorising' },
  ] },
  'g9m-quadratics': { subsections: [
    { id: 'factorise_and_solve', name: 'Factorising and solving quadratic equations' },
  ] },
  'g9m-simultaneous': { subsections: [
    { id: 'solve_simultaneous', name: 'Solving simultaneous linear equations' },
  ] },
  'g9m-surface-area': { subsections: [
    { id: 'nets_and_surface_area', name: 'Nets, circles, and the surface area of prisms and cylinders' },
  ] },
  'g9m-geometry-revision': { subsections: [
    { id: 'grade7_8_geometry', name: 'Angles, sets and Venn diagrams, compound shapes and pie charts' },
  ] },
  'g9m-trigonometry': { subsections: [
    { id: 'ratios_and_2d_problems', name: 'Sine, cosine and tangent in two dimensions' },
  ] },
  'g9m-probability': { subsections: [
    { id: 'simple_and_combined_events', name: 'Simple and combined events, and possibility diagrams' },
  ] },
  'g9m-statistics': { subsections: [
    { id: 'frequency_and_averages', name: 'Frequency tables, mean, median, mode and range' },
  ] },
  'g9m-volume': { subsections: [
    { id: 'prisms_and_cylinders', name: 'Volume of a right prism and a cylinder' },
  ] },
  'g9m-coordinates': { subsections: [
    { id: 'gradient', name: 'Gradient of a straight line' },
    { id: 'equation_of_line', name: 'The equation y = mx + c' },
  ] },
};

registerSubject({
  id: 'grade9-maths', name: 'Mathematics', grade: 9, icon: '🔢', subject: 'Maths',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: false,
  practiceble: true, notesBased: false, level4Label: 'Word Problems',
  syllabus: G9M_SYLLABUS,
  chapters: [
    // ── NUMBERS ─────────────────────────────────────────────────────
    { id: 'g9m-number-revision', name: 'Number Revision (Grades 7-8)',    icon: '🧮', examWeight: 8,
      syllabus: "Revise the Grade 7 and 8 number work the NCE keeps testing: the four operations, fractions, decimals, percentages, ratio and proportion, order of operations, metric conversion, factors, multiples, primes, squares and roots. Not a Grade 9 content area - it is here because roughly 30 of the 100 marks on the paper are exactly this material." },
    { id: 'g9m-indices',         name: 'Indices',                         icon: '🔣', examWeight: 2,
      syllabus: "Rewrite a term in negative power into positive power and vice versa. Recognise and apply the multiplication and division laws of indices, including negative powers. Identify and use the power law of indices. Understand and use the zero index law. Solve simple equations involving indices." },
    { id: 'g9m-patterns',        name: 'Patterns & Sequences',            icon: '🔢', examWeight: 1,
      syllabus: "Identify and complete Pascal's triangle. Extend given number patterns and figures and find the general term. Find the relation between ordered pairs of a sequence, including positive and negative numbers." },
    { id: 'g9m-finance',         name: 'Personal & Household Finance',    icon: '💰', examWeight: 3,
      syllabus: "Solve simple problems on salaries, wages and hire purchase. Interpret and use tables and charts, for example CEB and CWA bills." },
    // ── GEOMETRY ────────────────────────────────────────────────────
    { id: 'g9m-geometry-revision', name: 'Geometry Revision (Grades 7-8)', icon: '📏', examWeight: 4,
      syllabus: "Revise the Grade 7 and 8 geometry the NCE keeps testing: angles at a point and on a straight line, angles on parallel lines, sets and Venn diagrams, the area and perimeter of compound shapes, and reading and calculating pie-chart angles. Not a Grade 9 content area - it is here because the papers test it every year while the Grade 9 syllabus lists only trigonometry, coordinates and vectors under Geometry." },
    { id: 'g9m-trigonometry',    name: 'Trigonometry',                    icon: '📐', examWeight: 2,
      syllabus: "Recognise and apply the sine, cosine and tangent ratios for acute angles. Solve trigonometric problems in two dimensions to find unknown sides and angles. Angle of elevation and depression are excluded at Grade 9." },
    { id: 'g9m-coordinates',     name: 'Coordinates & Straight Lines',    icon: '📈', examWeight: 4,
      syllabus: "Find and interpret the gradient of inclined, horizontal and vertical lines. Find the relationship between parallel lines and their gradients. Determine the equation of a straight line in the form y = mx + c, given the gradient and a point, or given two points. Solve problems involving straight line graphs in practical situations." },
    { id: 'g9m-vectors',         name: 'Vectors & Translation',           icon: '➡️', examWeight: 4,
      syllabus: "Distinguish between a scalar and a vector quantity. Express a vector in column form. Find the magnitude of a vector. Describe a translation by a vector, and find the image, the object or the translation vector when the other two are given. Add, subtract and scale column vectors - the papers ask for this even though the Grade 9 syllabus does not list it." },
    // ── MEASUREMENT ─────────────────────────────────────────────────
    { id: 'g9m-surface-area',    name: 'Surface Area',                    icon: '🧊', examWeight: 2,
      syllabus: "Understand nets of a cylinder and of a right prism. Find the circumference and the area of a circle. Find the surface area of a cylinder - closed, semi-open and hollow - and of a right prism. Solve problems involving surface area." },
    { id: 'g9m-volume',          name: 'Volume',                          icon: '📦', examWeight: 4,
      syllabus: "Find the volume of a cylinder and of a right prism. Solve problems involving the volume of a cylinder and a right prism." },
    { id: 'g9m-capacity',        name: 'Capacity',                        icon: '🥤', examWeight: 1,
      syllabus: "Distinguish among millilitres, centilitres and litres. Convert between units of capacity. Calculate the capacity of a given container. Solve problems involving capacity and volume." },
    // ── ALGEBRA ─────────────────────────────────────────────────────
    { id: 'g9m-expressions',     name: 'Algebraic Expressions',           icon: '🔤', examWeight: 3,
      syllabus: "Identify a binomial expression. Use area tables and the distributive law to find the product of binomial expressions. Expand and use perfect squares. Factorise the difference of two squares and use it to factorise binomials. Work with algebraic fractions." },
    { id: 'g9m-matrices',        name: 'Matrices',                        icon: '🔲', examWeight: 1,
      syllabus: "Interpret a matrix as a store of information. Determine the order of a matrix. Identify null, zero, square, identity, equal and diagonal matrices. Add, subtract and multiply matrices. Solve a matrix equation by addition and subtraction." },
    { id: 'g9m-quadratics',      name: 'Quadratics',                      icon: '🅰️', examWeight: 2,
      syllabus: "Identify a quadratic expression and a quadratic equation. Factorise a quadratic expression of the form ax2 + bx + c. Solve quadratic equations by factorisation where a = 1, including those involving algebraic fractions. Formulate and solve problems leading to quadratic equations." },
    { id: 'g9m-manipulation',    name: 'Formulae & Changing the Subject', icon: '🔧', examWeight: 2,
      syllabus: "Evaluate an unknown quantity in a given formula or equation. Change the subject of a formula." },
    { id: 'g9m-inequalities',    name: 'Inequalities',                    icon: '📉', examWeight: 2,
      syllabus: "Solve linear inequalities and give the solution in set-builder notation. Represent a solution set on a number line." },
    { id: 'g9m-simultaneous',    name: 'Simultaneous Equations',          icon: '⚖️', examWeight: 2,
      syllabus: "Identify and use simultaneous equations. Solve simultaneous linear equations by the graphical, substitution or elimination method. Form and solve simultaneous equations arising from a word problem." },
    // ── STATISTICS & PROBABILITY ────────────────────────────────────
    { id: 'g9m-statistics',      name: 'Statistics',                      icon: '📊', examWeight: 2,
      syllabus: "Use raw data to construct a frequency table, restricted to ungrouped data. Determine the mean, median and mode for an ungrouped frequency distribution using a frequency table. Read and complete statistical tables and bar charts." },
    { id: 'g9m-probability',     name: 'Probability',                     icon: '🎲', examWeight: 3,
      syllabus: "Understand the terms probability, sample space, outcome and event, including simple events, combined events and the complement. Find the probability of simple and combined events. Construct and use simple possibility diagrams to find probabilities." },
  ],
});
