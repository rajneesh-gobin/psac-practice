// STUB — web-push / VAPID signing requires Node.js crypto not available in Workers free tier.
// TODO: implement VAPID signing with crypto.subtle when needed.

export default async function handler(request) {
  return new Response(
    JSON.stringify({ ok: false, error: 'push_not_implemented', message: 'Web Push reminders not yet implemented for Cloudflare Workers.' }),
    { status: 501, headers: { 'Content-Type': 'application/json' } }
  );
}
