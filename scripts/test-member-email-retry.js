'use strict';
const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const source = fs.readFileSync('engine/admin.js', 'utf8');
const fn = source.slice(source.indexOf('  async function _copyEmailBatch('), source.indexOf('  async function copyMemberEmails('));
async function run(sequence) {
  const routes = [];
  const ctx = vm.createContext({
    _sb: { auth: { getSession: async () => ({data:{session:{access_token:'test-only'}}}) } },
    AbortController, setTimeout, clearTimeout,
    fetch: async (route, options) => {
      routes.push(route);
      assert.equal(options.headers.Authorization, 'Bearer test-only');
      const step = sequence.shift();
      if (step instanceof Error) throw step;
      return {ok:step===200,status:step,headers:{get:()=> 'application/json'},json:async()=>step===200?{ok:true,emails:{q:'a@example.com'}}:{error:'Request refused'}};
    }
  });
  vm.runInContext(fn,ctx);
  return {routes, result:ctx._copyEmailBatch(['q'])};
}
async function backend(failure) {
  const getUserById = async () => failure ? {error:{status:503}} : {data:{user:{email:'a@example.com'}}};
  const ctx = vm.createContext({ exports:{}, require:()=>({
    json:(statusCode,body)=>({statusCode,body}),
    requireAdmin:async()=>({sb:{auth:{admin:{getUserById}}}})
  }) });
  vm.runInContext(fs.readFileSync('netlify/functions/admin-member-emails.js','utf8'),ctx);
  return ctx.exports.handler({httpMethod:'POST',body:JSON.stringify({user_ids:['00000000-0000-0000-0000-000000000001']})});
}
(async()=>{
  let test = await run([new Error('Failed to fetch'),200]);
  assert.equal((await test.result).emails.q,'a@example.com');
  assert.deepEqual(test.routes,['/api/admin-member-emails','/.netlify/functions/admin-member-emails']);
  test = await run([502,200]); await test.result; assert.equal(test.routes.length,2);
  test = await run([403]); await assert.rejects(test.result,/Request refused/); assert.equal(test.routes.length,1);
  test = await run([new Error('offline'),new Error('offline'),new Error('offline')]);
  await assert.rejects(test.result,/after 3 attempts/); assert.equal(test.routes.length,3);
  assert.equal((await backend(true)).statusCode,502);
  assert.equal((await backend(false)).statusCode,200);
  console.log('Email service: network and server retries, direct-route fallback, auth failure and incomplete lookup handling passed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
