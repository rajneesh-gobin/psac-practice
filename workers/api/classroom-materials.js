// POST /api/classroom-materials — learning materials for a classroom with fresh signed URLs.

const HEADERS = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, no-cache', 'Access-Control-Allow-Origin': '*' };
const BUCKET = 'learning-materials';

async function signUrl(sbUrl, sbKey, filePath, expiresIn) {
  const r = await fetch(`${sbUrl}/storage/v1/object/sign/${BUCKET}/${filePath}`, {
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

  let classroom_id;
  try { ({ classroom_id } = await request.json()); } catch { return new Response(JSON.stringify({ ok: false, error: 'bad_json' }), { status: 400, headers: HEADERS }); }
  if (!classroom_id || typeof classroom_id !== 'string' || classroom_id.length > 64) {
    return new Response(JSON.stringify({ ok: false, error: 'missing_classroom_id' }), { status: 400, headers: HEADERS });
  }

  const sbH = { apikey: sbKey, Authorization: `Bearer ${sbKey}` };
  const COLS_NEW = 'assigned_at,learning_materials(id,title,subject,grade,description,file_path,file_name,file_size,link_expiry_seconds,created_at,source_type,external_url)';
  const COLS_OLD = 'assigned_at,learning_materials(id,title,subject,description,file_path,file_name,file_size,link_expiry_seconds,created_at)';

  let res = await fetch(`${sbUrl}/rest/v1/classroom_materials?classroom_id=eq.${encodeURIComponent(classroom_id)}&select=${COLS_NEW}&order=assigned_at.desc`, { headers: sbH });

  if (!res.ok) {
    const errText = await res.text();
    if (/42703|PGRST204|column .* does not exist/i.test(errText)) {
      console.warn('[classroom-materials] material-links migration not applied; serving files only');
      res = await fetch(`${sbUrl}/rest/v1/classroom_materials?classroom_id=eq.${encodeURIComponent(classroom_id)}&select=${COLS_OLD}&order=assigned_at.desc`, { headers: sbH });
    }
  }

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    if (/42P01|does not exist/i.test(errText)) {
      return new Response(JSON.stringify({ ok: true, materials: [] }), { status: 200, headers: HEADERS });
    }
    console.error('[classroom-materials]', errText);
    return new Response(JSON.stringify({ ok: false, error: 'db_error' }), { status: 500, headers: HEADERS });
  }

  const data = await res.json();
  const files = (data || []).filter(r => r.learning_materials)
    .map(r => ({ ...r.learning_materials, shared_at: r.assigned_at || null }));

  const materials = await Promise.all(files.map(async (f) => {
    const expiry = Number(f.link_expiry_seconds) || 3600;
    const isLink = f.source_type === 'link';
    let url = null;
    if (isLink) {
      url = /^https?:\/\//i.test(String(f.external_url || '')) ? f.external_url : null;
    } else if (f.file_path) {
      url = await signUrl(sbUrl, sbKey, f.file_path, expiry);
    }
    return {
      id: f.id, title: f.title, subject: f.subject || null, grade: f.grade || null,
      description: f.description || null, source_type: isLink ? 'link' : 'file',
      external_url: isLink ? url : null, link_expiry_seconds: isLink ? null : expiry,
      file_name: f.file_name || null, file_size: f.file_size || null,
      shared_at: f.shared_at || f.created_at || null, created_at: f.created_at || null, url,
    };
  }));

  return new Response(JSON.stringify({ ok: true, materials }), { status: 200, headers: HEADERS });
}
