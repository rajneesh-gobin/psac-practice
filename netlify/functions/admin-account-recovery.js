'use strict';
// Admin-only password recovery. The email address is read and used only on the
// server through the service role; the browser receives no account email or
// password-reset token.

const crypto = require('crypto');
// ⚠ The administrator gate lives in ONE place now, shared with
// admin-delete-account.js. Two hand-copied authorisation checks are two
// chances to fix only one of them - see CLAUDE.md on duplicated code.
const { requireAdmin, json } = require('../lib/admin-auth');

const COOLDOWN_MS = 60 * 1000;
const recentRequests = new Map();

// Read aloud over the phone or typed off a WhatsApp message, so for every pair
// of symbols a person confuses, ONLY ONE is in the alphabet. Lower case
// throughout, so case is never a question either.
//   0/o  1/l/i  5/s  8/b   -> the digit is dropped, the letter kept
//   2/z  6/b  9/g  9/q     -> the letter is dropped, the digit kept
// 25 symbols x 12 characters is ~56 bits, far beyond anything guessable in the
// hours between an administrator reading it out and the parent changing it.
// ⚠ Checked by scripts/test-temp-password.js, which asserts the PAIRS rather
// than a list of banned characters - "s is absent" is the wrong property, since
// s is only confusable with a 5 that is not there.
const TEMP_ALPHABET = 'acdefhjkmnprstuvwxy234679';
function generateTempPassword() {
  const bytes = crypto.randomBytes(24);
  let out = '';
  // ⚠ Rejection sampling, not `% length`. Modulo over a 256-value byte biases
  // the first few symbols of a 29-symbol alphabet, and a password generator
  // that quietly favours some characters is exactly the kind of thing nobody
  // ever notices.
  for (let i = 0; i < bytes.length && out.length < 12; i++) {
    const limit = 256 - (256 % TEMP_ALPHABET.length);
    if (bytes[i] >= limit) continue;
    out += TEMP_ALPHABET[bytes[i] % TEMP_ALPHABET.length];
  }
  while (out.length < 12) out += TEMP_ALPHABET[crypto.randomInt(TEMP_ALPHABET.length)];
  return out.slice(0, 4) + '-' + out.slice(4, 8) + '-' + out.slice(8, 12);
}

// ⚠ Never fire-and-forget, and never blocking. A password set by one person on
// another person's account is exactly the event an audit log exists for, so a
// failure to write it is logged loudly - but it must not stop the admin
// recovering the account, or a broken log becomes a broken product.
async function auditPasswordSet(sb, caller, targetId, targetEmail) {
  try {
    const { error } = await sb.from('security_events').insert({
      user_id: targetId,
      kind: 'admin:password_set',
      detail: {
        by: caller.id,
        by_email: caller.email || null,
        target_email: targetEmail || null,
        at: new Date().toISOString(),
      },
    });
    if (error) console.error('[admin-account-recovery] AUDIT WRITE FAILED:', error.message);
  } catch (e) {
    console.error('[admin-account-recovery] AUDIT WRITE THREW:', e.message);
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });

  const gate = await requireAdmin(event);
  if (gate.error) return gate.error;
  const { sb, caller, profile: callerProfile } = gate;

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch (_) { return json(400, { error: 'Invalid request.' }); }
  const userId = String(body.user_id || '');
  if (!/^[0-9a-f-]{36}$/i.test(userId)) return json(400, { error: 'Invalid account.' });

  // ⚠ The throttle covers BOTH actions, but for different reasons, so it must
  // not describe both as an email. Sending a reset link twice wastes a message
  // from a very small hourly quota; setting a temporary password twice silently
  // invalidates the one the administrator has just read out to somebody, which
  // is worse. Same 60s, different sentence.
  const isSetPassword = String(body.action || '') === 'set_password';
  const last = recentRequests.get(userId) || 0;
  if (Date.now() - last < COOLDOWN_MS) {
    return json(429, { error: isSetPassword
      ? 'This account was changed less than a minute ago. Wait a moment before setting another password, '
        + 'or the one you were just given stops working.'
      : 'A reset email was sent recently. Please wait one minute before sending another.' });
  }

  const { data: target, error: targetError } = await sb.auth.admin.getUserById(userId);
  if (targetError || !target?.user?.email) return json(404, { error: 'This account has no email sign-in.' });

  // ── Set a temporary password directly, with no email at all ──────────────
  // The project sends auth email through Supabase's built-in service, capped at
  // 2 messages an hour, so the reset-link path above can simply be unavailable
  // when somebody needs it. This is the way back in that does not depend on
  // mail: the password is generated HERE, returned to the administrator once,
  // and passed to the parent out of band.
  if (isSetPassword) {
    // ⚠ An administrator may not take over a peer administrator's account.
    // Everything else on this screen is reversible or visible to the person it
    // was done to; silently replacing another admin's password is neither, and
    // it is a straight privilege grab between equals. Only a super admin may.
    const { data: targetProfile } = await sb.from('profiles')
      .select('role, is_super_admin').eq('id', userId).maybeSingle();
    if (targetProfile?.role === 'admin' && !callerProfile.is_super_admin) {
      return json(403, { error: "Only a super administrator may set another administrator's password." });
    }

    const tempPassword = generateTempPassword();
    const { error: setError } = await sb.auth.admin.updateUserById(userId, { password: tempPassword });
    if (setError) return json(500, { error: setError.message || 'Could not set a new password.' });

    recentRequests.set(userId, Date.now());
    await auditPasswordSet(sb, caller, userId, target.user.email);
    // ⚠ The password is in the RESPONSE and in nothing else: never in a log
    // line, never in the audit row. It is shown to the administrator once.
    console.log(`[admin-account-recovery] ${caller.email} set a temporary password for ${userId}`);
    return json(200, { ok: true, password: tempPassword, email: target.user.email });
  }

  // Supabase sends the configured recovery email and uses the project Site URL
  // / allowed redirect URLs. No raw reset link is returned to an administrator.
  const { error: recoveryError } = await sb.auth.resetPasswordForEmail(target.user.email);
  if (recoveryError) return json(500, { error: recoveryError.message || 'Could not send the password-reset email.' });
  recentRequests.set(userId, Date.now());
  console.log(`[admin-account-recovery] ${caller.email} requested password recovery for ${userId}`);
  return json(200, { ok: true });
};
