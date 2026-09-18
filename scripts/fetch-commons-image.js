#!/usr/bin/env node
'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Fetch a diagram from Wikimedia Commons, WITH its licence and author.
//
//  ⚠ THE PROVENANCE IS CAPTURED IN THE SAME CALL AS THE PIXELS, and the file is
//  refused if it cannot be read. assets/questions/PROVENANCE-TODO.md records why:
//  115 of 138 images already in this repo ship with no recorded source, author or
//  licence, and the attempt to trace them afterwards established provenance for
//  ZERO of them. "We will write the credits later" has been tried here and it
//  does not work — by then the download page, the search that found it and the
//  person who ran it are all gone.
//
//  ⚠ It also refuses a licence this project cannot use. Accepted: public domain,
//  CC0, CC BY, CC BY-SA (any version). Everything else — including "fair use",
//  non-commercial and no-derivatives — exits non-zero and writes nothing. The app
//  is publicly hosted and grades 3-9 are paid, so a non-commercial image is not a
//  small problem.
//
//  Usage:
//    node scripts/fetch-commons-image.js "File:Simple diagram of plant cell (numbers).svg"
//    node scripts/fetch-commons-image.js --list            # what has been fetched
//    node scripts/fetch-commons-image.js --check "File:X"  # licence only, no download
//
//    --as <name>     local basename (default: derived from the Commons title)
//    --width <px>    render width for SVG/large raster (default 900)
// ══════════════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets', 'questions', 'labels');
const MANIFEST = path.join(ROOT, 'docs', 'label-diagrams', 'provenance.json');
const API = 'https://commons.wikimedia.org/w/api.php';
const UA = 'psac-practice-image-fetch/1.0 (educational question bank; contact via repo)';

// ⚠ Matched against the machine-readable licence short name, lowercased. Kept
//   deliberately tight — a pattern like /cc/ would admit CC BY-NC-ND.
const ACCEPTED = [
  { re: /^cc0/,                     label: 'CC0',          attribution: false },
  { re: /^public domain|^pd(-|$)/,  label: 'Public domain', attribution: false },
  { re: /^cc by-sa \d/,             label: null,           attribution: true  },
  { re: /^cc by \d/,                label: null,           attribution: true  },
];
const REFUSE_HINT = 'Accepted: public domain, CC0, CC BY, CC BY-SA. '
  + 'Refused: anything non-commercial (NC), no-derivatives (ND), fair use, or unstated.';

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const has = name => args.includes(name);

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ⚠ COMMONS RATE-LIMITS, and it does it fast enough to matter: fetching five
//   files in a loop returned 429 on the third. A bulk fetch that gives up on the
//   first 429 leaves a half-downloaded batch whose manifest disagrees with the
//   directory, which is the state this whole script exists to prevent. Retry
//   with backoff, honour Retry-After, and fail only after the last attempt.
function get(url, asBuffer, attempt) {
  attempt = attempt || 1;
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': UA } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return resolve(get(res.headers.location, asBuffer));
      }
      if ((res.statusCode === 429 || res.statusCode >= 500) && attempt <= 5) {
        const after = Number(res.headers['retry-after']);
        const waitMs = Number.isFinite(after) && after > 0
          ? Math.min(after * 1000, 30000)
          : Math.min(1500 * Math.pow(2, attempt - 1), 24000);
        res.resume();
        console.log('  …' + res.statusCode + ', waiting ' + Math.round(waitMs / 1000)
          + 's then retrying (' + attempt + '/5)');
        return sleep(waitMs).then(() => resolve(get(url, asBuffer, attempt + 1)));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error('HTTP ' + res.statusCode + ' for ' + url));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        resolve(asBuffer ? buf : buf.toString('utf8'));
      });
    }).on('error', reject);
  });
}

const stripHtml = s => String(s == null ? '' : s)
  .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

async function lookup(title, width) {
  const url = API + '?action=query&prop=imageinfo&format=json&formatversion=2'
    + '&iiprop=url%7Cextmetadata%7Csize%7Cmime'
    + '&iiurlwidth=' + encodeURIComponent(width)
    + '&titles=' + encodeURIComponent(title);
  const j = JSON.parse(await get(url, false));
  const page = j && j.query && j.query.pages && j.query.pages[0];
  if (!page || page.missing) throw new Error('no such file on Commons: ' + title);
  if (!page.imageinfo || !page.imageinfo[0]) throw new Error('no imageinfo for ' + title);

  const info = page.imageinfo[0];
  const meta = info.extmetadata || {};
  const field = k => (meta[k] ? stripHtml(meta[k].value) : '');

  return {
    title: page.title,
    descriptionUrl: info.descriptionurl,
    // ⚠ thumburl is a RENDERED PNG. An SVG served raw would carry the
    //   illustrator's own text layers — including, on a labelled variant, the
    //   answers — and can execute script. Always ship the raster.
    fileUrl: info.thumburl || info.url,
    width: info.thumbwidth || info.width,
    height: info.thumbheight || info.height,
    mime: info.thumbmime || info.mime,
    licenceShort: field('LicenseShortName'),
    licenceUrl: field('LicenseUrl'),
    author: field('Artist'),
    credit: field('Credit'),
    restrictions: field('Restrictions'),
  };
}

function judge(info) {
  const short = (info.licenceShort || '').toLowerCase();
  if (!short) return { ok: false, why: 'Commons reports no machine-readable licence' };
  if (/\bnc\b|noncommercial|non-commercial/.test(short))
    return { ok: false, why: 'non-commercial licence: ' + info.licenceShort };
  if (/\bnd\b|noderiv/.test(short))
    return { ok: false, why: 'no-derivatives licence: ' + info.licenceShort };
  if (info.restrictions)
    return { ok: false, why: 'carries a restriction template: ' + info.restrictions };
  for (const rule of ACCEPTED) {
    if (rule.re.test(short)) {
      return { ok: true, label: rule.label || info.licenceShort, attribution: rule.attribution };
    }
  }
  return { ok: false, why: 'licence not on the accepted list: ' + info.licenceShort };
}

const slug = title => title
  .replace(/^File:/i, '').replace(/\.[a-z0-9]+$/i, '')
  .toLowerCase().replace(/[()]/g, '').replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '').slice(0, 60);

function readManifest() {
  if (!fs.existsSync(MANIFEST)) return { images: [] };
  try { return JSON.parse(fs.readFileSync(MANIFEST, 'utf8')); } catch { return { images: [] }; }
}

async function main() {
  if (has('--list')) {
    const m = readManifest();
    if (!m.images.length) return console.log('nothing fetched yet');
    console.log(m.images.length + ' image(s):');
    for (const i of m.images) console.log('  ' + i.file.padEnd(42) + i.licence + '  —  ' + i.author);
    return;
  }

  const title = args.find(a => /^File:/i.test(a));
  if (!title) {
    console.error('Usage: node scripts/fetch-commons-image.js "File:Some diagram (numbers).svg"');
    console.error('       --as <name>  --width <px>  --check  --list');
    process.exit(2);
  }

  const width = Number(flag('--width', 900));
  const info = await lookup(title, width);
  const verdict = judge(info);

  console.log(info.title);
  console.log('  licence   ' + (info.licenceShort || '(none reported)'));
  console.log('  author    ' + (info.author || '(none reported)'));
  console.log('  rendered  ' + info.width + 'x' + info.height + '  ' + info.mime);
  console.log('  page      ' + info.descriptionUrl);

  if (!verdict.ok) {
    console.error('\n  REFUSED — ' + verdict.why);
    console.error('  ' + REFUSE_HINT);
    process.exit(1);
  }
  console.log('  verdict   ACCEPTED as ' + verdict.label
    + (verdict.attribution ? ' (attribution required)' : ' (no attribution required)'));

  if (has('--check')) return;

  // ⚠ A CC BY / CC BY-SA file with no author cannot be attributed, so it cannot
  //   be used — the obligation is unmeetable, not merely unmet.
  if (verdict.attribution && !info.author) {
    console.error('\n  REFUSED — ' + verdict.label + ' requires attribution and Commons reports no author.');
    process.exit(1);
  }

  const ext = '.png';   // provisional; the magic bytes below decide the real one
  const base = flag('--as', slug(info.title)) + ext;
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const dest = path.join(OUT_DIR, base);

  // ⚠ Strip the API's tracking query string (?utm_source=…). It is telemetry for
  //   the API call, not part of the file's address, and upload.wikimedia.org
  //   served a persistent 429 for URLs carrying it while the bare URL answered
  //   200 — five backoff attempts failed on one file until this was removed.
  const bytes = await get(info.fileUrl.split('?')[0], true);

  // ⚠ Verify the MAGIC BYTES, not the reported mime. Commons reports the mime of
  //   the ORIGINAL (image/svg+xml) even when thumburl serves a rendered PNG, so
  //   the reported type cannot decide the extension. Writing raw SVG to a .png
  //   would ship the illustrator's text layers — on a labelled variant, the
  //   answers — under a name that hides it.
  const isPng  = bytes.slice(1, 4).toString('latin1') === 'PNG';
  const isJpeg = bytes[0] === 0xFF && bytes[1] === 0xD8;
  if (!isPng && !isJpeg) {
    console.error('\n  REFUSED — the bytes are neither PNG nor JPEG'
      + ' (starts with: ' + bytes.slice(0, 8).toString('latin1').replace(/[^\x20-\x7e]/g, '.') + ').'
      + '\n  Raster renders only: an SVG can carry hidden text and can execute script.');
    process.exit(1);
  }
  const realExt = isPng ? '.png' : '.jpg';
  const finalDest = dest.replace(/\.[a-z]+$/, realExt);

  fs.writeFileSync(finalDest, bytes);

  const manifest = readManifest();
  manifest.note = 'Written by scripts/fetch-commons-image.js at download time. '
    + 'Every entry here must also appear in assets/questions/CREDITS.md before release.';
  manifest.images = manifest.images.filter(i => i.file !== path.basename(finalDest));
  manifest.images.push({
    file: path.basename(finalDest),
    servedAt: 'assets/questions/labels/' + path.basename(finalDest),
    commonsTitle: info.title,
    commonsPage: info.descriptionUrl,
    licence: verdict.label,
    licenceUrl: info.licenceUrl || '',
    attributionRequired: verdict.attribution,
    author: info.author || '',
    credit: info.credit || '',
    renderedPx: info.width + 'x' + info.height,
    bytes: bytes.length,
    fetchedAt: new Date().toISOString().slice(0, 10),
  });
  manifest.images.sort((a, b) => a.file.localeCompare(b.file));
  fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');

  console.log('  saved     assets/questions/labels/' + path.basename(finalDest) + '  (' + (bytes.length / 1024).toFixed(0) + ' KB)');
  console.log('  recorded  docs/label-diagrams/provenance.json');

  // ⚠ The record above is not the one anything READS. build-image-credits.js and
  //   test-question-image-offline.js both read assets/questions/provenance.json,
  //   and nothing used to carry entries across — twelve label diagrams, eight of
  //   them attribution-required, were served with no line on the credits page.
  //   Syncing here means a fetch cannot leave that gap open again.
  require('child_process').execFileSync(process.execPath,
    [path.join(__dirname, 'sync-label-provenance.js')], { stdio: 'inherit' });
}

main().catch(e => { console.error('FAILED: ' + e.message); process.exit(1); });
