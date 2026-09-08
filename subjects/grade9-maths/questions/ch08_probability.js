'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - Probability
//
//  Syllabus: NCF Grades 7-9, §3.9 "Probability" (PDF p.52, printed 46):
//  understand probability, sample space, outcome and event (simple, combined
//  and complement); find the probability of simple and combined events;
//  construct and use simple possibility diagrams.
//
//  Paper style: NCE 2024 Q23 - a numbered spinner, P(even) then P(not 7).
//  NCE 2025 Q31 - a bag of 12 red and x blue balls, (a)(i) the total in terms
//  of x, (a)(ii) P(red) in terms of x, (b) given P(blue) = 3/5, find x.
//
//  ⚠ Probabilities are written as fractions in their simplest form, and the
//    decimal equivalent is accepted where it terminates. A probability is never
//    greater than 1 and never negative; scripts/test-grade9-maths-content.js
//    checks every numeric answer in this chapter for that.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9m-probability';

// ── An eight-sector spinner. Original SVG, monochrome. ──────────────────
function spinner(labels) {
  const cx = 92, cy = 96, r = 68, n = labels.length;
  let g = `<circle cx="${cx}" cy="${cy}" r="${r + 7}" fill="#e6e6e6" stroke="#000" stroke-width="1.2"/>`;
  g += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="#000" stroke-width="1.2"/>`;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * 2 * Math.PI - Math.PI / 2;
    g += `<line x1="${cx}" y1="${cy}" x2="${(cx + r * Math.cos(a)).toFixed(1)}" y2="${(cy + r * Math.sin(a)).toFixed(1)}" stroke="#000" stroke-width="1"/>`;
    const mid = ((i + 0.5) / n) * 2 * Math.PI - Math.PI / 2;
    g += `<text x="${(cx + r * 0.66 * Math.cos(mid)).toFixed(1)}" y="${(cy + r * 0.66 * Math.sin(mid) + 4).toFixed(1)}"`
       + ` font-size="13" font-weight="bold" text-anchor="middle">${labels[i]}</text>`;
  }
  g += `<polygon points="${cx - 11},${cy - r - 14} ${cx + 11},${cy - r - 14} ${cx},${cy - r + 4}" fill="#9a9a9a" stroke="#000" stroke-width="1.1"/>`;
  return `<svg viewBox="0 0 184 190" width="184" height="190" xmlns="http://www.w3.org/2000/svg" role="img">${g}</svg>`;
}
const ALT_SPINNER = 'A circular spinner divided into eight equal sectors, each carrying a number, with an arrow at the top.';

// A possibility diagram: the grid of outcomes for two dice or two spins.
function possibilityTable(rowVals, colVals, cell) {
  let h = '<table style="border-collapse:collapse;margin:6px 0;font-size:.95em">';
  h += '<tr><td style="border:1px solid #000;padding:3px 8px;background:#eee"></td>'
     + colVals.map(c => `<td style="border:1px solid #000;padding:3px 9px;text-align:center;background:#eee"><b>${c}</b></td>`).join('') + '</tr>';
  rowVals.forEach(r => {
    h += `<tr><td style="border:1px solid #000;padding:3px 9px;text-align:center;background:#eee"><b>${r}</b></td>`
       + colVals.map(c => `<td style="border:1px solid #000;padding:3px 9px;text-align:center">${cell(r, c)}</td>`).join('') + '</tr>';
  });
  return h + '</table>';
}

const SPIN8 = spinner([2, 3, 4, 5, 6, 7, 8, 9]);

// [ id, difficulty, marks, prompt, answer, accept, hint, explanation, svg ]
const ITEMS = [
  ['g9m-prb-001', 1, 1, 'A fair six-sided die is thrown once. Find the probability of getting an <b>even</b> number.',
   '1/2', ['0.5', '3/6'], 'Three of the six faces are even.',
   'The even faces are 2, 4 and 6, so the probability is 3/6 = 1/2.', null],

  ['g9m-prb-002', 1, 1, 'A fair six-sided die is thrown once. Find the probability of getting a <b>3</b>.',
   '1/6', [], 'There is one face showing 3.',
   'One of the six equally likely faces is a 3, so the probability is 1/6.', null],

  ['g9m-prb-003', 2, 1, 'A fair six-sided die is thrown once. Find the probability of getting a number <b>greater than 4</b>.',
   '1/3', ['2/6'], 'Which faces are greater than 4?',
   'The faces greater than 4 are 5 and 6, so the probability is 2/6 = 1/3.', null],

  ['g9m-prb-004', 2, 1, 'The spinner shown is spun <b>once</b>. Find the probability that the arrow shows an <b>even</b> number.',
   '1/2', ['4/8', '0.5'], 'Count the even numbers on the spinner.',
   'The even numbers are 2, 4, 6 and 8 - four of the eight sectors - so the probability is 4/8 = 1/2.',
   SPIN8],

  ['g9m-prb-005', 2, 1, 'The spinner shown is spun <b>once</b>. Find the probability that the arrow does <b>not</b> show 7.',
   '7/8', [], 'Every sector except one.',
   'Only one of the eight sectors is a 7, so the probability of NOT getting 7 is 1 &minus; 1/8 = 7/8.',
   SPIN8],

  ['g9m-prb-006', 2, 1, 'The spinner shown is spun <b>once</b>. Find the probability that the arrow shows a number <b>less than 5</b>.',
   '3/8', [], 'List the sectors below 5.',
   'The sectors below 5 are 2, 3 and 4 - three of eight - so the probability is 3/8.',
   SPIN8],

  ['g9m-prb-007', 3, 2, 'The spinner shown is spun <b>once</b>. Find the probability that the arrow shows a <b>prime</b> number.',
   '1/2', ['4/8', '0.5'], 'A prime has exactly two factors.',
   'The primes on the spinner are 2, 3, 5 and 7 - four of eight - so the probability is 4/8 = 1/2.',
   SPIN8],

  ['g9m-prb-008', 1, 1, 'A bag contains 5 red and 3 green marbles. One marble is taken at random. Find the probability that it is <b>green</b>.',
   '3/8', [], 'How many marbles are there altogether?',
   'There are 5 + 3 = 8 marbles and 3 are green, so the probability is 3/8.', null],

  ['g9m-prb-009', 2, 2, 'A bag contains 5 red and 3 green marbles. One marble is taken at random. Find the probability that it is <b>not</b> red.',
   '3/8', [], 'The complement of "red" is "green" here.',
   'P(red) = 5/8, so P(not red) = 1 &minus; 5/8 = 3/8.', null],

  ['g9m-prb-010', 1, 1, 'A fair coin is tossed once. Find the probability of getting a <b>head</b>.',
   '1/2', ['0.5'], 'There are two equally likely outcomes.',
   'A coin has two equally likely outcomes, so P(head) = 1/2.', null],

  ['g9m-prb-011', 2, 2, 'The probability that it rains tomorrow is 0.3. Find the probability that it does <b>not</b> rain.',
   '0.7', ['7/10'], 'The two probabilities must add to 1.',
   'P(not rain) = 1 &minus; 0.3 = 0.7.', null],

  ['g9m-prb-012', 2, 1, 'A letter is chosen at random from the word <b>MAURITIUS</b>. Find the probability that it is a <b>U</b>.',
   '2/9', [], 'Count the letters, then count the Us.',
   'MAURITIUS has 9 letters and two of them are U, so the probability is 2/9.', null],

  ['g9m-prb-013', 3, 2, 'A letter is chosen at random from the word <b>MAURITIUS</b>. Find the probability that it is a <b>vowel</b>.',
   '5/9', [], 'A, E, I, O and U are the vowels.',
   'The vowels in MAURITIUS are A, U, I, I and U - five of the nine letters - so the probability is 5/9.',
   null],

  ['g9m-prb-014', 2, 1, 'A box holds 20 pens, of which 4 are faulty. One pen is taken at random. Find the probability that it is <b>faulty</b>.',
   '1/5', ['4/20', '0.2'], 'Simplify the fraction.',
   '4 out of 20 pens are faulty, so the probability is 4/20 = 1/5.', null],

  ['g9m-prb-015', 3, 2, 'A fair six-sided die is thrown once. Find the probability of getting a number that is <b>both</b> even <b>and</b> greater than 3.',
   '1/3', ['2/6'], 'List the faces that satisfy both conditions.',
   'The faces that are even AND greater than 3 are 4 and 6, so the probability is 2/6 = 1/3.', null],

  ['g9m-prb-016', 2, 1, 'What is the probability of an event that is <b>certain</b> to happen?',
   '1', [], 'Probability runs from 0 to 1.',
   'A certain event has probability 1.', null],

  ['g9m-prb-017', 2, 1, 'What is the probability of an event that is <b>impossible</b>?',
   '0', [], 'Probability runs from 0 to 1.',
   'An impossible event has probability 0.', null],

  ['g9m-prb-018', 3, 2, 'A bag contains 7 blue and 5 yellow counters. Two more blue counters are added. Find the probability of drawing a <b>yellow</b> counter.',
   '5/14', [], 'Recount the total after the counters are added.',
   'After adding 2 blue counters there are 9 blue and 5 yellow, so 14 altogether. P(yellow) = 5/14.',
   null],

  ['g9m-prb-019', 4, 3, 'In a class of 30 pupils, 18 study French. One pupil is chosen at random. Find the probability that the pupil does <b>not</b> study French, giving your answer in its <b>simplest form</b>.',
   '2/5', ['12/30'], 'Find how many do not study French first.',
   '30 &minus; 18 = 12 pupils do not study French, so the probability is 12/30 = 2/5.', null],

  ['g9m-prb-020', 4, 3, 'A bag contains only red and blue balls. The probability of drawing a red ball is <sup>2</sup>&frasl;<sub>7</sub>. There are 15 blue balls. Find the <b>total</b> number of balls.',
   '21', [], 'If P(red) is 2/7 then P(blue) is 5/7.',
   'P(blue) = 1 &minus; 2/7 = 5/7. If 5/7 of the total is 15 balls, then 1/7 of the total is 3, so the total is 21. '
   + 'Checking: 21 &minus; 15 = 6 red, and 6/21 = 2/7 as required.',
   null],
];

ITEMS.forEach(([id, difficulty, marks, prompt, answer, accept, hint, explanation, svg]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection: 'simple_and_combined_events', difficulty,
    source: 'NCF Grades 7-9 §3.9 Probability; NCE 2024 Q23 and 2025 Q31 pattern.',
    stimulus: svg ? { html: svg, altText: ALT_SPINNER } : null,
    parts: [{ label: 'a', prompt, marks, hint, explanation,
              response: { kind: 'number', answer, accept } }],
  }));
});

// ── The possibility diagram the syllabus names explicitly ────────────────
// §3.9: "Construct and use simple possibility diagrams to find probabilities."
STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-prb-021', chapterId: CH, subsection: 'simple_and_combined_events', difficulty: 4,
  source: 'NCF §3.9 Probability, "construct and use simple possibility diagrams".',
  intro: 'Two fair coins are tossed together. The possibility diagram below shows all the outcomes, '
       + 'where <b>H</b> is a head and <b>T</b> is a tail.'
       + possibilityTable(['H', 'T'], ['H', 'T'], (r, c) => r + c),
  parts: [
    { label: 'a', prompt: 'Write down the total number of possible outcomes.', marks: 1,
      hint: 'Count the cells inside the table.',
      explanation: 'The table has 2 rows and 2 columns, giving 2 &times; 2 = 4 possible outcomes.',
      response: { kind: 'number', answer: '4' } },
    { label: 'b.i', prompt: 'Find the probability of getting <b>two heads</b>.', marks: 1,
      hint: 'How many cells show HH?',
      explanation: 'Only one of the four outcomes is HH, so the probability is 1/4.',
      response: { kind: 'number', answer: '1/4', accept: ['0.25'] } },
    { label: 'b.ii', prompt: 'Find the probability of getting <b>exactly one head</b>.', marks: 2,
      hint: 'Two of the outcomes have one head and one tail.',
      explanation: 'The outcomes HT and TH each have exactly one head, so the probability is 2/4 = 1/2.',
      response: { kind: 'number', answer: '1/2', accept: ['2/4', '0.5'] } },
  ],
}));

// ── The paper's algebraic probability question ───────────────────────────
// NCE 2025 Q31 exactly: (a)(i), (a)(ii), (b) - three-level numbering, an
// answer in terms of x, then an equation to solve.
STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-prb-022', chapterId: CH, subsection: 'simple_and_combined_events', difficulty: 4,
  source: 'NCF §3.9 Probability; NCE 2025 Q31 three-level algebraic structure.',
  intro: 'A bag contains 12 red balls and <i>x</i> blue balls. A ball is chosen at random from the bag.',
  parts: [
    { label: 'a.i', prompt: 'Write down, in terms of <i>x</i>, the <b>total</b> number of balls in the bag.',
      marks: 1,
      hint: 'Add the two amounts.',
      explanation: 'There are 12 red and x blue, so the total is 12 + x balls.',
      response: { kind: 'expression', answer: '12+x', accept: ['x+12'], unit: 'balls' } },
    { label: 'a.ii', prompt: 'Find, in terms of <i>x</i>, the probability that a <b>red</b> ball is chosen.',
      marks: 1,
      hint: 'Probability is the number of red balls over the total.',
      explanation: 'P(red) = 12 &divide; (12 + x), which is written 12/(12 + x).',
      response: { kind: 'expression', answer: '12/(12+x)', accept: ['12/(x+12)'] } },
    { label: 'b', prompt: 'Given that the probability that a <b>blue</b> ball is chosen equals <sup>3</sup>&frasl;<sub>5</sub>, find the <b>value</b> of <i>x</i>.',
      marks: 3, dependsOn: 'a.i',
      hint: 'Write P(blue) as a fraction in terms of x, then set it equal to 3/5 and cross-multiply.',
      explanation: 'P(blue) = x/(12 + x) = 3/5. Cross-multiplying gives 5x = 3(12 + x) = 36 + 3x, '
                 + 'so 2x = 36 and x = 18.',
      response: { kind: 'number', answer: '18', label: 'x' } },
  ],
}));

})();
