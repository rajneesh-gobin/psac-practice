'use strict';
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const context = vm.createContext({
  console,
  shuffle: values => values.slice().reverse(),
  packGenerators: () => ({}),
  DB: { restrictions: {} },
});
vm.runInContext(fs.readFileSync('engine/questions_engine.js', 'utf8'), context);
vm.runInContext(`STATIC_QUESTIONS.push(...Array.from({ length: 37 }, (_, i) => ({
  id: 'challenge-' + (i + 1), chapterId: 'geometry', difficulty: 4,
  type: 'mcq', question: 'Challenge ' + (i + 1),
  options: ['A', 'B', 'C', 'D'], answer: 'A'
})))`, context);

const normalRound = vm.runInContext("getQuestionsForChapter('geometry', 4, 20)", context);
assert.equal(normalRound.length, 20, 'Challenge practice must stop at 20 questions');
assert(normalRound.every(q => q.difficulty === 4), 'Challenge practice must remain Level 4 only');
assert.equal(new Set(normalRound.map(q => q.id)).size, 20, 'Challenge round must not duplicate IDs');

const shortRound = vm.runInContext("getQuestionsForChapter('geometry', 4, 7)", context);
assert.equal(shortRound.length, 7, 'The caller can request a shorter Challenge round');

vm.runInContext('STATIC_QUESTIONS.splice(5)', context);
const thinRound = vm.runInContext("getQuestionsForChapter('geometry', 4, 20)", context);
assert.equal(thinRound.length, 5, 'A thin Level 4 pool is not padded with easier questions');

console.log('Challenge practice respects the requested round size and remains Level 4 only.');
