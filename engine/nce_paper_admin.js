'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  NCE practice-paper generator — the ADMIN entry point.
//
//  `engine/nce_paper.js` has been able to assemble a blueprint-compliant paper
//  since batch 6 and nothing in the app has ever called it. This is that call.
//
//  ⚠ IT LIVES IN THE ADMIN PANEL, NOT ON A CHILD'S SCREEN, AND THAT IS THE
//    POINT. `grade9-maths` is `comingSoon: true` because no teacher has
//    reviewed a single one of its questions, and CLAUDE.md's own rule is that
//    anything a parent or child sees filters `!p.comingSoon` while anything an
//    admin AUTHORS with does not. A generated paper is authoring output. Giving
//    a child a route to 561 unreviewed questions because the generator finally
//    works would be the wrong reading of "finished".
//
//  ⚠ THE WARNINGS ARE RENDERED, NOT SWALLOWED. `assemblePaper` returns the
//    ways this paper falls short of the blueprint - too many questions, too few
//    visuals, a repeat rate against recent papers - and an earlier cut of the
//    CLI printed "blueprint satisfied" over a paper that had 44 questions
//    against a target of 31. Whatever is wrong with a paper is shown above the
//    download links, before the admin can open it.
//
//  ⚠ NO `window.open()` AFTER AN `await`. The same trap the WhatsApp share
//    panel is built around: a popup opened once a promise has resolved is no
//    longer inside the user's gesture and browsers eat it. Generating REVEALS
//    two real anchors on blob: urls, and the admin clicks them.
// ══════════════════════════════════════════════════════════════════════════

const NcePaperAdmin = (() => {

  let _state = null;
  const _urls = [];

  // ⚠ RECENT-PAPER HISTORY, AND IT WAS MISSING ENTIRELY. `assemblePaper`
  //   takes `recentIds` and avoids those tasks while fresh ones remain, and
  //   this module passed nothing - so a teacher pressing Generate five times
  //   got five papers built with no memory of each other. Measured over five
  //   papers on the 609-task bank, memorable-stimulus repeats:
  //
  //       history window : none   60    120   160   240   400
  //       repeats        : 44.4  47.3  38.7  33.8  33.8  33.8  %
  //       over 10 papers : 60.7  59.3  57.5  52.1  48.6  48.3  %
  //
  //   It plateaus at about 240 ids and question count, mark total and
  //   numbering depth are untouched at every window, so the cap is set past
  //   the plateau. ⚠ A SHORT WINDOW IS WORSE THAN NONE - 60 measured 47.3%
  //   against 44.4% for no history at all, because a half-remembered set
  //   pushes the assembler off the tasks it just used and onto the small
  //   pool it used the time before.
  const _HKEY = 'mm_nce_recent_v1';
  const _HCAP = 500;

  function _history(subject) {
    try {
      const all = JSON.parse(localStorage.getItem(_HKEY) || '{}');
      return Array.isArray(all[subject]) ? all[subject] : [];
    } catch { return []; }
  }
  function _remember(subject, ids) {
    try {
      const all = JSON.parse(localStorage.getItem(_HKEY) || '{}');
      const next = (Array.isArray(all[subject]) ? all[subject] : []).concat(ids);
      all[subject] = next.slice(-_HCAP);
      localStorage.setItem(_HKEY, JSON.stringify(all));
    } catch {}
  }
  function clearHistory() {
    const sel = $('adm-nce-subject');
    const subject = sel && sel.value;
    try {
      const all = JSON.parse(localStorage.getItem(_HKEY) || '{}');
      delete all[subject];
      localStorage.setItem(_HKEY, JSON.stringify(all));
    } catch {}
    render();
  }

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g,
    c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // A blob url is held by the document until it is revoked, so every
  // regeneration would leak the last paper otherwise.
  function _releaseUrls() {
    while (_urls.length) { try { URL.revokeObjectURL(_urls.pop()); } catch {} }
  }
  function _blobUrl(html) {
    const u = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
    _urls.push(u);
    return u;
  }

  function subjects() {
    const bp = (typeof NcePaper !== 'undefined' && NcePaper.BLUEPRINTS) || {};
    return Object.keys(bp).map(id => ({ id, name: bp[id].subjectName, grade: bp[id].grade }));
  }

  function render() {
    const host = $('admin-nce-paper');
    if (!host) return;
    const list = subjects();
    if (!list.length) {
      host.innerHTML = '<p class="text-xs text-gray-400 dark:text-gray-500">'
        + 'No blueprint is defined yet. A blueprint is derived from real papers and lives in '
        + '<code>engine/nce_paper.js</code>.</p>';
      return;
    }
    // ⚠ Rebuilt on every render, per the module-state rule: the seed box and the
    //   result panel must not survive into the next visit to this tab.
    _releaseUrls();
    _state = null;
    host.innerHTML =
      '<div class="flex flex-wrap items-end gap-2 mb-3">'
      + '<label class="flex-1 min-w-[150px]"><span class="block text-[11px] text-gray-500 dark:text-gray-400 mb-1">Subject</span>'
      + '<select id="adm-nce-subject" onchange="NcePaperAdmin.refreshHistoryLine()" class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-700 dark:text-white">'
      + list.map(s => `<option value="${esc(s.id)}">Grade ${esc(s.grade)} ${esc(s.name)}</option>`).join('')
      + '</select></label>'
      + '<label class="w-24"><span class="block text-[11px] text-gray-500 dark:text-gray-400 mb-1">Seed</span>'
      + '<input id="adm-nce-seed" type="number" value="1" min="0" step="1" aria-label="Paper seed"'
      + ' class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"></label>'
      + '<button id="adm-nce-go" onclick="NcePaperAdmin.generate()"'
      + ' class="text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-2">Generate</button>'
      + '</div>'
      + '<p class="text-[11px] text-gray-400 dark:text-gray-500 mb-3 leading-relaxed">'
      + 'Changing the seed deals a different paper from the same bank. <b>The seed alone does '
      + 'not identify a paper</b>: the list of recently used questions below is a second input, '
      + 'so re-running a seed after generating other papers gives a different one. Clear the '
      + 'history to reproduce a paper exactly.</p>'
      + '<p class="text-[11px] text-gray-400 dark:text-gray-500 mb-3 leading-relaxed">'
      + '<span id="adm-nce-hist">' + _historyLine(list[0] && list[0].id) + '</span></p>'
      + '<div id="adm-nce-out"></div>';
  }

  // ⚠ A TASK CARRIES NO `subject` FIELD. Measured in the built bundle: a task
  //   has id/chapterId/subsection/difficulty/type/parts and nothing naming its
  //   pack, so filtering on `q.subject === packId` matches zero of 561 and the
  //   generator answers "no content" for a bank that is fully loaded. The pack's
  //   own chapter ids are what scopes it - the same thing every other reader in
  //   the app uses.
  // The panel has to say what the history is doing to the paper it just made,
  // or a teacher cannot tell a repeat-avoiding run from a fresh one.
  function _historyLine(subject) {
    const n = _history(subject || '').length;
    if (!n) return 'No recent papers are remembered for this subject, so the first paper is '
      + 'built from the whole bank.';
    return 'Remembering <b>' + n + '</b> question(s) from papers already generated for this '
      + 'subject; the next paper avoids them while fresh ones remain. '
      + '<button onclick="NcePaperAdmin.clearHistory()" class="underline text-indigo-500 '
      + 'hover:text-indigo-700">Start a fresh set</button>.';
  }

  function refreshHistoryLine() {
    const el = $('adm-nce-hist'), sel = $('adm-nce-subject');
    if (el && sel) el.innerHTML = _historyLine(sel.value);
  }

  function _packChapters(packId) {
    const pack = (typeof SUBJECT_PACKS !== 'undefined' && SUBJECT_PACKS || [])
      .find(p => p && p.id === packId);
    return (pack && (pack._chapters || pack.chapters)) || [];
  }

  function _chapterWeights(packId) {
    const w = {};
    _packChapters(packId).forEach(c => {
      if (c && c.id && typeof c.examWeight === 'number') w[c.id] = c.examWeight;
    });
    return w;
  }

  async function generate() {
    const out = $('adm-nce-out');
    const btn = $('adm-nce-go');
    if (!out) return;
    const subject = ($('adm-nce-subject') || {}).value;
    const seedRaw = ($('adm-nce-seed') || {}).value;
    const seed = Number.isFinite(+seedRaw) ? Math.floor(+seedRaw) : 1;

    const bp = NcePaper.BLUEPRINTS[subject];
    if (!bp) { out.innerHTML = '<p class="text-sm text-rose-500">No blueprint for that subject.</p>'; return; }

    if (btn) { btn.disabled = true; btn.textContent = 'Generating…'; }
    out.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400">Loading the question bank…</p>';
    try {
      // The manifest carries the chapter weights, and they are derived from
      // measured marks per content area - so the pack has to be loaded, not
      // just listed. The lite index has no examWeight.
      if (typeof PackLoader !== 'undefined' && PackLoader.ensure) await PackLoader.ensure(subject);
      if (typeof QuestionLoader !== 'undefined' && QuestionLoader.loadSubject) {
        await QuestionLoader.loadSubject(subject);
      }

      const own = new Set(_packChapters(subject).map(c => c && c.id).filter(Boolean));
      const tasks = (typeof STATIC_QUESTIONS !== 'undefined' ? STATIC_QUESTIONS : [])
        .filter(q => q && q.type === 'task' && own.has(q.chapterId)
                  && Array.isArray(q.parts) && q.parts.length);

      // ⚠ An empty bank is a real answer, not a failure to report as one. It
      //   means the subject is gated, still `comingSoon` with no content, or
      //   the fetch was refused - and a generator that answered with a blank
      //   paper instead would look like it worked.
      if (!tasks.length) {
        out.innerHTML = '<p class="text-sm text-rose-500">No multi-part tasks reached the browser for '
          + esc(subject) + '. The pack may have no content yet, or the question service refused it '
          + 'for this session.</p>';
        return;
      }

      const before = _history(subject);
      const paper = NcePaper.assemblePaper({
        blueprint: bp, tasks, seed, chapterWeights: _chapterWeights(subject),
        recentIds: before,
      });
      // ⚠ The MCQ block is SYNTHETIC and its own id means nothing to the
      //   history; `sourceIds` carries the real items it was built from.
      _remember(subject, paper.tasks.flatMap(t => t.sourceIds || [t.id]));
      _state = { paper, bp, subject, seed };
      refreshHistoryLine();
      _releaseUrls();
      const paperUrl = _blobUrl(NcePaper.paperHtml(paper, { blueprint: bp }));
      const schemeUrl = _blobUrl(NcePaper.markSchemeHtml(paper, { blueprint: bp }));
      const c = paper.compliance || {};
      const warn = paper.warnings || [];

      out.innerHTML =
        '<div class="rounded-xl border border-gray-200 dark:border-gray-700 p-3">'
        + '<p class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">'
        + `Seed ${seed} &middot; ${paper.tasks.length} questions &middot; ${paper.totalMarks}/${bp.totalMarks} marks</p>`
        + '<p class="text-[11px] text-gray-500 dark:text-gray-400 mb-2 leading-relaxed">'
        + `${tasks.length} tasks in the bank &middot; `
        + `${c.partCount || 0} mark-bearing parts &middot; `
        + `${Math.round((c.visualShare || 0) * 100)}% carry a visual (target ${Math.round((bp.visualShare || 0) * 100)}%) &middot; `
        + `${c.manualTasks || 0} drawing task(s) &middot; numbering depth ${c.maxDepth || 1}</p>`
        + (warn.length
            ? '<div class="text-[11px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-2 mb-2 space-y-1">'
              + warn.map(w => '<div>⚠ ' + esc(w) + '</div>').join('') + '</div>'
            : '<div class="text-[11px] text-emerald-700 dark:text-emerald-400 mb-2">'
              + 'No blueprint warnings on this paper.</div>')
        + '<div class="flex flex-wrap gap-2">'
        + `<a href="${paperUrl}" target="_blank" rel="noopener"`
        + ' class="text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-2">📄 Open paper</a>'
        + `<a href="${schemeUrl}" target="_blank" rel="noopener"`
        + ' class="text-sm font-semibold bg-gray-700 hover:bg-gray-800 text-white rounded-xl px-4 py-2">🗝️ Open mark scheme</a>'
        + '</div>'
        + '<p class="text-[11px] text-gray-400 dark:text-gray-500 mt-2 leading-relaxed">'
        + 'Each opens as a printable page with its own Print button. '
        + '<b>These questions have not been reviewed by a teacher</b> - the pack is still '
        + 'marked Coming Soon and no child can reach it.</p>'
        + '</div>';
    } catch (e) {
      out.innerHTML = '<p class="text-sm text-rose-500">Could not generate: '
        + esc((e && e.message) || e) + '</p>';
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = 'Generate'; }
    }
  }

  return { render, generate, subjects, clearHistory, refreshHistoryLine,
           _state: () => _state, _history };
})();

if (typeof window !== 'undefined') window.NcePaperAdmin = NcePaperAdmin;
