'use strict';
// ── Vendored ES modules must resolve from OUR origin ───────────────────────
// Run: node scripts/test-vendored-modules.js
//
// ⚠⚠ THE FAILURE THIS PREVENTS shipped and stayed shipped. assets/vendor/
//    qrcode.mjs was downloaded from jsDelivr's `+esm` build, which does NOT
//    bundle its dependencies — it EXTERNALISES them as absolute jsDelivr
//    paths:
//        import * as ne from "/npm/encode-utf8@1.0.3/+esm"
//        import * as re from "/npm/dijkstrajs@1.0.3/+esm"
//    Served from our own domain those resolve against nouklass.com, not
//    against the CDN, so the browser fetched https://nouklass.com/npm/… ,
//    got a 404 (verified live), and the whole module graph failed. The
//    dynamic import rejected, _loadLocalQRCode() returned null, and every
//    caller fell back: "QR code unavailable right now".
//
// ⚠ IT LOOKED FINE FROM EVERY ANGLE THAT WAS CHECKED. The file was present,
//   committed, staged by prepare-deploy, and served 200 with the correct
//   text/javascript. The failure was one level deeper — inside the file, in
//   an import nobody reads — and the feature's own fallback message made it
//   look like a transient network problem rather than something that had
//   never worked once, on any device.
//
// ⚠ The point of vendoring is that the CDN is not needed. A vendored file
//   that still reaches for the CDN is worse than loading it from the CDN:
//   it fails even when the CDN is reachable.
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const VENDOR = path.join(ROOT, 'assets/vendor');

let checks = 0, fails = 0;
const ok = (label, cond, detail) => {
  checks++;
  if (cond) return;
  fails++;
  console.log('FAIL ' + label + (detail === undefined ? '' : `\n     ${JSON.stringify(detail)}`));
};

const files = fs.existsSync(VENDOR) ? fs.readdirSync(VENDOR).filter(f => /\.(mjs|js)$/.test(f)) : [];
ok('assets/vendor holds at least one module', files.length > 0, files);

// ⚠ DO NOT REGEX MINIFIED CODE FOR IMPORTS. The first version of this test did
//   and reported a specifier of ",r," in dijkstrajs — the match came from
//   inside a string literal, `"Could not find a path from ",r," to "`. A test
//   that invents findings is worse than no test, because the next real one gets
//   ignored alongside it. Node's own resolver answers the actual question, and
//   it is the same question the browser asks: does every import resolve?
const { pathToFileURL } = require('node:url');

async function resolves(file) {
  try {
    await import(pathToFileURL(path.join(VENDOR, file)).href);
    return { ok: true };
  } catch (e) {
    // ⚠ Tell the two failures apart. A module that cannot be RESOLVED is
    //   broken everywhere, browser included. One that resolved but then wanted
    //   a DOM is fine — it is browser code, and Node has no document.
    const unresolved = e.code === 'ERR_MODULE_NOT_FOUND'
      || /Cannot find module|Failed to resolve/i.test(e.message || '');
    return { ok: !unresolved, unresolved, message: e.message };
  }
}

// ⚠ The textual half checks for ONE thing, the jsDelivr signature that caused
//   this: a `/npm/…` path inside a vendored bundle. It is a `+esm` build whose
//   dependencies were never bundled, and it resolves against whatever host is
//   serving the page.
for (const f of files) {
  const src = fs.readFileSync(path.join(VENDOR, f), 'utf8');
  ok(`${f} carries no jsDelivr /npm/ path`, !/["']\/npm\//.test(src),
    (src.match(/["']\/npm\/[^"']*/) || [])[0]);
  ok(`${f} does not import from a CDN`, !/from\s*["']https?:\/\//.test(src),
    (src.match(/from\s*["']https?:\/\/[^"']*/) || [])[0]);

  // ⚠⚠ THE FILENAME MUST CARRY A VERSION, and this is not tidiness. sw.js
  //    serves /assets/ cache-first from ASSET_CACHE — a cache with NO version
  //    in its name, explicitly kept across every SHELL_VERSION bump, whose
  //    cacheFirstWithNetwork() returns a hit without ever revalidating. So a
  //    browser that once fetched a broken vendored file keeps it FOREVER: no
  //    deploy, no reload and no shell bump replaces it. Measured — the /npm/
  //    fix above went live and the console still read
  //    "/npm/encode-utf8@1.0.3/+esm 404" from the cached copy.
  //    The URL is the only cache key there is, so a fix has to change it.
  ok(`${f} has a version in its filename, so a fix can reach a cached browser`,
    /\d+\.\d+\.\d+/.test(f), f);
}

// ── The QR encoder specifically: the app calls exactly these ───────────────
(async () => {
  // Every vendored module must resolve its whole graph.
  for (const f of files) {
    const r = await resolves(f);
    ok(`${f} resolves every import it makes`, r.ok, r.message);
  }

  const qrPath = path.join(VENDOR, 'qrcode.mjs');
  if (fs.existsSync(qrPath)) {
    let mod = null;
    try {
      mod = await import(require('node:url').pathToFileURL(qrPath).href);
    } catch (e) {
      ok('qrcode.mjs imports without reaching the network', false, e.message);
    }
    if (mod) {
      const q = mod.default || mod;
      ok('qrcode.mjs imports cleanly with its whole dependency graph', true);
      // engine/app.js branches on `qrEncoder?.toCanvas`; teacher.js does the same.
      ok('it exposes toCanvas, which is what the app checks for', typeof q.toCanvas === 'function');
      // create() runs the real encoder — byte mode uses encode-utf8 and segment
      // optimisation uses dijkstrajs, so this exercises BOTH vendored deps
      // rather than just proving the file parsed.
      try {
        const qr = q.create('https://nouklass.com/?friend=0006AC5B');
        const dark = [...qr.modules.data].filter(Boolean).length;
        ok('it encodes a real friend link into a non-empty symbol',
          qr.modules.size > 20 && dark > 100, { size: qr.modules.size, dark });
      } catch (e) {
        ok('it encodes a real friend link', false, e.message);
      }
    }
  }

  // Whatever the app imports must actually be in the vendor directory.
  const app = fs.readFileSync(path.join(ROOT, 'engine/app.js'), 'utf8');
  for (const m of app.matchAll(/import\(['"]\.\.\/assets\/vendor\/([^'"]+)['"]\)/g)) {
    ok(`engine/app.js imports assets/vendor/${m[1]}, and it is there`,
      fs.existsSync(path.join(VENDOR, m[1])), m[1]);
  }

  console.log(fails ? `\n${fails} of ${checks} checks FAILED.` : `\nAll ${checks} checks passed.`);
  process.exit(fails ? 1 : 0);
})();
