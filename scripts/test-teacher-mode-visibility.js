'use strict';
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const app = fs.readFileSync('engine/app.js', 'utf8');
const auth = fs.readFileSync('engine/auth.js', 'utf8');
const classes = new Set();
const context = vm.createContext({
  adult: false, teacher: true,
  document: { getElementById: () => ({ classList: {
    toggle: (name, on) => on ? classes.add(name) : classes.delete(name)
  } }) },
});
vm.runInContext(`function _isParentContext() { return adult; }
  const Auth = { isTeacher: () => teacher };
  ${app.slice(app.indexOf('function _updateTeacherModeButton()'), app.indexOf('function _returnToParentDashboard()'))}`, context);
for (const [adult, teacher, visible] of [[false,true,false],[false,false,false],[true,true,true],[true,false,false],[false,true,false],[true,true,true]]) {
  context.adult = adult;
  context.teacher = teacher;
  context._updateTeacherModeButton();
  assert.equal(classes.has('hidden'), !visible);
  assert.equal(classes.has('flex'), visible);
}
let opened = 0;
context._parentProfile = null;
context._isTeacherUser = true;
context.toast = () => {};
context._loadTeacherDashboard = () => opened++;
vm.runInContext(auth.slice(auth.indexOf('  function openTeacherDashboard()'), auth.indexOf('  // ── Apply for teacher access')), context);
context.openTeacherDashboard();
assert.equal(opened, 0, 'Retained adult role cannot open teacher mode during child handover');
context._parentProfile = { role: 'teacher' };
context.openTeacherDashboard();
assert.equal(opened, 1, 'Teacher access remains available in adult mode');
assert(app.slice(app.indexOf('function showScreen(')).includes('_updateTeacherModeButton();'));
console.log('Teacher button hides in child mode, restores for authorised adults, and blocks direct child-mode entry.');
