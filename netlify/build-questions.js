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

  const STATIC_QUESTIONS = {
    push(...qs) { qs.flat().forEach(q => q && buf.push(q)); }
  };

  return { shuffle, makeMCQ, makeNum, makeTF, makeMatch, makeSymmetry, STATIC_QUESTIONS,
           console, 'use strict': undefined };
}

for (const grade of [4, 5, 6]) {
  const subjectsDir = path.join(ROOT, 'subjects');
  const subjects = fs.readdirSync(subjectsDir)
    .filter(d => d.startsWith(`grade${grade}-`) && fs.statSync(path.join(subjectsDir, d)).isDirectory());

  const bundle = {};
  let totalQ = 0;

  for (const subjectId of subjects) {
    const qDir = path.join(ROOT, 'subjects', subjectId, 'questions');
    if (!fs.existsSync(qDir)) continue;

    const buf = [];
    const ctx = vm.createContext(_buildContext(buf));

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
  }

  const outFile = path.join(OUT_DIR, `grade${grade}.json`);
  fs.writeFileSync(outFile, JSON.stringify(bundle));
  console.log(`grade${grade}.json — ${subjects.length} subjects, ${totalQ} questions`);
}
