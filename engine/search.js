'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice - Question Search Engine
//  Searches question text AND syllabus/chapter descriptions.
//  Fuzzy matching with typo tolerance. Autocomplete suggestions.
// ══════════════════════════════════════════════

const Search = (() => {
  let _qIndex     = null;   // question index
  let _chIndex    = null;   // chapter / syllabus index
  let _suggestions = null;  // autocomplete terms array
  let _mode       = 'fuzzy';
  let _prevScreen = 'dashboard';
  let _activeSugg = -1;     // keyboard-selected suggestion index

  // ── Text normalisation ─────────────────────────────────────────────────────
  function norm(str) {
    return (str || '').toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9 ]/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }

  // ── Levenshtein edit distance (capped for speed) ───────────────────────────
  function editDist(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    if (Math.abs(a.length - b.length) > 3) return 99;
    const row = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      let prev = i;
      for (let j = 1; j <= b.length; j++) {
        const val = a[i-1] === b[j-1] ? row[j-1] : 1 + Math.min(prev, row[j], row[j-1]);
        row[j-1] = prev; prev = val;
      }
      row[b.length] = prev;
    }
    return row[b.length];
  }

  // Word-level fuzzy: prefix match OR edit distance based on word length
  function wordMatches(qw, textWords) {
    const maxDist = qw.length >= 6 ? 2 : qw.length >= 4 ? 1 : 0;
    return textWords.some(tw =>
      tw.startsWith(qw) || qw.startsWith(tw) || editDist(qw, tw) <= maxDist
    );
  }

  function matchesQuery(entry, normQ, qWords) {
    if (_mode === 'exact') return entry.searchText.includes(normQ);
    // Short words (≤ 2 chars) like "de", "la", "le" are connectors — skip as required
    const required = qWords.filter(w => w.length >= 3);
    if (!required.length) return qWords.some(w => wordMatches(w, entry.words));
    return required.every(qw => wordMatches(qw, entry.words));
  }

  // ── Chapter metadata map (chapterId → meta) ────────────────────────────────
  function _getChMeta() {
    const map = {};
    for (const pack of SUBJECT_PACKS) {
      for (const ch of (pack._chapters || [])) {
        map[ch.id] = {
          chapterName:  ch.name,
          subjectName:  pack.name,
          grade:        pack.grade,
          packId:       pack.id,
          subjectIcon:  pack.icon,
          noDifficulty: !!pack.noDifficulty,
        };
      }
    }
    return map;
  }

  // ── Build question index (lazy) ────────────────────────────────────────────
  // Rebuilt whenever the bank has grown. QuestionLoader no longer waits for all
  // five subjects before the app becomes usable - it loads the active one and
  // streams the rest in behind it - so an index built the moment Search first
  // opened could be missing four subjects, and caching it unconditionally meant
  // those questions stayed unsearchable for the whole session.
  let _qIndexSize = -1;
  function buildQIndex() {
    if (_qIndex && _qIndexSize === STATIC_QUESTIONS.length) return _qIndex;
    _qIndexSize = STATIC_QUESTIONS.length;
    const chMeta = _getChMeta();
    _qIndex = STATIC_QUESTIONS
      .filter(q => q && q.question && q.chapterId)
      .map(q => {
        const meta       = chMeta[q.chapterId] || {};
        const rawText    = [q.question, ...(q.options || []), q.answer || '', q.hint || '', q.explanation || ''].join(' ').replace(/<[^>]*>/g, ' ');
        const searchText = norm(rawText);
        return { q, meta, searchText, words: searchText.split(' ').filter(Boolean) };
      })
      .filter(e => e.meta.grade);
    return _qIndex;
  }

  // ── Build chapter/syllabus index (lazy) ────────────────────────────────────
  function buildChIndex() {
    if (_chIndex) return _chIndex;
    _chIndex = [];
    for (const pack of SUBJECT_PACKS) {
      for (const ch of (pack._chapters || [])) {
        const raw        = [ch.name, ch.syllabus || '', ch.enrichmentNote || ''].join(' ');
        const searchText = norm(raw);
        _chIndex.push({
          chapterId:    ch.id,
          chapterName:  ch.name,
          subjectName:  pack.name,
          grade:        pack.grade,
          packId:       pack.id,
          subjectIcon:  pack.icon,
          noDifficulty: !!pack.noDifficulty,
          enrichment:   !!ch.enrichment,
          searchText,
          words: searchText.split(' ').filter(Boolean),
        });
      }
    }
    return _chIndex;
  }

  // ── Build autocomplete suggestion list (lazy) ──────────────────────────────
  function buildSuggestions() {
    if (_suggestions) return _suggestions;
    const terms = new Set();

    for (const pack of SUBJECT_PACKS) {
      for (const ch of (pack._chapters || [])) {
        // Chapter name as a suggestion
        terms.add(norm(ch.name));

        const text = (ch.syllabus || '') + ' ' + (ch.enrichmentNote || '');

        // Proper nouns: sequences starting with a capital letter (names, places, events)
        const proper = text.match(/\b[A-Z][a-zA-Zàâäéèêëîïôùûüç''-]{2,}(?:\s+[A-Z][a-zA-Zàâäéèêëîïôùûüç''-]{1,}){0,3}/g) || [];
        for (const p of proper) {
          const n = norm(p);
          if (n.length > 3 && !n.match(/^(the|and|for|with|from|into|that|this|they|their|have|more|also|such|over|very|when|than|after|before)$/)) {
            terms.add(n);
          }
        }

        // Parenthetical terms like "(Dodo, Pink Pigeon, giant tortoise)"
        const parens = text.match(/\(([^)]{3,60})\)/g) || [];
        for (const p of parens) {
          const inner = p.slice(1, -1);
          for (const part of inner.split(/[,;]/)) {
            const n = norm(part.trim());
            if (n.length > 3 && n.split(' ').length <= 5) terms.add(n);
          }
        }
      }
    }

    _suggestions = [...terms].filter(t => t.length > 2).sort((a, b) => a.localeCompare(b));
    return _suggestions;
  }

  // ── Autocomplete ───────────────────────────────────────────────────────────
  function showSuggestions(rawVal) {
    const box = document.getElementById('search-suggestions');
    if (!box) return;
    const q = norm(rawVal).trim();
    if (q.length < 2) { hideSuggestions(); return; }

    const suggs   = buildSuggestions();
    const qWords  = q.split(' ');
    const lastW   = qWords[qWords.length - 1];

    const scored = [];
    for (const s of suggs) {
      let sc = 0;
      if (s.startsWith(q))                                          sc = 4; // full prefix
      else if (s.includes(q))                                       sc = 3; // substring
      else if (qWords.length > 1 && qWords.every(w => s.includes(w))) sc = 2; // all words
      else if (lastW.length >= 3 && s.split(' ').some(w => w.startsWith(lastW))) sc = 1; // last word prefix
      if (sc) scored.push({ s, sc });
    }
    scored.sort((a, b) => b.sc - a.sc || a.s.length - b.s.length);
    const top = scored.slice(0, 7);

    if (!top.length) { hideSuggestions(); return; }

    _activeSugg = -1;
    box.innerHTML = top.map((item, i) =>
      `<div class="sugg-item px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200
          hover:bg-indigo-50 dark:hover:bg-indigo-900/30 cursor-pointer transition-colors select-none"
          data-idx="${i}" data-val="${_esc(item.s)}"
          onmousedown="event.preventDefault()"
          onclick="Search.selectSuggestion(this.dataset.val)"
          onmouseenter="Search._hoverSugg(${i})">
        <span class="text-gray-500 dark:text-gray-400 mr-2 text-xs">🔍</span>${_esc(item.s)}
      </div>`
    ).join('');
    box.classList.remove('hidden');
  }

  function hideSuggestions() {
    const box = document.getElementById('search-suggestions');
    if (box) box.classList.add('hidden');
    _activeSugg = -1;
  }

  function selectSuggestion(val) {
    const inp = document.getElementById('search-input');
    if (inp) { inp.value = val; inp.focus(); }
    hideSuggestions();
    run();
  }

  function _hoverSugg(idx) { _activeSugg = idx; _highlightSugg(); }

  function _highlightSugg() {
    document.querySelectorAll('#search-suggestions .sugg-item').forEach((el, i) => {
      el.classList.toggle('bg-indigo-50',        i === _activeSugg);
      el.classList.toggle('dark:bg-indigo-900/30', i === _activeSugg);
    });
  }

  // Keyboard navigation inside suggestions
  function handleKey(e) {
    const box = document.getElementById('search-suggestions');
    if (!box || box.classList.contains('hidden')) return;
    const items = box.querySelectorAll('.sugg-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      _activeSugg = Math.min(_activeSugg + 1, items.length - 1);
      _highlightSugg();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      _activeSugg = Math.max(_activeSugg - 1, -1);
      _highlightSugg();
    } else if (e.key === 'Enter' && _activeSugg >= 0) {
      e.preventDefault();
      const val = items[_activeSugg]?.dataset?.val;
      if (val) selectSuggestion(val);
    } else if (e.key === 'Escape') {
      hideSuggestions();
    }
  }

  // ── HTML helpers ───────────────────────────────────────────────────────────
  function _esc(s) {
    return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Strip HTML tags so question text with <b>, <br> etc. shows as plain text
  function _plain(s) {
    return (s || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function _highlight(text) {
    const inp    = document.getElementById('search-input');
    const qWords = norm(inp?.value || '').split(' ').filter(w => w.length >= 2);
    let out = _esc(_plain(text));
    for (const w of qWords) {
      const re = new RegExp(`(${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      out = out.replace(re, '<mark class="bg-yellow-200 dark:bg-yellow-700/60 rounded px-0.5">$1</mark>');
    }
    return out;
  }

  // ── Fill subject filter (once) ─────────────────────────────────────────────
  function _fillSubjectFilter() {
    const sel = document.getElementById('search-subject-filter');
    if (!sel || sel.dataset.filled) return;
    // comingSoon packs have no questions in the index, so an optgroup for one
    // would be a filter that always returns nothing.
    const livePacks = SUBJECT_PACKS.filter(p => !p.comingSoon);
    const grades = [...new Set(livePacks.map(p => p.grade))].sort();
    for (const g of grades) {
      const grp = document.createElement('optgroup');
      grp.label = `Grade ${g}`;
      livePacks.filter(p => p.grade === g).forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `${p.icon} ${p.name}`;
        grp.appendChild(opt);
      });
      sel.appendChild(grp);
    }
    sel.dataset.filled = '1';
  }

  // ── Render question cards ──────────────────────────────────────────────────
  function _renderQCards(entries, isPreview) {
    const DIFF = ['', '⭐', '⭐⭐', '⭐⭐⭐', '🏆'];
    let html = '<div class="space-y-2">';
    for (const e of entries.slice(0, 10)) {
      const diff = (!e.meta.noDifficulty && e.q.difficulty) ? (DIFF[e.q.difficulty] || '') : '';
      html += `<div class="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 ${isPreview ? 'opacity-60' : ''}">
        <div class="flex items-start gap-2">
          <span class="text-lg select-none">${_esc(e.meta.subjectIcon || '📚')}</span>
          <div class="flex-1 min-w-0">
            <div class="text-[11px] text-gray-500 dark:text-gray-400 mb-0.5">${_esc(e.meta.subjectName)} &middot; ${_esc(e.meta.chapterName)} ${diff}</div>
            <div class="text-sm text-gray-700 dark:text-gray-200 leading-snug line-clamp-2">${_highlight(e.q.question)}</div>
          </div>
        </div>
      </div>`;
    }
    if (entries.length > 10) html += `<div class="text-xs text-gray-500 dark:text-gray-400 text-center py-1">... and ${entries.length - 10} more</div>`;
    html += '</div>';
    return html;
  }

  // ── Render chapter / syllabus match cards ──────────────────────────────────
  function _renderChCards(chs, isPreview) {
    let html = '<div class="space-y-2">';
    for (const ch of chs) {
      const qCount = STATIC_QUESTIONS.filter(q => q.chapterId === ch.chapterId).length;
      const opacity = isPreview ? 'opacity-60' : '';
      html += `<div class="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700/40 rounded-xl p-3 ${opacity} ${isPreview ? '' : 'cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors'}"
        ${isPreview ? '' : `onclick="Search.practiceChapter('${ch.packId}','${ch.chapterId}')"`}>
        <div class="flex items-start gap-2">
          <span class="text-lg select-none">${_esc(ch.subjectIcon || '📚')}</span>
          <div class="flex-1 min-w-0">
            <div class="text-[11px] text-indigo-500 dark:text-indigo-400 mb-0.5 font-semibold uppercase tracking-wide">${_esc(ch.subjectName)} &middot; Syllabus topic</div>
            <div class="text-sm font-semibold text-gray-800 dark:text-white leading-snug">${_highlight(ch.chapterName)}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">${qCount} question${qCount !== 1 ? 's' : ''} in this chapter${isPreview ? '' : ' &middot; Tap to practise'}</div>
          </div>
          ${isPreview ? '' : '<span class="text-indigo-400 text-sm shrink-0">▶</span>'}
        </div>
      </div>`;
    }
    html += '</div>';
    return html;
  }

  // ── Main search ────────────────────────────────────────────────────────────
  function run() {
    hideSuggestions();
    const inp        = document.getElementById('search-input');
    const rawQ       = inp?.value?.trim() || '';
    const statusEl   = document.getElementById('search-status');
    const resultsEl  = document.getElementById('search-results');
    const subjFilter = document.getElementById('search-subject-filter')?.value || '';

    if (rawQ.length < 2) {
      if (resultsEl) resultsEl.innerHTML = `<div class="text-center py-16 text-gray-500 dark:text-gray-400 select-none">
        <div class="text-5xl mb-3">🔍</div>
        <p class="text-sm">Type at least 2 characters to search.</p>
        <p class="text-xs mt-1">Try a topic, a name, or a keyword from your syllabus.</p>
      </div>`;
      if (statusEl) statusEl.classList.add('hidden');
      return;
    }

    const normQ  = norm(rawQ);
    const qWords = normQ.split(' ').filter(w => w.length >= 2);
    if (!qWords.length) return;

    const studentGrade       = (typeof SELECTED_GRADE !== 'undefined' && SELECTED_GRADE) || 5;
    const restr              = typeof DB !== 'undefined' ? (DB.restrictions || {}) : {};
    const allowCrossSearch   = !!restr.crossGradeSearch;
    const allowCrossPractice = !!restr.crossGradePractice;

    // Question matches
    let qPool    = subjFilter ? buildQIndex().filter(e => e.meta.packId === subjFilter) : buildQIndex();
    const qAll   = qPool.filter(e => matchesQuery(e, normQ, qWords));
    const qOwn   = qAll.filter(e => e.meta.grade === studentGrade);
    const qOther = qAll.filter(e => e.meta.grade !== studentGrade);

    // Chapter/syllabus matches - exclude chapters already surfaced by question results
    let chPool    = subjFilter ? buildChIndex().filter(c => c.packId === subjFilter) : buildChIndex();
    const chAll   = chPool.filter(c => matchesQuery(c, normQ, qWords));
    const ownQChs = new Set(qOwn.map(e => e.q.chapterId));
    const syllOwn   = chAll.filter(c => c.grade === studentGrade && !ownQChs.has(c.chapterId));
    const syllOther = chAll.filter(c => c.grade !== studentGrade);

    const totalOwn   = qOwn.length + syllOwn.length;
    const totalOther = qOther.length + syllOther.length;

    if (statusEl) {
      statusEl.textContent = (totalOwn + totalOther)
        ? `${totalOwn} result${totalOwn !== 1 ? 's' : ''} in your grade, ${totalOther} in other grades.`
        : `No results. ${_mode === 'exact' ? 'Try "Similar" mode to catch typos.' : 'Check spelling or try a different keyword.'}`;
      statusEl.classList.remove('hidden');
    }

    if (!resultsEl) return;
    let html = '';

    // ── Own grade ──────────────────────────────────────────────────────────
    if (totalOwn > 0) {
      html += `<div class="mb-5">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">Grade ${studentGrade} - Your Grade</span>
          <span class="chip green text-xs">${totalOwn} match${totalOwn !== 1 ? 'es' : ''}</span>
        </div>`;

      if (syllOwn.length) {
        html += `<div class="mb-3">
          <div class="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-2">Syllabus Topics</div>
          ${_renderChCards(syllOwn, false)}
        </div>`;
      }

      if (qOwn.length) {
        html += `<div class="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-2">Questions (${qOwn.length})</div>
          ${_renderQCards(qOwn, false)}
          <button onclick="Search.practiceOwn(${JSON.stringify(qOwn.map(e => e.q.id))})"
            class="btn-primary w-full mt-3 text-sm">
            ▶ Practise ${qOwn.length} matched question${qOwn.length !== 1 ? 's' : ''}
          </button>`;
      }
      html += '</div>';

    } else if (totalOther > 0) {
      html += `<div class="mb-4 text-center py-6 bg-gray-50 dark:bg-gray-800/40 rounded-2xl">
        <p class="text-sm text-gray-500 dark:text-gray-400">No matches in your grade (Grade ${studentGrade}).</p>
      </div>`;

    } else {
      html += `<div class="text-center py-16">
        <div class="text-5xl mb-3">😕</div>
        <p class="text-sm text-gray-500 dark:text-gray-400">No questions found for "${_esc(rawQ)}".</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${_mode === 'exact'
          ? 'Switch to "Similar" mode to find questions with similar words.'
          : 'Try different keywords or check spelling.'}</p>
      </div>`;
    }

    // ── Other grades ───────────────────────────────────────────────────────
    if (totalOther > 0) {
      if (!allowCrossSearch) {
        html += `<div class="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-2xl text-center">
          <p class="text-sm text-amber-700 dark:text-amber-400">🔒 ${totalOther} more result${totalOther !== 1 ? 's' : ''} found in other grades.</p>
          <p class="text-xs text-amber-600 dark:text-amber-500 mt-1">Ask a parent to enable cross-grade search in Parent Controls.</p>
        </div>`;
      } else {
        const otherGrades = [...new Set([
          ...qOther.map(e => e.meta.grade),
          ...syllOther.map(c => c.grade),
        ])].sort();

        for (const g of otherGrades) {
          const gQs  = qOther.filter(e => e.meta.grade === g);
          const gChs = syllOther.filter(c => c.grade === g);
          const ids  = gQs.map(e => e.q.id);
          html += `<div class="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Grade ${g}</span>
              <span class="chip gray text-xs">Preview</span>
              <span class="chip amber text-xs">${gQs.length + gChs.length} match${(gQs.length + gChs.length) !== 1 ? 'es' : ''}</span>
            </div>
            ${gChs.length ? _renderChCards(gChs, true) : ''}
            ${gQs.length  ? `<div class="mt-2">${_renderQCards(gQs, true)}</div>` : ''}
            ${gQs.length && allowCrossPractice
              ? `<button onclick="Search.practiceOther(${JSON.stringify(ids)},'Grade ${g}')"
                  class="w-full mt-2 py-2 text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors">
                  ▶ Revise Grade ${g} questions
                </button>`
              : gQs.length
                ? `<p class="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">🔒 Cross-grade practice is off - ask a parent to enable it.</p>`
                : ''}
          </div>`;
        }
      }
    }

    resultsEl.innerHTML = html;
  }

  // ── Practice launchers ─────────────────────────────────────────────────────
  function practiceOwn(ids) {
    startSearchPractice(STATIC_QUESTIONS.filter(q => ids.includes(q.id)), 'Search Results');
  }

  function practiceOther(ids, label) {
    startSearchPractice(STATIC_QUESTIONS.filter(q => ids.includes(q.id)), `Revision - ${label}`);
  }

  function practiceChapter(packId, chapterId) {
    const pack = activateSubjectPack(packId);
    if (!pack) { toast('Chapter not available.', 2000); return; }
    const go = () => startChapterDirect(chapterId, null);
    if (typeof QuestionLoader !== 'undefined') QuestionLoader.loadSubject(pack.id).then(go).catch(go);
    else go();
  }

  // ── Mode / filter UI ──────────────────────────────────────────────────────
  function setMode(mode) {
    _mode = mode;
    const on  = 'flex-1 py-1.5 text-xs rounded-lg transition-all bg-white dark:bg-gray-600 shadow-sm text-gray-800 dark:text-white font-semibold px-3';
    const off = 'flex-1 py-1.5 text-xs rounded-lg transition-all text-gray-500 dark:text-gray-400 px-3';
    const exact = document.getElementById('filter-exact');
    const fuzzy = document.getElementById('filter-fuzzy');
    if (exact) exact.className = mode === 'exact' ? on : off;
    if (fuzzy) fuzzy.className = mode === 'fuzzy' ? on : off;
    run();
  }

  function clearInput() {
    const inp = document.getElementById('search-input');
    if (inp) { inp.value = ''; inp.focus(); }
    hideSuggestions();
    run();
  }

  // ── Open / close ──────────────────────────────────────────────────────────
  function open() {
    _prevScreen = (typeof S !== 'undefined' && S.currentScreen) ? S.currentScreen : 'dashboard';
    _fillSubjectFilter();
    showScreen('search');
    setTimeout(() => { const inp = document.getElementById('search-input'); inp?.focus(); inp && (inp.value = ''); run(); }, 120);
    setMode('fuzzy');
  }

  function close() {
    hideSuggestions();
    showScreen(_prevScreen || 'dashboard');
  }

  return {
    open, close, run, setMode, clearInput,
    practiceOwn, practiceOther, practiceChapter,
    showSuggestions, hideSuggestions, selectSuggestion,
    handleKey, _hoverSugg,
  };
})();
