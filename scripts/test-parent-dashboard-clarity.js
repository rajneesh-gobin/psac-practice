'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('engine/app.js','utf8');
const html=fs.readFileSync('index.html','utf8');
const start=source.indexOf('function _subjectChips(');
const fn=source.slice(start,source.indexOf('function toggleChapterFlag',start));
const ctx=vm.createContext({SUBJECT_PACKS:[
  {id:'g4',grade:4,name:'Mathematics',chapters:[{id:'g4m'}]},
  {id:'g5',grade:5,name:'Mathematics',chapters:[{id:'g5m'}]},
  {id:'g5f',grade:5,name:'French',chapters:[{id:'g5f'}]},
  {id:'g6',grade:6,name:'Science',chapters:[]},
  {id:'hidden',grade:5,name:'Unavailable',comingSoon:true,chapters:[]}
],_profEsc:s=>s});
vm.runInContext(fn,ctx);
const chips=ctx._subjectChips({chapters:{g4m:{attempted:999},g5m:{attempted:3,correct:3}}},5);
assert.equal((chips.match(/Mathematics/g)||[]).length,1);
assert(chips.includes('3 attempts'));
assert(chips.includes('French: Not started'));
assert(!chips.includes('999'));
assert(!chips.includes('%'));
assert(!chips.includes('Science'));
assert(!chips.includes('Unavailable'));
for(const screen of ['dashboard','subject-select']) {
  const section=html.slice(html.indexOf(`id="screen-${screen}"`));
  const button=section.match(/<button[^>]*class="pd-switch student-parent-switch[^>]*>[\s\S]*?<\/button>/)?.[0];
  assert(button,screen+' has a prominent parent switch');
  assert(button.includes('Auth.enterParentMode()'));
  assert(button.includes('Switch to parent mode'));
}
assert(html.includes('<details id="pd-weekly-details"'));
console.log('Parent dashboard: grade-scoped chips, honest labels, retained weekly report and protected mode switches passed.');
