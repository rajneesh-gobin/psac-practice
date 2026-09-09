'use strict';
const fs=require('fs');
const {loadPack,listPacks}=require('../../netlify/lib/questions-sandbox');
const outDir='docs/nce-difficulty-audit';
const squash=s=>String(s||'').replace(/\s+/g,' ').trim();
// Keep words, punctuation, operators and markup: replace digit sequences only.
// This deliberately misses paraphrases, changed names and number words.
const template=s=>squash(s).replace(/\d+(?:[.,]\d+)*/g,'#');
const results=[],summary=[];
for(const packId of listPacks().filter(p=>p.startsWith('grade9-'))){
 const loaded=loadPack(packId);if(loaded.errors.length)throw Error(JSON.stringify(loaded.errors));
 const qs=loaded.practice.filter(q=>q.question&&!['task','cloze','errorhunt'].includes(q.type));
 const buckets=new Map();
 for(const q of qs){
  if(!/\d/.test(q.question))continue;
  const options=q.options? q.options.map(template).sort():null;
  const key=JSON.stringify([q.chapterId,q.type,template(q.question),options]);
  if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(q);
 }
 const groups=[];
 for(const items of buckets.values()){
  if(items.length<2)continue;
  // Exact repeat prompts are a separate problem, not numeric variation.
  if(new Set(items.map(q=>squash(q.question))).size<2)continue;
  const visual=items.some(q=>/<svg|<img|<table|<canvas/i.test(q.question)||q.image||q.figure);
  const g={pack:packId,chapter:items[0].chapterId,type:items[0].type,classification:visual?'visual-candidate':items.some(q=>/^Hence\b/i.test(q.question))?'context-dependent-candidate':'strict-numeric-template',count:items.length,extraBeyondOne:items.length-1,template:template(items[0].question),items:items.map(q=>({id:q.id,difficulty:q.difficulty,question:q.question,options:q.options,answer:q.answer,taskId:q.taskId||null}))};
  groups.push(g);results.push(g);
 }
 const tally=kind=>{const a=groups.filter(g=>g.classification===kind);return{groups:a.length,items:a.reduce((s,g)=>s+g.count,0),extraBeyondOne:a.reduce((s,g)=>s+g.extraBeyondOne,0)}};
 summary.push({pack:packId,practiceItems:qs.length,strict:tally('strict-numeric-template'),visual:tally('visual-candidate'),contextDependent:tally('context-dependent-candidate')});
}
results.sort((a,b)=>b.count-a.count);
fs.writeFileSync(outDir+'/numeric-similarity-groups.json',JSON.stringify(results,null,2));
fs.writeFileSync(outDir+'/numeric-similarity-summary.json',JSON.stringify(summary,null,2));
console.log(JSON.stringify(summary,null,2));
console.log('TOP GROUPS');for(const g of results.slice(0,18))console.log(JSON.stringify({pack:g.pack,n:g.count,kind:g.classification,examples:g.items.slice(0,2).map(q=>({id:q.id,q:q.question}))}));

