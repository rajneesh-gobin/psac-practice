'use strict';
// The exam-mode comprehension block: one passage, five MCQ then five short
// answers, kept together and kept in order.
//
// WHY THIS EXISTS
// A real MES/PSAC paper opens with ONE reading text and asks several questions
// about it. assembleExamPaper() had no idea a passage existed: it dealt the
// questions singly and then sorted the whole paper by difficulty, so five
// questions on one 400-word text landed at five different points in the paper,
// each carrying its own copy of that text. A child sat the same passage five
// times.
//
// ⚠ THE PROMISE IS EXACTLY 5 AND 5. A block dealt short - because one of the
//   ten was filtered out by a difficulty cap, or a batch wrote nine - is worse
//   than no block, so an incomplete passage is skipped entirely. That is the
//   single most important thing here and most of the cases below are about it.
//
// ⚠ It runs the REAL assembleExamPaper over a SYNTHETIC pack. A synthetic pack
//   is deliberate: this must keep working before the authored passages land and
//   after they change, and a test that reads the live bank would be measuring
//   the content rather than the rule. test-exam-paper-shape.js covers the real
//   packs and their proportions.
//
// ⚠ helpers.js and questions_engine.js declare their globals with const/let, so
//   they must be run as ONE script - separate vm.runInContext() calls do not
//   share lexical bindings the way <script> tags do.
//
//   node scripts/test-comprehension-block.js

const fs = require('fs');
const vm = require('vm');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const RUNS = 60;

let pass = 0, fail = 0;
const ok  = m => { pass++; console.log('  ok   ' + m); };
const bad = (m, d) => { fail++; console.log('  FAIL ' + m + (d ? '  -> ' + d : '')); };
const ck  = (cond, m, d) => cond ? ok(m) : bad(m, d);
const section = t => console.log('\n— ' + t + ' —');

const SLOTS = ['m1', 'm2', 'm3', 'm4', 'm5', 'o1', 'o2', 'o3', 'o4', 'o5'];

// ── a synthetic pack ──────────────────────────────────────────────────────
// `passages` describes what to build: [{ n, chapter, slots, difficulty }]
function build({ passages, chapters, restrictions }) {
  const qs = [];
  for (const p of passages) {
    for (const slot of (p.slots || SLOTS)) {
      const isMcq = slot[0] === 'm';
      const id = `${p.chapter}-rcp-${String(p.n).padStart(3, '0')}-${slot}`;
      qs.push(isMcq
        ? { id, chapterId: p.chapter, difficulty: p.difficulty || 2, type: 'mcq',
            question: 'PASSAGE ' + p.n + ' — question ' + slot,
            options: ['a', 'b', 'c', 'd'], answer: 'a' }
        : { id, chapterId: p.chapter, difficulty: p.difficulty || 2, type: 'text',
            question: 'PASSAGE ' + p.n + ' — question ' + slot,
            answer: 'x', acceptableAnswers: ['x'] });
    }
  }
  // Filler so the other chapters can always meet their slots.
  // ⚠ SOME OF IT IS IN FAMILIES, DELIBERATELY. spaceFamilies() returns its input
  //   untouched when every question is its own bucket (`buckets.size ===
  //   src.length`), so in a pack with no `-fam-` ids it is a no-op — and a
  //   mutation that sent the block through it was measured as UNDETECTED for
  //   exactly that reason. Real family filler makes the interleave actually run,
  //   which is the only way "the block is exempt from it" can be tested.
  for (const ch of chapters) {
    if (ch.filler === 0) continue;
    for (let i = 0; i < (ch.filler || 40); i++) {
      const fam = i % 5 < 3;   // three of every five sit in a family of three
      const id = fam
        ? ch.id + '-fam-' + String(Math.floor(i / 5)).padStart(3, '0') + '-' + 'abc'[i % 5]
        : ch.id + '-f' + String(i).padStart(3, '0');
      qs.push({ id, chapterId: ch.id,
        difficulty: (i % 4) + 1, type: 'mcq',
        question: 'filler ' + ch.id + ' ' + i, options: ['a', 'b', 'c', 'd'], answer: 'a' });
    }
  }
  const src = ['engine/helpers.js', 'engine/questions_engine.js']
    .map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n');
  const ctx = {
    console: { log() {}, warn() {}, error() {} }, Math, JSON, Date,
    __QS: qs, __CH: chapters, __RUNS: RUNS, __OUT: null,
    DB: { restrictions: restrictions || {} },
    PSAC_PDF_QUESTIONS: [], SUBJECT_PACKS: {},
    registerSubject() {}, registerHelp() {},
  };
  ctx.window = ctx; ctx.globalThis = ctx;
  vm.createContext(ctx);
  vm.runInContext('var CHAPTERS = [];\n' + src + `
;
STATIC_QUESTIONS.length = 0;
for (const q of __QS) STATIC_QUESTIONS.push(q);
CHAPTERS.length = 0;
for (const c of __CH) CHAPTERS.push(c);
__OUT = { papers: {}, passageOf: {} };
for (const q of STATIC_QUESTIONS) { const p = _passageOf(q); if (p) __OUT.passageOf[q.id] = p; }
for (const type of ['full', 'short', 'drill']) {
  __OUT.papers[type] = [];
  for (let r = 0; r < __RUNS; r++) {
    __OUT.papers[type].push(assembleExamPaper(type).questions.map(q =>
      ({ id: q.id, ch: q.chapterId, type: q.type, d: q.difficulty })));
  }
}
`, ctx, { filename: 'synthetic' });
  return ctx.__OUT;
}

const COMP = { id: 'comp', name: 'Comprehension', examWeight: 5 };
const OTHERS = [
  { id: 'gram', name: 'Grammar', examWeight: 5 },
  { id: 'writ', name: 'Writing', examWeight: 5 },
  { id: 'voc',  name: 'Vocabulary', examWeight: 5 },
];
const passageOf = id => (/^(.+-rcp-\d{3})-[mo][1-5]$/.exec(id) || [])[1] || null;

// ── 1 · the happy path ────────────────────────────────────────────────────
section('a full paper opens with one complete block');
let out = build({
  chapters: [COMP, ...OTHERS],
  passages: [{ n: 1, chapter: 'comp' }, { n: 2, chapter: 'comp' }, { n: 3, chapter: 'comp' }],
});

const fulls = out.papers.full;
ck(fulls.every(p => p.length === 40), 'every full paper is still exactly 40 questions',
  'sizes: ' + [...new Set(fulls.map(p => p.length))].join(','));

const heads = fulls.map(p => p.slice(0, 10));
ck(heads.every(h => h.every(q => passageOf(q.id))), 'the first ten questions are all passage questions');
ck(heads.every(h => new Set(h.map(q => passageOf(q.id))).size === 1),
  'all ten come from ONE passage');
ck(heads.every(h => h.map(q => q.id.slice(-2)).join(',') === SLOTS.join(',')),
  'they are in authored order: m1..m5 then o1..o5',
  'saw ' + heads[0].map(q => q.id.slice(-2)).join(','));
ck(heads.every(h => h.filter(q => q.type === 'mcq').length === 5),
  'exactly five are multiple choice');
ck(heads.every(h => h.filter(q => q.type === 'text').length === 5),
  'exactly five are short answers');
ck(heads.every(h => h.slice(0, 5).every(q => q.type === 'mcq')),
  'the five MCQs come first, before the short answers');

// The block replaces its chapter's ordinary slots rather than adding to them.
ck(fulls.every(p => p.slice(10).every(q => q.ch !== 'comp')),
  'the comprehension chapter contributes the block and nothing else');

// ⚠ THE OTHER 30 MUST BE BUILT AS 30, not built as 40 and trimmed. Both give a
//   paper of exactly 40, so length alone cannot tell them apart - which is why
//   a mutation dropping the `- BLOCK_SIZE` went undetected at first. The tell is
//   WHAT the trim removes: `rest` is ordered easiest-first, so slicing ten off
//   the end eats the hardest questions and starves the last chapters.
// ⚠ AGGREGATED, not `every`. Which questions a paper happens to draw is random,
//   so "every paper has a hard one" is flaky. The signal is the rate: building
//   40 and trimming to 30 eats the tail of a difficulty-ascending list, so the
//   hardest band all but disappears.
{
  const withHard = fulls.filter(p => p.slice(10).some(q => q.d === 4)).length;
  ck(withHard >= fulls.length * 0.8,
    'the hardest questions survive alongside the block',
    withHard + '/' + fulls.length + ' papers had a difficulty-4 question; building 40 '
      + 'and trimming to 30 would strip them');
}
{
  const per = fulls.map(p => {
    const c = {};
    for (const q of p.slice(10)) c[q.ch] = (c[q.ch] || 0) + 1;
    return c;
  });
  const others = OTHERS.map(o => o.id);
  ck(per.every(c => others.every(id => (c[id] || 0) >= 8)),
    'each remaining chapter still gets its share of the 30',
    'saw ' + JSON.stringify(per[0]));
}
ck(fulls.every(p => p.slice(10).length === 30), 'exactly 30 questions follow the block');
ck(fulls.every(p => new Set(p.map(q => q.id)).size === p.length),
  'no question appears twice in a paper');
// More than one passage exists, so the choice must vary.
ck(new Set(fulls.map(p => passageOf(p[0].id))).size > 1,
  'the passage varies between papers rather than always being the first');

// ── 1b · a thin pack, where family spacing actually has work to do ────────
// ⚠ WHY THIS CASE EXISTS. In a well-stocked pack spaceFamilies() is a no-op on
//   the finished paper: pickSpreadingFamilies() has already ensured one variant
//   per family, so every bucket is size 1 and it returns its input untouched.
//   A mutation that pushed the block through it was therefore UNDETECTABLE, and
//   correctly so. But the assembler deliberately spends a second variant rather
//   than hand back a short paper, so a THIN pack does produce repeats - and
//   there spaceFamilies() interleaves for real and would scatter the block.
//   This is the only shape in which "the block is exempt" can be measured.
{
  const thin = OTHERS.map(o => Object.assign({}, o, { filler: 12 }));
  const o = build({ chapters: [COMP, ...thin], passages: [{ n: 1, chapter: 'comp' }] });
  const ps = o.papers.full;
  const repeated = ps.filter(p => {
    const fams = p.slice(10).map(q => (/^(.+-[a-z]{0,3}fam-\d+)-[a-z]{1,2}$/.exec(q.id) || [])[1]).filter(Boolean);
    return new Set(fams).size < fams.length;
  }).length;
  ck(repeated > 0, 'the thin pack really does force repeated family variants',
    'without a repeat this case measures nothing');
  ck(ps.every(p => p.slice(0, 10).every(q => passageOf(q.id))),
    'the block still leads when family spacing has work to do');
  ck(ps.every(p => p.slice(0, 10).map(q => q.id.slice(-2)).join(',') === SLOTS.join(',')),
    'and it is still in authored order after spacing runs');
}

// ── 2 · the smaller papers are untouched ──────────────────────────────────
section('short and drill papers keep dealing singly');
ck(out.papers.short.every(p => p.length === 25), 'a short paper is still exactly 25');
ck(out.papers.drill.every(p => p.length === 15), 'a drill paper is still exactly 15');
const opensWithBlock = p => p.slice(0, 10).every(q => passageOf(q.id))
  && new Set(p.slice(0, 10).map(q => passageOf(q.id))).size === 1;
ck(!out.papers.short.some(opensWithBlock), 'a short paper does not open with a block');
ck(!out.papers.drill.some(opensWithBlock), 'a drill paper does not open with a block');

// ── 3 · an incomplete passage is never dealt ──────────────────────────────
section('a passage that cannot fill 5 and 5 is skipped, not dealt short');
for (const [label, slots] of [
  ['missing one short answer', SLOTS.filter(s => s !== 'o5')],
  ['missing one MCQ',          SLOTS.filter(s => s !== 'm3')],
  ['only the five MCQs',       SLOTS.filter(s => s[0] === 'm')],
  ['only the five answers',    SLOTS.filter(s => s[0] === 'o')],
]) {
  const o = build({ chapters: [COMP, ...OTHERS], passages: [{ n: 1, chapter: 'comp', slots }] });
  ck(o.papers.full.every(p => p.length === 40), label + ': the paper is still 40');
  ck(!o.papers.full.some(opensWithBlock), label + ': no block is dealt');
}

// With one broken and one whole passage, the whole one must still be found.
{
  const o = build({ chapters: [COMP, ...OTHERS], passages: [
    { n: 1, chapter: 'comp', slots: SLOTS.filter(s => s !== 'o5') },
    { n: 2, chapter: 'comp' },
  ] });
  ck(o.papers.full.every(opensWithBlock), 'a broken passage does not hide a good one');
  ck(o.papers.full.every(p => passageOf(p[0].id) === 'comp-rcp-002'),
    'and the good one is the one dealt');
}

// ── 4 · the restrictions still hold ───────────────────────────────────────
section('a parent restriction disqualifies a block, it does not shrink it');
{
  // One question of the passage sits above the cap, so the whole block goes.
  const o = build({
    chapters: [COMP, ...OTHERS],
    passages: [{ n: 1, chapter: 'comp', difficulty: 4 }],
    restrictions: { maxDifficulty: 3 },
  });
  ck(o.papers.full.every(p => p.length === 40), 'difficulty cap: the paper is still 40');
  ck(!o.papers.full.some(opensWithBlock), 'difficulty cap: the over-cap block is not dealt');
  ck(o.papers.full.every(p => p.every(q => q.d <= 3)), 'difficulty cap: nothing above the cap slips in');
}
{
  const o = build({
    chapters: [COMP, ...OTHERS],
    passages: [{ n: 1, chapter: 'comp' }],
    restrictions: { lockedChapters: ['comp'] },
  });
  ck(o.papers.full.every(p => p.length === 40), 'locked chapter: the paper is still 40');
  ck(o.papers.full.every(p => p.every(q => q.ch !== 'comp')),
    'locked chapter: no question from it, block or otherwise');
}

// ── 5 · the degenerate pack ───────────────────────────────────────────────
section('a pack whose only chapter is the comprehension one');
{
  const o = build({ chapters: [COMP], passages: [{ n: 1, chapter: 'comp' }] });
  const p = o.papers.full[0];
  ck(p.length === 10, 'the block IS the paper rather than an empty one', 'got ' + p.length);
  ck(p.map(q => q.id.slice(-2)).join(',') === SLOTS.join(','), 'and it is still in order');
}

// ── 6 · _passageOf only matches its own namespace ─────────────────────────
section('the reserved namespace');
{
  const o = build({ chapters: [COMP, ...OTHERS], passages: [{ n: 1, chapter: 'comp' }] });
  ck(Object.keys(o.passageOf).length === 10, 'exactly the ten block ids are recognised');
  ck(Object.values(o.passageOf).every(v => v === 'comp-rcp-001'), 'and they all resolve to one passage');
}
// Nothing already in the corpus may collide with -rcp-.
{
  const dirs = fs.readdirSync(path.join(ROOT, 'subjects'));
  let collisions = [];
  for (const d of dirs) {
    const qd = path.join(ROOT, 'subjects', d, 'questions');
    if (!fs.existsSync(qd)) continue;
    for (const f of fs.readdirSync(qd)) {
      const src = fs.readFileSync(path.join(qd, f), 'utf8');
      for (const m of src.matchAll(/id\s*:\s*'([^']*-rcp-[^']*)'/g)) {
        if (!/-rcp-\d{3}-[mo][1-5]$/.test(m[1])) collisions.push(d + '/' + f + ': ' + m[1]);
      }
    }
  }
  ck(collisions.length === 0, 'no id uses -rcp- for anything but a passage block',
    collisions.slice(0, 5).join('; '));
}

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exitCode = fail ? 1 : 0;
