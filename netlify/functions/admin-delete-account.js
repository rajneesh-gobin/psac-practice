'use strict';
// Admin-only PERMANENT deletion of a member account and everything under it.
//
// ⚠ This is not the soft delete. Store.deleteMyAccount() sets profiles.deleted_at
// so a parent can close their account and get it back by signing in again; the
// auth.users row is deliberately kept for exactly that. THIS erases the row and
// there is nothing to come back to. Use the Disable button for anything
// reversible - it exists, it is one click away, and it is almost always the
// right answer for a real family. This one is for accounts that should never
// have existed: test accounts, junk sign-ups.
//
// WHAT GETS REMOVED
// auth.users cascades all the way down, which was verified against the live
// constraints rather than assumed:
//     auth.users -> profiles -> families -> students -> student_sessions,
//     assignment_submissions, enrollments, push_subscriptions, student_friends,
//     student_invites; and profiles -> credit_ledger, chapter_entitlements,
//     referrals, family_members, family_invites, classrooms, guest_assignments.
//
// ⚠ FIVE TABLES ARE NOT IN THAT CHAIN. student_progress, schedule_entries,
// study_schedules, student_assignments and login_events key their owner as
// **text with no foreign key**, so the cascade cannot see them and every one of
// them would be left behind - a deleted child's entire practice history sitting
// in the database for ever. There is already one orphaned student_progress row
// on production proving this is not hypothetical. They are purged explicitly
// below, and the student ids must be collected BEFORE the cascade runs, because
// afterwards there is no way left to find out which rows belonged to whom.
//
// ⚠ security_events is deliberately NOT purged. Its user_id/student_id carry no
// foreign key precisely so the audit trail outlives its subject; erasing the
// record of what was done to an account, as part of doing it, is the one thing
// an audit log must never allow.

const { requireAdmin, json } = require('../lib/admin-auth');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });

  const gate = await requireAdmin(event);
  if (gate.error) return gate.error;
  const { sb, caller, profile: callerProfile } = gate;

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch (_) { return json(400, { error: 'Invalid request.' }); }

  const userId = String(body.user_id || '');
  if (!/^[0-9a-f-]{36}$/i.test(userId)) return json(400, { error: 'Invalid account.' });

  // ⚠ A second, explicit confirmation on the WIRE, not only in the browser.
  // The UI asks the administrator to type DELETE, but a UI confirmation is not
  // a safeguard on an irreversible server action - it is one stray fetch away
  // from being skipped entirely.
  if (body.confirm !== 'DELETE') return json(400, { error: 'Missing confirmation.' });

  // Deleting yourself removes the account you are authenticated as, mid-request.
  // The existing self-delete guard on the parent path refuses this for the same
  // reason, and an admin who does it locks everyone out of the admin panel if
  // they were the only one.
  if (userId === caller.id) {
    return json(400, { error: 'You cannot delete your own account from here.' });
  }

  const { data: target, error: targetError } = await sb.auth.admin.getUserById(userId);
  if (targetError || !target?.user) return json(404, { error: 'No such account.' });
  const targetEmail = target.user.email || null;

  const { data: targetProfile } = await sb.from('profiles')
    .select('role, is_super_admin, full_name').eq('id', userId).maybeSingle();

  // Same rule as setting a peer administrator's password: only a super admin
  // may act on another administrator.
  if (targetProfile?.role === 'admin' && !callerProfile.is_super_admin) {
    return json(403, { error: 'Only a super administrator may delete another administrator.' });
  }
  if (targetProfile?.is_super_admin) {
    return json(403, { error: 'A super administrator account cannot be deleted from here.' });
  }

  // ── Collect the children BEFORE anything cascades ─────────────────────────
  const { data: families } = await sb.from('families').select('id').eq('parent_id', userId);
  const familyIds = (families || []).map(f => f.id);
  let studentIds = [];
  if (familyIds.length) {
    const { data: students } = await sb.from('students').select('id').in('family_id', familyIds);
    studentIds = (students || []).map(s => s.id);
  }

  // ── Purge what the cascade cannot reach ───────────────────────────────────
  // Reported per table rather than swallowed: a partial purge that still counts
  // as success is how orphans accumulate silently, which is exactly the state
  // this function exists to stop creating.
  const purged = {};
  const purgeFailures = [];
  if (studentIds.length) {
    const asText = studentIds.map(String);
    for (const table of ['student_progress', 'schedule_entries', 'study_schedules', 'student_assignments']) {
      const { data, error } = await sb.from(table).delete().in('student_id', asText).select('student_id');
      if (error) purgeFailures.push(table + ': ' + error.message);
      else purged[table] = (data || []).length;
    }
    const { data: le, error: leErr } = await sb.from('login_events')
      .delete().in('user_id', asText).select('user_id');
    if (leErr) purgeFailures.push('login_events(students): ' + leErr.message);
    else purged.login_events_students = (le || []).length;
  }
  const { data: lp, error: lpErr } = await sb.from('login_events')
    .delete().eq('user_id', userId).select('user_id');
  if (lpErr) purgeFailures.push('login_events(parent): ' + lpErr.message);
  else purged.login_events_parent = (lp || []).length;

  // ⚠ Written BEFORE the delete. Afterwards the caller may no longer be able to
  // describe what was removed, and a row that only lands on success would be
  // missing for exactly the deletions that went wrong half way.
  try {
    const { error: auditError } = await sb.from('security_events').insert({
      user_id: userId,
      kind: 'admin:account_deleted',
      detail: {
        by: caller.id,
        by_email: caller.email || null,
        target_email: targetEmail,
        target_name: targetProfile?.full_name || null,
        target_role: targetProfile?.role || null,
        families: familyIds.length,
        students: studentIds.length,
        purged,
        purge_failures: purgeFailures,
        at: new Date().toISOString(),
      },
    });
    if (auditError) console.error('[admin-delete-account] AUDIT WRITE FAILED:', auditError.message);
  } catch (e) {
    console.error('[admin-delete-account] AUDIT WRITE THREW:', e.message);
  }

  // ── The cascade ───────────────────────────────────────────────────────────
  const { error: deleteError } = await sb.auth.admin.deleteUser(userId);
  if (deleteError) {
    console.error('[admin-delete-account] deleteUser failed:', deleteError.message);
    return json(500, { error: deleteError.message || 'Could not delete the account.' });
  }

  console.log(`[admin-delete-account] ${caller.email} deleted ${userId}`
    + ` (${studentIds.length} child account(s))`);

  return json(200, {
    ok: true,
    email: targetEmail,
    students: studentIds.length,
    purged,
    purge_failures: purgeFailures,
  });
};
