'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Shared server-side question loading + grading.
//
//  Extracted from netlify/functions/questions.js so assignment-submit.js can
//  re-grade using EXACTLY the same question objects and the same answer-matching
//  rules as the browser. Two copies of grading logic would drift, and a drift
//  here means a child sees one score and their teacher sees another.
//
//  Lives outside netlify/functions/ so Netlify does not treat it as a function.
//  esbuild follows the require() and bundles it.
// ══════════════════════════════════════════════════════════════════════════

const vm   = require('vm');
const fs   = require('fs');
const path = require('path');

// ── makeTask: the ONE copy, required rather than re-typed ─────────────────
// Every other factory in this file is a hand-written duplicate of
// engine/helpers.js, and CLAUDE.md lists the four copies precisely because
// they drift: makeCloze was defined in all three server copies and left OUT
// of their exported context lists, so every French cloze text was silently
// missing from the built bundle while the source read correctly.
//
// makeTask does not repeat that mistake. engine/assessment.js is plain
// CommonJS-and-global, so Node can require it and the browser can script-tag
// it, and there is exactly one implementation of the NCE task schema,
// its validator and its marking rules.
const { makeTask: _makeTask, expandTasks: _expandTasks } = require("../../engine/assessment.js");
const SymmetryLine = require("../../engine/symmetry_line.js");


// ── Locate the repo root ──────────────────────────────────────────────────
// Do NOT hard-code a '../..' hop: the bundled function's __dirname depth is not
// guaranteed to match the source tree. Walk up from several starting points
// looking for the subjects/ directory instead.
let _rootCache = null;
function findRoot() {
  if (_rootCache) return _rootCache;
  const starts = [__dirname, process.cwd(), path.resolve(__dirname, '..', '..')];
  for (const start of starts) {
    let dir = start;
    for (let i = 0; i < 8; i++) {
      if (fs.existsSync(path.join(dir, 'subjects'))) { _rootCache = dir; return dir; }
      const up = path.dirname(dir);
      if (up === dir) break;
      dir = up;
    }
  }
  _rootCache = path.resolve(__dirname, '..', '..');   // last resort
  return _rootCache;
}

// ── Sandbox context: mirrors engine/helpers.js ────────────────────────────
// ⚠ Module scope, NOT inside the context builder: checkAnswer() below grades
// at module level, and with these tucked inside the builder every `text`
// question threw ReferenceError at grade time. makeText stays in the builder
// because it is part of the exported context.
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
// produce « é » is a device problem, not a French mistake — the answer counts
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

function buildContext(buf, papers = []) {
  // Fisher-Yates. NOT `sort(() => Math.random() - 0.5)`: that is biased, and it
  // put the correct MCQ answer in position A 36% of the time and B/C only 16%
  // each (measured 2026-09-08 over 200k shuffles, and visible in the built
  // bundles). Guessing "A" every time scored ~40%. Must match engine/helpers.js.
  const shuffle = arr => {
    const out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };
  const rnd     = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const fmt     = n => n.toLocaleString('en-GB');

  function makeMCQ({ id, chapterId, difficulty, subsection, question, options, answer, hint, explanation, learnMore }) {
    const others    = shuffle([...new Set((options || []).filter(o => o !== answer))]);
    const finalOpts = shuffle([answer, ...others.slice(0, 3)]);
    return { id, chapterId, difficulty, subsection, type: 'mcq', question, options: finalOpts,
             answer, acceptableAnswers: [answer], hint, explanation, learnMore };
  }
  function makeNum({ id, chapterId, difficulty, subsection, question, answer, acceptableAnswers, hint, explanation, learnMore }) {
    return { id, chapterId, difficulty, subsection, type: 'numeric', question,
             answer: String(answer),
             acceptableAnswers: (acceptableAnswers || [String(answer)]).map(String), hint, explanation, learnMore };
  }
  // French packs need French answer labels; the g4fr-/g5fr-/g6fr-/fr- id prefix is
  // the only language marker a question factory can see.
  const _tfLabels = (id, chapterId) =>
    (/^(g\d)?fr[-_]/i.test(id || '') || /^(g\d)?fr[-_]/i.test(chapterId || ''))
      ? ['Vrai', 'Faux'] : ['True', 'False'];

  // PSAC French Q6: a whole text with ONE shared word bank, each word used once
  // and a deliberate spare. It is not an MCQ — the child PLACES words into the
  // text — so it carries no `options` and must never reach the MCQ renderer.
  // ⚠ getStaticQs() excludes type 'cloze' for exactly that reason: dealt into
  // practice or an exam paper, nothing downstream knows how to draw it.
  // `question` and `answer` stay STRINGS because generic readers (mistake rows,
  // admin, search, the digest) call String() on them; the machine-readable
  // arrays live in `bank`, `gapAnswers` and `notes`.


  // PSAC French Q7A: « Corrige les erreurs soulignées ». The child TYPES the
  // corrected word, so this is neither an MCQ nor a numeric item — and it must
  // never reach the numeric renderer, which sets inputmode="decimal" and draws a
  // digit pad under a French sentence.
  // ⚠ `confusables` is not decoration. If removing the accents from `answer`
  // makes it equal to one of them, accent leniency would accept both — so
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

  function makeCloze({ id, chapterId, difficulty, subsection, title, intro, text, bank, answers, notes,
                       textB, introB, answersB, notesB, hint, explanation }) {
    const countGaps = s => (String(s || '').match(/\{\d+\}/g) || []).length;
    const gapsA = countGaps(text);
    const gapsB = countGaps(textB);
    const words = Array.isArray(bank) ? bank.slice() : [];
    // Part A is PLACED from the shared bank; part B is TYPED. So each part-B gap
    // carries a LIST of accepted answers — « je veux rentrer / retourner / revenir
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
      // gapsA is where the bank stops and the typing starts. A one-part text —
      // grades 4 and 5, and the real Grade 5 paper — simply has gapsB === 0.
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

  function makeTF({ id, chapterId, difficulty, subsection, question, answer, hint, explanation }) {
    return makeMCQ({ id, chapterId, difficulty, subsection, question,
      options: _tfLabels(id, chapterId), answer: _tfLabels(id, chapterId)[answer ? 0 : 1], hint, explanation });
  }
  function makeMatch({ id, chapterId, difficulty, subsection, leftItem, correctRight, allRights, hint, explanation }) {
    const wrongOpts = shuffle((allRights || []).filter(r => r !== correctRight)).slice(0, 3);
    return makeMCQ({ id, chapterId, difficulty, subsection,
      question: `What does <b>${leftItem}</b> match to?`,
      options: [correctRight, ...wrongOpts], answer: correctRight, hint, explanation });
  }
  function makeSymmetry({ id, chapterId, difficulty, subsection, question, rows, cols, axis, axisPos, given, answer, hint, explanation }) {
    const ans = answer || (given || []).map(([r, c]) => {
      if (axis === 'vertical')   return [r, (cols - 1) - c];
      if (axis === 'horizontal') return [(rows - 1) - r, c];
      return null;
    }).filter(Boolean);
    return { id, chapterId, difficulty, subsection, type: 'symmetry', question, rows, cols, axis, axisPos, given,
             answer: ans, hint: hint || '', explanation: explanation || '' };
  }

  // The REAL array with a flattening push — see the note in build-questions.js.
  // Grading has to see the same pool the browser does, and a { push }-only stub
  // silently dropped questions_audit.js (18 questions + difficulty fixes).
  const STATIC_QUESTIONS = buf;
  buf.push = function (...qs) {
    qs.flat().forEach(q => q && Array.prototype.push.call(this, q));
    return this.length;
  };

  // ⚠ `window` MUST exist here. 39 past_paper_*.js files end with
  // `window.PSAC_PDF_QUESTIONS.push(...)`, and without it every one of them
  // threw ReferenceError and was abandoned at that line. Today the throw lands
  // on the file's LAST statement, so the practice questions pushed above it had
  // already landed and nothing was visibly missing — which is exactly why this
  // went unnoticed. One new push added below that block would vanish silently.
  // build-questions.js has always supplied it (see _withPdfCapture); these two
  // copies never did, so "fixed in all three copies" was only half true.
  //
  // The papers go into their OWN buffer and are deliberately NOT merged into
  // STATIC_QUESTIONS: a past-paper item has no `answer`, and must never reach
  // code that expects to grade one.
  return { rnd, shuffle, fmt, makeMCQ, makeNum, makeTF, makeMatch, makeSymmetry, makeCloze, makeErrorHunt, makeText, makeTask: _makeTask,
           STATIC_QUESTIONS, window: { PSAC_PDF_QUESTIONS: papers },
           'use strict': undefined };
}

// ── Load every question in a subject pack ─────────────────────────────────
// ⚠ ONE loader, not one per caller. netlify/import-questions.js used to carry
// its own private copy of buildContext() holding only makeMCQ/makeNum/makeTF/
// makeMatch/makeSymmetry. It therefore threw "makeCloze is not defined" and
// "makeText is not defined" on six French files and imported 14,361 of the
// 14,726 questions the deployed app loads — 60 cloze and 305 typed-text items
// missing, silently, because a skipped file only ever printed a warning.
// The importer now calls loadPack()/loadCorpus() here, so a new factory can
// never be added to the app and forgotten in the importer again.
const _subjectCache = new Map();   // warm lambda reuse; cleared on cold start

// A pack's whole load result: the practice pool, the past-paper pool, what each
// source file contributed and — the part loadSubject() throws away — WHICH files
// failed and why. A caller that must not import a partial corpus needs the
// errors as data, not as a console.warn nobody reads.
function loadPack(subjectId) {
  const safeId = String(subjectId || '').replace(/[^a-z0-9-]/g, '');
  const empty = { subjectId: safeId, grade: 0, dir: null, practice: [], papers: [], files: [], errors: [] };
  if (!safeId) return empty;
  if (_subjectCache.has(safeId)) return _subjectCache.get(safeId);

  const dir = path.join(findRoot(), 'subjects', safeId, 'questions');
  if (!fs.existsSync(dir)) return empty;

  const practice = [];
  const papers   = [];
  const files    = [];
  const errors   = [];
  const ctx = vm.createContext(buildContext(practice, papers));
  // ⚠ EXPANDED HERE TOO, or the DATABASE ends up holding tasks only.
  //   `makeTask()` output is type "task", which isPoolQuestion() excludes
  //   from every pool. netlify/functions/questions.js serves from the
  //   database when a service key is present, so a database of bare tasks
  //   reproduces the empty-pack bug in production even though the built
  //   bundle is correct. The expansion is done after the files are read,
  //   just below.
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort()) {
    const beforeQ = practice.length, beforeP = papers.length;
    try {
      const code = fs.readFileSync(path.join(dir, file), 'utf8');
      new vm.Script(code, { filename: file }).runInContext(ctx);
      files.push({ file, practice: practice.length - beforeQ, papers: papers.length - beforeP });
    } catch (e) {
      // Roll the file's partial contribution back. A file that throws half way
      // through has pushed some questions already, and importing half a file is
      // worse than importing none of it: nothing downstream can tell which half.
      practice.length = beforeQ;
      papers.length   = beforeP;
      files.push({ file, practice: 0, papers: 0, failed: true });
      errors.push({ file, message: e.message });
    }
  }
  const pack = { subjectId: safeId, grade: Number((safeId.match(/^grade(\d+)-/) || [])[1] || 0),
                 dir, practice, papers, files, errors };
  // ⚠ Expanded once, after every file has run. `pack.practice` is the SAME
  //   array object, so pushing here fills it. Doing it per file would rescan a
  //   growing list; expandTasks() is idempotent by id, but asking once when
  //   the pack is complete is cheaper and clearer.
  const _extra = _expandTasks(practice);
  if (_extra.length) practice.push(..._extra);
  _subjectCache.set(safeId, pack);
  return pack;
}

// Unchanged contract: the practice pool only, errors reported as warnings.
// Every existing caller (assignment-open/submit, the audit and test scripts)
// keeps behaving exactly as before.
const _warned = new Set();
function loadSubject(subjectId) {
  const pack = loadPack(subjectId);
  for (const e of pack.errors) {
    const key = pack.subjectId + '/' + e.file;
    if (_warned.has(key)) continue;
    _warned.add(key);
    console.warn(`[questions-sandbox] ${pack.subjectId}/${e.file}: ${e.message}`);
  }
  return pack.practice;
}

// Every subject pack on disk, discovered — never listed. A new pack is a new
// directory and nothing else; build-questions.js discovers them the same way.
function listPacks() {
  const dir = path.join(findRoot(), 'subjects');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(d => /^grade\d+-/.test(d)
             && fs.statSync(path.join(dir, d)).isDirectory()
             && fs.existsSync(path.join(dir, d, 'questions')))
    .sort((a, b) => {
      const ga = Number(a.match(/^grade(\d+)-/)[1]), gb = Number(b.match(/^grade(\d+)-/)[1]);
      return ga - gb || a.localeCompare(b);
    });
}

// Evaluate an explicit list of { file, code } sources through the SAME context
// the packs are loaded with. The importer uses this to prove that a proposed
// source rewrite really reproduces the question it claims to — running the
// candidate file alongside its siblings, because a question file may read the
// pool earlier files pushed into (questions_audit.js does exactly that).
function evaluateSources(sources) {
  const practice = [], papers = [], errors = [];
  const ctx = vm.createContext(buildContext(practice, papers));
  // ⚠ EXPANDED HERE TOO, or the DATABASE ends up holding tasks only.
  //   `makeTask()` output is type "task", which isPoolQuestion() excludes
  //   from every pool. netlify/functions/questions.js serves from the
  //   database when a service key is present, so a database of bare tasks
  //   reproduces the empty-pack bug in production even though the built
  //   bundle is correct. The expansion is done after the files are read,
  //   just below.
  for (const s of sources) {
    try { new vm.Script(s.code, { filename: s.file }).runInContext(ctx); }
    catch (e) { errors.push({ file: s.file, message: e.message }); }
  }
  return { practice, papers, errors };
}

// The whole corpus, in one call, with the load errors preserved.
function loadCorpus() {
  const packs = listPacks().map(loadPack);
  return {
    packs,
    practice: packs.flatMap(p => p.practice),
    papers:   packs.flatMap(p => p.papers.map(q => ({ ...q, subjectId: p.subjectId }))),
    errors:   packs.flatMap(p => p.errors.map(e => ({ ...e, subjectId: p.subjectId }))),
    fileCount: packs.reduce((n, p) => n + p.files.length, 0),
  };
}

// Fetch a specific, ordered set of question ids from a pack.
function loadQuestionSet(subjectId, questionIds) {
  const all = loadSubject(subjectId);
  const byId = new Map(all.map(q => [q.id, q]));
  return (questionIds || []).map(id => byId.get(id)).filter(Boolean);
}

// ── Grading: must match engine/app.js exactly ─────────────────────────────
function normalise(v) {
  return String(v == null ? '' : v).toLowerCase()
    .replace(/\s+/g, '').replace(/,/g, '')
    .replace(/rs\.?/g, '').replace(/cm2/g, 'cm²').replace(/m2/g, 'm²')
    .replace(/kg/g, 'kg').replace(/min/g, 'min').replace(/\bpm\b/g, 'pm');
}

function checkAnswer(q, userAnswer) {
  if (!q) return false;
  if (q.type === 'symmetry-line') return SymmetryLine.checkAnswer(q, userAnswer);
  if (q.type === 'symmetry') {
    try {
      const selected = JSON.parse(userAnswer || '[]');
      const ans = q.answer || [];
      if (selected.length !== ans.length) return false;
      const sel = new Set(selected.map(([r, c]) => `${r},${c}`));
      return ans.every(([r, c]) => sel.has(`${r},${c}`));
    } catch { return false; }
  }
  if (userAnswer == null || userAnswer === '') return false;
  // ⚠ normalise() below is the MATHS normaliser — it deletes "rs" anywhere in
  // the string, so "cours" and "cou" grade as the same French word. A typed
  // French answer goes through matchTypedAnswer() instead.
  if (q.type === 'text') {
    return matchTypedAnswer(q.acceptableAnswers || [q.answer], userAnswer, q).ok;
  }
  const ua = normalise(userAnswer);
  return [q.answer, ...(q.acceptableAnswers || [])].some(a => normalise(a) === ua);
}

// answers: [{ id, answer }] from the client. Returns the AUTHORITATIVE result.
function grade(questions, answers) {
  const given = new Map((answers || []).map(a => [a && a.id, a && a.answer]));
  let score = 0;
  const detail = questions.map(q => {
    const ua = given.has(q.id) ? given.get(q.id) : null;
    const ok = checkAnswer(q, ua);
    if (ok) score++;
    return { id: q.id, chapterId: q.chapterId, userAnswer: ua == null ? '' : String(ua),
             correctAnswer: String(q.answer), correct: ok };
  });
  const total = questions.length;
  return { score, total, pct: total ? Math.round(score / total * 100) : 0, detail };
}

module.exports = { findRoot, loadSubject, loadPack, listPacks, loadCorpus, loadQuestionSet,
                   buildContext, evaluateSources, normalise, checkAnswer, grade, foldAnswer, bareAnswer, matchTypedAnswer };
