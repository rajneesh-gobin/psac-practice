'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  The per-member "✉️ Send mail" shortcut in the admin Members list.
//
//  ⚠ IT MUST NOT BE A mailto: LINK. admin@nouklass.com is a Cloudflare Email
//    Routing forwarder with no mailbox, so no mail client can send as it — a
//    mailto: goes out from whatever personal account the admin has configured,
//    which is the exact problem the in-app compose form was built to fix. This
//    asserts the button reaches openCompose(), not the mail client.
//
//  ⚠ THE ADDRESS IS NOT ON THE ROW YET. An activated member's email is fetched
//    lazily by _loadMemberEmails() and painted in afterwards, so a click before
//    that request lands must trigger the fetch rather than report "no email".
//
//  ⚠ A MISS IS CACHED AS null. Read through `|| ''`: String(null) is the word
//    "null", which would prefill the compose form with it and look like a real
//    address.
//
//  Runs the REAL sendMailTo() extracted from engine/admin.js — it lives inside
//  the AdminPanel IIFE and is unreachable from outside, and a copy here would
//  assert against itself.
//
//  Run:  node scripts/test-admin-send-mail.js
// ══════════════════════════════════════════════════════════════════════════

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const SRC = fs.readFileSync(path.resolve(__dirname, '../engine/admin.js'), 'utf8');

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('OK   ' + label); }
  else { fail++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail).slice(0, 300) : '')); }
};

function extract(name) {
  const needle = '\n  async function ' + name + '(';
  const starts = [];
  let from = 0, at;
  while ((at = SRC.indexOf(needle, from)) !== -1) { starts.push(at); from = at + 1; }
  if (starts.length !== 1) return { src: null, count: starts.length };
  let i = SRC.indexOf('{', starts[0] + needle.length), depth = 0, end = -1;
  for (let j = i; j < SRC.length; j++) {
    const c = SRC[j];
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { end = j; break; } }
  }
  return { src: SRC.slice(starts[0] + 1, end + 1), count: 1 };
}

const got = extract('sendMailTo');
ok('sendMailTo() is defined exactly once in engine/admin.js', got.count === 1, got.count);

function run({ emails = {}, pending = [], fetches = {} } = {}) {
  const calls = { compose: [], toasts: [], loaded: [] };
  const ctx = vm.createContext({
    _memberEmails: { ...emails },
    _pendingRegistrations: pending,
    openCompose: v => calls.compose.push(v),
    toast: m => calls.toasts.push(m),
    async _loadMemberEmails(ids) {
      calls.loaded.push(ids);
      for (const id of ids) if (id in fetches) ctx._memberEmails[id] = fetches[id];
    },
  });
  vm.runInContext(got.src + '\nthis.f = sendMailTo;', ctx);
  return { calls, go: id => ctx.f(id), ctx };
}

(async () => {
  if (got.src) {
    // ── 1 · the address is already known ─────────────────────────────────
    {
      const r = run({ emails: { u1: 'parent@example.com' } });
      await r.go('u1');
      ok('opens the in-app compose with the member’s address',
        r.calls.compose.length === 1 && r.calls.compose[0] === 'parent@example.com', r.calls);
      ok('and raises no error toast', r.calls.toasts.length === 0, r.calls.toasts);
      ok('without needing a fetch', r.calls.loaded.length === 0, r.calls.loaded);
    }

    // ── 2 · an unfinished-setup row, which has no profile ────────────────
    {
      const r = run({ pending: [{ id: 'p1', email: 'newsignup@example.com' }] });
      await r.go('p1');
      ok('falls back to the pending-registration list',
        r.calls.compose[0] === 'newsignup@example.com', r.calls);
    }

    // ── 3 · clicked before the lazy email fetch has landed ───────────────
    {
      const r = run({ fetches: { u2: 'later@example.com' } });
      await r.go('u2');
      ok('fetches the address when the row does not have it yet',
        r.calls.loaded.length === 1, r.calls.loaded);
      ok('and then composes to it', r.calls.compose[0] === 'later@example.com', r.calls);
    }

    // ── 4 · the cached-miss trap ─────────────────────────────────────────
    // ⚠ _loadMemberEmails stores null for an account whose auth row is gone.
    {
      const r = run({ emails: { u3: null } });
      await r.go('u3');
      ok('a cached null never becomes the literal string "null"',
        !r.calls.compose.includes('null'), r.calls.compose);
      ok('and it says so rather than opening an empty form',
        r.calls.compose.length === 0 && r.calls.toasts.length === 1, r.calls);
    }

    // ── 5 · genuinely no address ─────────────────────────────────────────
    {
      const r = run();
      await r.go('nobody');
      ok('no address anywhere: warns and opens nothing',
        r.calls.compose.length === 0 && /no email address/i.test(r.calls.toasts[0] || ''), r.calls);
    }
  }

  // ── 6 · the wiring ─────────────────────────────────────────────────────
  ok('sendMailTo is exported on AdminPanel', /\bsendMailTo,/.test(SRC));
  ok('the unfinished-setup rows carry a Send mail button',
    /AdminPanel\.sendMailTo\('\$\{r\.id\}'\)/.test(SRC));
  ok('the activated-member rows carry one too',
    /AdminPanel\.sendMailTo\('\$\{m\.id\}'\)/.test(SRC));
  ok('the teachers list carries one',
    /AdminPanel\.sendMailTo\('\$\{t\.id\}'\)/.test(SRC));
  // ⚠ Every member list should reach it. Four call sites: pending setup, the
  //   member row, the member detail panel, the teachers list, and the teacher
  //   approval queue — the last two both keyed on different row variables.
  ok('it is wired from at least four places',
    (SRC.match(/AdminPanel\.sendMailTo\(/g) || []).length >= 4,
    (SRC.match(/AdminPanel\.sendMailTo\(/g) || []).length);
  // ⚠ The member and teacher rows are CLICK-TO-EXPAND. A button inside one
  //   without stopPropagation writes to the person AND toggles their panel.
  const rowButtons = [...SRC.matchAll(/onclick="([^"]*sendMailTo[^"]*)"/g)].map(m => m[1]);
  const inRow = rowButtons.filter(h => /event\.stopPropagation\(\)/.test(h));
  ok('the in-row buttons stop the row-expand click',
    inRow.length >= 2, rowButtons);
  // ⚠ The rule is about MEMBERS, not the whole file. There is one legitimate
  //   mailto: in admin.js — a guest who used the contact form has NO ACCOUNT,
  //   so the in-app compose cannot reach them and the address they typed is the
  //   only way back. Asserting "no mailto: anywhere" flagged that as a fault;
  //   the real rule is that a person WITH an account is written to in-app.
  ok('sendMailTo itself never hands off to a mail client',
    got.src && !/mailto:/i.test(got.src), got.src && got.src.slice(0, 120));
  const mailtos = [...SRC.matchAll(/href="mailto:/gi)].length;
  ok('the only mailto: left is the account-less contact-form guest',
    mailtos === 1 && /Sent from the contact form - no account/.test(SRC), mailtos);

  // ── 7 · emailing the whole filtered group without the clipboard ────────
  {
    const got2 = (() => {
      const needle = '\n  async function emailMemberGroup(';
      const at = SRC.indexOf(needle);
      if (at === -1) return null;
      let i = SRC.indexOf('{', at + needle.length), depth = 0, end = -1;
      for (let j = i; j < SRC.length; j++) {
        const c = SRC[j];
        if (c === '{') depth++;
        else if (c === '}') { depth--; if (depth === 0) { end = j; break; } }
      }
      return SRC.slice(at + 1, end + 1);
    })();
    ok('emailMemberGroup() exists', !!got2);
    ok('it is exported on AdminPanel', /\bemailMemberGroup,/.test(SRC));
    // ⚠ This button is in index.html, not admin.js — the member ROWS are built
    //   by admin.js but the toolbar above them is static markup.
    const HTML = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    ok('the toolbar has a button for it', /AdminPanel\.emailMemberGroup\(\)/.test(HTML));
    ok('and admin.js relabels it with the filter',
      /admin-email-group/.test(SRC) && /Email the unfinished setups/.test(SRC));
    // ⚠ BOTH buttons must walk the same list, including unloaded pages. Two
    //   collectors would let an admin copy one set of people and email another.
    ok('copy and email share one collector',
      (SRC.match(/_collectMemberEmails\(/g) || []).length >= 3,
      (SRC.match(/_collectMemberEmails\(/g) || []).length);
    if (got2) {
      // ⚠ /api/admin-compose caps at MAX_TO = 20 and rejects the whole send
      //   above it. Prefilling the first 20 of a longer list looks like it
      //   worked and quietly leaves people out.
      ok('it refuses above the compose cap instead of truncating',
        /MAX_COMPOSE_TO/.test(got2) && !/\.slice\(0,\s*MAX_COMPOSE_TO\)/.test(got2), got2.slice(0, 200));
      ok('and it opens the compose form with the addresses',
        /openCompose\(list\.join/.test(got2));
    }
    // the cap must match the server's, or the form accepts what the API refuses
    const serverCap = (fs.readFileSync(path.resolve(__dirname, '../workers/api/admin-compose.js'), 'utf8')
      .match(/const MAX_TO\s*=\s*(\d+)/) || [])[1];
    const clientCap = (SRC.match(/const MAX_COMPOSE_TO\s*=\s*(\d+)/) || [])[1];
    ok('the client cap matches the server MAX_TO', serverCap && clientCap && serverCap === clientCap,
      { server: serverCap, client: clientCap });
  }

  console.log(`\nAdmin send mail: ${pass} passed, ${fail} failed.`);
  process.exit(fail ? 1 : 0);
})();
