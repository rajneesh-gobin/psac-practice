'use strict';
// POST /api/contact-message
// The public contact form: a message, a bug report or a suggestion from
// somebody with no account at all — a visitor, a parent deciding whether to
// sign up, a teacher whose sign-in is broken.
//
// It lands in the SAME admin queue as every other report (question_reports,
// report_type 'contact'), because a second inbox is an inbox nobody reads.
//
// ⚠ anon has NO insert grant on question_reports and must not be given one:
// an open table write is a spam vector with nothing behind it to throttle.
// This function holds the service role and does the throttling itself.
// ⚠ Fails CLOSED with no service key — the same rule the rest of the app
// learned the hard way. A missing key must never mean "skip the checks".
// ⚠ A guest has no inbox, so nothing here promises a reply in the app. The
// admin answers by email, which is why the address is asked for and shown.

const crypto = require('crypto');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;

const HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store, no-cache',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// The label is written into the row, so an admin reads words, not a slug.
const TYPES = {
  message:    '💬 Message',
  bug:        '🐛 Bug report',
  suggestion: '💡 Suggestion',
  question:   '❓ Question',
  account:    '🔑 Account or sign-in help',
};

const MAX_MESSAGE   = 2000;
const MIN_MESSAGE   = 5;
const MAX_NAME      = 60;
const MAX_EMAIL     = 120;
const PER_IP        = 3;      // per window, per address
// ⚠ An unknown caller is not an UNLIMITED caller. Netlify always sets the IP
// header, so "none" means a proxy stripped it or this is not Netlify at all —
// which is exactly the shape a scripted sender has. They share one bucket and
// a tighter cap, rather than skipping the check the way this used to.
const PER_IP_UNKNOWN = 2;
const IP_WINDOW_MIN = 15;
const PER_HOUR      = 40;     // everybody, everywhere — a flood brake
const EMAIL_RE      = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// A form nobody has read cannot have been filled in. Bots post the instant they
// parse the page; a person takes seconds to type a sentence. ⚠ This is a bot
// filter, not a security control — the elapsed time comes from the client and
// anyone reading this file can forge it, exactly like the honeypot.
const MIN_FILL_MS   = 3000;
const MAX_FILL_MS   = 6 * 3600 * 1000;   // a page left open all day, then sent
const MAX_LINKS     = 2;
const LINK_RE       = /(https?:\/\/|www\.)/gi;

const reply = (statusCode, body) => ({ statusCode, headers: HEADERS, body: JSON.stringify(body) });

// The raw IP is never stored. What is stored is a salted hash, only so two
// messages from the same sender can be counted inside a 15-minute window.
function ipHash(event) {
  const ip = (event.headers?.['x-nf-client-connection-ip']
    || (event.headers?.['x-forwarded-for'] || '').split(',')[0]
    || '').trim();
  // A stable, obviously-not-a-hash bucket so unknown senders are counted
  // TOGETHER instead of not at all.
  if (!ip) return 'noip000000000000';
  return crypto.createHash('sha256').update('psac-contact:' + ip).digest('hex').slice(0, 16);
}
const isUnknownIp = h => h === 'noip000000000000';

// Genuine reports quote a chapter or describe a tap. Spam is a wall of links.
// Deliberately generous: ONE link in a bug report is normal, and refusing a
// real report is worse than storing a spam row an admin can delete.
function looksLikeSpam(message) {
  const links = (message.match(LINK_RE) || []).length;
  if (links > MAX_LINKS) return 'too_many_links';
  // Three words with letters in them, counted with the URLs REMOVED first —
  // otherwise "https://spam.example/buy" counts as three words of its own and
  // walks straight through. Stops a bare link and "aaaaaaa" without touching
  // anything a person would actually write.
  const words = (message.replace(/(https?:\/\/\S+|www\.\S+)/gi, ' ').match(/[\p{L}]{2,}/gu) || []);
  if (words.length < 3) return 'not_enough_words';
  return null;
}

async function sb(path, init) {
  return fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      ...(init && init.headers),
    },
  });
}

async function countSince(sinceIso, extra) {
  const res = await sb(`/question_reports?report_type=eq.contact&created_at=gte.${sinceIso}${extra || ''}&select=id&limit=100`);
  if (!res.ok) return null;             // ⚠ null = unknown, never 0
  const rows = await res.json().catch(() => null);
  return Array.isArray(rows) ? rows.length : null;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: HEADERS, body: '' };
  if (event.httpMethod !== 'POST') return reply(405, { ok: false, error: 'method_not_allowed' });
  if (!SERVICE_KEY) return reply(503, { ok: false, error: 'not_configured' });

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch (_) { return reply(400, { ok: false, error: 'bad_json' }); }

  // Honeypot: a field no human can see and every naive bot fills in. Answered
  // with a plain success so the bot has nothing to learn from the difference.
  if (String(body.website || '').trim()) return reply(200, { ok: true });

  const message = String(body.message || '').trim().slice(0, MAX_MESSAGE);
  const name    = String(body.name || '').trim().slice(0, MAX_NAME);
  const email   = String(body.email || '').trim().slice(0, MAX_EMAIL);
  const type    = TYPES[body.type] ? body.type : 'message';

  if (message.length < MIN_MESSAGE) return reply(400, { ok: false, error: 'message_too_short' });
  if (email && !EMAIL_RE.test(email)) return reply(400, { ok: false, error: 'bad_email' });

  // How long the form was on screen before it was sent. Absent (an old cached
  // page, a scripted caller) is treated as instant.
  const elapsed = Number(body.elapsedMs);
  const filled  = Number.isFinite(elapsed) && elapsed >= 0 && elapsed <= MAX_FILL_MS ? elapsed : 0;
  if (filled < MIN_FILL_MS) return reply(400, { ok: false, error: 'too_fast' });

  const spam = looksLikeSpam(message);
  if (spam) return reply(400, { ok: false, error: spam });

  const iph = ipHash(event);
  const cap = isUnknownIp(iph) ? PER_IP_UNKNOWN : PER_IP;
  const since = new Date(Date.now() - IP_WINDOW_MIN * 60000).toISOString();
  const mine  = await countSince(since, `&question_text=ilike.*"iph":"${iph}"*`);
  // ⚠ FAIL CLOSED. This used to allow the message through whenever the count
  // could not be read, so one database hiccup lifted the rate limit entirely —
  // the same shape as the missing-service-key bug this project has already
  // paid for once. The page carries a mailto for exactly this case.
  if (mine === null) return reply(503, { ok: false, error: 'busy' });
  if (mine >= cap) return reply(429, { ok: false, error: 'rate_limited', retryMinutes: IP_WINDOW_MIN });

  const hourly = await countSince(new Date(Date.now() - 3600000).toISOString());
  if (hourly === null) return reply(503, { ok: false, error: 'busy' });
  if (hourly >= PER_HOUR) return reply(429, { ok: false, error: 'busy' });

  // The browser string is the single most useful line in a bug report, and the
  // form says out loud that it is recorded. Nothing else about the sender is.
  const ua = String(event.headers?.['user-agent'] || '').slice(0, 180);
  const meta = {
    studentName: name || 'Guest',
    mode: 'contact',
    guestName: name || null,
    guestEmail: email || null,
    contactType: type,
    ua,
    iph,
    fillMs: filled,
  };

  const res = await sb('/question_reports', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({
      question_id: '__contact__',
      question_text: `Guest contact — ${TYPES[type]}\n__meta__${JSON.stringify(meta)}`,
      message,
      status: 'open',
      report_type: 'contact',
      student_id: null,
      chapter_id: null,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('[contact-message] insert failed', res.status, detail.slice(0, 300));
    return reply(500, { ok: false, error: 'save_failed' });
  }

  return reply(200, { ok: true, replyByEmail: !!email });
};
