'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice - Teacher insights
//  Pure functions shared by the teacher Home, the classroom screen and the
//  results screen. No DOM, no network: everything here takes the rows the
//  server already returns (teacher_guest_results / guest_my_assignments)
//  and turns them into the friendly groupings a teacher acts on.
//
//  ⚠ Evidence thresholds are deliberate. A pupil is never called "struggling"
//  or "rushed" on one or two answers, and a chapter is never named as a weak
//  spot unless the pupil answered at least MIN_CHAPTER_EVIDENCE questions in
//  it. A label a teacher acts on must be earned by enough questions.
// ══════════════════════════════════════════════

const TeacherInsights = (() => {
  const MIN_EVIDENCE = 5;          // answers before judging a pupil at all
  const MIN_CHAPTER_EVIDENCE = 3;  // answers in one chapter before naming it
  const LOW_PCT = 50;              // below this a submitted result "may need help"
  const RUSH_PCT = 60;             // rushed = fast AND below this
  const RUSH_SECS_PER_Q = 8;       // faster than this per question is "very quickly"
  const DUE_SOON_MS = 2 * 86400000;

  function state(r) {
    if (!r) return 'not-started';
    if (r.submitted_at) return 'completed';
    if (r.not_started) return 'not-started';
    return 'working';
  }

  function hasEvidence(r) {
    return !!(r && r.submitted_at && Number(r.total) >= MIN_EVIDENCE);
  }

  function needsHelp(r) {
    return hasEvidence(r) && Number(r.pct) < LOW_PCT;
  }

  function rushed(r) {
    if (!hasEvidence(r)) return false;
    const secs = Number(r.elapsed_secs);
    if (!Number.isFinite(secs) || secs <= 0) return false;
    return secs < Number(r.total) * RUSH_SECS_PER_Q && Number(r.pct) < RUSH_PCT;
  }

  function isActive(a) {
    return !!a && !a.archived && a.status === 'active' && (!a.expires_at || Date.parse(a.expires_at) > Date.now());
  }

  function dueSoon(a, now = Date.now()) {
    return isActive(a) && !!a.expires_at && Date.parse(a.expires_at) - now <= DUE_SOON_MS;
  }

  // Chapter id from a question id: "[grade][subject]-[chapter]-[3 digits]".
  // A lookup (e.g. STATIC_QUESTIONS) wins when it knows the question; the id
  // pattern is the fallback for subjects the teacher has not loaded.
  function chapterOf(questionId, lookup) {
    const known = typeof lookup === 'function' ? lookup(questionId) : null;
    if (known) return known;
    const m = String(questionId || '').match(/^[a-z0-9]+-(.+)-\d{3}$/i);
    return m ? m[1] : null;
  }

  function summarize(rows, opts = {}) {
    const list = Array.isArray(rows) ? rows : [];
    const groups = { completed: [], working: [], notStarted: [], help: [] };
    for (const r of list) {
      const s = state(r);
      if (s === 'completed') groups.completed.push(r);
      else if (s === 'working') groups.working.push(r);
      else groups.notStarted.push(r);
      if (needsHelp(r)) groups.help.push(r);
    }
    const scored = groups.completed.filter(r => Number.isFinite(Number(r.pct)));
    const average = scored.length ? Math.round(scored.reduce((n, r) => n + Number(r.pct), 0) / scored.length) : null;
    const timed = groups.completed.map(r => Number(r.elapsed_secs)).filter(v => Number.isFinite(v) && v > 0);
    const averageSecs = timed.length ? Math.round(timed.reduce((n, v) => n + v, 0) / timed.length) : null;
    // For a PIN classroom every pupil is rostered so "assigned" is the roster.
    // For an open link only pupils who opened it exist, so the honest number
    // is how many we know about.
    const assigned = Number.isFinite(Number(opts.assigned)) && Number(opts.assigned) > list.length
      ? Number(opts.assigned) : list.length;
    return { assigned, completed: groups.completed.length, working: groups.working.length,
      notStarted: groups.notStarted.length, help: groups.help.length, average, averageSecs, groups };
  }

  // The "Who needs my help?" card. Every message names a concrete action.
  function insights(rows, assignment, chapterLookup, chapterName) {
    const list = Array.isArray(rows) ? rows : [];
    const out = [];
    const nameOf = r => r.name || 'Pupil';
    const name = id => (typeof chapterName === 'function' && chapterName(id)) || String(id || '').replace(/[-_]/g, ' ');

    const byChapter = new Map();
    for (const r of list) {
      if (!hasEvidence(r)) continue;
      const perChapter = new Map();
      for (const a of (r.answers || [])) {
        const ch = chapterOf(a.id, chapterLookup);
        if (!ch) continue;
        const cell = perChapter.get(ch) || { n: 0, c: 0 };
        cell.n++; if (a.correct) cell.c++;
        perChapter.set(ch, cell);
      }
      for (const [ch, cell] of perChapter) {
        if (cell.n < MIN_CHAPTER_EVIDENCE || cell.c / cell.n >= LOW_PCT / 100) continue;
        if (!byChapter.has(ch)) byChapter.set(ch, []);
        byChapter.get(ch).push(r);
      }
    }
    for (const [ch, pupils] of [...byChapter.entries()].sort((a, b) => b[1].length - a[1].length)) {
      out.push({ kind: 'chapter', chapterId: ch, pupils: pupils.map(nameOf), keys: pupils.map(r => r.name_key),
        message: `${pupils.length} pupil${pupils.length === 1 ? '' : 's'} struggled with ${name(ch)}.`,
        action: 'practice', actionLabel: 'Give more practice' });
    }

    const notDone = list.filter(r => state(r) !== 'completed');
    if (notDone.length && assignment && isActive(assignment)) {
      out.push({ kind: 'not-submitted', pupils: notDone.map(nameOf), keys: notDone.map(r => r.name_key),
        message: `${notDone.length} pupil${notDone.length === 1 ? ' has' : 's have'} not submitted.`,
        action: 'remind', actionLabel: 'Send reminder' });
    }

    const rushers = list.filter(rushed);
    if (rushers.length) {
      out.push({ kind: 'rushed', pupils: rushers.map(nameOf), keys: rushers.map(r => r.name_key),
        message: `${rushers.length} pupil${rushers.length === 1 ? '' : 's'} completed very quickly with low accuracy.`,
        action: 'answers', actionLabel: 'View answers' });
    }

    const low = list.filter(r => needsHelp(r) && ![...byChapter.values()].flat().includes(r) && !rushers.includes(r));
    if (low.length) {
      out.push({ kind: 'low-score', pupils: low.map(nameOf), keys: low.map(r => r.name_key),
        message: `${low.length} pupil${low.length === 1 ? '' : 's'} scored below ${LOW_PCT}%.`,
        action: 'answers', actionLabel: 'View answers' });
    }
    return out;
  }

  // Roll several assignments' rows up per pupil, for the classroom Pupils
  // list and the Home "pupils who may need help" card.
  function pupilRollup(groups) {
    const map = new Map();
    for (const g of (groups || [])) {
      const a = g.assignment || {};
      for (const r of (g.rows || [])) {
        const key = r.name_key || String(r.name || '').toLowerCase();
        const cur = map.get(key) || { key, name: r.name || 'Pupil', assigned: 0, completed: 0, notStarted: 0,
          working: 0, answered: 0, correct: 0, low: 0, last: null, lastTitle: '', overdueMissing: 0 };
        cur.assigned++;
        const s = state(r);
        if (s === 'completed') {
          cur.completed++;
          const t = Date.parse(r.submitted_at);
          if (Number.isFinite(t) && (!cur.last || t > cur.last)) { cur.last = t; cur.lastTitle = a.title || ''; }
          if (Number.isFinite(Number(r.total))) { cur.answered += Number(r.total); cur.correct += Number(r.score) || 0; }
          if (needsHelp(r)) cur.low++;
        } else if (s === 'working') cur.working++;
        else { cur.notStarted++; if (dueSoon(a)) cur.overdueMissing++; }
        map.set(key, cur);
      }
    }
    for (const p of map.values()) {
      p.accuracy = p.answered >= MIN_EVIDENCE ? Math.round(p.correct / p.answered * 100) : null;
      p.needsHelp = (p.answered >= MIN_EVIDENCE && p.accuracy < LOW_PCT) || p.low >= 2 || p.overdueMissing >= 2;
      p.reason = p.answered >= MIN_EVIDENCE && p.accuracy < LOW_PCT ? `${p.accuracy}% correct over ${p.answered} questions`
        : p.low >= 2 ? `${p.low} low scores` : p.overdueMissing >= 2 ? `${p.overdueMissing} pieces of work due soon not started` : '';
    }
    return map;
  }

  function fmtDuration(secs) {
    const s = Number(secs);
    if (!Number.isFinite(s) || s <= 0) return '-';
    if (s < 60) return `${Math.round(s)}s`;
    const m = Math.floor(s / 60), rem = Math.round(s % 60);
    if (m < 60) return rem ? `${m}m ${rem}s` : `${m} min`;
    return `${Math.floor(m / 60)}h ${m % 60}m`;
  }

  function relativeTime(value, now = Date.now()) {
    const t = typeof value === 'number' ? value : Date.parse(value);
    const ms = now - t;
    if (!Number.isFinite(ms) || ms < 0) return 'just now';
    const mins = Math.floor(ms / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins} min ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return days === 1 ? 'yesterday' : `${days} days ago`;
  }

  function dueLabel(iso, now = Date.now()) {
    if (!iso) return 'No due date';
    const t = Date.parse(iso);
    if (!Number.isFinite(t)) return 'No due date';
    const diff = t - now;
    const day = new Date(t).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
    if (diff < 0) return `Closed ${day}`;
    if (diff < 86400000) return 'Due today';
    if (diff < 2 * 86400000) return 'Due tomorrow';
    return `Due ${day}`;
  }

  return { MIN_EVIDENCE, MIN_CHAPTER_EVIDENCE, LOW_PCT, state, hasEvidence, needsHelp, rushed, isActive, dueSoon,
    chapterOf, summarize, insights, pupilRollup, fmtDuration, relativeTime, dueLabel };
})();
if (typeof window !== 'undefined') window.TeacherInsights = TeacherInsights;
