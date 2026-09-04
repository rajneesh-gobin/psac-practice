'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { loadSubject } = require('../netlify/lib/questions-sandbox');
for (const [name, bank] of [
  ['local scripts', loadSubject('grade5-history')],
  ['generated bundle', JSON.parse(fs.readFileSync('netlify/question-bundles/grade5-history.json', 'utf8'))]
]) {
  const matches = bank.filter(q => q.id === 'g5h-enr-wld-056');
  assert.equal(matches.length, 1, name);
  const q = matches[0];
  assert.equal(q.question, 'Which is the largest ocean in the world?');
  assert.equal(q.answer, 'Pacific Ocean');
  assert.deepEqual([...q.options].sort(), ['Atlantic Ocean','Indian Ocean','Pacific Ocean','Arctic Ocean'].sort());
  assert.deepEqual([...q.acceptableAnswers], ['Pacific Ocean']);
  assert(q.explanation.includes('Pacific Ocean is the largest'));
  console.log(`${name}: ocean names, Pacific answer and acceptableAnswers verified.`);
}
