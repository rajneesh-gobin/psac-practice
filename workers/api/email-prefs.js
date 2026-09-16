// GET/POST /api/email-prefs — the unsubscribe link at the foot of every
// automatic email, and the One-Click target for the List-Unsubscribe header.
//
// ⚠ NO SIGN-IN. That is the point: a parent who no longer wants the digest must
//   be able to stop it from the email itself, on a phone, without remembering a
//   password. The link is an HMAC of (user id + scope) under the service-role
//   key, so it cannot be forged or walked, and it grants exactly one thing —
//   turning a preference OFF. It can never turn one on, read an address, or
//   touch anything else on the account.
// ⚠ Gmail and Outlook PREFETCH links in mail. A GET therefore only shows the
//   page; the change is made by the POST that One-Click sends, or by the button.

import { unsubscribeToken, siteUrl } from '../lib/mailer.js';

const SCOPES = {
  all:           { field: 'enabled',       label: 'all emails from Nou Klass' },
  digest:        { field: 'digest',        label: 'the progress digest' },
  announcements: { field: 'announcements', label: 'announcements' },
  homework:      { field: 'homework',      label: 'homework notifications' },
};

function page(title, bodyHtml, status = 200) {
  return new Response(`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>${title} · Nou Klass</title>
<style>
 body{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;background:#f3f4f6;
      margin:0;padding:40px 18px;color:#1f2937;line-height:1.5}
 .card{max-width:440px;margin:0 auto;background:#fff;border-radius:18px;padding:28px 24px;
      box-shadow:0 10px 30px rgba(15,23,42,.12)}
 h1{font-size:19px;margin:0 0 12px}
 p{margin:0 0 14px;font-size:15px}
 button,a.btn{display:inline-block;background:#4f46e5;color:#fff;border:0;border-radius:10px;
      padding:12px 22px;font-size:15px;font-weight:700;cursor:pointer;text-decoration:none}
 .muted{color:#6b7280;font-size:13px}
</style></head><body><div class="card">${bodyHtml}</div></body></html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
}

export default async function handler(request, env) {
  if (!['GET', 'POST'].includes(request.method)) {
    return new Response('Method not allowed', { status: 405 });
  }

  const url = new URL(request.url);
  const userId = String(url.searchParams.get('u') || '');
  const scope = String(url.searchParams.get('s') || 'all');
  const token = String(url.searchParams.get('t') || '');
  const site = siteUrl(env);

  if (!/^[0-9a-f-]{36}$/i.test(userId) || !SCOPES[scope]) {
    return page('Link not recognised', '<h1>This link is not valid</h1><p>Please open your settings on the site instead.</p>'
      + `<p><a class="btn" href="${site}/">Go to Nou Klass</a></p>`, 400);
  }

  const expected = await unsubscribeToken(env, userId, scope);
  // Constant-time-ish: compare full strings, never bail on the first byte.
  if (!expected || token.length !== expected.length ||
      ![...token].reduce((acc, c, i) => acc & (c === expected[i] ? 1 : 0), 1)) {
    return page('Link not recognised', '<h1>This link has expired or is not valid</h1>'
      + '<p>You can change your email settings from Account &amp; Settings once signed in.</p>'
      + `<p><a class="btn" href="${site}/">Go to Nou Klass</a></p>`, 403);
  }

  const label = SCOPES[scope].label;

  if (request.method === 'GET') {
    return page('Unsubscribe', `<h1>Turn off ${label}?</h1>
      <p>You will stay signed up to Nou Klass — this only stops the emails.</p>
      <form method="POST"><button type="submit">Yes, turn them off</button></form>
      <p class="muted" style="margin-top:16px">Changed your mind? You can turn them back on any time under Account &amp; Settings → Notifications.</p>`);
  }

  const sbUrl = env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
  const sbKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!sbKey) return page('Not available', '<h1>Not available right now</h1><p>Please try again later.</p>', 500);
  const sbH = { apikey: sbKey, Authorization: `Bearer ${sbKey}`, 'Content-Type': 'application/json' };

  const readRes = await fetch(`${sbUrl}/rest/v1/profiles?id=eq.${userId}&select=preferences&limit=1`, { headers: sbH });
  if (!readRes.ok) return page('Not available', '<h1>Could not save that</h1><p>Please try again in a moment.</p>', 500);
  const rows = await readRes.json();
  if (!rows.length) return page('Not found', '<h1>That account no longer exists</h1>', 404);

  const preferences = (rows[0].preferences && typeof rows[0].preferences === 'object') ? rows[0].preferences : {};
  const email = (preferences.email && typeof preferences.email === 'object') ? preferences.email : {};
  // ⚠ Merge, never replace: preferences carries theme, reminder_time and the
  //   parent's child defaults, and this endpoint owns none of them.
  const next = { ...preferences, email: { ...email } };
  if (scope === 'all') next.email.enabled = false;
  else if (scope === 'digest') { next.email.digest = 'off'; next.weekly_digest = false; }
  else next.email[SCOPES[scope].field] = false;

  const writeRes = await fetch(`${sbUrl}/rest/v1/profiles?id=eq.${userId}`, {
    method: 'PATCH',
    headers: { ...sbH, Prefer: 'return=representation' },
    body: JSON.stringify({ preferences: next }),
  });
  const written = writeRes.ok ? await writeRes.json() : [];
  if (!written.length) return page('Not saved', '<h1>Could not save that</h1><p>Please try again in a moment.</p>', 500);

  console.log(`[email-prefs] ${userId} unsubscribed from ${scope}`);
  return page('Unsubscribed', `<h1>Done — ${label} are off</h1>
    <p>You will not get any more of these.</p>
    <p><a class="btn" href="${site}/">Back to Nou Klass</a></p>
    <p class="muted" style="margin-top:16px">You can turn them back on under Account &amp; Settings → Notifications.</p>`);
}
