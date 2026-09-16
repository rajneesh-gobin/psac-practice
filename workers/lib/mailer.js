// The ONE place the app sends mail from.
//
// ⚠ It used to be MailChannels, inlined in three handlers. MailChannels shut its
//   free Cloudflare Workers relay in 2024, and the Worker carried no mail
//   credential at all, so notify.js, weekly-digest.js and teacher-approved-email.js
//   had never sent a single message - each one failing differently and silently.
//   One adapter, one credential, one failure vocabulary.
//
// Transport is Resend (HTTPS, no SMTP - Workers cannot open a raw socket).
// Secrets: RESEND_API_KEY, optionally MAIL_FROM, MAIL_REPLY_TO, SITE_URL.
//
// ⚠ Gmail's ~500/day account ceiling that governs SUPABASE AUTH mail does NOT
//   apply here - these are two separate senders. Auth mail (sign-up, reset)
//   still goes through Supabase's Gmail SMTP and still spends that quota.

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

// Resend caps a single call at 50 recipients. A broadcast is chunked to this.
export const MAX_RECIPIENTS_PER_MESSAGE = 50;

export function mailFrom(env) {
  return env.MAIL_FROM || 'Nou Klass <noreply@nouklass.com>';
}

export function siteUrl(env) {
  return (env.SITE_URL || 'https://nouklass.com').replace(/\/+$/, '');
}

export function mailConfigured(env) {
  return !!env.RESEND_API_KEY;
}

export function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ⚠ Every automatic email carries an unsubscribe link, and the token is an HMAC
//   of the user id with the service-role key - so the link cannot be forged and
//   no table is needed to store it. Truncated to 32 hex chars: this guards a
//   preference toggle, not an account.
export async function unsubscribeToken(env, userId, scope = 'all') {
  const secret = env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!secret) return null;
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key,
    new TextEncoder().encode(`${userId}:${scope}`));
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
}

export async function unsubscribeUrl(env, userId, scope = 'all') {
  const token = await unsubscribeToken(env, userId, scope);
  if (!token) return null;
  return `${siteUrl(env)}/api/email-prefs?u=${encodeURIComponent(userId)}&s=${encodeURIComponent(scope)}&t=${token}`;
}

// A plain, readable shell every message shares, so a parent recognises them.
// Inline styles only - Gmail strips <style> blocks.
export function wrap({ title, bodyHtml, footerHtml = '' }) {
  return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:560px;margin:24px auto;background:#ffffff;border-radius:16px;overflow:hidden">
    <div style="background:#4f46e5;color:#ffffff;padding:20px 24px">
      <div style="font-size:18px;font-weight:bold">Nou Klass</div>
      <div style="font-size:13px;opacity:.85">${escapeHtml(title)}</div>
    </div>
    <div style="padding:22px 24px;color:#1f2937;font-size:15px;line-height:1.55">
      ${bodyHtml}
    </div>
    <div style="padding:14px 24px 20px;color:#6b7280;font-size:12px;line-height:1.5;border-top:1px solid #e5e7eb">
      ${footerHtml}
    </div>
  </div>
</body></html>`;
}

// Returns { ok, id, error }. NEVER throws: a mail failure must not roll back the
// thing the mail was announcing, and must not read to the caller as though the
// action itself had failed.
export async function sendMail(env, { to, bcc, subject, html, text, replyTo, unsubscribe, reserved }) {
  if (!mailConfigured(env)) return { ok: false, error: 'not_configured' };

  const toList  = (Array.isArray(to) ? to : to ? [to] : []).filter(Boolean);
  const bccList = (Array.isArray(bcc) ? bcc : bcc ? [bcc] : []).filter(Boolean);
  if (!toList.length && !bccList.length) return { ok: false, error: 'no_recipients' };
  if (toList.length + bccList.length > MAX_RECIPIENTS_PER_MESSAGE) {
    return { ok: false, error: 'too_many_recipients' };
  }

  const headers = {};
  if (unsubscribe) {
    headers['List-Unsubscribe'] = `<${unsubscribe}>`;
    headers['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click';
  }

  const payload = {
    from: mailFrom(env),
    // ⚠ A pure-Bcc message still needs a To, or Gmail files it as suspicious and
    //   some clients show "undisclosed recipients" as a broken header. The From
    //   address stands in, which is also what a human would do.
    to: toList.length ? toList : [mailFrom(env).replace(/^.*<|>$/g, '')],
    ...(bccList.length ? { bcc: bccList } : {}),
    subject,
    ...(html ? { html } : {}),
    ...(text ? { text } : {}),
    ...(replyTo || env.MAIL_REPLY_TO ? { reply_to: replyTo || env.MAIL_REPLY_TO } : {}),
    ...(Object.keys(headers).length ? { headers } : {}),
  };

  let res;
  try {
    res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    return { ok: false, error: 'network:' + String(e && e.message || e).slice(0, 80) };
  }

  const bodyCount = toList.length + bccList.length;
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    // ⚠ Say WHICH failure. "domain not verified" and "bad key" are one HTTP
    //   status apart and need completely different fixes from whoever reads the
    //   toast; an invented friendly message makes a real fault unreportable.
    return { ok: false, error: `${res.status}:${body.name || ''} ${body.message || ''}`.trim().slice(0, 160) };
  }

  // ⚠ RECORD EVERY SEND, not only the bulk ones. The counter used to track the
  //   two bulk senders alone while the PROVIDER counted everything, so 80 bulk
  //   plus 30 transactional read as 80 against a real 110 and the reserve was
  //   protecting nothing measurable. Callers that pre-reserved pass
  //   `reserved: true` so they are not counted twice.
  // ⚠ Not awaited and never throws: the email has already gone, and failing the
  //   send because the bookkeeping failed would invert the priority.
  if (!reserved) quotaRecord(env, bodyCount);

  return { ok: true, id: body.id || null };
}

// ── Recipient preferences ────────────────────────────────────────────────
// profiles.preferences.email, read server-side so no client can spend someone
// else's inbox. Shape (all optional, absent = the default below):
//   { enabled: true, digest: 'weekly'|'fortnightly'|'monthly'|'off',
//     announcements: true, homework: true }
export const EMAIL_DEFAULTS = {
  enabled: true,
  digest: 'weekly',
  announcements: true,
  homework: true,
};

export const DIGEST_EVERY_DAYS = { weekly: 7, fortnightly: 14, monthly: 30 };

export function emailPrefs(preferences) {
  const p = (preferences && typeof preferences === 'object') ? preferences : {};
  const e = (p.email && typeof p.email === 'object') ? p.email : {};
  const out = { ...EMAIL_DEFAULTS, ...e };
  // Legacy: the single weekly_digest boolean predates this object and is still
  // what older clients wrote. An explicit false there still means "off".
  if (p.weekly_digest === false && e.digest === undefined) out.digest = 'off';
  if (!Object.prototype.hasOwnProperty.call(DIGEST_EVERY_DAYS, out.digest)) out.digest = 'off';
  return out;
}

// ⚠ `enabled:false` is the master switch and beats every per-kind flag.
//    'admin' is NOT automatic mail - an administrator writing to a named person
//    is correspondence, and is checked against `announcements` by its own
//    handler, which can also mark a message essential.
export function wantsEmail(preferences, kind) {
  const p = emailPrefs(preferences);
  if (!p.enabled) return false;
  if (kind === 'digest') return p.digest !== 'off';
  if (kind === 'announcement') return p.announcements !== false;
  if (kind === 'homework') return p.homework !== false;
  return true;
}

// Is this account due a digest, given when it last got one?
export function digestDue(preferences, lastSentIso, now = new Date()) {
  const p = emailPrefs(preferences);
  if (!p.enabled || p.digest === 'off') return false;
  if (!lastSentIso) return true;
  const last = new Date(lastSentIso);
  if (isNaN(last)) return true;
  const days = (now - last) / 86400000;
  // One day of slack: a cron that runs at 09:00 must not skip a fortnight
  // because the previous run was three minutes late.
  return days >= DIGEST_EVERY_DAYS[p.digest] - 1;
}

// ── Daily send budget ────────────────────────────────────────────────────
// Resend's free tier allows 100 a day. Without a budget the 101st send simply
// fails at the provider PART-WAY THROUGH a broadcast: some recipients got the
// message, some did not, and the only record is a failure count.
//
// ⚠ RESERVE FIRST, SEND SECOND, RELEASE WHAT YOU DID NOT SPEND. The counter is
//   incremented under a row lock by mail_quota_take() before a single message
//   goes out, so a broadcast racing the Sunday digest cron cannot double-spend
//   the day. Anything reserved and not sent is handed back.
//
// ⚠ A RESERVE IS HELD BACK FOR TRANSACTIONAL MAIL (bulk: true takes it into
//   account, bulk: false ignores it). An account-activation email must not fail
//   because a newsletter used the quota first — one is a courtesy, the other is
//   somebody locked out of their account.
//
// ⚠ IT FAILS OPEN. If the RPC is unavailable — an un-migrated database, a
//   transient error — mail still goes out and the caller is told the budget is
//   unknown. Blocking every email on a bookkeeping failure would be a far worse
//   outcome than briefly exceeding a cap the provider enforces anyway.

export const mailCap     = env => Number(env.MAIL_DAILY_CAP || 100);
export const mailReserve = env => Number(env.MAIL_BULK_RESERVE || 20);

async function quotaRpc(env, fn, args) {
  const sbUrl = env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
  const sbKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!sbKey) return null;
  try {
    const r = await fetch(`${sbUrl}/rest/v1/rpc/${fn}`, {
      method: 'POST',
      headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
    });
    if (!r.ok) return null;
    const out = await r.json();
    return (out && out.ok) ? out : null;
  } catch (_) { return null; }
}

export async function quotaPeek(env, { bulk = true } = {}) {
  const out = await quotaRpc(env, 'mail_quota_peek',
    { p_cap: mailCap(env), p_reserve: bulk ? mailReserve(env) : 0 });
  return out || { ok: true, unknown: true, remaining: null, sent_today: null, cap: mailCap(env) };
}

export async function quotaTake(env, want, { bulk = true } = {}) {
  const n = Math.max(0, Number(want) || 0);
  const out = await quotaRpc(env, 'mail_quota_take',
    { p_want: n, p_cap: mailCap(env), p_reserve: bulk ? mailReserve(env) : 0 });
  // ⚠ Fail OPEN: grant everything asked for, and say the budget is unknown.
  return out || { ok: true, unknown: true, granted: n, deferred: 0, remaining: null };
}

export async function quotaRelease(env, n) {
  if (!n || n <= 0) return;
  await quotaRpc(env, 'mail_quota_release', { p_n: Math.floor(n) });
}

// Record a send that has ALREADY happened. Never refuses, never throws: the
// email is gone, and the only wrong answer now is failing to write it down.
export function quotaRecord(env, n) {
  if (!n || n <= 0) return;
  quotaRpc(env, 'mail_quota_record', { p_n: Math.floor(n) }).catch(() => {});
}
