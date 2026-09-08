'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - Formulae & Changing the Subject
//
//  Syllabus: NCF Grades 7-9, §3.9 "Algebraic manipulation" (PDF p.52,
//  printed 46): evaluate an unknown quantity in a given formula or equation;
//  change the subject of a formula.
//
//  ⚠ THIS CONTENT AREA WAS MISSING FROM THE PACK. "Change the subject" had
//    been filed inside Algebraic Expressions, which hid the fact that
//    "evaluate an unknown quantity in a given formula" had no home at all.
//    See docs/nce-grade9/syllabus-map.md.
//
//  Paper style: NCE 2025 Q23 - "A formula is given by A = πr² + πrl.
//  (a) Calculate the value of A when r = 7 and l = 4, leaving your answer in
//  terms of π [2]. (b) Make l the subject of the formula, leaving your answer
//  in terms of π [2]." Both halves of the outcome, in one question.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9m-manipulation';

// [ id, difficulty, marks, prompt, response, hint, explanation ]
const ITEMS = [
  ['g9m-man-001', 1, 1, 'Make <i>x</i> the subject of <i>y</i> = <i>x</i> + 5.',
   { kind: 'expression', answer: 'x=y-5' }, 'Subtract 5 from both sides.',
   'Subtracting 5 from both sides gives x = y &minus; 5.'],

  ['g9m-man-002', 2, 1, 'Make <i>x</i> the subject of <i>y</i> = 3<i>x</i>.',
   { kind: 'expression', answer: 'x=y/3' }, 'Divide both sides by 3.',
   'Dividing both sides by 3 gives x = y/3.'],

  ['g9m-man-003', 2, 2, 'Make <i>x</i> the subject of <i>y</i> = 2<i>x</i> + 7.',
   { kind: 'expression', answer: 'x=(y-7)/2' }, 'Undo the +7 first, then the &times;2.',
   'Subtracting 7: y &minus; 7 = 2x. Dividing by 2: x = (y &minus; 7)/2.'],

  ['g9m-man-004', 3, 2, 'Make <i>r</i> the subject of <i>C</i> = 2&pi;<i>r</i>.',
   { kind: 'expression', answer: 'r=C/(2pi)', accept: ['r=C/2pi', 'r=c/(2pi)', 'r=c/2pi'] },
   'Divide both sides by everything multiplying r.',
   'Dividing both sides by 2&pi; gives r = C/(2&pi;).'],

  ['g9m-man-005', 3, 2, 'Make <i>h</i> the subject of <i>V</i> = <i>lwh</i>.',
   { kind: 'expression', answer: 'h=V/(lw)', accept: ['h=V/lw', 'h=v/(lw)', 'h=v/lw'] },
   'Divide both sides by the two lengths.',
   'Dividing both sides by lw gives h = V/(lw).'],

  ['g9m-man-006', 3, 2, 'Make <i>b</i> the subject of <i>A</i> = <sup>1</sup>&frasl;<sub>2</sub><i>bh</i>.',
   { kind: 'expression', answer: 'b=2A/h', accept: ['b=2a/h'] },
   'Multiply by 2 first, then divide by h.',
   'Multiplying both sides by 2: 2A = bh. Dividing by h: b = 2A/h.'],

  ['g9m-man-007', 2, 2, 'Find the value of <i>y</i> when <i>x</i> = 4, given <i>y</i> = 3<i>x</i> &minus; 2.',
   { kind: 'number', answer: '10', label: 'y' }, 'Substitute 4 in place of x.',
   'y = 3(4) &minus; 2 = 12 &minus; 2 = 10.'],

  ['g9m-man-008', 2, 2, 'Find the value of <i>A</i> when <i>l</i> = 6 and <i>w</i> = 5, given <i>A</i> = <i>lw</i>.',
   { kind: 'number', answer: '30', label: 'A' }, 'Multiply the two values.',
   'A = 6 &times; 5 = 30.'],

  ['g9m-man-009', 3, 2, 'Find the value of <i>V</i> when <i>l</i> = 4, <i>w</i> = 3 and <i>h</i> = 2, '
   + 'given <i>V</i> = <i>lwh</i>.',
   { kind: 'number', answer: '24', label: 'V' }, 'Multiply all three values.',
   'V = 4 &times; 3 &times; 2 = 24.'],

  ['g9m-man-010', 3, 2, 'Find the value of <i>s</i> when <i>u</i> = 5, <i>t</i> = 3 and <i>a</i> = 2, '
   + 'given <i>s</i> = <i>ut</i> + <i>at</i><sup>2</sup>.',
   { kind: 'number', answer: '33', label: 's' }, 'Work out each term separately, then add.',
   'ut = 5 &times; 3 = 15 and at&sup2; = 2 &times; 9 = 18, so s = 15 + 18 = 33.'],

  ['g9m-man-011', 3, 2, 'Find the value of <i>A</i> when <i>r</i> = 7 and <i>l</i> = 4, given '
   + '<i>A</i> = &pi;<i>r</i><sup>2</sup> + &pi;<i>rl</i>. Leave your answer <b>in terms of &pi;</b>.',
   { kind: 'expression', answer: '77pi', accept: ['77π'], label: 'A' },
   'Work out each term with &pi; kept as a symbol, then add.',
   '&pi;r&sup2; = 49&pi; and &pi;rl = &pi; &times; 7 &times; 4 = 28&pi;. '
   + 'Adding: A = 49&pi; + 28&pi; = 77&pi;.'],

  ['g9m-man-012', 4, 2, 'Make <i>l</i> the subject of <i>A</i> = &pi;<i>r</i><sup>2</sup> + &pi;<i>rl</i>, '
   + 'leaving your answer <b>in terms of &pi;</b>.',
   { kind: 'expression', answer: 'l=(A-pir^2)/(pir)', accept: ['l=(A-pi r^2)/(pi r)', 'l=(a-pir^2)/(pir)'] },
   'Get the term containing l on its own first.',
   'Subtracting &pi;r&sup2; from both sides: A &minus; &pi;r&sup2; = &pi;rl. '
   + 'Dividing by &pi;r: l = (A &minus; &pi;r&sup2;)/(&pi;r).'],

  ['g9m-man-013', 3, 2, 'Make <i>C</i> the subject of <i>F</i> = <sup>9</sup>&frasl;<sub>5</sub><i>C</i> + 32.',
   { kind: 'expression', answer: 'C=5(F-32)/9', accept: ['C=(5(F-32))/9', 'c=5(f-32)/9'] },
   'Subtract 32 first, then undo the fraction.',
   'Subtracting 32: F &minus; 32 = (9/5)C. Multiplying by 5 and dividing by 9: '
   + 'C = 5(F &minus; 32)/9.'],

  ['g9m-man-014', 2, 2, 'Find the value of <i>P</i> when <i>l</i> = 8 and <i>w</i> = 3, given '
   + '<i>P</i> = 2(<i>l</i> + <i>w</i>).',
   { kind: 'number', answer: '22', label: 'P' }, 'Do the bracket first.',
   'l + w = 11, so P = 2 &times; 11 = 22.'],

  ['g9m-man-015', 3, 2, 'Make <i>w</i> the subject of <i>P</i> = 2(<i>l</i> + <i>w</i>).',
   { kind: 'expression', answer: 'w=(P-2l)/2', accept: ['w=P/2-l', 'w=(p-2l)/2'] },
   'Expand the bracket, or divide by 2 first.',
   'Dividing by 2: P/2 = l + w. Subtracting l: w = P/2 &minus; l, which is the same as (P &minus; 2l)/2.'],

  ['g9m-man-016', 3, 2, 'Find the value of <i>x</i> when <i>y</i> = 17, given <i>y</i> = 4<i>x</i> + 1.',
   { kind: 'number', answer: '4', label: 'x' }, 'Substitute, then solve the equation.',
   '17 = 4x + 1, so 4x = 16 and x = 4.'],

  ['g9m-man-017', 4, 3, 'Make <i>r</i> the subject of <i>V</i> = &pi;<i>r</i><sup>2</sup><i>h</i>.',
   { kind: 'expression', answer: 'r=sqrt(V/(pih))', accept: ['r=sqrt(V/(pi h))', 'r=√(V/(pih))', 'r=sqrt(v/(pih))'] },
   'Isolate r&sup2; first, then take the square root.',
   'Dividing both sides by &pi;h: r&sup2; = V/(&pi;h). Taking the square root: '
   + 'r = &radic;(V/(&pi;h)).'],

  ['g9m-man-018', 3, 2, 'Find the value of <i>a</i> when <i>v</i> = 20, <i>u</i> = 4 and <i>t</i> = 8, '
   + 'given <i>v</i> = <i>u</i> + <i>at</i>.',
   { kind: 'number', answer: '2', label: 'a' }, 'Substitute the three values, then solve for a.',
   '20 = 4 + 8a, so 8a = 16 and a = 2.'],

  ['g9m-man-019', 3, 2, 'Make <i>t</i> the subject of <i>v</i> = <i>u</i> + <i>at</i>.',
   { kind: 'expression', answer: 't=(v-u)/a' }, 'Get the term with t alone, then divide.',
   'Subtracting u: v &minus; u = at. Dividing by a: t = (v &minus; u)/a.'],

  ['g9m-man-020', 4, 3, 'Make <i>x</i> the subject of <i>y</i> = <sup>(<i>x</i> + 3)</sup>&frasl;<sub>4</sub>.',
   { kind: 'expression', answer: 'x=4y-3' }, 'Multiply both sides by 4 first.',
   'Multiplying both sides by 4: 4y = x + 3. Subtracting 3: x = 4y &minus; 3.'],
];

ITEMS.forEach(([id, difficulty, marks, prompt, response, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection: 'formulae_and_subject', difficulty,
    source: 'NCF Grades 7-9 §3.9 Algebraic manipulation; NCE 2025 Q23 pattern.',
    parts: [{ label: 'a', prompt, marks, hint, explanation, response }],
  }));
});

// ── The paper's own two-part question, NCE 2025 Q23 ─────────────────────
// Both halves of the outcome in one task: evaluate the formula, then change
// its subject - the second part in terms of pi, as the paper asks.
STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-man-021', chapterId: CH, subsection: 'formulae_and_subject', difficulty: 4,
  source: 'NCF §3.9 Algebraic manipulation; NCE 2025 Q23 two-part structure.',
  intro: 'A formula is given by <i>A</i> = &pi;<i>r</i><sup>2</sup> + &pi;<i>rl</i>.',
  parts: [
    { label: 'a', prompt: 'Calculate the value of <i>A</i> when <i>r</i> = 5 cm and <i>l</i> = 3 cm. '
        + 'Leave your answer <b>in terms of &pi;</b>.',
      marks: 2,
      hint: 'Work out each term with &pi; kept as a symbol.',
      explanation: '&pi;r&sup2; = 25&pi; and &pi;rl = &pi; &times; 5 &times; 3 = 15&pi;. '
                 + 'Adding: A = 25&pi; + 15&pi; = 40&pi;.',
      response: { kind: 'expression', answer: '40pi', accept: ['40π'], label: 'A' } },
    { label: 'b', prompt: 'Make <i>l</i> the subject of the formula, leaving your answer '
        + '<b>in terms of &pi;</b>.',
      marks: 2,
      hint: 'Move the term without l to the other side, then divide.',
      explanation: 'Subtracting &pi;r&sup2;: A &minus; &pi;r&sup2; = &pi;rl. '
                 + 'Dividing by &pi;r: l = (A &minus; &pi;r&sup2;)/(&pi;r).',
      response: { kind: 'expression', answer: 'l=(A-pir^2)/(pir)',
                  accept: ['l=(A-pi r^2)/(pi r)', 'l=(a-pir^2)/(pir)'] } },
  ],
}));

})();
