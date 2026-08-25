'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  POST /api/assignment-submit   { code, name, answers: [{id, answer}] }
//
//  The client's score is IGNORED. This function reloads the assignment's
//  question snapshot from the same vm sandbox that served them, re-grades the
//  submitted answers, and stores that result. Whatever the browser believes it
//  scored never reaches the database.
// ══════════════════════════════════════════════════════════════════════════

const { loadQuestionSet, grade } = require('../lib/questions-sandbox');

const SB_URL = process.env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'no-store',
};

const MESSAGES = {
  not_found:         'That assignment no longer exists.',
  no_session:        'Please open the assignment again before submitting.',
  already_submitted: 'You have already submitted this assignment.',
  bad_token:         'This session has expired. Please open the assignment again.',
};

async function sb(pathname, opts = {}) {
  const res = await fetch(`${SB_URL}${pathname}`, {
    ...opts,
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`,
               'Content-Type': 'application/json', ...(opts.headers || {}) },
  });
  if (!res.ok) throw new Error(`${pathname} ${res.status}: ${await res.text()}`);
  return res.status === 204 ? null : res.json();
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: HEADERS, body: '' };
  if (event.httpMethod !== 'POST')    return { statusCode: 405, headers: HEADERS, body: '{}' };
  if (!SB_KEY) {
    console.error('[assignment-submit] SUPABASE_SERVICE_ROLE_KEY not set');
    return { statusCode: 503, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'not_configured' }) };
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); }
  catch { return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'bad_request' }) }; }

  const code    = String(body.code || '').trim().toUpperCase().slice(0, 12);
  const name    = String(body.name || '').trim().slice(0, 40);
  const token   = String(body.token || '').trim().slice(0, 128);
  const answers = Array.isArray(body.answers) ? body.answers.slice(0, 200) : [];

  if (!code || !name || !token) {
    return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'bad_request' }) };
  }

  // 1. Read the snapshot. Regrading MUST use the stored question_ids, not
  //    anything the client sends, or a child could submit against an easier set.
  let rows;
  try {
    rows = await sb(`/rest/v1/guest_assignments?code=eq.${encodeURIComponent(code)}`
                  + `&select=id,subject_pack_id,question_ids,status,expires_at&limit=1`);
  } catch (e) {
    console.error('[assignment-submit] lookup', e.message);
    return { statusCode: 502, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'server_error' }) };
  }

  const a = rows && rows[0];
  if (!a) {
    return { statusCode: 200, headers: HEADERS,
      body: JSON.stringify({ ok: false, error: 'not_found', message: MESSAGES.not_found }) };
  }

  const questions = loadQuestionSet(a.subject_pack_id, a.question_ids || []);
  if (!questions.length) {
    console.error('[assignment-submit] empty snapshot', code, a.subject_pack_id);
    return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'no_questions' }) };
  }

  // 2. Authoritative re-grade.
  const result = grade(questions, answers);

  // 3. Persist. guest_submit re-checks submitted/retry state, so a double POST
  //    cannot overwrite a finished attempt.
  let saved;
  try {
    saved = await sb('/rest/v1/rpc/guest_submit', {
      method: 'POST',
      body: JSON.stringify({
        p_code: code, p_name: name, p_token: token,
        p_answers: result.detail, p_score: result.score, p_total: result.total,
      }),
    });
  } catch (e) {
    console.error('[assignment-submit] save', e.message);
    return { statusCode: 502, headers: HEADERS, body: JSON.stringify({ ok: false, error: 'server_error' }) };
  }

  if (!saved || !saved.ok) {
    const c = (saved && saved.error) || 'server_error';
    return { statusCode: 200, headers: HEADERS,
      body: JSON.stringify({ ...saved, message: MESSAGES[c] || 'Could not save your answers.' }) };
  }

  return {
    statusCode: 200, headers: HEADERS,
    body: JSON.stringify({
      ok: true,
      score: result.score, total: result.total, pct: result.pct,
      title: saved.title, teacher: saved.teacher,
      // Per-question truth, so the results screen shows the SERVER's verdict
      // rather than what the browser thought while the child was answering.
      detail: result.detail,
    }),
  };
};
