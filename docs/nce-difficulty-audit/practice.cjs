const fs=require('fs'); const all=require('./corpus-snapshot.json');
const stats=[],sample=[];
for(const [pack,raw] of Object.entries(all)){
 const qs=raw.filter(q=>q.question&&!['task','cloze','errorhunt'].includes(q.type));
 const count=k=>qs.reduce((o,q)=>(o[q[k]??'missing']=(o[q[k]??'missing']||0)+1,o),{});
 const l4=qs.filter(q=>q.difficulty===4);
 stats.push({pack,loadedRecords:raw.length,tasks:raw.filter(q=>q.type==='task').length,practiceItems:qs.length,difficulty:count('difficulty'),types:count('type'),l4Projected:l4.filter(q=>q.taskId).length,projected:qs.filter(q=>q.taskId).length});
 for(const d of [1,2,3,4]){const pool=qs.filter(q=>q.difficulty===d).sort((a,b)=>a.id.localeCompare(b.id)); for(let i=0;i<3&&i<pool.length;i++)sample.push({pack,...pool[Math.floor((i+.5)*pool.length/3)]});}
}
fs.writeFileSync('docs/nce-difficulty-audit/practice-census.json',JSON.stringify(stats,null,2));
fs.writeFileSync('docs/nce-difficulty-audit/sample.json',JSON.stringify(sample,null,2));
console.log(JSON.stringify(stats,null,2));
