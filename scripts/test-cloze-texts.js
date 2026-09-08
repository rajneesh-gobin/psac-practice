'use strict';
// Guards the three "Textes à Trous" bonus chapters (grades 4/5/6) — the PSAC
// French Q6 drill, 10 marks on every real paper.
//
// ⚠ THE THREE PACKS ARE NOT THE SAME SHAPE, because the real papers are not:
//     grades 4 and 5 — ONE part: 10 gaps, one bank of 11, one word spare.
//     grade 6        — TWO parts: 6A is 5 gaps with a bank of 6 and one spare,
//                      6B is 5 more gaps of the same story with NO bank at all.
//   Grade 6 used to be built to the Grade 5 shape, so a child sitting the paper
//   had drilled 200 gaps that all handed over the word and had never once met
//   the half of Q6 that does not. Asserting one shape for all three packs is
//   what let that stand — so this file asserts each pack's own.
//
// Four classes of defect, all of which would ship silently:
//   1. a malformed text (markers out of order, an answer missing from the bank,
//      two spare words) — the child gets an exercise that cannot be completed
//   2. a cloze item leaking into a practice or exam pool — nothing downstream
//      knows how to draw one, so it would fall through to the numeric branch and
//      put a NUMBER PAD under a French passage
//   3. the factory dropping a field between the browser and the Lambdas — this
//      already happened once here: makeCloze was defined in all three server
//      copies but missing from their exported context list, so every text was
//      silently absent from the built bundle while the source looked correct
//   4. a part-B gap with no accepted answer, or a title that hands one over
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { loadSubject } = require('../netlify/lib/questions-sandbox');

const root = path.resolve(__dirname, '..');
let pass = 0, fail = 0;
const bad = [];
const check = (ok, label, detail) => {
  if (ok) { pass++; return; }
  fail++;
  bad.push(`${label}${detail ? ` — ${detail}` : ''}`);
};

// Word boundaries, not substrings: « hérisson » legitimately contains « son »,
// and « oiseau » contains « eau ». A plain includes() reported 31 false leaks.
const hasWord = (haystack, word) =>
  new RegExp('(^|[^A-Za-zÀ-ÿ-])' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^A-Za-zÀ-ÿ-]|$)', 'i')
    .test(String(haystack));

// The grammar words Q6 is mostly made of. Used for one thing only: a grammar
// word may repeat inside its own passage (the real papers do it), a content
// word may not.
const GRAMMAR = new Set(('a à au aux ce ces cet cette dans de des du en et il ils elle elles eux la le les leur leurs lui ma mais me mes moi mon ne ni nous on ou où par pour que qui quoi sa se ses si son sous sur ta te tes toi ton tu un une vous y autour devant derrière avec sans chez avant après pendant depuis contre entre vers jusque très trop peu plus moins bien mal tard tôt ici là toujours jamais souvent encore déjà aussi alors donc car ainsi puis tout tous toute toutes chaque quand lorsque comme rien personne aucun dont dès est était').split(' '));

const PACKS = [
  { grade: 4, id: 'grade4-french', chapter: 'g4fr-textes-trous', file: 'subjects/grade4-french/questions/ch12_g4_textes_trous.js', prefix: 'g4fr-clz-', gapsA: 10, gapsB: 0, bank: 11 },
  { grade: 5, id: 'grade5-french', chapter: 'g5fr-textes-trous', file: 'subjects/grade5-french/questions/ch14_textes_trous.js', prefix: 'g5fr-clz-', gapsA: 10, gapsB: 0, bank: 11 },
  { grade: 6, id: 'grade6-french', chapter: 'g6fr-textes-trous', file: 'subjects/grade6-french/questions/ch12_g6_textes_trous.js', prefix: 'g6fr-clz-', gapsA: 5, gapsB: 5, bank: 6 },
];

// ── 1. Content shape ──────────────────────────────────────────────────────
for (const pack of PACKS) {
  const two = pack.gapsB > 0;
  const totalGaps = pack.gapsA + pack.gapsB;

  let manifest;
  const ctx = vm.createContext({ registerSubject: p => { manifest = p; }, window: {}, console });
  vm.runInContext(fs.readFileSync(path.join(root, 'subjects', pack.id, '_manifest.js'), 'utf8'), ctx);

  const chapter = (manifest.chapters || []).find(c => c.id === pack.chapter);
  check(!!chapter, `${pack.id}: manifest declares ${pack.chapter}`);
  check(!!chapter && chapter.enrichment === true, `${pack.id}: ${pack.chapter} is a ✨ BONUS chapter`);
  check(!!chapter && chapter.examWeight === 0, `${pack.id}: ${pack.chapter} carries examWeight 0`);
  check(!!chapter && Array.isArray(chapter.notes) && chapter.notes.length >= 6,
    `${pack.id}: ${pack.chapter} carries method notes`, `${(chapter && chapter.notes || []).length}`);

  const declared = ((manifest.syllabus || {})[pack.chapter] || {}).subsections || [];
  check(declared.length === 1 && declared[0].id === 'texte_a_trous',
    `${pack.id}: syllabus declares the texte_a_trous subsection`, JSON.stringify(declared.map(s => s.id)));

  // ⚠ Grade 6's method notes must actually teach the two-part shape. A chapter
  // whose coaching is all "sort the word table" is coaching half the marks.
  if (two) {
    const notes = (chapter && chapter.notes || []).join(' ');
    check(/6A/.test(notes) && /6B/.test(notes), `${pack.id}: the notes name 6A and 6B`);
    check(/sans liste|sans aucune liste/i.test(notes), `${pack.id}: the notes say part B has no word list`);
  }

  const texts = loadSubject(pack.id).filter(q => q.chapterId === pack.chapter);
  check(texts.length === 20, `${pack.id}: ${pack.chapter} holds 20 texts`, `${texts.length}`);

  let malformed = 0, badBank = 0, badSpare = 0, badNotes = 0, adjacent = 0, wrongType = 0, badId = 0;
  let leakInTitle = 0, badShape = 0, badAlts = 0, leakInText = 0;
  for (const q of texts) {
    if (q.type !== 'cloze') wrongType++;
    if (!String(q.id).startsWith(pack.prefix)) badId++;

    if (q.gapsA !== pack.gapsA || q.gapsB !== pack.gapsB || q.twoPart !== two) badShape++;
    if (q.gaps !== totalGaps || q.gapAnswers.length !== totalGaps) malformed++;
    if (q.notes.length !== totalGaps) badNotes++;

    // Markers run 1..gapsA in part A and then CONTINUE 6..10 in part B, so a
    // gap index means the same thing everywhere: in the passage, in gapAnswers,
    // in notes, and in the number a child reads on the screen.
    const mA = (String(q.text).match(/\{(\d+)\}/g) || []).map(m => Number(m.slice(1, -1)));
    const mB = (String(q.textB || '').match(/\{(\d+)\}/g) || []).map(m => Number(m.slice(1, -1)));
    const wantA = Array.from({ length: pack.gapsA }, (_, i) => i + 1);
    const wantB = Array.from({ length: pack.gapsB }, (_, i) => pack.gapsA + i + 1);
    if (JSON.stringify(mA) !== JSON.stringify(wantA)) malformed++;
    if (JSON.stringify(mB) !== JSON.stringify(wantB)) malformed++;

    // The bank serves part A ONLY. A part-B answer is typed and is deliberately
    // not in it — asserting otherwise is what would force part B back into
    // being a word-bank exercise.
    const ansA = q.gapAnswers.slice(0, pack.gapsA);
    if (q.bank.length !== pack.bank || new Set(q.bank).size !== pack.bank) badBank++;
    if (ansA.some(a => !q.bank.includes(a))) badBank++;
    if (new Set(ansA).size !== ansA.length) badBank++;
    if (q.bank.filter(w => !ansA.includes(w)).length !== 1) badSpare++;

    // Every gap carries at least one accepted answer; a part-B gap may carry
    // several, because « rentrer / retourner / revenir » are all correct.
    if (!Array.isArray(q.gapAlts) || q.gapAlts.length !== totalGaps) badAlts++;
    else if (q.gapAlts.some(a => !Array.isArray(a) || !a.length || a.some(w => !String(w).trim()))) badAlts++;
    else if (q.gapAlts.some((a, i) => a[0] !== q.gapAnswers[i])) badAlts++;

    // Two gaps with nothing between them leave no context to choose from.
    if (/\{\d+\}\s*\{\d+\}/.test(String(q.text) + ' ' + String(q.textB || ''))) adjacent++;
    // The visible prompt must not hand over the answers. ⚠ With 'le', 'la',
    // 'un' and 'à' now among the answers, this rules out most « Le … » titles.
    if (q.gapAnswers.some(a => hasWord(q.title, a))) leakInTitle++;
    // ...nor may the passage print a CONTENT answer in plain sight. A grammar
    // word repeating is fine and is what the real papers do — Alice's passage
    // carries « qui » while « qui » is also the answer to gap 10.
    const strip = s => String(s || '').replace(/\{\d+\}/g, ' ');
    for (let i = 0; i < totalGaps; i++) {
      const a = q.gapAnswers[i];
      if (a.length > 3 && !GRAMMAR.has(a.toLowerCase()) && hasWord(strip(i < pack.gapsA ? q.text : q.textB), a)) leakInText++;
    }
  }
  check(wrongType === 0, `${pack.id}: every item is type 'cloze'`, `${wrongType} affected`);
  check(badId === 0, `${pack.id}: ids carry the ${pack.prefix} prefix`, `${badId} affected`);
  check(badShape === 0, `${pack.id}: every text is ${two ? '5 banked + 5 typed gaps' : 'one part, 10 banked gaps'}`, `${badShape} affected`);
  check(malformed === 0, `${pack.id}: gap markers run 1..${totalGaps} in order across both parts`, `${malformed} affected`);
  check(badNotes === 0, `${pack.id}: every gap has an explanation note`, `${badNotes} affected`);
  check(badBank === 0, `${pack.id}: every part-A answer is in the bank, once`, `${badBank} affected`);
  check(badSpare === 0, `${pack.id}: exactly one spare word per text`, `${badSpare} affected`);
  check(badAlts === 0, `${pack.id}: every gap has at least one accepted answer, model first`, `${badAlts} affected`);
  check(adjacent === 0, `${pack.id}: no two gaps sit side by side`, `${adjacent} affected`);
  check(leakInTitle === 0, `${pack.id}: no title gives away one of its own answers`, `${leakInTitle} affected`);
  // ⚠ GRANDFATHERED for grades 4 and 5, deliberately. 19 of their one-part
  // passages print a content answer elsewhere in the same text (g4fr-clz-002
  // gap 1 is « chien » and the next sentence reads « Le chien a tout... »), and
  // so does the REAL 2025 hérisson paper, which repeats « doux ». So it is not
  // a rule the papers follow — it is a quality gap worth seeing, not a defect
  // worth a red suite. It IS asserted for the two-part pack, where the content
  // was written to it: a bank-less gap whose answer sits in plain sight two
  // lines up is a free mark.
  if (two) {
    check(leakInText === 0, `${pack.id}: no passage prints a content answer in plain sight`, `${leakInText} affected`);
  } else if (leakInText) {
    console.log(`  note  ${pack.id}: ${leakInText} passage(s) print a content answer in plain sight (grandfathered)`);
  }

  // ── 3. Fields survive the server sandbox AND the built bundle ──
  // ⚠ Reading the source is not a sufficient check here. `learnMore` and
  // `subsection` were each silently stripped at BUILD time for months while the
  // source read correctly. Grep the BUNDLE.
  const bundlePath = path.join(root, 'netlify/question-bundles', `${pack.id}.json`);
  if (fs.existsSync(bundlePath)) {
    const built = JSON.parse(fs.readFileSync(bundlePath, 'utf8')).filter(q => q.chapterId === pack.chapter);
    check(built.length === 20, `${pack.id}: 20 texts reach the BUILT bundle`, `${built.length}`);
    const complete = built.filter(q => Array.isArray(q.bank) && Array.isArray(q.gapAnswers)
      && Array.isArray(q.notes) && Array.isArray(q.gapAlts) && q.text && q.title
      && q.gaps === totalGaps && q.gapsA === pack.gapsA && q.gapsB === pack.gapsB && q.twoPart === two);
    check(complete.length === built.length,
      `${pack.id}: bank/gapAnswers/gapAlts/gapsA/gapsB/twoPart/text/title survive the build`,
      `${built.length - complete.length} lost fields`);
    if (two) {
      const withB = built.filter(q => (String(q.textB).match(/\{\d+\}/g) || []).length === pack.gapsB);
      check(withB.length === built.length, `${pack.id}: textB and its 5 markers survive the build`,
        `${built.length - withB.length} lost part B`);
    }
  } else {
    check(false, `${pack.id}: question bundle exists`, 'run netlify/build-questions.js first');
  }
}

// ── 2. The pool guard — the one that stops a number pad under a passage ───
for (const [pack, chapter, sibling] of [
  ['grade5-french', 'g5fr-textes-trous', 'fr-grammaire'],
  ['grade6-french', 'g6fr-textes-trous', 'g6fr-argumentation'],
]) {
  const ctx = vm.createContext({ console, window: {},
    DB: { restrictions: { lockedChapters: [], maxDifficulty: 4 } },
    CHAPTERS: [], _planAllowsChapter: () => true });
  vm.runInContext(fs.readFileSync(path.join(root, 'engine/helpers.js'), 'utf8'), ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'engine/questions_engine.js'), 'utf8'), ctx);
  ctx.__bank = loadSubject(pack);
  ctx.__chapters = [
    { id: chapter, name: 'Textes à Trous', enrichment: true, examWeight: 0 },
    { id: sibling, name: 'Autre', examWeight: 2 },
  ];
  ctx.__ch = chapter;
  const out = vm.runInContext(`
    STATIC_QUESTIONS.push(...__bank);
    CHAPTERS.push(...__chapters);
    const clozeIds = new Set(STATIC_QUESTIONS.filter(q => q.type === 'cloze').map(q => q.id));
    let leaked = 0;
    for (const d of [1,2,3,4]) for (const q of getQuestionsForChapter(__ch, d, 20)) if (clozeIds.has(q.id)) leaked++;
    for (const q of getMixedQuestions(__ch, 4, 20)) if (clozeIds.has(q.id)) leaked++;
    for (const q of getQuestionsForSubsection(__ch, 'texte_a_trous', 15)) if (clozeIds.has(q.id)) leaked++;
    // 20 papers, because assembleExamPaper shuffles and samples.
    for (let i = 0; i < 20; i++) for (const q of assembleExamPaper('full').questions) if (clozeIds.has(q.id)) leaked++;
    ({ cloze: clozeIds.size, leaked });
  `, ctx);
  check(out.cloze === 20, `the ${pack} pool source really holds the 20 cloze texts`, `${out.cloze}`);
  check(out.leaked === 0, `no ${pack} cloze item can be dealt into practice, subsection practice or an exam paper`,
    `${out.leaked} leaked`);
}

// ── 4. The four hand-copied factories must still agree ────────────────────
{
  const FILES = ['engine/helpers.js', 'netlify/functions/questions.js',
    'netlify/build-questions.js', 'netlify/lib/questions-sandbox.js'];
  const sample = {
    id: 'x', chapterId: 'c', difficulty: 4, subsection: 's', title: 'T',
    text: 'un {1} et {2} fin', bank: ['a', 'b', 'c'], answers: ['a', 'b'], notes: ['n1', 'n2'],
    textB: 'puis {3} et {4}', answersB: [['x', 'y'], 'z'], notesB: ['n3', 'n4'],
  };
  const out = FILES.map(f => {
    const src = fs.readFileSync(path.join(root, f), 'utf8');
    const i = src.indexOf('function makeCloze(');
    if (i < 0) return 'MISSING';
    const indent = src.slice(src.lastIndexOf('\n', i) + 1, i);
    const end = '\n' + indent + '}';
    const j = src.indexOf(end, i);
    const c = vm.createContext({});
    try {
      vm.runInContext(src.slice(i, j + end.length) + '\n;globalThis.__mk = makeCloze;', c);
      return JSON.stringify(c.__mk(sample));
    } catch (e) { return 'THREW: ' + e.message; }
  });
  check(out.every(o => o === out[0]), 'all four makeCloze copies return the identical object',
    FILES.filter((_, i) => out[i] !== out[0]).join(', '));
  const first = out[0].startsWith('{') ? JSON.parse(out[0]) : null;
  check(!!first && first.gaps === 4 && first.gapsA === 2 && first.gapsB === 2 && first.twoPart === true,
    'makeCloze counts part-A and part-B gaps separately');
  check(!!first && JSON.stringify(first.gapAlts) === JSON.stringify([['a'], ['b'], ['x', 'y'], ['z']]),
    'a part-B answer list survives as a list, model answer first');
  check(!!first && JSON.stringify(first.notes) === JSON.stringify(['n1', 'n2', 'n3', 'n4']),
    'notes from both parts are joined into one gap-indexed array');
  // A one-part text must come out exactly as it always did.
  const one = (() => {
    const src = fs.readFileSync(path.join(root, 'engine/helpers.js'), 'utf8');
    const i = src.indexOf('function makeCloze(');
    const j = src.indexOf('\n}', i);
    const c = vm.createContext({});
    vm.runInContext(src.slice(i, j + 2) + '\n;globalThis.__mk = makeCloze;', c);
    return c.__mk({ id: 'y', title: 'T', text: 'un {1} et {2} fin', bank: ['a', 'b', 'c'], answers: ['a', 'b'], notes: ['n', 'n'] });
  })();
  check(one.twoPart === false && one.gapsB === 0 && one.gaps === 2 && one.textB === '',
    'a one-part text is unchanged: twoPart false, gapsB 0, textB empty');
}

// ── The module wiring ─────────────────────────────────────────────────────
{
  const src = fs.readFileSync(path.join(root, 'engine/cloze.js'), 'utf8');
  for (const p of PACKS) check(src.includes(`'${p.chapter}'`), `engine/cloze.js claims ${p.chapter}`);
  check(/typeGap/.test(src) && /return \{[^}]*typeGap/.test(src.replace(/\r?\n/g, '')),
    'engine/cloze.js exports typeGap for the part-B inputs');
  // ⚠ Typing must not re-render: renderPlayer() rebuilds the host's innerHTML,
  // which destroys the input being typed into and drops the caret.
  const typeFn = src.slice(src.indexOf('function typeGap('), src.indexOf('function _syncProgress('));
  check(typeFn.length > 0 && !/renderPlayer\(\)/.test(typeFn),
    'typeGap() never calls renderPlayer() — that would kill the caret mid-word');
  check(/_syncProgress/.test(typeFn), 'typeGap() patches the progress line instead');
  // ⚠ A typed gap sized to its own answer prints the answer's length on screen.
  const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
  const inputRule = (css.match(/\.clz-input \{[^}]*\}/) || [''])[0];
  check(/width:\s*[\d.]+rem/.test(inputRule), 'every .clz-input has ONE fixed width, not one per answer', inputRule.slice(0, 80));
  check(/font-size:\s*1rem/.test(inputRule), '.clz-input is 16px — under that, iOS zooms in and never back out');
  check(!/\bsize=/.test(src), 'no size attribute on a gap input (it would leak the answer length)');
  check(/autocapitalize="off"/.test(src) && /spellcheck="false"/.test(src),
    'part-B inputs turn off autocorrect, autocapitalise and spellcheck');

  const app = fs.readFileSync(path.join(root, 'engine/app.js'), 'utf8');
  check(app.includes('ClozeText.isClozeChapter'), 'startChapterDirect() hands cloze chapters to ClozeText');
  // ⚠ The hook must sit AFTER the parent lock, or a locked chapter would open anyway.
  const hookAt = app.indexOf('ClozeText.isClozeChapter');
  const lockAt = app.indexOf("toast('🔒 This chapter is locked by your parent.'");
  const planAt = app.indexOf('_showChapterLockedModal(chapterId); return;');
  check(lockAt > 0 && hookAt > lockAt, 'the hook sits AFTER the parent chapter lock');
  check(planAt > 0 && hookAt > planAt, 'the hook sits AFTER the plan check');

  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  for (const id of ['screen-cloze-list', 'screen-cloze-play', 'cloze-list-body', 'cloze-play-body'])
    check(html.includes(`id="${id}"`), `index.html carries #${id}`);
  check(html.includes('engine/cloze.js'), 'index.html loads engine/cloze.js');
  // ⚠ cloze.js needs showScreen/recordAnswer/save from app.js.
  check(html.indexOf('engine/cloze.js') > html.indexOf('engine/app.js'), 'cloze.js loads AFTER app.js');

  const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  check(sw.includes("'/engine/cloze.js'"), 'sw.js pre-caches engine/cloze.js');

  const store = fs.readFileSync(path.join(root, 'engine/store.js'), 'utf8');
  check(/cloze:\s*\{\}/.test(store), 'Store._defaultStudent() seeds DB.cloze (so existing children backfill)');

  for (const cls of ['.clz-gap', '.clz-word', '.clz-bank', '.clz-item', '.clz-input', '.clz-tgap', '.clz-part-h'])
    check(css.includes(cls), `style.css defines ${cls}`);
  // ⚠ A transformed ancestor re-anchors position:fixed. The bank is sticky, never fixed.
  check(!/\.clz-bank\s*\{[^}]*position:\s*fixed/.test(css), '.clz-bank is sticky, not fixed');
  // Every new class needs a dark twin — #screen-cloze-play is a light sheet in
  // light mode and near-black in dark, and an input with one background is
  // unreadable in one of them.
  for (const cls of ['.clz-input', '.clz-lead', '.clz-part-h', '.clz-marks'])
    check(new RegExp('data-theme="dark"\\] ' + cls.replace('.', '\\.')).test(css),
      `style.css gives ${cls} a dark-theme twin`);
}

console.log(bad.length ? bad.map(b => `  ✗ ${b}`).join('\n') : '');
console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
