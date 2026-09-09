'use strict';

const G2M_SYLLABUS = {
  'g2mth-numbers': { subsections: [
    { id: 'place_value',        name: 'Tens and Ones' },
    { id: 'ordering_comparing', name: 'Ordering & Comparing' },
    { id: 'odd_even_100',       name: 'Odd and Even to 100' },
  ]},
  'g2mth-addition': { subsections: [
    { id: 'mental_addition',    name: 'Mental Addition' },
    { id: 'column_addition',    name: 'Column Addition' },
    { id: 'addition_problems',  name: 'Addition Word Problems' },
  ]},
  'g2mth-subtraction': { subsections: [
    { id: 'mental_subtraction',    name: 'Mental Subtraction' },
    { id: 'column_subtraction',    name: 'Column Subtraction' },
    { id: 'subtraction_problems',  name: 'Subtraction Word Problems' },
  ]},
  'g2mth-multiplication': { subsections: [
    { id: 'repeated_addition',  name: 'Repeated Addition' },
    { id: 'times_2',            name: '2 Times Table' },
    { id: 'times_5_10',         name: '5 and 10 Times Tables' },
  ]},
  'g2mth-fractions': { subsections: [
    { id: 'half',               name: 'One Half (½)' },
    { id: 'quarter',            name: 'One Quarter (¼)' },
    { id: 'comparing_fractions',name: 'Comparing Fractions' },
  ]},
  'g2mth-measurement': { subsections: [
    { id: 'length_cm_m',        name: 'Length (cm and m)' },
    { id: 'mass_kg',            name: 'Mass (kg)' },
    { id: 'capacity_litres',    name: 'Capacity (litres)' },
  ]},
  'g2mth-time': { subsections: [
    { id: 'days_months',        name: 'Days and Months' },
    { id: 'oclock_halfpast',    name: "O'clock and Half Past" },
    { id: 'calendar',           name: 'Reading a Calendar' },
  ]},
  'g2mth-shapes': { subsections: [
    { id: '2d_shapes',          name: '2D Shapes' },
    { id: '3d_shapes',          name: '3D Shapes' },
    { id: 'symmetry',           name: 'Lines of Symmetry' },
  ]},
  'g2mth-ordinals': { subsections: [
    { id: 'positions_1_6',    name: '1st to 6th' },
    { id: 'positions_7_12',   name: '7th to 12th' },
    { id: 'ordinal_problems', name: 'Ordinal Word Problems' },
  ]},
  'g2mth-money': { subsections: [
    { id: 'coins_notes',    name: 'Coins and Notes' },
    { id: 'counting_money', name: 'Counting Money' },
    { id: 'money_problems', name: 'Money Word Problems' },
  ]},
  'g2mth-division': { subsections: [
    { id: 'sharing_by_2',  name: 'Sharing by 2' },
    { id: 'dividing_by_2', name: 'Dividing by 2' },
    { id: 'div_word_probs', name: 'Division Word Problems' },
  ]},
};

registerSubject({
  id:         'grade2-maths',
  name:       'Mathematics',
  grade:      2,
  icon:       '🔢',
  subject:    'Maths',
  curriculum: 'MIE Mauritius',
  comingSoon: false,
  noDifficulty: false,
  syllabus:   G2M_SYLLABUS,
  chapters: [
    { id: 'g2mth-numbers',        name: 'Numbers to 100',               icon: '🔢', examWeight: 3,
      syllabus: 'Count, read and write numbers 0–100. Understand place value: tens and ones. Compare numbers using > < =. Identify odd and even numbers up to 100.' },
    { id: 'g2mth-addition',       name: 'Addition to 100',              icon: '➕', examWeight: 3,
      syllabus: 'Add multiples of 10 mentally. Add two 2-digit numbers using column method, with and without regrouping. Solve addition word problems.' },
    { id: 'g2mth-subtraction',    name: 'Subtraction to 100',           icon: '➖', examWeight: 3,
      syllabus: 'Subtract multiples of 10 mentally. Subtract two 2-digit numbers using column method, with and without regrouping. Solve subtraction word problems.' },
    { id: 'g2mth-multiplication', name: 'Introduction to Multiplication', icon: '✖️', examWeight: 2,
      syllabus: 'Understand multiplication as repeated addition: 3+3+3 = 3×3 = 9. Learn multiplication tables for 2, 5 and 10.' },
    { id: 'g2mth-fractions',      name: 'Simple Fractions',             icon: '½', examWeight: 2,
      syllabus: 'Find one half (½) of shapes and sets of objects. Find one quarter (¼) of shapes and sets. Compare: ½ is greater than ¼.' },
    { id: 'g2mth-measurement',    name: 'Measurement',                  icon: '📏', examWeight: 2,
      syllabus: 'Measure length in centimetres (cm) and metres (m). Compare masses using kilograms (kg). Measure capacity in litres (L). Know that 100 cm = 1 m.' },
    { id: 'g2mth-time',           name: 'Time',                         icon: '🕐', examWeight: 2,
      syllabus: "Name the 7 days of the week in order. Name the 12 months of the year. Read o'clock and half past on an analogue clock. Use a calendar to find dates." },
    { id: 'g2mth-shapes',         name: 'Shapes and Space',             icon: '🔷', examWeight: 2,
      syllabus: 'Describe properties of 2D shapes (sides, corners, right angles). Name 3D shapes: cube, cuboid, sphere, cylinder, cone. Identify lines of symmetry in shapes.' },
    { id: 'g2mth-ordinals',      name: 'Ordinal Numbers',              icon: '🥇', examWeight: 2,
      syllabus: 'Use ordinal words from first to twelfth. Identify position in a sequence. Write ordinals as words and numerals: 1st, 2nd … 12th. Solve simple ordinal word problems.' },
    { id: 'g2mth-money',         name: 'Money',                        icon: '💰', examWeight: 3,
      syllabus: 'Identify Mauritian coins (Re 1, Rs 2, Rs 5) and notes (Rs 10, Rs 20, Rs 50, Rs 100). Count a group of coins or notes. Calculate simple money totals and change up to Rs 100.' },
    { id: 'g2mth-division',      name: 'Division by 2',                icon: '➗', examWeight: 2,
      syllabus: 'Understand division as equal sharing. Divide even numbers up to 20 by 2. Understand the link between multiplication and division: 6 × 2 = 12, so 12 ÷ 2 = 6. Solve word problems.' },
  ],
});
