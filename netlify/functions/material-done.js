'use strict';
// POST /api/material-done
// A pupil ticks (or unticks) a PDF / video / link as done from guest.html.
//
// ⚠ THIS IS A CLAIM, NOT A MARK. Nothing here can grade a worksheet — the whole
//   point of this endpoint is work that no machine can assess. The teacher UI
//   must present it as "said they have done this", never as a result.
//
// Auth: the per-attempt token from /api/assignment-open, exactly as
// /api/assignment-submit uses. guest_mark_material() re-checks it server-side
// against guest_submissions.session_token_hash, so nothing here is trusted —
// this function only forwards.
//
// ⚠ Unlike the submit token, the session token SURVIVES submission on purpose:
//   ticking a worksheet after handing in the quiz is the normal case. It cannot
//   submit anything, because guest_submit() reads open_token_hash, which is
//   NULLed at submit time.

const HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store, no-cache',
  'Access-Control-Allow-Origin': '*',
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: HEADERS, body: '' };
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'method_not_allowed' }) };
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  // ⚠ Fails CLOSED. A missing service key must never mean "skip the check" —
  //   that is how a config mistake once turned an endpoint open.
  if (!url || !key) {
    return { statusCode: 503, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'not_configured' }) };
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); }
  catch (_) { return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'bad_json' }) }; }

  const code = String(body.code || '').trim();
  const name = String(body.name || '').trim();
  const token = String(body.token || '');
  const materialId = String(body.material_id || '');
  const done = body.done !== false;

  if (!code || code.length > 32 || !name || name.length > 80 || !token || token.length > 128) {
    return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'bad_request' }) };
  }
  // Shape-check the id here so an obviously wrong value never reaches the
  // database as a cast error the caller could read something into.
  if (!UUID_RE.test(materialId)) {
    return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'bad_material' }) };
  }

  let out;
  try {
    const r = await fetch(url + '/rest/v1/rpc/guest_mark_material', {
      method: 'POST',
      headers: { apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        p_code: code, p_name: name, p_token: token,
        p_material_id: materialId, p_done: done,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    out = await r.json();
  } catch (e) {
    console.error('[material-done]', e.message);
    return { statusCode: 502, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'server_error' }) };
  }

  // ⚠ Pass the RPC's own verdict through unchanged. Reporting success for a
  //   refused write is how a pupil ends up believing a teacher can see work the
  //   teacher has no record of.
  return { statusCode: 200, headers: HEADERS, body: JSON.stringify(out || { ok: false, error: 'server_error' }) };
};
