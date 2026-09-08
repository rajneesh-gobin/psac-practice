'use strict';
// PSAC French Q7A — « Corrige les erreurs soulignées ».
// The mechanism is covered by scripts/test-french-text-answers.js; this file is
// about the CONTENT, and every check here exists because the failure it catches
// is invisible when you read the table:
//
//   • a question that contains its own answer hands over a free mark;
//   • a row whose "wrong" word equals the answer shows the child the answer
//     underlined (one had exactly that, caught before it shipped);
//   • a sentence with two blanks silently keeps the second one, because
//     String.replace() fills only the first;
//   • the declared subsections and the tagged subsections must be identical per
//     chapter, or a declared id opens an empty screen and a tagged-but-
//     undeclared id hides its questions;
//   • an accent-only confusable without strictAccents marks itself correct.
//
// Run: node scripts/test-french-correction.js
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const { loadSubject } = require(path.join(ROOT, 'netlify/lib/questions-sandbox'));

let pass = 0;
const ck = (name, cond, detail) => {
  if (cond) { console.log('  ok   ' + name); pass++; return; }
  console.log('  FAIL ' + name + (detail !== undefined ? '  -> ' + detail : ''));
  process.exitCode = 1;
};

const strip = s => String(s || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const fold  = s => String(s || '').toLowerCase();
const bare  = s => fold(s).normalize('NFD').replace(/[̀-ͯ]/g, '');

const SUBS = ['son_sont', 'ce_se', 'accord_participe', 'accord_nom_adjectif', 'tout_leur'];
const packs = {};

for (const g of [4, 5, 6]) {
  const pack = 'grade' + g + '-french';
  const items = loadSubject(pack).filter(q => q.type === 'text');
  packs[g] = items;

  console.log('── ' + pack + ' ──');
  ck('at least 100 correction items', items.length >= 100, items.length);
  ck('all of them sit in the question-7 chapter',
    items.every(q => q.chapterId === 'g' + g + 'fr-formation'),
    [...new Set(items.map(q => q.chapterId))].join(','));

  // ⚠ audit-content-coverage.js reports any declared subsection under 20 as a
  // permanent gap, which is where the 20 comes from.
  for (const sub of SUBS) {
    const n = items.filter(q => q.subsection === sub).length;
    ck('subsection ' + sub + ' has at least 20', n >= 20, n);
  }

  // ⚠ The invariant: declared ids and tagged ids identical, per chapter.
  const manifest = fs.readFileSync(path.join(ROOT, 'subjects/' + pack + '/_manifest.js'), 'utf8');
  const block = manifest.slice(manifest.indexOf("'g" + g + "fr-formation': { subsections: ["));
  const declared = new Set([...block.slice(0, block.indexOf(']}')).matchAll(/id:'([a-z_]+)'/g)].map(m => m[1]));
  const tagged = new Set(loadSubject(pack).filter(q => q.chapterId === 'g' + g + 'fr-formation').map(q => q.subsection));
  const missing = [...tagged].filter(s => !declared.has(s));
  const empty   = [...declared].filter(s => !tagged.has(s));
  ck('every tagged subsection is declared', missing.length === 0, missing.join(','));
  ck('every declared subsection has questions', empty.length === 0, empty.join(','));

  let noAnswerLeak = 0, wrongIsAnswer = 0, blanks = 0, htmlAnswer = 0, unguarded = 0;
  for (const q of items) {
    const shown = strip(q.question);
    const ans = String(q.answer);
    // The underlined word must not BE the answer, and the answer must not appear
    // anywhere else in the sentence as a whole word.
    const wrong = (q.confusables || [])[0];
    if (wrong && fold(wrong) === fold(ans)) wrongIsAnswer++;
    const asWord = new RegExp('(^|[^\\p{L}])' + ans.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^\\p{L}])', 'iu');
    if (asWord.test(shown)) noAnswerLeak++;
    if ((String(q.question).match(/<u>/g) || []).length !== 1) blanks++;
    if (/[<>]/.test(ans)) htmlAnswer++;
    if (!q.strictAccents && wrong && bare(wrong) === bare(ans) && fold(wrong) !== fold(ans)) unguarded++;
  }
  ck('no question contains its own answer', noAnswerLeak === 0, noAnswerLeak + ' item(s)');
  ck('no row underlines the answer itself', wrongIsAnswer === 0, wrongIsAnswer + ' item(s)');
  ck('every question has exactly one underlined word', blanks === 0, blanks + ' item(s)');
  ck('no answer carries HTML', htmlAnswer === 0, htmlAnswer + ' item(s)');
  ck('no accent-only pair is left unguarded', unguarded === 0, unguarded + ' item(s)');
  ck('every item has a hint and an explanation',
    items.every(q => q.hint && q.explanation));
  console.log('');
}

console.log('── the ladder ──');
const mean = g => packs[g].reduce((a, q) => a + q.difficulty, 0) / packs[g].length;
const [m4, m5, m6] = [mean(4), mean(5), mean(6)];
ck('grade 4 is the easiest', m4 < m5, m4.toFixed(2) + ' vs ' + m5.toFixed(2));
ck('grade 5 sits in the middle', m5 < m6, m5.toFixed(2) + ' vs ' + m6.toFixed(2));
ck('grade 6 reaches level 4', packs[6].some(q => q.difficulty === 4));
ck('grade 4 stays off level 4', !packs[4].some(q => q.difficulty === 4));
console.log('     mean difficulty  g4 ' + m4.toFixed(2) + '  ·  g5 ' + m5.toFixed(2) + '  ·  g6 ' + m6.toFixed(2));

console.log('');
console.log('── the real 2025 paper, question 7A ──');
// Verbatim from the paper, the way the Grade 5 cloze keeps its real text.
const REAL = [
  ['environs',  'surveillent les'],
  ['attachés',  'Plusieurs chevaux sont'],
  ['sont',      'Les chevaux'],
  ['tout',      'Le gardien a'],
  ['se',        'parviennent à'],
];
for (const [answer, fragment] of REAL) {
  const hit = packs[6].find(q => strip(q.question).includes(fragment) && q.answer === answer);
  ck('« ' + fragment + ' … » → ' + answer, !!hit,
    hit ? '' : 'not found in grade6-french');
}
{
  const accents = packs[6].filter(q => q.strictAccents);
  ck('grade 6 carries the accent homophones (a/à, ou/où)', accents.length >= 4, accents.length);
  ck('…and each one declares its confusable',
    accents.every(q => (q.confusables || []).length === 1));
}

console.log('');
console.log(process.exitCode
  ? 'french correction: FAILURES above'
  : 'French Q7A content checks passed: ' + pass + ' checks across three grades.');
