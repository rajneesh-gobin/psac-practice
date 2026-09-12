'use strict';
// POST /api/check-answer — Cloudflare Workers version.
// Grades one question server-side. Fetches question data from Supabase DB
// instead of loading from disk (no filesystem in Workers).

import { resolveStudent } from '../lib/student-auth.js';
import { checkAnswer, matchTypedAnswer } from '../lib/grading.js';

const SB_ANON = 'sb_publishable_wERRrZnvoWhM5faN2AaYpQ_CpTNHFkL';

const BASE_HEADERS = {
  'Content-Type':                'application/json',
  'Access-Control-Allow-Origin': '*',
  'Cache-Control':               'no-store',
};

function _json(status, body) {
  return new Response(JSON.stringify(body), { status, headers: BASE_HEADERS });
}

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

// ── Fetch question from Supabase DB ───────────────────────────────────────
async function _getQuestion(questionId, sbUrl, sbSrk) {
  try {
    const r = await fetch(
      `${sbUrl}/rest/v1/questions?id=eq.${encodeURIComponent(questionId)}&select=data&limit=1`,
      { headers: { apikey: sbSrk, Authorization: `Bearer ${sbSrk}` } }
    );
    if (!r.ok) return null;
    const rows = await r.json();
    return rows[0]?.data || null;
  } catch (_) { return null; }
}

// ── Handler ───────────────────────────────────────────────────────────────
export default async function handler(request, env) {
  if (request.method === 'OPTIONS') return new Response('', { status: 200, headers: BASE_HEADERS });
  if (request.method !== 'POST')    return _json(405, { error: 'Method not allowed' });

  const SB_URL = env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
  const SB_SRK = env.SUPABASE_SERVICE_ROLE_KEY;

  const authHeader   = (request.headers.get('authorization') || '').replace('Bearer ', '').trim();
  const studentToken = (request.headers.get('x-student-token') || '').trim();

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
      const res = await resolveStudent(
        { 'x-student-token': studentToken },
        { supabaseUrl: SB_URL, serviceKey: SB_SRK }
      );
      if (!res.ok) return _json(res.status, { error: res.error });
      _uid = res.studentId;
      _authCacheSet('tok:' + studentToken, _uid);
    }
  }

  if (_isRateLimited(_uid)) return _json(429, { error: 'Too many requests — slow down and try again shortly.' });

  let body;
  try { body = await request.json(); } catch (_) { return _json(400, { error: 'Invalid JSON' }); }

  const { subjectId, questionId, userAnswer, hintOnly = false } = body;

  if (!subjectId || typeof subjectId !== 'string') return _json(400, { error: 'subjectId required' });
  if (!questionId || typeof questionId !== 'string') return _json(400, { error: 'questionId required' });

  const q = await _getQuestion(questionId, SB_URL, SB_SRK);
  if (!q) return _json(404, { error: 'Question not found' });

  if (hintOnly) return _json(200, { hint: q.hint || null });

  if (userAnswer == null || userAnswer === '') return _json(400, { error: 'userAnswer required' });

  const correct = checkAnswer(q, String(userAnswer));

  if (correct) return _json(200, { correct: true });

  const textResult = q.type === 'text'
    ? matchTypedAnswer(q.acceptableAnswers || [q.answer], userAnswer, q)
    : null;

  return _json(200, {
    correct:       false,
    correctAnswer: String(q.answer),
    explanation:   q.explanation || null,
    hint:          q.hint || null,
    slip:          textResult ? textResult.slip : false,
  });
}
