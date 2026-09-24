'use strict';
// Build the PUBLIC demo shelf — assets/demo/shelf.js, one small sample of the
// real past-paper library, for the landing-page preview.
//
//   node scripts/build-demo-shelf.js
//
// WHY THIS EXISTS
// The landing page shows a stranger a shelf of real Mauritian exam papers —
// the thing a parent is actually trying to find when they search. The papers
// themselves ship: library/*.pdf is copied whole by scripts/prepare-deploy.js.
// What does NOT ship is the catalogue that describes them: .library/ is a
// dotfolder, deliberately left out of the deploy, because it carries the
// provenance of every file — the local scan path it came from, its sha256, the
// documents that were HELD and the reason they were held. A landing page that
// read the catalogue directly would publish all of that.
//
// So the shelf is fed by a small, FROZEN, deliberately-public sample instead,
// generated here and reviewed as a publishing decision.
//
// ⚠⚠ EVERYTHING THIS SCRIPT WRITES IS WORLD-READABLE FOREVER.
//   assets/ is copied whole by prepare-deploy.js and nothing 404s it. The
//   output therefore carries SIX FIELDS PER DOCUMENT AND NOTHING ELSE:
//
//       grade · subject · year · doc_type · title · filename
//
//   and must NEVER carry any of these, each for its own reason:
//     · source      — a local Windows path (D:\past-papers\…). It names a
//                     private machine and its directory layout. This is the
//                     one that would be least noticed and matters most.
//     · sha256      — the full digest of a file we did not author. Publishing
//                     it invites exact-copy matching against other corpora.
//     · bytes/pages — nothing a visitor needs, and a size map of the whole
//                     library is a scraping aid.
//     · hold_reason — free text written for us, about documents we chose NOT
//                     to publish. It can name a person or a rights doubt.
//     · unresolved  — the classifier's own uncertainty; internal review state.
//     · board       — inconsistently filled (441 of 657 published rows are
//                     null), so it reads as fact while being blank two thirds
//                     of the time.
//     · pack_id     — an internal join key to subjects/<pack>, not a label.
//   The filter below is an ALLOW-list built by naming the six kept fields, not
//   a delete-list of the banned ones: a field added to the catalogue tomorrow
//   is then absent by default rather than published by default.
//
// WHAT IS EXCLUDED, AND WHY
//   · publish !== true      — the catalogue's own gate. A held document is
//                             held; it may not appear even as a title.
//   · the other ~617 papers — this is a SAMPLE, not the library. The totals
//                             below are computed from the full published set
//                             so the slide can quote the real size honestly
//                             while showing only a shelf's worth of covers.
//
// ⚠ DETERMINISTIC. Every shuffle is seeded off a fixed string, so re-running
//   picks the same papers unless the catalogue changed. A public sample that
//   churned every build would mean the shelf, the screenshots and the thing a
//   parent was shown yesterday all disagreed.
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const CATALOGUE = path.join(ROOT, '.library', 'catalogue.json');
const OUT_DIR = path.join(ROOT, 'assets', 'demo');
const OUT = path.join(OUT_DIR, 'shelf.js');

// ⚠ THE ALLOW-LIST. Adding a field here is a publishing decision — read the
//   header before you do. Nothing else from a catalogue row is ever emitted.
const PUBLIC_FIELDS = ['grade', 'subject', 'year', 'doc_type', 'title', 'filename'];

const TARGET = 72;
// Anything from this year onward is "recent". Older papers still qualify —
// they are simply offered last within their bucket.
const RECENT_FROM = 2021;

// ── seeded shuffle, so the public sample is stable across builds ────────────
function seedOf(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function shuffled(arr, seed) {
  const a = arr.slice();
  let s = seed || 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1103515245) + 12345) >>> 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── read the catalogue ──────────────────────────────────────────────────────
if (!fs.existsSync(CATALOGUE)) {
  console.error('missing ' + path.relative(ROOT, CATALOGUE) + ' — nothing to build from');
  process.exit(1);
}
const catalogue = JSON.parse(fs.readFileSync(CATALOGUE, 'utf8'));
const all = Array.isArray(catalogue.documents) ? catalogue.documents : [];
// ⚠ `publish === true`, not truthy. A row whose flag is a string, or missing,
//   is not a decision to publish it.
const published = all.filter((d) => d && d.publish === true && d.filename);
if (!published.length) {
  console.error('no published documents in the catalogue — refusing to write an empty shelf');
  process.exit(1);
}

// ── totals, from the FULL published set ─────────────────────────────────────
// ⚠ The slide quotes these. They describe the library, not the sample, and
//   that is the whole point: the shelf shows 40 covers and says "657 papers".
const byType = {};
const subjects = new Set();
const grades = new Set();
let minYear = Infinity, maxYear = -Infinity;
for (const d of published) {
  const t = d.doc_type || 'other';
  byType[t] = (byType[t] || 0) + 1;
  if (d.subject) subjects.add(d.subject);
  if (d.grade != null) grades.add(d.grade);
  if (typeof d.year === 'number' && isFinite(d.year)) {
    if (d.year < minYear) minYear = d.year;
    if (d.year > maxYear) maxYear = d.year;
  }
}
const totals = {
  documents: published.length,
  byType: Object.fromEntries(Object.keys(byType).sort().map((k) => [k, byType[k]])),
  minYear: isFinite(minYear) ? minYear : null,
  maxYear: isFinite(maxYear) ? maxYear : null,
  subjects: subjects.size,
  grades: [...grades].sort((a, b) => a - b),
};

// ── choose the sample ───────────────────────────────────────────────────────
// Ordering INSIDE a subject bucket: exam papers first, then specimen, then the
// rest; recent years ahead of older ones; newest first; then by filename, so a
// tie never depends on the catalogue's own row order.
const TYPE_RANK = { 'exam-paper': 0, 'specimen-paper': 1, practice: 2, 'examiners-report': 3 };
function rank(d) {
  const y = (typeof d.year === 'number' && isFinite(d.year)) ? d.year : -1;
  return [TYPE_RANK[d.doc_type] == null ? 9 : TYPE_RANK[d.doc_type],
          y >= RECENT_FROM ? 0 : 1, -y, String(d.filename)];
}
// Display order: newest first, types mixed together — a shelf is read as a
// shelf, not as four sections.
function byYear(a, b) {
  const ya = (typeof a.year === 'number' && isFinite(a.year)) ? a.year : -1;
  const yb = (typeof b.year === 'number' && isFinite(b.year)) ? b.year : -1;
  return (yb - ya) || String(a.filename).localeCompare(String(b.filename));
}
function cmp(a, b) {
  const A = rank(a), B = rank(b);
  for (let i = 0; i < A.length; i++) {
    if (A[i] < B[i]) return -1;
    if (A[i] > B[i]) return 1;
  }
  return 0;
}

// ⚠ PER-GRADE QUOTAS, DECIDED BEFORE ANYTHING IS PICKED. Taking the best 40
//   papers by any score hands the shelf to grades 6 and 9, which hold 519 of
//   the 657 published documents between them — and grades 7 and 8, which hold
//   36, vanish. So every grade gets a floor of MIN_PER_GRADE and the remaining
//   slots are shared out in proportion to what each grade actually has
//   (largest remainder, ties broken by grade number so it is deterministic).
const MIN_PER_GRADE = 8;
function quotas(groups, want) {
  const keys = [...groups.keys()];
  const out = new Map();
  let left = want;
  for (const g of keys) {
    const n = Math.min(MIN_PER_GRADE, groups.get(g).length);
    out.set(g, n); left -= n;
  }
  const total = keys.reduce((a, g) => a + groups.get(g).length, 0);
  const share = keys.map((g) => {
    const exact = total ? (left * groups.get(g).length) / total : 0;
    return { g, whole: Math.floor(exact), frac: exact - Math.floor(exact) };
  });
  for (const s of share) {
    const room = groups.get(s.g).length - out.get(s.g);
    const add = Math.min(s.whole, Math.max(0, room));
    out.set(s.g, out.get(s.g) + add); left -= add;
  }
  const order = share.slice().sort((a, b) => (b.frac - a.frac) || (a.g - b.g));
  while (left > 0) {
    let moved = false;
    for (const s of order) {
      if (left <= 0) break;
      if (out.get(s.g) >= groups.get(s.g).length) continue;
      out.set(s.g, out.get(s.g) + 1); left--; moved = true;
    }
    if (!moved) break;
  }
  return out;
}

// Within a grade: round-robin over its subjects, taking that subject's best
// remaining document each pass, so one prolific subject cannot take the grade's
// whole allocation.
// ⚠ NON-EXAM PAPERS ARE CAPPED PER GRADE, not globally — and the cap is lifted
//   for a grade that has no exam papers at all. Grades 7 and 8 publish nothing
//   BUT practice papers (20 and 16 of them, zero exam papers), so a global cap
//   filled by grade 6 would erase both grades from the shelf entirely.
const OTHER_PER_GRADE = 2;
// ⚠ AND THE YEAR ROTATES. Sorting each subject newest-first and then taking one
//   per subject put ALL FORTY papers on 2025 — every cover reading the same
//   year, from an archive that runs 2006 to 2026, which says "we have this
//   year's paper" when the thing worth saying is "we have twenty years of
//   them". Each pass therefore asks its grade for a different recent year and
//   only falls back to newest-first when that year has nothing left.
const YEAR_SPREAD = 6;
function pickFromGrade(docsOfGrade, want, seedTag) {
  const hasExam = docsOfGrade.some((d) => d.doc_type === 'exam-paper');
  const subs = new Map();
  for (const d of docsOfGrade) {
    const s = d.subject || 'general';
    if (!subs.has(s)) subs.set(s, []);
    subs.get(s).push(d);
  }
  for (const list of subs.values()) list.sort(cmp);
  // ⚠ The SUBJECT order is shuffled, not alphabetical: taken alphabetically
  //   every grade's shelf opened on Arabic and no grade ever reached Tamil.
  //   The shuffle is seeded off the grade, so it is stable across builds.
  const lists = shuffled([...subs.keys()], seedOf(seedTag)).map((s) => subs.get(s));
  const years = [...new Set(docsOfGrade
    .filter((d) => typeof d.year === 'number' && isFinite(d.year))
    .map((d) => d.year))].sort((a, b) => b - a).slice(0, YEAR_SPREAD);
  const blocked = (d) => d.doc_type !== 'exam-paper' && hasExam && others >= OTHER_PER_GRADE;
  const chosen = [];
  let others = 0, round = 0, guard = 0;
  while (chosen.length < want && guard++ < 10000) {
    const wantYear = years.length ? years[round % years.length] : null;
    let took = false;
    for (let i = 0; i < lists.length && !took; i++) {
      const list = lists[(round + i) % lists.length];
      let at = -1;
      for (let k = 0; k < list.length; k++) {
        if (blocked(list[k])) continue;
        if (at < 0) at = k;                                   // best allowed, the fallback
        if (wantYear != null && list[k].year === wantYear) { at = k; break; }
      }
      if (at < 0) continue;
      const d = list.splice(at, 1)[0];
      if (d.doc_type !== 'exam-paper') others++;
      chosen.push(d); took = true;
    }
    if (!took) break;   // nothing left anywhere in this grade that the cap allows
    round++;
  }
  return chosen;
}

const byGrade = new Map();
for (const d of published) {
  const g = d.grade == null ? 0 : d.grade;
  if (!byGrade.has(g)) byGrade.set(g, []);
  byGrade.get(g).push(d);
}
const gradeKeys = [...byGrade.keys()].sort((a, b) => a - b);
const sorted = new Map(gradeKeys.map((g) => [g, byGrade.get(g)]));
const quota = quotas(sorted, Math.min(TARGET, published.length));

const sample = [];
for (const g of gradeKeys) {
  for (const d of pickFromGrade(sorted.get(g).slice(), quota.get(g) || 0, 'shelf:g' + g)) sample.push(d);
}

// ⚠ EVERY DOC_TYPE THE SLIDE QUOTES MUST APPEAR ON THE SHELF. The totals say
//   "144 examiners' reports"; a shelf showing none of them reads as a claim
//   about something that is not there. The per-grade walk above has no reason
//   to reach a scarce type, so one is swapped in explicitly — trading the
//   WEAKEST paper of the same grade, which keeps the quotas exact.
const inSample = new Set(sample.map((d) => d.filename));
for (const t of Object.keys(totals.byType).sort((a, b) => totals.byType[b] - totals.byType[a])) {
  if (sample.some((d) => d.doc_type === t)) continue;
  const cand = published.filter((d) => d.doc_type === t && !inSample.has(d.filename)).sort(cmp)[0];
  if (!cand) continue;
  const g = cand.grade == null ? 0 : cand.grade;
  const sameGrade = sample.filter((d) => (d.grade == null ? 0 : d.grade) === g);
  if (sameGrade.length < 2) continue;
  const drop = sameGrade.slice().sort(cmp).pop();
  sample.splice(sample.indexOf(drop), 1);
  inSample.delete(drop.filename);
  sample.push(cand);
  inSample.add(cand.filename);
}
sample.sort(byYear);

// ⚠ THE FILTER. Build each row by NAMING the fields that may be published —
//   never by deleting the ones that may not. See the header.
const docs = sample.map((d) => {
  const row = {};
  for (const f of PUBLIC_FIELDS) row[f] = d[f] === undefined ? null : d[f];
  return row;
});

// A last, cheap assertion that the allow-list did its job. It has never fired;
// it exists so that the day someone "just adds one more field" it does.
const BANNED = ['sha256', 'source', 'bytes', 'pages', 'hold_reason', 'unresolved', 'board', 'pack_id'];
for (const row of docs) {
  for (const b of BANNED) {
    if (Object.prototype.hasOwnProperty.call(row, b)) {
      console.error('REFUSING TO WRITE: banned field "' + b + '" reached the output');
      process.exit(1);
    }
  }
}

// ── write ───────────────────────────────────────────────────────────────────
// ⚠ A .js FILE THAT REGISTERS ITSELF — not .json fetched with fetch().
//   HOW_TO_RUN_LOCALLY.md option 1 is opening index.html directly, and on
//   file:// fetch() is blocked outright, so the shelf would be empty on every
//   local run while the file sat right there on disk. assets/demo/deck-g<N>.js
//   are script tags for exactly this reason; this follows them.
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT,
  "'use strict';\n" +
  '// GENERATED by scripts/build-demo-shelf.js — do not edit by hand.\n' +
  '// PUBLIC SAMPLE. Six fields per document, by allow-list. See the generator.\n' +
  'window.PSAC_DEMO_SHELF = ' + JSON.stringify({ totals, docs }, null, 0) + ';\n');

// ── summary ─────────────────────────────────────────────────────────────────
const kb = (fs.statSync(OUT).size / 1024).toFixed(1);
const typeLine = Object.entries(totals.byType).map(([k, v]) => `${k} ${v}`).join(' · ');
const sampleTypes = {};
for (const d of docs) sampleTypes[d.doc_type] = (sampleTypes[d.doc_type] || 0) + 1;
const sampleGrades = {};
for (const d of docs) sampleGrades[d.grade == null ? '?' : d.grade] = (sampleGrades[d.grade == null ? '?' : d.grade] || 0) + 1;

console.log(`library : ${totals.documents} published of ${all.length} catalogued`);
console.log(`          ${typeLine}`);
console.log(`          ${totals.minYear}–${totals.maxYear} · ${totals.subjects} subjects · grades ${totals.grades.join(', ')}`);
console.log(`sample  : ${docs.length} documents · ` +
  Object.entries(sampleTypes).map(([k, v]) => `${k} ${v}`).join(' · '));
console.log(`          grades ` + Object.entries(sampleGrades).map(([k, v]) => `G${k}×${v}`).join(' ') +
  ` · ${new Set(docs.map((d) => d.subject)).size} subjects`);
console.log(`\n✅ assets/demo/shelf.js · ${kb} KB · window.PSAC_DEMO_SHELF = { totals, docs }`);

// ⚠ A sampled paper whose PDF is not in library/ is a 404 on the landing page.
//   Named here rather than discovered by a visitor.
const missing = docs.filter((d) => !fs.existsSync(path.join(ROOT, 'library', d.filename)));
if (missing.length) {
  console.log('⚠ sampled files not present in library/: ' + missing.map((d) => d.filename).join(', '));
  process.exitCode = 1;
}
