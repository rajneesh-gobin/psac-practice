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
const fromData = new Set(Object.values(C.REACTIONS).map(r => r.disc).filter(Boolean));
ok('every discovery a reaction names exists', [...fromData].every(id => ids.includes(id)), [...fromData].filter(id => !ids.includes(id)));
const unreachable = ids.filter(id => !fromData.has(id) && !bench.includes(`'${id}'`));
ok('every discovery can be found (named by a reaction or by the bench)', unreachable.length === 0, unreachable);

console.log('\nGuided experiments');
const tokenOk = on => {
  const [k, id] = on.split(':');
  if (k === 'liquid') return !!C.LIQUIDS[id];
  if (k === 'metal') return !!C.METALS[id];
  return ['goggles', 'rinse', 'observe', 'pop', 'glow', 'demo-end'].includes(on);
};
const badDisc = C.DISCOVERIES.filter(d => !d.learn || !d.hint || !Array.isArray(d.how) || !d.how.length
  || !d.how.every(tokenOk) || (d.rx ? !C.REACTIONS[d.rx] : !d.saw) || (d.eq && !C.NEUTRAL[d.eq]));
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

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
