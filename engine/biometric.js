'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice - Biometric unlock (parent accounts, mobile only)
//
//  A device-local WebAuthn gate: the phone's platform authenticator
//  (Face/Touch ID, Android fingerprint) proves "same person present" before a
//  parent's already-persisted Supabase session is shown on next app open.
//
//  This is deliberately NOT a server-verified auth factor - nothing here is
//  checked by Supabase or any backend, so it needed no new table and no new
//  endpoint. It is exactly as strong as the device's own screen lock: anyone
//  who can unlock the phone can also tap "Use password instead" and sign in
//  the normal way. The value is convenience + a second local gate on a shared
//  family device, not a stronger security boundary than the device already is.
//
//  Enrollment is per-device (a WebAuthn credential never leaves the device it
//  was created on) and per-parent (keyed on profiles.id, which is also the
//  Supabase auth user id).
// ══════════════════════════════════════════════

const Biometric = (() => {
  const KEY_PREFIX = 'psac_biometric_';

  function _key(userId) { return KEY_PREFIX + userId; }

  function _b64urlToBuf(b64url) {
    const pad = '='.repeat((4 - b64url.length % 4) % 4);
    const b64 = (b64url + pad).replace(/-/g, '+').replace(/_/g, '/');
    const bin = atob(b64);
    const buf = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
    return buf.buffer;
  }

  function _bufToB64url(buf) {
    const bytes = new Uint8Array(buf);
    let bin = '';
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function _isMobile() {
    try {
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '')) return true;
      return !!(matchMedia('(pointer: coarse)').matches && navigator.maxTouchPoints > 0);
    } catch(_) { return false; }
  }

  let _platformCapable = null; // cached for the life of the tab
  async function _platformAuthAvailable() {
    if (_platformCapable !== null) return _platformCapable;
    try {
      _platformCapable = !!(window.PublicKeyCredential
        && PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable
        && await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable());
    } catch(_) { _platformCapable = false; }
    return _platformCapable;
  }

  // Worth offering only on a touch device whose OS reports a platform
  // authenticator (Face/Touch ID, fingerprint reader) is actually set up.
  async function isAvailable() {
    if (!_isMobile()) return false;
    return _platformAuthAvailable();
  }

  function isEnrolled(userId) {
    if (!userId) return false;
    try { return !!localStorage.getItem(_key(userId)); } catch(_) { return false; }
  }

  function _getEntry(userId) {
    try {
      const raw = localStorage.getItem(_key(userId));
      return raw ? JSON.parse(raw) : null;
    } catch(_) { return null; }
  }

  // The create() call itself prompts for the fingerprint/face - a successful
  // resolve already IS the proof of presence, so there is nothing further to
  // verify server-side.
  async function enroll(userId, email) {
    if (!userId) return { ok: false, error: 'No account.' };
    if (!window.PublicKeyCredential) return { ok: false, error: 'Not supported on this browser.' };
    try {
      const challenge = crypto.getRandomValues(new Uint8Array(32));
      const userIdBuf = new TextEncoder().encode(String(userId)).slice(0, 64);
      const cred = await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: { name: 'PSAC Exam Practice' },
          user: { id: userIdBuf, name: email || 'parent', displayName: email || 'Parent' },
          pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
          authenticatorSelection: { authenticatorAttachment: 'platform', userVerification: 'required', residentKey: 'preferred' },
          timeout: 60000,
        },
      });
      if (!cred) return { ok: false, error: 'Enrollment cancelled.' };
      localStorage.setItem(_key(userId), JSON.stringify({ credId: _bufToB64url(cred.rawId), email: email || '' }));
      return { ok: true };
    } catch(e) {
      return { ok: false, error: e.name === 'NotAllowedError' ? 'Cancelled, or no fingerprint/face set up on this device.' : (e.message || 'Enrollment failed.') };
    }
  }

  function unenroll(userId) {
    try { localStorage.removeItem(_key(userId)); } catch(_) {}
  }

  // Prompts the platform authenticator. A resolved promise IS the proof of
  // presence - see the file header for why nothing else is checked here.
  async function verify(userId) {
    const entry = _getEntry(userId);
    if (!entry) return { ok: false, error: 'not_enrolled' };
    try {
      const challenge = crypto.getRandomValues(new Uint8Array(32));
      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge,
          allowCredentials: [{ id: _b64urlToBuf(entry.credId), type: 'public-key' }],
          userVerification: 'required',
          timeout: 60000,
        },
      });
      return { ok: !!assertion };
    } catch(e) {
      return { ok: false, error: e.name === 'NotAllowedError' ? 'cancelled' : (e.message || 'failed') };
    }
  }

  return { isAvailable, isEnrolled, enroll, unenroll, verify };
})();
