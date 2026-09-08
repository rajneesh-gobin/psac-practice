'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');
const bank = JSON.parse(fs.readFileSync('netlify/question-bundles/grade6-english.json', 'utf8'));
const added = bank.filter(q => q.id.startsWith('g6eng-ah-'));
const norm = s => s.replace(/\s+/g, ' ').trim().toLowerCase();
const prompts = new Map();
for (const q of bank) prompts.set(norm(q.question), (prompts.get(norm(q.question)) || 0) + 1);
assert.equal(added.length, 36);
assert.equal(new Set(added.map(q => q.id)).size, 36);
for (const q of added) {
  assert(q.hint && q.explanation, `Missing guidance ${q.id}`);
  assert.equal(q.options.length, 4, q.id);
  assert.equal(new Set(q.options).size, 4, `Duplicate options ${q.id}`);
  assert.equal(q.options.filter(o => o === q.answer).length, 1, `Invalid answer ${q.id}`);
  assert.equal(prompts.get(norm(q.question)), 1, `Duplicate prompt ${q.id}`);
}
for (const [section, countAdded] of [['antonyms',19], ['homophones',17]]) {
  assert.equal(added.filter(q => q.subsection === section).length, countAdded);
  const count = bank.filter(q => q.chapterId === 'g6eng-vocabulary' && q.subsection === section).length;
  assert(count >= 20, `${section}: ${count}`);
  console.log(`Grade 6 English ${section}: ${count} questions`);
}
console.log('36 antonym/homophone additions passed coverage and structural checks.');
