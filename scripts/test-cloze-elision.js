'use strict';
// Elision in French cloze answers.
//
// ⚠⚠ WHY THIS EXISTS. Part B of a Grade 6 texte à trous is TYPED, so every gap
//    carries a list of accepted answers. When those lists were written, "que"
//    and "qu'" were offered together almost everywhere — but only ONE of them
//    is correct, and which one depends entirely on the word that follows:
//        « le bruit que faisait le train »   (consonant → que)
//        « plus cher qu'entretenir »          (vowel     → qu')
//    Accepting the wrong one is not leniency in this exercise. Elision IS the
//    grammar being examined, so marking « que il » right teaches the mistake
//    the question was set to catch. And the FIRST entry in the list is the
//    model answer printed on the answer key, so a wrong lead entry puts bad
//    French in front of the parent doing the marking.
//
// ⚠ This checks a MECHANICAL rule, not French. It cannot tell whether "mais"
//   or "pourtant" is the better connector. It can tell that an elided form
//   stands before a consonant, which is always wrong, and that an unelided one
//   stands before a vowel, which is always wrong too.
//
// Run: node scripts/test-cloze-elision.js
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
let pass = 0, fail = 0;
const bad = [];
const check = (ok, label) => { if (ok) { pass++; return; } fail++; if (bad.length < 40) bad.push(label); };

// Words that MUST elide before a vowel or mute h, written as [unelided, elided].
// ⚠ Longest first: "parce que" has to be tested before "que", or every one of
//   them reports as a bare "que".
const ELIDERS = [
  ['jusqu\'à ce que', 'jusqu\'à ce qu\''],
  ['parce que', 'parce qu\''],
  ['puisque', 'puisqu\''],
  ['lorsque', 'lorsqu\''],
  ['bien que', 'bien qu\''],
  ['ce que', 'ce qu\''],
  ['quoique', 'quoiqu\''],
  ['presque', 'presqu\''],
  ['que', 'qu\''],
  ['de', 'd\''],
  ['ne', 'n\''],
  ['se', 's\''],
  ['le', 'l\''],
  ['la', 'l\''],
  ['je', 'j\''],
  ['me', 'm\''],
  ['te', 't\''],
  ['ce', 'c\''],
];

// ⚠ A LEADING VOWEL IS NOT THE WHOLE RULE. French h is either mute (elides:
//   l'heure, l'homme) or aspirate (does not: le héros, la hauteur), and there
//   is no way to tell from the spelling. Rather than guess, h-words are SKIPPED
//   and reported as unchecked — a wrong answer this file cannot see is better
//   than a right answer it rejects.
const VOWEL = /^[aeiouàâäéèêëîïôöùûü]/i;
const startsH = w => /^h/i.test(w);

const files = [];
for (const g of [4, 5, 6]) {
  const dir = path.join(ROOT, `subjects/grade${g}-french/questions`);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) if (/trous/i.test(f)) files.push(`grade${g}-french`);
}
check(files.length > 0, 'found the French cloze packs');

const bundles = path.join(ROOT, 'netlify/question-bundles');
const items = [];
for (const p of [...new Set(files)]) {
  let j;
  try { j = JSON.parse(fs.readFileSync(path.join(bundles, p + '.json'), 'utf8')); } catch (_) { continue; }
  for (const q of (Array.isArray(j) ? j : (j.questions || []))) {
    if (q && q.type === 'cloze') items.push(Object.assign({ _pack: p }, q));
  }
}
check(items.length > 0, 'loaded French cloze items from the bundles');

let checkedGaps = 0, skippedH = 0;
for (const cz of items) {
  const gapsA = cz.gapsA || cz.gapAnswers.length;
  const whole = String(cz.text || '') + ' ' + String(cz.textB || '');
  for (let i = 0; i < cz.gapAnswers.length; i++) {
    const n = i + 1;
    const at = whole.indexOf('{' + n + '}');
    if (at < 0) continue;
    // The first word after the gap, ignoring punctuation and spaces.
    const after = whole.slice(at + String('{' + n + '}').length).replace(/^[\s,;:!?»"'’]*/, '');
    const nextWord = (after.match(/^[\wàâäçéèêëîïôöùûüœ'’-]+/i) || [''])[0];
    if (!nextWord) continue;
    if (startsH(nextWord)) { skippedH++; continue; }
    const vowelNext = VOWEL.test(nextWord);

    for (const ans of (cz.gapAlts[i] || [])) {
      const a = String(ans).trim();
      for (const [plain, elided] of ELIDERS) {
        if (a.toLowerCase() === elided) {
          checkedGaps++;
          check(vowelNext,
            `${cz.id} gap ${n}: "${a}" is elided but the next word is "${nextWord}" — should be "${plain}"`);
          break;
        }
        if (a.toLowerCase() === plain) {
          checkedGaps++;
          check(!vowelNext,
            `${cz.id} gap ${n}: "${a}" stands before the vowel in "${nextWord}" — should be "${elided}"`);
          break;
        }
      }
    }
  }
}

console.log(`checked ${checkedGaps} elidable answers across ${items.length} items` + (skippedH ? `, ${skippedH} h-words skipped` : ''));
console.log(`${pass} passed, ${fail} failed`);
if (bad.length) { console.log('\nfailures:'); bad.forEach(b => console.log('  ✗ ' + b)); }
process.exit(fail ? 1 : 0);
