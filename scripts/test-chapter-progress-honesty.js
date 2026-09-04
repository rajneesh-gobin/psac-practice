'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('engine/app.js','utf8');
const fn=(start,end)=>source.slice(source.indexOf(start),source.indexOf(end,source.indexOf(start)));
const summary={innerHTML:''};
const ctx=vm.createContext({DB:{chapters:{a:{attempted:42,correct:38},b:{attempted:1,correct:1}},stats:{totalAttempted:43,totalCorrect:39}},
  STATIC_QUESTIONS:[{id:'q1',chapterId:'a'},{id:'q1',chapterId:'a'},{id:'q2',chapterId:'a'},{id:'q3',chapterId:'b'}],
  ASSIGNMENT_MODE:false,_recordDaily(){},save(){},updateStreak(){},checkBadges(){},gainXP(){},Events:{emit(){}},
  document:{getElementById:()=>summary},_muDayKey:()=> '2026-09-04',_MU_OFFSET_MS:14400000,_chapterWhen:()=> 'Today'});
vm.runInContext(fn('function _chapterProgress(', '// "Today"') + '\n' + fn('function recordAnswer(', '// ── ANSWER CHECKING') + '\n' + fn('function _renderChapterSummary(', 'window.startAssignment ='),ctx);
assert.equal(ctx._chapterProgress('a').state,'started');
assert.equal(ctx._chapterProgress('a').unique,0);
assert.equal(ctx._chapterProgress('a').total,2);
ctx.recordAnswer('a',true,undefined,'q1');
ctx.recordAnswer('a',true,undefined,'q1');
assert.equal(ctx._chapterProgress('a').unique,1);
ctx.recordAnswer('a',true,undefined,'generated-not-in-bank');
assert.equal(ctx._chapterProgress('a').unique,1);
ctx._renderChapterSummary([{id:'a'},{id:'b',enrichment:true}]);
assert(summary.innerHTML.includes('/2'));
assert(!summary.innerHTML.includes('Mastered'));
assert(!summary.innerHTML.includes('Worked through'));
assert(summary.innerHTML.includes('Practised today'));
ctx.STATIC_QUESTIONS=[];
assert.equal(ctx._chapterProgress('a').known,false);
assert.equal(ctx._chapterProgress('a').effort,null);
assert.equal(ctx._chapterProgress('a').state,'started');
console.log('Chapter progress: repeats, old totals, unknown bank and bonus summary passed.');
