'use strict';
// Can a visitor with no JavaScript — which is every crawler that does not render,
// and Googlebot whenever a render times out — actually SEE the landing page?
//
// ⚠ WHY THIS EXISTS. Until 2026-09-16 the answer was no, and nothing said so.
//   <body> shipped style="opacity:0" and #screen-landing shipped class="screen
//   hidden" (display:none !important), and both were lifted only at the END of
//   Auth.init(), which awaits a Supabase getSession(). So 49 KB of real landing
//   markup — a proper <h1>, eight <h2>s, the whole pitch — needed 2.51 MB of
//   blocking JS, a runtime Tailwind pass and a network round-trip before it
//   existed for a reader. Measured the same day: a search for the domain's own
//   name returned Wikipedia, Scribd and TikTok and nothing from this site.
//
// ⚠ THE REGRESSION THIS GUARDS IS ONE WORD. Re-adding "hidden" to that one div
//   is the natural thing to do while tidying screens — every other screen has
//   it — and it would cost nothing visible in the app, because Auth.init()
//   un-hides it a moment later. The damage is invisible from inside a browser
//   and shows up weeks later as traffic that never arrived.
//
// Run: node scripts/test-landing-no-js.js
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

let checks = 0, fails = 0;
const ok = (label, cond, extra) => {
  checks++;
  if (!cond) { fails++; console.log('  FAIL  ' + label + (extra ? '\n          ' + extra : '')); }
};

const index = read('index.html');
const css = read('style.css');
const protect = read('engine/protect.js');

// ── 1. The markup ships readable ───────────────────────────────────────────
const landing = (index.match(/<div id="screen-landing"[^>]*>/) || [''])[0];
ok('found #screen-landing', !!landing);
ok('#screen-landing does NOT ship the "hidden" class',
  !!landing && !/\bclass="[^"]*\bhidden\b/.test(landing),
  'got: ' + landing);

const htmlTag = (index.match(/<html[^>]*>/) || [''])[0];
ok('<html> does NOT ship ps-loading (it would draw the spinner over the landing)',
  !/ps-loading/.test(htmlTag), 'got: ' + htmlTag);

const bodyTag = (index.match(/<body[^>]*>/) || [''])[0];
ok('<body> ships with no inline opacity gate',
  !/opacity\s*:\s*0/.test(bodyTag), 'got: ' + bodyTag);

// ── 2. Nothing in the CSS hides it without a JS-added class ────────────────
// The landing may only be hidden by .hidden (showScreen's own mechanism) or by
// html.ps-booting (added by the inline head script). A rule that hides it
// unconditionally puts us straight back where we started.
const hidingRules = [...css.matchAll(/([^{}]*#screen-landing[^{}]*)\{([^}]*)\}/g)]
  .filter(([, , body]) => /display\s*:\s*none|opacity\s*:\s*0|visibility\s*:\s*hidden/.test(body))
  .map(([, sel]) => sel.trim().replace(/\s+/g, ' '));
const unconditional = hidingRules.filter((sel) => !/\.ps-booting|\.hidden/.test(sel));
ok('no CSS rule hides #screen-landing without ps-booting or .hidden',
  unconditional.length === 0, unconditional.join('\n          '));

ok('html.ps-booting is what hides it during boot',
  /html\.ps-booting\s+#screen-landing/.test(css));

// ⚠ NOT !important on purpose: Auth.init() sets an inline opacity:1 on <body>,
//   which has to win even if the class removal is ever missed.
const bodyRule = (css.match(/html\.ps-booting body \{([^}]*)\}/) || [, ''])[1];
ok('html.ps-booting body sets opacity 0 without !important',
  /opacity\s*:\s*0/.test(bodyRule) && !/!important/.test(bodyRule),
  'got: ' + bodyRule.trim());

// ── 3. The reveal clears it again ──────────────────────────────────────────
ok('protect.js removes ps-booting at the reveal',
  /classList\.remove\((?=[^)]*'ps-booting')[^)]*\)/.test(protect),
  'without this the landing stays display:none for the rest of the session');

// ── 4. The inline head script actually behaves ─────────────────────────────
// It is the whole mechanism, it runs before <body> is parsed, and a typo in it
// is invisible (the catch swallows it) — so run it for real against both cases.
const inline = [...index.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map((m) => m[1])
  .find((s) => s.includes('ps-booting'));
ok('found the inline boot-state script', !!inline);

function runBoot(store, loc) {
  const classes = new Set(['dark']);
  const sandbox = {
    localStorage: { getItem: (k) => (k in store ? store[k] : null) },
    location: Object.assign({ search: '', hash: '' }, loc),
    document: { documentElement: { classList: {
      add: (...c) => c.forEach((x) => classes.add(x)),
      remove: (...c) => c.forEach((x) => classes.delete(x)),
    } } },
  };
  vm.runInNewContext(inline, sandbox, { timeout: 1000 });
  return classes;
}

if (inline) {
  let threw = null;
  try {
    const cold = runBoot({}, {});
    ok('a cold visitor does NOT get ps-booting (landing paints immediately)',
      !cold.has('ps-booting') && !cold.has('ps-loading'),
      'classes: ' + [...cold].join(' '));

    const parent = runBoot({ mm_sb_auth: '{"access_token":"x"}' }, {});
    ok('a signed-in parent DOES get ps-booting (no landing flash)',
      parent.has('ps-booting') && parent.has('ps-loading'),
      'classes: ' + [...parent].join(' '));

    const pupil = runBoot({ mm_student_sess: '{"token":"x"}' }, {});
    ok('a signed-in pupil DOES get ps-booting', pupil.has('ps-booting'));

    const deep = runBoot({}, { search: '?signin=1' });
    ok('a deep link (?signin=1) boots normally rather than flashing the landing',
      deep.has('ps-booting'));

    // ⚠ Fails OPEN. Safari private mode throws on localStorage; the safe half is
    //   the landing showing, not every visitor seeing a blank page.
    const denied = (() => {
      const classes = new Set(['dark']);
      vm.runInNewContext(inline, {
        localStorage: { getItem() { throw new Error('denied'); } },
        location: { search: '', hash: '' },
        document: { documentElement: { classList: {
          add: (...c) => c.forEach((x) => classes.add(x)),
          remove: (...c) => c.forEach((x) => classes.delete(x)),
        } } },
      }, { timeout: 1000 });
      return classes;
    })();
    ok('localStorage denied → fails OPEN, landing still visible',
      !denied.has('ps-booting'), 'classes: ' + [...denied].join(' '));
  } catch (e) { threw = e; }
  ok('the inline script runs without throwing', !threw, threw && threw.message);
}

// ── 5. The head tags a search result is built from ─────────────────────────
ok('<title> names PSAC', /<title>[^<]*PSAC/.test(index));
ok('<title> names Mauritius', /<title>[^<]*Mauritius/.test(index));
const desc = (index.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1];
ok('a meta description exists', !!desc);
ok('meta description is <= 160 chars (Google truncates past that)',
  desc.replace(/&amp;/g, '&').length <= 160,
  'length: ' + desc.replace(/&amp;/g, '&').length);
ok('a canonical url is declared', /<link rel="canonical" href="https:\/\/nouklass\.com\/">/.test(index));

const ld = (index.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || [, ''])[1];
let ldObj = null;
try { ldObj = JSON.parse(ld); } catch (_) {}
ok('JSON-LD is present and parses', !!ldObj, 'invalid JSON-LD blocks the whole rich result');
ok('JSON-LD declares an EducationalOrganization',
  !!ldObj && ldObj['@type'] === 'EducationalOrganization');
// ⚠ A grade range or a price in here is a SEVENTH copy of a promise that already
//   drifts across six surfaces. Keep them out; test-share-copy-parity.js owns the
//   ones that exist.
ok('JSON-LD states no grade range', !!ldObj && !/Grades?\s+\d/.test(JSON.stringify(ldObj)));

// ── 6. The FAQ, and its schema, which must be the SAME WORDS ───────────────
// ⚠ WHY THIS IS A CHECK AND NOT A COMMENT. Google requires FAQPage schema to
//   match the answer a visitor can actually see, and an answer engine quoting a
//   sentence this page no longer contains is a promise nobody can trace back.
//   The two are edited by hand in two places 600 lines apart; that is exactly
//   the shape of every drift this repo has already paid for.
// ⚠ Compared with entities decoded and whitespace collapsed, because the HTML
//   copy carries &amp; and line wrapping the JSON copy cannot.
const faqLdRaw = (index.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [])
  .find((s) => s.includes('"FAQPage"')) || '';
let faqObj = null;
try {
  faqObj = JSON.parse(faqLdRaw.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, ''));
} catch (_) {}
const faqNode = faqObj && (faqObj['@graph'] || []).find((n) => n['@type'] === 'FAQPage');
ok('a FAQPage JSON-LD block is present and parses', !!faqNode);

const faqSection = (index.match(/<section id="landing-faq"[\s\S]*?<\/section>/) || [''])[0];
ok('the visible FAQ section is in the landing markup', !!faqSection);

const norm = (s) => s
  .replace(/<[^>]*>/g, '')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/\s+/g, ' ').trim();

if (faqNode && faqSection) {
  const visible = norm(faqSection);
  const pairs = faqNode.mainEntity || [];
  ok('the FAQ has at least 5 question/answer pairs', pairs.length >= 5, 'found ' + pairs.length);
  for (const qa of pairs) {
    const q = norm(qa.name || '');
    const a = norm((qa.acceptedAnswer || {}).text || '');
    ok('schema question is visible on the page: ' + q.slice(0, 48),
      !!q && visible.includes(q));
    ok('schema answer matches the visible text: ' + q.slice(0, 48),
      !!a && visible.includes(a),
      'the page does not contain this answer verbatim');
  }
  // ⚠ The opposite direction: an answer added to the page and not to the schema
  //   is invisible to every engine this block exists for.
  const visibleAnswers = (faqSection.match(/<p class="text-sm[^"]*">([\s\S]*?)<\/p>/g) || []).length;
  ok('every visible answer is also in the schema',
    visibleAnswers === pairs.length,
    visibleAnswers + ' on the page, ' + pairs.length + ' in the schema');
}

console.log(fails
  ? `\n  ${checks - fails}/${checks} landing-no-js checks passed, ${fails} FAILED`
  : `\n  ${checks}/${checks} landing-no-js checks passed`);
process.exit(fails ? 1 : 0);
