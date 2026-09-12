const HEADERS = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, no-cache', 'Access-Control-Allow-Origin': '*' };
const DEVICE_RE = /^[0-9a-f]{32}$/;

export default async function handler(request, env) {
  if (request.method === 'OPTIONS') return new Response('', { status: 204, headers: HEADERS });
  if (request.method !== 'POST') return new Response(JSON.stringify({ ok: false, error: 'method_not_allowed' }), { status: 405, headers: HEADERS });

  const url = env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return new Response(JSON.stringify({ ok: false, error: 'not_configured' }), { status: 503, headers: HEADERS });

  let body;
  try { body = await request.json(); } catch { return new Response(JSON.stringify({ ok: false, error: 'bad_json' }), { status: 400, headers: HEADERS }); }

  const code = String(body.code || '').trim();
  const device = String(body.device || '').trim().toLowerCase();
  const name = String(body.name || '').trim();

  if (!code || code.length > 32 || !name || name.length > 40) {
    return new Response(JSON.stringify({ ok: false, error: 'bad_request' }), { status: 400, headers: HEADERS });
  }
  if (!DEVICE_RE.test(device)) {
    return new Response(JSON.stringify({ ok: false, error: 'bad_device' }), { status: 400, headers: HEADERS });
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
    return new Response(JSON.stringify({ ok: false, error: 'server_error' }), { status: 502, headers: HEADERS });
  }

  return new Response(JSON.stringify(out || { ok: false, error: 'server_error' }), { status: 200, headers: HEADERS });
}
