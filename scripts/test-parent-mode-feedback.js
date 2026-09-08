'use strict';
// The 🔒 Parent button used to sit for the best part of a second with no sign it
// had registered the tap, which is how a working button gets reported as dead.
// Measured before the fix: three round trips and 904ms, on EVERY tap, for an
// admin. Two things are asserted here, both by measurement:
//
//   1. _loadParentFamily() only retries a missing family for someone who could
//      plausibly have one. The retry exists for the family-setup race — a
//      three-step wizard with no transaction, where a read can land between
//      creating the family and seeing it — and only a parent walks that wizard.
//      ⚠ That race is a null with NO error, so gating on lastFamilyError()
//      would remove the retry in exactly the case it was written for.
//      scripts/test-parent-family-loading.js guards the race from the other side.
//   2. enterParentMode() marks the control busy for the whole await, clears it
//      afterwards, and a second tap while it is busy does not repeat the work.
//
// Run: node scripts/test-parent-mode-feedback.js
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

let SRC = fs.readFileSync(path.join(ROOT, 'engine/auth.js'), 'utf8').replace(/^﻿/, '');
SRC = SRC.replace(/\r/g, '').replace(/\nAuth\.init\(\);\s*$/, '\n');
if (/Auth\.init\(\);/.test(SRC)) throw new Error('Auth.init() still runs - the test would boot the app');

const EXPORT_ANCHOR = '  return {\n    init,';
if (SRC.indexOf(EXPORT_ANCHOR) === -1) throw new Error('export anchor moved');
SRC = SRC.replace(EXPORT_ANCHOR,
  '  return {\n    _loadParentFamily,\n'
  + '    _test: { setWho(u, p) { _parentUser = u; _parentProfile = p; },\n'
  + '             family() { return _family; } },\n'
  + '    init,');

const noop = () => {};

function build(opts) {
  const log = { calls: 0, busy: [], screens: [], dashboards: 0 };
  const sandbox = {
    console: { log: noop, warn: noop, error: noop },
    setTimeout, clearTimeout, setInterval, clearInterval,
    Promise, JSON, Date, Math, Object, Array, String, Number, Boolean, Error,
    URL, URLSearchParams, TextEncoder, crypto: require('crypto').webcrypto,
    localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
    fetch: async () => ({ ok: false, status: 500, json: async () => ({}) }),
    navigator: { onLine: true, vibrate: noop },
    location: { search: '', href: '' },
    document: {
      body: { classList: { add: noop, remove: noop, toggle: noop }, style: {} },
      documentElement: { classList: { add: noop, remove: noop, contains: () => false },
                         removeAttribute: noop, setAttribute: noop },
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener: noop, removeEventListener: noop,
    },
    _sb: { auth: { getSession: async () => ({ data: { session: null } }), onAuthStateChange: noop } },
    Store: new Proxy({
      getMyFamily: async () => { log.calls++; return opts.family ? { id: 'fam-1', family_name: 'Test' } : null; },
      // The wizard race answers null with NO error, which is the whole point.
      lastFamilyError: () => null,
      getFamilyStudents: async () => [],
      lastFamilyStudentsError: () => null,
      saveAccounts: noop,
      logLoginEvent: noop,
    }, { get: (t, k) => (k in t ? t[k] : async () => null) }),
    Events: { on: noop, emit: async () => {} },
    showScreen: (id) => log.screens.push(id),
    setRole: noop, toast: noop, launchConfetti: noop, applyTheme: noop,
    renderParentDashboard: () => { log.dashboards++; },
    setHeaderBtnBusy: (sel, on) => log.busy.push(sel + ':' + (on ? 'on' : 'off')),
    _confirmModal: noop, setStudentToken: noop, getStudentToken: () => null,
    ACTIVE_STUDENT_ID: null, DB: {}, CHAPTERS: [],
    addEventListener: noop, removeEventListener: noop,
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(SRC, sandbox, { filename: 'engine/auth.js' });
  const A = vm.runInContext('Auth', sandbox);
  A._test.setWho({ id: 'u-1' }, { id: 'u-1', role: opts.role });
  return { A, log };
}

let pass = 0;
const ck = (name, cond, detail) => {
  if (cond) { console.log('  ok   ' + name); pass++; return; }
  console.log('  FAIL ' + name + (detail !== undefined ? '  -> ' + detail : ''));
  process.exitCode = 1;
};

(async () => {
  // ── 1. an admin never has a family, so a null is the final answer ─────────
  {
    const { A, log } = build({ role: 'admin', family: null });
    const t0 = Date.now();
    await A._loadParentFamily();
    const ms = Date.now() - t0;
    ck('an admin\'s missing family costs ONE query, not three', log.calls === 1, log.calls);
    ck('…and no retry sleep at all (measured 904ms before)', ms < 150, ms + 'ms');
    ck('…and it still records that there is no family', A._test.family() === null, A._test.family());
  }

  // ── 2. a parent CAN be mid-wizard, so the race retry is untouched ─────────
  {
    const { A, log } = build({ role: 'parent', family: null });
    const t0 = Date.now();
    await A._loadParentFamily();
    const ms = Date.now() - t0;
    ck('a parent\'s missing family still retries three times', log.calls === 3, log.calls);
    ck('…and still backs off between attempts', ms >= 800, ms + 'ms');
  }

  // ── 3. an unknown profile keeps the patient behaviour ────────────────────
  {
    const { A, log } = build({ role: undefined, family: null });
    await A._loadParentFamily();
    ck('an unknown role is treated as a parent, not given up on', log.calls === 3, log.calls);
  }

  // ── 4. a family that exists is found first time ──────────────────────────
  {
    const { A, log } = build({ role: 'parent', family: true });
    await A._loadParentFamily();
    ck('an existing family is still found on the first query', log.calls === 1, log.calls);
    ck('…and is stored', !!A._test.family() && A._test.family().id === 'fam-1');
  }

  // ── 5. the tap is acknowledged for the whole await ───────────────────────
  {
    const { A, log } = build({ role: 'admin', family: null });
    await A.enterParentMode();
    ck('the button is marked busy, then cleared',
      log.busy.join(' ') === '.hdr-btn.is-parent:on .hdr-btn.is-parent:off', log.busy.join(' '));
    ck('and the dashboard actually opens', log.screens.includes('parent'), log.screens.join(','));
  }

  // ── 6. the impatient second tap. A parent is used because that path is the
  //      slow one — with an admin the work finishes before the second tap and
  //      the test would pass without ever overlapping. ───────────────────────
  {
    const { A, log } = build({ role: 'parent', family: null });
    const first  = A.enterParentMode();
    const second = A.enterParentMode();
    await Promise.all([first, second]);
    ck('a second tap while busy does not repeat the work', log.calls === 3, log.calls);
    ck('…and does not open the dashboard twice', log.dashboards === 1, log.dashboards);
    ck('…and the busy state is still balanced',
      log.busy.join(' ') === '.hdr-btn.is-parent:on .hdr-btn.is-parent:off', log.busy.join(' '));
  }

  console.log('');
  console.log(process.exitCode
    ? 'parent-mode feedback: FAILURES above'
    : 'Parent mode feedback checks passed: ' + pass + ' checks. No retry where no family can exist; the setup race is intact.');
})();
