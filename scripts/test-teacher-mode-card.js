'use strict';
// The parent-dashboard teacher card is self-service on the parent's OWN account:
// "Enable teacher mode" asks the server to flip this profile's role in place,
// and once it is on the card offers "Switch to teacher view". There is no
// second sign-up and no note to write — a parent re-registering as a teacher
// with the same email is how duplicate accounts start.
//
// Usage: node scripts/test-teacher-mode-card.js
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

// ⚠ app.js is CRLF: normalise, or the LF-only end marker below never matches.
const app = fs.readFileSync('engine/app.js', 'utf8').replace(/\r\n/g, '\n');
const start = app.indexOf('function _renderTeacherApplyCard() {');
const end = app.indexOf('\n}\n', start) + 3;
assert.ok(start > 0 && end > start, '_renderTeacherApplyCard not found');

const slot = { innerHTML: 'untouched' };
const state = { status: 'none', teacher: false, admin: false };
const context = vm.createContext({
  document: { getElementById: id => (id === 'pd-teacher-apply' ? slot : null) },
  Auth: {
    getTeacherStatus: () => state.status,
    isTeacher: () => state.teacher,
    isAdmin: () => state.admin,
  },
});
vm.runInContext(app.slice(start, end), context);

function render(s) {
  Object.assign(state, { status: 'none', teacher: false, admin: false }, s);
  slot.innerHTML = 'untouched';
  context._renderTeacherApplyCard();
  return slot.innerHTML;
}

// A plain parent sees the enable button, and nothing that says "apply".
let html = render({});
assert.match(html, /Enable teacher mode/);
assert.match(html, /_submitTeacherApplication\(this\)/);
assert.doesNotMatch(html, /pd-teacher-note|<textarea/, 'no note box');
assert.doesNotMatch(html, /Dismiss|_dismissTeacherPitch/, 'the button is always visible');
assert.doesNotMatch(html, /[Aa]pply/, 'no "apply" wording — it reads like a form');

// Every way of already being a teacher shows the switch, never the enable button.
for (const s of [{ teacher: true }, { status: 'approved' }, { admin: true }]) {
  html = render(s);
  assert.match(html, /Switch to teacher view/, JSON.stringify(s));
  assert.match(html, /Auth\.openTeacherDashboard\(\)/, JSON.stringify(s));
  assert.doesNotMatch(html, /Enable teacher mode/, JSON.stringify(s));
}

// The queued and suspended states have no button; rejected may ask again.
html = render({ status: 'pending' });
assert.doesNotMatch(html, /<button/);
assert.match(html, /requested/i);
html = render({ status: 'suspended' });
assert.doesNotMatch(html, /<button/);
html = render({ status: 'rejected' });
assert.match(html, /Enable teacher mode/);

// The submit handler sends a fixed note and reads no textarea.
const sub = app.slice(app.indexOf('async function _submitTeacherApplication(btn) {'));
const subBody = sub.slice(0, sub.indexOf('\n}\n'));
assert.doesNotMatch(subBody, /pd-teacher-note/);
assert.match(subBody, /Auth\.requestTeacherAccess\('[^']+'\)/);

// The dead pitch-dismiss helpers must not come back with a stale localStorage key.
assert.doesNotMatch(app, /_teacherPitchDismissed|psac_tutor_pitch_hidden_/);

// The landing page no longer promises that tutor access is never automatic —
// the server's teacher_auto_approve switch decides, and the copy must not
// contradict it either way.
const html0 = fs.readFileSync('index.html', 'utf8');
assert.doesNotMatch(html0, /never granted automatically/);
assert.match(html0, /Enable teacher mode from your parent dashboard/);

console.log('Teacher-mode card: enable → switch, no second sign-up, no note, no dismiss; landing copy in step.');
