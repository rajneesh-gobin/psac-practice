#!/usr/bin/env node
'use strict';
// ═══════════════════════════════════════════════════════════════════════════
//  Manual MCB Juice payments — the client half.
//
//  The SQL half is scripts/sql-tests/run-juice-tests.sh, which builds the
//  schema from nothing on a throwaway postgres and proves that access is
//  granted only by an admin confirming a real transfer. This file guards the
//  half that harness cannot see: that the BROWSER never grants anything, never
//  computes a price, and never contradicts the "everything is free" promise.
//
//  ⚠ It also re-checks netlify/functions/payment-webhook.js. That file's three
//    verifiers each returned TRUE directly above a commented-out block that
//    activated subscriptions from the request body — whoever turned payments
//    on would have shipped an endpoint granting paid plans to anyone who could
//    POST JSON. They must stay fail-closed until a real signature check exists.
// ═══════════════════════════════════════════════════════════════════════════

const fs = require('node:fs');
const assert = require('node:assert/strict');

let checks = 0;
const ok = (cond, msg) => { assert(cond, msg); checks++; };

const mig   = fs.readFileSync('migrations/20260910_manual_juice_payments.sql', 'utf8');
const app   = fs.readFileSync('engine/app.js', 'utf8');
const admin = fs.readFileSync('engine/admin.js', 'utf8');
const html  = fs.readFileSync('index.html', 'utf8');
const hook  = fs.readFileSync('netlify/functions/payment-webhook.js', 'utf8');

// ── 1. The webhook skeleton is still fail-closed ────────────────────────────
// ⚠ The single most dangerous file in the repo while payments are being built.
for (const fn of ['_verifyStripe', '_verifyJuice', '_verifyMytMoney']) {
  const body = hook.slice(hook.indexOf(`function ${fn}(`), hook.indexOf('}', hook.indexOf(`function ${fn}(`)));
  ok(/return false;/.test(body) && !/return true;/.test(body),
    `${fn}() still fails closed`);
}
ok(!/await sb\.from\('subscriptions'\)\.insert/.test(hook) || /^\s*\/\//m.test(hook),
  'the webhook still grants nothing');

// ── 2. Nothing in the browser grants access ─────────────────────────────────
// ⚠ The client decides what to DRAW. Only the server decides what a family
//   receives, so no browser file may write these three things.
const juiceAdmin = admin.slice(admin.indexOf('async function loadJuice()'),
                              admin.indexOf('async function showPlanHistory'));
ok(juiceAdmin.length > 500, 'the Juice admin block was found');
// ⚠ Both slices are the PAYMENT code only. app.js and admin.js each write
//   profiles elsewhere for their own reasons (a parent saving their name,
//   AdminPanel.setExpiry correcting one account by hand). What must never
//   exist is a payment that grants access without going through the RPC.
const juiceApp = app.slice(app.indexOf('let _juiceCfg = null;'),
                           app.indexOf('function closePlansModal'));
ok(juiceApp.length > 500, 'the Juice parent block was found');
for (const [file, src] of [['the Juice parent block', juiceApp], ['the Juice admin block', juiceAdmin]]) {
  ok(!/\.from\(['"]subscriptions['"]\)[\s\S]{0,80}\.(insert|update|upsert)/.test(src),
    `${file} never writes subscriptions directly`);
  ok(!/\.from\(['"]payments['"]\)[\s\S]{0,80}\.(insert|update|upsert)/.test(src),
    `${file} never writes payments directly`);
  ok(!/\.from\(['"]profiles['"]\)[\s\S]{0,160}\.update\(/.test(src),
    `${file} never writes profiles directly`);
}
ok(/rpc\('payment_admin_confirm'/.test(admin), 'confirming goes through the RPC that re-checks is_admin()');
ok(/rpc\('payment_admin_reject'/.test(admin), 'so does rejecting');
ok(/rpc\('payment_start_juice'/.test(app) && /rpc\('payment_mark_sent'/.test(app),
  'the parent flow goes through its two RPCs');

// ── 3. The browser never computes an amount ─────────────────────────────────
// ⚠ Every price the parent sees is the one the server wrote on the row. There
//   is no parameter to pass one, and this is what keeps it that way.
ok(!/p_amount|amount_mur\s*:/.test(app), 'app.js never sends an amount');
ok(/_formatMur\(p\.amount_mur\)/.test(app), 'and shows the amount the RPC returned');
const startCall = app.slice(app.indexOf("rpc('payment_start_juice'"), app.indexOf("rpc('payment_start_juice'") + 160);
ok(/p_plan_id/.test(startCall) && /p_months/.test(startCall) && !/amount/.test(startCall),
  'starting a payment sends only a plan and a number of months');

// ── 4. "Everything is free" and a Buy button cannot both be true ────────────
ok(/data-free-banner/.test(html), 'the free-right-now banner is tagged');
ok(/data-free-banner[\s\S]{0,200}classList\.toggle\('hidden', canPay\)/.test(app),
  'and it comes down exactly when paying becomes possible');
ok(/const canPay = _juiceOn\(juice\)/.test(app), 'the Buy button is gated on the same flag');
ok(/canPay && p\.price_mur > 0/.test(app),
  'a free plan never grows a Buy button even when Juice is on');
ok(/juice_enabled && cfg\.juice_number/.test(app),
  'and a missing Juice number counts as off — instructions with no number to send to are worse than no button');
// A settings lookup that fails must not offer a payment method that may not exist.
ok(/catch[\s\S]{0,160}_juiceCfg = \{ juice_enabled: false \}/.test(app),
  'a failed settings lookup reads as OFF, not as on');

// ── 5. The admin cannot confirm by accident ─────────────────────────────────
ok(/confirm\(`Confirm you have received Rs \$\{amount\} with reference \$\{reference\}\?/.test(admin),
  'the confirm dialog names the amount and the reference');
ok(/if \(on && !num\)/.test(admin), 'Juice cannot be switched on without a number');

// ── 6. The migration's own guards ───────────────────────────────────────────
ok(/CREATE UNIQUE INDEX IF NOT EXISTS payments_reference_uq/.test(mig), 'references are unique');
ok(/CREATE UNIQUE INDEX IF NOT EXISTS payments_provider_ref_uq/.test(mig),
  'and (provider, provider_ref) is unique, ready for a real gateway webhook');
ok(/IF v_row\.status = 'confirmed' THEN[\s\S]{0,200}'already', true/.test(mig),
  'confirming twice reports "already" instead of granting twice');
ok(/greatest\(now\(\), coalesce\(expires_at, now\(\)\)\)/.test(mig),
  'renewing early adds to the days left rather than resetting them');
ok(/UPDATE public\.subscriptions[\s\S]{0,120}SET status = 'superseded'/.test(mig),
  'one active subscription per user');
ok(/UPDATE public\.profiles SET expires_at = v_new_exp/.test(mig),
  'and profiles.expires_at — the gate questions.js actually reads — moves with it');
// ⚠ Returning the stored jsonb whole would publish whatever an admin later
//   adds to that key to every signed-out visitor.
ok(/jsonb_build_object\(\s*\n\s*'juice_enabled'/.test(mig),
  'payment_settings() builds its result field by field');
ok(/FROM PUBLIC, anon;/.test(mig),
  'the action functions are revoked from PUBLIC, not just anon — anon is a member of PUBLIC');
ok(/v_plan\.price_mur \* v_months/.test(mig), 'the amount is computed from plans.price_mur server-side');

console.log(`Manual Juice payments (client half): ${checks} checks passed.`);
