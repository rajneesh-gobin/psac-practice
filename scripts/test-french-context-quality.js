'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const { loadSubject } = require('../netlify/lib/questions-sandbox');
let checked = 0;
for (const grade of [4,5,6]) {
  const bank = loadSubject(`grade${grade}-french`);
  // ⚠ A FLOOR, not an equality. The guard exists to catch questions being
  //   silently REMOVED, but an equality check also fails on every legitimate
  //   addition, which trains people to edit the number without reading it.
  //   Raise a floor when a pack genuinely grows; never lower one to make this
  //   pass. Grade 5 went 2060 -> 2155 on 2026-09-06 when the four starved
  //   chapters were filled to support their new examWeight.
  const floor = { 4: 2021, 5: 2155, 6: 2102 }[grade];
  assert(bank.length >= floor,
    `grade${grade}-french has ${bank.length} questions, fewer than the ${floor} recorded here — `
    + 'this repair must not silently remove existing questions');
  checked += bank.length;
  for (const q of bank.filter(q => q.type === 'mcq')) {
    assert(q.options.includes(q.answer), q.id);
    assert.equal(new Set(q.options).size, q.options.length, q.id);
  }
  // Check input pools, before de-duplication by the runtime.
  const ctx = { STATIC_QUESTIONS: [], window: {}, console };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'engine/helpers.js'), 'utf8'), ctx);
  const factory = ctx.makeMCQ;
  ctx.makeMCQ = q => {
    const wrong = (q.options || []).filter(option => option !== q.answer);
    assert.equal(new Set(wrong).size, wrong.length, `${q.id}: repeated source distractor`);
    return factory(q);
  };
  const dir = path.join(root, `subjects/grade${grade}-french/questions`);
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort())
    vm.runInContext(fs.readFileSync(path.join(dir, file), 'utf8'), ctx, { filename: file });
}
const generated = loadSubject('grade4-french').filter(q => q.id.startsWith('g4fr-plus-'));
for (const word of ['oiseau','animal','enfant']) {
  const q = generated.find(q => q.subsection === 'genre' && q.question.includes(`un ${word}`));
  assert(q, word);
  assert.equal(q.answer, 'masculin', word);
}
const imperfect = generated.filter(q => q.chapterId === 'g4fr-imparfait' && q.question.includes('(manger,'));
assert.equal(imperfect.length, 6);
assert.equal(imperfect.find(q => q.question.includes('nous')).answer, 'mangions');
assert.equal(imperfect.find(q => q.question.includes('vous')).answer, 'mangiez');
assert(imperfect.every(q => !q.options.some(o => /mangei/.test(o))));
const positions = generated.filter(q => q.subsection === 'prepositions');
assert.equal(positions.length, 48);
assert(positions.every(q => q.question.includes('qui signifie')));
const images = generated.filter(q => q.chapterId === 'g4fr-images');
assert.equal(images.length, 80);
assert(images.every(q => !q.question.includes('deux enfants est')));
const colours = images.filter(q => q.question.includes('Quelle couleur'));
assert.equal(colours.length, 20);
assert(colours.every(q => q.question.includes(q.answer)));
const connectors = loadSubject('grade6-french').filter(q => q.id.startsWith('g6fr-plus-') && q.chapterId === 'g6fr-subordonnees');
assert.equal(connectors.length, 150);
assert.equal(new Set(connectors.map(q => q.question)).size, 150);
for (let number = 1321; number <= 1470; number++) {
  assert(connectors.some(q => q.id === `g6fr-plus-${String(number).padStart(4, '0')}`), `Preserve existing ID ${number}`);
}
console.log(`French source and context checks passed: ${checked} questions; no live database access.`);
