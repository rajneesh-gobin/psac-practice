// POST /api/contact-message — public contact form with rate limiting.

const HEADERS = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, no-cache', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' };
const TYPES = { message: '💬 Message', bug: '🐛 Bug report', suggestion: '💡 Suggestion', question: '❓ Question', account: '🔑 Account or sign-in help' };
const MAX_MESSAGE = 2000, MIN_MESSAGE = 5, MAX_NAME = 60, MAX_EMAIL = 120;
const PER_IP = 3, PER_IP_UNKNOWN = 2, IP_WINDOW_MIN = 15, PER_HOUR = 40;
const MIN_FILL_MS = 3000, MAX_FILL_MS = 6 * 3600 * 1000, MAX_LINKS = 2;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LINK_RE = /(https?:\/\/|www\.)/gi;

function reply(status, body) {
  return new Response(JSON.stringify(body), { status, headers: HEADERS });
}

async function ipHash(request) {
  const ip = (request.headers.get('cf-connecting-ip') || (request.headers.get('x-forwarded-for') || '').split(',')[0] || '').trim();
  if (!ip) return 'noip000000000000';
  const data = new TextEncoder().encode('psac-contact:' + ip);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
}

function looksLikeSpam(message) {
  if ((message.match(LINK_RE) || []).length > MAX_LINKS) return 'too_many_links';
  const words = (message.replace(/(https?:\/\/\S+|www\.\S+)/gi, ' ').match(/[\p{L}]{2,}/gu) || []);
  if (words.length < 3) return 'not_enough_words';
  return null;
}

export default async function handler(request, env) {
  if (request.method === 'OPTIONS') return new Response('', { status: 204, headers: HEADERS });
  if (request.method !== 'POST') return reply(405, { ok: false, error: 'method_not_allowed' });

  const sbUrl = env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
  const sbKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!sbKey) return reply(503, { ok: false, error: 'not_configured' });

  const sb = (path, init) => fetch(`${sbUrl}/rest/v1${path}`, {
    ...init,
    headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}`, 'Content-Type': 'application/json', ...(init?.headers) },
  });

  let body;
  try { body = await request.json(); } catch { return reply(400, { ok: false, error: 'bad_json' }); }

  if (String(body.website || '').trim()) return reply(200, { ok: true });

  const message = String(body.message || '').trim().slice(0, MAX_MESSAGE);
  const name    = String(body.name    || '').trim().slice(0, MAX_NAME);
  const email   = String(body.email   || '').trim().slice(0, MAX_EMAIL);
  const type    = TYPES[body.type] ? body.type : 'message';

  if (message.length < MIN_MESSAGE) return reply(400, { ok: false, error: 'message_too_short' });
  if (email && !EMAIL_RE.test(email)) return reply(400, { ok: false, error: 'bad_email' });

  const elapsed = Number(body.elapsedMs);
  const filled  = Number.isFinite(elapsed) && elapsed >= 0 && elapsed <= MAX_FILL_MS ? elapsed : 0;
  if (filled < MIN_FILL_MS) return reply(400, { ok: false, error: 'too_fast' });

  const spam = looksLikeSpam(message);
  if (spam) return reply(400, { ok: false, error: spam });

  const iph = await ipHash(request);
  const isUnknownIp = iph === 'noip000000000000';
  const cap = isUnknownIp ? PER_IP_UNKNOWN : PER_IP;
  const since = new Date(Date.now() - IP_WINDOW_MIN * 60000).toISOString();

  async function countSince(sinceIso, extra) {
    const res = await sb(`/question_reports?report_type=eq.contact&created_at=gte.${encodeURIComponent(sinceIso)}${extra || ''}&select=id&limit=100`);
    if (!res.ok) return null;
    const rows = await res.json().catch(() => null);
    return Array.isArray(rows) ? rows.length : null;
  }

  const mine = await countSince(since, `&question_text=ilike.*"iph":"${iph}"*`);
  if (mine === null) return reply(503, { ok: false, error: 'busy' });
  if (mine >= cap) return reply(429, { ok: false, error: 'rate_limited', retryMinutes: IP_WINDOW_MIN });

  const hourly = await countSince(new Date(Date.now() - 3600000).toISOString());
  if (hourly === null) return reply(503, { ok: false, error: 'busy' });
  if (hourly >= PER_HOUR) return reply(429, { ok: false, error: 'busy' });

  const ua   = (request.headers.get('user-agent') || '').slice(0, 180);
  const meta = { studentName: name || 'Guest', mode: 'contact', guestName: name || null, guestEmail: email || null, contactType: type, ua, iph, fillMs: filled };

  const res = await sb('/question_reports', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({
      question_id: '__contact__',
      question_text: `Guest contact — ${TYPES[type]}\n__meta__${JSON.stringify(meta)}`,
      message, status: 'open', report_type: 'contact', student_id: null, chapter_id: null,
    }),
  });

  if (!res.ok) {
    console.error('[contact-message] insert failed', res.status, (await res.text()).slice(0, 300));
    return reply(500, { ok: false, error: 'save_failed' });
  }

  return reply(200, { ok: true, replyByEmail: !!email });
}
