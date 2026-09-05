'use strict';
const TeacherGuestClasses = (() => {
  const el = id => document.getElementById(id);
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let classes = [], current = '', epoch = 0, identity = null;

  async function call(action, extra) {
    const { data, error } = await _sb.rpc('teacher_guest_manage', Object.assign({ p_action: action }, extra || {}));
    if (error || !data?.ok) throw new Error(error?.message || 'Action failed');
    return data;
  }

  function notice(text) {
    const el2 = el('tc-status');
    if (el2) el2.textContent = text;
  }

  function reset() {
    epoch++; classes = []; current = '';
    ['tc-list','tc-roster','tc-workspace','ta-classroom'].forEach(id => el(id)?.replaceChildren());
    notice('');
  }

  async function refresh() {
    const token = ++epoch;
    notice('Loading classrooms...');
    try {
      const session = await _sb.auth.getSession();
      if (token !== epoch) return;
      const uid = session.data?.session?.user?.id;
      if (!uid || !Auth.isTeacher()) throw new Error('Teacher access required');
      if (identity && identity !== uid) { current = ''; }
      identity = uid;
      const data = await call('list');
      if (token !== epoch) return;
      classes = data.classes;
      const select = el('ta-classroom'), keep = select?.value;
      if (select) {
        select.innerHTML = '<option value="">Standalone - not tied to a classroom</option>' +
          classes.filter(c => c.active).map(c =>
            '<option value="' + esc(c.id) + '">' + esc(c.name) + ' (' + c.pupils + ' pupils)</option>'
          ).join('');
        if (classes.some(c => c.active && c.id === keep)) select.value = keep;
      }
      _renderBoards();
      notice(classes.length ? '' : 'Create a classroom, then add pupils. They do not need an account.');
      if (current) await open(current);
    } catch (err) {
      if (token !== epoch) return;
      console.error('[TeacherGuestClasses.refresh]', err);
      notice('Could not load classrooms: ' + (err?.message || err));
    }
  }

  function _renderBoards() {
    const list = el('tc-list');
    if (!list) return;
    // Only show active classrooms in the main view; archived ones are hidden.
    // The teacher can archive/restore from inside the classroom's Settings tab.
    const visible = classes.filter(c => c.active);
    list.innerHTML = '<div class="tc-boards-wrap">' +
      visible.map((c) => {
        const i = classes.indexOf(c);
        return '<div class="tc-board-hanger">' +
          '<div class="tc-board-nail"></div>' +
          '<div class="tc-board-strings"><div class="tc-board-string"></div><div class="tc-board-string"></div></div>' +
          '<div class="tc-board" data-open="' + i + '" title="Open ' + esc(c.name) + '">' +
            '<div class="tc-board-inner">' +
              '<div class="tc-board-emoji">&#x1F3EB;</div>' +
              '<div class="tc-board-name">' + esc(c.name) + '</div>' +
              '<div class="tc-board-pupils">' + c.pupils + ' pupil' + (c.pupils === 1 ? '' : 's') + '</div>' +
            '</div>' +
            '<div class="tc-board-tray" onclick="event.stopPropagation()">' +
              '<button data-rename="' + i + '">rename</button>' +
              '<button data-archive="' + i + '">archive</button>' +
            '</div>' +
          '</div>' +
        '</div>';
      }).join('') +
      '<div class="tc-board-hanger">' +
        '<div class="tc-board-nail" style="opacity:.25"></div>' +
        '<div class="tc-board-strings" style="opacity:.25"><div class="tc-board-string"></div><div class="tc-board-string"></div></div>' +
        '<div class="tc-board tc-board-add" id="tc-add-board" title="Create a new classroom">' +
          '<div class="tc-board-inner"><div class="tc-board-name">+ new classroom</div></div>' +
        '</div>' +
      '</div>' +
    '</div>';

    list.querySelectorAll('[data-open]').forEach(b =>
      b.onclick = () => open(classes[Number(b.dataset.open)].id)
    );
    list.querySelectorAll('[data-rename]').forEach(b =>
      b.onclick = () => renameClass(classes[Number(b.dataset.rename)])
    );
    list.querySelectorAll('[data-archive]').forEach(b =>
      b.onclick = () => mutate('toggle_class', { p_classroom: classes[Number(b.dataset.archive)].id }, b)
    );
    const addBtn = document.getElementById('tc-add-board');
    if (addBtn) addBtn.onclick = () => NewClassroomForm.open();
  }

  async function mutate(action, extra, button) {
    const token = epoch;
    if (button) button.disabled = true;
    try {
      const data = await call(action, extra);
      if (token !== epoch) return;
      if (data.pin) alert('Private pupil PIN: ' + data.pin + '\nGive this only to the pupil, not the class group.');
      await refresh();
    } catch (e) {
      if (token === epoch) notice(e.message);
    } finally {
      if (button) button.disabled = false;
    }
  }

  function create(_button) {
    const prefill = document.getElementById('tc-name')?.value.trim() || '';
    NewClassroomForm.open(prefill);
  }

  function renameClass(c) {
    const name = prompt('Classroom name:', c.name);
    if (name && name.trim()) mutate('rename_class', { p_classroom: c.id, p_name: name.trim() });
  }

  async function open(id) {
    current = id;
    const c = classes.find(function(cl) { return cl.id === id; });
    const name = (c && c.name) ? c.name : 'Classroom';
    if (typeof TeacherClassroomDetail !== 'undefined') {
      TeacherClassroomDetail.open(id, name);
    }
  }

  function accessChanged() {
    const modeEl = el('ta-access');
    if (!modeEl) return;
    const mode = modeEl.value;
    const classWrap = el('ta-classroom-wrap');
    const pinWrap   = el('ta-legacy-pin-wrap');
    const help      = el('ta-access-help');
    if (classWrap) classWrap.hidden = mode === 'legacy';
    if (pinWrap)   pinWrap.hidden   = mode !== 'legacy';
    if (help) {
      help.classList.remove('hidden');
      help.textContent = mode === 'classroom_pin'
        ? 'One link for the class. Each pupil enters their own 4-digit PIN.'
        : mode === 'nickname'
        ? 'Anyone with the link can enter a nickname. No class leaderboard.'
        : 'Existing style: pupils enter a name and a shared assignment PIN.';
    }
  }

  function createAssignment(id) {
    const c = classes.find(function(cl) { return cl.id === id; });
    if (!c || !c.active) { notice('Restore this classroom before creating homework.'); return; }
    if (typeof TeacherMode !== 'undefined') TeacherMode.switchTab('create');
    const sel = el('ta-classroom');
    if (sel) sel.value = id;
    const acc = el('ta-access');
    if (acc) acc.value = Number(c.pupils) > 0 ? 'classroom_pin' : 'nickname';
    accessChanged();
    const label = el('ta-label');
    if (label) label.focus();
  }

  function getClasses() { return classes; }

  function clearCurrent() { current = ''; }

  if (typeof _sb !== 'undefined' && _sb) {
    _sb.auth.onAuthStateChange(function(event, session) {
      if (event === 'SIGNED_OUT' || (identity && identity !== (session && session.user && session.user.id))) reset();
      identity = session && session.user ? session.user.id : null;
    });
  }

  return { refresh, create, accessChanged, reset, createAssignment, getClasses, clearCurrent };
})();

// ── New Classroom Form ─────────────────────────────────────────────────────
const NewClassroomForm = (() => {
  const _esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let _sharedPin = '';

  function _generatePin() {
    return String(Math.floor(1000 + Math.random() * 9000));
  }

  function open(prefillName) {
    _sharedPin = _generatePin();
    let overlay = document.getElementById('ncf-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'ncf-overlay';
      overlay.className = 'ncf-overlay';
      document.body.appendChild(overlay);
      overlay.addEventListener('click', e => { if (e.target === overlay) _hide(); });
    }
    overlay.innerHTML = `
      <div class="ncf-panel" role="dialog" aria-modal="true" aria-label="New classroom">
        <div class="ncf-header">
          <h3>New Classroom</h3>
          <button class="ncf-close" onclick="NewClassroomForm._hide()" aria-label="Close">&#x2715;</button>
        </div>
        <div class="ncf-field">
          <label for="ncf-name">Classroom name</label>
          <input id="ncf-name" type="text" placeholder="e.g. Grade 5 Blue" maxlength="60" class="ncf-input" autocomplete="off" />
        </div>
        <div class="ncf-field" id="ncf-count-wrap">
          <label for="ncf-count">Expected number of students</label>
          <input id="ncf-count" type="number" min="1" max="200" value="25" class="ncf-input ncf-input-sm" />
          <span class="ncf-count-note">Student slots will be auto-created</span>
        </div>
        <div class="ncf-field">
          <label>Access type</label>
          <div class="ncf-toggle-group">
            <label class="ncf-toggle-opt" id="ncf-opt-per">
              <input type="radio" name="ncf-access" value="per_student" checked onchange="NewClassroomForm._onAccessChange('per_student')" />
              <span>&#x1F511; Individual PINs</span>
              <small>Each student gets their own 4-digit PIN</small>
            </label>
            <label class="ncf-toggle-opt" id="ncf-opt-shared">
              <input type="radio" name="ncf-access" value="shared" onchange="NewClassroomForm._onAccessChange('shared')" />
              <span>&#x1F6AA; Shared PIN</span>
              <small>One PIN for the whole class</small>
            </label>
          </div>
        </div>
        <div class="ncf-warning" id="ncf-warn-per">
          &#x1F4CB; You will need to share each student's PIN individually. After creating the classroom, all PINs appear in the student list so you can print or share them easily.
        </div>
        <div class="ncf-pin-preview hidden" id="ncf-shared-pin-wrap">
          <label>Class PIN &mdash; write this on the board or share with the class</label>
          <div class="ncf-big-pin" id="ncf-shared-pin">${_esc(_sharedPin)}</div>
          <button class="ncf-btn-ghost" type="button" onclick="NewClassroomForm._refreshPin()">&#x1F504; New PIN</button>
        </div>
        <div class="ncf-actions">
          <button class="ncf-btn-cancel" type="button" onclick="NewClassroomForm._hide()">Cancel</button>
          <button class="ncf-btn-create" type="button" id="ncf-submit" onclick="NewClassroomForm._submit()">Create classroom &#x2192;</button>
        </div>
        <p class="ncf-err hidden" id="ncf-err"></p>
      </div>`;
    overlay.classList.remove('hidden');
    const nameInput = document.getElementById('ncf-name');
    if (nameInput && prefillName) {
      nameInput.value = prefillName;
      // Move cursor to end so teacher can continue editing
      nameInput.setSelectionRange(prefillName.length, prefillName.length);
    }
    setTimeout(() => nameInput?.focus(), 80);
    nameInput?.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); _submit(); }
    });
  }

  function _hide() {
    const overlay = document.getElementById('ncf-overlay');
    if (overlay) overlay.classList.add('hidden');
  }

  function _onAccessChange(type) {
    const warnPer   = document.getElementById('ncf-warn-per');
    const pinWrap   = document.getElementById('ncf-shared-pin-wrap');
    const countWrap = document.getElementById('ncf-count-wrap');
    if (type === 'shared') {
      if (warnPer)   warnPer.classList.add('hidden');
      if (pinWrap)   pinWrap.classList.remove('hidden');
      if (countWrap) countWrap.classList.add('hidden');
    } else {
      if (warnPer)   warnPer.classList.remove('hidden');
      if (pinWrap)   pinWrap.classList.add('hidden');
      if (countWrap) countWrap.classList.remove('hidden');
    }
  }

  function _refreshPin() {
    _sharedPin = _generatePin();
    const el = document.getElementById('ncf-shared-pin');
    if (el) el.textContent = _sharedPin;
  }

  function _setErr(msg) {
    const el = document.getElementById('ncf-err');
    if (!el) return;
    el.textContent = msg || '';
    el.classList.toggle('hidden', !msg);
  }

  async function _submit() {
    const name = document.getElementById('ncf-name')?.value.trim();
    if (!name) { _setErr('Enter a classroom name.'); document.getElementById('ncf-name')?.focus(); return; }
    const accessEl = document.querySelector('[name="ncf-access"]:checked');
    const accessType = accessEl?.value || 'per_student';
    const expectedStudents = accessType === 'per_student'
      ? Math.max(1, Math.min(200, parseInt(document.getElementById('ncf-count')?.value || '25', 10) || 25))
      : 0;
    const btn = document.getElementById('ncf-submit');
    if (btn) { btn.disabled = true; btn.textContent = 'Creating…'; }
    _setErr('');
    try {
      let data, error;
      // Try the extended RPC first (requires supabase-classroom-pins.sql to be applied).
      // If Postgres rejects the extra params (function overload not found), fall back
      // to the original create_class call so the name is never silently dropped.
      ({ data, error } = await _sb.rpc('teacher_guest_manage', {
        p_action: 'create_class',
        p_name: name,
        p_access_type: accessType,
        p_expected_students: expectedStudents,
      }));
      if (error && (error.code === 'PGRST202' || error.message?.includes('Could not find the function'))) {
        // Fallback: old function signature (no access_type / expected_students params)
        ({ data, error } = await _sb.rpc('teacher_guest_manage', {
          p_action: 'create_class',
          p_name: name,
        }));
      }
      if (error || !data?.ok) throw new Error(error?.message || 'Could not create classroom.');
      _hide();
      // Clear the quick-name field on the main board so it does not linger
      const quickName = document.getElementById('tc-name');
      if (quickName) quickName.value = '';
      if (typeof TeacherGuestClasses !== 'undefined') await TeacherGuestClasses.refresh();
    } catch (e) {
      const msg = e.message || 'Something went wrong. Please try again.';
      _setErr(msg);
      if (typeof toast === 'function') toast('❌ ' + msg, 4000);
      if (btn) { btn.disabled = false; btn.textContent = 'Create classroom →'; }
    }
  }

  return { open, _hide, _onAccessChange, _refreshPin, _submit };
})();
window.NewClassroomForm = NewClassroomForm;
