'use strict';
// The per-subject landing pages: are they honest, crawlable, and in step with
// the packs they describe?
//
// ⚠ These pages are the most PUBLIC thing this project owns — written to be a
//   stranger's first impression, and cached by Google far longer than anything
//   can be corrected. Three ways they can go wrong, all silent:
//     1. they drift from the packs (a renamed chapter, a pack gone comingSoon);
//     2. they become doorway pages (templated, near-identical, no real prose) —
//        which Google penalises at the DOMAIN level, not the page level;
//     3. they quietly grow a <script src> and stop being renderable by a crawler,
//        which is the exact failure the landing page already had.
//
// Run: node scripts/test-subject-pages.js
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const COPY = require('./subject-page-copy.js');

let checks = 0, fails = 0;
const ok = (label, cond, extra) => {
  checks++;
  if (!cond) { fails++; console.log('  FAIL  ' + label + (extra ? '\n          ' + extra : '')); }
};

// ── the packs, as the app registers them ───────────────────────────────────
const packs = [];
for (const ln of fs.readFileSync(path.join(ROOT, 'subjects/_index.js'), 'utf8').split(/\r?\n/)) {
  if (!ln.startsWith('registerSubject(')) continue;
  try { packs.push(JSON.parse(ln.slice('registerSubject('.length, ln.lastIndexOf('});') + 1))); }
  catch (_) {}
}
ok('read the pack index', packs.length > 0);

const pages = [];
for (const dir of ['psac', 'nce']) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) continue;
  for (const f of fs.readdirSync(abs)) {
    if (f.endsWith('.html')) pages.push({ rel: dir + '/' + f, html: fs.readFileSync(path.join(abs, f), 'utf8') });
  }
}
ok('found at least one generated subject page', pages.length > 0);

// ⚠ /faq comes out of the SAME generator and is published the same way, so it
//   gets the same crawlability and no-price guarantees rather than a second,
//   near-identical test file of its own. It maps to no pack, so section 2 skips
//   it — that is what `standalone` marks, and nothing else.
const faqPath = path.join(ROOT, 'faq.html');
ok('the generated /faq page exists', fs.existsSync(faqPath),
  'run: node scripts/build-subject-pages.js');
if (fs.existsSync(faqPath)) {
  pages.push({ rel: 'faq.html', html: fs.readFileSync(faqPath, 'utf8'), standalone: true });
}

// ── 1. Generated output is not stale ───────────────────────────────────────
// ⚠ The generator is the only writer. If someone hand-edits a page, or renames a
//   chapter without re-running it, this is what says so.
const { execFileSync } = require('node:child_process');
let staleErr = null;
try {
  execFileSync(process.execPath, [path.join(ROOT, 'scripts/build-subject-pages.js'), '--check'],
    { cwd: ROOT, stdio: 'pipe' });
} catch (e) { staleErr = (e.stdout || '') + (e.stderr || ''); }
ok('generated pages and sitemap.xml are up to date',
  !staleErr, String(staleErr).trim().split('\n').slice(0, 4).join('\n          '));

// ── 2. Every page still matches a LIVE pack ────────────────────────────────
// ⚠ A page for a pack that has gone comingSoon is a public promise of content
//   the app will not serve — the same failure as a share message naming a
//   subject that opens empty.
for (const p of pages) {
  if (p.standalone) continue;
  const slug = path.basename(p.rel, '.html');           // grade-6-maths
  const packId = slug.replace(/^grade-(\d)-/, 'grade$1-');
  const pack = packs.find((x) => x.id === packId);
  ok(`${p.rel} maps to a real pack`, !!pack, 'looked for pack id: ' + packId);
  if (!pack) continue;
  ok(`${p.rel} — its pack is live (not comingSoon)`, !pack.comingSoon);

  // every chapter the pack declares is named on the page, and nothing else is
  const missing = (pack.chapters || []).filter((c) => !p.html.includes(c.name
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')));
  ok(`${p.rel} — lists every chapter the pack declares`, missing.length === 0,
    missing.map((c) => c.name).join(', '));
}

// ── 3. Crawlable: nothing to run, nothing to wait for ──────────────────────
for (const p of pages) {
  ok(`${p.rel} — loads no external script`, !/<script[^>]+src=/i.test(p.html),
    'the whole point of these pages is that they render with nothing running');
  ok(`${p.rel} — has exactly one <h1>`, (p.html.match(/<h1[\s>]/g) || []).length === 1);
  ok(`${p.rel} — declares a canonical url`,
    new RegExp('<link rel="canonical" href="https://nouklass\\.com/'
      + (p.standalone ? 'faq"' : '(psac|nce)/')).test(p.html));
  const desc = (p.html.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1];
  ok(`${p.rel} — meta description present and <= 160 chars`,
    !!desc && desc.replace(/&amp;/g, '&').length <= 160,
    'length: ' + desc.replace(/&amp;/g, '&').length);
  let ld = null;
  try { ld = JSON.parse((p.html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || [, ''])[1]); } catch (_) {}
  ok(`${p.rel} — JSON-LD parses`, !!ld);

  // ⚠ Local links must resolve. /privacy and /image-credits are extensionless
  //   because Cloudflare serves them that way (probed); the files are .html.
  const refs = [...p.html.matchAll(/href="(\/[^"#]*)"|src="(\/[^"#]*)"/g)]
    .map((m) => (m[1] || m[2]).replace(/^\//, '')).filter(Boolean);
  const broken = refs.filter((u) => {
    if (u === '') return false;                                   // "/" is the app
    if (/^(psac|nce)\//.test(u)) return !fs.existsSync(path.join(ROOT, u + '.html'));
    return !['', '.html'].some((s) => fs.existsSync(path.join(ROOT, u + s)));
  });
  ok(`${p.rel} — every local link resolves`, broken.length === 0, broken.join(', '));
}

// ── 4. Not a doorway page ──────────────────────────────────────────────────
// ⚠ The thing that makes these legitimate is that someone WROTE them. A template
//   with the chapter list poured in is what Google penalises, so the prose has to
//   be real and it has to differ between pages.
const ids = Object.keys(COPY);
for (const id of ids) {
  const c = COPY[id];
  ok(`${id} — has at least two paragraphs of prose`, Array.isArray(c.about) && c.about.length >= 2);
  const words = (c.about || []).join(' ').split(/\s+/).filter(Boolean).length;
  ok(`${id} — prose is substantial (>= 90 words, got ${words})`, words >= 90);
  ok(`${id} — lede is <= 160 chars`, (c.lede || '').length <= 160, 'length: ' + (c.lede || '').length);
  ok(`${id} — has subject-specific practice notes`, Array.isArray(c.focus) && c.focus.length >= 2);
}

// No two pages may share a paragraph. ⚠ This is the doorway test that actually
// bites: copy-pasting one subject's prose and changing the subject name is the
// natural shortcut when writing 46 of these, and it is precisely what must not
// ship.
const seen = new Map();
for (const id of ids) for (const para of (COPY[id].about || [])) {
  const key = para.slice(0, 60);
  if (seen.has(key) && seen.get(key) !== id) {
    ok(`prose is unique per subject (${id} vs ${seen.get(key)})`, false, key + '…');
  } else seen.set(key, id);
}
ok('no two subjects share a paragraph', true);

// ── 5. Promises that must not appear ───────────────────────────────────────
// ⚠ The "free right now" promise carries NO end date on any surface, and pricing
//   is hidden rather than deleted. A generated page must not be where either
//   comes back — 46 cached pages is the worst possible place to have to correct.
// ⚠ CHECKED AGAINST THE PROSE, NOT THE RENDERED PAGE. The first version of this
//   read p.html and its currency pattern was `\b(Rs\s?\d|…)\b` — which matches
//   almost nothing: the trailing \b after a single \d fails on any multi-digit
//   amount, so "Rs 1000", "Rs 250" and "only Rs 99 a month" all passed as clean
//   while "Rs 5." was caught. It looked like a working guard for as long as
//   nobody tested it.
//   Reading the page was also wrong in principle: grade3-maths legitimately
//   declares a chapter called "Money to Rs 1000", so a currency amount on the
//   page is not evidence of a price. What must not appear is a price for THE
//   PRODUCT, and that can only come from the copy.
const PRICE = /(?:\bRs\b|\brupees?\b|\bMUR\b)\s*\d|\d+\s*(?:rupees?|MUR)\b/i;
// ⚠ A BILLING PERIOD ALONE IS NOT A PRICE. This started as a flat word list that
//   included "a month" and "a year", and it fired on two perfectly innocent
//   sentences — "understood something about the shape of the course a year before
//   anybody tells them" and "asking for causes and their consequences instead of
//   for a year to recall". A check that cries wolf gets deleted by the next
//   person, which is worse than not having it. So a period only counts as a
//   subscription claim when there is MONEY beside it; the explicit billing words
//   stand on their own. Bare "price" is deliberately not listed — "the price of
//   ignoring it" is ordinary prose.
const PERIOD = /\b(?:per|a)\s+(?:month|year)\b/i;
const SUB_WORDS = /\b(subscription|subscribe|monthly fee|pricing|free trial)\b/i;
for (const [id, c] of Object.entries(COPY)) {
  const prose = [c.lede, ...(c.about || []), ...(c.focus || [])].join(' ');
  ok(`${id} — copy states no price`, !PRICE.test(prose), prose.match(PRICE)?.[0]);
  const subs = SUB_WORDS.test(prose) || (PRICE.test(prose) && PERIOD.test(prose));
  ok(`${id} — copy makes no subscription claim`, !subs,
    subs ? (prose.match(SUB_WORDS) || prose.match(PERIOD) || [])[0] : '');
  ok(`${id} — promises no deadline for "free"`, !/free\s+(until|till|through)\b/i.test(prose));
  ok(`${id} — claims no "free forever"`, !/free\s+forever/i.test(prose));
}
// The rendered page still gets the two checks that do not depend on curriculum
// vocabulary — a deadline or "free forever" is never a legitimate chapter name.
for (const p of pages) {
  ok(`${p.rel} — promises no deadline for "free"`, !/free\s+(until|till|through)\b/i.test(p.html));
  ok(`${p.rel} — claims no "free forever"`, !/free\s+forever/i.test(p.html));
}

// ── 6. Published grades match the generator's own allowlist ──────────────
// ⚠ DERIVED, NOT HARDCODED. This check used to assert "no grade 7 or 8 page",
//   and when that hold was lifted on 2026-09-16 the test had to be edited in the
//   same breath as the generator — two places holding one decision, which is how
//   they drift. It now reads GRADES_NAMED_PUBLICLY out of the generator, so the
//   allowlist is stated once and this fails only if a page exists for a grade the
//   generator would refuse to emit (a stale file left behind by a narrowing).
const genSrc = fs.readFileSync(path.join(ROOT, 'scripts/build-subject-pages.js'), 'utf8');
const allowRaw = (genSrc.match(/GRADES_NAMED_PUBLICLY = new Set\(\[([^\]]*)\]/) || [, ''])[1];
const allowed = new Set(allowRaw.split(',').map((n) => Number(n.trim())).filter((n) => n));
ok('read GRADES_NAMED_PUBLICLY from the generator', allowed.size > 0, 'got: ' + allowRaw);

const outside = pages.filter((p) => {
  const g = Number((path.basename(p.rel).match(/^grade-(\d)-/) || [, 0])[1]);
  return g && !allowed.has(g);
});
ok('no page published for a grade the generator excludes',
  outside.length === 0, outside.map((p) => p.rel).join(', '));

// ⚠ And the converse: a grade in the allowlist with live packs and copy MUST have
//   its pages, or the allowlist is lying about what is published.
for (const g of allowed) {
  const livePacks = packs.filter((p) => p.grade === g && !p.comingSoon && COPY[p.id]);
  const built = pages.filter((p) => new RegExp('^(psac|nce)/grade-' + g + '-').test(p.rel));
  ok('grade ' + g + ': every live pack with copy has a page',
    built.length === livePacks.length,
    'copy for ' + livePacks.length + ', pages ' + built.length);
}

// ── 7. The sitemap agrees ──────────────────────────────────────────────────
const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
for (const p of pages) {
  const url = 'https://nouklass.com/' + p.rel.replace(/\.html$/, '');
  ok(`sitemap lists ${p.rel}`, sitemap.includes('<loc>' + url + '</loc>'));
}
const locs = (sitemap.match(/<loc>/g) || []).length;
ok('sitemap has no urls beyond the core three plus the pages',
  locs === pages.length + 3, 'locs: ' + locs + ', pages: ' + pages.length);

// ── 8. They are staged for deploy ──────────────────────────────────────────
// ⚠ Generating a page that prepare-deploy does not copy ships nothing — the same
//   trap .well-known and robots.txt both hit.
const prep = fs.readFileSync(path.join(ROOT, 'scripts/prepare-deploy.js'), 'utf8');
const dirsLine = (prep.match(/const DIRS = \[([^\]]*)\]/) || [, ''])[1];
ok("prepare-deploy stages 'psac'", /'psac'/.test(dirsLine));
ok("prepare-deploy stages 'nce'", /'nce'/.test(dirsLine));

// ⚠ And they must NOT be precached: 46 marketing pages in a child's offline
//   shell is the opposite of the point, and every one would re-download on every
//   SHELL_VERSION bump.
const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
const shell = (sw.match(/const SHELL_FILES = \[([\s\S]*?)\n\];/) || [, ''])[1];
ok('subject pages are NOT in the service-worker shell',
  !/\/(psac|nce)\//.test(shell));
ok('/faq is NOT in the service-worker shell either', !/faq\.html/.test(shell));

// ── 7. /faq renders every answer, and is the ONLY page that renders them ──
// ⚠ WHAT CHANGED ON 2026-09-24 AND WHY THIS SECTION STILL EXISTS. /faq used to
//   be DERIVED from the landing page: its first six answers were read out of the
//   FAQPage JSON-LD in index.html, because those six were also visible there, and
//   the risk was the two URLs answering one question with almost the same words.
//   The landing FAQ moved here, scripts/faq-copy.js became the only source, and
//   that particular drift is now impossible.
// ⚠ THE REPLACEMENT RISK IS COVERAGE, and it is quieter than the one it replaced.
//   An answer added to faq-copy.js reaches a reader only if the generator is
//   re-run; un-run, faq-copy.js and faq.html disagree and NOTHING about the site
//   looks broken — the page loads, the old answers are all correct, and the new
//   one is simply not there. That is checked below rather than assumed.
{
  const FAQ_COPY = require('./faq-copy.js');
  const faq = pages.find((p) => p.standalone);
  const norm = (s) => s.replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ').trim();

  const all = [...(FAQ_COPY.core || []), ...(FAQ_COPY.extra || [])];
  ok('faq-copy.js declares a core[] and an extra[]',
    !!(FAQ_COPY.core || []).length && !!(FAQ_COPY.extra || []).length,
    'core ' + (FAQ_COPY.core || []).length + ', extra ' + (FAQ_COPY.extra || []).length);

  if (faq) {
    const visible = norm(faq.html);
    for (const qa of all) {
      ok('/faq renders the answer verbatim: ' + qa.q.slice(0, 44),
        visible.includes(norm(qa.q)) && visible.includes(norm(qa.a)),
        'regenerate: node scripts/build-subject-pages.js');
    }
    ok('/faq renders every answer and no others',
      (faq.html.match(/<div class="qa">/g) || []).length === all.length,
      (faq.html.match(/<div class="qa">/g) || []).length + ' blocks, ' + all.length + ' authored');

    // ⚠ No two questions may be near-duplicates: that is the doorway pattern
    //   inside a single page, and an answer engine then quotes whichever it saw
    //   last. It used to only be possible between core and extra; now that they
    //   sit in one file it is possible within either.
    const seen = new Map();
    for (const e of all) {
      const k = norm(e.q).toLowerCase();
      ok('question is asked only once on /faq: ' + e.q.slice(0, 44), !seen.has(k));
      seen.set(k, true);
    }
  }

  // ⚠ index.html MUST NOT carry a FAQPage block any more. Google requires the
  //   markup to describe text the visitor can see, and the landing page now shows
  //   one teaser answer whose eleven siblings are on another URL. Marking that up
  //   as an FAQ is the doorway pattern stated in schema.
  const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  ok('index.html declares no FAQPage block (it moved to /faq)',
    !(indexHtml.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || [])
      .some((b) => b.includes('"FAQPage"')));

  // ⚠ AND /faq MUST BE LINKED. It was in sitemap.xml and nothing else for as long
  //   as it existed, which is how a page carrying twelve answers stayed invisible
  //   to every reader who does not parse sitemaps. Losing the link again would
  //   break nothing, 404 nothing, and undo the entire reason the FAQ moved here.
  ok('index.html links to /faq', /href="\/faq"/.test(indexHtml));
  for (const pg of pages.filter((x) => !x.standalone).slice(0, 3)) {
    ok('subject page links to /faq: ' + pg.rel, /href="\/faq"/.test(pg.html));
  }
  // The same three promise rules the subject copy has, on the FAQ prose.
  const prose = [FAQ_COPY.lede, ...FAQ_COPY.intro,
    ...FAQ_COPY.extra.flatMap((e) => [e.q, e.a])].join(' ');
  ok('faq-copy.js states no price', !PRICE.test(prose), prose.match(PRICE)?.[0]);
  ok('faq-copy.js makes no subscription claim',
    !SUB_WORDS.test(prose) && !(PRICE.test(prose) && PERIOD.test(prose)));
  ok('faq-copy.js promises no deadline for "free"', !/free\s+(until|till|through)\b/i.test(prose));
  ok('faq-copy.js claims no "free forever"', !/free\s+forever/i.test(prose));
  ok('the FAQ lede is <= 160 chars (it is the search result)',
    FAQ_COPY.lede.length <= 160, 'length: ' + FAQ_COPY.lede.length);

  // ⚠ A sitemap entry pointing at a file prepare-deploy.js does not ship is a
  //   404 advertised to Google. The psac/ and nce/ DIRS are covered above; this
  //   one is a root file and had to be named.
  const prep = fs.readFileSync(path.join(ROOT, 'scripts/prepare-deploy.js'), 'utf8');
  ok('prepare-deploy.js ships faq.html', /'faq\.html'/.test(prep));
  ok('sitemap.xml lists /faq',
    /<loc>https:\/\/nouklass\.com\/faq<\/loc>/.test(fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8')));
}

console.log(fails
  ? `\n  ${checks - fails}/${checks} subject-page checks passed, ${fails} FAILED`
  : `\n  ${checks}/${checks} subject-page checks passed`);
process.exit(fails ? 1 : 0);
