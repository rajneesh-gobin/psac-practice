'use strict';
// Read a folder of PDFs and produce the library CATALOGUE — one JSON row per
// document, with everything that can be derived without a human.
//
//   node scripts/library-scan.js                     (defaults to D:/past-papers)
//   node scripts/library-scan.js --src <folder>
//   node scripts/library-scan.js --out <file.json>
//   node scripts/library-scan.js --quick             (skip hashing; structure only)
//
// ⚠ IT WRITES NOTHING BUT THE CATALOGUE. No database, no upload, no deploy, and
//   it never touches the source folder. Run it as often as you like.
//
// ⚠ THE CATALOGUE IS THE INPUT TO EVERYTHING ELSE. The import, the shelf, the
//   dedupe index and the publish step all read these rows, so a field that is
//   wrong here is wrong everywhere downstream. That is why anything it cannot
//   derive is reported as UNRESOLVED rather than guessed: a file filed under
//   the wrong grade is worse than a file nobody has filed yet, because nobody
//   goes looking for it again.
//
// ⚠ Classification comes from the PATH, never from the filename alone. The
//   folder tree was built by a human who knew what each file was; a filename is
//   whatever the ministry's website happened to call it that year.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const ROOT = path.resolve(__dirname, '..');

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const SRC = path.resolve(arg('--src', 'D:/past-papers'));
const OUT = path.resolve(arg('--out', path.join(ROOT, '.library', 'catalogue.json')));
const QUICK = process.argv.includes('--quick');

// ── Document types, derived from the second path segment ───────────────────
// The key is the folder name; `board` is carried separately because Grade 6
// keeps CPE and PSAC papers apart, and they are the same KIND of document from
// two different eras of the same exam.
const TYPES = {
  'exam-papers':            { type: 'exam-paper',       board: null },
  'exam-papers-psac':       { type: 'exam-paper',       board: 'PSAC' },
  'exam-papers-cpe':        { type: 'exam-paper',       board: 'CPE' },
  'examiners-reports':      { type: 'examiners-report', board: null },
  'specimen-papers':        { type: 'specimen-paper',   board: null },
  'practice-materials':     { type: 'practice',         board: null },
  'foundation-programme':   { type: 'foundation',       board: null },
  'extended-programme':     { type: 'extended',         board: null },
  'assessments':            { type: 'assessment',       board: null },
  'diagnostic-assessment':  { type: 'diagnostic',       board: null },
  'frameworks':             { type: 'curriculum',       board: null },
  'pre-primary':            { type: 'curriculum',       board: null },
  'download-provenance':    { type: 'internal',         board: null },
  'kreol-morisien-grades-11-13': { type: 'reference',   board: null },
  'programme-administration':    { type: 'reference',   board: null },
  'teaching-aids':               { type: 'reference',   board: null },
};

// ── What may be published ──────────────────────────────────────────────────
// ⚠ AN ALLOWLIST, AND DELIBERATELY SO. A type that nobody has decided about is
//   HELD, not published: holding a file back can be undone in a second, and
//   publishing one cannot — a PDF that has been downloaded is out. So a new
//   folder type appearing in the corpus is invisible until someone says
//   otherwise, rather than shipping because it looked like the others.
//
// ⚠ These are MINISTRY documents. The decision below is a publishing decision,
//   not a technical one, and it is recorded here so that what shipped is a
//   thing somebody chose rather than a thing a script inferred.
//   Decided 2026-09-23: past papers, specimen papers, practice materials and
//   examiners' reports go out; curriculum and reference material is held.
const PUBLISH_TYPES = new Set(['exam-paper', 'specimen-paper', 'practice', 'examiners-report']);
const HOLD_REASONS = {
  curriculum: 'curriculum framework — held by decision 2026-09-23',
  reference: 'reference material — held by decision 2026-09-23',
  internal: 'internal provenance record, never publishable',
};

// ⚠ NOT A COMPLETE SUBJECT LIST, AND IT MUST NOT BE. This maps a folder name to
//   an existing QUESTION PACK where one exists, so the shelf can offer
//   "practise this topic". Most library subjects have no pack at all — Arabic,
//   Tamil, Telugu, Urdu, Marathi, Modern Chinese, Kreol Rodrigues, Art &
//   Design, Technology Studies — and that is the normal case, not a gap to fix.
//   A subject with no pack simply has no practice link.
const PACK_SUBJECT = {
  mathematics: 'maths',
  'numeracy-maths': 'maths',
  english: 'english',
  'english-literacy': 'english',
  french: 'french',
  'history-geography': 'history',
  science: 'science',
  biology: 'biology',
  chemistry: 'chemistry',
  physics: 'physics',
  ict: 'ict',
  'social-modern-studies': 'social-modern-studies',
};

const PACKS = new Set(
  fs.readdirSync(path.join(ROOT, 'subjects'), { withFileTypes: true })
    .filter(e => e.isDirectory() && !e.name.startsWith('_'))
    .map(e => e.name)
);

function packFor(grade, subject) {
  const suffix = PACK_SUBJECT[subject];
  if (!grade || !suffix) return null;
  const id = `grade${grade}-${suffix}`;
  return PACKS.has(id) ? id : null;
}

// ⚠ A YEAR, NOT A NUMBER THAT LOOKS LIKE ONE. "P120" and "Lesson-1112" are both
//   in these filenames; only 1990-2099 counts, and a leading year wins because
//   that is the convention the folder was built with ("2024-Mathematics.pdf").
function yearFrom(filename) {
  const leading = filename.match(/^(\d{4})[-_ ]/);
  if (leading && +leading[1] >= 1990 && +leading[1] <= 2099) return +leading[1];
  const anywhere = [...filename.matchAll(/\b(19[9]\d|20\d\d)\b/g)].map(m => +m[1]);
  return anywhere.length ? Math.max(...anywhere) : null;
}

// A human title: drop the extension and the leading year, tidy separators, and
// leave the words alone otherwise. Ministry filenames carry real information
// ("Students-Worksheet_G7_Lesson-20_Angles") and rewriting them loses it.
function titleFrom(filename, year) {
  let t = filename.replace(/\.pdf$/i, '');
  if (year) t = t.replace(new RegExp(`^${year}[-_ ]+`), '').replace(new RegExp(`^NCE[-_ ]${year}[-_ ]+`, 'i'), '');
  // ⚠ A HYPHEN IN THESE FILENAMES IS A SPACE, not a dash. Treating it as a dash
  //   turned "A-Pictorial-Primer" into "A - Pictorial - Primer".
  t = t.replace(/[_-]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
  return t || filename.replace(/\.pdf$/i, '');
}

// URL-safe, readable, stable. ⚠ The slug is what a parent's phone names the
// downloaded file, so it has to mean something — a bare hash does not.
function slugify(s) {
  return String(s).toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70);
}

// Approximate, and labelled as such: a real page count needs a PDF parser, and
// this is only used to spot "1 page" (a cover sheet) versus "40 pages".
function pageCount(buf) {
  const text = buf.toString('latin1');
  const n = (text.match(/\/Type\s*\/Page[^s]/g) || []).length;
  return n || null;
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(abs, out);
    else if (/\.pdf$/i.test(entry.name)) out.push(abs);
  }
  return out;
}

function classify(relPath) {
  const parts = relPath.split(/[\\/]/);
  const filename = parts.pop();
  const [first, second, third] = parts;

  let grade = null;
  const gradeMatch = /^grade-0?(\d)$/.exec(first || '');
  if (gradeMatch) grade = +gradeMatch[1];

  // curriculum/ and reference/ are not grade-scoped: their type comes from the
  // segment that names them.
  const typeKey = grade ? second : (second || first);
  const known = TYPES[typeKey] || null;

  const subject = grade ? (third || null) : null;
  const year = yearFrom(filename);

  return {
    grade,
    section: grade ? `grade-${grade}` : (first || 'other'),
    doc_type: known ? known.type : null,
    board: known ? known.board : null,
    subject,
    year,
    title: titleFrom(filename, year),
    pack_id: packFor(grade, subject),
    unresolved: [
      !known ? `unknown folder type "${typeKey}"` : null,
      grade && !subject ? 'no subject folder' : null,
      // ⚠ A SPECIMEN PAPER HAS NO YEAR, and that is not a defect — it is the
      //   specimen for a syllabus, not a sitting. Requiring one flagged all 22
      //   of them on the first run, which is exactly the noise that teaches
      //   someone to skip the report.
      !year && known && ['exam-paper', 'examiners-report'].includes(known.type)
        ? 'no year in filename' : null,
    ].filter(Boolean),
  };
}

// ── Run ────────────────────────────────────────────────────────────────────
if (!fs.existsSync(SRC)) {
  console.error(`Source folder not found: ${SRC}`);
  process.exit(1);
}

console.log(`Scanning ${SRC}${QUICK ? ' (quick: no hashing)' : ''}\n`);
const files = walk(SRC);
const rows = [];
const byHash = new Map();
let bytes = 0;

for (let i = 0; i < files.length; i++) {
  const abs = files[i];
  const rel = path.relative(SRC, abs).split(path.sep).join('/');
  const stat = fs.statSync(abs);
  const meta = classify(rel);

  let sha256 = null, pages = null;
  if (!QUICK) {
    const buf = fs.readFileSync(abs);
    sha256 = crypto.createHash('sha256').update(buf).digest('hex');
    pages = pageCount(buf);
    // ⚠ A PDF that does not start with %PDF- is not a PDF, whatever it is
    //   called. Worth knowing before it becomes a public download.
    if (buf.subarray(0, 5).toString('latin1') !== '%PDF-') meta.unresolved.push('not a PDF (bad magic bytes)');
  }

  // ⚠ THIS IS THE NAME IN THE PARENT'S DOWNLOADS FOLDER, so it has to be both
  //   unique and readable. Three rules, each earned on the first run:
  //   - the GRADE leads, or "2023-english.pdf" from Grade 4 and Grade 6 collide
  //     in one folder and neither can be told from the other;
  //   - the subject is dropped when the title already says it, which is what
  //     produced "2023-english-english";
  //   - repeated adjacent words are collapsed, which is what produced
  //     "history-geography-history-geography-blueprint".
  const titleSlug = slugify(meta.title);
  const subjectSlug = slugify(meta.subject || '');
  const parts = [
    meta.grade ? `g${meta.grade}` : null,
    meta.year || null,
    subjectSlug && !titleSlug.includes(subjectSlug) ? subjectSlug : null,
    titleSlug,
  ].filter(Boolean);
  const slug = slugify(parts.join('-')).split('-')
    .filter((word, idx, all) => word !== all[idx - 1]).join('-');
  const publish = PUBLISH_TYPES.has(meta.doc_type) && !meta.unresolved.length;
  const row = {
    source: rel,
    sha256,
    bytes: stat.size,
    pages,
    ...meta,
    publish,
    hold_reason: publish ? null
      : (meta.unresolved.length ? 'unresolved: ' + meta.unresolved.join('; ')
        : HOLD_REASONS[meta.doc_type] || `type "${meta.doc_type}" has no publishing decision yet`),
    // The published filename. The short hash keeps two same-named papers apart
    // and makes the URL immutable; the slug is what the human sees.
    filename: sha256 ? `${slug}-${sha256.slice(0, 6)}.pdf` : `${slug}.pdf`,
  };
  rows.push(row);
  bytes += stat.size;

  if (sha256) {
    if (!byHash.has(sha256)) byHash.set(sha256, []);
    byHash.get(sha256).push(rel);
  }
  if ((i + 1) % 100 === 0) process.stdout.write(`  ${i + 1}/${files.length}\r`);
}

// ── Report ─────────────────────────────────────────────────────────────────
const mb = (n) => (n / 1048576).toFixed(1) + ' MB';
const tally = (key) => rows.reduce((m, r) => (m[r[key] ?? '(none)'] = (m[r[key] ?? '(none)'] || 0) + 1, m), {});
const table = (obj) => Object.entries(obj).sort((a, b) => b[1] - a[1])
  .map(([k, v]) => `    ${String(v).padStart(4)}  ${k}`).join('\n');

console.log(`${files.length} PDFs, ${mb(bytes)}\n`);
console.log('  By section:\n' + table(tally('section')));
console.log('\n  By document type:\n' + table(tally('doc_type')));

const dupes = [...byHash.entries()].filter(([, list]) => list.length > 1);
const unresolved = rows.filter(r => r.unresolved.length);
const oversize = rows.filter(r => r.bytes > 6 * 1048576);
const withPack = rows.filter(r => r.pack_id).length;
const subjects = tally('subject');
const unmapped = Object.keys(subjects).filter(s => s !== '(none)' && !PACK_SUBJECT[s]);

console.log(`\n  Linked to a question pack: ${withPack} of ${rows.length}`);
console.log(`  Library-only subjects (no pack, and that is fine): ${unmapped.length}`);
console.log(`    ${unmapped.join(', ') || '(none)'}`);

console.log(`\n  ⚠ Byte-identical duplicates: ${dupes.length} group(s)`);
for (const [hash, list] of dupes.slice(0, 15)) {
  console.log(`    ${hash.slice(0, 8)}  ×${list.length}`);
  list.forEach(f => console.log(`              ${f}`));
}
if (dupes.length > 15) console.log(`    … and ${dupes.length - 15} more`);

console.log(`\n  ⚠ Over 6 MB (the upload cap; these are yours, so only a compression hint): ${oversize.length}`);
oversize.sort((a, b) => b.bytes - a.bytes).slice(0, 10)
  .forEach(r => console.log(`    ${mb(r.bytes).padStart(9)}  ${r.source}`));

// ⚠ The publishing decision, printed every run. This is the number that decides
//   what becomes a public URL, so it is reported beside the counts rather than
//   left to be read out of the JSON.
const held = rows.filter(r => !r.publish);
const heldBy = held.reduce((m, r) => (m[r.hold_reason] = (m[r.hold_reason] || 0) + 1, m), {});
console.log(`\n  PUBLISH: ${rows.length - held.length}   HELD: ${held.length}`);
console.log(table(heldBy));

console.log(`\n  ⚠ UNRESOLVED — needs a human before publishing: ${unresolved.length}`);
unresolved.slice(0, 20).forEach(r => console.log(`    ${r.source}\n              → ${r.unresolved.join('; ')}`));
if (unresolved.length > 20) console.log(`    … and ${unresolved.length - 20} more`);

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({
  generated_at: new Date().toISOString(),
  source: SRC,
  count: rows.length,
  bytes,
  documents: rows,
}, null, 1));
console.log(`\nCatalogue written: ${path.relative(ROOT, OUT)} (${rows.length} rows)`);
