// Netlify Function — Set / update a student PIN
// Called by the parent dashboard when creating or editing a child account.
// Hashes the PIN with scrypt before storing — the plain PIN never touches the DB.

const crypto = require('crypto');

const SUPABASE_URL  = process.env.SUPABASE_URL  || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SUPABASE_SRK  = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ANON = process.env.SUPABASE_ANON_KEY || 'sb_publishable_wERRrZnvoWhM5faN2AaYpQ_CpTNHFkL';

async function sbFetch(path, opts = {}) {
  const key = opts.useAnon ? SUPABASE_ANON : SUPABASE_SRK;
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    ...opts,
    headers: {
      apikey: key, Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
  });
  return res;
}

function _scrypt(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(String(password), salt, 32, { N: 16384, r: 8, p: 1 }, (err, hash) => {
      err ? reject(err) : resolve(hash);
    });
  });
}

async function hashPin(pin) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = await _scrypt(pin, salt);
  return `${salt}:${hash.toString('hex')}`;
}

exports.handler = async (event) => {
  const headers = { 'Content-Type': 'application/json' };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST')    return { statusCode: 405, headers, body: '{}' };

  if (!SUPABASE_SRK) return { statusCode: 503, headers, body: JSON.stringify({ error: 'not_configured' }) };

  // ── Verify parent JWT ──
  const jwt = (event.headers['authorization'] || '').replace(/^Bearer\s+/i, '').trim();
  if (!jwt) return { statusCode: 401, headers, body: JSON.stringify({ error: 'No token' }) };

  const authRes = await sbFetch('/auth/v1/user', {
    useAnon: true,
    headers: { Authorization: `Bearer ${jwt}` },
  });
  if (!authRes.ok) return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid token' }) };
  const user = await authRes.json();

  // ── Parse body ──
  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return { statusCode: 400, headers, body: '{}' }; }

  const { studentId, pin } = body;
  if (!studentId || !/^\d{4}$/.test(String(pin))) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'studentId and 4-digit pin required' }) };
  }

  // ── Verify parent owns this student ──
  const famRes = await sbFetch(`/rest/v1/families?owner_id=eq.${user.id}&select=id&limit=1`);
  const famRows = famRes.ok ? await famRes.json() : [];
  const family  = famRows?.[0];
  if (!family) return { statusCode: 403, headers, body: JSON.stringify({ error: 'No family found' }) };

  const stuRes  = await sbFetch(`/rest/v1/students?id=eq.${studentId}&family_id=eq.${family.id}&select=id&limit=1`);
  const stuRows = stuRes.ok ? await stuRes.json() : [];
  if (!stuRows?.length) return { statusCode: 403, headers, body: JSON.stringify({ error: 'Student not in your family' }) };

  // ── Hash and store ──
  const pinHash = await hashPin(String(pin));
  await sbFetch(`/rest/v1/students?id=eq.${studentId}`, {
    method:  'PATCH',
    body:    JSON.stringify({ pin_hash: pinHash, pin: null, pin_attempts: 0, pin_locked_until: null }),
    headers: { Prefer: 'return=minimal' },
  });

  return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
};
