'use strict';
// ── Grades 4-6 must not move ─────────────────────────────────────────────
// The Grade 9 / NCE work touches shared question, practice, exam and printable
// logic. This harness is the guard that says the 13,000 questions children
// actually use today came out of the builder unchanged.
//
// ⚠ THE BUNDLES ARE NOT BYTE-STABLE, AND NEITHER IS THEIR OPTION CONTENT.
//   makeMCQ() is `shuffle(distractors).slice(0, 3)` — a question that supplies
//   more than three wrong options gets a RANDOM SUBSET of them, different on
//   every build. makeMatch() does the same with `allRights`. So two builds of
//   an unchanged tree differ in bytes AND in which distractors survive:
//   measured, grade4.json hashed 32ffedfc then 363708af, and six subjects
//   changed option content, with every question count identical.
//
//   Sorting the options is therefore not enough. `options` is excluded from
//   the fingerprint entirely, and the invariants that ARE deterministic are
//   asserted per question instead: how many options there are, that the keyed
//   answer is one of them, and that they are distinct.
//
// ⚠ This cannot catch "the shuffle stopped happening" or "a distractor was
//   reworded". That is not what it is for. It catches a lost field, a changed
//   answer, a dropped question, a renamed chapter or subsection, a difficulty
//   edit and a changed count — the things a schema change actually breaks.
//
// ⚠ THE BASELINE TRACKS WHATEVER IS IN THE TREE, so a failure means "something
//   moved", not "you broke it". ATTRIBUTE BEFORE YOU RE-BASELINE. Measured on
//   2026-09-08: this suite failed twice while the Grade 9 schema work was in
//   progress, and neither failure was caused by that work — another process was
//   authoring Grade 5 English content in the same tree (six new files worth
//   exactly the +60 questions the first failure reported, then a rewrite of
//   ch09_passages.js that changed content with the count unchanged). Both were
//   attributed by counting questions per file and checking mtimes, then
//   accepted with --update. Re-baselining first and asking later is how a real
//   regression gets waved through.
//
//   node netlify/build-questions.js   # first — this reads the built bundles
//   node scripts/test-grade456-regression.js
//   node scripts/test-grade456-regression.js --update   # after an ATTRIBUTED change

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const BUNDLES = path.join(ROOT, 'netlify', 'question-bundles');
const BASELINE = path.join(__dirname, 'fixtures', 'grade456-baseline.json');
const GRADES = [4, 5, 6];

let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; } else { fail++; console.log('  ✗ ' + m); } };

// Every field the app reads off a question. A field added to a factory and not
// added here is invisible to this test, so the list is deliberately explicit
// rather than Object.keys() — which would silently start tracking junk.
const FIELDS = [
  'id', 'chapterId', 'subsection', 'difficulty', 'type', 'question', 'answer',
  'acceptableAnswers', 'hint', 'explanation', 'learnMore',
  'rows', 'cols', 'axis', 'axisPos', 'given',
  'title', 'intro', 'text', 'textB', 'introB', 'bank', 'gaps', 'gapAnswers',
  'gapAlts', 'gapsA', 'gapsB', 'twoPart', 'notes',
  'confusables', 'strictAccents',
];

// ⚠ `options` is absent from FIELDS on purpose — see the header. Its shape is
// captured here instead, and that shape IS stable across builds.
function canon(q) {
  const out = {};
  for (const f of FIELDS) {
    if (q[f] === undefined) continue;
    out[f] = q[f];
  }
  if (Array.isArray(q.options)) {
    out._optCount = q.options.length;
    out._answerIsAnOption = q.options.map(String).includes(String(q.answer));
    out._optionsDistinct = new Set(q.options.map(String)).size === q.options.length;
  }
  return JSON.stringify(out);
}

function readBundle(g) {
  const f = path.join(BUNDLES, `grade${g}.json`);
  if (!fs.existsSync(f)) {
    console.log(`\n  Bundle ${f} is missing. Run: node netlify/build-questions.js`);
    process.exit(2);
  }
  const raw = JSON.parse(fs.readFileSync(f, 'utf8'));
  // The bundle is { subjectId: [questions] } (plus metadata keys). Flatten to
  // one list, remembering which subject each came from.
  const out = [];
  for (const [subject, val] of Object.entries(raw)) {
    if (!Array.isArray(val)) continue;
    for (const q of val) if (q && q.id) out.push({ subject, q });
  }
  return out;
}

function fingerprint(g) {
  const items = readBundle(g);
  const per = {};
  for (const { subject, q } of items) {
    (per[subject] = per[subject] || []).push(subject + '|' + canon(q));
  }
  const subjects = {};
  for (const [s, rows] of Object.entries(per)) {
    rows.sort();
    subjects[s] = {
      count: rows.length,
      hash: crypto.createHash('sha256').update(rows.join('\n')).digest('hex'),
    };
  }
  return { total: items.length, subjects };
}

const current = {};
for (const g of GRADES) current['grade' + g] = fingerprint(g);

if (process.argv.includes('--update')) {
  fs.mkdirSync(path.dirname(BASELINE), { recursive: true });
  fs.writeFileSync(BASELINE, JSON.stringify(current, null, 2) + '\n');
  console.log('Baseline written to ' + path.relative(ROOT, BASELINE));
  for (const [g, v] of Object.entries(current)) {
    console.log(`  ${g}: ${v.total} questions across ${Object.keys(v.subjects).length} subjects`);
  }
  process.exit(0);
}

if (!fs.existsSync(BASELINE)) {
  console.log('No baseline yet. Create one with:');
  console.log('  node scripts/test-grade456-regression.js --update');
  process.exit(2);
}

const base = JSON.parse(fs.readFileSync(BASELINE, 'utf8'));

console.log('Grades 4-6 regression');
for (const g of GRADES) {
  const key = 'grade' + g;
  const b = base[key], c = current[key];
  ok(!!b, `${key}: present in the baseline`);
  if (!b) continue;
  ok(b.total === c.total, `${key}: ${b.total} questions expected, got ${c.total}`);
  const bs = Object.keys(b.subjects).sort(), cs = Object.keys(c.subjects).sort();
  ok(bs.join() === cs.join(), `${key}: subjects ${bs.join()} expected, got ${cs.join()}`);
  for (const s of bs) {
    if (!c.subjects[s]) continue;
    ok(b.subjects[s].count === c.subjects[s].count,
      `${s}: ${b.subjects[s].count} questions expected, got ${c.subjects[s].count}`);
    ok(b.subjects[s].hash === c.subjects[s].hash,
      `${s}: content fingerprint changed — a field, answer or question text moved`);
  }
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
