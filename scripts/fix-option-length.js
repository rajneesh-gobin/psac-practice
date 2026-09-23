'use strict';
// Work off the "the correct option is materially the longest" debt, pack by pack.
//
//   node scripts/fix-option-length.js --list grade2-english        # what is flagged
//   node scripts/fix-option-length.js --apply rewrites.json        # write the rewrites
//
// ⚠⚠ WHY THIS IS A TELL WORTH REMOVING. "Pick the long one" is the first
//    strategy a child learns, and on a flagged item it beats chance without
//    any knowledge at all. The bank as a whole is BETTER than chance on this
//    axis (11.8% against 25%), so these are individual items, not a systemic
//    fault — which is exactly why they can be worked off one at a time.
//
// ⚠ THE ANSWER IS NEVER SHORTENED. A polite request IS longer than a rude one,
//   a complete sentence IS longer than a fragment, and a real definition IS
//   longer than a one-word guess. The fix is to give the DISTRACTORS the same
//   weight, which makes the item harder in the right way: the child has to read
//   the grammar or the meaning instead of counting words.
//
// ⚠ ONLY DISTRACTORS CHANGE. --apply refuses any rewrite whose option list no
//   longer contains the question's own answer, so the answer/options link
//   cannot break and no hint or explanation can go stale. That guard has
//   already caught a typographic apostrophe where the source used a straight
//   one, and "plait" for "plaît".
//
// ⚠ THE TEST READS THE BUILT BUNDLES, so rerun `node netlify/build-questions.js`
//   before measuring again or nothing will appear to have changed.
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const { loadSubject } = require(path.join(ROOT, 'netlify', 'lib', 'questions-sandbox.js'));

// ⚠⚠ MIRRORS scripts/test-option-parity.js EXACTLY. KEEP THEM IN STEP.
//    This said 12 for one round of work, because I read the wrong constant —
//    and a tool that over-reports sends you rewriting perfectly good questions.
//    "Echo Parakeet" is 13 characters: below 25 the length of an answer carries
//    no semantic signal at all, and the test says so in as many words. Checked
//    against the built bundle both ways before trusting either.
const ANSWER_MIN_LEN = 25;       // below this, length carries no semantic signal

// ⚠⚠ DECODE ENTITIES BEFORE MEASURING, exactly as the test does. `&ccedil;` is
//    ONE character on screen and eight in the source, and grade5-history writes
//    "Fran&ccedil;ois Leguat" — so a tool that measures raw source inflates
//    every accented French or Mauritian place name and sends you rewriting
//    options that are already balanced. The test decodes; so must this, or the
//    two disagree on exactly the packs that need the most care.
// ⚠ The decoded LENGTH is what matters here, not the exact glyph, so anything
//   unrecognised collapses to one character rather than being left raw.
const plain = (o) => String(o)
  .replace(/<[^>]+>/g, '')
  .replace(/&[a-z#0-9]+;/gi, '·')
  .trim();

function leaksIn(pack) {
  const out = [];
  let qs = [];
  try { qs = loadSubject(pack); } catch (e) { return { error: e.message, out }; }
  for (const q of qs) {
    if (!q || q.type !== 'mcq' || !Array.isArray(q.options) || q.options.length !== 4) continue;
    const ai = q.options.findIndex(o => o === q.answer);
    if (ai < 0) continue;
    const lens = q.options.map(o => plain(o).length);
    const others = lens.filter((_, i) => i !== ai);
    const maxOther = Math.max(...others);
    const meanOther = others.reduce((a, b) => a + b, 0) / others.length;
    if (lens[ai] >= ANSWER_MIN_LEN && lens[ai] > maxOther &&
        (lens[ai] - maxOther >= 12 || lens[ai] >= meanOther * 1.6)) {
      out.push({ q, lens, ai, maxOther, meanOther });
    }
  }
  return { out };
}

// ⚠ Find the file by ID rather than being told: a pack's items are spread over
//   chapter files, top-ups and enrichment, and guessing the path is how a
//   rewrite silently lands nowhere.
// ⚠⚠ THREE AUTHORING STYLES, AND A TOOL THAT KNEW ONE IS A TOOL THAT SILENTLY
//    SKIPS PACKS. Questions are written as `id:'x'`, as `id: 'x'` with a space,
//    and as positional helper calls — coverage_weather_maps.js has
//    add('id','chapter','subsection','question',[opts],'answer',HS) with no
//    `options:` key at all. Anchoring on "id:'" found none of the last two and
//    reported them as missing, which looks like a stale id rather than a
//    limited tool.
// ⚠⚠ AND BOTH QUOTE STYLES. 24 files across 23 packs write `id: "x"` with
//    double quotes — one reclaimed-sample file per pack. Anchoring on `'`
//    alone made every one of them unreachable, and --apply reported it as
//    "not found in <pack>", which reads as a stale id rather than as a limit
//    of the tool. Six packs had already been signed off as clean that way.
const idAt = (src, id) => {
  const e = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = new RegExp("id:\\s*['\"]" + e + "['\"]").exec(src);
  if (m) return m.index;
  const q = src.search(new RegExp("['\"]" + e + "['\"]"));   // positional helper form
  return q;
};

// The next array literal after `at`, quote-aware so a bracket inside an option
// string cannot end it early.
function arrayAfter(src, at) {
  let i = src.indexOf('[', at);
  if (i < 0) return null;
  let depth = 0, quote = null;
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    if (quote) {
      if (c === '\\') { j++; continue; }
      if (c === quote) quote = null;
      continue;
    }
    if (c === "'" || c === '"' || c === '`') { quote = c; continue; }
    if (c === '[') depth++;
    else if (c === ']' && --depth === 0) return { start: i, end: j };
  }
  return null;
}

function fileFor(pack, id) {
  const dir = path.join(ROOT, 'subjects', pack, 'questions');
  if (!fs.existsSync(dir)) return null;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.js')) continue;
    const src = fs.readFileSync(path.join(dir, f), 'utf8');
    if (idAt(src, id) >= 0) return path.join(dir, f);
  }
  return null;
}

const mode = process.argv[2];

if (mode === '--list') {
  const pack = process.argv[3];
  const { error, out } = leaksIn(pack);
  if (error) { console.error(pack + ': ' + error); process.exit(1); }
  console.log('// ' + pack + ' — ' + out.length + ' flagged');
  for (const { q, lens, ai, maxOther, meanOther } of out) {
    console.log('\n' + q.id + '  [answer ' + lens[ai] + ', next ' + maxOther + ', mean ' + meanOther.toFixed(1) + ']');
    console.log('  Q: ' + plain(q.question).slice(0, 150));
    q.options.forEach((o, i) => console.log('   ' + (i === ai ? '✓' : ' ') + ' [' + String(lens[i]).padStart(2) + '] ' + o));
  }
  process.exit(0);
}

if (mode === '--apply') {
  const file = process.argv[3];
  const spec = JSON.parse(fs.readFileSync(file, 'utf8'));   // { pack: { id: [4 options] } }
  let changed = 0;
  const refused = [];

  for (const [pack, byId] of Object.entries(spec)) {
    for (const [qid, opts] of Object.entries(byId)) {
      if (!Array.isArray(opts) || opts.length !== 4) { refused.push(qid + ' — not four options'); continue; }
      if (new Set(opts.map(plain)).size !== 4) { refused.push(qid + ' — duplicate options'); continue; }
      const P = fileFor(pack, qid);
      if (!P) { refused.push(qid + ' — not found in ' + pack); continue; }

      const before = fs.readFileSync(P, 'utf8');
      const crlf = /\r\n/.test(before);
      let s = before.replace(/\r\n/g, '\n');
      // ⚠⚠ REFUSE WHEN THE ID IS AMBIGUOUS. "The next array after the id" is a
      //    heuristic, and it corrupted a file: coverage_weather_maps.js names
      //    each id TWICE — once as a key in an explanation map and once in the
      //    add() call — so the first match was the map, and the "next array"
      //    was the subscript in `G4HG_EXPL[id]` inside the helper DEFINITION.
      //    The options were written over that, breaking every explanation in
      //    the file, and `node --check` passed because a comma expression in
      //    brackets is valid JavaScript. Syntax is not a safety net here.
      // ⚠ So: the array must begin within a short reach of the id AND the text
      //   between them must look like a question definition, not a lookup. Any
      //   doubt is refused and reported — a skipped question costs a minute, a
      //   silently corrupted file costs trust in every other rewrite.
      const occurrences = [];
      { const re = new RegExp("(?:id:\\s*)?['\"]" + qid.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "['\"]", 'g');
        let m; while ((m = re.exec(s))) occurrences.push(m.index); }
      const candidates = [];
      for (const at of occurrences) {
        const arr = arrayAfter(s, at);
        if (!arr) continue;
        const gap = s.slice(at, arr.start);
        if (/=>|function\s*\(/.test(gap)) continue;     // a helper body, not a question
        // ⚠ `options:` IMMEDIATELY BEFORE THE ARRAY IS CERTAINTY, AT ANY
        //   DISTANCE. A 600-character proximity rule refused g2mth-shp-078,
        //   whose question embeds a whole inline SVG butterfly between the id
        //   and its options — correct to refuse rather than guess, but the
        //   distance was never the real signal. The keyword is.
        if (/options\s*:\s*$/.test(gap)) { candidates.push(arr); continue; }
        // The positional helper form has no keyword, so distance still applies
        // there — and a lookup like G4HG_EXPL[id] must stay excluded.
        if (gap.length > 600) continue;
        if (/\]\s*\|\|/.test(gap)) continue;
        if (!/question\s*:|,\s*'[^']{10,}'\s*,\s*$/.test(gap) && !/,\s*$/.test(gap)) continue;
        candidates.push(arr);
      }
      if (candidates.length !== 1) {
        refused.push(qid + ' — ' + (candidates.length ? 'ambiguous: ' + candidates.length + ' candidate arrays' : 'options array not found') + ' (refusing to guess)');
        continue;
      }
      const oStart = candidates[0].start, oEnd = candidates[0].end;

      // ⚠ THE ANSWER MUST SURVIVE VERBATIM, accents and apostrophes included.
      //   In the positional helper form the answer is the quoted string
      //   immediately after the array; in the object form it is `answer:`.
      // ⚠ BOTH QUOTE STYLES HERE TOO, and this one is the dangerous half: a
      //   double-quoted `answer: "…"` simply did not match, `answer` stayed
      //   null, and the verbatim-answer guard below was skipped rather than
      //   failed. A rewrite could then have silently orphaned the answer.
      const after = s.slice(oEnd, oEnd + 400);
      const ansM = /answer:\s*'((?:\\'|[^'])*)'/.exec(after)
        || /answer:\s*"((?:\\"|[^"])*)"/.exec(after)
        || /^\s*,\s*'((?:\\'|[^'])*)'/.exec(after)
        || /^\s*,\s*"((?:\\"|[^"])*)"/.exec(after);
      const answer = ansM ? ansM[1].replace(/\\(['"])/g, '$1') : null;
      if (answer && !opts.includes(answer)) {
        refused.push(qid + ' — the answer is no longer among the options: ' + JSON.stringify(answer));
        continue;
      }
      // ⚠ And the rewrite must actually fix the thing it is for.
      const lens = opts.map(o => plain(o).length);
      const ai = opts.findIndex(o => o === answer);
      if (ai >= 0) {
        const others = lens.filter((_, i) => i !== ai);
        const maxOther = Math.max(...others);
        const meanOther = others.reduce((a, b) => a + b, 0) / others.length;
        if (lens[ai] >= ANSWER_MIN_LEN && lens[ai] > maxOther &&
            (lens[ai] - maxOther >= 12 || lens[ai] >= meanOther * 1.6)) {
          refused.push(qid + ' — still materially longest (' + lens[ai] + ' vs ' + maxOther + ')');
          continue;
        }
      }

      // JSON.stringify, not hand-rolled quoting: French is full of apostrophes.
      // ⚠ Replace the ARRAY only, keeping whatever preceded it — 'options:'
      //   in the object form, a bare comma in the positional helper form.
      s = s.slice(0, oStart) + '[' + opts.map(o => JSON.stringify(o)).join(',') + s.slice(oEnd);
      fs.writeFileSync(P, crlf ? s.replace(/\n/g, '\r\n') : s, 'utf8');
      changed++;
    }
  }

  console.log('rewrote ' + changed + ' question(s)');
  if (refused.length) {
    console.log('\nREFUSED (' + refused.length + '):');
    refused.forEach(r => console.log('  ' + r));
    process.exit(1);
  }
  process.exit(0);
}

console.log('usage: --list <pack> | --apply <rewrites.json>');
process.exit(1);
