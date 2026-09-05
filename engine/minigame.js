'use strict';
// ══════════════════════════════════════════════
//  MiniGames — the kids' arcade. Seven games:
//    💰 Who Wants to Be a Billionaire? — 20-question prize ladder, lifelines
//    ⚡ Quick Fire — 60-second MCQ blitz with a combo multiplier
//    🧩 Word Builder — spell 10 clued words to cross the lagoon
//       (curated bank: engine/minigame_words.js, banded by grade)
//    🗺️ Island Explorer — a 12-stop Mauritius geography tour
//       (curated real-place bank: engine/minigame_geo.js)
//    🥷 Number Ninja — mental-maths belts, white → black; sums are
//       GENERATED per belt, never drawn from the question bank
//    ⚔️ Brain Battle — pass-the-phone duel: 5 rounds, one question each per
//       round from the same difficulty band, sudden death on a tie
//    🕰️ Time Traveller — tap real dated events into chronological order
//       (curated fact bank: engine/minigame_time.js, years revealed after)
//
//  Billionaire lifelines (one each per game):
//    ✂️ Half & Half   — two wrong answers vanish
//    📣 Ask the Crowd — a live 3-minute public poll (vote.html /v/<CODE>);
//                       the child shares the link and watches votes arrive
//    🦉 Wise Owl      — shows the question's own hint
//    🪢 Safety Rope   — one wrong answer forgiven (auto-catches you)
//
//  Question pool: every loaded subject of the child's own grade, MCQs with 4
//  options, difficulty ramping 1→4 up the mountain. Answers here deliberately
//  do NOT touch recordAnswer()/daily stats — a game replay must never distort
//  the mastery and mistake reporting parents rely on. Game bests live under
//  DB.games (key added in Store._defaultStudent, so existing children backfill).
//
//  Gates: parent — DB.restrictions.minigamesDisabled (per child, parent
//  dashboard toggle); plan — _PLAN_GATED_SCREENS.minigames in app.js, switched
//  per plan from the admin Plans tab like every other capB feature.
// ══════════════════════════════════════════════

const MiniGames = (() => {
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const LETTERS = ['A', 'B', 'C', 'D'];


  let _g = null;          // current climb
  let _pollTimer = null;  // crowd poll countdown + refresh
  let _pollCode = null;

  // ⚠ In-progress games live only in memory. Persist to sessionStorage (per tab,
  // survives a refresh, dies on tab close) so a reload continues the game rather
  // than dropping the child back to the Game Zone. Keyed per student so two
  // children on one device never inherit each other's game.
  function _stateKey() { return 'psac-mg-state:' + (typeof ACTIVE_STUDENT_ID !== 'undefined' && ACTIVE_STUDENT_ID ? ACTIVE_STUDENT_ID : 'anon'); }
  function _persist(kind) {
    try {
      if (kind === 'billionaire' && _g && !_g.over)
        sessionStorage.setItem(_stateKey(), JSON.stringify({ game: 'billionaire', g: _g }));
      else if (kind === 'quickfire' && _qf && !_qf.over)
        sessionStorage.setItem(_stateKey(), JSON.stringify({ game: 'quickfire', qf: _qf, deadline: _qfDeadline }));
      else if (kind === 'wordbuilder' && _wb && !_wb.over)
        sessionStorage.setItem(_stateKey(), JSON.stringify({ game: 'wordbuilder', wb: _wb }));
      else if (kind === 'explorer' && _ex && !_ex.over)
        sessionStorage.setItem(_stateKey(), JSON.stringify({ game: 'explorer',
          ex: { idx: _ex.idx, tries: _ex.tries, wrongIdx: _ex.wrongIdx, stamps: _ex.stamps, score: _ex.score, qsIdx: _ex.qsIdx } }));
      else if (kind === 'ninja' && _nj && !_nj.over)
        sessionStorage.setItem(_stateKey(), JSON.stringify({ game: 'ninja', nj: _nj }));
      else if (kind === 'battle' && _bb && !_bb.over)
        sessionStorage.setItem(_stateKey(), JSON.stringify({ game: 'battle', bb: _bb }));
      else if (kind === 'timetravel' && _tt && !_tt.over)
        sessionStorage.setItem(_stateKey(), JSON.stringify({ game: 'timetravel', tt: _tt }));
    } catch (_) {}
  }
  function _clearPersist() { try { sessionStorage.removeItem(_stateKey()); } catch (_) {} }

  // Called by auth.js on a refresh whose last screen was the Game Zone.
  // Continues a saved game if one is genuinely resumable, else shows the hub.
  function resumeOrHub() {
    let saved = null;
    try { saved = JSON.parse(sessionStorage.getItem(_stateKey()) || 'null'); } catch (_) {}
    const canB = saved && saved.game === 'billionaire' && saved.g && !saved.g.over && Array.isArray(saved.g.qs) && _allowed();
    const canQ = saved && saved.game === 'quickfire' && saved.qf && !saved.qf.over && saved.deadline > Date.now() + 1500 && _allowed();
    const canW = saved && saved.game === 'wordbuilder' && saved.wb && !saved.wb.over && Array.isArray(saved.wb.words) && _allowed();
    // The explorer stash holds indices into the built-in tour, so it is only
    // resumable while the catalogue still has the same shape it was saved against.
    const canE = saved && saved.game === 'explorer' && saved.ex && Array.isArray(saved.ex.qsIdx)
      && (window.MINIGAME_GEO || []).length === saved.ex.qsIdx.length
      && saved.ex.idx < saved.ex.qsIdx.length
      && saved.ex.qsIdx.every((qi, si) => window.MINIGAME_GEO[si].qs[qi]) && _allowed();
    const canN = saved && saved.game === 'ninja' && saved.nj && !saved.nj.over
      && saved.nj.q && Array.isArray(saved.nj.q.options) && _allowed();
    const canBB = saved && saved.game === 'battle' && saved.bb && !saved.bb.over
      && Array.isArray(saved.bb.qs) && saved.bb.round * 2 + saved.bb.turn < saved.bb.qs.length && _allowed();
    const canT = saved && saved.game === 'timetravel' && saved.tt && !saved.tt.over
      && Array.isArray(saved.tt.rounds) && saved.tt.round < saved.tt.rounds.length && _allowed();
    if (typeof showScreen === 'function') showScreen('minigames');   // hub via the render hook
    if (!canB && !canQ && !canW && !canE && !canN && !canBB && !canT) { _clearPersist(); return; }
    $('mg-hub')?.classList.add('hidden');
    $('mg-game')?.classList.remove('hidden');
    if (canB) {
      _g = saved.g; _g.locked = false; _g.wrongOnce = _g.wrongOnce ?? null; _g.hidden = _g.hidden || [];
      _muted = !!(typeof DB !== 'undefined' && DB.games?.billionaire?.muted);
      _renderQ(true);
    } else if (canQ) {
      _qf = saved.qf; _qf.locked = false; _qfDeadline = saved.deadline;
      _qfRender(); _qfTick(); _qfTimer = setInterval(_qfTick, 200);
    } else if (canW) {
      _wb = saved.wb; _wb.locked = false;
      _wbRender();
    } else if (canN) {
      // The per-question deadline is not stashed; the current sum restarts
      // with its belt's full time, which errs in the child's favour.
      _nj = saved.nj; _nj.locked = false;
      _njRender(); _njStartTimer();
    } else if (canBB) {
      // Always resume at the handover screen — never mid-question with a
      // ticking timer, and never showing a question to whoever reloaded.
      _bb = saved.bb; _bb.locked = false; _bb.phase = 'ready';
      _bbRender();
    } else if (canT) {
      // A mid-placement round restarts with the full rewind timer.
      _tt = saved.tt; _tt.locked = false;
      _ttRender();
      if (_tt.phase === 'play') _ttStartTimer();
    } else {
      _ex = { stops: window.MINIGAME_GEO, qsIdx: saved.ex.qsIdx, idx: saved.ex.idx,
              tries: saved.ex.tries || 0, wrongIdx: saved.ex.wrongIdx ?? null,
              stamps: saved.ex.stamps || [], score: saved.ex.score || 0, locked: false, over: false };
      _exRender();
    }
  }

  // ── How-to-play help ───────────────────────────
  // One simple, kid-sized explanation per game, opened by the ❓ in each game's
  // top bar (and the hub cards). Timed games pause while it is open so reading
  // the rules never costs the clock.
  const HELP = {
    billionaire: { icon: '💰', title: 'Who Wants to Be a Billionaire?', lines: [
      '🎯 Answer 20 questions and climb the prize ladder all the way to Rs 1 Billion (pretend money!).',
      '🪜 The questions get harder as you climb. The last 5 are general-knowledge brain-teasers.',
      '🆘 You have 4 helpers, each used once: <b>50:50</b> removes two wrong answers, <b>📣 Ask the Crowd</b> lets friends vote, <b>🦉 Wise Owl</b> gives a hint, <b>🪢 Safety Rope</b> forgives one wrong answer.',
      '🔒 Reach question 5, 10 or 15 to lock in that prize — you keep it even if you slip later.',
      '🤝 Not sure? You can walk away any time and keep the money you have won.',
    ] },
    quickfire: { icon: '⚡', title: 'Quick Fire', lines: [
      '⏱️ The clock gives you 60 seconds. Answer as many questions as you can!',
      '✅ Every right answer scores points — answer fast for an extra speed bonus.',
      '🔥 Get several right in a row to build a <b>combo</b>. A bigger combo multiplies your points.',
      '❌ A wrong answer breaks your combo and takes 3 seconds off the clock.',
      '📣 When time runs out, you can share your score with your friends!',
    ] },
    wordbuilder: { icon: '🧩', title: 'Word Builder', lines: [
      '🧩 Spell the answer by tapping the letters in the right order.',
      '🪨 Each word you spell correctly moves you one stepping stone closer to the island — 10 stones in all.',
      '❤️ You have 3 lives. A wrong spelling costs one life.',
      '🦀 Stuck on a word? Tap the friendly crab for a hint.',
    ] },
    explorer: { icon: '🗺️', title: 'Island Explorer', lines: [
      '🗺️ Hop on the bus for a tour of 12 real places around Mauritius.',
      '❓ At each stop, read the clue and answer the geography question.',
      '⭐ A correct answer earns you a shiny gold passport stamp.',
      '🚌 Visit every stop to finish your grand tour of the island!',
    ] },
    ninja: { icon: '🥷', title: 'Number Ninja', lines: [
      '🥷 Solve quick maths sums before the timer runs out.',
      '⚡ The faster you slice the right answer, the more points you score.',
      '🥋 Keep answering to earn belts — from White all the way up to Black!',
      '❤️ A wrong answer costs a life. Don\'t let them run out!',
    ] },
  };

  let _helpRemain = 0;   // ms left on a paused timer while help is open
  function _pauseTimers() {
    if (_qf && !_qf.over && _qfTimer) { _helpRemain = Math.max(0, _qfDeadline - Date.now()); clearInterval(_qfTimer); _qfTimer = null; }
    else if (_nj && !_nj.over && _njTimer) { _helpRemain = Math.max(0, _njDeadline - Date.now()); clearInterval(_njTimer); _njTimer = null; }
    else _helpRemain = 0;
  }
  function _resumeTimers() {
    if (!_helpRemain) return;
    if (_qf && !_qf.over) { _qfDeadline = Date.now() + _helpRemain; _qfTick(); _qfTimer = setInterval(_qfTick, 200); }
    else if (_nj && !_nj.over) { _njDeadline = Date.now() + _helpRemain; _njTick(); _njTimer = setInterval(_njTick, 100); }
    _helpRemain = 0;
  }

  function showHelp(key) {
    const h = HELP[key];
    if (!h) return;
    _pauseTimers();
    let ov = $('mg-help');
    if (!ov) { ov = document.createElement('div'); ov.id = 'mg-help'; document.body.appendChild(ov); }
    ov.className = 'mg-help-overlay';
    ov.innerHTML = `
      <div class="mg-help-card mg-pop" role="dialog" aria-label="How to play">
        <div class="mg-help-head"><span class="mg-help-icon">${h.icon}</span><h3>How to play</h3></div>
        <div class="mg-help-sub">${h.title}</div>
        <ul class="mg-help-list">${h.lines.map(l => `<li>${l}</li>`).join('')}</ul>
        <button class="mg-btn-primary mg-help-close" onclick="MiniGames.closeHelp()">Got it — let's play! 🎮</button>
      </div>`;
    ov.onclick = (e) => { if (e.target === ov) closeHelp(); };
  }
  function closeHelp() {
    const ov = $('mg-help');
    if (ov) ov.remove();
    _resumeTimers();
  }
  function _helpBtn(key) { return `<button class="mg-help-btn" onclick="MiniGames.showHelp('${key}')" title="How to play" aria-label="How to play">❓</button>`; }

  function _allowed() {
    if (typeof DB !== 'undefined' && DB.restrictions?.minigamesDisabled) return false;
    return true;
  }

  // Called from renderDashboard so the tile follows the parent toggle without a
  // reload. The plan gate hides it too — a tile that only opens an upsell modal
  // is fair for features, but a games arcade a plan excludes should simply not
  // tease the child.
  function syncTile() {
    const planOk = (typeof _planAllowsFeature !== 'function') || _planAllowsFeature('minigames');
    for (const id of ['dash-games-tile', 'student-games-section']) {
      $(id)?.classList.toggle('hidden', !_allowed() || !planOk);
    }
  }

  // ── COMING SOON — design intents ───────────────
  // The mg-card-soon teasers below are commitments; when building one, this is
  // the intent. Rules every new game inherits: answers NEVER touch
  // recordAnswer()/_recordDaily(); bests self-seed under DB.games.<key> (no
  // schema change); in-progress state goes through _persist()/resumeOrHub();
  // a new curated data file must be added to the index.html script tags AND
  // sw.js SHELL_FILES in the same commit (cache.addAll is all-or-nothing), and
  // SHELL_VERSION bumped. Parent/plan gating comes free via the hub.
  //
  // 🐠 MEMORY REEF — French↔English vocabulary pairs, flip-card memory.
  //   Play: an undersea board of face-down shells; flip two to find a
  //   French word + its English meaning. Boards 4×3 → 4×4 → 5×4 by band;
  //   fewer flips = more pearls.
  //   Data: NEW engine/minigame_pairs.js — ~60 curated pairs in 3 bands.
  //   Don't reuse MINIGAME_WORDS (spelling clues, not translations) and don't
  //   scrape the question bank (games must not depend on a subject being
  //   loaded/entitled). ⚠ Pairs on one board must be unambiguous: one French
  //   word maps to exactly one English word on that board.
  //   Bests: DB.games.reef {plays, bestPearls, bestFlips per board size}.
  //
  // 🧪 POTION LAB — science classification under time pressure.
  //   Play: 3 labelled cauldrons (the round's categories) and a conveyor of
  //   items; tap the right cauldron for each item before it slides off.
  //   Round themes follow the science packs: living/non-living, solid/liquid/
  //   gas, renewable/non-renewable energy, food groups, push/pull.
  //   Data: NEW engine/minigame_lab.js — rounds {theme, categories, items:
  //   [{label, emoji, category}]}. ⚠ Classifications must be unambiguous at
  //   primary level (no edge cases like viruses in living/non-living).
  //   Bests: DB.games.lab {plays, bestScore, bestRound}.
  //
  // 🦜 ÉCOUTE! — French listening comprehension.
  //   Play: the parrot SAYS a French word/number/short sentence via
  //   speechSynthesis (fr-FR voices are already warmed at app load; ⚠ speak()
  //   must stay synchronous inside the tap for iOS — same rule as read-aloud
  //   in app.js) and the child picks what they heard from 4 close-sounding
  //   options. Curate minimal pairs on purpose (vin/vingt, chat/chaud).
  //   A 🔁 replay button capped at 2 replays; no mute (audio IS the question).
  //   ⚠ Must not dead-end when no French voice is installed: fall back to
  //   flash-card mode (show the word for 2s, hide it, then ask).
  //   Data: NEW engine/minigame_ecoute.js — items {say, options, answer},
  //   banded by grade. Bests: DB.games.ecoute {plays, bestScore, bestStreak}.
  //
  // 📖 STORY SPRINT — reading comprehension against the clock.
  //   Play: 5 short passages; read at leisure — the timer only starts after
  //   the child taps "I've finished reading" (never punish slow readers for
  //   reading) — then 3 quick questions per passage.
  //   Data: NEW engine/minigame_story.js — ~15 original mini-passages with 3
  //   MCQs each, banded by grade, English and French mixed by the child's
  //   packs. Don't extract passages from the question bank: comprehension
  //   questions there embed the passage as stimulus HTML and won't split
  //   cleanly (see the subsection-tagging notes in CLAUDE.md).
  //   Bests: DB.games.story {plays, bestScore, bestAccuracy}.

  // ── Hub ────────────────────────────────────────
  function renderHub() {
    const el = $('mg-hub');
    if (!el) return;
    // Defensive: clear any game timer still running so switching games or landing
    // on the hub never leaves an orphaned interval ticking in the background.
    if (_qfTimer) { clearInterval(_qfTimer); _qfTimer = null; }
    if (_njTimer) { clearInterval(_njTimer); _njTimer = null; }
    _stopPoll();
    if (!_allowed()) { el.innerHTML = '<p class="mg-note">🔒 Games are switched off by your parent right now.</p>'; return; }
    const best = (typeof DB !== 'undefined' && DB.games?.billionaire) || {};
    const qf = (typeof DB !== 'undefined' && DB.games?.quickfire) || {};
    const wb = (typeof DB !== 'undefined' && DB.games?.wordbuilder) || {};
    const ex = (typeof DB !== 'undefined' && DB.games?.explorer) || {};
    const nj = (typeof DB !== 'undefined' && DB.games?.ninja) || {};
    const bb = (typeof DB !== 'undefined' && DB.games?.battle) || {};
    const tt = (typeof DB !== 'undefined' && DB.games?.timetravel) || {};
    el.innerHTML = `
      <button class="mg-card mg-card-live mg-card-bq" onclick="MiniGames.startBillionaire()">
        <span class="mg-card-art">💰</span>
        <span class="mg-card-body">
          <b>Who Wants to Be a Billionaire?</b>
          <span>20 questions, a prize ladder to Rs 1 Billion (pretend!), 4 lifelines — the last 5 are brainy general knowledge!</span>
          ${best.bestPrize ? `<span class=\"mg-card-best\">🏅 Personal best: ${_money(best.bestPrize)}</span>` : '<span class=\"mg-card-best\">🌟 Can you win the billion?</span>'}
        </span>
        <span class="mg-card-go">PLAY ›</span>
      </button>
      <button class="mg-card mg-card-live mg-card-qf" onclick="MiniGames.startQuick()">
        <span class="mg-card-art">⚡</span>
        <span class="mg-card-body">
          <b>Quick Fire</b>
          <span>60 seconds on the clock — how many can you answer? Build a combo, share your score!</span>
          ${qf.bestScore ? `<span class=\"mg-card-best\">🏅 High score: ${qf.bestScore} points</span>` : '<span class=\"mg-card-best\">🌟 Set your first high score!</span>'}
        </span>
        <span class="mg-card-go">PLAY ›</span>
      </button>
      <button class="mg-card mg-card-live mg-card-wb" onclick="MiniGames.startWords()">
        <span class="mg-card-art">🧩</span>
        <span class="mg-card-body">
          <b>Word Builder</b>
          <span>Spell your way across the lagoon — 10 stepping stones, 3 lives, and a crab with hints!</span>
          ${wb.bestScore ? `<span class=\"mg-card-best\">🏅 Best: ${wb.bestStones}/10 stones · ${wb.bestScore} pts</span>` : '<span class=\"mg-card-best\">🌟 Can you reach the island?</span>'}
        </span>
        <span class="mg-card-go">PLAY ›</span>
      </button>
      <button class="mg-card mg-card-live mg-card-ex" onclick="MiniGames.startExplorer()">
        <span class="mg-card-art">🗺️</span>
        <span class="mg-card-body">
          <b>Island Explorer</b>
          <span>Tour 12 real places around Mauritius, crack the geography clues, collect gold passport stamps!</span>
          ${ex.bestScore ? `<span class=\"mg-card-best\">🏅 Best tour: ${ex.bestGold} gold stamps · ${ex.bestScore} pts</span>` : '<span class=\"mg-card-best\">🌟 Stamp your first passport!</span>'}
        </span>
        <span class="mg-card-go">PLAY ›</span>
      </button>
      <button class="mg-card mg-card-live mg-card-nj" onclick="MiniGames.startNinja()">
        <span class="mg-card-art">🥷</span>
        <span class="mg-card-body">
          <b>Number Ninja</b>
          <span>Slice through quick sums before the clock runs out — mental-maths reflexes, with belts to earn from white to black!</span>
          ${nj.bestBelts ? `<span class=\"mg-card-best\">🏅 Best: ${['White','Yellow','Orange','Green','Blue','Brown','Black'][nj.bestBelts - 1]} Belt · ${nj.bestScore} pts</span>` : '<span class=\"mg-card-best\">🌟 Earn your first belt!</span>'}
        </span>
        <span class="mg-card-go">PLAY ›</span>
      </button>
      <button class="mg-card mg-card-live mg-card-bb" onclick="MiniGames.startBattle()">
        <span class="mg-card-art">⚔️</span>
        <span class="mg-card-body">
          <b>Brain Battle</b>
          <span>Pass-the-phone duel — challenge a friend or sibling to a head-to-head quiz and see who takes the crown!</span>
          ${bb.plays ? `<span class=\"mg-card-best\">🏅 ${bb.plays} duel${bb.plays === 1 ? '' : 's'} fought · 🦁 ${bb.p1Wins || 0} – ${bb.p2Wins || 0} 🐯</span>` : '<span class=\"mg-card-best\">🌟 Who takes the crown?</span>'}
        </span>
        <span class="mg-card-go">PLAY ›</span>
      </button>
      <button class="mg-card mg-card-live mg-card-tt" onclick="MiniGames.startTimeTravel()">
        <span class="mg-card-art">🕰️</span>
        <span class="mg-card-body">
          <b>Time Traveller</b>
          <span>Journey through Mauritius history — put famous events, explorers and heroes back in the right order before time rewinds!</span>
          ${tt.bestScore ? `<span class=\"mg-card-best\">🏅 Best: ${tt.bestScore} pts · ${tt.bestPerfect || 0}/8 perfect rounds</span>` : '<span class=\"mg-card-best\">🌟 Take your first journey!</span>'}
        </span>
        <span class="mg-card-go">PLAY ›</span>
      </button>
      <div class="mg-card mg-card-soon">
        <span class="mg-card-art">🐠</span>
        <span class="mg-card-body">
          <b>Memory Reef</b>
          <span>Flip the shells and match French words to their English meanings — the fewer flips, the more pearls you keep!</span>
        </span>
        <span class="mg-card-lock">COMING SOON</span>
      </div>
      <div class="mg-card mg-card-soon">
        <span class="mg-card-art">🧪</span>
        <span class="mg-card-body">
          <b>Potion Lab</b>
          <span>Sort living things, materials and energy into the right cauldrons before they slide off the lab bench!</span>
        </span>
        <span class="mg-card-lock">COMING SOON</span>
      </div>
      <div class="mg-card mg-card-soon">
        <span class="mg-card-art">🦜</span>
        <span class="mg-card-body">
          <b>Écoute !</b>
          <span>The parrot speaks French — listen carefully and pick exactly what it said. Watch out for tricky sound-alikes!</span>
        </span>
        <span class="mg-card-lock">COMING SOON</span>
      </div>
      <div class="mg-card mg-card-soon">
        <span class="mg-card-art">📖</span>
        <span class="mg-card-body">
          <b>Story Sprint</b>
          <span>Read a short story at your own pace, then race the clock on three questions — the timer waits until you're ready!</span>
        </span>
        <span class="mg-card-lock">COMING SOON</span>
      </div>
      <p class="mg-fineprint">⚙️ The site is being updated, so some game questions may contain small errors. If one looks wrong, please report it from Practice with 🚩 Report question so an admin can fix it. 🙏</p>`;
    $('mg-game')?.classList.add('hidden');
    el.classList.remove('hidden');
  }

  // ══════════════════════════════════════════════
  //  WHO WANTS TO BE A BILLIONAIRE? — the flagship quiz.
  //
  //  20 questions up a prize ladder to Rs 1 billion, TV-quiz style.
  //    Q1–10  : the child's own grade, easy → medium
  //    Q11–15 : the hardest textbook questions (word problems / level 4)
  //    Q16–20 : GENERAL KNOWLEDGE (window.MINIGAME_GK) — the same subjects,
  //             reaching beyond the book; each shows its subject + topic.
  //  Safe havens at Q5, Q10 and Q15: clear one and that prize is guaranteed.
  //  A distinct name and look on purpose — no show's logo, music or wording.
  // ══════════════════════════════════════════════
  const PRIZES = [100, 200, 300, 500, 1000,
                  2000, 4000, 8000, 16000, 50000,
                  100000, 250000, 500000, 1000000, 10000000,
                  50000000, 100000000, 250000000, 500000000, 1000000000];
  const SAFE = [4, 9, 14];                    // clearing these rungs guarantees the prize
  const BILL_LADDER = [1, 1, 1, 2, 2, 2, 2, 3, 3, 3,   // Q1–10
                       4, 4, 4, 4, 4];                  // Q11–15 (Q16–20 come from GK)

  function _money(n) {
    if (n >= 1000000000) return 'Rs ' + (n / 1000000000) + ' Billion';
    if (n >= 1000000) return 'Rs ' + (n / 1000000) + ' Million';
    return 'Rs ' + n.toLocaleString('en-US');
  }

  // ── TV-style sounds, synthesised (no audio files = no copyright) ──────
  let _actx = null, _muted = false;
  function _audio() {
    if (_muted) return null;
    try { if (!_actx) _actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) { return null; }
    if (_actx.state === 'suspended') _actx.resume().catch(() => {});
    return _actx;
  }
  function _tone(freq, start, dur, type, gain) {
    const a = _audio(); if (!a) return;
    const o = a.createOscillator(), g = a.createGain();
    o.type = type || 'sine'; o.frequency.value = freq;
    const t0 = a.currentTime + start;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain || 0.25, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(a.destination);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }
  const _sfx = {
    lockin() { _tone(180, 0, 0.18, 'sine', 0.3); _tone(120, 0.14, 0.5, 'sine', 0.3); }, // suspense "dun-dunnn"
    correct() { _tone(660, 0, 0.12, 'sine', 0.3); _tone(880, 0.1, 0.18, 'sine', 0.3); _tone(1174, 0.24, 0.3, 'sine', 0.28); }, // bright ascending ding
    wrong() { _tone(200, 0, 0.5, 'sawtooth', 0.22); _tone(150, 0.06, 0.55, 'sawtooth', 0.18); }, // low buzzer
    win() { [523, 659, 784, 1046, 1318].forEach((f, i) => _tone(f, i * 0.12, 0.35, 'triangle', 0.3)); }, // fanfare
    walk() { _tone(440, 0, 0.15, 'sine', 0.25); _tone(330, 0.13, 0.3, 'sine', 0.22); },
  };
  function toggleMute() {
    _muted = !_muted;
    if (typeof DB !== 'undefined') { DB.games = DB.games || {}; DB.games.billionaire = DB.games.billionaire || { plays: 0, bestLevel: 0, bestPrize: 0 }; DB.games.billionaire.muted = _muted; if (typeof save === 'function') save(DB); }
    const btn = $('mg-mute'); if (btn) btn.textContent = _muted ? '🔇' : '🔊';
    if (!_muted) _tone(660, 0, 0.1, 'sine', 0.2);
  }

  // ── Question sourcing ──────────────────────────

  // Returns false for questions that don't belong in timed games:
  //   • comprehension passages (huge question text with the whole extract embedded)
  //   • subsections explicitly labelled as reading/passage/comprehension
  // Uses two independent signals so either one is enough to exclude.
  const _PASSAGE_RE = /\b(comprehension|passage|reading|texte|extrait|prose|paragraphe|paragraph)\b/i;
  function _timedSafe(q) {
    if (_PASSAGE_RE.test(q.subsection || '')) return false;
    const plain = (q.question || '').replace(/<[^>]*>/g, '').trim();
    return plain.length <= 280;
  }

  function _gradePool() {
    const grade = (typeof Auth !== 'undefined' && Auth.getActiveAccount?.()?.grade)
      || (typeof SELECTED_GRADE !== 'undefined' && SELECTED_GRADE) || 5;
    const packs = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [])
      .filter(p => p.grade === grade && !p.comingSoon);
    const chapterIds = new Set(packs.flatMap(p => (p._chapters || p.chapters || []).map(c => c.id)));
    let pool = (typeof STATIC_QUESTIONS !== 'undefined' ? STATIC_QUESTIONS : [])
      .filter(q => q.type === 'mcq' && Array.isArray(q.options) && q.options.length === 4 && q.id && chapterIds.has(q.chapterId) && _timedSafe(q));
    if (pool.length < 40) pool = (typeof STATIC_QUESTIONS !== 'undefined' ? STATIC_QUESTIONS : [])
      .filter(q => q.type === 'mcq' && Array.isArray(q.options) && q.options.length === 4 && q.id && _timedSafe(q));
    return { pool, grade, packs };
  }

  // chapterId → "Subject · Chapter", built once from the packs.
  let _chLabels = null;
  function _chapterLabel(chapterId) {
    if (!_chLabels) {
      _chLabels = {};
      (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : []).forEach(p =>
        (p._chapters || p.chapters || []).forEach(c => { _chLabels[c.id] = (p.subject || p.name || '') + ' · ' + (c.name || ''); }));
    }
    return _chLabels[chapterId] || 'Textbook question';
  }

  // Which GK subjects this child's grade actually studies.
  function _gkSubjects(packs) {
    const map = [[/math/i, 'maths'], [/english/i, 'english'], [/french|français/i, 'french'],
                 [/science/i, 'science'], [/histor|geog/i, 'histgeo']];
    const on = new Set();
    packs.forEach(p => { const n = (p.subject || p.name || ''); map.forEach(([re, k]) => { if (re.test(n)) on.add(k); }); });
    return on.size ? on : new Set(['maths', 'english', 'french', 'science', 'histgeo']);
  }

  function _pickBillionaire() {
    const { pool, packs } = _gradePool();
    if (pool.length < 10) return null;
    const byDiff = { 1: [], 2: [], 3: [], 4: [] };
    for (const q of pool) (byDiff[q.difficulty] || byDiff[2]).push(q);
    const used = new Set();
    const take = (want) => {
      for (const d of [want, want - 1, want + 1, want - 2, want + 2]) {
        const bucket = (byDiff[d] || []).filter(q => !used.has(q.id));
        if (bucket.length) { const q = bucket[Math.floor(Math.random() * bucket.length)]; used.add(q.id); return q; }
      }
      const rest = pool.filter(q => !used.has(q.id));
      const q = rest[Math.floor(Math.random() * rest.length)]; if (q) used.add(q.id); return q;
    };
    // 15 textbook questions (10 easy→medium, 5 hardest)
    const textbook = BILL_LADDER.map(take).filter(Boolean).map(q => ({
      question: q.question, options: q.options.slice(0, 4), answer: q.answer,
      explanation: q.explanation, hint: q.hint, _label: _chapterLabel(q.chapterId), _gk: false,
    }));
    // 5 general-knowledge, one per subject where possible, from this grade's subjects
    const bank = (window.MINIGAME_GK || []).slice();
    const subs = _gkSubjects(packs);
    const eligible = bank.filter(q => subs.has(q.subject));
    const gk = [];
    const bySub = {};
    (eligible.length ? eligible : bank).forEach(q => (bySub[q.subject] ||= []).push(q));
    const subOrder = Object.keys(bySub).sort(() => Math.random() - 0.5);
    // round-robin the subjects so the last five span different subjects
    let guard = 0;
    while (gk.length < 5 && guard++ < 40) {
      for (const s of subOrder) {
        if (gk.length >= 5) break;
        const arr = bySub[s];
        if (arr && arr.length) {
          const q = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
          gk.push({ question: q.question, options: q.options.slice(0, 4), answer: q.answer,
            explanation: q.explanation, _label: 'General knowledge · ' + q.topic, _gk: true });
        }
      }
    }
    const all = textbook.concat(gk);
    return all.length >= 15 ? all.slice(0, 20) : null;
  }

  // ── Starting a game ────────────────────────────
  function startBillionaire() {
    const qs = _pickBillionaire();
    if (!qs) { toast('Questions are still loading — try again in a moment!', 3000); return; }
    _muted = !!(typeof DB !== 'undefined' && DB.games?.billionaire?.muted);
    _g = {
      qs, rung: 0, banked: 0, over: false, locked: false,
      lifelines: { half: true, crowd: true, owl: true, rope: true },
      hidden: [], wrongOnce: null,
    };
    _audio();                                   // unlock audio inside the tap
    $('mg-hub')?.classList.add('hidden');
    const game = $('mg-game');
    if (game) game.classList.remove('hidden');
    _renderQ();
  }

  function _lockedPrize() {
    let s = 0;
    for (const idx of SAFE) if (_g.rung > idx) s = PRIZES[idx];
    return s;
  }

  function _ladderHtml() {
    return `<div class="bq-ladder">${PRIZES.map((p, i) => {
      const cls = i === _g.rung ? 'now' : i < _g.rung ? 'done' : '';
      const safe = SAFE.includes(i) ? ' safe' : '';
      return `<div class="bq-rung ${cls}${safe}"><span class="bq-lvl">${i + 1}</span><b>${_money(p)}</b></div>`;
    }).reverse().join('')}</div>`;
  }

  function _lifelineHtml() {
    const L = _g.lifelines;
    const b = (key, icon, label) =>
      `<button class="bq-life ${L[key] ? '' : 'used'}" ${L[key] ? '' : 'disabled'}
        onclick="MiniGames.life('${key}')" title="${label}"><span>${icon}</span><small>${label}</small></button>`;
    return b('half', '50:50', 'Half & Half') + b('crowd', '📣', 'Ask the Crowd')
         + b('owl', '🦉', 'Wise Owl') + b('rope', '🪢', 'Safety Rope');
  }

  function _renderQ(keep) {
    const game = $('mg-game');
    if (!game || !_g) return;
    const q = _g.qs[_g.rung];
    // keep=true on RESUME: preserve this question's 50:50 / rope state instead of
    // clearing it (a fresh question passes nothing and resets).
    if (!keep) { _g.hidden = []; _g.wrongOnce = null; }
    const tier = _g.rung < 10 ? '' : _g.rung < 15 ? '<span class="bq-tier hard">🔥 Harder</span>' : '<span class="bq-tier gk">🧠 General knowledge</span>';
    game.innerHTML = `
      <div class="bq-stage">
        <div class="bq-topbar">
          <button class="bq-quit" onclick="MiniGames.confirmQuit()">✕</button>${_helpBtn('billionaire')}
          <div class="bq-lifes">${_lifelineHtml()}</div>
          <button class="bq-mute" id="mg-mute" onclick="MiniGames.toggleMute()" title="Sound on/off">${_muted ? '🔇' : '🔊'}</button>
        </div>
        <div class="bq-main">
          <div class="bq-prize-now">Question ${_g.rung + 1} of 20 · playing for <b>${_money(PRIZES[_g.rung])}</b> ${tier}</div>
          <button class="bq-walk" onclick="MiniGames.walkAway()" ${_g.rung === 0 ? 'disabled' : ''}>Walk away with ${_money(_g.rung ? PRIZES[_g.rung - 1] : 0)}</button>
          <div class="bq-qwrap mg-pop">
            <div class="bq-source">${q._label}</div>
            <div class="bq-qcard"><div class="bq-qtext">${q.question}</div></div>
          </div>
          <div class="bq-opts">${q.options.map((o, i) => `
            <button class="bq-opt" id="mg-opt-${i}" onclick="MiniGames.answer(${i})">
              <span class="bq-tag">${LETTERS[i]}</span><span class="bq-optext">${o}</span>
            </button>`).join('')}
          </div>
          <div id="mg-msg" class="mg-msg hidden"></div>
          <div id="mg-poll" class="mg-poll hidden"></div>
          <p class="mg-fineprint">🎓 Educational game — the rupees are pretend, no real money can be won.</p>
        </div>
        ${_ladderHtml()}
      </div>`;
    (_g.hidden || []).forEach(k => { const el = $('mg-opt-' + k); if (el) { el.classList.add('gone'); el.disabled = true; } });
    if (_g.wrongOnce != null) $('mg-opt-' + _g.wrongOnce)?.classList.add('wrong');
    _persist('billionaire');
  }

  // ── Answering ──────────────────────────────────
  function answer(i) {
    if (!_g || _g.locked || _g.over || _g.hidden.includes(i) || i === _g.wrongOnce) return;
    const q = _g.qs[_g.rung];
    const correct = q.options[i] === q.answer;
    _g.locked = true;
    _stopPoll();
    const btn = $('mg-opt-' + i);
    btn?.classList.add('picked');
    document.querySelectorAll('.bq-opt').forEach(b => b.classList.add('waiting'));
    _sfx.lockin();
    // suspense beat, then the reveal — this pause is the whole feel of the format
    setTimeout(() => {
      document.querySelectorAll('.bq-opt').forEach(b => b.classList.remove('waiting'));
      if (correct) return _correct(i);
      if (_g.lifelines.rope) {
        _g.lifelines.rope = false;
        _g.wrongOnce = i;
        _g.locked = false;
        btn?.classList.remove('picked');
        btn?.classList.add('wrong', 'shake');
        _sfx.wrong();
        _msg('🪢 <b>Safety Rope!</b> That was wrong — but the rope caught you. Pick again.');
        const lifes = document.querySelector('.bq-lifes');
        if (lifes) lifes.innerHTML = _lifelineHtml();
        _persist('billionaire');
        return;
      }
      _slip(i);
    }, 1600);
  }

  function _flashLadder() {
    const ladder = document.querySelector('.bq-ladder');
    if (!ladder) return;
    ladder.classList.add('bq-ladder-peek');
    const now = ladder.querySelector('.bq-rung.now');
    if (now) now.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    clearTimeout(_flashLadder._t);
    _flashLadder._t = setTimeout(() => ladder.classList.remove('bq-ladder-peek'), 2200);
  }

  function _correct(i) {
    const btn = $('mg-opt-' + i);
    btn?.classList.remove('picked');
    btn?.classList.add('right', 'pulse');
    _sfx.correct();
    _flashLadder();
    const safeNow = SAFE.includes(_g.rung);
    _msg(`✅ <b>Correct!</b> You've won <b>${_money(PRIZES[_g.rung])}</b>!${safeNow ? ' 🔒 This prize is now guaranteed!' : ''}`);
    if (_g.rung >= 9 && typeof launchConfetti === 'function') launchConfetti(40 + _g.rung * 8);
    _g.rung++;
    setTimeout(() => {
      _g.locked = false;
      if (_g.rung >= PRIZES.length) return _jackpot();
      _renderQ();
    }, 1700);
  }

  function _slip(i) {
    const q = _g.qs[_g.rung];
    $('mg-opt-' + i)?.classList.add('wrong', 'shake');
    const rightIdx = q.options.findIndex(o => o === q.answer);
    $('mg-opt-' + rightIdx)?.classList.add('right');
    _sfx.wrong();
    _flashLadder();
    _g.banked = _lockedPrize();
    setTimeout(() => _finish(false, q), 900);
  }

  function walkAway() {
    if (!_g || _g.locked || !_g.rung) return;
    _g.banked = PRIZES[_g.rung - 1];
    _sfx.walk();
    _finish('walk');
  }

  function _jackpot() {
    _g.banked = PRIZES[PRIZES.length - 1];
    _sfx.win();
    if (typeof launchConfetti === 'function') { launchConfetti(240); setTimeout(() => launchConfetti(180), 500); setTimeout(() => launchConfetti(160), 1000); }
    _finish('jackpot');
  }

  function _finish(how, q) {
    _g.over = true;
    _stopPoll();
    _clearPersist();
    _saveBest();
    const game = $('mg-game');
    if (!game) return;
    const level = _g.rung;
    const head = how === 'jackpot'
        ? { icon: '🏆', title: 'YOU WON THE BILLION!', sub: `All 20 questions — you're a PSAC Billionaire! Legendary.` }
      : how === 'walk'
        ? { icon: '🤝', title: 'You walked away a winner', sub: `Smart move — you banked ${_money(_g.banked)} after ${level} correct.` }
        : { icon: '💥', title: 'Wrong answer!', sub: `You reached question ${level + 1}${_g.banked ? `, and a safe haven kept ${_money(_g.banked)}` : ''}.` };
    const best = (typeof DB !== 'undefined' && DB.games?.billionaire) || {};
    game.innerHTML = `
      <div class="mg-end mg-pop">
        <div class="mg-end-icon">${head.icon}</div>
        <h3>${head.title}</h3>
        <p>${head.sub}</p>
        ${q && how === false ? `<div class="mg-end-learn"><b>The answer was:</b> ${esc(q.answer)}${q.explanation ? `<br><span>${q.explanation}</span>` : ''}</div>` : ''}
        <div class="mg-end-stars">💰 ${_money(_g.banked)} banked</div>
        ${best.bestPrize ? `<p class="bq-best">🏅 Your best: ${_money(best.bestPrize)}</p>` : ''}
        <p class="mg-fineprint">🎓 Educational game — the rupees are pretend, no real money can be won.</p>
        <div class="mg-end-row">
          <button class="mg-btn-primary" onclick="MiniGames.startBillionaire()">🔁 Play again</button>
          <button class="mg-btn-ghost" onclick="MiniGames.renderHub()">🎮 All games</button>
        </div>
      </div>`;
  }

  function _saveBest() {
    if (typeof DB === 'undefined' || !DB.stats) return;
    DB.games = DB.games || {};
    const p = DB.games.billionaire = DB.games.billionaire || { plays: 0, bestLevel: 0, bestPrize: 0 };
    p.plays++;
    if (_g.rung > (p.bestLevel || 0)) p.bestLevel = _g.rung;
    if (_g.banked > (p.bestPrize || 0)) p.bestPrize = _g.banked;
    if (typeof save === 'function') save(DB);
  }

  function confirmQuit() {
    if (_g && !_g.over && _g.rung > 0) {
      if (!confirm('Leave the game? You keep only a guaranteed safe-haven prize.')) return;
    }
    _stopPoll();
    _clearPersist();
    _g = null;
    renderHub();
  }


  function _msg(html) {
    const m = $('mg-msg');
    if (m) { m.innerHTML = html; m.classList.remove('hidden'); }
  }

  // ── Lifelines ──────────────────────────────────
  function life(key) {
    if (!_g || _g.locked || _g.over || !_g.lifelines[key]) return;
    if (key === 'half') return _half();
    if (key === 'owl') return _owl();
    if (key === 'crowd') return _crowd();
    if (key === 'rope') {
      _msg('🪢 The Safety Rope is already tied on — it catches your first wrong answer automatically!');
    }
  }

  function _half() {
    const q = _g.qs[_g.rung];
    const wrongs = q.options.map((o, i) => o === q.answer ? -1 : i).filter(i => i >= 0 && i !== _g.wrongOnce);
    while (_g.hidden.length < 2 && wrongs.length) {
      const k = wrongs.splice(Math.floor(Math.random() * wrongs.length), 1)[0];
      _g.hidden.push(k);
      const b = $('mg-opt-' + k);
      if (b) { b.classList.add('gone'); b.disabled = true; }
    }
    _g.lifelines.half = false;
    document.querySelector('.bq-lifes').innerHTML = _lifelineHtml();
    _persist('billionaire');
    _msg('✂️ <b>Half &amp; Half!</b> Two wrong answers are gone.');
  }

  function _owl() {
    const q = _g.qs[_g.rung];
    if (!q.hint) { _msg('🦉 The owl peers at this one… <i>"No hint for this one — trust yourself!"</i> (Your owl is saved for later.)'); return; }
    _g.lifelines.owl = false;
    document.querySelector('.bq-lifes').innerHTML = _lifelineHtml();
    _persist('billionaire');
    _msg(`🦉 <b>The Wise Owl whispers:</b> <i>${q.hint}</i>`);
  }

  // ── Ask the Crowd ──────────────────────────────
  async function _crowd() {
    if (typeof _sb === 'undefined' || !_sb) { _msg('📣 The crowd needs an internet connection!'); return; }
    const q = _g.qs[_g.rung];
    const visible = q.options.map((o, i) => _g.hidden.includes(i) ? null : o).filter(o => o !== null);
    _msg('📣 Calling the crowd…');
    const { data, error } = await _sb.rpc('minigame_poll_create', { p_question: q.question, p_options: visible });
    if (error || !data || data.ok !== true) {
      const why = (data && data.error) || error?.message || '';
      _msg(why === 'not_signed_in'
        ? '📣 The crowd poll needs a student sign-in — a parent preview can\'t open one.'
        : why === 'too_many'
          ? '📣 The crowd needs a rest! Try this lifeline again in a little while.'
          : '📣 Could not reach the crowd — check your connection and try again.');
      return;
    }
    _g.lifelines.crowd = false;
    document.querySelector('.bq-lifes').innerHTML = _lifelineHtml();
    _persist('billionaire');
    _msg('');
    $('mg-msg')?.classList.add('hidden');
    _pollCode = data.code;
    _openPollPanel(visible, q, data.seconds || 180);
  }

  function _pollUrl() {
    // /v/<CODE> needs the Netlify rewrite; a local or file:// dev session gets
    // the query-string form vote.html understands everywhere.
    return /^https?:$/.test(location.protocol) && !/localhost|127\./.test(location.hostname)
      ? `${location.origin}/v/${_pollCode}`
      : `${location.origin}/vote.html?code=${_pollCode}`;
  }

  function _openPollPanel(visible, q, seconds) {
    const panel = $('mg-poll');
    if (!panel) return;
    const letters = q.options.map((o, i) => ({ o, l: LETTERS[i] })).filter(x => visible.includes(x.o));
    panel.classList.remove('hidden');
    panel.innerHTML = `
      <div class="mg-poll-head">📣 <b>The crowd is voting!</b> <span id="mg-poll-clock">3:00</span></div>
      <div class="mg-poll-share">
        <button class="mg-btn-primary" onclick="MiniGames.shareWhatsApp()">💬 WhatsApp</button>
        <button class="mg-btn-ghost" onclick="MiniGames.copyPollLink(this)">🔗 Copy link</button>
      </div>
      <div id="mg-poll-bars">${letters.map((x, i) => `
        <div class="mg-bar-row"><div class="mg-bar-head"><span>${x.l}</span><span id="mg-bar-n-${i}">0</span></div>
        <div class="mg-bar-track"><div class="mg-bar-fill" id="mg-bar-${i}" style="width:0%"></div></div></div>`).join('')}
      </div>
      <p class="mg-poll-tip">Votes appear live — but the final answer is <b>yours</b>. Tap an option above when you're ready!</p>`;
    let left = seconds;
    const tick = async () => {
      left -= 3;
      const clock = $('mg-poll-clock');
      if (clock) clock.textContent = Math.max(0, Math.floor(left / 60)) + ':' + String(Math.max(0, left % 60)).padStart(2, '0');
      try {
        const { data } = await _sb.rpc('minigame_poll_results', { p_code: _pollCode });
        if (data?.ok) {
          const total = data.votes.reduce((a, b) => a + b, 0) || 1;
          data.votes.forEach((n, i) => {
            const bar = $('mg-bar-' + i), num = $('mg-bar-n-' + i);
            if (bar) bar.style.width = Math.round(n / total * 100) + '%';
            if (num) num.textContent = n;
          });
          if (data.seconds_left <= 0) {
            _stopPoll();
            const clock2 = $('mg-poll-clock');
            if (clock2) clock2.textContent = 'closed';
          }
        }
      } catch (_) {}
      if (left <= 0) _stopPoll();
    };
    _pollTimer = setInterval(tick, 3000);
    tick();
  }

  function _stopPoll() {
    if (_pollTimer) { clearInterval(_pollTimer); _pollTimer = null; }
  }

  function shareWhatsApp() {
    const text = `📣 Help me climb the peak! Vote on my quiz question (open for 3 minutes!):\n${_pollUrl()}`;
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank', 'noopener');
  }

  function copyPollLink(btn) {
    const url = _pollUrl();
    const done = () => { if (btn) { btn.textContent = '✅ Copied!'; setTimeout(() => { btn.textContent = '🔗 Copy link'; }, 2000); } };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(url).then(done).catch(() => prompt('Copy this link:', url));
    else prompt('Copy this link:', url);
  }

  // ── Entry ──────────────────────────────────────

  // ══════════════════════════════════════════════
  //  QUICK FIRE ⚡ — 60 seconds, as many as you can.
  //
  //  Rapid MCQs from the child's own grade. A correct answer adds time-scaled
  //  points and grows a combo multiplier; a wrong one breaks the combo and
  //  costs 3 seconds. No lifelines, no ladder — pure speed and streak. Same
  //  rule as the ladder: nothing here touches recordAnswer()/daily, so a blitz
  //  replay never distorts a parent's mastery view. Best score lives in
  //  DB.games.quickfire.
  // ══════════════════════════════════════════════
  const QF_SECONDS = 60;
  const QF_PENALTY = 3;
  let _qf = null, _qfTimer = null, _qfDeadline = 0;

  function startQuick() {
    if (!_gradePool().pool.length) { toast('Questions are still loading — try again in a moment!', 3000); return; }
    // …but Quick Fire wants a big shuffled stream, not a 10-rung ladder.
    const pool = _quickPool();
    _qf = { pool, idx: 0, score: 0, correct: 0, answered: 0, combo: 0, bestCombo: 0, over: false, locked: false };
    _qfDeadline = Date.now() + QF_SECONDS * 1000;
    $('mg-hub')?.classList.add('hidden');
    const game = $('mg-game');
    if (game) game.classList.remove('hidden');
    _qfRender();
    _qfTick();
    _qfTimer = setInterval(_qfTick, 200);
  }

  function _quickPool() {
    const grade = (typeof Auth !== 'undefined' && Auth.getActiveAccount?.()?.grade)
      || (typeof SELECTED_GRADE !== 'undefined' && SELECTED_GRADE) || 5;
    const packs = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [])
      .filter(p => p.grade === grade && !p.comingSoon);
    const chapterIds = new Set(packs.flatMap(p => (p._chapters || p.chapters || []).map(c => c.id)));
    let pool = (typeof STATIC_QUESTIONS !== 'undefined' ? STATIC_QUESTIONS : [])
      .filter(q => q.type === 'mcq' && Array.isArray(q.options) && q.options.length >= 2 && q.id && chapterIds.has(q.chapterId) && _timedSafe(q));
    if (pool.length < 20) pool = (typeof STATIC_QUESTIONS !== 'undefined' ? STATIC_QUESTIONS : [])
      .filter(q => q.type === 'mcq' && Array.isArray(q.options) && q.options.length >= 2 && q.id && _timedSafe(q));
    // Easy-first so the clock feels beatable, then let it drift harder.
    pool.sort((a, b) => (a.difficulty || 2) - (b.difficulty || 2) || Math.random() - 0.5);
    return pool;
  }

  function _qfMultiplier() { return 1 + Math.min(4, Math.floor(_qf.combo / 3)); }  // ×1 … ×5

  function _qfTick() {
    const left = Math.max(0, _qfDeadline - Date.now());
    const bar = $('qf-time-fill'), num = $('qf-time-num');
    if (bar) bar.style.width = (left / (QF_SECONDS * 1000) * 100) + '%';
    if (num) num.textContent = Math.ceil(left / 1000);
    if (bar) bar.classList.toggle('low', left < 10000);
    if (left <= 0) _qfEnd();
  }

  function _qfRender() {
    const game = $('mg-game');
    if (!game || !_qf) return;
    const q = _qf.pool[_qf.idx % _qf.pool.length];
    // Up to 4 options; keep the child's reading light under a ticking clock.
    const opts = q.options.slice(0, 4);
    game.innerHTML = `
      <div class="qf-hud">
        <button class="mg-quit" onclick="MiniGames.qfQuit()">✕</button>${_helpBtn('quickfire')}
        <div class="qf-score"><b id="qf-score">${_qf.score}</b><small>points</small></div>
        <div class="qf-combo ${_qf.combo >= 3 ? 'hot' : ''}" id="qf-combo">${_qf.combo >= 3 ? '🔥 ×' + _qfMultiplier() : 'combo ' + _qf.combo}</div>
      </div>
      <div class="qf-timebar"><div class="qf-timebar-fill" id="qf-time-fill"></div><span id="qf-time-num">${QF_SECONDS}</span></div>
      <div class="qf-qcard mg-pop"><div class="qf-qtext">${q.question}</div></div>
      <div class="qf-opts">${opts.map((o, i) => `
        <button class="qf-opt" id="qf-opt-${i}" onclick="MiniGames.qfAnswer(${i})">
          <span class="mg-tag">${LETTERS[i]}</span><span class="mg-optext">${o}</span>
        </button>`).join('')}
      </div>
      <p class="qf-hint">Fast + no mistakes = a big combo multiplier. Wrong answers cost ${QF_PENALTY}s!</p>`;
    _persist('quickfire');
  }

  function qfAnswer(i) {
    if (!_qf || _qf.over || _qf.locked) return;
    const q = _qf.pool[_qf.idx % _qf.pool.length];
    const chosen = q.options.slice(0, 4)[i];
    const correct = chosen === q.answer;
    _qf.locked = true;
    _qf.answered++;
    const btn = $('qf-opt-' + i);
    if (correct) {
      const left = Math.max(0, _qfDeadline - Date.now());
      const speedBonus = Math.round(left / 1000 / 6);           // faster = a touch more
      const gained = (10 + speedBonus) * _qfMultiplier();
      _qf.score += gained;
      _qf.correct++;
      _qf.combo++;
      _qf.bestCombo = Math.max(_qf.bestCombo, _qf.combo);
      btn?.classList.add('right');
      _qfFloat('+' + gained, true);
      if (_qf.combo && _qf.combo % 5 === 0 && typeof launchConfetti === 'function') launchConfetti(40);
    } else {
      _qfDeadline -= QF_PENALTY * 1000;                         // time bleed, not a hard stop
      _qf.combo = 0;
      btn?.classList.add('wrong');
      const rightIdx = q.options.slice(0, 4).findIndex(o => o === q.answer);
      $('qf-opt-' + rightIdx)?.classList.add('right');
      _qfFloat('−' + QF_PENALTY + 's', false);
      if (navigator.vibrate) { try { navigator.vibrate(60); } catch (_) {} }
    }
    // brief hold so the child sees right/wrong, then the next card snaps in
    setTimeout(() => {
      if (_qf.over) return;
      _qf.idx++;
      _qf.locked = false;
      if (Date.now() >= _qfDeadline) return _qfEnd();
      _qfRender();
    }, correct ? 260 : 620);
  }

  function _qfFloat(text, good) {
    const game = $('mg-game');
    if (!game) return;
    const f = document.createElement('div');
    f.className = 'qf-float ' + (good ? 'good' : 'bad');
    f.textContent = text;
    game.appendChild(f);
    setTimeout(() => f.remove(), 900);
  }

  function _qfEnd() {
    if (_qf.over) return;
    _qf.over = true;
    clearInterval(_qfTimer); _qfTimer = null;
    _qfSaveBest();
    _clearPersist();
    const best = (typeof DB !== 'undefined' && DB.games?.quickfire) || {};
    const isRecord = _qf.score >= (best.bestScore || 0) && _qf.score > 0;
    if (_qf.score > 0 && typeof launchConfetti === 'function') launchConfetti(isRecord ? 200 : 90);
    const acc = _qf.answered ? Math.round(_qf.correct / _qf.answered * 100) : 0;
    const game = $('mg-game');
    if (!game) return;
    game.innerHTML = `
      <div class="mg-end mg-pop">
        <div class="mg-end-icon">${isRecord ? '🏆' : '⚡'}</div>
        <h3>${isRecord ? 'NEW HIGH SCORE!' : "Time's up!"}</h3>
        <p>${_qf.correct} correct answers${_qf.bestCombo >= 3 ? ` · best combo 🔥 ×${1 + Math.min(4, Math.floor(_qf.bestCombo / 3))}` : ''}</p>
        <div class="qf-scoreboard">
          <div><b>${_qf.score}</b><span>points</span></div>
          <div><b>${_qf.correct}</b><span>correct</span></div>
          <div><b>${acc}%</b><span>accuracy</span></div>
        </div>
        <div class="qf-share-card" id="qf-share-card">
          <div class="qf-share-top">⚡ Quick Fire · PSAC Practice</div>
          <div class="qf-share-score">${_qf.score}</div>
          <div class="qf-share-sub">${_qf.correct} correct · ${acc}% accuracy · best combo ×${1 + Math.min(4, Math.floor(_qf.bestCombo / 3))}</div>
          <div class="qf-share-foot">Can you beat me? 🎯</div>
        </div>
        <p class="qf-share-label">📣 Share your score</p>
        <div class="qf-share-row">
          <button class="qf-sbtn qf-native" onclick="MiniGames.qfShare()">📤 Share</button>
          <button class="qf-sbtn qf-wa" onclick="MiniGames.qfShareTo('wa')">💬</button>
          <button class="qf-sbtn qf-fb" onclick="MiniGames.qfShareTo('fb')">📘</button>
          <button class="qf-sbtn qf-x" onclick="MiniGames.qfShareTo('x')">✖️</button>
          <button class="qf-sbtn qf-copy" onclick="MiniGames.qfShareTo('copy', this)">🔗</button>
        </div>
        <div class="mg-end-row">
          <button class="mg-btn-primary" onclick="MiniGames.startQuick()">🔁 Play again</button>
          <button class="mg-btn-ghost" onclick="MiniGames.renderHub()">🎮 All games</button>
        </div>
      </div>`;
  }

  function _qfSaveBest() {
    if (typeof DB === 'undefined' || !DB.stats) return;
    DB.games = DB.games || {};
    const g = DB.games.quickfire = DB.games.quickfire || { plays: 0, bestScore: 0, bestCombo: 0 };
    g.plays++;
    if (_qf.score > g.bestScore) g.bestScore = _qf.score;
    if (_qf.bestCombo > g.bestCombo) g.bestCombo = _qf.bestCombo;
    if (typeof save === 'function') save(DB);
  }

  function qfQuit() {
    if (_qf && !_qf.over && _qf.answered > 0 && !confirm('Quit Quick Fire? This score won\'t be saved.')) return;
    clearInterval(_qfTimer); _qfTimer = null;
    _clearPersist();
    _qf = null;
    renderHub();
  }

  // ── Sharing a score ────────────────────────────
  // ⚠ No child name, no account id, no link back to any profile. The share is a
  // score and a challenge, nothing that identifies the child — a game score is
  // the one thing safe to post, and it must stay that way.
  function _qfShareText() {
    const acc = _qf.answered ? Math.round(_qf.correct / _qf.answered * 100) : 0;
    return `⚡ I scored ${_qf.score} in Quick Fire on PSAC Practice — ${_qf.correct} correct, ${acc}% accuracy! Can you beat me? 🎯`;
  }
  function _qfShareUrl() {
    // A score-showcase landing page (no personal data in the URL) that invites
    // the opener to play. score.html reads these params and renders a card.
    const acc = _qf.answered ? Math.round(_qf.correct / _qf.answered * 100) : 0;
    const qs = `s=${_qf.score}&c=${_qf.correct}&a=${acc}`;
    return /^https?:$/.test(location.protocol) && !/localhost|127\./.test(location.hostname)
      ? `${location.origin}/score.html?${qs}`
      : `${location.origin}/score.html?${qs}`;
  }

  // Turns the on-screen score card into a PNG so it lands as a real image in
  // Instagram/WhatsApp story shares, where a link preview alone is weak.
  async function _qfScoreImage() {
    try {
      const acc = _qf.answered ? Math.round(_qf.correct / _qf.answered * 100) : 0;
      const W = 1080, H = 1080, c = document.createElement('canvas');
      c.width = W; c.height = H;
      const x = c.getContext('2d');
      const g = x.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, '#312e81'); g.addColorStop(.55, '#4f46e5'); g.addColorStop(1, '#7c3aed');
      x.fillStyle = g; x.fillRect(0, 0, W, H);
      x.textAlign = 'center'; x.fillStyle = '#fff';
      x.font = '600 46px system-ui,sans-serif'; x.fillText('⚡ QUICK FIRE', W / 2, 250);
      x.font = '700 40px system-ui,sans-serif'; x.fillStyle = 'rgba(255,255,255,.75)';
      x.fillText('PSAC Exam Practice', W / 2, 315);
      x.fillStyle = '#fde047'; x.font = '800 300px system-ui,sans-serif';
      x.fillText(String(_qf.score), W / 2, 660);
      x.fillStyle = '#fff'; x.font = '600 42px system-ui,sans-serif';
      x.fillText('POINTS', W / 2, 730);
      x.font = '500 44px system-ui,sans-serif'; x.fillStyle = 'rgba(255,255,255,.92)';
      x.fillText(`${_qf.correct} correct   ·   ${acc}% accuracy`, W / 2, 850);
      x.font = '700 50px system-ui,sans-serif'; x.fillStyle = '#fff';
      x.fillText('Can you beat me? 🎯', W / 2, 960);
      const blob = await new Promise(res => c.toBlob(res, 'image/png'));
      return blob ? new File([blob], 'quickfire-score.png', { type: 'image/png' }) : null;
    } catch (_) { return null; }
  }

  async function qfShare() {
    const text = _qfShareText(), url = _qfShareUrl();
    const file = await _qfScoreImage();
    // Native share sheet reaches Instagram/WhatsApp/Messenger/etc. Prefer a file
    // share where the platform supports it — the score card as an image travels
    // further than a link.
    if (navigator.share) {
      try {
        if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], text: text + '\n' + url });
        } else {
          await navigator.share({ title: 'Quick Fire score', text, url });
        }
        return;
      } catch (_) { /* user dismissed — not an error */ return; }
    }
    qfShareTo('copy');
  }

  function qfShareTo(where, btn) {
    const text = _qfShareText(), url = _qfShareUrl();
    if (where === 'wa') window.open('https://wa.me/?text=' + encodeURIComponent(text + '\n' + url), '_blank', 'noopener');
    else if (where === 'fb') window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '&quote=' + encodeURIComponent(text), '_blank', 'noopener');
    else if (where === 'x') window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url), '_blank', 'noopener');
    else if (where === 'copy') {
      const full = text + '\n' + url;
      const done = () => { if (btn) { const o = btn.textContent; btn.textContent = '✅'; setTimeout(() => btn.textContent = o, 1600); } };
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(full).then(done).catch(() => prompt('Copy your score:', full));
      else prompt('Copy your score:', full);
    }
  }

  // ══════════════════════════════════════════════
  //  WORD BUILDER 🧩 — spell your way across the lagoon.
  //
  //  Ten stepping stones from beach to island; each stone is one word. The
  //  crab reads a clue, the letters arrive scrambled, and the child taps tiles
  //  into slots. A full row auto-checks: right = hop forward, wrong = a splash
  //  (3 lives). Three 💡 hints per crossing lock in the next correct letter.
  //  Words come from window.MINIGAME_WORDS (curated, banded 1–3) and ramp with
  //  the child's own grade. Same arcade rule as every game here: nothing
  //  touches recordAnswer()/daily — bests live in DB.games.wordbuilder.
  // ══════════════════════════════════════════════
  const WB_STONES = 10, WB_LIVES = 3, WB_HINTS = 3;
  let _wb = null;

  function _childGrade() {
    return (typeof Auth !== 'undefined' && Auth.getActiveAccount?.()?.grade)
      || (typeof SELECTED_GRADE !== 'undefined' && SELECTED_GRADE) || 5;
  }

  function _wbPickWords() {
    const bank = (window.MINIGAME_WORDS || []);
    if (bank.length < WB_STONES) return null;
    const grade = _childGrade();
    const mix = grade <= 4 ? [1, 1, 1, 1, 1, 1, 2, 2, 2, 2]
      : grade === 5 ? [1, 1, 1, 2, 2, 2, 2, 2, 3, 3]
        : [1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
    const byBand = { 1: [], 2: [], 3: [] };
    bank.forEach(w => (byBand[w.band] || byBand[2]).push(w));
    const used = new Set();
    const take = want => {
      for (const b of [want, want - 1, want + 1]) {
        const pool = (byBand[b] || []).filter(w => !used.has(w.word));
        if (pool.length) { const w = pool[Math.floor(Math.random() * pool.length)]; used.add(w.word); return w; }
      }
      const rest = bank.filter(w => !used.has(w.word));
      const w = rest[Math.floor(Math.random() * rest.length)]; if (w) used.add(w.word); return w;
    };
    return mix.map(take).filter(Boolean);
  }

  function _wbShuffleTiles(word) {
    let tiles, guard = 0;
    do {
      tiles = word.split('').map(ch => ({ ch, used: false }));
      for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
      }
    } while (tiles.map(t => t.ch).join('') === word && ++guard < 20);
    return tiles;
  }

  function startWords() {
    const words = _wbPickWords();
    if (!words || words.length < WB_STONES) { toast('The word chest is still loading — try again in a moment!', 3000); return; }
    _wb = { words, idx: 0, lives: WB_LIVES, hints: WB_HINTS, score: 0, tiles: [], typed: [], locked: false, over: false };
    _audio();
    $('mg-hub')?.classList.add('hidden');
    $('mg-game')?.classList.remove('hidden');
    _wbRound();
  }

  function _wbRound() {
    _wb.tiles = _wbShuffleTiles(_wb.words[_wb.idx].word);
    _wb.typed = [];
    _wb.locked = false;
    _wbRender();
  }

  function _wbLagoonHtml() {
    let s = '<div class="wb-lagoon"><span class="wb-shore">🏖️</span>';
    for (let i = 0; i < WB_STONES; i++) {
      const cls = i < _wb.idx ? 'done' : i === _wb.idx ? 'now' : '';
      s += `<span class="wb-stone ${cls}">${i === _wb.idx && !_wb.over ? '🏊' : '🪨'}</span>`;
    }
    return s + '<span class="wb-shore">🏝️</span></div>';
  }

  function _wbSlotsHtml() {
    return _wb.words[_wb.idx].word.split('').map((_, i) => {
      const t = _wb.typed[i];
      return `<span class="wb-slot ${t !== undefined ? 'filled' : ''}">${t !== undefined ? _wb.tiles[t].ch : ''}</span>`;
    }).join('');
  }

  function _wbTilesHtml() {
    return _wb.tiles.map((t, i) =>
      `<button class="wb-tile ${t.used ? 'used' : ''}" ${t.used ? 'disabled' : ''} onclick="MiniGames.wbTap(${i})">${t.ch}</button>`).join('');
  }

  function _wbRender() {
    const game = $('mg-game');
    if (!game || !_wb) return;
    const w = _wb.words[_wb.idx];
    game.innerHTML = `
      <div class="wb-stage">
        <div class="wb-topbar">
          <button class="mg-quit" onclick="MiniGames.wbQuit()">✕</button>${_helpBtn('wordbuilder')}
          <div class="wb-lives">${'❤️'.repeat(_wb.lives)}${'🤍'.repeat(WB_LIVES - _wb.lives)}</div>
          <div class="wb-score"><b id="wb-score">${_wb.score}</b><small>pts</small></div>
        </div>
        ${_wbLagoonHtml()}
        <div class="wb-word-no">Word ${_wb.idx + 1} of ${WB_STONES}</div>
        <div class="wb-clue mg-pop">🦀 <span>${esc(w.clue)}</span></div>
        <div class="wb-slots" id="wb-slots">${_wbSlotsHtml()}</div>
        <div class="wb-tiles" id="wb-tiles">${_wbTilesHtml()}</div>
        <div class="wb-actions">
          <button class="mg-btn-ghost" onclick="MiniGames.wbUndo()">⌫ Undo</button>
          <button class="mg-btn-primary" onclick="MiniGames.wbHint()" ${_wb.hints ? '' : 'disabled'}>💡 Hint (${_wb.hints})</button>
        </div>
        <div id="mg-msg" class="mg-msg hidden"></div>
      </div>`;
    _persist('wordbuilder');
  }

  function _wbRepaint() {
    const s = $('wb-slots'), t = $('wb-tiles');
    if (s) s.innerHTML = _wbSlotsHtml();
    if (t) t.innerHTML = _wbTilesHtml();
    _persist('wordbuilder');
  }

  function wbTap(i) {
    if (!_wb || _wb.locked || _wb.over || _wb.tiles[i].used) return;
    _wb.tiles[i].used = true;
    _wb.typed.push(i);
    _wbRepaint();
    if (_wb.typed.length === _wb.words[_wb.idx].word.length) _wbCheck();
  }

  function wbUndo() {
    if (!_wb || _wb.locked || _wb.over || !_wb.typed.length) return;
    _wb.tiles[_wb.typed.pop()].used = false;
    _wbRepaint();
  }

  function wbHint() {
    if (!_wb || _wb.locked || _wb.over || !_wb.hints) return;
    const w = _wb.words[_wb.idx].word;
    if (_wb.typed.length >= w.length) return;
    // clear any wrong letters already placed, so the hint always genuinely helps
    while (_wb.typed.length && _wb.tiles[_wb.typed[_wb.typed.length - 1]].ch !== w[_wb.typed.length - 1]) {
      _wb.tiles[_wb.typed.pop()].used = false;
    }
    const i = _wb.tiles.findIndex(t => !t.used && t.ch === w[_wb.typed.length]);
    if (i < 0) return;
    _wb.hints--;
    _wb.tiles[i].used = true;
    _wb.typed.push(i);
    _wbRender();
    if (_wb.typed.length === w.length) _wbCheck();
  }

  function _wbCheck() {
    const w = _wb.words[_wb.idx];
    const spelt = _wb.typed.map(i => _wb.tiles[i].ch).join('');
    _wb.locked = true;
    if (spelt === w.word) {
      _wb.score += w.word.length * 10;
      _sfx.correct();
      $('wb-slots')?.classList.add('right');
      const sc = $('wb-score'); if (sc) sc.textContent = _wb.score;
      _msg(`✅ <b>${esc(w.word)}</b> — you hop to the next stone!`);
      _wb.idx++;
      if (_wb.idx > 0 && _wb.idx % 3 === 0 && typeof launchConfetti === 'function') launchConfetti(30);
      setTimeout(() => { if (!_wb) return; _wb.idx >= WB_STONES ? _wbFinish(true) : _wbRound(); }, 1000);
    } else {
      _wb.lives--;
      _sfx.wrong();
      $('wb-slots')?.classList.add('wrong', 'shake');
      _msg(_wb.lives
        ? `💦 <b>Splash!</b> Not quite — look at the clue again.${_wb.lives === 1 ? ' Last life!' : ''}`
        : '💦 <b>Splash!</b> That was your last life…');
      setTimeout(() => {
        if (!_wb) return;
        if (!_wb.lives) return _wbFinish(false);
        _wb.typed.forEach(i => { _wb.tiles[i].used = false; });
        _wb.typed = [];
        _wb.locked = false;
        $('wb-slots')?.classList.remove('wrong', 'shake');
        _wbRender();
      }, 1100);
    }
  }

  function _wbFinish(crossed) {
    _wb.over = true;
    _clearPersist();
    const missed = crossed ? null : _wb.words[_wb.idx];
    if (crossed) _wb.score += _wb.lives * 20 + _wb.hints * 10;
    _wbSaveBest();
    const best = (typeof DB !== 'undefined' && DB.games?.wordbuilder) || {};
    if (crossed) {
      _sfx.win();
      if (typeof launchConfetti === 'function') { launchConfetti(180); setTimeout(() => launchConfetti(120), 450); }
    }
    const game = $('mg-game');
    if (!game) return;
    game.innerHTML = `
      <div class="mg-end mg-pop">
        <div class="mg-end-icon">${crossed ? '🏝️' : '🌊'}</div>
        <h3>${crossed ? 'You crossed the lagoon!' : 'The tide got you!'}</h3>
        <p>${crossed
          ? `All ${WB_STONES} words spelt — with a bonus for ${_wb.lives} ❤️ and ${_wb.hints} 💡 left over!`
          : `You spelt ${_wb.idx} word${_wb.idx === 1 ? '' : 's'} and reached stone ${_wb.idx} of ${WB_STONES}.`}</p>
        ${missed ? `<div class="mg-end-learn"><b>The word was:</b> ${esc(missed.word)}<br><span>${esc(missed.clue)}</span></div>` : ''}
        <div class="mg-end-stars">🧩 ${_wb.score} points</div>
        ${best.bestScore ? `<p class="bq-best">🏅 Your best: ${best.bestStones}/${WB_STONES} stones · ${best.bestScore} pts</p>` : ''}
        <div class="mg-end-row">
          <button class="mg-btn-primary" onclick="MiniGames.startWords()">🔁 Play again</button>
          <button class="mg-btn-ghost" onclick="MiniGames.renderHub()">🎮 All games</button>
        </div>
      </div>`;
  }

  function _wbSaveBest() {
    if (typeof DB === 'undefined' || !DB.stats) return;
    DB.games = DB.games || {};
    const g = DB.games.wordbuilder = DB.games.wordbuilder || { plays: 0, bestStones: 0, bestScore: 0 };
    g.plays++;
    if (_wb.idx > (g.bestStones || 0)) g.bestStones = _wb.idx;
    if (_wb.score > (g.bestScore || 0)) g.bestScore = _wb.score;
    if (typeof save === 'function') save(DB);
  }

  function wbQuit() {
    if (_wb && !_wb.over && _wb.idx > 0 && !confirm('Leave the lagoon? This crossing won\'t be saved.')) return;
    _clearPersist();
    _wb = null;
    renderHub();
  }

  // ══════════════════════════════════════════════
  //  ISLAND EXPLORER 🗺️ — a geography tour of Mauritius.
  //
  //  Twelve real stops, roughly clockwise from Port Louis, drawn from the
  //  curated window.MINIGAME_GEO bank (one clue per stop per tour, picked at
  //  random so replays vary). First-try correct = 🏅 gold stamp; a wrong
  //  answer greys that option out and the second try earns ⭐ silver; two
  //  wrongs and the guide explains the answer — the tour always reaches the
  //  end, because a child should finish the trip and learn the fact, not get
  //  sent home. Bests live in DB.games.explorer.
  // ══════════════════════════════════════════════
  const EX_GOLD = 15, EX_SILVER = 8, EX_PERFECT_BONUS = 50;
  let _ex = null;

  function startExplorer() {
    const stops = window.MINIGAME_GEO || [];
    if (stops.length < 3) { toast('The tour bus is still loading — try again in a moment!', 3000); return; }
    _ex = {
      stops,
      qsIdx: stops.map(s => Math.floor(Math.random() * s.qs.length)),
      idx: 0, tries: 0, wrongIdx: null, stamps: [], score: 0, locked: false, over: false,
    };
    _audio();
    $('mg-hub')?.classList.add('hidden');
    $('mg-game')?.classList.remove('hidden');
    _exRender();
  }

  function _exRouteHtml() {
    return `<div class="ex-route">${_ex.stops.map((s, i) => {
      const cls = i < _ex.idx ? 'done' : i === _ex.idx ? 'now' : '';
      const stamp = _ex.stamps[i];
      return `<span class="ex-dot ${cls}" title="${esc(s.name)}">${i < _ex.idx ? (stamp === 'gold' ? '🏅' : stamp === 'silver' ? '⭐' : '·') : s.icon}</span>`;
    }).join('')}</div>`;
  }

  function _exRender() {
    const game = $('mg-game');
    if (!game || !_ex) return;
    const s = _ex.stops[_ex.idx];
    const q = s.qs[_ex.qsIdx[_ex.idx]];
    game.innerHTML = `
      <div class="ex-stage">
        <div class="wb-topbar">
          <button class="mg-quit" onclick="MiniGames.exQuit()">✕</button>${_helpBtn('explorer')}
          <div class="ex-progress">🚌 Stop ${_ex.idx + 1} of ${_ex.stops.length}</div>
          <div class="wb-score"><b>${_ex.score}</b><small>pts</small></div>
        </div>
        ${_exRouteHtml()}
        <div class="ex-stop mg-pop">
          <span class="ex-stop-icon">${s.icon}</span>
          <div class="ex-stop-body">
            <b>${esc(s.name)}</b>
            <span class="ex-district">📍 ${esc(s.district)} district</span>
            <span>${esc(s.blurb)}</span>
          </div>
        </div>
        <div class="ex-clue">${esc(q.question)}</div>
        <div class="qf-opts">${q.options.map((o, i) => `
          <button class="qf-opt${i === _ex.wrongIdx ? ' wrong' : ''}" id="ex-opt-${i}" ${i === _ex.wrongIdx ? 'disabled' : ''} onclick="MiniGames.exAnswer(${i})">
            <span class="mg-tag">${LETTERS[i]}</span><span class="mg-optext">${esc(o)}</span>
          </button>`).join('')}
        </div>
        <div id="mg-msg" class="mg-msg hidden"></div>
      </div>`;
    _persist('explorer');
  }

  function exAnswer(i) {
    if (!_ex || _ex.locked || _ex.over || i === _ex.wrongIdx) return;
    const q = _ex.stops[_ex.idx].qs[_ex.qsIdx[_ex.idx]];
    const btn = $('ex-opt-' + i);
    if (q.options[i] === q.answer) {
      _ex.locked = true;
      const gold = _ex.tries === 0;
      _ex.stamps[_ex.idx] = gold ? 'gold' : 'silver';
      _ex.score += gold ? EX_GOLD : EX_SILVER;
      btn?.classList.add('right');
      _sfx.correct();
      _msg(gold ? '🏅 <b>Gold stamp!</b> First try — the tour rolls on!' : '⭐ <b>Silver stamp!</b> Got there — off to the next stop!');
      setTimeout(_exNext, 1300);
    } else if (_ex.tries === 0) {
      _ex.tries = 1;
      _ex.wrongIdx = i;
      btn?.classList.add('wrong');
      if (btn) btn.disabled = true;
      _sfx.wrong();
      _msg('🙈 Not quite — have one more look and try again!');
      _persist('explorer');
    } else {
      _ex.locked = true;
      _ex.stamps[_ex.idx] = null;
      btn?.classList.add('wrong');
      const rightIdx = q.options.findIndex(o => o === q.answer);
      $('ex-opt-' + rightIdx)?.classList.add('right');
      _sfx.wrong();
      _msg(`🗺️ <b>The guide explains:</b> ${esc(q.answer)}.${q.explanation ? ` <span class="ex-explain">${esc(q.explanation)}</span>` : ''}`);
      setTimeout(_exNext, 2800);
    }
  }

  function _exNext() {
    if (!_ex) return;
    _ex.idx++;
    _ex.tries = 0;
    _ex.wrongIdx = null;
    _ex.locked = false;
    if (_ex.idx >= _ex.stops.length) return _exFinish();
    _exRender();
  }

  function _exFinish() {
    _ex.over = true;
    _clearPersist();
    const golds = _ex.stamps.filter(s => s === 'gold').length;
    const silvers = _ex.stamps.filter(s => s === 'silver').length;
    const perfect = golds === _ex.stops.length;
    if (perfect) _ex.score += EX_PERFECT_BONUS;
    _exSaveBest(golds);
    const best = (typeof DB !== 'undefined' && DB.games?.explorer) || {};
    _sfx.win();
    if (typeof launchConfetti === 'function') launchConfetti(60 + golds * 12);
    const game = $('mg-game');
    if (!game) return;
    game.innerHTML = `
      <div class="mg-end mg-pop">
        <div class="mg-end-icon">${perfect ? '🏆' : '🛂'}</div>
        <h3>${perfect ? 'A PERFECT TOUR!' : 'Tour complete!'}</h3>
        <p>You visited all ${_ex.stops.length} stops — ${golds} gold and ${silvers} silver stamp${silvers === 1 ? '' : 's'} in your passport.</p>
        <div class="ex-passport">${_ex.stops.map((s, i) => `
          <div class="ex-pass-cell"><span>${s.icon}</span><b>${esc(s.name)}</b><span class="ex-pass-stamp">${_ex.stamps[i] === 'gold' ? '🏅' : _ex.stamps[i] === 'silver' ? '⭐' : '—'}</span></div>`).join('')}
        </div>
        <div class="mg-end-stars">🗺️ ${_ex.score} points${perfect ? ' · perfect-tour bonus!' : ''}</div>
        ${best.bestScore ? `<p class="bq-best">🏅 Your best: ${best.bestGold} gold stamps · ${best.bestScore} pts</p>` : ''}
        <div class="mg-end-row">
          <button class="mg-btn-primary" onclick="MiniGames.startExplorer()">🔁 Tour again</button>
          <button class="mg-btn-ghost" onclick="MiniGames.renderHub()">🎮 All games</button>
        </div>
      </div>`;
  }

  function _exSaveBest(golds) {
    if (typeof DB === 'undefined' || !DB.stats) return;
    DB.games = DB.games || {};
    const g = DB.games.explorer = DB.games.explorer || { plays: 0, bestGold: 0, bestScore: 0 };
    g.plays++;
    if (golds > (g.bestGold || 0)) g.bestGold = golds;
    if (_ex.score > (g.bestScore || 0)) g.bestScore = _ex.score;
    if (typeof save === 'function') save(DB);
  }

  function exQuit() {
    if (_ex && !_ex.over && _ex.idx > 0 && !confirm('End the tour here? Your stamps won\'t be saved.')) return;
    _clearPersist();
    _ex = null;
    renderHub();
  }

  // ══════════════════════════════════════════════
  //  NUMBER NINJA 🥷 — mental-maths belts, white to black.
  //
  //  7 belts × 5 sums. Every sum is GENERATED fresh (never from the question
  //  bank), one at a time against a per-question timer that tightens belt by
  //  belt. A wrong answer or a timeout costs one of 3 lives; clear all 35 for
  //  the black belt. Same rule as every game: nothing here touches
  //  recordAnswer()/daily. Bests live in DB.games.ninja.
  // ══════════════════════════════════════════════
  const NJ_BELTS = [
    { name: 'White',  icon: '🤍', time: 12 },
    { name: 'Yellow', icon: '💛', time: 11 },
    { name: 'Orange', icon: '🧡', time: 10 },
    { name: 'Green',  icon: '💚', time: 9 },
    { name: 'Blue',   icon: '💙', time: 8 },
    { name: 'Brown',  icon: '🤎', time: 8 },
    { name: 'Black',  icon: '🖤', time: 7 },
  ];
  const NJ_PER_BELT = 5;
  const NJ_LIVES = 3;
  let _nj = null, _njTimer = null, _njDeadline = 0;

  const _njRnd = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  const _njPick = arr => arr[Math.floor(Math.random() * arr.length)];

  // One generated sum per belt level: {text, answer}. Distractors are built
  // from the near-misses a child actually produces (off by one, off by ten).
  function _njGen(belt) {
    const kind = Math.random();
    if (belt === 0) {                                   // add & subtract within 20
      const a = _njRnd(3, 12), b = _njRnd(2, 8);
      return kind < 0.5 ? { text: `${a} + ${b}`, answer: a + b } : { text: `${a + b} − ${b}`, answer: a };
    }
    if (belt === 1) {                                   // two-digit ± ones and tens
      const a = _njRnd(12, 89);
      if (kind < 0.4) { const b = _njRnd(3, 9); return { text: `${a} + ${b}`, answer: a + b }; }
      if (kind < 0.7) { const b = _njRnd(1, 5) * 10; return { text: `${a} + ${b}`, answer: a + b }; }
      const b = _njRnd(3, 9); return { text: `${a + b} − ${b}`, answer: a };
    }
    if (belt === 2) {                                   // friendly tables, doubles & halves
      if (kind < 0.6) { const t = _njPick([2, 3, 4, 5, 10]), n = _njRnd(2, 9); return { text: `${n} × ${t}`, answer: n * t }; }
      if (kind < 0.8) { const n = _njRnd(6, 40); return { text: `Double of ${n}`, answer: n * 2 }; }
      const n = _njRnd(4, 40) * 2; return { text: `Half of ${n}`, answer: n / 2 };
    }
    if (belt === 3) {                                   // full tables + division facts
      const t = _njRnd(3, 12), n = _njRnd(3, 12);
      return kind < 0.55 ? { text: `${n} × ${t}`, answer: n * t } : { text: `${n * t} ÷ ${t}`, answer: n };
    }
    if (belt === 4) {                                   // carrying, and ×/÷ by 10 or 100
      if (kind < 0.4) { const a = _njRnd(25, 88), b = _njRnd(15, 77); return { text: `${a} + ${b}`, answer: a + b }; }
      if (kind < 0.65) { const a = _njRnd(45, 99), b = _njRnd(16, 39); return { text: `${a} − ${b}`, answer: a - b }; }
      const n = _njRnd(3, 90), m = _njPick([10, 100]);
      return kind < 0.85 ? { text: `${n} × ${m}`, answer: n * m } : { text: `${n * m} ÷ ${m}`, answer: n };
    }
    if (belt === 5) {                                   // two-step and missing numbers
      if (kind < 0.4) { const a = _njRnd(3, 9), b = _njRnd(3, 9), c = _njRnd(4, 30); return { text: `${a} × ${b} + ${c}`, answer: a * b + c }; }
      if (kind < 0.7) { const x = _njRnd(5, 40), y = _njRnd(6, 50); return { text: `${x} + ? = ${x + y}`, answer: y }; }
      const t = _njRnd(3, 9), n = _njRnd(3, 9); return { text: `? × ${t} = ${n * t}`, answer: n };
    }
    // black belt: squares, fractions, percentages, big two-step
    if (kind < 0.25) { const n = _njRnd(6, 12); return { text: `${n} × ${n}`, answer: n * n }; }
    if (kind < 0.45) { const m = _njRnd(3, 25) * 4; return kind < 0.35 ? { text: `¼ of ${m}`, answer: m / 4 } : { text: `¾ of ${m}`, answer: m * 3 / 4 }; }
    if (kind < 0.6) { const n = _njRnd(4, 90) * 10; return { text: `10% of ${n}`, answer: n / 10 }; }
    if (kind < 0.7) { const n = _njRnd(2, 30) * 4; return { text: `25% of ${n}`, answer: n / 4 }; }
    if (kind < 0.8) { const n = _njRnd(6, 120) * 2; return { text: `50% of ${n}`, answer: n / 2 }; }
    const a = _njRnd(6, 12), b = _njRnd(6, 12), c = _njRnd(5, 30);
    return { text: `${a} × ${b} − ${c}`, answer: a * b - c };
  }

  function _njOptions(answer) {
    const set = new Set([answer]);
    const near = [answer + 1, answer - 1, answer + 2, answer - 2, answer + 10, answer - 10,
                  answer + 5, answer - 5, answer * 2, Math.round(answer / 2), answer + 100, answer - 100];
    for (let i = near.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [near[i], near[j]] = [near[j], near[i]]; }
    for (const n of near) { if (set.size >= 4) break; if (Number.isInteger(n) && n > 0 && !set.has(n)) set.add(n); }
    for (let d = 3; set.size < 4; d++) if (!set.has(answer + d)) set.add(answer + d);
    const opts = [...set];
    for (let i = opts.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [opts[i], opts[j]] = [opts[j], opts[i]]; }
    return opts;
  }

  function _njMakeQ(belt) {
    const { text, answer } = _njGen(belt);
    return { text, answer, options: _njOptions(answer) };
  }

  function startNinja() {
    _nj = { belt: 0, qnum: 0, lives: NJ_LIVES, score: 0, sliced: 0, beltsDone: 0, over: false, locked: false, q: null };
    _audio();                                   // unlock audio inside the tap
    $('mg-hub')?.classList.add('hidden');
    $('mg-game')?.classList.remove('hidden');
    _njNext();
  }

  function _njNext() {
    _nj.q = _njMakeQ(_nj.belt);
    _nj.locked = false;
    _njRender();
    _njStartTimer();
  }

  function _njStartTimer() {
    clearInterval(_njTimer);
    _njDeadline = Date.now() + NJ_BELTS[_nj.belt].time * 1000;
    _njTick();
    _njTimer = setInterval(_njTick, 100);
  }

  function _njTick() {
    if (!_nj || _nj.over) { clearInterval(_njTimer); _njTimer = null; return; }
    const total = NJ_BELTS[_nj.belt].time * 1000;
    const left = Math.max(0, _njDeadline - Date.now());
    const bar = $('nj-time-fill');
    if (bar) { bar.style.width = (left / total * 100) + '%'; bar.classList.toggle('low', left < 3000); }
    const num = $('nj-time-num');
    if (num) num.textContent = Math.ceil(left / 1000);
    if (left <= 0 && !_nj.locked) _njMiss(null, true);
  }

  function _njRender() {
    const game = $('mg-game');
    if (!game || !_nj) return;
    const belt = NJ_BELTS[_nj.belt];
    const q = _nj.q;
    game.innerHTML = `
      <div class="nj-stage">
        <div class="nj-topbar">
          <button class="mg-quit" onclick="MiniGames.njQuit()">✕</button>${_helpBtn('ninja')}
          <div class="nj-belts">${NJ_BELTS.map((b, i) =>
            `<span class="${i < _nj.belt ? 'done' : i === _nj.belt ? 'now' : ''}" title="${b.name} belt">${b.icon}</span>`).join('')}</div>
          <div class="nj-lives">${'❤️'.repeat(_nj.lives)}${'🖤'.repeat(NJ_LIVES - _nj.lives)}</div>
        </div>
        <div class="nj-timerow">
          <div class="nj-timebar"><div class="nj-timebar-fill" id="nj-time-fill"></div></div>
          <b class="nj-time-num" id="nj-time-num">${belt.time}</b>
        </div>
        <div class="nj-qcard mg-pop" id="nj-qcard">
          <div class="nj-qtext">${q.text.includes('?') ? q.text : q.text + ' = ?'}</div>
        </div>
        <div class="nj-opts">${q.options.map((o, i) => `
          <button class="nj-opt" id="nj-opt-${i}" onclick="MiniGames.njAnswer(${i})">${o}</button>`).join('')}
        </div>
        <div class="nj-score-line"><b id="nj-score">${_nj.score}</b> pts · ${belt.icon} ${belt.name} belt · slice ${_nj.qnum + 1} of ${NJ_PER_BELT}</div>
      </div>`;
    _persist('ninja');
  }

  function njAnswer(i) {
    if (!_nj || _nj.over || _nj.locked) return;
    const q = _nj.q;
    if (q.options[i] !== q.answer) return _njMiss(i, false);
    _nj.locked = true;
    clearInterval(_njTimer); _njTimer = null;
    const secondsLeft = Math.max(0, Math.ceil((_njDeadline - Date.now()) / 1000));
    const gained = 10 * (_nj.belt + 1) + secondsLeft;
    _nj.score += gained;
    _nj.sliced++;
    _sfx.correct();
    $('nj-opt-' + i)?.classList.add('right');
    $('nj-qcard')?.classList.add('sliced');
    _qfFloat('+' + gained, true);
    setTimeout(() => {
      if (!_nj || _nj.over) return;
      _nj.qnum++;
      if (_nj.qnum >= NJ_PER_BELT) {
        _nj.beltsDone = _nj.belt + 1;
        if (_nj.belt >= NJ_BELTS.length - 1) return _njFinish('master');
        return _njBeltUp();
      }
      _njNext();
    }, 550);
  }

  function _njMiss(i, timeout) {
    if (!_nj || _nj.over || _nj.locked) return;
    _nj.locked = true;
    clearInterval(_njTimer); _njTimer = null;
    _nj.lives--;
    _sfx.wrong();
    if (i != null) $('nj-opt-' + i)?.classList.add('wrong');
    const rightIdx = _nj.q.options.findIndex(o => o === _nj.q.answer);
    $('nj-opt-' + rightIdx)?.classList.add('right');
    _qfFloat(timeout ? '⏰ Too slow!' : '−1 ❤️', false);
    if (navigator.vibrate) { try { navigator.vibrate(60); } catch (_) {} }
    setTimeout(() => {
      if (!_nj || _nj.over) return;
      if (_nj.lives <= 0) return _njFinish('out');
      _njNext();
    }, 1000);
  }

  function _njBeltUp() {
    const b = NJ_BELTS[_nj.beltsDone - 1];
    const next = NJ_BELTS[_nj.belt + 1];
    _sfx.win();
    if (typeof launchConfetti === 'function') launchConfetti(60);
    const game = $('mg-game');
    if (game) game.innerHTML = `
      <div class="mg-end mg-pop">
        <div class="mg-end-icon">${b.icon}</div>
        <h3>${b.name} Belt earned!</h3>
        <p>Next up: ${next.icon} ${next.name} belt — trickier sums, only ${next.time} seconds each. Ready?</p>
        <div class="mg-end-stars">🥷 ${_nj.score} pts</div>
      </div>`;
    setTimeout(() => {
      if (!_nj || _nj.over) return;
      _nj.belt++;
      _nj.qnum = 0;
      _njNext();
    }, 1800);
  }

  function _njFinish(how) {
    _nj.over = true;
    clearInterval(_njTimer); _njTimer = null;
    _clearPersist();
    _njSaveBest();
    const best = (typeof DB !== 'undefined' && DB.games?.ninja) || {};
    const beltName = _nj.beltsDone ? NJ_BELTS[_nj.beltsDone - 1].name : null;
    const isRecord = _nj.score > 0 && _nj.score >= (best.bestScore || 0);
    if (_nj.beltsDone > 0 && typeof launchConfetti === 'function') launchConfetti(how === 'master' ? 220 : 80);
    const head = how === 'master'
        ? { icon: '🏆', title: 'BLACK BELT MASTER!', sub: 'All 35 sums sliced — you are a true Number Ninja. Legendary!' }
      : beltName
        ? { icon: NJ_BELTS[_nj.beltsDone - 1].icon, title: `${beltName} Belt earned!`, sub: `You sliced ${_nj.sliced} sums before running out of lives. The ${NJ_BELTS[Math.min(_nj.beltsDone, NJ_BELTS.length - 1)].name} belt awaits!` }
        : { icon: '🥷', title: 'Keep training, ninja!', sub: `You sliced ${_nj.sliced} sums. Every ninja starts somewhere — try again!` };
    const game = $('mg-game');
    if (!game) return;
    game.innerHTML = `
      <div class="mg-end mg-pop">
        <div class="mg-end-icon">${head.icon}</div>
        <h3>${head.title}</h3>
        <p>${head.sub}</p>
        <div class="qf-scoreboard">
          <div><b>${_nj.score}</b><span>points</span></div>
          <div><b>${_nj.beltsDone}/7</b><span>belts</span></div>
          <div><b>${_nj.sliced}</b><span>sums sliced</span></div>
        </div>
        ${isRecord && _nj.score ? '<p class="bq-best">🏅 New personal best!</p>' : best.bestScore ? `<p class="bq-best">🏅 Your best: ${best.bestScore} pts</p>` : ''}
        <div class="mg-end-row">
          <button class="mg-btn-primary" onclick="MiniGames.startNinja()">🔁 Train again</button>
          <button class="mg-btn-ghost" onclick="MiniGames.renderHub()">🎮 All games</button>
        </div>
      </div>`;
  }

  function _njSaveBest() {
    if (typeof DB === 'undefined' || !DB.stats) return;
    DB.games = DB.games || {};
    const g = DB.games.ninja = DB.games.ninja || { plays: 0, bestBelts: 0, bestScore: 0 };
    g.plays++;
    if (_nj.beltsDone > (g.bestBelts || 0)) g.bestBelts = _nj.beltsDone;
    if (_nj.score > (g.bestScore || 0)) g.bestScore = _nj.score;
    if (typeof save === 'function') save(DB);
  }

  function njQuit() {
    if (_nj && !_nj.over && _nj.score > 0 && !confirm('Leave the dojo? This score won\'t be saved.')) return;
    clearInterval(_njTimer); _njTimer = null;
    _clearPersist();
    _nj = null;
    renderHub();
  }

  // ══════════════════════════════════════════════
  //  BRAIN BATTLE ⚔️ — pass-the-phone duel.
  //
  //  Two players share one device: 5 rounds, one question EACH per round, both
  //  drawn from the same difficulty band so the duel stays fair — but DIFFERENT
  //  questions, because sharing one would hand the answer to whoever goes
  //  second. A handover screen hides the question until the player taps Ready;
  //  25s to answer, speed adds points. Tied after 5 rounds → sudden death, up
  //  to 3 extra rounds, then an honourable draw. Questions come from the
  //  child's grade pool like Quick Fire; nothing touches recordAnswer().
  //  Tallies live in DB.games.battle.
  // ══════════════════════════════════════════════
  const BB_ROUNDS = 5, BB_MAX_EXTRA = 3, BB_SECONDS = 25;
  const BB_DIFF = [1, 2, 2, 3, 4, 2, 3, 4];        // per round, incl. sudden death
  const BB_PLAYERS = [{ icon: '🦁', name: 'Player 1' }, { icon: '🐯', name: 'Player 2' }];
  let _bb = null, _bbTimer = null, _bbDeadline = 0;

  const _bbTrim = q => ({ question: q.question, options: q.options.slice(0, 4), answer: q.answer, _label: _chapterLabel(q.chapterId) });

  function _pickBattle() {
    const { pool } = _gradePool();
    if (pool.length < 10) return null;
    const byDiff = { 1: [], 2: [], 3: [], 4: [] };
    for (const q of pool) (byDiff[q.difficulty] || byDiff[2]).push(q);
    const used = new Set();
    const take = want => {
      for (const d of [want, want - 1, want + 1, want - 2, want + 2]) {
        const bucket = (byDiff[d] || []).filter(q => !used.has(q.id));
        if (bucket.length) { const q = bucket[Math.floor(Math.random() * bucket.length)]; used.add(q.id); return q; }
      }
      const rest = pool.filter(q => !used.has(q.id));
      const q = rest[Math.floor(Math.random() * rest.length)]; if (q) used.add(q.id); return q;
    };
    const qs = [];
    for (const d of BB_DIFF) {
      const a = take(d), b = take(d);
      if (!a || !b) break;                       // a short pool just means fewer spare rounds
      qs.push(_bbTrim(a), _bbTrim(b));
    }
    return qs.length >= BB_ROUNDS * 2 ? qs : null;
  }

  function startBattle() {
    const qs = _pickBattle();
    if (!qs) { toast('Questions are still loading — try again in a moment!', 3000); return; }
    _bb = { qs, round: 0, turn: 0, scores: [0, 0], phase: 'ready', over: false, locked: false };
    _audio();                                   // unlock audio inside the tap
    $('mg-hub')?.classList.add('hidden');
    $('mg-game')?.classList.remove('hidden');
    _bbRender();
  }

  const _bbQ = () => _bb.qs[_bb.round * 2 + _bb.turn];

  function _bbScoresHtml() {
    return `<div class="bb-scores">${BB_PLAYERS.map((p, i) => `
      <div class="bb-side p${i + 1} ${!_bb.over && _bb.turn === i ? 'active' : ''}">
        <span class="bb-face">${p.icon}</span><b>${_bb.scores[i]}</b><small>${p.name}</small>
      </div>`).join('<div class="bb-vs">VS</div>')}</div>`;
  }

  function _bbRender() {
    const game = $('mg-game');
    if (!game || !_bb) return;
    const p = BB_PLAYERS[_bb.turn];
    const sudden = _bb.round >= BB_ROUNDS;
    const roundLabel = sudden ? '⚡ SUDDEN DEATH!' : `Round ${_bb.round + 1} of ${BB_ROUNDS}`;
    if (_bb.phase === 'ready') {
      game.innerHTML = `
        <div class="bb-stage">
          <div class="bb-topbar">
            <button class="mg-quit" onclick="MiniGames.bbQuit()">✕</button>
            <div class="bb-round ${sudden ? 'sudden' : ''}">${roundLabel}</div>
          </div>
          ${_bbScoresHtml()}
          <div class="bb-handover mg-pop">
            <div class="bb-handover-face">${p.icon}</div>
            <h3>${_bb.round === 0 && _bb.turn === 0 && !_bb.scores[0] && !_bb.scores[1] ? `${p.name} starts!` : `Pass the phone to ${p.name}!`}</h3>
            <p>No peeking, ${BB_PLAYERS[1 - _bb.turn].name} 🙈 — the question appears when ${p.name} is ready.</p>
            <button class="mg-btn-primary bb-ready" onclick="MiniGames.bbReady()">I'm ready — show my question!</button>
          </div>
        </div>`;
      _persist('battle');
      return;
    }
    const q = _bbQ();
    game.innerHTML = `
      <div class="bb-stage">
        <div class="bb-topbar">
          <button class="mg-quit" onclick="MiniGames.bbQuit()">✕</button>
          <div class="bb-round ${sudden ? 'sudden' : ''}">${roundLabel}</div>
        </div>
        ${_bbScoresHtml()}
        <div class="bb-timerow">
          <div class="bb-timebar"><div class="bb-timebar-fill" id="bb-time-fill"></div></div>
          <b class="bb-time-num" id="bb-time-num">${BB_SECONDS}</b>
        </div>
        <div class="bb-turnline">${p.icon} ${p.name} — your question:</div>
        <div class="bb-qwrap mg-pop">
          <div class="bb-source">${q._label}</div>
          <div class="bb-qcard"><div class="bb-qtext">${q.question}</div></div>
        </div>
        <div class="bb-opts">${q.options.map((o, i) => `
          <button class="bb-opt" id="bb-opt-${i}" onclick="MiniGames.bbAnswer(${i})">
            <span class="mg-tag">${LETTERS[i]}</span><span class="mg-optext">${o}</span>
          </button>`).join('')}
        </div>
      </div>`;
  }

  function bbReady() {
    if (!_bb || _bb.over || _bb.phase !== 'ready') return;
    _bb.phase = 'q';
    _bb.locked = false;
    _bbRender();
    clearInterval(_bbTimer);
    _bbDeadline = Date.now() + BB_SECONDS * 1000;
    _bbTick();
    _bbTimer = setInterval(_bbTick, 100);
  }

  function _bbTick() {
    if (!_bb || _bb.over || _bb.phase !== 'q') { clearInterval(_bbTimer); _bbTimer = null; return; }
    const left = Math.max(0, _bbDeadline - Date.now());
    const bar = $('bb-time-fill');
    if (bar) { bar.style.width = (left / (BB_SECONDS * 1000) * 100) + '%'; bar.classList.toggle('low', left < 6000); }
    const num = $('bb-time-num');
    if (num) num.textContent = Math.ceil(left / 1000);
    if (left <= 0 && !_bb.locked) _bbResolve(null, true);
  }

  function bbAnswer(i) {
    if (!_bb || _bb.over || _bb.locked || _bb.phase !== 'q') return;
    _bbResolve(i, false);
  }

  function _bbResolve(i, timeout) {
    _bb.locked = true;
    clearInterval(_bbTimer); _bbTimer = null;
    const q = _bbQ();
    const correct = i != null && q.options[i] === q.answer;
    if (correct) {
      const secondsLeft = Math.max(0, Math.ceil((_bbDeadline - Date.now()) / 1000));
      const gained = 100 + 4 * secondsLeft;
      _bb.scores[_bb.turn] += gained;
      _sfx.correct();
      $('bb-opt-' + i)?.classList.add('right');
      _qfFloat('+' + gained, true);
    } else {
      _sfx.wrong();
      if (i != null) $('bb-opt-' + i)?.classList.add('wrong');
      const rightIdx = q.options.findIndex(o => o === q.answer);
      $('bb-opt-' + rightIdx)?.classList.add('right');
      _qfFloat(timeout ? '⏰ Too slow!' : '+0', false);
      if (navigator.vibrate) { try { navigator.vibrate(60); } catch (_) {} }
    }
    setTimeout(() => {
      if (!_bb || _bb.over) return;
      _bbAdvance();
    }, correct ? 1000 : 1500);
  }

  function _bbAdvance() {
    if (_bb.turn === 0) {
      _bb.turn = 1;
      _bb.phase = 'ready';
      return _bbRender();
    }
    _bb.round++;
    _bb.turn = 0;
    const tied = _bb.scores[0] === _bb.scores[1];
    const outOfQs = (_bb.round + 1) * 2 > _bb.qs.length;
    if (_bb.round >= BB_ROUNDS && (!tied || _bb.round >= BB_ROUNDS + BB_MAX_EXTRA || outOfQs)) return _bbFinish();
    _bb.phase = 'ready';
    _bbRender();
  }

  function _bbFinish() {
    _bb.over = true;
    clearInterval(_bbTimer); _bbTimer = null;
    _clearPersist();
    const [s1, s2] = _bb.scores;
    const winner = s1 === s2 ? null : s1 > s2 ? 0 : 1;
    _bbSaveTally(winner);
    if (winner != null) { _sfx.win(); if (typeof launchConfetti === 'function') launchConfetti(160); }
    const head = winner == null
      ? { icon: '🤝', title: "It's a draw!", sub: 'Perfectly matched brains — an honourable tie. Rematch?' }
      : { icon: '👑', title: `${BB_PLAYERS[winner].icon} ${BB_PLAYERS[winner].name} takes the crown!`, sub: `Victory by ${Math.abs(s1 - s2)} points after ${_bb.round} rounds.` };
    const game = $('mg-game');
    if (!game) return;
    game.innerHTML = `
      <div class="mg-end mg-pop">
        <div class="mg-end-icon">${head.icon}</div>
        <h3>${head.title}</h3>
        <p>${head.sub}</p>
        ${_bbScoresHtml()}
        <div class="mg-end-row">
          <button class="mg-btn-primary" onclick="MiniGames.startBattle()">⚔️ Rematch</button>
          <button class="mg-btn-ghost" onclick="MiniGames.renderHub()">🎮 All games</button>
        </div>
      </div>`;
  }

  function _bbSaveTally(winner) {
    if (typeof DB === 'undefined' || !DB.stats) return;
    DB.games = DB.games || {};
    const g = DB.games.battle = DB.games.battle || { plays: 0, p1Wins: 0, p2Wins: 0, draws: 0 };
    g.plays++;
    if (winner === 0) g.p1Wins++;
    else if (winner === 1) g.p2Wins++;
    else g.draws++;
    if (typeof save === 'function') save(DB);
  }

  function bbQuit() {
    if (_bb && !_bb.over && (_bb.scores[0] || _bb.scores[1]) && !confirm('End the battle? Nobody takes the crown.')) return;
    clearInterval(_bbTimer); _bbTimer = null;
    _clearPersist();
    _bb = null;
    renderHub();
  }

  // ══════════════════════════════════════════════
  //  TIME TRAVELLER 🕰️ — history sequencing.
  //
  //  8 rounds; each shows 3–4 real dated events (engine/minigame_time.js,
  //  years hidden) and the child TAPS them into chronological order before
  //  the rewind timer runs out. Tap-in-sequence, not drag — drag is fiddly on
  //  phones. Years are revealed with the corrections after each round; that
  //  reveal is the learning moment, so it waits for a tap, never auto-advances.
  //  +25 per correctly placed event, perfect round = +50 + seconds left.
  //  No repeats within a game; never two events of the same YEAR in one round
  //  (their order would be unknowable from a year). Bests in
  //  DB.games.timetravel; nothing touches recordAnswer().
  // ══════════════════════════════════════════════
  const TT_ROUNDS = 8;
  const TT_SIZE = r => r < 3 ? 3 : 4;                 // events per round
  const TT_BAND = r => r < 2 ? 1 : r < 5 ? 2 : 3;     // difficulty ramp
  let _tt = null, _ttTimer = null, _ttDeadline = 0;

  function _pickTimeTravel() {
    const bank = (window.MINIGAME_TIME || []);
    if (bank.length < 20) return null;
    const usedLabels = new Set();
    const rounds = [];
    for (let r = 0; r < TT_ROUNDS; r++) {
      const size = TT_SIZE(r);
      let cand = bank.filter(f => !usedLabels.has(f.label) && f.band <= TT_BAND(r));
      if (cand.length < size) cand = bank.filter(f => !usedLabels.has(f.label));
      cand = [...cand].sort(() => Math.random() - 0.5);
      const items = [], years = new Set();
      for (const f of cand) {
        if (items.length >= size) break;
        if (years.has(f.year)) continue;
        items.push({ label: f.label, year: f.year, era: f.era });
        years.add(f.year); usedLabels.add(f.label);
      }
      if (items.length < 3) return null;
      do { items.sort(() => Math.random() - 0.5); }
      while (items.every((f, i) => !i || items[i - 1].year <= f.year));
      rounds.push(items);
    }
    return rounds;
  }

  function startTimeTravel() {
    const rounds = _pickTimeTravel();
    if (!rounds) { toast('The time machine is warming up — try again in a moment!', 3000); return; }
    _tt = { rounds, round: 0, picked: [], phase: 'play', score: 0, perfect: 0, reveal: null, over: false, locked: false };
    _audio();                                   // unlock audio inside the tap
    $('mg-hub')?.classList.add('hidden');
    $('mg-game')?.classList.remove('hidden');
    _ttRender();
    _ttStartTimer();
  }

  const _ttItems = () => _tt.rounds[_tt.round];
  const _ttSeconds = () => TT_SIZE(_tt.round) === 3 ? 45 : 60;

  function _ttStartTimer() {
    clearInterval(_ttTimer);
    _ttDeadline = Date.now() + _ttSeconds() * 1000;
    _ttTick();
    _ttTimer = setInterval(_ttTick, 100);
  }

  function _ttTick() {
    if (!_tt || _tt.over || _tt.phase !== 'play') { clearInterval(_ttTimer); _ttTimer = null; return; }
    const total = _ttSeconds() * 1000;
    const left = Math.max(0, _ttDeadline - Date.now());
    const bar = $('tt-time-fill');
    if (bar) { bar.style.width = (left / total * 100) + '%'; bar.classList.toggle('low', left < 10000); }
    const num = $('tt-time-num');
    if (num) num.textContent = Math.ceil(left / 1000);
    if (left <= 0 && !_tt.locked) _ttResolve(true);
  }

  function _ttRender() {
    const game = $('mg-game');
    if (!game || !_tt) return;
    if (_tt.phase === 'reveal') return _ttRenderReveal();
    const items = _ttItems();
    game.innerHTML = `
      <div class="tt-stage">
        <div class="tt-topbar">
          <button class="mg-quit" onclick="MiniGames.ttQuit()">✕</button>
          <div class="tt-round">Round ${_tt.round + 1} of ${TT_ROUNDS}</div>
          <div class="tt-score"><b>${_tt.score}</b><small>pts</small></div>
        </div>
        <div class="tt-timerow">
          <div class="tt-timebar"><div class="tt-timebar-fill" id="tt-time-fill"></div></div>
          <b class="tt-time-num" id="tt-time-num">${_ttSeconds()}</b>
        </div>
        <p class="tt-prompt">🕰️ Tap the events in order — <b>earliest first!</b></p>
        <div class="tt-line">${items.map((f, i) => {
          const pos = _tt.picked.indexOf(i);
          return pos === -1 ? '' : `<div class="tt-slot mg-pop"><span class="tt-no">${pos + 1}</span>${esc(f.label)}</div>`;
        }).join('') || '<div class="tt-line-hint">Your timeline starts here…</div>'}</div>
        <div class="tt-pool">${items.map((f, i) => _tt.picked.includes(i) ? '' : `
          <button class="tt-card" onclick="MiniGames.ttPick(${i})">${f.era === 'mu' ? '🇲🇺' : '🌍'} ${esc(f.label)}</button>`).join('')}
        </div>
        <button class="tt-undo" onclick="MiniGames.ttUndo()" ${_tt.picked.length ? '' : 'disabled'}>↩️ Undo last</button>
      </div>`;
    _persist('timetravel');
  }

  function ttPick(i) {
    if (!_tt || _tt.over || _tt.locked || _tt.phase !== 'play') return;
    if (_tt.picked.includes(i) || !_ttItems()[i]) return;
    _tt.picked.push(i);
    if (_tt.picked.length >= _ttItems().length) return _ttResolve(false);
    _ttRender();
  }

  function ttUndo() {
    if (!_tt || _tt.over || _tt.locked || _tt.phase !== 'play' || !_tt.picked.length) return;
    _tt.picked.pop();
    _ttRender();
  }

  function _ttResolve(timeout) {
    if (!_tt || _tt.over || _tt.locked) return;
    _tt.locked = true;
    const secondsLeft = Math.max(0, Math.ceil((_ttDeadline - Date.now()) / 1000));
    clearInterval(_ttTimer); _ttTimer = null;
    const items = _ttItems();
    const sorted = [...items].sort((a, b) => a.year - b.year);
    const rows = sorted.map((f, i) => {
      const chosen = items[_tt.picked[i]];
      return { label: f.label, year: f.year, era: f.era, ok: !!chosen && chosen.label === f.label };
    });
    const okCount = rows.filter(r => r.ok).length;
    const perfect = okCount === items.length && !timeout;
    const gained = okCount * 25 + (perfect ? 50 + secondsLeft : 0);
    _tt.score += gained;
    if (perfect) { _tt.perfect++; _sfx.win(); if (typeof launchConfetti === 'function') launchConfetti(50); }
    else if (okCount) _sfx.correct();
    else _sfx.wrong();
    _tt.reveal = { rows, gained, perfect, timeout };
    _tt.phase = 'reveal';
    _tt.locked = false;
    _ttRenderReveal();
  }

  function _ttRenderReveal() {
    const game = $('mg-game');
    if (!game || !_tt || !_tt.reveal) return;
    const { rows, gained, perfect, timeout } = _tt.reveal;
    const last = _tt.round >= TT_ROUNDS - 1;
    game.innerHTML = `
      <div class="tt-stage">
        <div class="tt-topbar">
          <button class="mg-quit" onclick="MiniGames.ttQuit()">✕</button>
          <div class="tt-round">Round ${_tt.round + 1} of ${TT_ROUNDS}</div>
          <div class="tt-score"><b>${_tt.score}</b><small>pts</small></div>
        </div>
        <div class="tt-verdict ${perfect ? 'perfect' : ''} mg-pop">
          ${perfect ? '🌟 PERFECT ORDER!' : timeout ? '⏰ Time rewound!' : `${rows.filter(r => r.ok).length} of ${rows.length} in the right place`}
          <b>+${gained} pts</b>
        </div>
        <p class="tt-prompt">Here's how it really happened:</p>
        <div class="tt-reveal">${rows.map(r => `
          <div class="tt-rev-row ${r.ok ? 'ok' : 'no'}">
            <span class="tt-year">${r.year}</span>
            <span class="tt-rev-label">${r.era === 'mu' ? '🇲🇺' : '🌍'} ${esc(r.label)}</span>
            <span class="tt-mark">${r.ok ? '✓' : '✗'}</span>
          </div>`).join('')}
        </div>
        <button class="mg-btn-primary tt-next" onclick="MiniGames.ttNext()">${last ? '🏁 Finish the journey' : 'Next stop ›'}</button>
      </div>`;
    _persist('timetravel');
  }

  function ttNext() {
    if (!_tt || _tt.over || _tt.phase !== 'reveal') return;
    _tt.round++;
    if (_tt.round >= TT_ROUNDS) return _ttFinish();
    _tt.picked = [];
    _tt.reveal = null;
    _tt.phase = 'play';
    _ttRender();
    _ttStartTimer();
  }

  function _ttFinish() {
    _tt.over = true;
    clearInterval(_ttTimer); _ttTimer = null;
    _clearPersist();
    _ttSaveBest();
    const best = (typeof DB !== 'undefined' && DB.games?.timetravel) || {};
    const isRecord = _tt.score > 0 && _tt.score >= (best.bestScore || 0);
    if (_tt.score > 0 && typeof launchConfetti === 'function') launchConfetti(_tt.perfect >= TT_ROUNDS ? 220 : 90);
    const head = _tt.perfect >= TT_ROUNDS
        ? { icon: '🏆', title: 'MASTER OF TIME!', sub: 'Every round in perfect order — history holds no secrets from you!' }
      : _tt.perfect >= 5
        ? { icon: '🕰️', title: 'History hero!', sub: `${_tt.perfect} perfect rounds — the timeline is nearly yours.` }
        : { icon: '🕰️', title: 'Journey complete!', sub: 'Every trip through time teaches something new. Travel again?' };
    const game = $('mg-game');
    if (!game) return;
    game.innerHTML = `
      <div class="mg-end mg-pop">
        <div class="mg-end-icon">${head.icon}</div>
        <h3>${head.title}</h3>
        <p>${head.sub}</p>
        <div class="qf-scoreboard">
          <div><b>${_tt.score}</b><span>points</span></div>
          <div><b>${_tt.perfect}/${TT_ROUNDS}</b><span>perfect</span></div>
        </div>
        ${isRecord ? '<p class="bq-best">🏅 New personal best!</p>' : best.bestScore ? `<p class="bq-best">🏅 Your best: ${best.bestScore} pts</p>` : ''}
        <div class="mg-end-row">
          <button class="mg-btn-primary" onclick="MiniGames.startTimeTravel()">🔁 Travel again</button>
          <button class="mg-btn-ghost" onclick="MiniGames.renderHub()">🎮 All games</button>
        </div>
      </div>`;
  }

  function _ttSaveBest() {
    if (typeof DB === 'undefined' || !DB.stats) return;
    DB.games = DB.games || {};
    const g = DB.games.timetravel = DB.games.timetravel || { plays: 0, bestScore: 0, bestPerfect: 0 };
    g.plays++;
    if (_tt.score > (g.bestScore || 0)) g.bestScore = _tt.score;
    if (_tt.perfect > (g.bestPerfect || 0)) g.bestPerfect = _tt.perfect;
    if (typeof save === 'function') save(DB);
  }

  function ttQuit() {
    if (_tt && !_tt.over && _tt.score > 0 && !confirm('Leave the time machine? This journey won\'t be saved.')) return;
    clearInterval(_ttTimer); _ttTimer = null;
    _clearPersist();
    _tt = null;
    renderHub();
  }

  function open() {
    if (!_allowed()) { toast('🔒 Games are switched off by your parent right now.', 3000); return; }
    showScreen('minigames');
  }

  // Test-harness introspection: the climb state is otherwise closure-private,
  // and the headless checks need to tell "guard refused the click" apart from
  // "advance never happened".
  function _debug() { return _g && { rung: _g.rung, locked: _g.locked, over: _g.over, wrongOnce: _g.wrongOnce, hidden: _g.hidden.slice() }; }
  function _njDebug() { return _nj && { belt: _nj.belt, qnum: _nj.qnum, lives: _nj.lives, score: _nj.score, sliced: _nj.sliced, beltsDone: _nj.beltsDone, locked: _nj.locked, over: _nj.over, q: _nj.q && { text: _nj.q.text, answer: _nj.q.answer, options: _nj.q.options.slice() } }; }
  function _wbDebug() { return _wb && { idx: _wb.idx, lives: _wb.lives, hints: _wb.hints, score: _wb.score, locked: _wb.locked, over: _wb.over, typed: _wb.typed.map(i => _wb.tiles[i].ch).join(''), word: _wb.words[_wb.idx]?.word }; }
  function _exDebug() { return _ex && { idx: _ex.idx, tries: _ex.tries, score: _ex.score, locked: _ex.locked, over: _ex.over, stamps: _ex.stamps.slice() }; }
  function _bbDebug() { return _bb && { round: _bb.round, turn: _bb.turn, phase: _bb.phase, scores: _bb.scores.slice(), locked: _bb.locked, over: _bb.over, q: _bb.phase === 'q' && _bb.qs[_bb.round * 2 + _bb.turn] ? { answer: _bb.qs[_bb.round * 2 + _bb.turn].answer, options: _bb.qs[_bb.round * 2 + _bb.turn].options.slice() } : null }; }
  function _ttDebug() { return _tt && { round: _tt.round, phase: _tt.phase, score: _tt.score, perfect: _tt.perfect, picked: _tt.picked.slice(), locked: _tt.locked, over: _tt.over, items: _tt.rounds[_tt.round] ? _tt.rounds[_tt.round].map(f => ({ label: f.label, year: f.year })) : null, reveal: _tt.reveal && { gained: _tt.reveal.gained, perfect: _tt.reveal.perfect } }; }

  return { open, renderHub, startBillionaire, answer, life, walkAway, confirmQuit, toggleMute,
           resumeOrHub,
           showHelp, closeHelp,
           shareWhatsApp, copyPollLink, syncTile, _debug, _wbDebug, _exDebug,
           startQuick, qfAnswer, qfQuit, qfShare, qfShareTo,
           startWords, wbTap, wbUndo, wbHint, wbQuit,
           startExplorer, exAnswer, exQuit,
           startNinja, njAnswer, njQuit, _njDebug, _njMakeQ,
           startBattle, bbReady, bbAnswer, bbQuit, _bbDebug, _pickBattle,
           startTimeTravel, ttPick, ttUndo, ttNext, ttQuit, _ttDebug, _pickTimeTravel };
})();
