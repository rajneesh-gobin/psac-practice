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

// Read the live cache version out of the source. Hard-coding it here left this
// harness asserting 'mm_qc_v15_…' long after the constant had moved on, so the
// check reported a cross-child leak that was not there.
const CACHE_V = (SRC.match(/_CACHE_VERSION\s*=\s*(\d+)/) || [])[1];
if (!CACHE_V) throw new Error('_CACHE_VERSION anchor moved');
SRC = SRC.replace(EXPORT,
  '  return { loadSubject, loadForStudent, loadAllForGrade, loadPastPapers, useStudent, reset,\n'
  + '           _readCache, _writeCache, _buildAuthHeaders, _cacheOwner,\n'
  + '           _BYTE_BUDGET, _LRU_MAX, _cachedSizes };');

// `limit` caps the total characters held, so the quota branch can be driven.
// Without it every write succeeds and the eviction code is never reached -
// a test that passes by never running the thing it claims to check.
function makeStorage(limit) {
  const m = new Map();
  const used = (skip) => {
    let n = 0;
    for (const [k, v] of m) if (k !== skip) n += k.length + v.length;
    return n;
  };
  const api = {
    getItem: k => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => {
      v = String(v);
      if (limit && used(k) + k.length + v.length > limit) {
        const e = new Error('quota'); e.name = 'QuotaExceededError'; e.code = 22; throw e;
      }
      m.set(k, v);
    },
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
  // 0. Compression: the payload is stored compressed, round-trips, and a LEGACY
  //    uncompressed entry is still read (format detection, so no _CACHE_VERSION
  //    bump and nothing is purged on deploy).
  {
    const storage = makeStorage();
    const a = load({ storage, studentSession: SESS('kid-a'), activeStudentId: 'kid-a' });
    // Compressible content (repeated prose), the realistic case.
    const many = [];
    for (let i = 0; i < 200; i++) {
      const q = Q('c' + i);
      q.question = 'The cat sat on the mat and the dog ran in the park. '.repeat(3);
      many.push(q);
    }
    a.QL._writeCache('grade5-french', many);
    const key = 'mm_qc_v' + CACHE_V + '_kid-a|grade5-french';
    const stored = storage.getItem(key);
    const rawLen = JSON.stringify({ ts: 0, data: many }).length;
    check('a real payload is stored compressed (marker + smaller than raw)',
      stored && stored.charCodeAt(0) === 1 && stored.length < rawLen * 0.7,
      stored ? (stored.length + ' vs raw ' + rawLen) : 'nothing stored');
    check('the compressed payload round-trips to the same questions',
      (a.QL._readCache('grade5-french') || []).length === many.length);

    // A legacy entry written by the PRE-compression code is plain JSON.
    const legacyKey = 'mm_qc_v' + CACHE_V + '_kid-a|grade4-science';
    storage.setItem(legacyKey, JSON.stringify({ ts: Date.now(), data: [Q('legacy-1'), Q('legacy-2')] }));
    check('a legacy uncompressed entry is still read', (a.QL._readCache('grade4-science') || []).length === 2);
  }

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
    // ⚠ The cache WRITE is deferred off the render path (setTimeout 0 in
    // _loadFromAPI), so let queued writes run before asserting the key exists.
    await new Promise(r => setTimeout(r, 0));
    check('the previous child\'s bundle is still there, under their own key',
      storage.getItem('mm_qc_v' + CACHE_V + '_kid-a|grade5-maths') !== null,
      Array.from(storage._map.keys()).join(','));
  }


  // ── 9. The cache is budgeted in BYTES, not slots ───────────────────
  //    Six slots was fine while every subject was about the same size. Measured
  //    2026-09-07: grade6-french is 1,412 KB against grade4-science's 237 KB, so
  //    six slots is 5.4 MB - over the quota on its own, and the write that loses
  //    that race is often the session token.
  // ⚠ INCOMPRESSIBLE on purpose. _writeCache now lz-compresses the payload, so a
  // run of one character ('x'.repeat) collapses to almost nothing and the byte
  // budget is never pressured - the eviction this section exists to prove would
  // never fire. Random BMP codepoints (>= 0x100, all JSON-safe, no quote or
  // backslash) defeat the dictionary, so stored size ~= requested size and the
  // scenarios below behave as designed against real content.
  const randText = (n) => {
    let o = '';
    for (let i = 0; i < n; i++) o += String.fromCharCode(0x100 + ((Math.random() * 0x800) | 0));
    return o;
  };
  const bulky = (id, chars) => {
    const q = Q(id);
    q.question = randText(chars);
    return [q];
  };
  const cacheKeys = (storage) => Array.from(storage._map.keys())
    .filter(k => k.startsWith('mm_qc_v' + CACHE_V + '_'));
  const cacheChars = (storage) => cacheKeys(storage)
    .reduce((n, k) => n + storage.getItem(k).length, 0);

  {
    const storage = makeStorage();
    const a = load({ storage, studentSession: SESS('kid-a'), activeStudentId: 'kid-a' });
    const BUDGET = a.QL._BYTE_BUDGET;
    check('the budget is a byte count, not a slot count', typeof BUDGET === 'number' && BUDGET > 100000,
      String(BUDGET));

    // Four subjects at 40% of the budget each. Slot-counting would keep all
    // four (4 <= _LRU_MAX); a byte budget must not.
    const each = Math.floor(BUDGET * 0.4);
    for (const s of ['s1', 's2', 's3', 's4']) a.QL._writeCache(s, bulky(s, each));
    check('four oversized subjects do not all survive', cacheKeys(storage).length < 4,
      cacheKeys(storage).length + ' kept');
    check('the cache stays inside its byte budget', cacheChars(storage) <= BUDGET,
      cacheChars(storage) + ' > ' + BUDGET);
    check('the most recent write is the one kept',
      storage.getItem('mm_qc_v' + CACHE_V + '_kid-a|s4') !== null);
    check('the least recently used was evicted first',
      storage.getItem('mm_qc_v' + CACHE_V + '_kid-a|s1') === null);
  }

  {
    // Small subjects must still be capped by the SLOT count - the byte budget
    // replaces nothing, it is a second limit.
    const storage = makeStorage();
    const a = load({ storage, studentSession: SESS('kid-a'), activeStudentId: 'kid-a' });
    for (let i = 0; i < a.QL._LRU_MAX + 3; i++) a.QL._writeCache('tiny' + i, [Q('q' + i)]);
    check('the slot cap still applies to small subjects',
      cacheKeys(storage).length === a.QL._LRU_MAX,
      cacheKeys(storage).length + ' vs ' + a.QL._LRU_MAX);
  }

  {
    // A single bundle larger than the whole budget is still cached, alone.
    // Caching the subject the child is using right now beats caching nothing.
    const storage = makeStorage();
    const a = load({ storage, studentSession: SESS('kid-a'), activeStudentId: 'kid-a' });
    a.QL._writeCache('small', [Q('s')]);
    a.QL._writeCache('huge', bulky('h', a.QL._BYTE_BUDGET + 50000));
    check('an over-budget bundle is still cached',
      storage.getItem('mm_qc_v' + CACHE_V + '_kid-a|huge') !== null);
    check('...and it is the only one left', cacheKeys(storage).length === 1,
      cacheKeys(storage).join(','));
  }

  // ── 10. Sizes the index does not know are MEASURED, not assumed zero ───
  //     An index written before sizes existed holds bare numbers. Reading those
  //     as 'size 0' would make the budget count an existing 1.4 MB entry as
  //     free space - the budget would still be there, and still do nothing.
  {
    const storage = makeStorage();
    const a = load({ storage, studentSession: SESS('kid-a'), activeStudentId: 'kid-a' });
    const BUDGET = a.QL._BYTE_BUDGET;
    a.QL._writeCache('legacy', bulky('L', Math.floor(BUDGET * 0.7)));
    // Downgrade the index to the OLD shape, as an existing install has it.
    storage.setItem('mm_qc_lru', JSON.stringify({ 'kid-a|legacy': 1 }));
    const sizes = a.QL._cachedSizes('kid-a|other');
    check('an unknown size is measured from storage',
      sizes.length === 1 && sizes[0].b > BUDGET * 0.6, JSON.stringify(sizes));
    check('the measured size is written back into the index',
      (JSON.parse(storage.getItem('mm_qc_lru'))['kid-a|legacy'] || {}).b > 0,
      storage.getItem('mm_qc_lru'));

    a.QL._writeCache('next', bulky('N', Math.floor(BUDGET * 0.7)));
    check('the legacy entry is counted, so the new write evicts it',
      storage.getItem('mm_qc_v' + CACHE_V + '_kid-a|legacy') === null);
    check('and the total is still inside the budget', cacheChars(storage) <= BUDGET,
      cacheChars(storage) + ' > ' + BUDGET);
  }

  // ── 11. A read keeps the recorded size ─────────────────────────
  //     _lruTouch runs on every cache HIT. If that reset the size to unknown,
  //     the budget would be re-measuring the whole cache on every read.
  {
    const storage = makeStorage();
    const a = load({ storage, studentSession: SESS('kid-a'), activeStudentId: 'kid-a' });
    a.QL._writeCache('m', bulky('m', 5000));
    const before = JSON.parse(storage.getItem('mm_qc_lru'))['kid-a|m'].b;
    a.QL._readCache('m');
    const after = JSON.parse(storage.getItem('mm_qc_lru'))['kid-a|m'];
    check('a hit keeps the recorded size', after.b === before && before > 4000,
      JSON.stringify({ before, after }));
    check('a hit still advances recency', after.u > 1, JSON.stringify(after));
  }

  // ── 12. Eviction never touches another tenant of the quota ──────────
  //     The session token shares this origin. Losing a question bundle costs a
  //     refetch; losing the token reads to a parent as "it keeps logging me out".
  {
    const storage = makeStorage(600000);   // a deliberately tight quota
    storage.setItem('mm_student_session', 'THE-TOKEN');
    storage.setItem('psac_known_students', '["kid-a"]');
    const a = load({ storage, studentSession: SESS('kid-a'), activeStudentId: 'kid-a' });
    for (const s of ['a', 'b', 'c', 'd']) a.QL._writeCache(s, bulky(s, 200000));
    check('the session token survived a full cache', storage.getItem('mm_student_session') === 'THE-TOKEN');
    check('so did the other tenant', storage.getItem('psac_known_students') !== null);
    check('the cache fitted itself into the real quota', cacheChars(storage) <= 600000,
      String(cacheChars(storage)));
    check('and something was actually cached', cacheKeys(storage).length >= 1,
      cacheKeys(storage).length + ' entries');
  }
  console.log(failures ? '\n' + failures + ' check(s) failed' : '\nall checks passed');
  process.exit(failures ? 1 : 0);
})();
