'use strict';
const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const source = fs.readFileSync('engine/admin.js', 'utf8');
const nodes = {};
function element() { return {value:'',checked:false,innerHTML:'',options:[],classList:{add(){},remove(){}},appendChild(o){this.options.push(o);},insertAdjacentHTML(_,s){this.innerHTML+=s;}}; }
for (const id of ['qm-grade','qm-subject','qm-chapter','qm-difficulty','qm-search','qm-include-unpublished','qm-list','qm-load-more','qm-has-image','qm-protected']) nodes[id] = element();
const filters = [];
const packs = [{id:'grade5-english',name:'English',grade:5,chapters:[{id:'verbs',name:'Verbs'}]}, {id:'grade1-english',name:'English',grade:1,comingSoon:true,chapters:[]}];
const ctx = vm.createContext({
  SUBJECT_PACKS:packs, document:{getElementById:id=>nodes[id],createElement:element},
  _esc:s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'),
  _setCount(){},
  _sb:{from(){
    const q = {};
    for (const method of ['select','eq','order','range','in','ilike','or']) q[method]=(...args)=>{filters.push([method,...args]);return q;};
    q.then=resolve=>resolve({data:[{id:'q1',subject_id:'grade5-english',chapter_id:'verbs',difficulty:2,data:{question:'Which &lt;word&gt; is a verb?'}}],count:1});
    return q;
  }}
});
vm.runInContext(source.slice(source.indexOf('  const QM = (() => {'), source.indexOf('\n  })();',source.indexOf('  const QM = (() => {'))+9)+'\nglobalThis.manager = QM;',ctx);
(async()=>{
  await ctx.manager.qmSearch();
  assert(filters.some(f=>f[0]==='in' && f[1]==='subject_id' && f[2].length===1 && f[2][0]==='grade5-english'));
  assert.match(nodes['qm-list'].innerHTML,/Grade 5 · English/);
  assert.match(nodes['qm-list'].innerHTML,/Verbs/);
  assert.match(nodes['qm-list'].innerHTML,/Medium/);
  assert.match(nodes['qm-list'].innerHTML,/Review \/ edit question/);
  assert.match(nodes['qm-list'].innerHTML,/More actions/);
  nodes['qm-subject'].value='grade5-english';
  ctx.manager.qmSubjectFilter();
  assert(nodes['qm-chapter'].options.some(o=>o.value==='verbs' && o.textContent==='Verbs'));
  assert.equal(nodes['qm-chapter'].disabled,false);
  nodes['qm-grade'].value='5';
  ctx.manager.qmGradeFilter();
  assert.equal(nodes['qm-chapter'].disabled,true);
  filters.length=0;
  nodes['qm-include-unpublished'].checked=true;
  await ctx.manager.qmSearch();
  assert(!filters.some(f=>f[0]==='in' && f[1]==='subject_id'));
  console.log('Question manager: live-pack default, unpublished opt-in, chapter cascade and readable card metadata passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
