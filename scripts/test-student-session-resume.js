'use strict';
// ── Resuming a saved student session: an empty answer is a VERDICT ─────────
//
// THE BUG THIS EXISTS FOR, reported from a real device:
//   "I opened a saved person on this device, clicked a child, started doing the
//    work, and after a few minutes it logged me out" — with the message
//   "Your session has expired. Please sign in again." and then the quick PIN pad.
//
// What actually happened. ProfileInstall.prepareLaunch() restores whatever
// token that shortcut saved, WITHOUT checking it is still alive. The resume
// path in Auth then asks the server for session_version — and a dead, revoked
// or replaced x-student-token makes current_student_id() NULL, so
// students_self_read (`id = current_student_id()`) matches nothing and
// PostgREST answers 200 with []. No error. .maybeSingle() returns
// { data: null, error: null }, the old `if (sv)` was false, and the whole
// validation was skipped.
//
// The child was then signed in against a session that no longer existed. The
// dashboard, the streak and the questions all come from localStorage, so it
// LOOKS fine — until the first throttled write (_SAVE_MAX_WAIT_MS = 30s) is
// refused, which raises 'session-invalid' and drops them on the PIN pad,
// minutes into their work.
//
// ⚠ THE DIRECTION MATTERS. A clean empty answer is proof the token is dead. An
//   ERROR is not: a missing column grant answers 42501, which the client also
//   turns into an empty result, and treating that as a dead session would sign
//   every child out on one config slip. Only { data: null, error: null } counts.
//
// The function is extracted and run against a scripted stub rather than a real
// database, so this costs no network and cannot touch a real child's
// pin_attempts (a login probe against a real family can trip pin_locked_until).
//
// Usage: node scripts/test-student-session-resume.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'engine/auth.js'), 'utf8').replace(/\r\n/g, '\n');

let pass = 0, fail = 0;
const ok = m => { pass++; console.log('  ok   ' + m); };
const bad = m => { fail++; console.log('  FAIL ' + m); };
const check = (c, m, d) => c ? ok(m) : bad(m + (d ? ' — ' + d : ''));

console.log('\nResuming a saved student session\n');

// ── 1. The source carries the guard at all ─────────────────────────────────
{
  console.log('— the guard is present —');
  check(/answered && !svError && !sv/.test(SRC),
    'the resume path treats a clean empty answer as a dead session');
  check(/let sv = null, svError = null, answered = false;/.test(SRC),
    'it distinguishes "the server answered" from "the request threw"');
  check(!/const \{ data: sv \} = await _sb\.from\('students'\)/.test(SRC),
    'the old destructuring that discarded the error is gone');
  // The catch must still allow an OFFLINE resume — a child on a bad connection
  // must not be logged out for it.
  const block = SRC.slice(SRC.indexOf('Admin force-expire check'), SRC.indexOf('_activeAccount    = {'));
  check(/catch \(_\) \{ \/\* offline - allow resume \*\/ \}/.test(block),
    'a request that THREW still resumes — offline is not signed out');
}

// ── 2. Run the real branch against a scripted stub ─────────────────────────
// Lift the decision out of the function verbatim so the test exercises the
// shipped predicate, not a paraphrase of it.
console.log('\n— the decision, run —');
{
  const m = /if \(answered && !svError && !sv\) \{/.exec(SRC);
  check(!!m, 'the predicate can be located in engine/auth.js');

  const ctx = vm.createContext({});
  vm.runInContext(`globalThis.decide = (answered, svError, sv) => (answered && !svError && !sv) ? 'sign-out' : 'resume';`, ctx);
  const decide = ctx.decide;

  const CASES = [
    // answered, error,            row,                     expected,   why
    [true,  null,                 { session_version: 0 },  'resume',   'a live session reads its own row back'],
    [true,  null,                 null,                    'sign-out', 'a DEAD token: 200 with [] and no error'],
    [false, null,                 null,                    'resume',   'offline: the request threw, nothing was proved'],
    [true,  { code: '42501' },    null,                    'resume',   'a missing column grant is a config slip, not a dead token'],
    [true,  { message: 'fetch' }, null,                    'resume',   'a transport error proves nothing either'],
    [true,  null,                 { session_version: 3 },  'resume',   'a row is a row, whatever the version — that check is separate'],
  ];
  for (const [answered, err, row, want, why] of CASES) {
    const got = decide(answered, err, row);
    check(got === want, why + ' → ' + want, 'got ' + got);
  }
}

// ── 3. What the child is shown ─────────────────────────────────────────────
{
  console.log('\n— what the child sees —');
  // ⚠ Slice to the branch's OWN return, not to _activeAccount: the wider slice
  //   swallows the validation block below it, whose _setAccessExpired() contains
  //   the very word this asserts is absent.
  const bStart = SRC.indexOf('if (answered && !svError && !sv) {');
  const branch = SRC.slice(bStart, SRC.indexOf('return;', bStart) + 7);
  check(/Store\.clearStudentSession\(\)/.test(branch),
    'the dead session is cleared rather than left to fail later');
  check(/ProfileInstall\.clearStudentSessions\(sess\.id\)/.test(branch),
    "the shortcut's stale copy of the token is cleared too, or the next launch repeats it");
  check(/loginStudentProfile\(installed\)/.test(branch),
    'a child launched from their own shortcut lands on the quick PIN pad, not a cold sign-in');
  check(/showScreen\('auth'\)/.test(branch),
    'anyone else lands on the sign-in screen');
  check(/document\.body\.style\.opacity = '1'/.test(branch),
    'the boot fade is released, or the screen stays blank');
  check(!/expired/i.test(branch),
    'the copy does not say "expired" — the session was ended, and the child did nothing wrong');
  const toast = /toast\('([^']+)'/.exec(branch);
  check(!!toast && /PIN/.test(toast[1]), 'it says what to do next: ' + (toast ? '"' + toast[1] + '"' : 'no toast'));
}

// ── 4. The launcher is the source of the stale token ───────────────────────
{
  console.log('\n— the launcher —');
  const pi = fs.readFileSync(path.join(ROOT, 'engine/profile_install.js'), 'utf8');
  check(/if \(sess\?\.token && sess\.id === binding\.studentId\)/.test(pi),
    'prepareLaunch() still restores a saved token on identity alone');
  check(/clearStudentSessions/.test(pi),
    'and clearStudentSessions() exists for the resume path to call when that token turns out to be dead');
  console.log('  note prepareLaunch() cannot validate the token itself — it runs before');
  console.log('       the Supabase client exists. The resume path in auth.js is the one');
  console.log('       place that both HAS the answer and runs before the child works.');
}

// ── 5. Opening a saved shortcut whose session is gone ──────────────────────
//
// Reported as: "it tell me to choose the person and I go back to the login
// screen with no warning or message". Tapping your own face on a personal
// shortcut and landing on a bare sign-in form reads as the device having
// forgotten you. The session ending is normal; being told nothing is not.
{
  console.log('\n— the saved shortcut, session gone —');
  const routes = SRC.match(/loginStudentProfile\(profileLaunch[^)]*\)/g) || [];
  check(routes.length >= 2, 'both launcher routes in init() open the student sign-in', routes.join(' | '));
  check(routes.every(r => /_launchPinNote/.test(r)), 'BOTH routes carry an explanation', routes.join(' | '));
  check(/function loginStudentProfile\(profile, note\)/.test(SRC),
    'loginStudentProfile accepts that explanation');
  check(/if \(note && typeof toast === 'function'\) toast\(note, 5000\);/.test(SRC),
    'and actually shows it');
  const note = /_launchPinNote = b =>[\s\S]{0,120}?`([^`]+)`/.exec(SRC);
  check(!!note && /PIN/.test(note[1]),
    'the message says what to do next', note ? note[1] : 'MISSING');

  // The pad is only "quick" when the shortcut remembers BOTH username and
  // family; with either missing the child gets the full three-field form.
  const pi = fs.readFileSync(path.join(ROOT, 'engine/profile_install.js'), 'utf8');
  check(/binding\.username = studentRow\.username/.test(pi),
    'a successful login refreshes the shortcut username');
  check(/binding\.family = familyName/.test(pi),
    'and its family name, so the PIN pad stays quick');
  check(/function captureStudentSession\(sess, studentRow, familyName\)/.test(pi),
    'the family name is passed IN - the students row does not carry one');
  check(/captureStudentSession\(sess, studentRow, _signInFamilyName\(\)\)/.test(SRC),
    'auth.js supplies it from one shared helper');
  check(/const family = _signInFamilyName\(\);/.test(SRC),
    'the known-students list uses that same helper, so the two cannot disagree');
}

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
