// GET /api/profile-icon?key=...&name=...&type=teacher|student

const clean = (value, max) => String(value || '').replace(/[^\p{L}\p{N} ._-]/gu, '').trim().slice(0, max);
const xml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));

export default async function handler(request) {
  const url = new URL(request.url);
  const q = url.searchParams;
  const key = String(q.get('key') || '');
  if (!/^[a-f0-9]{32}$/i.test(key)) return new Response('Invalid icon.', { status: 400 });
  const teacher = q.get('type') === 'teacher';
  const name = clean(q.get('name'), 24) || (teacher ? 'Teacher' : 'Student');
  const initial = xml((Array.from(name)[0] || 'P').toUpperCase());
  const c1 = teacher ? '#2f7a4d' : '#7c3aed';
  const c2 = teacher ? '#12311f' : '#312e81';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="512" height="512" rx="112" fill="url(#g)"/><circle cx="256" cy="235" r="145" fill="#fff" opacity=".15"/><text x="256" y="315" text-anchor="middle" font-family="Arial,sans-serif" font-size="225" font-weight="800" fill="#fff">${initial}</text><circle cx="405" cy="405" r="58" fill="#facc15"/><text x="405" y="430" text-anchor="middle" font-family="Arial,sans-serif" font-size="60" fill="#332600">★</text></svg>`;
  return new Response(svg, {
    status: 200,
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8', 'Cache-Control': 'public, max-age=86400', 'X-Content-Type-Options': 'nosniff' },
  });
}
