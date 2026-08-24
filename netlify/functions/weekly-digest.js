// Netlify Scheduled Function - Weekly Parent Progress Digest
// Runs every Sunday at 9:00 AM UTC.
// Schedule is set in netlify.toml: [functions."weekly-digest"] schedule = "0 9 * * 0"
//
// Required Netlify environment variables:
//   SUPABASE_SERVICE_ROLE_KEY
//   RESEND_API_KEY
//   NOTIFY_FROM_EMAIL  (optional, defaults to Resend test address)

const SUPABASE_URL = 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_KEY   = process.env.RESEND_API_KEY;
const FROM_EMAIL   = process.env.NOTIFY_FROM_EMAIL || 'PSAC Exam Practice <onboarding@resend.dev>';

async function sbGet(path) {
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  return res.ok ? res.json() : null;
}

async function sendEmail(to, subject, html) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });
}

function _bar(pct, color) {
  const safe = Math.min(100, Math.max(0, pct || 0));
  return `<div style="background:#e5e7eb;border-radius:99px;height:6px;overflow:hidden;min-width:60px">
    <div style="height:100%;width:${safe}%;background:${color};border-radius:99px"></div>
  </div>`;
}

exports.handler = async () => {
  if (!RESEND_KEY || !SUPABASE_KEY) {
    console.log('[weekly-digest] Skipped - email not configured');
    return { statusCode: 200 };
  }

  const families = await sbGet('/rest/v1/families?select=id,owner_id');
  if (!families?.length) return { statusCode: 200 };

  let sent = 0;
  for (const family of families) {
    try {
      // Get students
      const students = await sbGet(
        `/rest/v1/students?family_id=eq.${family.id}&select=id,display_name,grade,avatar`
      );
      if (!students?.length) continue;

      // Get parent email
      const authUser    = await sbGet(`/auth/v1/admin/users/${family.owner_id}`);
      const parentEmail = authUser?.email;
      if (!parentEmail) continue;

      // Build rows for each student
      const rows = await Promise.all(students.map(async s => {
        const progArr = await sbGet(`/rest/v1/student_progress?student_id=eq.${s.id}&select=data`);
        const data    = progArr?.[0]?.data || {};
        const stats   = data.stats || {};
        const total   = stats.totalAttempted || 0;
        const correct = stats.totalCorrect   || 0;
        const acc     = total ? Math.round(correct / total * 100) : 0;
        const xp      = data.xp     || 0;
        const streak  = stats.streak || 0;
        const level   = data.level   || 1;
        const color   = acc >= 80 ? '#22c55e' : acc >= 50 ? '#f59e0b' : '#ef4444';
        return `<tr style="border-bottom:1px solid #f1f5f9">
          <td style="padding:10px 12px">
            <span style="font-size:20px">${s.avatar || '🧒'}</span>
            <strong style="margin-left:6px">${s.display_name}</strong>
            <div style="font-size:11px;color:#9ca3af">Grade ${s.grade} · Lv.${level}</div>
          </td>
          <td style="padding:10px 12px;text-align:center;color:#4f46e5;font-weight:700">${xp} XP</td>
          <td style="padding:10px 12px;text-align:center">${total}</td>
          <td style="padding:10px 12px">
            <div style="display:flex;align-items:center;gap:6px">
              ${_bar(acc, color)}
              <span style="font-size:13px;font-weight:600;color:${color}">${acc}%</span>
            </div>
          </td>
          <td style="padding:10px 12px;text-align:center">${streak} 🔥</td>
        </tr>`;
      }));

      const weekStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

      const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:sans-serif">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)">
    <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:24px 28px;color:#fff">
      <div style="font-size:22px;font-weight:bold">📈 Weekly Progress Report</div>
      <div style="opacity:.85;margin-top:4px;font-size:14px">Week ending ${weekStr}</div>
    </div>
    <div style="padding:24px 28px">
      <p style="margin:0 0 16px;color:#374151;font-size:15px">
        Here's how your children performed this week on PSAC Exam Practice.
      </p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151">
        <thead>
          <tr style="background:#f8fafc;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.05em">
            <th style="padding:8px 12px;text-align:left">Student</th>
            <th style="padding:8px 12px;text-align:center">XP</th>
            <th style="padding:8px 12px;text-align:center">Questions</th>
            <th style="padding:8px 12px;text-align:left">Accuracy</th>
            <th style="padding:8px 12px;text-align:center">Streak</th>
          </tr>
        </thead>
        <tbody>${rows.join('')}</tbody>
      </table>
      <div style="margin-top:24px;text-align:center">
        <a href="https://psac-practice.netlify.app/"
          style="display:inline-block;background:#4f46e5;color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:600;font-size:15px">
          Open Parent Dashboard →
        </a>
      </div>
      <p style="margin:20px 0 0;color:#9ca3af;font-size:12px;text-align:center">
        Sent every Sunday · PSAC Exam Practice
      </p>
    </div>
  </div>
</body></html>`;

      await sendEmail(parentEmail, `PSAC Exam Practice - Weekly Report (${weekStr})`, html);
      sent++;
    } catch (err) {
      console.error('[weekly-digest] Error for family', family.id, err.message);
    }
  }

  console.log(`[weekly-digest] Sent ${sent} digest emails`);
  return { statusCode: 200 };
};
