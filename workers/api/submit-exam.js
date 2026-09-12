'use strict';
// POST /api/submit-exam — Cloudflare Workers version.
// Grades a full exam paper. Batch-fetches questions from Supabase DB
// instead of loading from disk (no filesystem in Workers).

import { resolveStudent } from '../lib/student-auth.js';
import { checkAnswer } from '../lib/grading.js';

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

// ── Batch-fetch questions from Supabase DB ────────────────────────────────
async function _getQuestions(questionIds, sbUrl, sbSrk) {
  if (!questionIds.length) return new Map();
  try {
    // Supabase supports in.() for multiple IDs
    const ids = questionIds.map(id => encodeURIComponent(id)).join(',');
    const r = await fetch(
      `${sbUrl}/rest/v1/questions?id=in.(${ids})&select=data`,
      { headers: { apikey: sbSrk, Authorization: `Bearer ${sbSrk}` } }
    );
    if (!r.ok) return new Map();
    const rows = await r.json();
    const idx = new Map();
    for (const row of rows) {
      if (row.data?.id) idx.set(row.data.id, row.data);
    }
    return idx;
  } catch (_) { return new Map(); }
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

  if (_isRateLimited(_uid)) return _json(429, { error: 'Too many requests — try again later.' });

  let body;
  try { body = await request.json(); } catch (_) { return _json(400, { error: 'Invalid JSON' }); }

  const { subjectId, examType, timeTaken, answers } = body;

  if (!subjectId || typeof subjectId !== 'string') return _json(400, { error: 'subjectId required' });
  if (!Array.isArray(answers) || answers.length === 0) return _json(400, { error: 'answers[] required' });
  if (answers.length > 60) return _json(400, { error: 'Too many answers — max 60' });

  const questionIds = answers.map(a => a?.questionId).filter(Boolean);
  const idx = await _getQuestions(questionIds, SB_URL, SB_SRK);

  let correct = 0;
  const chapterStats = {};
  const review = [];

  for (const a of answers) {
    if (!a || typeof a.questionId !== 'string') continue;
    const q = idx.get(a.questionId);
    if (!q) continue;

    const ua = a.userAnswer != null ? String(a.userAnswer) : '';
    const ok = ua !== '' && checkAnswer(q, ua);
    if (ok) correct++;

    const chId = q.chapterId || 'unknown';
    if (!chapterStats[chId]) chapterStats[chId] = { correct: 0, total: 0 };
    chapterStats[chId].total++;
    if (ok) chapterStats[chId].correct++;

    const row = { questionId: q.id, ok };
    if (!ok) {
      row.correctAnswer = String(q.answer);
      row.explanation   = q.explanation || null;
    }
    review.push(row);
  }

  const total = review.length;
  const pct   = total ? Math.round(correct / total * 100) : 0;

  return _json(200, {
    correct, total, pct,
    examType:  examType || null,
    timeTaken: typeof timeTaken === 'number' ? timeTaken : null,
    chapterStats,
    review,
  });
}
