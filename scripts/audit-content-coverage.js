'use strict';
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {loadSubject}=require('../netlify/lib/questions-sandbox');
const report=[];
for(const grade of [4,5,6]) for(const subject of ['english','french','history','maths','science']) {
  const id=`grade${grade}-${subject}`;
  let pack;
  const context=vm.createContext({registerSubject:p=>{pack=p;},window:{},console});
  vm.runInContext(fs.readFileSync(path.join('subjects',id,'_manifest.js'),'utf8'),context);
  if(!pack||pack.comingSoon)continue;
  const bank=process.argv.includes('--bundles')?JSON.parse(fs.readFileSync(`netlify/question-bundles/${id}.json`,'utf8')):loadSubject(id);
  const counts=new Map();
  for(const q of bank){const key=`${q.chapterId}/${q.subsection||''}`;counts.set(key,(counts.get(key)||0)+1);}
  const declared=new Set(),gaps=[];
  for(const [chapter,entry] of Object.entries(pack.syllabus||{})) for(const sub of entry.subsections||[]) {
    const key=`${chapter}/${sub.id}`;declared.add(key);
    const count=counts.get(key)||0;
    if(count<20)gaps.push({chapter,subsection:sub.id,count,needed:20-count});
  }
  const undeclared=[...counts].filter(([key])=>!declared.has(key)).map(([key,count])=>({key,count}));
  report.push({id,total:bank.length,declared:declared.size,gaps,undeclared,missing:gaps.reduce((n,g)=>n+g.needed,0)});
}
if(process.argv.includes('--json')) console.log(JSON.stringify(report,null,2));
else for(const r of report){
  console.log(`${r.id}: ${r.total} questions; ${r.gaps.length}/${r.declared} declared subsections below 20; ${r.missing} needed; ${r.undeclared.length} undeclared tags`);
  if(process.argv.includes('--detail'))for(const g of r.gaps)console.log(`  ${g.chapter}/${g.subsection}: ${g.count} (+${g.needed})`);
}
