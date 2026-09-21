'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Subject certificates — the rules that must not drift.
//
//  Everything here runs in Node against engine/certificates.js directly. The
//  module is written so that the ladder, the record builder and the artwork
//  need no DOM: a level a child cannot reach, or a certificate that renders
//  blank because one child's name carried an ampersand, are both failures a
//  browser test would only find by luck.
//
//  Run: node scripts/test-certificates.js
// ══════════════════════════════════════════════════════════════════════════

const fs   = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const C = require(path.join(ROOT, 'engine', 'certificates.js'));

let pass = 0;
const fails = [];
const ok  = (cond, msg) => { if (cond) pass++; else fails.push(msg); };
const eq  = (a, b, msg) => ok(a === b, `${msg} — expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);

// ── 1. the ladder ─────────────────────────────────────────────────────────
eq(C.TIERS.length, 10, 'ten rungs (none + nine levels)');
C.TIERS.forEach((t, i) => eq(t.idx, i, `TIERS[${i}].idx matches its position`));
ok(C.TIERS.every(t => t.name && t.line && t.blurb && t.icon), 'every tier has name, line, blurb and icon');
ok(new Set(C.TIERS.map(t => t.key)).size === C.TIERS.length, 'tier keys are unique');
ok(new Set(C.TIERS.map(t => t.name)).size === C.TIERS.length, 'tier names are unique');

// Thresholds climb, so a child can never move down a level by mastering more.
for (let i = 2; i < C.TIERS.length; i++) {
  ok(C.TIERS[i].min > C.TIERS[i - 1].min, `tier ${i} threshold is above tier ${i - 1}`);
}

eq(C.tierFor(0, 1000).key, 'none',        '0 mastered is not a certificate');
eq(C.tierFor(1, 1000).key, 'starter',     'one question is a Starter');
eq(C.tierFor(23, 4000).key, 'starter',    '23 of 4000 is a Starter');
eq(C.tierFor(50, 1000).key, 'explorer',   '5% is Explorer');
eq(C.tierFor(49, 1000).key, 'starter',    'just under 5% is still Starter');
eq(C.tierFor(150, 1000).key, 'rising',    '15% is Rising Star');
eq(C.tierFor(300, 1000).key, 'achiever',  '30% is Achiever');
eq(C.tierFor(500, 1000).key, 'high',      '50% is High Achiever');
eq(C.tierFor(700, 1000).key, 'scholar',   '70% is Scholar');
eq(C.tierFor(850, 1000).key, 'expert',    '85% is Expert');
eq(C.tierFor(950, 1000).key, 'distinction', '95% is Distinction');
eq(C.tierFor(1000, 1000).key, 'master',   'every question is Subject Master');

// ⚠ The one that matters. 99.9% is NOT mastery, and a rounded percentage
//   would have called it one.
eq(C.tierFor(999, 1000).key, 'distinction', 'one question short is NOT Subject Master');
eq(C.tierFor(3999, 4000).key, 'distinction', 'one question short of 4000 is NOT Subject Master');
eq(C.tierFor(1000, 0).key, 'none', 'a subject with no questions awards nothing');

// The ladder must be reachable in a SMALL subject as well as a large one.
// This is why the absolute-question floors were dropped: with them, a
// 252-question pack could never pass Explorer.
for (const total of [40, 100, 252, 1000, 4000]) {
  for (const t of C.TIERS.slice(1)) {
    const need = t.idx === 9 ? total : Math.ceil(t.min / 100 * total);
    eq(C.tierFor(Math.max(1, need), total).idx, t.idx,
       `${t.name} is reachable in a ${total}-question subject`);
  }
}

// ── 2. the distance to the next level ─────────────────────────────────────
{
  const n = C.toNextTier(0, 1000);
  eq(n.tier.key, 'starter', 'from nothing, the next level is Starter');
  eq(n.need, 1, 'one question starts the certificate');
}
{
  const n = C.toNextTier(499, 1000);
  eq(n.tier.key, 'high', 'next after 49.9% is High Achiever');
  eq(n.need, 1, 'one more question reaches 50%');
}
{
  const n = C.toNextTier(950, 1000);
  eq(n.tier.key, 'master', 'next after Distinction is Subject Master');
  eq(n.need, 50, 'mastery needs every remaining question');
}
eq(C.toNextTier(1000, 1000), null, 'there is nothing after Subject Master');
// Following the advice must actually produce the promised level.
for (const [m, total] of [[0, 900], [7, 900], [120, 900], [455, 2164], [2000, 2164]]) {
  const n = C.toNextTier(m, total);
  if (!n) continue;
  eq(C.tierFor(m + n.need, total).idx, n.tier.idx,
     `mastering ${n.need} more from ${m}/${total} really reaches ${n.tier.name}`);
}

// ── 3. building a subject record ──────────────────────────────────────────
const counts = { 'test-pack': { a: [10, 10, 0, 0], b: [5, 5, 5, 5], c: [10, 0, 0, 0] } };
{
  const rec = C.buildRecord('test-pack', counts, {
    a: { explored: 20, secure: 20, improved: 0, needs: 0, attempts: 24, correct: 20 },
    b: { explored: 10, secure: 6,  improved: 1, needs: 3, attempts: 18, correct: 8 },
  });
  eq(rec.total, 50,   'total is every practisable question in the pack');
  eq(rec.mastered, 26, 'mastered is the secure count only');
  eq(rec.explored, 30, 'explored counts every question tried');
  eq(rec.needs, 3,     'needs-practice is carried through');
  eq(rec.pct, 52,      'percentage is floored');
  eq(rec.chaptersTotal, 3, 'every chapter with questions is listed');
  eq(rec.chaptersComplete, 1, 'only a fully mastered chapter counts as complete');
  eq(rec.chaptersStarted, 2, 'an untouched chapter is not started');
  eq(rec.tier.key, 'high', '52% is High Achiever');
  eq(rec.cappedOut, 0, 'no difficulty cap means nothing is held back');
  eq(rec.accuracy, 67, 'accuracy is attempts against correct answers');
  const untouched = rec.chapters.find(c => c.id === 'c');
  eq(untouched.mastered, 0, 'an untouched chapter has nothing mastered');
  eq(untouched.left, 10, 'an untouched chapter has everything left');
}

// ⚠ A parent's difficulty cap must NOT shrink the denominator. A capped child
//   reaches a lower level for the same work, and the cap is reported instead.
{
  const capped = C.buildRecord('test-pack', counts, {}, { maxDifficulty: 2 });
  eq(capped.total, 50, 'the cap does not change the total');
  eq(capped.reachable, 40, 'the cap changes what can be reached');
  eq(capped.cappedOut, 10, 'questions above the cap are reported');
}
{
  const empty = C.buildRecord('no-such-pack', counts, {});
  eq(empty.total, 0, 'a pack with no counts has no questions');
  eq(empty.tier.key, 'none', 'a pack with no questions awards nothing');
  eq(empty.pct, 0, 'no questions is 0%, never NaN');
}
// A row claiming more mastered questions than the chapter holds (a question
// deleted from the bank after it was answered) must not produce 104%.
{
  const over = C.buildRecord('test-pack', counts, {
    a: { explored: 99, secure: 99 }, b: { explored: 99, secure: 99 }, c: { explored: 99, secure: 99 },
  });
  eq(over.mastered, 50, 'mastered is clamped to what the subject holds');
  eq(over.pct, 100, 'a stale row cannot exceed 100%');
  eq(over.tier.key, 'master', 'and clamping still awards mastery, not more');
}

// ── 4. the serial ─────────────────────────────────────────────────────────
eq(C.serialFor('kid-1', 'grade5-maths', 4), C.serialFor('kid-1', 'grade5-maths', 4),
   'the same child and subject always get the same number');
ok(C.serialFor('kid-1', 'grade5-maths', 4) !== C.serialFor('kid-2', 'grade5-maths', 4),
   'two children do not share a certificate number');
ok(C.serialFor('kid-1', 'grade5-maths', 4) !== C.serialFor('kid-1', 'grade5-french', 4),
   'two subjects do not share a certificate number');
ok(/^NK-[0-9A-Z]{7}-L[0-9]$/.test(C.serialFor('kid-1', 'grade5-maths', 4)), 'the serial has a fixed shape');

// ── 5. the artwork ────────────────────────────────────────────────────────
//  ⚠ Never colour alone: each level must also change its frame or its emblem,
//    or the levels are indistinguishable on a printout and to a child who
//    cannot tell the two blues apart.
{
  const keys = C.TIERS.map(t => t.key);
  for (const k of keys) ok(C.ART[k], `level "${k}" has artwork`);
  const borders = keys.map(k => C.ART[k].border);
  const emblems = keys.map(k => C.ART[k].emblem);
  eq(new Set(borders).size, keys.length, 'every level has its own frame');
  eq(new Set(emblems).size, keys.length, 'every level has its own emblem');
  for (const k of keys) {
    const a = C.ART[k];
    for (const f of ['paper', 'paper2', 'ink', 'sub', 'frame', 'frame2', 'seal', 'seal2', 'ribbon']) {
      ok(/^#[0-9a-f]{6}$/i.test(a[f]), `${k}.${f} is a colour (got ${JSON.stringify(a[f])})`);
    }
  }
}

// ── 6. the SVG is well-formed, self-contained and escapes its input ───────
//  A malformed certificate does not throw: it loads as a broken <img> and the
//  PNG a parent forwards comes out blank. So it is checked here, not in a
//  browser.
function xmlWellFormed(src) {
  const stack = [];
  const re = /<(\/?)([A-Za-z][\w:-]*)((?:[^<>"']|"[^"]*"|'[^']*')*?)(\/?)>/g;
  let m, last = 0;
  while ((m = re.exec(src))) {
    const text = src.slice(last, m.index);
    const bad = text.replace(/&(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);/g, '');
    if (/[&<>]/.test(bad)) return `unescaped character in text: ${JSON.stringify(text.slice(0, 60))}`;
    last = re.lastIndex;
    if (m[1]) {
      if (stack.pop() !== m[2]) return `mismatched closing tag </${m[2]}>`;
    } else if (!m[4]) {
      stack.push(m[2]);
    }
    const attrs = m[3].replace(/"[^"]*"|'[^']*'/g, '');
    if (/[<>&]/.test(attrs)) return `unquoted special character in <${m[2]}> attributes`;
  }
  if (stack.length) return `unclosed tag <${stack[stack.length - 1]}>`;
  return null;
}

{
  const rec = C.buildRecord('test-pack', counts, { a: { explored: 20, secure: 20 } });
  for (const t of C.TIERS) {
    const fake = Object.assign({}, rec, { tier: t, name: 'Mathematics', grade: 5 });
    const markup = C.svg(fake, { name: 'Ana Devi', serial: 'NK-ABC1234-L' + t.idx, issued: '2026-09-21' });
    const err = xmlWellFormed(markup);
    ok(!err, `level "${t.key}" renders well-formed SVG${err ? ' — ' + err : ''}`);
    ok(markup.startsWith('<svg') && markup.trimEnd().endsWith('</svg>'), `level "${t.key}" is one <svg> element`);
    ok(/aria-label="/.test(markup), `level "${t.key}" carries an accessible label`);
  }

  // ⚠ Self-contained. Anything fetched from outside vanishes from the <img>
  //   rasterisation with no error, so the artwork must reference nothing.
  const markup = C.svg(Object.assign({}, rec, { name: 'Mathematics', grade: 5 }), { name: 'Ana' });
  ok(!/<image\b/i.test(markup), 'the artwork embeds no external image');
  ok(!/url\(['"]?https?:/i.test(markup) && !/href\s*=\s*['"]https?:/i.test(markup),
     'the artwork fetches nothing over the network');
  ok(!/@font-face|\.woff|fonts\.googleapis/i.test(markup), 'the artwork uses system fonts only');

  // A name is user input and goes straight into XML.
  const hostile = C.svg(Object.assign({}, rec, { name: 'Maths & "Co" <b>', grade: 5 }),
                        { name: `Ravi & Sons <script>alert('x')</script>`, serial: 'NK-1&2-L1', issued: '<today>' });
  ok(!xmlWellFormed(hostile), 'a hostile name still renders well-formed SVG');
  ok(!/<script/i.test(hostile), 'a name containing a script tag is escaped, not embedded');
  ok(hostile.includes('&amp;'), 'an ampersand in a name is escaped');
}

// ── 6b. two certificates on one page must not share a def id ─────────────
//  ⚠ An SVG's <defs> ids are DOCUMENT-wide, not element-wide. Nine
//    certificates on the My Certificates screen all carrying id="cg" means
//    every one of them paints with the FIRST one's gradient. Found in a
//    screenshot of the card grid: Subject Master, the one dark design, was
//    rendering on the Expert certificate's pale ground with gold text on it —
//    unreadable, and nothing reported a thing.
{
  const rec = C.buildRecord('test-pack', counts, { a: { explored: 20, secure: 20 } });
  const idsOf = m => [...m.matchAll(/\sid="([^"]+)"/g)].map(x => x[1]);
  const one = idsOf(C.svg(Object.assign({}, rec, { name: 'Maths', grade: 5 }), { name: 'A' }));
  const two = idsOf(C.svg(Object.assign({}, rec, { name: 'French', grade: 5 }), { name: 'A' }));
  ok(one.length >= 2, 'the artwork defines gradients');
  eq(new Set(one).size, one.length, 'one certificate has no repeated id');
  eq(one.filter(i => two.includes(i)).length, 0,
     'two certificates rendered together share no def id');
  // Every url(#…) must point at an id THIS certificate defines.
  const markup = C.svg(Object.assign({}, rec, { name: 'Maths', grade: 5 }), { name: 'A' });
  const refs = [...markup.matchAll(/url\(#([^)]+)\)/g)].map(x => x[1]);
  ok(refs.length >= 2, 'the artwork references its gradients');
  for (const r of refs) ok(idsOf(markup).includes(r), `url(#${r}) is defined in the same certificate`);
}

// ── 7. the disclaimer reaches every surface ───────────────────────────────
{
  const d = C.DISCLAIMER;
  ok(Array.isArray(d.short) && d.short.length >= 3, 'the artwork disclaimer has several lines');
  const all = d.short.join(' ') + ' ' + d.long + ' ' + d.share;
  for (const word of ['nouklass.com', 'not', 'official']) {
    ok(all.toLowerCase().includes(word), `the disclaimer says "${word}"`);
  }
  const shortJoined = d.short.join(' ');
  for (const body of ['Mauritius Examinations Syndicate', 'Ministry of Education']) {
    ok(shortJoined.includes(body), `the artwork disclaimer names the ${body}`);
    ok(d.long.includes(body), `the showcase disclaimer names the ${body}`);
  }
  ok(/not an examination result/i.test(shortJoined), 'the artwork says it is not an examination result');
  ok(/<strong>not<\/strong>|not<\/strong>/.test(d.long) || /\bnot\b/.test(d.long),
     'the showcase disclaimer is emphatic');

  // The disclaimer has to be IN the picture — a caption is lost the moment the
  // image is forwarded on its own.
  const rec = C.buildRecord('test-pack', counts, { a: { explored: 20, secure: 20 } });
  const markup = C.svg(Object.assign({}, rec, { name: 'Mathematics', grade: 5 }), { name: 'Ana' });
  for (const line of d.short) {
    ok(markup.includes(line.replace(/&/g, '&amp;')), `the artwork carries: "${line.slice(0, 40)}…"`);
  }

  // ⚠ The share MESSAGE must not carry the child's name. A shared score in
  //   this app never does, and a message is forwarded far past whoever it was
  //   sent to; the picture is the thing the family chose to attach.
  const text = C.shareText(Object.assign({}, rec, { name: 'Mathematics', grade: 5, tier: C.TIERS[6] }));
  ok(!/Ana/.test(text), 'the share message carries no child name');
  ok(text.includes(d.share), 'the share message carries the disclaimer');
}

// ── 8. the generated count table ──────────────────────────────────────────
{
  const countsFile = path.join(ROOT, 'subjects', '_counts.js');
  ok(fs.existsSync(countsFile), 'subjects/_counts.js exists (node scripts/build-subject-counts.js)');
  if (fs.existsSync(countsFile)) {
    const table = require(countsFile);
    const packs = Object.keys(table);
    ok(packs.length > 40, `the table covers every pack (${packs.length})`);
    let total = 0;
    for (const p of packs) {
      for (const ch of Object.keys(table[p])) {
        const row = table[p][ch];
        ok(Array.isArray(row) && row.length === 4 && row.every(n => Number.isInteger(n) && n >= 0),
           `${p}/${ch} is four non-negative integers`);
        total += row[0] + row[1] + row[2] + row[3];
      }
    }
    ok(total > 30000, `the table holds the whole corpus (${total} questions)`);

    // ⚠ The builder duplicates isPoolQuestion(). There is no shared module
    //   between the browser and the build scripts, and this repo's standing
    //   hazard is exactly that kind of copy drifting.
    const engine = fs.readFileSync(path.join(ROOT, 'engine', 'questions_engine.js'), 'utf8');
    const m = engine.match(/_POOL_TYPES_EXCLUDED\s*=\s*new Set\(\[([^\]]*)\]\)/);
    ok(!!m, 'engine/questions_engine.js still declares _POOL_TYPES_EXCLUDED');
    if (m) {
      const engineSet = m[1].split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean).sort();
      const builder = require(path.join(ROOT, 'scripts', 'build-subject-counts.js'));
      const buildSet = [...builder.POOL_TYPES_EXCLUDED].sort();
      eq(buildSet.join(','), engineSet.join(','),
         'build-subject-counts.js excludes exactly what isPoolQuestion() excludes');
    }

    // Every live pack must be able to reach mastery at all: a pack in the
    // table with no questions would hand out a certificate nobody can climb.
    const idx = fs.readFileSync(path.join(ROOT, 'subjects', '_index.js'), 'utf8');
    const live = [...idx.matchAll(/"id":"(grade\d+-[a-z0-9-]+)"/g)].map(x => x[1]);
    const coming = new Set([...idx.matchAll(/"id":"(grade\d+-[a-z0-9-]+)"[^}]*?"comingSoon":true/g)].map(x => x[1]));
    for (const p of live) {
      if (coming.has(p)) continue;
      const t = table[p];
      if (!t) { fails.push(`live pack ${p} is missing from subjects/_counts.js — rebuild it`); continue; }
      const n = Object.values(t).reduce((s, r) => s + r[0] + r[1] + r[2] + r[3], 0);
      ok(n > 0, `live pack ${p} has practisable questions in the table`);
    }
  }
}

// ── report ────────────────────────────────────────────────────────────────
if (fails.length) {
  console.log(`certificates: ${pass} passed, ${fails.length} FAILED`);
  for (const f of fails) console.log('  ✗ ' + f);
  process.exit(1);
}
console.log(`certificates: ${pass} checks passed`);
