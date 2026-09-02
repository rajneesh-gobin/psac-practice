'use strict';
const Calendar = (() => {

  // ── State ──────────────────────────────────────
  let _studentId    = null;
  let _studentName  = null;
  let _studentGrade = null;
  let _scheduleId      = null;
  let _entries         = [];
  let _viewYear        = new Date().getFullYear();
  let _viewMonth       = new Date().getMonth();
  let _selectedDate    = null;
  let _editingEntryId  = null;
  let _calendarSwipeBound = false;

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

  // ── Print-only subject colors ──────────────────────
  // Always resolves to a 6-digit hex so `${color}0f`/`${color}55` alpha-suffix
  // tricks in print() stay valid CSS - an hsl()/named-color fallback here
  // would silently break every tinted background on the printed page.
  const _PRINT_COLORS = {
    maths: '#6366f1', english: '#0ea5e9', french: '#a855f7',
    science: '#10b981', history: '#f59e0b',
  };
  const _PRINT_FALLBACK_HEX = ['#0891b2', '#c026d3', '#65a30d', '#ea580c', '#0369a1', '#7c3aed'];
  function _subjectPrintColor(subj) {
    if (!subj) return '#64748b';
    const key = (subj.subject || subj.name || '').toLowerCase();
    for (const k of Object.keys(_PRINT_COLORS)) if (key.includes(k)) return _PRINT_COLORS[k];
    let hash = 0;
    for (const ch of (subj.id || subj.name || 'x')) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
    return _PRINT_FALLBACK_HEX[hash % _PRINT_FALLBACK_HEX.length];
  }

  function _el(id)          { return document.getElementById(id); }
  function _showErr(el, msg){ if (!el) return; el.textContent = msg; el.classList.remove('hidden'); }

  function _toDateStr(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function _parseDate(str) {
    const [y,m,d] = str.split('-').map(Number);
    return new Date(y, m-1, d);
  }

  function _esc(str) {
    return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // ── Get subjects for a grade from SUBJECT_PACKS ──
  // ⚠ comingSoon packs excluded: this feeds the parent's "schedule a session"
  // subject picker, and a session scheduled in a pack with no questions is a
  // plan the child cannot possibly carry out.
  function _subjectsForGrade(grade) {
    if (typeof SUBJECT_PACKS === 'undefined') return [];
    return SUBJECT_PACKS.filter(p => p.grade === grade && !p.comingSoon);
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
    await _loadActivity();
    _renderFilters();
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
    await _loadActivity();
    _renderFilters();
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
      .select('id, date, entry_type, topic_label, notes, duration_mins, subject_id, schedule_id, chapter_id')
      .eq('schedule_id', _scheduleId)
      .order('date', { ascending: true });

    _entries = data || [];
  }

  // ── Child-facing read API ─────────────────────────────────────────────
  // The calendar screen above is the PARENT's editor. A child needs the same
  // data with none of the editing, so this returns plain rows and the kid
  // screens render them themselves.
  //
  // Every entry is resolved back to a real chapter so the child can start it.
  // schedule_entries stores topic_label as a DISPLAY string ("📐 Fractions"),
  // not a chapter id - see generateTimetable - so the icon is stripped and the
  // remainder matched by name within that row's subject. A row that cannot be
  // resolved is still returned, just without a start button, rather than
  // hidden: a scheduled session the child cannot see is worse than one they
  // have to open manually.
  function _resolveChapter(entry) {
    const packs = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : []);
    const pack  = packs.find(p => p.id === entry.subject_id);
    const label = (entry.topic_label || '').replace(/^[^\p{L}\p{N}]+/u, '').trim();
    if (!label) return { pack, chapter: null };
    const pool = pack ? (pack._chapters || pack.chapters || [])
                      : packs.flatMap(p => p._chapters || p.chapters || []);
    const norm = s => (s || '').toLowerCase().replace(/\s+/g, ' ').trim();
    const chapter = pool.find(c => norm(c.name) === norm(label))
                 || pool.find(c => norm(label).startsWith(norm(c.name)))
                 || null;
    return { pack: pack || packs.find(p => (p._chapters || p.chapters || []).includes(chapter)) || null, chapter };
  }

  // days = how far ahead to look. Past entries are never returned: this feeds a
  // "what's coming up" list, and yesterday's session is not something a child
  // can act on.
  async function getUpcoming(studentId, days = 28) {
    if (!studentId) return [];
    // Loads WITHOUT calling setStudent(): that repaints the parent calendar
    // grid, whose elements do not exist on a child's screen. Sets the same
    // module state so a parent opening the calendar afterwards still works.
    try {
      if (_studentId !== studentId) {
        _studentId  = studentId;
        _scheduleId = null;
        _entries    = [];
      }
      if (!_entries.length) await _loadEntries();
    } catch (_) { return []; }

    const today = _toDateStr(new Date());
    const until = new Date(); until.setDate(until.getDate() + days);
    const untilStr = _toDateStr(until);

    return (_entries || [])
      .filter(e => e.entry_type === 'study' && e.date >= today && e.date <= untilStr)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(e => {
        const { pack, chapter } = _resolveChapter(e);
        return {
          id: e.id, date: e.date, label: e.topic_label || 'Study session',
          minutes: e.duration_mins || null, notes: e.notes || null,
          subjectId: pack?.id || e.subject_id || null,
          subjectName: pack?.subject || pack?.name || null,
          chapterId: chapter?.id || null,
          icon: chapter?.icon || '📚',
          isToday: e.date === today,
        };
      });
  }

  async function _ensureSchedule() {
    if (_scheduleId) return _scheduleId;
    // Try to find an existing schedule first (in case _loadEntries failed silently)
    const { data: existing, error: selErr } = await _sb.from('study_schedules')
      .select('id').eq('student_id', _studentId).limit(1).maybeSingle();
    if (selErr) {
      console.error('[Calendar] study_schedules query failed - table may not exist yet. Run supabase-migration.sql in your Supabase SQL editor.', selErr);
      return null;
    }
    if (existing?.id) { _scheduleId = existing.id; return _scheduleId; }
    // No schedule found - create one
    const profile  = typeof Auth !== 'undefined' ? Auth.getParentProfile() : null;
    const { data, error } = await _sb.from('study_schedules').insert({
      student_id: _studentId,
      parent_id:  profile?.id || null,
      settings:   _gen,
    }).select('id').single();
    if (error) {
      console.error('[Calendar] study_schedules insert failed - run supabase-migration.sql in your Supabase SQL editor.', error);
      return null;
    }
    if (!data) return null;
    _scheduleId = data.id;
    return _scheduleId;
  }

  // ── Calendar grid ─────────────────────────────────
  // ── WHAT ACTUALLY HAPPENED ────────────────────────────────────────────
  // The calendar above is the PLAN: parent-authored rows in schedule_entries.
  // These are the ACTUALS, derived from history the app already keeps. They are
  // deliberately NOT written into schedule_entries — that table is editable, and
  // a parent being able to edit or delete "she sat a mock on Tuesday" would be
  // both meaningless and a way to quietly lose the record. Activity rows carry
  // no edit or delete button for the same reason.
  //
  // Three sources, each already dated, none of them new storage:
  //   practice    DB.daily[date].ch  →  { chapterId: [attempted, correct] }
  //   exam        progress.examHistory (iso)
  //   assignment  student_assignments.completed_at
  let _activity = [];

  const ACT_META = {
    practice:   { icon: '✅', label: 'Practice',    dot: 'bg-emerald-500', tint: 'bg-emerald-50 dark:bg-emerald-900/20' },
    exam:       { icon: '🏁', label: 'Exam',        dot: 'bg-rose-500',    tint: 'bg-rose-50 dark:bg-rose-900/20'       },
    assignment: { icon: '📋', label: 'Assignment',  dot: 'bg-amber-500',   tint: 'bg-amber-50 dark:bg-amber-900/20'     },
  };

  // Which layers are on. Persisted per browser, not per student: a parent who
  // switched the plan off to read the actuals means that for the calendar, not
  // for one child.
  const _FILTER_KEY = 'mm_cal_filters';
  let _filters = { planned: true, practice: true, exam: true, assignment: true };
  try {
    const saved = JSON.parse(localStorage.getItem(_FILTER_KEY) || 'null');
    if (saved && typeof saved === 'object') _filters = { ..._filters, ...saved };
  } catch (_) { /* corrupt value - keep the defaults, all layers on */ }

  function toggleFilter(kind) {
    if (!(kind in _filters)) return;
    _filters[kind] = !_filters[kind];
    try { localStorage.setItem(_FILTER_KEY, JSON.stringify(_filters)); } catch (_) {}
    _renderFilters();
    _renderCalendar();
    // The day modal is open often enough while filtering that leaving it stale
    // reads as the filter not working.
    if (_selectedDate && !_el('modal-day-events')?.classList.contains('hidden')) openDay(_selectedDate);
  }

  function _renderFilters() {
    const bar = _el('cal-filters');
    if (!bar) return;
    const chip = (kind, icon, label, dot) => {
      const on = _filters[kind];
      return `<button onclick="Calendar.toggleFilter('${kind}')"
        class="cal-chip ${on ? 'is-on' : ''}" aria-pressed="${on}"
        title="${on ? 'Hide' : 'Show'} ${_esc(label)}">
        <span class="cal-chip-dot ${dot}"></span>
        <span>${icon} ${_esc(label)}</span>
      </button>`;
    };
    bar.innerHTML =
      chip('planned',    '📚', 'Planned',     'bg-indigo-500') +
      chip('practice',   '✅', 'Practice',    ACT_META.practice.dot) +
      chip('exam',       '🏁', 'Exams',       ACT_META.exam.dot) +
      chip('assignment', '📋', 'Assignments', ACT_META.assignment.dot);
  }

  // Local calendar date for a timestamp. The calendar grid is built from local
  // dates (new Date(year, month, day)), so an activity row has to be keyed the
  // same way or an evening session lands on the wrong square.
  function _localDateStr(ts) {
    const d = new Date(ts);
    return isNaN(d) ? null : _toDateStr(d);
  }

  async function _loadActivity() {
    _activity = [];
    if (!_studentId) return;

    // The signed-in child's own blob is already in memory; re-fetching it would
    // be a wasted round trip AND could serve a staler copy than the one holding
    // answers from the current session that have not flushed yet.
    let prog = null;
    if (typeof ACTIVE_STUDENT_ID !== 'undefined' && ACTIVE_STUDENT_ID === _studentId
        && typeof DB !== 'undefined' && DB) {
      prog = DB;
    } else if (typeof Store !== 'undefined' && Store.loadStudentProgress) {
      try { prog = await Store.loadStudentProgress(_studentId); } catch (_) { prog = null; }
    }

    if (prog) {
      // Per chapter per day, from BOTH buckets. `ch` is self-directed practice;
      // `asg` is work done inside an assignment. They are recorded separately so
      // this can label them differently — a parent looking for "did the homework
      // get done" should not have to infer it from a generic practice row.
      const _pushChapterRows = (date, map, kind) => {
        Object.entries(map || {}).forEach(([chId, pair]) => {
          const attempted = (pair && pair[0]) || 0;
          if (!attempted) return;
          const correct = pair[1] || 0;
          const { pack, chapter } = _resolveChapterById(chId);
          _activity.push({
            kind, date, chapterId: chId,
            title: chapter ? chapter.name : chId,
            subject: pack || null,
            detail: `${attempted} question${attempted === 1 ? '' : 's'} · ${Math.round(correct / attempted * 100)}%`,
            pct: Math.round(correct / attempted * 100),
            // Marks this as the LOCAL record of an assignment. A completed_at
            // row from the server describes the same work, so one of the two is
            // dropped below rather than showing the session twice.
            local: kind === 'assignment',
          });
        });
      };
      Object.entries(prog.daily || {}).forEach(([date, d]) => {
        _pushChapterRows(date, d.ch,  'practice');
        _pushChapterRows(date, d.asg, 'assignment');
      });

      // exams
      (prog.examHistory || []).forEach(e => {
        // Rows written before the iso field existed carry only a locale date
        // string, which is unparseable on an en-GB browser — see the digest
        // note in CLAUDE.md. Those simply do not get a calendar square rather
        // than being dropped onto the wrong one.
        const date = e.iso ? _localDateStr(e.iso) : null;
        if (!date) return;
        const pct = e.pct ?? e.score;
        _activity.push({
          kind: 'exam', date,
          title: e.type === 'quick' ? 'Quick Exam' : 'Full Mock Exam',
          subject: null,
          detail: typeof pct === 'number'
            ? `${pct}%${e.total ? ` · ${e.correct ?? '?'}/${e.total}` : ''}`
            : 'completed',
          pct: typeof pct === 'number' ? pct : null,
        });
      });
    }

    // assignments the child has marked done
    if (_sb) {
      try {
        const { data } = await _sb.from('student_assignments')
          .select('id,chapter_id,subject_id,note,completed_at')
          .eq('student_id', _studentId)
          .not('completed_at', 'is', null)
          .order('completed_at', { ascending: false })
          .limit(200);
        (data || []).forEach(a => {
          const date = _localDateStr(a.completed_at);
          if (!date) return;
          const { pack, chapter } = _resolveChapterById(a.chapter_id, a.subject_id);
          _activity.push({
            kind: 'assignment', date, chapterId: a.chapter_id || null,
            title: chapter ? chapter.name : (a.chapter_id || 'Assignment'),
            subject: pack || null,
            detail: a.note ? _esc(a.note) : 'marked done',
            pct: null,
          });
        });
      } catch (_) { /* an un-migrated column here must not empty the calendar */ }
    }

    // The same assignment can arrive twice: once as the local per-chapter record
    // written while the child answered, and once as a completed_at row from the
    // server. Keep the server row — it carries the parent's note — and drop the
    // local one for that chapter and day. A local row with no server twin still
    // shows, which is the whole point: it covers an assignment the child sat but
    // never had marked complete, and one done offline.
    const _serverKeys = new Set(
      _activity.filter(a => a.kind === 'assignment' && !a.local && a.chapterId)
               .map(a => a.date + '|' + a.chapterId)
    );
    _activity = _activity.filter(a =>
      !(a.local && a.chapterId && _serverKeys.has(a.date + '|' + a.chapterId))
    );
  }

  // By chapter ID, unlike _resolveChapter() which matches the display label a
  // schedule_entries row stores. Both exist because the two data sources
  // genuinely identify a chapter differently.
  function _resolveChapterById(chapterId, subjectId) {
    const packs = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : []);
    if (!chapterId) return { pack: packs.find(p => p.id === subjectId) || null, chapter: null };
    for (const p of packs) {
      const ch = (p._chapters || p.chapters || []).find(c => c.id === chapterId);
      if (ch) return { pack: p, chapter: ch };
    }
    return { pack: packs.find(p => p.id === subjectId) || null, chapter: null };
  }

  function _activityFor(dateStr) {
    return _activity.filter(a => a.date === dateStr && _filters[a.kind]);
  }
  function _plannedFor(dateStr) {
    return _filters.planned ? _entries.filter(e => e.date === dateStr) : [];
  }

  // The grid deliberately compresses activity into dots, which is useful for a
  // month but poor at answering the question a parent asks on opening the
  // scheduler: "what did my child do today?"  Keep a plain-language, always-on
  // summary above it. It ignores display filters so an adult cannot accidentally
  // hide completed work after turning a calendar layer off.
  function _renderTodayActivity() {
    const box = _el('cal-today-activity');
    if (!box) return;

    const today = _toDateStr(new Date());
    const actual = _activity.filter(a => a.date === today);
    const planned = _entries.filter(e => e.date === today && e.entry_type === 'study');
    const completedChapterIds = new Set(actual.map(a => a.chapterId).filter(Boolean));
    const plannedWithChapter = [...new Set(planned.map(e => {
      const resolved = e.chapter_id || (_resolveChapter(e).chapter || {}).id || '';
      return resolved;
    }).filter(Boolean))];
    const plannedDone = plannedWithChapter.filter(id => completedChapterIds.has(id)).length;
    const childName = _esc(_studentName || 'Your child');

    if (!actual.length) {
      box.innerHTML = `<section class="rounded-2xl border border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-900/15 p-4">
        <div class="flex items-start gap-3">
          <span class="text-2xl select-none">⏳</span>
          <div>
            <h3 class="text-sm font-bold text-amber-900 dark:text-amber-200">${childName}'s work today</h3>
            <p class="text-xs text-amber-800/80 dark:text-amber-300/80 mt-1">No completed practice, assignments, or exams have been recorded yet today.</p>
            ${planned.length ? `<p class="text-xs text-amber-800/70 dark:text-amber-300/70 mt-1.5">${planned.length} study session${planned.length === 1 ? '' : 's'} planned for today.</p>` : ''}
          </div>
        </div>
      </section>`;
      return;
    }

    const rows = actual.map(a => {
      const meta = ACT_META[a.kind] || ACT_META.practice;
      const pctCol = a.pct == null ? '' : a.pct >= 80 ? 'text-emerald-600 dark:text-emerald-400' : a.pct >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400';
      // Assignment notes were escaped when they entered the activity history;
      // escaping them a second time would visibly turn apostrophes / symbols
      // into entities. Other activity details are generated locally, so escape
      // them here before placing them in the summary.
      const detail = a.kind === 'assignment' ? a.detail : _esc(a.detail || meta.label);
      return `<div class="flex items-center gap-3 rounded-xl bg-white/80 dark:bg-gray-800/60 px-3 py-2 border border-emerald-100 dark:border-emerald-900/40">
        <span class="text-lg select-none">${meta.icon}</span>
        <div class="min-w-0 flex-1">
          <div class="text-sm font-semibold text-gray-800 dark:text-white truncate">${_esc(a.title)}</div>
          <div class="text-[11px] text-gray-500 dark:text-gray-400 truncate">${a.subject ? _esc((a.subject.icon || '') + ' ' + (a.subject.subject || a.subject.name || '')) + ' · ' : ''}${detail}</div>
        </div>
        ${a.pct == null ? `<span class="text-[10px] font-semibold uppercase tracking-wide text-gray-400">${meta.label}</span>` : `<span class="text-sm font-bold shrink-0 ${pctCol}">${a.pct}%</span>`}
      </div>`;
    }).join('');

    box.innerHTML = `<section class="rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-900/15 p-4">
      <div class="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 class="text-sm font-bold text-emerald-900 dark:text-emerald-200">✅ ${childName}'s completed work today</h3>
          <p class="text-xs text-emerald-800/80 dark:text-emerald-300/80 mt-1">This is actual work recorded by the app, not just the timetable.</p>
        </div>
        ${plannedWithChapter.length ? `<span class="shrink-0 text-xs font-bold bg-white dark:bg-gray-800 text-emerald-700 dark:text-emerald-300 rounded-full px-2.5 py-1">${plannedDone}/${plannedWithChapter.length} planned topics</span>` : ''}
      </div>
      <div class="space-y-2">${rows}</div>
    </section>`;
  }

  function _renderCalendar() {
    const title = _el('cal-month-title');
    if (title) title.textContent = new Date(_viewYear, _viewMonth, 1)
      .toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const grid = _el('cal-grid');
    if (!grid) return;

    _renderTodayActivity();

    const today = _toDateStr(new Date());

    const firstDay    = new Date(_viewYear, _viewMonth, 1).getDay();
    const daysInMonth = new Date(_viewYear, _viewMonth + 1, 0).getDate();

    let html = `<div class="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden">
      ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d =>
        `<div class="bg-gray-50 dark:bg-gray-800 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 py-2">${d}</div>`
      ).join('')}`;

    for (let i = 0; i < firstDay; i++)
      html += `<div class="bg-white dark:bg-gray-800 min-h-[52px]"></div>`;

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${_viewYear}-${String(_viewMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const planned = _plannedFor(dateStr);
      const actual  = _activityFor(dateStr);
      const isToday = dateStr === today;
      const isSel   = dateStr === _selectedDate;

      // Planned dots are hollow, actual dots are solid. On a square barely
      // 52px tall there is no room for a legend, and a parent scanning the
      // month needs "was this done" answerable without opening the day.
      // Capped at 4 with a +N, or a busy day pushes the grid row taller than
      // its neighbours and the month stops reading as a grid.
      const marks = [
        ...planned.map(e => ({ dot: (TYPE_META[e.entry_type] || TYPE_META.other).dot, done: false })),
        ...actual.map(a => ({ dot: ACT_META[a.kind].dot, done: true })),
      ];
      const dots = marks.slice(0, 4).map(m =>
        `<span class="cal-dot ${m.dot} ${m.done ? '' : 'is-plan'}"></span>`).join('')
        + (marks.length > 4 ? `<span class="cal-dot-more">+${marks.length - 4}</span>` : '');

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
    _bindMonthSwipe(grid);
  }

  // Mobile parents naturally swipe a calendar. Bind to the stable grid wrapper
  // once, and leave vertical swipes alone so the page can still scroll.
  function _bindMonthSwipe(grid) {
    if (_calendarSwipeBound || !grid) return;
    _calendarSwipeBound = true;
    let startX = 0, startY = 0, tracking = false, suppressClick = false;
    grid.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'touch') return;
      startX = event.clientX; startY = event.clientY; tracking = true;
    }, { passive:true });
    grid.addEventListener('pointerup', event => {
      if (!tracking || event.pointerType !== 'touch') return;
      tracking = false;
      const dx = event.clientX - startX, dy = event.clientY - startY;
      if (Math.abs(dx) < 52 || Math.abs(dx) <= Math.abs(dy)) return;
      suppressClick = true;
      if (dx < 0) nextMonth(); else prevMonth();
      setTimeout(() => { suppressClick = false; }, 250);
    }, { passive:true });
    grid.addEventListener('pointercancel', () => { tracking = false; }, { passive:true });
    grid.addEventListener('click', event => {
      if (!suppressClick) return;
      event.preventDefault(); event.stopImmediatePropagation();
    }, true);
  }

  function prevMonth() { _viewMonth--; if (_viewMonth < 0) { _viewMonth = 11; _viewYear--; } _renderCalendar(); }
  function nextMonth() { _viewMonth++; if (_viewMonth > 11) { _viewMonth = 0; _viewYear++; } _renderCalendar(); }

  // ── Day detail ────────────────────────────────────
  function openDay(dateStr) {
    _selectedDate = dateStr;
    _renderCalendar();

    const events = _plannedFor(dateStr);
    const acts   = _activityFor(dateStr);
    const d      = _parseDate(dateStr);
    const label  = d.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });

    const m = _el('modal-day-events');
    if (!m) return;
    const titleEl = _el('day-events-title');
    if (titleEl) titleEl.textContent = label;

    const list = _el('day-events-list');
    if (!list) return;

    // What actually happened goes FIRST. A parent opening a past day wants to
    // know whether the work got done, not to re-read what was scheduled.
    const actHtml = acts.map(a => {
      const meta = ACT_META[a.kind];
      const pctCol = a.pct == null ? '' : a.pct >= 80 ? '#22c55e' : a.pct >= 50 ? '#f59e0b' : '#ef4444';
      return `
        <div class="flex items-start gap-3 p-3 rounded-xl ${meta.tint} mb-2">
          <span class="text-xl select-none mt-0.5">${meta.icon}</span>
          <div class="flex-1 min-w-0">
            ${a.subject ? `<div class="text-xs font-bold text-indigo-500 mb-0.5">${a.subject.icon || ''} ${_esc(a.subject.subject || a.subject.name || '')}</div>` : ''}
            <div class="font-semibold text-sm text-gray-800 dark:text-white">${_esc(a.title)}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400" ${pctCol ? `style="color:${pctCol}"` : ''}>${a.detail}</div>
          </div>
          <span class="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 shrink-0 mt-1">${meta.label}</span>
        </div>`;
    }).join('');

    // Activity rows carry NO edit or delete button on purpose: they are derived
    // history, not editable plan rows. There is nothing for a delete to act on,
    // and offering one would imply the record can be rewritten.
    if (!events.length && !acts.length) {
      const anyFilterOff = Object.values(_filters).some(v => !v);
      list.innerHTML = `<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-6">${
        anyFilterOff ? 'Nothing on this day in the layers you have showing.' : 'No events on this day.'}</p>
        <button onclick="Calendar.showAddEvent('${dateStr}')"
          class="w-full text-sm text-indigo-500 font-medium py-2 border-2 border-dashed border-indigo-200 dark:border-indigo-800 rounded-xl">
          + Add Event</button>`;
    } else {
      list.innerHTML = actHtml + events.map(e => {
        const meta = TYPE_META[e.entry_type] || TYPE_META.other;
        const subj = e.subject_id ? _subjectById(e.subject_id) : null;
        return `
          <div class="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 mb-2">
            <span class="text-xl select-none mt-0.5">${meta.icon}</span>
            <div class="flex-1 min-w-0">
              ${subj ? `<div class="text-xs font-bold text-indigo-500 mb-0.5">${subj.icon} ${subj.name}</div>` : ''}
              <div class="font-semibold text-sm text-gray-800 dark:text-white">${e.topic_label}</div>
              ${e.duration_mins && e.entry_type==='study' ? `<div class="text-xs text-gray-500 dark:text-gray-400">${e.duration_mins} min</div>` : ''}
              ${e.notes ? `<div class="text-xs text-gray-500 mt-0.5 italic">${e.notes}</div>` : ''}
            </div>
            <div class="flex gap-0.5 ml-1 flex-shrink-0">
              <button onclick="Calendar.editEntry('${e.id}')" title="Edit"
                class="w-7 h-7 flex items-center justify-center rounded-lg text-base text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">✏️</button>
              <button onclick="Calendar.deleteEntry('${e.id}')" title="Delete"
                class="w-7 h-7 flex items-center justify-center rounded-lg text-base text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">🗑</button>
            </div>
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
    // Dropping it from _entries before knowing the delete landed makes a
    // refused delete look like it worked until the next page load brings the
    // event back.
    const { error } = await _sb.from('schedule_entries').delete().eq('id', id);
    if (error) {
      console.error('[Calendar.deleteEntry]', error.message);
      if (typeof toast !== 'undefined') toast('Could not remove that event. Please try again.', 3000);
      return;
    }
    _entries = _entries.filter(e => e.id !== id);
    closeDayModal();
    _renderCalendar();
    if (typeof toast !== 'undefined') toast('Event removed', 1500);
  }

  // ── Add / Edit manual event ──────────────────────────────
  function showAddEvent(dateStr) {
    closeDayModal();
    _editingEntryId = null;
    const m = _el('modal-add-event');
    if (!m) return;
    const titleEl = _el('add-event-modal-title'); if (titleEl) titleEl.textContent = 'Add Event';
    const saveBtn = _el('add-event-save-btn');   if (saveBtn) saveBtn.textContent = 'Save';
    const di = _el('add-event-date');  if (di) di.value = dateStr || _toDateStr(new Date());
    const ti = _el('add-event-type');  if (ti) ti.value = 'exam';
    const li = _el('add-event-label'); if (li) li.value = '';
    const ni = _el('add-event-notes'); if (ni) ni.value = '';
    const er = _el('add-event-error'); if (er) er.classList.add('hidden');
    m.classList.remove('hidden');
  }

  function editEntry(id) {
    const entry = _entries.find(e => e.id === id);
    if (!entry) return;
    closeDayModal();
    _editingEntryId = id;

    const m = _el('modal-add-event');
    if (!m) return;
    const titleEl = _el('add-event-modal-title'); if (titleEl) titleEl.textContent = 'Edit Event';
    const saveBtn = _el('add-event-save-btn');   if (saveBtn) saveBtn.textContent = 'Update';

    const di = _el('add-event-date');  if (di) di.value = entry.date;
    const ti = _el('add-event-type');
    if (ti) {
      const hasOpt = [...ti.options].some(o => o.value === entry.entry_type);
      if (!hasOpt) {
        const opt = document.createElement('option');
        opt.value = entry.entry_type; opt.textContent = '📚 Study Session';
        ti.appendChild(opt);
      }
      ti.value = entry.entry_type;
    }
    const li = _el('add-event-label'); if (li) li.value = entry.topic_label;
    const ni = _el('add-event-notes'); if (ni) ni.value = entry.notes || '';
    const er = _el('add-event-error'); if (er) er.classList.add('hidden');
    m.classList.remove('hidden');
  }

  function closeAddEvent() {
    _editingEntryId = null;
    const titleEl = _el('add-event-modal-title'); if (titleEl) titleEl.textContent = 'Add Event';
    const saveBtn = _el('add-event-save-btn');   if (saveBtn) saveBtn.textContent = 'Save';
    _el('modal-add-event')?.classList.add('hidden');
  }

  async function saveEvent() {
    const errEl = _el('add-event-error');
    if (!_sb)         { _showErr(errEl, 'Connection not ready. Please refresh the page.'); return; }
    if (!_studentId)  { _showErr(errEl, 'No student selected - please choose a student from the dropdown.'); return; }
    const date  = _el('add-event-date')?.value;
    const type  = _el('add-event-type')?.value  || 'other';
    const label = (_el('add-event-label')?.value || '').trim();
    const notes = (_el('add-event-notes')?.value || '').trim();
    if (!date)  { _showErr(errEl, 'Please select a date.'); return; }
    if (!label) { _showErr(errEl, 'Please enter an event name.'); return; }

    // ── UPDATE existing entry ──────────────────────
    if (_editingEntryId) {
      const { data, error } = await _sb.from('schedule_entries')
        .update({ date, topic_label: label, entry_type: type, notes: notes || null })
        .eq('id', _editingEntryId)
        .select('id, date, entry_type, topic_label, notes, duration_mins, subject_id, schedule_id, chapter_id').single();
      if (error) { _showErr(errEl, 'Could not update. Please try again.'); return; }
      const idx = _entries.findIndex(e => e.id === _editingEntryId);
      if (idx >= 0 && data) _entries[idx] = data;
      closeAddEvent();
      const d = _parseDate(date);
      _viewYear = d.getFullYear(); _viewMonth = d.getMonth();
      _selectedDate = date;
      _renderCalendar();
      if (typeof toast !== 'undefined') toast('Event updated ✓', 1500);
      return;
    }

    // ── INSERT new entry ───────────────────────────
    const sid = await _ensureSchedule();
    if (!sid)   { _showErr(errEl, 'Database not ready - please run supabase-migration.sql in your Supabase SQL editor, then refresh the page.'); return; }

    const { data, error } = await _sb.from('schedule_entries').insert({
      schedule_id: sid, student_id: _studentId,
      date, topic_label: label, entry_type: type,
      notes: notes || null, duration_mins: null,
    }).select('id, date, entry_type, topic_label, notes, duration_mins, subject_id, schedule_id, chapter_id').single();
    if (error) { _showErr(errEl, 'Could not save. Please try again.'); return; }

    _entries.push(data);
    closeAddEvent();
    const d = _parseDate(date);
    _viewYear = d.getFullYear(); _viewMonth = d.getMonth();
    _selectedDate = date;
    _renderCalendar();
    if (typeof toast !== 'undefined') toast('Event added! 📌', 1500);
  }

  // ── Reset schedule ────────────────────────────────
  function confirmReset() {
    if (!_studentId) {
      if (typeof toast !== 'undefined') toast('No student selected.', 2000);
      return;
    }
    if (typeof _confirmModal === 'function') {
      _confirmModal(
        'Delete all auto-generated study sessions? Manual events (exams, holidays, blocked days) will be kept.',
        _doResetSchedule,
        { icon: '🗑', okLabel: 'Reset Schedule', danger: true }
      );
    } else if (window.confirm('Delete all auto-generated study sessions?\n\nManual events (exams, holidays) will be kept.')) {
      _doResetSchedule();
    }
  }

  async function _doResetSchedule() {
    if (!_sb || !_studentId) return;
    await _sb.from('schedule_entries')
      .delete().eq('student_id', _studentId).eq('entry_type', 'study');
    try { localStorage.removeItem(`mm_schedule_${_studentId}`); } catch(e) {}
    _entries = _entries.filter(e => e.entry_type !== 'study');
    _renderCalendar();
    if (typeof toast !== 'undefined') toast('Study sessions cleared ✓', 2000);
  }

  // ── Generate timetable (multi-subject) ────────────
  const _GEN_MAX_WEEKS = 26;
  const _GEN_DEFAULTS = {
    weeks: 4, studyDays: [1,2,3,4,5], mixed: false,
    block: 1,          // single mode: consecutive study days per subject before rotating
    perDay: 0,         // mixed mode: subjects per day, 0 = all
    maxPerDay: 90,     // minutes cap per study day
    session: 30,       // minutes per chapter visit
    focus: 'weak',     // weak | balanced | order
    includeBonus: true,
  };
  function _genSetting(key) { return _gen[key] ?? _GEN_DEFAULTS[key]; }
  function _addDays(dateStr, n) { const d = _parseDate(dateStr); d.setDate(d.getDate() + n); return _toDateStr(d); }
  function _daysBetween(a, b) { return Math.round((_parseDate(b) - _parseDate(a)) / 86400000); }
  function _clampInt(v, lo, hi, dflt) { const n = parseInt(v); return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : dflt; }

  async function showGenModal() {
    // Gated before the modal opens: filling in weeks and study days and only
    // then being refused is worse than not opening it at all.
    if (typeof _planAllowsFeature === 'function' && !_planAllowsFeature('timetable_generator')) {
      if (typeof _showFeatureModal === 'function') _showFeatureModal('timetable_generator');
      return;
    }

    const m = _el('modal-gen-timetable');
    if (!m) return;

    const today = new Date();
    const dtu   = (8 - today.getDay()) % 7 || 7;
    const nextMon = new Date(today);
    nextMon.setDate(today.getDate() + dtu);

    const sd = _el('gen-start-date'); if (sd) sd.value = _toDateStr(nextMon);
    const wk = _el('gen-weeks');      if (wk) wk.value = _clampInt(_genSetting('weeks'), 1, _GEN_MAX_WEEKS, 4);
    const er = _el('gen-error');      if (er) er.classList.add('hidden');
    genSyncFromWeeks();

    [0,1,2,3,4,5,6].forEach(i => {
      const cb = _el(`gen-day-${i}`);
      if (cb) cb.checked = (_genSetting('studyDays')).includes(i);
    });

    const mx = _el('gen-mixed');  if (mx) mx.checked = !!_genSetting('mixed');
    const sg = _el('gen-single'); if (sg) sg.checked = !_genSetting('mixed');
    const setSel = (id, v) => { const el = _el(id); if (el) el.value = String(v); };
    setSel('gen-block',   _genSetting('block'));
    setSel('gen-perday',  _genSetting('perDay'));
    setSel('gen-maxday',  _genSetting('maxPerDay'));
    setSel('gen-session', _genSetting('session'));
    setSel('gen-focus',   _genSetting('focus'));
    const bonus = _el('gen-bonus'); if (bonus) bonus.checked = _genSetting('includeBonus') !== false;

    // "Until exam" shortcut: only offered when the parent has actually put an
    // exam on the calendar, and only the next one - a plan that runs past the
    // exam it is revising for is not a plan.
    const todayStr = _toDateStr(today);
    const nextExam = _entries
      .filter(e => e.entry_type === 'exam' && e.date > todayStr)
      .sort((a, b) => a.date.localeCompare(b.date))[0];
    const ue = _el('gen-until-exam');
    if (ue) {
      if (nextExam) {
        const d = _parseDate(nextExam.date);
        ue.textContent = `📝 Until exam · ${d.getDate()} ${d.toLocaleString('en-GB', { month: 'short' })}`;
        ue.dataset.date = nextExam.date;
        ue.classList.remove('hidden');
      } else {
        ue.classList.add('hidden');
        delete ue.dataset.date;
      }
    }

    _renderSubjectHours();
    genStyleChanged();
    m.classList.remove('hidden');
  }

  // Start + weeks → end date. The end date is inclusive, so 1 week from a
  // Monday ends on the Sunday, not the next Monday.
  function genSyncFromWeeks() {
    const sd = _el('gen-start-date'), ed = _el('gen-end-date'), wk = _el('gen-weeks');
    if (!sd || !ed || !wk || !sd.value) return;
    const weeks = _clampInt(wk.value, 1, _GEN_MAX_WEEKS, 4);
    ed.value = _addDays(sd.value, weeks * 7 - 1);
    ed.min = sd.value;
    genPreview();
  }

  // End date → weeks (rounded up, so the last partial week is still planned).
  function genSyncFromEnd() {
    const sd = _el('gen-start-date'), ed = _el('gen-end-date'), wk = _el('gen-weeks');
    if (!sd || !ed || !wk || !sd.value || !ed.value) return;
    let days = _daysBetween(sd.value, ed.value) + 1;
    if (days < 1) { ed.value = sd.value; days = 1; }
    const weeks = Math.min(_GEN_MAX_WEEKS, Math.ceil(days / 7));
    if (days > _GEN_MAX_WEEKS * 7) ed.value = _addDays(sd.value, _GEN_MAX_WEEKS * 7 - 1);
    wk.value = weeks;
    genPreview();
  }

  function genUntilExam() {
    const ue = _el('gen-until-exam'), ed = _el('gen-end-date'), sd = _el('gen-start-date');
    if (!ue?.dataset.date || !ed || !sd) return;
    const last = _addDays(ue.dataset.date, -1);
    if (sd.value && last < sd.value) {
      _showErr(_el('gen-error'), 'That exam is before the start date - move the start date earlier first.');
      return;
    }
    ed.value = last;
    genSyncFromEnd();
  }

  function genStyleChanged() {
    const mixed = _el('gen-mixed')?.checked;
    _el('gen-block-wrap')?.classList.toggle('hidden', !!mixed);
    _el('gen-perday-wrap')?.classList.toggle('hidden', !mixed);
    genPreview();
  }

  // Everything the generator will use, read from the form in one place, with
  // every number clamped here - the <input max> attributes are advisory and a
  // typed 1e9 used to reach Array(...).fill() further down.
  function _genReadForm() {
    const grade    = _studentGrade || 5;
    const subjects = _subjectsForGrade(grade);
    const subjHours = {};
    subjects.forEach(s => {
      const safeId  = s.id.replace(/[^a-z0-9]/gi,'_');
      const chk     = _el(`gen-subj-chk-${safeId}`);
      const inp     = _el(`gen-subj-${safeId}`);
      const enabled = chk ? chk.checked : true;
      const h = parseFloat(inp?.value);
      subjHours[s.id] = enabled && Number.isFinite(h) ? Math.min(20, Math.max(0, h)) : 0;
    });
    const startDate = _el('gen-start-date')?.value || null;
    let endDate     = _el('gen-end-date')?.value || null;
    if (startDate && (!endDate || endDate < startDate)) endDate = _addDays(startDate, 27);
    const weeks = startDate ? Math.min(_GEN_MAX_WEEKS, Math.ceil((_daysBetween(startDate, endDate) + 1) / 7)) : 4;
    return {
      startDate, endDate, weeks,
      studyDays:    [0,1,2,3,4,5,6].filter(i => _el(`gen-day-${i}`)?.checked),
      mixed:        !!_el('gen-mixed')?.checked,
      block:        _clampInt(_el('gen-block')?.value, 1, 7, 1),
      perDay:       _clampInt(_el('gen-perday')?.value, 0, 6, 0),
      maxPerDay:    _clampInt(_el('gen-maxday')?.value, 15, 240, 90),
      session:      _clampInt(_el('gen-session')?.value, 10, 120, 30),
      focus:        ['weak','balanced','order'].includes(_el('gen-focus')?.value) ? _el('gen-focus').value : 'weak',
      includeBonus: _el('gen-bonus') ? _el('gen-bonus').checked : true,
      subjectHours: subjHours,
      subjects,
    };
  }

  function _genStudyDates(cfg) {
    const blockedDates = new Set(
      _entries.filter(e => e.entry_type === 'blocked' || e.entry_type === 'holiday').map(e => e.date)
    );
    const out = [];
    if (!cfg.startDate || !cfg.endDate) return out;
    const total = Math.min(_GEN_MAX_WEEKS * 7, _daysBetween(cfg.startDate, cfg.endDate) + 1);
    const start = _parseDate(cfg.startDate);
    for (let i = 0; i < total; i++) {
      const d  = new Date(start); d.setDate(start.getDate() + i);
      const ds = _toDateStr(d);
      if (cfg.studyDays.includes(d.getDay()) && !blockedDates.has(ds)) out.push(ds);
    }
    return out;
  }

  // Which subject(s) study on which date. Done BEFORE any minutes are worked
  // out, so each subject's weekly hours are spread over the days it actually
  // got - the old code estimated that count from the weights and was off
  // whenever rounding did not land exactly.
  function _genAssignDays(cfg, dates, active) {
    const minHrs  = Math.min(...active.map(s => cfg.subjectHours[s.id]));
    const weights = active.map(s => Math.min(10, Math.max(1, Math.round(cfg.subjectHours[s.id] / minHrs))));
    const buckets = active.map((s, i) => Array(weights[i]).fill(s));
    const rotation = [];
    let any = true;
    while (any) {
      any = false;
      for (const b of buckets) if (b.length) { rotation.push(b.shift()); any = true; }
    }
    const perDate = {};
    if (!cfg.mixed) {
      dates.forEach((ds, i) => {
        perDate[ds] = [rotation[Math.floor(i / cfg.block) % rotation.length]];
      });
    } else {
      const k = cfg.perDay > 0 ? Math.min(cfg.perDay, active.length) : active.length;
      let cursor = 0;
      dates.forEach(ds => {
        const picked = [];
        let guard = rotation.length * 2;
        while (picked.length < k && guard-- > 0) {
          const s = rotation[cursor % rotation.length];
          cursor++;
          if (!picked.includes(s)) picked.push(s);
        }
        perDate[ds] = picked;
      });
    }
    return perDate;
  }

  // Minutes each subject gets on each of its days: its total time over the
  // whole range (hours/week × weeks of calendar time) split over the days it
  // was given, then capped by the parent's per-day ceiling.
  function _genMinutes(cfg, dates, perDate, active) {
    const calendarWeeks = Math.max(1, (_daysBetween(cfg.startDate, cfg.endDate) + 1) / 7);
    const dayCount = {};
    dates.forEach(ds => (perDate[ds] || []).forEach(s => { dayCount[s.id] = (dayCount[s.id] || 0) + 1; }));
    const perSubject = {};
    active.forEach(s => {
      const n = dayCount[s.id] || 0;
      perSubject[s.id] = n ? Math.max(10, Math.round((cfg.subjectHours[s.id] * 60 * calendarWeeks) / n)) : 0;
    });
    const plan = {};
    dates.forEach(ds => {
      const subs = perDate[ds] || [];
      const wanted = subs.map(s => perSubject[s.id]);
      const total  = wanted.reduce((a, b) => a + b, 0);
      // Over the cap: scale every subject down in proportion, never drop one.
      const scale  = total > cfg.maxPerDay ? cfg.maxPerDay / total : 1;
      plan[ds] = subs.map((s, i) => ({ subject: s, mins: Math.round(wanted[i] * scale) })).filter(x => x.mins >= 10);
    });
    return { plan, perSubject, dayCount };
  }

  function genPreview() {
    const box = _el('gen-preview');
    if (!box) return;
    const cfg = _genReadForm();
    const dates = _genStudyDates(cfg);
    const active = cfg.subjects.filter(s => (cfg.subjectHours[s.id] || 0) > 0 && (s.chapters || []).length);
    if (!cfg.startDate || !dates.length || !active.length) {
      box.textContent = !active.length ? 'Tick at least one subject with some hours.'
                      : 'No study days in that range.';
      return;
    }
    const perDate = _genAssignDays(cfg, dates, active);
    const { plan, dayCount } = _genMinutes(cfg, dates, perDate, active);
    let totalMins = 0, sessions = 0;
    dates.forEach(ds => plan[ds].forEach(x => { totalMins += x.mins; sessions += Math.ceil(x.mins / cfg.session); }));
    const avg = Math.round(totalMins / dates.length);
    const missing = active.filter(s => !dayCount[s.id]).map(s => s.name);
    const parts = [
      `<b>${dates.length}</b> study days over ${cfg.weeks} week${cfg.weeks === 1 ? '' : 's'}`,
      `about <b>${avg} min</b> a day`,
      `~<b>${sessions}</b> sessions`,
    ];
    let html = parts.join(' · ');
    const wantedMins = active.reduce((a, s) => a + cfg.subjectHours[s.id], 0) * 60 * Math.max(1, (_daysBetween(cfg.startDate, cfg.endDate) + 1) / 7);
    if (totalMins < wantedMins * 0.8) {
      html += `<br>⚠ The daily cap trims this to ${Math.round(totalMins / 60)}h of the ${Math.round(wantedMins / 60)}h requested - raise the cap or add study days.`;
    }
    if (missing.length) html += `<br>⚠ ${missing.join(', ')}: no days left in this range - lengthen the plan or reduce "stay on a subject".`;
    box.innerHTML = html;
  }

  function _renderSubjectHours() {
    const el = _el('gen-subject-hours');
    if (!el) return;

    const grade    = _studentGrade || 5;
    const subjects = _subjectsForGrade(grade);
    const saved    = _gen.subjectHours || {};

    if (!subjects.length) {
      el.innerHTML = '<p class="text-xs text-gray-500 dark:text-gray-400">No subjects found for this grade.</p>';
      return;
    }

    el.innerHTML = subjects.map(s => `
      <div class="flex items-center gap-3 py-1.5 border-b border-gray-100 dark:border-gray-700 last:border-0">
        <span class="text-lg select-none shrink-0">${s.icon}</span>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">${s.name}</span>
        <div class="flex items-center gap-1.5 shrink-0">
          <input type="number" min="0" max="20" step="0.5" value="${saved[s.id] ?? 2}"
            id="gen-subj-${s.id.replace(/[^a-z0-9]/gi,'_')}"
            class="w-14 text-center border border-gray-300 dark:border-gray-600 rounded-lg px-1 py-0.5 text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
          <span class="text-xs text-gray-500 dark:text-gray-400">h/wk</span>
          <label class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 ml-1 cursor-pointer">
            <input type="checkbox" ${(saved[s.id] ?? 2) > 0 ? 'checked' : ''}
              onchange="document.getElementById('gen-subj-${s.id.replace(/[^a-z0-9]/gi,'_')}').disabled=!this.checked"
              id="gen-subj-chk-${s.id.replace(/[^a-z0-9]/gi,'_')}">
            include
          </label>
        </div>
      </div>`).join('');
  }

  function closeGenModal() { _el('modal-gen-timetable')?.classList.add('hidden'); }

  // Weighted, CYCLIC rotation of a subject's chapters - weaker chapters earn
  // more repeat slots (so they come up more often), every chapter still gets
  // at least one, and indexing with `% rotation.length` means it loops back
  // around forever. This replaces a one-shot queue that got `.shift()`-ed down
  // to nothing: a subject with few chapters (or a long multi-week plan) used
  // to run dry partway through and leave silent gaps in the timetable for the
  // rest of the plan, instead of doing what real revision does - come back to
  // the same topics again.
  function _buildChapterRotation(subj, chapData, focus = 'weak', includeBonus = true) {
    let chs = subj.chapters || [];
    if (!includeBonus) {
      const regular = chs.filter(ch => !ch.enrichment);
      if (regular.length) chs = regular;
    }
    if (!chs.length) return [];
    if (focus === 'order') return chs.slice();

    const scored = chs.map(ch => {
      const c   = chapData[ch.id] || { attempted: 0, correct: 0 };
      // Needs a few real attempts before an accuracy figure is trusted - one
      // lucky or unlucky guess should not swing a chapter's whole weighting.
      const acc = c.attempted >= 3 ? c.correct / c.attempted : null;
      // examWeight ?? not ||: a deliberate 0 (enrichment chapter excluded
      // from exams) must stay 0, not silently become the "2" default.
      const examWt = ch.examWeight ?? 2;
      let slots;
      if (focus === 'balanced') slots = 2;
      else if (acc === null)    slots = 3; // untried - worth a normal look
      else if (acc < 0.5)       slots = 4; // weak - seen most often
      else if (acc < 0.7)       slots = 3;
      else if (acc < 0.85)      slots = 2;
      else                      slots = 1; // mastered - still gets periodic revision, never dropped entirely
      slots = Math.max(1, Math.round(slots * (examWt / 2)));
      return { ...ch, acc, slots };
    }).sort((a, b) => (a.acc ?? -1) - (b.acc ?? -1)); // weakest/untried first, cosmetic only

    // Weighted round-robin interleave (same bucket-shift technique used for
    // subject-level rotation) so weak chapters recur more often, but nothing
    // is ever starved down to a long unbroken run of just one chapter.
    const buckets = scored.map(ch => Array(ch.slots).fill(ch));
    const rotation = [];
    let any = true;
    while (any) {
      any = false;
      for (const b of buckets) if (b.length) { rotation.push(b.shift()); any = true; }
    }
    return rotation;
  }

  async function generateTimetable() {
    if (typeof _planAllowsFeature === 'function' && !_planAllowsFeature('timetable_generator')) {
      closeGenModal();
      if (typeof _showFeatureModal === 'function') _showFeatureModal('timetable_generator');
      return;
    }
    const errEl = _el('gen-error');
    const btn   = _el('gen-submit-btn');
    const reset = () => { if (btn) { btn.disabled = false; btn.textContent = '⚡ Generate Schedule'; } };
    const cfg   = _genReadForm();

    if (!cfg.startDate)          { _showErr(errEl, 'Please pick a start date.'); return; }
    if (!cfg.studyDays.length)   { _showErr(errEl, 'Select at least one study day.'); return; }
    if (!_studentId) return;

    const totalHrsPerWeek = Object.values(cfg.subjectHours).reduce((a,b) => a+b, 0);
    if (totalHrsPerWeek <= 0) { _showErr(errEl, 'Please set study hours for at least one subject.'); return; }

    if (btn) { btn.disabled = true; btn.textContent = 'Generating…'; }
    const { subjects, ...settings } = cfg;
    _gen = { ..._gen, ...settings };

    const allStudyDates = _genStudyDates(cfg);
    if (!allStudyDates.length) {
      _showErr(errEl, 'Every day in this range is marked Holiday/No Study — pick different dates or study days.');
      reset(); return;
    }

    let chapData = {};
    try {
      const prog = await Store.loadStudentProgress(_studentId);
      chapData   = prog?.chapters || {};
    } catch(e) {}

    const activeSubjects = subjects.filter(s => (cfg.subjectHours[s.id] || 0) > 0 && (s.chapters || []).length);
    if (!activeSubjects.length) {
      _showErr(errEl, 'Please set study hours for at least one subject.');
      reset(); return;
    }

    const rotations = {};
    const cursors   = {};
    for (const subj of activeSubjects) {
      rotations[subj.id] = _buildChapterRotation(subj, chapData, cfg.focus, cfg.includeBonus);
      cursors[subj.id]   = 0;
    }

    // Pulls chapters from a subject's rotation to fill one day's time budget,
    // instead of stopping after a single chapter - a parent who set "2h/week"
    // for a subject should see roughly 2h/week of sessions, not one block per
    // day with the rest of the requested time silently dropped.
    function _fillFromRotation(subjId, minsAvailable) {
      const rotation = rotations[subjId];
      const picks = [];
      if (!rotation || !rotation.length) return picks;
      let minsLeft = minsAvailable;
      let lastId   = null;
      let guard    = rotation.length * 2 + 8;
      while (minsLeft >= 10 && guard-- > 0) {
        const ch = rotation[cursors[subjId] % rotation.length];
        cursors[subjId]++;
        if (ch.id === lastId && rotation.length > 1) continue; // avoid "Fractions, Fractions" back to back
        const mins = Math.min(cfg.session, minsLeft);
        picks.push({ chapter: ch, mins });
        lastId = ch.id;
        minsLeft -= mins;
      }
      return picks;
    }

    const perDate  = _genAssignDays(cfg, allStudyDates, activeSubjects);
    const { plan } = _genMinutes(cfg, allStudyDates, perDate, activeSubjects);

    const allEntries = [];
    for (const dateStr of allStudyDates) {
      for (const { subject, mins } of plan[dateStr]) {
        for (const { chapter, mins: m } of _fillFromRotation(subject.id, mins)) {
          allEntries.push({ date: dateStr, subject_id: subject.id, chapter_id: chapter.id,
            topic_label: `${chapter.icon} ${chapter.name}`, duration_mins: m, entry_type: 'study' });
        }
      }
    }
    if (!allEntries.length) {
      _showErr(errEl, 'Those settings leave no time for any session - raise the hours or the daily cap.');
      reset(); return;
    }

    // Persist
    const sid = await _ensureSchedule();
    if (!sid) {
      _showErr(errEl, 'Database not ready - please run supabase-migration.sql in your Supabase SQL editor, then refresh the page.');
      reset(); return;
    }

    const { error: settingsErr } = await _sb.from('study_schedules')
      .update({ settings: _gen, updated_at: new Date().toISOString() }).eq('id', sid);
    if (settingsErr) console.error('[Calendar.generate] settings', settingsErr.message);

    // Regeneration is destructive: the old study entries go first. If that
    // delete fails, inserting on top would double every session, so stop here
    // with the previous timetable intact.
    const { error: clearErr } = await _sb.from('schedule_entries')
      .delete().eq('schedule_id', sid).eq('entry_type', 'study');
    if (clearErr) {
      console.error('[Calendar.generate] clear', clearErr.message);
      _showErr(errEl, 'Could not clear the previous timetable — nothing was changed. Please try again.');
      reset(); return;
    }

    const rows = allEntries.map(e => ({ ...e, schedule_id: sid, student_id: _studentId }));
    // The delete above already removed the old plan, so a failed chunk leaves a
    // PARTIAL timetable. Report what actually landed rather than what was
    // intended, and cache only that - the student's offline copy must never
    // list sessions the database does not have.
    let saved = 0, insertErr = null;
    for (let i = 0; i < rows.length; i += 200) {
      const chunk = rows.slice(i, i + 200);
      const { error } = await _sb.from('schedule_entries').insert(chunk);
      if (error) { insertErr = error; break; }
      saved += chunk.length;
    }

    await _loadEntries();
    // Cache entries to localStorage so students can see the plan without a Supabase query
    try {
      localStorage.setItem(`mm_schedule_${_studentId}`, JSON.stringify({
        generated: new Date().toISOString(),
        entries: rows.slice(0, saved),
      }));
    } catch(e) {}

    const d0 = _parseDate(cfg.startDate);
    _viewYear = d0.getFullYear(); _viewMonth = d0.getMonth();
    closeGenModal();
    _renderCalendar();

    if (insertErr) {
      console.error('[Calendar.generate] insert', insertErr.message);
      if (typeof toast !== 'undefined') {
        toast(`Only ${saved} of ${rows.length} sessions could be saved — generate again to complete the timetable.`, 5000);
      }
      reset(); return;
    }

    if (typeof toast !== 'undefined') toast(`Timetable generated - ${allEntries.length} sessions across ${activeSubjects.length} subjects, ${cfg.startDate} → ${cfg.endDate} 📅`, 4000);
    reset();
  }

  // ── Print ─────────────────────────────────────────
  // A real weekly grid (all 7 days, every week, sized to fill a landscape
  // page) rather than a cramped one-column-per-entry-day table: a parent
  // printing this to pin on a fridge needs to read it from across the room,
  // not squint at 11px text crammed next to dotted separators.
  // ── Child-facing: what I have already done ────────────────────────────
  // The mirror of getUpcoming(). Same shape of contract: loads for a student
  // WITHOUT calling setStudent(), which would repaint the parent calendar grid
  // whose elements do not exist on a child's screen.
  //
  // ⚠ Returns activity UNFILTERED. _filters is the parent's auditing choice,
  // stored per browser under mm_cal_filters — on a shared phone a parent who
  // hid exams to read something would otherwise silently blank a chunk of the
  // child's own record of their work.
  //
  // ⚠ Returns only what the child DID. There is deliberately no "missed"
  // counterpart: on the parent's calendar an unticked plan row is information,
  // on a child's screen it is a list of their own failures, every time they
  // open it. The plan they can still act on is what getUpcoming() is for.
  async function getRecentActivity(studentId, days = 14) {
    if (!studentId) return [];
    try {
      if (_studentId !== studentId) { _studentId = studentId; _activity = []; }
      if (!_activity.length) await _loadActivity();
    } catch (_) { return []; }

    const from = new Date();
    from.setDate(from.getDate() - (days - 1));
    const fromStr = _toDateStr(from);
    const today   = _toDateStr(new Date());

    return _activity
      .filter(a => a.date >= fromStr && a.date <= today)
      .sort((a, b) => b.date.localeCompare(a.date))
      .map(a => ({
        kind: a.kind, date: a.date, title: a.title, detail: a.detail, pct: a.pct,
        icon: ACT_META[a.kind].icon,
        label: ACT_META[a.kind].label,
        subjectName: a.subject ? (a.subject.subject || a.subject.name || '') : '',
        subjectIcon: a.subject ? (a.subject.icon || '') : '',
        isToday: a.date === today,
      }));
  }

  // Chapter ids the child has already practised today, so the plan can tick off
  // what is done instead of showing it as still outstanding.
  function doneTodayChapterIds() {
    const today = _toDateStr(new Date());
    return new Set(_activity.filter(a => a.date === today && a.chapterId).map(a => a.chapterId));
  }

  function print() {
    const printDiv = _el('cal-print-view');
    if (!printDiv) { window.print(); return; }

    const relevant = _entries.filter(e => e.entry_type === 'study' || e.entry_type === 'exam');
    if (!relevant.length) {
      if (typeof toast !== 'undefined') toast('No sessions to print yet.', 2000);
      return;
    }

    const byDate = {};
    relevant.forEach(e => { (byDate[e.date] = byDate[e.date] || []).push(e); });

    // Holiday/blocked days explain an otherwise-mysterious gap in the grid
    // instead of the day just looking forgotten.
    const restLookup = {};
    _entries.forEach(e => {
      if (e.entry_type === 'holiday' || e.entry_type === 'blocked') restLookup[e.date] = e;
    });

    const weekStarts = [...new Set(relevant.map(e => {
      const d = _parseDate(e.date), sun = new Date(d);
      sun.setDate(d.getDate() - d.getDay());
      return _toDateStr(sun);
    }))].sort();

    // Hours actually scheduled per subject - the sanity check a parent skims
    // first is "does this match what I asked for", computed from the real
    // entries rather than echoing back the hours they typed into the form.
    const bySubjectMins = {};
    relevant.filter(e => e.entry_type === 'study').forEach(e => {
      bySubjectMins[e.subject_id] = (bySubjectMins[e.subject_id] || 0) + (e.duration_mins || 0);
    });
    const summaryChips = Object.entries(bySubjectMins).map(([sid, mins]) => {
      const s     = _subjectById(sid);
      const color = _subjectPrintColor(s);
      const hrs   = (mins / 60).toFixed(1).replace(/\.0$/, '');
      return `<span style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;
        background:${color}18;border:1px solid ${color}55;font-size:11px;font-weight:600;color:${color};white-space:nowrap">
        <span style="width:8px;height:8px;border-radius:50%;background:${color};flex-shrink:0"></span>${s ? `${s.icon} ${s.name}` : sid} · ${hrs}h</span>`;
    }).join('');

    printDiv.innerHTML = `
      <style>
        @page { size: A4 landscape; margin: 12mm; }
        #cal-print-view, #cal-print-view * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .pt-week { page-break-inside: avoid; margin-bottom: 20px; }
      </style>
      <div style="font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;padding:0 2px">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:16px;border-bottom:3px solid #1e293b;padding-bottom:10px;margin-bottom:16px">
          <div>
            <h1 style="font-size:26px;font-weight:800;margin:0 0 3px;letter-spacing:-0.02em">📅 ${_esc(_studentName || 'Student')}'s Study Timetable</h1>
            <p style="color:#64748b;margin:0;font-size:12px">${_studentGrade ? `Grade ${_studentGrade} · ` : ''}${weekStarts.length} week${weekStarts.length > 1 ? 's' : ''} · Printed ${new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</p>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;max-width:380px;justify-content:flex-end">${summaryChips}</div>
        </div>

        ${weekStarts.map(wkStart => {
          const wkStartD = _parseDate(wkStart);
          const days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date(wkStartD); d.setDate(wkStartD.getDate() + i); return _toDateStr(d);
          });
          const wkEndD = new Date(wkStartD); wkEndD.setDate(wkStartD.getDate() + 6);
          return `
          <div class="pt-week">
            <h2 style="font-size:12.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#475569;margin:0 0 8px">
              Week of ${wkStartD.toLocaleDateString('en-US',{month:'short',day:'numeric'})} – ${wkEndD.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
            </h2>
            <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:7px">
              ${days.map(ds => {
                const d = _parseDate(ds);
                const isWeekend  = d.getDay() === 0 || d.getDay() === 6;
                const dayEntries = byDate[ds] || [];
                const rest       = restLookup[ds];
                return `
                <div style="border:1px solid #e2e8f0;border-radius:8px;min-height:118px;overflow:hidden;background:${isWeekend ? '#f8fafc' : '#fff'}">
                  <div style="background:#f1f5f9;padding:5px 8px;border-bottom:1px solid #e2e8f0">
                    <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#94a3b8">${d.toLocaleDateString('en-US',{weekday:'short'})}</div>
                    <div style="font-size:13px;font-weight:700;color:#1e293b">${d.toLocaleDateString('en-US',{month:'short',day:'numeric'})}</div>
                  </div>
                  <div style="padding:6px">
                    ${rest
                      ? `<div style="font-size:11px;color:#94a3b8;font-style:italic;padding:6px 2px">${TYPE_META[rest.entry_type]?.icon || '📌'} ${_esc(rest.topic_label || TYPE_META[rest.entry_type]?.label || '')}</div>`
                      : dayEntries.length
                        ? dayEntries.map(e => {
                            const s      = e.subject_id ? _subjectById(e.subject_id) : null;
                            const isExam = e.entry_type === 'exam';
                            const color  = isExam ? '#dc2626' : _subjectPrintColor(s);
                            return `<div style="border-left:3px solid ${color};background:${color}0f;border-radius:4px;padding:5px 7px;margin-bottom:5px">
                              <div style="font-size:10px;font-weight:700;color:${color};display:flex;align-items:center;justify-content:space-between;gap:4px">
                                <span>${isExam ? '📝 EXAM' : (s ? `${s.icon} ${_esc(s.name)}` : '📚 Study')}</span>
                                ${e.duration_mins ? `<span style="font-weight:600;color:#64748b">${e.duration_mins}m</span>` : ''}
                              </div>
                              <div style="font-size:11.5px;color:#1e293b;margin-top:1px;line-height:1.3">${_esc(e.topic_label)}</div>
                            </div>`;
                          }).join('')
                        : `<div style="font-size:10.5px;color:#cbd5e1;text-align:center;padding-top:18px">—</div>`}
                  </div>
                </div>`;
              }).join('')}
            </div>
          </div>`;
        }).join('')}

        <p style="margin-top:18px;font-size:10px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:8px">
          Generated by PSAC Practice · Times are a guide — adjust freely to fit the evening.
        </p>
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
    const container  = _el('dash-today-plan');
    const listEl     = _el('dash-today-entries');
    const dateEl     = _el('dash-today-date');
    const titleEl    = _el('dash-today-title');
    if (!container || !listEl) return;

    if (!_sb || !studentId) { container.classList.add('hidden'); return; }

    const today = _toDateStr(new Date());

    // Find schedule for this student
    const { data: scheds } = await _sb.from('study_schedules')
      .select('id').eq('student_id', studentId)
      .order('created_at', { ascending: false }).limit(1);

    // Helper: resolve upcoming entries from a flat list
    function _pickUpcoming(entries) {
      const future = entries.filter(e => e.date >= today).sort((a,b) => a.date < b.date ? -1 : 1);
      return future;
    }

    let upcoming = null;

    if (scheds?.length) {
      const { data } = await _sb.from('schedule_entries')
        .select('id, date, entry_type, topic_label, notes, duration_mins, subject_id, schedule_id, chapter_id')
        .eq('schedule_id', scheds[0].id)
        .gte('date', today)
        .order('date', { ascending: true })
        .limit(50);
      upcoming = data;
    }

    // Fall back to localStorage cache if Supabase returned nothing
    if (!upcoming?.length) {
      try {
        const cached = JSON.parse(localStorage.getItem(`mm_schedule_${studentId}`));
        if (cached?.entries?.length) upcoming = _pickUpcoming(cached.entries);
      } catch(e) {}
    }

    if (!upcoming?.length) { container.classList.add('hidden'); return; }

    // Use today's entries if present, otherwise fall back to the next scheduled day
    const firstDate   = upcoming[0].date;
    const isToday     = firstDate === today;
    const entries     = upcoming.filter(e => e.date === firstDate);

    const displayDate = _parseDate(firstDate).toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
    if (dateEl)  dateEl.textContent  = displayDate;
    if (titleEl) titleEl.textContent = isToday ? '📅 Today\'s Study Plan' : `📅 Next Up - ${displayDate}`;

    // Build cards
    const subjects = typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [];

    // What the child has already practised today, so a session they have done
    // reads as done instead of nagging them to repeat it. Loaded here because
    // this runs on the dashboard, where nothing else has touched _activity.
    let doneToday = new Set();
    try {
      if (_studentId !== studentId) { _studentId = studentId; _activity = []; }
      if (!_activity.length) await _loadActivity();
      doneToday = doneTodayChapterIds();
    } catch (_) { /* the plan must still render if history is unavailable */ }

    listEl.innerHTML = entries.map(e => {
      const meta  = TYPE_META[e.entry_type] || TYPE_META.other;
      const subj  = e.subject_id ? subjects.find(s => s.id === e.subject_id) : null;
      const notesBased   = subj?.notesBased || false;
      const practiceble  = subj?.practiceble !== false;
      // chapter_id is now selected, but rows written before it was populated
      // still have none — fall back to matching the display label, the same way
      // getUpcoming() always has.
      const chapId = e.chapter_id || (_resolveChapter(e).chapter || {}).id || '';
      const isDone = isToday && chapId && doneToday.has(chapId);

      let actionBtn = '';
      if (isDone) {
        actionBtn = `<div class="mt-2 inline-flex items-center gap-1.5 text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-semibold px-3 py-1.5 rounded-lg">
          ✅ Done today</div>`;
      } else if (e.entry_type === 'study' && subj) {
        if (notesBased) {
          actionBtn = `<button onclick="Calendar.showNotes('${e.subject_id}','${chapId}')"
            class="mt-2 text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 font-semibold px-3 py-1.5 rounded-lg hover:bg-indigo-200 transition-colors">
            📖 View Notes</button>`;
        } else if (practiceble) {
          actionBtn = `<button onclick="Calendar.startPractice('${e.subject_id}','${chapId}')"
            class="mt-2 text-xs bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300 font-semibold px-3 py-1.5 rounded-lg hover:bg-green-200 transition-colors">
            ✅ Practice Now</button>`;
        }
      }

      return `
        <div class="flex items-start gap-3 p-3 rounded-xl shadow-sm border ${isDone
          ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50'
          : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700'}">
          <span class="text-2xl select-none mt-0.5">${subj ? subj.icon : meta.icon}</span>
          <div class="flex-1 min-w-0">
            ${subj ? `<div class="text-xs font-bold text-indigo-500 mb-0.5">${subj.name}</div>` : ''}
            <div class="font-semibold text-sm text-gray-800 dark:text-white">${e.topic_label}</div>
            ${e.duration_mins ? `<div class="text-xs text-gray-500 dark:text-gray-400">${e.duration_mins} min</div>` : ''}
            ${e.notes ? `<div class="text-xs text-gray-500 italic mt-0.5">${e.notes}</div>` : ''}
            ${actionBtn}
          </div>
        </div>`;
    }).join('');

    container.classList.remove('hidden');
  }

  // ── Practice link ─────────────────────────────────
  function startPractice(subjectId, chapterId) {
    const packs = typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [];
    const pack  = packs.find(p => p.id === subjectId);
    if (!pack || pack.comingSoon) {
      if (typeof toast !== 'undefined') toast('Practice for this subject coming soon! 📚', 2500);
      return;
    }

    // Activate the pack globally so the chapter-select and quiz screens use it
    activateSubjectPack(pack.id);
    const chs = pack._chapters || pack.chapters || [];
    if (typeof QuestionLoader !== 'undefined') QuestionLoader.loadSubject(pack.id).catch(() => {});

    if (typeof showScreen !== 'undefined') showScreen('chapter-select');

    if (chapterId) {
      const ch = chs.find(c => c.id === chapterId);
      if (typeof toast !== 'undefined') toast(ch ? `Tap "${ch.name}" to start! 🚀` : 'Pick a chapter to practice', 3000);
    }
  }

  return {
    render, setStudent, getUpcoming,
    prevMonth, nextMonth,
    openDay, closeDayModal,
    showAddEvent, closeAddEvent, saveEvent,
    editEntry, deleteEntry,
    confirmReset,
    showGenModal, closeGenModal, generateTimetable, genPreview, genSyncFromWeeks, genSyncFromEnd, genUntilExam, genStyleChanged,
    showNotes, closeNotes,
    renderTodayPlan, startPractice,
    getRecentActivity, doneTodayChapterIds,
    toggleFilter,
    print,
  };
})();
