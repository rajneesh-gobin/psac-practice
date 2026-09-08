'use strict';
// Does the `difficulty` field mean anything? A REVIEW tool, not a gate.
//
// WHY THIS EXISTS
// Measured 2026-09-08 by classifying the real PSAC papers against their own
// mark allocations, and a random sample of the bank against the same scheme:
//
//              recall   apply(read a diagram)   explain
//   paper        46%            30%               24%     (Science 2024 modular, 50 marks)
//   bank         65%          17.5%             17.5%     (40-item sample, grade6-science)
//
// The bank is recall-heavy by ~19 points. But the `difficulty` label did NOT
// track that: L1 was 86% recall (the label works), while L2 was a three-way
// mix and L3/L4 were diluted with plain retrieval — "In which year was
// Aapravasi Ghat inscribed?" sat at L3, and "Which heritage sites are in
// Rodrigues?" sat at L4. 34 items were re-labelled on 2026-09-08.
//
// THE CRITERIA (anchored on what the papers award marks for)
//   L1  retrieve one stated fact                "How many milk teeth does a child have?"
//   L2  retrieve a fact needing a distinction,  "Which gas is absent in dry air?"
//       or read a value off a stimulus
//   L3  derive a reason, consequence or         "What would happen if all the grass were removed?"
//       comparison; apply a rule to a case
//       not stated in the question
//   L4  applied / contextual                    "A suction cup is pressed onto a wall. Why does it hold?"
//
// ⚠ L4 IS NOT THE SAME THING IN EVERY PACK, and a single rule across all five
//   would be wrong. Measured: maths L4 = multi-step word problems (this is the
//   definition CLAUDE.md records, and it is maths-shaped); english L4 = extended
//   passage and essay analysis; french L4 = multi-verb cloze passages;
//   history/science L4 = applied scenarios. That is why this file prints for a
//   human to read instead of failing a build.
//
// ⚠ Two invariants were tried as automatic gates and REJECTED, so nobody
//   re-adds them: "an L3/L4 answer must not be a single word" fires on 1055
//   French and 206 English items, because grammar answers are single words by
//   nature — and on legitimate ones like the cockroach/"Respiration" item.
//   "An L4 stem must contain a number or a named actor" fires on 246 of 275
//   French L4s for the same reason.

const fs = require('fs');
const path = require('path');

const BUNDLES = path.join(__dirname, '..', 'netlify', 'question-bundles');
const PACKS = ['grade6-maths', 'grade6-english', 'grade6-french', 'grade6-history', 'grade6-science'];
// only the content packs get an item-by-item listing; language packs use the
// scale differently and the listing would be noise
const CONTENT = new Set(['grade6-history', 'grade6-science']);

const strip = s => String(s == null ? '' : s)
  .replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&[a-z#0-9]+;/g, ' ')
  .replace(/\s+/g, ' ').trim();

// Patterns that were genuinely wrong last time. CANDIDATES for review, never verdicts.
const RETRIEVAL_STEM = [
  { re: /^in which year\b/i, note: 'asks for a year' },
  { re: /^who (was|is|were)\b/i, note: 'asks for a name' },
  { re: /^which one of the following is (a|an)\b/i, note: 'single-fact selection' },
  { re: /^what is the correct translation\b/i, note: 'asks for a translation' },
  { re: /^which .{0,40}sites? (are|is) found\b/i, note: 'asks for names of places' },
  { re: /^name\b/i, note: 'asks to name something' },
];

let anyCandidates = 0;

console.log('difficulty label audit\n');
console.log('pack'.padEnd(16) + 'L1'.padStart(7) + 'L2'.padStart(7) + 'L3'.padStart(7) + 'L4'.padStart(7) + '     n');
for (const pack of PACKS) {
  const file = path.join(BUNDLES, pack + '.json');
  if (!fs.existsSync(file)) { console.log(pack.padEnd(16) + '  bundle missing - run `node netlify/build-questions.js`'); continue; }
  const qs = JSON.parse(fs.readFileSync(file, 'utf8'));
  const d = { 1: 0, 2: 0, 3: 0, 4: 0 };
  for (const q of qs) d[q.difficulty] = (d[q.difficulty] || 0) + 1;
  const pc = x => (100 * d[x] / qs.length).toFixed(1) + '%';
  console.log(pack.padEnd(16) + pc(1).padStart(7) + pc(2).padStart(7) + pc(3).padStart(7) + pc(4).padStart(7) + String(qs.length).padStart(7));
}

for (const pack of PACKS) {
  if (!CONTENT.has(pack)) continue;
  const file = path.join(BUNDLES, pack + '.json');
  if (!fs.existsSync(file)) continue;
  const qs = JSON.parse(fs.readFileSync(file, 'utf8')).filter(q => q.difficulty >= 3);

  const flagged = [];
  for (const q of qs) {
    const stem = strip(q.question);
    const hit = RETRIEVAL_STEM.find(p => p.re.test(stem));
    if (hit) flagged.push({ q, note: hit.note });
  }

  console.log('\n' + pack + ' - ' + qs.length + ' items at L3/L4');
  if (!flagged.length) { console.log('  no retrieval-shaped stems among them'); continue; }
  anyCandidates += flagged.length;
  console.log('  ' + flagged.length + ' CANDIDATE(S) for review - a retrieval-shaped stem at L3/L4:');
  for (const { q, note } of flagged) {
    console.log('    L' + q.difficulty + ' ' + q.id.padEnd(20) + strip(q.question).slice(0, 74));
    console.log('       ' + note + '  ->  ' + strip(q.answer).slice(0, 60));
  }
}

console.log('\n' + (anyCandidates
  ? anyCandidates + ' candidate(s) to look at. These are prompts for judgement, not failures.'
  : 'no candidates flagged.'));
console.log('This script never fails a build: whether a question demands reasoning is a');
console.log('reading, and a script can only count what someone has already asserted.');
