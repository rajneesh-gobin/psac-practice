// POST /api/admin-delete-account — permanent HARD delete of a member account.

import { requireAdmin, json } from '../lib/admin-auth.js';

export default async function handler(request, env) {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed' });

  const gate = await requireAdmin(request, env);
  if (gate.error) return gate.error;
  const { caller, profile: callerProfile, sbUrl, sbKey } = gate;
  const sbH = { apikey: sbKey, Authorization: `Bearer ${sbKey}`, 'Content-Type': 'application/json' };
  const sb = (path, init) => fetch(`${sbUrl}${path}`, { ...init, headers: { ...sbH, ...(init?.headers) } });

  let body;
  try { body = await request.json(); } catch { return json(400, { error: 'Invalid request.' }); }

  const userId = String(body.user_id || '');
  if (!/^[0-9a-f-]{36}$/i.test(userId)) return json(400, { error: 'Invalid account.' });
  if (body.confirm !== 'DELETE') return json(400, { error: 'Missing confirmation.' });
  if (userId === caller.id) return json(400, { error: 'You cannot delete your own account from here.' });

  const targetRes = await sb(`/auth/v1/admin/users/${userId}`);
  if (!targetRes.ok) return json(404, { error: 'No such account.' });
  const target = await targetRes.json();
  const targetEmail = target?.email || null;

  const targetProfileRes = await sb(`/rest/v1/profiles?id=eq.${userId}&select=role,is_super_admin,full_name&limit=1`);
  const targetProfiles = targetProfileRes.ok ? await targetProfileRes.json() : [];
  const targetProfile = targetProfiles[0];

  if (targetProfile?.role === 'admin' && !callerProfile.is_super_admin) {
    return json(403, { error: 'Only a super administrator may delete another administrator.' });
  }
  if (targetProfile?.is_super_admin) {
    return json(403, { error: 'A super administrator account cannot be deleted from here.' });
  }

  // Collect children before cascade
  const familiesRes = await sb(`/rest/v1/families?parent_id=eq.${userId}&select=id`);
  const families = familiesRes.ok ? await familiesRes.json() : [];
  const familyIds = families.map(f => f.id);
  let studentIds = [];
  if (familyIds.length) {
    const studentsRes = await sb(`/rest/v1/students?family_id=in.(${familyIds.join(',')})&select=id`);
    const students = studentsRes.ok ? await studentsRes.json() : [];
    studentIds = students.map(s => s.id);
  }

  const purged = {}, purgeFailures = [];
  if (studentIds.length) {
    const asText = studentIds.join(',');
    for (const table of ['student_progress', 'schedule_entries', 'study_schedules', 'student_assignments']) {
      const r = await sb(`/rest/v1/${table}?student_id=in.(${asText})`, { method: 'DELETE', headers: { Prefer: 'return=representation' } });
      if (!r.ok) purgeFailures.push(table + ': ' + r.status);
      else purged[table] = (await r.json()).length;
    }
    const le = await sb(`/rest/v1/login_events?user_id=in.(${asText})`, { method: 'DELETE', headers: { Prefer: 'return=representation' } });
    if (!le.ok) purgeFailures.push('login_events(students): ' + le.status);
    else purged.login_events_students = (await le.json()).length;
  }
  const lp = await sb(`/rest/v1/login_events?user_id=eq.${userId}`, { method: 'DELETE', headers: { Prefer: 'return=representation' } });
  if (!lp.ok) purgeFailures.push('login_events(parent): ' + lp.status);
  else purged.login_events_parent = (await lp.json()).length;

  await sb('/rest/v1/security_events', {
    method: 'POST', headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({ user_id: userId, kind: 'admin:account_deleted', detail: { by: caller.id, by_email: caller.email || null, target_email: targetEmail, target_name: targetProfile?.full_name || null, target_role: targetProfile?.role || null, families: familyIds.length, students: studentIds.length, purged, purge_failures: purgeFailures, at: new Date().toISOString() } }),
  }).catch(e => console.error('[admin-delete-account] AUDIT WRITE THREW:', e.message));

  const deleteRes = await sb(`/auth/v1/admin/users/${userId}`, { method: 'DELETE' });
  if (!deleteRes.ok) {
    const err = await deleteRes.json().catch(() => ({}));
    return json(500, { error: err.message || 'Could not delete the account.' });
  }

  console.log(`[admin-delete-account] ${caller.email} deleted ${userId} (${studentIds.length} child account(s))`);
  return json(200, { ok: true, email: targetEmail, students: studentIds.length, purged, purge_failures: purgeFailures });
}
