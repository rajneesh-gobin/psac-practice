'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
const auth = fs.readFileSync('engine/auth.js', 'utf8');

// ⚠⚠ `<body style="opacity:0">` IS GONE ON PURPOSE AND MUST NOT COME BACK.
//    This line demanded it, and reinstating it would undo a measured SEO fix:
//    49 KB of real landing markup needed 2.5 MB of blocking JS and a Supabase
//    round-trip before anything could be seen, so Bing, the social scrapers and
//    the AI crawlers indexed a blank page — measured 2026-09-16, the domain was
//    in no index at all. The static HTML is now the NO-SESSION case (landing
//    visible, no spinner) and a <head> script adds the boot state back only for
//    a visitor who has somewhere else to go.
// ⚠ THE RULE THIS FILE GUARDS IS UNCHANGED: a returning user must never see a
//   frame of the landing page before being routed. What changed is WHERE the
//   concealment is decided — conditionally, in <head>, before <body> is parsed.
// ⚠ The REAL tag, not the word. index.html's own <head> comment explains this
//   change and contains the string "<body>" three times, so a plain indexOf
//   finds the prose and slices a head of 313 characters.
const bodyAt = html.search(/^<body[\s>]/m);
assert.ok(bodyAt > 0, 'the <body> tag moved');
const head = html.slice(0, bodyAt);
assert.match(head, /ps-loading/,
  'the boot state must still be decided in <head>, before <body> is parsed');
assert.ok(!/<body[^>]*style="opacity:0"/.test(html),
  'body must NOT ship concealed: that is the blank page every crawler indexed');
// ⚠ Fails OPEN by design — a throw (Safari private mode denies localStorage)
//   must leave the landing showing. A signed-in parent seeing landing for one
//   frame is the cheap half; every visitor seeing blank is the expensive half.
assert.match(head, /try\s*\{[\s\S]*catch/,
  'the boot-state decision must fail open, leaving the landing visible');
assert.match(html, /id="screen-dashboard" class="screen hidden"/,
  'The dashboard zero state must not be the browser default');
// ⚠ 'landing' is deliberately NOT in this list any more — it is the static
//   no-session state and ships VISIBLE. Everything a session might route to
//   still starts hidden.
for (const id of ['auth','student-home','subject-select','parent','teacher','admin']) {
  assert.match(html, new RegExp(`id="screen-${id}" class="[^"]*\\bhidden\\b`), `${id} must start hidden`);
}

const studentRoute = auth.indexOf('await _resumeStudentGated(storedStudent)');
const studentReveal = auth.indexOf("document.body.style.opacity = '1';", studentRoute);
assert(studentRoute >= 0 && studentReveal > studentRoute,
  'Stored student must finish routing before reveal');
const parentRoute = auth.indexOf('await _handleParentSessionGated(session)', studentReveal);
const parentReveal = auth.indexOf("document.body.style.opacity = '1';", parentRoute);
assert(parentRoute >= 0 && parentReveal > parentRoute,
  'Parent must finish routing before reveal');
const initEnd = auth.indexOf('async function _handleParentSessionGated');
const fallbackRoute = auth.lastIndexOf("showScreen('landing');", initEnd);
const fallbackReveal = auth.indexOf("document.body.style.opacity = '1';", fallbackRoute);
assert(fallbackRoute >= 0 && fallbackReveal > fallbackRoute,
  'Landing screen must be selected before reveal');
assert.match(auth, /if \(_bootRouting\) return;/,
  'Initial Supabase event must not race the main startup router');

console.log('Refresh routing: all candidate screens start hidden and session routing completes before reveal.');
