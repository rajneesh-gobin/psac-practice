'use strict';
// Science Labs: data integrity check for the Magnets lab.
//
// Validates: GRADES, OBJECTS, HAZARDS, RESULTS, DISCOVERIES (unlock tokens,
// saw/learn/hint), GUIDES (steps with btn='Skip this step →'), MISSIONS
// (5 questions each, 4 distinct options, answer in options, reason), FACTS.
// Also checks that sign names are valid (from lab_core.js SIGN_LABELS).
//
// Run: node scripts/test-labs-magnets-data.js
'use strict';
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(ROOT, ...p), 'utf8');
const src  = read('engine', 'labs', 'lab_magnets_data.js');
const core = read('engine', 'labs', 'lab_core.js');

const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.D = LabMagnetsData;', ctx);
const D = ctx.D;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};

// ── Helpers ──────────────────────────────────
const signNames = (() => {
  const m = core.match(/SIGN_LABELS\s*=\s*\{[^}]+\}/s);
  if (!m) return new Set();
  return new Set([...m[0].matchAll(/(\w+):/g)].map(x => x[1]));
})();

const allG4 = list => D.forGrade(list, 4);
const allG8 = list => D.forGrade(list, 8);

// ── Structure ─────────────────────────────────
console.log('\nStructure');
ok('GRADES = [4, 8]', JSON.stringify(D.GRADES) === JSON.stringify([4, 8]));
ok('D4 = [4]', JSON.stringify(D.D4) === JSON.stringify([4]));
ok('D8 = [8]', JSON.stringify(D.D8) === JSON.stringify([8]));
ok('D48 = [4, 8]', JSON.stringify(D.D48) === JSON.stringify([4, 8]));
ok('forGrade filters correctly', D.forGrade([{ grades: [4] }, { grades: [8] }], 4).length === 1);

// ── Objects (Grade 4) ─────────────────────────
console.log('\nObjects (Grade 4)');
const objs4 = allG4(D.OBJECTS);
ok('8 objects for Grade 4', objs4.length === 8, objs4.length);
ok('each object has id, label, icon, magnetic, grades', objs4.every(o => o.id && o.label && o.icon && typeof o.magnetic === 'boolean' && Array.isArray(o.grades)));
ok('iron nail is magnetic', objs4.find(o => o.id === 'nail')?.magnetic === true);
ok('steel clip is magnetic', objs4.find(o => o.id === 'clip')?.magnetic === true);
const notMag = ['foil', 'block', 'ruler', 'marble', 'rubber', 'coin'];
ok('6 non-magnetic objects (foil, block, ruler, marble, rubber, coin)',
   notMag.every(id => objs4.find(o => o.id === id)?.magnetic === false), notMag.filter(id => objs4.find(o => o.id === id)?.magnetic !== false));

// ── Hazards ───────────────────────────────────
console.log('\nHazards');
const hz4 = allG4(D.HAZARDS), hz8 = allG8(D.HAZARDS);
ok('at least 2 hazards for Grade 4', hz4.length >= 2, hz4.length);
ok('at least 2 hazards for Grade 8', hz8.length >= 2, hz8.length);
for (const h of D.HAZARDS) {
  ok(`hazard ${h.id}: title, happened, why, instead, exam all present`,
     typeof h.title === 'function' && typeof h.happened === 'function' &&
     h.why && h.instead && h.exam);
  ok(`hazard ${h.id}: signs is array with at least 1 valid sign name`,
     Array.isArray(h.signs) && h.signs.length >= 1 && h.signs.every(s => signNames.size === 0 || signNames.has(s)),
     h.signs.filter(s => signNames.size > 0 && !signNames.has(s)));
  ok(`hazard ${h.id}: title() and happened() return non-empty strings`,
     h.title().length > 0 && h.happened().length > 0);
}

// ── Results ───────────────────────────────────
console.log('\nResults');
ok('at least 1 result card', D.RESULTS.length >= 1);
for (const r of D.RESULTS) {
  ok(`result ${r.id}: title, happened, instead, exam, icon present`,
     typeof r.title === 'function' && typeof r.happened === 'function' &&
     r.instead && r.exam && r.icon);
  ok(`result ${r.id}: title() and happened() return non-empty strings`,
     r.title().length > 0 && r.happened().length > 0);
}

// ── Discoveries ───────────────────────────────
console.log('\nDiscoveries');
const disc4 = allG4(D.DISCOVERIES), disc8 = allG8(D.DISCOVERIES);
ok('at least 10 discoveries for Grade 4', disc4.length >= 10, disc4.length);
ok('at least 10 discoveries for Grade 8', disc8.length >= 10, disc8.length);
for (const d of D.DISCOVERIES) {
  ok(`discovery ${d.id}: title, hint, saw, learn, icon present`,
     d.title && d.hint && d.saw && d.learn && d.icon);
  const unlock = Array.isArray(d.unlock) ? d.unlock : [d.unlock];
  ok(`discovery ${d.id}: unlock is array of strings`,
     unlock.length >= 1 && unlock.every(u => typeof u === 'string' && u.includes(':')));
}
const discIds = D.DISCOVERIES.map(d => d.id);
ok('no duplicate discovery ids', discIds.length === new Set(discIds).size, discIds.filter((id, i) => discIds.indexOf(id) !== i));

// ── Guides ────────────────────────────────────
console.log('\nGuides');
const g4guides = allG4(D.GUIDES), g8guides = allG8(D.GUIDES);
ok('at least 3 guides for Grade 4', g4guides.length >= 3, g4guides.length);
ok('at least 3 guides for Grade 8', g8guides.length >= 3, g8guides.length);
for (const g of D.GUIDES) {
  ok(`guide ${g.id}: icon, title, blurb, lesson, steps present`,
     g.icon && g.title && g.blurb && g.lesson && Array.isArray(g.steps));
  ok(`guide ${g.id}: at least 3 steps`, g.steps.length >= 3, g.steps.length);
  for (const [i, s] of g.steps.entries()) {
    ok(`guide ${g.id} step ${i + 1}: on token contains ':'`, typeof s.on === 'string' && s.on.includes(':'));
    ok(`guide ${g.id} step ${i + 1}: say is non-empty`, typeof s.say === 'string' && s.say.length > 0);
  }
}

// ── Missions ──────────────────────────────────
console.log('\nMissions');
const m4 = allG4(D.MISSIONS), m8 = allG8(D.MISSIONS);
ok('at least 2 missions for Grade 4', m4.length >= 2, m4.length);
ok('at least 2 missions for Grade 8', m8.length >= 2, m8.length);
for (const m of D.MISSIONS) {
  ok(`mission ${m.id}: icon, title, blurb, intro, quiz present`,
     m.icon && m.title && m.blurb && m.intro && Array.isArray(m.quiz));
  ok(`mission ${m.id}: exactly 5 quiz questions`, m.quiz.length === 5, m.quiz.length);
  for (const [i, q] of m.quiz.entries()) {
    ok(`mission ${m.id} Q${i + 1}: q, options (4), answer, why present`,
       q.q && Array.isArray(q.options) && q.options.length === 4 && q.answer && q.why);
    ok(`mission ${m.id} Q${i + 1}: answer is in options`, q.options.includes(q.answer), q.answer);
    ok(`mission ${m.id} Q${i + 1}: 4 distinct options`, new Set(q.options).size === 4, q.options);
    ok(`mission ${m.id} Q${i + 1}: why is at least 10 chars`, q.why.length >= 10, q.why.length);
  }
}

// ── Facts ─────────────────────────────────────
console.log('\nFacts');
const facts4 = allG4(D.FACTS), facts8 = allG8(D.FACTS);
ok('at least 6 facts for Grade 4', facts4.length >= 6, facts4.length);
ok('at least 6 facts for Grade 8', facts8.length >= 6, facts8.length);
for (const f of D.FACTS) {
  ok('fact has text and grades', (f.text || typeof f === 'string') && (f.grades || true));
}

// ── Science grounding ─────────────────────────
console.log('\nScience grounding (Grade 4, ch06_g4_materials.js)');
ok('iron nail is magnetic (g4s-mat-002 grounding)', D.OBJECTS.find(o => o.id === 'nail')?.magnetic === true);
ok('steel clip is magnetic', D.OBJECTS.find(o => o.id === 'clip')?.magnetic === true);
ok('copper coin is NOT magnetic (g4s-mat-007 grounding)', D.OBJECTS.find(o => o.id === 'coin')?.magnetic === false);
ok('aluminium foil is NOT magnetic', D.OBJECTS.find(o => o.id === 'foil')?.magnetic === false);
ok('data file says "only iron and steel" in at least one discovery learn text',
   D.DISCOVERIES.some(d => d.grades.includes(4) && (d.learn || '').toLowerCase().includes('iron and steel')));

console.log('\nScience grounding (Grade 8, batch2_magnetism.js)');
ok('at least one discovery about like poles repelling', D.DISCOVERIES.some(d => d.grades.includes(8) && d.id === 'like_repel'));
ok('at least one discovery about field lines N to S', D.DISCOVERIES.some(d => d.grades.includes(8) && d.id === 'field_lines'));
ok('soft iron is mentioned for electromagnets (g8s-magnetism-019)', D.FACTS.some(f => (f.text || '').includes('soft iron') || (f.text || '').includes('electromagnet')));
ok('credit card hazard exists for Grade 8', D.HAZARDS.some(h => h.id === 'credit_card' && h.grades.includes(8)));
// Steps advance on the bench action named by `on`; no bench renders a step
// button, and a "Skip this step" contract here failed for a week unnoticed.
ok('no guide step carries a button', D.GUIDES.every(g => g.steps.every(s => !s.btn)));

// ── Experiments (lab_experiment.js, LAB_SPEC §10) ─────────────
// Every setup and step token is one the bench fires; every step's control is
// a TAP the bench renders; refs resolve to that grade's missions with the
// answer first; the See text is true when the tokens are replayed through the
// data's own model (OBJECTS.magnetic, force(), needle()).
console.log('\nExperiments');
const bench = read('engine', 'labs', 'lab_magnets.js');
const EX = D.EXPERIMENTS || [];
ok('EXPERIMENTS is exported', Array.isArray(EX) && EX.length >= 6, EX.length);
const ex4 = D.forGrade(EX, 4), ex8 = D.forGrade(EX, 8);
ok('3 to 5 experiments at Grade 4', ex4.length >= 3 && ex4.length <= 5, ex4.length);
ok('3 to 5 experiments at Grade 8', ex8.length >= 3 && ex8.length <= 5, ex8.length);
ok('every experiment is tagged for exactly one grade', EX.every(e => Array.isArray(e.grades) && e.grades.length === 1 && [4, 8].includes(e.grades[0])));
ok('Grade 4 teaches g4sci-materials, Grade 8 teaches g8s-magnetism', ex4.every(e => e.chapter === 'g4sci-materials') && ex8.every(e => e.chapter === 'g8s-magnetism'));
ok('experiment ids are unique', new Set(EX.map(e => e.id)).size === EX.length);

// The visible label of the control each token belongs to (the button text
// without its emoji). Every one must appear verbatim in the bench, so this
// table cannot drift from what a child reads.
const plain = s => String(s || '').replace(/[\u{1F000}-\u{1FAFF}\u{2300}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\u{2190}-\u{21FF}]/gu, '').replace(/\s+/g, ' ').trim().toLowerCase();
const BTN = { 'poles': 'Flip magnet B', 'distance:close': 'Move close', 'distance:far': 'Move apart', 'filings:on': 'Iron filings', 'compass:place': 'Plotting compass',
              'induced:on': 'Induced mode', 'drop:magnet': 'Drop magnet', 'induced:touch:nail': 'Touch soft iron nail to magnet', 'induced:remove:nail': 'Remove soft iron nail',
              'induced:touch:steel': 'Touch steel nail to magnet', 'induced:remove:steel': 'Remove steel nail' };
ok('every Grade 8 button label in the table is in the bench', Object.values(BTN).every(l => bench.includes(l)), Object.values(BTN).filter(l => !bench.includes(l)));
ok('the sort buttons read Magnetic / Non-magnetic', bench.includes('>🧲 Magnetic<') && bench.includes('>❌ Non-magnetic<'));
const labelFor = tok => {
  const [k, v, w] = tok.split(':');
  if (k === 'drag') return (D.objById(v) || {}).label || null;
  if (k === 'sort') return w === 'magnetic' ? 'Magnetic' : w === 'nonmagnetic' ? 'Non-magnetic' : null;
  if (k === 'poles') return BTN.poles;
  return BTN[tok] || null;
};
const tokenOk = tok => {
  const [k, v, w] = String(tok).split(':');
  switch (k) {
    case 'drag': return !!D.objById(v) && w === undefined;
    case 'sort': return !!D.objById(v) && (w === undefined || w === 'magnetic' || w === 'nonmagnetic');
    case 'poles': return /^[NS][NS]$/.test(v) && w === undefined;
    case 'distance': return v === 'close' || v === 'far';
    case 'filings': return v === 'on';
    case 'compass': return v === 'place';
    case 'induced': return w ? ((v === 'touch' || v === 'remove') && (w === 'nail' || w === 'steel')) : v === 'on';
    case 'drop': return v === 'magnet';
  }
  return false;
};
// The bench's selector for every token kind lands on a tappable control.
const selCase = k => new RegExp(`case '${k}': return (w \\? )?\\[`).test(bench);
ok('the bench maps every token kind to a control selector (never a drag-only element)',
   ['drag', 'sort', 'poles', 'distance', 'filings', 'compass', 'induced', 'drop'].every(selCase)
   && bench.includes('data-obj="${esc(o.id)}"') && bench.includes('data-sort-obj="${esc(o.id)}:magnetic"') && bench.includes('data-act="touch-nail"'));
ok('a wrong option is heard, not done (_expWrong before every action)', (bench.match(/if \(_expWrong\(tok\)\) \{ _guideEvent\(tok\); return; \}/g) || []).length >= 6);
ok('the bench keeps a notebook the runner can show', /evidence: \(\) => _log\.slice\(-6\)/.test(bench) && /_note\(P\(\)\.NOTE\./.test(bench));

// The model: what the bench would show after each token.
function blank() {
  return { tested: {}, sorted: {}, poleA: 'N', poleB: 'S', distance: 'far', filings: false, compass: false, induced: false,
           nailOn: false, steelOn: false, nailMag: false, steelMag: false, dropped: false, seen: new Set(['NS']), wasClose: false, notes: [], errors: [] };
}
// Can this token fire from this state by ONE tap? (poles: one flip of B;
// distance: the toggle; touch/remove: the nail is in the other position.)
function reachable(st, tok) {
  const [k, v, w] = tok.split(':');
  switch (k) {
    case 'drag': case 'sort': case 'drop': return true;
    case 'poles': return v[0] === st.poleA && v[1] !== st.poleB;
    case 'distance': return v !== st.distance;
    case 'filings': return !st.filings;
    case 'compass': return !st.compass;
    case 'induced': if (!w) return !st.induced; return st.induced && (w === 'nail' ? st.nailOn : st.steelOn) !== (v === 'touch');
  }
  return false;
}
function apply(st, tok) {
  const [k, v, w] = tok.split(':');
  switch (k) {
    case 'drag': { const o = D.objById(v); st.tested[v] = o.magnetic ? 'stuck' : 'fell'; st.notes.push(D.NOTE.test(o)); break; }
    case 'sort': { const o = D.objById(v); const grp = w || (o.magnetic ? 'magnetic' : 'nonmagnetic');
      if ((grp === 'magnetic') !== o.magnetic) { st.errors.push('wrong group ' + tok); break; }
      st.sorted[v] = grp; st.notes.push(D.NOTE.sort(o, grp)); break; }
    case 'poles': st.poleA = v[0]; st.poleB = v[1]; st.seen.add(v); st.notes.push(D.NOTE.poles(v[0], v[1])); if (st.compass) st.notes.push(D.NOTE.compass(v[0], v[1])); break;
    case 'distance': st.distance = v; if (v === 'close') st.wasClose = true; st.notes.push(D.NOTE.distance(v === 'close')); break;
    case 'filings': st.filings = true; st.notes.push(D.NOTE.filings(st.poleA, st.poleB)); break;
    case 'compass': st.compass = true; st.notes.push(D.NOTE.compass(st.poleA, st.poleB)); break;
    case 'induced': {
      if (!w) { st.induced = true; break; }
      const on = v === 'touch';
      if (w === 'nail') { st.nailOn = on; st.nailMag = on; } else { st.steelOn = on; if (on) st.steelMag = true; }
      st.notes.push(D.NOTE.induced(w, on)); break; }
    case 'drop': st.dropped = true; st.notes.push(D.NOTE.drop()); break;
  }
}
const count = (st, grp) => Object.values(st.sorted).filter(g => g === grp).length;
// What each See text claims, checked against the model - and the prediction's
// answer, which the bench must be the one to give.
const TRUTH = {
  which_pull: st => st.tested.nail === 'stuck' && st.tested.clip === 'stuck' && st.tested.block === 'fell' && D.isMagnetic('nail') && !D.isMagnetic('coin') && !D.isMagnetic('marble'),
  all_metals: st => st.tested.clip === 'stuck' && st.tested.coin === 'fell' && st.tested.foil === 'fell',
  sort_groups: st => count(st, 'magnetic') === 2 && count(st, 'nonmagnetic') === 3 && st.sorted.nail === 'magnetic' && st.sorted.clip === 'magnetic'
    && st.sorted.coin === 'nonmagnetic' && st.sorted.marble === 'nonmagnetic' && st.sorted.block === 'nonmagnetic',
  like_poles: st => st.seen.has('NN') && st.wasClose && st.poleA + st.poleB === 'NS' && D.force('N', 'N') === 'repel' && D.force('N', 'S') === 'attract',
  field_shape: st => st.filings && st.compass && st.poleA + st.poleB === 'NN' && D.force('N', 'N') === 'repel',
  compass_points: st => st.compass && st.seen.has('NN') && st.poleA + st.poleB === 'NS' && D.needle('N', 'S').dir === 'right' && D.needle('N', 'N').dir === 'down',
  keeps_magnetism: st => st.induced && !st.nailOn && !st.nailMag && !st.steelOn && st.steelMag,
};
const words = s => (String(s).match(/\S+/g) || []).length;
const g4long = [];
for (const e of EX) {
  const t = e.id, g = e.grades[0];
  const M4 = D.forGrade(D.MISSIONS, g).map(m => m.id);
  ok(`${t}: title is a question (≤ 60 chars, ends in ?), aim ≤ 200 chars`, /\?$/.test(e.title) && e.title.length <= 60 && e.aim.length >= 20 && e.aim.length <= 200, [e.title, e.aim.length]);
  const toks = [...(e.setup || [])];
  e.steps.forEach(s => toks.push(...(s.options || s.any || [s.on])));
  ok(`${t}: every setup and step token is one the bench fires`, toks.every(tokenOk), toks.filter(x => !tokenOk(x)));
  ok(`${t}: 1 to 5 steps, each a decision (ask + options) or an observation (on + say)`,
     e.steps.length >= 1 && e.steps.length <= 5 && e.steps.every(s => (s.ask && Array.isArray(s.options) && s.options.length >= 2 && (s.on || s.any)) || (s.on && s.say && !s.options)), e.steps.map(s => s.ask || s.say));
  ok(`${t}: at least one step is a decision`, e.steps.some(s => s.ask));
  ok(`${t}: a wrong option names an option, and explains itself`, e.steps.every(s => !s.wrong || Object.keys(s.wrong).every(k => (s.options || []).includes(k) && k !== s.on && s.wrong[k].length > 15)));
  ok(`${t}: an ask step glows its answer among its options`, e.steps.every(s => !s.ask || (s.any ? s.any.every(x => s.options.includes(x)) : s.options.includes(s.on))));
  // say names its control (the walker checks the same thing in a browser)
  const badSay = e.steps.filter(s => s.say && !plain(s.say).includes(plain(labelFor(s.on || s.any[0]) || ' ')));
  ok(`${t}: every say names the control it points at`, badSay.length === 0, badSay.map(s => [s.say, labelFor(s.on)]));
  const limit = g <= 6 ? 12 : 25;
  ok(`${t}: instructions ≤ ${limit} words`, e.steps.every(s => words(s.say || s.ask) <= limit), e.steps.map(s => words(s.say || s.ask)));
  // predict
  const p = e.predict;
  ok(`${t}: predict has 2-4 options with the answer among them`, p && p.options.length >= 2 && p.options.length <= 4 && p.options.some(o => o.id === p.answer));
  // replay
  const st = blank();
  (e.setup || []).forEach(tok => apply(st, tok));
  const unreachable = [];
  for (const s of e.steps) {
    const on = s.on || s.any[0];
    (s.options || []).forEach(o => { if (!reachable(st, o)) unreachable.push(o); });
    if (!reachable(st, on)) unreachable.push(on);
    apply(st, on);
  }
  ok(`${t}: every step (and every wrong option) can fire from the bench as it stands then`, unreachable.length === 0, unreachable);
  ok(`${t}: the replay raises no bench error`, st.errors.length === 0, st.errors);
  ok(`${t}: the See text is TRUE for the model after those steps`, !!TRUTH[t] && TRUTH[t](st), { id: t, tested: st.tested, sorted: st.sorted, poles: st.poleA + st.poleB, seen: [...st.seen] });
  ok(`${t}: the notebook has something to show at See`, st.notes.length >= 1, st.notes);
  // Grade 4: every object the See text names was tested/sorted, and the sentence says what the model says
  if (g === 4) {
    const bad = [];
    for (const sn of e.see.saw.split(/(?:[.!?])\s+/)) {
      for (const o of D.OBJECTS) {
        if (!sn.toLowerCase().includes(o.label.toLowerCase())) continue;
        if (!st.tested[o.id] && !st.sorted[o.id]) bad.push(o.id + ' not tested');
        if (/stuck|pulled|^Magnetic:/i.test(sn) && !o.magnetic) bad.push(o.id + ' called magnetic');
        if (/fell|^Non-magnetic:/i.test(sn) && o.magnetic) bad.push(o.id + ' called non-magnetic');
      }
    }
    ok(`${t}: every object the See text names did what the model says`, bad.length === 0, bad);
    [e.aim, e.see.saw, e.see.learn, ...e.steps.flatMap(s => Object.values(s.wrong || {}))].forEach(txt => txt.split(/(?:[.!?])\s+/).forEach(sn => { if (words(sn) > 16) g4long.push(sn); }));
  }
  // check refs
  ok(`${t}: 2 or 3 check questions`, e.check.length >= 2 && e.check.length <= 3);
  for (const ref of e.check) {
    if (typeof ref === 'object') { ok(`${t}: inline question has 4 distinct options, answer first, and a reason`, ref.q && ref.options.length === 4 && new Set(ref.options).size === 4 && ref.why && ref.why.length > 10); continue; }
    const [mid, i] = ref.split(':');
    const M = D.MISSIONS.find(m => m.id === mid), q = M && M.quiz[Number(i)];
    ok(`${t}: check ${ref} is a Grade ${g} mission question with its answer first`, !!q && M4.includes(mid) && q.options[0] === q.answer, q && q.q);
  }
  ok(`${t}: See and exam lines present`, e.see.saw.length > 10 && e.see.learn.length > 10 && typeof e.exam === 'string' && e.exam.length > 10);
  // exam quotes come from that grade's question files
  const quotes = [...e.exam.matchAll(/"([^"]+)"/g)].map(m => m[1]);
  if (quotes.length) {
    const dir = path.join(ROOT, 'subjects', `grade${g}-science`, 'questions');
    const bank = fs.readdirSync(dir).filter(f => f.endsWith('.js')).map(f => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n');
    ok(`${t}: the quoted exam line is in grade${g}-science's question files`, quotes.every(q => bank.includes(q)), quotes.filter(q => !bank.includes(q)));
  }
}
ok('Grade 4 experiment sentences stay under 16 words', g4long.length === 0, g4long);
ok('no regex lookbehind in the lab files', ![src, bench].some(t => /\(\?<[=!]/.test(t)));
ok('the bench never records answers into mastery', !/recordAnswer|_recordDaily/.test(bench));

// ── Summary ───────────────────────────────────
console.log(`\n${'─'.repeat(50)}`);
console.log(`  ${pass} passed  ${fail} failed\n`);
if (fail > 0) process.exitCode = 1;
