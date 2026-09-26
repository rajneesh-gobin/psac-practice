// POST /api/activity-prune (also triggered by the 03:00 Cloudflare Cron)
//
// Keeps public.activity_events to its stated size: the last KEEP events PER
// ACTOR, and nothing older than DAYS.
//
// ⚠ A GLOBAL "LAST N" WOULD NOT WORK. One child in one evening writes 30-60
//   rows, so a global cap is spent entirely on whoever used the app most
//   recently and every other family shows an empty trail. The cap is per actor
//   and the age limit is what stops a dormant account holding rows for ever.
//
// ⚠ THIS EXISTS BECAUSE THERE IS NO pg_cron ON THIS DATABASE. Measured, not
//   assumed: the installed extensions are pg_stat_statements, pgcrypto,
//   plpgsql, supabase_vault and uuid-ossp. Without this handler the retention
//   the admin panel PROMISES ("kept 30 days · last 500 per person") would never
//   run, and the table would grow without limit.
//
// ⚠ The deleting is done by prune_activity_events() inside the database, not by
//   fetching ids and deleting them one by one here: the per-actor cap is a
//   window function, and a Worker cannot express it without pulling the whole
//   table across the wire.

const KEEP = 500;
const DAYS = 30;

export default async function handler(request, env) {
  const sbUrl = env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
  const sbKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!sbKey) return new Response('not_configured', { status: 200 });

  const res = await fetch(`${sbUrl}/rest/v1/rpc/prune_activity_events`, {
    method: 'POST',
    headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_keep: KEEP, p_days: DAYS }),
  });

  if (!res.ok) {
    // A missing function means the migration has not been applied. Say which,
    // because "500" in a cron log is a week of guessing.
    console.error('activity-prune: rpc failed', res.status, (await res.text()).slice(0, 200));
    return new Response('error', { status: 500 });
  }
  const out = await res.json().catch(() => null);
  console.log('activity-prune:', JSON.stringify(out));
  return new Response('ok', { status: 200 });
}

export async function scheduled(event, env, ctx) {
  await handler(new Request('https://nouklass.com/api/activity-prune', { method: 'POST' }), env);
}
