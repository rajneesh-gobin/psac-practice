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
    // Show super-admin-only tabs
    const isSA = typeof Auth !== 'undefined' && Auth.isSuperAdmin?.();
    const rolesBtn  = document.getElementById('admin-tab-roles-btn');
    const plansBtn  = document.getElementById('admin-tab-plans-btn');
    const createBtn = document.getElementById('admin-tab-create-btn');
    if (rolesBtn)  rolesBtn.classList.toggle('hidden', !isSA);
    if (plansBtn)  plansBtn.classList.toggle('hidden', !isSA);
    if (createBtn) createBtn.classList.toggle('hidden', !isSA);
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
    if (name === 'reports') loadReports();
    if (name === 'roles')   loadRoles();
    if (name === 'plans')   loadPlans();
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
          <!-- Name edit + Expiry -->
          <div class="flex flex-wrap items-center gap-2 w-full mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
            <input type="text" value="${_esc(m.full_name || '')}" placeholder="Display name…"
              onblur="AdminPanel.updateMemberName('${m.id}', this.value)"
              onkeydown="if(event.key==='Enter')this.blur()"
              title="Click to edit display name"
              class="flex-1 min-w-0 text-xs border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 bg-transparent dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-400">
            <span class="text-xs text-gray-400 shrink-0">⏳ Expires</span>
            <input type="date" value="${m.expires_at ? m.expires_at.slice(0,10) : ''}"
              onchange="AdminPanel.setExpiry('${m.id}', this.value)"
              title="Set account expiry — leave blank for no expiry"
              class="text-xs border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 bg-transparent dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-400">
            ${m.expires_at ? `<button onclick="AdminPanel.setExpiry('${m.id}','')" class="text-xs text-red-400 hover:text-red-600 shrink-0" title="Remove expiry">✕</button>` : ''}
          </div>
        </div>
        ${(m.role === 'parent' || m.role === 'admin') ? `
        <div class="flex flex-wrap items-center gap-2 w-full mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <span class="text-xs text-gray-500 dark:text-gray-400 font-semibold shrink-0">💳 Plan:</span>
          <span id="plan-label-${m.id}" class="text-xs text-gray-400">loading…</span>
          <select id="plan-sel-${m.id}" class="text-xs border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-400">
            <option value="free">Free</option>
            <option value="starter">Starter</option>
            <option value="premium">Premium</option>
          </select>
          <select id="plan-months-${m.id}" class="text-xs border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-400">
            <option value="1">1 month</option>
            <option value="3">3 months</option>
            <option value="6">6 months</option>
            <option value="12">12 months</option>
          </select>
          <button onclick="AdminPanel.assignPlan('${m.id}')"
            class="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 hover:bg-green-200 px-3 py-1 rounded-lg font-semibold transition-colors">
            ✅ Activate
          </button>
        </div>` : ''}
        <div id="children-panel-${m.id}" class="hidden mt-3 pl-2 border-l-2 border-indigo-200 dark:border-indigo-700">
          <p class="text-xs text-gray-400 animate-pulse">Loading children…</p>
        </div>
      </div>`).join('');

    // Load plan labels asynchronously for each parent/admin row
    list.filter(m => m.role === 'parent' || m.role === 'admin').forEach(async m => {
      const lbl = document.getElementById(`plan-label-${m.id}`);
      if (!lbl) return;
      const { plan_id, subscription } = await Store.getUserPlan(m.id);
      const exp = subscription?.expires_at
        ? ` (expires ${new Date(subscription.expires_at).toLocaleDateString()})`
        : '';
      lbl.textContent = plan_id + exp;
      lbl.className = `text-xs font-semibold ${plan_id === 'free' ? 'text-gray-400' : 'text-green-500'}`;
      const sel = document.getElementById(`plan-sel-${m.id}`);
      if (sel) sel.value = plan_id;
    });
  }

  async function assignPlan(userId) {
    const planId  = document.getElementById(`plan-sel-${userId}`)?.value;
    const months  = parseInt(document.getElementById(`plan-months-${userId}`)?.value || '1');
    if (!planId || !userId) return;
    const ok = await Store.activatePlan(userId, planId, months, 'Manual activation by admin');
    if (ok) {
      toast(`Plan activated: ${planId} for ${months} month(s) ✅`, 2000);
      // Refresh the label
      const lbl = document.getElementById(`plan-label-${userId}`);
      if (lbl) { const r = await Store.getUserPlan(userId); lbl.textContent = r.plan_id; }
    } else {
      toast('Could not activate plan. Check console.', 2500);
    }
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
    const { data: fam } = await _sb.from('families').select('id').eq('parent_id', profileId).maybeSingle();
    if (!fam) { panel.innerHTML = '<p class="text-xs text-gray-400">No family found.</p>'; return; }
    const { data: kids } = await _sb.from('students').select('id, display_name, username, grade, session_version, expires_at, created_at').eq('family_id', fam.id);
    _familyStudents[profileId] = kids || [];
    _renderChildren(profileId);
  }

  function _renderChildren(profileId) {
    const panel = document.getElementById(`children-panel-${profileId}`);
    if (!panel) return;
    const kids = _familyStudents[profileId] || [];
    if (!kids.length) { panel.innerHTML = '<p class="text-xs text-gray-400 py-1">No children registered yet.</p>'; return; }
    panel.innerHTML = kids.map(k => `
      <div class="py-1.5 text-xs text-gray-600 dark:text-gray-300">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-base">🧒</span>
          <span class="font-medium">${_esc(k.display_name)}</span>
          <span class="text-gray-400">@${_esc(k.username)}</span>
          <span class="text-gray-400">Grade ${k.grade || '?'}</span>
          ${k.expires_at ? `<span class="text-orange-500 font-semibold">⏳ ${new Date(k.expires_at) < new Date() ? 'Expired' : 'Expires'} ${k.expires_at.slice(0,10)}</span>` : ''}
          <button onclick="AdminPanel.forceLogout('${k.id}','${_esc(k.display_name)}')"
            class="ml-auto shrink-0 px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 hover:bg-orange-200 transition-colors font-semibold">
            ⏏ Force Logout
          </button>
        </div>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-gray-400 shrink-0">⏳ Expires:</span>
          <input type="date" value="${k.expires_at ? k.expires_at.slice(0,10) : ''}"
            onchange="AdminPanel.setStudentExpiry('${k.id}','${_esc(k.display_name)}',this.value)"
            class="border border-gray-200 dark:border-gray-600 rounded px-1.5 py-0.5 bg-transparent dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-400 text-xs">
          ${k.expires_at ? `<button onclick="AdminPanel.setStudentExpiry('${k.id}','${_esc(k.display_name)}','')" class="text-red-400 hover:text-red-600" title="Remove expiry">✕</button>` : ''}
        </div>
      </div>`).join('<hr class="border-gray-100 dark:border-gray-700 my-0.5">');
  }

  async function updateMemberName(userId, newName) {
    if (!_sb || !newName?.trim()) return;
    const trimmed = newName.trim();
    const current = _members.find(m => m.id === userId);
    if (current?.full_name === trimmed) return;
    const { error } = await _sb.from('profiles').update({ full_name: trimmed }).eq('id', userId);
    if (error) { alert('Error: ' + error.message); return; }
    if (current) current.full_name = trimmed;
    toast(`Name updated to "${trimmed}"`, 2500);
  }

  async function setExpiry(userId, dateStr) {
    if (!_sb) return;
    const val = dateStr ? new Date(dateStr).toISOString() : null;
    const { error } = await _sb.from('profiles').update({ expires_at: val }).eq('id', userId);
    if (error) { alert('Error: ' + error.message); return; }
    toast(val ? `Account expires ${dateStr}` : 'Expiry removed', 2500);
    await loadMembers();
  }

  async function setStudentExpiry(studentId, studentName, dateStr) {
    if (!_sb) return;
    const val = dateStr ? new Date(dateStr).toISOString() : null;
    const { error } = await _sb.from('students').update({ expires_at: val }).eq('id', studentId);
    if (error) { alert('Error: ' + error.message); return; }
    toast(val ? `${studentName} expires ${dateStr}` : `Expiry removed for ${studentName}`, 2500);
    // Refresh local cache
    Object.keys(_familyStudents).forEach(k => {
      const s = (_familyStudents[k] || []).find(x => x.id === studentId);
      if (s) s.expires_at = val;
    });
    // Re-render the open panel
    Object.keys(_familyStudents).forEach(k => {
      const panel = document.getElementById(`children-panel-${k}`);
      if (panel && !panel.classList.contains('hidden')) _renderChildren(k);
    });
  }

  async function forceLogout(studentId, studentName) {
    if (!_sb) return;
    if (!confirm(`Force logout ${studentName}?\n\nThey will be logged out immediately and must re-enter their PIN.`)) return;
    const { data: cur } = await _sb.from('students').select('session_version').eq('id', studentId).maybeSingle();
    const newVersion = (cur?.session_version || 0) + 1;
    const { error } = await _sb.from('students').update({ session_version: newVersion }).eq('id', studentId);
    if (error) { alert('Error: ' + error.message); return; }
    // Update local cache
    for (const key of Object.keys(_familyStudents)) {
      const idx = (_familyStudents[key] || []).findIndex(s => s.id === studentId);
      if (idx >= 0) _familyStudents[key][idx].session_version = newVersion;
    }
    toast(`${studentName} has been logged out`, 3000);
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

    const grades = typeof SUBJECT_PACKS !== 'undefined'
      ? [...new Set(SUBJECT_PACKS.map(p => p.grade))].sort()
      : [];

    // Grades
    const gradesEl = document.getElementById('admin-grades-list');
    if (gradesEl) {
      gradesEl.innerHTML = grades.map(g => {
        const off = _settings.disabled_grades.includes(g);
        return `<label class="flex items-center justify-between cursor-pointer py-2">
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Grade ${g}</span>
            ${off ? '<span class="text-xs bg-red-100 dark:bg-red-900/40 text-red-500 px-2 py-0.5 rounded-full">Disabled</span>' : ''}
          </div>
          <input type="checkbox" ${off ? '' : 'checked'} onchange="AdminPanel.toggleGrade(${g}, !this.checked)"
            class="w-4 h-4 accent-indigo-600">
        </label>`;
      }).join('');
    }

    // Subjects grouped by grade
    const subjEl = document.getElementById('admin-subjects-list');
    if (subjEl && typeof SUBJECT_PACKS !== 'undefined') {
      subjEl.innerHTML = grades.map((g, gi) => {
        const packs = SUBJECT_PACKS.filter(p => p.grade === g);
        const gradeOff = _settings.disabled_grades.includes(g);
        return `<div class="${gi > 0 ? 'mt-5 pt-5 border-t border-gray-100 dark:border-gray-700' : ''}">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Grade ${g}</span>
            ${gradeOff ? '<span class="text-xs bg-red-100 dark:bg-red-900/40 text-red-500 px-2 py-0.5 rounded-full">Grade disabled</span>' : ''}
          </div>
          <div class="space-y-0.5 pl-3 border-l-2 border-indigo-100 dark:border-indigo-900/50">
            ${packs.map(p => {
              const off = _settings.disabled_subjects.includes(p.id);
              return `<label class="flex items-center justify-between cursor-pointer py-1.5 ${gradeOff ? 'opacity-40 pointer-events-none' : ''}">
                <span class="text-sm text-gray-700 dark:text-gray-300">${p.icon || ''} ${p.name}</span>
                <input type="checkbox" ${off ? '' : 'checked'} onchange="AdminPanel.toggleSubject('${p.id}', !this.checked)"
                  class="w-4 h-4 accent-indigo-600" ${gradeOff ? 'disabled' : ''}>
              </label>`;
            }).join('')}
          </div>
        </div>`;
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
      _sb.from('profiles').select('id, role', { count: 'exact', head: false }), // needs role data for teacher filter
      _sb.from('students').select('id', { count: 'exact', head: true }),
      _sb.from('families').select('id', { count: 'exact', head: true }),
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

  // ── Roles tab (super admin only) ───────────────
  async function loadRoles() {
    if (!_sb || !(typeof Auth !== 'undefined' && Auth.isSuperAdmin?.())) return;
    const listEl = document.getElementById('admin-roles-list');
    if (!listEl) return;
    listEl.innerHTML = '<p class="text-sm text-gray-400 text-center py-4 animate-pulse">Loading…</p>';
    const { data } = await _sb.from('profiles').select('id, full_name, role, is_super_admin').order('full_name');
    const mySelf = typeof Auth !== 'undefined' ? Auth.getParentProfile?.()?.id : null;
    listEl.innerHTML = (data || []).map(p => {
      const isSelf  = p.id === mySelf;
      const isSuper = p.is_super_admin;
      return `<div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-gray-800 dark:text-white truncate">${_esc(p.full_name || p.id)}</div>
          <div class="text-xs text-gray-400">${p.role || 'user'}${isSuper ? ' 👑 super admin' : ''}</div>
        </div>
        ${(isSelf || isSuper) ? '<span class="text-xs text-gray-400 italic">Cannot change</span>' :
          `<button onclick="AdminPanel.setRole('${p.id}','${p.role === 'admin' ? 'user' : 'admin'}')"
            class="text-xs ${p.role === 'admin' ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400' : 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400'} px-3 py-1.5 rounded-full font-semibold hover:opacity-80 transition-colors">
            ${p.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
          </button>`}
      </div>`;
    }).join('') || '<p class="text-sm text-gray-400 text-center py-4">No profiles found.</p>';
  }

  async function setRole(userId, newRole) {
    if (!_sb || !(typeof Auth !== 'undefined' && Auth.isSuperAdmin?.())) return;
    await _sb.from('profiles').update({ role: newRole }).eq('id', userId).eq('is_super_admin', false);
    loadRoles();
    toast(newRole === 'admin' ? 'User promoted to admin ✅' : 'Admin rights removed.', 2000);
  }

  // ── Plans tab (super admin only) ───────────────
  async function loadPlans() {
    if (!_sb) return;
    const listEl = document.getElementById('admin-plans-list');
    if (!listEl) return;
    listEl.innerHTML = '<p class="text-sm text-gray-400 text-center py-4 animate-pulse">Loading…</p>';
    const { data } = await _sb.from('plans').select('*').order('price_mur');
    listEl.innerHTML = (data || []).map(p => `
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow border border-gray-100 dark:border-gray-700">
        <div class="flex items-center justify-between mb-2">
          <div>
            <div class="font-bold text-gray-800 dark:text-white">${_esc(p.name)} Plan ${p.price_mur === 0 ? '— Free' : `— Rs ${p.price_mur}/mo`}</div>
            <div class="text-xs text-gray-400">Up to ${p.max_children} child${p.max_children > 1 ? 'ren' : ''}</div>
          </div>
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <span class="text-xs ${p.is_active ? 'text-green-500 font-semibold' : 'text-gray-400'}">${p.is_active ? 'Live' : 'Draft'}</span>
            <div class="relative w-9 h-5 ${p.is_active ? 'bg-green-400' : 'bg-gray-300 dark:bg-gray-600'} rounded-full shadow-inner">
              <input type="checkbox" ${p.is_active ? 'checked' : ''} onchange="AdminPanel.togglePlan('${p.id}', this.checked)" class="sr-only">
              <div class="absolute w-3 h-3 bg-white rounded-full shadow top-1 transition-transform ${p.is_active ? 'translate-x-5' : 'translate-x-1'}"></div>
            </div>
          </label>
        </div>
        <pre class="text-xs text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 overflow-x-auto">${JSON.stringify(p.features, null, 2)}</pre>
      </div>`).join('');
  }

  async function togglePlan(planId, active) {
    if (!_sb) return;
    await _sb.from('plans').update({ is_active: active }).eq('id', planId);
    loadPlans();
    toast(active ? `${planId} plan is now live!` : `${planId} plan disabled.`, 2000);
  }

  // ── Question Reports tab ───────────────────────
  async function loadReports() {
    const el = document.getElementById('admin-reports-list');
    if (el) el.innerHTML = '<p class="text-sm text-gray-400 text-center py-6 animate-pulse">Loading reports…</p>';
    const reports = await Store.loadReports();
    if (!reports.length) {
      if (el) el.innerHTML = '<p class="text-sm text-gray-400 text-center py-6">No reports yet.</p>';
      return;
    }
    if (el) el.innerHTML = reports.map(r => `
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow mb-3">
        <div class="flex justify-between items-start gap-2 mb-2">
          <span class="text-xs font-mono text-gray-400">${_esc(r.question_id || '—')}</span>
          <span class="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">${_esc(r.status || 'open')}</span>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-2 italic">"${_esc((r.question_text || '').slice(0, 120))}${(r.question_text||'').length > 120 ? '…' : ''}"</p>
        <p class="text-sm text-gray-800 dark:text-white font-semibold">${_esc(r.message || '—')}</p>
        <p class="text-xs text-gray-400 mt-1">${new Date(r.created_at).toLocaleString()}</p>
      </div>
    `).join('');
  }

  // ── Create pre-activated account (super admin only) ───────────
  function _elCA(id) { return document.getElementById(id); }

  function toggleFamilyField() {
    const role = _elCA('ca-role')?.value;
    const row  = _elCA('ca-family-row');
    if (row) row.classList.toggle('hidden', role !== 'parent');
  }

  function genPassword() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#!';
    const pwd   = Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const el    = _elCA('ca-password');
    if (el) { el.value = pwd; el.select(); }
  }

  let _lastCreated = null;

  async function createAccount() {
    const errEl  = _elCA('ca-error');
    const resEl  = _elCA('ca-result');
    const resBod = _elCA('ca-result-body');
    if (errEl)  { errEl.textContent = ''; errEl.classList.add('hidden'); }
    if (resEl)  resEl.classList.add('hidden');

    const name    = (_elCA('ca-name')?.value     || '').trim();
    const email   = (_elCA('ca-email')?.value    || '').trim();
    const pwd     = (_elCA('ca-password')?.value || '').trim();
    const role    = _elCA('ca-role')?.value    || 'parent';
    const plan    = _elCA('ca-plan')?.value    || 'free';
    const family  = (_elCA('ca-family')?.value  || '').trim();
    const note    = (_elCA('ca-note')?.value    || '').trim();

    if (!name)            { _showErrCA(errEl, 'Full name is required.'); return; }
    if (!email.includes('@')) { _showErrCA(errEl, 'Valid email is required.'); return; }
    if (pwd.length < 6)   { _showErrCA(errEl, 'Password must be at least 6 characters.'); return; }

    const btn = document.querySelector('[onclick="AdminPanel.createAccount()"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Creating…'; }

    try {
      const session = await _sb.auth.getSession();
      const jwt     = session?.data?.session?.access_token;
      if (!jwt) { _showErrCA(errEl, 'Not logged in — please refresh.'); return; }

      const res  = await fetch('/api/create-user', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
        body:    JSON.stringify({ email, password: pwd, full_name: name, role, plan_id: plan, family_name: family, note }),
      });
      const data = await res.json();

      if (!data.ok) { _showErrCA(errEl, data.error || 'Could not create account.'); return; }

      _lastCreated = { name, email, password: pwd, role, plan, family_code: data.family_code };

      if (resBod) resBod.innerHTML = [
        `Name        : ${name}`,
        `Email       : ${email}`,
        `Password    : ${pwd}`,
        `Role        : ${role}`,
        `Plan        : ${plan}`,
        data.family_code ? `Family Code : ${data.family_code}` : null,
      ].filter(Boolean).map(l => `<div>${l}</div>`).join('');

      if (resEl) resEl.classList.remove('hidden');
      toast('Account created! 🎉', 2500);

      // Reset form
      ['ca-name','ca-email','ca-password','ca-family','ca-note'].forEach(id => {
        const el = _elCA(id); if (el) el.value = '';
      });
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = '🎁 Create Account'; }
    }
  }

  function copyAccountDetails() {
    if (!_lastCreated) return;
    const text = Object.entries(_lastCreated)
      .filter(([,v]) => v)
      .map(([k,v]) => `${k}: ${v}`)
      .join('\n');
    navigator.clipboard?.writeText(text).then(() => toast('Copied! 📋', 1500));
  }

  function _showErrCA(el, msg) {
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
    const btn = document.querySelector('[onclick="AdminPanel.createAccount()"]');
    if (btn) { btn.disabled = false; btn.textContent = '🎁 Create Account'; }
  }

  return { render, showTab, loadMembers, filterMembers, changeRole, toggleDisable, toggleChildren, forceLogout, updateMemberName, setExpiry, setStudentExpiry, toggleGrade, toggleSubject, toggleRegistration, loadStats, loadReports, loadRoles, setRole, loadPlans, togglePlan, assignPlan, createAccount, genPassword, toggleFamilyField, copyAccountDetails };
})();
