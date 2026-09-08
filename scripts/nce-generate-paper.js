'use strict';
// Generate an NCE-style paper and mark scheme from the REAL built bundle.
//
//   node netlify/build-questions.js          # first
//   node scripts/nce-generate-paper.js grade9-maths [seed] [outDir]
//
// ⚠ This reads the BUILT bundle, not the source files. CLAUDE.md: reading the
//   source is not a sufficient check that a field survives — `learnMore` and
//   `subsection` were each silently stripped at build time for months while
//   the source looked correct. If a task's parts or stimulus do not make it
//   through the builder, this script is where that shows up.

const fs = require('fs');
const path = require('path');
const N = require(path.join(__dirname, '..', 'engine', 'nce_paper.js'));

const ROOT = path.join(__dirname, '..');
const subject = process.argv[2] || 'grade9-maths';
const seed = process.argv[3] ? +process.argv[3] : 1;
const outDir = process.argv[4] || path.join(require('os').tmpdir(), 'nce-real');

const bp = N.BLUEPRINTS[subject];
if (!bp) { console.error(`No blueprint for "${subject}". Known: ${Object.keys(N.BLUEPRINTS).join(', ')}`); process.exit(2); }

const bundle = path.join(ROOT, 'netlify', 'question-bundles', subject + '.json');
if (!fs.existsSync(bundle)) { console.error(`Missing ${bundle}. Run: node netlify/build-questions.js`); process.exit(2); }
const raw = JSON.parse(fs.readFileSync(bundle, 'utf8'));
const all = Array.isArray(raw) ? raw : (raw[subject] || Object.values(raw).find(Array.isArray) || []);
const tasks = all.filter(q => q && q.type === 'task' && Array.isArray(q.parts) && q.parts.length);

// Chapter weights come from the manifest, where they are derived from measured
// marks per content area.
const manifest = fs.readFileSync(path.join(ROOT, 'subjects', subject, '_manifest.js'), 'utf8');
const weights = {};
for (const m of manifest.matchAll(/id:\s*['"]([a-z0-9-]+)['"][^\n]*examWeight:\s*(\d+)/g)) weights[m[1]] = +m[2];

const paper = N.assemblePaper({ blueprint: bp, tasks, seed, chapterWeights: weights });

console.log(`${subject}: ${tasks.length} tasks in the bank, ${tasks.reduce((s, t) => s + N.taskMarks(t), 0)} marks available`);
console.log(`paper (seed ${seed}): ${paper.tasks.length} questions, ${paper.totalMarks}/${bp.totalMarks} marks`);
const c = paper.compliance;
console.log(`  parts ${c.partCount} · visuals ${Math.round(c.visualShare * 100)}% (target ${Math.round(c.targetVisualShare * 100)}%)` +
            ` · drawing tasks ${c.manualTasks} · numbering depth ${c.maxDepth}`);
if (paper.warnings.length) {
  console.log('\n⚠ warnings — the bank cannot yet fill this blueprint:');
  for (const w of paper.warnings) console.log('   • ' + w);
} else {
  console.log('\n✅ blueprint satisfied with no warnings.');
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'paper.html'), N.paperHtml(paper, { blueprint: bp }));
fs.writeFileSync(path.join(outDir, 'mark-scheme.html'), N.markSchemeHtml(paper, { blueprint: bp }));
console.log(`\nwrote ${path.join(outDir, 'paper.html')}`);
console.log(`wrote ${path.join(outDir, 'mark-scheme.html')}`);
