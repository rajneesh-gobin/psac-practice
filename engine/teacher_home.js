'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice - Teacher Home ("My classes")
//  The one place a teacher lands. It answers a single question - what needs me
//  today - and then shows the classes themselves, which TeacherGuestClasses
//  draws into #tc-list directly below this block.
//
//  ⚠ Home and the classroom screen used to be two dashboards with the same
//  greeting, the same "recent activity" and the same "needs help" panel, one
//  scoped to everything and one to a class. A teacher could not tell which
//  they were on. Home is now the only cross-class surface, and it asks
//  TeacherInsights.todo() the same question a classroom asks, so the two can
//  never answer it differently.
//
//  ⚠ A failed refresh never blanks a Home that already has data: the last
//  good picture stays on screen with a "could not refresh" line and a Retry.
// ══════════════════════════════════════════════

const TeacherHome = (() => {
  const el = id => document.getElementById(id);
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const I = () => (typeof TeacherInsights !== 'undefined' ? TeacherInsights : null);

  let _epoch = 0;
  let _last = null;          // last successfully built picture
  let _loading = false;
  let _groups = [];          // assignment + rows, kept so a to-do button can act

  function _dayPart() {
    const h = new Date().getHours();
    return h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening';
  }

  function _teacherName() {
    const p = (typeof Auth !== 'undefined' && Auth.getParentProfile) ? Auth.getParentProfile() : null;
    const name = (p && (p.full_name || p.display_name)) || '';
    return String(name).trim().split(/\s+/).slice(0, 2).join(' ');
  }

  function _skeleton() {
    return `<div class="th-skeleton" aria-hidden="true">
      <div class="th-sk-line th-sk-wide"></div><div class="th-sk-line"></div>
      <div class="th-sk-cards"><div></div><div></div><div></div></div>
    </div>`;
  }

  async function render(opts = {}) {
    const root = el('ta-home');
    if (!root) return;
    const token = ++_epoch;
    if (!_last) root.innerHTML = _skeleton();
    else if (opts.silent !== true) _paint(_last, { refreshing: true });
    _loading = true;
    try {
      const ws = typeof TeacherWorkspace !== 'undefined' ? TeacherWorkspace : null;
      const gc = typeof TeacherGuestClasses !== 'undefined' ? TeacherGuestClasses : null;
      const [classes, assignments] = await Promise.all([
        gc && gc.ready ? gc.ready().catch(() => gc.getClasses()) : Promise.resolve(gc ? gc.getClasses() : []),
        ws && ws.ensureLoaded ? ws.ensureLoaded() : Promise.resolve([]),
      ]);
      if (token !== _epoch) return;
      const ins = I();
      const active = assignments.filter(a => ins ? ins.isActive(a) : a.status === 'active');
      const sample = active.slice(0, 8);
      const groups = await Promise.all(sample.map(async a => {
        try { return { assignment: a, rows: ws && ws.fetchResults ? await ws.fetchResults(a.id) : [] }; }
        catch (_) { return { assignment: a, rows: null }; }
      }));
      if (token !== _epoch) return;
      _groups = groups.filter(g => Array.isArray(g.rows));
      _last = _build({ classes, assignments, active, groups });
      _paint(_last, {});
    } catch (e) {
      if (token !== _epoch) return;
      if (_last) _paint(_last, { error: true });
      else root.innerHTML = `<div class="th-error"><p>We could not load your classes. Nothing has been changed or lost.</p><button type="button" class="th-retry" onclick="TeacherHome.render()">Try again</button></div>`;
    } finally { if (token === _epoch) _loading = false; }
  }

  function _build({ classes, assignments, active, groups }) {
    const ins = I();
    const known = groups.filter(g => Array.isArray(g.rows));
    // The classroom's own Today list calls this with its own groups. Same
    // function, same thresholds, so the two surfaces cannot disagree.
    const todos = ins && ins.todo ? ins.todo(known, { showClass: true }) : [];
    return {
      classes: (classes || []).filter(c => c.active),
      assignments, active, todos,
      sampled: known.length, unknown: groups.length - known.length,
    };
  }

  function _summaryLine(d) {
    const bits = [];
    if (d.active.length) bits.push(`${d.active.length} piece${d.active.length === 1 ? '' : 's'} of work running`);
    const jobs = d.todos.filter(t => t.priority > 1).length;
    if (jobs) bits.push(`${jobs} thing${jobs === 1 ? '' : 's'} need${jobs === 1 ? 's' : ''} you`);
    else if (d.sampled) bits.push('nothing needs you right now');
    if (!bits.length) bits.push(d.classes.length ? 'no work set yet' : 'no classes yet');
    return bits.join(' · ');
  }

  function _todoRow(t, i) {
    return `<div class="th-todo th-todo-${esc(t.kind)}">
      <span class="th-todo-ico" aria-hidden="true">${t.icon}</span>
      <div class="th-todo-main"><strong>${esc(t.title)}</strong><small>${esc(t.detail)}</small></div>
      <button type="button" class="th-todo-btn" onclick="TeacherHome.doTodo(${i})">${esc(t.actionLabel)}</button>
    </div>`;
  }

  function _todoEmpty(d) {
    if (!d.classes.length) return `<div class="th-empty"><p>Create your first class. Your pupils will not need an account, an email address or a password - only the four-digit PIN you give them.</p><button type="button" onclick="NewClassroomForm.open()">🏫 Create a class →</button></div>`;
    if (!d.active.length) return `<div class="th-empty"><p>No work is running yet. Open a class below and set the first piece - it takes about a minute.</p></div>`;
    if (!d.sampled) return `<div class="th-empty"><p>Nothing has come back yet. As soon as a pupil answers, what needs you will appear here.</p></div>`;
    return `<div class="th-empty th-empty-good"><p>✓ Nothing needs you right now.</p><small>Everyone is on track in the ${d.sampled} piece${d.sampled === 1 ? '' : 's'} of work checked. Pupils appear here only after enough answers to be sure.</small></div>`;
  }

  function _paint(d, state) {
    const root = el('ta-home');
    if (!root) return;
    const name = _teacherName();
    const shown = d.todos.slice(0, 6);

    root.innerHTML = `
      <div class="th-hero">
        <div>
          <span class="th-kicker">${state.refreshing ? 'Refreshing…' : state.error ? 'Showing what loaded last time' : 'Your day at a glance'}</span>
          <h3>Good ${_dayPart()}${name ? ', ' + esc(name) : ''} 👋</h3>
          <p>${esc(_summaryLine(d))}${d.unknown ? ` · ${d.unknown} piece${d.unknown === 1 ? '' : 's'} could not be checked` : ''}</p>
        </div>
        <button type="button" class="th-refresh" onclick="TeacherHome.render()" ${state.refreshing ? 'disabled' : ''} aria-label="Refresh">↻ Refresh</button>
      </div>
      ${state.error ? `<div class="th-error th-error-inline"><p>Could not refresh just now. Nothing has been lost.</p><button type="button" class="th-retry" onclick="TeacherHome.render()">Try again</button></div>` : ''}
      <section class="th-today" aria-label="What needs you today">
        <div class="th-today-head"><h4>🔔 What needs you today</h4>${d.todos.length > shown.length ? `<small>showing ${shown.length} of ${d.todos.length}</small>` : ''}</div>
        ${shown.length ? shown.map(_todoRow).join('') : _todoEmpty(d)}
      </section>
      <div class="th-classes-head">
        <h4>🏫 Your classes</h4>
        <p>Open a class to set work, see who has finished and manage pupils and PINs.</p>
      </div>`;
  }

  // ⚠ The button does exactly what its label says. "Send a reminder" opens the
  // share sheet with the message already written; "Set easier practice" opens
  // Set Work already pointed at the same chapters and the same pupils.
  function doTodo(i) {
    const t = _last && _last.todos ? _last.todos[i] : null;
    if (!t) return;
    const g = _groups.find(x => x.assignment && x.assignment.id === t.assignmentId);
    const a = g && g.assignment;
    if (!a) return;
    const ws = typeof TeacherWorkspace !== 'undefined' ? TeacherWorkspace : null;
    if (t.action === 'remind' && ws && ws.remind) { ws.remind(a, g.rows || []); return; }
    if (t.action === 'practice' && typeof TeacherMode !== 'undefined' && TeacherMode.prefillPractice) {
      TeacherMode.prefillPractice({ classroomId: a.classroom_id, packId: a.subject_pack_id,
        chapterIds: a.chapter_ids || [], pupilKeys: t.pupilKeys, label: `Easier practice: ${a.title}`.slice(0, 60) });
      return;
    }
    if (ws && ws.openResults) ws.openResults(t.assignmentId);
  }

  function reset() { _epoch++; _last = null; _groups = []; _loading = false; const root = el('ta-home'); if (root) root.innerHTML = ''; }
  function invalidate() { _last = null; }

  if (typeof _sb !== 'undefined' && _sb && _sb.auth && _sb.auth.onAuthStateChange) {
    _sb.auth.onAuthStateChange(event => { if (event === 'SIGNED_OUT') reset(); });
  }

  return { render, reset, invalidate, doTodo, _build, _paint };
})();
if (typeof window !== 'undefined') window.TeacherHome = TeacherHome;
