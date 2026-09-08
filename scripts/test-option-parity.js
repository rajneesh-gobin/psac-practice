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
const PACKS = ['grade6-history', 'grade6-science'];

// Measured from the real papers (see past-papers/psac6). Thresholds sit a little
// above the papers so ordinary content variation does not fail the build.
const MAX_LONGEST_RATE = 0.42;   // papers are at chance, 0.25
const MAX_AVG_SPREAD = 12;       // papers measure 6.5 (hist-geo) and 6.8 (science)
const ANSWER_MIN_LEN = 25;       // below this, length carries no semantic signal

const strip = s => String(s == null ? '' : s)
  .replace(/<[^>]*>/g, '')
  .replace(/&nbsp;/g, ' ')
  .replace(/&[a-z#0-9]+;/g, '?')
  .trim();

let failures = 0;
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
  const four = qs.filter(q => Array.isArray(q.options) && q.options.length === 4);
  console.log('\n' + pack + '  (' + qs.length + ' questions, ' + four.length + ' four-option MCQs)');

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
    if (lens[ai] > maxOther) longest++;
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
  const msg = 'correct answer is the longest option ' + (100 * rate).toFixed(1) +
    '% (chance 25%, limit ' + (100 * MAX_LONGEST_RATE).toFixed(0) + '%)';
  rate > MAX_LONGEST_RATE ? fail(msg) : ok(msg);

  if (leaks) fail(leaks + ' question(s) where the correct answer is materially the longest: ' +
    leakIds.slice(0, 12).join(' ') + (leakIds.length > 12 ? ' …' : ''));
  else ok('no question gives its answer away by option length');

  const avgSpread = scored ? spreadTotal / scored : 0;
  const sMsg = 'average within-question option spread ' + avgSpread.toFixed(1) +
    ' chars (papers: 6.5-6.8, limit ' + MAX_AVG_SPREAD + ')';
  avgSpread > MAX_AVG_SPREAD ? fail(sMsg) : ok(sMsg);

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
  // 8 points of slack: at n≈300 the sampling noise alone is a few points.
  worst > 0.08 ? fail(pMsg) : ok(pMsg);

  // The real papers never talk about the book the question came from.
  const meta = qs.filter(q => /MIE|Pupil.s Book|textbook/i.test(strip(q.question)));
  if (meta.length) fail(meta.length + ' question(s) reference the textbook in the question text: ' +
    meta.map(q => q.id).join(' '));
  else ok('no question refers to the textbook itself');
}

console.log('');
if (failures) {
  console.log(failures + ' check(s) FAILED');
  process.exit(1);
}
console.log('All option-parity checks passed.');
