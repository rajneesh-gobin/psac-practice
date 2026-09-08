'use strict';
// Does a "40-question exam" actually deal 40 questions, and does each pack deal
// them in the proportions its real PSAC paper uses?
//
// WHY THIS EXISTS
// assembleExamPaper() gives every registered chapter at least one slot
// (Math.max(1, …)), and that slot comes out of the paper whether or not the
// chapter can fill it. The three French packs each hold a Textes à Trous
// chapter whose items are all type 'cloze', which isPoolQuestion() excludes
// from every pool — so a full exam silently dealt 39 questions in grades 5 and
// 6, and 37 in grade 4, for as long as those chapters have existed. Nothing in
// the UI said so; the paper simply ended early.
//
// The targets come from scripts/exam-mark-maps.json, which records the marks
// each real paper gives each chapter, counted question by question. The same
// file generated the examWeight comment blocks in the manifests, so the two
// cannot drift.
//
// ⚠ The engine files declare their globals with const/let, so helpers.js,
//   questions_engine.js and the manifest must be run as ONE script. Separate
//   vm.runInContext() calls do not share lexical bindings the way separate
//   <script> tags do — do it the other way and getStaticQs() filters an empty
//   STATIC_QUESTIONS, every paper comes back empty, and the suite passes
//   nothing while reporting success.
//
//   node scripts/test-exam-paper-shape.js

const fs = require('fs');
const vm = require('vm');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BUNDLES = path.join(ROOT, 'netlify', 'question-bundles');
const MARK_MAPS = require('./exam-mark-maps.json');
const RUNS = 120;

let pass = 0, fail = 0;
const ok = m => { pass++; console.log('  ok   ' + m); };
const bad = m => { fail++; console.log('  FAIL ' + m); };
const note = m => console.log('  note ' + m);

// Only packs a child can actually sit an exam in.
// ⚠ LIVE PACKS COME FROM THE GENERATED INDEX, NOT FROM A HARD-CODED GRADE
//   LIST AND NOT FROM MANIFEST SOURCE TEXT. A [4, 5, 6] list silently skipped
//   grade9-maths the day it went live - this suite reported all-green while
//   ignoring the pack that had just been enabled. And grepping the manifests
//   for /comingSoon:\s*false/ matches the comment every placeholder pack
//   carries ("5. Set comingSoon: false."), which reports all 30 of them live.
//   `subjects/_index.js` is generated, holds real JSON values, and check.js
//   already fails if it drifts from the manifests.
const LIVE = (function () {
  const idx = fs.readFileSync(path.join(ROOT, 'subjects', '_index.js'), 'utf8');
  const out = [];
  const re = /"id":"(grade\d-[a-z-]+)"([\s\S]{0,400}?)"comingSoon":(true|false)/g;
  let m;
  while ((m = re.exec(idx))) if (m[3] === 'false') out.push(m[1]);
  return out.sort();
})();

function runPack(pack) {
  const bundleFile = path.join(BUNDLES, pack + '.json');
  if (!fs.existsSync(bundleFile)) return null;

  const src = ['engine/helpers.js', 'engine/questions_engine.js', `subjects/${pack}/_manifest.js`]
    .map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n');

  const ctx = {
    console: { log() {}, warn() {}, error() {} }, Math, JSON, Date,
    __PACK: pack, __RUNS: RUNS, __OUT: null,
    __BUNDLE: JSON.parse(fs.readFileSync(bundleFile, 'utf8')),
    PSAC_PDF_QUESTIONS: [], SUBJECT_PACKS: {}, DB: { restrictions: {} },
    registerSubject(p) { ctx.SUBJECT_PACKS[p.id] = p; },
    registerHelp() {},
  };
  ctx.window = ctx; ctx.globalThis = ctx;
  vm.createContext(ctx);

  vm.runInContext('var CHAPTERS = [];\n' + src + `
;
STATIC_QUESTIONS.length = 0;
for (const q of __BUNDLE) STATIC_QUESTIONS.push(q);
CHAPTERS.length = 0;
for (const c of SUBJECT_PACKS[__PACK].chapters) CHAPTERS.push(c);
let __gens = {};
try { if (typeof packGenerators === 'function') __gens = packGenerators() || {}; } catch (e) {}
__OUT = {
  chapters: CHAPTERS.map(c => ({
    id: c.id,
    w: c.examWeight,
    n: Math.max(1, Math.round(Number.isFinite(c.examWeight) ? c.examWeight : 1)),
    pool: STATIC_QUESTIONS.filter(q => isPoolQuestion(q) && q.chapterId === c.id).length,
  })),
  dead: CHAPTERS.filter(c => !__gens[c.id] &&
    !STATIC_QUESTIONS.some(q => isPoolQuestion(q) && q.chapterId === c.id))
    .map(c => c.id),
  papers: {},
};
for (const type of ['full', 'short', 'drill']) {
  __OUT.papers[type] = [];
  for (let r = 0; r < __RUNS; r++) {
    const p = assembleExamPaper(type);
    __OUT.papers[type].push(p.questions.map(q => ({ id: q.id, ch: q.chapterId })));
  }
}
`, ctx, { filename: pack });

  return ctx.__OUT;
}

const SIZES = { full: 40, short: 25, drill: 15 };
const results = {};

console.log('\nEvery live pack deals a whole paper');
for (const pack of LIVE) {
  const out = runPack(pack);
  if (!out) { bad(`${pack}: no built bundle — run node netlify/build-questions.js first`); continue; }
  results[pack] = out;

  let worstShort = null, dupes = 0;
  for (const [type, want] of Object.entries(SIZES)) {
    for (const paper of out.papers[type]) {
      if (paper.length !== want && (!worstShort || paper.length < worstShort.n))
        worstShort = { type, n: paper.length, want };
      if (new Set(paper.map(q => q.id)).size !== paper.length) dupes++;
    }
  }
  if (worstShort) bad(`${pack}: a ${worstShort.type} exam dealt ${worstShort.n} of ${worstShort.want} questions`);
  else ok(`${pack}: 40 / 25 / 15 questions, every time over ${RUNS} papers each`);
  if (dupes) bad(`${pack}: ${dupes} papers repeated a question inside one paper`);

  // Not a failure: a chapter can legitimately hold only cloze items. It must
  // simply not cost the paper a question, which the check above enforces.
  if (out.dead.length) note(`${pack}: ${out.dead.join(', ')} can supply no exam question (excluded, not charged)`);
}

// A chapter's delivered share is an integer number of slots out of 40, so one
// whole question is 2.5 points. 4 points is the tightest band that does not
// fail on rounding alone once a pack carries more than a dozen chapters.
const BAND = 4;

console.log('\nEach weighted pack follows its own paper\'s mark allocation');
for (const [pack, spec] of Object.entries(MARK_MAPS)) {
  const out = results[pack] || runPack(pack);
  if (!out) { bad(`${pack}: no built bundle`); continue; }

  const tot = Object.values(spec.marks).reduce((a, b) => a + b, 0);
  const tally = {}; let n = 0;
  for (const paper of out.papers.full) for (const q of paper) { tally[q.ch] = (tally[q.ch] || 0) + 1; n++; }

  const unmapped = [...new Set(out.papers.full.flat().map(q => q.ch))]
    .filter(id => !(id in spec.marks) && !(id in spec.floor));
  if (unmapped.length) { bad(`${pack}: chapter in no mark map: ${unmapped.join(', ')}`); continue; }

  const worst = Object.keys(spec.marks)
    .map(id => ({ id, want: 100 * spec.marks[id] / tot, got: 100 * (tally[id] || 0) / n }))
    .map(r => ({ ...r, drift: Math.abs(r.got - r.want) }))
    .sort((a, b) => b.drift - a.drift)[0];

  const line = `${pack}: worst chapter ${worst.id} dealt ${worst.got.toFixed(1)}%, paper gives ${worst.want.toFixed(1)}%`;
  if (worst.drift <= BAND) ok(line); else bad(line + ` — ${worst.drift.toFixed(1)} points off`);
}

// ── No chapter is gutted by the reconciliation loop ─────────────────────────
//
// WHY THIS EXISTS
// The checks above ask whether a paper TOTALS 40. They do not ask how it got
// there, and that is where a real defect hid. assembleExamPaper() gives each
// chapter `n = max(1, round(weight * count / 40))`, then forces the total:
//
//     while (total > cfg.count) {
//       const i = weights.findIndex(w => w.n > 1);
//       weights[i].n--; total--;
//     }
//
// `findIndex` always returns the FIRST chapter still above 1, so a pack whose
// weights sum above 40 is corrected by walking down from the TOP OF ITS OWN
// CHAPTER LIST rather than proportionally. Measured on grade9-maths 2026-09-08:
// its weights were the paper's marks HALVED (×0.5) instead of ×0.4, summing to
// 52, so twelve questions had to go — and `g9m-number-revision`, the heaviest
// chapter at weight 8 and the reason the chapter exists at all (~30 of the
// paper's 100 marks are Grade 7-8 arithmetic), was dealt ONE question per exam
// instead of eight. Finance lost 2 of 3, geometry-revision 2 of 4. Everything
// from `g9m-trigonometry` down got exactly its weight.
//
// The pack was LIVE, and every check above passed the whole time: the paper
// really did total 40. Only the distribution was wrong.
//
// ⚠ A loss of 1 is tolerated. Integer weights cannot always hit 40 exactly and
//   one question is 2.5% of a paper; a loss of 2+ means the weights are wrong,
//   not rounded.
// ⚠ Chapters that cannot fill a slot are excluded FIRST by canFill(), exactly as
//   the engine does — `out.dead`. Counting them here invents phantom losses:
//   doing it without that filter reported grade5-french and grade6-french as
//   losing 2 questions each, when their zero-weight cloze chapters never reach
//   the weighting at all.
console.log('\nNo chapter loses more than one question to reconciliation');
const MAX_LOSS = 1;
for (const [pack, out] of Object.entries(results)) {
  const dead = new Set(out.dead);
  const live = out.chapters.filter(c => !dead.has(c.id)).map(c => ({ ...c, want: c.n, got: c.n }));
  if (!live.length) continue;

  // The engine's own reconciliation, mirrored.
  let total = live.reduce((s, c) => s + c.got, 0);
  let i = 0;
  while (total < SIZES.full) { live[i % live.length].got++; total++; i++; }
  while (total > SIZES.full) {
    const k = live.findIndex(c => c.got > 1);
    if (k === -1) break;
    live[k].got--; total--;
  }

  const losses = live.map(c => ({ id: c.id, w: c.w, want: c.want, got: c.got, lost: c.want - c.got }))
    .filter(c => c.lost > MAX_LOSS)
    .sort((a, b) => b.lost - a.lost);

  const wSum = live.reduce((s, c) => s + (Number.isFinite(c.w) ? c.w : 1), 0);
  if (losses.length) {
    const w = losses[0];
    bad(`${pack}: weights sum to ${wSum}, so reconciliation guts ${w.id} — weight ${w.w} wants ` +
        `${w.want} questions, gets ${w.got}` +
        (losses.length > 1 ? ` (and ${losses.length - 1} more chapter(s) lose 2+)` : ''));
  } else {
    ok(`${pack}: weights sum to ${wSum} over ${live.length} chapters, every chapter within ${MAX_LOSS} of its weight`);
  }

  // ⚠ ANTI-DRIFT. The block above re-implements engine logic, so it can rot
  //   silently and then pass forever. Check it against what was actually dealt:
  //   a chapter may deal FEWER than its slots (a thin pool cannot fill them),
  //   but it must never deal MORE. If it does, this model no longer matches
  //   assembleExamPaper() and every result in this section is worthless.
  const cap = {};
  for (const c of live) cap[c.id] = c.got;
  let overflow = null;
  for (const paper of out.papers.full) {
    const tally = {};
    for (const q of paper) tally[q.ch] = (tally[q.ch] || 0) + 1;
    for (const [ch, got] of Object.entries(tally)) {
      if (cap[ch] === undefined) continue;
      if (got > cap[ch] && (!overflow || got - cap[ch] > overflow.by))
        overflow = { ch, got, cap: cap[ch], by: got - cap[ch] };
    }
  }
  if (overflow) {
    bad(`${pack}: this test's model of assembleExamPaper has DRIFTED — ${overflow.ch} was dealt ` +
        `${overflow.got} questions but the model allows at most ${overflow.cap}`);
  }
}

console.log('\nPools thin enough to repeat inside ten exams');
let thin = 0;
for (const [pack, out] of Object.entries(results)) {
  for (const c of out.chapters) {
    if (!c.pool) continue;
    const exams = Math.floor(c.pool / c.n);
    if (exams < 10) { note(`${pack} ${c.id}: ${c.pool} items at ${c.n} a paper — repeats after ${exams} exams`); thin++; }
  }
}
if (!thin) note('none');

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
