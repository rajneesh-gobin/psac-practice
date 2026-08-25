'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice - Question Search Engine
//  Searches STATIC_QUESTIONS across all loaded subject packs.
//  Supports exact substring match and fuzzy word-level matching.
// ══════════════════════════════════════════════

const Search = (() => {
  let _index    = null;
  let _mode     = 'fuzzy'; // 'exact' | 'fuzzy'
  let _prevScreen = 'dashboard';

  // ── Text normalisation (lowercase, strip accents & punctuation) ────────────
  function norm(str) {
    return (str || '').toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9 ]/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }

  // ── Levenshtein edit distance (caps at 3 for speed) ───────────────────────
  function editDist(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    if (Math.abs(a.length - b.length) > 3) return 99;
    const row = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      let prev = i;
      for (let j = 1; j <= b.length; j++) {
        const val = a[i - 1] === b[j - 1] ? row[j - 1] : 1 + Math.min(prev, row[j], row[j - 1]);
        row[j - 1] = prev;
        prev = val;
      }
      row[b.length] = prev;
    }
    return row[b.length];
  }

  // ── Check if a single query word matches any word in the text ─────────────
  // Allows 1 typo for words >= 5 chars, 0 typos for shorter words but allows prefix match
  function wordMatches(qw, textWords) {
    const maxDist = qw.length >= 6 ? 2 : qw.length >= 4 ? 1 : 0;
    return textWords.some(tw => tw.startsWith(qw) || qw.startsWith(tw) || editDist(qw, tw) <= maxDist);
  }

  // ── Build search index once (lazily) ──────────────────────────────────────
  function buildIndex() {
    if (_index) return _index;
    const chMeta = {};
    for (const pack of SUBJECT_PACKS) {
      for (const ch of (pack._chapters || [])) {
        chMeta[ch.id] = {
          chapterName:  ch.name,
          subjectName:  pack.name,
          grade:        pack.grade,
          packId:       pack.id,
          subjectIcon:  pack.icon,
          noDifficulty: !!pack.noDifficulty,
        };
      }
    }
    _index = STATIC_QUESTIONS
      .filter(q => q && q.question && q.chapterId)
      .map(q => {
        const meta       = chMeta[q.chapterId] || {};
        const rawText    = [q.question, ...(q.options || []), q.answer || ''].join(' ');
        const searchText = norm(rawText);
        return { q, meta, searchText, words: searchText.split(' ').filter(Boolean) };
      })
      .filter(e => e.meta.grade);
    return _index;
  }

  // ── Score a single index entry against a normalised query ─────────────────
  function matches(entry, normQ, qWords) {
    if (_mode === 'exact') return entry.searchText.includes(normQ);
    return qWords.every(qw => wordMatches(qw, entry.words));
  }

  // ── Fill subject filter select (once) ─────────────────────────────────────
  function _fillSubjectFilter() {
    const sel = document.getElementById('search-subject-filter');
    if (!sel || sel.dataset.filled) return;
    const grades = [...new Set(SUBJECT_PACKS.map(p => p.grade))].sort();
    for (const g of grades) {
      const grp = document.createElement('optgroup');
      grp.label = `Grade ${g}`;
      SUBJECT_PACKS.filter(p => p.grade === g).forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `${p.icon} ${p.name}`;
        grp.appendChild(opt);
      });
      sel.appendChild(grp);
    }
    sel.dataset.filled = '1';
  }

  // ── HTML escape helper ────────────────────────────────────────────────────
  function _esc(s) {
    return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ── Highlight query words in question text ────────────────────────────────
  function _highlight(text) {
    const inp = document.getElementById('search-input');
    const qWords = norm(inp?.value || '').split(' ').filter(w => w.length >= 2);
    let out = _esc(text);
    for (const w of qWords) {
      const re = new RegExp(`(${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      out = out.replace(re, '<mark class="bg-yellow-200 dark:bg-yellow-700/60 rounded px-0.5">$1</mark>');
    }
    return out;
  }

  // ── Render a list of result cards ─────────────────────────────────────────
  function _renderCards(entries, isPreview) {
    const shown   = entries.slice(0, 10);
    const opacity = isPreview ? 'opacity-60' : '';
    const DIFF    = ['', '⭐', '⭐⭐', '⭐⭐⭐', '🏆'];
    let html = '<div class="space-y-2">';
    for (const e of shown) {
      const diff = (!e.meta.noDifficulty && e.q.difficulty) ? DIFF[e.q.difficulty] || '' : '';
      html += `<div class="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 ${opacity}">
        <div class="flex items-start gap-2">
          <span class="text-lg select-none">${_esc(e.meta.subjectIcon || '📚')}</span>
          <div class="flex-1 min-w-0">
            <div class="text-[11px] text-gray-400 dark:text-gray-500 mb-0.5">${_esc(e.meta.subjectName)} &middot; ${_esc(e.meta.chapterName)} ${diff}</div>
            <div class="text-sm text-gray-700 dark:text-gray-200 leading-snug line-clamp-2">${_highlight(e.q.question)}</div>
          </div>
        </div>
      </div>`;
    }
    if (entries.length > 10) {
      html += `<div class="text-xs text-gray-400 dark:text-gray-500 text-center py-1">... and ${entries.length - 10} more</div>`;
    }
    html += '</div>';
    return html;
  }

  // ── Main search function ───────────────────────────────────────────────────
  function run() {
    const inp        = document.getElementById('search-input');
    const rawQ       = inp?.value?.trim() || '';
    const statusEl   = document.getElementById('search-status');
    const resultsEl  = document.getElementById('search-results');
    const subjFilter = document.getElementById('search-subject-filter')?.value || '';

    if (rawQ.length < 2) {
      if (resultsEl) resultsEl.innerHTML = `<div class="text-center py-16 text-gray-400 dark:text-gray-500 select-none">
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

    const index = buildIndex();

    // Student's grade from current DB state
    const studentGrade = typeof DB !== 'undefined' ? (DB.grade || 5) : 5;
    const restr = typeof DB !== 'undefined' ? (DB.restrictions || {}) : {};
    const allowCrossSearch   = !!restr.crossGradeSearch;
    const allowCrossPractice = !!restr.crossGradePractice;

    let pool = subjFilter ? index.filter(e => e.meta.packId === subjFilter) : index;
    const matched = pool.filter(e => matches(e, normQ, qWords));

    const own   = matched.filter(e => e.meta.grade === studentGrade);
    const other = matched.filter(e => e.meta.grade !== studentGrade);

    if (statusEl) {
      statusEl.textContent = matched.length
        ? `Found ${matched.length} question${matched.length !== 1 ? 's' : ''} - ${own.length} in your grade, ${other.length} in other grades.`
        : `No results. ${_mode === 'exact' ? 'Try "Similar" mode to catch typos.' : 'Check spelling or try a different topic.'}`;
      statusEl.classList.remove('hidden');
    }

    if (!resultsEl) return;

    let html = '';

    // ── Own-grade results ──────────────────────────────────────────────────
    if (own.length) {
      html += `<div class="mb-5">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">Grade ${studentGrade} - Your Grade</span>
          <span class="chip green text-xs">${own.length} match${own.length !== 1 ? 'es' : ''}</span>
        </div>
        ${_renderCards(own, false)}
        <button onclick="Search.practiceOwn(${JSON.stringify(own.map(e => e.q.id))})"
          class="btn-primary w-full mt-3 text-sm">
          ▶ Practise ${own.length} matched question${own.length !== 1 ? 's' : ''}
        </button>
      </div>`;
    } else if (matched.length) {
      html += `<div class="mb-5 text-center py-8 bg-gray-50 dark:bg-gray-800/40 rounded-2xl">
        <p class="text-sm text-gray-400 dark:text-gray-500">No matches in your grade (Grade ${studentGrade}).</p>
      </div>`;
    } else {
      html += `<div class="text-center py-16">
        <div class="text-5xl mb-3">😕</div>
        <p class="text-sm text-gray-500 dark:text-gray-400">No questions found for "${_esc(rawQ)}".</p>
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">${_mode === 'exact' ? 'Switch to "Similar" mode to find questions with similar words.' : 'Try different keywords or check spelling.'}</p>
      </div>`;
    }

    // ── Other-grade results ────────────────────────────────────────────────
    if (other.length) {
      if (!allowCrossSearch) {
        html += `<div class="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-2xl text-center">
          <p class="text-sm text-amber-700 dark:text-amber-400">🔒 ${other.length} more result${other.length !== 1 ? 's' : ''} found in other grades.</p>
          <p class="text-xs text-amber-600 dark:text-amber-500 mt-1">Ask a parent to enable cross-grade search in Parent Controls.</p>
        </div>`;
      } else {
        // Group by grade
        const byGrade = {};
        for (const e of other) {
          if (!byGrade[e.meta.grade]) byGrade[e.meta.grade] = [];
          byGrade[e.meta.grade].push(e);
        }
        for (const [g, items] of Object.entries(byGrade).sort((a, b) => a[0] - b[0])) {
          const ids = items.map(e => e.q.id);
          html += `<div class="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Grade ${g}</span>
              <span class="chip gray text-xs">Preview</span>
              <span class="chip amber text-xs">${items.length} match${items.length !== 1 ? 'es' : ''}</span>
            </div>
            ${_renderCards(items, true)}
            ${allowCrossPractice
              ? `<button onclick="Search.practiceOther(${JSON.stringify(ids)},'Grade ${g}')"
                  class="w-full mt-2 py-2 text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors">
                  ▶ Revise Grade ${g} questions
                </button>`
              : `<p class="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">🔒 Cross-grade practice is off - ask a parent to enable it.</p>`
            }
          </div>`;
        }
      }
    }

    resultsEl.innerHTML = html;
  }

  // ── Practice matched questions ─────────────────────────────────────────────
  function practiceOwn(ids) {
    const qs = STATIC_QUESTIONS.filter(q => ids.includes(q.id));
    startSearchPractice(qs, 'Search Results');
  }

  function practiceOther(ids, label) {
    const qs = STATIC_QUESTIONS.filter(q => ids.includes(q.id));
    startSearchPractice(qs, `Revision - ${label}`);
  }

  // ── Filter / mode controls ─────────────────────────────────────────────────
  function setMode(mode) {
    _mode = mode;
    const exact = document.getElementById('filter-exact');
    const fuzzy = document.getElementById('filter-fuzzy');
    const activeClass  = 'bg-white dark:bg-gray-600 shadow-sm text-gray-800 dark:text-white font-semibold';
    const inactiveClass = 'text-gray-500 dark:text-gray-400';
    if (exact) { exact.className = `flex-1 py-1.5 text-xs rounded-lg transition-all ${mode === 'exact' ? activeClass : inactiveClass}`; }
    if (fuzzy) { fuzzy.className = `flex-1 py-1.5 text-xs rounded-lg transition-all ${mode === 'fuzzy' ? activeClass : inactiveClass}`; }
    run();
  }

  function clearInput() {
    const inp = document.getElementById('search-input');
    if (inp) { inp.value = ''; inp.focus(); }
    run();
  }

  // ── Open / close ───────────────────────────────────────────────────────────
  function open() {
    _prevScreen = (typeof S !== 'undefined' && S.currentScreen) ? S.currentScreen : 'dashboard';
    _fillSubjectFilter();
    showScreen('search');
    setTimeout(() => document.getElementById('search-input')?.focus(), 120);
    setMode('fuzzy');
    // Clear previous results
    const inp = document.getElementById('search-input');
    if (inp) inp.value = '';
    run();
  }

  function close() {
    showScreen(_prevScreen || 'dashboard');
  }

  return { open, close, run, setMode, clearInput, practiceOwn, practiceOther };
})();
