'use strict';
// The grade range Nou Klass promises, and the picture it promises it with.
//
// ⚠ WHY THIS EXISTS. index.html has carried a comment for months telling the
//   next person to keep og:description, _appShareText() (app.js), _inviteText()
//   (auth.js) and the landing hero in step. A comment is not a check, and on
//   2026-09-16 they were measured apart: the hero had been corrected to
//   "Grades 1–6 (PSAC) and Grades 7–9 (NCE)" when grades 1-3 and 7-8 went live,
//   and the other THREE still said "Grades 4–6". The app had been under-promising
//   for a week and nothing noticed.
//
// ⚠ AND IT IS ABOUT TO MATTER MORE. og:image is now a banner with the coverage
//   sentence DRAWN INTO THE ARTWORK ("PSAC Grades 1–6 · NCE Grade 9"). The image
//   and og:description render in the SAME Facebook card, so a drift that used to
//   be a wording inconsistency is now one card contradicting itself in two
//   different fonts. ⚠ Facebook caches a scrape far longer than a WhatsApp
//   message survives, and neither can be corrected once forwarded.
//
// ⚠ This file deliberately checks AGREEMENT plus a floor, not one hard-coded
//   range. Widening the promise is allowed — it is what should have happened
//   when grades 1-3 went live — as long as every surface widens together and
//   the packs are actually there.
//
// Run: node scripts/test-share-copy-parity.js
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
let checks = 0, fails = 0;
const ok = (label, cond, extra) => {
  checks++;
  if (!cond) { fails++; console.log('  FAIL  ' + label + (extra ? '\n          ' + extra : '')); }
};

const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const index = read('index.html');
const app   = read('engine/app.js');
const auth  = read('engine/auth.js');

const meta = (prop) => {
  const re = new RegExp('<meta (?:property|name)="' + prop + '" content="([^"]*)"');
  return (index.match(re) || [])[1] || '';
};

// ── 1. The grade range, on every surface that states one ────────────────────
// ⚠ Both dash characters. The copy uses an EN DASH (–) and a hyphen is the
//   obvious typo; matching only one would let a surface drift through.
const RANGE = /Grades\s+(\d)\s*[–-]\s*(\d)/;
const rangeOf = (s) => { const m = s.match(RANGE); return m ? m[1] + '-' + m[2] : null; };

// ⚠ STRIP THE COMMENTS FIRST. These two functions carry a note explaining the
//   range they used to promise, and the first run of this file read "Grades 4–6"
//   out of that note and reported a drift that did not exist. The check is about
//   the string a parent receives, not the commentary around it.
//   (`(^|\s)//` cannot match the `//` in an https: url — that one follows a colon.)
const uncomment = (s) => s.replace(/(^|\s)\/\/.*$/gm, '');

const heroLine = (index.match(/Interactive revision for [^<]+/) || [''])[0];
const shareText  = uncomment((app.match(/function _appShareText\(\)\s*\{[\s\S]*?\n\}/) || [''])[0]);
// ⚠ _inviteBody(bold) is the SHARED source for both invite renderings, so the
//   range is read once from it. _inviteText() / _inviteTextWhatsApp() are now
//   one-line wrappers with no copy of their own — asserted below, because the
//   day someone inlines a second literal into one of them is the day the
//   share-sheet and WhatsApp messages start disagreeing silently.
const inviteText = uncomment((auth.match(/function _inviteBody\(bold\)\s*\{[\s\S]*?\n  \}/) || [''])[0]);

ok('found the landing hero coverage line', !!heroLine);
ok('found _appShareText() in app.js', !!shareText);
ok('found _inviteBody() in auth.js', !!inviteText);

// ── WhatsApp *bold* may only reach WhatsApp ─────────────────────────────────
// ⚠ navigator.share() hands its text to a target nobody chose in advance —
//   mail, SMS, Notes, Telegram — and WhatsApp's *asterisk bold* is literal
//   asterisks in all of them. So the plain renderings must carry no markup,
//   and only the wa.me callers may take a bold one.
const plainCallers = [
  ['shareInvite() → navigator.share', /navigator\.share\(\{[^}]*text:\s*(\w+)\(\)/],
];
for (const [label, re] of plainCallers) {
  const fn = (auth.match(re) || [])[1];
  ok(`${label} sends the PLAIN form`, fn === '_inviteText', 'it sends: ' + fn + '()');
}
const waCallers = [
  ['shareInviteWhatsApp()', auth, /function shareInviteWhatsApp\(\)[\s\S]*?\n  \}/, '_inviteTextWhatsApp'],
  ['shareAppWhatsApp()',    app,  /function shareAppWhatsApp\(\)[\s\S]*?\n\}/,      '_appShareText'],
];
for (const [label, src, re, expect] of waCallers) {
  const body = (src.match(re) || [''])[0];
  ok(`${label} builds from ${expect}()`, body.includes(expect + '()'));
  ok(`${label} posts to wa.me`, /wa\.me/.test(body));
}

// ⚠ The two invite renderings must stay wrappers over the one body. A literal
//   string re-appearing in either is the drift this split exists to prevent.
for (const name of ['_inviteText', '_inviteTextWhatsApp']) {
  const body = (auth.match(new RegExp('function ' + name + '\\(\\)\\s*\\{[^}]*\\}')) || [''])[0];
  ok(`${name}() is a thin wrapper over _inviteBody()`,
    /_inviteBody\((?:true|false)\)/.test(body) && !/['"`]/.test(body),
    'body: ' + body.replace(/\s+/g, ' ').slice(0, 80));
}

// ── The landing FAQ, added 2026-09-22 ──────────────────────────────────────
// ⚠ TWO MORE SURFACES, and the first ones aimed at a MACHINE rather than a
//   parent: the visible FAQ and the FAQPage JSON-LD that mirrors it are what an
//   LLM quotes when someone asks it where to revise for the PSAC. A stale range
//   here is repeated by an answer engine to people who never see the site, and
//   unlike a Facebook card there is no scrape to re-run.
// ⚠ STRIP HTML COMMENTS FIRST, for the same reason uncomment() exists above —
//   the section carries a note about the range it promises, and reading a range
//   out of the commentary is a drift report that is not real.
const faqHtml = ((index.match(/<section id="landing-faq"[\s\S]*?<\/section>/) || [''])[0])
  .replace(/<!--[\s\S]*?-->/g, '');
const faqLd = (index.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || [])
  .find((s) => s.includes('"FAQPage"')) || '';

const SURFACES = {
  // ⚠ The <meta name="description"> is the SEARCH RESULT, added 2026-09-16. It
  //   is the only surface here a parent reads BEFORE they ever reach the site,
  //   so a stale range in it is a promise broken before the first click.
  'meta description':    meta('description'),
  'og:description':      meta('og:description'),
  'twitter:description': meta('twitter:description'),
  'og:image:alt':        meta('og:image:alt'),
  'landing hero':        heroLine,
  '_appShareText()':     shareText,
  '_inviteText()':       inviteText,
  'landing FAQ':         faqHtml,
  'FAQPage JSON-LD':     faqLd,
};

const ranges = {};
for (const [name, text] of Object.entries(SURFACES)) {
  ok(`${name} states a grade range`, !!text && !!rangeOf(text),
    text ? 'text: ' + text.slice(0, 90) : 'surface not found at all');
  if (text && rangeOf(text)) ranges[name] = rangeOf(text);
}

const distinct = [...new Set(Object.values(ranges))];
ok('every surface promises the SAME grade range', distinct.length === 1,
  distinct.length > 1
    ? Object.entries(ranges).map(([k, v]) => `${k} → Grades ${v}`).join('\n          ')
    : '');

// ── 2. The promise is backed by packs that exist ────────────────────────────
// ⚠ Judge by CONTENT, not by the comingSoon flag — three Grade 9 packs were
//   once flipped live holding one sample question each. Depth is
//   test-live-pack-content.js's job (it reads source, so it cannot be fooled by
//   a stale build); what THIS file adds is that no grade we ADVERTISE is empty.
const packs = [];
for (const ln of read('subjects/_index.js').split(/\r?\n/)) {
  if (!ln.startsWith('registerSubject(')) continue;
  try { packs.push(JSON.parse(ln.slice('registerSubject('.length, ln.lastIndexOf('});') + 1))); }
  catch (_) { /* the generator writes one call per line; a parse failure is caught below */ }
}
ok('read the generated pack index', packs.length > 0);

const claimed = distinct.length === 1 ? distinct[0].split('-').map(Number) : null;
if (claimed) {
  for (let g = claimed[0]; g <= claimed[1]; g++) {
    const live = packs.filter((p) => p.grade === g && !p.comingSoon);
    ok(`grade ${g} is advertised and has at least one live pack`, live.length > 0);
  }
}

// ⚠ The opposite failure, and the one that actually happened: a grade that is
//   live and populated but named nowhere. A review, not a failure — naming a
//   grade in the share copy is a product decision, and the banner artwork has
//   to be redrawn to match it.
// ⚠ "Named" has to mean what a READER would take as named, so every range in
//   the copy is expanded, not just the first one the parity check reads. The
//   first version matched a literal "Grades 8" and reported grade 8 unnamed
//   while the copy plainly said "Grades 7–9" — a review line that sends the
//   next person redrawing a banner for a grade already covered is worse than
//   no review line at all.
const namedGrades = (() => {
  const all = Object.values(SURFACES).join(' ');
  const named = new Set();
  for (const m of all.matchAll(/Grades\s+(\d)\s*[–-]\s*(\d)/g)) {
    for (let g = +m[1]; g <= +m[2]; g++) named.add(g);
  }
  for (const m of all.matchAll(/Grades?\s+(\d)\b/g)) named.add(+m[1]);
  return named;
})();

if (claimed) {
  const unnamed = [...new Set(packs.filter((p) => !p.comingSoon).map((p) => p.grade))]
    .filter((g) => !namedGrades.has(g))
    .sort();
  if (unnamed.length) {
    console.log('  REVIEW  live but named on no share surface: grade ' + unnamed.join(', '));
    console.log('          Widening the copy means redrawing assets/og-banner.jpg too.');
  }
}

// ── 3. The banner itself ────────────────────────────────────────────────────
// ⚠ Facebook does not resolve a relative path, and a card whose image 404s
//   renders blank — with the blank version cached.
const ogImg = meta('og:image');
ok('og:image is an absolute https url', /^https:\/\//.test(ogImg), 'got: ' + ogImg);
ok('twitter:image matches og:image', meta('twitter:image') === ogImg);
ok('og:image:alt is present', !!meta('og:image:alt'));

const imgPath = ogImg.replace(/^https?:\/\/[^/]+\//, '');
ok('the banner exists in the repo at that path', fs.existsSync(path.join(ROOT, imgPath)),
  'looked for: ' + imgPath);

// ⚠ prepare-deploy.js copies whole DIRS. If the banner ever moves out of one of
//   them it is simply not deployed, and the card goes blank with no error here.
const prep = read('scripts/prepare-deploy.js');
const topDir = imgPath.split('/')[0];
ok(`prepare-deploy.js ships ${topDir}/`, new RegExp("'" + topDir + "'").test(prep));

if (fs.existsSync(path.join(ROOT, imgPath))) {
  // Minimal JPEG SOF reader — no image library is installed on this machine.
  const buf = fs.readFileSync(path.join(ROOT, imgPath));
  let w = 0, h = 0, i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xFF) { i++; continue; }
    const m = buf[i + 1];
    if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC) {
      h = buf.readUInt16BE(i + 5); w = buf.readUInt16BE(i + 7); break;
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  ok('the banner is 1200×630 (Facebook crops to ~1.91:1)', w === 1200 && h === 630,
    'measured: ' + w + '×' + h);
  ok('og:image:width agrees with the file', meta('og:image:width') === String(w),
    'tag: ' + meta('og:image:width') + ', file: ' + w);
  ok('og:image:height agrees with the file', meta('og:image:height') === String(h),
    'tag: ' + meta('og:image:height') + ', file: ' + h);
  // ⚠ Facebook's hard limit is 8 MB; large images also scrape slowly enough to
  //   time out on a first share, which is the scrape that gets cached.
  ok('the banner is under 1 MB', buf.length < 1024 * 1024,
    (buf.length / 1024).toFixed(0) + ' KB');
  ok('summary_large_image needs at least 300×157', w >= 300 && h >= 157);
}

ok('twitter:card is summary_large_image', meta('twitter:card') === 'summary_large_image');

console.log(`${checks - fails}/${checks} share-copy-parity checks passed`);
process.exit(fails ? 1 : 0);
