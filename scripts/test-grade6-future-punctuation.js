'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');
const bank = JSON.parse(fs.readFileSync('netlify/question-bundles/grade6-english.json', 'utf8'));
const added = bank.filter(q => q.id.startsWith('g6eng-futpun-'));
const normalise = s => s.replace(/\s+/g, ' ').trim().toLowerCase();
const prompts = new Map();
for (const q of bank) prompts.set(normalise(q.question), (prompts.get(normalise(q.question)) || 0) + 1);
assert.equal(added.length, 38);
assert.equal(new Set(added.map(q => q.id)).size, 38);
for (const q of added) {
  assert(q.hint && q.explanation, `Missing guidance ${q.id}`);
  assert.equal(q.options.length, 4, q.id);
  assert.equal(new Set(q.options).size, 4, `Duplicate options ${q.id}`);
  assert.equal(q.options.filter(o => o === q.answer).length, 1, `Invalid answer ${q.id}`);
  assert.equal(prompts.get(normalise(q.question)), 1, `Duplicate prompt ${q.id}`);
}
for (const [chapterId, subsection] of [['g6eng-verbs','future_tense'], ['g6eng-clauses','punctuation']]) {
  const count = bank.filter(q => q.chapterId === chapterId && q.subsection === subsection).length;
  assert(count >= 20, `${subsection}: ${count}`);
  console.log(`Grade 6 English ${subsection}: ${count} questions`);
}
console.log('38 future-tense and punctuation additions passed structural and coverage checks.');
