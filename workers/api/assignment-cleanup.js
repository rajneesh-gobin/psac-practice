// POST /api/assignment-cleanup (or triggered as a Cloudflare Cron)
// Calls guest_cleanup() to expire old assignments and prune stale data.

export default async function handler(request, env) {
  const sbUrl = env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
  const sbKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!sbKey) {
    console.error('[assignment-cleanup] SUPABASE_SERVICE_ROLE_KEY not set');
    return new Response('not_configured', { status: 200 });
  }

  try {
    const res = await fetch(`${sbUrl}/rest/v1/rpc/guest_cleanup`, {
      method: 'POST',
      headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}`, 'Content-Type': 'application/json' },
      body: '{}',
    });
    if (!res.ok) {
      console.error('[assignment-cleanup] failed:', res.status, await res.text());
      return new Response('failed', { status: 500 });
    }
    const out = await res.json();
    console.log('[assignment-cleanup]', JSON.stringify(out));
    return new Response(JSON.stringify(out), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('[assignment-cleanup]', e.message);
    return new Response('error', { status: 500 });
  }
}

// Cloudflare Cron Trigger entry point (add to wrangler.toml: crons = ["17 2 * * *"])
export async function scheduled(event, env, ctx) {
  await handler(new Request('https://nouklass.com/api/assignment-cleanup', { method: 'POST' }), env);
}
