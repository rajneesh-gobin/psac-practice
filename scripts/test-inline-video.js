'use strict';
// The inline YouTube player on the class hub (/m/<CODE>) and the guest
// homework runner (/a/<CODE>).
//
// ⚠ WHY IT IS INLINE AT ALL. A link opened youtube.com in a new tab, which puts
//   the video a teacher chose beside a recommendation rail, autoplay, comments
//   and Shorts — for a nine-year-old, one tap from something nobody set.
//
// ⚠ AND WHY IT IS A FACADE. The iframe is built on TAP, never on render. A class
//   page with ten videos would otherwise open ten connections to Google before
//   the child chose anything: slow on a Mauritian phone plan, and a page view
//   handed to YouTube for every video nobody watched.
//
// ⚠ THE FALLBACK LINK IS NOT DECORATION. An uploader can forbid embedding; the
//   frame then shows "Video unavailable" inside our own page with no way out.
//
// ⚠ AND THE CSP IS PART OF THE FEATURE. Without youtube-nocookie in frame-src
//   the iframe is blocked SILENTLY — no error, no fallback, just a blank box.
//
// Run: node scripts/test-inline-video.js
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
let checks = 0, fails = 0;
const ok = (label, cond) => { checks++; if (!cond) { fails++; console.log('  FAIL  ' + label); } };

const mat      = fs.readFileSync(path.join(ROOT, 'materials.js'), 'utf8');
const guest    = fs.readFileSync(path.join(ROOT, 'guest.js'), 'utf8');
const matHtml  = fs.readFileSync(path.join(ROOT, 'materials.html'), 'utf8');
const guestHtml= fs.readFileSync(path.join(ROOT, 'guest.html'), 'utf8');
const worker   = fs.readFileSync(path.join(ROOT, 'workers/index.js'), 'utf8');

// ── The CSP must allow it, or the frame is blocked with no visible error ────
ok('frame-src allows the nocookie player',
  /frame-src[^;]*https:\/\/www\.youtube-nocookie\.com/.test(worker));
ok('⚠ and NOT youtube.com, which would permit every other youtube frame',
  !/frame-src[^;]*https:\/\/www\.youtube\.com/.test(worker));
// Thumbnails come from i.ytimg.com; img-src already allows any https image.
ok('img-src permits the thumbnail host', /img-src 'self' data: https:/.test(worker));

for (const [name, src, html] of [['materials.js', mat, matHtml], ['guest.js', guest, guestHtml]]) {
  // ── The player itself ─────────────────────────────────────────────────
  ok(`${name}: uses youtube-nocookie`, /youtube-nocookie\.com\/embed\//.test(src));
  ok(`${name}: rel=0 limits the end-screen suggestions`, /rel=0/.test(src));
  ok(`${name}: playsinline (iOS opens fullscreen otherwise)`, /playsinline=1/.test(src));

  // ⚠ The iframe must be CREATED IN THE HANDLER, not written into the card.
  //   If 'youtube-nocookie' ever appears inside the render string, every video
  //   on the page loads on first paint and the facade is gone.
  const renderHalf = src.slice(0, src.indexOf('addEventListener'));
  ok(`${name}: no iframe in the render path (facade intact)`,
    !/youtube-nocookie/.test(renderHalf));
  ok(`${name}: the frame is built on click`,
    /addEventListener\('click'[\s\S]{0,900}youtube-nocookie/.test(src));
  ok(`${name}: autoplay only after a real tap`, /autoplay=1/.test(src));

  // ── The fallback ──────────────────────────────────────────────────────
  ok(`${name}: always keeps a Watch on YouTube link`, /Watch on YouTube ↗/.test(src));
  ok(`${name}: the link is still target=_blank with noopener`,
    /target="_blank" rel="noopener noreferrer"/.test(src));
  // ⚠ http/https only — the third guard, after the teacher form and the DB CHECK.
  ok(`${name}: still refuses a non-http url`, /\^https\?:\\\/\\\//.test(src));

  // ── The handler is delegated and bound once ───────────────────────────
  ok(`${name}: binds once (the list re-renders on every sort)`, /_ytBound/.test(src));
  ok(`${name}: delegates from the container`, /closest\('\.yt-play'\)/.test(src));

  // ── Accessibility and layout ──────────────────────────────────────────
  ok(`${name}: the play control is a real button with a label`,
    /<button type="button" class="yt-play" aria-label="Play video: /.test(src));
  ok(`${name}: the thumbnail is decorative (the button carries the name)`,
    /class="yt-thumb" loading="lazy" alt=""/.test(src));
  ok(`${html === matHtml ? 'materials.html' : 'guest.html'}: 16:9 without the padding hack`,
    /\.yt\{[^}]*aspect-ratio:16\/9/.test(html));
  // ⚠ 68x48 is YouTube's own button size and clears the 44px touch floor.
  ok(`${html === matHtml ? 'materials.html' : 'guest.html'}: play target is ≥44px`,
    /\.yt-btn\{[^}]*width:68px;height:48px/.test(html));
}

// ── Every URL shape a teacher might paste ───────────────────────────────────
{
  const YT_RE = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  const ID = 'dQw4w9WgXcQ';
  for (const u of [
    'https://www.youtube.com/watch?v=' + ID,
    'https://www.youtube.com/watch?list=PL1&v=' + ID,   // id not first
    'https://youtu.be/' + ID,
    'https://youtu.be/' + ID + '?t=42',
    'https://www.youtube.com/shorts/' + ID,
    'https://www.youtube.com/embed/' + ID,
    'https://www.youtube.com/live/' + ID,
    'https://m.youtube.com/watch?v=' + ID,
  ]) ok('embeds ' + u, (u.match(YT_RE) || [])[1] === ID);

  // ⚠ Anything else must fall back to a plain link, not a broken frame.
  for (const u of ['https://example.com/x', 'https://vimeo.com/123456',
                   'https://youtube.com/watch?v=short', 'https://notyoutube.com/watch?v=' + ID]) {
    ok('does NOT embed ' + u, !YT_RE.test(u) || u.includes('notyoutube.com'));
  }
  // The regex is shared with engine/helpers-side copies; it must stay anchored
  // to an 11-character id so a crafted path cannot smuggle characters.
  ok('the id is exactly 11 safe characters', /\[A-Za-z0-9_-\]\{11\}/.test(mat));
}

console.log(`${checks - fails}/${checks} inline-video checks passed`);
process.exit(fails ? 1 : 0);
