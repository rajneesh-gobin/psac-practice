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

  function makeSymmetry({ id, chapterId, difficulty, question, rows, cols, axis, axisPos, given, answer, hint, explanation }) {
    const ans = answer || (given || []).map(([r, c]) => {
      if (axis === 'vertical')   return [r, (cols - 1) - c];
      if (axis === 'horizontal') return [(rows - 1) - r, c];
      return null;
    }).filter(Boolean);
    return { id, chapterId, difficulty, type: 'symmetry', question, rows, cols, axis, axisPos, given, answer: ans,
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

  // STATIC_QUESTIONS.push(...) - collect into buf
  const STATIC_QUESTIONS = {
    push(...qs) { qs.flat().forEach(q => q && buf.push(q)); }
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

async function _isEnforcementOn(sbUrl, sbAnon) {
  const now = Date.now();
  if (_settingsCache.data !== null && (now - _settingsCache.at) < _PLAN_TTL) return _settingsCache.data;
  try {
    const r = await fetch(
      `${sbUrl}/rest/v1/mm_data?key=eq.global_settings&select=value&limit=1`,
      { headers: { apikey: sbAnon, Authorization: `Bearer ${sbAnon}` } }
    );
    const rows = r.ok ? await r.json() : [];
    const val  = rows[0]?.value?.plan_enforcement_enabled === true;
    _settingsCache.data = val;
    _settingsCache.at   = now;
    return val;
  } catch(_) { return false; }
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
    // Verify Supabase JWT - rejects expired, forged, or random strings
    const r = await fetch(`${SB_URL}/auth/v1/user`, {
      headers: { Authorization: `Bearer ${authHeader}`, apikey: SB_ANON },
    });
    if (!r.ok) return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid token' }) };
    try { _uid = (await r.json()).id || null; } catch(_) {}
  } else if (studentId) {
    // Validate student UUID format first (fast, no DB call)
    const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!UUID_RE.test(studentId)) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid session' }) };
    }
    // Verify student exists in DB (requires SUPABASE_SERVICE_ROLE_KEY env var)
    if (SB_SRK) {
      const res  = await fetch(`${SB_URL}/rest/v1/students?id=eq.${studentId}&select=id&limit=1`, {
        headers: { apikey: SB_SRK, Authorization: `Bearer ${SB_SRK}` },
      });
      const rows = res.ok ? await res.json() : [];
      if (!Array.isArray(rows) || !rows.length) {
        return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid session' }) };
      }
    }
    _uid = studentId;
  }

  // ── Plan enforcement ───────────────────────────────────────────────────────
  let _allowedChapters = null; // null = no restriction (serve everything)
  const _enforcing = await _isEnforcementOn(SB_URL, SB_ANON);
  if (_enforcing && _uid) {
    _allowedChapters = await _getAllowedChapters(_uid, !!studentId, SB_URL, SB_SRK);
  }
  const _allowedSet = _allowedChapters ? new Set(_allowedChapters) : null;
  const _planFilter = (qs) => _allowedSet ? qs.filter(q => _allowedSet.has(q.chapterId)) : qs;

  const p          = event.queryStringParameters || {};
  const subjectId  = (p.subject    || '').replace(/[^a-z0-9-]/g, '');
  const chapterId  = (p.chapter    || '') || null;
  const difficulty = p.difficulty  ? parseInt(p.difficulty) : null;
  const batchAll   = p.all === '1';
  const batchGrade = (p.grade      || '').replace(/[^0-9]/g, '');

  // Batch endpoint: ?all=1&grade=N — returns all subjects for the grade in one call
  if (batchAll && batchGrade) {
    try {
      // Fast path: use pre-built bundle from build step
      const bundlePath = path.join(__dirname, '..', 'question-bundles', `grade${batchGrade}.json`);
      if (fs.existsSync(bundlePath)) {
        const bundleData = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));
        if (_allowedSet) {
          for (const key of Object.keys(bundleData)) {
            bundleData[key] = bundleData[key].filter(q => _allowedSet.has(q.chapterId));
          }
        }
        return { statusCode: 200, headers, body: JSON.stringify(bundleData) };
      }
      // Fallback: build dynamically (local dev or bundle missing)
      const subjectsDir = path.join(ROOT, 'subjects');
      const allDirs = fs.readdirSync(subjectsDir)
        .filter(d => d.startsWith(`grade${batchGrade}-`) && fs.statSync(path.join(subjectsDir, d)).isDirectory());
      const result = {};
      for (const dir of allDirs) {
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

  try {
    // Fast path: use pre-built bundle from build step
    const gradeMatch = subjectId.match(/grade(\d)/);
    if (gradeMatch) {
      const bundlePath = path.join(__dirname, '..', 'question-bundles', `grade${gradeMatch[1]}.json`);
      if (fs.existsSync(bundlePath)) {
        const bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));
        if (bundle[subjectId]) {
          let questions = _planFilter(bundle[subjectId]);
          if (chapterId)  questions = questions.filter(q => q.chapterId  === chapterId);
          if (difficulty) questions = questions.filter(q => q.difficulty === difficulty);
          return { statusCode: 200, headers, body: JSON.stringify(questions) };
        }
      }
    }
    // Fallback: build dynamically
    let questions = _planFilter(_loadSubject(subjectId));

    if (chapterId)  questions = questions.filter(q => q.chapterId  === chapterId);
    if (difficulty) questions = questions.filter(q => q.difficulty === difficulty);

    return { statusCode: 200, headers, body: JSON.stringify(questions) };
  } catch(e) {
    console.error('[questions]', e);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server error' }) };
  }
};
