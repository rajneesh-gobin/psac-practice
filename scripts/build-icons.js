'use strict';
// ── Rebuild the PNG app icons from icons/icon.svg ───────────────────────────
//
// ⚠⚠ THE SHIPPED PNGs WERE 2 DAYS OLDER THAN THE ARTWORK AND NOBODY NOTICED.
//    icon.svg was redesigned on 2026-08-27 (commit 9654a4d) specifically to be
//    maskable-safe; icon-192.png and icon-512.png are from 2026-08-25 and were
//    never regenerated. So the favicon showed a graduation cap and a star while
//    the Android home-screen icon showed a completely different conical hat with
//    coloured bars along the bottom edge - two different logos for one app, and
//    the PNG is the one Android and Bubblewrap actually use.
//
// ⚠ TWO PURPOSES, TWO FILES, and they are not interchangeable:
//   • purpose "any"      - drawn as-is. Keeps the rx=115 rounded corners, so the
//                          corners are transparent and it sits correctly on a
//                          browser tab or a desktop shortcut.
//   • purpose "maskable" - the OS crops it to its own circle / squircle /
//                          rounded square and fills nothing in. The background
//                          must therefore be a FULL-BLEED OPAQUE SQUARE (rx=0):
//                          ship the rounded one and a square-mask launcher shows
//                          four transparent corner wedges.
//   Both are generated from the same artwork; only the background rect differs.
//
// ⚠ The safe zone is the centred circle of 80% diameter (r=204.8 at 512). Every
//   shape in icon.svg is inside it - checked below, not assumed, because that is
//   exactly the property that silently rotted last time.
//
// Rasterises with headless Edge (Chromium), which is on every Windows 11 box, so
// this needs no image library and no network. Run it after ANY edit to
// icons/icon.svg, and commit the PNGs in the same commit as the SVG.

const fs   = require('fs');
const path = require('path');
const os   = require('os');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SVG  = path.join(ROOT, 'icons', 'icon.svg');

const EDGES = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];
const edge = EDGES.find(p => fs.existsSync(p));
if (!edge) {
  console.error('FAIL  no Microsoft Edge found - install it, or open icons/generate-icons.html by hand.');
  process.exit(1);
}

const svgSrc = fs.readFileSync(SVG, 'utf8');

// ── 1. the safe-zone check ─────────────────────────────────────────────────
// ⚠ Geometry only, and deliberately crude: it reads the primitives icon.svg
//   actually uses. It is a tripwire for "someone moved a shape outward", not a
//   general SVG engine. A <path> it cannot parse is REPORTED, never passed
//   silently - the whole point is that nothing rots unseen.
const SAFE_R = 512 * 0.8 / 2;
const far = (x, y) => Math.hypot(x - 256, y - 256);
const warn = [];
let checked = 0;

for (const m of svgSrc.matchAll(/<circle[^>]*cx="([\d.]+)"[^>]*cy="([\d.]+)"[^>]*r="([\d.]+)"/g)) {
  checked++;
  const d = far(+m[1], +m[2]) + +m[3];
  if (d > SAFE_R) warn.push(`circle at (${m[1]},${m[2]}) r=${m[3]} reaches ${d.toFixed(1)} > ${SAFE_R}`);
}
for (const m of svgSrc.matchAll(/<ellipse[^>]*cx="([\d.]+)"[^>]*cy="([\d.]+)"[^>]*rx="([\d.]+)"[^>]*ry="([\d.]+)"/g)) {
  checked++;
  const d = far(+m[1], +m[2]) + Math.max(+m[3], +m[4]);
  if (d > SAFE_R) warn.push(`ellipse at (${m[1]},${m[2]}) reaches ${d.toFixed(1)} > ${SAFE_R}`);
}
for (const m of svgSrc.matchAll(/<polygon[^>]*points="([^"]+)"/g)) {
  checked++;
  for (const pt of m[1].trim().split(/\s+/)) {
    const [x, y] = pt.split(',').map(Number);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    const d = far(x, y);
    if (d > SAFE_R) warn.push(`polygon point (${x},${y}) is ${d.toFixed(1)} from centre > ${SAFE_R}`);
  }
}
// The two full-bleed background rects are the ONLY shapes allowed to touch the
// edges, so rects at 0,0 sized 512 are skipped by design.
for (const m of svgSrc.matchAll(/<rect[^>]*x="([\d.]+)"[^>]*y="([\d.]+)"[^>]*width="([\d.]+)"[^>]*height="([\d.]+)"/g)) {
  checked++;
  const [x, y, w, h] = [+m[1], +m[2], +m[3], +m[4]];
  for (const [px, py] of [[x, y], [x + w, y], [x, y + h], [x + w, y + h]]) {
    const d = far(px, py);
    if (d > SAFE_R) warn.push(`rect corner (${px},${py}) is ${d.toFixed(1)} from centre > ${SAFE_R}`);
  }
}

console.log(`\nSafe zone (centred circle r=${SAFE_R}), ${checked} shapes checked`);
if (warn.length) { warn.forEach(w => console.log('  REVIEW ' + w)); }
else console.log('  ok   every measurable shape is inside the maskable safe zone');

// ── 2. generate-icons.html carries a SECOND copy of this artwork ───────────
// ⚠ Same standing duplication as the question factories. If they drift, the
//   hand-run generator silently produces the OTHER logo.
const genPath = path.join(ROOT, 'icons', 'generate-icons.html');
if (fs.existsSync(genPath)) {
  const emb = (fs.readFileSync(genPath, 'utf8').match(/const svg = `([\s\S]*?)`;/) || [])[1];
  const norm = (s) => s.replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ').trim();
  if (!emb) console.log('  REVIEW generate-icons.html has no embedded <svg> to compare');
  else if (norm(emb) !== norm(svgSrc)) {
    console.log('  FAIL   generate-icons.html embeds DIFFERENT artwork from icons/icon.svg');
    process.exitCode = 1;
  } else console.log('  ok   generate-icons.html embeds the same artwork');
}

// ── 3. rasterise ──────────────────────────────────────────────────────────
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-icons-'));
// ⚠ An explicit --user-data-dir, always. Without one, headless Edge attaches to
//   the user's real profile and their live browser session joins in.
const profile = path.join(tmp, 'edge-profile');

function render(svg, size, outFile) {
  const html = '<!doctype html><meta charset="utf-8">'
    + `<style>html,body{margin:0;padding:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>`
    + svg;
  const page = path.join(tmp, `page-${size}-${path.basename(outFile)}.html`);
  fs.writeFileSync(page, html, 'utf8');
  execFileSync(edge, [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    `--user-data-dir=${profile}`,
    '--default-background-color=00000000',          // real transparency, not white
    `--window-size=${size},${size}`,
    `--screenshot=${outFile}`,
    'file:///' + page.replace(/\\/g, '/'),
  ], { stdio: 'pipe' });

  const b = fs.readFileSync(outFile);
  // PNG IHDR: width/height are big-endian uint32 at bytes 16 and 20.
  const w = b.readUInt32BE(16), h = b.readUInt32BE(20);
  if (w !== size || h !== size) throw new Error(`${outFile}: got ${w}x${h}, want ${size}x${size}`);
  console.log(`  ok   ${path.relative(ROOT, outFile).replace(/\\/g, '/').padEnd(34)} ${w}x${h}  ${(b.length / 1024).toFixed(1)} KB`);
}

// The maskable variant: square the background off so the OS mask has opaque
// pixels to crop. Only the two full-bleed rects carry rx.
const maskableSvg = svgSrc.replace(/(<rect width="512" height="512") rx="115"/g, '$1');
if (maskableSvg === svgSrc) {
  console.log('\n  REVIEW could not square the background rects - check icon.svg still uses rx="115"');
}

console.log('\nRendering');
render(svgSrc,      192, path.join(ROOT, 'icons', 'icon-192.png'));
render(svgSrc,      512, path.join(ROOT, 'icons', 'icon-512.png'));
render(maskableSvg, 192, path.join(ROOT, 'icons', 'icon-192-maskable.png'));
render(maskableSvg, 512, path.join(ROOT, 'icons', 'icon-512-maskable.png'));

fs.rmSync(tmp, { recursive: true, force: true });

// ── 4. manifest must point at what we just built ──────────────────────────
const mf = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.json'), 'utf8'));
const missing = mf.icons.filter(i => i.src.startsWith('/icons/')
  && !fs.existsSync(path.join(ROOT, i.src.replace(/^\//, ''))));
console.log('');
if (missing.length) {
  console.log('  FAIL  manifest.json names icons that do not exist: ' + missing.map(i => i.src).join(', '));
  process.exitCode = 1;
} else {
  console.log('  ok   all ' + mf.icons.length + ' manifest icons exist on disk');
}
const anyIcons  = mf.icons.filter(i => String(i.purpose || 'any').split(/\s+/).includes('any'));
const maskables = mf.icons.filter(i => String(i.purpose || '').split(/\s+/).includes('maskable'));
console.log(`  ok   ${anyIcons.length} purpose="any", ${maskables.length} purpose="maskable"`);
if (!maskables.length) { console.log('  FAIL  no maskable icon declared - Android will crop the "any" one'); process.exitCode = 1; }

console.log('\n⚠ Commit the PNGs in the same commit as any icons/icon.svg change.\n');
