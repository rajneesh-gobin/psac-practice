'use strict';
// Unit tests for the server-side answer checker in netlify/lib/questions-sandbox.js.
//
// WHY THIS EXISTS
// checkAnswer() is the single source of truth for whether a child's answer is
// correct. If server and browser disagree, a child sees one result in practice
// and gets a different score if the same question appears in an exam. Every type
// must be tested before the server-side delivery refactor ships.
//
// GATE: 100% pass required before Step 4 (stripping answers from questions.js).
//
//   node scripts/test-answer-checker.js

const path = require('node:path');
const ROOT = path.resolve(__dirname, '..');
const { checkAnswer, normalise, foldAnswer, bareAnswer, matchTypedAnswer } =
  require(path.join(ROOT, 'netlify', 'lib', 'questions-sandbox.js'));

let passed = 0, failed = 0;

function assert(label, actual, expected) {
  if (actual === expected) {
    passed++;
  } else {
    failed++;
    console.error(`  FAIL  ${label}`);
    console.error(`        expected ${expected}, got ${actual}`);
  }
}

// ── normalise() ───────────────────────────────────────────────────────────
console.log('\nnormalise()');
assert('lowercase',               normalise('ABC'),         'abc');
assert('strips spaces',           normalise('a b c'),       'abc');
assert('strips commas',           normalise('1,200'),       '1200');
assert('strips Rs.',              normalise('Rs. 500'),     '500');
assert('strips rs',               normalise('rs50'),        '50');
assert('cm2 → cm²',              normalise('10cm2'),       '10cm²');
assert('m2 → m²',                normalise('5m2'),         '5m²');
assert('preserves kg',            normalise('2kg'),         '2kg');
assert('preserves min',           normalise('30min'),       '30min');
assert('pm boundary',             normalise('12pm'),        '12pm');

// ── foldAnswer() ──────────────────────────────────────────────────────────
console.log('\nfoldAnswer()');
assert('lowercase',               foldAnswer('Bonjour'),   'bonjour');
assert('trims whitespace',        foldAnswer('  oui  '),   'oui');
assert('normalises spaces',       foldAnswer('le  chat'),  'le chat');
assert('strips trailing dot',     foldAnswer('oui.'),      'oui');
assert('strips trailing comma',   foldAnswer('non,'),      'non');
assert('curly apostrophe →  \'', foldAnswer('l’eau'), "l'eau");
assert('backtick apostrophe →  \'', foldAnswer('l`eau'),   "l'eau");

// ── bareAnswer() ──────────────────────────────────────────────────────────
console.log('\nbareAnswer()');
assert('strips é',                bareAnswer('été'),       'ete');
assert('strips à',                bareAnswer('à'),         'a');
assert('strips ç',                bareAnswer('garçon'),    'garcon');
assert('case insensitive',        bareAnswer('Été'),       'ete');

// ── matchTypedAnswer() ────────────────────────────────────────────────────
console.log('\nmatchTypedAnswer()');
assert('exact match',
  matchTypedAnswer(['chat'], 'chat', {}).ok, true);
assert('case insensitive',
  matchTypedAnswer(['Chat'], 'chat', {}).ok, true);
assert('trailing dot ignored',
  matchTypedAnswer(['chat'], 'chat.', {}).ok, true);
assert('accent-lenient (é→e)',
  matchTypedAnswer(['été'], 'ete', {}).ok, true);
assert('slip=true when accent stripped',
  matchTypedAnswer(['été'], 'ete', {}).slip, true);
assert('slip=false on exact',
  matchTypedAnswer(['chat'], 'chat', {}).slip, false);
assert('strictAccents rejects bare match',
  matchTypedAnswer(['à'], 'a', { strictAccents: true }).ok, false);
assert('strictAccents accepts exact',
  matchTypedAnswer(['à'], 'à', { strictAccents: true }).ok, true);
assert('empty typed answer → false',
  matchTypedAnswer(['chat'], '', {}).ok, false);
assert('multiple accepted answers',
  matchTypedAnswer(['vouloir', 'désirer'], 'desirer', {}).ok, true);

// ── MCQ ───────────────────────────────────────────────────────────────────
console.log('\ncheckAnswer() — mcq');
const mcq = { type: 'mcq', answer: 'B', acceptableAnswers: ['B'] };
assert('correct',          checkAnswer(mcq, 'B'),   true);
assert('wrong',            checkAnswer(mcq, 'A'),   false);
assert('case insensitive', checkAnswer(mcq, 'b'),   true);
assert('null answer',      checkAnswer(mcq, null),  false);
assert('empty answer',     checkAnswer(mcq, ''),    false);

const mcqMultiAccept = { type: 'mcq', answer: 'Paris', acceptableAnswers: ['Paris', 'paris'] };
assert('acceptable answer', checkAnswer(mcqMultiAccept, 'paris'), true);

// ── Numeric ───────────────────────────────────────────────────────────────
console.log('\ncheckAnswer() — numeric');
const num = { type: 'numeric', answer: '12.5', acceptableAnswers: ['12.5'] };
assert('exact',             checkAnswer(num, '12.5'),   true);
assert('trailing zero',     checkAnswer(num, '12.50'),  true);
assert('leading zero',      checkAnswer(num, '012.5'),  true);
assert('wrong',             checkAnswer(num, '13'),     false);
assert('with comma',        checkAnswer({ type: 'numeric', answer: '1200', acceptableAnswers: ['1200'] }, '1,200'), true);

const numRs = { type: 'numeric', answer: '500', acceptableAnswers: ['500', 'Rs. 500'] };
assert('Rs. prefix stripped', checkAnswer(numRs, 'Rs. 500'), true);
assert('rs lowercase',        checkAnswer(numRs, 'rs500'),   true);

const numNeg = { type: 'numeric', answer: '-3', acceptableAnswers: ['-3'] };
assert('negative number',  checkAnswer(numNeg, '-3'),   true);
assert('negative wrong',   checkAnswer(numNeg, '3'),    false);

// ── Text (French typed) ───────────────────────────────────────────────────
console.log('\ncheckAnswer() — text');
const txt = { type: 'text', answer: 'été', acceptableAnswers: ['été'], strictAccents: false };
assert('exact',              checkAnswer(txt, 'été'),   true);
assert('accent-lenient',     checkAnswer(txt, 'ete'),   true);
assert('case insensitive',   checkAnswer(txt, 'ÉTÉ'),   true);
assert('wrong word',         checkAnswer(txt, 'hiver'),  false);
assert('empty',              checkAnswer(txt, ''),       false);

const txtStrict = { type: 'text', answer: 'à', acceptableAnswers: ['à'], strictAccents: true };
assert('strictAccents correct',  checkAnswer(txtStrict, 'à'), true);
assert('strictAccents rejects',  checkAnswer(txtStrict, 'a'), false);

const txtMulti = { type: 'text', answer: 'vouloir',
  acceptableAnswers: ['vouloir', 'désirer', 'aimer'], strictAccents: false };
assert('alt accepted',  checkAnswer(txtMulti, 'desirer'), true);
assert('alt wrong',     checkAnswer(txtMulti, 'dormir'),  false);

// ── Multi-select ──────────────────────────────────────────────────────────
console.log('\ncheckAnswer() — multi');
const multi = { type: 'multi', answer: ['A', 'C'], acceptableAnswers: ['A', 'C'] };
assert('correct order',    checkAnswer(multi, JSON.stringify(['A', 'C'])), true);
assert('any order',        checkAnswer(multi, JSON.stringify(['C', 'A'])), true);
assert('partial wrong',    checkAnswer(multi, JSON.stringify(['A'])),      false);
assert('extra answer',     checkAnswer(multi, JSON.stringify(['A','C','D'])), false);
assert('all wrong',        checkAnswer(multi, JSON.stringify(['B', 'D'])), false);
assert('empty',            checkAnswer(multi, JSON.stringify([])),         false);

// ── Symmetry ──────────────────────────────────────────────────────────────
console.log('\ncheckAnswer() — symmetry');
const sym = { type: 'symmetry', answer: [[0,2],[1,2]], acceptableAnswers: [] };
assert('correct',          checkAnswer(sym, JSON.stringify([[0,2],[1,2]])), true);
assert('any order',        checkAnswer(sym, JSON.stringify([[1,2],[0,2]])), true);
assert('wrong cell',       checkAnswer(sym, JSON.stringify([[0,1],[1,2]])), false);
assert('too few',          checkAnswer(sym, JSON.stringify([[0,2]])),        false);
assert('malformed json',   checkAnswer(sym, 'not-json'),                    false);

// ── Null / missing question ───────────────────────────────────────────────
console.log('\ncheckAnswer() — edge cases');
assert('null question',    checkAnswer(null, 'A'),   false);
assert('undefined question', checkAnswer(undefined, 'A'), false);

// ── Summary ───────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(50)}`);
console.log(`  ${passed} passed  ${failed} failed  (${passed + failed} total)`);
if (failed > 0) {
  console.error('\n  GATE NOT MET — fix failures before proceeding to Step 2.');
  process.exit(1);
} else {
  console.log('\n  All checks pass. Gate cleared for Step 2.');
}
