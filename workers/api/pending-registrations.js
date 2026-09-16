// GET/POST /api/pending-registrations — admin view of unconfirmed sign-ups.

import { requireAdmin, json } from '../lib/admin-auth.js';
import { sendMail, wrap, escapeHtml, siteUrl, mailConfigured, mailReplyTo, replyNoteText } from '../lib/mailer.js';

const AUTH_PAGE_SIZE = 1000;
const DEFAULT_PAGE_SIZE = 30;

function parseCursor(value) {
  const match = String(value || '').match(/^(\d+):(\d+)$/);
  if (!match) return { page: 1, index: 0 };
  return { page: Math.max(1, Number(match[1])), index: Math.max(0, Number(match[2])) };
}

function isPendingEmail(user) {
  return !!user?.email && !user.email_confirmed_at && !user.confirmed_at;
}

function publicRegistration(user) {
  return { id: user.id, email: user.email, full_name: user.user_metadata?.full_name || '', requested_role: user.user_metadata?.role || 'parent', created_at: user.created_at, confirmation_sent_at: user.confirmation_sent_at || null };
}

// Returned as `emailed` so the admin's toast can say what actually happened.
// ⚠ Never throws and never fails the activation: the account IS active by the
//   time this runs, and an admin told "could not activate" would try again.
async function emailActivated(env, { email, fullName }) {
  if (!mailConfigured(env)) return 'not_configured';
  const site = siteUrl(env);
  const first = String(fullName || '').trim().split(/\s+/)[0] || 'there';
  const subject = 'Your Nou Klass account is now active';
  const text = `Hello ${first},\n\n`
    + `An administrator has activated your Nou Klass account for you, so you do not need to click the confirmation link in your sign-up email.\n\n`
    + `Sign in at ${site}/ with the email address and password you registered with, and you can finish setting up your family.\n\n`
    + `If you did not register for Nou Klass, please write to ${mailReplyTo(env)} and we will remove the account.\n\n`
    + replyNoteText(env) + `\n\nNou Klass`;
  const html = wrap({
    title: 'Account activated',
    bodyHtml: `<p style="margin:0 0 14px">Hello ${escapeHtml(first)},</p>
      <p style="margin:0 0 14px">An <b>administrator has activated your account</b> for you, so you do not need to click the confirmation link in your sign-up email.</p>
      <p style="margin:0 0 20px">Sign in with the email address and password you registered with, and you can finish setting up your family.</p>
      <p style="margin:0 0 6px"><a href="${site}/" style="display:inline-block;background:#4f46e5;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:10px">Sign in to Nou Klass</a></p>`,
    env,
    footerHtml: `If you did not register for Nou Klass, please tell us and we will remove the account.`,
  });
  const res = await sendMail(env, { to: email, subject, html, text });
  return res.ok ? 'sent' : (res.error || 'send_failed');
}

export default async function handler(request, env) {
  if (!['GET', 'POST'].includes(request.method)) return json(405, { error: 'Method not allowed' });

  const gate = await requireAdmin(request, env);
  if (gate.error) return gate.error;
  const { sbUrl, sbKey } = gate;
  const sbH = { apikey: sbKey, Authorization: `Bearer ${sbKey}` };

  if (request.method === 'GET') {
    const url = new URL(request.url);
    const limit = Math.min(100, Math.max(1, Number(url.searchParams.get('limit')) || DEFAULT_PAGE_SIZE));
    const term = String(url.searchParams.get('search') || '').trim().toLowerCase();
    let { page, index } = parseCursor(url.searchParams.get('cursor'));
    const registrations = [];
    let hasMore = true;

    while (registrations.length < limit && hasMore) {
      const res = await fetch(`${sbUrl}/auth/v1/admin/users?page=${page}&per_page=${AUTH_PAGE_SIZE}`, { headers: sbH });
      if (!res.ok) return json(500, { error: 'Could not read pending registrations.' });
      const data = await res.json();
      const users = data?.users || [];
      while (index < users.length && registrations.length < limit) {
        const user = users[index++];
        if (!isPendingEmail(user)) continue;
        const candidate = `${user.email || ''} ${user.user_metadata?.full_name || ''}`.toLowerCase();
        if (!term || candidate.includes(term)) registrations.push(publicRegistration(user));
      }
      if (index >= users.length) {
        if (users.length < AUTH_PAGE_SIZE) hasMore = false;
        else { page += 1; index = 0; }
      }
    }
    return json(200, { ok: true, registrations, next_cursor: hasMore ? `${page}:${index}` : null, mail_configured: mailConfigured(env) });
  }

  let body;
  try { body = await request.json(); } catch { return json(400, { error: 'Invalid request.' }); }
  if (body.action !== 'activate' || !/^[0-9a-f-]{36}$/i.test(String(body.user_id || ''))) {
    return json(400, { error: 'Invalid activation request.' });
  }

  const currentRes = await fetch(`${sbUrl}/auth/v1/admin/users/${body.user_id}`, { headers: sbH });
  if (!currentRes.ok) return json(404, { error: 'Registration was not found.' });
  const current = await currentRes.json();
  if (!isPendingEmail(current)) return json(409, { error: 'This account is already activated.' });

  const updateRes = await fetch(`${sbUrl}/auth/v1/admin/users/${body.user_id}`, {
    method: 'PUT',
    headers: { ...sbH, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email_confirm: true }),
  });
  if (!updateRes.ok) {
    const why = await updateRes.text().catch(() => '');
    console.error(`[pending-registrations] activate failed ${updateRes.status} ${why.slice(0, 200)}`);
    return json(500, { error: `Could not activate this account (${updateRes.status}).` });
  }

  // ⚠ READ-AFTER-WRITE. A 200 from GoTrue is not proof the flag moved, and the
  //   symptom of believing it is exactly the one reported: the toast says
  //   "activated" and the row is still in the list on the next refresh. If the
  //   account is still pending here, say so instead of claiming success.
  const verifyRes = await fetch(`${sbUrl}/auth/v1/admin/users/${body.user_id}`, { headers: sbH });
  const verified = verifyRes.ok ? await verifyRes.json() : null;
  if (!verified || isPendingEmail(verified)) {
    console.error(`[pending-registrations] activate did not stick for ${current.email}`);
    return json(500, { error: 'The account did not activate — it is still awaiting confirmation. Nothing was changed.' });
  }

  const emailed = await emailActivated(env, { email: verified.email, fullName: verified.user_metadata?.full_name });
  console.log(`[pending-registrations] ${gate.caller.email} manually activated ${verified.email} (email: ${emailed})`);
  return json(200, { ok: true, email: verified.email, emailed });
}
