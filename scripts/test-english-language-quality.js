'use strict';
// Local sources only. This test neither imports questions nor contacts a server.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const { loadSubject } = require('../netlify/lib/questions-sandbox');
const banks = [4,5,6].flatMap(grade => loadSubject(`grade${grade}-english`));
const byId = new Map(banks.map(q => [q.id, q]));
assert.equal(byId.size, banks.length, 'English IDs must remain unique');
for (const q of banks.filter(q => q.type === 'mcq')) {
  assert(q.options.includes(q.answer), `${q.id}: missing answer`);
  assert.equal(new Set(q.options).size, q.options.length, `${q.id}: repeated choices`);
}
// Inspect the raw factory inputs too: a de-duplicating runtime must not hide
// faulty source choices. Only compare exact text; case can be the teaching point.
let rawCount = 0;
for (const grade of [4,5,6]) {
  const dir = path.join(root, `subjects/grade${grade}-english/questions`);
  const ctx = { STATIC_QUESTIONS: [], window: {}, console };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'engine/helpers.js'), 'utf8'), ctx);
  const factory = ctx.makeMCQ;
  ctx.makeMCQ = q => {
    // Some pools intentionally contain the keyed answer more than once; the
    // factory always inserts it exactly once. Repeated distractors are unsafe.
    const options = (q.options || []).filter(option => option !== q.answer);
    assert.equal(new Set(options).size, options.length, `${q.id}: duplicate in source input`);
    rawCount++;
    return factory(q);
  };
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort()) {
    vm.runInContext(fs.readFileSync(path.join(dir, file), 'utf8'), ctx, { filename: file });
  }
}
const select = prefix => banks.filter(q => q.id.startsWith(prefix));
const complete = q => q.question.replace('___', q.answer);
const continuous = select('g4eng-cover-cont-');
assert.equal(continuous.length, 18);
assert(continuous.every(q => !/(\b\w+ing\b[^.”]*?)\s+\1/.test(complete(q))));
assert(complete(byId.get('g4eng-cover-cont-01')).includes('I am reading a story now.'));
assert(complete(byId.get('g4eng-cover-perfect-01')).includes('I have finished my homework.'));
assert.equal(select('g4eng-cover-perfect-').length, 19);
for (const q of select('g4eng-cover-adjective-')) {
  assert(!/___ a /.test(q.question), q.id);
  assert(!/the a /.test(q.explanation), q.id);
}
assert(complete(byId.get('g4eng-cover-adjective-09')).includes('an exciting story'));
assert(complete(byId.get('g4eng-cover-art-07')).includes('The journey takes an hour.'));
assert(select('g4eng-cover-art-').every(q => /indefinite article/.test(q.question)));
assert(select('g4eng-cover-adverb-').every(q => q.question.includes('adverb of manner')));
assert.equal((complete(byId.get('g4eng-cover-past-01')).match(/yesterday/gi) || []).length, 1);
assert(byId.get('g5e-cov-order-0').question.includes('bag'));
assert(byId.get('g5e-cov-order-1').question.includes('mangoes'));
assert(byId.get('g5e-cov-sentence-context-1').question.includes('conjunction giving a reason'));
assert(byId.get('g5e-cov-determiner-0').question.includes('small number'));
console.log(`English language regression checks passed: ${banks.length} questions, ${rawCount} direct MCQ source inputs. No live database access.`);
