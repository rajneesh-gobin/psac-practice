// SKELETON — payment providers not yet wired. Fails closed on all providers.
// See netlify/functions/payment-webhook.js for the full skeleton with TODOs.

export default async function handler(request, env) {
  if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  let payload;
  try { payload = await request.json(); } catch { return new Response('Invalid JSON', { status: 400 }); }

  const { provider, user_id, plan_id, amount_mur, reference } = payload;
  console.log('[payment-webhook] received', { provider, user_id, plan_id, amount_mur, reference });

  return new Response(
    JSON.stringify({ ok: true, message: 'Skeleton - no action taken yet' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
