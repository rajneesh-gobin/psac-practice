'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - Personal & Household Finance
//
//  Syllabus: NCF Grades 7-9, §3.9 "Numbers: Personal and Household Finance"
//  (PDF p.48, printed 42): solve simple problems on salaries, wages and hire
//  purchase; interpret and use tables and charts, for example CEB and CWA
//  bills.
//
//  ⚠ CEB AND CWA ARE NAMED IN THE SYLLABUS - the Central Electricity Board
//    and the Central Water Authority, the two utilities every Mauritian
//    household gets a bill from. A tariff table is the "chart" the outcome
//    means, so this chapter draws one.
//
//  Paper style: NCE 2025 Q27 (simple interest on Rs 200 000 over 30 months,
//  3 marks) and 2024 Q21(b) (simple interest over 5 years).
//
//  ⚠ Money answers use `prefix: 'Rs'`, which prints BEFORE the answer line as
//    the papers do, and marking accepts a child who writes the Rs back.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9m-finance';

// A banded tariff table, of the shape a real utility bill uses.
function tariffTable(title, rows) {
  let h = `<table style="border-collapse:collapse;margin:6px 0;font-size:.95em">`
        + `<tr><td colspan="2" style="border:1px solid #000;padding:4px 10px;background:#eee;text-align:center"><b>${title}</b></td></tr>`
        + `<tr><td style="border:1px solid #000;padding:4px 10px;background:#f6f6f6"><b>Units used</b></td>`
        + `<td style="border:1px solid #000;padding:4px 10px;background:#f6f6f6"><b>Rate per unit</b></td></tr>`;
  rows.forEach(([band, rate]) => {
    h += `<tr><td style="border:1px solid #000;padding:4px 10px">${band}</td>`
       + `<td style="border:1px solid #000;padding:4px 10px;text-align:right">Rs ${rate}</td></tr>`;
  });
  return h + '</table>';
}
const CEB = tariffTable('Electricity tariff', [['First 25 units', '3.50'], ['Next 50 units', '5.00'], ['Above 75 units', '6.50']]);
const CWA = tariffTable('Water tariff', [['First 10 m&sup3;', '8.00'], ['Next 15 m&sup3;', '12.00'], ['Above 25 m&sup3;', '20.00']]);

// [ id, difficulty, marks, prompt, response, hint, explanation, stimulus ]
const ITEMS = [
  ['g9m-fin-001', 1, 1, 'A worker is paid Rs 450 per day. Find his pay for <b>6 days</b>.',
   { kind: 'number', answer: '2700', prefix: 'Rs' }, 'Multiply the daily rate by the number of days.',
   '450 &times; 6 = Rs 2 700.', null],

  ['g9m-fin-002', 2, 1, 'A clerk earns Rs 24 000 per month. Find her <b>annual</b> salary.',
   { kind: 'number', answer: '288000', prefix: 'Rs' }, 'There are 12 months in a year.',
   '24 000 &times; 12 = Rs 288 000.', null],

  ['g9m-fin-003', 2, 2, 'A worker is paid Rs 150 per hour for overtime. Find his pay for <b>8 hours</b> of overtime.',
   { kind: 'number', answer: '1200', prefix: 'Rs' }, 'Multiply the hourly rate by the hours worked.',
   '150 &times; 8 = Rs 1 200.', null],

  ['g9m-fin-004', 3, 2, 'A basic salary is Rs 18 000. A bonus of 10% is added. Find the <b>total</b> pay.',
   { kind: 'number', answer: '19800', prefix: 'Rs' }, 'Find 10% first, then add it on.',
   '10% of 18 000 = 1 800, so the total is 18 000 + 1 800 = Rs 19 800.', null],

  ['g9m-fin-005', 3, 2, 'A salary of Rs 20 000 has 5% deducted for a pension. Find the <b>net</b> salary.',
   { kind: 'number', answer: '19000', prefix: 'Rs' }, 'Work out the deduction, then subtract it.',
   '5% of 20 000 = 1 000, so the net salary is 20 000 &minus; 1 000 = Rs 19 000.', null],

  ['g9m-fin-006', 3, 3, 'A television is bought on <b>hire purchase</b> with a deposit of Rs 5 000 and '
   + '12 monthly payments of Rs 1 500. Find the <b>total</b> amount paid.',
   { kind: 'number', answer: '23000', prefix: 'Rs' }, 'Deposit plus all the monthly payments.',
   'The monthly payments come to 12 &times; 1 500 = Rs 18 000. Adding the deposit: '
   + '5 000 + 18 000 = Rs 23 000.', null],

  ['g9m-fin-007', 4, 3, 'The cash price of a television is Rs 20 000. On hire purchase it costs a total of '
   + 'Rs 23 000. Find the <b>extra amount</b> paid for buying on hire purchase.',
   { kind: 'number', answer: '3000', prefix: 'Rs' }, 'Compare the two totals.',
   '23 000 &minus; 20 000 = Rs 3 000 more than paying cash.', null],

  ['g9m-fin-008', 4, 3, 'John deposits Rs 200 000 for a period of <b>30 months</b> in a bank. The rate of '
   + '<b>simple interest</b> is 3% per annum. Find the <b>total</b> amount John will get when he '
   + 'withdraws all his money after 30 months.',
   { kind: 'number', answer: '215000', prefix: 'Rs' },
   'Change 30 months into years before using the formula.',
   '30 months = 2.5 years. Interest = 200 000 &times; 3/100 &times; 2.5 = Rs 15 000. '
   + 'The total is 200 000 + 15 000 = Rs 215 000.', null],

  ['g9m-fin-009', 3, 2, 'A man invests Rs 300 000 for 5 years at 2% per annum. Calculate the <b>simple '
   + 'interest</b> he earns.',
   { kind: 'number', answer: '30000', prefix: 'Rs' }, 'Interest = principal &times; rate &times; time.',
   '300 000 &times; 2/100 &times; 5 = Rs 30 000.', null],

  ['g9m-fin-010', 3, 2, 'Find the <b>simple interest</b> on Rs 50 000 at 4% per annum for 3 years.',
   { kind: 'number', answer: '6000', prefix: 'Rs' }, 'Interest = P &times; R &times; T &divide; 100.',
   '50 000 &times; 4/100 &times; 3 = Rs 6 000.', null],

  ['g9m-fin-011', 4, 3, 'The simple interest on Rs 40 000 for 2 years is Rs 4 000. Find the <b>rate</b> '
   + 'per annum.',
   { kind: 'number', answer: '5', unit: '%' }, 'Rearrange the interest formula for the rate.',
   'Interest = P &times; R &times; T &divide; 100. Here 40 000 &times; 2 &divide; 100 = 800, '
   + 'so 4 000 = 800R and R = 4 000 &divide; 800 = 5% per annum.',
   null],

  ['g9m-fin-012', 2, 2, 'A shopkeeper buys an article for Rs 800 and sells it for Rs 1 000. Find his '
   + '<b>profit</b>.',
   { kind: 'number', answer: '200', prefix: 'Rs' }, 'Selling price minus cost price.',
   '1 000 &minus; 800 = Rs 200.', null],

  ['g9m-fin-013', 3, 2, 'A shopkeeper buys an article for Rs 800 and sells it for Rs 1 000. Find his '
   + '<b>percentage profit</b>.',
   { kind: 'number', answer: '25', unit: '%' }, 'Percentage profit is the profit over the COST price.',
   'The profit is Rs 200 on a cost of Rs 800, so the percentage profit is (200 &divide; 800) &times; 100 = 25%.',
   null],

  ['g9m-fin-014', 3, 3, 'A household uses <b>60 units</b> of electricity in a month. Using the tariff '
   + 'shown, calculate the <b>total cost</b>.',
   { kind: 'number', answer: '262.50', accept: ['262.5'], prefix: 'Rs' },
   'Charge the first 25 units at one rate, then the rest at the next rate.',
   'First 25 units: 25 &times; 3.50 = Rs 87.50. The remaining 35 units fall in the next band: '
   + '35 &times; 5.00 = Rs 175. Total = 87.50 + 175 = Rs 262.50.', CEB],

  ['g9m-fin-015', 4, 3, 'A household uses <b>90 units</b> of electricity in a month. Using the tariff '
   + 'shown, calculate the <b>total cost</b>.',
   { kind: 'number', answer: '435.00', accept: ['435'], prefix: 'Rs' },
   'The bill crosses all three bands.',
   'First 25 units: 25 &times; 3.50 = Rs 87.50. Next 50 units: 50 &times; 5.00 = Rs 250. '
   + 'The last 15 units are above 75: 15 &times; 6.50 = Rs 97.50. '
   + 'Total = 87.50 + 250 + 97.50 = Rs 435.', CEB],

  ['g9m-fin-016', 3, 3, 'A household uses <b>20 m&sup3;</b> of water in a month. Using the tariff shown, '
   + 'calculate the <b>total cost</b>.',
   { kind: 'number', answer: '200', prefix: 'Rs' },
   'The first 10 m&sup3; are charged at the lower rate.',
   'First 10 m&sup3;: 10 &times; 8.00 = Rs 80. The remaining 10 m&sup3; fall in the next band: '
   + '10 &times; 12.00 = Rs 120. Total = 80 + 120 = Rs 200.', CWA],

  ['g9m-fin-017', 4, 3, 'A household uses <b>30 m&sup3;</b> of water in a month. Using the tariff shown, '
   + 'calculate the <b>total cost</b>.',
   { kind: 'number', answer: '360', prefix: 'Rs' }, 'The bill crosses all three bands.',
   'First 10 m&sup3;: 10 &times; 8.00 = Rs 80. Next 15 m&sup3;: 15 &times; 12.00 = Rs 180. '
   + 'The last 5 m&sup3; are above 25: 5 &times; 20.00 = Rs 100. Total = 80 + 180 + 100 = Rs 360.', CWA],

  ['g9m-fin-018', 2, 1, 'Using the electricity tariff shown, write down the <b>rate per unit</b> charged '
   + 'for the first 25 units.',
   { kind: 'number', answer: '3.50', accept: ['3.5'], prefix: 'Rs' },
   'Read straight off the first row of the table.',
   'The table gives Rs 3.50 per unit for the first 25 units.', CEB],

  ['g9m-fin-019', 3, 2, 'A car is bought on hire purchase with a deposit of Rs 60 000 and 24 monthly '
   + 'payments of Rs 12 500. Find the <b>total</b> amount paid.',
   { kind: 'number', answer: '360000', prefix: 'Rs' }, 'Deposit plus all the instalments.',
   'The instalments come to 24 &times; 12 500 = Rs 300 000. Adding the deposit: '
   + '60 000 + 300 000 = Rs 360 000.', null],

  ['g9m-fin-020', 4, 4, 'A worker&rsquo;s basic pay is Rs 16 000 per month. He also works 20 hours of '
   + 'overtime at Rs 200 per hour, and 6% of his <b>total</b> pay is deducted. Find his <b>net</b> pay.',
   { kind: 'number', answer: '18800', prefix: 'Rs' },
   'Add the overtime first, then take the deduction from the whole amount.',
   'Overtime = 20 &times; 200 = Rs 4 000, so the total pay is 16 000 + 4 000 = Rs 20 000. '
   + 'The deduction is 6% of 20 000 = Rs 1 200, so the net pay is 20 000 &minus; 1 200 = Rs 18 800.',
   null],
];

ITEMS.forEach(([id, difficulty, marks, prompt, response, hint, explanation, stim]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection: 'salaries_and_bills', difficulty,
    source: 'NCF Grades 7-9 §3.9 Numbers: Personal and Household Finance (CEB/CWA bills); NCE 2025 Q27 pattern.',
    stimulus: stim ? { html: stim, altText: 'A utility tariff table listing bands of units used against the rate charged per unit for each band.' } : null,
    parts: [{ label: 'a', prompt, marks, hint, explanation, response }],
  }));
});

})();
