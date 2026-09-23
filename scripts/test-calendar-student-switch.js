'use strict';
// One child's homework must never appear on a sibling's calendar.
//
//   node scripts/test-calendar-student-switch.js
//
// ⚠⚠ THE BUG THIS EXISTS FOR. engine/calendar.js keeps two per-student caches:
//    _activity ("what happened") and _due ("what is set, not yet done"). They
//    are merged at display by _activityFor(). Two callers — getRecentActivity()
//    and the plan-blocks render, both on the parent dashboard — set _studentId
//    and cleared only _activity, so _due went on holding the PREVIOUS child's
//    homework. render() and setStudent() reload both and were always fine,
//    which is why this survived: the common path hid it.
//
// ⚠ The fix is structural, not a patch at two call sites: _useStudent() clears
//   both halves, so a future reader cannot reset one and forget the other.
//   This test checks the STRUCTURE as well as the behaviour, because the next
//   person to add a third caller is the one it has to protect.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
let failures = 0;
const ok = (m) => console.log('  ✓ ' + m);
const bad = (m, d) => { failures++; console.log('  ✗ ' + m + (d !== undefined ? ' — ' + JSON.stringify(d).slice(0, 300) : '')); };
const check = (c, m, d) => c ? ok(m) : bad(m, d);

const src = fs.readFileSync(path.join(ROOT, 'engine', 'calendar.js'), 'utf8');

function fnBody(s, header) {
  const start = s.indexOf(header);
  if (start < 0) throw new Error('not found: ' + header);
  let i = s.indexOf('(', start), parens = 0;
  for (; i < s.length; i++) {
    if (s[i] === '(') parens++;
    else if (s[i] === ')' && --parens === 0) break;
  }
  let depth = 0;
  for (let j = s.indexOf('{', i); j < s.length; j++) {
    if (s[j] === '{') depth++;
    else if (s[j] === '}' && --depth === 0) return s.slice(start, j + 1);
  }
  throw new Error('unbalanced: ' + header);
}

console.log("A sibling's homework stays on their own calendar\n");

// ── 1. The behaviour, run for real ────────────────────────────────────────
console.log('Switching child clears BOTH caches');
{
  const ctx = { _studentId: 'kid-A', _activity: [{ kind: 'practice', date: '2026-09-20' }],
                _due: [{ kind: 'due', date: '2026-09-25', title: "A's paper" }] };
  vm.createContext(ctx);
  vm.runInContext(fnBody(src, '  function _useStudent(id) {').trim(), ctx);

  const changed = ctx._useStudent('kid-B');
  check(changed === true, 'switching to another child reports a change');
  check(ctx._studentId === 'kid-B', 'the student is switched');
  check(ctx._activity.length === 0, 'what happened is cleared');
  // ⚠ THIS is the one that was broken.
  check(ctx._due.length === 0, "⚠ and so is the other child's due homework", ctx._due);

  // Re-selecting the same child must not throw away a warm cache.
  ctx._activity = [{ kind: 'practice' }]; ctx._due = [{ kind: 'due' }];
  const again = ctx._useStudent('kid-B');
  check(again === false && ctx._activity.length === 1 && ctx._due.length === 1,
    'selecting the same child again keeps the cache warm',
    { activity: ctx._activity.length, due: ctx._due.length });
}

// ── 2. The structure, so it cannot drift back ─────────────────────────────
console.log('\nNothing can reset one half and forget the other');
{
  // ⚠ The exact shape of the old bug: `_studentId = X; _activity = []` with no
  //   mention of _due. If it reappears anywhere, it is the same defect again.
  const legacy = /_studentId\s*=\s*\w+\s*;\s*_activity\s*=\s*\[\]\s*;?\s*\}/.test(src);
  check(!legacy, '⚠ no caller clears _activity alone on a student change');

  // Every place that changes which student the calendar is about.
  const assigns = [...src.matchAll(/^\s*_studentId\s*=\s*(?!_)(\w+)/gm)].map(m => m[1]);
  check(assigns.length > 0, 'the student is still assigned somewhere', assigns);

  const useStudent = fnBody(src, '  function _useStudent(id) {');
  check(/_activity = \[\]/.test(useStudent) && /_due = \[\]/.test(useStudent),
    'the one helper clears both halves');

  // Both dashboard callers go through it AND reload both.
  const recent = fnBody(src, '  async function getRecentActivity(studentId, days = 14) {');
  check(/_useStudent\(studentId\)/.test(recent), 'getRecentActivity() switches through the helper');
  check(/_loadDue\(\)/.test(recent), '…and reloads the due layer it just cleared');

  // ⚠ If it cleared _due and never reloaded it, the calendar would simply show
  //   nothing due — quieter than the leak, still wrong.
  const bodies = [recent, fnBody(src, '  async function render() {'), fnBody(src, '  async function setStudent(id) {')];
  for (const b of bodies) {
    const clearsOrSwitches = /_useStudent\(/.test(b) || /_loadActivity\(\)/.test(b);
    if (!clearsOrSwitches) continue;
    check(/_loadDue\(\)/.test(b), 'every path that loads activity also loads due work');
  }
}

// ── 3. The two layers still mean different things ─────────────────────────
// ⚠ The reason they are separate caches at all: three consumers read _activity
//   on the promise that it means "what HAPPENED". Merging due work into it
//   would make all three count unstarted work as done.
console.log('\nThe two layers stay apart where it matters');
{
  for (const fn of ['  function _renderTodayActivity() {',
                    '  async function getRecentActivity(studentId, days = 14) {',
                    '  function doneTodayChapterIds() {']) {
    const body = fnBody(src, fn);
    const name = fn.match(/function (\w+)/)[1];
    // getRecentActivity now mentions _due only via _loadDue(); it must not READ it.
    const readsDue = /\b_due\b(?!\s*=)/.test(body.replace(/_loadDue\(\)/g, ''));
    check(!readsDue, `${name}() still reports only what actually happened`);
  }
  const forDate = fnBody(src, '  function _activityFor(dateStr) {');
  check(/_due/.test(forDate), 'and they meet only at display');
}

console.log(failures ? `\n✗ ${failures} failure(s)` : '\n✓ all checks passed');
process.exit(failures ? 1 : 0);
