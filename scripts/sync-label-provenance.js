#!/usr/bin/env node
'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Fold the label-diagram download record into the ONE provenance file that
//  the credits page and the licence test actually read.
//
//    node scripts/sync-label-provenance.js [--check]
//
//  ⚠ WHY THIS EXISTS. scripts/fetch-commons-image.js captures provenance at
//  download time into docs/label-diagrams/provenance.json, but
//  scripts/build-image-credits.js and scripts/test-question-image-offline.js
//  both read assets/questions/provenance.json and nothing carried entries
//  across. Twelve label diagrams were therefore served from our own domain —
//  eight of them CC BY or CC BY-SA, which require attribution on every copy —
//  while the generated credits page listed none of them. The attribution was
//  sitting in CREDITS.md the whole time, which is exactly what makes this kind
//  of gap survive: a human reading the markdown sees a complete record.
//
//  ⚠ DIMENSIONS ARE MEASURED FROM THE FILE, NEVER COPIED FROM THE RECORD. The
//  fetcher stores `renderedPx` from the Commons API response for the render it
//  ASKED for (900px wide); what Commons delivered and what is on disk is 960.
//  All eleven raster entries disagreed. The credits page puts these numbers in
//  width/height attributes, so a wrong pair is a distorted thumbnail.
//
//  ⚠ `usedBy` cannot be known at download time — the questions are written
//  afterwards — so it is recomputed here from the BUILT bundles. Run
//  netlify/build-questions.js first, or a freshly written question looks unused.
// ══════════════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PROV = path.join(ROOT, 'assets', 'questions', 'provenance.json');
const LABELS = path.join(ROOT, 'docs', 'label-diagrams', 'provenance.json');
const IMG_DIR = path.join(ROOT, 'assets', 'questions');
const BUNDLES = path.join(ROOT, 'netlify', 'question-bundles');

const CHECK = process.argv.includes('--check');

// Real pixels, read from the header of the file we actually serve.
function measure(abs) {
  const b = fs.readFileSync(abs);
  if (b.slice(1, 4).toString('latin1') === 'PNG') {
    return { width: b.readUInt32BE(16), height: b.readUInt32BE(20), bytes: b.length };
  }
  if (b[0] === 0xFF && b[1] === 0xD8) {
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xFF) { i++; continue; }
      const m = b[i + 1];
      if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC) {
        return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7), bytes: b.length };
      }
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  throw new Error('not a PNG or JPEG: ' + abs);
}

function usageFromBundles() {
  const use = {};
  if (!fs.existsSync(BUNDLES)) return use;
  for (const f of fs.readdirSync(BUNDLES)) {
    if (!/^grade\d-[a-z-]+\.json$/.test(f)) continue;
    let arr;
    try { arr = JSON.parse(fs.readFileSync(path.join(BUNDLES, f), 'utf8')); } catch (e) { continue; }
    if (!Array.isArray(arr)) continue;
    for (const q of arr) {
      for (const m of JSON.stringify(q).matchAll(/assets\/questions\/(labels\/[A-Za-z0-9._-]+)/g)) {
        (use[m[1]] = use[m[1]] || new Set()).add(q.id);
      }
    }
  }
  return use;
}

if (!fs.existsSync(LABELS)) { console.error('missing docs/label-diagrams/provenance.json'); process.exit(2); }
if (!fs.existsSync(PROV)) { console.error('missing assets/questions/provenance.json'); process.exit(2); }

const prov = JSON.parse(fs.readFileSync(PROV, 'utf8'));
const labels = JSON.parse(fs.readFileSync(LABELS, 'utf8'));
const use = usageFromBundles();
const before = JSON.stringify(prov);

const problems = [];
let added = 0;
let updated = 0;

for (const L of labels.images || []) {
  const file = String(L.servedAt || '').replace(/^assets\/questions\//, '');
  if (!file) { problems.push('an entry has no servedAt'); continue; }
  const abs = path.join(IMG_DIR, file);
  if (!fs.existsSync(abs)) { problems.push(file + ' is recorded but not on disk'); continue; }

  const m = measure(abs);
  const entry = {
    file,
    width: m.width,
    height: m.height,
    bytes: m.bytes,
    commonsTitle: L.commonsTitle,
    filePage: L.commonsPage,
    licence: L.licence,
    licenceUrl: L.licenceUrl || null,
    author: L.author,
    usedBy: [...(use[file] || [])].sort(),
  };
  // ⚠ Kept, never dropped: on flower-parts-crop.png this is the note saying the
  //   words PETAL, STAMEN, SEPAL and PISTIL were cropped off the artwork. It is
  //   the reason the file differs from the Commons original, and on a labelling
  //   question it is the difference between asking and answering.
  if (L.modification) entry.modification = L.modification;

  if (!entry.licence) problems.push(file + ' states no licence');
  if (!entry.usedBy.length) problems.push(file + ' is credited but used by no question');

  const at = prov.images.findIndex(i => i.file === file);
  if (at < 0) { prov.images.push(entry); added++; }
  else if (JSON.stringify(prov.images[at]) !== JSON.stringify(entry)) { prov.images[at] = entry; updated++; }
}

prov.images.sort((a, b) => a.file.localeCompare(b.file));
prov.count = prov.images.length;
prov.totalBytes = prov.images.reduce((a, b) => a + (b.bytes || 0), 0);

const changed = JSON.stringify(prov) !== before;

if (CHECK) {
  if (changed) {
    console.error('assets/questions/provenance.json is out of date'
      + ' (' + added + ' missing, ' + updated + ' stale) — run node scripts/sync-label-provenance.js');
  }
  for (const p of problems) console.error('  ⚠ ' + p);
  process.exit(changed || problems.length ? 1 : 0);
}

if (changed) fs.writeFileSync(PROV, JSON.stringify(prov, null, 1) + '\n');
for (const p of problems) console.log('  ⚠ ' + p);
console.log('  label diagrams: ' + added + ' added, ' + updated + ' updated'
  + ' · assets/questions/provenance.json now holds ' + prov.count + ' images');
if (changed) console.log('  ⚠ now run: node scripts/build-image-credits.js');
