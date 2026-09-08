'use strict';
// A refresh inside the teaching workspace must return there, not to the parent
// dashboard.
//
// The bug: _handleParentSession() only sent a signed-in adult to the teaching
// workspace when profile.role === 'teacher'. An ADMIN is a teacher by
// entitlement (_isTeacherUser is true for role 'admin' too) but not by role, so
// after every reload an administrator working in teacher mode was routed to the
// parent dashboard — the admin panel already had the same restore, teacher did
// not.
//
// _handleParentSession is a long function inside an IIFE, so it is extracted and
// run in a VM against a Proxy sandbox that stubs whatever it reaches for. That
// keeps the assertion on the REAL source rather than a paraphrase of it.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const src = fs.readFileSync('engine/auth.js', 'utf8');
const start = src.indexOf('  async function _handleParentSession(session) {');
assert(start > 0, 'found _handleParentSession');
const end = src.indexOf('\r\n  function _loadTeacherDashboard()', start);
assert(end > start, 'found the end of _handleParentSession');
const fn = src.slice(start, end);

function run({ role, teacherStatus, lastScreen, isSuperAdmin }) {
  const routed = [];
  const store = { 'psac-last-screen': lastScreen };
  const el = () => ({ classList: { add() {}, remove() {}, toggle() {} }, textContent: '' });
  const base = {
    console,
    sessionStorage: { getItem: k => (k in store ? store[k] : null), setItem() {} },
    document: { getElementById: el, querySelector: el, querySelectorAll: () => [] },
    _sb: { auth: { signOut: async () => {} }, rpc: async () => ({ data: null }) },
    Store: new Proxy({
      getAccountDeletedAt: async () => null,
      logLoginEvent() {},
    }, { get: (t, k) => (k in t ? t[k] : async () => null) }),
    _loadTeacherDashboard: () => routed.push('teacher'),
    _openParentDashboard: () => routed.push('parent'),
    _showFamilySetup:     () => routed.push('family-setup'),
    showScreen: id => routed.push('screen:' + id),
    _loadParentFamily: async () => {},
    _redeemPendingCoparent: async () => {},
    _needsFamilySetup: () => false,
    _promptSetParentPin() {},
    _refreshAdminBadge() {},
    _setAccessExpired() {},
    _clearParentStash() {},
    _showAuthError() {},
    applyTheme() {}, _preferredTheme: () => null,
    toast() {},
    window: {},
    _family: { id: 'f1' },
    _parentUser: { id: 'u1', email: 'a@b.c', user_metadata: {} },
    ProfileInstall: { getLaunchBinding: () => null },
    AdminPanel: { render() {} },
    // showScreen()/_handleParentSession() now open a role screen through
    // RoleModules (engine/registry.js), which this VM never loads.
    RoleModules: { isLoaded: () => true, ensure: async () => true,
      withGroup: (g, fn) => { try { fn(); } catch (e) {} return Promise.resolve(true); } },
  };
  // Anything the function reaches that is not scripted above answers with a
  // harmless stub rather than a ReferenceError, so the test stays about routing.
  //
  // ⚠ Only names the extracted source actually CALLS get a no-op. This function
  // picks up new fire-and-forget helpers over time — _backfillDbPinFromLocal()
  // was added by other work and broke this suite with "not a function", which
  // reads as a routing regression when the routing was untouched. But a blanket
  // "every _name is a no-op function" is worse: `_parentSessionLoad` is a
  // module-level LET, and handing back a function made `if (_parentSessionLoad)
  // return _parentSessionLoad;` true on the first line, so nothing routed at all
  // and every case failed identically. Called names only, deduced from the text.
  const called = new Set([...fn.matchAll(/\b(_[A-Za-z0-9_]+)\s*\(/g)].map(m => m[1]));
  const sandbox = new Proxy(base, {
    has: () => true,
    get: (t, k) => {
      if (k in t) return t[k];
      if (k in global) return global[k];
      return called.has(k) ? (() => undefined) : undefined;
    },
    set: (t, k, v) => { t[k] = v; return true; },
  });
  const ctx = vm.createContext(sandbox);
  vm.runInContext(`var _isAdminUser=false,_isSuperAdmin=false,_isTeacherUser=false,_teacherStatus='none',_parentProfile=null;
${fn}
_handleParentSession.__profile = null;`, ctx);
  // getProfile() is how the function obtains the profile; script it here.
  base.Store.getProfile = async () => ({
    id: 'u1', role, teacher_status: teacherStatus, is_super_admin: !!isSuperAdmin,
    full_name: 'T', disabled: false, expires_at: null,
  });
  return vm.runInContext('_handleParentSession({ user: _parentUser })', ctx)
    .then(() => routed);
}

(async () => {
  let checks = 0;
  const expect = async (label, opts, want) => {
    const routed = await run(opts);
    assert(routed.includes(want), `${label}: expected ${want}, got ${JSON.stringify(routed)}`);
    checks++;
    console.log('✓ ' + label + ' → ' + want);
  };

  await expect('admin refreshing inside teacher mode',
    { role: 'admin', teacherStatus: 'none', lastScreen: 'teacher' }, 'teacher');
  await expect('admin refreshing on the parent dashboard',
    { role: 'admin', teacherStatus: 'none', lastScreen: 'parent' }, 'parent');
  await expect('admin refreshing inside the admin panel',
    { role: 'admin', teacherStatus: 'none', lastScreen: 'admin' }, 'screen:admin');
  await expect('approved teacher refreshing inside teacher mode',
    { role: 'teacher', teacherStatus: 'approved', lastScreen: 'teacher' }, 'teacher');
  await expect('approved teacher refreshing elsewhere still opens teacher mode',
    { role: 'teacher', teacherStatus: 'approved', lastScreen: 'parent' }, 'teacher');
  await expect('plain parent whose tab last showed teacher gets the dashboard',
    { role: 'parent', teacherStatus: 'none', lastScreen: 'teacher' }, 'parent');
  await expect('PENDING teacher is not let into the workspace by a stale tab',
    { role: 'teacher', teacherStatus: 'pending', lastScreen: 'teacher' }, 'parent');

  console.log(`\nTeacher refresh routing: ${checks} checks passed.`);
})().catch(e => { console.error(e.message || e); process.exit(1); });
