'use strict';
// The daily send budget.
//
// ⚠ THE FAILURE THIS PREVENTS is partial delivery with no record. Resend's free
//   tier allows 100 a day; without a budget the 101st message fails AT THE
//   PROVIDER part-way through a broadcast — some parents have the message, some
//   do not, and the only evidence is a failure count that names nobody.
//
// ⚠ Three properties have to hold together, and each is easy to lose alone:
//     1. RESERVE BEFORE SENDING (under a row lock), or two senders double-spend.
//     2. RELEASE WHAT WAS NOT SPENT, or a provider outage burns the day for
//        nothing.
//     3. FAIL OPEN, because blocking all mail on a bookkeeping error is worse
//        than briefly exceeding a cap the provider enforces anyway.
//
// Run: node scripts/test-mail-budget.js
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
let checks = 0, fails = 0;
const ok = (label, cond) => { checks++; if (!cond) { fails++; console.log('  FAIL  ' + label); } };

const sql       = fs.readFileSync(path.join(ROOT, 'migrations/20260916_mail_quota.sql'), 'utf8');
const recSql    = fs.readFileSync(path.join(ROOT, 'migrations/20260916_mail_quota_record.sql'), 'utf8');
const mailer    = fs.readFileSync(path.join(ROOT, 'workers/lib/mailer.js'), 'utf8');
const broadcast = fs.readFileSync(path.join(ROOT, 'workers/api/admin-broadcast.js'), 'utf8');
const digest    = fs.readFileSync(path.join(ROOT, 'workers/api/weekly-digest.js'), 'utf8');
const adminSrc  = fs.readFileSync(path.join(ROOT, 'engine/admin.js'), 'utf8');

// ── 1. The reservation is atomic ────────────────────────────────────────────
ok('mail_quota_take locks the row', /FOR UPDATE/.test(sql));
ok('it grants at most what is left', /least\(p_want, v_ceiling - v_sent\)/.test(sql));
ok('it never grants a negative', /greatest\(0, least\(p_want/.test(sql));
ok('it reports what it could not grant', /'deferred',\s+p_want - v_granted/.test(sql));

// ⚠ current_date, NOT the Mauritius day key. Every other day boundary in this
//   project is Mauritius local (it describes when a CHILD worked); this one
//   describes when a PROVIDER's counter resets, and Resend resets on UTC.
ok('the day boundary is UTC, matching the provider', /current_date/.test(sql));
ok('and the deviation from _muDayKey is explained', /Mauritius day key/i.test(sql));

// ── 2. Transactional mail is protected from bulk ────────────────────────────
// ⚠ An account-activation email must not fail because a newsletter used the
//   quota first: one is a courtesy, the other is somebody locked out.
ok('a reserve is held back from bulk', /p_reserve/.test(sql));
ok('the ceiling subtracts the reserve', /coalesce\(p_cap, 100\) - greatest\(0, coalesce\(p_reserve, 0\)\)/.test(sql));
ok('the broadcast asks as BULK', /quotaTake\(env, recipients\.length, \{ bulk: true \}\)/.test(broadcast));
ok('the digest asks as BULK too', /quotaTake\(env, due\.length, \{ bulk: true \}\)/.test(digest));
ok('mailer exposes a bulk flag so transactional can opt out', /bulk = true/.test(mailer));

// ── 3. Unspent reservations are returned ────────────────────────────────────
ok('mail_quota_release exists', /FUNCTION public\.mail_quota_release/.test(sql));
ok('and never drives the counter negative', /greatest\(0, sent - p_n\)/.test(sql));
ok('the broadcast releases what it did not send',
  /const unspent = allowed\.length - sent;[\s\S]{0,120}quotaRelease\(env, unspent\)/.test(broadcast));
ok('the digest does too',
  /const unspent = budgeted\.length - sent;[\s\S]{0,120}quotaRelease\(env, unspent\)/.test(digest));

// ── 4. It fails OPEN ────────────────────────────────────────────────────────
ok('an unavailable RPC grants the request rather than blocking mail',
  /granted: n, deferred: 0[\s\S]{0,60}unknown/.test(mailer) || /unknown: true, granted: n/.test(mailer));
ok('and the caller is told the budget is unknown', /budget_unknown/.test(broadcast));
ok('the admin UI says so rather than showing a wrong number',
  /daily email budget could not be read/.test(adminSrc));

// ── 5. Only the Worker can move the counter ─────────────────────────────────
// ⚠ A browser that could reserve quota could exhaust the day for free.
ok('the functions are revoked from anon and authenticated',
  /REVOKE ALL ON FUNCTION public\.mail_quota_take\(integer, integer, integer\)\s+FROM PUBLIC, anon, authenticated;/.test(sql));
ok('and granted only to service_role',
  /GRANT EXECUTE ON FUNCTION public\.mail_quota_take\(integer, integer, integer\) TO service_role;/.test(sql));
ok('the table itself has RLS on', /ALTER TABLE public\.mail_quota ENABLE ROW LEVEL SECURITY/.test(sql));
ok('and no write grant beyond service_role',
  /GRANT SELECT, INSERT, UPDATE ON public\.mail_quota TO service_role;/.test(sql)
  && !/TO authenticated/.test(sql.slice(sql.indexOf('GRANT SELECT, INSERT, UPDATE ON public.mail_quota'))));

// ── 5b. EVERY send is counted, not only the bulk ones ───────────────────────
// ⚠ The first version of this budget counted BULK ONLY, while the provider
//   counted everything: 80 bulk plus 30 transactional read as 80 against a real
//   110, so the 20-email reserve was protecting headroom nothing measured.
ok('mail_quota_record exists', /FUNCTION public\.mail_quota_record/.test(recSql));
// ⚠ Strip the -- comments first: this file EXPLAINS that it has no ceiling, and
//   matching the prose instead of the code made the assertion fail on itself.
const recBody = recSql.split(String.fromCharCode(10)).filter(l => !l.trim().startsWith('--')).join(String.fromCharCode(10));
ok('recording has no ceiling — a send that already happened must be written down',
  !/p_cap|ceiling/.test(recBody));
ok('sendMail records unless the caller pre-reserved',
  /if \(!reserved\) quotaRecord\(env, bodyCount\)/.test(mailer));
ok('the broadcast marks itself reserved, so it is not counted twice', /reserved: true/.test(broadcast));
ok('the digest marks itself reserved too', /reserved: true/.test(digest));
for (const f of ['pending-registrations', 'notify', 'teacher-approved-email']) {
  const src = fs.readFileSync(path.join(ROOT, 'workers/api/' + f + '.js'), 'utf8');
  ok(f + ' does NOT pre-reserve (transactional mail is never refused)', !/reserved: true/.test(src));
}
ok('recording is fire-and-forget, so bookkeeping cannot fail an email already sent',
  /export function quotaRecord[\s\S]{0,300}catch\(\(\) => \{\}\)/.test(mailer));
ok('mail_quota_record is service_role only',
  /GRANT EXECUTE ON FUNCTION public\.mail_quota_record\(integer\) TO service_role;/.test(recSql));

// ── 6. The admin is told BEFORE sending, not after ──────────────────────────
ok('the dry run reports the budget', /quotaPeek\(env, \{ bulk: true \}\)/.test(broadcast));
ok('and caps would_send by what is left', /Math\.min\(recipients\.length, budget\.remaining\)/.test(broadcast));
ok('a full budget refuses cleanly with 429 and sends nothing',
  /return json\(429[\s\S]{0,200}Nothing was sent/.test(broadcast));
// ⚠ Deferred is NOT a failure: those people were never attempted.
ok('deferred is worded as "wait for tomorrow", not as an error',
  /wait for tomorrow|deferred to tomorrow|select them again tomorrow/.test(adminSrc));

console.log(`${checks - fails}/${checks} mail-budget checks passed`);
process.exit(fails ? 1 : 0);
