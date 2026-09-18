// Shared admin gate for Workers. Returns { caller, profile, sbUrl, sbKey } or { error: Response }.

const CORS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
  'Access-Control-Allow-Origin': '*',
};

export function json(status, body) {
  return new Response(JSON.stringify(body), { status, headers: CORS });
}

export async function requireAdmin(request, env) {
  const sbUrl = env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
  const sbKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!sbKey) return { error: json(500, { error: 'Server is missing SUPABASE_SERVICE_ROLE_KEY' }) };

  const jwt = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim();
  if (!jwt) return { error: json(401, { error: 'Sign in again to continue.' }) };

  const userRes = await fetch(`${sbUrl}/auth/v1/user`, {
    headers: { apikey: sbKey, Authorization: `Bearer ${jwt}` },
  });
  if (!userRes.ok) return { error: json(401, { error: 'Your sign-in session has expired.' }) };
  const caller = await userRes.json();
  if (!caller?.id) return { error: json(401, { error: 'Your sign-in session has expired.' }) };

  const profileRes = await fetch(
    `${sbUrl}/rest/v1/profiles?id=eq.${caller.id}&select=role,is_super_admin,disabled&limit=1`,
    { headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}` } }
  );
  const profiles = profileRes.ok ? await profileRes.json() : [];
  const profile = profiles[0];
  if (!profile || profile.role !== 'admin' || profile.disabled) {
    return { error: json(403, { error: 'Administrator access is required.' }) };
  }

  return { caller, profile, sbUrl, sbKey };
}

// Append-only audit row for something an admin DID. Never throws, and never
// blocks or fails the action it is recording.
//
// ⚠ IT DOES NOT CALL admin_log_action(). That function takes the admin_id from
//   auth.uid() and gates on is_admin(); under the service role auth.uid() is
//   NULL, so it answers { ok: false, error: 'not_authorised' }, writes nothing,
//   and says so with HTTP 200. The RPC is the right path from the BROWSER,
//   where auth.uid() is the only trustworthy identity. Here requireAdmin() has
//   already established who the caller is, so the id is passed explicitly and
//   service_role's own INSERT grant writes the row.
// ⚠ IDS, NEVER EMAIL ADDRESSES. An append-only log outlives the account it
//   names, and nothing reading this table needs to reach the person again.
// ⚠ Keep `action` matching ^[a-z][a-z_]{2,39}$ — the same shape
//   admin_log_action() enforces, so rows written from here and from the browser
//   are one vocabulary rather than two.
export async function logAdminAction(gate, { action, targetUser = null, targetStudent = null, detail = {} }) {
  try {
    const res = await fetch(`${gate.sbUrl}/rest/v1/admin_actions`, {
      method: 'POST',
      headers: {
        apikey: gate.sbKey,
        Authorization: `Bearer ${gate.sbKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        admin_id: gate.caller?.id || null,
        target_user: targetUser,
        target_student: targetStudent,
        action,
        detail,
      }),
    });
    // ⚠ SAY IT OUT LOUD. A silent audit failure is the only kind there is, and
    //   discarding this result is precisely how the broadcast trail stayed
    //   empty while a comment claimed it existed.
    if (!res.ok) {
      const why = await res.text().catch(() => '');
      console.log(`[admin-audit] ${action} NOT recorded: HTTP ${res.status} ${why.slice(0, 200)}`);
      return false;
    }
    return true;
  } catch (e) {
    console.log(`[admin-audit] ${action} NOT recorded: ${String((e && e.message) || e).slice(0, 120)}`);
    return false;
  }
}
