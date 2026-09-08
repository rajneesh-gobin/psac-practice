'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Protected-row write-back safety.
//
//  ⚠ This is the code path that can DESTROY a source file. The old
//  _generateBlock() emitted makeMCQ for every type except numeric and
//  symmetry, so a protected cloze text, typed-text correction, multi-select
//  item or structured task would have been rewritten as an MCQ — with a .bak
//  beside it as the only trace, and the child left with a broken question.
//
//  Everything here runs against a throwaway pack in the OS temp directory.
//  Nothing in subjects/ is touched.
//
//  Run: node scripts/test-question-writeback.js
// ══════════════════════════════════════════════════════════════════════════

const fs   = require('fs');
const os   = require('os');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const { generateBlock, findQuestionBlock, syncProtectedSource } = require(path.join(ROOT, 'netlify/lib/question-writeback'));
const { evaluateSources } = require(path.join(ROOT, 'netlify/lib/questions-sandbox'));
const { contentMatches, TYPE_RULES } = require(path.join(ROOT, 'netlify/lib/question-import'));

let pass = 0, fail = 0;
const ck = (label, ok, detail) => {
  if (ok) { pass++; return; }
  fail++;
  console.log('  FAIL  ' + label + (detail ? '  [' + detail + ']' : ''));
};
const section = t => console.log('\n── ' + t + ' ──');

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-writeback-'));
const packDir = path.join(tmp, 'grade5-fixture', 'questions');
fs.mkdirSync(packDir, { recursive: true });

const SOURCES = {
  'ch01_mcq.js': `'use strict';
STATIC_QUESTIONS.push(
  makeMCQ({ id:'wb-mcq-001', chapterId:'ch', difficulty:2, subsection:'s',
    question:'Which ocean is largest?', options:['Pacific','Atlantic','Indian','Arctic'], answer:'Pacific',
    hint:'h', explanation:'e' })
);
STATIC_QUESTIONS.push(
  makeNum({ id:'wb-num-001', chapterId:'ch', difficulty:1, question:'2 + 2 = ?', answer:4, hint:'h' })
);
STATIC_QUESTIONS.push(
  makeText({ id:'wb-text-001', chapterId:'ch', difficulty:2, subsection:'homophones',
    question:'Corrige le mot souligne', answer:'\\u00e0', confusables:['a'], strictAccents:true, explanation:'e' })
);`,
  'ch02_others.js': `'use strict';
STATIC_QUESTIONS.push(
  makeCloze({ id:'wb-cloze-001', chapterId:'ch', difficulty:3, title:'Texte',
    text:'Un {1} et {2} jour', bank:['petit','beau','grand'], answers:['petit','beau'], notes:['n1','n2'] })
);
STATIC_QUESTIONS.push(
  makeSymmetry({ id:'wb-sym-001', chapterId:'ch', difficulty:3, question:'Mirror',
    rows:4, cols:4, axis:'vertical', axisPos:2, given:[[0,0],[1,1]] })
);
STATIC_QUESTIONS.push({ id:'wb-multi-001', chapterId:'ch', difficulty:2, type:'multi',
  question:'Coche tout', options:['un','deux','trois','quatre'], answer:['un','deux'], hint:'h', explanation:'e' });`,
  // A file that READS the pool it adds to — the shape that once broke a
  // push-only stub. A rewrite must not disturb it either.
  'ch03_audit.js': `'use strict';
STATIC_QUESTIONS.forEach(q => { if (q.id === 'wb-num-001') q.audited = true; });`,
};
for (const [file, code] of Object.entries(SOURCES)) fs.writeFileSync(path.join(packDir, file), code, 'utf8');

const pack = { subjectId: 'grade5-fixture', grade: 5, dir: packDir,
               files: Object.keys(SOURCES).map(file => ({ file, practice: 1, papers: 0 })) };
const loadPack = () => evaluateSources(Object.keys(SOURCES)
  .map(file => ({ file, code: fs.readFileSync(path.join(packDir, file), 'utf8') })));
const restore = () => { for (const [file, code] of Object.entries(SOURCES)) fs.writeFileSync(path.join(packDir, file), code, 'utf8'); };

const initial = loadPack();
const byId = new Map(initial.practice.map(q => [q.id, q]));
ck('fixture pack loads all six questions', initial.practice.length === 6 && initial.errors.length === 0,
  initial.practice.length + ' questions, errors: ' + JSON.stringify(initial.errors));
ck('the pool-reading file ran', byId.get('wb-num-001') && byId.get('wb-num-001').audited === true);

// ── 1. Only mcq / numeric / text can even be generated ────────────────────
section('generateBlock is an exhaustive, fail-safe switch');
for (const id of ['wb-cloze-001', 'wb-sym-001', 'wb-multi-001']) {
  const q = byId.get(id);
  ck('generateBlock refuses a ' + q.type + ' question', generateBlock(q) === null, String(generateBlock(q)).slice(0, 60));
}
ck('generateBlock refuses a task', generateBlock({ id: 't', type: 'task', parts: [] }) === null);
ck('generateBlock refuses an unknown type', generateBlock({ id: 'u', type: 'whatever' }) === null);
ck('generateBlock refuses a missing type', generateBlock({ id: 'u' }) === null);
for (const id of ['wb-mcq-001', 'wb-num-001', 'wb-text-001']) {
  const q = byId.get(id);
  const block = generateBlock(q);
  ck('generateBlock produces source for a ' + q.type + ' question', typeof block === 'string' && block.length > 20);
  const expected = { mcq: 'makeMCQ(', numeric: 'makeNum(', text: 'makeText(' }[q.type];
  ck('…using ' + expected + ' — never makeMCQ by default', block.startsWith(expected), block.slice(0, 20));
}

// ── 2. Regenerated source reproduces the object exactly ───────────────────
section('the regenerated source round-trips');
for (const id of ['wb-mcq-001', 'wb-num-001', 'wb-text-001']) {
  // ⚠ ch03_audit.js stamps `audited` onto wb-num-001 AFTER it is built, so the
  // loaded object carries a field no factory call produces. The block is
  // evaluated here on its own, without that file, so the flag is dropped for
  // this comparison — and section 5 proves it comes back when the whole pack
  // is reloaded, which is the case that actually matters.
  const { audited, ...q } = byId.get(id);
  void audited;
  const out = evaluateSources([{ file: 'gen.js', code: 'STATIC_QUESTIONS.push(' + generateBlock(q) + ');' }]);
  ck('regenerated ' + q.type + ' source loads', out.errors.length === 0, JSON.stringify(out.errors));
  ck('regenerated ' + q.type + ' reproduces the question exactly',
    out.practice.length === 1 && contentMatches(out.practice[0], q),
    JSON.stringify(out.practice[0]).slice(0, 160));
}
{
  const q = byId.get('wb-text-001');
  ck('regenerated text keeps strictAccents and confusables',
    /strictAccents:true/.test(generateBlock(q)) && /confusables/.test(generateBlock(q)));
  const withAlso = { ...q, acceptableAnswers: [q.answer, 'aa', 'bb'] };
  ck('regenerated text carries alsoAccept back through', /alsoAccept:\["aa","bb"\]/.test(generateBlock(withAlso)),
    generateBlock(withAlso).slice(0, 200));
}

// ── 3. findQuestionBlock isolates the right call ──────────────────────────
section('block isolation');
{
  const code = fs.readFileSync(path.join(packDir, 'ch01_mcq.js'), 'utf8');
  const b = findQuestionBlock(code, 'wb-num-001');
  ck('finds the makeNum call, not the makeMCQ above it', b && b.factory === 'makeNum', b && b.factory);
  ck('the isolated block contains only its own id',
    b && code.slice(b.start, b.end).includes('wb-num-001') && !code.slice(b.start, b.end).includes('wb-mcq-001'));
  ck('an id that is not present returns null', findQuestionBlock(code, 'nope') === null);
}

// ── 4. A protected newer type can never rewrite the source ────────────────
section('a protected cloze / symmetry / multi / task never touches the file');
for (const id of ['wb-cloze-001', 'wb-sym-001', 'wb-multi-001']) {
  const dbData = { ...byId.get(id), question: 'THE DATABASE VERSION IS DIFFERENT' };
  const before = fs.readFileSync(path.join(packDir, 'ch02_others.js'), 'utf8');
  const result = syncProtectedSource(id, dbData, pack, { root: tmp });
  const after = fs.readFileSync(path.join(packDir, 'ch02_others.js'), 'utf8');
  ck('sync refuses a protected ' + byId.get(id).type, result.ok === false, JSON.stringify(result));
  ck('…giving a reason a human can act on', /no lossless source form|has no lossless source form/.test(result.reason || ''), result.reason);
  ck('…and the source file is byte-for-byte unchanged', before === after);
  ck('…and nothing became an MCQ', !/makeMCQ/.test(after));
}
{
  const result = syncProtectedSource('wb-cloze-001', { id: 'wb-cloze-001', type: 'task', parts: [] }, pack, { root: tmp });
  ck('sync refuses a protected task', result.ok === false, result.reason);
  const unknown = syncProtectedSource('wb-cloze-001', { id: 'wb-cloze-001', type: 'brand-new' }, pack, { root: tmp });
  ck('sync refuses an unknown database type', unknown.ok === false && /unsupported type/.test(unknown.reason), unknown.reason);
}
ck('no backup directory was created by any refusal', !fs.existsSync(path.join(tmp, '.import-conflicts')));

// ── 5. A protected mcq / numeric / text CAN be synced, and correctly ──────
section('a protected mcq / numeric / text is synced and proved');
for (const [id, patchField, patchValue] of [
  ['wb-mcq-001',  'question',    'Which ocean is the largest on Earth?'],
  ['wb-num-001',  'explanation', 'Two and two make four.'],
  ['wb-text-001', 'hint',        'Regarde l’accent.'],
]) {
  restore();
  const original = byId.get(id);
  const dbData = { ...original, [patchField]: patchValue };
  const result = syncProtectedSource(id, dbData, pack, { root: tmp });
  ck('sync accepts a protected ' + original.type, result.ok === true, JSON.stringify(result));
  const reloaded = loadPack();
  ck('…the pack still loads afterwards', reloaded.errors.length === 0, JSON.stringify(reloaded.errors));
  ck('…with the same question count', reloaded.practice.length === 6, String(reloaded.practice.length));
  const now = new Map(reloaded.practice.map(q => [q.id, q]));
  ck('…and the question now matches the database version', contentMatches(now.get(id), dbData),
    JSON.stringify(now.get(id)).slice(0, 160));
  for (const other of ['wb-mcq-001', 'wb-num-001', 'wb-text-001', 'wb-cloze-001', 'wb-sym-001', 'wb-multi-001']) {
    if (other === id) continue;
    ck('…and ' + other + ' is untouched', contentMatches(now.get(other), byId.get(other)));
  }
  ck('…the pool-reading file still ran', now.get('wb-num-001').audited === true);
  const backups = path.join(tmp, '.import-conflicts', 'backups');
  ck('…a backup was written outside subjects/', fs.existsSync(backups) && fs.readdirSync(backups).length > 0,
    fs.existsSync(backups) ? fs.readdirSync(backups).join(',') : 'no backup dir');
  ck('…and the backup is not a .js file the loader would pick up',
    fs.readdirSync(backups).every(f => !f.endsWith('.js')), fs.readdirSync(backups).join(','));
}
restore();
fs.rmSync(path.join(tmp, '.import-conflicts'), { recursive: true, force: true });

// ── 6. write:false is a genuine dry run ───────────────────────────────────
section('write:false writes nothing');
{
  const original = byId.get('wb-mcq-001');
  const before = fs.readFileSync(path.join(packDir, 'ch01_mcq.js'), 'utf8');
  const result = syncProtectedSource('wb-mcq-001', { ...original, hint: 'changed' }, pack, { root: tmp, write: false });
  ck('a proveable sync reports ok in dry-run mode', result.ok === true, JSON.stringify(result));
  ck('…but the source file is unchanged', before === fs.readFileSync(path.join(packDir, 'ch01_mcq.js'), 'utf8'));
  ck('…and no backup or conflict directory exists', !fs.existsSync(path.join(tmp, '.import-conflicts')));
}

// ── 7. A rewrite that would not reproduce the row is refused ──────────────
section('losslessness is proved, not assumed');
{
  restore();
  // An MCQ whose stored options do not contain its own answer cannot be
  // rebuilt: makeMCQ would shuffle a different set. The proof step catches it.
  const broken = { ...byId.get('wb-mcq-001'), answer: 'Southern', options: ['Pacific', 'Atlantic', 'Indian', 'Arctic'] };
  const before = fs.readFileSync(path.join(packDir, 'ch01_mcq.js'), 'utf8');
  const result = syncProtectedSource('wb-mcq-001', broken, pack, { root: tmp });
  ck('a rewrite that cannot reproduce the row is refused', result.ok === false, JSON.stringify(result));
  ck('…the source file is unchanged', before === fs.readFileSync(path.join(packDir, 'ch01_mcq.js'), 'utf8'));
}
{
  const missing = syncProtectedSource('not-in-any-file', { id: 'not-in-any-file', type: 'mcq',
    chapterId: 'ch', question: 'q', options: ['a', 'b'], answer: 'a', acceptableAnswers: ['a'] }, pack, { root: tmp });
  ck('an id no file declares is refused, not guessed at', missing.ok === false && /no source file declares/.test(missing.reason), missing.reason);
}
{
  const unreadable = syncProtectedSource('wb-mcq-001', byId.get('wb-mcq-001'),
    { subjectId: 'x', dir: path.join(tmp, 'does-not-exist'), files: [{ file: 'a.js' }] }, { root: tmp });
  ck('an unreadable pack is refused rather than throwing', unreadable.ok === false && /could not read/.test(unreadable.reason), unreadable.reason);
}

// ── 8. The type table and the write-back agree ────────────────────────────
section('one source of truth for what is regenerable');
{
  const regenerable = Object.keys(TYPE_RULES).filter(t => TYPE_RULES[t].regenerable);
  ck('exactly mcq, numeric and text are regenerable', regenerable.join(',') === 'mcq,numeric,text', regenerable.join(','));
  for (const t of Object.keys(TYPE_RULES)) {
    if (TYPE_RULES[t].regenerable) continue;
    ck('generateBlock returns null for every non-regenerable type (' + t + ')',
      generateBlock({ id: 'x', type: t }) === null);
  }
}

fs.rmSync(tmp, { recursive: true, force: true });
console.log('\n' + (fail ? 'FAILED' : 'PASSED') + ': ' + pass + ' checks passed, ' + fail + ' failed.');
process.exitCode = fail ? 1 : 0;
