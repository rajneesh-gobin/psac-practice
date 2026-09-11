'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice Engine - Shared Helpers & Question Factories
//  These globals are used by all subject question files.
// ══════════════════════════════════════════════

const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
// Fisher–Yates is an unbiased shuffle. `sort(() => Math.random() - 0.5)` is
// not: browser sort implementations repeatedly favour some early elements,
// which made the same question disproportionately likely to lead an exam or
// printable paper.
const shuffle = arr => {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};
const fmt = n => n.toLocaleString('en-GB');

// Accuracy % for one chapter's { attempted, correct } record.
// Used by subject badge conditions, so it lives here rather than in any pack.
// Null-safe: `pct(chapters.fractions)` is fine even if that chapter is untouched.
function pct(c) { return (c && c.attempted) ? Math.round(c.correct / c.attempted * 100) : 0; }

// ── WHICH GRADES ARE FREE ────────────────────────────────────────────────
// Grades 1-2 are free for every family, permanently. Grades 3-9 are the paid
// tiers. This is a PRICING rule, so it deliberately sits above plans, expiry
// and the credit shop: a free grade is open on a lapsed account, on the Free
// plan, and with a zero credit balance.
//
// It is NOT above moderation. An admin kill switch (disabled_chapters /
// disabled_subjects) and an account block still apply to grades 1-2, because
// those are safety decisions rather than commercial ones.
//
// ⚠ DUPLICATED in netlify/functions/questions.js - Lambda vs browser, no shared
// module, the same standing duplication as the Mauritius day-key helpers. If
// this list changes, BOTH copies must change together, or the padlocks the UI
// draws and the questions the server actually releases will disagree.
const FREE_GRADES = Object.freeze([1, 2]);

function gradeOfSubjectId(subjectId) {
  const m = /^grade(\d+)-/.exec(String(subjectId || ''));
  return m ? Number(m[1]) : null;
}
function isFreeGrade(grade) {
  const n = Number(grade);
  return Number.isFinite(n) && FREE_GRADES.includes(n);
}
function isFreeSubjectId(subjectId) { return isFreeGrade(gradeOfSubjectId(subjectId)); }

// chapterId → is it in a free grade? Resolved through the loaded packs rather
// than the id, because chapter ids carry no grade (g5m-…, eng-passages, …) and
// several are not prefixed at all.
//
// `typeof SUBJECT_PACKS` is safe even though registry.js loads AFTER this file:
// a classic script's lexical bindings are only created when that script runs,
// so before then the name is *undeclared* (typeof → 'undefined'), not in TDZ.
// Nothing here executes at load time anyway.
function isFreeChapter(chapterId) {
  if (!chapterId || typeof SUBJECT_PACKS === 'undefined') return false;
  for (const p of SUBJECT_PACKS) {
    if (!isFreeGrade(p.grade)) continue;
    const chs = p._chapters || p.chapters || [];
    for (const c of chs) if (c && c.id === chapterId) return true;
  }
  return false;
}

// ── WHICH GRADES A CHILD MAY USE ─────────────────────────────────────
// The parent grants grades one at a time (`restrictions.allowedGrades`); the
// child's OWN grade is never in that list, because it is never optional and
// because it can change - it is read from the ACCOUNT, never from the blob
// (`DB.grade` is written nowhere; see scripts/test-parent-restrictions.js).
//
// ⚠ This is a PARENTAL control, not an entitlement. The server still decides
//   which packs a family may fetch (netlify/functions/questions.js), exactly
//   as it does for lockedChapters: unlocking Grade 6 here cannot hand a child
//   questions their plan does not cover.
//
// ⚠ Legacy blobs carry the two booleans this list replaced. crossGradeSearch
//   / crossGradePractice meant "EVERY other grade", so that is what they
//   migrate to - on READ, so no child needs a write to keep working. New
//   writes keep both booleans in step (`flagsFor`) so a device still running
//   the old shell reads the same permission.
const GradeAccess = (() => {
  const _restr = r => r || ((typeof DB !== 'undefined' && DB && DB.restrictions) || {});

  function ownGrade() {
    const acct = (typeof Auth !== 'undefined' && Auth.getActiveAccount) ? Auth.getActiveAccount() : null;
    return Number(acct && acct.grade)
      || Number(typeof SELECTED_GRADE !== 'undefined' ? SELECTED_GRADE : 0)
      || 5;
  }

  // Every grade a child could be shown at all: a live pack exists and the
  // admin kill switch has not taken the grade down.
  function liveGrades(packs) {
    const list = packs || (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : []) || [];
    const off = ((typeof window !== 'undefined' && window.GLOBAL_SETTINGS) || {}).disabled_grades || [];
    return [...new Set(Object.values(list)
      .filter(p => p && !p.comingSoon && !off.includes(Number(p.grade)))
      .map(p => Number(p.grade))
      .filter(Number.isFinite))].sort((a, b) => a - b);
  }

  // The EXTRA grades the parent unlocked - never the child's own, never a
  // grade that is no longer live.
  function granted(restrictions, packs) {
    const r = _restr(restrictions);
    const live = liveGrades(packs);
    if (Array.isArray(r.allowedGrades)) {
      const want = r.allowedGrades.map(Number);
      return live.filter(g => want.includes(g));
    }
    return (r.crossGradePractice || r.crossGradeSearch) ? live.slice() : [];
  }

  // Own grade + everything the parent unlocked. Search and the practice hub
  // read THIS: a parent may unlock a lower grade deliberately, for catch-up.
  function allowed(own, restrictions, packs) {
    const g = Number(own) || ownGrade();
    return [...new Set([g, ...granted(restrictions, packs)])].sort((a, b) => a - b);
  }
  function allows(grade, own, restrictions, packs) {
    return allowed(own, restrictions, packs).includes(Number(grade));
  }

  // What the CHILD may choose for themselves. Own grade and above only: a
  // child may stretch upwards, never quietly drop to easier work.
  function childChoices(own, restrictions, packs) {
    const g = Number(own) || ownGrade();
    return allowed(g, restrictions, packs).filter(x => x >= g);
  }

  // What the Game Zone actually draws from. The child's own pick lives in the
  // progress blob (DB.games.sourceGrades) because a child can write that and
  // cannot write students.settings. Own grade is always in, so a pool can
  // never be empty, and a pick the parent has since revoked simply drops out.
  function gameGrades(own, restrictions, games, packs) {
    const g = Number(own) || ownGrade();
    const choices = childChoices(g, restrictions, packs);
    const gs = games || ((typeof DB !== 'undefined' && DB && DB.games) || {});
    const picked = Array.isArray(gs.sourceGrades) ? gs.sourceGrades.map(Number) : [];
    return [...new Set([g, ...picked.filter(x => choices.includes(x))])].sort((a, b) => a - b);
  }

  // The two booleans this list replaced, derived - never authored by hand.
  function flagsFor(list) {
    const extra = (list || []).length > 0;
    return { crossGradeSearch: extra, crossGradePractice: extra };
  }

  return { ownGrade, liveGrades, granted, allowed, allows, childChoices, gameGrades, flagsFor };
})();

// ── A child's parent controls: the master copy and the device's copy ────────
// students.settings is the master copy. DB.restrictions in the progress blob is
// the device's copy, taken at PIN login and refreshed by
// Auth._refreshChildSettings(); Admin › Members edits the master on a family's
// behalf. Pure, so it is tested under Node (scripts/test-support-settings.js).
// ⚠ A key NOT in PARENT_KEYS belongs to the device alone and must survive a
//   refresh - dropping it would reset device state no parent ever set.
const SupportSettings = (() => {
  const PARENT_KEYS = ['lockedChapters', 'maxDifficulty', 'examDisabled', 'hintsDisabled',
    'minigamesDisabled', 'allowedGrades', 'crossGradeSearch', 'crossGradePractice', 'games'];
  const LEVELS = { 1: 'Basic', 2: 'Medium', 3: 'Hard', 4: 'Word problems' };

  const _obj = x => (x && typeof x === 'object' && !Array.isArray(x)) ? x : {};
  const _canon = v => JSON.stringify(v === undefined ? null : v, (k, x) =>
    (x && typeof x === 'object' && !Array.isArray(x))
      ? Object.keys(x).sort().reduce((o, key) => { o[key] = x[key]; return o; }, {})
      : x);

  function mergeServer(local, server) {
    const out = {};
    const l = _obj(local), s = _obj(server);
    Object.keys(l).forEach(k => { if (!PARENT_KEYS.includes(k)) out[k] = l[k]; });
    Object.keys(s).forEach(k => { out[k] = s[k]; });
    if (!Array.isArray(out.lockedChapters)) out.lockedChapters = [];
    return out;
  }

  function differs(a, b) {
    return PARENT_KEYS.some(k => _canon(_obj(a)[k]) !== _canon(_obj(b)[k]));
  }

  // Plain words for every control that is NOT at its default. An empty list
  // means "nothing has been changed", which is itself the answer to half the
  // support calls.
  function describe(settings) {
    const s = _obj(settings), out = [];
    if (s.examDisabled) out.push('Exam mode is switched off');
    if (s.hintsDisabled) out.push('Hints are switched off');
    if (s.minigamesDisabled) out.push('The Game Zone is switched off');
    const lvl = Number(s.maxDifficulty);
    if (lvl >= 1 && lvl < 4) out.push(`Questions stop at Level ${lvl} (${LEVELS[lvl]})`);
    const locked = Array.isArray(s.lockedChapters) ? s.lockedChapters.length : 0;
    if (locked) out.push(`${locked} chapter${locked === 1 ? '' : 's'} locked by the parent`);
    if (Array.isArray(s.allowedGrades)) {
      if (s.allowedGrades.length) out.push(`Extra grades unlocked: ${s.allowedGrades.join(', ')}`);
    } else if (s.crossGradePractice || s.crossGradeSearch) {
      out.push('Every other grade unlocked (older setting)');
    }
    if (s.games && typeof s.games === 'object') out.push('Game Zone settings customised');
    return out;
  }

  // Why a chapter is open or closed for this child, layer by layer. Every
  // reason is collected, not just the first: "locked by the parent AND
  // switched off site-wide" needs two fixes, and naming one hides the other.
  // ctx: { chapterId, packId, packGrade, childGrade, settings, grantedGrades,
  //        global, planAllowed, entitled, expired, free, accountDisabled,
  //        blockedUntil, now }
  function explainChapter(ctx) {
    const c = ctx || {}, g = _obj(c.global), s = _obj(c.settings);
    const packGrade = Number(c.packGrade), reasons = [];
    const now = c.now ? new Date(c.now) : new Date();
    if (c.accountDisabled) reasons.push({ who: 'account', text: 'The parent account is disabled' });
    if (c.blockedUntil && new Date(c.blockedUntil) > now) {
      reasons.push({ who: 'account', text: 'The parent account is blocked for now' });
    }
    if ((g.disabled_grades || []).map(Number).includes(packGrade)) {
      reasons.push({ who: 'admin', text: `Grade ${packGrade} is switched off site-wide` });
    }
    if ((g.disabled_subjects || []).includes(c.packId)) {
      reasons.push({ who: 'admin', text: 'This subject is switched off site-wide' });
    }
    if ((g.disabled_chapters || []).includes(c.chapterId)) {
      reasons.push({ who: 'admin', text: 'This chapter is switched off site-wide' });
    }
    if (packGrade !== Number(c.childGrade)
        && !(c.grantedGrades || []).map(Number).includes(packGrade)) {
      reasons.push({ who: 'parent', text: `Grade ${packGrade} is not unlocked for this child` });
    }
    if ((s.lockedChapters || []).includes(c.chapterId)) {
      reasons.push({ who: 'parent', text: 'Locked by the parent' });
    }
    if (!c.free) {
      if (c.expired) {
        if (!c.entitled) reasons.push({ who: 'expiry', text: 'Account expired - only chapters bought with credits stay open' });
      } else if (g.plan_enforcement_enabled === true && Array.isArray(c.planAllowed)
                 && !c.planAllowed.includes(c.chapterId) && !c.entitled) {
        reasons.push({ who: 'plan', text: 'Not included in the family’s plan' });
      }
    }
    return { open: reasons.length === 0, reasons };
  }

  return { PARENT_KEYS, LEVELS, mergeServer, differs, describe, explainChapter };
})();

function makeMCQ({ id, chapterId, difficulty, subsection, question, options, answer, hint, explanation, learnMore }) {
  const shuffled = shuffle([...new Set(options.filter(o => o !== answer))]);
  const finalOpts = shuffle([answer, ...shuffled.slice(0, 3)]);
  return { id, chapterId, difficulty, subsection, type: 'mcq', question, options: finalOpts, answer, acceptableAnswers: [answer], hint, explanation, learnMore };
}
function makeNum({ id, chapterId, difficulty, subsection, question, answer, acceptableAnswers, hint, explanation, learnMore }) {
  return { id, chapterId, difficulty, subsection, type: 'numeric', question, answer: String(answer), acceptableAnswers: (acceptableAnswers || [String(answer)]).map(String), hint, explanation, learnMore };
}
// French packs need French answer labels; the g4fr-/g5fr-/g6fr-/fr- id prefix is
// the only language marker a question factory can see.
const _tfLabels = (id, chapterId) =>
  (/^(g\d)?fr[-_]/i.test(id || '') || /^(g\d)?fr[-_]/i.test(chapterId || ''))
    ? ['Vrai', 'Faux'] : ['True', 'False'];
function makeTF({ id, chapterId, difficulty, subsection, question, answer, hint, explanation }) {
  return makeMCQ({ id, chapterId, difficulty, subsection, question,
    options: _tfLabels(id, chapterId), answer: _tfLabels(id, chapterId)[answer ? 0 : 1], hint, explanation });
}
function makeMatch({ id, chapterId, difficulty, subsection, leftItem, otherItems, correctRight, allRights, hint, explanation }) {
  // Converts one matching pair into an MCQ: "What does X match to?"
  const wrongOpts = shuffle(allRights.filter(r => r !== correctRight)).slice(0, 3);
  return makeMCQ({ id, chapterId, difficulty, subsection,
    question: `What does <b>${leftItem}</b> match to?`,
    options: [correctRight, ...wrongOpts], answer: correctRight, hint, explanation });
}
// `subsection` is destructured and returned like every other factory here. It
// was the only one that dropped it, so a symmetry question could carry
// subsection:'symmetry' in its source and still arrive with it undefined - the
// six SYM questions were invisible to the Syllabus screen's per-topic counts.
function makeSymmetry({ id, chapterId, difficulty, subsection, question, rows, cols, axis, axisPos, given, answer, hint, explanation }) {
  const ans = answer || given.map(([r, c]) => {
    if (axis === 'vertical')   return [r, (cols - 1) - c];
    if (axis === 'horizontal') return [(rows - 1) - r, c];
    return null;
  }).filter(Boolean);
  return { id, chapterId, difficulty, subsection, type: 'symmetry', question, rows, cols, axis, axisPos, given, answer: ans, hint: hint || 'Click the empty cells to mirror the pattern across the coloured line.', explanation: explanation || 'Each cell mirrors its pair across the axis of symmetry.' };
}

// PSAC French Q6: a whole text with ONE shared word bank, each word used once
// and a deliberate spare. It is not an MCQ - the child PLACES words into the
// text - so it carries no `options` and must never reach the MCQ renderer.
// ⚠ getStaticQs() excludes type 'cloze' for exactly that reason: dealt into
// practice or an exam paper, nothing downstream knows how to draw it.
// `question` and `answer` stay STRINGS because generic readers (mistake rows,
// admin, search, the digest) call String() on them; the machine-readable
// arrays live in `bank`, `gapAnswers` and `notes`.
function makeCloze({ id, chapterId, difficulty, subsection, title, intro, text, bank, answers, notes,
                     textB, introB, answersB, notesB, hint, explanation }) {
  const countGaps = s => (String(s || '').match(/\{\d+\}/g) || []).length;
  const gapsA = countGaps(text);
  const gapsB = countGaps(textB);
  const words = Array.isArray(bank) ? bank.slice() : [];
  // Part A is PLACED from the shared bank; part B is TYPED. So each part-B gap
  // carries a LIST of accepted answers - « je veux rentrer / retourner / revenir
  // chez moi » are all right, and failing a child for the better word is the one
  // mistake this exercise cannot afford. The first entry is the model answer.
  const alts = a => (Array.isArray(a) ? a.slice() : [a]).map(String);
  const gapAlts = (Array.isArray(answers) ? answers : []).map(alts)
    .concat((Array.isArray(answersB) ? answersB : []).map(alts));
  const gapAnswers = gapAlts.map(a => a[0]);
  const gaps = gapsA + gapsB;
  const spare = Math.max(0, words.length - gapsA);
  return {
    id, chapterId, difficulty, subsection, type: 'cloze',
    title, intro, text, bank: words, gaps, gapAnswers, gapAlts,
    // gapsA is where the bank stops and the typing starts. A one-part text -
    // grades 4 and 5, and the real Grade 5 paper - simply has gapsB === 0.
    gapsA, gapsB, textB: textB || '', introB: introB || '', twoPart: gapsB > 0,
    notes: (Array.isArray(notes) ? notes.slice() : []).concat(Array.isArray(notesB) ? notesB.slice() : []),
    question: `${title} - texte à trous : ${gaps} mots à trouver.`,
    answer: gapAnswers.join(' · '),
    acceptableAnswers: [gapAnswers.join(' · ')],
    hint: hint || 'Lis tout le texte une fois avant de commencer. Remplis en premier les trous dont tu es sûr : chaque mot trouvé réduit le choix pour les autres.',
    explanation: explanation || (gapsB
      ? `Partie A : ${words.length} mots proposés pour ${gapsA} trous, ${spare} en trop. Partie B : ${gapsB} mots à écrire toi-même.`
      : `Il y a ${words.length} mots pour ${gapsA} trous : ${spare} mot${spare === 1 ? '' : 's'} en trop.`),
  };
}

// ── Chasse aux Erreurs - the error-hunt text ─────────────────────────────
// A whole text the child reads, clicking every word they believe is wrong.
// ⚠ A NEW QUESTION TYPE, 'errorhunt', so this factory exists in FOUR
// hand-written copies (engine/helpers.js + the three server files) and is in
// every one of their exported context lists. makeCloze was defined in all
// three server copies and left OUT of that list, and every text vanished from
// the built bundle while the source read correctly.
// ⚠ isPoolQuestion() excludes 'errorhunt'. Dealt into practice or an exam it
// would fall through to the numeric branch and draw a number pad under a
// French passage - the same defect the cloze exclusion exists for.
//
// AUTHORING. The errors are written inline, so a text stays one readable
// string and an error can never drift away from the word it belongs to:
//
//     '{le>Le:maj} chat de {marie>Marie:maj} mange ses {croquette>croquettes:pl}.'
//
//     {wrong>right:kind}   wrong - what the child sees, and can click
//                          right - the correction, revealed only by Terminer
//                          kind  - a key in RULES, which supplies the reason
//
// Everything outside the braces is correct French. Tokens split on whitespace,
// so punctuation travels with its word.
// ⚠ PUNCTUATION MAY SIT OUTSIDE THE BRACES, and is then carried onto BOTH
//   forms. The two cases read differently and both are needed:
//     '{cahier>cahiers:pl}.'   the word is wrong, the full stop is CORRECT
//                              → child sees 'cahier.', answer 'cahiers.'
//     '{cour>cour.:pt}'        the full stop is MISSING
//                              → child sees 'cour', answer 'cour.'
// ⚠ Anything else containing a brace THROWS. A half-written token would
//   otherwise sail through as an ordinary word and print '{cour>cour.:pt}' on
//   a child's screen. The corpus is loaded whole at build time, so it throws
//   where somebody can read it - never in front of a child.
function makeErrorHunt({ id, chapterId, difficulty, subsection, title, intro, text, hint, explanation }) {
  const RULES = {
    maj: 'Majuscule : une phrase commence par une majuscule, et un nom propre en prend toujours une.',
    min: 'Pas de majuscule : ce mot n\'ouvre pas la phrase et n\'est pas un nom propre.',
    pt:  'Ponctuation : il manque le point qui termine la phrase.',
    vrg: 'Ponctuation : il manque la virgule.',
    acc: 'Accent : ce mot ne s\'écrit pas sans son accent.',
    pl:  'Accord : ce mot doit prendre la marque du pluriel.',
    sg:  'Accord : ce mot doit rester au singulier.',
    vb:  'Accord du verbe : le verbe s\'accorde avec son sujet.',
    pp:  'Participe passé : avec l\'auxiliaire être, il s\'accorde avec le sujet.',
    hom: 'Homophone : ces deux mots se prononcent pareil mais ne s\'écrivent pas pareil.',
    ort: 'Orthographe : ce mot n\'est pas écrit correctement.',
    det: 'Déterminant : il doit s\'accorder avec le nom qui suit.',
    tps: 'Temps du verbe : ce n\'est pas le temps qui convient ici.',
  };
  const words = [], errAt = [], errFix = [], errKind = [], errWhy = [], fixed = [];
  const chunks = String(text || '').split(/\s+/).filter(Boolean);
  for (const c of chunks) {
    const m = /^([^\s{}]*)\{([^>{}]+)>([^:{}]*):([a-z]+)\}([^\s{}]*)$/.exec(c);
    if (!m) {
      if (/[{}]/.test(c)) throw new Error('makeErrorHunt ' + id + ': malformed error token ' + c);
      words.push(c); fixed.push(c); continue;
    }
    // An "error" whose correction equals the word is not an error: clicking it
    // would be right and not clicking it would be right too.
    if (m[2] === m[3]) throw new Error('makeErrorHunt ' + id + ': error token corrects to itself: ' + c);
    errAt.push(words.length);
    words.push(m[1] + m[2] + m[5]);
    fixed.push(m[1] + m[3] + m[5]);
    errFix.push(m[1] + m[3] + m[5]);
    errKind.push(m[4]);
    // Resolved HERE, not in the renderer: the reason ships with the question,
    // so a bundle cached today cannot disagree with a later edit to the table.
    errWhy.push(RULES[m[4]] || 'Relis cette phrase à voix basse.');
  }
  const errors = errAt.length;
  return {
    id, chapterId, difficulty, subsection, type: 'errorhunt',
    title, intro,
    words, errAt, errFix, errKind, errWhy, errors,
    // The whole text put right. The review screen prints it at the end, and it
    // is what makes the content testable: a harness can read it as plain French
    // and check that it really does read as plain French.
    correct: fixed.join(' '),
    // ⚠ Three checks, and the screen says so. Vérifier reports a COUNT and
    // never which words - but with an unlimited budget a child clicks one word,
    // reads the count, and has been handed the answer. Three keeps it a
    // self-assessment instead of an oracle.
    maxChecks: 3,
    question: title + ' - chasse aux erreurs : ' + errors + ' erreurs à trouver.',
    answer: errFix.join(' · '),
    acceptableAnswers: [errFix.join(' · ')],
    hint: hint || 'Lis le texte à voix basse. Une erreur s\'entend souvent avant de se voir : majuscules, accents, accords du pluriel, verbes.',
    explanation: explanation || ('Ce texte cache ' + errors + ' erreurs de MOTS : majuscules, accents, accords et homophones. La ponctuation, elle, est déjà correcte.'),
  };
}


// ── Typed French answers: ONE comparison, four copies ────────────────────
// ⚠ This rule already existed, privately, inside engine/cloze.js for the typed
// gaps of part B. Two copies of "is this answer right" in one codebase is the
// drift the factory list above warns about, so it lives here and cloze.js now
// calls it. Change it here and in the three server copies together.
//
// A typed answer is compared on meaning, not keystrokes: case, spaces, both
// apostrophes and a trailing full stop are all noise.
function foldAnswer(s) {
  return String(s == null ? '' : s)
    .replace(/[‘’ʼ´`]/g, "'")
    .replace(/\s+/g, ' ').trim().toLowerCase()
    .replace(/[.,;:!?…]+$/, '');
}
// The same, with every accent removed: é→e, à→a, ç→c.
function bareAnswer(s) {
  return foldAnswer(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
// ⚠ Accents are the ONE thing marked leniently. A phone keyboard that will not
// produce « é » is a device problem, not a French mistake - the answer counts
// as right and the child is shown the accented spelling with a nudge.
// ⚠ EXCEPT where the accent IS the question. « a » vs « à », « ou » vs « où »,
// « la » vs « là » are PSAC homophone items, and folding accents there marks
// every attempt correct whatever the child types. strictAccents turns the
// leniency off; makeText refuses to build an item that needs it and lacks it.
function matchTypedAnswer(accepted, typed, opts) {
  const list = (Array.isArray(accepted) ? accepted : [accepted]).map(String);
  const mine = foldAnswer(typed);
  if (!mine) return { ok: false, slip: false };
  if (list.some(a => foldAnswer(a) === mine)) return { ok: true, slip: false };
  if (opts && opts.strictAccents) return { ok: false, slip: false };
  if (list.some(a => bareAnswer(a) === bareAnswer(typed))) return { ok: true, slip: true };
  return { ok: false, slip: false };
}

// PSAC French Q7A: « Corrige les erreurs soulignées ». The child TYPES the
// corrected word, so this is neither an MCQ nor a numeric item - and it must
// never reach the numeric renderer, which sets inputmode="decimal" and draws a
// digit pad under a French sentence.
// ⚠ `confusables` is not decoration. If removing the accents from `answer`
// makes it equal to one of them, accent leniency would accept both - so
// « corrige a en à » would pass on "a". The factory THROWS rather than ship a
// question that marks itself right; strictAccents says the accent is the point.
function makeText({ id, chapterId, difficulty, subsection, question, answer, alsoAccept,
                    confusables, strictAccents, hint, explanation, learnMore }) {
  const accepted = [String(answer)].concat((alsoAccept || []).map(String));
  const others   = (confusables || []).map(String);
  if (!strictAccents) {
    const clash = others.find(c => bareAnswer(c) === bareAnswer(answer)
                                && foldAnswer(c) !== foldAnswer(answer));
    if (clash) throw new Error('makeText ' + id + ': "' + answer + '" and "' + clash
      + '" differ only by an accent, so accent-lenient marking would accept both.'
      + ' Set strictAccents: true.');
  }
  return {
    id, chapterId, difficulty, subsection, type: 'text', question,
    answer: String(answer), acceptableAnswers: accepted,
    confusables: others, strictAccents: !!strictAccents,
    hint, explanation, learnMore,
  };
}

// ── Learning materials: one sort order, two teacher surfaces ──────────────
// The Materials tab (teacher.js) and a classroom's Materials section
// (teacher_classroom_detail.js) are separate modules listing the same rows, so
// the comparator lives here and the two orders cannot drift apart.
// ⚠ guest.js carries its OWN copy on purpose: that page loads no engine file at
// all (a phone, mobile data, a WhatsApp link). Change both together.
const MATERIAL_SORT_LABELS = {
  recent: '🕑 Newest', oldest: '📜 Oldest', subject: '📚 Subject',
  grade: '🎓 Grade', title: '🔤 Title',
};
const MATERIAL_SORT_STORE = 'psac_material_sort_v1';

// `shared_at` is when this file was given to THIS class; `created_at` is when
// the teacher uploaded it. A classroom list has both, the teacher's own library
// only the second - so "date" always means the most specific one available.
function _materialWhen(f) { return Date.parse(f?.shared_at || f?.created_at || '') || 0; }
// ⚠ Untagged rows sort LAST, never first. A file with no subject is the least
// useful thing to head a list someone is scanning for one particular subject.
function _materialSubject(f) { return String(f?.subject || '￿').toLowerCase(); }
function _materialGrade(f) { return Number.isFinite(f?.grade) ? f.grade : 99; }
function _materialTitleCmp(a, b) {
  return String(a?.title || '').localeCompare(String(b?.title || ''), undefined, { sensitivity: 'base' });
}

function sortMaterials(list, key) {
  const rows = Array.isArray(list) ? list.slice() : [];
  switch (key) {
    case 'oldest':  return rows.sort((a, b) => _materialWhen(a) - _materialWhen(b) || _materialTitleCmp(a, b));
    case 'subject': return rows.sort((a, b) => _materialSubject(a).localeCompare(_materialSubject(b)) || _materialTitleCmp(a, b));
    case 'grade':   return rows.sort((a, b) => _materialGrade(a) - _materialGrade(b) || _materialTitleCmp(a, b));
    case 'title':   return rows.sort(_materialTitleCmp);
    default:        return rows.sort((a, b) => _materialWhen(b) - _materialWhen(a) || _materialTitleCmp(a, b));
  }
}

function materialSortBar(current, handler, keys) {
  const ks = (Array.isArray(keys) && keys.length) ? keys : Object.keys(MATERIAL_SORT_LABELS);
  return `<div class="mat-sort" role="group" aria-label="Sort materials">
    <span class="mat-sort-label">Sort</span>
    ${ks.map(k => `<button type="button" class="mat-sort-btn${k === current ? ' is-on' : ''}"
      aria-pressed="${k === current ? 'true' : 'false'}" onclick="${handler}('${k}')">${MATERIAL_SORT_LABELS[k]}</button>`).join('')}
  </div>`;
}

function readMaterialSort() {
  try {
    const v = localStorage.getItem(MATERIAL_SORT_STORE);
    if (v && MATERIAL_SORT_LABELS[v]) return v;
  } catch (_) { }
  return 'recent';
}
function writeMaterialSort(key) {
  try { if (MATERIAL_SORT_LABELS[key]) localStorage.setItem(MATERIAL_SORT_STORE, key); } catch (_) { }
}

// "2 Sept", and the year too once it is no longer this one.
function fmtMaterialDate(iso) {
  const t = Date.parse(iso || '');
  if (!t) return '';
  const d = new Date(t);
  const opts = { day: 'numeric', month: 'short' };
  if (d.getFullYear() !== new Date().getFullYear()) opts.year = 'numeric';
  return d.toLocaleDateString('en-GB', opts);
}

// How long a signed material link lives. ⚠ The share message must SAY it: a
// link that stops working an hour later, with nothing to explain why, reads to
// the parent or pupil who received it as a broken app.
function fmtMaterialExpiry(seconds) {
  const s = Number(seconds) || 3600;
  const units = [[31536000, 'year'], [2592000, 'month'], [604800, 'week'], [86400, 'day'], [3600, 'hour']];
  for (const [size, label] of units) {
    if (s >= size) { const n = Math.round(s / size); return n + ' ' + label + (n === 1 ? '' : 's'); }
  }
  return Math.max(1, Math.round(s / 60)) + ' minutes';
}

// ── File or link ──────────────────────────────────────────────────────────
// A material is either an uploaded file in Storage or a URL the teacher pasted
// (a YouTube lesson, a PDF that already lives on the MIE site). `source_type`
// is the discriminator; everything below branches on this ONE function so a
// third kind later has one place to be added.
function materialKind(f) { return (f && f.source_type === 'link') ? 'link' : 'file'; }
// ⚠ A function DECLARATION, not `const isLinkMaterial = …`. These helpers are
// loaded into a VM context by the test harnesses, and a const binding is not a
// property of that context - only declarations and var are. Every other helper
// here is a declaration for the same reason.
function isLinkMaterial(f) { return materialKind(f) === 'link'; }

// ⚠ Only http and https, ever. A material URL is written into an href on the
// pupil page, so `javascript:` and `data:` are refused here, in the database
// CHECK, and again at render. The browser-side check is the one an attacker
// controls, which is why it is not the only one.
// Returns the cleaned URL, or null if it must not be stored.
function normaliseMaterialUrl(raw) {
  const s = String(raw == null ? '' : raw).trim();
  if (!s) return null;
  let u;
  try { u = new URL(/^[a-z][a-z0-9+.-]*:/i.test(s) ? s : 'https://' + s); }
  catch (_) { return null; }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
  if (!u.hostname || u.hostname.indexOf('.') === -1) return null;
  return u.href;
}

// YouTube hands out four shapes for the same video (watch?v=, youtu.be/,
// /shorts/, /embed/). They are stored as given - rewriting a teacher's URL is
// how a working link becomes a broken one - but the id is recognised so the
// row can be labelled and, later, previewed.
function youTubeId(url) {
  const s = String(url || '');
  const m = s.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}
function materialIcon(f) {
  if (!isLinkMaterial(f)) {
    const n = String(f?.file_name || '').toLowerCase();
    if (/\.(png|jpe?g|gif|webp|heic)$/.test(n)) return '🖼️';
    if (/\.pdf$/.test(n)) return '📄';
    return '📁';
  }
  if (youTubeId(f.external_url)) return '▶️';
  if (/\.pdf(\?|#|$)/i.test(String(f.external_url || ''))) return '📄';
  return '🔗';
}
// What a row is called in one word, for the card and the calendar chip.
function materialTypeLabel(f) {
  if (!isLinkMaterial(f)) return /\.(png|jpe?g|gif|webp|heic)$/i.test(String(f?.file_name || '')) ? 'Image' : 'File';
  return youTubeId(f.external_url) ? 'Video' : 'Link';
}
// Where the host domain is shown, so a pupil can see where a link goes before
// tapping it. Never the full URL - these get long and push the card wide.
function materialHost(f) {
  if (!isLinkMaterial(f)) return '';
  try { return new URL(f.external_url).hostname.replace(/^www\./, ''); } catch (_) { return ''; }
}

// ── Views ─────────────────────────────────────────────────────────────────
// ⚠ Sort and VIEW are separate settings and separate keys. Sorting is
// meaningless in the calendar (the grid is ordered by date by definition), so
// collapsing them into one control would make the sort bar lie in one of the
// views. The sort bar is simply not drawn there.
const MATERIAL_VIEW_LABELS = { list: '📋 List', calendar: '🗓️ Calendar', subject: '📚 By subject' };
const MATERIAL_VIEW_STORE = 'psac_material_view_v1';
function readMaterialView() {
  try {
    const v = localStorage.getItem(MATERIAL_VIEW_STORE);
    if (v && MATERIAL_VIEW_LABELS[v]) return v;
  } catch (_) { }
  return 'list';
}
function writeMaterialView(key) {
  try { if (MATERIAL_VIEW_LABELS[key]) localStorage.setItem(MATERIAL_VIEW_STORE, key); } catch (_) { }
}
function materialViewBar(current, handler, keys) {
  const ks = (Array.isArray(keys) && keys.length) ? keys : Object.keys(MATERIAL_VIEW_LABELS);
  return `<div class="mat-view" role="group" aria-label="Change how materials are shown">
    <span class="mat-sort-label">View</span>
    ${ks.map(k => `<button type="button" class="mat-view-btn${k === current ? ' is-on' : ''}"
      aria-pressed="${k === current ? 'true' : 'false'}" onclick="${handler}('${k}')">${MATERIAL_VIEW_LABELS[k]}</button>`).join('')}
  </div>`;
}

// ── Search ────────────────────────────────────────────────────────────────
// Title first, but description, subject and the link's host are searched too:
// a teacher looking for "the fractions video" may not have typed "fractions"
// into the title. Accent- and case-insensitive, because "Révision" is typed
// both ways on a phone.
function _matFold(s) {
  return String(s == null ? '' : s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}
function materialMatches(f, query) {
  const q = _matFold(query);
  if (!q) return true;
  const hay = _matFold([f?.title, f?.description, f?.subject,
    f?.grade ? 'grade ' + f.grade : '', f?.file_name, materialHost(f), materialTypeLabel(f)]
    .filter(Boolean).join(' '));
  // Every word must appear somewhere, in any order: "fractions video" finds a
  // video about fractions whichever way round the teacher types it.
  return q.split(/\s+/).every(word => hay.indexOf(word) !== -1);
}
function filterMaterials(list, query) {
  const rows = Array.isArray(list) ? list : [];
  return _matFold(query) ? rows.filter(f => materialMatches(f, query)) : rows.slice();
}

// ── Grouping ──────────────────────────────────────────────────────────────
// ⚠ LOCAL date, not a Mauritius day key. These squares are calendar days as the
// teacher's own device shows them, which is the same deliberate exception the
// parent calendar and the timetable grid make. `_muDayKey` is for a child's
// practice history, where the device clock must not be able to rewrite it.
function materialDayKey(f) {
  const t = Date.parse(f?.shared_at || f?.created_at || '');
  if (!t) return '';
  const d = new Date(t);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function groupMaterialsByDay(list) {
  const out = new Map();
  for (const f of (Array.isArray(list) ? list : [])) {
    const k = materialDayKey(f);
    if (!k) continue;
    if (!out.has(k)) out.set(k, []);
    out.get(k).push(f);
  }
  return out;
}
// Untagged rows collect under one heading at the END, matching the sort rule
// that puts a subject-less file last rather than first.
function groupMaterialsBySubject(list) {
  const out = new Map();
  for (const f of (Array.isArray(list) ? list : [])) {
    const k = (f && f.subject) ? String(f.subject) : '';
    if (!out.has(k)) out.set(k, []);
    out.get(k).push(f);
  }
  return [...out.entries()].sort((a, b) =>
    (a[0] ? 0 : 1) - (b[0] ? 0 : 1) || a[0].localeCompare(b[0], undefined, { sensitivity: 'base' }));
}

// The WhatsApp message for one material. Everything in it is already visible to
// whoever holds the link - title, subject, the signed URL - and nothing else.
// ⚠ A LINK never claims an expiry. That sentence exists because a SIGNED
// storage URL dies silently and reads as a broken app; a YouTube link does not
// expire, and telling a parent it lasts an hour would be simply false.
function materialShareMessage(f, url) {
  const meta = [f?.subject, f?.grade ? 'Grade ' + f.grade : ''].filter(Boolean).join(' · ');
  return [
    (isLinkMaterial(f) ? materialIcon(f) + ' ' : '📁 ') + (f?.title || 'Class material'),
    meta,
    f?.description || '',
    url,
    isLinkMaterial(f) ? '' : 'This link works for ' + fmtMaterialExpiry(f?.link_expiry_seconds) + '.',
  ].filter(Boolean).join('\n');
}

// ⚠ HERE, NOT IN app.js. index.html loads helpers.js third and nce_paper.js
//   sixth - both long before app.js. This builder is used by FOUR printed
//   documents across two files (the PSAC practice paper and its answer key in
//   app.js, the NCE paper and its mark scheme in nce_paper.js), and a shared
//   builder that only exists after app.js has run is one the earlier file can
//   reach only by luck of call timing.
// ── Printed-paper watermark ────────────────────────────────────────────────
// ⚠ ONE BUILDER FOR BOTH PRINTED DOCUMENTS. The pupil paper and the answer
//   key are separate <html> strings with their own <style> blocks - style.css
//   is not loaded in a print window - and a second hand-written copy of these
//   rules is exactly the shape this codebase keeps growing drift in.
//
// ⚠ A TILED BACKGROUND ON body::before, NOT a position:fixed overlay. A fixed
//   element is painted on the FIRST SHEET ONLY by several print engines; a
//   repeating background on a box that spans the whole document tiles down
//   every page by construction, however many pages the paper runs to.
//
// ⚠ z-index:-1 is what puts it BEHIND the text. A negative-z-index descendant
//   paints above its parent's background and below the parent's in-flow
//   content, so no rule is needed on every child - and adding one to every
//   child is how a watermark ends up on top of the questions.
//
// ⚠ print-color-adjust:exact, or Chrome drops it entirely: "Background
//   graphics" is OFF by default in the print dialog, and a watermark nobody
//   prints is not a watermark. Scoped to this one element on purpose - put it
//   on .paper and it inherits, and the navy section headers start printing
//   solid too, which is a different decision about the pupil's ink.
//
// ⚠ The opacity is the whole design. Measured against the paper's own body
//   text (#111 on white, 18.9:1): at 0.05 the tint costs about 0.2 of a
//   contrast point and the sheet still clears 4.5:1 everywhere by a mile.
//   Raise it and the watermark starts competing with the questions - which on
//   an exam paper a child is reading under time is not a cosmetic problem.
function _paperWatermarkCSS(text, opts) {
  const o = Object.assign({ w: 380, h: 250, size: 27, opacity: 0.05, color: '#1e3a5f', angle: -30 }, opts || {});
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + o.w + '" height="' + o.h + '" '
    + 'viewBox="0 0 ' + o.w + ' ' + o.h + '">'
    + '<text x="' + (o.w / 2) + '" y="' + (o.h / 2) + '" '
    + 'transform="rotate(' + o.angle + ' ' + (o.w / 2) + ' ' + (o.h / 2) + ')" '
    + 'text-anchor="middle" dominant-baseline="middle" '
    + 'font-family="Arial, Helvetica, sans-serif" font-size="' + o.size + '" '
    + 'font-weight="bold" letter-spacing="2" '
    + 'fill="' + o.color + '" fill-opacity="' + o.opacity + '">' + esc(text) + '</text>'
    + '</svg>';
  // encodeURIComponent, not a raw data URI: the markup carries #, < and " and
  // any one of them ends the url() early and silently leaves no background.
  return 'body { position: relative; }\n'
    + 'body::before {\n'
    + '  content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;\n'
    + '  background-image: url("data:image/svg+xml,' + encodeURIComponent(svg) + '");\n'
    + '  background-repeat: repeat;\n'
    + '  -webkit-print-color-adjust: exact; print-color-adjust: exact;\n'
    + '}';
}

// ⚠ Node requires this file too: scripts/nce-generate-paper.js pulls the
//   paper builders in from the command line, and a paper generated there has
//   to be the SAME document the app prints. The browser ignores this line -
//   `module` is undefined there and every function above is already a global.
if (typeof module !== 'undefined' && module.exports) module.exports = { _paperWatermarkCSS, SupportSettings };
