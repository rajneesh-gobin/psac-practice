'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  POST /api/assignment-open   { code, name, pin }
//
//  Guest entry point. No account, no Supabase session - the child has only a
//  share code from WhatsApp, their first name, and a 4-digit PIN.
//
//  All validation (PIN, lockout, expiry, capacity, duplicate name) happens in
//  ONE call to the guest_open() SQL function, so parallel requests cannot race
//  past the rate limiter. This function's only jobs are to relay that call and
//  to attach the question set.
// ══════════════════════════════════════════════════════════════════════════

const { loadQuestionSet } = require('../lib/questions-sandbox');

const SB_URL = process.env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'no-store',
};

const MESSAGES = {
  not_found:    'That code does not exist. Check it with your teacher.',
  expired:      'This assignment has closed.',
  bad_pin:      'Wrong PIN. Ask your teacher for the correct one.',
  locked:       'Too many wrong PINs. Please wait a few minutes and try again.',
  full:         'This assignment is full. Please tell your teacher.',
  name_taken:   'Someone with that name has already done this assignment.',
  name_required:'Please enter your first name.',
};

async function rpc(fn, body) {
  const res = await fetch(`${SB_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${fn} ${res.status}: ${await res.text()}`);
  return res.json();
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: HEADERS, body: '' };
  if (event.httpMethod !== 'POST')    return { statusCode: 405, headers: HEADERS, body: '{}' };
  if (!SB_KEY) {
    console.error('[assignment-open] SUPABASE_SERVICE_ROLE_KEY not set');
    return { statusCode: 503, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'not_configured' }) };
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); }
  catch { return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'bad_request' }) }; }

  const code = String(body.code || '').trim().toUpperCase().slice(0, 12);
  const name = String(body.name || '').trim().slice(0, 40);
  const pin  = String(body.pin  || '').trim();

  if (!code || !name) {
    return { statusCode: 400, headers: HEADERS,
      body: JSON.stringify({ ok: false, error: 'bad_request', message: MESSAGES.name_required }) };
  }

  const ip = (event.headers['x-nf-client-connection-ip']
           || (event.headers['x-forwarded-for'] || '').split(',')[0] || '').trim() || null;
  const ua = (event.headers['user-agent'] || '').slice(0, 300);

  let result;
  try {
    result = await rpc('guest_open', { p_code: code, p_name: name, p_pin: pin, p_ip: ip, p_ua: ua });
  } catch (e) {
    console.error('[assignment-open]', e.message);
    return { statusCode: 502, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'server_error' }) };
  }

  if (!result || !result.ok) {
    const code2 = (result && result.error) || 'server_error';
    // 200 with ok:false - these are expected outcomes the UI renders, not faults.
    return { statusCode: 200, headers: HEADERS,
      body: JSON.stringify({ ...result, message: MESSAGES[code2] || 'Could not open this assignment.' }) };
  }

  const a  = result.assignment;
  const qs = loadQuestionSet(a.subject_pack_id, a.question_ids || []);

  if (!qs.length) {
    console.error('[assignment-open] empty question set', a.code, a.subject_pack_id);
    return { statusCode: 200, headers: HEADERS,
      body: JSON.stringify({ ok: false, error: 'no_questions',
        message: 'This assignment has no questions. Please tell your teacher.' }) };
  }

  // NOTE: `answer` and `explanation` ARE sent to the browser. The brief asks for
  // instant feedback with explanations, which is impossible without them, and
  // per-question server checks would burn a function invocation each (free
  // tier). The integrity guarantee is different: the SCORE cannot be forged,
  // because assignment-submit re-grades from these same files server-side and
  // ignores whatever the client claims. A child who opens DevTools can read
  // ahead - the same as any client-side quiz - but cannot fake their result.
  return {
    statusCode: 200, headers: HEADERS,
    body: JSON.stringify({
      ok: true,
      name: result.name,
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
    }),
  };
};
