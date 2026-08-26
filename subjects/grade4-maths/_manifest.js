'use strict';

// Sub-topics for the Syllabus screen. Every entry here has questions tagged
// with the matching `subsection:` in questions/ — the screen shows a live count
// per row, so an id with nothing behind it would advertise a topic that opens
// empty. Keep the two in step: adding a subsection means tagging questions for
// it, and renaming an id means re-tagging.
const G4M_SYLLABUS = {
  'g4-numeration': { subsections: [
    { id:'place_value',    name:'Place Value & the Value of a Digit' },
    { id:'words_numerals', name:'Numbers in Words & Numerals' },
    { id:'expanded',       name:'Expanded Notation' },
    { id:'compare_order',  name:'Comparing, Ordering, Odd & Even' },
    { id:'rounding',       name:'Rounding to 10, 100, 1 000' },
    { id:'patterns',       name:'Counting On & Back, Number Patterns' },
    { id:'word_problems',  name:'Word Problems' },
  ]},
  'g4-four-ops': { subsections: [
    { id:'add_sub',        name:'Addition & Subtraction' },
    { id:'multiplication', name:'Multiplication' },
    { id:'division',       name:'Division' },
    { id:'order_ops',      name:'Order of Operations & Inverses' },
    { id:'word_problems',  name:'Word Problems' },
  ]},
  'g4-fractions': { subsections: [
    { id:'compare_order',  name:'Comparing & Ordering Fractions' },
    { id:'equivalent',     name:'Equivalent Fractions & Simplifying' },
    { id:'add_sub',        name:'Adding & Subtracting Fractions' },
    { id:'fraction_of',    name:'Finding a Fraction of a Number' },
    { id:'mixed_numbers',  name:'Improper Fractions & Mixed Numbers' },
    { id:'decimals',       name:'Fractions & Decimals' },
    { id:'word_problems',  name:'Word Problems' },
  ]},
  'g4-geometry': { subsections: [
    { id:'shapes_2d',      name:'2-D Shapes & Their Properties' },
    { id:'shapes_3d',      name:'3-D Solids: Faces, Edges & Vertices' },
    { id:'angles',         name:'Right, Acute & Obtuse Angles' },
    { id:'lines',          name:'Horizontal, Vertical & Parallel Lines' },
    { id:'symmetry',       name:'Lines of Symmetry' },
    { id:'perimeter',      name:'Perimeter' },
  ]},
  'g4-measures': { subsections: [
    { id:'length',         name:'Length: mm, cm, m, km' },
    { id:'mass',           name:'Mass: g & kg' },
    { id:'capacity',       name:'Capacity: mL, cL & L' },
    { id:'time',           name:'Time & Duration' },
    { id:'money',          name:'Money & Change' },
    { id:'area',           name:'Area' },
    { id:'perimeter',      name:'Perimeter' },
  ]},
  'g4-data': { subsections: [
    { id:'tally',          name:'Tally Charts & Frequency Tables' },
    { id:'pictogram',      name:'Pictograms' },
    { id:'bar_chart',      name:'Bar Charts' },
    { id:'averages',       name:'Mean, Median, Mode & Range' },
  ]},
};

registerSubject({
  id:         'grade4-maths',
  name:       'Mathematics',
  grade:      4,
  icon:       '🔢',
  subject:    'Maths',
  curriculum: 'MIE Mauritius',
  comingSoon: false,
  syllabus: G4M_SYLLABUS,
  // Each chapter also carries a prose `syllabus`. It is the fallback the
  // Syllabus screen shows when a chapter has no subsections, and it is what the
  // student sees described in one place. Each sentence becomes one bullet (see
  // _syllabusPoints in app.js), so keep one idea per sentence — and keep it
  // matching what questions/ actually tests, not the syllabus document alone.
  chapters: [
    { id: 'g4-numeration', name: 'Numeration & Place Value', icon: '🔢',
      syllabus: 'Reading and writing numbers up to 100 000 in numerals and in words. Place value of each digit, and the difference between a digit and its value. Expanded notation (4 000 + 200 + 50 + 7). Comparing and ordering numbers, greatest and smallest. Odd and even numbers. Rounding to the nearest 10, 100 and 1 000. Counting on and back in 10s, 100s and 1 000s.' },
    { id: 'g4-four-ops',   name: 'Four Operations',         icon: '➕',
      syllabus: 'Adding and subtracting numbers up to 4 digits, with carrying and borrowing. Multiplication as repeated addition, and times tables up to 10. Multiplying by a 1-digit and a 2-digit number. Division with and without remainders. Choosing the right operation for a word problem. Checking an answer by working backwards (inverse operations). Order of operations: brackets and × ÷ before + −.' },
    { id: 'g4-fractions',  name: 'Fractions',               icon: '½',
      syllabus: 'Naming fractions: numerator and denominator. Fractions of a shape and of a set of objects. Equivalent fractions (1/2 = 2/4 = 4/8). Simplifying a fraction to its lowest terms. Comparing and ordering fractions with the same denominator. Adding and subtracting fractions with the same denominator. Adding and subtracting fractions where one denominator is a multiple of the other. Proper fractions, improper fractions and mixed numbers. Writing a simple decimal as a fraction (0.7 = 7/10).' },
    { id: 'g4-geometry',   name: 'Geometry & Angles',       icon: '📐',
      syllabus: 'Naming 2-D shapes and counting their sides and corners. 3-D solids: cube, cuboid, cylinder, cone, sphere, pyramid. Counting faces, edges and vertices. Types of lines: horizontal, vertical, parallel and perpendicular. Right, acute and obtuse angles. Lines of symmetry in shapes and letters. Perimeter of squares, rectangles and simple compound shapes.' },
    { id: 'g4-measures',   name: 'Measures & Units',        icon: '📏',
      syllabus: 'Length: millimetre, centimetre, metre and kilometre, and converting between them. Mass: gram and kilogram. Capacity: millilitre, centilitre and litre. Choosing a sensible unit for an everyday object. Time: reading an analogue clock, o\'clock, half past, quarter past and quarter to. Converting between hours and minutes, and calculating durations. Money: rupees and cents, giving change, and simple shopping problems.' },
    { id: 'g4-data',       name: 'Data Handling',           icon: '📊',
      syllabus: 'Collecting data with a tally chart and reading the totals. Pictograms, including a symbol that stands for more than one item and half symbols. Bar charts: reading a bar against the scale, and what a chart needs to be complete (title, labels, scale). Comparing bars: most, fewest, and the difference between two of them. Finding a total from a chart. Answering "how many more" questions from a graph. Mean, median, mode and range of a small set of numbers.' },
  ],
});
