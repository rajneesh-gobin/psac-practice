'use strict';
// Admin-only access to sign-ups that have not clicked their confirmation link.
// Those records live in auth.users and deliberately have no public profiles row
// yet, so this function is the only bridge from the member screen to Auth.

const { createClient } = require('@supabase/supabase-js');

const SB_URL         = process.env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SB_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const AUTH_PAGE_SIZE = 1000;
const DEFAULT_PAGE_SIZE = 30;

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  };
}

function parseCursor(value) {
  const match = String(value || '').match(/^(\d+):(\d+)$/);
  if (!match) return { page: 1, index: 0 };
  return { page: Math.max(1, Number(match[1])), index: Math.max(0, Number(match[2])) };
}

async function adminClient(event) {
  if (!SB_SERVICE_KEY) return { error: json(500, { error: 'Server is missing SUPABASE_SERVICE_ROLE_KEY' }) };
  const jwt = (event.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
  if (!jwt) return { error: json(401, { error: 'Sign in again to continue.' }) };
  const sb = createClient(SB_URL, SB_SERVICE_KEY, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: { user }, error } = await sb.auth.getUser(jwt);
  if (error || !user) return { error: json(401, { error: 'Your sign-in session has expired.' }) };
  const { data: profile } = await sb.from('profiles').select('role, disabled').eq('id', user.id).maybeSingle();
  if (profile?.role !== 'admin' || profile.disabled) return { error: json(403, { error: 'Administrator access is required.' }) };
  return { sb, caller: user };
}

function isPendingEmail(user) {
  return !!user?.email && !user.email_confirmed_at && !user.confirmed_at;
}

function publicRegistration(user) {
  return {
    id: user.id,
    email: user.email,
    full_name: user.user_metadata?.full_name || '',
    requested_role: user.user_metadata?.role || 'parent',
    created_at: user.created_at,
    confirmation_sent_at: user.confirmation_sent_at || null,
  };
}

async function listPending(sb, params) {
  const limit = Math.min(100, Math.max(1, Number(params.get('limit')) || DEFAULT_PAGE_SIZE));
  const term = String(params.get('search') || '').trim().toLowerCase();
  let { page, index } = parseCursor(params.get('cursor'));
  const registrations = [];
  let hasMore = true;

  // Auth has no server-side filter for unconfirmed email users. Walk its pages
  // until this page is full; the cursor preserves the exact Auth position so
  // there are no duplicates or skipped registrations on "Load more".
  while (registrations.length < limit && hasMore) {
    const { data, error } = await sb.auth.admin.listUsers({ page, perPage: AUTH_PAGE_SIZE });
    if (error) return { error: error.message || 'Could not read pending registrations.' };
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
  return { registrations, next_cursor: hasMore ? `${page}:${index}` : null };
}

exports.handler = async (event) => {
  if (!['GET', 'POST'].includes(event.httpMethod)) return json(405, { error: 'Method not allowed' });
  const access = await adminClient(event);
  if (access.error) return access.error;

  if (event.httpMethod === 'GET') {
    const result = await listPending(access.sb, new URLSearchParams(event.queryStringParameters || {}));
    return result.error ? json(500, { error: result.error }) : json(200, { ok: true, ...result });
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch (_) { return json(400, { error: 'Invalid request.' }); }
  if (body.action !== 'activate' || !/^[0-9a-f-]{36}$/i.test(String(body.user_id || ''))) {
    return json(400, { error: 'Invalid activation request.' });
  }
  const { data: current, error: readError } = await access.sb.auth.admin.getUserById(body.user_id);
  if (readError || !current?.user) return json(404, { error: 'Registration was not found.' });
  if (!isPendingEmail(current.user)) return json(409, { error: 'This account is already activated.' });

  const { data, error } = await access.sb.auth.admin.updateUserById(body.user_id, { email_confirm: true });
  if (error || !data?.user?.email_confirmed_at) return json(500, { error: error?.message || 'Could not activate this account.' });
  console.log(`[pending-registrations] ${access.caller.email} manually activated ${current.user.email}`);
  return json(200, { ok: true, email: current.user.email });
};
