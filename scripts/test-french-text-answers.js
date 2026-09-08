'use strict';
// The `text` question type: PSAC French Q7A, « Corrige les erreurs soulignées ».
// The child TYPES the corrected word, so three things have to hold and none of
// them is visible by reading:
//
//   • the MATHS normaliser must not touch it. normalise() deletes "rs" anywhere
//     in the string — it was written to drop "Rs." from money answers — so
//     through it "cours" and "cou" are the same French word.
//   • accents are forgiven, because a phone keyboard that will not produce « é »
//     is a device problem, not a French mistake — but the child is told.
//   • EXCEPT where the accent is the whole question. « a » / « à », « ou » /
//     « où », « la » / « là » are standard PSAC homophone items, and blanket
//     accent-folding marks those correct whatever is typed. The factory refuses
//     to build such an item unless the author says strictAccents.
//
// Run: node scripts/test-french-text-answers.js
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

// ── load engine/helpers.js the way the browser does ───────────────────────
const helpers = fs.readFileSync(path.join(ROOT, 'engine/helpers.js'), 'utf8');
const ctx = { console, Math, JSON, String, Number, Array, Object, Boolean, Date, Error, RegExp };
ctx.window = ctx; ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(helpers, ctx, { filename: 'engine/helpers.js' });

const { foldAnswer, bareAnswer, matchTypedAnswer, makeText } = ctx;
const sandbox = require(path.join(ROOT, 'netlify/lib/questions-sandbox'));

let pass = 0;
const ck = (name, cond, detail) => {
  if (cond) { console.log('  ok   ' + name); pass++; return; }
  console.log('  FAIL ' + name + (detail !== undefined ? '  -> ' + detail : ''));
  process.exitCode = 1;
};
const accepts = (answer, typed, opts) => matchTypedAnswer([answer], typed, opts || null);

console.log('── the maths normaliser is the wrong tool, demonstrably ──');
ck('normalise() really does collapse "cours" onto "cou"',
  sandbox.normalise('cours') === sandbox.normalise('cou'));
ck('…and the French rule keeps them apart',
  !accepts('cours', 'cou').ok && accepts('cours', 'cours').ok);
ck('…and does not eat "toujours"', foldAnswer('toujours') === 'toujours', foldAnswer('toujours'));
ck('…or "alors"', foldAnswer('alors') === 'alors', foldAnswer('alors'));

console.log('');
console.log('── what a child may get away with ──');
ck('an exact answer', accepts('sont', 'sont').ok);
ck('wrong case', accepts('Sont', 'sont').ok && accepts('sont', 'SONT').ok);
ck('stray spaces', accepts('à travers', '  à travers ').ok);
ck('a curly apostrophe for a straight one', accepts("l'accueil", 'l’accueil').ok);
ck('a straight apostrophe for a curly one', accepts('l’accueil', "l'accueil").ok);
ck('a trailing full stop', accepts('attachés', 'attachés.').ok);

console.log('');
console.log('── accents: right, but say so ──');
{
  const m = accepts('évidemment', 'evidemment');
  ck('a missing accent is still correct', m.ok, JSON.stringify(m));
  ck('…and is flagged as a slip, so the review can show the spelling', m.slip === true);
}
{
  const m = accepts('attachés', 'attaches');
  ck('a missing accent on a participle is correct', m.ok && m.slip === true, JSON.stringify(m));
}
{
  const m = accepts('évidemment', 'évidemment');
  ck('the fully accented answer is NOT flagged as a slip', m.ok && m.slip === false);
}
ck('bareAnswer strips every accent', bareAnswer('à ç é ê î ô û') === 'a c e e i o u',
  bareAnswer('à ç é ê î ô û'));

console.log('');
console.log('── what must still be wrong ──');
ck('a missing plural s (environ for environs)', !accepts('environs', 'environ').ok);
ck('a missing agreement s (attaché for attachés)', !accepts('attachés', 'attaché').ok);
ck('the wrong homophone (son for sont)', !accepts('sont', 'son').ok);
ck('the wrong homophone (ce for se)', !accepts('se', 'ce').ok);
ck('an empty answer', !accepts('sont', '').ok);
ck('whitespace only', !accepts('sont', '   ').ok);

console.log('');
console.log('── the a/à guard: an item that would mark itself right cannot be built ──');
{
  let threw = null;
  try {
    makeText({ id: 'g6fr-corr-x', chapterId: 'g6fr-formation', difficulty: 2,
      subsection: 'homophones', question: 'Corrige : « Il ___ Port-Louis. »',
      answer: 'à', confusables: ['a'] });
  } catch (e) { threw = e.message; }
  ck('makeText THROWS on à vs a with no strictAccents', !!threw, String(threw));
  ck('…and the message says what to do', /strictAccents/.test(threw || ''), threw);
}
{
  let threw = null;
  try {
    makeText({ id: 'g6fr-corr-y', chapterId: 'g6fr-formation', difficulty: 2,
      subsection: 'homophones', question: 'Corrige : « ___ vas-tu ? »',
      answer: 'où', confusables: ['ou'] });
  } catch (e) { threw = e.message; }
  ck('the same for où vs ou', !!threw);
}
{
  const q = makeText({ id: 'g6fr-corr-z', chapterId: 'g6fr-formation', difficulty: 2,
    subsection: 'homophones', question: 'Corrige : « Il ___ Port-Louis. »',
    answer: 'à', confusables: ['a'], strictAccents: true });
  ck('with strictAccents it builds', q && q.type === 'text');
  ck('…and "a" is then REFUSED for "à"', !matchTypedAnswer(q.acceptableAnswers, 'a', q).ok);
  ck('…while "à" is accepted', matchTypedAnswer(q.acceptableAnswers, 'à', q).ok);
}
{
  // The ordinary case: nothing confusable differs only by an accent.
  const q = makeText({ id: 'g6fr-corr-w', chapterId: 'g6fr-formation', difficulty: 2,
    subsection: 'homophones', question: 'Corrige : « Les chevaux ___ nerveux. »',
    answer: 'sont', confusables: ['son'] });
  ck('a non-accent confusable builds fine', q.type === 'text' && q.strictAccents === false);
  ck('…and still refuses the confusable', !matchTypedAnswer(q.acceptableAnswers, 'son', q).ok);
  ck('…and carries alsoAccept through', makeText({ id: 'i', chapterId: 'c', difficulty: 1,
    subsection: 's', question: 'q', answer: 'tout', alsoAccept: ['tous'] })
    .acceptableAnswers.length === 2);
}

console.log('');
console.log('── the copy that actually ships ──');
// ⚠ makeCloze was defined in all three server copies and left OUT of their
// exported context, so every text was silently absent from the built bundle
// while the source read correctly. That export line is the half that ships.
for (const [name, file, fn] of [
  ['sandbox',   'netlify/lib/questions-sandbox.js', 'buildContext'],
  ['questions', 'netlify/functions/questions.js',   '_buildContext'],
  ['build',     'netlify/build-questions.js',       '_buildContext'],
]) {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const defined = /function makeText\(/.test(src);
  const start = src.indexOf('function ' + fn + '(');
  // ⚠ Match the CONTEXT export line, not the first `return {` after the
  // function start — that one belongs to makeMCQ and contains no factory names.
  const returnLine = src.slice(start).split(/\r?\n/)
    .find(l => /return \{/.test(l) && /makeMCQ, makeNum/.test(l));
  const exported = !!returnLine && /\bmakeText\b/.test(returnLine);
  ck(name + ': makeText is defined', defined);
  ck(name + ': makeText is EXPORTED in the sandbox context', exported,
    returnLine ? returnLine.slice(0, 110) : 'no return found');
}

console.log('');
console.log('── the renderer must not treat it as a number ──');
{
  const app = fs.readFileSync(path.join(ROOT, 'engine/app.js'), 'utf8');
  const textBranch = app.indexOf("} else if (q.type === 'text') {");
  const numBranch  = app.indexOf('inputmode="decimal"');
  ck('app.js has a text render branch', textBranch > 0);
  ck('…and it comes BEFORE the numeric one', textBranch > 0 && textBranch < numBranch,
    textBranch + ' vs ' + numBranch);
  const branch = app.slice(textBranch, textBranch + 2000);
  ck('…using inputmode="text", not decimal', /inputmode="text"/.test(branch));
  ck('…with spellcheck off, or the browser hands over the answer',
    /spellcheck="false"/.test(branch));
  ck('…and autocorrect off', /autocorrect="off"/.test(branch));
  ck('…and it shows the accented spelling on a slip', /txt-slip/.test(branch));

  const engine = fs.readFileSync(path.join(ROOT, 'engine/questions_engine.js'), 'utf8');
  const excluded = engine.match(/_POOL_TYPES_EXCLUDED = new Set\(\[([^\]]*)\]\)/);
  ck('text is NOT excluded from practice and exam pools',
    !!excluded && !/text/.test(excluded[1]), excluded && excluded[1]);
}

console.log('');
console.log('── client and server must agree, or the re-grade contradicts the child ──');
{
  const q = makeText({ id: 'g6fr-corr-s', chapterId: 'g6fr-formation', difficulty: 2,
    subsection: 'homophones', question: 'q', answer: 'attachés', confusables: ['attaché'] });
  for (const [typed, want] of [['attachés', true], ['attaches', true], ['attaché', false],
                               ['ATTACHÉS', true], ['', false]]) {
    const client = matchTypedAnswer(q.acceptableAnswers, typed, q).ok;
    const server = sandbox.checkAnswer(q, typed);
    ck('server agrees with client on "' + typed + '" (' + want + ')',
      client === want && server === want, 'client ' + client + ' / server ' + server);
  }
}

console.log('');
console.log(process.exitCode
  ? 'french text answers: FAILURES above'
  : 'French typed-answer checks passed: ' + pass + ' checks. Accents forgiven, homophones not.');
