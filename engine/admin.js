'use strict';
// ══════════════════════════════════════════════
//  Admin Panel — Superuser dashboard
//  Only visible when profile.role === 'admin'
// ══════════════════════════════════════════════

const AdminPanel = (() => {
  let _members    = [];   // cached profiles list
  let _settings   = null; // global_settings from mm_data

  const ROLE_LABELS = { parent: '👨‍👩‍👧 Parent', teacher: '👩‍🏫 Teacher', admin: '🛡️ Admin' };
  const ROLE_COLORS = {
    parent:  'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
    teacher: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
    admin:   'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
  };

  // ── Entry point called by auth.js ───────────
  async function render() {
    showTab('members');
    await Promise.all([loadMembers(), loadSettings()]);
    _renderContent();
    await loadStats();
  }

  // ── Tab switching ───────────────────────────
  function showTab(name) {
    document.querySelectorAll('.admin-tab-panel').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.admin-tab').forEach(b => {
      const on = b.dataset.tab === name;
      b.classList.toggle('bg-white',            on);
      b.classList.toggle('dark:bg-gray-600',    on);
      b.classList.toggle('shadow',              on);
      b.classList.toggle('text-gray-800',       on);
      b.classList.toggle('dark:text-white',     on);
      b.classList.toggle('text-gray-500',       !on);
      b.classList.toggle('dark:text-gray-400',  !on);
    });
    const panel = document.getElementById(`admin-tab-${name}`);
    if (panel) panel.classList.remove('hidden');
  }

  // ── Members ────────────────────────────────
  async function loadMembers() {
    if (!_sb) return;
    const el = document.getElementById('admin-members-list');
    if (el) el.innerHTML = '<p class="text-sm text-gray-400 dark:text-gray-500 text-center py-6 animate-pulse">Loading members…</p>';
    const { data, error } = await _sb.from('profiles').select('*').order('full_name');
    if (error) {
      if (el) el.innerHTML = '<p class="text-sm text-red-400 text-center py-6">Failed to load members.</p>';
      return;
    }
    _members = data || [];
    _renderMembers(_members);
  }

  function filterMembers(query) {
    const q = query.toLowerCase();
    const filtered = q
      ? _members.filter(m => (m.full_name || '').toLowerCase().includes(q) || (m.id || '').toLowerCase().includes(q))
      : _members;
    _renderMembers(filtered);
  }

  // children cached by parent profile id
  let _familyStudents = {}; // { profileId: [students] }

  function _renderMembers(list) {
    const el = document.getElementById('admin-members-list');
    if (!el) return;
    if (!list.length) {
      el.innerHTML = '<p class="text-sm text-gray-400 dark:text-gray-500 text-center py-6">No members found.</p>';
      return;
    }
    el.innerHTML = list.map(m => `
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
        <div class="flex flex-wrap items-center gap-3">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-gray-800 dark:text-white truncate">${_esc(m.full_name || 'Unnamed')}</p>
            <p class="text-xs text-gray-400 dark:text-gray-500 font-mono truncate">${m.id}</p>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-xs font-semibold px-2 py-0.5 rounded-full ${ROLE_COLORS[m.role] || ''}">
              ${ROLE_LABELS[m.role] || m.role}
            </span>
            ${m.disabled ? '<span class="text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-semibold">🚫 Disabled</span>' : ''}
          </div>
          <div class="flex gap-2 flex-wrap w-full sm:w-auto">
            <select onchange="AdminPanel.changeRole('${m.id}', this.value)"
              class="text-xs border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-400">
              <option value="parent"  ${m.role==='parent'  ? 'selected':''}>👨‍👩‍👧 Parent</option>
              <option value="teacher" ${m.role==='teacher' ? 'selected':''}>👩‍🏫 Teacher</option>
              <option value="admin"   ${m.role==='admin'   ? 'selected':''}>🛡️ Admin</option>
            </select>
            <button onclick="AdminPanel.toggleDisable('${m.id}', ${!m.disabled})"
              class="text-xs px-3 py-1 rounded-lg font-semibold transition-colors ${m.disabled
                ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 hover:bg-green-200'
                : 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-200'}">
              ${m.disabled ? '✅ Enable' : '🚫 Disable'}
            </button>
            ${m.role === 'parent' || m.role === 'admin' ? `
            <button onclick="AdminPanel.toggleChildren('${m.id}')"
              id="btn-children-${m.id}"
              class="text-xs px-3 py-1 rounded-lg font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 transition-colors">
              👶 Children
            </button>` : ''}
          </div>
        </div>
        <div id="children-panel-${m.id}" class="hidden mt-3 pl-2 border-l-2 border-indigo-200 dark:border-indigo-700">
          <p class="text-xs text-gray-400 animate-pulse">Loading children…</p>
        </div>
      </div>`).join('');
  }

  async function toggleChildren(profileId) {
    const panel = document.getElementById(`children-panel-${profileId}`);
    if (!panel) return;
    if (!panel.classList.contains('hidden')) {
      panel.classList.add('hidden');
      return;
    }
    panel.classList.remove('hidden');
    if (_familyStudents[profileId]) { _renderChildren(profileId); return; }

    // Load family → students
    const { data: fam } = await _sb.from('families').select('id').eq('owner_id', profileId).maybeSingle();
    if (!fam) { panel.innerHTML = '<p class="text-xs text-gray-400">No family found.</p>'; return; }
    const { data: kids } = await _sb.from('students').select('id, name, username, grade, created_at').eq('family_id', fam.id);
    _familyStudents[profileId] = kids || [];
    _renderChildren(profileId);
  }

  function _renderChildren(profileId) {
    const panel = document.getElementById(`children-panel-${profileId}`);
    if (!panel) return;
    const kids = _familyStudents[profileId] || [];
    if (!kids.length) { panel.innerHTML = '<p class="text-xs text-gray-400 py-1">No children registered yet.</p>'; return; }
    panel.innerHTML = kids.map(k => `
      <div class="flex items-center gap-2 py-1 text-xs text-gray-600 dark:text-gray-300">
        <span class="text-base">🧒</span>
        <span class="font-medium">${_esc(k.name)}</span>
        <span class="text-gray-400">@${_esc(k.username)}</span>
        <span class="ml-auto text-gray-400">Grade ${k.grade || '?'}</span>
      </div>`).join('');
  }

  async function changeRole(userId, newRole) {
    if (!newRole || !_sb) return;
    const current = _members.find(m => m.id === userId);
    if (current?.role === newRole) return; // no change
    if (!confirm(`Change role to "${newRole}"?`)) return;
    const { error } = await _sb.from('profiles').update({ role: newRole }).eq('id', userId);
    if (error) { alert('Error: ' + error.message); return; }
    toast(`Role updated to ${newRole}`, 3000);
    await loadMembers();
  }

  async function toggleDisable(userId, disable) {
    if (!_sb) return;
    const { error } = await _sb.from('profiles').update({ disabled: disable }).eq('id', userId);
    if (error) { alert('Error: ' + error.message); return; }
    toast(disable ? 'Account disabled' : 'Account enabled', 3000);
    await loadMembers();
  }

  // ── Global Settings (Content tab) ──────────
  async function loadSettings() {
    if (!_sb) return;
    const { data } = await _sb.from('mm_data').select('value').eq('key', 'global_settings').maybeSingle();
    _settings = data?.value || { disabled_grades: [], disabled_subjects: [], disabled_chapters: [], registration_open: true };
  }

  async function _saveSettings() {
    if (!_sb) return;
    await _sb.from('mm_data').upsert({ key: 'global_settings', value: _settings, updated_at: new Date().toISOString() });
  }

  function _renderContent() {
    if (!_settings) return;

    // Grades
    const gradesEl = document.getElementById('admin-grades-list');
    if (gradesEl && typeof SUBJECT_PACKS !== 'undefined') {
      const grades = [...new Set(SUBJECT_PACKS.map(p => p.grade))].sort();
      gradesEl.innerHTML = grades.map(g => {
        const off = _settings.disabled_grades.includes(g);
        return `<label class="flex items-center justify-between cursor-pointer py-1">
          <span class="text-sm text-gray-700 dark:text-gray-300">Grade ${g}</span>
          <input type="checkbox" ${off ? '' : 'checked'} onchange="AdminPanel.toggleGrade(${g}, !this.checked)"
            class="w-4 h-4 accent-indigo-600">
        </label>`;
      }).join('');
    }

    // Subjects
    const subjEl = document.getElementById('admin-subjects-list');
    if (subjEl && typeof SUBJECT_PACKS !== 'undefined') {
      subjEl.innerHTML = SUBJECT_PACKS.map(p => {
        const off = _settings.disabled_subjects.includes(p.id);
        return `<label class="flex items-center justify-between cursor-pointer py-1">
          <span class="text-sm text-gray-700 dark:text-gray-300">${p.label} (Grade ${p.grade})</span>
          <input type="checkbox" ${off ? '' : 'checked'} onchange="AdminPanel.toggleSubject('${p.id}', !this.checked)"
            class="w-4 h-4 accent-indigo-600">
        </label>`;
      }).join('');
    }

    // Registration toggle
    const regToggle = document.getElementById('admin-reg-toggle');
    if (regToggle) regToggle.checked = !!_settings.registration_open;
    _styleToggle(regToggle);
  }

  function _styleToggle(cb) {
    if (!cb) return;
    const bg  = cb.parentElement.querySelector('.toggle-bg');
    const dot = cb.parentElement.querySelector('.toggle-dot');
    if (bg)  bg.classList.toggle('bg-indigo-500', cb.checked);
    if (dot) dot.style.transform = cb.checked ? 'translateX(20px)' : '';
  }

  async function toggleGrade(grade, disable) {
    if (!_settings) return;
    if (disable) { if (!_settings.disabled_grades.includes(grade)) _settings.disabled_grades.push(grade); }
    else         { _settings.disabled_grades = _settings.disabled_grades.filter(g => g !== grade); }
    await _saveSettings();
    toast(`Grade ${grade} ${disable ? 'disabled' : 'enabled'} for all students`, 3000);
  }

  async function toggleSubject(subjectId, disable) {
    if (!_settings) return;
    if (disable) { if (!_settings.disabled_subjects.includes(subjectId)) _settings.disabled_subjects.push(subjectId); }
    else         { _settings.disabled_subjects = _settings.disabled_subjects.filter(s => s !== subjectId); }
    await _saveSettings();
    toast(`Subject ${disable ? 'disabled' : 'enabled'} for all students`, 3000);
  }

  async function toggleRegistration(open) {
    if (!_settings) return;
    _settings.registration_open = open;
    await _saveSettings();
    const toggle = document.getElementById('admin-reg-toggle');
    _styleToggle(toggle);
    toast(`New registrations ${open ? 'opened' : 'closed'}`, 3000);
  }

  // ── Stats ───────────────────────────────────
  async function loadStats() {
    if (!_sb) return;
    ['stat-total-users','stat-total-students','stat-total-families','stat-total-teachers']
      .forEach(id => _set(id, '…'));
    const [pRes, sRes, fRes] = await Promise.all([
      _sb.from('profiles').select('id, role', { count: 'exact', head: false }),
      _sb.from('students').select('id', { count: 'exact', head: false }),
      _sb.from('families').select('id', { count: 'exact', head: false }),
    ]);

    const profiles = pRes.data || [];
    const teachers = profiles.filter(p => p.role === 'teacher').length;

    _set('stat-total-users',    profiles.length);
    _set('stat-total-students', sRes.data?.length ?? '—');
    _set('stat-total-families', fRes.data?.length ?? '—');
    _set('stat-total-teachers', teachers);
  }

  function _set(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function _esc(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  return { render, showTab, loadMembers, filterMembers, changeRole, toggleDisable, toggleChildren, toggleGrade, toggleSubject, toggleRegistration, loadStats };
})();
