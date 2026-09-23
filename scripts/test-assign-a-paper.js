'use strict';
// Assigning work — a chapter or a library paper, optionally for a day.
//
// ⚠ TWO GAPS THIS COVERS, and the second was the wider one:
//   · a library document could not be assigned at all;
//   · `due_date` existed on student_assignments and was referenced NOWHERE in
//     engine/ or workers/ — createAssignment() never accepted a date and never
//     wrote one, so "assign it for Tuesday" did not work for chapter practice
//     either. Both live rows had due_date NULL.
//
// The Store functions are pulled out of engine/store.js and run against a fake
// PostgREST, so nothing here touches the real database.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
let failures = 0;
const pass = (m) => console.log('  ✓ ' + m);
const fail = (m) => { failures++; console.log('  ✗ ' + m); };
const check = (ok, m, d) => ok ? pass(m) : fail(m + (d !== undefined ? ' — ' + JSON.stringify(d).slice(0, 200) : ''));

// ⚠ Walk the parameter list by paren depth before the body brace: a
//   destructured parameter balances on its own and the first ")" can sit inside
//   a default value.
function fnBody(src, header) {
  const start = src.indexOf(header);
  if (start < 0) throw new Error('not found: ' + header);
  let i = src.indexOf('(', start), parens = 0;
  for (; i < src.length; i++) {
    if (src[i] === '(') parens++;
    else if (src[i] === ')' && --parens === 0) break;
  }
  let depth = 0;
  for (let j = src.indexOf('{', i); j < src.length; j++) {
    if (src[j] === '{') depth++;
    else if (src[j] === '}' && --depth === 0) return src.slice(start, j + 1);
  }
  throw new Error('unbalanced: ' + header);
}

const src = fs.readFileSync(path.join(ROOT, 'engine', 'store.js'), 'utf8');

// A fake PostgREST that records inserts and can be told to refuse columns it
// "does not have", which is what the tier fallbacks exist for.
function makeSb(missing = []) {
  const inserts = [];
  const table = () => ({
    insert(row) {
      const bad = missing.filter(c => c in row);
      return {
        select() {
          return {
            single: async () => bad.length
              ? { data: null, error: { message: `column ${bad[0]} does not exist` } }
              : (inserts.push(row), { data: { id: 'row-' + inserts.length, ...row }, error: null }),
          };
        },
      };
    },
  });
  return { inserts, from: () => table() };
}

const ctx = {
  console,
  _sb: null,
  _ASGN_COLS: 'id',
  _ASGN_COLS_NEW: 'id',
  _ASGN_COLS_DUE: 'id',
  _muDayKey: () => '2026-09-23',
};
vm.createContext(ctx);
vm.runInContext(fnBody(src, '  async function createAssignment(studentId, parentId, opts) {').trim(), ctx);
vm.runInContext(fnBody(src, '  async function createAssignments(studentIds, parentId, opts) {').trim(), ctx);
vm.runInContext(fnBody(src, '  function assignmentDueState(assignment, todayKey) {').trim(), ctx);
vm.runInContext(fnBody(src, '  function sortAssignments(list) {').trim(), ctx);

(async () => {
  console.log('Assigning work — chapters, papers and due dates\n');

  // ── A paper, for a day ──────────────────────────────────────────────────
  let sb = makeSb(); ctx._sb = sb;
  let row = await ctx.createAssignment('kid-1', 'parent-1',
    { libraryDocumentId: 'doc-1', dueDate: '2026-09-25', note: 'Try this one' });
  check(!!row, 'a library paper can be assigned');
  check(sb.inserts[0].library_document_id === 'doc-1', 'the paper is recorded on the row');
  check(sb.inserts[0].due_date === '2026-09-25', '⚠ the due date is actually written — it never was before');
  check(sb.inserts[0].chapter_id === null, 'and it is not also a chapter task');

  // ── A chapter, with a date ──────────────────────────────────────────────
  sb = makeSb(); ctx._sb = sb;
  await ctx.createAssignment('kid-1', 'parent-1', { subjectId: 'grade6-maths', chapterId: 'ratio', dueDate: '2026-09-24' });
  check(sb.inserts[0].chapter_id === 'ratio' && sb.inserts[0].due_date === '2026-09-24',
    'ordinary chapter practice can be dated too');

  // ── No date means no deadline ───────────────────────────────────────────
  sb = makeSb(); ctx._sb = sb;
  await ctx.createAssignment('kid-1', 'parent-1', { chapterId: 'ratio' });
  check(sb.inserts[0].due_date === null,
    'a missing date stores NULL, not today — an invented deadline goes overdue and nags');

  // ── The one combination the database refuses ────────────────────────────
  sb = makeSb(); ctx._sb = sb;
  row = await ctx.createAssignment('kid-1', 'parent-1', { chapterId: 'ratio', libraryDocumentId: 'doc-1' });
  check(row === null && sb.inserts.length === 0,
    'a chapter AND a paper on one row is refused before it reaches the database');

  // ── Degrading, and the one case that must NOT degrade ───────────────────
  sb = makeSb(['due_date', 'library_document_id']); ctx._sb = sb;
  await ctx.createAssignment('kid-1', 'parent-1', { chapterId: 'ratio' });
  check(sb.inserts.length === 1 && !('due_date' in sb.inserts[0]),
    'on an un-migrated database a chapter assignment still works');

  sb = makeSb(['due_date', 'library_document_id']); ctx._sb = sb;
  row = await ctx.createAssignment('kid-1', 'parent-1', { libraryDocumentId: 'doc-1' });
  check(row === null && sb.inserts.length === 0,
    '⚠ but a PAPER never degrades into a row with no paper in it');

  sb = makeSb(['due_date', 'library_document_id']); ctx._sb = sb;
  row = await ctx.createAssignment('kid-1', 'parent-1', { chapterId: 'ratio', dueDate: '2026-09-25' });
  check(row === null, 'and a DATED request never degrades into an undated row');

  // ── Several children at once ────────────────────────────────────────────
  sb = makeSb(); ctx._sb = sb;
  const many = await ctx.createAssignments(['a', 'b', 'c', 'b'], 'parent-1', { libraryDocumentId: 'doc-1' });
  check(many.ok && many.assigned === 3 && sb.inserts.length === 3,
    'one paper goes to several children in one call, duplicates collapsed');

  // ── What "due" means, in Mauritius days ─────────────────────────────────
  const state = (d) => ctx.assignmentDueState({ due_date: d }, '2026-09-23');
  check(state(null) === 'anytime', 'no date is "anytime", never overdue');
  check(state('2026-09-22') === 'overdue', 'yesterday is overdue');
  check(state('2026-09-23') === 'today', 'today is today');
  check(state('2026-09-24') === 'upcoming', 'tomorrow is upcoming');

  // ⚠ The fallback when app.js has not loaded must still be Mauritius time. A
  //   UTC fallback calls work overdue every evening from 20:00 local.
  const noHelper = { ...ctx, _muDayKey: undefined };
  vm.createContext(noHelper);
  vm.runInContext(fnBody(src, '  function assignmentDueState(assignment, todayKey) {').trim(), noHelper);
  const muToday = new Date(Date.now() + 4 * 3600 * 1000).toISOString().slice(0, 10);
  check(noHelper.assignmentDueState({ due_date: muToday }) === 'today',
    '⚠ the fallback uses Mauritius time, not UTC');

  // ── Order ───────────────────────────────────────────────────────────────
  const sorted = ctx.sortAssignments([
    { id: 'none', due_date: null, created_at: '2026-01-01' },
    { id: 'late', due_date: '2026-09-30' },
    { id: 'soon', due_date: '2026-09-24' },
  ]).map(a => a.id);
  check(sorted.join() === 'soon,late,none', 'soonest first, undated last', sorted);

  console.log(failures ? `\n✗ ${failures} failure(s)` : '\n✓ all checks passed');
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
