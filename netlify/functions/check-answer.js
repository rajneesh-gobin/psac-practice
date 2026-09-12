'use strict';
// POST /.netlify/functions/check-answer
//
// Grades ONE question server-side so the answer never needs to be in the
// browser bundle. The browser sends { subjectId, questionId, userAnswer }
// and gets back { correct, correctAnswer?, explanation?, slip? }.
//
// correctAnswer and explanation are returned ONLY when the answer is WRONG —
// a correct submission gets only { correct: true }. A correct child learns
// nothing from the network tab; a wrong child is shown what the right answer
// was, which is the expected feedback.
//
// hintOnly: true in the body skips grading entirely and returns only { hint }.
// The hint button uses this so a child who has not yet answered can ask for a
// nudge without the server revealing the answer.
//
// Auth: same as questions.js — Supabase JWT (parent/teacher) or X-Student-Token.
// Rate limit: 200 calls per 10 minutes per identity. A child doing 20
// questions/minute hits the limit after 10 minutes of solid practice, which is
// faster than any real human. A scraper trying to pull all 17 000 answers
// needs 85+ hours at this rate.
//
// ⚠ subjectId is REQUIRED. The question bank is loaded from disk (the same
//   source the browser gets), keyed by subjectId. Without it we would have to
//   search every pack — 20 full loads — per call.
// ⚠ This function must never return the answer for a correct submission.
//   The only place `correctAnswer` appears in the response body is the `wrong`
//   branch below. Grep for "correctAnswer" if you add a code path.

const { resolveStudent } = require('../lib/student-auth');
const { loadSubject, checkAnswer } = require('../lib/questions-sandbox');

const SB_URL  = process.env.SUPABASE_URL       || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SB_ANON = process.env.SUPABASE_ANON_KEY  || 'sb_publishable_wERRrZnvoWhM5faN2AaYpQ_CpTNHFkL';
const SB_SRK  = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ── In-memory auth cache (same pattern as questions.js) ───────────────────
const _authCache = new Map();
const _AUTH_TTL  = 5 * 60 * 1000; // 5 minutes
function _authCacheGet(key) {
  const hit = _authCache.get(key);
  if (!hit) return undefined;
  if (Date.now() - hit.at > _AUTH_TTL) { _authCache.delete(key); return undefined; }
  return hit.uid;
}
function _authCacheSet(key, uid) {
  if (_authCache.size > 2000) _authCache.clear();
  _authCache.set(key, { uid, at: Date.now() });
}

// ── Rate limiting: 200 calls per 10 minutes per identity ─────────────────
const _rateLimit      = new Map();
const _RATE_WINDOW_MS = 10 * 60 * 1000;
const _RATE_MAX       = 200;

function _isRateLimited(uid) {
  if (!uid) return false;
  if (_rateLimit.size > 2000) _rateLimit.clear();
  const now = Date.now();
  const hit = _rateLimit.get(uid);
  if (!hit || now - hit.windowStart > _RATE_WINDOW_MS) {
    _rateLimit.set(uid, { count: 1, windowStart: now });
    return false;
  }
  hit.count++;
  return hit.count > _RATE_MAX;
}

// ── Question lookup cache (warm lambda reuse) ─────────────────────────────
// loadSubject() already caches internally, but a Map<subjectId, Map<id, q>>
// avoids re-scanning the array on every call.
const _indexCache = new Map();
function _getQuestion(subjectId, questionId) {
  if (!_indexCache.has(subjectId)) {
    const qs = loadSubject(subjectId);
    const idx = new Map(qs.map(q => [q.id, q]));
    _indexCache.set(subjectId, idx);
  }
  return _indexCache.get(subjectId).get(questionId) || null;
}

// ── CORS / shared headers ─────────────────────────────────────────────────
const BASE_HEADERS = {
  'Content-Type':                'application/json',
  'Access-Control-Allow-Origin': '*',
  'Cache-Control':               'no-store',
};

function _json(statusCode, body) {
  return { statusCode, headers: BASE_HEADERS, body: JSON.stringify(body) };
}

// ── Handler ───────────────────────────────────────────────────────────────
exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: BASE_HEADERS, body: '' };
  if (event.httpMethod !== 'POST')    return _json(405, { error: 'Method not allowed' });

  // ── Auth ──────────────────────────────────────────────────────────────
  const authHeader   = (event.headers['authorization'] || '').replace('Bearer ', '').trim();
  const studentToken = (event.headers['x-student-token'] || '').trim();

  if (!authHeader && !studentToken) return _json(401, { error: 'Unauthorized' });

  let _uid = null;
  if (authHeader) {
    _uid = _authCacheGet('jwt:' + authHeader);
    if (_uid === undefined) {
      const r = await fetch(`${SB_URL}/auth/v1/user`, {
        headers: { Authorization: `Bearer ${authHeader}`, apikey: SB_ANON },
      });
      if (!r.ok) return _json(401, { error: 'Invalid token' });
      try { _uid = (await r.json()).id || null; } catch (_) { _uid = null; }
      _authCacheSet('jwt:' + authHeader, _uid);
    }
  } else {
    _uid = _authCacheGet('tok:' + studentToken);
    if (_uid === undefined) {
      const r = await resolveStudent(event.headers, { supabaseUrl: SB_URL, serviceKey: SB_SRK });
      if (!r.ok) return _json(r.status, { error: r.error });
      _uid = r.studentId;
      _authCacheSet('tok:' + studentToken, _uid);
    }
  }

  if (_isRateLimited(_uid)) {
    return _json(429, { error: 'Too many requests — slow down and try again shortly.' });
  }

  // ── Parse body ────────────────────────────────────────────────────────
  let body;
  try { body = JSON.parse(event.body || '{}'); } catch (_) { return _json(400, { error: 'Invalid JSON' }); }

  const { subjectId, questionId, userAnswer, hintOnly = false } = body;

  if (!subjectId || typeof subjectId !== 'string') return _json(400, { error: 'subjectId required' });
  if (!questionId || typeof questionId !== 'string') return _json(400, { error: 'questionId required' });

  // ── Look up question ──────────────────────────────────────────────────
  const safeSubjectId = subjectId.replace(/[^a-z0-9-]/g, '');
  const q = _getQuestion(safeSubjectId, questionId);
  if (!q) return _json(404, { error: 'Question not found' });

  // ── Hint-only path ────────────────────────────────────────────────────
  // Returns only { hint } — no answer revealed, no grading done.
  if (hintOnly) {
    return _json(200, { hint: q.hint || null });
  }

  // ── Grade ─────────────────────────────────────────────────────────────
  if (userAnswer == null || userAnswer === '') return _json(400, { error: 'userAnswer required' });

  const correct = checkAnswer(q, userAnswer);

  if (correct) {
    // ⚠ Do NOT include correctAnswer when the child got it right.
    return _json(200, { correct: true });
  }

  // Wrong — reveal the correct answer and explanation so the child learns.
  // slip: true means the content was right but the accent was missing (French).
  const textResult = q.type === 'text'
    ? require('../lib/questions-sandbox').matchTypedAnswer(
        q.acceptableAnswers || [q.answer], userAnswer, q)
    : null;

  return _json(200, {
    correct:       false,
    correctAnswer: String(q.answer),
    explanation:   q.explanation || null,
    hint:          q.hint || null,
    slip:          textResult ? textResult.slip : false,
  });
};
