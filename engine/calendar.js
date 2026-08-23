'use strict';
const Calendar = (() => {

  // ── State ──────────────────────────────────────
  let _studentId    = null;
  let _studentName  = null;
  let _studentGrade = null;
  let _scheduleId   = null;
  let _entries      = [];
  let _viewYear     = new Date().getFullYear();
  let _viewMonth    = new Date().getMonth();
  let _selectedDate = null;

  let _gen = {
    startDate:        null,
    weeks:            4,
    studyDays:        [1,2,3,4,5],
    subjectHours:     {},   // { subjectId: hoursPerWeek }
    mixed:            false,
    priorityChapters: [],
  };

  const TYPE_META = {
    study:   { icon: '📚', label: 'Study',    dot: 'bg-indigo-500' },
    exam:    { icon: '📝', label: 'Exam',     dot: 'bg-red-500'    },
    holiday: { icon: '🎉', label: 'Holiday',  dot: 'bg-green-500'  },
    blocked: { icon: '🚫', label: 'No Study', dot: 'bg-gray-400'   },
    other:   { icon: '📌', label: 'Other',    dot: 'bg-yellow-500' },
  };

  function _el(id)          { return document.getElementById(id); }
  function _showErr(el, msg){ if (!el) return; el.textContent = msg; el.classList.remove('hidden'); }

  function _toDateStr(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function _parseDate(str) {
    const [y,m,d] = str.split('-').map(Number);
    return new Date(y, m-1, d);
  }

  // ── Get subjects for a grade from SUBJECT_PACKS ──
  function _subjectsForGrade(grade) {
    if (typeof SUBJECT_PACKS === 'undefined') return [];
    return SUBJECT_PACKS.filter(p => p.grade === grade);
  }

  function _subjectById(id) {
    if (typeof SUBJECT_PACKS === 'undefined') return null;
    return SUBJECT_PACKS.find(p => p.id === id) || null;
  }

  // ── Entry point (parent calendar) ───────────────
  async function render() {
    const students = Store.getAccounts();
    if (!_studentId && students.length > 0) {
      const s = students[0];
      _studentId    = s.id;
      _studentName  = s.name;
      _studentGrade = s.grade || 5;
    }

    const sel = _el('cal-student-select');
    if (sel) {
      sel.innerHTML = students.map(s =>
        `<option value="${s.id}" ${s.id === _studentId ? 'selected' : ''}>${s.avatar || '🧒'} ${s.name}</option>`
      ).join('');
    }

    await _loadEntries();
    _renderCalendar();
  }

  async function setStudent(id) {
    const s = Store.getAccounts().find(st => st.id === id);
    if (!s) return;
    _studentId    = id;
    _studentName  = s.name;
    _studentGrade = s.grade || 5;
    _scheduleId   = null;
    _entries      = [];
    await _loadEntries();
    _renderCalendar();
  }

  // ── Supabase ─────────────────────────────────────
  async function _loadEntries() {
    if (!_sb || !_studentId) return;
    const { data: scheds } = await _sb.from('study_schedules')
      .select('id,settings')
      .eq('student_id', _studentId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (scheds?.length) {
      _scheduleId = scheds[0].id;
      if (scheds[0].settings) _gen = { ..._gen, ...scheds[0].settings };
    } else {
      _scheduleId = null;
      _entries    = [];
      return;
    }

    const { data } = await _sb.from('schedule_entries')
      .select('*')
      .eq('schedule_id', _scheduleId)
      .order('date', { ascending: true });

    _entries = data || [];
  }

  async function _ensureSchedule() {
    if (_scheduleId) return _scheduleId;
    const profile  = typeof Auth !== 'undefined' ? Auth.getParentProfile() : null;
    const { data, error } = await _sb.from('study_schedules').insert({
      student_id: _studentId,
      parent_id:  profile?.id || null,
      settings:   _gen,
    }).select('id').single();
    if (error || !data) return null;
    _scheduleId = data.id;
    return _scheduleId;
  }

  // ── Calendar grid ─────────────────────────────────
  function _renderCalendar() {
    const title = _el('cal-month-title');
    if (title) title.textContent = new Date(_viewYear, _viewMonth, 1)
      .toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const grid = _el('cal-grid');
    if (!grid) return;

    const today  = _toDateStr(new Date());
    const byDate = {};
    _entries.forEach(e => {
      if (!byDate[e.date]) byDate[e.date] = [];
      byDate[e.date].push(e);
    });

    const firstDay    = new Date(_viewYear, _viewMonth, 1).getDay();
    const daysInMonth = new Date(_viewYear, _viewMonth + 1, 0).getDate();

    let html = `<div class="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden">
      ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d =>
        `<div class="bg-gray-50 dark:bg-gray-800 text-center text-xs font-semibold text-gray-400 py-2">${d}</div>`
      ).join('')}`;

    for (let i = 0; i < firstDay; i++)
      html += `<div class="bg-white dark:bg-gray-800 min-h-[52px]"></div>`;

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${_viewYear}-${String(_viewMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const events  = byDate[dateStr] || [];
      const isToday = dateStr === today;
      const isSel   = dateStr === _selectedDate;

      const dots = events.slice(0, 4).map(e => {
        const meta = TYPE_META[e.entry_type] || TYPE_META.other;
        return `<span class="w-1.5 h-1.5 rounded-full ${meta.dot} shrink-0"></span>`;
      }).join('');

      html += `
        <button onclick="Calendar.openDay('${dateStr}')"
          class="bg-white dark:bg-gray-800 min-h-[52px] p-1.5 flex flex-col items-center gap-1
            hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors
            ${isSel ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}">
          <span class="text-xs font-semibold ${isToday
            ? 'bg-indigo-500 text-white w-5 h-5 rounded-full flex items-center justify-center'
            : 'text-gray-700 dark:text-gray-300'}">${d}</span>
          <div class="flex flex-wrap justify-center gap-0.5">${dots}</div>
        </button>`;
    }
    html += '</div>';
    grid.innerHTML = html;
  }

  function prevMonth() { _viewMonth--; if (_viewMonth < 0) { _viewMonth = 11; _viewYear--; } _renderCalendar(); }
  function nextMonth() { _viewMonth++; if (_viewMonth > 11) { _viewMonth = 0; _viewYear++; } _renderCalendar(); }

  // ── Day detail ────────────────────────────────────
  function openDay(dateStr) {
    _selectedDate = dateStr;
    _renderCalendar();

    const events = _entries.filter(e => e.date === dateStr);
    const d      = _parseDate(dateStr);
    const label  = d.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });

    const m = _el('modal-day-events');
    if (!m) return;
    const titleEl = _el('day-events-title');
    if (titleEl) titleEl.textContent = label;

    const list = _el('day-events-list');
    if (!list) return;

    if (!events.length) {
      list.innerHTML = `<p class="text-sm text-gray-400 text-center py-6">No events on this day.</p>
        <button onclick="Calendar.showAddEvent('${dateStr}')"
          class="w-full text-sm text-indigo-500 font-medium py-2 border-2 border-dashed border-indigo-200 dark:border-indigo-800 rounded-xl">
          + Add Event</button>`;
    } else {
      list.innerHTML = events.map(e => {
        const meta = TYPE_META[e.entry_type] || TYPE_META.other;
        const subj = e.subject_id ? _subjectById(e.subject_id) : null;
        return `
          <div class="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 mb-2">
            <span class="text-xl select-none mt-0.5">${meta.icon}</span>
            <div class="flex-1 min-w-0">
              ${subj ? `<div class="text-xs font-bold text-indigo-500 mb-0.5">${subj.icon} ${subj.name}</div>` : ''}
              <div class="font-semibold text-sm text-gray-800 dark:text-white">${e.topic_label}</div>
              ${e.duration_mins && e.entry_type==='study' ? `<div class="text-xs text-gray-400">${e.duration_mins} min</div>` : ''}
              ${e.notes ? `<div class="text-xs text-gray-500 mt-0.5 italic">${e.notes}</div>` : ''}
            </div>
            <button onclick="Calendar.deleteEntry('${e.id}')"
              class="text-gray-300 hover:text-red-400 text-xl leading-none select-none transition-colors">×</button>
          </div>`;
      }).join('') + `
        <button onclick="Calendar.showAddEvent('${dateStr}')"
          class="w-full mt-1 text-sm text-indigo-500 font-medium py-2 border-2 border-dashed border-indigo-200 dark:border-indigo-800 rounded-xl">
          + Add Event</button>`;
    }
    m.classList.remove('hidden');
  }

  function closeDayModal() { _el('modal-day-events')?.classList.add('hidden'); }

  async function deleteEntry(id) {
    if (!_sb) return;
    await _sb.from('schedule_entries').delete().eq('id', id);
    _entries = _entries.filter(e => e.id !== id);
    closeDayModal();
    _renderCalendar();
    if (typeof toast !== 'undefined') toast('Event removed', 1500);
  }

  // ── Add manual event ──────────────────────────────
  function showAddEvent(dateStr) {
    closeDayModal();
    const m = _el('modal-add-event');
    if (!m) return;
    const di = _el('add-event-date'); if (di) di.value = dateStr || _toDateStr(new Date());
    const ti = _el('add-event-type'); if (ti) ti.value = 'exam';
    const li = _el('add-event-label'); if (li) li.value = '';
    const ni = _el('add-event-notes'); if (ni) ni.value = '';
    const er = _el('add-event-error'); if (er) er.classList.add('hidden');
    m.classList.remove('hidden');
  }

  function closeAddEvent() { _el('modal-add-event')?.classList.add('hidden'); }

  async function saveEvent() {
    if (!_sb || !_studentId) return;
    const date  = _el('add-event-date')?.value;
    const type  = _el('add-event-type')?.value  || 'other';
    const label = (_el('add-event-label')?.value || '').trim();
    const notes = (_el('add-event-notes')?.value || '').trim();
    const errEl = _el('add-event-error');
    if (!date)  { _showErr(errEl, 'Please select a date.'); return; }
    if (!label) { _showErr(errEl, 'Please enter an event name.'); return; }

    const sid = await _ensureSchedule();
    if (!sid)   { _showErr(errEl, 'Could not save. Please try again.'); return; }

    const { data, error } = await _sb.from('schedule_entries').insert({
      schedule_id: sid, student_id: _studentId,
      date, topic_label: label, entry_type: type,
      notes: notes || null, duration_mins: null,
    }).select().single();
    if (error) { _showErr(errEl, 'Could not save. Please try again.'); return; }

    _entries.push(data);
    closeAddEvent();
    const d = _parseDate(date);
    _viewYear = d.getFullYear(); _viewMonth = d.getMonth();
    _selectedDate = date;
    _renderCalendar();
    if (typeof toast !== 'undefined') toast('Event added! 📌', 1500);
  }

  // ── Generate timetable (multi-subject) ────────────
  async function showGenModal() {
    const m = _el('modal-gen-timetable');
    if (!m) return;

    const today = new Date();
    const dtu   = (8 - today.getDay()) % 7 || 7;
    const nextMon = new Date(today);
    nextMon.setDate(today.getDate() + dtu);

    const sd = _el('gen-start-date'); if (sd) sd.value = _toDateStr(nextMon);
    const wk = _el('gen-weeks');      if (wk) wk.value = _gen.weeks || 4;
    const er = _el('gen-error');      if (er) er.classList.add('hidden');

    // Study day checkboxes
    [0,1,2,3,4,5,6].forEach(i => {
      const cb = _el(`gen-day-${i}`);
      if (cb) cb.checked = (_gen.studyDays || [1,2,3,4,5]).includes(i);
    });

    const mx = _el('gen-mixed');  if (mx) mx.checked = _gen.mixed || false;
    const sg = _el('gen-single'); if (sg) sg.checked = !(_gen.mixed);

    // Render subject hours selector
    _renderSubjectHours();

    m.classList.remove('hidden');
  }

  function _renderSubjectHours() {
    const el = _el('gen-subject-hours');
    if (!el) return;

    const grade    = _studentGrade || 5;
    const subjects = _subjectsForGrade(grade);
    const saved    = _gen.subjectHours || {};

    if (!subjects.length) {
      el.innerHTML = '<p class="text-xs text-gray-400">No subjects found for this grade.</p>';
      return;
    }

    el.innerHTML = subjects.map(s => `
      <div class="flex items-center gap-3 py-1.5 border-b border-gray-100 dark:border-gray-700 last:border-0">
        <span class="text-lg select-none shrink-0">${s.icon}</span>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">${s.name}</span>
        <div class="flex items-center gap-1.5 shrink-0">
          <input type="number" min="0" max="10" step="0.5" value="${saved[s.id] ?? 2}"
            id="gen-subj-${s.id.replace(/[^a-z0-9]/gi,'_')}"
            class="w-14 text-center border border-gray-300 dark:border-gray-600 rounded-lg px-1 py-0.5 text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
          <span class="text-xs text-gray-400">h/wk</span>
          <label class="flex items-center gap-1 text-xs text-gray-400 ml-1 cursor-pointer">
            <input type="checkbox" ${(saved[s.id] ?? 2) > 0 ? 'checked' : ''}
              onchange="document.getElementById('gen-subj-${s.id.replace(/[^a-z0-9]/gi,'_')}').disabled=!this.checked"
              id="gen-subj-chk-${s.id.replace(/[^a-z0-9]/gi,'_')}">
            include
          </label>
        </div>
      </div>`).join('');
  }

  function closeGenModal() { _el('modal-gen-timetable')?.classList.add('hidden'); }

  async function generateTimetable() {
    const startDateStr = _el('gen-start-date')?.value;
    const weeks        = parseInt(_el('gen-weeks')?.value) || 4;
    const mixed        = _el('gen-mixed')?.checked || false;
    const studyDays    = [0,1,2,3,4,5,6].filter(i => _el(`gen-day-${i}`)?.checked);
    const errEl        = _el('gen-error');
    const btn          = _el('gen-submit-btn');

    if (!startDateStr)     { _showErr(errEl, 'Please pick a start date.'); return; }
    if (!studyDays.length) { _showErr(errEl, 'Select at least one study day.'); return; }
    if (!_studentId) return;

    // Collect subject hours
    const grade    = _studentGrade || 5;
    const subjects = _subjectsForGrade(grade);
    const subjHours = {};
    subjects.forEach(s => {
      const safeId  = s.id.replace(/[^a-z0-9]/gi,'_');
      const chk     = _el(`gen-subj-chk-${safeId}`);
      const inp     = _el(`gen-subj-${safeId}`);
      const enabled = chk ? chk.checked : true;
      subjHours[s.id] = enabled ? (parseFloat(inp?.value) || 0) : 0;
    });

    const totalHrsPerWeek = Object.values(subjHours).reduce((a,b) => a+b, 0);
    if (totalHrsPerWeek <= 0) { _showErr(errEl, 'Please set study hours for at least one subject.'); return; }

    if (btn) { btn.disabled = true; btn.textContent = 'Generating…'; }
    _gen = { startDate: startDateStr, weeks, studyDays, subjectHours: subjHours, mixed };

    // Build day slots
    const totalMinsPerWeek = {};
    subjects.forEach(s => { totalMinsPerWeek[s.id] = (subjHours[s.id] || 0) * 60; });

    // Generate entries per subject
    const allEntries = [];

    for (const subj of subjects) {
      const minsPerWeek = totalMinsPerWeek[subj.id] || 0;
      if (minsPerWeek <= 0) continue;

      const chapters = subj.chapters || [];
      if (!chapters.length) continue;

      // Weight chapters by examWeight and inverse accuracy
      let chapData = {};
      try {
        const prog = await Store.loadStudentProgress(_studentId);
        chapData   = prog?.chapters || {};
      } catch(e) { chapData = {}; }

      const scored = chapters.map(ch => {
        const c   = chapData[ch.id] || { attempted: 0, correct: 0 };
        const acc = c.attempted ? c.correct / c.attempted : null;
        const wt  = ch.examWeight || 2;
        const budget = acc === null ? 50*wt/3 : acc < .5 ? 45*wt/3 : acc < .7 ? 30*wt/3 : 15*wt/3;
        const sort   = acc === null ? 999 + wt*10 : Math.round((1-acc)*500) + wt*10;
        return { ...ch, budget: Math.round(budget), sort, subjectId: subj.id };
      }).sort((a, b) => b.sort - a.sort);

      // Build day slots for this subject proportional to its share of the week
      const sharePerDay = minsPerWeek / studyDays.length;
      const start       = _parseDate(startDateStr);

      for (let i = 0; i < weeks * 7; i++) {
        const d = new Date(start); d.setDate(start.getDate() + i);
        if (!studyDays.includes(d.getDay())) continue;
        const dateStr = _toDateStr(d);

        let minsLeft = Math.round(sharePerDay);
        let ci       = 0;

        while (minsLeft >= 10 && ci < scored.length) {
          const ch   = scored[ci];
          const mins = Math.min(ch.budget, minsLeft, mixed ? 45 : minsLeft);
          if (mins <= 0) { ci++; continue; }
          allEntries.push({
            date:          dateStr,
            subject_id:    subj.id,
            chapter_id:    ch.id,
            topic_label:   `${ch.icon} ${ch.name}`,
            duration_mins: mins,
            entry_type:    'study',
          });
          ch.budget -= mins;
          minsLeft  -= mins;
          if (ch.budget <= 0) ci++;
          if (!mixed) break; // single subject mode: one chapter per day per subject
        }
      }
    }

    // Persist
    const sid = await _ensureSchedule();
    if (!sid) {
      _showErr(errEl, 'Could not save schedule. Please try again.');
      if (btn) { btn.disabled = false; btn.textContent = '⚡ Generate Schedule'; }
      return;
    }

    await _sb.from('study_schedules')
      .update({ settings: _gen, updated_at: new Date().toISOString() }).eq('id', sid);
    await _sb.from('schedule_entries').delete().eq('schedule_id', sid).eq('entry_type', 'study');

    if (allEntries.length > 0) {
      const rows = allEntries.map(e => ({ ...e, schedule_id: sid, student_id: _studentId }));
      // Insert in chunks of 200 to avoid payload limits
      for (let i = 0; i < rows.length; i += 200) {
        await _sb.from('schedule_entries').insert(rows.slice(i, i + 200));
      }
    }

    await _loadEntries();
    const d = _parseDate(startDateStr);
    _viewYear = d.getFullYear(); _viewMonth = d.getMonth();
    closeGenModal();
    _renderCalendar();
    if (typeof toast !== 'undefined') toast(`Timetable generated — ${allEntries.length} sessions across ${subjects.filter(s=>subjHours[s.id]>0).length} subjects 📅`, 3500);
    if (btn) { btn.disabled = false; btn.textContent = '⚡ Generate Schedule'; }
  }

  // ── Print ─────────────────────────────────────────
  function print() {
    const printDiv = _el('cal-print-view');
    if (!printDiv) { window.print(); return; }

    const relevant = _entries.filter(e => e.entry_type === 'study' || e.entry_type === 'exam');
    if (!relevant.length) {
      if (typeof toast !== 'undefined') toast('No sessions to print yet.', 2000);
      return;
    }

    const byWeek = {};
    relevant.forEach(e => {
      const d = _parseDate(e.date);
      const sun = new Date(d); sun.setDate(d.getDate() - d.getDay());
      const wk  = _toDateStr(sun);
      if (!byWeek[wk]) byWeek[wk] = {};
      if (!byWeek[wk][e.date]) byWeek[wk][e.date] = [];
      byWeek[wk][e.date].push(e);
    });

    const weeks = Object.keys(byWeek).sort();
    printDiv.innerHTML = `
      <div style="font-family:sans-serif;padding:24px;max-width:960px;margin:auto">
        <h1 style="font-size:22px;font-weight:700;margin:0 0 4px">📅 Study Timetable</h1>
        <p style="color:#666;margin:0 0 24px;font-size:13px">${_studentName||'Student'} · Generated ${new Date().toLocaleDateString()}</p>
        ${weeks.map(wk => {
          const days = Object.keys(byWeek[wk]).sort();
          return `<div style="margin-bottom:28px">
            <h2 style="font-size:15px;font-weight:700;border-bottom:2px solid #e2e8f0;padding-bottom:6px;margin-bottom:10px">
              Week of ${_parseDate(days[0]).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</h2>
            <table style="width:100%;border-collapse:collapse;font-size:11px">
              <thead><tr>${days.map(d=>`<th style="border:1px solid #e2e8f0;padding:6px;background:#f8fafc;text-align:left">
                ${_parseDate(d).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})}</th>`).join('')}</tr></thead>
              <tbody><tr>${days.map(d=>`<td style="border:1px solid #e2e8f0;padding:6px;vertical-align:top">
                ${byWeek[wk][d].map(e=>{
                  const s=e.subject_id?_subjectById(e.subject_id):null;
                  return `<div style="margin-bottom:4px;padding:3px 0;border-bottom:1px dotted #f0f0f0">
                    ${s?`<div style="color:#6366f1;font-size:10px;font-weight:700">${s.icon} ${s.name}</div>`:''}
                    <div>${e.topic_label}${e.duration_mins?` <span style="color:#94a3b8">${e.duration_mins}m</span>`:''}</div></div>`;
                }).join('')}</td>`).join('')}</tr></tbody>
            </table></div>`;
        }).join('')}
      </div>`;

    printDiv.classList.remove('hidden');
    window.print();
    setTimeout(() => printDiv.classList.add('hidden'), 500);
  }

  // ── Revision notes modal ──────────────────────────
  function showNotes(subjectId, chapterId) {
    const subj = _subjectById(subjectId);
    if (!subj) return;
    const ch = (subj.chapters || []).find(c => c.id === chapterId);
    if (!ch || !ch.notes?.length) {
      if (typeof toast !== 'undefined') toast('No revision notes available for this topic yet.', 2000);
      return;
    }

    const m = _el('modal-revision-notes');
    if (!m) return;

    const sl = _el('notes-subject-label');
    if (sl) sl.textContent = `${subj.icon} ${subj.name}`;

    const ct = _el('notes-chapter-title');
    if (ct) ct.textContent = `${ch.icon} ${ch.name}`;

    const body = _el('notes-body');
    if (body) {
      body.innerHTML = ch.notes.map(note => {
        // Convert **bold** and *italic* markdown to HTML
        const html = note
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.+?)\*/g, '<em>$1</em>');
        return `<div class="text-sm text-gray-700 dark:text-gray-200 leading-relaxed p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">${html}</div>`;
      }).join('');
    }

    m.classList.remove('hidden');
  }

  function closeNotes() { _el('modal-revision-notes')?.classList.add('hidden'); }

  // ── Student "Today's Plan" (called from app.js) ───
  async function renderTodayPlan(studentId, studentGrade) {
    const container = _el('dash-today-plan');
    const listEl    = _el('dash-today-entries');
    const dateEl    = _el('dash-today-date');
    if (!container || !listEl) return;

    if (!_sb || !studentId) { container.classList.add('hidden'); return; }

    const today = _toDateStr(new Date());
    if (dateEl) dateEl.textContent = _parseDate(today).toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});

    // Find schedule for this student
    const { data: scheds } = await _sb.from('study_schedules')
      .select('id').eq('student_id', studentId)
      .order('created_at', { ascending: false }).limit(1);

    if (!scheds?.length) { container.classList.add('hidden'); return; }

    const { data: entries } = await _sb.from('schedule_entries')
      .select('*').eq('schedule_id', scheds[0].id).eq('date', today);

    if (!entries?.length) { container.classList.add('hidden'); return; }

    // Build cards
    const grade    = studentGrade || 5;
    const subjects = typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [];

    listEl.innerHTML = entries.map(e => {
      const meta  = TYPE_META[e.entry_type] || TYPE_META.other;
      const subj  = e.subject_id ? subjects.find(s => s.id === e.subject_id) : null;
      const notesBased = subj?.notesBased || false;
      const practiceble = subj?.practiceble !== false;

      let actionBtn = '';
      if (e.entry_type === 'study' && subj) {
        if (notesBased) {
          actionBtn = `<button onclick="Calendar.showNotes('${e.subject_id}','${e.chapter_id}')"
            class="mt-2 text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 font-semibold px-3 py-1.5 rounded-lg hover:bg-indigo-200 transition-colors">
            📖 View Notes</button>`;
        } else if (practiceble) {
          actionBtn = `<button onclick="Calendar.startPractice('${e.subject_id}','${e.chapter_id}')"
            class="mt-2 text-xs bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300 font-semibold px-3 py-1.5 rounded-lg hover:bg-green-200 transition-colors">
            ✅ Practice Now</button>`;
        }
      }

      return `
        <div class="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <span class="text-2xl select-none mt-0.5">${subj ? subj.icon : meta.icon}</span>
          <div class="flex-1 min-w-0">
            ${subj ? `<div class="text-xs font-bold text-indigo-500 mb-0.5">${subj.name}</div>` : ''}
            <div class="font-semibold text-sm text-gray-800 dark:text-white">${e.topic_label}</div>
            ${e.duration_mins ? `<div class="text-xs text-gray-400">${e.duration_mins} min</div>` : ''}
            ${e.notes ? `<div class="text-xs text-gray-500 italic mt-0.5">${e.notes}</div>` : ''}
            ${actionBtn}
          </div>
        </div>`;
    }).join('');

    container.classList.remove('hidden');
  }

  // ── Practice link ─────────────────────────────────
  function startPractice(subjectId, chapterId) {
    // For the active subject (grade5-maths), we can go directly to practice
    const active = typeof SUBJECT_PACKS !== 'undefined'
      ? SUBJECT_PACKS.find(p => !p.comingSoon)
      : null;

    if (active && active.id === subjectId) {
      // Set chapter and go to chapter select → practice
      if (typeof showScreen !== 'undefined') showScreen('chapter-select');
      if (typeof toast !== 'undefined') toast(`Open "${chapterId.replace(/_/g,' ')}" to start practising`, 3000);
    } else {
      if (typeof toast !== 'undefined') toast('Practice questions for this subject coming soon! 📚', 2500);
    }
  }

  return {
    render, setStudent,
    prevMonth, nextMonth,
    openDay, closeDayModal,
    showAddEvent, closeAddEvent, saveEvent,
    deleteEntry,
    showGenModal, closeGenModal, generateTimetable,
    showNotes, closeNotes,
    renderTodayPlan, startPractice,
    print,
  };
})();
