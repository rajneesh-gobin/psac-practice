'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - Number Revision (Grades 7-8)
//
//  ⚠ THIS IS NOT A GRADE 9 SYLLABUS CONTENT AREA, and that is deliberate.
//    Measured on the NCE 2025 paper by assigning every question's marks to a
//    content area: about 30 of the 100 marks are ordinary arithmetic,
//    fractions, decimals, percentages, ratio, order of operations, metric
//    conversion and number properties - material taught in Grades 7 and 8 and
//    therefore absent from the Grade 9 syllabus. A Grade 9-only chapter list
//    cannot cover a third of the paper. See docs/nce-grade9/syllabus-map.md.
//
//  Paper style: this is where the opening run of single 1-mark questions comes
//  from - NCE 2025 Q1-Q10, NCE 2024 Q1-Q11.
//
//  ⚠ Every arithmetic answer is recomputed by
//    scripts/test-grade9-maths-content.js rather than trusted.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9m-number-revision';

// [ id, subsection, difficulty, marks, prompt, answer, accept[], hint, explanation, extra ]
const ITEMS = [

  // ── fractions, decimals and percentages ─────────────────────────────────
  ['g9m-nrv-001', 'fractions_decimals_percentages', 1, 1, 'Work out 632 + 157.',
   '789', [], 'Add the units, then the tens, then the hundreds.',
   '632 + 157 = 789.'],

  ['g9m-nrv-002', 'fractions_decimals_percentages', 1, 1, 'Work out 849 &minus; 523.',
   '326', [], 'Subtract column by column, starting from the units.',
   '849 &minus; 523 = 326.'],

  ['g9m-nrv-003', 'fractions_decimals_percentages', 1, 1,
   'Evaluate <sup>5</sup>&frasl;<sub>13</sub> + <sup>3</sup>&frasl;<sub>13</sub>.',
   '8/13', [], 'The denominators are the same, so only the numerators change.',
   'With a common denominator, add the numerators: (5 + 3)/13 = 8/13.'],

  ['g9m-nrv-004', 'fractions_decimals_percentages', 1, 1,
   'Evaluate <sup>9</sup>&frasl;<sub>17</sub> &minus; <sup>3</sup>&frasl;<sub>17</sub>.',
   '6/17', [], 'Subtract the numerators and keep the denominator.',
   '(9 &minus; 3)/17 = 6/17.'],

  ['g9m-nrv-005', 'fractions_decimals_percentages', 1, 1, 'Work out 2.1 + 0.5.',
   '2.6', [], 'Line up the decimal points.',
   '2.1 + 0.5 = 2.6.'],

  ['g9m-nrv-006', 'fractions_decimals_percentages', 2, 1, 'Calculate 3.02 &times; 4.',
   '12.08', [], 'Multiply as whole numbers, then place the decimal point.',
   '302 &times; 4 = 1208, and there are two decimal places, so the answer is 12.08.'],

  ['g9m-nrv-007', 'fractions_decimals_percentages', 1, 1, 'Express 13% as a fraction.',
   '13/100', [], 'Per cent means "out of a hundred".',
   '13% means 13 out of 100, so the fraction is 13/100.'],

  ['g9m-nrv-008', 'fractions_decimals_percentages', 2, 1, 'Express 0.31 as a percentage.',
   '31', [], 'Multiply by 100.', '0.31 &times; 100 = 31, so 0.31 = 31%.', { unit: '%' }],

  ['g9m-nrv-009', 'fractions_decimals_percentages', 3, 2,
   'Evaluate <sup>1</sup>&frasl;<sub>2</sub> + <sup>1</sup>&frasl;<sub>3</sub>.',
   '5/6', [], 'Find a common denominator first.',
   'The lowest common denominator of 2 and 3 is 6: 3/6 + 2/6 = 5/6.'],

  ['g9m-nrv-010', 'fractions_decimals_percentages', 1, 1, 'Evaluate 3 + 5 &minus; 9.',
   '-1', [], 'Work from left to right.', '3 + 5 = 8, and 8 &minus; 9 = &minus;1.'],

  ['g9m-nrv-011', 'fractions_decimals_percentages', 2, 1, 'Evaluate 3 &times; (4 &minus; 2) + 5.',
   '11', [], 'Brackets first, then multiply, then add.',
   '4 &minus; 2 = 2, then 3 &times; 2 = 6, and 6 + 5 = 11.'],

  ['g9m-nrv-012', 'fractions_decimals_percentages', 2, 1,
   'Express <sup>3</sup>&frasl;<sub>4</sub> as a percentage.',
   '75', [], 'Turn the fraction into hundredths.',
   '3/4 = 75/100 = 75%.', { unit: '%' }],

  ['g9m-nrv-013', 'fractions_decimals_percentages', 2, 2,
   'Express 0.4 as a fraction in its <b>simplest form</b>.',
   '2/5', [], 'Start from tenths, then cancel.',
   '0.4 = 4/10, and dividing top and bottom by 2 gives 2/5.'],

  ['g9m-nrv-014', 'fractions_decimals_percentages', 3, 2,
   'Work out <sup>2</sup>&frasl;<sub>3</sub> of 360.',
   '240', [], 'Divide by the bottom, then multiply by the top.',
   '360 &divide; 3 = 120, and 120 &times; 2 = 240.'],

  ['g9m-nrv-015', 'fractions_decimals_percentages', 2, 2, 'Find 15% of 200.',
   '30', [], '10% is easy to find; then add half of it again.',
   '10% of 200 = 20 and 5% of 200 = 10, so 15% = 20 + 10 = 30.'],

  ['g9m-nrv-016', 'fractions_decimals_percentages', 3, 2,
   'Evaluate <sup>1</sup>&frasl;<sub>4</sub> &times; <sup>2</sup>&frasl;<sub>3</sub>, giving your answer in its simplest form.',
   '1/6', [], 'Multiply the tops, multiply the bottoms, then cancel.',
   '(1 &times; 2)/(4 &times; 3) = 2/12, which cancels to 1/6.'],

  ['g9m-nrv-017', 'fractions_decimals_percentages', 3, 2,
   'Evaluate <sup>3</sup>&frasl;<sub>5</sub> &divide; <sup>2</sup>&frasl;<sub>5</sub>.',
   '3/2', ['1 1/2', '1.5'], 'Dividing by a fraction is the same as multiplying by its reciprocal.',
   '3/5 &divide; 2/5 = 3/5 &times; 5/2 = 15/10 = 3/2.'],

  ['g9m-nrv-018', 'fractions_decimals_percentages', 4, 2,
   'After a discount of 10%, a laptop costs Rs 27 900. Find the <b>original price</b> of the laptop.',
   '31000', [], 'The sale price is 90% of the original price.',
   'The price paid is 100% &minus; 10% = 90% of the original. So 90% = Rs 27 900, giving 1% = Rs 310 and 100% = Rs 31 000.',
   { prefix: 'Rs' }],

  ['g9m-nrv-019', 'fractions_decimals_percentages', 3, 2,
   'Mira has Rs 360. She gives <sup>2</sup>&frasl;<sub>5</sub> of her money to Tim. How much money does Tim receive?',
   '144', [], 'Find one fifth first.',
   '360 &divide; 5 = 72, so 2/5 of 360 = 72 &times; 2 = Rs 144.', { prefix: 'Rs' }],

  ['g9m-nrv-020', 'fractions_decimals_percentages', 3, 2,
   'A shirt costing Rs 800 is sold at a profit of 25%. Find the selling price.',
   '1000', [], 'Find 25% of 800, then add it on.',
   '25% of 800 = 200, so the selling price is 800 + 200 = Rs 1 000.', { prefix: 'Rs' }],

  // ── ratio, proportion, conversion and number properties ─────────────────
  ['g9m-nrv-021', 'ratio_and_measures', 1, 1, 'Convert 5 L into mL.',
   '5000', [], 'There are 1 000 millilitres in a litre.',
   '5 &times; 1 000 = 5 000 mL.', { unit: 'mL' }],

  ['g9m-nrv-022', 'ratio_and_measures', 1, 1, 'Convert 2 kg 350 g into grams.',
   '2350', [], 'There are 1 000 grams in a kilogram.',
   '2 kg = 2 000 g, so 2 kg 350 g = 2 000 + 350 = 2 350 g.', { unit: 'g' }],

  ['g9m-nrv-023', 'ratio_and_measures', 1, 1, 'Convert 5 kg 620 g into grams.',
   '5620', [], 'Change the kilograms to grams, then add.',
   '5 kg = 5 000 g, so 5 kg 620 g = 5 620 g.', { unit: 'g' }],

  ['g9m-nrv-024', 'ratio_and_measures', 1, 1, 'How many minutes are there in 2 hours 10 minutes?',
   '130', [], 'There are 60 minutes in an hour.',
   '2 &times; 60 = 120 minutes, plus 10 minutes, gives 130 minutes.', { unit: 'minutes' }],

  ['g9m-nrv-025', 'ratio_and_measures', 1, 1, 'Find <sup>3</sup>&radic;<span style="text-decoration:overline">8</span>.',
   '2', [], 'Which number multiplied by itself three times gives 8?',
   '2 &times; 2 &times; 2 = 8, so the cube root of 8 is 2.'],

  ['g9m-nrv-026', 'ratio_and_measures', 1, 1, 'Find <sup>3</sup>&radic;<span style="text-decoration:overline">64</span>.',
   '4', [], 'Try small whole numbers cubed.',
   '4 &times; 4 &times; 4 = 64, so the cube root of 64 is 4.'],

  ['g9m-nrv-027', 'ratio_and_measures', 2, 1, 'A bag of flour weighs 15 kg. What is the mass of 4 such bags?',
   '60', [], 'Multiply the mass of one bag by the number of bags.',
   '15 &times; 4 = 60 kg.', { unit: 'kg' }],

  ['g9m-nrv-028', 'ratio_and_measures', 1, 1, 'Convert 3.5 L into cL.',
   '350', [], 'There are 100 centilitres in a litre.',
   '3.5 &times; 100 = 350 cL.', { unit: 'cL' }],

  ['g9m-nrv-029', 'ratio_and_measures', 1, 1, 'Convert 4.2 km into metres.',
   '4200', [], 'There are 1 000 metres in a kilometre.',
   '4.2 &times; 1 000 = 4 200 m.', { unit: 'm' }],

  ['g9m-nrv-030', 'ratio_and_measures', 2, 1, 'Convert 2 500 mL into litres.',
   '2.5', [], 'Divide by 1 000.', '2 500 &divide; 1 000 = 2.5 L.', { unit: 'L' }],

  ['g9m-nrv-031', 'ratio_and_measures', 3, 2,
   'Two numbers are in the ratio 3 : 7. The smaller number is 21. Find the larger number.',
   '49', [], 'Work out what one part is worth first.',
   '3 parts = 21, so 1 part = 7. The larger number is 7 parts = 7 &times; 7 = 49.'],

  ['g9m-nrv-032', 'ratio_and_measures', 3, 2,
   'Rs 4 500 is shared between <b>A</b> and <b>B</b> in the ratio 2 : 3. How much does <b>B</b> receive?',
   '2700', [], 'There are 5 equal parts altogether.',
   '2 + 3 = 5 parts, so 1 part = 4 500 &divide; 5 = Rs 900. B receives 3 parts = Rs 2 700.',
   { prefix: 'Rs' }],

  ['g9m-nrv-033', 'ratio_and_measures', 4, 3,
   'A sum of money is shared between Shania and Mirella in the ratio 2 : 5. Mirella receives Rs 360 <b>more than</b> Shania. Calculate the <b>total amount of money</b> shared.',
   '840', [], 'The difference between them is 3 parts.',
   'Mirella has 5 parts and Shania 2 parts, so the difference is 3 parts = Rs 360, giving 1 part = Rs 120. The total is 7 parts = 7 &times; 120 = Rs 840.',
   { prefix: 'Rs' }],

  ['g9m-nrv-034', 'ratio_and_measures', 4, 3,
   '12 men take 20 days to build a house. How many days would it take 10 men to build a similar house? [Assume that the men work at the same rate.]',
   '24', [], 'Fewer men means more days - this is inverse proportion.',
   'The work is 12 &times; 20 = 240 man-days. With 10 men, the time is 240 &divide; 10 = 24 days.',
   { unit: 'days' }],

  ['g9m-nrv-035', 'ratio_and_measures', 3, 2,
   'The plan of a house is drawn to a scale of 1 : 400. On the plan, a wall is represented by a line of 7.5 cm. Find the actual length of the wall, in <b>metres</b>.',
   '30', [], 'Find the real length in centimetres first, then change to metres.',
   '7.5 &times; 400 = 3 000 cm. Since 100 cm = 1 m, the wall is 3 000 &divide; 100 = 30 m.',
   { unit: 'm' }],

  ['g9m-nrv-036', 'ratio_and_measures', 2, 1,
   'Find the <b>L.C.M.</b> of 4<i>x</i> and 12<i>y</i>.',
   '12xy', [], 'Take the lowest common multiple of the numbers, then include every letter.',
   'The L.C.M. of 4 and 12 is 12, and both x and y must appear, so the L.C.M. is 12xy.'],

  ['g9m-nrv-037', 'ratio_and_measures', 2, 1,
   'Find the <b>H.C.F.</b> of 3<i>x</i> and 6<i>x</i><sup>2</sup>.',
   '3x', [], 'Take the highest factor common to both numbers and the lowest power of x.',
   'The H.C.F. of 3 and 6 is 3, and the lowest power of x present in both is x, so the H.C.F. is 3x.'],

  ['g9m-nrv-038', 'ratio_and_measures', 3, 2,
   'A car travels 150 km in 2 hours. Find its average speed.',
   '75', [], 'Speed is distance divided by time.',
   '150 &divide; 2 = 75 km/h.', { unit: 'km/h' }],

  ['g9m-nrv-039', 'ratio_and_measures', 3, 2,
   '5 identical books cost Rs 850. Find the cost of 8 such books.',
   '1360', [], 'Find the cost of one book first.',
   '850 &divide; 5 = Rs 170 for one book, so 8 books cost 170 &times; 8 = Rs 1 360.',
   { prefix: 'Rs' }],

  ['g9m-nrv-040', 'ratio_and_measures', 2, 1,
   'Convert 750 g into kilograms.',
   '0.75', ['3/4'], 'Divide by 1 000.', '750 &divide; 1 000 = 0.75 kg.', { unit: 'kg' }],
];

const isNumeric = a => /^-?[\d.\/]+$/.test(a);

ITEMS.forEach(([id, subsection, difficulty, marks, prompt, answer, accept, hint, explanation, extra]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection, difficulty,
    source: 'Grade 7-8 number work carried into the NCE paper; NCE 2025 Q1-Q10, 2024 Q1-Q11 pattern.',
    parts: [{
      label: 'a', prompt, marks, hint, explanation,
      response: Object.assign(
        { kind: isNumeric(answer) ? 'number' : 'expression', answer, accept }, extra || {}),
    }],
  }));
});

// ── Circle-one-from-a-list: the paper's own format, not an A/B/C/D block ──
// ⚠ NCE 2025 Q6 and Q12, and 2024 Q6, print the candidates inline on one line
//   and ask the child to CIRCLE one. `variant: 'circle'` renders it that way on
//   the printable paper rather than as a lettered option list.
const CIRCLE = [
  ['g9m-nrv-041', 'ratio_and_measures', 'Circle the <b>composite</b> number in the list below.',
   ['2', '13', '27', '41'], '27',
   'A composite number has more factors than just 1 and itself.',
   '27 = 3 &times; 9, so it has factors other than 1 and 27. The other three - 2, 13 and 41 - are prime.'],

  ['g9m-nrv-042', 'ratio_and_measures', 'Circle the <b>square</b> number in the list below.',
   ['15', '20', '36', '59'], '36',
   'Which one is a whole number multiplied by itself?',
   '36 = 6 &times; 6, so it is a square number. None of 15, 20 or 59 is a whole number squared.'],

  ['g9m-nrv-043', 'ratio_and_measures', 'Circle the <b>prime</b> number in the list below.',
   ['21', '23', '25', '27'], '23',
   'A prime number has exactly two factors: 1 and itself.',
   '23 has no factors except 1 and 23. 21 = 3 &times; 7, 25 = 5 &times; 5 and 27 = 3 &times; 9.'],

  ['g9m-nrv-044', 'fractions_decimals_percentages', 'A list of numbers is given below. Circle the <b>smallest</b> number.',
   ['2.05', '2.5', '2.55', '2.005'], '2.005',
   'Compare the digits after the decimal point one place at a time.',
   'Comparing tenths: 2.005 and 2.05 both have 0 tenths, but 2.005 has 0 hundredths against 5, so 2.005 is the smallest.'],
];

CIRCLE.forEach(([id, subsection, prompt, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection, difficulty: 2,
    source: 'NCE 2025 Q6/Q12, 2024 Q6 "circle the ... in the list below" pattern.',
    parts: [{ label: 'a', prompt, marks: 1, hint, explanation,
              response: { kind: 'choice', variant: 'circle', options, answer } }],
  }));
});

// ── An ordering answer: one blank per item, as the paper prints it ────────
// NCE 2024 Q14(a): "Answer: ........., ........., ........., ........., ........."
STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-nrv-045', chapterId: CH, subsection: 'fractions_decimals_percentages', difficulty: 3,
  source: 'NCE 2024 Q14(a) ordering pattern.',
  parts: [{
    label: 'a',
    prompt: 'Arrange the following numbers in <b>ascending</b> order.'
          + '<div style="margin:8px 0 0 12px; letter-spacing:.06em">5.62 &nbsp;&nbsp;&nbsp; 5.06 &nbsp;&nbsp;&nbsp; 5.23 &nbsp;&nbsp;&nbsp; 5.65 &nbsp;&nbsp;&nbsp; 5.006</div>',
    marks: 1,
    hint: 'Ascending means smallest first. Compare the tenths, then the hundredths.',
    explanation: 'Writing each to three decimal places: 5.620, 5.060, 5.230, 5.650, 5.006. '
               + 'In order, smallest first: 5.006, 5.06, 5.23, 5.62, 5.65.',
    // ⚠ partial: false - the real paper gives ONE mark for the whole order
    //   (NCE 2024 Q14(a) is five decimals for [1]). Five blanks cannot share
    //   one mark, and awarding a fraction for a half-sorted list would be
    //   marking something the paper does not.
    response: { kind: 'blanks', partial: false,
                answer: [['5.006'], ['5.06'], ['5.23'], ['5.62'], ['5.65']] },
  }],
}));

})();

(function () {
const CH = 'g9m-number-revision';

// [ id, subsection, difficulty, marks, prompt, answer, accept[], hint, explanation, extra ]
const ITEMS3 = [

  // ── harder fractions, decimals and percentages ───────────────────────────
  ['g9m-nrv-046', 'fractions_decimals_percentages', 3, 2,
   'A pen costs Rs 40. Its price is increased by 15%. Find the new price.',
   '46', [],
   'Find 15% of Rs 40, then add it to the original price.',
   '15% of 40 = Rs 6, so the new price is 40 + 6 = Rs 46.', { prefix: 'Rs' }],

  ['g9m-nrv-047', 'fractions_decimals_percentages', 4, 3,
   'After a 25% increase, a bag costs Rs 500. Find the <b>original price</b> of the bag.',
   '400', [],
   'The new price represents 125% of the original.',
   '125% = Rs 500, so 1% = Rs 4 and 100% = Rs 400.', { prefix: 'Rs' }],

  ['g9m-nrv-048', 'fractions_decimals_percentages', 3, 2,
   'A television was bought for Rs 8 000 and sold for Rs 6 800. Calculate the <b>percentage loss</b>.',
   '15', [],
   'Percentage loss = (loss &divide; cost price) &times; 100.',
   'Loss = 8 000 &minus; 6 800 = Rs 1 200. Percentage loss = (1 200 &divide; 8 000) &times; 100 = 15%.',
   { unit: '%' }],

  ['g9m-nrv-049', 'fractions_decimals_percentages', 3, 2,
   'A shopkeeper buys 50 oranges for Rs 100 and sells them at Rs 3 each. Calculate the <b>percentage profit</b>.',
   '50', [],
   'Find the total selling price, then calculate profit as a percentage of the cost price.',
   'Total selling price = 50 &times; Rs 3 = Rs 150. Profit = 150 &minus; 100 = Rs 50. Percentage profit = (50 &divide; 100) &times; 100 = 50%.',
   { unit: '%' }],

  ['g9m-nrv-050', 'fractions_decimals_percentages', 3, 2,
   'A class has 45 pupils. 60% of them are girls. Find the number of <b>boys</b> in the class.',
   '18', [],
   'Find the number of girls first, then subtract from the total.',
   '60% of 45 = 27 girls. Boys = 45 &minus; 27 = 18.'],

  ['g9m-nrv-051', 'fractions_decimals_percentages', 4, 3,
   'A television costs Rs 12 000 before VAT. VAT of 15% is added to the price. Find the <b>total cost</b>.',
   '13800', [],
   'Find 15% of Rs 12 000 and add it to the original price.',
   'VAT = 15% of 12 000 = Rs 1 800. Total cost = 12 000 + 1 800 = Rs 13 800.', { prefix: 'Rs' }],

  ['g9m-nrv-052', 'fractions_decimals_percentages', 3, 2,
   'Evaluate 3<sup>2</sup> &times; 2 &minus; (5 + 3) &divide; 4.',
   '16', [],
   'Follow BODMAS: Brackets, then Orders (powers), then Divide/Multiply, then Add/Subtract.',
   '3<sup>2</sup> = 9. Then 9 &times; 2 = 18. Brackets: (5 + 3) = 8, and 8 &divide; 4 = 2. Finally 18 &minus; 2 = 16.'],

  ['g9m-nrv-053', 'fractions_decimals_percentages', 3, 2,
   'Work out 4 &minus; 1<sup>2</sup>&frasl;<sub>3</sub>, giving your answer as a fraction.',
   '7/3', ['2 1/3'],
   'Convert the mixed number to an improper fraction first.',
   '1<sup>2</sup>&frasl;<sub>3</sub> = <sup>5</sup>&frasl;<sub>3</sub>. Write 4 as <sup>12</sup>&frasl;<sub>3</sub>: <sup>12</sup>&frasl;<sub>3</sub> &minus; <sup>5</sup>&frasl;<sub>3</sub> = <sup>7</sup>&frasl;<sub>3</sub>.'],

  ['g9m-nrv-054', 'fractions_decimals_percentages', 4, 3,
   'Asha earns Rs 3 600 per month. She spends <sup>2</sup>&frasl;<sub>5</sub> on rent and <sup>1</sup>&frasl;<sub>4</sub> on food. How much money does she have <b>left</b>?',
   '1260', [],
   'Find the amount spent on rent and food separately, then subtract both from her earnings.',
   'Rent = <sup>2</sup>&frasl;<sub>5</sub> &times; 3 600 = Rs 1 440. Food = <sup>1</sup>&frasl;<sub>4</sub> &times; 3 600 = Rs 900. Left = 3 600 &minus; 1 440 &minus; 900 = Rs 1 260.',
   { prefix: 'Rs' }],

  // ── harder ratio, proportion and measures ────────────────────────────────
  ['g9m-nrv-055', 'ratio_and_measures', 3, 2,
   'A car travels 240 km on 20 litres of petrol. How many litres of petrol are needed to travel 360 km?',
   '30', [],
   'Find the rate of petrol use per kilometre, then multiply.',
   'Petrol per km = 20 &divide; 240 = <sup>1</sup>&frasl;<sub>12</sub> L. Petrol for 360 km = 360 &divide; 12 = 30 L.',
   { unit: 'L' }],

  ['g9m-nrv-056', 'ratio_and_measures', 4, 3,
   'Three friends share a prize of Rs 2 400 in the ratio 1 : 2 : 3. Find the <b>largest share</b>.',
   '1200', [],
   'Find the value of one part first.',
   '1 + 2 + 3 = 6 parts. One part = Rs 2 400 &divide; 6 = Rs 400. Largest share = 3 &times; Rs 400 = Rs 1 200.',
   { prefix: 'Rs' }],

  ['g9m-nrv-057', 'ratio_and_measures', 3, 2,
   'A car travels at 80 km/h. How far does it travel in 1 hour 30 minutes?',
   '120', [],
   'Convert 1 hour 30 minutes into hours before applying distance = speed &times; time.',
   '1 hour 30 minutes = 1.5 hours. Distance = 80 &times; 1.5 = 120 km.', { unit: 'km' }],

  ['g9m-nrv-058', 'ratio_and_measures', 3, 2,
   'A bus travels 90 km at a speed of 60 km/h. How many <b>minutes</b> does the journey take?',
   '90', [],
   'Find the time in hours first, then convert to minutes.',
   'Time = 90 &divide; 60 = 1.5 hours. 1.5 &times; 60 = 90 minutes.', { unit: 'minutes' }],

  ['g9m-nrv-059', 'ratio_and_measures', 3, 2,
   'Two bells ring at the same time. After that, one rings every 20 minutes and the other every 30 minutes. After how many minutes will they ring together again?',
   '60', [],
   'Find the LCM of 20 and 30.',
   'LCM(20, 30) = 60. The bells will ring together again after 60 minutes.', { unit: 'minutes' }],

  ['g9m-nrv-060', 'ratio_and_measures', 4, 3,
   '6 workers can complete a task in 10 days. How many workers are needed to complete the same task in 4 days? [Assume all workers work at the same rate.]',
   '15', [],
   'This is inverse proportion: fewer days means more workers are needed.',
   'Total work = 6 &times; 10 = 60 worker-days. Workers needed for 4 days = 60 &divide; 4 = 15.'],

  ['g9m-nrv-061', 'ratio_and_measures', 4, 3,
   'The average of 4 numbers is 18. Three of the numbers are 12, 20 and 25. Find the <b>fourth number</b>.',
   '15', [],
   'The total sum of all 4 numbers = 4 &times; their average.',
   'Sum of 4 numbers = 4 &times; 18 = 72. Fourth number = 72 &minus; (12 + 20 + 25) = 72 &minus; 57 = 15.'],

  ['g9m-nrv-062', 'ratio_and_measures', 3, 2,
   'Convert 3 hours 20 minutes into seconds.',
   '12000', [],
   'Convert to minutes first, then multiply by 60.',
   '3 hours 20 minutes = 200 minutes. 200 &times; 60 = 12 000 seconds.', { unit: 'seconds' }],

  ['g9m-nrv-063', 'ratio_and_measures', 4, 3,
   'In a school, the ratio of boys to girls is 3 : 5. There are 240 boys. Find the <b>total number of pupils</b> in the school.',
   '640', [],
   'Find the value of one part first, then multiply by the total number of parts.',
   '3 parts = 240 boys, so 1 part = 80. Total = (3 + 5) &times; 80 = 8 &times; 80 = 640.'],

];

const isNumeric = a => /^-?[\d.\/]+$/.test(a);

ITEMS3.forEach(([id, subsection, difficulty, marks, prompt, answer, accept, hint, explanation, extra]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection, difficulty,
    source: 'NCE past-paper number revision practice.',
    parts: [{
      label: 'a', prompt, marks, hint, explanation,
      response: Object.assign(
        { kind: isNumeric(answer) ? 'number' : 'expression', answer, accept }, extra || {}),
    }],
  }));
});

// ── Multi-part: savings and target ─────────────────────────────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-nrv-064', chapterId: CH, subsection: 'fractions_decimals_percentages', difficulty: 4,
  source: 'NCE past-paper number revision practice.',
  parts: [
    {
      label: 'a',
      prompt: 'Raju earns Rs 5 000 per month. He saves 20% of his earnings each month.<br>Find the amount Raju saves per month.',
      marks: 2,
      hint: 'Find 20% of Rs 5 000.',
      explanation: '20% of 5 000 = <sup>20</sup>&frasl;<sub>100</sub> &times; 5 000 = Rs 1 000.',
      response: { kind: 'number', answer: '1000', prefix: 'Rs' },
    },
    {
      label: 'b',
      prompt: 'How many months will it take Raju to save Rs 6 000?',
      marks: 2,
      hint: 'Divide the target amount by the monthly savings you found in (a).',
      explanation: 'Rs 6 000 &divide; Rs 1 000 = 6 months.',
      dependsOn: 'a',
      response: { kind: 'number', answer: '6', unit: 'months' },
    },
  ],
}));

// ── Multi-part: map scale ──────────────────────────────────────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-nrv-065', chapterId: CH, subsection: 'ratio_and_measures', difficulty: 4,
  source: 'NCE past-paper number revision practice.',
  parts: [
    {
      label: 'a',
      prompt: 'A map has a scale of 1 : 50 000. A road is represented by a line of 8 cm on the map.<br>Find the actual length of the road, in <b>kilometres</b>.',
      marks: 2,
      hint: 'Multiply the map length by 50 000, then convert centimetres to kilometres.',
      explanation: '8 &times; 50 000 = 400 000 cm. 400 000 &divide; 100 000 = 4 km.',
      response: { kind: 'number', answer: '4', unit: 'km' },
    },
    {
      label: 'b',
      prompt: 'A forest is 15 km long. Find its length on the map, in <b>centimetres</b>.',
      marks: 2,
      hint: 'Convert 15 km to centimetres first, then divide by 50 000.',
      explanation: '15 km = 1 500 000 cm. 1 500 000 &divide; 50 000 = 30 cm.',
      response: { kind: 'number', answer: '30', unit: 'cm' },
    },
  ],
}));

})();
