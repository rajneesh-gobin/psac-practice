// POST /api/parent-pin-signin — verify parent PIN and mint a session token.
// Uses crypto.subtle (Web Crypto API) instead of Node.js crypto.

const HEADERS = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'Access-Control-Allow-Origin': '*' };
const SB_URL_DEFAULT = 'https://xawvjwsiqhtxgpocdqgm.supabase.co';

async function hashPin(pin) {
  const data = new TextEncoder().encode(pin + ':psac_v1_db');
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function json(status, body) {
  return new Response(JSON.stringify(body), { status, headers: HEADERS });
}

export default async function handler(request, env) {
  if (request.method === 'OPTIONS') return new Response('', { status: 200, headers: HEADERS });
  if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' });

  const sbUrl = env.SUPABASE_URL || SB_URL_DEFAULT;
  const sbSrk = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!sbSrk) return json(503, { error: 'not_configured' });

  const sbHeaders = { apikey: sbSrk, Authorization: `Bearer ${sbSrk}`, 'Content-Type': 'application/json' };

  let body;
  try { body = await request.json(); } catch { return json(400, { error: 'bad_request' }); }

  const jwt = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim();
  if (!jwt) return json(401, { error: 'Unauthorised' });

  // Resolve the parent from their JWT
  const userRes = await fetch(`${sbUrl}/auth/v1/user`, {
    headers: { apikey: sbSrk, Authorization: `Bearer ${jwt}` },
  });
  if (!userRes.ok) return json(401, { error: 'Unauthorised' });
  const caller = await userRes.json();
  if (!caller?.id) return json(401, { error: 'Unauthorised' });

  const profileRes = await fetch(
    `${sbUrl}/rest/v1/profiles?id=eq.${caller.id}&select=id,role,parent_pin_hash,is_super_admin&limit=1`,
    { headers: sbHeaders }
  );
  const profiles = profileRes.ok ? await profileRes.json() : [];
  const profile = profiles[0];
  if (!profile) return json(401, { error: 'Unauthorised' });

  if (profile.role === 'admin' || profile.is_super_admin) return json(401, { error: 'Unauthorised' });

  const pin = String(body.pin || '').trim();
  if (!pin || !/^\d{4}$/.test(pin)) return json(400, { error: 'bad_pin_format' });

  if (!profile.parent_pin_hash) return json(401, { error: 'no_pin_set' });

  // Rate-limit: check recent attempts
  const windowStart = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  const attemptsRes = await fetch(
    `${sbUrl}/rest/v1/parent_pin_attempts?parent_id=eq.${caller.id}&created_at=gte.${encodeURIComponent(windowStart)}&select=id&limit=10`,
    { headers: sbHeaders }
  );
  const attempts = attemptsRes.ok ? await attemptsRes.json() : [];
  if (attempts.length >= 5) return json(429, { error: 'too_many_attempts' });

  const candidate = await hashPin(pin);
  const ok = timingSafeEqual(candidate, profile.parent_pin_hash);

  // Log the attempt
  await fetch(`${sbUrl}/rest/v1/parent_pin_attempts`, {
    method: 'POST',
    headers: { ...sbHeaders, Prefer: 'return=minimal' },
    body: JSON.stringify({ parent_id: caller.id, success: ok }),
  });

  if (!ok) return json(401, { error: 'wrong_pin' });

  // Mint a PIN session token via RPC
  const tokenRes = await fetch(`${sbUrl}/rest/v1/rpc/mint_parent_pin_session`, {
    method: 'POST',
    headers: sbHeaders,
    body: JSON.stringify({ p_parent_id: caller.id }),
  });
  if (!tokenRes.ok) return json(502, { error: 'token_error' });
  const tokenData = await tokenRes.json();

  return json(200, { ok: true, token: tokenData?.token || tokenData });
}
