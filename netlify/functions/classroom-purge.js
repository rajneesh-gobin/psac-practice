'use strict';
// Cron: hard-delete classrooms soft-deleted more than 10 days ago,
// and their orphaned assignments. Runs daily via netlify.toml schedule.
const { createClient } = require('@supabase/supabase-js');

const GRACE_DAYS = 10;

exports.handler = async () => {
  const sb = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const cutoff = new Date(Date.now() - GRACE_DAYS * 86400 * 1000).toISOString();

  // Find classrooms past the grace period
  const { data: expired, error: fetchErr } = await sb
    .from('teacher_guest_classes')
    .select('id')
    .not('deleted_at', 'is', null)
    .lt('deleted_at', cutoff);

  if (fetchErr) {
    console.error('classroom-purge: fetch error', fetchErr.message);
    return { statusCode: 500 };
  }

  if (!expired || !expired.length) {
    console.log('classroom-purge: nothing to purge');
    return { statusCode: 200 };
  }

  let purged = 0;
  let failed = 0;

  for (const { id } of expired) {
    // Hard-delete soft-deleted assignments linked to this classroom first
    // (orphan assignments whose deleted_at was set by delete_class)
    await sb
      .from('guest_assignments')
      .delete()
      .not('deleted_at', 'is', null)
      .in('id', sb
        .from('teacher_guest_access')
        .select('assignment_id')
        .eq('classroom_id', id)
      );

    // Hard-delete the classroom; pupils/roster/access cascade via FK
    const { error } = await sb
      .from('teacher_guest_classes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('classroom-purge: failed to delete', id, error.message);
      failed++;
    } else {
      purged++;
    }
  }

  console.log(`classroom-purge: ${purged} deleted, ${failed} failed`);
  return { statusCode: 200 };
};
