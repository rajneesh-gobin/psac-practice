#!/usr/bin/env node
// Auth._emailErrorText(), exercised against the exact shapes GoTrue returns.
//
// Every sign-up, resend and password reset costs one email out of one shared
// quota, so what a blocked parent is told matters. Two very different
// situations arrive as the same 429 and must not read the same, and an error
// this mapper does not recognise must keep its ORIGINAL wording - a friendly
// invented message over an unknown fault is how a real bug becomes
// unreportable.
//
// Extracted and run in a vm rather than loading auth.js, which needs a DOM.
// Run: node scripts/test-email-errors.js
const fs = require('fs'), vm = require('vm');
const src = fs.readFileSync('engine/auth.js', 'utf8');
const m = src.match(/  function _emailErrorText\(error, what\) \{[\s\S]*?\n  \}\n/);
if (!m) { console.error('could not extract _emailErrorText'); process.exit(1); }
const ctx = vm.createContext({});
vm.runInContext(m[0].replace(/^  function/, 'function') + ';globalThis.f=_emailErrorText;', ctx);
const f = ctx.f;

let pass = 0, fail = 0;
function ck(name, got, wantRe) {
  const ok = wantRe.test(got);
  console.log((ok ? '  PASS  ' : '  FAIL  ') + name + (ok ? '' : '\n          got: ' + got));
  ok ? pass++ : fail++;
}

ck('project-wide hourly cap names OUR limit, not the user',
  f({ code: 'over_email_send_rate_limit', message: 'email rate limit exceeded' }),
  /hourly limit[\s\S]*on our side, not yours/);
// The same mapper serves sign-up AND password recovery. One generic sentence
// gets one of them wrong: it told someone who had forgotten their password
// that we would "activate your account by hand".
ck('the cap message names the password reset when that is what failed',
  f({ code: 'over_email_send_rate_limit', message: 'email rate limit exceeded' }, 'password-reset link'),
  /could not send your password-reset link/);
ck('...and the activation email when THAT is what failed',
  f({ code: 'over_email_send_rate_limit', message: 'email rate limit exceeded' }, 'activation email'),
  /could not send your activation email/);
ck('a reset failure never offers to activate an account',
  f({ code: 'over_email_send_rate_limit', message: 'email rate limit exceeded' }, 'password-reset link'),
  /^(?!.*activate your account)/);
ck('the per-address wait names the right thing too',
  f({ code: 'over_request_rate_limit', message: 'you can only request this after 12 seconds.' }, 'password-reset link'),
  /wait 12 seconds before asking for another password-reset link/);
ck('the same cap without a code is still recognised by message',
  f({ message: 'email rate limit exceeded' }),
  /hourly limit/);
ck('per-address floor quotes the actual wait',
  f({ code: 'over_request_rate_limit',
      message: 'For security purposes, you can only request this after 47 seconds.' }),
  /wait 47 seconds/);
ck('per-address floor with no number still says a minute',
  f({ code: 'over_request_rate_limit', message: 'too many requests' }),
  /wait a minute/);
ck('an unrelated error keeps its ORIGINAL wording',
  f({ code: 'invalid_credentials', message: 'Invalid login credentials' }),
  /^Invalid login credentials$/);
ck('a weak-password error is not swallowed',
  f({ message: 'Password should be at least 6 characters' }),
  /^Password should be at least 6 characters$/);
ck('an empty error still says something',
  f({}), /Something went wrong/);

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
