'use strict';
// One child's work must never land on another child's record.
//
// ⚠ This is not hypothetical. Measured on the live database: a Grade 4 account
// created on 2 September 2026 held a byte-identical copy of its Grade 5
// sibling's progress — 8 of 9 practice days and 26 of 28 chapters the same,
// including two days from before that account existed. The family's weekly
// report therefore counted the same work twice.
//
// Two independent windows caused it, and both are locked here:
//   1. the queued write held a LIVE REFERENCE to the caller's object, and
//      app.js passes the one global `DB` to every save while switching child
//      does `Object.assign(DB, …)` on that same object;
//   2. `_resumeStudent` set ACTIVE_STUDENT_ID six lines and one network round
//      trip before the matching progress arrived.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');

const ROOT = path.resolve(__dirname, '..');
const results = [];
// ⚠ AWAITS. An async check whose promise is dropped can never fail: the
// try/catch returns before the assertion runs and the row is already green.
const pending = [];
const check = (name, fn) => {
  pending.push(Promise.resolve().then(fn).then(
    () => results.push([true, name]),
    e => results.push([false, name + ' - ' + e.message])));
};

// ── 1. The queued write must be a snapshot ──────────────────────────────────
function loadStore() {
  const written = [];
  const storage = new Map();
  const stub = {
    from: () => ({
      upsert: row => { written.push({ id: row.student_id, chapters: Object.keys(row.data.chapters || {}) }); return Promise.resolve({ error: null }); },
      select: () => ({ eq: () => ({ maybeSingle: () => Promise.resolve({ data: null }) }) }),
    }),
    auth: { getSession: () => Promise.resolve({ data: { session: null } }) },
  };
  const sandbox = {
    console, setTimeout, clearTimeout, Date, __SB__: stub,
    localStorage: {
      getItem: k => (storage.has(k) ? storage.get(k) : null),
      setItem: (k, v) => storage.set(k, String(v)),
      removeItem: k => storage.delete(k),
    },
    Events: { emit() {}, on() {} },
    document: { addEventListener() {}, visibilityState: 'visible' },
  };
  sandbox.window = sandbox;
  sandbox.addEventListener = () => {};
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext('var _sb = __SB__; var setStudentToken = function(){}; var getStudentToken = function(){return null;};', sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'engine/store.js'), 'utf8'), sandbox, { filename: 'engine/store.js' });
  // ⚠ `const Store = (() => …)()` is a lexical binding and never lands on the
  // sandbox object. Read it out by bare identifier — the same trap CLAUDE.md
  // records for the role modules.
  return { Store: vm.runInContext('Store', sandbox), written };
}

check('a queued write carries a snapshot, not a live reference', async () => {
  const { Store, written } = loadStore();
  const A = 'aaaaaaaa-0000-0000-0000-00000000000a';
  const B = 'bbbbbbbb-0000-0000-0000-00000000000b';
  // The single global object app.js hands to every save.
  const DB = { chapters: { animals: { attempted: 83, correct: 74 } }, daily: {} };
  Store.saveStudentProgress(A, DB);
  // Switching child mutates that same object in place.
  Object.assign(DB, { chapters: { g9m_probability: { attempted: 5, correct: 1 } }, daily: {} });
  await Store.flushPendingProgress();
  assert.equal(written.length, 1, 'expected exactly one write');
  assert.equal(written[0].id, A);
  assert.deepEqual(written[0].chapters, ['animals'],
    'child A\'s row received ' + written[0].chapters.join(',') + ' — the next child\'s data');
  assert.ok(B, B);
});

check('an immediate write is a snapshot too', async () => {
  const { Store, written } = loadStore();
  const A = 'aaaaaaaa-0000-0000-0000-00000000000a';
  const DB = { chapters: { geometry: { attempted: 12, correct: 7 } }, daily: {} };
  await Store.saveStudentProgress(A, DB, true);
  Object.assign(DB, { chapters: { percentage: { attempted: 2, correct: 0 } } });
  assert.deepEqual(written[0].chapters, ['geometry']);
});

// ── 2. The id must not move before the data ─────────────────────────────────
const auth = fs.readFileSync(path.join(ROOT, 'engine/auth.js'), 'utf8');

check('_resumeStudent sets ACTIVE_STUDENT_ID only after the progress load', () => {
  const start = auth.indexOf('async function _resumeStudent(');
  assert.ok(start > 0, '_resumeStudent not found');
  const body = auth.slice(start, auth.indexOf('\n  }', start));
  const load = body.indexOf('await Store.loadStudentProgress(');
  const setId = body.indexOf('ACTIVE_STUDENT_ID = sess.id');
  assert.ok(load > 0, 'no progress load in _resumeStudent');
  assert.ok(setId > 0, 'no ACTIVE_STUDENT_ID assignment in _resumeStudent');
  assert.ok(setId > load,
    'ACTIVE_STUDENT_ID is set before the progress arrives, so every save in that '
    + 'window files the previous child\'s work under this child');
});

check('nothing awaits between the id and the data', () => {
  const start = auth.indexOf('async function _resumeStudent(');
  const body = auth.slice(start, auth.indexOf('\n  }', start));
  const setId = body.indexOf('ACTIVE_STUDENT_ID = sess.id');
  const assign = body.indexOf('Object.assign(DB, progress)');
  assert.ok(assign > setId, 'DB must be filled after the id is set');
  const between = body.slice(setId, assign);
  assert.ok(!/\bawait\b/.test(between),
    'an await between the id and the data reopens the window');
});

check('an id column is sent an id, not the whole pack', () => {
  // ⚠ ACTIVE_PACK is the pack OBJECT — chapters, notes, badges, syllabus prose.
  // question_progress.js sent it straight into a column called
  // subject_pack_id: measured on the live table, 25 rows held 572 KB where 25
  // ids would have been 325 bytes, growing ~23 KB per question answered.
  const src = fs.readFileSync(path.join(ROOT, 'engine/question_progress.js'), 'utf8');
  // ⚠ Skip comment lines: the note explaining this bug mentions the column by
  // name, and matching that instead of the code made the test fail on itself.
  const line = src.split(/\r?\n/)
    .filter(l => !/^\s*(\/\/|\*|\/\*)/.test(l))
    .find(l => /subject_pack_id\s*:/.test(l));
  assert.ok(line, 'subject_pack_id is no longer written here');
  assert.ok(/ACTIVE_PACK\s*\??\.\s*id/.test(line),
    'subject_pack_id is being sent the pack itself: ' + line.trim().slice(0, 80));
});

check('the parent-preview path has the same ordering', () => {
  // pdSwitchStudent shares _loginStudentRow; its Object.assign and its
  // ACTIVE_STUDENT_ID must also sit in one synchronous run.
  const start = auth.indexOf('const progress = await Store.loadStudentProgress(studentRow.id)');
  assert.ok(start > 0, 'the student-row login path moved');
  const body = auth.slice(start, start + 900);
  const assign = body.indexOf('Object.assign(DB, merged)');
  const setId = body.indexOf('ACTIVE_STUDENT_ID = studentRow.id');
  assert.ok(assign > 0 && setId > assign, 'DB must be filled before the id changes here');
  assert.ok(!/\bawait\b/.test(body.slice(assign, setId)), 'no await may separate them');
});

(async () => {
  await Promise.all(pending);
  const failed = results.filter(r => !r[0]);
  results.forEach(([ok, name]) => console.log('  ' + (ok ? 'ok  ' : 'FAIL') + ' ' + name));
  console.log('  ' + (results.length - failed.length) + ' passed, ' + failed.length + ' failed');
  if (failed.length) process.exitCode = 1;
})();
