'use strict';
// A correct Parent PIN used to be able to end in "your sign-in has expired":
// supabase-js drops its persisted session the first time a refresh fails, and
// a dropped session is indistinguishable from a revoked one. _ensureParentSession()
// escalates instead - and, as a last resort, re-mints from our own copy of the
// refresh token. These exercise that ladder against a scripted _sb stub;
// nothing here talks to Supabase and no real family is touched.
const fs   = require('fs');
const vm   = require('vm');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

let SRC = fs.readFileSync(path.join(ROOT, 'engine/auth.js'), 'utf8').replace(/^﻿/, '');
// Do not start the app; and reach the closure the ladder lives in.
SRC = SRC.replace(/\r/g, '').replace(/\nAuth\.init\(\);\s*$/, '\n');
if (/Auth\.init\(\);/.test(SRC)) throw new Error('Auth.init() still runs - the test would boot the app');
const EXPORT_ANCHOR = '  return {\n    init,';
if (SRC.indexOf(EXPORT_ANCHOR) === -1) throw new Error('export anchor moved');
SRC = SRC.replace(EXPORT_ANCHOR,
  '  return {\n    _ensureParentSession, _stashParentSession, _readParentStash, _clearParentStash,\n'
  // The module keeps who-is-signed-in in closure variables with no setter, and
  // the states worth testing here (a parent PREVIEWING a child, a real child
  // session) are otherwise only reachable through the full sign-in machinery.
  + '    _isTokenRefusal, _parentUidHint, _pinServerSignIn, _submitParentPin, isPinOnlySession,\n'
  + '    _test: { setWho(u, p, a) { _parentUser = u; _parentProfile = p; _activeAccount = a; },\n'
  + '             setPin(v) { _parentPinEntry = v; } },\n'
  + '    init,');

const KEY = 'psac_parent_sess_v1';

function makeStore() {
  const m = new Map();
  return {
    getItem: k => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: k => m.delete(k),
  };
}

// `script` is a list of what each call should answer, popped in call order.
function makeSb(script) {
  const calls = [];
  const pop = (name) => {
    const q = script[name];
    if (!q || !q.length) throw new Error('no scripted response for ' + name);
    return q.shift();
  };
  return {
    calls,
    auth: {
      async getSession() { calls.push('getSession'); return pop('getSession'); },
      async refreshSession(arg) {
        calls.push(arg ? 'refreshSession(rt)' : 'refreshSession()');
        if (arg) calls.push('rt=' + arg.refresh_token);
        return pop(arg ? 'refreshSessionRt' : 'refreshSession');
      },
      startAutoRefresh() {},
      onAuthStateChange() { return { data: { subscription: { unsubscribe() {} } } }; },
    },
  };
}

function load(sb, storage, online, opts = {}) {
  const noop = () => {};
  const log = { screens: [], roles: [], toasts: [], clearedStudent: 0, events: {}, fetches: [], shakes: 0 };
  // The wrong-PIN shake IS 'pin-entry-error loses .hidden'. Without this the
  // element stub swallows it and every wrong-PIN assertion passes by
  // measuring nothing at all.
  const elStub = (id) => ({
    classList: {
      add: noop,
      remove: (c) => { if (id === 'pin-entry-error' && c === 'hidden') log.shakes++; },
      toggle: noop, contains: () => false,
    },
    querySelectorAll: () => [],
    addEventListener: noop, removeEventListener: noop,
    style: {}, textContent: '', value: '',
  });
  const sandbox = {
    console,
    setTimeout, clearTimeout, setInterval, clearInterval, Promise, JSON, Date, Math,
    localStorage: storage,
    sessionStorage: opts.sessionStorage || makeStore(),
    // _hashPinForDb needs real SHA-256 and _backfillDbPinFromLocal needs atob;
    // stubbing either would test the stub instead of the code.
    crypto: require('crypto').webcrypto,
    TextEncoder, btoa, atob,
    // Records every call, so a test that expects NO network can assert it.
    // An empty queue means the network is down, not that the call succeeded.
    fetch: (url, init) => {
      log.fetches.push({ url, body: init && init.body ? JSON.parse(init.body) : null });
      const next = (opts.fetchQueue || []).shift();
      if (!next) return Promise.reject(new Error('network down'));
      return Promise.resolve({
        ok: next.status >= 200 && next.status < 300,
        status: next.status,
        headers: { get: (h) => (h.toLowerCase() === 'content-type' ? (next.type || 'application/json') : null) },
        json: async () => next.body,
      });
    },
    navigator: { onLine: online, vibrate: noop },
    location: { search: '', href: '' },
    document: {
      body: { classList: { add: noop, remove: noop, toggle: noop }, style: {} },
      documentElement: { classList: { add: noop, remove: noop }, removeAttribute: noop, setAttribute: noop },
      getElementById: (id) => elStub(id),
      querySelectorAll: () => [],
      addEventListener: noop, removeEventListener: noop,
    },
    _sb: sb,
    // Every unnamed member answers null asynchronously; the two that decide
    // routing are real so a test can drive them.
    Store: new Proxy({
      getStudentSession: () => opts.studentSession || null,
      clearStudentSession: () => { log.clearedStudent++; },
    }, { get: (t, k) => (k in t ? t[k] : async () => null) }),
    Events: {
      on: (name, fn) => { (log.events[name] = log.events[name] || []).push(fn); },
      emit: (name, payload) => Promise.all((log.events[name] || []).map(f => f(payload))),
    },
    showScreen: (id) => log.screens.push(id),
    setRole:    (r)  => log.roles.push(r),
    toast:      (t)  => log.toasts.push(t),
    launchConfetti: noop,
    _confirmModal: noop, setStudentToken: noop, getStudentToken: () => null,
    ACTIVE_STUDENT_ID: null, DB: {}, CHAPTERS: [],
    // init() binds the online/visibility refresh hooks on window.
    addEventListener: noop, removeEventListener: noop,
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(SRC, sandbox, { filename: 'engine/auth.js' });
  // `const Auth = ...` is a lexical binding, so it never lands on the sandbox
  // object - read it back out of the context instead.
  return { A: vm.runInContext('Auth', sandbox), sandbox, log };
}

const SESSION = (rt) => ({ session: { refresh_token: rt, expires_at: 9e9, user: { id: 'u1' } } });

let failures = 0;
function check(name, ok, detail) {
  if (ok) { console.log('  ok   ' + name); return; }
  failures++;
  console.log('  FAIL ' + name + (detail ? '  -> ' + detail : ''));
}

(async () => {
  // 1. A live session is answered straight away - no needless network refresh,
  //    and the stash is refreshed on the way past.
  {
    const store = makeStore();
    const sb = makeSb({ getSession: [{ data: SESSION('rt-live') }] });
    const { A } = load(sb, store, true);
    const s = await A._ensureParentSession();
    check('live session returned', !!s);
    check('no refresh attempted', sb.calls.join(',') === 'getSession', sb.calls.join(','));
    check('stash written', JSON.parse(store.getItem(KEY)).rt === 'rt-live');
  }

  // 2. The cold-start case: the client has not finished restoring on the first
  //    read. A second read must be tried before anything is declared lost.
  {
    const store = makeStore();
    const sb = makeSb({ getSession: [{ data: { session: null } }, { data: SESSION('rt-late') }] });
    const { A } = load(sb, store, true);
    const s = await A._ensureParentSession();
    check('second read recovers', !!s && s.refresh_token === 'rt-late');
    check('stopped before refreshSession', sb.calls.join(',') === 'getSession,getSession', sb.calls.join(','));
  }

  // 3. The reported bug: both reads empty AND supabase-js has already dropped
  //    its own token, so refreshSession() cannot help either. OUR copy signs
  //    the parent back in with no email, no password and no prompt.
  {
    const store = makeStore();
    store.setItem(KEY, JSON.stringify({ rt: 'rt-stashed', uid: 'u1', ts: Date.now() }));
    const sb = makeSb({
      getSession: [{ data: { session: null } }, { data: { session: null } }],
      refreshSession: [{ data: { session: null }, error: { message: 'Auth session missing!' } }],
      refreshSessionRt: [{ data: SESSION('rt-fresh'), error: null }],
    });
    const { A } = load(sb, store, true);
    const s = await A._ensureParentSession();
    check('stash re-mints a session', !!s);
    check('the stashed token was the one presented', sb.calls.includes('rt=rt-stashed'), sb.calls.join(','));
    check('rotated token replaces the stash', store.getItem(KEY) && JSON.parse(store.getItem(KEY)).rt === 'rt-fresh');
  }

  // 4. A genuinely dead token: answer null (the caller then asks for the
  //    password) and DROP the stash rather than replay it on every PIN entry.
  {
    const store = makeStore();
    store.setItem(KEY, JSON.stringify({ rt: 'rt-revoked', uid: 'u1', ts: 0 }));
    const sb = makeSb({
      getSession: [{ data: { session: null } }, { data: { session: null } }],
      refreshSession: [{ data: { session: null }, error: { message: 'missing' } }],
      refreshSessionRt: [{ data: { session: null }, error: { message: 'Invalid Refresh Token' } }],
    });
    const { A } = load(sb, store, true);
    const s = await A._ensureParentSession();
    check('dead token answers null', s === null);
    check('dead stash is dropped', store.getItem(KEY) === null);
  }

  // 5. Offline is not "signed out": nothing below the first read can succeed,
  //    so stop there and leave the stash alone for the next attempt.
  {
    const store = makeStore();
    store.setItem(KEY, JSON.stringify({ rt: 'rt-kept', uid: 'u1', ts: 0 }));
    const sb = makeSb({ getSession: [{ data: { session: null } }] });
    const { A } = load(sb, store, false);
    const s = await A._ensureParentSession();
    check('offline answers null', s === null);
    check('offline attempts nothing further', sb.calls.join(',') === 'getSession', sb.calls.join(','));
    check('offline keeps the stash', JSON.parse(store.getItem(KEY)).rt === 'rt-kept');
  }

  // 6. A thrown getSession (a wedged client) must not take the ladder down.
  {
    const store = makeStore();
    const sb = makeSb({ getSession: [], refreshSession: [{ data: SESSION('rt-thrown'), error: null }] });
    sb.auth.getSession = async () => { sb.calls.push('getSession'); throw new Error('boom'); };
    const { A } = load(sb, store, true);
    const s = await A._ensureParentSession();
    check('a throwing read is survived', !!s && s.refresh_token === 'rt-thrown');
  }

  // 7. 'session-invalid' during a parent PREVIEW of a child. _activeAccount is
  //    set, but there is no student token — the refused write was authorised by
  //    the parent's own JWT. Renew it in place; say nothing to anybody.
  {
    const store = makeStore();
    store.setItem(KEY, JSON.stringify({ rt: 'rt-stashed', uid: 'u1', ts: Date.now() }));
    const sb = makeSb({
      getSession: [{ data: { session: null } }, { data: { session: null } }],
      refreshSession: [{ data: { session: null }, error: { message: 'missing' } }],
      refreshSessionRt: [{ data: SESSION('rt-fresh'), error: null }],
    });
    // A preview leaves NO student session in storage (the tokenless one is
    // dropped on sight by _storedStudentSession).
    const { A, sandbox, log } = load(sb, store, true, { studentSession: null });
    A._test.setWho({ id: 'u1' }, { id: 'u1' }, { id: 'kid-a', name: 'Ana' });
    await sandbox.Events.emit('session-invalid', { source: 'saveStudentProgress' });
    check('preview: the child session is NOT cleared', log.clearedStudent === 0);
    check('preview: the parent is not thrown anywhere', log.screens.length === 0, log.screens.join(','));
    check('preview: nothing is said when it recovers', log.toasts.length === 0, log.toasts.join(' | '));
    check('preview: the session really was renewed', sb.calls.includes('rt=rt-stashed'), sb.calls.join(','));
  }

  // 8. Same preview, but the session is genuinely gone. The parent is sent to
  //    the PARENT sign-in — never to the child PIN screen, which is what the
  //    old handler did while they sat in their own dashboard.
  {
    const store = makeStore();
    const sb = makeSb({
      getSession: [{ data: { session: null } }, { data: { session: null } }],
      refreshSession: [{ data: { session: null }, error: { message: 'missing' } }],
    });
    const { A, sandbox, log } = load(sb, store, true, { studentSession: null });
    A._test.setWho({ id: 'u1' }, { id: 'u1' }, { id: 'kid-a', name: 'Ana' });
    await sandbox.Events.emit('session-invalid', { source: 'saveStudentProgress' });
    check('preview, unrecoverable: routed to a sign-in screen',
      log.screens.join(',') === 'auth', log.screens.join(','));
    check('preview, unrecoverable: the child session is still not cleared', log.clearedStudent === 0);
    check('preview, unrecoverable: the copy is about the parent',
      /parent sign-in/i.test(log.toasts.join(' ')), log.toasts.join(' | '));
  }

  // 9. A REAL child session still signs out exactly as before — this must not
  //    have been widened into "never sign a student out".
  {
    const store = makeStore();
    const sb = makeSb({ getSession: [] });
    const { A, sandbox, log } = load(sb, store, true, {
      studentSession: { id: 'kid-a', token: 'tok-a', displayName: 'Ana' },
    });
    A._test.setWho(null, null, { id: 'kid-a', name: 'Ana' });
    await sandbox.Events.emit('session-invalid', { source: 'loadStudentProgress' });
    check('a real child session is still signed out', log.clearedStudent === 1);
    check('and told so in the CHILD’s words, not the parent’s',
      /session has expired/i.test(log.toasts.join(' ')) && !/parent/i.test(log.toasts.join(' ')),
      log.toasts.join(' | '));
  }

  // 10. Cold start: init() must consult the stash when the client has dropped
  //     its own token, and must NOT make a network call for a visitor who has
  //     never signed in here.
  {
    const store = makeStore();
    store.setItem(KEY, JSON.stringify({ rt: 'rt-stashed', uid: 'u1', ts: Date.now() }));
    const sb = makeSb({
      getSession: [{ data: { session: null } }, { data: { session: null } },
                   { data: { session: null } }, { data: { session: null } }],
      refreshSession: [{ data: { session: null }, error: { message: 'missing' } }],
      refreshSessionRt: [{ data: SESSION('rt-fresh'), error: null }],
    });
    const { A } = load(sb, store, true);
    try { await A.init(); } catch (_) { /* routing beyond this needs far more of the app */ }
    check('init consults the stash', sb.calls.includes('rt=rt-stashed'), sb.calls.join(','));
  }
  {
    const store = makeStore();   // no stash: a first-time visitor
    const sb = makeSb({
      getSession: [{ data: { session: null } }, { data: { session: null } },
                   { data: { session: null } }, { data: { session: null } }],
      refreshSession: [{ data: { session: null }, error: { message: 'missing' } }],
      refreshSessionRt: [],
    });
    const { A } = load(sb, store, true);
    try { await A.init(); } catch (_) {}
    check('a first-time visitor makes no refresh call at all',
      !sb.calls.some(c => c.startsWith('refreshSession')), sb.calls.join(','));
  }

  // ── 11. A transient failure must NOT burn the stash ────────────────
  //     The bug behind the report. One 502, one captive portal, one dropped
  //     connection - none of which say anything about the token - and the
  //     recovery was disarmed permanently, so every correct PIN afterwards
  //     dead-ended at 'sign in with your email'.
  {
    const store = makeStore();
    store.setItem(KEY, JSON.stringify({ rt: 'rt-good', uid: 'u1', ts: 0 }));
    const sb = makeSb({
      getSession: [{ data: { session: null } }, { data: { session: null } }],
      refreshSession: [{ data: { session: null }, error: { message: 'missing' } }],
      refreshSessionRt: [{ data: { session: null }, error: { status: 502, message: 'Bad Gateway' } }],
    });
    const { A } = load(sb, store, true);
    await A._ensureParentSession();
    check('a 502 does NOT drop the stash', store.getItem(KEY) !== null);
  }
  {
    const store = makeStore();
    store.setItem(KEY, JSON.stringify({ rt: 'rt-good', uid: 'u1', ts: 0 }));
    const sb = makeSb({
      getSession: [{ data: { session: null } }, { data: { session: null } }],
      refreshSession: [{ data: { session: null }, error: { message: 'missing' } }],
      refreshSessionRt: [{ data: { session: null }, error: { status: 0, message: 'Failed to fetch' } }],
    });
    const { A } = load(sb, store, true);
    await A._ensureParentSession();
    check('a network failure does NOT drop the stash', store.getItem(KEY) !== null);
  }
  {
    const { A } = load(makeSb({ getSession: [] }), makeStore(), true);
    check('502 is not a refusal',    A._isTokenRefusal({ status: 502, message: 'x' }) === false);
    check('429 is not a refusal',    A._isTokenRefusal({ status: 429, message: 'x' }) === false);
    check('400 is a refusal',        A._isTokenRefusal({ status: 400, message: 'x' }) === true);
    check('"Failed to fetch" is not a refusal',
      A._isTokenRefusal({ message: 'Failed to fetch' }) === false);
    check('"Invalid Refresh Token" is a refusal',
      A._isTokenRefusal({ message: 'Invalid Refresh Token' }) === true);
  }

  // ── 12. WHO this browser belongs to outlives the stash ─────────────
  {
    const store = makeStore();
    const { A } = load(makeSb({ getSession: [] }), store, true);
    A._stashParentSession({ refresh_token: 'rt-1', user: { id: 'u-42' } });
    check('the uid is written to its own key', store.getItem('psac_parent_uid_v1') === 'u-42');
    A._clearParentStash();
    check('dropping the stash keeps the uid', store.getItem('psac_parent_uid_v1') === 'u-42');
    check('the hint still answers', A._parentUidHint() === 'u-42');
  }

  // ── 13. Server-side PIN sign-in ────────────────────────────
  {
    const store = makeStore();
    store.setItem('psac_parent_uid_v1', 'u-42');
    const sb = makeSb({ getSession: [] });
    sb.auth.setSession = async (tok) => {
      sb.calls.push('setSession(' + tok.access_token + ')');
      return { data: { session: { access_token: tok.access_token, refresh_token: tok.refresh_token, user: { id: 'u-42' } } }, error: null };
    };
    const { A, log } = load(sb, store, true, {
      fetchQueue: [{ status: 200, body: { ok: true, access_token: 'at-1', refresh_token: 'rt-1' } }],
    });
    const res = await A._pinServerSignIn('4271');
    check('a correct PIN signs in', res.ok === true);
    check('it asked the right endpoint', log.fetches[0] && log.fetches[0].url === '/api/parent-pin-signin');
    check('it sent the remembered parent', log.fetches[0] && log.fetches[0].body.user_id === 'u-42');
    check('it sent the PIN and nothing else',
      Object.keys((log.fetches[0] || {}).body || {}).sort().join(',') === 'pin,user_id');
    check('the minted session was installed', sb.calls.includes('setSession(at-1)'), sb.calls.join(','));
    check('the new refresh token was stashed',
      store.getItem(KEY) && JSON.parse(store.getItem(KEY)).rt === 'rt-1');
    check('the session is marked PIN-only', A.isPinOnlySession() === true);
  }
  {
    const store = makeStore();   // nobody remembered: no uid anywhere
    const { A, log } = load(makeSb({ getSession: [] }), store, true, { fetchQueue: [] });
    const res = await A._pinServerSignIn('4271');
    check('with no remembered parent it does not call out', log.fetches.length === 0);
    check('and says so', res.error === 'unknown_parent');
  }
  {
    // An undeployed /api/ route answers with the SPA fallback: index.html at
    // status 404. Read as JSON that is an empty object, and the caller would
    // report the server's refusal for a request the server never saw.
    const store = makeStore();
    store.setItem('psac_parent_uid_v1', 'u-42');
    const { A } = load(makeSb({ getSession: [] }), store, true, {
      fetchQueue: [{ status: 404, type: 'text/html', body: {} }],
    });
    const res = await A._pinServerSignIn('4271');
    check('an undeployed route is "unavailable", not "wrong PIN"', res.error === 'unavailable', res.error);
  }
  {
    const store = makeStore();
    store.setItem('psac_parent_uid_v1', 'u-42');
    const { A } = load(makeSb({ getSession: [] }), store, true, {
      fetchQueue: [{ status: 423, body: { ok: false, error: 'locked', retry_after_s: 900 } }],
    });
    const res = await A._pinServerSignIn('4271');
    check('a lockout is its own answer', res.error === 'locked' && res.retry_after_s === 900);
  }
  {
    const store = makeStore();
    store.setItem('psac_parent_uid_v1', 'u-42');
    const { A } = load(makeSb({ getSession: [] }), store, true, {
      fetchQueue: [{ status: 401, body: { ok: false, error: 'invalid' } }],
    });
    const res = await A._pinServerSignIn('4271');
    check('a refused PIN is "invalid"', res.error === 'invalid');
    check('a refused PIN marks nothing', A.isPinOnlySession() === false);
  }

  // ── 14. The pad: a local miss now asks the server before shaking ─────
  const noPinRow = () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: null }) }) }) });
  {
    const store = makeStore();                  // localStorage cleared
    store.setItem('psac_parent_uid_v1', 'u-42');
    const sb = makeSb({ getSession: [] });
    sb.from = noPinRow;
    const { A, log } = load(sb, store, true, {
      fetchQueue: [{ status: 401, body: { ok: false, error: 'invalid' } }],
    });
    A._test.setPin('9999');
    await A._submitParentPin();
    check('a cleared localStorage still reaches the server', log.fetches.length === 1);
    check('and a refusal there is a wrong PIN', log.shakes > 0);
    check('with no navigation away', log.screens.length === 0, log.screens.join(','));
  }
  {
    const store = makeStore();
    store.setItem('psac_parent_uid_v1', 'u-42');
    const sb = makeSb({ getSession: [] });
    sb.from = noPinRow;
    const { A, log } = load(sb, store, false, { fetchQueue: [] });   // offline
    A._test.setPin('9999');
    await A._submitParentPin();
    check('offline, a local miss stays a miss', log.shakes > 0);
    check('offline, nothing is asked of the network', log.fetches.length === 0);
  }
  {
    const store = makeStore();
    store.setItem('psac_parent_uid_v1', 'u-42');
    const sb = makeSb({ getSession: [] });
    sb.from = noPinRow;
    const { A, log } = load(sb, store, true, {
      fetchQueue: [{ status: 423, body: { ok: false, error: 'locked', retry_after_s: 900 } }],
    });
    A._test.setPin('9999');
    await A._submitParentPin();
    check('a lockout says how long, not "wrong PIN"',
      /15 minutes/.test(log.toasts.join(' ')), log.toasts.join(' | '));
    check('a lockout does not navigate', log.screens.length === 0, log.screens.join(','));
  }
  console.log(failures ? '\n' + failures + ' check(s) failed' : '\nall checks passed');
  process.exit(failures ? 1 : 0);
})();
