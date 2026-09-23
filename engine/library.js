'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Our Library — the public shelf of past papers and worksheets.
//
//  Reads `library_sections` (the shelves) and `library_documents` (the books)
//  straight from PostgREST. RLS is the gate: a signed-out parent sees exactly
//  the published rows and nothing else, which is why this file carries no
//  filtering of its own beyond what it draws.
//
//  ⚠ THE BYTES ARE NOT HERE. A seed document is a STATIC asset served by
//    Cloudflare at /library/<filename>, free and unmetered. Community uploads
//    will live in Supabase behind a signed URL. `storage` on the row says
//    which, and _hrefFor() is the only place that decides — so the shelf never
//    needs to know where a file physically is.
//
//  ⚠ COVERS ARE DRAWN, NOT PHOTOGRAPHED. A page-1 thumbnail of a scanned exam
//    paper is a grey smudge at 120px, costs an extra fetch per card and can
//    404. An inline SVG built from the document's own metadata is legible at
//    any size, always loads, and makes a shelf of 600 papers look deliberate.
//
//  ⚠ NO `transform` ON AN ANCESTOR OF A FIXED ELEMENT. Card tilt and the
//    open-book animation live on the CARD only. A transformed .screen / main /
//    body becomes the containing block for every position:fixed descendant —
//    the bug this project has already been bitten by once.
// ══════════════════════════════════════════════════════════════════════════

const Library = (() => {
  let _sections = null;      // [{ id, slug, name, icon, grade, children: [...] }]
  let _docsBySection = null; // Map(section_id -> [doc])
  let _loading = false;
  let _error = '';
  // ⚠ Module-level UI state is reset in the RENDER, never in the toggle — the
  //   rule the rest of this codebase follows for exactly this shape of bug.
  let _openShelf = null;
  // ⚠ WHERE THE SHELF IS PAINTED. It is a full screen when opened from the
  //   header, and a TAB PANEL when opened from a board — the boards switch tabs
  //   in place and a screen jump breaks that rhythm. One module, one render,
  //   two mount points.
  // ⚠ NODES ARE NEVER MOVED between them. PD._mountPanel() moves a screen's
  //   nodes for good and would empty the other mount; each container gets its
  //   own freshly rendered markup instead.
  let _target = 'library-body';
  // ⚠ SEARCH IS ACROSS THE WHOLE LIBRARY, not the shelf you happen to be on.
  //   Browsing by grade then subject is fine for ten documents; at 657 it is the
  //   only way to find anything, and nobody knows which grade a 2019 paper was
  //   filed under.
  let _query = '';
  // Set when the shelf was opened from a subject screen: show only that pack.
  let _packFilter = null;
  // ⚠ SEARCH FINDS A KNOWN ITEM; THESE ARE FOR BROWSING. A Grade 6 Maths shelf
  //   is about forty covers in one row, and "the 2019 papers" or "just the
  //   marking reports" is not a search anyone can phrase.
  let _typeFilter = '';
  let _yearFilter = '';
  let _sort = 'year-desc';

  const _esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  // ── Where a document's bytes actually are ────────────────────────────────
  // ⚠ TWO PATHS ON PURPOSE. A seed document is a static asset Cloudflare serves
  //   free and unmetered — sending those through a Worker would spend a request
  //   per download for the 600-document bulk of the library and lose the CDN. A
  //   community upload lives in a private bucket and needs a signed URL minted
  //   per view, which is also what makes revoking one immediate: the Worker
  //   re-reads the row every time and stops signing the moment it changes.
  function _hrefFor(doc) {
    if (doc.storage === 'static') return '/library/' + doc.filename;
    return '/api/library-file?id=' + encodeURIComponent(doc.id);
  }

  const TYPE_LABEL = {
    'exam-paper': 'Past paper',
    'examiners-report': "Examiners' report",
    'specimen-paper': 'Specimen paper',
    practice: 'Practice',
    foundation: 'Foundation',
    extended: 'Extended',
    diagnostic: 'Diagnostic',
    assessment: 'Assessment',
  };

  // Stable colour per subject, so the same subject is the same colour on every
  // shelf without a hand-maintained table.
  function _hue(text) {
    let h = 0;
    for (const ch of String(text || '')) h = (h * 31 + ch.charCodeAt(0)) % 360;
    return h;
  }

  // ⚠ EVERY WORD MUST MATCH, in any order. "2019 maths" should find the 2019
  //   maths paper and not every maths paper plus everything from 2019 — an OR
  //   search over a 657-document library returns most of it.
  function _matches(doc) {
    if (!_query) return true;
    const hay = ((doc.search_text || '') + ' ' + (doc.title || '') + ' ' + (doc.subject || '')).toLowerCase();
    return _query.split(/\s+/).filter(Boolean).every(w => hay.includes(w));
  }

  // ══ The bridge back into the practice engine ══════════════════════════════
  //
  // ⚠ LINKED BY PACK, NOT BY CHAPTER, and that is a judgement not a shortcut. A
  //   past paper covers the WHOLE subject — tagging one with every chapter in
  //   the pack would put "3 papers on this topic" under every chapter of Grade 6
  //   Maths, which is true of none of them and noise on all of them. `pack_id`
  //   is the honest grain for a paper; `chapter_ids` stays empty until something
  //   is genuinely about one chapter, and a person says so.
  // ⚠ Counts come from rows ALREADY LOADED — no extra query, and it is exact
  //   because the shelf holds every published document.
  function countForPack(packId) {
    if (!packId || !_docsBySection) return 0;
    let n = 0;
    for (const list of _docsBySection.values()) for (const d of list) if (d.pack_id === packId) n++;
    return n;
  }

  // ⚠ THE CALLER HAS NOT LOADED THE LIBRARY, and must not have to. A child
  //   opening a chapter list wants chapters; making that screen fetch 657
  //   library rows to decide whether to draw one line would be a poor trade.
  //   This is a HEAD count — no rows come back, just the number.
  // ⚠ Cached per pack for the session. The answer changes only when an admin
  //   publishes something, and a stale "3 papers" is a far smaller problem than
  //   a query on every chapter-screen paint.
  const _packCounts = new Map();
  async function packCount(packId) {
    if (!packId) return 0;
    if (_packCounts.has(packId)) return _packCounts.get(packId);
    if (typeof _sb === 'undefined' || !_sb) return 0;
    try {
      const { count, error } = await _sb.from('library_documents')
        .select('id', { count: 'exact', head: true })
        .eq('pack_id', packId).eq('status', 'published').not('published_at', 'is', null);
      const n = error ? 0 : (count || 0);
      _packCounts.set(packId, n);
      return n;
    } catch (_) { return 0; }
  }

  // Draws the one-line link into a host, or leaves the host empty when there is
  // nothing to point at. ⚠ Silent when the count is zero: a "0 papers" line on
  // every chapter screen of every pack without documents is clutter that tells
  // a child nothing they can act on.
  async function mountPackLink(hostId, packId) {
    const host = document.getElementById(hostId);
    if (!host) return;
    host.innerHTML = '';
    const n = await packCount(packId);
    if (!n) return;
    host.innerHTML = `<button class="lb-packlink" onclick="Library.openForPack('${_esc(packId)}')">
      📚 <strong>${n}</strong> past paper${n === 1 ? '' : 's'} for this subject in the library
      <span aria-hidden="true">›</span></button>`;
  }

  // Open the library showing only that subject's documents.
  //
  // ⚠ FILTERED BY pack_id, NOT BY A SEARCH STRING. The first version built a
  //   query out of the document's own subject and grade, which fails twice: the
  //   library has not loaded yet when a chapter screen calls this, so there is
  //   no document to read them from; and the pack suffix and the shelf slug are
  //   different words anyway — pack `grade6-maths` against subject
  //   `mathematics` would have matched nothing.
  function openForPack(packId) {
    _packFilter = packId || null;
    _query = '';
    open();
  }

  function clearPackFilter() { _packFilter = null; render(); }

  function search(value) {
    _query = String(value || '').trim().toLowerCase();
    // ⚠ Searching means searching the LIBRARY. Leaving a pack filter on would
    //   silently restrict the results to one subject while the box says nothing
    //   about it, and "no results" would be a lie.
    if (_query) _packFilter = null;
    render();
  }

  function _sizeLabel(bytes) {
    if (!bytes) return '';
    const mb = bytes / 1048576;
    return mb >= 1 ? mb.toFixed(1) + ' MB' : Math.max(1, Math.round(bytes / 1024)) + ' KB';
  }

  // ── The cover ────────────────────────────────────────────────────────────
  // ⚠ EVERY GRADIENT ID IS UNIQUE PER RENDER. <defs> ids are document-wide, so
  //   thirty covers all carrying id="g" would every one of them paint with the
  //   first card's gradient. This project has measured that exact failure on
  //   the certificates screen; the same trap, one screen over.
  let _idSeq = 0;
  // ⚠ `label` is the SHELF'S display name, not doc.subject. The row stores a
  //   slug — rendering it raw put "arabic" and "history-geography" on the cover
  //   in lower case while the heading two lines above said "Arabic". The shelf
  //   already knows the human name; pass it down rather than title-casing a
  //   slug badly in a second place.
  function _cover(doc, label) {
    const hue = _hue(doc.subject || doc.title);
    const gid = `lbcov${++_idSeq}`;
    const year = doc.year ? String(doc.year) : '';
    const typeLabel = TYPE_LABEL[doc.doc_type] || '';
    // Short words only — a cover is read at a glance, not studied.
    const subject = _esc(String(label || doc.subject || '').slice(0, 16));
    return `<svg class="lb-cover" viewBox="0 0 120 160" role="img"
      aria-label="${_esc(doc.title)}" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="hsl(${hue} 62% 46%)"/>
          <stop offset="1" stop-color="hsl(${(hue + 28) % 360} 58% 32%)"/>
        </linearGradient>
      </defs>
      <rect width="120" height="160" rx="6" fill="url(#${gid})"/>
      <rect x="0" y="0" width="7" height="160" fill="rgba(0,0,0,.22)"/>
      <text x="62" y="34" text-anchor="middle" fill="rgba(255,255,255,.82)"
        font-size="10" font-family="system-ui, sans-serif" letter-spacing=".6">${_esc(typeLabel.toUpperCase())}</text>
      <text x="62" y="86" text-anchor="middle" fill="#fff"
        font-size="26" font-weight="bold" font-family="system-ui, sans-serif">${year}</text>
      <text x="62" y="112" text-anchor="middle" fill="rgba(255,255,255,.92)"
        font-size="11" font-family="system-ui, sans-serif">${subject}</text>
      <rect x="22" y="128" width="76" height="2" rx="1" fill="rgba(255,255,255,.35)"/>
    </svg>`;
  }

  function _card(doc, label) {
    const href = _hrefFor(doc);
    const meta = [doc.pages ? doc.pages + ' pages' : '', _sizeLabel(doc.bytes)].filter(Boolean).join(' · ');
    // ⚠ THE FORM PROMISES THIS IS “shown publicly”. It was collected, sent and
    //   stored and then displayed nowhere, so the app was quietly breaking its
    //   own word to the person who contributed the file.
    const credit = doc.credit_name ? `<span class="lb-book-credit">Shared by ${_esc(doc.credit_name)}</span>` : '';
    // ⚠ target=_blank + rel=noopener: the file opens in the device's own PDF
    //   viewer, which is the one that works offline once saved and does not
    //   need a reader shipped with the app.
    // ⚠ The report button sits OUTSIDE the <a>, not inside it. A button nested
    //   in a link is invalid HTML and, worse, a tap on it also follows the link
    //   — so the reader would open the PDF instead of reporting it.
    return `<div class="lb-book-wrap">
      <a class="lb-book" href="${_esc(href)}" target="_blank" rel="noopener"
         title="${_esc(doc.title)}">
        <span class="lb-cover-wrap">${_cover(doc, label)}</span>
        <span class="lb-book-title">${_esc(doc.title)}</span>
        <span class="lb-book-meta">${_esc(meta)}</span>
        ${credit}
      </a>
      ${canShareToClass() ? `<button class="lb-share" onclick="Library.shareToClass('${_esc(doc.id)}')"
        title="Share this with one of your classes">➕ Share to class</button>` : ''}
      <button class="lb-report" onclick="Library.report('${_esc(doc.id)}')"
        aria-label="Report a problem with ${_esc(doc.title)}"
        title="Report a problem with this document">⚑ Report</button>
    </div>`;
  }

  // ⚠ ONE PLACE APPLIES THEM, used by the shelf view AND by search results.
  //   Two copies of "which documents are showing" is how a filter ends up
  //   respected in one view and ignored in the other.
  function _applyFilters(docs) {
    let out = docs.filter(d =>
      (!_typeFilter || d.doc_type === _typeFilter) &&
      (!_yearFilter || String(d.year || '') === _yearFilter));
    const byTitle = (a, b) => String(a.title || '').localeCompare(String(b.title || ''));
    if (_sort === 'year-asc') {
      // ⚠ Undated documents (every specimen paper) sort LAST either way, not
      //   first — a year-less row at the top of a list ordered by year reads as
      //   a bug rather than as a specimen.
      out = out.slice().sort((a, b) => (a.year || 9999) - (b.year || 9999) || byTitle(a, b));
    } else if (_sort === 'title') {
      out = out.slice().sort(byTitle);
    } else {
      out = out.slice().sort((a, b) => (b.year || -1) - (a.year || -1) || byTitle(a, b));
    }
    return out;
  }

  // ⚠ Options come from the SCOPE BEFORE filtering, or choosing "2019" would
  //   remove every other year from the list and strand the reader on it.
  function _controls(scope) {
    const types = [...new Set(scope.map(d => d.doc_type).filter(Boolean))]
      .sort((a, b) => (TYPE_LABEL[a] || a).localeCompare(TYPE_LABEL[b] || b));
    const years = [...new Set(scope.map(d => d.year).filter(Boolean))].sort((a, b) => b - a);
    if (types.length < 2 && years.length < 2) return '';   // nothing to choose between
    const opt = (v, label, cur) => `<option value="${_esc(v)}" ${String(cur) === String(v) ? 'selected' : ''}>${_esc(label)}</option>`;
    return `<div class="lb-controls">
      ${types.length > 1 ? `<select class="lb-ctl" aria-label="Kind of document" onchange="Library.setType(this.value)">
        ${opt('', 'All kinds', _typeFilter)}${types.map(t => opt(t, TYPE_LABEL[t] || t, _typeFilter)).join('')}
      </select>` : ''}
      ${years.length > 1 ? `<select class="lb-ctl" aria-label="Year" onchange="Library.setYear(this.value)">
        ${opt('', 'All years', _yearFilter)}${years.map(y => opt(y, y, _yearFilter)).join('')}
      </select>` : ''}
      <select class="lb-ctl" aria-label="Order" onchange="Library.setSort(this.value)">
        ${opt('year-desc', 'Newest first', _sort)}${opt('year-asc', 'Oldest first', _sort)}${opt('title', 'A \u2013 Z', _sort)}
      </select>
    </div>`;
  }

  function setType(v) { _typeFilter = v || ''; render(); }
  function setYear(v) { _yearFilter = v || ''; render(); }
  function setSort(v) { _sort = v || 'year-desc'; render(); }

  function _shelf(section) {
    const docs = _applyFilters(_docsBySection.get(section.id) || []);
    // ⚠ A subject with nothing left after filtering disappears entirely rather
    //   than showing an empty shelf with a heading over it.
    if (!docs.length) return '';
    return `<section class="lb-shelf">
      <h4 class="lb-shelf-title">${_esc(section.name)}
        <span class="lb-count">${docs.length}</span></h4>
      <div class="lb-row">${docs.map(d => _card(d, section.name)).join('')}</div>
      <div class="lb-ledge" aria-hidden="true"></div>
    </section>`;
  }

  // ⚠ THE DISCLAIMER AND THE CONTRIBUTE BUTTON ARE RENDERED, not written into
  //   each host's markup. There are three mount points now; three copies of a
  //   legal notice is three chances for them to drift apart, and the one that
  //   matters is always the one nobody updated.
  function _chrome() {
    return `<div class="lb-search-row">
      <input id="lb-search" type="search" class="lb-search" placeholder="Search the library — try 2019 maths, or CPE"
        value="${_esc(_query)}" oninput="Library.search(this.value)" aria-label="Search the library">
    </div>
    <div class="lb-chrome">
      <button id="lb-contribute" class="lb-btn lb-btn-primary ${canContribute() ? '' : 'hidden'}"
        onclick="Library.openUpload()">⬆️ Share a document</button>
    </div>
    <div class="lb-warn" role="note">
      <span aria-hidden="true">⚠️</span>
      <p><strong>These documents were not produced by nouklass.com.</strong>
        Examination papers and reports are the work of the Mauritius Examinations
        Syndicate, the MIE and the Ministry of Education. Anything contributed by a
        parent or teacher is shared on their own responsibility. If a document should
        not be here, <a href="mailto:admin@nouklass.com?subject=Library%20takedown%20request">tell us</a>
        and we will remove it.</p>
    </div>`;
  }

  // ⚠ Paints into the CURRENT mount point, whichever that is. Callers set it
  //   through mountInto(); nothing else may assume 'library-body'.
  function render() {
    const el = document.getElementById(_target);
    if (!el) return;

    if (_loading) {
      el.innerHTML = _chrome() + '<p class="lb-note">Opening the library…</p>';
      return;
    }
    if (_error) {
      el.innerHTML = _chrome() + `<p class="lb-note lb-error">${_esc(_error)}</p>`;
      return;
    }
    if (!_sections) { load(); return; }

    const shelves = _sections.filter(s => {
      const own = (_docsBySection.get(s.id) || []).length;
      const kids = s.children.reduce((n, c) => n + (_docsBySection.get(c.id) || []).length, 0);
      return own + kids > 0;
    });

    if (!shelves.length) {
      el.innerHTML = _chrome() + '<p class="lb-note">The library is still being filled. Check back soon.</p>';
      return;
    }

    // ⚠ A DROPDOWN, NOT AN ACCORDION. One expandable panel per grade was fine
    //   at seven; it does not survive a library that grows grades, languages and
    //   non-grade shelves, because every one of them costs a row of vertical
    //   space on a phone whether or not anyone wants it. A picker shows one
    //   shelf at a time and stays one control however many there are.
    // ⚠ The chosen shelf survives a re-render (_openShelf), so reporting a
    //   document or signing in does not throw the reader back to the top.
    // ⚠ WHILE SEARCHING, THE GRADE PICKER IS THE WRONG SHAPE. A result in
    //   Grade 9 must be reachable from a Grade 4 shelf, so results are a flat
    //   list across every shelf and the picker steps aside until the box is
    //   cleared.
    if (_query || _packFilter) {
      const hits = [];
      for (const root of _sections) {
        for (const sec of [root, ...root.children]) {
          for (const d of (_docsBySection.get(sec.id) || [])) {
            if (_packFilter && d.pack_id !== _packFilter) continue;
            if (_matches(d)) hits.push({ doc: d, label: sec.name, root: root.name });
          }
        }
      }
      // ⚠ A FILTER THE READER DID NOT TYPE NEEDS A VISIBLE WAY OUT. They arrived
      //   here from a chapter screen; without this the library looks as though it
      //   contains four documents.
      const filterNote = _packFilter
        ? `<p class="lb-note lb-hits">Papers for this subject.
             <button class="lb-clearfilter" onclick="Library.clearPackFilter()">Show the whole library</button></p>`
        : '';
      const scoped = _applyFilters(hits.map(h => h.doc));
      const byId = new Map(hits.map(h => [h.doc.id, h.label]));
      const shown = scoped.map(d => ({ doc: d, label: byId.get(d.id) }));
      el.innerHTML = _chrome() + filterNote + _controls(hits.map(h => h.doc)) + (shown.length
        ? `${_query ? `<p class="lb-note lb-hits">${hits.length} result${hits.length === 1 ? '' : 's'} for “${_esc(_query)}”</p>` : ''}
           <div class="lb-row lb-row-wrap">${shown.slice(0, 120).map(h => _card(h.doc, h.label)).join('')}</div>
           ${shown.length > 120 ? '<p class="lb-note">Showing the first 120. Add another word to narrow it.</p>' : ''}`
        : (_query
          ? `<p class="lb-note">Nothing matches “${_esc(_query)}”. Try fewer words, or a year.</p>`
          : '<p class="lb-note">No papers for this subject yet.</p>'));
      _focusSearch();
      return;
    }

    const chosen = shelves.find(x => x.id === _openShelf) || shelves[0];
    _openShelf = chosen.id;
    const count = (sec) => (_docsBySection.get(sec.id) || []).length
      + sec.children.reduce((n, c) => n + (_docsBySection.get(c.id) || []).length, 0);

    const picker = `<div class="lb-pick">
      <label class="lb-pick-label" for="lb-grade-pick">Grade</label>
      <select id="lb-grade-pick" class="lb-pick-select" onchange="Library.toggle(this.value)">
        ${shelves.map(sec => `<option value="${_esc(sec.id)}" ${sec.id === chosen.id ? 'selected' : ''}>${
          _esc((sec.icon ? sec.icon + '  ' : '') + sec.name)} — ${count(sec)} document${count(sec) === 1 ? '' : 's'}</option>`).join('')}
      </select>
    </div>`;

    // The scope for the controls is everything on this shelf, unfiltered.
    const scope = [chosen, ...chosen.children]
      .flatMap(sec => _docsBySection.get(sec.id) || []);
    const body = (_shelf(chosen) + chosen.children.map(_shelf).join(''))
      || `<p class="lb-note">${(_typeFilter || _yearFilter)
          ? 'Nothing on this shelf matches those choices.'
          : 'Nothing on this shelf yet.'}</p>`;

    el.innerHTML = _chrome() + picker + _controls(scope) + `<div class="lb-grade-body">${body}</div>`;
  }

  // Named toggle() when the shelves were an accordion; it now chooses which
  // shelf the picker is showing. Kept as the one entry point so the <select>,
  // and anything else that wants to jump to a shelf, go through one path.
  // ⚠ THE BOX IS REBUILT ON EVERY KEYSTROKE, because render() replaces the whole
  //   container. Without restoring focus and the caret the field loses focus
  //   after the first character and the rest of the word goes nowhere.
  function _focusSearch() {
    const box = document.getElementById('lb-search');
    if (!box || document.activeElement === box) return;
    box.focus();
    try { box.setSelectionRange(box.value.length, box.value.length); } catch (_) {}
  }

  function toggle(id) {
    _openShelf = id || null;
    render();
  }

  async function load() {
    // ⚠ BARE IDENTIFIER, NEVER window._sb. `_sb` is a `const` at classic-script
    //   top level, so it never lands on window — the same rule this codebase
    //   records for the role modules. `window._sb` is always undefined here and
    //   the library would silently never load.
    if (_loading || typeof _sb === 'undefined' || !_sb) return;
    _loading = true; _error = '';
    render();
    try {
      const { data: sections, error: sErr } = await _sb
        .from('library_sections')
        .select('id,parent_id,slug,name,grade,icon,sort_order,pack_id,status')
        .neq('status', 'hidden')
        .order('sort_order');
      if (sErr) throw sErr;

      // ⚠ PUBLISHED **AND** published_at. status is an INTENTION an admin can
      //   set from the panel; published_at is the FACT, written by the publish
      //   script only once the file has actually been staged. Requiring both is
      //   what stops the shelf linking to a file that has not shipped yet.
      const { data: docs, error: dErr } = await _sb
        .from('library_documents')
        .select('id,section_id,filename,storage,title,doc_type,board,year,subject,grade,pages,bytes,pack_id,credit_name,source,search_text')
        .eq('status', 'published')
        .not('published_at', 'is', null)
        .order('year', { ascending: false, nullsFirst: false })
        .limit(2000);
      if (dErr) throw dErr;

      const roots = (sections || []).filter(s => !s.parent_id);
      const kids = (sections || []).filter(s => s.parent_id);
      _sections = roots.map(r => ({
        ...r,
        children: kids.filter(k => k.parent_id === r.id),
      }));

      _docsBySection = new Map();
      for (const d of docs || []) {
        if (!_docsBySection.has(d.section_id)) _docsBySection.set(d.section_id, []);
        _docsBySection.get(d.section_id).push(d);
      }
    } catch (e) {
      _error = 'The library could not be opened. ' + (e.message || e);
    }
    _loading = false;
    render();
  }

  // ⚠ open() MUST NOT RENDER. showScreen('library') already dispatches to
  //   render(), and calling both draws every shelf twice — the exact bug the
  //   certificates screen recorded.
  let _cameFrom = null;
  function open() {
    _cameFrom = (typeof S !== 'undefined' && S && S.currentScreen) || null;
    if (typeof showScreen === 'function') showScreen('library');
  }

  // ⚠⚠ NOT showScreen('dashboard'). This button was hardcoded to the child
  //   dashboard, and the library is reachable from the HEADER ON EVERY SCREEN —
  //   so a parent on their dashboard, a teacher on their board and a child
  //   halfway through a subject all got dumped on the child dashboard. Reported
  //   from the live app, not theorised.
  // ⚠ history.back() rather than a remembered screen, so this button and the
  //   DEVICE back button do the same thing. In the Play Store app Back is a
  //   gesture, and two Backs that disagree is worse than either being wrong.
  //   The app's popstate handler already replays the previous screen and
  //   corrects itself if that screen refuses the navigation.
  function back() {
    const from = _cameFrom;
    if (typeof history !== 'undefined' && history.length > 1) {
      history.back();
      // ⚠ If the library was the FIRST recorded screen there is nothing beneath
      //   it, the pop does nothing, and the reader is stranded on a screen whose
      //   Back button appears dead. Land somewhere sensible instead.
      setTimeout(() => {
        if (typeof S !== 'undefined' && S && S.currentScreen === 'library'
            && typeof showScreen === 'function') showScreen(from || 'dashboard');
      }, 180);
      return;
    }
    if (typeof showScreen === 'function') showScreen(from || 'dashboard');
  }

  // Mount the shelf in a container and paint it. The board tabs call this; so
  // does showScreen('library') for the standalone screen.
  function mountInto(id) {
    _target = id || 'library-body';
    render();
  }

  function refresh() { _sections = null; _docsBySection = null; load(); }

  // ══ Contributing a document ═══════════════════════════════════════════════
  // ⚠ ADULTS ONLY, and the check here is only about what to DRAW. The server
  //   decides who may actually submit — a child has no JWT at all, so they
  //   cannot reach the endpoint whatever this renders.
  // ⚠ The disclaimer version is sent with the form and verified server-side
  //   against the current one. A stale tab that agreed to older wording must
  //   not pass as having agreed to this.
  const DISCLAIMER_VERSION = 'library-2026-09-23';
  const DOC_TYPES = [
    ['worksheet', 'Worksheet'], ['notes', 'Notes or revision sheet'],
    ['practice', 'Practice material'], ['exam-paper', 'Past paper'],
    ['specimen-paper', 'Specimen paper'], ['examiners-report', "Examiners' report"],
  ];

  function _isAdult() {
    try {
      return typeof Auth !== 'undefined' && typeof Auth.getParentProfile === 'function'
        && !!Auth.getParentProfile();
    } catch (_) { return false; }
  }

  function canContribute() { return _isAdult(); }

  // ⚠ SUBJECT → GRADES, not grade → subjects. A subject exists once per grade
  //   and each of those is a DIFFERENT section row with its own id, so the pair
  //   the uploader picks has to resolve back to exactly one of them. This index
  //   is what makes "Mathematics" and "Grade 4" become one section id again.
  // ⚠ Only ACTIVE shelves. A locked one is visible on the shelf and closed to
  //   new documents — offering it here would produce a submission the server
  //   refuses with "not accepting new documents at the moment".
  function _shelfIndex() {
    const map = new Map();
    for (const root of (_sections || [])) {
      for (const child of root.children) {
        if (child.status !== 'active') continue;
        if (!map.has(child.slug)) map.set(child.slug, { name: child.name, grades: [] });
        map.get(child.slug).grades.push({
          id: child.id, label: root.name, sort: root.grade == null ? 99 : root.grade,
        });
      }
    }
    return map;
  }

  // Repopulates the grade list for whichever subject is chosen. The VALUE of a
  // grade option is the section id, so the form still submits exactly one id.
  function uploadSubjectChanged() {
    const subject = document.getElementById('lb-up-subject')?.value || '';
    const grades = (_shelfIndex().get(subject)?.grades || [])
      .sort((a, b) => a.sort - b.sort);
    const sel = document.getElementById('lb-up-grade');
    if (!sel) return;
    sel.innerHTML = grades.length
      ? grades.map(g => `<option value="${_esc(g.id)}">${_esc(g.label)}</option>`).join('')
      : '<option value="">No grade is open for this subject</option>';
  }

  function openUpload() {
    if (!_isAdult()) {
      if (typeof toast === 'function') toast('Sign in as a parent or teacher to share a document.', 3000);
      return;
    }
    if (!_sections) { load(); }
    const modal = document.getElementById('modal-library-upload');
    if (!modal) return;
    // ⚠ Reset in the OPEN, not the close — a modal dismissed by Escape or the
    //   backdrop never runs its own closer, and the next person would inherit
    //   the last submission.
    const f = (id) => document.getElementById(id);
    ['lb-up-title', 'lb-up-year', 'lb-up-desc', 'lb-up-credit'].forEach(id => { if (f(id)) f(id).value = ''; });
    if (f('lb-up-file')) f('lb-up-file').value = '';
    if (f('lb-up-agree')) f('lb-up-agree').checked = false;
    if (f('lb-up-status')) f('lb-up-status').textContent = '';
    f('lb-up-form')?.classList.remove('hidden');
    f('lb-up-done')?.classList.add('hidden');

    // Shelves the person can file something under: subject shelves only, since
    // a document belongs to a subject, not to a whole grade.
    const sel = f('lb-up-subject');
    if (sel) {
      const index = _shelfIndex();
      const subjects = [...index.entries()].sort((a, b) => a[1].name.localeCompare(b[1].name));
      sel.innerHTML = subjects.length
        ? subjects.map(([slug, s]) => `<option value="${_esc(slug)}">${_esc(s.name)}</option>`).join('')
        : '<option value="">No shelves are open for new documents</option>';
      uploadSubjectChanged();
    }
    const typeSel = f('lb-up-type');
    if (typeSel) typeSel.innerHTML = DOC_TYPES.map(([v, l]) => `<option value="${v}">${l}</option>`).join('');

    modal.classList.remove('hidden');
    f('lb-up-file')?.focus();
  }

  function closeUpload() {
    if (_uploading) return;
    document.getElementById('modal-library-upload')?.classList.add('hidden');
  }

  let _uploading = false;
  async function submitUpload() {
    if (_uploading) return;
    const f = (id) => document.getElementById(id);
    const status = f('lb-up-status');
    const say = (msg) => { if (status) status.textContent = msg; };

    const file = f('lb-up-file')?.files?.[0];
    const title = (f('lb-up-title')?.value || '').trim();
    // The grade option carries the section id: one subject exists once per
    // grade, and that pair is the shelf.
    const sectionId = f('lb-up-grade')?.value || '';
    const docType = f('lb-up-type')?.value || 'worksheet';
    const agreed = !!f('lb-up-agree')?.checked;

    if (!file) return say('⚠ Choose a PDF to share.');
    if (!/\.pdf$/i.test(file.name)) return say('⚠ Only PDF files can be shared.');
    // ⚠ Checked here too, so a 12 MB scan is refused before it is uploaded over
    //   mobile data. The server enforces it regardless — this is a kindness,
    //   not the control.
    if (file.size > 6 * 1024 * 1024) {
      return say(`⚠ That file is ${(file.size / 1048576).toFixed(1)} MB and the limit is 6 MB. `
        + 'Scanning in black-and-white at 200 dpi usually gets a paper well under.');
    }
    if (!title) return say('⚠ Give the document a title.');
    if (!sectionId) return say('⚠ Choose a subject and a grade.');
    if (!agreed) return say('⚠ Please tick the box to confirm you may share this document.');

    _uploading = true;
    f('lb-up-send')?.setAttribute('disabled', 'true');
    say('Uploading…');
    try {
      const { data } = await _sb.auth.getSession();
      const token = data?.session?.access_token;
      if (!token) throw new Error('Your sign-in session has expired. Refresh and sign in again.');

      const body = new FormData();
      body.append('file', file, file.name);
      body.append('title', title);
      body.append('section_id', sectionId);
      body.append('doc_type', docType);
      body.append('year', (f('lb-up-year')?.value || '').trim());
      body.append('description', (f('lb-up-desc')?.value || '').trim());
      body.append('credit_name', (f('lb-up-credit')?.value || '').trim());
      body.append('disclaimer', DISCLAIMER_VERSION);

      // ⚠ No Content-Type header: the browser sets the multipart boundary, and
      //   setting it by hand produces a body the server cannot parse.
      const res = await fetch('/api/library-submit', {
        method: 'POST', headers: { Authorization: `Bearer ${token}` }, body,
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) throw new Error(out.error || `Upload failed (${res.status}).`);

      f('lb-up-form')?.classList.add('hidden');
      f('lb-up-done')?.classList.remove('hidden');
      const d = f('lb-up-done-detail');
      if (d) d.textContent = out.message || 'Thank you — an administrator will review it.';
    } catch (e) {
      say('⚠ ' + (e.message || e));
    }
    _uploading = false;
    f('lb-up-send')?.removeAttribute('disabled');
  }

  // ══ Sharing a library document with a classroom ═══════════════════════════
  //
  // ⚠ A REFERENCE, NOT A COPY. The bytes stay in the library; the classroom row
  //   points at them. Copying would duplicate the file AND — the real problem —
  //   leave every classroom copy standing after an admin takes the document
  //   down. `library_document_id` records which document this row is.
  //
  // ⚠ IT IS WRITTEN AS source_type 'link', not 'library', and that is a
  //   deliberate limit for now. Everything downstream — the class page, the
  //   classroom screen, mark-as-done, the calendar — reads material rows
  //   through materials_library_open(), an 11.8k-character SECURITY DEFINER
  //   function that does not return the new column. Teaching every one of those
  //   to understand a third source type means rewriting that function, which is
  //   a change worth doing on its own rather than smuggled in here. As a link,
  //   the whole existing pipeline works untouched today.
  // ⚠ A takedown still propagates for COMMUNITY documents: their URL is
  //   /api/library-file?id=…, which re-reads the row on every request and stops
  //   serving the moment it is unpublished. A seed document is a static asset
  //   and stays until the next deploy — exactly as it does in the library.
  function canShareToClass() {
    return _target === 'tc-library-body' && typeof TeacherMode !== 'undefined';
  }

  let _shareDoc = null;
  async function shareToClass(id) {
    const doc = [..._docsBySection.values()].flat().find(d => d.id === id);
    if (!doc) return;
    _shareDoc = doc;
    const { data, error } = await _sb.from('classrooms')
      .select('id,name,subject,grade_level').eq('is_active', true).order('name');
    if (error) { toast('Could not load your classes: ' + error.message, 4000); return; }
    const classes = data || [];
    if (!classes.length) { toast('Make a classroom first, then share into it.', 3500); return; }
    const host = document.getElementById('lb-share-list');
    if (host) {
      host.innerHTML = classes.map(c => `<label class="flex items-center gap-2 py-1.5 cursor-pointer">
        <input type="checkbox" value="${_esc(c.id)}" class="accent-indigo-600">
        <span class="text-sm">${_esc(c.name)}${c.grade_level ? ` · Grade ${_esc(c.grade_level)}` : ''}</span>
      </label>`).join('');
    }
    const t = document.getElementById('lb-share-title');
    if (t) t.textContent = doc.title;
    document.getElementById('lb-share-status').textContent = '';
    document.getElementById('modal-library-share')?.classList.remove('hidden');
  }

  function closeShare() { document.getElementById('modal-library-share')?.classList.add('hidden'); }

  async function confirmShare() {
    const status = document.getElementById('lb-share-status');
    const say = (m) => { if (status) status.textContent = m; };
    const picked = [...document.querySelectorAll('#lb-share-list input:checked')].map(i => i.value);
    if (!_shareDoc) return;
    if (!picked.length) return say('⚠ Tick at least one class.');
    say('Sharing…');
    try {
      const { data: sess } = await _sb.auth.getSession();
      const uid = sess?.session?.user?.id;
      if (!uid) throw new Error('Your sign-in session has expired.');
      // The absolute URL, because the 'link' CHECK constraint requires
      // ^https?:// — a relative path would be refused by the database.
      const href = location.origin + (_shareDoc.storage === 'static'
        ? '/library/' + _shareDoc.filename
        : '/api/library-file?id=' + encodeURIComponent(_shareDoc.id));
      const { data: mat, error: mErr } = await _sb.from('learning_materials').insert({
        teacher_id: uid,
        title: _shareDoc.title,
        subject: _shareDoc.subject || null,
        grade: _shareDoc.grade || null,
        description: 'From the Nou Klass library',
        source_type: 'link',
        external_url: href,
        library_document_id: _shareDoc.id,
      }).select('id').single();
      if (mErr) throw new Error(mErr.message);
      const rows = picked.map(cid => ({ material_id: mat.id, classroom_id: cid }));
      const { error: cErr } = await _sb.from('classroom_materials').insert(rows);
      if (cErr) throw new Error(cErr.message);
      closeShare();
      toast(`Shared with ${picked.length} class${picked.length === 1 ? '' : 'es'} ✓`, 3000);
    } catch (e) {
      say('⚠ ' + (e.message || e));
    }
  }

  // ══ Reporting a document ══════════════════════════════════════════════════
  // ⚠ OFFERED TO EVERY READER, children included. A child is the person most
  //   likely to open something that should not be there, and they have no other
  //   way to tell anyone. The server accepts an adult's JWT or a pupil's
  //   x-student-token, and refuses anyone carrying neither.
  // ⚠ Reporting never removes anything. It records a row and raises a count an
  //   admin sorts by; the document comes down only when a person decides it
  //   should. A pile-on cannot clear a shelf by itself.
  const REPORT_REASONS = [
    ['wrong-subject', 'Filed under the wrong subject'],
    ['wrong-grade', 'Filed under the wrong grade'],
    ['duplicate', 'We already have this one'],
    ['poor-quality', 'Unreadable or badly scanned'],
    ['personal-details', "It shows someone's personal details"],
    ['copyright', 'It should not be shared publicly'],
    ['inappropriate', 'Not suitable for children'],
    ['other', 'Something else'],
  ];
  let _reportId = null;
  let _reporting = false;

  function report(id) {
    _reportId = id;
    const f = (x) => document.getElementById(x);
    const sel = f('lb-rep-reason');
    if (sel) sel.innerHTML = REPORT_REASONS.map(([v, l]) => `<option value="${v}">${_esc(l)}</option>`).join('');
    if (f('lb-rep-detail')) f('lb-rep-detail').value = '';
    if (f('lb-rep-status')) f('lb-rep-status').textContent = '';
    f('lb-rep-form')?.classList.remove('hidden');
    f('lb-rep-done')?.classList.add('hidden');
    const doc = [..._docsBySection.values()].flat().find(d => d.id === id);
    const t = f('lb-rep-title');
    if (t) t.textContent = doc ? doc.title : 'this document';
    f('modal-library-report')?.classList.remove('hidden');
    sel?.focus();
  }

  function closeReport() {
    if (_reporting) return;
    document.getElementById('modal-library-report')?.classList.add('hidden');
  }

  async function sendReport() {
    if (_reporting || !_reportId) return;
    const f = (x) => document.getElementById(x);
    const say = (m) => { const s = f('lb-rep-status'); if (s) s.textContent = m; };
    _reporting = true;
    f('lb-rep-send')?.setAttribute('disabled', 'true');
    say('Sending…');
    try {
      // ⚠ An adult sends Authorization; a child sends x-student-token. They are
      //   never both, and a student token must NEVER be sent as a bearer token.
      const headers = { 'Content-Type': 'application/json' };
      let token = null;
      try { token = (await _sb.auth.getSession())?.data?.session?.access_token || null; } catch (_) {}
      if (token) headers.Authorization = `Bearer ${token}`;
      else {
        // ⚠ getStudentToken() from engine/supabase.js — the same accessor
        //   _pushAuthHeaders() in app.js uses. A bare identifier, because it is
        //   a function declaration at classic-script top level.
        const st = (typeof getStudentToken === 'function') ? getStudentToken() : null;
        if (st) headers['x-student-token'] = st;
      }
      const res = await fetch('/api/library-report', {
        method: 'POST', headers,
        body: JSON.stringify({
          document_id: _reportId,
          reason: f('lb-rep-reason')?.value || 'other',
          detail: (f('lb-rep-detail')?.value || '').trim(),
        }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) throw new Error(out.error || `Could not send that report (${res.status}).`);
      f('lb-rep-form')?.classList.add('hidden');
      f('lb-rep-done')?.classList.remove('hidden');
      const d = f('lb-rep-done-detail');
      if (d) d.textContent = out.message || 'Thank you.';
    } catch (e) {
      say('⚠ ' + (e.message || e));
    }
    _reporting = false;
    f('lb-rep-send')?.removeAttribute('disabled');
  }

  return { render, load, refresh, toggle, open, back, mountInto, search, countForPack, openForPack, clearPackFilter, packCount, mountPackLink, setType, setYear, setSort, canContribute, openUpload, closeUpload, submitUpload, uploadSubjectChanged,
    report, closeReport, sendReport, shareToClass, closeShare, confirmShare };
})();
