'use strict';
// Shared administrator gate for the admin-only Netlify functions.
//
// Extracted because admin-account-recovery.js and admin-delete-account.js both
// need exactly this check, and it is the kind of duplicated logic CLAUDE.md
// lists under "change every copy together" - a drift here is not a cosmetic
// bug, it is an authorisation hole in whichever copy was forgotten.
//
// ⚠ Fails closed with no service key. A missing SUPABASE_SERVICE_ROLE_KEY used
// to be treated as "skip the check" elsewhere in this project, which turned one
// configuration mistake into an open endpoint.

const { createClient } = require('@supabase/supabase-js');

const SB_URL         = process.env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SB_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  };
}

// Returns { sb, caller, profile } on success, or { error } - already a complete
// Netlify response object - on any failure. The caller returns it unchanged, so
// there is no way to accidentally continue past a refused check.
async function requireAdmin(event) {
  if (!SB_SERVICE_KEY) return { error: json(500, { error: 'Server is missing SUPABASE_SERVICE_ROLE_KEY' }) };

  const jwt = (event.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
  if (!jwt) return { error: json(401, { error: 'Sign in again to continue.' }) };

  const sb = createClient(SB_URL, SB_SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: { user: caller } = {}, error: authError } = await sb.auth.getUser(jwt);
  if (authError || !caller) return { error: json(401, { error: 'Your sign-in session has expired.' }) };

  const { data: profile } = await sb.from('profiles')
    .select('role, is_super_admin, disabled').eq('id', caller.id).maybeSingle();
  if (profile?.role !== 'admin' || profile.disabled) {
    return { error: json(403, { error: 'Administrator access is required.' }) };
  }

  return { sb, caller, profile };
}

module.exports = { requireAdmin, json, SB_URL, SB_SERVICE_KEY };
