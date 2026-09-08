// Netlify Function - Question Server
// Reads question JS files server-side and returns filtered JSON.
// Browser never sees the raw source files.

const { resolveStudent } = require('../lib/student-auth');
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
const { makeTask: _makeTask } = require("../../engine/assessment.js");


// Project root is two levels up from netlify/functions/
const ROOT = path.resolve(__dirname, '..', '..');

// ── Helper functions that mirror helpers.js ────
// Run inside the vm context so question files can call them normally.
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

function _buildContext(buf, papers = []) {
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
    const others   = shuffle([...new Set((options || []).filter(o => o !== answer))]);
    const finalOpts = shuffle([answer, ...others.slice(0, 3)]);
    return { id, chapterId, difficulty, subsection, type: 'mcq', question, options: finalOpts, answer, acceptableAnswers: [answer], hint, explanation, learnMore };
  }

  function makeNum({ id, chapterId, difficulty, subsection, question, answer, acceptableAnswers, hint, explanation, learnMore }) {
    return { id, chapterId, difficulty, subsection, type: 'numeric', question,
      answer: String(answer),
      acceptableAnswers: (acceptableAnswers || [String(answer)]).map(String),
      hint, explanation, learnMore };
  }

  // Mirrors engine/helpers.js, including `subsection` — the one field this
  // factory used to drop while every other factory passed it through.
  function makeSymmetry({ id, chapterId, difficulty, subsection, question, rows, cols, axis, axisPos, given, answer, hint, explanation }) {
    const ans = answer || (given || []).map(([r, c]) => {
      if (axis === 'vertical')   return [r, (cols - 1) - c];
      if (axis === 'horizontal') return [(rows - 1) - r, c];
      return null;
    }).filter(Boolean);
    return { id, chapterId, difficulty, subsection, type: 'symmetry', question, rows, cols, axis, axisPos, given, answer: ans,
      hint: hint || 'Click the empty cells to mirror the pattern across the coloured line.',
      explanation: explanation || 'Each cell mirrors its pair across the axis of symmetry.' };
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
      hint: hint || 'Lis le texte à voix basse. Une erreur s\'entend souvent avant de se voir : majuscules, points, accords du pluriel, verbes.',
      explanation: explanation || ('Ce texte cache ' + errors + ' erreurs : majuscules, ponctuation, accords et homophones.'),
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

  // The REAL array with a flattening push — see the note in build-questions.js.
  // A { push }-only stub makes questions_audit.js throw on `.forEach`, which
  // silently drops that whole file: 18 questions and every difficulty
  // correction it applies.
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
  return { rnd, shuffle, fmt, makeMCQ, makeNum, makeTF, makeMatch, makeSymmetry, makeCloze, makeErrorHunt, makeText, makeTask: _makeTask, STATIC_QUESTIONS,
           window: { PSAC_PDF_QUESTIONS: papers },
           'use strict': undefined }; // suppress strict-mode header errors
}

// ── Load all question files for a subject ────
function _loadSubject(subjectId) {
  const dir = path.join(ROOT, 'subjects', subjectId, 'questions');
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.js'))
    .sort(); // consistent ordering

  const buf = [];
  const ctx = vm.createContext(_buildContext(buf));

  for (const file of files) {
    try {
      const code = fs.readFileSync(path.join(dir, file), 'utf8');
      new vm.Script(code, { filename: file }).runInContext(ctx);
    } catch(e) {
      console.warn(`[questions] ${file}: ${e.message}`);
    }
  }

  return buf;
}

// The deploy build normally writes question-bundles/past-papers.json.  Local
// development (and an interrupted deploy build) may not have that generated
// file, even though the source packs are present.  Keep this fallback separate
// from practice-question loading so these unmarked questions can only ever be
// returned by the dedicated past-papers endpoint.
let _sourcePapersCache = null;
function _loadPastPapersFromSource() {
  if (_sourcePapersCache) return _sourcePapersCache;

  const subjectsDir = path.join(ROOT, 'subjects');
  const papers = [];
  if (!fs.existsSync(subjectsDir)) return papers;

  for (const subjectId of fs.readdirSync(subjectsDir)) {
    const dir = path.join(subjectsDir, subjectId, 'questions');
    if (!fs.existsSync(dir)) continue;

    const captured = [];
    const ctx = vm.createContext(_buildContext([], captured));
    for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort()) {
      try {
        const code = fs.readFileSync(path.join(dir, file), 'utf8');
        new vm.Script(code, { filename: file }).runInContext(ctx);
      } catch (e) {
        console.warn(`[questions] ${file}: ${e.message}`);
      }
    }
    papers.push(...captured.map(question => ({ ...question, subjectId })));
  }

  _sourcePapersCache = papers;
  return papers;
}

// ── Plan enforcement cache (module-level, survives warm Lambda re-use) ────────
const _settingsCache = { data: null, at: 0 };
const _planCache     = new Map(); // userId → { data: allowed_chapters|null, at }
const _PLAN_TTL      = 5 * 60 * 1000; // 5 minutes

// ── Bundle cache ─────────────────────────────────────────────────────────────
// Question bundles are IMMUTABLE for the life of a deploy — they are written by
// the build step and never change until the next one. Re-reading and re-parsing
// grade5.json (1.6 MB) on every invocation was the single most expensive thing
// this function did, and Netlify bills the milliseconds. Parse once per warm
// container, keep it for as long as the container lives; no TTL, because a new
// deploy means a new container anyway.
const _bundleCache = new Map(); // filename → parsed JSON

function _readBundle(name) {
  if (_bundleCache.has(name)) return _bundleCache.get(name);
  const file = path.join(__dirname, '..', 'question-bundles', `${name}.json`);
  let parsed = null;
  try {
    if (fs.existsSync(file)) parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch(e) {
    console.error('[questions] bundle read', name, e.message);
  }
  _bundleCache.set(name, parsed);   // cache the miss too - existsSync is not free
  return parsed;
}

// ── DB question cache ─────────────────────────────────────────────────────────
// Questions change only when the import script runs (not on every deploy), so
// a 5-minute TTL balances freshness against Supabase round trips.
const _dbCache = new Map(); // key → { data: [...], at }
const _DB_TTL  = 5 * 60 * 1000;

// Fetches all rows for a query, paginating 500 at a time.
async function _fetchAllRows(url, hdrs) {
  const PAGE = 500;
  let offset = 0, all = [], done = false;
  while (!done) {
    const r = await fetch(`${url}&limit=${PAGE}&offset=${offset}`, { headers: hdrs });
    if (!r.ok) return null;
    const batch = await r.json();
    if (!Array.isArray(batch)) return null;
    all.push(...batch);
    if (batch.length < PAGE) done = true;
    else offset += PAGE;
  }
  return all;
}

// Returns question data array for a subject from DB, or null if empty/unavailable.
async function _dbQuerySubject(subjectId, sbUrl, sbSrk) {
  if (!sbSrk) return null;
  const key = `sub:${subjectId}`;
  const hit = _dbCache.get(key);
  if (hit && (Date.now() - hit.at) < _DB_TTL) return hit.data;
  const hdrs = { apikey: sbSrk, Authorization: `Bearer ${sbSrk}` };
  const url  = `${sbUrl}/rest/v1/questions?subject_id=eq.${encodeURIComponent(subjectId)}&is_past_paper=eq.false&select=data`;
  const rows = await _fetchAllRows(url, hdrs).catch(() => null);
  if (!rows || !rows.length) return null;
  const data = rows.map(r => r.data);
  _dbCache.set(key, { data, at: Date.now() });
  return data;
}

// Returns { subjectId: [...] } map for a grade from DB, or null.
async function _dbQueryGrade(grade, sbUrl, sbSrk) {
  if (!sbSrk) return null;
  const key = `grade:${grade}`;
  const hit = _dbCache.get(key);
  if (hit && (Date.now() - hit.at) < _DB_TTL) return hit.data;
  const hdrs = { apikey: sbSrk, Authorization: `Bearer ${sbSrk}` };
  const url  = `${sbUrl}/rest/v1/questions?grade=eq.${grade}&is_past_paper=eq.false&select=subject_id,data`;
  const rows = await _fetchAllRows(url, hdrs).catch(() => null);
  if (!rows || !rows.length) return null;
  const grouped = {};
  for (const row of rows) {
    if (!grouped[row.subject_id]) grouped[row.subject_id] = [];
    grouped[row.subject_id].push(row.data);
  }
  _dbCache.set(key, { data: grouped, at: Date.now() });
  return grouped;
}

// Returns past-paper array from DB, or null.
async function _dbQueryPastPapers(grade, sbUrl, sbSrk) {
  if (!sbSrk) return null;
  const key = `papers:${grade || 'all'}`;
  const hit = _dbCache.get(key);
  if (hit && (Date.now() - hit.at) < _DB_TTL) return hit.data;
  const hdrs = { apikey: sbSrk, Authorization: `Bearer ${sbSrk}` };
  let url = `${sbUrl}/rest/v1/questions?is_past_paper=eq.true&select=data`;
  if (grade) url += `&grade=eq.${grade}`;
  const rows = await _fetchAllRows(url, hdrs).catch(() => null);
  if (!rows || !rows.length) return null;
  const data = rows.map(r => r.data);
  _dbCache.set(key, { data, at: Date.now() });
  return data;
}

// ── Auth cache ───────────────────────────────────────────────────────────────
// Verifying a caller costs a Supabase round trip (~100-300 ms of billed time)
// and the answer barely changes minute to minute. Keyed on the credential
// itself, so a revoked token stops working within the TTL rather than never.
// Deliberately short, and never cached for a FAILED check - a rejected caller
// must not be able to pin a negative result, and a newly created child must be
// able to log in immediately.
const _authCache = new Map(); // credential → { uid, at }
const _AUTH_TTL  = 5 * 60 * 1000;

function _authCacheGet(key) {
  const hit = _authCache.get(key);
  if (hit && (Date.now() - hit.at) < _AUTH_TTL) return hit.uid;
  if (hit) _authCache.delete(key);
  return undefined;
}

function _authCacheSet(key, uid) {
  // A warm container that has served many children should not grow unbounded.
  if (_authCache.size > 500) _authCache.clear();
  _authCache.set(key, { uid, at: Date.now() });
}

// ── Rate limiting ──────────────────────────────────────────────────────────
// This function's whole job is handing back question content in the clear -
// the browser has to be able to grade an answer, so the correct answer ships
// with every question, and no amount of client-side obfuscation changes that
// for someone reading the response in devtools. What this DOES stop is bulk
// scraping: a script looping every subject × grade × chapter × difficulty
// combination to rip the whole bank in one burst, which looks nothing like a
// real student (the client fetches a subject once and caches it client-side
// for 7 days - see _CACHE_VERSION in question_loader.js).
//
// In-memory and per-warm-container, same tradeoff as _authCache/_planCache
// above: it resets on a cold start and can't see across parallel warm
// instances, so a determined attacker spreading requests across many
// concurrent invocations can partially evade it. That is a real gap - a
// durable counter (a Supabase table, checked/incremented per request) would
// close it, at the cost of a DB round trip on every call. This is the cheap
// backstop that stops the common case for free; upgrade it if scraping is
// actually observed rather than paying that cost pre-emptively.
const _rateLimit    = new Map(); // uid → { count, windowStart }
const _RATE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const _RATE_MAX       = 40;            // generous for real use - see comment above

function _isRateLimited(uid) {
  if (!uid) return false; // no identity ⇒ the auth check earlier already rejected the call
  if (_rateLimit.size > 2000) _rateLimit.clear(); // same unbounded-growth guard as _authCache
  const now = Date.now();
  const hit = _rateLimit.get(uid);
  if (!hit || now - hit.windowStart > _RATE_WINDOW_MS) {
    _rateLimit.set(uid, { count: 1, windowStart: now });
    return false;
  }
  hit.count++;
  return hit.count > _RATE_MAX;
}

// Returns the whole global_settings blob, not just the enforcement flag: the
// same fetch also carries disabled_chapters, and doing it twice would double the
// round trips on a cold Lambda.
async function _globalSettings(sbUrl, sbAnon) {
  const now = Date.now();
  if (_settingsCache.data !== null && (now - _settingsCache.at) < _PLAN_TTL) return _settingsCache.data;
  try {
    const r = await fetch(
      `${sbUrl}/rest/v1/mm_data?key=eq.global_settings&select=value&limit=1`,
      { headers: { apikey: sbAnon, Authorization: `Bearer ${sbAnon}` } }
    );
    const rows = r.ok ? await r.json() : [];
    const val  = rows[0]?.value || {};
    _settingsCache.data = val;
    _settingsCache.at   = now;
    return val;
  } catch(_) { return {}; }
}

// ══════════════════════════════════════════════════════════════════════════
//  Account access: expiry, blocks, and credit-bought chapter entitlements
//
//  ⚠ THIS IS WHERE THE CREDIT SHOP IS ACTUALLY ENFORCED. Everything the
//  browser shows about credits, purchases and unlocked chapters is decoration
//  over this function. A parent who edits localStorage, flips a `disabled`
//  attribute, or POSTs straight at PostgREST changes nothing here: the
//  entitlement rows are written only by purchase_chapter() (a SECURITY DEFINER
//  function over tables with no client write grant at all), and this reads them
//  with the service role.
//
//  Three facts come back, and each one changes what may be served:
//    · blocked  — a moderation hold. Nothing is served at all.
//    · expired  — the account's date has passed. ONLY live entitlements are
//                 served, whatever the plan says. This is what makes "a chapter
//                 you bought with credits keeps working for 30 days even if
//                 your account lapses" true rather than a promise in the UI.
//    · entitled — chapter ids with an unexpired entitlement row, added to
//                 whatever the plan already allowed.
//
//  Cached with the same 5-minute TTL as the plan lookup, so this costs one
//  extra round trip per family per five minutes, not one per request.
// ══════════════════════════════════════════════════════════════════════════
const _accessCache = new Map(); // parentId → { data, at }

async function _accountAccess(parentId, studentExpiresAt, sbUrl, sbSrk) {
  const empty = { blocked: false, expired: false, entitled: [] };
  if (!parentId || !sbSrk) return empty;

  const now = Date.now();
  const hit = _accessCache.get(parentId);
  let base = hit && (now - hit.at) < _PLAN_TTL ? hit.data : null;

  if (!base) {
    base = { blocked: false, expired: false, entitled: [] };
    try {
      const hdrs = { apikey: sbSrk, Authorization: `Bearer ${sbSrk}` };
      const [pr, er] = await Promise.all([
        fetch(`${sbUrl}/rest/v1/profiles?id=eq.${parentId}&select=expires_at,blocked_until&limit=1`, { headers: hdrs }),
        fetch(`${sbUrl}/rest/v1/chapter_entitlements?user_id=eq.${parentId}&expires_at=gt.${new Date().toISOString()}&select=chapter_id`, { headers: hdrs }),
      ]);
      const p = pr.ok ? (await pr.json())[0] : null;
      if (p) {
        base.blocked = !!(p.blocked_until && new Date(p.blocked_until) > new Date());
        base.expired = !!(p.expires_at && new Date(p.expires_at) < new Date());
      }
      // A database that has not run supabase-schema.sql yet answers 404
      // for this table. That must read as "no entitlements", never as an error
      // that withholds a subject from a paying family.
      if (er.ok) {
        const rows = await er.json();
        if (Array.isArray(rows)) base.entitled = rows.map(r => r.chapter_id).filter(c => typeof c === 'string');
      }
      _accessCache.set(parentId, { data: base, at: now });
    } catch (e) {
      console.warn('[questions] account access:', e.message);
      return empty;   // fail OPEN, like every other gate in this file
    }
  }

  // The CHILD's own expiry counts too, and it is not cached with the parent's
  // because two siblings can differ.
  const expired = base.expired
    || !!(studentExpiresAt && new Date(studentExpiresAt) < new Date());
  return { blocked: base.blocked, expired, entitled: base.entitled };
}

// Who owns this request's account, and (for a child) when their own access
// runs out. Cached because it is two round trips and it never changes.
const _ownerCache = new Map(); // uid → { parentId, studentExpiresAt, at }

async function _resolveOwner(userId, isStudentId, sbUrl, sbSrk) {
  if (!sbSrk) return null;
  const now = Date.now();
  const hit = _ownerCache.get(userId);
  if (hit && (now - hit.at) < _PLAN_TTL) return hit;

  const hdrs = { apikey: sbSrk, Authorization: `Bearer ${sbSrk}` };
  let out = { parentId: userId, studentExpiresAt: null, at: now };
  try {
    if (isStudentId) {
      const sr = await fetch(
        `${sbUrl}/rest/v1/students?id=eq.${userId}&select=family_id,expires_at&limit=1`, { headers: hdrs });
      const s = sr.ok ? (await sr.json())[0] : null;
      if (!s?.family_id) return null;
      out.studentExpiresAt = s.expires_at || null;

      const fr = await fetch(
        `${sbUrl}/rest/v1/families?id=eq.${s.family_id}&select=parent_id&limit=1`, { headers: hdrs });
      const f = fr.ok ? (await fr.json())[0] : null;
      if (!f?.parent_id) return null;
      out.parentId = f.parent_id;
    }
    _ownerCache.set(userId, out);
    return out;
  } catch (e) {
    console.warn('[questions] owner lookup:', e.message);
    return null;
  }
}

// ── WHICH GRADES ARE FREE ────────────────────────────────────────────────
// Grades 1-2 are free for every family, permanently; grades 3-9 are the paid
// tiers. Applied BELOW the account block and BELOW the admin kill switches
// (those are moderation, not pricing) but ABOVE the plan list and the expiry
// restriction — so a free grade is served on a lapsed account and on the Free
// plan, exactly as the UI promises.
//
// ⚠ DUPLICATED from engine/helpers.js — Lambda vs browser, no shared module.
// Change one and you must change the other, or the padlocks the UI draws and
// the questions this function releases will disagree.
const FREE_GRADES = [1, 2];
function _isFreeSubjectId(subjectId) {
  const m = /^grade(\d+)-/.exec(String(subjectId || ''));
  return !!m && FREE_GRADES.includes(Number(m[1]));
}

// The plan's own chapter list. null = unlimited.
async function _getAllowedChapters(parentId, sbUrl, sbSrk) {
  if (!sbSrk || !parentId) return null;
  const now    = Date.now();
  const cached = _planCache.get(parentId);
  if (cached && (now - cached.at) < _PLAN_TTL) return cached.data;
  try {
    const subR = await fetch(
      `${sbUrl}/rest/v1/subscriptions?user_id=eq.${parentId}&status=eq.active&select=plan_id,plans(features)&order=started_at.desc&limit=1`,
      { headers: { apikey: sbSrk, Authorization: `Bearer ${sbSrk}` } }
    );
    const subRows  = subR.ok ? await subR.json() : [];
    const features = subRows[0]?.plans?.features;
    const allowed  = features?.allowed_chapters ?? null;
    _planCache.set(parentId, { data: allowed, at: now });
    return allowed;
  } catch(e) {
    console.warn('[questions] plan lookup:', e.message);
    return null;
  }
}

// ── Netlify handler ──────────────────────────
exports.handler = async (event) => {
  const headers = {
    'Content-Type':                'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control':               'public, s-maxage=86400, stale-while-revalidate=3600',
  };

  // ⚠ Auth failures must NEVER inherit the cacheable header above.
  //
  // Every response used to share that object, so a 401 was returned with
  // `public, s-maxage=86400`. Netlify's CDN caches on URL alone — it does not
  // vary on Authorization or X-Student-Token — so the FIRST unauthenticated
  // request to a URL poisoned it for 24 hours, and every legitimate child
  // asking for that same subject afterwards was served the cached 401. Proved
  // in production: identical requests differing only in credentials all came
  // back 401 with `Age: 2`, and adding a cache-busting query string
  // immediately produced the correct, different answers.
  //
  // Errors are per-caller by definition, so they are no-store. The success
  // path keeps its own Cache-Control, set further down (and already dropped to
  // `private` whenever a plan or entitlement filter applies).
  const errHeaders = Object.assign({}, headers, { 'Cache-Control': 'no-store' });

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // ── Auth: a valid Supabase JWT, or a valid STUDENT SESSION TOKEN ──
  // ⚠ X-Student-Id is no longer accepted as authentication. It used to be: the
  // handler checked only that the UUID existed in students, so whoever held a
  // child's id — a permanent identifier in client state, never rotated — could
  // read that child's plan-gated and reward-gated question set. Existence is
  // not proof of possession. X-Student-Token is, and it is the same credential
  // RLS already resolves through current_student_id().
  const authHeader   = (event.headers['authorization'] || '').replace('Bearer ', '').trim();
  const studentToken = (event.headers['x-student-token'] || '').trim();

  if (!authHeader && !studentToken) {
    return { statusCode: 401, headers: errHeaders, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  const SB_URL  = process.env.SUPABASE_URL  || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
  const SB_ANON = process.env.SUPABASE_ANON_KEY || 'sb_publishable_wERRrZnvoWhM5faN2AaYpQ_CpTNHFkL';
  const SB_SRK  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  let _uid = null; // authenticated principal id used for plan lookup
  if (authHeader) {
    _uid = _authCacheGet('jwt:' + authHeader);
    if (_uid === undefined) {
      // Verify Supabase JWT - rejects expired, forged, or random strings
      const r = await fetch(`${SB_URL}/auth/v1/user`, {
        headers: { Authorization: `Bearer ${authHeader}`, apikey: SB_ANON },
      });
      if (!r.ok) return { statusCode: 401, headers: errHeaders, body: JSON.stringify({ error: 'Invalid token' }) };
      try { _uid = (await r.json()).id || null; } catch(_) { _uid = null; }
      _authCacheSet('jwt:' + authHeader, _uid);
    }
  } else if (studentToken) {
    // Cached on the TOKEN, not the student id, so revoking a session (logout
    // everywhere, or the anti-sharing session bump) stops working within the
    // cache TTL rather than never — the same property the JWT branch has.
    _uid = _authCacheGet('tok:' + studentToken);
    if (_uid === undefined) {
      const r = await resolveStudent(event.headers, { supabaseUrl: SB_URL, serviceKey: SB_SRK });
      if (!r.ok) {
        // 503 (cannot check) is NOT cached: caching it would lock a child out
        // for the whole TTL over one transient failure.
        return { statusCode: r.status, headers: errHeaders, body: JSON.stringify({ error: r.error }) };
      }
      _uid = r.studentId;
      _authCacheSet('tok:' + studentToken, _uid);
    }
  }

  // Everything downstream asks "is this a student request?". It used to read
  // the presence of the id header; it is now the presence of a verified token.
  const studentId = studentToken ? _uid : null;

  if (_isRateLimited(_uid)) {
    return { statusCode: 429, headers: errHeaders, body: JSON.stringify({ error: 'Too many requests. Please slow down and try again shortly.' }) };
  }

  // ── Admin + plan enforcement ───────────────────────────────────────────────
  // This is the ONLY enforcement that matters. The parent dashboard greys these
  // chapters out and the practice screen refuses to open them, but both live in
  // the browser and both are one devtools edit from being switched off. Here the
  // questions simply never leave the server, so there is nothing to cheat with.
  const _gs = await _globalSettings(SB_URL, SB_ANON);

  // Who this request belongs to. Needed for the entitlement and expiry checks
  // below whether or not plan enforcement is switched on: a lapsed account is
  // restricted by its own date, not by a tier.
  const _owner = await _resolveOwner(_uid, !!studentId, SB_URL, SB_SRK);
  const _access = _owner
    ? await _accountAccess(_owner.parentId, _owner.studentExpiresAt, SB_URL, SB_SRK)
    : { blocked: false, expired: false, entitled: [] };

  // A moderation hold. Refused outright rather than filtered, so it is visible
  // to the person it applies to instead of looking like an empty subject.
  if (_access.blocked) {
    return {
      statusCode: 403,
      headers: Object.assign({}, headers, { 'Cache-Control': 'no-store' }),
      body: JSON.stringify({ error: 'account_blocked',
        message: 'This account is temporarily paused. Please contact support.' }),
    };
  }

  let _allowedChapters = null; // null = no plan restriction (serve everything)
  if (_gs.plan_enforcement_enabled === true && _owner) {
    _allowedChapters = await _getAllowedChapters(_owner.parentId, SB_URL, SB_SRK);
  }

  // ⚠ The order of these two rules is the whole feature.
  //
  // EXPIRED wins over everything: the allowed list becomes exactly the chapters
  // with a live credit entitlement, even if the plan was unlimited and even if
  // plan enforcement is off. That is what "a chapter you bought stays open for
  // 30 days even after your account expires" actually means — and equally, that
  // nothing ELSE stays open.
  //
  // NOT EXPIRED: entitlements are added to whatever the plan already allowed.
  // Never subtractive; buying a chapter can only ever give you more.
  if (_access.expired) {
    _allowedChapters = _access.entitled;
  } else if (_allowedChapters && _access.entitled.length) {
    _allowedChapters = [...new Set([..._allowedChapters, ..._access.entitled])];
  }
  const _allowedSet = _allowedChapters ? new Set(_allowedChapters) : null;

  // Chapters an admin switched off for everybody. Unlike the plan list this
  // applies whether or not plan enforcement is on — it is a kill switch, not a
  // tier.
  const _blockedSet = new Set(_gs.disabled_chapters || []);
  const _blockedSubjects = new Set(_gs.disabled_subjects || []);

  // subjectId is REQUIRED: it is the only thing that says which grade these
  // questions belong to (a question object carries chapterId, not a grade), and
  // grades 1-2 skip the plan/expiry list entirely.
  const _planFilter = (qs, subjectId) => {
    let out = qs;
    if (_allowedSet && !_isFreeSubjectId(subjectId)) out = out.filter(q => _allowedSet.has(q.chapterId));
    if (_blockedSet.size) out = out.filter(q => !_blockedSet.has(q.chapterId));
    return out;
  };

  // The default header is `public, s-maxage=86400`, which lets Netlify's shared
  // CDN cache one response and hand it to everybody. That is fine while every
  // caller gets the identical payload — but the moment the body depends on WHO
  // asked (plan tier), a cached copy would leak one family's chapter set to
  // another, in both directions. As soon as any per-caller filtering is in play,
  // the response stops being shareable.
  if (_allowedSet) headers['Cache-Control'] = 'private, max-age=300';
  else if (_blockedSet.size || _blockedSubjects.size) headers['Cache-Control'] = 'public, s-maxage=300';

  const p          = event.queryStringParameters || {};
  const subjectId  = (p.subject    || '').replace(/[^a-z0-9-]/g, '');
  const chapterId  = (p.chapter    || '') || null;
  const difficulty = p.difficulty  ? parseInt(p.difficulty) : null;
  const batchAll   = p.all === '1';
  const batchGrade = (p.grade      || '').replace(/[^0-9]/g, '');

  // ── Past papers: ?papers=1[&grade=N] ──────────────────────────────────────
  // Real PSAC exam questions, written/drawn responses with a mark allocation
  // and NO answer — they are for reading and attempting on paper, never for
  // marking. Served separately from the practice pool for exactly that reason:
  // an item with no `answer` must never reach code that expects to grade one.
  //
  // Goes through this function rather than being a static asset so it inherits
  // the same auth the rest of the content has.
  if (p.papers === '1') {
    let all = await _dbQueryPastPapers(batchGrade || null, SB_URL, SB_SRK);
    if (!all) all = _readBundle('past-papers') || [];
    if (!all.length) all = _loadPastPapersFromSource();
    const list = (batchGrade && all.some(q => q.grade)) ? all.filter(q => String(q.grade) === batchGrade) : all;
    return { statusCode: 200, headers, body: JSON.stringify(list) };
  }

  // Batch endpoint: ?all=1&grade=N — returns all subjects for the grade in one call
  if (batchAll && batchGrade) {
    try {
      // Try DB first
      const dbBundle = await _dbQueryGrade(batchGrade, SB_URL, SB_SRK);
      if (dbBundle) {
        const out = {};
        for (const [key, qs] of Object.entries(dbBundle)) {
          if (_blockedSubjects.has(key)) continue;
          out[key] = _planFilter(qs, key);
        }
        return { statusCode: 200, headers, body: JSON.stringify(out) };
      }
      // Fall back to pre-built bundle, parsed once per warm container.
      // ⚠ Never mutate the cached object — it is shared by every subsequent
      // request this container serves, so deleting a blocked subject from it
      // would hide that subject for everyone until the container recycles.
      const cachedBundle = _readBundle(`grade${batchGrade}`);
      if (cachedBundle) {
        const out = {};
        for (const [key, qs] of Object.entries(cachedBundle)) {
          if (_blockedSubjects.has(key)) continue;
          out[key] = _planFilter(qs, key);
        }
        return { statusCode: 200, headers, body: JSON.stringify(out) };
      }
      // Last fallback: build dynamically (local dev or bundle missing)
      const subjectsDir = path.join(ROOT, 'subjects');
      const allDirs = fs.readdirSync(subjectsDir)
        .filter(d => d.startsWith(`grade${batchGrade}-`) && fs.statSync(path.join(subjectsDir, d)).isDirectory());
      const result = {};
      for (const dir of allDirs) {
        if (_blockedSubjects.has(dir)) continue;
        result[dir] = _planFilter(_loadSubject(dir), dir);
      }
      return { statusCode: 200, headers, body: JSON.stringify(result) };
    } catch(e) {
      console.error('[questions batch]', e);
      return { statusCode: 500, headers: errHeaders, body: JSON.stringify({ error: 'Server error' }) };
    }
  }

  if (!subjectId) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'subject param required' }) };
  }

  // Subject switched off by an admin: an empty list, not an error — the client
  // already handles "this subject has no questions loaded".
  if (_blockedSubjects.has(subjectId)) {
    return { statusCode: 200, headers, body: '[]' };
  }

  try {
    // Try DB first
    let subjectQs = await _dbQuerySubject(subjectId, SB_URL, SB_SRK);

    // Fall back to per-subject bundle. Reading grade5.json to answer a
    // request for grade5-maths would mean parsing 1.6 MB to return 100 KB.
    if (!subjectQs) subjectQs = _readBundle(subjectId);

    // Older deploys only have the whole-grade bundles; fall back to those.
    if (!subjectQs) {
      const gradeMatch = subjectId.match(/grade(\d)/);
      const bundle = gradeMatch ? _readBundle(`grade${gradeMatch[1]}`) : null;
      if (bundle && bundle[subjectId]) subjectQs = bundle[subjectId];
    }

    if (subjectQs) {
      let questions = _planFilter(subjectQs, subjectId);
      if (chapterId)  questions = questions.filter(q => q.chapterId  === chapterId);
      if (difficulty) questions = questions.filter(q => q.difficulty === difficulty);
      return { statusCode: 200, headers, body: JSON.stringify(questions) };
    }
    // Last fallback: build dynamically
    let questions = _planFilter(_loadSubject(subjectId), subjectId);
    if (chapterId)  questions = questions.filter(q => q.chapterId  === chapterId);
    if (difficulty) questions = questions.filter(q => q.difficulty === difficulty);
    return { statusCode: 200, headers, body: JSON.stringify(questions) };
  } catch(e) {
    console.error('[questions]', e);
    return { statusCode: 500, headers: errHeaders, body: JSON.stringify({ error: 'Server error' }) };
  }
};
