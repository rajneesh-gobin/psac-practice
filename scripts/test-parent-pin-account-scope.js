'use strict';
// The parent PIN's browser-side copy used to live in ONE global key,
// psac_parent_pin_v1, so a PIN set under one account validated the parent
// switch-back for EVERY account in that browser. Measured 2026-09-09: an
// account whose profiles.parent_pin_hash was null was entered with another
// account's 4455. The key is now scoped per account, and a one-time migration
// claims the legacy key only for its verified owner. These run the real
// helpers out of engine/auth.js against a scripted _sb and a shared in-memory
// localStorage; nothing talks to Supabase.
const fs   = require('fs');
const vm   = require('vm');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

let SRC = fs.readFileSync(path.join(ROOT, 'engine/auth.js'), 'utf8').replace(/^﻿/, '');
SRC = SRC.replace(/\r/g, '').replace(/\nAuth\.init\(\);\s*$/, '\n');
if (/Auth\.init\(\);/.test(SRC)) throw new Error('Auth.init() still runs');
const ANCHOR = '  return {\n    init,';
if (SRC.indexOf(ANCHOR) === -1) throw new Error('export anchor moved');
SRC = SRC.replace(ANCHOR,
  '  return {\n'
  + '    _migrateLegacyPin, _pinMatches, _getStoredPinHash, _storePin, _scopedPinKey,\n'
  + '    _hashPinForDb, hasParentPin, clearParentPin,\n'
  + '    _test: { setWho(u){ _parentUser = u; }, resetCache(){ _dbPinHash = null; _dbPinFetchFailed = false; } },\n'
  + '    init,');
// const Auth stays lexical in a vm script; surface it on the global.
SRC += '\nglobalThis.Auth = Auth;\n';

const LEGACY_KEY = 'psac_parent_pin_v1';
const btoa = s => Buffer.from(s, 'binary').toString('base64');
const atob = s => Buffer.from(s, 'base64').toString('binary');

function makeStore(seed) {
  const m = new Map(Object.entries(seed || {}));
  return {
    _m: m,
    getItem: k => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: k => m.delete(k),
  };
}

// profiles hash uses the :psac_v1_db salt; mirror it so the stub DB holds the
// same hash the code computes for a correct PIN.
const crypto = require('crypto');
const dbHashOf = pin => crypto.createHash('sha256').update(pin + ':psac_v1_db').digest('hex');

// _sb.from('profiles').select('parent_pin_hash').eq('id', id).single()
function makeSb(hashesById) {
  return {
    from() {
      let id = null;
      const api = {
        select() { return api; },
        eq(_col, val) { id = val; return api; },
        single() { return Promise.resolve({ data: { parent_pin_hash: hashesById[id] ?? null } }); },
        update() { return { eq() { return Promise.resolve({}); } }; },
      };
      return api;
    },
  };
}

function load(store, sb) {
  const sandbox = {
    console, setTimeout, clearTimeout, setInterval, clearInterval,
    Promise, JSON, Date, Math, btoa, atob,
    crypto: crypto.webcrypto, TextEncoder,
    localStorage: store, sessionStorage: makeStore(),
    navigator: { onLine: true, vibrate() {} },
    location: { search: '', href: '' },
    document: {
      body: { classList: { add() {}, remove() {}, toggle() {} }, style: {} },
      documentElement: { classList: { add() {}, remove() {} }, removeAttribute() {}, setAttribute() {} },
      getElementById: () => null, querySelectorAll: () => [],
      addEventListener() {}, removeEventListener() {},
    },
    _sb: sb,
    Store: new Proxy({}, { get: () => async () => null }),
    Events: { on() {}, emit: () => Promise.resolve() },
    showScreen() {}, setRole() {}, toast() {}, launchConfetti() {},
    _confirmModal() {}, setStudentToken() {}, getStudentToken: () => null,
    ACTIVE_STUDENT_ID: null, DB: {}, CHAPTERS: [],
    addEventListener() {}, removeEventListener() {},
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(SRC, sandbox);
  return sandbox.Auth;
}

let pass = 0, fail = 0;
const ok = (label, cond) => { cond ? (pass++, console.log('  ok  ', label)) : (fail++, console.error('  FAIL', label)); };

(async () => {
  const A = 'aaaaaaaa-0000-0000-0000-000000000001'; // owns PIN 4455 (DB hash set)
  const B = 'bbbbbbbb-0000-0000-0000-000000000002'; // no DB hash at all

  // ── 1. The reported bug: B must NOT match A's legacy global PIN ──
  {
    const store = makeStore({ [LEGACY_KEY]: btoa('4455:psac_v1') });
    const Auth  = load(store, makeSb({ [A]: dbHashOf('4455') })); // B absent => null hash
    Auth._test.setWho({ id: B });
    ok('B (no server PIN) does NOT match the leftover global 4455', (await Auth._pinMatches('4455')) === false);
    ok('B reads no scoped PIN', Auth._getStoredPinHash() === null);
  }

  // ── 2. A (the real owner) still matches 4455 via its server hash ──
  {
    const store = makeStore({ [LEGACY_KEY]: btoa('4455:psac_v1') });
    const Auth  = load(store, makeSb({ [A]: dbHashOf('4455') }));
    Auth._test.setWho({ id: A });
    ok('A still matches its own 4455 (server hash)', (await Auth._pinMatches('4455')) === true);
    ok('a successful match writes A\'s scoped key', store.getItem('psac_parent_pin_v1:' + A) === btoa('4455:psac_v1'));
    ok('the scoped key is account-specific', store.getItem('psac_parent_pin_v1:' + B) === null);
  }

  // ── 3. Migration claims the legacy key only for its verified owner ──
  {
    const store = makeStore({ [LEGACY_KEY]: btoa('4455:psac_v1') });
    const Auth  = load(store, makeSb({ [A]: dbHashOf('4455') }));
    Auth._test.setWho({ id: A });
    await Auth._migrateLegacyPin();
    ok('owner A gets the scoped key', store.getItem('psac_parent_pin_v1:' + A) === btoa('4455:psac_v1'));
    ok('the global legacy key is deleted once claimed', store.getItem(LEGACY_KEY) === null);
  }

  // ── 4. A non-owner never claims, and leaves the global key for its owner ──
  {
    const store = makeStore({ [LEGACY_KEY]: btoa('4455:psac_v1') });
    const Auth  = load(store, makeSb({ [A]: dbHashOf('4455') })); // B has no hash
    Auth._test.setWho({ id: B });
    await Auth._migrateLegacyPin();
    ok('non-owner B is not given a scoped key', store.getItem('psac_parent_pin_v1:' + B) === null);
    ok('the global key survives for its real owner', store.getItem(LEGACY_KEY) === btoa('4455:psac_v1'));
  }

  // ── 5. An account with a DIFFERENT server PIN does not claim the legacy key ──
  {
    const store = makeStore({ [LEGACY_KEY]: btoa('4455:psac_v1') });
    const Auth  = load(store, makeSb({ [B]: dbHashOf('9999') }));
    Auth._test.setWho({ id: B });
    await Auth._migrateLegacyPin();
    ok('B (server PIN 9999) does not adopt the 4455 global key', store.getItem('psac_parent_pin_v1:' + B) === null);
    ok('and does not match 4455', (await Auth._pinMatches('4455')) === false);
    ok('but still matches its own 9999', (await Auth._pinMatches('9999')) === true);
  }

  // ── 6. A malformed legacy value is swept, not carried ──
  {
    const store = makeStore({ [LEGACY_KEY]: 'not-base64-4digits' });
    const Auth  = load(store, makeSb({ [A]: dbHashOf('4455') }));
    Auth._test.setWho({ id: A });
    await Auth._migrateLegacyPin();
    ok('a malformed legacy key is removed', store.getItem(LEGACY_KEY) === null);
  }

  // ── 7. clearParentPin removes the scoped key and sweeps the global one ──
  {
    const store = makeStore({ [LEGACY_KEY]: btoa('4455:psac_v1'), ['psac_parent_pin_v1:' + A]: btoa('4455:psac_v1') });
    const Auth  = load(store, makeSb({ [A]: dbHashOf('4455') }));
    Auth._test.setWho({ id: A });
    Auth.clearParentPin();
    ok('clearParentPin removes the scoped key', store.getItem('psac_parent_pin_v1:' + A) === null);
    ok('clearParentPin also sweeps the legacy global key', store.getItem(LEGACY_KEY) === null);
  }

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})();
