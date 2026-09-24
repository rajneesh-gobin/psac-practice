'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  TRY IT — the no-account preview on the landing page.
//
//  A stranger picks a grade, then a subject, then a chapter, and answers real
//  questions from it. The first three chapters of every live subject are open;
//  every other chapter is listed by name and shut. No sign-up, no profile.
//
//  ⚠ NOTHING HERE RECORDS ANYTHING. Not recordAnswer(), not _recordDaily(),
//    not DB, not LearningCoach, not gainPoints(). Same rule the minigames
//    follow, for the same reason: a stranger tapping through a sales preview
//    must never land in the mastery, mistake or daily figures a parent later
//    reads. The ONLY thing it persists is which grade was last picked.
//
//  THREE PANES, ONE STATE
//    grade → subject → chapter → questions. The grade and subject lists and
//    EVERY chapter name come from SUBJECT_PACKS; only the questions come from
//    assets/demo/deck-g<N>.js.
//
//  ⚠ THE CATALOGUE IS DERIVED, NEVER TYPED. subjects/_index.js is already
//    loaded eagerly by index.html, so the grade list, the subject list, the
//    chapter names, their ORDER and the real chapter count are free — no
//    fetch, and no PackLoader.ensure(), which this must never call (it pulls a
//    whole manifest to render names the lite index already has). Deriving is
//    also the only way the preview cannot drift from what registration then
//    offers: a hand-written list here would have missed Health Education,
//    SSEE and the three Grade 9 sciences.
//
//  ⚠ A SHUT CHAPTER IS NOT AN ABSENT ONE. Every chapter listed here exists and
//    is reachable the moment someone registers, so the copy is "register free
//    to open" — never "coming soon", never "not available". comingSoon packs
//    are dropped outright, so a parent never learns they exist (the
//    project-wide rule: anything a parent or child sees filters !p.comingSoon).
//
//  ⚠ AND NO DEADLINE. "Free" is true — grades 1-2 are free permanently and
//    everything is free right now — but that second promise deliberately
//    carries no end date on any surface. Never write one here.
// ══════════════════════════════════════════════════════════════════════════

const Demo = (() => {
  const DECK_SRC  = (g) => `assets/demo/deck-g${g}.js`;
  const GRADE_KEY = 'ps_demo_grade';

  let _grade     = 4;
  let _packId    = null;
  let _chapterId = null;
  let _deck      = [];
  let _idx       = 0;
  let _picked    = null;   // index of the chosen option, null until answered
  let _right     = 0;
  let _wrongSeen = false;
  let _gen       = 0;      // render generation: a slow script cannot overwrite a newer grade

  const _el = (id) => document.getElementById(id);
  // A four-figure count is read by a parent, not by a machine.
  const _thousands = (n) => String(n).replace(/\B(?=(\d{3})+$)/g, ',');
  const _esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // ── the registry ──────────────────────────────────────────────────────────
  function _packs(grade) {
    const all = typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [];
    return all.filter((p) => p && p.grade === grade && !p.comingSoon)
      .sort((a, b) => String(a.subject || a.name).localeCompare(String(b.subject || b.name)));
  }
  function _grades() {
    const all = typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [];
    return [...new Set(all.filter((p) => p && !p.comingSoon).map((p) => p.grade))]
      .filter((g) => Number.isFinite(g)).sort((a, b) => a - b);
  }
  const _pack     = (id) => _packs(_grade).find((p) => p.id === id) || null;
  const _chapters = (p) => (p && p._chapters && p._chapters.length ? p._chapters : ((p && p.chapters) || []));

  function _stageLabel(grade) {
    // _gradeStage() is the single definition of where PSAC stops and the NCE
    // starts (_PSAC_MAX_GRADE in app.js). Never hard-code the boundary here.
    if (typeof window !== 'undefined' && typeof window._gradeStage === 'function') {
      const s = window._gradeStage(grade);
      if (s && s.exam) return s.exam;
    }
    return '';
  }

  // ── the deck ──────────────────────────────────────────────────────────────
  //
  // ⚠⚠ A SCRIPT TAG, NOT fetch(). This was written with fetch() on a JSON file
  //   and it worked everywhere except the one place the app is actually opened
  //   while it is being built: HOW_TO_RUN_LOCALLY.md option 1 is double-
  //   clicking index.html, and under file:// fetch() is blocked outright — so
  //   EVERY grade reported "could not reach them" over a file sitting right
  //   there on disk. No served test can see that, which is precisely why the
  //   first version passed its whole suite and still shipped broken.
  //
  //   question_loader.js has always answered this the same way (_injectScript,
  //   for exactly the same reason), so this follows the existing pattern
  //   rather than inventing a second one.
  //
  // ⚠ THE PATH IS RELATIVE. A leading slash under file:// points at the
  //   filesystem root, where nothing is.
  //
  // ⚠ NEVER `cache: 'force-cache'` if this ever goes back to fetch(): it
  //   returns a cached response WITHOUT revalidating, so a 404 cached once is
  //   served back for the life of that entry and a reload never clears it.
  function _injectDeck(grade, fresh) {
    return new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = DECK_SRC(grade) + (fresh ? '?v=' + Date.now() : '');
      s.onload  = () => resolve(true);
      s.onerror = () => resolve(false);
      document.head.appendChild(s);
    });
  }

  function _bank(grade) {
    const d = (typeof window !== 'undefined' && window.PSAC_DEMO_DECKS)
      ? window.PSAC_DEMO_DECKS[grade] : null;
    return (d && d.packs && Object.keys(d.packs).length) ? d.packs : null;
  }
  // chapterId -> questions, for one subject. {} when the subject has none open.
  const _openOf = (packId) => {
    const b = _bank(_grade);
    return (b && b[packId]) ? b[packId] : {};
  };
  const _isOpen = (packId, chId) => Object.prototype.hasOwnProperty.call(_openOf(packId), chId);

  async function _loadDeck(grade, opts) {
    const fresh = !!(opts && opts.fresh);
    if (!fresh) {
      const have = _bank(grade);
      if (have) return have;
    }
    const loaded = await _injectDeck(grade, fresh);
    const got = _bank(grade);
    if (got) return got;
    console.warn('[demo] Grade ' + grade + ' deck unreachable: ' + DECK_SRC(grade) +
      (loaded ? ' loaded but registered nothing' : ' failed to load'));
    throw new Error('deck unreachable');
  }

  // ── grade chips ───────────────────────────────────────────────────────────
  // ⚠ Rendered into EVERY [data-demo-grades] row, not one element by id, so a
  //   second picker can be added anywhere without a second code path.
  function _renderGrades() {
    const hosts = document.querySelectorAll('[data-demo-grades]');
    if (!hosts.length) return;
    const grades = _grades();
    if (!grades.length) return;
    const html = grades.map((g) => {
      const on = g === _grade;
      return `<button type="button" onclick="Demo.setGrade(${g})" aria-pressed="${on ? 'true' : 'false'}"
        class="demo-grade-chip${on ? ' is-on' : ''}">
        <span class="demo-grade-chip-g">G${g}</span>
        <span class="demo-grade-chip-s">${_esc(_stageLabel(g))}</span>
      </button>`;
    }).join('');
    hosts.forEach((h) => { h.innerHTML = html; });
  }

  // ── subjects ──────────────────────────────────────────────────────────────
  function _renderSubjects() {
    const host = _el('demo-subjects');
    if (!host) return;
    const packs = _packs(_grade);
    host.innerHTML = packs.map((p) => {
      const on = p.id === _packId;
      const n  = Object.keys(_openOf(p.id)).length;
      return `<button type="button" onclick="Demo.setSubject('${_esc(p.id)}')"
        aria-pressed="${on ? 'true' : 'false'}" class="demo-subj${on ? ' is-on' : ''}">
        <span class="demo-subj-i" aria-hidden="true">${_esc(p.icon || '📘')}</span>
        <span class="demo-subj-n">${_esc(p.subject || p.name)}</span>
        ${n ? `<span class="demo-subj-b">${n}</span>` : ''}
      </button>`;
    }).join('');
  }

  // ── chapters ──────────────────────────────────────────────────────────────
  // Every declared chapter, in its real order. The open ones are buttons; the
  // rest are plain rows — not disabled buttons, because a disabled control is
  // silent to a screen reader and invites a tap that does nothing.
  function _renderChapters() {
    const host = _el('demo-chapters');
    if (!host) return;
    const pack = _pack(_packId);
    const chs  = _chapters(pack);
    const openIds = _openOf(_packId);
    const shut = chs.filter((c) => !_isOpen(_packId, c.id)).length;

    host.innerHTML = chs.map((c, i) => {
      const name = _esc(c.name || c.id);
      const icon = _esc(c.icon || pack?.icon || '📘');
      if (_isOpen(_packId, c.id)) {
        const on = c.id === _chapterId;
        const n  = (openIds[c.id] || []).length;
        return `<button type="button" onclick="Demo.setChapter('${_esc(c.id)}')"
          aria-pressed="${on ? 'true' : 'false'}" class="demo-ch is-open${on ? ' is-on' : ''}">
          <span class="demo-ch-num" aria-hidden="true">${i + 1}</span>
          <span class="demo-ch-i" aria-hidden="true">${icon}</span>
          <span class="demo-ch-n">${name}</span>
          <span class="demo-ch-q">${n} questions</span>
        </button>`;
      }
      return `<div class="demo-ch is-shut" title="Register free to open this chapter">
        <span class="demo-ch-num" aria-hidden="true">${i + 1}</span>
        <span class="demo-ch-i" aria-hidden="true">${icon}</span>
        <span class="demo-ch-n">${name}</span>
        <span class="demo-ch-lock" aria-label="Opens when you register">🔒</span>
      </div>`;
    }).join('');

    // ⚠ Rendered OUTSIDE the list, which scrolls. Inside it, this button sat
    //   below the fold of its own scroller — so the one control that answers
    //   the padlocks above it was the one thing a visitor never saw.
    const more = _el('demo-ch-more');
    if (more) {
      more.innerHTML = shut ? `
        <button type="button" class="demo-ch-more" onclick="Demo.signUp()">
          🔓 Register free to open the other ${shut} ${shut === 1 ? 'chapter' : 'chapters'}
        </button>` : '';
    }

    const head = _el('demo-ch-head');
    if (head) {
      head.textContent = chs.length
        ? `Chapters - ${chs.length - shut} of ${chs.length} open here`
        : 'Chapters';
    }
  }

  // ── the question card ─────────────────────────────────────────────────────
  function _renderLoading() {
    const host = _el('demo-card');
    if (host) host.innerHTML = `<div class="demo-loading"><span class="demo-spinner" aria-hidden="true"></span>
      <p>Loading Grade ${_grade} questions…</p></div>`;
  }

  function _renderUnavailable() {
    const host = _el('demo-card');
    if (!host) return;
    // ⚠ Even the failure path must not imply the content does not exist.
    host.innerHTML = `<div class="demo-loading">
      <p class="demo-fail-t">The sample questions did not load.</p>
      <p class="demo-fail-x">Grade ${_grade} is in the app - this preview just could not reach them.</p>
      <button type="button" onclick="Demo.retry()" class="demo-btn demo-btn-ghost">Try again</button>
    </div>`;
  }

  // ⚠ POSITION, not score: it reads "you are on question 3 of 5", the same
  //   claim as the counter beside it. It used to count ANSWERED questions, so
  //   an unanswered first question drew a completely empty bar under the
  //   header - which on the paper reads as a stray rule, not as progress.
  function _progressBar() {
    const done = Math.min(_idx + 1, _deck.length);
    const pct  = _deck.length ? Math.round((done / _deck.length) * 100) : 0;
    return `<div class="demo-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${_deck.length}"
       aria-valuenow="${done}" aria-label="Preview progress"><span style="width:${pct}%"></span></div>`;
  }

  function _chapterName() {
    const c = _chapters(_pack(_packId)).find((x) => x.id === _chapterId);
    return c ? (c.name || c.id) : '';
  }

  function _renderQuestion() {
    const host = _el('demo-card');
    if (!host) return;
    if (!_deck.length) return _renderUnavailable();
    if (_idx >= _deck.length) return _renderFinish();
    const q = _deck[_idx];
    const pack = _pack(_packId);
    const answered = _picked !== null;
    const correct  = answered && q.opts[_picked] === q.a;

    const opts = q.opts.map((o, i) => {
      let cls = 'demo-opt';
      if (answered) {
        if (o === q.a) cls += ' is-right';
        else if (i === _picked) cls += ' is-wrong';
        else cls += ' is-dim';
      }
      // ⚠ innerHTML on purpose: question and option text carry <b>, entities
      //   and inline markup straight from the corpus, exactly as the real
      //   practice screen renders them. The content is ours, not user input.
      return `<button type="button" class="${cls}" ${answered ? 'disabled' : ''}
        onclick="Demo.pick(${i})"><span class="demo-opt-k">${'ABCD'[i]}</span><span>${o}</span></button>`;
    }).join('');

    host.innerHTML = `
      <div class="demo-qhead">
        <span class="demo-qchip">${_esc(pack?.icon || '📘')} ${_esc(pack?.subject || pack?.name || '')}</span>
        <span class="demo-qchap">${_esc(_chapterName())}</span>
        <span class="demo-qcount">${_idx + 1} / ${_deck.length}</span>
      </div>
      ${_progressBar()}
      <div class="demo-q">${q.q}</div>
      <div class="demo-opts">${opts}</div>
      ${answered ? `
        <div class="demo-verdict ${correct ? 'is-right' : 'is-wrong'}">
          <p class="demo-verdict-t">${correct ? '✅ Correct' : '❌ Not quite'}${correct ? '' : ` - the answer is <b>${q.a}</b>`}</p>
          <p class="demo-verdict-x">${q.exp}</p>
        </div>
        ${_nudge(correct)}
        <button type="button" class="demo-btn demo-btn-go" onclick="Demo.next()">
          ${_idx + 1 >= _deck.length ? 'Finish this chapter →' : 'Next question →'}
        </button>` : `
        <p class="demo-hint-line">${q.hint ? `💡 ${_esc(q.hint)}` : 'Pick an answer - you will see why straight away.'}</p>`}
    `;
  }

  // The ask is EARNED, never timed: it appears at the moment it is true.
  function _nudge(correct) {
    if (!correct && !_wrongSeen) {
      _wrongSeen = true;
      return `<p class="demo-nudge">🔁 Getting one wrong is the useful part - it shows exactly what to practise. The full app remembers this question and brings it back until your child gets it right every time.
        <button type="button" class="demo-nudge-a" onclick="Demo.signUp()">Register free</button></p>`;
    }
    return '';
  }

  // Finishing a chapter offers the next OPEN one, so a visitor who is enjoying
  // it keeps going instead of hitting a wall on question five.
  function _nextOpenChapter() {
    const chs = _chapters(_pack(_packId)).filter((c) => _isOpen(_packId, c.id));
    const i = chs.findIndex((c) => c.id === _chapterId);
    return (i >= 0 && chs[i + 1]) ? chs[i + 1] : null;
  }

  function _renderFinish() {
    const host = _el('demo-card');
    if (!host) return;
    const packs   = _packs(_grade);
    const chTotal = packs.reduce((a, p) => a + _chapters(p).length, 0);
    const pct     = _deck.length ? Math.round((_right / _deck.length) * 100) : 0;
    const mood    = pct >= 80 ? '🌟 Excellent' : pct >= 50 ? '👍 Good going' : '💪 Keep practising';
    const nxt     = _nextOpenChapter();

    host.innerHTML = `
      <div class="demo-finish">
        <div class="demo-finish-score">${_right}<span>/${_deck.length}</span></div>
        <p class="demo-finish-mood">${mood}</p>
        <p class="demo-finish-copy">
          That was one chapter of <b>${chTotal}</b> in Grade ${_grade}.
          Register free to open them all - and to keep track of how your child is doing.
        </p>
        <div class="demo-finish-actions">
          <button type="button" class="demo-btn demo-btn-go" onclick="Demo.signUp()">Register free →</button>
          ${nxt ? `<button type="button" class="demo-btn demo-btn-ghost" onclick="Demo.setChapter('${_esc(nxt.id)}')">
            Try ${_esc(nxt.name || nxt.id)} →</button>` : ''}
          <button type="button" class="demo-btn demo-btn-ghost" onclick="Demo.restart()">↻ Try these again</button>
        </div>
        <p class="demo-finish-note">Nothing from this preview was saved - it is not linked to any account.</p>
      </div>`;
  }

  // ── selection ─────────────────────────────────────────────────────────────
  function _resetRun() { _idx = 0; _picked = null; _right = 0; _wrongSeen = false; }

  function _firstOpenChapterOf(packId) {
    const ids = _chapters(_pack(packId)).map((c) => c.id);
    return ids.find((id) => _isOpen(packId, id)) || null;
  }

  function _apply() {
    _deck = (_openOf(_packId)[_chapterId] || []).slice();
    _renderSubjects();
    _renderChapters();
    _renderQuestion();
    requestAnimationFrame(() => _fit(false));
  }

  async function setGrade(g, opts) {
    g = Number(g);
    if (!Number.isFinite(g)) return;
    _grade = g;
    try { localStorage.setItem(GRADE_KEY, String(g)); } catch (_) {}
    _renderGrades();

    const gen = ++_gen;
    _renderLoading();
    try {
      await _loadDeck(g, opts);
      if (gen !== _gen) return;   // a newer grade was picked while this loaded
    } catch (_) {
      if (gen !== _gen) return;
      _packId = null; _chapterId = null; _deck = [];
      _renderSubjects(); _renderChapters();
      return _renderUnavailable();
    }
    const packs = _packs(_grade);
    _packId = (packs.find((p) => Object.keys(_openOf(p.id)).length) || packs[0] || {}).id || null;
    _chapterId = _firstOpenChapterOf(_packId);
    _resetRun();
    _apply();
    // ⚠ THE GRADE IS GLOBAL TO THE WHOLE DECK. Every mounted slide follows it,
    //   which is what makes the tour read as one product rather than as four
    //   widgets that happen to share a frame. Unmounted slides need nothing:
    //   their mount() reads the current grade when they are first reached.
    SLIDES.forEach((sl) => { if (_mounted[sl.id] && sl.id !== 'practise') { try { sl.grade(); } catch (e) {} } });
  }

  function setSubject(packId) {
    if (packId === _packId) return;
    _packId = packId;
    _chapterId = _firstOpenChapterOf(packId);
    _resetRun();
    _apply();
  }

  function setChapter(chId) {
    if (!_isOpen(_packId, chId)) return;   // a shut chapter is never selectable
    _chapterId = chId;
    _resetRun();
    _apply();
    const card = _el('demo-card');
    if (card && card.getBoundingClientRect().top < 0) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function pick(i) {
    if (_picked !== null || _idx >= _deck.length) return;
    _picked = i;
    if (_deck[_idx].opts[i] === _deck[_idx].a) _right++;
    _renderQuestion();
  }

  function next() {
    if (_picked === null) return;
    _idx++;
    _picked = null;
    if (_idx >= _deck.length) _renderFinish();
    else _renderQuestion();
  }

  function restart() { _resetRun(); _renderQuestion(); }

  // Re-loads past every cache layer. Offered on the failure card because a
  // cache holding a stale 404 is one of the failures it answers.
  function retry() {
    try { if (window.PSAC_DEMO_DECKS) delete window.PSAC_DEMO_DECKS[_grade]; } catch (_) {}
    return setGrade(_grade, { fresh: true });
  }

  function signUp() {
    if (typeof showScreen !== 'function') return;
    showScreen('auth');
    setTimeout(() => {
      try { Auth.setRole('parent'); Auth.showSignUp(); } catch (_) {}
    }, 60);
  }

  function init() {
    if (!_el('demo-card')) return;
    const grades = _grades();
    if (!grades.length) return;
    let want = 4;
    try {
      const saved = Number(localStorage.getItem(GRADE_KEY));
      if (grades.includes(saved)) want = saved;
    } catch (_) {}
    if (!grades.includes(want)) want = grades[Math.floor(grades.length / 2)];
    _initDeck();
    setGrade(want);
  }


  // ══════════════════════════════════════════════════════════════════════════
  //  ② PLAY — "Who Wants to Be a Billionaire?", three rungs of twenty.
  //
  //  ⚠⚠ PURPOSE-BUILT, AND IT MUST STAY THAT WAY. engine/minigame.js is
  //    already loaded on this page, so calling MiniGames.startBillionaire()
  //    looks free. It is not:
  //      · it writes DB.games.billionaire (plays / bestLevel / bestPrize),
  //      · it persists the run to sessionStorage under the LAST STUDENT'S key,
  //        so a stranger's demo run would be waiting for the next child who
  //        signs in on that device,
  //      · and it ends in _awardRun('billionaire') → award_activity_points,
  //        a server RPC.
  //    Every one of those breaks the rule at the top of this file. A preview
  //    that has to be neutered in five places is a preview that will be
  //    un-neutered by accident later.
  //
  //  ⚠ THE NUMBERS ARE THE REAL ONES, copied from minigame.js. A preview that
  //    quotes a different ladder is simply a lie about the product. If PRIZES
  //    or SAFE changes there, change it here.
  //
  //  ⚠ NO AUDIO. The real game synthesises WebAudio on every answer; a page a
  //    stranger has just opened must not make a noise.
  // ══════════════════════════════════════════════════════════════════════════
  const Play = (() => {
    const PRIZES = [100, 200, 300, 500, 1000,
                    2000, 4000, 8000, 16000, 50000,
                    100000, 250000, 500000, 1000000, 10000000,
                    50000000, 100000000, 250000000, 500000000, 1000000000];
    const SAFE   = [4, 9, 14];   // clearing these rungs guarantees the prize
    const GK_AT  = 15;           // rungs 16-20 come from the general-knowledge bank

    // ⚠ Two from the child's own grade, then a JUMP to rung 16. Three low rungs
    //   would show a third of the ladder's range; this shows all of it, and it
    //   is the honest shape of the real game — the top five rungs really are
    //   general knowledge. The jump is LABELLED, never silent.
    const RUNGS = [0, 1, GK_AT];
    const LETTERS = ['A', 'B', 'C', 'D'];

    const LIFELINES = [
      { k: 'fifty', icon: '50:50', name: 'Half & Half',   open: true  },
      { k: 'crowd', icon: '📣',    name: 'Ask the Crowd', open: false },
      { k: 'owl',   icon: '🦉',    name: 'Wise Owl',      open: false },
      { k: 'rope',  icon: '🪢',    name: 'Safety Rope',   open: false },
    ];

    let _qs = [], _i = 0, _picked = null, _right = 0, _fifty = false, _cut = [], _note = '';

    const _money = (n) =>
      n >= 1000000000 ? 'Rs ' + (n / 1000000000) + ' Billion'
      : n >= 1000000  ? 'Rs ' + (n / 1000000) + ' Million'
      : 'Rs ' + n.toLocaleString('en-US');

    // Deterministic per grade, so the preview a parent was shown yesterday is
    // the one their neighbour is shown today — same reason build-demo-decks.js
    // seeds its shuffle.
    function _seed(str) {
      let h = 2166136261;
      for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
      return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h ^= h >>> 13; return (h >>> 0) / 4294967296; };
    }
    function _pickN(list, n, seed) {
      const a = list.slice(), rnd = _seed(seed);
      for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
      return a.slice(0, n);
    }

    // ⚠ Short stems and four options only. The ladder takes 132px of the stage
    //   and the whole card is ~300px on the phones that matter.
    function _gradeQs() {
      const bank = _bank(_grade) || {};
      const out = [];
      for (const packId of Object.keys(bank)) {
        for (const chId of Object.keys(bank[packId] || {})) {
          for (const q of bank[packId][chId] || []) {
            if (!q || !Array.isArray(q.opts) || q.opts.length !== 4) continue;
            if (String(q.q).length > 105) continue;
            if (q.opts.some((o) => String(o).length > 28)) continue;
            // ⚠ The subject travels WITH the question. The real ladder draws from
            //   every subject the child studies, so a French question can follow a
            //   science one — and .bq-source is where the real game says which.
            out.push({ q: q.q, opts: q.opts, a: q.a, exp: q.exp,
                       src: (_pack(packId) || {}).subject || (_pack(packId) || {}).name || '' });
          }
        }
      }
      return _pickN(out, 2, 'bq' + _grade);
    }

    function _gkQ() {
      const bank = (typeof window !== 'undefined' && Array.isArray(window.MINIGAME_GK))
        ? window.MINIGAME_GK : [];
      const ok = bank.filter((g) => g && Array.isArray(g.options) && g.options.length === 4);
      const g = _pickN(ok, 1, 'gk' + _grade)[0];
      return g ? { q: _esc(g.question), opts: g.options.map(_esc), a: _esc(g.answer),
                   exp: _esc(g.explanation), src: g.topic || 'General knowledge', gk: true } : null;
    }

    function reset() {
      _i = 0; _picked = null; _right = 0; _fifty = false; _cut = []; _note = '';
      const gk = _gkQ();
      _qs = _gradeQs().concat(gk ? [gk] : []);
      render();
    }

    // ── the ladder ──────────────────────────────────────────────────────────
    // ⚠ The REAL markup and the REAL classes (.bq-ladder / .bq-rung / .bq-lvl),
    //   so the preview is the game rather than a drawing of it.
    // ⚠ NEVER .bq-ladder-peek: that variant is position:fixed, and a fixed strip
    //   pinned to the bottom of the landing page would float over the whole
    //   site. The plain ladder simply hides itself under 600px.
    function _ladder() {
      const at = RUNGS[Math.min(_i, RUNGS.length - 1)];
      const done = RUNGS.slice(0, _i);
      return '<div class="bq-ladder">' + PRIZES.map((p, i) => {
        const cls = i === at ? 'now' : done.indexOf(i) >= 0 ? 'done' : '';
        const safe = SAFE.indexOf(i) >= 0 ? ' safe' : '';
        return `<div class="bq-rung ${cls}${safe}"><span class="bq-lvl">${i + 1}</span><b>${_money(p)}</b></div>`;
      }).reverse().join('') + '</div>';
    }

    // ⚠ Real buttons, not the real game's `disabled` ones. A locked lifeline in
    //   a preview has something to say; a disabled control is silent to a screen
    //   reader and invites a tap that does nothing. .bq-life-lock is the
    //   preview's own modifier — .used means "you spent it", which is a
    //   different claim.
    function _lifelines() {
      return '<div class="bq-lifes">' + LIFELINES.map((l) => {
        const spent = l.k === 'fifty' && _fifty;
        const open = l.open && !spent;
        const cls = 'bq-life' + (spent ? ' used' : open ? '' : ' bq-life-lock');
        return `<button type="button" class="${cls}" onclick="Demo.lifeline('${l.k}')"
          title="${_esc(l.name)}" aria-label="${_esc(l.name)}${open ? '' : ' - register free to use it'}">
          <span>${l.icon}</span><small>${_esc(l.name)}</small>
          ${open || spent ? '' : '<em class="bq-life-pad" aria-hidden="true">🔒</em>'}
        </button>`;
      }).join('') + '</div>';
    }

    function lifeline(k) {
      const l = LIFELINES.find((x) => x.k === k);
      if (!l) return;
      if (!l.open || (k === 'fifty' && _fifty) || _picked !== null || _i >= _qs.length) {
        _note = (k === 'fifty' && _fifty)
          ? 'Half & Half is used up. The full game gives you all four lifelines, once each.'
          : l.name + ' is one of the four lifelines in the full game.';
        return render();
      }
      const q = _qs[_i];
      const wrong = q.opts.map((o, i) => (o === q.a ? -1 : i)).filter((i) => i >= 0);
      _cut = _pickN(wrong, 2, 'cut' + _grade + _i);
      _fifty = true; _note = '';
      render();
    }

    // ── the stage ───────────────────────────────────────────────────────────
    function render() {
      const host = _el('demo-play');
      if (!host) return;
      if (!_qs.length) {
        host.innerHTML = `<div class="bq-stage"><div class="bq-main">
          <div class="bq-qwrap"><div class="bq-qcard"><div class="bq-qtext">
            The sample questions did not load.<br>
            <small>The game is in the app - this preview just could not reach them.</small>
          </div></div></div>
          <button type="button" onclick="Demo.retry()" class="demo-btn demo-btn-ghost">Try again</button>
        </div></div>`;
        return;
      }
      host.innerHTML = _i >= _qs.length ? _finish() : _question();
    }

    function _question() {
      const q = _qs[_i];
      const at = RUNGS[_i];
      const answered = _picked !== null;
      const correct = answered && q.opts[_picked] === q.a;
      const jumped = at === GK_AT && _i > 0;
      const tier = q.gk ? '<span class="bq-tier gk">🧠 General knowledge</span>' : '';

      const opts = q.opts.map((o, i) => {
        let cls = 'bq-opt';
        if (_cut.indexOf(i) >= 0) cls += ' gone';
        if (answered) {
          if (o === q.a) cls += ' right';
          else if (i === _picked) cls += ' wrong';
        }
        return `<button type="button" class="${cls}" ${answered || _cut.indexOf(i) >= 0 ? 'disabled' : ''}
          onclick="Demo.bqPick(${i})"><span class="bq-tag">${LETTERS[i]}</span><span class="bq-optext">${o}</span></button>`;
      }).join('');

      return `<div class="bq-stage">
        <div class="bq-topbar">${_lifelines()}</div>
        <div class="bq-main">
          ${jumped ? `<p class="demo-bq-jump">⏭ Jumped to rung 16 - the last five rungs are
            <b>general knowledge</b>, beyond the textbook.</p>` : ''}
          <div class="bq-prize-now">Question ${at + 1} of 20 · playing for <b>${_money(PRIZES[at])}</b> ${tier}</div>
          <div class="bq-qwrap">
            <div class="bq-source">${_esc(q.src || '')}</div>
            <div class="bq-qcard"><div class="bq-qtext">${q.q}</div></div>
          </div>
          <div class="bq-opts">${opts}</div>
          ${_note ? `<p class="demo-bq-note">🔒 ${_esc(_note)}
            <button type="button" class="demo-nudge-a" onclick="Demo.signUp()">Register free</button></p>` : ''}
          ${answered ? `
            <div class="demo-bq-verdict ${correct ? 'is-right' : 'is-wrong'}">
              <p class="demo-bq-verdict-t">${correct
                ? '✅ Correct - ' + _money(PRIZES[at])
                : '❌ Not quite - the answer is <b>' + q.a + '</b>'}</p>
              <p class="demo-bq-verdict-x">${q.exp || ''}</p>
            </div>
            ${correct ? '' : `<p class="demo-bq-soft">In the full game a wrong answer ends the run -
              unless you still have the 🪢 Safety Rope. Here, carry on.</p>`}
            <button type="button" class="demo-btn demo-btn-gold" onclick="Demo.bqNext()">
              ${_i + 1 >= _qs.length ? 'See where that leaves you →' : 'Next rung →'}
            </button>`
          : `<p class="demo-bq-soft">Pick an answer - this is rung ${at + 1} of twenty.</p>`}
          <p class="mg-fineprint">🎓 Educational game - the rupees are pretend, no real money can be won.</p>
        </div>
        ${_ladder()}
      </div>`;
    }

    function _finish() {
      const won = _right ? PRIZES[RUNGS[_right - 1]] : 0;
      return `<div class="bq-stage">
        <div class="bq-main demo-bq-end">
          <div class="demo-bq-won">${_right ? _money(won) : 'Rs 0'}</div>
          <p class="demo-bq-end-t">${_right} of ${_qs.length} rungs cleared</p>
          <p class="demo-bq-end-x">
            The full ladder is <b>twenty rungs</b> to <b>${_money(PRIZES[PRIZES.length - 1])}</b>,
            with four lifelines and safe havens at rungs 5, 10 and 15.
            Register free to play the whole game - and the rest of the Game Zone.
          </p>
          <div class="demo-bq-end-actions">
            <button type="button" class="demo-btn demo-btn-gold" onclick="Demo.signUp()">Register free →</button>
            <button type="button" class="demo-btn demo-btn-dark" onclick="Demo.bqRestart()">↻ Play these again</button>
            <button type="button" class="demo-btn demo-btn-dark" onclick="Demo.show('practise')">📖 Try a real chapter →</button>
          </div>
          <p class="mg-fineprint">Nothing from this preview was saved - no score, no account.
            🎓 Educational game - the rupees are pretend, no real money can be won.</p>
        </div>
        ${_ladder()}
      </div>`;
    }

    function pick(i) {
      if (_picked !== null || _i >= _qs.length || _cut.indexOf(i) >= 0) return;
      _picked = i; _note = '';
      if (_qs[_i].opts[i] === _qs[_i].a) _right++;
      render();
    }
    function next() {
      if (_picked === null) return;
      _i++; _picked = null; _cut = []; _note = '';
      render();
    }
    function restart() { _i = 0; _picked = null; _right = 0; _fifty = false; _cut = []; _note = ''; render(); }

    return { mount: reset, grade: reset, reset, render, pick, next, restart, lifeline };
  })();

  // ══════════════════════════════════════════════════════════════════════════
  //  ③ BUILD A PAPER — the configurator, and a paper that really is built.
  //
  //  ⚠ THE FOUR PAPER TYPES ARE THE REAL ONES, copied from #screen-exam-config
  //    in index.html — the same names, the same question counts, the same
  //    minutes. A preview that offers a paper the app cannot produce is an
  //    advertisement for a feature that does not exist. If a type is added or
  //    re-sized there, change it here.
  //
  //  ⚠ THE PAPER IS REALLY ASSEMBLED. The visitor picks a subject, a type and
  //    the chapters, presses Generate, and the sheet fills with questions drawn
  //    from the public sample for exactly those chapters — the first two
  //    printed in full, the rest behind the wall. A button that only opens a
  //    "register to continue" modal asks for a signature on a blank page; this
  //    asks for one on a paper they just watched being written.
  //
  //  ⚠ NOTHING IS RECORDED and nothing is fetched. The questions are the same
  //    frozen assets/demo/deck-g<N>.js the practise slide uses.
  // ══════════════════════════════════════════════════════════════════════════
  const Maker = (() => {
    const TYPES = [
      { id: 'drill', icon: '⚡', name: 'Quick Drill',           q: 15, desc: '15 questions · 10 minutes · Mixed topics' },
      { id: 'short', icon: '📋', name: 'Short Test',            q: 25, desc: '25 questions · 25 minutes · Balanced coverage' },
      { id: 'full',  icon: '🏆', name: '45-min Question Paper', q: 40, desc: '40 questions · All chapters covered' },
      { id: 'print', icon: '📄', name: 'Printable Exam Paper',  q: 40, desc: '40 questions · exam-style layout · Print or save as PDF · No timer' },
    ];

    let _packId = null, _type = 'drill', _chosen = [], _built = false;

    const _type_ = () => TYPES.find((t) => t.id === _type) || TYPES[0];

    // Every chapter of the pack is offered — the shut ones too. A chapter the
    // preview cannot print still belongs on a paper the child would get, and
    // ticking it is part of seeing what the tool does.
    const _chapters = (p) => (p && p._chapters && p._chapters.length ? p._chapters : ((p && p.chapters) || []));

    function _defaults() {
      const packs = _packs(_grade);
      if (!_packId || !packs.some((p) => p.id === _packId)) {
        _packId = (packs.find((p) => Object.keys(_openOf(p.id)).length) || packs[0] || {}).id || null;
      }
      const chs = _chapters(_pack(_packId)).map((c) => c.id);
      _chosen = _chosen.filter((id) => chs.indexOf(id) >= 0);
      if (!_chosen.length) _chosen = chs.slice(0, Math.min(4, chs.length));
    }

    function mount() { _built = false; _defaults(); render(); }
    function grade()  { _packId = null; _chosen = []; _built = false; _defaults(); render(); }

    function setPack(id) { if (id === _packId) return; _packId = id; _chosen = []; _built = false; _defaults(); render(); }
    function setType(id) { _type = id; _built = false; render(); }
    function toggle(chId) {
      const i = _chosen.indexOf(chId);
      if (i >= 0) { if (_chosen.length === 1) return; _chosen.splice(i, 1); }
      else _chosen.push(chId);
      _built = false; render();
    }
    function build() { _built = true; render(); }

    // The questions the chosen chapters can actually supply from the public
    // sample. Deliberately NOT padded to the paper's size: the sheet says how
    // many the real paper has and shows the two it can print.
    function _sample() {
      const open = _openOf(_packId);
      const out = [];
      for (const id of _chosen) for (const q of (open[id] || [])) out.push(q);
      return out;
    }

    function render() {
      const host = _el('demo-make');
      if (!host) return;
      const packs = _packs(_grade);
      const pack = _pack(_packId);
      const chs = _chapters(pack);
      const t = _type_();

      const subjects = packs.map((p) => `<button type="button" onclick="Demo.mkPack('${_esc(p.id)}')"
        aria-pressed="${p.id === _packId ? 'true' : 'false'}" class="demo-mk-subj${p.id === _packId ? ' is-on' : ''}">
        <span aria-hidden="true">${_esc(p.icon || '📘')}</span><span>${_esc(p.subject || p.name)}</span>
      </button>`).join('');

      const types = TYPES.map((x) => `<button type="button" onclick="Demo.mkType('${x.id}')"
        aria-pressed="${x.id === _type ? 'true' : 'false'}" class="demo-mk-type${x.id === _type ? ' is-on' : ''}">
        <span class="demo-mk-type-i" aria-hidden="true">${x.icon}</span>
        <span class="demo-mk-type-t">
          <b>${_esc(x.name)}</b>
          <small>${_esc(x.desc)}</small>
        </span>
      </button>`).join('');

      const ticks = chs.map((c) => {
        const on = _chosen.indexOf(c.id) >= 0;
        return `<button type="button" onclick="Demo.mkToggle('${_esc(c.id)}')"
          aria-pressed="${on ? 'true' : 'false'}" class="demo-mk-ch${on ? ' is-on' : ''}">
          <span class="demo-mk-box" aria-hidden="true">${on ? '✓' : ''}</span>
          <span class="demo-mk-ch-n">${_esc(c.name || c.id)}</span>
        </button>`;
      }).join('');

      host.innerHTML = `
        <div class="demo-mk-grid">
          <div class="demo-mk-form">
            <p class="demo-mk-h">Subject</p>
            <div class="demo-mk-subjs">${subjects}</div>

            <p class="demo-mk-h">Paper</p>
            <div class="demo-mk-types">${types}</div>

            <p class="demo-mk-h">Chapters <span class="demo-mk-count">${_chosen.length} of ${chs.length}</span></p>
            <div class="demo-mk-chs">${ticks}</div>
          </div>

          <div class="demo-mk-sheet-wrap">${_sheet(pack, t)}</div>
        </div>`;
    }

    function _sheet(pack, t) {
      const qs = _sample();
      const shown = _built ? qs.slice(0, 2) : [];
      const head = `
        <div class="demo-mk-head">
          <p class="demo-mk-title">${_esc((pack && (pack.subject || pack.name)) || '')} · Grade ${_grade}</p>
          <p class="demo-mk-sub">${_esc(t.name)}</p>
          <p class="demo-mk-meta">${t.q} questions${/minutes/.test(t.desc) ? ' · ' + t.desc.split('·')[1].trim() : ''}
            · ${_chosen.length} chapter${_chosen.length === 1 ? '' : 's'}</p>
        </div>`;

      if (!_built) {
        return `<div class="demo-mk-sheet is-blank">
          ${head}
          <div class="demo-mk-blank">
            <p class="demo-mk-blank-t">Your paper is not written yet</p>
            <p class="demo-mk-blank-x">Pick a subject, a paper and the chapters - then generate it.
              A different paper is assembled every time.</p>
          </div>
          <button type="button" class="demo-btn demo-btn-ink" onclick="Demo.mkBuild()">✍ Generate the paper →</button>
        </div>`;
      }

      const body = shown.length
        ? shown.map((q, i) => `
          <div class="demo-mk-q">
            <p class="demo-mk-qn">${i + 1}. ${q.q}</p>
            <ol class="demo-mk-opts">${q.opts.map((o, k) =>
              `<li><span>${'ABCD'[k]}</span>${o}</li>`).join('')}</ol>
          </div>`).join('')
        : `<p class="demo-mk-none">Those chapters are not open in this preview - tick one of the
           first three instead, or register free to print any of them.</p>`;

      return `<div class="demo-mk-sheet">
        ${head}
        <div class="demo-mk-body">${body}</div>
        <div class="demo-mk-wall">
          <p class="demo-mk-wall-t">🔒 Questions 3–${t.q} are ready</p>
          <p class="demo-mk-wall-x">Register free to see the whole paper, print it or save it as a PDF,
            and get the mark scheme with it.</p>
          <button type="button" class="demo-btn demo-btn-ink" onclick="Demo.signUp()">Register free to print it →</button>
          <button type="button" class="demo-btn demo-btn-paper" onclick="Demo.mkAgain()">↻ Build a different one</button>
        </div>
      </div>`;
    }

    function again() { _built = false; render(); }

    return { mount, grade, render, setPack, setType, toggle, build, again };
  })();

  // ══════════════════════════════════════════════════════════════════════════
  //  ④ EXPERIMENT — one Science Lab, run end to end.
  //
  //  ⚠⚠ PURPOSE-BUILT, AND IT HAS TO BE. Reusing Labs / LabExperiment here is
  //    not merely heavy, it is unsafe and it does not work:
  //      · Labs.store() writes DB.labs and Labs.persist() calls save(DB) —
  //        which is a NO-OP only while ACTIVE_STUDENT_ID is unset. A signed-in
  //        parent who scrolls down to this carousel would have a stranger's
  //        demo run written into their own child's saved progress.
  //      · LabExperiment.attach() writes store().intro = true before the child
  //        has done anything, so merely MOUNTING the real runner dirties it.
  //      · Labs.quiz() and Labs.resultCard() render into #labs-root, which
  //        lives inside #screen-labs. Outside that screen overlay() returns
  //        null and the runner silently dead-ends at "Check".
  //      · experiment.list() filters on Labs.grade(), set only inside
  //        openLab(), which assumes a signed-in child with GradeAccess.
  //      · engine/labs/*.js is lazily loaded by RoleModules and both modules
  //        are top-level consts — `Labs` is a ReferenceError on this page.
  //
  //  ⚠ AND labs.css IS NOT LINKED HERE. .lab-overlay is position:fixed;
  //    inset:0; z-index:1000 and .lab-top is sticky — either would smear across
  //    the whole landing page from inside a horizontally scrolling track. The
  //    handful of rules this needs are written as demo-lab-* instead.
  //
  //  ⚠ THE EXPERIMENT IS COPIED VERBATIM from engine/labs/lab_magnets_data.js
  //    (OBJECTS, and the `which_pull` entry): the same eight props, the same
  //    prediction, the same three steps, the same wrong-answer coaching, the
  //    same "what we saw" and "what we learned". If that data changes, change
  //    this. A preview that teaches something the lab does not is worse than
  //    no preview.
  //
  //  ⚠ NO GRADE RAIL ON THIS SLIDE, deliberately. This experiment is Grade 4
  //    Materials; a rail that changed nothing would be a lie, and building a
  //    preview per grade would mean copying six labs' data onto the landing
  //    page. The slide says which grade it is and what the range is instead.
  //
  //  ⚠ NO 🔊 BUTTON. The real runner offers speechSynthesis; a marketing page
  //    should not reach for a browser speech surface uninvited.
  // ══════════════════════════════════════════════════════════════════════════
  const Lab = (() => {
    const OBJECTS = [
      { id: 'nail',   label: 'Iron nail',        icon: '📌', magnetic: true  },
      { id: 'clip',   label: 'Steel paper clip', icon: '📎', magnetic: true  },
      { id: 'foil',   label: 'Aluminium foil',   icon: '⬜', magnetic: false },
      { id: 'block',  label: 'Wooden block',     icon: '🟫', magnetic: false },
      { id: 'ruler',  label: 'Plastic ruler',    icon: '📏', magnetic: false },
      { id: 'marble', label: 'Glass marble',     icon: '🔵', magnetic: false },
      { id: 'rubber', label: 'Rubber band',      icon: '⭕', magnetic: false },
      { id: 'coin',   label: 'Copper coin',      icon: '🪙', magnetic: false },
    ];

    const EXP = {
      title: 'Which things will the magnet pull?',
      aim: 'A horseshoe magnet and eight things on the shelf. Some will jump to the magnet. Which ones?',
      predict: {
        q: 'Which of these will the magnet pull?', answer: 'nail',
        options: [{ id: 'nail', label: 'Iron nail', icon: '📌' }, { id: 'coin', label: 'Copper coin', icon: '🪙' },
                  { id: 'marble', label: 'Glass marble', icon: '🔵' }, { id: 'all', label: 'All of them', icon: '🗃' }],
      },
      steps: [
        { ask: 'Which one will the magnet pull? Tap it.', on: 'nail', options: ['nail', 'coin', 'marble'],
          wrong: { coin: 'A coin is metal, but it is copper. Copper is not magnetic, so the magnet cannot pull it.',
                   marble: 'Glass is not magnetic. The magnet cannot pull a marble.' } },
        { ask: 'Find one more thing the magnet pulls.', on: 'clip', options: ['clip', 'foil', 'ruler'],
          wrong: { foil: 'Foil is metal, but it is aluminium. Aluminium is not magnetic.',
                   ruler: 'Plastic is not magnetic. The magnet cannot pull the ruler.' } },
        { ask: 'Now tap the Wooden block. Watch where it goes.', on: 'block', options: ['block'], wrong: {} },
      ],
      see: {
        saw: 'The iron nail and the steel paper clip stuck to the magnet. The wooden block fell.',
        learn: 'A magnet pulls things made of iron or steel. We call them magnetic materials. Wood is not magnetic.',
      },
      exam: 'In the exam: "Which object would be ATTRACTED by a magnet?" The steel nail - steel has iron in it.',
    };

    // ⚠ The six stops are the REAL ones (lab_experiment.js STOPS). Check and
    //   Done are shown and marked shut rather than hidden: the point is that a
    //   visitor sees the whole shape of an experiment, including the marked
    //   quiz they do not get here.
    const STOPS = [
      { id: 'aim', n: 'Aim' }, { id: 'predict', n: 'Predict' }, { id: 'do', n: 'Do' },
      { id: 'see', n: 'See' }, { id: 'check', n: 'Check', shut: true }, { id: 'done', n: 'Done', shut: true },
    ];

    let _phase = 'aim', _pred = null, _step = 0, _stuck = [], _fell = [], _wrong = '';

    function mount() { reset(); }
    function reset() { _phase = 'aim'; _pred = null; _step = 0; _stuck = []; _fell = []; _wrong = ''; render(); }

    function predict(id) {
      if (_pred !== null) return;
      _pred = id; _phase = 'do'; _step = 0; _wrong = '';
      render();
    }

    function tap(id) {
      if (_phase !== 'do') return;
      const st = EXP.steps[_step];
      if (!st) return;
      if (id === st.on) {
        _wrong = '';
        if (OBJECTS.find((o) => o.id === id).magnetic) _stuck.push(id); else _fell.push(id);
        _step++;
        if (_step >= EXP.steps.length) _phase = 'see';
      } else {
        _wrong = st.wrong[id] || 'Not that one - try again.';
      }
      render();
    }

    const _at = () => (_phase === 'see' ? 3 : _phase === 'do' ? 2 : _phase === 'predict' ? 1 : 0);

    function _strip() {
      return '<ol class="demo-lab-strip">' + STOPS.map((s, i) => {
        const cls = ['demo-lab-stop'];
        if (i < _at()) cls.push('is-done');
        if (i === _at()) cls.push('is-now');
        if (s.shut) cls.push('is-shut');
        return `<li class="${cls.join(' ')}"><span class="demo-lab-stop-n">${i + 1}</span>
          <span class="demo-lab-stop-t">${s.n}${s.shut ? ' 🔒' : ''}</span></li>`;
      }).join('') + '</ol>';
    }

    // The bench: a horseshoe magnet with whatever has stuck to it, and the
    // shelf underneath with everything still on it.
    function _bench() {
      const live = _phase === 'do' ? (EXP.steps[_step] || {}).options || [] : [];
      const shelf = OBJECTS.filter((o) => _stuck.indexOf(o.id) < 0 && _fell.indexOf(o.id) < 0);
      const objBtn = (o) => {
        const on = live.indexOf(o.id) >= 0;
        return `<button type="button" class="demo-lab-obj${on ? ' is-live' : ''}"
          ${on ? '' : 'disabled'} onclick="Demo.labTap('${o.id}')"
          aria-label="${_esc(o.label)}"><span class="demo-lab-obj-i" aria-hidden="true">${o.icon}</span>
          <span class="demo-lab-obj-n">${_esc(o.label)}</span></button>`;
      };
      return `
        <div class="demo-lab-bench">
          <div class="demo-lab-magnet">
            <span class="demo-lab-magnet-i" aria-hidden="true">🧲</span>
            <div class="demo-lab-stuck">${_stuck.map((id) => {
              const o = OBJECTS.find((x) => x.id === id);
              return `<span class="demo-lab-chip" title="${_esc(o.label)}">${o.icon}</span>`;
            }).join('') || '<span class="demo-lab-empty">nothing yet</span>'}</div>
          </div>
          <div class="demo-lab-shelf">${shelf.map(objBtn).join('')}</div>
          ${_fell.length ? `<p class="demo-lab-floor">On the floor: ${_fell.map((id) =>
            OBJECTS.find((x) => x.id === id).icon).join(' ')}</p>` : ''}
        </div>`;
    }

    function _card() {
      if (_phase === 'aim') {
        return `<div class="demo-lab-card">
          <p class="demo-lab-kicker">🔬 Experiment 1 of 3 · Magnets</p>
          <h3 class="demo-lab-title">${_esc(EXP.title)}</h3>
          <p class="demo-lab-aim">${_esc(EXP.aim)}</p>
          <button type="button" class="demo-btn demo-btn-lab" onclick="Demo.labGo()">Start ▶</button>
        </div>`;
      }
      if (_phase === 'predict') {
        return `<div class="demo-lab-card">
          <p class="demo-lab-kicker">Predict</p>
          <h3 class="demo-lab-q">${_esc(EXP.predict.q)}</h3>
          <div class="demo-lab-opts">${EXP.predict.options.map((o) =>
            `<button type="button" class="demo-lab-opt" onclick="Demo.labPredict('${o.id}')">
              <span class="demo-lab-opt-i" aria-hidden="true">${o.icon || '❓'}</span>
              <span>${_esc(o.label)}</span></button>`).join('')}</div>
          <p class="demo-lab-hint">Just have a go. A prediction is never marked.</p>
        </div>`;
      }
      if (_phase === 'do') {
        const st = EXP.steps[_step];
        return `<div class="demo-lab-card">
          <p class="demo-lab-kicker">Do · step ${_step + 1} of ${EXP.steps.length}</p>
          <h3 class="demo-lab-q">${_esc(st.ask)}</h3>
          ${_wrong ? `<p class="demo-lab-wrong">${_esc(_wrong)}</p>`
                   : '<p class="demo-lab-hint">Tap something on the shelf below.</p>'}
        </div>`;
      }
      // see
      const gotIt = _pred === EXP.predict.answer;
      return `<div class="demo-lab-card">
        <p class="demo-lab-kicker">See</p>
        <p class="demo-lab-pred ${gotIt ? 'is-right' : 'is-wrong'}">
          ${gotIt ? '✅ Your prediction was right.' : '🤔 Your prediction was different - now you know why.'}</p>
        <p class="demo-lab-saw">${_esc(EXP.see.saw)}</p>
        <p class="demo-lab-learn"><b>What we learned:</b> ${_esc(EXP.see.learn)}</p>
        <p class="demo-lab-exam">📝 ${_esc(EXP.exam)}</p>
        <div class="demo-lab-wall">
          <p class="demo-lab-wall-t">🔒 Check and Done are next</p>
          <p class="demo-lab-wall-x">Three questions on what you just saw, then the write-up.
            Register free to finish this experiment - and to open the rest of the labs, Grades 4 to 9.</p>
          <button type="button" class="demo-btn demo-btn-lab" onclick="Demo.signUp()">Register free to finish it →</button>
          <button type="button" class="demo-btn demo-btn-lab-ghost" onclick="Demo.labReset()">↻ Run it again</button>
        </div>
      </div>`;
    }

    function go() { _phase = 'predict'; render(); }

    function render() {
      const host = _el('demo-lab');
      if (!host) return;
      host.innerHTML = `${_strip()}
        <div class="demo-lab-grid">
          <div class="demo-lab-left">${_card()}</div>
          <div class="demo-lab-right">${_bench()}</div>
        </div>`;
    }

    return { mount, grade: () => {}, render, reset, go, predict, tap };
  })();

  // ══════════════════════════════════════════════════════════════════════════
  //  ⑤ PAST PAPERS — the shelf, with one paper genuinely open.
  //
  //  ⚠⚠ THE PDFs IN library/ ARE PUBLIC STATIC ASSETS. scripts/prepare-deploy.js
  //    copies the whole `library` directory and nothing 404s it. So a padlock on
  //    every cover would be theatre: the file is one URL away. This slide opens
  //    ONE paper for real — a genuine sample a visitor can read — and asks for
  //    an account to open the shelf. That is both honest and better: a paper
  //    somebody actually opened converts, a lock they bounced off does not.
  //  ⚠ Therefore the copy is "register free to open the library", never
  //    "register to unlock this file". Do not write a claim the filesystem
  //    contradicts.
  //
  //  ⚠ THE CATALOGUE IS NOT SHIPPED. .library/catalogue.json holds sha256 sums
  //    and `source` paths like D:\past-papers\... — it is a dotfolder and stays
  //    out of the deploy. assets/demo/shelf.js is the public extract, built by
  //    scripts/build-demo-shelf.js with an ALLOW-LIST of six fields
  //    (grade, subject, year, doc_type, title, filename). Never widen it.
  //
  //  ⚠ SCRIPT TAG, NOT fetch(), and injected only when this slide is first
  //    reached — same as the question decks, and for the same two reasons:
  //    fetch() is blocked under file:// when index.html is double-clicked, and
  //    a visitor who never swipes here should not pay for it.
  // ══════════════════════════════════════════════════════════════════════════
  const Shelf = (() => {
    const SRC = 'assets/demo/shelf.js';
    let _loaded = false, _failed = false, _note = '';

    const _data = () => (typeof window !== 'undefined' && window.PSAC_DEMO_SHELF) || null;

    function _inject() {
      return new Promise((resolve) => {
        if (_data()) return resolve(true);
        const s = document.createElement('script');
        s.src = SRC;
        s.onload = () => resolve(!!_data());
        s.onerror = () => resolve(false);
        document.head.appendChild(s);
      });
    }

    async function mount() {
      render();
      if (!_data()) { _loaded = await _inject(); _failed = !_loaded; }
      render();
    }
    function grade() { _note = ''; render(); }

    // A subject slug — history-geography, social-modern-studies — is not a label.
    const _title = (s) => String(s || '')
      .split('-').filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    const TYPE_LABEL = {
      'exam-paper': 'Past paper', 'examiners-report': "Examiners' report",
      'specimen-paper': 'Specimen paper', practice: 'Practice',
    };

    // ⚠ The shelf follows the deck's grade like every other slide. A grade with
    //   no papers says so plainly rather than showing an empty shelf.
    const _forGrade = () => {
      const d = _data();
      if (!d || !Array.isArray(d.docs)) return [];
      return d.docs.filter((x) => x && x.grade === _grade);
    };

    function open(i) {
      const rows = _forGrade();
      const doc = rows[i];
      if (!doc) return;
      if (i === 0) {
        // ⚠ The one genuinely open paper. A real file, opened in a new tab.
        try { window.open('/library/' + doc.filename, '_blank', 'noopener'); } catch (e) {}
        _note = 'That one is open — it is a real paper from the library. ' +
                'Register free to open the rest.';
      } else {
        _note = 'Register free to open ' + _title(doc.subject) + ' ' + (doc.year || '') +
                ' — and the whole library with it.';
      }
      render();
    }

    function render() {
      const host = _el('demo-shelf');
      if (!host) return;
      const d = _data();

      if (!d) {
        host.innerHTML = _failed
          ? `<div class="demo-shelf-msg">
               <p class="demo-shelf-msg-t">The shelf did not load.</p>
               <p class="demo-shelf-msg-x">The library is in the app — this preview just could not reach it.</p>
             </div>`
          : `<div class="demo-shelf-msg"><span class="demo-spinner" aria-hidden="true"></span>
               <p class="demo-shelf-msg-x">Opening the shelf…</p></div>`;
        return;
      }

      const t = d.totals || {};
      const rows = _forGrade();
      const years = (t.minYear && t.maxYear) ? t.minYear + '–' + t.maxYear : '';

      const covers = rows.length
        ? rows.map((doc, i) => `
          <button type="button" class="demo-shelf-book${i === 0 ? ' is-open' : ''}"
            onclick="Demo.shelfOpen(${i})"
            aria-label="${_esc(_title(doc.subject))} ${doc.year || ''} — ${i === 0 ? 'open it' : 'register free to open it'}">
            <span class="demo-shelf-spine" aria-hidden="true"></span>
            <span class="demo-shelf-book-b">
              <span class="demo-shelf-book-y">${doc.year || '—'}</span>
              <span class="demo-shelf-book-s">${_esc(_title(doc.subject))}</span>
              <span class="demo-shelf-book-t">${_esc(TYPE_LABEL[doc.doc_type] || doc.doc_type || '')}</span>
            </span>
            <span class="demo-shelf-book-i" aria-hidden="true">${i === 0 ? '📖' : '🔒'}</span>
          </button>`).join('')
        : `<p class="demo-shelf-none">No papers for Grade ${_grade} on this shelf.
             Pick another grade — the library runs from Grade 4 to Grade 9.</p>`;

      host.innerHTML = `
        <p class="demo-shelf-stat">
          <b>${t.documents || 0}</b> real papers and reports${years ? ' · ' + years : ''}${t.subjects ? ' · ' + t.subjects + ' subjects' : ''}
        </p>
        <p class="demo-shelf-sub">
          ${(t.byType && t.byType['exam-paper']) || 0} past papers ·
          ${(t.byType && t.byType['examiners-report']) || 0} examiners' reports ·
          ${(t.byType && t.byType['specimen-paper']) || 0} specimen ·
          ${(t.byType && t.byType.practice) || 0} practice
        </p>
        <div class="demo-shelf-rack">${covers}</div>
        ${_note ? `<p class="demo-shelf-note">${_esc(_note)}
          <button type="button" class="demo-nudge-a" onclick="Demo.signUp()">Register free</button></p>` : ''}
        <p class="demo-shelf-open-note">📖 The first paper on the shelf is open in this preview —
          it is a real one, and it opens in a new tab.</p>`;
    }

    return { mount, grade, render, open };
  })();

  // ══════════════════════════════════════════════════════════════════════════
  //  ⑥ FOR PARENTS — a SAMPLE of the reporting, and it says so.
  //
  //  ⚠⚠ EVERY LABEL AND EVERY SENTENCE HERE IS THE REAL ONE, lifted from the
  //    parent dashboard: the "🗓️ Last 7 days" card and its four tiles
  //    (Questions · Accuracy · Days active · Exams, the last rendered "4/7"),
  //    one verbatim headline from _repHeadline(), the "📚 Subjects, weakest
  //    first" card with its real subtitle and its only three tags — Strong,
  //    Getting there, Needs work — and a certificate card with its real
  //    disclaimer. The NUMBERS are invented and the child is fictional.
  //
  //  ⚠ NOT RENDERED BY THE REAL MODULES, and it cannot be: PD and Certificates
  //    are top-level consts (not on window), _renderReports() reads DB.daily /
  //    DB.stats unguarded, and Certificates.render() calls the Supabase RPC
  //    student_subject_progress() and needs ACTIVE_STUDENT_ID. Hand-written
  //    markup, in our own classes.
  //  ⚠ AND NO REAL IDS. This is one document: reusing pd-total, pd-acc,
  //    pd-reports or pd-cert-body here would break the real dashboard's
  //    getElementById calls.
  //
  //  ⚠⚠ THINGS THAT WOULD BE LIES, AND ARE THEREFORE ABSENT:
  //    · Any mention of a weekly EMAIL. The digest's delivery has never been
  //      verified end to end; the frequency is per-parent (weekly / fortnightly
  //      / monthly / never), not "every Sunday"; and the cron is 09:00 UTC.
  //    · "Mastery" on a chapter or subject bar. getChapterPct() is ACCURACY and
  //      the real card says "correct". Only a certificate may say mastered,
  //      because only it counts questions whose state is `secure`.
  //    · 0% for anything untouched — it reads "not started".
  //    · Any ranking of one child against another. The real family overview is
  //      ordered by who has been quietest, never by score.
  //    · A previous window of zero shown as "+100%" — that reads "new".
  //  ⚠ Report copy says "they". Nothing records a child's gender.
  // ══════════════════════════════════════════════════════════════════════════
  const ParentView = (() => {
    // ⚠ Plainly fictional, and never an avatar + username + streak together —
    //   that combination is what makes the real card identify a specific child.
    const KID = 'Sample';

    const SUBJECTS = [
      { icon: '📕', name: 'French',  q: 212, ch: '5 of 9 chapters started', acc: 84, tag: 'Strong' },
      { icon: '📐', name: 'Maths',   q: 168, ch: '4 of 8 chapters started', acc: 61, tag: 'Getting there' },
      { icon: '📖', name: 'English', q: 96,  ch: '3 of 9 chapters started', acc: 47, tag: 'Needs work' },
    ];

    function render() {
      const host = _el('demo-parent');
      if (!host) return;
      host.innerHTML = `
        <p class="demo-pv-sample">👀 A sample report — invented numbers for a child called ${KID},
          shown so you can see the shape of it. Your own would be built from your child's real practice.</p>

        <div class="demo-pv-grid">

          <section class="demo-pv-card">
            <div class="demo-pv-head">
              <h3 class="demo-pv-h">🗓️ Last 7 days</h3>
              <span class="demo-pv-vs">vs the 7 days before</span>
            </div>
            <div class="demo-pv-tiles">
              <div class="demo-pv-tile"><span class="demo-pv-num">128</span><span class="demo-pv-lbl">Questions</span></div>
              <div class="demo-pv-tile"><span class="demo-pv-num">72%</span><span class="demo-pv-lbl">Accuracy</span></div>
              <div class="demo-pv-tile"><span class="demo-pv-num">5/7</span><span class="demo-pv-lbl">Days active</span></div>
              <div class="demo-pv-tile"><span class="demo-pv-num">1</span><span class="demo-pv-lbl">Exams</span></div>
            </div>
            <p class="demo-pv-say">${KID} practised on 5 of the last 7 days.
              That consistency is the thing that moves exam scores.</p>
            <p class="demo-pv-say-alt">When it goes the other way it says so just as plainly —
              <i>“Accuracy is down 6 points. That is often a sign they have moved on to harder
              chapters rather than that they are doing worse.”</i></p>
          </section>

          <section class="demo-pv-card">
            <div class="demo-pv-head">
              <h3 class="demo-pv-h">📚 Subjects, weakest first</h3>
            </div>
            <p class="demo-pv-sub">Where the next hour of revision is worth the most.</p>
            <ul class="demo-pv-subs">
              ${SUBJECTS.slice().sort((a, b) => a.acc - b.acc).map((s) => `
                <li class="demo-pv-sub-row">
                  <span class="demo-pv-sub-i" aria-hidden="true">${s.icon}</span>
                  <span class="demo-pv-sub-n"><b>${_esc(s.name)}</b><small>${s.q} questions · ${_esc(s.ch)}</small></span>
                  <span class="demo-pv-sub-p">${s.acc}%</span>
                  <span class="demo-pv-tag demo-pv-tag-${s.tag.split(' ')[0].toLowerCase()}">${_esc(s.tag)}</span>
                </li>`).join('')}
            </ul>
            <p class="demo-pv-notstarted">Not started yet: 🔬 Science · 🗺️ History &amp; Geography</p>
          </section>

          <section class="demo-pv-card demo-pv-cert">
            <div class="demo-pv-head"><h3 class="demo-pv-h">🎓 Certificates</h3></div>
            <div class="demo-pv-certcard">
              <div class="demo-pv-cert-top">
                <span class="demo-pv-cert-i" aria-hidden="true">🏅</span>
                <span class="demo-pv-cert-n"><b>French</b><small>Achiever</small></span>
              </div>
              <div class="demo-pv-cert-bar"><span style="width:34%"></span></div>
              <p class="demo-pv-cert-num">742 of 2,141 questions mastered · 34%</p>
              <p class="demo-pv-cert-next">347 more to reach <b>High Achiever</b></p>
            </div>
            <p class="demo-pv-cert-note">Nine levels, one certificate per subject, rebuilt from the
              child's own record. “Mastered” means right first time, or right twice running after a miss.</p>
            <p class="demo-pv-cert-dis">Generated automatically by nouklass.com from this pupil's own
              practice record — not an examination result.</p>
          </section>

        </div>`;
    }

    return { mount: render, grade: () => {}, render };
  })();

  // ══════════════════════════════════════════════════════════════════════════
  //  ⑦ THE GAME ZONE — twelve games, and one of them played for real.
  //
  //  ⚠⚠ ISLAND EXPLORER, AND NOT BY ACCIDENT. It is the only live game whose
  //    draw path touches no timer, no GameSettings and no question bank:
  //    startExplorer() reads window.MINIGAME_GEO and renders. Every other
  //    candidate disqualifies itself — Quick Fire, Number Ninja, Time
  //    Traveller, French Ninja, Potion Lab and Story Sprint all run intervals;
  //    Brain Battle is pass-the-phone; Écoute needs speechSynthesis; Memory
  //    Reef holds a peek timer and quietly defaults a stranger to grade 5.
  //
  //  ⚠⚠ PURPOSE-BUILT, LIKE THE OTHERS, and here the seam is worse than usual:
  //    _persist() is called INSIDE _exRender(), so the real renderer cannot
  //    draw a single frame without a sessionStorage write — keyed on
  //    ACTIVE_STUDENT_ID, which means a stranger's demo would be filed under
  //    the last child who used the device. And _exSaveBest() ends in
  //    _awardRun('explorer') → Store.awardActivityPoints, a server RPC.
  //    exQuit() is worse still: it calls renderHub(), which fires
  //    QuestionLoader.loadAllForGrade() — a network fetch for entitled content.
  //
  //  ⚠ NO AUDIO AND NO CONFETTI. The real game builds an AudioContext on start
  //    and fires _sfx on every answer. A landing page that beeps at a stranger
  //    is a bug, not a feature.
  //  ⚠ NO ❓ HELP BUTTON: _helpBtn() opens .mg-help-overlay, which is
  //    position:fixed; inset:0 — it would black out the whole site.
  //
  //  ⚠ THE DATA IS ALREADY HERE. window.MINIGAME_GEO is loaded eagerly by
  //    index.html and is curated public Mauritius geography, not entitled
  //    question-bank content. This slide costs no new payload at all.
  //
  //  ⚠ THE TWELVE TITLES ARE COPIED from the hub in engine/minigame.js, which
  //    builds them as inline HTML with no table to read. scripts/check.js
  //    cannot catch a title that drifts, so the suite asserts the COUNT against
  //    `mg-card-live` — the same authority scripts/test-landing-subjects.js
  //    uses. If you add a game, add it here too.
  //  ⚠ DO NOT WRITE THE PHRASE "<word> learning games" ON THIS SLIDE.
  //    test-landing-subjects.js matches the FIRST occurrence of
  //    /\b([a-z]+) learning games\b/ in the whole landing page, and this slide
  //    sits above the Game Zone section it is meant to check.
  // ══════════════════════════════════════════════════════════════════════════
  const Arcade = (() => {
    const GAMES = [
      { i: '💰', n: 'Who Wants to Be a Billionaire?' },
      { i: '⚡', n: 'Quick Fire' },
      { i: '🧩', n: 'Word Builder' },
      { i: '🗺️', n: 'Island Explorer' },
      { i: '🥷', n: 'Number Ninja' },
      { i: '⚔️', n: 'Brain Battle' },
      { i: '🕰️', n: 'Time Traveller' },
      { i: '🗡️', n: 'French Ninja' },
      { i: '🐠', n: 'Memory Reef' },
      { i: '🧪', n: 'Potion Lab' },
      { i: '🦜', n: 'Écoute !' },
      { i: '📖', n: 'Story Sprint' },
    ];

    // The real scoring, from minigame.js: right first time is gold, right on
    // the second try is silver.
    const GOLD = 15, SILVER = 8;
    const PREVIEW_STOPS = 3;

    let _i = 0, _try = 0, _gone = [], _stamps = [], _shown = '';

    const _geo = () => (typeof window !== 'undefined' && Array.isArray(window.MINIGAME_GEO))
      ? window.MINIGAME_GEO : [];

    // Deterministic, so every visitor is shown the same tour — same reason
    // build-demo-decks.js seeds its shuffle.
    function _q(stop, k) {
      const qs = (stop && stop.qs) || [];
      if (!qs.length) return null;
      let h = 2166136261;
      const s = String(stop.id) + k;
      for (let j = 0; j < s.length; j++) { h ^= s.charCodeAt(j); h = Math.imul(h, 16777619); }
      return qs[(h >>> 0) % qs.length];
    }

    function mount() { reset(); }
    function reset() { _i = 0; _try = 0; _gone = []; _stamps = []; _shown = ''; render(); }

    function pick(k) {
      const stops = _geo();
      const stop = stops[_i];
      const q = _q(stop, _i);
      if (!q || _gone.indexOf(k) >= 0 || _shown) return;
      if (q.options[k] === q.answer) {
        _stamps.push({ icon: stop.icon, name: stop.name, pts: _try === 0 ? GOLD : SILVER });
        _shown = 'right';
      } else {
        _gone.push(k);
        _try++;
        // ⚠ Two tries, then the guide explains — the real game's mechanic, and
        //   the whole reason a wrong answer here is worth something.
        if (_try >= 2) { _shown = 'wrong'; }
      }
      render();
    }

    function next() {
      _i++; _try = 0; _gone = []; _shown = '';
      render();
    }

    function render() {
      const host = _el('demo-arcade');
      if (!host) return;
      const stops = _geo();

      const tiles = GAMES.map((g, k) => `<div class="demo-gz-tile${k === 3 ? ' is-on' : ''}">
        <span class="demo-gz-tile-i" aria-hidden="true">${g.i}</span>
        <span class="demo-gz-tile-n">${_esc(g.n)}</span>
      </div>`).join('');

      const grid = `<div class="demo-gz-side">
        <p class="demo-gz-h">All ${GAMES.length} games</p>
        <div class="demo-gz-tiles">${tiles}</div>
        <p class="demo-gz-note">Every question in them comes from your child's own grade —
          they are revising the whole time.</p>
      </div>`;

      if (!stops.length) {
        host.innerHTML = `<div class="demo-gz-grid">${grid}
          <div class="demo-gz-stage"><div class="demo-gz-msg">
            <p class="demo-gz-msg-t">The tour did not load.</p>
            <p class="demo-gz-msg-x">Island Explorer is in the app — this preview just could not reach it.</p>
          </div></div></div>`;
        return;
      }

      host.innerHTML = `<div class="demo-gz-grid">${grid}
        <div class="demo-gz-stage">${_i >= PREVIEW_STOPS ? _finish(stops) : _stage(stops)}</div>
      </div>`;
    }

    // ⚠ .ex-dot IS SIZED BY font-size, not width — an empty span collapses and
    //   the whole strip renders as one solid green bar. The real game puts the
    //   stop's icon inside, and swaps it for the medal once the stop is cleared;
    //   copy that or the route says nothing.
    function _route(stops) {
      return '<div class="ex-route">' + stops.map((s, k) => {
        const cls = k === _i ? 'now' : k < _i ? 'done' : '';
        const st = _stamps[k];
        const face = k < _i ? (st && st.pts >= GOLD ? '\uD83C\uDFC5' : st ? '\u2B50' : '\u00B7') : s.icon;
        return `<span class="ex-dot ${cls}" title="${_esc(s.name)}">${face}</span>`;
      }).join('') + '</div>';
    }

    function _stage(stops) {
      const stop = stops[_i];
      const q = _q(stop, _i);
      if (!q) return '';
      const opts = q.options.map((o, k) => {
        let cls = 'qf-opt';
        if (_shown && o === q.answer) cls += ' right';
        else if (_gone.indexOf(k) >= 0) cls += ' wrong';
        const dead = !!_shown || _gone.indexOf(k) >= 0;
        return `<button type="button" class="${cls}" ${dead ? 'disabled' : ''}
          onclick="Demo.gzPick(${k})">${o}</button>`;
      }).join('');

      return `
        <p class="demo-gz-progress">Stop ${_i + 1} of ${stops.length} · ${_stamps.length} stamp${_stamps.length === 1 ? '' : 's'}</p>
        ${_route(stops)}
        <div class="ex-stop">
          <span class="ex-stop-icon" aria-hidden="true">${stop.icon}</span>
          <div class="ex-stop-body">
            <b>${_esc(stop.name)}</b>
            <span class="ex-district">${_esc(stop.district)}</span>
            <span>${_esc(stop.blurb)}</span>
          </div>
        </div>
        <p class="ex-clue">${q.question}</p>
        <div class="qf-opts">${opts}</div>
        ${_shown ? `<p class="ex-explain">${_shown === 'right' ? '✅ ' : '💡 '}${q.explanation}</p>
          <button type="button" class="demo-btn demo-btn-gz" onclick="Demo.gzNext()">
            ${_i + 1 >= PREVIEW_STOPS ? 'See your passport →' : 'Next stop →'}</button>`
          : _try === 1
            ? '<p class="demo-gz-try">Not that one — you get one more go.</p>'
            : '<p class="demo-gz-try demo-gz-try-q">Two tries, and the tour always carries on.</p>'}`;
    }

    function _finish(stops) {
      const pts = _stamps.reduce((a, s) => a + s.pts, 0);
      return `
        <div class="demo-gz-end">
          <p class="demo-gz-end-t">🛂 Your passport</p>
          <div class="ex-passport">${_stamps.length
            ? _stamps.map((s) => `<div class="ex-pass-cell"><span class="ex-pass-stamp">${s.icon}</span>
                <b>${_esc(s.name)}</b></div>`).join('')
            : '<p class="demo-gz-msg-x">No stamps this time — the tour still finishes.</p>'}</div>
          <p class="demo-gz-end-x">${pts} points from ${PREVIEW_STOPS} of ${stops.length} stops.
            The full tour visits all ${stops.length} — and Island Explorer is one game of ${GAMES.length}.</p>
          <div class="demo-gz-end-actions">
            <button type="button" class="demo-btn demo-btn-gz" onclick="Demo.signUp()">Register free to play them all →</button>
            <button type="button" class="demo-btn demo-btn-gz-ghost" onclick="Demo.gzReset()">↻ Tour again</button>
          </div>
        </div>`;
    }

    return { mount, grade: () => {}, render, pick, next, reset };
  })();

  // ══════════════════════════════════════════════════════════════════════════
  //  ② NOTHING IS SKIPPED — the coverage proof.
  //
  //  The product's central teaching claim is that every chapter breaks into
  //  named sub-topics, each with its own questions. Until now that claim lived
  //  only in prose under "How we teach". This slide shows it.
  //
  //  ⚠⚠ THE DATA IS NOT ON THIS PAGE AND CANNOT BE. subjects/_index.js is the
  //    only subject script index.html loads, and build-subject-index.js strips
  //    the subsection map twice over — once as a chapter prose field and once
  //    as the pack-level `syllabus` table. subjects/_counts.js stops at chapter
  //    level and is injected on demand. So this reads a frozen public sample,
  //    assets/demo/subsections.js, built by scripts/build-demo-subsections.js
  //    and injected as a SCRIPT TAG when the slide is first opened — same
  //    pattern and the same file:// reason as the decks and the shelf.
  //
  //  ⚠ THE COUNTS ARE renderSyllabus() SEMANTICS — every question carrying that
  //    chapter and that sub-topic tag, no type filter — because that is the
  //    number the child will see on the real syllabus screen after they sign
  //    up. The generator says so in its own header.
  //
  //  ⚠⚠ `totals.taggedQuestions` IS NOT THE SITE'S "PRACTISABLE QUESTIONS"
  //    FIGURE. It counts stored rows carrying a sub-topic tag (raw `task` rows,
  //    past papers and cloze passages included); the 34,000+ the stats strip
  //    quotes drops raw tasks and counts what Assessment.projectToItems()
  //    projects instead. Printing it beside the words "practice questions"
  //    would be quoting the wrong number at a parent. It is only ever shown
  //    here next to "filed under a named sub-topic".
  //
  //  ⚠ NO "Practise →" BUTTON on these rows, unlike the real syllabus screen:
  //    there is nothing to start without an account, and the real pill is about
  //    24px, which the suite fails. A shut row is a <div>, never a disabled
  //    button — the same rule the chapter list follows.
  // ══════════════════════════════════════════════════════════════════════════
  const Cover = (() => {
    const SRC = 'assets/demo/subsections.js';
    let _pick = 0, _failed = false;

    const _data = () => (typeof window !== 'undefined' && window.PSAC_DEMO_SUBSECTIONS) || null;

    function _inject() {
      return new Promise((resolve) => {
        if (_data()) return resolve(true);
        const s = document.createElement('script');
        s.src = SRC;
        s.onload = () => resolve(!!_data());
        s.onerror = () => resolve(false);
        document.head.appendChild(s);
      });
    }

    async function mount() {
      render();
      if (!_data()) { _failed = !(await _inject()); }
      render();
    }

    function show(i) { _pick = i; render(); }

    function render() {
      const host = _el('demo-cover');
      if (!host) return;
      const d = _data();

      if (!d) {
        host.innerHTML = _failed
          ? `<div class="demo-cv-msg"><p class="demo-cv-msg-t">The sub-topic sample did not load.</p>
               <p class="demo-cv-msg-x">Every chapter in the app is split this way — this preview just could not reach the list.</p></div>`
          : `<div class="demo-cv-msg"><span class="demo-spinner" aria-hidden="true"></span>
               <p class="demo-cv-msg-x">Opening a chapter…</p></div>`;
        return;
      }

      const chs = d.chapters || [];
      const t = d.totals || {};
      const ch = chs[Math.min(_pick, chs.length - 1)] || null;
      if (!ch) { host.innerHTML = ''; return; }

      const tabs = chs.map((c, i) => `<button type="button"
        aria-pressed="${i === _pick ? 'true' : 'false'}"
        class="demo-cv-pick${i === _pick ? ' is-on' : ''}" onclick="Demo.coverShow(${i})">
        <span class="demo-cv-pick-i" aria-hidden="true">${_esc(c.chapterIcon || '📘')}</span>
        <span class="demo-cv-pick-t"><b>${_esc(c.packName)}</b><small>Grade ${c.grade}</small></span>
      </button>`).join('');

      const total = (ch.subs || []).reduce((a, s) => a + (s.q || 0), 0);
      const most = Math.max.apply(null, (ch.subs || []).map((s) => s.q || 0).concat([1]));

      // ⚠ A bar per sub-topic, scaled to the biggest one in THIS chapter — not
      //   to a fixed maximum. The claim is "none of them is empty", not "they
      //   are all the same size", and a shared scale across chapters would make
      //   a perfectly healthy 16 look like a gap beside a 50.
      const rows = (ch.subs || []).map((s, i) => `
        <div class="demo-cv-row">
          <span class="demo-cv-n">${i + 1}</span>
          <span class="demo-cv-name">${_esc(s.name)}</span>
          <span class="demo-cv-bar"><span style="width:${Math.max(6, Math.round((s.q / most) * 100))}%"></span></span>
          <span class="demo-cv-q">${s.q}</span>
        </div>`).join('');

      host.innerHTML = `
        <div class="demo-cv-picks">${tabs}</div>
        <div class="demo-cv-sheet">
          <div class="demo-cv-head">
            <span class="demo-cv-head-i" aria-hidden="true">${_esc(ch.chapterIcon || '📘')}</span>
            <div class="demo-cv-head-t">
              <b>${_esc(ch.chapterName)}</b>
              <small>Grade ${ch.grade} ${_esc(ch.packName)} · one chapter, ${(ch.subs || []).length} sub-topics, ${total} questions</small>
            </div>
          </div>
          <div class="demo-cv-rows">${rows}</div>
        </div>
        <p class="demo-cv-stat">
          Across the whole app: <b>${_thousands(t.subsections || 0)}</b> named sub-topics in
          <b>${_thousands(t.chapters || 0)}</b> chapters${t.emptySubsections === 0 ? ' — and not one of them is empty' : ''}.
        </p>
        <p class="demo-cv-note">That is what "nothing is skipped" means: a chapter is not one big
          pile of questions, it is a list of the things the syllabus actually asks for, each with
          its own set. Your child can see which corners they have covered — and which they have not.</p>`;
    }

    return { mount, grade: () => {}, render, show };
  })();

  // ══════════════════════════════════════════════════════════════════════════
  //  THE DECK — one board, several lessons.
  //
  //  ⚠ SLIDES ARE DATA. A switch statement here would grow a branch per slide
  //    in four places (tabs, dots, mount, grade change); a registry grows one
  //    line. `mount` runs ONCE, the first time a slide is reached — the landing
  //    page is already heavy and a stranger who never swipes must not pay for
  //    the slides they never see. `grade` runs on every grade change, but only
  //    for slides that have been mounted.
  //
  //  ⚠ THE DOM SECTION AND THE REGISTRY ENTRY GO IN TOGETHER. A registered
  //    slide with no <section> renders nothing; a <section> with no entry is a
  //    slide nobody can reach and a gap in the dots.
  // ══════════════════════════════════════════════════════════════════════════
  const SLIDES = [
    { id: 'practise', n: '①', label: 'Practise', sub: 'A real chapter',
      mount: () => {}, grade: () => {} },
    { id: 'cover', n: '②', label: 'Nothing is skipped', sub: 'Every sub-topic',
      mount: () => Cover.mount(), grade: () => {} },
    { id: 'play', n: '③', label: 'Play', sub: 'Billionaire',
      mount: () => Play.mount(), grade: () => Play.grade() },
    { id: 'games', n: '④', label: 'Game Zone', sub: 'Eleven more',
      mount: () => Arcade.mount(), grade: () => Arcade.grade() },
    { id: 'lab', n: '⑤', label: 'Experiment', sub: 'A real science lab',
      mount: () => Lab.mount(), grade: () => Lab.grade() },
    { id: 'paper', n: '⑥', label: 'Build a paper', sub: 'Any chapters you like',
      mount: () => Maker.mount(), grade: () => Maker.grade() },
    { id: 'papers', n: '⑦', label: 'Past papers', sub: 'The real library',
      mount: () => Shelf.mount(), grade: () => Shelf.grade() },
    { id: 'parent', n: '⑧', label: 'For parents', sub: 'What you would see',
      mount: () => ParentView.mount(), grade: () => ParentView.grade() },  ];
  let _slide = 0;
  // ⚠ The hint pulse stops for good at the visitor's FIRST move, however they
  //   make it — arrow, tab, dot or swipe. An arrow that keeps flashing after
  //   someone has already used the deck is nagging, not helping.
  let _userMoved = false;
  const _mounted = Object.create(null);

  const _track = () => _el('demo-track');

  // ⚠⚠ THE TRACK IS SIZED TO THE ACTIVE SLIDE, and that is not a nicety.
  //   The panes are flex children of one row, so without this the deck is as
  //   tall as its TALLEST slide at every width. Measured at 390px: the
  //   practise slide stacks a subject rail, a paper and a chapter list and
  //   comes to 1120px, while the game needs 560 — so half a phone screen of
  //   empty board sat under the game, and under every slide added later.
  //   (At 1440 both are ~520 and it barely shows, which is exactly how this
  //   ships broken if you only ever look at a laptop.)
  // ⚠ DURING a swipe it grows to the tallest instead. Sizing to the active
  //   slide mid-gesture clips the one arriving until it crosses the midpoint.
  // ⚠ .demo-track needs align-items: flex-start or a pane STRETCHES to the
  //   height we just set, its scrollHeight becomes that height, and the next
  //   measurement feeds back on itself.
  function _fit(during) {
    const t = _track();
    if (!t) return;
    const hs = _panes().map((p) => Math.ceil(p.scrollHeight));
    if (!hs.length) return;
    const h = during ? Math.max.apply(null, hs) : hs[_slide];
    if (h > 0) t.style.height = h + 'px';
  }
  const _panes = () => (_track() ? Array.from(_track().children) : []);

  function _renderTabs() {
    const host = _el('demo-tabs');
    if (host) {
      host.innerHTML = SLIDES.map((s, i) => `<button type="button" role="tab"
        id="demo-tab-${s.id}" aria-selected="${i === _slide ? 'true' : 'false'}"
        class="demo-tab${i === _slide ? ' is-on' : ''}" onclick="Demo.show('${s.id}')">
        <span class="demo-tab-n" aria-hidden="true">${s.n}</span>
        <span class="demo-tab-t">${_esc(s.label)}</span>
        <span class="demo-tab-s">${_esc(s.sub)}</span>
      </button>`).join('');
    }
    const dots = _el('demo-dots');
    if (dots) {
      dots.innerHTML = SLIDES.map((s, i) => `<button type="button"
        class="demo-dot${i === _slide ? ' is-on' : ''}" onclick="Demo.show('${s.id}')"
        aria-label="Show ${_esc(s.label)}, section ${i + 1} of ${SLIDES.length}"></button>`).join('');
    }
    // ⚠⚠ THE TAB STRIP SCROLLS, SO IT HAS TO FOLLOW. Measured at 390px on the
    //   sixth slide: the active tab sat at 522-641px inside a 358px strip whose
    //   scrollLeft was 2 — completely off-screen, so a visitor who swiped to the
    //   last slides saw a tab strip with nothing highlighted at all. It only
    //   showed up at six slides; with two, every tab fitted.
    // ⚠ NOT scrollIntoView(). It scrolls every scrollable ancestor, including
    //   the page, so tapping a dot would yank the whole landing page vertically.
    //   Set scrollLeft on the strip and nothing else moves.
    const strip = _el('demo-tabs');
    const onTab = strip && strip.children[_slide];
    if (strip && onTab) {
      const want = onTab.offsetLeft - (strip.clientWidth - onTab.offsetWidth) / 2;
      strip.scrollTo({ left: Math.max(0, want), behavior: 'smooth' });
    }

    const prev = document.querySelector('.demo-deck-prev');
    const next = document.querySelector('.demo-deck-next');
    if (prev) { prev.disabled = _slide === 0; prev.classList.remove('is-hint'); }
    if (next) {
      next.disabled = _slide >= SLIDES.length - 1;
      next.classList.toggle('is-hint', !_userMoved && !next.disabled);
    }
    const panes = _panes();
    panes.forEach((p, i) => {
      // ⚠ inert, not just off-screen. Without it Tab walks into the slides
      //   nobody can see and the track scrolls sideways on its own.
      try { p.inert = i !== _slide; } catch (_) {}
      p.setAttribute('aria-hidden', i === _slide ? 'false' : 'true');
      const t = SLIDES[i];
      if (t) p.setAttribute('aria-labelledby', 'demo-tab-' + t.id);
    });
  }

  function _ensureMounted(i) {
    const s = SLIDES[i];
    if (!s || _mounted[s.id]) return;
    _mounted[s.id] = true;
    try { s.mount(); } catch (e) { console.warn('[demo] slide ' + s.id, e); }
  }

  // ⚠ A JUMP OF MORE THAN ONE SLIDE IS INSTANT. Smooth-scrolling five panes
  //   takes most of a second, and the deck is held at its TALLEST for all of
  //   it (_fit(true) runs on every scroll event so the incoming pane is not
  //   clipped) — so tapping the last tab made the whole page lurch taller and
  //   then settle back. Measured: track 1468px mid-jump against the open
  //   slide's 792px. Neighbour steps stay smooth, because there the animation
  //   is the thing that says which way you moved.
  function _goto(i, behavior) {
    requestAnimationFrame(() => _fit(false));
    const panes = _panes();
    if (!panes.length) return;
    const from = _slide;
    i = Math.max(0, Math.min(SLIDES.length - 1, i));
    if (!behavior) behavior = Math.abs(i - from) > 1 ? 'auto' : 'smooth';
    _slide = i;
    _ensureMounted(i);
    _renderTabs();
    const t = _track();
    // ⚠ offsetLeft RELATIVE to the first pane, never the raw value: the track
    //   is padded and the panes sit inside it.
    if (t && panes[i]) t.scrollTo({ left: panes[i].offsetLeft - panes[0].offsetLeft, behavior: behavior || 'smooth' });
  }

  function show(id) {
    const i = SLIDES.findIndex((s) => s.id === id);
    if (i >= 0) { _userMoved = true; _goto(i); }
  }
  function move(d) { _userMoved = true; _goto(_slide + (Number(d) || 0)); }

  // Nearest pane wins, rather than dividing by a pane width: a swipe can stop
  // between two, and scroll-snap settles a frame later than the scroll event.
  function _initDeck() {
    const t = _track();
    if (!t) return;
    let raf = 0, settle = 0;
    t.addEventListener('scroll', () => {
      _fit(true);
      clearTimeout(settle);
      settle = setTimeout(() => _fit(false), 180);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const panes = _panes();
        if (!panes.length) return;
        const base = panes[0].offsetLeft;
        let best = 0, bestD = Infinity;
        panes.forEach((el, i) => {
          const d = Math.abs((el.offsetLeft - base) - t.scrollLeft);
          if (d < bestD) { bestD = d; best = i; }
        });
        if (best !== _slide) { _userMoved = true; _slide = best; _ensureMounted(best); _renderTabs(); }
      });
    }, { passive: true });

    // ⚠⚠ A RESIZE MOVES THE DECK BACK TO SLIDE ONE, and nothing about that is
    //   obvious. The panes are `flex: 0 0 100%`, so a width change rewrites
    //   every offsetLeft while scrollLeft keeps its old pixel value — the
    //   scroll handler above then finds pane 0 nearest and the tour silently
    //   rewinds. On a phone that is every rotation, and every time the URL bar
    //   collapses. Measured in headless Chrome, which resizes the viewport to
    //   capture a full-page screenshot: the deck was on "play" and the shot
    //   came back showing "practise".
    // ⚠ The wanted slide is captured on the FIRST resize event of a burst,
    //   before any scroll event can clobber _slide, and restored without
    //   animation once the burst stops.
    let _rzT = 0, _rzWant = 0;
    window.addEventListener('resize', () => {
      if (!_rzT) _rzWant = _slide;
      clearTimeout(_rzT);
      _rzT = setTimeout(() => { _rzT = 0; _goto(_rzWant, 'auto'); }, 150);
    });

    const tabs = _el('demo-tabs');
    if (tabs) {
      tabs.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        e.preventDefault();
        move(e.key === 'ArrowRight' ? 1 : -1);
        const btn = tabs.children[_slide];
        if (btn && btn.focus) btn.focus();
      });
    }
    // ⚠ A ResizeObserver rather than a _fit() call after every render: the
    //   height changes for reasons no renderer knows about — answering a
    //   question adds a verdict, Caveat arrives late, a grade swap relists the
    //   chapters. Observing the PANES is safe because the track's height is
    //   what we set, and flex-start keeps the panes out of that loop.
    if (typeof ResizeObserver === 'function') {
      const ro = new ResizeObserver(() => _fit(false));
      _panes().forEach((p) => ro.observe(p));
    }
    _renderTabs();
    _ensureMounted(0);
    requestAnimationFrame(() => _fit(false));
  }

  return {
    init, setGrade, setSubject, setChapter, retry, pick, next, restart, signUp,
    show, move,
    bqPick: (i) => Play.pick(i), bqNext: () => Play.next(),
    bqRestart: () => Play.restart(), lifeline: (k) => Play.lifeline(k),
    mkPack: (id) => Maker.setPack(id), mkType: (id) => Maker.setType(id),
    mkToggle: (id) => Maker.toggle(id), mkBuild: () => Maker.build(), mkAgain: () => Maker.again(),
    labGo: () => Lab.go(), labPredict: (id) => Lab.predict(id),
    labTap: (id) => Lab.tap(id), labReset: () => Lab.reset(),
    shelfOpen: (i) => Shelf.open(i),
    gzPick: (k) => Arcade.pick(k), gzNext: () => Arcade.next(), gzReset: () => Arcade.reset(),
    coverShow: (i) => Cover.show(i),
    slide: () => SLIDES[_slide] && SLIDES[_slide].id,
    grade: () => _grade, subject: () => _packId, chapter: () => _chapterId,
  };
})();

if (typeof window !== 'undefined') {
  window.Demo = Demo;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => Demo.init());
  else Demo.init();
}
