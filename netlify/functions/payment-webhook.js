'use strict';
// ══════════════════════════════════════════════════════════════
//  PSAC Exam Practice — Payment Webhook (SKELETON)
//
//  This endpoint will receive payment confirmations from
//  payment providers and activate the matching subscription.
//
//  Supported providers (when implemented):
//    - manual       : admin activates via dashboard (no webhook)
//    - bank_transfer: admin confirms receipt, calls /admin-activate
//    - stripe       : POST from Stripe webhook (event: checkout.session.completed)
//    - juice        : POST from MCB Juice merchant callback
//    - myt_money    : POST from MYT Money callback
//
//  Wire-up checklist per provider:
//    Stripe     → set STRIPE_WEBHOOK_SECRET env var, verify signature
//    Juice      → set JUICE_MERCHANT_KEY env var, verify HMAC
//    MYT Money  → set MYT_SECRET env var, verify signature
//
//  All providers must POST JSON with at least:
//    { provider, user_id, plan_id, amount_mur, reference }
// ══════════════════════════════════════════════════════════════

const { createClient } = require('@supabase/supabase-js');

const SB_URL = process.env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // service role — never expose in frontend

function _sb() {
  if (!SB_KEY) return null;
  return createClient(SB_URL, SB_KEY);
}

// ── Provider signature verifiers (TODO: implement per provider) ──
function _verifyStripe(body, sig, secret) {
  // TODO: use stripe.webhooks.constructEvent(body, sig, secret)
  return true; // placeholder — REMOVE before going live
}

function _verifyJuice(body, sig, secret) {
  // TODO: verify HMAC-SHA256 of body with JUICE_MERCHANT_KEY
  return true; // placeholder — REMOVE before going live
}

function _verifyMytMoney(body, sig, secret) {
  // TODO: verify MYT Money signature per their docs
  return true; // placeholder — REMOVE before going live
}

// ── Main handler ─────────────────────────────────────────────
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { provider, user_id, plan_id, amount_mur, reference, months } = payload;

  // ── SKELETON: log the incoming webhook and return 200 ──────
  // When real providers are integrated, add signature verification
  // above this block and replace the TODO sections.
  console.log('[payment-webhook] received', { provider, user_id, plan_id, amount_mur, reference });

  // TODO: verify provider signature before trusting payload
  // switch (provider) {
  //   case 'stripe':    if (!_verifyStripe(...)) return { statusCode: 401, body: 'Bad signature' }; break;
  //   case 'juice':     if (!_verifyJuice(...))  return { statusCode: 401, body: 'Bad signature' }; break;
  //   case 'myt_money': if (!_verifyMytMoney(...)) return { statusCode: 401, body: 'Bad signature' }; break;
  // }

  // TODO: activate subscription in DB
  // const sb = _sb();
  // if (!sb) return { statusCode: 500, body: 'DB not configured' };
  // const exp = new Date(); exp.setMonth(exp.getMonth() + (months || 1));
  // await sb.from('subscriptions').insert({ user_id, plan_id, status: 'active', expires_at: exp });
  // await sb.from('payments').insert({
  //   user_id, plan_id, amount_mur: amount_mur || 0,
  //   provider: provider || 'unknown', provider_ref: reference,
  //   status: 'completed', processed_at: new Date().toISOString(),
  // });

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true, message: 'Skeleton — no action taken yet' }),
  };
};
