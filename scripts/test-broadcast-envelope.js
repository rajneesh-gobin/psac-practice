'use strict';
// ── What an admin broadcast actually puts on the wire ───────────────────────
// Run: node scripts/test-broadcast-envelope.js
//
// Runs the REAL workers/api/admin-broadcast.js handler with every fetch it
// makes stubbed — Supabase auth, the profiles read, the address book, the
// budget RPC and Resend — and inspects the one payload that reaches the
// provider. Reading the source cannot answer these: the headers are assembled
// in mailer.js from three separate arguments.
//
// ⚠ THE THREE THINGS THAT MUST HOLD:
//   1. Every recipient is in Bcc. A To: list of parent addresses is a data
//      breach dressed as a newsletter.
//   2. From and Reply-To are the shared monitored address. A message that
//      invites a reply must not come from "noreply", and a reply must land in
//      one inbox the team reads rather than wherever the sending admin's
//      personal mail goes.
//   3. The sending admin's OWN address appears nowhere on the message. It was
//      the Reply-To until 2026-09-17, which handed every parent the personal
//      address of whoever pressed Send.
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const SB = 'https://sb.test';
const ADMIN_PERSONAL = 'the.admin.personally@gmail.com';

const ids = [
  '11111111-1111-1111-1111-111111111111',   // wants announcements
  '22222222-2222-2222-2222-222222222222',   // wants announcements
  '33333333-3333-3333-3333-333333333333',   // has switched them off
];
const addresses = {
  [ids[0]]: 'parent.one@example.com',
  [ids[1]]: 'parent.two@example.com',
  [ids[2]]: 'parent.three@example.com',
};

let checks = 0, fails = 0;
const ok = (label, cond, detail) => {
  checks++;
  if (cond) console.log('ok   ' + label);
  else { fails++; console.log('FAIL ' + label + (detail === undefined ? '' : `\n     ${JSON.stringify(detail)}`)); }
};

const sentPayloads = [];

function reply(body, status = 200) {
  return Promise.resolve(new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } }));
}

global.fetch = (url, options = {}) => {
  const u = String(url);
  if (u === 'https://api.resend.com/emails') {
    sentPayloads.push(JSON.parse(options.body));
    return reply({ id: 'msg_' + sentPayloads.length });
  }
  if (u.startsWith(`${SB}/auth/v1/user`)) return reply({ id: 'admin-uuid', email: ADMIN_PERSONAL });
  if (u.startsWith(`${SB}/rest/v1/profiles?id=eq.`)) return reply([{ role: 'admin', is_super_admin: true, disabled: false }]);
  if (u.startsWith(`${SB}/rest/v1/profiles?id=in.`)) {
    return reply([
      { id: ids[0], preferences: {}, deleted_at: null },
      { id: ids[1], preferences: {}, deleted_at: null },
      { id: ids[2], preferences: { email: { announcements: false } }, deleted_at: null },
    ]);
  }
  if (u.startsWith(`${SB}/auth/v1/admin/users`)) {
    return reply({ users: ids.map(id => ({ id, email: addresses[id] })) });
  }
  if (u.endsWith('/rpc/mail_quota_take')) {
    const want = JSON.parse(options.body).p_want;
    return reply({ ok: true, granted: want, deferred: 0, remaining: 80 - want });
  }
  if (u.includes('/rpc/mail_quota')) return reply({ ok: true });
  if (u.endsWith('/rpc/admin_log_action')) return reply({});
  return reply({ error: 'unstubbed: ' + u }, 500);
};

const env = {
  SUPABASE_URL: SB,
  SUPABASE_SERVICE_ROLE_KEY: 'service-role-key',
  RESEND_API_KEY: 're_test',
  SITE_URL: 'https://nouklass.com',
};

function request(body) {
  return new Request('https://nouklass.com/api/admin-broadcast', {
    method: 'POST',
    headers: { authorization: 'Bearer jwt', 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

(async () => {
  const { default: handler } = await import(
    pathToFileURL(process.env.BROADCAST_JS || path.join(ROOT, 'workers/api/admin-broadcast.js')).href);

  const res = await handler(request({
    user_ids: ids, subject: 'Grade 6 Science is live', message: 'Hello.\n\nSecond paragraph.',
  }), env);
  const out = await res.json();

  ok('the send succeeds', res.status === 200 && out.ok === true, out);
  ok('one message carries the whole batch', sentPayloads.length === 1, sentPayloads.length);

  const mail = sentPayloads[0] || {};
  ok('From is the monitored admin address, not noreply@',
    mail.from === 'Nou Klass <admin@nouklass.com>', mail.from);
  ok('Reply-To is the same monitored address',
    mail.reply_to === 'admin@nouklass.com', mail.reply_to);

  // ⚠ The whole payload, not just the two header fields: the address must not
  //   ride along in the body, a header, or the stand-in To either.
  ok("the sending admin's personal address is nowhere on the message",
    !JSON.stringify(mail).includes(ADMIN_PERSONAL));

  ok('every recipient is in Bcc',
    JSON.stringify(mail.bcc) === JSON.stringify(['parent.one@example.com', 'parent.two@example.com']), mail.bcc);
  ok('the stand-in To is the From address, so no recipient is exposed',
    JSON.stringify(mail.to) === JSON.stringify(['admin@nouklass.com']), mail.to);
  ok('nobody who opted out was sent to',
    !JSON.stringify(mail).includes('parent.three@example.com') && out.skipped.opted_out === 1, out.skipped);

  // ── Essential notice reaches the opted-out account, and nothing else changes
  sentPayloads.length = 0;
  const res2 = await handler(request({
    user_ids: ids, subject: 'About your account', message: 'Billing.', essential: true,
  }), env);
  const out2 = await res2.json();
  const mail2 = sentPayloads[0] || {};
  ok('an essential notice also reaches the opted-out account',
    out2.sent === 3 && (mail2.bcc || []).includes('parent.three@example.com'), out2);
  ok('and it still comes from the monitored address',
    mail2.from === 'Nou Klass <admin@nouklass.com>' && mail2.reply_to === 'admin@nouklass.com');
  ok("and still carries no personal address", !JSON.stringify(mail2).includes(ADMIN_PERSONAL));

  console.log(`\n${checks - fails}/${checks} envelope checks passed.`);
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
