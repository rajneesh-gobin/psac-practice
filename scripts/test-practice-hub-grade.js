'use strict';
// Which grade "Start Practicing" opens on.
//
// WHY THIS EXISTS — reported from the app:
//   "i select grade 8, i click science, now i have no way back to go to grade 8
//    menu, so i click start practicing, i land back to start practicing, i see
//    options for grade 5 not grade 8, and by mistake i can start practicing
//    grade 5"
//
// The breadcrumb's "Start Practicing" IS the way back out of a subject, and the
// hub reopened on the account's grade every time, because one function answered
// for two different questions:
//
//     function _practiceHomeGrade() {
//       return Number(acct?.grade)          // the grade they are REGISTERED in
//           || Number(SELECTED_GRADE)       // the grade they are BROWSING
//           || Number(DB?.grade) || 5;
//     }
//
// Its own comment said "SELECTED_GRADE … is right once a subject is chosen",
// and it was second, so it never won. The picker made it worse: onGradeChange()
// re-rendered the books and wrote the choice nowhere, so it survived exactly
// until the next reopen.
//
// ⚠ The fix must NOT be "trust SELECTED_GRADE". It is a UI memory that follows
//   every activateSubjectPack(); the allowed list has to keep being computed
//   from the OWN grade, because GradeAccess.allowed(g) returns a list CONTAINING
//   g — deriving it from the browsing grade would make any grade self-granting
//   the moment it was opened once. That is what check 6 is for.
//
//   node scripts/test-practice-hub-grade.js

const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const src = fs.readFileSync('engine/app.js', 'utf8').replace(/\r/g, '');
const a = src.indexOf('const PracticeHub = (() => {');
assert.ok(a >= 0, 'PracticeHub not found');
const b = src.indexOf('window.PracticeHub = PracticeHub;', a);
assert.ok(b > a, 'PracticeHub end not found');
const BLOCK = src.slice(a, b) + '\n__out.PH = PracticeHub;';

let checks = 0;
const ok = (label, cond, detail) => { assert(cond, label + (detail ? ' — ' + JSON.stringify(detail) : '')); checks++; console.log('✓ ' + label); };

function el(extra) {
  return Object.assign({ innerHTML: '', textContent: '', style: {}, disabled: false, value: '',
    querySelectorAll: () => [] }, extra || {});
}

// ownGrade: what the signed-in account says. allowed: what the parent granted.
function boot({ own = 5, allowed = [5], selected = null, packs } = {}) {
  const allowedCalls = [];
  const dom = {
    'prac-grade-sel': el(), 'prac-locked-note': el(),
    'prac-books-grid': el(), 'prac-hub-sub': el(),
  };
  const shown = [];
  const out = {};
  const ctx = vm.createContext({
    console, __out: out,
    SELECTED_GRADE: selected,
    document: { getElementById: id => dom[id] || null },
    showScreen: id => shown.push(id),
    _attr: s => String(s == null ? '' : s),
    SubjectHub: { open() {} },
    Auth: { getActiveAccount: () => ({ grade: own }) },
    GradeAccess: {
      allowed(g) { allowedCalls.push(Number(g)); return allowed.slice(); },
      liveGrades: () => [4, 5, 6, 7, 8, 9],
    },
    SUBJECT_PACKS: packs || [
      { id: 'grade6-maths',   grade: 6, subject: 'Maths' },
      { id: 'grade5-science', grade: 5, subject: 'Science' },
      { id: 'grade5-maths',   grade: 5, subject: 'Maths' },
      { id: 'grade8-science', grade: 8, subject: 'Science' },
      { id: 'grade8-maths',   grade: 8, subject: 'Maths' },
      { id: 'grade8-french',  grade: 8, subject: 'French', comingSoon: true },
    ],
  });
  vm.runInContext(BLOCK, ctx, { filename: 'engine/app.js (PracticeHub)' });
  return { PH: out.PH, ctx, dom, shown, allowedCalls };
}

const packIds = dom => (dom['prac-books-grid'].innerHTML.match(/data-pack-id="([^"]+)"/g) || [])
  .map(s => s.replace(/data-pack-id="|"/g, ''));
const selectedOption = dom => {
  const m = dom['prac-grade-sel'].innerHTML.match(/<option value="(\d+)" selected>/);
  return m ? Number(m[1]) : null;
};

// 1 · A fresh session opens on the child's own grade. SELECTED_GRADE is null
//     until something sets it, which is what the account read fixed.
{
  const t = boot({ own: 6, allowed: [6, 8] });
  t.PH.open();
  ok('a fresh session opens on the grade the child is registered in',
    selectedOption(t.dom) === 6 && packIds(t.dom).every(id => id.startsWith('grade6-')),
    { sel: selectedOption(t.dom), packs: packIds(t.dom) });
  ok('and the heading names it, so a wrong grade is visible before you tap',
    /Grade 6/.test(t.dom['prac-hub-sub'].textContent), t.dom['prac-hub-sub'].textContent);
}

// 2 · The picker moves the books AND is remembered.
{
  const t = boot({ own: 5, allowed: [5, 8] });
  t.PH.open();
  t.PH.onGradeChange('8');
  ok('the picker shows that grade\'s subjects',
    JSON.stringify(packIds(t.dom)) === JSON.stringify(['grade8-maths', 'grade8-science']), packIds(t.dom));
  ok('a comingSoon pack is not offered', !packIds(t.dom).includes('grade8-french'), packIds(t.dom));
  ok('the choice is remembered', t.ctx.SELECTED_GRADE === 8, t.ctx.SELECTED_GRADE);

  // 3 · THE REPORTED BUG. Reopening the hub is the only way back out of a
  //     subject, and it used to land on Grade 5 with Grade 5 books.
  t.PH.open();
  ok('reopening the hub stays on the grade you were browsing',
    selectedOption(t.dom) === 8
    && JSON.stringify(packIds(t.dom)) === JSON.stringify(['grade8-maths', 'grade8-science']),
    { sel: selectedOption(t.dom), packs: packIds(t.dom) });
  ok('the heading says Grade 8, not Grade 5',
    /Grade 8/.test(t.dom['prac-hub-sub'].textContent), t.dom['prac-hub-sub'].textContent);
}

// 4 · Opening a pack in another grade sets SELECTED_GRADE (activateSubjectPack
//     does this), and the hub must follow it back.
{
  const t = boot({ own: 5, allowed: [5, 8] });
  t.ctx.SELECTED_GRADE = 8;                       // as activateSubjectPack() leaves it
  t.PH.open();
  ok('the hub follows the pack the child actually opened',
    selectedOption(t.dom) === 8 && packIds(t.dom)[0].startsWith('grade8-'), packIds(t.dom));
}

// 5 · ⚠ A grade the parent has not unlocked is refused — and SAID, not silently
//     swapped. The silent swap is the half of the report that starts the wrong
//     grade's work.
{
  const t = boot({ own: 5, allowed: [5] });
  t.ctx.SELECTED_GRADE = 9;
  t.PH.open();
  ok('a grade that is not unlocked falls back to the child\'s own',
    selectedOption(t.dom) === 5, selectedOption(t.dom));
  ok('and the fallback is stated, not silent',
    /Grade 9 is not unlocked/.test(t.dom['prac-locked-note'].textContent)
    && t.dom['prac-locked-note'].style.display === '', t.dom['prac-locked-note']);
}

// 6 · ⚠ THE SELF-GRANTING GUARD. GradeAccess.allowed(g) returns a list that
//     CONTAINS g, so the allowed set must always be computed from the own
//     grade. If this ever reads 8, one visit to Grade 8 unlocks Grade 8.
{
  const t = boot({ own: 5, allowed: [5, 8] });
  t.ctx.SELECTED_GRADE = 8;
  t.PH.open();
  t.PH.onGradeChange('8');
  ok('the allowed grades are always computed from the OWN grade',
    t.allowedCalls.length > 0 && t.allowedCalls.every(g => g === 5), t.allowedCalls);
}

// 7 · The picker cannot be talked into a grade the list does not offer.
{
  const t = boot({ own: 5, allowed: [5] });
  t.PH.open();
  t.PH.onGradeChange('9');
  ok('a grade outside the allowed list is never remembered',
    t.ctx.SELECTED_GRADE === null, t.ctx.SELECTED_GRADE);
}

// 8 · An empty grade says which grade is empty.
{
  const t = boot({ own: 7, allowed: [7], packs: [{ id: 'grade5-maths', grade: 5, subject: 'Maths' }] });
  t.PH.open();
  ok('an empty grade names itself',
    /No subjects available for Grade 7/.test(t.dom['prac-books-grid'].innerHTML),
    t.dom['prac-books-grid'].innerHTML);
}

// 9 · One grade to choose from is not a choice.
{
  const t = boot({ own: 5, allowed: [5] });
  t.PH.open();
  ok('a single allowed grade disables the picker', t.dom['prac-grade-sel'].disabled === true);
}

console.log('\nPractice hub grade: ' + checks + ' checks passed.');
