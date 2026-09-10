'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Shared-PIN classrooms: a device remembers who is using it.
//
//  ⚠ THIS IS A REPAIR AS WELL AS A FEATURE. teacher_guest_open() refuses to
//  reopen a shared-PIN assignment while an unsubmitted row exists for that
//  name — meant to stop one child claiming another's, but unable to tell that
//  from the same child reloading. Measured end to end before this work: sign in
//  as Ben, reload, and you get "Someone with that name has already done this
//  assignment" — a lockout, and untrue. The device code separates the cases.
//
//  ⚠ A DEVICE IS NOT A PERSON, and every layer has to keep saying so: two
//  children sharing a tablet are one device, one child on two devices is two.
//  A good chunk of this file asserts the wording, because that is the part that
//  turns a useful list into a misleading one.
//
//  Run: node scripts/test-shared-pin-devices.js
// ══════════════════════════════════════════════════════════════════════════

const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
let pass = 0, fail = 0;
const ck = (label, ok, detail) => {
  if (ok) { pass++; return; }
  fail++; console.log('  FAIL  ' + label + (detail ? '  [' + detail + ']' : ''));
};
const section = t => console.log('\n── ' + t + ' ──');

const mig    = fs.readFileSync(path.join(ROOT, 'migrations/20260908_shared_pin_devices.sql'), 'utf8');
const fnSrc  = fs.readFileSync(path.join(ROOT, 'netlify/functions/guest-device.js'), 'utf8');
const guest  = fs.readFileSync(path.join(ROOT, 'guest.js'), 'utf8');
const detail = fs.readFileSync(path.join(ROOT, 'engine/teacher_classroom_detail.js'), 'utf8');
const toml   = fs.readFileSync(path.join(ROOT, 'netlify.toml'), 'utf8');
const css    = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');

// ── 1 · what a device code is ─────────────────────────────────────────────
section('the code itself');
{
  ck('generated with crypto.getRandomValues, not Math.random',
    /getRandomValues/.test(guest) && !/Math\.random\(\)[\s\S]{0,80}DEVICE/.test(guest));
  ck('32 hex characters', /\^\[0-9a-f\]\{32\}\$/.test(guest));
  ck('kept in localStorage under a versioned key', /psac_guest_device_v1/.test(guest));
  ck('reused once generated, never regenerated per visit',
    /if \(v && \/\^\[0-9a-f\]\{32\}\$\/\.test\(v\)\) return v;/.test(guest));
  // ⚠ Storage can refuse (private mode). Sign-in must not break over a nicety.
  ck('storage failure returns empty rather than throwing into sign-in',
    /catch \(_\) \{[\s\S]{0,220}return '';/.test(guest));
  ck('the shape is enforced in the Lambda', /\^\[0-9a-f\]\{32\}\$/.test(fnSrc));
  ck('…and again by a CHECK constraint on the table',
    /teacher_guest_devices_code_ck CHECK \(device_code ~ '\^\[0-9a-f\]\{32\}\$'\)/.test(mig));
  // ⚠ Not a fingerprint. Asserted as documentation that must not quietly change.
  ck('it is documented as a device, not a person, in the migration',
    /identifies a DEVICE, not a person/.test(mig));
  ck('…and in the browser', /A DEVICE code, not a person/.test(guest));
}

// ── 2 · the lockout repair ────────────────────────────────────────────────
section('a reload is no longer "name taken"');
{
  ck('only an UNSUBMITTED row is cleared',
    /DELETE FROM public\.guest_submissions[\s\S]{0,140}submitted_at IS NULL/.test(mig));
  // ⚠ The dangerous direction: never delete real work.
  ck('a submitted row is never deleted',
    !/DELETE FROM public\.guest_submissions[\s\S]{0,140}submitted_at IS NOT NULL/.test(mig));
  ck('the row cleared is the shared-key one, not an arbitrary name',
    /v_subkey := 'shared:' \|\| v_key;/.test(mig));
  ck('and only after the name is proven to belong to this device',
    mig.indexOf('name_taken') < mig.indexOf('DELETE FROM public.guest_submissions'));
  ck('teacher_guest_open is NOT modified by this migration',
    !/teacher_guest_open/.test(mig.replace(/--[^\n]*/g, '')), 'the fragile function must stay untouched');
}

// ── 3 · who may claim what ────────────────────────────────────────────────
section('claiming a name');
{
  ck('a name held by another device is refused', /v_owner <> p_device/.test(mig) && /'name_taken'/.test(mig));
  ck('one name per classroom is enforced by a unique index',
    /teacher_guest_devices_name_uq[\s\S]{0,90}\(classroom_id, name_key\)/.test(mig));
  // ⚠ Shared classes only: a per-pupil-PIN class has a real roster, and a device
  //   claim there would be a second, weaker way to become a pupil.
  ck('per-pupil-PIN classrooms are refused', /access_type <> 'shared'/.test(mig) && /'not_shared'/.test(mig));
  ck('an expired or inactive assignment is refused', /'expired'/.test(mig));
  ck('a device may rename itself, releasing the old name',
    /ON CONFLICT \(classroom_id, device_code\)[\s\S]{0,140}name_key\s+= EXCLUDED\.name_key/.test(mig));
  ck('control characters are stripped from the name', /\[\[:cntrl:\]\]\+/.test(mig));
  ck('the table has no direct write grant',
    /REVOKE ALL ON public\.teacher_guest_devices FROM anon, authenticated/.test(mig));
  ck('RLS is on', /ALTER TABLE public\.teacher_guest_devices ENABLE ROW LEVEL SECURITY/.test(mig));
  ck('the claim RPC is granted to anon', /guest_device_claim\(text, text, text\) TO anon, authenticated/.test(mig));
  ck('the teacher RPC revokes anon explicitly',
    /REVOKE ALL ON FUNCTION public\.teacher_guest_device_list\(uuid\) FROM anon/.test(mig));
  ck('idempotent', (mig.match(/IF NOT EXISTS/g) || []).length >= 3);
}

// ── 4 · the endpoint ──────────────────────────────────────────────────────
section('the Lambda');
{
  ck('POST only', /method_not_allowed/.test(fnSrc));
  ck('fails closed with no service key', /not_configured/.test(fnSrc) && /503/.test(fnSrc));
  ck('forwards to the RPC and writes no table itself',
    /rpc\/guest_device_claim/.test(fnSrc) && !/teacher_guest_devices/.test(fnSrc));
  ck('has a timeout', /AbortSignal\.timeout/.test(fnSrc));
  ck('the route is redirected', /from   = "\/api\/guest-device"/.test(toml));
}

// ── 5 · the sign-in flow ──────────────────────────────────────────────────
section('guest.html');
{
  ck('the claim happens only for shared-PIN classes', /if \(S\.access === 'shared_pin'\) \{/.test(guest));
  ck('…and before the assignment is opened',
    guest.indexOf("api('/api/guest-device'") < guest.indexOf("api('/api/assignment-open', { code: S.code, name, pin"));
  // ⚠ Best effort. A failed claim must never block a child from their homework.
  ck('a failed claim does not block sign-in',
    /catch \(_\) \{ \/\* carry on: the claim is an improvement, not a gate \*\//.test(guest));
  // ⚠ …except the one refusal that is real and actionable.
  ck('a genuinely taken name IS surfaced, with advice',
    /claim\.error === 'name_taken'/.test(guest) && /add your surname/i.test(guest));
  ck('the button is re-enabled when that happens', /btn\.disabled = false; btn\.textContent = 'Start';/.test(guest));
  ck('the name is still remembered on the device', /_saveNick\(/.test(guest));
}

// ── 6 · the teacher's list ────────────────────────────────────────────────
section('the classroom Pupils section');
{
  ck('the list is rendered for a shared class', /_deviceListHtml\(\)/.test(detail));
  ck('it is only loaded for a shared class', /_accessType === 'shared'\) await _loadDevices/.test(detail));
  ck('an empty class explains itself rather than showing nothing',
    /No devices have joined yet/.test(detail));
  // ⚠ The wording is the feature. "Pupils" here would be a lie.
  ck('the heading counts DEVICES, not pupils', /' device' \+ \(list\.length === 1 \? '' : 's'\)/.test(detail));
  ck('…and the caption says the names are self-typed',
    /names pupils typed themselves on each device/.test(detail));
  ck('names are escaped', /esc\(d\.name \|\| '\?'\)/.test(detail));
  // ⚠ Only a fragment of the code ever leaves the database.
  ck('only the last 6 characters of the device code are exposed',
    /right\(device_code, 6\)/.test(mig));
  ck('…and the browser never sees the full code from the server',
    !/device_code/.test(detail.slice(detail.indexOf('_deviceListHtml'), detail.indexOf('_loadDevices'))));
  ck('a failed load still renders the PIN banner',
    /catch \(_\) \{ \/\* the PIN banner still renders \*\//.test(detail));
  ck('the list resets when another classroom opens', /_devices = \[\];/.test(detail));
  ck('it is styled for the chalkboard', /#screen-teacher#screen-teacher \.tc-cd-device-tag/.test(css));
}

console.log('\n' + (fail ? 'FAILED' : 'PASSED') + ': ' + pass + ' checks passed, ' + fail + ' failed.');
process.exitCode = fail ? 1 : 0;
