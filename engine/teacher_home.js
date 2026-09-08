'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice - Teacher Home
//  The first thing a teacher sees. It answers three questions - what needs
//  my attention, what work is active, what should I do next - and offers
//  three big actions. It draws from data TeacherWorkspace and
//  TeacherGuestClasses already load; the only extra network work is the
//  per-assignment results it needs for "due soon" counts and "may need help".
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

  function _dayPart() {
    const h = new Date().getHours();
    return h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening';
  }

  function _teacherName() {
    const p = (typeof Auth !== 'undefined' && Auth.getParentProfile) ? Auth.getParentProfile() : null;
    const name = (p && (p.full_name || p.display_name)) || '';
    return String(name).trim().split(/\s+/).slice(0, 2).join(' ');
  }

  function _packName(id) {
    const packs = typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [];
    const p = packs.find(x => x.id === id);
    return p ? `${p.icon || ''} ${p.name}`.trim() : String(id || '').replace(/^grade(\d+)-/, 'G$1 ').replace(/-/g, ' ');
  }

  function _skeleton() {
    return `<div class="th-skeleton" aria-hidden="true">
      <div class="th-sk-line th-sk-wide"></div><div class="th-sk-line"></div>
      <div class="th-sk-actions"><div></div><div></div><div></div></div>
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
      _last = _build({ classes, assignments, active, groups });
      _paint(_last, {});
    } catch (e) {
      if (token !== _epoch) return;
      if (_last) _paint(_last, { error: true });
      else root.innerHTML = `<div class="th-error"><p>We could not load your overview. Your classrooms and work have not been changed.</p><button type="button" class="th-retry" onclick="TeacherHome.render()">Try again</button></div>`;
    } finally { if (token === _epoch) _loading = false; }
  }

  function _build({ classes, assignments, active, groups }) {
    const ins = I();
    const classById = new Map((classes || []).map(c => [c.id, c]));
    const known = groups.filter(g => Array.isArray(g.rows));
    const rollup = ins ? ins.pupilRollup(known) : new Map();
    const help = [...rollup.values()].filter(p => p.needsHelp).sort((a, b) => (b.low + b.overdueMissing) - (a.low + a.overdueMissing));
    const recent = known.flatMap(g => g.rows.filter(r => r.submitted_at).map(r => ({ ...r, title: g.assignment.title, assignmentId: g.assignment.id })))
      .sort((a, b) => Date.parse(b.submitted_at) - Date.parse(a.submitted_at)).slice(0, 5);
    const dueSoon = active.filter(a => ins ? ins.dueSoon(a) : false)
      .sort((a, b) => Date.parse(a.expires_at) - Date.parse(b.expires_at));
    const upcoming = (dueSoon.length ? dueSoon : active.slice().sort((a, b) => Date.parse(a.expires_at || 0) - Date.parse(b.expires_at || 0))).slice(0, 4)
      .map(a => {
        const g = groups.find(x => x.assignment.id === a.id);
        const rows = g && Array.isArray(g.rows) ? g.rows : null;
        const cls = classById.get(a.classroom_id);
        const total = rows ? rows.length : (a.access_mode === 'classroom_pin' && cls ? Number(cls.pupils || 0) : null);
        const done = rows ? rows.filter(r => r.submitted_at).length : Number(a.submissions || 0);
        return { a, total, done, className: a.classroom_name || (cls && cls.name) || '' };
      });
    return { classes: (classes || []).filter(c => c.active), assignments, active, help, recent, upcoming, dueSoonCount: dueSoon.length,
      sampled: known.length, unknown: groups.length - known.length };
  }

  function _paint(d, state) {
    const root = el('ta-home');
    if (!root) return;
    const ins = I();
    const name = _teacherName();
    const parts = [];
    parts.push(`${d.active.length} assignment${d.active.length === 1 ? '' : 's'} active`);
    if (d.help.length) parts.push(`${d.help.length} pupil${d.help.length === 1 ? '' : 's'} may need help`);
    else if (d.sampled) parts.push('nobody needs help right now');
    if (d.dueSoonCount) parts.push(`${d.dueSoonCount} due within 2 days`);
    const oneClass = d.classes.length === 1 ? d.classes[0] : null;

    const actions = `
      <div class="th-actions" aria-label="Main actions">
        <button type="button" class="th-action th-action-primary" onclick="TeacherMode.switchTab('create')"><span aria-hidden="true">✏️</span><strong>Set new work</strong><small>Homework or a quick test in under a minute</small></button>
        <button type="button" class="th-action" onclick="TeacherMode.switchTab('results')"><span aria-hidden="true">📊</span><strong>Check submissions</strong><small>See who has finished and who needs help</small></button>
        <button type="button" class="th-action" onclick="${oneClass ? `TeacherGuestClasses.openById('${esc(oneClass.id)}')` : "TeacherMode.switchTab('classes')"}"><span aria-hidden="true">🏫</span><strong>Open a classroom</strong><small>${oneClass ? esc(oneClass.name) : d.classes.length ? `${d.classes.length} classrooms` : 'Create your first classroom'}</small></button>
      </div>`;

    const dueCard = `
      <section class="th-card">
        <div class="th-card-head"><h4>⏰ Work due soon</h4>${d.active.length ? `<button type="button" onclick="TeacherMode.switchTab('results')">All results</button>` : ''}</div>
        ${!d.upcoming.length ? `<div class="th-empty"><p>${d.classes.length ? 'No work is active right now.' : 'Create a classroom, then set your first piece of work.'}</p><button type="button" onclick="${d.classes.length ? "TeacherMode.switchTab('create')" : "TeacherMode.switchTab('classes')"}">${d.classes.length ? 'Set work →' : 'Create a classroom →'}</button></div>`
        : d.upcoming.map(u => `
          <div class="th-row">
            <div class="th-row-main"><strong>${esc(u.a.title)}</strong><small>${esc(u.className || 'Open link')} · ${esc(_packName(u.a.subject_pack_id))} · ${esc(ins ? ins.dueLabel(u.a.expires_at) : '')}</small></div>
            <span class="th-chip ${u.total && u.done >= u.total ? 'th-chip-good' : ''}">${u.total ? `${u.done} of ${u.total} completed` : `${u.done} completed`}</span>
            <button type="button" class="th-row-btn" onclick="TeacherWorkspace.openResults('${esc(u.a.id)}')">View results</button>
          </div>`).join('')}
      </section>`;

    const helpCard = `
      <section class="th-card">
        <div class="th-card-head"><h4>🙋 Pupils who may need help</h4></div>
        ${!d.sampled ? `<div class="th-empty"><p>${d.active.length ? 'Results will appear here once pupils start submitting.' : 'Set some work and this card will tell you who needs a hand.'}</p></div>`
        : !d.help.length ? `<div class="th-empty th-empty-good"><p>✓ Nothing to worry about in the ${d.sampled} assignment${d.sampled === 1 ? '' : 's'} checked.</p><small>Pupils appear here only after enough answers to be sure.</small></div>`
        : d.help.slice(0, 5).map(p => `
          <div class="th-row">
            <span class="th-avatar" aria-hidden="true">${esc(String(p.name).trim().charAt(0).toUpperCase() || '?')}</span>
            <div class="th-row-main"><strong>${esc(p.name)}</strong><small>${esc(p.reason || 'Needs a closer look')}</small></div>
            <button type="button" class="th-row-btn" onclick="TeacherMode.switchTab('results')">See work</button>
          </div>`).join('')}
        ${d.help.length > 5 ? `<p class="th-more">and ${d.help.length - 5} more - open Results for the full list.</p>` : ''}
      </section>`;

    const recentCard = `
      <section class="th-card">
        <div class="th-card-head"><h4>⚡ Recent submissions</h4></div>
        ${!d.recent.length ? `<div class="th-empty"><p>No submissions yet. New ones appear here as pupils finish.</p></div>`
        : d.recent.map(r => `
          <div class="th-row">
            <span class="th-avatar" aria-hidden="true">${esc(String(r.name || '?').trim().charAt(0).toUpperCase() || '?')}</span>
            <div class="th-row-main"><strong>${esc(r.name || 'Pupil')}</strong><small>${esc(r.title)} · ${esc(r.score)}/${esc(r.total)} (${esc(r.pct)}%)</small></div>
            <time>${esc(ins ? ins.relativeTime(r.submitted_at) : '')}</time>
          </div>`).join('')}
      </section>`;

    root.innerHTML = `
      <div class="th-hero">
        <div>
          <span class="th-kicker">${state.refreshing ? 'Refreshing…' : state.error ? 'Showing the last good overview' : 'Your day at a glance'}</span>
          <h3>Good ${_dayPart()}${name ? ', ' + esc(name) : ''} 👋</h3>
          <p>${esc(parts.join(' · '))}${d.unknown ? ` · ${d.unknown} assignment${d.unknown === 1 ? '' : 's'} could not be checked` : ''}</p>
        </div>
        <button type="button" class="th-refresh" onclick="TeacherHome.render()" ${state.refreshing ? 'disabled' : ''} aria-label="Refresh overview">↻ Refresh</button>
      </div>
      ${state.error ? `<div class="th-error th-error-inline"><p>Could not refresh just now. Nothing has been lost.</p><button type="button" class="th-retry" onclick="TeacherHome.render()">Try again</button></div>` : ''}
      ${actions}
      <div class="th-cards">${dueCard}${helpCard}${recentCard}</div>`;
  }

  function reset() { _epoch++; _last = null; _loading = false; const root = el('ta-home'); if (root) root.innerHTML = ''; }
  function invalidate() { _last = null; }

  if (typeof _sb !== 'undefined' && _sb && _sb.auth && _sb.auth.onAuthStateChange) {
    _sb.auth.onAuthStateChange(event => { if (event === 'SIGNED_OUT') reset(); });
  }

  return { render, reset, invalidate, _build, _paint };
})();
if (typeof window !== 'undefined') window.TeacherHome = TeacherHome;
