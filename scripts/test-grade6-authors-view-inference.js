'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');
const bank = JSON.parse(fs.readFileSync('netlify/question-bundles/grade6-english.json', 'utf8'));
const added = bank.filter(q => /^g6eng-(view|infer)-(lagoon|library)-/.test(q.id));
const norm = s => String(s).replace(/<[^>]*>/g, ' ').replace(/&\w+;/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
const prompts = new Map();
for (const q of bank) prompts.set(norm(q.question), (prompts.get(norm(q.question)) || 0) + 1);
assert.equal(added.length, 29);
assert.equal(new Set(added.map(q => q.id)).size, 29);
for (const q of added) {
  assert(q.hint && q.hint.length > 20, `Missing/short hint ${q.id}`);
  assert(q.explanation && q.explanation.length > 35, `Missing/short explanation ${q.id}`);
  assert.equal(q.options.length, 4, q.id);
  assert.equal(new Set(q.options.map(norm)).size, 4, `Duplicate options ${q.id}`);
  assert.equal(q.options.filter(o => o === q.answer).length, 1, `Invalid answer ${q.id}`);
  assert.equal(prompts.get(norm(q.question)), 1, `Duplicate prompt ${q.id}`);
  assert([3].includes(q.difficulty), `Unexpected difficulty ${q.id}`);
}
for (const [section, countAdded] of [['authors_view', 16], ['inference', 13]]) {
  assert.equal(added.filter(q => q.subsection === section).length, countAdded);
  const count = bank.filter(q => q.chapterId === 'g6eng-comprehension' && q.subsection === section).length;
  assert(count >= 20, `${section}: ${count}`);
  console.log(`Grade 6 English ${section}: ${count} questions`);
}
console.log('29 writer-view and inference additions passed coverage and structural checks.');
