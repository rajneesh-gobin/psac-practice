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

// ⚠ 2026-09-09: this audited FIVE Grade 6 packs and nothing else. Grades 1-5
// and 7-9 had never been through it, which is how 20 near-identical two-step
// items sat at L4 in grade5-maths unnoticed - "A vendor buys 21 lunch boxes...",
// then 22, then 23, walking the numbers upward twenty times. The pack list is
// now DERIVED from the live packs, so publishing a pack enrols it here.
//
// ⚠ It also grew a TEMPLATE-RUN report. A difficulty label can be perfectly
// honest and the bank still be far smaller than it counts: measured, 61.6% of
// grade4-maths questions share a stem with another question once the numbers
// are stripped out. A child who solves one solves the run.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BUNDLES = path.join(ROOT, 'netlify', 'question-bundles');

// Derived, never a literal: a pack that goes live must not have to be
// remembered here as well.
function livePacks() {
  const out = [];
  const src = fs.readFileSync(path.join(ROOT, 'subjects', '_index.js'), 'utf8');
  new Function('registerSubject', src)(p => { if (!p.comingSoon) out.push(p); });
  return out.sort((a, b) => a.grade - b.grade || a.id.localeCompare(b.id)).map(p => p.id);
}
const PACKS = livePacks();
// Only the content packs get the retrieval-stem listing; language packs use the
// scale differently and the listing would be noise.
const CONTENT = new Set(PACKS.filter(p => /-(history|science|biology|chemistry|physics|social-modern-studies|ict)$/.test(p)));
const MATHS   = new Set(PACKS.filter(p => /-maths$/.test(p)));

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

// ⚠ A `noDifficulty: true` pack does not USE this scale, and its rows here mean
// nothing. The badge is hidden in practice, the selector is hidden when a parent
// assigns work, and search omits the level - so "grade1-english 100% L1" is not
// a finding, it is the absence of a feature. Marked, because reading that line
// as a gap is a day spent writing questions for a pack that does not need them:
// measured 2026-09-09, the six grade 1-3 language packs have 0 subsections under
// 20 items, 0 untagged questions and a clean recall -> apply -> comprehend
// progression across the three years.
const NO_DIFFICULTY = (() => {
  const out = new Set();
  const src = fs.readFileSync(path.join(ROOT, 'subjects', '_index.js'), 'utf8');
  new Function('registerSubject', src)(p => { if (p.noDifficulty) out.add(p.id); });
  return out;
})();

console.log('difficulty label audit\n');
console.log('pack'.padEnd(30) + 'L1'.padStart(7) + 'L2'.padStart(7) + 'L3'.padStart(7) + 'L4'.padStart(7) + '     n');
for (const pack of PACKS) {
  const file = path.join(BUNDLES, pack + '.json');
  if (!fs.existsSync(file)) { console.log(pack.padEnd(30) + '  bundle missing - run `node netlify/build-questions.js`'); continue; }
  const qs = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (NO_DIFFICULTY.has(pack)) {
    console.log(pack.padEnd(30) + '  — noDifficulty pack: the scale is not used or shown'.padEnd(28) + String(qs.length).padStart(7));
    continue;
  }
  const d = { 1: 0, 2: 0, 3: 0, 4: 0 };
  for (const q of qs) d[q.difficulty] = (d[q.difficulty] || 0) + 1;
  const pc = x => (100 * d[x] / qs.length).toFixed(1) + '%';
  console.log(pack.padEnd(30) + pc(1).padStart(7) + pc(2).padStart(7) + pc(3).padStart(7) + pc(4).padStart(7) + String(qs.length).padStart(7));
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

// ── Template runs ──────────────────────────────────────────────────────────
// ⚠ Stems compared with every number replaced by '#'. Two questions that differ
// only in their numbers are one question for a child: solving the first hands
// them the method for the rest, so a run of 20 is 20 items of counted content
// and one item of practice.
const shapeOf = s => strip(s).replace(/\b\d+(?:[.,]\d+)?\b/g, '#').replace(/\s+/g, ' ').trim();

console.log('\n\n══ template runs — stems identical once the numbers are stripped ══');
console.log('pack'.padEnd(30) + 'items'.padStart(7) + 'shapes'.padStart(8) + 'in a run'.padStart(10) + '   biggest run');
const runsByPack = [];
const drillNote = [];
for (const pack of PACKS) {
  const file = path.join(BUNDLES, pack + '.json');
  if (!fs.existsSync(file)) continue;
  const qs = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!qs.length) continue;
  const groups = new Map();
  for (const q of qs) {
    const k = shapeOf(q.question).slice(0, 140);
    if (!k) continue;
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(q);
  }
  // ⚠ A fixed stem over DIFFERENT options is a drill, not a clone. "Which word
  //   is spelled correctly?" appears 25 times in grade1-english over 25 distinct
  //   sets of spelling words - the child does new work every time, and the stem
  //   is the same because the task is the same. Counting those as duplication
  //   put that pack at 20% and made it look like grade4-maths, which it is not.
  //   A run only counts when the OPTIONS repeat too.
  // ⚠ THREE conditions, and all of them are needed. "Every option set differs"
  //   alone exempted numeric word problems too, because two stories with
  //   different numbers have different answers — which is precisely the
  //   duplication this report exists to find.
  //   1. the varying part must really vary (different options / answers),
  //   2. nothing in the run may be L3/L4 — a reasoning item is never a drill,
  //   3. the stem must be a short instruction, not a situation. "# + # = ?" and
  //      "Which word is spelled correctly?" are exercises; "A pupil buys #
  //      notebooks at Rs # each…" is a story told twice.
  const DRILL_STEM_MAX = 60;
  const optKey = q => (Array.isArray(q.options) && q.options.length)
    ? JSON.stringify([...q.options].map(o => strip(o)).sort()) : 'ans:' + strip(q.answer);
  const isDrill = (shape, arr) => new Set(arr.map(optKey)).size === arr.length
    && arr.every(q => (q.difficulty || 1) <= 2)
    && shape.length <= DRILL_STEM_MAX;
  const allRunsRaw = [...groups.entries()].filter(([, a]) => a.length > 1);
  const drills = allRunsRaw.filter(([sh, a]) => isDrill(sh, a));
  const runs = allRunsRaw.filter(([sh, a]) => !isDrill(sh, a)).sort((a, b) => b[1].length - a[1].length);
  const inRun = runs.reduce((n, [, a]) => n + a.length, 0);
  if (drills.length) {
    const n = drills.reduce((t, [, a]) => t + a.length, 0);
    drillNote.push('  ' + pack.padEnd(30) + n + ' item(s) share a stem but every option set differs — drill, not duplication');
  }
  const biggest = runs.length ? runs[0][1].length : 0;
  runsByPack.push({ pack, qs, runs, inRun, biggest, shapes: groups.size });
  console.log(pack.padEnd(30) + String(qs.length).padStart(7) + String(groups.size).padStart(8) +
    (inRun ? (inRun + ' (' + (100 * inRun / qs.length).toFixed(0) + '%)').padStart(10) : '0'.padStart(10)) +
    '   ' + (biggest > 1 ? 'x' + biggest : '-'));
}

if (drillNote.length) {
  console.log('\nnot counted above — a shared stem over entirely different options:');
  drillNote.forEach(l => console.log(l));
}

// The worst offenders, named, so there is something to go and fix.
const WORST = 12;
const allRuns = [];
runsByPack.forEach(r => r.runs.forEach(([shape, arr]) => allRuns.push({ pack: r.pack, shape, arr })));
allRuns.sort((a, b) => b.arr.length - a.arr.length);
console.log('\nthe ' + WORST + ' largest runs across every live pack:');
allRuns.slice(0, WORST).forEach(r => {
  const l4 = r.arr.filter(q => q.difficulty === 4).length;
  console.log('  x' + String(r.arr.length).padStart(3) + '  ' + r.pack.padEnd(16) +
    (l4 ? '(' + l4 + ' of them at L4) ' : '') + r.shape.slice(0, 88));
  console.log('        ids: ' + r.arr.slice(0, 6).map(q => q.id).join(', ') + (r.arr.length > 6 ? ', …' : ''));
});

// ── Maths L4 depth ─────────────────────────────────────────────────────────
// ⚠ Maths is the ONE pack family where L4 has a measurable floor: CLAUDE.md
// defines it as multi-step word problems. Operands in the stem are a floor on
// how many steps the child must carry - an L4 with two numbers in it cannot be
// multi-step. Still a review, not a gate: "a shop sells at 15% profit, cost
// Rs 18,000" is two operands and a legitimate two-stage problem.
const operands = t => (strip(t).replace(/,(?=\d{3}\b)/g, '').match(/\b\d+(?:\.\d+)?\b/g) || []).length;
console.log('\n\n══ maths L4 depth — operands in the stem (multi-step is the L4 claim) ══');
for (const pack of PACKS) {
  if (!MATHS.has(pack)) continue;
  const file = path.join(BUNDLES, pack + '.json');
  if (!fs.existsSync(file)) continue;
  const l4 = JSON.parse(fs.readFileSync(file, 'utf8')).filter(q => q.difficulty === 4 && q.question);
  if (!l4.length) continue;
  const dist = {};
  l4.forEach(q => { const n = Math.min(6, operands(q.question)); dist[n] = (dist[n] || 0) + 1; });
  const thin = l4.filter(q => operands(q.question) <= 2);
  console.log('\n' + pack + ' — ' + l4.length + ' items at L4');
  Object.keys(dist).map(Number).sort((a, b) => a - b).forEach(k => {
    console.log('   ' + (k >= 6 ? '6+' : ' ' + k) + ' operands: ' + String(dist[k]).padStart(4) + '  ' + '#'.repeat(Math.min(60, dist[k])));
  });
  console.log('   ' + thin.length + ' of ' + l4.length + ' L4 items carry two numbers or fewer' +
    (thin.length ? ' — CANDIDATES:' : ''));
  thin.slice(0, 5).forEach(q => console.log('      ' + q.id.padEnd(18) + strip(q.question).slice(0, 84)));
  if (thin.length > 5) console.log('      … and ' + (thin.length - 5) + ' more');
}

console.log('\n' + (anyCandidates
  ? anyCandidates + ' candidate(s) to look at. These are prompts for judgement, not failures.'
  : 'no retrieval-stem candidates flagged.'));
console.log('This script never fails a build: whether a question demands reasoning is a');
console.log('reading, and a script can only count what someone has already asserted.');
