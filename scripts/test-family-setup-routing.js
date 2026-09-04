'use strict';
// Auth._needsFamilySetup(), the gate that decides whether a signed-in adult is
// sent back to the family-setup screen.
//
// It has to be wrong in neither direction, and each direction fails differently:
//   • too eager  -> a TEACHER, who has role 'parent' until an admin approves
//     them and has no children at all, is dumped on a screen demanding a
//     child's name, username and 4-digit PIN before they can go anywhere. It
//     also means routing a FAILED families read into setup, where the retry
//     writes a second family over one that already exists - not undoable.
//   • too shy    -> a parent whose setup was interrupted is stuck for ever on a
//     dashboard whose only message is "your family record could not be loaded".
//
// Extracted and run in a vm rather than loading auth.js, which needs a DOM.
//
// Run: node scripts/test-family-setup-routing.js
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

// ⚠ Normalise the line endings BEFORE matching. engine/auth.js is CRLF, and a
// pattern anchored on `\n  }\n` matches nothing in it — which this file then
// reported as "could not extract _needsFamilySetup", i.e. as though the function
// had been renamed or deleted. It had not; the harness had simply gone blind,
// and stayed that way. Exactly the trap CLAUDE.md records for multi-line
// searches in CRLF files.
const SRC = fs.readFileSync(path.join(ROOT, 'engine/auth.js'), 'utf8')
  .replace(/^﻿/, '').replace(/\r\n/g, '\n');
const block = SRC.match(/  function _needsFamilySetup\(profile\) \{[\s\S]*?\n  \}\n/);
if (!block) {
  console.error('could not extract _needsFamilySetup from engine/auth.js.');
  console.error(SRC.includes('_needsFamilySetup')
    ? '  The name is still there, so it is the SHAPE that moved (signature, indentation,\n'
      + '  or the closing brace) - update the pattern above, do not delete the checks.'
    : '  The name is gone entirely - the gate was renamed or removed.');
  process.exit(1);
}

// The function reads two things from its closure: _parentUser and Store.
function make(familyError, parentUser) {
  const ctx = vm.createContext({
    Store: { lastFamilyError: () => familyError },
    _parentUser: parentUser || {},
  });
  vm.runInContext(block[0] + ';globalThis.f = _needsFamilySetup;', ctx);
  return ctx.f;
}

let pass = 0, fail = 0;
function ck(name, got, want) {
  const ok = got === want;
  console.log((ok ? '  PASS  ' : '  FAIL  ') + name + (ok ? '' : `  (got ${got}, want ${want})`));
  ok ? pass++ : fail++;
}

const parent  = { role: 'parent', teacher_status: 'none' };
const noStatus = { role: 'parent' };            // an un-migrated row, no column
const pending = { role: 'parent', teacher_status: 'pending' };
const rejected = { role: 'parent', teacher_status: 'rejected' };
const teacher = { role: 'teacher', teacher_status: 'approved' };
const admin   = { role: 'admin',  teacher_status: 'none' };

console.log('should be sent to family setup');
ck('an ordinary parent with no family', make(null)(parent), true);
ck('...and one whose row predates teacher_status', make(null)(noStatus), true);

console.log('should NOT be');
// The regression this file exists for.
ck('a teacher awaiting approval (role is still parent)', make(null)(pending), false);
ck('a REJECTED teacher applicant', make(null)(rejected), false);
ck('someone who signed up on the teacher tab, even if the status write failed',
  make(null, { user_metadata: { role: 'teacher' } })(parent), false);
ck('an approved teacher', make(null)(teacher), false);
ck('an admin, who has no family of their own by design', make(null)(admin), false);
// ⚠ The one that would write a second family over an existing one.
ck('anyone at all when the families query FAILED, not answered "none"',
  make('permission denied for table families')(parent), false);
ck('a missing profile', make(null)(null), false);
ck('a profile with no role', make(null)({}), false);

console.log('');
console.log(pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
