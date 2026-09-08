'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Generates subjects/_index.js — the EAGER half of the lazy pack loader.
//
//  WHY THIS EXISTS
//  index.html used to carry one blocking <script> per pack. At 45 packs that
//  was 45 requests and 323 KB parsed before app.js ran, on the cheap Android
//  phones this app already had display problems on. The index replaces them
//  with ONE file holding only what code outside a pack actually reads.
//
//  ⚠ WHAT GOES IN, AND WHY EXACTLY THIS SPLIT
//  Measured across all 45 packs: pack metadata 6.3 KB, chapter metadata
//  38.2 KB, chapter prose 94.4 KB, subsection maps 41.1 KB. Every consumer
//  outside the active pack (admin _allChapters, Shop.sellableChapters, the
//  plan chapter picker, reports, calendar, search, the grade/subject pickers)
//  was checked: they read a chapter's `id`, `name` and `icon` and nothing
//  more. So the index carries every chapter field EXCEPT the three prose ones,
//  and the heavy per-pack content is fetched only when a pack is opened.
//
//  ⚠ Prose fields are dropped by NAME, not by a size heuristic: a new chapter
//  field would otherwise be silently stripped and read as undefined at the far
//  end. Anything not in PROSE_FIELDS is kept, so adding a field is safe by
//  default and dropping one is a deliberate edit here.
//
//  Run: node scripts/build-subject-index.js
//  Verified by scripts/check.js, which fails if the index has drifted from the
//  manifests on disk.
// ══════════════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'subjects', '_index.js');

// Chapter fields that live only in the lazily-loaded manifest.
const PROSE_FIELDS = new Set(['syllabus', 'notes', 'enrichmentNote']);

// Pack fields that live only in the lazily-loaded manifest. `syllabus` here is
// the subsection MAP (chapterId -> {subsections}), not the chapter prose string
// of the same name — two different shapes sharing one key.
const PACK_LAZY_FIELDS = new Set([
  'chapters', '_chapters', 'syllabus', 'badges', 'formulas', 'generators', 'help',
]);

function loadPacks() {
  const dirs = fs.readdirSync(path.join(ROOT, 'subjects'), { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort();

  const packs = [];
  const ctx = {
    STATIC_QUESTIONS: [],
    console: { log() {}, warn() {}, error() {} },
    registerSubject: p => { packs.push(p); return p; },
    extendSubject: () => null,
    makeMCQ: o => o, makeNum: o => o, makeTF: o => o,
    makeMatch: o => o, makeSymmetry: o => o, makeCloze: o => o,
  };
  ctx.window = ctx;
  vm.createContext(ctx);

  const order = [];
  for (const d of dirs) {
    const rel = path.posix.join('subjects', d, '_manifest.js');
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) continue;
    const before = packs.length;
    vm.runInContext(fs.readFileSync(abs, 'utf8'), ctx, { filename: rel });
    for (let i = before; i < packs.length; i++) {
      order.push({ pack: packs[i], dir: d, src: rel });
    }
  }
  return order;
}

function liteOf(entry) {
  const { pack, dir, src } = entry;
  const out = {};
  for (const [k, v] of Object.entries(pack)) {
    if (PACK_LAZY_FIELDS.has(k)) continue;
    if (typeof v === 'function') continue;
    out[k] = v;
  }
  out.chapters = (Array.isArray(pack.chapters) ? pack.chapters : []).map(ch => {
    const c = {};
    for (const [k, v] of Object.entries(ch)) {
      if (PROSE_FIELDS.has(k)) continue;
      if (typeof v === 'function') continue;
      c[k] = v;
    }
    return c;
  });

  // Files the loader must pull in alongside the manifest. grade5-maths/help.js
  // calls extendSubject() and so has to arrive after its own manifest.
  const extras = [];
  const help = path.posix.join('subjects', dir, 'help.js');
  if (fs.existsSync(path.join(ROOT, help))) extras.push(help);

  out._lite = true;
  out._src = src;
  if (extras.length) out._extra = extras;
  return out;
}

const entries = loadPacks();
const lite = entries.map(liteOf);

const body = lite.map(p => `registerSubject(${JSON.stringify(p)});`).join('\n');

const header = `'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  GENERATED FILE — DO NOT EDIT BY HAND.
//  Source: subjects/*/_manifest.js
//  Regenerate: node scripts/build-subject-index.js
//
//  The eager half of the lazy pack loader: every registered pack, with its
//  chapter list, but WITHOUT chapter prose, subsection maps, generators,
//  badges, formulas or help. Those arrive when PackLoader.ensure(packId)
//  fetches the pack's own _manifest.js, which re-registers over this entry.
//
//  This file is the ONLY subject script index.html loads eagerly. Adding a
//  pack means adding a directory and re-running the generator — never adding
//  a <script> tag.
// ══════════════════════════════════════════════════════════════════════════

`;

fs.writeFileSync(OUT, header + body + '\n', 'utf8');

const bytes = fs.statSync(OUT).size;
const chapters = lite.reduce((n, p) => n + p.chapters.length, 0);
console.log(`subjects/_index.js — ${lite.length} packs, ${chapters} chapters, ${(bytes / 1024).toFixed(1)} KB`);
