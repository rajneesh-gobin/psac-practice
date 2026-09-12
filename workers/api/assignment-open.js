// POST /api/assignment-open — guest entry point for homework assignments.
// Replaces loadQuestionSet (disk-based) with a Supabase DB lookup.

const HEADERS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Cache-Control': 'no-store' };
const SB_URL_DEFAULT = 'https://xawvjwsiqhtxgpocdqgm.supabase.co';

const MESSAGES = {
  not_found: 'That code does not exist. Check it with your teacher.',
  expired: 'This assignment has closed.',
  bad_pin: 'Wrong PIN. Ask your teacher for the correct one.',
  locked: 'Too many wrong PINs. Please wait a few minutes and try again.',
  full: 'This assignment is full. Please tell your teacher.',
  name_taken: 'Someone with that name has already done this assignment.',
  name_required: 'Please enter your first name.',
  device_used: 'This device has already finished this homework. Ask your teacher if you need another go.',
};

function _signatureMissing(err) {
  return /PGRST202|42883|Could not find the function|schema cache/i.test(String((err && err.message) || ''));
}

async function rpc(fn, body, sbUrl, sbKey) {
  const res = await fetch(`${sbUrl}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${fn} ${res.status}: ${await res.text()}`);
  return res.json();
}

async function loadQuestionSet(questionIds, sbUrl, sbKey) {
  if (!questionIds?.length) return [];
  const ids = questionIds.map(id => encodeURIComponent(id)).join(',');
  const r = await fetch(`${sbUrl}/rest/v1/questions?id=in.(${ids})&select=data`, {
    headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}` },
  });
  if (!r.ok) return [];
  const rows = await r.json();
  return rows.map(row => row.data).filter(Boolean);
}

export default async function handler(request, env) {
  if (request.method === 'OPTIONS') return new Response('', { status: 200, headers: HEADERS });
  if (request.method !== 'POST') return new Response('{}', { status: 405, headers: HEADERS });

  const sbUrl = env.SUPABASE_URL || SB_URL_DEFAULT;
  const sbKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!sbKey) {
    console.error('[assignment-open] SUPABASE_SERVICE_ROLE_KEY not set');
    return new Response(JSON.stringify({ ok: false, error: 'not_configured' }), { status: 503, headers: HEADERS });
  }

  let body;
  try { body = await request.json(); } catch { return new Response(JSON.stringify({ ok: false, error: 'bad_request' }), { status: 400, headers: HEADERS }); }

  const code   = String(body.code   || '').trim().toUpperCase().slice(0, 12);
  const name   = String(body.name   || '').trim().slice(0, 40);
  const pin    = String(body.pin    || '').trim();
  const devRaw = String(body.device || '').trim().toLowerCase();
  const device = /^[0-9a-f]{32}$/.test(devRaw) ? devRaw : '';

  if (!code) {
    return new Response(JSON.stringify({ ok: false, error: 'bad_request', message: MESSAGES.name_required }), { status: 400, headers: HEADERS });
  }

  const ip = (request.headers.get('cf-connecting-ip') || (request.headers.get('x-forwarded-for') || '').split(',')[0] || '').trim() || null;
  const ua = (request.headers.get('user-agent') || '').slice(0, 300);

  let result;
  try {
    const args = { p_code: code, p_name: name, p_pin: pin, p_ip: ip, p_info: body.info === true };
    try {
      result = await rpc('teacher_guest_entry', { ...args, p_device: device }, sbUrl, sbKey);
    } catch (e) {
      if (!_signatureMissing(e)) throw e;
      console.warn('[assignment-open] device-cap migration not applied; opening without it');
      result = await rpc('teacher_guest_entry', args, sbUrl, sbKey);
    }
    if (body.info === true) {
      return new Response(JSON.stringify(result), { status: 200, headers: HEADERS });
    }
    if (result?.legacy) result = await rpc('guest_open', { p_code: code, p_name: name, p_pin: pin, p_ip: ip, p_ua: ua }, sbUrl, sbKey);
  } catch (e) {
    console.error('[assignment-open]', e.message);
    return new Response(JSON.stringify({ ok: false, error: 'server_error' }), { status: 502, headers: HEADERS });
  }

  if (!result || !result.ok) {
    const code2 = (result && result.error) || 'server_error';
    return new Response(JSON.stringify({ ...result, message: MESSAGES[code2] || 'Could not open this assignment.' }), { status: 200, headers: HEADERS });
  }

  const a  = result.assignment;
  const qs = await loadQuestionSet(a.question_ids || [], sbUrl, sbKey);

  if (!qs.length) {
    console.error('[assignment-open] empty question set', a.code, a.subject_pack_id);
    return new Response(JSON.stringify({ ok: false, error: 'no_questions', message: 'This assignment has no questions. Please tell your teacher.' }), { status: 200, headers: HEADERS });
  }

  return new Response(JSON.stringify({
    ok: true,
    name: result.name,
    submitName: result.submit_name || result.name,
    token: result.token,
    isRetry: !!result.is_retry,
    assignment: {
      code: a.code, title: a.title, teacher: a.teacher, classroom: a.classroom,
      questionCount: qs.length, durationMins: a.duration_mins,
      dueAt: a.due_at, expiresAt: a.expires_at,
    },
    questions: qs.map(q => ({
      id: q.id, type: q.type, question: q.question, options: q.options || null,
      answer: q.answer, acceptableAnswers: q.acceptableAnswers || null,
      hint: q.hint || '', explanation: q.explanation || '',
      rows: q.rows, cols: q.cols, axis: q.axis, axisPos: q.axisPos, given: q.given,
    })),
  }), { status: 200, headers: HEADERS });
}
