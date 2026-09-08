'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Loader parity, type validation and round-trip preservation for the
//  question importer.
//
//  ⚠ WHY THIS EXISTS. netlify/import-questions.js used to carry a private copy
//  of the VM sandbox holding only makeMCQ/makeNum/makeTF/makeMatch/
//  makeSymmetry. Six French source files threw "makeCloze is not defined" /
//  "makeText is not defined", were skipped with a warning, and the importer
//  uploaded 14,361 of the 14,726 questions the deployed app loads. The command
//  reported success. scripts/test-question-import.js proved the database
//  accounting was right and could not have caught it, because it never loads a
//  real source file.
//
//  Run: node scripts/test-question-import-parity.js
// ══════════════════════════════════════════════════════════════════════════

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const ROOT = path.resolve(__dirname, '..');
const sandbox = require(path.join(ROOT, 'netlify/lib/questions-sandbox'));
const { preflight, TYPE_RULES, SUPPORTED_TYPES, contentMatches, canonical } = require(path.join(ROOT, 'netlify/lib/question-import'));

let pass = 0, fail = 0;
const ck = (label, ok, detail) => {
  if (ok) { pass++; return; }
  fail++;
  console.log('  FAIL  ' + label + (detail ? '  [' + detail + ']' : ''));
};
const section = t => console.log('\n── ' + t + ' ──');

// ── 1. The importer must not own a question loader at all ─────────────────
section('one loader, not five');
{
  const src = fs.readFileSync(path.join(ROOT, 'netlify/import-questions.js'), 'utf8');
  ck('import-questions.js declares no factory of its own',
    !/function\s+make(MCQ|Num|TF|Match|Symmetry|Cloze|Text|Task)\s*\(/.test(src),
    (src.match(/function\s+make\w+/g) || []).join(', '));
  ck('…and builds no VM context of its own', !/vm\.createContext/.test(src));
  ck('…it loads through netlify/lib/questions-sandbox', /require\('\.\/lib\/questions-sandbox'\)/.test(src));

  // The three server copies of the factories are still expected to agree; that
  // is asserted by test-cloze-texts.js and test-french-text-answers.js. What is
  // asserted here is that the importer is not a FOURTH server copy.
  const sandboxSrc = fs.readFileSync(path.join(ROOT, 'netlify/lib/questions-sandbox.js'), 'utf8');
  // ⚠ Read the whole RETURN STATEMENT, not its first line. This export list
  // wraps, and the line-only form of this check reported a missing
  // window.PSAC_PDF_QUESTIONS that was one line further down — the export line
  // is exactly the half that ships, so a false reading here is expensive.
  const lines = sandboxSrc.split(/\r?\n/);
  const first = lines.findIndex(l => /return \{/.test(l) && /makeMCQ, makeNum/.test(l));
  const contextReturn = first < 0 ? '' : lines.slice(first, first + 4).join('\n');
  ck('the shared context exports makeText', /\bmakeText\b/.test(contextReturn));
  ck('the shared context exports makeCloze', /\bmakeCloze\b/.test(contextReturn));
  ck('the shared context exports makeTask', /\bmakeTask\b/.test(contextReturn));
  ck('the shared context supplies window.PSAC_PDF_QUESTIONS',
    /PSAC_PDF_QUESTIONS/.test(contextReturn), contextReturn.slice(0, 120));
}

// ── 2. Importer and build loader must agree, id for id ────────────────────
section('importer vs the loader that ships');
const corpus = sandbox.loadCorpus();
const pf = preflight(corpus);
{
  // The build's own loader, driven exactly as netlify/build-questions.js drives
  // it — a separate implementation, so agreement is evidence rather than a
  // tautology. It is required through a child context so its top-level writes
  // to netlify/question-bundles/ do not happen.
  const buildSrc = fs.readFileSync(path.join(ROOT, 'netlify/build-questions.js'), 'utf8');
  const start = buildSrc.indexOf('function _buildContext(');
  const end   = buildSrc.indexOf('\nconst PAPERS = []');
  ck('build-questions.js still exposes _buildContext', start > 0 && end > start);

  const helperStart = buildSrc.indexOf('function foldAnswer(');
  const harness = buildSrc.slice(helperStart, end) + `
    ;globalThis.__load = function (dir, files) {
      const buf = [], pdf = [];
      const ctx = _buildContext(buf);
      ctx.window = { PSAC_PDF_QUESTIONS: pdf };
      return { ctx, buf, pdf };
    };`;
  // _makeTask is required at build-questions.js module scope, above the slice
  // taken here, so it is supplied to the harness context directly.
  const ctx = vm.createContext({ require, console, globalThis: undefined,
    _makeTask: require(path.join(ROOT, 'engine/assessment.js')).makeTask });
  vm.runInContext(harness.replace('globalThis.__load', 'this.__load'), ctx);

  const buildIds = new Set(), buildPaperIds = new Set();
  const buildTypes = {};
  for (const pack of corpus.packs) {
    const state = ctx.__load();
    const vmCtx = vm.createContext(state.ctx);
    for (const f of fs.readdirSync(pack.dir).filter(n => n.endsWith('.js')).sort()) {
      try { new vm.Script(fs.readFileSync(path.join(pack.dir, f), 'utf8'), { filename: f }).runInContext(vmCtx); }
      catch (e) { ck('build loader: ' + pack.subjectId + '/' + f + ' loads', false, e.message); }
    }
    // ⚠ The builder expands multi-part tasks into practisable items right
    //   after loading a pack, and so does questions-sandbox.js. This harness
    //   drives _buildContext directly, so it has to take the same step or the
    //   two sides differ by exactly the projected items and this suite fails
    //   on a difference that is only about where the harness stops.
    const _extra = require(path.join(ROOT, 'engine/assessment.js')).expandTasks(state.buf);
    if (_extra.length) state.buf.push(..._extra);
    for (const q of state.buf) { buildIds.add(q.id); buildTypes[q.type] = (buildTypes[q.type] || 0) + 1; }
    for (const q of state.pdf) buildPaperIds.add(q.id);
  }

  const importIds = new Set(pf.rows.practice.map(r => r.id));
  const importPaperIds = new Set(pf.rows.papers.map(r => r.id));
  const missing = [...buildIds].filter(id => !importIds.has(id));
  const extra   = [...importIds].filter(id => !buildIds.has(id));
  ck('practice ID sets are identical', missing.length === 0 && extra.length === 0,
    missing.length + ' missing from the importer, ' + extra.length + ' extra');
  const pMissing = [...buildPaperIds].filter(id => !importPaperIds.has(id));
  ck('past-paper ID sets are identical', pMissing.length === 0 && buildPaperIds.size === importPaperIds.size,
    pMissing.length + ' missing, ' + buildPaperIds.size + ' vs ' + importPaperIds.size);
  for (const type of Object.keys(buildTypes)) {
    ck('per-type count agrees for ' + type, buildTypes[type] === (pf.byType[type] || 0),
      'build ' + buildTypes[type] + ' vs importer ' + (pf.byType[type] || 0));
  }
}

// ── 3. The corpus itself ──────────────────────────────────────────────────
section('the current corpus');
{
  ck('preflight passes with no errors', pf.ok, pf.errors.slice(0, 3).map(e => e.where + ': ' + e.message).join(' | '));
  ck('no source file was skipped', pf.filesSkipped === 0, pf.filesSkipped + ' skipped');

  // ⚠ These are the counts measured on 2026-09-08, the day the six French files
  // stopped being skipped. Content is added to this repo constantly, so the
  // assertion is a FLOOR plus an explanation, not a frozen equality that would
  // have to be edited on every content commit. What must never happen again is
  // the number going DOWN, or a type disappearing.
  const BASELINE = { practice: 14726, papers: 164,
                     byType: { mcq: 12319, numeric: 2024, text: 305, cloze: 60, multi: 12, symmetry: 6 } };
  ck('practice questions >= the 2026-09-08 baseline of ' + BASELINE.practice,
    pf.practice >= BASELINE.practice, 'now ' + pf.practice);
  ck('past-paper items >= the 2026-09-08 baseline of ' + BASELINE.papers,
    pf.papers >= BASELINE.papers, 'now ' + pf.papers);
  if (pf.practice !== BASELINE.practice) {
    console.log('  note: practice count is ' + pf.practice + ', baseline ' + BASELINE.practice
      + ' (' + (pf.practice >= BASELINE.practice ? '+' : '') + (pf.practice - BASELINE.practice)
      + '). Content is added to this repo constantly; that is expected.');
  }
  const newTypes = Object.keys(pf.byType).filter(t => !(t in BASELINE.byType));
  if (newTypes.length) {
    console.log('  note: question types added since the baseline: '
      + newTypes.map(t => t + ' (' + pf.byType[t] + ')').join(', ')
      + '. Each already has a TYPE_RULES entry, or preflight would have failed above.');
  }

  // ⚠ The bug this file exists for erased a whole FORMAT — text and cloze went
  // to zero. So the small, stable formats are held at their exact baseline: if
  // one of them drops, a loader has lost a factory again.
  for (const type of ['text', 'cloze', 'multi', 'symmetry']) {
    ck('all ' + BASELINE.byType[type] + ' ' + type + ' questions are present (>=)',
      (pf.byType[type] || 0) >= BASELINE.byType[type], 'now ' + (pf.byType[type] || 0));
  }
  // ⚠ mcq and numeric are NOT held at an exact floor. They are large and they
  // legitimately move: deleting a `comingSoon` placeholder file, or rewriting an
  // MCQ as another type, both lower the count without anything being wrong. A
  // hard floor there fails on ordinary authoring and gets edited away, which is
  // how an assertion stops meaning anything. A 2% band still catches a factory
  // going missing (that would be a cliff, not a drift) and the delta is printed.
  for (const type of ['mcq', 'numeric']) {
    const now = pf.byType[type] || 0, want = BASELINE.byType[type];
    ck(type + ' is within 2% of the 2026-09-08 baseline of ' + want,
      now >= Math.floor(want * 0.98), 'now ' + now);
    if (now !== want) console.log('  note: ' + type + ' is ' + now + ', baseline ' + want
      + ' (' + (now >= want ? '+' : '') + (now - want) + ').');
  }
  // The regression itself: the six files that used to be skipped.
  const FORMERLY_SKIPPED = [
    ['grade4-french', 'ch12_g4_textes_trous.js'], ['grade4-french', 'ch13_g4_correction.js'],
    ['grade5-french', 'ch14_textes_trous.js'],    ['grade5-french', 'ch15_correction.js'],
    ['grade6-french', 'ch12_g6_textes_trous.js'], ['grade6-french', 'ch13_g6_correction.js'],
  ];
  for (const [packId, file] of FORMERLY_SKIPPED) {
    const pack = corpus.packs.find(p => p.subjectId === packId);
    const entry = pack && pack.files.find(f => f.file === file);
    ck(packId + '/' + file + ' loads and contributes questions',
      !!entry && !entry.failed && entry.practice > 0, entry ? JSON.stringify(entry) : 'file not found');
  }
}

// ── 4. Every supported type survives load -> row -> JSON -> parse ─────────
section('round trip through the row JSON');
{
  const FIXTURES = {
    mcq: `makeMCQ({ id:'fx-mcq', chapterId:'c', difficulty:2, subsection:'s',
      question:'<b>Bold</b> and <svg viewBox="0 0 4 4"><rect width="4" height="4"/></svg> and <img src="assets/x.png" alt="a diagram">',
      options:['un','deux','trois','quatre'], answer:'deux', hint:'h', explanation:'e', learnMore:'lm' })`,
    numeric: `makeNum({ id:'fx-num', chapterId:'c', difficulty:1, question:'2+2?', answer:4,
      acceptableAnswers:['4','4.0','four'], hint:'h', explanation:'e' })`,
    text: `makeText({ id:'fx-text', chapterId:'c', difficulty:2, subsection:'homophones',
      question:'Corrige : « il a l\\'école »', answer:'à', alsoAccept:['a\\u0300'], confusables:['a'],
      strictAccents:true, hint:'h', explanation:'e' })`,
    cloze: `makeCloze({ id:'fx-cloze', chapterId:'c', difficulty:3, subsection:'q6',
      title:'Le hérisson', intro:'Lis le texte.', text:'Un {1} très {2} café', bank:['petit','tôt','extra'],
      answers:['petit','tôt'], notes:['n1','n2'],
      textB:'Puis il {3} et {4} chez lui', introB:'Écris les mots.',
      answersB:[['rentre','retourne','revient'],'dort'], notesB:['n3','n4'] })`,
    multi: `STATIC_QUESTIONS.push({ id:'fx-multi', chapterId:'c', difficulty:2, subsection:'s', type:'multi',
      question:'Coche tout ce qui est vrai : <img src="assets/french-image-scenes/market.jpg" alt="un étal">',
      options:['des oranges','des poires','un bateau','des étiquettes'],
      answer:['des oranges','des poires','des étiquettes'], hint:'h', explanation:'e' })`,
    symmetry: `makeSymmetry({ id:'fx-sym', chapterId:'c', difficulty:3, question:'Mirror it',
      rows:4, cols:4, axis:'vertical', axisPos:2, given:[[0,0],[1,1],[3,0]] })`,
    'symmetry-line': `STATIC_QUESTIONS.push({ id:'fx-symline', chapterId:'c', difficulty:2,
      type:'symmetry-line', question:'Draw every line of symmetry.',
      canvas:{width:320,height:240}, shapes:[{kind:'polygon',points:[[160,30],[70,200],[250,200]]}],
      answer:[[160,30,160,200]], imageAlt:'An isosceles triangle', hint:'Fold it.', explanation:'One vertical line.' })`,
    // ⚠ The real engine/assessment.js shape: a part carries `label` and
    // `response.kind`, and a non-auto-marked kind MUST carry a rubric.
    task: `STATIC_QUESTIONS.push(makeTask({ id:'fx-task', chapterId:'c', difficulty:3, subsection:'s',
      stimulus:{ html:'<p>A table of rainfall</p>' },
      parts:[{ label:'a', prompt:'Name the wettest month', marks:2,
               response:{ kind:'choice', options:['February','July','June'], answer:'February' },
               explanation:'February has the tallest bar.' },
             { label:'b', prompt:'Explain why', marks:4, response:{ kind:'written' },
               rubric:['names a cause','links it to the data'] }] }))`,
  };

  for (const [type, code] of Object.entries(FIXTURES)) {
    const evaluated = sandbox.evaluateSources([{ file: 'fixture-' + type + '.js',
      code: /^STATIC_QUESTIONS|^\s*STATIC_QUESTIONS/.test(code) ? code + ';' : 'STATIC_QUESTIONS.push(' + code + ');' }]);
    if (evaluated.errors.length) { ck(type + ': fixture loads', false, evaluated.errors[0].message); continue; }
    const q = evaluated.practice[0];
    if (!q) { ck(type + ': fixture produced a question', false); continue; }
    ck(type + ': fixture loads and is typed ' + type, q.type === type, 'got ' + q.type);

    const rule = TYPE_RULES[type];
    ck(type + ': passes its own validator', rule && !rule.check(q), rule ? String(rule.check(q)) : 'no rule');

    // The importer stores the WHOLE object. Row -> JSONB -> back must be equal.
    const roundTripped = JSON.parse(JSON.stringify({ data: q })).data;
    ck(type + ': survives JSON round trip with every field intact',
      JSON.stringify(canonical(roundTripped)) === JSON.stringify(canonical(q)),
      Object.keys(q).filter(k => JSON.stringify(q[k]) !== JSON.stringify(roundTripped[k])).join(','));
    ck(type + ': the round trip is not a projection to MCQ',
      type === 'mcq' || roundTripped.type !== 'mcq');
  }

  // Field-level assertions the generic round trip cannot make.
  const one = code => sandbox.evaluateSources([{ file: 'f.js', code }]).practice[0];
  {
    const q = one('STATIC_QUESTIONS.push(' + FIXTURES.cloze + ');');
    ck('cloze: keeps title, bank, gap counts and two-part data',
      q.title === 'Le hérisson' && q.bank.length === 3 && q.gapsA === 2 && q.gapsB === 2 && q.twoPart === true,
      JSON.stringify({ t: q.title, b: q.bank.length, a: q.gapsA, bb: q.gapsB, two: q.twoPart }));
    ck('cloze: keeps the alternate answers of a typed part-B gap',
      Array.isArray(q.gapAlts[2]) && q.gapAlts[2].length === 3 && q.gapAlts[2][0] === 'rentre',
      JSON.stringify(q.gapAlts[2]));
    ck('cloze: keeps all four notes', q.notes.length === 4, JSON.stringify(q.notes));
    ck('cloze: accented text survives verbatim', q.title === 'Le hérisson' && /tôt/.test(q.bank.join(' ')));
    const after = JSON.parse(JSON.stringify(q));
    ck('cloze: gap ORDER is significant', !contentMatches(after, { ...after, gapAnswers: [...after.gapAnswers].reverse() }));
  }
  {
    const q = one('STATIC_QUESTIONS.push(' + FIXTURES.text + ');');
    ck('text: keeps alsoAccept, confusables and strictAccents',
      q.acceptableAnswers.length === 2 && q.confusables.length === 1 && q.strictAccents === true,
      JSON.stringify({ a: q.acceptableAnswers, c: q.confusables, s: q.strictAccents }));
    ck('text: the accented answer survives', q.answer === 'à');
  }
  {
    const q = one(FIXTURES.multi + ';');
    ck('multi: keeps the complete answer array', q.answer.length === 3);
    ck('multi: answer ORDER is significant',
      !contentMatches(q, { ...q, answer: [...q.answer].reverse() }));
    ck('multi: the image markup survives', /french-image-scenes\/market\.jpg/.test(q.question));
    ck('multi: alt text does not name the answer', !/oranges|poires/.test((q.question.match(/alt="([^"]*)"/) || [])[1] || ''));
  }
  {
    const q = one('STATIC_QUESTIONS.push(' + FIXTURES.symmetry + ');');
    ck('symmetry: keeps grid, axis, given and derived answer',
      q.rows === 4 && q.cols === 4 && q.axis === 'vertical' && q.given.length === 3 && q.answer.length === 3,
      JSON.stringify({ r: q.rows, g: q.given.length, a: q.answer.length }));
    ck('symmetry: coordinate ORDER inside a pair is significant',
      !contentMatches(q, { ...q, answer: q.answer.map(([r, c]) => [c, r]) }));
  }
  {
    const q = one(FIXTURES.task + ';');
    if (!q) ck('task: makeTask fixture loads', false, 'no question produced');
    else {
      ck('task: keeps its stimulus and its summed marks',
        /rainfall/.test(String(q.stimulus && q.stimulus.html)) && q.marks === 6,
        JSON.stringify({ m: q.marks, s: q.stimulus }));
      ck('task: keeps every part', Array.isArray(q.parts) && q.parts.length === 2, JSON.stringify((q.parts || []).length));
      ck('task: keeps each part\'s response kind and options',
        !!q.parts && q.parts[0].response.kind === 'choice' && q.parts[0].response.options.length === 3
                  && q.parts[1].response.kind === 'written');
      ck('task: keeps the rubric of the manually-marked part',
        !!q.parts && Array.isArray(q.parts[1].rubric) && q.parts[1].rubric.length === 2);
      ck('task: keeps per-part marks', !!q.parts && q.parts[0].marks === 2 && q.parts[1].marks === 4);
      ck('task: part ORDER is significant', !contentMatches(q, { ...q, parts: [...q.parts].reverse() }));
      ck('task: is NOT projected into a legacy single question', q.type === 'task', 'type ' + q.type);
    }
  }
  {
    const q = one('STATIC_QUESTIONS.push(' + FIXTURES.mcq + ');');
    ck('mcq: inline SVG survives', /<svg/.test(q.question));
    ck('mcq: an image src survives', /assets\/x\.png/.test(q.question));
    ck('mcq: option ORDER alone is cosmetic',
      contentMatches(q, { ...q, options: [...q.options].reverse() }));
    ck('mcq: an option VALUE change is not cosmetic',
      !contentMatches(q, { ...q, options: [...q.options.slice(1), 'cinq'] }));
  }
}

// ── 4b. The import is idempotent EXCEPT for one measured, named set ───────
// ⚠ makeMCQ keeps the answer plus a RANDOM 3 of the remaining options. For a
// question authored with more than 4 usable options, the stored option set is
// therefore drawn fresh on every load, and the importer honestly reports it as
// "updated" on every run. A clean re-import is "0 new, ~N updated", NOT zero
// writes — and a reader who does not know that reads the churn as drift.
section('idempotency, and the one place it does not hold');
{
  const optionCount = q => (q.type === 'mcq' && Array.isArray(q.options))
    ? new Set(q.options.filter(o => o !== q.answer)).size : 0;
  void optionCount;
  // Counted from the authored source, not from a loaded object: a loaded MCQ
  // has already been trimmed to 4, so it can no longer say how many it had.
  const overSupplied = corpus.packs.flatMap(p => p.practice)
    .filter(q => q.type === 'mcq' && Array.isArray(q.options) && q.options.length > 4).length;
  ck('a loaded MCQ never stores more than 4 options', overSupplied === 0, String(overSupplied));

  // Two independent loads of the same pack must agree on every id, and may
  // disagree only on which distractors an over-supplied item happened to draw.
  const a = sandbox.evaluateSources(corpus.packs[0].files.filter(f => !f.failed)
    .map(f => ({ file: f.file, code: fs.readFileSync(path.join(corpus.packs[0].dir, f.file), 'utf8') })));
  const b = sandbox.evaluateSources(corpus.packs[0].files.filter(f => !f.failed)
    .map(f => ({ file: f.file, code: fs.readFileSync(path.join(corpus.packs[0].dir, f.file), 'utf8') })));
  ck('two loads of a pack produce the same ids in the same order',
    JSON.stringify(a.practice.map(q => q.id)) === JSON.stringify(b.practice.map(q => q.id)));

  const byIdA = new Map(a.practice.map(q => [q.id, q]));
  const differing = b.practice.filter(q => !contentMatches(q, byIdA.get(q.id)));
  ck('anything that differs between two loads differs ONLY in its option set',
    differing.every(q => {
      const other = byIdA.get(q.id);
      return q.type === 'mcq' && contentMatches({ ...q, options: [] }, { ...other, options: [] });
    }), differing.slice(0, 3).map(q => q.id + ':' + q.type).join(','));
}

// ── 5. Preflight is fail-closed ───────────────────────────────────────────
section('preflight refuses a corpus it cannot vouch for');
{
  const packOf = (id, over) => Object.assign({ subjectId: id, grade: Number(id.match(/^grade(\d+)/)[1]),
    dir: '/x', practice: [], papers: [], files: [{ file: 'a.js', practice: 1, papers: 0 }], errors: [] }, over);
  const q = over => Object.assign({ id: 'q1', chapterId: 'c', difficulty: 1, type: 'mcq',
    question: 'Q?', options: ['a', 'b'], answer: 'a', acceptableAnswers: ['a'] }, over);

  {
    const r = preflight({ packs: [packOf('grade5-maths', { practice: [q()] })],
      errors: [{ subjectId: 'grade5-maths', file: 'broken.js', message: 'makeCloze is not defined' }] });
    ck('a source-file exception fails preflight outright', !r.ok);
    ck('…and names the file and the reason',
      r.errors.some(e => e.kind === 'source' && /broken\.js/.test(e.where) && /makeCloze/.test(e.message)));
  }
  {
    const r = preflight({ packs: [
      packOf('grade4-maths', { practice: [q({ id: 'dup' })] }),
      packOf('grade5-maths', { practice: [q({ id: 'dup' })] })] });
    ck('a duplicate ID across two subjects fails preflight', !r.ok);
    ck('…naming it a duplicate', r.errors.some(e => e.kind === 'duplicate'));
  }
  {
    const r = preflight({ packs: [packOf('grade5-maths', {
      practice: [q({ id: 'shared' })], papers: [{ id: 'shared', chapterId: 'c' }],
      files: [{ file: 'a.js', practice: 1, papers: 1 }] })] });
    ck('an ID shared between practice and past papers fails preflight', !r.ok,
      r.errors.map(e => e.kind).join(','));
  }
  {
    const r = preflight({ packs: [packOf('grade5-maths', { practice: [q({ type: 'drag-and-drop' })] })] });
    ck('an unknown type fails preflight', !r.ok);
    ck('…naming the type and the question', r.errors.some(e => e.kind === 'type' && /drag-and-drop/.test(e.message) && /q1/.test(e.where)));
    ck('…and is never silently coerced to mcq', (r.byType.mcq || 0) === 0);
  }
  for (const [label, bad] of [
    ['a missing id',            q({ id: '' })],
    ['a non-string id',         q({ id: 42 })],
    ['an mcq whose answer is not an option', q({ answer: 'zzz' })],
    ['an mcq with one option',  q({ options: ['a'] })],
    ['a missing chapterId',     q({ chapterId: undefined })],
    ['a difficulty out of range', q({ difficulty: 9 })],
    ['a multi with no answers', q({ type: 'multi', answer: [] })],
    ['a symmetry off the grid', { id: 's', chapterId: 'c', difficulty: 1, type: 'symmetry', question: 'q',
                                  rows: 2, cols: 2, axis: 'vertical', given: [[0, 0]], answer: [[0, 9]] }],
    ['a cloze whose gap count disagrees', { id: 'z', chapterId: 'c', difficulty: 1, type: 'cloze', text: 'a {1}',
                                  bank: ['x'], gaps: 5, gapsA: 1, gapsB: 0, twoPart: false,
                                  gapAnswers: ['x'], gapAlts: [['x']] }],
    ['a task with no parts',    { id: 't', chapterId: 'c', difficulty: 1, type: 'task', parts: [] }],
  ]) {
    const r = preflight({ packs: [packOf('grade5-maths', { practice: [bad] })] });
    ck('preflight rejects ' + label, !r.ok, JSON.stringify(r.errors.map(e => e.message)));
  }
  {
    const r = preflight({ packs: [packOf('grade5-maths', {
      papers: [{ id: 'p1', chapterId: 'c', year: 2024, answer: 'Pacific' }],
      practice: [], files: [{ file: 'a.js', practice: 0, papers: 1 }] })] });
    ck('a past-paper item carrying an answer fails preflight', !r.ok,
      r.errors.map(e => e.message).join('|'));
  }
  {
    const good = preflight({ packs: [packOf('grade5-maths', { practice: [q()] })] });
    ck('a clean corpus passes', good.ok);
    ck('…and produces one row per question', good.rows.practice.length === 1);
    ck('…carrying the WHOLE question object in data',
      JSON.stringify(good.rows.practice[0].data) === JSON.stringify(q()));
  }
  ck('every supported type has a validator and a label',
    SUPPORTED_TYPES.every(t => TYPE_RULES[t].label && typeof TYPE_RULES[t].check === 'function'));
  ck('only mcq, numeric and text are marked regenerable as source',
    SUPPORTED_TYPES.filter(t => TYPE_RULES[t].regenerable).join(',') === 'mcq,numeric,text',
    SUPPORTED_TYPES.filter(t => TYPE_RULES[t].regenerable).join(','));
}

// ── 6. --check needs no credential and touches no network ─────────────────
section('--check is credential-free and offline');
{
  const { execFileSync } = require('child_process');
  const env = { ...process.env };
  delete env.SUPABASE_SERVICE_ROLE_KEY;
  delete env.SUPABASE_URL;
  // ⚠ A .env file in the repo root would hand the key back. The check must not
  // need it either way, so the test asserts on behaviour: zero fetches.
  const probe = path.join(require('os').tmpdir(), 'psac-check-probe-' + process.pid + '.js');
  fs.writeFileSync(probe, [
    'const real = globalThis.fetch;',
    'globalThis.fetch = function () { console.error("NETWORK CALL ATTEMPTED"); process.exit(9); };',
    'process.argv = [process.argv[0], ' + JSON.stringify(path.join(ROOT, 'netlify/import-questions.js')) + ', "--check"];',
    'require(' + JSON.stringify(path.join(ROOT, 'netlify/import-questions.js').replace(/\\/g, '\\\\')) + ');',
  ].join('\n'), 'utf8');
  let out = '', code = 0;
  try { out = execFileSync(process.execPath, [probe], { env, encoding: 'utf8', cwd: ROOT }); }
  catch (e) { out = String(e.stdout || '') + String(e.stderr || ''); code = e.status; }
  fs.unlinkSync(probe);
  ck('--check exits 0 with no service-role key in the environment', code === 0, 'exit ' + code);
  ck('--check made no network call', !/NETWORK CALL ATTEMPTED/.test(out));
  ck('--check says nothing was written', /nothing was written/.test(out), out.split('\n').slice(-4).join(' / '));
  ck('--check prints the corpus total', /Questions loaded/.test(out));
  ck('--check never prints a credential', !/service_role|eyJ[A-Za-z0-9_-]{10}/.test(out));

  const usage = (() => {
    try { execFileSync(process.execPath, [path.join(ROOT, 'netlify/import-questions.js'), '--dry_run'], { env, encoding: 'utf8', cwd: ROOT }); return { code: 0, out: '' }; }
    catch (e) { return { code: e.status, out: String(e.stdout || '') + String(e.stderr || '') }; }
  })();
  ck('a misspelled flag fails rather than importing', usage.code !== 0, 'exit ' + usage.code);
  ck('…and prints usage', /Usage: node netlify\/import-questions\.js/.test(usage.out));
}

// ── 7. The database schema needs no migration for these formats ───────────
section('schema');
{
  const sql = fs.readFileSync(path.join(ROOT, 'supabase-schema.sql'), 'utf8');
  const table = sql.slice(sql.indexOf('CREATE TABLE IF NOT EXISTS public.questions'));
  const body = table.slice(0, table.indexOf(');'));
  ck('questions.data is jsonb NOT NULL', /data jsonb NOT NULL/.test(body), body.split('\n').find(l => /data/.test(l)));
  ck('there is no question-type column to keep in step', !/\btype\b/.test(body), body);
  ck('there is no CHECK constraint on questions.data',
    !/ALTER TABLE (public\.)?questions ADD CONSTRAINT \w+ CHECK/.test(sql));
  ck('questions has a primary key on id, so upsert can merge duplicates',
    /questions_pkey PRIMARY KEY \(id\)/.test(sql));
}

console.log('\n' + (fail ? 'FAILED' : 'PASSED') + ': ' + pass + ' checks passed, ' + fail + ' failed.');
process.exitCode = fail ? 1 : 0;
