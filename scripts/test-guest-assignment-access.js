'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const calls = [];
let result;
const context = vm.createContext({
  require: () => ({loadQuestionSet: () => [{id:'q1',question:'One plus one?',type:'mcq',options:['1','2'],answer:'2'}]}),
  process: {env:{SUPABASE_SERVICE_ROLE_KEY:'test-only'}}, exports: {}, console,
  fetch: async (url, options) => {
    calls.push([url,JSON.parse(options.body)]);
    return {ok:true,json:async()=>result};
  }
});
vm.runInContext(fs.readFileSync('netlify/functions/assignment-open.js','utf8'),context);
const run = async body => JSON.parse((await context.exports.handler({httpMethod:'POST',headers:{'x-nf-client-connection-ip':'test-ip'},body:JSON.stringify(body)})).body);
(async()=>{
  result={ok:true,access_mode:'nickname',title:'Homework'};
  let r=await run({code:'ABC123',info:true});
  assert.equal(r.access_mode,'nickname');
  assert.equal(r.questions,undefined);
  result={ok:true,name:'Aisha',submit_name:'pupil-stable-id',token:'secret-token',assignment:{code:'ABC123',question_ids:['q1'],subject_pack_id:'grade5-maths'}};
  r=await run({code:'ABC123',pin:'0042'});
  assert.equal(r.name,'Aisha'); assert.equal(r.submitName,'pupil-stable-id');
  assert.equal(calls.at(-1)[1].p_pin,'0042'); assert.equal(calls.at(-1)[1].p_name,'');
  r=await run({code:'ABC123',name:'Nickname'});
  assert.equal(calls.at(-1)[1].p_pin,''); assert.equal(r.ok,true);
  result={ok:false,error:'bad_pin'};
  r=await run({code:'ABC123',pin:'9999'});
  assert.equal(r.ok,false); assert.equal(r.questions,undefined);
  result={ok:false,error:'locked'};
  r=await run({code:'ABC123',pin:'9999'});
  assert.equal(r.error,'locked'); assert.equal(r.token,undefined);
  console.log('Guest access: metadata, PIN-only entry, nickname-only entry, stable identity and rejected entry passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
