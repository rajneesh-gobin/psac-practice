// POST /api/classroom-purge (or triggered as a Cloudflare Cron)
// Hard-deletes classrooms soft-deleted more than 10 days ago.

const GRACE_DAYS = 10;

async function sbFetch(sbUrl, sbKey, path, init) {
  return fetch(`${sbUrl}${path}`, {
    ...init,
    headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}`, 'Content-Type': 'application/json', ...(init?.headers) },
  });
}

export default async function handler(request, env) {
  const sbUrl = env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
  const sbKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!sbKey) return new Response('not_configured', { status: 200 });

  const cutoff = new Date(Date.now() - GRACE_DAYS * 86400 * 1000).toISOString();

  const expiredRes = await sbFetch(sbUrl, sbKey,
    `/rest/v1/teacher_guest_classes?select=id&deleted_at=not.is.null&deleted_at=lt.${encodeURIComponent(cutoff)}`);
  if (!expiredRes.ok) {
    console.error('classroom-purge: fetch error', expiredRes.status);
    return new Response('error', { status: 500 });
  }
  const expired = await expiredRes.json();
  if (!expired?.length) {
    console.log('classroom-purge: nothing to purge');
    return new Response('ok', { status: 200 });
  }

  let purged = 0, failed = 0;
  for (const { id } of expired) {
    // Hard-delete orphaned assignments linked to this classroom
    const assignmentIdsRes = await sbFetch(sbUrl, sbKey,
      `/rest/v1/teacher_guest_access?classroom_id=eq.${id}&select=assignment_id`);
    if (assignmentIdsRes.ok) {
      const rows = await assignmentIdsRes.json();
      const aIds = rows.map(r => r.assignment_id).filter(Boolean);
      if (aIds.length) {
        await sbFetch(sbUrl, sbKey,
          `/rest/v1/guest_assignments?id=in.(${aIds.join(',')})&deleted_at=not.is.null`,
          { method: 'DELETE' });
      }
    }

    const delRes = await sbFetch(sbUrl, sbKey,
      `/rest/v1/teacher_guest_classes?id=eq.${id}`, { method: 'DELETE' });
    if (!delRes.ok) {
      console.error('classroom-purge: failed to delete', id, delRes.status);
      failed++;
    } else {
      purged++;
    }
  }

  console.log(`classroom-purge: ${purged} deleted, ${failed} failed`);
  return new Response('ok', { status: 200 });
}

export async function scheduled(event, env, ctx) {
  await handler(new Request('https://nouklass.com/api/classroom-purge', { method: 'POST' }), env);
}
