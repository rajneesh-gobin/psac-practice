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
  'g3mth-pictograms': { subsections: [
    { id: 'reading_pictograms', name: 'Reading Pictograms' },
    { id: 'interpreting_data',  name: 'Interpreting Data' },
    { id: 'pictogram_problems', name: 'Pictogram Word Problems' },
  ]},
  'g3mth-ordinals': { subsections: [
    { id: 'ordinals_1_10',   name: '1st to 10th' },
    { id: 'ordinals_11_20',  name: '11th to 20th' },
    { id: 'ordinal_context', name: 'Ordinals in Context' },
  ]},
  'g3mth-roman': { subsections: [
    { id: 'roman_1_10',    name: 'Roman Numerals I to X' },
    { id: 'roman_11_20',   name: 'Roman Numerals XI to XX' },
    { id: 'roman_convert', name: 'Converting Roman Numerals' },
  ]},
  'g3mth-money': { subsections: [
    { id: 'coins_notes_100', name: 'Coins and Notes to Rs 100' },
    { id: 'money_to_1000',   name: 'Money to Rs 1000' },
    { id: 'money_problems',  name: 'Money Word Problems' },
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
    { id: 'g3mth-pictograms',   name: 'Pictograms',                  icon: '📊', examWeight: 2,
      syllabus: 'Read and interpret pictograms. Find totals from pictograms. Compare data in a pictogram. Answer questions using information from a pictogram.' },
    { id: 'g3mth-ordinals',     name: 'Ordinal Numbers',             icon: '🥇', examWeight: 2,
      syllabus: 'Use ordinal words from first to twentieth. Write ordinals as numerals: 1st–20th. Identify position in a row. Solve ordinal word problems.' },
    { id: 'g3mth-roman',        name: 'Roman Numerals',              icon: '🏛️', examWeight: 2,
      syllabus: 'Read and write Roman numerals I to XX (1–20). Convert between Roman numerals and standard digits. Recognise Roman numerals on clock faces.' },
    { id: 'g3mth-money',        name: 'Money to Rs 1000',            icon: '💰', examWeight: 3,
      syllabus: 'Identify Mauritian coins and notes. Add and subtract amounts of money. Give change. Solve money word problems using amounts up to Rs 1000.' },
  ],
});
