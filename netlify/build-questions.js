#!/usr/bin/env node
'use strict';
const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const ROOT    = path.resolve(__dirname, '..');
const OUT_DIR = path.join(__dirname, 'question-bundles');
fs.mkdirSync(OUT_DIR, { recursive: true });

function _buildContext(buf) {
  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

  function makeMCQ({ id, chapterId, difficulty, subsection, question, options, answer, hint, explanation }) {
    const others    = shuffle((options || []).filter(o => o !== answer));
    const finalOpts = shuffle([answer, ...others.slice(0, 3)]);
    return { id, chapterId, difficulty, subsection, type: 'mcq', question, options: finalOpts, answer,
             acceptableAnswers: [answer], hint, explanation };
  }

  function makeNum({ id, chapterId, difficulty, subsection, question, answer, acceptableAnswers, hint, explanation }) {
    return { id, chapterId, difficulty, subsection, type: 'numeric', question,
             answer: String(answer),
             acceptableAnswers: (acceptableAnswers || [String(answer)]).map(String),
             hint, explanation };
  }

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

  // The REAL array, with a flattening push — not a { push } stub.
  // grade5-maths/questions_audit.js iterates STATIC_QUESTIONS to demote
  // misclassified L4 questions and then adds 18 genuine L4 word problems. With
  // a push-only stub that file threw on `.forEach` and was skipped, so the
  // shipped bundle was missing those 18 questions AND every difficulty
  // correction — 1,005 questions instead of 1,023. Any file that READS the pool
  // it is adding to needs the real thing.
  const STATIC_QUESTIONS = buf;
  buf.push = function (...qs) {
    qs.flat().forEach(q => q && Array.prototype.push.call(this, q));
    return this.length;
  };

  return { shuffle, makeMCQ, makeNum, makeTF, makeMatch, makeSymmetry, STATIC_QUESTIONS,
           console, 'use strict': undefined };
}

// Past-paper items live in the SAME files as the practice questions but push to
// window.PSAC_PDF_QUESTIONS instead of STATIC_QUESTIONS. Without a `window` the
// whole file threw and was skipped — losing the practice questions in it too,
// not just the past-paper ones.
//
// They are kept in a separate bundle on purpose: they have no `answer` (they
// are written/drawn responses worth marks), so they must never reach a practice
// pool that expects to be able to mark them.
function _withPdfCapture(ctx, pdfBuf) {
  ctx.window = { PSAC_PDF_QUESTIONS: pdfBuf };
  return ctx;
}

const PAPERS = [];

// Grades are DISCOVERED from the subjects/ directory, not listed here. A new
// pack used to mean editing this file and import-questions.js as well as
// index.html — three places that had to agree and no way to tell when they did
// not. `grade(\d+)-` also keeps working past grade 9, unlike the single-digit
// \d used elsewhere in this codebase.
const GRADES = [...new Set(
  fs.readdirSync(path.join(ROOT, 'subjects'))
    .map(d => (d.match(/^grade(\d+)-/) || [])[1])
    .filter(Boolean)
    .map(Number)
)].sort((a, b) => a - b);

for (const grade of GRADES) {
  const subjectsDir = path.join(ROOT, 'subjects');
  const subjects = fs.readdirSync(subjectsDir)
    .filter(d => d.startsWith(`grade${grade}-`) && fs.statSync(path.join(subjectsDir, d)).isDirectory());

  const bundle = {};
  let totalQ = 0;

  for (const subjectId of subjects) {
    const qDir = path.join(ROOT, 'subjects', subjectId, 'questions');
    if (!fs.existsSync(qDir)) continue;

    const buf = [];
    const pdfBuf = [];
    const ctx = vm.createContext(_withPdfCapture(_buildContext(buf), pdfBuf));

    const files = fs.readdirSync(qDir).filter(f => f.endsWith('.js')).sort();
    for (const file of files) {
      try {
        const code = fs.readFileSync(path.join(qDir, file), 'utf8');
        new vm.Script(code, { filename: file }).runInContext(ctx);
      } catch(e) {
        console.warn(`  skip ${subjectId}/${file}: ${e.message}`);
      }
    }
    bundle[subjectId] = buf;
    totalQ += buf.length;
    for (const q of pdfBuf) PAPERS.push({ ...q, subjectId });
  }

  // Per-subject files as well as the whole-grade one. Almost every request asks
  // for a single subject, and reading grade5.json to answer it meant parsing
  // 1.6 MB to return 100 KB — on every invocation, because a function container
  // starts cold and the parse is not free even when it is warm.
  for (const [subjectId, qs] of Object.entries(bundle)) {
    fs.writeFileSync(path.join(OUT_DIR, `${subjectId}.json`), JSON.stringify(qs));
  }

  const outFile = path.join(OUT_DIR, `grade${grade}.json`);
  fs.writeFileSync(outFile, JSON.stringify(bundle));
  console.log(`grade${grade}.json — ${subjects.length} subjects, ${totalQ} questions`
    + ` (+ ${subjects.length} per-subject files)`);
}

// ── Past papers ──────────────────────────────────────────────────────────────
// One file for all grades: 162 items total, so splitting it would cost more
// requests than it saves bytes. Sorted newest year first, which is the order the
// browser shows them in.
PAPERS.sort((a, b) => (b.year - a.year) || String(a.id).localeCompare(String(b.id)));
fs.writeFileSync(path.join(OUT_DIR, 'past-papers.json'), JSON.stringify(PAPERS));
const _years = [...new Set(PAPERS.map(q => q.year))].sort();
console.log(`past-papers.json — ${PAPERS.length} questions, ${_years.length} years (${_years[0]}–${_years[_years.length - 1]})`);
