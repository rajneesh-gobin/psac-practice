'use strict';
// guest.html and materials.html must look like the app they belong to.
//
// ⚠ THE MISMATCH, MEASURED: index.html ships <html class="dark"> and removes
//   the class only when mm_global_theme === 'light' — so the app is DARK BY
//   DEFAULT. These two pages had no such script and keyed their dark styles on
//   @media (prefers-color-scheme) alone. A child whose app was dark (the
//   default) tapped a homework link and landed on a light page.
//
// ⚠ They are same-origin, so the same localStorage key is simply there to read.
//   Nothing had to be passed in the URL.
//
// ⚠ These pages deliberately load NO engine file and NO style.css — that is why
//   a child on a phone plan gets a few KB instead of the whole app. So the
//   tokens are duplicated ON PURPOSE, and this file is what stops them drifting.
//
// Run: node scripts/test-standalone-theme.js
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
let checks = 0, fails = 0;
const ok = (label, cond) => { checks++; if (!cond) { fails++; console.log('  FAIL  ' + label); } };

const index = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const PAGES = ['guest.html', 'materials.html'];

// What the app itself does — read, not assumed.
ok('the app is dark by default', /<html[^>]*class="[^"]*\bdark\b/.test(index));
const KEY = (index.match(/localStorage\.getItem\('([^']+)'\)==='light'/) || [])[1];
ok('the app reads a theme key before first paint', !!KEY);

// The app's surfaces, from style.css.
const css = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');
const lightBg = (css.match(/^body \{ background-color: (#[0-9a-f]+); \}/m) || [])[1];
const darkBg  = (css.match(/^html\.dark body \{ background-color: (#[0-9a-f]+); \}/m) || [])[1];
ok('read the app light background from style.css', !!lightBg);
ok('read the app dark background from style.css', !!darkBg);

for (const page of PAGES) {
  const s = fs.readFileSync(path.join(ROOT, page), 'utf8');

  ok(`${page}: ships dark, like the app`, /<html[^>]*class="[^"]*\bdark\b/.test(s));
  ok(`${page}: reads the SAME theme key`, !!KEY && s.includes(KEY));
  // ⚠ Before first paint, or the page flashes the wrong theme on every open.
  ok(`${page}: the theme script runs before the stylesheet`,
    s.indexOf(KEY) < s.indexOf('<style>'));
  ok(`${page}: the read is wrapped (localStorage throws in privacy modes)`,
    /try\s*\{[^}]*mm_global_theme/.test(s));

  // ⚠ The class is the switch, not the OS. A page still keyed only on
  //   prefers-color-scheme ignores the choice the child made in the app.
  ok(`${page}: dark styles key on html.dark`, /html\.dark\s*\{/.test(s));
  ok(`${page}: no dark block left keyed only to the OS`,
    !/@media \(prefers-color-scheme:\s*dark\)\s*\{/.test(s));

  // ⚠ A comma-separated selector must carry the prefix on EVERY half. Getting
  //   this wrong leaks one dark rule into light mode, and it is invisible until
  //   somebody opens the page in the other theme.
  const rules = (s.match(/^\s*html\.dark [^{\n]*\{/gm) || []);
  const halfPrefixed = rules.filter(r => r.includes(',') && !/,\s*html\.dark/.test(r));
  ok(`${page}: every comma selector is fully prefixed`, halfPrefixed.length === 0);

  // The surfaces themselves.
  ok(`${page}: light background matches the app (${lightBg})`,
    !lightBg || s.includes('--bg:' + lightBg) || s.includes('--bg: ' + lightBg));
  ok(`${page}: dark background matches the app (${darkBg})`,
    !darkBg || s.includes('--bg:' + darkBg) || s.includes('--bg: ' + darkBg));
  ok(`${page}: brand indigo matches the app`, /#4f46e5/i.test(s));

  // These pages must stay standalone — that is the whole point of them.
  ok(`${page}: still loads no engine file`, !/<script[^>]+src="engine\//.test(s));
  ok(`${page}: still loads no style.css`, !/href="style\.css"/.test(s));

  // Braces, since the dark block was rewritten by a script.
  const style = (s.match(/<style>([\s\S]*?)<\/style>/) || [])[1] || '';
  let depth = 0, extra = 0;
  for (const ch of style) { if (ch === '{') depth++; else if (ch === '}') { depth--; if (depth < 0) { extra++; depth = 0; } } }
  ok(`${page}: stylesheet braces balance`, depth === 0 && extra === 0);
}

console.log(`${checks - fails}/${checks} standalone-theme checks passed`);
process.exit(fails ? 1 : 0);
