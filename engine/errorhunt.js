'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Chasse aux Erreurs - PSAC French correction practice
//
//  The child reads a text that has been deliberately broken and TAPS every
//  word they believe is wrong. Two buttons, and the difference between them
//  is the whole exercise:
//
//    Vérifier   says only « Tu as trouvé 3 / 12 erreurs. » It never says WHICH
//               words are right or wrong, and never moves anything on screen.
//    Terminer   reveals everything: the errors found, the errors missed with
//               their correction and the rule, the words wrongly accused, and
//               the whole text put right.
//
//  ⚠ VÉRIFIER IS CAPPED AT maxChecks (3, carried on the question). A count is
//  an oracle if you can ask it as often as you like: click ONE word, read the
//  count, and you have been told whether that word is an error. Three checks
//  keeps it a self-assessment. The cap is shown on screen, not hidden.
//
//  ⚠ THE COUNT NEVER COUNTS DOWN FROM A WRONG CLICK. It reports found-so-far
//  out of the total. A child who has selected 10 words and reads « 3 / 12 »
//  learns that 7 of their picks are wrong - that is the intended feedback and
//  it is as far as it goes.
//
//  Two screens, both here:
//    ErrorHunt.open(chapterId)  → the LIST: every text, with a tick on the
//                                 ones already attempted and the best score
//    ErrorHunt.start(id)        → the PLAYER: tap, check, finish, review
//
//  ⚠ A tap must NEVER call renderPlayer(). Rebuilding the host's innerHTML on
//  every tap destroys the button under the finger, so the next tap lands on a
//  node that no longer exists and the page jumps back to the top mid-text.
//  _toggle() flips one class and patches the counter line - nothing else moves.
//  (engine/cloze.js carries the same rule for its typed gaps, for the same
//  reason, and engine/interactive_map.js for its drags.)
//
//  ⚠ errorhunt items are excluded from every practice and exam pool by
//  isPoolQuestion() in questions_engine.js. They reach a child ONLY here.
// ══════════════════════════════════════════════════════════════════════════
const ErrorHunt = (function () {

  // Chapters this module owns. startChapterDirect() hands these straight over
  // instead of opening the ordinary practice flow.
  const CHAPTER_IDS = new Set(['g4fr-chasse-erreurs', 'g5fr-chasse-erreurs', 'g6fr-chasse-erreurs']);

  let _chapterId = null;
  let _q = null;
  let _picked = new Set();   // word indices the child has tapped
  let _checks = 0;           // how many times Vérifier has been pressed
  let _lastFound = null;     // found count at the last Vérifier, or null
  let _done = false;         // Terminer pressed - everything is revealed

  const _esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const isHuntChapter = id => CHAPTER_IDS.has(id);

  const _maxChecks = () => (_q && _q.maxChecks) || 3;
  const _errSet = () => new Set((_q && _q.errAt) || []);
  const _found = () => (_q ? (_q.errAt || []).filter(i => _picked.has(i)).length : 0);

  function _texts(chapterId) {
    return (typeof STATIC_QUESTIONS === 'undefined' ? [] : STATIC_QUESTIONS)
      .filter(q => q && q.type === 'errorhunt' && q.chapterId === chapterId)
      .sort((a, b) => String(a.id).localeCompare(String(b.id)));
  }

  // Per-text best score, in the progress blob (DB.hunt), seeded in
  // Store._defaultStudent() so the key-merge in loadStudentProgress() backfills
  // every existing child - no migration and no new column-level GRANT.
  function _store() {
    if (typeof DB === 'undefined') return {};
    if (!DB.hunt || typeof DB.hunt !== 'object') DB.hunt = {};
    return DB.hunt;
  }
  const _best = id => _store()[id] || null;

  // ── The list ────────────────────────────────────────────────────────────
  function open(chapterId) {
    if (!isHuntChapter(chapterId)) return false;
    _chapterId = chapterId;
    _q = null;
    renderList();
    showScreen('hunt-list');
    return true;
  }

  function renderList() {
    const host = document.getElementById('hunt-list-body');
    if (!host) return;
    const texts = _texts(_chapterId);
    const ch = (typeof CHAPTERS !== 'undefined' ? CHAPTERS : []).find(c => c.id === _chapterId);
    const title = document.getElementById('hunt-list-title');
    if (title) title.textContent = `${ch?.icon || '🔍'} ${ch?.name || 'Chasse aux Erreurs'}`;

    if (!texts.length) {
      host.innerHTML = `<p class="eh-empty">Ces textes n'ont pas pu être chargés. Vérifie ta connexion, puis reviens.</p>`;
      return;
    }

    const done = texts.filter(t => _best(t.id)).length;
    const summary = document.getElementById('hunt-list-summary');
    if (summary) {
      summary.innerHTML = done
        ? `Tu as fait <b>${done}</b> texte${done === 1 ? '' : 's'} sur ${texts.length}. Choisis-en un autre - ou refais-en un pour trouver ce qui t'avait échappé.`
        : `<b>${texts.length}</b> textes pleins d'erreurs. À toi de les débusquer : clique sur chaque mot qui te paraît faux.`;
    }

    host.innerHTML = texts.map((t, i) => {
      const b = _best(t.id);
      // ⚠ A tick means ATTEMPTED, never mastered, and the score sits beside it
      //   so the two can never be read as one. The chapter cards in this app
      //   say "correct" and never "mastery" for exactly the same reason.
      const badge = !b ? '<span class="eh-badge is-new">Pas encore fait</span>'
        : b.best === t.errors ? `<span class="eh-badge is-full">✓ ${b.best}/${t.errors} - sans faute</span>`
        : `<span class="eh-badge is-done">✓ Essayé · meilleur score ${b.best}/${t.errors}</span>`;
      const again = b ? '<span class="eh-again">Refaire</span>' : '';
      return `<button class="eh-item${b ? ' is-attempted' : ''}" onclick="ErrorHunt.start('${_esc(t.id)}')">
          <span class="eh-num">${i + 1}</span>
          <span class="eh-item-main">
            <span class="eh-item-title">${_esc(t.title)}</span>
            <span class="eh-item-meta">${t.errors} erreurs cachées · ${t.words.length} mots</span>
            ${badge}
          </span>
          <span class="eh-item-go">${again}<span aria-hidden="true">›</span></span>
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
    _picked = new Set();
    _checks = 0;
    _lastFound = null;
    _done = false;
    renderPlayer();
    showScreen('hunt-play');
    const body = document.getElementById('hunt-play-body');
    if (body) body.scrollIntoView({ block: 'start' });
  }

  // One word. Every word is clickable, including the correct ones - that is the
  // exercise. After Terminer the class carries the verdict; before it, the only
  // state a word can show is "I picked this", which says nothing about whether
  // the pick was right.
  function _wordHtml(i) {
    const w = _q.words[i];
    const picked = _picked.has(i);
    const isErr = _errSet().has(i);
    let cls = 'eh-w';
    if (picked) cls += ' is-picked';
    if (_done) {
      if (isErr && picked) cls += ' is-found';
      else if (isErr) cls += ' is-missed';
      else if (picked) cls += ' is-false';
    }
    let aria = `${w}`;
    if (_done) aria += isErr && picked ? ', erreur trouvée' : isErr ? ', erreur manquée' : picked ? ', ce mot était correct' : '';
    else if (picked) aria += ', sélectionné';
    return `<button type="button" class="${cls}" data-w="${i}" lang="fr"
      aria-pressed="${picked}" aria-label="${_esc(aria)}"${_done ? ' disabled' : ''}
      onclick="ErrorHunt.tap(${i})">${_esc(w)}</button>`;
  }

  function _textHtml() {
    return _q.words.map((_, i) => _wordHtml(i)).join(' ');
  }

  function renderPlayer() {
    const host = document.getElementById('hunt-play-body');
    if (!host || !_q) return;
    const total = _q.errors;
    const left = _maxChecks() - _checks;

    let footer;
    if (_done) {
      const found = _found();
      footer = `<div class="eh-score${found === total ? ' is-full' : ''}">
          <b>${found} / ${total}</b>
          <span>${found === total ? 'Sans faute ! Tu les as toutes trouvées.'
            : found >= total - 2 ? 'Presque ! Regarde ci-dessous celles qui t\'ont échappé.'
            : 'Lis les corrections ci-dessous, puis refais le texte.'}</span>
        </div>
        <div class="eh-actions">
          <button class="btn-primary" onclick="ErrorHunt.start('${_esc(_q.id)}')">↻ Refaire ce texte</button>
          <button class="btn-secondary" onclick="ErrorHunt.backToList()">← Choisir un autre texte</button>
        </div>`;
    } else {
      footer = `<div class="eh-progress" aria-live="polite" id="eh-progress">${_progressText()}</div>
        <div class="eh-actions">
          <button class="btn-secondary" id="eh-check" onclick="ErrorHunt.check()"${left <= 0 || !_picked.size ? ' disabled' : ''}>Vérifier${left > 0 ? ` (${left})` : ''}</button>
          <button class="btn-primary" onclick="ErrorHunt.finish()">Terminer</button>
        </div>
        <p class="eh-note">Vérifier te donne seulement le <b>nombre</b> d'erreurs trouvées, jamais lesquelles - et tu ne peux le faire que <b>${_maxChecks()} fois</b>. Terminer révèle tout.</p>`;
    }

    host.innerHTML = `
      <h3 class="eh-title">${_esc(_q.title)}</h3>
      <p class="eh-intro">${_esc(_q.intro || `Ce texte contient ${total} erreurs. Clique sur chaque mot qui te paraît faux.`)}</p>
      <p class="eh-help">Une ponctuation qui manque ne se clique pas toute seule : clique sur le <b>mot juste avant</b>. Exemple : s'il manque le point après « cour », clique sur <b>cour</b>. Clique une deuxième fois pour désélectionner.</p>
      <div class="eh-text" id="eh-text" lang="fr">${_textHtml()}</div>
      ${_done ? _reviewHtml() : ''}
      <div class="eh-footer">${footer}</div>`;
  }

  function _progressText() {
    const n = _picked.size;
    const picked = `${n} mot${n === 1 ? '' : 's'} sélectionné${n === 1 ? '' : 's'}`;
    // ⚠ The result of the LAST Vérifier stays on screen. Showing it once and
    //   wiping it on the next tap would make a child re-spend a check to read
    //   a number they had already earned.
    return _lastFound == null ? picked
      : `${picked} · dernière vérification : <b>${_lastFound} / ${_q.errors}</b> trouvées`;
  }

  // ── Tapping ─────────────────────────────────────────────────────────────
  // ⚠ No renderPlayer(). See the header: rebuilding innerHTML here destroys the
  //   button being tapped and throws the child back to the top of the text.
  function tap(i) {
    if (_done || !_q) return;
    if (_picked.has(i)) _picked.delete(i); else _picked.add(i);
    const el = document.querySelector(`.eh-w[data-w="${i}"]`);
    if (el) {
      const on = _picked.has(i);
      el.classList.toggle('is-picked', on);
      el.setAttribute('aria-pressed', String(on));
      el.setAttribute('aria-label', `${_q.words[i]}${on ? ', sélectionné' : ''}`);
    }
    const p = document.getElementById('eh-progress');
    if (p) p.innerHTML = _progressText();
    const btn = document.getElementById('eh-check');
    if (btn) btn.disabled = (_maxChecks() - _checks) <= 0 || !_picked.size;
  }

  // ── Vérifier: a number, and nothing else ────────────────────────────────
  function check() {
    if (_done || !_q) return;
    if (!_picked.size) { if (typeof toast === 'function') toast('Choisis d\'abord au moins un mot.', 1800); return; }
    if (_checks >= _maxChecks()) { if (typeof toast === 'function') toast('Tu as utilisé tes 3 vérifications. Clique sur Terminer.', 2500); return; }
    _checks++;
    _lastFound = _found();
    // ⚠ Nothing on the text changes. Not a colour, not a class. The moment a
    //   checked word looks different from an unchecked one, Vérifier has
    //   answered the question instead of the child.
    const p = document.getElementById('eh-progress');
    if (p) p.innerHTML = _progressText();
    const left = _maxChecks() - _checks;
    const btn = document.getElementById('eh-check');
    if (btn) { btn.disabled = left <= 0; btn.textContent = left > 0 ? `Vérifier (${left})` : 'Vérifier'; }
    if (typeof toast === 'function') {
      toast(left > 0
        ? `${_lastFound} / ${_q.errors} erreurs trouvées. Il te reste ${left} vérification${left === 1 ? '' : 's'}.`
        : `${_lastFound} / ${_q.errors} erreurs trouvées. C'était ta dernière vérification.`, 3200);
    }
  }

  // ── Terminer: reveal everything ─────────────────────────────────────────
  function finish() {
    if (_done || !_q) return;
    _done = true;
    const errs = _q.errAt || [];
    const found = _found();

    // ⚠ This IS practice, so it counts - one recordAnswer per error, because
    //   one error is one mark. The TEXT id is passed as the question id, so
    //   DB.chapters[ch].answeredIds gains it once (it is a Set) and
    //   _chapterProgress() reports "3 of 20 textes" with no new bookkeeping.
    //   Same contract as ClozeText.check().
    if (typeof recordAnswer === 'function') {
      for (let k = 0; k < errs.length; k++) {
        recordAnswer(_q.chapterId, _picked.has(errs[k]), 'errorhunt', _q.id);
      }
    }

    const store = _store();
    const prev = store[_q.id];
    store[_q.id] = {
      best: Math.max(found, prev?.best || 0),
      last: found,
      errors: _q.errors,
      tries: (prev?.tries || 0) + 1,
      at: Date.now(),
    };
    if (typeof save === 'function' && typeof DB !== 'undefined') save(DB);

    renderPlayer();
    if (found === _q.errors && typeof launchConfetti === 'function') launchConfetti(60);
    const score = document.querySelector('.eh-score');
    if (score) score.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function _reviewHtml() {
    const errs = _q.errAt || [];
    const rows = errs.map((wi, k) => {
      const ok = _picked.has(wi);
      return `<li class="${ok ? 'is-right' : 'is-wrong'}">
          <span class="eh-r-n">${ok ? '✓' : '✗'}</span>
          <span class="eh-r-body">
            <b class="eh-r-fix">${_esc(_q.errFix[k])}</b>
            <span class="eh-r-was">au lieu de « ${_esc(_q.words[wi])} »</span>
            <span class="eh-r-why">${_esc(_q.errWhy[k])}</span>
          </span>
        </li>`;
    }).join('');

    // Words wrongly accused. Named, because a child who crossed out six correct
    // words has learned something too - and being told only the score would
    // leave them thinking those words were errors nobody explained.
    const errSet = _errSet();
    const falseHits = [..._picked].filter(i => !errSet.has(i)).sort((a, b) => a - b);
    const falseHtml = !falseHits.length ? '' :
      `<p class="eh-false">Tu avais aussi coché ${falseHits.length} mot${falseHits.length === 1 ? '' : 's'} qui ${falseHits.length === 1 ? 'était correct' : 'étaient corrects'} :
        ${falseHits.map(i => `<b>${_esc(_q.words[i])}</b>`).join(', ')}.</p>`;

    return `<div class="eh-review">
        <h4>Les ${_q.errors} erreurs</h4>
        <ol class="eh-r-list">${rows}</ol>
        ${falseHtml}
        <h4 class="eh-correct-h">Le texte corrigé</h4>
        <p class="eh-correct" lang="fr">${_esc(_q.correct)}</p>
      </div>`;
  }

  function backToList() { renderList(); showScreen('hunt-list'); }

  return { open, start, tap, check, finish, backToList, renderList, isHuntChapter, _texts };
})();
