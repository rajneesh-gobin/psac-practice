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

  // Question file paths per subject - only used in file:// mode
  const LOCAL_FILES = {
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
    ],
    'grade5-science': [
      'subjects/grade5-science/questions/ch01_living_things.js',
      'subjects/grade5-science/questions/ch02_plants.js',
      'subjects/grade5-science/questions/ch03_animals.js',
      'subjects/grade5-science/questions/ch04_energy.js',
      'subjects/grade5-science/questions/ch05_water_matter.js',
      'subjects/grade5-science/questions/ch06_electricity.js',
      'subjects/grade5-science/questions/ch07_materials.js',
      'subjects/grade5-science/questions/ch08_air.js',
      'subjects/grade5-science/questions/ch09_conservation.js',
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
    ],
    'grade6-english': [
      'subjects/grade6-english/questions/ch01_nouns.js',
      'subjects/grade6-english/questions/ch02_verbs.js',
      'subjects/grade6-english/questions/ch03_clauses.js',
      'subjects/grade6-english/questions/ch04_comprehension.js',
      'subjects/grade6-english/questions/ch05_writing.js',
      'subjects/grade6-english/questions/ch06_vocabulary.js',
    ],
    'grade6-french': [
      'subjects/grade6-french/questions/ch01_imparfait.js',
      'subjects/grade6-french/questions/ch02_futur.js',
      'subjects/grade6-french/questions/ch03_subordonnees.js',
      'subjects/grade6-french/questions/ch04_subjunctif.js',
      'subjects/grade6-french/questions/ch05_argumentation.js',
      'subjects/grade6-french/questions/ch06_lecture.js',
    ],
    'grade4-maths': [
      'subjects/grade4-maths/questions/ch01_g4_numeration.js',
      'subjects/grade4-maths/questions/ch02_g4_four_ops.js',
      'subjects/grade4-maths/questions/ch03_g4_fractions.js',
      'subjects/grade4-maths/questions/ch04_g4_geometry.js',
      'subjects/grade4-maths/questions/ch05_g4_measures.js',
      'subjects/grade4-maths/questions/ch06_g4_data.js',
    ],
    'grade4-english': [
      'subjects/grade4-english/questions/ch01_g4_nouns.js',
      'subjects/grade4-english/questions/ch02_g4_verbs.js',
      'subjects/grade4-english/questions/ch03_g4_adjectives.js',
      'subjects/grade4-english/questions/ch04_g4_sentences.js',
      'subjects/grade4-english/questions/ch05_g4_comprehension.js',
      'subjects/grade4-english/questions/ch06_g4_vocabulary.js',
    ],
    'grade4-science': [
      'subjects/grade4-science/questions/ch01_g4_living_things.js',
      'subjects/grade4-science/questions/ch02_g4_plants.js',
      'subjects/grade4-science/questions/ch03_g4_animals.js',
      'subjects/grade4-science/questions/ch04_g4_air.js',
      'subjects/grade4-science/questions/ch05_g4_water.js',
      'subjects/grade4-science/questions/ch06_g4_materials.js',
    ],
    'grade4-french': [
      'subjects/grade4-french/questions/ch01_g4_vocabulaire.js',
      'subjects/grade4-french/questions/ch02_g4_noms.js',
      'subjects/grade4-french/questions/ch03_g4_verbes.js',
      'subjects/grade4-french/questions/ch04_g4_adjectifs.js',
      'subjects/grade4-french/questions/ch05_g4_phrase.js',
      'subjects/grade4-french/questions/ch06_g4_lecture.js',
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

  function _readCache(subjectId) {
    try {
      const raw = localStorage.getItem(`mm_qc_${subjectId}`);
      if (!raw) return null;
      const { ts, data } = JSON.parse(raw);
      if (Date.now() - ts > _CACHE_TTL) { localStorage.removeItem(`mm_qc_${subjectId}`); return null; }
      return data;
    } catch { return null; }
  }

  function _writeCache(subjectId, data) {
    try { localStorage.setItem(`mm_qc_${subjectId}`, JSON.stringify({ ts: Date.now(), data })); } catch {}
  }

  async function _loadFromAPI(subjectId) {
    try {
      // ── Serve from localStorage cache if fresh (avoids Netlify function calls) ──
      const cached = _readCache(subjectId);
      if (cached) {
        const existing = new Set(STATIC_QUESTIONS.map(q => q.id));
        STATIC_QUESTIONS.push(...cached.filter(q => !existing.has(q.id)));
        return;
      }

      // Build auth headers
      const headers = {};

      // Parent / Teacher: include Supabase JWT
      if (typeof _sb !== 'undefined' && _sb) {
        const { data: { session } } = await _sb.auth.getSession().catch(() => ({ data: {} }));
        if (session?.access_token) headers['Authorization'] = `Bearer ${session.access_token}`;
      }

      // Student: include their session id
      if (!headers['Authorization'] && typeof Store !== 'undefined') {
        const sess = Store.getStudentSession();
        if (sess?.id) headers['X-Student-Id'] = sess.id;
      }

      if (!headers['Authorization'] && !headers['X-Student-Id']) {
        console.warn('[QuestionLoader] No auth - skipping API load for', subjectId);
        return;
      }

      const resp = await fetch(`/.netlify/functions/questions?subject=${encodeURIComponent(subjectId)}`, { headers });
      if (!resp.ok) { console.warn('[QuestionLoader] API error', resp.status); return; }

      const incoming = await resp.json();

      // Cache for 7 days so subsequent page loads skip the function entirely
      _writeCache(subjectId, incoming);

      // Deduplicate - avoid double-loading if somehow already present
      const existing = new Set(STATIC_QUESTIONS.map(q => q.id));
      STATIC_QUESTIONS.push(...incoming.filter(q => !existing.has(q.id)));

    } catch(e) {
      console.warn('[QuestionLoader] Fetch error:', e.message);
    }
  }

  // ── Public API ─────────────────────────────────
  async function loadSubject(subjectId) {
    if (!subjectId || _done.has(subjectId)) return;
    _done.add(subjectId);

    if (_isFileProtocol) {
      await _loadLocal(subjectId);
    } else {
      await _loadFromAPI(subjectId);
    }
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
    if (typeof SUBJECT_PACKS !== 'undefined') {
      const packs = SUBJECT_PACKS.filter(p =>
        p.grade === grade &&
        !p.comingSoon &&
        !disabledGrades.includes(p.grade) &&
        !disabledSubjects.includes(p.id)
      );
      for (const p of packs) await loadSubject(p.id);
    }
  }

  return { loadSubject, loadForStudent };
})();
