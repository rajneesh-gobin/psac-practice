'use strict';
// POST /api/classroom-materials
// Returns learning materials assigned to a classroom, with fresh signed URLs.
// Called from guest.html after a student passes the PIN gate.
// Auth: the classroom_id is a UUID — effectively unguessable, and the
// student already received it in the assignment-open response.

const { createClient } = require('@supabase/supabase-js');

const BUCKET = 'learning-materials';
const HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store, no-cache',
  'Access-Control-Allow-Origin': '*',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: HEADERS, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'method_not_allowed' }) };
  }

  const url  = process.env.SUPABASE_URL;
  const key  = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return { statusCode: 503, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'not_configured' }) };
  }

  let classroom_id;
  try {
    ({ classroom_id } = JSON.parse(event.body || '{}'));
  } catch (_) {
    return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'bad_json' }) };
  }

  if (!classroom_id || typeof classroom_id !== 'string' || classroom_id.length > 64) {
    return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'missing_classroom_id' }) };
  }

  const sb = createClient(url, key, { auth: { persistSession: false } });

  // Fetch materials assigned to this classroom via the junction table.
  const { data, error } = await sb
    .from('classroom_materials')
    .select('learning_materials(id, title, subject, description, file_path, file_name, file_size, link_expiry_seconds)')
    .eq('classroom_id', classroom_id);

  if (error) {
    // classroom_materials table not yet applied — return empty list gracefully
    if (error.code === '42P01' || error.message?.includes('does not exist')) {
      return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ ok: true, materials: [] }) };
    }
    console.error('[classroom-materials]', error.message);
    return { statusCode: 500, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'db_error' }) };
  }

  const files = (data || []).map(r => r.learning_materials).filter(Boolean);

  // Generate a signed URL for each file. Run in parallel.
  const materials = await Promise.all(files.map(async (f) => {
    const expiry = Number(f.link_expiry_seconds) || 3600;
    let url = null;
    if (f.file_path) {
      const { data: u } = await sb.storage.from(BUCKET).createSignedUrl(f.file_path, expiry);
      url = u?.signedUrl || null;
    }
    return {
      id:          f.id,
      title:       f.title,
      subject:     f.subject   || null,
      description: f.description || null,
      file_name:   f.file_name || null,
      file_size:   f.file_size || null,
      url,
    };
  }));

  return {
    statusCode: 200,
    headers: HEADERS,
    body: JSON.stringify({ ok: true, materials }),
  };
};
