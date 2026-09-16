// POST /api/admin-broadcast — one message to many members, sent Bcc.
//
// Replaces the copy-to-clipboard-then-open-Gmail loop: an admin picks members in
// the Members tab and writes the message here.
//
// ⚠ Bcc, ALWAYS. A To: list of 200 parent addresses is a data breach dressed as
//   a newsletter, and it is one wrong click away in any mail client. The
//   recipients never reach the browser either - the admin selects ids, the
//   service role resolves the addresses here.
// ⚠ It never sends to an account that has switched announcements off, unless the
//   admin marks the message ESSENTIAL (account, billing or safety), which is the
//   only category a recipient cannot opt out of.

import { requireAdmin, json } from '../lib/admin-auth.js';
import {
  sendMail, wrap, escapeHtml, siteUrl, mailConfigured,
  wantsEmail, unsubscribeUrl, MAX_RECIPIENTS_PER_MESSAGE,
  quotaPeek, quotaTake, quotaRelease, mailCap,
} from '../lib/mailer.js';

const MAX_IDS = 500;
const MAX_SUBJECT = 150;
const MAX_BODY = 8000;
const AUTH_PAGE_SIZE = 1000;

// ⚠ CLOUDFLARE CAPS SUBREQUESTS PER REQUEST (50 on the free plan). One
//   /auth/v1/admin/users/<id> lookup per recipient is the obvious way to write
//   this and it breaks silently at ~45 people - which is to say, on the first
//   real broadcast and never in testing. The whole address book is paged in
//   instead: one request per 1,000 accounts.
async function emailsById(sbUrl, sbH, wanted) {
  const out = new Map();
  for (let page = 1; ; page++) {
    const res = await fetch(`${sbUrl}/auth/v1/admin/users?page=${page}&per_page=${AUTH_PAGE_SIZE}`, { headers: sbH });
    if (!res.ok) return null;
    const users = (await res.json())?.users || [];
    for (const u of users) if (u?.email && wanted.has(u.id)) out.set(u.id, u.email);
    // Stop as soon as everyone asked for has been found, or the list runs out.
    if (users.length < AUTH_PAGE_SIZE || out.size === wanted.size) break;
  }
  return out;
}

// The admin writes plain text. Paragraphs become <p>, and every character is
// escaped first — an admin is trusted, but a pasted message is not, and HTML
// from a compose box is how a mail template starts rendering someone else's
// markup.
function bodyToHtml(text) {
  return String(text).split(/\n{2,}/).map(block =>
    `<p style="margin:0 0 14px">${escapeHtml(block).replace(/\n/g, '<br>')}</p>`
  ).join('');
}

function chunk(list, size) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

export default async function handler(request, env) {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'Method not allowed' });

  const gate = await requireAdmin(request, env);
  if (gate.error) return gate.error;
  const { sbUrl, sbKey } = gate;
  const sbH = { apikey: sbKey, Authorization: `Bearer ${sbKey}` };

  if (!mailConfigured(env)) {
    return json(503, { ok: false, error: 'not_configured', message: 'Mail is not set up on the server (RESEND_API_KEY).' });
  }

  let body;
  try { body = await request.json(); } catch { return json(400, { ok: false, error: 'Invalid request.' }); }

  const ids = [...new Set((Array.isArray(body.user_ids) ? body.user_ids : [])
    .map(String).filter(id => /^[0-9a-f-]{36}$/i.test(id)))];
  const subject = String(body.subject || '').trim().slice(0, MAX_SUBJECT);
  const message = String(body.message || '').trim().slice(0, MAX_BODY);
  const essential = body.essential === true;
  const dryRun = body.dry_run === true;

  if (!ids.length) return json(400, { ok: false, error: 'Select at least one member.' });
  if (ids.length > MAX_IDS) return json(400, { ok: false, error: `Too many recipients in one send (${ids.length}); the cap is ${MAX_IDS}.` });
  if (!subject) return json(400, { ok: false, error: 'A subject is required.' });
  if (!message) return json(400, { ok: false, error: 'A message is required.' });

  // Preferences first, in one query. An id with no profile row is a registration
  // that has not finished setup — it has no stored preference, so it gets the
  // defaults (announcements on), which is what a brand-new account should get.
  const prefsById = new Map();
  for (const group of chunk(ids, 100)) {
    const res = await fetch(
      `${sbUrl}/rest/v1/profiles?id=in.(${group.join(',')})&select=id,preferences,deleted_at`,
      { headers: sbH });
    if (!res.ok) return json(500, { ok: false, error: 'Could not read member preferences.' });
    for (const row of await res.json()) prefsById.set(row.id, row);
  }

  const recipients = [];
  const skipped = { opted_out: 0, no_email: 0, deleted: 0 };

  // Work out who is eligible BEFORE looking up a single address - there is no
  // reason to resolve the email of someone who has opted out.
  const eligible = [];
  for (const id of ids) {
    const profile = prefsById.get(id);
    if (profile?.deleted_at) { skipped.deleted++; continue; }
    if (!essential && !wantsEmail(profile?.preferences, 'announcement')) { skipped.opted_out++; continue; }
    eligible.push(id);
  }

  if (eligible.length) {
    const byId = await emailsById(sbUrl, sbH, new Set(eligible));
    if (!byId) return json(500, { ok: false, error: 'Could not resolve member addresses.' });
    for (const id of eligible) {
      const email = byId.get(id);
      if (!email) { skipped.no_email++; continue; }
      recipients.push({ id, email });
    }
  }

  // ⚠ The budget is reported on the DRY RUN too. "240 selected, 80 can go
  //   today" before pressing Send is the whole point — learning it from a
  //   failure count afterwards, with some recipients served and some not, is
  //   the outcome this exists to prevent.
  if (dryRun) {
    const budget = await quotaPeek(env, { bulk: true });
    const canSend = budget.remaining == null
      ? recipients.length
      : Math.min(recipients.length, budget.remaining);
    return json(200, {
      ok: true, dry_run: true,
      would_send: canSend,
      eligible: recipients.length,
      deferred: recipients.length - canSend,
      budget_remaining: budget.remaining,
      budget_sent_today: budget.sent_today,
      budget_cap: budget.cap ?? mailCap(env),
      budget_unknown: !!budget.unknown,
      skipped,
    });
  }
  if (!recipients.length) {
    return json(409, { ok: false, error: 'Nobody in that selection can be emailed.', skipped });
  }

  // Reserve before sending a single message.
  const reservation = await quotaTake(env, recipients.length, { bulk: true });
  const allowed = recipients.slice(0, reservation.granted);
  const deferred = recipients.length - allowed.length;
  if (!allowed.length) {
    return json(429, {
      ok: false,
      error: `Today's email budget is used up (${reservation.remaining === null ? 'unknown' : 0} left of ${mailCap(env)}). Nothing was sent — try again tomorrow.`,
      deferred, skipped, budget_remaining: 0,
    });
  }

  const site = siteUrl(env);
  const html = wrap({
    title: essential ? 'An important message about your account' : 'A message from Nou Klass',
    bodyHtml: bodyToHtml(message),
    footerHtml: essential
      ? `You are receiving this because it concerns your Nou Klass account. <a href="${site}/" style="color:#4f46e5">Sign in</a>`
      : `You are receiving this because you have a Nou Klass account. You can turn these messages off under <b>Account &amp; Settings → Notifications</b> after <a href="${site}/" style="color:#4f46e5">signing in</a>.`,
  });
  const text = message + '\n\n—\nNou Klass · ' + site + '/';

  let sent = 0;
  const failures = [];
  // One message per Bcc batch. A batch that fails is reported by size rather
  // than by address: the admin needs to know how many to retry, and the browser
  // must not learn who is on the list.
  for (const batch of chunk(allowed, MAX_RECIPIENTS_PER_MESSAGE)) {
    // A single-recipient batch can carry a personal one-click unsubscribe; a
    // shared Bcc batch cannot, so it falls back to the footer link.
    const unsubscribe = (!essential && batch.length === 1)
      ? await unsubscribeUrl(env, batch[0].id, 'announcements')
      : null;
    const res = await sendMail(env, {
      bcc: batch.map(r => r.email),
      subject, html, text,
      replyTo: gate.caller.email,
      // Already counted by quotaTake() above — do not count it twice.
      reserved: true,
      ...(unsubscribe ? { unsubscribe } : {}),
    });
    if (res.ok) sent += batch.length;
    else failures.push({ size: batch.length, error: res.error });
  }

  // ⚠ Hand back what was reserved and not spent. A provider outage would
  //   otherwise burn the whole day's budget without delivering one email.
  const unspent = allowed.length - sent;
  if (unspent > 0) await quotaRelease(env, unspent);

  console.log(`[admin-broadcast] ${gate.caller.email} → ${sent}/${recipients.length} recipients` +
    (deferred ? `, ${deferred} deferred (daily budget)` : '') +
    `, subject "${subject.slice(0, 60)}"`);
  return json(failures.length && !sent ? 502 : 200, {
    ok: sent > 0,
    sent,
    selected: ids.length,
    eligible: recipients.length,
    deferred,
    budget_remaining: reservation.remaining === null ? null : reservation.remaining + unspent,
    budget_cap: mailCap(env),
    budget_unknown: !!reservation.unknown,
    skipped,
    failures,
    ...(sent ? {} : { error: failures[0]?.error || 'Nothing was sent.' }),
  });
}
