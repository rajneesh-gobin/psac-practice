'use strict';
const TeacherClassroomDetail = (() => {
  const el = id => document.getElementById(id);
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const I = () => (typeof TeacherInsights !== 'undefined' ? TeacherInsights : null);
  const SECTIONS = ['overview', 'work', 'pupils', 'materials', 'results', 'settings'];
  // Materials is a PRIMARY section, not a More entry: "where do I put a file for
  // this class" was the one question the ⋯ menu could not answer, because a
  // teacher looking for it has no reason to open a menu labelled More.
  const MORE_SECTIONS = ['results', 'settings'];

  let _classId = null;
  let _className = '';
  let _pupils = [];
  // Rename trail for the open classroom. Reset with the rest of the state.
  let _nameChanges = [];
  // Self-registered devices in a SHARED-PIN classroom (name + short device tag).
  let _devices = [];
  let _assignments = [];
  let _physicalHomework = [];
  let _materials = [];
  // Per-material completion claims for the open classroom: { expected, materials }.
  let _matDone = { expected: 0, materials: {} };
  // A preference, not per-classroom state, so it is read from storage rather
  // than cleared by _reset() when another classroom opens.
  let _matSort = readMaterialSort();
  let _activeSection = 'overview';
  let _resultsAssignId = null;
  let _accessType = 'per_student';
  let _classPin = null;
  let _pinsRevealed = false;
  let _signalEpoch = 0;
  let _signals = { loading: false, activity: [], attention: [], sampled: 0, failed: 0 };
  let _signalGroups = [];
  let _rollup = new Map();
  let _workFilter = 'active';
  let _pupilQuery = '';
  let _workError = '';
  let _pupilError = '';
  let _openPupilId = null;
  let _workLoaded = false;
  let _pupilsLoaded = false;
  let _setupGuideForced = false;

  // ── Per-classroom teacher preferences (localStorage, teacher-device only) ──
  const _PREFS_KEY = id => `psac_tc_pref_${id}`;
  function _loadPrefs() {
    try { return JSON.parse(localStorage.getItem(_PREFS_KEY(_classId)) || '{}'); } catch(_) { return {}; }
  }
  function _savePrefs(patch) {
    try {
      const prefs = Object.assign(_loadPrefs(), patch);
      localStorage.setItem(_PREFS_KEY(_classId), JSON.stringify(prefs));
      return prefs;
    } catch(_) { return patch; }
  }
  // Public: other modules read classroom defaults before creating assignments
  function getPrefs(classId) {
    try { return JSON.parse(localStorage.getItem(_PREFS_KEY(classId || _classId)) || '{}'); } catch(_) { return {}; }
  }

  function isOpen() { return !!_classId && !el('tc-classroom-detail')?.classList.contains('hidden'); }

  async function open(classId, className, opts = {}) {
    const same = _classId === classId && isOpen();
    _classId = classId;
    _className = className;
    _resultsAssignId = null;
    _pinsRevealed = false;
    _accessType = 'per_student';
    _classPin = null;
    _physicalHomework = [];
    _materials = [];
    _matDone = { expected: 0, materials: {} };
    _pupils = [];
    _nameChanges = [];
    _devices = [];
    _assignments = [];
    _signals = { loading: true, activity: [], attention: [], sampled: 0, failed: 0 };
    _signalGroups = []; _rollup = new Map();
    _workFilter = 'active'; _pupilQuery = ''; _workError = ''; _pupilError = ''; _openPupilId = null;
    _workLoaded = false; _pupilsLoaded = false; _setupGuideForced = false;
    _signalEpoch++;

    el('tc-classroom-detail').classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    el('tc-cd-name').textContent = className;
    el('tc-cd-emoji').textContent = _loadPrefs().emoji || '🏫';
    ['pupils','assignments','materials','results'].forEach(k => el('tc-cd-stat-' + k).textContent = '-');
    SECTIONS.forEach(s => {
      const sec = el('tc-cd-' + s);
      if (sec) { sec.innerHTML = _skeleton(); sec.classList.add('hidden'); }
    });

    showSection(SECTIONS.includes(opts.section) ? opts.section : 'overview');
    if (!same && typeof TeacherMode !== 'undefined' && TeacherMode.rememberClassroom) TeacherMode.rememberClassroom(classId, className, _activeSection);
    await Promise.all([_loadWork(), _loadPupils(), _loadMaterials()]);
  }

  function _skeleton() {
    return '<div class="tc-skeleton" aria-hidden="true"><div class="th-sk-line th-sk-wide"></div><div class="th-sk-line"></div><div class="th-sk-cards"><div></div><div></div></div></div>';
  }

  function close() {
    _signalEpoch++;
    el('tc-classroom-detail').classList.add('hidden');
    document.body.style.overflow = '';
    _classId = null;
    if (typeof TeacherGuestClasses !== 'undefined') TeacherGuestClasses.clearCurrent();
    if (typeof TeacherMode !== 'undefined' && TeacherMode.rememberClassroom) TeacherMode.rememberClassroom(null);
  }

  function showSection(sec) {
    if (!SECTIONS.includes(sec)) sec = 'overview';
    _activeSection = sec;
    toggleMore(false);
    document.querySelectorAll('.tc-cd-nav-btn').forEach(b => {
      const on = b.dataset.sec === sec || (b.id === 'tc-cd-more-btn' && MORE_SECTIONS.includes(sec));
      b.classList.toggle('tc-cd-nav-active', on);
      if (b.dataset.sec) b.setAttribute('aria-selected', String(b.dataset.sec === sec));
    });
    document.querySelectorAll('#tc-cd-more-menu [data-sec]').forEach(b => b.setAttribute('aria-current', b.dataset.sec === sec ? 'page' : 'false'));
    // The overview already carries the one prominent Set work button.
    document.querySelector('.tc-cd-header .tc-cd-share-btn')?.classList.toggle('hidden', sec === 'overview');
    document.querySelectorAll('.tc-cd-section').forEach(s => s.classList.add('hidden'));
    el('tc-cd-' + sec)?.classList.remove('hidden');
    if (sec === 'overview') _renderOverview();
    if (sec === 'work')     _renderWork();
    if (sec === 'pupils')   _renderPupils();
    if (sec === 'settings') _renderSettings();
    if (sec === 'results')  _renderResults(_resultsAssignId);
    if (_classId && typeof TeacherMode !== 'undefined' && TeacherMode.rememberClassroom) TeacherMode.rememberClassroom(_classId, _className, sec);
  }

  function toggleMore(force) {
    const menu = el('tc-cd-more-menu'), btn = el('tc-cd-more-btn');
    if (!menu || !btn) return;
    const open = typeof force === 'boolean' ? force : menu.classList.contains('hidden');
    menu.classList.toggle('hidden', !open);
    btn.setAttribute('aria-expanded', String(open));
    if (open) {
      setTimeout(() => document.addEventListener('click', _moreOutside, { once: true }), 0);
      document.addEventListener('keydown', _moreEscape);
    } else document.removeEventListener('keydown', _moreEscape);
  }
  function _moreOutside(e) { if (!e.target.closest?.('.tc-cd-nav-more')) toggleMore(false); else if (!el('tc-cd-more-menu')?.classList.contains('hidden')) document.addEventListener('click', _moreOutside, { once: true }); }
  function _moreEscape(e) { if (e.key === 'Escape') { toggleMore(false); el('tc-cd-more-btn')?.focus(); } }

  // ── Work / Assignments ────────────────────────────────────────────
  async function _loadWork() {
    const box = el('tc-cd-work');
    if (!box) return;
    const classId = _classId;
    try {
      const ws = typeof TeacherWorkspace !== 'undefined' ? TeacherWorkspace : null;
      const [all, phRes] = await Promise.all([
        ws ? ws.ensureLoaded(true) : Promise.resolve([]),
        _sb.from('physical_homework').select('*').eq('classroom_id', classId).order('expires_at'),
      ]);
      if (classId !== _classId) return;
      _assignments = all.filter(a => a.classroom_id === classId);
      _physicalHomework = phRes.error ? [] : (phRes.data || []);
      _workError = '';
      _workLoaded = true;
      el('tc-cd-stat-assignments').textContent = _assignments.filter(_isActive).length;
      el('tc-cd-stat-results').textContent = _assignments.reduce((sum, a) => sum + Number(a.submissions || 0), 0);
      if (_activeSection === 'work') _renderWork();
      if (_activeSection === 'overview') _renderOverview();
      _loadDashboardSignals();
    } catch(_e) {
      if (classId !== _classId) return;
      console.error('[classroom-detail] _loadWork failed:', _e);
      _workError = 'Could not load this classroom’s work. Nothing has been deleted.';
      _workLoaded = true;
      if (_activeSection === 'work') _renderWork();
      if (_activeSection === 'overview') _renderOverview();
    }
  }

  function _dayPart() {
    const hour = new Date().getHours();
    return hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
  }

  function _isActive(a) {
    return !a.archived && a.status === 'active' && (!a.expires_at || Date.parse(a.expires_at) > Date.now());
  }

  function _relativeTime(value) {
    const ins = I();
    if (ins) return ins.relativeTime(value);
    const ms = Date.now() - Date.parse(value);
    if (!Number.isFinite(ms) || ms < 0) return 'just now';
    const mins = Math.floor(ms / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins} min ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return days === 1 ? 'yesterday' : `${days} days ago`;
  }

  // ── Overview ──────────────────────────────────────────────────────
  function _renderSetupGuide(active, hasWork, submitted) {
    const placeholders = active.filter(p => /^Student\s+\d+$/i.test(String(p.name || '').trim())).length;
    const named = active.length - placeholders;
    const shared = _accessType === 'shared';
    const rosterReady = shared ? !!_classPin : active.length > 0 && placeholders === 0;
    const step1Title = shared
      ? (_classPin ? 'Your shared class PIN is ready' : 'Check the shared class PIN')
      : !active.length ? 'Add your pupils'
      : placeholders ? `Replace the ${placeholders} numbered pupil name${placeholders === 1 ? '' : 's'}`
      : `${named} pupil${named === 1 ? '' : 's'} ready`;
    const step1Text = shared
      ? 'The whole class uses one four-digit PIN. You will send it together with each work link.'
      : !active.length
        ? 'Add each pupil by name. The app creates a private four-digit PIN for each one.'
        : placeholders
          ? `Your pupil slots already exist. Open Pupils and rename “Student 1”, “Student 2” and the others to the real names before sharing PINs.`
          : 'Each pupil has a private four-digit PIN. Only that pupil and you should see it.';
    const step1Button = shared ? 'View class PIN' : placeholders ? 'Name my pupils' : active.length ? 'Review pupils & PINs' : 'Add pupils';
    const step = (number, state, icon, title, text, action, label) => `
      <article class="tc-setup-step tc-setup-${state}">
        <div class="tc-setup-step-top"><span class="tc-setup-number">${state === 'done' ? '✓' : number}</span><span class="tc-setup-icon" aria-hidden="true">${icon}</span></div>
        <div class="tc-setup-step-copy"><small>${state === 'done' ? 'READY' : state === 'current' ? 'DO THIS NEXT' : 'THEN'}</small><h4>${title}</h4><p>${text}</p></div>
        ${action ? `<button type="button" onclick="${action}">${label} →</button>` : '<span class="tc-setup-wait">This unlocks after you set work</span>'}
      </article>`;
    return `
      <section class="tc-setup-guide" aria-label="Classroom getting started guide">
        <div class="tc-setup-head">
          <div><span class="tc-setup-kicker">YOUR FIRST CLASS ACTIVITY</span><h3>Let’s get ${esc(_className)} ready</h3><p>Follow these three steps. Nothing here creates a pupil account or asks families to register.</p></div>
          <button type="button" class="tc-setup-skip" onclick="TeacherClassroomDetail.dismissSetupGuide()">Use full dashboard</button>
        </div>
        <div class="tc-setup-flow" aria-label="Three setup steps">
          ${step(1, rosterReady ? 'done' : 'current', shared ? '🔑' : '👥', step1Title, step1Text, "TeacherClassroomDetail.showSection('pupils')", step1Button)}
          ${step(2, hasWork ? 'done' : (rosterReady ? 'current' : 'upcoming'), '📝', hasWork ? 'Your first activity is ready' : 'Set the first activity', 'Choose questions for pupils to answer on screen, or upload a worksheet for paper work.', 'TeacherClassroomDetail.showHomeworkChoice()', hasWork ? 'Set another activity' : 'Choose questions or worksheet')}
          ${step(3, submitted > 0 ? 'done' : (hasWork ? 'current' : 'upcoming'), '📤', submitted > 0 ? 'Pupil responses are arriving' : hasWork ? 'Share it with the class' : 'Share the activity', hasWork ? 'Open Work, choose Share, then send the link and the correct PIN instructions to your pupils.' : 'After you create the activity, the app prepares its link and tells pupils which PIN to enter.', hasWork ? "TeacherClassroomDetail.showSection('work')" : '', 'Open work & share')}
        </div>
        <p class="tc-setup-reassure"><span aria-hidden="true">💡</span><b>What happens next?</b> Pupils open the link, enter their PIN and answer. Results and pupils who may need help then appear here automatically.</p>
      </section>`;
  }

  function _renderOverview() {
    const box = el('tc-cd-overview');
    if (!box) return;
    const active = _assignments.filter(_isActive);
    const activePupils = _pupils.filter(p => p.active);
    const pupils = activePupils.length;
    const submitted = active.reduce((sum, a) => sum + Number(a.submissions || 0), 0);
    const allSubmitted = _assignments.reduce((sum, a) => sum + Number(a.submissions || 0), 0);
    const hasWork = _assignments.length > 0 || _physicalHomework.length > 0;
    const attention = _signals.attention;
    const activity = _signals.activity.slice(0, 5);
    const needHelp = [..._rollup.values()].filter(p => p.needsHelp);
    if (!_workLoaded || !_pupilsLoaded) { box.innerHTML = _skeleton(); return; }
    if (!_workError && (_setupGuideForced || (!hasWork && !_loadPrefs().setupDismissed))) {
      box.innerHTML = _renderSetupGuide(activePupils, hasWork, allSubmitted);
      return;
    }
    box.innerHTML = `
      <div class="tc-today-hero">
        <div><span class="tc-today-kicker">CLASSROOM OVERVIEW</span><h3>Good ${_dayPart()} 👋</h3><p>Here is what is happening in ${esc(_className)}.</p></div>
        <div class="tc-today-actions"><button type="button" class="tc-setup-help" onclick="TeacherClassroomDetail.showSetupGuide()">❓ How classrooms work</button><button class="tc-cd-action-btn tc-cd-action-big" onclick="TeacherClassroomDetail.createWork()">✏️ Set work</button></div>
      </div>
      ${_workError ? `<div class="tc-cd-inline-error"><p>${esc(_workError)}</p><button type="button" onclick="TeacherClassroomDetail.retryWork()">Try again</button></div>` : ''}
      <div class="tc-today-stats">
        <button type="button" onclick="TeacherClassroomDetail.showSection('pupils')"><span class="purple">👥</span><strong>${_pupilError ? '-' : pupils}</strong><small>Pupils</small></button>
        <button type="button" onclick="TeacherClassroomDetail.showSection('work')"><span class="blue">📋</span><strong>${active.length}</strong><small>Active assignments</small></button>
        <button type="button" onclick="TeacherClassroomDetail.showSection('pupils')"><span class="amber">🙋</span><strong>${_signals.loading ? '…' : needHelp.length}</strong><small>May need attention</small></button>
        <button type="button" onclick="TeacherClassroomDetail.showSection('work')"><span class="green">✓</span><strong>${submitted}</strong><small>Submissions</small></button>
        <button type="button" onclick="TeacherClassroomDetail.showSection('materials')"><span class="blue">📁</span><strong>${_materials.length}</strong><small>Materials</small></button>
      </div>
      <div class="tc-today-columns">
        <section class="tc-today-panel">
          <div class="tc-today-panel-head"><div><span>⚡</span><h4>Recent activity</h4></div>${_signals.sampled ? `<small>Latest ${_signals.sampled} assignment${_signals.sampled === 1 ? '' : 's'}</small>` : ''}</div>
          ${_signals.loading ? '<p class="tc-today-loading">Checking recent submissions…</p>' : activity.length ? activity.map(r => `
            <div class="tc-activity-row"><span class="tc-activity-avatar">${esc((r.name || '?').trim().charAt(0).toUpperCase() || '?')}</span><div><strong>${esc(r.name || 'Pupil')} submitted</strong><small>${esc(r.title)} · ${esc(r.pct)}%</small></div><time>${esc(_relativeTime(r.submitted_at))}</time></div>`).join('') : '<p class="tc-today-empty">No recent submissions yet. New activity will appear here.</p>'}
        </section>
        <section class="tc-today-panel">
          <div class="tc-today-panel-head"><div><span>🎯</span><h4>Needs attention</h4></div><button type="button" onclick="TeacherClassroomDetail.showSection('pupils')">All pupils</button></div>
          ${_signals.loading ? '<p class="tc-today-loading">Looking for pupils who may need help…</p>' : attention.length ? attention.slice(0, 5).map(r => `
            <div class="tc-attention-row"><span>${r.kind === 'not-started' ? '⏳' : r.kind === 'in-progress' ? '✏️' : '💡'}</span><div><strong>${esc(r.name || 'Pupil')}</strong><small>${esc(r.message)} · ${esc(r.title)}</small></div></div>`).join('') : `<p class="tc-today-empty tc-today-good">${_signals.sampled ? '✓ Nothing urgent in the assignments checked.' : 'Set some work and this panel will show who needs a hand.'}</p>`}
          ${_signals.failed ? `<p class="tc-today-empty">${_signals.failed} assignment${_signals.failed === 1 ? '' : 's'} could not be checked. <button type="button" class="ta-link-btn" onclick="TeacherClassroomDetail.retrySignals()">Try again</button></p>` : ''}
        </section>
      </div>`;
  }

  async function _loadDashboardSignals() {
    const token = ++_signalEpoch;
    const classroomId = _classId;
    const relevant = _assignments.filter(_isActive).slice(0, 8);
    _signals = { loading: relevant.length > 0, activity: [], attention: [], sampled: relevant.length, failed: 0 };
    if (_activeSection === 'overview') _renderOverview();
    if (!relevant.length) { _signalGroups = []; _rollup = new Map(); if (_activeSection === 'pupils') _renderPupils(); return; }
    const ws = typeof TeacherWorkspace !== 'undefined' ? TeacherWorkspace : null;
    const results = await Promise.all(relevant.map(async a => {
      try {
        const rows = ws && ws.fetchResults ? await ws.fetchResults(a.id) : (await _sb.rpc('teacher_guest_results', {p_assignment_id: a.id})).data?.submissions;
        return Array.isArray(rows) ? { assignment: a, rows } : null;
      } catch (_) { return null; }
    }));
    if (token !== _signalEpoch || classroomId !== _classId) return;
    const valid = results.filter(Boolean);
    const activity = valid.flatMap(group => group.rows.filter(r => r.submitted_at).map(r => ({...r, title: group.assignment.title})))
      .sort((a, b) => Date.parse(b.submitted_at) - Date.parse(a.submitted_at));
    const ins = I();
    const latestByPupil = new Map();
    valid.forEach(group => group.rows.forEach(r => {
      const key = r.name_key || String(r.name || '').toLowerCase();
      const current = latestByPupil.get(key);
      const urgent = group.assignment.expires_at && Date.parse(group.assignment.expires_at) - Date.now() <= 2 * 86400000;
      const low = ins ? ins.needsHelp(r) : (r.submitted_at && Number(r.pct) < 60);
      const priority = r.not_started && urgent ? 3 : !r.submitted_at && !r.not_started && urgent ? 2 : low ? 1 : 0;
      if (priority && (!current || priority > current.priority)) latestByPupil.set(key, {
        ...r, title: group.assignment.title, priority,
        kind: r.not_started ? 'not-started' : !r.submitted_at ? 'in-progress' : 'low-score',
        message: r.not_started ? 'Has not started' : !r.submitted_at ? 'Started but not submitted' : `Scored ${Number(r.pct)}%`
      });
    }));
    _signalGroups = valid;
    _rollup = ins ? ins.pupilRollup(valid) : new Map();
    _signals = { loading: false, activity, attention: [...latestByPupil.values()].sort((a,b) => b.priority-a.priority), sampled: valid.length, failed: relevant.length - valid.length };
    if (_activeSection === 'overview') _renderOverview();
    if (_activeSection === 'pupils') _renderPupils();
    if (_activeSection === 'work') _renderWork();
  }

  function retrySignals() { _loadDashboardSignals(); }
  function retryWork() { _loadWork(); }
  function showSetupGuide() { _setupGuideForced = true; _renderOverview(); }
  function dismissSetupGuide() { _setupGuideForced = false; _savePrefs({ setupDismissed: true }); _renderOverview(); }

  // ── Work list: digital assignments + worksheets + materials ──────
  function setWorkFilter(f) { _workFilter = f; _renderWork(); }

  function _renderWork() {
    const box = el('tc-cd-work');
    if (!box) return;
    const filtered = _assignments.filter(a => _workFilter === 'active' ? _isActive(a) : _workFilter === 'closed' ? (!a.archived && !_isActive(a)) : a.archived);
    const counts = { active: _assignments.filter(_isActive).length, closed: _assignments.filter(a => !a.archived && !_isActive(a)).length, archived: _assignments.filter(a => a.archived).length };
    const expired = hw => hw.expires_at && Date.parse(hw.expires_at) <= Date.now();
    const sheets = _physicalHomework.filter(hw => _workFilter === 'active' ? !expired(hw) : _workFilter === 'closed' ? expired(hw) : false);
    const hasAnything = _assignments.length || _physicalHomework.length || _materials.length;
    box.innerHTML = `
      <div class="tc-cd-section-header tc-work-heading">
        <div><h3 class="tc-cd-section-title">Work</h3><p>Homework, tests, worksheets and files for ${esc(_className)}.</p></div>
        <button class="tc-cd-action-btn" onclick="TeacherClassroomDetail.showHomeworkChoice()">＋ Set work</button>
      </div>
      ${_workError ? `<div class="tc-cd-inline-error"><p>${esc(_workError)}</p><button type="button" onclick="TeacherClassroomDetail.retryWork()">Try again</button></div>` : ''}
      <div class="tc-work-filters" role="tablist" aria-label="Filter work">
        ${[['active', 'Active'], ['closed', 'Closed'], ['archived', 'Archived']].map(([k, label]) => `<button type="button" role="tab" aria-selected="${_workFilter === k}" class="tc-work-filter ${_workFilter === k ? 'on' : ''}" onclick="TeacherClassroomDetail.setWorkFilter('${k}')">${label} <span>${counts[k] + (k === 'active' ? _physicalHomework.filter(h => !expired(h)).length : k === 'closed' ? _physicalHomework.filter(expired).length : 0)}</span></button>`).join('')}
      </div>
      ${!hasAnything && !_workError ? '<div class="tc-work-empty"><span>📚</span><strong>No classwork yet</strong><p>Set your first homework and pupil progress will appear here automatically.</p><button type="button" onclick="TeacherClassroomDetail.showHomeworkChoice()">Set the first piece of work →</button></div>' : ''}
      <div id="tc-cd-work-cards"></div>
      ${sheets.length ? '<h4 class="tc-work-subhead">📄 Worksheets</h4><div id="tc-cd-phw-list"></div>' : ''}
      ${_workFilter === 'active' ? `<h4 class="tc-work-subhead">📁 Files shared with this class <button type="button" class="ta-link-btn" onclick="TeacherClassroomDetail.showSection('materials')">${_materials.length ? 'Manage' : 'Upload one'}</button></h4>${_materials.length ? `<div class="tc-work-files">${sortMaterials(_materials, 'recent').slice(0, 6).map(f => `<button type="button" class="tc-work-file" onclick="TeacherClassroomDetail.openFile('${esc(f.file_path)}',${Number(f.link_expiry_seconds)||3600})"><span>${(f.file_name||'').endsWith('.pdf') ? '📄' : '🖼️'}</span><strong>${esc(f.title)}</strong><small>${f.subject ? esc(f.subject) + ' · ' : ''}${_fmtDate(f.shared_at || f.created_at)}</small></button>`).join('')}</div>` : `<p class="tc-cd-empty">No files yet - share a worksheet, a past paper or a photo of the board and every pupil in ${esc(_className)} can open it from their own device.</p>`}` : ''}
    `;
    const cards = el('tc-cd-work-cards');
    if (hasAnything && cards) {
      if (typeof TeacherWorkspace !== 'undefined' && TeacherWorkspace.drawCards) {
        TeacherWorkspace.drawCards(cards, filtered, true,
          _workFilter === 'active' ? 'No active work. Everything set for this class is finished or archived.' : _workFilter === 'closed' ? 'Nothing has closed yet.' : 'Nothing is archived.',
          { onResults: a => { _loadResultsFor(a.id); showSection('results'); }, onArchived: () => _loadWork() });
      }
    }
    _renderPhysicalHomework(sheets);
  }

  function _renderPhysicalHomework(list) {
    const box = el('tc-cd-phw-list');
    const rows = list || _physicalHomework;
    if (!box || !rows.length) return;
    const fmt = iso => iso ? new Date(iso).toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric'}) : '';
    const expired = hw => hw.expires_at && Date.parse(hw.expires_at) <= Date.now();
    box.innerHTML = rows.map(hw => `
      <div class="tc-phw-card${expired(hw) ? ' tc-phw-expired' : ''}">
        <div class="tc-phw-badge">📄 Worksheet</div>
        <div class="tc-phw-body">
          <p class="tc-phw-title">${esc(hw.title)}</p>
          ${hw.subject ? `<p class="tc-phw-meta">${esc(hw.subject)}</p>` : ''}
          ${hw.description ? `<p class="tc-phw-desc">${esc(hw.description)}</p>` : ''}
          <p class="tc-phw-due ${expired(hw) ? 'tc-phw-due-expired' : ''}">
            ${expired(hw) ? '⏰ Closed' : '📅 Due'} ${fmt(hw.expires_at)}
          </p>
        </div>
        <div class="tc-phw-actions">
          ${hw.file_path ? `<button onclick="TeacherClassroomDetail.downloadPhysicalHW('${esc(hw.file_path)}','${esc(hw.file_name||'file')}')" class="tc-cd-pill">📥 Open</button>` : ''}
          <button onclick="TeacherClassroomDetail.deletePhysicalHW('${esc(hw.id)}','${esc(hw.file_path||'')}')" class="tc-cd-pill tc-cd-pill-red">Delete</button>
        </div>
      </div>`).join('');
  }

  function _shareAssignment(a) {
    if (typeof TeacherWorkspace !== 'undefined' && TeacherWorkspace.share) { TeacherWorkspace.share(a); return; }
    const url  = `${location.origin}/a/${encodeURIComponent(a.code)}`;
    const hint = a.access_mode === 'classroom_pin' ? 'Enter your pupil PIN.'
               : a.access_mode === 'nickname'       ? 'Enter your nickname (no PIN needed).'
               : 'Assignment PIN required.';
    const closes = a.expires_at ? new Date(a.expires_at).toLocaleString() : 'No deadline';
    const text = `${a.title}\n${a.question_count} questions\n${url}\n${hint}\nCloses: ${closes}`;
    // ⚠ The panel first, never navigator.share first: WhatsApp has to be on
    // screen every time. The OS sheet lists it only where the OS knows it.
    _showSharePanel(a.title, url, `https://wa.me/?text=${encodeURIComponent(text)}`);
  }

  function _showSharePanel(title, url, wa) {
    document.getElementById('tc-share-panel')?.remove();
    const panel = document.createElement('div');
    panel.id = 'tc-share-panel';
    panel.className = 'tc-share-panel';
    panel.innerHTML = `
      <div class="tc-share-inner">
        <div class="tc-share-header">
          <span class="tc-share-title">Share assignment</span>
          <button onclick="document.getElementById('tc-share-panel').remove()" class="tc-share-close">&#x2715;</button>
        </div>
        <p class="tc-share-lbl">Link</p>
        <div class="tc-share-url-row">
          <input id="tc-share-url-input" class="tc-share-url" readonly value="${esc(url)}">
          <button id="tc-share-copy-btn" class="tc-share-copy-btn">Copy</button>
        </div>
        <a href="${esc(wa)}" target="_blank" rel="noopener" class="tc-share-wa-btn">
          <span>&#x1F4AC;</span> Share via WhatsApp
        </a>
        <p class="tc-share-hint">WhatsApp opens in a new tab with the message pre-filled.</p>
      </div>`;
    document.body.appendChild(panel);
    panel.addEventListener('click', e => { if (e.target === panel) panel.remove(); });
    panel.querySelector('#tc-share-copy-btn').onclick = () => {
      const b = panel.querySelector('#tc-share-copy-btn');
      navigator.clipboard?.writeText(url).then(() => { b.textContent = 'Copied!'; setTimeout(() => { b.textContent = 'Copy'; }, 2000); })
        .catch(() => panel.querySelector('#tc-share-url-input').select());
    };
  }

  // ── Homework type choice ──────────────────────────────────────────
  function showHomeworkChoice() {
    document.getElementById('tc-hw-choice')?.remove();
    const overlay = document.createElement('div');
    overlay.id = 'tc-hw-choice';
    overlay.className = 'tc-hw-overlay';
    overlay.innerHTML = `
      <div class="tc-hw-choice-panel" role="dialog" aria-modal="true" aria-label="Set work">
        <div class="tc-hw-choice-header">
          <span>What kind of work?</span>
          <button onclick="document.getElementById('tc-hw-choice').remove()" class="tc-hw-close" aria-label="Close">&#x2715;</button>
        </div>
        <div class="tc-hw-choice-cards">
          <button class="tc-hw-choice-card" onclick="TeacherClassroomDetail._chooseDigital()">
            <span class="tc-hw-card-icon">📝</span>
            <strong>Questions on screen</strong>
            <small>From the question bank - pupils answer on a phone or computer and results come back to you automatically</small>
          </button>
          <button class="tc-hw-choice-card" onclick="TeacherClassroomDetail._chooseWorksheet()">
            <span class="tc-hw-card-icon">📄</span>
            <strong>Worksheet to print</strong>
            <small>PDF or photo - pupils work on paper and hand it in</small>
          </button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  }

  function _chooseDigital() {
    document.getElementById('tc-hw-choice')?.remove();
    createWork();
  }

  function _chooseWorksheet() {
    document.getElementById('tc-hw-choice')?.remove();
    _openPhysicalForm();
  }

  function _openPhysicalForm() {
    document.getElementById('tc-phw-form')?.remove();
    const overlay = document.createElement('div');
    overlay.id = 'tc-phw-form';
    overlay.className = 'tc-hw-overlay';
    overlay.innerHTML = `
      <div class="tc-hw-form-panel" role="dialog" aria-modal="true" aria-label="Upload worksheet">
        <div class="tc-hw-choice-header">
          <span>📄 Upload worksheet</span>
          <button onclick="document.getElementById('tc-phw-form').remove()" class="tc-hw-close" aria-label="Close">&#x2715;</button>
        </div>
        <div class="tc-hw-form-body">
          <div class="ncf-field">
            <label for="phw-title">Title <span style="color:#e07">*</span></label>
            <input id="phw-title" type="text" maxlength="80" placeholder="e.g. Chapter 4 worksheet"
              class="ncf-input" autocomplete="off">
          </div>
          <div class="ncf-field">
            <label for="phw-subject">Subject</label>
            <select id="phw-subject" class="ncf-input">
              <option value="">All subjects</option>
              <option value="maths">Maths</option>
              <option value="english">English</option>
              <option value="french">French</option>
              <option value="science">Science</option>
              <option value="history">History &amp; Geography</option>
            </select>
          </div>
          <div class="ncf-field">
            <label for="phw-desc">Instructions (optional)</label>
            <input id="phw-desc" type="text" maxlength="200" placeholder="e.g. Answer all questions, show your working"
              class="ncf-input" autocomplete="off">
          </div>
          <div class="ncf-field">
            <label>File (optional - PDF or image, max 10 MB)</label>
            <input id="phw-file"   type="file" accept="application/pdf,image/*" class="hidden"
              onchange="TeacherClassroomDetail._onPhysicalFileChosen('file')">
            <input id="phw-camera" type="file" accept="image/*" capture="environment" class="hidden"
              onchange="TeacherClassroomDetail._onPhysicalFileChosen('camera')">
            <div class="tm-pick-row">
              <label for="phw-file" class="tc-cd-pick-btn">📎 Choose file</label>
              <button type="button" class="tc-cd-pick-btn tc-cd-pick-camera"
                onclick="document.getElementById('phw-camera').click()">📷 Camera</button>
              <span id="phw-filename" class="tc-cd-filename-hint">No file chosen</span>
            </div>
          </div>
          <div class="ncf-field">
            <label for="phw-expiry">Due in</label>
            <select id="phw-expiry" class="ncf-input">
              <option value="1">1 day</option>
              <option value="3">3 days</option>
              <option value="7" selected>1 week</option>
              <option value="14">2 weeks</option>
              <option value="30">1 month</option>
              <option value="90">3 months</option>
              <option value="180">6 months</option>
            </select>
          </div>
          <p class="ncf-err hidden" id="phw-err"></p>
        </div>
        <div class="ncf-actions">
          <button class="ncf-btn-cancel" onclick="document.getElementById('tc-phw-form').remove()">Cancel</button>
          <button class="ncf-btn-create" id="phw-submit" onclick="TeacherClassroomDetail._submitPhysical()">Assign to class &#x2192;</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    setTimeout(() => document.getElementById('phw-title')?.focus(), 60);
    document.getElementById('phw-title')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); _submitPhysical(); }
    });
  }

  function _onPhysicalFileChosen(source) {
    if (source === 'camera') { const f = document.getElementById('phw-file');   if (f) f.value = ''; }
    else                     { const c = document.getElementById('phw-camera'); if (c) c.value = ''; }
    const file = (source === 'camera'
      ? document.getElementById('phw-camera')
      : document.getElementById('phw-file'))?.files[0];
    const hint = document.getElementById('phw-filename');
    if (hint) hint.textContent = file ? file.name : 'No file chosen';
  }

  function _phwSetErr(msg) {
    const e = document.getElementById('phw-err');
    if (!e) return;
    e.textContent = msg || '';
    e.classList.toggle('hidden', !msg);
  }

  let _phwSubmitting = false;
  async function _submitPhysical() {
    if (_phwSubmitting) return;
    const title   = document.getElementById('phw-title')?.value.trim();
    if (!title) { _phwSetErr('Please enter a title.'); document.getElementById('phw-title')?.focus(); return; }
    const subject = document.getElementById('phw-subject')?.value || null;
    const desc    = document.getElementById('phw-desc')?.value.trim() || null;
    const file    = document.getElementById('phw-camera')?.files[0] || document.getElementById('phw-file')?.files[0];
    if (file && file.size > 10 * 1024 * 1024) { _phwSetErr('File must be under 10 MB.'); return; }
    const days    = parseInt(document.getElementById('phw-expiry')?.value || '7', 10);
    const expiresAt = new Date(Date.now() + days * 86400000).toISOString();

    const btn = document.getElementById('phw-submit');
    if (btn) { btn.disabled = true; btn.textContent = 'Assigning…'; }
    _phwSetErr('');
    _phwSubmitting = true;

    try {
      const user = (await _sb.auth.getUser()).data?.user;
      if (!user) throw new Error('Not signed in.');

      let filePath = null, fileName = null, fileSize = null;
      if (file) {
        const ext = file.name.split('.').pop();
        filePath = `${user.id}/hw_${Date.now()}.${ext}`;
        fileName = file.name;
        fileSize = file.size;
        const {error: upErr} = await _sb.storage.from('learning-materials').upload(filePath, file);
        if (upErr) throw new Error('Upload failed: ' + upErr.message);
      }

      const {error: dbErr} = await _sb.from('physical_homework').insert({
        teacher_id: user.id, classroom_id: _classId,
        title, subject, description: desc,
        file_path: filePath, file_name: fileName, file_size: fileSize,
        expires_at: expiresAt,
      });
      if (dbErr) {
        if (filePath) await _sb.storage.from('learning-materials').remove([filePath]);
        throw new Error(dbErr.message);
      }

      document.getElementById('tc-phw-form')?.remove();
      if (typeof toast === 'function') toast('Worksheet assigned! ✓', 2000);
      await _loadWork();
    } catch(e) {
      _phwSetErr(e.message || 'Something went wrong.');
      if (btn) { btn.disabled = false; btn.textContent = 'Assign to class →'; }
    } finally { _phwSubmitting = false; }
  }

  async function downloadPhysicalHW(filePath, fileName) {
    if (!filePath) return;
    const {data, error} = await _sb.storage.from('learning-materials').createSignedUrl(filePath, 3600);
    if (error || !data?.signedUrl) { if (typeof toast === 'function') toast('Could not open file.', 2000); return; }
    const a = document.createElement('a');
    a.href = data.signedUrl; a.target = '_blank'; a.rel = 'noopener';
    a.download = fileName || 'worksheet';
    document.body.appendChild(a); a.click(); a.remove();
  }

  function deletePhysicalHW(id, filePath) {
    const go = async () => {
      // ⚠ Zero rows is a refusal — no error, no rows. Deleting the stored file
      //   after an unverified row delete would strand a worksheet pupils can
      //   still see but nobody can open.
      const {data, error} = await _sb.from('physical_homework')
        .delete().eq('id', id).select('id');
      if (error || !data?.length) {
        if (error) console.error('[deletePhysicalHW]', error.message);
        if (typeof toast === 'function') toast(error ? 'Could not delete: ' + error.message : 'Could not delete that worksheet.', 3000);
        return;
      }
      if (filePath) await _sb.storage.from('learning-materials').remove([filePath]);
      if (typeof toast === 'function') toast('Deleted.', 1500);
      await _loadWork();
    };
    const msg = 'Delete this worksheet? Pupils will no longer see it.';
    if (typeof _confirmModal === 'function') _confirmModal(msg, go, { okLabel: 'Delete' });
    else if (confirm(msg)) go();
  }

  function createWork() {
    const prefs = _loadPrefs();
    const cid   = _classId;
    close();
    if (typeof TeacherMode === 'undefined') return;
    TeacherMode.switchTab('create');
    if (TeacherMode.chooseClassroom) TeacherMode.chooseClassroom(cid);
    else {
      const sel = document.getElementById('ta-classroom');
      if (sel) { sel.value = cid; sel.dispatchEvent(new Event('change')); }
    }
    // Apply classroom defaults
    if (prefs.defaultMode && TeacherMode.setShareMode) TeacherMode.setShareMode(prefs.defaultMode);
    if (prefs.defaultTime) {
      const modeEl = document.getElementById('ta-mode');
      if (modeEl) { modeEl.value = 'test'; TeacherMode.modeChanged?.(); }
      const timeEl = document.getElementById('ta-duration');
      if (timeEl) timeEl.value = String(prefs.defaultTime);
    }
  }

  // ── Pupils ────────────────────────────────────────────────────────
  async function _loadPupils() {
    const box = el('tc-cd-pupils');
    if (!box) return;
    const classId = _classId;
    try {
      const { data, error } = await _sb.rpc('teacher_guest_manage', {p_action: 'roster', p_classroom: classId});
      if (error || !data?.ok) throw new Error(error?.message || 'roster failed');
      if (classId !== _classId) return;
      // A PIN is shown only after the teacher asks for it; never trust a
      // roster row that arrives with one attached.
      _pupils = (data.pupils || []).map(({ pin, ...p }) => p);
      await _loadNameHistory(_classId);
      if (_accessType === 'shared') await _loadDevices(_classId);
      _accessType = data.access_type || 'per_student';
      _classPin = data.class_pin || null;
      _pupilError = '';
      _pupilsLoaded = true;
      el('tc-cd-stat-pupils').textContent = _pupils.filter(p => p.active).length;
      if (_activeSection === 'pupils') _renderPupils();
      if (_activeSection === 'overview') _renderOverview();
      if (_activeSection === 'work') _renderWork();
    } catch(_e) {
      if (classId !== _classId) return;
      _pupilError = 'Could not load the pupil list. Nothing has been deleted.';
      _pupilsLoaded = true;
      if (_activeSection === 'pupils') _renderPupils();
      if (_activeSection === 'overview') _renderOverview();
    }
  }
  function retryPupils() { const box = el('tc-cd-pupils'); if (box) box.innerHTML = _skeleton(); _loadPupils(); }

  function _pupilActivity(p) {
    const r = _rollup.get(String(p.id));
    if (_signals.loading) return { text: 'Checking recent work…', flag: false };
    if (!r) return { text: _signals.sampled ? 'No work opened yet' : 'No work set yet', flag: false };
    const bits = [];
    if (r.last) bits.push(`Last submitted ${_relativeTime(r.last)}`);
    bits.push(`${r.completed} of ${r.assigned} completed`);
    if (r.accuracy != null) bits.push(`${r.accuracy}% correct`);
    return { text: bits.join(' · '), flag: !!r.needsHelp, reason: r.reason };
  }

  // ⚠ DEVICES, not pupils, and the wording says so. Two children sharing a
  // tablet are one row here; one child on a phone and a tablet is two. The tag
  // is the last 6 characters of the device code — enough to tell two tablets
  // apart, useless for impersonating one.
  function _deviceListHtml() {
    const list = Array.isArray(_devices) ? _devices : [];
    if (!list.length) {
      return '<p class="tc-cd-empty">No devices have joined yet. Names appear here as pupils sign in with the class PIN.</p>';
    }
    const rows = list.map(d => '<li class="tc-cd-device">'
      + '<b>' + esc(d.name || '?') + '</b>'
      + '<span class="tc-cd-device-tag">device …' + esc(d.device_tag || '') + '</span>'
      + '<span class="tc-cd-device-when">last seen ' + esc(_fmtDate(d.last_seen_at)) + '</span></li>').join('');
    return '<h4 class="tc-cd-section-sub">Who has joined ('
      + list.length + ' device' + (list.length === 1 ? '' : 's') + ')</h4>'
      + '<ul class="tc-cd-device-list">' + rows + '</ul>'
      + '<p class="tc-cd-empty">These are names pupils typed themselves on each device.</p>';
  }

  // Never blocks the screen: a missing list is better than a missing classroom.
  async function _loadDevices(classroomId) {
    _devices = [];
    if (!classroomId || typeof _sb === 'undefined') return;
    try {
      const { data, error } = await _sb.rpc('teacher_guest_device_list', { p_classroom_id: classroomId });
      if (!error && data && data.ok) _devices = data.devices || [];
    } catch (_) { /* the PIN banner still renders */ }
  }

  // ⚠ Renames only, newest first. A trail that also listed every pupil once at
  // creation would be noise a teacher has to read past — the RPC filters those.
  // ⚠ It says WHO changed it. "Changed by the pupil" is the case a teacher may
  // actually want to look at; a child quietly taking another child's name is
  // the thing this exists to make visible.
  function _nameHistoryHtml() {
    const list = Array.isArray(_nameChanges) ? _nameChanges : [];
    if (!list.length) return '';
    const rows = list.slice(0, 20).map(h => '<li class="tc-cd-name-change">'
      + '<b>' + esc(h.old_name || '?') + '</b> → <b>' + esc(h.new_name || '?') + '</b>'
      + '<span class="tc-cd-name-who tc-cd-name-who-' + (h.changed_by === 'pupil' ? 'pupil' : 'teacher') + '">'
      + (h.changed_by === 'pupil' ? 'changed by the pupil' : 'changed by you') + '</span>'
      + '<span class="tc-cd-name-when">' + esc(_fmtDate(h.changed_at)) + '</span></li>').join('');
    return '<details class="tc-cd-name-history"><summary>✏️ Name changes ('
      + list.length + ')</summary><ul>' + rows + '</ul>'
      + (list.length > 20 ? '<p class="tc-cd-empty">Showing the 20 most recent.</p>' : '')
      + '</details>';
  }

  // Never blocks the pupil list: a missing trail is better than a missing class.
  async function _loadNameHistory(classroomId) {
    _nameChanges = [];
    if (!classroomId || typeof _sb === 'undefined') return;
    try {
      const { data, error } = await _sb.rpc('teacher_pupil_name_history', { p_classroom_id: classroomId });
      if (!error && data && data.ok) _nameChanges = data.changes || [];
    } catch (_) { /* the pupil list still renders without it */ }
  }

  function _renderPupils() {
    const box = el('tc-cd-pupils');
    if (!box) return;
    if (_pupilError && !_pupils.length) {
      box.innerHTML = `<div class="tc-cd-inline-error"><p>${esc(_pupilError)}</p><button type="button" onclick="TeacherClassroomDetail.retryPupils()">Try again</button></div>`;
      return;
    }
    const active  = _pupils.filter(p =>  p.active);
    const removed = _pupils.filter(p => !p.active);

    if (_accessType === 'shared') {
      box.innerHTML = `
        <div class="tc-cd-section-header">
          <h3 class="tc-cd-section-title">🚪 Shared PIN classroom</h3>
        </div>
        <div class="tc-cd-shared-pin-banner">
          <div class="tc-cd-shared-pin-label">Class PIN - share this with all your pupils</div>
          <div class="tc-cd-big-pin" id="tc-cd-class-pin-display">${_classPin ? esc(_classPin) : '••••'}</div>
          <p class="tc-cd-shared-pin-hint">Pupils enter this PIN on the work link, then type their name. Their name is remembered on each device so they do not have to re-enter it.</p>
        </div>
        <div class="tc-cd-tip">📋 Write this PIN on the board or send it to your class group. Anyone with the PIN and the link can join.</div>
        ${_deviceListHtml()}
      `;
      return;
    }

    const query = _pupilQuery.trim().toLowerCase();
    const needHelp = active.filter(p => _pupilActivity(p).flag).length;
    box.innerHTML = `
      <div class="tc-cd-section-header">
        <div><h3 class="tc-cd-section-title">Pupils</h3><p class="tc-cd-section-sub">${active.length} pupil${active.length === 1 ? '' : 's'}${needHelp ? ` · ${needHelp} may need help` : ''}</p></div>
        <div class="tc-cd-add-pupil-row">
          <label for="tc-cd-pupil-name" class="sr-only">New pupil name</label>
          <input id="tc-cd-pupil-name" maxlength="40" placeholder="New pupil’s name…" class="tc-cd-input" value="">
          <button class="tc-cd-action-btn" onclick="TeacherClassroomDetail.addPupil()">＋ Add pupil</button>
        </div>
      </div>
      <p id="tc-cd-pupil-status" class="tc-cd-status-msg" role="status"></p>
      ${_nameHistoryHtml()}
      ${_pupilError ? `<div class="tc-cd-inline-error"><p>${esc(_pupilError)}</p><button type="button" onclick="TeacherClassroomDetail.retryPupils()">Try again</button></div>` : ''}
      ${active.length ? `
        <div class="tc-pupil-overview">
          <label><span aria-hidden="true">🔎</span><input id="tc-cd-pupil-search" type="search" placeholder="Find a pupil…" autocomplete="off" aria-label="Find a pupil" value="${esc(_pupilQuery)}"></label>
          <div class="tc-cd-pins-toolbar">
            <button class="tc-cd-pill tc-cd-pill-pin-toggle" id="tc-cd-reveal-all-btn" onclick="TeacherClassroomDetail.revealAllPins()">🔑 Show all PINs</button>
          </div>
        </div>` : '<div class="tc-work-empty"><span>👥</span><strong>No pupils yet</strong><p>Add each pupil by name. Every pupil gets a private four-digit PIN to open work with.</p></div>'}
      <div class="tc-cd-register" id="tc-cd-register-list">
        ${active.map(p => {
          const pi = _pupils.indexOf(p);
          const act = _pupilActivity(p);
          const revealed = !!p.pin;
          return `
          <div class="tc-cd-register-row tp-row ${act.flag ? 'tp-row-flag' : ''}" data-pi="${pi}" data-search="${esc(String(p.name).toLowerCase())}" ${query && !String(p.name).toLowerCase().includes(query) ? 'hidden' : ''}>
            <button type="button" class="tp-open" onclick="TeacherClassroomDetail.openPupil(${pi})" aria-label="Open ${esc(p.name)}">
              <span class="tc-pupil-avatar" aria-hidden="true">${esc(String(p.name).trim().charAt(0).toUpperCase() || '?')}</span>
              <span class="tc-cd-register-name">${esc(p.name)}<small>${esc(act.text)}</small></span>
            </button>
            ${act.flag ? `<span class="tp-flag" title="${esc(act.reason || '')}">🙋 May need help</span>` : ''}
            <span class="tp-pin">
              <span class="tc-cd-student-pin-badge ${revealed ? '' : 'hidden'}" data-pin-badge="${pi}">${revealed ? esc(p.pin) : '––––'}</span>
              <button type="button" class="tc-cd-pill" data-action="toggle_pin" data-pi="${pi}" aria-label="${revealed ? 'Hide' : 'Show'} PIN for ${esc(p.name)}">${revealed ? '🙈 Hide' : '🔑 PIN'}</button>
              <button type="button" class="tc-cd-pill ${revealed ? '' : 'hidden'}" data-action="copy_pin" data-pi="${pi}" aria-label="Copy PIN for ${esc(p.name)}">📋</button>
            </span>
            <details class="tp-manage">
              <summary aria-label="Manage ${esc(p.name)}">⋯</summary>
              <div class="tp-manage-menu">
                <button type="button" data-action="reset_pin"    data-pi="${pi}">↻ Reset PIN</button>
                <button type="button" data-action="rename_pupil" data-pi="${pi}">✏️ Rename</button>
                <button type="button" class="danger" data-action="toggle_pupil" data-pi="${pi}">Remove from class</button>
              </div>
            </details>
          </div>`;
        }).join('')}
        ${removed.length ? `<details class="tc-cd-archived-toggle"><summary>🗑 ${removed.length} removed</summary>
          ${removed.map(p => `
            <div class="tc-cd-register-row tc-cd-register-row-dim">
              <span class="tc-cd-register-name">${esc(p.name)}</span>
              <button class="tc-cd-pill" data-action="toggle_pupil" data-pi="${_pupils.indexOf(p)}">♻️ Restore</button>
            </div>`).join('')}
        </details>` : ''}
      </div>
      ${active.length ? '<div class="tc-cd-tip">📋 Give each pupil their own PIN and nobody else’s. Tap a pupil’s name to see their work.</div>' : ''}
    `;
    box.querySelectorAll('[data-action]').forEach(b => b.onclick = e => { e.stopPropagation(); _pupilAction(b.dataset.action, +b.dataset.pi, b); });
    const search = el('tc-cd-pupil-search');
    if (search) search.oninput = e => {
      _pupilQuery = String(e.target.value || '');
      const q = _pupilQuery.trim().toLowerCase();
      box.querySelectorAll('.tc-cd-register-row[data-search]').forEach(row => { row.hidden = !!q && !row.dataset.search.includes(q); });
    };
    el('tc-cd-pupil-name')?.addEventListener('keydown', e => { if (e.key === 'Enter') addPupil(); });
    if (_pinsRevealed) _applyRevealedPins(active);
  }

  function _applyRevealedPins(pupils) {
    const btn = document.getElementById('tc-cd-reveal-all-btn');
    let copyAllBtn = document.getElementById('tc-cd-copy-all-pins-btn');
    if (btn) { btn.textContent = '🙈 Hide all PINs'; btn.classList.add('tc-cd-pill-active'); btn.onclick = () => _hidePins(); }
    if (!copyAllBtn && btn) {
      copyAllBtn = document.createElement('button');
      copyAllBtn.id = 'tc-cd-copy-all-pins-btn';
      copyAllBtn.className = 'tc-cd-pill';
      copyAllBtn.type = 'button';
      copyAllBtn.textContent = '📋 Copy all PINs';
      copyAllBtn.onclick = async () => {
        const lines = _pupils.filter(p => p.active && p.pin).map(p => `${p.name}: ${p.pin}`).join('\n');
        if (!lines) return;
        try { await navigator.clipboard.writeText(lines); copyAllBtn.textContent = 'Copied ✓'; setTimeout(() => { copyAllBtn.textContent = '📋 Copy all PINs'; }, 2000); }
        catch { prompt('Copy these PINs:', lines); }
      };
      btn.insertAdjacentElement('afterend', copyAllBtn);
    }
    pupils.forEach(p => {
      if (!p.pin) return;
      _showPinInRow(_pupils.indexOf(p), p.pin);
    });
  }

  function _showPinInRow(pi, pin) {
    const badge = document.querySelector(`[data-pin-badge="${pi}"]`);
    if (badge) { badge.textContent = pin; badge.classList.remove('hidden'); }
    const toggle = document.querySelector(`[data-action="toggle_pin"][data-pi="${pi}"]`);
    if (toggle) { toggle.textContent = '🙈 Hide'; toggle.setAttribute('aria-label', toggle.getAttribute('aria-label').replace(/^Show/, 'Hide')); }
    document.querySelector(`[data-action="copy_pin"][data-pi="${pi}"]`)?.classList.remove('hidden');
  }
  function _hidePinInRow(pi) {
    const badge = document.querySelector(`[data-pin-badge="${pi}"]`);
    if (badge) { badge.textContent = '––––'; badge.classList.add('hidden'); }
    const toggle = document.querySelector(`[data-action="toggle_pin"][data-pi="${pi}"]`);
    if (toggle) { toggle.textContent = '🔑 PIN'; toggle.setAttribute('aria-label', toggle.getAttribute('aria-label').replace(/^Hide/, 'Show')); }
    document.querySelector(`[data-action="copy_pin"][data-pi="${pi}"]`)?.classList.add('hidden');
  }

  function _hidePins() {
    _pinsRevealed = false;
    _pupils.forEach((p, pi) => { if (p.pin) { delete p.pin; _hidePinInRow(pi); } });
    const btn = document.getElementById('tc-cd-reveal-all-btn');
    const copyAllBtn = document.getElementById('tc-cd-copy-all-pins-btn');
    if (btn) { btn.textContent = '🔑 Show all PINs'; btn.classList.remove('tc-cd-pill-active'); btn.onclick = () => revealAllPins(); }
    if (copyAllBtn) copyAllBtn.remove();
  }

  async function revealAllPins() {
    const btn = document.getElementById('tc-cd-reveal-all-btn');
    if (btn) { btn.disabled = true; btn.textContent = 'Loading…'; }
    try {
      const {data, error} = await _sb.rpc('teacher_guest_manage', {p_action: 'reveal_all_pins', p_classroom: _classId});
      if (error || !data?.ok) throw new Error('Failed');
      (data.pupils || []).forEach(rp => {
        const p = _pupils.find(p => p.id === rp.id);
        if (p) p.pin = rp.pin;
      });
      _pinsRevealed = true;
      if (btn) btn.disabled = false;
      _applyRevealedPins(_pupils.filter(p => p.active));
    } catch(_e) {
      toast('Could not retrieve PINs. Please try again.', 2500);
      if (btn) { btn.disabled = false; btn.textContent = '🔑 Show all PINs'; }
    }
  }

  function _promptInline(title, label, defaultVal) {
    return new Promise(resolve => {
      const overlay = document.createElement('div');
      overlay.className = 'tp-dialog-overlay';
      const card = document.createElement('div');
      card.className = 'tp-dialog';
      card.setAttribute('role', 'dialog'); card.setAttribute('aria-modal', 'true'); card.setAttribute('aria-label', title);
      card.innerHTML = `
        <p class="tp-dialog-title">${esc(title)}</p>
        <label class="tp-dialog-label" for="_pi-input">${esc(label)}</label>
        <input id="_pi-input" class="tp-dialog-input" value="${esc(defaultVal || '')}" maxlength="40" />
        <div class="tp-dialog-actions">
          <button id="_pi-cancel" type="button" class="tp-dialog-cancel">Cancel</button>
          <button id="_pi-ok" type="button" class="tp-dialog-ok">Save</button>
        </div>`;
      overlay.appendChild(card);
      document.body.appendChild(overlay);
      const input = card.querySelector('#_pi-input');
      input.focus(); input.select();
      const done = val => { overlay.remove(); resolve(val); };
      card.querySelector('#_pi-cancel').onclick = () => done(null);
      card.querySelector('#_pi-ok').onclick = () => done(input.value);
      input.onkeydown = e => { if (e.key === 'Enter') done(input.value); if (e.key === 'Escape') done(null); };
      overlay.addEventListener('click', e => { if (e.target === overlay) done(null); });
    });
  }

  function _showPinModal(name, pin) {
    const overlay = document.createElement('div');
    overlay.className = 'tp-dialog-overlay';
    const card = document.createElement('div');
    card.className = 'tp-dialog tp-dialog-center';
    card.setAttribute('role', 'dialog'); card.setAttribute('aria-modal', 'true'); card.setAttribute('aria-label', 'PIN for ' + name);
    card.innerHTML = `
      <p class="tp-dialog-label">📌 PIN for</p>
      <p class="tp-dialog-title">${esc(name)}</p>
      <div class="tp-dialog-pin">${esc(pin)}</div>
      <p class="tp-dialog-hint">Give this PIN only to ${esc(name)} - not to the whole class.</p>
      <div class="tp-dialog-actions">
        <button id="_pm-copy" type="button" class="tp-dialog-ok">📋 Copy PIN</button>
        <button id="_pm-close" type="button" class="tp-dialog-cancel">Close</button>
      </div>`;
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    card.querySelector('#_pm-close').onclick = () => overlay.remove();
    const copyBtn = card.querySelector('#_pm-copy');
    copyBtn.onclick = async () => {
      try { await navigator.clipboard.writeText(pin); copyBtn.textContent = 'Copied ✓'; setTimeout(() => { copyBtn.textContent = '📋 Copy PIN'; }, 2000); }
      catch { copyBtn.textContent = pin; }
    };
    copyBtn.focus();
  }

  async function _pupilAction(action, pi, button) {
    const p = _pupils[pi];
    if (!p) return;
    const args = {p_action: action, p_classroom: _classId, p_id: p.id};
    if (action === 'toggle_pin') {
      if (p.pin) { delete p.pin; _hidePinInRow(pi); return; }
      if (button) button.disabled = true;
      try {
        const {data, error} = await _sb.rpc('teacher_guest_manage', {p_action: 'reveal_pin', p_classroom: _classId, p_id: p.id});
        if (error || !data?.pin) throw new Error('no pin');
        p.pin = data.pin;
        _showPinInRow(pi, data.pin);
      } catch(_e) { toast('Could not retrieve the PIN. Please try again.', 2500); }
      finally { if (button) button.disabled = false; }
      return;
    }
    if (action === 'copy_pin') {
      if (!p.pin) return;
      try { await navigator.clipboard.writeText(p.pin); toast(`PIN for ${p.name} copied.`, 1800); }
      catch { prompt(`PIN for ${p.name}:`, p.pin); }
      return;
    }
    if (action === 'reveal_pin') {
      try {
        const {data} = await _sb.rpc('teacher_guest_manage', args);
        if (data?.pin) _showPinModal(p.name, data.pin);
      } catch(_e) { toast('Could not retrieve PIN.', 2500); }
      return;
    }
    const run = async () => {
      try {
        const {data, error} = await _sb.rpc('teacher_guest_manage', args);
        if (error) throw error;
        if (data?.pin) _showPinModal(p.name, data.pin);
        await _loadPupils();
      } catch(_e) { toast('That did not work. Please try again.', 2500); }
    };
    if (action === 'reset_pin') {
      const msg = `Reset ${p.name}'s PIN? The current PIN will stop working and you will see the new one.`;
      if (typeof _confirmModal === 'function') _confirmModal(msg, run, { icon: '🔑', okLabel: 'Reset PIN', danger: false }); else if (confirm(msg)) run();
      return;
    }
    if (action === 'toggle_pupil' && p.active) {
      const msg = `Remove ${p.name} from this class? Past results are kept and you can restore them later.`;
      if (typeof _confirmModal === 'function') _confirmModal(msg, run, { okLabel: 'Remove' }); else if (confirm(msg)) run();
      return;
    }
    if (action === 'rename_pupil') {
      const name = await _promptInline('Rename pupil', 'New name:', p.name);
      if (!name?.trim()) return;
      args.p_name = name.trim();
    }
    await run();
  }

  let _addingPupil = false;
  async function addPupil() {
    if (_addingPupil) return;
    const input  = el('tc-cd-pupil-name');
    const name   = input?.value.trim();
    const status = el('tc-cd-pupil-status');
    if (!name) { if (status) status.textContent = 'Type the pupil’s name first.'; input?.focus(); return; }
    _addingPupil = true;
    try {
      const {data, error} = await _sb.rpc('teacher_guest_manage', {p_action: 'add_pupil', p_classroom: _classId, p_name: name});
      if (error || !data?.ok) throw new Error(error?.message || 'Failed');
      if (data.pin) _showPinModal(name, data.pin);
      if (input)  input.value = '';
      if (status) status.textContent = '';
      await _loadPupils();
    } catch(e) { if (status) status.textContent = e.message || 'Could not add the pupil. Please try again.'; }
    finally { _addingPupil = false; }
  }

  // ── One pupil: their work in this classroom ───────────────────────
  function openPupil(pi) {
    const p = _pupils[pi];
    if (!p) return;
    _openPupilId = p.id;
    document.getElementById('tp-panel')?.remove();
    const ins = I();
    const key = String(p.id);
    const rows = _signalGroups.map(g => ({ assignment: g.assignment, row: g.rows.find(r => r.name_key === key) })).filter(x => x.row);
    const r = _rollup.get(key);
    const act = _pupilActivity(p);
    const overlay = document.createElement('div');
    overlay.id = 'tp-panel';
    overlay.className = 'ta-detail-overlay';
    overlay.tabIndex = -1;
    overlay.innerHTML = `<section class="ta-detail-panel" role="dialog" aria-modal="true" aria-label="Pupil details">
      <button type="button" class="ta-detail-close" aria-label="Close" data-close>×</button>
      <div class="ta-detail-heading"><div><span class="ta-detail-kicker">${esc(_className)}</span><h2>${esc(p.name)}</h2></div>${act.flag ? '<span class="ta-detail-state closed">May need help</span>' : ''}</div>
      <p class="ta-detail-status-note">${esc(act.reason || act.text)}</p>
      ${r ? `<div class="ta-detail-stats">
        <div><strong>${r.completed}</strong><span>Completed</span></div>
        <div><strong>${r.notStarted}</strong><span>Not started</span></div>
        <div><strong>${r.accuracy == null ? '-' : r.accuracy + '%'}</strong><span>Correct</span></div>
        <div><strong>${r.answered}</strong><span>Questions answered</span></div>
      </div>` : ''}
      <div class="ta-detail-section-head"><div><h3>Recent work</h3><p>${_signals.sampled ? `The latest ${_signals.sampled} active assignment${_signals.sampled === 1 ? '' : 's'} in this classroom.` : 'No active work in this classroom yet.'}</p></div></div>
      ${rows.length ? `<div class="ta-detail-pupils">${rows.map(x => {
        const st = ins ? ins.state(x.row) : (x.row.submitted_at ? 'completed' : 'not-started');
        const label = st === 'completed' ? 'Completed' : st === 'working' ? 'Working on it' : 'Not started';
        return `<div class="ta-detail-pupil"><span><strong>${esc(x.assignment.title)}</strong><small>${esc(label)}${x.row.submitted_at ? ' · ' + esc(_relativeTime(x.row.submitted_at)) : ''}</small></span><b class="${st === 'completed' ? 'submitted' : st === 'working' ? 'in-progress' : 'not-started'}">${st === 'completed' ? `${esc(x.row.score)}/${esc(x.row.total)} · ${esc(x.row.pct)}%` : label}</b></div>`;
      }).join('')}</div>` : '<p class="ta-detail-empty">Nothing to show yet.</p>'}
      <div class="ta-detail-footer">
        <button type="button" data-practice>📝 Give ${esc(p.name.split(' ')[0])} more practice</button>
        <button type="button" class="primary" data-close>Done</button>
      </div>
    </section>`;
    document.body.appendChild(overlay);
    overlay.onclick = e => { if (e.target === overlay) closePupil(); };
    overlay.onkeydown = e => { if (e.key === 'Escape') closePupil(); };
    overlay.querySelectorAll('[data-close]').forEach(b => b.onclick = closePupil);
    overlay.querySelector('[data-practice]').onclick = () => {
      const last = rows[0];
      closePupil(); close();
      if (typeof TeacherMode !== 'undefined' && TeacherMode.prefillPractice) TeacherMode.prefillPractice({ classroomId: _classId || last?.assignment.classroom_id, packId: last?.assignment.subject_pack_id, chapterIds: last?.assignment.chapter_ids || [], pupilKeys: [key], label: `Practice for ${p.name}` });
    };
    overlay.focus();
  }
  function closePupil() { _openPupilId = null; document.getElementById('tp-panel')?.remove(); }

  // ── Materials ─────────────────────────────────────────────────────
  async function _loadMaterials() {
    const box = el('tc-cd-materials');
    if (!box) return;
    try {
      // Load only materials assigned to this classroom.
      // Falls back to all-materials query if classroom_materials table doesn't exist yet.
      let files = [];
      // assigned_at is when this file was shared with THIS class, which is the
      // date that means something to a teacher looking at one classroom - the
      // upload date can be months earlier and belong to another class entirely.
      const {data, error} = await _sb
        .from('classroom_materials')
        .select('assigned_at, learning_materials(*)')
        .eq('classroom_id', _classId);
      if (error && (error.code === '42P01' || error.message?.includes('does not exist'))) {
        // Table not yet created - fall back to the teacher's own materials.
        // "Unfiltered" is now a misnomer: RLS scopes this to the caller's own
        // rows (see engine/teacher.js load() and scripts/sql-tests/materials-rls.js).
        const {data: all, error: e2} = await _sb.from('learning_materials').select('*').order('created_at', {ascending: false});
        if (e2) throw e2;
        files = all || [];
      } else {
        if (error) throw error;
        files = (data || []).filter(r => r.learning_materials)
          .map(r => ({...r.learning_materials, shared_at: r.assigned_at || null}));
      }
      files = sortMaterials(files, _matSort);
      _materials = files;
      await _loadMaterialDone(_classId);
      el('tc-cd-stat-materials').textContent = files.length;
      _renderMaterials(files);
      if (_activeSection === 'work') _renderWork();
    } catch(_e) {
      if (box) box.innerHTML = '<p class="tc-cd-err">Could not load materials.</p>';
    }
  }

  // ⚠ "said they have done this", never "completed". Nothing can mark a PDF or
  // a video, so this is the pupil's own word and the wording has to admit it.
  // A teacher who reads it as a score would be grading a self-report.
  function _doneChip(materialId) {
    const info = _matDone && _matDone.materials ? _matDone.materials[materialId] : null;
    const done = info ? Number(info.done) || 0 : 0;
    if (!done) return '';
    const expected = Number(_matDone.expected) || 0;
    const names = Array.isArray(info.names) ? info.names : [];
    // The names go in a title, not on the card: 25 of them would bury the row.
    return `<p class="tc-cd-done-chip" title="${esc(names.slice(0, 30).join(', '))}">`
      + `✓ ${done}${expected ? ' of ' + expected : ''} said they have done this</p>`;
  }

  // Never blocks the list. If this read fails the materials still render, just
  // without the chips — a missing count is better than a missing worksheet.
  async function _loadMaterialDone(classroomId) {
    _matDone = { expected: 0, materials: {} };
    if (!classroomId || typeof _sb === 'undefined') return;
    try {
      const { data, error } = await _sb.rpc('teacher_material_completions', { p_classroom_id: classroomId });
      if (!error && data && data.ok) _matDone = data;
    } catch (_) { /* chips stay absent */ }
  }

  function _renderMaterials(files) {
    const box = el('tc-cd-materials');
    if (!box) return;
    box.innerHTML = `
      <div class="tc-cd-section-header">
        <h3 class="tc-cd-section-title">📁 Learning Materials</h3>
      </div>
      ${files.length > 1 ? materialSortBar(_matSort, 'TeacherClassroomDetail.setMaterialSort',
        ['recent', 'oldest', 'subject', 'grade', 'title']) : ''}
      <div class="tc-cd-upload-panel">
        <div class="tc-cd-upload-row">
          <input id="tc-cd-mat-title" type="text" maxlength="80"  placeholder="Title…"                   class="tc-cd-input" style="flex:2">
          <input id="tc-cd-mat-desc"  type="text" maxlength="160" placeholder="Description (optional)…" class="tc-cd-input" style="flex:3">
        </div>
        <div class="tc-cd-upload-row">
          <select id="tc-cd-mat-subject" class="tc-cd-input">
            <option value="">All subjects</option>
            <option value="maths">Maths</option>
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="science">Science</option>
            <option value="history">History &amp; Geography</option>
          </select>
          <select id="tc-cd-mat-expiry" class="tc-cd-input" title="How long the share link stays valid">
            <option value="3600">Link valid 1 hour</option>
            <option value="604800" selected>Link valid 1 week</option>
            <option value="2592000">Link valid 1 month</option>
            <option value="31536000">Link valid 1 year</option>
          </select>
        </div>
        <div class="tc-cd-upload-row" style="flex-wrap:wrap;gap:.5rem">
          <input id="tc-cd-mat-file"   type="file" accept="application/pdf,image/*" class="hidden"
            onchange="TeacherClassroomDetail._onMatFileChosen('file')">
          <input id="tc-cd-mat-camera" type="file" accept="image/*" capture="environment" class="hidden"
            onchange="TeacherClassroomDetail._onMatFileChosen('camera')">
          <label for="tc-cd-mat-file" class="tc-cd-pick-btn">📎 Choose file</label>
          <button type="button" class="tc-cd-pick-btn tc-cd-pick-camera"
            onclick="document.getElementById('tc-cd-mat-camera').click()">📷 Camera</button>
          <span id="tc-cd-mat-filename" class="tc-cd-filename-hint">No file chosen</span>
          <button class="tc-cd-action-btn" onclick="TeacherClassroomDetail.uploadMaterial()">⬆️ Upload</button>
        </div>
        <p id="tc-cd-mat-status" class="tc-cd-status-msg"></p>
      </div>
      <div id="tc-cd-mat-list" class="tc-cd-file-list">
        ${!files.length ? '<p class="tc-cd-empty">No materials uploaded yet.</p>' : files.map(f => `
          <div class="tc-cd-file-row">
            <div class="tc-cd-file-icon">${(f.file_name||'').endsWith('.pdf') ? '📄' : '🖼️'}</div>
            <div class="tc-cd-file-info">
              <p class="tc-cd-file-name">${esc(f.title)}</p>
              <p class="tc-cd-file-meta">${f.subject ? esc(f.subject) + ' · ' : ''}${f.grade ? 'Grade ' + f.grade + ' · ' : ''}${_fmtSize(f.file_size)} · ${f.shared_at ? 'Shared with this class ' + _fmtDate(f.shared_at) : 'Uploaded ' + _fmtDate(f.created_at)} · Link valid ${_fmtExpiry(f.link_expiry_seconds)}</p>
              ${_doneChip(f.id)}
              ${f.description ? `<p class="tc-cd-file-desc">${esc(f.description)}</p>` : ''}
            </div>
            <div class="tc-cd-file-btns">
              <button onclick="TeacherClassroomDetail.shareMaterial('${esc(f.id)}')" class="tc-cd-pill tc-cd-pill-share">💬 Share</button>
              <button onclick="TeacherClassroomDetail.openFile('${esc(f.file_path)}',${Number(f.link_expiry_seconds)||3600})" class="tc-cd-pill">📂 Open</button>
              <button onclick="TeacherClassroomDetail.copyFileLink('${esc(f.file_path)}',${Number(f.link_expiry_seconds)||3600})" class="tc-cd-pill">🔗 Link</button>
              <button onclick="TeacherClassroomDetail.deleteFile('${esc(f.id)}','${esc(f.file_path)}')" class="tc-cd-pill tc-cd-pill-red">Delete</button>
            </div>
          </div>`).join('')}
      </div>
    `;
  }

  // Re-sorts what is already loaded. The upload form above the list is part of
  // the same innerHTML, so anything half-typed in it would be lost - hence the
  // repaint keeps the fields it can and the sort bar sits above them.
  function setMaterialSort(key) {
    _matSort = MATERIAL_SORT_LABELS[key] ? key : 'recent';
    writeMaterialSort(_matSort);
    const draft = {
      title: el('tc-cd-mat-title')?.value || '',
      desc: el('tc-cd-mat-desc')?.value || '',
      subject: el('tc-cd-mat-subject')?.value || '',
      expiry: el('tc-cd-mat-expiry')?.value || '',
    };
    _materials = sortMaterials(_materials, _matSort);
    _renderMaterials(_materials);
    if (el('tc-cd-mat-title'))   el('tc-cd-mat-title').value = draft.title;
    if (el('tc-cd-mat-desc'))    el('tc-cd-mat-desc').value = draft.desc;
    if (el('tc-cd-mat-subject')) el('tc-cd-mat-subject').value = draft.subject;
    if (el('tc-cd-mat-expiry') && draft.expiry) el('tc-cd-mat-expiry').value = draft.expiry;
  }

  function _onMatFileChosen(source) {
    if (source === 'camera') { const f = el('tc-cd-mat-file');   if (f) f.value = ''; }
    else                     { const c = el('tc-cd-mat-camera'); if (c) c.value = ''; }
    const file = (source === 'camera' ? el('tc-cd-mat-camera') : el('tc-cd-mat-file'))?.files[0];
    const hint = el('tc-cd-mat-filename');
    if (hint) hint.textContent = file ? file.name : 'No file chosen';
  }

  async function uploadMaterial() {
    const title  = el('tc-cd-mat-title')?.value.trim();
    const file   = el('tc-cd-mat-camera')?.files[0] || el('tc-cd-mat-file')?.files[0];
    const status = el('tc-cd-mat-status');
    if (!title) { if (status) status.textContent = 'Enter a title.';              return; }
    if (!file)  { if (status) status.textContent = 'Choose a file or take a photo.'; return; }
    if (file.size > 10 * 1024 * 1024) { if (status) status.textContent = 'File must be under 10 MB.'; return; }
    if (status) status.textContent = 'Uploading…';
    const user = (await _sb.auth.getUser()).data?.user;
    if (!user) { if (status) status.textContent = 'Not signed in.'; return; }
    const ext      = file.name.split('.').pop();
    const filePath = `${user.id}/${Date.now()}.${ext}`;
    const {error: upErr} = await _sb.storage.from('learning-materials').upload(filePath, file);
    if (upErr) { if (status) status.textContent = 'Upload failed: ' + upErr.message; return; }
    const subject       = el('tc-cd-mat-subject')?.value || null;
    const desc          = el('tc-cd-mat-desc')?.value.trim() || null;
    const linkExpiry    = parseInt(el('tc-cd-mat-expiry')?.value || '604800', 10);
    const {data: matRow, error: dbErr} = await _sb.from('learning_materials').insert({
      teacher_id: user.id, title, description: desc, subject,
      file_path: filePath, file_name: file.name, file_size: file.size,
      link_expiry_seconds: linkExpiry
    }).select('id').single();
    if (dbErr) {
      await _sb.storage.from('learning-materials').remove([filePath]);
      if (status) status.textContent = 'Could not save: ' + dbErr.message;
      return;
    }
    // Link this material to the current classroom so only its students can access it.
    if (_classId && matRow?.id) {
      await _sb.from('classroom_materials').insert({ material_id: matRow.id, classroom_id: _classId });
    }
    if (status) status.textContent = 'Uploaded!';
    await _loadMaterials();
  }

  async function _getSignedUrl(filePath, expirySeconds) {
    const {data, error} = await _sb.storage.from('learning-materials').createSignedUrl(filePath, expirySeconds || 3600);
    if (error || !data?.signedUrl) return null;
    return data.signedUrl;
  }

  async function copyFileLink(filePath, expirySeconds) {
    const secs = expirySeconds || 3600;
    const url = await _getSignedUrl(filePath, secs);
    if (!url) { toast('Could not generate link.', 2000); return; }
    const label = _fmtExpiry(secs);
    try { await navigator.clipboard.writeText(url); toast(`Link copied! Valid for ${label}.`, 2500); }
    catch { prompt(`Copy this link (valid ${label}):`, url); }
  }

  // The same share panel the assignment link uses, so a file and a piece of
  // work leave this screen the same way: WhatsApp, always on it.
  async function shareMaterial(id) {
    const f = _materials.find(m => String(m.id) === String(id));
    if (!f) return;
    const slow = setTimeout(() => toast('Preparing the link…', 1500), 400);
    const url = await _getSignedUrl(f.file_path, Number(f.link_expiry_seconds) || 3600);
    clearTimeout(slow);
    if (!url) { toast('Could not create a share link. Please try again.', 3500); return; }
    const text = materialShareMessage(f, url);
    if (typeof TeacherWorkspace !== 'undefined' && TeacherWorkspace.shareText) {
      TeacherWorkspace.shareText(f.title, text, url);
      return;
    }
    _showSharePanel(f.title, url, `https://wa.me/?text=${encodeURIComponent(text)}`);
  }

  async function openFile(filePath, expirySeconds) {
    const url = await _getSignedUrl(filePath, expirySeconds || 3600);
    if (!url) { toast('Could not open file.', 2000); return; }
    window.open(url, '_blank', 'noopener');
  }

  async function deleteFile(id, filePath) {
    if (!confirm('Delete this file? This cannot be undone.')) return;
    // ⚠ Zero rows is a refusal — no error, no rows. Removing the object after
    //   an unverified row delete loses the file and keeps the record.
    const {data, error: dbErr} = await _sb.from('learning_materials')
      .delete().eq('id', id).select('id');
    if (dbErr || !data?.length) {
      if (dbErr) console.error('[deleteFile]', dbErr.message);
      toast(dbErr ? 'Could not delete: ' + dbErr.message : 'Could not delete that file.', 3000);
      return;
    }
    await _sb.storage.from('learning-materials').remove([filePath]);
    await _loadMaterials();
  }

  function _fmtSize(bytes) {
    if (!bytes) return '';
    if (bytes < 1024)       return bytes + ' B';
    if (bytes < 1024*1024)  return Math.round(bytes / 1024) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function _fmtExpiry(secs) {
    const s = Number(secs) || 3600;
    if (s >= 31536000) return '1 year';
    if (s >= 2592000)  return '1 month';
    if (s >= 604800)   return '1 week';
    if (s >= 3600)     return Math.round(s / 3600) + ' hour' + (Math.round(s / 3600) > 1 ? 's' : '');
    return Math.round(s / 60) + ' min';
  }

  function _fmtDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d)) return '';
    const now = new Date();
    const diffDays = Math.floor((now - d) / 86400000);
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7)  return diffDays + ' days ago';
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
  }

  // ── Results ───────────────────────────────────────────────────────
  function _renderResults() {
    const box = el('tc-cd-results');
    if (!box || box.innerHTML.includes('tc-cd-results-wrap')) return;
    const live = _assignments.filter(a => !a.archived);
    box.innerHTML = `
      <div class="tc-cd-section-header">
        <div><button type="button" class="tr-back" onclick="TeacherClassroomDetail.showSection('work')">← Work</button><h3 class="tc-cd-section-title">📊 Results</h3></div>
        <button class="tc-cd-action-btn" onclick="TeacherClassroomDetail.refreshResults()">🔄 Refresh</button>
      </div>
      <select id="tc-cd-results-sel" class="tc-cd-input" style="margin-bottom:1rem;max-width:360px">
        <option value="">Choose a piece of work…</option>
        ${live.map(a => `<option value="${esc(a.id)}">${esc(a.title)}</option>`).join('')}
      </select>
      <div id="tc-cd-results-body" class="tc-cd-results-wrap"></div>
    `;
    el('tc-cd-results-sel').onchange = e => _loadResultsFor(e.target.value);
    if (_resultsAssignId) {
      el('tc-cd-results-sel').value = _resultsAssignId;
      _loadResultsFor(_resultsAssignId);
    }
  }

  async function _loadResultsFor(assignId) {
    _resultsAssignId = assignId;
    const sel = el('tc-cd-results-sel');
    if (sel && assignId) sel.value = assignId;
    const box = el('tc-cd-results-body');
    if (!box || !assignId) { if (box) box.innerHTML = ''; return; }
    box.innerHTML = '<p class="tc-cd-loading">Loading results…</p>';
    try {
      const rows = typeof TeacherWorkspace !== 'undefined' && TeacherWorkspace.fetchResults
        ? await TeacherWorkspace.fetchResults(assignId, { force: true })
        : ((await _sb.rpc('teacher_guest_results', {p_assignment_id: assignId})).data?.submissions || []);
      const submitted = rows.filter(r =>  r.submitted_at);
      const pending   = rows.filter(r => !r.submitted_at);
      el('tc-cd-stat-results').textContent = submitted.length;
      box.innerHTML = `
        <p class="tc-cd-results-summary">${submitted.length} completed · ${pending.filter(r => !r.not_started).length} working on it · ${pending.filter(r => r.not_started).length} not started</p>
        <p class="tc-cd-results-summary"><button type="button" class="ta-link-btn" onclick="TeacherWorkspace.openResults('${esc(assignId)}')">Open the full results screen →</button> for “who needs my help”, reminders and export.</p>
        <div class="tc-cd-grade-book">
          <div class="tc-cd-grade-header"><span>Pupil</span><span>Score</span><span>%</span><span>Submitted</span></div>
          ${submitted.sort((a, b) => Number(b.pct) - Number(a.pct)).map(r => `
            <div class="tc-cd-grade-row">
              <span>${esc(r.name)}</span>
              <span>${esc(r.score)}/${esc(r.total)}</span>
              <span class="tc-cd-grade-pct ${Number(r.pct) >= 70 ? 'pass' : 'fail'}">${esc(r.pct)}%</span>
              <span class="tc-cd-grade-date">${r.submitted_at ? new Date(r.submitted_at).toLocaleDateString('en-GB') : '-'}</span>
            </div>`).join('')}
          ${pending.map(r => `
            <div class="tc-cd-grade-row tc-cd-grade-pending">
              <span>${esc(r.name)}</span><span>-</span><span>-</span><span>${r.not_started ? 'Not started' : 'Working on it'}</span>
            </div>`).join('')}
        </div>
      `;
    } catch(_e) { box.innerHTML = `<div class="tc-cd-inline-error"><p>Could not load results. This does not mean nobody has submitted.</p><button type="button" onclick="TeacherClassroomDetail.refreshResults()">Try again</button></div>`; }
  }

  // ── Settings ──────────────────────────────────────────────────────
  function _renderSettings() {
    const box = el('tc-cd-settings');
    if (!box) return;
    const prefs    = _loadPrefs();
    const shareUrl = `${location.origin}?classroom=${encodeURIComponent(_classId)}`;
    const emojis   = ['🏫','📚','✏️','🎒','🌟','🧮','🔬','🗺️','🎨','💡'];
    const mode     = prefs.defaultMode || 'classroom_pin';
    const timeOpts = [0, 15, 20, 30, 45, 60];
    const defTime  = prefs.defaultTime ?? 0;
    const instant  = !!prefs.instantResults;
    const notes    = prefs.notes || '';
    box.innerHTML = `
      <div class="tc-cd-section-header">
        <h3 class="tc-cd-section-title">⚙️ Classroom Settings</h3>
      </div>

      <div class="tc-cd-settings-card">
        <label class="tc-cd-settings-label">Classroom name</label>
        <div class="tc-cd-upload-row">
          <input id="tc-cd-set-name" class="tc-cd-input" value="${esc(_className)}" maxlength="80" style="flex:1">
          <button class="tc-cd-action-btn" onclick="TeacherClassroomDetail.saveName()">Save</button>
        </div>
      </div>

      <div class="tc-cd-settings-card">
        <label class="tc-cd-settings-label">Classroom icon</label>
        <div class="tc-cd-emoji-picker">
          ${emojis.map(e => `<button class="tc-cd-emoji-opt" onclick="TeacherClassroomDetail.setEmoji(this,'${e}')">${e}</button>`).join('')}
        </div>
      </div>

      <div class="tc-cd-settings-card">
        <label class="tc-cd-settings-label">Default student entry</label>
        <p class="tc-cd-tip-text">Pre-fills the entry mode when you set new homework for this classroom.</p>
        <div class="tc-cd-radio-group">
          <label class="tc-cd-radio-opt ${mode === 'classroom_pin' ? 'tc-cd-radio-sel' : ''}">
            <input type="radio" name="tc-cd-mode" value="classroom_pin" ${mode === 'classroom_pin' ? 'checked' : ''}
              onchange="TeacherClassroomDetail.savePref('defaultMode','classroom_pin')">
            🔐 <span><strong>Pupil PINs</strong> - each pupil enters their private 4-digit PIN</span>
          </label>
          <label class="tc-cd-radio-opt ${mode === 'nickname' ? 'tc-cd-radio-sel' : ''}">
            <input type="radio" name="tc-cd-mode" value="nickname" ${mode === 'nickname' ? 'checked' : ''}
              onchange="TeacherClassroomDetail.savePref('defaultMode','nickname')">
            📝 <span><strong>Nickname</strong> - anyone with the link can join with a chosen name</span>
          </label>
        </div>
      </div>

      <div class="tc-cd-settings-card">
        <label class="tc-cd-settings-label">Default time limit</label>
        <p class="tc-cd-tip-text">Pre-fills the timer when you set new homework.</p>
        <div class="tc-cd-radio-group tc-cd-radio-row">
          ${timeOpts.map(t => `
            <label class="tc-cd-time-chip ${defTime === t ? 'tc-cd-time-sel' : ''}">
              <input type="radio" name="tc-cd-time" value="${t}" ${defTime === t ? 'checked' : ''}
                onchange="TeacherClassroomDetail.savePref('defaultTime',${t})">
              ${t === 0 ? 'Untimed' : t + ' min'}
            </label>`).join('')}
        </div>
      </div>

      <div class="tc-cd-settings-card">
        <label class="tc-cd-settings-label">Show results to students</label>
        <div class="tc-cd-toggle-row">
          <label class="tc-cd-toggle">
            <input type="checkbox" id="tc-cd-instant" ${instant ? 'checked' : ''}
              onchange="TeacherClassroomDetail.savePref('instantResults',this.checked)">
            <span class="tc-cd-toggle-track"></span>
          </label>
          <span class="tc-cd-toggle-label">${instant ? 'Students see their score immediately after finishing' : 'Score is hidden until you share it'}</span>
        </div>
      </div>

      <div class="tc-cd-settings-card">
        <label class="tc-cd-settings-label">Teacher notes <span style="font-weight:400;opacity:.6">(private)</span></label>
        <textarea id="tc-cd-notes" class="tc-cd-input tc-cd-notes-area" maxlength="800"
          placeholder="e.g. weaker on fractions, parents want weekly updates…">${esc(notes)}</textarea>
        <div class="tc-cd-upload-row" style="margin-top:.5rem">
          <button class="tc-cd-action-btn" onclick="TeacherClassroomDetail.saveNotes()">Save notes</button>
        </div>
      </div>

      <div class="tc-cd-settings-card">
        <label class="tc-cd-settings-label">Share classroom link</label>
        <p class="tc-cd-tip-text">Send this to pupils - they will need their private PIN to enter.</p>
        <div class="tc-cd-upload-row">
          <input class="tc-cd-input" value="${esc(shareUrl)}" readonly style="flex:1;font-size:.8rem">
          <button class="tc-cd-action-btn" onclick="TeacherClassroomDetail.shareLink()">📱 Share</button>
        </div>
      </div>

      <div class="tc-cd-settings-card tc-cd-danger-zone">
        <label class="tc-cd-settings-label">⚠️ Danger zone</label>
        <div class="tc-cd-upload-row">
          <button class="tc-cd-pill tc-cd-pill-orange" onclick="TeacherClassroomDetail.archiveClass()">📦 Archive classroom</button>
        </div>
        <p class="tc-cd-tip-text">Archive hides the classroom from your board but keeps all data and results. You can restore it from Settings.</p>
        <div class="tc-cd-upload-row" style="margin-top:.75rem">
          <button id="tc-cd-delete-btn" class="tc-cd-pill tc-cd-pill-red" onclick="TeacherClassroomDetail.deleteClassroom()">🗑️ Delete classroom</button>
        </div>
        <p class="tc-cd-tip-text" style="color:#f87171">Delete removes the classroom and its assignments immediately. An admin can recover it for 10 days, then it is permanently cleared.</p>
      </div>
    `;
    // Live toggle label update
    el('tc-cd-instant')?.addEventListener('change', function() {
      this.closest('.tc-cd-toggle-row').querySelector('.tc-cd-toggle-label').textContent =
        this.checked ? 'Students see their score immediately after finishing' : 'Score is hidden until you share it';
    });
  }

  function savePref(key, value) {
    _savePrefs({ [key]: value });
    // Refresh radio/chip highlight without full re-render
    if (key === 'defaultMode') {
      document.querySelectorAll('.tc-cd-radio-opt').forEach(l => {
        l.classList.toggle('tc-cd-radio-sel', l.querySelector('input')?.value === value);
      });
    }
    if (key === 'defaultTime') {
      document.querySelectorAll('.tc-cd-time-chip').forEach(l => {
        l.classList.toggle('tc-cd-time-sel', +l.querySelector('input')?.value === +value);
      });
    }
  }

  function saveNotes() {
    const notes = el('tc-cd-notes')?.value ?? '';
    _savePrefs({ notes });
    toast('Notes saved.', 1800);
  }

  async function saveName() {
    const name = el('tc-cd-set-name')?.value.trim();
    if (!name) { toast('Enter a name.', 2000); return; }
    try {
      const {error} = await _sb.rpc('teacher_guest_manage', {p_action: 'rename_class', p_classroom: _classId, p_name: name});
      if (error) throw error;
      _className = name;
      el('tc-cd-name').textContent = name;
      toast('Name updated.', 1800);
    } catch(_e) { toast('Could not rename.', 2000); }
  }

  function setEmoji(btn, emoji) {
    document.querySelectorAll('.tc-cd-emoji-opt').forEach(b => b.classList.remove('tc-cd-emoji-sel'));
    btn.classList.add('tc-cd-emoji-sel');
    el('tc-cd-emoji').textContent = emoji;
    _savePrefs({ emoji });
  }

  function archiveClass() {
    const msg = 'Archive this classroom? It will be hidden from your board but every pupil, PIN and result is kept.';
    if (typeof _confirmModal === 'function') _confirmModal(msg, _archiveClassNow, { icon: '📦', okLabel: 'Archive', danger: false });
    else if (confirm(msg)) _archiveClassNow();
  }
  async function _archiveClassNow() {
    try {
      await _sb.rpc('teacher_guest_manage', {p_action: 'toggle_class', p_classroom: _classId});
      toast('Classroom archived.', 2000);
      close();
      if (typeof TeacherGuestClasses !== 'undefined') TeacherGuestClasses.refresh();
    } catch(_e) { toast('Could not archive.', 2000); }
  }

  function deleteClassroom() {
    const name = _className || 'this classroom';
    const msg = `Delete "${name}"? The classroom and its work disappear from your board now. An administrator can recover it for 10 days; after that it is gone for good.`;
    if (typeof _confirmModal === 'function') _confirmModal(msg, _deleteClassroomNow, { icon: '🗑️', okLabel: 'Delete classroom' });
    else if (confirm(msg)) _deleteClassroomNow();
  }
  async function _deleteClassroomNow() {

    const btn = el('tc-cd-delete-btn');
    if (btn) { btn.disabled = true; btn.textContent = 'Deleting…'; }

    try {
      const { error } = await _sb.rpc('teacher_guest_manage', {
        p_action: 'delete_class',
        p_classroom: _classId,
      });
      if (error) throw error;
      toast('Classroom deleted. An admin can recover it for 10 days.', 3500);
      close();
      if (typeof TeacherGuestClasses !== 'undefined') TeacherGuestClasses.refresh();
    } catch (_e) {
      toast('Could not delete classroom. Please try again.', 2500);
      if (btn) { btn.disabled = false; btn.textContent = '🗑️ Delete classroom'; }
    }
  }

  function shareLink() {
    const url  = `${location.origin}?classroom=${encodeURIComponent(_classId)}`;
    const text = `Join my classroom "${_className}" on PSAC Practice!\n${url}\nYou will need your pupil PIN.`;
    const wa   = `https://wa.me/?text=${encodeURIComponent(text)}`;
    if (navigator.share) {
      navigator.share({ title: _className, text, url }).catch(err => {
        // AbortError = user dismissed intentionally - do nothing.
        if (err?.name !== 'AbortError') _showClassroomSharePanel(url, wa);
      });
      return;
    }
    // No native share API - show inline panel instead of window.open()
    // so popup blockers cannot intercept it.
    _showClassroomSharePanel(url, wa);
  }

  function _showClassroomSharePanel(url, wa) {
    document.getElementById('tc-cls-share-panel')?.remove();
    const panel = document.createElement('div');
    panel.id = 'tc-cls-share-panel';
    panel.className = 'tc-share-panel';
    panel.innerHTML = `
      <div class="tc-share-inner">
        <div class="tc-share-header">
          <span class="tc-share-title">Share classroom link</span>
          <button onclick="document.getElementById('tc-cls-share-panel').remove()" class="tc-share-close">&#x2715;</button>
        </div>
        <p class="tc-share-lbl">Classroom link</p>
        <div class="tc-share-url-row">
          <input id="tc-cls-share-url" class="tc-share-url" readonly value="${esc(url)}">
          <button id="tc-cls-copy-btn" onclick="
            navigator.clipboard.writeText('${esc(url)}').then(function(){
              document.getElementById('tc-cls-copy-btn').textContent='Copied!';
              setTimeout(function(){ document.getElementById('tc-cls-copy-btn').textContent='Copy'; },2000);
            }).catch(function(){ document.getElementById('tc-cls-share-url').select(); })
          " class="tc-share-copy-btn">Copy</button>
        </div>
        <a href="${esc(wa)}" target="_blank" rel="noopener" class="tc-share-wa-btn">
          <span>&#x1F4AC;</span> Share via WhatsApp
        </a>
        <p class="tc-share-hint">WhatsApp opens in a new tab with the message pre-filled.</p>
      </div>`;
    document.body.appendChild(panel);
    panel.addEventListener('click', e => { if (e.target === panel) panel.remove(); });
  }

  return {
    open, close, showSection, isOpen, toggleMore, setWorkFilter, retryWork, retryPupils, retrySignals, showSetupGuide, dismissSetupGuide, openPupil, closePupil,
    showHomeworkChoice, _chooseDigital, _chooseWorksheet,
    _onPhysicalFileChosen, _submitPhysical, downloadPhysicalHW, deletePhysicalHW,
    createWork, addPupil, revealAllPins,
    uploadMaterial, _onMatFileChosen, setMaterialSort, shareMaterial, copyFileLink, openFile, deleteFile,
    saveName, setEmoji, archiveClass, deleteClassroom, shareLink,
    savePref, saveNotes, getPrefs,
    openAssignmentResults: id => { _loadResultsFor(id); showSection('results'); },
    refreshResults: () => { if (_resultsAssignId) _loadResultsFor(_resultsAssignId); }
  };
})();
