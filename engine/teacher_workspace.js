'use strict';

const TeacherWorkspace = (() => {
  let owner = null, generation = 0, request = 0, selected = '', assignments = [];
  let pins = new Map();
  let classroom = null, className = '', classFilter = 'active', listFilter = 'all';
  const el = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const date = value => value ? new Date(value).toLocaleString() : 'Not set';

  function reset() {
    owner = null; generation++; request++; selected = ''; assignments = []; pins = new Map();
    classroom = null; className = ''; classFilter = 'active'; listFilter = 'all';
    el('tc-workspace')?.replaceChildren();
    for (const id of ['ta-asgn-list', 'ta-results-list', 'ta-results-assign-sel']) {
      if (el(id)) el(id).replaceChildren();
    }
    el('ta-answer-panel')?.classList.add('hidden');
    el('modal-share-assignment')?.classList.add('hidden');
    el('ta-quota')?.classList.add('hidden');
  }

  async function rpc(name, args = {}) {
    if (typeof _sb === 'undefined' || !_sb) throw new Error('Connection unavailable');
    const response = await _sb.rpc(name, args);
    if (response.error || response.data?.ok !== true) throw new Error('Request failed');
    return response.data;
  }

  function message(container, text, retry) {
    if (!container) return;
    container.replaceChildren();
    const p = document.createElement('p');
    p.className = 'text-sm text-gray-600 dark:text-gray-300 py-3';
    p.textContent = text;
    container.append(p);
    if (retry) {
      const button = document.createElement('button');
      button.className = 'text-sm text-blue-600 p-2';
      button.textContent = 'Try again'; button.onclick = retry; container.append(button);
    }
  }

  async function refresh() {
    const token = ++generation;
    request++;
    message(el('ta-asgn-list'), 'Loading your saved assignments…');
    message(el('ta-results-list'), 'Loading assignments…');
    if (classroom) message(el('tc-workspace'), 'Loading classroom assignments…');
    el('ta-results-assign-sel')?.replaceChildren();
    el('ta-answer-panel')?.classList.add('hidden');
    try {
      const session = await _sb.auth.getSession();
      if (token !== generation) return;
      const uid = session.data?.session?.user?.id;
      if (!uid || !Auth.isTeacher()) throw new Error('Sign in required');
      if (owner !== uid) {
        pins = new Map(); selected = ''; assignments = [];
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
      drawAssignments();
      drawClassroom();
      const select = el('ta-results-assign-sel');
      if (select) {
        select.innerHTML = '<option value="">Select homework or a test…</option>' + assignments.map(a => `<option value="${esc(a.id)}">${esc(a.title)}</option>`).join('');
        if (!assignments.some(a => a.id === selected)) selected = '';
        select.value = selected;
      }
      await results(selected);
      await drawQuota(token);
    } catch (_) {
      if (token !== generation) return;
      assignments = [];
      message(el('ta-asgn-list'), 'Could not load assignments. Check your connection and teacher access. Your saved work has not been deleted.', refresh);
      message(el('ta-results-list'), 'Results are unavailable until assignments load.');
      if (classroom) message(el('tc-workspace'), 'Could not load classroom assignments. Your work has not been deleted.', refresh);
    }
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
    if (!q) { box.classList.add('hidden'); return; }
    box.textContent = q.left_today === 0
      ? 'You have used all ' + q.per_day + ' of today' + String.fromCharCode(8217) + 's assignments. The limit resets tomorrow.'
      : q.left_today + ' of ' + q.per_day + ' assignments left today · up to ' + q.max_students + ' pupils each.';
    box.classList.remove('hidden');
  }
  function drawAssignments() {
    const list = el('ta-asgn-list');
    if (!list) return;
    if (!assignments.length) { message(list, 'No saved assignments yet. Create your first homework using the Create tab.'); return; }
    list.innerHTML = `<label for="ta-list-filter" class="text-sm dark:text-gray-300">Show </label><select id="ta-list-filter" class="border rounded p-2 mb-3 dark:bg-gray-700 dark:text-white">${filterOptions(listFilter)}</select><div id="ta-list-cards"></div>`;
    el('ta-list-filter').onchange = e => { listFilter = e.target.value; drawAssignments(); };
    drawCards(el('ta-list-cards'), filterAssignments(assignments, null, listFilter), false);
  }

  function filterAssignments(rows, classId, filter) {
    return rows.filter(a => (!classId || a.classroom_id === classId) &&
      (filter === 'all' || (filter === 'standalone' && !a.classroom_id) ||
      (filter === 'archived' && a.archived) || (filter === 'active' && !a.archived && a.status === 'active' && (!a.expires_at || Date.parse(a.expires_at) > Date.now())) ||
      (filter === 'closed' && !a.archived && (a.status !== 'active' || (a.expires_at && Date.parse(a.expires_at) <= Date.now())))));
  }

  function filterOptions(value, inClass = false) {
    return [['all','All assignments'],['active','Active'],['closed','Closed / expired'],['archived','Archived'],...(!inClass ? [['standalone','Standalone only']] : [])]
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
    if (!id) return '';
    return id.replace(/^grade(\d+)-/, 'G$1 ').replace(/-/g, ' ');
  }

  function drawCards(list, rows, inClass) {
    if (!rows.length) { message(list, 'No assignments in this view.'); return; }
    list.innerHTML = `<div class="ta-copybook-wrap">` + rows.map((a, i) => {
      const status = _statusLabel(a);
      return `<div class="ta-copybook" data-open="${i}" title="${esc(a.title)}">
        <div class="ta-copybook-fold"></div>
        <div class="ta-copybook-date">${_shortDate(a.expires_at)}</div>
        <div class="ta-copybook-page">
          ${a.classroom_id ? `<div class="ta-copybook-class">🏫 ${esc(a.classroom_name || 'Classroom')}</div>` : ''}
          <div class="ta-copybook-subject">${_packLabel(a.subject_pack_id)}</div>
          <div class="ta-copybook-title">${esc(a.title)}</div>
          <div class="ta-copybook-meta">
            ${esc(a.question_count)} questions<br>
            ${a.duration_mins ? '⏱ Timed' : '🔍 Practice'} ·
            ${a.access_mode === 'classroom_pin' ? '🔑 PIN' : a.access_mode === 'nickname' ? '👤 Open' : '🔒 Shared'}<br>
            ${esc(a.submissions ?? 0)} submitted
          </div>
          <div class="ta-copybook-status ${status}">${status}</div>
        </div>
        <div class="ta-copybook-actions">
          <button data-results="${i}">📊 Results</button>
          <button data-share="${i}" ${a.archived ? 'disabled' : ''}>🔗 Share</button>
          <button data-archive="${i}">${a.archived ? '♻️' : '📦'}</button>
        </div>
      </div>`;
    }).join('') + `</div>`;

    list.querySelectorAll('[data-open]').forEach(b => b.onclick = e => {
      if (e.target.closest('button')) return;
    });
    list.querySelectorAll('[data-results]').forEach(b => b.onclick = e => {
      e.stopPropagation();
      const a = rows[Number(b.dataset.results)];
      if (inClass) { results(a.id, 'tc-assignment-results'); return; }
      TeacherMode.switchTab('results');
      el('ta-results-assign-sel').value = a.id;
      results(a.id);
    });
    list.querySelectorAll('[data-share]').forEach(b => b.onclick = e => { e.stopPropagation(); share(rows[Number(b.dataset.share)]); });
    list.querySelectorAll('[data-archive]').forEach(b => b.onclick = e => { e.stopPropagation(); archive(rows[Number(b.dataset.archive)], b); });
  }

  async function archive(a, button) {
    if (!confirm(a.archived ? 'Restore this assignment? It reopens only if it was active and has not expired.' : 'Archive this assignment? This closes entry and submissions. Existing results are kept.')) return;
    const token = generation;
    button.disabled = true;
    try {
      await rpc('teacher_guest_archive_assignment', {p_id:a.id,p_archive:!a.archived});
      if (token === generation) await refresh();
    } catch (_) { if (token === generation) { button.disabled=false; toast('Could not update the assignment. Please try again.',3000); } }
  }

  async function openClass(id, name) {
    classroom = id; className = name; classFilter = 'active';
    await refresh();
  }

  function drawClassroom() {
    const box=el('tc-workspace');
    if (!box || !classroom) return;
    box.innerHTML=`<h3 class="font-bold text-lg my-3">${esc(className)} — assignments</h3>
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

  function share(a) {
    let pin = pins.get(a.id);
    if (a.access_mode === 'legacy' && !pin) {
      pin = prompt('Enter the 4-digit PIN you gave this assignment. For security, saved PINs cannot be retrieved from the server.');
      if (pin === null) return;
      if (!/^\d{4}$/.test(pin.trim())) { toast('Enter the original 4-digit PIN.', 3000); return; }
      pin = pin.trim();
    }
    const entry = a.access_mode === 'classroom_pin' ? 'Enter your own private 4-digit pupil PIN.' : a.access_mode === 'nickname' ? 'Enter your nickname. No PIN needed.' : `PIN: ${pin}`;
    const text = `${a.title}\n${a.question_count} questions\n${location.origin}/a/${encodeURIComponent(a.code)}\n${entry}\nCloses: ${date(a.expires_at)}`;
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(() => toast('Link and PIN copied.', 2000)).catch(() => prompt('Copy and share with your pupils:', text));
    else prompt('Copy and share with your pupils:', text);
  }

  async function results(id, target = 'ta-results-list', leaderboard = false) {
    if (target === 'ta-results-list') selected = id || '';
    const serial = ++request, token = generation;
    const container = el(target);
    el('ta-answer-panel')?.classList.add('hidden');
    if (!id) { message(container, 'Select an assignment to see pupils’ work.'); return; }
    if (!assignments.some(a => a.id === id)) return;
    message(container, 'Loading results…');
    try {
      const data = await rpc('teacher_guest_results', { p_assignment_id: id });
      if (serial !== request || token !== generation) return;
      const rows = data.submissions || [];
      if (leaderboard) {
        const a=assignments.find(a=>a.id===id);
        if (a?.classroom_id!==classroom || a.access_mode!=='classroom_pin') { message(container,'Leaderboards require a PIN-identified classroom assignment.'); return; }
        const ranked=rankSubmissions(rows);
        container.innerHTML=`<h4 class="font-bold">${esc(a.title)}</h4><p class="text-sm">${ranked.length} submitted · ${rows.filter(r=>!r.submitted_at).length} not submitted. Teacher-only view.</p>` + ranked.map(r=>`<p class="p-3 border-b dark:border-gray-600">#${r.rank} · ${esc(r.name)} · ${esc(r.score)}/${esc(r.total)} (${esc(r.pct)}%) · Attempt ${esc(r.attempt)}</p>`).join('');
        if (!ranked.length) container.innerHTML+='<p>No submitted scores yet.</p>';
        return;
      }
      if (!rows.length) { message(container, 'No pupils have opened this assignment yet.'); return; }
      container.innerHTML = `<p class="text-xs text-gray-500 mb-3">Updated ${esc(new Date().toLocaleTimeString())}. Latest attempt per pupil; earlier attempts are not provided by the current server.</p>` + rows.map((r, i) => `<div class="p-4 border dark:border-gray-600 rounded-xl mb-3 dark:text-gray-200">
        <h4 class="font-bold">${esc(r.name)}</h4>
        <p>${r.submitted_at ? `${esc(r.score)}/${esc(r.total)} (${esc(r.pct)}%) · Attempt ${esc(r.attempt)}` : r.not_started ? 'Not started' : 'In progress'}</p>
        <p class="text-xs">${r.submitted_at ? esc(date(r.submitted_at)) : 'Not submitted yet'}${r.over_time ? ' · Over time' : ''}${r.elapsed_secs != null ? ` · ${esc(r.elapsed_secs)} seconds` : ''}</p>
        ${r.submitted_at ? `<button data-retry="${i}" ${r.retry_allowed ? 'disabled' : ''} class="text-blue-600 p-2 text-sm">${r.retry_allowed ? 'Retry granted' : 'Allow another attempt'}</button><details class="text-sm"><summary class="cursor-pointer p-2">View answers</summary>${(r.answers || []).map((a, n) => `<p class="p-2">Q${n + 1} (${esc(a.id)}): ${a.correct ? 'Correct' : 'Incorrect'}<br>Pupil: ${esc(a.userAnswer)}<br>Correct answer: ${esc(a.correctAnswer)}</p>`).join('')}</details>` : ''}
      </div>`).join('');
      container.querySelectorAll('[data-retry]').forEach(b => b.onclick = async () => {
        b.disabled = true;
        try {
          await rpc('guest_grant_retry', { p_assignment_id: id, p_name_key: rows[Number(b.dataset.retry)].name_key });
          if (serial !== request || token !== generation) return;
          toast('Another attempt is now allowed on the pupil’s device.', 3000);
          await results(id,target);
        } catch (_) {
          if (serial !== request || token !== generation) return;
          b.disabled = false; toast('Retry was not confirmed. Check your connection and try again.', 3500);
        }
      });
    } catch (_) {
      if (serial !== request || token !== generation) return;
      message(container, 'Could not load results. This does not mean pupils have not submitted.', () => results(id,target,leaderboard));
    }
  }

  function rememberPin(id, pin) { pins.set(id, pin); }
  if (typeof _sb !== 'undefined' && _sb) _sb.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT' || (owner && session?.user?.id !== owner)) reset();
  });
  return { refresh, results, reset, rememberPin, openClass, filterAssignments, rankSubmissions };
})();
