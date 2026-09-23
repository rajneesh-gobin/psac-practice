'use strict';
// Every parent restriction the app READS must be one something WRITES.
//
// ⚠ This is the general form of a bug found on live data. The child's Start
// Practicing screen gated its grade dropdown on
// `restrictions.gradeRestricted || restrictions.lockedGrade` — two names that
// appear nowhere else in the codebase. Nothing has ever written either, so the
// dropdown was permanently unlocked while the Parent Controls toggle (which
// writes `crossGradePractice`) sat there looking like it worked. A misspelt
// restriction key fails silently and permissively: the lock simply never
// engages, and nothing in the UI says so.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const ROOT = path.resolve(__dirname, '..');
const results = [];
const check = (name, fn) => {
  try { fn(); results.push([true, name]); }
  catch (e) { results.push([false, name + ' - ' + e.message]); }
};

// ⚠ Comments stripped first. The note explaining this bug names the dead keys,
// and scanning the raw source made the test fail on its own documentation.
const decomment = s => s
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .split(/\r?\n/).map(l => l.replace(/(^|[^:"'`\\])\/\/.*$/, '$1')).join('\n');

const engine = fs.readdirSync(path.join(ROOT, 'engine'))
  .filter(f => f.endsWith('.js'))
  .map(f => ({ file: 'engine/' + f, src: decomment(fs.readFileSync(path.join(ROOT, 'engine', f), 'utf8')) }));
const all = engine.map(e => e.src).join('\n');

// Keys READ: restrictions?.foo / restrictions.foo / r.foo = … in the toggles
const read = new Map();
for (const { file, src } of engine) {
  for (const m of src.matchAll(/restrictions\s*\??\.\s*([A-Za-z_$][\w$]*)/g)) {
    if (!read.has(m[1])) read.set(m[1], new Set());
    read.get(m[1]).add(file);
  }
}

// Keys WRITTEN: anything that appears as an object key in a restrictions
// literal, or is assigned on the restrictions object by a toggle.
const written = new Set();
for (const m of all.matchAll(/\br\.([A-Za-z_$][\w$]*)\s*=/g)) written.add(m[1]);          // toggles: r.crossGradeSearch = …
for (const m of all.matchAll(/restrictions:\s*\{([^}]*)\}/g)) {
  for (const k of m[1].matchAll(/([A-Za-z_$][\w$]*)\s*:/g)) written.add(k[1]);
}
for (const m of all.matchAll(/set-def-[a-z]+'\)\?\.checked[^\n]*/g)) void m;
// The defaults block in app.js names every key it ships.
const defaults = /\{\s*maxDifficulty:[^}]*\}/.exec(all);
if (defaults) for (const k of defaults[0].matchAll(/([A-Za-z_$][\w$]*)\s*:/g)) written.add(k[1]);
// Explicit save maps: crossGradeSearch: !!document.getElementById(...)
for (const m of all.matchAll(/([A-Za-z_$][\w$]*)\s*:\s*!!document\.getElementById/g)) written.add(m[1]);
// ⚠⚠ ANY KEY COERCED TO BOOLEAN IN AN OBJECT LITERAL IS A TOGGLE BEING
//    WRITTEN, wherever that literal lives. The four patterns above only knew
//    about writes made IN app.js's own shapes, so `planFirst` — written by
//    Calendar.setPlanFirst() as `Object.assign(…, { planFirst: !!on })` and
//    saved through Store.updateStudent(id, { settings: merged }) — was reported
//    as "read but never written (the lock can never engage)". The lock engages
//    perfectly; the scan could not see the write. A false alarm here is
//    expensive: it says a parent control does nothing, which would send someone
//    to delete a working feature.
for (const m of all.matchAll(/([A-Za-z_$][\w$]*)\s*:\s*!!/g)) written.add(m[1]);

check('every restriction that is read is also written somewhere', () => {
  const orphans = [...read.keys()].filter(k => !written.has(k)).sort();
  assert.deepEqual(orphans, [],
    'read but never written (the lock can never engage): '
    + orphans.map(k => k + ' [' + [...read.get(k)].join(', ') + ']').join('; '));
});

check('the two dead grade-lock names are gone', () => {
  for (const dead of ['gradeRestricted', 'lockedGrade']) {
    assert.ok(!all.includes(dead), dead + ' is back; nothing writes it, so it locks nothing');
  }
});

check('the practice-hub grade dropdown offers exactly the granted grades', () => {
  const app = engine.find(e => e.file === 'engine/app.js').src;
  const start = app.indexOf('function _renderGradeBar(');
  assert.ok(start > 0, '_renderGradeBar moved');
  const body = app.slice(start, app.indexOf('\n  }', start));
  // ⚠⚠ ASSERT THE SOURCE OF THE LIST, NOT THE CALL SITE. This used to require
  //    the literal `GradeAccess.allowed(` inside _renderGradeBar and
  //    `sel.disabled = locked`. Both moved: the grades now come from the local
  //    _allowedGrades(), which IS GradeAccess.allowed(_ownGrade()), and the
  //    select disables when there is only one grade to choose from — there is
  //    nothing to "lock" when there is nothing to pick. The rule that matters
  //    never changed and was never broken; the test was pinning an
  //    implementation detail and went red on a refactor.
  const source = /_allowedGrades\(\)/.test(body) ? 'engine/app.js::_allowedGrades' : null;
  assert.ok(source || /GradeAccess\.allowed\(/.test(body),
    'the dropdown must list the grades the parent actually granted');
  if (source) {
    const helper = app.slice(app.indexOf('function _allowedGrades()'), app.indexOf('function _browsingGrade()'));
    assert.match(helper, /GradeAccess\.allowed\(/,
      '_allowedGrades() must go through GradeAccess, or the grant is decorative');
  }
  // ⚠ THIS IS THE ONE THAT PROTECTS A CHILD and it is unchanged: never list
  //   every live grade and merely paint a lock on top, because that hands over
  //   the whole catalogue the moment the disabled attribute goes.
  assert.ok(!/_liveGrades\(\s*\)/.test(body),
    'listing every live grade and merely disabling the select hands a child the whole catalogue the moment the disabled attribute goes');
  assert.match(body, /sel\.disabled\s*=/, 'the control must still disable itself when there is nothing to choose');
});

// The same failure as the two dead names above, one layer up: a card that
// writes a key nothing reads, or markup calling a handler that no longer
// exists, both fail silently and permissively.
check('grade access is written by the control that claims to write it', () => {
  const auth = engine.find(e => e.file === 'engine/auth.js').src;
  assert.match(auth, /r\.allowedGrades\s*=/, 'Auth.toggleGradeAccess must write restrictions.allowedGrades');
  assert.match(auth, /toggleGradeAccess,/, 'it must be exported, or the markup calls nothing');
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  assert.match(html, /Auth\.toggleGradeAccess\(/, 'the Parent Controls card must call it');
  assert.ok(!/pd-crossgrade-(search|practice)-toggle/.test(html),
    'the two replaced toggles are back in the markup, and nothing writes them now');
  assert.ok(!/Auth\.toggleCrossGrade/.test(html), 'the markup calls a handler that no longer exists');
});

check('a child can never send their games below their own grade', () => {
  const helpers = engine.find(e => e.file === 'engine/helpers.js').src;
  const start = helpers.indexOf('function childChoices(');
  assert.ok(start > 0, 'GradeAccess.childChoices moved');
  const body = helpers.slice(start, helpers.indexOf('\n  }', start));
  assert.match(body, /filter\(x => x >= g\)/,
    'childChoices is the only thing standing between a child and easier questions');
});

check('a child\'s grade never comes from DB.grade alone', () => {
  // DB.grade is written nowhere: not by the app, not by Store._defaultStudent(),
  // and it is absent from every stored blob. Reading it alone yields undefined
  // and falls through to a hard-coded 5 — which is what put Grade 6 children in
  // Grade 5 subjects.
  const app = engine.find(e => e.file === 'engine/app.js').src;
  assert.ok(!/Number\(\s*\(typeof DB !== 'undefined' && DB\?\.grade\)\s*\|\|\s*5\s*\)/.test(app),
    'the practice hub is back to defaulting every child to Grade 5');
  assert.ok(!/const _defaultStudent[\s\S]{0,1200}\bgrade:/.test(
    fs.readFileSync(path.join(ROOT, 'engine/store.js'), 'utf8')),
    'if DB.grade is now a real stored key, this test should be relaxed deliberately');
});

const failed = results.filter(r => !r[0]);
results.forEach(([ok, name]) => console.log('  ' + (ok ? 'ok  ' : 'FAIL') + ' ' + name));
console.log('  ' + read.size + ' restriction keys read · ' + written.size + ' written · '
  + (results.length - failed.length) + ' passed, ' + failed.length + ' failed');
if (failed.length) process.exitCode = 1;
