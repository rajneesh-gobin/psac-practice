'use strict';
const TeacherClassroomDetail = (() => {
  const el = id => document.getElementById(id);
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  let _classId = null;
  let _className = '';
  let _pupils = [];
  let _assignments = [];
  let _physicalHomework = [];
  let _activeSection = 'work';
  let _resultsAssignId = null;
  let _accessType = 'per_student';
  let _classPin = null;
  let _pinsRevealed = false;

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

  async function open(classId, className) {
    _classId = classId;
    _className = className;
    _activeSection = 'work';
    _resultsAssignId = null;
    _pinsRevealed = false;
    _accessType = 'per_student';
    _classPin = null;
    _physicalHomework = [];

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
    if (typeof TeacherGuestClasses !== 'undefined') TeacherGuestClasses.clearCurrent();
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
      const [assignRes, phRes, modeRes] = await Promise.all([
        _sb.rpc('guest_my_assignments'),
        _sb.from('physical_homework').select('*').eq('classroom_id', _classId).order('expires_at'),
        (async () => { try { return await _sb.rpc('teacher_guest_assignment_modes'); } catch(_) { return {data: null}; } })(),
      ]);
      if (assignRes.error) throw assignRes.error;
      const modes = new Map((modeRes.data?.modes || []).map(a => [a.id, a]));
      _assignments = (assignRes.data?.assignments || [])
        .filter(a => modes.get(a.id)?.classroom_id === _classId)
        .map(a => ({...a, access_mode: modes.get(a.id)?.mode || 'legacy', archived: !!modes.get(a.id)?.archived}));
      _physicalHomework = phRes.error ? [] : (phRes.data || []);
      el('tc-cd-stat-assignments').textContent = _assignments.length + _physicalHomework.length;
      _renderWork();
    } catch(_e) {
      console.error('[classroom-detail] _loadWork failed:', _e);
      const msg = _e?.message || _e?.error_description || String(_e);
      if (box) box.innerHTML = `<p class="tc-cd-err">Could not load assignments: ${msg}</p>`;
    }
  }

  function _renderWork() {
    const box = el('tc-cd-work');
    if (!box) return;
    const active   = _assignments.filter(a => !a.archived);
    const archived = _assignments.filter(a =>  a.archived);
    const hasAnything = active.length || archived.length || _physicalHomework.length;
    box.innerHTML = `
      <div class="tc-cd-section-header">
        <h3 class="tc-cd-section-title">📋 Assignments</h3>
        <button class="tc-cd-action-btn" onclick="TeacherClassroomDetail.showHomeworkChoice()">＋ Set new homework</button>
      </div>
      ${!hasAnything ? '<p class="tc-cd-empty">No assignments yet. Click "+ Set new homework" to create one.</p>' : ''}
      <div class="ta-copybook-wrap" id="tc-cd-work-cards"></div>
      ${_physicalHomework.length ? '<div id="tc-cd-phw-list"></div>' : ''}
      ${archived.length ? `<details class="tc-cd-archived-toggle"><summary>📦 ${archived.length} archived</summary><div class="ta-copybook-wrap" id="tc-cd-work-archived"></div></details>` : ''}
    `;
    _drawCopybooks('tc-cd-work-cards', active);
    if (archived.length) _drawCopybooks('tc-cd-work-archived', archived);
    _renderPhysicalHomework();
  }

  function _renderPhysicalHomework() {
    const box = el('tc-cd-phw-list');
    if (!box || !_physicalHomework.length) return;
    const fmt = iso => iso ? new Date(iso).toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric'}) : '';
    const expired = hw => hw.expires_at && Date.parse(hw.expires_at) <= Date.now();
    box.innerHTML = _physicalHomework.map(hw => `
      <div class="tc-phw-card${expired(hw) ? ' tc-phw-expired' : ''}">
        <div class="tc-phw-badge">📄 Worksheet</div>
        <div class="tc-phw-body">
          <p class="tc-phw-title">${esc(hw.title)}</p>
          ${hw.subject ? `<p class="tc-phw-meta">${esc(hw.subject)}</p>` : ''}
          ${hw.description ? `<p class="tc-phw-desc">${esc(hw.description)}</p>` : ''}
          <p class="tc-phw-due ${expired(hw) ? 'tc-phw-due-expired' : ''}">
            ${expired(hw) ? '⏰ Expired' : '📅 Due'} ${fmt(hw.expires_at)}
          </p>
        </div>
        <div class="tc-phw-actions">
          ${hw.file_path ? `<button onclick="TeacherClassroomDetail.downloadPhysicalHW('${esc(hw.file_path)}','${esc(hw.file_name||'file')}')" class="tc-cd-pill">📥 Open</button>` : ''}
          <button onclick="TeacherClassroomDetail.deletePhysicalHW('${esc(hw.id)}','${esc(hw.file_path||'')}')" class="tc-cd-pill tc-cd-pill-red">Delete</button>
        </div>
      </div>`).join('');
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
          <button data-archive="${i}" title="${a.archived ? 'Restore' : 'Archive'}">${a.archived ? '♻️' : '🗑️'}</button>
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
    const closes = a.expires_at ? new Date(a.expires_at).toLocaleString() : 'No deadline';
    const text = `${a.title}\n${a.question_count} questions\n${url}\n${hint}\nCloses: ${closes}`;
    const wa = `https://wa.me/?text=${encodeURIComponent(text)}`;

    // Try the native share sheet first (mobile). If not available or dismissed,
    // fall back to an inline share panel — window.open() is blocked by popup
    // blockers when called inside an async catch handler.
    if (navigator.share) {
      navigator.share({ title: a.title, text, url }).catch(err => {
        // AbortError = user dismissed the share sheet intentionally — do nothing.
        if (err?.name !== 'AbortError') _showSharePanel(a.title, url, wa);
      });
      return;
    }
    _showSharePanel(a.title, url, wa);
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
          <input id="tc-share-url-input" class="tc-share-url" readonly value="${url}">
          <button id="tc-share-copy-btn" onclick="
            navigator.clipboard.writeText('${url}').then(function(){
              document.getElementById('tc-share-copy-btn').textContent='Copied!';
              setTimeout(function(){ document.getElementById('tc-share-copy-btn').textContent='Copy'; },2000);
            }).catch(function(){
              document.getElementById('tc-share-url-input').select();
            })
          " class="tc-share-copy-btn">Copy</button>
        </div>
        <a href="${wa}" target="_blank" rel="noopener" class="tc-share-wa-btn">
          <span>&#x1F4AC;</span> Share via WhatsApp
        </a>
        <p class="tc-share-hint">WhatsApp opens in a new tab with the message pre-filled.</p>
      </div>`;
    document.body.appendChild(panel);
    panel.addEventListener('click', e => { if (e.target === panel) panel.remove(); });
  }

  // ── Homework type choice ──────────────────────────────────────────
  function showHomeworkChoice() {
    document.getElementById('tc-hw-choice')?.remove();
    const overlay = document.createElement('div');
    overlay.id = 'tc-hw-choice';
    overlay.className = 'tc-hw-overlay';
    overlay.innerHTML = `
      <div class="tc-hw-choice-panel" role="dialog" aria-modal="true" aria-label="New homework">
        <div class="tc-hw-choice-header">
          <span>New homework</span>
          <button onclick="document.getElementById('tc-hw-choice').remove()" class="tc-hw-close">&#x2715;</button>
        </div>
        <div class="tc-hw-choice-cards">
          <button class="tc-hw-choice-card" onclick="TeacherClassroomDetail._chooseDigital()">
            <span class="tc-hw-card-icon">📝</span>
            <strong>Digital quiz</strong>
            <small>From the question bank — students answer on screen and results are recorded automatically</small>
          </button>
          <button class="tc-hw-choice-card" onclick="TeacherClassroomDetail._chooseWorksheet()">
            <span class="tc-hw-card-icon">📄</span>
            <strong>Upload worksheet</strong>
            <small>PDF or image — students work offline and hand it in physically</small>
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
          <button onclick="document.getElementById('tc-phw-form').remove()" class="tc-hw-close">&#x2715;</button>
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
            <label>File (optional — PDF or image, max 10 MB)</label>
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

  async function _submitPhysical() {
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
    }
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

  async function deletePhysicalHW(id, filePath) {
    if (!confirm('Delete this worksheet assignment? Students will no longer see it.')) return;
    if (filePath) await _sb.storage.from('learning-materials').remove([filePath]);
    const {error} = await _sb.from('physical_homework').delete().eq('id', id);
    if (error) { if (typeof toast === 'function') toast('Could not delete: ' + error.message, 2500); return; }
    if (typeof toast === 'function') toast('Deleted.', 1500);
    await _loadWork();
  }

  function createWork() {
    const prefs = _loadPrefs();
    const cid   = _classId;
    close();
    if (typeof TeacherMode !== 'undefined') TeacherMode.switchTab('create');
    // Set classroom selector
    const sel = document.getElementById('ta-classroom');
    if (sel) { sel.value = cid; sel.dispatchEvent(new Event('change')); }
    document.getElementById('ta-class-picker')?.querySelectorAll('[data-cid]').forEach(b => {
      b.classList.toggle('ta-class-chip-sel', b.dataset.cid === cid);
    });
    // Apply classroom defaults
    if (prefs.defaultMode) {
      const modeEl = document.querySelector(`[name="ta-access"][value="${prefs.defaultMode}"]`);
      if (modeEl) { modeEl.checked = true; modeEl.dispatchEvent(new Event('change')); }
    }
    if (prefs.defaultTime != null) {
      const timeEl = document.getElementById('ta-duration');
      if (timeEl) timeEl.value = prefs.defaultTime;
    }
  }

  // ── Pupils ────────────────────────────────────────────────────────
  async function _loadPupils() {
    const box = el('tc-cd-pupils');
    if (!box) return;
    try {
      const { data, error } = await _sb.rpc('teacher_guest_manage', {p_action: 'roster', p_classroom: _classId});
      if (error || !data?.ok) throw new Error('roster failed');
      _pupils = data.pupils || [];
      _accessType = data.access_type || 'per_student';
      _classPin = data.class_pin || null;
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

    if (_accessType === 'shared') {
      // Shared PIN classroom — show class PIN prominently, no per-student PIN list
      box.innerHTML = `
        <div class="tc-cd-section-header">
          <h3 class="tc-cd-section-title">🚪 Shared PIN Classroom</h3>
        </div>
        <div class="tc-cd-shared-pin-banner">
          <div class="tc-cd-shared-pin-label">Class PIN — share this with all your students</div>
          <div class="tc-cd-big-pin" id="tc-cd-class-pin-display">${_classPin ? esc(_classPin) : '••••'}</div>
          <p class="tc-cd-shared-pin-hint">Students enter this PIN on the homework link, then type their name. Their name is remembered on each device so they don't have to re-enter it.</p>
        </div>
        <div class="tc-cd-tip">📋 Write this PIN on the board or send it via your class group. Anyone with the PIN and the homework link can join.</div>
      `;
      return;
    }

    // Per-student mode
    box.innerHTML = `
      <div class="tc-cd-section-header">
        <h3 class="tc-cd-section-title">👥 Class Register</h3>
        <div class="tc-cd-add-pupil-row">
          <input id="tc-cd-pupil-name" maxlength="40" placeholder="Pupil name…" class="tc-cd-input">
          <button class="tc-cd-action-btn" onclick="TeacherClassroomDetail.addPupil()">＋ Add</button>
        </div>
      </div>
      <p id="tc-cd-pupil-status" class="tc-cd-status-msg"></p>
      ${active.length ? `
        <div class="tc-cd-pins-toolbar">
          <button class="tc-cd-pill tc-cd-pill-pin-toggle" id="tc-cd-reveal-all-btn" onclick="TeacherClassroomDetail.revealAllPins()">
            🔑 Show all PINs
          </button>
          <span class="tc-cd-pins-note">Tap to reveal all PINs at once</span>
        </div>` : '<p class="tc-cd-empty">No pupils yet. Add a pupil above — each gets a private 4-digit PIN.</p>'}
      <div class="tc-cd-register" id="tc-cd-register-list">
        ${active.map(p => `
          <div class="tc-cd-register-row" data-pi="${_pupils.indexOf(p)}">
            <span class="tc-cd-register-name">✏️ ${esc(p.name)}</span>
            <span class="tc-cd-student-pin-badge hidden" data-pin-badge="${_pupils.indexOf(p)}">––––</span>
            <div class="tc-cd-register-actions">
              <button class="tc-cd-pill" data-action="reset_pin"    data-pi="${_pupils.indexOf(p)}">↻ Reset PIN</button>
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
      <div class="tc-cd-tip">📋 Each student has their own unique PIN. Share it with them so they can log in to homework links.</div>
    `;
    box.querySelectorAll('[data-action]').forEach(b => b.onclick = () => _pupilAction(b.dataset.action, +b.dataset.pi));
    el('tc-cd-pupil-name')?.addEventListener('keydown', e => { if (e.key === 'Enter') addPupil(); });
    // Restore revealed state if "Show all PINs" was already clicked this session
    if (_pinsRevealed) _applyRevealedPins(active);
  }

  function _applyRevealedPins(pupils) {
    const btn = document.getElementById('tc-cd-reveal-all-btn');
    const note = btn?.parentElement?.querySelector('.tc-cd-pins-note');
    if (btn) { btn.textContent = '🙈 Hide PINs'; btn.classList.add('tc-cd-pill-active'); btn.onclick = () => _hidePins(); }
    if (note) note.textContent = 'PINs visible — tap to hide';
    pupils.forEach(p => {
      if (!p.pin) return;
      const badge = document.querySelector(`[data-pin-badge="${_pupils.indexOf(p)}"]`);
      if (badge) { badge.textContent = p.pin; badge.classList.remove('hidden'); }
    });
  }

  function _hidePins() {
    _pinsRevealed = false;
    _pupils.forEach(p => delete p.pin);
    const btn = document.getElementById('tc-cd-reveal-all-btn');
    const note = btn?.parentElement?.querySelector('.tc-cd-pins-note');
    if (btn) { btn.textContent = '🔑 Show all PINs'; btn.classList.remove('tc-cd-pill-active'); btn.onclick = () => revealAllPins(); }
    if (note) note.textContent = 'Tap to reveal all PINs at once';
    document.querySelectorAll('[data-pin-badge]').forEach(b => { b.textContent = '––––'; b.classList.add('hidden'); });
  }

  async function revealAllPins() {
    const btn = document.getElementById('tc-cd-reveal-all-btn');
    if (btn) { btn.disabled = true; btn.textContent = 'Loading…'; }
    try {
      const {data, error} = await _sb.rpc('teacher_guest_manage', {p_action: 'reveal_all_pins', p_classroom: _classId});
      if (error || !data?.ok) throw new Error('Failed');
      // Merge PINs back into _pupils array
      (data.pupils || []).forEach(rp => {
        const p = _pupils.find(p => p.id === rp.id);
        if (p) p.pin = rp.pin;
      });
      _pinsRevealed = true;
      _applyRevealedPins(_pupils.filter(p => p.active));
    } catch(_e) {
      toast('Could not retrieve PINs. Please try again.', 2500);
      if (btn) { btn.disabled = false; btn.textContent = '🔑 Show all PINs'; }
    }
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
      // Load only materials assigned to this classroom.
      // Falls back to all-materials query if classroom_materials table doesn't exist yet.
      let files = [];
      const {data, error} = await _sb
        .from('classroom_materials')
        .select('learning_materials(*)')
        .eq('classroom_id', _classId);
      if (error && (error.code === '42P01' || error.message?.includes('does not exist'))) {
        // Table not yet created — fall back to unfiltered list with a notice
        const {data: all, error: e2} = await _sb.from('learning_materials').select('*').order('created_at', {ascending: false});
        if (e2) throw e2;
        files = all || [];
      } else {
        if (error) throw error;
        files = (data || []).map(r => r.learning_materials).filter(Boolean)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }
      el('tc-cd-stat-materials').textContent = files.length;
      _renderMaterials(files);
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
              <p class="tc-cd-file-meta">${f.subject ? esc(f.subject) + ' · ' : ''}${_fmtSize(f.file_size)} · Uploaded ${_fmtDate(f.created_at)} · Link valid ${_fmtExpiry(f.link_expiry_seconds)}</p>
              ${f.description ? `<p class="tc-cd-file-desc">${esc(f.description)}</p>` : ''}
            </div>
            <div class="tc-cd-file-btns">
              <button onclick="TeacherClassroomDetail.copyFileLink('${esc(f.file_path)}',${Number(f.link_expiry_seconds)||3600})" class="tc-cd-pill">🔗 Link</button>
              <button onclick="TeacherClassroomDetail.deleteFile('${esc(f.id)}','${esc(f.file_path)}')" class="tc-cd-pill tc-cd-pill-red">Delete</button>
            </div>
          </div>`).join('')}
      </div>
    `;
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

  async function copyFileLink(filePath, expirySeconds) {
    const secs = expirySeconds || 3600;
    const {data, error} = await _sb.storage.from('learning-materials').createSignedUrl(filePath, secs);
    if (error || !data?.signedUrl) { toast('Could not generate link.', 2000); return; }
    const label = _fmtExpiry(secs);
    try { await navigator.clipboard.writeText(data.signedUrl); toast(`Link copied! Valid for ${label}.`, 2500); }
    catch { prompt(`Copy this link (valid ${label}):`, data.signedUrl); }
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
            🔐 <span><strong>Pupil PINs</strong> — each pupil enters their private 4-digit PIN</span>
          </label>
          <label class="tc-cd-radio-opt ${mode === 'nickname' ? 'tc-cd-radio-sel' : ''}">
            <input type="radio" name="tc-cd-mode" value="nickname" ${mode === 'nickname' ? 'checked' : ''}
              onchange="TeacherClassroomDetail.savePref('defaultMode','nickname')">
            📝 <span><strong>Nickname</strong> — anyone with the link can join with a chosen name</span>
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
        <p class="tc-cd-tip-text">Send this to pupils — they will need their private PIN to enter.</p>
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
  }

  async function archiveClass() {
    if (!confirm('Archive this classroom? It will be hidden but all data is kept. You can restore it from Settings.')) return;
    try {
      await _sb.rpc('teacher_guest_manage', {p_action: 'toggle_class', p_classroom: _classId});
      toast('Classroom archived.', 2000);
      close();
      if (typeof TeacherGuestClasses !== 'undefined') TeacherGuestClasses.refresh();
    } catch(_e) { toast('Could not archive.', 2000); }
  }

  async function deleteClassroom() {
    const name = _className || 'this classroom';
    if (!confirm(
      `Delete "${name}"?\n\nThe classroom and its assignments will be removed immediately from your board.\n\nAn admin can recover it for 10 days — after that everything is permanently cleared.\n\nThis cannot be undone.`
    )) return;

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
        // AbortError = user dismissed intentionally — do nothing.
        if (err?.name !== 'AbortError') _showClassroomSharePanel(url, wa);
      });
      return;
    }
    // No native share API — show inline panel instead of window.open()
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
    open, close, showSection,
    showHomeworkChoice, _chooseDigital, _chooseWorksheet,
    _onPhysicalFileChosen, _submitPhysical, downloadPhysicalHW, deletePhysicalHW,
    createWork, addPupil, revealAllPins,
    uploadMaterial, _onMatFileChosen, copyFileLink, deleteFile,
    saveName, setEmoji, archiveClass, deleteClassroom, shareLink,
    savePref, saveNotes, getPrefs
  };
})();
