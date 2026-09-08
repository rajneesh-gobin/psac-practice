'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');
const bank = JSON.parse(fs.readFileSync('netlify/question-bundles/grade5-english.json', 'utf8'));
const added = bank.filter(q => q.id.startsWith('g5eng-core-'));
const flat = s => String(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const norm = s => flat(s).toLowerCase();
// ⚠ Options are compared WITH their case. Lowercasing them condemned the two
// capitalisation items, whose four options are the same sentence capitalised four
// ways - that IS the question. The prompt map below stays case-folded.
const prompts = new Map();
// A shared STEM is not a duplicate question: "Which sentence is correct?" is the
// instruction, and three passive-voice items legitimately carry it with different
// options and answers. Keyed on stem + answer, which is what a real duplicate
// repeats. Not on the options - makeMCQ() keeps a random 3 distractors, so an item
// authored with more than four changes shape on every build.
const key = q => norm(q.question) + String.fromCharCode(0) + norm(q.answer);
for (const q of bank) prompts.set(key(q), (prompts.get(key(q)) || 0) + 1);
assert.equal(added.length, 38);
assert.equal(new Set(added.map(q => q.id)).size, 38);
for (const q of added) {
  assert(q.hint && q.explanation, `Missing guidance ${q.id}`);
  assert.equal(q.options.length, 4, q.id);
  assert.equal(new Set(q.options.map(flat)).size, 4, `Duplicate options ${q.id}`);
  assert.equal(q.options.filter(o => o === q.answer).length, 1, `Invalid answer ${q.id}`);
  assert.equal(prompts.get(key(q)), 1, `Duplicate question ${q.id}`);
}
for (const [chapter, section, n] of [['eng-nouns','common_proper',8],['eng-verbs','voice',15],['eng-verbs','agreement',15]]) {
  assert.equal(added.filter(q => q.chapterId === chapter && q.subsection === section).length, n);
  const total = bank.filter(q => q.chapterId === chapter && q.subsection === section).length;
  assert(total >= 20, `${section}: ${total}`);
  console.log(`Grade 5 English ${section}: ${total} questions`);
}
console.log('38 Grade 5 core-grammar additions passed coverage and structural checks.');
