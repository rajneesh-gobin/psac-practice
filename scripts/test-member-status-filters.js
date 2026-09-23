'use strict';
// The Members screen has FOUR status filters backed by TWO tables:
//
//   active → profiles          pending → auth.users (state=pending)
//   all    → both              setup   → auth.users (state=setup)
//
// ⚠ WHAT THIS GUARDS. `setup` was added to a file that decided "which table"
//   by asking `status !== 'pending'`. Every one of those negatives quietly
//   classes the new filter as profile-backed - and a `setup` account has no
//   profiles row by definition, so Copy emails and the broadcast audience would
//   hand back the wrong people with no error anywhere. A filter is not added
//   until every one of these places knows about it.
//
// Source-level, deliberately: these are the wiring points, and the failure they
// prevent is one of them being missed, not one of them misbehaving at runtime.
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const admin = fs.readFileSync(path.join(ROOT, 'engine', 'admin.js'), 'utf8');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const worker = fs.readFileSync(path.join(ROOT, 'workers', 'api', 'pending-registrations.js'), 'utf8');

let failures = 0;
const check = (ok, msg) => ok ? console.log(`  ✓ ${msg}`) : (failures++, console.log(`  ✗ ${msg}`));

console.log('Members status filters — active | pending | setup | all\n');

// ── The option exists and is spelled the way the handler expects ────────────
check(/<option value="setup">/.test(html), 'index.html offers the "setup" option');
check(/\['active', 'pending', 'setup', 'all'\]\.includes\(filter\)/.test(admin),
  'setMemberStatusFilter accepts "setup" (an unlisted value falls back to active)');

// ── One helper decides which table a filter reads ───────────────────────────
check(/const _pendingState = /.test(admin) && /const _isPendingList = /.test(admin),
  '_pendingState / _isPendingList exist as the single definition');

// ⚠ THE CORE RULE. No decision about which table to read may be written as a
//   negative against ONE filter value.
//
// ⚠ Scoped to the two functions that make that decision, NOT to the whole file:
//   `status !== 'pending'` also appears on a teacher REQUEST row and
//   `status !== 'active'` on an ASSIGNMENT, neither of which is this filter. A
//   whole-file grep reported both as failures on the first run.
// ⚠ Walk the PARAMETER LIST by paren depth before looking for the body brace.
//   Two shortcuts both failed here: the first `{` after the name is a
//   destructured parameter (`{ inMainList = false }`), which balances on its
//   own, and the first `)` is the one inside a default value
//   (`state = _pendingState()`), not the end of the signature.
function fnBody(src, header) {
  const start = src.indexOf(header);
  if (start < 0) throw new Error('function not found: ' + header);
  let i = src.indexOf('(', start), parens = 0;
  for (; i < src.length; i++) {
    if (src[i] === '(') parens++;
    else if (src[i] === ')' && --parens === 0) break;
  }
  let depth = 0;
  for (let j = src.indexOf('{', i); j < src.length; j++) {
    if (src[j] === '{') depth++;
    else if (src[j] === '}' && --depth === 0) return src.slice(start, j + 1);
  }
  throw new Error('unbalanced: ' + header);
}

const scoped = [
  ['async function copyMemberEmails()', ["status !== 'pending'", "status !== 'active'"]],
  ['async function broadcastAudience()', ["_memberStatusFilter !== 'pending'", "_memberStatusFilter !== 'active'"]],
  ['async function loadMembers(', ["_memberStatusFilter === 'pending'"]],
];
for (const [header, patterns] of scoped) {
  const body = fnBody(admin, header);
  const name = header.replace(/^async function /, '').replace(/\($/, '');
  for (const pattern of patterns) {
    check(!body.includes(pattern),
      `no "${pattern}" left in ${name} — it silently misclassifies a fourth filter`);
  }
}

// ── Every caller that reaches the endpoint names a state ────────────────────
const calls = admin.match(/_pendingRegistrationRequest\('GET'[^;]*;/gs) || [];
check(calls.length >= 3, `found ${calls.length} GET calls to /api/pending-registrations`);
for (const call of calls) {
  const one = call.replace(/\s+/g, ' ').slice(0, 80);
  check(/state=/.test(call), `a GET carries an explicit state → ${one}…`);
}

// ── The renderer must not offer Activate on an already-active account ───────
check(/_pendingRowMeta/.test(admin), 'setup rows render their own meta line');
check(/\$\{setup \? ''/.test(admin),
  'the "Activate manually" button is omitted for setup rows (they answer 409)');
check(/last_sign_in_at/.test(admin),
  'the row says whether the person ever signed in');

// ── The worker end of the contract ──────────────────────────────────────────
check(/state === 'setup'/.test(worker), 'the worker understands state=setup');
check(/isSetupUnfinished/.test(worker), 'the worker has a distinct setup predicate');
check(/if \(state === 'setup' && !profiled\) return json\(500/.test(worker),
  'a failed profiles read fails the request instead of answering the other question');
check(/last_sign_in_at: user\.last_sign_in_at/.test(worker),
  'the worker returns last_sign_in_at');

console.log(failures ? `\n✗ ${failures} failure(s)` : '\n✓ all checks passed');
process.exit(failures ? 1 : 0);
