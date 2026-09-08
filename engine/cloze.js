'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Textes à Trous - PSAC French Q6
//
//  TWO SHAPES, because the real papers have two:
//    one part  (grades 4 and 5) - one text, ONE shared word bank, each word
//                used once, one word spare. 10 gaps, 10 marks.
//    two parts (grade 6)        - the shape of the actual PSAC paper:
//                6A, 5 gaps with a 6-word bank and one spare, then
//                6B, 5 gaps of the SAME story with NO list at all - the child
//                types the word. 5 + 5 marks.
//
//  ⚠ 6B is the half that decides the question. A child who only ever meets a
//  word bank has practised recognition and never production, and production is
//  where the marks are lost. Both halves run in one item so the score is the
//  paper's own 10.
//
//  Two screens, both here:
//    ClozeText.open(chapterId)  → the LIST: every text in the chapter, with a
//                                 tick on the ones already attempted
//    ClozeText.start(id)        → the PLAYER: place, type, check, review
//
//  ⚠ INTERACTION (part A): tap-to-place is the primary mechanic, not drag.
//  HTML5 drag and drop does not exist on touch, and a pointer-event drag on a
//  360px phone means a nine-year-old holding a 60px chip over a 40px gap while
//  the page tries to scroll. So: tap a word, tap a gap (or just tap a word and
//  it fills the next empty gap). Drag is added ON TOP for mouse/stylus.
//
//  ⚠ INTERACTION (part B): typing must NEVER trigger renderPlayer(). That
//  rebuilds the host's innerHTML, which destroys the <input> the child is
//  typing into and drops the caret. _typeGap() writes state and patches only
//  the progress line and the Check button - nothing else moves.
//
//  ⚠ EVERY typed gap is the SAME width. Sizing an input to its answer would
//  print the answer's length on the screen; the real paper draws one dotted
//  line whatever the word.
//
//  ⚠ Cloze questions are excluded from every practice and exam pool by
//  isPoolQuestion() in questions_engine.js. They reach a child ONLY through
//  this module.
// ══════════════════════════════════════════════════════════════════════════
const ClozeText = (function () {

  // Chapters this module owns. A chapter listed here never opens the ordinary
  // practice flow - startChapterDirect() hands it straight over.
  const CHAPTER_IDS = new Set(['g4fr-textes-trous', 'g5fr-textes-trous', 'g6fr-textes-trous']);

  let _chapterId = null;   // chapter whose list we are showing
  let _q = null;           // the text being played
  let _placed = [];        // part-A gap index → bank index, or null
  let _typed = [];         // part-B gap index → what the child typed
  let _sel = null;         // bank index the child has picked up, or null
  let _checked = false;
  let _result = [];        // gap index → true/false, after checking
  let _slips = [];         // gap index → true when only an accent was missing

  const _esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const isClozeChapter = id => CHAPTER_IDS.has(id);

  // ⚠ A bundle cached before two-part texts existed has no gapsA/gapsB. Reading
  // them as "all gaps are banked" keeps those items playable instead of
  // rendering a text with no gaps at all. (_CACHE_VERSION was bumped too, so
  // this is the belt to that braces.)
  const _gapsA = () => (_q && _q.gapsA != null ? _q.gapsA : (_q ? _q.gaps : 0));
  const _gapsB = () => (_q && _q.gapsB != null ? _q.gapsB : 0);
  const _isTwoPart = () => _gapsB() > 0;
  const _isTypedGap = gi => gi >= _gapsA();

  function _texts(chapterId) {
    return (typeof STATIC_QUESTIONS === 'undefined' ? [] : STATIC_QUESTIONS)
      .filter(q => q && q.type === 'cloze' && q.chapterId === chapterId)
      .sort((a, b) => String(a.id).localeCompare(String(b.id)));
  }

  // Per-text best score. Lives in the progress blob (DB.cloze), seeded in
  // Store._defaultStudent() so the key-merge in loadStudentProgress() backfills
  // every existing child - no migration, no new column-level GRANT.
  function _store() {
    if (typeof DB === 'undefined') return {};
    if (!DB.cloze || typeof DB.cloze !== 'object') DB.cloze = {};
    return DB.cloze;
  }
  const _best = id => _store()[id] || null;

  // ── The list ────────────────────────────────────────────────────────────
  function open(chapterId) {
    if (!isClozeChapter(chapterId)) return false;
    _chapterId = chapterId;
    _q = null;
    renderList();
    showScreen('cloze-list');
    return true;
  }

  function renderList() {
    const host = document.getElementById('cloze-list-body');
    if (!host) return;
    const texts = _texts(_chapterId);
    const ch = (typeof CHAPTERS !== 'undefined' ? CHAPTERS : []).find(c => c.id === _chapterId);
    const title = document.getElementById('cloze-list-title');
    if (title) title.textContent = `${ch?.icon || '📝'} ${ch?.name || 'Textes à Trous'}`;

    if (!texts.length) {
      host.innerHTML = `<p class="clz-empty">Ces textes n'ont pas pu être chargés. Vérifie ta connexion, puis reviens.</p>`;
      return;
    }

    const done = texts.filter(t => _best(t.id)).length;
    const summary = document.getElementById('cloze-list-summary');
    if (summary) {
      summary.innerHTML = done
        ? `Tu as essayé <b>${done}</b> texte${done === 1 ? '' : 's'} sur ${texts.length}. Choisis-en un autre - ou refais-en un pour améliorer ton score.`
        : `<b>${texts.length}</b> textes à compléter. Choisis celui que tu veux : tu peux les faire dans n'importe quel ordre.`;
    }

    host.innerHTML = texts.map((t, i) => {
      const b = _best(t.id);
      // ⚠ A tick means ATTEMPTED, not mastered - the score sits beside it so the
      // two are never confused. A chapter card in this app says "correct", never
      // "mastery", for exactly the same reason.
      const badge = !b ? '<span class="clz-badge is-new">Pas encore fait</span>'
        : b.best === t.gaps ? `<span class="clz-badge is-full">✓ ${b.best}/${t.gaps} - parfait</span>`
        : `<span class="clz-badge is-done">✓ Essayé · meilleur score ${b.best}/${t.gaps}</span>`;
      const again = b ? '<span class="clz-again">Refaire</span>' : '';
      // A two-part text says so on the card: the second half is the harder one,
      // and a child choosing what to practise should know it is in there.
      const meta = t.gapsB
        ? `${t.gaps} trous · 6A avec les mots, 6B sans`
        : `${t.gaps} trous · ${t.bank.length} mots proposés`;
      return `<button class="clz-item${b ? ' is-attempted' : ''}" onclick="ClozeText.start('${_esc(t.id)}')">
          <span class="clz-num">${i + 1}</span>
          <span class="clz-item-main">
            <span class="clz-item-title">${_esc(t.title)}</span>
            <span class="clz-item-meta">${meta}</span>
            ${badge}
          </span>
          <span class="clz-item-go">${again}<span aria-hidden="true">›</span></span>
        </button>`;
    }).join('');
  }

  // ── The player ──────────────────────────────────────────────────────────
  function start(id) {
    const q = _texts(_chapterId).find(t => t.id === id)
      || (typeof STATIC_QUESTIONS !== 'undefined' ? STATIC_QUESTIONS : []).find(t => t.id === id);
    if (!q) { if (typeof toast === 'function') toast('Ce texte n\'a pas pu être ouvert.', 2500); return; }
    _q = q;
    _chapterId = q.chapterId;
    _placed = new Array(_gapsA()).fill(null);
    _typed = new Array(_gapsB()).fill('');
    _sel = null;
    _checked = false;
    _result = [];
    _slips = [];
    renderPlayer();
    showScreen('cloze-play');
    const body = document.getElementById('cloze-play-body');
    if (body) body.scrollIntoView({ block: 'start' });
  }

  function _gapHtml(gi) {
    if (_isTypedGap(gi)) return _typedGapHtml(gi);
    const bi = _placed[gi];
    const word = bi == null ? '' : _q.bank[bi];
    let cls = 'clz-gap';
    if (bi != null) cls += ' is-filled';
    if (_checked) cls += _result[gi] ? ' is-right' : ' is-wrong';
    // The number stays visible while empty so a child can talk about "trou 7"
    // and match it to the marking afterwards.
    const label = bi == null
      ? `<span class="clz-gap-n">${gi + 1}</span>`
      : `<span class="clz-gap-w">${_esc(word)}</span>`;
    const dis = _checked ? ' disabled' : '';
    return `<button type="button" class="${cls}" data-gap="${gi}"${dis}
      aria-label="Trou ${gi + 1}${bi == null ? ', vide' : ', ' + _esc(word)}"
      onclick="ClozeText.tapGap(${gi})">${label}</button>`;
  }

  // ⚠ autocorrect/autocapitalise/spellcheck are all OFF. A phone that helpfully
  // capitalises « qui » or offers to fix « sous » is answering the question for
  // the child, and this is the half of Q6 that tests exactly that word.
  function _typedGapHtml(gi) {
    const ti = gi - _gapsA();
    let cls = 'clz-tgap';
    if ((_typed[ti] || '').trim()) cls += ' is-filled';
    if (_checked) cls += _result[gi] ? ' is-right' : ' is-wrong';
    if (_checked && _slips[gi]) cls += ' is-slip';
    return `<span class="${cls}"><span class="clz-gap-n">${gi + 1}</span><input type="text"
      class="clz-input" data-gap="${gi}" value="${_esc(_typed[ti] || '')}"
      lang="fr" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
      maxlength="24" aria-label="Trou ${gi + 1}, écris le mot"${_checked ? ' disabled' : ''}
      oninput="ClozeText.typeGap(${gi}, this.value)"></span>`;
  }

  function _textHtml(src) {
    // {n} placeholders → gap buttons. Everything else is escaped: the passage is
    // content, not markup, and a stray < would otherwise eat the rest of it.
    const parts = String(src || '').split(/(\{\d+\})/);
    return parts.map(p => {
      const m = /^\{(\d+)\}$/.exec(p);
      if (!m) return _esc(p).replace(/\n/g, '<br>');
      return _gapHtml(Number(m[1]) - 1);
    }).join('');
  }

  function _bankHtml() {
    const used = new Set(_placed.filter(v => v != null));
    return _q.bank.map((w, bi) => {
      const isUsed = used.has(bi);
      let cls = 'clz-word';
      if (isUsed) cls += ' is-used';
      if (_sel === bi) cls += ' is-sel';
      if (_checked && !isUsed) cls += ' is-spare';
      return `<button type="button" class="${cls}" data-word="${bi}"
        ${isUsed || _checked ? 'disabled' : ''} draggable="${!isUsed && !_checked}"
        aria-pressed="${_sel === bi}"
        onclick="ClozeText.tapWord(${bi})">${_esc(w)}</button>`;
    }).join('');
  }

  const _filled = () =>
    _placed.filter(v => v != null).length + _typed.filter(v => String(v || '').trim()).length;

  function renderPlayer() {
    const host = document.getElementById('cloze-play-body');
    if (!host || !_q) return;
    const two = _isTwoPart();
    const gapsA = _gapsA(), gapsB = _gapsB();
    const filled = _filled();
    const spare = _q.bank.length - gapsA;

    let footer;
    if (_checked) {
      const score = _result.filter(Boolean).length;
      footer = `<div class="clz-score${score === _q.gaps ? ' is-full' : ''}">
          <b>${score} / ${_q.gaps}</b>
          <span>${score === _q.gaps ? 'Parfait ! Tous les mots sont à leur place.'
            : score >= _q.gaps - 2 ? 'Presque ! Regarde les trous en rouge.'
            : 'Lis les explications sous le texte, puis réessaie.'}</span>
        </div>
        <div class="clz-actions">
          <button class="btn-primary" onclick="ClozeText.start('${_esc(_q.id)}')">↻ Réessayer</button>
          <button class="btn-secondary" onclick="ClozeText.backToList()">← Choisir un autre texte</button>
        </div>`;
    } else {
      footer = `<div class="clz-progress" aria-live="polite">${filled} / ${_q.gaps} trous remplis</div>
        <div class="clz-actions">
          <button class="btn-primary" id="clz-check" onclick="ClozeText.check()"${filled < _q.gaps ? ' disabled' : ''}>Vérifier mes réponses</button>
          <button class="btn-secondary" onclick="ClozeText.clearAll()">Tout effacer</button>
        </div>
        <p class="clz-note" id="clz-note"${filled >= _q.gaps ? ' style="display:none"' : ''}>Remplis les ${_q.gaps} trous pour pouvoir vérifier.</p>`;
    }

    const introA = _esc(_q.intro || (two
      ? 'Complète le texte ci-dessous avec les mots donnés (un mot par tiret). Attention ! Il y a un mot en trop.'
      : 'Complète le texte en utilisant les mots donnés. Utilise chaque mot une seule fois. Attention ! Il y a un mot en trop.'));
    const helpA = _checked
      ? 'Les mots en gris n\'étaient pas nécessaires.'
      : `Touche un mot, puis touche un trou. Pour retirer un mot, touche le trou. Il y a ${spare} mot${spare === 1 ? '' : 's'} en trop.`;

    // The headings carry the paper's own labels. A child who has met "6A" and
    // "6B" here is not reading them for the first time in the exam hall.
    const partA = `${two ? `<h4 class="clz-part-h">Question 6A <span class="clz-marks">· ${gapsA} points</span></h4>` : ''}
      <p class="clz-intro">${introA}</p>
      <div class="clz-bank" id="clz-bank" role="group" aria-label="Mots à placer">${_bankHtml()}</div>
      <p class="clz-help">${helpA}</p>
      <div class="clz-text" id="clz-text">${_textHtml(_q.text)}</div>`;

    const partB = !two ? '' : `<section class="clz-part clz-part-b">
        <h4 class="clz-part-h">Question 6B <span class="clz-marks">· ${gapsB} points</span></h4>
        <p class="clz-intro">${_esc(_q.introB || 'Complète le texte ci-dessous avec les mots qui conviennent (un mot par tiret).')}</p>
        <p class="clz-help">${_checked ? 'Compare ce que tu as écrit avec les réponses, plus bas.'
          : 'Ici, il n\'y a pas de liste : c\'est à toi d\'écrire le mot. L\'histoire continue.'}</p>
        <div class="clz-text" id="clz-text-b">${_textHtml(_q.textB)}</div>
      </section>`;

    host.innerHTML = `
      <h3 class="clz-title">${_esc(_q.title)}</h3>
      ${two ? '<p class="clz-lead">Ce texte se fait en <b>deux parties</b>, comme à l\'examen : d\'abord avec les mots, ensuite sans.</p>' : ''}
      <section class="clz-part clz-part-a">${partA}</section>
      ${partB}
      ${_checked ? _reviewHtml() : ''}
      <div class="clz-footer">${footer}</div>`;

    if (!_checked) { _wireDrag(); _wireInputs(); }
  }

  function _reviewHtml() {
    const gapsA = _gapsA();
    const rows = _q.gapAnswers.map((ans, gi) => {
      const typed = _isTypedGap(gi);
      const mine = typed
        ? String(_typed[gi - gapsA] || '').trim()
        : (_placed[gi] == null ? '' : _q.bank[_placed[gi]]);
      const ok = _result[gi];
      const note = (_q.notes || [])[gi];
      // Only part B can have alternatives, and naming them is the teaching: a
      // child who wrote "retournerh" needs to see that "retourner" was fine.
      const alts = ((_q.gapAlts || [])[gi] || []).slice(1);
      return `<li class="${ok ? 'is-right' : 'is-wrong'}${typed ? ' is-typed' : ''}">
          <span class="clz-r-n">${gi + 1}</span>
          <span class="clz-r-body">
            <b>${_esc(ans)}</b>${ok ? '' : ` <span class="clz-r-mine">- tu avais mis « ${_esc(mine || '-')} »</span>`}
            ${ok && _slips[gi] ? '<span class="clz-r-slip">Juste - attention à l\'accent.</span>' : ''}
            ${alts.length ? `<span class="clz-r-alt">On acceptait aussi : ${alts.map(_esc).join(', ')}.</span>` : ''}
            ${note ? `<span class="clz-r-note">${_esc(note)}</span>` : ''}
          </span>
        </li>`;
    }).join('');
    const bankAnswers = new Set(_q.gapAnswers.slice(0, gapsA));
    const spare = _q.bank.filter(w => !bankAnswers.has(w));
    return `<div class="clz-review">
        <h4>Les réponses</h4>
        <ol class="clz-r-list">${rows}</ol>
        ${spare.length ? `<p class="clz-spare">Mot${spare.length === 1 ? '' : 's'} en trop : <b>${spare.map(_esc).join(', ')}</b>.</p>` : ''}
      </div>`;
  }

  // ── Placing words (part A) ──────────────────────────────────────────────
  function tapWord(bi) {
    if (_checked) return;
    if (_placed.includes(bi)) return;
    if (_sel === bi) { _sel = null; renderPlayer(); return; }
    _sel = bi;
    // Tapping a word with no gap chosen fills the FIRST empty gap. That single
    // behaviour is what makes this usable one-handed: a child can work straight
    // down the text without ever aiming at a 40px target. It only ever fills a
    // BANKED gap - a bank word can never land in part B.
    const next = _placed.indexOf(null);
    if (next >= 0) { _place(next, bi); return; }
    renderPlayer();
  }

  function tapGap(gi) {
    if (_checked || _isTypedGap(gi)) return;
    if (_placed[gi] != null) { _placed[gi] = null; _sel = null; renderPlayer(); return; }
    if (_sel == null) { if (typeof toast === 'function') toast('Touche d\'abord un mot en haut.', 1800); return; }
    _place(gi, _sel);
  }

  function _place(gi, bi) {
    _placed[gi] = bi;
    _sel = null;
    renderPlayer();
    const el = document.querySelector(`.clz-gap[data-gap="${gi}"]`);
    if (el) { el.classList.add('clz-pop'); el.addEventListener('animationend', () => el.classList.remove('clz-pop'), { once: true }); }
  }

  // ── Typing words (part B) ───────────────────────────────────────────────
  // ⚠ NO renderPlayer() here. Rebuilding the host's innerHTML on every
  // keystroke destroys the input being typed into and loses the caret.
  function typeGap(gi, val) {
    if (_checked) return;
    const ti = gi - _gapsA();
    if (ti < 0 || ti >= _typed.length) return;
    _typed[ti] = val;
    const wrap = document.querySelector(`.clz-tgap input[data-gap="${gi}"]`);
    if (wrap && wrap.parentElement) wrap.parentElement.classList.toggle('is-filled', !!String(val || '').trim());
    _syncProgress();
  }

  function _syncProgress() {
    const filled = _filled();
    const p = document.querySelector('.clz-progress');
    if (p) p.textContent = `${filled} / ${_q.gaps} trous remplis`;
    const btn = document.getElementById('clz-check');
    if (btn) btn.disabled = filled < _q.gaps;
    const note = document.getElementById('clz-note');
    if (note) note.style.display = filled >= _q.gaps ? 'none' : '';
  }

  // Enter moves to the next empty typed gap rather than doing nothing. On a
  // phone the key reads "next" and a child will press it.
  function _wireInputs() {
    const inputs = Array.from(document.querySelectorAll('.clz-input'));
    inputs.forEach((el, i) => {
      el.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        const next = inputs.slice(i + 1).find(x => !x.value.trim()) || inputs[i + 1];
        if (next) next.focus(); else el.blur();
      });
    });
  }

  function clearAll() {
    if (_checked) return;
    _placed = _placed.map(() => null);
    _typed = _typed.map(() => '');
    _sel = null;
    renderPlayer();
  }

  // Drag is a bonus path for mouse and stylus. Touch never reaches it - the
  // dragstart event does not fire - and that is deliberate, not an oversight.
  function _wireDrag() {
    const bank = document.getElementById('clz-bank');
    const text = document.getElementById('clz-text');
    if (!bank || !text) return;
    bank.querySelectorAll('.clz-word:not(.is-used)').forEach(el => {
      el.addEventListener('dragstart', e => {
        _sel = Number(el.dataset.word);
        try { e.dataTransfer.setData('text/plain', el.dataset.word); e.dataTransfer.effectAllowed = 'move'; } catch (_) {}
      });
    });
    text.querySelectorAll('.clz-gap').forEach(el => {
      el.addEventListener('dragover', e => { e.preventDefault(); el.classList.add('is-over'); });
      el.addEventListener('dragleave', () => el.classList.remove('is-over'));
      el.addEventListener('drop', e => {
        e.preventDefault();
        el.classList.remove('is-over');
        let bi = Number(e.dataTransfer ? e.dataTransfer.getData('text/plain') : NaN);
        if (!Number.isInteger(bi)) bi = _sel;
        if (bi == null || !Number.isInteger(bi) || _placed.includes(bi)) return;
        _place(Number(el.dataset.gap), bi);
      });
    });
  }

  // ── Marking ─────────────────────────────────────────────────────────────
  // ⚠ The fold/accent rule used to live here. It now lives ONCE, in
  // engine/helpers.js (matchTypedAnswer), because the Q7A `text` items need
  // the identical rule and two copies of "is this answer right" is exactly the
  // drift that file's factory list warns about. Behaviour is unchanged:
  // scripts/test-cloze-texts.js and test-cloze-interaction.js still pass.
  function _markTyped(gi) {
    const alts = (_q.gapAlts || [])[gi] || [_q.gapAnswers[gi]];
    const mine = String(_typed[gi - _gapsA()] || '');
    return matchTypedAnswer(alts, mine, null);
  }

  function check() {
    if (!_q || _checked) return;
    if (_placed.some(v => v == null) || _typed.some(v => !String(v || '').trim())) {
      if (typeof toast === 'function') toast('Il reste des trous à remplir.', 2000);
      return;
    }
    _result = []; _slips = [];
    for (let gi = 0; gi < _q.gaps; gi++) {
      if (_isTypedGap(gi)) {
        const m = _markTyped(gi);
        _result[gi] = m.ok; _slips[gi] = m.slip;
      } else {
        _result[gi] = _q.bank[_placed[gi]] === _q.gapAnswers[gi];
        _slips[gi] = false;
      }
    }
    _checked = true;
    const score = _result.filter(Boolean).length;

    // ⚠ This IS practice, so it counts - one recordAnswer per gap, because one
    // gap is one mark on the real paper. The passage id is passed as the
    // question id, so DB.chapters[ch].answeredIds gains it once (it is a Set)
    // and _chapterProgress() reports "3 of 20 texts" without any new bookkeeping.
    if (typeof recordAnswer === 'function') {
      for (let i = 0; i < _result.length; i++) recordAnswer(_q.chapterId, _result[i], 'cloze', _q.id);
    }

    const store = _store();
    const prev = store[_q.id];
    store[_q.id] = {
      best: Math.max(score, prev?.best || 0),
      last: score,
      gaps: _q.gaps,
      tries: (prev?.tries || 0) + 1,
      at: Date.now(),
    };
    if (typeof save === 'function' && typeof DB !== 'undefined') save(DB);

    renderPlayer();
    if (score === _q.gaps && typeof launchConfetti === 'function') launchConfetti(60);
    const review = document.querySelector('.clz-score');
    if (review) review.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function backToList() { renderList(); showScreen('cloze-list'); }

  return { open, start, check, tapWord, tapGap, typeGap, clearAll, backToList, renderList, isClozeChapter, _texts };
})();
