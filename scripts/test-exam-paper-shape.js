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

// Which chapters opened a full paper with a complete comprehension block?
// ⚠ DERIVED FROM WHAT WAS DEALT, never a hard-coded list of packs. A list would
//   have to be edited every time a pack gains or loses passages, and the day it
//   was not, this file would go back to reporting drift that is not there - or,
//   worse, stop noticing drift that is.
// ⚠ It requires the real shape (ten questions, one passage, five -m then five
//   -o, at the head of the paper), so a chapter that merely holds -rcp- ids does
//   not qualify and is still held to its mark map.
const RCP = /^(.+-rcp-\d{3})-([mo])([1-5])$/;
function blockChapters(out) {
  const found = new Set();
  for (const paper of out.papers.full) {
    const head = paper.slice(0, 10);
    if (head.length < 10) continue;
    const parts = head.map(q => RCP.exec(q.id));
    if (!parts.every(Boolean)) continue;
    if (new Set(parts.map(p => p[1])).size !== 1) continue;
    if (parts.map(p => p[2] + p[3]).join(',') !== 'm1,m2,m3,m4,m5,o1,o2,o3,o4,o5') continue;
    found.add(head[0].ch);
  }
  return found;
}

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
// ⚠ THE BAND SCALES WITH THE PAPER. When a comprehension block takes ten of the
//   forty slots, the other chapters share 30, one question becomes 3.33 points
//   instead of 2.5, and every rounding difference is amplified by 40/30. Holding
//   the same 4 points would fail on arithmetic rather than on content: measured,
//   grade5-english eng-adjectives carries weight 2 against 2.0% of the real
//   paper's marks — a pre-existing mismatch worth 3.0 points in a 40-question
//   paper, which becomes 4.9 in a 30-question one without anything changing
//   about the pack. The band is widened in exactly that ratio and no further,
//   so a real distribution error is still caught.
const bandFor = target => BAND * (SIZES.full / target);

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

  // ⚠ THE BLOCK CHAPTER IS OUT OF THIS COMPARISON, AND THAT IS A DELIBERATE
  //   PRODUCT CHOICE, NOT A ROUNDING ALLOWANCE. A full paper spends ten of its
  //   forty questions on one reading passage, which is 25% - measured against
  //   the real papers, comprehension earns 13.7% of the marks in Grade 5
  //   English, 15.6% in Grade 5 French, 18.0% in Grade 6 English and 20.0% in
  //   Grade 6 French. So the block over-weights comprehension by 5 to 11 points
  //   against the exam it is modelled on. That is the cost of a whole passage
  //   being worth reading at all: five scattered questions on a 420-word text
  //   is the shape this replaced, and it made a child read the text five times.
  //   ⚠ The exemption is scoped to the block chapter in FULL papers only. Short
  //   and drill papers carry no block, every other chapter is still held to the
  //   mark map, and the block's own size is pinned to exactly 10 by the
  //   anti-drift cap below - so nothing here is merely unchecked.
  // ⚠ RENORMALISED WHEN A BLOCK IS PRESENT. Ten of forty questions are spent on
  //   one passage, so the other chapters share 30 slots, not 40, and NO
  //   distribution of those 30 can match a share measured against a whole paper
  //   - a chapter the real paper gives 23.5% can reach 17.6% at best. Comparing
  //   against the un-shrunk share would report a failure that no content or
  //   weighting could ever fix. So both sides are taken as a share of the
  //   NON-BLOCK part: the question this asks is "are the remaining 30 dealt in
  //   the paper's proportions", which is the honest one, and it is still a real
  //   check - it would catch exactly the gutting measured a moment ago.
  const blocks = blockChapters(out);
  const mapped = Object.keys(spec.marks).filter(id => !blocks.has(id));
  const totNB = mapped.reduce((s, id) => s + spec.marks[id], 0);
  const nNB = mapped.reduce((s, id) => s + (tally[id] || 0), 0);
  const worst = mapped
    .map(id => ({
      id,
      want: 100 * spec.marks[id] / (blocks.size ? totNB : tot),
      got: 100 * (tally[id] || 0) / (blocks.size ? (nNB || 1) : n),
    }))
    .map(r => ({ ...r, drift: Math.abs(r.got - r.want) }))
    .sort((a, b) => b.drift - a.drift)[0];
  for (const id of blocks) {
    const got = 100 * (tally[id] || 0) / n;
    note(`${pack}: ${id} carries the comprehension block — ${got.toFixed(1)}% of the paper `
       + `against ${spec.marks[id] !== undefined ? (100 * spec.marks[id] / tot).toFixed(1) + '%' : 'no mark map'} in the real paper`);
  }
  if (!worst) { ok(`${pack}: every mapped chapter is the block chapter`); continue; }

  const line = `${pack}: worst chapter ${worst.id} dealt ${worst.got.toFixed(1)}%, paper gives ${worst.want.toFixed(1)}%`;
  const band = bandFor(SIZES.full - (blocks.size ? 10 : 0));
  if (worst.drift <= band) ok(line); else bad(line + ` — ${worst.drift.toFixed(1)} points off (band ${band.toFixed(1)})`);
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
  // ⚠ Mirrors assembleExamPaper: an EXPLICIT examWeight of 0 buys NO slot, while
  //   a MISSING one still defaults to 1. Before that changed, g9eng-listening and
  //   g9eng-speaking (weight 0, two poolable items each) each bought a slot, the
  //   paper was built from 42 slots, and reconciliation took both back off the
  //   first chapter with n > 1 - g9eng-reading, the pack's highest-weighted
  //   chapter - dropping it from 10 to 8. No amount of new content could fix it.
  let live = out.chapters
    .filter(c => !dead.has(c.id))
    .filter(c => !(Number.isFinite(c.w) && c.w <= 0))
    .map(c => ({ ...c, want: c.n, got: c.n }));
  if (!live.length) continue;

  // The engine's own reconciliation, mirrored.
  // ⚠ A comprehension block reserves ten slots and its chapter drops out of the
  //   weighting entirely, so the rest of the paper is built to 30, not 40. The
  //   model has to do the same or it measures a paper the engine never builds.
  const blocked = blockChapters(out);
  live = live.filter(c => !blocked.has(c.id));
  const fullTarget = SIZES.full - (blocked.size ? 10 : 0);
  // ⚠ The engine scales each weight to `target / 40`, not to cfg.count / 40, so
  //   the model must too. Re-derive `got` and `want` at that scale.
  for (const c of live) {
    c.want = Math.max(1, Math.round((Number.isFinite(c.w) ? c.w : 1) * fullTarget / 40));
    c.got = c.want;
  }
  // ⚠ LARGEST REMAINDER, mirroring the engine exactly. Round-robin top-up and
  //   first-above-1 reduction were both here and both are wrong; see the comment
  //   on the same loop in engine/questions_engine.js.
  const idealOf = c => (Number.isFinite(c.w) ? c.w : 1) * fullTarget / 40;
  let total = live.reduce((s, c) => s + c.got, 0);
  while (total < fullTarget) {
    let k = 0;
    for (let j = 1; j < live.length; j++) {
      if (idealOf(live[j]) - live[j].got > idealOf(live[k]) - live[k].got) k = j;
    }
    live[k].got++; total++;
  }
  while (total > fullTarget) {
    let k = -1;
    for (let j = 0; j < live.length; j++) {
      if (live[j].got <= 1) continue;
      if (k === -1 || (live[j].got - idealOf(live[j])) > (live[k].got - idealOf(live[k]))) k = j;
    }
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
  // ⚠ A COMPREHENSION BLOCK IS AN EXCEPTION THE MODEL HAS TO KNOW ABOUT.
  //   A full paper opens with one passage and its ten questions (five MCQ, five
  //   short answers), and that block REPLACES its chapter's weighted slots
  //   instead of adding to them - so the chapter deals exactly BLOCK_SIZE, which
  //   is almost always more than its weight allows. Left unmodelled this fired
  //   as "the model has DRIFTED" on eight packs at once, which is the anti-drift
  //   check doing its job: the model really had stopped matching the engine.
  //   The cap is raised only for a chapter that HAS a complete block, and only
  //   to exactly 10 - never to "whatever it dealt", which would silence it.
  const BLOCK_SIZE = 10;
  const cap = {};
  for (const c of live) cap[c.id] = c.got;
  for (const ch of blockChapters(out)) cap[ch] = Math.max(cap[ch] || 0, BLOCK_SIZE);
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
    if (Number.isFinite(c.w) && c.w <= 0) continue;   // buys no slot, so it cannot repeat

    const exams = Math.floor(c.pool / c.n);
    if (exams < 10) { note(`${pack} ${c.id}: ${c.pool} items at ${c.n} a paper — repeats after ${exams} exams`); thin++; }
  }
}
if (!thin) note('none');

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
