'use strict';
// Guards the three generated French banks (grades 4/5/6) against the defects
// that shipped once: duplicate MCQ options (« aime / aime / aiment / aimes »),
// answers missing from the option list, doubled context phrases (« dans le
// vieux jardin dans le vieux jardin »), wrong elision (« je aime »), and the
// Grade 5 subjunctive offering 3rd-person forms after « que tu ».
// Runs the REAL engine/helpers.js factory — not a reimplementation — because a
// factory copy once silently stripped fields the source appeared to carry.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const files = [
  'subjects/grade4-french/questions/extended_practice_bank.js',
  'subjects/grade5-french/questions/extended_practice_bank.js',
  'subjects/grade6-french/questions/extended_practice_bank.js',
];

let pass = 0, fail = 0;
const bad = [];
const check = (ok, label, detail) => {
  if (ok) { pass++; return; }
  fail++;
  bad.push(`${label}${detail ? ` — ${detail}` : ''}`);
};

const ctx = { STATIC_QUESTIONS: [], window: {}, console };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'engine/helpers.js'), 'utf8'), ctx, { filename: 'helpers.js' });
check(typeof ctx.makeMCQ === 'function', 'engine/helpers.js defines makeMCQ');

for (const file of files) {
  const before = ctx.STATIC_QUESTIONS.length;
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), ctx, { filename: file });
  const added = ctx.STATIC_QUESTIONS.slice(before);
  check(added.length > 100, `${file} generates a real bank`, `${added.length} questions`);

  const ids = new Set();
  let dupOptions = 0, missingAnswer = 0, shortOptions = 0, dupIds = 0, doubledPhrase = 0, badElision = 0;
  for (const q of added) {
    if (ids.has(q.id)) dupIds++;
    ids.add(q.id);
    if (new Set(q.options).size !== q.options.length) dupOptions++;
    if (!q.options.includes(q.answer)) missingAnswer++;
    if (q.options.length < 4) shortOptions++;
    const text = q.question.replace(/<[^>]+>/g, ' ');
    if (/\b(\S+ \S+ \S+) \1\b/.test(text)) doubledPhrase++;
    const prose = `${text} ${(q.explanation || '').replace(/<[^>]+>/g, ' ')}`;
    if (/\bje [aàâeéèêiîou]/i.test(prose.replace(/« je »|« je /g, ''))) badElision++;
  }
  check(dupIds === 0, `${file}: ids unique`, `${dupIds} duplicates`);
  check(dupOptions === 0, `${file}: no question offers duplicate options`, `${dupOptions} affected`);
  check(missingAnswer === 0, `${file}: every answer is among its options`, `${missingAnswer} affected`);
  check(shortOptions === 0, `${file}: every question has 4 distinct options`, `${shortOptions} affected`);
  check(doubledPhrase === 0, `${file}: no doubled phrase in question text`, `${doubledPhrase} affected`);
  check(badElision === 0, `${file}: no « je » before a vowel (should be « j' »)`, `${badElision} affected`);
}

const g5subj = ctx.STATIC_QUESTIONS.filter(q => q.chapterId === 'g5fr-subjonctif');
check(g5subj.length > 0, 'grade5 subjunctive questions exist');
check(g5subj.every(q => !/ tu ___/.test(q.question)), 'grade5 subjunctive never pairs « tu » with its 3rd-person answer forms');

const g6subj = ctx.STATIC_QUESTIONS.filter(q => q.chapterId === 'g6fr-subjunctif');
check(g6subj.every(q => q.answer.endsWith('s')), 'grade6 subjunctive answers are all « tu » forms (end in -s)');

const perChapter = {};
for (const q of ctx.STATIC_QUESTIONS) perChapter[q.chapterId] = (perChapter[q.chapterId] || 0) + 1;
console.log('Questions per chapter:', JSON.stringify(perChapter));
console.log(`\n${pass} passed, ${fail} failed`);
if (fail) { console.error(bad.map(b => `  ✗ ${b}`).join('\n')); process.exit(1); }
