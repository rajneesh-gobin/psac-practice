'use strict';
// ══════════════════════════════════════════════
//  GameSettings - parent-controlled Game Zone settings, per child.
//
//  Stored in DB.restrictions.games (→ students.settings, parent-written via
//  Store.updateStudent; a child session has SELECT only on students, so the
//  child cannot rewrite them). Missing / partial settings normalise to safe
//  defaults, so existing children need no backfill.
//
//  Three things live here on purpose, because they must agree:
//    1. the settings model (defaults, normalise, summary text)
//    2. the question-selection service every quiz game calls (pick)
//    3. the parent "Game settings" card and the child's one-line summary
//
//  GAMES is the single capability table. Nothing else in the app may branch
//  on a game's name to decide which settings apply.
// ══════════════════════════════════════════════

const GameSettings = (() => {
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = id => document.getElementById(id);

  const SUBJECTS = [
    { key: 'maths',   label: 'Mathematics',         short: 'Maths',         icon: '🔢', re: /math/i },
    { key: 'english', label: 'English',             short: 'English',       icon: '📖', re: /english/i },
    { key: 'french',  label: 'French',              short: 'French',        icon: '🇫🇷', re: /french|fran[cç]ais/i },
    { key: 'science', label: 'Science',             short: 'Science',       icon: '🔬', re: /science/i },
    { key: 'histgeo', label: 'History & Geography', short: 'History & Geo', icon: '🌍', re: /histor|geog/i },
  ];
  const SUBJECT_BY_KEY = Object.fromEntries(SUBJECTS.map(s => [s.key, s]));

  const MODES = {
    balanced: { label: 'Balanced',            desc: 'Questions are shared equally between selected subjects.', hint: 'Balanced is a good choice if you are unsure.' },
    weak:     { label: 'Focus on weak areas', desc: 'More questions come from subjects your child needs to practise.' },
    custom:   { label: 'Custom mix',          desc: 'Choose approximately how many questions come from each subject.' },
  };

  // `levels` is the share of a round drawn from each internal level; `top` is
  // the highest level the option may ever reach. Parents never see the numbers.
  const DIFFICULTY = {
    basic:       { label: 'Basic',       desc: 'Mostly straightforward grade-level questions', levels: { 1: 70, 2: 30 },        top: 2 },
    medium:      { label: 'Medium',      desc: 'A balanced mix',                               levels: { 1: 30, 2: 45, 3: 25 }, top: 3 },
    challenging: { label: 'Challenging', desc: 'More difficult and analytical questions',      levels: { 2: 30, 3: 40, 4: 30 }, top: 4 },
    adaptive:    { label: 'Adaptive',    desc: 'Difficulty changes based on recent answers',   levels: null,                    top: 4 },
  };
  const ROUND_LENGTHS = [
    { n: 5,  label: 'Quick game' },
    { n: 10, label: 'Standard' },
    { n: 15, label: 'Longer practice' },
    { n: 20, label: 'Challenge' },
  ];

  const DEFAULTS = Object.freeze({
    mode: 'balanced', subjects: null, percents: null, difficulty: 'medium',
    roundLength: 10, weakChapters: false, avoidRecent: true, generalKnowledge: false,
  });

  // ── Capability table ─────────────────────────
  // subject: the one subject a single-subject game is about (informational).
  // minOptions: what the game's answer grid can show.
  const GAMES = {
    billionaire: { name: 'Who Wants to Be a Billionaire?', icon: '💰', kind: 'mixed',
      supportsSubjectMix: true,  supportsDifficulty: true, supportsRoundLength: false, supportsWeakTopics: true,  supportsGeneralKnowledge: true,  supportsRecentAvoidance: true,  minOptions: 4 },
    quickfire:   { name: 'Quick Fire', icon: '⚡', kind: 'mixed',
      supportsSubjectMix: true,  supportsDifficulty: true, supportsRoundLength: false, supportsWeakTopics: true,  supportsGeneralKnowledge: false, supportsRecentAvoidance: true,  minOptions: 2 },
    battle:      { name: 'Brain Battle', icon: '⚔️', kind: 'mixed',
      supportsSubjectMix: true,  supportsDifficulty: true, supportsRoundLength: true,  supportsWeakTopics: true,  supportsGeneralKnowledge: false, supportsRecentAvoidance: true,  minOptions: 4 },
    wordbuilder: { name: 'Word Builder', icon: '🧩', kind: 'single', subject: 'english',
      supportsSubjectMix: false, supportsDifficulty: true, supportsRoundLength: true,  supportsWeakTopics: false, supportsGeneralKnowledge: false, supportsRecentAvoidance: false, minOptions: 0 },
    timetravel:  { name: 'Time Traveller', icon: '🕰️', kind: 'single', subject: 'histgeo',
      supportsSubjectMix: false, supportsDifficulty: true, supportsRoundLength: false, supportsWeakTopics: false, supportsGeneralKnowledge: false, supportsRecentAvoidance: false, minOptions: 0 },
    explorer:    { name: 'Island Explorer', icon: '🗺️', kind: 'none', subject: 'histgeo',
      supportsSubjectMix: false, supportsDifficulty: false, supportsRoundLength: false, supportsWeakTopics: false, supportsGeneralKnowledge: false, supportsRecentAvoidance: false, minOptions: 0 },
    ninja:       { name: 'Number Ninja', icon: '🥷', kind: 'none', subject: 'maths',
      supportsSubjectMix: false, supportsDifficulty: false, supportsRoundLength: false, supportsWeakTopics: false, supportsGeneralKnowledge: false, supportsRecentAvoidance: false, minOptions: 0 },
  };
  const gamesWhere = flag => Object.values(GAMES).filter(g => g[flag]);

  const NO_QUESTIONS_MSG = 'This game does not have enough suitable questions right now. Try another game or ask your parent to adjust Game Settings.';
  const RECENT_KEEP = 150;

  // ── Pure arithmetic ──────────────────────────
  // Largest-remainder apportionment: integer shares summing exactly to total.
  function allocate(total, weights) {
    const keys = Object.keys(weights);
    if (!keys.length || total <= 0) return {};
    let sum = keys.reduce((a, k) => a + Math.max(0, +weights[k] || 0), 0);
    const w = {};
    keys.forEach(k => { w[k] = sum > 0 ? Math.max(0, +weights[k] || 0) : 1; });
    if (sum <= 0) sum = keys.length;
    const out = {}, rem = [];
    let given = 0;
    keys.forEach(k => {
      const exact = w[k] / sum * total;
      out[k] = Math.floor(exact); given += out[k];
      rem.push({ k, frac: exact - out[k], w: w[k] });
    });
    rem.sort((a, b) => b.frac - a.frac || b.w - a.w || keys.indexOf(a.k) - keys.indexOf(b.k));
    for (let i = 0; given < total && rem.length; i = (i + 1) % rem.length) { out[rem[i].k]++; given++; }
    return out;
  }
  const equalSplit = keys => allocate(100, Object.fromEntries(keys.map(k => [k, 1])));

  // One share changed by the parent; the others move proportionally so the
  // total stays 100 without the parent ever doing the arithmetic.
  function rebalance(percents, key, value, keys) {
    const v = Math.max(0, Math.min(100, Math.round(+value || 0)));
    const others = keys.filter(k => k !== key);
    if (!others.length) return { [key]: 100 };
    const remaining = 100 - v;
    const cur = {};
    others.forEach(k => { cur[k] = Math.max(0, +(percents && percents[k]) || 0); });
    const rest = allocate(remaining, cur);
    return Object.assign({ [key]: v }, rest);
  }

  // ── Settings model ───────────────────────────
  function subjectKeyOf(pack) {
    const n = String((pack && (pack.subject || pack.name)) || '');
    const hit = SUBJECTS.find(s => s.re.test(n));
    return hit ? hit.key : null;
  }
  function gradePacks(grade, packs) {
    const list = packs || (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : []);
    const gs = (typeof window !== 'undefined' && window.GLOBAL_SETTINGS) || {};
    const off = gs.disabled_subjects || [];
    return list.filter(p => p.grade === grade && !p.comingSoon && !off.includes(p.id));
  }
  // The subjects this grade can actually practise, in canonical order.
  function availableSubjects(packs) {
    const keys = new Set(packs.map(subjectKeyOf).filter(Boolean));
    return SUBJECTS.filter(s => keys.has(s.key)).map(s => ({ key: s.key, label: s.label, short: s.short, icon: s.icon }));
  }

  function normalise(raw, availableKeys) {
    const avail = (availableKeys && availableKeys.length ? availableKeys : SUBJECTS.map(s => s.key)).slice();
    const r = (raw && typeof raw === 'object') ? raw : {};
    const s = {};
    s.mode = MODES[r.mode] ? r.mode : DEFAULTS.mode;
    s.difficulty = DIFFICULTY[r.difficulty] ? r.difficulty : DEFAULTS.difficulty;
    s.roundLength = ROUND_LENGTHS.some(o => o.n === +r.roundLength) ? +r.roundLength : DEFAULTS.roundLength;
    s.weakChapters = !!r.weakChapters;
    s.avoidRecent = r.avoidRecent === undefined ? DEFAULTS.avoidRecent : !!r.avoidRecent;
    s.generalKnowledge = !!r.generalKnowledge;
    let subs = Array.isArray(r.subjects) ? r.subjects.filter(k => avail.includes(k)) : null;
    if (!subs || !subs.length) subs = avail.slice();
    s.subjects = SUBJECTS.map(x => x.key).filter(k => subs.includes(k));
    if (s.mode === 'custom') {
      const p = (r.percents && typeof r.percents === 'object') ? r.percents : {};
      const keep = {};
      s.subjects.forEach(k => { keep[k] = Math.max(0, Math.round(+p[k] || 0)); });
      const total = Object.values(keep).reduce((a, b) => a + b, 0);
      s.percents = total > 0 ? allocate(100, keep) : equalSplit(s.subjects);
    } else {
      s.percents = null;
    }
    return s;
  }

  // The highest internal level a game may draw for this child: the parent's
  // Game Zone difficulty AND the existing practice cap, whichever is lower.
  function capLevel(settings, restrictions) {
    const top = (DIFFICULTY[settings.difficulty] || DIFFICULTY.medium).top;
    const parentCap = Math.min(4, Math.max(1, +((restrictions && restrictions.maxDifficulty) ?? 4) || 4));
    return Math.min(top, parentCap);
  }

  function summary(settings, available) {
    const availKeys = available.map(a => a.key);
    const all = availKeys.length && availKeys.every(k => settings.subjects.includes(k));
    const names = settings.subjects.map(k => SUBJECT_BY_KEY[k].short);
    const subj = all ? 'All subjects' : names.length === 1 ? names[0] + ' only' : joinNames(names, '&');
    const mode = settings.mode === 'balanced' ? 'Balanced questions' : settings.mode === 'weak' ? 'Focus on weak areas' : 'Custom mix';
    return `${mode} · ${subj} · ${DIFFICULTY[settings.difficulty].label} difficulty · ${settings.roundLength} questions per round`;
  }
  function childSummary(settings, available) {
    const availKeys = available.map(a => a.key);
    const all = availKeys.length && availKeys.every(k => settings.subjects.includes(k));
    const names = settings.subjects.map(k => SUBJECT_BY_KEY[k].short);
    return `Your game mix: ${all ? 'all subjects' : joinNames(names, 'and')} · ${DIFFICULTY[settings.difficulty].label}`;
  }
  function joinNames(names, word) {
    if (names.length <= 1) return names.join('');
    return names.slice(0, -1).join(', ') + ' ' + word + ' ' + names[names.length - 1];
  }

  // ── Runtime context (reads the live globals) ──
  function childGrade() {
    return (typeof Auth !== 'undefined' && Auth.getActiveAccount?.()?.grade)
      || (typeof SELECTED_GRADE !== 'undefined' && SELECTED_GRADE) || 5;
  }
  function context(gameKey) {
    const grade = childGrade();
    const packs = gradePacks(grade);
    const available = availableSubjects(packs);
    const restrictions = (typeof DB !== 'undefined' && DB && DB.restrictions) || {};
    const settings = normalise(restrictions.games, available.map(a => a.key));
    return { grade, packs, available, settings, restrictions, cap: capLevel(settings, restrictions), caps: GAMES[gameKey] || null };
  }

  // ── Question validity ────────────────────────
  const stripTags = s => String(s || '').replace(/<[^>]*>/g, '').trim();
  function isValidMCQ(q, minOptions) {
    if (!q || q.type !== 'mcq' || !q.id) return false;
    if (!Array.isArray(q.options) || q.options.length < Math.max(2, minOptions || 2)) return false;
    const opts = q.options.map(o => (o === null || o === undefined) ? '' : String(o).trim());
    if (opts.some(o => !o)) return false;
    if (new Set(opts).size !== opts.length) return false;
    if (q.answer === null || q.answer === undefined) return false;
    const ans = String(q.answer).trim();
    const hits = opts.filter(o => o === ans).length;
    if (hits !== 1) return false;
    // Games show at most four options; an answer sitting fifth is unanswerable.
    if (opts.indexOf(ans) > 3) return false;
    return stripTags(q.question).length > 0;
  }
  const levelOf = q => Math.min(4, Math.max(1, parseInt(q.difficulty, 10) || 2));

  // Every candidate for this child: subject-tagged, grade-scoped, valid.
  //   excludeChapter(id) → true for locked / admin-blocked chapters
  //   safe(q)            → the game's own suitability test (e.g. no passages)
  //   crossGrade         → allow other grades' questions as a LAST resort
  function buildPool(opts) {
    const questions = opts.questions || [];
    const packs = opts.packs || [];
    const grade = opts.grade;
    const chapterSubject = {}, chapterGrade = {};
    packs.forEach(p => (p._chapters || p.chapters || []).forEach(c => {
      chapterSubject[c.id] = subjectKeyOf(p); chapterGrade[c.id] = p.grade;
    }));
    const excl = typeof opts.excludeChapter === 'function' ? opts.excludeChapter : () => false;
    const safe = typeof opts.safe === 'function' ? opts.safe : () => true;
    const out = [];
    for (const q of questions) {
      if (!isValidMCQ(q, opts.minOptions)) continue;
      if (!safe(q)) continue;
      if (excl(q.chapterId)) continue;
      const g = chapterGrade[q.chapterId];
      // A chapter no manifest knows is not "this grade" - drop it, unless no
      // manifest is loaded at all (dev harnesses), where nothing is knowable.
      if (g === undefined && packs.length) continue;
      const own = g === undefined ? null : g === grade;
      if (own === false && !opts.crossGrade) continue;
      out.push({ q, id: q.id, chapterId: q.chapterId, subject: chapterSubject[q.chapterId] || null, level: levelOf(q), own });
    }
    // Manifests absent (dev harnesses, tests): nothing can be attributed, so
    // the whole bank is one anonymous subject rather than an empty game.
    if (out.length && !out.some(e => e.subject)) out.forEach(e => { e.subject = '_any'; e.own = true; });
    return out;
  }

  // ── Weakness from real progress ──────────────
  // accuracy per chapter from DB.chapters; null when too little data to judge.
  function chapterAccuracy(progress, chapterId) {
    const c = progress && progress[chapterId];
    if (!c || !(c.attempted >= 5)) return null;
    return Math.max(0, Math.min(1, (c.correct || 0) / c.attempted));
  }
  function subjectAccuracy(progress, chapterIds) {
    let a = 0, c = 0;
    chapterIds.forEach(id => { const r = progress && progress[id]; if (r && r.attempted) { a += r.attempted; c += r.correct || 0; } });
    return a >= 5 ? Math.max(0, Math.min(1, c / a)) : null;
  }
  // 0.5 for a mastered area up to 2.0 for a struggling one; unknown = 1.
  const weakWeight = acc => acc === null ? 1 : 0.5 + (1 - acc) * 1.5;

  // ── Level plans ──────────────────────────────
  function levelPlan(count, settings, cap, adaptiveLevel) {
    let dist;
    if (settings.difficulty === 'adaptive') {
      const L = Math.min(cap, Math.max(1, adaptiveLevel || 2));
      dist = { [L - 1]: 25, [L]: 50, [L + 1]: 25 };
    } else {
      dist = Object.assign({}, DIFFICULTY[settings.difficulty].levels);
    }
    const capped = {};
    Object.keys(dist).forEach(l => { const lv = Math.min(cap, Math.max(1, +l)); capped[lv] = (capped[lv] || 0) + dist[l]; });
    const counts = allocate(count, capped);
    const plan = [];
    Object.keys(counts).map(Number).sort((a, b) => a - b).forEach(l => { for (let i = 0; i < counts[l]; i++) plan.push(l); });
    return plan;
  }

  // Smooth weighted round-robin: spreads each subject's share evenly through
  // the round instead of clumping all the maths at the start.
  function spread(counts) {
    const keys = Object.keys(counts).filter(k => counts[k] > 0);
    const total = keys.reduce((a, k) => a + counts[k], 0);
    const cur = {}; keys.forEach(k => { cur[k] = 0; });
    const seq = [];
    for (let i = 0; i < total; i++) {
      let best = null;
      keys.forEach(k => { cur[k] += counts[k]; if (best === null || cur[k] > cur[best]) best = k; });
      cur[best] -= total; seq.push(best);
    }
    return seq;
  }

  // ── The selection service ────────────────────
  // opts: { count, pool, settings, cap, caps, levels?, progress?, recent?, rng?,
  //         adaptiveLevel?, chapterIdsBySubject? }
  // Returns { questions, counts, warnings, reason, plan }
  function pick(opts) {
    const rng = typeof opts.rng === 'function' ? opts.rng : Math.random;
    const settings = opts.settings;
    const caps = opts.caps || GAMES.quickfire;
    const cap = Math.min(4, Math.max(1, opts.cap || 4));
    const count = Math.max(0, opts.count | 0);
    const pool = opts.pool || [];
    const progress = opts.progress || {};
    const recent = opts.recent instanceof Set ? opts.recent : new Set(opts.recent || []);
    const warnings = [];
    if (!count) return { questions: [], counts: {}, warnings, reason: null, plan: [] };

    const anon = pool.length && pool.every(e => e.subject === '_any');
    const included = anon ? ['_any'] : settings.subjects.slice();
    // Excluded subjects are removed here and never consulted again.
    const bySubject = {};
    included.forEach(k => { bySubject[k] = []; });
    for (const e of pool) if (bySubject[e.subject]) bySubject[e.subject].push(e);
    const own = k => bySubject[k].filter(e => e.own !== false);
    const withQs = included.filter(k => bySubject[k].length);
    if (!withQs.length) return { questions: [], counts: {}, warnings, reason: NO_QUESTIONS_MSG, plan: [] };

    // Subject shares for this round.
    let counts;
    const chaptersOf = {};
    included.forEach(k => { chaptersOf[k] = Array.from(new Set(bySubject[k].map(e => e.chapterId))); });
    if (!caps.supportsSubjectMix || anon || withQs.length === 1) {
      counts = allocate(count, Object.fromEntries(withQs.map(k => [k, 1])));
    } else if (settings.mode === 'custom' && settings.percents) {
      const w = {}; withQs.forEach(k => { w[k] = settings.percents[k] || 0; });
      counts = allocate(count, Object.values(w).some(v => v > 0) ? w : Object.fromEntries(withQs.map(k => [k, 1])));
    } else if (settings.mode === 'weak' && caps.supportsWeakTopics) {
      const w = {}; withQs.forEach(k => { w[k] = weakWeight(subjectAccuracy(progress, chaptersOf[k])); });
      counts = allocate(count, w);
    } else {
      counts = allocate(count, Object.fromEntries(withQs.map(k => [k, 1])));
    }
    const order = spread(counts);

    // Difficulty per slot: the game's own ladder if it has one, else the
    // parent's choice - and never above the cap either way.
    let levels;
    if (Array.isArray(opts.levels) && opts.levels.length) {
      levels = []; for (let i = 0; i < count; i++) levels.push(Math.min(cap, Math.max(1, opts.levels[i % opts.levels.length] | 0 || 2)));
    } else {
      levels = caps.supportsDifficulty ? levelPlan(count, settings, cap, opts.adaptiveLevel) : levelPlan(count, { difficulty: 'medium' }, cap);
    }

    const used = new Set(opts.exclude || []);
    const useWeakCh = settings.weakChapters && caps.supportsWeakTopics && !anon;
    const chWeight = {};
    const weightOf = e => {
      if (!useWeakCh) return 1;
      if (chWeight[e.chapterId] === undefined) chWeight[e.chapterId] = weakWeight(chapterAccuracy(progress, e.chapterId));
      return chWeight[e.chapterId];
    };
    const draw = list => {
      if (!list.length) return null;
      if (!useWeakCh) return list[Math.floor(rng() * list.length)];
      let total = 0; const ws = list.map(e => { const w = weightOf(e); total += w; return w; });
      let r = rng() * total;
      for (let i = 0; i < list.length; i++) { r -= ws[i]; if (r <= 0) return list[i]; }
      return list[list.length - 1];
    };
    const avoid = settings.avoidRecent && caps.supportsRecentAvoidance;
    // Nearest level at or below the target first, then above - but never above cap.
    const ladder = want => {
      const seq = [];
      for (let d = 0; d < 4; d++) { if (want - d >= 1) seq.push(want - d); if (d && want + d <= cap) seq.push(want + d); }
      return seq;
    };
    // Own grade before cross-grade; nothing above the cap, ever. A game with
    // its own ladder (Billionaire's rungs, Brain Battle's matched pairs) keeps
    // the exact level and only then prefers a fresh question; a free-running
    // game (Quick Fire) takes a fresh question at a nearby level before a
    // recently seen one at the exact level.
    const strictLevel = Array.isArray(opts.levels) && opts.levels.length > 0;
    const takeFrom = (key, want) => {
      const tiers = [own(key), bySubject[key]];
      const passes = avoid ? [true, false] : [false];
      const attempt = (tier, lv, freshOnly) => {
        let cands = tier.filter(e => e.level === lv && !used.has(e.id));
        if (freshOnly) cands = cands.filter(e => !recent.has(e.id));
        const e = draw(cands);
        if (e) used.add(e.id);
        return e;
      };
      for (const tier of tiers) {
        if (strictLevel) {
          for (const lv of ladder(want)) for (const f of passes) { const e = attempt(tier, lv, f); if (e) return e; }
        } else {
          for (const f of passes) for (const lv of ladder(want)) { const e = attempt(tier, lv, f); if (e) return e; }
        }
      }
      return null;
    };

    const out = [], picked = {};
    included.forEach(k => { picked[k] = 0; });
    for (let i = 0; i < count; i++) {
      const wantKey = order[i], lv = levels[i];
      let e = takeFrom(wantKey, lv);
      if (!e) {
        // Fallback: another INCLUDED subject only, the one with the most left.
        const alt = withQs.filter(k => k !== wantKey)
          .map(k => ({ k, left: bySubject[k].filter(x => !used.has(x.id)).length }))
          .filter(x => x.left > 0).sort((a, b) => b.left - a.left);
        for (const a of alt) { e = takeFrom(a.k, lv); if (e) { warnings.push({ slot: i, wanted: wantKey, used: a.k, level: lv }); break; } }
      }
      if (!e) break;
      picked[e.subject]++;
      out.push(Object.assign({}, e.q, { _id: e.id, _subject: e.subject, _level: e.level, _chapterId: e.chapterId }));
    }
    const reason = out.length ? null : NO_QUESTIONS_MSG;
    return { questions: out, counts: picked, warnings, reason, plan: counts };
  }

  // General-knowledge bonus questions, only from included subjects, spread
  // across them; never a silent substitute for the requested mix.
  function pickGeneralKnowledge(count, settings, bank, rng) {
    rng = typeof rng === 'function' ? rng : Math.random;
    const bySub = {};
    (bank || []).forEach(q => { if (settings.subjects.includes(q.subject) && isValidMCQ(Object.assign({ id: q.id || q.question, type: 'mcq' }, q), 4)) (bySub[q.subject] ||= []).push(q); });
    const subs = Object.keys(bySub).sort(() => rng() - 0.5);
    const out = [];
    let guard = 0;
    while (out.length < count && guard++ < 40 && subs.length) {
      for (const s of subs) {
        if (out.length >= count) break;
        const arr = bySub[s];
        if (arr && arr.length) out.push(arr.splice(Math.floor(rng() * arr.length), 1)[0]);
      }
      if (subs.every(s => !bySub[s].length)) break;
    }
    return out;
  }

  // ── Convenience for the games (reads live globals) ──
  function pickForGame(gameKey, count, extra) {
    const c = context(gameKey);
    const locked = new Set(c.restrictions.lockedChapters || []);
    const adminBlocks = (typeof _adminBlocksChapter === 'function') ? _adminBlocksChapter : () => false;
    const questions = (typeof STATIC_QUESTIONS !== 'undefined' ? STATIC_QUESTIONS : []);
    const allPacks = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : []).filter(p => !p.comingSoon);
    const pool = buildPool({
      questions, packs: allPacks, grade: c.grade,
      excludeChapter: id => locked.has(id) || adminBlocks(id),
      safe: extra && extra.safe, minOptions: c.caps ? c.caps.minOptions : 2,
      crossGrade: !!c.restrictions.crossGradePractice,
    });
    const games = (typeof DB !== 'undefined' && DB && DB.games) || {};
    const res = pick(Object.assign({
      count, pool, settings: c.settings, cap: c.cap, caps: c.caps,
      progress: (typeof DB !== 'undefined' && DB && DB.chapters) || {},
      recent: games.recent || [], adaptiveLevel: adaptiveLevel(c.cap),
    }, extra || {}));
    res.context = c;
    res.loaded = questions.length;
    if (res.warnings.length) console.warn(`[GameSettings] ${gameKey}: ${res.warnings.length} slot(s) fell back to another included subject`, res.warnings.slice(0, 5));
    return res;
  }

  // ── Recent questions + adaptive level (in DB.games; saved with the bests) ──
  function markUsed(ids) {
    if (typeof DB === 'undefined' || !DB) return;
    DB.games = DB.games || {};
    const cur = Array.isArray(DB.games.recent) ? DB.games.recent : [];
    const next = cur.concat((ids || []).filter(Boolean));
    DB.games.recent = next.slice(-RECENT_KEEP);
  }
  function adaptiveLevel(cap) {
    const a = (typeof DB !== 'undefined' && DB && DB.games && DB.games.adaptive) || {};
    return Math.min(cap || 4, Math.max(1, a.level || 2));
  }
  // +1 after three correct in a row, −1 after two wrong in a row, within cap.
  function adaptiveAnswer(correct, cap) {
    if (typeof DB === 'undefined' || !DB) return;
    DB.games = DB.games || {};
    const a = DB.games.adaptive = Object.assign({ level: 2, up: 0, down: 0 }, DB.games.adaptive || {});
    const top = Math.min(4, Math.max(1, cap || 4));
    if (correct) { a.up++; a.down = 0; if (a.up >= 3) { a.level = Math.min(top, a.level + 1); a.up = 0; } }
    else { a.down++; a.up = 0; if (a.down >= 2) { a.level = Math.max(1, a.level - 1); a.down = 0; } }
    a.level = Math.min(top, Math.max(1, a.level));
    return a.level;
  }

  // ── Parent card ──────────────────────────────
  let _open = false, _draft = null, _forId = null, _status = '';

  function _saveable() { return typeof Auth !== 'undefined' && typeof Auth.saveGameSettings === 'function'; }

  function renderParentCard(acct) {
    const host = $('pd-game-settings');
    if (!host) return;
    const id = (acct && acct.id) || null;
    if (id !== _forId) { _forId = id; _open = false; _draft = null; _status = ''; }
    const grade = (acct && acct.grade) || 5;
    const packs = gradePacks(grade);
    const available = availableSubjects(packs);
    const restrictions = (typeof DB !== 'undefined' && DB && DB.restrictions) || {};
    const saved = normalise(restrictions.games, available.map(a => a.key));
    if (!_open) {
      host.innerHTML = `
        <div class="gs-summary" id="gs-summary">${esc(summary(saved, available))}</div>
        <button type="button" class="gs-btn gs-btn-open" onclick="GameSettings.openCard()">Customise games</button>`;
      return;
    }
    if (!_draft) _draft = JSON.parse(JSON.stringify(saved));
    const d = _draft;
    const pct = k => (d.percents && d.percents[k]) || 0;
    const roundGames = gamesWhere('supportsRoundLength').map(g => g.name).join(' and ');
    const mixGames = gamesWhere('supportsSubjectMix').map(g => g.name).join(', ');
    const gkGames = gamesWhere('supportsGeneralKnowledge').map(g => g.name).join(', ');
    host.innerHTML = `
      <div class="gs-panel" role="group" aria-labelledby="gs-title">
        <div class="gs-lead" id="gs-title">Choose what your child practises while playing.</div>

        <fieldset class="gs-section">
          <legend class="gs-h">1 · Question mix</legend>
          <div class="gs-cards">${Object.keys(MODES).map(m => `
            <label class="gs-card ${d.mode === m ? 'on' : ''}">
              <input type="radio" name="gs-mode" value="${m}" ${d.mode === m ? 'checked' : ''} onchange="GameSettings.setMode('${m}')">
              <span class="gs-card-mark" aria-hidden="true">${d.mode === m ? '✓' : ''}</span>
              <span class="gs-card-body"><b>${MODES[m].label}</b><span>${MODES[m].desc}</span></span>
            </label>`).join('')}
          </div>
          <p class="gs-note">${MODES.balanced.hint}</p>
        </fieldset>

        <fieldset class="gs-section">
          <legend class="gs-h">2 · Included subjects</legend>
          <p class="gs-note">Quiz games will only use questions from the subjects you select. Games will never use a subject you turn off.</p>
          <div class="gs-cards gs-cards-2">${available.map(s => { const on = d.subjects.includes(s.key); return `
            <label class="gs-card ${on ? 'on' : ''}">
              <input type="checkbox" value="${s.key}" ${on ? 'checked' : ''} onchange="GameSettings.toggleSubject('${s.key}')">
              <span class="gs-card-mark" aria-hidden="true">${on ? '✓' : ''}</span>
              <span class="gs-card-body"><b>${s.icon} ${esc(s.label)}</b><span>${on ? 'Included' : 'Not used in games'}</span></span>
            </label>`; }).join('')}
          </div>
          <p class="gs-note gs-warn ${_status === 'last' ? '' : 'hidden'}" id="gs-last-subject" role="status">Keep at least one subject on - games need something to ask about.</p>
        </fieldset>

        <fieldset class="gs-section ${d.mode === 'custom' ? '' : 'hidden'}" id="gs-percents">
          <legend class="gs-h">3 · How much of each subject</legend>
          <p class="gs-note">Move a slider and the others adjust so the total always stays at 100%.</p>
          ${d.subjects.map(k => { const s = SUBJECT_BY_KEY[k]; return `
            <div class="gs-row">
              <label class="gs-row-label" for="gs-pct-${k}">${s.icon} ${esc(s.label)}</label>
              <input type="range" id="gs-pct-${k}" min="0" max="100" step="5" value="${pct(k)}"
                aria-label="${esc(s.label)} share of questions" aria-valuetext="${pct(k)}%"
                oninput="GameSettings.setPercent('${k}', this.value)">
              <output class="gs-row-val" id="gs-pct-val-${k}" for="gs-pct-${k}">${pct(k)}%</output>
            </div>`; }).join('')}
          <div class="gs-row gs-row-total"><span>Total</span><b id="gs-pct-total">${d.subjects.reduce((a, k) => a + pct(k), 0)}%</b>
            <button type="button" class="gs-btn gs-btn-sm" onclick="GameSettings.balance()">Balance equally</button></div>
        </fieldset>

        <fieldset class="gs-section">
          <legend class="gs-h">${d.mode === 'custom' ? 4 : 3} · Difficulty</legend>
          <div class="gs-cards gs-cards-2">${Object.keys(DIFFICULTY).map(k => `
            <label class="gs-card ${d.difficulty === k ? 'on' : ''}">
              <input type="radio" name="gs-diff" value="${k}" ${d.difficulty === k ? 'checked' : ''} onchange="GameSettings.setDifficulty('${k}')">
              <span class="gs-card-mark" aria-hidden="true">${d.difficulty === k ? '✓' : ''}</span>
              <span class="gs-card-body"><b>${DIFFICULTY[k].label}</b><span>${DIFFICULTY[k].desc}</span></span>
            </label>`).join('')}
          </div>
          <p class="gs-note">Games never go above the Question Difficulty Cap set above.</p>
        </fieldset>

        <fieldset class="gs-section">
          <legend class="gs-h">${d.mode === 'custom' ? 5 : 4} · Round length</legend>
          <div class="gs-cards gs-cards-2">${ROUND_LENGTHS.map(o => `
            <label class="gs-card ${d.roundLength === o.n ? 'on' : ''}">
              <input type="radio" name="gs-round" value="${o.n}" ${d.roundLength === o.n ? 'checked' : ''} onchange="GameSettings.setRound(${o.n})">
              <span class="gs-card-mark" aria-hidden="true">${d.roundLength === o.n ? '✓' : ''}</span>
              <span class="gs-card-body"><b>${o.n} questions</b><span>${o.label}</span></span>
            </label>`).join('')}
          </div>
          <p class="gs-note">Applies to ${esc(roundGames)}. Timed and ladder games keep their own length.</p>
        </fieldset>

        <fieldset class="gs-section">
          <legend class="gs-h">${d.mode === 'custom' ? 6 : 5} · Learning focus</legend>
          ${_toggle('gs-weak-subj', 'Focus on weak subjects', 'More questions from the subjects your child finds hardest', d.mode === 'weak', "GameSettings.toggleFlag('weakSubjects')")}
          ${_toggle('gs-weak-ch', 'Focus on weak chapters', 'Inside each subject, lean towards chapters with lower scores', d.weakChapters, "GameSettings.toggleFlag('weakChapters')")}
          ${_toggle('gs-recent', 'Avoid questions answered recently', 'Prefer questions your child has not seen in recent games', d.avoidRecent, "GameSettings.toggleFlag('avoidRecent')")}
          ${_toggle('gs-gk', 'Include general-knowledge bonus questions', 'Beyond-the-book questions in ' + esc(gkGames) + ' only, from the subjects you selected', d.generalKnowledge, "GameSettings.toggleFlag('generalKnowledge')")}
        </fieldset>

        <details class="gs-which">
          <summary>Which games use these settings?</summary>
          <ul>${Object.values(GAMES).map(g => `<li><b>${g.icon} ${esc(g.name)}</b> - ${esc(_appliesText(g))}</li>`).join('')}</ul>
        </details>

        <div class="gs-actions">
          <button type="button" class="gs-btn gs-btn-primary" id="gs-save" onclick="GameSettings.save()">Save settings</button>
          <button type="button" class="gs-btn" onclick="GameSettings.cancel()">Cancel</button>
          <span class="gs-status" id="gs-status" role="status">${_status === 'error' ? 'Not saved - check your connection and try again.' : _status === 'saving' ? 'Saving…' : ''}</span>
        </div>
      </div>`;
  }
  function _toggle(id, label, desc, on, handler) {
    return `<label class="gs-toggle">
      <span class="gs-toggle-text"><b>${label}</b><span>${desc}</span></span>
      <input type="checkbox" id="${id}" ${on ? 'checked' : ''} onchange="${handler}">
      <span class="gs-switch" aria-hidden="true"></span><span class="gs-onoff" aria-hidden="true">${on ? 'On' : 'Off'}</span>
    </label>`;
  }
  function _appliesText(g) {
    const bits = [];
    if (g.supportsSubjectMix) bits.push('subject choice and mix');
    if (g.supportsDifficulty) bits.push('difficulty');
    if (g.supportsRoundLength) bits.push('round length');
    if (g.supportsWeakTopics) bits.push('weak-area focus');
    if (g.supportsRecentAvoidance) bits.push('avoiding recent questions');
    if (g.supportsGeneralKnowledge) bits.push('general-knowledge bonus');
    if (!bits.length) return 'no question settings apply (' + (g.kind === 'none' ? 'its own puzzles and places' : 'its own bank') + ')';
    return bits.join(', ') + (g.kind === 'single' ? ' (single-subject game)' : '');
  }

  const _rerender = () => renderParentCard(typeof Auth !== 'undefined' && Auth.getActiveAccount ? (Auth.getActiveAccount() || {}) : {});
  function openCard() { _open = true; _status = ''; _rerender(); setTimeout(() => { const f = document.querySelector('#pd-game-settings input'); if (f) f.focus(); }, 0); }
  function cancel() { _open = false; _draft = null; _status = ''; _rerender(); }
  function setMode(m) {
    if (!_draft || !MODES[m]) return;
    _draft.mode = m; _status = '';
    if (m === 'custom' && !_draft.percents) _draft.percents = equalSplit(_draft.subjects);
    _rerender();
  }
  function toggleSubject(k) {
    if (!_draft) return;
    const on = _draft.subjects.includes(k);
    if (on && _draft.subjects.length === 1) { _status = 'last'; _rerender(); return; }
    _status = '';
    _draft.subjects = SUBJECTS.map(s => s.key).filter(x => on ? (_draft.subjects.includes(x) && x !== k) : (_draft.subjects.includes(x) || x === k));
    if (_draft.percents) {
      const kept = {}; _draft.subjects.forEach(x => { kept[x] = _draft.percents[x] || 0; });
      _draft.percents = Object.values(kept).some(v => v > 0) ? allocate(100, kept) : equalSplit(_draft.subjects);
    }
    _rerender();
  }
  function setPercent(k, v) {
    if (!_draft) return;
    _draft.percents = rebalance(_draft.percents || {}, k, v, _draft.subjects);
    // In-place update keeps the slider under the parent's finger.
    _draft.subjects.forEach(x => {
      const r = $('gs-pct-' + x), o = $('gs-pct-val-' + x);
      if (r && x !== k) r.value = _draft.percents[x];
      if (r) r.setAttribute('aria-valuetext', _draft.percents[x] + '%');
      if (o) o.textContent = _draft.percents[x] + '%';
    });
    const t = $('gs-pct-total'); if (t) t.textContent = _draft.subjects.reduce((a, x) => a + _draft.percents[x], 0) + '%';
  }
  function balance() { if (!_draft) return; _draft.percents = equalSplit(_draft.subjects); _rerender(); }
  function setDifficulty(k) { if (_draft && DIFFICULTY[k]) { _draft.difficulty = k; _rerender(); } }
  function setRound(n) { if (_draft && ROUND_LENGTHS.some(o => o.n === n)) { _draft.roundLength = n; _rerender(); } }
  function toggleFlag(flag) {
    if (!_draft) return;
    if (flag === 'weakSubjects') _draft.mode = _draft.mode === 'weak' ? 'balanced' : 'weak';
    else _draft[flag] = !_draft[flag];
    _rerender();
  }
  async function save() {
    if (!_draft) return;
    if (!_saveable()) { _status = 'error'; _rerender(); return; }
    _status = 'saving'; _rerender();
    const btn = $('gs-save'); if (btn) btn.disabled = true;
    const ok = await Auth.saveGameSettings(JSON.parse(JSON.stringify(_draft)));
    if (ok) { _open = false; _draft = null; _status = ''; }
    else _status = 'error';
    _rerender();
  }

  // ── Child-facing one-liner for the Game Zone hub ──
  function childSummaryLine() {
    try { const c = context('quickfire'); return c.available.length ? childSummary(c.settings, c.available) : ''; }
    catch (_) { return ''; }
  }

  return {
    SUBJECTS, MODES, DIFFICULTY, ROUND_LENGTHS, DEFAULTS, GAMES, NO_QUESTIONS_MSG,
    allocate, equalSplit, rebalance, normalise, capLevel, summary, childSummary,
    subjectKeyOf, gradePacks, availableSubjects, isValidMCQ, buildPool, levelPlan, spread,
    pick, pickGeneralKnowledge, pickForGame, context, markUsed, adaptiveLevel, adaptiveAnswer,
    renderParentCard, openCard, cancel, setMode, toggleSubject, setPercent, balance,
    setDifficulty, setRound, toggleFlag, save, childSummaryLine,
    _debug: () => ({ open: _open, draft: _draft, forId: _forId, status: _status }),
  };
})();
