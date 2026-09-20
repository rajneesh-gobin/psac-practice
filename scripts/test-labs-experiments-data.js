'use strict';
// Science Labs experiments (lab_experiment.js) - the data contract, in Node.
//
// For every lab that declares experiments in lab_core.js (EXPERIMENTS_BY_LAB):
//   - its data file exports EXPERIMENTS with exactly that many per grade;
//   - each experiment has an aim a child can say back, a picture set-up, a
//     tappable prediction (2-4 options, the answer among them), at most FIVE
//     steps, what-you-saw + what-you-learnt, and 2-3 check questions that
//     resolve to real quiz questions with 4 distinct options;
//   - every "ask" step lists options including its own answer, and every
//     wrong-option text names an option;
//   - its chapter exists in that grade's science pack (subjects/_index.js);
//   - app.js's _LAB_CHAPTERS (the chapter-card chip) agrees with lab_core.js.
// It does not open a browser; scripts/test-labs-experiments.js walks each
// experiment on a phone.
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const ROOT = path.resolve(__dirname, '..');
let pass = 0, fail = 0;
const ok = (label, cond, detail) => { if (cond) { pass++; console.log('  PASS  ' + label); } else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail).slice(0, 300) : '')); } };
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

// lab_core.js in a sandbox: it only needs a window and a document stub at load.
const coreCtx = vm.createContext({ window: {}, document: { getElementById: () => null, createElement: () => ({}), documentElement: { classList: { contains: () => false } } }, console, Math, Date, Map, Set, sessionStorage: { getItem: () => null, setItem() {}, removeItem() {} } });
vm.runInContext(read('engine/labs/lab_core.js') + '\nthis.Labs = Labs;', coreCtx);
const Labs = coreCtx.Labs;
ok('lab_core.js loads and exports LABS', Array.isArray(Labs.LABS) && Labs.LABS.length > 0);

// The subject index, executed with a stub registerSubject that collects packs.
const packs = [];
const idxCtx = vm.createContext({ registerSubject: p => packs.push(p), window: {}, console, STATIC_QUESTIONS: [] });
vm.runInContext(read('subjects/_index.js'), idxCtx);
ok('subjects/_index.js registered the science packs', packs.some(p => p.id === 'grade6-science'), packs.length);
const chapterIds = new Map(packs.map(p => [p.id, new Set((p.chapters || []).map(c => c.id))]));
const packsForGrade = g => Number(g) === 9 ? ['grade9-biology', 'grade9-chemistry', 'grade9-physics'] : [`grade${g}-science`];
const chapterKnown = (g, id) => packsForGrade(g).some(pk => chapterIds.has(pk) && chapterIds.get(pk).has(id));

// 1. Every chapter a lab claims exists at that grade.
console.log('\nChapters by lab');
for (const l of Labs.LABS) {
  for (const [g, chs] of Object.entries(l.chapters || {})) {
    ok(`${l.id} at Grade ${g}: serves that grade`, l.grades.includes(Number(g)), l.grades);
    for (const ch of chs) ok(`${l.id} at Grade ${g}: chapter ${ch} exists in ${packsForGrade(g).join('/')}`, chapterKnown(g, ch));
  }
}

// 2. app.js's chip map agrees with the registry.
console.log('\napp.js _LAB_CHAPTERS');
const appSrc = read('engine/app.js');
const m = appSrc.match(/const _LAB_CHAPTERS = \{([\s\S]*?)\};/);
ok('_LAB_CHAPTERS is declared in app.js', !!m);
const appMap = {};
// a value is 'lab' or ['lab', 'lab', …]
if (m) for (const mm of m[1].matchAll(/'([^']+)'\s*:\s*(\[[^\]]*\]|'[^']+')/g)) appMap[mm[1]] = [...mm[2].matchAll(/'([^']+)'/g)].map(x => x[1]);
for (const [ch, labs] of Object.entries(appMap)) for (const lab of labs) {
  const l = Labs.LABS.find(x => x.id === lab);
  const grades = l ? Object.keys(l.experiments || {}).filter(g => (l.chapters[g] || []).includes(ch)) : [];
  ok(`chip ${ch} → ${lab}: a lab with experiments teaching that chapter`, !!l && grades.length > 0, { lab: !!l, grades });
}
for (const l of Labs.LABS) for (const g of Object.keys(l.experiments || {})) for (const ch of (l.chapters[g] || [])) {
  if (process.env.LAB_EXP_COUNTS) break;
  ok(`${l.id} Grade ${g}: chapter ${ch} has a chip in app.js that lists this lab`, Array.isArray(appMap[ch]) && appMap[ch].includes(l.id), appMap[ch]);
}

// 3. Each lab's EXPERIMENTS.
const loadData = l => {
  const file = l.files[0];
  const ctx = vm.createContext({ window: {}, console, Math });
  const src = read(file);
  const global = (src.match(/^const (\w+) = \(\(\) =>/m) || [])[1];
  vm.runInContext(src + `\nthis.D = ${global};`, ctx);
  return ctx.D;
};
// A lab under construction can be checked before the lead registers it:
//   LAB_EXP_COUNTS='{"circuit":{"4":4,"6":3}}' node scripts/test-labs-experiments-data.js
let override = {};
try { override = JSON.parse(process.env.LAB_EXP_COUNTS || '{}'); } catch (e) { override = {}; }
for (const l of Labs.LABS) {
  const counts = override[l.id] || l.experiments || {};
  if (!Object.keys(counts).length) continue;
  console.log(`\n${l.name} (${l.id})`);
  const D = loadData(l);
  ok('data file exports EXPERIMENTS', Array.isArray(D.EXPERIMENTS));
  if (!Array.isArray(D.EXPERIMENTS)) continue;
  const question = ref => {
    if (ref && typeof ref === 'object') return ref;
    const [mid, i] = String(ref).split(':');
    const M = (D.MISSIONS || []).find(x => x.id === mid);
    return M ? M.quiz[Number(i)] : null;
  };
  ok('experiment ids are unique', new Set(D.EXPERIMENTS.map(e => e.id)).size === D.EXPERIMENTS.length);
  for (const [g, n] of Object.entries(counts)) {
    const mine = D.EXPERIMENTS.filter(e => (e.grades || [l.grades[l.grades.length - 1]]).includes(Number(g)));
    ok(`Grade ${g}: registry says ${n} experiments, data has ${mine.length}`, mine.length === n);
    ok(`Grade ${g}: 3 to 5 experiments`, mine.length >= 3 && mine.length <= 5, mine.length);
  }
  for (const e of D.EXPERIMENTS) {
    const t = e.id;
    ok(`${t}: title is a question a child can say back`, typeof e.title === 'string' && e.title.length >= 8 && e.title.length <= 60 && /\?$/.test(e.title.trim()), e.title);
    ok(`${t}: aim is one or two short sentences`, typeof e.aim === 'string' && e.aim.length >= 20 && e.aim.length <= 200 && e.aim.split(/[.!?]\s/).length <= 3, e.aim);
    ok(`${t}: chapter exists at every grade it serves`, (e.grades || []).every(g => chapterKnown(g, e.chapter)) && (l.chapters[e.grades[0]] || []).includes(e.chapter), { chapter: e.chapter, grades: e.grades });
    ok(`${t}: setup is a token list`, Array.isArray(e.setup) && e.setup.every(x => typeof x === 'string'));
    const p = e.predict;
    ok(`${t}: predict has 2-4 tappable options and its answer is one of them`, p && Array.isArray(p.options) && p.options.length >= 2 && p.options.length <= 4 && p.options.every(o => o.id && o.label) && p.options.some(o => o.id === p.answer), p);
    ok(`${t}: 1 to 5 steps`, Array.isArray(e.steps) && e.steps.length >= 1 && e.steps.length <= 5, e.steps && e.steps.length);
    for (const [i, s] of (e.steps || []).entries()) {
      const toks = s.options || s.any || (s.on ? [s.on] : []);
      ok(`${t} step ${i + 1}: has an instruction and at least one token`, (s.say || s.ask) && toks.length > 0, s);
      if (s.ask) ok(`${t} step ${i + 1}: an ask step lists its options and the answer is among them`, Array.isArray(s.options) && s.options.length >= 2 && (s.any ? s.any.every(x => s.options.includes(x)) : s.options.includes(s.on)), s);
      if (s.wrong) ok(`${t} step ${i + 1}: every wrong text names an option`, Object.keys(s.wrong).every(k => toks.includes(k)) && Object.values(s.wrong).every(v => typeof v === 'string' && v.length > 15), s.wrong);
      const words = String(s.say || s.ask).split(/\s+/).length;
      ok(`${t} step ${i + 1}: instruction under 25 words`, words <= 25, words);
    }
    ok(`${t}: see.saw and see.learn`, e.see && typeof e.see.saw === 'string' && e.see.saw.length > 10 && typeof e.see.learn === 'string' && e.see.learn.length > 10, e.see);
    ok(`${t}: 2 or 3 check questions`, Array.isArray(e.check) && e.check.length >= 2 && e.check.length <= 3, e.check);
    for (const ref of (e.check || [])) {
      const q = question(ref);
      ok(`${t}: check ${JSON.stringify(ref)} resolves to a question with 4 distinct options and a reason`,
         !!q && typeof q.q === 'string' && Array.isArray(q.options) && q.options.length === 4 && new Set(q.options.map(o => typeof o === 'object' ? o.label : o)).size === 4 && typeof q.why === 'string', q && q.q);
    }
    ok(`${t}: has an exam line`, typeof e.exam === 'string' && e.exam.length > 10);
  }
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
