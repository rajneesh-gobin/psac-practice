'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  One attempt per device — a teacher-controlled cap on guest assignments.
//
//  ⚠ WHAT WAS ACTUALLY BROKEN, measured on a real laptop before this work:
//  finish a guest assignment, reload, type a DIFFERENT name, sit it again.
//  Identity in a guest assignment is the NAME (guest_submissions.name_key), so
//  the server saw a brand-new pupil and was right to. The same name was already
//  refused; a made-up one never was.
//
//  ⚠ THIS IS A SPEED BUMP, NOT A WALL, and most of this file exists to keep it
//  described that way. The device code lives in localStorage: incognito, a
//  cleared browser and a second phone all defeat it. The control that genuinely
//  caps attempts is a per-pupil-PIN classroom, where name_key is a pupil row id
//  nobody can invent.
//
//  ⚠ AND IT MUST FAIL OPEN. A browser that cannot store a code sends '', and a
//  child in private browsing has to be able to do their homework. That is the
//  opposite of an entitlement check, and the tests below say so in both
//  directions.
//
//  Run: node scripts/test-guest-device-cap.js
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

const mig     = fs.readFileSync(path.join(ROOT, 'migrations/20260910_guest_device_cap.sql'), 'utf8');
const open    = fs.readFileSync(path.join(ROOT, 'netlify/functions/assignment-open.js'), 'utf8');
const guest   = fs.readFileSync(path.join(ROOT, 'guest.js'), 'utf8');
const teacher = fs.readFileSync(path.join(ROOT, 'engine/teacher.js'), 'utf8');
const html    = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const css     = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');

// ── 1 · the column and the switch ─────────────────────────────────────────
section('the schema');
{
  ck('guest_submissions records which device opened the attempt',
    /ALTER TABLE public\.guest_submissions\s+ADD COLUMN IF NOT EXISTS device_code text/.test(mig));
  // ⚠ NULL is a real answer: "this browser could not store a code".
  ck('…nullable, so an old row and a private-mode browser both stay expressible',
    !/device_code text NOT NULL/.test(mig));
  ck('the code is shape-checked in the database too',
    /guest_submissions_device_code_ck[\s\S]{0,160}\^\[0-9a-f\]\{32\}\$/.test(mig));
  ck('…and the CHECK admits NULL rather than rejecting it',
    /CHECK \(device_code IS NULL OR device_code ~/.test(mig));
  ck('the lookup is indexed on (assignment, device)',
    /guest_submissions_device_idx[\s\S]{0,140}\(assignment_id, device_code\)/.test(mig));

  ck('the teacher switch lives on teacher_guest_access',
    /ALTER TABLE public\.teacher_guest_access\s+ADD COLUMN IF NOT EXISTS one_per_device boolean NOT NULL DEFAULT false/.test(mig));
  // ⚠ Default OFF is the whole safety story for shared classroom tablets.
  ck('…and it defaults to OFF', /one_per_device boolean NOT NULL DEFAULT false/.test(mig));
  ck('the column comment says why a shared tablet must not be capped',
    /shared classroom tablet legitimately serves thirty children/i.test(mig));
}

// ── 2 · the rule itself ───────────────────────────────────────────────────
section('the cap');
{
  ck('a malformed or empty device code becomes NULL, never a match',
    /v_device !~ '\^\[0-9a-f\]\{32\}\$' THEN v_device := NULL/.test(mig));
  ck('the cap only runs when the teacher asked for it',
    /IF access\.one_per_device AND v_device IS NOT NULL THEN/.test(mig));
  // ⚠ The three conditions that keep this from breaking legitimate flows.
  const capBlock = mig.slice(mig.indexOf('IF access.one_per_device'), mig.indexOf('SELECT * INTO sub FROM public.guest_submissions'));
  ck('it never fires on the SAME name (name_taken already answers that)',
    /name_key\s*<>\s*key/.test(capBlock));
  ck('it never fires on an unsubmitted attempt',
    /submitted_at IS NOT NULL/.test(capBlock));
  ck('a teacher-granted retry overrules it',
    /NOT g\.retry_allowed/.test(capBlock));
  ck('it is checked AFTER the PIN, so it cannot be used to probe an assignment',
    mig.indexOf("effective_mode = 'shared_pin'") < mig.indexOf('IF access.one_per_device'));
  ck('the refusal names the pupil who already finished on this device',
    /'error','device_used','other_name',v_other/.test(mig));

  // ⚠ A reopen from a browser that lost its code must not wipe the record.
  ck('reopening coalesces the device rather than overwriting it',
    /device_code=coalesce\(v_device, device_code\)/.test(mig));
  ck('a new attempt stores the device it was opened on',
    /INSERT INTO public\.guest_submissions\(assignment_id,name_key,name_display,open_token_hash,device_code\)/.test(mig));
}

// ── 3 · signatures and grants ─────────────────────────────────────────────
section('signatures and grants');
{
  // ⚠ CREATE OR REPLACE cannot change a signature; two overloads a named
  //   PostgREST call can both satisfy is an ambiguity ERROR, not a fallback.
  ck('the five-argument teacher_guest_open is dropped',
    /DROP FUNCTION IF EXISTS public\.teacher_guest_open\(text, text, text, text, boolean\);/.test(mig));
  ck('the five-argument teacher_guest_entry is dropped',
    /DROP FUNCTION IF EXISTS public\.teacher_guest_entry\(text, text, text, text, boolean\);/.test(mig));
  ck('the nine-argument create_assignment is dropped',
    /DROP FUNCTION IF EXISTS public\.teacher_guest_create_assignment\(text, text, jsonb, jsonb, text, uuid, integer, timestamp with time zone, jsonb\);/.test(mig));
  ck('…and each drop happens after the new body exists',
    mig.indexOf('DROP FUNCTION IF EXISTS public.teacher_guest_open') >
    mig.indexOf('CREATE OR REPLACE FUNCTION public.teacher_guest_open'));
  ck('p_device defaults, so the deployed five-argument caller still works',
    /p_device text DEFAULT ''::text/.test(mig));
  ck('p_one_per_device defaults to false for the deployed nine-argument caller',
    /p_one_per_device boolean DEFAULT false/.test(mig));

  // ⚠ A new function inherits Supabase's default privileges INCLUDING anon,
  //   and REVOKE … FROM PUBLIC alone does not remove that.
  ck('the guest-entry functions are revoked from anon explicitly',
    /REVOKE ALL ON FUNCTION public\.teacher_guest_open\(text, text, text, text, boolean, text\) FROM PUBLIC, anon, authenticated/.test(mig)
    && /REVOKE ALL ON FUNCTION public\.teacher_guest_entry\(text, text, text, text, boolean, text\) FROM PUBLIC, anon, authenticated/.test(mig));
  ck('…and granted only to service_role',
    /GRANT EXECUTE ON FUNCTION public\.teacher_guest_open\(text, text, text, text, boolean, text\) TO service_role;/.test(mig));
  ck('the whole migration is one transaction', /^BEGIN;/m.test(mig) && /^COMMIT;/m.test(mig));
}

// ── 4 · the relay ─────────────────────────────────────────────────────────
section('assignment-open.js');
{
  ck('the device is read from the body', /body\.device/.test(open));
  ck('…shape-checked before it is sent', /\[0-9a-f\]\{32\}\$\/\.test\(devRaw\)/.test(open));
  // ⚠ FAILS OPEN. A browser that cannot store a code still gets its homework.
  ck('a bad or missing code is sent as empty, never refused',
    /\? devRaw : ''/.test(open));
  ck('the device reaches the RPC', /p_device: device/.test(open));
  ck('an un-migrated database falls back instead of 502-ing a child out',
    /_signatureMissing\(e\)/.test(open) && /opening without it/.test(open));
  // ⚠ Only a genuine signature error may widen. Falling back on ANY error is
  //   how a filter gets silently dropped and stays dropped.
  ck('…and only on a genuine signature error',
    /if \(!_signatureMissing\(e\)\) throw e;/.test(open));
  ck('the refusal has its own message', /device_used:/.test(open));
}

// ── 5 · the child's browser ───────────────────────────────────────────────
section('guest.js');
{
  ck('the device code is read once, for every mode, not just shared-PIN',
    /Read ONCE, for every mode/.test(guest));
  const openCall = guest.slice(guest.indexOf("api('/api/assignment-open', { code: S.code, name, pin"));
  ck('…and sent on the open call', /device \}\)/.test(openCall.slice(0, 120)));
  ck('the refusal is explained in a child’s words',
    /already finished this homework on this device/.test(guest));
  // ⚠ On a shared family laptop the honest answer is usually "your brother did
  //   it", and a bare refusal reads as a bug.
  ck('…and names who already finished, when the server says',
    /r\.other_name/.test(guest));
  ck('the message points at the teacher, not at a dead end',
    /ask them if you need another|Ask your teacher if you need another/.test(guest));
}

// ── 6 · the teacher's switch ──────────────────────────────────────────────
section('the teacher control');
{
  ck('the checkbox exists', /id="ta-one-device"/.test(html));
  ck('…and starts hidden', /id="ta-one-device-wrap"[^>]*hidden/.test(html));
  ck('it is shown only for the open link',
    /oneDev\.hidden = mode !== 'nickname'/.test(teacher));
  // ⚠⚠ The wizard owns no state and a HIDDEN checkbox still answers .checked,
  //    so hiding it is not enough — the publish path must gate on the mode too,
  //    or a tick left from an earlier visit locks a shared classroom tablet.
  ck('the publish path reads it ONLY for the open link',
    /access === 'nickname' && _el\('ta-one-device'\)\?\.checked/.test(teacher));
  ck('…and sends it as p_one_per_device', /extra\.p_one_per_device = true/.test(teacher));
  ck('it rides the existing extra-args fallback, so an old database degrades',
    teacher.indexOf('extra.p_one_per_device') > teacher.indexOf('const extra = {}')
    && teacher.indexOf('extra.p_one_per_device') < teacher.indexOf('_signatureMissing(r.error)'));

  // ⚠ The label has to say what it COSTS, not just what it does.
  ck('the label warns about shared classroom tablets',
    /share a classroom tablet/i.test(html));
  ck('it is styled for the chalkboard',
    /#screen-teacher \.ta-tab-content \.ta-one-device \{/.test(css));
  ck('…with a 44px-safe target', /\.ta-one-device \{[\s\S]{0,300}min-height: 56px/.test(css));
}

console.log('\n' + (fail ? 'FAILED' : 'PASSED') + ': ' + pass + ' checks passed, ' + fail + ' failed.');
process.exitCode = fail ? 1 : 0;
