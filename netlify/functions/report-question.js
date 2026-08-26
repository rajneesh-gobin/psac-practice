'use strict';
// Fallback endpoint for question reports when the browser Supabase client
// cannot insert directly (e.g. anon INSERT policy not yet applied).
// Store.reportQuestion() calls Supabase directly; this function is an
// alternative path used by submitReport() if needed.

exports.handler = async (event) => {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: '{"error":"Method not allowed"}' };

  const SB_URL = process.env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
  const SB_SRK = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SB_SRK) return { statusCode: 500, headers, body: '{"error":"Not configured"}' };

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch(_) {
    return { statusCode: 400, headers, body: '{"error":"Bad JSON"}' };
  }

  const { questionId, studentId, problem, message, questionText } = body;
  const reportText = (problem || message || '').trim();

  if (!questionId || !reportText || reportText.length < 3) {
    return { statusCode: 400, headers, body: '{"error":"questionId and problem description required"}' };
  }

  // Validate student UUID format if provided
  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const safeStudentId = (studentId && UUID_RE.test(studentId)) ? studentId : null;

  const row = {
    question_id:   String(questionId).slice(0, 100),
    question_text: (questionText || '').slice(0, 400),
    message:       reportText.slice(0, 1000),
    student_id:    safeStudentId,
    status:        'open',
  };

  const r = await fetch(`${SB_URL}/rest/v1/question_reports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SB_SRK,
      Authorization: `Bearer ${SB_SRK}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  });

  if (!r.ok) {
    const err = await r.text().catch(() => String(r.status));
    console.error('[report-question]', err);
    return { statusCode: 500, headers, body: '{"error":"Failed to save report"}' };
  }

  return { statusCode: 200, headers, body: '{"ok":true}' };
};
