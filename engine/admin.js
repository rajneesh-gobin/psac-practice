'use strict';
// ══════════════════════════════════════════════
//  Admin Panel - Superuser dashboard
//  Only visible when profile.role === 'admin'
// ══════════════════════════════════════════════

const AdminPanel = (() => {
  let _members    = [];   // cached parent profiles
  let _teachers   = [];   // cached teacher profiles
  let _settings   = null; // global_settings from mm_data
  // True once a query has proved this database predates supabase-credits-shop.sql,
  // so the credit controls are hidden instead of failing on every click.
  let _creditColumnsMissing = false;

  const ROLE_LABELS = { parent: '👨‍👩‍👧 Parent', teacher: '👩‍🏫 Teacher', admin: '🛡️ Admin' };
  const ROLE_COLORS = {
    parent:  'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
    teacher: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
    admin:   'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
  };

  // ── Entry point called by auth.js ───────────
  async function render() {
    showTab('members');
    await Promise.all([loadMembers(), loadTeachers(), loadSettings(), loadShopSettings(), loadTeacherQueue()]);
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
    // The security log is on the Content tab and is a per-visit read: an admin
    // opening it wants what has happened since, not what was cached at render.
    if (name === 'content')   loadSecurityEvents();
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

  // Expected ~1000 users/month means the unfiltered member list would only
  // ever grow - pulling every row on every tab open/refresh doesn't scale.
  // Same page-and-"Load more" shape as Question Manager's _fetchAndRender().
  const MEMBERS_PAGE = 30;
  let _membersOffset  = 0;
  let _membersQuery   = '';
  let _membersFilterTimer = null;

  async function loadMembers(reset = true) {
    if (!_sb) return;
    if (reset) { _membersOffset = 0; _members = []; }
    const el = document.getElementById('admin-members-list');
    if (reset && el) el.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-6 animate-pulse">Loading members…</p>';
    let membersQuery = _sb.from('profiles')
      // credits/blocked_until are read here rather than per-row: the admin needs to
      // SEE a balance to spot a farm, and one extra column beats N extra queries.
      // ⚠ A database that has not run supabase-credits-shop.sql has neither column,
      // which would 42703 the whole query and empty the members list — hence the
      // retry below with the original column list.
      .select('id, full_name, role, disabled, expires_at, created_at, teacher_status, referral_code, credits, blocked_until',
              { count: 'exact' })
      .eq('role', 'parent')
      .order('created_at', { ascending: false })
      .range(_membersOffset, _membersOffset + MEMBERS_PAGE - 1);
    // full_name only - the "or email" in the placeholder is aspirational,
    // profiles carries no email column (auth.users does, and isn't queryable
    // from here); id is a UUID so a name search covers the realistic case.
    if (_membersQuery) membersQuery = membersQuery.ilike('full_name', `%${_membersQuery}%`);
    const [profilesRes, plansRes] = await Promise.all([
      membersQuery,
      // Plans rarely change - no need to refetch on every page/search.
      _plansForSelect.length ? Promise.resolve({ data: _plansForSelect }) :
        _sb.from('plans').select('id, name, price_mur').order('price_mur'),
    ]);
    if (profilesRes.error) {
      // 42703 = unknown column, i.e. supabase-credits-shop.sql has not been run
      // on this database. Retry without the two credit columns rather than
      // showing an admin an empty member list over a feature they have not
      // deployed yet. Anything else is a real failure and is reported.
      if (profilesRes.error.code === '42703') {
        _creditColumnsMissing = true;
        let retry = _sb.from('profiles')
          .select('id, full_name, role, disabled, expires_at, created_at, teacher_status, referral_code',
                  { count: 'exact' })
          .eq('role', 'parent')
          .order('created_at', { ascending: false })
          .range(_membersOffset, _membersOffset + MEMBERS_PAGE - 1);
        if (_membersQuery) retry = retry.ilike('full_name', `%${_membersQuery}%`);
        const again = await retry;
        if (!again.error) { profilesRes.data = again.data; profilesRes.count = again.count; profilesRes.error = null; }
      }
      if (profilesRes.error) {
        if (el) el.innerHTML = '<p class="text-sm text-red-400 text-center py-6">Failed to load members.</p>';
        return;
      }
    }
    _plansForSelect = plansRes.data || _plansForSelect;
    const rows = profilesRes.data || [];
    _members = reset ? rows : _members.concat(rows);
    _membersOffset += rows.length;
    _renderMembers(_members);
    _setCount('admin-members-count', _members.length, profilesRes.count, 'parents');
    const moreBtn = document.getElementById('admin-members-more');
    if (moreBtn) moreBtn.classList.toggle('hidden', rows.length < MEMBERS_PAGE);
  }

  async function loadMoreMembers() {
    await loadMembers(false);
  }

  // Debounced so 1000 users' worth of typing doesn't fire a query per
  // keystroke - each search now re-queries the server (a full client-side
  // filter would need every member loaded first, defeating the pagination).
  function filterMembers(query) {
    clearTimeout(_membersFilterTimer);
    _membersFilterTimer = setTimeout(() => {
      _membersQuery = (query || '').trim();
      loadMembers(true);
    }, 300);
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

  // ── Shared list counter ─────────────────────────
  // "Showing 50 of 5,428 questions" instead of "Showing 50+". The old form told
  // you a page had filled up but not how much was left, so there was no way to
  // tell 51 rows from five thousand without clicking Load more until it stopped.
  //
  // total comes from PostgREST's `count: 'exact'` header. It can legitimately be
  // null - the count is a separate estimate the server may omit, and an older
  // PostgREST ignores the option entirely - so the "+" form is kept as the
  // fallback rather than printing "of null".
  function _setCount(elId, shown, total, noun) {
    const el = document.getElementById(elId);
    if (!el) return;
    const n = (x) => x.toLocaleString('en-GB');
    if (shown === 0)                 el.textContent = `No ${noun} found.`;
    else if (typeof total === 'number' && total >= shown)
      el.textContent = shown >= total
        ? `${n(total)} ${noun}`
        : `Showing ${n(shown)} of ${n(total)} ${noun}`;
    else el.textContent = `Showing ${n(shown)}+ ${noun}`;
  }

  // Which member rows are expanded. Module-level, not per-render, so a repaint
  // (role change, disable, plan activation) does not collapse the row the admin
  // is working in - that was the worst part of the old card layout, where every
  // action bounced you back to a wall of controls.
  const _openMembers = new Set();

  // Update one cached member row and repaint, instead of calling loadMembers(),
  // which resets the offset and refetches page 1. An admin who edited someone
  // on page 3 watched that person vanish from the list - the change had worked,
  // but they had to page back down to see it, and the expanded row went with it.
  function _patchMember(userId, patch) {
    const row = _members.find(m => m.id === userId);
    if (!row) { loadMembers(); return; }
    Object.assign(row, patch);
    _renderMembers(_members);
  }

  function toggleMemberRow(id) {
    if (_openMembers.has(id)) _openMembers.delete(id);
    else _openMembers.add(id);
    const open  = _openMembers.has(id);
    const panel = document.getElementById(`member-detail-${id}`);
    const chev  = document.getElementById(`member-chev-${id}`);
    if (panel) panel.classList.toggle('hidden', !open);
    if (chev)  chev.textContent = open ? '▾' : '▸';
  }

  function _renderMembers(list) {
    const el = document.getElementById('admin-members-list');
    if (!el) return;
    if (!list.length) {
      el.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-6">No members found.</p>';
      return;
    }

    // A CSS grid, not a <table>: the columns collapse to a stacked two-line row
    // under 640px, which a real table cannot do without horizontal scrolling.
    // The header row is hidden on mobile for the same reason.
    const COLS = 'grid-cols-[1.6rem_1fr] sm:grid-cols-[1.6rem_2.2fr_1fr_1fr_1.1fr]';
    const header = `
      <div class="hidden sm:grid grid-cols-[1.6rem_2.2fr_1fr_1fr_1.1fr] gap-2 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
        <span></span><span>Name</span><span>Role</span><span>Status</span><span>Plan</span>
      </div>`;

    el.innerHTML = header + list.map(m => {
      const isParent = m.role === 'parent' || m.role === 'admin';
      const open     = _openMembers.has(m.id);
      // The whole summary row is a click-to-expand toggle, so every interactive
      // control inside it must stop the click propagating - otherwise choosing a
      // role also collapses the row out from under the person choosing it.
      // stopPropagation on BOTH click and change: a keyboard user commits with
      // Enter, which the row's own keydown handler would otherwise swallow.
      const roleSelect = (extraClass = '') => `<select
        onclick="event.stopPropagation()"
        onkeydown="event.stopPropagation()"
        onchange="event.stopPropagation();AdminPanel.changeRole('${m.id}', this.value)"
        class="${extraClass} text-xs border border-gray-300 dark:border-gray-600 rounded-lg px-1.5 py-0.5 bg-white dark:bg-gray-700 dark:text-white max-w-full">
        <option value="parent"  ${m.role === 'parent'  ? 'selected' : ''}>👨‍👩‍👧 Parent</option>
        <option value="teacher" ${m.role === 'teacher' ? 'selected' : ''}>👩‍🏫 Teacher</option>
        <option value="admin"   ${m.role === 'admin'   ? 'selected' : ''}>🛡️ Admin</option>
      </select>`;
      return `
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">

        <div role="button" tabindex="0"
          onclick="AdminPanel.toggleMemberRow('${m.id}')"
          onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();AdminPanel.toggleMemberRow('${m.id}')}"
          class="grid ${COLS} gap-2 items-center px-3 py-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors">
          <span id="member-chev-${m.id}" class="text-gray-400 text-sm select-none">${open ? '▾' : '▸'}</span>
          <div class="min-w-0">
            <p class="text-sm font-semibold text-gray-800 dark:text-white truncate">${_esc(m.full_name || 'Unnamed')}</p>
            <p class="text-[11px] text-gray-400 dark:text-gray-500 font-mono truncate">${m.id}</p>
          </div>
          <span class="hidden sm:block">${roleSelect('w-full')}</span>
          <span class="hidden sm:block">${_memberStatusBadge(m)}</span>
          <span class="hidden sm:block text-xs truncate" id="plan-label-${m.id}">${isParent ? 'loading…' : '—'}</span>
          <div class="col-span-2 sm:hidden flex flex-wrap items-center gap-1.5">
            ${roleSelect()}${_memberStatusBadge(m)}
          </div>
        </div>

        <div id="member-detail-${m.id}" class="${open ? '' : 'hidden'} border-t border-gray-100 dark:border-gray-700 px-3 py-3 bg-gray-50/60 dark:bg-gray-900/20">

          <div class="flex flex-wrap items-center gap-2">
            <button onclick="AdminPanel.toggleDisable('${m.id}', ${!m.disabled})"
              class="text-xs px-3 py-1 rounded-lg font-semibold transition-colors ${m.disabled
                ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 hover:bg-green-200'
                : 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-200'}">
              ${m.disabled ? '✅ Enable' : '🚫 Disable'}
            </button>
            ${isParent ? `
            <button onclick="AdminPanel.toggleChildren('${m.id}')" id="btn-children-${m.id}"
              class="text-xs px-3 py-1 rounded-lg font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200">
              👶 Children
            </button>` : ''}
          </div>

          <div class="flex flex-wrap items-center gap-2 w-full mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
            <input type="text" value="${_esc(m.full_name || '')}" placeholder="Display name…"
              onblur="AdminPanel.updateMemberName('${m.id}', this.value)"
              onkeydown="if(event.key==='Enter')this.blur()"
              title="Click to edit display name"
              class="flex-1 min-w-0 text-xs border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 bg-transparent dark:text-white">
            <span class="text-xs text-gray-500 dark:text-gray-400 shrink-0">⏳ Expires</span>
            <input type="date" value="${m.expires_at ? m.expires_at.slice(0, 10) : ''}"
              onchange="AdminPanel.setExpiry('${m.id}', this.value)"
              title="Set account expiry - leave blank for no expiry"
              class="text-xs border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 bg-transparent dark:text-white">
            ${m.expires_at ? `<button onclick="AdminPanel.setExpiry('${m.id}','')" class="text-xs text-red-400 hover:text-red-500">clear</button>` : ''}
          </div>

          ${isParent ? `
          <div class="flex flex-wrap items-center gap-2 w-full mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
            <span class="text-xs text-gray-500 dark:text-gray-400 font-semibold shrink-0">💳 Plan:</span>
            <select id="plan-sel-${m.id}" class="text-xs border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 dark:text-white">
              ${_plansForSelect.map(p => `<option value="${_esc(p.id)}">${_esc(p.name)}${p.price_mur ? ` (Rs ${p.price_mur}/mo)` : ' (Free)'}</option>`).join('')}
            </select>
            <select id="plan-months-${m.id}" class="text-xs border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 dark:text-white">
              <option value="1">1 month</option>
              <option value="3">3 months</option>
              <option value="6">6 months</option>
              <option value="12">12 months</option>
            </select>
            <button onclick="AdminPanel.assignPlan('${m.id}')"
              class="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 hover:bg-green-200 px-3 py-1 rounded-lg font-semibold">
              ✅ Activate
            </button>
            <button onclick="AdminPanel.showPlanHistory('${m.id}')"
              class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 px-3 py-1 rounded-lg font-semibold">
              📋 History
            </button>
          </div>
          ${_creditColumnsMissing ? '' : `
          <div class="flex flex-wrap items-center gap-2 w-full mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
            <span class="text-xs text-gray-500 dark:text-gray-400 font-semibold shrink-0">🪙 Credits:</span>
            <span id="credits-bal-${m.id}" class="text-xs font-black text-amber-600 dark:text-amber-400 shrink-0">${m.credits ?? 0}</span>
            <input id="credits-delta-${m.id}" type="number" placeholder="+/- amount" step="5"
              class="w-28 text-xs border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 dark:text-white">
            <input id="credits-reason-${m.id}" type="text" placeholder="reason" maxlength="60"
              class="flex-1 min-w-[6rem] text-xs border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 dark:text-white">
            <button onclick="AdminPanel.adjustCredits('${m.id}')"
              class="text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 hover:bg-amber-200 px-3 py-1 rounded-lg font-semibold">Apply</button>
            <button onclick="AdminPanel.showCreditLedger('${m.id}')"
              class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 px-3 py-1 rounded-lg font-semibold">📋 Ledger</button>
            ${m.blocked_until && new Date(m.blocked_until) > new Date()
              ? `<span class="text-[11px] font-bold text-red-500 shrink-0">⛔ blocked until ${new Date(m.blocked_until).toLocaleString()}</span>
                 <button onclick="AdminPanel.blockUser('${m.id}', 0)" class="text-xs text-green-600 hover:text-green-700 font-semibold">unblock</button>`
              : `<button onclick="AdminPanel.blockUser('${m.id}', 1440)" class="text-xs text-red-400 hover:text-red-600 font-semibold">block 24h</button>`}
          </div>
          <div id="credits-ledger-${m.id}" class="hidden mt-2 pt-2 border-t border-gray-100 dark:border-gray-700"></div>`}
          <div id="plan-history-${m.id}" class="hidden mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 overflow-x-auto"></div>
          <div id="children-panel-${m.id}" class="hidden mt-3 pl-2 border-l-2 border-indigo-200 dark:border-indigo-700">
            <p class="text-xs text-gray-500 dark:text-gray-400 animate-pulse">Loading children…</p>
          </div>` : ''}
        </div>
      </div>`;
    }).join('');

    // The plan label lives in the SUMMARY row now, so it is readable without
    // expanding anything - that is the point of having a Plan column at all.
    list.filter(m => m.role === 'parent' || m.role === 'admin').forEach(async m => {
      const lbl = document.getElementById(`plan-label-${m.id}`);
      if (!lbl) return;
      const { plan_id, subscription } = await Store.getUserPlan(m.id);
      const exp = subscription?.expires_at
        ? ` (exp ${new Date(subscription.expires_at).toLocaleDateString()})`
        : '';
      lbl.textContent = plan_id + exp;
      lbl.className = `hidden sm:block text-xs truncate font-semibold ${plan_id === 'free' ? 'text-gray-500 dark:text-gray-400' : 'text-green-600 dark:text-green-400'}`;
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
    _patchMember(userId, { expires_at: val });
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
    if (!confirm(`Change role to "${newRole}"?`)) {
      // The <select> already shows the new value; the database does not. Repaint
      // from the cached row so the two agree again - the old unconditional
      // loadMembers() used to do this as a side effect.
      _patchMember(userId, { role: current?.role });
      return;
    }
    const { error } = await _sb.from('profiles').update({ role: newRole }).eq('id', userId);
    if (error) { alert('Error: ' + error.message); return; }
    toast(`Role updated to ${newRole}`, 3000);
    // The members list is filtered to role='parent', so a member who is no
    // longer a parent has to leave it - that is a genuine refetch, not a patch.
    if (newRole === 'parent') { _patchMember(userId, { role: newRole }); await loadTeachers(); }
    else await Promise.all([loadMembers(), loadTeachers()]);
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
  // Paged like every other admin list. This one used to fetch EVERY teacher row
  // with no limit - harmless at today's zero teachers, and a growing page load
  // with no ceiling as soon as that changes.
  const TEACHERS_PAGE = 30;
  let _teachersOffset = 0;

  async function loadTeachers(reset = true) {
    if (!_sb) return;
    const el = document.getElementById('admin-teachers-list');
    if (reset) {
      _teachersOffset = 0; _teachers = [];
      if (el) el.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-6 animate-pulse">Loading teachers…</p>';
    }
    const { data, error, count } = await _sb.from('profiles')
      .select('id, full_name, role, disabled, expires_at, created_at, teacher_status, teacher_tier',
              { count: 'exact' })
      .eq('role', 'teacher')
      .order('teacher_status', { ascending: true })
      // Secondary sort so paging is stable: teacher_status alone leaves rows
      // that share a status in an arbitrary order, and two pages of an unstable
      // sort can repeat one row and skip another.
      .order('created_at', { ascending: false })
      .range(_teachersOffset, _teachersOffset + TEACHERS_PAGE - 1);
    if (error) {
      if (el && reset) el.innerHTML = '<p class="text-sm text-red-400 text-center py-6">Failed to load teachers.</p>';
      return;
    }
    const rows = data || [];
    _teachers = reset ? rows : _teachers.concat(rows);
    _teachersOffset += rows.length;
    _renderTeachers(_teachers);
    _setCount('admin-teachers-count', _teachers.length, count, 'teachers');
    const moreBtn = document.getElementById('admin-teachers-more');
    if (moreBtn) moreBtn.classList.toggle('hidden', rows.length < TEACHERS_PAGE);
  }

  async function loadMoreTeachers() {
    await loadTeachers(false);
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
  const ROLES_PAGE = 40;
  let _rolesOffset  = 0;
  let _rolesAll     = [];

  function _renderRoles() {
    const listEl = document.getElementById('admin-roles-list');
    if (!listEl) return;
    const mySelf = typeof Auth !== 'undefined' ? Auth.getParentProfile?.()?.id : null;
    listEl.innerHTML = _rolesAll.map(p => {
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

  // Same 1000-users/month reasoning as Members: this used to pull every
  // profile row (not just admins) in one unbounded query.
  async function loadRoles(reset = true) {
    if (!_sb || !(typeof Auth !== 'undefined' && Auth.isSuperAdmin?.())) return;
    const listEl = document.getElementById('admin-roles-list');
    if (!listEl) return;
    if (reset) { _rolesOffset = 0; _rolesAll = []; listEl.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-4 animate-pulse">Loading…</p>'; }
    const { data, error, count } = await _sb.from('profiles')
      .select('id, full_name, role, is_super_admin', { count: 'exact' })
      .order('full_name')
      .range(_rolesOffset, _rolesOffset + ROLES_PAGE - 1);
    if (error) {
      // An RLS denial or a network failure is NOT an empty database. Reporting
      // it as "No profiles found" also hid the Load more button, so paging
      // could not be retried without leaving and re-entering the tab.
      console.error('[Admin.loadRoles]', error.message);
      if (reset) listEl.innerHTML = '<p class="text-sm text-red-400 text-center py-6">Could not load roles. Please try Refresh.</p>';
      return;
    }
    const rows = data || [];
    _rolesAll = reset ? rows : _rolesAll.concat(rows);
    _rolesOffset += rows.length;
    _renderRoles();
    _setCount('admin-roles-count', _rolesAll.length, count, 'accounts');
    const moreBtn = document.getElementById('admin-roles-more');
    if (moreBtn) moreBtn.classList.toggle('hidden', rows.length < ROLES_PAGE);
  }

  async function loadMoreRoles() {
    await loadRoles(false);
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

      // `!== false`, not truthy. _planAllowsFeature treats an ABSENT key as
      // allowed, so rendering absent as unchecked showed the opposite of what
      // was enforced - and the next save would write that false back and
      // genuinely switch the feature off. Any switch added here in future would
      // otherwise silently disable itself for every plan on the next save.
      const capB = (key, label) => `<label class="flex items-center gap-2 mb-1.5 cursor-pointer">
        <input type="checkbox" data-plan="${plan.id}" data-bool="${key}"
          class="plan-bool w-3.5 h-3.5 accent-indigo-600" ${features[key] !== false ? 'checked' : ''}>
        <span class="text-xs text-gray-600 dark:text-gray-300">${label}</span>
      </label>`;

      // A COLUMN on plans, not a key in features. max_children is the only one:
      // it is what the card header and the public pricing page display, and what
      // the students_max_children trigger reads server-side. The old form wrote
      // features.max_children instead, which nothing has ever read.
      const colN = (key, label, hint, min = 1) => `<div class="flex items-center gap-2 mb-2">
        <span class="text-xs text-gray-500 dark:text-gray-400 w-36 shrink-0">${label}</span>
        <input type="number" min="${min}" value="${plan[key] ?? min}"
          data-plan="${plan.id}" data-col="${key}"
          class="plan-col w-24 text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-400">
        <span class="text-[11px] text-gray-400">${hint}</span>
      </div>`;

      // Text columns need their own attribute: the numeric collector parses
      // every data-col with parseInt, which would turn a plan name into NaN.
      const colT = (key, label, hint) => `<div class="flex items-center gap-2 mb-2">
        <span class="text-xs text-gray-500 dark:text-gray-400 w-36 shrink-0">${label}</span>
        <input type="text" maxlength="40" value="${_esc(plan[key] ?? '')}"
          data-plan="${plan.id}" data-col-text="${key}"
          class="plan-col-text flex-1 min-w-0 text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-400">
        <span class="text-[11px] text-gray-400 shrink-0">${hint}</span>
      </div>`;

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
          <h4 class="text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide mb-2">💰 Pricing</h4>
          <p class="text-[11px] text-gray-400 dark:text-gray-500 mb-2 leading-relaxed">
            What the public pricing page and the plans modal show.
            <b>Was price</b> renders a struck-out original with a “Save N%” badge,
            and is ignored unless it is higher than the price above it.
          </p>
          ${colT('name',          'Plan name',          'shown to customers')}
          ${colN('price_mur',     'Price / month (Rs)', '0 = free', 0)}
          ${capN('price_was_mur', 'Was price (promo)')}
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
          <div class="flex items-center gap-2 mb-2 p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
            <span class="text-xs text-gray-600 dark:text-gray-300 shrink-0">Unlock the first</span>
            <input type="number" min="0" max="30" value="4" id="plan-firstn-${plan.id}"
              class="w-14 text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 dark:text-white">
            <span class="text-xs text-gray-600 dark:text-gray-300 shrink-0">chapters of every subject</span>
            <button onclick="AdminPanel.applyFirstNChapters('${plan.id}')"
              class="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg font-semibold shrink-0">Apply</button>
          </div>
          <div id="plan-chapters-${plan.id}" class="${isAll ? 'opacity-50 pointer-events-none' : ''}">
            ${chapPickerHtml}
          </div>
        </div>

        <div class="border-t border-gray-100 dark:border-gray-700 pt-3 mb-3">
          <h4 class="text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide mb-2">⚙️ Feature Caps</h4>
          <p class="text-[11px] text-gray-400 dark:text-gray-500 mb-2 leading-relaxed">
            Blank = unlimited. Nothing here applies until <b>Plan enforcement</b>
            is switched on in the Settings tab.<br>
            <b>Was price</b> only shows a struck-out promo when it is higher than
            the live price — blank or lower means no promotion.
          </p>
          ${capN('daily_question_cap', 'Daily questions')}
          ${capN('weekly_exam_cap',    'Weekly exams')}
          ${capN('hints_per_question', 'Hints per question')}
          ${colN('max_children',       'Max children', 'shown on pricing')}
          <div class="mt-2 grid sm:grid-cols-2 gap-x-4">
            ${capB('printable_papers',    '🖨️ Printable papers')}
            ${capB('advanced_analytics',  '📊 Advanced analytics')}
            ${capB('timetable_generator', '📅 Timetable generator')}
            ${capB('push_reminders',      '🔔 Daily push reminders')}
            ${capB('weekly_digest_enabled', '📧 Weekly progress email')}
            ${capB('tutor_status',        '👩‍🏫 Can apply for tutor access')}
            ${capB('past_papers',         '📄 Past exam papers')}
            ${capB('question_search',     '🔍 Search all questions')}
            ${capB('community_forum',     '💬 Community forum')}
            ${capB('study_calendar',      '🗓️ Study calendar')}
            ${capB('weak_area_drill',     '💪 Weak-area drills')}
          </div>
          <p class="text-[11px] text-gray-400 dark:text-gray-500 mt-3 leading-relaxed">
            🛡️ Enforced server-side (cannot be bypassed): chapter access, max
            children, push reminders, weekly email.<br>
            Enforced in the browser only: daily/weekly caps, hints, printable
            papers, analytics, timetable, tutor access, past papers, search,
            forum, calendar, weak-area drills.
          </p>
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

  // "First 4 chapters of every subject" is what the public pricing page
  // promises the free tier, and ticking that by hand is 148 checkboxes across
  // 15 packs - tedious, and wrong the moment a subject gains a chapter.
  //
  // "First N" means the first N ORDINARY chapters in manifest order. Enrichment
  // chapters are deliberately excluded from the count AND left unticked: they
  // are the ✨ BONUS content, they carry examWeight, and counting one toward a
  // free allowance would silently cost that tier a real chapter. An admin who
  // wants them can still tick them individually afterwards.
  function applyFirstNChapters(planId) {
    const n = parseInt(document.getElementById(`plan-firstn-${planId}`)?.value, 10);
    if (!Number.isFinite(n) || n < 0) { toast('Enter how many chapters to unlock.', 2500); return; }

    // Leaving "All chapters" ticked would make the tree unreadable AND ignored -
    // savePlanFeatures writes allowed_chapters = null when it is on.
    const allChk = document.getElementById(`plan-all-${planId}`);
    if (allChk?.checked) { allChk.checked = false; toggleAllChapters(planId, false); }

    const allow = new Set();
    let bonus = 0;
    for (const pack of (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [])) {
      const chs = pack._chapters || pack.chapters || [];
      const ordinary = chs.filter(c => !c.enrichment);
      bonus += chs.length - ordinary.length;
      ordinary.slice(0, n).forEach(c => allow.add(c.id));
    }

    let ticked = 0;
    document.querySelectorAll(`.plan-ch-check[data-plan="${planId}"]`).forEach(cb => {
      cb.checked = allow.has(cb.dataset.ch);
      if (cb.checked) ticked++;
    });
    // The per-pack "all" boxes are now almost certainly wrong - a pack is only
    // fully ticked if N covers every ordinary chapter in it and it has no bonus.
    document.querySelectorAll(`.plan-pack-all[data-plan="${planId}"]`).forEach(cb => {
      const pack = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [])
        .find(p => p.id === cb.dataset.pack);
      const chs = pack ? (pack._chapters || pack.chapters || []) : [];
      cb.checked = chs.length > 0 && chs.every(c => allow.has(c.id));
    });

    toast(`${ticked} chapter${ticked === 1 ? '' : 's'} ticked`
      + (bonus ? ` · ${bonus} bonus chapter${bonus === 1 ? '' : 's'} left locked` : '')
      + ' — press Save Plan to apply.', 4500);
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

    // Real columns on `plans`, written alongside the jsonb in one update.
    const row = { features };
    document.querySelectorAll(`input[data-plan="${planId}"][data-col]`).forEach(inp => {
      const n = parseInt(inp.value, 10);
      const k = inp.dataset.col;
      // Both are NOT NULL on the table, so a blank or junk value must fall back
      // to something valid rather than failing the whole save on a constraint.
      // max_children: 0 children is not a product anyone sells, so the floor is 1.
      // price_mur: 0 IS meaningful (the free tier), so the floor is 0 - and a
      // negative price would render as "Rs -50" on the public pricing page.
      if (k === 'max_children')   row.max_children = Number.isFinite(n) && n >= 1 ? n : 1;
      else if (k === 'price_mur') row.price_mur    = Number.isFinite(n) && n >= 0 ? n : 0;
      else if (Number.isFinite(n)) row[k] = n;
    });
    document.querySelectorAll(`input[data-plan="${planId}"][data-col-text]`).forEach(inp => {
      const v = (inp.value || '').trim();
      // name is NOT NULL. An empty box keeps whatever is stored rather than
      // writing '' and leaving a nameless plan on the pricing page.
      if (v) row[inp.dataset.colText] = v;
    });

    const { error } = await _sb.from('plans').update(row).eq('id', planId);
    if (error) { toast('Error saving plan: ' + error.message, 3000); return; }
    toast('Plan saved ✅', 1500);
    loadPlans();   // repaint from the DB so the card header shows the saved cap
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

  const REPORTS_PAGE = 30;
  let _reportsOffset  = 0;
  let _reportsAll     = [];
  let _reportsTotal   = null;

  async function loadReports(reset = true) {
    const el = document.getElementById('admin-reports-list');
    if (reset) {
      _reportsOffset = 0; _reportsAll = [];
      if (el) el.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-6 animate-pulse">Loading reports…</p>';
      // Ensure question bank is fully loaded across all grades so the live lookup
      // works. loadAllForGrade, NOT loadForStudent: the latter now resolves once
      // the child's active subject is in and prefetches the rest in the
      // background, which is right for a child and wrong here — a report can name
      // a question in any subject, and the lookup runs the moment this resolves.
      // Only needed once, not on every "load more" page.
      if (typeof QuestionLoader !== 'undefined') {
        await Promise.allSettled([
          QuestionLoader.loadAllForGrade(4),
          QuestionLoader.loadAllForGrade(5),
          QuestionLoader.loadAllForGrade(6),
        ]);
      }
    }
    // Total fetched only on reset - a Load more page does not change it.
    if (reset) _reportsTotal = await Store.countReports();
    const page = await Store.loadReports(_reportsOffset, REPORTS_PAGE);
    _reportsOffset += page.length;
    _reportsAll = reset ? page : _reportsAll.concat(page);
    _setCount('admin-reports-count', _reportsAll.length, _reportsTotal, 'reports');
    const moreBtn = document.getElementById('admin-reports-more');
    if (moreBtn) moreBtn.classList.toggle('hidden', page.length < REPORTS_PAGE);
    if (!_reportsAll.length) {
      if (el) el.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-6">No reports yet.</p>';
      return;
    }
    if (el) el.innerHTML = _reportsAll.map(r => {
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

  async function loadMoreReports() {
    await loadReports(false);
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
    let _qmTotal   = null;
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
      _offset = 0; _qmTotal = null;
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
        // No `type` here: it is a field INSIDE the data jsonb (see qmSave, which
        // writes it into `data`, and the edit form, which reads it as q.type),
        // never a column on questions. Selecting it made PostgREST fail the whole
        // query with "column questions.type does not exist" - and the list does
        // not render it anyway.
        .select('id,subject_id,chapter_id,difficulty,data,protected', { count: 'exact' })
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

      const { data, error, count } = await q;

      if (error) {
        _el('qm-list').innerHTML = `<p class="text-sm text-red-500 p-4">Error: ${error.message}</p>`;
        return;
      }

      const rows = data || [];
      // Updated on EVERY page, not just the first. It used to be inside
      // `if (replace)`, so after a Load more the line still reported the first
      // page's numbers while the list underneath had grown.
      _qmTotal = (typeof count === 'number') ? count : _qmTotal;
      _setCount('qm-count', _offset + rows.length, _qmTotal, 'questions');

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

  // ══════════════════════════════════════════════
  //  Credit shop settings + security log
  //
  //  These write mm_data.shop_settings, which is admin-only under RLS and is
  //  the row purchase_chapter() reads its prices out of. Editing a number here
  //  changes what the SERVER charges; editing one in a parent's devtools
  //  changes what their screen says and nothing else.
  // ══════════════════════════════════════════════
  let _shop = null;

  // ⚠ Keep in step with the defaults row at the bottom of
  // supabase-credits-shop.sql AND with the fallbacks each SQL function uses.
  // These three copies exist because the value has to be readable before the
  // settings row loads (here), when the row is missing entirely (the SQL
  // coalesce), and in the browser's own shop UI (engine/shop.js).
  const SHOP_DEFAULTS = {
    shop_enabled: true, referral_earning_enabled: true,
    referral_credits: 15, default_chapter_price: 250, default_subject_price: 1500,
    entitlement_days: 30, subject_prices: {},
    min_account_age_minutes: 0, max_credited_referrals: 0, activation_burst_limit: 8,
    chapter_prices: {}, catalog: [],
  };

  async function loadShopSettings() {
    if (!_sb) return;
    const { data } = await _sb.from('mm_data').select('value').eq('key', 'shop_settings').maybeSingle();
    _shop = Object.assign({}, SHOP_DEFAULTS, data?.value || {});
    _renderShopSettings();
  }

  async function _saveShop() {
    if (!_sb) return { ok: false };
    const { error } = await _sb.from('mm_data')
      .upsert({ key: 'shop_settings', value: _shop, updated_at: new Date().toISOString() });
    if (error) { console.error('[Admin._saveShop]', error.message); return { ok: false, error: error.message }; }
    return { ok: true };
  }

  function _renderShopSettings() {
    if (!_shop) return;
    const set   = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
    const check = (id, v) => { const el = document.getElementById(id); if (el) el.checked = v; };
    check('admin-shop-enabled', _shop.shop_enabled !== false);
    check('admin-shop-earning', _shop.referral_earning_enabled !== false);
    set('admin-shop-refcredits', _shop.referral_credits);
    set('admin-shop-price',      _shop.default_chapter_price);
    set('admin-shop-subjprice', _shop.default_subject_price);
    set('admin-shop-days',       _shop.entitlement_days);
    set('admin-shop-minage',     _shop.min_account_age_minutes);
    set('admin-shop-maxrefs',    _shop.max_credited_referrals);
    set('admin-shop-burst',      _shop.activation_burst_limit);
    _renderShopPreview();
    renderShopPrices();
  }

  // The one number an admin actually wants when tuning this: how many people a
  // parent has to invite to afford one chapter. 15 credits against a 250 price
  // is seventeen successful referrals, which is easy to set by accident.
  //
  // Reads the FIELDS, not the saved settings, so it updates as the numbers are
  // typed — the point is to see the consequence before pressing Save.
  function previewShopEconomy() { _renderShopPreview(true); }

  function _renderShopPreview(fromFields) {
    const el = document.getElementById('admin-shop-preview');
    if (!el) return;
    // ⚠ No `!_shop` guard. When called from an input handler this reads the
    // FIELDS, which are on screen whether or not the settings row has loaded —
    // requiring _shop made the preview silently do nothing on a database with
    // no shop_settings row yet, which is exactly when an admin is setting the
    // numbers for the first time.
    const cfg = _shop || SHOP_DEFAULTS;
    const field = (id, fallback) => {
      if (!fromFields) return fallback;
      const n = parseInt(document.getElementById(id)?.value, 10);
      return Number.isFinite(n) ? n : fallback;
    };
    const per   = field('admin-shop-refcredits', Number(cfg.referral_credits)) || 0;
    const price = field('admin-shop-price', Number(cfg.default_chapter_price)) || 0;
    const days  = field('admin-shop-days', Number(cfg.entitlement_days)) || 30;
    if (per <= 0) {
      el.textContent = 'Referrals earn nothing at this rate, so no chapter can be bought with credits.';
      return;
    }
    const need = Math.ceil(price / per);
    el.innerHTML = `At <b>${per}</b> credits per referral and <b>${price}</b> per chapter, a parent needs `
      + `<b>${need}</b> successful referral${need === 1 ? '' : 's'} to unlock one chapter for `
      + `<b>${days}</b> days.`;
  }

  function _allChapters() {
    if (typeof SUBJECT_PACKS === 'undefined') return [];
    const out = [];
    SUBJECT_PACKS.forEach(p => (p._chapters || p.chapters || []).forEach(ch => out.push({
      id: ch.id, name: ch.name, icon: ch.icon || '📘',
      // subjectId is the PACK id and is what purchase_subject() matches on;
      // subject is the human label. They were one field until subjects became
      // buyable, and conflating them meant the database had only a display
      // string to group chapters by.
      subjectId: p.id,
      subject: `Grade ${p.grade} ${p.subject || p.name || ''}`.trim(),
    })));
    return out;
  }

  function _allSubjects() {
    if (typeof SUBJECT_PACKS === 'undefined') return [];
    return SUBJECT_PACKS.map(p => ({
      id: p.id,
      name: `Grade ${p.grade} ${p.subject || p.name || ''}`.trim(),
      icon: p.icon || '📚',
      chapters: (p._chapters || p.chapters || []).length,
    }));
  }

  function renderSubjectPrices() {
    const box = document.getElementById('admin-shop-subjprices');
    if (!box || !_shop) return;
    const rows = _allSubjects();
    if (!rows.length) { box.innerHTML = '<p class="text-xs text-gray-400 py-3 text-center">No subject packs loaded.</p>'; return; }
    box.innerHTML = rows.map(sub => `
      <div class="flex items-center gap-2 py-1.5">
        <span class="select-none">${sub.icon}</span>
        <div class="flex-1 min-w-0">
          <div class="text-xs font-semibold text-gray-800 dark:text-gray-100 truncate">${_esc(sub.name)}</div>
          <div class="text-[10px] text-gray-400">${sub.chapters} chapters</div>
        </div>
        <input type="number" min="0" max="1000000" placeholder="${_shop.default_subject_price}"
          value="${_shop.subject_prices?.[sub.id] ?? ''}"
          onchange="AdminPanel.setSubjectPrice('${sub.id}', this.value)"
          class="w-24 text-xs border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 dark:text-white">
      </div>`).join('');
  }

  async function setSubjectPrice(subjectId, value) {
    if (!_shop) return;
    const prev = JSON.stringify(_shop);
    if (!_shop.subject_prices) _shop.subject_prices = {};
    const n = parseInt(value, 10);
    if (value === '' || !Number.isFinite(n) || n < 0) delete _shop.subject_prices[subjectId];
    else _shop.subject_prices[subjectId] = n;
    const res = await _saveShop();
    if (!res.ok) { _shop = JSON.parse(prev); renderSubjectPrices(); }
    toast(res.ok ? 'Subject price saved.' : 'Could not save — NOT applied.', res.ok ? 1800 : 4000);
  }

  function renderShopPrices() {
    renderSubjectPrices();
    const box = document.getElementById('admin-shop-prices');
    if (!box || !_shop) return;
    const q = (document.getElementById('admin-shop-search')?.value || '').trim().toLowerCase();
    const rows = _allChapters().filter(c => !q || (c.name + ' ' + c.subject).toLowerCase().includes(q));
    if (!rows.length) {
      box.innerHTML = '<p class="text-xs text-gray-400 py-3 text-center">No chapter matches.</p>';
      return;
    }
    box.innerHTML = rows.slice(0, 400).map(c => `
      <div class="flex items-center gap-2 py-1.5">
        <span class="select-none">${c.icon}</span>
        <div class="flex-1 min-w-0">
          <div class="text-xs font-semibold text-gray-800 dark:text-gray-100 truncate">${_esc(c.name)}</div>
          <div class="text-[10px] text-gray-400 truncate">${_esc(c.subject)}</div>
        </div>
        <input type="number" min="0" max="1000000" placeholder="${_shop.default_chapter_price}"
          value="${_shop.chapter_prices?.[c.id] ?? ''}"
          onchange="AdminPanel.setChapterPrice('${c.id}', this.value)"
          class="w-24 text-xs border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 dark:text-white">
      </div>`).join('');
  }

  async function setChapterPrice(chapterId, value) {
    if (!_shop) return;
    const prev = JSON.stringify(_shop);
    if (!_shop.chapter_prices) _shop.chapter_prices = {};
    const n = parseInt(value, 10);
    // Blank clears the override rather than storing 0 — "free" and "use the
    // default" are different things and storing 0 for a cleared field would
    // silently give every chapter away.
    if (value === '' || !Number.isFinite(n) || n < 0) delete _shop.chapter_prices[chapterId];
    else _shop.chapter_prices[chapterId] = n;
    const res = await _saveShop();
    if (!res.ok) { _shop = JSON.parse(prev); renderShopPrices(); }
    toast(res.ok ? 'Price saved.' : 'Could not save — NOT applied.', res.ok ? 1800 : 4000);
  }

  async function saveShopBasics() {
    if (!_shop) return;
    const num = (id, min, max, fallback) => {
      const n = parseInt(document.getElementById(id)?.value, 10);
      return Number.isFinite(n) && n >= min && n <= max ? n : fallback;
    };
    const prev = JSON.stringify(_shop);
    _shop.referral_credits         = num('admin-shop-refcredits', 0, 10000, SHOP_DEFAULTS.referral_credits);
    _shop.default_chapter_price    = num('admin-shop-price', 0, 1000000, SHOP_DEFAULTS.default_chapter_price);
    _shop.default_subject_price    = num('admin-shop-subjprice', 0, 1000000, SHOP_DEFAULTS.default_subject_price);
    _shop.entitlement_days         = num('admin-shop-days', 1, 3650, SHOP_DEFAULTS.entitlement_days);
    _shop.min_account_age_minutes  = num('admin-shop-minage', 0, 100000, SHOP_DEFAULTS.min_account_age_minutes);
    _shop.max_credited_referrals   = num('admin-shop-maxrefs', 0, 100000, SHOP_DEFAULTS.max_credited_referrals);
    _shop.activation_burst_limit   = num('admin-shop-burst', 1, 10000, SHOP_DEFAULTS.activation_burst_limit);
    _shop.referral_earning_enabled = !!document.getElementById('admin-shop-earning')?.checked;
    const res = await _saveShop();
    if (!res.ok) _shop = JSON.parse(prev);
    _renderShopSettings();
    toast(res.ok ? 'Shop settings saved.' : 'Could not save — NOT applied.', res.ok ? 2500 : 4000);
  }

  async function setShopEnabled(on) {
    if (!_shop) return;
    const prev = JSON.stringify(_shop);
    _shop.shop_enabled = !!on;
    const res = await _saveShop();
    if (!res.ok) { _shop = JSON.parse(prev); _renderShopSettings(); }
    toast(res.ok ? (on ? 'Shop opened.' : 'Shop closed.') : 'Could not save — NOT applied.', res.ok ? 2500 : 4000);
  }

  // Writes the chapter list this browser has loaded into shop_settings.catalog.
  // purchase_chapter() then refuses anything not in it — which is what stops a
  // crafted RPC call from creating an entitlement row for a made-up id.
  async function publishCatalog() {
    if (!_shop) return;
    const cat = _allChapters().map(c => ({ id: c.id, name: c.name, subject: c.subjectId, subjectName: c.subject }));
    if (!cat.length) { toast('No subject packs loaded — cannot publish.', 3500); return; }
    const prev = JSON.stringify(_shop);
    _shop.catalog = cat;
    const res = await _saveShop();
    if (!res.ok) _shop = JSON.parse(prev);
    toast(res.ok ? `Catalogue published — ${cat.length} chapters.` : 'Could not save — NOT applied.', res.ok ? 3000 : 4000);
  }

  async function loadSecurityEvents() {
    const box = document.getElementById('admin-security-list');
    if (!box || !_sb) return;
    box.innerHTML = '<p class="text-xs text-gray-400 py-3 text-center">Loading…</p>';
    const { data, error } = await _sb.rpc('admin_security_events', { p_limit: 100 });
    if (error) {
      box.innerHTML = `<p class="text-xs text-gray-400 py-3 text-center">${
        error.code === 'PGRST202' ? 'Run supabase-credits-shop.sql to switch this on.' : 'Could not load.'}</p>`;
      return;
    }
    if (!data?.length) {
      box.innerHTML = '<p class="text-xs text-gray-400 py-3 text-center">Nothing logged. 👍</p>';
      return;
    }
    box.innerHTML = data.map(e => {
      const blocked = e.blocked_until && new Date(e.blocked_until) > new Date();
      const fromClient = String(e.kind).startsWith('client:');
      return `<div class="rounded-xl border ${fromClient
          ? 'border-gray-200 dark:border-gray-700'
          : 'border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-900/10'} px-3 py-2">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-xs font-bold ${fromClient ? 'text-gray-500' : 'text-amber-700 dark:text-amber-300'}">${_esc(e.kind)}</span>
          <span class="text-[10px] text-gray-400">${new Date(e.created_at).toLocaleString()}</span>
          ${blocked ? '<span class="text-[10px] font-bold text-red-500">BLOCKED</span>' : ''}
        </div>
        <div class="text-[11px] text-gray-600 dark:text-gray-300 mt-0.5 truncate">
          ${_esc(e.user_name || e.user_id || e.student_id || '—')}
        </div>
        <div class="text-[10px] text-gray-400 font-mono truncate">${_esc(JSON.stringify(e.detail || {}))}</div>
        ${e.user_id ? `<div class="flex gap-2 mt-1.5">
          <button onclick="AdminPanel.blockUser('${e.user_id}', 60)" class="text-[10px] font-semibold text-red-500 hover:text-red-700">Block 1h</button>
          <button onclick="AdminPanel.blockUser('${e.user_id}', 1440)" class="text-[10px] font-semibold text-red-500 hover:text-red-700">Block 24h</button>
          <button onclick="AdminPanel.blockUser('${e.user_id}', 0)" class="text-[10px] font-semibold text-green-600 hover:text-green-700">Unblock</button>
        </div>` : ''}
      </div>`;
    }).join('');
  }

  // Hand-adjust one account's balance: support, a refund, or clawing back a
  // farmed balance. Goes through admin_adjust_credits(), which writes the
  // ledger, so a manual change is as auditable as an earned one — there is
  // deliberately no path that moves credits without leaving a row behind.
  async function adjustCredits(userId) {
    if (!_sb) return;
    const raw = document.getElementById(`credits-delta-${userId}`)?.value;
    const n   = parseInt(raw, 10);
    if (!Number.isFinite(n) || n === 0) { toast('Enter an amount (use a minus sign to take credits away).', 3500); return; }
    const reason = (document.getElementById(`credits-reason-${userId}`)?.value || '').trim() || 'admin adjustment';

    const { data, error } = await _sb.rpc('admin_adjust_credits',
      { p_user: userId, p_delta: n, p_reason: reason });
    if (error || !data?.ok) {
      toast(error?.code === 'PGRST202' ? 'Run supabase-credits-shop.sql first.' : 'Could not adjust credits.', 4000);
      return;
    }
    const bal = document.getElementById(`credits-bal-${userId}`);
    if (bal) bal.textContent = data.balance;
    const row = _members.find(m => m.id === userId);
    if (row) row.credits = data.balance;
    const d = document.getElementById(`credits-delta-${userId}`);   if (d) d.value = '';
    const r = document.getElementById(`credits-reason-${userId}`);  if (r) r.value = '';
    toast(`${n > 0 ? '+' : ''}${n} credits — new balance ${data.balance}.`, 3000);
  }

  async function showCreditLedger(userId) {
    const box = document.getElementById(`credits-ledger-${userId}`);
    if (!box || !_sb) return;
    if (!box.classList.contains('hidden')) { box.classList.add('hidden'); return; }
    box.classList.remove('hidden');
    box.innerHTML = '<p class="text-xs text-gray-400 py-2">Loading…</p>';
    // credit_ledger's SELECT policy already allows is_admin(), so this needs no
    // RPC of its own.
    const { data, error } = await _sb.from('credit_ledger')
      .select('delta, balance_after, reason, created_at')
      .eq('user_id', userId).order('created_at', { ascending: false }).limit(30);
    if (error) { box.innerHTML = '<p class="text-xs text-gray-400 py-2">Could not load the ledger.</p>'; return; }
    if (!data?.length) { box.innerHTML = '<p class="text-xs text-gray-400 py-2">No credit movement yet.</p>'; return; }
    box.innerHTML = data.map(l => `
      <div class="flex items-center gap-2 text-[11px] py-1 border-b border-gray-100 dark:border-gray-700/60 last:border-0">
        <span class="font-black w-14 shrink-0 ${l.delta > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}">${l.delta > 0 ? '+' : ''}${l.delta}</span>
        <span class="flex-1 min-w-0 truncate text-gray-600 dark:text-gray-300">${_esc(l.reason)}</span>
        <span class="text-gray-400 shrink-0">= ${l.balance_after}</span>
        <span class="text-gray-400 shrink-0 hidden sm:inline">${new Date(l.created_at).toLocaleDateString()}</span>
      </div>`).join('');
  }

  async function blockUser(userId, minutes) {
    if (!_sb) return;
    const { data, error } = await _sb.rpc('admin_block_user',
      { p_user: userId, p_minutes: minutes, p_reason: 'admin panel' });
    if (error || !data?.ok) { toast('Could not apply that.', 3500); return; }
    toast(minutes ? `Blocked for ${minutes} minutes.` : 'Unblocked.', 2500);
    loadSecurityEvents();
  }

  return { render, showTab, loadMembers, loadMoreMembers, filterMembers, changeRole, toggleMemberRow,
    loadShopSettings, saveShopBasics, setShopEnabled, setChapterPrice, renderShopPrices,
    publishCatalog, loadSecurityEvents, blockUser, adjustCredits, showCreditLedger, previewShopEconomy,
    setSubjectPrice, renderSubjectPrices,
    loadTeacherQueue, setTeacherStatus, loadMoreTeachers, toggleDisable, toggleChildren, forceLogout, updateMemberName, setExpiry, setStudentExpiry, toggleGrade, toggleSubject, toggleRegistration, togglePlanEnforcement, loadStats, loadReports, loadMoreReports, resolveReport, loadRoles, loadMoreRoles, setRole, loadPlans, togglePlan, toggleAllChapters, togglePackAll, savePlanFeatures, showPlanHistory, assignPlan, createAccount, genPassword, toggleFamilyField, copyAccountDetails,
    loadTeachers, teacherApprove, teacherSuspend, teacherChangeTier,
    qmSearch: QM.qmSearch, qmLoadMore: QM.qmLoadMore, qmGradeFilter: QM.qmGradeFilter,
    qmOpenForm: QM.qmOpenForm, qmCloseForm: QM.qmCloseForm,
    qmFormGradeChange: QM.qmFormGradeChange, qmFormSubjectChange: QM.qmFormSubjectChange,
    qmFormChapterChange: QM.qmFormChapterChange, qmFormTypeChange: QM.qmFormTypeChange,
    qmUpdatePreview: QM.qmUpdatePreview, qmInsertImage: QM.qmInsertImage,
    qmUploadImage: QM.qmUploadImage, qmSave: QM.qmSave, qmDelete: QM.qmDelete,
    qmToggleProtection: QM.qmToggleProtection, qmResolveReport, applyFirstNChapters };
})();
