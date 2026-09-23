'use strict';
// The /api/pending-registrations GET answers TWO questions, and must never
// answer one of them while claiming the other.
//
//   state=pending — registered, email never confirmed (auth.users only)
//   state=setup   — email confirmed, but still no profiles row: they never
//                   finished family setup
//
// ⚠ WHY THIS EXISTS. The members screen reads `profiles`; this endpoint reads
//   `auth.users`. An account confirmed but never set up is in NEITHER, so it was
//   invisible to an admin - measured 2026-09-23, 15 of 64 real accounts, and the
//   six an admin had just activated by hand were among them.
//
// ⚠ The setup state needs the full set of profile ids to answer at all. A
//   PARTIAL set reports everyone missing from it as "never finished setup", so a
//   failed or truncated read must FAIL, never fall back to the other predicate.
//   That is the check that matters most here.
//
// The worker is an ES module written for wrangler and this repo's package.json
// has no "type": "module", so it cannot be imported as-is. Its two imports are
// swapped for stubs and the rest of the file - the routing, the predicates, the
// paging - is the real thing.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'workers', 'api', 'pending-registrations.js');

let failures = 0;
const fail = (m) => { failures++; console.log(`  ✗ ${m}`); };
const pass = (m) => console.log(`  ✓ ${m}`);
const eq = (label, got, want) => (JSON.stringify(got) === JSON.stringify(want)
  ? pass(`${label} → ${JSON.stringify(got)}`)
  : fail(`${label}: got ${JSON.stringify(got)}, wanted ${JSON.stringify(want)}`));

async function loadHandler() {
  const src = fs.readFileSync(SRC, 'utf8');
  const stubs = [
    "const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });",
    'const requireAdmin = async (request, env) => ({ caller: { id: "admin-1", email: "admin@example.com" }, profile: { role: "admin" }, sbUrl: env.SUPABASE_URL, sbKey: env.SUPABASE_SERVICE_ROLE_KEY });',
    'const mailConfigured = () => false;',
    'const sendMail = async () => ({ ok: true });',
    'const wrap = () => "";',
    'const escapeHtml = (s) => String(s);',
    'const siteUrl = () => "https://example.com";',
    'const mailReplyTo = () => "hello@example.com";',
    'const replyNoteText = () => "";',
  ].join('\n');
  const body = src.split(/\r?\n/).filter(l => !/^import\s/.test(l)).join('\n');
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'psac-pr-')), 'handler.mjs');
  fs.writeFileSync(file, stubs + '\n' + body);
  return (await import('file://' + file.replace(/\\/g, '/'))).default;
}

// A fake GoTrue + PostgREST built from one table of accounts.
function makeFetch(accounts, { profilesStatus = 200, profileRows = null } = {}) {
  const calls = { profiles: 0, users: 0 };
  return {
    calls,
    fetch: async (url) => {
      const u = String(url);
      if (u.includes('/rest/v1/profiles')) {
        calls.profiles++;
        if (profilesStatus !== 200) return new Response('nope', { status: profilesStatus });
        const rows = profileRows || accounts.filter(a => a.profile).map(a => ({ id: a.id }));
        const offset = Number((u.match(/offset=(\d+)/) || [])[1] || 0);
        return new Response(JSON.stringify(rows.slice(offset, offset + 1000)), { status: 200 });
      }
      if (u.includes('/auth/v1/admin/users')) {
        calls.users++;
        const page = Number((u.match(/page=(\d+)/) || [])[1] || 1);
        const users = page === 1 ? accounts.map(a => ({
          id: a.id,
          email: a.email,
          email_confirmed_at: a.confirmed ? '2026-09-01T00:00:00Z' : null,
          confirmed_at: a.confirmed ? '2026-09-01T00:00:00Z' : null,
          created_at: '2026-09-01T00:00:00Z',
          last_sign_in_at: a.signedIn ? '2026-09-02T00:00:00Z' : null,
          deleted_at: a.deleted ? '2026-09-03T00:00:00Z' : null,
          user_metadata: { full_name: a.name || '' },
        })) : [];
        return new Response(JSON.stringify({ users }), { status: 200 });
      }
      throw new Error('unexpected fetch: ' + u);
    },
  };
}

// The shapes that actually occur in production, one of each.
const ACCOUNTS = [
  { id: 'u1', email: 'unconfirmed@example.com',  confirmed: false, signedIn: false, profile: false, name: 'Never Confirmed' },
  { id: 'u2', email: 'activated@example.com',    confirmed: true,  signedIn: false, profile: false, name: 'Activated By Admin' },
  { id: 'u3', email: 'gaveup@example.com',       confirmed: true,  signedIn: true,  profile: false, name: 'Gave Up In Setup' },
  { id: 'u4', email: 'member@example.com',       confirmed: true,  signedIn: true,  profile: true,  name: 'Real Member' },
  { id: 'u5', email: 'deleted@example.com',      confirmed: true,  signedIn: true,  profile: false, name: 'Deleted', deleted: true },
];

const ENV = { SUPABASE_URL: 'https://db.example.com', SUPABASE_SERVICE_ROLE_KEY: 'service-key' };

async function get(handler, query, fake) {
  const realFetch = globalThis.fetch;
  globalThis.fetch = fake.fetch;
  try {
    const res = await handler(new Request(`https://nouklass.com/api/pending-registrations${query}`), ENV);
    return { status: res.status, body: await res.json() };
  } finally { globalThis.fetch = realFetch; }
}

(async () => {
  console.log('/api/pending-registrations — pending vs setup\n');
  const handler = await loadHandler();
  const emails = (r) => r.body.registrations.map(x => x.email).sort();

  // ── state=pending: unchanged, and the default ────────────────────────────
  let r = await get(handler, '?limit=30', makeFetch(ACCOUNTS));
  eq('no state param defaults to pending', r.body.state, 'pending');
  eq('pending lists only the unconfirmed', emails(r), ['unconfirmed@example.com']);

  r = await get(handler, '?limit=30&state=pending', makeFetch(ACCOUNTS));
  eq('state=pending lists only the unconfirmed', emails(r), ['unconfirmed@example.com']);

  // ⚠ The pending state must not pay for the profiles read it does not use.
  const pendingFake = makeFetch(ACCOUNTS);
  await get(handler, '?limit=30&state=pending', pendingFake);
  eq('state=pending does not read profiles', pendingFake.calls.profiles, 0);

  // ── state=setup: confirmed, no profile, not deleted ──────────────────────
  r = await get(handler, '?limit=30&state=setup', makeFetch(ACCOUNTS));
  eq('state is echoed back', r.body.state, 'setup');
  eq('setup lists confirmed accounts with no profile',
    emails(r), ['activated@example.com', 'gaveup@example.com']);

  if (r.body.registrations.some(x => x.email === 'member@example.com')) fail('a real member leaked into the setup list');
  else pass('an account WITH a profile is excluded');
  if (r.body.registrations.some(x => x.email === 'deleted@example.com')) fail('a deleted account leaked into the setup list');
  else pass('a deleted account is excluded');
  if (r.body.registrations.some(x => x.email === 'unconfirmed@example.com')) fail('an unconfirmed account leaked into the setup list');
  else pass('an unconfirmed account stays in the pending list only');

  // The two states must PARTITION: nobody in both, which is what makes the
  // dropdown honest.
  const pend = await get(handler, '?limit=30&state=pending', makeFetch(ACCOUNTS));
  const both = emails(pend).filter(e => emails(r).includes(e));
  eq('the two states never name the same account', both, []);

  // last_sign_in_at is what separates "never came back" from "gave up in setup".
  const gaveUp = r.body.registrations.find(x => x.email === 'gaveup@example.com');
  const activated = r.body.registrations.find(x => x.email === 'activated@example.com');
  if (gaveUp?.last_sign_in_at && activated?.last_sign_in_at === null) pass('last_sign_in_at distinguishes the two groups');
  else fail(`last_sign_in_at missing or wrong: gaveUp=${gaveUp?.last_sign_in_at}, activated=${activated?.last_sign_in_at}`);

  // ── ⚠ The one that matters: a bad profiles read must FAIL ────────────────
  r = await get(handler, '?limit=30&state=setup', makeFetch(ACCOUNTS, { profilesStatus: 500 }));
  if (r.status === 500) pass('a failed profiles read answers 500, not a wrong list');
  else fail(`a failed profiles read answered ${r.status} with ${JSON.stringify(r.body).slice(0, 120)}`);

  r = await get(handler, '?limit=30&state=setup', makeFetch(ACCOUNTS, { profileRows: [] }));
  // 3, not 4: a deleted account stays excluded on this path too.
  if (r.body.registrations?.length === 3) pass('an EMPTY profile set reports every live confirmed account (no silent fallback)');
  else fail(`empty profile set gave ${r.body.registrations?.length} rows, wanted 3`);

  // Search still applies to the new state.
  r = await get(handler, '?limit=30&state=setup&search=gaveup', makeFetch(ACCOUNTS));
  eq('search filters the setup list', emails(r), ['gaveup@example.com']);

  // Paging: a limit smaller than the match count hands back a cursor.
  r = await get(handler, '?limit=1&state=setup', makeFetch(ACCOUNTS));
  if (r.body.registrations.length === 1 && r.body.next_cursor) pass('setup paging returns a cursor');
  else fail(`setup paging: ${r.body.registrations.length} rows, cursor ${r.body.next_cursor}`);

  console.log(failures ? `\n✗ ${failures} failure(s)` : '\n✓ all checks passed');
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
