'use strict';
// Validates the authored question-family batch (the reserved `-fam-` namespace)
// against the rules in prompt.md and the standing traps in CLAUDE.md.
//
// Six agents author these packs concurrently, in a worktree a second Claude
// session is also writing to. So the things that can go wrong are not the things
// a normal content test looks for:
//   · two agents pick the same id (the three sciences share the g9s- prefix);
//   · an agent invents a subsection id, which HIDES its questions from the
//     Practise screen and fails test-subsection-invariant;
//   · an agent adds a field the factories do not take, which is dropped from the
//     BUILT bundle while the source still reads correctly — the failure mode
//     that cost this project makeCloze, learnMore and subsection, one of them
//     for months. So this reads the built bundles, not only the source.
//   · a family of one, which is not a family;
//   · an L4 label on plain retrieval, which is the audit's single biggest
//     finding and the reason the batch exists.
//
// Run: node netlify/build-questions.js && node scripts/test-family-batch.js
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const BUNDLES = path.join(ROOT, 'netlify', 'question-bundles');
const { loadSubject } = require(path.join(ROOT, 'netlify', 'lib', 'questions-sandbox.js'));

let pass = 0, fail = 0, review = 0;
const ok = m => { pass++; console.log('  ok   ' + m); };
const bad = m => { fail++; console.log('  FAIL ' + m); };
const note = m => { review++; console.log('  ??   ' + m); };

const FAM = /^(.+-[a-z]{0,3}fam-\d+)-([a-z]{1,2})$/;
const declared = JSON.parse(fs.readFileSync(path.join(ROOT, 'tmp/family-expansion/declared-subsections.json'), 'utf8'));

// ── Load every pack once, from SOURCE ──
const packs = Object.keys(declared);
const bySrc = {};
let famTotal = 0;
for (const p of packs) {
  let qs = [];
  try { qs = loadSubject(p); } catch (e) { bad(p + ' failed to load: ' + e.message); continue; }
  bySrc[p] = qs;
  famTotal += qs.filter(q => FAM.test(q.id || '')).length;
}

if (!famTotal) {
  console.log('  --   no -fam- questions authored yet; nothing to validate.');
  console.log('Family batch: nothing to check.');
  return;
}

// ── 1. Ids are unique across the WHOLE corpus, not just per pack ──
{
  const seen = new Map();
  const clashes = [];
  for (const [p, qs] of Object.entries(bySrc)) {
    for (const q of qs) {
      if (!q.id) continue;
      if (seen.has(q.id)) clashes.push(q.id + ' in ' + seen.get(q.id) + ' and ' + p);
      else seen.set(q.id, p);
    }
  }
  clashes.length ? bad('duplicate question ids: ' + clashes.slice(0, 8).join('; '))
                 : ok('every question id in every Grade 9 pack is unique');
}

// ── 2. Chapter and subsection ids are DECLARED ──
{
  let badCh = [], badSub = [];
  for (const [p, qs] of Object.entries(bySrc)) {
    const chs = declared[p] || {};
    for (const q of qs) {
      if (!FAM.test(q.id || '')) continue;
      if (!(q.chapterId in chs)) { badCh.push(p + '/' + q.id + ' → ' + q.chapterId); continue; }
      const allowed = chs[q.chapterId] || [];
      if (q.subsection && !allowed.includes(q.subsection)) {
        badSub.push(p + '/' + q.id + ' → ' + q.chapterId + '.' + q.subsection);
      }
    }
  }
  badCh.length ? bad('questions tagged to a chapter the pack does not declare: ' + badCh.slice(0, 6).join('; '))
               : ok('every new question sits in a declared chapter');
  badSub.length ? bad('subsection tagged but NOT declared (hidden from Practise): ' + badSub.slice(0, 8).join('; '))
                : ok('every new question uses a declared subsection, or none');
}

// ── 3. A family is 2–5 variants with distinct suffixes ──
{
  const fams = new Map();
  for (const [p, qs] of Object.entries(bySrc)) {
    for (const q of qs) {
      const m = FAM.exec(q.id || '');
      if (!m) continue;
      if (!fams.has(m[1])) fams.set(m[1], { pack: p, variants: [], chapters: new Set(), levels: [] });
      const f = fams.get(m[1]);
      f.variants.push(m[2]); f.chapters.add(q.chapterId); f.levels.push(q.difficulty);
    }
  }
  const singles = [...fams].filter(([, f]) => f.variants.length < 2).map(([k]) => k);
  const huge = [...fams].filter(([, f]) => f.variants.length > 5).map(([k, f]) => k + '(' + f.variants.length + ')');
  const dupV = [...fams].filter(([, f]) => new Set(f.variants).size !== f.variants.length).map(([k]) => k);
  singles.length ? bad('a family of one is not a family: ' + singles.slice(0, 8).join(', '))
                 : ok(fams.size + ' families, each with at least two variants');
  huge.length ? bad('more than five variants: ' + huge.join(', ')) : ok('no family exceeds five variants');
  dupV.length ? bad('repeated variant letter within a family: ' + dupV.join(', ')) : ok('variant letters are unique within each family');

  // Not a failure, but worth seeing: a family whose variants are all one level
  // is usually the "same question, different numbers" trap prompt.md forbids.
  const flat = [...fams].filter(([, f]) => new Set(f.levels).size === 1 && f.variants.length >= 3);
  if (flat.length) note(flat.length + ' famil(ies) sit entirely at one difficulty — check they vary the THINKING, not the numbers: '
    + flat.slice(0, 6).map(([k]) => k).join(', '));
  else ok('every family of three or more spans more than one difficulty');
  global.__fams = fams;
}

// ── 4. The factories kept every field — read the BUILT bundle, not the source ──
{
  if (!fs.existsSync(BUNDLES)) {
    note('no built bundles; run `node netlify/build-questions.js` to check for stripped fields');
  } else {
    const built = new Map();
    for (const f of fs.readdirSync(BUNDLES).filter(f => f.endsWith('.json'))) {
      let rows = [];
      try { rows = JSON.parse(fs.readFileSync(path.join(BUNDLES, f), 'utf8')); } catch (_) {}
      for (const q of (Array.isArray(rows) ? rows : rows.questions || [])) if (q && q.id) built.set(q.id, q);
    }
    const missing = [], stripped = [];
    for (const qs of Object.values(bySrc)) {
      for (const q of qs) {
        if (!FAM.test(q.id || '')) continue;
        const b = built.get(q.id);
        if (!b) { missing.push(q.id); continue; }
        for (const k of ['question', 'explanation', 'subsection', 'difficulty', 'chapterId']) {
          if (q[k] !== undefined && b[k] === undefined) stripped.push(q.id + '.' + k);
        }
      }
    }
    missing.length ? bad(missing.length + ' new question(s) never reached the built bundle, e.g. ' + missing.slice(0, 5).join(', '))
                   : ok('every new question is present in the built bundle');
    stripped.length ? bad('field present in source but MISSING from the bundle: ' + stripped.slice(0, 8).join(', '))
                    : ok('no authored field is dropped by the factories');
  }
}

// ── 5. The questions are answerable ──
{
  const broken = [];
  for (const qs of Object.values(bySrc)) {
    for (const q of qs) {
      if (!FAM.test(q.id || '')) continue;
      if (!q.question || !String(q.question).trim()) { broken.push(q.id + ': no question text'); continue; }
      if (q.answer === undefined || q.answer === null || String(q.answer).trim() === '') { broken.push(q.id + ': no answer'); continue; }
      if (q.type === 'mcq') {
        if (!Array.isArray(q.options) || q.options.length < 2) { broken.push(q.id + ': fewer than two options'); continue; }
        const opts = q.options.map(o => String(o).trim());
        if (new Set(opts).size !== opts.length) { broken.push(q.id + ': duplicate options'); continue; }
        if (opts.filter(o => o === String(q.answer).trim()).length !== 1) broken.push(q.id + ': answer is not exactly one option');
      }
    }
  }
  broken.length ? bad(broken.length + ' unanswerable item(s): ' + broken.slice(0, 6).join('; '))
                : ok('every new question has text, an answer, and a well-formed option set');
}

// ── 6. The explanation teaches — prompt.md requires it to name the misconception ──
{
  const thin = [];
  for (const qs of Object.values(bySrc)) {
    for (const q of qs) {
      if (!FAM.test(q.id || '')) continue;
      const e = String(q.explanation || '').replace(/<[^>]*>/g, '').trim();
      if (e.length < 40) thin.push(q.id + ' (' + e.length + ' chars)');
    }
  }
  thin.length ? bad(thin.length + ' explanation(s) too thin to teach the reasoning: ' + thin.slice(0, 6).join(', '))
              : ok('every new question explains its reasoning at reasonable length');
}

// ── 7. Alt text must never reveal the answer ──
{
  const leaks = [];
  for (const qs of Object.values(bySrc)) {
    for (const q of qs) {
      if (!FAM.test(q.id || '')) continue;
      const html = String(q.question || '');
      for (const m of html.matchAll(/alt\s*=\s*"([^"]*)"/gi)) {
        const alt = m[1].toLowerCase().trim();
        const ans = String(q.answer || '').toLowerCase().trim();
        if (ans && alt && alt.includes(ans) && ans.length > 2) leaks.push(q.id + ': alt="' + m[1] + '"');
      }
    }
  }
  leaks.length ? bad('alt text reveals the answer: ' + leaks.slice(0, 5).join('; '))
               : ok('no alt text gives the answer away');
}

// ── 8. Ledgers agree with what was actually written ──
{
  const ledgers = fs.readdirSync(path.join(ROOT, 'tmp/family-expansion'))
    .filter(f => f.endsWith('-ledger.json'));
  if (!ledgers.length) { note('no ledgers written yet'); }
  else {
    const inLedger = new Set();
    let malformed = [];
    for (const f of ledgers) {
      let j;
      try { j = JSON.parse(fs.readFileSync(path.join(ROOT, 'tmp/family-expansion', f), 'utf8')); }
      catch (e) { bad(f + ' is not valid JSON: ' + e.message); continue; }
      for (const fam of (j.families || [])) {
        for (const v of (fam.variants || [])) {
          inLedger.add(v.id);
          if (!v.variation || !v.misconception) malformed.push(v.id);
        }
      }
    }
    const authored = new Set();
    for (const qs of Object.values(bySrc)) for (const q of qs) if (FAM.test(q.id || '')) authored.add(q.id);
    const unrecorded = [...authored].filter(id => !inLedger.has(id));
    const phantom = [...inLedger].filter(id => !authored.has(id));
    unrecorded.length ? bad(unrecorded.length + ' authored question(s) missing from a ledger: ' + unrecorded.slice(0, 6).join(', '))
                      : ok('every authored question is recorded in a ledger');
    phantom.length ? bad(phantom.length + ' ledger entr(ies) name a question that does not exist: ' + phantom.slice(0, 6).join(', '))
                   : ok('every ledger entry names a real question');
    malformed.length ? bad(malformed.length + ' ledger entr(ies) omit the variation or the misconception: ' + malformed.slice(0, 6).join(', '))
                     : ok('every ledger entry states its variation and its misconception');
  }
}

// ── 9. L4 review — the audit's central finding, reported not failed ──
{
  // A question a machine can be sure about is one where the stem is short and
  // asks for a single named thing. That is a HINT, not a verdict: whether an
  // item demands reasoning is a reading, and a script can only count what
  // someone has already asserted. Same standing as audit-difficulty-labels.js.
  const suspects = [];
  for (const qs of Object.values(bySrc)) {
    for (const q of qs) {
      if (!FAM.test(q.id || '') || q.difficulty !== 4) continue;
      const stem = String(q.question || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      if (stem.split(' ').length < 12) suspects.push(q.id + ': "' + stem.slice(0, 60) + '"');
    }
  }
  if (suspects.length) note(suspects.length + ' L4 item(s) have a very short stem — re-read them, an L4 that is one lookup is the exact defect this batch exists to fix: '
    + suspects.slice(0, 5).join(' | '));
  else ok('no L4 item has a suspiciously short stem');
}

// ── Summary ──
const fams = global.__fams || new Map();
const byPack = {};
for (const [p, qs] of Object.entries(bySrc)) {
  const f = qs.filter(q => FAM.test(q.id || ''));
  if (!f.length) continue;
  const lv = { 1: 0, 2: 0, 3: 0, 4: 0 }, ty = {};
  for (const q of f) { lv[q.difficulty] = (lv[q.difficulty] || 0) + 1; ty[q.type] = (ty[q.type] || 0) + 1; }
  byPack[p] = { items: f.length, levels: lv, types: ty,
    families: [...fams].filter(([, v]) => v.pack === p).length };
}
console.log('');
console.log('  pack                            fams items  L1/L2/L3/L4  types');
for (const [p, s] of Object.entries(byPack)) {
  console.log('  ' + p.padEnd(31) + String(s.families).padStart(4) + String(s.items).padStart(6)
    + '  ' + [1, 2, 3, 4].map(k => s.levels[k] || 0).join('/').padEnd(13)
    + Object.entries(s.types).map(([k, v]) => k + ':' + v).join(' '));
}
console.log('');
console.log(`Family batch: ${pass} passed, ${fail} failed, ${review} for review.`);
if (fail) process.exitCode = 1;
