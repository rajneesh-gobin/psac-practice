'use strict';
// Admin-only password recovery. The email address is read and used only on the
// server through the service role; the browser receives no account email or
// password-reset token.

const { createClient } = require('@supabase/supabase-js');

const SB_URL         = process.env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SB_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const COOLDOWN_MS = 60 * 1000;
const recentRequests = new Map();

function json(statusCode, body) {
  return { statusCode, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: JSON.stringify(body) };
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });
  if (!SB_SERVICE_KEY) return json(500, { error: 'Server is missing SUPABASE_SERVICE_ROLE_KEY' });
  const jwt = (event.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
  if (!jwt) return json(401, { error: 'Sign in again to continue.' });

  const sb = createClient(SB_URL, SB_SERVICE_KEY, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: { user: caller }, error: authError } = await sb.auth.getUser(jwt);
  if (authError || !caller) return json(401, { error: 'Your sign-in session has expired.' });
  const { data: callerProfile } = await sb.from('profiles').select('role,disabled').eq('id', caller.id).maybeSingle();
  if (callerProfile?.role !== 'admin' || callerProfile.disabled) return json(403, { error: 'Administrator access is required.' });

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch (_) { return json(400, { error: 'Invalid request.' }); }
  const userId = String(body.user_id || '');
  if (!/^[0-9a-f-]{36}$/i.test(userId)) return json(400, { error: 'Invalid account.' });

  const last = recentRequests.get(userId) || 0;
  if (Date.now() - last < COOLDOWN_MS) return json(429, { error: 'A reset email was sent recently. Please wait one minute before sending another.' });

  const { data: target, error: targetError } = await sb.auth.admin.getUserById(userId);
  if (targetError || !target?.user?.email) return json(404, { error: 'This account has no email sign-in.' });

  // Supabase sends the configured recovery email and uses the project Site URL
  // / allowed redirect URLs. No raw reset link is returned to an administrator.
  const { error: recoveryError } = await sb.auth.resetPasswordForEmail(target.user.email);
  if (recoveryError) return json(500, { error: recoveryError.message || 'Could not send the password-reset email.' });
  recentRequests.set(userId, Date.now());
  console.log(`[admin-account-recovery] ${caller.email} requested password recovery for ${userId}`);
  return json(200, { ok: true });
};
