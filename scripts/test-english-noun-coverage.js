'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
const cases=[
  [5,'g5eng-meaning-','eng-nouns',{collective:26,abstract:25}],
  [6,'g6eng-precision-','g6eng-nouns',{plurals:22,abstract:21}]
];
for(const [grade,prefix,chapter,expected] of cases){
  const bank=JSON.parse(fs.readFileSync(`netlify/question-bundles/grade${grade}-english.json`,'utf8'));
  const added=bank.filter(q=>q.id.startsWith(prefix));assert.equal(added.length,40);
  const prompts=new Map(),ids=new Set();
  const normal=s=>String(s||'').replace(/\s+/g,' ').trim().toLowerCase();
  for(const q of bank){assert(!ids.has(q.id),q.id);ids.add(q.id);const p=normal(q.question);prompts.set(p,(prompts.get(p)||0)+1);}
  for(const q of added){
    assert.equal(q.chapterId,chapter);assert.equal(q.difficulty,2);
    assert(expected[q.subsection]);assert(q.hint.length>20);assert(q.explanation.length>35);
    assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);
    assert.equal(q.options.filter(o=>o===q.answer).length,1);
    assert.equal(prompts.get(normal(q.question)),1,q.id+' repeats a prompt');
  }
  // ⚠⚠ A FLOOR, NOT A PIN. These count the WHOLE subsection, not the 80-item
  //    batch this file was written to verify, so every later collective-noun
  //    question moved them. grade5 collective reached 28 against a hard-coded
  //    26 and took the suite down with "28 !== 26" -- a bare AssertionError
  //    with no test name, which reads like a broken bank rather than a bank
  //    that grew. The batch size above stays EXACT: that one really is a
  //    fixed set, identified by its id prefix.
  for(const [sub,floor] of Object.entries(expected)){
    const n=bank.filter(q=>q.chapterId===chapter&&q.subsection===sub).length;
    assert(n>=floor,`grade${grade} ${sub}: ${n} questions, expected at least ${floor}`);
    console.log(`Grade ${grade} ${sub}: ${n} questions (floor ${floor})`);
  }
}
console.log('80 new noun questions: valid options, unique IDs/prompts, correct subsection counts and guidance passed.');
