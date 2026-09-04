'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice Engine - Shared Helpers & Question Factories
//  These globals are used by all subject question files.
// ══════════════════════════════════════════════

const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
// Fisher–Yates is an unbiased shuffle. `sort(() => Math.random() - 0.5)` is
// not: browser sort implementations repeatedly favour some early elements,
// which made the same question disproportionately likely to lead an exam or
// printable paper.
const shuffle = arr => {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};
const fmt = n => n.toLocaleString('en-GB');

// Accuracy % for one chapter's { attempted, correct } record.
// Used by subject badge conditions, so it lives here rather than in any pack.
// Null-safe: `pct(chapters.fractions)` is fine even if that chapter is untouched.
function pct(c) { return (c && c.attempted) ? Math.round(c.correct / c.attempted * 100) : 0; }

// ── WHICH GRADES ARE FREE ────────────────────────────────────────────────
// Grades 1-2 are free for every family, permanently. Grades 3-9 are the paid
// tiers. This is a PRICING rule, so it deliberately sits above plans, expiry
// and the credit shop: a free grade is open on a lapsed account, on the Free
// plan, and with a zero credit balance.
//
// It is NOT above moderation. An admin kill switch (disabled_chapters /
// disabled_subjects) and an account block still apply to grades 1-2, because
// those are safety decisions rather than commercial ones.
//
// ⚠ DUPLICATED in netlify/functions/questions.js — Lambda vs browser, no shared
// module, the same standing duplication as the Mauritius day-key helpers. If
// this list changes, BOTH copies must change together, or the padlocks the UI
// draws and the questions the server actually releases will disagree.
const FREE_GRADES = Object.freeze([1, 2]);

function gradeOfSubjectId(subjectId) {
  const m = /^grade(\d+)-/.exec(String(subjectId || ''));
  return m ? Number(m[1]) : null;
}
function isFreeGrade(grade) {
  const n = Number(grade);
  return Number.isFinite(n) && FREE_GRADES.includes(n);
}
function isFreeSubjectId(subjectId) { return isFreeGrade(gradeOfSubjectId(subjectId)); }

// chapterId → is it in a free grade? Resolved through the loaded packs rather
// than the id, because chapter ids carry no grade (g5m-…, eng-passages, …) and
// several are not prefixed at all.
//
// `typeof SUBJECT_PACKS` is safe even though registry.js loads AFTER this file:
// a classic script's lexical bindings are only created when that script runs,
// so before then the name is *undeclared* (typeof → 'undefined'), not in TDZ.
// Nothing here executes at load time anyway.
function isFreeChapter(chapterId) {
  if (!chapterId || typeof SUBJECT_PACKS === 'undefined') return false;
  for (const p of SUBJECT_PACKS) {
    if (!isFreeGrade(p.grade)) continue;
    const chs = p._chapters || p.chapters || [];
    for (const c of chs) if (c && c.id === chapterId) return true;
  }
  return false;
}

function makeMCQ({ id, chapterId, difficulty, subsection, question, options, answer, hint, explanation, learnMore }) {
  const shuffled = shuffle([...new Set(options.filter(o => o !== answer))]);
  const finalOpts = shuffle([answer, ...shuffled.slice(0, 3)]);
  return { id, chapterId, difficulty, subsection, type: 'mcq', question, options: finalOpts, answer, acceptableAnswers: [answer], hint, explanation, learnMore };
}
function makeNum({ id, chapterId, difficulty, subsection, question, answer, acceptableAnswers, hint, explanation, learnMore }) {
  return { id, chapterId, difficulty, subsection, type: 'numeric', question, answer: String(answer), acceptableAnswers: (acceptableAnswers || [String(answer)]).map(String), hint, explanation, learnMore };
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
function makeMatch({ id, chapterId, difficulty, subsection, leftItem, otherItems, correctRight, allRights, hint, explanation }) {
  // Converts one matching pair into an MCQ: "What does X match to?"
  const wrongOpts = shuffle(allRights.filter(r => r !== correctRight)).slice(0, 3);
  return makeMCQ({ id, chapterId, difficulty, subsection,
    question: `What does <b>${leftItem}</b> match to?`,
    options: [correctRight, ...wrongOpts], answer: correctRight, hint, explanation });
}
// `subsection` is destructured and returned like every other factory here. It
// was the only one that dropped it, so a symmetry question could carry
// subsection:'symmetry' in its source and still arrive with it undefined — the
// six SYM questions were invisible to the Syllabus screen's per-topic counts.
function makeSymmetry({ id, chapterId, difficulty, subsection, question, rows, cols, axis, axisPos, given, answer, hint, explanation }) {
  const ans = answer || given.map(([r, c]) => {
    if (axis === 'vertical')   return [r, (cols - 1) - c];
    if (axis === 'horizontal') return [(rows - 1) - r, c];
    return null;
  }).filter(Boolean);
  return { id, chapterId, difficulty, subsection, type: 'symmetry', question, rows, cols, axis, axisPos, given, answer: ans, hint: hint || 'Click the empty cells to mirror the pattern across the coloured line.', explanation: explanation || 'Each cell mirrors its pair across the axis of symmetry.' };
}
