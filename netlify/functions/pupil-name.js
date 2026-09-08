'use strict';
// POST /api/pupil-name
// A pupil corrects their own name from guest.html after signing in with their
// own PIN.
//
// ⚠ ONLY per-pupil-PIN classrooms. teacher_guest_open() resolves that mode as
//   `key := pupil.id` — the identity is the UUID and the name is just a label,
//   so a rename cannot orphan a submission. In shared-PIN mode the name IS the
//   key; guest_set_my_name() refuses that mode rather than corrupting it, and
//   this function simply forwards the refusal.
//
// ⚠ Every change is recorded with who made it, by a trigger on the column, and
//   the teacher can read the trail. A child quietly taking another child's name
//   would otherwise leave no trace.
//
// Auth: the same session token as /api/material-done. Re-checked server-side.

const HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store, no-cache',
  'Access-Control-Allow-Origin': '*',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: HEADERS, body: '' };
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'method_not_allowed' }) };
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  // ⚠ Fails closed: a missing key is never "skip the check".
  if (!url || !key) {
    return { statusCode: 503, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'not_configured' }) };
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); }
  catch (_) { return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'bad_json' }) }; }

  const code = String(body.code || '').trim();
  const name = String(body.name || '').trim();
  const token = String(body.token || '');
  const newName = String(body.new_name || '').trim();

  if (!code || code.length > 32 || !name || name.length > 80 || !token || token.length > 128) {
    return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'bad_request' }) };
  }
  // The RPC enforces this too — this is only so an obviously empty box does not
  // cost a round trip.
  if (newName.length < 2 || newName.length > 40) {
    return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'bad_name' }) };
  }

  let out;
  try {
    const r = await fetch(url + '/rest/v1/rpc/guest_set_my_name', {
      method: 'POST',
      headers: { apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_code: code, p_name: name, p_token: token, p_new_name: newName }),
      signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    out = await r.json();
  } catch (e) {
    console.error('[pupil-name]', e.message);
    return { statusCode: 502, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'server_error' }) };
  }

  // The RPC's verdict, unchanged — including its cleaned-up version of the name.
  return { statusCode: 200, headers: HEADERS, body: JSON.stringify(out || { ok: false, error: 'server_error' }) };
};
