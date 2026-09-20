'use strict';
// CHAPTER PREVIEW — the adult-facing "show me what my child sees".
//
// A parent or a teacher picks a grade, a subject and a chapter, and the CHILD'S
// OWN practice screen opens on the same 20 questions a child would be dealt.
//
// ⚠⚠ ONE MODULE, TWO SURFACES, exactly like PaperBuilder: the parent dashboard
//    and the teacher screen both call render(), because a second copy of a
//    picker is how the two drift until one silently stops honouring a rule the
//    other gained. Only `surface` differs, and it decides one thing - which
//    screen the ← button goes back to.
//
// ⚠⚠ IT RECORDS NOTHING. The guarantee is not here; it is startChapterPreview()
//    in app.js and the _isPreviewRun() guard on every write funnel
//    (recordAnswer, _recordMistake, _retireMistake, _saveResume, _usageBump,
//    gainPoints, the referral RPC). This module only chooses what to open. A
//    parent reaches it while a CHILD is loaded into DB, so "nothing is written"
//    has to be true at the funnels, not at the entrance.
//
// ⚠ THE TWO AWAITS ARE LOAD-BEARING and live in startChapterPreview():
//     PackLoader.ensure(packId)      - the lite index carries chapter ids and
//                                      names but no generators, so a preview
//                                      built off it is thin or empty.
//     QuestionLoader.loadSubject(id) - STATIC_QUESTIONS only holds what has
//                                      been FETCHED. Skipping it is what made
//                                      Teacher Set Work report "No questions
//                                      found for these settings".
const ChapterPreview = (() => {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const DIFFS = [
    { v: '', label: 'Mixed — as a child gets it' },
    { v: '1', label: 'Basic only' },
    { v: '2', label: 'Medium only' },
    { v: '3', label: 'Hard only' },
    // ⚠ Level 4 is not simply "harder" - in maths it is applied word problems,
    //   in the language packs extended passage work. Say so rather than
    //   implying one ladder. Same wording as PaperBuilder, deliberately.
    { v: '4', label: 'Word problems / applied' },
  ];

  let _surface = 'parent';
  let _hostId = null;
  const _state = { grade: null, packId: null, diff: '' };

  // ⚠ comingSoon is filtered: this list is parent- and teacher-facing, and the
  //   rule is that anything a parent or child sees filters it. Only admin
  //   authoring surfaces show them.
  function _packs() {
    return (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : []).filter(p => !p.comingSoon);
  }
  function _grades() {
    return [...new Set(_packs().map(p => Number(p.grade)))].sort((a, b) => a - b);
  }
  function _packsForGrade(g) {
    return _packs().filter(p => Number(p.grade) === Number(g))
      .sort((a, b) => String(a.name).localeCompare(String(b.name)));
  }
  function _pack() { return _packs().find(p => p.id === _state.packId) || null; }
  // ⚠ `_chapters` on a lite pack, `chapters` once the real manifest is in.
  //   Both shapes are live at once - the index registers every pack lite and
  //   PackLoader.ensure() upgrades one at a time.
  function _chaptersOf(pack) { return (pack && (pack._chapters || pack.chapters)) || []; }

  // What the CHILD would be dealt, counted the same way: the pool excludes the
  // two French exercise types, which open their own screens instead.
  function _count(chapterId) {
    if (typeof STATIC_QUESTIONS === 'undefined') return null;
    const n = STATIC_QUESTIONS.filter(q => q && q.chapterId === chapterId
      && (typeof isPoolQuestion !== 'function' || isPoolQuestion(q))).length;
    return n || null;
  }

  function render(hostId, surface) {
    _hostId = hostId || _hostId;
    _surface = surface === 'teacher' ? 'teacher' : 'parent';
    const host = $(_hostId);
    if (!host) return;

    const grades = _grades();
    if (!grades.length) {
      host.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 py-6 text-center">Subjects are still loading. Give it a moment and open this again.</p>';
      return;
    }
    if (_state.grade === null || !grades.includes(Number(_state.grade))) _state.grade = grades[0];
    const packs = _packsForGrade(_state.grade);
    if (!packs.some(p => p.id === _state.packId)) _state.packId = packs[0] ? packs[0].id : null;

    const who = _surface === 'teacher' ? 'your pupils' : 'your child';
    // ⚠ Says where the real thing happens, not only that this is not it. Same
    //   sentence as the in-run banner (_setPreviewBanner in app.js) - a parent
    //   who reads one and not the other must not get two different answers.
    const how = _surface === 'teacher'
      ? 'Work only counts when a pupil answers it signed in themselves — from their own sign-in or your class link.'
      : 'Work only counts when your child answers it themselves: tap 🎒 Switch to student mode on your dashboard and they sign in with their PIN.';
    host.innerHTML = `
      <div class="space-y-4">
        <p class="text-sm text-gray-600 dark:text-gray-300">
          Open any chapter exactly as ${esc(who)} would see it — the same questions, hints and explanations.
          <b>Nothing you answer is saved or counted.</b>
          <span class="block mt-1">${esc(how)}</span>
        </p>

        <div class="grid gap-3 sm:grid-cols-3">
          <label class="block">
            <span class="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Grade</span>
            <select id="cp-grade" onchange="ChapterPreview.setGrade(this.value)"
              class="w-full text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-2">
              ${grades.map(g => `<option value="${g}"${Number(_state.grade) === g ? ' selected' : ''}>Grade ${g}</option>`).join('')}
            </select>
          </label>
          <label class="block">
            <span class="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Subject</span>
            <select id="cp-pack" onchange="ChapterPreview.setPack(this.value)"
              class="w-full text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-2">
              ${packs.map(p => `<option value="${esc(p.id)}"${p.id === _state.packId ? ' selected' : ''}>${esc(p.name)}</option>`).join('')}
            </select>
          </label>
          <label class="block">
            <span class="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Level</span>
            <select id="cp-diff" onchange="ChapterPreview.setDiff(this.value)"
              class="w-full text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-2">
              ${DIFFS.map(d => `<option value="${d.v}"${_state.diff === d.v ? ' selected' : ''}>${esc(d.label)}</option>`).join('')}
            </select>
          </label>
        </div>

        <div id="cp-chapters" class="space-y-2">${_chapterListHtml()}</div>
      </div>`;
  }

  // ⚠ A lite pack knows its chapter NAMES but has not loaded its questions, so
  //   the count is unknown rather than zero until the pack has been opened
  //   once. Printing "0 questions" beside a chapter that has hundreds is worse
  //   than printing nothing.
  function _chapterListHtml() {
    const pack = _pack();
    const chapters = _chaptersOf(pack);
    if (!chapters.length) {
      return '<p class="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">This subject has no chapters yet.</p>';
    }
    const backTo = _surface === 'teacher' ? 'teacher' : 'parent';
    return chapters.map(c => {
      const n = _count(c.id);
      const meta = n ? `${n} question${n === 1 ? '' : 's'}` : 'opens when you preview it';
      return `
      <button type="button"
        onclick="ChapterPreview.open('${esc(c.id)}')"
        class="w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
        <span class="text-xl shrink-0" aria-hidden="true">${esc(c.icon || '📘')}</span>
        <span class="min-w-0 flex-1">
          <span class="block text-sm font-bold text-gray-800 dark:text-white truncate">${esc(c.name || c.id)}</span>
          <span class="block text-[11px] text-gray-500 dark:text-gray-400">${esc(meta)}</span>
        </span>
        <span class="shrink-0 text-xs font-bold text-indigo-600 dark:text-indigo-300">Preview →</span>
      </button>`;
    }).join('') + `<p class="text-[11px] text-gray-400 dark:text-gray-500 pt-1">Back to ${backTo === 'teacher' ? 'teaching' : 'your dashboard'} at any time — the ← button at the top of the preview.</p>`;
  }

  function _repaintChapters() {
    const box = $('cp-chapters');
    if (box) box.innerHTML = _chapterListHtml();
  }

  function setGrade(g) { _state.grade = Number(g); _state.packId = null; render(_hostId, _surface); }
  function setPack(id) { _state.packId = id; _repaintChapters(); }
  function setDiff(v)  { _state.diff = String(v || ''); }

  function open(chapterId) {
    if (!_state.packId || typeof startChapterPreview !== 'function') return;
    const diff = _state.diff ? Number(_state.diff) : null;
    startChapterPreview(_state.packId, chapterId, diff, _surface);
  }

  return { render, setGrade, setPack, setDiff, open };
})();
