'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice Engine — Question Pool & Access Functions
//  STATIC_QUESTIONS is populated at load time by subject question files.
//  GENERATORS is populated by each subject's _manifest.js.
//  CHAPTERS is populated by each subject's _manifest.js.
// ══════════════════════════════════════════════

// Central question pool — all subject files push into this array
const STATIC_QUESTIONS = [];

// ── QUESTION ACCESS FUNCTIONS ──────────────────
function getStaticQs(chapterId, difficulty) {
  return STATIC_QUESTIONS.filter(q => q && q.question && q.chapterId === chapterId && q.difficulty === difficulty);
}

function generateDynamic(chapterId, level) {
  try {
    if (GENERATORS[chapterId]) return GENERATORS[chapterId](level);
  } catch(e) {}
  return null;
}

function getQuestionsForChapter(chapterId, difficulty, count = 10) {
  let pool = getStaticQs(chapterId, difficulty);

  if (difficulty === 4) {
    // Word problem mode: use ONLY L4 static questions — no generator, no L3 padding.
    return shuffle(pool);
  }

  // For L1–L3: pad with dynamic generator, then cross-difficulty static as last resort
  while (pool.length < count) {
    const dyn = generateDynamic(chapterId, difficulty);
    if (dyn) {
      pool = [...pool, dyn];
    } else {
      const alt = STATIC_QUESTIONS.filter(q => q.chapterId === chapterId);
      if (alt.length > pool.length) pool = [...new Set([...pool, ...alt])];
      else break;
    }
  }
  return shuffle(pool).slice(0, count);
}

// ── MIXED PRACTICE (no chosen difficulty — random across levels) ──────────
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
    q.chapterId === chapterId && q.subsection === subsectionId
  ));
  if (pool.length >= 3) return pool.slice(0, count);
  return getQuestionsForChapter(chapterId, 2, count);
}

function assembleExamPaper(type) {
  const config = { drill:{count:15,mins:10}, short:{count:25,mins:25}, full:{count:40,mins:45} };
  const cfg = config[type] || config.full;
  const paper = [];

  const weights = CHAPTERS.map(ch => ({
    chapterId: ch.id,
    n: Math.max(1, Math.round(ch.examWeight * cfg.count / 40))
  }));

  let total = weights.reduce((s, w) => s + w.n, 0);
  let idx = 0;
  while (total < cfg.count) { weights[idx % weights.length].n++; total++; idx++; }
  while (total > cfg.count) {
    const i = weights.findIndex(w => w.n > 1);
    if (i === -1) break;
    weights[i].n--; total--;
  }

  weights.forEach(({ chapterId, n }) => {
    const q1 = shuffle(getStaticQs(chapterId, 1));
    const q2 = shuffle(getStaticQs(chapterId, 2));
    const q3 = shuffle(getStaticQs(chapterId, 3));
    const q4 = shuffle(getStaticQs(chapterId, 4));

    const take = (arr, k) => arr.slice(0, Math.max(0, k));
    const pool = [
      ...take(q1, Math.max(0, Math.round(n * 0.25))),
      ...take(q2, Math.max(0, Math.round(n * 0.35))),
      ...take(q3, Math.max(0, Math.round(n * 0.25))),
      ...take(q4, Math.max(0, Math.round(n * 0.15))),
    ];

    let selected = pool.slice(0, n);

    while (selected.length < n) {
      const dyn = generateDynamic(chapterId, rnd(1, 3));
      if (dyn) selected.push(dyn);
      else {
        const all = STATIC_QUESTIONS.filter(q => q.chapterId === chapterId);
        selected = [...new Set([...selected, ...shuffle(all)])].slice(0, n);
        break;
      }
    }
    paper.push(...selected.slice(0, n));
  });

  const byDiff = [1, 2, 3, 4].flatMap(d =>
    shuffle(paper.filter(q => q.difficulty === d))
  );

  return { questions: byDiff.slice(0, cfg.count), durationMins: cfg.mins };
}
