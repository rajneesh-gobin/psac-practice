'use strict';
// ══════════════════════════════════════════════════════════════
//  PSAC Exam Practice — Super Admin: Create Pre-Activated Account
//  POST /.netlify/functions/create-user
//
//  Called only from the admin panel by a verified super admin.
//  Uses service_role key to bypass email confirmation so the
//  account is immediately usable — no verification email sent.
//
//  Required env vars (set in Netlify → Site settings → Env vars):
//    SUPABASE_URL              (optional, falls back to hardcoded)
//    SUPABASE_SERVICE_ROLE_KEY (required — never expose in frontend)
// ══════════════════════════════════════════════════════════════

const { createClient } = require('@supabase/supabase-js');

const SB_URL         = process.env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SB_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function _json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Authorization,Content-Type' }, body: '' };
  }
  if (event.httpMethod !== 'POST') return _json(405, { error: 'Method Not Allowed' });
  if (!SB_SERVICE_KEY)             return _json(500, { error: 'Server not configured — add SUPABASE_SERVICE_ROLE_KEY to Netlify env vars' });

  // ── 1. Verify caller via their Supabase JWT ─────────────────
  const jwt = (event.headers['authorization'] || '').replace(/^Bearer\s+/i, '').trim();
  if (!jwt) return _json(401, { error: 'Missing Authorization header' });

  const adminSb = createClient(SB_URL, SB_SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: { user: caller }, error: authErr } = await adminSb.auth.getUser(jwt);
  if (authErr || !caller) return _json(401, { error: 'Invalid or expired token' });

  // ── 2. Confirm caller is a super admin ──────────────────────
  const { data: callerProfile } = await adminSb
    .from('profiles').select('is_super_admin, full_name').eq('id', caller.id).maybeSingle();
  if (!callerProfile?.is_super_admin) return _json(403, { error: 'Super admin access required' });

  // ── 3. Parse + validate request body ───────────────────────
  let body;
  try { body = JSON.parse(event.body || '{}'); }
  catch { return _json(400, { error: 'Invalid JSON' }); }

  const {
    email      = '',
    password   = '',
    full_name  = '',
    role       = 'parent',
    plan_id    = 'free',
    family_name = '',
    note       = '',
  } = body;

  if (!email.includes('@'))        return _json(400, { error: 'Valid email required' });
  if (password.length < 6)         return _json(400, { error: 'Password must be at least 6 characters' });
  if (full_name.trim().length < 2) return _json(400, { error: 'Full name required' });
  if (!['parent','teacher','admin'].includes(role)) return _json(400, { error: 'Invalid role' });

  // ── 4. Create auth user — email pre-confirmed ───────────────
  const { data: created, error: createErr } = await adminSb.auth.admin.createUser({
    email:          email.trim().toLowerCase(),
    password,
    email_confirm:  true,                   // ← bypasses verification email
    user_metadata:  { full_name: full_name.trim(), role },
  });

  if (createErr) {
    // Friendly message for duplicate email
    const msg = createErr.message?.toLowerCase().includes('already')
      ? 'An account with this email already exists'
      : createErr.message;
    return _json(400, { error: msg });
  }

  const userId = created.user.id;

  // ── 5. Create profiles row ──────────────────────────────────
  await adminSb.from('profiles').insert({ id: userId, full_name: full_name.trim(), role });

  // ── 6. Create family if parent role ────────────────────────
  let family_code = null;
  if (role === 'parent') {
    const fname = family_name.trim() || `${full_name.trim().split(' ')[0]}'s Family`;
    const { data: fam } = await adminSb
      .from('families').insert({ parent_id: userId, family_name: fname }).select('family_code').single();
    family_code = fam?.family_code;
  }

  // ── 7. Activate plan + log payment ─────────────────────────
  const validPlans = ['free','starter','premium'];
  const activePlan = validPlans.includes(plan_id) ? plan_id : 'free';
  const expiresAt  = activePlan === 'free'
    ? null
    : new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(); // 30 days

  await adminSb.from('subscriptions').insert({
    user_id: userId, plan_id: activePlan, status: 'active', expires_at: expiresAt,
  });
  await adminSb.from('payments').insert({
    user_id: userId, plan_id: activePlan,
    amount_mur: 0, provider: 'super_admin',
    status: 'completed',
    processed_at: new Date().toISOString(),
    notes: `Created by super admin ${callerProfile.full_name} (${caller.email})${note ? ' — ' + note : ''}`,
  });

  console.log(`[create-user] Super admin ${caller.email} created account ${email} (${role}, ${activePlan})`);

  return _json(200, {
    ok:          true,
    user_id:     userId,
    email:       email.trim().toLowerCase(),
    role,
    plan_id:     activePlan,
    family_code: family_code || null,
  });
};
