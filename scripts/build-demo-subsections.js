'use strict';
// Build the PUBLIC demo sub-topic sample — assets/demo/subsections.js, a few
// real chapters broken into their named sub-topics with a live question count
// against each, for the landing-page preview.
//
//   node scripts/build-demo-subsections.js
//
// WHY THIS EXISTS
// The landing page makes one central teaching claim: nothing is skipped. Every
// chapter is split into named sub-topics, and each of those has its own stock
// of questions — so a child can practise "Collective Nouns" rather than "some
// English". The slide that proves it needs the chapterId -> {subsections:[{id,
// name}]} table and a per-sub-topic count, and NEITHER is reachable from the
// landing page:
//   · subjects/_index.js is the LITE index. scripts/build-subject-index.js
//     strips the pack-level `syllabus` map by name, so a page reading the index
//     is told every pack declares zero sub-topics. (audit-content-coverage.js
//     carries the same warning for the same reason and reads the manifest.)
//   · subjects/_counts.js stops at chapter level — it is the denominator of a
//     subject certificate, not a sub-topic table.
// Loading 46 real `_manifest.js` files plus the whole question bank on a
// landing page to recover it is not an option. So this is a small, FROZEN,
// deliberately-public sample, generated here, exactly like assets/demo/shelf.js
// and assets/demo/deck-g<N>.js.
//
// ⚠ WHICH COUNT. Two counting semantics exist in this repo and they differ:
//     · engine/app.js renderSyllabus() — the screen a CHILD actually opens —
//       counts EVERY question carrying that chapterId + subsection tag, with no
//       type filter at all.
//     · scripts/build-subject-counts.js excludes cloze / task / errorhunt,
//       because a certificate denominator may only count what can be marked.
//   THIS SCRIPT USES app.js's SEMANTICS — every tagged question, no isPool or
//   type filter — because the number beside a sub-topic on the landing page is
//   a promise about the number the child will see on the syllabus screen when
//   they sign up. Showing them 21 and then 18 would be the same lie twice.
//
// WHAT IS PUBLISHED, PER CHAPTER, AND NOTHING ELSE
//     packId · packName · grade · chapterId · chapterName · chapterIcon
//     subs: [{ name, q }]
//   No sub-topic ids (the page never starts a practice run — it has no
//   account), no prose, no syllabus text, no file paths, no counts by
//   difficulty. The allow-list is built by NAMING the kept fields, the way
//   build-demo-shelf.js does, so a field added to a manifest tomorrow is absent
//   by default rather than published by default.
//
// ⚠⚠ A CHAPTER WITH A DECLARED-BUT-EMPTY SUB-TOPIC IS EXCLUDED OUTRIGHT.
//   Publishing "Industry — 0 questions" under a slide that says nothing is
//   skipped is the precise lie the slide exists to disprove. Today no live pack
//   has one (1,771 declared sub-topics, 1,771 with at least one question), so
//   the rule never fires — which is exactly when a rule stops being written
//   down. It is written down.
//
// SELECTION RULE — deterministic, no shuffle, no seed
//   A chapter is a candidate when it declares >= 5 sub-topics and every one of
//   them holds at least 1 question. Candidates are then ranked by:
//     1. DEPTH TIER — the floor every one of its sub-topics clears: tier 0 if
//        all >= 20 (the bar audit-content-coverage.js holds packs to), tier 1
//        if all >= 10, tier 2 otherwise. A slide whose weakest row reads "3
//        questions" argues against itself.
//     2. sub-topic count, descending — more named rows is a better proof.
//     3. total questions in the chapter, descending.
//     4. packId, then chapterId, ascending — so a tie never depends on the
//        order Object.entries() happened to return.
//   and walked once, taking a chapter only if its PACK, its GRADE and its
//   SUBJECT are all still unused. That is what makes the sample read as
//   coverage rather than as one good pack: four chapters, four grades, four
//   subjects, four packs. Re-running picks the same four unless the content
//   changed.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { loadSubject } = require('../netlify/lib/questions-sandbox');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets', 'demo');
const OUT = path.join(OUT_DIR, 'subsections.js');

const TARGET = 4;
const MIN_SUBS = 5;
const TIER_FLOORS = [20, 10, 1];

// ⚠ THE ALLOW-LIST. Adding a name here is a publishing decision — read the
//   header first. Nothing else from a manifest or a question ever reaches the
//   output.
const CHAPTER_FIELDS = ['packId', 'packName', 'grade', 'chapterId', 'chapterName', 'chapterIcon'];
const SUB_FIELDS = ['name', 'q'];

// ── the live packs, from the generated index ────────────────────────────────
// ⚠ Derived, never a hard-coded list of grades and subjects: that is how
//   audit-content-coverage.js came to miss 31 of 46 live packs. And never by
//   grepping the manifests for /comingSoon:\s*false/ — that matches the comment
//   every placeholder carries.
const LIVE = [];
{
  const ctx = { registerSubject: (p) => { if (p && !p.comingSoon) LIVE.push(p.id); }, console: { log() {} }, window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'subjects', '_index.js'), 'utf8'), ctx);
}
LIVE.sort();
if (!LIVE.length) {
  console.error('subjects/_index.js registered no live pack — refusing to write an empty sample');
  process.exit(1);
}

// ── read every live pack: declared sub-topics × live question counts ────────
const rows = [];
const failed = [];
for (const id of LIVE) {
  let pack = null;
  const ctx = vm.createContext({ registerSubject: (p) => { pack = p; }, window: {}, console: { log() {} } });
  try {
    // ⚠ The MANIFEST, not subjects/_index.js: the index is lite and the
    //   syllabus map is stripped out of it, so reading sub-topics off the index
    //   reports every pack as declaring none.
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'subjects', id, '_manifest.js'), 'utf8'), ctx);
  } catch (e) { failed.push(id + ': ' + e.message); continue; }
  if (!pack) { failed.push(id + ': manifest registered no pack'); continue; }

  let bank;
  try { bank = loadSubject(id); } catch (e) { failed.push(id + ': ' + e.message); continue; }

  // app.js renderSyllabus() semantics: every question with the tag. See header.
  const counts = new Map();
  for (const q of bank) {
    if (!q || !q.chapterId || !q.subsection) continue;
    const key = q.chapterId + '/' + q.subsection;
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  const chapters = Array.isArray(pack.chapters) ? pack.chapters : [];
  for (const [chapterId, entry] of Object.entries(pack.syllabus || {})) {
    const declared = (entry && entry.subsections) || [];
    if (!declared.length) continue;
    const ch = chapters.find((c) => c && c.id === chapterId) || null;
    const subs = declared.map((s) => ({ name: String(s.name || ''), q: counts.get(chapterId + '/' + s.id) || 0 }));
    rows.push({
      packId: id,
      packName: String(pack.name || id),
      grade: pack.grade,
      subject: id.replace(/^grade\d+-/, ''),
      chapterId,
      chapterName: ch ? String(ch.name || '') : '',
      chapterIcon: ch && ch.icon ? String(ch.icon) : '',
      subs,
      empty: subs.filter((s) => !s.q).length,
      total: subs.reduce((a, s) => a + s.q, 0),
    });
  }
}
if (failed.length) {
  console.error('could not read ' + failed.length + ' pack(s):');
  for (const f of failed) console.error('  ' + f);
  process.exit(1);
}

// ── totals, over ALL live packs ─────────────────────────────────────────────
// ⚠ These describe the CORPUS, not the sample, and that is the point: the slide
//   shows four chapters and says how many there really are. Same contract as
//   the shelf, which shows 72 covers and quotes 657 papers.
const totals = {
  packs: new Set(rows.map((r) => r.packId)).size,
  chapters: rows.length,
  subsections: rows.reduce((a, r) => a + r.subs.length, 0),
  emptySubsections: rows.reduce((a, r) => a + r.empty, 0),
  // ⚠ NAMED `taggedQuestions`, NOT `questions`, and the name is load-bearing.
  //   It is the number of stored rows carrying a sub-topic tag under the
  //   renderSyllabus() semantics above — raw `task` rows, past-paper items and
  //   cloze passages included. It is therefore NOT the "practisable questions"
  //   figure the rest of the site quotes, which drops raw tasks and counts what
  //   Assessment.projectToItems() projects instead. A slide that prints this
  //   next to the words "practice questions" is quoting the wrong number.
  taggedQuestions: rows.reduce((a, r) => a + r.total, 0),
};

// ── choose the sample ───────────────────────────────────────────────────────
function tierOf(r) {
  const min = Math.min(...r.subs.map((s) => s.q));
  for (let i = 0; i < TIER_FLOORS.length; i++) if (min >= TIER_FLOORS[i]) return i;
  return TIER_FLOORS.length;
}
const candidates = rows
  .filter((r) => r.subs.length >= MIN_SUBS && r.empty === 0 && r.chapterName)
  .map((r) => Object.assign({ tier: tierOf(r) }, r))
  .sort((a, b) =>
    (a.tier - b.tier) ||
    (b.subs.length - a.subs.length) ||
    (b.total - a.total) ||
    a.packId.localeCompare(b.packId) ||
    a.chapterId.localeCompare(b.chapterId));

const usedPack = new Set(), usedGrade = new Set(), usedSubject = new Set();
const sample = [];
for (const r of candidates) {
  if (sample.length >= TARGET) break;
  if (usedPack.has(r.packId) || usedGrade.has(r.grade) || usedSubject.has(r.subject)) continue;
  usedPack.add(r.packId); usedGrade.add(r.grade); usedSubject.add(r.subject);
  sample.push(r);
}
// Display order: by grade, so the slide reads 4 → 5 → 6 → 9 the way a parent
// thinks about it, not in the order the ranking happened to pick them.
sample.sort((a, b) => (a.grade - b.grade) || a.packId.localeCompare(b.packId));

if (sample.length < TARGET) {
  console.error('only ' + sample.length + ' chapter(s) met the rule, wanted ' + TARGET +
    ' — refusing to write a sample that does not span four packs');
  process.exit(1);
}

// ── build the output by NAMING what may be published ────────────────────────
const chapters = sample.map((r) => {
  const row = {};
  for (const f of CHAPTER_FIELDS) row[f] = r[f] === undefined ? null : r[f];
  row.subs = r.subs.map((s) => {
    const o = {};
    for (const f of SUB_FIELDS) o[f] = s[f];
    return o;
  });
  return row;
});

// Cheap assertions that the two rules above actually held. Neither has fired;
// they exist so that the day someone edits the ranking, one does.
const BANNED = ['subject', 'tier', 'empty', 'total', 'id', 'syllabus', 'notes', 'path', 'file'];
for (const c of chapters) {
  for (const b of BANNED) {
    if (Object.prototype.hasOwnProperty.call(c, b)) {
      console.error('REFUSING TO WRITE: internal field "' + b + '" reached the output');
      process.exit(1);
    }
  }
  for (const s of c.subs) {
    if (!(s.q > 0)) {
      console.error('REFUSING TO WRITE: ' + c.packId + '/' + c.chapterId + ' publishes an empty sub-topic "' + s.name + '"');
      process.exit(1);
    }
    if (Object.prototype.hasOwnProperty.call(s, 'id')) {
      console.error('REFUSING TO WRITE: a sub-topic id reached the output');
      process.exit(1);
    }
  }
}

// ── write ───────────────────────────────────────────────────────────────────
// ⚠ A .js FILE THAT ASSIGNS A GLOBAL — not .json fetched with fetch().
//   HOW_TO_RUN_LOCALLY.md option 1 is opening index.html by double-clicking it,
//   and on file:// fetch() is blocked outright, so the slide would be empty on
//   every local run while the data sat right there on disk. The demo decks and
//   the shelf are script tags for exactly this reason; this follows them.
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT,
  "'use strict';\n" +
  '// GENERATED by scripts/build-demo-subsections.js — do not edit by hand.\n' +
  '// PUBLIC SAMPLE. Six fields per chapter and {name,q} per sub-topic, by\n' +
  '// allow-list. Counts use renderSyllabus() semantics: every tagged question.\n' +
  'window.PSAC_DEMO_SUBSECTIONS = ' + JSON.stringify({ totals, chapters }, null, 0) + ';\n');

// ── summary ─────────────────────────────────────────────────────────────────
const kb = (fs.statSync(OUT).size / 1024).toFixed(1);
console.log(`corpus : ${totals.packs} live packs · ${totals.chapters} chapters declare sub-topics`);
console.log(`         ${totals.subsections} declared sub-topics · ${totals.emptySubsections} with no questions · ${totals.taggedQuestions} tagged rows`);
console.log(`candidates: ${candidates.length} chapter(s) with >=${MIN_SUBS} sub-topics and none empty`);
console.log('sample :');
for (const c of chapters) {
  const min = Math.min(...c.subs.map((s) => s.q));
  console.log(`  G${c.grade} ${c.packName} · ${c.chapterIcon} ${c.chapterName} — ` +
    `${c.subs.length} sub-topics, ${c.subs.reduce((a, s) => a + s.q, 0)} questions, smallest ${min}`);
}
console.log(`\n✅ assets/demo/subsections.js · ${kb} KB · window.PSAC_DEMO_SUBSECTIONS = { totals, chapters }`);
