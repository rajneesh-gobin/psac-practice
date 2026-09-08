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
  // ⚠ TWO column lists, and the narrower one is used ONLY on a genuine
  //   missing-column error (42703 / PGRST204). source_type and external_url
  //   arrive with migrations/20260908_material_links.sql; until that is applied
  //   this endpoint must keep serving the files it already has rather than
  //   answering 500 and emptying every pupil's Materials list.
  // ⚠ Falling back on ANY error is what this must not do — that is how the
  //   `deleted_at IS NULL` filter was once dropped and deleted children came
  //   back. Only a missing column may widen to the old list.
  const COLS_NEW = 'assigned_at, learning_materials(id, title, subject, grade, description, file_path, file_name, file_size, link_expiry_seconds, created_at, source_type, external_url)';
  const COLS_OLD = 'assigned_at, learning_materials(id, title, subject, description, file_path, file_name, file_size, link_expiry_seconds, created_at)';
  const _query = cols => sb
    .from('classroom_materials')
    .select(cols)
    .eq('classroom_id', classroom_id)
    // ⚠ Without an ORDER BY this list came back in whatever order Postgres
    // happened to produce, which can differ between two identical requests.
    // Newest share first is both stable and the order the page defaults to.
    .order('assigned_at', { ascending: false });

  let { data, error } = await _query(COLS_NEW);
  if (error && (error.code === '42703' || error.code === 'PGRST204'
                || /column .* does not exist/i.test(error.message || ''))) {
    console.warn('[classroom-materials] material-links migration not applied; serving files only');
    ({ data, error } = await _query(COLS_OLD));
  }

  if (error) {
    // classroom_materials table not yet applied — return empty list gracefully
    if (error.code === '42P01' || error.message?.includes('does not exist')) {
      return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ ok: true, materials: [] }) };
    }
    console.error('[classroom-materials]', error.message);
    return { statusCode: 500, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'db_error' }) };
  }

  // shared_at is when the teacher gave this file to THIS class; created_at is
  // when they uploaded it, which can be months earlier and for another class.
  const files = (data || []).filter(r => r.learning_materials)
    .map(r => ({ ...r.learning_materials, shared_at: r.assigned_at || null }));

  // Generate a signed URL for each file. Run in parallel.
  const materials = await Promise.all(files.map(async (f) => {
    const expiry = Number(f.link_expiry_seconds) || 3600;
    // ⚠ A LINK material is not in Storage and must never be signed. Its URL
    //   is the row itself, it does not expire, and the pupil page shows it
    //   without an expiry note for that reason.
    // ⚠ http/https only, re-checked here. The database CHECK enforces it and
    //   the teacher form normalises it, but this value ends up in an href on
    //   the pupil page, so the last hop validates it too.
    const isLink = f.source_type === 'link';
    let url = null;
    if (isLink) {
      url = /^https?:///i.test(String(f.external_url || '')) ? f.external_url : null;
    } else if (f.file_path) {
      const { data: u } = await sb.storage.from(BUCKET).createSignedUrl(f.file_path, expiry);
      url = u?.signedUrl || null;
    }
    return {
      id:          f.id,
      title:       f.title,
      subject:     f.subject   || null,
      grade:       f.grade     || null,
      description: f.description || null,
      source_type: isLink ? 'link' : 'file',
      external_url: isLink ? url : null,
      link_expiry_seconds: isLink ? null : expiry,
      file_name:   f.file_name || null,
      file_size:   f.file_size || null,
      shared_at:   f.shared_at || f.created_at || null,
      created_at:  f.created_at || null,
      url,
    };
  }));

  return {
    statusCode: 200,
    headers: HEADERS,
    body: JSON.stringify({ ok: true, materials }),
  };
};
