'use strict';
// Does the printable paper stop being an A/B/C/D worksheet?
//
//   node netlify/build-questions.js && node scripts/test-printable-open-ended.js
//
// WHY THIS EXISTS
// The printable paper used to print all four options under every choice
// question it dealt, which for a French paper meant twenty consecutive blocks
// of the shape "A. La fleur où tu achètes est belle. / B. La fleur que tu
// achètes est belle. / …". On paper that is a worse exercise than the exam it
// imitates: the four options carry the answer's wording, spelling and grammar,
// and a child who can recognise « que » has not shown they can write it.
//
// So `generatePrintablePaper()` keeps the first few choice questions lettered
// and prints the rest open, with a line to write on. `_printNeedsOptions()`
// decides which ones cannot survive that.
//
// ⚠ THAT DECISION IS A READING, NOT A MEASUREMENT - the same problem
//   audit-difficulty-labels.js has. Whether "Quel mot complète : « Le chat est
//   ___ la table »" still asks something without its options is a judgement
//   about the sentence, and a script can only check that the judgement it was
//   given still holds. So this file is in two halves:
//     1. VERDICTS - real stems, hand-read once, asserted. These fail the build.
//     2. THE CORPUS - every choice question in every live pack, re-measured.
//        Reported always; fails only if the share needing options runs away
//        from the recorded baseline, which is what a rule quietly rotting
//        against new content looks like.
//
// ⚠ IT FAILS SAFE, and the asymmetry is the point. A question printed WITH
//   options it did not need is merely less useful. A question printed WITHOUT
//   options it needed cannot be answered at all, and the child discovers that
//   with a pencil in their hand. Every ambiguous shape keeps its options.

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(ROOT, 'engine', 'app.js'), 'utf8');
const region = (start, end) => {
  const a = source.indexOf(start);
  const b = source.indexOf(end, a);
  if (a < 0 || b < 0) throw new Error('anchor not found: ' + (a < 0 ? start : end));
  return source.slice(a, b);
};

// ── The printable paper, lifted whole ─────────────────────────────────────
// Not just the detector: the paper's own budget ("a few at the top") is inline
// in generatePrintablePaper(), and a detector that is right while the budget
// loop is wrong still ships an A/B/C/D worksheet.
const code = region('// ── Comprehension passages on a printed paper', 'function startExamTimer()');

let opened = '';
const ctx = vm.createContext({
  console,
  CHAPTERS: [], STATIC_QUESTIONS: [],
  ACTIVE_PACK: { id: 'grade5-french', subject: 'French', grade: 5 },
  ACTIVE_STUDENT_ID: 'test-child',
  DB: { restrictions: {} },
  isPoolQuestion: q => q && q.type !== 'cloze' && q.type !== 'errorhunt' && q.type !== 'task',
  shuffle: a => [...a],                       // deterministic: the paper must be right, not lucky
  _prettyMath: s => String(s == null ? '' : s),
  _symLineStaticSvg: () => '<svg></svg>',
  _activeSubjectLabel: () => ({ grade: 5, name: 'French' }),
  // ⚠ The REAL builder, not a stub. _paperWatermarkCSS moved to helpers.js so
  //   nce_paper.js could share it (it loads before app.js), which made it an
  //   external dependency of this slice - and a stub here would hide a broken
  //   url() behind a string that looks perfectly fine.
  _paperWatermarkCSS: require(path.join(ROOT, 'engine', 'helpers.js'))._paperWatermarkCSS,
  toast: m => { throw new Error('unexpected toast: ' + m); },
  localStorage: (() => {
    const store = new Map();
    return { getItem: k => (store.has(k) ? store.get(k) : null), setItem: (k, v) => store.set(k, String(v)) };
  })(),
  window: { open: () => ({ document: { write: h => { opened += h; }, close() {} } }) },
});
vm.runInContext(code, ctx);
const needsOptions = ctx._printNeedsOptions;

let pass = 0, fail = 0;
const ok  = m => { pass++; console.log('  ok   ' + m); };
const bad = m => { fail++; console.log('  FAIL ' + m); };
const check = (cond, m) => (cond ? ok(m) : bad(m));

// ═══ 1. VERDICTS ══════════════════════════════════════════════════════════
// Every stem below is a real one, from the pack named. `open: true` means the
// paper may print it with no options at all.
const mcq = (question, answer, options, extra) =>
  Object.assign({ id: 'x', type: 'mcq', question, answer, options: options || [answer, 'b', 'c', 'd'] }, extra);

const VERDICTS = [
  // ── open: the stem is a whole question on its own ──────────────────────
  { open: true,  why: 'g5fr: joining two sentences is an instruction, not a choice',
    q: mcq('Relie les deux phrases en te servant de « que ». Fais les changements nécessaires s\'il y a lieu. La fleur est belle. Tu achètes la fleur.', 'La fleur que tu achètes est belle.') },
  { open: true,  why: 'g5fr: names the grammatical job, answer is one word',
    q: mcq('Quelle conjonction de coordination exprime LA CONSÉQUENCE ?', 'donc', ['donc','mais','car','ou']) },
  { open: true,  why: 'g5fr: the bracketed root and the gap fix the answer',
    q: mcq('Écris la forme correcte du mot entre parenthèses. « Le drapeau ___ flotte devant l\'école. » (nation)', 'national') },
  { open: true,  why: 'g5fr: the gap plus the parenthetical fixes the preposition',
    q: mcq('Quel mot complète : « Le chat est ................ la table. » (le chat n\'est pas visible dessus)', 'sous') },
  { open: true,  why: 'g4fr: conjugation with the verb and tense given',
    q: mcq('Complète : « tu ___ au football hier. » (jouer, passé composé)', 'as joué') },
  { open: true,  why: 'g6mth: a word problem asks for a number',
    q: mcq('Gary has 120 marbles. 10% are blue and the rest are red. How many red marbles does Gary have?', '108', ['108','12','110','100']) },
  { open: true,  why: 'g4mth: a bare calculation',
    q: mcq('3,528 ÷ 4 = ?', '882', ['882','872','982','802']) },
  { open: true,  why: 'g5sci: a "what is" question',
    q: mcq('What is the change from liquid water to ice called?', 'Freezing', ['Freezing','Melting','Boiling','Condensing']) },
  { open: true,  why: 'g4eng: the sentence under discussion is quoted, so "which word" is answerable',
    q: mcq('Read: "The bees collect nectar." Which word is a verb?', 'collect', ['collect','bees','nectar','the']) },
  { open: true,  why: 'g5fr: replacing a named group with a pronoun',
    q: mcq('Remplace « Paul » par le bon pronom dans : « Paul prend le bus le samedi. »', 'il', ['il','elle','ils','on']) },
  { open: true,  why: 'g6mth: an imperative with no question mark still asks',
    q: mcq('Simplify 18/24 to its LOWEST TERMS.', '3/4', ['3/4','6/8','9/12','2/3']) },

  // ── keeps its options: the stem points at them, or has nothing to ask ──
  { open: false, why: 'g4eng: "which of the following" is nothing without the following',
    q: mcq('Which of the following is a PROPER noun?', 'Mauritius', ['Mauritius','island','city','river']) },
  { open: false, why: 'g6eng: no material quoted, so "which sentence" needs the sentences',
    q: mcq('Which sentence contains alliteration?', 'The slippery snake slid slowly.', ['The slippery snake slid slowly.','b','c','d']) },
  { open: false, why: 'g6hist: "which pair" is a choice by construction',
    q: mcq('Picture 1 shows one type of farming. Which pair of crops is generally grown in this type of farming?', 'sugar cane and tea') },
  { open: false, why: 'g4fr: "choisis" addresses the options directly',
    q: mcq('Choisis le groupe nominal correct.', 'une histoire intéressante') },
  { open: false, why: 'g4fr: vouvoiement form of the same instruction',
    q: mcq('Choisissez la phrase correcte :', 'Je bois de l\'eau.') },
  { open: false, why: 'g5fr: "est correcte" asks the child to judge four candidates',
    q: mcq('Quelle phrase est correcte au passé composé ?', 'Il est allé au marché.') },
  { open: false, why: 'g5fr: an instruction verb in front of a choice is still a choice',
    q: mcq('Identifiez la phrase CORRECTE avec les pronoms :', 'Je le lui donne.') },
  { open: false, why: 'g5fr: "laquelle de ces" names the options',
    q: mcq('Laquelle de ces expressions DÉCLENCHE le subjonctif ?', 'il faut que') },
  { open: false, why: 'g4hist: a statement trailing off is a sentence, not a question',
    q: mcq('The central plateau is found in…', 'the centre of Mauritius') },
  { open: false, why: 'g9ict: "is a program that:" has no answerable form',
    q: mcq('A computer virus is a program that:', 'copies itself and spreads to other files') },
  { open: false, why: 'g4hist: "where people can" is mid-sentence, not a question word',
    q: mcq('A post office is a building where people can…', 'send letters and parcels') },
  { open: false, why: 'true/false is already an open question and costs one line',
    q: mcq('Sunlight is needed for a seed to germinate.', 'False', ['True','False']) },
  { open: false, why: 'vrai/faux, the French pair',
    q: mcq('Le soleil tourne autour de la Terre.', 'Faux', ['Vrai','Faux']) },
  { open: false, why: 'an option that only means something in a list',
    q: mcq('Plants need water to grow.', 'All of the above', ['All of the above','Water','Light','Air']) },
  { open: false, why: 'tick-all-that-apply has no open form',
    q: Object.assign(mcq('Coche toutes les bonnes réponses.', 'a'), { type: 'multi' }) },
  { open: false, why: 'a two-line answer is a handwriting exercise, not a question',
    q: mcq('How does an EXTINCT volcano differ from a DORMANT volcano?',
           'An extinct volcano is permanently inactive and will never erupt again, while a dormant one has not erupted for a long time but still could') },
];

console.log('\n1. Hand-read verdicts');
for (const v of VERDICTS) {
  const got = !needsOptions(v.q) ;
  check(got === v.open, `${v.open ? 'open   ' : 'options'} - ${v.why}`);
  if (got !== v.open) console.log('       stem: ' + v.q.question.slice(0, 100));
}

// A non-choice question is untouched by any of this.
check(needsOptions({ type: 'numeric', question: 'What is 2 + 2?', answer: '4' }) === false,
  'a numeric question is not a choice question');
check(needsOptions(null) === false, 'null is handled');

// ═══ 2. THE PAPER ITSELF ══════════════════════════════════════════════════
// A synthetic pack of 60 plainly-open questions: if the budget loop works,
// exactly _PRINT_MCQ_KEEP of them print options and the rest print a line.
console.log('\n2. The paper the budget loop actually builds');
const bank = [];
for (let i = 0; i < 240; i++) {
  bank.push(mcq(`Complète : « il ___ le ballon numéro ${i}. » (prendre, au présent)`, 'prend',
    ['prend', 'prends', 'prenez', 'prennent']));
  bank[i].id = 'q' + i;
  bank[i].chapterId = 'ch' + (i % 5);   // 5 and 2 are coprime, so every chapter holds both kinds
  bank[i].difficulty = i < 160 ? 1 + (i % 3) : 4;
}
ctx.STATIC_QUESTIONS = bank;
ctx.CHAPTERS = [...new Set(bank.map(q => q.chapterId))].map(id => ({ id, name: id }));
ctx.DB = { restrictions: {} };
opened = '';
ctx.generatePrintablePaper();

// ⚠ `const` at a vm program's top level is NOT a property of the context -
//   only the function declarations are. Read the budget back by evaluating it.
const KEEP = vm.runInContext('_PRINT_MCQ_KEEP', ctx);
const count = (html, re) => (html.match(re) || []).length;
const rows         = count(opened, /class="q-row"/g);
const optionBlocks = count(opened, /class="mcq-opts"/g);
const answerLines  = count(opened, /class="ans-label"/g);
check(optionBlocks === KEEP,
  `a paper of ${rows} answerable questions prints ${optionBlocks} lettered blocks (expected ${KEEP})`);
check(answerLines === rows - optionBlocks,
  `every other question gets a line to write on (${answerLines} of ${rows})`);
check(count(opened.slice(opened.indexOf('SECTION B')), /class="mcq-opts"/g) === 0,
  'Section B carries no lettered choices at all');
check(/without<\/b> multiple-choice options/.test(opened),
  'the answer key tells the marker the options were hidden');

// The same paper built from questions that ALL need their options must still
// be answerable - the budget is a cap on hiding, never a reason to hide.
const closed = bank.map((q, i) => Object.assign({}, q, {
  id: 'c' + i, question: `Which of the following is answer ${i}?`,
}));
ctx.STATIC_QUESTIONS = closed;
opened = '';
ctx.generatePrintablePaper();
const closedRows = count(opened, /class="q-row"/g);
check(count(opened, /class="mcq-opts"/g) === closedRows && closedRows > 20,
  `a pack whose questions all point at their options keeps every one of them (${closedRows})`);

// Half the bank points at its own options. The rota must reach past them:
// grade4-history printed 15 lettered blocks of 40 before it did.
const mixed = bank.map((q, i) => (i % 2 ? Object.assign({}, q, {
  id: 'm' + i, question: `Which of the following is answer ${i}?`,
}) : Object.assign({}, q, { id: 'm' + i })));
ctx.STATIC_QUESTIONS = mixed;
opened = '';
ctx.generatePrintablePaper();
check(count(opened, /class="mcq-opts"/g) === KEEP,
  `a bank that is half unaskable-without-options still prints ${count(opened, /class="mcq-opts"/g)} lettered blocks`);

// ═══ 3. THE CORPUS ════════════════════════════════════════════════════════
// ⚠ BASELINE, NOT TARGET. This is what the shipped banks measure today. It
//   moves when content lands; a jump means the rules stopped reading the bank
//   they were written against, not that the bank got worse.
const CEILING_PCT = 30;
console.log('\n3. Every live pack, re-measured');
const BUNDLES = path.join(ROOT, 'netlify', 'question-bundles');
if (!fs.existsSync(BUNDLES)) {
  console.log('  skip  no built bundles - run: node netlify/build-questions.js');
} else {
  const files = fs.readdirSync(BUNDLES).filter(f => /^grade\d+-.+\.json$/.test(f));
  let tot = 0, must = 0;
  const rows = [];
  for (const f of files) {
    let arr;
    try { arr = JSON.parse(fs.readFileSync(path.join(BUNDLES, f), 'utf8')); } catch (_) { continue; }
    if (!Array.isArray(arr)) arr = arr.questions || [];
    let pt = 0, pm = 0;
    for (const q of arr) {
      if (q.type !== 'mcq' && q.type !== 'multi') continue;
      pt++; tot++;
      if (needsOptions(q)) { pm++; must++; }
    }
    if (pt) rows.push([f.replace('.json', ''), pm, pt]);
  }
  rows.sort((a, b) => (b[1] / b[2]) - (a[1] / a[2]));
  for (const [name, pm, pt] of rows) {
    console.log(`  ${String(Math.round(100 * pm / pt)).padStart(3)}%  ${name}  (${pm}/${pt} keep their options)`);
  }
  const overall = 100 * must / tot;
  console.log(`  ---   ${overall.toFixed(1)}% of ${tot} choice questions across ${rows.length} packs`);
  check(overall <= CEILING_PCT,
    `overall ${overall.toFixed(1)}% must keep options (baseline ceiling ${CEILING_PCT}%)`);
}

console.log(`\n${fail ? 'FAILED' : 'PASSED'}  ${pass} ok, ${fail} failed`);
process.exit(fail ? 1 : 0);
