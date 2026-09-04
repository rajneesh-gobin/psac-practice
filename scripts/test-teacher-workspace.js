'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const nodes = new Map();
function node() {
  return { innerHTML: '', textContent: '', value: '', children: [], classList: { add() {}, remove() {} },
    replaceChildren() { this.innerHTML = ''; this.children = []; },
    append(child) { this.children.push(child); }, querySelectorAll() { return []; } };
}
const get = id => { if (!nodes.has(id)) nodes.set(id, node()); return nodes.get(id); };
let authChange, fail = false, deferred = null;
const calls = [];
const context = vm.createContext({
  document: { getElementById: get, createElement: node },
  Auth: { isTeacher: () => true },
  _sb: { auth: {
    onAuthStateChange(fn) { authChange = fn; },
    async getSession() { return { data: { session: { user: { id: 'teacher-a' } } } }; }
  }, async rpc(name, args) {
    calls.push([name, args]);
    if (fail) return { error: new Error('offline') };
    if (name === 'guest_my_assignments') return { data: { ok: true, assignments: [
      { id: 'assignment-a', title: '<script>bad</script>', question_count: 5, submissions: 1, status:'active' },
      { id: 'assignment-b', title: 'Other classroom homework', status:'active' },
      { id: 'assignment-c', title: 'Standalone homework', status:'active' }
    ] } };
    if (name === 'teacher_guest_assignment_modes') return {data:{ok:true,modes:[
      {id:'assignment-a',mode:'classroom_pin',classroom_id:'class-a',classroom_name:'Class A'},
      {id:'assignment-b',mode:'nickname',classroom_id:'class-b',classroom_name:'Class B'}
    ]}};
    if (deferred) return deferred;
    return { data: { ok: true, submissions: [{ name: '<img onerror=bad>', submitted_at: '2026-09-04', score: 4, total: 5, pct: 80,
      answers: [{ id: 'q1', userAnswer: '<script>bad</script>', correctAnswer: 'yes' }] }] } };
  } }, Date, Map, String, Number, navigator: {}, location: { origin: 'https://example.test' }
});
vm.runInContext(fs.readFileSync('engine/teacher_workspace.js', 'utf8') + '\nthis.workspace = TeacherWorkspace;', context);
(async () => {
  const w = context.workspace;
  await w.refresh();
  assert.match(get('ta-list-cards').innerHTML, /&lt;script&gt;/);
  assert.match(get('ta-results-assign-sel').innerHTML, /assignment-a/);
  await w.results('assignment-a');
  assert.match(get('ta-results-list').innerHTML, /4\/5/);
  assert.match(get('ta-results-list').innerHTML, /&lt;img/);
  assert(!get('ta-results-list').innerHTML.includes('<script>'));
  assert(calls.some(([name]) => name === 'teacher_guest_results'));
  await w.openClass('class-a','Class A');
  assert.match(get('tc-assignment-cards').innerHTML,/&lt;script&gt;/);
  assert(!get('tc-assignment-cards').innerHTML.includes('Other classroom homework'));
  assert(!get('tc-assignment-cards').innerHTML.includes('Standalone homework'));
  const sample=[{id:'a',classroom_id:'class-a',status:'active'},
    {id:'b',classroom_id:'class-a',status:'closed',archived:true},
    {id:'c',classroom_id:null,status:'active'},
    {id:'d',classroom_id:'class-a',status:'active',expires_at:'2020-01-01'}];
  assert.equal(w.filterAssignments(sample,'class-a','active').map(x=>x.id).join(','),'a');
  assert.equal(w.filterAssignments(sample,'class-a','archived').map(x=>x.id).join(','),'b');
  assert.equal(w.filterAssignments(sample,'class-a','closed').map(x=>x.id).join(','),'d');
  assert.equal(w.filterAssignments(sample,null,'standalone').map(x=>x.id).join(','),'c');
  const ranked=w.rankSubmissions([
    {name:'Not done',total:10,pct:100,submitted_at:null},
    {name:'A',total:10,pct:80,submitted_at:'2026-09-04'},
    {name:'B',total:10,pct:100,submitted_at:'2026-09-04'},
    {name:'C',total:10,pct:100,submitted_at:'2026-09-04'}]);
  assert.equal(ranked.map(x=>x.rank).join(','),'1,1,3');
  assert.equal(ranked.length,3);
  await w.results('assignment-b','tc-assignment-results',true);
  assert.match(get('tc-assignment-results').children[0].textContent,/require a PIN/);
  let resolve;
  deferred = new Promise(r => { resolve = r; });
  const pending = w.results('assignment-a');
  authChange('SIGNED_OUT', null);
  resolve({ data: { ok: true, submissions: [{ name: 'Private pupil' }] } });
  await pending;
  assert.equal(get('ta-results-list').innerHTML, '');
  deferred = null; fail = true;
  await w.refresh();
  assert.match(get('ta-asgn-list').children[0].textContent, /Could not load/);
  console.log('Teacher workspace: server loading, escaped content, sign-out race and failure states passed.');
})().catch(e => { console.error(e); process.exitCode = 1; });
