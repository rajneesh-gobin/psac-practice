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

check('the practice-hub grade dropdown honours crossGradePractice', () => {
  const app = engine.find(e => e.file === 'engine/app.js').src;
  const start = app.indexOf('function _renderGradeBar(');
  assert.ok(start > 0, '_renderGradeBar moved');
  const body = app.slice(start, app.indexOf('\n  }', start));
  assert.match(body, /crossGradePractice/,
    'the dropdown must gate on the setting the Parent Controls toggle writes');
  assert.match(body, /sel\.disabled\s*=\s*locked/, 'the lock must actually disable the control');
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
