'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - Capacity
//
//  Syllabus: NCF Grades 7-9, §3.9 "Measurement: Capacity" (PDF p.50,
//  printed 44): distinguish among millilitres, centilitres and litres; convert
//  between them; calculate the capacity of given containers; solve problems
//  involving capacity AND VOLUME.
//
//  ⚠ THE LINK BETWEEN VOLUME AND CAPACITY IS THE POINT. 1 cm³ of space holds
//    1 mL of liquid and 1000 cm³ holds 1 litre, which is what turns a
//    mensuration answer into a capacity answer. Several items below cross that
//    bridge deliberately, because the syllabus outcome names both words.
//
//  Paper style: NCE 2025 Q7 is the bare conversion "Convert 5 L into mL" [1],
//  printed with the unit "mL" already on the answer line.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9m-capacity';

// [ id, difficulty, marks, prompt, answer, accept, unit, hint, explanation ]
const ITEMS = [
  ['g9m-cap-001', 1, 1, 'Convert 3 L into <b>mL</b>.', '3000', [], 'mL',
   'There are 1 000 millilitres in a litre.', '3 &times; 1 000 = 3 000 mL.'],

  ['g9m-cap-002', 1, 1, 'Convert 2 L into <b>cL</b>.', '200', [], 'cL',
   'There are 100 centilitres in a litre.', '2 &times; 100 = 200 cL.'],

  ['g9m-cap-003', 1, 1, 'Convert 500 mL into <b>litres</b>.', '0.5', ['1/2'], 'L',
   'Divide by 1 000.', '500 &divide; 1 000 = 0.5 L.'],

  ['g9m-cap-004', 2, 1, 'Convert 75 cL into <b>mL</b>.', '750', [], 'mL',
   'One centilitre is 10 millilitres.', '75 &times; 10 = 750 mL.'],

  ['g9m-cap-005', 2, 1, 'Convert 1 250 mL into <b>litres</b>.', '1.25', [], 'L',
   'Divide by 1 000.', '1 250 &divide; 1 000 = 1.25 L.'],

  ['g9m-cap-006', 2, 1, 'Convert 4.5 L into <b>cL</b>.', '450', [], 'cL',
   'Multiply by 100.', '4.5 &times; 100 = 450 cL.'],

  ['g9m-cap-007', 2, 2, 'Which is larger, 600 mL or 0.6 L?',
   'they are equal', ['equal', 'the same', 'neither'], null,
   'Put both into the same unit before comparing.',
   '0.6 L = 0.6 &times; 1 000 = 600 mL, so the two are exactly equal.'],

  ['g9m-cap-008', 3, 2, 'A bottle holds 1.5 L of juice. How many <b>250 mL</b> glasses can be filled from it?',
   '6', [], 'glasses', 'Work in the same unit first.',
   '1.5 L = 1 500 mL, and 1 500 &divide; 250 = 6 glasses.'],

  ['g9m-cap-009', 3, 2, 'A jug holds 2 L. It is filled from a 250 mL cup. How many <b>cupfuls</b> are needed?',
   '8', [], 'cupfuls', 'Change the litres to millilitres.',
   '2 L = 2 000 mL, and 2 000 &divide; 250 = 8 cupfuls.'],

  ['g9m-cap-010', 3, 2, 'A container has a volume of 1 000 cm&sup3;. Write down its <b>capacity</b> in litres.',
   '1', [], 'L', '1 000 cm&sup3; of space holds exactly one litre.',
   '1 000 cm&sup3; = 1 litre, so the capacity is 1 L.'],

  ['g9m-cap-011', 3, 2, 'A tank measures 20 cm by 10 cm by 5 cm. Find its <b>capacity</b> in millilitres.',
   '1000', [], 'mL', 'Find the volume in cm&sup3; first; 1 cm&sup3; holds 1 mL.',
   'The volume is 20 &times; 10 &times; 5 = 1 000 cm&sup3;, and 1 cm&sup3; holds 1 mL, '
   + 'so the capacity is 1 000 mL.'],

  ['g9m-cap-012', 4, 3, 'A tank measures 50 cm by 40 cm by 30 cm. Find its <b>capacity</b> in litres.',
   '60', [], 'L', 'Volume in cm&sup3; first, then divide by 1 000.',
   'The volume is 50 &times; 40 &times; 30 = 60 000 cm&sup3;. Since 1 000 cm&sup3; = 1 L, '
   + 'the capacity is 60 000 &divide; 1 000 = 60 L.'],

  ['g9m-cap-013', 4, 3, 'A rectangular tank measures 30 cm by 20 cm by 25 cm. Water is poured in to a '
   + 'depth of 10 cm. Find the <b>volume of water</b> in litres.',
   '6', [], 'L', 'Use the depth of the water, not the height of the tank.',
   'The water forms a cuboid 30 &times; 20 &times; 10 = 6 000 cm&sup3;, which is 6 L.'],

  ['g9m-cap-014', 2, 1, 'Convert 0.25 L into <b>mL</b>.', '250', [], 'mL',
   'Multiply by 1 000.', '0.25 &times; 1 000 = 250 mL.'],

  ['g9m-cap-015', 3, 2, 'A bucket holds 12 L. A tap fills it at 2 L per minute. How long does it take '
   + 'to fill?', '6', [], 'minutes', 'Divide the capacity by the rate.',
   '12 &divide; 2 = 6 minutes.'],

  ['g9m-cap-016', 3, 2, 'Six identical bottles each hold 33 cL. Find the <b>total</b> in litres.',
   '1.98', [], 'L', 'Add the centilitres first, then change to litres.',
   '6 &times; 33 = 198 cL, and 198 &divide; 100 = 1.98 L.'],

  ['g9m-cap-017', 3, 2, 'A cubical container has edges of 10 cm. Find its <b>capacity</b> in litres.',
   '1', [], 'L', 'Find the volume, then use 1 000 cm&sup3; = 1 L.',
   'The volume is 10 &times; 10 &times; 10 = 1 000 cm&sup3;, which is 1 L.'],

  ['g9m-cap-018', 4, 3, 'A drum holds 25 L of water. 8 500 mL are used. How much water is <b>left</b>, '
   + 'in litres?', '16.5', [], 'L', 'Change the millilitres to litres before subtracting.',
   '8 500 mL = 8.5 L, so the water left is 25 &minus; 8.5 = 16.5 L.'],

  ['g9m-cap-019', 2, 1, 'How many <b>centilitres</b> are there in one litre?', '100', [], 'cL',
   'The prefix "centi" means one hundredth.', 'One litre is 100 centilitres.'],

  ['g9m-cap-020', 4, 3, 'A tank of capacity 90 L is <sup>2</sup>&frasl;<sub>3</sub> full. Find the volume '
   + 'of water in the tank, in <b>litres</b>.',
   '60', [], 'L', 'Find one third first.',
   '90 &divide; 3 = 30, so two thirds is 30 &times; 2 = 60 L.'],
];

ITEMS.forEach(([id, difficulty, marks, prompt, answer, accept, unit, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection: 'units_and_problems', difficulty,
    source: 'NCF Grades 7-9 §3.9 Measurement: Capacity; NCE 2025 Q7 pattern.',
    parts: [{ label: 'a', prompt, marks, hint, explanation,
              response: { kind: /^-?[\d.\/]+$/.test(answer) ? 'number' : 'expression',
                          answer, accept, unit } }],
  }));
});

})();
