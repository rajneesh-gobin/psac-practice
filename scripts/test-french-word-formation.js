'use strict';
// Guards the three "Formation des Mots" banks (grades 4/5/6) — the PSAC French
// Q7 drill, 10 marks on every real paper.
//
// Runs the REAL engine/helpers.js factory and the REAL server sandbox, not a
// reimplementation, because a factory copy has silently stripped fields before
// (learnMore, subsection) while the source looked correct.
//
// The invariant that actually breaks the screen is the subsection one: a
// declared id with no questions opens an empty "Practise →", and a tagged id
// that is not declared hides those questions from the syllabus screen entirely.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { loadSubject } = require('../netlify/lib/questions-sandbox');

const root = path.resolve(__dirname, '..');

let pass = 0, fail = 0;
const bad = [];
const check = (ok, label, detail) => {
  if (ok) { pass++; return; }
  fail++;
  bad.push(`${label}${detail ? ` — ${detail}` : ''}`);
};

const SUBSECTIONS = ['verbe_nom', 'nom_adjectif', 'adjectif_adverbe', 'former_verbe', 'prefixes'];
// ⚠ The chapter also declares the five Q7A correction subsections, which are
// typed `text` items covered by scripts/test-french-correction.js. This file
// owns 7B, so it asserts its own five are declared rather than that the
// chapter declares five in total.
const CORRECTION_SUBSECTIONS = ['son_sont', 'ce_se', 'accord_participe', 'accord_nom_adjectif', 'tout_leur'];

const PACKS = [
  { grade: 4, id: 'grade4-french', chapter: 'g4fr-formation', file: 'subjects/grade4-french/questions/ch11_g4_formation_mots.js', prefix: 'g4fr-form-' },
  { grade: 5, id: 'grade5-french', chapter: 'g5fr-formation', file: 'subjects/grade5-french/questions/ch13_formation_mots.js', prefix: 'g5fr-form-' },
  { grade: 6, id: 'grade6-french', chapter: 'g6fr-formation', file: 'subjects/grade6-french/questions/ch11_g6_formation_mots.js', prefix: 'g6fr-form-' },
];

// The five items of the 2025 paper's Question 7, transcribed. If a future edit
// changes one of these answers the drill has stopped matching the exam.
const PSAC_2025_Q7 = [
  ['décider', 'décision'],
  ['hiver', 'hivernal'],
  ['sérieux', 'sérieusement'],
  ['lait', 'laitiers'],
  ['pollution', 'polluer'],
];

const stripTags = s => String(s).replace(/<[^>]+>/g, ' ');
const hasWord = (haystack, word) =>
  new RegExp(`(^|[^A-Za-zÀ-ÿ'-])${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^A-Za-zÀ-ÿ'-]|$)`, 'i')
    .test(haystack);

for (const pack of PACKS) {
  // ── The manifest must declare the chapter and exactly these subsections ──
  let manifest;
  const ctx = vm.createContext({ registerSubject: p => { manifest = p; }, window: {}, console });
  vm.runInContext(fs.readFileSync(path.join(root, 'subjects', pack.id, '_manifest.js'), 'utf8'), ctx);

  const chapter = (manifest.chapters || []).find(c => c.id === pack.chapter);
  check(!!chapter, `${pack.id}: manifest declares ${pack.chapter}`);
  check(!!chapter && !chapter.enrichment, `${pack.id}: ${pack.chapter} is an ordinary chapter, not a bonus card`,
    'Q7 is a numbered 10-mark question on the real paper');
  check(!!chapter && Array.isArray(chapter.notes) && chapter.notes.length >= 6,
    `${pack.id}: ${pack.chapter} carries revision notes`, `${chapter && (chapter.notes || []).length} notes`);

  const declared = ((manifest.syllabus || {})[pack.chapter] || {}).subsections || [];
  const declaredIdSet = new Set(declared.map(d => d.id));
  check(SUBSECTIONS.every(x => declaredIdSet.has(x)),
    `${pack.id}: the syllabus declares all ${SUBSECTIONS.length} word-formation subsections`,
    declared.map(d => d.id).join(','));
  check(CORRECTION_SUBSECTIONS.every(x => declaredIdSet.has(x)),
    `${pack.id}: …alongside the five Q7A correction subsections`,
    declared.map(d => d.id).join(','));
  check(declared.every(s => s.name && s.name.trim()), `${pack.id}: every declared subsection has a name`);

  // ── The bank, through the real server sandbox ──
  // ⚠ type 'mcq' as well as the chapter. The chapter now holds BOTH halves of
  // question 7: these are the 7B word-formation MCQs, and the 7A corrections
  // alongside them are typed `text` items with no `options` at all — every
  // per-question assertion below would throw on one.
  // scripts/test-french-correction.js covers those.
  const bank = loadSubject(pack.id)
    .filter(q => q.chapterId === pack.chapter && q.type === 'mcq');
  check(bank.length === 100, `${pack.id}: ${pack.chapter} holds 100 questions`, `${bank.length}`);

  const declaredIds = declared.map(s => s.id).sort();
  // ⚠ Over the WHOLE chapter, not just the MCQs: a declared id with no
  // questions opens an empty screen, and that is true whatever the type.
  const taggedIds = [...new Set(loadSubject(pack.id)
    .filter(q => q.chapterId === pack.chapter).map(q => q.subsection))].sort();
  check(JSON.stringify(declaredIds) === JSON.stringify(taggedIds),
    `${pack.id}: declared subsection ids === tagged subsection ids`,
    `declared ${JSON.stringify(declaredIds)} vs tagged ${JSON.stringify(taggedIds)}`);
  check(JSON.stringify(taggedIds) === JSON.stringify([...SUBSECTIONS, ...CORRECTION_SUBSECTIONS].sort()),
    `${pack.id}: subsections are the ten expected ones (5 for 7B, 5 for 7A)`, JSON.stringify(taggedIds));

  for (const sub of SUBSECTIONS) {
    const n = bank.filter(q => q.subsection === sub).length;
    // audit-content-coverage.js reports any declared subsection under 20 as a gap.
    check(n >= 20, `${pack.id}/${sub}: at least 20 questions`, `${n}`);
  }

  // ── Per-question integrity ──
  const ids = new Set();
  let dupIds = 0, missingAnswer = 0, notFour = 0, dupOptions = 0,
      noHint = 0, noExplanation = 0, undef = 0, leaked = 0, noArrow = 0, blankless = 0;
  for (const q of bank) {
    if (ids.has(q.id)) dupIds++;
    ids.add(q.id);
    if (!String(q.id).startsWith(pack.prefix)) dupIds++;
    if (!q.options.includes(q.answer)) missingAnswer++;
    if (q.options.length !== 4) notFour++;
    if (new Set(q.options).size !== q.options.length) dupOptions++;
    if (!q.hint) noHint++;
    if (!q.explanation) noExplanation++;
    if (/undefined/.test(`${q.question} ${q.hint} ${q.explanation}`)) undef++;
    if (!/___/.test(q.question)) blankless++;
    // The prompt must never contain the word the child has to produce. Word
    // boundaries, not substrings: the prompt legitimately shows "(lait)" while
    // the answer is "laitiers".
    if (hasWord(stripTags(q.question), q.answer)) leaked++;
    if (!/-\s*\S+\s*→\s*\S+/.test(stripTags(q.explanation))) noArrow++;
  }
  check(dupIds === 0, `${pack.id}: ids unique and correctly prefixed`, `${dupIds} affected`);
  check(missingAnswer === 0, `${pack.id}: every answer is among its options`, `${missingAnswer} affected`);
  check(notFour === 0, `${pack.id}: every question offers exactly 4 options`, `${notFour} affected`);
  check(dupOptions === 0, `${pack.id}: no question offers a duplicate option`, `${dupOptions} affected`);
  check(noHint === 0, `${pack.id}: every question has a hint`, `${noHint} affected`);
  check(noExplanation === 0, `${pack.id}: every question has an explanation`, `${noExplanation} affected`);
  check(undef === 0, `${pack.id}: no "undefined" leaked from a missing rule key`, `${undef} affected`);
  check(blankless === 0, `${pack.id}: every question shows the ___ blank`, `${blankless} affected`);
  check(leaked === 0, `${pack.id}: no prompt contains its own answer`, `${leaked} affected`);
  check(noArrow === 0, `${pack.id}: every explanation names the derivation (base → forme)`, `${noArrow} affected`);

  // ── The source distractors, before the factory shuffles and truncates ──
  const srcCtx = { STATIC_QUESTIONS: [], window: {}, console };
  vm.createContext(srcCtx);
  vm.runInContext(fs.readFileSync(path.join(root, 'engine/helpers.js'), 'utf8'), srcCtx);
  const factory = srcCtx.makeMCQ;
  let repeated = 0, answerAsDistractor = 0;
  srcCtx.makeMCQ = q => {
    const wrong = (q.options || []).filter(o => o !== q.answer);
    if (new Set(wrong).size !== wrong.length) repeated++;
    if (wrong.length !== 3) answerAsDistractor++;
    return factory(q);
  };
  vm.runInContext(fs.readFileSync(path.join(root, pack.file), 'utf8'), srcCtx, { filename: pack.file });
  check(repeated === 0, `${pack.file}: no repeated source distractor`, `${repeated} affected`);
  check(answerAsDistractor === 0, `${pack.file}: every row supplies 3 distinct wrong forms`, `${answerAsDistractor} affected`);
  check(srcCtx.STATIC_QUESTIONS.length === 100, `${pack.file}: pushes exactly 100 questions`, `${srcCtx.STATIC_QUESTIONS.length}`);
}

// ── The 2025 paper's own Question 7, in the Grade 5 bank ──
const g5 = loadSubject('grade5-french').filter(q => q.chapterId === 'g5fr-formation');
for (const [base, answer] of PSAC_2025_Q7) {
  const q = g5.find(x => hasWord(stripTags(x.question), `\\(${base}\\)`) || stripTags(x.question).includes(`(${base})`));
  check(!!q && q.answer === answer, `PSAC 2025 Q7 « ${base} » → « ${answer} » is drilled at Grade 5`,
    q ? `found answer "${q.answer}"` : 'question not found');
}

// ── The chapter must reach the child through the server bundle path too ──
for (const pack of PACKS) {
  const all = loadSubject(pack.id);
  check(all.some(q => q.chapterId === pack.chapter && q.subsection && q.hint && q.explanation),
    `${pack.id}: subsection/hint/explanation survive the server sandbox`);
}

console.log(bad.length ? bad.map(b => `  ✗ ${b}`).join('\n') : '');
console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
