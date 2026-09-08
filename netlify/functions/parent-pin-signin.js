'use strict';
// Sign a parent back in from their Parent PIN alone, with no email and no
// password.
//
// WHY THIS EXISTS
// A correct PIN used to be able to dead-end on "your parent sign-in could not
// be renewed in this browser". _ensureParentSession() escalates as far as
// replaying our own copy of the refresh token, but when that token is genuinely
// dead there is nothing left the browser can do: a PIN cannot mint a Supabase
// session. This endpoint is the step after that ladder — the server verifies
// the PIN against profiles.parent_pin_hash and mints the session itself.
//
// ⚠ THIS MAKES THE PIN A REAL CREDENTIAL. CLAUDE.md previously said the PIN
// "gates a UI switch, that is all it is for". That is no longer true and the
// brief has been updated to say so. The change is smaller than it sounds — a
// PIN already opens the parent dashboard whenever the session is alive, which
// is the ordinary case — but it is a change, and everything below exists
// because of it:
//   • 4 digits is 10 000 guesses, so the lockout is server-side, in a table the
//     browser has no grant on (see parent_pin_attempts).
//   • Every outcome that is not "correct" answers the SAME 401. An attacker
//     must not be able to tell "no such account" from "no PIN set" from "wrong
//     PIN" — that difference is an account-enumeration oracle.
//   • An admin account can NEVER be entered by PIN. Four digits in front of
//     is_admin() is not a trade this project should make; an administrator
//     types their password.
//   • Every attempt, good or bad, is written to security_events.
//
// ⚠ Fails closed with no service key. A missing SUPABASE_SERVICE_ROLE_KEY used
// to be treated as "skip the check" in this project, which turned one
// configuration mistake into an open endpoint.

const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const SB_URL         = process.env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SB_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
// Public by construction — the same value ships inside engine/supabase.js. The
// literal is a fallback so one unset dashboard variable cannot silently take
// the whole recovery path down; the service key above has no such fallback and
// must not get one.
const SB_ANON_KEY    = process.env.SUPABASE_ANON_KEY || 'sb_publishable_wERRrZnvoWhM5faN2AaYpQ_CpTNHFkL';

const MAX_ATTEMPTS = 5;
// ⚠ A FLAT lockout is not a limit, it is a rate. 5 wrong PINs per 15 minutes is
// 480 guesses a day against a 10 000-value secret — about 5% a day, better than
// even odds inside a fortnight of unattended grinding. Each lockout is
// therefore twice the last: 15m, 30m, 1h, 2h, 4h ... capped at 24h. The count
// resets only on a CORRECT pin, so a parent who fumbles once and then gets it
// right is never carrying yesterday's mistakes, while a grinder is measured in
// guesses per year rather than per day.
const LOCK_MS      = 15 * 60 * 1000;
const LOCK_MAX_MS  = 24 * 60 * 60 * 1000;
const lockMsFor = (n) => Math.min(LOCK_MS * Math.pow(2, Math.max(0, n - 1)), LOCK_MAX_MS);
// A single Lambda container serves many requests, so this catches a burst from
// one address across different accounts — the kind of thing the per-user
// counter cannot see. Best effort on purpose: containers come and go, and the
// per-user lock in Postgres is the limit that actually holds.
const IP_WINDOW_MS = 60 * 1000;
const IP_MAX       = 12;
const ipHits = new Map();

// ⚠ The CDN keys on URL alone — it does not vary on a request body. Every
// response here must be no-store or one cached 401 poisons the endpoint for
// every parent behind that edge node.
function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
    },
    body: JSON.stringify(body),
  };
}

// One answer for every kind of "no". See the header comment.
const REFUSED = () => json(401, { ok: false, error: 'invalid' });

// ⚠ Must match _hashPinForDb() in engine/auth.js exactly, including the salt
// literal. This is one of the duplicated-on-purpose pairs CLAUDE.md lists:
// change one and a parent's stored PIN stops matching with no error anywhere.
function hashPin(pin) {
  return crypto.createHash('sha256').update(pin + ':psac_v1_db').digest('hex');
}

// Length-independent, then constant-time. timingSafeEqual THROWS on a length
// mismatch, which would itself be a timing signal and a 500.
function sameHash(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const ba = Buffer.from(a, 'utf8');
  const bb = Buffer.from(b, 'utf8');
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

function clientIp(event) {
  const h = event.headers || {};
  return h['x-nf-client-connection-ip'] || (h['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
}

function ipThrottled(ip) {
  const now = Date.now();
  const hits = (ipHits.get(ip) || []).filter(t => now - t < IP_WINDOW_MS);
  hits.push(now);
  ipHits.set(ip, hits);
  if (ipHits.size > 500) for (const [k, v] of ipHits) if (!v.some(t => now - t < IP_WINDOW_MS)) ipHits.delete(k);
  return hits.length > IP_MAX;
}

// ⚠ Never fire-and-forget, and never blocking. A sign-in that bypassed the
// password is exactly the event an audit trail exists for, so a failure to
// write it is logged loudly — but it must not stop a parent getting into their
// own account, or a broken log becomes a broken product.
async function audit(sb, userId, kind, detail) {
  try {
    const { error } = await sb.from('security_events').insert({ user_id: userId, kind, detail });
    if (error) console.error('[parent-pin-signin] AUDIT WRITE FAILED:', error.message);
  } catch (e) {
    console.error('[parent-pin-signin] AUDIT WRITE THREW:', e.message);
  }
}

async function readThrottle(sb, userId) {
  const { data } = await sb.from('parent_pin_attempts')
    .select('attempts, locked_until, lockouts').eq('user_id', userId).maybeSingle();
  return data || { attempts: 0, locked_until: null, lockouts: 0 };
}

async function noteFailure(sb, userId, current) {
  const attempts = (current.attempts || 0) + 1;
  const hit      = attempts >= MAX_ATTEMPTS;
  const lockouts = (current.lockouts || 0) + (hit ? 1 : 0);
  const lockMs   = hit ? lockMsFor(lockouts) : 0;
  const locked   = hit ? new Date(Date.now() + lockMs).toISOString() : null;
  await sb.from('parent_pin_attempts').upsert({
    user_id: userId,
    attempts: hit ? 0 : attempts,
    lockouts,
    locked_until: locked,
    last_try: new Date().toISOString(),
  }, { onConflict: 'user_id' });
  return { attempts, locked, lockMs };
}

async function noteSuccess(sb, userId) {
  await sb.from('parent_pin_attempts').upsert({
    user_id: userId,
    attempts: 0,
    lockouts: 0,
    locked_until: null,
    last_try: new Date().toISOString(),
    last_ok: new Date().toISOString(),
  }, { onConflict: 'user_id' });
}

// Mints a real GoTrue session for a user we have already authorised, without
// their password.
//
// ⚠ generateLink GENERATES; it does not send. That distinction is load-bearing
// here — every sign-up, resend and reset in this project spends one message
// from a shared Gmail quota of ~500/day, and a recovery path that quietly
// spent one per attempt would exhaust it. The link is never emailed and never
// returned to the browser; only the hashed token is used, immediately, on the
// server, to exchange for a session.
async function mintSession(sb, email) {
  const { data, error } = await sb.auth.admin.generateLink({ type: 'magiclink', email });
  if (error || !data?.properties?.hashed_token) {
    console.error('[parent-pin-signin] generateLink failed:', error?.message || 'no hashed_token');
    return null;
  }
  const anon = createClient(SB_URL, SB_ANON_KEY, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
  // GoTrue has answered to both names for a magic-link token hash across
  // versions, and the CDN client floats on @2. Try the specific one, then the
  // generic — a rename must not take the whole recovery path down.
  for (const type of ['magiclink', 'email']) {
    const { data: v, error: vErr } = await anon.auth.verifyOtp({ token_hash: data.properties.hashed_token, type });
    if (!vErr && v?.session?.access_token && v.session.refresh_token) return v.session;
  }
  console.error('[parent-pin-signin] verifyOtp did not return a session');
  return null;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { ok: false, error: 'method' });
  if (!SB_SERVICE_KEY) return json(500, { ok: false, error: 'not_configured' });

  const ip = clientIp(event);
  if (ipThrottled(ip)) return json(429, { ok: false, error: 'too_many' });

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch (_) { return json(400, { ok: false, error: 'bad_request' }); }

  const userId = String(body.user_id || '');
  const pin    = String(body.pin || '');
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) return REFUSED();
  if (!/^\d{4}$/.test(pin)) return REFUSED();

  const sb = createClient(SB_URL, SB_SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const throttle = await readThrottle(sb, userId);
  if (throttle.locked_until && new Date(throttle.locked_until).getTime() > Date.now()) {
    const secs = Math.ceil((new Date(throttle.locked_until).getTime() - Date.now()) / 1000);
    return json(423, { ok: false, error: 'locked', retry_after_s: secs });
  }

  const { data: profile } = await sb.from('profiles')
    .select('parent_pin_hash, role, disabled, deleted_at').eq('id', userId).maybeSingle();

  // ⚠ Every one of these is the same answer to the caller. The branches exist
  // only so the SERVER log can tell them apart.
  if (!profile)                     { console.warn('[parent-pin-signin] no profile'); return REFUSED(); }
  if (profile.role === 'admin')     { console.warn('[parent-pin-signin] admin refused'); return REFUSED(); }
  if (profile.disabled)             { console.warn('[parent-pin-signin] disabled account'); return REFUSED(); }
  if (profile.deleted_at)           { console.warn('[parent-pin-signin] closed account'); return REFUSED(); }
  if (!profile.parent_pin_hash)     { console.warn('[parent-pin-signin] no PIN on file'); return REFUSED(); }

  if (!sameHash(hashPin(pin), profile.parent_pin_hash)) {
    const res = await noteFailure(sb, userId, throttle);
    await audit(sb, userId, 'parent:pin_signin_fail',
      { ip, attempts: res.attempts, locked: !!res.locked, at: new Date().toISOString() });
    if (res.locked) return json(423, { ok: false, error: 'locked', retry_after_s: Math.ceil(res.lockMs / 1000) });
    return REFUSED();
  }

  const { data: userRow, error: userErr } = await sb.auth.admin.getUserById(userId);
  const email = userRow?.user?.email;
  if (userErr || !email) { console.error('[parent-pin-signin] no email for user'); return REFUSED(); }

  const session = await mintSession(sb, email);
  if (!session) return json(503, { ok: false, error: 'mint_failed' });

  await noteSuccess(sb, userId);
  await audit(sb, userId, 'parent:pin_signin', { ip, at: new Date().toISOString() });

  // Nothing but the two tokens. No email, no profile, no family — the browser
  // reads everything else through the session it is about to install.
  return json(200, {
    ok: true,
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  });
};
