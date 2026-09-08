'use strict';
// ── Do multi-part tasks reach a child? ────────────────────────────────────
//
//   node netlify/build-questions.js && node scripts/test-task-projection.js
//
// ⚠ THE BUG THIS EXISTS FOR. `makeTask()` produces `type: 'task'`, and
//   `isPoolQuestion()` excludes "task" from every pool — practice, subsection
//   practice and assembleExamPaper. That exclusion is correct: a task carries
//   parts a machine cannot mark and parts that consume an earlier part's
//   answer. `Assessment.projectToItems()` was written to flatten the markable
//   ones into ordinary mcq/numeric/expr/slots items — and was never called from
//   anywhere. A grep found it only inside a comment.
//
//   So grade9-maths held 667 authored tasks and every one of its 19 chapters
//   would have opened EMPTY for a child. Nothing failed; the pack simply had no
//   questions in it, which is indistinguishable from not having been written.
//
// ⚠ EXPANSION HAPPENS AT BUILD TIME, not in the browser, so the same ids exist
//   in the bundle, in the database the importer writes, and in the sandbox that
//   grades an assignment. Expanding only client-side would have left
//   assignment-submit.js unable to resolve a single Grade 9 answer.
//
// ⚠ This runs the REAL engine functions against the REAL built bundle. It does
//   not re-implement `isPoolQuestion` — a local copy would pass whatever this
//   file believed rather than whatever the app does.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  x ' + m); } };

// ── 1. One implementation, wired everywhere questions enter ───────────────
console.log('the expansion is wired, and shared');
const loader = fs.readFileSync(path.join(ROOT, 'engine', 'question_loader.js'), 'utf8');
const builder = fs.readFileSync(path.join(ROOT, 'netlify', 'build-questions.js'), 'utf8');
const assessment = fs.readFileSync(path.join(ROOT, 'engine', 'assessment.js'), 'utf8');

ok(/function expandTasks\(/.test(assessment), 'assessment.js defines the shared expandTasks()');
ok(/expandTasks,/.test(assessment), 'assessment.js exports it');
ok(/Assessment\.expandTasks\(/.test(loader), 'the browser loader uses the shared helper');
ok(/_expandTasks\(/.test(builder), 'the bundle builder uses it too');
// A private second loop in either place is the duplication CLAUDE.md's
// "code duplicated on purpose" table exists to prevent.
// A private per-task loop would read projectToItems(q). What remains in the
// loader is the guard's own function-name string and the comment recording
// why this exists - neither is a second implementation.
ok(!/projectToItems\(\s*[qt]\b/.test(loader), 'the loader has no private projection loop');

const calls = (loader.match(/_expandTasks\(\);/g) || []).length;
ok(calls >= 3, 'the loader expands on every entry path (' + calls + ' call sites)');
// Three paths put questions into the pool and ALL must expand: file:// dev
// injection, the network fetch, and the 7-day cache hit. Missing the cache one
// would make a pack work on first load and vanish for a week.
const cacheBlock = /const cached = _readCache\(subjectId\);[\s\S]{0,700}?return true;/.exec(loader);
ok(!!cacheBlock && /_expandTasks\(\)/.test(cacheBlock[0]), 'the cache-hit path expands');
const apiBlock = /const incoming = await resp\.json\(\);[\s\S]{0,700}?return true;/.exec(loader);
ok(!!apiBlock && /_expandTasks\(\)/.test(apiBlock[0]), 'the network path expands');

// ── 2. The real engine, the real bundle ───────────────────────────────────
const ctx = { console, Math, JSON, Date, window: {}, navigator: { language: 'en' } };
vm.createContext(ctx);
for (const f of ['engine/helpers.js', 'engine/assessment.js', 'engine/questions_engine.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
}
// STATIC_QUESTIONS is a top-level const in questions_engine.js — a lexical
// binding that never lands on the context object. Anything touching the pool is
// evaluated INSIDE the context.
const run = code => vm.runInContext(code, ctx);
ok(run('typeof isPoolQuestion') === 'function', 'questions_engine.js loaded');
ok(run('typeof Assessment.expandTasks === "function"'), 'assessment.js loaded');

const bundlePath = path.join(ROOT, 'netlify', 'question-bundles', 'grade9-maths.json');
if (!fs.existsSync(bundlePath)) {
  console.log('\n  x missing built bundle - run: node netlify/build-questions.js');
  process.exit(1);
}
const raw = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));
const bundle = Array.isArray(raw) ? raw : (raw['grade9-maths'] || Object.values(raw).find(Array.isArray));
const tasks = bundle.filter(q => q && q.type === 'task');
const items = bundle.filter(q => q && q.type !== 'task');

console.log('\nthe built bundle carries both');
ok(tasks.length > 100, 'tasks are kept for the printable paper (' + tasks.length + ')');
ok(items.length > 100, 'projected items are present for practice (' + items.length + ')');
ctx.__bundle = bundle;
ok(run('__bundle.filter(q => q.type === "task").every(t => !isPoolQuestion(t))'),
   'not one raw task is poolable');
ok(run('__bundle.filter(q => q.type !== "task").every(i => isPoolQuestion(i))'),
   'every projected item IS poolable');
ok(new Set(bundle.map(q => q.id)).size === bundle.length, 'every id in the bundle is unique');

console.log('\nexpansion is idempotent');
run('STATIC_QUESTIONS.push(...__bundle);');
// A second pass must add nothing. A file:// dev load, a cache hit and a retry
// all call this; duplicates would be de-duped later by getMixedQuestions(),
// which looks correct while halving the pool.
ok(run('Assessment.expandTasks(STATIC_QUESTIONS).length') === 0,
   're-expanding an already-expanded pool adds no rows');

console.log('\nthe engine can deal every chapter');
const chapters = [...new Set(tasks.map(t => t.chapterId))];
ok(chapters.length >= 15, 'the pack spans its chapters (' + chapters.length + ')');
ctx.__chapters = chapters;
const empty = run('__chapters.filter(function (ch) { var g = getQuestionsForChapter(ch, 2, 10);'
  + ' return !g || !g.length; })');
ok(empty.length === 0, 'every chapter returns questions: ' + (empty.join(', ') || 'none empty'));

console.log('\nevery difficulty rung deals');
for (const d of [1, 2, 3, 4]) {
  const n = run('STATIC_QUESTIONS.filter(function (q) { return isPoolQuestion(q) && q.difficulty === '
    + d + '; }).length');
  ok(n >= 20, 'difficulty ' + d + ' has a usable pool (' + n + ')');
}

console.log('\nthe subsection invariant survives expansion');
// A projected item inherits its task's subsection; dropping it would empty the
// per-subsection Practise screen for the whole pack.
ok(items.filter(i => !i.subsection).length === 0, 'every item keeps its subsection tag');
ok(items.filter(i => !i.chapterId).length === 0, 'every item keeps its chapterId');

console.log('\nparts a machine cannot mark are still dropped');
const manual = tasks.flatMap(t => (t.parts || []).filter(p =>
  p.response && (p.response.kind === 'drawing' || p.response.kind === 'written')));
ok(manual.length > 0, 'the bank does contain manual parts (' + manual.length + ')');
const itemIds = new Set(items.map(i => i.id));
const leaked = tasks.flatMap(t => (t.parts || [])
  .filter(p => p.response && (p.response.kind === 'drawing' || p.response.kind === 'written'))
  .map(p => t.id + '-' + String(p.label).replace(/\./g, '')))
  .filter(id => itemIds.has(id));
ok(leaked.length === 0, 'no drawing or written part reached the pool: ' + (leaked.join(', ') || 'none'));
// A dependent part consumes an earlier answer and makes no sense alone.
const dependent = tasks.flatMap(t => (t.parts || []).filter(p => p.dependsOn));
ok(dependent.length > 0, 'the bank does contain dependent parts (' + dependent.length + ')');
const depLeaked = tasks.flatMap(t => (t.parts || []).filter(p => p.dependsOn)
  .map(p => t.id + '-' + String(p.label).replace(/\./g, ''))).filter(id => itemIds.has(id));
ok(depLeaked.length === 0, 'no dependent part reached the pool: ' + (depLeaked.join(', ') || 'none'));

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exitCode = fail ? 1 : 0;
