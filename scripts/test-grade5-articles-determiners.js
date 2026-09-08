'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');

const bank = JSON.parse(fs.readFileSync('netlify/question-bundles/grade5-english.json', 'utf8'));
const added = bank.filter(q => q.id.startsWith('g5eng-artdet-'));
const normalise = value => value.replace(/\s+/g, ' ').trim().toLowerCase();
const promptCounts = new Map();
for (const q of bank) {
  const prompt = normalise(q.question);
  promptCounts.set(prompt, (promptCounts.get(prompt) || 0) + 1);
}

assert.equal(added.length, 30, 'Expected 30 new Grade 5 article/determiner questions');
assert.equal(new Set(added.map(q => q.id)).size, 30, 'New IDs must be unique');
for (const q of added) {
  assert.equal(q.chapterId, 'eng-nouns', q.id);
  assert(['articles', 'determiners'].includes(q.subsection), q.id);
  assert(q.hint && q.explanation, `Missing guidance: ${q.id}`);
  assert.equal(q.options.length, 4, q.id);
  assert.equal(new Set(q.options).size, 4, `Duplicate option: ${q.id}`);
  assert.equal(q.options.filter(option => option === q.answer).length, 1, `Invalid answer: ${q.id}`);
  assert.equal(promptCounts.get(normalise(q.question)), 1, `Duplicate prompt: ${q.id}`);
}
for (const subsection of ['articles', 'determiners']) {
  const count = bank.filter(q => q.chapterId === 'eng-nouns' && q.subsection === subsection).length;
  assert(count >= 20, `${subsection} remains below 20 (${count})`);
  console.log(`Grade 5 English ${subsection}: ${count} questions`);
}
console.log('30 contextual additions passed ID, prompt, option, answer and guidance checks.');
