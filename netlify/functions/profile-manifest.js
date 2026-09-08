'use strict';

const clean = (value, max) => String(value || '').replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, max);

exports.handler = async event => {
  const q = event.queryStringParameters || {};
  const key = clean(q.key, 64);
  const type = q.type === 'teacher' ? 'teacher' : 'student';
  const name = clean(q.name, 24) || (type === 'teacher' ? 'Teacher' : 'Student');
  if (!/^[a-f0-9]{32}$/i.test(key)) return { statusCode: 400, body: 'Invalid profile installation.' };
  const shortName = name.slice(0, 12);
  const icon = `/.netlify/functions/profile-icon?key=${encodeURIComponent(key)}&name=${encodeURIComponent(name)}&type=${type}`;
  const manifest = {
    id: `/installed/${type}/${key}`,
    name: `${name} — PSAC Practice`,
    short_name: shortName,
    description: type === 'teacher' ? 'Open my PSAC Practice teacher workspace' : `Open ${name}'s PSAC practice space`,
    start_url: `/?profile=${encodeURIComponent(key)}`,
    scope: '/', display: 'standalone', orientation: 'portrait-primary',
    background_color: type === 'teacher' ? '#173a27' : '#312e81',
    theme_color: type === 'teacher' ? '#244f34' : '#6366f1',
    lang: 'en', categories: ['education'],
    icons: [{src: icon, sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable'}],
    prefer_related_applications: false
  };
  return {
    statusCode: 200,
    headers: {'Content-Type':'application/manifest+json; charset=utf-8','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'},
    body: JSON.stringify(manifest)
  };
};

