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
