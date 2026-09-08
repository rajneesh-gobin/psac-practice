'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice - practice-set selection and per-question state
//  Pure functions. No DOM, no network, no globals read: everything comes in
//  through arguments so the whole policy can be tested without a browser.
//
//  WHY THIS EXISTS
//  Chapter entry used to call getMixedQuestions(chapterId, maxDiff, 20), which
//  is a flat shuffle of everything eligible. A child could answer the same
//  twenty questions three rounds running while a hundred others in the chapter
//  went untouched, and the completion dialog called that "Round Complete" as
//  though the chapter were finished. Selection policy belongs in one testable
//  place rather than spread through render code.
//
//  ⚠ ELIGIBILITY IS NOT THIS MODULE'S JOB. Difficulty caps, chapter locks,
//    plan restrictions, published-grade limits and the cloze/type filter are
//    applied by the CALLER, which passes an already-eligible list. Duplicating
//    those rules here would create a second place for them to drift - and they
//    are enforced on the server anyway (netlify/functions/questions.js). This
//    module only decides WHICH of the eligible questions to serve, in what
//    order.
//
//  ⚠ Randomness is injected. Every function that shuffles takes an `rng`
//    returning [0,1). Tests pass a seeded generator, so a failing set can be
//    reproduced exactly; production passes Math.random.
// ══════════════════════════════════════════════

const PracticeSelector = (() => {

  const SET_SIZE = 20;

  // Per-question states. `legacy_seen` is the backfill of the old answeredIds
  // array: it means SEEN, OUTCOME UNKNOWN, because chapter-wide totals cannot
  // be split back into per-question correctness. It counts towards coverage and
  // towards nothing else.
  const NOT_TRIED = 'not_tried';
  const NEEDS     = 'needs_practice';
  const IMPROVED  = 'improved';
  const SECURE    = 'secure';
  const LEGACY    = 'legacy_seen';

  // Starting mix when a chapter has enough of everything. Deliberately a
  // preference, not a quota: it must never justify a duplicate or an
  // ineligible question, and a category that is short simply yields its slots.
  const MIX = { unseen: 0.60, needs: 0.25, review: 0.15 };

  // ── the state machine ───────────────────────────────────────────────────
  // Mirrors record_question_progress() in
  // migrations/20260908_chapter_question_progress.sql exactly. The database is
  // the writer of record; this copy exists so the UI can show the new state
  // immediately without waiting for a round trip.
  // ⚠ If you change one, change both. There is no shared module between the
  //   browser and Postgres, which is the standing hazard in this repo.
  function nextState(prev, correct) {
    const p = prev || {};
    const everWrong = !!p.everWrong;
    const cc = correct ? (p.consecutiveCorrect || 0) + 1 : 0;
    let state;
    if (!correct)          state = NEEDS;
    else if (!everWrong)   state = SECURE;   // first correct, never missed
    else if (cc >= 2)      state = SECURE;   // recovered, then held it
    else                   state = IMPROVED; // one correct after a miss is not enough
    return {
      state,
      everWrong: everWrong || !correct,
      consecutiveCorrect: cc,
      attempts: (p.attempts || 0) + 1,
      correctAttempts: (p.correctAttempts || 0) + (correct ? 1 : 0),
      wrongAttempts: (p.wrongAttempts || 0) + (correct ? 0 : 1),
    };
  }

  // Viewing or skipping is not an attempt and must never turn a cell green.
  function isAttempted(rec) {
    return !!rec && (rec.attempts || 0) > 0;
  }

  // ── buckets ─────────────────────────────────────────────────────────────
  function stateOf(progress, id) {
    const rec = progress && progress[id];
    if (!rec) return NOT_TRIED;
    return rec.state || NOT_TRIED;
  }

  function lastSeen(progress, id) {
    const rec = progress && progress[id];
    const t = rec && (rec.lastSeenAt || rec.last_seen_at);
    return t ? (typeof t === 'number' ? t : Date.parse(t) || 0) : 0;
  }

  function bucket(questions, progress) {
    const unseen = [], needs = [], improved = [], secure = [], legacy = [];
    for (const q of questions) {
      switch (stateOf(progress, q.id)) {
        case NEEDS:    needs.push(q);    break;
        case IMPROVED: improved.push(q); break;
        case SECURE:   secure.push(q);   break;
        // Legacy rows were seen but never scored, so they are NOT unseen and
        // NOT secure. They sit with review work until the child answers them.
        case LEGACY:   legacy.push(q);   break;
        default:       unseen.push(q);
      }
    }
    return { unseen, needs, improved, secure, legacy };
  }

  // ── ordering helpers ────────────────────────────────────────────────────
  function shuffle(arr, rng) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  const byOldestSeen = (progress) => (a, b) => lastSeen(progress, a.id) - lastSeen(progress, b.id);

  // ── the selector ────────────────────────────────────────────────────────
  //  opts = { mode, questions, progress, size, resume, rng, recentFirstIds }
  //
  //  Returns { ids, mode, size, requested, short, empty, reason, counts }
  //  `short` is true when fewer than `size` questions could be found WITHOUT
  //  repeating one - the caller must say so rather than padding the set.
  function select(opts) {
    const o = opts || {};
    const mode = o.mode || 'smart';
    const size = o.size || SET_SIZE;
    const rng = o.rng || Math.random;
    const questions = (o.questions || []).filter(q => q && q.id);
    const progress = o.progress || {};
    const recentFirst = new Set(o.recentFirstIds || []);

    // 1. an unfinished set resumes exactly, at the saved position
    if (o.resume && Array.isArray(o.resume.ids) && o.resume.ids.length) {
      const live = new Set(questions.map(q => q.id));
      // A question removed from the bank since the set was saved is dropped
      // rather than crashing the resume; the position is clamped.
      const ids = o.resume.ids.filter(id => live.has(id));
      if (ids.length) {
        const pos = Math.min(Math.max(0, o.resume.position || 0), ids.length - 1);
        return {
          ids, mode: 'resume', size: ids.length, requested: size,
          short: false, empty: false, position: pos,
          dropped: o.resume.ids.length - ids.length,
          reason: 'resumed', counts: countStates(ids, progress),
        };
      }
    }

    const b = bucket(questions, progress);
    let pool;

    if (mode === 'new') {
      // ⚠ never silently pads with seen questions
      pool = shuffle(b.unseen, rng);
    } else if (mode === 'fix') {
      // least recently retried first, so the oldest mistake is not buried
      pool = b.needs.slice().sort(byOldestSeen(progress));
    } else if (mode === 'journey') {
      // unseen-first in chunks, stable order so chunk N+1 follows chunk N
      pool = b.unseen.slice();
    } else {
      pool = smartPool(b, size, rng, progress);
    }

    // 2. no duplicate ids within one set
    const seen = new Set();
    let ids = [];
    for (const q of pool) { if (!seen.has(q.id)) { seen.add(q.id); ids.push(q.id); } }
    ids = ids.slice(0, size);

    // 9. avoid putting the same question at the front of successive sets
    if (ids.length > 1 && recentFirst.has(ids[0])) {
      const swap = ids.findIndex(id => !recentFirst.has(id));
      if (swap > 0) { const t = ids[0]; ids[0] = ids[swap]; ids[swap] = t; }
    }

    return {
      ids, mode, size: ids.length, requested: size,
      short: ids.length < size, empty: ids.length === 0,
      position: 0, dropped: 0,
      reason: ids.length === 0 ? emptyReason(mode) : '',
      counts: countStates(ids, progress),
    };
  }

  // 3-6: unseen, then needing practice, then due review, then secure by age.
  function smartPool(b, size, rng, progress) {
    const want = {
      unseen: Math.round(size * MIX.unseen),
      needs:  Math.round(size * MIX.needs),
      review: Math.round(size * MIX.review),
    };
    const take = (arr, n) => arr.slice(0, Math.max(0, n));
    const review = b.improved.concat(b.legacy).sort(byOldestSeen(progress));

    const picked = []
      .concat(take(shuffle(b.unseen, rng), want.unseen))
      .concat(take(b.needs.slice().sort(byOldestSeen(progress)), want.needs))
      .concat(take(review, want.review));

    // 8. degrade gracefully: whatever the mix could not fill is topped up
    // unseen-first, then needing practice, then review, then secure
    // least-recently-seen first.
    const already = new Set(picked.map(q => q.id));
    const rest = []
      .concat(shuffle(b.unseen, rng))
      .concat(b.needs.slice().sort(byOldestSeen(progress)))
      .concat(review)
      .concat(b.secure.slice().sort(byOldestSeen(progress)))
      .filter(q => !already.has(q.id));

    return picked.concat(rest);
  }

  function emptyReason(mode) {
    if (mode === 'new')     return 'no_unseen';
    if (mode === 'fix')     return 'no_mistakes';
    if (mode === 'journey') return 'no_unseen';
    return 'no_questions';
  }

  function countStates(ids, progress) {
    const c = { unseen: 0, needs: 0, improved: 0, secure: 0, legacy: 0 };
    for (const id of ids) {
      const s = stateOf(progress, id);
      if (s === NEEDS) c.needs++;
      else if (s === IMPROVED) c.improved++;
      else if (s === SECURE) c.secure++;
      else if (s === LEGACY) c.legacy++;
      else c.unseen++;
    }
    return c;
  }

  // ── chapter coverage, for the card and the parent view ──────────────────
  //  Three separate numbers, never collapsed into one "mastery" figure:
  //    coverage     unique eligible questions explored / available
  //    practice     attempts recorded
  //    understanding accuracy, with the sample size beside it
  function coverage(questions, progress) {
    const total = questions.length;
    let explored = 0, needs = 0, secure = 0, attempts = 0, correct = 0;
    for (const q of questions) {
      const rec = progress && progress[q.id];
      const s = stateOf(progress, q.id);
      if (s !== NOT_TRIED) explored++;
      if (s === NEEDS) needs++;
      if (s === SECURE) secure++;
      if (rec) { attempts += rec.attempts || 0; correct += rec.correctAttempts || rec.correct_attempts || 0; }
    }
    return {
      total, explored, needs, secure, attempts, correct,
      // ⚠ unknown, not zero, when the bank has not loaded. An earlier version
      // of _chapterProgress() assumed 1 here and handed out "Mastered".
      known: total > 0,
      pctExplored: total > 0 ? Math.round(explored / total * 100) : null,
      accuracy: attempts > 0 ? Math.round(correct / attempts * 100) : null,
      allExplored: total > 0 && explored >= total,
    };
  }

  // ── the label on the one big button ─────────────────────────────────────
  function primaryAction(questions, progress, resume) {
    if (resume && Array.isArray(resume.ids) && resume.ids.length) {
      const pos = Math.min((resume.position || 0) + 1, resume.ids.length);
      return { mode: 'resume', label: `Resume · Question ${pos} of ${resume.ids.length}` };
    }
    const cov = coverage(questions, progress);
    if (!cov.known || cov.explored === 0) return { mode: 'smart', label: 'Start Smart Practice' };
    if (!cov.allExplored)                 return { mode: 'smart', label: 'Continue Smart Practice' };
    return { mode: 'revision', label: 'Start Revision' };
  }

  // A tiny seeded generator so tests are reproducible. mulberry32.
  function seeded(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  return {
    SET_SIZE, MIX,
    NOT_TRIED, NEEDS, IMPROVED, SECURE, LEGACY,
    nextState, isAttempted, stateOf, bucket, select, coverage, primaryAction, seeded, shuffle,
  };
})();

if (typeof window !== 'undefined') window.PracticeSelector = PracticeSelector;
if (typeof module !== 'undefined' && module.exports) module.exports = PracticeSelector;
