'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');
const bank = JSON.parse(fs.readFileSync('netlify/question-bundles/grade5-english.json', 'utf8'));
const added = bank.filter(q => q.id.startsWith('g5eng-core-'));
const norm = s => String(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
const prompts = new Map();
for (const q of bank) prompts.set(norm(q.question), (prompts.get(norm(q.question)) || 0) + 1);
assert.equal(added.length, 38);
assert.equal(new Set(added.map(q => q.id)).size, 38);
for (const q of added) {
  assert(q.hint && q.explanation, `Missing guidance ${q.id}`);
  assert.equal(q.options.length, 4, q.id);
  assert.equal(new Set(q.options.map(norm)).size, 4, `Duplicate options ${q.id}`);
  assert.equal(q.options.filter(o => o === q.answer).length, 1, `Invalid answer ${q.id}`);
  assert.equal(prompts.get(norm(q.question)), 1, `Duplicate prompt ${q.id}`);
}
for (const [chapter, section, n] of [['eng-nouns','common_proper',8],['eng-verbs','voice',15],['eng-verbs','agreement',15]]) {
  assert.equal(added.filter(q => q.chapterId === chapter && q.subsection === section).length, n);
  const total = bank.filter(q => q.chapterId === chapter && q.subsection === section).length;
  assert(total >= 20, `${section}: ${total}`);
  console.log(`Grade 5 English ${section}: ${total} questions`);
}
console.log('38 Grade 5 core-grammar additions passed coverage and structural checks.');
