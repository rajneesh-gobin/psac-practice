const fs=require('fs'),path=require('path');
const {loadSubject}=require('../../netlify/lib/questions-sandbox');
const packs=fs.readdirSync('subjects').filter(x=>x.startsWith('grade9-')).sort();
const all={},stats=[],sample=[];
for(const p of packs){
 const qs=loadSubject(p);all[p]=qs;
 const count=k=>qs.reduce((o,q)=>(o[q[k]??'missing']=(o[q[k]??'missing']||0)+1,o),{});
 stats.push({pack:p,total:qs.length,difficulty:count('difficulty'),types:count('type'),chapters:count('chapterId'),withFigure:qs.filter(q=>q.image||q.figure||q.stimulus?.figure).length});
 for(const d of [1,2,3,4]){
 const pool=qs.filter(q=>q.difficulty===d).sort((a,b)=>a.id.localeCompare(b.id));
 for(let i=0;i<3&&i<pool.length;i++)sample.push({pack:p,...pool[Math.floor((i+.5)*pool.length/3)]});
 }
}
fs.writeFileSync('docs/nce-difficulty-audit/census.json',JSON.stringify(stats,null,2));
fs.writeFileSync('docs/nce-difficulty-audit/sample.json',JSON.stringify(sample,null,2));
fs.writeFileSync('docs/nce-difficulty-audit/corpus-snapshot.json',JSON.stringify(all,null,2));
console.log(JSON.stringify(stats.map(({pack,total,difficulty,types})=>({pack,total,difficulty,types})),null,2));
console.log('SAMPLE '+sample.length);console.log(JSON.stringify(sample[0],null,2));
