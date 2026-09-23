'use strict';
// Where a library document lives — now stated in TWO places, on purpose.
//
// ⚠ engine/ surfaces go through Library.hrefFor(). materials.js (the pupil's
//   class page) cannot: it deliberately loads no engine file, the same reason
//   the materials sort comparator is duplicated into it. So the rule exists
//   twice and this test is what keeps the two honest.
//
// ⚠ THE RULE: a SEEDED document is a static asset at /library/<filename>; a
//   CONTRIBUTED one is served by /api/library-file?id=…, a worker that re-checks
//   the document is still published. A copy that forgets the split either serves
//   an unpublished file or 404s a seeded one.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
let failures = 0;
const check = (ok, m, d) => {
  if (ok) console.log('  ✓ ' + m);
  else { failures++; console.log('  ✗ ' + m + (d !== undefined ? ' — ' + JSON.stringify(d).slice(0, 200) : '')); }
};

function fnBody(src, header) {
  const start = src.indexOf(header);
  if (start < 0) throw new Error('not found: ' + header);
  let i = src.indexOf('(', start), parens = 0;
  for (; i < src.length; i++) {
    if (src[i] === '(') parens++;
    else if (src[i] === ')' && --parens === 0) break;
  }
  let depth = 0;
  for (let j = src.indexOf('{', i); j < src.length; j++) {
    if (src[j] === '{') depth++;
    else if (src[j] === '}' && --depth === 0) return src.slice(start, j + 1);
  }
  throw new Error('unbalanced: ' + header);
}

const lib = fs.readFileSync(path.join(ROOT, 'engine', 'library.js'), 'utf8');
const mats = fs.readFileSync(path.join(ROOT, 'materials.js'), 'utf8');
const tcd = fs.readFileSync(path.join(ROOT, 'engine', 'teacher_classroom_detail.js'), 'utf8');
const app = fs.readFileSync(path.join(ROOT, 'engine', 'app.js'), 'utf8');

console.log('A dated paper is openable from every screen that shows it\n');

// ── The two implementations, run side by side ─────────────────────────────
const ctxA = {};
vm.createContext(ctxA);
vm.runInContext(fnBody(lib, '  function _hrefFor(doc) {').trim(), ctxA);
const ctxB = { encodeURIComponent };
vm.createContext(ctxB);
vm.runInContext(fnBody(mats, 'function eventPaperHref(e) {').trim(), ctxB);

const cases = [
  { name: 'a seeded paper',
    doc: { id: 'd1', storage: 'static', filename: 'g6-2019-maths.pdf' },
    ev:  { library_document_id: 'd1', doc_storage: 'static', doc_filename: 'g6-2019-maths.pdf' },
    want: '/library/g6-2019-maths.pdf' },
  { name: 'a contributed paper',
    doc: { id: 'd2', storage: 'r2', filename: null },
    ev:  { library_document_id: 'd2', doc_storage: 'r2', doc_filename: null },
    want: '/api/library-file?id=d2' },
  { name: 'an id needing escaping',
    doc: { id: 'a b&c', storage: 'r2' },
    ev:  { library_document_id: 'a b&c', doc_storage: 'r2' },
    want: '/api/library-file?id=a%20b%26c' },
];

console.log('The engine definition and the class-page copy agree');
for (const c of cases) {
  const a = ctxA._hrefFor(c.doc);
  const b = ctxB.eventPaperHref(c.ev);
  check(a === c.want, `${c.name}: engine → ${c.want}`, a);
  check(b === c.want, `${c.name}: class page → ${c.want}`, b);
  check(a === b, `${c.name}: ⚠ the two copies agree`, { engine: a, classPage: b });
}

// ⚠ An unpublished paper arrives with doc_storage/doc_filename NULL, because
//   materials_library_open()'s LEFT JOIN filters on status='published'. It must
//   produce no link at all rather than a static path to a withdrawn file.
console.log('\nA withdrawn paper offers no link');
check(ctxB.eventPaperHref({ library_document_id: 'd3', doc_storage: 'static', doc_filename: null }) === '',
  '⚠ a seeded paper with no filename yields no link, never /library/null');
check(ctxB.eventPaperHref({}) === '', 'an ordinary calendar entry yields no link');
check(ctxB.eventPaperHref(null) === '', 'and neither does nothing at all');
check(ctxA._hrefFor(null) === '', 'the engine copy survives a null document too');

// ── Every reader actually selects the column ──────────────────────────────
console.log('\nEvery reader asks for the column');
// ⚠ This is the defect that made the feature half-work: the row was written
//   correctly and NOBODY READ IT.
check(/library_document_id, library_documents\(/.test(tcd),
  "the teacher's calendar selects the document, not just the id");
check(/_eventPaperLink\(e\)/.test(tcd), 'and its event row renders the link');
check(/doc_filename/.test(mats) && /doc_storage/.test(mats),
  'the class page reads the fields the RPC now sends');
check(/_ASGN_COLS_READ/.test(fs.readFileSync(path.join(ROOT, 'engine', 'store.js'), 'utf8')),
  'and Store.loadAssignments embeds the document for both dashboards');

// ── The parent's own list describes a paper ───────────────────────────────
console.log("\nThe parent can read back what they set");
{
  const body = fnBody(app, '  async function _renderAssignments() {');
  check(/library_document_id/.test(body), 'the parent list branches on a paper');
  check(/Library\.hrefFor/.test(body), 'and links to it through the one definition');
  check(/assignmentDueState/.test(body), 'with the shared due-state definition');
  check(/sortAssignments/.test(body), 'in the same order the child sees');
  check(/no longer available/.test(body), 'a withdrawn paper is named as such');
  // ⚠ The bug this replaced: a paper printed as "Any Chapter - All Levels".
  check(!/\$\{ch\?\.name \|\| a\.chapter_id \|\| 'Any Chapter'\} - \$\{dlv\}/.test(body),
    "⚠ a paper is no longer described as \"Any Chapter\"");
}

// ── Styling that will apply ───────────────────────────────────────────────
console.log('\nBoth links are styled for their own surface');
{
  const css = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');
  const html = fs.readFileSync(path.join(ROOT, 'materials.html'), 'utf8');
  check(/\.tc-ev-paper\s*\{/.test(css), '.tc-ev-paper has a rule (chalkboard palette)');
  check(/\.ev-paper\{/.test(html), '.ev-paper has a rule on the class page');
  // ⚠ The classroom overlay is a dark board; #4f46e5 sinks into it.
  check(/\.tc-ev-paper\s*\{[^}]*#c7d2fe/.test(css),
    '⚠ the chalkboard copy is pale, not the class page indigo');
}

console.log(failures ? `\n✗ ${failures} failure(s)` : '\n✓ all checks passed');
process.exit(failures ? 1 : 0);
