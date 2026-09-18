'use strict';
// Do two of an MCQ's options mean the same thing?
//
// WHY THIS EXISTS
// Reported by a parent on 2026-09-18, from the Grade 5 French image chapter:
//
//     Quel connecteur relie la deuxième image à la première ?
//     A Au début   B Ensuite   C Enfin   D D'abord
//
// « Au début » and « D'abord » are the same word twice. Two options that mean
// the same thing cannot BOTH be right, so neither can be the answer: a child who
// notices that is down to a coin toss without knowing any French. Its two
// neighbours had the identical fault with a different pair each — Enfin /
// Finalement, then Ensuite / Puis — so the answer was never the half of a pair,
// three questions running, which is a rule a child can learn instead of French.
//
// Measured across every live pack the day it was found: 3 in grade5-french and
// **43 more across twelve packs**, from Grade 2 English order words to Grade 9
// French connectors. Widening the list by four words — néanmoins, en revanche,
// nevertheless, in contrast — found nine of those 43 that a narrower first pass
// had missed, so the groups below are the measurement, not a decoration. `test-option-parity.js` was already guarding the LENGTH
// tell (answer uniquely longest) and could not see this one: the options here
// are all short and all the same shape. It is the same defect measured on
// meaning instead of on characters.
//
// ⚠ WHAT THIS CANNOT KNOW is whether the pairing is deliberate. Some items are
//   ABOUT near-synonyms — « Distingue parce que, car, puisque : laquelle NE peut
//   PAS commencer une phrase ? » needs all three on screen. That judgement is a
//   reading, so it is recorded in ACCEPTED below with its reason rather than
//   guessed at here. The baseline was cleaned to zero, so anything new is either
//   a real defect or one line of justification.
//
// Run `node netlify/build-questions.js` first — this reads the BUILT bundles,
// because that is what a child actually receives.
//
//   node scripts/test-option-synonyms.js

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const BUNDLES = path.join(ROOT, 'netlify', 'question-bundles');

// ⚠ DERIVED, never a literal list: a pack going live is covered the same day
//   rather than whenever someone remembers. Same reasoning as
//   test-option-parity.js, which had to learn it the hard way.
const LIVE = (() => {
  const packs = [];
  const ctx = { registerSubject: o => packs.push(o), console };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'subjects', '_index.js'), 'utf8'), ctx);
  return new Set(packs.filter(p => !p.comingSoon).map(p => p.id));
})();

// Words that can swap places inside one option list without a child noticing.
// ⚠ Deliberately SMALL and deliberately CONNECTORS. Every entry has to be a
//   pair a marker would accept either way in the same slot; "near enough"
//   (souvent / chaque jour) belongs in a reading, not in a list a build fails on.
const GROUPS = [
  // French — narration and logic
  ["d'abord", "tout d'abord", 'au début', 'pour commencer', 'premièrement'],
  ['ensuite', 'puis', 'après cela'],
  ['enfin', 'finalement', 'pour finir', 'à la fin'],
  ['soudain', 'tout à coup', 'subitement'],
  ['donc', 'par conséquent', "c'est pourquoi"],
  ['parce que', 'car', 'puisque'],
  ['mais', 'pourtant', 'cependant', 'toutefois', 'néanmoins', 'en revanche'],
  ['de plus', 'en outre', 'par ailleurs', 'de surcroît'],
  ['par exemple', 'notamment', 'en particulier'],
  // English
  ['first', 'firstly', 'to begin with', 'at the beginning', 'at first'],
  ['then', 'next', 'after that'],
  ['finally', 'lastly', 'in the end', 'at last'],
  ['because', 'since'],
  ['but', 'however', 'yet', 'nevertheless', 'nonetheless', 'on the other hand', 'in contrast'],
  ['so', 'therefore', 'thus', 'as a result'],
  ['moreover', 'furthermore', 'in addition', 'besides'],
];

// ⚠ Every entry needs a REASON, and the reason has to say why the child is not
//   handed a free elimination. "Looks fine" is not one.
const ACCEPTED = {
  'g6fr-sub-029': 'the question IS about telling car / parce que / puisque apart',
  'g6fr-plus-1448': 'the connector is quoted in the stem — the task is to spot it',
  'g6fr-plus-1453': 'ditto',
  'g6fr-plus-1458': 'ditto',
  'g6fr-plus-1463': 'ditto',
  'g6fr-plus-1468': 'ditto',
  'g6eng-pp19-010': 'transcription of the real PSAC October 2019 paper — the options are the paper\'s, not ours',
};

const norm = s => String(s == null ? '' : s)
  .replace(/<[^>]*>/g, '')
  .replace(/[«»"]/g, '')
  .replace(/[’']/g, "'")
  .replace(/\s+/g, ' ')
  .replace(/[.,;:!?]+$/, '')
  .trim().toLowerCase();

const groupOf = new Map();
GROUPS.forEach((g, i) => g.forEach(w => groupOf.set(norm(w), i)));

const ambiguous = [];   // the ANSWER has a twin: the item has two defensible answers
const leaks = [];       // two DISTRACTORS are twins: both are eliminable for free
const accepted = [];
let scanned = 0;

for (const file of fs.readdirSync(BUNDLES).filter(f => f.endsWith('.json'))) {
  const pack = file.replace(/\.json$/, '');
  // grade<N>.json is the per-grade roll-up of packs already read individually.
  if (!LIVE.has(pack)) continue;
  const raw = JSON.parse(fs.readFileSync(path.join(BUNDLES, file), 'utf8'));
  const qs = Array.isArray(raw) ? raw : (raw.questions || Object.values(raw).find(Array.isArray) || []);
  for (const q of qs) {
    if (!Array.isArray(q.options) || q.options.length < 3) continue;
    scanned++;
    const byGroup = new Map();
    for (const o of q.options) {
      const g = groupOf.get(norm(o));
      if (g === undefined) continue;
      if (!byGroup.has(g)) byGroup.set(g, []);
      byGroup.get(g).push(o);
    }
    for (const twins of byGroup.values()) {
      if (twins.length < 2) continue;
      const row = { pack, id: q.id, ch: q.chapterId, answer: q.answer, twins, options: q.options };
      if (ACCEPTED[q.id]) accepted.push(row);
      else if (twins.some(t => norm(t) === norm(q.answer))) ambiguous.push(row);
      else leaks.push(row);
    }
  }
}

const print = (rows) => {
  for (const r of rows) {
    console.log(`  ${r.pack} · ${r.id} [${r.ch}]`);
    console.log(`      answer ${JSON.stringify(r.answer)} · interchangeable: ${r.twins.map(t => JSON.stringify(t)).join(' = ')}`);
    console.log(`      options ${JSON.stringify(r.options)}`);
  }
};

console.log(`Scanned ${scanned} multiple-choice questions across ${LIVE.size} live packs.\n`);

if (ambiguous.length) {
  console.log(`FAIL  ${ambiguous.length} question(s) where the ANSWER has a twin among the options.`);
  console.log('      Two options mean the same thing and one of them is the marked answer,');
  console.log('      so the other one is defensible too.');
  print(ambiguous);
  console.log('');
}
if (leaks.length) {
  console.log(`FAIL  ${leaks.length} question(s) with two interchangeable DISTRACTORS.`);
  console.log('      Neither can be the answer, so the child eliminates both for free.');
  print(leaks);
  console.log('');
}
if (accepted.length) {
  console.log(`note  ${accepted.length} known pairing(s) accepted on purpose:`);
  for (const r of accepted) console.log(`  ${r.id} — ${ACCEPTED[r.id]}`);
  console.log('');
}

console.log(`${scanned} checked, ${ambiguous.length + leaks.length} flagged, ${accepted.length} accepted.`);

if (ambiguous.length || leaks.length) {
  console.log('Fix each by replacing ONE of the twins with a connector of a different');
  console.log('function — an opposition word among order words, a cause among');
  console.log('consequences — keeping all four options the same grammatical shape.');
  console.log('If the pairing is the POINT of the question, add its id to ACCEPTED');
  console.log('in this file with the reason.');
  process.exit(1);
}
console.log('All option-synonym checks passed.');
