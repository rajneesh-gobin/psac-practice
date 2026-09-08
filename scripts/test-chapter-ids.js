'use strict';
// Every question points at a chapter that actually exists.
//
// Run: node scripts/test-chapter-ids.js
//
// WHY THIS EXISTS
// A question whose `chapterId` matches no declared chapter is SILENTLY LOST.
// It loads, it validates, it builds into the bundle, the importer writes it to
// the database — and no child can ever be dealt it, because every route into
// practice starts from a chapter card and `getStaticQs(chapterId)` never
// matches. Measured 2026-09-08: an item with chapterId 'g9sci-NO-SUCH-CHAPTER'
// passed scripts/check.js, passed `import-questions.js --check`, and appeared
// in the built bundle. Nothing in the repo said a word.
//
// That is a cheap mistake to make and an expensive one to find: it costs
// nothing at authoring time and shows up as "why are there only 40 questions in
// this chapter" weeks later. It matters most right now, while five Grade 9
// packs are being filled by hand against unfamiliar ids like `g9sci-C1` and
// `g9m-indices`.
//
// ⚠ Read from the BUILT BUNDLES, not the sources. Fields have twice been
//   silently dropped at build time in this project while the source looked
//   perfect, and chapterId is exactly the kind of field that would go unnoticed.
// ⚠ Checks EVERY pack, including comingSoon ones. A pack is filled while it is
//   still hidden — that is the whole point of the flag — so waiting until it
//   goes live means finding the typos after the content is written.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BUNDLES = path.join(ROOT, 'netlify', 'question-bundles');

if (!fs.existsSync(BUNDLES)) {
  console.error('question-bundles/ missing — run: node netlify/build-questions.js');
  process.exit(2);
}

// Declared chapters, from the generated index (which carries every pack).
global.window = global;
global.SUBJECT_PACKS = [];
global.CHAPTERS = [];
global.STATIC_QUESTIONS = [];
global.registerSubject = p => SUBJECT_PACKS.push(p);
require(path.join(ROOT, 'subjects', '_index.js'));

const declared = new Map();   // packId -> Set(chapterId)
for (const p of SUBJECT_PACKS) declared.set(p.id, new Set((p.chapters || []).map(c => c.id)));

let pass = 0;
const failures = [];
const ok = (cond, label, detail) => {
  if (cond) { pass++; console.log('  ok   ' + label); }
  else { failures.push(label + (detail ? ' — ' + detail : '')); console.log('  FAIL ' + label + (detail ? ' — ' + detail : '')); }
};

console.log('\nQuestion chapterIds — every one must name a real chapter\n');

const orphans = [];
const emptyChapters = [];
let scanned = 0;
let packsSeen = 0;

for (const file of fs.readdirSync(BUNDLES).filter(f => /^grade\d-[a-z-]+\.json$/.test(f)).sort()) {
  const packId = file.replace('.json', '');
  const chapters = declared.get(packId);
  if (!chapters) {
    // A bundle with no pack behind it: a deleted pack whose JSON survived.
    orphans.push(packId + ': the whole bundle has no pack in subjects/_index.js');
    continue;
  }
  packsSeen++;
  const data = JSON.parse(fs.readFileSync(path.join(BUNDLES, file), 'utf8'));
  const arr = (Array.isArray(data) ? data : Object.values(data).flat())
    .filter(x => x && typeof x === 'object' && x.id);

  const used = new Set();
  for (const q of arr) {
    scanned++;
    // Cloze texts are their own screen and legitimately carry no chapterId.
    if (!q.chapterId) continue;
    used.add(q.chapterId);
    if (!chapters.has(q.chapterId)) {
      orphans.push(packId + ' ' + q.id + '  ->  ' + q.chapterId);
    }
  }

  // The mirror image: a declared chapter with nothing in it opens as an empty
  // card. Reported, not failed — a pack being filled has empty chapters by
  // definition, and five Grade 9 packs are in exactly that state today.
  for (const c of chapters) if (!used.has(c)) emptyChapters.push(packId + '/' + c);
}

console.log('  scanned ' + scanned + ' questions across ' + packsSeen + ' packs\n');

ok(orphans.length === 0,
  'every chapterId names a declared chapter',
  '\n      ' + orphans.slice(0, 12).join('\n      ') +
  (orphans.length > 12 ? '\n      … and ' + (orphans.length - 12) + ' more' : ''));

// Grouped so a pack mid-build reads as one line, not two hundred.
const byPack = {};
for (const e of emptyChapters) { const p = e.split('/')[0]; (byPack[p] = byPack[p] || []).push(e.split('/')[1]); }
const live = new Set(SUBJECT_PACKS.filter(p => !p.comingSoon).map(p => p.id));
const liveEmpty = Object.entries(byPack).filter(([p]) => live.has(p));
const hiddenEmpty = Object.entries(byPack).filter(([p]) => !live.has(p));

if (liveEmpty.length) {
  console.log('\n  ⚠ LIVE packs with an empty chapter — a child can open these and find nothing:');
  for (const [p, cs] of liveEmpty) console.log('      ' + p + ': ' + cs.join(', '));
} else {
  console.log('\n  ✓ no LIVE pack has an empty chapter');
}
if (hiddenEmpty.length) {
  console.log('\n  (still being filled, comingSoon — not a failure)');
  for (const [p, cs] of hiddenEmpty) console.log('      ' + p + ': ' + cs.length + ' of ' + declared.get(p).size + ' chapters empty');
}

console.log('\n  ' + pass + ' passed, ' + failures.length + ' failed');
if (failures.length) { console.log('\n  failures:'); for (const f of failures) console.log('    ✗ ' + f); }
process.exit(failures.length ? 1 : 0);
