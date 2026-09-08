'use strict';
// ── Ten generated papers: conformance, repeats and diversity ─────────────
//
//   node netlify/build-questions.js            # first
//   node scripts/nce-paper-report.js [subject] [count]
//
// The brief asks for exactly this: "Ten generated papers per subject: report
// repeated-question rate, repeated stimulus rate, opening-question diversity
// and section/mark compliance."
//
// ⚠ It REPORTS. It does not pass or fail, because most of what it measures is
//   a property of the bank rather than of the code: a 265-task bank asked for
//   ten 36-question papers cannot avoid repeats, and pretending otherwise by
//   shrinking the papers would be worse. scripts/test-nce-paper.js is the pass/
//   fail suite; this is the honest picture of what the bank can currently do.

const fs = require('fs');
const path = require('path');
const N = require(path.join(__dirname, '..', 'engine', 'nce_paper.js'));

const ROOT = path.join(__dirname, '..');
const subject = process.argv[2] || 'grade9-maths';
const COUNT = +(process.argv[3] || 10);

const bp = N.BLUEPRINTS[subject];
if (!bp) { console.error(`No blueprint for "${subject}".`); process.exit(2); }

const bundle = path.join(ROOT, 'netlify', 'question-bundles', subject + '.json');
if (!fs.existsSync(bundle)) { console.error(`Missing ${bundle}. Run: node netlify/build-questions.js`); process.exit(2); }
const raw = JSON.parse(fs.readFileSync(bundle, 'utf8'));
const all = Array.isArray(raw) ? raw : (raw[subject] || Object.values(raw).find(Array.isArray));
const tasks = all.filter(q => q && q.type === 'task' && Array.isArray(q.parts) && q.parts.length);

const manifest = fs.readFileSync(path.join(ROOT, 'subjects', subject, '_manifest.js'), 'utf8');
const weights = {};
for (const m of manifest.matchAll(/id:\s*['"]([a-z0-9-]+)['"][^\n]*examWeight:\s*(\d+)/g)) weights[m[1]] = +m[2];

console.log(`${subject}: ${tasks.length} tasks, ${tasks.reduce((s, t) => s + N.taskMarks(t), 0)} marks in the bank`);
console.log(`blueprint: ${bp.targetTaskCount} questions, ${bp.totalMarks} marks, ${Math.round(bp.visualTargetPct * 100)}% visual\n`);

const pad = (v, n) => String(v).padStart(n);
console.log('seed   Qs   marks   visual%   draw   depth   warnings');
console.log('────────────────────────────────────────────────────────');

let recent = [], allIds = [], allStim = [], openings = new Set(), clean = 0;
const marksHit = [];
for (let s = 1; s <= COUNT; s++) {
  const p = N.assemblePaper({ blueprint: bp, tasks, seed: s, chapterWeights: weights, recentIds: recent });
  const c = p.compliance;
  const ids = p.tasks.flatMap(t => t.sourceIds || [t.id]);
  allIds.push(...ids);
  // ⚠ A repeated STIMULUS is a separate measure from a repeated question: two
  //   different questions can share one diagram, and a candidate notices the
  //   picture before they notice the wording.
  allStim.push(...p.tasks.filter(t => t.stimulus && t.stimulus.html)
    .map(t => t.stimulus.altText + '|' + t.stimulus.html.length));
  openings.add(p.tasks[0].id);
  marksHit.push(p.totalMarks);
  if (!p.warnings.length) clean++;
  console.log(pad(s, 4), pad(c.taskCount, 4), pad(p.totalMarks, 7),
              pad(Math.round(c.visualShare * 100), 9), pad(c.manualTasks, 6), pad(c.maxDepth, 7),
              '  ' + (p.warnings.length ? p.warnings.length + ': ' + p.warnings[0].slice(0, 60) : '—'));
  recent = ids.concat(recent).slice(0, 200);
}

const uniq = a => new Set(a).size;
const qReuse = allIds.length ? 1 - uniq(allIds) / allIds.length : 0;
const sReuse = allStim.length ? 1 - uniq(allStim) / allStim.length : 0;

console.log('\n── summary ─────────────────────────────────────────────');
console.log(`papers totalling exactly ${bp.totalMarks} marks : ${marksHit.filter(m => m === bp.totalMarks).length}/${COUNT}`);
console.log(`papers with no warnings                : ${clean}/${COUNT}`);
console.log(`distinct opening questions             : ${openings.size}/${COUNT}`);
console.log(`repeated-question rate                 : ${(qReuse * 100).toFixed(1)}%`);
console.log(`repeated-stimulus rate                 : ${(sReuse * 100).toFixed(1)}%  (${uniq(allStim)} distinct of ${allStim.length})`);
// ⚠ WHICH ROLE IS SHORT, not just "the bank is small". The first version of
//   this summary compared the total task count against a rough target and said
//   the bank was too small. Measured on a 468-task bank — comfortably over that
//   target — the repeat rate was still 56.6%, because the shortage is not in
//   the total at all: the blueprint needs SEVEN one-mark MCQ items and TWO
//   5-mark-plus tasks per paper, and the bank held 22 and 9 of them. A hundred
//   more two-mark questions would not have moved the number. Reporting an
//   aggregate would have sent the next batch to write the wrong content.
const marksOf = t => N.taskMarks(t);
const isMcq = t => t.parts.length === 1 && t.parts[0].marks === 1
  && t.parts[0].response && t.parts[0].response.kind === 'choice';
const roles = [
  ['1-mark openers (not MCQ)', tasks.filter(t => t.parts.length === 1 && t.parts[0].marks === 1 && !isMcq(t)).length,
   bp.openingSingles],
  ['1-mark MCQ items', tasks.filter(isMcq).length, (bp.mcqBlock || {}).maxParts || 0],
  [`extended tasks (${(bp.extendedTail || {}).minMarks || 5}+ marks)`,
   tasks.filter(t => marksOf(t) >= ((bp.extendedTail || {}).minMarks || 5)).length,
   (bp.extendedTail || {}).count || 0],
  ['tasks carrying a visual', tasks.filter(N.hasVisual).length,
   Math.round(bp.targetTaskCount * (bp.visualTargetPct || 0))],
];
console.log('\n── what the bank holds, by the role the blueprint needs ─');
console.log('role                            have   per paper   for ' + COUNT + ' papers   short by');
let anyShort = false;
for (const [name, have, perPaper] of roles) {
  const need = perPaper * COUNT;
  const short = Math.max(0, need - have);
  if (short) anyShort = true;
  console.log(name.padEnd(30) + String(have).padStart(6) + String(perPaper).padStart(12)
    + String(need).padStart(16) + (short ? String(short).padStart(11) : '          —'));
}
if (anyShort) {
  console.log('\n⚠ The repeat rate above is driven by the roles marked short, not by the'
    + `\n  total task count (${tasks.length}). Writing more questions of the SHORT kinds is what`
    + '\n  lowers it; more questions of the kinds already plentiful will not.');
}
