'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice - Teacher Mode
//  Loads LAST (after auth.js).
//  Relies on globals: toast(), showScreen(), CHAPTERS, STATIC_QUESTIONS, shuffle()
// ══════════════════════════════════════════════

const TeacherMode = (() => {
  const STORE_KEY = 'mathmaster_teacher';
  // Where the teacher was: tab, open classroom, results selection. Read back
  // on render() so a refresh lands where they left off. Owner-scoped so two
  // teachers sharing a device never inherit each other's place.
  const LOC_KEY = 'psac_teacher_loc_v1';
  // ⚠ ONE main destination. 'create' and 'results' are still real tabs and
  // switchTab() still opens them - they are simply not somewhere a teacher
  // PICKS, because the same two jobs also live inside every classroom and a
  // teacher could not tell the two "Results" apart. You reach them from the
  // class they belong to, and leave by the Back button they now carry.
  const MAIN_TABS = ['home'];
  const DETAIL_TABS = ['create', 'results'];
  const MORE_TABS = ['materials', 'messages', 'gradebook', 'assignments', 'settings'];
  const ALL_TABS = MAIN_TABS.concat(DETAIL_TABS, MORE_TABS);

  function _getData() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || { pin: null, assignments: [] }; }
    catch(e) { return { pin: null, assignments: [] }; }
  }

  function _saveData(d) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(d)); } catch(e) {}
  }

  function _el(id) { return document.getElementById(id); }
  const _esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

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

  // ── Where the teacher is (survives refresh) ────
  function _ownerId() {
    const p = (typeof Auth !== 'undefined' && Auth.getParentProfile) ? Auth.getParentProfile() : null;
    return p && p.id ? String(p.id) : '';
  }
  function _readLoc() {
    try {
      const loc = JSON.parse(localStorage.getItem(LOC_KEY)) || {};
      return loc.owner && loc.owner === _ownerId() ? loc : {};
    } catch(_) { return {}; }
  }
  function _saveLoc(patch) {
    const loc = Object.assign(_readLoc(), patch, { owner: _ownerId() });
    try { localStorage.setItem(LOC_KEY, JSON.stringify(loc)); } catch(_) {}
    return loc;
  }
  function getLocation() { return _readLoc(); }
  function rememberClassroom(id, name, section) {
    _saveLoc({ classId: id || null, className: name || '', section: section || 'overview' });
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
  let _restoredClass = '';

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
    _restoredClass = '';             // every render is a fresh chance to restore
    _buildSubjectSelect();
    _buildChapterCheckboxes();
    _ensureSubjectLoaded();          // not awaited: the list below must paint now
    _initDueDate();
    _renderClassPicker();            // show form immediately with whatever is cached
    const loc = _readLoc();
    const tab = ALL_TABS.includes(loc.tab) ? loc.tab : 'home';
    if (typeof TeacherWorkspace !== 'undefined') TeacherWorkspace.refresh();
    switchTab(tab, { restoring: true });
    if (typeof TeacherGuestClasses !== 'undefined') {
      TeacherGuestClasses.refresh().then(() => { _renderClassPicker(); _restoreClassroom(loc); }).catch(() => _renderClassPicker());
      TeacherGuestClasses.accessChanged();
    }
    shareChoiceChanged();
  }

  // Reopen the classroom the teacher was inside before the refresh - once,
  // and only if it still exists and is not already open.
  function _restoreClassroom(loc) {
    if (!loc || !loc.classId || typeof TeacherClassroomDetail === 'undefined') return;
    if (_restoredClass === loc.classId || TeacherClassroomDetail.isOpen?.()) return;
    const cls = (typeof TeacherGuestClasses !== 'undefined' ? TeacherGuestClasses.getClasses() : []).find(c => c.id === loc.classId);
    if (!cls) { _saveLoc({ classId: null }); return; }
    _restoredClass = loc.classId;
    TeacherClassroomDetail.open(cls.id, cls.name, { section: loc.section });
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
      `<label class="ta-chapter-opt">
        <input type="checkbox" value="${_esc(c.id)}" onchange="TeacherMode.chaptersChanged()">
        <span>${c.icon || ''} ${_esc(c.name)}</span>
      </label>`
    ).join('');
  }

  async function subjectChange() {
    _buildChapterCheckboxes();
    _applyLevelWords();
    _refreshPool();
    await _ensureSubjectLoaded();
    _refreshPool();
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
  function chapterName(cid) { const c = _findChapter(cid); return c ? c.name : ''; }
  function packLabel(id) {
    const p = _packs().find(x => x.id === id);
    return p ? `${p.icon || ''} ${p.name}`.trim() : String(id || '').replace(/^grade(\d+)-/, 'G$1 ').replace(/-/g, ' ');
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
            <button onclick="TeacherMode.duplicateAssignment('${a.id}')"
              title="Duplicate - opens form pre-filled"
              class="text-xs bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 px-2 py-1.5 rounded-lg transition-colors">
              📋
            </button>
            <button onclick="TeacherMode.deleteAssignment('${a.id}')"
              class="text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/60 px-2 py-1.5 rounded-lg transition-colors">
              🗑
            </button>
          </div>
        </div>`;
    }).join('');
  }

  // ── Set Work: who is it for ────────────────────
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
        data-cid="${_esc(c.id)}" data-pupils="${Number(c.pupils) || 0}" data-cname="${_esc(c.name)}" title="${_esc(c.name)}" aria-pressed="${sel}">
        <span class="ta-chip-name">&#x1F3EB; ${_esc(c.name)}</span>
        <span class="ta-chip-pupils">${c.pupils} pupil${c.pupils===1?'':'s'}</span>
      </button>`;
    }).join('') +
    `<button type="button" class="ta-class-chip ${!current ? 'ta-class-chip-sel' : ''}"
      data-cid="" data-pupils="0" data-cname="" title="No classroom - share an open link" aria-pressed="${!current}">
      <span class="ta-chip-name">&#x1F517; No classroom</span>
      <span class="ta-chip-pupils">open link only</span>
    </button>`;

    if (!active.length) {
      picker.insertAdjacentHTML('beforeend',
        '<p class="ta-chip-hint">No classrooms yet. Create one under &#x1F3EB; Classrooms to give pupils their own PINs.</p>');
    }

    picker.querySelectorAll('[data-cid]').forEach(btn => {
      btn.onclick = () => _chooseClassroom(btn.dataset.cid, Number(btn.dataset.pupils));
    });

    // Auto-select first classroom if nothing chosen yet
    if (!current) {
      const firstBtn = picker.querySelector('[data-cid]');
      if (firstBtn) _chooseClassroom(firstBtn.dataset.cid, Number(firstBtn.dataset.pupils));
    } else {
      _syncShareChoice(current, Number(picker.querySelector(`[data-cid="${CSS.escape(current)}"]`)?.dataset.pupils || 0));
    }
  }

  function _chooseClassroom(cid, pupils) {
    const picker = _el('ta-class-picker');
    const classEl = _el('ta-classroom');
    if (classEl) classEl.value = cid;
    picker?.querySelectorAll('[data-cid]').forEach(b => {
      const on = b.dataset.cid === cid;
      b.classList.toggle('ta-class-chip-sel', on);
      b.setAttribute('aria-pressed', String(on));
    });
    _syncShareChoice(cid, pupils);
    _renderPupilPicker(cid);
  }

  // The two plain-language sharing choices. PIN entry needs a classroom WITH
  // pupils; otherwise the only honest option is the open link.
  function _syncShareChoice(cid, pupils) {
    const pinOpt = _el('ta-share-opt-pin');
    const pinInput = pinOpt?.querySelector('input');
    const linkInput = _el('ta-share-opt-link')?.querySelector('input');
    const canPin = !!cid && pupils > 0;
    if (pinInput) { pinInput.disabled = !canPin; }
    pinOpt?.classList.toggle('ta-share-opt-disabled', !canPin);
    if (canPin) {
      if (pinInput && linkInput) { if (_linkPreferred) linkInput.checked = true; else pinInput.checked = true; }
    } else if (linkInput) linkInput.checked = true;
    shareChoiceChanged();
  }

  function chooseClassroom(cid) {
    const chip = _el('ta-class-picker')?.querySelector(`[data-cid="${CSS.escape(cid || '')}"]`);
    if (chip) _chooseClassroom(chip.dataset.cid, Number(chip.dataset.pupils));
  }
  function setShareMode(mode) {
    const input = document.querySelector(`input[name="ta-share"][value="${mode === 'nickname' ? 'nickname' : 'classroom_pin'}"]`);
    if (input && !input.disabled) { input.checked = true; shareChoiceChanged(); }
  }

  // Set only by the teacher's own tap on a sharing card, so a classroom with
  // pupils always starts on PIN entry until they say otherwise.
  let _linkPreferred = false;
  function shareChoiceChanged(byTeacher) {
    const checked = document.querySelector('input[name="ta-share"]:checked');
    if (byTeacher === true && checked) _linkPreferred = checked.value === 'nickname';
    const mode = checked ? checked.value : (_el('ta-access')?.value || 'nickname');
    const accessEl = _el('ta-access');
    if (accessEl && accessEl.value !== 'legacy') accessEl.value = mode;
    document.querySelectorAll('.ta-share-opt').forEach(l => l.classList.toggle('ta-share-opt-sel', l.querySelector('input')?.checked));
    const cid = _el('ta-classroom')?.value || '';
    const pupils = Number(_el('ta-class-picker')?.querySelector(`[data-cid="${CSS.escape(cid)}"]`)?.dataset.pupils || 0);
    const note = _el('ta-share-note');
    if (note) {
      note.textContent = mode === 'classroom_pin'
        ? 'One link for the class. Each pupil types their own four-digit PIN, so results are saved under their name.'
        : cid && pupils === 0
          ? 'This classroom has no pupils yet, so the work will use an open link. Add pupils under Classrooms to use PINs.'
          : 'Anyone with the link can open the work, type a name and begin. Good for online classes and revision at home.';
    }
    const pupilsWrap = _el('ta-pupils-wrap');
    if (pupilsWrap) pupilsWrap.hidden = mode !== 'classroom_pin' || !cid;
    _updateBuildButton();
  }

  // Roster for the "Which pupils?" option. Cached per classroom for the
  // session; the whole class is ticked by default so the option changes
  // nothing unless the teacher unticks somebody.
  const _rosterCache = new Map();
  async function _renderPupilPicker(cid) {
    const list = _el('ta-pupils-list');
    if (!list) return;
    if (!cid) { list.innerHTML = ''; return; }
    let roster = _rosterCache.get(cid);
    if (!roster) {
      list.innerHTML = '<p class="ta-form-note">Loading pupils…</p>';
      try {
        if (typeof _sb === 'undefined' || !_sb) throw new Error('offline');
        const { data, error } = await _sb.rpc('teacher_guest_manage', { p_action: 'roster', p_classroom: cid });
        if (error || !data?.ok) throw new Error(error?.message || 'roster');
        roster = (data.pupils || []).filter(p => p.active);
        _rosterCache.set(cid, roster);
      } catch (_) {
        list.innerHTML = `<p class="ta-form-note">Could not load the pupil list. The work will go to the whole class. <button type="button" class="ta-link-btn" onclick="TeacherMode.reloadPupils()">Try again</button></p>`;
        return;
      }
      if ((_el('ta-classroom')?.value || '') !== cid) return;
    }
    if (!roster.length) { list.innerHTML = '<p class="ta-form-note">No pupils in this classroom yet.</p>'; return; }
    list.innerHTML = `<div class="ta-pupils-tools"><button type="button" class="ta-link-btn" onclick="TeacherMode.tickPupils(true)">Tick all</button> · <button type="button" class="ta-link-btn" onclick="TeacherMode.tickPupils(false)">Untick all</button></div>` +
      roster.map(p => `<label class="ta-pupil-opt"><input type="checkbox" value="${_esc(p.id)}" checked onchange="TeacherMode.pupilsChanged()"><span>${_esc(p.name)}</span></label>`).join('');
    _updateBuildButton();
  }
  function reloadPupils() { const cid = _el('ta-classroom')?.value || ''; _rosterCache.delete(cid); _renderPupilPicker(cid); }
  function tickPupils(on) { document.querySelectorAll('#ta-pupils-list input[type=checkbox]').forEach(cb => { cb.checked = on; }); _updateBuildButton(); }
  function pupilsChanged() { _updateBuildButton(); }
  function _chosenPupils() {
    const boxes = [...document.querySelectorAll('#ta-pupils-list input[type=checkbox]')];
    if (!boxes.length || _el('ta-pupils-wrap')?.hidden) return null;
    const ticked = boxes.filter(b => b.checked).map(b => b.value);
    return ticked.length === boxes.length ? null : ticked;
  }
  function _updateBuildButton() {
    const btn = _el('ta-build-btn');
    if (!btn || btn.dataset.busy === '1') return;
    const mode = _el('ta-access')?.value || 'nickname';
    const chosen = _chosenPupils();
    btn.textContent = mode === 'classroom_pin'
      ? (chosen ? `✏️ Assign to ${chosen.length} pupil${chosen.length === 1 ? '' : 's'}` : '✏️ Assign to the whole class')
      : '🔗 Create the link';
    refreshSummary();
  }

  // ── Set Work: when is it due ───────────────────
  function _ymd(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  function _initDueDate() {
    const due = _el('ta-due');
    if (!due) return;
    const today = new Date();
    due.min = _ymd(today);
    if (!due.value || due.value < due.min) setDueInDays(7);
    else dueChanged();
  }
  function setDueInDays(n) {
    const due = _el('ta-due');
    if (!due) return;
    const d = new Date(); d.setDate(d.getDate() + Number(n));
    due.value = _ymd(d);
    dueChanged();
  }
  function dueChanged() {
    const due = _el('ta-due');
    const note = _el('ta-due-note');
    document.querySelectorAll('.ta-due-chips [data-due-days]').forEach(b => {
      const d = new Date(); d.setDate(d.getDate() + Number(b.dataset.dueDays));
      b.classList.toggle('ta-due-chip-sel', due?.value === _ymd(d));
    });
    if (!note || !due) return;
    const when = _dueDateValue();
    note.textContent = when
      ? `Pupils can open the work until the end of ${when.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}.`
      : 'Pick a due date. Without one the work closes 48 hours after you create it.';
    refreshSummary();
  }
  // End of the chosen day on the teacher's device - the assignment closes then.
  function _dueDateValue() {
    const v = _el('ta-due')?.value;
    if (!v || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return null;
    const [y, m, d] = v.split('-').map(Number);
    const when = new Date(y, m - 1, d, 23, 59, 59);
    return Number.isFinite(when.getTime()) && when.getTime() > Date.now() ? when : null;
  }
  function modeChanged() {
    const wrap = _el('ta-duration-wrap');
    if (wrap) wrap.hidden = (_el('ta-mode')?.value || 'practice') !== 'test';
    refreshSummary();
  }


  // ── Set Work: one question per screen ──────────
  //  ⚠ The wizard OWNS NO STATE. Every control is the same element
  //  _buildAssignment() has always read; this decides which one a teacher is
  //  looking at and refuses to move on until it is answered. A hidden input
  //  still answers .value, so a step nobody visited still publishes correctly.
  const WIZ_STEPS = 5;
  let _wizStep = 1;

  function _scope() { return document.querySelector('input[name="ta-scope"]:checked')?.value || 'all'; }
  function _tickedChapters() {
    return Array.from(document.querySelectorAll('#ta-chapter-opts-container input[type=checkbox]:checked')).map(cb => cb.value);
  }
  function _paintScope() {
    const pick = _scope() === 'pick';
    const wrap = _el('ta-chapter-wrap');
    if (wrap) wrap.hidden = !pick;
    document.querySelectorAll('.ta-scope-opt').forEach(l => l.classList.toggle('ta-scope-opt-sel', !!l.querySelector('input')?.checked));
  }
  // Called by the teacher's own tap. "The whole subject" has to MEAN the whole
  // subject: a tick left behind from an earlier visit would silently narrow the
  // work without appearing anywhere on screen.
  function scopeChanged() {
    if (_scope() === 'all') document.querySelectorAll('#ta-chapter-opts-container input[type=checkbox]').forEach(cb => { cb.checked = false; });
    _paintScope();
    _refreshPool();
  }
  // Called when we ARRIVE at the step. prefillPractice() and _duplicateAssignment()
  // tick chapters directly, so the radio has to follow the ticks - never the
  // other way round, which would wipe the prefill.
  function _syncScope() {
    const has = _tickedChapters().length > 0;
    const pick = document.querySelector('input[name="ta-scope"][value="pick"]');
    const all  = document.querySelector('input[name="ta-scope"][value="all"]');
    if (has && pick) pick.checked = true;
    else if (!has && all && !pick?.checked) all.checked = true;
    _paintScope();
  }
  function chaptersChanged() { _refreshPool(); }

  // Exactly the pool _buildAssignment() will search, counted the same way -
  // a friendlier number that the publish step then contradicts is worse than
  // no number at all.
  function _poolSize() {
    const pack = _selectedPack();
    if (!pack || typeof STATIC_QUESTIONS === 'undefined') return null;
    const ids = new Set((pack._chapters || pack.chapters || []).map(c => c.id));
    let pool = STATIC_QUESTIONS.filter(q => ids.has(q.chapterId));
    if (!pool.length) return null;                       // subject still loading
    const chapters = _tickedChapters();
    if (chapters.length) pool = pool.filter(q => chapters.includes(q.chapterId));
    const diff = parseInt(_el('ta-difficulty')?.value || '0');
    if (diff) pool = pool.filter(q => q.difficulty === diff);
    return new Set(pool.filter(q => q.id).map(q => q.id)).size;
  }

  function _refreshPool() {
    const note = _el('ta-pool-note');
    const pack = _selectedPack();
    const n = _poolSize();
    if (note) {
      note.textContent = n === null
        ? (pack ? `Loading the ${pack.name} questions…` : '')
        : (_scope() === 'pick' && !_tickedChapters().length)
          ? 'Tick the chapters you want to use.'
          : `${n} question${n === 1 ? '' : 's'} to choose from.`;
    }
    refreshSummary();
  }

  // ⚠ Level 4 does not mean the same thing in every pack: word problems in
  // maths, a multi-verb cloze in French, an extended passage in English, an
  // applied scenario elsewhere. So the words follow the SUBJECT - a French
  // teacher is never promised "word problems" a French pack cannot deal.
  function _levelWords(pack) {
    const subject = String(pack?.id || '').replace(/^grade\d+-/, '');
    const hardest =
      subject === 'maths' ? ['🏆 Word problems', 'A story they have to work out for themselves.']
      : subject === 'french' ? ['🏆 Longer exercises', 'A whole passage with several verbs to get right.']
      : subject === 'english' ? ['🏆 Longer passages', 'Reading a longer text and writing a full answer.']
      : ['🏆 Applied questions', 'Using what they know in a real situation, not just remembering it.'];
    return [
      ['🔀 A mix of every level', 'The safest choice: easy, medium and hard together, like a real paper.'],
      ['⭐ Easy', 'Reminds them of the basics. Good after a hard week.'],
      ['⭐⭐ Medium', 'About what the class is working on now.'],
      ['⭐⭐⭐ Hard', 'Stretches the pupils who always finish early.'],
      hardest,
    ];
  }
  function _applyLevelWords() {
    const sel = _el('ta-difficulty');
    if (!sel) return;
    const words = _levelWords(_selectedPack());
    Array.from(sel.options || []).forEach((o, i) => { if (words[i]) o.textContent = words[i][0]; });
    const note = _el('ta-difficulty-note');
    const chosen = words[parseInt(sel.value || '0')];
    if (note) note.textContent = chosen ? chosen[1] : '';
  }
  function difficultyChanged() { _applyLevelWords(); _refreshPool(); }

  function countChanged() {
    const n = Number(_el('ta-count')?.value || 10);
    const note = _el('ta-count-note');
    if (note) note.textContent = `Most pupils will need about ${Math.max(3, Math.round(n * 1.5))} minutes.`;
    refreshSummary();
  }

  const LEVEL_ADJECTIVE = ['mixed', 'easy', 'medium', 'hard', 'challenge'];

  // The whole assignment in one sentence a teacher can check at a glance,
  // because nobody can check six separate controls they answered minutes ago.
  function refreshSummary() {
    const box = _el('ta-wiz-summary');
    if (!box) return;
    const pack = _selectedPack();
    const cid = _el('ta-classroom')?.value || '';
    const cls = (typeof TeacherGuestClasses !== 'undefined' ? TeacherGuestClasses.getClasses() : []).find(c => c.id === cid);
    const mode = _el('ta-access')?.value || 'nickname';
    const chapters = _tickedChapters().map(chapterName).filter(Boolean);
    const what = chapters.length === 1 ? chapters[0]
      : chapters.length ? `${chapters.length} chapters of ${pack ? pack.name : 'the subject'}`
      : `the whole of ${pack ? pack.name : 'the subject'}`;
    const count = Number(_el('ta-count')?.value || 10);
    const level = LEVEL_ADJECTIVE[parseInt(_el('ta-difficulty')?.value || '0')] || 'mixed';
    const when = _dueDateValue();
    const timed = (_el('ta-mode')?.value || 'practice') === 'test';
    const chosen = mode === 'classroom_pin' ? _chosenPupils() : null;
    const target = chosen && cls ? `${chosen.length} pupil${chosen.length === 1 ? '' : 's'} in ${cls.name}`
      : cls ? cls.name : 'anyone you send the link to';
    box.innerHTML =
      '<span class="ta-wiz-summary-kicker">Check this before you send it</span>' +
      `<p><b>${_esc(target)}</b> will get <b>${count} ${level} question${count === 1 ? '' : 's'}</b> on <b>${_esc(what)}</b>${timed ? ', with the clock running' : ', with no timer'}, due <b>${when ? _esc(when.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })) : '48 hours from now'}</b>.</p>` +
      `<p class="ta-wiz-summary-how">${mode === 'classroom_pin'
        ? 'Each pupil types their own four-digit PIN, so every mark is saved under their real name.'
        : 'Anyone who opens the link types a name and starts. There is no PIN, so you cannot be certain who answered.'}</p>`;
  }

  function _wizSteps() { return Array.from(document.querySelectorAll('#ta-create-form .ta-wiz-step')); }

  function gotoStep(n, opts = {}) {
    const step = Math.min(WIZ_STEPS, Math.max(1, Number(n) || 1));
    _wizStep = step;
    _wizSteps().forEach(sec => sec.classList.toggle('hidden', Number(sec.dataset.step) !== step));
    document.querySelectorAll('#ta-create-form .ta-wiz-track [data-dot]').forEach(d => {
      const i = Number(d.dataset.dot);
      d.classList.toggle('on', i === step);
      d.classList.toggle('done', i < step);
    });
    const count = _el('ta-wiz-count');
    if (count) count.textContent = `Step ${step} of ${WIZ_STEPS}`;
    const back = _el('ta-wiz-back'), next = _el('ta-wiz-next');
    if (back) back.hidden = step === 1;
    if (next) next.hidden = step === WIZ_STEPS;
    if (step === 3) { _syncScope(); _refreshPool(); }
    if (step === 4) { _applyLevelWords(); countChanged(); }
    if (step === 5) { _updateBuildButton(); refreshSummary(); }
    if (!opts.silent) _el('ta-create-form')?.scrollIntoView?.({ block: 'start' });
  }
  function currentStep() { return _wizStep; }

  // Every reason a step cannot be left, in the teacher's own words. Nothing
  // here is a new rule: each one is a failure _buildAssignment() would have
  // reported at the very end, moved to the screen that caused it.
  function _stepProblem(step) {
    if (step === 1) {
      const mode = _el('ta-access')?.value || 'nickname';
      if (mode === 'classroom_pin' && !(_el('ta-classroom')?.value || '')) return 'Choose a class, or share an open link instead.';
    }
    if (step === 2 && !_selectedPack()) return 'Choose a subject first.';
    if (step === 3) {
      if (_scope() === 'pick' && !_tickedChapters().length) return 'Tick at least one chapter, or choose “The whole subject”.';
      if (_poolSize() === 0) return 'There are no questions for that choice. Try another chapter or another level.';
    }
    if (step === 4) {
      const have = _poolSize(), want = Number(_el('ta-count')?.value || 10);
      if (have !== null && have < want) return `Only ${have} question${have === 1 ? '' : 's'} match. Ask for fewer, or add a chapter.`;
    }
    return '';
  }

  function wizardNext() {
    const problem = _stepProblem(_wizStep);
    if (problem) { if (typeof toast === 'function') toast(problem, 3500); return; }
    gotoStep(_wizStep + 1);
  }
  function wizardBack() { if (_wizStep === 1) leaveSetWork(); else gotoStep(_wizStep - 1); }

  // Setting work is something you do TO a class, so finishing or abandoning it
  // puts the teacher back inside that class rather than at the top of the app.
  function leaveSetWork() {
    const loc = _readLoc();
    switchTab('home');
    if (loc.classId) { _restoredClass = ''; _restoreClassroom(loc); }
  }

  // ── Tab switching ──────────────────────────────
  function switchTab(tab, opts = {}) {
    // 'classes' was its own tab until the classroom list moved onto Home.
    // Older callers, and a location saved before the change, still name it.
    if (tab === 'classes') tab = 'home';
    if (!ALL_TABS.includes(tab)) tab = 'home';
    closeMore();
    if (tab === 'home') {
      if (typeof TeacherHome !== 'undefined') TeacherHome.render({ silent: true });
      if (typeof TeacherGuestClasses !== 'undefined' && !opts.restoring) TeacherGuestClasses.refresh();
    }
    if (tab === 'materials') TeacherMaterials.load();
    if (tab === 'create')    { _renderClassPicker(); modeChanged(); _applyLevelWords(); if (!opts.keepStep) gotoStep(1, { silent: true }); }
    if (tab === 'results' && typeof TeacherWorkspace !== 'undefined') TeacherWorkspace.showResults(_readLoc().resultsId || '');
    if (tab === 'assignments' && typeof TeacherWorkspace !== 'undefined') TeacherWorkspace.showList(opts.filter || _readLoc().listFilter || 'archived');
    if (tab === 'gradebook') _renderGradebook();
    if (tab === 'messages')  _renderTeacherMessages();
    const inMore = MORE_TABS.includes(tab);
    const _scope = document.getElementById('screen-teacher') || document;
    _scope.querySelectorAll('.ta-tab').forEach(b => {
      b.setAttribute('aria-selected', String(b.dataset.tab === tab));
    });
    const more = _el('ta-more-btn');
    if (more) more.classList.toggle('ta-more-btn-active', inMore);
    document.querySelectorAll('#ta-more-menu [data-more]').forEach(b => b.setAttribute('aria-current', b.dataset.more === tab ? 'page' : 'false'));
    _scope.querySelectorAll('.ta-tab-content').forEach(c => {
      c.classList.toggle('hidden', c.dataset.tab !== tab);
    });
    _saveLoc({ tab });
  }

  function toggleMore(force) {
    const menu = _el('ta-more-menu'), btn = _el('ta-more-btn');
    if (!menu || !btn) return;
    const open = typeof force === 'boolean' ? force : menu.classList.contains('hidden');
    menu.classList.toggle('hidden', !open);
    btn.setAttribute('aria-expanded', String(open));
    if (open) {
      setTimeout(() => document.addEventListener('click', _moreOutside, { once: true }), 0);
      document.addEventListener('keydown', _moreEscape);
      menu.querySelector('[role=menuitem]')?.focus();
    } else document.removeEventListener('keydown', _moreEscape);
  }
  function closeMore() { const menu = _el('ta-more-menu'); if (menu && !menu.classList.contains('hidden')) toggleMore(false); }
  function _moreOutside(e) { if (!e.target.closest?.('.ta-more-wrap')) closeMore(); else if (!_el('ta-more-menu')?.classList.contains('hidden')) document.addEventListener('click', _moreOutside, { once: true }); }
  function _moreEscape(e) { if (e.key === 'Escape') { closeMore(); _el('ta-more-btn')?.focus(); } }

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

    container.innerHTML = `<div class="mb-3 flex justify-end">
      <button onclick="TeacherMode.exportResultsCsv('${assignId}')"
        class="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800/60 px-3 py-1.5 rounded-lg transition-colors font-medium">
        ⬇️ Export CSV</button>
    </div>` + Object.values(grouped).map(attempts => {
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
    const pack = _selectedPack();
    if (!pack) { toast('Please pick a subject first.', 2500); return; }

    const chapters = Array.from(
      document.querySelectorAll('#ta-chapter-opts-container input[type=checkbox]:checked')
    ).map(cb => cb.value);

    const difficulty = parseInt(_el('ta-difficulty')?.value || '0');
    const count      = parseInt(_el('ta-count')?.value || '10');
    const random     = _el('ta-random')?.checked ?? true;
    const mode       = _el('ta-mode')?.value || 'practice';
    const access     = _el('ta-access')?.value || 'legacy';
    const classroom  = _el('ta-classroom')?.value || null;
    const dueAt      = _dueDateValue();
    const pupilIds   = access === 'classroom_pin' ? _chosenPupils() : null;
    if (access === 'classroom_pin' && !classroom) { toast('Choose a classroom, or share an open link instead.', 3500); return; }
    if (pupilIds && !pupilIds.length) { toast('Tick at least one pupil, or tick everyone for the whole class.', 3500); return; }
    if (_el('ta-due')?.value && !dueAt) { toast('Choose a due date that is today or later.', 3000); return; }

    // A name is optional: most teachers just want "Fractions homework" and the
    // subject + chapter already say that.
    const chapterNames = chapters.map(chapterName).filter(Boolean);
    let label = (_el('ta-label')?.value || '').trim();
    if (!label) {
      const what = chapterNames.length === 1 ? chapterNames[0] : chapterNames.length > 1 ? `${chapterNames.length} chapters` : pack.name;
      label = `${what} · ${mode === 'test' ? 'test' : 'homework'} · ${(dueAt || new Date()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`.slice(0, 60);
    }

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
      toast('No questions found for these settings. Try different chapters or difficulty.', 3000);
      return;
    }
    pool = Array.from(new Map(pool.filter(q => q.id).map(q => [q.id, q])).values());
    if (pool.length < count) {
      toast(`Only ${pool.length} questions match. Choose fewer questions or more chapters.`, 4500);
      return;
    }

    // ⚠ The link has to point at something the app can actually open.
    // /a/<CODE> is rewritten to guest.html by netlify.toml and is backed by
    // guest_assignment_create() - a real row, a real code, a real PIN, with
    // results coming back to the Results tab.
    //
    // The previous link was `?assign=<base64 of the config>`, and NOTHING in
    // this repo has ever read an `assign` parameter - no commit in the history
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

    const durationMins = mode === 'test' ? (parseInt(_el('ta-duration')?.value || '0') || Math.max(5, count * 2)) : null;

    const btn = _el('ta-build-btn');
    const restore = () => { if (btn) { btn.disabled = false; btn.dataset.busy = ''; } _updateBuildButton(); };
    if (btn) { btn.disabled = true; btn.dataset.busy = '1'; btn.textContent = 'Creating…'; }

    let res = null, rpcErr = null, warning = '';
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
        p_duration_mins:   durationMins,
      };
      let r;
      if (access !== 'legacy') {
        delete args.p_pin;
        args.p_access = access;
        args.p_classroom = classroom;
        const extra = {};
        if (dueAt) extra.p_due_at = dueAt.toISOString();
        if (pupilIds) extra.p_pupil_ids = pupilIds;
        r = await _sb.rpc('teacher_guest_create_assignment', Object.assign({}, args, extra));
        // ⚠ A database that has not had migrations/20260906_teacher_assignment_
        // due_date_and_pupils.sql applied answers PGRST202 to the nine-argument
        // call. Fall back to the old call, but SAY SO: the due date and pupil
        // choice are then not applied, and a teacher must know that.
        if (Object.keys(extra).length && r.error && _signatureMissing(r.error)) {
          r = await _sb.rpc('teacher_guest_create_assignment', args);
          if (!r.error) warning = 'This database has not been updated for due dates yet, so the work closes 48 hours from now' +
            (pupilIds ? ' and was assigned to the whole class' : '') + '. Ask an administrator to apply the latest migration.';
        }
      } else {
        if (dueAt) { args.p_due_at = dueAt.toISOString(); args.p_expires_hours = Math.max(1, Math.ceil((dueAt.getTime() - Date.now()) / 3600000)); }
        r = await _sb.rpc('guest_assignment_create', args);
      }
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
    const cname  = _el('ta-class-picker')?.querySelector(`[data-cid="${CSS.escape(classroom || '')}"]`)?.dataset.cname || '';
    const config = { id, label, subject: pack.id, chapters, difficulty, count, random, mode,
                     code: res.code, pin: access === 'legacy' ? pin : null, access, serverId: res.id, createdAt: Date.now(),
                     classroomId: classroom, classroomName: cname, dueAt: warning ? null : (dueAt ? dueAt.toISOString() : null),
                     pupils: warning ? null : pupilIds, warning };

    _newShare = config;

    if (_el('ta-label')) _el('ta-label').value = '';
    if (_el('ta-pin'))   _el('ta-pin').value   = '';
    document.querySelectorAll('#ta-chapter-opts-container input[type=checkbox]').forEach(cb => cb.checked = false);
    tickPupils(true);

    TeacherWorkspace.rememberPin(res.id, pin);
    TeacherWorkspace.refresh();
    if (typeof TeacherHome !== 'undefined') TeacherHome.invalidate();
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

  function _signatureMissing(err) {
    const msg = [err && err.code, err && err.message, err && err.details, err && err.hint].filter(Boolean).join(' ');
    return /PGRST202|42883|Could not find the function|schema cache/i.test(msg);
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
      return 'No connection - an assignment link has to be created online.';
    return 'Could not create the assignment. Please try again.';
  }

  // ── Generate + copy shareable link ────────────
  // ── Sharing a saved assignment ─────────────────
  // /a/<CODE> is the real, working link (netlify.toml rewrites it to
  // guest.html). The child needs the PIN as well, so every share path carries
  // both - a link on its own would strand them on the PIN prompt.
  function _shareUrl(code) { return `${location.origin}/a/${code}`; }

  function _shareMessage(a) {
    const what = a.mode === 'test' ? 'timed practice' : 'practice';
    const entry = a.access === 'classroom_pin' ? 'Enter your own private 4-digit pupil PIN.' : a.access === 'nickname' ? 'Enter your nickname. No PIN needed.' : `PIN: ${a.pin}`;
    const due = a.dueAt ? `\nDue: ${new Date(a.dueAt).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}` : '';
    return `📋 ${a.label}\n\nYour ${what} (${a.count} questions):\n${_shareUrl(a.code)}\n\n${entry}${due}`;
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
      toast('This assignment was created before sharing worked - please create a new one.', 4500);
      return;
    }
    _shareId = id;
    const set = (elId, val) => { const el = _el(elId); if (el) el.textContent = val; };
    set('ta-share-title', a.label);
    set('ta-share-pin', a.access === 'classroom_pin' ? 'Each pupil types their own PIN' : a.access === 'nickname' ? 'They type their name - no PIN' : `PIN ${a.pin || '----'}`);
    set('ta-share-meta',  `${a.count} questions · ${a.mode === 'test' ? '⏱ Timed' : '🔍 Practice'}${a.pupils ? ` · ${a.pupils.length} chosen pupil${a.pupils.length === 1 ? '' : 's'}` : ''}`);
    set('ta-share-class', a.classroomName || 'Open link (no classroom)');
    set('ta-share-due', a.dueAt ? new Date(a.dueAt).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) : 'Closes in 48 hours');
    const warn = _el('ta-share-warning');
    if (warn) { warn.textContent = a.warning || ''; warn.classList.toggle('hidden', !a.warning); }
    const linkEl = _el('ta-share-link');
    if (linkEl) linkEl.value = _shareUrl(a.code);
    const nativeBtn = _el('ta-share-native');
    if (nativeBtn) nativeBtn.classList.toggle('hidden', !navigator.share);
    _drawShareQr(_shareUrl(a.code));
    _el('modal-share-assignment')?.classList.remove('hidden');
  }

  // QR only when the bundled encoder actually loads (it is optional in this
  // app); otherwise the block stays hidden rather than showing a blank square.
  async function _drawShareQr(url) {
    const wrap = _el('ta-share-qr-wrap'), canvas = _el('ta-share-qr');
    if (!wrap || !canvas) return;
    wrap.classList.add('hidden');
    if (typeof _loadLocalQRCode !== 'function') return;
    try {
      const qr = await _loadLocalQRCode();
      if (!qr?.toCanvas || _el('ta-share-link')?.value !== url) return;
      qr.toCanvas(canvas, url, { width: 160, margin: 1, color: { dark: '#1e293b', light: '#ffffff' } }, err => {
        if (!err) wrap.classList.remove('hidden');
      });
    } catch (_) { /* no QR - the link and buttons are enough */ }
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
      .then(() => toast('Message copied! 📋', 2500))
      .catch(() => prompt('Copy this and send it to your students:', text));
  }

  function shareCopyLink() {
    const a = _current(); if (!a) return;
    const url = _shareUrl(a.code);
    if (!navigator.clipboard?.writeText) { _el('ta-share-link')?.select(); return; }
    navigator.clipboard.writeText(url).then(() => toast('Link copied! 📋', 2000)).catch(() => _el('ta-share-link')?.select());
  }

  function shareWhatsApp() {
    const a = _current(); if (!a) return;
    const wa = 'https://wa.me/?text=' + encodeURIComponent(_shareMessage(a));
    // Use an <a> tag click so the browser treats it as a navigation, not a
    // programmatic popup - popup blockers cannot intercept anchor navigations.
    const link = document.createElement('a');
    link.href = wa; link.target = '_blank'; link.rel = 'noopener';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async function shareNative() {
    const a = _current(); if (!a) return;
    if (!navigator.share) return shareCopy();
    try {
      await navigator.share({ title: a.label, text: _shareMessage(a) });
    } catch (_) { /* the user dismissed the sheet - not an error */ }
  }

  // "View assignment" on the success screen: the details overlay for the row
  // that was just created, once the list has caught up with the server.
  async function shareView() {
    const a = _current(); if (!a) return;
    closeShare();
    if (typeof TeacherWorkspace === 'undefined') return;
    switchTab('results');
    await TeacherWorkspace.ensureLoaded(true);
    TeacherWorkspace.openResults(a.serverId);
  }

  // "Give more practice" from a results insight: pre-fill Set Work with the
  // same classroom, subject and chapter, and tick only the pupils named.
  function prefillPractice({ classroomId, packId, chapterIds, pupilKeys, label } = {}) {
    switchTab('create');
    const pack = _packs().find(p => p.id === packId);
    if (pack) {
      const gradeEl = _el('ta-grade');
      if (gradeEl && gradeEl.value !== String(pack.grade)) { gradeEl.value = String(pack.grade); _buildSubjectSelect(); }
      const subEl = _el('ta-subject');
      if (subEl) { subEl.value = pack.id; _buildChapterCheckboxes(); _ensureSubjectLoaded(); }
    }
    (chapterIds || []).forEach(cid => {
      const cb = document.querySelector(`#ta-chapter-opts-container input[value="${CSS.escape(cid)}"]`);
      if (cb) cb.checked = true;
    });
    if (label) { const l = _el('ta-label'); if (l) l.value = label.slice(0, 60); }
    const chip = classroomId ? _el('ta-class-picker')?.querySelector(`[data-cid="${CSS.escape(classroomId)}"]`) : null;
    if (chip) {
      _chooseClassroom(classroomId, Number(chip.dataset.pupils));
      if (pupilKeys && pupilKeys.length) {
        const details = _el('ta-more-options');
        if (details) details.open = true;
        _renderPupilPicker(classroomId).then(() => {
          const boxes = document.querySelectorAll('#ta-pupils-list input[type=checkbox]');
          if (!boxes.length) return;
          const want = new Set(pupilKeys.map(String));
          let any = false;
          boxes.forEach(cb => { cb.checked = want.has(cb.value); any = any || cb.checked; });
          if (!any) boxes.forEach(cb => { cb.checked = true; });
          _updateBuildButton();
        });
      }
    }
    toast('Form pre-filled - check it and assign.', 2500);
    _el('ta-create-form')?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
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

  // ── Gradebook ──────────────────────────────────
  let _gbClassId = null;
  let _gbLoading = false;
  let _gbShowArchived = false;
  let _gbLastData = null;
  const _gbEsc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function _renderGradebook() {
    const root = _el('ta-gradebook-root');
    if (!root) return;
    const classes = (typeof TeacherGuestClasses !== 'undefined' ? TeacherGuestClasses.getClasses() : []).filter(c => c.active);
    if (!classes.length) {
      root.innerHTML = '<p class="ta-gb-msg">No active classrooms yet - create one in the Classrooms tab first.</p>';
      return;
    }
    if (!_gbClassId || !classes.find(c => c.id === _gbClassId)) _gbClassId = classes[0].id;
    root.innerHTML = `
      <div class="ta-gb-toolbar">
        <select id="ta-gb-class-sel" class="ta-gb-sel" onchange="TeacherMode.gbSelectClass(this.value)">
          ${classes.map(c => `<option value="${_gbEsc(c.id)}"${c.id === _gbClassId ? ' selected' : ''}>${_gbEsc(c.name)} (${c.pupils} pupil${c.pupils === 1 ? '' : 's'})</option>`).join('')}
        </select>
        <button onclick="TeacherMode.loadGradebook()" class="ta-gb-btn">🔄 Refresh</button>
        <button onclick="TeacherMode.toggleGbArchived()" class="ta-gb-btn" id="ta-gb-archived-btn">${_gbShowArchived ? '📦 Hide archived' : '📦 Show archived'}</button>
        <button onclick="TeacherMode.exportGradebookCsv()" class="ta-gb-btn">⬇️ Export CSV</button>
      </div>
      <div id="ta-gb-body"></div>
    `;
    _loadGradebook(_gbClassId);
  }

  async function _loadGradebook(classId) {
    if (classId) _gbClassId = classId;
    const box = _el('ta-gb-body');
    if (!box || !_gbClassId) return;
    if (_gbLoading) return;
    _gbLoading = true;
    box.innerHTML = '<p class="ta-gb-msg">Loading…</p>';
    try {
      const asgResp = await _sb.rpc('guest_my_assignments');
      const { data: asgData, error: asgErr } = asgResp;
      if (asgErr) throw asgErr;
      let modeData = null;
      try {
        const modeResp = await _sb.rpc('teacher_guest_assignment_modes');
        modeData = modeResp.data;
      } catch (modeErr) {
        console.warn('[gradebook] modes RPC failed:', modeErr);
      }
      const modes = new Map((modeData?.modes || []).map(a => [a.id, a]));
      const assignments = (asgData?.assignments || [])
        .filter(a => modes.get(a.id)?.classroom_id === _gbClassId && (_gbShowArchived || !modes.get(a.id)?.archived))
        .map(a => ({ ...a }));
      if (!assignments.length) {
        box.innerHTML = '<p class="ta-gb-msg">No active assignments for this classroom yet - set some work first.</p>';
        return;
      }
      const resultsArr = await Promise.all(
        assignments.map(a =>
          _sb.rpc('teacher_guest_results', { p_assignment_id: a.id })
            .then(r => ({ assignId: a.id, rows: r.data?.submissions || [] }))
            .catch(() => ({ assignId: a.id, rows: [] }))
        )
      );
      // Build student map: name → {assignId → {score,total,pct} | null (enrolled, not submitted)}
      const students = {};
      resultsArr.forEach(({ assignId, rows }) => {
        rows.forEach(r => {
          if (!students[r.name]) students[r.name] = {};
          students[r.name][assignId] = r.submitted_at
            ? { score: Number(r.score), total: Number(r.total), pct: Number(r.pct) }
            : null;
        });
      });
      const names = Object.keys(students).sort((a, b) => a.localeCompare(b));
      if (!names.length) {
        box.innerHTML = '<p class="ta-gb-msg">No pupils have started any assignment yet.</p>';
        return;
      }
      const pctCls = p => p == null ? 'ta-gb-nd' : p >= 70 ? 'ta-gb-pass' : p >= 50 ? 'ta-gb-mid' : 'ta-gb-fail';
      const pctTxt = cell => cell == null ? '-' : cell.pct + '%';
      const trunc  = s => (s || '').length > 18 ? (s || '').slice(0, 17) + '…' : (s || '');
      const colAvg = assignments.map(a => {
        const vals = names.map(n => students[n][a.id]).filter(s => s != null);
        return vals.length ? Math.round(vals.reduce((sum, r) => sum + r.pct, 0) / vals.length) : null;
      });
      const allClasses = typeof TeacherGuestClasses !== 'undefined' ? TeacherGuestClasses.getClasses() : [];
      const cls = allClasses.find(c => c.id === _gbClassId);
      _gbLastData = { names, assignments, students, colAvg, className: cls?.name || 'gradebook' };
      box.innerHTML = `
        <div class="ta-gb-scroll">
          <table class="ta-gb-table" role="grid">
            <thead><tr>
              <th class="ta-gb-th ta-gb-th-name">Pupil</th>
              ${assignments.map(a => `<th class="ta-gb-th ta-gb-th-asgn" title="${_gbEsc(a.title || a.label || '')}">${_gbEsc(trunc(a.title || a.label || ''))}</th>`).join('')}
              <th class="ta-gb-th ta-gb-th-avg">Avg</th>
            </tr></thead>
            <tbody>
              ${names.map(name => {
                const cells = assignments.map(a => students[name][a.id] ?? null);
                const done  = cells.filter(s => s != null);
                const avg   = done.length ? Math.round(done.reduce((s, r) => s + r.pct, 0) / done.length) : null;
                return `<tr>
                  <td class="ta-gb-td ta-gb-td-name">${_gbEsc(name)}</td>
                  ${cells.map(cell => `<td class="ta-gb-td ta-gb-cell ${pctCls(cell?.pct ?? null)}" title="${cell ? cell.score + '/' + cell.total : '-'}">${pctTxt(cell)}</td>`).join('')}
                  <td class="ta-gb-td ta-gb-cell ${pctCls(avg)} ta-gb-td-avg">${avg != null ? avg + '%' : '-'}</td>
                </tr>`;
              }).join('')}
            </tbody>
            <tfoot><tr class="ta-gb-foot">
              <td class="ta-gb-td ta-gb-td-name ta-gb-td-avg">Class avg</td>
              ${colAvg.map(avg => `<td class="ta-gb-td ta-gb-cell ${pctCls(avg)} ta-gb-td-avg">${avg != null ? avg + '%' : '-'}</td>`).join('')}
              <td class="ta-gb-td"></td>
            </tr></tfoot>
          </table>
        </div>
        <p class="ta-gb-legend">
          <span class="ta-gb-dot ta-gb-pass"></span>≥70%
          <span class="ta-gb-dot ta-gb-mid"></span>50–69%
          <span class="ta-gb-dot ta-gb-fail"></span>&lt;50%
          <span class="ta-gb-dot ta-gb-nd"></span>not started
        </p>
      `;
    } catch (e) {
      console.error('[gradebook] ERROR:', e?.message || e, e?.code, e?.details, e);
      box.innerHTML = '<p class="ta-gb-msg ta-gb-err">Could not load gradebook. Check your connection.</p>';
    } finally {
      _gbLoading = false;
    }
  }

  function _toggleGbArchived() {
    _gbShowArchived = !_gbShowArchived;
    const btn = _el('ta-gb-archived-btn');
    if (btn) btn.textContent = _gbShowArchived ? '📦 Hide archived' : '📦 Show archived';
    _loadGradebook(_gbClassId);
  }

  function _exportGradebookCsv() {
    if (!_gbLastData) { toast('Load the gradebook first.', 2000); return; }
    const { names, assignments, students, colAvg, className } = _gbLastData;
    const header = ['Pupil', ...assignments.map(a => a.title || a.label || a.id), 'Average'];
    const rows = [header];
    names.forEach(name => {
      const cells = assignments.map(a => students[name][a.id] ?? null);
      const done  = cells.filter(s => s != null);
      const avg   = done.length ? Math.round(done.reduce((s, r) => s + r.pct, 0) / done.length) : null;
      rows.push([name, ...cells.map(c => c == null ? '-' : c.pct + '%'), avg != null ? avg + '%' : '-']);
    });
    rows.push(['Class avg', ...colAvg.map(avg => avg != null ? avg + '%' : '-'), '']);
    const csv = rows.map(r => r.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',')).join('\n');
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = className.replace(/[^a-z0-9\-_.]/gi, '_') + '-gradebook.csv';
    a.click();
  }

  function _exportResultsCsv(assignId) {
    const data = _getData();
    const asgn = (data.assignments || []).find(a => a.id === assignId);
    const results = data.results?.[assignId] || [];
    if (!results.length) { toast('No results to export.', 2000); return; }
    const rows = [['Name', 'Attempt', 'Score', 'Total', 'Percentage', 'Date']];
    results.slice()
      .sort((a, b) => a.studentName.localeCompare(b.studentName) || a.attempt - b.attempt)
      .forEach(r => rows.push([r.studentName, r.attempt, r.score, r.total, r.pct + '%', new Date(r.timestamp).toLocaleString()]));
    const csv = rows.map(r => r.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',')).join('\n');
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = ((asgn?.label || 'results') + '-results.csv').replace(/[^a-z0-9\-_.]/gi, '_');
    a.click();
  }

  function _duplicateAssignment(id) {
    const data = _getData();
    const a = (data.assignments || []).find(x => x.id === id);
    if (!a) return;
    switchTab('create');
    const set = (elId, val) => { const el = _el(elId); if (el) el.value = val; };
    set('ta-label', 'Copy of ' + a.label);
    set('ta-count', a.count || 10);
    set('ta-difficulty', a.difficulty || 0);
    set('ta-mode', a.mode || 'practice');
    const randEl = _el('ta-random');
    if (randEl) randEl.checked = a.random !== false;
    if (a.subject) {
      const pack = Object.values(typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : {}).find(p => p.id === a.subject);
      if (pack) {
        const gradeEl = _el('ta-grade');
        if (gradeEl) { gradeEl.value = pack.grade; TeacherMode.gradeChange(gradeEl); }
        setTimeout(() => {
          set('ta-subject', a.subject);
          const subEl = _el('ta-subject');
          if (subEl) TeacherMode.subjectChange(subEl);
          if (a.chapters?.length) {
            setTimeout(() => {
              a.chapters.forEach(cid => {
                const cb = document.querySelector(`#ta-chapter-opts-container input[value="${cid}"]`);
                if (cb) cb.checked = true;
              });
            }, 400);
          }
        }, 150);
      }
    }
    toast('Form pre-filled - adjust and generate.', 2500);
  }

  async function _renderTeacherMessages() {
    const list  = document.getElementById('tc-msg-list');
    const badge = document.getElementById('tc-msg-badge');
    if (!list) return;
    list.innerHTML = '<p class="text-sm text-gray-400 dark:text-gray-500 text-center py-10 animate-pulse">Loading…</p>';
    const reports = await Store.loadParentReports();
    if (!reports.length) {
      list.innerHTML = '<p class="text-sm text-gray-400 dark:text-gray-500 text-center py-10">No messages yet. Tap ＋ New Message to get started.</p>';
      if (badge) badge.classList.add('hidden');
      return;
    }
    const hasNew = reports.some(r => r.admin_note && r.updated_at && r.created_at && r.updated_at !== r.created_at);
    if (badge) badge.classList.toggle('hidden', !hasNew);
    const types = { topic_question: '🙋 Question', app_problem: '🐛 Bug', content_issue: '📚 Content', other: '💬 Other' };
    list.innerHTML = reports.map(r => {
      const label     = types[r.report_type] || '💬 Message';
      const statusCls = r.status === 'resolved' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400';
      const statusTxt = r.status === 'resolved' ? 'Resolved' : 'Open';
      return `<div style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15)" class="rounded-xl p-4 mb-3">
        <div class="flex justify-between items-start mb-2 gap-2">
          <span class="text-xs font-semibold">${label}</span>
          <span class="text-xs ${statusCls}">${statusTxt}</span>
        </div>
        <p class="text-sm mb-2" style="white-space:pre-wrap">${_attr(r.message)}</p>
        ${r.admin_note ? `<div style="background:rgba(255,255,255,.1);border-left:3px solid rgba(100,200,100,.6)" class="rounded p-3 mt-2 text-sm"><span class="text-xs font-semibold block mb-1">Admin reply</span>${_attr(r.admin_note)}</div>` : ''}
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">${new Date(r.created_at).toLocaleDateString()}</p>
      </div>`;
    }).join('');
  }

  return {
    isTeacher, render, switchTab, subjectChange, gradeChange,
    buildAssignment, copyLink, deleteAssignment,
    shareAssignment, closeShare, shareCopy, shareWhatsApp, shareNative, shareCopyLink, shareView,
    toggleMore, closeMore, getLocation, gotoStep, currentStep, wizardNext, wizardBack, leaveSetWork,
    scopeChanged, chaptersChanged, countChanged, difficultyChanged, refreshSummary,
    saveLocation: _saveLoc, rememberClassroom, chooseClassroom, setShareMode,
    shareChoiceChanged, setDueInDays, dueChanged, modeChanged, reloadPupils, tickPupils, pupilsChanged,
    prefillPractice, chapterName, packLabel,
    saveResult, getAttemptCount, hasRetry, allowRetry, removeResult, showAnswers,
    gbSelectClass: id => { _gbClassId = id; _loadGradebook(id); },
    loadGradebook: () => _loadGradebook(_gbClassId),
    toggleGbArchived: _toggleGbArchived,
    exportGradebookCsv: _exportGradebookCsv,
    exportResultsCsv: _exportResultsCsv,
    duplicateAssignment: _duplicateAssignment,
    renderMessages: _renderTeacherMessages,
  };
})();

// ── Teacher Materials (Supabase Storage) ──────────────────────────────────────
const TeacherMaterials = (() => {
  const BUCKET = 'learning-materials';
  let _classes = []; // cached list of this teacher's classrooms for the assign picker
  // Rows and the chosen order are held so re-sorting is a repaint, not a
  // refetch - and so the open assign picker is the only thing a sort loses.
  let _rows = [];
  let _assignMap = {};
  let _sort = 'recent';
  // ⚠ Reset in the RENDER path (load()), not only in the toggles - otherwise the
  // next teacher, or the next visit to this tab, opens on the last search and an
  // apparently empty library. Same rule as _shopOpen / _repShowAllMistakes.
  let _view = 'list';
  let _search = '';
  let _source = 'file';
  let _calMonth = null;   // Date of the 1st of the month on screen

  // A file and a link are added through the same form; only the source row and
  // the button label change. Nothing already typed is cleared, so a teacher who
  // starts typing a title and then realises it is a video keeps their work.
  function setSource(kind) {
    _source = kind === 'link' ? 'link' : 'file';
    const fileRow = document.getElementById('tm-file-row');
    const linkRow = document.getElementById('tm-link-row');
    if (fileRow) fileRow.classList.toggle('hidden', _source !== 'file');
    if (linkRow) linkRow.classList.toggle('hidden', _source !== 'link');
    for (const [id, on] of [['tm-src-file', _source === 'file'], ['tm-src-link', _source === 'link']]) {
      const b = document.getElementById(id);
      if (!b) continue;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    }
    const btn = document.getElementById('tm-add-btn');
    if (btn) btn.textContent = _source === 'link' ? '🔗 Pin link to board' : '📎 Pin to board';
    _status('');
  }

  function _status(msg, color) {
    const el = document.getElementById('tm-upload-status');
    if (!el) return;
    el.textContent = msg;
    el.style.color = color || '';
  }

  function _onFileChosen(source) {
    const cameraInput = document.getElementById('tm-camera');
    const fileInput   = document.getElementById('tm-file');
    // Clear the other input so only one source is active at a time
    if (source === 'camera') { if (fileInput)   fileInput.value = ''; }
    else                     { if (cameraInput) cameraInput.value = ''; }
    const file = (source === 'camera' ? cameraInput : fileInput)?.files[0];
    const hint = document.getElementById('tm-filename');
    if (hint) hint.textContent = file ? file.name : 'No file chosen';
  }

  // Everything the two paths share, read once.
  function _formMeta() {
    return {
      description: document.getElementById('tm-description')?.value.trim() || null,
      grade:       parseInt(document.getElementById('tm-grade')?.value) || null,
      subject:     document.getElementById('tm-subject')?.value || null,
    };
  }

  // ── Adding a LINK ─────────────────────────────────────────────────────────
  // No Storage, no signed URL, no expiry: the row IS the material. The URL is
  // normalised and refused unless it is http(s) - and the database CHECK refuses
  // it a second time, because this validation runs on the attacker's machine.
  async function _saveLink() {
    const title = document.getElementById('tm-title')?.value.trim();
    const raw   = document.getElementById('tm-url')?.value;
    if (!title) { _status('Please enter a title.', '#e53e3e'); return; }
    const url = (typeof normaliseMaterialUrl === 'function') ? normaliseMaterialUrl(raw) : null;
    if (!url) { _status('That link does not look right. It should start with https:// and point at a website.', '#e53e3e'); return; }

    _status('Saving…');
    const user = _sb.auth.getUser ? (await _sb.auth.getUser()).data?.user : null;
    if (!user) { _status('You must be signed in.', '#e53e3e'); return; }

    const meta = _formMeta();
    const { error } = await _sb.from('learning_materials').insert({
      teacher_id: user.id, title, ...meta,
      source_type: 'link', external_url: url,
    });
    if (error) {
      // ⚠ Name the likely cause. Until migrations/20260908_material_links.sql is
      // applied there is no source_type column, and PostgREST answers PGRST204
      // ("column not found") - which as a bare message reads like a bug in the
      // form the teacher just filled in.
      const missing = /source_type|external_url|PGRST204|42703/i.test(error.message || '');
      _status(missing
        ? 'Links are not enabled on this site yet - the database still needs the material-links migration.'
        : 'Could not save the link: ' + error.message, '#e53e3e');
      return;
    }
    _status('Link added!', '#276749');
    const t = document.getElementById('tm-title');       if (t) t.value = '';
    const d = document.getElementById('tm-description'); if (d) d.value = '';
    const u = document.getElementById('tm-url');         if (u) u.value = '';
    load();
  }

  async function upload() {
    if (_source === 'link') return _saveLink();
    const title = document.getElementById('tm-title')?.value.trim();
    // Accept a file from either the regular picker or the camera capture
    const file  = document.getElementById('tm-camera')?.files[0]
               || document.getElementById('tm-file')?.files[0];

    if (!title) { _status('Please enter a title.', '#e53e3e'); return; }
    if (!file)  { _status('Please choose a file or take a photo.', '#e53e3e'); return; }
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

    // Fetch materials and classroom assignments in parallel.
    // Classrooms are fetched via the managed RPC to ensure teacher-scoped results.
    // ⚠ No teacher_id filter here ON PURPOSE. The RLS policy
    // "teachers can read materials" is USING (teacher_id = auth.uid() OR is_admin()),
    // so the server already returns only this teacher's rows - and an admin's
    // wider view is a property of the account, not of the screen. A duplicate
    // client filter would make the UI look right even if that policy were ever
    // widened again, which is exactly how the old leak went unnoticed.
    // scripts/sql-tests/materials-rls.js asserts the policy against the live DB.
    const [matsRes, assignRes, classRpc] = await Promise.all([
      _sb.from('learning_materials').select('*').order('created_at', { ascending: false }),
      _sb.from('classroom_materials').select('material_id, classroom_id'),
      _sb.rpc('teacher_guest_manage', { p_action: 'list' }),
    ]);

    if (matsRes.error) { list.innerHTML = '<p class="text-sm text-red-500">Could not load files.</p>'; return; }
    if (!matsRes.data?.length) { list.innerHTML = '<p class="text-sm text-gray-400 dark:text-gray-500">No files uploaded yet.</p>'; return; }

    _classes = (classRpc.data?.classes || []).filter(c => c.active);

    // Build a map: material_id → Set of classroom_ids
    const assignMap = {};
    if (!assignRes.error) {
      for (const row of (assignRes.data || [])) {
        if (!assignMap[row.material_id]) assignMap[row.material_id] = [];
        assignMap[row.material_id].push(row.classroom_id);
      }
    }

    _rows      = matsRes.data;
    _assignMap = assignMap;
    _sort      = readMaterialSort();
    // ⚠ View and search are reset HERE, in the load, not in their toggles.
    // Otherwise the next visit to this tab opens on the last search - an
    // apparently empty library - and on a calendar month that may hold nothing.
    _view      = readMaterialView();
    _search    = '';
    _calMonth  = null;
    const box = document.getElementById('tm-search');
    if (box) box.value = '';
    const clr = document.getElementById('tm-search-clear');
    if (clr) clr.classList.add('hidden');
    if (_view === 'calendar') { _view = 'list'; setView('calendar'); return; }
    _render();
  }

  function setSort(key) {
    _sort = MATERIAL_SORT_LABELS[key] ? key : 'recent';
    writeMaterialSort(_sort);
    _render();
  }

  // The chosen order is read from storage on every load, so it survives a
  // reload and matches the order the classroom Materials section is showing.
  // ── One material, one card ────────────────────────────────────────────────
  // Shared by all three views, so a card cannot look or behave differently
  // depending on which view a teacher happens to be in. Re-share is on EVERY
  // card in EVERY view - sharing again is the most frequent thing done here and
  // it used to live only on the list.
  function _card(f, classNames) {
    const assignedIds = _assignMap[f.id] || [];
    const badges = assignedIds.length
      ? assignedIds.map(cid => `<span class="tm-classroom-badge">${_attr(classNames[cid] || '?')}</span>`).join('')
      : '<span class="tm-classroom-badge tm-badge-none">Unassigned</span>';
    const link = isLinkMaterial(f);
    // A link shows its host so the teacher can see where it goes; a file shows
    // its size. Both show the date, which is what the calendar is grouping on.
    const meta = [
      f.subject ? _attr(f.subject) : '',
      f.grade ? 'Grade ' + f.grade : '',
      link ? _attr(materialHost(f)) : _fmtSize(f.file_size),
      f.created_at ? fmtMaterialDate(f.created_at) : '',
    ].filter(Boolean).join(' · ');
    return `
      <div class="tm-file-row">
        <div class="min-w-0 flex-1">
          <p class="text-sm font-semibold text-gray-800 dark:text-white truncate">
            <span class="tm-kind" title="${_attr(materialTypeLabel(f))}">${materialIcon(f)}</span>${_attr(f.title)}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">${meta}</p>
          ${f.description ? `<p class="text-xs text-gray-400 dark:text-gray-500 truncate">${_attr(f.description)}</p>` : ''}
          <div class="tm-classrooms-row">${badges}
            <button onclick="TeacherMaterials.showAssign('${_attr(f.id)}')" class="tm-assign-btn">🏫 Assign</button>
          </div>
          <div id="tm-assign-${_attr(f.id)}" class="tm-assign-picker hidden"></div>
        </div>
        <div class="tm-row-actions">
          <button onclick="TeacherMaterials.share('${_attr(f.id)}')"
            class="text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-lg font-semibold">
            💬 Share again
          </button>
          <button onclick="TeacherMaterials.getLink('${_attr(f.id)}')"
            class="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-lg font-semibold">
            ${link ? '🔗 Copy link' : '🔗 Link'}
          </button>
          <button onclick="TeacherMaterials.remove('${_attr(f.id)}','${_attr(f.file_path || '')}')"
            class="text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-3 py-1 rounded-lg font-semibold">
            Delete
          </button>
        </div>
      </div>`;
  }

  // ── The calendar ──────────────────────────────────────────────────────────
  // A Monday-first month grid, the same shape as My Timetable, so the two
  // calendars in this app read the same way. Squares are keyed on the LOCAL
  // date (materialDayKey) because these are calendar days on the teacher's own
  // device - the same deliberate exception the parent calendar makes.
  function _calendarHtml(rows) {
    const byDay = groupMaterialsByDay(rows);
    const month = _calMonth || new Date();
    const y = month.getFullYear(), m = month.getMonth();
    const first = new Date(y, m, 1);
    const lead = (first.getDay() + 6) % 7;           // Monday-first
    const days = new Date(y, m + 1, 0).getDate();
    const todayKey = materialDayKey({ created_at: new Date().toISOString() });
    const label = first.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

    let cells = '';
    for (let i = 0; i < lead; i++) cells += '<div class="tm-cal-cell is-empty"></div>';
    for (let d = 1; d <= days; d++) {
      const key = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const items = byDay.get(key) || [];
      // ⚠ Chip LABELS are hidden below 520px in CSS: a 46px square cannot hold a
      // title anyone can read, so the phone grid is icon + count and the day
      // list underneath carries the words. Same rule as the timetable grid.
      const chips = items.slice(0, 3).map(f =>
        `<span class="tm-cal-chip">${materialIcon(f)}<span class="tm-cal-chip-t">${_attr(f.title)}</span></span>`).join('');
      const more = items.length > 3 ? `<span class="tm-cal-more">+${items.length - 3}</span>` : '';
      cells += `<div class="tm-cal-cell${items.length ? ' has-items' : ''}${key === todayKey ? ' is-today' : ''}">
        <span class="tm-cal-date">${d}</span>${chips}${more}</div>`;
    }
    const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      .map(n => `<div class="tm-cal-head">${n}</div>`).join('');

    // Every material in the month, listed under the grid. The grid answers
    // "when", the list answers "what" - and keeps every action reachable,
    // including on a phone where the chips carry no words.
    const inMonth = rows.filter(f => {
      const k = materialDayKey(f);
      return k && k.slice(0, 7) === `${y}-${String(m + 1).padStart(2, '0')}`;
    });
    const classNames = Object.fromEntries(_classes.map(c => [c.id, c.name]));
    const listed = sortMaterials(inMonth, 'recent').map(f => _card(f, classNames)).join('');
    return `
      <div class="tm-cal-nav">
        <button type="button" class="tm-cal-btn" onclick="TeacherMaterials.shiftMonth(-1)" aria-label="Previous month">‹</button>
        <span class="tm-cal-month">${label}</span>
        <button type="button" class="tm-cal-btn" onclick="TeacherMaterials.shiftMonth(1)" aria-label="Next month">›</button>
      </div>
      <div class="tm-cal-grid">${names}${cells}</div>
      <p class="tm-cal-count">${inMonth.length ? inMonth.length + (inMonth.length === 1 ? ' material' : ' materials') + ' this month' : 'Nothing shared this month.'}</p>
      ${listed}`;
  }

  function _render() {
    const list = document.getElementById('tm-list');
    if (!list) return;
    const controls = document.getElementById('tm-controls');
    const classNames = Object.fromEntries(_classes.map(c => [c.id, c.name]));

    const shown = filterMaterials(_rows, _search);

    // ⚠ The sort bar is NOT drawn in the calendar: that grid is ordered by date
    // by definition, so a sort control there would be a lie the teacher can tap.
    if (controls) {
      const viewBar = _rows.length ? materialViewBar(_view, 'TeacherMaterials.setView') : '';
      const sortBar = (_view !== 'calendar' && shown.length > 1)
        ? materialSortBar(_sort, 'TeacherMaterials.setSort', ['recent', 'oldest', 'subject', 'grade', 'title'])
        : '';
      controls.innerHTML = viewBar + sortBar;
    }

    if (!_rows.length) {
      list.innerHTML = '<p class="text-sm text-gray-400 dark:text-gray-500">Nothing added yet.</p>';
      return;
    }
    // A search that matches nothing must say so and offer the way back, rather
    // than looking identical to an empty library.
    if (!shown.length) {
      list.innerHTML = `<p class="text-sm text-gray-400 dark:text-gray-500">
        No material matches “${_attr(_search)}”.
        <button type="button" class="tm-clear-inline" onclick="TeacherMaterials.clearSearch()">Clear search</button></p>`;
      return;
    }

    if (_view === 'calendar') { list.innerHTML = _calendarHtml(shown); return; }

    if (_view === 'subject') {
      list.innerHTML = groupMaterialsBySubject(shown).map(([subject, items]) => `
        <h5 class="tm-group-head">${subject ? _attr(subject) : 'No subject set'}
          <span class="tm-group-count">${items.length}</span></h5>
        ${sortMaterials(items, _sort).map(f => _card(f, classNames)).join('')}`).join('');
      return;
    }

    list.innerHTML = sortMaterials(shown, _sort).map(f => _card(f, classNames)).join('');
  }

  function setView(key) {
    _view = MATERIAL_VIEW_LABELS[key] ? key : 'list';
    writeMaterialView(_view);
    // Opening the calendar lands on the month holding the newest material, not
    // on today: a teacher who shared nothing this month would otherwise open an
    // empty grid and conclude the feature is broken.
    if (_view === 'calendar' && !_calMonth) {
      const newest = sortMaterials(filterMaterials(_rows, _search), 'recent')[0];
      const t = newest ? Date.parse(newest.shared_at || newest.created_at || '') : 0;
      const d = t ? new Date(t) : new Date();
      _calMonth = new Date(d.getFullYear(), d.getMonth(), 1);
    }
    _render();
  }
  function shiftMonth(delta) {
    const base = _calMonth || new Date();
    _calMonth = new Date(base.getFullYear(), base.getMonth() + Number(delta || 0), 1);
    _render();
  }
  function setSearch(value) {
    _search = String(value || '');
    const clear = document.getElementById('tm-search-clear');
    if (clear) clear.classList.toggle('hidden', !_search);
    _render();
  }
  function clearSearch() {
    _search = '';
    const box = document.getElementById('tm-search');
    if (box) { box.value = ''; box.focus(); }
    const clear = document.getElementById('tm-search-clear');
    if (clear) clear.classList.add('hidden');
    _render();
  }

  async function showAssign(materialId) {
    // Close all other open pickers first
    document.querySelectorAll('.tm-assign-picker').forEach(p => {
      if (p.id !== 'tm-assign-' + materialId) p.classList.add('hidden');
    });
    const picker = document.getElementById('tm-assign-' + materialId);
    if (!picker) return;
    if (!picker.classList.contains('hidden')) { picker.classList.add('hidden'); return; }

    if (!_classes.length) {
      picker.innerHTML = '<p class="tm-assign-note">No classrooms yet. Create one in the Classrooms tab.</p>';
      picker.classList.remove('hidden');
      return;
    }

    picker.innerHTML = '<p class="tm-assign-note">Loading…</p>';
    picker.classList.remove('hidden');

    const { data, error } = await _sb.from('classroom_materials')
      .select('classroom_id').eq('material_id', materialId);
    if (error) { picker.innerHTML = '<p class="tm-assign-note" style="color:#e53e3e">Failed to load</p>'; return; }
    const assigned = new Set((data || []).map(r => r.classroom_id));

    picker.innerHTML =
      '<div class="tm-assign-list">' +
      _classes.map(c => `
        <label class="tm-assign-item">
          <input type="checkbox" ${assigned.has(c.id) ? 'checked' : ''}
            onchange="TeacherMaterials.toggleAssign('${_attr(materialId)}','${_attr(c.id)}',this.checked)">
          <span>${_attr(c.name)}</span>
        </label>`).join('') +
      '</div>' +
      '<p class="tm-assign-note">Tick a classroom to give its students access to this material.</p>';
  }

  async function toggleAssign(materialId, classroomId, assign) {
    if (assign) {
      const { error } = await _sb.from('classroom_materials')
        .insert({ material_id: materialId, classroom_id: classroomId });
      if (error) { toast('Could not assign: ' + error.message, 2500); }
      else toast('Assigned to classroom ✓', 1500);
    } else {
      // ⚠ Zero rows is a refusal — RLS answers a non-matching DELETE with no
      //   error and no rows, so "Removed from classroom" would be a lie the
      //   teacher only discovers when the list reloads unchanged.
      const { data, error } = await _sb.from('classroom_materials')
        .delete().eq('material_id', materialId).eq('classroom_id', classroomId)
        .select('material_id');
      if (error) toast('Could not remove: ' + error.message, 2500);
      else if (!data?.length) toast('Could not remove that material from the classroom.', 3000);
      else toast('Removed from classroom', 1500);
    }
    await load();
  }

  // ⚠ The row's OWN expiry, not a hard-coded hour. This asked for 3600 whatever
  // the teacher had chosen, then told them "valid for 1 hour" - so a file set to
  // last a week was shared on a link that died the same afternoon.
  // ⚠ The ONE place a material URL comes from, for every caller. A link needs
  // no signing and has no expiry - returning it here means getLink(), share()
  // and the classroom section all handle links without knowing they exist.
  async function _signedUrl(f) {
    if (isLinkMaterial(f)) return f.external_url || null;
    if (!f || !f.file_path) return null;
    const secs = Number(f?.link_expiry_seconds) || 3600;
    const { data, error } = await _sb.storage.from(BUCKET).createSignedUrl(f.file_path, secs);
    return (error || !data?.signedUrl) ? null : data.signedUrl;
  }

  async function getLink(id) {
    const f = _rows.find(r => r.id === id);
    if (!f) return;
    const url = await _signedUrl(f);
    if (!url) { toast('Could not generate link.', 2000); return; }
    // ⚠ A LINK must not claim an expiry. Only a signed storage URL dies, and
    // telling a teacher their YouTube link lasts an hour would simply be false.
    const note = isLinkMaterial(f) ? '' : ' Works for ' + fmtMaterialExpiry(f.link_expiry_seconds) + '.';
    try {
      await navigator.clipboard.writeText(url);
      toast('Link copied!' + note, 2500);
    } catch {
      prompt('Copy this link:' + note, url);
    }
  }

  // Share a file the way a teacher actually sends one: WhatsApp, from wherever
  // they happen to be, at any time - not only from the classroom screen.
  async function share(id) {
    const f = _rows.find(r => r.id === id);
    if (!f) return;
    // Only says anything if the round trip is actually slow: a toast that lands
    // after the panel has already opened just sits on top of it.
    const slow = setTimeout(() => toast('Preparing the link…', 1500), 400);
    const url = await _signedUrl(f);
    clearTimeout(slow);
    if (!url) { toast('Could not create a share link. Please try again.', 3500); return; }
    const text = materialShareMessage(f, url);
    if (typeof TeacherWorkspace !== 'undefined' && TeacherWorkspace.shareText) {
      TeacherWorkspace.shareText(f.title, text, url);
      return;
    }
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(() => toast('Message copied 📋', 2500)).catch(() => prompt('Copy this:', text));
    else prompt('Copy this:', text);
  }

  async function remove(id, filePath) {
    if (!confirm('Delete this material? This cannot be undone.')) return;
    // ⚠ The ROW GOES FIRST, and the stored object only after it is provably
    //   gone. This used to delete the file, then fire an unchecked DELETE at
    //   the row: a refused or failed row delete left a material still listed,
    //   still clickable, pointing at a file that no longer existed — and
    //   load() redrew it as if nothing had happened. Losing the file while
    //   keeping the record is the worst of the two orders.
    // ⚠ Zero rows is a refusal: RLS answers a non-matching DELETE with no error
    //   and no rows.
    const { data, error } = await _sb.from('learning_materials')
      .delete().eq('id', id).select('id');
    if (error || !data?.length) {
      if (error) console.error('[TeacherMaterials.remove]', error.message);
      toast(error ? 'Could not delete: ' + error.message : 'Could not delete that material.', 3000);
      return;
    }
    // A link has no stored object. Calling storage.remove(['']) would be a
    // pointless request whose failure could stop the row being deleted.
    if (filePath) await _sb.storage.from(BUCKET).remove([filePath]);
    load();
  }

  function _fmtSize(bytes) {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  return { upload, load, setSort, setView, setSearch, clearSearch, shiftMonth, setSource,
           share, getLink, remove, showAssign, toggleAssign, _onFileChosen };
})();

// ── Teacher message compose ───────────────────────────────────────────────────
function openTeacherMessageModal() {
  const modal = document.getElementById('modal-teacher-message');
  if (!modal) return;
  const msgEl  = document.getElementById('tc-msg-text');
  const typeEl = document.getElementById('tc-msg-type');
  if (msgEl)  msgEl.value  = '';
  if (typeEl) typeEl.value = 'topic_question';
  const btn = document.getElementById('tc-msg-submit-btn');
  if (btn) { btn.textContent = 'Send'; btn.disabled = false; }
  modal.classList.remove('hidden');
}

function closeTeacherMessageModal() {
  const modal = document.getElementById('modal-teacher-message');
  if (modal) modal.classList.add('hidden');
}

async function submitTeacherMessage() {
  const msg  = (document.getElementById('tc-msg-text')?.value || '').trim();
  const type = document.getElementById('tc-msg-type')?.value || 'other';
  if (!msg) { toast('Please describe your question or problem.', 2500); return; }

  const btn = document.getElementById('tc-msg-submit-btn');
  if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }

  const res = await Store.submitParentReport(msg, type);
  closeTeacherMessageModal();

  if (res.ok) {
    toast('Message sent! We\'ll reply in the Messages tab. 💬', 3000);
    await TeacherMode.renderMessages();
  } else {
    toast('Could not send. Check your connection.', 3000);
  }
}
