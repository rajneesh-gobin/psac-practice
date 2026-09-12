// POST /api/weekly-digest (or Cloudflare Cron: every Sunday at 09:00 UTC)
// Sends weekly progress digests to parents via Mailchannels.

const SB_URL = 'https://xawvjwsiqhtxgpocdqgm.supabase.co';

const _MU_OFFSET_MS = 4 * 60 * 60 * 1000;
const _muDayKeyBack = i => new Date(Date.now() + _MU_OFFSET_MS - i * 86400000).toISOString().slice(0, 10);

function _window(daily, from, to) {
  let a = 0, c = 0, e = 0, days = 0;
  for (let i = from; i <= to; i++) {
    const d = (daily || {})[_muDayKeyBack(i)];
    if (!d) continue;
    a += d.a || 0; c += d.c || 0; e += d.e || 0;
    if (d.a) days++;
  }
  return { a, c, e, days, acc: a ? Math.round(c / a * 100) : null };
}

function _quietFor(daily) {
  for (let i = 0; i < 120; i++) if (((daily || {})[_muDayKeyBack(i)] || {}).a) return i;
  return null;
}

function _delta(now, prev, unit) {
  if (now == null || prev == null || prev === 0) return '';
  const d = now - prev;
  if (d === 0) return '';
  const up = d > 0;
  return `<span style="font-size:11px;font-weight:600;color:${up ? '#16a34a' : '#dc2626'}">${up ? '&#9650;' : '&#9660;'} ${Math.abs(d)}${unit || ''}</span>`;
}

function _bar(pct, color) {
  const safe = Math.min(100, Math.max(0, pct || 0));
  return `<span style="display:inline-block;vertical-align:middle;width:60px;background:#e5e7eb;border-radius:99px;height:6px;overflow:hidden"><span style="display:inline-block;height:6px;width:${safe}%;background:${color};border-radius:99px"></span></span>`;
}

function _esc(s) {
  return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

async function sbGet(path, sbKey) {
  const res = await fetch(`${SB_URL}${path}`, {
    headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}` },
  });
  return res.ok ? res.json() : null;
}

async function sendEmail(to, subject, html, { ok: mailOk } = { ok: true }) {
  if (!mailOk) return { ok: false };
  const r = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: 'noreply@psac-practice.com', name: 'Nou Klass' },
      subject, content: [{ type: 'text/html', value: html }],
    }),
  });
  return { ok: r.ok };
}

async function run(env) {
  const sbKey = env.SUPABASE_SERVICE_ROLE_KEY;
  const mailEnabled = !!env.MAILCHANNELS_ENABLED;
  if (!mailEnabled || !sbKey) { console.log('[weekly-digest] Skipped - email not configured'); return; }

  const families = await sbGet('/rest/v1/families?select=id,parent_id', sbKey);
  if (!families?.length) return;

  const optedOut = new Set();
  const profiles = await sbGet('/rest/v1/profiles?select=id,preferences', sbKey);
  for (const p of profiles || []) { if (p?.preferences?.weekly_digest === false) optedOut.add(p.id); }

  const notIncluded = new Set();
  try {
    const gs = await sbGet(`/rest/v1/mm_data?key=eq.global_settings&select=value&limit=1`, sbKey);
    const on = gs?.[0]?.value?.plan_enforcement_enabled === true;
    if (on) {
      const freeFeat = (await sbGet(`/rest/v1/plans?id=eq.free&select=features`, sbKey))?.[0]?.features || {};
      const subs = await sbGet(`/rest/v1/subscriptions?status=eq.active&select=user_id,expires_at,plans(features)`, sbKey);
      const byUser = new Map();
      const now = Date.now();
      for (const s of subs || []) {
        if (s.expires_at && new Date(s.expires_at).getTime() <= now) continue;
        if (!byUser.has(s.user_id)) byUser.set(s.user_id, s.plans?.features || {});
      }
      for (const family of families) {
        const feat = byUser.get(family.parent_id) ?? freeFeat;
        if (feat?.weekly_digest_enabled === false) notIncluded.add(family.parent_id);
      }
    }
  } catch (e) { console.warn('[weekly-digest] plan gate skipped:', e.message); }

  let sent = 0, failed = 0;
  for (const family of families) {
    if (optedOut.has(family.parent_id) || notIncluded.has(family.parent_id)) continue;
    try {
      const students = await sbGet(`/rest/v1/students?family_id=eq.${family.id}&deleted_at=is.null&select=id,display_name,grade,avatar`, sbKey);
      if (!students?.length) continue;

      const authUser = await sbGet(`/auth/v1/admin/users/${family.parent_id}`, sbKey);
      const parentEmail = authUser?.email;
      if (!parentEmail) continue;

      const progRows = await sbGet(`/rest/v1/student_progress?student_id=in.(${students.map(s => s.id).join(',')})&select=student_id,data`, sbKey);
      const progById = new Map((progRows || []).map(r => [r.student_id, r.data || {}]));

      const kids = students.map(s => {
        const data = progById.get(s.id) || {};
        const daily = data.daily || {};
        return { s, daily, now: _window(daily,0,6), prev: _window(daily,7,13), quietFor: _quietFor(daily), streak: (data.stats||{}).streak||0, lifetime: (data.stats||{}).totalAttempted||0, hasDated: Object.keys(daily).length>0 };
      });

      const anyDated = kids.some(k => k.hasDated);
      const rows = kids.map(k => {
        const { s, now: w, prev } = k;
        const acc = w.acc;
        const color = acc == null ? '#9ca3af' : acc>=80 ? '#22c55e' : acc>=50 ? '#f59e0b' : '#ef4444';
        const quiet = k.hasDated && (k.quietFor === null || k.quietFor >= 3);
        return `<tr style="border-bottom:1px solid #f1f5f9${quiet?';background:#fffbeb':''}"><td style="padding:10px 12px"><span style="font-size:20px">${_esc(s.avatar||'🧒')}</span><strong style="margin-left:6px">${_esc(s.display_name)}</strong><div style="font-size:11px;color:#9ca3af">Grade ${_esc(s.grade)}</div></td><td style="padding:10px 12px;text-align:center"><span style="font-weight:700">${w.a}</span><div>${_delta(w.a,prev.a)}</div></td><td style="padding:10px 12px">${acc==null?'<span style="color:#9ca3af">&mdash;</span>':`${_bar(acc,color)}<span style="font-size:13px;font-weight:600;color:${color};margin-left:6px">${acc}%</span><div>${_delta(acc,prev.acc,'%')}</div>`}</td><td style="padding:10px 12px;text-align:center">${w.days}<span style="color:#9ca3af">/7</span></td><td style="padding:10px 12px;text-align:center">${k.streak} 🔥</td></tr>`;
      });

      const fam = kids.reduce((t,k) => ({a:t.a+k.now.a,c:t.c+k.now.c,e:t.e+k.now.e,active:t.active+(k.now.a?1:0)}),{a:0,c:0,e:0,active:0});
      const famPrevA = kids.reduce((t,k) => t+k.prev.a, 0);
      const famAcc = fam.a ? Math.round(fam.c/fam.a*100) : null;
      let famDays=0; for(let i=0;i<7;i++){const key=_muDayKeyBack(i); if(kids.some(k=>(k.daily[key]||{}).a)) famDays++;}

      const quietKids = kids.filter(k => k.hasDated && k.lifetime>0 && (k.quietFor===null||k.quietFor>=3));
      const alert = quietKids.length ? `<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:12px 14px;margin:0 0 16px;color:#92400e;font-size:13px">&#9888;&#65039; ${_esc(quietKids.map(k=>k.quietFor===null?`${k.s.display_name} has not practised in a while`:`${k.s.display_name} — nothing for ${k.quietFor} day${k.quietFor>1?'s':''}`).join(' · '))}</div>` : '';
      const summary = !anyDated ? `<div style="background:#f8fafc;border-radius:10px;padding:12px 14px;margin:0 0 16px;color:#64748b;font-size:13px">Day-by-day tracking has just been switched on, so this week's figures start filling in from your children's next practice session.</div>` : `<div style="background:#eef2ff;border-radius:10px;padding:14px 16px;margin:0 0 16px;color:#3730a3;font-size:14px"><strong>${fam.a} question${fam.a===1?'':'s'}</strong>${famPrevA?` (${fam.a>=famPrevA?'up from':'down from'} ${famPrevA} last week)`:''}&nbsp;·&nbsp;<strong>${famAcc==null?'&mdash;':famAcc+'%'}</strong> correct&nbsp;·&nbsp;<strong>${fam.active} of ${kids.length}</strong> ${kids.length===1?'child':'children'} practised&nbsp;·&nbsp;revision on <strong>${famDays} of 7</strong> days${fam.e?`&nbsp;·&nbsp;<strong>${fam.e}</strong> exam${fam.e===1?'':'s'} taken`:''}</div>`;

      const _parts = key => { const [y,m,d]=key.split('-').map(Number); const dt=new Date(Date.UTC(y,m-1,d)); return {y,d,month:dt.toLocaleDateString('en-GB',{month:'long',timeZone:'UTC'}),full:dt.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'})}; };
      const from=_parts(_muDayKeyBack(6)); const to=_parts(_muDayKeyBack(0));
      const weekStr=to.full;
      const rangeStr=(from.month===to.month&&from.y===to.y)?`${from.d} – ${to.d} ${to.month} ${to.y}`:`${from.d} ${from.month}${from.y!==to.y?' '+from.y:''} – ${to.d} ${to.month} ${to.y}`;

      const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:0;background:#f8fafc;font-family:sans-serif"><div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)"><div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:24px 28px;color:#fff"><div style="font-size:22px;font-weight:bold">📈 Weekly Progress Report</div><div style="opacity:.85;margin-top:4px;font-size:14px">${rangeStr}</div></div><div style="padding:24px 28px"><p style="margin:0 0 16px;color:#374151;font-size:15px">Here's what your ${students.length===1?'child':'children'} did on Nou Klass over the last seven days.</p>${summary}${alert}<table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151"><thead><tr style="background:#f8fafc;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.05em"><th style="padding:8px 12px;text-align:left">Student</th><th style="padding:8px 12px;text-align:center">Questions</th><th style="padding:8px 12px;text-align:left">Accuracy</th><th style="padding:8px 12px;text-align:center">Days</th><th style="padding:8px 12px;text-align:center">Streak</th></tr></thead><tbody>${rows.join('')}</tbody></table><div style="margin-top:24px;text-align:center"><a href="https://nouklass.com/" style="display:inline-block;background:#4f46e5;color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:600;font-size:15px">Open Parent Dashboard →</a></div></div></div></body></html>`;

      const _res = await sendEmail(parentEmail, `Nou Klass - Weekly Report (${weekStr})`, html, { ok: true });
      if (_res.ok) sent++; else failed++;
    } catch (err) { console.error('[weekly-digest] Error for family', family.id, err.message); }
  }
  console.log(`[weekly-digest] Sent ${sent} digest emails${failed ? `, ${failed} FAILED` : ''}`);
}

export default async function handler(request, env) {
  await run(env);
  return new Response('ok', { status: 200 });
}

export async function scheduled(event, env, ctx) {
  ctx.waitUntil(run(env));
}
