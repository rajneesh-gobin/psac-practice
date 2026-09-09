'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'engine', 'app.js'), 'utf8');
function section(start, end) {
  return source.slice(source.indexOf(start), source.indexOf(end, source.indexOf(start)));
}

async function check({ online, biometric, expiresAt }) {
  const container = { innerHTML: '' };
  const context = {
    S: { currentScreen: 'dashboard' },
    _profileFromScreen: null,
    DB: { display_name: 'Asha', avatar: '🌟', grade: 2 },
    ACTIVE_STUDENT_ID: 'student-1',
    Auth: { getParentProfile: () => null, getActiveAccount: () => null },
    localStorage: { getItem: () => null },
    _prefKey: key => key,
    document: {
      getElementById: id => id === 'profile-content' ? container : null,
      createElement: () => ({ set textContent(value) { this.innerHTML = value; } })
    },
    showScreen: id => { context.S.currentScreen = id; },
    _sb: online ? { from: () => ({ select: () => ({ eq: () => ({
      maybeSingle: async () => ({ data: { expires_at: expiresAt } })
    }) }) }) } : null,
    Biometric: { isAvailable: async () => biometric, isEnrolled: () => false },
    ProfileInstall: { hasStudentBinding: () => false }
  };
  vm.createContext(context);
  vm.runInContext([
    section('async function showProfile()', '// A parent should'),
    section('function _isParentSession()', 'function _profileSaved('),
    section('async function _renderStudentProfile(', 'function _pickKidVibe(')
  ].join('\n'), context);
  await vm.runInContext('showProfile()', context);
  assert.equal(context.S.currentScreen, 'profile');
  assert(!container.innerHTML.includes('animate-spin'), 'loading spinner must be replaced');
  for (const text of ['My Settings', 'Asha', 'Grade 2', 'My Colours', 'Preferences', 'pref-sound-toggle']) {
    assert(container.innerHTML.includes(text), `missing settings content: ${text}`);
  }
  assert.equal(container.innerHTML.includes('Fingerprint sign-in'), biometric);
  assert.equal(container.innerHTML.includes('Access expires on'), !!expiresAt);
  vm.runInContext('_profileBack()', context);
  assert.equal(context.S.currentScreen, 'dashboard', 'Back returns to the student dashboard');
}

(async () => {
  await check({ online: false, biometric: false, expiresAt: null });
  await check({ online: true, biometric: false, expiresAt: null });
  await check({ online: true, biometric: true, expiresAt: '2027-01-01' });
  console.log('PASS: student Settings renders offline/online, with expiry and biometrics, and returns home.');
})().catch(error => { console.error(error); process.exitCode = 1; });
