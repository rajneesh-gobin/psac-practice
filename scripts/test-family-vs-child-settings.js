'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Which parent settings are FAMILY-WIDE and which are PER CHILD.
//
//  WHY — the Settings screen had one card, "Defaults For All Children", that
//  wrote five settings to every child at once: difficulty cap, exam mode, grade
//  access, in-app hints and Science Labs. Three of those are age-relative, and
//  the card's form is prefilled from the FIRST child, so a parent who had tuned
//  each child separately and then pressed Apply silently replaced all of it with
//  child #1's answers. There is no undo.
//
//  ⚠ The difficulty cap is the one with a consequence a parent cannot see. A cap
//    NEVER shrinks a certificate's denominator (deliberate — otherwise a tighter
//    cap would buy an easier mastery), so a Grade 6 capped at Basic because
//    their Grade 1 sibling needed it becomes unable to reach Subject Master, and
//    nothing anywhere says so.
//
//  ⚠ Grade access could not express what a parent means even in principle: the
//    list is ABSOLUTE grade numbers, so ticking Grade 6 grants it to the Grade 4
//    child and is a no-op for the Grade 6 one. "One grade either side" has no
//    representation as a single shared list.
//
//  Chapter locks were excluded from that card from the start, with a comment
//  saying applying them to everyone "would silently wipe a parent's careful
//  per-child locking". That argument was always true of the cap too.
//
//  THE RULE THIS TEST ENFORCES: a setting may be applied to all children only if
//  the right answer is the same for a Grade 1 and a Grade 9.
//
//  Run:  node scripts/test-family-vs-child-settings.js
// ══════════════════════════════════════════════════════════════════════════

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
let checks = 0, fails = 0;
const ok = (label, cond, detail) => {
  checks++;
  if (cond) return;
  fails++;
  console.log('  FAIL  ' + label + (detail !== undefined ? '  -- ' + JSON.stringify(detail).slice(0, 300) : ''));
};

const appSrc  = fs.readFileSync(path.join(ROOT, 'engine/app.js'), 'utf8');
const htmlSrc = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const authSrc = fs.readFileSync(path.join(ROOT, 'engine/auth.js'), 'utf8');

// ── Run the real writer against a family whose children differ ──────────────
// ⚠ This is the whole point of the test: three children, deliberately tuned
//   differently, and an Apply must leave every one of those differences alone.
const start = appSrc.indexOf('async function _applyDefaultsToAll(btn)');
const end   = appSrc.indexOf('async function _confirmDeleteAccount', start);
ok('the writer could be extracted', start > 0 && end > start);
const writerSrc = appSrc.slice(start, end);

const CHILDREN = [
  { id: 'c1', display_name: 'Aanya', settings: { maxDifficulty: 4, examDisabled: false, allowedGrades: [7], hintsDisabled: false, labsDisabled: false, lockedChapters: ['frac'] } },
  { id: 'c2', display_name: 'Rian',  settings: { maxDifficulty: 1, examDisabled: true,  allowedGrades: [],  hintsDisabled: false, labsDisabled: true,  lockedChapters: [] } },
  { id: 'c3', display_name: 'Kyana', settings: { maxDifficulty: 3, examDisabled: false, allowedGrades: [2, 3], hintsDisabled: true, labsDisabled: false, lockedChapters: ['algebra'] } },
];

function runApply({ hints, labs }) {
  const written = [];
  const prefs = [];
  const ctx = {
    console,
    // The two controls the card still has. Anything the writer reads that is NOT
    // one of these comes back null, which is how a stray getElementById for a
    // removed control would show up as a silent `undefined` write.
    document: {
      getElementById: id => ({ 'set-def-hints': { checked: hints }, 'set-def-labs': { checked: labs } }[id] || null),
      querySelector: () => null,
      querySelectorAll: () => [],
    },
    Auth: { getStudents: () => JSON.parse(JSON.stringify(CHILDREN)) },
    Store: { updateStudent: async (id, patch) => { written.push({ id, patch }); return { ok: true }; } },
    _savePrefs: async p => { prefs.push(p); },
    _profileSaved: () => {},
    toast: () => {},
    DB: { restrictions: {} },
    ACTIVE_STUDENT_ID: 'c2',
    GradeAccess: { flagsFor: () => ({ crossGradeSearch: true, crossGradePractice: true }) },
  };
  vm.createContext(ctx);
  vm.runInContext(writerSrc + '\nglobalThis._run = () => _applyDefaultsToAll({});', ctx);
  return ctx._run().then(() => ({ written, prefs }));
}

(async () => {
  const { written, prefs } = await runApply({ hints: true, labs: false });

  ok('every child is written', written.length === 3, written.map(w => w.id));

  for (const w of written) {
    const before = CHILDREN.find(c => c.id === w.id).settings;
    const after  = w.patch.settings;

    // ⚠ THE REGRESSION THIS TEST EXISTS FOR.
    ok(`${w.id}: the difficulty cap is untouched`, after.maxDifficulty === before.maxDifficulty,
      { was: before.maxDifficulty, now: after.maxDifficulty });
    ok(`${w.id}: exam mode is untouched`, after.examDisabled === before.examDisabled,
      { was: before.examDisabled, now: after.examDisabled });
    ok(`${w.id}: grade access is untouched`,
      JSON.stringify(after.allowedGrades) === JSON.stringify(before.allowedGrades),
      { was: before.allowedGrades, now: after.allowedGrades });
    // Chapter locks had this protection already; keep it.
    ok(`${w.id}: chapter locks are untouched`,
      JSON.stringify(after.lockedChapters) === JSON.stringify(before.lockedChapters),
      { was: before.lockedChapters, now: after.lockedChapters });

    // And the two that ARE family-wide really do change, for everyone.
    ok(`${w.id}: hints follow the family switch`, after.hintsDisabled === false, after.hintsDisabled);
    ok(`${w.id}: labs follow the family switch`, after.labsDisabled === true, after.labsDisabled);
  }

  // ⚠ A key written as `undefined` is not "untouched" — it overwrites on merge
  //   and reads back as missing. Assert the payload shape, not just the values.
  const keys = new Set(written.flatMap(w => Object.keys(w.patch.settings)));
  ok('no setting is written as undefined',
    written.every(w => Object.values(w.patch.settings).every(v => v !== undefined)), [...keys]);

  // What is remembered for next time must be the two keys and nothing else.
  const remembered = prefs[0]?.child_defaults || {};
  ok('only the family-wide keys are remembered',
    JSON.stringify(Object.keys(remembered).sort()) === JSON.stringify(['hintsDisabled', 'labsDisabled']),
    Object.keys(remembered));

  // ── The card itself ───────────────────────────────────────────────────────
  const card = appSrc.slice(appSrc.indexOf('const defaultsHtml = children.length'),
                            appSrc.indexOf('// ── Danger zone ──'));
  ok('the card no longer offers a difficulty cap', !/set-def-diff/.test(card));
  ok('the card no longer offers exam mode', !/set-def-exam/.test(card));
  ok('the card no longer offers grade access', !/data-def-grade/.test(card));
  ok('it still offers hints and labs', /set-def-hints/.test(card) && /set-def-labs/.test(card));
  ok('it is no longer called "defaults for all children"', !/Defaults For All Children/.test(appSrc));
  // ⚠ Removing the controls without saying where they went leaves a parent
  //   hunting for a cap they had already set once.
  ok('and it says where the per-child settings now live',
    /per child/i.test(card) && /Controls/.test(card));

  // ── The per-child controls must exist, or this move stranded them ─────────
  ok('per-child difficulty cap is in the Controls tab', /Auth\.setMaxDifficulty\(/.test(htmlSrc));
  ok('per-child exam mode is in the Controls tab', /Auth\.toggleExamDisabled\(\)/.test(htmlSrc));
  ok('per-child grade access is rendered there', /id="pd-grade-access"/.test(htmlSrc));
  for (const fn of ['setMaxDifficulty', 'toggleExamDisabled', 'toggleGradeAccess']) {
    ok(`Auth.${fn} is exported`, new RegExp('\\b' + fn + '\\b').test(authSrc.slice(authSrc.lastIndexOf('return {'))));
  }

  console.log(fails
    ? `\n${checks - fails}/${checks} family-vs-child settings checks passed`
    : `${checks}/${checks} family-vs-child settings checks passed`);
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
