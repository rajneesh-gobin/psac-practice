'use strict';
// Cloudflare Worker — questions API.
// Mirrors netlify/functions/questions.js but with all filesystem code removed.
// Primary path: Supabase RPC (get_questions_for_client / get_grade_questions_for_client).
// Fallback: direct DB query + JS filter for when RPC is unavailable.

import { resolveStudent } from '../lib/student-auth.js';

// ── Typed-answer helpers (pure JS, no I/O) ──────────────────────────────────
function foldAnswer(s) {
  return String(s == null ? '' : s)
    .replace(/[''ʼ´`]/g, "'")
    .replace(/\s+/g, ' ').trim().toLowerCase()
    .replace(/[.,;:!?…]+$/, '');
}
function bareAnswer(s) {
  return foldAnswer(s).normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// ── Plan / settings cache ────────────────────────────────────────────────────
const _settingsCache = { data: null, at: 0 };
const _planCache     = new Map();
const _PLAN_TTL      = 5 * 60 * 1000;

// ── DB question cache ─────────────────────────────────────────────────────────
const _dbCache = new Map();
const _DB_TTL  = 5 * 60 * 1000;

async function _fetchAllRows(url, hdrs) {
  const PAGE = 500;
  let offset = 0, all = [], done = false;
  while (!done) {
    const r = await fetch(`${url}&limit=${PAGE}&offset=${offset}`, { headers: hdrs });
    if (!r.ok) return null;
    const batch = await r.json();
    if (!Array.isArray(batch)) return null;
    all.push(...batch);
    if (batch.length < PAGE) done = true;
    else offset += PAGE;
  }
  return all;
}

async function _dbQuerySubject(subjectId, sbUrl, sbSrk) {
  if (!sbSrk) return null;
  const key = `sub:${subjectId}`;
  const hit = _dbCache.get(key);
  if (hit && (Date.now() - hit.at) < _DB_TTL) return hit.data;
  const hdrs = { apikey: sbSrk, Authorization: `Bearer ${sbSrk}` };
  const url  = `${sbUrl}/rest/v1/questions?subject_id=eq.${encodeURIComponent(subjectId)}&is_past_paper=eq.false&select=data`;
  const rows = await _fetchAllRows(url, hdrs).catch(() => null);
  if (!rows || !rows.length) return null;
  const data = rows.map(r => r.data);
  _dbCache.set(key, { data, at: Date.now() });
  return data;
}

async function _dbQueryGrade(grade, sbUrl, sbSrk) {
  if (!sbSrk) return null;
  const key = `grade:${grade}`;
  const hit = _dbCache.get(key);
  if (hit && (Date.now() - hit.at) < _DB_TTL) return hit.data;
  const hdrs = { apikey: sbSrk, Authorization: `Bearer ${sbSrk}` };
  const url  = `${sbUrl}/rest/v1/questions?grade=eq.${grade}&is_past_paper=eq.false&select=subject_id,data`;
  const rows = await _fetchAllRows(url, hdrs).catch(() => null);
  if (!rows || !rows.length) return null;
  const grouped = {};
  for (const row of rows) {
    if (!grouped[row.subject_id]) grouped[row.subject_id] = [];
    grouped[row.subject_id].push(row.data);
  }
  _dbCache.set(key, { data: grouped, at: Date.now() });
  return grouped;
}

async function _dbQueryPastPapers(grade, sbUrl, sbSrk) {
  if (!sbSrk) return null;
  const key = `papers:${grade || 'all'}`;
  const hit = _dbCache.get(key);
  if (hit && (Date.now() - hit.at) < _DB_TTL) return hit.data;
  const hdrs = { apikey: sbSrk, Authorization: `Bearer ${sbSrk}` };
  let url = `${sbUrl}/rest/v1/questions?is_past_paper=eq.true&select=data`;
  if (grade) url += `&grade=eq.${grade}`;
  const rows = await _fetchAllRows(url, hdrs).catch(() => null);
  if (!rows || !rows.length) return null;
  const data = rows.map(r => r.data);
  _dbCache.set(key, { data, at: Date.now() });
  return data;
}

// ── Supabase RPC helpers (primary path — filtering + stripping done in SQL) ──
async function _rpcGetSubjectQuestions(subjectId, chapterId, difficulty, allowedChapters, blockedChapters, sbUrl, sbSrk) {
  if (!sbSrk) return null;
  try {
    const r = await fetch(`${sbUrl}/rest/v1/rpc/get_questions_for_client`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: sbSrk, Authorization: `Bearer ${sbSrk}` },
      body: JSON.stringify({
        p_subject_id:       subjectId,
        p_chapter_id:       chapterId || null,
        p_difficulty:       difficulty || null,
        p_allowed_chapters: allowedChapters || null,
        p_blocked_chapters: blockedChapters && blockedChapters.length ? blockedChapters : null,
      }),
    });
    if (!r.ok) return null;
    const data = await r.json();
    return Array.isArray(data) ? data : null;
  } catch (_) { return null; }
}

async function _rpcGetGradeQuestions(grade, allowedChapters, blockedChapters, blockedSubjects, sbUrl, sbSrk) {
  if (!sbSrk) return null;
  try {
    const r = await fetch(`${sbUrl}/rest/v1/rpc/get_grade_questions_for_client`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: sbSrk, Authorization: `Bearer ${sbSrk}` },
      body: JSON.stringify({
        p_grade:            parseInt(grade),
        p_allowed_chapters: allowedChapters || null,
        p_blocked_chapters: blockedChapters && blockedChapters.length ? blockedChapters : null,
        p_blocked_subjects: blockedSubjects && blockedSubjects.length ? blockedSubjects : null,
      }),
    });
    if (!r.ok) return null;
    const data = await r.json();
    return data && typeof data === 'object' && !Array.isArray(data) ? data : null;
  } catch (_) { return null; }
}

// ── Auth cache ───────────────────────────────────────────────────────────────
const _authCache = new Map();
const _AUTH_TTL  = 5 * 60 * 1000;

function _authCacheGet(key) {
  const hit = _authCache.get(key);
  if (hit && (Date.now() - hit.at) < _AUTH_TTL) return hit.uid;
  if (hit) _authCache.delete(key);
  return undefined;
}
function _authCacheSet(key, uid) {
  if (_authCache.size > 500) _authCache.clear();
  _authCache.set(key, { uid, at: Date.now() });
}

// ── Rate limiting ─────────────────────────────────────────────────────────────
const _rateLimit      = new Map();
const _RATE_WINDOW_MS = 5 * 60 * 1000;
const _RATE_MAX       = 40;

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

// ── Global settings ──────────────────────────────────────────────────────────
async function _globalSettings(sbUrl, sbAnon) {
  const now = Date.now();
  if (_settingsCache.data !== null && (now - _settingsCache.at) < _PLAN_TTL) return _settingsCache.data;
  try {
    const r = await fetch(
      `${sbUrl}/rest/v1/mm_data?key=eq.global_settings&select=value&limit=1`,
      { headers: { apikey: sbAnon, Authorization: `Bearer ${sbAnon}` } }
    );
    const rows = r.ok ? await r.json() : [];
    const val  = rows[0]?.value || {};
    _settingsCache.data = val;
    _settingsCache.at   = now;
    return val;
  } catch (_) { return {}; }
}

// ── Account access ────────────────────────────────────────────────────────────
const _accessCache = new Map();

async function _accountAccess(parentId, studentExpiresAt, sbUrl, sbSrk) {
  const empty = { blocked: false, expired: false, entitled: [] };
  if (!parentId || !sbSrk) return empty;
  const now = Date.now();
  const hit = _accessCache.get(parentId);
  let base = hit && (now - hit.at) < _PLAN_TTL ? hit.data : null;
  if (!base) {
    base = { blocked: false, expired: false, entitled: [] };
    try {
      const hdrs = { apikey: sbSrk, Authorization: `Bearer ${sbSrk}` };
      const [pr, er] = await Promise.all([
        fetch(`${sbUrl}/rest/v1/profiles?id=eq.${parentId}&select=expires_at,blocked_until&limit=1`, { headers: hdrs }),
        fetch(`${sbUrl}/rest/v1/chapter_entitlements?user_id=eq.${parentId}&expires_at=gt.${new Date().toISOString()}&select=chapter_id`, { headers: hdrs }),
      ]);
      const p = pr.ok ? (await pr.json())[0] : null;
      if (p) {
        base.blocked = !!(p.blocked_until && new Date(p.blocked_until) > new Date());
        base.expired = !!(p.expires_at && new Date(p.expires_at) < new Date());
      }
      if (er.ok) {
        const rows = await er.json();
        if (Array.isArray(rows)) base.entitled = rows.map(r => r.chapter_id).filter(c => typeof c === 'string');
      }
      _accessCache.set(parentId, { data: base, at: now });
    } catch (e) {
      return empty;
    }
  }
  const expired = base.expired || !!(studentExpiresAt && new Date(studentExpiresAt) < new Date());
  return { blocked: base.blocked, expired, entitled: base.entitled };
}

// ── Owner resolution ─────────────────────────────────────────────────────────
const _ownerCache = new Map();

async function _resolveOwner(userId, isStudentId, sbUrl, sbSrk) {
  if (!sbSrk) return null;
  const now = Date.now();
  const hit = _ownerCache.get(userId);
  if (hit && (now - hit.at) < _PLAN_TTL) return hit;
  const hdrs = { apikey: sbSrk, Authorization: `Bearer ${sbSrk}` };
  let out = { parentId: userId, studentExpiresAt: null, at: now };
  try {
    if (isStudentId) {
      const sr = await fetch(`${sbUrl}/rest/v1/students?id=eq.${userId}&select=family_id,expires_at&limit=1`, { headers: hdrs });
      const s = sr.ok ? (await sr.json())[0] : null;
      if (!s?.family_id) return null;
      out.studentExpiresAt = s.expires_at || null;
      const fr = await fetch(`${sbUrl}/rest/v1/families?id=eq.${s.family_id}&select=parent_id&limit=1`, { headers: hdrs });
      const f = fr.ok ? (await fr.json())[0] : null;
      if (!f?.parent_id) return null;
      out.parentId = f.parent_id;
    }
    _ownerCache.set(userId, out);
    return out;
  } catch (_) { return null; }
}

// ── Free grades ───────────────────────────────────────────────────────────────
const FREE_GRADES = [1, 2];
function _isFreeSubjectId(subjectId) {
  const m = /^grade(\d+)-/.exec(String(subjectId || ''));
  return !!m && FREE_GRADES.includes(Number(m[1]));
}

async function _getAllowedChapters(parentId, sbUrl, sbSrk) {
  if (!sbSrk || !parentId) return null;
  const now    = Date.now();
  const cached = _planCache.get(parentId);
  if (cached && (now - cached.at) < _PLAN_TTL) return cached.data;
  try {
    const subR = await fetch(
      `${sbUrl}/rest/v1/subscriptions?user_id=eq.${parentId}&status=eq.active&select=plan_id,plans(features)&order=started_at.desc&limit=1`,
      { headers: { apikey: sbSrk, Authorization: `Bearer ${sbSrk}` } }
    );
    const subRows  = subR.ok ? await subR.json() : [];
    const features = subRows[0]?.plans?.features;
    const allowed  = features?.allowed_chapters ?? null;
    _planCache.set(parentId, { data: allowed, at: now });
    return allowed;
  } catch (_) { return null; }
}

// ── Worker handler ────────────────────────────────────────────────────────────
export default async function handler(request, env) {
  const BASE_HEADERS = {
    'Content-Type':                'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control':               'public, s-maxage=86400, stale-while-revalidate=3600',
  };
  const ERR_HEADERS = Object.assign({}, BASE_HEADERS, { 'Cache-Control': 'no-store' });

  const json = (status, body, hdrs) =>
    new Response(JSON.stringify(body), { status, headers: hdrs || BASE_HEADERS });

  if (request.method === 'OPTIONS') return new Response('', { status: 200, headers: BASE_HEADERS });

  const SB_URL  = env.SUPABASE_URL  || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
  const SB_ANON = env.SUPABASE_ANON_KEY || 'sb_publishable_wERRrZnvoWhM5faN2AaYpQ_CpTNHFkL';
  const SB_SRK  = env.SUPABASE_SERVICE_ROLE_KEY;

  const authHeader   = (request.headers.get('authorization') || '').replace('Bearer ', '').trim();
  const studentToken = (request.headers.get('x-student-token') || '').trim();

  if (!authHeader && !studentToken) return json(401, { error: 'Unauthorized' }, ERR_HEADERS);

  let _uid = null;
  if (authHeader) {
    _uid = _authCacheGet('jwt:' + authHeader);
    if (_uid === undefined) {
      const r = await fetch(`${SB_URL}/auth/v1/user`, {
        headers: { Authorization: `Bearer ${authHeader}`, apikey: SB_ANON },
      });
      if (!r.ok) return json(401, { error: 'Invalid token' }, ERR_HEADERS);
      try { _uid = (await r.json()).id || null; } catch (_) { _uid = null; }
      _authCacheSet('jwt:' + authHeader, _uid);
    }
  } else {
    _uid = _authCacheGet('tok:' + studentToken);
    if (_uid === undefined) {
      const r = await resolveStudent(request.headers, { supabaseUrl: SB_URL, serviceKey: SB_SRK });
      if (!r.ok) return json(r.status, { error: r.error }, ERR_HEADERS);
      _uid = r.studentId;
      _authCacheSet('tok:' + studentToken, _uid);
    }
  }

  const studentId = studentToken ? _uid : null;

  if (_isRateLimited(_uid)) return json(429, { error: 'Too many requests. Please slow down and try again shortly.' }, ERR_HEADERS);

  const _gs      = await _globalSettings(SB_URL, SB_ANON);
  const _owner   = await _resolveOwner(_uid, !!studentId, SB_URL, SB_SRK);
  const _access  = _owner
    ? await _accountAccess(_owner.parentId, _owner.studentExpiresAt, SB_URL, SB_SRK)
    : { blocked: false, expired: false, entitled: [] };

  if (_access.blocked) {
    return json(403, { error: 'account_blocked', message: 'This account is temporarily paused. Please contact support.' },
      Object.assign({}, BASE_HEADERS, { 'Cache-Control': 'no-store' }));
  }

  let _allowedChapters = null;
  if (_gs.plan_enforcement_enabled === true && _owner) {
    _allowedChapters = await _getAllowedChapters(_owner.parentId, SB_URL, SB_SRK);
  }

  if (_access.expired) {
    _allowedChapters = _access.entitled;
  } else if (_allowedChapters && _access.entitled.length) {
    _allowedChapters = [...new Set([..._allowedChapters, ..._access.entitled])];
  }
  const _allowedSet      = _allowedChapters ? new Set(_allowedChapters) : null;
  const _blockedSet      = new Set(_gs.disabled_chapters || []);
  const _blockedSubjects = new Set(_gs.disabled_subjects || []);

  const _planFilter = (qs, subjectId) => {
    let out = qs;
    if (_allowedSet && !_isFreeSubjectId(subjectId)) out = out.filter(q => _allowedSet.has(q.chapterId));
    if (_blockedSet.size) out = out.filter(q => !_blockedSet.has(q.chapterId));
    return out;
  };

  const _KEEP_ANSWER_TYPES = new Set(['symmetry-line', 'expr', 'slots']);
  const _stripForClient = qs => qs.map(q => {
    if (_KEEP_ANSWER_TYPES.has(q.type)) return q;
    const o = Object.assign({}, q);
    delete o.answer; delete o.hint; delete o.explanation;
    return o;
  });

  const headers = Object.assign({}, BASE_HEADERS);
  if (_allowedSet) headers['Cache-Control'] = 'private, max-age=300';
  else if (_blockedSet.size || _blockedSubjects.size) headers['Cache-Control'] = 'public, s-maxage=300';

  const url        = new URL(request.url);
  const p          = Object.fromEntries(url.searchParams);
  const subjectId  = (p.subject   || '').replace(/[^a-z0-9-]/g, '');
  const chapterId  = (p.chapter   || '') || null;
  const difficulty = p.difficulty ? parseInt(p.difficulty) : null;
  const batchAll   = p.all === '1';
  const batchGrade = (p.grade     || '').replace(/[^0-9]/g, '');

  // Past papers
  if (p.papers === '1') {
    const all = await _dbQueryPastPapers(batchGrade || null, SB_URL, SB_SRK) || [];
    const list = (batchGrade && all.some(q => q.grade))
      ? all.filter(q => String(q.grade) === batchGrade) : all;
    return new Response(JSON.stringify(list), { status: 200, headers });
  }

  // Batch grade
  if (batchAll && batchGrade) {
    try {
      const blockedSubjArr = _blockedSubjects.size ? [..._blockedSubjects] : null;
      const blockedChArr   = _blockedSet.size       ? [..._blockedSet]       : null;
      const rpcBundle = await _rpcGetGradeQuestions(batchGrade, _allowedChapters, blockedChArr, blockedSubjArr, SB_URL, SB_SRK);
      if (rpcBundle) return new Response(JSON.stringify(rpcBundle), { status: 200, headers });

      const dbBundle = await _dbQueryGrade(batchGrade, SB_URL, SB_SRK);
      if (dbBundle) {
        const out = {};
        for (const [key, qs] of Object.entries(dbBundle)) {
          if (_blockedSubjects.has(key)) continue;
          out[key] = _stripForClient(_planFilter(qs, key));
        }
        return new Response(JSON.stringify(out), { status: 200, headers });
      }
      return new Response('{}', { status: 200, headers });
    } catch (e) {
      return json(500, { error: 'Server error' }, ERR_HEADERS);
    }
  }

  if (!subjectId) return json(400, { error: 'subject param required' }, ERR_HEADERS);
  if (_blockedSubjects.has(subjectId)) return new Response('[]', { status: 200, headers });

  try {
    const rpcQs = await _rpcGetSubjectQuestions(
      subjectId, chapterId, difficulty,
      _isFreeSubjectId(subjectId) ? null : _allowedChapters,
      _blockedSet.size ? [..._blockedSet] : null,
      SB_URL, SB_SRK
    );
    if (rpcQs) return new Response(JSON.stringify(rpcQs), { status: 200, headers });

    // Fallback: raw DB query + JS filter
    const subjectQs = await _dbQuerySubject(subjectId, SB_URL, SB_SRK);
    if (subjectQs) {
      let questions = _planFilter(subjectQs, subjectId);
      if (chapterId)  questions = questions.filter(q => q.chapterId  === chapterId);
      if (difficulty) questions = questions.filter(q => q.difficulty === difficulty);
      return new Response(JSON.stringify(_stripForClient(questions)), { status: 200, headers });
    }
    return new Response('[]', { status: 200, headers });
  } catch (e) {
    return json(500, { error: 'Server error' }, ERR_HEADERS);
  }
}
