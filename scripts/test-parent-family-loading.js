'use strict';
const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const auth = fs.readFileSync('engine/auth.js','utf8');
const helper = auth.slice(auth.indexOf('  async function _loadParentFamily()'), auth.indexOf('  async function _hydrateParentSession('));
async function check(failures, childFailures = 0) {
  let calls = 0, childCalls = 0, error = null;
  const ctx = vm.createContext({
    _parentUser:{id:'parent'},_parentProfile:{id:'parent'},_family:null,_familyStudents:[],
    setTimeout:fn=>fn(),_cacheAccountsLocally(){},
    Store:{
      getMyFamily:async()=>++calls<=failures?null:{id:'family'},
      getFamilyStudents:async()=>{error=++childCalls<=childFailures?'offline':null;return error?[]:[{id:'child'}];},
      lastFamilyStudentsError:()=>error
    }
  });
  vm.runInContext(helper,ctx);
  await ctx._loadParentFamily();
  return {ctx,calls,childCalls};
}
(async()=>{
  let run=await check(1); assert.equal(run.calls,2); assert.equal(run.ctx._familyStudents.length,1);
  run=await check(0,1); assert.equal(run.childCalls,2); assert.equal(run.ctx._familyStudents.length,1);
  run=await check(5); assert.equal(run.calls,3); assert.equal(run.ctx._family,null);
  run=await check(0); assert.equal(run.calls,1);
  let finish, calls=0;
  const ctx=vm.createContext({_hydrateParentSession:()=>{calls++;return new Promise(resolve=>{finish=resolve;});}});
  vm.runInContext(auth.slice(auth.indexOf('  let _parentSessionLoad ='),auth.indexOf('  async function _loadParentFamily()')),ctx);
  const first=ctx._handleParentSession({user:{id:'parent'}});
  const second=ctx._handleParentSession({user:{id:'parent'}});
  assert.equal(calls,1); finish(); await Promise.all([first,second]);
  const third=ctx._handleParentSession({user:{id:'parent'}}); assert.equal(calls,2); finish(); await third;
  assert(auth.slice(auth.indexOf('  async function enterParentMode()')).includes('if (_parentSessionLoad) { await _parentSessionLoad; return; }'));
  console.log('Parent loading: automatic family/children retries, bounded failures, fast success and shared in-flight hydration passed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
