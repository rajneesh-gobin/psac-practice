'use strict';
// Every Supabase DELETE either counts the rows it removed, or is a named
// cleanup that cannot meaningfully count them.
//
// Run: node scripts/test-delete-verification.js
//
// WHY THIS EXISTS
// A DELETE whose RLS policy matches no row returns **no error and no rows**.
// So `const { error } = await sb.from(t).delete().eq('id', id)` reports a
// refusal as a success, and the UI cheerfully says the thing is gone. This is
// already written down in CLAUDE.md — "reading that as success is how a deleted
// child came back and became a duplicate" — and thirteen call sites were still
// doing it on 2026-09-08. The worst of them told a parent their child's whole
// progress had been reset and then let the server copy come back on the next
// sync, because the local wipe made `loadStudentProgress()` prefer the remote row.
//
// THE RULE
//   Deleting a specific row  -> `.select('<col>')` and treat 0 rows as failure.
//   Bulk cleanup of 0-or-many -> counting is meaningless, but the `error` must
//                                still be checked or logged, never discarded.
//
// ⚠ The exceptions are NAMED, never allowed as a count. A test that permitted
//   "up to four unverified deletes" would let a new unchecked delete take the
//   place of a fixed one and stay silent.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ENGINE = path.join(ROOT, 'engine');

// Bulk cleanups: they legitimately match zero rows (a child with no study
// sessions, a post with no replies), so a row count proves nothing. They must
// still surface a real error.
const BULK_CLEANUPS = {
  'engine/calendar.js': ['schedule_entries'],   // clearing a student's study sessions
  'engine/forum.js': ['forum_replies'],         // replies before the (verified) post delete
  'engine/store.js': ['student_progress'],      // fire-and-forget on student removal
};

let pass = 0;
const failures = [];
const ok = (cond, label, detail) => {
  if (cond) { pass++; console.log('  ok   ' + label); }
  else { failures.push(label + (detail ? ' — ' + detail : '')); console.log('  FAIL ' + label + (detail ? ' — ' + detail : '')); }
};

const files = fs.readdirSync(ENGINE).filter(f => f.endsWith('.js')).map(f => path.join(ENGINE, f));
files.push(path.join(ROOT, 'guest.js'));

const unverified = [];
const unlogged = [];
let total = 0;
let verified = 0;
let cleanups = 0;

for (const abs of files) {
  if (!fs.existsSync(abs)) continue;
  const rel = path.relative(ROOT, abs).split(path.sep).join('/');
  const lines = fs.readFileSync(abs, 'utf8').split('\n');

  for (let i = 0; i < lines.length; i++) {
    if (!/\.delete\(\)/.test(lines[i])) continue;
    total++;
    // ⚠ A generous window. The check on the row count is often several lines
    //   below the delete (an `if (delErr) …` block first), and one site proves
    //   the delete landed with `data.some(row => row.id === id)` rather than a
    //   `.length` at all. Too tight a window reports correct code as broken —
    //   which it did for store.js deleteStudent and deleteReport.
    const stmt = lines.slice(Math.max(0, i - 3), i + 16).join(' ');
    const table = (stmt.match(/\.from\(\s*'([^']+)'\s*\)\s*(?:\r?\n\s*)?\.?\s*delete/) ||
                   stmt.match(/\.from\(\s*'([^']+)'\s*\)/) || [, '?'])[1];

    if (/\.select\(/.test(stmt)) {
      verified++;
      // ⚠ Counting the rows is only half of it — the count has to be USED.
      // Counting can be a .length test, a .some() on the returned ids, or a
      // read-back that proves the row is gone.
      const usesCount = /\.length|\.some\(|\bleft\b|limit\(1\)/.test(stmt);
      if (!usesCount) unverified.push(rel + ':' + (i + 1) + '  ' + table + '  — selects but never checks the row count');
      continue;
    }

    const allowed = (BULK_CLEANUPS[rel] || []).includes(table);
    if (!allowed) {
      unverified.push(rel + ':' + (i + 1) + '  ' + table + '  — no .select(), so a refusal reads as success');
      continue;
    }
    cleanups++;
    // A named cleanup still has to notice a real failure.
    if (!/error/.test(stmt)) unlogged.push(rel + ':' + (i + 1) + '  ' + table + '  — cleanup that discards its error');
  }
}

console.log('\nSupabase deletes — refusals must not read as success\n');
console.log('  ' + total + ' delete call sites: ' + verified + ' row-counted, ' + cleanups + ' named cleanups\n');

ok(unverified.length === 0,
  'every targeted delete counts the rows it removed', '\n      ' + unverified.join('\n      '));
ok(unlogged.length === 0,
  'every named bulk cleanup still surfaces its error', '\n      ' + unlogged.join('\n      '));

// ── the specific regression that started this ───────────────────────────────
// ⚠ Slice from the declaration to the NEXT declaration, not to the first
//   "\n  }". That greedy-looking pattern actually stops at the first nested
//   block close, or runs on past the function — either way the offsets it
//   yields are meaningless, which is how the ordering check below first
//   "failed" with a read-back at 1758 and a removeItem at 539.
const auth = fs.readFileSync(path.join(ENGINE, 'auth.js'), 'utf8');
const resetStart = auth.indexOf('async function confirmResetStudentProgress');
const resetEnd = resetStart < 0 ? -1
  : (s => { const n = auth.indexOf('\n  async function ', s); const m = auth.indexOf('\n  function ', s);
            const c = [n, m].filter(x => x > -1); return c.length ? Math.min(...c) : auth.length; })(resetStart + 10);
const reset = resetStart < 0 ? '' : auth.slice(resetStart, resetEnd);
ok(reset.length > 0, 'confirmResetStudentProgress is present');
ok(/\.select\('student_id'\)/.test(reset),
  'the progress reset counts the rows it deleted');
ok(/from\('student_progress'\)\s*[\s\S]{0,120}\.select\('student_id'\)\.eq\('student_id'|\.select\('student_id'\)\.eq\('student_id', studentId\)\.limit\(1\)/.test(reset),
  'it reads the row back to tell a refusal from an empty table');
// ⚠ Order matters more than either check: the local copy must go LAST. With
//   local at zero and a surviving server row, loadStudentProgress() prefers the
//   remote copy and the "deleted" progress returns on the next sync.
// ⚠ Strip the comments first. The block above this function DESCRIBES the old
//   ordering — "a bare await, then removeItem, then an unconditional…" — so a
//   raw indexOf finds the word in the prose, not in the code, and reports
//   correct ordering as broken. It did exactly that on the first run.
const resetCode = reset.replace(/\/\/.*$/gm, '');
const idxRead = resetCode.indexOf('.limit(1)');
const idxLocal = resetCode.indexOf('removeItem');
ok(idxRead > -1 && idxLocal > -1 && idxRead < idxLocal,
  'the local cache is cleared only AFTER the server row is proven gone',
  'read-back at ' + idxRead + ', removeItem at ' + idxLocal);
ok(/could NOT be reset|Could not reset/.test(reset),
  'a refused reset says so instead of claiming success');

// ── the file-before-row ordering ────────────────────────────────────────────
// Deleting the stored object before the row is verified loses the file and
// keeps the record: a material still listed, still clickable, pointing at
// nothing.
for (const [file, fn] of [['engine/teacher.js', 'remove'], ['engine/teacher_classroom_detail.js', 'deleteFile']]) {
  const s = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const body = (s.match(new RegExp('async function ' + fn + '\\([\\s\\S]*?\\n  \\}')) || [''])[0];
  const row = body.search(/\.delete\(\)/);
  const obj = body.search(/storage\.from\(/);
  ok(row > -1 && obj > -1 && row < obj,
    file + ' ' + fn + '(): the row is deleted before the stored file',
    'row at ' + row + ', storage at ' + obj);
}

console.log('\n  ' + pass + ' passed, ' + failures.length + ' failed');
if (failures.length) { console.log('\n  failures:'); for (const f of failures) console.log('    ✗ ' + f); }
process.exit(failures.length ? 1 : 0);
