'use strict';
// POST /api/guest-device
// A device in a SHARED-PIN classroom registers the name it is being used under,
// before /api/assignment-open.
//
// ⚠ WHAT THIS FIXES AS WELL AS ADDS. teacher_guest_open() refuses to reopen a
//   shared-PIN assignment while an unsubmitted row exists for that name, to stop
//   one child claiming another's. It cannot tell that from the same child
//   reloading, so a reload answered "Someone with that name has already done
//   this assignment" — a lockout, and untrue. The device code is what separates
//   the two cases; guest_device_claim() clears only the caller's OWN abandoned
//   row and never a submitted one.
//
// ⚠ The device code identifies a DEVICE, not a person. Two children sharing a
//   tablet collide; one child on two devices appears twice. Teacher-facing
//   wording says "device" for that reason.

const HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store, no-cache',
  'Access-Control-Allow-Origin': '*',
};

const DEVICE_RE = /^[0-9a-f]{32}$/;

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: HEADERS, body: '' };
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'method_not_allowed' }) };
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  // ⚠ Fails closed.
  if (!url || !key) {
    return { statusCode: 503, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'not_configured' }) };
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); }
  catch (_) { return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'bad_json' }) }; }

  const code = String(body.code || '').trim();
  const device = String(body.device || '').trim().toLowerCase();
  const name = String(body.name || '').trim();

  if (!code || code.length > 32 || !name || name.length > 40) {
    return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'bad_request' }) };
  }
  // ⚠ Shape-checked here AND by a CHECK constraint on the table. A device code
  //   that is not 32 hex characters is a client bug, not a value to store.
  if (!DEVICE_RE.test(device)) {
    return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'bad_device' }) };
  }

  let out;
  try {
    const r = await fetch(url + '/rest/v1/rpc/guest_device_claim', {
      method: 'POST',
      headers: { apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_code: code, p_device: device, p_name: name }),
      signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    out = await r.json();
  } catch (e) {
    console.error('[guest-device]', e.message);
    return { statusCode: 502, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'server_error' }) };
  }

  return { statusCode: 200, headers: HEADERS, body: JSON.stringify(out || { ok: false, error: 'server_error' }) };
};
