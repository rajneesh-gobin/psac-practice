'use strict';
// PAPER BUILDER — the adult-facing test-paper generator.
//
// A parent or a teacher picks a grade, a subject, which chapters and which
// difficulty levels, and gets the SAME printable paper the child's exam screen
// produces, with the same separate answer sheet.
//
// ⚠⚠ ONE MODULE, TWO SURFACES. The parent tab and the teacher screen render the
//    same form through render(), because a second copy of a picker is how the
//    two drift until one of them silently stops honouring a rule the other
//    gained. The only thing that differs is `surface`, used for wording and for
//    which plan check applies.
//
// ⚠⚠ IT DOES NOT BUILD THE PAPER. generatePrintablePaper(opts) in app.js does,
//    and it carries about a dozen rules that were measured rather than reasoned
//    about — isPoolQuestion() on the pool, cloze admitted there and nowhere
//    else, _printNeedsOptions() deciding which MCQs keep their letters, the
//    Section A rota, the watermark, the footer disclaimers. This module's whole
//    job is to hand that function a valid options object.
//
// ⚠ TWO AWAITS ARE LOAD-BEARING BEFORE GENERATING, and skipping either produces
//   an empty or broken paper rather than an error:
//     PackLoader.ensure(packId)        — the lite index carries chapter ids and
//                                       names but no generators or subsection
//                                       maps, so a paper built off it is thin.
//     QuestionLoader.loadSubject(id)   — STATIC_QUESTIONS only ever holds what
//                                       the app has FETCHED. Teacher Set Work
//                                       hit exactly this and reported "No
//                                       questions found for these settings",
//                                       which reads as a filter problem rather
//                                       than an empty pool.
//
// ⚠ A paper is ONE subject by default, and the format is why: the generator
//   prints a 100-mark Section A / Section B paper, and a real exam paper covers
//   one subject with one mark scheme.
// ⚠ MIXED SUBJECTS ARE SUPPORTED BUT WARNED ABOUT, at the request of the owner.
//   A teacher building an end-of-term revision sheet has a genuine use for one.
//   What the warning beside the checkbox says is true and worth keeping true:
//   the marks no longer map to any real paper, the maths format is dropped (a
//   maths paper is 20 short + 15 applied and that shape is meaningless once
//   English is on the sheet), and the sections interleave subjects, so a pupil
//   switches language mid-paper. It is a revision sheet, not a mock exam.
const PaperBuilder = (() => {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const DIFFS = [
    { n: 1, label: 'Basic' },
    { n: 2, label: 'Medium' },
    { n: 3, label: 'Hard' },
    // ⚠ Level 4 is NOT simply "harder". In maths it is applied word problems; in
    //   the language packs it is extended passage work. The label says so rather
    //   than implying a single ladder.
    { n: 4, label: 'Word problems / applied' },
  ];

  let _surface = 'parent';
  let _hostId = null;
 // ⚠ _freshPack marks "the chapter set has not been chosen yet", which is NOT the
 //   same as "no chapters are ticked". Without the distinction, Clear emptied the
 //   set and the next render helpfully ticked everything back — the button looked
 //   broken and the only clue was that it worked once per pack change.
  const _state = { grade: null, packId: null, chapters: new Set(), diffs: new Set([1, 2, 3, 4]),
    secA: null, secB: null, freshPack: true, mixed: false, packIds: new Set() };

  // Adults see every LIVE pack. ⚠ comingSoon is filtered because this list is
  // parent- and teacher-facing: the comingSoon rule is that anything a parent or
  // child sees filters it, and only admin authoring surfaces show them.
  function _packs() {
    return (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : []).filter((p) => !p.comingSoon);
  }
  function _grades() {
    return [...new Set(_packs().map((p) => Number(p.grade)))].sort((a, b) => a - b);
  }
  function _packsForGrade(g) {
    return _packs().filter((p) => Number(p.grade) === Number(g))
      .sort((a, b) => String(a.name).localeCompare(String(b.name)));
  }
  function _pack() { return _packs().find((p) => p.id === _state.packId) || null; }
  // Every pack the paper will draw from: one, or all the ticked ones when mixing.
  function _activePacks() {
    if (!_state.mixed) { const p = _pack(); return p ? [p] : []; }
    return _packs().filter((p) => _state.packIds.has(p.id));
  }
  function _chaptersOf(pack) { return (pack && (pack._chapters || pack.chapters)) || []; }
  // ⚠ Chapter ids are unique across packs, so a flat union is safe — but the
  //   LABEL must name the subject when mixing, or a teacher sees two chapters
  //   called "Reading" and cannot tell which subject each belongs to.
  function _allChapters() {
    return _activePacks().flatMap((p) => _chaptersOf(p)
      .map((c) => ({ ...c, _pack: p.name, _packId: p.id })));
  }

  // ── render ───────────────────────────────────────────────────────────────
  function render(hostId, surface) {
    _hostId = hostId || _hostId;
    _surface = surface || _surface;
    const host = $(_hostId);
    if (!host) return;

    const grades = _grades();
    if (_state.grade == null && grades.length) _state.grade = grades[0];
    const packs = _packsForGrade(_state.grade);
    if (!_state.packId || !packs.some((p) => p.id === _state.packId)) {
      _state.packId = packs[0]?.id || null;
      _state.chapters = new Set();
      _state.freshPack = true;
    }

    host.innerHTML = `
      <div class="pb-wrap">
        <p class="pb-lede">Build a practice paper and print it, or save it as a PDF from the
          print dialog. The answer sheet opens as a separate page from a button on the paper.</p>

        <div class="pb-row">
          <label class="pb-field">
            <span>Grade</span>
            <select id="pb-grade" onchange="PaperBuilder.setGrade(this.value)">
              ${grades.map((g) => `<option value="${g}" ${Number(g) === Number(_state.grade) ? 'selected' : ''}>Grade ${g}</option>`).join('')}
            </select>
          </label>
          ${_state.mixed ? '' : `
          <label class="pb-field">
            <span>Subject</span>
            <select id="pb-subject" onchange="PaperBuilder.setPack(this.value)">
              ${packs.map((p) => `<option value="${esc(p.id)}" ${p.id === _state.packId ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}
            </select>
          </label>`}
        </div>

        <div class="pb-block pb-block-warn">
          <label class="pb-check pb-check-mix">
            <input type="checkbox" id="pb-mixed" ${_state.mixed ? 'checked' : ''}
              onchange="PaperBuilder.setMixed(this.checked)">
            <span><b>Mix several subjects on one paper</b></span>
          </label>
          <p class="pb-warn">⚠ <b>Not recommended.</b> A real exam paper covers one
            subject with one mark scheme. A mixed sheet has marks that match no real
            paper, loses the maths layout, and asks a pupil to switch subject partway
            through. Useful as an end-of-term revision sheet - not as a mock exam.</p>
          ${_state.mixed ? `
          <div class="pb-checks" id="pb-subjects">
            ${packs.map((p) => `
              <label class="pb-check">
                <input type="checkbox" value="${esc(p.id)}" ${_state.packIds.has(p.id) ? 'checked' : ''}
                  onchange="PaperBuilder.togglePack(\'${esc(p.id)}\', this.checked)">
                <span>${esc(p.name)}</span>
              </label>`).join('')}
          </div>
          <p class="pb-hint">Tick two or more subjects in Grade ${esc(String(_state.grade))}.</p>` : ''}
        </div>

        <div class="pb-block">
          <div class="pb-block-head">
            <b>Chapters</b>
            <span class="pb-hint" id="pb-ch-count"></span>
            <button type="button" class="pb-mini" onclick="PaperBuilder.allChapters(true)">Select all</button>
            <button type="button" class="pb-mini" onclick="PaperBuilder.allChapters(false)">Clear</button>
          </div>
          <div class="pb-checks" id="pb-chapters"></div>
          <p class="pb-hint">Leave every chapter ticked for a whole-syllabus paper.</p>
        </div>

        <div class="pb-block">
          <div class="pb-block-head"><b>Difficulty</b><span class="pb-hint">Tick the levels to draw from</span></div>
          <div class="pb-checks pb-checks-diff">
            ${DIFFS.map((d) => `
              <label class="pb-check">
                <input type="checkbox" value="${d.n}" ${_state.diffs.has(d.n) ? 'checked' : ''}
                  onchange="PaperBuilder.toggleDiff(${d.n}, this.checked)">
                <span><b>L${d.n}</b> ${esc(d.label)}</span>
              </label>`).join('')}
          </div>
        </div>

        <div class="pb-block">
          <div class="pb-block-head"><b>Paper length</b><span class="pb-hint">Leave blank for the standard paper</span></div>
          <div class="pb-row">
            <label class="pb-field pb-field-sm">
              <span>Section A questions</span>
              <input type="number" id="pb-sec-a" min="5" max="40" placeholder="auto"
                value="${_state.secA ?? ''}" oninput="PaperBuilder.setLen('secA', this.value)">
            </label>
            <label class="pb-field pb-field-sm">
              <span>Section B questions</span>
              <input type="number" id="pb-sec-b" min="0" max="20" placeholder="auto"
                value="${_state.secB ?? ''}" oninput="PaperBuilder.setLen('secB', this.value)">
            </label>
          </div>
        </div>

        <div class="pb-actions">
          <button type="button" class="pb-go" id="pb-go" onclick="PaperBuilder.generate()">🖨️ Generate paper</button>
          <span class="pb-status" id="pb-status"></span>
        </div>
        <p class="pb-foot">The sheet prints in our own layout and is not an MIE or Ministry
          document. A separate answer sheet opens from the paper itself.</p>
      </div>`;

    _renderChapters();
  }

  // Chapters are rendered separately because changing subject replaces only this
  // list, and re-rendering the whole form would lose focus mid-interaction.
  function _renderChapters() {
    const box = $('pb-chapters');
    if (!box) return;
    const chs = _allChapters();
    if (_state.freshPack && chs.length) {
      _state.freshPack = false;
      chs.forEach((c) => _state.chapters.add(c.id));
    }
    if (!chs.length) {
      // ⚠ The lite index carries chapter ids for every pack, so an empty list here
      //   means the pack genuinely declares none — say so rather than showing an
      //   empty box that reads as a loading failure.
      box.innerHTML = '<p class="pb-hint">This subject declares no chapters yet.</p>';
      _syncCount();
      return;
    }

    box.innerHTML = chs.map((c) => `
      <label class="pb-check">
        <input type="checkbox" value="${esc(c.id)}" ${_state.chapters.has(c.id) ? 'checked' : ''}
          onchange="PaperBuilder.toggleChapter('${esc(c.id)}', this.checked)">
        <span>${c.icon ? esc(c.icon) + ' ' : ''}${esc(c.name)}${_state.mixed ? ` <i class="pb-inpack">${esc(c._pack)}</i>` : ''}${c.enrichment ? ' <i class="pb-bonus">bonus</i>' : ''}</span>
      </label>`).join('');
    _syncCount();
  }

  function _syncCount() {
    const el = $('pb-ch-count');
    if (!el) return;
    const total = _allChapters().length;
    el.textContent = total ? `${_state.chapters.size} of ${total} selected` : '';
  }

  function _status(msg, kind) {
    const el = $('pb-status');
    if (el) { el.textContent = msg || ''; el.className = 'pb-status' + (kind ? ' pb-' + kind : ''); }
  }

  // ── events ───────────────────────────────────────────────────────────────
  function setGrade(g) {
    _state.grade = Number(g);
    _state.packId = null;
    _state.chapters = new Set();
    _state.freshPack = true;
    render();
  }
  function setPack(id) {
    _state.packId = id;
    _state.chapters = new Set();
    _state.freshPack = true;
    _renderChapters();
    _status('');
  }
  function toggleChapter(id, on) {
    if (on) _state.chapters.add(id); else _state.chapters.delete(id);
    _syncCount();
    _status('');
  }
  function allChapters(on) {
    // ⚠ An explicit Clear is a CHOICE, so the pack is no longer "fresh".
    _state.freshPack = false;
    _state.chapters = on ? new Set(_allChapters().map((c) => c.id)) : new Set();
    _renderChapters();
    _status('');
  }
  function setMixed(on) {
    _state.mixed = !!on;
    // Seed the tick list from whatever single subject was chosen, so turning the
    // option on does not empty the form the adult had already filled in.
    if (_state.mixed) {
      _state.packIds = new Set(_state.packId ? [_state.packId] : []);
    } else {
      _state.packId = [..._state.packIds][0] || _state.packId;
      _state.packIds = new Set();
    }
    _state.chapters = new Set();
    _state.freshPack = true;
    render();
  }
  function togglePack(id, on) {
    if (on) _state.packIds.add(id); else _state.packIds.delete(id);
    // ⚠ The chapter list changes shape with the subject list, so it is rebuilt and
    //   re-seeded. Keeping stale ticks would put a chapter on the paper from a
    //   subject the adult has just removed.
    _state.chapters = new Set();
    _state.freshPack = true;
    _renderChapters();
    _syncCount();
    _status('');
  }
  function toggleDiff(n, on) {
    if (on) _state.diffs.add(Number(n)); else _state.diffs.delete(Number(n));
    _status('');
  }
  function setLen(which, v) {
    _state[which] = v === '' ? null : Number(v);
  }

  // ── generate ─────────────────────────────────────────────────────────────
  async function generate() {
    const btn = $('pb-go');
    const packs = _activePacks();
    const pack = packs[0] || null;
    if (!pack) return _status('Choose a subject first.', 'err');
    // ⚠ One ticked subject in mixed mode is not an error worth blocking — it is
    //   simply an ordinary single-subject paper, so let it through rather than
    //   making the adult untick the option to proceed.
    if (!_state.chapters.size) return _status('Tick at least one chapter.', 'err');
    if (!_state.diffs.size) return _status('Tick at least one difficulty level.', 'err');

    // ⚠ The plan gate is checked HERE as well as on the child's path. The button
    //   being drawn is not permission — and this surface is reached by an adult
    //   who may be on a plan that excludes printable papers.
    if (typeof _planAllowsFeature === 'function' && !_planAllowsFeature('printable_papers')) {
      if (typeof _showFeatureModal === 'function') _showFeatureModal('printable_papers');
      else _status('Printable papers are not included in your plan.', 'err');
      return;
    }

    if (btn) btn.disabled = true;
    _status('Loading ' + packs.map((p) => p.name).join(', ') + '…');
    try {
      // ⚠ Both awaits matter — see the header. ensure() brings the real manifest,
      //   loadSubject() brings the questions into STATIC_QUESTIONS.
      // ⚠ EVERY chosen pack, not just the first. A mixed paper whose second
      //   subject was never fetched prints as a single-subject paper and nothing
      //   says so — STATIC_QUESTIONS only holds what the app has loaded.
      for (const p of packs) {
        if (typeof PackLoader !== 'undefined' && PackLoader.ensure) await PackLoader.ensure(p.id);
        if (typeof QuestionLoader !== 'undefined' && QuestionLoader.loadSubject) {
          await QuestionLoader.loadSubject(p.id);
        }
      }

      // ⚠ Count the pool the way the generator will, BEFORE opening a window. A
      //   pop-up that turns out to hold four questions under a "Section A" heading
      //   is worse than being told the filters are too narrow, and the adult has
      //   no way to tell the difference from the printed sheet.
      const avail = _poolSize(pack);
      // ⚠ Mirrors the generator: the maths layout (20 short + 15 applied) applies only
      //   when EVERY subject on the sheet is maths, so a mixed paper is sized as the
      //   standard 30 + 10. If this and the generator disagree, the warning fires on
      //   the wrong threshold and either blocks a paper that would have built or
      //   passes one that prints short.
      const _allMaths = packs.every((p) => p.subject === 'Maths');
      const wantA = _state.secA ?? (_allMaths ? 20 : 30);
      const wantB = _state.secB ?? (_allMaths ? 15 : 10);
      if (avail < wantA + wantB) {
        _status(`Only ${avail} question${avail === 1 ? '' : 's'} match - that is not enough for a `
          + `${wantA + wantB}-question paper. Tick more chapters or levels, or shorten the paper.`, 'err');
        return;
      }

      // ⚠ ignoreChildLocks: DB.restrictions belongs to whichever child is loaded,
      //   and a paper an adult builds is not bound by one pupil's parental locks.
      //   It does NOT bypass the plan gate above.
      generatePrintablePaper({
        packIds: packs.map((p) => p.id),
        chapterIds: [..._state.chapters],
        difficulties: [..._state.diffs],
        sectionACount: _state.secA ?? undefined,
        sectionBCount: _state.secB ?? undefined,
        ignoreChildLocks: true,
      });
      _status('Paper opened in a new tab. Allow pop-ups if nothing appeared.', 'ok');
    } catch (e) {
      _status('Could not build the paper: ' + (e?.message || 'unknown error'), 'err');
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  // Mirrors the generator's own pool rule closely enough to warn on a thin
  // selection. ⚠ isPoolQuestion() is the same gate the generator uses; without it
  // this would count raw grade9-maths tasks that have no question text at all.
  function _poolSize(pack) {
    if (typeof STATIC_QUESTIONS === 'undefined') return 0;
    const chs = new Set([..._state.chapters]);
    const ok = (typeof isPoolQuestion === 'function') ? isPoolQuestion : () => true;
    return STATIC_QUESTIONS.filter((q) =>
      q && ok(q) && chs.has(q.chapterId) && _state.diffs.has(Number(q.difficulty))).length;
  }

  // Test-harness introspection; the state is otherwise closure-private.
  function _debug() {
    return { surface: _surface, grade: _state.grade, packId: _state.packId,
      mixed: _state.mixed, packIds: [..._state.packIds],
      chapters: [..._state.chapters], diffs: [..._state.diffs], secA: _state.secA, secB: _state.secB };
  }
  function _set(patch) { Object.assign(_state, patch); }

  return { render, setGrade, setPack, setMixed, togglePack, toggleChapter, allChapters,
           toggleDiff, setLen, generate, _debug, _set, _poolSize };
})();
