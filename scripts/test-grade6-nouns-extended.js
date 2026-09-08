'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');
const bank = JSON.parse(fs.readFileSync('netlify/question-bundles/grade6-english.json', 'utf8'));
const added = bank.filter(q => q.id.startsWith('g6eng-nx-'));
const expected = { collective: 17, pronouns: 15, determiners: 17, common_proper: 12, cloze: 5 };
const norm = s => s.replace(/\s+/g, ' ').trim().toLowerCase();
const allPrompts = new Map();
for (const q of bank) allPrompts.set(norm(q.question), (allPrompts.get(norm(q.question)) || 0) + 1);
assert.equal(added.length, 66);
assert.equal(new Set(added.map(q => q.id)).size, 66);
for (const q of added) {
  assert.equal(q.chapterId, 'g6eng-nouns', q.id);
  assert(q.hint && q.explanation, `Missing guidance ${q.id}`);
  assert.equal(q.options.length, 4, q.id);
  assert.equal(new Set(q.options).size, 4, `Duplicate options ${q.id}`);
  assert.equal(q.options.filter(o => o === q.answer).length, 1, `Invalid answer ${q.id}`);
  assert.equal(allPrompts.get(norm(q.question)), 1, `Duplicate prompt ${q.id}`);
}
for (const [section, countAdded] of Object.entries(expected)) {
  assert.equal(added.filter(q => q.subsection === section).length, countAdded, section);
  const count = bank.filter(q => q.chapterId === 'g6eng-nouns' && q.subsection === section).length;
  assert(count >= 20, `${section} remains below 20 (${count})`);
  console.log(`Grade 6 English ${section}: ${count} questions`);
}
console.log('66 noun/pronoun/determiner additions passed coverage and structural checks.');
