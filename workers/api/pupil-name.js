const HEADERS = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, no-cache', 'Access-Control-Allow-Origin': '*' };

export default async function handler(request, env) {
  if (request.method === 'OPTIONS') return new Response('', { status: 204, headers: HEADERS });
  if (request.method !== 'POST') return new Response(JSON.stringify({ ok: false, error: 'method_not_allowed' }), { status: 405, headers: HEADERS });

  const url = env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return new Response(JSON.stringify({ ok: false, error: 'not_configured' }), { status: 503, headers: HEADERS });

  let body;
  try { body = await request.json(); } catch { return new Response(JSON.stringify({ ok: false, error: 'bad_json' }), { status: 400, headers: HEADERS }); }

  const code = String(body.code || '').trim();
  const name = String(body.name || '').trim();
  const token = String(body.token || '');
  const newName = String(body.new_name || '').trim();

  if (!code || code.length > 32 || !name || name.length > 80 || !token || token.length > 128) {
    return new Response(JSON.stringify({ ok: false, error: 'bad_request' }), { status: 400, headers: HEADERS });
  }
  if (newName.length < 2 || newName.length > 40) {
    return new Response(JSON.stringify({ ok: false, error: 'bad_name' }), { status: 400, headers: HEADERS });
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
    return new Response(JSON.stringify({ ok: false, error: 'server_error' }), { status: 502, headers: HEADERS });
  }

  return new Response(JSON.stringify(out || { ok: false, error: 'server_error' }), { status: 200, headers: HEADERS });
}
