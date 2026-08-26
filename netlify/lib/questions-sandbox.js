'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Shared server-side question loading + grading.
//
//  Extracted from netlify/functions/questions.js so assignment-submit.js can
//  re-grade using EXACTLY the same question objects and the same answer-matching
//  rules as the browser. Two copies of grading logic would drift, and a drift
//  here means a child sees one score and their teacher sees another.
//
//  Lives outside netlify/functions/ so Netlify does not treat it as a function.
//  esbuild follows the require() and bundles it.
// ══════════════════════════════════════════════════════════════════════════

const vm   = require('vm');
const fs   = require('fs');
const path = require('path');

// ── Locate the repo root ──────────────────────────────────────────────────
// Do NOT hard-code a '../..' hop: the bundled function's __dirname depth is not
// guaranteed to match the source tree. Walk up from several starting points
// looking for the subjects/ directory instead.
let _rootCache = null;
function findRoot() {
  if (_rootCache) return _rootCache;
  const starts = [__dirname, process.cwd(), path.resolve(__dirname, '..', '..')];
  for (const start of starts) {
    let dir = start;
    for (let i = 0; i < 8; i++) {
      if (fs.existsSync(path.join(dir, 'subjects'))) { _rootCache = dir; return dir; }
      const up = path.dirname(dir);
      if (up === dir) break;
      dir = up;
    }
  }
  _rootCache = path.resolve(__dirname, '..', '..');   // last resort
  return _rootCache;
}

// ── Sandbox context: mirrors engine/helpers.js ────────────────────────────
function buildContext(buf) {
  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
  const rnd     = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const fmt     = n => n.toLocaleString('en-GB');

  function makeMCQ({ id, chapterId, difficulty, subsection, question, options, answer, hint, explanation }) {
    const others    = shuffle((options || []).filter(o => o !== answer));
    const finalOpts = shuffle([answer, ...others.slice(0, 3)]);
    return { id, chapterId, difficulty, subsection, type: 'mcq', question, options: finalOpts,
             answer, acceptableAnswers: [answer], hint, explanation };
  }
  function makeNum({ id, chapterId, difficulty, subsection, question, answer, acceptableAnswers, hint, explanation }) {
    return { id, chapterId, difficulty, subsection, type: 'numeric', question,
             answer: String(answer),
             acceptableAnswers: (acceptableAnswers || [String(answer)]).map(String), hint, explanation };
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
  function makeSymmetry({ id, chapterId, difficulty, subsection, question, rows, cols, axis, axisPos, given, answer, hint, explanation }) {
    const ans = answer || (given || []).map(([r, c]) => {
      if (axis === 'vertical')   return [r, (cols - 1) - c];
      if (axis === 'horizontal') return [(rows - 1) - r, c];
      return null;
    }).filter(Boolean);
    return { id, chapterId, difficulty, subsection, type: 'symmetry', question, rows, cols, axis, axisPos, given,
             answer: ans, hint: hint || '', explanation: explanation || '' };
  }

  // The REAL array with a flattening push — see the note in build-questions.js.
  // Grading has to see the same pool the browser does, and a { push }-only stub
  // silently dropped questions_audit.js (18 questions + difficulty fixes).
  const STATIC_QUESTIONS = buf;
  buf.push = function (...qs) {
    qs.flat().forEach(q => q && Array.prototype.push.call(this, q));
    return this.length;
  };

  return { rnd, shuffle, fmt, makeMCQ, makeNum, makeTF, makeMatch, makeSymmetry,
           STATIC_QUESTIONS, 'use strict': undefined };
}

// ── Load every question in a subject pack ─────────────────────────────────
const _subjectCache = new Map();   // warm lambda reuse; cleared on cold start

function loadSubject(subjectId) {
  const safeId = String(subjectId || '').replace(/[^a-z0-9-]/g, '');
  if (!safeId) return [];
  if (_subjectCache.has(safeId)) return _subjectCache.get(safeId);

  const dir = path.join(findRoot(), 'subjects', safeId, 'questions');
  if (!fs.existsSync(dir)) return [];

  const buf = [];
  const ctx = vm.createContext(buildContext(buf));
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort()) {
    try {
      const code = fs.readFileSync(path.join(dir, file), 'utf8');
      new vm.Script(code, { filename: file }).runInContext(ctx);
    } catch (e) {
      console.warn(`[questions-sandbox] ${safeId}/${file}: ${e.message}`);
    }
  }
  _subjectCache.set(safeId, buf);
  return buf;
}

// Fetch a specific, ordered set of question ids from a pack.
function loadQuestionSet(subjectId, questionIds) {
  const all = loadSubject(subjectId);
  const byId = new Map(all.map(q => [q.id, q]));
  return (questionIds || []).map(id => byId.get(id)).filter(Boolean);
}

// ── Grading: must match engine/app.js exactly ─────────────────────────────
function normalise(v) {
  return String(v == null ? '' : v).toLowerCase()
    .replace(/\s+/g, '').replace(/,/g, '')
    .replace(/rs\.?/g, '').replace(/cm2/g, 'cm²').replace(/m2/g, 'm²')
    .replace(/kg/g, 'kg').replace(/min/g, 'min').replace(/\bpm\b/g, 'pm');
}

function checkAnswer(q, userAnswer) {
  if (!q) return false;
  if (q.type === 'symmetry') {
    try {
      const selected = JSON.parse(userAnswer || '[]');
      const ans = q.answer || [];
      if (selected.length !== ans.length) return false;
      const sel = new Set(selected.map(([r, c]) => `${r},${c}`));
      return ans.every(([r, c]) => sel.has(`${r},${c}`));
    } catch { return false; }
  }
  if (userAnswer == null || userAnswer === '') return false;
  const ua = normalise(userAnswer);
  return [q.answer, ...(q.acceptableAnswers || [])].some(a => normalise(a) === ua);
}

// answers: [{ id, answer }] from the client. Returns the AUTHORITATIVE result.
function grade(questions, answers) {
  const given = new Map((answers || []).map(a => [a && a.id, a && a.answer]));
  let score = 0;
  const detail = questions.map(q => {
    const ua = given.has(q.id) ? given.get(q.id) : null;
    const ok = checkAnswer(q, ua);
    if (ok) score++;
    return { id: q.id, chapterId: q.chapterId, userAnswer: ua == null ? '' : String(ua),
             correctAnswer: String(q.answer), correct: ok };
  });
  const total = questions.length;
  return { score, total, pct: total ? Math.round(score / total * 100) : 0, detail };
}

module.exports = { findRoot, loadSubject, loadQuestionSet, normalise, checkAnswer, grade };
