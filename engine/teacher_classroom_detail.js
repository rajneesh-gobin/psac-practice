'use strict';
const TeacherClassroomDetail = (() => {
  const el = id => document.getElementById(id);
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  let _classId = null;
  let _className = '';
  let _pupils = [];
  let _assignments = [];
  let _activeSection = 'work';
  let _resultsAssignId = null;

  async function open(classId, className) {
    _classId = classId;
    _className = className;
    _activeSection = 'work';
    _resultsAssignId = null;

    el('tc-classroom-detail').classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    el('tc-cd-name').textContent = className;
    el('tc-cd-emoji').textContent = '🏫';
    ['pupils','assignments','materials','results'].forEach(k => el('tc-cd-stat-' + k).textContent = '—');
    ['work','pupils','materials','results','settings'].forEach(s => {
      const sec = el('tc-cd-' + s);
      if (sec) { sec.innerHTML = '<p class="tc-cd-loading">Loading…</p>'; sec.classList.add('hidden'); }
    });

    showSection('work');
    await Promise.all([_loadWork(), _loadPupils(), _loadMaterials()]);
  }

  function close() {
    el('tc-classroom-detail').classList.add('hidden');
    document.body.style.overflow = '';
    _classId = null;
  }

  function showSection(sec) {
    _activeSection = sec;
    document.querySelectorAll('.tc-cd-nav-btn').forEach(b => {
      b.classList.toggle('tc-cd-nav-active', b.dataset.sec === sec);
    });
    document.querySelectorAll('.tc-cd-section').forEach(s => s.classList.add('hidden'));
    el('tc-cd-' + sec)?.classList.remove('hidden');
    if (sec === 'settings') _renderSettings();
    if (sec === 'results')  _renderResults();
  }

  // ── Work / Assignments ────────────────────────────────────────────
  async function _loadWork() {
    const box = el('tc-cd-work');
    if (!box) return;
    try {
      const { data, error } = await _sb.rpc('guest_my_assignments');
      if (error) throw error;
      const { data: modeData } = await _sb.rpc('teacher_guest_assignment_modes').catch(() => ({data:null}));
      const modes = new Map((modeData?.modes || []).map(a => [a.id, a]));
      _assignments = (data?.assignments || [])
        .filter(a => modes.get(a.id)?.classroom_id === _classId)
        .map(a => ({...a, access_mode: modes.get(a.id)?.mode || 'legacy', archived: !!modes.get(a.id)?.archived}));
      el('tc-cd-stat-assignments').textContent = _assignments.length;
      _renderWork();
    } catch(_e) {
      if (box) box.innerHTML = '<p class="tc-cd-err">Could not load assignments.</p>';
    }
  }

  function _renderWork() {
    const box = el('tc-cd-work');
    if (!box) return;
    const active   = _assignments.filter(a => !a.archived);
    const archived = _assignments.filter(a =>  a.archived);
    box.innerHTML = `
      <div class="tc-cd-section-header">
        <h3 class="tc-cd-section-title">📋 Assignments</h3>
        <button class="tc-cd-action-btn" onclick="TeacherClassroomDetail.createWork()">＋ Set new homework</button>
      </div>
      ${!_assignments.length ? '<p class="tc-cd-empty">No assignments yet. Click "+ Set new homework" to create one.</p>' : ''}
      <div class="ta-copybook-wrap" id="tc-cd-work-cards"></div>
      ${archived.length ? `<details class="tc-cd-archived-toggle"><summary>📦 ${archived.length} archived</summary><div class="ta-copybook-wrap" id="tc-cd-work-archived"></div></details>` : ''}
    `;
    _drawCopybooks('tc-cd-work-cards', active);
    if (archived.length) _drawCopybooks('tc-cd-work-archived', archived);
  }

  function _drawCopybooks(containerId, rows) {
    const box = el(containerId);
    if (!box || !rows.length) return;
    const fmt = v => v ? new Date(v).toLocaleDateString('en-GB',{day:'numeric',month:'short'}) : '';
    const status = a => {
      if (a.archived) return 'archived';
      if (a.status !== 'active' || (a.expires_at && Date.parse(a.expires_at) <= Date.now())) return 'closed';
      return 'active';
    };
    box.innerHTML = rows.map((a, i) => `
      <div class="ta-copybook" data-idx="${i}">
        <div class="ta-copybook-fold"></div>
        <div class="ta-copybook-date">${fmt(a.expires_at)}</div>
        <div class="ta-copybook-page">
          <div class="ta-copybook-subject">${esc((a.subject_pack_id||'').replace(/^grade\d+-/,'').replace(/-/g,' '))}</div>
          <div class="ta-copybook-title">${esc(a.title)}</div>
          <div class="ta-copybook-meta">${esc(a.question_count)} questions · ${a.duration_mins ? '⏱ Timed' : '🔍 Practice'}<br>${esc(a.submissions ?? 0)} submitted</div>
          <div class="ta-copybook-status ${status(a)}">${status(a)}</div>
        </div>
        <div class="ta-copybook-actions">
          <button data-results="${i}">📊 Results</button>
          <button data-share="${i}" ${a.archived ? 'disabled' : ''}>🔗 Share</button>
          <button data-archive="${i}">${a.archived ? '♻️' : '📦'}</button>
        </div>
      </div>`).join('');

    box.querySelectorAll('[data-results]').forEach(b => b.onclick = e => {
      e.stopPropagation();
      const a = rows[+b.dataset.results];
      _loadResultsFor(a.id);
      showSection('results');
    });
    box.querySelectorAll('[data-share]').forEach(b => b.onclick = e => {
      e.stopPropagation();
      _shareAssignment(rows[+b.dataset.share]);
    });
    box.querySelectorAll('[data-archive]').forEach(b => b.onclick = async e => {
      e.stopPropagation();
      const a = rows[+b.dataset.archive];
      if (!confirm(a.archived ? 'Restore this assignment?' : 'Archive this assignment?')) return;
      b.disabled = true;
      try {
        await _sb.rpc('teacher_guest_archive_assignment', {p_id: a.id, p_archive: !a.archived});
        await _loadWork();
      } catch(_e) { toast('Could not update assignment.', 3000); b.disabled = false; }
    });
  }

  function _shareAssignment(a) {
    const url  = `${location.origin}/a/${encodeURIComponent(a.code)}`;
    const hint = a.access_mode === 'classroom_pin' ? 'Enter your pupil PIN.'
               : a.access_mode === 'nickname'       ? 'Enter your nickname (no PIN needed).'
               : 'Assignment PIN required.';
    const text = `${a.title}\n${a.question_count} questions\n${url}\n${hint}\nCloses: ${a.expires_at ? new Date(a.expires_at).toLocaleString() : 'Not set'}`;
    const wa = `https://wa.me/?text=${encodeURIComponent(text)}`;
    if (navigator.share) navigator.share({title: a.title, text, url}).catch(() => window.open(wa, '_blank'));
    else window.open(wa, '_blank');
  }

  function createWork() {
    close();
    if (typeof TeacherMode !== 'undefined') TeacherMode.switchTab('create');
    const sel = document.getElementById('ta-classroom');
    if (sel) { sel.value = _classId; sel.dispatchEvent(new Event('change')); }
    document.getElementById('ta-class-picker')?.querySelectorAll('[data-cid]').forEach(b => {
      b.classList.toggle('ta-class-chip-sel', b.dataset.cid === _classId);
    });
  }

  // ── Pupils ────────────────────────────────────────────────────────
  async function _loadPupils() {
    const box = el('tc-cd-pupils');
    if (!box) return;
    try {
      const { data, error } = await _sb.rpc('teacher_guest_manage', {p_action: 'roster', p_classroom: _classId});
      if (error || !data?.ok) throw new Error('roster failed');
      _pupils = data.pupils || [];
      el('tc-cd-stat-pupils').textContent = _pupils.filter(p => p.active).length;
      _renderPupils();
    } catch(_e) {
      if (box) box.innerHTML = '<p class="tc-cd-err">Could not load pupils.</p>';
    }
  }

  function _renderPupils() {
    const box = el('tc-cd-pupils');
    if (!box) return;
    const active  = _pupils.filter(p =>  p.active);
    const removed = _pupils.filter(p => !p.active);
    box.innerHTML = `
      <div class="tc-cd-section-header">
        <h3 class="tc-cd-section-title">👥 Class Register</h3>
        <div class="tc-cd-add-pupil-row">
          <input id="tc-cd-pupil-name" maxlength="40" placeholder="Pupil name…" class="tc-cd-input">
          <button class="tc-cd-action-btn" onclick="TeacherClassroomDetail.addPupil()">＋ Add</button>
        </div>
      </div>
      <p id="tc-cd-pupil-status" class="tc-cd-status-msg"></p>
      ${!active.length ? '<p class="tc-cd-empty">No pupils yet. Add a pupil above — each gets a private 4-digit PIN.</p>' : ''}
      <div class="tc-cd-register">
        ${active.map(p => `
          <div class="tc-cd-register-row" data-pi="${_pupils.indexOf(p)}">
            <span class="tc-cd-register-name">✏️ ${esc(p.name)}</span>
            <div class="tc-cd-register-actions">
              <button class="tc-cd-pill" data-action="reveal_pin"   data-pi="${_pupils.indexOf(p)}">🔑 PIN</button>
              <button class="tc-cd-pill" data-action="reset_pin"    data-pi="${_pupils.indexOf(p)}">↻ Reset</button>
              <button class="tc-cd-pill" data-action="rename_pupil" data-pi="${_pupils.indexOf(p)}">✏️ Rename</button>
              <button class="tc-cd-pill tc-cd-pill-red" data-action="toggle_pupil" data-pi="${_pupils.indexOf(p)}">Remove</button>
            </div>
          </div>`).join('')}
        ${removed.length ? `<details class="tc-cd-archived-toggle"><summary>🗑 ${removed.length} removed</summary>
          ${removed.map(p => `
            <div class="tc-cd-register-row tc-cd-register-row-dim">
              <span class="tc-cd-register-name">${esc(p.name)}</span>
              <button class="tc-cd-pill" data-action="toggle_pupil" data-pi="${_pupils.indexOf(p)}">♻️ Restore</button>
            </div>`).join('')}
        </details>` : ''}
      </div>
      <div class="tc-cd-tip">🔒 PINs are private. Share each PIN with the pupil in person — never share the full list.</div>
    `;
    box.querySelectorAll('[data-action]').forEach(b => b.onclick = () => _pupilAction(b.dataset.action, +b.dataset.pi));
    el('tc-cd-pupil-name')?.addEventListener('keydown', e => { if (e.key === 'Enter') addPupil(); });
  }

  async function _pupilAction(action, pi) {
    const p = _pupils[pi];
    if (!p) return;
    const args = {p_action: action, p_classroom: _classId, p_id: p.id};
    if (action === 'reveal_pin') {
      try {
        const {data} = await _sb.rpc('teacher_guest_manage', args);
        if (data?.pin) alert(`${p.name}'s PIN: ${data.pin}\nGive this only to the pupil.`);
      } catch(_e) { toast('Could not retrieve PIN.', 2500); }
      return;
    }
    if (action === 'reset_pin'    && !confirm(`Reset ${p.name}'s PIN? The current PIN will stop working.`)) return;
    if (action === 'toggle_pupil' && p.active && !confirm(`Remove ${p.name}? Past results are kept.`)) return;
    if (action === 'rename_pupil') {
      const name = prompt('New name:', p.name);
      if (!name?.trim()) return;
      args.p_name = name.trim();
    }
    try {
      const {data} = await _sb.rpc('teacher_guest_manage', args);
      if (data?.pin) alert(`${p.name}'s new PIN: ${data.pin}\nGive this only to the pupil.`);
      await _loadPupils();
    } catch(_e) { toast('Action failed. Please try again.', 2500); }
  }

  async function addPupil() {
    const input  = el('tc-cd-pupil-name');
    const name   = input?.value.trim();
    const status = el('tc-cd-pupil-status');
    if (!name) { if (status) status.textContent = 'Enter a pupil name first.'; return; }
    try {
      const {data, error} = await _sb.rpc('teacher_guest_manage', {p_action: 'add_pupil', p_classroom: _classId, p_name: name});
      if (error || !data?.ok) throw new Error(error?.message || 'Failed');
      if (data.pin) alert(`${name}'s PIN: ${data.pin}\nGive this only to the pupil.`);
      if (input)  input.value = '';
      if (status) status.textContent = '';
      await _loadPupils();
    } catch(e) { if (status) status.textContent = e.message; }
  }

  // ── Materials ─────────────────────────────────────────────────────
  async function _loadMaterials() {
    const box = el('tc-cd-materials');
    if (!box) return;
    try {
      const {data, error} = await _sb.from('learning_materials').select('*').order('created_at', {ascending: false});
      if (error) throw error;
      el('tc-cd-stat-materials').textContent = data?.length ?? 0;
      _renderMaterials(data || []);
    } catch(_e) {
      if (box) box.innerHTML = '<p class="tc-cd-err">Could not load materials.</p>';
    }
  }

  function _renderMaterials(files) {
    const box = el('tc-cd-materials');
    if (!box) return;
    box.innerHTML = `
      <div class="tc-cd-section-header">
        <h3 class="tc-cd-section-title">📁 Learning Materials</h3>
      </div>
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
          <input id="tc-cd-mat-file" type="file" accept="application/pdf,image/*" class="tc-cd-file-input">
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
              <p class="tc-cd-file-meta">${f.subject ? esc(f.subject) + ' · ' : ''}${_fmtSize(f.file_size)}</p>
              ${f.description ? `<p class="tc-cd-file-desc">${esc(f.description)}</p>` : ''}
            </div>
            <div class="tc-cd-file-btns">
              <button onclick="TeacherClassroomDetail.copyFileLink('${esc(f.file_path)}')" class="tc-cd-pill">🔗 Link</button>
              <button onclick="TeacherClassroomDetail.deleteFile('${esc(f.id)}','${esc(f.file_path)}')" class="tc-cd-pill tc-cd-pill-red">Delete</button>
            </div>
          </div>`).join('')}
      </div>
    `;
  }

  async function uploadMaterial() {
    const title  = el('tc-cd-mat-title')?.value.trim();
    const file   = el('tc-cd-mat-file')?.files[0];
    const status = el('tc-cd-mat-status');
    if (!title) { if (status) status.textContent = 'Enter a title.';    return; }
    if (!file)  { if (status) status.textContent = 'Choose a file.';    return; }
    if (file.size > 10 * 1024 * 1024) { if (status) status.textContent = 'File must be under 10 MB.'; return; }
    if (status) status.textContent = 'Uploading…';
    const user = (await _sb.auth.getUser()).data?.user;
    if (!user) { if (status) status.textContent = 'Not signed in.'; return; }
    const ext      = file.name.split('.').pop();
    const filePath = `${user.id}/${Date.now()}.${ext}`;
    const {error: upErr} = await _sb.storage.from('learning-materials').upload(filePath, file);
    if (upErr) { if (status) status.textContent = 'Upload failed: ' + upErr.message; return; }
    const subject = el('tc-cd-mat-subject')?.value || null;
    const desc    = el('tc-cd-mat-desc')?.value.trim() || null;
    const {error: dbErr} = await _sb.from('learning_materials').insert({
      teacher_id: user.id, title, description: desc, subject,
      file_path: filePath, file_name: file.name, file_size: file.size
    });
    if (dbErr) {
      await _sb.storage.from('learning-materials').remove([filePath]);
      if (status) status.textContent = 'Could not save: ' + dbErr.message;
      return;
    }
    if (status) status.textContent = 'Uploaded!';
    await _loadMaterials();
  }

  async function copyFileLink(filePath) {
    const {data, error} = await _sb.storage.from('learning-materials').createSignedUrl(filePath, 3600);
    if (error || !data?.signedUrl) { toast('Could not generate link.', 2000); return; }
    try { await navigator.clipboard.writeText(data.signedUrl); toast('Link copied! Valid for 1 hour.', 2500); }
    catch { prompt('Copy this link (valid 1 hour):', data.signedUrl); }
  }

  async function deleteFile(id, filePath) {
    if (!confirm('Delete this file? This cannot be undone.')) return;
    await _sb.storage.from('learning-materials').remove([filePath]);
    await _sb.from('learning_materials').delete().eq('id', id);
    await _loadMaterials();
  }

  function _fmtSize(bytes) {
    if (!bytes) return '';
    if (bytes < 1024)       return bytes + ' B';
    if (bytes < 1024*1024)  return Math.round(bytes / 1024) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  // ── Results ───────────────────────────────────────────────────────
  function _renderResults() {
    const box = el('tc-cd-results');
    if (!box || box.innerHTML.includes('tc-cd-results-wrap')) return;
    const live = _assignments.filter(a => !a.archived);
    box.innerHTML = `
      <div class="tc-cd-section-header">
        <h3 class="tc-cd-section-title">📊 Results &amp; Marks</h3>
      </div>
      <select id="tc-cd-results-sel" class="tc-cd-input" style="margin-bottom:1rem;max-width:360px">
        <option value="">Select an assignment…</option>
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
    const box = el('tc-cd-results-body');
    if (!box || !assignId) { if (box) box.innerHTML = ''; return; }
    box.innerHTML = '<p class="tc-cd-loading">Loading results…</p>';
    try {
      const {data, error} = await _sb.rpc('teacher_guest_results', {p_assignment_id: assignId});
      if (error || !data?.ok) throw new Error();
      const rows      = data.submissions || [];
      const submitted = rows.filter(r =>  r.submitted_at);
      const pending   = rows.filter(r => !r.submitted_at);
      el('tc-cd-stat-results').textContent = submitted.length;
      box.innerHTML = `
        <p class="tc-cd-results-summary">${submitted.length} submitted · ${pending.length} not started</p>
        <div class="tc-cd-grade-book">
          <div class="tc-cd-grade-header"><span>Pupil</span><span>Score</span><span>%</span><span>Submitted</span></div>
          ${submitted.sort((a, b) => Number(b.pct) - Number(a.pct)).map(r => `
            <div class="tc-cd-grade-row">
              <span>${esc(r.name)}</span>
              <span>${esc(r.score)}/${esc(r.total)}</span>
              <span class="tc-cd-grade-pct ${Number(r.pct) >= 70 ? 'pass' : 'fail'}">${esc(r.pct)}%</span>
              <span class="tc-cd-grade-date">${r.submitted_at ? new Date(r.submitted_at).toLocaleDateString('en-GB') : '—'}</span>
            </div>`).join('')}
          ${pending.map(r => `
            <div class="tc-cd-grade-row tc-cd-grade-pending">
              <span>${esc(r.name)}</span><span>—</span><span>—</span><span>Not started</span>
            </div>`).join('')}
        </div>
      `;
    } catch(_e) { box.innerHTML = '<p class="tc-cd-err">Could not load results.</p>'; }
  }

  // ── Settings ──────────────────────────────────────────────────────
  function _renderSettings() {
    const box = el('tc-cd-settings');
    if (!box) return;
    const shareUrl = `${location.origin}?classroom=${encodeURIComponent(_classId)}`;
    const emojis   = ['🏫','📚','✏️','🎒','🌟','🧮','🔬','🗺️','🎨','💡'];
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
        <label class="tc-cd-settings-label">Share classroom link</label>
        <p class="tc-cd-tip-text">Students can join using this link and will need their pupil PIN.</p>
        <div class="tc-cd-upload-row">
          <input class="tc-cd-input" value="${esc(shareUrl)}" readonly style="flex:1;font-size:.8rem">
          <button class="tc-cd-action-btn" onclick="TeacherClassroomDetail.shareLink()">📱 WhatsApp</button>
        </div>
      </div>
      <div class="tc-cd-settings-card">
        <label class="tc-cd-settings-label">Pupil PINs</label>
        <p class="tc-cd-tip-text">Each pupil has their own private 4-digit PIN — manage them in the Pupils tab.</p>
      </div>
      <div class="tc-cd-settings-card tc-cd-danger-zone">
        <label class="tc-cd-settings-label">⚠️ Danger zone</label>
        <div class="tc-cd-upload-row">
          <button class="tc-cd-pill tc-cd-pill-orange" onclick="TeacherClassroomDetail.archiveClass()">📦 Archive classroom</button>
        </div>
        <p class="tc-cd-tip-text">Archive hides the classroom but keeps all data and results.</p>
      </div>
    `;
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
  }

  async function archiveClass() {
    if (!confirm('Archive this classroom? It will be hidden but all data is kept.')) return;
    try {
      await _sb.rpc('teacher_guest_manage', {p_action: 'toggle_class', p_classroom: _classId});
      toast('Classroom archived.', 2000);
      close();
      if (typeof TeacherGuestClasses !== 'undefined') TeacherGuestClasses.refresh();
    } catch(_e) { toast('Could not archive.', 2000); }
  }

  function shareLink() {
    const url  = `${location.origin}?classroom=${encodeURIComponent(_classId)}`;
    const text = `Join my classroom "${_className}" on PSAC Practice!\n${url}\nYou will need your pupil PIN.`;
    const wa   = `https://wa.me/?text=${encodeURIComponent(text)}`;
    if (navigator.share) navigator.share({title: _className, text, url}).catch(() => window.open(wa, '_blank'));
    else window.open(wa, '_blank');
  }

  return {
    open, close, showSection,
    createWork, addPupil,
    uploadMaterial, copyFileLink, deleteFile,
    saveName, setEmoji, archiveClass, shareLink
  };
})();
