'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const SymmetryLine = require('../engine/symmetry_line.js');
const sandbox = require('../netlify/lib/questions-sandbox.js');
const { TYPE_RULES } = require('../netlify/lib/question-import.js');

const one = {
  type:'symmetry-line', answer:[[160,30,160,210]],
  angleTolerance:9, positionTolerance:11, minLengthRatio:.55,
};
assert(SymmetryLine.checkAnswer(one, JSON.stringify([[160,35,160,205]])), 'exact vertical line');
assert(SymmetryLine.checkAnswer(one, JSON.stringify([[162,205,158,35]])), 'reverse, slightly imperfect line');
assert(!SymmetryLine.checkAnswer(one, JSON.stringify([[125,35,125,205]])), 'parallel line in wrong position');
assert(!SymmetryLine.checkAnswer(one, JSON.stringify([[80,120,240,120]])), 'wrong angle');
assert(!SymmetryLine.checkAnswer(one, JSON.stringify([[160,90,160,135]])), 'too-short mark');
assert(!SymmetryLine.checkAnswer(one, '[]'), 'no line');
assert(!SymmetryLine.checkAnswer(one, JSON.stringify([[160,30,160,210],[40,40,250,40]])), 'extra line');

const two = { ...one, answer:[[160,30,160,210],[55,120,265,120]] };
assert(SymmetryLine.checkAnswer(two, JSON.stringify([[55,121,265,119],[161,205,159,35]])),
  'multiple lines match in either order');
assert(!SymmetryLine.checkAnswer(two, JSON.stringify([[55,121,265,119]])), 'missing one of several lines');
assert.equal(SymmetryLine.gradeDetailed(two, JSON.stringify([[55,121,265,119],[40,40,250,40]])).pairs.length, 1,
  'partly-correct feedback preserves the correctly drawn line');

const g5 = sandbox.loadSubject('grade5-maths').filter(q => q.type === 'symmetry-line');
const g6 = sandbox.loadSubject('grade6-maths').filter(q => q.type === 'symmetry-line');
assert.equal(g5.length, 12, 'Grade 5 has 12 new drawing questions');
assert.equal(g6.length, 12, 'Grade 6 has 12 new drawing questions');
for (const q of [...g5, ...g6]) {
  assert.equal(TYPE_RULES['symmetry-line'].check(q), null, q.id + ' passes importer validation');
  assert(SymmetryLine.checkAnswer(q, JSON.stringify(q.answer)), q.id + ' accepts its model lines');
  assert(sandbox.checkAnswer(q, JSON.stringify(q.answer)), q.id + ' agrees with the server grader');
  assert(q.imageAlt && q.explanation && q.hint, q.id + ' has accessible/supporting content');
}

const root = path.resolve(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'engine/app.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
assert(app.includes("q.type === 'symmetry-line'"), 'browser routes the new type');
assert(app.includes('_symLineStaticSvg(q, false'), 'printable pupil paper includes the blank shape');
assert(app.includes('_symLineStaticSvg(q, true'), 'answer key overlays model lines');
assert(html.includes('engine/symmetry_line.js'), 'shared grader loads before app');
assert(css.includes('.symline-svg') && css.includes('touch-action:none'), 'touch drawing styles exist');
assert(sw.includes("'/engine/symmetry_line.js'"), 'shared grader is available offline');

console.log('Symmetry-line checks passed: tolerant shared grading, 24 questions, UI/print/offline wiring.');
