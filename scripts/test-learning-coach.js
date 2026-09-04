'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context=vm.createContext({});
vm.runInContext(fs.readFileSync('engine/learning_coach.js','utf8')+'\nglobalThis.coach=LearningCoach;',context);
const coach=context.coach;
const questions=Array.from({length:25},(_,i)=>({id:'q'+i,chapterId:'fractions',subsection:'compare',difficulty:2,type:'numeric',question:'Find '+i,answer:String(i)}));
const pool=coach.groups(questions);
assert.equal(pool.length,1);
assert.equal(coach.groups(questions.slice(0,19)).length,0);
assert.equal(coach.groups(questions.map(q=>({...q,question:'Repeated'}))).length,0);
assert.equal(coach.groups(questions.map((q,i)=>({...q,difficulty:i%4+1}))).length,0);
const data={topics:{},history:[],mission:null};
const baseline=coach.choose(data,pool,'2026-09-04');
assert.equal(baseline.kind,'baseline');assert.equal(baseline.ids.length,6);
assert.equal(new Set([...baseline.ids,...baseline.reserved]).size,12);
data.mission=baseline;assert.equal(coach.choose(data,pool,'2026-09-04'),baseline);
baseline.ids.forEach((id,i)=>baseline.answers[id]=i<2);
coach.complete(data,baseline,'2026-09-04');coach.complete(data,baseline,'2026-09-04');
assert.equal(data.history.length,1);assert.equal(coach.choose(data,pool,'2026-09-04'),null);
const practice=coach.choose(data,pool,'2026-09-05');assert.equal(practice.kind,'practice');
assert.equal(practice.ids.length,8);
assert(practice.ids.every(id=>!baseline.ids.includes(id)&&!baseline.reserved.includes(id)));
practice.ids.forEach(id=>practice.answers[id]=true);data.mission=practice;coach.complete(data,practice,'2026-09-05');
assert.equal(coach.choose(data,pool,'2026-09-06'),null);
const follow=coach.choose(data,pool,'2026-09-08');assert.equal(follow.kind,'check');
assert.deepEqual([...follow.ids],[...baseline.reserved]);
follow.ids.forEach((id,i)=>follow.answers[id]=i<5);data.mission=follow;coach.complete(data,follow,'2026-09-08');
assert.equal(data.topics[baseline.key].baseline.correct,2);assert.equal(data.topics[baseline.key].followup.correct,5);
const strong={topics:{},history:[],mission:null};
const strongCheck=coach.choose(strong,pool,'2026-09-04');
strongCheck.ids.forEach(id=>strongCheck.answers[id]=true);
coach.complete(strong,strongCheck,'2026-09-04');
assert.equal(coach.choose(strong,pool,'2026-09-05'),null);
assert.equal(coach.choose(strong,pool,'2026-09-11').kind,'check');
const actual=require('../netlify/lib/questions-sandbox').loadSubject('grade5-maths');
const real=coach.groups(actual);
assert(real.length>0,'Pilot must have usable topics in the real bank');
console.log(`Coach lifecycle passed; ${real.length} eligible topic/difficulty pools in Grade 5 Maths (20+ distinct questions each).`);

(async()=>{
  const fixture=vm.createContext({
    DB:{restrictions:{lockedChapters:[],maxDifficulty:2}},S:{practice:{}},ACTIVE_STUDENT_ID:'child-a',
    STATIC_QUESTIONS:[...questions.map(q=>({...q,id:'foreign-'+q.id,chapterId:'other-grade'})),...questions],
    Auth:{getActiveAccount:()=>({grade:5})},_isParentContext:()=>false,
    _muDayKey:()=> '2026-09-04',_capReached:()=>false,_planAllowsChapter:()=>true,
    _showCapModal(){},save(){},toast(){},loadPracticeQuestion(){},
    activateSubjectPack:()=>({id:'grade5-maths',chapters:[{id:'fractions'}]}),
    SUBJECT_PACKS:[{id:'grade5-maths',chapters:[{id:'fractions',name:'Fractions'}]}],
    QuestionLoader:{loadSubject:async()=>true},
    document:{getElementById:id=>id.startsWith('coach-')?null:{classList:{add(){}}}}
  });
  fixture.startSearchPractice=(qs,label,mission)=>{fixture.S.practice.coachMission=mission;fixture.launched=qs;};
  vm.runInContext(fs.readFileSync('engine/learning_coach.js','utf8')+'\nglobalThis.coach=LearningCoach;',fixture);
  await fixture.coach.start();
  assert.equal(fixture.launched.length,6);
  assert(fixture.launched.every(q=>q.chapterId==='fractions'),'No foreign-grade questions');
  fixture.coach.record(fixture.launched[0],true);
  fixture.coach.record(fixture.launched[0],false);
  assert.equal(Object.keys(fixture.DB.learningCoach.mission.answers).length,1);
  fixture.DB=JSON.parse(JSON.stringify(fixture.DB));
  await fixture.coach.start();
  assert.equal(fixture.launched.length,5,'Resume uses only unanswered questions');
  fixture.DB.restrictions.lockedChapters=['fractions'];fixture.launched=null;
  await fixture.coach.start();assert.equal(fixture.launched,null,'Locked pending mission cannot launch');
  console.log('Coach launch: grade isolation, saved first answers, reload/resume and chapter locks passed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
