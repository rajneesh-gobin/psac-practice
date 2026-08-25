'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Scheduled function — daily. Schedule lives in netlify.toml:
//      [functions."assignment-cleanup"]  schedule = "17 2 * * *"
//
//  Calls guest_cleanup(), which:
//    • marks active assignments past expires_at as 'expired'
//    • DELETES guest submissions older than 90 days
//    • prunes stale rate-limit rows
//
//  The 90-day delete matters: these rows hold children's first names and IP
//  addresses for pupils who never consented to an account. Retaining them
//  indefinitely is not defensible, so deletion is the default, not an option.
// ══════════════════════════════════════════════════════════════════════════

const SB_URL = process.env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

exports.handler = async () => {
  if (!SB_KEY) {
    console.error('[assignment-cleanup] SUPABASE_SERVICE_ROLE_KEY not set - skipping');
    return { statusCode: 200, body: 'not_configured' };
  }

  try {
    const res = await fetch(`${SB_URL}/rest/v1/rpc/guest_cleanup`, {
      method: 'POST',
      headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, 'Content-Type': 'application/json' },
      body: '{}',
    });

    if (!res.ok) {
      console.error('[assignment-cleanup] failed:', res.status, await res.text());
      return { statusCode: 500, body: 'failed' };
    }

    const out = await res.json();
    console.log('[assignment-cleanup]', JSON.stringify(out));
    return { statusCode: 200, body: JSON.stringify(out) };
  } catch (e) {
    console.error('[assignment-cleanup]', e.message);
    return { statusCode: 500, body: 'error' };
  }
};
