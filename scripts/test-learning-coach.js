'use strict';
// Learning Coach — one spaced-retrieval mission a day from ANY live pack of the
// child's grade. Pure lifecycle first, then a scripted launch in a vm context.
//
// Run: node scripts/test-learning-coach.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const src=fs.readFileSync('engine/learning_coach.js','utf8');

// ── pure lifecycle ────────────────────────────────────────────────────────
const PACKS=[{id:'grade4-maths',grade:4,subject:'Maths',chapters:[{id:'fractions',name:'Fractions'}]},
             {id:'grade4-english',grade:4,subject:'English',chapters:[{id:'grammar',name:'Grammar'}]}];
const context=vm.createContext({SUBJECT_PACKS:PACKS});
vm.runInContext(src+'\nglobalThis.coach=LearningCoach;',context);
const coach=context.coach;
const mk=(pack,chapter,sub,n,start=0)=>Array.from({length:n},(_,i)=>({id:`${pack}-${sub}-${i+start}`,chapterId:chapter,subsection:sub,difficulty:(i%4)+1,type:'numeric',question:`Find ${pack} ${sub} ${i}`,answer:String(i)}));

// grouping: pack/chapter/subsection, ANY difficulty, 12+ distinct
const maths=mk('grade4-maths','fractions','compare',25);
const pool=coach.groups(maths,'grade4-maths');
assert.equal(pool.length,1);
assert.equal(pool[0].key,'grade4-maths/fractions/compare','key carries the pack');
assert.equal(coach.groups(maths.slice(0,11),'grade4-maths').length,0,'11 is too few');
assert.equal(coach.groups(maths.slice(0,12),'grade4-maths').length,1,'12 is enough');
assert.equal(coach.groups(maths.map(q=>({...q,question:'Repeated'})),'grade4-maths').length,0,'stems, not ids');
assert.equal(coach.groups(maths.map(q=>({...q,difficulty:2})),'grade4-maths').length,1,'one difficulty is fine too');

// the starting check and the reserve are the same shape
const dealt=coach.deal(pool[0].qs);
assert.equal(dealt.ids.length,6);assert.equal(dealt.reserved.length,6);
assert.equal(new Set([...dealt.ids,...dealt.reserved]).size,12);
const diffOf=id=>maths.find(q=>q.id===id).difficulty;
const spread=ids=>new Set(ids.map(diffOf)).size;
assert(spread(dealt.ids)>=3&&spread(dealt.reserved)>=3,'both sets sample several difficulties');

const data={version:2,topics:{},history:[],mission:null};
const baseline=coach.choose(data,pool,'2026-09-04');
assert.equal(baseline.kind,'baseline');assert.equal(baseline.ids.length,6);
data.mission=baseline;assert.equal(coach.choose(data,pool,'2026-09-04'),baseline,'a pending mission is resumed');
baseline.ids.forEach((id,i)=>baseline.answers[id]=i<2);
baseline.spare=13;
coach.complete(data,baseline,'2026-09-04');coach.complete(data,baseline,'2026-09-04');
assert.equal(data.history.length,1,'completing twice records once');
assert.equal(coach.choose(data,pool,'2026-09-04'),null,'one mission a day');
const practice=coach.choose(data,pool,'2026-09-05');assert.equal(practice.kind,'practice');
assert.equal(practice.ids.length,8);
assert(practice.ids.every(id=>!baseline.ids.includes(id)&&!baseline.reserved.includes(id)),'practice never reuses the checks');
practice.ids.forEach(id=>practice.answers[id]=true);data.mission=practice;coach.complete(data,practice,'2026-09-05');
assert.equal(coach.choose(data,pool,'2026-09-06'),null,'fresh check waits three days');
const follow=coach.choose(data,pool,'2026-09-08');assert.equal(follow.kind,'check');
assert.deepEqual([...follow.ids],[...baseline.reserved],'the fresh check is the reserve, untouched');
follow.ids.forEach((id,i)=>follow.answers[id]=i<5);data.mission=follow;coach.complete(data,follow,'2026-09-08');
assert.equal(data.topics[baseline.key].baseline.correct,2);assert.equal(data.topics[baseline.key].followup.correct,5);

// a strong start skips practice and is re-checked after a week
const strong={version:2,topics:{},history:[],mission:null};
const strongCheck=coach.choose(strong,pool,'2026-09-04');
strongCheck.ids.forEach(id=>strongCheck.answers[id]=true);
coach.complete(strong,strongCheck,'2026-09-04');
assert.equal(coach.choose(strong,pool,'2026-09-05'),null);
assert.equal(coach.choose(strong,pool,'2026-09-11').kind,'check');

// a subsection of exactly 12 has nothing left to practise: straight to the fresh check
const thinPool=coach.groups(maths.slice(0,12),'grade4-maths');
const thin={version:2,topics:{},history:[],mission:null};
const thinBase=coach.choose(thin,thinPool,'2026-09-04');
thinBase.ids.forEach(id=>thinBase.answers[id]=false);
thinBase.spare=0;
coach.complete(thin,thinBase,'2026-09-04');
assert.equal(thin.topics[thinBase.key].noPractice,true);
assert.equal(coach.choose(thin,thinPool,'2026-09-05'),null);
assert.equal(coach.choose(thin,thinPool,'2026-09-07').kind,'check','re-checked after the practice gap');

// practice tops up from the same chapter when the subsection runs dry
const chapterPool=coach.groups([...maths.slice(0,12),...mk('grade4-maths','fractions','order',12)],'grade4-maths');
const d12=coach.deal(thinPool[0].qs);
const topped=coach.practiceSet({used:d12.ids,reserved:d12.reserved},'grade4-maths/fractions/compare',chapterPool);
assert.equal(topped.length,8);assert(topped.every(q=>q.subsection==='order'),'chapter-mates fill the round');
const foreign=coach.groups([...maths.slice(0,12),...mk('grade4-maths','decimals','place',12)],'grade4-maths');
assert.equal(coach.practiceSet({used:d12.ids,reserved:d12.reserved},'grade4-maths/fractions/compare',foreign).length,0,'never another chapter');

// fresh topics rotate by subject: fewest topics started first
const both=[...coach.groups(maths,'grade4-maths'),...coach.groups(mk('grade4-english','grammar','tenses',20),'grade4-english'),...coach.groups(mk('grade4-maths','fractions','order',20),'grade4-maths')];
const rot={version:2,topics:{},history:[],mission:null};
const first=coach.choose(rot,both,'2026-09-04');assert.equal(first.key.split('/')[0],'grade4-maths','registration order breaks the tie');
first.ids.forEach(id=>first.answers[id]=true);coach.complete(rot,first,'2026-09-04');
const second=coach.choose(rot,both,'2026-09-05');assert.equal(second.key.split('/')[0],'grade4-english','then the subject with nothing started');

// v1 pilot blobs migrate: chapter/sub/diff → grade5-maths/chapter/sub, ids merged
const v1={version:1,topics:{'fractions/compare/1':{baseline:{correct:3,day:'2026-09-01'},used:['a','b'],reserved:['c']},'fractions/compare/2':{baseline:{correct:6,day:'2026-09-02'},used:['d'],reserved:['e']}},history:[{day:'2026-09-01',kind:'baseline',key:'fractions/compare/1',correct:3,total:6}],mission:null};
coach.migrate(v1);
assert.equal(v1.version,2);
assert.deepEqual(Object.keys(v1.topics),['grade5-maths/fractions/compare']);
assert.deepEqual([...v1.topics['grade5-maths/fractions/compare'].used].sort(),['a','b','d','e']);
assert.equal(v1.history[0].key,'grade5-maths/fractions/compare');

// ── the cycle continues after the first fresh check ─────────────────────
const answer=(m,k)=>m.ids.forEach((id,i)=>m.answers[id]=i<k);
const big=coach.groups(mk('grade4-maths','fractions','compare',40),'grade4-maths');
const loop={version:2,topics:{},history:[],mission:null};
let m=coach.choose(loop,big,'2026-09-01');assert.equal(m.kind,'baseline');answer(m,2);m.spare=28;coach.complete(loop,m,'2026-09-01');
const K=m.key;const T=()=>loop.topics[K];
m=coach.choose(loop,big,'2026-09-02');assert.equal(m.kind,'practice');answer(m,8);coach.complete(loop,m,'2026-09-02');
m=coach.choose(loop,big,'2026-09-05');assert.equal(m.kind,'check');
assert.deepEqual([...m.ids],[...T().reserved],'first check is the reserve');
answer(m,3);coach.complete(loop,m,'2026-09-05');
assert.equal(T().next,'practice','a weak check sends the topic back to practice');
assert.equal(T().rounds,1);assert.equal(T().streak,0);assert.equal(T().checks.length,1);assert.equal(T().reserved.length,0);
m=coach.choose(loop,big,'2026-09-06');assert.equal(m.kind,'practice','second practice round');
assert(m.ids.every(id=>!T().used.includes(id)),'practice deals questions never seen');
answer(m,8);coach.complete(loop,m,'2026-09-06');assert.equal(T().rounds,2);
const seenBefore=new Set(T().used);
m=coach.choose(loop,big,'2026-09-09');assert.equal(m.kind,'check','re-checked three days after practice');
assert(m.ids.every(id=>!seenBefore.has(id)),'a later check deals unseen questions');
answer(m,6);coach.complete(loop,m,'2026-09-09');
assert.equal(T().streak,1);assert.equal(T().next,'check');assert.equal(T().due,'2026-09-16','first strong check: next in 7 days');
assert.equal(coach.choose(loop,big,'2026-09-15'),null,'not before its day');
m=coach.choose(loop,big,'2026-09-16');assert.equal(m.kind,'check');answer(m,5);coach.complete(loop,m,'2026-09-16');
assert.equal(T().streak,2);assert.equal(T().due,'2026-09-30','second strong check: next in 14 days');
m=coach.choose(loop,big,'2026-09-30');assert.equal(m.kind,'check');answer(m,6);coach.complete(loop,m,'2026-09-30');
assert.equal(T().next,'done');assert.equal(T().done,true);assert.equal(T().streak,3);
assert.equal(coach.choose(loop,big,'2026-10-15'),null,'a retained topic is never dealt again');
assert.equal(loop.history.length,7);

// a strong check followed by a weak one drops back to practice
const wobble={version:2,topics:{},history:[],mission:null};
m=coach.choose(wobble,big,'2026-09-01');answer(m,6);coach.complete(wobble,m,'2026-09-01');
m=coach.choose(wobble,big,'2026-09-08');assert.equal(m.kind,'check');answer(m,6);coach.complete(wobble,m,'2026-09-08');
m=coach.choose(wobble,big,'2026-09-15');assert.equal(m.kind,'check');answer(m,2);coach.complete(wobble,m,'2026-09-15');
assert.equal(wobble.topics[m.key].streak,0);assert.equal(wobble.topics[m.key].next,'practice','a weak check resets the streak');

// three practice rounds without a strong check → stalled, re-checked in a fortnight
const st={version:2,topics:{},history:[],mission:null};
let d='2026-09-01';const next=n=>{d=new Date(Date.parse(d+'T00:00:00Z')+n*86400000).toISOString().slice(0,10);return d;};
m=coach.choose(st,big,d);answer(m,1);m.spare=28;coach.complete(st,m,d);
for(let round=1;round<=3;round++){
  m=coach.choose(st,big,next(1));assert.equal(m.kind,'practice',`practice round ${round}`);answer(m,8);coach.complete(st,m,d);
  m=coach.choose(st,big,next(3));assert.equal(m.kind,'check',`check after round ${round}`);answer(m,2);coach.complete(st,m,d);
}
const S=st.topics[m.key];
assert.equal(S.rounds,3);assert.equal(S.stalled,true);assert.equal(S.next,'check');assert.equal(S.due,next(14),'stalled: re-check in 14 days');
assert.equal(coach.choose(st,big,'2026-09-15'),null);
m=coach.choose(st,big,d);assert.equal(m.kind,'check','the stalled topic is still re-checked');
answer(m,6);coach.complete(st,m,d);assert.equal(S.stalled,false);assert.equal(S.streak,1,'a strong check clears the stall');

// when a subsection runs dry the check reuses the oldest-seen questions
const dry={version:2,topics:{},history:[],mission:null};
m=coach.choose(dry,thinPool,'2026-09-01');answer(m,2);m.spare=0;coach.complete(dry,m,'2026-09-01');
m=coach.choose(dry,thinPool,'2026-09-04');assert.equal(m.kind,'check');answer(m,2);coach.complete(dry,m,'2026-09-04');
assert.equal(dry.topics[m.key].next,'practice');
assert.equal(coach.choose(dry,thinPool,'2026-09-05'),null,'nothing fresh to practise, so the day yields no mission');
assert.equal(dry.topics[m.key].next,'check','…and the topic is pointed at a check instead');
m=coach.choose(dry,thinPool,'2026-09-08');assert.equal(m.kind,'check');
assert.deepEqual([...m.ids],[...dry.topics[m.key].used.slice(0,6)],'the check reuses the oldest-seen six');

// a v2 topic saved before the cycle existed keeps going from where it stopped
const legacyWeak=coach.normalise({baseline:{correct:2,day:'2026-09-01'},used:['a'],reserved:['b'],practised:'2026-09-02',due:'2026-09-05',followup:{correct:3,day:'2026-09-05'}});
assert.equal(legacyWeak.next,'practice');assert.equal(legacyWeak.reserved.length,0);assert(legacyWeak.used.includes('b'));
const legacyStrong=coach.normalise({baseline:{correct:2,day:'2026-09-01'},used:['a'],reserved:['b'],practised:'2026-09-02',due:'2026-09-05',followup:{correct:6,day:'2026-09-05'}});
assert.equal(legacyStrong.next,'check');assert.equal(legacyStrong.due,'2026-09-12');assert.equal(legacyStrong.streak,1);

// the real bank: every live pack must offer the coach something
const sb=require('../netlify/lib/questions-sandbox');
const live=require('node:fs').readFileSync('subjects/_index.js','utf8');
const ids=[...live.matchAll(/registerSubject\((\{.*?\})\);/g)].map(m=>JSON.parse(m[1])).filter(p=>!p.comingSoon).map(p=>p.id);
const empty=ids.filter(id=>coach.groups(sb.loadSubject(id),id).length===0);
assert.deepEqual(empty,[],'live packs with no coach-able topic');
console.log(`Coach lifecycle passed (start → practice → check → loop → done, stalled, dry, legacy); every one of ${ids.length} live packs offers at least one topic (12+ distinct questions in a subsection).`);

// ── launch: rotation across packs, lazy loading, resume, locks ────────────
(async()=>{
  const packs=[{id:'grade4-maths',grade:4,subject:'Maths',comingSoon:false,chapters:[{id:'fractions',name:'Fractions'}]},
               {id:'grade4-english',grade:4,subject:'English',comingSoon:false,chapters:[{id:'grammar',name:'Grammar'}]},
               {id:'grade5-maths',grade:5,subject:'Maths',comingSoon:false,chapters:[{id:'other',name:'Other'}]}];
  const bank={'grade4-maths':mk('grade4-maths','fractions','compare',25),'grade4-english':mk('grade4-english','grammar','tenses',20),'grade5-maths':mk('grade5-maths','other','x',20)};
  const loads=[];
  const fixture=vm.createContext({
    DB:{restrictions:{lockedChapters:[],maxDifficulty:4}},S:{practice:{}},ACTIVE_STUDENT_ID:'child-a',
    STATIC_QUESTIONS:[],
    Auth:{getActiveAccount:()=>({grade:4})},_isParentContext:()=>false,
    _muDayKey:()=> '2026-09-04',_capReached:()=>false,_planAllowsChapter:()=>true,
    _showCapModal(){},save(){},toast(m){fixture.lastToast=m;},loadPracticeQuestion(){},
    activateSubjectPack:id=>packs.find(p=>p.id===id),
    SUBJECT_PACKS:packs,
    QuestionLoader:{loadSubject:async id=>{loads.push(id);fixture.STATIC_QUESTIONS.push(...bank[id]);return true;}},
    document:{getElementById:id=>id.startsWith('coach-')?null:{classList:{add(){}}}},
    window:{},
  });
  fixture.startSearchPractice=(qs,label,mission)=>{fixture.S.practice.coachMission=mission;fixture.launched=qs;fixture.label=label;};
  vm.runInContext(src+'\nglobalThis.coach=LearningCoach;',fixture);
  await fixture.coach.start();
  assert.equal(fixture.launched.length,6);
  assert.deepEqual(loads,['grade4-maths'],'only the first pack is fetched for a fresh topic');
  assert(fixture.launched.every(q=>q.chapterId==='fractions'),'no foreign-grade questions');
  assert.match(fixture.label,/Starting check · Maths · Fractions/);
  fixture.coach.record(fixture.launched[0],true);
  fixture.coach.record(fixture.launched[0],false);
  assert.equal(Object.keys(fixture.DB.learningCoach.mission.answers).length,1,'first answer only');
  fixture.DB=JSON.parse(JSON.stringify(fixture.DB));
  await fixture.coach.start();
  assert.equal(fixture.launched.length,5,'resume uses only unanswered questions');
  fixture.launched.forEach(q=>fixture.coach.record(q,true));
  assert.equal(fixture.DB.learningCoach.mission.completed,true);
  // next day: maths has a topic started, so English is opened for the fresh one
  fixture._muDayKey=()=>'2026-09-05';loads.length=0;
  await fixture.coach.start();
  assert.deepEqual(loads,['grade4-english'],'the subject with nothing started is fetched next');
  assert.match(fixture.label,/English · Grammar/);
  fixture.launched.forEach(q=>fixture.coach.record(q,false));
  // a locked pending mission cannot launch
  fixture._muDayKey=()=>'2026-09-06';
  await fixture.coach.start();assert.equal(fixture.launched.length,8,'practice on the weakest topic (English, 0/6)');
  fixture.DB.restrictions.lockedChapters=['grammar'];fixture.launched=null;
  await fixture.coach.start();assert.equal(fixture.launched,null,'locked pending mission cannot launch');
  // the parent card reads every topic state without throwing
  const parentEl={innerHTML:'',classList:{toggle(){}}};
  fixture.document={getElementById:id=>id==='coach-parent-summary'?parentEl:null};
  fixture.Auth.getStudents=()=>[{id:'child-a',grade:4}];
  fixture.coach.renderParent();
  assert.match(parentEl.innerHTML,/LEARNING COACH/);
  assert.match(parentEl.innerHTML,/Maths · Fractions/);
  assert.match(parentEl.innerHTML,/English · Grammar/);
  assert.match(parentEl.innerHTML,/Starting check: 0\/6/);
  assert.match(parentEl.innerHTML,/practice questions/);
  console.log('Coach launch: subject rotation, lazy pack loading, saved first answers, reload/resume and chapter locks passed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
