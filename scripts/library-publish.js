'use strict';
// Turn the catalogue into a published library: the section tree, the rows, and
// the staged files that `prepare-deploy.js` will ship.
//
//   node scripts/library-publish.js                 (dry run — shows the plan)
//   node scripts/library-publish.js --apply         (writes rows, stages files)
//   node scripts/library-publish.js --apply --limit 10
//
// ⚠ DRY RUN IS THE DEFAULT, like db-query.js and preflight.js. Nothing is
//   written and nothing is copied unless --apply is given.
//
// ⚠ IT NEVER TOUCHES THE SOURCE FOLDER, and it never DELETES a document row. A
//   row in the database that the catalogue no longer knows about is REPORTED,
//   not removed — the same rule the question importer follows, for the same
//   reason: the catalogue is one person's current view, and a delete cannot be
//   undone by re-running anything.
//
// ⚠ INTENT IS NOT FACT. An admin setting status='published' is an INTENTION;
//   the file may not have been deployed yet. Only this script sets
//   `published_at`, and only after the file is actually staged — so the shelf
//   can require both and never link a reader to a file that has not shipped.
//
// ⚠ It does NOT deploy. After it runs you still look at what it staged, then
//   run prepare-deploy.js and wrangler yourself.
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const { loadEnv } = require('./lib/load-env');
loadEnv();

const SB_URL = process.env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SB_KEY) { console.error('SUPABASE_SERVICE_ROLE_KEY is not set (.env)'); process.exit(1); }

const H = { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY, 'Content-Type': 'application/json' };

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const APPLY = process.argv.includes('--apply');
const LIMIT = Number(arg('--limit', 0)) || 0;
const CATALOGUE = path.resolve(arg('--catalogue', path.join(ROOT, '.library', 'catalogue.json')));
const STAGE = path.join(ROOT, 'library');

async function rest(pathname, init = {}) {
  const res = await fetch(`${SB_URL}/rest/v1/${pathname}`, { ...init, headers: { ...H, ...(init.headers || {}) } });
  const text = await res.text();
  let body = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!res.ok) throw new Error(`${res.status} ${pathname} — ${String(text).slice(0, 300)}`);
  return body;
}

// ── Display names ──────────────────────────────────────────────────────────
// ⚠ A SHELF LABEL IS READ BY A PARENT, so "history-geography" will not do. The
//   exceptions are the ones that title-casing gets wrong; everything else falls
//   through to Capitalised Words, which is right for Arabic, Hindi, Tamil and
//   the rest without listing them.
const NAMES = {
  ict: 'ICT',
  'history-geography': 'History & Geography',
  'social-modern-studies': 'Social & Modern Studies',
  'business-entrepreneurship': 'Business & Entrepreneurship',
  'art-design': 'Art & Design',
  'technology-studies': 'Technology Studies',
  'food-textiles': 'Food & Textiles',
  'kreol-morisien': 'Kreol Morisien',
  'kreol-rodrigues': 'Kreol Rodrigues',
  'modern-chinese': 'Modern Chinese',
  'english-literacy': 'English Literacy',
  'numeracy-maths': 'Numeracy & Maths',
  mathematics: 'Mathematics',
  general: 'General',
  'road-safety': 'Road Safety',
};
const display = (slug) => NAMES[slug]
  || String(slug).split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const GRADE_ICONS = { 3: '🌱', 4: '📗', 5: '📘', 6: '📙', 7: '📕', 8: '📓', 9: '🎓' };

// ── Plan ───────────────────────────────────────────────────────────────────
if (!fs.existsSync(CATALOGUE)) {
  console.error(`No catalogue at ${CATALOGUE}. Run: node scripts/library-scan.js`);
  process.exit(1);
}
const catalogue = JSON.parse(fs.readFileSync(CATALOGUE, 'utf8'));
const all = catalogue.documents;
const publishable = all.filter(d => d.publish);
const selected = LIMIT ? publishable.slice(0, LIMIT) : publishable;
// Held documents are recorded too, so they are visible in the admin panel and
// can be released later without re-running a scan — but their files are NOT
// staged, because nothing that is not published may sit in a public folder.
const held = all.filter(d => !d.publish);

console.log(`\nCatalogue: ${all.length} documents (${publishable.length} publishable, ${held.length} held)`);
console.log(`Selected:  ${selected.length}${LIMIT ? ` (--limit ${LIMIT})` : ''}`);
console.log(APPLY ? 'Mode:      APPLY — rows will be written and files staged\n'
                  : 'Mode:      DRY RUN — nothing will be written (pass --apply)\n');

// Sections needed by the selected documents, plus the held ones so the admin
// panel has somewhere to put them.
const sections = new Map(); // slug -> { slug, name, grade, icon, children: Map }
function wantSection(doc) {
  const rootSlug = doc.section;
  if (!sections.has(rootSlug)) {
    sections.set(rootSlug, {
      slug: rootSlug,
      name: doc.grade ? `Grade ${doc.grade}` : display(rootSlug),
      grade: doc.grade,
      icon: doc.grade ? (GRADE_ICONS[doc.grade] || '📘') : '📚',
      sort: doc.grade || 90,
      children: new Map(),
    });
  }
  const root = sections.get(rootSlug);
  if (!doc.subject) return { root, child: null };
  if (!root.children.has(doc.subject)) {
    root.children.set(doc.subject, {
      slug: doc.subject, name: display(doc.subject), grade: doc.grade, pack_id: doc.pack_id || null,
    });
  }
  return { root, child: root.children.get(doc.subject) };
}
[...selected, ...held].forEach(wantSection);

const rootList = [...sections.values()].sort((a, b) => a.sort - b.sort);
console.log('Section tree:');
for (const r of rootList) {
  const kids = [...r.children.keys()];
  console.log(`  ${r.icon} ${r.name}  (${kids.length} subject${kids.length === 1 ? '' : 's'})`);
}

// ── Pre-flight on the files ────────────────────────────────────────────────
// ⚠ CHECK BEFORE WRITING ANYTHING. Two files vanished from the source folder
//   during one afternoon's work, so "the catalogue said it was there" is not
//   the same as "it is there".
const problems = [];
for (const doc of selected) {
  const abs = path.join(catalogue.source, doc.source);
  if (!fs.existsSync(abs)) { problems.push(`missing: ${doc.source}`); continue; }
  const size = fs.statSync(abs).size;
  if (size !== doc.bytes) problems.push(`changed since the scan (${doc.bytes} → ${size}): ${doc.source}`);
  const fd = fs.openSync(abs, 'r');
  const head = Buffer.alloc(5);
  fs.readSync(fd, head, 0, 5, 0);
  fs.closeSync(fd);
  if (head.toString('latin1') !== '%PDF-') problems.push(`not a PDF: ${doc.source}`);
}
if (problems.length) {
  console.log(`\n⚠ ${problems.length} problem(s) — nothing was written:`);
  problems.slice(0, 20).forEach(p => console.log('   ' + p));
  console.log('\nRe-run `node scripts/library-scan.js` if the source folder has changed.');
  process.exit(1);
}
console.log(`\n✓ all ${selected.length} source files present, unchanged and valid PDFs`);

if (!APPLY) {
  console.log('\nWould stage:');
  selected.slice(0, 10).forEach(d => console.log(`   library/${d.filename}   ← ${d.source}`));
  if (selected.length > 10) console.log(`   … and ${selected.length - 10} more`);
  console.log(`\nWould record ${selected.length} published and ${held.length} held document rows.`);
  console.log('\nDry run only. Re-run with --apply to write.\n');
  process.exit(0);
}

// ── Apply ──────────────────────────────────────────────────────────────────
(async () => {
  // 1. Sections. Upserted by slug, so re-running is a no-op.
  //    ⚠ Root rows rely on library_sections_root_slug_unique (a PARTIAL index):
  //      the table's own UNIQUE (parent_id, slug) does not constrain a NULL
  //      parent, because Postgres treats NULLs as distinct. Measured, then
  //      fixed in 20260923_library_root_uniqueness.sql.
  //    ⚠ SELECT-THEN-INSERT for roots, NOT an upsert. `on_conflict=slug` fails
  //      with 42P10 "no unique or exclusion constraint matching the ON CONFLICT
  //      specification": Postgres can only infer a PARTIAL unique index when the
  //      statement repeats its WHERE predicate, and PostgREST does not emit one.
  //      Measured against the live database, not assumed.
  const rootIds = new Map();
  for (const r of rootList) {
    const found = await rest(`library_sections?select=id&parent_id=is.null&slug=eq.${encodeURIComponent(r.slug)}&limit=1`);
    if (found.length) { rootIds.set(r.slug, found[0].id); continue; }
    const rows = await rest('library_sections?select=id,slug', {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify({ slug: r.slug, name: r.name, grade: r.grade, icon: r.icon, sort_order: r.sort, parent_id: null }),
    });
    rootIds.set(r.slug, rows[0].id);
  }
  let childCount = 0;
  const childIds = new Map(); // `${rootSlug}/${subject}` -> id
  for (const r of rootList) {
    const parent = rootIds.get(r.slug);
    const kids = [...r.children.values()].sort((a, b) => a.name.localeCompare(b.name));
    for (let i = 0; i < kids.length; i++) {
      const k = kids[i];
      const rows = await rest('library_sections?on_conflict=parent_id,slug&select=id,slug', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
        body: JSON.stringify({
          parent_id: parent, slug: k.slug, name: k.name, grade: k.grade,
          pack_id: k.pack_id, sort_order: i, icon: null,
        }),
      });
      childIds.set(`${r.slug}/${k.slug}`, rows[0].id);
      childCount++;
    }
  }
  console.log(`  sections: ${rootIds.size} shelves, ${childCount} subjects`);

  // 2. Stage the files FIRST. A row that claims to be published while its file
  //    is absent is the one state a reader can see and we cannot explain.
  fs.mkdirSync(STAGE, { recursive: true });
  let staged = 0;
  for (const doc of selected) {
    const from = path.join(catalogue.source, doc.source);
    const to = path.join(STAGE, doc.filename);
    if (!fs.existsSync(to) || fs.statSync(to).size !== doc.bytes) { fs.copyFileSync(from, to); staged++; }
  }
  console.log(`  staged:   ${staged} file(s) copied into library/ (${selected.length} total)`);

  // 3. The rows.
  const now = new Date().toISOString();
  const sectionFor = (d) => (d.subject ? childIds.get(`${d.section}/${d.subject}`) : rootIds.get(d.section)) || null;
  // ⚠ WHAT A PARENT ACTUALLY TYPES, not what the row happens to contain. Three
  //   things go in beyond the obvious fields:
  //   · CPE. Parents in Mauritius still call the Grade 6 exam that, years after
  //     it became PSAC. A search for "CPE" returning nothing reads as an empty
  //     library, not as a vocabulary mismatch.
  //   · MES and MIE, the bodies whose name is on the paper.
  //   · The document type in words a person uses — "past paper", "marking",
  //     "revision" — rather than the slug.
  // ⚠ Built from METADATA, not from the PDF's text layer. Extracting text needs
  //   pdftotext, which is not installed here, and half this corpus is scanned
  //   images with no text layer at all. Metadata search is honest about what it
  //   covers; a half-populated full-text index would not be.
  const TYPE_WORDS = {
    'exam-paper': 'past paper exam question paper',
    'examiners-report': 'examiners report marking marks comments',
    'specimen-paper': 'specimen sample blueprint',
    practice: 'practice revision worksheet',
    foundation: 'foundation programme worksheet',
    extended: 'extended programme',
    diagnostic: 'diagnostic assessment',
    assessment: 'assessment',
  };
  const searchTextFor = (d) => {
    const bits = [
      d.title, d.subject && d.subject.replace(/-/g, ' '), d.year,
      d.grade ? `grade ${d.grade} g${d.grade}` : '',
      d.board, TYPE_WORDS[d.doc_type] || d.doc_type,
      d.board === 'CPE' ? 'cpe certificate of primary education' : '',
      d.grade && d.grade <= 6 ? 'psac cpe primary mes' : '',
      d.grade && d.grade >= 7 ? 'nce mie secondary' : '',
    ];
    return bits.filter(Boolean).join(' ').toLowerCase().replace(/\s+/g, ' ').slice(0, 900);
  };

  const rowFor = (d, publish) => ({
    search_text: searchTextFor(d),
    sha256: d.sha256,
    filename: d.filename,
    storage: 'static',
    section_id: sectionFor(d),
    grade: d.grade, subject: d.subject, doc_type: d.doc_type, board: d.board,
    year: d.year, title: d.title, pages: d.pages, bytes: d.bytes,
    pack_id: d.pack_id,
    status: publish ? 'published' : 'pending',
    hold_reason: publish ? null : d.hold_reason,
    source: 'seed',
    published_at: publish ? now : null,
  });

  async function upsert(rows) {
    let n = 0;
    for (let i = 0; i < rows.length; i += 100) {
      const batch = rows.slice(i, i + 100);
      await rest('library_documents?on_conflict=sha256', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify(batch),
      });
      n += batch.length;
      process.stdout.write(`  rows:     ${n}/${rows.length}\r`);
    }
    return n;
  }

  const pub = await upsert(selected.map(d => rowFor(d, true)));
  const hel = await upsert(held.map(d => rowFor(d, false)));
  console.log(`  rows:     ${pub} published, ${hel} held                    `);

  // 4. What the database holds that the catalogue does not. Reported, never
  //    deleted.
  const known = new Set(all.map(d => d.sha256));
  const existing = await rest('library_documents?select=sha256,filename,source&source=eq.seed&limit=5000');
  const orphans = existing.filter(r => !known.has(r.sha256));
  if (orphans.length) {
    console.log(`\n⚠ ${orphans.length} seed row(s) in the database that the catalogue no longer lists:`);
    orphans.slice(0, 10).forEach(o => console.log('   ' + o.filename));
    console.log('   Nothing was deleted. Remove them deliberately if that is what you want.');
  }

  console.log('\nNext: node scripts/prepare-deploy.js  →  wrangler deploy\n');
})().catch(e => { console.error('\nFAILED: ' + e.message); process.exit(1); });
