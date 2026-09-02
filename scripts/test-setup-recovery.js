'use strict';
// Family setup is a three-step wizard - profile, family, first child - with no
// transaction behind it, so any failure part-way leaves rows already written.
// These exercise the RESUME decision in Store.createProfile/createFamily: what
// each does when the insert comes back 23505 (the row is already there) versus
// a genuine failure. Nothing here talks to Supabase; _sb is a stub that replays
// scripted responses, so a real family is never touched.
const fs   = require('fs');
const vm   = require('vm');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const SRC = fs.readFileSync(path.join(ROOT, 'engine/store.js'), 'utf8').replace(/^﻿/, '');

// A chainable PostgREST stub. Each table gets a queue of scripted results,
// popped in call order; `calls` records what was asked for.
function makeSb(script) {
  const calls = [];
  function chain(table, verb, payload) {
    const q = {
      _table: table, _verb: verb, _payload: payload,
      select() { return q; },
      insert(p) { q._verb = 'insert'; q._payload = p; return q; },
      update(p) { q._verb = 'update'; q._payload = p; return q; },
      eq()      { return q; },
      single()      { return settle(); },
      maybeSingle() { return settle(); },
      then(res, rej) { return settle().then(res, rej); },
    };
    function settle() {
      const key = table + ':' + q._verb;
      const queue = script[key];
      if (!queue || !queue.length) throw new Error('no scripted response for ' + key);
      const next = queue.shift();
      calls.push(key);
      return Promise.resolve(next);
    }
    return q;
  }
  return {
    calls,
    from(table) {
      return {
        select: () => chain(table, 'select'),
        insert: p => chain(table, 'insert', p),
        update: p => chain(table, 'update', p),
      };
    },
    rpc(name) {
      const q = script['rpc:' + name];
      if (q && q.length) { calls.push('rpc:' + name); return Promise.resolve(q.shift()); }
      return Promise.resolve({ data: null,
        error: { code: 'PGRST202', message: 'Could not find the function public.' + name } });
    },
  };
}

function load(sb) {
  const store = {};
  const ls = {
    getItem: k => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: k => { delete store[k]; },
    key: i => Object.keys(store)[i] ?? null,
    get length() { return Object.keys(store).length; },
  };
  const noop = () => {};
  const win = {
    localStorage: ls, addEventListener: noop, removeEventListener: noop,
    setTimeout, clearTimeout, setInterval, clearInterval,
    console: { log: noop, warn: noop, error: noop },
    Promise, Date, JSON, Math, Object, Array, String, Number, Boolean, RegExp, Error,
    navigator: { onLine: true },
    document: { addEventListener: noop, visibilityState: 'visible' },
    _sb: sb,
    setStudentToken: noop,
  };
  win.window = win;
  const ctx = vm.createContext(win);
  vm.runInContext(SRC + '\n;globalThis.__Store = Store;', ctx, { filename: 'store.js' });
  return ctx.__Store;
}

let pass = 0, fail = 0;
function check(name, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log((ok ? '  PASS  ' : '  FAIL  ') + name + (ok ? '' : `\n          got  ${JSON.stringify(got)}\n          want ${JSON.stringify(want)}`));
  ok ? pass++ : fail++;
}

const UID = '11111111-1111-4111-8111-111111111111';
const dupe = { code: '23505', message: 'duplicate key value violates unique constraint "x_pkey"' };

(async () => {
  console.log('Store.createProfile');
  {
    // The retry case: the profile row survived an earlier half-finished setup.
    const sb = makeSb({
      'profiles:insert': [{ data: null, error: dupe }],
      'profiles:select': [{ data: { id: UID, role: 'parent', full_name: 'A' }, error: null }],
    });
    const r = await load(sb).createProfile(UID, 'parent', 'A');
    check('23505 + the row is readable -> returns the existing profile', r,
      { id: UID, role: 'parent', full_name: 'A' });
  }
  {
    // A first-run insert that genuinely worked.
    const sb = makeSb({ 'profiles:insert': [{ data: { id: UID, role: 'parent', full_name: 'A' }, error: null }] });
    const r = await load(sb).createProfile(UID, 'parent', 'A');
    check('clean insert -> returns the new profile', r, { id: UID, role: 'parent', full_name: 'A' });
  }
  {
    // A column with no GRANT: the insert is refused and nothing is readable.
    const perm = { code: '42501', message: 'permission denied for table profiles' };
    const sb = makeSb({ 'profiles:insert': [{ data: null, error: perm }] });
    const r = await load(sb).createProfile(UID, 'parent', 'A');
    check('42501 -> the code reaches the caller, not a bare null', r, { _error: perm });
  }
  {
    // The row exists but cannot be read back - the signature of a missing
    // column-level grant. Must NOT be reported as success.
    const sb = makeSb({
      'profiles:insert': [{ data: null, error: dupe }],
      'profiles:select': [{ data: null, error: { code: '42501', message: 'permission denied for table profiles' } }],
    });
    const r = await load(sb).createProfile(UID, 'parent', 'A');
    check('23505 + unreadable row -> reports the error', r, { _error: dupe });
  }

  console.log('Store.createFamily');
  {
    // families.parent_id is UNIQUE, so a retry hits 23505 on a family the
    // parent already owns. Resuming beats telling them to rename it.
    const fam = { id: 'f1', family_name: 'Gobin', family_code: 'ABC123', parent_id: UID };
    const sb = makeSb({
      'families:insert': [{ data: null, error: dupe }],
      'families:select': [{ data: fam, error: null }],
    });
    const r = await load(sb).createFamily(UID, 'Gobin');
    check('23505 + this parent already has a family -> resumes with it', r, fam);
  }
  {
    // 23505 with no family of their own is the NAME collision, and the parent
    // does have to pick a different one.
    const sb = makeSb({
      'families:insert': [{ data: null, error: dupe }],
      'families:select': [{ data: null, error: null }],
    });
    const r = await load(sb).createFamily(UID, 'Gobin');
    check('23505 + no family of their own -> reports the name clash', r, { _error: dupe });
  }
  {
    const fam = { id: 'f2', family_name: 'New', family_code: 'ZZZ999', parent_id: UID };
    const sb = makeSb({ 'families:insert': [{ data: fam, error: null }] });
    const r = await load(sb).createFamily(UID, 'New');
    check('clean insert -> returns the new family', r, fam);
  }

  // ⚠ The distinction the routing hangs off. "No family yet" sends a parent
  // back to family setup to finish it; "the query failed" must NOT, or the
  // retry writes a second family on top of one that already exists.
  console.log('Store.getMyFamily - absence vs failure');
  {
    const fam2 = { id: 'f1', family_name: 'Gobin', family_code: 'ABC123', parent_id: UID };
    const sb = makeSb({ 'families:select': [{ data: fam2, error: null }] });
    const St = load(sb);
    const r = await St.getMyFamily(UID);
    check('a family that reads back -> returned, no error recorded',
      [r, St.lastFamilyError()], [fam2, null]);
  }
  {
    // Clean "no rows", and my_member_family() not deployed (supabase-coparent.sql
    // is still outstanding). That is still a clean "no family yet".
    const sb = makeSb({ 'families:select': [{ data: null, error: null }] });
    const St = load(sb);
    const r = await St.getMyFamily(UID);
    check('no rows + co-parent RPC absent -> no family, no error',
      [r, St.lastFamilyError()], [null, null]);
  }
  {
    const perm = { code: '42501', message: 'permission denied for table families' };
    const sb = makeSb({ 'families:select': [{ data: null, error: perm }] });
    const St = load(sb);
    const r = await St.getMyFamily(UID);
    check('read failure -> no family, and the reason is recorded',
      [r, St.lastFamilyError()], [null, perm.message]);
  }
  {
    // A co-parent owns no family; theirs arrives through my_member_family().
    const fam4 = { id: 'f4', family_name: 'Shared', family_code: 'SH0001', parent_id: 'someone-else' };
    const sb = makeSb({
      'families:select': [{ data: null, error: null }],
      'rpc:my_member_family': [{ data: fam4, error: null }],
    });
    const St = load(sb);
    const r = await St.getMyFamily(UID);
    check('no owned family + co-parent RPC answers -> that family, no error',
      [r, St.lastFamilyError()], [fam4, null]);
  }
  {
    // A stale reason from an earlier call must not survive into a good one.
    const fam3 = { id: 'f9', family_name: 'B', family_code: 'B00000', parent_id: UID };
    const sb = makeSb({ 'families:select': [
      { data: null, error: { code: '42501', message: 'permission denied for table families' } },
      { data: fam3, error: null },
    ] });
    const St = load(sb);
    await St.getMyFamily(UID);
    const r = await St.getMyFamily(UID);
    check('a later successful read clears the recorded error',
      [r, St.lastFamilyError()], [fam3, null]);
  }

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS FAIL:', e); process.exit(1); });
