'use strict';
// ══════════════════════════════════════════════
//  MathMaster Engine — Shared Helpers & Question Factories
//  These globals are used by all subject question files.
// ══════════════════════════════════════════════

const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
const fmt = n => n.toLocaleString('en-GB');

function makeMCQ({ id, chapterId, difficulty, subsection, question, options, answer, hint, explanation }) {
  const shuffled = shuffle(options.filter(o => o !== answer));
  const finalOpts = shuffle([answer, ...shuffled.slice(0, 3)]);
  return { id, chapterId, difficulty, subsection, type: 'mcq', question, options: finalOpts, answer, acceptableAnswers: [answer], hint, explanation };
}
function makeNum({ id, chapterId, difficulty, subsection, question, answer, acceptableAnswers, hint, explanation }) {
  return { id, chapterId, difficulty, subsection, type: 'numeric', question, answer: String(answer), acceptableAnswers: (acceptableAnswers || [String(answer)]).map(String), hint, explanation };
}
function makeTF({ id, chapterId, difficulty, subsection, question, answer, hint, explanation }) {
  return makeMCQ({ id, chapterId, difficulty, subsection, question,
    options: ['True', 'False'], answer: answer ? 'True' : 'False', hint, explanation });
}
function makeMatch({ id, chapterId, difficulty, subsection, leftItem, otherItems, correctRight, allRights, hint, explanation }) {
  // Converts one matching pair into an MCQ: "What does X match to?"
  const wrongOpts = shuffle(allRights.filter(r => r !== correctRight)).slice(0, 3);
  return makeMCQ({ id, chapterId, difficulty, subsection,
    question: `What does <b>${leftItem}</b> match to?`,
    options: [correctRight, ...wrongOpts], answer: correctRight, hint, explanation });
}
function makeSymmetry({ id, chapterId, difficulty, question, rows, cols, axis, axisPos, given, answer, hint, explanation }) {
  const ans = answer || given.map(([r, c]) => {
    if (axis === 'vertical')   return [r, (cols - 1) - c];
    if (axis === 'horizontal') return [(rows - 1) - r, c];
    return null;
  }).filter(Boolean);
  return { id, chapterId, difficulty, type: 'symmetry', question, rows, cols, axis, axisPos, given, answer: ans, hint: hint || 'Click the empty cells to mirror the pattern across the coloured line.', explanation: explanation || 'Each cell mirrors its pair across the axis of symmetry.' };
}
