// POST /api/create-user — super admin creates a pre-activated account.

import { requireAdmin, json } from '../lib/admin-auth.js';

export default async function handler(request, env) {
  if (request.method === 'OPTIONS') return new Response('', { status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Authorization,Content-Type' } });
  if (request.method !== 'POST') return json(405, { error: 'Method Not Allowed' });

  const gate = await requireAdmin(request, env);
  if (gate.error) return gate.error;
  const { caller, profile: callerProfile, sbUrl, sbKey } = gate;

  const sbH = { apikey: sbKey, Authorization: `Bearer ${sbKey}`, 'Content-Type': 'application/json' };

  let body;
  try { body = await request.json(); } catch { return json(400, { error: 'Invalid JSON' }); }

  const { email = '', password = '', full_name = '', role = 'parent', plan_id = 'free', family_name = '', note = '' } = body;

  if (!email.includes('@'))        return json(400, { error: 'Valid email required' });
  if (password.length < 6)         return json(400, { error: 'Password must be at least 6 characters' });
  if (full_name.trim().length < 2) return json(400, { error: 'Full name required' });
  if (!['parent','teacher','admin'].includes(role)) return json(400, { error: 'Invalid role' });
  if (!callerProfile.is_super_admin) return json(403, { error: 'Super admin access required' });

  const createRes = await fetch(`${sbUrl}/auth/v1/admin/users`, {
    method: 'POST',
    headers: sbH,
    body: JSON.stringify({ email: email.trim().toLowerCase(), password, email_confirm: true, user_metadata: { full_name: full_name.trim(), role } }),
  });
  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    const msg = (err.msg || err.message || '').toLowerCase().includes('already')
      ? 'An account with this email already exists' : (err.msg || err.message || 'Failed to create user');
    return json(400, { error: msg });
  }
  const created = await createRes.json();
  const userId = created.id;

  // Create profiles row
  await fetch(`${sbUrl}/rest/v1/profiles`, {
    method: 'POST',
    headers: { ...sbH, Prefer: 'return=minimal' },
    body: JSON.stringify({ id: userId, full_name: full_name.trim(), role }),
  });

  // Create family if parent
  let family_code = null;
  if (role === 'parent') {
    const fname = family_name.trim() || `${full_name.trim().split(' ')[0]}'s Family`;
    const famRes = await fetch(`${sbUrl}/rest/v1/families`, {
      method: 'POST',
      headers: { ...sbH, Prefer: 'return=representation' },
      body: JSON.stringify({ parent_id: userId, family_name: fname }),
    });
    if (famRes.ok) {
      const fams = await famRes.json();
      family_code = fams[0]?.family_code || null;
    }
  }

  const validPlans = ['free','starter','premium'];
  const activePlan = validPlans.includes(plan_id) ? plan_id : 'free';
  const expiresAt  = activePlan === 'free' ? null : new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString();

  await fetch(`${sbUrl}/rest/v1/subscriptions`, {
    method: 'POST', headers: { ...sbH, Prefer: 'return=minimal' },
    body: JSON.stringify({ user_id: userId, plan_id: activePlan, status: 'active', expires_at: expiresAt }),
  });
  await fetch(`${sbUrl}/rest/v1/payments`, {
    method: 'POST', headers: { ...sbH, Prefer: 'return=minimal' },
    body: JSON.stringify({ user_id: userId, plan_id: activePlan, amount_mur: 0, provider: 'super_admin', status: 'completed', processed_at: new Date().toISOString(), notes: `Created by super admin ${callerProfile.full_name} (${caller.email})${note ? ' - ' + note : ''}` }),
  });

  console.log(`[create-user] Super admin ${caller.email} created account ${email} (${role}, ${activePlan})`);
  return json(200, { ok: true, user_id: userId, email: email.trim().toLowerCase(), role, plan_id: activePlan, family_code });
}
