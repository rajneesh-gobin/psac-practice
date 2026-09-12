'use strict';
// POST /.netlify/functions/submit-exam
//
// Grades a full exam paper server-side. The browser sends:
//   { subjectId, examType, timeTaken, answers: [{ questionId, userAnswer }] }
// and gets back:
//   { correct, total, pct, chapterStats, review[] }
//
// review[i] = { questionId, ok, correctAnswer?, explanation? }
// correctAnswer and explanation appear only for WRONG answers.
//
// Auth: same as questions.js — Supabase JWT or X-Student-Token.
// Rate limit: 10 exam submissions per hour per identity. A real child sits
// one exam per session; 10/hour is already suspicious.
//
// ⚠ subjectId is REQUIRED — same reason as check-answer.js.
// ⚠ answers[] must not exceed 60 items (a full NCE paper is 40; the cap
//   prevents a crafted request from forcing a full corpus scan).
// ⚠ chapterStats must match what the client-side grader produced today —
//   the verification checklist requires this to be zero-error before Step 4.

const { resolveStudent } = require('../lib/student-auth');
const { loadSubject, checkAnswer } = require('../lib/questions-sandbox');

const SB_URL  = process.env.SUPABASE_URL       || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SB_ANON = process.env.SUPABASE_ANON_KEY  || 'sb_publishable_wERRrZnvoWhM5faN2AaYpQ_CpTNHFkL';
const SB_SRK  = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ── In-memory auth cache ──────────────────────────────────────────────────
const _authCache = new Map();
const _AUTH_TTL  = 5 * 60 * 1000;
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

// ── Rate limiting: 10 exam submissions per hour per identity ──────────────
const _rateLimit      = new Map();
const _RATE_WINDOW_MS = 60 * 60 * 1000;
const _RATE_MAX       = 10;

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

// ── Question index cache ──────────────────────────────────────────────────
const _indexCache = new Map();
function _getIndex(subjectId) {
  if (!_indexCache.has(subjectId)) {
    const qs = loadSubject(subjectId);
    _indexCache.set(subjectId, new Map(qs.map(q => [q.id, q])));
  }
  return _indexCache.get(subjectId);
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
    return _json(429, { error: 'Too many requests — try again later.' });
  }

  // ── Parse body ────────────────────────────────────────────────────────
  let body;
  try { body = JSON.parse(event.body || '{}'); } catch (_) { return _json(400, { error: 'Invalid JSON' }); }

  const { subjectId, examType, timeTaken, answers } = body;

  if (!subjectId || typeof subjectId !== 'string') return _json(400, { error: 'subjectId required' });
  if (!Array.isArray(answers) || answers.length === 0) return _json(400, { error: 'answers[] required' });
  if (answers.length > 60) return _json(400, { error: 'Too many answers — max 60' });

  // ── Look up questions ─────────────────────────────────────────────────
  const safeSubjectId = subjectId.replace(/[^a-z0-9-]/g, '');
  const idx = _getIndex(safeSubjectId);

  // ── Grade each answer ─────────────────────────────────────────────────
  let correct = 0;
  const chapterStats = {};
  const review = [];

  for (const a of answers) {
    if (!a || typeof a.questionId !== 'string') continue;
    const q = idx.get(a.questionId);
    if (!q) continue;

    const ua  = a.userAnswer != null ? String(a.userAnswer) : '';
    const ok  = ua !== '' && checkAnswer(q, ua);
    if (ok) correct++;

    const chId = q.chapterId || 'unknown';
    if (!chapterStats[chId]) chapterStats[chId] = { correct: 0, total: 0 };
    chapterStats[chId].total++;
    if (ok) chapterStats[chId].correct++;

    const row = { questionId: q.id, ok };
    if (!ok) {
      // Only reveal the answer when the child got it wrong.
      row.correctAnswer = String(q.answer);
      row.explanation   = q.explanation || null;
    }
    review.push(row);
  }

  const total = review.length;
  const pct   = total ? Math.round(correct / total * 100) : 0;

  return _json(200, {
    correct,
    total,
    pct,
    examType:     examType || null,
    timeTaken:    typeof timeTaken === 'number' ? timeTaken : null,
    chapterStats,
    review,
  });
};
