'use strict';
// ══════════════════════════════════════════════
//  Question Loader
//  Production (Netlify):  fetches from /.netlify/functions/questions
//                         so the raw JS files never reach the browser.
//  Local dev (file://):   dynamically injects the question <script> tags
//                         so you can test without running a server.
//  Local dev (netlify dev / localhost:8888): uses the function — same as prod.
// ══════════════════════════════════════════════

const QuestionLoader = (() => {
  const _done = new Set();

  // file:// → local development without any server
  const _isFileProtocol = location.protocol === 'file:';

  // Question file paths per subject — only used in file:// mode
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
    // Add more subjects here as you build them:
    // 'grade5-science': [ 'subjects/grade5-science/questions/core.js', ... ],
    // 'grade6-maths':   [ 'subjects/grade6-maths/questions/core.js',   ... ],
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

  async function _loadFromAPI(subjectId) {
    try {
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
        console.warn('[QuestionLoader] No auth — skipping API load for', subjectId);
        return;
      }

      const resp = await fetch(`/.netlify/functions/questions?subject=${encodeURIComponent(subjectId)}`, { headers });
      if (!resp.ok) { console.warn('[QuestionLoader] API error', resp.status); return; }

      const incoming = await resp.json();

      // Deduplicate — avoid double-loading if somehow already present
      const existing = new Set(STATIC_QUESTIONS.map(q => q.id));
      const fresh    = incoming.filter(q => !existing.has(q.id));
      STATIC_QUESTIONS.push(...fresh);

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
    // Derive the subject id from grade + the first available subject pack
    if (subjectHint) {
      await loadSubject(subjectHint);
      return;
    }
    if (typeof SUBJECT_PACKS !== 'undefined') {
      const packs = SUBJECT_PACKS.filter(p => p.grade === grade && !p.comingSoon);
      for (const p of packs) await loadSubject(p.id);
    }
  }

  return { loadSubject, loadForStudent };
})();
