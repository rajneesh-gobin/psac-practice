'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - Statistics
//
//  Syllabus: NCF Grades 7-9, §3.9 "Statistics" (PDF p.52, printed 46): use raw
//  data to construct a frequency table (ungrouped); determine the mean, median
//  and mode for an ungrouped frequency distribution using a frequency table.
//
//  Paper style: NCE 2025 Q21 - a bar chart of goals scored in 12 matches,
//  (a) complete a table from it [2], (b) find the mean [2]. NCE 2024 Q28 -
//  a data table, (a) DRAW a bar chart on a supplied grid [2], (b) the pie-chart
//  angle for one category [2].
//
//  ⚠ This chapter is where the paper's `cells` (table completion) and its
//    second drawing task come from. Both are print-only: `cells` has no online
//    renderer yet, and a drawn bar chart cannot be auto-marked at all.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9m-statistics';

// ── A vertical bar chart. Original SVG, monochrome. ──────────────────────
function barChart(labels, values, xTitle, yTitle, yMax) {
  const padL = 46, padB = 40, padT = 14, padR = 12;
  const bw = 34, gap = 20;
  const plotW = labels.length * (bw + gap) + gap;
  const plotH = 150;
  const w = padL + plotW + padR, h = padT + plotH + padB;
  const Y = v => padT + plotH - (v / yMax) * plotH;
  let g = '';
  for (let v = 0; v <= yMax; v++) {
    g += `<line x1="${padL}" y1="${Y(v)}" x2="${padL + plotW}" y2="${Y(v)}" stroke="#c9c9c9" stroke-width="0.6"/>`;
    g += `<text x="${padL - 6}" y="${Y(v) + 4}" font-size="10" text-anchor="end">${v}</text>`;
  }
  labels.forEach((lab, i) => {
    const x = padL + gap + i * (bw + gap);
    g += `<rect x="${x}" y="${Y(values[i])}" width="${bw}" height="${padT + plotH - Y(values[i])}" fill="#d0d0d0" stroke="#000" stroke-width="1.2"/>`;
    g += `<text x="${x + bw / 2}" y="${padT + plotH + 15}" font-size="10" text-anchor="middle">${lab}</text>`;
  });
  g += `<line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="#000" stroke-width="1.4"/>`;
  g += `<line x1="${padL}" y1="${padT + plotH}" x2="${padL + plotW}" y2="${padT + plotH}" stroke="#000" stroke-width="1.4"/>`;
  g += `<text x="${padL + plotW / 2}" y="${h - 6}" font-size="10.5" text-anchor="middle" font-weight="bold">${xTitle}</text>`;
  g += `<text x="10" y="${padT + plotH / 2}" font-size="10.5" text-anchor="middle" font-weight="bold" transform="rotate(-90 10 ${padT + plotH / 2})">${yTitle}</text>`;
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" role="img">${g}</svg>`;
}

// A blank grid for "draw a bar chart", with the axes and scale but no bars.
function blankChartGrid(labels, yTitle, xTitle, yMax) {
  return barChart(labels, labels.map(() => 0), xTitle, yTitle, yMax);
}

// [ id, difficulty, marks, prompt, answer, accept, hint, explanation ]
const ITEMS = [
  ['g9m-sta-001', 1, 1, 'Find the <b>mean</b> of 4, 6, 8 and 10.',
   '7', [], 'Add them up, then divide by how many there are.',
   'The total is 4 + 6 + 8 + 10 = 28, and there are 4 numbers, so the mean is 28 &divide; 4 = 7.'],

  ['g9m-sta-002', 2, 2, 'Find the <b>median</b> of 3, 7, 5, 9 and 4.',
   '5', [], 'Put them in order first.',
   'In order: 3, 4, 5, 7, 9. There are five numbers, so the median is the third one, 5.'],

  ['g9m-sta-003', 1, 1, 'Find the <b>mode</b> of 2, 3, 3, 5, 7 and 3.',
   '3', [], 'The mode is the value that appears most often.',
   '3 appears three times and every other value appears once, so the mode is 3.'],

  ['g9m-sta-004', 1, 1, 'Find the <b>range</b> of 12, 5, 18 and 9.',
   '13', [], 'Largest minus smallest.',
   'The largest is 18 and the smallest is 5, so the range is 18 &minus; 5 = 13.'],

  ['g9m-sta-005', 2, 2, 'Find the <b>mean</b> of 5, 5, 7 and 11.',
   '7', [], 'Total first, then divide by 4.',
   'The total is 5 + 5 + 7 + 11 = 28, so the mean is 28 &divide; 4 = 7.'],

  ['g9m-sta-006', 3, 2, 'Find the <b>median</b> of 6, 2, 9 and 4.',
   '5', [], 'With an even number of values, the median is halfway between the middle two.',
   'In order: 2, 4, 6, 9. The middle two are 4 and 6, so the median is (4 + 6) &divide; 2 = 5.'],

  ['g9m-sta-007', 1, 1, 'Find the <b>mode</b> of 1, 4, 4, 6, 6, 6 and 9.',
   '6', [], 'Count how many times each value appears.',
   '6 appears three times, more than any other value, so the mode is 6.'],

  ['g9m-sta-008', 1, 1, 'Find the <b>mean</b> of 12, 15 and 18.',
   '15', [], 'Add the three numbers and divide by 3.',
   'The total is 12 + 15 + 18 = 45, so the mean is 45 &divide; 3 = 15.'],

  ['g9m-sta-009', 2, 2, 'Find the <b>range</b> of &minus;3, 8, 0 and 5.',
   '11', [], 'Take care: the smallest value is negative.',
   'The largest is 8 and the smallest is &minus;3, so the range is 8 &minus; (&minus;3) = 11.'],

  ['g9m-sta-010', 3, 2, 'Find the <b>median</b> of 10, 2, 8, 6, 4 and 12.',
   '7', [], 'Order them, then average the middle two.',
   'In order: 2, 4, 6, 8, 10, 12. The middle two are 6 and 8, so the median is (6 + 8) &divide; 2 = 7.'],

  ['g9m-sta-011', 3, 2, 'The mean of four numbers is 9. Find their <b>total</b>.',
   '36', [], 'Work the mean formula backwards.',
   'Mean = total &divide; how many, so total = mean &times; how many = 9 &times; 4 = 36.'],

  ['g9m-sta-012', 4, 3, 'The mean of 5, 8, <i>x</i> and 11 is 9. Find the value of <i>x</i>.',
   '12', [], 'Find the total the four numbers must have.',
   'The total must be 9 &times; 4 = 36. Since 5 + 8 + 11 = 24, x = 36 &minus; 24 = 12.'],

  ['g9m-sta-013', 2, 1, 'Find the <b>mode</b> of 7, 7, 8, 9, 9, 9 and 10.',
   '9', [], 'Which value occurs most often?',
   '9 appears three times, more than any other, so the mode is 9.'],

  ['g9m-sta-014', 3, 2, 'Find the <b>mean</b> of 2.5, 3.5 and 6.',
   '4', [], 'Add the decimals carefully, then divide by 3.',
   'The total is 2.5 + 3.5 + 6 = 12, so the mean is 12 &divide; 3 = 4.'],

  ['g9m-sta-015', 2, 2, 'Find the <b>range</b> of 4.5, 2.1, 7.8 and 3.3.',
   '5.7', [], 'Largest minus smallest.',
   'The largest is 7.8 and the smallest is 2.1, so the range is 7.8 &minus; 2.1 = 5.7.'],

  ['g9m-sta-016', 4, 3, 'In a pie chart showing 36 pupils, one sector represents 9 pupils. Calculate the <b>angle</b> of that sector.',
   '90', [], 'A full pie chart is 360&deg;.',
   'Each pupil is worth 360 &divide; 36 = 10&deg;, so 9 pupils are represented by 9 &times; 10 = 90&deg;.',
   ],

  ['g9m-sta-017', 4, 3, 'In a pie chart showing 36 students, 10 chose fruits. Calculate the <b>angle</b> representing fruits.',
   '100', [], 'Find the angle for one student first.',
   '360 &divide; 36 = 10&deg; per student, so 10 students are represented by 10 &times; 10 = 100&deg;.',
   ],

  ['g9m-sta-018', 2, 1, 'A frequency table records a value of 3 occurring 5 times. What is the <b>total</b> contributed by that row?',
   '15', [], 'Multiply the value by its frequency.',
   'Each row of a frequency table contributes value &times; frequency = 3 &times; 5 = 15.'],

  ['g9m-sta-019', 3, 2, 'Find the <b>mean</b> of the first five whole numbers 1, 2, 3, 4 and 5.',
   '3', [], 'Add them, then divide by 5.',
   'The total is 1 + 2 + 3 + 4 + 5 = 15, so the mean is 15 &divide; 5 = 3.'],

  ['g9m-sta-020', 4, 3, 'Six numbers have a mean of 7. When one more number is added, the mean becomes 8. Find the <b>number added</b>.',
   '14', [], 'Compare the total before and the total after.',
   'Six numbers with mean 7 total 42. Seven numbers with mean 8 total 56. The number added is 56 &minus; 42 = 14.'],
];

ITEMS.forEach(([id, difficulty, marks, prompt, answer, accept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection: 'frequency_and_averages', difficulty,
    source: 'NCF Grades 7-9 §3.9 Statistics; NCE 2025 Q21 and 2024 Q28 pattern.',
    parts: [{ label: 'a', prompt, marks, hint, explanation,
              response: { kind: 'number', answer, accept } }],
  }));
});

// ── The bar-chart question, with table completion ────────────────────────
// NCE 2025 Q21 exactly: read the chart, complete the table, find the mean.
// ⚠ `cells` has no online renderer, so projectToItems() drops part (a) and it
//   appears on the printed paper only. Part (b) is dependent, so it is dropped
//   from the online pool too - a child asked for the mean with no table in
//   front of them has been given an unanswerable question.
const GOALS = [2, 4, 2, 3, 1];   // matches with 0, 1, 2, 3, 4 goals - 12 matches
STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-sta-021', chapterId: CH, subsection: 'frequency_and_averages', difficulty: 4,
  source: 'NCF §3.9 Statistics, mean from a frequency table; NCE 2025 Q21 pattern.',
  intro: 'The bar chart shows the number of goals scored in 12 matches of a football tournament.',
  stimulus: {
    html: barChart(['0', '1', '2', '3', '4'], GOALS, 'Number of goals', 'Number of matches', 5),
    altText: 'A bar chart with the number of goals from 0 to 4 along the horizontal axis and the number of matches up the vertical axis.',
  },
  parts: [
    { label: 'a', prompt: 'Using the information given in the bar chart, complete the table below.'
        + '<table style="border-collapse:collapse;margin:8px 0"><tr>'
        + '<td style="border:1px solid #000;padding:4px 10px">Number of goals</td>'
        + ['0', '1', '2', '3', '4'].map(g => `<td style="border:1px solid #000;padding:4px 12px;text-align:center">${g}</td>`).join('')
        + '</tr><tr><td style="border:1px solid #000;padding:4px 10px">Number of matches</td>'
        + '<td style="border:1px solid #000;padding:4px 12px;text-align:center">&hellip;&hellip;</td>'
        + '<td style="border:1px solid #000;padding:4px 12px;text-align:center">4</td>'
        + '<td style="border:1px solid #000;padding:4px 12px;text-align:center">&hellip;&hellip;</td>'
        + '<td style="border:1px solid #000;padding:4px 12px;text-align:center">&hellip;&hellip;</td>'
        + '<td style="border:1px solid #000;padding:4px 12px;text-align:center">1</td>'
        + '</tr></table>',
      marks: 2,
      hint: 'Read the height of each bar against the vertical scale.',
      explanation: 'Reading the bars: 0 goals in 2 matches, 2 goals in 2 matches and 3 goals in 3 matches. '
                 + 'Checking the total: 2 + 4 + 2 + 3 + 1 = 12 matches, as stated.',
      // ⚠ Three cells for [2] is what the real paper does, and three cells
      //   cannot split two marks evenly. marksByCorrect states the marker's
      //   own rule: two right earns 1, all three earn 2.
      response: { kind: 'cells', answer: [['2'], ['2'], ['3']],
                  marksByCorrect: [0, 0, 1, 2] } },
    { label: 'b', prompt: 'Find the <b>mean</b> number of goals scored per match.', marks: 2,
      dependsOn: 'a',
      hint: 'Multiply each number of goals by how many matches, add those up, then divide by 12.',
      explanation: 'Total goals = (0&times;2) + (1&times;4) + (2&times;2) + (3&times;3) + (4&times;1) = 0 + 4 + 4 + 9 + 4 = 21. '
                 + 'The mean is 21 &divide; 12 = 1.75 goals per match.',
      response: { kind: 'number', answer: '1.75', accept: ['7/4', '1 3/4'], unit: 'goals per match' } },
  ],
}));

// ── The second drawing task: draw a bar chart on a supplied grid ─────────
// NCE 2024 Q28(a). Not auto-markable; rubric only, print-only.
STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-sta-022', chapterId: CH, subsection: 'frequency_and_averages', difficulty: 3,
  source: 'NCF §3.9 Statistics; NCE 2024 Q28(a) draw-a-bar-chart pattern.',
  intro: 'A teacher asks 20 pupils to name their favourite fruit. The results are: '
       + 'mango 7, banana 5, pineapple 6, litchi 2.',
  stimulus: {
    html: blankChartGrid(['Mango', 'Banana', 'Pineapple', 'Litchi'], 'Number of pupils', 'Fruit', 8),
    altText: 'A blank chart grid with a labelled horizontal axis for four fruits and a vertical scale from 0 to 8.',
  },
  parts: [
    { label: 'a', prompt: 'Draw a <b>bar chart</b> on the grid above to represent this information.',
      marks: 2,
      rubric: 'One mark for four bars of equal width with correct, evenly spaced positions. '
            + 'One mark for all four heights correct against the scale: mango 7, banana 5, pineapple 6, litchi 2. '
            + 'Award the first mark even if one height is misread.',
      response: { kind: 'drawing' } },
    { label: 'b', prompt: 'Which fruit is the <b>mode</b>?', marks: 1,
      hint: 'The mode is the one chosen by the most pupils.',
      explanation: 'Mango was chosen by 7 pupils, more than any other fruit, so mango is the mode.',
      response: { kind: 'choice', variant: 'options',
                  options: ['Mango', 'Banana', 'Pineapple', 'Litchi'], answer: 'Mango' } },
  ],
}));

})();
