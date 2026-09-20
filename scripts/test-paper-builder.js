'use strict';
// PAPER BUILDER — the adult test-paper generator on the parent and teacher screens.
//
// ⚠ IT EXECUTES THE MODULE, not just greps it. The French Ninja bank shipped a
//   ReferenceError past 1,599 source-text checks because a regex cannot tell a
//   defined identifier from an invented one. Same lesson applied here from the
//   start: the form is rendered, the checkboxes are driven, and generate() is run
//   against a stubbed generatePrintablePaper() so the OPTIONS it hands over are
//   asserted rather than assumed.
//
// Run: node scripts/test-paper-builder.js
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

let checks = 0, fails = 0;
const ok = (label, cond, extra) => {
  checks++;
  if (!cond) { fails++; console.log('  FAIL  ' + label + (extra ? '\n          ' + extra : '')); }
};

const app = read('engine/app.js');
const index = read('index.html');
const sw = read('sw.js');
const css = read('style.css');
const teacher = read('engine/teacher.js');

// ── 1. ONE generator, parameterised — never a second copy ──────────────────
// ⚠ generatePrintablePaper() carries about a dozen measured rules. A second copy
//   for the adult surfaces would rot against it, and the failure mode is a
//   printed sheet a child cannot answer.
ok('generatePrintablePaper accepts options', /function generatePrintablePaper\(opts\)/.test(app));
ok('there is exactly one paper generator',
  (app.match(/function generatePrintablePaper\s*\(/g) || []).length === 1);
// ⚠ Checked by the things only a PAPER BUILDER would contain — a print window, the
//   MCQ-options decision, the watermark. The first version matched /Section A/,
//   which hit the form's own "Section A questions" LABEL and reported the builder
//   as building a paper it does not build.
// ⚠ COMMENTS STRIPPED FIRST. The builder's own header explains what
//   generatePrintablePaper() owns and names _printNeedsOptions() while doing so, so
//   a check over the raw file failed on its own documentation.
ok('the paper builder does not build its own paper',
  !/window\.open|_printNeedsOptions|paperWatermark/.test(
    read('engine/paper_builder.js').replace(/^\s*\/\/.*$/gm, '')),
  'the builder must only hand options to app.js');

// The child's path must still work with no arguments.
ok("the child's exam screen still calls it with no arguments",
  /generatePrintablePaper\(\);/.test(app));

// Every option the builder sends must be one the generator reads.
const builder = read('engine/paper_builder.js');
const sent = [...builder.matchAll(/^\s{8}([a-zA-Z]+):/gm)].map((m) => m[1]);
for (const key of ['packId', 'chapterIds', 'difficulties', 'sectionACount', 'sectionBCount', 'ignoreChildLocks']) {
  ok(`the generator reads o.${key}`, new RegExp('o\\.' + key + '\\b').test(app));
  ok(`the builder sends ${key}`, sent.includes(key) || new RegExp(key + ':').test(builder));
}

// ── 2. the rules the parameterisation must not have broken ────────────────
const gen = (() => {
  const at = app.indexOf('function generatePrintablePaper(opts)');
  const rest = app.slice(at);
  const end = rest.search(/\nfunction [a-zA-Z_]/);
  return rest.slice(0, end > 0 ? end : 40000);
})();
// ⚠ isPoolQuestion() was once missing here and two in five questions on a Grade 9
//   maths paper printed blank, because raw `task` rows have no question text.
ok('the pool still filters through isPoolQuestion()', /isPoolQuestion\(q\)/.test(gen));
// ⚠ Cloze is admitted HERE and nowhere else in the codebase. It must stay.
ok('the cloze pool is still built outside isPoolQuestion()', /q\.type === 'cloze'/.test(gen));
ok('_printNeedsOptions still decides which MCQs keep their letters',
  /_printNeedsOptions\(/.test(gen));
ok('the watermark is still applied', /paperWatermark|_paperWatermarkCSS/.test(gen));
// ⚠ The footer disclaimers exist so a printed sheet cannot pass for an MIE
//   document. They are not decoration.
// ⚠ Whitespace-tolerant: the sentence wraps mid-phrase inside the template
//   literal ("and not\n  an MIE or Ministry..."), so a literal-space regex misses
//   a disclaimer that is present.
ok('the footer disclaimer survives', /not\s+an MIE or Ministry/.test(gen));
ok('the answer key is still a separate document', /openAnswerKey|ANSWER_KEY_HTML/.test(gen));

// ⚠ A child printing their own paper stays bound by the parent's locks. Only an
//   adult surface passing ignoreChildLocks is exempt, and that must not leak into
//   the default.
ok('locks default to the child restrictions', /o\.ignoreChildLocks \? new Set\(\) : new Set\(DB\.restrictions/.test(gen));
ok('paper length is clamped, not trusted', /_clamp\(o\.sectionACount/.test(gen));
ok('an explicit difficulty set is honoured', /_diffSet/.test(gen) && /_diffOk\(/.test(gen));

// ── 3. wired into BOTH surfaces ───────────────────────────────────────────
ok('index.html loads engine/paper_builder.js',
  /<script src="engine\/paper_builder\.js"><\/script>/.test(index));
const shell = (sw.match(/const SHELL_FILES = \[([\s\S]*?)\n\];/) || [, ''])[1];
ok('sw.js precaches the module', /'\/engine\/paper_builder\.js'/.test(shell));

ok('the parent panel is registered', /_PD_PANELS = \[[^\]]*'papers'/.test(app));
ok('the parent panel renders the builder', /PaperBuilder\.render\('pd-papers-host', 'parent'\)/.test(app));
ok('the parent tab button exists', /id="pd-tab-papers"/.test(index));
ok('the teacher tab is registered', /TOOL_TABS = \[[^\]]*'papers'/.test(teacher));
ok('the teacher panel renders the builder', /PaperBuilder\.render\('tc-papers-host', 'teacher'\)/.test(teacher));
ok('the teacher tab button exists', /class="ta-tab" data-tab="papers"/.test(index));

// ⚠ A panel that is not INSIDE a .screen is never hidden by anything —
//   showScreen() toggles .hidden on .screen elements only. Both hosts must sit in
//   their own screen or they bleed over every other screen in the app.
{
  const screens = [...index.matchAll(/id="(screen-[a-z0-9-]+)"/g)].map((m) => ({ id: m[1], at: m.index }));
  const owner = (pos) => { let cur = null; for (const s of screens) { if (s.at < pos) cur = s; else break; } return cur; };
  ok('pd-papers-host is inside #screen-parent',
    owner(index.indexOf('id="pd-papers-host"'))?.id === 'screen-parent');
  ok('tc-papers-host is inside #screen-teacher',
    owner(index.indexOf('id="tc-papers-host"'))?.id === 'screen-teacher');
}
// ⚠ The teacher panel is hidden by the .ta-tab-content[data-tab] selector.
ok('the teacher panel carries ta-tab-content and its data-tab',
  /<div class="ta-tab-content hidden" data-tab="papers">/.test(index));

// ── 4. styles exist, because the markup is injected ───────────────────────
// ⚠ The Tailwind Play CDN only generates rules for classes present at its INITIAL
//   scan, so innerHTML markup gets the class and no rule. These must be real CSS.
for (const cls of ['.pb-wrap', '.pb-check', '.pb-go', '.pb-status']) {
  ok('style.css defines ' + cls, new RegExp('\\' + cls + '\\s*[,{]').test(css));
}
ok('tick rows are at least 44px tall', /\.pb-check \{[^}]*min-height:44px/.test(css));

// ── 5. RUN IT ─────────────────────────────────────────────────────────────
// ⚠ generate() is async, so this section must AWAIT it. The first version used a
//   busy loop to "drain microtasks", which drains nothing at all — every assertion
//   about the options ran before generate() had reached the generator, and read as
//   a product bug.
async function runIt() {
  const els = new Map();
  const mk = (id) => ({
    id, innerHTML: '', textContent: '', className: '', value: '', disabled: false,
    style: {}, dataset: {},
    classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
    querySelectorAll: () => [], querySelector: () => null,
    setAttribute() {}, getAttribute: () => null, appendChild() {}, remove() {}, focus() {},
  });
  const el = (id) => { if (!els.has(id)) els.set(id, mk(id)); return els.get(id); };

  const PACKS = [
    { id: 'grade6-maths', grade: 6, name: 'Mathematics', subject: 'Maths',
      chapters: [{ id: 'g6m-a', name: 'Fractions' }, { id: 'g6m-b', name: 'Decimals' }, { id: 'g6m-c', name: 'Area', enrichment: true }] },
    { id: 'grade6-english', grade: 6, name: 'English', subject: 'English',
      chapters: [{ id: 'g6e-a', name: 'Verbs' }, { id: 'g6e-b', name: 'Reading' }] },
    { id: 'grade4-maths', grade: 4, name: 'Mathematics', subject: 'Maths',
      chapters: [{ id: 'g4m-a', name: 'Place value' }] },
    { id: 'grade2-ict', grade: 2, name: 'ICT', subject: 'ICT', comingSoon: true, chapters: [{ id: 'x', name: 'x' }] },
  ];
  // A pool big enough for a standard maths paper (20 + 15) on one chapter.
  const QS = [];
  for (let i = 0; i < 40; i++) QS.push({ id: 'q' + i, chapterId: 'g6m-a', difficulty: (i % 4) + 1, question: 'Q', type: 'mcq' });

  let lastOpts = null, generateCalls = 0;
  const sandbox = {
    console: { log() {}, warn() {}, error() {} },
    document: { getElementById: el, createElement: () => mk('_t'), querySelectorAll: () => [], addEventListener() {} },
    SUBJECT_PACKS: PACKS,
    STATIC_QUESTIONS: QS,
    isPoolQuestion: (q) => !!(q && q.question),
    PackLoader: { ensure: () => Promise.resolve() },
    QuestionLoader: { loadSubject: () => Promise.resolve() },
    _planAllowsFeature: () => true,
    _showFeatureModal() {},
    generatePrintablePaper: (o) => { generateCalls++; lastOpts = o; },
    Promise, Number, Math, Array, Object, Set, String, JSON, setTimeout,
  };
  sandbox.window = sandbox; sandbox.globalThis = sandbox;
  const ctx = vm.createContext(sandbox);

  let loadErr = null;
  try { vm.runInContext(builder, ctx, { filename: 'engine/paper_builder.js' }); }
  catch (e) { loadErr = e.message; }
  ok('paper_builder.js loads without throwing', !loadErr, loadErr);

  // ⚠ PaperBuilder is a top-level const in a classic script: a global LEXICAL
  //   binding, never a property of globalThis. Read it by BARE IDENTIFIER.
  const PB = loadErr ? null : vm.runInContext('PaperBuilder', ctx);
  ok('PaperBuilder is defined', !!PB);

  if (PB) {
    let renderErr = null;
    try { PB.render('host', 'parent'); } catch (e) { renderErr = e.constructor.name + ': ' + e.message; }
    ok('render() runs without throwing', !renderErr, renderErr);

    const html = el('host').innerHTML;
    ok('the form renders a grade select', html.includes('id="pb-grade"'));
    ok('the form renders a subject select', html.includes('id="pb-subject"'));
    ok('the form renders the four difficulty checkboxes',
      (html.match(/PaperBuilder\.toggleDiff\(/g) || []).length === 4);
    ok('the form renders a generate button', html.includes('PaperBuilder.generate()'));

    // ⚠ comingSoon packs must not be offered: this list is parent- and
    //   teacher-facing, and only admin authoring surfaces show them.
    ok('a comingSoon pack is not offered', !html.includes('grade2-ict'));

    const d0 = PB._debug();
    ok('it defaults to the lowest live grade', d0.grade === 2 || d0.grade === 4, 'got ' + d0.grade);
    ok('all four levels start ticked', d0.diffs.length === 4);

    // Drive the form the way an adult would.
    PB.setGrade(6);
    ok('changing grade picks a subject in that grade',
      ['grade6-maths', 'grade6-english'].includes(PB._debug().packId), PB._debug().packId);
    PB.setPack('grade6-maths');
    ok('choosing a subject ticks all its chapters by default',
      PB._debug().chapters.length === 3, JSON.stringify(PB._debug().chapters));
    PB.allChapters(false);
    ok('Clear unticks every chapter', PB._debug().chapters.length === 0);
    PB.toggleChapter('g6m-a', true);
    ok('ticking one chapter selects only it', PB._debug().chapters.join() === 'g6m-a');
    PB.toggleDiff(4, false);
    ok('unticking a level removes it', !PB._debug().diffs.includes(4));

    // ⚠ Refuse rather than print a paper with headings and nothing under them.
    PB._set({ diffs: new Set() });
    await PB.generate();
    ok('generate refuses with no difficulty ticked', generateCalls === 0,
      'it called the generator anyway');
    ok('and says why', /difficulty/i.test(el('pb-status').textContent), el('pb-status').textContent);

    PB._set({ diffs: new Set([1, 2, 3, 4]), chapters: new Set() });
    await PB.generate();
    ok('generate refuses with no chapter ticked', generateCalls === 0);

    // A thin selection must be refused with a count, not silently printed short.
    PB._set({ chapters: new Set(['g6m-b']) });   // no questions on that chapter
    await PB.generate();
    ok('generate refuses a pool too thin for the paper', generateCalls === 0);
    ok('and reports how many matched', /Only \d+ question/.test(el('pb-status').textContent),
      el('pb-status').textContent);

    // The happy path, and the options handed over.
    PB._set({ chapters: new Set(['g6m-a']), diffs: new Set([1, 2, 3, 4]), secA: null, secB: null });
    await PB.generate();
    ok('generate builds the paper when the pool is sufficient', generateCalls === 1,
      'status: ' + el('pb-status').textContent);
    // ⚠ packIds for BOTH modes, holding one id in single-subject mode. The builder
    //   stopped sending a bare packId when mixed papers arrived; the generator still
    //   accepts packId for any other caller.
    ok('it passes the chosen pack', lastOpts && lastOpts.packIds.join() === 'grade6-maths',
      JSON.stringify(lastOpts && lastOpts.packIds));
    ok('it passes the chosen chapters', lastOpts && lastOpts.chapterIds.join() === 'g6m-a');
    ok('it passes the chosen difficulties', lastOpts && lastOpts.difficulties.length === 4);
    // ⚠ An adult paper is not bound by one pupil's parental locks — but this must
    //   never be the default, which the generator-side check above covers.
    ok('it passes ignoreChildLocks', lastOpts && lastOpts.ignoreChildLocks === true);

      // ── mixed-subject mode ────────────────────────────────────────────────
    // ⚠ Supported but warned about. The warning is the feature as much as the
    //   capability is, so its presence is asserted — and asserted while the option
    //   is still OFF, because a caution that only appears after you opt in is
    //   advice that arrives too late to act on.
    sandbox._planAllowsFeature = () => true;
    PB.setMixed(false);
    PB.render('host', 'parent');
    const offHtml = el('host').innerHTML;
    ok('the mix-subjects checkbox is offered', offHtml.includes('PaperBuilder.setMixed('));
    ok('the not-recommended warning shows BEFORE opting in', /Not recommended/.test(offHtml));
    ok('the warning says a real paper is one subject',
      /one\s+subject with one mark scheme/.test(offHtml));
    ok('single mode offers a subject dropdown', offHtml.includes('id="pb-subject"'));

    PB.setMixed(true);
    const onHtml = el('host').innerHTML;
    ok('mixed mode replaces the dropdown with checkboxes',
      !onHtml.includes('id="pb-subject"') && /togglePack\(/.test(onHtml));
    ok('turning it on keeps the subject already chosen', PB._debug().packIds.length === 1);

    PB.togglePack('grade6-english', true);
    const dm = PB._debug();
    ok('two subjects can be ticked', dm.packIds.length === 2, JSON.stringify(dm.packIds));
    // ⚠ Chapter ids are unique across packs, so the union is safe — but the label
    //   must name the subject or two chapters called "Reading" are indistinguishable.
    ok('chapters span every ticked subject', dm.chapters.length === 5, dm.chapters.length + ' chapters');
    ok('each chapter says which subject it is from',
      (el('pb-chapters').innerHTML.match(/pb-inpack/g) || []).length === 5);

    generateCalls = 0;
    PB._set({ chapters: new Set(['g6m-a', 'g6e-a']), diffs: new Set([1, 2, 3, 4]), secA: 5, secB: 0 });
    await PB.generate();
    ok('a mixed paper generates', generateCalls === 1, el('pb-status').textContent);
    ok('it sends every chosen pack as packIds',
      lastOpts && lastOpts.packIds.length === 2, JSON.stringify(lastOpts && lastOpts.packIds));
    ok('it sends no single packId', lastOpts && lastOpts.packId === undefined);

    PB.setMixed(false);
    ok('turning it off falls back to a single subject', PB._debug().packIds.length === 0);

  // The plan gate must hold even though the button is drawn.
    sandbox._planAllowsFeature = () => false;
    generateCalls = 0;
    await PB.generate();
    ok('the plan gate blocks generation', generateCalls === 0);
  }

}


// ── 6. END TO END: the printed sheet must name the pack it is FOR ──────────
// ⚠⚠ THE DEFECT THIS EXISTS FOR. The paper's heading comes from
//    _activeSubjectLabel(), which answers for whichever pack is open on screen. A
//    parent building a Grade 4 English paper while their child was loaded on Grade
//    6 Maths got the right questions under a heading reading "Grade 6 Mathematics".
//    A sheet whose title names a different exam is worse than one with no title.
// ⚠ This slices the REAL generator into a vm, the way test-printable-open-ended.js
//   does, because the section above stubs generatePrintablePaper() and a stub
//   cannot see anything the generator itself gets wrong. That is exactly how a TDZ
//   self-reference in the label shipped past 80 passing checks here and was caught
//   only by the two print tests.
{
  // ⚠ A REGION, not just the function. The generator leans on siblings declared
  //   around it — _printNeedsOptions, _printClozeBlock, _PRINT_MCQ_KEEP — so slicing
  //   from `function generatePrintablePaper` to the next top-level `function` both
  //   cuts the body at the first nested declaration ("Unexpected end of input") and
  //   omits the helpers. These are the same boundaries
  //   test-printable-open-ended.js uses, for the same reason.
  const slice = (() => {
    const a = app.indexOf('// ── Comprehension passages on a printed paper');
    const b = app.indexOf('function startExamTimer()');
    return (a >= 0 && b > a) ? app.slice(a, b) : '';
  })();
  ok('the generator region was located in app.js', slice.includes('function generatePrintablePaper(opts)'));

  const mkBank = (chapterId, n) => Array.from({ length: n }, (_, i) => ({
    id: chapterId + '-q' + i, chapterId, difficulty: (i % 4) + 1, type: 'numeric',
    question: 'What is ' + i + ' + 1?', answer: String(i + 1),
  }));

  let opened = '';
  const ctx = vm.createContext({
    console: { log() {}, warn() {} },
    CHAPTERS: [{ id: 'g6m-a', name: 'Fractions' }],
    STATIC_QUESTIONS: [...mkBank('g4e-a', 80), ...mkBank('g6m-a', 80)],
    // The child on screen is Grade 6 Maths…
    ACTIVE_PACK: { id: 'grade6-maths', subject: 'Maths', grade: 6, name: 'Mathematics' },
    ACTIVE_STUDENT_ID: 'test-child',
    DB: { restrictions: {} },
    SUBJECT_PACKS: [
      { id: 'grade6-maths', subject: 'Maths', grade: 6, name: 'Mathematics', chapters: [{ id: 'g6m-a', name: 'Fractions' }] },
      { id: 'grade4-english', subject: 'English', grade: 4, name: 'English', chapters: [{ id: 'g4e-a', name: 'Reading' }] },
    ],
    isPoolQuestion: (q) => q && q.type !== 'cloze' && q.type !== 'errorhunt' && q.type !== 'task',
    shuffle: (a) => [...a],
    _prettyMath: (s) => String(s == null ? '' : s),
    _symLineStaticSvg: () => '<svg></svg>',
    // …and this is what the OLD code used for the heading, whatever was asked for.
    _activeSubjectLabel: () => ({ grade: 6, name: 'Mathematics' }),
    _paperWatermarkCSS: require(path.join(ROOT, 'engine', 'helpers.js'))._paperWatermarkCSS,
    toast: () => {},
    localStorage: { getItem: () => null, setItem() {} },
    window: { open: () => ({ document: { write: (h) => { opened += h; }, close() {} } }) },
  });
  let sliceErr = null;
  try { vm.runInContext(slice, ctx); } catch (e) { sliceErr = e.message; }
  ok('the generator slice loads into a vm', !sliceErr, sliceErr);

  const titleOf = (h) => (h.match(/<title>[^<]*<\/title>/) || [''])[0];

  if (!sliceErr) {
    // ── the child's path: heading follows the active pack, unchanged ──
    opened = '';
    let childErr = null;
    try { ctx.generatePrintablePaper(); } catch (e) { childErr = e.constructor.name + ': ' + e.message; }
    ok("the child's paper builds with no arguments", !childErr, childErr);
    ok("the child's paper is headed by the active pack", /Grade 6 Mathematics/.test(opened), titleOf(opened));

    // ── an adult building a DIFFERENT pack ──
    opened = '';
    let adultErr = null;
    try {
      ctx.generatePrintablePaper({
        packIds: ['grade4-english'], chapterIds: ['g4e-a'],
        difficulties: [1, 2, 3, 4], sectionACount: 10, sectionBCount: 5, ignoreChildLocks: true,
      });
    } catch (e) { adultErr = e.constructor.name + ': ' + e.message; }
    ok('an adult paper for another pack builds', !adultErr, adultErr);
    ok('the adult paper is headed by the CHOSEN pack, not the active one',
      /Grade 4 English/.test(opened) && !/Grade 6 Mathematics/.test(opened), titleOf(opened));

    // ── a mixed paper names both subjects ──
    opened = '';
    let mixErr = null;
    try {
      ctx.generatePrintablePaper({
        packIds: ['grade4-english', 'grade6-maths'],
        chapterIds: ['g4e-a', 'g6m-a'], difficulties: [1, 2, 3, 4],
        sectionACount: 10, sectionBCount: 5, ignoreChildLocks: true,
      });
    } catch (e) { mixErr = e.constructor.name + ': ' + e.message; }
    ok('a mixed-subject paper builds', !mixErr, mixErr);
    ok('a mixed paper names both subjects in its heading',
      /English/.test(opened) && /Mathematics/.test(opened), titleOf(opened));
    // ⚠ Every guarantee of the single-subject sheet must survive a mixed one — the
    //   disclaimer especially, since a mixed sheet resembles a real paper even less
    //   and must still not be able to pass for one.
    ok('a mixed paper still carries the footer disclaimer', /not\s+an MIE or Ministry/.test(opened));
    ok('a mixed paper still carries its answer key', /ANSWER_KEY_HTML/.test(opened));
  }
}

runIt().then(() => {
console.log(fails
  ? `\n  ${checks - fails}/${checks} paper-builder checks passed, ${fails} FAILED`
  : `\n  ${checks}/${checks} paper-builder checks passed`);
process.exit(fails ? 1 : 0);
});
