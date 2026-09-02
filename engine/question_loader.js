'use strict';
// ══════════════════════════════════════════════
//  Question Loader
//  Production (Netlify):  fetches from /.netlify/functions/questions
//                         so the raw JS files never reach the browser.
//  Local dev (file://):   dynamically injects the question <script> tags
//                         so you can test without running a server.
//  Local dev (netlify dev / localhost:8888): uses the function - same as prod.
// ══════════════════════════════════════════════

const QuestionLoader = (() => {
  const _done = new Set();

  // file:// → local development without any server
  const _isFileProtocol = location.protocol === 'file:';

  // Question file paths per subject - only used in file:// mode.
  //
  // ⚠ HAND-MAINTAINED AND PRONE TO DRIFT. Production auto-discovers every file
  //   in subjects/<id>/questions/ via the Netlify function, so a file missing
  //   from this list works in prod but is silently invisible under file://.
  //   This list had drifted for 4 packs (8 chapters) before it was corrected.
  //
  // ✅ RECOMMENDED: don't use file:// at all. Run `netlify dev` and you get the
  //   same auto-discovering /.netlify/functions/questions endpoint as
  //   production, and this list is bypassed entirely. Keep it only as a
  //   zero-tooling fallback.
  //
  //   To check for drift:
  //     compare `ls subjects/*/questions/*.js` against the entries below.
  const LOCAL_FILES = {
    // ── Placeholder packs (comingSoon: true) ──────────────────────────────
    // Listed for completeness only. loadForStudent() filters comingSoon packs
    // out before it gets here, so nothing below is ever fetched for a child;
    // the entries exist so this list matches `ls subjects/*/questions/*.js`
    // and the drift check in the comment above stays usable.
    'grade1-maths': ['subjects/grade1-maths/questions/ch01_sample.js'],
    'grade1-english': ['subjects/grade1-english/questions/ch01_sample.js'],
    'grade1-french': ['subjects/grade1-french/questions/ch01_sample.js'],
    'grade1-science': ['subjects/grade1-science/questions/ch01_sample.js'],
    'grade1-history': ['subjects/grade1-history/questions/ch01_sample.js'],
    'grade2-maths': ['subjects/grade2-maths/questions/ch01_sample.js'],
    'grade2-english': ['subjects/grade2-english/questions/ch01_sample.js'],
    'grade2-french': ['subjects/grade2-french/questions/ch01_sample.js'],
    'grade2-science': ['subjects/grade2-science/questions/ch01_sample.js'],
    'grade2-history': ['subjects/grade2-history/questions/ch01_sample.js'],
    'grade3-maths': ['subjects/grade3-maths/questions/ch01_sample.js'],
    'grade3-english': ['subjects/grade3-english/questions/ch01_sample.js'],
    'grade3-french': ['subjects/grade3-french/questions/ch01_sample.js'],
    'grade3-science': ['subjects/grade3-science/questions/ch01_sample.js'],
    'grade3-history': ['subjects/grade3-history/questions/ch01_sample.js'],
    'grade7-maths': ['subjects/grade7-maths/questions/ch01_sample.js'],
    'grade7-english': ['subjects/grade7-english/questions/ch01_sample.js'],
    'grade7-french': ['subjects/grade7-french/questions/ch01_sample.js'],
    'grade7-science': ['subjects/grade7-science/questions/ch01_sample.js'],
    'grade7-history': ['subjects/grade7-history/questions/ch01_sample.js'],
    'grade8-maths': ['subjects/grade8-maths/questions/ch01_sample.js'],
    'grade8-english': ['subjects/grade8-english/questions/ch01_sample.js'],
    'grade8-french': ['subjects/grade8-french/questions/ch01_sample.js'],
    'grade8-science': ['subjects/grade8-science/questions/ch01_sample.js'],
    'grade8-history': ['subjects/grade8-history/questions/ch01_sample.js'],
    'grade9-maths': ['subjects/grade9-maths/questions/ch01_sample.js'],
    'grade9-english': ['subjects/grade9-english/questions/ch01_sample.js'],
    'grade9-french': ['subjects/grade9-french/questions/ch01_sample.js'],
    'grade9-science': ['subjects/grade9-science/questions/ch01_sample.js'],
    'grade9-history': ['subjects/grade9-history/questions/ch01_sample.js'],
    'grade5-maths': [
      'subjects/grade5-maths/questions/core.js',
      'subjects/grade5-maths/questions/questions_extra.js',
      'subjects/grade5-maths/questions/questions_diverse.js',
      'subjects/grade5-maths/questions/questions_conversions.js',
      'subjects/grade5-maths/questions/questions_wordproblems.js',
      'subjects/grade5-maths/questions/questions_examstyle.js',
      'subjects/grade5-maths/questions/questions_subsections.js',
      'subjects/grade5-maths/questions/questions_challenge.js',
      'subjects/grade5-maths/questions/questions_challenge2.js',
      'subjects/grade5-maths/questions/questions_audit.js',
      'subjects/grade5-maths/questions/illustrated_diagrams.js',
      'subjects/grade5-maths/questions/reasoning_word_problems.js',
      'subjects/grade5-maths/questions/extended_reasoning_bank.js',
    ],
    'grade5-french': [
      'subjects/grade5-french/questions/ch01_vocabulaire.js',
      'subjects/grade5-french/questions/ch02_noms.js',
      'subjects/grade5-french/questions/ch03_verbes_present.js',
      'subjects/grade5-french/questions/ch04_adjectifs.js',
      'subjects/grade5-french/questions/ch05_passe_compose.js',
      'subjects/grade5-french/questions/ch06_pronoms.js',
      'subjects/grade5-french/questions/ch07_lecture.js',
      'subjects/grade5-french/questions/ch08_grammaire.js',
      'subjects/grade5-french/questions/ch09_passe_simple.js',
      'subjects/grade5-french/questions/ch10_subjonctif.js',
      'subjects/grade5-french/questions/ch11_textes.js',
      'subjects/grade5-french/questions/ch12_images.js',
      'subjects/grade5-french/questions/extended_practice_bank.js',
    ],
    'grade5-english': [
      'subjects/grade5-english/questions/ch01_nouns.js',
      'subjects/grade5-english/questions/ch02_verbs.js',
      'subjects/grade5-english/questions/ch03_adjectives.js',
      'subjects/grade5-english/questions/ch04_sentences.js',
      'subjects/grade5-english/questions/ch05_comprehension.js',
      'subjects/grade5-english/questions/ch06_writing.js',
      'subjects/grade5-english/questions/ch07_vocabulary.js',
      'subjects/grade5-english/questions/ch08_spelling.js',
      'subjects/grade5-english/questions/ch09_passages.js',
      'subjects/grade5-english/questions/topup_g5_english.js',
    ],
    'grade5-science': [
      'subjects/grade5-science/questions/ch02_plants.js',
      'subjects/grade5-science/questions/ch03_animals.js',
      'subjects/grade5-science/questions/ch04_energy.js',
      'subjects/grade5-science/questions/ch05_water_matter.js',
      'subjects/grade5-science/questions/ch06_electricity.js',
      'subjects/grade5-science/questions/ch09_conservation.js',
      // @enrichment - bonus content, derived from syllabus
      'subjects/grade5-science/questions/enrichment_g5sci_endemic.js',
      'subjects/grade5-science/questions/enrichment_g5sci_energy.js',
      // past papers
      'subjects/grade5-science/questions/past_paper_2024.js',
      'subjects/grade5-science/questions/past_paper_2023.js',
      'subjects/grade5-science/questions/past_paper_2022.js',
      'subjects/grade5-science/questions/past_paper_2021.js',
      'subjects/grade5-science/questions/past_paper_2020.js',
      'subjects/grade5-science/questions/past_paper_2019.js',
      'subjects/grade5-science/questions/past_paper_2018.js',
      'subjects/grade5-science/questions/past_paper_2017.js',
      'subjects/grade5-science/questions/past_paper_2016.js',
      // top-up
      'subjects/grade5-science/questions/topup_g5_science.js',
    ],
    'grade5-history': [
      'subjects/grade5-history/questions/ch01_discovery.js',
      'subjects/grade5-history/questions/ch02_settlement.js',
      'subjects/grade5-history/questions/ch03_trade_agri.js',
      'subjects/grade5-history/questions/ch04_port_louis.js',
      'subjects/grade5-history/questions/ch05_natural_env.js',
      'subjects/grade5-history/questions/ch06_volcanism.js',
      'subjects/grade5-history/questions/ch07_env_problems.js',
      'subjects/grade5-history/questions/ch08_map_skills.js',
      'subjects/grade5-history/questions/ch09_g5_weather.js',
      // @enrichment - bonus content, derived from syllabus
      'subjects/grade5-history/questions/enrichment_g5_personalities.js',
      'subjects/grade5-history/questions/enrichment_g5_landmarks.js',
      'subjects/grade5-history/questions/enrichment_g5_world.js',
      // past papers
      'subjects/grade5-history/questions/past_paper_2024.js',
      'subjects/grade5-history/questions/past_paper_2023.js',
      'subjects/grade5-history/questions/past_paper_2022.js',
      'subjects/grade5-history/questions/past_paper_2021.js',
      'subjects/grade5-history/questions/past_paper_2020.js',
      // top-up
      'subjects/grade5-history/questions/topup_g5_history.js',
    ],
    'grade6-science': [
      'subjects/grade6-science/questions/ch01_g6_air.js',
      'subjects/grade6-science/questions/ch02_g6_materials.js',
      'subjects/grade6-science/questions/ch03_g6_animals.js',
      'subjects/grade6-science/questions/ch04_g6_plants.js',
      'subjects/grade6-science/questions/ch05_g6_energy.js',
      'subjects/grade6-science/questions/ch06_g6_ecosystems.js',
      'subjects/grade6-science/questions/ch07_g6_conservation.js',
      'subjects/grade6-science/questions/ch08_g6_solar.js',
      // @enrichment - bonus content, derived from syllabus
      'subjects/grade6-science/questions/enrichment_g6sci_ecosystems.js',
      'subjects/grade6-science/questions/enrichment_g6sci_solar.js',
      // past papers
      'subjects/grade6-science/questions/past_paper_2024.js',
      'subjects/grade6-science/questions/past_paper_2023.js',
      'subjects/grade6-science/questions/past_paper_2022.js',
      'subjects/grade6-science/questions/past_paper_2021.js',
      'subjects/grade6-science/questions/past_paper_2019.js',
      // top-up
      'subjects/grade6-science/questions/topup_g6_science.js',
    ],
    'grade6-history': [
      'subjects/grade6-history/questions/ch01_g6_slaves_immigrants.js',
      'subjects/grade6-history/questions/ch02_g6_independence.js',
      'subjects/grade6-history/questions/ch03_g6_cultural_heritage.js',
      'subjects/grade6-history/questions/ch04_g6_land_use.js',
      'subjects/grade6-history/questions/ch05_g6_natural_hazards.js',
      'subjects/grade6-history/questions/ch07_g6_map_skills.js',
      // @enrichment - bonus content, derived from syllabus
      'subjects/grade6-history/questions/enrichment_g6_personalities.js',
      'subjects/grade6-history/questions/enrichment_g6_symbols.js',
      'subjects/grade6-history/questions/enrichment_g6_world.js',
      // past papers
      'subjects/grade6-history/questions/past_paper_2024.js',
      'subjects/grade6-history/questions/past_paper_2023.js',
      'subjects/grade6-history/questions/past_paper_2022.js',
      'subjects/grade6-history/questions/past_paper_2021.js',
      'subjects/grade6-history/questions/past_paper_2019.js',
      // top-up
      'subjects/grade6-history/questions/topup_g6_history.js',
    ],
    'grade6-maths': [
      'subjects/grade6-maths/questions/ch01_g6_numeration.js',
      'subjects/grade6-maths/questions/ch02_g6_four_ops.js',
      'subjects/grade6-maths/questions/ch03_g6_fractions.js',
      'subjects/grade6-maths/questions/ch04_g6_decimals.js',
      'subjects/grade6-maths/questions/ch05_g6_factors_hcf.js',
      'subjects/grade6-maths/questions/ch06_g6_ratio_pct.js',
      'subjects/grade6-maths/questions/ch07_g6_geometry.js',
      'subjects/grade6-maths/questions/ch08_g6_measure.js',
      'subjects/grade6-maths/questions/ch09_g6_area_vol.js',
      'subjects/grade6-maths/questions/ch10_g6_time_speed.js',
      'subjects/grade6-maths/questions/ch11_g6_graphs.js',
      // past papers
      'subjects/grade6-maths/questions/past_paper_2024.js',
      'subjects/grade6-maths/questions/past_paper_2023.js',
      'subjects/grade6-maths/questions/past_paper_2022.js',
      'subjects/grade6-maths/questions/past_paper_2021.js',
      'subjects/grade6-maths/questions/past_paper_2019.js',
      // top-up
      'subjects/grade6-maths/questions/topup_g6_maths.js',
      'subjects/grade6-maths/questions/reasoning_word_problems.js',
      'subjects/grade6-maths/questions/extended_reasoning_bank.js',
    ],
    'grade6-english': [
      'subjects/grade6-english/questions/ch01_nouns.js',
      'subjects/grade6-english/questions/ch02_verbs.js',
      'subjects/grade6-english/questions/ch03_clauses.js',
      'subjects/grade6-english/questions/ch04_comprehension.js',
      'subjects/grade6-english/questions/ch05_writing.js',
      'subjects/grade6-english/questions/ch06_vocabulary.js',
      'subjects/grade6-english/questions/ch07_g6_passages.js',
      // past papers
      'subjects/grade6-english/questions/past_paper_2024.js',
      'subjects/grade6-english/questions/past_paper_2023.js',
      'subjects/grade6-english/questions/past_paper_2022.js',
      'subjects/grade6-english/questions/past_paper_2021.js',
      'subjects/grade6-english/questions/past_paper_2019.js',
      // top-up
      'subjects/grade6-english/questions/topup_g6_english.js',
    ],
    'grade6-french': [
      'subjects/grade6-french/questions/ch01_imparfait.js',
      'subjects/grade6-french/questions/ch02_futur.js',
      'subjects/grade6-french/questions/ch03_subordonnees.js',
      'subjects/grade6-french/questions/ch04_subjunctif.js',
      'subjects/grade6-french/questions/ch05_argumentation.js',
      'subjects/grade6-french/questions/ch06_lecture.js',
      'subjects/grade6-french/questions/ch07_conditionnel.js',
      'subjects/grade6-french/questions/ch08_pqp.js',
      'subjects/grade6-french/questions/ch09_g6_textes.js',
      'subjects/grade6-french/questions/ch10_g6_images.js',
      'subjects/grade6-french/questions/extended_practice_bank.js',
      // past papers
      'subjects/grade6-french/questions/past_paper_2024.js',
      'subjects/grade6-french/questions/past_paper_2023.js',
      'subjects/grade6-french/questions/past_paper_2022.js',
      'subjects/grade6-french/questions/past_paper_2021.js',
      'subjects/grade6-french/questions/past_paper_2019.js',
    ],
    'grade4-maths': [
      'subjects/grade4-maths/questions/ch01_g4_numeration.js',
      'subjects/grade4-maths/questions/ch02_g4_four_ops.js',
      'subjects/grade4-maths/questions/ch03_g4_fractions.js',
      'subjects/grade4-maths/questions/ch04_g4_geometry.js',
      'subjects/grade4-maths/questions/ch05_g4_measures.js',
      'subjects/grade4-maths/questions/ch06_g4_data.js',
      // top-up
      'subjects/grade4-maths/questions/topup_g4_maths.js',
    ],
    'grade4-english': [
      'subjects/grade4-english/questions/ch01_g4_nouns.js',
      'subjects/grade4-english/questions/ch02_g4_verbs.js',
      'subjects/grade4-english/questions/ch03_g4_adjectives.js',
      'subjects/grade4-english/questions/ch04_g4_sentences.js',
      'subjects/grade4-english/questions/ch05_g4_comprehension.js',
      'subjects/grade4-english/questions/ch06_g4_vocabulary.js',
      'subjects/grade4-english/questions/ch07_g4_passages.js',
      // top-up
      'subjects/grade4-english/questions/topup_g4_english.js',
      'subjects/grade4-english/questions/coverage_articles.js',
      'subjects/grade4-english/questions/coverage_nouns.js',
      'subjects/grade4-english/questions/coverage_verbs.js',
      'subjects/grade4-english/questions/coverage_adjectives_sentences.js',
      'subjects/grade4-english/questions/coverage_comprehension.js',
    ],
    'grade4-science': [
      'subjects/grade4-science/questions/ch01_g4_living_things.js',
      'subjects/grade4-science/questions/ch02_g4_plants.js',
      'subjects/grade4-science/questions/ch03_g4_animals.js',
      'subjects/grade4-science/questions/ch04_g4_air.js',
      'subjects/grade4-science/questions/ch05_g4_water.js',
      'subjects/grade4-science/questions/ch06_g4_materials.js',
      'subjects/grade4-science/questions/ch07_g4_energy.js',
      'subjects/grade4-science/questions/ch08_g4_protection.js',
      // @enrichment — bonus content, derived from syllabus
      'subjects/grade4-science/questions/enrichment_g4sci_animals.js',
      'subjects/grade4-science/questions/enrichment_g4sci_equipment.js',
      // top-up
      'subjects/grade4-science/questions/topup_g4_science.js',
    ],
    'grade4-french': [
      'subjects/grade4-french/questions/ch01_g4_vocabulaire.js',
      'subjects/grade4-french/questions/ch02_g4_noms.js',
      'subjects/grade4-french/questions/ch03_g4_verbes.js',
      'subjects/grade4-french/questions/ch04_g4_adjectifs.js',
      'subjects/grade4-french/questions/ch05_g4_phrase.js',
      'subjects/grade4-french/questions/ch06_g4_lecture.js',
      'subjects/grade4-french/questions/ch07_g4_passe_compose.js',
      'subjects/grade4-french/questions/ch08_g4_imparfait.js',
      'subjects/grade4-french/questions/ch09_g4_textes.js',
      'subjects/grade4-french/questions/ch10_g4_images.js',
      // top-up
      'subjects/grade4-french/questions/topup_g4_french.js',
      'subjects/grade4-french/questions/extended_practice_bank.js',
      'subjects/grade4-french/questions/image_photo_activities.js',
    ],
    'grade4-history': [
      'subjects/grade4-history/questions/ch01_g4_locality.js',
      'subjects/grade4-history/questions/ch02_g4_community.js',
      'subjects/grade4-history/questions/ch03_g4_voyages.js',
      'subjects/grade4-history/questions/ch04_g4_natural_env.js',
      'subjects/grade4-history/questions/ch05_g4_weather.js',
      'subjects/grade4-history/questions/ch06_g4_map_skills.js',
      // @enrichment - bonus content, derived from syllabus
      'subjects/grade4-history/questions/enrichment_g4_explorers.js',
      'subjects/grade4-history/questions/enrichment_g4_mauritius.js',
      'subjects/grade4-history/questions/enrichment_g4_world.js',
      // top-up
      'subjects/grade4-history/questions/topup_g4_history.js',
    ],
  };

  function _injectScript(src) {
    return new Promise(resolve => {
      const s   = document.createElement('script');
      s.src     = src;
      s.onload  = resolve;
      s.onerror = resolve; // silently ignore missing files
      document.head.appendChild(s);
    });
  }

  async function _loadLocal(subjectId) {
    const files = LOCAL_FILES[subjectId] || [];
    for (const f of files) await _injectScript(f);
  }

  const _CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

  // ⚠ BUMP THIS whenever question files are added or edited.
  //   Without it, the 7-day cache below means a child keeps being served the
  //   old question set for up to a week after a deploy - new chapters simply
  //   do not appear, with nothing in the UI to explain why.
  const _CACHE_VERSION = 14;
  const _cacheKey = subjectId => `mm_qc_v${_CACHE_VERSION}_${subjectId}`;

  // Drop caches written by any earlier version, so a bump reclaims the space
  // instead of leaving a dead copy of every subject behind.
  (function _purgeStaleCaches() {
    try {
      const keep = `mm_qc_v${_CACHE_VERSION}_`;
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.startsWith('mm_qc_') && !k.startsWith(keep)) localStorage.removeItem(k);
      }
    } catch {}
  })();

  // ── Cache pressure ────────────────────────────────────────────────────
  // A subject bundle is ~272 KB and the largest is 473 KB; one grade's five
  // subjects is up to 1.66 MB, and all three grades is 4.3 MB against a
  // ~5 MB localStorage quota. Cross-grade practice is a real feature, so a
  // child CAN reach the ceiling.
  //
  // Before this, every write was `catch {}` with no eviction, so hitting the
  // quota failed silently and stayed failed. Two consequences, neither visible:
  // every subject load refetched ~272 KB for ever, and — worse — the writes
  // that lose the race are whatever runs next, including
  // Store.saveStudentSession(). That one is also try/caught, so the token stays
  // installed on the live page and the child only discovers the session was
  // never persisted when they reload and land back on the PIN screen.
  //
  // ⚠ This cache is now the ONLY offline copy of the questions. The service
  // worker used to cache /functions/questions too, and deliberately no longer
  // does — that response varies per caller and a shared URL-keyed cache served
  // one child's entitled question set to another. So this is load-bearing.
  const _LRU_KEY  = 'mm_qc_lru';
  // Six subjects covers one full grade (five) with room to spare, and keeps the
  // cache near 1.6 MB rather than 4.3 MB. A seventh evicts the least recently
  // used, which is exactly the cross-grade case.
  const _LRU_MAX  = 6;

  function _lruRead() {
    try { return JSON.parse(localStorage.getItem(_LRU_KEY)) || {}; } catch { return {}; }
  }
  // Written on every cache HIT, so recency reflects USE, not write time. Kept in
  // its own tiny key (a few hundred bytes) rather than by rewriting the cached
  // envelope, which would mean re-serialising ~272 KB just to record a read.
  //
  // ⚠ A MONOTONIC COUNTER, not Date.now(). Timestamps looked obvious and were
  // wrong: several subjects are cached inside the same millisecond by
  // _loadBatchForGrade (it writes all five of a grade's subjects in one pass),
  // so they all recorded an identical time and the sort below had no way to
  // order them. Eviction then picked arbitrarily among the tied entries — which
  // showed up as a test that passed twice and failed the third time. A counter
  // gives a strict total order and does not care about clock resolution.
  function _lruTouch(subjectId) {
    try {
      const m = _lruRead();
      const vals = Object.values(m).filter(v => typeof v === 'number');
      m[subjectId] = (vals.length ? Math.max(...vals) : 0) + 1;
      // Forget subjects that are no longer cached, so the index cannot grow
      // without bound across _CACHE_VERSION bumps.
      for (const k of Object.keys(m)) {
        if (k !== subjectId && localStorage.getItem(_cacheKey(k)) === null) delete m[k];
      }
      localStorage.setItem(_LRU_KEY, JSON.stringify(m));
    } catch {}
  }
  function _lruForget(subjectId) {
    try {
      const m = _lruRead();
      if (subjectId in m) { delete m[subjectId]; localStorage.setItem(_LRU_KEY, JSON.stringify(m)); }
    } catch {}
  }

  // Cached subject ids, least recently used first. Anything cached but missing
  // from the index is treated as oldest — it was written before the index
  // existed, so it is the right thing to drop first.
  function _cachedSubjectsLRUFirst(exclude) {
    const ids = [];
    try {
      const prefix = `mm_qc_v${_CACHE_VERSION}_`;
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(prefix)) ids.push(k.slice(prefix.length));
      }
    } catch { return []; }
    const m = _lruRead();
    return ids.filter(id => id !== exclude).sort((a, b) => (m[a] || 0) - (m[b] || 0));
  }

  // Only ever removes THIS cache's own keys. Never touches the session, the
  // progress copy, or anything else sharing the origin's quota.
  function _evictOldest(exclude, n) {
    const victims = _cachedSubjectsLRUFirst(exclude).slice(0, Math.max(1, n || 1));
    for (const id of victims) {
      try { localStorage.removeItem(_cacheKey(id)); } catch {}
      _lruForget(id);
    }
    return victims.length;
  }

  // Safari reports the quota differently from everyone else, and an old Firefox
  // differently again. Matching only 'QuotaExceededError' would silently skip
  // eviction on exactly the browser most likely to be tight for space.
  function _isQuotaError(e) {
    if (!e) return false;
    return e.name === 'QuotaExceededError'
        || e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
        || e.code === 22 || e.code === 1014;
  }

  // ⚠ An EMPTY payload is never a cache hit, and is never written.
  //
  // A subject can legitimately answer with nothing — every chapter gated by the
  // plan, or an expired account with no entitlements — and that answer used to
  // be cached like any other. For the next SEVEN DAYS the child then got a
  // subject with no questions in it, with nothing on screen to explain why, and
  // no way to recover even after the parent bought the chapter or renewed. It
  // also fed startChapterDirect's retry, which before this pass was unbounded.
  //
  // The cost of getting this wrong in the other direction is one extra request
  // per subject load for a family that really is entitled to nothing. That is
  // the cheaper mistake by a wide margin.
  function _readCache(subjectId) {
    try {
      const raw = localStorage.getItem(_cacheKey(subjectId));
      if (!raw) return null;
      const { ts, data } = JSON.parse(raw);
      if (Date.now() - ts > _CACHE_TTL) { localStorage.removeItem(_cacheKey(subjectId)); _lruForget(subjectId); return null; }
      if (!Array.isArray(data) || !data.length) { localStorage.removeItem(_cacheKey(subjectId)); _lruForget(subjectId); return null; }
      _lruTouch(subjectId);
      return data;
    } catch { return null; }
  }

  function _writeCache(subjectId, data) {
    if (!Array.isArray(data) || !data.length) return;
    const payload = JSON.stringify({ ts: Date.now(), data });

    // Stay under the cap BEFORE writing, so the common case never has to fail a
    // write first. _cachedSubjectsLRUFirst excludes this subject either way, so
    // the total after this write is always its length + 1 — whether this is a
    // new entry or a refresh of an existing one.
    try {
      const others = _cachedSubjectsLRUFirst(subjectId).length;
      if (others + 1 > _LRU_MAX) _evictOldest(subjectId, others + 1 - _LRU_MAX);
    } catch {}

    // Up to three attempts: the first may still fail if OTHER origins' data —
    // the progress blobs, another child's cache — has taken the space, and one
    // eviction may not free enough for a 473 KB bundle.
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        localStorage.setItem(_cacheKey(subjectId), payload);
        _lruTouch(subjectId);
        return;
      } catch (e) {
        if (!_isQuotaError(e)) return;          // not a space problem — give up
        if (!_evictOldest(subjectId, 2)) return; // nothing left to evict
      }
    }
    // Still no room: leave the cache alone rather than thrashing. The subject
    // simply refetches next time, which is the pre-existing behaviour.
  }

  async function _buildAuthHeaders() {
    const headers = {};
    if (typeof _sb !== 'undefined' && _sb) {
      const { data: { session } } = await _sb.auth.getSession().catch(() => ({ data: {} }));
      if (session?.access_token) headers['Authorization'] = `Bearer ${session.access_token}`;
    }
    if (!headers['Authorization'] && typeof Store !== 'undefined') {
      const sess = Store.getStudentSession();
      // The TOKEN, not the id. The id only ever identified the child; the
      // function used to accept it as proof of who was asking, which meant
      // anyone holding a child's UUID could pull that child's gated question
      // set. This is the same opaque session token RLS already checks through
      // current_student_id(), and it expires and can be revoked.
      if (sess?.token) headers['X-Student-Token'] = sess.token;
    }
    return headers;
  }

  // Returns TRUE only when the server actually answered. ⚠ The distinction is
  // load-bearing: "the server says you get nothing for this subject" is a final
  // answer and must not be retried, but "we never managed to ask" is not, and
  // treating the two the same is what let one 401 mark a subject permanently
  // loaded with zero questions in it. Every chapter in that subject then looked
  // empty for the rest of the session, with no way back short of a reload.
  async function _loadFromAPI(subjectId) {
    try {
      const cached = _readCache(subjectId);
      if (cached) {
        const existing = new Set(STATIC_QUESTIONS.map(q => q.id));
        STATIC_QUESTIONS.push(...cached.filter(q => !existing.has(q.id)));
        return true;
      }

      const headers = await _buildAuthHeaders();
      if (!headers['Authorization'] && !headers['X-Student-Token']) {
        // Nothing was asked. This happens on a race with session restore, and
        // the next attempt usually has a token.
        console.warn('[QuestionLoader] No auth - skipping API load for', subjectId);
        return false;
      }

      const resp = await fetch(`/.netlify/functions/questions?subject=${encodeURIComponent(subjectId)}`, { headers });
      if (!resp.ok) { console.warn('[QuestionLoader] API error', resp.status); return false; }

      const incoming = await resp.json();
      _writeCache(subjectId, incoming);
      const existing = new Set(STATIC_QUESTIONS.map(q => q.id));
      STATIC_QUESTIONS.push(...incoming.filter(q => !existing.has(q.id)));
      return true;

    } catch(e) {
      console.warn('[QuestionLoader] Fetch error:', e.message);
      return false;
    }
  }

  // Batch-load all subjects for a grade in a single API call (production only).
  // Falls back to per-subject loads on error.
  async function _loadBatchForGrade(grade, packs) {
    try {
      const headers = await _buildAuthHeaders();
      if (!headers['Authorization'] && !headers['X-Student-Token']) return false;

      const resp = await fetch(`/.netlify/functions/questions?all=1&grade=${grade}`, { headers });
      if (!resp.ok) return false;

      const bundle = await resp.json(); // { 'grade5-maths': [...], ... }
      const existing = new Set(STATIC_QUESTIONS.map(q => q.id));
      for (const [subjectId, questions] of Object.entries(bundle)) {
        if (!Array.isArray(questions)) continue;
        _writeCache(subjectId, questions);
        _done.add(subjectId);
        STATIC_QUESTIONS.push(...questions.filter(q => !existing.has(q.id)));
        questions.forEach(q => existing.add(q.id));
      }
      return true;
    } catch(e) {
      console.warn('[QuestionLoader] Batch fetch error:', e.message);
      return false;
    }
  }

  // ── Public API ─────────────────────────────────
  async function loadSubject(subjectId) {
    if (!subjectId || _done.has(subjectId)) return;
    // Added BEFORE the await so two concurrent calls do not both fetch, and
    // removed again if the load did not actually happen — see _loadFromAPI.
    // Without the rollback a transient failure was permanent for the session:
    // _done said "loaded", the pool was empty, and startChapterDirect's retry
    // then spun on a promise that resolved instantly and changed nothing.
    _done.add(subjectId);

    let ok;
    if (_isFileProtocol) {
      ok = await _loadLocal(subjectId);
    } else {
      ok = await _loadFromAPI(subjectId);
    }
    if (ok === false) _done.delete(subjectId);
  }

  // Which subject to fetch before the others. ACTIVE_PACK is set once the child
  // picks a subject; on a fresh login nobody has picked yet, so fall back to the
  // one the dashboard will open by default — the same `find(!comingSoon)` rule
  // _activePack() uses, kept in step with it deliberately.
  function _activeSubjectId(packs) {
    if (!packs.length) return null;
    const active = (typeof ACTIVE_PACK !== 'undefined' && ACTIVE_PACK) ? ACTIVE_PACK.id : null;
    if (active && packs.some(p => p.id === active)) return active;
    return (packs.find(p => !p.comingSoon) || packs[0]).id;
  }

  // Awaits EVERY subject in the grade. loadForStudent() deliberately no longer
  // does that - it resolves as soon as the active subject is in, and prefetches
  // the rest - so anything that reads across the whole bank (the admin report
  // viewer looking up an arbitrary question id) has to ask for it explicitly.
  async function loadAllForGrade(grade) {
    const gs = window.GLOBAL_SETTINGS || {};
    if (typeof SUBJECT_PACKS === 'undefined') return;
    const packs = SUBJECT_PACKS.filter(p =>
      p.grade === grade && !p.comingSoon &&
      !(gs.disabled_grades   || []).includes(p.grade) &&
      !(gs.disabled_subjects || []).includes(p.id)
    );
    await Promise.allSettled(packs.map(p => loadSubject(p.id)));
  }

  // Pre-load the active subject as soon as we know who's logged in
  async function loadForStudent(grade, subjectHint) {
    const gs = window.GLOBAL_SETTINGS || {};
    const disabledGrades   = gs.disabled_grades   || [];
    const disabledSubjects = gs.disabled_subjects || [];

    if (subjectHint) {
      if (!disabledSubjects.includes(subjectHint)) await loadSubject(subjectHint);
      return;
    }

    if (typeof SUBJECT_PACKS === 'undefined') return;
    const packs = SUBJECT_PACKS.filter(p =>
      p.grade === grade &&
      !p.comingSoon &&
      !disabledGrades.includes(p.grade) &&
      !disabledSubjects.includes(p.id)
    );

    // In file:// mode, fall back to per-subject script injection
    if (_isFileProtocol) {
      for (const p of packs) await loadSubject(p.id);
      return;
    }

    // Check if all subjects are already cached — skip the network entirely
    const allCached = packs.every(p => _done.has(p.id) || _readCache(p.id) !== null);
    if (allCached) {
      for (const p of packs) await loadSubject(p.id);
      return;
    }

    // Fetch the subject the child is about to use FIRST, on its own, and leave
    // the other four to load in the background.
    //
    // The batch call is one request but it is the whole grade — 346 KB gzipped
    // for grade 5 — so a child opening Maths waited on English, French, History
    // and Science too, on every cold cache. One subject is 26-100 KB. The rest
    // still arrive, just after the screen is usable; startChapterDirect() waits
    // on QuestionLoader anyway, so nothing can race ahead of its own questions.
    const active = _activeSubjectId(packs);
    if (active) {
      await loadSubject(active);
      const rest = packs.filter(p => p.id !== active && !_done.has(p.id));
      if (rest.length) {
        // Not awaited on purpose: this is prefetch, not a dependency.
        Promise.all(rest.map(p => loadSubject(p.id))).catch(() => {});
      }
      return;
    }

    // Batch fetch: one request for all subjects in this grade
    const batchOk = await _loadBatchForGrade(grade, packs);
    if (!batchOk) {
      // Fallback: load individually
      for (const p of packs) await loadSubject(p.id);
    }
  }

  // ── Past papers ─────────────────────────────────────────────────────────
  // Deliberately NOT pushed into STATIC_QUESTIONS: these have no `answer` and
  // must never end up in a practice or exam pool that expects to mark them.
  // Returned to the caller instead, and cached for the session only — they are
  // read once, on a screen the child opens on purpose.
  let _papersCache = null;

  async function loadPastPapers(grade) {
    if (_papersCache) return _papersCache.filter(q => !grade || String(q.grade) === String(grade));
    if (_isFileProtocol) return [];          // no API in local file:// dev
    try {
      const headers = await _buildAuthHeaders();
      if (!headers['Authorization'] && !headers['X-Student-Token']) return [];
      const resp = await fetch('/.netlify/functions/questions?papers=1', { headers });
      if (!resp.ok) { console.warn('[QuestionLoader] past papers', resp.status); return []; }
      _papersCache = await resp.json();
      return _papersCache.filter(q => !grade || String(q.grade) === String(grade));
    } catch (e) {
      console.warn('[QuestionLoader] past papers:', e.message);
      return [];
    }
  }

  return { loadSubject, loadForStudent, loadAllForGrade, loadPastPapers };
})();
