'use strict';
// Does the question cache actually fit in a browser's localStorage?
//
// WHY THIS EXISTS
// The cache used to be capped at six SLOTS, which was fine while every subject
// bundle was about the same size. Measured 2026-09-07 it was not: grade6-french
// is 1,412 KB against grade4-science's 237 KB, so six slots came to 5.4 MB
// against a ~5 MB quota. Nothing noticed, because an over-quota write is caught
// and ignored — and the write that loses that race is often
// Store.saveStudentSession(), which reads to a parent as "it keeps logging me
// out". _writeCache now budgets in BYTES.
//
// ⚠ This test drives the REAL _writeCache with the REAL built bundle sizes.
// Reasoning about a budget is not the same as running the code that enforces
// it, and the sizes are the thing that drifts: rebuild the bundles first.
//
//   node netlify/build-questions.js && node scripts/test-question-cache-budget.js
//
// If it fails because a grade no longer fits, that is the signal to revisit
// _BYTE_BUDGET or to split the bundles — not to relax this test.

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const ROOT   = path.resolve(__dirname, '..');
const BUNDLES = path.join(ROOT, 'netlify/question-bundles');

// The figure every mainstream browser lands near, counted in characters.
const QUOTA = 5000000;
// What else lives in this origin: the progress blob, the student session token,
// the parent's stashed refresh token, known-students. Generous on purpose.
const OTHER = 900000;

let failures = 0;
function check(name, ok, detail) {
  if (ok) { console.log('  ok   ' + name); return; }
  failures++;
  console.log('  FAIL ' + name + (detail ? '  -> ' + detail : ''));
}

if (!fs.existsSync(BUNDLES)) {
  console.error('No built bundles. Run: node netlify/build-questions.js');
  process.exit(2);
}

let SRC = fs.readFileSync(path.join(ROOT, 'engine/question_loader.js'), 'utf8')
  .replace(/^﻿/, '').replace(/\r/g, '');
const EXPORT = '  return { loadSubject, loadForStudent, loadAllForGrade, loadPastPapers, useStudent, reset };';
if (SRC.indexOf(EXPORT) === -1) throw new Error('export anchor moved');
SRC = SRC.replace(EXPORT,
  '  return { loadSubject, loadForStudent, loadAllForGrade, loadPastPapers, useStudent, reset,\n'
  + '           _writeCache, _BYTE_BUDGET, _LRU_MAX };');

// A storage that can genuinely run out of room. Without the limit every write
// succeeds and the quota branch is never reached — a test that passes by never
// running the thing it claims to check.
function makeStorage() {
  const m = new Map();
  const used = (skip) => {
    let n = 0;
    for (const [k, v] of m) if (k !== skip) n += k.length + v.length;
    return n;
  };
  const api = {
    getItem: k => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => {
      v = String(v);
      if (used(k) + k.length + v.length > QUOTA) {
        const e = new Error('quota'); e.name = 'QuotaExceededError'; e.code = 22; throw e;
      }
      m.set(k, v);
    },
    removeItem: k => { m.delete(k); },
    key: i => Array.from(m.keys())[i] ?? null,
    _map: m,
  };
  Object.defineProperty(api, 'length', { get: () => m.size });
  return api;
}

function load(storage) {
  const sandbox = {
    console: { log() {}, warn() {}, error() {} },
    JSON, Date, Math, Promise, Set, Map, Array, Object, String, Number,
    setTimeout, clearTimeout,
    localStorage: storage,
    location: { protocol: 'https:', origin: 'https://x', href: 'https://x/' },
    navigator: { onLine: true },
    document: { addEventListener() {}, querySelectorAll: () => [] },
    fetch: async () => ({ ok: true, status: 200, json: async () => [] }),
    STATIC_QUESTIONS: [],
    ACTIVE_STUDENT_ID: 'kid-a',
    Store: { getStudentSession: () => ({ studentId: 'kid-a', token: 't' }) },
    getStudentToken: () => 't',
    _sb: null,
  };
  sandbox.window = sandbox; sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(SRC, sandbox, { filename: 'engine/question_loader.js' });
  return vm.runInContext('QuestionLoader', sandbox);
}

const real = {};
for (const f of fs.readdirSync(BUNDLES)) {
  const m = /^(grade[456]-[a-z]+)\.json$/.exec(f);
  if (m) real[m[1]] = fs.statSync(path.join(BUNDLES, f)).size;
}
const subjects = Object.keys(real).sort();
if (subjects.length !== 15) {
  console.error('expected 15 live subject bundles, found ' + subjects.length);
  process.exit(2);
}

// One question padded to the bundle's real size: same shape, same cost.
const filler = (chars) => [{ id: 'x', chapterId: 'c', difficulty: 1, question: 'y'.repeat(Math.max(1, chars - 120)) }];

function run(order) {
  const storage = makeStorage();
  storage.setItem('mm_student_session', 'TOKEN');
  storage.setItem('mm_progress_blob', 'p'.repeat(OTHER));
  const QL = load(storage);
  for (const s of order) QL._writeCache(s, filler(real[s]));
  const keys = Array.from(storage._map.keys()).filter(k => k.includes('|'));
  return {
    budget: QL._BYTE_BUDGET,
    slots:  QL._LRU_MAX,
    kept:   keys.map(k => k.split('|')[1]),
    chars:  keys.reduce((n, k) => n + storage.getItem(k).length, 0),
    token:  storage.getItem('mm_student_session'),
    origin: Array.from(storage._map.entries()).reduce((n, [k, v]) => n + k.length + v.length, 0),
  };
}

const mb = n => (n / 1e6).toFixed(2) + ' MB';

console.log('measured bundle sizes (largest first):');
for (const s of subjects.slice().sort((a, b) => real[b] - real[a]).slice(0, 4)) {
  console.log('  ' + s.padEnd(16) + String(Math.round(real[s] / 1024)).padStart(6) + ' KB');
}
console.log('  all fifteen     ' + mb(subjects.reduce((n, s) => n + real[s], 0)));

// ── A child's own grade is the whole offline case: it must fit WHOLE ────────
// ⚠ DERIVED, NOT HARD-CODED. When grade9-maths went live this loop still
//   read [4, 5, 6] and never checked whether a Grade 9 child's own subjects
//   fit their offline cache - the exact question this file exists to answer.
const LIVE_GRADES = [...new Set(fs.readdirSync(path.join(ROOT, 'subjects'))
  .filter(d => /^grade\d-/.test(d))
  .filter(d => {
    const m = path.join(ROOT, 'subjects', d, '_manifest.js');
    return fs.existsSync(m) && /comingSoon:\s*false/.test(fs.readFileSync(m, 'utf8'));
  })
  .map(d => +d.match(/^grade(\d)-/)[1]))].sort((a, b) => a - b);
for (const g of LIVE_GRADES) {
  const set = subjects.filter(s => s.startsWith('grade' + g + '-'));
  const r = run(set);
  console.log('\nGrade ' + g + ': ' + mb(r.chars) + ' cached of a ' + mb(r.budget) + ' budget'
    + ' · origin ' + mb(r.origin) + ' of ' + mb(QUOTA));
  check('a whole Grade ' + g + ' stays cached', r.kept.length === set.length,
    r.kept.length + ' of ' + set.length + ' kept: ' + r.kept.join(', '));
  check('Grade ' + g + ' stays inside the byte budget', r.chars <= r.budget, mb(r.chars));
  check('Grade ' + g + ' leaves the session token alone', r.token === 'TOKEN');
}

// ── The case that broke it: the six largest subjects ────────────────────────
{
  const worst = subjects.slice().sort((a, b) => real[b] - real[a]).slice(0, 6);
  const r = run(worst);
  const naive = worst.reduce((n, s) => n + real[s], 0);
  console.log('\nSix largest subjects: ' + mb(naive) + ' if all six were kept, '
    + mb(r.chars) + ' actually cached');
  check('six slots of the largest subjects would have overflowed', naive > QUOTA - OTHER,
    mb(naive));
  check('the budget holds them under the cap', r.chars <= r.budget, mb(r.chars));
  check('the origin stays clear of the quota', r.origin < QUOTA, mb(r.origin));
  check('the session token survives', r.token === 'TOKEN');
  check('something useful is still cached', r.kept.length >= 2, r.kept.join(', '));
}

// ── Every subject in turn, which is the cross-grade ceiling ─────────────────
{
  const r = run(subjects);
  console.log('\nAll fifteen in turn: ' + mb(r.chars) + ' cached, ' + r.kept.length + ' subjects');
  check('never exceeds the byte budget', r.chars <= r.budget, mb(r.chars));
  check('never exceeds the slot cap', r.kept.length <= r.slots, String(r.kept.length));
  check('the session token survives the lot', r.token === 'TOKEN');
}

console.log(failures ? '\n' + failures + ' check(s) failed' : '\nall checks passed');
process.exit(failures ? 1 : 0);
