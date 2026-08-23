// Netlify Function — Question Server
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

  // STATIC_QUESTIONS.push(...) — collect into buf
  const STATIC_QUESTIONS = {
    push(...qs) { qs.flat().forEach(q => q && buf.push(q)); }
  };

  return { rnd, shuffle, fmt, makeMCQ, makeNum, makeSymmetry, STATIC_QUESTIONS,
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

// ── Netlify handler ──────────────────────────
exports.handler = async (event) => {
  const headers = {
    'Content-Type':                'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control':               'private, max-age=86400',
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

  if (authHeader) {
    // Verify Supabase JWT — rejects expired, forged, or random strings
    const r = await fetch(`${SB_URL}/auth/v1/user`, {
      headers: { Authorization: `Bearer ${authHeader}`, apikey: SB_ANON },
    });
    if (!r.ok) return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid token' }) };
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
  }

  const p          = event.queryStringParameters || {};
  const subjectId  = (p.subject    || '').replace(/[^a-z0-9-]/g, '');
  const chapterId  = (p.chapter    || '') || null;
  const difficulty = p.difficulty  ? parseInt(p.difficulty) : null;

  if (!subjectId) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'subject param required' }) };
  }

  try {
    let questions = _loadSubject(subjectId);

    if (chapterId)  questions = questions.filter(q => q.chapterId  === chapterId);
    if (difficulty) questions = questions.filter(q => q.difficulty === difficulty);

    return { statusCode: 200, headers, body: JSON.stringify(questions) };
  } catch(e) {
    console.error('[questions]', e);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server error' }) };
  }
};
