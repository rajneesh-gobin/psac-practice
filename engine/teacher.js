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
    _renderClassPicker();            // show form immediately with whatever is cached
    TeacherWorkspace.refresh();
    TeacherGuestClasses.refresh().then(() => _renderClassPicker()).catch(() => _renderClassPicker());
    TeacherGuestClasses.accessChanged();
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
    const grade = _el('ta-grade')?.value;
    return _packs().find(p => p.id === id && String(p.grade) === grade) || null;
  }

  function _buildSubjectSelect() {
    const sel = _el('ta-subject');
    const gradeSel = _el('ta-grade');
    if (!sel || !gradeSel) return;
    const packs = _packs();
    const keep = sel.value;
    const grades = [...new Set(packs.map(p => String(p.grade)))].sort((a,b) => Number(a)-Number(b));
    const previousGrade = gradeSel.value;
    const active = typeof ACTIVE_PACK !== 'undefined' ? ACTIVE_PACK : null;
    const preferred = packs.find(p => p.id === keep) || packs.find(p => p.id === active?.id);
    gradeSel.innerHTML = grades.map(g => `<option value="${g}">Grade ${g}</option>`).join('');
    gradeSel.value = grades.includes(previousGrade) ? previousGrade : String(preferred?.grade ?? grades[0] ?? '');
    const filtered = packs.filter(p => String(p.grade) === gradeSel.value);
    sel.innerHTML = filtered.map(p =>
      `<option value="${p.id}">${p.icon || ''} ${p.name}</option>`
    ).join('');
    const subjectKey = id => String(id || '').replace(/^grade\d+-/, '');
    sel.value = (filtered.find(p => p.id === keep) ||
      filtered.find(p => subjectKey(p.id) === subjectKey(preferred?.id)) || filtered[0])?.id || '';
    gradeSel.disabled = !grades.length;
    sel.disabled = !filtered.length;
    if (!filtered.length) sel.innerHTML = '<option value="">No subjects available</option>';
  }

  async function gradeChange() {
    _buildSubjectSelect();
    await subjectChange();
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
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">${chNames} · ${diffLabel} · ${a.count}Q${a.random ? ' · 🎲' : ''}${a.code ? ` · code <b>${a.code}</b>` : ''}</div>
          </div>
          <div class="flex gap-1 shrink-0">
            <button onclick="TeacherMode.shareAssignment('${a.id}')"
              class="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/60 px-2.5 py-1.5 rounded-lg transition-colors font-medium">
              📤 Share
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
  function _renderClassPicker() {
    const picker = _el('ta-class-picker');
    const noClass = _el('ta-no-classroom');
    const form = _el('ta-create-form');
    if (!picker) return;
    const classes = (typeof TeacherGuestClasses !== 'undefined') ? TeacherGuestClasses.getClasses() : [];
    const active = classes.filter(c => c.active);

    // Always show the form so the teacher can set work even without classrooms.
    if (noClass) noClass.classList.add('hidden');
    if (form) form.classList.remove('hidden');

    const current = _el('ta-classroom')?.value || '';
    picker.innerHTML = active.map(c => {
      const sel = current === c.id;
      return `<button type="button" class="ta-class-chip ${sel ? 'ta-class-chip-sel' : ''}"
        data-cid="${c.id}" data-pupils="${c.pupils}" title="${c.name}">
        <span class="ta-chip-name">&#x1F3EB; ${c.name}</span>
        <span class="ta-chip-pupils">${c.pupils} pupil${c.pupils===1?'':'s'}</span>
      </button>`;
    }).join('') +
    `<button type="button" class="ta-class-chip ${!current ? 'ta-class-chip-sel' : ''}"
      data-cid="" data-pupils="0" title="No classroom — open link">
      <span class="ta-chip-name">&#x1F517; Open link</span>
      <span class="ta-chip-pupils">no classroom</span>
    </button>`;

    if (!active.length) {
      picker.insertAdjacentHTML('beforeend',
        '<p class="ta-chip-hint">No classrooms yet. Create one in the &#x1F3EB; Classrooms tab to assign work by pupil PIN.</p>');
    }

    picker.querySelectorAll('[data-cid]').forEach(btn => {
      btn.onclick = () => {
        const cid = btn.dataset.cid;
        const pupils = Number(btn.dataset.pupils);
        const classEl = _el('ta-classroom');
        const accessEl = _el('ta-access');
        if (classEl) classEl.value = cid;
        if (accessEl) accessEl.value = cid ? (pupils > 0 ? 'classroom_pin' : 'nickname') : 'nickname';
        picker.querySelectorAll('[data-cid]').forEach(b => b.classList.remove('ta-class-chip-sel'));
        btn.classList.add('ta-class-chip-sel');
        if (typeof TeacherGuestClasses !== 'undefined') TeacherGuestClasses.accessChanged();
      };
    });

    // Auto-select first classroom if nothing chosen yet
    if (!current) {
      const firstBtn = picker.querySelector('[data-cid]');
      firstBtn?.click();
    }
  }

  function switchTab(tab) {
    if (tab === 'classes' && typeof TeacherGuestClasses !== 'undefined') TeacherGuestClasses.refresh();
    if (tab === 'materials') TeacherMaterials.load();
    if (tab === 'create')    _renderClassPicker();
    document.querySelectorAll('.ta-tab').forEach(b => {
      const on = b.dataset.tab === tab;
      b.setAttribute('aria-selected', String(on));
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
    TeacherWorkspace.results(sel.value);
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
    if (_creating) return;
    _creating = true;
    try { return await _buildAssignment(); }
    finally { _creating = false; }
  }

  let _creating = false;
  async function _buildAssignment() {
    const label = (_el('ta-label')?.value || '').trim();
    if (!label) { toast('Please enter a name for this assignment.', 2000); return; }

    const chapters = Array.from(
      document.querySelectorAll('#ta-chapter-opts-container input[type=checkbox]:checked')
    ).map(cb => cb.value);

    const difficulty = parseInt(_el('ta-difficulty')?.value || '0');
    const count      = parseInt(_el('ta-count')?.value || '10');
    const random     = _el('ta-random')?.checked ?? true;
    const mode       = _el('ta-mode')?.value || 'practice';
    const access     = _el('ta-access')?.value || 'legacy';
    const classroom  = _el('ta-classroom')?.value || null;
    if (access === 'classroom_pin' && !classroom) { toast('Choose a classroom, or create one in the Classes tab.', 3500); return; }

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
    pool = Array.from(new Map(pool.filter(q => q.id).map(q => [q.id, q])).values());
    if (pool.length < count) {
      toast(`Only ${pool.length} questions match. Choose fewer questions or broaden the topics/difficulty.`, 4500);
      return;
    }

    // ⚠ The link has to point at something the app can actually open.
    // /a/<CODE> is rewritten to guest.html by netlify.toml and is backed by
    // guest_assignment_create() — a real row, a real code, a real PIN, with
    // results coming back to the Results tab.
    //
    // The previous link was `?assign=<base64 of the config>`, and NOTHING in
    // this repo has ever read an `assign` parameter — no commit in the history
    // adds a handler, and the only URL params the app parses are join, ref and
    // friend. Every link this button produced was inert: a student opening one
    // just landed on the normal home screen. That is why sharing it "later
    // from the list" felt broken too.
    const chosen      = (random ? _shuffled(pool) : pool.slice()).slice(0, count);
    const questionIds = chosen.map(q => q.id).filter(Boolean);
    if (!questionIds.length) { toast('No questions matched these settings.', 3000); return; }

    // The guest page asks the child for this PIN, so it cannot be blank. A
    // teacher who does not care gets one generated rather than a validation
    // error on a form they thought they had finished.
    let pin = (_el('ta-pin')?.value || '').trim();
    if (!pin) pin = String(Math.floor(1000 + Math.random() * 9000));
    if (!/^\d{4}$/.test(pin)) { toast('The PIN must be exactly 4 digits.', 2500); return; }

    const btn = _el('ta-build-btn');
    const restore = () => { if (btn) { btn.disabled = false; btn.textContent = '🔗 Generate Assignment Link'; } };
    if (btn) { btn.disabled = true; btn.textContent = 'Creating…'; }

    let res = null, rpcErr = null;
    try {
      if (typeof _sb === 'undefined' || !_sb) throw new Error('offline');
      const before = await _sb.auth.getSession();
      const creator = before.data?.session?.user?.id;
      if (!creator || !isTeacher()) throw new Error('Sign in required');
      const args = {
        p_title:           label,
        p_subject_pack_id: pack.id,
        p_chapter_ids:     chapters,
        p_question_ids:    questionIds,
        p_pin:             pin,
        // A test is timed, practice is not. count*2 minutes is the same
        // allowance the exam screen gives per question.
        p_duration_mins:   mode === 'test' ? Math.max(5, count * 2) : null,
      };
      if (access !== 'legacy') {
        delete args.p_pin;
        args.p_access = access;
        args.p_classroom = classroom;
      }
      const r = await _sb.rpc(access === 'legacy' ? 'guest_assignment_create' : 'teacher_guest_create_assignment', args);
      const after = await _sb.auth.getSession();
      if (after.data?.session?.user?.id !== creator || !isTeacher()) {
        restore();
        return;
      }
      res = r.data; rpcErr = r.error;
    } catch (e) { rpcErr = e; }

    if (rpcErr || !res || res.ok !== true) {
      restore();
      toast(_createError(res, rpcErr), 4500);
      return;
    }

    const id     = 'ta_' + Date.now();
    const config = { id, label, subject: pack.id, chapters, difficulty, count, random, mode,
                     code: res.code, pin: access === 'legacy' ? pin : null, access, serverId: res.id, createdAt: Date.now() };

    _newShare = config;

    if (_el('ta-label')) _el('ta-label').value = '';
    if (_el('ta-pin'))   _el('ta-pin').value   = '';
    document.querySelectorAll('#ta-chapter-opts-container input[type=checkbox]').forEach(cb => cb.checked = false);

    TeacherWorkspace.rememberPin(res.id, pin);
    TeacherWorkspace.refresh();
    restore();

    // The point of this change: the link is in front of the teacher NOW, with
    // WhatsApp one tap away, instead of two navigations into the Assignments
    // tab to find the row they just created.
    shareAssignment(id);
    if (typeof res.assignments_left_today === 'number' && res.assignments_left_today <= 1) {
      toast(res.assignments_left_today === 0
        ? 'That was your last assignment for today.'
        : 'One more assignment available today.', 3500);
    }
    return config;
  }

  // Order matters: a local shuffle rather than the global shuffle() the file
  // header claims, because no such global is actually defined anywhere.
  function _shuffled(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Every failure guest_assignment_create() can return, in words a teacher can
  // act on. A generic "could not create" would leave someone who hit the daily
  // cap pressing the same button all afternoon.
  function _createError(res, err) {
    const code = res && res.error;
    if (code === 'pending_approval')  return 'Your teacher account is still awaiting approval.';
    if (code === 'not_a_teacher' ||
        code === 'not_approved')      return 'Only an approved teacher account can create shareable assignments.';
    if (code === 'not_authenticated') return 'Please sign in again to create an assignment.';
    if (code === 'daily_limit')       return res.limit === 0
      ? 'Creating assignments is switched off at the moment. Please contact an administrator.'
      : `Daily limit reached (${res.limit} per day). Try again tomorrow.`;
    if (code === 'invalid_pin')       return 'The PIN must be exactly 4 digits.';
    if (code === 'no_questions')      return 'No questions matched these settings.';
    // ⚠ PostgREST puts PGRST202 in err.CODE, not err.message - a missing
    // function reads "Could not find the function ... in the schema cache", which
    // matched nothing here and fell through to the generic "try again". Pressing
    // the button again then reproduced it forever with no clue why.
    const msg = [err && err.code, err && err.message, err && err.details].filter(Boolean).join(' ');
    if (/PGRST202|PGRST205|42883|42P01|does not exist|schema cache/i.test(msg))
      return 'Assignment sharing needs a database update that has not been applied yet. Please contact an administrator.';
    // ⚠ teacher_guest_create_assignment reports its refusals with RAISE
    // EXCEPTION, not {ok:false}. Those arrive as P0001 with the message already
    // written for a teacher ('Add pupils first or choose nickname entry'), so
    // showing it beats replacing it with 'please try again'.
    if ((err && err.code) === 'P0001' && err.message && err.message.length < 120) return err.message;
    if (/offline|fetch|network/i.test(msg))
      return 'No connection — an assignment link has to be created online.';
    return 'Could not create the assignment. Please try again.';
  }

  // ── Generate + copy shareable link ────────────
  // ── Sharing a saved assignment ─────────────────
  // /a/<CODE> is the real, working link (netlify.toml rewrites it to
  // guest.html). The child needs the PIN as well, so every share path carries
  // both — a link on its own would strand them on the PIN prompt.
  function _shareUrl(code) { return `${location.origin}/a/${code}`; }

  function _shareMessage(a) {
    const what = a.mode === 'test' ? 'timed practice' : 'practice';
    const entry = a.access === 'classroom_pin' ? 'Enter your own private 4-digit pupil PIN.' : a.access === 'nickname' ? 'Enter your nickname. No PIN needed.' : `PIN: ${a.pin}`;
    return `📋 ${a.label}\n\nYour ${what} (${a.count} questions):\n${_shareUrl(a.code)}\n\n${entry}`;
  }

  let _shareId = null;
  let _newShare = null;
  if (typeof _sb !== 'undefined' && _sb) _sb.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_OUT') { _newShare = null; closeShare(); }
  });

  function shareAssignment(id) {
    const a = _newShare?.id === id ? _newShare : null;
    if (!a) return;
    // Assignments saved before the link was wired to a real code cannot be
    // shared - and saying so is better than copying a link that goes nowhere,
    // which is exactly what this feature used to do.
    if (!a.code) {
      toast('This assignment was created before sharing worked — please create a new one.', 4500);
      return;
    }
    _shareId = id;
    const set = (elId, val) => { const el = _el(elId); if (el) el.textContent = val; };
    set('ta-share-title', a.label);
    set('ta-share-pin', a.access === 'classroom_pin' ? 'Your own pupil PIN' : a.access === 'nickname' ? 'No PIN needed' : a.pin || '----');
    set('ta-share-meta',  `${a.count} questions · ${a.mode === 'test' ? '⏱ Timed practice' : '🔍 Practice'}`);
    const linkEl = _el('ta-share-link');
    if (linkEl) linkEl.value = _shareUrl(a.code);
    const nativeBtn = _el('ta-share-native');
    if (nativeBtn) nativeBtn.classList.toggle('hidden', !navigator.share);
    _el('modal-share-assignment')?.classList.remove('hidden');
  }

  function closeShare() {
    _el('modal-share-assignment')?.classList.add('hidden');
    _shareId = null;
  }

  function _current() {
    return _newShare?.id === _shareId ? _newShare : null;
  }

  function shareCopy() {
    const a = _current(); if (!a) return;
    const text = _shareMessage(a);
    if (!navigator.clipboard?.writeText) { prompt('Copy this and send it to your students:', text); return; }
    navigator.clipboard.writeText(text)
      .then(() => toast('Link and PIN copied! 📋', 2500))
      .catch(() => prompt('Copy this and send it to your students:', text));
  }

  function shareWhatsApp() {
    const a = _current(); if (!a) return;
    window.open('https://wa.me/?text=' + encodeURIComponent(_shareMessage(a)), '_blank', 'noopener');
  }

  async function shareNative() {
    const a = _current(); if (!a) return;
    if (!navigator.share) return shareCopy();
    try {
      await navigator.share({ title: a.label, text: _shareMessage(a) });
    } catch (_) { /* the user dismissed the sheet - not an error */ }
  }

  // Kept because older markup and any saved page may still call it by name.
  function copyLink(id) { shareAssignment(id); }

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
    isTeacher, render, switchTab, subjectChange, gradeChange,
    buildAssignment, copyLink, deleteAssignment,
    shareAssignment, closeShare, shareCopy, shareWhatsApp, shareNative,
    saveResult, getAttemptCount, hasRetry, allowRetry, removeResult, showAnswers,
  };
})();

// ── Teacher Materials (Supabase Storage) ──────────────────────────────────────
const TeacherMaterials = (() => {
  const BUCKET = 'learning-materials';

  function _status(msg, color) {
    const el = document.getElementById('tm-upload-status');
    if (!el) return;
    el.textContent = msg;
    el.style.color = color || '';
  }

  async function upload() {
    const title = document.getElementById('tm-title')?.value.trim();
    const file  = document.getElementById('tm-file')?.files[0];

    if (!title) { _status('Please enter a title.', '#e53e3e'); return; }
    if (!file)  { _status('Please choose a file.', '#e53e3e'); return; }
    if (file.size > 10 * 1024 * 1024) { _status('File must be under 10 MB.', '#e53e3e'); return; }

    _status('Uploading…');

    const user = _sb.auth.getUser ? (await _sb.auth.getUser()).data?.user : null;
    if (!user) { _status('You must be signed in.', '#e53e3e'); return; }

    const ext      = file.name.split('.').pop();
    const filePath = `${user.id}/${Date.now()}.${ext}`;

    const { error: upErr } = await _sb.storage.from(BUCKET).upload(filePath, file);
    if (upErr) { _status('Upload failed: ' + upErr.message, '#e53e3e'); return; }

    const description = document.getElementById('tm-description')?.value.trim() || null;
    const grade       = parseInt(document.getElementById('tm-grade')?.value) || null;
    const subject     = document.getElementById('tm-subject')?.value || null;

    const { error: dbErr } = await _sb.from('learning_materials').insert({
      teacher_id: user.id,
      title,
      description,
      subject,
      grade,
      file_path: filePath,
      file_name: file.name,
      file_size: file.size,
    });

    if (dbErr) {
      await _sb.storage.from(BUCKET).remove([filePath]);
      _status('Could not save file info: ' + dbErr.message, '#e53e3e');
      return;
    }

    _status('Uploaded successfully!', '#276749');
    document.getElementById('tm-title').value       = '';
    document.getElementById('tm-description').value = '';
    document.getElementById('tm-file').value         = '';
    load();
  }

  async function load() {
    const list = document.getElementById('tm-list');
    if (!list) return;
    list.innerHTML = '<p class="text-sm text-gray-400 dark:text-gray-500">Loading…</p>';

    const { data, error } = await _sb.from('learning_materials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) { list.innerHTML = '<p class="text-sm text-red-500">Could not load files.</p>'; return; }
    if (!data?.length) { list.innerHTML = '<p class="text-sm text-gray-400 dark:text-gray-500">No files uploaded yet.</p>'; return; }

    list.innerHTML = data.map(f => `
      <div class="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-600">
        <div class="min-w-0 flex-1">
          <p class="text-sm font-semibold text-gray-800 dark:text-white truncate">${_attr(f.title)}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            ${f.subject ? f.subject + ' · ' : ''}${f.grade ? 'Grade ' + f.grade + ' · ' : ''}${_fmtSize(f.file_size)}
          </p>
          ${f.description ? `<p class="text-xs text-gray-400 dark:text-gray-500 truncate">${_attr(f.description)}</p>` : ''}
        </div>
        <div class="flex gap-2 ml-3 shrink-0">
          <button onclick="TeacherMaterials.getLink('${_attr(f.file_path)}')"
            class="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-lg font-semibold">
            🔗 Link
          </button>
          <button onclick="TeacherMaterials.remove('${_attr(f.id)}','${_attr(f.file_path)}')"
            class="text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-3 py-1 rounded-lg font-semibold">
            Delete
          </button>
        </div>
      </div>`).join('');
  }

  async function getLink(filePath) {
    const { data, error } = await _sb.storage.from(BUCKET).createSignedUrl(filePath, 3600);
    if (error || !data?.signedUrl) { toast('Could not generate link.', 2000); return; }
    try {
      await navigator.clipboard.writeText(data.signedUrl);
      toast('Link copied! Valid for 1 hour.', 2500);
    } catch {
      prompt('Copy this link (valid 1 hour):', data.signedUrl);
    }
  }

  async function remove(id, filePath) {
    if (!confirm('Delete this file? This cannot be undone.')) return;
    await _sb.storage.from(BUCKET).remove([filePath]);
    await _sb.from('learning_materials').delete().eq('id', id);
    load();
  }

  function _fmtSize(bytes) {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  return { upload, load, getLink, remove };
})();
