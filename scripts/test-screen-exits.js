'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Every screen must have a way OUT.
//
//  WHY THIS EXISTS — #screen-certificates shipped with no back button. Both
//  doors into it are on the student home screen and the header is the only
//  other navigation, so a child who opened their certificates was stranded
//  unless they knew to reach for the browser's Back button. Nothing caught it:
//  the screen rendered perfectly, and "perfectly" is what a dead end looks
//  like.
//
//  ⚠ THE SWEEP REVIEWS, IT NEVER FAILS. Static markup cannot see an exit that
//    is wired in JavaScript: #screen-results owns a perfectly good Home button
//    bound with addEventListener('click', … StudentHome.open()) in app.js, and
//    this check flagged it anyway. Of the 13 it flagged on its first run, most
//    were fine — screen-exam has no exit BY DESIGN (a timed paper is finished
//    or submitted), screen-biometric-lock is a lock, and several others bind
//    their controls at render time. A gate that cries wolf thirteen times is
//    one nobody reads, so the list is printed for a human to judge.
//
//  The ONE hard assertion is the regression this was written for: the
//  certificates screen must keep a Home button.
//
//  Run:  node scripts/test-screen-exits.js
// ══════════════════════════════════════════════════════════════════════════

const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

// Screens whose chrome lives outside the .screen element itself.
const EXEMPT = new Set([
  'screen-landing',      // the front door; nothing to go back to
  'screen-auth',         // sign-in
  'screen-dashboard',    // a home screen IS the destination
  'screen-student-home',
  'screen-parent',       // parent dashboard root
  'screen-admin',        // admin panel root, has its own tab strip
  'screen-teacher',      // teacher root
]);

// Anything that gets a user off the screen.
const EXIT = /class="[^"]*\bback-btn\b|onclick="[^"]*(showScreen|StudentHome\.open|PracticeHub\.open|SubjectHub\.(open|back)|renderDashboard|closeM|Auth\.logout)|data-target="|role="tab"|class="[^"]*\btabbar\b/;

// Split the file into screen blocks by locating each id="screen-…" and taking
// the text up to the next one. Crude, but it only needs to see the controls a
// screen owns, and a control that belongs to the NEXT screen would only ever
// make this check more lenient, never produce a false alarm.
const starts = [...html.matchAll(/<div id="(screen-[a-z0-9-]+)"/gi)]
  .map(m => ({ id: m[1], at: m.index }));

let pass = 0, fail = 0;
const review = [];
for (let i = 0; i < starts.length; i++) {
  const { id, at } = starts[i];
  const end = i + 1 < starts.length ? starts[i + 1].at : html.length;
  const block = html.slice(at, end);
  if (EXEMPT.has(id)) continue;
  if (EXIT.test(block)) { pass++; continue; }
  review.push(id);
}

console.log(`${pass} screens have an exit visible in the markup.`);
console.log(`\nREVIEW — no exit found in markup (${review.length}). Several of these are`);
console.log('fine: the control is bound in JS, or the screen has no exit by design.');
review.forEach(r => console.log('   ' + r));

// The specific regression this was written for.
const certBlock = html.slice(
  html.indexOf('<div id="screen-certificates"'),
  html.indexOf('<div id="screen-', html.indexOf('<div id="screen-certificates"') + 10));
const certOk = /class="back-btn[^"]*"[^>]*onclick="StudentHome\.open\(\)"/.test(certBlock);
console.log(`\ncertificates screen has a Home button: ${certOk ? 'yes' : 'NO'}`);
if (!certOk) fail++;

process.exit(fail ? 1 : 0);
