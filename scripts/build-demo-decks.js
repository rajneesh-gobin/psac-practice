'use strict';
// Build the PUBLIC demo decks — assets/demo/deck-g<N>.js, one per live grade.
//
//   node scripts/build-demo-decks.js
//
// WHY THIS EXISTS
// The landing page lets a stranger answer real questions with no account. It
// cannot call /api/questions to get them: that endpoint 401s anything with
// neither an Authorization header nor an x-student-token (workers/api/
// questions.js), and widening it would hand the whole 35,000-question corpus
// AND its answers to anyone with curl — the same hole that /netlify/
// question-bundles/*.json opened (CLAUDE.md, pending item 1).
//
// So the demo is fed by a small, FROZEN, deliberately-public sample instead.
// ⚠ Everything this script writes is world-readable forever. assets/ is copied
//   whole by scripts/prepare-deploy.js and nothing 404s it, which is the point
//   — but it means the selection rules below are a publishing decision, not a
//   formatting one.
//
// WHAT IS EXCLUDED, AND WHY
//   · past-paper items      — 194 in the corpus and not re-authorable. The
//                             scarcest thing here; never spend it on a demo.
//   · anything but plain mcq — cloze/errorhunt/task/numeric need a keypad, a
//                             passage or a marker. isPoolQuestion() already
//                             refuses the first two; a demo has even less room.
//   · images and inline svg  — a demo question that 404s is worse than no demo.
//   · too easy FOR THE STAGE — the band is per stage, not one rule for nine
//                             grades. Grades 1-3 open on L1-L2, because a
//                             six-year-old who cannot answer the first one
//                             closes the tab. Grades 4-9 open on L2 and are
//                             filled from L3/L4 first: a parent judging
//                             whether this is worth paying for is judging
//                             whether it stretches their child, and four
//                             one-step recall questions answer no.
//   · long stems / long options — the card is ~320px wide on the phones that
//                             matter most here.
//
// ⚠ DETERMINISTIC. The shuffle is seeded off the pack id, so re-running picks
//   the same questions unless the underlying content changed. A demo set that
//   churned every build would mean the public sample, the screenshots and the
//   thing a parent was shown yesterday all disagreed.
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const BUNDLES = path.join(ROOT, 'netlify', 'question-bundles');
const OUT = path.join(ROOT, 'assets', 'demo');

// ⚠ PER CHAPTER, not per grade. The preview lets a visitor pick a subject and
//   then a chapter, so the unit of content is a chapter's worth of questions —
//   the first CHAPTERS_OPEN chapters of every live pack, PER_CHAPTER questions
//   each. Every other chapter is listed by name and stays shut.
const CHAPTERS_OPEN = 3;
const PER_CHAPTER   = 5;
const MIN_CHAPTER   = 3;  // below this a chapter is not worth opening at all

// ⚠ ONE BAND PER STAGE. `strict` is what a chapter is filled from when it can
//   be; `relaxed` is the fallback before a named chapter is given up on and
//   left shut. The stem and option lengths widen with the band because a real
//   L3/L4 question is a longer sentence — capping it at 165 characters is how
//   the harder half of every pack got filtered out without anyone deciding to.
//   QUOTA is how many of the five slots are OFFERED to each level, hardest
//   first, before the rest are topped up from whatever is left.
const QUOTA = { 4: 2, 3: 2 };
function band(grade) {
  return grade <= 3
    ? { strict: [1, 2], relaxed: [1, 3], stem: [165, 230], opt: [42, 60] }
    : { strict: [2, 4], relaxed: [1, 4], stem: [210, 260], opt: [52, 72] };
}

// ── the live packs, from the generated index ────────────────────────────────
const packs = [];
for (const ln of fs.readFileSync(path.join(ROOT, 'subjects/_index.js'), 'utf8').split(/\r?\n/)) {
  if (!ln.startsWith('registerSubject(')) continue;
  try { packs.push(JSON.parse(ln.slice('registerSubject('.length, ln.lastIndexOf('});') + 1))); } catch (_) {}
}
const live = packs.filter((p) => !p.comingSoon);
if (!live.length) { console.error('no live packs — is subjects/_index.js generated?'); process.exit(1); }

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

const strip = (html) => String(html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

// ⚠ TWO TIERS. Strict first — an easy, short, self-explaining question is what
//   a stranger's first tap should be. But the preview now opens a NAMED
//   chapter, so "this chapter has nothing" is a visible hole rather than a
//   silent omission: if strict cannot fill one, `relaxed` allows L3 and longer
//   stems before the chapter is given up on.
// ⚠ TWO QUESTIONS ARE ONE QUESTION when only the wording moves. Tokens are
//   words of 3+ letters PLUS every number, so "55 + 39" and "36 + 56" are two
//   questions (their numbers differ) while "3, 7, 11, 15, …" asked twice in two
//   wordings is one. The same answer text lowers the bar, because a repeated
//   answer is what a visitor actually notices.
function tokens(html) {
  return new Set(strip(html).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').split(' ')
    .filter((w) => w.length >= 3 || /\d/.test(w)));
}
function tooAlike(a, b) {
  const A = tokens(a.question), B = tokens(b.question);
  if (!A.size || !B.size) return false;
  let shared = 0;
  for (const w of A) if (B.has(w)) shared++;
  const jaccard = shared / (A.size + B.size - shared);
  const sameAnswer = strip(a.answer).toLowerCase() === strip(b.answer).toLowerCase();
  return jaccard >= 0.6 || (sameAnswer && jaccard >= 0.45);
}

function usable(q, declaredChapters, relaxed, b) {
  if (!q || q.type !== 'mcq') return false;
  if (!Array.isArray(q.options) || q.options.length !== 4) return false;
  if (!q.answer || !q.options.includes(q.answer)) return false;
  if (!q.explanation) return false;
  const [dLo, dHi] = relaxed ? b.relaxed : b.strict;
  if (!(q.difficulty >= dLo && q.difficulty <= dHi)) return false;
  if (!declaredChapters.has(q.chapterId)) return false;
  const raw = String(q.question || '');
  if (/<img|<svg|<table|<iframe/i.test(raw)) return false;
  if (/_{3,}|\.{4,}|…{2,}/.test(raw)) return false;          // a blank needs the cloze UI
  const text = strip(raw);
  if (text.length < 15 || text.length > (relaxed ? b.stem[1] : b.stem[0])) return false;
  if (q.options.some((o) => strip(o).length > (relaxed ? b.opt[1] : b.opt[0]) || /<img|<svg/i.test(String(o)))) return false;
  if (new Set(q.options.map((o) => strip(o).toLowerCase())).size !== 4) return false;
  // ⚠ AUTHOR SCRATCH. Four questions in the corpus carried the author arguing
  //   with themselves in the explanation — "Wait — that is still irrational!",
  //   "(Answer updated below.)" — and one of them, g8m-real-061, was ALSO marked
  //   with the wrong option. Every one of those was found by reading the demo
  //   decks, so the marker is banned from the public sample whatever else is
  //   true of the question. It is a smell, not a proof: it goes to a human.
  if (/\bwait\b\s*[—-]|re-?check|let me (?:recheck|fix)|answer updated|TODO|FIXME/i
      .test(String(q.explanation) + " " + String(q.hint || ""))) return false;
  return true;
}

// ── build one deck per grade ────────────────────────────────────────────────
fs.mkdirSync(OUT, { recursive: true });
const grades = [...new Set(live.map((p) => p.grade))].sort((a, b) => a - b);
const summary = [];

for (const grade of grades) {
  const gradePacks = live.filter((p) => p.grade === grade)
    .sort((a, b) => String(a.id).localeCompare(String(b.id)));

  // packs[packId][chapterId] = [ …questions ]
  // ⚠ Questions ONLY. Chapter names, their order and the subject list are read
  //   at runtime from SUBJECT_PACKS, which the landing page already has — so
  //   this file never carries a second copy of the catalogue to drift from it.
  const packs = {};
  let nQ = 0, nCh = 0;

  for (const pack of gradePacks) {
    const file = path.join(BUNDLES, pack.id + '.json');
    if (!fs.existsSync(file)) continue;
    let rows;
    try { rows = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (_) { continue; }
    if (!Array.isArray(rows)) rows = Object.values(rows);

    const chapters = (pack.chapters || []);
    const declared = new Set(chapters.map((c) => c.id));
    const byId = new Map();
    for (const q of rows) {
      if (!declared.has(q && q.chapterId)) continue;
      if (!byId.has(q.chapterId)) byId.set(q.chapterId, []);
      byId.get(q.chapterId).push(q);
    }

    // Walk the DECLARED order and open the first CHAPTERS_OPEN that can
    // actually be filled. A chapter that yields nothing is skipped rather
    // than opened empty — it still appears in the list, shut, like the rest.
    const open = {};
    let opened = 0;
    for (const ch of chapters) {
      if (opened >= CHAPTERS_OPEN) break;
      const all = (byId.get(ch.id) || []).sort((a, b) => String(a.id).localeCompare(String(b.id)));
      const b = band(grade);
      let pool = all.filter((q) => usable(q, declared, false, b));
      if (pool.length < MIN_CHAPTER) pool = all.filter((q) => usable(q, declared, true, b));
      if (pool.length < MIN_CHAPTER) continue;
      // ⚠ PICK ONE AT A TIME, refusing anything the visitor has just answered.
      //   Five questions dealt from one chapter used to include the SAME question
      //   twice: grade8-maths dealt "3, 7, 11, 15, …" as both g8m-sequences-001
      //   and g8m-samp-001, and grade6-french asked for FAIRE au futur pour vous
      //   twice. Numbers count as tokens, so "55 + 39" and "36 + 56" stay two
      //   questions — it is the WORDING repeating that a visitor reads as a bug.
      const picked = [];
      // ⚠ HARD FIRST, then topped up. The L4 and L3 stock is offered the
      //   first slots, because a parent judging the app is judging whether it
      //   stretches their child; taking the shuffle straight left grade 6
      //   maths previewing as "Work out: 311 + 465" four times running.
      const order = shuffled(pool, seedOf(pack.id + ':' + ch.id));
      const queue = grade <= 3 ? order : (() => {
        const seen = new Set(); const out = [];
        const take = (list, n) => { for (const q of list) { if (n <= 0) break; if (seen.has(q.id)) continue; seen.add(q.id); out.push(q); n--; } };
        take(order.filter((q) => q.difficulty >= 4), QUOTA[4]);
        take(order.filter((q) => q.difficulty === 3), QUOTA[3]);
        take(order.filter((q) => q.difficulty <= 2), PER_CHAPTER);
        take(order, PER_CHAPTER);
        return out;
      })();
      for (const q of queue) {
        if (picked.length >= PER_CHAPTER) break;
        if (picked.some((p2) => tooAlike(p2, q))) continue;
        picked.push(q);
      }
      if (picked.length < MIN_CHAPTER) continue;
      // ⚠ DEALT EASIEST FIRST whatever order they were chosen in. The first
      //   tap has to be winnable — answering one right is the whole mechanism
      //   — and the ramp is what shows the depth behind it.
      picked.sort((x, y) => (x.difficulty || 0) - (y.difficulty || 0));
      open[ch.id] = picked.map((q) => ({
        id: q.id,
        q: q.question,
        opts: q.options,
        a: q.answer,
        hint: q.hint || '',
        exp: q.explanation,
      }));
      opened++; nCh++; nQ += picked.length;
    }
    if (opened) packs[pack.id] = open;
  }

  // ⚠ A .js FILE THAT REGISTERS ITSELF — not .json fetched with fetch().
  //   HOW_TO_RUN_LOCALLY.md option 1 is opening index.html directly, and on
  //   file:// fetch() is blocked outright, so every grade reported "could not
  //   reach them" while the file sat right there on disk. question_loader.js
  //   has always answered this by INJECTING SCRIPT TAGS (_injectScript): a
  //   script tag loads under file://, over http, and through the service
  //   worker alike. Reported from a real local run — it cannot show up on a
  //   served test, which is exactly why the first version passed.
  const out = path.join(OUT, `deck-g${grade}.js`);
  fs.writeFileSync(out,
    "'use strict';\n" +
    '// GENERATED by scripts/build-demo-decks.js — do not edit by hand.\n' +
    '(window.PSAC_DEMO_DECKS = window.PSAC_DEMO_DECKS || {})[' + grade + '] = ' +
    JSON.stringify({ grade, packs }, null, 0) + ';\n');
  const nSub = Object.keys(packs).length;
  summary.push({ grade, n: nQ, chapters: nCh, subjects: nSub,
                 packs: gradePacks.length, bytes: fs.statSync(out).size });
  console.log(`  deck-g${grade}.js  ${String(nQ).padStart(3)} questions · ` +
    `${nCh} chapters open across ${nSub}/${gradePacks.length} subjects · ` +
    `${(fs.statSync(out).size / 1024).toFixed(1)} KB`);
}

const total = summary.reduce((a, s) => a + s.n, 0);
const bytes = summary.reduce((a, s) => a + s.bytes, 0);
console.log(`\n✅ ${summary.length} decks · ${total} questions · ` +
  `${summary.reduce((a, s) => a + s.chapters, 0)} open chapters · ${(bytes / 1024).toFixed(1)} KB total`);
// ⚠ A live subject with NO open chapter is a subject a visitor can select and
//   find nothing in. Named, not silently tolerated.
const thin = summary.filter((s) => s.subjects < s.packs);
if (thin.length) console.log('⚠ subjects with no open chapter: ' + thin.map((s) => `G${s.grade} ${s.packs - s.subjects} of ${s.packs}`).join(' · '));
