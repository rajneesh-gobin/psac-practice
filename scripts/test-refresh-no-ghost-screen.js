'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
const auth = fs.readFileSync('engine/auth.js', 'utf8');

assert.match(html, /<body[^>]*style="opacity:0"/,
  'The app must start concealed while authentication restores');
assert.match(html, /id="screen-dashboard" class="screen hidden"/,
  'The dashboard zero state must not be the browser default');
for (const id of ['landing','auth','student-home','subject-select','parent','teacher','admin']) {
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
