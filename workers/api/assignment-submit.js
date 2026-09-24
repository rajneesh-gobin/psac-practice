// POST /api/assignment-submit — a guest pupil hands in finished homework.
//   { code, name, token, answers: [{id, answer}] }
//
// ⚠ THIS ROUTE DID NOT EXIST ON CLOUDFLARE. Every other Netlify function was
//   ported; this one was missed, so `/api/assignment-submit` fell through to the
//   Worker's `/api/*` 404 while `/api/assignment-open` beside it answered 405.
//   Measured on production, not inferred: a pupil could open homework from an
//   /a/<CODE> link and answer it, and the hand-in then failed forever behind
//   guest.js's "Could not reach your teacher — tap Try sending again".
//
// ⚠ THE CLIENT'S SCORE IS IGNORED. The question snapshot is reloaded from the
//   ids stored on the assignment and re-graded here. Whatever the browser
//   believed it scored never reaches the database — the same rule the exam path
//   follows in submit-exam.js.
// ⚠ The disk-based loadQuestionSet() of the Netlify original cannot run in a
//   Worker (no fs, no vm), so the snapshot comes from the questions table —
//   exactly as assignment-open.js loads the same ids to serve the paper.
import { checkAnswer } from '../lib/grading.js';

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'no-store',
};
const SB_URL_DEFAULT = 'https://xawvjwsiqhtxgpocdqgm.supabase.co';

const MESSAGES = {
  not_found:         'That assignment no longer exists.',
  no_session:        'Please open the assignment again before submitting.',
  already_submitted: 'You have already submitted this assignment.',
  bad_token:         'This session has expired. Please open the assignment again.',
};

function json(status, body) {
  return new Response(JSON.stringify(body), { status, headers: HEADERS });
}

async function sb(pathname, sbUrl, sbKey, opts = {}) {
  const res = await fetch(`${sbUrl}${pathname}`, {
    ...opts,
    headers: {
      apikey: sbKey, Authorization: `Bearer ${sbKey}`,
      'Content-Type': 'application/json', ...(opts.headers || {}),
    },
  });
  if (!res.ok) throw new Error(`${pathname} ${res.status}: ${await res.text()}`);
  return res.status === 204 ? null : res.json();
}

async function loadQuestionSet(questionIds, sbUrl, sbKey) {
  if (!questionIds?.length) return [];
  const ids = questionIds.map(id => encodeURIComponent(id)).join(',');
  const rows = await sb(`/rest/v1/questions?id=in.(${ids})&select=data`, sbUrl, sbKey);
  return (rows || []).map(row => row.data).filter(Boolean);
}

// ⚠ TOTAL COMES FROM THE SNAPSHOT, ORDER COMES FROM THE PUPIL. Scoring over the
//   stored questions means skipping the last five cannot lift the percentage;
//   listing them in the order they were answered means guest.js's review panel
//   numbers them the way the paper did (it prints "Q<index>" from this array,
//   and the paper's order is whatever assignment-open happened to return).
//   Anything the pupil sent that is not in the snapshot is ignored outright.
function grade(questions, answers) {
  const byId  = new Map(questions.map(q => [q.id, q]));
  const given = new Map((answers || []).map(a => [a && a.id, a && a.answer]));

  const ordered = [];
  const seen = new Set();
  for (const a of answers || []) {
    const q = a && byId.get(a.id);
    if (q && !seen.has(q.id)) { ordered.push(q); seen.add(q.id); }
  }
  for (const q of questions) if (!seen.has(q.id)) ordered.push(q);

  let score = 0;
  const detail = ordered.map(q => {
    const ua = given.has(q.id) ? given.get(q.id) : null;
    const ok = checkAnswer(q, ua);
    if (ok) score++;
    return {
      id: q.id, chapterId: q.chapterId,
      userAnswer: ua == null ? '' : String(ua),
      correctAnswer: String(q.answer),
      correct: ok,
    };
  });

  const total = questions.length;
  return { score, total, pct: total ? Math.round(score / total * 100) : 0, detail };
}

export default async function handler(request, env) {
  if (request.method === 'OPTIONS') return new Response('', { status: 200, headers: HEADERS });
  if (request.method !== 'POST') return new Response('{}', { status: 405, headers: HEADERS });

  const sbUrl = env.SUPABASE_URL || SB_URL_DEFAULT;
  const sbKey = env.SUPABASE_SERVICE_ROLE_KEY;
  // ⚠ Fail closed. A missing key is a broken deploy, never "skip the checks".
  if (!sbKey) {
    console.error('[assignment-submit] SUPABASE_SERVICE_ROLE_KEY not set');
    return json(503, { ok: false, error: 'not_configured' });
  }

  let body;
  try { body = await request.json(); }
  catch { return json(400, { ok: false, error: 'bad_request' }); }

  const code    = String(body.code  || '').trim().toUpperCase().slice(0, 12);
  const name    = String(body.name  || '').trim().slice(0, 40);
  const token   = String(body.token || '').trim().slice(0, 128);
  const answers = Array.isArray(body.answers) ? body.answers.slice(0, 200) : [];

  if (!code || !name || !token) return json(400, { ok: false, error: 'bad_request' });

  // 1. The snapshot. Re-grading MUST use the stored question_ids and never
  //    anything the client sends, or a pupil could submit against an easier set.
  let rows;
  try {
    rows = await sb(`/rest/v1/guest_assignments?code=eq.${encodeURIComponent(code)}`
                  + '&select=id,subject_pack_id,question_ids&limit=1', sbUrl, sbKey);
  } catch (e) {
    console.error('[assignment-submit] lookup', e.message);
    return json(502, { ok: false, error: 'server_error' });
  }

  const a = rows && rows[0];
  if (!a) return json(200, { ok: false, error: 'not_found', message: MESSAGES.not_found });

  let questions;
  try {
    questions = await loadQuestionSet(a.question_ids || [], sbUrl, sbKey);
  } catch (e) {
    console.error('[assignment-submit] questions', e.message);
    return json(502, { ok: false, error: 'server_error' });
  }
  // ⚠ Never save a zero against an empty snapshot — that would record a real
  //   pupil as having failed homework the server could not reconstruct.
  if (!questions.length) {
    console.error('[assignment-submit] empty snapshot', code, a.subject_pack_id);
    return json(200, { ok: false, error: 'no_questions' });
  }

  // 2. Authoritative re-grade.
  const result = grade(questions, answers);

  // 3. Persist. guest_submit re-checks the token, the session and the
  //    submitted/retry state, so a double POST cannot overwrite a finished
  //    attempt and a stolen code without the open token gets nowhere.
  let saved;
  try {
    saved = await sb('/rest/v1/rpc/guest_submit', sbUrl, sbKey, {
      method: 'POST',
      body: JSON.stringify({
        p_code: code, p_name: name, p_token: token,
        p_answers: result.detail, p_score: result.score, p_total: result.total,
      }),
    });
  } catch (e) {
    console.error('[assignment-submit] save', e.message);
    return json(502, { ok: false, error: 'server_error' });
  }

  if (!saved || !saved.ok) {
    const c = (saved && saved.error) || 'server_error';
    return json(200, { ...saved, message: MESSAGES[c] || 'Could not save your answers.' });
  }

  return json(200, {
    ok: true,
    score: result.score, total: result.total, pct: result.pct,
    title: saved.title, teacher: saved.teacher,
    // Per-question truth, so the results screen shows the SERVER's verdict
    // rather than what the browser thought while the pupil was answering.
    detail: result.detail,
  });
}
