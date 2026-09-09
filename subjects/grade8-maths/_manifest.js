'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 8 - Mathematics   ·   11 original + 5 new chapters (2026-09-09)
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
const G8M_SYLLABUS = {
  'g8m-real-numbers': { subsections: [
    { id: 'rational_irrational', name: 'Rational & Irrational Numbers' },
    { id: 'surds',               name: 'Surds and Square Roots' },
    { id: 'real_number_line',    name: 'The Real Number Line' },
  ]},
  'g8m-pythagoras': { subsections: [
    { id: 'pythagoras_theorem',  name: "Pythagoras' Theorem" },
    { id: 'find_hypotenuse',     name: 'Finding the Hypotenuse' },
    { id: 'find_shorter_side',   name: 'Finding a Shorter Side' },
  ]},
  'g8m-inequalities': { subsections: [
    { id: 'inequality_notation',  name: 'Inequality Notation' },
    { id: 'solving_inequalities', name: 'Solving Inequalities' },
    { id: 'inequality_graphs',    name: 'Graphing on a Number Line' },
  ]},
  'g8m-sets': { subsections: [
    { id: 'set_notation',       name: 'Set Notation' },
    { id: 'union_intersection', name: 'Union and Intersection' },
    { id: 'venn_diagrams',      name: 'Venn Diagrams' },
  ]},
  'g8m-constructions': { subsections: [
    { id: 'construct_triangles', name: 'Constructing Triangles' },
    { id: 'given_conditions',    name: 'Given Sides and Angles' },
    { id: 'construct_problems',  name: 'Construction Problems' },
  ]},
  'g8m-sequences': { subsections: [
    { id:'continuing_sequences', name:'Continuing Sequences' },
    { id:'sequence_rules',       name:'Sequence Rules' },
    { id:'nth_term',             name:'The nth Term' },
  ]},
  'g8m-indices': { subsections: [
    { id:'index_laws',        name:'Laws of Indices' },
    { id:'square_cube_roots', name:'Square & Cube Roots' },
    { id:'evaluating_indices', name:'Evaluating Indices' },
  ]},
  'g8m-rate': { subsections: [
    { id:'unit_rates',       name:'Unit Rates' },
    { id:'direct_proportion', name:'Direct Proportion' },
    { id:'rate_problems',    name:'Rate Problems' },
  ]},
  'g8m-finance': { subsections: [
    { id:'simple_interest',       name:'Simple Interest' },
    { id:'profit_loss_discount',  name:'Profit, Loss & Discount' },
    { id:'bills_budgeting',       name:'Bills & Budgeting' },
  ]},
  'g8m-polygons': { subsections: [
    { id:'interior_exterior_angles', name:'Interior & Exterior Angles' },
    { id:'angle_sum',                name:'Angle Sum of Polygons' },
    { id:'regular_polygons',         name:'Regular Polygons' },
  ]},
  'g8m-coordinates': { subsections: [
    { id:'four_quadrants',  name:'The Four Quadrants' },
    { id:'midpoint',        name:'Midpoint of a Line' },
    { id:'linear_graphs',   name:'Linear Graphs' },
  ]},
  'g8m-circles': { subsections: [
    { id:'parts_circle',   name:'Parts of a Circle' },
    { id:'circumference',  name:'Circumference' },
    { id:'area_circle',    name:'Area of a Circle' },
  ]},
  'g8m-surface-area': { subsections: [
    { id:'nets',           name:'Nets of Solids' },
    { id:'cuboid_surface', name:'Surface Area of Cuboids' },
    { id:'prism_surface',  name:'Surface Area of Prisms' },
  ]},
  'g8m-volume': { subsections: [
    { id:'cuboid_volume',   name:'Volume of Cuboids' },
    { id:'unit_conversion', name:'Volume Unit Conversion' },
    { id:'prism_volume',    name:'Volume of Prisms' },
  ]},
  'g8m-algebra': { subsections: [
    { id:'expanding_brackets',  name:'Expanding Brackets' },
    { id:'factorising',         name:'Factorising' },
    { id:'algebraic_fractions', name:'Algebraic Fractions' },
  ]},
  'g8m-statistics': { subsections: [
    { id:'pie_charts',       name:'Pie Charts' },
    { id:'mean_median_mode', name:'Mean, Median & Mode' },
    { id:'comparing_data',   name:'Comparing Data' },
  ]},
};

registerSubject({
  id: 'grade8-maths', name: 'Mathematics', grade: 8, icon: '🔢', subject: 'Maths',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: false,
  practiceble: true, notesBased: false, level4Label: 'Word Problems',
  syllabus: G8M_SYLLABUS,
  chapters: [
    { id: 'g8m-real-numbers', name: 'Real Numbers', icon: '√', examWeight: 3,
      syllabus: 'Distinguish between rational and irrational numbers. Understand that surds are irrational. Simplify surds of the form √n. Place real numbers on a number line. Convert between fractions and terminating/recurring decimals.' },
    { id: 'g8m-pythagoras', name: "Pythagoras' Theorem", icon: '📐', examWeight: 4,
      syllabus: "State and apply Pythagoras' theorem: a² + b² = c². Find the length of the hypotenuse of a right-angled triangle. Find the length of a shorter side. Verify whether a triangle is right-angled. Apply the theorem to real-life problems." },
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
    { id: 'g8m-inequalities', name: 'Inequalities', icon: '≤', examWeight: 3,
      syllabus: 'Use the symbols <, >, ≤ and ≥ correctly. Solve simple linear inequalities in one variable. Represent solution sets on a number line using open and closed circles. Solve and graph compound inequalities.' },
    { id: 'g8m-sets', name: 'Sets', icon: '∪', examWeight: 3,
      syllabus: 'Use set notation: ∈, ⊆, ∪, ∩, ′. Draw and interpret Venn diagrams with two sets. Find n(A), n(B), n(A∪B) and n(A∩B). Apply the formula n(A∪B) = n(A) + n(B) − n(A∩B). Solve problems using Venn diagrams.' },
    { id: 'g8m-constructions', name: 'Construction of Triangles', icon: '📏', examWeight: 2,
      syllabus: 'Construct a triangle given three sides (SSS). Construct a triangle given two sides and an included angle (SAS). Construct a triangle given two angles and a side (ASA/AAS). State the minimum conditions needed. Verify constructions by measuring.' },
  ],
});
