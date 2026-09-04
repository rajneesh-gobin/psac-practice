'use strict';
const TeacherGuestClasses = (() => {
  const el = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let classes = [], pupils = [], current = '', epoch = 0, rosterRequest = 0, identity = null;
  async function call(action, extra = {}) {
    const { data, error } = await _sb.rpc('teacher_guest_manage', { p_action: action, ...extra });
    if (error || !data?.ok) throw new Error(error?.message || 'Action failed');
    return data;
  }
  function notice(text) { if (el('tc-status')) el('tc-status').textContent = text; }
  function reset() {
    epoch++; rosterRequest++; classes = []; pupils = []; current = '';
    for (const id of ['tc-list','tc-roster','tc-workspace','ta-classroom']) el(id)?.replaceChildren();
    notice('');
  }
  async function refresh() {
    const token = ++epoch;
    notice('Loading classrooms…');
    try {
      const session = await _sb.auth.getSession();
      if (token !== epoch) return;
      const uid = session.data?.session?.user?.id;
      if (!uid || !Auth.isTeacher()) throw new Error('Teacher access required');
      if (identity && identity !== uid) { current = ''; pupils = []; }
      identity = uid;
      const data = await call('list');
      if (token !== epoch) return;
      classes = data.classes;
      const select = el('ta-classroom'), keep = select?.value;
      if (select) {
        select.innerHTML = '<option value="">Standalone — not tied to a classroom</option>' + classes.filter(c => c.active).map(c => `<option value="${esc(c.id)}">${esc(c.name)} (${c.pupils} pupils)</option>`).join('');
        if (classes.some(c => c.active && c.id === keep)) select.value = keep;
      }
      el('tc-list').innerHTML = classes.map((c,i) => `<div class="p-3 border rounded-xl dark:border-gray-600 mb-2"><strong>${esc(c.name)}</strong> · ${c.pupils} active pupils ${c.active ? '' : '(Archived)'}
        <div class="flex flex-wrap gap-2"><button data-open="${i}" class="p-2 text-blue-600">Open classroom</button><button data-rename="${i}" class="p-2 text-blue-600">Rename</button><button data-archive="${i}" class="p-2 text-blue-600">${c.active ? 'Archive' : 'Restore'}</button></div></div>`).join('');
      el('tc-list').querySelectorAll('[data-open]').forEach(b => b.onclick = () => open(classes[Number(b.dataset.open)].id));
      el('tc-list').querySelectorAll('[data-rename]').forEach(b => b.onclick = () => renameClass(classes[Number(b.dataset.rename)]));
      el('tc-list').querySelectorAll('[data-archive]').forEach(b => b.onclick = () => mutate('toggle_class', {p_classroom: classes[Number(b.dataset.archive)].id}, b));
      notice(classes.length ? '' : 'Create a classroom, then add pupils. They do not need an account.');
      if (current) await open(current);
    } catch (_) {
      if (token !== epoch) return;
      notice('Could not load classrooms. Check your connection. An administrator must apply the guest-classrooms migration before first use.');
    }
  }
  async function mutate(action, extra, button) {
    const token = epoch;
    if (button) button.disabled = true;
    try {
      const data = await call(action, extra);
      if (token !== epoch) return;
      if (data.pin) alert(`Private pupil PIN: ${data.pin}\nGive this only to the pupil, not the class group.`);
      await refresh();
    } catch (e) { if (token === epoch) notice(e.message); }
    finally { if (button) button.disabled = false; }
  }
  function create(button) {
    const name = el('tc-name').value.trim();
    if (!name) { notice('Enter a classroom name first.'); return; }
    return mutate('create_class', {p_name:name}, button);
  }
  function renameClass(c) {
    const name = prompt('Classroom name:', c.name);
    if (name?.trim()) mutate('rename_class',{p_classroom:c.id,p_name:name.trim()});
  }
  async function open(id) {
    current = id; const token = epoch, serial = ++rosterRequest;
    TeacherWorkspace.openClass(id, classes.find(c=>c.id===id)?.name || 'Classroom');
    el('tc-roster').textContent = 'Loading pupils…';
    try {
      const data = await call('roster',{p_classroom:id});
      if (token !== epoch || serial !== rosterRequest) return;
      pupils = data.pupils;
      el('tc-roster').innerHTML = `<h3 class="font-bold mt-4">${esc(classes.find(c=>c.id===id)?.name)} — guest pupils</h3>
        <p class="text-sm my-2">PINs are private. Share each PIN individually. Removing a pupil disables access but keeps past results.</p>
        <label for="tc-pupil-name">Pupil name</label><input id="tc-pupil-name" maxlength="40" class="border rounded p-2 dark:bg-gray-700" placeholder="Pupil name">
        <button id="tc-add" class="p-2 text-blue-600">Add pupil</button>
        ${pupils.map((p,i)=>`<div class="border rounded-xl p-3 my-2 dark:border-gray-600"><strong>${esc(p.name)}</strong> ${p.active?'':'(Removed)'}
          <div class="flex flex-wrap gap-2"><button data-pupil="${i}" data-action="reveal_pin" class="p-2 text-blue-600">Show PIN</button><button data-pupil="${i}" data-action="reset_pin" class="p-2 text-blue-600">Reset PIN</button><button data-pupil="${i}" data-action="rename_pupil" class="p-2 text-blue-600">Rename</button><button data-pupil="${i}" data-action="toggle_pupil" class="p-2 text-blue-600">${p.active?'Remove':'Restore'}</button></div></div>`).join('')}`;
      el('tc-add').onclick = e => {
        const name=el('tc-pupil-name').value.trim();
        if (name) mutate('add_pupil',{p_classroom:id,p_name:name},e.currentTarget);
      };
      el('tc-roster').querySelectorAll('[data-pupil]').forEach(b => b.onclick = () => {
        const p = pupils[Number(b.dataset.pupil)], action=b.dataset.action;
        const args = {p_classroom:id,p_id:p.id};
        if (action==='rename_pupil') { const name=prompt('Pupil name:',p.name); if (!name?.trim()) return; args.p_name=name.trim(); }
        if (action==='reset_pin' && !confirm('Replace this pupil’s PIN? The previous PIN will stop working.')) return;
        if (action==='toggle_pupil' && p.active && !confirm('Remove access for this pupil? Past results will be kept.')) return;
        mutate(action,args,b);
      });
    } catch (_) { if (token===epoch && serial===rosterRequest) el('tc-roster').textContent='Could not load pupils. Select the classroom to try again.'; }
  }
  function accessChanged() {
    const mode=el('ta-access').value;
    el('ta-classroom-wrap').hidden=mode==='legacy';
    el('ta-legacy-pin-wrap').hidden=mode!=='legacy';
    el('ta-access-help').textContent=mode==='classroom_pin'
      ? 'One link for the class. Each pupil enters their own 4-digit PIN. Only pupils currently in this class are included when you create the assignment.'
      : mode==='nickname' ? 'Anyone with the link can enter a nickname. Save it under a classroom (even with no pupils), or leave it standalone. Nicknames are unverified; no classroom leaderboard.'
      : 'Existing sharing style: pupils enter a name and a shared assignment PIN.';
  }
  function createAssignment(id) {
    const c=classes.find(c=>c.id===id);
    if (!c?.active) { notice('Restore this classroom before creating homework.'); return; }
    TeacherMode.switchTab('create');
    el('ta-classroom').value=id;
    el('ta-access').value=Number(c.pupils)>0 ? 'classroom_pin' : 'nickname';
    accessChanged();
    el('ta-label')?.focus();
  }
  if (typeof _sb !== 'undefined' && _sb) _sb.auth.onAuthStateChange((event,session) => {
    if (event==='SIGNED_OUT' || (identity && identity !== session?.user?.id)) reset();
    identity = session?.user?.id || null;
  });
  return { refresh, create, accessChanged, reset, createAssignment };
})();
