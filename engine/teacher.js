'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice - Teacher Mode
//  Loads LAST (after auth.js).
//  Relies on globals: toast(), showScreen(), CHAPTERS, STATIC_QUESTIONS, shuffle()
// ══════════════════════════════════════════════

const TeacherMode = (() => {
  const STORE_KEY = 'mathmaster_teacher';

  function _getData() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || { pin: null, assignments: [] }; }
    catch(e) { return { pin: null, assignments: [] }; }
  }

  function _saveData(d) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(d)); } catch(e) {}
  }

  function _el(id) { return document.getElementById(id); }

  // ── Access control ─────────────────────────────
  // Teacher mode is a Supabase role (profiles.role = 'teacher'), granted by an
  // administrator. There is no PIN, and no way for a parent or a child to opt in.
  //
  // The old enter()/submitPin() flow stored a 4-digit PIN in localStorage and,
  // if none existed yet, invited the visitor to CREATE one - so any user could
  // grant themselves teacher access on their own device. It has been removed.
  //
  // This is a UI guard only. The real enforcement is server-side: every teacher
  // RPC (guest_assignment_create, guest_results, guest_grant_retry) re-checks
  // the caller's role, so a non-teacher who forced their way to this screen
  // would see an empty dashboard and every action would be refused.
  // Requires role AND an approved status - a pending or suspended teacher is
  // not a teacher yet. Auth computes this once at sign-in from the profile row.
  function isTeacher() {
    return (typeof Auth !== 'undefined' && typeof Auth.isTeacher === 'function')
      ? !!Auth.isTeacher() : false;
  }

  // ── Results storage ────────────────────────────
  function saveResult(assignId, studentName, data) {
    const d = _getData();
    if (!d.results)           d.results = {};
    if (!d.results[assignId]) d.results[assignId] = [];

    const norm = studentName.toLowerCase().trim();
    // Find latest attempt for this student
    const prev = d.results[assignId]
      .filter(r => r.studentName.toLowerCase().trim() === norm)
      .sort((a, b) => b.attempt - a.attempt)[0];

    const attempt = prev ? prev.attempt + 1 : 1;

    // Mark any pending retry as consumed
    d.results[assignId].forEach(r => {
      if (r.studentName.toLowerCase().trim() === norm) r.retryAllowed = false;
    });

    d.results[assignId].push({ studentName, attempt, ...data, retryAllowed: false });
    _saveData(d);
  }

  function getAttemptCount(assignId, studentName) {
    const d    = _getData();
    const norm = studentName.toLowerCase().trim();
    return (d.results?.[assignId] || [])
      .filter(r => r.studentName.toLowerCase().trim() === norm).length;
  }

  function hasRetry(assignId, studentName) {
    const d    = _getData();
    const norm = studentName.toLowerCase().trim();
    return (d.results?.[assignId] || [])
      .some(r => r.studentName.toLowerCase().trim() === norm && r.retryAllowed);
  }

  function allowRetry(assignId, studentName) {
    const d    = _getData();
    const norm = studentName.toLowerCase().trim();
    const rows = (d.results?.[assignId] || [])
      .filter(r => r.studentName.toLowerCase().trim() === norm);
    if (!rows.length) return;
    // Mark only the most-recent attempt as retryAllowed
    rows.sort((a, b) => b.attempt - a.attempt);
    rows[0].retryAllowed = true;
    _saveData(d);
    _renderResults(_currentResultsAssignId);
    toast(`🔄 Retry granted to ${studentName}.`, 2000);
  }

  function removeResult(assignId, studentName, attempt) {
    const d    = _getData();
    const norm = studentName.toLowerCase().trim();
    if (!d.results?.[assignId]) return;
    d.results[assignId] = d.results[assignId]
      .filter(r => !(r.studentName.toLowerCase().trim() === norm && r.attempt === attempt));
    _saveData(d);
    _renderResults(assignId);
    toast('Result removed.', 1500);
  }

  let _currentResultsAssignId = null;

  // ── Build the teacher dashboard ────────────────
  function render() {
    // Belt and braces: showScreen('teacher') can be reached from anywhere, so
    // refuse to draw the dashboard for anyone who is not a teacher.
    if (!isTeacher()) {
      const list = _el('ta-asgn-list');
      if (list) list.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 py-2">Teacher access required.</p>';
      if (typeof toast === 'function') toast('Teacher access is granted by an administrator.', 3000);
      if (typeof showScreen === 'function') showScreen(ACTIVE_STUDENT_ID ? 'dashboard' : 'landing');
      return;
    }
    _buildSubjectSelect();
    _buildChapterCheckboxes();
    _ensureSubjectLoaded();          // not awaited: the list below must paint now
    _renderAssignmentList();
    _renderResultsAssignSelector();
  }

  // Every registered pack, not just the active one. This used to read the
  // global CHAPTERS, which holds only the chapters of whichever pack the app
  // last activated - and with no pack chosen that is grade5-maths, which is why
  // teacher mode appeared to have Mathematics and nothing else. The `_built`
  // one-shot guard made it worse: the list was frozen at whatever was loaded
  // the first time the tab opened.
  function _packs() {
    return (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [])
      .filter(p => !p.comingSoon);
  }

  function _selectedPack() {
    const id = _el('ta-subject')?.value;
    return _packs().find(p => p.id === id) || _packs()[0] || null;
  }

  function _buildSubjectSelect() {
    const sel = _el('ta-subject');
    if (!sel) return;
    const packs = _packs();
    if (!packs.length) return;
    const keep = sel.value;
    sel.innerHTML = packs.map(p =>
      `<option value="${p.id}">Grade ${p.grade} — ${p.icon || ''} ${p.name}</option>`
    ).join('');
    // Default to the pack already in view so the tab opens on something
    // familiar rather than always snapping back to the first grade.
    sel.value = (keep && packs.some(p => p.id === keep)) ? keep
      : (typeof ACTIVE_PACK !== 'undefined' && ACTIVE_PACK && packs.some(p => p.id === ACTIVE_PACK.id))
        ? ACTIVE_PACK.id : packs[0].id;
  }

  function _buildChapterCheckboxes() {
    const container = _el('ta-chapter-opts-container');
    if (!container) return;
    const pack = _selectedPack();
    const chs  = pack ? (pack._chapters || pack.chapters || []) : [];
    if (!chs.length) {
      container.innerHTML = '<p class="text-sm text-gray-400 p-2">No topics found for this subject.</p>';
      return;
    }
    container.innerHTML = chs.map(c =>
      `<label class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
        <input type="checkbox" value="${c.id}" class="w-4 h-4 rounded accent-green-500">
        <span>${c.icon || ''} ${c.name}</span>
      </label>`
    ).join('');
  }

  async function subjectChange() {
    _buildChapterCheckboxes();
    await _ensureSubjectLoaded();
  }

  // STATIC_QUESTIONS only ever holds the subjects the app has actually fetched,
  // and TeacherMode never asked for any - it inherited whatever the student
  // login happened to load. That was invisible while this screen was hardcoded
  // to grade5-maths; with a real subject picker, choosing anything else gave
  // "No questions found for these settings" every time, because the pool was
  // empty rather than because the filters matched nothing.
  async function _ensureSubjectLoaded() {
    const pack = _selectedPack();
    if (!pack || typeof QuestionLoader === 'undefined') return;
    const btn = _el('ta-build-btn');
    if (btn) btn.disabled = true;
    try { await QuestionLoader.loadSubject(pack.id); }
    catch (e) { console.warn('[TeacherMode] could not load', pack.id, e?.message); }
    finally { if (btn) btn.disabled = false; }
  }

  function _findChapter(cid) {
    for (const p of _packs()) {
      const hit = (p._chapters || p.chapters || []).find(c => c.id === cid);
      if (hit) return hit;
    }
    return (typeof CHAPTERS !== 'undefined' ? CHAPTERS : []).find(c => c.id === cid) || null;
  }

  function _renderAssignmentList() {
    const data = _getData();
    const list = _el('ta-asgn-list');
    if (!list) return;

    if (!data.assignments || !data.assignments.length) {
      list.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 py-2">No assignments yet - build one above!</p>';
      return;
    }

    list.innerHTML = data.assignments.map(a => {
      const chNames = (a.chapters || []).map(cid => {
        // Across ALL packs, not the active one: an assignment saved for Grade 6
        // French must still show its topic names while the app is sitting on
        // Grade 5 Maths, instead of falling back to raw chapter ids.
        const ch = _findChapter(cid);
        return ch ? ch.name : cid;
      }).join(', ') || 'All chapters';
      const diffLabel  = !a.difficulty ? '🔀 Mixed' : `L${a.difficulty}`;
      const modeBadge  = a.mode === 'test'
        ? '<span class="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded font-medium">📝 Test</span>'
        : '<span class="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded font-medium">🔍 Practice</span>';
      return `
        <div class="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-sm font-semibold text-gray-800 dark:text-white">${a.label}</span>
              ${modeBadge}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">${chNames} · ${diffLabel} · ${a.count}Q${a.random ? ' · 🎲' : ''}</div>
          </div>
          <div class="flex gap-1 shrink-0">
            <button onclick="TeacherMode.copyLink('${a.id}')"
              class="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/60 px-2.5 py-1.5 rounded-lg transition-colors font-medium">
              📋 Copy
            </button>
            <button onclick="TeacherMode.deleteAssignment('${a.id}')"
              class="text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/60 px-2 py-1.5 rounded-lg transition-colors">
              🗑
            </button>
          </div>
        </div>`;
    }).join('');
  }

  // ── Tab switching ──────────────────────────────
  function switchTab(tab) {
    document.querySelectorAll('.ta-tab').forEach(b => {
      const on = b.dataset.tab === tab;
      b.classList.toggle('bg-white',         on);
      b.classList.toggle('dark:bg-gray-700', on);
      b.classList.toggle('shadow-sm',        on);
      b.classList.toggle('font-semibold',    on);
      b.classList.toggle('text-gray-800',    on);
      b.classList.toggle('dark:text-white',  on);
      b.classList.toggle('text-gray-500',   !on);
    });
    document.querySelectorAll('.ta-tab-content').forEach(c => {
      c.classList.toggle('hidden', c.dataset.tab !== tab);
    });
  }

  // ── Results tab ────────────────────────────────
  function _renderResultsAssignSelector() {
    const sel = _el('ta-results-assign-sel');
    if (!sel) return;
    const data = _getData();
    const testAssigns = (data.assignments || []).filter(a => a.mode === 'test');
    if (!testAssigns.length) {
      sel.innerHTML = '<option value="">- No test assignments yet -</option>';
      return;
    }
    sel.innerHTML = '<option value="">Select an assignment…</option>' +
      testAssigns.map(a => `<option value="${a.id}">${a.label}</option>`).join('');
  }

  function _renderResults(assignId) {
    _currentResultsAssignId = assignId;
    const container = _el('ta-results-list');
    if (!container) return;
    if (!assignId) { container.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 py-2">Select an assignment above to see results.</p>'; return; }

    const data    = _getData();
    const results = data.results?.[assignId] || [];

    if (!results.length) {
      container.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 py-2">No submissions yet for this assignment.</p>';
      return;
    }

    // Group by student name, show all attempts
    const grouped = {};
    results.forEach(r => {
      const k = r.studentName.toLowerCase().trim();
      if (!grouped[k]) grouped[k] = [];
      grouped[k].push(r);
    });

    container.innerHTML = Object.values(grouped).map(attempts => {
      const latest  = attempts.sort((a, b) => b.attempt - a.attempt)[0];
      const name    = latest.studentName;
      const canRetry = !latest.retryAllowed;

      const attemptsHtml = attempts.map(r => {
        const col = r.pct >= 80 ? 'text-green-600 dark:text-green-400' : r.pct >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400';
        const ts  = new Date(r.timestamp).toLocaleString();
        return `
          <div class="flex items-center gap-3 py-1.5 border-t border-gray-100 dark:border-gray-700 first:border-0">
            <span class="text-xs text-gray-500 dark:text-gray-400 w-16 shrink-0">Attempt ${r.attempt}</span>
            <span class="font-bold text-sm ${col}">${r.score}/${r.total} (${r.pct}%)</span>
            <span class="text-xs text-gray-500 dark:text-gray-400 flex-1">${ts}</span>
            <button onclick="TeacherMode.removeResult('${assignId}','${name}',${r.attempt})"
              class="text-xs text-red-400 hover:text-red-600 px-1.5 py-0.5 rounded transition-colors">🗑</button>
            ${r.answers ? `<button onclick="TeacherMode.showAnswers('${assignId}','${name}',${r.attempt})"
              class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 px-2 py-0.5 rounded transition-colors">View</button>` : ''}
          </div>`;
      }).join('');

      return `
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-3">
          <div class="flex items-center justify-between mb-2">
            <div class="font-semibold text-gray-800 dark:text-white">${name}</div>
            <button onclick="TeacherMode.allowRetry('${assignId}','${name}')"
              ${latest.retryAllowed ? 'disabled' : ''}
              class="text-xs ${latest.retryAllowed ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 cursor-default' : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/60'} px-3 py-1 rounded-lg transition-colors font-medium">
              ${latest.retryAllowed ? '✅ Retry Granted' : '🔄 Allow Retry'}
            </button>
          </div>
          ${attemptsHtml}
        </div>`;
    }).join('');
  }

  window.taSelectResultsAssign = function(sel) {
    _renderResults(sel.value);
  };

  function showAnswers(assignId, studentName, attempt) {
    const data    = _getData();
    const norm    = studentName.toLowerCase().trim();
    const result  = (data.results?.[assignId] || [])
      .find(r => r.studentName.toLowerCase().trim() === norm && r.attempt === attempt);
    if (!result?.answers) { toast('No detailed answers stored.', 2000); return; }

    const html = result.answers.map((a, i) => `
      <div class="mb-3 p-3 rounded-xl text-sm ${a.correct ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}">
        <div class="font-medium text-gray-800 dark:text-white mb-1">Q${i + 1}: ${a.question}</div>
        <div class="text-xs ${a.correct ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
          ${a.correct ? '✅ Correct' : `❌ Answered: <b>${a.userAnswer}</b> · Correct: <b>${a.correctAnswer}</b>`}
        </div>
      </div>`).join('');

    const panel = _el('ta-answer-panel');
    const title = _el('ta-answer-panel-title');
    if (panel) { panel.classList.remove('hidden'); panel.querySelector('.ta-answer-body').innerHTML = html; }
    if (title) title.textContent = `${studentName} - Attempt ${attempt}`;
  }

  // ── Build + save an assignment ─────────────────
  async function buildAssignment() {
    const label = (_el('ta-label')?.value || '').trim();
    if (!label) { toast('Please enter a name for this assignment.', 2000); return; }

    const chapters = Array.from(
      document.querySelectorAll('#ta-chapter-opts-container input[type=checkbox]:checked')
    ).map(cb => cb.value);

    const difficulty = parseInt(_el('ta-difficulty')?.value || '0');
    const count      = parseInt(_el('ta-count')?.value || '10');
    const random     = _el('ta-random')?.checked ?? true;
    const mode       = _el('ta-mode')?.value || 'practice';

    const pack = _selectedPack();
    if (!pack) { toast('Please pick a subject first.', 2500); return; }

    // Validate: do we have questions for this config?
    // Scoped to the chosen subject's own chapters when none are ticked -
    // "leave unchecked = all" means all of THIS subject, not all 5,428
    // questions in the app.
    const packChapterIds = new Set((pack._chapters || pack.chapters || []).map(c => c.id));
    let pool = STATIC_QUESTIONS.filter(q => packChapterIds.has(q.chapterId));
    // The subject may still be loading (or have failed to load) - "no questions
    // at all for this subject" and "no questions matching these filters" need
    // different words, or a teacher retunes filters that were never the problem.
    if (!pool.length) {
      await _ensureSubjectLoaded();
      pool = STATIC_QUESTIONS.filter(q => packChapterIds.has(q.chapterId));
      if (!pool.length) {
        toast(`Could not load questions for ${pack.name}. Check your connection and try again.`, 3500);
        return;
      }
    }
    if (chapters.length) pool = pool.filter(q => chapters.includes(q.chapterId));
    if (difficulty)      pool = pool.filter(q => q.difficulty === difficulty);
    if (!pool.length) {
      toast('No questions found for these settings. Try different topics or difficulty.', 3000);
      return;
    }

    const id     = 'ta_' + Date.now();
    const config = { id, label, subject: pack.id, chapters, difficulty, count, random, mode };

    const data = _getData();
    data.assignments = data.assignments || [];
    data.assignments.unshift(config);
    _saveData(data);

    // Clear form
    if (_el('ta-label')) _el('ta-label').value = '';
    document.querySelectorAll('#ta-chapter-opts-container input[type=checkbox]').forEach(cb => cb.checked = false);

    _renderAssignmentList();
    toast(`Assignment "${label}" created! 📋`, 2000);
    return config;
  }

  // ── Generate + copy shareable link ────────────
  function copyLink(id) {
    const data = _getData();
    const asgn = data.assignments.find(a => a.id === id);
    if (!asgn) return;

    const encoded = btoa(JSON.stringify(asgn));
    const pageUrl = `${location.origin}${location.pathname}?assign=${encoded}`;

    navigator.clipboard.writeText(pageUrl)
      .then(() => toast('Link copied! 📋 Share it with your students.', 3000))
      .catch(() => {
        // Fallback: prompt
        prompt('Copy this link and share it with students:', pageUrl);
      });
  }

  // ── Delete a saved assignment ──────────────────
  function deleteAssignment(id) {
    if (!confirm('Delete this assignment? Students with the link can still use it.')) return;
    const data = _getData();
    data.assignments = (data.assignments || []).filter(a => a.id !== id);
    _saveData(data);
    _renderAssignmentList();
    toast('Assignment deleted.', 1500);
  }

  return {
    isTeacher, render, switchTab, subjectChange,
    buildAssignment, copyLink, deleteAssignment,
    saveResult, getAttemptCount, hasRetry, allowRetry, removeResult, showAnswers,
  };
})();
