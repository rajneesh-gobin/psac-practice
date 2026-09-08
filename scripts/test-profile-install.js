'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const manifestFn = require('../netlify/functions/profile-manifest').handler;
const iconFn = require('../netlify/functions/profile-icon').handler;

async function testFunctions() {
  const keyA = 'a'.repeat(32);
  const keyB = 'b'.repeat(32);
  const first = await manifestFn({queryStringParameters:{key:keyA,name:'Kavya',type:'student'}});
  const second = await manifestFn({queryStringParameters:{key:keyB,name:'Teacher Raj',type:'teacher'}});
  const bad = await manifestFn({queryStringParameters:{key:'guessable',name:'Bad',type:'student'}});
  assert.equal(first.statusCode, 200);
  assert.equal(second.statusCode, 200);
  assert.equal(bad.statusCode, 400);
  const student = JSON.parse(first.body);
  const teacher = JSON.parse(second.body);
  assert.equal(student.id, `/installed/student/${keyA}`);
  assert.equal(student.start_url, `/?profile=${keyA}`);
  assert.notEqual(student.id, teacher.id, 'each installed person needs a distinct manifest id');

  const icon = await iconFn({queryStringParameters:{key:keyA,name:'<script>alert(1)</script>',type:'student'}});
  assert.equal(icon.statusCode, 200);
  assert(!icon.body.includes('<script>'), 'profile icon must escape/sanitise the supplied name');
}

function testStudentLaunch() {
  const key = 'c'.repeat(32);
  const binding = {key,type:'student',studentId:'kid-1',name:'Asha',username:'asha',family:'family'};
  const session = {id:'kid-1',displayName:'Asha',grade:5,token:'revocable-token'};
  const data = new Map([
    ['psac_profile_bindings_v1', JSON.stringify({[key]:binding})],
    ['psac_profile_sessions_v1', JSON.stringify({[key]:session})]
  ]);
  const listeners = {};
  const context = {
    URLSearchParams, Uint8Array, Math, Date, JSON,
    localStorage: {
      getItem:k => data.get(k) || null,
      setItem:(k,v) => data.set(k,String(v)),
      removeItem:k => data.delete(k)
    },
    location:{search:`?profile=${key}`,origin:'https://example.test',pathname:'/',hash:'',assign(){}},
    history:{replaceState(){}}, navigator:{userAgent:''},
    document:{getElementById(){return null;}},
    window:{addEventListener:(name,fn) => { listeners[name]=fn; },crypto:require('crypto').webcrypto},
    setTimeout(){}, setStudentToken:token => { context.studentToken=token; }
  };
  vm.createContext(context);
  const source = fs.readFileSync(path.join(__dirname, '..', 'engine', 'profile_install.js'), 'utf8');
  vm.runInContext(`${source}\n;globalThis.__profileInstall = ProfileInstall;`, context);
  const launched = context.__profileInstall.prepareLaunch();
  assert.equal(launched.studentId, 'kid-1');
  assert.equal(JSON.parse(data.get('mm_student_sess')).token, 'revocable-token');
  assert.equal(context.studentToken, 'revocable-token');
  assert.equal(context.__profileInstall.getLaunchStudentSession().id, 'kid-1');
  assert(!JSON.stringify([...data]).toLowerCase().includes('pin'), 'no PIN is persisted by profile launch');
}

function launchUrlFor(pathname, origin) {
  const key = 'd'.repeat(32);
  const data = new Map([
    ['psac_profile_bindings_v1', JSON.stringify({[key]:{key,type:'student',studentId:'kid-2',name:'Vik'}})],
    ['psac_profile_sessions_v1', '{}']
  ]);
  let assigned = null;
  const context = {
    URLSearchParams, Uint8Array, Math, Date, JSON,
    localStorage: {getItem:k => data.get(k) || null, setItem:(k,v) => data.set(k,String(v)), removeItem:k => data.delete(k)},
    location:{search:'',origin,pathname,hash:'',assign(url){ assigned = url; }},
    history:{replaceState(){}}, navigator:{userAgent:''},
    document:{getElementById(){return null;}},
    window:{addEventListener(){},crypto:require('crypto').webcrypto},
    setTimeout(){}
  };
  vm.createContext(context);
  const source = fs.readFileSync(path.join(__dirname, '..', 'engine', 'profile_install.js'), 'utf8');
  vm.runInContext(`${source}
;globalThis.__profileInstall = ProfileInstall;`, context);
  context.__profileInstall.openBinding(key);
  return {assigned, key};
}

function testLaunchUrl() {
  const served = launchUrlFor('/', 'https://example.test');
  assert.equal(served.assigned, `/?profile=${served.key}`, 'a hosted launch still opens the site root');
  const local = launchUrlFor('/D:/git-repo/psac-practice/index.html', 'file://');
  assert.equal(local.assigned, `/D:/git-repo/psac-practice/index.html?profile=${local.key}`,
    'a file:// launch must return to this document, not the filesystem root');
}

function testWiring() {
  const root = path.join(__dirname, '..');
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const auth = fs.readFileSync(path.join(root, 'engine', 'auth.js'), 'utf8');
  const store = fs.readFileSync(path.join(root, 'engine', 'store.js'), 'utf8');
  const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  for (const id of ['profile-launcher-modal','profile-install-modal','sh-install-profile']) {
    assert(html.includes(`id="${id}"`), `${id} must be present in the app UI`);
  }
  assert(html.includes('engine/profile_install.js'), 'profile installer must load before Auth starts');
  assert(auth.includes('ProfileInstall.prepareLaunch()'), 'Auth boot must honour a personal launch');
  // ⚠ Matched on the CALL, not on an exact argument list. This asserted the
  //   literal 'loginStudentProfile(profileLaunch)' and so failed the moment the
  //   call gained the message that tells the child why they are being asked for
  //   a PIN - a stricter test than the behaviour it is guarding.
  assert(auth.includes('loginStudentProfile(profileLaunch'), 'expired launches must offer PIN-only sign-in');
  assert(auth.includes('loginStudentProfile(profileLaunch, _launchPinNote(profileLaunch))'),
    'and must say why, rather than dropping the child on a bare login screen');
  assert(store.includes('ProfileInstall.getLaunchStudentSession'), 'parallel personal windows must use scoped sessions');
  assert(sw.includes("'/engine/profile_install.js'"), 'personal launcher must be available offline');
}

(async () => {
  await testFunctions();
  testStudentLaunch();
  testLaunchUrl();
  testWiring();
  console.log('Profile install tests passed: unique manifests, safe icons, PIN-free student resume.');
})().catch(error => { console.error(error); process.exitCode = 1; });
