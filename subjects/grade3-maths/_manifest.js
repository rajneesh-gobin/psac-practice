'use strict';

const G3M_SYLLABUS = {
  'g3mth-numbers': { subsections: [
    { id: 'place_value_hto',   name: 'Place Value (H, T, O)' },
    { id: 'ordering_rounding', name: 'Ordering & Rounding' },
    { id: 'comparing',         name: 'Comparing Numbers' },
  ]},
  'g3mth-addition': { subsections: [
    { id: 'adding_2digit',     name: 'Adding 2-Digit Numbers' },
    { id: 'adding_3digit',     name: 'Adding 3-Digit Numbers' },
    { id: 'add_word_problems', name: 'Addition Word Problems' },
  ]},
  'g3mth-subtraction': { subsections: [
    { id: 'subtracting_2digit', name: 'Subtracting 2-Digit Numbers' },
    { id: 'subtracting_3digit', name: 'Subtracting 3-Digit Numbers' },
    { id: 'sub_word_problems',  name: 'Subtraction Word Problems' },
  ]},
  'g3mth-multiplication': { subsections: [
    { id: 'times_2_to_5',    name: '× Tables 2–5' },
    { id: 'times_6_to_10',   name: '× Tables 6–10' },
    { id: 'multiply_2digit', name: 'Multiplying 2-Digit × 1-Digit' },
  ]},
  'g3mth-division': { subsections: [
    { id: 'sharing_equally', name: 'Sharing Equally' },
    { id: 'dividing_simple', name: 'Dividing by 2, 3, 4, 5, 10' },
    { id: 'mult_div_link',   name: 'Multiplication & Division Link' },
  ]},
  'g3mth-fractions': { subsections: [
    { id: 'halves_quarters',       name: 'Halves and Quarters' },
    { id: 'thirds_three_quarters', name: 'Thirds and Three-Quarters' },
    { id: 'ordering_fractions',    name: 'Ordering Fractions' },
  ]},
  'g3mth-measurement': { subsections: [
    { id: 'length_m_cm',  name: 'Length (m and cm)' },
    { id: 'mass_kg_g',    name: 'Mass (kg and g)' },
    { id: 'capacity_l_ml', name: 'Capacity (L and ml)' },
  ]},
  'g3mth-geometry': { subsections: [
    { id: 'shapes_properties', name: '2D and 3D Shapes' },
    { id: 'angles_symmetry',   name: 'Angles and Symmetry' },
    { id: 'perimeter_area',    name: 'Perimeter and Area' },
  ]},
  'g3mth-time': { subsections: [
    { id: 'reading_clock',  name: 'Reading the Clock' },
    { id: 'elapsed_time',   name: 'Elapsed Time' },
    { id: 'calendar_dates', name: 'Calendar and Dates' },
  ]},
};

registerSubject({
  id:         'grade3-maths',
  name:       'Mathematics',
  grade:      3,
  icon:       '🔢',
  subject:    'Maths',
  curriculum: 'MIE Mauritius',
  comingSoon: false,
  syllabus:   G3M_SYLLABUS,
  chapters: [
    { id: 'g3mth-numbers',       name: 'Numbers to 1000',             icon: '🔢', examWeight: 3,
      syllabus: 'Read, write and order numbers up to 1000. Understand place value: hundreds, tens and ones. Round numbers to the nearest 10. Compare numbers using >, < and =.' },
    { id: 'g3mth-addition',      name: 'Addition with Regrouping',    icon: '➕', examWeight: 3,
      syllabus: 'Add 2-digit numbers with carrying. Add 3-digit numbers using the column method. Solve addition word problems.' },
    { id: 'g3mth-subtraction',   name: 'Subtraction with Regrouping', icon: '➖', examWeight: 3,
      syllabus: 'Subtract 2-digit numbers with borrowing. Subtract 3-digit numbers using the column method. Solve subtraction word problems.' },
    { id: 'g3mth-multiplication', name: 'Multiplication Tables',      icon: '✖️', examWeight: 3,
      syllabus: 'Know multiplication tables from 2 to 10 by heart. Multiply a 2-digit number by a 1-digit number.' },
    { id: 'g3mth-division',      name: 'Division',                    icon: '➗', examWeight: 2,
      syllabus: 'Divide by 2, 3, 4, 5 and 10. Understand the link between multiplication and division. Solve division word problems.' },
    { id: 'g3mth-fractions',     name: 'Fractions',                   icon: '½', examWeight: 2,
      syllabus: 'Find ½, ¼, ¾ and ⅓ of shapes and of whole numbers. Order fractions. Recognise equivalent fractions.' },
    { id: 'g3mth-measurement',   name: 'Measurement',                 icon: '📏', examWeight: 2,
      syllabus: 'Convert between m and cm, kg and g, L and ml. Calculate the perimeter of rectangles.' },
    { id: 'g3mth-geometry',      name: 'Geometry',                    icon: '🔷', examWeight: 2,
      syllabus: 'Identify right angles and types of angles. Draw lines of symmetry. Name 2D and 3D shapes and their properties. Find area by counting squares.' },
    { id: 'g3mth-time',          name: 'Time and Calendar',           icon: '🕐', examWeight: 2,
      syllabus: 'Read the time to the nearest 5 minutes. Understand a.m. and p.m. Calculate elapsed time. Use a calendar.' },
  ],
});
