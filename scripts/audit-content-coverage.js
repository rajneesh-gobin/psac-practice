'use strict';
// Subsection depth, per live pack: what is declared, what is thin, what is
// tagged but never declared.
//
// ⚠ LIVE PACKS COME FROM THE GENERATED INDEX, never from a hard-coded list.
//   This file used to open with `for (grade of [4,5,6]) for (subject of
//   ['english','french','history','maths','science'])` - fifteen packs, written
//   when fifteen were all there was. Grades 1-3 and 7-9 went live on 2026-09-16
//   and this audit never saw them: 31 of 46 live packs, including every NCE
//   pack, had no subsection-depth audit at all. Nothing failed, because an audit
//   that does not look at a pack has nothing to say about it.
//   Same derivation as test-live-pack-content.js and test-subsection-invariant.js,
//   and for the same reason: grepping the manifests for /comingSoon:\s*false/
//   matches the comment every placeholder carries.
//
// ⚠ THIS REVIEWS, IT DOES NOT FAIL. `test-subsection-invariant.js` is what
//   fails the build on a declared-vs-tagged mismatch. What this adds is the
//   number: how far from 20 questions each declared subsection is.
//   ⚠ Undeclared tags are NAMED by default, not just counted - counting them
//   silently is exactly how five broken chapters survived for months.
//
//   node scripts/audit-content-coverage.js [--detail] [--json] [--bundles]
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {loadSubject}=require('../netlify/lib/questions-sandbox');
const ROOT=path.join(__dirname,'..');

// Every pack the index registers without comingSoon - the same list a parent sees.
const LIVE=[];
{
  const ctx={registerSubject:p=>{if(!p.comingSoon)LIVE.push(p.id);},console:{log(){}},window:{}};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT,'subjects','_index.js'),'utf8'),ctx);
}
LIVE.sort();

const report=[];
for(const id of LIVE) {
  let pack;
  const context=vm.createContext({registerSubject:p=>{pack=p;},window:{},console});
  // ⚠ The MANIFEST, not the index: the index is lite and carries no syllabus,
  //   so reading subsections off it reports every pack as declaring none.
  vm.runInContext(fs.readFileSync(path.join(ROOT,'subjects',id,'_manifest.js'),'utf8'),context);
  if(!pack){report.push({id,error:'manifest registered no pack'});continue;}
  let bank;
  try{
    bank=process.argv.includes('--bundles')
      ?JSON.parse(fs.readFileSync(path.join(ROOT,'netlify','question-bundles',id+'.json'),'utf8'))
      :loadSubject(id);
  }catch(e){report.push({id,error:e.message});continue;}
  const counts=new Map();
  for(const q of bank){if(!q)continue;const key=`${q.chapterId}/${q.subsection||''}`;counts.set(key,(counts.get(key)||0)+1);}
  const declared=new Set(),gaps=[];
  for(const [chapter,entry] of Object.entries(pack.syllabus||{})) for(const sub of entry.subsections||[]) {
    const key=`${chapter}/${sub.id}`;declared.add(key);
    const count=counts.get(key)||0;
    if(count<20)gaps.push({chapter,subsection:sub.id,count,needed:20-count});
  }
  // A tag with no subsection is a question the subsection screen cannot show;
  // one that is tagged but undeclared is a question no child can ever reach.
  const undeclared=[...counts].filter(([key])=>key.split('/')[1]&&!declared.has(key)).map(([key,count])=>({key,count}));
  report.push({id,total:bank.length,declared:declared.size,gaps,undeclared,
    empty:gaps.filter(g=>!g.count).length,missing:gaps.reduce((n,g)=>n+g.needed,0)});
}

if(process.argv.includes('--json')) { console.log(JSON.stringify(report,null,2)); }
else {
  const T={packs:0,total:0,declared:0,gaps:0,empty:0,missing:0,undeclared:0};
  for(const r of report){
    if(r.error){console.log(`${r.id}: COULD NOT BE READ — ${r.error}`);continue;}
    T.packs++;T.total+=r.total;T.declared+=r.declared;T.gaps+=r.gaps.length;
    T.empty+=r.empty;T.missing+=r.missing;T.undeclared+=r.undeclared.length;
    console.log(`${r.id}: ${r.total} questions; ${r.gaps.length}/${r.declared} declared subsections below 20; ${r.missing} needed; ${r.undeclared.length} undeclared tags`);
    if(process.argv.includes('--detail'))for(const g of r.gaps)console.log(`  ${g.chapter}/${g.subsection}: ${g.count} (+${g.needed})`);
    for(const u of r.undeclared)console.log(`  ⚠ undeclared: ${u.key} holds ${u.count} question(s) no subsection screen lists`);
  }
  const pct=T.declared?Math.round(T.gaps/T.declared*100):0;
  console.log(`\n${T.packs} live pack(s) · ${T.total} questions · ${T.declared} declared subsections`);
  console.log(`  ${T.gaps} below 20 (${pct}%), ${T.empty} with none at all, ${T.missing} questions to bring every one to 20`);
  console.log(`  ${T.undeclared} undeclared tag(s)` + (T.undeclared?' — named above':''));
  const broken=report.filter(r=>r.error);
  if(broken.length)console.log(`  ${broken.length} pack(s) could not be read`);
}
