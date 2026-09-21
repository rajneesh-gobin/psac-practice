'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice — Subject Certificates
//
//  WHAT THIS IS
//  One certificate per SUBJECT (never per chapter), for the child and for the
//  parent, rebuilt from the child's own per-question record. As they practise
//  it climbs a ladder of nine levels; the top one — Subject Master — needs
//  every practisable question in every chapter of that subject answered
//  correctly. A child with 23 of 4,000 has a Starter certificate, not nothing.
//
//  ⚠ ONE CERTIFICATE PER SUBJECT, OVERWRITTEN IN PLACE. Reaching a new level
//    replaces the old certificate; it never adds a second one. DB.certificates
//    keeps the serial and the FIRST issue date per subject so the document has
//    a stable identity, and overwrites the level, the numbers and the "last
//    updated" date. A wall of nine Maths certificates is a worse reward than
//    one that got better.
//
//  ⚠ "MASTERED" MEANS state = 'secure', AND NOTHING ELSE. That is the
//    per-question state machine in practice_selector.js / the SQL: right first
//    time, or right twice running after a miss. `improved` (one correct answer
//    after a miss) deliberately does NOT count — one lucky guess is not
//    mastery, and a certificate that says otherwise is worth nothing to the
//    parent reading it. `legacy_seen` counts towards EXPLORED and nothing else.
//
//  ⚠ THE DENOMINATOR IS THE WHOLE SUBJECT, NOT WHAT THE CHILD CAN REACH.
//    A parent difficulty cap (DB.restrictions.maxDifficulty) shrinks what gets
//    dealt, and scoring against that would hand out an easier mastery for a
//    tighter cap — the exact opposite of what the cap is for. The cap is
//    reported in "More info" instead, as questions being held back.
//
//  ⚠ NOTHING HERE IS AN OFFICIAL RESULT and every surface says so: the card,
//    the certificate artwork, the PDF, the showcase screen and the share text.
//    See DISCLAIMER below — it is one string, used by all of them, for the
//    same reason the share copy is: two wordings drift and only one of them
//    gets corrected.
//
//  WHERE THE NUMBERS COME FROM
//    numerator   student_subject_progress() — ONE rpc, per (pack, chapter)
//                aggregates of student_question_progress.
//                migrations/20260921_subject_certificates.sql
//    denominator subjects/_counts.js — generated, injected on demand.
//                scripts/build-subject-counts.js
//  ⚠ Neither is the progress blob. DB.certificates is a SNAPSHOT for offline
//    and for the parent's card; the two sources above are the truth.
// ══════════════════════════════════════════════

const Certificates = (() => {

  // ── the disclaimer, in one place ────────────────────────────────────────
  //  Three lengths of the same promise. ⚠ They must keep saying the same
  //  thing: SHORT rides on the artwork and the PNG a parent forwards, LONG is
  //  the showcase warning, and SHARE goes into a WhatsApp message that cannot
  //  be corrected once forwarded.
  const DISCLAIMER = {
    // ⚠ THREE LINES, AND THE LENGTH IS PART OF THE LAYOUT. They are drawn into
    //   a reserved footer band on the artwork (FOOT_TOP), and a fourth line
    //   would push the last one under the frame. Re-measure the picture with
    //   scripts/test-certificate-render.js after changing a word.
    short: [
      'Generated automatically by nouklass.com from this pupil’s own practice record — not an examination result.',
      'Not affiliated with, endorsed by or recognised by the Mauritius Examinations Syndicate, the MIE,',
      'the Ministry of Education or any other official body. Progress against nouklass.com’s own standards only.',
    ],
    long: 'Nou Klass awards these certificates so that a child and their family can see how far '
        + 'they have come through our practice questions, and nothing more. They are generated '
        + 'automatically from your own answers on this site. They are <strong>not</strong> '
        + 'examination results, they carry no marks towards the PSAC or the NCE, and they are '
        + 'not affiliated with, endorsed by or recognised by the Mauritius Examinations '
        + 'Syndicate, the Mauritius Institute of Education, the Ministry of Education or any '
        + 'other official body in Mauritius or elsewhere. The level shown describes progress '
        + 'against our own practice standards only.',
    share: 'Nou Klass practice certificate — our own standards, not an official result.',
  };

  // ── the ladder ──────────────────────────────────────────────────────────
  //  Nine levels, each with its OWN artwork — not one design in nine colours.
  //  ⚠ The gate is the PERCENTAGE of the subject mastered and only that. An
  //    absolute floor ("50 questions for Explorer") was written first and
  //    thrown away: it reads as fair until you put grade1-health (252
  //    questions) beside grade4-french (2,164), where the same floor is 20% of
  //    one subject and 2% of the other, so the smaller subject can never reach
  //    the upper levels at all. A fraction of the subject means the same thing
  //    in every subject, which is the whole point of a subject certificate.
  //  ⚠ Level 9 is EXACT: not 99.6% rounded up. mastered === total, which is
  //    every question in every chapter.
  const TIERS = [
    { key: 'none',        idx: 0, min: 0,   name: 'Not started yet',  icon: '○',
      line: 'No questions mastered yet',
      blurb: 'Answer your first question correctly and your certificate starts building.' },

    { key: 'starter',     idx: 1, min: 0,   name: 'Starter',          icon: '\u{1F331}',
      line: 'has begun this subject',
      blurb: 'The first questions are answered. Every certificate starts here.' },

    { key: 'explorer',    idx: 2, min: 5,   name: 'Explorer',         icon: '\u{1F9ED}',
      line: 'is exploring this subject',
      blurb: 'A twentieth of the subject is mastered — enough to know the shape of it.' },

    { key: 'rising',      idx: 3, min: 15,  name: 'Rising Star',      icon: '⭐',
      line: 'is making real progress in',
      blurb: 'A steady habit is showing: one question in seven is mastered.' },

    { key: 'achiever',    idx: 4, min: 30,  name: 'Achiever',         icon: '\u{1F3AF}',
      line: 'has achieved solid progress in',
      blurb: 'Nearly a third of the subject is secure.' },

    { key: 'high',        idx: 5, min: 50,  name: 'High Achiever',    icon: '\u{1F3C5}',
      line: 'has passed the halfway mark in',
      blurb: 'More than half the subject is mastered — the harder half is what is left.' },

    { key: 'scholar',     idx: 6, min: 70,  name: 'Scholar',          icon: '\u{1F4DC}',
      line: 'has shown scholarship in',
      blurb: 'Seven questions in ten are secure across the whole subject.' },

    { key: 'expert',      idx: 7, min: 85,  name: 'Expert',           icon: '\u{1F48E}',
      line: 'has reached expert level in',
      blurb: 'Only the last sixth of the subject remains.' },

    { key: 'distinction', idx: 8, min: 95,  name: 'Distinction',      icon: '\u{1F3C6}',
      line: 'has earned a distinction in',
      blurb: 'Almost everything is mastered. The finish line is in sight.' },

    { key: 'master',      idx: 9, min: 100, name: 'Subject Master',   icon: '\u{1F451}',
      line: 'has mastered every question in',
      blurb: 'Every practisable question, in every chapter of this subject, answered correctly. '
           + 'This is the highest level Nou Klass awards.' },
  ];

  const tierByIdx = i => TIERS[Math.max(0, Math.min(TIERS.length - 1, i | 0))];

  // ⚠ Exact at the top, and floored everywhere else: 99.97% of a 4,000-question
  //   subject is one question short, and Math.round() would call that Master.
  function tierFor(mastered, total) {
    if (!total || !mastered) return TIERS[0];
    if (mastered >= total) return TIERS[9];
    const pct = mastered / total * 100;
    let t = TIERS[1];
    for (const cand of TIERS) {
      if (cand.idx === 0) continue;
      if (cand.idx === 9) continue;            // handled above, exact only
      if (pct >= cand.min) t = cand;
    }
    return t;
  }

  // How many more questions must be mastered to reach the next level.
  // ⚠ ceil, not round: 4.2 more questions is 5 more questions.
  function toNextTier(mastered, total) {
    const cur = tierFor(mastered, total);
    if (!total || cur.idx >= 9) return null;
    const next = tierByIdx(cur.idx + 1);
    const need = next.idx === 9 ? total : Math.ceil(next.min / 100 * total);
    return { tier: next, need: Math.max(1, need - mastered) };
  }

  // ── palettes and ornaments, one per level ───────────────────────────────
  //  ⚠ Never colour alone. Each level changes its FRAME and its SEAL as well
  //    as its palette, so the levels are told apart on a black-and-white
  //    printout and by a child who cannot distinguish the two blues.
  const ART = {
    none:        { paper:'#f6f6f4', paper2:'#eeeeec', ink:'#4b5563', sub:'#6b7280',
                   frame:'#c7cbd1', frame2:'#e3e6ea', seal:'#9ca3af', seal2:'#d1d5db',
                   ribbon:'#9ca3af', border:'plain',     emblem:'blank'   },
    starter:     { paper:'#fbfdf8', paper2:'#eef7e8', ink:'#1f4d2b', sub:'#4a6b52',
                   frame:'#7bb661', frame2:'#cfe6c2', seal:'#4d9a3f', seal2:'#a8dc96',
                   ribbon:'#3f7f34', border:'rule',      emblem:'sprout'  },
    explorer:    { paper:'#f8fcfd', paper2:'#e3f2f5', ink:'#0f4552', sub:'#3d6c78',
                   frame:'#2f8fa6', frame2:'#b9dde5', seal:'#1b7f96', seal2:'#8fd0de',
                   ribbon:'#155e6f', border:'dashed',    emblem:'compass' },
    rising:      { paper:'#fafbff', paper2:'#e7ecfb', ink:'#23306b', sub:'#4a5691',
                   frame:'#4a63c8', frame2:'#c3cdf3', seal:'#3a51b5', seal2:'#9fb0ef',
                   ribbon:'#2c3f92', border:'stars',     emblem:'star'    },
    achiever:    { paper:'#fffdf7', paper2:'#fbf0da', ink:'#6b4413', sub:'#8a6633',
                   frame:'#d79a2b', frame2:'#f2ddb0', seal:'#c2871b', seal2:'#f0cd82',
                   ribbon:'#9c6a12', border:'chevron',   emblem:'target'  },
    high:        { paper:'#fefaf6', paper2:'#f4e6d8', ink:'#5c3a1e', sub:'#7d5a3c',
                   frame:'#b1794a', frame2:'#e8d0b6', seal:'#a86c3c', seal2:'#dcb188',
                   ribbon:'#7d4f28', border:'rope',      emblem:'medal'   },
    scholar:     { paper:'#fbfbfd', paper2:'#e9ebf0', ink:'#2b3440', sub:'#55606e',
                   frame:'#8a95a5', frame2:'#d5dae2', seal:'#6f7c8e', seal2:'#c3cbd7',
                   ribbon:'#4d5766', border:'guilloche', emblem:'scroll'  },
    expert:      { paper:'#f7fcfa', paper2:'#dcefe7', ink:'#0d4033', sub:'#356356',
                   frame:'#1f8a6d', frame2:'#aadcc9', seal:'#0f7256', seal2:'#79cbb1',
                   ribbon:'#0a5842', border:'diamond',   emblem:'gem'     },
    distinction: { paper:'#fffdf4', paper2:'#f8eccd', ink:'#5b4410', sub:'#7d6426',
                   frame:'#c9a227', frame2:'#efdfa6', seal:'#b8901c', seal2:'#efd77f',
                   ribbon:'#8c6d12', border:'laurel',    emblem:'trophy'  },
    master:      { paper:'#101a33', paper2:'#1b2a4e', ink:'#f6e6b4', sub:'#c8b273',
                   frame:'#d4af37', frame2:'#8a6f22', seal:'#d4af37', seal2:'#f2dd94',
                   ribbon:'#a3801f', border:'royal',     emblem:'crown'   },
  };
  const artFor = key => ART[key] || ART.none;

  // ── escaping ────────────────────────────────────────────────────────────
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  // The SVG goes through an <img> as a data: URL, so it must be well-formed
  // XML — a bare & or an unescaped quote in a child's name kills the whole
  // image with no error a user could act on.
  const xesc = esc;

  const fmt = n => String(n == null ? 0 : n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // ── the question-count table, fetched once, on demand ───────────────────
  //  ⚠ NOT a <script> tag in index.html. 15 KB in the first paint of every
  //    child, for a screen most of them open once a month, is exactly the cost
  //    the lazy pack index exists to avoid.
  let _countsPromise = null;
  function _ensureCounts() {
    if (typeof SUBJECT_QUESTION_COUNTS !== 'undefined') return Promise.resolve(SUBJECT_QUESTION_COUNTS);
    if (_countsPromise) return _countsPromise;
    _countsPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'subjects/_counts.js';
      s.onload = () => resolve(typeof SUBJECT_QUESTION_COUNTS !== 'undefined' ? SUBJECT_QUESTION_COUNTS : {});
      // ⚠ Drop the cached promise so a retry can succeed, exactly as
      //   PackLoader.ensure() does. A one-off network failure must not disable
      //   the screen for the rest of the session.
      s.onerror = () => { _countsPromise = null; reject(new Error('counts_unavailable')); };
      document.head.appendChild(s);
    });
    return _countsPromise;
  }

  // ── the progress aggregate ──────────────────────────────────────────────
  const CACHE_PREFIX = 'psac_cert_prog_v1_';

  function _readCache(studentId) {
    try {
      const raw = localStorage.getItem(CACHE_PREFIX + studentId);
      if (!raw) return null;
      const o = JSON.parse(raw);
      return (o && Array.isArray(o.rows)) ? o : null;
    } catch (e) { return null; }
  }
  function _writeCache(studentId, rows) {
    try { localStorage.setItem(CACHE_PREFIX + studentId, JSON.stringify({ at: Date.now(), rows })); }
    catch (e) {}
  }

  //  Returns { rows, stale, error }. ⚠ A failed read falls back to the last
  //  cached rows and SAYS SO. Rendering zeros for a child who has practised
  //  for months would read as lost work, which is the one thing a progress
  //  screen must never do.
  async function _fetchProgress(studentId, opts) {
    const o = opts || {};
    const sb = (typeof _sb !== 'undefined' && _sb) ? _sb : null;
    if (!sb) {
      const c = _readCache(studentId);
      return { rows: c ? c.rows : [], stale: !!c, error: 'offline' };
    }
    try {
      // ⚠ p_student is sent ONLY for an adult looking at a child they own. A
      //   child's own token resolves through current_student_id() and the RPC
      //   refuses a token that names anyone else.
      const args = o.asAdult && studentId ? { p_student: studentId } : {};
      const { data, error } = await sb.rpc('student_subject_progress', args);
      if (error) throw new Error(error.message || 'rpc_failed');
      const rows = Array.isArray(data) ? data : [];
      _writeCache(studentId, rows);
      return { rows, stale: false, error: null };
    } catch (e) {
      const c = _readCache(studentId);
      return { rows: c ? c.rows : [], stale: !!c, error: (e && e.message) || 'unavailable' };
    }
  }

  // ── building a subject record ───────────────────────────────────────────
  const _packById = (id) => {
    const list = (typeof SUBJECT_PACKS !== 'undefined' && Array.isArray(SUBJECT_PACKS)) ? SUBJECT_PACKS : [];
    return list.find(p => p && p.id === id) || null;
  };
  const _chaptersOf = (pack) => (pack && (pack._chapters || pack.chapters)) || [];

  // A chapter id is NOT globally unique — g9s-inquiry and g9s-sts are declared
  // by all three Grade 9 science packs. Rows therefore key on (pack, chapter),
  // and a row with no pack (backfilled legacy_seen) is attributed to the first
  // pack that declares its chapter. Those rows carry attempts 0 and can never
  // change a level; only "explored" moves.
  function _indexRows(rows) {
    const byPack = Object.create(null);
    const orphans = [];
    for (const r of (rows || [])) {
      const pid = r.pack_id || '';
      if (!pid) { orphans.push(r); continue; }
      (byPack[pid] || (byPack[pid] = Object.create(null)))[r.chapter_id] = r;
    }
    if (orphans.length) {
      const packs = (typeof SUBJECT_PACKS !== 'undefined' && Array.isArray(SUBJECT_PACKS)) ? SUBJECT_PACKS : [];
      for (const r of orphans) {
        const owner = packs.find(p => _chaptersOf(p).some(c => c.id === r.chapter_id));
        if (!owner) continue;
        const bucket = byPack[owner.id] || (byPack[owner.id] = Object.create(null));
        const prev = bucket[r.chapter_id];
        bucket[r.chapter_id] = prev ? {
          ...prev,
          explored: (prev.explored || 0) + (r.explored || 0),
          legacy:   (prev.legacy   || 0) + (r.legacy   || 0),
        } : r;
      }
    }
    return byPack;
  }

  //  One subject's certificate record. Pure once its two inputs are in hand,
  //  so scripts/test-certificates.js can drive it without a browser.
  function buildRecord(packId, counts, packRows, opts) {
    const o = opts || {};
    const pack = _packById(packId);
    const chapterCounts = (counts && counts[packId]) || {};
    const rows = packRows || {};
    const cap = Number.isFinite(o.maxDifficulty) ? o.maxDifficulty : 4;

    const nameOf = (chId) => {
      const ch = _chaptersOf(pack).find(c => c.id === chId);
      return ch ? { name: ch.name || chId, icon: ch.icon || '\u{1F4D6}' } : { name: chId, icon: '\u{1F4D6}' };
    };

    const chapters = [];
    let total = 0, reachable = 0, mastered = 0, explored = 0, needs = 0, improved = 0;
    let attempts = 0, correct = 0, lastAt = 0;

    // Every chapter the COUNTS table knows, in the manifest's order where the
    // pack declares it — a certificate breakdown that lists chapters
    // alphabetically is unreadable next to the chapter screen.
    const declared = _chaptersOf(pack).map(c => c.id);
    const extra = Object.keys(chapterCounts).filter(id => !declared.includes(id)).sort();
    const order = declared.filter(id => chapterCounts[id]).concat(extra);

    for (const chId of order) {
      const lv = chapterCounts[chId] || [0, 0, 0, 0];
      const chTotal = lv[0] + lv[1] + lv[2] + lv[3];
      if (!chTotal) continue;
      let chReach = 0;
      for (let d = 1; d <= 4; d++) if (d <= cap) chReach += lv[d - 1];
      const r = rows[chId] || {};
      const chMastered = Math.min(chTotal, r.secure || 0);
      const chExplored = Math.min(chTotal, r.explored || 0);
      const meta = nameOf(chId);
      chapters.push({
        id: chId, name: meta.name, icon: meta.icon,
        total: chTotal, reachable: chReach,
        mastered: chMastered, explored: chExplored,
        needs: r.needs || 0, improved: r.improved || 0,
        left: Math.max(0, chTotal - chMastered),
        pct: chTotal ? Math.floor(chMastered / chTotal * 100) : 0,
        complete: chTotal > 0 && chMastered >= chTotal,
      });
      total += chTotal; reachable += chReach;
      mastered += chMastered; explored += chExplored;
      needs += r.needs || 0; improved += r.improved || 0;
      attempts += Number(r.attempts || 0); correct += Number(r.correct || 0);
      const t = r.last_at ? Date.parse(r.last_at) : 0;
      if (t > lastAt) lastAt = t;
    }

    const tier = tierFor(mastered, total);
    const next = toNextTier(mastered, total);
    return {
      packId,
      name: (pack && pack.name) || packId,
      icon: (pack && pack.icon) || '\u{1F4DA}',
      grade: pack ? pack.grade : null,
      total, reachable, mastered, explored, needs, improved, attempts, correct,
      lastAt,
      // ⚠ floor, never round: 99.6% must not print as 100%.
      pct: total ? Math.floor(mastered / total * 100) : 0,
      chapters,
      chaptersTotal: chapters.length,
      chaptersComplete: chapters.filter(c => c.complete).length,
      chaptersStarted: chapters.filter(c => c.explored > 0).length,
      // Questions the parent's difficulty cap is holding back. 0 when there is
      // no cap, which is the usual case.
      cappedOut: Math.max(0, total - reachable),
      accuracy: attempts > 0 ? Math.round(correct / attempts * 100) : null,
      tier, nextTier: next ? next.tier : null, toNext: next ? next.need : 0,
    };
  }

  // ── the stored snapshot (serial + first issue date) ─────────────────────
  //  ⚠ The SERIAL is derived, not stored-then-trusted: the same child and the
  //    same subject always produce the same stem, so a certificate reprinted
  //    on another device carries the same number. Only the dates are kept.
  function serialFor(studentId, packId, tierIdx) {
    let h = 0x811c9dc5;
    const s = String(studentId || 'anon') + '|' + String(packId);
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    const stem = h.toString(36).toUpperCase().padStart(7, '0').slice(0, 7);
    return `NK-${stem}-L${tierIdx}`;
  }

  const _todayKey = () => {
    // Mauritius day, like every other date this app records — never the device
    // clock. _muDayKey lives in app.js; fall back only if it is not loaded.
    if (typeof _muDayKey === 'function') { try { return _muDayKey(); } catch (e) {} }
    return new Date().toISOString().slice(0, 10);
  };

  //  Records the current level against the child's own blob, so the parent
  //  card and an offline visit have something true to show. Returns the stored
  //  row, and whether this call was a LEVEL UP (the caller celebrates).
  //  ⚠ Writes only when the viewer IS the child. A parent looking at a child
  //    must not mint that child's certificate date, and in parent mode the
  //    blob on screen may not even be the one being saved.
  function _remember(studentId, rec, canWrite) {
    if (typeof DB === 'undefined' || !DB) return { stored: null, levelUp: false };
    if (!DB.certificates) DB.certificates = {};
    const prev = DB.certificates[rec.packId] || null;
    const today = _todayKey();
    const row = {
      tier: rec.tier.key, tierIdx: rec.tier.idx,
      mastered: rec.mastered, total: rec.total, pct: rec.pct,
      chaptersComplete: rec.chaptersComplete, chaptersTotal: rec.chaptersTotal,
      serial: serialFor(studentId, rec.packId, rec.tier.idx),
      firstIssued: (prev && prev.firstIssued) || today,
      issued: (prev && prev.tierIdx === rec.tier.idx && prev.issued) || today,
      updated: today,
    };
    const levelUp = !!prev && rec.tier.idx > (prev.tierIdx || 0);
    const firstEver = !prev && rec.tier.idx > 0;
    if (!canWrite) return { stored: row, levelUp: false };
    // ⚠ A subject the child has never touched is not stored. Every live pack of
    //   their grade passes through here on every open, and writing a row saying
    //   "nothing yet" for each of them would put 8 rows of zeros into the
    //   progress blob and mint a certificate number for a certificate that does
    //   not exist. The card still draws — it is built from the record, not from
    //   this row.
    if (rec.tier.idx === 0 && !prev) return { stored: row, levelUp: false };
    // ⚠ Nothing to save is nothing to save. Writing an identical row on every
    //   open would mark the blob dirty and buy a server write for no change.
    const same = prev && prev.tierIdx === row.tierIdx && prev.mastered === row.mastered
              && prev.total === row.total;
    DB.certificates[rec.packId] = same ? prev : row;
    // ⚠ save(DB), not save(). It takes the blob to write: save() alone hands
    //   Store.saveStudent an undefined payload.
    if (!same && typeof save === 'function') { try { save(DB); } catch (e) {} }
    return { stored: DB.certificates[rec.packId], levelUp: levelUp || firstEver };
  }

  // ══════════════════════════════════════════════════════════════════════
  //  The artwork
  // ══════════════════════════════════════════════════════════════════════
  const W = 1000, H = 707;   // A4 landscape, 1.414:1

  //  ⚠ THE FOOTER IS A RESERVED BAND AND NOTHING MAY ENTER IT. The disclaimer
  //    is the one piece of text on this picture that has to be readable, and
  //    the first draft had BOTH the seal's ribbon and the bottom row of frame
  //    ornaments running straight through it — found in a screenshot, not
  //    reasoned about; the words "affiliated with, endorsed by" were sitting
  //    under a ribbon. Everything decorative is therefore bounded by
  //    FOOT_TOP, and every bottom-edge ornament skips the middle of the page.
  //    scripts/test-certificate-render.js measures every <text> bounding box
  //    in a real browser, for all nine designs, with the longest realistic
  //    name in them.
  const FOOT_TOP  = 612;          // hairline above the certificate number line
  const FOOT_KEEP = 668;          // side ornaments stop above this
  const SKIP_X    = 250;          // bottom-edge ornaments stop this far from the middle

  //  Positions along an edge, optionally leaving the middle of the page clear.
  function edgeX(from, to, step, skipCentre) {
    const out = [];
    for (let x = from; x <= to; x += step) {
      if (skipCentre && x > SKIP_X && x < W - SKIP_X) continue;
      out.push(x);
    }
    return out;
  }

  // Shrink the name until it fits the plate rather than letting it run off the
  // certificate. SVG has no text flow, so this is the only thing standing
  // between a long Mauritian double-barrelled name and a ruined picture.
  function nameSize(name) {
    const n = String(name || '').length;
    if (n <= 14) return 58;
    if (n <= 20) return 50;
    if (n <= 28) return 41;
    if (n <= 38) return 33;
    return 27;
  }

  function border(a) {
    const g = a.frame, g2 = a.frame2;
    const inset = (n) => `M ${n} ${n} H ${W - n} V ${H - n} H ${n} Z`;
    switch (a.border) {
      case 'rule':
        return `<path d="${inset(22)}" fill="none" stroke="${g}" stroke-width="5"/>
                <path d="${inset(34)}" fill="none" stroke="${g2}" stroke-width="2"/>`;
      case 'dashed':
        return `<path d="${inset(22)}" fill="none" stroke="${g}" stroke-width="5"/>
                <path d="${inset(36)}" fill="none" stroke="${g2}" stroke-width="3" stroke-dasharray="14 9"/>`;
      case 'stars': {
        const pts = [];
        for (const x of edgeX(60, W - 60, 94, false)) pts.push([x, 36]);
        for (const x of edgeX(60, W - 60, 94, true))  pts.push([x, H - 34]);
        for (let y = 110; y <= FOOT_KEEP - 40; y += 96) { pts.push([36, y]); pts.push([W - 36, y]); }
        return `<path d="${inset(22)}" fill="none" stroke="${g}" stroke-width="5"/>
                <path d="${inset(50)}" fill="none" stroke="${g2}" stroke-width="2"/>
                ${pts.map(([x, y]) => star(x, y, 7, g2, g2)).join('')}`;
      }
      case 'chevron': {
        let d = '';
        for (const x of edgeX(30, W - 56, 26, false)) d += `M ${x} 40 l 13 -11 l 13 11 `;
        for (const x of edgeX(30, W - 56, 26, true))  d += `M ${x} ${H - 40} l 13 11 l 13 -11 `;
        return `<path d="${inset(22)}" fill="none" stroke="${g}" stroke-width="5"/>
                <path d="${d}" fill="none" stroke="${g2}" stroke-width="3" stroke-linejoin="round"/>
                <path d="${inset(58)}" fill="none" stroke="${g2}" stroke-width="2"/>`;
      }
      case 'rope': {
        let d = '';
        for (const x of edgeX(30, W - 52, 22, false)) d += `M ${x} 38 q 11 -13 22 0 `;
        for (const x of edgeX(30, W - 52, 22, true))  d += `M ${x} ${H - 34} q 11 13 22 0 `;
        for (let y = 60; y < FOOT_KEEP - 30; y += 22) {
          d += `M 38 ${y} q -13 11 0 22 `;
          d += `M ${W - 38} ${y} q 13 11 0 22 `;
        }
        return `<path d="${inset(20)}" fill="none" stroke="${g}" stroke-width="6"/>
                <path d="${d}" fill="none" stroke="${g2}" stroke-width="3"/>
                <path d="${inset(56)}" fill="none" stroke="${g}" stroke-width="1.5"/>`;
      }
      case 'guilloche': {
        // ⚠ The bottom sweeps are two SHORT curves in the outer thirds, never
        //   one full-width sweep: a sweep across the page cuts the disclaimer.
        let d = '';
        for (let i = 0; i < 4; i++) {
          const o = 30 + i * 6;
          d += `M ${o} ${o} C ${W / 3} ${o - 14}, ${2 * W / 3} ${o + 14}, ${W - o} ${o} `;
          d += `M ${o} ${H - o} C ${SKIP_X * 0.45} ${H - o + 11}, ${SKIP_X * 0.8} ${H - o - 11}, ${SKIP_X} ${H - o} `;
          d += `M ${W - SKIP_X} ${H - o} C ${W - SKIP_X * 0.8} ${H - o + 11}, ${W - SKIP_X * 0.45} ${H - o - 11}, ${W - o} ${H - o} `;
        }
        return `<path d="${inset(20)}" fill="none" stroke="${g}" stroke-width="5"/>
                <path d="${d}" fill="none" stroke="${g2}" stroke-width="1.4" opacity=".85"/>
                <path d="${inset(58)}" fill="none" stroke="${g2}" stroke-width="2"/>`;
      }
      case 'diamond': {
        let d = '';
        for (const x of edgeX(40, W - 62, 30, false)) d += `M ${x} 38 l 11 -11 l 11 11 l -11 11 Z `;
        for (const x of edgeX(40, W - 62, 30, true))  d += `M ${x} ${H - 36} l 11 -11 l 11 11 l -11 11 Z `;
        return `<path d="${inset(20)}" fill="none" stroke="${g}" stroke-width="5"/>
                <path d="${d}" fill="none" stroke="${g2}" stroke-width="2"/>
                <path d="${inset(60)}" fill="none" stroke="${g}" stroke-width="1.2"/>`;
      }
      case 'laurel':
        return `<path d="${inset(18)}" fill="none" stroke="${g}" stroke-width="7"/>
                <path d="${inset(31)}" fill="none" stroke="${a.paper}" stroke-width="3"/>
                <path d="${inset(37)}" fill="none" stroke="${g}" stroke-width="2.5"/>
                <path d="${inset(60)}" fill="none" stroke="${g2}" stroke-width="1.6" stroke-dasharray="3 7"/>
                ${corner(46, 46, g, 1, 1)}${corner(W - 46, 46, g, -1, 1)}
                ${corner(46, H - 46, g, 1, -1)}${corner(W - 46, H - 46, g, -1, -1)}`;
      case 'royal':
        return `<path d="${inset(16)}" fill="none" stroke="${g}" stroke-width="8"/>
                <path d="${inset(30)}" fill="none" stroke="${g2}" stroke-width="3"/>
                <path d="${inset(40)}" fill="none" stroke="${g}" stroke-width="1.5"/>
                <path d="${inset(64)}" fill="none" stroke="${g}" stroke-width="1" opacity=".6"/>
                ${corner(52, 52, g, 1, 1)}${corner(W - 52, 52, g, -1, 1)}
                ${corner(52, H - 52, g, 1, -1)}${corner(W - 52, H - 52, g, -1, -1)}`;
      default:
        return `<path d="${inset(24)}" fill="none" stroke="${g}" stroke-width="4"/>`;
    }
  }

  const corner = (x, y, col, sx, sy) =>
    `<path d="M ${x} ${y + sy * 30} Q ${x} ${y} ${x + sx * 30} ${y} " fill="none" stroke="${col}" stroke-width="3"/>
     <circle cx="${x + sx * 8}" cy="${y + sy * 8}" r="4" fill="${col}"/>`;

  function star(cx, cy, r, fill, stroke) {
    let d = '';
    for (let i = 0; i < 10; i++) {
      const rr = i % 2 ? r * 0.42 : r;
      const a = (Math.PI / 5) * i - Math.PI / 2;
      d += `${i ? 'L' : 'M'} ${(cx + rr * Math.cos(a)).toFixed(2)} ${(cy + rr * Math.sin(a)).toFixed(2)} `;
    }
    return `<path d="${d}Z" fill="${fill}" stroke="${stroke || 'none'}" stroke-width="0.6"/>`;
  }

  //  The seal. Each level draws a different emblem inside the same disc, so a
  //  printed certificate still reads as a different award in grey.
  //  ⚠ cy + r + RIBBON + 4 must stay above FOOT_TOP.
  const RIBBON = 42;
  function seal(a, tier, cx, cy, r) {
    const ring = `
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="${a.seal}"/>
      <circle cx="${cx}" cy="${cy}" r="${r - 6}" fill="none" stroke="${a.seal2}" stroke-width="2.5"/>
      <circle cx="${cx}" cy="${cy}" r="${r - 11}" fill="none" stroke="${a.seal2}" stroke-width="1" opacity=".7"/>`;
    const tail = cy + r + RIBBON;
    const ribbon = `
      <path d="M ${cx - 19} ${cy + r - 6} L ${cx - 26} ${tail} L ${cx - 8} ${tail - 13} L ${cx} ${tail + 4} L ${cx} ${cy + r - 6} Z" fill="${a.ribbon}"/>
      <path d="M ${cx + 19} ${cy + r - 6} L ${cx + 26} ${tail} L ${cx + 8} ${tail - 13} L ${cx} ${tail + 4} L ${cx} ${cy + r - 6} Z" fill="${a.seal}"/>`;
    const ink = a.paper;
    let emblem = '';
    switch (a.emblem) {
      case 'sprout':
        emblem = `<path d="M ${cx} ${cy + 15} V ${cy - 5}" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>
                  <path d="M ${cx} ${cy + 2} q -18 -6 -20 -20 q 18 2 20 20 Z" fill="${ink}"/>
                  <path d="M ${cx} ${cy - 4} q 18 -6 20 -20 q -18 2 -20 20 Z" fill="${ink}"/>`;
        break;
      case 'compass':
        emblem = `<circle cx="${cx}" cy="${cy}" r="19" fill="none" stroke="${ink}" stroke-width="3"/>
                  <path d="M ${cx} ${cy - 22} L ${cx + 7} ${cy} L ${cx} ${cy + 22} L ${cx - 7} ${cy} Z" fill="${ink}"/>
                  <circle cx="${cx}" cy="${cy}" r="3.5" fill="${a.seal}"/>`;
        break;
      case 'star':
        emblem = star(cx, cy, 23, ink);
        break;
      case 'target':
        emblem = `<circle cx="${cx}" cy="${cy}" r="22" fill="none" stroke="${ink}" stroke-width="4"/>
                  <circle cx="${cx}" cy="${cy}" r="13" fill="none" stroke="${ink}" stroke-width="3"/>
                  <circle cx="${cx}" cy="${cy}" r="5" fill="${ink}"/>`;
        break;
      case 'medal':
        emblem = `<circle cx="${cx}" cy="${cy + 5}" r="18" fill="none" stroke="${ink}" stroke-width="3.5"/>
                  ${star(cx, cy + 5, 11, ink)}
                  <path d="M ${cx - 12} ${cy - 14} L ${cx - 5} ${cy - 27} M ${cx + 12} ${cy - 14} L ${cx + 5} ${cy - 27}"
                        stroke="${ink}" stroke-width="3.5" stroke-linecap="round"/>`;
        break;
      case 'scroll':
        emblem = `<path d="M ${cx - 20} ${cy - 17} h 40 v 34 h -40 Z" fill="none" stroke="${ink}" stroke-width="3"/>
                  <path d="M ${cx - 12} ${cy - 7} h 24 M ${cx - 12} ${cy + 1} h 24 M ${cx - 12} ${cy + 9} h 15"
                        stroke="${ink}" stroke-width="2.6" stroke-linecap="round"/>
                  <path d="M ${cx - 20} ${cy - 17} q -8 17 0 34 M ${cx + 20} ${cy - 17} q 8 17 0 34"
                        fill="none" stroke="${ink}" stroke-width="3"/>`;
        break;
      case 'gem':
        emblem = `<path d="M ${cx - 22} ${cy - 7} L ${cx - 11} ${cy - 22} H ${cx + 11} L ${cx + 22} ${cy - 7} L ${cx} ${cy + 24} Z"
                        fill="none" stroke="${ink}" stroke-width="3.2" stroke-linejoin="round"/>
                  <path d="M ${cx - 22} ${cy - 7} H ${cx + 22} M ${cx - 11} ${cy - 22} L ${cx} ${cy + 24} L ${cx + 11} ${cy - 22}"
                        stroke="${ink}" stroke-width="2" opacity=".85"/>`;
        break;
      case 'trophy':
        emblem = `<path d="M ${cx - 15} ${cy - 20} h 30 v 13 a 15 15 0 0 1 -30 0 Z" fill="${ink}"/>
                  <path d="M ${cx - 15} ${cy - 16} h -9 a 9 9 0 0 0 9 12 M ${cx + 15} ${cy - 16} h 9 a 9 9 0 0 1 -9 12"
                        fill="none" stroke="${ink}" stroke-width="3"/>
                  <path d="M ${cx} ${cy + 7} v 9 M ${cx - 12} ${cy + 18} h 24" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>`;
        break;
      case 'crown':
        emblem = `<path d="M ${cx - 24} ${cy + 14} L ${cx - 28} ${cy - 20} L ${cx - 11} ${cy - 4} L ${cx} ${cy - 24}
                           L ${cx + 11} ${cy - 4} L ${cx + 28} ${cy - 20} L ${cx + 24} ${cy + 14} Z"
                        fill="${ink}"/>
                  <path d="M ${cx - 22} ${cy + 20} h 44" stroke="${ink}" stroke-width="4.5" stroke-linecap="round"/>`;
        break;
      default:
        emblem = `<circle cx="${cx}" cy="${cy}" r="16" fill="none" stroke="${ink}" stroke-width="3" stroke-dasharray="5 5"/>`;
    }
    return ribbon + ring + emblem;
  }

  //  ⚠ SELF-CONTAINED ON PURPOSE. This markup is rasterised through an <img>
  //    with a data: URL, which loads no stylesheet, no webfont and no external
  //    image — anything referenced from outside silently disappears from the
  //    PNG a parent forwards. Fonts are system stacks; every mark is a path.
  //  ⚠ EVERY GRADIENT ID IS UNIQUE PER RENDER, and that is not tidiness.
  //    An SVG's <defs> ids live in the WHOLE DOCUMENT, not in the element, so
  //    nine certificates on one screen with id="cg" all paint with the FIRST
  //    one's paper. Measured in a screenshot of the card grid: the Subject
  //    Master certificate — the only dark design — rendered on the Expert
  //    certificate's pale green ground with gold text on it, unreadable, and
  //    nothing anywhere reported a problem.
  let _idSeq = 0;

  function svg(cert, opts) {
    const o = opts || {};
    const uid = 'c' + (++_idSeq).toString(36);
    const a = artFor(cert.tier.key);
    const t = cert.tier;
    const name = String(o.name || 'Your name').trim() || 'Your name';
    const gradeLine = cert.grade ? `Grade ${cert.grade}` : '';
    const subject = [gradeLine, cert.name].filter(Boolean).join(' · ');
    const serial = o.serial || 'NK-0000000-L0';
    const issued = o.issued || '';
    const dark = t.key === 'master';

    const statLine = cert.total
      ? `${fmt(cert.mastered)} of ${fmt(cert.total)} questions mastered · ${cert.pct}%`
      : 'No questions available yet';
    const chapLine = cert.chaptersTotal
      ? `${cert.chaptersComplete} of ${cert.chaptersTotal} chapters complete`
      : '';

    const disc = DISCLAIMER.short.map((l, i) =>
      `<text x="${W / 2}" y="${634 + i * 14}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
         font-size="10.5" fill="${a.sub}" opacity=".95">${xesc(l)}</text>`).join('');

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img"
   aria-label="${xesc(t.name + ' certificate for ' + name + ', ' + subject + '. ' + statLine + '. Not an official result.')}">
  <defs>
    <linearGradient id="cg-${uid}" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="${a.paper}"/><stop offset="1" stop-color="${a.paper2}"/>
    </linearGradient>
    <radialGradient id="cv-${uid}" cx="0.5" cy="0.42" r="0.75">
      <stop offset="0.55" stop-color="${a.paper}" stop-opacity="0"/>
      <stop offset="1" stop-color="${dark ? '#000000' : a.frame}" stop-opacity="${dark ? 0.55 : 0.1}"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#cg-${uid})"/>
  <rect width="${W}" height="${H}" fill="url(#cv-${uid})"/>
  ${border(a)}

  <text x="${W / 2}" y="88" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="19" letter-spacing="7" fill="${a.sub}">NOU KLASS</text>
  <text x="${W / 2}" y="108" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="10.5" letter-spacing="3" fill="${a.sub}" opacity=".8">PSAC &amp; NCE PRACTICE · NOUKLASS.COM</text>
  <path d="M ${W / 2 - 150} 124 H ${W / 2 + 150}" stroke="${a.frame}" stroke-width="1.5" opacity=".7"/>

  <text x="${W / 2}" y="160" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="12.5" letter-spacing="5" fill="${a.sub}">${t.idx ? 'CERTIFICATE OF ACHIEVEMENT' : 'YOUR CERTIFICATE SO FAR'}</text>
  <text x="${W / 2}" y="208" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="42" font-weight="bold" letter-spacing="1.5" fill="${a.ink}">${xesc(t.name)}</text>
  ${t.idx ? `<text x="${W / 2}" y="232" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="12" letter-spacing="2.5" fill="${a.sub}" opacity=".9">LEVEL ${t.idx} OF 9</text>`
        : `<text x="${W / 2}" y="232" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="12" letter-spacing="2.5" fill="${a.sub}" opacity=".9">NINE LEVELS TO EARN</text>`}

  <text x="${W / 2}" y="270" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="15" font-style="italic" fill="${a.sub}">This is to certify that</text>

  <text x="${W / 2}" y="324" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="${nameSize(name)}" font-weight="bold" fill="${a.ink}">${xesc(name)}</text>
  <path d="M ${W / 2 - 240} 340 H ${W / 2 + 240}" stroke="${a.frame}" stroke-width="1.2" opacity=".6"/>

  <text x="${W / 2}" y="372" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="16" font-style="italic" fill="${a.sub}">${xesc(t.line)}</text>
  <text x="${W / 2}" y="410" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="28" font-weight="bold" fill="${a.ink}">${xesc(subject)}</text>

  <text x="${W / 2}" y="444" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="15" fill="${a.sub}">${xesc(statLine)}</text>
  ${chapLine ? `<text x="${W / 2}" y="465" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="12.5" fill="${a.sub}" opacity=".9">${xesc(chapLine)}</text>` : ''}

  ${seal(a, t, W / 2, 522, 40)}

  <text x="58" y="600" font-family="Helvetica, Arial, sans-serif" font-size="11" fill="${a.sub}">
    Certificate no. ${xesc(serial)}</text>
  <text x="${W - 58}" y="600" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="11" fill="${a.sub}">
    ${xesc(issued ? 'Issued ' + issued : '')}</text>
  <path d="M 58 ${FOOT_TOP} H ${W - 58}" stroke="${a.frame}" stroke-width="1" opacity=".45"/>
  ${disc}
</svg>`;
  }

  // ══════════════════════════════════════════════════════════════════════
  //  State for the screen
  // ══════════════════════════════════════════════════════════════════════
  let _records = [];        // built subject records, in pack order
  let _viewing = null;      // packId currently open in the viewer
  let _subject = null;      // { id, name, grade } the certificates belong to
  let _stale = false;       // rendered from the cached snapshot
  let _error = null;        // 'no_subject' | 'counts' | 'fetch'
  let _errorDetail = null;  // the server's own words, for the message only
  let _loading = false;
  // ⚠ Module-level UI state is reset in the RENDER, not in the toggle. This
  //   file has one such flag and it follows the same rule as _shopOpen and
  //   _examReviewWrongOnly: a stale "info open for pack X" is how a screen
  //   comes back showing the previous child's subject.
  let _infoPack = null;
  let _otherTab = null;      // which other grade's certificates are on screen
  let _otherTabOwner = null; // …and whose. See the reset in _paint().
  // ⚠ THE PARENT PANEL IS A SECOND HOST, NOT A MOVED SCREEN. PD._mountPanel()
  //   works by MOVING a screen's markup into the dashboard panel, which is how
  //   the shop and the calendar get there — and it is a one-way trip. A parent
  //   who opens the Certificates tab and then hands the phone to their child
  //   (Auth.switchToStudentSelect() never reloads the page) would leave the
  //   child's own My Certificates screen empty, with nothing explaining it.
  //   So the panel carries its own markup and names its own body element, and
  //   this module paints into whichever one asked.
  //  ⚠ TWO RENDERS CAN BE IN FLIGHT AT ONCE, and the second one is not
  //    hypothetical: Certificates.open() called showScreen('certificates'),
  //    whose render dispatch in app.js calls render() too, so every tap on the
  //    board note started two. Both awaited the same rpc and both pushed into
  //    one shared array, so the screen drew EVERY SUBJECT TWICE — "2 of 10
  //    Grade 5 subjects started · 850 questions mastered" for a child with 5
  //    subjects and 425. open() no longer double-fires, and this guard covers
  //    every other route into it: tapping Refresh twice, or a parent switching
  //    child faster than the rpc answers.
  let _loadSeq = 0;
  let _hostId = 'cert-body';
  const _host = () => document.getElementById(_hostId);

  const _isAdultView = () => !!(typeof _isParentContext === 'function' && _isParentContext());

  //  ⚠ A STUDENT ROW HAS NO `name` COLUMN. Auth.getStudents() hands back raw
  //    `students` rows, and the column is `display_name` (with `username` as
  //    the fallback the rest of app.js uses — see openChildLoginModal,
  //    renderParentDashboard, pd-detail-name). Only Auth.getActiveAccount()
  //    carries a mapped `.name`, and that object exists ONLY in a child
  //    session — in parent mode it is null, which is exactly the path that
  //    reads these rows.
  //  ⚠ Reading `.name` off a row does not throw: it yields undefined and the
  //    fallback prints, so every child on the screen was named "Your child"
  //    and every picker chip said "Child". Reported from the live app, not
  //    caught here, because the browser test stubbed the shape it expected
  //    instead of the shape the database has.
  const _kidName = (row) => (row && (row.display_name || row.username)) || 'Your child';

  //  Who this screen is about. In a child session that is the child. In parent
  //  mode it is the child the parent has chosen, defaulting to the one the
  //  dashboard has in focus, then to the first child in the family.
  function _resolveSubject(preferId) {
    if (!_isAdultView()) {
      const acct = (typeof Auth !== 'undefined' && Auth.getActiveAccount) ? Auth.getActiveAccount() : null;
      const id = (typeof ACTIVE_STUDENT_ID !== 'undefined' && ACTIVE_STUDENT_ID) ? ACTIVE_STUDENT_ID : (acct && acct.id);
      return {
        id,
        // ⚠ `DB.name` is read first for consistency with app.js (_appShareText,
        //   the friend invite), but NOTHING in this repo ever assigns it — the
        //   one that answers is Auth.getActiveAccount().name, mapped from
        //   students.display_name when the child signed in.
        name: (typeof DB !== 'undefined' && DB && DB.name)
              || (acct && acct.name)
              || _kidName(acct)
              || 'Your name',
        grade: (acct && acct.grade) || (typeof SELECTED_GRADE !== 'undefined' ? SELECTED_GRADE : null),
        adult: false,
      };
    }
    const kids = (typeof Auth !== 'undefined' && Auth.getStudents) ? (Auth.getStudents() || []) : [];
    const want = preferId
      || (typeof PD !== 'undefined' && PD.activeId && PD.activeId())
      || (typeof ACTIVE_STUDENT_ID !== 'undefined' && ACTIVE_STUDENT_ID)
      || (kids[0] && kids[0].id);
    const kid = kids.find(k => k && k.id === want) || kids[0] || null;
    return kid
      ? { id: kid.id, name: _kidName(kid), grade: kid.grade, adult: true, kids }
      : { id: null, name: '', grade: null, adult: true, kids };
  }

  //  Every live pack of the child's grade, plus any live pack they have
  //  actually practised in ANOTHER grade — a parent can unlock extra grades
  //  (GradeAccess: own grade always, plus restrictions.allowedGrades) and a
  //  child who stretches upward earns a real certificate there.
  //  ⚠ comingSoon packs are filtered: this is a list a parent and a child see.
  //  ⚠ OWN GRADE SHOWS EVERY SUBJECT, ANOTHER GRADE ONLY WHAT WAS STARTED.
  //    Showing all eight Grade 9 subjects to a Grade 5 child whose parent
  //    unlocked the grade would bury their own five under empty cards. Their
  //    own grade is the set they are meant to see whole; another grade earns
  //    its place on the screen by being practised.
  //  ⚠ A pack from a grade the parent has SINCE revoked still appears. The
  //    work was really done and the certificate was really earned; taking it
  //    away would be a lie in the other direction. The card says the grade is
  //    locked instead of nagging them toward a level they cannot reach.
  function _packsFor(grade, byPack) {
    const all = (typeof SUBJECT_PACKS !== 'undefined' && Array.isArray(SUBJECT_PACKS)) ? SUBJECT_PACKS : [];
    const live = all.filter(p => p && !p.comingSoon);
    const g = Number(grade);
    const mine = live.filter(p => Number(p.grade) === g);
    const other = live
      .filter(p => byPack[p.id] && Number(p.grade) !== g)
      .sort((a, b) => (Number(a.grade) - Number(b.grade)) || String(a.id).localeCompare(String(b.id)));
    return mine.map(p => p.id).concat(other.map(p => p.id));
  }

  //  Which grades this child may practise right now. ⚠ CHILD SESSION ONLY:
  //  restrictions live in the progress blob, and in parent mode the blob on
  //  screen belongs to whoever was loaded last, not necessarily to the child
  //  whose certificates are being drawn. Answering null means "do not claim".
  function _allowedGrades() {
    if (_subject && _subject.adult) return null;
    if (typeof GradeAccess === 'undefined' || !GradeAccess.allowed) return null;
    try {
      const r = (typeof DB !== 'undefined' && DB && DB.restrictions) || {};
      return GradeAccess.allowed(_subject && _subject.grade, r);
    } catch (e) { return null; }
  }

  //  Returns false when a newer load superseded this one — the caller must
  //  then paint nothing, because the screen belongs to that newer load.
  async function load(preferId) {
    const seq = ++_loadSeq;
    const stale = () => seq !== _loadSeq;
    _loading = true;
    _subject = _resolveSubject(preferId);
    _error = null; _errorDetail = null; _stale = false; _records = [];
    //  ⚠ 'no_subject', NOT 'no_student'. student_subject_progress() RAISES
    //    with the message "no_student" when it is called without a token, and
    //    that message lands in _error a few lines below. The two states are
    //    opposite — "we do not know which child this screen is about" versus
    //    "the server would not answer for a child we know perfectly well" —
    //    and sharing a string made a child with an expired token read
    //    "Open a child first to see their certificates".
    if (!_subject.id) { _loading = false; _error = 'no_subject'; return true; }

    let counts = {};
    try { counts = await _ensureCounts(); }
    catch (e) { if (stale()) return false; _loading = false; _error = 'counts'; return true; }
    if (stale()) return false;

    const res = await _fetchProgress(_subject.id, { asAdult: _subject.adult });
    if (stale()) return false;
    _stale = res.stale;
    // The server's own wording is kept for the note, never for the branch.
    _errorDetail = res.error || null;
    if (res.error && !res.rows.length) _error = 'fetch';
    const byPack = _indexRows(res.rows);

    const cap = (!_subject.adult && typeof DB !== 'undefined' && DB && DB.restrictions
                 && DB.restrictions.maxDifficulty != null) ? DB.restrictions.maxDifficulty : 4;

    const canWrite = !_subject.adult
      && typeof ACTIVE_STUDENT_ID !== 'undefined' && ACTIVE_STUDENT_ID === _subject.id
      && !res.stale && !res.error;

    const recs = [];
    const levelUps = [];
    // Computed once: GradeAccess reads the blob and the pack list on every call.
    const allowed = _allowedGrades();
    for (const packId of _packsFor(_subject.grade, byPack)) {
      const rec = buildRecord(packId, counts, byPack[packId] || {}, { maxDifficulty: cap });
      rec.ownGrade = Number(rec.grade) === Number(_subject.grade);
      // null = we are not in a position to know (parent view); never guess.
      rec.locked = !rec.ownGrade && Array.isArray(allowed) && !allowed.includes(Number(rec.grade));
      const kept = _remember(_subject.id, rec, canWrite);
      rec.serial = kept.stored ? kept.stored.serial : serialFor(_subject.id, packId, rec.tier.idx);
      rec.issued = kept.stored ? kept.stored.issued : _todayKey();
      rec.firstIssued = kept.stored ? kept.stored.firstIssued : rec.issued;
      if (kept.levelUp && rec.tier.idx > 0) levelUps.push(rec);
      recs.push(rec);
    }
    if (stale()) return false;
    _loading = false;
    recs._levelUps = levelUps;
    _records = recs;
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  //  The showcase screen
  // ══════════════════════════════════════════════════════════════════════
  async function render(preferId, hostId) {
    if (hostId) _hostId = hostId;
    const host = _host();
    if (!host) return;
    _infoPack = null;                       // reset in the render, not the toggle
    host.innerHTML = `<div class="cert-loading"><div class="cert-spin" aria-hidden="true"></div>
        <p>Building your certificates…</p></div>`;
    if (!await load(preferId)) return;   // a newer render owns the screen
    _paint();
    const ups = _records._levelUps || [];
    if (ups.length && !_isAdultView() && typeof toast === 'function') {
      const r = ups[0];
      toast(`${r.tier.icon} New certificate level in ${r.name}: ${r.tier.name}!`, 4200);
      if (typeof launchConfetti === 'function') { try { launchConfetti(); } catch (e) {} }
    }
  }

  function _paint() {
    const host = _host();
    if (!host) return;

    const picker = _subject && _subject.adult && (_subject.kids || []).length > 1
      ? `<div class="cert-kidpick" role="group" aria-label="Choose a child">
           ${_subject.kids.map(k => `<button class="cert-kid${k.id === _subject.id ? ' is-on' : ''}"
              onclick="Certificates.render('${esc(k.id)}','${esc(_hostId)}')">${esc(k.avatar || '\u{1F9D2}')} ${esc(_kidName(k))}</button>`).join('')}
         </div>`
      : '';

    if (_error === 'no_subject') {
      host.innerHTML = picker + `<p class="cert-empty">Open a child first to see their certificates.</p>`;
      return;
    }
    //  ⚠ A refused or unreachable server with nothing cached is NOT "no
    //    progress yet". Drawing a full set of empty certificates here would
    //    tell a child who has practised for months that they have done
    //    nothing, which is the one thing a progress screen must never do.
    if (_error === 'fetch') {
      host.innerHTML = picker + `<p class="cert-empty">We could not reach your progress just now, and there is
          nothing saved on this device yet.<br><button class="cert-btn" onclick="Certificates.render()">Try again</button></p>`;
      return;
    }
    if (_error === 'counts') {
      host.innerHTML = picker + `<p class="cert-empty">Your certificates could not be built right now.
        <button class="cert-btn" onclick="Certificates.render()">Try again</button></p>`;
      return;
    }
    if (!_records.length) {
      host.innerHTML = picker + `<p class="cert-empty">There are no live subjects for this grade yet.</p>`;
      return;
    }

    const staleNote = _stale
      ? `<p class="cert-stale">⏳ Showing the last progress saved on this device — we could not reach the
           server just now, so these numbers may be behind.</p>`
      : '';

    //  ⚠ THE DENOMINATOR IS THE CHILD'S OWN GRADE. Counting cross-grade packs
    //    in it inflates both halves — an extra-grade pack only appears here
    //    BECAUSE it was started, so it is always its own numerator, and "3 of
    //    7 started" for a child who has started three of five own subjects is
    //    simply wrong.
    const own = _records.filter(r => r.ownGrade);
    const other = _records.filter(r => !r.ownGrade);
    const earned = own.filter(r => r.tier.idx > 0).length;
    const total = _records.reduce((s, r) => s + r.mastered, 0);
    const summary = `<p class="cert-summary"><strong>${earned}</strong> of <strong>${own.length}</strong>
        Grade ${esc(_subject.grade)} subject${own.length === 1 ? '' : 's'} started${
        other.length ? ` · <strong>${other.length}</strong> from other grades` : ''}
        · <strong>${fmt(total)}</strong> questions mastered in total</p>`;

    //  Own grade first and whole, then anything earned in another grade.
    //  ⚠ Two packs can share a NAME across grades — "🔢 Mathematics" twice, one
    //    Grade 5 and one Grade 6 — so the grade goes on the card itself, not
    //    only inside the artwork where it is four pixels tall.
    //  ⚠ ONE GRADE AT A TIME once there is more than one. A child who has
    //    practised three other grades would otherwise have two dozen full-size
    //    certificate cards stacked below their own, and their own grade is the
    //    part they came to see.
    const otherGrades = [...new Set(other.map(r => Number(r.grade)))].sort((a, b) => a - b);
    // ⚠ Reset in the RENDER, not in the toggle. A tab remembered from the
    //   previous child — or from a grade that is no longer in the list — is how
    //   this screen would come back showing nothing at all.
    // ⚠ RESET IN THE RENDER, NOT IN THE TOGGLE — the rule this repo keeps
    //   relearning. Checking only "is the remembered grade still in the list"
    //   was not enough: a parent switching from a child who had practised
    //   Grade 4 to one who had practised Grade 4 AND Grade 6 kept the first
    //   child's tab, because 4 was still a valid answer. The tab belongs to a
    //   CHILD, so it is cleared when the child changes and kept across an
    //   ordinary refresh of the same one.
    if (_otherTabOwner !== _subject.id) { _otherTabOwner = _subject.id; _otherTab = null; }
    // Nothing earned elsewhere: no tab to choose, and no record to read.
    if (!other.length) { _otherTab = null; }
    else if (!otherGrades.includes(Number(_otherTab))) {
      // ⚠ The MOST RECENTLY PRACTISED grade, not the lowest. Sorting the tabs
      //   by number is right; opening on the numerically smallest is not — a
      //   child who did Grade 4 once last term and Grade 6 this morning would
      //   land on the one they have finished with.
      let best = other[0];
      for (const rec of other) if ((rec.lastAt || 0) > (best.lastAt || 0)) best = rec;
      _otherTab = Number(best.grade);
    }

    const otherTabs = otherGrades.length > 1
      ? `<div class="cert-gradetabs" role="tablist" aria-label="Other grades">
           ${otherGrades.map(g => `<button role="tab" aria-selected="${Number(g) === Number(_otherTab)}"
              class="cert-gradetab${Number(g) === Number(_otherTab) ? ' is-on' : ''}"
              onclick="Certificates.otherTab(${Number(g)})">Grade ${Number(g)}
              <span class="cert-gradetab-n">${other.filter(r => Number(r.grade) === Number(g)).length}</span>
            </button>`).join('')}
         </div>`
      : '';

    const shown = otherGrades.length > 1
      ? other.filter(r => Number(r.grade) === Number(_otherTab))
      : other;

    const otherBlock = other.length
      ? `<h3 class="cert-group-h">Other grades</h3>
         <p class="cert-group-note">Certificates ${esc(_subject.adult ? 'this child has' : 'you have')} earned outside
            Grade ${esc(_subject.grade)}. A subject appears here once ${esc(_subject.adult ? 'they have' : 'you have')}
            started it.</p>
         ${otherTabs}
         <div class="cert-grid">${shown.map(_card).join('')}</div>`
      : '';

    host.innerHTML = picker + staleNote + summary +
      `<div class="cert-grid">${own.map(_card).join('')}</div>` + otherBlock;
  }

  function _card(r) {
    const a = artFor(r.tier.key);
    const started = r.tier.idx > 0;
    //  ⚠ The grade chip appears ONLY on a pack outside the child's own grade.
    //    On every card it would be noise; on these it is the only thing
    //    telling two identically-named subjects apart.
    const gradeChip = (!r.ownGrade && r.grade)
      ? ` <span class="cert-card-grade${r.locked ? ' is-locked' : ''}">Grade ${esc(r.grade)}</span>` : '';
    //  A grade the parent has since locked gets the truth, not a nudge toward
    //  a level the child cannot currently practise for.
    const next = r.locked
      ? `Grade ${esc(r.grade)} is not unlocked right now, so this certificate stays as it is.`
      : r.nextTier
        ? `${fmt(r.toNext)} more to reach <strong>${esc(r.nextTier.name)}</strong>`
        : 'Every question mastered — the highest level.';
    return `
      <article class="cert-card${started ? '' : ' is-locked'}" style="--c-frame:${a.frame};--c-seal:${a.seal};--c-paper:${a.paper};--c-paper2:${a.paper2};--c-ink:${a.ink}">
        <div class="cert-thumb" aria-hidden="true">${svg(r, { name: _subject.name, serial: r.serial, issued: r.issued })}</div>
        <div class="cert-card-body">
          <h3 class="cert-card-title">${esc(r.icon)} ${esc(r.name)}${gradeChip}</h3>
          <p class="cert-card-tier"><span class="cert-tier-ico" aria-hidden="true">${r.tier.icon}</span>${esc(r.tier.name)}</p>
          <div class="cert-bar" role="img" aria-label="${r.pct} percent mastered">
            <span style="width:${Math.max(r.mastered ? 2 : 0, r.pct)}%"></span>
          </div>
          <p class="cert-card-num"><strong>${fmt(r.mastered)}</strong> of ${fmt(r.total)} questions mastered
             · ${r.pct}%</p>
          <p class="cert-card-next">${next}</p>
          <div class="cert-card-actions">
            <button class="cert-btn is-primary" onclick="Certificates.view('${esc(r.packId)}')">View certificate</button>
            <button class="cert-btn" onclick="Certificates.info('${esc(r.packId)}')">More info</button>
          </div>
        </div>
      </article>`;
  }

  const _recFor = (packId) => _records.find(r => r.packId === packId) || null;

  // ── the viewer ──────────────────────────────────────────────────────────
  function view(packId) {
    const r = _recFor(packId);
    if (!r) return;
    _viewing = packId;
    const host = document.getElementById('modal-certificate');
    const body = document.getElementById('cert-view-body');
    const title = document.getElementById('cert-view-title');
    if (!host || !body) return;
    if (title) title.textContent = `${r.tier.name} · ${r.name}`;
    body.innerHTML = `
      <div class="cert-sheet">${svg(r, { name: _subject.name, serial: r.serial, issued: r.issued })}</div>
      <p class="cert-view-note">${esc(r.tier.blurb)}</p>
      <div class="cert-view-actions">
        <button class="cert-btn is-primary" onclick="Certificates.share('${esc(packId)}')">\u{1F4E4} Share</button>
        <button class="cert-btn" onclick="Certificates.savePng('${esc(packId)}')">\u{1F5BC}️ Save image</button>
        <button class="cert-btn" onclick="Certificates.savePdf('${esc(packId)}')">\u{1F4C4} Save as PDF</button>
        <button class="cert-btn" onclick="Certificates.info('${esc(packId)}')">ℹ️ More info</button>
      </div>`;
    host.classList.remove('hidden');
  }

  function close() {
    document.getElementById('modal-certificate')?.classList.add('hidden');
    document.getElementById('modal-certificate-info')?.classList.add('hidden');
    _viewing = null;
  }

  // ── taking the child straight to the work ───────────────────────────────
  //  ⚠ THE SANCTIONED ROUTE, and every step of it is load-bearing.
  //    PackLoader.ensure() brings the MANIFEST (chapters, syllabus,
  //    generators); activateSubjectPack() makes it the active pack so CHAPTERS
  //    and the difficulty cap resolve; QuestionLoader.loadSubject() brings the
  //    QUESTIONS, which the manifest does not — SubjectHub.open() carries the
  //    same comment because a screen drawn without it reported "0 questions"
  //    on a pack holding 499. Only then may PracticeJourney.start() run, and it
  //    routes through startChapterWithSet -> startChapterDirect so the chapter
  //    lock, the plan check and the cloze redirect all still apply. Never start
  //    practice by any other path.
  //  ⚠ CHILD SESSIONS ONLY. showScreen() bounces a parent off a kid screen, so
  //    a parent tapping this would be thrown back to their dashboard; the
  //    button is not drawn for them at all.
  async function practise(packId, chapterId, mode) {
    if (_isAdultView()) return;
    const rec = _recFor(packId);
    if (rec && rec.locked) return;
    close(); closeInfo();

    const run = async () => {
      if (typeof PackLoader !== 'undefined') await PackLoader.ensure(packId).catch(() => {});
      if (typeof activateSubjectPack === 'function') activateSubjectPack(packId);
      if (typeof QuestionLoader !== 'undefined' && QuestionLoader.loadSubject) {
        try { await QuestionLoader.loadSubject(packId); } catch (e) {}
      }
      // ⚠⚠ AND THE PER-QUESTION PROGRESS, which neither of the loads above
      //    carries. PracticeJourney picks its set from
      //    QuestionProgress.forChapter(), a LOCAL CACHE that only
      //    loadChapter() ever fills — the chapter screens fill it on the way
      //    in, and this entry point did not. Measured: 12 eligible questions,
      //    0 progress rows, so all 12 bucketed as "unseen", "needs" was empty
      //    and a "Fix 1" tap selected nothing at all.
      if (typeof QuestionProgress !== 'undefined' && QuestionProgress.loadChapter) {
        const who = (typeof ACTIVE_STUDENT_ID !== 'undefined') ? ACTIVE_STUDENT_ID : null;
        try { await QuestionProgress.loadChapter(who, chapterId, { force: true }); } catch (e) {}
      }
    };

    try {
      if (typeof _withRouteBusy === 'function') {
        await _withRouteBusy('Opening ' + (rec ? rec.name : 'subject'), 'Loading the questions', run);
      } else { await run(); }
      if (typeof PracticeJourney === 'undefined') return;

      // ⚠ DECIDE HERE, DO NOT LET PracticeJourney's EMPTY STATE HANDLE IT.
      //   Its showEmpty() writes into the options sheet's body — correct for
      //   its own callers, which all open that sheet first, and invisible for
      //   this one, which does not. The tap wrote 241 characters into a hidden
      //   box and looked like a dead button. Checking the buckets here is
      //   reading state, not duplicating the selection policy, which stays in
      //   practice_selector.js.
      const qs = PracticeJourney.eligible(chapterId);
      if (!qs.length) {
        if (typeof toast === 'function') toast('Those questions could not be loaded just now. Try again in a moment.', 3400);
        return;
      }
      let use = mode || 'smart';
      if (typeof PracticeSelector !== 'undefined' && typeof QuestionProgress !== 'undefined') {
        const b = PracticeSelector.bucket(qs, QuestionProgress.forChapter(chapterId));
        if (use === 'fix' && !b.needs.length) {
          use = 'smart';
          if (typeof toast === 'function') toast('Nothing left to fix in this chapter — here is a practice set instead.', 3400);
        } else if (use === 'new' && !b.unseen.length) {
          use = 'smart';
          if (typeof toast === 'function') toast('You have tried every question here — here is a revision set.', 3400);
        }
      }
      PracticeJourney.start(chapterId, use);
    } catch (e) {
      if (typeof toast === 'function') toast('Could not open that chapter just now. Try again in a moment.', 3000);
    }
  }

  // ── "More info": what is done, and exactly where the work is ────────────
  function info(packId) {
    const r = _recFor(packId);
    if (!r) return;
    _infoPack = packId;
    const host = document.getElementById('modal-certificate-info');
    const body = document.getElementById('cert-info-body');
    const title = document.getElementById('cert-info-title');
    if (!host || !body) return;
    if (title) title.textContent = `${r.icon} ${r.name}${r.ownGrade ? '' : ` · Grade ${r.grade}`}`;

    const nextBlock = r.nextTier
      ? `<div class="cert-next">
           <p class="cert-next-h">Next level: <strong>${esc(r.nextTier.icon)} ${esc(r.nextTier.name)}</strong></p>
           <p class="cert-next-b">Master <strong>${fmt(r.toNext)}</strong> more question${r.toNext === 1 ? '' : 's'}
              in this subject and the certificate is replaced with the new one.</p>
           <p class="cert-next-c">${esc(r.nextTier.blurb)}</p>
         </div>`
      : `<div class="cert-next is-max">
           <p class="cert-next-h">\u{1F451} This is the highest level.</p>
           <p class="cert-next-b">Every practisable question in every chapter of this subject has been
              answered correctly.</p>
         </div>`;

    //  ⚠ CLOSEST TO FINISHING FIRST, and this is the whole point of the
    //    section. The table below used to be the only view and was sorted by
    //    the MOST left, so a chapter sitting at 89 of 90 with one wrong answer
    //    — the single cheapest point in the subject — was the last row on the
    //    screen. A child should never have to hunt for the question they
    //    missed. Fewest remaining first, and a known wrong answer outranks an
    //    untried question at the same distance because it is a precise target.
    const todo = r.chapters.filter(c => !c.complete)
      .sort((a, b) => (a.left - b.left) || (b.needs - a.needs) || a.name.localeCompare(b.name));
    const canPractise = !_isAdultView() && !r.locked;

    const focusRow = (c) => {
      const bits = [];
      bits.push(`<strong>${fmt(c.left)}</strong> question${c.left === 1 ? '' : 's'} left`);
      if (c.needs) bits.push(`<span class="cert-fx-fix">${fmt(c.needs)} to fix</span>`);
      //  A chapter with wrong answers waiting goes straight to those questions
      //  ("fix"); one that is merely unfinished goes to the ones never tried
      //  ("new"). Both are PracticeJourney modes, so the selection policy stays
      //  in practice_selector.js where it is tested.
      const mode = c.needs ? 'fix' : 'new';
      const label = c.needs
        ? `Fix ${fmt(Math.min(c.needs, c.left))} →`
        : `Practise →`;
      return `<li class="cert-fx">
          <span class="cert-fx-ico" aria-hidden="true">${esc(c.icon)}</span>
          <span class="cert-fx-text">
            <span class="cert-fx-name">${esc(c.name)}</span>
            <span class="cert-fx-sub">${bits.join(' · ')} · ${fmt(c.mastered)} of ${fmt(c.total)} done</span>
            <span class="cert-bar cert-bar-sm"><span style="width:${Math.max(c.mastered ? 3 : 0, c.pct)}%"></span></span>
          </span>
          ${canPractise
            ? `<button class="cert-btn is-primary cert-fx-go"
                 onclick="Certificates.practise('${esc(r.packId)}','${esc(c.id)}','${mode}')">${label}</button>`
            : ''}
        </li>`;
    };

    const focusBlock = todo.length
      ? `<h4 class="cert-h4">Where to work next</h4>
         <p class="cert-note">${esc(r.locked
            ? 'Closest to finishing first. This grade is not unlocked right now, so these are for reference.'
            : canPractise
              ? 'Closest to finishing first — the quickest points are at the top.'
              : 'Closest to finishing first. Hand the device over and your child can start from here.')}</p>
         <ul class="cert-fx-list">${todo.slice(0, 5).map(focusRow).join('')}</ul>
         ${todo.length > 5 ? `<p class="cert-note">${todo.length - 5} more chapter${todo.length - 5 === 1 ? '' : 's'} below.</p>` : ''}`
      : `<h4 class="cert-h4">Where to work next</h4>
         <p class="cert-note">\u{1F389} Every chapter in this subject is complete. There is nothing left to fix.</p>`;

    //  The full picture, in the same order, with finished chapters last so the
    //  list reads as a run of work rather than a wall of ticks.
    const all = todo.concat(r.chapters.filter(c => c.complete));
    const rows = all.map(c => `
      <tr class="${c.complete ? 'is-done' : ''}">
        <td class="cert-t-name">${esc(c.icon)} ${esc(c.name)}</td>
        <td class="cert-t-num">${fmt(c.mastered)}<span class="cert-t-of">/${fmt(c.total)}</span></td>
        <td class="cert-t-bar"><div class="cert-bar cert-bar-sm"><span style="width:${Math.max(c.mastered ? 3 : 0, c.pct)}%"></span></div></td>
        <td class="cert-t-left">${c.complete ? '✓ done' : `${fmt(c.left)} left${c.needs ? `<span class="cert-t-fix"> · ${fmt(c.needs)} to fix</span>` : ''}`}</td>
      </tr>`).join('');

    const capNote = r.cappedOut > 0
      ? `<p class="cert-note is-warn">\u{1F512} <strong>${fmt(r.cappedOut)}</strong> of these questions are above the
           difficulty level a parent has set for this account, so they cannot be practised right now. They still
           count towards the total — a lower setting must not make mastery easier to reach.</p>`
      : '';

    const lockNote = r.locked
      ? `<p class="cert-note is-warn">\u{1F512} Grade ${esc(r.grade)} is not unlocked for this account right now, so
           this certificate stays as it is. A parent can unlock the grade again in Settings.</p>`
      : '';

    const genNote = `<p class="cert-note">Some chapters can also generate unlimited extra practice questions.
        Those are created fresh each time and have no lasting number, so they are not counted here.</p>`;

    body.innerHTML = `
      <div class="cert-info-head">
        <span class="cert-info-tier" aria-hidden="true">${r.tier.icon}</span>
        <div>
          <p class="cert-info-level">${esc(r.tier.name)}</p>
          <p class="cert-info-sub">${fmt(r.mastered)} of ${fmt(r.total)} questions mastered · ${r.pct}%</p>
        </div>
      </div>

      <dl class="cert-stats">
        <div><dt>Questions mastered</dt><dd>${fmt(r.mastered)}</dd></div>
        <div><dt>Questions tried</dt><dd>${fmt(r.explored)}</dd></div>
        <div class="${r.needs ? 'is-flag' : ''}"><dt>Still to fix</dt><dd>${fmt(r.needs)}</dd></div>
        <div><dt>Never tried</dt><dd>${fmt(Math.max(0, r.total - r.explored))}</dd></div>
        <div><dt>Chapters complete</dt><dd>${r.chaptersComplete} / ${r.chaptersTotal}</dd></div>
        <div><dt>Answer accuracy</dt><dd>${r.accuracy == null ? '—' : r.accuracy + '%'}</dd></div>
      </dl>

      ${nextBlock}
      ${lockNote}
      ${focusBlock}

      <h4 class="cert-h4">What counts as mastered</h4>
      <p class="cert-note">A question is mastered when it is answered correctly first time — or, after a wrong
        answer, correctly <strong>twice in a row</strong>. One lucky guess after a mistake is not enough.
        Practising a chapter deals 20 questions at a time, so a chapter with 80 questions needs several
        rounds before it is complete, and this subject needs every chapter finished.</p>
      ${capNote}
      ${genNote}

      <h4 class="cert-h4">Every chapter</h4>
      <table class="cert-table">
        <thead><tr><th>Chapter</th><th>Mastered</th><th></th><th>Left</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>

      <p class="cert-disclaim">${DISCLAIMER.long}</p>`;
    host.classList.remove('hidden');
  }

  //  Repaints from what is already loaded — no refetch, so switching grade is
  //  instant and cannot race with a load in flight.
  function otherTab(grade) {
    _otherTab = Number(grade);
    _paint();
  }

  function closeInfo() {
    document.getElementById('modal-certificate-info')?.classList.add('hidden');
    _infoPack = null;
  }

  // ══════════════════════════════════════════════════════════════════════
  //  Export: PNG, share, print
  // ══════════════════════════════════════════════════════════════════════
  const fileStem = (r) => `nouklass-certificate-${String(r.name).toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${r.tier.key}`;

  //  ⚠ data: URL, no crossOrigin, no external reference — the canvas is never
  //    tainted, so toBlob() cannot throw a SecurityError. That is the whole
  //    reason the artwork carries no <image> and no webfont.
  function toPngBlob(markup, scale) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const s = Math.max(1, scale || 2);
      img.onload = () => {
        try {
          const cv = document.createElement('canvas');
          cv.width = W * s; cv.height = H * s;
          const ctx = cv.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, cv.width, cv.height);
          ctx.drawImage(img, 0, 0, cv.width, cv.height);
          cv.toBlob(b => b ? resolve(b) : reject(new Error('encode_failed')), 'image/png');
        } catch (e) { reject(e); }
      };
      img.onerror = () => reject(new Error('render_failed'));
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(markup);
    });
  }

  function _markupFor(packId) {
    const r = _recFor(packId);
    if (!r) return null;
    return { r, markup: svg(r, { name: _subject.name, serial: r.serial, issued: r.issued }) };
  }

  async function savePng(packId) {
    const m = _markupFor(packId);
    if (!m) return;
    try {
      const blob = await toPngBlob(m.markup, 2);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = fileStem(m.r) + '.png';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      if (typeof toast === 'function') toast('\u{1F5BC}️ Certificate image saved.', 2600);
    } catch (e) {
      if (typeof toast === 'function') toast('Could not make the image. Try "Save as PDF" instead.', 3600);
    }
  }

  //  ⚠ THE PICTURE CARRIES THE NAME; THE MESSAGE DOES NOT. A shared score in
  //    this app deliberately never carries a child's name, id or profile link,
  //    and a text message is forwarded far beyond whoever it was sent to. The
  //    certificate image is a file the family chose to attach; the words beside
  //    it stay anonymous.
  // ⚠ Tolerates having no `location`: the ladder, the record builder and this
  //   string are all driven from Node by scripts/test-certificates.js, and the
  //   share copy is the half a parent actually forwards.
  const _appUrl = () => (typeof location !== 'undefined' && location)
    ? location.origin + location.pathname : 'https://nouklass.com/';

  function shareText(r) {
    const subject = [r.grade ? `Grade ${r.grade}` : '', r.name].filter(Boolean).join(' ');
    return `${r.tier.icon} ${r.tier.name} certificate earned in ${subject} on Nou Klass — `
         + `${fmt(r.mastered)} of ${fmt(r.total)} questions mastered.\n\n`
         + `${DISCLAIMER.share}\n${_appUrl()}`;
  }

  async function share(packId) {
    const m = _markupFor(packId);
    if (!m) return;
    const text = shareText(m.r);
    try {
      const blob = await toPngBlob(m.markup, 2);
      const file = new File([blob], fileStem(m.r) + '.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
        await navigator.share({ files: [file], text, title: `${m.r.tier.name} · ${m.r.name}` });
        return;
      }
    } catch (e) {
      // A cancelled share sheet throws too; there is nothing to report and
      // nothing to fall back to, so fall through only when sharing a file was
      // never possible in the first place.
      if (e && e.name === 'AbortError') return;
    }
    if (navigator.share) {
      try { await navigator.share({ text, title: 'Nou Klass certificate' }); return; }
      catch (e) { if (e && e.name === 'AbortError') return; }
    }
    // Last resort: save the picture and open WhatsApp with the words.
    await savePng(packId);
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank', 'noopener');
  }

  //  ⚠ A NEW WINDOW WITH ITS OWN STYLESHEET, like the printable papers.
  //    style.css is not loaded there, and print rules living in the app's
  //    stylesheet would print a certificate that looks nothing like the one on
  //    screen. Everything the page needs is written into it.
  function savePdf(packId) {
    const m = _markupFor(packId);
    if (!m) return;
    const r = m.r;
    const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<title>${esc(r.tier.name)} certificate · ${esc(r.name)}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Helvetica,Arial,sans-serif;background:#f1f5f9;padding:18px;text-align:center}
  .bar{margin-bottom:16px}
  .no-print{background:#1d4ed8;color:#fff;border:0;padding:10px 22px;font-size:13pt;border-radius:6px;cursor:pointer;margin:0 6px}
  .no-print:hover{background:#1e40af}
  .sheet{max-width:1000px;margin:0 auto;background:#fff;box-shadow:0 6px 24px rgba(0,0,0,.18)}
  .sheet svg{display:block;width:100%;height:auto}
  .foot{max-width:1000px;margin:14px auto 0;font-size:10pt;color:#475569;line-height:1.5;text-align:left}
  @page{size:A4 landscape;margin:8mm}
  @media print{
    body{background:#fff;padding:0}
    .no-print{display:none}
    .sheet{box-shadow:none;max-width:none}
    .foot{margin-top:8px;font-size:8pt;color:#334155}
  }
</style></head><body>
<div class="bar"><button class="no-print" onclick="window.print()">\u{1F5A8}️ Print / Save as PDF</button></div>
<div class="sheet">${m.markup}</div>
<p class="foot">${DISCLAIMER.long}</p>
</body></html>`;
    const win = window.open('', '_blank');
    if (!win) {
      if (typeof toast === 'function') toast('⚠️ Please allow pop-ups to save the certificate as a PDF.', 4000);
      return;
    }
    win.document.write(html);
    win.document.close();
  }

  // ── entry points ────────────────────────────────────────────────────────
  //  ⚠ showScreen('certificates') ALREADY renders — see the dispatch at the
  //    foot of showScreen() in app.js. Calling render() here as well is what
  //    drew every subject twice. Set the host, then let the one dispatch do
  //    the work; only fall back to rendering directly if showScreen is absent.
  function open() {
    _hostId = 'cert-body';
    if (typeof showScreen === 'function') showScreen('certificates');
    else render(undefined, 'cert-body');
  }

  return {
    // data / logic (pure enough to test without a browser)
    TIERS, DISCLAIMER, ART, tierFor, toNextTier, tierByIdx, buildRecord, serialFor, svg,
    // screen
    load, render, open, view, close, info, closeInfo, otherTab, practise,
    share, savePng, savePdf, shareText, toPngBlob,
    records: () => _records,
    subject: () => _subject,
  };
})();

if (typeof window !== 'undefined') window.Certificates = Certificates;
if (typeof module !== 'undefined' && module.exports) module.exports = Certificates;
