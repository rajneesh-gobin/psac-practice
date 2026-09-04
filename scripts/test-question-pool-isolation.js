'use strict';
// A whole family shares one browser here, and switching child never reloads the
// page. Three things therefore have to hold, and none of them used to:
//   1. the question cache belongs to WHO IT WAS FETCHED FOR, not to the subject
//   2. a child is asked for as the CHILD, even when a parent is signed in on the
//      same device - or questions.js applies the parent's (unexpiring) access
//   3. a handover empties STATIC_QUESTIONS and _done, or the next child simply
//      inherits the previous one's pool in memory
// Nothing here talks to Supabase or Netlify; fetch and _sb are stubs.
const fs   = require('fs');
const vm   = require('vm');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

let SRC = fs.readFileSync(path.join(ROOT, 'engine/question_loader.js'), 'utf8')
  .replace(/^﻿/, '').replace(/\r/g, '');
const EXPORT = '  return { loadSubject, loadForStudent, loadAllForGrade, loadPastPapers, useStudent, reset };';
if (SRC.indexOf(EXPORT) === -1) throw new Error('export anchor moved');
SRC = SRC.replace(EXPORT,
  '  return { loadSubject, loadForStudent, loadAllForGrade, loadPastPapers, useStudent, reset,\n'
  + '           _readCache, _writeCache, _buildAuthHeaders, _cacheOwner };');

function makeStorage() {
  const m = new Map();
  const api = {
    getItem: k => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => { m.set(k, String(v)); },
    removeItem: k => { m.delete(k); },
    key: i => Array.from(m.keys())[i] ?? null,
    _map: m,
  };
  Object.defineProperty(api, 'length', { get: () => m.size });
  return api;
}

// studentSession: what Store.getStudentSession() answers.
// parentToken:    what _sb.auth.getSession() answers, or null.
function load({ storage, studentSession = null, parentToken = null, activeStudentId = null, statics = [] }) {
  // Mutable, because a handover is exactly what these tests exercise: the
  // signed-in child changes underneath a QuestionLoader that is not reloaded.
  const sandbox = {
    _sess: studentSession,
    console, JSON, Date, Math, Promise, Set, Map, Array, Object, String, Number,
    setTimeout, clearTimeout,
    localStorage: storage,
    location: { protocol: 'https:' },
    fetch: async () => ({ ok: false, status: 500 }),
    STATIC_QUESTIONS: statics,
    ACTIVE_STUDENT_ID: activeStudentId,
    SUBJECT_PACKS: [],
    Store: { getStudentSession: () => sandbox._sess },
    _sb: { auth: { getSession: async () => ({ data: { session: parentToken ? { access_token: parentToken } : null } }) } },
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(SRC, sandbox, { filename: 'engine/question_loader.js' });
  return { QL: vm.runInContext('QuestionLoader', sandbox), sandbox };
}

// What _loginStudentRow does to the page: the stored session and
// ACTIVE_STUDENT_ID both move to the new child, with no reload.
function handover(QL, sandbox, id) {
  sandbox._sess = id ? SESS(id) : null;
  sandbox.ACTIVE_STUDENT_ID = id;
  QL.useStudent(id);
}

const SESS = (id) => ({ id, token: 'tok-' + id });
const Q = (id) => ({ id, chapterId: 'c1', question: 'q', difficulty: 1 });

let failures = 0;
function check(name, ok, detail) {
  if (ok) { console.log('  ok   ' + name); return; }
  failures++;
  console.log('  FAIL ' + name + (detail ? '  -> ' + detail : ''));
}

(async () => {
  // 1. The cache key carries the owner, and one child cannot read the other's.
  {
    const storage = makeStorage();
    const a = load({ storage, studentSession: SESS('kid-a'), activeStudentId: 'kid-a' });
    a.QL._writeCache('grade5-maths', [Q('a1'), Q('a2')]);
    check('owner is the signed-in child', a.QL._cacheOwner() === 'kid-a');
    check('cache key carries the owner',
      Array.from(storage._map.keys()).some(k => k.includes('kid-a|grade5-maths')),
      Array.from(storage._map.keys()).join(','));
    check('the owning child reads it back', (a.QL._readCache('grade5-maths') || []).length === 2);

    // Same device, same subject, the sibling signs in.
    const b = load({ storage, studentSession: SESS('kid-b'), activeStudentId: 'kid-b' });
    check('the sibling gets a MISS, not the other child\'s set', b.QL._readCache('grade5-maths') === null);

    // ...and the parent, whose server-side access has no per-child expiry.
    const p = load({ storage, parentToken: 'jwt-parent' });
    check('an adult gets a miss too', p.QL._readCache('grade5-maths') === null);
    check('adult owner is not a student id', p.QL._cacheOwner() === 'adult');
  }

  // 1b. The startup purge reclaims old versions WITHOUT taking the recency
  //     index with them - 'mm_qc_lru' shares the 'mm_qc_' prefix, and losing it
  //     on every load left eviction order arbitrary.
  {
    const storage = makeStorage();
    storage.setItem('mm_qc_v14_grade5-maths', 'stale');
    storage.setItem('mm_qc_lru', JSON.stringify({ 'kid-a|grade5-maths': 3 }));
    load({ storage });
    check('an older version is purged', storage.getItem('mm_qc_v14_grade5-maths') === null);
    check('the recency index survives startup', storage.getItem('mm_qc_lru') !== null);
  }

  // 2. A stored session belonging to a DIFFERENT child is not this child's
  //    credential - that is the parent-preview case (pdSwitchStudent).
  {
    const storage = makeStorage();
    const { QL } = load({ storage, studentSession: SESS('kid-a'), activeStudentId: 'kid-b', parentToken: 'jwt-parent' });
    check('a mismatched stored session is ignored', QL._cacheOwner() === 'adult');
    const h = await QL._buildAuthHeaders();
    check('preview falls back to the parent JWT', h['Authorization'] === 'Bearer jwt-parent' && !h['X-Student-Token'],
      JSON.stringify(h));
  }

  // 3. The credential: the CHILD wins whenever a child is being served, even
  //    though the parent is signed in on the same device (the normal case here).
  {
    const storage = makeStorage();
    const { QL } = load({ storage, studentSession: SESS('kid-a'), activeStudentId: 'kid-a', parentToken: 'jwt-parent' });
    const h = await QL._buildAuthHeaders();
    check('child is asked for as the child', h['X-Student-Token'] === 'tok-kid-a', JSON.stringify(h));
    check('the parent JWT is NOT sent alongside', !h['Authorization'], JSON.stringify(h));
  }
  {
    const storage = makeStorage();
    const { QL } = load({ storage, parentToken: 'jwt-parent' });
    const h = await QL._buildAuthHeaders();
    check('an adult with no child active still uses the JWT', h['Authorization'] === 'Bearer jwt-parent');
  }
  {
    const storage = makeStorage();
    const { QL } = load({ storage });
    check('no credential at all yields no headers', Object.keys(await QL._buildAuthHeaders()).length === 0);
  }

  // 4. Handover empties the pool - but never below what the manifests put there
  //    before this file was even parsed.
  {
    const storage = makeStorage();
    const statics = [Q('manifest-1'), Q('manifest-2')];   // present at load time
    const { QL, sandbox } = load({ storage, studentSession: SESS('kid-a'), activeStudentId: 'kid-a', statics });
    QL.useStudent('kid-a');
    statics.push(Q('fetched-1'), Q('fetched-2'));          // what a load would add
    await QL.loadSubject('grade5-maths');                  // marks _done (fetch stub fails -> rolled back)
    check('pool grew', statics.length === 4);

    handover(QL, sandbox, 'kid-b');
    check('handover drops the fetched questions', statics.length === 2, 'len=' + statics.length);
    check('handover keeps what the manifests pushed',
      statics.map(q => q.id).join(',') === 'manifest-1,manifest-2', statics.map(q => q.id).join(','));

    statics.push(Q('fetched-3'));
    handover(QL, sandbox, 'kid-b');
    check('re-login as the same child is a no-op', statics.length === 3, 'len=' + statics.length);

    handover(QL, sandbox, null);
    check('logout parks the pool', statics.length === 2, 'len=' + statics.length);
  }

  // 5. _done must not survive a handover, or every subject reports "already
  //    loaded" and the new child is served the previous one's pool.
  {
    const storage = makeStorage();
    const statics = [];
    const { QL, sandbox } = load({ storage, studentSession: SESS('kid-a'), activeStudentId: 'kid-a', statics });
    // A successful batch is what sets _done for real; emulate one.
    sandbox.fetch = async () => ({ ok: true, status: 200, json: async () => [Q('x1'), Q('x2')] });
    await QL.loadSubject('grade5-maths');
    check('a successful load fills the pool', statics.length === 2, 'len=' + statics.length);
    const before = statics.length;
    await QL.loadSubject('grade5-maths');
    check('_done suppresses a second load', statics.length === before);

    handover(QL, sandbox, 'kid-b');
    check('handover clears the pool', statics.length === 0, 'len=' + statics.length);
    sandbox.fetch = async () => ({ ok: true, status: 200, json: async () => [Q('y1')] });
    await QL.loadSubject('grade5-maths');
    check('_done was cleared, so the new child really fetches', statics.length === 1, 'len=' + statics.length);
    check('and gets THEIR questions', statics[0] && statics[0].id === 'y1');
    check('the previous child\'s bundle is still there, under their own key',
      storage.getItem('mm_qc_v15_kid-a|grade5-maths') !== null,
      Array.from(storage._map.keys()).join(','));
  }

  console.log(failures ? '\n' + failures + ' check(s) failed' : '\nall checks passed');
  process.exit(failures ? 1 : 0);
})();
