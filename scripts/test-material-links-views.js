'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Materials: links as well as files, plus search and the three views.
//
//  ⚠ THE SECURITY POINT. A link material's URL is written into an href on the
//  PUPIL page (guest.html), which is opened from a WhatsApp message by people
//  with no account. `javascript:` and `data:` must therefore be refused in
//  THREE independent places, because the first of them runs on the machine of
//  whoever is trying it:
//     1. normaliseMaterialUrl()          — the teacher's form
//     2. learning_materials_source_ck    — the database CHECK
//     3. the /^https?:\/\//i test        — the Lambda, and guest.js at render
//  A test that only covered (1) would be testing the honour system.
//
//  Run: node scripts/test-material-links-views.js
// ══════════════════════════════════════════════════════════════════════════

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const ROOT = path.resolve(__dirname, '..');
let pass = 0, fail = 0;
const ck = (label, ok, detail) => {
  if (ok) { pass++; return; }
  fail++; console.log('  FAIL  ' + label + (detail ? '  [' + detail + ']' : ''));
};
const section = t => console.log('\n── ' + t + ' ──');

// ── 1 · the helpers, in a VM ──────────────────────────────────────────────
section('link helpers');
const store = {};
const sandbox = {
  console, URL,
  window: {}, document: { createElement: () => ({ style: {} }) },
  localStorage: { getItem: k => (k in store ? store[k] : null),
                  setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'engine/helpers.js'), 'utf8'), sandbox, { filename: 'helpers.js' });
const H = sandbox;

ck('helpers expose the link API',
  ['normaliseMaterialUrl', 'materialKind', 'isLinkMaterial', 'materialIcon', 'materialTypeLabel',
   'materialHost', 'youTubeId', 'filterMaterials', 'groupMaterialsByDay', 'groupMaterialsBySubject',
   'materialViewBar', 'readMaterialView', 'writeMaterialView'].every(k => typeof H[k] === 'function'));

// ⚠ The refusals matter more than the acceptances.
for (const bad of ['javascript:alert(1)', 'JavaScript:alert(1)', ' javascript:alert(1) ',
                   'data:text/html,<script>x</script>', 'file:///etc/passwd', 'ftp://x.com/a',
                   'vbscript:x', 'not a url', 'localhost', 'https://x', '', null, undefined]) {
  ck('refuses ' + JSON.stringify(bad), H.normaliseMaterialUrl(bad) === null);
}
for (const [raw, want] of [
  ['https://youtu.be/dQw4w9WgXcQ', 'https://youtu.be/dQw4w9WgXcQ'],
  ['http://mie.ac.mu/notes.pdf',   'http://mie.ac.mu/notes.pdf'],
  ['  https://a.com/b  ',          'https://a.com/b'],
]) ck('accepts ' + JSON.stringify(raw), H.normaliseMaterialUrl(raw) === want, String(H.normaliseMaterialUrl(raw)));
// A bare domain is what a teacher actually pastes off a whiteboard.
ck('a bare domain is upgraded to https', H.normaliseMaterialUrl('mie.ac.mu/x.pdf') === 'https://mie.ac.mu/x.pdf',
  String(H.normaliseMaterialUrl('mie.ac.mu/x.pdf')));

for (const [u, id] of [
  ['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
  ['https://www.youtube.com/watch?list=x&v=dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
  ['https://youtu.be/dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
  ['https://www.youtube.com/shorts/dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
  ['https://www.youtube.com/embed/dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
  ['https://vimeo.com/12345', null],
  ['https://mie.ac.mu/notes.pdf', null],
]) ck('youTubeId(' + u.slice(0, 44) + ')', H.youTubeId(u) === id, String(H.youTubeId(u)));

const vid  = { id: 'v', title: 'Fractions video', source_type: 'link', external_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', subject: 'maths', created_at: '2026-09-04T09:00:00Z' };
const pdfL = { id: 'p', title: 'MIE syllabus',    source_type: 'link', external_url: 'https://mie.ac.mu/syllabus.pdf', subject: 'science', created_at: '2026-09-02T09:00:00Z' };
const file = { id: 'f', title: 'Worksheet',       source_type: 'file', file_name: 'ws.pdf', file_size: 2048, subject: 'maths', grade: 5, created_at: '2026-09-04T11:00:00Z' };
const img  = { id: 'i', title: 'Board photo',     source_type: 'file', file_name: 'photo.JPG', created_at: '2026-08-30T09:00:00Z' };

ck('a link is a link', H.isLinkMaterial(vid) && H.isLinkMaterial(pdfL));
ck('a file is not', !H.isLinkMaterial(file) && !H.isLinkMaterial(img));
ck('a row with no source_type is treated as a file', H.materialKind({ file_name: 'x.pdf' }) === 'file');
ck('icons distinguish video / link-pdf / file / image',
  H.materialIcon(vid) === '▶️' && H.materialIcon(pdfL) === '📄' && H.materialIcon(file) === '📄' && H.materialIcon(img) === '🖼️',
  [H.materialIcon(vid), H.materialIcon(pdfL), H.materialIcon(file), H.materialIcon(img)].join(' '));
ck('type labels read plainly',
  H.materialTypeLabel(vid) === 'Video' && H.materialTypeLabel(pdfL) === 'Link'
  && H.materialTypeLabel(file) === 'File' && H.materialTypeLabel(img) === 'Image');
ck('the host is shown without www', H.materialHost(vid) === 'youtube.com', H.materialHost(vid));
ck('a file has no host', H.materialHost(file) === '');

// ⚠ A link must never claim an expiry.
const linkMsg = H.materialShareMessage(vid, vid.external_url);
const fileMsg = H.materialShareMessage({ ...file, link_expiry_seconds: 3600 }, 'https://signed');
ck('a link share message carries no expiry sentence', !/works for/i.test(linkMsg), linkMsg);
ck('a file share message still states its expiry', /works for 1 hour/i.test(fileMsg), fileMsg);
ck('the link share message carries the URL', linkMsg.includes(vid.external_url));

section('search');
const all = [vid, pdfL, file, img];
const found = q => H.filterMaterials(all, q).map(r => r.id).join('');
ck('empty query returns everything', found('') === 'vpfi');
ck('matches a title word', found('fractions') === 'v');
ck('word order does not matter', found('video fractions') === 'v');
ck('matches a subject', found('science') === 'p');
ck('matches a grade', found('grade 5') === 'f');
ck('matches the type', found('video') === 'v');
ck('matches the host of a link', found('mie.ac.mu') === 'p');
ck('matches a file name', found('photo') === 'i');
ck('is case-insensitive', found('FRACTIONS') === 'v');
ck('is accent-insensitive',
  H.filterMaterials([{ title: 'Révision' }], 'revision').length === 1
  && H.filterMaterials([{ title: 'Revision' }], 'révision').length === 1);
ck('no match returns empty, never everything', found('zzzz') === '');
ck('filtering returns a copy', H.filterMaterials(all, '') !== all);

section('grouping');
const byDay = H.groupMaterialsByDay(all);
ck('materials group by local day', byDay.size >= 3, String(byDay.size));
ck('a dateless row is skipped rather than grouped under ""',
  H.groupMaterialsByDay([{ id: 'x', title: 'x' }]).size === 0);
const bySub = H.groupMaterialsBySubject(all);
ck('subjects are grouped', bySub.length === 3, JSON.stringify(bySub.map(g => g[0])));
// ⚠ Untagged LAST, matching the sort rule. A file with no subject is the least
// useful thing to head a list someone is scanning for one subject.
ck('the untagged group sorts LAST', bySub[bySub.length - 1][0] === '', JSON.stringify(bySub.map(g => g[0])));

section('views');
ck('view defaults to list', H.readMaterialView() === 'list');
H.writeMaterialView('calendar');
ck('a chosen view is remembered', H.readMaterialView() === 'calendar');
H.writeMaterialView('nonsense');
ck('a junk view is refused rather than stored', H.readMaterialView() === 'calendar');
const vbar = H.materialViewBar('calendar', 'TeacherMaterials.setView');
ck('the view bar renders one button per view', (vbar.match(/<button/g) || []).length === 3);
ck('exactly one view button is pressed', (vbar.match(/aria-pressed="true"/g) || []).length === 1);
ck('the view group is labelled for a screen reader', /role="group"/.test(vbar) && /aria-label=/.test(vbar));
// ⚠ Sort and view are SEPARATE keys. Sharing one would make a stored sort
// silently become a view, or vice versa, on the next release.
// ⚠ Read through runInContext: these are `const`, and a const binding is not a
// property of the VM context object the way a function declaration is.
const viewStore = vm.runInContext('MATERIAL_VIEW_STORE', sandbox);
const sortStore = vm.runInContext('MATERIAL_SORT_STORE', sandbox);
ck('view and sort use different storage keys', viewStore !== sortStore, viewStore + ' vs ' + sortStore);
ck('both keys are versioned', /_v\d+$/.test(viewStore) && /_v\d+$/.test(sortStore));

// ── 2 · the wiring ────────────────────────────────────────────────────────
section('wiring');
const teacherSrc = fs.readFileSync(path.join(ROOT, 'engine/teacher.js'), 'utf8');
const guestSrc   = fs.readFileSync(path.join(ROOT, 'guest.js'), 'utf8');
const fnSrc      = fs.readFileSync(path.join(ROOT, 'netlify/functions/classroom-materials.js'), 'utf8');
const htmlSrc    = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const cssSrc     = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');
const migSrc     = fs.readFileSync(path.join(ROOT, 'migrations/20260908_material_links.sql'), 'utf8');

for (const [name, ok] of [
  ['setView', /setView,/.test(teacherSrc)], ['setSearch', /setSearch,/.test(teacherSrc)],
  ['clearSearch', /clearSearch,/.test(teacherSrc)], ['shiftMonth', /shiftMonth,/.test(teacherSrc)],
  ['setSource', /setSource,/.test(teacherSrc)],
]) ck('TeacherMaterials exposes ' + name, ok);

ck('the teacher form has a link input', /id="tm-url"/.test(htmlSrc));
ck('…and a file/link source toggle', /TeacherMaterials\.setSource\('link'\)/.test(htmlSrc));
ck('…and a search box wired to setSearch', /id="tm-search"/.test(htmlSrc) && /TeacherMaterials\.setSearch/.test(htmlSrc));
ck('…and a separate controls host, so the bars are not rebuilt with the list',
  /id="tm-controls"/.test(htmlSrc));
ck('the link input is type=url', /id="tm-url"[^>]*type="url"/.test(htmlSrc));

ck('a link is saved with source_type link', /source_type: 'link'/.test(teacherSrc));
ck('the URL is normalised before saving', /normaliseMaterialUrl\(raw\)/.test(teacherSrc));
ck('a link is never signed', /if \(isLinkMaterial\(f\)\) return f\.external_url/.test(teacherSrc));
ck('deleting a link does not call storage.remove with an empty path',
  /if \(filePath\) await _sb\.storage/.test(teacherSrc));
ck('the missing-migration case is explained, not shown as a raw error',
  /material-links migration/.test(teacherSrc));
ck('re-share is on every card in every view', /Share again/.test(teacherSrc));
ck('the sort bar is hidden in the calendar view', /_view !== 'calendar'/.test(teacherSrc));
ck('view and search reset in load(), per the module-state rule',
  /_view\s+= readMaterialView\(\)/.test(teacherSrc) && /_search\s+= ''/.test(teacherSrc));

ck('the API asks for the link columns', /source_type, external_url/.test(fnSrc));
ck('…with a fallback for the un-migrated database', /COLS_OLD/.test(fnSrc));
// ⚠ The fallback must fire ONLY on a missing column. Falling back on any error
// is how the deleted_at filter was once dropped and deleted children came back.
ck('…that fires only on 42703 / PGRST204', /42703/.test(fnSrc) && /PGRST204/.test(fnSrc));
ck('the API re-checks the scheme before returning a link URL',
  /\^https\?:/.test(fnSrc), 'no scheme test found in the Lambda');
ck('the API never signs a link', /isLink/.test(fnSrc) && /else if \(f\.file_path\)/.test(fnSrc));

ck('the pupil page renders links', /source_type === 'link'/.test(guestSrc));
ck('…re-checking the scheme before building the href', /\^https\?:/.test(guestSrc));
ck('…with noopener AND noreferrer on an external link',
  /rel="noopener noreferrer"/.test(guestSrc));
ck('…and names the engine twin it must be kept in step with', /engine\/helpers\.js/.test(guestSrc));

ck('the calendar chip labels are hidden on a phone', /\.tm-cal-chip-t \{ display: none/.test(cssSrc));
ck('the search box is 16px, so iOS does not zoom', /\.tm-search-input \{[^}]*font-size: 16px/.test(cssSrc.replace(/\s+/g, ' ').replace(/\.tm-search-input \{/g, '\n.tm-search-input {')) || /font-size: 16px/.test(cssSrc));
ck('the chalkboard override uses the doubled id to beat the board rule',
  /#screen-teacher#screen-teacher \.tm-cal-cell/.test(cssSrc));

section('migration');
ck('adds source_type with a file default', /source_type\s+text NOT NULL DEFAULT 'file'/.test(migSrc));
ck('adds external_url', /ADD COLUMN IF NOT EXISTS external_url/.test(migSrc));
ck('drops NOT NULL on file_path and file_name',
  /file_path' AND attnotnull/.test(migSrc) && /file_name' AND attnotnull/.test(migSrc));
// ⚠ Dropping the NOT NULLs without this would allow a row that is neither a
// file nor a link — an untappable ghost in every list.
ck('replaces them with a CHECK, so every material stays openable',
  /learning_materials_source_ck/.test(migSrc));
ck('the CHECK restricts a link to http/https', /\^https\?:\/\//.test(migSrc));
ck('it is idempotent', (migSrc.match(/IF NOT EXISTS/g) || []).length >= 4);
ck('it explains why no GRANT is needed', /TABLE-level grants/.test(migSrc));

console.log('\n' + (fail ? 'FAILED' : 'PASSED') + ': ' + pass + ' checks passed, ' + fail + ' failed.');
process.exitCode = fail ? 1 : 0;
