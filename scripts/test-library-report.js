'use strict';
// /api/library-report — a reader flags a library document.
//
// ⚠ THIS IS THE ONE LIBRARY ENDPOINT A CHILD CAN REACH. A child has no JWT at
//   all — they carry x-student-token — and they are the person most likely to
//   open something that should not be there. So the two identities are resolved
//   by different means, and the test covers both.
//
// ⚠ REPORTING IS NOT REMOVING. Nothing here may touch library_documents.status:
//   a pile-on must not be able to clear a shelf. The only write to the document
//   is the counter an admin sorts by.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
let failures = 0;
const pass = (m) => console.log('  ✓ ' + m);
const fail = (m) => { failures++; console.log('  ✗ ' + m); };
const check = (ok, m, d) => ok ? pass(m) : fail(m + (d !== undefined ? ' — ' + JSON.stringify(d).slice(0, 200) : ''));

const ENV = { SUPABASE_URL: 'https://db.example.com', SUPABASE_SERVICE_ROLE_KEY: 'k' };
const DOC = '11111111-1111-1111-1111-111111111111';

async function load() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-librep-'));
  fs.writeFileSync(path.join(dir, 'admin-auth.mjs'),
    "export const json = (s, b) => new Response(JSON.stringify(b), { status: s, headers: { 'Content-Type': 'application/json' } });\n");
  // The REAL student-auth, so the token path is the shipping one.
  fs.copyFileSync(path.join(ROOT, 'workers', 'lib', 'student-auth.js'), path.join(dir, 'student-auth.mjs'));
  const src = fs.readFileSync(path.join(ROOT, 'workers', 'api', 'library-report.js'), 'utf8')
    .replace("'../lib/admin-auth.js'", "'./admin-auth.mjs'")
    .replace("'../lib/student-auth.js'", "'./student-auth.mjs'");
  fs.writeFileSync(path.join(dir, 'handler.mjs'), src);
  return (await import('file://' + path.join(dir, 'handler.mjs').replace(/\\/g, '/'))).default;
}

function makeFetch({ status = 'published', alreadyReported = false, todayCount = 0, sessionValid = true } = {}) {
  const calls = { inserts: [], patches: [] };
  return {
    calls,
    fetch: async (url, init = {}) => {
      const u = String(url);
      const R = (b, s = 200) => new Response(JSON.stringify(b), { status: s });
      if (u.includes('/auth/v1/user')) return R({ id: 'user-1' });
      if (u.includes('/rest/v1/profiles')) return R([{ role: 'parent' }]);
      if (u.includes('/rest/v1/student_sessions')) return R(sessionValid ? [{ student_id: 'kid-1' }] : []);
      if (u.includes('/rest/v1/library_documents') && (init.method || 'GET') === 'GET') {
        return R([{ id: DOC, title: 'A paper', status, report_count: 2 }]);
      }
      if (u.includes('/rest/v1/library_documents')) { calls.patches.push(JSON.parse(init.body)); return R([]); }
      if (u.includes('/rest/v1/library_reports') && (init.method || 'GET') === 'GET') {
        if (u.includes('document_id=eq.')) return R(alreadyReported ? [{ id: 'r0' }] : []);
        return R(Array.from({ length: todayCount }, (_, i) => ({ id: 'r' + i })));
      }
      if (u.includes('/rest/v1/library_reports')) { calls.inserts.push(JSON.parse(init.body)); return R([{ id: 'r1' }]); }
      throw new Error('unexpected fetch: ' + u);
    },
  };
}

async function post(handler, fake, body, headers = {}) {
  const real = globalThis.fetch;
  globalThis.fetch = fake.fetch;
  try {
    const res = await handler(new Request('https://nouklass.com/api/library-report', {
      method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json', ...headers },
    }), ENV);
    return { status: res.status, body: await res.json() };
  } finally { globalThis.fetch = real; }
}

const ADULT = { Authorization: 'Bearer jwt' };
const CHILD = { 'x-student-token': 'k'.repeat(40) };
const GOOD = { document_id: DOC, reason: 'wrong-subject', detail: 'This is Grade 5, not Grade 4' };

(async () => {
  console.log('/api/library-report — a reader flags a document\n');
  const handler = await load();

  // ── Both kinds of reader ────────────────────────────────────────────────
  let fake = makeFetch();
  let r = await post(handler, fake, GOOD, ADULT);
  check(r.status === 200 && r.body.ok, 'an adult can report', r.body);
  check(fake.calls.inserts[0].reporter_kind === 'parent', 'recorded as a parent');
  check(fake.calls.inserts[0].reporter_id === 'user-1', 'with their id');

  fake = makeFetch();
  r = await post(handler, fake, GOOD, CHILD);
  check(r.status === 200 && r.body.ok, '⚠ a CHILD can report, using their student token', r.body);
  check(fake.calls.inserts[0].reporter_kind === 'student', 'recorded as a student');
  // ⚠ reporter_id is a FK to profiles and a pupil is not a profile. Writing the
  //   student id there would break the constraint; it is deliberately null.
  check(fake.calls.inserts[0].reporter_id === null, "and NOT in reporter_id, which is a profiles FK");

  fake = makeFetch({ sessionValid: false });
  r = await post(handler, fake, GOOD, CHILD);
  check(r.status === 401 && fake.calls.inserts.length === 0, 'an expired student session is refused');

  fake = makeFetch();
  r = await post(handler, fake, GOOD, {});
  check(r.status === 401 && fake.calls.inserts.length === 0,
    'a caller with NO credential is refused — an open endpoint would make the count meaningless');

  // ── Reporting must not remove ───────────────────────────────────────────
  fake = makeFetch();
  await post(handler, fake, GOOD, ADULT);
  const touchedStatus = fake.calls.patches.some(p => 'status' in p || 'published_at' in p);
  check(!touchedStatus, '⚠ a report NEVER changes the document status', fake.calls.patches);
  check(fake.calls.patches[0]?.report_count === 3, 'it raises the counter an admin sorts by', fake.calls.patches[0]);

  // ── Caps and validation ─────────────────────────────────────────────────
  fake = makeFetch({ alreadyReported: true });
  r = await post(handler, fake, GOOD, ADULT);
  check(r.status === 200 && r.body.already && fake.calls.inserts.length === 0,
    'reporting the same document twice is a no-op, answered kindly', r.body.message);

  fake = makeFetch({ todayCount: 20 });
  r = await post(handler, fake, GOOD, ADULT);
  check(r.status === 429 && fake.calls.inserts.length === 0, 'a daily cap stops one person burying everything');

  fake = makeFetch({ status: 'pending' });
  r = await post(handler, fake, GOOD, ADULT);
  check(r.status === 404, 'an unpublished document cannot be reported (and is not confirmed to exist)');

  for (const [body, what] of [
    [{ document_id: 'nope', reason: 'other' }, 'a malformed id'],
    [{ document_id: DOC, reason: 'because-i-say-so' }, 'a reason outside the list'],
  ]) {
    fake = makeFetch();
    r = await post(handler, fake, body, ADULT);
    check(r.status === 400 && fake.calls.inserts.length === 0, `${what} is refused`, r.body.error);
  }

  console.log(failures ? `\n✗ ${failures} failure(s)` : '\n✓ all checks passed');
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
