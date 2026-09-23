// POST /api/admin-compose — an admin writes to ANY address, from admin@nouklass.com.
//
// WHY THIS EXISTS. admin@nouklass.com is a Cloudflare Email Routing address: it
// FORWARDS to the operator's inbox and has no mailbox of its own, so nothing can
// be composed *from* it in a mail client. Replies to a parent went out from a
// personal Gmail instead — a different sender than every automated message the
// family has ever had from us, which is both confusing and worse for delivery.
// Resend already sends as that address (the domain is verified, see
// mailFromHuman), so the compose box is the missing half.
//
// ⚠ HOW THIS DIFFERS FROM /api/admin-broadcast, deliberately:
//   - The admin TYPES the addresses. The broadcast's rule that "the browser only
//     ever sends ids and never sees an address" cannot apply to correspondence
//     with someone who may not have an account at all. That is the one exception
//     and it is why this is a separate handler rather than a flag on that one.
//   - It is CORRESPONDENCE, not a newsletter: the cap is small (MAX_TO), it draws
//     on the transactional mail budget rather than the bulk one, and a reply to
//     somebody who wrote in is not gated on their announcements preference.
//   - It sends the admin their own copy, because a forwarder has no Sent folder.
//
// ⚠ It is NOT a way around the announcements opt-out. `enabled: false` is the
//   master switch — "send me nothing" — and blocks here too unless the message is
//   marked essential; only the narrower announcements-off flag is a warning
//   rather than a refusal.

import { requireAdmin, json, logAdminAction } from '../lib/admin-auth.js';
import {
  sendMail, wrap, escapeHtml, siteUrl, mailConfigured, emailPrefs,
  quotaPeek, quotaTake, quotaRelease, mailCap, mailFromHuman, mailReplyTo, replyNoteText,
  normaliseBody, bodyToHtml, MAX_RECIPIENTS_PER_MESSAGE,
} from '../lib/mailer.js';

// ⚠ SMALL ON PURPOSE. This is a message to named people, and the low cap is what
//   keeps it from quietly becoming an un-opt-outable newsletter. Anything larger
//   is a broadcast and belongs in the handler that checks preferences and
//   attaches an unsubscribe link.
const MAX_TO = 20;
const MAX_SUBJECT = 150;
const MAX_BODY = 8000;
const AUTH_PAGE_SIZE = 1000;

// Deliberately permissive rather than clever: this rejects the things a person
// actually mistypes (a missing @, a trailing comma, a stray space) and leaves
// the verdict on anything exotic to the mail provider, which is the only thing
// that really knows. A regex that tries to implement RFC 5322 rejects valid
// addresses, and that failure lands on a real person who cannot be written to.
const EMAIL_RE = /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]{2,}$/;

function parseRecipients(input) {
  const raw = Array.isArray(input) ? input : String(input || '').split(/[,;\n]+/);
  const seen = new Set();
  const valid = [];
  const invalid = [];
  for (const entry of raw) {
    // Accept what a paste out of a mail client looks like: Name <a@b.com>.
    const text = String(entry).trim().replace(/^.*<([^>]+)>.*$/, '$1').trim();
    if (!text) continue;
    const key = text.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    (EMAIL_RE.test(text) ? valid : invalid).push(text);
  }
  return { valid, invalid };
}

// Every account address, lower-cased → id. Paged, for the same reason
// admin-broadcast.js pages: one lookup per typed address would burn a
// subrequest each and Cloudflare caps them per request.
async function accountsByEmail(sbUrl, sbH) {
  const out = new Map();
  for (let page = 1; ; page++) {
    const res = await fetch(`${sbUrl}/auth/v1/admin/users?page=${page}&per_page=${AUTH_PAGE_SIZE}`, { headers: sbH });
    if (!res.ok) return null;
    const users = (await res.json())?.users || [];
    for (const u of users) if (u?.email) out.set(String(u.email).toLowerCase(), u.id);
    if (users.length < AUTH_PAGE_SIZE) return out;
  }
}

// ⚠ THE AUDIT ROW MUST NOT BECOME AN ADDRESS BOOK. logAdminAction()'s rule is
//   ids, never email addresses: an append-only table outlives the account it
//   names. A typed address often has no id at all, so what is recorded is the id
//   where there is one and the DOMAIN otherwise — enough to answer "who was
//   written to, roughly, and when" without storing a way to reach them. The
//   admin's own copy of the message carries the exact list, which is where a
//   list of addresses belongs.
function auditRecipients(list, idByEmail) {
  const ids = [];
  const domains = {};
  for (const email of list) {
    const id = idByEmail.get(email.toLowerCase());
    if (id) { ids.push(id); continue; }
    const domain = email.split('@')[1]?.toLowerCase() || 'unknown';
    domains[domain] = (domains[domain] || 0) + 1;
  }
  return { ids, domains };
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

  const { valid, invalid } = parseRecipients(body.to);
  const subject = String(body.subject || '').trim().slice(0, MAX_SUBJECT);
  // Normalised once, so the HTML part and the plain-text part cannot disagree.
  const message = normaliseBody(String(body.message || '')).slice(0, MAX_BODY);
  const essential = body.essential === true;
  const copySelf = body.copy_self !== false;
  const dryRun = body.dry_run === true;

  // ⚠ ONE BAD ADDRESS FAILS THE WHOLE SEND. Delivering to four of five and
  //   reporting the fifth in a line of small print is how a message goes to the
  //   wrong list of people: the admin fixes the typo, presses Send again, and
  //   the first four get it twice.
  if (invalid.length) {
    return json(400, {
      ok: false,
      error: `${invalid.length} address${invalid.length === 1 ? ' is' : 'es are'} not valid: ${invalid.slice(0, 5).join(', ')}. Nothing was sent.`,
      invalid,
    });
  }
  if (!valid.length) return json(400, { ok: false, error: 'Enter at least one email address.' });
  if (valid.length > MAX_TO) {
    return json(400, {
      ok: false,
      error: `${valid.length} addresses is more than this form allows (${MAX_TO}). For a bigger list, select the members and use Email selected, which respects the opt-out and adds an unsubscribe link.`,
    });
  }
  if (!subject) return json(400, { ok: false, error: 'A subject is required.' });
  if (!message) return json(400, { ok: false, error: 'A message is required.' });

  // Which of these addresses are accounts, and what have they asked for?
  const idByEmail = await accountsByEmail(sbUrl, sbH);
  if (!idByEmail) return json(500, { ok: false, error: 'Could not check the recipients against existing accounts.' });

  const knownIds = valid.map(e => idByEmail.get(e.toLowerCase())).filter(Boolean);
  const prefsById = new Map();
  if (knownIds.length) {
    const res = await fetch(
      `${sbUrl}/rest/v1/profiles?id=in.(${knownIds.join(',')})&select=id,preferences,deleted_at`,
      { headers: sbH });
    if (!res.ok) return json(500, { ok: false, error: 'Could not read recipient preferences.' });
    for (const row of await res.json()) prefsById.set(row.id, row);
  }

  const recipients = [];
  const blocked = [];
  const warnings = [];
  for (const email of valid) {
    const id = idByEmail.get(email.toLowerCase());
    const profile = id ? prefsById.get(id) : null;
    const prefs = emailPrefs(profile?.preferences);
    // ⚠ The master switch is a refusal; announcements-off is only a note. A
    //   person who turned off newsletters has not asked to be un-repliable.
    if (!essential && prefs.enabled === false) {
      blocked.push(email);
      continue;
    }
    if (!essential && prefs.announcements === false) {
      warnings.push(`${email} has announcements switched off — sent anyway, because this is a direct message.`);
    }
    if (profile?.deleted_at) warnings.push(`${email} belongs to a deleted account.`);
    recipients.push(email);
  }

  if (blocked.length && !recipients.length) {
    return json(409, {
      ok: false,
      error: `Nothing was sent: ${blocked.join(', ')} ${blocked.length === 1 ? 'has' : 'have'} turned all email off. Mark the message essential only if it concerns their account, billing or safety.`,
      blocked,
    });
  }

  if (dryRun) {
    const budget = await quotaPeek(env, { bulk: false });
    return json(200, {
      ok: true, dry_run: true,
      would_send: recipients.length,
      recipients,
      blocked,
      warnings,
      copy_to: copySelf ? mailReplyTo(env) : null,
      budget_remaining: budget.remaining,
      budget_cap: budget.cap ?? mailCap(env),
      budget_unknown: !!budget.unknown,
      from: mailFromHuman(env),
    });
  }

  // ⚠ The admin's copy is counted too. It is a real message to a real inbox, and
  //   a budget that does not count it is wrong by one on every send.
  const want = recipients.length + (copySelf ? 1 : 0);
  const reservation = await quotaTake(env, want, { bulk: false });
  if (reservation.granted < recipients.length) {
    await quotaRelease(env, reservation.granted);
    return json(429, {
      ok: false,
      error: `Today's email budget cannot cover this message (${recipients.length} needed, ${reservation.granted} available of ${mailCap(env)}). Nothing was sent.`,
    });
  }

  const site = siteUrl(env);
  const from = mailFromHuman(env);
  const replyTo = mailReplyTo(env);
  const html = wrap({
    env,
    // From and Reply-To are both the monitored admin address, so "you can reply"
    // is true — see the same flag in admin-broadcast.js.
    monitored: true,
    title: subject,
    bodyHtml: bodyToHtml(message),
    footerHtml: `Nou Klass &middot; <a href="${site}/" style="color:#4f46e5">${site.replace(/^https?:\/\//, '')}</a>`,
  });
  const text = message + '\n\n—\n' + replyNoteText(env, { monitored: true }) + '\nNou Klass · ' + site + '/';

  // ⚠ ONE recipient goes in To; more than one goes in Bcc, always. Putting four
  //   parents in a visible To hands each of them the other three addresses, and
  //   it is not recoverable once sent.
  const single = recipients.length === 1;
  const res = await sendMail(env, {
    ...(single ? { to: recipients } : { bcc: recipients.slice(0, MAX_RECIPIENTS_PER_MESSAGE) }),
    subject, html, text, from, replyTo,
    reserved: true,
  });

  let copySent = false;
  if (res.ok && copySelf) {
    // ⚠ A SEPARATE MESSAGE, not a Bcc of the original. A Bcc copy cannot say who
    //   else received it — which is the one thing the operator needs from it,
    //   since the sending address is a forwarder with no Sent folder and a Bcc
    //   list is invisible by design.
    const copy = await sendMail(env, {
      to: replyTo,
      subject: `[copy] ${subject}`,
      html: wrap({
        env, monitored: true,
        title: 'Your copy of a message sent from the admin address',
        bodyHtml: `<p style="margin:0 0 14px;color:#6b7280;font-size:13px">Sent by <b>${escapeHtml(gate.caller.email)}</b> to `
          + `<b>${escapeHtml(recipients.join(', '))}</b>${single ? '' : ' (each in Bcc, so they cannot see one another)'}.</p>`
          + `<hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 14px">`
          + bodyToHtml(message),
        footerHtml: 'You are receiving this because you asked for a copy when sending.',
      }),
      text: `Sent by ${gate.caller.email} to ${recipients.join(', ')}\n\n---\n\n${message}`,
      from, replyTo, reserved: true,
    });
    copySent = copy.ok;
    if (!copy.ok) warnings.push(`The message was sent, but your copy was not: ${copy.error}`);
  }

  // Hand back whatever was reserved and not spent.
  const spent = (res.ok ? recipients.length : 0) + (copySent ? 1 : 0);
  if (reservation.granted > spent) await quotaRelease(env, reservation.granted - spent);

  console.log(`[admin-compose] ${gate.caller.email} → ${recipients.length} address(es), ` +
    `${res.ok ? 'sent' : 'FAILED: ' + res.error}, subject "${subject.slice(0, 60)}"`);

  const audit = auditRecipients(recipients, idByEmail);
  await logAdminAction(gate, {
    action: 'compose_sent',
    targetUser: audit.ids.length === 1 ? audit.ids[0] : null,
    detail: {
      subject,
      essential,
      recipients: recipients.length,
      member_ids: audit.ids,
      other_domains: audit.domains,
      copy_to_self: copySent,
      ok: res.ok,
      ...(res.id ? { message_id: res.id } : {}),
      ...(blocked.length ? { blocked: blocked.length } : {}),
      ...(res.ok ? {} : { error: res.error }),
    },
  });

  if (!res.ok) return json(502, { ok: false, error: res.error || 'The message was not sent.' });
  return json(200, {
    ok: true,
    sent: recipients.length,
    recipients,
    bcc: !single,
    blocked,
    warnings,
    copy_sent: copySent,
    from,
    budget_remaining: reservation.remaining === null ? null : reservation.remaining + (reservation.granted - spent),
    budget_unknown: !!reservation.unknown,
  });
}
