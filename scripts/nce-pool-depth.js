'use strict';
// ── Which chapter will force a repeat, and why ────────────────────────────
//
//   node netlify/build-questions.js && node scripts/nce-pool-depth.js [subject] [papers]
//
// Four batches of content were written to stop generated papers repeating
// themselves, and every one of them found a DIFFERENT cause: too few large
// tasks, big tasks in the wrong chapters, one figure family serving four
// chapters, one family serving three FILES, and a chapter holding only figures
// at a size where the assembler wanted text. Each was found by hand, from a
// different ad-hoc script. This is that measurement made repeatable.
//
// ⚠ IT REPORTS WHERE TO WRITE, NOT HOW MANY TO WRITE. "20 items per subsection"
//   is a floor for coverage, not for variety, and it is the wrong shape for
//   this problem: `g9m-number-revision` carries weight 8 and supplies about
//   four questions to every paper, while `g9m-patterns` at weight 1 supplies
//   one every other paper. A uniform quota over-serves the light chapters and
//   starves the heavy ones.
//
// ⚠ WHAT COUNTS IS A MEMORABLE STIMULUS, NOT A TASK. A child remembers the
//   picture, the table or the story - not the question id. Two different tasks
//   drawing the same cuboid are ONE memorable stimulus, and that is true across
//   chapters and across files. Counting tasks says the bank is deep; counting
//   distinct stimuli says whether a paper can avoid looking familiar.
//
// The ratio to watch is  memorable draws / distinct memorable stimuli  per
// chapter. Above 1.0 the chapter cannot avoid repeating however many small
// questions it also holds.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const N = require(path.join(ROOT, 'engine', 'nce_paper.js'));

const subject = process.argv[2] || 'grade9-maths';
const nPapers = +(process.argv[3] || 5);

const bp = N.BLUEPRINTS[subject];
if (!bp) { console.error('No blueprint for "' + subject + '".'); process.exit(2); }

const bundle = path.join(ROOT, 'netlify', 'question-bundles', subject + '.json');
if (!fs.existsSync(bundle)) {
  console.error('Missing ' + bundle + '. Run: node netlify/build-questions.js');
  process.exit(2);
}
const raw = JSON.parse(fs.readFileSync(bundle, 'utf8'));
const all = Array.isArray(raw) ? raw : (raw[subject] || Object.values(raw).find(Array.isArray) || []);
const tasks = all.filter(q => q && q.type === 'task' && Array.isArray(q.parts) && q.parts.length);
if (!tasks.length) { console.error('No tasks in the built bundle for ' + subject + '.'); process.exit(2); }

const manifest = fs.readFileSync(path.join(ROOT, 'subjects', subject, '_manifest.js'), 'utf8');
const W = {};
for (const m of manifest.matchAll(/id:\s*['"]([a-z0-9-]+)['"][^\n]*examWeight:\s*(\d+)/g)) W[m[1]] = +m[2];

const marks = t => t.parts.reduce((a, p) => a + (p.marks || 0), 0);
const byId = new Map(tasks.map(t => [t.id, t]));

// ⚠ The key is the SHAPE a child would recognise, deliberately not the id:
//   a figure's alt text, a shared stimulus, or an extended task's story. Two
//   tasks whose figures describe the same thing collapse to one key, which is
//   the whole point - that collapse is what a uniform task count hides.
function memKey(t) {
  const s = t.stimulus && t.stimulus.html;
  if (s) return 'fig|' + (t.stimulus.altText || '').slice(0, 40);
  if (t.intro && t.intro.length > 60) return 'intro|' + t.intro.slice(0, 40);
  if (marks(t) >= 5) return 'ext|' + t.id;
  return null;
}

const recent = [];
const drawn = {}, memDrawn = {};
for (let i = 0; i < nPapers; i++) {
  const p = N.assemblePaper({ blueprint: bp, tasks, seed: 1 + i, chapterWeights: W, recentIds: recent });
  // The MCQ block is synthetic; sourceIds carry the real items it was built from.
  p.tasks.forEach(t => recent.push(...(t.sourceIds || [t.id])));
  for (const t of p.tasks) {
    for (const id of (t.sourceIds || [t.id])) {
      const real = byId.get(id);
      if (!real) continue;
      drawn[real.chapterId] = (drawn[real.chapterId] || 0) + 1;
      const k = memKey(real);
      if (!k) continue;
      memDrawn[real.chapterId] = memDrawn[real.chapterId] || new Map();
      memDrawn[real.chapterId].set(k, (memDrawn[real.chapterId].get(k) || 0) + 1);
    }
  }
}

console.log(subject + ': ' + tasks.length + ' tasks, ' + nPapers + ' papers\n');
console.log('chapter                       wt  drawn  pool  memPool  memDrawn  repeats  ratio');
const chs = [...new Set(tasks.map(t => t.chapterId))].sort((a, b) => (W[b] || 0) - (W[a] || 0));
const short = [];
let totalRepeats = 0;
for (const c of chs) {
  const pool = tasks.filter(t => t.chapterId === c).length;
  const memPool = new Set(tasks.filter(t => t.chapterId === c).map(memKey).filter(Boolean)).size;
  const d = drawn[c] || 0;
  const md = memDrawn[c] ? [...memDrawn[c].values()].reduce((a, b) => a + b, 0) : 0;
  const rep = memDrawn[c] ? [...memDrawn[c].values()].filter(v => v > 1).reduce((a, v) => a + v - 1, 0) : 0;
  totalRepeats += rep;
  const ratio = memPool ? md / memPool : (md ? Infinity : 0);
  if (ratio > 1) short.push({ c, memPool, md, need: Math.ceil(md - memPool) });
  console.log(c.padEnd(30) + String(W[c] || 0).padStart(3) + String(d).padStart(7)
    + String(pool).padStart(6) + String(memPool).padStart(9) + String(md).padStart(10)
    + String(rep).padStart(9) + '   ' + (memPool ? ratio.toFixed(2) : '-')
    + (ratio > 1 ? '  <- oversubscribed' : ''));
}

console.log('\n' + totalRepeats + ' memorable repeat(s) over ' + nPapers + ' papers');

// ── Which SHAPES are shared between chapters ──────────────────────────────
// ⚠ This is the cause that took two batches to find. A family used by three
//   chapters lets one paper draw it three times with every id looking fresh.
const owners = new Map();
tasks.forEach(t => {
  const k = memKey(t);
  if (!k || !k.startsWith('fig|')) return;
  if (!owners.has(k)) owners.set(k, new Set());
  owners.get(k).add(t.chapterId);
});
const shared = [...owners.entries()].filter(([, set]) => set.size > 1)
  .sort((a, b) => b[1].size - a[1].size);
if (shared.length) {
  console.log('\nfigure families drawn by MORE THAN ONE chapter:');
  shared.forEach(([k, set]) => console.log('  ' + set.size + '  ' + k.slice(4, 46).padEnd(46)
    + [...set].join(', ')));
} else {
  console.log('\nno figure family is shared between chapters');
}

if (short.length) {
  console.log('\nwrite here first - these chapters cannot avoid repeating:');
  short.forEach(s => console.log('  ' + s.c.padEnd(30) + 'has ' + s.memPool
    + ' distinct memorable stimuli, asked for ' + s.md + ' - needs about ' + s.need + ' more'));
} else {
  console.log('\nno chapter is oversubscribed at ' + nPapers + ' papers');
}
