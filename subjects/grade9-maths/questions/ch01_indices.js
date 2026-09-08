'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - Indices
//
//  Syllabus: NCF Grades 7-9, §3.9 "Numbers: Indices" (PDF p.48, printed 42):
//    negative indices; multiplication, division and power laws; the zero
//    index; solving simple equations involving indices.
//
//  Paper style: measured on NCE 2025 Q10 "Simplify (a^5)^4" [1] and Q17
//  "(a) Find the value of m, if 27 = 3^m [1]  (b) Hence, solve 3^6x / 3^4x = 27
//  [2]" - one-mark single-step simplifications, then two- and three-mark
//  evaluations and index equations.
//
//  ⚠ EVERY ANSWER IS RE-DERIVED INDEPENDENTLY by
//    scripts/test-grade9-maths-content.js, which evaluates the index
//    arithmetic itself rather than trusting the table below. A question whose
//    stated answer does not match the recomputed one fails the build.
//
//  ⚠ Answers use ^ for a power: "a^8", never "a8". The `expr` renderer prints
//    a hint saying so, because there is no caret on a phone's number pad and a
//    child should not lose a mark to notation nobody explained.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9m-indices';

// [ id, subsection, difficulty, marks, prompt, answer, accept[], hint, explanation ]
const ITEMS = [

  // ── laws: multiplication, division, power and zero index ────────────────
  ['g9m-ind-001', 'laws', 1, 1, 'Simplify <i>a</i><sup>5</sup> &times; <i>a</i><sup>3</sup>.',
   'a^8', [],
   'When you multiply powers of the same letter, add the indices.',
   'a<sup>5</sup> &times; a<sup>3</sup> = a<sup>5+3</sup> = a<sup>8</sup>.'],

  ['g9m-ind-002', 'laws', 1, 1, 'Simplify (<i>m</i><sup>3</sup>)<sup>5</sup>.',
   'm^15', [],
   'A power raised to a power: multiply the indices.',
   '(m<sup>3</sup>)<sup>5</sup> = m<sup>3&times;5</sup> = m<sup>15</sup>.'],

  ['g9m-ind-003', 'laws', 1, 1, 'Simplify <i>x</i><sup>7</sup> &divide; <i>x</i><sup>2</sup>.',
   'x^5', [],
   'When you divide powers of the same letter, subtract the indices.',
   'x<sup>7</sup> &divide; x<sup>2</sup> = x<sup>7&minus;2</sup> = x<sup>5</sup>.'],

  ['g9m-ind-004', 'laws', 1, 1, 'Simplify (<i>a</i><sup>5</sup>)<sup>4</sup>.',
   'a^20', [],
   'Multiply the two indices.',
   '(a<sup>5</sup>)<sup>4</sup> = a<sup>5&times;4</sup> = a<sup>20</sup>.'],

  ['g9m-ind-005', 'laws', 2, 1, 'Simplify 2<i>y</i><sup>3</sup> &times; 5<i>y</i><sup>4</sup>.',
   '10y^7', [],
   'Multiply the numbers, then add the indices of y.',
   '2 &times; 5 = 10 and y<sup>3</sup> &times; y<sup>4</sup> = y<sup>7</sup>, so the answer is 10y<sup>7</sup>.'],

  ['g9m-ind-006', 'laws', 2, 1, 'Simplify 12<i>p</i><sup>6</sup> &divide; 4<i>p</i><sup>2</sup>.',
   '3p^4', [],
   'Divide the numbers, then subtract the indices of p.',
   '12 &divide; 4 = 3 and p<sup>6</sup> &divide; p<sup>2</sup> = p<sup>4</sup>, so the answer is 3p<sup>4</sup>.'],

  ['g9m-ind-007', 'laws', 1, 1, 'Evaluate 5<sup>0</sup>.',
   '1', [],
   'Any number except 0, raised to the power zero, has the same value.',
   'By the zero index law, a<sup>0</sup> = 1 for any a &ne; 0. So 5<sup>0</sup> = 1.'],

  ['g9m-ind-008', 'laws', 2, 2, 'Simplify (3<i>x</i><sup>2</sup>)<sup>3</sup>.',
   '27x^6', [],
   'The index outside the bracket applies to the 3 as well as to x&sup2;.',
   '(3x<sup>2</sup>)<sup>3</sup> = 3<sup>3</sup> &times; x<sup>2&times;3</sup> = 27x<sup>6</sup>.'],

  ['g9m-ind-009', 'laws', 3, 2, 'Simplify (2<i>a</i><sup>3</sup><i>b</i>)<sup>4</sup>.',
   '16a^12b^4', ['16b^4a^12'],
   'Raise every factor inside the bracket to the power 4.',
   '(2a<sup>3</sup>b)<sup>4</sup> = 2<sup>4</sup> &times; a<sup>3&times;4</sup> &times; b<sup>4</sup> = 16a<sup>12</sup>b<sup>4</sup>.'],

  ['g9m-ind-010', 'laws', 2, 2, 'Simplify <i>a</i><sup>6</sup> &times; <i>a</i><sup>0</sup> &divide; <i>a</i><sup>2</sup>.',
   'a^4', [],
   'Work left to right, remembering that a<sup>0</sup> = 1.',
   'a<sup>6</sup> &times; a<sup>0</sup> = a<sup>6+0</sup> = a<sup>6</sup>, then a<sup>6</sup> &divide; a<sup>2</sup> = a<sup>4</sup>.'],

  ['g9m-ind-011', 'laws', 3, 2, 'Evaluate (7<sup>3</sup> &times; 7<sup>2</sup>) &divide; 7<sup>4</sup>.',
   '7', [],
   'Combine the indices before working out any value.',
   '7<sup>3</sup> &times; 7<sup>2</sup> = 7<sup>5</sup>, and 7<sup>5</sup> &divide; 7<sup>4</sup> = 7<sup>1</sup> = 7.'],

  ['g9m-ind-012', 'laws', 3, 2, 'Simplify (<i>x</i><sup>4</sup><i>y</i><sup>3</sup>)<sup>2</sup> &times; <i>x</i>.',
   'x^9y^6', ['y^6x^9'],
   'Expand the bracket first, then multiply by x.',
   '(x<sup>4</sup>y<sup>3</sup>)<sup>2</sup> = x<sup>8</sup>y<sup>6</sup>. Multiplying by x gives x<sup>8+1</sup>y<sup>6</sup> = x<sup>9</sup>y<sup>6</sup>.'],

  ['g9m-ind-013', 'laws', 1, 1, 'Evaluate 3<sup>4</sup> &divide; 3<sup>2</sup>.',
   '9', [],
   'Subtract the indices first.',
   '3<sup>4</sup> &divide; 3<sup>2</sup> = 3<sup>2</sup> = 9.'],

  ['g9m-ind-014', 'laws', 3, 3, 'Simplify (4<i>m</i><sup>2</sup><i>n</i><sup>3</sup>)<sup>2</sup> &divide; (2<i>mn</i>).',
   '8m^3n^5', ['8n^5m^3'],
   'Square the bracket first, then divide each part.',
   '(4m<sup>2</sup>n<sup>3</sup>)<sup>2</sup> = 16m<sup>4</sup>n<sup>6</sup>. Dividing by 2mn: 16 &divide; 2 = 8, m<sup>4&minus;1</sup> = m<sup>3</sup>, n<sup>6&minus;1</sup> = n<sup>5</sup>, giving 8m<sup>3</sup>n<sup>5</sup>.'],

  ['g9m-ind-015', 'laws', 2, 1, 'Given that 2<sup><i>x</i></sup> = 32, find the value of <i>x</i>.',
   '5', [],
   'Write 32 as a power of 2.',
   '32 = 2<sup>5</sup>, so 2<sup>x</sup> = 2<sup>5</sup> and x = 5.'],

  ['g9m-ind-016', 'laws', 3, 2, 'Simplify 6<i>a</i><sup>4</sup> &times; 3<i>a</i><sup>2</sup> &divide; 9<i>a</i><sup>3</sup>.',
   '2a^3', [],
   'Multiply first, then divide.',
   '6a<sup>4</sup> &times; 3a<sup>2</sup> = 18a<sup>6</sup>. Then 18a<sup>6</sup> &divide; 9a<sup>3</sup> = 2a<sup>3</sup>.'],

  ['g9m-ind-017', 'laws', 2, 2, 'Evaluate (5<sup>2</sup>)<sup>0</sup> + 4<sup>0</sup>.',
   '2', [],
   'Anything to the power zero is 1 - including a bracket.',
   '(5<sup>2</sup>)<sup>0</sup> = 1 and 4<sup>0</sup> = 1, so the sum is 1 + 1 = 2.'],

  ['g9m-ind-018', 'laws', 1, 1, 'Simplify (<i>p</i><sup>3</sup><i>q</i><sup>2</sup>)<sup>3</sup>.',
   'p^9q^6', ['q^6p^9'],
   'Multiply each index inside the bracket by 3.',
   '(p<sup>3</sup>q<sup>2</sup>)<sup>3</sup> = p<sup>3&times;3</sup>q<sup>2&times;3</sup> = p<sup>9</sup>q<sup>6</sup>.'],

  ['g9m-ind-019', 'laws', 2, 2, 'Simplify 20<i>x</i><sup>8</sup> &divide; 5<i>x</i><sup>8</sup>.',
   '4', [],
   'What happens to x when the indices are equal?',
   '20 &divide; 5 = 4 and x<sup>8</sup> &divide; x<sup>8</sup> = x<sup>0</sup> = 1, so the answer is simply 4.'],

  ['g9m-ind-020', 'laws', 2, 2, 'Evaluate (2<sup>3</sup> &times; 2<sup>4</sup>) &divide; 2<sup>5</sup>.',
   '4', [],
   'Add the indices on the top, then subtract the one below.',
   '2<sup>3</sup> &times; 2<sup>4</sup> = 2<sup>7</sup>, and 2<sup>7</sup> &divide; 2<sup>5</sup> = 2<sup>2</sup> = 4.'],

  // ── negative_indices ────────────────────────────────────────────────────
  ['g9m-ind-021', 'negative_indices', 1, 1, 'Write 3<sup>&minus;2</sup> as a fraction.',
   '1/9', [],
   'A negative index means one over the positive power.',
   '3<sup>&minus;2</sup> = 1 &divide; 3<sup>2</sup> = 1/9.'],

  ['g9m-ind-022', 'negative_indices', 1, 1, 'Write <sup>1</sup>&frasl;<sub>5<sup>3</sup></sub> as a power of 5.',
   '5^-3', [],
   'Moving a power from the bottom of a fraction to the top changes the sign of the index.',
   '1 &divide; 5<sup>3</sup> = 5<sup>&minus;3</sup>.'],

  ['g9m-ind-023', 'negative_indices', 1, 1, 'Evaluate 2<sup>&minus;4</sup>.',
   '1/16', [],
   'Work out the positive power first, then take one over it.',
   '2<sup>4</sup> = 16, so 2<sup>&minus;4</sup> = 1/16.'],

  ['g9m-ind-024', 'negative_indices', 1, 1, 'Write 4<sup>&minus;1</sup> as a fraction.',
   '1/4', [],
   'An index of &minus;1 gives the reciprocal.',
   '4<sup>&minus;1</sup> = 1/4.'],

  ['g9m-ind-025', 'negative_indices', 1, 1, 'Write <i>x</i><sup>&minus;3</sup> as a fraction.',
   '1/x^3', [],
   'The letter moves to the bottom of the fraction.',
   'x<sup>&minus;3</sup> = 1/x<sup>3</sup>.'],

  ['g9m-ind-026', 'negative_indices', 2, 1, 'Evaluate 10<sup>&minus;3</sup>.',
   '1/1000', ['0.001'],
   'Ten cubed is a thousand.',
   '10<sup>3</sup> = 1000, so 10<sup>&minus;3</sup> = 1/1000 = 0.001.'],

  ['g9m-ind-027', 'negative_indices', 1, 1, 'Write <sup>1</sup>&frasl;<sub>2<sup>5</sup></sub> using a negative index.',
   '2^-5', [],
   'Change the sign of the index as the power moves up.',
   '1 &divide; 2<sup>5</sup> = 2<sup>&minus;5</sup>.'],

  ['g9m-ind-028', 'negative_indices', 3, 2, 'Evaluate <span style="white-space:nowrap">(<sup>1</sup>&frasl;<sub>3</sub>)<sup>&minus;2</sup></span>.',
   '9', [],
   'A negative index turns the fraction upside down.',
   '(1/3)<sup>&minus;2</sup> = (3/1)<sup>2</sup> = 3<sup>2</sup> = 9.'],

  ['g9m-ind-029', 'negative_indices', 2, 1, 'Simplify <i>a</i><sup>5</sup> &times; <i>a</i><sup>&minus;3</sup>.',
   'a^2', [],
   'Add the indices, keeping the minus sign.',
   'a<sup>5</sup> &times; a<sup>&minus;3</sup> = a<sup>5+(&minus;3)</sup> = a<sup>2</sup>.'],

  ['g9m-ind-030', 'negative_indices', 3, 2, 'Simplify <i>m</i><sup>&minus;2</sup> &divide; <i>m</i><sup>&minus;5</sup>.',
   'm^3', [],
   'Subtracting a negative index is the same as adding.',
   'm<sup>&minus;2</sup> &divide; m<sup>&minus;5</sup> = m<sup>&minus;2&minus;(&minus;5)</sup> = m<sup>3</sup>.'],

  ['g9m-ind-031', 'negative_indices', 2, 2, 'Evaluate 5<sup>&minus;2</sup> &times; 5<sup>4</sup>.',
   '25', [],
   'Add the indices before working out the value.',
   '5<sup>&minus;2</sup> &times; 5<sup>4</sup> = 5<sup>2</sup> = 25.'],

  ['g9m-ind-032', 'negative_indices', 2, 2, 'Write 2<i>x</i><sup>&minus;3</sup> as a fraction.',
   '2/x^3', [],
   'Only the x carries the negative index, not the 2.',
   'The index &minus;3 belongs to x alone, so 2x<sup>&minus;3</sup> = 2/x<sup>3</sup>.'],

  ['g9m-ind-033', 'negative_indices', 3, 2, 'Evaluate 2<sup>&minus;1</sup> + 2<sup>&minus;2</sup>.',
   '3/4', ['0.75'],
   'Write each term as a fraction, then add them.',
   '2<sup>&minus;1</sup> = 1/2 and 2<sup>&minus;2</sup> = 1/4. Adding: 2/4 + 1/4 = 3/4.'],

  ['g9m-ind-034', 'negative_indices', 3, 2, 'Simplify (<i>x</i><sup>&minus;2</sup>)<sup>&minus;3</sup>.',
   'x^6', [],
   'Multiply the two indices, watching both signs.',
   '(x<sup>&minus;2</sup>)<sup>&minus;3</sup> = x<sup>(&minus;2)&times;(&minus;3)</sup> = x<sup>6</sup>.'],

  ['g9m-ind-035', 'negative_indices', 3, 2, 'Evaluate 6<sup>0</sup> &minus; 3<sup>&minus;1</sup>.',
   '2/3', [],
   'Deal with the zero index first.',
   '6<sup>0</sup> = 1 and 3<sup>&minus;1</sup> = 1/3, so 1 &minus; 1/3 = 2/3.'],

  ['g9m-ind-036', 'negative_indices', 3, 2, 'Solve 2<sup><i>x</i></sup> = <sup>1</sup>&frasl;<sub>8</sub>.',
   '-3', [],
   'Write 1/8 as a power of 2.',
   '1/8 = 1/2<sup>3</sup> = 2<sup>&minus;3</sup>, so 2<sup>x</sup> = 2<sup>&minus;3</sup> and x = &minus;3.'],

  ['g9m-ind-037', 'negative_indices', 3, 2, 'Simplify (3<i>a</i><sup>&minus;2</sup>)<sup>2</sup>, giving your answer as a fraction.',
   '9/a^4', [],
   'Square the 3 and double the index of a.',
   '(3a<sup>&minus;2</sup>)<sup>2</sup> = 3<sup>2</sup>a<sup>&minus;4</sup> = 9a<sup>&minus;4</sup> = 9/a<sup>4</sup>.'],

  ['g9m-ind-038', 'negative_indices', 2, 2, 'Evaluate 4<sup>&minus;2</sup> &divide; 4<sup>&minus;3</sup>.',
   '4', [],
   'Subtract the indices first.',
   '4<sup>&minus;2</sup> &divide; 4<sup>&minus;3</sup> = 4<sup>&minus;2&minus;(&minus;3)</sup> = 4<sup>1</sup> = 4.'],

  ['g9m-ind-039', 'negative_indices', 2, 1, 'Write 0.001 as a power of 10.',
   '10^-3', [],
   'How many places is the 1 after the decimal point?',
   '0.001 = 1/1000 = 1/10<sup>3</sup> = 10<sup>&minus;3</sup>.'],

  ['g9m-ind-040', 'negative_indices', 4, 3, 'Solve 5<sup><i>x</i>+1</sup> = <sup>1</sup>&frasl;<sub>25</sub>.',
   '-3', [],
   'Make both sides a power of 5, then compare the indices.',
   '1/25 = 1/5<sup>2</sup> = 5<sup>&minus;2</sup>. So 5<sup>x+1</sup> = 5<sup>&minus;2</sup>, giving x + 1 = &minus;2 and x = &minus;3.'],

  // ── laws: "write in index form" (NCE 2023 Q9 pattern) ──────────────────
  ['g9m-ind-046', 'laws', 1, 1, 'Write 2 &times; 2 &times; 2 in <b>index form</b>.',
   '2^3', [],
   'Count how many times 2 appears as a factor.',
   '2 appears 3 times, so 2 &times; 2 &times; 2 = 2<sup>3</sup>.'],

  ['g9m-ind-047', 'laws', 1, 1, 'Write 5 &times; 5 &times; 5 &times; 5 in <b>index form</b>.',
   '5^4', [],
   'Count how many times 5 is multiplied together.',
   '5 appears 4 times, so 5 &times; 5 &times; 5 &times; 5 = 5<sup>4</sup>.'],

  ['g9m-ind-048', 'laws', 1, 1, 'Write <i>a</i> &times; <i>a</i> &times; <i>a</i> &times; <i>a</i> &times; <i>a</i> in index form.',
   'a^5', [],
   'Count how many times a appears.',
   'a appears 5 times, so a &times; a &times; a &times; a &times; a = a<sup>5</sup>.'],

  ['g9m-ind-049', 'laws', 1, 1, 'Simplify (<i>a</i><sup>4</sup>)<sup>5</sup>.',
   'a^20', [],
   'Multiply the two indices.',
   '(a<sup>4</sup>)<sup>5</sup> = a<sup>4&times;5</sup> = a<sup>20</sup>.'],

  // ── laws: "find m" index equations (NCE 2025 Q17a / 2023 Q9 pattern) ──
  ['g9m-ind-050', 'laws', 2, 1, 'Find the value of <i>m</i>, if 27 = 3<sup><i>m</i></sup>.',
   '3', [],
   'Write 27 as a power of 3.',
   '3 &times; 3 &times; 3 = 27, so 27 = 3<sup>3</sup> and m = 3.'],

  ['g9m-ind-051', 'laws', 2, 1, 'Find the value of <i>n</i>, if 64 = 2<sup><i>n</i></sup>.',
   '6', [],
   'Keep multiplying 2 by itself until you reach 64.',
   '2<sup>6</sup> = 64, so n = 6.'],

  ['g9m-ind-052', 'laws', 2, 1, 'Find the value of <i>k</i>, if 125 = 5<sup><i>k</i></sup>.',
   '3', [],
   'Write 125 as a power of 5.',
   '5 &times; 5 &times; 5 = 125, so 125 = 5<sup>3</sup> and k = 3.'],

  // ── laws: further coefficient × power simplifications ──────────────────
  ['g9m-ind-053', 'laws', 2, 1, 'Simplify 3<i>p</i><sup>2</sup> &times; 4<i>p</i><sup>3</sup>.',
   '12p^5', [],
   'Multiply the numbers, then add the indices of p.',
   '3 &times; 4 = 12 and p<sup>2</sup> &times; p<sup>3</sup> = p<sup>5</sup>, so the answer is 12p<sup>5</sup>.'],

  ['g9m-ind-054', 'laws', 2, 1, 'Simplify 15<i>x</i><sup>5</sup> &divide; 5<i>x</i><sup>2</sup>.',
   '3x^3', [],
   'Divide the numbers, then subtract the indices of x.',
   '15 &divide; 5 = 3 and x<sup>5</sup> &divide; x<sup>2</sup> = x<sup>3</sup>, so the answer is 3x<sup>3</sup>.'],

  ['g9m-ind-055', 'laws', 3, 2, 'Simplify (5<i>a</i><sup>2</sup>)<sup>3</sup>.',
   '125a^6', [],
   'The index outside the bracket applies to the 5 as well as to a<sup>2</sup>.',
   '(5a<sup>2</sup>)<sup>3</sup> = 5<sup>3</sup> &times; a<sup>2&times;3</sup> = 125a<sup>6</sup>.'],

  // ── negative_indices: extra practice ────────────────────────────────────
  ['g9m-ind-056', 'negative_indices', 1, 1, 'Write 6<sup>&minus;2</sup> as a fraction.',
   '1/36', [],
   'Work out 6 squared first, then put 1 over the result.',
   '6<sup>2</sup> = 36, so 6<sup>&minus;2</sup> = 1/36.'],

  ['g9m-ind-057', 'negative_indices', 1, 1, 'Evaluate 3<sup>&minus;3</sup>.',
   '1/27', [],
   'Work out 3 cubed first, then take its reciprocal.',
   '3<sup>3</sup> = 27, so 3<sup>&minus;3</sup> = 1/27.'],

  ['g9m-ind-058', 'negative_indices', 2, 1, 'Write <sup>1</sup>&frasl;<sub>8</sub> as a power of 2.',
   '2^-3', [],
   'Write 8 as a power of 2, then use the negative index rule.',
   '8 = 2<sup>3</sup>, so <sup>1</sup>&frasl;<sub>8</sub> = 1 &divide; 2<sup>3</sup> = 2<sup>&minus;3</sup>.'],

  ['g9m-ind-059', 'negative_indices', 2, 2, 'Simplify <i>a</i><sup>2</sup> &times; <i>a</i><sup>&minus;6</sup>.',
   'a^-4', ['1/a^4'],
   'Add the indices, keeping the minus sign.',
   'a<sup>2</sup> &times; a<sup>&minus;6</sup> = a<sup>2+(&minus;6)</sup> = a<sup>&minus;4</sup>.'],

  ['g9m-ind-060', 'negative_indices', 3, 2, 'Evaluate <span style="white-space:nowrap">(<sup>1</sup>&frasl;<sub>4</sub>)<sup>&minus;2</sup></span>.',
   '16', [],
   'A negative index turns the fraction upside down first.',
   '(1/4)<sup>&minus;2</sup> = (4/1)<sup>2</sup> = 4<sup>2</sup> = 16.'],
];

// An answer that is a bare number is marked as a NUMBER (so 0.75 can be
// accepted for 3/4); an answer carrying a letter or a caret is an EXPRESSION.
const isNumeric = a => /^-?[\d.\/]+$/.test(a);

ITEMS.forEach(([id, subsection, difficulty, marks, prompt, answer, accept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection, difficulty,
    source: 'NCF Grades 7-9 §3.9 Numbers: Indices; NCE 2025 Q10, Q17 pattern.',
    parts: [{
      label: 'a', prompt, marks, hint, explanation,
      response: { kind: isNumeric(answer) ? 'number' : 'expression', answer, accept },
    }],
  }));
});

})();

// ══════════════════════════════════════════════════════════════════════════
//  Paper-shape items: the consolidated multiple-choice question, and one
//  extended "find ... hence solve" problem.
//
//  ⚠ These are not decoration. NCE_paper's blueprint reserves one MCQ question
//    of 5-7 one-mark parts and a tail of two 5+ mark problems, both measured
//    across five years. Without items of those shapes the generator reports
//    "the bank cannot fill the blueprint" - which it did, honestly, before
//    these were written.
//
//  ⚠ Every distractor is a real misconception, named in the explanation, not
//    a number picked to fill a slot.
// ══════════════════════════════════════════════════════════════════════════
(function () {

const CH = 'g9m-indices';

// [ id, subsection, prompt, options[], answer, hint, explanation ]
const MCQ = [
  ['g9m-ind-041', 'laws',
   'Which of the following is equal to <i>a</i><sup>3</sup> &times; <i>a</i><sup>4</sup>?',
   ['a<sup>7</sup>', 'a<sup>12</sup>', 'a<sup>1</sup>', '2a<sup>7</sup>'], 'a<sup>7</sup>',
   'Multiplying powers of the same letter adds the indices.',
   'a<sup>3</sup> &times; a<sup>4</sup> = a<sup>3+4</sup> = a<sup>7</sup>. a<sup>12</sup> comes from multiplying the indices instead of adding; a<sup>1</sup> from subtracting; 2a<sup>7</sup> from also adding the invisible coefficients.'],

  ['g9m-ind-042', 'laws',
   'What is the value of 4<sup>0</sup>?',
   ['1', '0', '4', 'No value'], '1',
   'Think about what happens to 4<sup>2</sup> &divide; 4<sup>2</sup>.',
   '4<sup>0</sup> = 1. The common mistake is to answer 0 because the index is 0, but 4<sup>2</sup> &divide; 4<sup>2</sup> = 4<sup>0</sup> and any number divided by itself is 1.'],

  ['g9m-ind-043', 'negative_indices',
   'Which of the following is equal to 2<sup>&minus;3</sup>?',
   ['<sup>1</sup>&frasl;<sub>8</sub>', '&minus;8', '&minus;6', '<sup>1</sup>&frasl;<sub>6</sub>'],
   '<sup>1</sup>&frasl;<sub>8</sub>',
   'A negative index does not make the answer negative.',
   '2<sup>&minus;3</sup> = 1 &divide; 2<sup>3</sup> = 1/8. &minus;8 comes from reading the minus as a sign on the answer; &minus;6 and 1/6 come from multiplying 2 by 3 instead of cubing it.'],

  ['g9m-ind-044', 'laws',
   'Simplify (<i>x</i><sup>2</sup>)<sup>5</sup>.',
   ['x<sup>10</sup>', 'x<sup>7</sup>', 'x<sup>25</sup>', 'x<sup>3</sup>'], 'x<sup>10</sup>',
   'A power of a power multiplies the indices.',
   '(x<sup>2</sup>)<sup>5</sup> = x<sup>2&times;5</sup> = x<sup>10</sup>. x<sup>7</sup> comes from adding the indices, x<sup>25</sup> from squaring the 5, and x<sup>3</sup> from subtracting.'],

  ['g9m-ind-061', 'laws',
   'What is the value of <i>n</i> if 3<sup><i>n</i></sup> = 27?',
   ['3', '9', '6', '27'], '3',
   'Write 27 as a power of 3.',
   '27 = 3<sup>3</sup>, so n = 3. n = 9 comes from thinking 3 &times; 9 = 27; n = 6 from adding six 3s; n = 27 from confusing the base and the result.'],

  ['g9m-ind-062', 'negative_indices',
   'Which of the following is equal to 5<sup>&minus;2</sup>?',
   ['<sup>1</sup>&frasl;<sub>25</sub>', '&minus;25', '<sup>1</sup>&frasl;<sub>10</sub>', '&minus;10'],
   '<sup>1</sup>&frasl;<sub>25</sub>',
   'A negative index never makes the result negative.',
   '5<sup>&minus;2</sup> = 1 &divide; 5<sup>2</sup> = 1/25. &minus;25 comes from treating the &minus; as negating the whole result; 1/10 and &minus;10 come from multiplying 5 &times; 2 instead of squaring.'],
];

MCQ.forEach(([id, subsection, prompt, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection, difficulty: 2,
    source: 'NCF §3.9 Numbers: Indices; NCE 2025 Q11 / 2024 Q12 MCQ-block pattern.',
    parts: [{ label: 'a', prompt, marks: 1, hint, explanation,
              response: { kind: 'choice', variant: 'options', options, answer } }],
  }));
});

// ── One extended "find ... hence solve" problem (NCE 2025 Q17 pattern) ────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-ind-045', chapterId: CH, subsection: 'laws', difficulty: 4,
  source: 'NCF §3.9 Indices, "solve simple equations involving indices"; NCE 2025 Q17 pattern.',
  parts: [
    { label: 'a', prompt: 'Find the value of <i>m</i>, if 81 = 3<sup><i>m</i></sup>.', marks: 1,
      hint: 'Keep multiplying 3 by itself until you reach 81.',
      explanation: '3 &times; 3 &times; 3 &times; 3 = 81, so 81 = 3<sup>4</sup> and m = 4.',
      response: { kind: 'number', answer: '4', label: 'm' } },
    { label: 'b', prompt: '<b>Hence</b>, solve 3<sup>2<i>x</i></sup> &divide; 3<sup><i>x</i>&minus;1</sup> = 81.',
      marks: 4, dependsOn: 'a',
      hint: 'Subtract the indices on the left, then compare with your answer to part (a).',
      explanation: 'Dividing subtracts the indices: 3<sup>2x&minus;(x&minus;1)</sup> = 3<sup>x+1</sup>. '
                 + 'From part (a), 81 = 3<sup>4</sup>, so 3<sup>x+1</sup> = 3<sup>4</sup>. '
                 + 'Comparing indices: x + 1 = 4, giving x = 3.',
      response: { kind: 'number', answer: '3', label: 'x' } },
  ],
}));

// ── NCE 2025 Q17 (exact paper question) ───────────────────────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-ind-063', chapterId: CH, subsection: 'laws', difficulty: 4,
  source: 'NCF §3.9 Indices; NCE 2025 Q17.',
  parts: [
    { label: 'a', prompt: 'Find the value of <i>m</i>, if 27 = 3<sup><i>m</i></sup>.', marks: 1,
      hint: 'Keep multiplying 3 by itself until you reach 27.',
      explanation: '3 &times; 3 &times; 3 = 27, so 27 = 3<sup>3</sup> and m = 3.',
      response: { kind: 'number', answer: '3', label: 'm' } },
    { label: 'b', prompt: '<b>Hence</b>, solve 3<sup>6<i>x</i></sup> &divide; 3<sup>4<i>x</i></sup> = 27.',
      marks: 2, dependsOn: 'a',
      hint: 'Subtract the indices on the left, then compare with your answer to part (a).',
      explanation: 'Subtracting the indices: 3<sup>6x&minus;4x</sup> = 3<sup>2x</sup>. '
                 + 'From part (a), 27 = 3<sup>3</sup>, so 3<sup>2x</sup> = 3<sup>3</sup>. '
                 + 'Comparing indices: 2x = 3, giving x = 3/2.',
      response: { kind: 'number', answer: '3/2', label: 'x' } },
  ],
}));

})();

// ══════════════════════════════════════════════════════════════════════════
//  Harder questions (ind-064 – ind-075) — difficulty 3–4, NCE past-paper
//  level. Patterns:
//    • solve index equations by matching bases (ind-064, ind-065, ind-068,
//      ind-072, ind-076)
//    • multi-step simplifications with 2+ laws combined (ind-066, ind-067,
//      ind-069, ind-073)
//    • negative-index manipulation and evaluation (ind-070, ind-071)
//    • "find m … hence solve" two-part problems (ind-074, ind-075)
// ══════════════════════════════════════════════════════════════════════════
(function () {

const CH = 'g9m-indices';

// [ id, subsection, difficulty, marks, prompt, answer, accept[], hint, explanation ]
const ITEMS3 = [

  // ── laws ────────────────────────────────────────────────────────────────
  ['g9m-ind-064', 'laws', 3, 2,
   'Solve 4<sup><i>x</i>+1</sup> = 64.',
   '2', [],
   'Write 64 as a power of 4, then compare the indices.',
   '64 = 4<sup>3</sup>, so 4<sup>x+1</sup> = 4<sup>3</sup>. Comparing indices: x + 1 = 3, giving x = 2.'],

  ['g9m-ind-065', 'laws', 3, 2,
   'Solve 2<sup>3<i>x</i></sup> &divide; 2<sup><i>x</i></sup> = 16.',
   '2', [],
   'Subtract the indices on the left first.',
   '2<sup>3x</sup> &divide; 2<sup>x</sup> = 2<sup>3x&minus;x</sup> = 2<sup>2x</sup>. Since 16 = 2<sup>4</sup>, we get 2x = 4, so x = 2.'],

  ['g9m-ind-066', 'laws', 4, 3,
   'Simplify (2<i>x</i><sup>3</sup>)<sup>4</sup> &divide; (4<i>x</i><sup>2</sup>)<sup>2</sup>.',
   'x^8', [],
   'Expand each bracket first, then divide.',
   '(2x<sup>3</sup>)<sup>4</sup> = 16x<sup>12</sup> and (4x<sup>2</sup>)<sup>2</sup> = 16x<sup>4</sup>. '
   + 'Dividing: 16 &divide; 16 = 1 and x<sup>12&minus;4</sup> = x<sup>8</sup>.'],

  ['g9m-ind-067', 'laws', 3, 2,
   'Simplify (3<i>a</i><sup>2</sup><i>b</i>)<sup>2</sup> &times; 2<i>a</i>.',
   '18a^5b^2', ['18b^2a^5'],
   'Square the bracket first, then multiply by 2a.',
   '(3a<sup>2</sup>b)<sup>2</sup> = 9a<sup>4</sup>b<sup>2</sup>. Multiplying by 2a: 9 &times; 2 = 18 '
   + 'and a<sup>4</sup> &times; a = a<sup>5</sup>, giving 18a<sup>5</sup>b<sup>2</sup>.'],

  ['g9m-ind-068', 'laws', 3, 2,
   'Solve 5<sup><i>x</i>&minus;2</sup> = 5<sup>3<i>x</i>&minus;8</sup>.',
   '3', [],
   'The bases are the same, so set the indices equal.',
   'x &minus; 2 = 3x &minus; 8. Rearranging: 6 = 2x, giving x = 3.'],

  ['g9m-ind-069', 'laws', 3, 2,
   'Simplify 8<i>a</i><sup>6</sup> &divide; (2<i>a</i><sup>2</sup>)<sup>2</sup>.',
   '2a^2', [],
   'Expand (2a<sup>2</sup>)<sup>2</sup> first.',
   '(2a<sup>2</sup>)<sup>2</sup> = 4a<sup>4</sup>. Then 8a<sup>6</sup> &divide; 4a<sup>4</sup> = 2a<sup>2</sup>.'],

  // ── negative_indices ────────────────────────────────────────────────────
  ['g9m-ind-070', 'negative_indices', 3, 2,
   'Evaluate 3<sup>&minus;1</sup> + 3<sup>&minus;2</sup>.',
   '4/9', [],
   'Write each term as a fraction, then find a common denominator.',
   '3<sup>&minus;1</sup> = 1/3 and 3<sup>&minus;2</sup> = 1/9. Adding: 3/9 + 1/9 = 4/9.'],

  ['g9m-ind-071', 'negative_indices', 4, 3,
   'Simplify (2<i>x</i><sup>&minus;1</sup><i>y</i><sup>2</sup>)<sup>3</sup>, giving your answer as a fraction.',
   '8y^6/x^3', ['8y^6x^-3'],
   'Cube every factor inside the bracket.',
   '(2x<sup>&minus;1</sup>y<sup>2</sup>)<sup>3</sup> = 2<sup>3</sup>x<sup>&minus;3</sup>y<sup>6</sup> = 8x<sup>&minus;3</sup>y<sup>6</sup> = 8y<sup>6</sup>/x<sup>3</sup>.'],

  ['g9m-ind-072', 'negative_indices', 3, 2,
   'Solve 3<sup>2&minus;<i>x</i></sup> = <sup>1</sup>&frasl;<sub>9</sub>.',
   '4', [],
   'Write 1/9 as a power of 3, then compare the indices.',
   '1/9 = 3<sup>&minus;2</sup>, so 3<sup>2&minus;x</sup> = 3<sup>&minus;2</sup>. Comparing: 2 &minus; x = &minus;2, giving x = 4.'],

  ['g9m-ind-073', 'negative_indices', 3, 2,
   'Simplify <i>x</i><sup>&minus;2</sup> &times; <i>x</i><sup>5</sup> &divide; <i>x</i><sup>&minus;1</sup>.',
   'x^4', [],
   'Add then subtract the indices in order, remembering that dividing by x<sup>&minus;1</sup> adds 1 to the index.',
   'x<sup>&minus;2+5</sup> = x<sup>3</sup>, then x<sup>3</sup> &divide; x<sup>&minus;1</sup> = x<sup>3&minus;(&minus;1)</sup> = x<sup>4</sup>.'],

  ['g9m-ind-076', 'negative_indices', 2, 1,
   'Find the value of <i>p</i> if 2<sup><i>p</i></sup> = <sup>1</sup>&frasl;<sub>16</sub>.',
   '-4', [],
   'Write 1/16 as a power of 2.',
   '1/16 = 1/2<sup>4</sup> = 2<sup>&minus;4</sup>, so p = &minus;4.'],
];

const isNumeric3 = a => /^-?[\d.\/]+$/.test(a);

ITEMS3.forEach(([id, subsection, difficulty, marks, prompt, answer, accept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection, difficulty,
    source: 'NCF Grades 7-9 §3.9 Numbers: Indices; NCE past-paper level (difficulty 3–4).',
    parts: [{
      label: 'a', prompt, marks, hint, explanation,
      response: { kind: isNumeric3(answer) ? 'number' : 'expression', answer, accept },
    }],
  }));
});

// ── "find m … hence solve" — two new variants (NCE Q17 pattern) ──────────

STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-ind-074', chapterId: CH, subsection: 'laws', difficulty: 4,
  source: 'NCF §3.9 Indices; NCE Q17 "find m, hence solve" pattern.',
  parts: [
    { label: 'a',
      prompt: 'Find the value of <i>m</i> if 16 = 2<sup><i>m</i></sup>.',
      marks: 1,
      hint: 'Write 16 as a product of 2s.',
      explanation: '2<sup>4</sup> = 16, so m = 4.',
      response: { kind: 'number', answer: '4', label: 'm' } },
    { label: 'b',
      prompt: '<b>Hence</b>, solve 2<sup>3<i>x</i>+1</sup> &divide; 2<sup><i>x</i>+1</sup> = 16.',
      marks: 2, dependsOn: 'a',
      hint: 'Subtract the indices on the left, then compare with part (a).',
      explanation: '2<sup>3x+1</sup> &divide; 2<sup>x+1</sup> = 2<sup>(3x+1)&minus;(x+1)</sup> = 2<sup>2x</sup>. '
                 + 'From part (a), 16 = 2<sup>4</sup>, so 2<sup>2x</sup> = 2<sup>4</sup>. '
                 + 'Comparing: 2x = 4, giving x = 2.',
      response: { kind: 'number', answer: '2', label: 'x' } },
  ],
}));

STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-ind-075', chapterId: CH, subsection: 'negative_indices', difficulty: 4,
  source: 'NCF §3.9 Indices; NCE Q17 "find k, hence solve with negative index" pattern.',
  parts: [
    { label: 'a',
      prompt: 'Find the value of <i>k</i> if 8 = 2<sup><i>k</i></sup>.',
      marks: 1,
      hint: '2 &times; 2 &times; 2 = ?',
      explanation: '2<sup>3</sup> = 8, so k = 3.',
      response: { kind: 'number', answer: '3', label: 'k' } },
    { label: 'b',
      prompt: '<b>Hence</b>, solve 2<sup><i>x</i>+1</sup> = <sup>1</sup>&frasl;<sub>8</sub>.',
      marks: 2, dependsOn: 'a',
      hint: 'Write 1/8 as a power of 2 using your answer to part (a).',
      explanation: '1/8 = 1/2<sup>3</sup> = 2<sup>&minus;3</sup>. So 2<sup>x+1</sup> = 2<sup>&minus;3</sup>. '
                 + 'Comparing indices: x + 1 = &minus;3, giving x = &minus;4.',
      response: { kind: 'number', answer: '-4', label: 'x' } },
  ],
}));

})();
