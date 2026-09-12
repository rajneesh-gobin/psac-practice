// POST /api/admin-account-recovery — admin sets temporary password or sends reset email.

import { requireAdmin, json } from '../lib/admin-auth.js';

const COOLDOWN_MS = 60 * 1000;
const recentRequests = new Map();

const TEMP_ALPHABET = 'acdefhjkmnprstuvwxy234679';

function generateTempPassword() {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  let out = '';
  for (let i = 0; i < bytes.length && out.length < 12; i++) {
    const limit = 256 - (256 % TEMP_ALPHABET.length);
    if (bytes[i] >= limit) continue;
    out += TEMP_ALPHABET[bytes[i] % TEMP_ALPHABET.length];
  }
  while (out.length < 12) {
    const b = new Uint8Array(1);
    crypto.getRandomValues(b);
    const limit = 256 - (256 % TEMP_ALPHABET.length);
    if (b[0] < limit) out += TEMP_ALPHABET[b[0] % TEMP_ALPHABET.length];
  }
  return out.slice(0, 4) + '-' + out.slice(4, 8) + '-' + out.slice(8, 12);
}

export default async function handler(request, env) {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed' });

  const gate = await requireAdmin(request, env);
  if (gate.error) return gate.error;
  const { caller, profile: callerProfile, sbUrl, sbKey } = gate;
  const sbH = { apikey: sbKey, Authorization: `Bearer ${sbKey}`, 'Content-Type': 'application/json' };

  let body;
  try { body = await request.json(); } catch { return json(400, { error: 'Invalid request.' }); }
  const userId = String(body.user_id || '');
  if (!/^[0-9a-f-]{36}$/i.test(userId)) return json(400, { error: 'Invalid account.' });

  const isSetPassword = String(body.action || '') === 'set_password';
  const last = recentRequests.get(userId) || 0;
  if (Date.now() - last < COOLDOWN_MS) {
    return json(429, { error: isSetPassword
      ? 'This account was changed less than a minute ago. Wait a moment before setting another password, or the one you were just given stops working.'
      : 'A reset email was sent recently. Please wait one minute before sending another.' });
  }

  const targetRes = await fetch(`${sbUrl}/auth/v1/admin/users/${userId}`, { headers: sbH });
  if (!targetRes.ok || !(await targetRes.json().then(d => d?.email))) return json(404, { error: 'This account has no email sign-in.' });
  const target = await targetRes.clone().json().catch(() => ({}));
  const targetEmail = target?.email || null;

  if (isSetPassword) {
    const targetProfileRes = await fetch(`${sbUrl}/rest/v1/profiles?id=eq.${userId}&select=role,is_super_admin&limit=1`, { headers: sbH });
    const targetProfiles = targetProfileRes.ok ? await targetProfileRes.json() : [];
    const targetProfile = targetProfiles[0];
    if (targetProfile?.role === 'admin' && !callerProfile.is_super_admin) {
      return json(403, { error: "Only a super administrator may set another administrator's password." });
    }

    const tempPassword = generateTempPassword();
    const setRes = await fetch(`${sbUrl}/auth/v1/admin/users/${userId}`, {
      method: 'PUT', headers: sbH, body: JSON.stringify({ password: tempPassword }),
    });
    if (!setRes.ok) return json(500, { error: 'Could not set a new password.' });

    recentRequests.set(userId, Date.now());
    await fetch(`${sbUrl}/rest/v1/security_events`, {
      method: 'POST', headers: { ...sbH, Prefer: 'return=minimal' },
      body: JSON.stringify({ user_id: userId, kind: 'admin:password_set', detail: { by: caller.id, by_email: caller.email || null, target_email: targetEmail, at: new Date().toISOString() } }),
    }).catch(e => console.error('[admin-account-recovery] AUDIT WRITE FAILED:', e.message));

    console.log(`[admin-account-recovery] ${caller.email} set a temporary password for ${userId}`);
    return json(200, { ok: true, password: tempPassword, email: targetEmail });
  }

  const recoveryRes = await fetch(`${sbUrl}/auth/v1/recover`, {
    method: 'POST', headers: { apikey: sbKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: targetEmail }),
  });
  if (!recoveryRes.ok) return json(500, { error: 'Could not send the password-reset email.' });
  recentRequests.set(userId, Date.now());
  console.log(`[admin-account-recovery] ${caller.email} requested password recovery for ${userId}`);
  return json(200, { ok: true });
}
