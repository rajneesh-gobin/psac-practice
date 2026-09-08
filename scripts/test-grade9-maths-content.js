'use strict';
// ── Grade 9 Mathematics content: schema, invariants, and RE-DERIVED answers ─
//
//   node scripts/test-grade9-maths-content.js
//
// ⚠ The point of this harness is that it does NOT trust the question files.
//   Where an answer can be recomputed from the question text, it is — the
//   index arithmetic is evaluated, and every gradient and intercept is derived
//   from the two points named in the prompt. A table where someone typed the
//   wrong answer looks exactly like a table where they typed the right one,
//   and a child practising a wrong answer is worse than no question at all.

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const A = require(path.join(__dirname, '..', 'engine', 'assessment.js'));

const ROOT = path.join(__dirname, '..');
const DIR = path.join(ROOT, 'subjects', 'grade9-maths', 'questions');

let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  ✗ ' + m); } };

// ── Load the pack the way the builder does ────────────────────────────────
const STATIC_QUESTIONS = [];
const sandbox = { STATIC_QUESTIONS, makeTask: A.makeTask, console };
vm.createContext(sandbox);
for (const file of fs.readdirSync(DIR).filter(f => f.endsWith('.js')).sort()) {
  const code = fs.readFileSync(path.join(DIR, file), 'utf8');
  try { new vm.Script(code, { filename: file }).runInContext(sandbox); }
  catch (e) { fail++; console.log(`  ✗ ${file} threw: ${e.message}`); }
}
const tasks = STATIC_QUESTIONS.filter(t => t && t.type === 'task');
console.log(`loaded ${tasks.length} tasks, ${tasks.reduce((s, t) => s + t.parts.length, 0)} parts, ` +
            `${tasks.reduce((s, t) => s + t.parts.reduce((a, p) => a + p.marks, 0), 0)} marks`);

// ── Schema ────────────────────────────────────────────────────────────────
console.log('schema');
ok(tasks.length > 0, 'the pack produced tasks');
let schemaBad = 0;
for (const t of tasks) { const e = A.validateTask(t); if (e.length) { schemaBad++; console.log('    ' + e[0]); } }
ok(schemaBad === 0, `every task validates — ${schemaBad} failed`);

// ── Identity ──────────────────────────────────────────────────────────────
console.log('identity');
const ids = tasks.map(t => t.id);
const dupIds = ids.filter((v, i) => ids.indexOf(v) !== i);
ok(dupIds.length === 0, `task ids are unique — duplicates: ${[...new Set(dupIds)].join(', ')}`);
ok(ids.every(i => /^g9m-[a-z]+-\d{3}$/.test(i)), 'every id follows g9m-<chapter>-NNN');

// ⚠ A near-duplicate is padding, and the brief forbids it — but DIGITS ARE
//   KEPT. Stripping them collapsed "Evaluate 5^0" and "Evaluate 2^-4" into one
//   shape and reported 12 duplicates that were nothing of the kind. In
//   mathematics the numbers are the question, and the real papers ask the same
//   shape with different values on every page. Two prompts are duplicates only
//   when they are the same prompt.
const norm = s => String(s).replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '-')
  .replace(/\s+/g, ' ').trim().toLowerCase();
const prompts = {};
for (const t of tasks) for (const p of t.parts) {
  const k = norm(p.prompt);
  (prompts[k] = prompts[k] || []).push(t.id);
}
const nearDup = Object.entries(prompts).filter(([, v]) => v.length > 1);
ok(nearDup.length === 0,
   `no two questions share an identical prompt — ${nearDup.map(([k, v]) => `"${k.slice(0, 45)}" = ${v.join('+')}`).slice(0, 3).join('; ')}`);

// ── The declared-vs-tagged subsection invariant ───────────────────────────
console.log('subsections');
const manifest = fs.readFileSync(path.join(ROOT, 'subjects', 'grade9-maths', '_manifest.js'), 'utf8');
// ⚠ THE MANIFEST IS EVALUATED, NOT PARSED LINE BY LINE. This used to walk
//   the source with two regexes, and it had already been wrong once (as
//   `[a-z_]+` it silently skipped `ratios_and_2d_problems` and reported its
//   questions as undeclared - a failure that read like a content error and
//   was a regex error). It then broke a second time when the subsection map
//   moved to the canonical `{ subsections: [ {id, name} ] }` shape that
//   app.js's renderSyllabus() actually reads: the parser found nothing and
//   reported all 25 subsections as undeclared. Reading source text where a
//   value is meant is the same mistake in both directions.
const declared = (function () {
  const i = manifest.indexOf('const G9M_SYLLABUS = {');
  const open = manifest.indexOf('{', i);
  let depth = 0, close = -1;
  for (let k = open; k < manifest.length; k++) {
    if (manifest[k] === '{') depth++;
    else if (manifest[k] === '}') { depth--; if (depth === 0) { close = k + 1; break; } }
  }
  const obj = require('vm').runInNewContext('(' + manifest.slice(open, close) + ')');
  const out = {};
  for (const [ch, v] of Object.entries(obj)) {
    out[ch] = new Set((v && v.subsections ? v.subsections : []).map(x => x.id));
  }
  return out;
})();
const tagged = {};
for (const t of tasks) {
  (tagged[t.chapterId] = tagged[t.chapterId] || new Set()).add(t.subsection);
}
for (const ch of Object.keys(tagged)) {
  const d = declared[ch] || new Set();
  for (const s of tagged[ch]) ok(d.has(s), `${ch}: subsection "${s}" is tagged but NOT declared — its questions would be invisible`);
}
for (const ch of Object.keys(declared)) {
  const g = tagged[ch] || new Set();
  for (const s of declared[ch]) ok(g.has(s), `${ch}: subsection "${s}" is declared but has NO questions — it would open empty`);
}

// ⚠ 20 per declared subsection is the floor the brief sets before a subject
//   can be enabled. It is reported, and enforced, per subsection.
for (const ch of Object.keys(tagged)) {
  for (const s of tagged[ch]) {
    const n = tasks.filter(t => t.chapterId === ch && t.subsection === s).length;
    ok(n >= 20, `${ch}/${s}: ${n} items — the floor before a subject may be enabled is 20`);
  }
}

// ── Every chapter tagged must exist in the manifest ───────────────────────
// ⚠ Accept either quote style. The manifest writes ids in single quotes, and
//   matching only double reported every real chapter as missing.
const chapterIds = new Set([...manifest.matchAll(/id:\s*['"](g9m-[a-z-]+)['"]/g)].map(m => m[1]));
for (const ch of Object.keys(tagged)) ok(chapterIds.has(ch), `chapter "${ch}" exists in the manifest`);

// ── Answers, RE-DERIVED ───────────────────────────────────────────────────
console.log('answers re-derived from the question text');

// Strip HTML and turn the paper's entities back into characters.
const plain = s => String(s)
  .replace(/<sup>(.*?)<\/sup>/g, '^$1')
  .replace(/<[^>]+>/g, '')
  .replace(/&minus;/g, '-').replace(/&times;/g, '*').replace(/&divide;/g, '/')
  .replace(/&frasl;/g, '/').replace(/&ne;/g, '!=').replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ').trim();

// 1. Index arithmetic: "a^5 * a^3" -> a^8, "(m^3)^5" -> m^15, "x^7 / x^2".
//    Only the single-letter, single-variable forms are re-derived; anything
//    more complex is left to the reviewer rather than half-checked.
let derived = 0, wrong = 0;
for (const t of tasks.filter(t => t.chapterId === 'g9m-indices')) {
  // ⚠ `want` goes through plain() too. A multiple-choice answer is an OPTION
  //   string and options are HTML — "x<sup>10</sup>" — so comparing it raw
  //   against the derived "x^10" reported a correct question as wrong. Running
  //   both sides through the same normaliser means the derivation checks the
  //   MCQ items as well, which is stronger than skipping them.
  const p = t.parts[0], q = plain(p.prompt), want = plain(p.response.answer);
  let m;
  if ((m = q.match(/^Simplify ([a-z])\^(\d+) \* \1\^(\d+)\.$/))) {
    derived++; const got = `${m[1]}^${+m[2] + +m[3]}`;
    if (got !== want) { wrong++; console.log(`  ✗ ${t.id}: derived ${got}, file says ${want}`); }
  } else if ((m = q.match(/^Simplify \(([a-z])\^(\d+)\)\^(\d+)\.$/))) {
    derived++; const got = `${m[1]}^${+m[2] * +m[3]}`;
    if (got !== want) { wrong++; console.log(`  ✗ ${t.id}: derived ${got}, file says ${want}`); }
  } else if ((m = q.match(/^Simplify ([a-z])\^(\d+) \/ \1\^(\d+)\.$/))) {
    derived++; const got = `${m[1]}^${+m[2] - +m[3]}`;
    if (got !== want) { wrong++; console.log(`  ✗ ${t.id}: derived ${got}, file says ${want}`); }
  } else if ((m = q.match(/^Evaluate (\d+)\^(\d+) \/ \1\^(\d+)\.$/))) {
    derived++; const got = String(Math.pow(+m[1], +m[2] - +m[3]));
    if (got !== want) { wrong++; console.log(`  ✗ ${t.id}: derived ${got}, file says ${want}`); }
  } else if ((m = q.match(/^Evaluate (\d+)\^0\.$/))) {
    derived++; if (want !== '1') { wrong++; console.log(`  ✗ ${t.id}: x^0 is 1, file says ${want}`); }
  } else if ((m = q.match(/^Evaluate (\d+)\^-(\d+)\.$/))) {
    derived++; const got = `1/${Math.pow(+m[1], +m[2])}`;
    if (!A.markPart(p, got).correct) { wrong++; console.log(`  ✗ ${t.id}: derived ${got}, file says ${want}`); }
  }
}
ok(wrong === 0, `index arithmetic re-derived for ${derived} items — ${wrong} disagreed`);
ok(derived >= 8, `enough index items were machine-checkable — ${derived}`);

// 2. Coordinates: derive the gradient (and intercept) from the two points
//    named in the prompt, independently of what the file claims.
let cd = 0, cwrong = 0;
const ratStr = (n, d) => {
  const g = (a, b) => (b ? g(b, a % b) : Math.abs(a));
  if (d < 0) { n = -n; d = -d; }
  const k = g(n, d) || 1;
  return (d / k === 1) ? String(n / k) : `${n / k}/${d / k}`;
};
for (const t of tasks.filter(t => t.chapterId === 'g9m-coordinates')) {
  for (const p of t.parts) {
    if (!p.response || p.response.kind === 'drawing') continue;
    const q = plain(p.prompt);
    const pts = [...q.matchAll(/\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)/g)].map(m => [+m[1], +m[2]]);
    if (pts.length !== 2) continue;
    const [[x1, y1], [x2, y2]] = pts;
    if (x1 === x2) continue;                       // vertical: no gradient
    const want = String(p.response.answer);
    if (/gradient/i.test(q)) {
      cd++;
      const got = ratStr(y2 - y1, x2 - x1);
      if (!A.markPart(p, got).correct) { cwrong++; console.log(`  ✗ ${t.id}: derived gradient ${got}, file says ${want}`); }
    } else if (/equation/i.test(q) && (y2 - y1) % (x2 - x1) === 0) {
      cd++;
      const m0 = (y2 - y1) / (x2 - x1), c0 = y1 - m0 * x1;
      const got = `y=${m0 === 1 ? '' : m0 === -1 ? '-' : m0}x${c0 === 0 ? '' : (c0 > 0 ? '+' + c0 : c0)}`;
      if (A.normaliseExpression(got) !== A.normaliseExpression(want)) {
        cwrong++; console.log(`  ✗ ${t.id}: derived ${got}, file says ${want}`);
      }
    }
  }
}
ok(cwrong === 0, `gradients/equations re-derived from their points for ${cd} items — ${cwrong} disagreed`);
ok(cd >= 15, `enough coordinate items were machine-checkable — ${cd}`);

// ── Subject rules the chapter headers claim ───────────────────────────────
// ⚠ These exist because the file headers ASSERT them. A comment that promises
//   a rule nothing enforces is worth less than no comment: it tells the next
//   author the check has been done.
console.log('subject rules');

// 1. Trigonometry: calculators are forbidden, so any angle whose ratio a
//    candidate cannot know by heart must have that ratio supplied in the stem.
const KNOWN_BY_HEART = new Set(['0', '30', '45', '60', '90']);
let trigBad = 0;
for (const t of tasks.filter(t => t.chapterId === 'g9m-trigonometry')) {
  const text = plain((t.intro || '') + ' ' + t.parts.map(p => p.prompt).join(' '));
  const angles = [...text.matchAll(/(\d+)\s*(?:°|deg)/gi)].map(m => m[1]);
  const needsRatio = angles.filter(a => !KNOWN_BY_HEART.has(a));
  const supplies = /given[^\]]*\b(sin|cos|tan)\b/i.test(text);
  // An item that only NAMES a standard angle needs nothing; one that asks the
  // candidate to USE a ratio of a non-standard angle must supply it.
  if (needsRatio.length && !supplies) {
    trigBad++; console.log(`  ✗ ${t.id}: uses ${needsRatio.join(', ')}° without supplying a ratio`);
  }
}
ok(trigBad === 0, `every trigonometry item supplies the ratios it needs — ${trigBad} did not`);

// The syllabus excludes angle of elevation and depression at Grade 9.
const elevBad = tasks.filter(t => t.chapterId === 'g9m-trigonometry')
  .filter(t => /elevation|depression/i.test(plain((t.intro || '') + t.parts.map(p => p.prompt).join(' '))));
ok(elevBad.length === 0,
   `no trigonometry item uses elevation or depression, which the syllabus excludes — ${elevBad.map(t => t.id).join(', ')}`);

// 2. Probability: a probability is never negative and never greater than 1.
let probBad = 0;
for (const t of tasks.filter(t => t.chapterId === 'g9m-probability')) {
  for (const p of t.parts) {
    const r = p.response || {};
    if (r.kind !== 'number') continue;
    // ⚠ Only the parts that ASK for a probability. Two false positives on
    //   the first run: "The probability of drawing a red ball is 2/7 ... find
    //   the TOTAL number of balls" and "...the probability equals 3/5, find
    //   the VALUE of x" both mention a probability and both answer with
    //   something else. The test is: some sentence must both give an
    //   instruction and name a probability, AND the response must not name an
    //   unknown it is solving for.
    if (r.label) continue;
    const asksForP = plain(p.prompt).split(/(?<=[.?])s+/)
      .some(sen => /(find|write down|calculate)/i.test(sen) && /probability/i.test(sen));
    if (!asksForP) continue;
    const rat = A.toRational(String(r.answer));
    const v = rat ? rat.n / rat.d : parseFloat(String(r.answer));
    if (!isFinite(v) || v < 0 || v > 1) {
      probBad++; console.log(`  ✗ ${t.id} (${p.label}): probability ${r.answer} is outside 0 to 1`);
    }
  }
}
ok(probBad === 0, `every probability answer lies between 0 and 1 — ${probBad} did not`);

// 3. Simultaneous equations: RE-SOLVE the pair, reading the coefficients out
//    of the PROMPT ITSELF.
//    ⚠ The first version had each item carry an `eqs` array beside its prompt.
//      makeTask dropped it — correctly, since the schema should not ferry
//      arbitrary fields — and the check silently measured nothing. Parsing the
//      printed equations is better anyway: a stored coefficient array is one
//      more thing an author can get wrong, while the text is what the candidate
//      actually sees.
const parseLinear = line => {
  const s = line.replace(/\s+/g, '');
  const m = s.match(/^([+-]?\d*)x([+-]\d*)y=(-?\d+)$/);
  if (!m) return null;
  const coef = c => (c === '' || c === '+') ? 1 : (c === '-') ? -1 : Number(c);
  return [coef(m[1]), coef(m[2]), Number(m[3])];
};
let simDone = 0, simBad = 0;
for (const t of tasks.filter(t => t.chapterId === 'g9m-simultaneous')) {
  for (const p of t.parts) {
    const r = p.response || {};
    if (r.kind !== 'blanks') continue;
    // ⚠ <br> must become a line break before the tags are stripped, or the two
    //   equations run together as "3x - y = 72x + 3y = 1" and the parser reads
    //   the constant of the first as 72. The paper prints them on two lines and
    //   so must this.
    // ⚠ SPLIT ON THE LINE BREAKS FIRST, then clean each piece. Running plain()
    //   over the whole prompt collapses every space including the newlines, so
    //   the two equations ran together as "3x - y = 72x + 3y = 1" and the
    //   parser read the first constant as 72. The paper prints them on two
    //   lines and the check has to see two lines.
    const lines = String(p.prompt).split(/<br\s*\/?>|<\/div>|<div[^>]*>/i)
      .map(plain).map(l => l.trim())
      .filter(l => /x/.test(l) && /y/.test(l) && /=/.test(l));
    const eqs = lines.map(parseLinear).filter(Boolean);
    if (eqs.length !== 2) continue;
    const [[a1, b1, c1], [a2, b2, c2]] = eqs;
    const det = a1 * b2 - a2 * b1;
    if (!det) { simBad++; console.log(`  ✗ ${t.id}: the two equations are not independent`); continue; }
    const x = (c1 * b2 - c2 * b1) / det;
    const y = (a1 * c2 - a2 * c1) / det;
    simDone++;
    const want = (p.response.answer || []).map(a => Number(Array.isArray(a) ? a[0] : a));
    if (want[0] !== x || want[1] !== y) {
      simBad++;
      console.log(`  ✗ ${t.id}: solving the pair gives x=${x}, y=${y}; the file says x=${want[0]}, y=${want[1]}`);
    }
  }
}
ok(simBad === 0, `every simultaneous pair re-solved from its own coefficients — ${simDone} checked, ${simBad} disagreed`);
ok(simDone >= 15, `enough simultaneous items carry their coefficients — ${simDone}`);

// 4. A quadratic has two roots and the papers never say which to write first,
//    so BOTH orders must mark correct. This is the property the `roots()`
//    helper exists to give; without a check it is only an intention.
// Read "Solve p^2 - 10p + 10 = -14." into { a, b, c } for ax² + bx + c = 0,
// moving whatever is on the right across. Any single letter may be the unknown.
function parseQuadratic(text) {
  const m = text.match(/Solve\s+(.+?)\.?\s*$/i);
  if (!m) return null;
  const eq = m[1].replace(/\s+/g, '');
  const sides = eq.split('=');
  if (sides.length !== 2) return null;
  const v = (eq.match(/[a-z]/i) || [])[0];
  if (!v) return null;
  const side = (s, sign) => {
    let a = 0, b = 0, c = 0, seen = 0;
    const re = new RegExp('([+-]?)(\\d*)(?:' + v + '(\\^2|\\u00b2)?)?', 'gi');
    let mm;
    while ((mm = re.exec(s)) !== null) {
      if (!mm[0]) { re.lastIndex++; if (re.lastIndex > s.length) break; continue; }
      seen++;
      const sg = mm[1] === '-' ? -1 : 1;
      const num = mm[2] === '' ? 1 : Number(mm[2]);
      const hasVar = mm[0].toLowerCase().indexOf(v.toLowerCase()) !== -1;
      if (hasVar && mm[3]) a += sign * sg * num;
      else if (hasVar) b += sign * sg * num;
      else c += sign * sg * (mm[2] === '' ? 0 : Number(mm[2]));
    }
    return seen ? { a, b, c } : null;
  };
  const L = side(sides[0], 1), R = side(sides[1], -1);
  if (!L || !R) return null;
  const q = { a: L.a + R.a, b: L.b + R.b, c: L.c + R.c };
  return q.a ? q : null;
}

let ordDone = 0, ordBad = 0, qDone = 0;
for (const t of tasks.filter(t => t.chapterId === 'g9m-quadratics')) {
  for (const p of t.parts) {
    const r = p.response || {};
    if (r.kind !== 'blanks' || (r.answer || []).length !== 2) continue;
    ordDone++;
    const a = String(r.answer[0][0]), b = String(r.answer[1][0]);
    const fwd = A.markPart(p, JSON.stringify([a, b])).correct;
    const rev = A.markPart(p, JSON.stringify([b, a])).correct;
    if (!fwd || !rev) {
      ordBad++;
      console.log(`  ✗ ${t.id}: roots ${a}, ${b} — forward ${fwd}, reversed ${rev}; both must be accepted`);
    }
    // And a wrong root must still be refused, or the leniency is a hole.
    if (A.markPart(p, JSON.stringify([a, '999'])).correct) {
      ordBad++; console.log(`  ✗ ${t.id}: accepts a wrong second root`);
    }
    // ⚠ SUBSTITUTE BOTH ROOTS BACK INTO THE EQUATION. Order-acceptance and
    //   self-marking only prove the item is internally consistent: planting
    //   roots(2, 9) on "x² − 5x + 6 = 0" passed both, because nothing had
    //   looked at the equation. This does.
    const q = parseQuadratic(plain(p.prompt));
    if (q) {
      qDone++;
      for (const rt of [Number(a), Number(b)]) {
        const v = q.a * rt * rt + q.b * rt + q.c;
        if (Math.abs(v) > 1e-9) {
          ordBad++;
          console.log(`  ✗ ${t.id}: root ${rt} does not satisfy ${q.a}x² + ${q.b}x + ${q.c} = 0 (gives ${v})`);
        }
      }
    }
  }
}
ok(qDone >= 8, `enough quadratics were re-checked by substituting their roots — ${qDone}`);
ok(ordBad === 0, `every quadratic accepts its two roots in either order and refuses a wrong one — ${ordDone} checked, ${ordBad} failed`);
ok(ordDone >= 8, `enough quadratics were checked for root order — ${ordDone}`);

// ── Marking sanity: the stated answer must mark itself correct ────────────
console.log('self-marking');
let selfBad = 0;
// ⚠ `blanks` and `cells` store an ARRAY OF ACCEPTED LISTS, one per blank —
//   [['2','3'], ['3','2']] for a quadratic whose two roots may be written in
//   either order. Feeding that nested array back in as the candidate's answer
//   compares an array against a string and fails every such item. The model
//   answer is the FIRST alternative of each blank, which is what a candidate
//   would actually write.
const modelAnswer = r => {
  if (r.kind !== 'blanks' && r.kind !== 'cells') return r.answer;
  return JSON.stringify((r.answer || []).map(a => String(Array.isArray(a) ? a[0] : a)));
};
for (const t of tasks) for (const p of t.parts) {
  if (!p.response || !A.isAutoMarked(p.response.kind)) continue;
  const given = modelAnswer(p.response);
  const r = A.markPart(p, given);
  if (!r.correct) { selfBad++; console.log(`  ✗ ${t.id} (${p.label}): its own answer ${JSON.stringify(given)} does not mark correct`); }
}
ok(selfBad === 0, `every stated answer marks itself correct — ${selfBad} did not`);

// And an obviously wrong answer must NOT be accepted, or the marker is broken.
let looseBad = 0;
for (const t of tasks) for (const p of t.parts) {
  const r = p.response;
  if (!r || !A.isAutoMarked(r.kind) || r.kind === 'choice' || r.kind === 'multi') continue;
  if (A.markPart(p, 'zzz-not-an-answer').correct) { looseBad++; console.log(`  ✗ ${t.id}: accepts nonsense`); }
}
ok(looseBad === 0, `no question accepts a nonsense answer — ${looseBad} did`);

// ── Content-quality rules from the brief ──────────────────────────────────
console.log('content quality');
let noHint = 0, noExp = 0, leak = 0;
for (const t of tasks) for (const p of t.parts) {
  const auto = p.response && A.isAutoMarked(p.response.kind);
  if (auto && !p.hint) noHint++;
  if (auto && !p.explanation) noExp++;
  // ⚠ A prompt must not contain its own answer — that is a free mark.
  // ⚠ TOKENS, NOT SUBSTRINGS. Stripping the spaces and searching for the answer
  //   inside the prompt flagged two perfectly good questions: an answer of 3000
  //   was "found" inside the prompt's "Rs 23 000", and 30000 inside "Rs
  //   300 000". A number only gives the answer away when it appears as a number
  //   in its own right.
  if (auto && p.response.answer && String(p.response.answer).length > 2) {
    const ans = A.normaliseText(String(p.response.answer)).toLowerCase();
    const flat = plain(p.prompt).toLowerCase();
    let found;
    // ⚠ A VALUE WITH A UNIT IS STILL A NUMBER. "4 cm" fell to the substring
    //   branch below and was "found" inside the prompt's "64 cm3" — a false
    //   positive on a perfectly good question. Strip a trailing unit or a
    //   leading currency and compare the number as a token.
    const numOnly = ans.replace(/^(rs|\$|€)\s*/, '')
                       .replace(/\s*(cm|mm|m|km|kg|g|ml|cl|l|%|°|cm2|cm3|cm²|cm³|min|minutes|hours?|days?|marks?|dots?|balls?|cubes?|glasses|cupfuls|students?|pupils?|goals per match|km\/h)$/, '')
                       .trim();
    if (/^-?[\d\s.,]+$/.test(numOnly) && numOnly !== '') {
      const target = numOnly.replace(/[\s,]/g, '');
      const nums = (flat.match(/-?\d[\d\s]*(?:\.\d+)?/g) || []).map(n => n.replace(/\s/g, ''));
      found = nums.indexOf(target) !== -1;
    } else {
      found = flat.replace(/\s/g, '').includes(ans.replace(/\s/g, ''));
    }
    if (found) {
      leak++; console.log(`  ✗ ${t.id}: the prompt contains its own answer "${p.response.answer}"`);
    }
  }
}
ok(noHint === 0, `every auto-marked part has a hint — ${noHint} missing`);
ok(noExp === 0, `every auto-marked part has a worked explanation — ${noExp} missing`);
ok(leak === 0, `no prompt gives away its own answer — ${leak} did`);

// Every task must cite the syllabus outcome and paper pattern behind it.
ok(tasks.every(t => t.source), 'every task carries a source note');

// Difficulty must span the range, not sit on one level.
const diffs = {};
tasks.forEach(t => { diffs[t.difficulty] = (diffs[t.difficulty] || 0) + 1; });
ok(Object.keys(diffs).length >= 3, `difficulty spans at least 3 levels — ${JSON.stringify(diffs)}`);

// ── Visual assets ─────────────────────────────────────────────────────────
console.log('visual assets');
const withStim = tasks.filter(t => t.stimulus && t.stimulus.html);
ok(withStim.every(t => t.stimulus.altText && t.stimulus.altText.length > 10),
   'every stimulus has useful alternative text');
for (const t of withStim) {
  const alt = t.stimulus.altText.toLowerCase();
  const ans = t.parts.map(p => String((p.response || {}).answer || '')).join(' ').toLowerCase();
  ok(!ans || !alt.includes(ans.replace(/[()]/g, '')),
     `${t.id}: alt text does not reveal the answer`);
  // ⚠ A TABLE IS A LEGITIMATE STIMULUS. The papers use them constantly — a
  //   CEB tariff, a frequency table, a possibility diagram — and demanding
  //   an <svg> flagged five perfectly good utility-bill questions. What
  //   matters is that the stimulus is inline markup this repository owns,
  //   not a hotlinked image.
  ok(/^<(svg|table)/.test(t.stimulus.html),
     `${t.id}: stimulus is inline SVG or a table, not a hotlinked image`);
  ok(t.stimulus.html.indexOf('<img') === -1, `${t.id}: stimulus contains no <img>`);
  // ⚠ xmlns="http://www.w3.org/2000/svg" is a NAMESPACE, not a request. A
  //   bare search for "http" flagged every valid inline SVG. What matters is
  //   whether anything is fetched: src, href, or a url() in a style.
  ok(!/(?:src|href|xlink:href)\s*=\s*["']https?:/i.test(t.stimulus.html)
     && !/url\(\s*["']?https?:/i.test(t.stimulus.html),
     `${t.id}: stimulus fetches nothing from the network`);
}

// ── The manual task the blueprint needs ───────────────────────────────────
console.log('drawing task');
const manual = tasks.filter(t => t.parts.some(p => p.response && !A.isAutoMarked(p.response.kind)));
ok(manual.length >= 1, `the pack carries at least one drawing/construction task — ${manual.length}`);
ok(manual.every(t => t.parts.filter(p => !A.isAutoMarked(p.response.kind)).every(p => p.rubric && p.rubric.length > 30)),
   'every non-auto-markable part carries a real rubric');
// It must be kept OUT of online practice, not silently rendered.
for (const t of manual) {
  const items = A.projectToItems(t);
  ok(!items.some(i => /draw|construct/i.test(i.question)),
     `${t.id}: the drawing part is not projected into online practice`);
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
