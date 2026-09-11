'use strict';
// Science Labs: the chemistry the Mixing Bench is allowed to show.
//
// The bench draws whatever engine/labs/lab_chem_data.js says, so a mistake in
// that file is a mistake taught to a child. This checks what can be checked
// mechanically: every symbol equation balances atom for atom, the reaction
// rates follow the reactivity series, the pH maths lands where chemistry says,
// every discovery can actually be found, and every quiz question is well formed.
//
// Run: node scripts/test-labs-chem-data.js
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_chem_data.js'), 'utf8');
const bench = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_mixing.js'), 'utf8');
const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.LabChem = LabChem;', ctx);
const C = ctx.LabChem;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};

// ── Atom counting for "2Al + 6HCl → 2AlCl₃ + 3H₂" ─────────────
const SUB = { '₀': 0, '₁': 1, '₂': 2, '₃': 3, '₄': 4, '₅': 5, '₆': 6, '₇': 7, '₈': 8, '₉': 9 };
function parseFormula(f) {
  const stack = [{}];
  let i = 0;
  while (i < f.length) {
    const ch = f[i];
    if (ch === '(' || ch === '[') { stack.push({}); i++; }
    else if (ch === ')' || ch === ']') {
      i++;
      let n = '';
      while (i < f.length && SUB[f[i]] !== undefined) n += SUB[f[i++]];
      const mul = n ? +n : 1, top = stack.pop();
      for (const k in top) stack[stack.length - 1][k] = (stack[stack.length - 1][k] || 0) + top[k] * mul;
    } else if (/[A-Z]/.test(ch)) {
      let el = ch; i++;
      while (i < f.length && /[a-z]/.test(f[i])) el += f[i++];
      let n = '';
      while (i < f.length && SUB[f[i]] !== undefined) n += SUB[f[i++]];
      stack[stack.length - 1][el] = (stack[stack.length - 1][el] || 0) + (n ? +n : 1);
    } else i++;
  }
  return stack[0];
}
function side(s) {
  const out = {};
  s.split('+').map(x => x.trim()).filter(Boolean).forEach(term => {
    const m = /^(\d*)(.*)$/.exec(term);
    const coef = m[1] ? +m[1] : 1;
    const atoms = parseFormula(m[2]);
    for (const k in atoms) out[k] = (out[k] || 0) + atoms[k] * coef;
  });
  return out;
}
function balanced(eq) {
  const [l, r] = eq.split('→');
  const a = side(l), b = side(r);
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) if ((a[k] || 0) !== (b[k] || 0)) return { ok: false, a, b };
  return { ok: true };
}
void parseFormula;

console.log('\nEquations balance');
const eqs = [];
for (const [k, r] of Object.entries(C.REACTIONS)) if (r.sym) eqs.push([k, r.sym]);
for (const [k, n] of Object.entries(C.NEUTRAL)) eqs.push(['neutral ' + k, n.sym]);
for (const [k, r] of Object.entries(C.REACTIONS8)) if (r.sym) eqs.push(['Grade 8 ' + k, r.sym]);
for (const [k, n] of Object.entries(C.NEUTRAL8)) if (n.sym) eqs.push(['Grade 8 neutral ' + k, n.sym]);
for (const d of C.DISCOVERIES) if (d.sym) eqs.push(['discovery ' + d.id, d.sym]);
for (const [k, e] of eqs) { const b = balanced(e); ok(`${k}: ${e}`, b.ok, b.ok ? undefined : { left: b.a, right: b.b }); }
ok('the atom counter itself catches an unbalanced equation', !balanced('Mg + HCl → MgCl₂ + H₂').ok);

console.log('\nReactivity series');
const metals = Object.entries(C.METALS).filter(([, m]) => !m.alkali).sort((a, b) => a[1].rank - b[1].rank);
const inAcid = metals.map(([id]) => [id, C.reaction(id, 'hcl')]);
const rates = inAcid.map(([id, r]) => [id, r && r.kind === 'react' ? r.rate : 0]);
ok('every non-alkali metal has an outcome in HCl, H2SO4, water and NaOH',
   metals.every(([id]) => ['hcl', 'h2so4', 'water', 'naoh'].every(m => C.reaction(id, m))),
   metals.flatMap(([id]) => ['hcl', 'h2so4', 'water', 'naoh'].filter(m => !C.reaction(id, m)).map(m => id + '|' + m)));
ok('rates in acid fall strictly down the series (Ca > Mg > Al > Zn > Fe > Cu)',
   rates.every((r, i) => i === 0 || r[1] < rates[i - 1][1]), rates);
ok('copper does not react with acid', C.reaction('copper', 'hcl').kind === 'none' && C.reaction('copper', 'h2so4').kind === 'none');
ok('alkali metals only have a WATER outcome, and it is a teacher demo',
   ['sodium', 'potassium'].every(id => C.reaction(id, 'water').kind === 'demo' && !C.reaction(id, 'hcl') && !C.reaction(id, 'h2so4')));
ok('every metal-acid reaction uses H⁺ and makes hydrogen',
   Object.entries(C.REACTIONS).filter(([k, r]) => /\|(hcl|h2so4)$/.test(k) && r.kind === 'react')
     .every(([, r]) => r.uses === 'h' && r.h2 > 0 && r.per === r.h2 * 2));
const race = ['magnesium', 'zinc', 'iron', 'copper'].map(id => C.fizzRating(C.reaction(id, 'hcl')));
ok('the Reactivity Race notebook ranks Mg > Zn > Fe > Cu', race.join() === '4,3,2,0', race);

console.log('\npH and indicator');
const drop = 0.25;
ok('5 cm³ of 1.0 mol/dm³ HCl is pH 0', Math.abs(C.pH(5, 0, 5) - 0) < 1e-9, C.pH(5, 0, 5));
ok('20 drops of 1.0 mol/dm³ NaOH neutralise it exactly: pH 7', C.pH(5, 20 * drop, 5 + 20 * drop) === 7);
ok('19 drops still leaves it clearly acidic (pH < 2)', C.pH(5, 19 * drop, 5 + 19 * drop) < 2);
ok('21 drops overshoots to strongly alkaline (pH > 12)', C.pH(5, 21 * drop, 5 + 21 * drop) > 12);
ok('pure water is pH 7', C.pH(0, 0, 5) === 7);
ok('an empty tube has no pH', C.pH(0, 0, 0) === null);
ok('indicator: red at pH 1, green at 7, purple at 13',
   C.indicatorName(1) === 'red' && C.indicatorName(7) === 'green' && C.indicatorName(13) === 'purple'
   && C.indicatorColor(7) === '#6DBE45');

console.log('\nDiscoveries');
const ids = C.DISCOVERIES.map(d => d.id);
ok('discovery ids are unique', new Set(ids).size === ids.length);
const fromData = new Set([...Object.values(C.REACTIONS), ...Object.values(C.REACTIONS8)].map(r => r.disc).filter(Boolean)
  .concat(Object.values(C.IND8)));
ok('every discovery a reaction names exists', [...fromData].every(id => ids.includes(id)), [...fromData].filter(id => !ids.includes(id)));
const unreachable = ids.filter(id => !fromData.has(id) && !bench.includes(`'${id}'`));
ok('every discovery can be found (named by a reaction or by the bench)', unreachable.length === 0, unreachable);

console.log('\nGuided experiments');
const tokenOk = on => {
  const [k, id] = on.split(':');
  if (k === 'liquid') return !!C.LIQUIDS[id];
  if (k === 'metal') return !!C.METALS[id];
  if (k === 'solid') return !!C.SOLIDS8[id];
  if (k === 'litmus') return id === 'red' || id === 'blue';
  return ['goggles', 'rinse', 'observe', 'pop', 'glow', 'demo-end', 'out', 'lime', 'conclude'].includes(on);
};
const badDisc = C.DISCOVERIES.filter(d => !d.learn || !d.hint || !Array.isArray(d.how) || !d.how.length
  || !d.how.every(tokenOk) || (d.rx ? !C.REACTIONS[d.rx] : d.rx8 ? !C.REACTIONS8[d.rx8] : !d.saw) || (d.eq && !C.NEUTRAL[d.eq]));
ok('every discovery says why it happens, what you saw, and has a valid “how to find it” recipe', badDisc.length === 0, badDisc.map(d => d.id));
ok('a discovery recipe never puts an alkali metal anywhere but plain water',
   C.DISCOVERIES.every(d => !d.how.some(s => /metal:(sodium|potassium)/.test(s)) || d.how.filter(s => s.startsWith('liquid:')).every(s => s === 'liquid:water')));
ok('guide ids are unique', new Set(C.GUIDES.map(g => g.id)).size === C.GUIDES.length);
for (const G of C.GUIDES) {
  const bad = G.steps.filter(s => !tokenOk(s.on) || !s.say || (['observe', 'demo-end'].includes(s.on) ? !!s.btn : !s.btn));
  ok(`${G.title}: every step names a real action, says what to do, and has a button unless it is “watch”`, bad.length === 0, bad);
  ok(`${G.title}: ends with what they found out`, !!(G.lesson && G.blurb && G.icon));
}
ok('no guide sends a pupil to put an alkali metal in acid',
   C.GUIDES.every(G => !G.steps.some(s => /metal:(sodium|potassium)/.test(s.on)) || !G.steps.some(s => /liquid:(hcl|h2so4|naoh)/.test(s.on))));

console.log('\nMissions and hazards');
for (const M of C.MISSIONS) {
  const bad = M.quiz.filter(q => q.options.length !== 4 || new Set(q.options).size !== 4 || !q.why || !q.q);
  ok(`${M.title}: every question has 4 distinct options and a reason`, bad.length === 0, bad.map(q => q.q));
}
for (const [id, H] of Object.entries(C.HAZARDS)) {
  const ctxArgs = { what: 'dilute hydrochloric acid', metal: 'Potassium', medium: 'hcl' };
  ok(`hazard ${id} explains what happened, why, what to do and the exam point`,
     H.signs.length && H.signs.every(s => C.SIGN_LABELS[s]) && H.title(ctxArgs) && H.happened(ctxArgs) && H.why && H.instead && H.exam);
}

// ── Grade levels (LAB_SPEC §9) ──────────────────────
console.log('\nGrade levels');
const all = [...C.GUIDES, ...C.MISSIONS, ...C.DISCOVERIES];
ok('GRADES is [8, 9]', C.GRADES.join() === '8,9', C.GRADES);
ok('every guide, mission and discovery is untagged (Grade 9) or tagged with grades the lab declares',
   all.every(x => !x.grades || (x.grades.length && x.grades.every(g => C.GRADES.includes(g)))), all.filter(x => x.grades && !x.grades.every(g => C.GRADES.includes(g))).map(x => x.id));
ok('every Grade 8 id starts g8_, and no Grade 9 id does (progress never collides)',
   all.every(x => (x.grades || [9]).includes(8) === x.id.startsWith('g8_')), all.filter(x => (x.grades || [9]).includes(8) !== x.id.startsWith('g8_')).map(x => x.id));
const n9 = [C.GUIDES, C.MISSIONS, C.DISCOVERIES].map(l => C.forGrade(l, 9).length);
ok('the Grade 9 set is unchanged: 4 guides, 2 missions, 21 discoveries', n9.join() === '4,2,21', n9);
const g8 = { guides: C.forGrade(C.GUIDES, 8), missions: C.forGrade(C.MISSIONS, 8), disc: C.forGrade(C.DISCOVERIES, 8) };
ok('Grade 8 has at least 3 guides, 2 missions and 10 discoveries', g8.guides.length >= 3 && g8.missions.length >= 2 && g8.disc.length >= 10,
   { guides: g8.guides.length, missions: g8.missions.length, disc: g8.disc.length });
ok('no Grade 8 item is also a Grade 9 item', ![...g8.guides, ...g8.missions, ...g8.disc].some(x => C.forGrade([x], 9).length));
ok('every Grade 8 mission has at least 5 questions', g8.missions.every(M => M.quiz.length >= 5), g8.missions.map(M => M.quiz.length));
const g9q = new Set(C.forGrade(C.MISSIONS, 9).flatMap(M => M.quiz.map(q => q.q)));
ok('no Grade 8 question repeats a Grade 9 one', g8.missions.every(M => M.quiz.every(q => !g9q.has(q.q))));
const g8tokens = [...g8.guides.flatMap(G => G.steps.map(s => s.on)), ...g8.disc.flatMap(d => d.how)];
ok('Grade 8 recipes and guides use no alkali metal and no Grade 9 metal token', !g8tokens.some(t => t.startsWith('metal:')), g8tokens.filter(t => t.startsWith('metal:')));
ok('Grade 8 solids hold no alkali metal', Object.values(C.SOLIDS8).every(s => !s.alkali) && !C.SOLIDS8.sodium && !C.SOLIDS8.potassium);
ok('Grade 9 recipes never use a Grade 8 token', !C.forGrade(C.DISCOVERIES, 9).some(d => d.how.some(t => /^(solid|litmus):|^(lime|out|conclude)$/.test(t))));

console.log('\nGrade 8 chemistry');
const P = { lemon: 2, vinegar: 3, salt: 7, water: 7, bakingsoda: 8, toothpaste: 9, antacid: 10, bleach: 13, hcl: 0, naoh: 14, indicator: 7 };
ok('each substance has the pH the Grade 8 chapter gives it (vinegar 3, salt 7, bleach 13 …)',
   Object.entries(P).every(([id, p]) => C.phOf(id) === p), Object.fromEntries(Object.keys(P).map(id => [id, C.phOf(id)])));
const Lq = C.LIQUIDS;
const mixPH = (ids, vol) => { let h = 0, oh = 0, v = 0; ids.forEach(([id, cm3]) => { h += cm3 * Lq[id].h; oh += cm3 * Lq[id].oh; v += cm3; }); return C.pHMix(h, oh, v, ids.map(x => x[0])); };
ok('vinegar with universal indicator reads pH 3 (orange), lemon juice pH 2 (red)',
   mixPH([['vinegar', 5], ['indicator', 0.15]]) === 3 && C.indicatorName(3) === 'orange' && mixPH([['lemon', 5], ['indicator', 0.15]]) === 2 && C.indicatorName(2) === 'red');
ok('salt solution is green, pH 7; baking soda blue-green, pH 8; antacid blue, pH 10',
   mixPH([['salt', 5], ['indicator', 0.15]]) === 7 && mixPH([['bakingsoda', 5], ['indicator', 0.15]]) === 8 && C.indicatorName(8) === 'blue-green'
   && mixPH([['antacid', 5], ['indicator', 0.15]]) === 10 && C.indicatorName(10) === 'blue');
ok('diluting an acid with water raises the pH towards 7 but never past it (g8s-hd-086)',
   (() => { const a = mixPH([['hcl', 5]]), b = mixPH([['hcl', 5], ['water', 15]]); const c = mixPH([['vinegar', 5], ['water', 15]]); return b > a && b < 7 && c >= 3 && c < 7; })());
ok('5 cm³ of antacid neutralises 5 cm³ of the lab acid exactly: pH 7',
   C.pHMix(5, 5, 10.15, ['hcl', 'indicator', 'antacid']) === 7);
ok('Settle the Stomach: 19 drops still acidic (pH < 2), 20 drops pH 7, 21 drops overshoots to pH 10 - not 14, an antacid is a weak base',
   C.pHMix(5, 19 * drop, 5.15 + 19 * drop, ['hcl', 'indicator', 'antacid']) < 2
   && C.pHMix(5, 20 * drop, 5.15 + 20 * drop, ['hcl', 'indicator', 'antacid']) === 7
   && C.pHMix(5, 21 * drop, 5.15 + 21 * drop, ['hcl', 'indicator', 'antacid']) === 10);
ok('the lab acid and alkali alone read the same as at Grade 9 (pH 0 and 14)', C.pHMix(5, 0, 5, ['hcl']) === C.pH(5, 0, 5) && C.pHMix(0, 5, 5, ['naoh']) === C.pH(0, 5, 5));
ok('litmus: acid turns blue litmus red; alkali turns red litmus blue; neutral changes neither; red stays red in an acid',
   C.litmus('blue', 3) === 'red' && C.litmus('red', 9) === 'blue' && C.litmus('red', 7) === 'red' && C.litmus('blue', 7) === 'blue' && C.litmus('red', 2) === 'red' && C.litmus('blue', 10) === 'blue');
const media = ['hcl', 'weak', 'neutral', 'alkali', 'dry'];
ok('every Grade 8 solid has an outcome in the lab acid, a kitchen acid, a neutral liquid, an alkali and a dry tube',
   Object.keys(C.SOLIDS8).every(s => media.every(m => C.reaction8(s, m))), Object.keys(C.SOLIDS8).flatMap(s => media.filter(m => !C.reaction8(s, m)).map(m => s + '|' + m)));
ok('nothing reacts without an acid', Object.keys(C.SOLIDS8).every(s => ['neutral', 'alkali', 'dry'].every(m => ['none', 'dry'].includes(C.reaction8(s, m).kind))));
ok('metals give hydrogen and the carbonate gives carbon dioxide, each using the acid',
   Object.entries(C.REACTIONS8).filter(([, r]) => r.kind === 'react').every(([k, r]) => r.uses === 'h' && (k.startsWith('marble') ? r.co2 > 0 && !r.h2 : r.h2 > 0 && !r.co2)));
ok('magnesium reacts faster than zinc in the lab acid, and faster in the lab acid than in a kitchen acid',
   C.reaction8('magnesium', 'hcl').rate > C.reaction8('zinc', 'hcl').rate && C.reaction8('magnesium', 'hcl').rate > C.reaction8('magnesium', 'weak').rate
   && C.reaction8('marble', 'hcl').rate > C.reaction8('marble', 'weak').rate);
ok('the pop and limewater recipes make enough gas to test (> 0.03 mmol at the mouth after the watch step)',
   C.reaction8('magnesium', 'hcl').rate * 6 * (1 - Math.exp(-1)) > 0.03 && C.reaction8('marble', 'hcl').rate * 6 * (1 - Math.exp(-1)) > 0.03);
ok('every liquid a Grade 8 indicator card names is on the shelf', Object.keys(C.IND8).every(id => C.LIQUIDS[id]));
const survey = C.MISSIONS.find(M => M.id === 'g8_survey');
ok('the pH Survey samples are all household liquids with an indicator card', survey.samples.every(id => C.LIQUIDS[id] && C.LIQUIDS[id].sample && C.IND8[id]));
ok('only baking soda fizzes (a hydrogencarbonate); bleach never reaches the tube (it is a hazard)',
   Object.entries(C.LIQUIDS).filter(([, L]) => L.fizz).map(([id]) => id).join() === 'bakingsoda' && C.LIQUIDS.bleach.hazard === 'g8_bleach' && !!C.HAZARDS.g8_bleach);
ok('Grade 8 hazards: goggles (corrosive), tasting (toxic), bleach (corrosive)',
   C.HAZARDS.g8_no_goggles.signs.includes('corrosive') && C.HAZARDS.g8_taste.signs.includes('toxic') && C.HAZARDS.g8_bleach.signs.includes('corrosive'));
for (const [id, R] of Object.entries(C.RESULTS8)) {
  const ctxArgs = { added: 'vinegar', held: 'lemon juice', what: 'salt solution', drops: 21, p: '10.0', colour: 'blue' };
  ok(`result card ${id} says what happened, what to do instead and the exam point`, !!(R.icon && R.title && (typeof R.happened === 'function' ? R.happened(ctxArgs) : R.happened) && R.instead && R.exam));
  ok(`result card ${id} is used by the bench`, bench.includes(`RESULTS8.${id}`));
}
ok('Grade 8 has its own facts', C.FACTS8.length >= 8);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
