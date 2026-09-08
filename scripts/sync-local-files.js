'use strict';
// Bring LOCAL_FILES in engine/question_loader.js back in step with what is on disk.
//
//   node scripts/sync-local-files.js            report only
//   node scripts/sync-local-files.js --write    apply
//
// WHY THIS EXISTS
// `LOCAL_FILES` is the `file://` dev map: production auto-discovers a pack's
// question files, a dev session reads only what is listed here. `scripts/check.js`
// already FAILS on a file that is missing from it — *"LOCAL_FILES["grade9-biology"]
// is missing inquiry_depth.js (invisible under file://)"* — so this can never
// ship stale. What it cannot do is fix it, and a parallel content batch is
// deliberately forbidden from editing this shared file (four agents writing to
// one map is a merge conflict, not a workflow). So every parallel run ends with
// somebody hand-patching a list. This is that step, made repeatable.
//
// ⚠ APPEND-ONLY, AND THAT IS THE POINT. It adds files present on disk and absent
//   from the map. It never removes an entry, because a name that is in the map
//   and not on disk is a DELETED question file — which is a content decision that
//   should be made by a person, and which check.js reports separately.
// ⚠ Order within a pack is preserved and new files are appended, because question
//   files push into a shared array and load order is observable.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'engine', 'question_loader.js');
const WRITE = process.argv.includes('--write');

const raw = fs.readFileSync(FILE, 'utf8');
const crlf = raw.indexOf('\r\n') !== -1;
let w = crlf ? raw.split('\r\n').join('\n') : raw;

// Every pack currently listed, and where its block sits.
const packRe = /(['"])(grade\d-[a-z-]+)\1\s*:\s*\[([\s\S]*?)\],\n/g;
const blocks = [];
let m;
while ((m = packRe.exec(w))) {
  blocks.push({ pack: m[2], start: m.index, end: m.index + m[0].length, body: m[3], whole: m[0] });
}
if (!blocks.length) { console.error('No LOCAL_FILES entries found — has the shape changed?'); process.exit(2); }

let added = 0;
const report = [];
// Rebuild from the end so earlier offsets stay valid.
for (const b of blocks.slice().reverse()) {
  const dir = path.join(ROOT, 'subjects', b.pack, 'questions');
  if (!fs.existsSync(dir)) continue;

  const onDisk = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort();
  const listed = [...b.body.matchAll(/['"]subjects\/[^'"]*?\/questions\/([^'"]+)['"]/g)].map(x => x[1]);
  const missing = onDisk.filter(f => listed.indexOf(f) === -1);
  if (!missing.length) continue;

  report.push('  ' + b.pack + ': +' + missing.length + '  ' + missing.join(', '));
  added += missing.length;

  // Match the indentation the block already uses for its continuation lines.
  const indentMatch = b.body.match(/\n(\s+)['"]/);
  const indent = indentMatch ? indentMatch[1] : '                     ';
  const additions = missing
    .map(f => indent + "'subjects/" + b.pack + '/questions/' + f + "'")
    .join(',\n');
  const rebuilt = b.whole.replace(/\],\n$/, ',\n' + additions + '],\n');
  w = w.slice(0, b.start) + rebuilt + w.slice(b.end);
}

if (!added) { console.log('LOCAL_FILES is already in step with disk.'); process.exit(0); }

console.log((WRITE ? 'Adding' : 'Would add') + ' ' + added + ' file(s):');
report.reverse().forEach(r => console.log(r));

if (!WRITE) { console.log('\nRe-run with --write to apply.'); process.exit(0); }

fs.writeFileSync(FILE, crlf ? w.split('\n').join('\r\n') : w);
console.log('\nWritten. Now run: node scripts/check.js');
