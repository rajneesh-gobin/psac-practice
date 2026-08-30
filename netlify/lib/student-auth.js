// ══════════════════════════════════════════════════════════════════════════
//  Student authentication for Netlify Functions
//
//  A child has no Supabase JWT — they sign in with a PIN and get an opaque
//  session token, stored SHA-256-hashed in student_sessions with an expiry.
//  That token is what RLS resolves through current_student_id(), so it is the
//  only thing in the system that actually proves "I am this student".
//
//  ⚠ Functions used to accept a bare X-Student-Id header and treat "this UUID
//  exists in students" as authentication. Existence is not proof of possession:
//  anyone holding a student UUID — which is a permanent identifier sitting in
//  client state, never rotated, shared across every device that child uses —
//  could read that child's plan-gated and reward-gated content, and (in
//  notify.js) trigger email to their parent. The id is an identifier, not a
//  credential; this module is the credential check.
//
//  This mirrors current_student_id() in supabase-schema.sql deliberately:
//  same token, same sha256 hex hash, same expires_at > now() rule. If either
//  side changes, both must.
// ══════════════════════════════════════════════════════════════════════════
'use strict';

const crypto = require('crypto');

const DEFAULT_SB_URL = 'https://xawvjwsiqhtxgpocdqgm.supabase.co';

// Same digest current_student_id() computes: encode(digest(tok,'sha256'),'hex').
function hashToken(token) {
  return crypto.createHash('sha256').update(String(token), 'utf8').digest('hex');
}

// Header lookup that does not depend on the platform's casing. Netlify
// lower-cases incoming header names today, but a function invoked through a
// different path (or a local dev proxy) may not, and a silently-missed header
// here fails closed in a way that looks like a broken login.
function readHeader(headers, name) {
  if (!headers) return '';
  const want = name.toLowerCase();
  for (const k of Object.keys(headers)) {
    if (k.toLowerCase() === want) return String(headers[k] || '').trim();
  }
  return '';
}

// Cheap shape check before spending a round trip. The token is 32 random bytes
// hex-encoded by the database; current_student_id() rejects anything under 32
// characters, so this rejects the same set plus obvious junk.
const TOKEN_RE = /^[A-Za-z0-9_-]{32,256}$/;

/**
 * Resolve the student behind an X-Student-Token header.
 *
 * Returns { ok: true, studentId } or { ok: false, status, error }.
 * Never throws — a transport failure is reported as a 503 so the caller can
 * tell "your token is wrong" apart from "we could not check right now".
 */
async function resolveStudent(headers, opts) {
  const o       = opts || {};
  const sbUrl   = o.supabaseUrl || process.env.SUPABASE_URL || DEFAULT_SB_URL;
  const srk     = o.serviceKey  || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const token   = readHeader(headers, 'x-student-token');

  if (!token) return { ok: false, status: 401, error: 'Missing student session' };
  if (!TOKEN_RE.test(token)) return { ok: false, status: 401, error: 'Invalid session' };

  // ⚠ Fails CLOSED when the service key is absent. The old code treated a
  // missing key as "skip the check and trust the caller", which turned a
  // configuration mistake into an open endpoint.
  if (!srk) return { ok: false, status: 503, error: 'Auth not configured' };

  let res;
  try {
    // Query by the HASH. The plaintext token never goes into a URL, where it
    // would end up in request logs.
    res = await fetch(
      `${sbUrl}/rest/v1/student_sessions` +
      `?token_hash=eq.${encodeURIComponent(hashToken(token))}` +
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
  // Expired, revoked and never-existed all answer the same thing, so a caller
  // cannot probe which tokens were ever real.
  if (!id) return { ok: false, status: 401, error: 'Invalid session' };

  return { ok: true, studentId: id };
}

module.exports = { resolveStudent, hashToken, readHeader, TOKEN_RE };
