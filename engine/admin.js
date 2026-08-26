'use strict';
// ══════════════════════════════════════════════
//  Admin Panel - Superuser dashboard
//  Only visible when profile.role === 'admin'
// ══════════════════════════════════════════════

const AdminPanel = (() => {
  let _members    = [];   // cached parent profiles
  let _teachers   = [];   // cached teacher profiles
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
    await Promise.all([loadMembers(), loadTeachers(), loadSettings(), loadTeacherQueue()]);
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
    if (name === 'reports')   loadReports();
    if (name === 'teachers')  loadTeachers();
    if (name === 'roles')     loadRoles();
    if (name === 'plans')     loadPlans();
    if (name === 'questions') QM.tabOpen();
  }

  // ── Teacher approval queue ─────────────────
  const _TSTATUS = {
    pending:   { label: '⏳ Pending',   cls: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' },
    approved:  { label: '✅ Approved',  cls: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' },
    rejected:  { label: '✕ Rejected',   cls: 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400' },
    suspended: { label: '🚫 Suspended', cls: 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400' },
  };

  async function loadTeacherQueue() {
    const el = document.getElementById('admin-teacher-queue');
    if (!el || !_sb) return;
    const { data, error } = await _sb.rpc('admin_teacher_requests');
    if (error || !data?.ok) {
      el.innerHTML = '';
      if (error) console.error('[AdminPanel.loadTeacherQueue]', error.message);
      return;
    }

    const rows    = data.requests || [];
    const pending = rows.filter(r => r.status === 'pending');
    const others  = rows.filter(r => r.status !== 'pending');

    if (!rows.length) { el.innerHTML = ''; return; }

    const row = r => {
      const st = _TSTATUS[r.status] || _TSTATUS.rejected;
      const when = r.requested_at ? new Date(r.requested_at).toLocaleDateString() : '';
      return `<div class="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700 mb-2">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-sm font-bold text-gray-800 dark:text-white">${_esc(r.full_name || r.id)}</span>
          <span class="text-xs font-semibold px-2 py-0.5 rounded-full ${st.cls}">${st.label}</span>
          ${r.status === 'approved'
            ? `<span class="text-xs text-gray-500 dark:text-gray-400">${_esc(r.tier)}</span>` : ''}
          <span class="text-xs text-gray-500 dark:text-gray-400 ml-auto">${when}</span>
        </div>
        ${r.note ? `<p class="text-xs text-gray-500 dark:text-gray-400 italic mt-1">"${_esc(r.note)}"</p>` : ''}
        <div class="flex gap-2 flex-wrap mt-2">
          ${r.status !== 'approved' ? `
            <button onclick="AdminPanel.setTeacherStatus('${r.id}','approved','unverified')"
              class="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-3 py-1 rounded-lg font-semibold hover:bg-green-200 transition-colors">✅ Approve</button>` : ''}
          ${r.status === 'approved' ? `
            <button onclick="AdminPanel.setTeacherStatus('${r.id}','approved','${r.tier === 'verified' ? 'unverified' : 'verified'}')"
              class="text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-lg font-semibold hover:bg-indigo-200 transition-colors">
              ${r.tier === 'verified' ? '↓ Make unverified' : '⭐ Make verified'}</button>
            <button onclick="AdminPanel.setTeacherStatus('${r.id}','suspended')"
              class="text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-3 py-1 rounded-lg font-semibold hover:bg-red-200 transition-colors">🚫 Suspend</button>` : ''}
          ${r.status === 'pending' ? `
            <button onclick="AdminPanel.setTeacherStatus('${r.id}','rejected')"
              class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 px-3 py-1 rounded-lg font-semibold hover:bg-gray-200 transition-colors">✕ Reject</button>` : ''}
        </div>
      </div>`;
    };

    el.innerHTML = `
      <div class="rounded-2xl border border-gray-200 dark:border-gray-700 p-3">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-sm font-bold text-gray-800 dark:text-white">👩‍🏫 Teacher accounts</span>
          ${pending.length
            ? `<span class="text-xs font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full">${pending.length} awaiting review</span>`
            : '<span class="text-xs text-gray-500 dark:text-gray-400">nothing pending</span>'}
          <button onclick="AdminPanel.loadTeacherQueue()" class="ml-auto text-xs text-indigo-500 hover:text-indigo-700 font-semibold">↻</button>
        </div>
        ${pending.map(row).join('')}
        ${others.length ? `<details class="mt-1"><summary class="text-xs text-gray-500 dark:text-gray-400 cursor-pointer py-1">
            ${others.length} existing teacher${others.length === 1 ? '' : 's'}</summary>
            <div class="mt-2">${others.map(row).join('')}</div></details>` : ''}
      </div>`;
  }

  async function setTeacherStatus(userId, status, tier) {
    if (!_sb) return;
    if (status === 'suspended' && !confirm('Suspend this teacher? They keep access to past results but cannot set new work.')) return;
    if (status === 'rejected'  && !confirm('Reject this application?')) return;
    const { data, error } = await _sb.rpc('admin_set_teacher_status',
      { p_user_id: userId, p_status: status, p_tier: tier || null });
    if (error || !data?.ok) {
      const why = error?.message || data?.error || 'unknown';
      console.error('[AdminPanel.setTeacherStatus]', why);
      toast('Could not update: ' + why, 3500);
      return;
    }
    toast('Teacher status: ' + status, 2000);
    await loadTeacherQueue();
    await loadMembers();
    // Keep the header badge honest after a decision.
    if (typeof Auth !== 'undefined' && Auth.refreshAdminBadge) Auth.refreshAdminBadge();
  }

  // ── Members ────────────────────────────────
  // Populated by loadMembers() before _renderMembers() runs, so the per-member
  // "Assign a plan" <select> always lists whatever is actually in the plans
  // table - it used to be three hardcoded <option>s (free/starter/premium)
  // that happened to match today's rows by coincidence, and would have quietly
  // gone stale the moment a plan was renamed, added, or removed from the Plans
  // tab, with no error - the dropdown would just keep offering the old names.
  let _plansForSelect = [];

  async function loadMembers() {
    if (!_sb) return;
    const el = document.getElementById('admin-members-list');
    if (el) el.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-6 animate-pulse">Loading members…</p>';
    const [profilesRes, plansRes] = await Promise.all([
      _sb.from('profiles')
        .select('id, full_name, role, disabled, expires_at, created_at, teacher_status, referral_code')
        .eq('role', 'parent')
        .order('created_at', { ascending: false }),
      _sb.from('plans').select('id, name, price_mur').order('price_mur'),
    ]);
    if (profilesRes.error) {
      if (el) el.innerHTML = '<p class="text-sm text-red-400 text-center py-6">Failed to load members.</p>';
      return;
    }
    _plansForSelect = plansRes.data || [];
    _members = profilesRes.data || [];
    _renderMembers(_members);
  }

  function filterMembers(query) {
    const q = query.toLowerCase();
    const filtered = q
      ? _members.filter(m => (m.full_name || '').toLowerCase().includes(q) || (m.id || '').toLowerCase().includes(q))
      : _members;
    _renderMembers(filtered);
  }

  function _memberStatusBadge(m) {
    if (m.disabled) return '<span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400">🔴 Disabled</span>';
    if (m.expires_at) {
      const exp = new Date(m.expires_at);
      const now = new Date();
      if (exp < now) return '<span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400">⏰ Expired</span>';
      if ((exp - now) < 7 * 24 * 3600 * 1000) return '<span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">🟡 Expires soon</span>';
    }
    return '<span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400">🟢 Active</span>';
  }

  // children cached by parent profile id
  let _familyStudents = {}; // { profileId: [students] }

  function _renderMembers(list) {
    const el = document.getElementById('admin-members-list');
    if (!el) return;
    if (!list.length) {
      el.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-6">No members found.</p>';
      return;
    }
    el.innerHTML = list.map(m => `
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
        <div class="flex flex-wrap items-center gap-3">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-gray-800 dark:text-white truncate">${_esc(m.full_name || 'Unnamed')}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 font-mono truncate">${m.id}</p>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-xs font-semibold px-2 py-0.5 rounded-full ${ROLE_COLORS[m.role] || ''}">
              ${ROLE_LABELS[m.role] || m.role}
            </span>
            ${_memberStatusBadge(m)}
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
            <span class="text-xs text-gray-500 dark:text-gray-400 shrink-0">⏳ Expires</span>
            <input type="date" value="${m.expires_at ? m.expires_at.slice(0,10) : ''}"
              onchange="AdminPanel.setExpiry('${m.id}', this.value)"
              title="Set account expiry - leave blank for no expiry"
              class="text-xs border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 bg-transparent dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-400">
            ${m.expires_at ? `<button onclick="AdminPanel.setExpiry('${m.id}','')" class="text-xs text-red-400 hover:text-red-600 shrink-0" title="Remove expiry">✕</button>` : ''}
          </div>
        </div>
        ${(m.role === 'parent' || m.role === 'admin') ? `
        <div class="flex flex-wrap items-center gap-2 w-full mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <span class="text-xs text-gray-500 dark:text-gray-400 font-semibold shrink-0">💳 Plan:</span>
          <span id="plan-label-${m.id}" class="text-xs text-gray-500 dark:text-gray-400">loading…</span>
          <select id="plan-sel-${m.id}" class="text-xs border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-400">
            ${_plansForSelect.map(p => `<option value="${_esc(p.id)}">${_esc(p.name)}${p.price_mur ? ` (Rs ${p.price_mur}/mo)` : ' (Free)'}</option>`).join('')}
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
          <button onclick="AdminPanel.showPlanHistory('${m.id}')"
            class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 px-3 py-1 rounded-lg font-semibold transition-colors">
            📋 History
          </button>
        </div>
        <div id="plan-history-${m.id}" class="hidden mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 overflow-x-auto"></div>` : ''}
        <div id="children-panel-${m.id}" class="hidden mt-3 pl-2 border-l-2 border-indigo-200 dark:border-indigo-700">
          <p class="text-xs text-gray-500 dark:text-gray-400 animate-pulse">Loading children…</p>
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
      lbl.className = `text-xs font-semibold ${plan_id === 'free' ? 'text-gray-500 dark:text-gray-400' : 'text-green-600 dark:text-green-400'}`;
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
    if (!fam) { panel.innerHTML = '<p class="text-xs text-gray-500 dark:text-gray-400">No family found.</p>'; return; }
    const { data: kids } = await _sb.from('students').select('id, display_name, username, grade, session_version, expires_at, created_at').eq('family_id', fam.id);
    _familyStudents[profileId] = kids || [];
    _renderChildren(profileId);
  }

  function _renderChildren(profileId) {
    const panel = document.getElementById(`children-panel-${profileId}`);
    if (!panel) return;
    const kids = _familyStudents[profileId] || [];
    if (!kids.length) { panel.innerHTML = '<p class="text-xs text-gray-500 dark:text-gray-400 py-1">No children registered yet.</p>'; return; }
    panel.innerHTML = kids.map(k => `
      <div class="py-1.5 text-xs text-gray-600 dark:text-gray-300">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-base">🧒</span>
          <span class="font-medium">${_esc(k.display_name)}</span>
          <span class="text-gray-500 dark:text-gray-400">@${_esc(k.username)}</span>
          <span class="text-gray-500 dark:text-gray-400">Grade ${k.grade || '?'}</span>
          ${k.expires_at ? `<span class="text-orange-500 font-semibold">⏳ ${new Date(k.expires_at) < new Date() ? 'Expired' : 'Expires'} ${k.expires_at.slice(0,10)}</span>` : ''}
          <button onclick="AdminPanel.forceLogout('${k.id}','${_esc(k.display_name)}')"
            class="ml-auto shrink-0 px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 hover:bg-orange-200 transition-colors font-semibold">
            ⏏ Force Logout
          </button>
        </div>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-gray-500 dark:text-gray-400 shrink-0">⏳ Expires:</span>
          <input type="date" value="${k.expires_at ? k.expires_at.slice(0,10) : ''}"
            onchange="AdminPanel.setStudentExpiry('${k.id}','${_esc(k.display_name)}',this.value)"
            class="border border-gray-200 dark:border-gray-600 rounded px-1.5 py-0.5 bg-transparent dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-400 text-xs">
          ${k.expires_at ? `<button onclick="AdminPanel.setStudentExpiry('${k.id}','${_esc(k.display_name)}','')" class="text-red-400 hover:text-red-600" title="Remove expiry">✕</button>` : ''}
        </div>
      </div>`).join('<hr class="border-gray-100 dark:border-gray-700 my-0.5">');
  }

  async function updateMemberName(userId, newName) {
    if (!_sb || !newName?.trim()) return;
    const trimmed    = newName.trim();
    const inMembers  = _members.find(m => m.id === userId);
    const inTeachers = _teachers.find(t => t.id === userId);
    if ((inMembers || inTeachers)?.full_name === trimmed) return;
    const { error } = await _sb.from('profiles').update({ full_name: trimmed }).eq('id', userId);
    if (error) { alert('Error: ' + error.message); return; }
    if (inMembers)  inMembers.full_name  = trimmed;
    if (inTeachers) inTeachers.full_name = trimmed;
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
    await Promise.all([loadMembers(), loadTeachers()]);
  }

  async function toggleDisable(userId, disable) {
    if (!_sb) return;
    if (disable && !confirm('Disable this account? The user will not be able to log in.')) return;
    const { error } = await _sb.from('profiles').update({ disabled: disable }).eq('id', userId);
    if (error) { toast('Error: ' + error.message, 3000); return; }
    toast(disable ? 'Account disabled' : 'Account enabled', 3000);
    const m = _members.find(x => x.id === userId);
    if (m) { m.disabled = disable; _renderMembers(_members); }
    const t = _teachers.find(x => x.id === userId);
    if (t) { t.disabled = disable; _renderTeachers(_teachers); }
  }

  // ── Global Settings (Content tab) ──────────
  async function loadSettings() {
    if (!_sb) return;
    const { data } = await _sb.from('mm_data').select('value').eq('key', 'global_settings').maybeSingle();
    _settings = data?.value || { disabled_grades: [], disabled_subjects: [], disabled_chapters: [], registration_open: true };
  }

  async function _saveSettings() {
    if (!_sb) return { ok: false, error: 'offline' };
    const { error } = await _sb.from('mm_data')
      .upsert({ key: 'global_settings', value: _settings, updated_at: new Date().toISOString() });
    if (error) { console.error('[Admin._saveSettings]', error.message); return { ok: false, error: error.message }; }
    return { ok: true };
  }

  // These switches gate what every family in the app can reach, so "disabled"
  // has to mean disabled in the database - not just in this admin's browser.
  // A refused write now rolls the in-memory copy back, repaints the control it
  // came from, and says the change did not apply.
  async function _commitSettings(prevJson, okMsg, repaint) {
    const res = await _saveSettings();
    if (!res.ok) _settings = JSON.parse(prevJson);
    if (repaint) repaint();
    toast(res.ok ? okMsg : 'Could not save — the change was NOT applied.', res.ok ? 3000 : 4000);
    return res.ok;
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
    // Plan enforcement toggle
    const enfToggle = document.getElementById('admin-enforcement-toggle');
    if (enfToggle) enfToggle.checked = !!_settings.plan_enforcement_enabled;
    _styleToggle(enfToggle);
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
    const prev = JSON.stringify(_settings);
    if (disable) { if (!_settings.disabled_grades.includes(grade)) _settings.disabled_grades.push(grade); }
    else         { _settings.disabled_grades = _settings.disabled_grades.filter(g => g !== grade); }
    await _commitSettings(prev, `Grade ${grade} ${disable ? 'disabled' : 'enabled'} for all students`, _renderContent);
  }

  async function toggleSubject(subjectId, disable) {
    if (!_settings) return;
    const prev = JSON.stringify(_settings);
    if (disable) { if (!_settings.disabled_subjects.includes(subjectId)) _settings.disabled_subjects.push(subjectId); }
    else         { _settings.disabled_subjects = _settings.disabled_subjects.filter(s => s !== subjectId); }
    await _commitSettings(prev, `Subject ${disable ? 'disabled' : 'enabled'} for all students`, _renderContent);
  }

  async function toggleRegistration(open) {
    if (!_settings) return;
    const prev = JSON.stringify(_settings);
    _settings.registration_open = open;
    await _commitSettings(prev, `New registrations ${open ? 'opened' : 'closed'}`, () => {
      const toggle = document.getElementById('admin-reg-toggle');
      if (toggle) toggle.checked = !!_settings.registration_open;
      _styleToggle(toggle);
    });
  }

  async function togglePlanEnforcement(on) {
    if (!_settings) return;
    const prev = JSON.stringify(_settings);
    _settings.plan_enforcement_enabled = on;
    await _commitSettings(prev, `Plan enforcement ${on ? 'enabled ⚡' : 'disabled'}`, () => {
      const toggle = document.getElementById('admin-enforcement-toggle');
      if (toggle) toggle.checked = !!_settings.plan_enforcement_enabled;
      _styleToggle(toggle);
    });
  }

  // ── Stats ───────────────────────────────────
  async function loadStats() {
    if (!_sb) return;
    ['stat-total-users','stat-total-students','stat-total-families','stat-total-teachers',
     'hstat-parents','hstat-students','hstat-teachers','hstat-disabled']
      .forEach(id => _set(id, '…'));
    const [pRes, sRes, fRes] = await Promise.all([
      _sb.from('profiles').select('id, role, disabled, teacher_status', { count: 'exact', head: false }),
      _sb.from('students').select('id', { count: 'exact', head: true }),
      _sb.from('families').select('id', { count: 'exact', head: true }),
    ]);

    const profiles  = pRes.data || [];
    const tList     = profiles.filter(p => p.role === 'teacher');
    const parents   = profiles.filter(p => p.role === 'parent').length;
    const disabled  = profiles.filter(p => p.disabled).length;
    const tApproved = tList.filter(t => t.teacher_status === 'approved').length;
    const tPending  = tList.filter(t => t.teacher_status === 'pending').length;

    _set('stat-total-users',    profiles.length);
    _set('stat-total-students', sRes.data?.length ?? '-');
    _set('stat-total-families', fRes.data?.length ?? '-');
    _set('stat-total-teachers', tList.length);

    _set('hstat-parents',   parents);
    _set('hstat-students',  sRes.count ?? '-');
    _set('hstat-teachers',  tPending ? `${tApproved} (+${tPending} pending)` : tApproved);
    _set('hstat-disabled',  disabled);
  }

  function _set(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  // ── Teachers tab ────────────────────────────
  async function loadTeachers() {
    if (!_sb) return;
    const el = document.getElementById('admin-teachers-list');
    if (el) el.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-6 animate-pulse">Loading teachers…</p>';
    const { data, error } = await _sb.from('profiles')
      .select('id, full_name, role, disabled, expires_at, created_at, teacher_status, teacher_tier')
      .eq('role', 'teacher')
      .order('teacher_status', { ascending: true });
    if (error) {
      if (el) el.innerHTML = '<p class="text-sm text-red-400 text-center py-6">Failed to load teachers.</p>';
      return;
    }
    _teachers = data || [];
    _renderTeachers(_teachers);
  }

  function _renderTeachers(list) {
    const el = document.getElementById('admin-teachers-list');
    if (!el) return;
    if (!list.length) {
      el.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-6">No teacher accounts found.</p>';
      return;
    }
    el.innerHTML = list.map(t => {
      const st     = _TSTATUS[t.teacher_status] || _TSTATUS.pending;
      const joined = t.created_at ? new Date(t.created_at).toLocaleDateString() : '-';
      const tier   = t.teacher_tier || 'free';
      return `
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
          <div class="flex flex-wrap items-center gap-3">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-gray-800 dark:text-white truncate">${_esc(t.full_name || 'Unnamed')}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 font-mono truncate">${t.id}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Joined ${joined}</p>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full ${st.cls}">${st.label}</span>
              ${t.disabled ? '<span class="text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-semibold">🚫 Disabled</span>' : ''}
              <span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">Tier: ${_esc(tier)}</span>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            ${t.teacher_status !== 'approved' ? `
              <button onclick="AdminPanel.teacherApprove('${t.id}')"
                class="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-3 py-1 rounded-lg font-semibold hover:bg-green-200 transition-colors">✅ Approve</button>` : ''}
            ${t.teacher_status === 'approved' ? `
              <button onclick="AdminPanel.teacherSuspend('${t.id}')"
                class="text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-3 py-1 rounded-lg font-semibold hover:bg-red-200 transition-colors">🚫 Suspend</button>` : ''}
            <select onchange="AdminPanel.teacherChangeTier('${t.id}', this.value)"
              class="text-xs border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-400">
              <option value="free"    ${tier === 'free'    ? 'selected' : ''}>Free tier</option>
              <option value="premium" ${tier === 'premium' ? 'selected' : ''}>Premium tier</option>
              <option value="school"  ${tier === 'school'  ? 'selected' : ''}>School tier</option>
            </select>
            <button onclick="AdminPanel.toggleDisable('${t.id}', ${!t.disabled})"
              class="text-xs px-3 py-1 rounded-lg font-semibold transition-colors ${t.disabled
                ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 hover:bg-green-200'
                : 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-200'}">
              ${t.disabled ? '✅ Enable' : '🚫 Disable'}
            </button>
          </div>
          <div class="flex flex-wrap items-center gap-2 w-full mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
            <input type="text" value="${_esc(t.full_name || '')}" placeholder="Display name…"
              onblur="AdminPanel.updateMemberName('${t.id}', this.value)"
              onkeydown="if(event.key==='Enter')this.blur()"
              title="Click to edit display name"
              class="flex-1 min-w-0 text-xs border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 bg-transparent dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-400">
          </div>
        </div>`;
    }).join('');
  }

  async function teacherApprove(userId) {
    if (!_sb) return;
    const { error } = await _sb.from('profiles').update({ teacher_status: 'approved' }).eq('id', userId);
    if (error) { toast('Error: ' + error.message, 3000); return; }
    toast('Teacher approved ✅', 2000);
    const t = _teachers.find(x => x.id === userId);
    if (t) { t.teacher_status = 'approved'; _renderTeachers(_teachers); }
    if (typeof Auth !== 'undefined' && Auth.refreshAdminBadge) Auth.refreshAdminBadge();
  }

  async function teacherSuspend(userId) {
    if (!_sb || !confirm('Suspend this teacher? They keep access to past results but cannot set new work.')) return;
    const { error } = await _sb.from('profiles').update({ teacher_status: 'suspended' }).eq('id', userId);
    if (error) { toast('Error: ' + error.message, 3000); return; }
    toast('Teacher suspended 🚫', 2000);
    const t = _teachers.find(x => x.id === userId);
    if (t) { t.teacher_status = 'suspended'; _renderTeachers(_teachers); }
  }

  async function teacherChangeTier(userId, tier) {
    if (!_sb || !tier) return;
    const { error } = await _sb.from('profiles').update({ teacher_tier: tier }).eq('id', userId);
    if (error) { toast('Error: ' + error.message, 3000); return; }
    toast(`Tier set to ${tier}`, 2000);
    const t = _teachers.find(x => x.id === userId);
    if (t) t.teacher_tier = tier;
  }

  function _esc(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // ── Roles tab (super admin only) ───────────────
  async function loadRoles() {
    if (!_sb || !(typeof Auth !== 'undefined' && Auth.isSuperAdmin?.())) return;
    const listEl = document.getElementById('admin-roles-list');
    if (!listEl) return;
    listEl.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-4 animate-pulse">Loading…</p>';
    const { data } = await _sb.from('profiles').select('id, full_name, role, is_super_admin').order('full_name');
    const mySelf = typeof Auth !== 'undefined' ? Auth.getParentProfile?.()?.id : null;
    listEl.innerHTML = (data || []).map(p => {
      const isSelf  = p.id === mySelf;
      const isSuper = p.is_super_admin;
      return `<div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-gray-800 dark:text-white truncate">${_esc(p.full_name || p.id)}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">${p.role || 'user'}${isSuper ? ' 👑 super admin' : ''}</div>
        </div>
        ${(isSelf || isSuper) ? '<span class="text-xs text-gray-500 dark:text-gray-400 italic">Cannot change</span>' :
          `<button onclick="AdminPanel.setRole('${p.id}','${p.role === 'admin' ? 'user' : 'admin'}')"
            class="text-xs ${p.role === 'admin' ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400' : 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400'} px-3 py-1.5 rounded-full font-semibold hover:opacity-80 transition-colors">
            ${p.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
          </button>`}
      </div>`;
    }).join('') || '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No profiles found.</p>';
  }

  // .select('id') so a row blocked by RLS - or already a super admin, which the
  // is_super_admin filter excludes - comes back as zero rows rather than a
  // silent no-op that still toasted "promoted to Admin".
  async function setRole(userId, newRole) {
    if (!_sb || !(typeof Auth !== 'undefined' && Auth.isSuperAdmin?.())) return;
    const { data, error } = await _sb.from('profiles')
      .update({ role: newRole }).eq('id', userId).eq('is_super_admin', false).select('id');
    loadRoles();
    if (error || !data?.length) {
      console.error('[Admin.setRole]', error?.message || 'no row updated');
      toast('Could not change that role — nothing was changed.', 3500);
      return;
    }
    toast(newRole === 'admin' ? 'User promoted to Admin. ✅' : 'Admin rights removed.', 2000);
  }

  // ── Plans tab (super admin only) ───────────────
  async function loadPlans() {
    if (!_sb) return;
    const listEl = document.getElementById('admin-plans-list');
    if (!listEl) return;
    listEl.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-4 animate-pulse">Loading…</p>';
    const { data } = await _sb.from('plans').select('*').order('price_mur');

    const grades = typeof SUBJECT_PACKS !== 'undefined'
      ? [...new Set(SUBJECT_PACKS.map(sp => sp.grade))].sort() : [];

    listEl.innerHTML = (data || []).map(plan => {
      const features = plan.features || {};
      const allowed  = features.allowed_chapters;
      const allSet   = new Set(Array.isArray(allowed) ? allowed : []);
      const isAll    = !Array.isArray(allowed);

      const chapPickerHtml = grades.map(g => {
        const packs = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : []).filter(sp => sp.grade === g);
        return packs.map(pack => {
          const chs = pack._chapters || pack.chapters || [];
          const allChecked = isAll || chs.every(ch => allSet.has(ch.id));
          const chBoxes = chs.map(ch => {
            const checked = isAll || allSet.has(ch.id);
            return `<label class="flex items-center gap-2 py-0.5 cursor-pointer">
              <input type="checkbox" data-plan="${plan.id}" data-ch="${_esc(ch.id)}"
                class="plan-ch-check w-3.5 h-3.5 accent-indigo-600" ${checked ? 'checked' : ''}>
              <span class="text-xs text-gray-600 dark:text-gray-300">${_esc(ch.name)}</span>
            </label>`;
          }).join('');
          return `<details class="mb-1">
            <summary class="text-xs font-semibold text-gray-700 dark:text-gray-200 cursor-pointer py-1 flex items-center gap-2">
              <label class="flex items-center gap-1 mr-1 shrink-0" onclick="event.stopPropagation()">
                <input type="checkbox" data-plan="${plan.id}" data-pack="${pack.id}"
                  class="plan-pack-all w-3.5 h-3.5 accent-indigo-600" ${allChecked ? 'checked' : ''}
                  onchange="AdminPanel.togglePackAll('${plan.id}','${pack.id}',this.checked)">
              </label>
              ${pack.icon || ''} Grade ${g} — ${_esc(pack.name)}
            </summary>
            <div class="pl-8 mt-1">${chBoxes}</div>
          </details>`;
        }).join('');
      }).join('');

      const capN = (key, label) => `<div class="flex items-center gap-2 mb-2">
        <span class="text-xs text-gray-500 dark:text-gray-400 w-36 shrink-0">${label}</span>
        <input type="number" min="0" value="${features[key] ?? ''}" placeholder="unlimited"
          data-plan="${plan.id}" data-cap="${key}"
          class="plan-cap w-24 text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-400">
      </div>`;

      const capB = (key, label) => `<label class="flex items-center gap-2 mb-1.5 cursor-pointer">
        <input type="checkbox" data-plan="${plan.id}" data-bool="${key}"
          class="plan-bool w-3.5 h-3.5 accent-indigo-600" ${features[key] ? 'checked' : ''}>
        <span class="text-xs text-gray-600 dark:text-gray-300">${label}</span>
      </label>`;

      return `<div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow border border-gray-100 dark:border-gray-700">
        <div class="flex items-center justify-between mb-3">
          <div>
            <div class="font-bold text-gray-800 dark:text-white">${_esc(plan.name)} Plan ${plan.price_mur === 0 ? '— Free' : `— Rs ${plan.price_mur}/mo`}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">max ${plan.max_children || 1} child${(plan.max_children || 1) > 1 ? 'ren' : ''}</div>
          </div>
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <span class="text-xs ${plan.is_active ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-gray-500 dark:text-gray-400'}">${plan.is_active ? 'Live' : 'Draft'}</span>
            <div class="relative w-9 h-5 ${plan.is_active ? 'bg-green-400' : 'bg-gray-300 dark:bg-gray-600'} rounded-full shadow-inner">
              <input type="checkbox" ${plan.is_active ? 'checked' : ''} onchange="AdminPanel.togglePlan('${plan.id}', this.checked)" class="sr-only">
              <div class="absolute w-3 h-3 bg-white rounded-full shadow top-1 transition-transform ${plan.is_active ? 'translate-x-5' : 'translate-x-1'}"></div>
            </div>
          </label>
        </div>

        <div class="border-t border-gray-100 dark:border-gray-700 pt-3 mb-3">
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide">📚 Chapter Access</h4>
            <label class="flex items-center gap-1.5 text-xs cursor-pointer">
              <input type="checkbox" id="plan-all-${plan.id}"
                class="w-3.5 h-3.5 accent-indigo-600" ${isAll ? 'checked' : ''}
                onchange="AdminPanel.toggleAllChapters('${plan.id}',this.checked)">
              <span class="text-gray-500 dark:text-gray-400">All chapters</span>
            </label>
          </div>
          <div id="plan-chapters-${plan.id}" class="${isAll ? 'opacity-50 pointer-events-none' : ''}">
            ${chapPickerHtml}
          </div>
        </div>

        <div class="border-t border-gray-100 dark:border-gray-700 pt-3 mb-3">
          <h4 class="text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide mb-2">⚙️ Feature Caps</h4>
          ${capN('daily_question_cap', 'Daily question cap')}
          ${capN('weekly_exam_cap',    'Weekly exam cap')}
          ${capN('hints_per_question', 'Hints per question')}
          ${capN('max_children',       'Max children')}
          <div class="mt-2">
            ${capB('printable_papers',    '🖨️ Printable papers')}
            ${capB('advanced_analytics',  '📊 Advanced analytics')}
            ${capB('push_reminders',      '🔔 Push reminders')}
            ${capB('timetable_generator', '📅 Timetable generator')}
            ${capB('weekly_digest',       '📧 Weekly digest')}
            ${capB('tutor_status',        '👩‍🏫 Tutor status')}
            ${capB('early_access',        '⭐ Early access')}
          </div>
        </div>

        <button onclick="AdminPanel.savePlanFeatures('${plan.id}')"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 rounded-xl transition-colors">
          💾 Save Plan
        </button>
      </div>`;
    }).join('');
  }

  function toggleAllChapters(planId, checked) {
    const container = document.getElementById(`plan-chapters-${planId}`);
    if (container) {
      container.classList.toggle('opacity-50', checked);
      container.classList.toggle('pointer-events-none', checked);
      container.querySelectorAll('.plan-ch-check').forEach(cb => { cb.checked = checked; });
      container.querySelectorAll('.plan-pack-all').forEach(cb => { cb.checked = checked; });
    }
  }

  function togglePackAll(planId, packId, checked) {
    const pack = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : []).find(sp => sp.id === packId);
    if (!pack) return;
    const ids = new Set((pack._chapters || pack.chapters || []).map(c => c.id));
    document.querySelectorAll(`.plan-ch-check[data-plan="${planId}"]`).forEach(cb => {
      if (ids.has(cb.dataset.ch)) cb.checked = checked;
    });
  }

  async function savePlanFeatures(planId) {
    if (!_sb) return;
    const allChk = document.getElementById(`plan-all-${planId}`);
    let allowed = null;
    if (!allChk?.checked) {
      allowed = [];
      document.querySelectorAll(`.plan-ch-check[data-plan="${planId}"]`).forEach(cb => {
        if (cb.checked) allowed.push(cb.dataset.ch);
      });
    }

    const features = { allowed_chapters: allowed };
    document.querySelectorAll(`input[data-plan="${planId}"][data-cap]`).forEach(inp => {
      features[inp.dataset.cap] = inp.value === '' ? null : parseInt(inp.value, 10);
    });
    document.querySelectorAll(`input[data-plan="${planId}"][data-bool]`).forEach(cb => {
      features[cb.dataset.bool] = cb.checked;
    });

    const { error } = await _sb.from('plans').update({ features }).eq('id', planId);
    if (error) { toast('Error saving plan: ' + error.message, 3000); return; }
    toast('Plan saved ✅', 1500);
  }

  async function showPlanHistory(userId) {
    const panel = document.getElementById(`plan-history-${userId}`);
    if (!panel) return;
    if (!panel.classList.contains('hidden')) { panel.classList.add('hidden'); return; }
    panel.classList.remove('hidden');
    panel.innerHTML = '<p class="text-xs text-gray-500 dark:text-gray-400 animate-pulse py-1">Loading…</p>';
    const { data } = await _sb.from('payments')
      .select('plan_id, amount_mur, processed_at, notes')
      .eq('user_id', userId)
      .order('processed_at', { ascending: false })
      .limit(10);
    if (!data?.length) { panel.innerHTML = '<p class="text-xs text-gray-500 dark:text-gray-400 py-1">No payment history.</p>'; return; }
    panel.innerHTML = `<table class="w-full text-xs mt-1">
      <thead><tr class="text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
        <th class="text-left pb-1 font-medium">Plan</th>
        <th class="text-left pb-1 font-medium">Amount</th>
        <th class="text-left pb-1 font-medium">Date</th>
        <th class="text-left pb-1 font-medium">Notes</th>
      </tr></thead>
      <tbody>${data.map(r => `<tr class="border-b border-gray-50 dark:border-gray-700/50">
        <td class="py-1 font-medium text-gray-700 dark:text-gray-200">${_esc(r.plan_id)}</td>
        <td class="py-1 text-gray-500">Rs ${r.amount_mur ?? 0}</td>
        <td class="py-1 text-gray-500 dark:text-gray-400">${r.processed_at ? new Date(r.processed_at).toLocaleDateString() : '-'}</td>
        <td class="py-1 text-gray-500 dark:text-gray-400 max-w-xs truncate">${_esc(r.notes || '-')}</td>
      </tr>`).join('')}</tbody>
    </table>`;
  }

  async function togglePlan(planId, active) {
    if (!_sb) return;
    const { error } = await _sb.from('plans').update({ is_active: active }).eq('id', planId);
    loadPlans();
    if (error) {
      console.error('[Admin.togglePlan]', error.message);
      toast('Could not change that plan — nothing was changed.', 3500);
      return;
    }
    toast(active ? `${planId} plan is now live!` : `${planId} plan disabled.`, 2000);
  }

  // ── Question Reports tab ───────────────────────
  function _parseReportMeta(raw) {
    const sep = (raw || '').indexOf('\n__meta__');
    if (sep === -1) return { text: raw || '', meta: {} };
    try {
      return { text: raw.slice(0, sep), meta: JSON.parse(raw.slice(sep + 9)) };
    } catch(_) {
      return { text: raw.slice(0, sep), meta: {} };
    }
  }

  function _diffBadge(diff) {
    return ['', '⭐ Basic', '⭐⭐ Medium', '⭐⭐⭐ Hard', '⭐⭐⭐⭐ Challenge'][diff] || '';
  }

  async function resolveReport(id) {
    const ok = await Store.resolveReport(id);
    if (ok) { toast('Report marked resolved.', 1800); loadReports(); }
    else toast('Could not update — try again.', 2500);
  }

  async function loadReports() {
    const el = document.getElementById('admin-reports-list');
    if (el) el.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-6 animate-pulse">Loading reports…</p>';
    // Ensure question bank is fully loaded across all grades so the live lookup
    // works. loadAllForGrade, NOT loadForStudent: the latter now resolves once
    // the child's active subject is in and prefetches the rest in the
    // background, which is right for a child and wrong here — a report can name
    // a question in any subject, and the lookup runs the moment this resolves.
    if (typeof QuestionLoader !== 'undefined') {
      await Promise.allSettled([
        QuestionLoader.loadAllForGrade(4),
        QuestionLoader.loadAllForGrade(5),
        QuestionLoader.loadAllForGrade(6),
      ]);
    }
    const reports = await Store.loadReports();
    if (!reports.length) {
      if (el) el.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-6">No reports yet.</p>';
      return;
    }
    if (el) el.innerHTML = reports.map(r => {
      const { text: qText, meta } = _parseReportMeta(r.question_text);
      const isOpen   = (r.status || 'open') === 'open';
      const statusCls = isOpen ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700';

      // Look up full question object from loaded question bank
      const fullQ = (typeof STATIC_QUESTIONS !== 'undefined')
        ? STATIC_QUESTIONS.find(q => q.id === r.question_id) : null;
      const options  = fullQ?.options  || meta.options  || null;
      const answer   = fullQ?.answer   || meta.answer   || null;
      const diff     = fullQ?.difficulty || null;
      const hint     = fullQ?.hint || null;

      // Look up chapter & subject by searching all registered packs
      let chapter = null, subjectPack = null;
      if (fullQ?.chapterId && typeof SUBJECT_PACKS !== 'undefined') {
        for (const p of SUBJECT_PACKS) {
          const chs = p._chapters || p.chapters || [];
          const found = chs.find(c => c.id === fullQ.chapterId);
          if (found) { chapter = found; subjectPack = p; break; }
        }
      }
      const chapterName = chapter?.name || fullQ?.chapterId || '';
      const subjectLabel = subjectPack
        ? `${subjectPack.name} — Grade ${subjectPack.grade}`
        : (r.question_id || '').slice(0, 6);

      // Student name: from joined row, or from meta for older reports
      const studentName = r.students?.display_name || meta.studentName || null;
      const mode        = meta.mode || null;

      // Options rows with correct answer highlighted
      const optionLetters = ['A','B','C','D','E'];
      const optionsHtml = options ? options.map((opt, i) => {
        const letter   = optionLetters[i] || String(i + 1);
        const isAnswer = answer && (answer === letter || answer === opt);
        return `<div class="flex items-start gap-2 py-0.5 ${isAnswer ? 'text-green-700 dark:text-green-400 font-semibold' : 'text-gray-700 dark:text-gray-300'}">
          <span class="shrink-0 w-5 h-5 rounded-full text-xs flex items-center justify-center border ${isAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-gray-300 dark:border-gray-600'}">${letter}</span>
          <span class="text-sm">${_esc(opt)}${isAnswer ? ' <span class="text-green-600 dark:text-green-400">✓ correct</span>' : ''}</span>
        </div>`;
      }).join('') : '';

      return `
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow mb-3 border-l-4 ${isOpen ? 'border-amber-400' : 'border-green-400'}">
        <!-- Header row -->
        <div class="flex justify-between items-start gap-2 mb-3">
          <div>
            <span class="text-xs font-mono bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 px-2 py-0.5 rounded">${_esc(r.question_id || '-')}</span>
            ${mode ? `<span class="ml-1 text-xs text-gray-500 dark:text-gray-400">(${_esc(mode)} mode)</span>` : ''}
          </div>
          <span class="text-xs ${statusCls} px-2 py-0.5 rounded-full shrink-0">${_esc(r.status || 'open')}</span>
        </div>

        <!-- Subject / chapter / difficulty -->
        <p class="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-0.5">${_esc(subjectLabel)}</p>
        ${chapterName ? `<p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Chapter: ${_esc(chapterName)}</p>` : ''}
        ${diff ? `<p class="text-xs text-gray-500 dark:text-gray-400 mb-2">${_esc(_diffBadge(diff))}</p>` : ''}

        <!-- Question text -->
        <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 mb-3">
          <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Question</p>
          <p class="text-sm text-gray-800 dark:text-white leading-relaxed">${_esc(qText.slice(0, 400))}${qText.length > 400 ? '…' : ''}</p>
        </div>

        <!-- Options -->
        ${optionsHtml ? `<div class="mb-3">${optionsHtml}</div>` : ''}

        <!-- Hint (for admin context) -->
        ${hint ? `<p class="text-xs text-amber-600 dark:text-amber-400 mb-3">💡 Hint: ${_esc(hint)}</p>` : ''}

        <!-- Reporter's comment -->
        <div class="border-t border-gray-100 dark:border-gray-700 pt-3 mb-3">
          <p class="text-xs font-semibold text-red-500 mb-1">Reporter's comment</p>
          <p class="text-sm text-gray-800 dark:text-white">${_esc(r.message || '-')}</p>
        </div>

        <!-- Footer -->
        <div class="flex justify-between items-center flex-wrap gap-2">
          <div>
            ${studentName ? `<p class="text-xs text-gray-500 dark:text-gray-400">Reported by: <span class="font-medium">${_esc(studentName)}</span></p>` : ''}
            <p class="text-xs text-gray-500 dark:text-gray-400">${new Date(r.created_at).toLocaleString()}</p>
          </div>
          ${isOpen ? `<button onclick="Admin.resolveReport('${_esc(r.id)}')" class="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg transition-colors">Mark resolved</button>` : ''}
        </div>
      </div>`;
    }).join('');
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
      if (!jwt) { _showErrCA(errEl, 'Not logged in - please refresh.'); return; }

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

  // ── Pending-report badge + mini panel shown in the Questions tab ─────────
  async function _loadReportBadge() {
    const { count, error } = await _sb.from('question_reports')
      .select('*', { count: 'exact', head: true }).eq('status', 'open');
    const n = error ? 0 : (count || 0);
    const badge = document.getElementById('admin-reports-badge');
    if (badge) { badge.textContent = n; badge.classList.toggle('hidden', n === 0); }
  }

  function _escRpt(s) { return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  async function _loadPendingReports() {
    const el = document.getElementById('qm-reports-section');
    if (!el) return;
    const { data, error } = await _sb.from('question_reports')
      .select('id,question_id,message,created_at')
      .eq('status', 'open')
      .order('created_at', { ascending: false })
      .limit(10);
    if (error || !data || !data.length) { el.innerHTML = ''; return; }
    el.innerHTML = `<div class="mb-4 border border-red-200 dark:border-red-800 rounded-xl p-3 bg-red-50 dark:bg-red-900/20">
      <div class="flex items-center justify-between mb-2">
        <h3 class="font-semibold text-sm text-red-600 dark:text-red-400">🚩 ${data.length} pending report${data.length > 1 ? 's' : ''}</h3>
        <button onclick="AdminPanel.showTab('reports')" class="text-xs text-red-600 dark:text-red-400 underline">See all →</button>
      </div>
      <div class="space-y-2">${data.map(r => `
        <div class="flex items-start gap-2 text-sm">
          <span class="font-mono text-xs text-gray-500 dark:text-gray-400 shrink-0 mt-0.5">${_escRpt(r.question_id)}</span>
          <span class="flex-1 text-gray-700 dark:text-gray-200 truncate">${_escRpt((r.message||'').split('\n__meta__')[0])}</span>
          <div class="flex gap-1 shrink-0">
            <button onclick="AdminPanel.qmOpenForm('${_escRpt(r.question_id)}')" class="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">Edit Q</button>
            <button onclick="AdminPanel.qmResolveReport('${_escRpt(r.id)}')" class="text-xs bg-green-600 text-white px-2 py-0.5 rounded">Resolve</button>
          </div>
        </div>`).join('')}
      </div>
    </div>`;
  }

  async function qmResolveReport(id) {
    await _sb.from('question_reports').update({ status: 'resolved' }).eq('id', id);
    _loadPendingReports(); _loadReportBadge();
    if (typeof toast === 'function') toast('Report resolved ✅', 1500);
  }

  // ── Question Manager ─────────────────────────────────────────────────────
  const QM = (() => {
    let _offset    = 0;
    const PAGE     = 50;
    let _editingId = null;
    let _idCounter = 0;

    function _el(id) { return document.getElementById(id); }

    function _stripHtml(html) {
      return (html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    }

    function _getPack(subjectId) {
      return (window.SUBJECT_PACKS || []).find(p => p.id === subjectId);
    }

    // ── Filter bar: grade cascade ────────────────────────────────────────
    function qmGradeFilter() {
      const grade = _el('qm-grade').value;
      const subSel = _el('qm-subject');
      subSel.innerHTML = '<option value="">All subjects</option>';
      _el('qm-chapter').innerHTML = '<option value="">All chapters</option>';
      (window.SUBJECT_PACKS || [])
        .filter(p => !grade || String(p.grade) === grade)
        .forEach(p => {
          const o = document.createElement('option');
          o.value = p.id; o.textContent = p.name;
          subSel.appendChild(o);
        });
    }

    function _populateSubjectFilter() {
      const subSel = _el('qm-subject');
      if (subSel.options.length > 1) return; // already populated
      (window.SUBJECT_PACKS || []).forEach(p => {
        const o = document.createElement('option');
        o.value = p.id; o.textContent = `Grade ${p.grade} — ${p.name}`;
        subSel.appendChild(o);
      });
    }

    // ── Search / list ────────────────────────────────────────────────────
    async function qmSearch() {
      _offset = 0;
      _el('qm-list').innerHTML = '<p class="text-sm text-gray-400 p-4">Loading…</p>';
      _el('qm-load-more').classList.add('hidden');
      await _fetchAndRender(true);
    }

    async function qmLoadMore() {
      _offset += PAGE;
      await _fetchAndRender(false);
    }

    async function _fetchAndRender(replace) {
      const grade    = _el('qm-grade').value;
      const subject  = _el('qm-subject').value;
      const chapter  = _el('qm-chapter').value;
      const diff     = _el('qm-difficulty').value;
      const search   = (_el('qm-search').value || '').trim();

      let q = _sb.from('questions')
        .select('id,subject_id,chapter_id,difficulty,type,data,protected')
        .eq('is_past_paper', false)
        .order('subject_id').order('chapter_id').order('difficulty')
        .range(_offset, _offset + PAGE - 1);

      if (grade)   q = q.eq('grade', parseInt(grade));
      if (subject) q = q.eq('subject_id', subject);
      if (chapter) q = q.eq('chapter_id', chapter);
      if (diff)    q = q.eq('difficulty', parseInt(diff));
      if (search)  q = q.ilike('data->>question', `%${search}%`);
      if (_el('qm-has-image')?.checked)  q = q.or('data->>question.ilike.%<img%,data->>question.ilike.%<svg%');
      if (_el('qm-protected')?.checked)  q = q.eq('protected', true);

      const { data, error } = await q;

      if (error) {
        _el('qm-list').innerHTML = `<p class="text-sm text-red-500 p-4">Error: ${error.message}</p>`;
        return;
      }

      const rows = data || [];
      if (replace) {
        _el('qm-count').textContent = rows.length === PAGE
          ? `Showing ${_offset + rows.length}+ questions`
          : `${_offset + rows.length} question${rows.length !== 1 ? 's' : ''}`;
      }

      const html = rows.map(r => {
        const preview = _stripHtml(r.data?.question || '').slice(0, 80) || '(no text)';
        const safeId  = r.id.replace(/'/g, "\\'");
        return `<div class="flex items-center gap-2 p-2 border dark:border-gray-600 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700/40">
          <span class="font-mono text-xs text-gray-400 w-36 shrink-0 truncate">${r.id}</span>
          <span class="flex-1 truncate text-gray-700 dark:text-gray-300">${preview}</span>
          <span class="text-xs bg-gray-100 dark:bg-gray-600 dark:text-gray-300 rounded px-1 shrink-0">${r.chapter_id}</span>
          <span class="text-xs text-gray-400 shrink-0">L${r.difficulty}</span>
          ${r.protected ? `<span title="Protected — import script will not overwrite" class="text-xs shrink-0">🔒</span>` : ''}
          <button onclick="AdminPanel.qmToggleProtection('${safeId}',${!r.protected})" class="text-xs text-gray-400 border dark:border-gray-500 rounded px-1.5 py-0.5 shrink-0" title="${r.protected ? 'Remove protection' : 'Protect from import'}">${r.protected ? 'Unprotect' : 'Protect'}</button>
          <button onclick="AdminPanel.qmOpenForm('${safeId}')" class="text-blue-600 text-xs px-2 py-1 border dark:border-gray-500 rounded shrink-0">Edit</button>
          <button onclick="AdminPanel.qmDelete('${safeId}')" class="text-red-500 text-xs px-2 py-1 border dark:border-gray-500 rounded shrink-0">Delete</button>
        </div>`;
      }).join('');

      const list = _el('qm-list');
      if (replace) list.innerHTML = html || '<p class="text-sm text-gray-400 p-4">No questions found.</p>';
      else list.insertAdjacentHTML('beforeend', html);

      const loadMore = _el('qm-load-more');
      if (rows.length === PAGE) loadMore.classList.remove('hidden');
      else loadMore.classList.add('hidden');
    }

    // ── Form: open ───────────────────────────────────────────────────────
    async function qmOpenForm(id) {
      _editingId = id || null;
      _el('qm-form-title').textContent = id ? 'Edit Question' : 'Add Question';

      // Reset fields
      ['qmf-id','qmf-question','qmf-opt-a','qmf-opt-b','qmf-opt-c','qmf-opt-d','qmf-answer','qmf-hint','qmf-explanation'].forEach(fid => { _el(fid).value = ''; });
      _el('qmf-preview').innerHTML = '';
      _el('qmf-grade').value = '4';
      _el('qmf-difficulty').value = '2';
      _el('qmf-type').value = 'mcq';
      _el('qmf-options-block').classList.remove('hidden');
      qmFormGradeChange();

      if (id) {
        const { data, error } = await _sb.from('questions').select('*').eq('id', id).maybeSingle();
        if (error || !data) { toast('Could not load question.', 2000); return; }
        const q = data.data || {};
        _el('qmf-id').value          = data.id;
        _el('qmf-grade').value       = String(data.grade);
        _el('qmf-difficulty').value  = String(data.difficulty);
        _el('qmf-type').value        = q.type || 'mcq';
        _el('qmf-question').value    = q.question || '';
        _el('qmf-answer').value      = q.answer || '';
        _el('qmf-hint').value        = q.hint || '';
        _el('qmf-explanation').value = q.explanation || '';
        _el('qmf-preview').innerHTML = q.question || '';
        qmFormGradeChange();
        _el('qmf-subject').value = data.subject_id;
        qmFormSubjectChange();
        _el('qmf-chapter').value = data.chapter_id;
        qmFormChapterChange();
        if (q.subsection) _el('qmf-subsection').value = q.subsection;
        const opts = q.options || [];
        ['qmf-opt-a','qmf-opt-b','qmf-opt-c','qmf-opt-d'].forEach((fid, i) => {
          _el(fid).value = opts[i] || '';
        });
        qmFormTypeChange();
      }

      _el('modal-qm-form').classList.remove('hidden');
    }

    function qmCloseForm() {
      _el('modal-qm-form').classList.add('hidden');
      _editingId = null;
    }

    // ── Form: cascading dropdowns ─────────────────────────────────────────
    function qmFormGradeChange() {
      const grade   = _el('qmf-grade').value;
      const subSel  = _el('qmf-subject');
      subSel.innerHTML = '';
      (window.SUBJECT_PACKS || [])
        .filter(p => String(p.grade) === grade)
        .forEach(p => {
          const o = document.createElement('option');
          o.value = p.id; o.textContent = p.name;
          subSel.appendChild(o);
        });
      qmFormSubjectChange();
    }

    function qmFormSubjectChange() {
      const subjectId = _el('qmf-subject').value;
      const chSel     = _el('qmf-chapter');
      chSel.innerHTML = '';
      const pack = _getPack(subjectId);
      (pack?.chapters || []).forEach(ch => {
        const o = document.createElement('option');
        o.value = ch.id; o.textContent = ch.name;
        chSel.appendChild(o);
      });
      qmFormChapterChange();
    }

    function qmFormChapterChange() {
      const subjectId  = _el('qmf-subject').value;
      const chapterId  = _el('qmf-chapter').value;
      const subSel     = _el('qmf-subsection');
      subSel.innerHTML = '<option value="">— none —</option>';
      const pack       = _getPack(subjectId);
      const syllabus   = pack?.SYLLABUS?.[chapterId];
      (syllabus?.subsections || []).forEach(s => {
        const o = document.createElement('option');
        o.value = s.id; o.textContent = s.name;
        subSel.appendChild(o);
      });
    }

    function qmFormTypeChange() {
      const type = _el('qmf-type').value;
      _el('qmf-options-block').classList.toggle('hidden', type !== 'mcq');
    }

    function qmUpdatePreview() {
      _el('qmf-preview').innerHTML = _el('qmf-question').value;
    }

    function qmInsertImage() {
      const url = prompt('Image URL:\n(e.g. https://commons.wikimedia.org/wiki/Special:FilePath/Filename.jpg)');
      if (!url) return;
      const tag = `<img src="${url}" style="max-height:220px;border-radius:8px" alt="a diagram">`;
      const ta  = _el('qmf-question');
      const pos = ta.selectionStart || ta.value.length;
      ta.value  = ta.value.slice(0, pos) + tag + ta.value.slice(pos);
      qmUpdatePreview();
    }

    async function qmUploadImage(input) {
      const file = input.files[0];
      if (!file) return;
      const status = _el('qmf-upload-status');
      if (status) { status.textContent = 'Uploading…'; status.classList.remove('hidden'); }
      try {
        const ext  = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
        const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await _sb.storage.from('question-images').upload(name, file, { cacheControl: '31536000', upsert: false });
        if (error) throw error;
        const { data: urlData } = _sb.storage.from('question-images').getPublicUrl(name);
        const url = urlData.publicUrl;
        const ta  = _el('qmf-question');
        const pos = ta.selectionStart || ta.value.length;
        ta.value  = ta.value.slice(0, pos) + `<img src="${url}" style="max-height:220px;border-radius:8px" alt="a diagram">` + ta.value.slice(pos);
        qmUpdatePreview();
        if (status) { status.textContent = 'Uploaded ✅'; setTimeout(() => status.classList.add('hidden'), 2000); }
      } catch(e) {
        if (status) status.textContent = 'Upload failed: ' + (e.message || 'unknown error');
        console.error('[qmUploadImage]', e);
      } finally {
        input.value = '';
      }
    }

    // ── Save ─────────────────────────────────────────────────────────────
    async function qmSave() {
      const question = _el('qmf-question').value.trim();
      const answer   = _el('qmf-answer').value.trim();
      if (!question) { toast('Question text is required.', 2000); return; }
      if (!answer)   { toast('Correct answer is required.', 2000); return; }

      const grade    = _el('qmf-grade').value;
      const subject  = _el('qmf-subject').value;
      const chapter  = _el('qmf-chapter').value;
      const subsect  = _el('qmf-subsection').value;
      const diff     = _el('qmf-difficulty').value;
      const type     = _el('qmf-type').value;
      const hint     = _el('qmf-hint').value.trim();
      const expl     = _el('qmf-explanation').value.trim();

      let qId = _el('qmf-id').value.trim();
      if (!qId) {
        const prefix = subject.replace('grade', 'g').replace('-', '').replace(/[^a-z0-9]/gi, '');
        qId = `${prefix}-db-${Date.now().toString(36)}${(++_idCounter).toString(36)}`;
      }

      const options = type === 'mcq'
        ? [_el('qmf-opt-a').value.trim(), _el('qmf-opt-b').value.trim(),
           _el('qmf-opt-c').value.trim(), _el('qmf-opt-d').value.trim()].filter(Boolean)
        : type === 'tf' ? ['True', 'False'] : [];

      const data = {
        id: qId, chapterId: chapter, difficulty: +diff,
        type, question, options, answer, acceptableAnswers: [answer],
      };
      if (subsect)  data.subsection   = subsect;
      if (hint)     data.hint         = hint;
      if (expl)     data.explanation  = expl;

      const row = {
        id: qId, subject_id: subject, chapter_id: chapter,
        grade: +grade, difficulty: +diff, is_past_paper: false,
        protected: true,
        data, imported_at: new Date().toISOString(),
      };

      const { error } = await _sb.from('questions').upsert(row, { onConflict: 'id' });
      if (error) { toast('Save failed: ' + error.message, 3000); return; }

      toast('Question saved ✅', 1500);
      qmCloseForm();
      qmSearch();
    }

    // ── Protection toggle ─────────────────────────────────────────────────
    async function qmToggleProtection(id, protect) {
      const { error } = await _sb.from('questions').update({ protected: protect }).eq('id', id);
      if (error) { toast('Failed: ' + error.message, 2500); return; }
      toast(protect ? '🔒 Protected' : '🔓 Unprotected', 1500);
      _fetchAndRender(true);
    }

    // ── Delete ────────────────────────────────────────────────────────────
    async function qmDelete(id) {
      if (!confirm(`Delete question "${id}"?\nThis cannot be undone.`)) return;
      const { error } = await _sb.from('questions').delete().eq('id', id);
      if (error) { toast('Delete failed: ' + error.message, 3000); return; }
      toast('Deleted ✅', 1500);
      qmSearch();
    }

    function tabOpen() {
      _populateSubjectFilter();
      qmSearch();
      _loadPendingReports();
      _loadReportBadge();
    }

    return { tabOpen, qmSearch, qmLoadMore, qmGradeFilter, qmOpenForm, qmCloseForm,
             qmFormGradeChange, qmFormSubjectChange, qmFormChapterChange,
             qmFormTypeChange, qmUpdatePreview, qmInsertImage, qmUploadImage, qmSave, qmDelete,
             qmToggleProtection };
  })();

  return { render, showTab, loadMembers, filterMembers, changeRole,
    loadTeacherQueue, setTeacherStatus, toggleDisable, toggleChildren, forceLogout, updateMemberName, setExpiry, setStudentExpiry, toggleGrade, toggleSubject, toggleRegistration, togglePlanEnforcement, loadStats, loadReports, resolveReport, loadRoles, setRole, loadPlans, togglePlan, toggleAllChapters, togglePackAll, savePlanFeatures, showPlanHistory, assignPlan, createAccount, genPassword, toggleFamilyField, copyAccountDetails,
    loadTeachers, teacherApprove, teacherSuspend, teacherChangeTier,
    qmSearch: QM.qmSearch, qmLoadMore: QM.qmLoadMore, qmGradeFilter: QM.qmGradeFilter,
    qmOpenForm: QM.qmOpenForm, qmCloseForm: QM.qmCloseForm,
    qmFormGradeChange: QM.qmFormGradeChange, qmFormSubjectChange: QM.qmFormSubjectChange,
    qmFormChapterChange: QM.qmFormChapterChange, qmFormTypeChange: QM.qmFormTypeChange,
    qmUpdatePreview: QM.qmUpdatePreview, qmInsertImage: QM.qmInsertImage,
    qmUploadImage: QM.qmUploadImage, qmSave: QM.qmSave, qmDelete: QM.qmDelete,
    qmToggleProtection: QM.qmToggleProtection, qmResolveReport };
})();
