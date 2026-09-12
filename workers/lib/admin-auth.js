// Shared admin gate for Workers. Returns { caller, profile, sbUrl, sbKey } or { error: Response }.

const CORS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
  'Access-Control-Allow-Origin': '*',
};

export function json(status, body) {
  return new Response(JSON.stringify(body), { status, headers: CORS });
}

export async function requireAdmin(request, env) {
  const sbUrl = env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
  const sbKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!sbKey) return { error: json(500, { error: 'Server is missing SUPABASE_SERVICE_ROLE_KEY' }) };

  const jwt = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim();
  if (!jwt) return { error: json(401, { error: 'Sign in again to continue.' }) };

  const userRes = await fetch(`${sbUrl}/auth/v1/user`, {
    headers: { apikey: sbKey, Authorization: `Bearer ${jwt}` },
  });
  if (!userRes.ok) return { error: json(401, { error: 'Your sign-in session has expired.' }) };
  const caller = await userRes.json();
  if (!caller?.id) return { error: json(401, { error: 'Your sign-in session has expired.' }) };

  const profileRes = await fetch(
    `${sbUrl}/rest/v1/profiles?id=eq.${caller.id}&select=role,is_super_admin,disabled&limit=1`,
    { headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}` } }
  );
  const profiles = profileRes.ok ? await profileRes.json() : [];
  const profile = profiles[0];
  if (!profile || profile.role !== 'admin' || profile.disabled) {
    return { error: json(403, { error: 'Administrator access is required.' }) };
  }

  return { caller, profile, sbUrl, sbKey };
}
