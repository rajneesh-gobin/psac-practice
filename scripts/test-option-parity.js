'use strict';
// Do our MCQ options look like the real PSAC paper's, or do they give the answer away?
//
// WHY THIS EXISTS
// Measured 2026-09-08 against the 34 real Grade 6 papers in past-papers/psac6:
// in grade6-history the correct answer was the LONGEST option 53.2% of the time
// (chance is 25%) and averaged 44.1 characters against 27.5 for the distractors;
// grade6-science was 47.2% and 35.8 vs 25.0. A child who knew nothing and always
// picked the longest option scored about half marks. The real papers have no such
// tell — their options average 11.8 characters with a within-question spread of
// 6.5, because every option is the same grammatical shape:
//
//     A Coconut   B Maize   C Rice   D Tea
//
// The number that matters is the SPREAD (longest minus shortest within one
// question), not the absolute length: the exam legitimately puts "Sugar cane"
// beside "Tea", and that carries no signal. A 23-character spread means one
// option is an explanatory clause and the other three are stubs.
//
// Run `node netlify/build-questions.js` first — this reads the BUILT bundles,
// because that is what a child actually receives, and fields have been silently
// dropped at build time before while the source read correctly.

const fs = require('fs');
const path = require('path');

const BUNDLES = path.join(__dirname, '..', 'netlify', 'question-bundles');

// ⚠ THIS USED TO BE `['grade6-history', 'grade6-science']` — TWO packs, chosen
//   because they were where the leak was first measured. Everything else was
//   unguarded, and the gap was not theoretical: the same defect was found by
//   hand in grade9-ict (answer uniquely longest 40.0%, spread 11.7) and again
//   in grade9-science (39.8%, 9.7), in two separate batches, by re-running
//   these checks manually because nothing ran them. A harness that names two
//   packs stops covering the project the moment a third one ships.
//   The list is now DERIVED from the live packs, so a pack going live is
//   covered the same day rather than whenever someone remembers.
// ⚠ Live packs only, deliberately: a comingSoon pack holds one placeholder
//   question, which no child can be dealt and which would fail every ratio
//   here on a sample of one.
const PACKS = (() => {
  const vm = require('vm');
  const packs = [];
  const ctx = { registerSubject: o => packs.push(o), console };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'subjects', '_index.js'), 'utf8'), ctx);
  return packs.filter(p => !p.comingSoon).map(p => p.id).sort();
})();

// Measured from the real papers (see past-papers/psac6). Thresholds sit a little
// above the papers so ordinary content variation does not fail the build.
const MAX_LONGEST_RATE = 0.42;   // papers are at chance, 0.25
const MAX_AVG_SPREAD = 12;       // papers measure 6.5 (hist-geo) and 6.8 (science)
const ANSWER_MIN_LEN = 25;       // below this, length carries no semantic signal
const LONGEST_MARGIN = 3;        // fewer characters than this is not visible to a reader

// ⚠ ENTITIES DECODE TO THEIR CHARACTER, THEY DO NOT ALL BECOME '?'.
//   This used to map every entity to a single '?', which made four genuinely
//   different options identical: `x &gt; 5`, `x &lt; 5`, `x &le; 5` and
//   `x &ge; 5` all became "x ? 5", and the duplicate-option check failed eight
//   real grade9-maths items plus two in grade9-science whose options differ by
//   ÷ versus × versus +. A child sees four distinct options; the harness did
//   not. Decoding also keeps the LENGTH honest — `&divide;` is one character on
//   screen, not eight, and the spread metric is measured in characters.
//   Anything not in this table still becomes '?', which is the safe direction:
//   an unknown entity is one glyph, and collapsing two different unknowns is a
//   false duplicate report, not a missed one.
const ENTITIES = {
  '&nbsp;': ' ', '&rarr;': '\u2192', '&minus;': '\u2212', '&frasl;': '/',
  '&rsquo;': "'", '&deg;': '\u00b0', '&lt;': '<', '&gt;': '>',
  '&le;': '\u2264', '&ge;': '\u2265', '&divide;': '\u00f7', '&times;': '\u00d7',
  '&sup2;': '\u00b2', '&sup3;': '\u00b3', '&#179;': '\u00b3', '&pi;': '\u03c0',
  '&cup;': '\u222a', '&cap;': '\u2229', '&radic;': '\u221a', '&amp;': '&',
};
const strip = s => String(s == null ? '' : s)
  .replace(/<[^>]*>/g, '')
  .replace(/&[a-z#0-9]+;/gi, m => (ENTITIES[m] !== undefined ? ENTITIES[m] : '?'))
  .trim();

// ⚠⚠ PRE-EXISTING DEBT, FOUND THE DAY THIS HARNESS STOPPED LOOKING AT TWO PACKS.
//   Widening PACKS to every live pack revealed that the answer-length tell is
//   NOT confined to the two grade-6 packs it was written for. Measured
//   2026-09-08 with the margin rule above, worst first:
//       grade4-science  52.5%   grade5-history 40.4%
//       grade4-history  33.0%   grade5-science 33.3%
//   grade4-science is the serious one: on 322 four-option MCQs a child who read
//   nothing and always picked the visibly longest option would beat chance by
//   more than two to one, in content that has been live for a long time.
//   ⚠ These are RECORDED, NOT FORGIVEN. A pack listed here is reported as debt
//   instead of failing the build, but it may never get WORSE than the number
//   below — a regression fails like anything else. Delete the entry once the
//   pack is under the target; do not raise a number to make a build pass.
//   ⚠ Nothing authored after this date belongs in this list.
//   ⚠ `leaks` is the count of individually flagged items; `rate` is the
//   proportion where the answer is visibly longest. A pack may be under the
//   rate target and still carry hundreds of individual leaks — grade5-history
//   is at 39.6% (a pass) with 143 flagged items — so both are recorded.
//   ⚠ ~870 items across sixteen packs are flagged. That is a real backlog and
//   it needs its own piece of work; it is NOT a reason to delete the check.
const BASELINE = {
  'grade4-english': { leaks: 36 },
  'grade4-french':  { leaks: 74 },
  'grade4-history': { leaks: 142, spread: 21.6 },
  'grade4-maths':   { leaks: 1, pos: 0.147 },
  'grade4-science': { rate: 0.525, leaks: 121, spread: 22.5 },
  'grade5-english': { leaks: 38 },
  'grade5-french':  { leaks: 57 },
  'grade5-history': { leaks: 143, spread: 20.8 },
  'grade5-maths':   { leaks: 1 },
  'grade5-science': { leaks: 76, spread: 14.0 },
  'grade6-english': { leaks: 111 },
  'grade6-french':  { leaks: 66 },
  'grade6-maths':   { leaks: 2 },
};

let failures = 0;
let debts = 0;
const fail = msg => { console.log('  FAIL  ' + msg); failures++; };
const ok = msg => console.log('  ok    ' + msg);

for (const pack of PACKS) {
  const file = path.join(BUNDLES, pack + '.json');
  if (!fs.existsSync(file)) {
    console.log('\n' + pack);
    fail('bundle missing - run `node netlify/build-questions.js` first');
    continue;
  }
  const qs = JSON.parse(fs.readFileSync(file, 'utf8'));
  // ⚠ `type === 'mcq'` MATTERS. A `multi` question also has four options, but
  //   its answer is an ARRAY of the correct ones - so `options.indexOf(answer)`
  //   never matches and all twelve g4fr-photo-* items were reported as "answer is
  //   not one of the options", which reads as twelve unanswerable questions.
  //   They are fine; the filter was wrong. Found the day this harness first
  //   looked at a French pack.
  const four = qs.filter(q => q.type === 'mcq' && Array.isArray(q.options) && q.options.length === 4);
  console.log('\n' + pack + '  (' + qs.length + ' questions, ' + four.length + ' four-option MCQs)');
  // ⚠ A ratio over a handful of items is noise, not a measurement. A pack
  //   below this many MCQs is reported and skipped rather than failed.
  if (four.length < 30) { console.log('  note  too few four-option MCQs to measure a rate'); continue; }

  let longest = 0, leaks = 0, spreadTotal = 0, scored = 0;
  const leakIds = [], orphanIds = [], dupIds = [];

  for (const q of four) {
    const opts = q.options.map(strip);
    const ans = strip(q.answer);

    if (new Set(opts).size !== opts.length) dupIds.push(q.id);

    const ai = opts.indexOf(ans);
    if (ai < 0) { orphanIds.push(q.id); continue; }
    scored++;

    const lens = opts.map(o => o.length);
    spreadTotal += Math.max(...lens) - Math.min(...lens);

    const others = lens.filter((_, i) => i !== ai);
    const maxOther = Math.max(...others);
    const meanOther = others.reduce((a, b) => a + b, 0) / others.length;
    // ⚠ A MARGIN, NOT A STRICT `>`. This counted the answer as "longest" when it
    //   beat the next option by ONE character, which is no signal to a reader:
    //   `Crystallisation` (15) beside `Sublimation` (11) and `Distillation` is a
    //   perfectly fair set of one-word chemistry terms, and `Ampere`, `Newton`,
    //   `Cellulose` behave the same way. Measured on grade9-science, 18 of the
    //   flagged items differed by 1-2 characters and could not be padded without
    //   writing nonsense.
    //   ⚠ THIS IS NOT A LOOSENED THRESHOLD. It changes what counts as a tell, not
    //   how many are tolerated, and it rescues nothing that is genuinely wrong:
    //   measured across all 18 live packs the day it changed, grade4-science went
    //   58.7% -> 52.5% and STILL FAILS, grade5-history 44.8% -> 40.4% and
    //   grade5-science 46.2% -> 33.3%. The real detector is the "materially
    //   longest" check below, which is unchanged.
    if (lens[ai] - maxOther >= LONGEST_MARGIN) longest++;
    // "materially longest": long enough to carry meaning AND clearly the biggest
    if (lens[ai] >= ANSWER_MIN_LEN && lens[ai] > maxOther &&
        (lens[ai] - maxOther >= 12 || lens[ai] >= meanOther * 1.6)) {
      leaks++; leakIds.push(q.id);
    }
  }

  if (orphanIds.length) fail('answer is not one of the options: ' + orphanIds.join(' '));
  else ok('every answer matches one of its options');

  if (dupIds.length) fail('duplicate options: ' + dupIds.join(' '));
  else ok('no duplicate options');

  const rate = scored ? longest / scored : 0;
  const msg = 'correct answer is visibly the longest option ' + (100 * rate).toFixed(1) +
    '% (chance 25%, limit ' + (100 * MAX_LONGEST_RATE).toFixed(0) + '%)';
  const base = BASELINE[pack] || {};
  if (rate <= MAX_LONGEST_RATE) {
    ok(msg);
  } else if (base.rate !== undefined && rate <= base.rate + 0.005) {
    console.log('  DEBT  ' + msg + ' — pre-existing, capped at ' +
      (100 * base.rate).toFixed(1) + '%; see BASELINE');
    debts++;
  } else if (base.rate !== undefined) {
    fail(msg + ' — WORSE than its recorded baseline of ' + (100 * base.rate).toFixed(1) + '%');
  } else {
    fail(msg);
  }

  const leakMsg = leaks + ' question(s) where the correct answer is materially the longest: ' +
    leakIds.slice(0, 12).join(' ') + (leakIds.length > 12 ? ' …' : '');
  if (!leaks) {
    ok('no question gives its answer away by option length');
  } else if (base.leaks !== undefined && leaks <= base.leaks) {
    console.log('  DEBT  ' + leaks + ' pre-existing length leaks (capped at ' + base.leaks + ')');
    debts++;
  } else if (base.leaks !== undefined) {
    fail(leakMsg + ' — WORSE than its recorded baseline of ' + base.leaks);
  } else {
    fail(leakMsg);
  }

  const avgSpread = scored ? spreadTotal / scored : 0;
  const sMsg = 'average within-question option spread ' + avgSpread.toFixed(1) +
    ' chars (papers: 6.5-6.8, limit ' + MAX_AVG_SPREAD + ')';
  if (avgSpread <= MAX_AVG_SPREAD) {
    ok(sMsg);
  } else if (base.spread !== undefined && avgSpread <= base.spread + 0.05) {
    console.log('  DEBT  ' + sMsg + ' - pre-existing, capped at ' + base.spread);
    debts++;
  } else if (base.spread !== undefined) {
    fail(sMsg + ' - WORSE than its recorded baseline of ' + base.spread);
  } else {
    fail(sMsg);
  }

  // Where does the correct answer sit? The three server-side copies of makeMCQ
  // used `sort(() => Math.random() - 0.5)`, which is biased: it put the answer
  // in position A 36% of the time and B/C ~16% each, so guessing "A" every time
  // scored ~40%. engine/helpers.js had already been fixed to Fisher-Yates and
  // the other three copies had not — the duplication trap in CLAUDE.md.
  const pos = [0, 0, 0, 0];
  let placed = 0;
  for (const q of four) {
    const i = q.options.map(strip).indexOf(strip(q.answer));
    if (i >= 0) { pos[i]++; placed++; }
  }
  const worst = Math.max(...pos.map(p => Math.abs(p / placed - 0.25)));
  const pMsg = 'answer position A/B/C/D ' + pos.map(p => (100 * p / placed).toFixed(1) + '%').join(' ') +
    ' (uniform 25%, max drift ' + (100 * worst).toFixed(1) + '%)';
  // ⚠ THE SLACK SCALES WITH THE SAMPLE, because a fixed 8 points is unfair to a
  //   small pack and slack on a large one. The standard error of a 25%
  //   proportion is sqrt(.25*.75/n) — about 2.5 points at n=300 but 4.8 at
  //   n=82 — so three of those is the honest band. grade9-maths has only 82
  //   projected four-option MCQs and sat at 9.1% drift on a shuffle measured
  //   uniform over 4000 synthetic ids (26.6/24.3/23.8/25.3): that is noise, and
  //   failing it would train people to ignore this check.
  //   ⚠ The floor stays 8 points so a big pack cannot drift further than before.
  const se = placed ? Math.sqrt(0.25 * 0.75 / placed) : 1;
  const posTol = Math.max(0.08, 3 * se);
  const pMsg2 = pMsg + ' [tolerance ' + (100 * posTol).toFixed(1) + '% on n=' + placed + ']';
  if (worst <= posTol) {
    ok(pMsg2);
  } else if (base.pos !== undefined && worst <= base.pos + 0.002) {
    console.log('  DEBT  ' + pMsg2 + ' - pre-existing, capped at ' + (100 * base.pos).toFixed(1) + '%');
    debts++;
  } else if (base.pos !== undefined) {
    fail(pMsg2 + ' - WORSE than its recorded baseline of ' + (100 * base.pos).toFixed(1) + '%');
  } else {
    fail(pMsg2);
  }

  // The real papers never talk about the book the question came from.
  // ⚠ URLs ARE STRIPPED FIRST. `MIE` is the publisher, but `mie.ac.mu` is the
  //   Mauritius Institute of Education's real domain and a perfectly good
  //   example in an ICT question about reading a URL — g9ict-int-003 ("which
  //   part is the domain name?") was failed by this check for using a realistic
  //   Mauritian address. Same trick the contact form uses on its link filter:
  //   take the URLs out before judging the words.
  const deUrl = t => t.replace(/https?:\/\/\S+/gi, ' ').replace(/\bwww\.\S+/gi, ' ');
  // ⚠ `MIE` IS UPPERCASE AND WORD-BOUNDED, never a case-insensitive substring.
  //   `/MIE/i` matches inside ordinary French: le mieux, premiers, amies,
  //   ennemie - it reported 41 items in grade4-french and 114 in grade5-french,
  //   every one a false positive, the first time this harness saw those packs.
  const meta = qs.filter(q => {
    const t = deUrl(strip(q.question));
    return /MIE/.test(t) || /Pupil.s Book|textbook/i.test(t);
  });
  if (meta.length) fail(meta.length + ' question(s) reference the textbook in the question text: ' +
    meta.map(q => q.id).join(' '));
  else ok('no question refers to the textbook itself');
}

console.log('');
if (debts) {
  console.log(debts + ' pack(s) carry pre-existing answer-length debt — see BASELINE in this file.');
}
if (failures) {
  console.log(failures + ' check(s) FAILED');
  process.exit(1);
}
console.log('All option-parity checks passed.');
