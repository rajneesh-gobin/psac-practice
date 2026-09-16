'use strict';
// Generates one static landing page per subject, plus sitemap.xml.
//
// WHY. Google ranks PAGES, not sites. 46 live packs and 457 chapters of
// curriculum sat behind exactly one indexable URL, so there was one page to
// compete for every query at once — and a parent does not search "Nou Klass",
// they search "PSAC grade 6 maths fractions". These pages give each subject a
// URL of its own that says what it covers, in words a crawler can read without
// running 2.51 MB of JavaScript.
//
// ⚠ WHAT THESE PAGES ARE NOT. They carry the syllabus SHAPE — chapter names, a
//   description, a link into the app. They never carry question content. The
//   questions stay behind /api/questions where entitlement is enforced, and
//   nothing here is allowed to become a second route to them.
//
// ⚠ NO ENGINE, NO AUTH, NO SUPABASE, NO SERVICE WORKER. A page here is static
//   HTML with one inline <style>. It must never grow a <script src>: the whole
//   point is that it renders with nothing running. Keep them OUT of SHELL_FILES
//   too — precaching marketing pages into a child's offline shell is backwards.
//
// ⚠ EVERY NUMBER IS MEASURED HERE, NEVER TYPED IN THE COPY. Chapter names and
//   counts come from subjects/_index.js (the same data the app registers, so
//   they cannot disagree with it) and question counts from the built bundles,
//   rounded DOWN so growth can never make them wrong in the flattering
//   direction. scripts/subject-page-copy.js holds prose and nothing else.
//
// Run: node scripts/build-subject-pages.js
//      node scripts/build-subject-pages.js --check   (fail if output is stale)
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const COPY = require('./subject-page-copy.js');
const CHECK = process.argv.includes('--check');

const SITE = 'https://nouklass.com';

// ⚠ PSAC is grades 1-6, NCE is 7-9. This mirrors _gradeStage() / _PSAC_MAX_GRADE
//   in engine/app.js, which is the single definition. It is duplicated here
//   rather than imported because app.js cannot be loaded outside a browser.
const PSAC_MAX_GRADE = 6;
const stageOf = (grade) => (grade <= PSAC_MAX_GRADE ? 'psac' : 'nce');

// Which grades may have a public page. ⚠ THIS IS A PRODUCT DECISION, NOT A BUILD
//   SETTING — it controls what the site advertises to strangers.
//
// ⚠ Grades 7 and 8 were HELD here until 2026-09-16 and are now published on the
//   owner's explicit instruction. The hold existed because they are named on NO
//   share surface: assets/og-banner.jpg has "PSAC Grades 1–6 · NCE Grade 9" DRAWN
//   INTO THE ARTWORK, and the six surfaces in test-share-copy-parity.js all say
//   the same. Publishing these pages does NOT make that copy wrong — the grade 7
//   and 8 packs hold real content, so the pages promise nothing the app cannot
//   serve — but it does mean the site now RANKS for two grades its own homepage
//   does not mention.
// ⚠ THE REMAINING INCONSISTENCY IS DELIBERATE AND UNFINISHED: widening the share
//   copy to name grades 7-8 requires REDRAWING THE BANNER in the same change, or
//   one Facebook card contradicts itself in two different fonts — the artwork
//   saying 1–6 and 9, the text saying 1–9. Facebook caches a scrape far longer
//   than it can be corrected. So the copy was left alone on purpose; it is the
//   banner that gates it, not this file.
const GRADES_NAMED_PUBLICLY = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

// ── read the pack index ────────────────────────────────────────────────────
const packs = [];
for (const ln of fs.readFileSync(path.join(ROOT, 'subjects/_index.js'), 'utf8').split(/\r?\n/)) {
  if (!ln.startsWith('registerSubject(')) continue;
  try { packs.push(JSON.parse(ln.slice('registerSubject('.length, ln.lastIndexOf('});') + 1))); }
  catch (_) { /* the generator writes one call per line; a miss is caught by the count check */ }
}
if (!packs.length) { console.error('could not read subjects/_index.js'); process.exit(1); }

// ── measured question counts, rounded down ─────────────────────────────────
// ⚠ Rounded DOWN to the nearest 50 and rendered as "700+". An exact count in a
//   cached page is wrong the moment anyone writes a question; a floor only ever
//   becomes more true. Missing bundle → the page simply omits the number.
function questionFloor(packId) {
  const f = path.join(ROOT, 'netlify/question-bundles', packId + '.json');
  if (!fs.existsSync(f)) return null;
  try {
    const rows = JSON.parse(fs.readFileSync(f, 'utf8'));
    const n = Array.isArray(rows) ? rows.length : 0;
    if (n < 50) return null;
    return Math.floor(n / 50) * 50;
  } catch (_) { return null; }
}

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const slugOf = (packId) => packId.replace(/^grade(\d)-/, 'grade-$1-');

// ── the page ───────────────────────────────────────────────────────────────
const CSS = `
:root{--bg:#1e1b4b;--bg2:#2e1065;--card:rgba(255,255,255,.06);--line:rgba(255,255,255,.14);
--fg:#f5f3ff;--dim:#c7d2fe;--accent:#fbbf24}
*{box-sizing:border-box}
body{margin:0;background:linear-gradient(160deg,var(--bg),var(--bg2) 60%,#172554);
color:var(--fg);font:16px/1.65 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
-webkit-text-size-adjust:100%}
.wrap{max-width:52rem;margin:0 auto;padding:1.25rem 1.1rem 3rem}
a{color:var(--accent)}
nav.top{display:flex;flex-wrap:wrap;gap:.35rem 1rem;align-items:center;
padding:.25rem 0 1.5rem;font-size:.85rem}
nav.top a{color:var(--dim);text-decoration:none;font-weight:600}
nav.top a:hover{color:#fff}
.brand{font-weight:800;color:#fff;margin-right:auto;font-size:1rem;text-decoration:none}
h1{font-size:clamp(1.6rem,5vw,2.4rem);line-height:1.2;margin:.2rem 0 .6rem;font-weight:800}
.lede{font-size:1.06rem;color:var(--dim);margin:0 0 1.4rem}
.meta{display:flex;flex-wrap:wrap;gap:.45rem;margin:0 0 1.8rem;padding:0;list-style:none}
.meta li{background:var(--card);border:1px solid var(--line);border-radius:999px;
padding:.3rem .8rem;font-size:.82rem;font-weight:600}
h2{font-size:1.18rem;margin:2rem 0 .7rem;font-weight:700}
p{margin:0 0 1rem}
ul.ch{list-style:none;padding:0;margin:0;display:grid;gap:.4rem;
grid-template-columns:repeat(auto-fill,minmax(15rem,1fr))}
ul.ch li{background:var(--card);border:1px solid var(--line);border-radius:.6rem;
padding:.55rem .8rem;font-size:.92rem}
ul.ch li .b{display:block;font-size:.72rem;color:var(--accent);font-weight:700;
letter-spacing:.03em;text-transform:uppercase}
ul.pts{padding-left:1.1rem;margin:0 0 1rem}
ul.pts li{margin:0 0 .5rem}
.cta{display:inline-block;margin:1.6rem 0 .4rem;background:linear-gradient(90deg,#f59e0b,#ec4899);
color:#fff;text-decoration:none;font-weight:800;padding:.85rem 1.6rem;border-radius:999px;
font-size:1.02rem}
.also{margin:2.4rem 0 0;padding-top:1.4rem;border-top:1px solid var(--line)}
.also a{display:inline-block;margin:0 .7rem .5rem 0;color:var(--dim);font-size:.9rem}
footer{margin-top:2.5rem;padding-top:1.2rem;border-top:1px solid var(--line);
font-size:.82rem;color:var(--dim)}
footer a{color:var(--dim);margin-right:1rem}
`.trim();

function buildPage(pack, copy, siblings) {
  const stage = stageOf(pack.grade).toUpperCase();
  const url = `${SITE}/${stageOf(pack.grade)}/${slugOf(pack.id)}`;
  const heading = `${stage} Grade ${pack.grade} ${pack.name}`;
  const title = `${heading} — Free Practice Questions | Nou Klass`;
  const chapters = pack.chapters || [];
  const floor = questionFloor(pack.id);

  const chips = [
    `${chapters.length} chapters`,
    floor ? `${floor}+ questions` : null,
    'Aligned with the MIE curriculum',
  ].filter(Boolean);

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        name: `${heading} practice`,
        description: copy.lede,
        url,
        inLanguage: 'en-GB',
        educationalLevel: `Grade ${pack.grade}`,
        teaches: chapters.map((c) => c.name),
        provider: {
          '@type': 'EducationalOrganization',
          name: 'Nou Klass',
          url: SITE + '/',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Nou Klass', item: SITE + '/' },
          { '@type': 'ListItem', position: 2, name: heading, item: url },
        ],
      },
    ],
  };

  return [
    '<!-- ⚠ GENERATED by scripts/build-subject-pages.js — DO NOT HAND-EDIT.',
    '     Prose lives in scripts/subject-page-copy.js; chapter names and counts are',
    '     measured from subjects/_index.js and the built bundles. Edit either of',
    '     those and re-run the generator. scripts/test-subject-pages.js fails the',
    '     build if this file has drifted from them.',
    '     ⚠ Never add a <script src> here: this page exists to render with nothing',
    '     running, which is the entire reason it can be indexed. -->',
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(copy.lede)}">`,
    `<link rel="canonical" href="${url}">`,
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="Nou Klass">',
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:title" content="${esc(heading)} — Free Practice Questions">`,
    `<meta property="og:description" content="${esc(copy.lede)}">`,
    `<meta property="og:image" content="${SITE}/assets/og-banner.jpg">`,
    '<meta property="og:locale" content="en_GB">',
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${esc(heading)} — Free Practice Questions">`,
    `<meta name="twitter:description" content="${esc(copy.lede)}">`,
    `<meta name="twitter:image" content="${SITE}/assets/og-banner.jpg">`,
    '<link rel="icon" href="/icons/icon-192.png">',
    `<style>${CSS}</style>`,
    '<script type="application/ld+json">',
    JSON.stringify(ld, null, 2),
    '</script>',
    '</head>',
    '<body>',
    '<div class="wrap">',
    '<nav class="top">',
    '<a class="brand" href="/">🎓 Nou Klass</a>',
    '<a href="/">Home</a>',
    '<a href="/privacy">Privacy</a>',
    '</nav>',
    `<h1>${esc(heading)} — Free Practice Questions</h1>`,
    `<p class="lede">${esc(copy.lede)}</p>`,
    '<ul class="meta">' + chips.map((c) => `<li>${esc(c)}</li>`).join('') + '</ul>',
    ...copy.about.map((p) => `<p>${esc(p)}</p>`),
    `<h2>What ${esc(heading)} covers</h2>`,
    '<ul class="ch">',
    ...chapters.map((c) => '<li>' + (c.enrichment ? '<span class="b">Bonus</span>' : '')
      + esc(c.name) + '</li>'),
    '</ul>',
    '<h2>How it is practised</h2>',
    '<ul class="pts">',
    ...copy.focus.map((p) => `<li>${esc(p)}</li>`),
    '</ul>',
    // ⚠ Links to "/" on purpose. The app has NO deep link to a subject — the only
    //   URL params it reads are auth flows (join=, signin=, friend=). Pointing
    //   here at an invented ?pack= would land the visitor on a page that ignores
    //   it. Adding a real deep link is an app change and a separate decision.
    '<a class="cta" href="/">Start practising free →</a>',
    siblings.length ? '<div class="also"><h2>Other subjects</h2>'
      + siblings.map((s) => `<a href="${s.href}">${esc(s.label)}</a>`).join('')
      + '</div>' : '',
    '<footer>',
    '<a href="/">Nou Klass home</a><a href="/privacy">Privacy</a>',
    '<a href="/image-credits">Image credits</a>',
    '<p>Free exam practice for Mauritian pupils. Everything is free while the app is being built.</p>',
    '</footer>',
    '</div>',
    '</body>',
    '</html>',
    '',
  ].filter((l) => l !== '').join('\n');
}

// ── choose what to build ───────────────────────────────────────────────────
const live = packs.filter((p) => !p.comingSoon);
const wanted = [];
const skippedNoCopy = [];
const skippedHeld = [];

for (const p of live) {
  if (!GRADES_NAMED_PUBLICLY.has(p.grade)) { skippedHeld.push(p.id); continue; }
  if (!COPY[p.id]) { skippedNoCopy.push(p.id); continue; }
  wanted.push(p);
}

// ⚠ Copy for a pack that is comingSoon, held, or simply gone would silently do
//   nothing. Name it — a page written and never published is the failure mode
//   nobody notices.
const orphanCopy = Object.keys(COPY).filter((id) => !wanted.some((p) => p.id === id));

const written = [];
for (const p of wanted) {
  const siblings = wanted
    .filter((s) => s.id !== p.id && (s.grade === p.grade || s.name === p.name))
    .slice(0, 12)
    .map((s) => ({
      href: `/${stageOf(s.grade)}/${slugOf(s.id)}`,
      label: `Grade ${s.grade} ${s.name}`,
    }));

  const rel = path.join(stageOf(p.grade), slugOf(p.id) + '.html');
  const abs = path.join(ROOT, rel);
  const html = buildPage(p, COPY[p.id], siblings);

  const existing = fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : null;
  if (existing !== html) {
    if (CHECK) { console.error('STALE: ' + rel.replace(/\\/g, '/')); process.exitCode = 1; }
    else { fs.mkdirSync(path.dirname(abs), { recursive: true }); fs.writeFileSync(abs, html, 'utf8'); }
  }
  written.push(rel.replace(/\\/g, '/'));
}

// ── sitemap.xml, from the same run so it cannot disagree ───────────────────
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<!-- ⚠ GENERATED by scripts/build-subject-pages.js — do not hand-edit.',
  '     Extensionless on purpose: Cloudflare 307s /privacy.html -> /privacy, so the',
  '     .html form is not the canonical URL. No <lastmod> — a hardcoded date here',
  '     goes stale silently and is worse than absent, and Google ignores',
  '     <priority> entirely. -->',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  `  <url><loc>${SITE}/</loc></url>`,
  `  <url><loc>${SITE}/privacy</loc></url>`,
  `  <url><loc>${SITE}/image-credits</loc></url>`,
  ...written.map((rel) => `  <url><loc>${SITE}/${rel.replace(/\.html$/, '')}</loc></url>`),
  '</urlset>',
  '',
].join('\n');

const smPath = path.join(ROOT, 'sitemap.xml');
if (fs.readFileSync(smPath, 'utf8') !== sitemap) {
  if (CHECK) { console.error('STALE: sitemap.xml'); process.exitCode = 1; }
  else fs.writeFileSync(smPath, sitemap, 'utf8');
}

// ── report ─────────────────────────────────────────────────────────────────
console.log((CHECK ? 'checked ' : 'wrote ') + written.length + ' subject pages, '
  + (written.length + 3) + ' urls in sitemap.xml');
if (skippedNoCopy.length) {
  console.log('  no copy yet (' + skippedNoCopy.length + ', no page emitted — this is the '
    + 'doorway-page guard, not a bug):');
  console.log('    ' + skippedNoCopy.join(' '));
}
if (skippedHeld.length) {
  console.log('  HELD — not published by product decision ('
    + skippedHeld.length + '):');
  console.log('    ' + skippedHeld.join(' '));
}
if (orphanCopy.length) {
  console.log('  ⚠ copy written but NOT published (pack missing, comingSoon or held): '
    + orphanCopy.join(' '));
}
if (CHECK && process.exitCode) {
  console.error('\n  subject pages are stale — run: node scripts/build-subject-pages.js');
}
