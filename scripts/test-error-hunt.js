'use strict';
// ── Chasse aux Erreurs: the content, and the four copies of its factory ─────
//
// Sixty texts across three French packs, each one a passage that has been
// deliberately broken. The exercise only works if TWO things hold, and neither
// is visible by reading the source:
//
//   1. Every word OUTSIDE the braces is correct French. A word left wrong by
//      accident is an error a child can see, cannot score, and is TOLD IS
//      CORRECT when they click it. That is worse than no exercise.
//   2. Every word inside the braces is genuinely wrong and its correction is
//      genuinely right.
//
// (2) is a reading and a script cannot do it - the same limit
// scripts/audit-difficulty-labels.js records about difficulty labels. What a
// script CAN do is reconstruct the corrected text and assert that it reads as
// well-formed French at the mechanical level: sentences opening with a capital,
// every sentence closed, no doubled spaces, no error that corrects to itself.
// That is what this does, and it is why makeErrorHunt carries a `correct` field
// at all.
//
// ⚠ Run `node netlify/build-questions.js` first - this reads the BUILT bundles,
//   not the sources, because a field silently stripped at build time is the
//   defect this project has actually paid for twice (learnMore, subsection).
//
// Usage: node scripts/test-error-hunt.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const BUNDLES = path.join(ROOT, 'netlify', 'question-bundles');

let pass = 0, fail = 0;
const ok = m => { pass++; console.log('  ok   ' + m); };
const bad = m => { fail++; console.log('  FAIL ' + m); };
const note = m => console.log('  note ' + m);
const check = (cond, m, detail) => cond ? ok(m) : bad(m + (detail ? ' — ' + detail : ''));

// Grade → the chapter, the file, and the error count every text must carry.
// The counts rise with the grade because the reading level does; they are
// asserted rather than described so a text written later cannot drift.
const PACKS = [
  { pack: 'grade4-french', chapter: 'g4fr-chasse-erreurs', errors: 8,  minWords: 40, maxWords: 75 },
  { pack: 'grade5-french', chapter: 'g5fr-chasse-erreurs', errors: 10, minWords: 60, maxWords: 100 },
  { pack: 'grade6-french', chapter: 'g6fr-chasse-erreurs', errors: 12, minWords: 80, maxWords: 130 },
];
const TEXTS_PER_PACK = 20;

const strip = s => s.replace(/[^A-Za-zÀ-ÿ'-]+$/, '');
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

console.log('\nChasse aux Erreurs\n');

// ── 1. The four hand-written copies of makeErrorHunt must still agree ───────
{
  console.log('— the factory, four copies —');
  const FILES = ['engine/helpers.js', 'netlify/functions/questions.js',
    'netlify/build-questions.js', 'netlify/lib/questions-sandbox.js'];
  const load = f => {
    const src = fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r/g, '');
    const i = src.indexOf('function makeErrorHunt(');
    if (i < 0) return null;
    const pad = src.slice(src.lastIndexOf('\n', i) + 1, i);
    const end = '\n' + pad + '}';
    const j = src.indexOf(end, i);
    const c = vm.createContext({});
    vm.runInContext(src.slice(i, j + end.length) + '\n;globalThis.__mk = makeErrorHunt;', c);
    return c.__mk;
  };
  const sample = {
    id: 'x', chapterId: 'c', difficulty: 2, subsection: 's', title: 'T',
    text: '{le>Le:maj} chat mange ses {croquette>croquettes:pl}. Il dort dans la {cour>cour.:pt}',
  };
  const outs = FILES.map(f => {
    try { const mk = load(f); return mk ? JSON.stringify(mk(sample)) : 'MISSING'; }
    catch (e) { return 'THREW: ' + e.message; }
  });
  check(outs.every(o => o === outs[0]),
    'all four copies of makeErrorHunt return the identical object',
    FILES.map((f, i) => f + '=' + outs[i].slice(0, 60)).join(' | '));

  // The exported context list is the step makeCloze was missing, which silently
  // emptied every cloze text out of the built bundle for months.
  for (const f of FILES.slice(1)) {
    const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
    const ret = src.slice(src.lastIndexOf('return { rnd') >= 0 ? src.lastIndexOf('return { rnd') : src.lastIndexOf('return { shuffle'));
    check(/makeErrorHunt/.test(ret.slice(0, 400)),
      f + ' exports makeErrorHunt in its context list');
  }

  // Both authoring traps must fail LOUDLY and identically, never silently.
  const mk0 = load(FILES[0]);
  for (const [label, text] of [
    ['a half-written brace token', 'un mot cuisine{.>.:pt}'],
    ['an error that corrects to itself', 'un mot {la>la:acc}'],
  ]) {
    let threw = false;
    try { mk0({ ...sample, text }); } catch (e) { threw = true; }
    check(threw, 'makeErrorHunt throws on ' + label);
  }
  // Punctuation outside the braces rides onto both forms.
  const suffixed = mk0({ ...sample, text: '{cahier>cahiers:pl}.' });
  check(suffixed.words[0] === 'cahier.' && suffixed.errFix[0] === 'cahiers.',
    'punctuation outside the braces is carried onto both forms',
    suffixed.words[0] + ' / ' + suffixed.errFix[0]);
}

// ── 2. isPoolQuestion must exclude the type ────────────────────────────────
{
  console.log('\n— the type is out of every pool —');
  const qe = fs.readFileSync(path.join(ROOT, 'engine/questions_engine.js'), 'utf8');
  check(/_POOL_TYPES_EXCLUDED[^;]*'errorhunt'/.test(qe),
    "isPoolQuestion() excludes 'errorhunt' — dealt into practice it would draw a number pad under a French passage");
}

// ── 3. The texts themselves ────────────────────────────────────────────────
let totalTexts = 0, totalErrors = 0;
const kinds = new Map();

for (const P of PACKS) {
  console.log('\n— ' + P.pack + ' —');
  const f = path.join(BUNDLES, P.pack + '.json');
  if (!fs.existsSync(f)) { bad(P.pack + ': no built bundle — run node netlify/build-questions.js first'); continue; }
  const all = JSON.parse(fs.readFileSync(f, 'utf8'));
  const texts = all.filter(q => q && q.type === 'errorhunt');

  check(texts.length === TEXTS_PER_PACK, P.pack + ': ' + TEXTS_PER_PACK + ' texts', 'got ' + texts.length);
  check(texts.every(q => q.chapterId === P.chapter), P.pack + ': every text is in ' + P.chapter);
  check(new Set(texts.map(q => q.id)).size === texts.length, P.pack + ': ids are unique');
  check(texts.every(q => q.subsection === 'chasse_erreurs'), P.pack + ": every text is tagged 'chasse_erreurs'");
  check(texts.every(q => q.maxChecks === 3), P.pack + ': every text caps Vérifier at 3');

  let wrongCount = 0, noStop = 0, noCap = 0, dbl = 0, lower = 0, selfFix = 0,
      leak = 0, short = 0, long = 0, badKind = 0, misplaced = 0, emptyWord = 0,
      punct = 0;
  const KNOWN = new Set(['maj', 'min', 'pt', 'vrg', 'acc', 'pl', 'sg', 'vb', 'pp', 'hom', 'ort', 'det', 'tps']);

  for (const q of texts) {
    totalTexts++; totalErrors += q.errors;
    if (q.errors !== P.errors) wrongCount++;
    if (q.words.length < P.minWords) short++;
    if (q.words.length > P.maxWords) long++;
    if (/\s{2,}/.test(q.correct)) dbl++;
    if (!/[.!?]["»)]?$/.test(q.correct)) noStop++;
    if (!/^[A-ZÀÂÉÈÊÎÔÙÇ]/.test(q.correct)) noCap++;
    if ((q.correct.match(/[.!?]\s+[a-zà-ÿ]/g) || []).length) lower++;
    if (q.words.some(w => !w)) emptyWord++;

    q.errKind.forEach(k => {
      kinds.set(k, (kinds.get(k) || 0) + 1);
      if (!KNOWN.has(k)) badKind++;
      if (k === 'pt' || k === 'vrg') punct++;
    });
    q.errAt.forEach((wi, k) => {
      if (q.words[wi] === q.errFix[k]) selfFix++;
      if (wi < 0 || wi >= q.words.length) misplaced++;
    });
    // ⚠ A title carrying the CORRECTION of an error hands that mark away on the
    //   list screen, before the text is even opened. 3+ letters only: a French
    //   title always opens with a capital, so a title beginning "Le" cannot say
    //   WHICH sentence inside is missing one. A proper noun is the real leak,
    //   and 10 of the first 20 titles written here tripped exactly this.
    const leaked = q.errFix.map(strip).filter(w => w.length >= 3)
      .find(w => new RegExp('(^|[^A-Za-zÀ-ÿ])' + esc(w) + '([^A-Za-zÀ-ÿ]|$)', 'i').test(q.title));
    if (leaked) { leak++; note(q.id + ': title "' + q.title + '" contains "' + leaked + '"'); }

    // ⚠ An accent or spelling error whose identical twin sits elsewhere in the
    //   same text UNMARKED means one of the two was missed. Positional errors
    //   are exempt: "le" opening a sentence is wrong while "le" inside one is
    //   right, and telling those apart is the entire skill being practised.
    q.errAt.forEach((wi, k) => {
      if (q.errKind[k] !== 'acc' && q.errKind[k] !== 'ort') return;
      q.words.forEach((w, oi) => {
        if (oi !== wi && w === q.words[wi] && !q.errAt.includes(oi)) {
          misplaced++; note(q.id + ': unmarked twin of "' + w + '"');
        }
      });
    });
  }

  check(wrongCount === 0, P.pack + ': every text carries exactly ' + P.errors + ' errors', wrongCount + ' did not');
  check(short === 0 && long === 0, P.pack + ': every text is ' + P.minWords + '-' + P.maxWords + ' words', short + ' short, ' + long + ' long');
  check(selfFix === 0, P.pack + ': no error corrects to itself', selfFix + ' did');
  check(emptyWord === 0, P.pack + ': no empty word token', emptyWord + ' found');
  check(badKind === 0, P.pack + ': every error kind is in the rule table', badKind + ' unknown');
  // ⚠ WORDS ONLY. A missing mark has no word of its own, so the child had to be
  //   told to click the word BEFORE it - and the example that instruction named
  //   sits, correct and clickable, inside 10 of these 60 texts. Every planted
  //   error is now a word; the punctuation in the passage is simply right.
  check(punct === 0, P.pack + ': no error is a punctuation error (pt/vrg)', punct + ' found');
  check(misplaced === 0, P.pack + ': every error index lands on a word, with no unmarked twin', misplaced + ' problems');
  check(dbl === 0, P.pack + ': no corrected text has a doubled space', dbl + ' did');
  check(noStop === 0, P.pack + ': every corrected text ends on a full stop', noStop + ' did not');
  check(noCap === 0, P.pack + ': every corrected text opens with a capital', noCap + ' did not');
  check(lower === 0, P.pack + ': no corrected text starts a sentence in lower case', lower + ' did');
  check(leak === 0, P.pack + ': no title contains one of its own answers', leak + ' did');
}

// ── 4. The chapter registration ────────────────────────────────────────────
{
  console.log('\n— the chapters —');
  const idx = fs.readFileSync(path.join(ROOT, 'subjects', '_index.js'), 'utf8');
  for (const P of PACKS) {
    const m = new RegExp('"id":"' + P.chapter + '"[^}]*').exec(idx);
    check(!!m, P.chapter + ' is in the generated subject index');
    if (m) {
      check(/"enrichment":true/.test(m[0]), P.chapter + ' is a bonus chapter');
      check(/"examWeight":0/.test(m[0]), P.chapter + ' carries examWeight 0');
    }
  }
  const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  check(/'\/engine\/errorhunt\.js'/.test(sw), 'engine/errorhunt.js is pre-cached by the service worker');
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  check(/<script src="engine\/errorhunt\.js">/.test(html), 'index.html loads engine/errorhunt.js');
  check(/id="screen-hunt-list"/.test(html) && /id="screen-hunt-play"/.test(html),
    'both Chasse aux Erreurs screens exist');
  const app = fs.readFileSync(path.join(ROOT, 'engine/app.js'), 'utf8');
  check(/ErrorHunt\.isHuntChapter\(chapterId\) && ErrorHunt\.open\(chapterId\)/.test(app),
    'startChapterDirect() hands these chapters to ErrorHunt');
  const store = fs.readFileSync(path.join(ROOT, 'engine/store.js'), 'utf8');
  check(/hunt:\s*\{\}/.test(store), 'Store._defaultStudent() seeds DB.hunt, so existing children backfill');
}

console.log('\n' + totalTexts + ' texts, ' + totalErrors + ' planted errors');
console.log('kinds: ' + [...kinds].sort((a, b) => b[1] - a[1]).map(([k, n]) => k + ' ' + n).join(', '));
console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
