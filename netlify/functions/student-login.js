// Netlify Function - Secure student PIN login
// Handles:
//   • scrypt PIN verification (no plain PIN ever returned to browser)
//   • Server-side lockout (persists across page refreshes)
//   • Lazy migration: plain PINs are hashed on first successful login

const crypto = require('crypto');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const MAX_ATTEMPTS  = 5;
const LOCKOUT_SECS  = 60;

// ── Supabase helpers ──────────────────────────
async function sbGet(path) {
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  return res.ok ? res.json() : null;
}

async function sbPatch(table, id, payload) {
  await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json', Prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
  });
}

// ── scrypt helpers ────────────────────────────
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

async function verifyPin(pin, stored) {
  const colonIdx = stored.indexOf(':');
  if (colonIdx === -1) return false;
  const salt    = stored.slice(0, colonIdx);
  const hashHex = stored.slice(colonIdx + 1);
  const derived = await _scrypt(pin, salt);
  try {
    return crypto.timingSafeEqual(Buffer.from(hashHex, 'hex'), derived);
  } catch {
    return false;
  }
}

// ── Handler ───────────────────────────────────
exports.handler = async (event) => {
  const headers = { 'Content-Type': 'application/json' };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST')    return { statusCode: 405, headers, body: '{}' };

  if (!SUPABASE_KEY) {
    // Service role key not configured - fall through to client-side (dev only)
    return { statusCode: 503, headers, body: JSON.stringify({ error: 'not_configured' }) };
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return { statusCode: 400, headers, body: '{}' }; }

  const { username, pin } = body;
  if (!username || !pin) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing fields' }) };
  }

  // Sanitise username
  const safeUsername = String(username).toLowerCase().replace(/[^a-z0-9_.-]/g, '').slice(0, 30);

  // Fetch student (never return pin/pin_hash to caller)
  const rows = await sbGet(
    `/rest/v1/students?username=eq.${encodeURIComponent(safeUsername)}` +
    `&select=id,display_name,avatar,grade,settings,session_version,pin,pin_hash,pin_attempts,pin_locked_until&limit=1`
  );
  const student = rows?.[0];

  // Always return the same generic error - no username enumeration
  if (!student) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid credentials', attemptsLeft: MAX_ATTEMPTS }) };
  }

  // ── Check lockout ──
  if (student.pin_locked_until && new Date(student.pin_locked_until) > new Date()) {
    const secsLeft = Math.ceil((new Date(student.pin_locked_until) - Date.now()) / 1000);
    return { statusCode: 429, headers, body: JSON.stringify({ error: 'locked', secsLeft }) };
  }

  // ── Verify PIN ──
  let valid      = false;
  let needsRehash = false;

  if (student.pin_hash) {
    valid = await verifyPin(String(pin), student.pin_hash);
  } else if (student.pin) {
    // Legacy plain-text path - lazy migration on success
    valid = String(pin) === String(student.pin);
    if (valid) needsRehash = true;
  }

  // ── Wrong PIN ──
  if (!valid) {
    const attempts = (student.pin_attempts || 0) + 1;
    const locked   = attempts >= MAX_ATTEMPTS;
    await sbPatch('students', student.id, {
      pin_attempts:    attempts,
      pin_locked_until: locked ? new Date(Date.now() + LOCKOUT_SECS * 1000).toISOString() : null,
    });
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({
        error:       'Invalid credentials',
        attemptsLeft: Math.max(0, MAX_ATTEMPTS - attempts),
        locked,
      }),
    };
  }

  // ── Correct PIN - reset counter, migrate hash if needed ──
  const update = { pin_attempts: 0, pin_locked_until: null };
  if (needsRehash) {
    update.pin_hash = await hashPin(String(pin));
    update.pin      = null; // clear the plain-text column
  }
  await sbPatch('students', student.id, update);

  // Return only the fields _loginStudentRow needs - never the PIN
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      id:              student.id,
      display_name:    student.display_name,
      avatar:          student.avatar,
      grade:           student.grade,
      settings:        student.settings,
      session_version: student.session_version || 0,
    }),
  };
};
