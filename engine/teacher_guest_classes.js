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
      notice('Could not load classrooms. Check your connection.');
    }
  }

  function _renderBoards() {
    const list = el('tc-list');
    if (!list) return;
    list.innerHTML = '<div class="tc-boards-wrap">' +
      classes.map((c, i) =>
        '<div class="tc-board-hanger">' +
          '<div class="tc-board-nail"></div>' +
          '<div class="tc-board-strings"><div class="tc-board-string"></div><div class="tc-board-string"></div></div>' +
          '<div class="tc-board ' + (c.active ? '' : 'opacity-60') + '" data-open="' + i + '" title="Open ' + esc(c.name) + '">' +
            '<div class="tc-board-inner">' +
              '<div class="tc-board-emoji">' + (c.active ? '&#x1F3EB;' : '&#x1F4E6;') + '</div>' +
              '<div class="tc-board-name">' + esc(c.name) + '</div>' +
              '<div class="tc-board-pupils">' + c.pupils + ' pupil' + (c.pupils === 1 ? '' : 's') + '</div>' +
              (c.active ? '' : '<div class="tc-board-archived">archived</div>') +
            '</div>' +
            '<div class="tc-board-tray" onclick="event.stopPropagation()">' +
              '<button data-rename="' + i + '">rename</button>' +
              '<button data-archive="' + i + '">' + (c.active ? 'archive' : 'restore') + '</button>' +
            '</div>' +
          '</div>' +
        '</div>'
      ).join('') +
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
    if (addBtn) addBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('tc-name');
      if (nameInput) { nameInput.focus(); nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    });
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

  function create(button) {
    const nameEl = el('tc-name');
    const name = nameEl ? nameEl.value.trim() : '';
    if (!name) { notice('Enter a classroom name first.'); return; }
    return mutate('create_class', { p_name: name }, button);
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

  if (typeof _sb !== 'undefined' && _sb) {
    _sb.auth.onAuthStateChange(function(event, session) {
      if (event === 'SIGNED_OUT' || (identity && identity !== (session && session.user && session.user.id))) reset();
      identity = session && session.user ? session.user.id : null;
    });
  }

  return { refresh, create, accessChanged, reset, createAssignment, getClasses };
})();
