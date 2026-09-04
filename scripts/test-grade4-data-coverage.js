'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const bank=JSON.parse(fs.readFileSync('netlify/question-bundles/grade4-maths.json','utf8'));
const added=bank.filter(q=>q.id.startsWith('g4m-data-reason-'));
assert.equal(added.length,80);
const ids=new Set(), prompts=new Map();
for(const q of bank) {
  assert(!ids.has(q.id),`Duplicate ID: ${q.id}`); ids.add(q.id);
  const text=q.question.replace(/\s+/g,' ').trim().toLowerCase();
  prompts.set(text,(prompts.get(text)||0)+1);
}
for(const q of added) {
  assert(q.hint && q.explanation,`Missing help: ${q.id}`);
  assert.equal(prompts.get(q.question.replace(/\s+/g,' ').trim().toLowerCase()),1,`Duplicate prompt: ${q.id}`);
  assert.equal(q.chapterId,'g4-data');
  assert([2,4].includes(q.difficulty));
}
const expect=(section,i,task,n)=>assert.equal(Number(added.find(q=>q.id===`g4m-data-reason-${section}-${i}-${task}`)?.answer),n,`${section}/${i}/${task}`);
[[8,12,5],[14,9,7],[17,11,8],[16,13,6],[19,14,9]].forEach((v,i)=>{
  expect('tally',i,'read',v[0]);expect('tally',i,'total',v.reduce((a,b)=>a+b));
  expect('tally',i,'compare',v[0]-v[2]);expect('tally',i,'update',v[1]+3);
});
[[4,3,2,4],[2,5,3,2],[6,2,4,3],[8,4,2,3],[10,3,5,2]].forEach(([k,a,b,c],i)=>{
  expect('pictogram',i,'half',k*(b+0.5)); expect('pictogram',i,'combined',k*(a+c));
  expect('pictogram',i,'extra',c+1);expect('pictogram',i,'total',k*(a+b+c+0.5));
});
[[12,20,16],[18,10,24],[14,22,18],[26,18,12],[16,28,20]].forEach((v,i)=>{
  expect('bar_chart',i,'read',v[0]);expect('bar_chart',i,'total',v.reduce((a,b)=>a+b));
  expect('bar_chart',i,'difference',Math.max(...v)-Math.min(...v));expect('bar_chart',i,'target',30-v[1]);
});
[[4,4,4,4],[6,5,3,8],[6,7,8,6],[8,7,7,8],[9,10,10,8]].forEach((values,i)=>{
  ['mean','median','mode','range'].forEach((task,j)=>expect('averages',i,task,values[j]));
});
const ctx={registerSubject:pack=>{ctx.pack=pack;}};
vm.runInNewContext(fs.readFileSync('subjects/grade4-maths/_manifest.js','utf8'),ctx);
const gaps=[];
for(const [chapter,syl] of Object.entries(ctx.pack.syllabus)) for(const subsection of syl.subsections) {
  const count=bank.filter(q=>q.chapterId===chapter && q.subsection===subsection.id).length;
  if(chapter==='g4-data') { assert(count>=20); console.log(`${subsection.name}: ${count}`); }
  if(count<20) gaps.push(`${chapter}/${subsection.id}: ${count} (needs ${20-count})`);
}
console.log(`Verified ${added.length} new questions: answers, help, IDs, duplicate prompts and subsection coverage.`);
console.log('Remaining Grade 4 Mathematics gaps:\n'+gaps.join('\n'));
