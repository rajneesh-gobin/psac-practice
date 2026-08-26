// Netlify Function - Question Server
// Reads question JS files server-side and returns filtered JSON.
// Browser never sees the raw source files.

const vm   = require('vm');
const fs   = require('fs');
const path = require('path');

// Project root is two levels up from netlify/functions/
const ROOT = path.resolve(__dirname, '..', '..');

// ── Helper functions that mirror helpers.js ────
// Run inside the vm context so question files can call them normally.
function _buildContext(buf) {
  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
  const rnd     = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const fmt     = n => n.toLocaleString('en-GB');

  function makeMCQ({ id, chapterId, difficulty, subsection, question, options, answer, hint, explanation }) {
    const others   = shuffle((options || []).filter(o => o !== answer));
    const finalOpts = shuffle([answer, ...others.slice(0, 3)]);
    return { id, chapterId, difficulty, subsection, type: 'mcq', question, options: finalOpts, answer, acceptableAnswers: [answer], hint, explanation };
  }

  function makeNum({ id, chapterId, difficulty, subsection, question, answer, acceptableAnswers, hint, explanation }) {
    return { id, chapterId, difficulty, subsection, type: 'numeric', question,
      answer: String(answer),
      acceptableAnswers: (acceptableAnswers || [String(answer)]).map(String),
      hint, explanation };
  }

  // Mirrors engine/helpers.js, including `subsection` — the one field this
  // factory used to drop while every other factory passed it through.
  function makeSymmetry({ id, chapterId, difficulty, subsection, question, rows, cols, axis, axisPos, given, answer, hint, explanation }) {
    const ans = answer || (given || []).map(([r, c]) => {
      if (axis === 'vertical')   return [r, (cols - 1) - c];
      if (axis === 'horizontal') return [(rows - 1) - r, c];
      return null;
    }).filter(Boolean);
    return { id, chapterId, difficulty, subsection, type: 'symmetry', question, rows, cols, axis, axisPos, given, answer: ans,
      hint: hint || 'Click the empty cells to mirror the pattern across the coloured line.',
      explanation: explanation || 'Each cell mirrors its pair across the axis of symmetry.' };
  }

  // French packs need French answer labels; the g4fr-/g5fr-/g6fr-/fr- id prefix is
  // the only language marker a question factory can see.
  const _tfLabels = (id, chapterId) =>
    (/^(g\d)?fr[-_]/i.test(id || '') || /^(g\d)?fr[-_]/i.test(chapterId || ''))
      ? ['Vrai', 'Faux'] : ['True', 'False'];
  function makeTF({ id, chapterId, difficulty, subsection, question, answer, hint, explanation }) {
    return makeMCQ({ id, chapterId, difficulty, subsection, question,
      options: _tfLabels(id, chapterId), answer: _tfLabels(id, chapterId)[answer ? 0 : 1], hint, explanation });
  }

  function makeMatch({ id, chapterId, difficulty, subsection, leftItem, correctRight, allRights, hint, explanation }) {
    const wrongOpts = shuffle((allRights || []).filter(r => r !== correctRight)).slice(0, 3);
    return makeMCQ({ id, chapterId, difficulty, subsection,
      question: `What does <b>${leftItem}</b> match to?`,
      options: [correctRight, ...wrongOpts], answer: correctRight, hint, explanation });
  }

  // The REAL array with a flattening push — see the note in build-questions.js.
  // A { push }-only stub makes questions_audit.js throw on `.forEach`, which
  // silently drops that whole file: 18 questions and every difficulty
  // correction it applies.
  const STATIC_QUESTIONS = buf;
  buf.push = function (...qs) {
    qs.flat().forEach(q => q && Array.prototype.push.call(this, q));
    return this.length;
  };

  return { rnd, shuffle, fmt, makeMCQ, makeNum, makeTF, makeMatch, makeSymmetry, STATIC_QUESTIONS,
           'use strict': undefined }; // suppress strict-mode header errors
}

// ── Load all question files for a subject ────
function _loadSubject(subjectId) {
  const dir = path.join(ROOT, 'subjects', subjectId, 'questions');
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.js'))
    .sort(); // consistent ordering

  const buf = [];
  const ctx = vm.createContext(_buildContext(buf));

  for (const file of files) {
    try {
      const code = fs.readFileSync(path.join(dir, file), 'utf8');
      new vm.Script(code, { filename: file }).runInContext(ctx);
    } catch(e) {
      console.warn(`[questions] ${file}: ${e.message}`);
    }
  }

  return buf;
}

// ── Plan enforcement cache (module-level, survives warm Lambda re-use) ────────
const _settingsCache = { data: null, at: 0 };
const _planCache     = new Map(); // userId → { data: allowed_chapters|null, at }
const _PLAN_TTL      = 5 * 60 * 1000; // 5 minutes

// ── Bundle cache ─────────────────────────────────────────────────────────────
// Question bundles are IMMUTABLE for the life of a deploy — they are written by
// the build step and never change until the next one. Re-reading and re-parsing
// grade5.json (1.6 MB) on every invocation was the single most expensive thing
// this function did, and Netlify bills the milliseconds. Parse once per warm
// container, keep it for as long as the container lives; no TTL, because a new
// deploy means a new container anyway.
const _bundleCache = new Map(); // filename → parsed JSON

function _readBundle(name) {
  if (_bundleCache.has(name)) return _bundleCache.get(name);
  const file = path.join(__dirname, '..', 'question-bundles', `${name}.json`);
  let parsed = null;
  try {
    if (fs.existsSync(file)) parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch(e) {
    console.error('[questions] bundle read', name, e.message);
  }
  _bundleCache.set(name, parsed);   // cache the miss too - existsSync is not free
  return parsed;
}

// ── DB question cache ─────────────────────────────────────────────────────────
// Questions change only when the import script runs (not on every deploy), so
// a 5-minute TTL balances freshness against Supabase round trips.
const _dbCache = new Map(); // key → { data: [...], at }
const _DB_TTL  = 5 * 60 * 1000;

// Fetches all rows for a query, paginating 500 at a time.
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

// Returns question data array for a subject from DB, or null if empty/unavailable.
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

// Returns { subjectId: [...] } map for a grade from DB, or null.
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

// Returns past-paper array from DB, or null.
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

// ── Auth cache ───────────────────────────────────────────────────────────────
// Verifying a caller costs a Supabase round trip (~100-300 ms of billed time)
// and the answer barely changes minute to minute. Keyed on the credential
// itself, so a revoked token stops working within the TTL rather than never.
// Deliberately short, and never cached for a FAILED check - a rejected caller
// must not be able to pin a negative result, and a newly created child must be
// able to log in immediately.
const _authCache = new Map(); // credential → { uid, at }
const _AUTH_TTL  = 5 * 60 * 1000;

function _authCacheGet(key) {
  const hit = _authCache.get(key);
  if (hit && (Date.now() - hit.at) < _AUTH_TTL) return hit.uid;
  if (hit) _authCache.delete(key);
  return undefined;
}

function _authCacheSet(key, uid) {
  // A warm container that has served many children should not grow unbounded.
  if (_authCache.size > 500) _authCache.clear();
  _authCache.set(key, { uid, at: Date.now() });
}

// ── Rate limiting ──────────────────────────────────────────────────────────
// This function's whole job is handing back question content in the clear -
// the browser has to be able to grade an answer, so the correct answer ships
// with every question, and no amount of client-side obfuscation changes that
// for someone reading the response in devtools. What this DOES stop is bulk
// scraping: a script looping every subject × grade × chapter × difficulty
// combination to rip the whole bank in one burst, which looks nothing like a
// real student (the client fetches a subject once and caches it client-side
// for 7 days - see _CACHE_VERSION in question_loader.js).
//
// In-memory and per-warm-container, same tradeoff as _authCache/_planCache
// above: it resets on a cold start and can't see across parallel warm
// instances, so a determined attacker spreading requests across many
// concurrent invocations can partially evade it. That is a real gap - a
// durable counter (a Supabase table, checked/incremented per request) would
// close it, at the cost of a DB round trip on every call. This is the cheap
// backstop that stops the common case for free; upgrade it if scraping is
// actually observed rather than paying that cost pre-emptively.
const _rateLimit    = new Map(); // uid → { count, windowStart }
const _RATE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const _RATE_MAX       = 40;            // generous for real use - see comment above

function _isRateLimited(uid) {
  if (!uid) return false; // no identity ⇒ the auth check earlier already rejected the call
  if (_rateLimit.size > 2000) _rateLimit.clear(); // same unbounded-growth guard as _authCache
  const now = Date.now();
  const hit = _rateLimit.get(uid);
  if (!hit || now - hit.windowStart > _RATE_WINDOW_MS) {
    _rateLimit.set(uid, { count: 1, windowStart: now });
    return false;
  }
  hit.count++;
  return hit.count > _RATE_MAX;
}

// Returns the whole global_settings blob, not just the enforcement flag: the
// same fetch also carries disabled_chapters, and doing it twice would double the
// round trips on a cold Lambda.
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
  } catch(_) { return {}; }
}

async function _getAllowedChapters(userId, isStudentId, sbUrl, sbSrk) {
  if (!sbSrk) return null; // no service key → serve everything
  const now    = Date.now();
  const cached = _planCache.get(userId);
  if (cached && (now - cached.at) < _PLAN_TTL) return cached.data;

  let parentId = userId;
  try {
    if (isStudentId) {
      const sr = await fetch(
        `${sbUrl}/rest/v1/students?id=eq.${userId}&select=family_id&limit=1`,
        { headers: { apikey: sbSrk, Authorization: `Bearer ${sbSrk}` } }
      );
      const sRows = sr.ok ? await sr.json() : [];
      const familyId = sRows[0]?.family_id;
      if (!familyId) { _planCache.set(userId, { data: null, at: now }); return null; }

      const fr = await fetch(
        `${sbUrl}/rest/v1/families?id=eq.${familyId}&select=parent_id&limit=1`,
        { headers: { apikey: sbSrk, Authorization: `Bearer ${sbSrk}` } }
      );
      const fRows = fr.ok ? await fr.json() : [];
      parentId = fRows[0]?.parent_id;
      if (!parentId) { _planCache.set(userId, { data: null, at: now }); return null; }
    }

    const subR = await fetch(
      `${sbUrl}/rest/v1/subscriptions?user_id=eq.${parentId}&status=eq.active&select=plan_id,plans(features)&order=started_at.desc&limit=1`,
      { headers: { apikey: sbSrk, Authorization: `Bearer ${sbSrk}` } }
    );
    const subRows  = subR.ok ? await subR.json() : [];
    const features = subRows[0]?.plans?.features;
    const allowed  = features?.allowed_chapters ?? null; // null = unlimited
    _planCache.set(userId, { data: allowed, at: now });
    return allowed;
  } catch(e) {
    console.warn('[questions] plan lookup:', e.message);
    return null;
  }
}

// ── Netlify handler ──────────────────────────
exports.handler = async (event) => {
  const headers = {
    'Content-Type':                'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control':               'public, s-maxage=86400, stale-while-revalidate=3600',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // ── Auth: require either a valid Supabase JWT or a known student UUID ──
  const authHeader = (event.headers['authorization'] || '').replace('Bearer ', '').trim();
  const studentId  = (event.headers['x-student-id']  || '').trim();

  if (!authHeader && !studentId) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  const SB_URL  = process.env.SUPABASE_URL  || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
  const SB_ANON = process.env.SUPABASE_ANON_KEY || 'sb_publishable_wERRrZnvoWhM5faN2AaYpQ_CpTNHFkL';
  const SB_SRK  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  let _uid = null; // authenticated principal id used for plan lookup
  if (authHeader) {
    _uid = _authCacheGet('jwt:' + authHeader);
    if (_uid === undefined) {
      // Verify Supabase JWT - rejects expired, forged, or random strings
      const r = await fetch(`${SB_URL}/auth/v1/user`, {
        headers: { Authorization: `Bearer ${authHeader}`, apikey: SB_ANON },
      });
      if (!r.ok) return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid token' }) };
      try { _uid = (await r.json()).id || null; } catch(_) { _uid = null; }
      _authCacheSet('jwt:' + authHeader, _uid);
    }
  } else if (studentId) {
    // Validate student UUID format first (fast, no DB call)
    const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!UUID_RE.test(studentId)) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid session' }) };
    }
    // Verify student exists in DB (requires SUPABASE_SERVICE_ROLE_KEY env var)
    if (SB_SRK && _authCacheGet('stu:' + studentId) === undefined) {
      const res  = await fetch(`${SB_URL}/rest/v1/students?id=eq.${studentId}&select=id&limit=1`, {
        headers: { apikey: SB_SRK, Authorization: `Bearer ${SB_SRK}` },
      });
      const rows = res.ok ? await res.json() : [];
      if (!Array.isArray(rows) || !rows.length) {
        return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid session' }) };
      }
      _authCacheSet('stu:' + studentId, studentId);
    }
    _uid = studentId;
  }

  if (_isRateLimited(_uid)) {
    return { statusCode: 429, headers, body: JSON.stringify({ error: 'Too many requests. Please slow down and try again shortly.' }) };
  }

  // ── Admin + plan enforcement ───────────────────────────────────────────────
  // This is the ONLY enforcement that matters. The parent dashboard greys these
  // chapters out and the practice screen refuses to open them, but both live in
  // the browser and both are one devtools edit from being switched off. Here the
  // questions simply never leave the server, so there is nothing to cheat with.
  const _gs = await _globalSettings(SB_URL, SB_ANON);

  let _allowedChapters = null; // null = no plan restriction (serve everything)
  if (_gs.plan_enforcement_enabled === true && _uid) {
    _allowedChapters = await _getAllowedChapters(_uid, !!studentId, SB_URL, SB_SRK);
  }
  const _allowedSet = _allowedChapters ? new Set(_allowedChapters) : null;

  // Chapters an admin switched off for everybody. Unlike the plan list this
  // applies whether or not plan enforcement is on — it is a kill switch, not a
  // tier.
  const _blockedSet = new Set(_gs.disabled_chapters || []);
  const _blockedSubjects = new Set(_gs.disabled_subjects || []);

  const _planFilter = (qs) => {
    let out = qs;
    if (_allowedSet) out = out.filter(q => _allowedSet.has(q.chapterId));
    if (_blockedSet.size) out = out.filter(q => !_blockedSet.has(q.chapterId));
    return out;
  };

  // The default header is `public, s-maxage=86400`, which lets Netlify's shared
  // CDN cache one response and hand it to everybody. That is fine while every
  // caller gets the identical payload — but the moment the body depends on WHO
  // asked (plan tier), a cached copy would leak one family's chapter set to
  // another, in both directions. As soon as any per-caller filtering is in play,
  // the response stops being shareable.
  if (_allowedSet) headers['Cache-Control'] = 'private, max-age=300';
  else if (_blockedSet.size || _blockedSubjects.size) headers['Cache-Control'] = 'public, s-maxage=300';

  const p          = event.queryStringParameters || {};
  const subjectId  = (p.subject    || '').replace(/[^a-z0-9-]/g, '');
  const chapterId  = (p.chapter    || '') || null;
  const difficulty = p.difficulty  ? parseInt(p.difficulty) : null;
  const batchAll   = p.all === '1';
  const batchGrade = (p.grade      || '').replace(/[^0-9]/g, '');

  // ── Past papers: ?papers=1[&grade=N] ──────────────────────────────────────
  // Real PSAC exam questions, written/drawn responses with a mark allocation
  // and NO answer — they are for reading and attempting on paper, never for
  // marking. Served separately from the practice pool for exactly that reason:
  // an item with no `answer` must never reach code that expects to grade one.
  //
  // Goes through this function rather than being a static asset so it inherits
  // the same auth the rest of the content has.
  if (p.papers === '1') {
    let all = await _dbQueryPastPapers(batchGrade || null, SB_URL, SB_SRK);
    if (!all) all = _readBundle('past-papers') || [];
    const list = (batchGrade && all.some(q => q.grade)) ? all.filter(q => String(q.grade) === batchGrade) : all;
    return { statusCode: 200, headers, body: JSON.stringify(list) };
  }

  // Batch endpoint: ?all=1&grade=N — returns all subjects for the grade in one call
  if (batchAll && batchGrade) {
    try {
      // Try DB first
      const dbBundle = await _dbQueryGrade(batchGrade, SB_URL, SB_SRK);
      if (dbBundle) {
        const out = {};
        for (const [key, qs] of Object.entries(dbBundle)) {
          if (_blockedSubjects.has(key)) continue;
          out[key] = _planFilter(qs);
        }
        return { statusCode: 200, headers, body: JSON.stringify(out) };
      }
      // Fall back to pre-built bundle, parsed once per warm container.
      // ⚠ Never mutate the cached object — it is shared by every subsequent
      // request this container serves, so deleting a blocked subject from it
      // would hide that subject for everyone until the container recycles.
      const cachedBundle = _readBundle(`grade${batchGrade}`);
      if (cachedBundle) {
        const out = {};
        for (const [key, qs] of Object.entries(cachedBundle)) {
          if (_blockedSubjects.has(key)) continue;
          out[key] = _planFilter(qs);
        }
        return { statusCode: 200, headers, body: JSON.stringify(out) };
      }
      // Last fallback: build dynamically (local dev or bundle missing)
      const subjectsDir = path.join(ROOT, 'subjects');
      const allDirs = fs.readdirSync(subjectsDir)
        .filter(d => d.startsWith(`grade${batchGrade}-`) && fs.statSync(path.join(subjectsDir, d)).isDirectory());
      const result = {};
      for (const dir of allDirs) {
        if (_blockedSubjects.has(dir)) continue;
        result[dir] = _planFilter(_loadSubject(dir));
      }
      return { statusCode: 200, headers, body: JSON.stringify(result) };
    } catch(e) {
      console.error('[questions batch]', e);
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server error' }) };
    }
  }

  if (!subjectId) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'subject param required' }) };
  }

  // Subject switched off by an admin: an empty list, not an error — the client
  // already handles "this subject has no questions loaded".
  if (_blockedSubjects.has(subjectId)) {
    return { statusCode: 200, headers, body: '[]' };
  }

  try {
    // Try DB first
    let subjectQs = await _dbQuerySubject(subjectId, SB_URL, SB_SRK);

    // Fall back to per-subject bundle. Reading grade5.json to answer a
    // request for grade5-maths would mean parsing 1.6 MB to return 100 KB.
    if (!subjectQs) subjectQs = _readBundle(subjectId);

    // Older deploys only have the whole-grade bundles; fall back to those.
    if (!subjectQs) {
      const gradeMatch = subjectId.match(/grade(\d)/);
      const bundle = gradeMatch ? _readBundle(`grade${gradeMatch[1]}`) : null;
      if (bundle && bundle[subjectId]) subjectQs = bundle[subjectId];
    }

    if (subjectQs) {
      let questions = _planFilter(subjectQs);
      if (chapterId)  questions = questions.filter(q => q.chapterId  === chapterId);
      if (difficulty) questions = questions.filter(q => q.difficulty === difficulty);
      return { statusCode: 200, headers, body: JSON.stringify(questions) };
    }
    // Last fallback: build dynamically
    let questions = _planFilter(_loadSubject(subjectId));
    if (chapterId)  questions = questions.filter(q => q.chapterId  === chapterId);
    if (difficulty) questions = questions.filter(q => q.difficulty === difficulty);
    return { statusCode: 200, headers, body: JSON.stringify(questions) };
  } catch(e) {
    console.error('[questions]', e);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server error' }) };
  }
};
