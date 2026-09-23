'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  The Past Exam Papers filters must never offer a choice that leads nowhere.
//
//  WHY THIS EXISTS — reported from the app: Grade 5 → "Examiners' report" →
//  "2024" produced "Nothing on this shelf matches those choices". The two
//  pickers were built independently from the whole shelf, so every kind was
//  offered against every year whether or not that pairing held a document —
//  and the reader had no way to tell which of their two choices was the dead
//  one.
//
//  ⚠ Both halves matter, and the second is the one that is easy to forget:
//     · the option lists are FACETED, so a dead pairing is never offered;
//     · the SETTERS prune, because a reader can still walk into a dead pairing
//       from the other direction — pick 2024, then pick a kind with nothing in
//       2024. Faceting alone cannot prevent that; the newest choice has to win
//       and the contradicted filter has to give way.
//
//  ⚠ This runs the REAL _controls() and setters, extracted from
//    engine/library.js and executed in a VM with the module's state injected.
//    A reimplementation here would assert against itself and stay green while
//    the shipped code drifted.
//
//  Run:  node scripts/test-library-filters.js
// ══════════════════════════════════════════════════════════════════════════

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const SRC = fs.readFileSync(path.resolve(__dirname, '../engine/library.js'), 'utf8');

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('OK   ' + label); }
  else { fail++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail).slice(0, 400) : '')); }
};

// Pull a named function out by brace balance so its body may contain anything.
function extract(name, kind = 'function') {
  const needle = `\n  ${kind} ${name}(`;
  const starts = [];
  let from = 0, at;
  while ((at = SRC.indexOf(needle, from)) !== -1) { starts.push(at); from = at + 1; }
  if (starts.length !== 1) return { src: null, count: starts.length };
  let i = SRC.indexOf('{', starts[0] + needle.length), depth = 0, end = -1;
  for (let j = i; j < SRC.length; j++) {
    const c = SRC[j];
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { end = j; break; } }
  }
  return { src: SRC.slice(starts[0] + 1, end + 1), count: 1 };
}

// A shelf with a DELIBERATE GAP: examiners' reports exist only for 2023,
// exam papers for 2023 and 2024. "Examiners' report + 2024" is the dead
// pairing the reader hit.
const SCOPE = [
  { id: 1, doc_type: 'exam-paper',       year: 2024, title: 'Maths 2024' },
  { id: 2, doc_type: 'exam-paper',       year: 2023, title: 'Maths 2023' },
  { id: 3, doc_type: 'examiners-report', year: 2023, title: 'Report 2023' },
  { id: 4, doc_type: 'specimen',         year: null, title: 'Specimen' },
];

const got = extract('_controls');
ok('_controls() is defined exactly once in engine/library.js', got.count === 1, got.count);

function controlsWith({ type = '', year = '' } = {}) {
  const ctx = vm.createContext({
    _typeFilter: type, _yearFilter: year, _sort: 'year-desc',
    TYPE_LABEL: { 'exam-paper': 'Exam paper', 'examiners-report': "Examiners' report", specimen: 'Specimen' },
    _esc: s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'),
  });
  vm.runInContext(got.src + '\nthis.f = _controls;', ctx);
  return ctx.f(SCOPE);
}
// the <option value="…"> values offered by the Nth select
const valuesOf = (html, aria) => {
  const block = html.split('<select').find(s => s.includes(`aria-label="${aria}"`));
  if (!block) return null;
  return [...block.matchAll(/<option value="([^"]*)"/g)].map(m => m[1]);
};

// ── 1 · nothing selected: everything on the shelf is offered ─────────────
{
  const html = controlsWith();
  ok('with no filter, all three kinds are offered',
    JSON.stringify((valuesOf(html, 'Kind of document') || []).sort()) ===
    JSON.stringify(['', 'exam-paper', 'examiners-report', 'specimen'].sort()),
    valuesOf(html, 'Kind of document'));
  ok('with no filter, both years are offered',
    JSON.stringify(valuesOf(html, 'Year')) === JSON.stringify(['', '2024', '2023']),
    valuesOf(html, 'Year'));
}

// ── 2 · the reported bug ────────────────────────────────────────────────
// ⚠ A select with only one real option is not rendered at all — that is the
//   pre-existing "nothing to choose between" rule, and it is why valuesOf()
//   returns null rather than a short list. Absent and "does not offer 2024"
//   are the same outcome for the reader, so both count.
{
  const years = valuesOf(controlsWith({ type: 'examiners-report' }), 'Year') || [];
  ok('choosing Examiners’ report never offers 2024, the year it has nothing in',
    !years.includes('2024'), years);
  const kinds = valuesOf(controlsWith({ year: '2024' }), 'Kind of document') || [];
  ok('choosing 2024 never offers Examiners’ report',
    !kinds.includes('examiners-report'), kinds);
}

// ── 3 · THE INVARIANT, stated directly ──────────────────────────────────
// Every pairing the reader can reach from the rendered controls must hold at
// least one document. This is the requirement in one sentence; the two checks
// above are just the specific case that was reported.
{
  const matches = (type, year) => SCOPE.filter(d =>
    (!type || d.doc_type === type) && (!year || String(d.year || '') === year)).length;
  const dead = [];
  // start from every state the reader can be in...
  const states = [{ type: '', year: '' }];
  for (const t of ['exam-paper', 'examiners-report', 'specimen']) states.push({ type: t, year: '' });
  for (const y of ['2024', '2023']) states.push({ type: '', year: y });
  for (const st of states) {
    const html = controlsWith(st);
    for (const t of (valuesOf(html, 'Kind of document') || [])) {
      if (matches(t, st.year) === 0) dead.push(`from ${JSON.stringify(st)} the kind "${t || 'all'}" leads nowhere`);
    }
    for (const y of (valuesOf(html, 'Year') || [])) {
      if (matches(st.type, y) === 0) dead.push(`from ${JSON.stringify(st)} the year "${y || 'all'}" leads nowhere`);
    }
  }
  ok('no option offered by any control leads to an empty shelf', dead.length === 0, dead);
}

// ── 4 · an active filter must never lose its own control ────────────────
// ⚠ Faceting can reduce a list to one option. The old code hid a select with
//   fewer than two options — which, with a filter applied, would leave the
//   reader holding a filter they cannot see or clear.
{
  const html = controlsWith({ type: 'specimen' });          // specimen has no year at all
  ok('a filter with no matching years still renders its own kind select',
    (valuesOf(html, 'Kind of document') || []).includes('specimen'),
    valuesOf(html, 'Kind of document'));
  const html2 = controlsWith({ year: '2023', type: 'examiners-report' });
  ok('and an active year filter keeps its select even when faceted to one year',
    (valuesOf(html2, 'Year') || []).includes('2023'), valuesOf(html2, 'Year'));
}

// ── 5 · the setters prune, so the other direction cannot strand either ──
{
  const sType = extract('setType'), sYear = extract('setYear');
  ok('setType() is defined exactly once', sType.count === 1, sType.count);
  ok('setYear() is defined exactly once', sYear.count === 1, sYear.count);
  if (sType.src && sYear.src) {
    const ctx = vm.createContext({
      _typeFilter: '', _yearFilter: '', _lastScope: SCOPE,
      render() {},
      _hasAny: (type, year) => SCOPE.some(d =>
        (!type || d.doc_type === type) && (!year || String(d.year || '') === year)),
    });
    vm.runInContext(sType.src + '\n' + sYear.src + '\nthis.setType = setType; this.setYear = setYear;', ctx);

    // reader picks 2024, then a kind that has nothing in 2024
    ctx._yearFilter = '2024'; ctx._typeFilter = '';
    ctx.setType('examiners-report');
    ok('picking a kind with nothing in the chosen year drops the YEAR, not the kind',
      ctx._typeFilter === 'examiners-report' && ctx._yearFilter === '',
      { type: ctx._typeFilter, year: ctx._yearFilter });

    // and the mirror: a year with nothing for the chosen kind
    ctx._typeFilter = 'examiners-report'; ctx._yearFilter = '';
    ctx.setYear('2024');
    ok('picking a year with nothing of the chosen kind drops the KIND, not the year',
      ctx._yearFilter === '2024' && ctx._typeFilter === '',
      { type: ctx._typeFilter, year: ctx._yearFilter });

    // a valid pairing must be left completely alone
    ctx._typeFilter = ''; ctx._yearFilter = '2023';
    ctx.setType('examiners-report');
    ok('a pairing that does hold documents is left intact',
      ctx._typeFilter === 'examiners-report' && ctx._yearFilter === '2023',
      { type: ctx._typeFilter, year: ctx._yearFilter });
  }
}

console.log(`\nLibrary filters: ${pass} passed, ${fail} failed.`);
process.exit(fail ? 1 : 0);
