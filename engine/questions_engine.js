'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice Engine - Question Pool & Access Functions
//  STATIC_QUESTIONS is populated at load time by subject question files.
//  GENERATORS is populated by each subject's _manifest.js.
//  CHAPTERS is populated by each subject's _manifest.js.
// ══════════════════════════════════════════════

// Central question pool - all subject files push into this array
const STATIC_QUESTIONS = [];

// ── QUESTION ACCESS FUNCTIONS ──────────────────
// ⚠ type 'cloze' is excluded here, and this is the only place it needs to be:
// every practice and exam pool funnels through getStaticQs. A cloze item is a
// whole text with a shared word bank and no options - dealt into the practice
// or exam renderer it would fall through to the numeric branch and draw a
// number pad under a French passage. It is reached only through ClozeText,
// from its own chapter screen.
// ⚠ examWeight: 0 does NOT keep a chapter out of a paper - assembleExamPaper
// clamps with Math.max(1, …), so every chapter gets at least one slot. The
// type filter is what actually holds.
// ⚠ 'task' joins it for the same reason, one layer up. An NCE task is a
// stimulus plus several parts with their own marks; it has no single `answer`
// and no renderer. Practice and the online exam consume
// Assessment.projectToItems(task), which hands back ordinary mcq/numeric items
// and DROPS the parts a machine cannot mark. The raw task must never be dealt.
// ⚠ 'errorhunt' joins them for the identical reason. A Chasse aux Erreurs item
// is a whole text whose words are the answer targets; it has no options and no
// single answer to type. It is reached only through ErrorHunt, from its own
// chapter screen.
const _POOL_TYPES_EXCLUDED = new Set(['cloze', 'task', 'errorhunt']);
function isPoolQuestion(q) { return !!q && !!q.question && !_POOL_TYPES_EXCLUDED.has(q.type); }

function getStaticQs(chapterId, difficulty) {
  return STATIC_QUESTIONS.filter(q => isPoolQuestion(q) && q.chapterId === chapterId && q.difficulty === difficulty);
}

function generateDynamic(chapterId, level) {
  try {
    // Generators are per subject pack; a pack without any simply has none,
    // in which case getQuestionsForChapter falls back to static questions.
    const gens = (typeof packGenerators === 'function') ? packGenerators() : {};
    if (gens[chapterId]) return gens[chapterId](level);
  } catch(e) {}
  return null;
}

// How many real questions this chapter has at one level. Callers use it to say
// something honest BEFORE a child starts a round, instead of quietly handing
// them the wrong level.
function countStaticQs(chapterId, difficulty) {
  return getStaticQs(chapterId, difficulty).length;
}

// ⚠ A LEVEL MEANS THE LEVEL. This used to pad a thin level from the WHOLE
//   chapter - every difficulty, including L1 - whenever it held fewer than
//   `count` questions. It fired constantly, because most chapters are thin at
//   L3: grade6-english "Nouns" has ONE L3 question against 76 easier ones, so
//   choosing Hard delivered 1 hard question and about 6 of the easiest, and
//   grade5-english "Nouns" delivered 3 hard and 10 easy out of 20. That is
//   exactly what parents reported as "the questions are far too easy" - the
//   content was fine, the level control was not.
//
//   Generators still pad, because a generator produces questions AT the level
//   asked for. Only the cross-difficulty static fallback is gone.
//
// ⚠ This can now return FEWER than `count`, and can return an EMPTY array.
//   That is the honest answer and callers must handle it - startChapterDirect()
//   says so and offers mixed practice rather than showing a blank screen.
function getQuestionsForChapter(chapterId, difficulty, count = 10) {
  let pool = getStaticQs(chapterId, difficulty);

  if (difficulty === 4) {
    // Word problem mode: use ONLY L4 static questions - no generator, no L3
    // padding. It must still honour the requested round size: returning the
    // whole pool made a normal 20-question chapter practice unexpectedly run
    // for 30, 50 or more questions as the bank grew.
    return shuffle(pool).slice(0, count);
  }

  // L1–L3: top up from the pack's generator, which produces AT this level.
  // Bounded, because generateDynamic() returning null for ever was an infinite
  // loop waiting to happen.
  let tries = 0;
  while (pool.length < count && tries++ < 40) {
    const dyn = generateDynamic(chapterId, difficulty);
    if (!dyn) break;
    pool = [...pool, dyn];
  }
  const seen = new Set();
  pool = pool.filter(q => { if (!q?.id || seen.has(q.id)) return false; seen.add(q.id); return true; });
  return shuffle(pool).slice(0, count);
}

// ── MIXED PRACTICE (no chosen difficulty - random across levels) ──────────
function getMixedQuestions(chapterId, maxDiff, count = 20) {
  const levels = [1, 2, 3, 4].filter(l => l <= (maxDiff || 4));
  let pool = [];
  for (const lv of levels) pool = pool.concat(getStaticQs(chapterId, lv));
  // Pad with generators (L1–L3 only; L4 is always static)
  if (pool.length < count) {
    for (const lv of [1, 2, 3].filter(l => l <= (maxDiff || 4))) {
      let tries = 0;
      while (pool.length < count && tries++ < 8) {
        const dyn = generateDynamic(chapterId, lv);
        if (dyn) pool.push(dyn); else break;
      }
    }
  }
  const seen = new Set();
  pool = pool.filter(q => { if (!q?.id || seen.has(q.id)) return false; seen.add(q.id); return true; });
  return shuffle(pool).slice(0, count);
}

// ── SUBSECTION PRACTICE ───────────────────────
function getQuestionsForSubsection(chapterId, subsectionId, count = 15) {
  const pool = shuffle(STATIC_QUESTIONS.filter(q =>
    isPoolQuestion(q) && q.chapterId === chapterId && q.subsection === subsectionId
  ));
  // A small, deliberately focused subsection (for example a portrait quiz)
  // must remain focused. Falling back to the whole chapter made the two-photo
  // quiz begin with unrelated Battle of Grand Port questions.
  if (pool.length) return pool.slice(0, count);
  return getQuestionsForChapter(chapterId, 2, count);
}

function assembleExamPaper(type) {
  const config = { drill:{count:15,mins:10}, short:{count:25,mins:25}, full:{count:40,mins:45} };
  const cfg = config[type] || config.full;
  const paper = [];

  // Same restrictions startChapterDirect() enforces for practice mode - a
  // parent's chapter lock or difficulty cap must hold in exams too, or a
  // locked/capped chapter is only actually blocked in practice.
  const lockedChs = new Set(DB.restrictions?.lockedChapters || []);
  const maxDiff   = Math.min(4, Math.max(1, DB.restrictions?.maxDifficulty ?? 4));

  // 7 of 15 subject packs never set examWeight on any chapter (grade4/5/6
  // english/french, grade4-maths). ch.examWeight was undefined there, so
  // `undefined * cfg.count` -> NaN propagated through every chapter's `n`,
  // and assembleExamPaper() silently returned a fully empty exam for all of
  // them. Default a missing/non-numeric weight to 1 (equal weighting) rather
  // than let it poison the whole paper.
  // A chapter that cannot supply a single question still took a slot, and the
  // slot came out of the paper: the three French packs each hold a Textes à
  // Trous chapter whose items are all type 'cloze', which isPoolQuestion()
  // excludes, so a "40-question" exam dealt 39 in grades 5 and 6 and 37 in
  // grade 4. examWeight: 0 does not help - Math.max(1, …) below still buys one.
  // Generators count as fillable; grade5-maths has 12 chapters backed by them.
  let gens = {};
  try { if (typeof packGenerators === 'function') gens = packGenerators() || {}; } catch(e) {}
  const canFill = ch => !!gens[ch.id] ||
    STATIC_QUESTIONS.some(q => isPoolQuestion(q) && q.chapterId === ch.id && q.difficulty <= maxDiff);

  const weights = CHAPTERS.filter(ch => !lockedChs.has(ch.id) && canFill(ch) && (typeof _planAllowsChapter === 'function' ? _planAllowsChapter(ch.id) : true)).map(ch => ({
    chapterId: ch.id,
    n: Math.max(1, Math.round((Number.isFinite(ch.examWeight) ? ch.examWeight : 1) * cfg.count / 40))
  }));

  // Every chapter locked (or none registered) - nothing to build a paper from.
  if (!weights.length) return { questions: [], durationMins: cfg.mins };

  let total = weights.reduce((s, w) => s + w.n, 0);
  let idx = 0;
  while (total < cfg.count) { weights[idx % weights.length].n++; total++; idx++; }
  while (total > cfg.count) {
    const i = weights.findIndex(w => w.n > 1);
    if (i === -1) break;
    weights[i].n--; total--;
  }

  weights.forEach(({ chapterId, n }) => {
    const q1 = maxDiff >= 1 ? shuffle(getStaticQs(chapterId, 1)) : [];
    const q2 = maxDiff >= 2 ? shuffle(getStaticQs(chapterId, 2)) : [];
    const q3 = maxDiff >= 3 ? shuffle(getStaticQs(chapterId, 3)) : [];
    const q4 = maxDiff >= 4 ? shuffle(getStaticQs(chapterId, 4)) : [];

    const take = (arr, k) => arr.slice(0, Math.max(0, k));
    const pool = [
      ...take(q1, Math.max(0, Math.round(n * 0.25))),
      ...take(q2, Math.max(0, Math.round(n * 0.35))),
      ...take(q3, Math.max(0, Math.round(n * 0.25))),
      ...take(q4, Math.max(0, Math.round(n * 0.15))),
    ];

    let selected = pool.slice(0, n);

    while (selected.length < n) {
      const dyn = generateDynamic(chapterId, rnd(1, Math.min(3, maxDiff)));
      if (dyn) selected.push(dyn);
      else {
        const all = STATIC_QUESTIONS.filter(q => isPoolQuestion(q) && q.chapterId === chapterId && q.difficulty <= maxDiff);
        selected = [...new Set([...selected, ...shuffle(all)])].slice(0, n);
        break;
      }
    }
    paper.push(...selected.slice(0, n));
  });

  const byDiff = [1, 2, 3, 4].filter(d => d <= maxDiff).flatMap(d =>
    shuffle(paper.filter(q => q.difficulty === d))
  );

  return { questions: byDiff.slice(0, cfg.count), durationMins: cfg.mins };
}
