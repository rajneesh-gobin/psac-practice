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
  for(const [sub,count] of Object.entries(expected)){
    assert.equal(bank.filter(q=>q.chapterId===chapter&&q.subsection===sub).length,count);
    console.log(`Grade ${grade} ${sub}: ${count-20} → ${count}`);
  }
}
console.log('80 new noun questions: valid options, unique IDs/prompts, correct subsection counts and guidance passed.');
