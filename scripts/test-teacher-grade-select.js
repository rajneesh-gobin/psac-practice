'use strict';
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const nodes = new Map();
const el = id => {
  if (!nodes.has(id)) nodes.set(id, {value:'',innerHTML:'',disabled:false});
  return nodes.get(id);
};
const packs = [
  {id:'grade4-maths',grade:4,name:'Mathematics',chapters:[{id:'g4',name:'Numbers'}]},
  {id:'grade4-french',grade:4,name:'French',chapters:[]},
  {id:'grade5-maths',grade:5,name:'Mathematics',chapters:[{id:'g5',name:'Fractions'}]},
  {id:'grade5-french',grade:5,name:'French',chapters:[]},
  {id:'grade6-science',grade:6,name:'Science',chapters:[]},
  {id:'grade7-maths',grade:7,name:'Mathematics',comingSoon:true}
];
const loaded=[];
const ctx=vm.createContext({document:{getElementById:el},window:{},SUBJECT_PACKS:packs,
  ACTIVE_PACK:packs[2],Auth:{isTeacher:()=>true},TeacherWorkspace:{refresh(){}},
  TeacherGuestClasses:{refresh(){},accessChanged(){}},QuestionLoader:{async loadSubject(id){loaded.push(id);}},console});
vm.runInContext(fs.readFileSync('engine/teacher.js','utf8')+'\nthis.teacher=TeacherMode;',ctx);
(async()=>{
  ctx.teacher.render();
  assert.equal(el('ta-grade').value,'5');
  assert.equal(el('ta-subject').value,'grade5-maths');
  assert(!el('ta-subject').innerHTML.includes('grade4-'));
  assert(!el('ta-grade').innerHTML.includes('Grade 7'));
  el('ta-subject').value='grade5-french';
  el('ta-grade').value='4';
  await ctx.teacher.gradeChange();
  assert.equal(el('ta-subject').value,'grade4-french');
  assert.equal(loaded.at(-1),'grade4-french');
  el('ta-grade').value='6';
  await ctx.teacher.gradeChange();
  assert.equal(el('ta-subject').value,'grade6-science');
  ctx.teacher.render();
  assert.equal(el('ta-grade').value,'6');
  console.log('Teacher grade/subject filtering, subject preservation and fallback passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
