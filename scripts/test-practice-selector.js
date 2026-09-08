'use strict';
// Does the practice-set selector do what the chapter journey promises?
//
// Covers deliverables 1-9 of docs/content-update.md's test list; the RLS,
// idempotency and concurrency items (11-13) are in
// scripts/sql-tests/run-question-progress-tests.sh, because they are database
// behaviour and cannot be proved in JavaScript.
//
// ⚠ Eligibility (difficulty caps, locks, plan and published-grade limits) is
//   applied by the CALLER, so the tests here feed an already-eligible list and
//   assert the selector never adds to it. The caller-side enforcement is
//   asserted separately against the real engine at the bottom.
//
//   node scripts/test-practice-selector.js

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const S = require(path.join(ROOT, 'engine', 'practice_selector.js'));

let pass = 0, fail = 0;
const ok = m => { pass++; console.log('  ok   ' + m); };
const bad = (m, e) => { fail++; console.log('  FAIL ' + m + (e ? ' — ' + e.message : '')); };
const t = (name, fn) => { try { fn(); ok(name); } catch (e) { bad(name, e); } };

const bank = (n, chapterId = 'ch1') =>
  Array.from({ length: n }, (_, i) => ({ id: `${chapterId}-q${String(i + 1).padStart(3, '0')}`, chapterId }));

const progressOf = (map) => {
  const out = {};
  for (const [id, spec] of Object.entries(map)) {
    out[id] = Object.assign({ attempts: 1, correctAttempts: 0, lastSeenAt: 0 }, spec);
  }
  return out;
};

console.log('\nSet construction');

t('1. a 20-item Smart set has no duplicate ids', () => {
  const qs = bank(120);
  const r = S.select({ mode: 'smart', questions: qs, progress: {}, rng: S.seeded(1) });
  assert.equal(r.ids.length, 20);
  assert.equal(new Set(r.ids).size, 20);
});

t('2. unseen questions are chosen before repeated secure ones', () => {
  const qs = bank(40);
  // first 30 are secure, last 10 unseen
  const prog = progressOf(Object.fromEntries(qs.slice(0, 30).map(q => [q.id, { state: S.SECURE }])));
  const r = S.select({ mode: 'smart', questions: qs, progress: prog, rng: S.seeded(2) });
  const unseenPicked = r.ids.filter(id => !prog[id]).length;
  assert.equal(unseenPicked, 10, 'every unseen question should be taken before any secure repeat');
});

t('3. an unfinished set resumes at the exact saved position', () => {
  const qs = bank(50);
  const saved = { ids: qs.slice(10, 30).map(q => q.id), position: 7 };
  const r = S.select({ mode: 'smart', questions: qs, progress: {}, resume: saved, rng: S.seeded(3) });
  assert.equal(r.mode, 'resume');
  assert.deepEqual(r.ids, saved.ids);
  assert.equal(r.position, 7);
});

t('3b. a resume drops questions that have left the bank, and clamps the position', () => {
  const qs = bank(50);
  const saved = { ids: [...qs.slice(0, 3).map(q => q.id), 'ch1-gone-001'], position: 3 };
  const r = S.select({ mode: 'smart', questions: qs, progress: {}, resume: saved, rng: S.seeded(4) });
  assert.equal(r.ids.length, 3);
  assert.equal(r.dropped, 1);
  assert.equal(r.position, 2, 'position clamps to the last surviving question');
});

t('4. New Questions returns fewer than 20 rather than padding with repeats', () => {
  const qs = bank(30);
  const prog = progressOf(Object.fromEntries(qs.slice(0, 23).map(q => [q.id, { state: S.SECURE }])));
  const r = S.select({ mode: 'new', questions: qs, progress: prog, rng: S.seeded(5) });
  assert.equal(r.ids.length, 7, 'only 7 unseen remain');
  assert.equal(r.short, true, 'the caller must be told the set is short');
  assert.ok(r.ids.every(id => !prog[id]), 'not one already-seen question crept in');
});

t('4b. New Questions with nothing unseen returns empty with a reason, not a dead set', () => {
  const qs = bank(10);
  const prog = progressOf(Object.fromEntries(qs.map(q => [q.id, { state: S.SECURE }])));
  const r = S.select({ mode: 'new', questions: qs, progress: prog, rng: S.seeded(6) });
  assert.equal(r.empty, true);
  assert.equal(r.reason, 'no_unseen');
});

t('Fix My Mistakes takes the least recently retried first', () => {
  const qs = bank(6);
  const prog = progressOf({
    'ch1-q001': { state: S.NEEDS, lastSeenAt: 500 },
    'ch1-q002': { state: S.NEEDS, lastSeenAt: 100 },
    'ch1-q003': { state: S.NEEDS, lastSeenAt: 300 },
    'ch1-q004': { state: S.SECURE, lastSeenAt: 10 },
  });
  const r = S.select({ mode: 'fix', questions: qs, progress: prog, rng: S.seeded(7) });
  assert.deepEqual(r.ids, ['ch1-q002', 'ch1-q003', 'ch1-q001']);
});

t('Fix My Mistakes with no mistakes reports it rather than offering a dead button', () => {
  const r = S.select({ mode: 'fix', questions: bank(5), progress: {}, rng: S.seeded(8) });
  assert.equal(r.empty, true);
  assert.equal(r.reason, 'no_mistakes');
});

t('the Journey serves unseen questions in stable chunks', () => {
  const qs = bank(45);
  const first = S.select({ mode: 'journey', questions: qs, progress: {}, rng: S.seeded(9) });
  const seen = progressOf(Object.fromEntries(first.ids.map(id => [id, { state: S.SECURE }])));
  const second = S.select({ mode: 'journey', questions: qs, progress: seen, rng: S.seeded(9) });
  assert.equal(first.ids.length, 20);
  assert.equal(second.ids.length, 20);
  assert.equal(first.ids.filter(id => second.ids.includes(id)).length, 0, 'chunk 2 repeats nothing from chunk 1');
});

t('9. the same question is not planted first in successive sets', () => {
  const qs = bank(25);
  const r = S.select({ mode: 'smart', questions: qs, progress: {}, rng: S.seeded(10) });
  const again = S.select({ mode: 'smart', questions: qs, progress: {}, rng: S.seeded(10), recentFirstIds: [r.ids[0]] });
  assert.notEqual(again.ids[0], r.ids[0]);
  assert.equal(new Set(again.ids).size, again.ids.length, 'the swap introduced no duplicate');
});

t('10. selection is deterministic under a seeded generator', () => {
  const qs = bank(80);
  const a = S.select({ mode: 'smart', questions: qs, progress: {}, rng: S.seeded(42) });
  const b = S.select({ mode: 'smart', questions: qs, progress: {}, rng: S.seeded(42) });
  assert.deepEqual(a.ids, b.ids);
});

t('8. a chapter smaller than one set degrades to what exists', () => {
  const r = S.select({ mode: 'smart', questions: bank(7), progress: {}, rng: S.seeded(11) });
  assert.equal(r.ids.length, 7);
  assert.equal(r.short, true);
});

console.log('\nThe per-question state machine');

t('5. wrong -> correct -> correct walks needs-practice -> improved -> secure', () => {
  let s = S.nextState(null, false);
  assert.equal(s.state, S.NEEDS);
  s = S.nextState(s, true);
  assert.equal(s.state, S.IMPROVED, 'one correct answer after a miss is not secure');
  s = S.nextState(s, true);
  assert.equal(s.state, S.SECURE);
  assert.equal(s.attempts, 3);
  assert.equal(s.correctAttempts, 2);
});

t('6. a later wrong answer returns a secure question to needs-practice', () => {
  let s = S.nextState(null, true);
  assert.equal(s.state, S.SECURE, 'a first correct answer on a never-missed question is secure');
  s = S.nextState(s, false);
  assert.equal(s.state, S.NEEDS);
  assert.equal(s.consecutiveCorrect, 0);
});

t('a first correct answer keeps its counts and recency for spaced review', () => {
  const s = S.nextState(null, true);
  assert.equal(s.attempts, 1);
  assert.equal(s.correctAttempts, 1);
  assert.equal(s.everWrong, false);
});

t('12. viewing or skipping is not an attempt and cannot turn a cell green', () => {
  assert.equal(S.isAttempted(undefined), false);
  assert.equal(S.isAttempted({ attempts: 0, state: S.NOT_TRIED }), false);
  assert.equal(S.isAttempted({ attempts: 1 }), true);
});

t('legacy answeredIds count as explored but never as secure', () => {
  const qs = bank(4);
  const prog = progressOf({ 'ch1-q001': { state: S.LEGACY, attempts: 0 } });
  const cov = S.coverage(qs, prog);
  assert.equal(cov.explored, 1);
  assert.equal(cov.secure, 0);
  const b = S.bucket(qs, prog);
  assert.equal(b.unseen.length, 3, 'a legacy row is not offered as unseen');
  assert.equal(b.secure.length, 0);
});

console.log('\nCoverage and the button label');

t('7. adding questions raises the denominator without disturbing old ids', () => {
  const before = S.coverage(bank(30), progressOf({ 'ch1-q001': { state: S.SECURE } }));
  const after = S.coverage(bank(45), progressOf({ 'ch1-q001': { state: S.SECURE } }));
  assert.equal(before.total, 30);
  assert.equal(after.total, 45);
  assert.equal(after.explored, 1, 'the existing question is still counted, at the same id');
});

t('an unknown bank size withholds the coverage claim rather than assuming it', () => {
  const cov = S.coverage([], {});
  assert.equal(cov.known, false);
  assert.equal(cov.pctExplored, null);
  assert.equal(cov.allExplored, false);
});

t('15. the label never calls one 20-question set a finished chapter', () => {
  const qs = bank(100);
  assert.equal(S.primaryAction(qs, {}, null).label, 'Start Smart Practice');
  const some = progressOf(Object.fromEntries(qs.slice(0, 20).map(q => [q.id, { state: S.SECURE }])));
  assert.equal(S.primaryAction(qs, some, null).label, 'Continue Smart Practice');
  const all = progressOf(Object.fromEntries(qs.map(q => [q.id, { state: S.SECURE }])));
  assert.equal(S.primaryAction(qs, all, null).label, 'Start Revision');
});

t('a saved set is offered as a resume, with a truthful position', () => {
  const a = S.primaryAction(bank(50), {}, { ids: bank(20).map(q => q.id), position: 6 });
  assert.equal(a.label, 'Resume · Question 7 of 20');
});

t('coverage separates explored, practice and understanding', () => {
  const qs = bank(10);
  const prog = progressOf({
    'ch1-q001': { state: S.SECURE, attempts: 3, correctAttempts: 3 },
    'ch1-q002': { state: S.NEEDS, attempts: 2, correctAttempts: 0 },
  });
  const cov = S.coverage(qs, prog);
  assert.equal(cov.explored, 2);
  assert.equal(cov.pctExplored, 20);
  assert.equal(cov.attempts, 5);
  assert.equal(cov.accuracy, 60);
  assert.equal(cov.needs, 1);
  assert.equal(cov.allExplored, false);
});

console.log('\nThe module stays pure and in step with the database');

t('the selector reads no globals: it runs with no window and no DOM', () => {
  assert.equal(typeof window, 'undefined');
  const r = S.select({ mode: 'smart', questions: bank(25), progress: {}, rng: S.seeded(12) });
  assert.equal(r.ids.length, 20);
});

t('the JS state machine matches the SQL one branch for branch', () => {
  const sql = fs.readFileSync(path.join(ROOT, 'migrations', '20260908_chapter_question_progress.sql'), 'utf8');
  // The four branches that decide state, in the same order as nextState().
  assert.ok(/IF NOT v_correct THEN\s+v_state := 'needs_practice';/.test(sql), 'wrong -> needs_practice');
  assert.ok(/ELSIF NOT coalesce\(v_row\.ever_wrong, false\) THEN\s+v_state := 'secure';/.test(sql), 'never wrong + correct -> secure');
  assert.ok(/ELSIF v_cc >= 2 THEN\s+v_state := 'secure';/.test(sql), 'two consecutive correct -> secure');
  assert.ok(/ELSE\s+v_state := 'improved';/.test(sql), 'one correct after a miss -> improved');
});

t('10/12. assignment mode is never routed through this selector', () => {
  const app = fs.readFileSync(path.join(ROOT, 'engine', 'app.js'), 'utf8');
  assert.ok(/ASSIGNMENT_MODE/.test(app), 'the assignment boundary still exists in app.js');
});

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
