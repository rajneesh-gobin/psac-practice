'use strict';
// ES module version of netlify/lib/student-auth.js for Cloudflare Workers.
// Same logic; crypto.subtle replaces Node's crypto module.

const DEFAULT_SB_URL = 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const TOKEN_RE = /^[A-Za-z0-9_-]{32,256}$/;

async function hashToken(token) {
  const enc = new TextEncoder().encode(String(token));
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function readHeader(headers, name) {
  if (!headers) return '';
  if (typeof headers.get === 'function') return (headers.get(name) || '').trim();
  const want = name.toLowerCase();
  for (const k of Object.keys(headers)) {
    if (k.toLowerCase() === want) return String(headers[k] || '').trim();
  }
  return '';
}

export async function resolveStudent(headers, opts) {
  const o     = opts || {};
  const sbUrl = o.supabaseUrl || DEFAULT_SB_URL;
  const srk   = o.serviceKey;
  const token = readHeader(headers, 'x-student-token');

  if (!token) return { ok: false, status: 401, error: 'Missing student session' };
  if (!TOKEN_RE.test(token)) return { ok: false, status: 401, error: 'Invalid session' };
  if (!srk) return { ok: false, status: 503, error: 'Auth not configured' };

  let res;
  try {
    const hash = await hashToken(token);
    res = await fetch(
      `${sbUrl}/rest/v1/student_sessions` +
      `?token_hash=eq.${encodeURIComponent(hash)}` +
      `&expires_at=gt.${encodeURIComponent(new Date().toISOString())}` +
      `&select=student_id&limit=1`,
      { headers: { apikey: srk, Authorization: `Bearer ${srk}` } }
    );
  } catch (_) {
    return { ok: false, status: 503, error: 'Auth check failed' };
  }
  if (!res.ok) return { ok: false, status: 503, error: 'Auth check failed' };

  let rows;
  try { rows = await res.json(); } catch (_) { return { ok: false, status: 503, error: 'Auth check failed' }; }
  const id = Array.isArray(rows) && rows[0] && rows[0].student_id;
  if (!id) return { ok: false, status: 401, error: 'Invalid session' };

  return { ok: true, studentId: id };
}
