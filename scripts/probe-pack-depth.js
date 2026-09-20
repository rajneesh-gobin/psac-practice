'use strict';
// Per-chapter / per-subsection depth probe for ANY live pack.
//
// The generalised form of scripts/probe-sms-depth.js, which was written for one
// pack during the grade9-social-modern-studies batches and is kept because
// docs/nce-grade9/progress.md Batch 29 refers to it by name.
//
// ⚠ It reads SOURCE through netlify/lib/questions-sandbox.js, never the built
//   bundles. Bundles are shared output: they are stale in the middle of a batch
//   and another session may be rewriting them, which is how a green harness
//   reports a failure that belongs to nobody (Batch 29 measured exactly that on
//   test-question-cache-budget).
//
// Usage:  node scripts/probe-pack-depth.js <pack-id> [id-prefix]
//   With a prefix it checks that batch's own items in detail — declared chapter
//   and subsection, difficulty, four distinct options, the answer byte-identical
//   to one of them, a hint that does not contain the answer, option-length
//   parity on the harness's own rule — and prints the batch's difficulty and
//   type spread.
//   With no prefix it prints the pack's state, which is what a dispatcher reads
//   between batches.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const EXCLUDED = new Set(['cloze', 'task', 'errorhunt']);
const FLOOR = 20;

// the same constants scripts/test-option-parity.js measures with
const ANSWER_MIN_LEN = 25;
const LEAK_ABS = 12;
const LEAK_RATIO = 1.6;
const MAX_LONGEST_RATE = 0.42;
const MAX_SPREAD = 12;

const pack = process.argv[2];
const prefix = process.argv[3] || '';
if (!pack) {
  console.log('usage: node scripts/probe-pack-depth.js <pack-id> [id-prefix]');
  process.exit(2);
}

const { loadSubject } = require(path.join(ROOT, 'netlify/lib/questions-sandbox.js'));

const manifest = path.join(ROOT, 'subjects', pack, '_manifest.js');
if (!fs.existsSync(manifest)) { console.log('no such pack: ' + pack); process.exit(2); }
const mctx = { registerSubject: (p) => { mctx.__P = p; }, console: { log() {} }, window: {}, STATIC_QUESTIONS: [] };
vm.createContext(mctx);
vm.runInContext(fs.readFileSync(manifest, 'utf8'), mctx);
const P = mctx.__P;
const SYL = P.syllabus || {};

const raw = loadSubject(pack);
const all = raw.filter((q) => q && q.question && !EXCLUDED.has(q.type));
const mine = prefix ? all.filter((q) => String(q.id || '').startsWith(prefix)) : [];

let fails = 0;
const bad = (id, msg) => { fails++; console.log('  FAIL ' + id + ' — ' + msg); };

// ── id uniqueness inside the pack ───────────────────────────────────────────
{
  const seen = new Set();
  for (const q of raw) {
    if (seen.has(q.id)) bad(q.id, 'DUPLICATE id inside this pack');
    seen.add(q.id);
  }
}

// ── the batch's own items ───────────────────────────────────────────────────
if (prefix) {
  console.log(prefix + '*  in  ' + pack + '  —  ' + mine.length + ' items');
  const chIds = new Set(P.chapters.map((c) => c.id));
  for (const q of mine) {
    const d = Number(q.difficulty);
    if (!(d >= 1 && d <= 4)) bad(q.id, 'difficulty ' + q.difficulty + ' is not 1-4');
    if (!chIds.has(q.chapterId)) bad(q.id, 'chapter ' + q.chapterId + ' is not declared by the pack');
    // ⚠ A CHAPTER THAT DECLARES NO SUBSECTIONS IS A REAL SHAPE, and an item in
    //   one must carry no subsection. `g9eng-gr-determiners` and
    //   `g9eng-gr-modals` are both like that, and so are their 101 shipped
    //   items. This check demanded a subsection unconditionally and guarded
    //   only the "is it declared" branch, so it failed 58 correct pre-existing
    //   items and a batch that had followed the rule properly. Requiring a tag
    //   the chapter does not declare would HIDE the question from the syllabus
    //   screen — the invariant runs both ways.
    const subs = ((SYL[q.chapterId] || {}).subsections || []).map((s) => s.id);
    if (subs.length && !q.subsection) bad(q.id, 'no subsection, but ' + q.chapterId + ' declares ' + subs.length);
    else if (!subs.length && q.subsection) bad(q.id, 'has subsection "' + q.subsection + '" but ' + q.chapterId + ' declares none');
    else if (subs.length && !subs.includes(q.subsection)) bad(q.id, 'subsection "' + q.subsection + '" is not declared on ' + q.chapterId);
    if (!q.hint) bad(q.id, 'no hint');
    if (!q.explanation || q.explanation.length < 60) bad(q.id, 'explanation missing or under 60 chars');
    // ⚠ TWO OPTIONS IS LEGAL AND IS NOT A DEFECT. makeTF() produces an `mcq`
    //   with exactly two — Vrai/Faux, or True/False off the id prefix. An
    //   earlier version of this probe demanded four and a batch stopped using
    //   makeTF to get past it, which is a harness changing the content instead
    //   of measuring it.
    if (q.type === 'mcq') {
      const n = (q.options || []).length;
      if (n !== 4 && n !== 2) bad(q.id, 'has ' + n + ' options; expected 4, or 2 for a true/false item');
      else {
        if (!q.options.includes(q.answer)) bad(q.id, 'answer is not byte-identical to any option');
        if (new Set(q.options).size !== n) bad(q.id, 'duplicate options');
        // ⚠ AND DUPLICATES AS THE CHILD SEES THEM. `it&rsquo;s` and `it's` are
        //   different strings and identical on screen; an earlier version of
        //   this check compared raw strings and passed one straight through.
        //   scripts/test-option-parity.js caught it only after a rebuild.
        // ⚠ DECODE entities, never collapse them, and never change case. Two
        //   earlier versions of this check were each wrong in the same way —
        //   they destroyed the very difference the question was testing:
        //   lowercasing flagged three correct capital-letter items, and mapping
        //   every entity to one character made `&gt;=` and `&lt;=` identical in
        //   two correct spreadsheet-formula items. Normalise ONLY what the
        //   screen genuinely cannot show apart.
        const render = (o) => String(o)
          .replace(/<[^>]*>/g, '')
          .replace(/&gt;/gi, '>').replace(/&lt;/gi, '<').replace(/&amp;/gi, '&')
          .replace(/&quot;/gi, '"').replace(/&nbsp;/gi, ' ')
          .replace(/&rsquo;|&lsquo;|&#39;|&#8217;|[‘’‛]/gi, "'")
          .replace(/&rdquo;|&ldquo;|&#8220;|&#8221;/gi, '"')
          .replace(/\s+/g, ' ').trim();
        const seen = q.options.map(render);
        if (new Set(seen).size !== n) bad(q.id, 'two options RENDER the same: ' + JSON.stringify(q.options));
      }
    }
    const h = String(q.hint || '').toLowerCase();
    const a = String(q.answer || '').toLowerCase();
    if (a.length > 12 && h.includes(a.slice(0, 30))) bad(q.id, 'the hint contains the answer');
  }

  const mcq = mine.filter((q) => q.type === 'mcq' && q.options && q.options.length === 4);
  if (mcq.length) {
    let longest = 0, spread = 0, leaks = [];
    for (const q of mcq) {
      const opts = q.options.map(String);
      const ai = opts.indexOf(String(q.answer));
      if (ai < 0) continue;
      const lens = opts.map((o) => o.length);
      spread += Math.max(...lens) - Math.min(...lens);
      const others = lens.filter((_, i) => i !== ai);
      const maxOther = Math.max(...others);
      const meanOther = others.reduce((x, y) => x + y, 0) / others.length;
      if (lens[ai] - maxOther >= 3) longest++;
      if (lens[ai] >= ANSWER_MIN_LEN && lens[ai] > maxOther
          && (lens[ai] - maxOther >= LEAK_ABS || lens[ai] >= meanOther * LEAK_RATIO)) leaks.push(q.id);
    }
    const rate = 100 * longest / mcq.length;
    const meanSpread = spread / mcq.length;
    console.log('  option parity: answer visibly longest ' + rate.toFixed(1) + '% (limit '
      + (100 * MAX_LONGEST_RATE).toFixed(0) + ') · mean spread ' + meanSpread.toFixed(1)
      + ' chars (limit ' + MAX_SPREAD + ') · leaks ' + leaks.length);
    if (rate > 100 * MAX_LONGEST_RATE) bad(prefix, 'the answer is visibly the longest option too often');
    if (meanSpread >= MAX_SPREAD) bad(prefix, 'mean option spread too wide');
    if (leaks.length) bad(prefix, 'materially-longest answers: ' + leaks.slice(0, 15).join(' '));
  }

  const types = {}; mine.forEach((q) => { types[q.type] = (types[q.type] || 0) + 1; });
  console.log('  types: ' + JSON.stringify(types));
  console.log('  difficulty: ' + [1, 2, 3, 4].map((d) => d + ':' + mine.filter((q) => Number(q.difficulty) === d).length).join('  '));

  // a stem repeated is one question to a child, however many ids it has
  const stem = (q) => String(q.question || '').replace(/<[^>]*>/g, ' ')
    .replace(/\d+([.,]\d+)?/g, '#').replace(/[^\p{L}\p{N}# ]/gu, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
  const seen = new Map();
  all.forEach((q) => { const k = stem(q); (seen.get(k) || seen.set(k, []).get(k)).push(q.id); });
  const dups = [...seen.values()].filter((v) => v.length > 1 && v.some((id) => id.startsWith(prefix)));
  if (dups.length) dups.forEach((v) => bad(v.join(' / '), 'same question stem'));
  console.log('');
}

// ── the pack ────────────────────────────────────────────────────────────────
console.log('chapter                        pool   L4   subsections below ' + FLOOR);
let owedFloor = 0, owedL4 = 0;
for (const c of P.chapters) {
  const list = ((SYL[c.id] || {}).subsections || []);
  const chQs = all.filter((q) => q.chapterId === c.id);
  const l4 = chQs.filter((q) => Number(q.difficulty) === 4).length;
  const thin = list.map((s) => {
    const n = chQs.filter((q) => q.subsection === s.id).length;
    return n < FLOOR ? s.id + ' ' + n : null;
  }).filter(Boolean);
  owedFloor += list.reduce((a, s) => a + Math.max(0, FLOOR - chQs.filter((q) => q.subsection === s.id).length), 0);
  owedL4 += Math.max(0, FLOOR - l4);
  console.log('  ' + c.id.padEnd(30) + String(chQs.length).padStart(5) + String(l4).padStart(5)
    + '   ' + (list.length ? (thin.length ? thin.join(', ') : 'all at ' + FLOOR) : '(no subsections declared)'));
}
console.log('');
console.log(pack + ': ' + all.length + ' poolable · still owed ' + owedFloor + ' to the subsection floor · '
  + owedL4 + ' to ' + FLOOR + ' L4 per chapter');
console.log(fails ? 'FAILED ' + fails + ' check(s)' : 'no structural problems found');
process.exit(fails ? 1 : 0);
