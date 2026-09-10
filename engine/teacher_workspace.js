'use strict';

const TeacherWorkspace = (() => {
  let owner = null, generation = 0, request = 0, selected = '', assignments = [];
  let detailRequest = 0;
  let pins = new Map();
  let classroom = null, className = '', classFilter = 'active', listFilter = 'all';
  let loaded = false, loading = null;
  let lastRows = null;
  const resultsCache = new Map();   // assignment id → { rows, assignment, at }
  const inflight = new Map();
  const RESULTS_FRESH_MS = 45000;
  const el = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const date = value => value ? new Date(value).toLocaleString() : 'Not set';
  const I = () => (typeof TeacherInsights !== 'undefined' ? TeacherInsights : null);
  const qs = (root, sel) => root && typeof root.querySelector === 'function' ? root.querySelector(sel) : null;
  const qsa = (root, sel) => root && typeof root.querySelectorAll === 'function' ? root.querySelectorAll(sel) : [];

  function reset() {
    owner = null; generation++; request++; detailRequest++; selected = ''; assignments = []; pins = new Map();
    classroom = null; className = ''; classFilter = 'active'; listFilter = 'all';
    loaded = false; loading = null; lastRows = null; resultsCache.clear(); inflight.clear();
    el('tc-workspace')?.replaceChildren();
    for (const id of ['ta-asgn-list', 'ta-results-list', 'ta-results-assign-sel', 'ta-results-picker']) {
      if (el(id)) el(id).replaceChildren();
    }
    el('ta-answer-panel')?.classList.add('hidden');
    el('modal-share-assignment')?.classList.add('hidden');
    el('ta-quota')?.classList.add('hidden');
    closeDetails();
  }

  async function rpc(name, args = {}) {
    if (typeof _sb === 'undefined' || !_sb) throw new Error('Connection unavailable');
    const response = await _sb.rpc(name, args);
    if (response.error || response.data?.ok !== true) throw new Error('Request failed');
    return response.data;
  }

  function message(container, text, retry, kind = 'info') {
    if (!container) return;
    container.replaceChildren();
    const p = document.createElement('p');
    p.className = 'ta-state ta-state-' + kind;
    p.textContent = text;
    container.append(p);
    if (retry) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'ta-state-retry';
      button.textContent = 'Try again'; button.onclick = retry; container.append(button);
    }
  }

  function refresh() {
    const p = _refresh();
    loading = p;
    p.finally(() => { if (loading === p) loading = null; });
    return p;
  }

  // Home and the classroom screen wait on this instead of racing refresh().
  async function ensureLoaded(force) {
    if (!loading && (!loaded || force)) refresh();
    // A refresh superseded by a newer one resolves undefined; wait for the
    // newest, then judge by whether anything actually loaded.
    while (loading) await loading;
    if (!loaded) throw new Error('Assignments could not be loaded');
    return assignments;
  }
  function getAssignments() { return assignments; }

  async function _refresh() {
    const token = ++generation;
    request++;
    if (!assignments.length) {
      message(el('ta-asgn-list'), 'Loading your saved assignments…', null, 'loading');
      message(el('ta-results-picker'), 'Loading assignments…', null, 'loading');
    }
    if (classroom) message(el('tc-workspace'), 'Loading classroom assignments…', null, 'loading');
    el('ta-answer-panel')?.classList.add('hidden');
    try {
      const session = await _sb.auth.getSession();
      if (token !== generation) return;
      const uid = session.data?.session?.user?.id;
      if (!uid || !Auth.isTeacher()) throw new Error('Sign in required');
      if (owner !== uid) {
        pins = new Map(); selected = ''; assignments = []; resultsCache.clear();
        if (owner) { classroom=null; className=''; el('tc-workspace')?.replaceChildren(); }
      }
      owner = uid;
      const data = await rpc('guest_my_assignments');
      if (token !== generation) return;
      const access = await rpc('teacher_guest_assignment_modes');
      if (token !== generation) return;
      const modes = new Map((access.modes || []).map(a => [a.id, a]));
      assignments = (data.assignments || []).map(a => ({...a, access_mode: modes.get(a.id)?.mode || 'legacy',
        classroom_id: modes.get(a.id)?.classroom_id || null, classroom_name: modes.get(a.id)?.classroom_name || '',
        archived: !!modes.get(a.id)?.archived}));
      loaded = true;
      drawAssignments();
      drawClassroom();
      const select = el('ta-results-assign-sel');
      if (select) {
        select.innerHTML = '<option value="">Select homework or a test…</option>' + assignments.map(a => `<option value="${esc(a.id)}">${esc(a.title)}</option>`).join('');
        if (!assignments.some(a => a.id === selected)) selected = '';
        select.value = selected;
      }
      drawResultsPicker();
      await results(selected);
      await drawQuota(token);
    } catch (_) {
      if (token !== generation) return;
      // ⚠ Never replace a list the teacher already has with an empty state
      // because one refresh failed. Keep what was loaded and say so.
      if (!assignments.length) {
        message(el('ta-asgn-list'), 'Could not load assignments. Check your connection and teacher access. Your saved work has not been deleted.', refresh, 'error');
        message(el('ta-results-picker'), 'Could not load assignments. Check your connection and try again.', refresh, 'error');
        message(el('ta-results-list'), 'Results are unavailable until assignments load.', null, 'error');
        if (classroom) message(el('tc-workspace'), 'Could not load classroom assignments. Your work has not been deleted.', refresh, 'error');
      } else if (typeof toast === 'function') toast('Could not refresh assignments. Showing what was loaded before.', 3500);
      return false;
    }
    return true;
  }

  // ⚠ The cap is read from the SERVER, never from a constant here. It lives in
  // mm_data.guest_assignment_limits and an admin can change it between one
  // render and the next, so a number this file believed in would be a promise
  // the create button then breaks. Silent on failure: a teacher who can still
  // create is not helped by a line saying the quota could not be read.
  async function drawQuota(token) {
    const box = el('ta-quota');
    if (!box) return;
    let q = null;
    try { q = await rpc('guest_assignment_quota'); } catch (_) { }
    if (token !== generation) return;
    if (!q || typeof q.per_day !== 'number') { box.classList.add('hidden'); return; }
    box.textContent = q.left_today === 0
      ? 'You have set all ' + q.per_day + ' pieces of work allowed today. You can set more tomorrow.'
      : 'You can set ' + q.left_today + ' more piece' + (q.left_today === 1 ? '' : 's') + ' of work today, for up to ' + q.max_students + ' pupils each.';
    box.classList.remove('hidden');
  }

  // ── The "All work" list (Archived work in the More menu) ──────────
  function showList(filter) {
    if (filter) listFilter = filter;
    if (typeof TeacherMode !== 'undefined' && TeacherMode.saveLocation) TeacherMode.saveLocation({ listFilter });
    if (!loaded) { ensureLoaded(); return; }
    drawAssignments();
  }

  function drawAssignments() {
    const list = el('ta-asgn-list');
    if (!list) return;
    if (!assignments.length) { message(list, 'No saved assignments yet. Create your first homework under Set Work.'); return; }
    list.innerHTML = `<div class="ta-list-tools"><label for="ta-list-filter">Show</label><select id="ta-list-filter">${filterOptions(listFilter)}</select></div><div id="ta-list-cards"></div>`;
    const sel = el('ta-list-filter');
    if (sel) sel.onchange = e => { listFilter = e.target.value; drawAssignments(); };
    const rows = filterAssignments(assignments, null, listFilter);
    drawCards(el('ta-list-cards'), rows, false, listFilter === 'archived' ? 'Nothing is archived. Archiving closes a piece of work and keeps its results.' : 'No assignments in this view.');
  }

  function filterAssignments(rows, classId, filter) {
    return rows.filter(a => (!classId || a.classroom_id === classId) &&
      (filter === 'all' || (filter === 'standalone' && !a.classroom_id) ||
      (filter === 'archived' && a.archived) || (filter === 'active' && !a.archived && a.status === 'active' && (!a.expires_at || Date.parse(a.expires_at) > Date.now())) ||
      (filter === 'closed' && !a.archived && (a.status !== 'active' || (a.expires_at && Date.parse(a.expires_at) <= Date.now())))));
  }

  function filterOptions(value, inClass = false) {
    return [['all','All work'],['active','Active'],['closed','Closed'],['archived','Archived'],...(!inClass ? [['standalone','Open links only']] : [])]
      .map(([v,label]) => `<option value="${v}" ${value===v?'selected':''}>${label}</option>`).join('');
  }

  function _statusLabel(a) {
    if (a.archived) return 'archived';
    if (a.status !== 'active' || (a.expires_at && Date.parse(a.expires_at) <= Date.now())) return 'closed';
    return 'active';
  }

  function _shortDate(val) {
    if (!val) return '';
    const d = new Date(val);
    return d.toLocaleDateString('en-GB', {day:'numeric', month:'short'});
  }

  function _packLabel(id) {
    if (typeof TeacherMode !== 'undefined' && TeacherMode.packLabel) return TeacherMode.packLabel(id);
    if (!id) return '';
    return id.replace(/^grade(\d+)-/, 'G$1 ').replace(/-/g, ' ');
  }
  function _chapterName(id) {
    const n = typeof TeacherMode !== 'undefined' && TeacherMode.chapterName ? TeacherMode.chapterName(id) : '';
    return n || String(id || '').replace(/[-_]/g, ' ');
  }
  function _chapterLine(a) {
    const ids = Array.isArray(a.chapter_ids) ? a.chapter_ids : [];
    if (!ids.length) return 'Whole subject';
    if (ids.length <= 2) return ids.map(_chapterName).join(', ');
    return `${_chapterName(ids[0])} +${ids.length - 1} more`;
  }
  function _accessShort(a) {
    return a.access_mode === 'classroom_pin' ? '🔑 Pupil PINs' : a.access_mode === 'nickname' ? '🔗 Open link' : '🔒 Shared PIN';
  }

  // "18 of 28 completed" needs the roster size. Cached results know it exactly
  // (every rostered pupil is a row); before that, the classroom's pupil count
  // is the best honest estimate for a PIN assignment. An open link has no
  // roster, so only the completed count is shown.
  function completion(a) {
    const cached = resultsCache.get(a.id);
    const done = cached ? cached.rows.filter(r => r.submitted_at).length : Number(a.submissions || 0);
    if (cached && a.access_mode === 'classroom_pin') return { done, total: cached.rows.length };
    if (a.access_mode === 'classroom_pin') {
      const cls = (typeof TeacherGuestClasses !== 'undefined' ? TeacherGuestClasses.getClasses() : []).find(c => c.id === a.classroom_id);
      return { done, total: cls ? Number(cls.pupils || 0) : null };
    }
    return { done, total: null };
  }

  function _statusChip(a) {
    const s = _statusLabel(a);
    const label = s === 'active' ? 'Active' : s === 'closed' ? 'Closed' : 'Archived';
    return `<span class="tw-status tw-status-${s}">${label}</span>`;
  }

  function cardHtml(a, i, opts = {}) {
    const c = completion(a);
    const pct = c.total ? Math.min(100, Math.round(c.done / c.total * 100)) : null;
    const ins = I();
    const due = a.archived ? '' : ins ? ins.dueLabel(a.expires_at) : _shortDate(a.expires_at);
    return `<article class="tw-card" data-open="${i}" role="button" tabindex="0" aria-label="Open ${esc(a.title)}">
      <div class="tw-card-top">${_statusChip(a)}<span class="tw-due ${ins && ins.dueSoon(a) ? 'tw-due-soon' : ''}">${esc(due)}</span></div>
      <h4 class="tw-title">${esc(a.title)}</h4>
      <p class="tw-meta">${a.classroom_id && !opts.inClass ? `🏫 ${esc(a.classroom_name || 'Classroom')} · ` : ''}${esc(_packLabel(a.subject_pack_id))} · ${esc(_chapterLine(a))}</p>
      <p class="tw-meta tw-meta-dim">${esc(a.question_count)} q · ${a.duration_mins ? `⏱ ${esc(a.duration_mins)} min` : '🔍 Practice'} · ${_accessShort(a)}</p>
      ${pct != null ? `<div class="tw-progress" aria-hidden="true"><i style="width:${pct}%"></i></div>` : ''}
      <!-- ⚠ Green only when EVERY pupil is done. A part-finished class shows the
           ordinary ink: colouring "3 of 25" green would read at a glance as
           "this is handled", which is the opposite of what it means. -->
      <p class="tw-completion${c.total && c.done >= c.total ? ' tw-completion-all' : c.done ? ' tw-completion-some' : ''}">${c.total ? `${c.done >= c.total ? '✓ ' : ''}${c.done} of ${c.total} completed` : `${c.done} completed`}</p>
      <div class="tw-actions">
        <button type="button" class="tw-btn tw-btn-primary" data-results="${i}">📊 View results</button>
        <!-- ⚠ Icon-only, but never unlabelled: four labelled buttons cannot fit
             one row of a 240px card, so they wrapped to a second 44px row on
             every card. Each carries BOTH aria-label (screen readers) and title
             (a hover tooltip for the teacher), and each is still a full 44px
             target — the height came out of the second row, not the tap area. -->
        <button type="button" class="tw-btn tw-btn-icon" data-details="${i}"
          aria-label="Details for ${esc(a.title)}" title="Details">ⓘ</button>
        <button type="button" class="tw-btn tw-btn-icon" data-share="${i}" ${a.archived ? 'disabled' : ''}
          aria-label="Share ${esc(a.title)}" title="Share">↗</button>
        <button type="button" class="tw-btn tw-btn-icon" data-archive="${i}"
          aria-label="${a.archived ? 'Restore' : 'Archive'} ${esc(a.title)}"
          title="${a.archived ? 'Restore' : 'Archive'}">${a.archived ? '♻️' : '📦'}</button>
      </div>
    </article>`;
  }

  function drawCards(list, rows, inClass, emptyText = 'No assignments in this view.', handlers = {}) {
    if (!list) return;
    if (!rows.length) { message(list, emptyText); return; }
    list.innerHTML = `<div class="tw-grid">` + rows.map((a, i) => cardHtml(a, i, { inClass })).join('') + `</div>`;

    qsa(list, '[data-open]').forEach(card => {
      card.onclick = e => {
        if (e.target.closest('button')) return;
        openDetails(rows[Number(card.dataset.open)].id);
      };
      card.onkeydown = e => {
        if (e.target.closest('button') || !['Enter', ' '].includes(e.key)) return;
        e.preventDefault();
        openDetails(rows[Number(card.dataset.open)].id);
      };
    });
    qsa(list, '[data-details]').forEach(b => b.onclick = e => {
      e.stopPropagation();
      openDetails(rows[Number(b.dataset.details)].id);
    });
    qsa(list, '[data-results]').forEach(b => b.onclick = e => {
      e.stopPropagation();
      const a = rows[Number(b.dataset.results)];
      if (handlers.onResults) { handlers.onResults(a); return; }
      if (inClass) { results(a.id, 'tc-assignment-results'); return; }
      openResults(a.id);
    });
    qsa(list, '[data-share]').forEach(b => b.onclick = e => { e.stopPropagation(); share(rows[Number(b.dataset.share)]); });
    qsa(list, '[data-archive]').forEach(b => b.onclick = e => { e.stopPropagation(); archive(rows[Number(b.dataset.archive)], b, handlers.onArchived); });
  }

  function summarizeRows(rows) {
    const submitted = rows.filter(r => !!r.submitted_at);
    const notStarted = rows.filter(r => !r.submitted_at && !!r.not_started);
    const inProgress = rows.filter(r => !r.submitted_at && !r.not_started);
    const scored = submitted.filter(r => Number.isFinite(Number(r.pct)));
    const average = scored.length
      ? Math.round(scored.reduce((sum, r) => sum + Number(r.pct), 0) / scored.length)
      : null;
    return { submitted, notStarted, inProgress, average, known: rows.length };
  }

  function _detailStatus(a) {
    const status = _statusLabel(a);
    if (status === 'archived') return { label: 'Archived', note: 'Pupils can no longer open or submit this assignment.' };
    if (status === 'closed') return { label: 'Closed', note: a.expires_at && Date.parse(a.expires_at) <= Date.now() ? 'The closing date has passed.' : 'This assignment has been closed.' };
    return { label: 'Active', note: 'Pupils can open and submit this assignment now.' };
  }

  function _accessText(a) {
    if (a.access_mode === 'classroom_pin') return 'Classroom pupils use their private 4-digit PIN';
    if (a.access_mode === 'nickname') return 'Open link - pupils enter a nickname';
    return 'Shared link with assignment PIN';
  }

  function closeDetails() {
    detailRequest++;
    const overlay = document.getElementById('ta-assignment-detail');
    if (overlay && typeof overlay.remove === 'function') overlay.remove();
  }

  function _detailPeople(rows) {
    if (!rows.length) return '<p class="ta-detail-empty">No pupil has opened this assignment yet.</p>';
    return `<div class="ta-detail-pupils">${rows.map(r => {
      const state = r.submitted_at ? 'submitted' : r.not_started ? 'not-started' : 'in-progress';
      const label = r.submitted_at ? 'Completed' : r.not_started ? 'Not started' : 'Working on it';
      const result = r.submitted_at ? `${esc(r.score)}/${esc(r.total)} · ${esc(r.pct)}%` : label;
      return `<div class="ta-detail-pupil"><span><strong>${esc(r.name || 'Pupil')}</strong><small>${esc(label)}</small></span><b class="${state}">${result}</b></div>`;
    }).join('')}</div>`;
  }

  function _renderDetails(a, rows, loading = false, error = '') {
    const body = el('ta-detail-body');
    if (!body) return;
    const status = _detailStatus(a);
    const summary = summarizeRows(rows);
    const classroomKnown = a.access_mode === 'classroom_pin';
    body.innerHTML = `
      <div class="ta-detail-heading">
        <div><span class="ta-detail-kicker">${esc(_packLabel(a.subject_pack_id) || 'Assignment')}</span><h2>${esc(a.title)}</h2></div>
        <span class="ta-detail-state ${_statusLabel(a)}">${status.label}</span>
      </div>
      <p class="ta-detail-status-note">${esc(status.note)}</p>
      <div class="ta-detail-facts">
        <div><small>Questions</small><strong>${esc(a.question_count)}</strong></div>
        <div><small>Format</small><strong>${a.duration_mins ? `Timed · ${esc(a.duration_mins)} min` : 'Practice · no timer'}</strong></div>
        <div><small>Created</small><strong>${esc(date(a.created_at))}</strong></div>
        <div><small>Closes</small><strong>${esc(date(a.expires_at))}</strong></div>
        <div><small>How pupils get in</small><strong>${esc(_accessText(a))}</strong></div>
        <div><small>Classroom</small><strong>${esc(a.classroom_name || a.classroom || 'Open link - no classroom')}</strong></div>
      </div>
      <div class="ta-detail-section-head"><div><h3>Current pupil status</h3><p>${classroomKnown ? 'Every pupil assigned to this classroom is included.' : 'For an open link, pupils appear after they first open it.'}</p></div><button id="ta-detail-refresh" type="button">↻ Refresh</button></div>
      ${loading ? '<p class="ta-detail-loading">Loading the latest pupil activity…</p>' : error ? `<p class="ta-detail-error">${esc(error)}</p>` : `
        <div class="ta-detail-stats">
          <div><strong>${summary.submitted.length}</strong><span>Completed</span></div>
          <div><strong>${summary.inProgress.length}</strong><span>Working on it</span></div>
          <div><strong>${summary.notStarted.length}</strong><span>Not started</span></div>
          <div><strong>${summary.average == null ? '-' : summary.average + '%'}</strong><span>Average result</span></div>
        </div>
        ${_detailPeople(rows)}
      `}
      <div class="ta-detail-footer"><button id="ta-detail-share" type="button" ${a.archived ? 'disabled' : ''}>🔗 Share</button><button id="ta-detail-results" type="button" class="primary">📊 Open full results</button></div>`;
    el('ta-detail-refresh').onclick = () => _loadDetailRows(a, true);
    el('ta-detail-share').onclick = () => share(a);
    el('ta-detail-results').onclick = () => openFullResults(a.id);
  }

  async function _loadDetailRows(a, force) {
    const serial = ++detailRequest;
    _renderDetails(a, [], true);
    try {
      const rows = await fetchResults(a.id, { force });
      if (serial !== detailRequest || !el('ta-assignment-detail')) return;
      _renderDetails(a, rows);
    } catch (_) {
      if (serial !== detailRequest || !el('ta-assignment-detail')) return;
      _renderDetails(a, [], false, 'Could not load the live pupil status. The assignment itself is still available.');
    }
  }

  function openDetails(idOrAssignment) {
    const a = typeof idOrAssignment === 'object' && idOrAssignment
      ? idOrAssignment
      : assignments.find(row => row.id === idOrAssignment);
    if (!a) { toast('This assignment could not be found. Refresh and try again.', 3000); return; }
    closeDetails();
    const overlay = document.createElement('div');
    overlay.id = 'ta-assignment-detail';
    overlay.className = 'ta-detail-overlay';
    overlay.tabIndex = -1;
    overlay.innerHTML = `<section class="ta-detail-panel" role="dialog" aria-modal="true" aria-label="Assignment details"><button id="ta-detail-close" class="ta-detail-close" type="button" aria-label="Close assignment details">×</button><div id="ta-detail-body"></div></section>`;
    document.body.appendChild(overlay);
    overlay.onclick = e => { if (e.target === overlay) closeDetails(); };
    overlay.onkeydown = e => { if (e.key === 'Escape') closeDetails(); };
    el('ta-detail-close').onclick = closeDetails;
    _loadDetailRows(a);
    overlay.focus();
  }

  function openFullResults(id) {
    closeDetails();
    if (!assignments.some(a => a.id === id) && typeof TeacherClassroomDetail !== 'undefined') {
      TeacherClassroomDetail.openAssignmentResults?.(id);
      return;
    }
    if (typeof TeacherClassroomDetail !== 'undefined') TeacherClassroomDetail.close?.();
    openResults(id);
  }

  // Jump to the Results tab with one assignment selected - from Home, from a
  // card, from the success screen. Works before the list has loaded.
  async function openResults(id) {
    if (typeof TeacherMode !== 'undefined') TeacherMode.switchTab('results');
    if (!assignments.some(a => a.id === id)) await ensureLoaded(true);
    const select = el('ta-results-assign-sel');
    if (select) select.value = id;
    results(id);
  }

  function showResults(id) {
    if (!loaded) { selected = id || ''; ensureLoaded(); return; }
    const select = el('ta-results-assign-sel');
    if (select) select.value = assignments.some(a => a.id === id) ? id : '';
    results(select ? select.value : (id || ''));
  }

  async function archive(a, button, after) {
    const go = async () => {
      const token = generation;
      if (button) button.disabled = true;
      try {
        await rpc('teacher_guest_archive_assignment', {p_id:a.id,p_archive:!a.archived});
        resultsCache.delete(a.id);
        if (typeof TeacherHome !== 'undefined') TeacherHome.invalidate();
        if (token === generation) await refresh();
        if (after) after();
      } catch (_) { if (token === generation) { if (button) button.disabled=false; toast('Could not update the assignment. Please try again.',3000); } }
    };
    const msg = a.archived ? 'Restore this assignment? It reopens only if it was active and has not expired.' : 'Archive this assignment? Pupils can no longer open it. Results are kept.';
    if (typeof _confirmModal === 'function') _confirmModal(msg, go, { icon: a.archived ? '♻️' : '📦', okLabel: a.archived ? 'Restore' : 'Archive', danger: !a.archived });
    else if (confirm(msg)) go();
  }

  async function openClass(id, name) {
    classroom = id; className = name; classFilter = 'active';
    await refresh();
  }

  function drawClassroom() {
    const box=el('tc-workspace');
    if (!box || !classroom) return;
    box.innerHTML=`<h3 class="font-bold text-lg my-3">${esc(className)} - assignments</h3>
      <button id="tc-new-assignment" class="p-2 text-blue-600">Create homework for this classroom</button>
      <label for="tc-assignment-filter" class="text-sm">Show </label><select id="tc-assignment-filter" class="border rounded p-2 dark:bg-gray-700">${filterOptions(classFilter,true)}</select>
      <div id="tc-assignment-cards" class="mt-3"></div>
      <h4 class="font-bold mt-4">Private classroom leaderboard</h4>
      <p class="text-sm my-2">Choose one PIN-identified assignment. Latest submitted scores only; ties share a rank. Nicknames and unsubmitted work are not ranked.</p>
      <label for="tc-leaderboard-assignment">Assignment </label><select id="tc-leaderboard-assignment" class="border rounded p-2 dark:bg-gray-700"><option value="">Choose an assignment…</option>${assignments.filter(a=>a.classroom_id===classroom && a.access_mode==='classroom_pin').map(a=>`<option value="${esc(a.id)}">${esc(a.title)}</option>`).join('')}</select>
      <div id="tc-assignment-results" class="mt-3" aria-live="polite"></div>`;
    el('tc-new-assignment').onclick=()=>TeacherGuestClasses.createAssignment(classroom);
    el('tc-assignment-filter').onchange=e=>{ classFilter=e.target.value; request++; drawClassroom(); };
    el('tc-leaderboard-assignment').onchange=e=>results(e.target.value,'tc-assignment-results',true);
    drawCards(el('tc-assignment-cards'),filterAssignments(assignments,classroom,classFilter),true);
  }

  function rankSubmissions(rows) {
    const ranked=rows.filter(r=>r.submitted_at && Number(r.total)>0).slice().sort((a,b)=>Number(b.pct)-Number(a.pct));
    let rank=0, previous=null;
    return ranked.map((r,i)=>{ if (Number(r.pct)!==previous) rank=i+1; previous=Number(r.pct); return {...r,rank}; });
  }

  function _shareUrl(a) { return `${location.origin}/a/${encodeURIComponent(a.code)}`; }

  function share(a) {
    let pin = pins.get(a.id);
    if (a.access_mode === 'legacy' && !pin) {
      pin = prompt('Enter the 4-digit PIN you gave this assignment. For security, saved PINs cannot be retrieved from the server.');
      if (pin === null) return;
      if (!/^\d{4}$/.test(pin.trim())) { toast('Enter the original 4-digit PIN.', 3000); return; }
      pin = pin.trim();
    }
    const entry = a.access_mode === 'classroom_pin' ? 'Enter your own private 4-digit pupil PIN.' : a.access_mode === 'nickname' ? 'Enter your nickname. No PIN needed.' : `PIN: ${pin}`;
    const text = `${a.title}\n${a.question_count} questions\n${_shareUrl(a)}\n${entry}\nCloses: ${date(a.expires_at)}`;
    shareText(a.title, text, _shareUrl(a));
  }

  // ⚠ One share path for links, materials and reminders, and WhatsApp is ALWAYS
  // on it. This used to hand the whole job to navigator.share wherever it
  // existed - but the OS sheet only lists WhatsApp if the OS knows about it,
  // which on a laptop it usually does not, and a teacher was then one dead end
  // away from the app they actually send work with. The panel is the constant;
  // the native sheet is one more button on it.
  // window.open() is still avoided - popup blockers eat it when it is not
  // inside the click itself, so WhatsApp is a real anchor the teacher taps.
  function shareText(title, text, url) {
    _sharePanel(title, text, url);
  }
  function _sharePanel(title, text, url) {
    if (typeof document === 'undefined' || !document.body) return;
    document.getElementById('ta-share-text-panel')?.remove();
    const canNative = typeof navigator !== 'undefined' && !!navigator.share;
    const panel = document.createElement('div');
    panel.id = 'ta-share-text-panel';
    panel.className = 'tc-share-panel';
    panel.innerHTML = `<div class="tc-share-inner">
      <div class="tc-share-header"><span class="tc-share-title">${esc(title)}</span><button type="button" class="tc-share-close" aria-label="Close">✕</button></div>
      <a class="tc-share-wa-btn" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(text)}"><span>💬</span> Share on WhatsApp</a>
      <textarea class="ta-share-textarea" readonly rows="6">${esc(text)}</textarea>
      <div class="ta-share-row">
        <button type="button" class="tc-share-copy-btn" data-copy>📋 Copy message</button>
        ${url ? '<button type="button" class="tc-share-copy-btn" data-copy-link>🔗 Copy link</button>' : ''}
        ${canNative ? '<button type="button" class="tc-share-copy-btn" data-native>📤 More apps</button>' : ''}
      </div>
      <p class="tc-share-hint">WhatsApp opens in a new tab with the message already written.</p>
    </div>`;
    document.body.appendChild(panel);
    panel.addEventListener('click', e => { if (e.target === panel) panel.remove(); });
    qs(panel, '.tc-share-close').onclick = () => panel.remove();
    const flash = (btn, label) => { const was = btn.textContent; btn.textContent = label; setTimeout(() => { btn.textContent = was; }, 2000); };
    const copy = qs(panel, '[data-copy]');
    copy.onclick = () => {
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(() => flash(copy, 'Copied ✓')).catch(() => qs(panel, 'textarea').select());
      else qs(panel, 'textarea').select();
    };
    const copyLink = qs(panel, '[data-copy-link]');
    if (copyLink) copyLink.onclick = () => {
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(url).then(() => flash(copyLink, 'Copied ✓')).catch(() => qs(panel, 'textarea').select());
      else qs(panel, 'textarea').select();
    };
    const native = qs(panel, '[data-native]');
    // Inside the click, so the gesture is still live when the sheet opens.
    if (native) native.onclick = () => {
      navigator.share(url ? { title, text, url } : { title, text }).catch(() => {});
    };
  }

  // ── Results data (cached, de-duplicated) ──────────────────────────
  async function fetchResults(id, opts = {}) {
    const cached = resultsCache.get(id);
    if (cached && !opts.force && Date.now() - cached.at < RESULTS_FRESH_MS) return cached.rows;
    if (inflight.has(id)) return inflight.get(id);
    const p = (async () => {
      try {
        const data = await rpc('teacher_guest_results', { p_assignment_id: id });
        const rows = data.submissions || [];
        resultsCache.set(id, { rows, assignment: data.assignment || null, at: Date.now() });
        return rows;
      } finally { inflight.delete(id); }
    })();
    inflight.set(id, p);
    return p;
  }

  // ── The results picker (cards) shown when nothing is selected ─────
  function drawResultsPicker() {
    const box = el('ta-results-picker');
    if (!box) return;
    if (selected) { box.innerHTML = ''; return; }
    const active = assignments.filter(a => _statusLabel(a) === 'active');
    if (!assignments.length) { message(box, 'No work yet. Set some work and results will appear here as pupils submit.'); return; }
    const rows = active.length ? active : assignments.slice(0, 6);
    box.innerHTML = `<p class="ta-form-help">${active.length ? 'Active work - tap one to see results.' : 'No active work right now. Recent work:'}</p><div id="ta-results-cards"></div>`;
    drawCards(el('ta-results-cards'), rows, false);
  }

  async function results(id, target = 'ta-results-list', leaderboard = false, opts = {}) {
    if (target === 'ta-results-list') {
      selected = id || '';
      drawResultsPicker();
      if (typeof TeacherMode !== 'undefined' && TeacherMode.saveLocation) TeacherMode.saveLocation({ resultsId: selected });
    }
    const serial = ++request, token = generation;
    const container = el(target);
    el('ta-answer-panel')?.classList.add('hidden');
    if (!id) { message(container, 'Choose a piece of work above to see pupils’ results.'); return; }
    if (!assignments.some(a => a.id === id)) return;
    const a = assignments.find(x => x.id === id);
    if (!leaderboard && target === 'ta-results-list' && resultsCache.get(id) && !opts.force) {
      _renderMainResults(a, resultsCache.get(id).rows, container, { stale: true });
    } else message(container, 'Loading results…', null, 'loading');
    try {
      const rows = await fetchResults(id, { force: opts.force });
      if (serial !== request || token !== generation) return;
      if (leaderboard) {
        if (a?.classroom_id!==classroom || a.access_mode!=='classroom_pin') { message(container,'Leaderboards require a PIN-identified classroom assignment.'); return; }
        const ranked=rankSubmissions(rows);
        container.innerHTML=`<h4 class="font-bold">${esc(a.title)}</h4><p class="text-sm">${ranked.length} submitted · ${rows.filter(r=>!r.submitted_at).length} not submitted. Teacher-only view.</p>` + ranked.map(r=>`<p class="p-3 border-b dark:border-gray-600">#${r.rank} · ${esc(r.name)} · ${esc(r.score)}/${esc(r.total)} (${esc(r.pct)}%) · Attempt ${esc(r.attempt)}</p>`).join('');
        if (!ranked.length) container.innerHTML+='<p>No submitted scores yet.</p>';
        return;
      }
      if (target !== 'ta-results-list') { _renderSimpleResults(a, rows, container, id, target, serial, token); return; }
      _renderMainResults(a, rows, container, {});
    } catch (_) {
      if (serial !== request || token !== generation) return;
      message(container, 'Could not load results. This does not mean pupils have not submitted.', () => results(id,target,leaderboard,{force:true}), 'error');
    }
  }

  function _renderSimpleResults(a, rows, container, id, target, serial, token) {
    if (!rows.length) { message(container, 'No pupils have opened this assignment yet.'); return; }
    container.innerHTML = `<p class="text-xs text-gray-500 mb-3">Updated ${esc(new Date().toLocaleTimeString())}. Latest attempt per pupil.</p>` + rows.map((r, i) => `<div class="p-4 border dark:border-gray-600 rounded-xl mb-3 dark:text-gray-200">
      <h4 class="font-bold">${esc(r.name)}</h4>
      <p>${r.submitted_at ? `${esc(r.score)}/${esc(r.total)} (${esc(r.pct)}%) · Attempt ${esc(r.attempt)}` : r.not_started ? 'Not started' : 'Working on it'}</p>
    </div>`).join('');
  }

  // ── Action-focused results ────────────────────────────────────────
  function _questionChapterLookup() {
    if (typeof STATIC_QUESTIONS === 'undefined' || !Array.isArray(STATIC_QUESTIONS)) return () => null;
    const map = new Map();
    for (const q of STATIC_QUESTIONS) if (q && q.id) map.set(q.id, q.chapterId);
    return id => map.get(id) || null;
  }

  function _pupilRow(r, i, a) {
    const ins = I();
    const state = ins ? ins.state(r) : (r.submitted_at ? 'completed' : r.not_started ? 'not-started' : 'working');
    const help = ins ? ins.needsHelp(r) : false;
    const rush = ins ? ins.rushed(r) : false;
    const score = state === 'completed' ? `${esc(r.score)}/${esc(r.total)} <b>(${esc(r.pct)}%)</b>` : state === 'working' ? 'Working on it' : 'Not started';
    const when = r.submitted_at ? `${esc(_shortDate(r.submitted_at))}${r.elapsed_secs != null ? ` · ${esc(ins ? ins.fmtDuration(r.elapsed_secs) : r.elapsed_secs + 's')}` : ''}${r.over_time ? ' · over time' : ''}${Number(r.attempt) > 1 ? ` · attempt ${esc(r.attempt)}` : ''}` : '';
    const answers = (r.answers || []);
    // ⚠ NEVER colour alone. A green row is the fast signal a teacher scans for,
    // but it is paired with a glyph and a word, because ~8% of men have a colour
    // vision deficiency and a row that is only "green" says nothing to them —
    // and says nothing at all in a printout or a screenshot.
    const STATE_BADGE = {
      completed:     { cls: 'tr-state-done',    glyph: '✓', label: 'Done' },
      working:       { cls: 'tr-state-working', glyph: '●', label: 'Working' },
      'not-started': { cls: 'tr-state-idle',    glyph: '○', label: 'Not started' },
    };
    const badge = STATE_BADGE[state] || STATE_BADGE['not-started'];
    return `<div class="tr-row tr-row-${state} ${help ? 'tr-row-help' : ''}" data-row="${i}">
      <span class="tr-avatar tr-avatar-${state}" aria-hidden="true">${esc(String(r.name || '?').trim().charAt(0).toUpperCase() || '?')}</span>
      <div class="tr-row-main">
        <strong>${esc(r.name || 'Pupil')}<span class="tr-state ${badge.cls}"><span aria-hidden="true">${badge.glyph}</span> ${badge.label}</span>${help ? ' <span class="tr-flag">may need help</span>' : ''}${rush ? ' <span class="tr-flag tr-flag-rush">very quick</span>' : ''}</strong>
        <small>${score}${when ? ' · ' + when : ''}</small>
      </div>
      ${state === 'completed' ? `<div class="tr-row-actions">
        <button type="button" class="tr-mini" data-retry="${i}" ${r.retry_allowed ? 'disabled' : ''}>${r.retry_allowed ? 'Retry allowed' : 'Allow another attempt'}</button>
      </div>` : ''}
      ${state === 'completed' && answers.length ? `<details class="tr-answers"><summary>View answers</summary>${answers.map((ans, n) => `<p class="${ans.correct ? 'ok' : 'wrong'}"><b>Q${n + 1}</b> ${ans.correct ? '✓ Correct' : '✗ Wrong'}${ans.correct ? '' : `<br><span>Pupil: ${esc(ans.userAnswer)}</span><br><span>Correct: ${esc(ans.correctAnswer)}</span>`}</p>`).join('')}</details>` : ''}
    </div>`;
  }

  function _renderMainResults(a, rows, container, opts = {}) {
    if (!container) return;
    lastRows = rows;
    const ins = I();
    const cached = resultsCache.get(a.id);
    const meta = cached && cached.assignment ? cached.assignment : {};
    const summary = ins ? ins.summarize(rows, { assigned: a.access_mode === 'classroom_pin' ? rows.length : 0 }) : null;
    const s = summary || (() => { const x = summarizeRows(rows); return { assigned: rows.length, completed: x.submitted.length, working: x.inProgress.length, notStarted: x.notStarted.length, average: x.average, averageSecs: null, groups: { completed: x.submitted, working: x.inProgress, notStarted: x.notStarted, help: [] } }; })();
    const chapterIds = Array.isArray(a.chapter_ids) ? a.chapter_ids : [];
    const insights = ins ? ins.insights(rows, a, _questionChapterLookup(), _chapterName) : [];
    const groups = [
      ['completed', '✅ Completed', s.groups.completed],
      ['working', '✏️ Working on it', s.groups.working],
      ['notStarted', '⏳ Not started', s.groups.notStarted],
      ['help', '🙋 May need help', s.groups.help],
    ];
    const notStartedKeys = s.groups.notStarted.concat(s.groups.working).map(r => r.name_key);
    const evidenceNote = rows.length && !rows.some(r => ins ? ins.hasEvidence(r) : r.submitted_at)
      ? 'Not enough answers yet to say who needs help - pupils appear here only after enough questions.' : '';

    container.innerHTML = `<div class="tr-wrap ${opts.stale ? 'tr-stale' : ''}">
      <div class="tr-head">
        <button type="button" class="tr-back" data-back>← All work</button>
        <div class="tr-head-main">
          <h3>${esc(a.title)}</h3>
          <p>${a.classroom_name ? `🏫 ${esc(a.classroom_name)} · ` : ''}${esc(_packLabel(a.subject_pack_id))} · ${esc(_chapterLine(a))} · ${esc(a.question_count)} questions · ${esc(ins ? ins.dueLabel(a.expires_at) : _shortDate(a.expires_at))}</p>
        </div>
        ${_statusChip(a)}
      </div>
      <div class="tr-toolbar">
        <button type="button" class="tw-btn" data-refresh>↻ Refresh</button>
        <button type="button" class="tw-btn" data-share ${a.archived ? 'disabled' : ''}>🔗 Share link</button>
        <button type="button" class="tw-btn" data-export ${s.completed ? '' : 'disabled'}>⬇️ Export results</button>
        <button type="button" class="tw-btn" data-open-all ${s.completed ? '' : 'disabled'}>👁 Open individual answers</button>
      </div>
      ${opts.stale ? '<p class="tr-updating">Updating…</p>' : ''}
      <div class="tr-stats" aria-label="Summary">
        <div><strong>${s.assigned}</strong><span>Assigned</span></div>
        <div class="tr-stat-good"><strong>${s.completed}</strong><span>Completed</span></div>
        <div><strong>${s.working}</strong><span>In progress</span></div>
        <div><strong>${s.notStarted}</strong><span>Not started</span></div>
        <div><strong>${s.average == null ? '-' : s.average + '%'}</strong><span>Average result</span></div>
        <div><strong>${s.averageSecs == null ? '-' : esc(ins.fmtDuration(s.averageSecs))}</strong><span>Average time</span></div>
      </div>
      <section class="tr-help">
        <div class="tr-help-head"><h4>🙋 Who needs my help?</h4>${rows.length ? `<small>${rows.length} pupil${rows.length === 1 ? '' : 's'} checked</small>` : ''}</div>
        ${!rows.length ? '<p class="tr-help-empty">No pupil has opened this work yet. Share the link and check back.</p>'
        : evidenceNote ? `<p class="tr-help-empty">${evidenceNote}</p>`
        : !insights.length ? '<p class="tr-help-empty tr-help-good">✓ Nothing needs your attention right now.</p>'
        : insights.map((x, i) => `<div class="tr-insight"><div><strong>${esc(x.message)}</strong><small>${esc(x.pupils.slice(0, 6).join(', '))}${x.pupils.length > 6 ? ` and ${x.pupils.length - 6} more` : ''}</small></div><button type="button" class="tr-insight-btn" data-insight="${i}">${esc(x.actionLabel)}</button></div>`).join('')}
      </section>
      <div class="tr-bulk" aria-label="Bulk actions">
        <button type="button" data-remind ${notStartedKeys.length && !a.archived ? '' : 'disabled'}>📣 Remind pupils who have not started${notStartedKeys.length ? ` (${notStartedKeys.length})` : ''}</button>
        <button type="button" data-practice ${s.groups.help.length ? '' : 'disabled'}>📝 Give more practice to pupils needing help${s.groups.help.length ? ` (${s.groups.help.length})` : ''}</button>
      </div>
      ${groups.map(([key, label, list]) => `<section class="tr-group tr-group-${key}">
        <h4>${label} <span>${list.length}</span></h4>
        ${list.length ? list.map((r, i) => _pupilRow(r, rows.indexOf(r), a)).join('') : `<p class="tr-group-empty">${key === 'help' ? 'Nobody is flagged. Pupils appear here only after enough answers to be sure.' : 'Nobody here.'}</p>`}
      </section>`).join('')}
      <p class="tr-updated">Updated ${esc(new Date(cached ? cached.at : Date.now()).toLocaleTimeString())} · latest attempt per pupil.</p>
    </div>`;

    const on = (sel, fn) => { const b = qs(container, sel); if (b) b.onclick = fn; };
    on('[data-back]', () => { const sel = el('ta-results-assign-sel'); if (sel) sel.value = ''; results(''); });
    on('[data-refresh]', () => results(a.id, 'ta-results-list', false, { force: true }));
    on('[data-share]', () => share(a));
    on('[data-export]', () => exportCsv(a, rows));
    on('[data-open-all]', () => qsa(container, 'details.tr-answers').forEach(d => { d.open = true; }));
    on('[data-remind]', () => remind(a, rows));
    on('[data-practice]', () => morePractice(a, { keys: s.groups.help.map(r => r.name_key), chapterIds }));
    qsa(container, '[data-insight]').forEach(b => b.onclick = () => {
      const x = insights[Number(b.dataset.insight)];
      if (!x) return;
      if (x.action === 'remind') remind(a, rows);
      else if (x.action === 'practice') morePractice(a, { keys: x.keys, chapterIds: x.chapterId ? [x.chapterId] : chapterIds, label: x.chapterId ? `More practice: ${_chapterName(x.chapterId)}` : '' });
      else { qsa(container, 'details.tr-answers').forEach(d => { d.open = x.keys.includes(rows[Number(d.closest('[data-row]')?.dataset.row)]?.name_key); }); qs(container, '.tr-group-completed')?.scrollIntoView?.({ behavior: 'smooth' }); }
    });
    const serial = request, token = generation;
    qsa(container, '[data-retry]').forEach(b => b.onclick = async () => {
      b.disabled = true;
      try {
        await rpc('guest_grant_retry', { p_assignment_id: a.id, p_name_key: rows[Number(b.dataset.retry)].name_key });
        if (serial !== request || token !== generation) return;
        toast('Another attempt is now allowed on the pupil’s device.', 3000);
        await results(a.id, 'ta-results-list', false, { force: true });
      } catch (_) {
        if (serial !== request || token !== generation) return;
        b.disabled = false; toast('Retry was not confirmed. Check your connection and try again.', 3500);
      }
    });
  }

  function remind(a, rows) {
    const ins = I();
    const missing = rows.filter(r => (ins ? ins.state(r) : (r.submitted_at ? 'completed' : 'x')) !== 'completed');
    const names = missing.map(r => r.name || 'Pupil');
    const due = a.expires_at ? `Due ${new Date(a.expires_at).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}.` : '';
    const entry = a.access_mode === 'classroom_pin' ? 'Use your own 4-digit PIN.' : a.access_mode === 'nickname' ? 'Type your name to begin.' : '';
    const text = `Reminder from your teacher 📚\n${a.title} (${a.question_count} questions) is waiting for you.\n${_shareUrl(a)}\n${entry} ${due}`.trim() +
      (names.length ? `\n\nStill to do: ${names.join(', ')}` : '');
    shareText(`Reminder: ${a.title}`, text, _shareUrl(a));
  }

  function morePractice(a, { keys = [], chapterIds = [], label = '' } = {}) {
    if (typeof TeacherMode === 'undefined' || !TeacherMode.prefillPractice) return;
    TeacherMode.prefillPractice({ classroomId: a.classroom_id, packId: a.subject_pack_id, chapterIds, pupilKeys: keys, label: label || `More practice: ${a.title}` });
  }

  function exportCsv(a, rows) {
    const list = (rows || lastRows || []);
    if (!list.length) { toast('No results to export yet.', 2000); return; }
    const ins = I();
    const header = ['Pupil', 'Status', 'Score', 'Total', 'Percentage', 'Time', 'Submitted', 'Attempt'];
    const out = [header].concat(list.map(r => [r.name || '', ins ? ins.state(r) : (r.submitted_at ? 'completed' : 'not started'),
      r.submitted_at ? r.score : '', r.submitted_at ? r.total : '', r.submitted_at ? r.pct + '%' : '',
      r.elapsed_secs != null ? r.elapsed_secs + 's' : '', r.submitted_at ? new Date(r.submitted_at).toLocaleString() : '', r.attempt || '']));
    const csv = out.map(r => r.map(v => '"' + String(v ?? '').replace(/"/g, '""') + '"').join(',')).join('\n');
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    link.download = (a.title || 'results').replace(/[^a-z0-9\-_.]/gi, '_') + '-results.csv';
    document.body.appendChild(link); link.click(); link.remove();
  }

  function rememberPin(id, pin) { pins.set(id, pin); }
  if (typeof _sb !== 'undefined' && _sb) _sb.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT' || (owner && session?.user?.id !== owner)) reset();
  });
  return { refresh, results, reset, rememberPin, openClass, openDetails, closeDetails, filterAssignments, rankSubmissions, summarizeRows,
    ensureLoaded, getAssignments, fetchResults, completion, showResults, showList, openResults, drawResultsPicker, drawCards, share, shareText,
    remind, exportCsv, cardHtml };
})();
