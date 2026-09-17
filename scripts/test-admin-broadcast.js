'use strict';
// ── Admin group email: who is selected, and what the budget line claims ─────
// Run: node scripts/test-admin-broadcast.js
//
// ⚠ Not a browser test. The other admin tests drive real Chrome, which needs
//   Chrome for Testing on this machine; the two rules here are pure state and
//   pure string, so the real engine/admin.js runs in a vm against a stub DOM
//   and this can be run anywhere, by anyone, in under a second.
//
// ⚠ WHY THIS EXISTS. An admin ticked three parents, opened "✉️ Email selected
//   members" and was told "9 recipients", six of them named "Unnamed", with no
//   ticked box anywhere on screen to account for them. Two independent faults:
//
//   1. `toggleSelectAllMembers/Teachers` wrote `cb.checked = on` across EVERY
//      `member-pick-` checkbox in the document. Both lists are in the DOM at
//      once, so the Members select-all silently unticked held TEACHER rows —
//      and unticking it removed only the members from the map. The teachers
//      stayed selected while looking unselected.
//   2. `toggleMemberPick` resolved the display name from `_members` and the
//      pending registrations only, never `_teachers`, so every selected
//      teacher read "Unnamed" on the one screen where the admin checks who
//      they are about to email.
//
//   The fix drives every checkbox FROM `_memberPicks` (`_syncPickCheckboxes`)
//   and scopes each select-all to its own container. This runs the real
//   engine/admin.js in a vm against a stub DOM — the assertions below all fail
//   on the version before that change.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ADMIN_JS = process.env.ADMIN_JS || path.join(__dirname, '..', 'engine', 'admin.js');

const els = [];
function el(props) {
  const e = Object.assign({
    tagName: 'INPUT', checked: false, dataset: {}, id: '', container: null,
    textContent: '', innerHTML: '', value: '',
    classList: { toggle() {}, add() {}, remove() {} },
    focus() {}, querySelector: () => null,
  }, props);
  els.push(e);
  return e;
}

const doc = {
  getElementById: id => els.find(e => e.id === id) || null,
  querySelector: () => null,
  querySelectorAll(sel) {
    const scoped = sel.match(/^#([\w-]+) \[id\^="member-pick-"\]$/);
    if (scoped) return els.filter(e => e.container === scoped[1] && e.id.startsWith('member-pick-'));
    if (sel === '[id^="member-pick-"]') return els.filter(e => e.id.startsWith('member-pick-'));
    if (sel === '[data-select-all]') return els.filter(e => e.dataset.selectAll);
    return [];
  },
  addEventListener() {},
  createElement: () => el({}),
  body: { appendChild() {}, classList: { toggle() {}, add() {}, remove() {} } },
};

// The one server reply the broadcast section under test is about. Swapped per
// case; everything else in the harness stays put.
let serverReply = null;

const sandbox = {
  document: doc, console,
  location: { href: 'http://localhost/', protocol: 'http:', search: '', hash: '' },
  localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
  navigator: { clipboard: {} },
  setTimeout, clearTimeout, setInterval, clearInterval,
  fetch: async () => ({ ok: true, status: 200, json: async () => serverReply }),
  alert() {}, confirm: () => true, toast() {},
  // Provided by engine/supabase.js in the browser; admin.js reads it bare.
  _sb: {
    auth: { getSession: async () => ({ data: { session: { access_token: 'harness' } } }) },
    rpc: async () => ({ data: null, error: null }),
  },
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

const src = fs.readFileSync(ADMIN_JS, 'utf8').replace(/^﻿/, '');
vm.runInContext(src + '\n;globalThis.__AdminPanel = AdminPanel;', sandbox, { filename: 'admin.js' });
const AP = sandbox.__AdminPanel;

// Three parents rendered in the Members list, three teachers in the Teachers
// list, both present at once — which is the whole point.
['m1', 'm2', 'm3'].forEach(id => el({ id: 'member-pick-' + id, container: 'admin-members-list' }));
['t1', 't2', 't3'].forEach(id => el({ id: 'member-pick-' + id, container: 'admin-teachers-list' }));
el({ id: 'sa-members', container: 'admin-members-list', dataset: { selectAll: 'admin-members-list' } });
el({ id: 'sa-teachers', container: 'admin-teachers-list', dataset: { selectAll: 'admin-teachers-list' } });
const box = el({ id: 'admin-bc-recipients' });

const ticked = () => els.filter(e => e.id.startsWith('member-pick-') && e.checked)
  .map(e => e.id.slice('member-pick-'.length));
const shownCount = () => (box.innerHTML.match(/<b>(\d+)<\/b>/) || [])[1];
const headerChecked = id => doc.getElementById(id).checked;

let fails = 0;
function check(label, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) fails++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}` + (ok ? '' : `\n     got  ${JSON.stringify(got)}\n     want ${JSON.stringify(want)}`));
}

AP.toggleSelectAllTeachers(true);
check('select-all in Teachers ticks only the teacher rows', ticked(), ['t1', 't2', 't3']);
check('and only the Teachers header follows',
  [headerChecked('sa-members'), headerChecked('sa-teachers')], [false, true]);

AP.toggleSelectAllMembers(true);
check('select-all in Members adds the parents, keeping the teachers',
  ticked(), ['m1', 'm2', 'm3', 't1', 't2', 't3']);

AP.toggleSelectAllMembers(false);
check('unticking it drops the parents and LEAVES the teachers ticked',
  ticked(), ['t1', 't2', 't3']);

AP.clearMemberPicks();
['m1', 'm2', 'm3'].forEach(id => AP.toggleMemberPick(id, true));
AP.dropRecipient('nobody-here');   // renders the modal's recipient line
check('three ticked boxes means three recipients in the modal', shownCount(), '3');
check('every ticked box is a recipient and nothing else is', ticked(), ['m1', 'm2', 'm3']);

check('each recipient carries its own remove button',
  (box.innerHTML.match(/AdminPanel\.dropRecipient\(/g) || []).length, 3);

AP.dropRecipient('m2');
check('removing one drops it from the list', shownCount(), '2');
check('and unticks its box', ticked(), ['m1', 'm3']);

AP.clearMemberPicks();
check('Clear empties the selection', ticked(), []);

// ── The budget line ────────────────────────────────────────────────────────
// ⚠ The dry run reads the budget BEFORE anything is sent, so the preview has to
//   subtract the send itself. "80 will be left" on a preview of 9, when the
//   answer afterwards is 71, is a number an admin plans the next batch around.
//   The figure after a REAL send is already post-send, so that one is simply
//   stated, and both name the reserve that is held back for account mail.
const modal = {};
['admin-bc-subject', 'admin-bc-message', 'admin-bc-essential', 'admin-bc-status',
 'admin-bc-send', 'admin-bc-form', 'admin-bc-done', 'admin-bc-done-title',
 'admin-bc-done-detail'].forEach(id => { modal[id] = el({ id }); });
modal['admin-bc-subject'].value = 'Test';
modal['admin-bc-message'].value = 'Test';
const statusText = () => modal['admin-bc-status'].textContent;
const has = (s, sub) => s.includes(sub);

(async () => {
  for (let i = 1; i <= 9; i++) AP.toggleMemberPick('p' + i, true);

  serverReply = {
    ok: true, dry_run: true, would_send: 9, eligible: 9, deferred: 0,
    budget_remaining: 80, budget_cap: 100, budget_reserve: 20, skipped: {},
  };
  await AP.broadcastPreview();
  check('the preview says what the send would LEAVE, not what is left now',
    has(statusText(), 'would leave 71'), true);
  check('the preview no longer promises a post-send figure it has not computed',
    has(statusText(), 'will be left'), false);
  check('the preview names the reserve held back for account emails',
    has(statusText(), '20 of it held back for account emails'), true);
  check('and it still says nothing was sent',
    has(statusText(), 'Nothing has been sent'), true);

  serverReply = {
    ok: true, sent: 9, selected: 9, eligible: 9, deferred: 0,
    budget_remaining: 71, budget_cap: 100, budget_reserve: 20,
    skipped: {}, failures: [],
  };
  await AP.sendBroadcast();
  check('a real send reports the budget in the present tense',
    has(modal['admin-bc-done-detail'].textContent, "71 of today's 100 email budget is left"), true);
  check('and confirms it went', has(statusText(), 'Sent to 9 recipients'), true);
  check('the selection is cleared after a send', ticked(), []);

  console.log(fails ? `\n${fails} check(s) failed.` : '\nAll checks passed.');
  process.exit(fails ? 1 : 0);
})();
