'use strict';
// engine/assessment.js — schema, validation, normalisation and marking.
//   node scripts/test-assessment-schema.js

const path = require('path');
const A = require(path.join(__dirname, '..', 'engine', 'assessment.js'));

let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  ✗ ' + m); } };
const eq = (a, b, m) => ok(JSON.stringify(a) === JSON.stringify(b), `${m} — expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);
const throws = (fn, m) => { try { fn(); fail++; console.log('  ✗ ' + m + ' — did not throw'); } catch { pass++; } };

// ── normalisation ─────────────────────────────────────────────────────────
console.log('normalisation');
// The papers print U+2212 MINUS SIGN; a child types U+002D HYPHEN.
ok(A.normaliseText('3 − 4') === '3 - 4', 'unicode minus folds to ASCII');
ok(A.normaliseText('2 × 3') === '2 * 3', 'multiplication sign folds');
ok(A.normaliseText('6 ÷ 2') === '6 / 2', 'division sign folds');
// The papers use U+00A0 and U+2212; a phone keyboard produces neither.
// Both are built from their CODE POINT rather than pasted, because a pasted
// U+00A0 is invisible in an editor and does not survive every tool that has
// touched this file - measured: one edit turned it into a plain space, which
// left the assertion passing while testing nothing at all.
const NBSP = String.fromCharCode(0xa0);
const MINUS = String.fromCharCode(0x2212);
ok(A.normaliseText('a' + NBSP + 'b') === 'a b', 'non-breaking space folds');

// ⚠ ALL THREE DASHES, ASSERTED SEPARATELY. A global "tidy the em dashes" pass
//   over engine/ replaced the U+2014 INSIDE normaliseText's character class
//   with a plain hyphen, so em dashes silently stopped folding while the line
//   still read `[−–-]` and looked correct. Only U+2212 had a test, so nothing
//   failed. The class is now written with \uXXXX escapes, and these three
//   assertions are what would catch it next time.
[[0x2212, 'U+2212 MINUS SIGN'], [0x2013, 'U+2013 EN DASH'], [0x2014, 'U+2014 EM DASH']]
  .forEach(([code, name]) => {
    ok(A.normaliseText('3' + String.fromCharCode(code) + '4') === '3-4',
       `${name} folds to a plain hyphen`);
  });
ok(A.normaliseText(MINUS + '4') === '-4', 'U+2212 MINUS SIGN folds to hyphen');

console.log('rationals');
ok(A.ratEq(A.toRational('3/4'), A.toRational('0.75')), '3/4 == 0.75');
ok(A.ratEq(A.toRational('6/8'), A.toRational('3/4')), '6/8 == 3/4');
ok(A.ratEq(A.toRational('1 1/2'), A.toRational('1.5')), 'mixed number 1 1/2 == 1.5');
ok(A.ratEq(A.toRational('-3/4'), A.toRational('-0.75')), 'negatives');
ok(A.toRational('abc') === null, 'non-numeric is null');
ok(A.toRational('3/0') === null, 'divide by zero is null');
// 13% as a fraction — 2025 Q5.
ok(A.ratEq(A.toRational('13/100'), A.toRational('0.13')), '13/100 == 0.13');

console.log('pi forms');
ok(A.toPiForm('14π').pi === true, '14pi is a pi form');
ok(A.ratEq(A.toPiForm('14π').k, A.toPiForm('14pi').k), 'pi symbol and "pi" agree');
ok(A.ratEq(A.toPiForm('π/2').k, { n: 1, d: 2 }), 'pi/2');
ok(A.toPiForm('7').pi === false, 'a plain number is not a pi form');
// A number must never equal a multiple of pi.
ok(A.toPiForm('14').pi !== A.toPiForm('14pi').pi, '14 and 14pi are distinguishable');

console.log('expressions');
ok(A.normaliseExpression('8 + 4x') === A.normaliseExpression('4x + 8'), 'addition commutes');
ok(A.normaliseExpression('4x') === A.normaliseExpression('4 x'), 'spacing');
ok(A.normaliseExpression('xy') === A.normaliseExpression('yx'), 'product commutes');
ok(A.normaliseExpression('x') === A.normaliseExpression('1x'), 'implicit coefficient 1');
ok(A.normaliseExpression('4x+8') !== A.normaliseExpression('4x-8'), 'sign matters');
ok(A.normaliseExpression('3(x+2)') === '3(x+2)', 'brackets are left alone, compared literally');

// ── marking ───────────────────────────────────────────────────────────────
console.log('marking: number');
const numPart = m => ({ marks: m, response: { kind: 'number', answer: '2350', unit: 'g' } });
eq(A.markPart(numPart(1), '2350'), { manual: false, correct: true, earned: 1 }, 'exact');
eq(A.markPart(numPart(1), '2350 g'), { manual: false, correct: true, earned: 1 }, 'the pre-printed unit typed back is not a mistake');
eq(A.markPart(numPart(1), '235'), { manual: false, correct: false, earned: 0 }, 'wrong value');
// ⚠ The answer line prints "Answer: Rs ................", so writing the Rs
//   back is the most natural thing a child can do. It was being marked WRONG:
//   markNumber stripped a trailing unit but never a leading prefix.
const money = { marks: 3, response: { kind: 'number', answer: '210000', prefix: 'Rs' } };
ok(A.markPart(money, '210000').correct, 'a currency answer without the prefix is right');
ok(A.markPart(money, 'Rs 210000').correct, 'and WITH the prefix the paper printed for them');
ok(A.markPart(money, 'rs210000').correct, 'prefix matching ignores case and spacing');
ok(!A.markPart(money, 'Rs 999').correct, 'but the prefix does not make a wrong number right');
eq(A.markPart(numPart(1), ''), { manual: false, correct: false, earned: 0 }, 'blank');
// 2025 Q13(a): 1/2 + 1/3 = 5/6; a child writing 0.8333 has not answered it.
const frac = { marks: 2, response: { kind: 'number', answer: '5/6' } };
ok(A.markPart(frac, '5/6').correct, 'fraction answer');
ok(A.markPart(frac, '10/12').correct, 'unsimplified equivalent fraction is accepted');
ok(!A.markPart(frac, '0.83').correct, 'a rounded decimal is NOT the same as 5/6');
// Tolerance is opt-in and must not leak.
const tol = { marks: 2, response: { kind: 'number', answer: '70.71', tolerance: 0.01 } };
ok(A.markPart(tol, '70.71').correct, 'within tolerance');
ok(!A.markPart(tol, '70.8').correct, 'outside tolerance');
ok(!A.markPart({ marks: 1, response: { kind: 'number', answer: '70.71' } }, '70.7').correct,
   'without a tolerance, a rounder answer is refused');

console.log('marking: expression / pi');
const pi = { marks: 2, response: { kind: 'expression', answer: '77π' } };
ok(A.markPart(pi, '77pi').correct, 'pi typed as "pi"');
ok(A.markPart(pi, '77π').correct, 'pi typed as the symbol');
ok(!A.markPart(pi, '77').correct, 'dropping pi is wrong');
const expr = { marks: 2, response: { kind: 'expression', answer: '4x + 8' } };
ok(A.markPart(expr, '8 + 4x').correct, 'reordered sum accepted');
ok(!A.markPart(expr, '4x + 7').correct, 'wrong constant refused');

console.log('marking: choice / multi');
const ch = { marks: 1, response: { kind: 'choice', answer: 'B', options: ['A', 'B', 'C', 'D'] } };
ok(A.markPart(ch, 'B').correct && A.markPart(ch, 'B').earned === 1, 'choice right');
ok(!A.markPart(ch, 'C').correct, 'choice wrong');
const mu = { marks: 2, response: { kind: 'multi', answer: ['2', '3'], options: ['1', '2', '3', '4'] } };
ok(A.markPart(mu, JSON.stringify(['3', '2'])).correct, 'multi is order-insensitive');
ok(!A.markPart(mu, JSON.stringify(['2'])).correct, 'multi partial selection is not correct');
ok(!A.markPart(mu, JSON.stringify(['2', '3', '4'])).correct, 'multi over-selection is not correct');

console.log('marking: partial credit');
// 2025 Q25: "x = ......, y = ......" for [4].
const blanks = { marks: 4, response: { kind: 'blanks', answer: ['2', '-1'] } };
eq(A.markPart(blanks, JSON.stringify(['2', '-1'])).earned, 4, 'both blanks right');
eq(A.markPart(blanks, JSON.stringify(['2', '9'])).earned, 2, 'one blank right earns half');
ok(!A.markPart(blanks, JSON.stringify(['2', '9'])).correct, 'half right is not "correct"');
// ⚠ NCE 2024 Q14(a) is FIVE decimals in ascending order for [1]. Five blanks
//   cannot share one mark, and awarding a fraction for a half-sorted list marks
//   something the paper does not. `partial: false` says all-or-nothing.
const order = { marks: 1, response: { kind: 'blanks', partial: false,
  answer: [['5.006'], ['5.06'], ['5.23'], ['5.62'], ['5.65']] } };
eq(A.markPart(order, JSON.stringify(['5.006', '5.06', '5.23', '5.62', '5.65'])).earned, 1,
   'a correct ordering earns the whole mark');
eq(A.markPart(order, JSON.stringify(['5.006', '5.06', '5.23', '5.65', '5.62'])).earned, 0,
   'a nearly-correct ordering earns nothing, because the paper awards nothing');
ok(!A.markPart(order, JSON.stringify(['5.006', '5.06', '5.23', '5.65', '5.62'])).correct,
   'and is not reported as correct');
// The validator must accept 5 blanks for 1 mark ONLY when that is declared.
ok(A.validateTask({ id: 'o', chapterId: 'c', difficulty: 2, parts: [Object.assign(
  { label: 'a', prompt: 'Order these.', explanation: 'e' }, order)] }).length === 0,
   'partial:false lets 5 blanks share 1 mark');
throws(() => A.makeTask({ id: 'o2', chapterId: 'c', difficulty: 2,
  parts: [{ label: 'a', prompt: 'p', marks: 1, explanation: 'e',
            response: { kind: 'blanks', answer: [['1'], ['2'], ['3']] } }] }),
  'without partial:false, 3 blanks still cannot share 1 mark');

// ⚠ NCE 2025 Q21(a) is THREE table cells for [2]. Three cells cannot split two
//   marks evenly, and the marker's own rule is "1 mark for two correct, 2 for
//   all three". marksByCorrect states exactly that, indexed by how many blanks
//   are right — which is how a real mark scheme is written.
const cells = { marks: 2, response: { kind: 'cells', answer: [['2'], ['2'], ['3']],
                                      marksByCorrect: [0, 0, 1, 2] } };
eq(A.markPart(cells, JSON.stringify(['2', '2', '3'])).earned, 2, 'all three cells right earns 2');
eq(A.markPart(cells, JSON.stringify(['2', '2', '9'])).earned, 1, 'two cells right earns 1');
eq(A.markPart(cells, JSON.stringify(['2', '9', '9'])).earned, 0, 'one cell right earns 0');
eq(A.markPart(cells, JSON.stringify(['9', '9', '9'])).earned, 0, 'none right earns 0');
ok(!A.markPart(cells, JSON.stringify(['2', '2', '9'])).correct, 'two of three is not "correct"');
// The table must be well formed, or it silently mis-marks.
throws(() => A.makeTask({ id: 'c1', chapterId: 'c', difficulty: 2,
  parts: [{ label: 'a', prompt: 'p', marks: 2, explanation: 'e',
            response: { kind: 'cells', answer: [['1'], ['2'], ['3']], marksByCorrect: [0, 1, 2] } }] }),
  'marksByCorrect with the wrong number of entries is refused');
throws(() => A.makeTask({ id: 'c2', chapterId: 'c', difficulty: 2,
  parts: [{ label: 'a', prompt: 'p', marks: 2, explanation: 'e',
            response: { kind: 'cells', answer: [['1'], ['2']], marksByCorrect: [0, 1, 5] } }] }),
  'marksByCorrect that exceeds the part total is refused');
throws(() => A.makeTask({ id: 'c3', chapterId: 'c', difficulty: 2,
  parts: [{ label: 'a', prompt: 'p', marks: 2, explanation: 'e',
            response: { kind: 'cells', answer: [['1'], ['2']], marksByCorrect: [0, 2, 1] } }] }),
  'a marksByCorrect that DECREASES is refused — one more right cannot lose marks');

// 2025 Q21(a): three table cells for [2]. Marks cannot divide evenly.
eq(A.shareMarks(2, 3), [1, 1, 0], 'shareMarks gives the remainder to the earliest');
eq(A.shareMarks(4, 2), [2, 2], 'shareMarks divides evenly');
eq(A.shareMarks(7, 1), [7], 'shareMarks of one');

console.log('marking: manual parts answer "cannot say", not "wrong"');
const draw = { marks: 2, rubric: 'r', response: { kind: 'drawing' } };
ok(A.markPart(draw, 'anything').correct === null, 'a drawing part marks as null, never false');
ok(A.markPart(draw, 'anything').manual === true, 'and is flagged manual');

// ── validation ────────────────────────────────────────────────────────────
console.log('validation');
const good = () => A.makeTask({
  id: 'g9m-x-001', chapterId: 'g9m-indices', subsection: 'laws', difficulty: 2,
  parts: [{ label: 'a', prompt: 'Simplify.', marks: 1, explanation: 'e',
            response: { kind: 'number', answer: '7' } }],
});
ok(good().marks === 1, 'task marks sum from its parts');
ok(good().type === 'task', 'task carries type "task"');

throws(() => A.makeTask({ id: 'x', chapterId: 'c', difficulty: 2, parts: [] }), 'a task with no parts is refused');
throws(() => A.makeTask({ id: 'x', chapterId: 'c', difficulty: 9,
  parts: [{ label: 'a', prompt: 'p', marks: 1, explanation: 'e', response: { kind: 'number', answer: '1' } }] }),
  'difficulty outside 1-4 is refused');
throws(() => A.makeTask({ id: 'x', chapterId: 'c', difficulty: 2,
  parts: [{ label: 'a', prompt: 'p', marks: 0, explanation: 'e', response: { kind: 'number', answer: '1' } }] }),
  'zero marks is refused');
throws(() => A.makeTask({ id: 'x', chapterId: 'c', difficulty: 2,
  parts: [{ label: 'a', prompt: 'p', marks: 1, explanation: 'e', response: { kind: 'nonsense' } }] }),
  'an unknown response kind is refused');
throws(() => A.makeTask({ id: 'x', chapterId: 'c', difficulty: 2,
  parts: [{ label: 'a', prompt: 'p', marks: 1, explanation: 'e',
            response: { kind: 'choice', answer: 'B', options: ['A', 'B', 'B', 'C'] } }] }),
  'duplicate choice options are refused');
throws(() => A.makeTask({ id: 'x', chapterId: 'c', difficulty: 2,
  parts: [{ label: 'a', prompt: 'p', marks: 1, explanation: 'e',
            response: { kind: 'choice', answer: 'Z', options: ['A', 'B', 'C'] } }] }),
  'a keyed answer that is not among the options is refused');
throws(() => A.makeTask({ id: 'x', chapterId: 'c', difficulty: 2,
  parts: [{ label: 'a', prompt: 'p', marks: 2, rubric: null, response: { kind: 'drawing' } }] }),
  'a drawing part with no rubric is refused');
throws(() => A.makeTask({ id: 'x', chapterId: 'c', difficulty: 2,
  parts: [{ label: 'a', prompt: 'p', marks: 1, explanation: 'e',
            response: { kind: 'blanks', answer: ['1', '2'] } }] }),
  '2 blanks cannot share 1 mark');
throws(() => A.makeTask({ id: 'x', chapterId: 'c', difficulty: 2,
  parts: [{ label: 'a', prompt: 'p', marks: 1, explanation: 'e', response: { kind: 'number', answer: '1' } },
          { label: 'a', prompt: 'q', marks: 1, explanation: 'e', response: { kind: 'number', answer: '2' } }] }),
  'duplicate part labels are refused');
throws(() => A.makeTask({ id: 'x', chapterId: 'c', difficulty: 2,
  parts: [{ label: 'a', prompt: 'p', marks: 1, explanation: 'e', dependsOn: 'zz',
            response: { kind: 'number', answer: '1' } }] }),
  'dependsOn pointing at a label that does not exist is refused');
throws(() => A.makeTask({ id: 'x', chapterId: 'c', difficulty: 2,
  stimulus: { html: '<svg></svg>' },
  parts: [{ label: 'a', prompt: 'p', marks: 1, explanation: 'e', response: { kind: 'number', answer: '1' } }] }),
  'a picture stimulus with no altText is refused');
throws(() => A.makeTask({ id: 'x', chapterId: 'c', difficulty: 2,
  parts: [{ label: 'a', prompt: 'p', marks: 1, response: { kind: 'number', answer: '1' } }] }),
  'an auto-marked part with no explanation is refused');

// ── numbering ─────────────────────────────────────────────────────────────
console.log('numbering');
ok(A.partNotation('a') === '(a)', '(a)');
ok(A.partNotation('b.i') === '(b)(i)', '(b)(i)');
ok(A.partNotation('a.ii') === '(a)(ii)', '(a)(ii)');

// ── projection ────────────────────────────────────────────────────────────
console.log('projection to the online pool');
const mixed = A.makeTask({
  id: 'g9m-t-001', chapterId: 'g9m-stats', difficulty: 3,
  stimulus: { html: '<svg role="img"></svg>', altText: 'A bar chart' },
  parts: [
    { label: 'a', prompt: 'Find the mean.', marks: 2, explanation: 'e',
      response: { kind: 'number', answer: '1.75', unit: 'goals per match' } },
    { label: 'b', prompt: 'Draw a bar chart.', marks: 2, rubric: 'One mark per correct bar.',
      response: { kind: 'drawing' } },
    { label: 'c', prompt: 'Using your answer to (a), ...', marks: 1, explanation: 'e', dependsOn: 'a',
      response: { kind: 'number', answer: '3' } },
  ],
});
const items = A.projectToItems(mixed);
eq(items.length, 1, 'only the standalone auto-markable part is projected');
eq(items[0].type, 'numeric', 'a number part projects to the legacy numeric type');
ok(items[0].id === 'g9m-t-001-a', 'projected id carries the part label');
ok(items[0].taskId === 'g9m-t-001' && items[0].partLabel === 'a', 'projection keeps its provenance');
ok(items[0].question.indexOf('<svg') !== -1, 'the shared stimulus travels with the projected item');
ok(items[0].marks === 2, 'projected item keeps its marks');
ok(!items.some(i => /Draw a bar chart/.test(i.question)), 'the drawing part is NOT in the online pool');
ok(!items.some(i => i.partLabel === 'c'), 'a dependent part is NOT dealt on its own');

// A print-only stimulus must not leak into the online item.
const po = A.makeTask({
  id: 'g9m-t-002', chapterId: 'c', difficulty: 2,
  stimulus: { html: '<svg role="img"></svg>', altText: 'grid', printOnly: true },
  parts: [{ label: 'a', prompt: 'What is 2+2?', marks: 1, explanation: 'e', response: { kind: 'number', answer: '4' } }],
});
ok(A.projectToItems(po)[0].question.indexOf('<svg') === -1, 'a printOnly stimulus stays off the online item');

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
