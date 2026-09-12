// POST /api/materials-library — classroom hub behind a code and PIN, with signed URLs.

const HEADERS = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, no-cache', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' };
const BUCKET = 'learning-materials';
const CODE_RE = /^[A-Z0-9]{10}$/;

const MESSAGES = {
  not_found: 'This link is not working any more. Ask your teacher for the new one.',
  bad_pin: 'Wrong PIN. Ask your teacher for the correct one.',
  locked: 'Too many wrong PINs. Please wait a few minutes and try again.',
  name_required: 'Please enter your name.',
  not_ready: 'This class hub is not switched on yet. Ask your teacher.',
};

async function signUrl(sbUrl, sbKey, bucket, filePath, expiresIn) {
  const r = await fetch(`${sbUrl}/storage/v1/object/sign/${bucket}/${filePath}`, {
    method: 'POST',
    headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ expiresIn }),
  });
  if (!r.ok) return null;
  const data = await r.json();
  return data?.signedURL || null;
}

export default async function handler(request, env) {
  if (request.method === 'OPTIONS') return new Response('', { status: 204, headers: HEADERS });
  if (request.method !== 'POST') return new Response(JSON.stringify({ ok: false, error: 'method_not_allowed' }), { status: 405, headers: HEADERS });

  const sbUrl = env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
  const sbKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!sbUrl || !sbKey) return new Response(JSON.stringify({ ok: false, error: 'not_configured' }), { status: 503, headers: HEADERS });

  let body;
  try { body = await request.json(); } catch { return new Response(JSON.stringify({ ok: false, error: 'bad_json' }), { status: 400, headers: HEADERS }); }

  const code = String(body.code || '').trim().toUpperCase().slice(0, 10);
  const name = String(body.name || '').trim().slice(0, 40);
  const pin  = String(body.pin  || '').trim().slice(0, 4);
  const info = body.info === true;

  if (!CODE_RE.test(code)) {
    return new Response(JSON.stringify({ ok: false, error: 'not_found', message: MESSAGES.not_found }), { status: 200, headers: HEADERS });
  }

  const ip = (request.headers.get('cf-connecting-ip') || (request.headers.get('x-forwarded-for') || '').split(',')[0] || '').trim() || null;
  const sbH = { apikey: sbKey, Authorization: `Bearer ${sbKey}`, 'Content-Type': 'application/json' };

  let out;
  try {
    const rpcRes = await fetch(`${sbUrl}/rest/v1/rpc/materials_library_open`, {
      method: 'POST', headers: sbH,
      body: JSON.stringify({ p_code: code, p_name: name, p_pin: pin, p_ip: ip, p_info: info }),
    });
    if (!rpcRes.ok) {
      const errText = await rpcRes.text();
      if (/PGRST202|42883|Could not find the function|schema cache/i.test(errText)) {
        console.warn('[materials-library] migration not applied');
        return new Response(JSON.stringify({ ok: false, error: 'not_ready', message: MESSAGES.not_ready }), { status: 200, headers: HEADERS });
      }
      throw new Error('rpc_failed ' + rpcRes.status);
    }
    out = await rpcRes.json();
  } catch (e) {
    if (/PGRST202|42883|Could not find the function|schema cache/i.test(String(e.message || ''))) {
      return new Response(JSON.stringify({ ok: false, error: 'not_ready', message: MESSAGES.not_ready }), { status: 200, headers: HEADERS });
    }
    console.error('[materials-library]', e.message);
    return new Response(JSON.stringify({ ok: false, error: 'server_error' }), { status: 502, headers: HEADERS });
  }

  if (!out || out.ok !== true) {
    const c = (out && out.error) || 'server_error';
    return new Response(JSON.stringify({ ...out, message: MESSAGES[c] || 'Could not open this class hub.' }), { status: 200, headers: HEADERS });
  }

  if (info) return new Response(JSON.stringify(out), { status: 200, headers: HEADERS });

  const rows = Array.isArray(out.materials) ? out.materials : [];
  const materials = await Promise.all(rows.map(async (m) => {
    const isLink = m.source_type === 'link';
    let href = null;
    if (isLink) {
      href = /^https?:\/\//i.test(String(m.external_url || '')) ? m.external_url : null;
    } else if (m.file_path) {
      const expiry = Number(m.link_expiry_seconds) || 3600;
      href = await signUrl(sbUrl, sbKey, BUCKET, m.file_path, expiry);
    }
    return {
      id: m.id, title: m.title, subject: m.subject || null, grade: m.grade || null,
      description: m.description || null, source_type: isLink ? 'link' : 'file',
      file_name: isLink ? null : (m.file_name || null), file_size: isLink ? null : (m.file_size || null),
      shared_at: m.shared_at || m.created_at || null, created_at: m.created_at || null, url: href,
    };
  }));

  return new Response(JSON.stringify({
    ok: true, name: out.name || '', classroom: out.classroom || null, materials,
    assignments: Array.isArray(out.assignments) ? out.assignments : [],
  }), { status: 200, headers: HEADERS });
}
