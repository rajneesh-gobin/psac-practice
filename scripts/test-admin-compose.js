'use strict';
// /api/admin-compose — an admin writes to any address, FROM admin@nouklass.com.
//
// ⚠ WHY THE ENDPOINT EXISTS. admin@nouklass.com is a Cloudflare Email Routing
//   forwarder with no mailbox: nothing can be composed from it in a mail client,
//   so a reply to a parent used to leave from a personal Gmail — a different
//   sender from every automated message that family has ever had from us.
//
// ⚠ WHAT THIS TEST IS FOR. This is the one handler where the BROWSER supplies
//   the addresses, so the guards are the whole feature:
//     - a single recipient goes in To, two or more go in Bcc, ALWAYS
//     - one malformed address fails the entire send (no partial delivery)
//     - `enabled: false` — "send me nothing" — is a refusal, not a warning
//     - the audit row records ids and domains, never a typed address
//
// The real mailer is used for the envelope decisions that matter (from, reply-to,
// body normalising); only sendMail itself is a spy, so nothing is delivered.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
let failures = 0;
const fail = (m) => { failures++; console.log(`  ✗ ${m}`); };
const pass = (m) => console.log(`  ✓ ${m}`);
const check = (ok, m) => ok ? pass(m) : fail(m);

const ENV = {
  SUPABASE_URL: 'https://db.example.com',
  SUPABASE_SERVICE_ROLE_KEY: 'service-key',
  RESEND_API_KEY: 'resend-key',
  SITE_URL: 'https://nouklass.com',
};

// Accounts the fake GoTrue knows about, with their stored preferences.
const ACCOUNTS = [
  { id: '11111111-1111-1111-1111-111111111111', email: 'parent@example.com', preferences: {} },
  { id: '22222222-2222-2222-2222-222222222222', email: 'nomail@example.com', preferences: { email: { enabled: false } } },
  { id: '33333333-3333-3333-3333-333333333333', email: 'noannounce@example.com', preferences: { email: { announcements: false } } },
];

async function load() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-compose-'));

  // The real mailer, with sendMail swapped for a spy. Everything else —
  // mailFromHuman, mailReplyTo, normaliseBody, bodyToHtml, wrap, emailPrefs,
  // the quota helpers — is the shipping code.
  const mailer = fs.readFileSync(path.join(ROOT, 'workers', 'lib', 'mailer.js'), 'utf8')
    .replace('export async function sendMail(', 'async function _realSendMail(');
  fs.writeFileSync(path.join(dir, 'mailer.mjs'), mailer + `
export const SENT = [];
export async function sendMail(env, opts) {
  SENT.push(opts);
  if (opts.subject && opts.subject.includes('FAILHERE')) return { ok: false, error: '422:validation_error domain is not verified' };
  return { ok: true, id: 'msg_' + SENT.length };
}
`);

  const audits = [];
  fs.writeFileSync(path.join(dir, 'admin-auth.mjs'), `
export const AUDITS = ${JSON.stringify([])};
export const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
export const requireAdmin = async (request, env) => ({
  caller: { id: 'admin-id', email: 'admin@example.com' },
  profile: { role: 'admin' }, sbUrl: env.SUPABASE_URL, sbKey: env.SUPABASE_SERVICE_ROLE_KEY,
});
export const _audits = [];
export const logAdminAction = async (gate, row) => { _audits.push(row); return true; };
`);

  const handlerSrc = fs.readFileSync(path.join(ROOT, 'workers', 'api', 'admin-compose.js'), 'utf8')
    .replace("'../lib/admin-auth.js'", "'./admin-auth.mjs'")
    .replace("'../lib/mailer.js'", "'./mailer.mjs'");
  fs.writeFileSync(path.join(dir, 'handler.mjs'), handlerSrc);

  const url = (f) => 'file://' + path.join(dir, f).replace(/\\/g, '/');
  return {
    handler: (await import(url('handler.mjs'))).default,
    mailer: await import(url('mailer.mjs')),
    auth: await import(url('admin-auth.mjs')),
    audits,
  };
}

function fakeFetch() {
  return async (target, init) => {
    const u = String(target);
    if (u.includes('/auth/v1/admin/users')) {
      const page = Number((u.match(/page=(\d+)/) || [])[1] || 1);
      return new Response(JSON.stringify({ users: page === 1 ? ACCOUNTS.map(a => ({ id: a.id, email: a.email })) : [] }), { status: 200 });
    }
    if (u.includes('/rest/v1/profiles')) {
      const wanted = (u.match(/id=in\.\(([^)]*)\)/) || [])[1] || '';
      const ids = wanted.split(',').filter(Boolean);
      return new Response(JSON.stringify(
        ACCOUNTS.filter(a => ids.includes(a.id)).map(a => ({ id: a.id, preferences: a.preferences, deleted_at: null }))
      ), { status: 200 });
    }
    if (u.includes('/rest/v1/rpc/mail_quota_take')) {
      const want = JSON.parse(init.body).p_want;
      return new Response(JSON.stringify({ ok: true, granted: want, deferred: 0, remaining: 90 }), { status: 200 });
    }
    if (u.includes('/rest/v1/rpc/mail_quota_peek')) {
      return new Response(JSON.stringify({ ok: true, remaining: 90, sent_today: 10, cap: 100 }), { status: 200 });
    }
    if (u.includes('/rest/v1/rpc/mail_quota_release')) return new Response(JSON.stringify({ ok: true }), { status: 200 });
    throw new Error('unexpected fetch: ' + u);
  };
}

async function post(ctx, body) {
  const real = globalThis.fetch;
  globalThis.fetch = fakeFetch();
  try {
    const res = await ctx.handler(new Request('https://nouklass.com/api/admin-compose', {
      method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' },
    }), ENV);
    return { status: res.status, body: await res.json() };
  } finally { globalThis.fetch = real; }
}

(async () => {
  console.log('/api/admin-compose — writing from the admin address\n');
  const ctx = await load();
  const SENT = ctx.mailer.SENT;
  const AUDITS = ctx.auth._audits;
  const reset = () => { SENT.length = 0; AUDITS.length = 0; };
  const GOOD = { subject: 'Hello', message: 'First line.\n\nSecond paragraph.' };

  // ── The envelope ─────────────────────────────────────────────────────────
  reset();
  let r = await post(ctx, { ...GOOD, to: 'someone@example.com' });
  check(r.status === 200 && r.body.ok, 'a single valid address sends');
  check(SENT[0]?.to?.length === 1 && !SENT[0]?.bcc, 'one recipient goes in To');
  check(SENT[0]?.from === 'Nou Klass <admin@nouklass.com>', `From is the admin address → ${SENT[0]?.from}`);
  check(SENT[0]?.replyTo === 'admin@nouklass.com', `Reply-To is the admin address → ${SENT[0]?.replyTo}`);
  check(!JSON.stringify(SENT[0]).includes('admin@example.com'),
    "the SENDING admin's own address is never put on the message");

  // ⚠ The one that cannot be undone once it has happened.
  reset();
  r = await post(ctx, { ...GOOD, to: 'a@example.com, b@example.com, c@example.com' });
  check(r.body.ok && r.body.bcc === true, 'three addresses send');
  check(!SENT[0]?.to, 'more than one recipient NEVER goes in To');
  check(SENT[0]?.bcc?.length === 3, 'all three go in Bcc');

  // ── Address parsing ──────────────────────────────────────────────────────
  reset();
  r = await post(ctx, { ...GOOD, to: 'Jane Doe <jane@example.com>' });
  check(r.body.ok && SENT[0]?.to?.[0] === 'jane@example.com', 'a pasted "Name <addr>" is unwrapped');

  reset();
  r = await post(ctx, { ...GOOD, to: 'a@example.com\nA@example.com' });
  check(r.body.sent === 1, 'the same address twice is one recipient');

  // ⚠ ALL OR NOTHING. Partial delivery means the admin fixes the typo, presses
  //   Send again, and everyone else gets it twice.
  reset();
  r = await post(ctx, { ...GOOD, to: 'good@example.com, not-an-address' });
  check(r.status === 400 && !r.body.ok, 'one malformed address is refused');
  check(SENT.length === 0, 'and NOTHING is sent when an address is malformed');

  reset();
  r = await post(ctx, { ...GOOD, to: Array.from({ length: 21 }, (_, i) => `p${i}@example.com`).join(',') });
  check(r.status === 400 && SENT.length === 0, '21 addresses is refused (the cap is 20)');
  check(/Email selected/.test(r.body.error || ''), 'and the refusal points at the broadcast form instead');

  // ── Required fields ──────────────────────────────────────────────────────
  for (const [field, payload] of [
    ['subject', { to: 'a@example.com', message: 'x' }],
    ['message', { to: 'a@example.com', subject: 'x' }],
    ['address', { subject: 'x', message: 'x' }],
  ]) {
    reset();
    r = await post(ctx, payload);
    check(r.status === 400 && SENT.length === 0, `a missing ${field} is refused and sends nothing`);
  }

  // ── Preferences ──────────────────────────────────────────────────────────
  reset();
  r = await post(ctx, { ...GOOD, to: 'nomail@example.com' });
  check(r.status === 409 && SENT.length === 0,
    '"all email off" is a REFUSAL, not a warning — nothing is sent');
  check(/essential/.test(r.body.error || ''), 'and the refusal names the essential override');

  reset();
  r = await post(ctx, { ...GOOD, to: 'nomail@example.com', essential: true });
  check(r.body.ok && SENT.length >= 1, 'marking it essential sends to the same person');

  reset();
  r = await post(ctx, { ...GOOD, to: 'noannounce@example.com' });
  check(r.body.ok && SENT.length >= 1, 'announcements-off still receives a direct message');
  check((r.body.warnings || []).some(w => /announcements/.test(w)), 'and it is reported as a warning');

  // ── The admin's own copy ─────────────────────────────────────────────────
  reset();
  r = await post(ctx, { ...GOOD, to: 'a@example.com, b@example.com', copy_self: true });
  check(SENT.length === 2 && r.body.copy_sent, 'a copy is sent to the admin address');
  const copy = SENT[1];
  check(copy?.to === 'admin@nouklass.com', 'the copy goes to the monitored address');
  check(/a@example\.com/.test(copy?.text) && /b@example\.com/.test(copy?.text),
    '⚠ the copy carries the full recipient list — a Bcc copy could not');

  reset();
  r = await post(ctx, { ...GOOD, to: 'a@example.com', copy_self: false });
  check(SENT.length === 1 && !r.body.copy_sent, 'the copy can be turned off');

  // ── The audit row ────────────────────────────────────────────────────────
  reset();
  await post(ctx, { ...GOOD, to: 'parent@example.com, stranger@gmail.com' });
  const audit = AUDITS[0];
  check(audit?.action === 'compose_sent', 'a compose_sent audit row is written');
  check(/^[a-z][a-z_]{2,39}$/.test(audit?.action || ''), 'the action name matches what admin_log_action() accepts');
  const serialised = JSON.stringify(audit);
  check(!serialised.includes('stranger@gmail.com') && !serialised.includes('parent@example.com'),
    '⚠ no typed address reaches the append-only audit row');
  check(audit?.detail?.member_ids?.length === 1, 'a recipient who IS a member is recorded by id');
  check(audit?.detail?.other_domains?.['gmail.com'] === 1, 'a non-member is recorded as a domain and a count');

  // ── Dry run ──────────────────────────────────────────────────────────────
  reset();
  r = await post(ctx, { ...GOOD, to: 'a@example.com, nomail@example.com', dry_run: true });
  check(r.body.ok && r.body.dry_run && SENT.length === 0, 'a dry run sends nothing');
  check(r.body.would_send === 1 && (r.body.blocked || []).length === 1,
    'and reports who would be blocked before anything goes out');

  // ── A provider failure is reported as one ────────────────────────────────
  reset();
  r = await post(ctx, { to: 'a@example.com', subject: 'FAILHERE', message: 'x' });
  check(r.status === 502 && !r.body.ok, 'a provider refusal answers 502, not a fake success');
  check(/not verified/.test(r.body.error || ''), 'and passes the provider’s own words through');
  check(AUDITS[0]?.detail?.ok === false, 'a failed send is still audited');

  console.log(failures ? `\n✗ ${failures} failure(s)` : '\n✓ all checks passed');
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
