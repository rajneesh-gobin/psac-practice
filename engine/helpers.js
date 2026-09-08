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
