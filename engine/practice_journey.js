'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice - the chapter practice journey
//  The child-facing half of the per-question progress feature: the truthful
//  label on the chapter card, the Practice options sheet, and the Question Map.
//
//  Selection policy lives in engine/practice_selector.js (pure, tested).
//  Persistence lives in engine/question_progress.js. This file is the UI, and
//  it is kept out of app.js because that file is already ~478 KB.
//
//  ⚠ ELIGIBILITY IS DECIDED ONCE, IN app.js. This module builds its candidate
//    list from STATIC_QUESTIONS with the parent's difficulty cap applied, and
//    then hands the chosen ids to startChapterWithSet(), which routes through
//    startChapterDirect() so the chapter lock, the plan check and the cloze
//    redirect all still run. Never start practice from here directly.
//
//  ⚠ GENERATED QUESTIONS ARE EXCLUDED FROM COVERAGE. grade5-maths builds 12
//    chapters from G5M_GENERATORS at run time, and those ids come from
//    genId(prefix) - a new id every time the same question is generated. They
//    are not durable identities, so counting them would make the denominator
//    move under the child's feet and would attach progress to an id that never
//    returns. They are absent from STATIC_QUESTIONS at rest, so they fall out
//    naturally; the map says so rather than pretending the chapter is smaller.
// ══════════════════════════════════════════════

const PracticeJourney = (() => {

  const SET_SIZE = 20;
  const SEEN_TIP_KEY = 'psac_journey_tip_seen_v1';

  const esc = (s) => (typeof _profEsc === 'function' ? _profEsc(s) : String(s == null ? '' : s));

  // ── the candidate list ──────────────────────────────────────────────────
  function eligible(chapterId) {
    if (typeof STATIC_QUESTIONS === 'undefined') return [];
    const cap = (typeof DB !== 'undefined' && DB.restrictions && DB.restrictions.maxDifficulty != null)
      ? DB.restrictions.maxDifficulty : 4;
    const poolOk = (typeof isPoolQuestion === 'function') ? isPoolQuestion : (q => !!q && !!q.question);
    return STATIC_QUESTIONS.filter(q =>
      q && q.chapterId === chapterId && poolOk(q) && (q.difficulty || 1) <= cap);
  }

  function hasGenerator(chapterId) {
    try {
      const gens = (typeof packGenerators === 'function') ? packGenerators() : {};
      return !!gens[chapterId];
    } catch (e) { return false; }
  }

  const progressFor = (chapterId) =>
    (typeof QuestionProgress !== 'undefined') ? QuestionProgress.forChapter(chapterId) : {};

  function savedSet(chapterId) {
    try {
      const r = (typeof _getChapterResume === 'function') ? _getChapterResume(chapterId) : null;
      if (r && Array.isArray(r.qIds) && r.qIds.length) return { ids: r.qIds, position: r.idx || 0 };
    } catch (e) {}
    return null;
  }

  // ── the chapter card ────────────────────────────────────────────────────
  //  One truthful label. A 20-question set must never read as a finished
  //  chapter, which is what "Round Complete" and a bare "Continue →" did.
  function cardLabel(chapterId) {
    const qs = eligible(chapterId);
    if (!qs.length) return { mode: 'smart', label: 'Start →' };
    return PracticeSelector.primaryAction(qs, progressFor(chapterId), savedSet(chapterId));
  }

  function coverageLine(chapterId) {
    const qs = eligible(chapterId);
    const cov = PracticeSelector.coverage(qs, progressFor(chapterId));
    if (!cov.known) return 'Question bank not loaded yet';
    const gen = hasGenerator(chapterId) ? ' · plus unlimited generated practice' : '';
    const needs = cov.needs ? ` · ${cov.needs} to fix` : '';
    return `${cov.explored} of ${cov.total} questions explored${needs}${gen}`;
  }

  // ── starting a set ──────────────────────────────────────────────────────
  function start(chapterId, mode) {
    const qs = eligible(chapterId);
    if (!qs.length) { toast('These questions are still loading. Try again in a moment.', 2500); return; }

    const byId = Object.create(null);
    for (const q of qs) byId[q.id] = q;

    const res = PracticeSelector.select({
      mode: mode === 'revision' ? 'smart' : mode,
      questions: qs,
      progress: progressFor(chapterId),
      size: SET_SIZE,
      resume: mode === 'resume' ? savedSet(chapterId) : null,
      rng: Math.random,
      recentFirstIds: _recentFirst[chapterId] ? [_recentFirst[chapterId]] : [],
    });

    if (res.empty) { showEmpty(chapterId, res.reason); return; }

    const picked = res.ids.map(id => byId[id]).filter(Boolean);
    if (!picked.length) { toast('These questions are still loading. Try again in a moment.', 2500); return; }

    _recentFirst[chapterId] = res.ids[0];
    close();
    if (res.short && mode === 'new') {
      toast(`Only ${picked.length} new question${picked.length === 1 ? '' : 's'} left in this chapter - here they are.`, 3200);
    }
    startChapterWithSet(chapterId, picked, res.position || 0);
  }

  const _recentFirst = Object.create(null);

  // An option with nothing behind it explains itself and offers the next best
  // thing, rather than leaving a button that does nothing.
  function showEmpty(chapterId, reason) {
    const body = document.getElementById('pj-sheet-body');
    const msg = reason === 'no_mistakes'
      ? { t: 'Great work - there are no mistakes waiting.', b: 'Try some new questions', m: 'new' }
      : reason === 'no_unseen'
      ? { t: 'You have explored every question in this chapter. Revision still helps.', b: 'Start revision', m: 'smart' }
      : { t: 'There are no questions here yet.', b: 'Back to chapters', m: null };
    if (!body) { toast(msg.t, 3000); return; }
    body.innerHTML = `<div class="pj-empty">
        <p class="pj-empty-t">${esc(msg.t)}</p>
        ${msg.m ? `<button class="pj-opt pj-opt-primary" onclick="PracticeJourney.start('${esc(chapterId)}','${msg.m}')">${esc(msg.b)}</button>`
                : `<button class="pj-opt" onclick="PracticeJourney.close()">${esc(msg.b)}</button>`}
      </div>`;
  }

  // ── the options sheet ───────────────────────────────────────────────────
  //  Progressive disclosure: never shown automatically, only when the child
  //  asks for it. A mandatory popup before every chapter is exactly what the
  //  one-click default exists to avoid.
  function openOptions(chapterId) {
    const host = document.getElementById('modal-practice-options');
    const body = document.getElementById('pj-sheet-body');
    const title = document.getElementById('pj-sheet-title');
    if (!host || !body) return;

    const qs = eligible(chapterId);
    const prog = progressFor(chapterId);
    const b = PracticeSelector.bucket(qs, prog);
    const cov = PracticeSelector.coverage(qs, prog);
    const ch = (typeof CHAPTERS !== 'undefined') ? CHAPTERS.find(c => c.id === chapterId) : null;
    if (title) title.textContent = ch ? ch.name : 'Practice options';

    const row = (mode, icon, name, desc, count, primary) => `
      <button class="pj-opt${primary ? ' pj-opt-primary' : ''}" onclick="PracticeJourney.start('${esc(chapterId)}','${mode}')">
        <span class="pj-opt-icon" aria-hidden="true">${icon}</span>
        <span class="pj-opt-text">
          <span class="pj-opt-name">${esc(name)}${primary ? ' <span class="pj-rec">Recommended</span>' : ''}</span>
          <span class="pj-opt-desc">${esc(desc)}</span>
        </span>
        ${count != null ? `<span class="pj-opt-count">${count}</span>` : ''}
      </button>`;

    const tip = localStorage.getItem(SEEN_TIP_KEY)
      ? ''
      : `<p class="pj-tip" id="pj-tip">One set is 20 questions - a practice set, not the whole chapter.
           <button class="pj-tip-x" onclick="PracticeJourney.dismissTip()" aria-label="Got it, hide this tip">Got it</button></p>`;

    body.innerHTML = `
      ${tip}
      <p class="pj-cov">${esc(coverageLine(chapterId))}</p>
      ${row('smart', '⭐', 'Smart Practice', 'A balanced set of 20', null, true)}
      ${row('new', '✨', 'New Questions', 'Only questions you have not tried', b.unseen.length)}
      ${row('fix', '🔧', 'Fix My Mistakes', 'Questions that need practice', b.needs.length)}
      ${row('journey', '🗺️', 'Full Chapter Journey', 'All remaining questions, 20 at a time', b.unseen.length)}
      <button class="pj-opt" onclick="PracticeJourney.openMap('${esc(chapterId)}')">
        <span class="pj-opt-icon" aria-hidden="true">📋</span>
        <span class="pj-opt-text">
          <span class="pj-opt-name">Question Map</span>
          <span class="pj-opt-desc">See how you are doing across the chapter</span>
        </span>
      </button>`;
    host.classList.remove('hidden');
  }

  function dismissTip() {
    try { localStorage.setItem(SEEN_TIP_KEY, '1'); } catch (e) {}
    document.getElementById('pj-tip')?.remove();
  }

  function close() {
    document.getElementById('modal-practice-options')?.classList.add('hidden');
    document.getElementById('modal-question-map')?.classList.add('hidden');
  }

  // ── the Question Map ────────────────────────────────────────────────────
  //  ⚠ State is NEVER communicated by colour alone: every cell carries a shape
  //    (○ ! ↑ ✓) and an accessible label, and the legend spells all four out.
  //  ⚠ Cells are in manifest/subsection order, not shuffled - the map is a
  //    picture of the chapter, and a random order would make it unreadable.
  const CELL = {
    not_tried:      { mark: '○', cls: 'is-new',      label: 'Not tried' },
    legacy_seen:    { mark: '○', cls: 'is-legacy',   label: 'Seen before' },
    needs_practice: { mark: '!', cls: 'is-needs',    label: 'Needs practice' },
    improved:       { mark: '↑', cls: 'is-improved', label: 'Improved' },
    secure:         { mark: '✓', cls: 'is-secure',   label: 'Secure' },
  };

  async function openMap(chapterId) {
    const host = document.getElementById('modal-question-map');
    const body = document.getElementById('pj-map-body');
    const title = document.getElementById('pj-map-title');
    if (!host || !body) return;
    close();
    const ch = (typeof CHAPTERS !== 'undefined') ? CHAPTERS.find(c => c.id === chapterId) : null;
    if (title) title.textContent = ch ? `${ch.icon || ''} ${ch.name}`.trim() : 'Question Map';
    body.innerHTML = '<p class="pj-cov">Loading your progress…</p>';
    host.classList.remove('hidden');

    // One chapter, one request. Drawing a map must never pull the whole bank.
    if (typeof QuestionProgress !== 'undefined' && typeof ACTIVE_STUDENT_ID !== 'undefined') {
      try { await QuestionProgress.loadChapter(ACTIVE_STUDENT_ID, chapterId); } catch (e) {}
    }
    renderMap(chapterId);
  }

  function renderMap(chapterId) {
    const body = document.getElementById('pj-map-body');
    if (!body) return;
    const qs = eligible(chapterId);
    const prog = progressFor(chapterId);
    const cov = PracticeSelector.coverage(qs, prog);

    if (!qs.length) { body.innerHTML = '<p class="pj-cov">These questions are still loading.</p>'; return; }

    // Grouped by subsection, in the order the manifest declares them, so a
    // large bank is readable instead of a wall of several hundred cells.
    const groups = new Map();
    for (const q of qs) {
      const k = q.subsection || '';
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(q);
    }
    const names = subsectionNames(chapterId);

    let n = 0;
    const sections = [...groups.entries()].map(([key, list]) => {
      const cells = list.map(q => {
        n++;
        const st = PracticeSelector.stateOf(prog, q.id);
        const c = CELL[st] || CELL.not_tried;
        return `<span class="pj-cell ${c.cls}" role="listitem"
                  aria-label="Question ${n}: ${c.label}"><span aria-hidden="true">${c.mark}</span><em>${n}</em></span>`;
      }).join('');
      const heading = key ? (names[key] || key) : 'Questions';
      return `<section class="pj-map-group">
          <h4 class="pj-map-h">${esc(heading)} <span class="pj-map-n">${list.length}</span></h4>
          <div class="pj-map-grid" role="list">${cells}</div>
        </section>`;
    }).join('');

    const legend = Object.keys(CELL).filter(k => k !== 'legacy_seen').map(k =>
      `<span class="pj-key"><span class="pj-cell ${CELL[k].cls}" aria-hidden="true">${CELL[k].mark}</span>${CELL[k].label}</span>`
    ).join('');

    const genNote = hasGenerator(chapterId)
      ? `<p class="pj-note">This chapter can also make unlimited new practice questions. Those are not counted here, because each one is created fresh and has no lasting number.</p>`
      : '';

    body.innerHTML = `
      <p class="pj-cov"><strong>${cov.explored} of ${cov.total}</strong> questions explored${cov.needs ? ` · <strong>${cov.needs}</strong> need practice` : ''}</p>
      ${cov.attempts < 5 && cov.attempts > 0 ? `<p class="pj-note">Only ${cov.attempts} answer${cov.attempts === 1 ? '' : 's'} so far - too few to judge how well the chapter is going.</p>` : ''}
      <div class="pj-legend">${legend}</div>
      ${sections}
      ${genNote}`;
  }

  function subsectionNames(chapterId) {
    const out = Object.create(null);
    try {
      const pack = (typeof _activePack === 'function') ? _activePack() : null;
      const subs = pack && pack.syllabus && pack.syllabus[chapterId] && pack.syllabus[chapterId].subsections;
      for (const s of (subs || [])) out[s.id] = s.name;
    } catch (e) {}
    return out;
  }

  // ── the sync badge ──────────────────────────────────────────────────────
  //  Quiet, and never claims a save that has not happened.
  function syncBadge() {
    if (typeof QuestionProgress === 'undefined') return '';
    const s = QuestionProgress.syncState();
    if (s === 'synced') return '';
    const n = QuestionProgress.pendingCount();
    return s === 'offline'
      ? `<span class="pj-sync is-offline" title="Saved on this device. It will sync when you are back online.">⏳ ${n} to sync</span>`
      : `<span class="pj-sync" title="Saving your progress…">Saving…</span>`;
  }

  return { eligible, cardLabel, coverageLine, start, openOptions, openMap, renderMap, close, dismissTip, syncBadge, CELL, SET_SIZE };
})();

if (typeof window !== 'undefined') window.PracticeJourney = PracticeJourney;
if (typeof module !== 'undefined' && module.exports) module.exports = PracticeJourney;
