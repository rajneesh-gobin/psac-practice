'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  POST /api/materials-library   { code, name, pin }  ·  { code, info: true }
//
//  The classroom's permanent hub, behind one code that never changes and the
//  pupil's ordinary PIN. Backs /m/<CODE> (materials.html).
//
//  ⚠ THE PIN IS THE GATE, NOT THE CODE. The code says WHICH class; the PIN
//    says you belong to it — a pupil's own 4-digit PIN in a per-pupil
//    classroom, the shared class PIN plus a name in a shared one, exactly as
//    they already sign in to homework. `info: true` returns only which of the
//    two forms to draw, and the class name.
//
//  ⚠ THE SIGNED URLS ARE MINTED HERE, on every request, and that is the whole
//    point. learning_materials.link_expiry_seconds defaults to an hour, which
//    is why sharing a single file produced a link that was dead by the
//    evening. The CODE is permanent; the URLs behind it are not.
//
//  ⚠ no-store, always. The CDN keys on URL alone, so a cached body would hand
//    the next visitor another pupil's view — and signed URLs that are already
//    part-expired.
// ══════════════════════════════════════════════════════════════════════════

const { createClient } = require('@supabase/supabase-js');

const BUCKET = 'learning-materials';

const HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store, no-cache',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const CODE_RE = /^[A-Z0-9]{10}$/;

const MESSAGES = {
  not_found:     'This link is not working any more. Ask your teacher for the new one.',
  bad_pin:       'Wrong PIN. Ask your teacher for the correct one.',
  locked:        'Too many wrong PINs. Please wait a few minutes and try again.',
  name_required: 'Please enter your name.',
  not_ready:     'This class hub is not switched on yet. Ask your teacher.',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: HEADERS, body: '' };
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'method_not_allowed' }) };
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  // ⚠ Fails closed. Treating a missing key as "skip" is what once turned one
  //   config mistake into an open endpoint.
  if (!url || !key) {
    return { statusCode: 503, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'not_configured' }) };
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); }
  catch (_) { return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'bad_json' }) }; }

  const code = String(body.code || '').trim().toUpperCase().slice(0, 10);
  const name = String(body.name || '').trim().slice(0, 40);
  const pin  = String(body.pin  || '').trim().slice(0, 4);
  const info = body.info === true;

  if (!CODE_RE.test(code)) {
    // Same answer as a code that simply does not exist. A shape check that
    // replies differently is a free oracle for anyone guessing.
    return { statusCode: 200, headers: HEADERS,
      body: JSON.stringify({ ok: false, error: 'not_found', message: MESSAGES.not_found }) };
  }

  // ⚠ The caller's real address, which only this function knows. It is the
  //   throttle key and nothing else — never an identity, and never a reason to
  //   refuse anyone (a whole Mauritian school sits behind one NAT).
  const ip = (event.headers['x-nf-client-connection-ip']
           || (event.headers['x-forwarded-for'] || '').split(',')[0] || '').trim() || null;

  const sb = createClient(url, key, { auth: { persistSession: false } });

  let out;
  try {
    const { data, error } = await sb.rpc('materials_library_open',
      { p_code: code, p_name: name, p_pin: pin, p_ip: ip, p_info: info });
    if (error) throw new Error(error.message || 'rpc_failed');
    out = data;
  } catch (e) {
    // ⚠ A database that has not had migrations/20260910_classroom_materials_
    //   library.sql applied has no such function. That is "this feature is not
    //   live here", not a fault to shout about — but it must not read as
    //   "your teacher deleted everything" either, so it gets its own code.
    if (/PGRST202|42883|Could not find the function|schema cache/i.test(String(e.message || ''))) {
      console.warn('[materials-library] migration not applied');
      return { statusCode: 200, headers: HEADERS,
        body: JSON.stringify({ ok: false, error: 'not_ready', message: MESSAGES.not_ready }) };
    }
    console.error('[materials-library]', e.message);
    return { statusCode: 502, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'server_error' }) };
  }

  if (!out || out.ok !== true) {
    const c = (out && out.error) || 'server_error';
    // 200 with ok:false — these are expected outcomes the page renders, not faults.
    return { statusCode: 200, headers: HEADERS,
      body: JSON.stringify({ ...out, message: MESSAGES[c] || 'Could not open this class hub.' }) };
  }

  // The gate description carries nothing from behind the gate.
  if (info) return { statusCode: 200, headers: HEADERS, body: JSON.stringify(out) };

  const rows = Array.isArray(out.materials) ? out.materials : [];

  const materials = await Promise.all(rows.map(async (m) => {
    // ⚠ A LINK material is not in Storage and must never be signed. Its URL is
    //   the row itself and it does not expire.
    // ⚠ http/https only, re-checked here. The database CHECK enforces it and
    //   the teacher form normalises it, but this value ends up in an href on
    //   the hub page, so the last hop validates it too.
    const isLink = m.source_type === 'link';
    let href = null;
    if (isLink) {
      href = /^https?:\/\//i.test(String(m.external_url || '')) ? m.external_url : null;
    } else if (m.file_path) {
      const expiry = Number(m.link_expiry_seconds) || 3600;
      const { data: u } = await sb.storage.from(BUCKET).createSignedUrl(m.file_path, expiry);
      href = u?.signedUrl || null;
    }
    // ⚠ file_path never leaves this function. It is a storage key, and the
    //   signed URL is the only form of it a browser has any use for.
    return {
      id:          m.id,
      title:       m.title,
      subject:     m.subject || null,
      grade:       m.grade   || null,
      description: m.description || null,
      source_type: isLink ? 'link' : 'file',
      file_name:   isLink ? null : (m.file_name || null),
      file_size:   isLink ? null : (m.file_size || null),
      shared_at:   m.shared_at || m.created_at || null,
      created_at:  m.created_at || null,
      url:         href,
    };
  }));

  return {
    statusCode: 200,
    headers: HEADERS,
    body: JSON.stringify({
      ok: true,
      name: out.name || '',
      classroom: out.classroom || null,
      materials,
      // Already safe: the RPC returns codes, titles and this pupil's own
      // done-flag, never question ids, answers or anyone else's marks.
      assignments: Array.isArray(out.assignments) ? out.assignments : [],
    }),
  };
};
