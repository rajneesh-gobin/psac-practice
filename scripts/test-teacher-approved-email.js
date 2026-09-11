'use strict';
// netlify/functions/teacher-approved-email.js with the admin gate, the database
// and the mailer stubbed, plus the wiring around it.
//
// The question: can this endpoint mail anyone who is NOT an approved teacher, or
// send anything but its own fixed text? And when a send fails, does it say why?
//
// Usage: node scripts/test-teacher-approved-email.js

const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LIB  = f => path.join(ROOT, 'netlify', 'lib', f);

let gate, profile, profileErr, email, mailRes, sent;

function stub(file, exports) {
  const id = require.resolve(file);
  require.cache[id] = { id, filename: id, loaded: true, exports };
}
const json = (statusCode, body) => ({ statusCode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
const sb = {
  from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: profile, error: profileErr }) }) }) }),
  auth: { admin: { getUserById: async () => email
    ? { data: { user: { email } }, error: null }
    : { data: null, error: { status: 404, code: 'user_not_found' } } } },
};
stub(LIB('admin-auth.js'), { requireAdmin: async () => gate, json });
stub(LIB('mailer.js'), { sendMail: async m => { sent.push(m); return mailRes; }, logFailure: () => {} });

const { handler } = require(path.join(ROOT, 'netlify', 'functions', 'teacher-approved-email.js'));

const ID = '11111111-1111-1111-1111-111111111111';
let pass = 0, fail = 0;
function check(label, ok, detail) {
  if (ok) { pass++; console.log('  PASS  ' + label); }
  else    { fail++; console.log('  FAIL  ' + label + (detail ? '  -> ' + detail : '')); }
}
function reset() {
  gate = { sb }; profileErr = null; sent = [];
  profile = { full_name: 'Tara <b>Ramen</b>', role: 'teacher', teacher_status: 'approved' };
  email = 'tara@example.test';
  mailRes = { ok: true, id: 'x' };
}
const call = (body, method = 'POST') => handler({ httpMethod: method, headers: {}, body: JSON.stringify(body) });
const bodyOf = r => JSON.parse(r.body || '{}');

(async () => {
  console.log('\nteacher-approved-email');

  reset();
  let r = await call({ user_id: ID }, 'GET');
  check('GET is refused', r.statusCode === 405 && sent.length === 0);

  reset();
  gate = { error: json(403, { error: 'Administrator access is required.' }) };
  r = await call({ user_id: ID });
  check('a non-admin gets the gate\'s answer and nothing is sent', r.statusCode === 403 && sent.length === 0);

  reset();
  r = await call({ user_id: 'not-a-uuid' });
  check('a malformed id is refused', r.statusCode === 400 && sent.length === 0);

  for (const [label, p] of [
    ['a PENDING applicant',           { full_name: 'P', role: 'parent',  teacher_status: 'pending' }],
    ['a parent carrying approved',    { full_name: 'P', role: 'parent',  teacher_status: 'approved' }],
    ['a SUSPENDED teacher',           { full_name: 'P', role: 'teacher', teacher_status: 'suspended' }],
    ['an account that does not exist', null],
  ]) {
    reset(); profile = p;
    r = await call({ user_id: ID });
    check(`${label} is not mailed`, r.statusCode === 409 && bodyOf(r).error === 'not_approved' && sent.length === 0,
          `${r.statusCode} ${r.body} sent=${sent.length}`);
  }

  reset(); profileErr = { message: 'boom' };
  r = await call({ user_id: ID });
  check('a failed profile read sends nothing', r.statusCode === 502 && sent.length === 0);

  reset(); email = null;
  r = await call({ user_id: ID });
  check('no address on file: no_email, nothing sent', r.statusCode === 404 && bodyOf(r).error === 'no_email' && sent.length === 0);

  reset();
  r = await call({ user_id: ID, subject: 'INJECTED', html: '<h1>INJECTED</h1>', to: 'victim@example.test' });
  const m = sent[0] || {};
  check('an approved teacher is mailed once', r.statusCode === 200 && bodyOf(r).sent === true && sent.length === 1);
  check('...to the address on the ACCOUNT, not one in the request', m.to === 'tara@example.test');
  check('...with the fixed subject, ignoring the request', m.subject === 'Your PSAC Exam Practice teacher account is approved');
  check('...and nothing from the request body in the html', !/INJECTED/.test(m.html || '') && !/INJECTED/.test(m.text || ''));
  check('the display name is escaped in the html', /Hello Tara,/.test(m.html || '') && !/<b>Ramen/.test(m.html || ''));

  reset(); profile.full_name = '<img src=x onerror=alert(1)>';
  await call({ user_id: ID });
  check('a hostile first name is escaped', !/<img/.test(sent[0]?.html || ''), sent[0]?.html?.slice(0, 200));

  reset(); mailRes = { ok: false, error: 'not_configured' };
  r = await call({ user_id: ID });
  check('mail not configured says not_configured', r.statusCode === 502 && bodyOf(r).error === 'not_configured');

  reset(); mailRes = { ok: false, error: '535-5.7.8 bad credentials', code: '535' };
  r = await call({ user_id: ID });
  check('a refused send says send_failed', r.statusCode === 502 && bodyOf(r).error === 'send_failed');

  console.log('\nwiring');
  const toml  = fs.readFileSync(path.join(ROOT, 'netlify.toml'), 'utf8');
  const admin = fs.readFileSync(path.join(ROOT, 'engine', 'admin.js'), 'utf8');
  const auth  = fs.readFileSync(path.join(ROOT, 'engine', 'auth.js'), 'utf8');
  const html  = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const mig   = fs.readFileSync(path.join(ROOT, 'migrations', '20260911_teacher_auto_approve.sql'), 'utf8');

  check('netlify.toml routes /api/teacher-approved-email',
        /from\s*=\s*"\/api\/teacher-approved-email"\s*\r?\n\s*to\s*=\s*"\/\.netlify\/functions\/teacher-approved-email"/.test(toml));
  const setFn = admin.slice(admin.indexOf('async function setTeacherStatus'), admin.indexOf('async function _emailTeacherApproved'));
  check('setTeacherStatus emails only on a FIRST approval (not the tier toggle)',
        /status === 'approved' && !wasApproved/.test(setFn) && /_emailTeacherApproved\(userId\)/.test(setFn));
  check('the admin toggle is exported and in the page',
        /toggleTeacherAutoApprove,/.test(admin) && /id="admin-teacher-auto-toggle"/.test(html)
        && /AdminPanel\.toggleTeacherAutoApprove\(this\.checked\)/.test(html));
  check('a dashboard application handles auto_approved', /data\.note === 'auto_approved'/.test(auth));
  check('the switch is compared as JSON true, never cast', /'true'::jsonb/.test(mig) && !/teacher_auto_approve'\)::boolean/.test(mig));

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
