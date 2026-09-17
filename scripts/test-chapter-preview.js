'use strict';
// ── Chapter Preview: an adult answering must write NOTHING ─────────────────
// Run: node scripts/test-chapter-preview.js
//
// ⚠⚠ THE FAILURE THIS PREVENTS is silent and lands on the wrong person. A
//    parent reaches Chapter Preview from the dashboard, where pdSwitchStudent
//    has already put a CHILD in ACTIVE_STUDENT_ID and filled DB with that
//    child's progress blob. Every write funnel in practice therefore writes to
//    that child. A parent trying ten questions to see what their daughter sees
//    would file ten attempts under her name, any wrong ones as her mistakes,
//    against her daily goal and her streak — and nothing anywhere would report
//    it. Same rule, same reason, as "game answers never call recordAnswer()".
//
// ⚠ The flag lives on S.practice and is cleared in _setAssignmentContext(),
//   the one function every practice entry point already calls to declare what
//   kind of run it is. A flag cleared only by the preview's own exit would
//   survive a crash, a back button or a deep link and then silently stop
//   recording a REAL child's practice — failing the wrong way round.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const app = fs.readFileSync(path.join(ROOT, 'engine/app.js'), 'utf8');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');

let checks = 0, fails = 0;
// ⚠ Positional checks run on CODE, never on the file text: these guards are
//   documented in comments that quote the very calls being looked for
//   ("…points and save(DB) all hang off this call"), so a raw indexOf finds
//   the comment and reports a guard that sits after a write which is not there.
const code = (s) => s.replace(/\/\/[^\n]*/g, '');

const ok = (label, cond, detail) => {
  checks++;
  if (cond) return;
  fails++;
  console.log('FAIL ' + label + (detail === undefined ? '' : `\n     ${JSON.stringify(detail)}`));
};

// ── 1. The flag really is cleared by the shared entry-point declaration ─────
// Executed, not matched: this is the invariant, so it is run.
{
  const start = app.indexOf('function _isPreviewRun()');
  const end = app.indexOf('\n}', app.indexOf('function _setAssignmentContext(on)'));
  ok('found _isPreviewRun and _setAssignmentContext', start > 0 && end > start);
  const sandbox = {
    S: { practice: {} },
    _assignmentActive: false,
    document: { getElementById: () => ({ classList: { toggle() {} } }) },
    console,
  };
  vm.createContext(sandbox);
  vm.runInContext(app.slice(start, end + 2), sandbox);

  sandbox.S.practice.preview = true;
  ok('_isPreviewRun() reads the flag', sandbox._isPreviewRun() === true);
  sandbox._setAssignmentContext(false);
  ok('an ordinary practice start CLEARS the preview flag', sandbox._isPreviewRun() === false);
  sandbox.S.practice.preview = true;
  sandbox._setAssignmentContext(true);
  ok('an assignment start clears it too', sandbox._isPreviewRun() === false);
}

// ── 2. Every write funnel is guarded, and guarded FIRST ────────────────────
// ⚠ Position matters, not just presence: a guard below the first write is not
//   a guard. Each of these is a distinct way the child's record gets touched.
const FUNNELS = [
  ['recordAnswer', 'the daily bucket, mastery, QuestionProgress, streak, badges, points, save(DB)'],
  ['_recordMistake', "the parent's “what she's getting wrong” list"],
  ['_retireMistake', 'retiring a mistake the child has not actually fixed'],
  ['_saveResume', "a resume record in the child's own chapter slot"],
  ['_usageBump', "the child's daily question allowance"],
  ['gainPoints', 'points, and the level on the leaderboard'],
];
for (const [fn, what] of FUNNELS) {
  const at = app.indexOf(`function ${fn}(`);
  ok(`${fn}() exists`, at > 0);
  if (at < 0) continue;
  const body = code(app.slice(at, at + 900));
  const guard = body.indexOf('_isPreviewRun()');
  ok(`${fn}() is guarded — it writes ${what}`, guard > 0, { fn });
  // Nothing that writes may come before the guard.
  const firstWrite = Math.min(...['save(DB)', 'DB.', 'u[kind]', '_recordDaily(']
    .map(t => { const i = body.indexOf(t); return i < 0 ? Infinity : i; }));
  ok(`${fn}() checks the guard BEFORE it writes anything`, guard < firstWrite, { guard, firstWrite });
}

// The referral RPC is not a DB write but it is money, so it is on the list.
ok('the referral activity RPC is not fired by an adult',
  /Shop\.reportPracticeActivity\(\)/.test(app)
  && code(app.slice(app.indexOf('Shop.reportPracticeActivity()') - 260, app.indexOf('Shop.reportPracticeActivity()')))
      .includes('_isPreviewRun()'));

// The two French exercises write a best score DIRECTLY, bypassing recordAnswer.
for (const f of ['engine/cloze.js', 'engine/errorhunt.js']) {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const store = src.indexOf('const store = _store();');
  const guard = src.indexOf('_isPreviewRun()');
  ok(`${f} guards its own best-score write`, guard > 0 && guard < store, { guard, store });
}

// ── 3. The round-complete buttons stay inside the preview ──────────────────
// ⚠ _roundCompleteNext() calls _setAssignmentContext(false), which clears the
//   flag. Without carrying it across, the adult's SECOND round records.
{
  const at = app.indexOf('function _roundCompleteNext()');
  const body = code(app.slice(at, at + 1200));
  ok('_roundCompleteNext() carries the preview flag across', /_wasPreview/.test(body)
    && body.indexOf('_wasPreview = _isPreviewRun()') < body.indexOf('_setAssignmentContext(false)'));
  ok('_roundCompleteNext() restores it after the reset',
    /if \(_wasPreview\) S\.practice\.preview = true;/.test(body));
  const back = code(app.slice(app.indexOf('function _roundCompleteBack()'), app.indexOf('function _roundCompleteBack()') + 400));
  ok('_roundCompleteBack() sends an adult back where they came from',
    /_isPreviewRun\(\)[\s\S]{0,40}exitChapterPreview\(\)/.test(back));
}

// ── 4. The kid-screen guard opens for the preview, and only for it ─────────
{
  const at = app.indexOf('const _previewScreen =');
  ok('showScreen() has a named preview exception', at > 0);
  const line = app.slice(at, app.indexOf('\n', at));
  ok('it is limited to the practice and cloze screens',
    /'practice'/.test(line) && /'cloze-play'/.test(line) && !/'dashboard'/.test(line), line);
  ok('and it only opens while a preview is actually running', /_isPreviewRun\(\)/.test(line));
}

// ── 5. One module, two surfaces — the PaperBuilder rule ────────────────────
const teacher = fs.readFileSync(path.join(ROOT, 'engine/teacher.js'), 'utf8');
ok('the parent dashboard renders ChapterPreview',
  /ChapterPreview\.render\('pd-preview-host', 'parent'\)/.test(app));
ok('the teacher screen renders the SAME module',
  /ChapterPreview\.render\('tc-preview-host', 'teacher'\)/.test(teacher));
ok("'preview' is a parent dashboard panel", /_PD_PANELS = \[[^\]]*'preview'/.test(app));
ok("'preview' is a teacher More tab", /MORE_TABS = \[[^\]]*'preview'/.test(teacher));
for (const id of ['pd-preview-host', 'tc-preview-host', 'pd-panel-preview', 'pd-tab-preview', 'practice-preview-note']) {
  ok(`index.html carries #${id}`, html.includes(`id="${id}"`));
}
ok('index.html loads engine/chapter_preview.js', /<script src="engine\/chapter_preview\.js"><\/script>/.test(html));
// ⚠ The precache list is ALL-OR-NOTHING: a script tag the list does not carry
//   is a file missing from the offline shell, and a name in the list that is
//   not on disk kills the whole shell rather than one feature.
ok('sw.js precaches it', sw.includes("'/engine/chapter_preview.js'"));
ok('the file is actually on disk', fs.existsSync(path.join(ROOT, 'engine/chapter_preview.js')));

// ── 6. The picker is parent- and child-facing, so it filters comingSoon ────
{
  const cp = fs.readFileSync(path.join(ROOT, 'engine/chapter_preview.js'), 'utf8');
  ok('the subject list filters comingSoon packs', /filter\(p => !p\.comingSoon\)/.test(cp));
  ok('it reads both the lite and the full chapter shape', /_chapters \|\| pack\.chapters/.test(cp));
  ok('it hands the launcher the surface it was rendered for',
    /startChapterPreview\(_state\.packId, chapterId, diff, _surface\)/.test(cp));
}

// ── 7. "Mixed" is not difficulty:null ──────────────────────────────────────
// ⚠ THIS SHIPPED BROKEN ONCE. getStaticQs() matches `q.difficulty === difficulty`
//   EXACTLY, and no question carries a null level, so
//   getQuestionsForChapter(id, null, 20) returns an EMPTY ARRAY rather than "all
//   levels". The first build of the preview called it that way and every single
//   chapter answered "there are no questions in this chapter yet" — which reads
//   as missing content, not as a selector bug. The child's own mixed round has
//   always called getMixedQuestions(); the trap is only visible by running it.
{
  const engine = fs.readFileSync(path.join(ROOT, 'engine/questions_engine.js'), 'utf8');
  const sandbox = {
    console,
    shuffle: (a) => a.slice(),
    packGenerators: () => ({}),
  };
  vm.createContext(sandbox);
  // ⚠ `const STATIC_QUESTIONS = []` at the top level of a classic script does
  //   NOT land on the global object - the same rule this codebase already
  //   documents for role modules ("check by BARE IDENTIFIER, never window.X").
  //   It has to be handed across explicitly.
  vm.runInContext(engine.slice(0, engine.indexOf('function assembleExamPaper'))
    + '\n;globalThis.__SQ = STATIC_QUESTIONS;', sandbox);
  const q = (id, d) => ({ id, chapterId: 'ch', difficulty: d, type: 'mcq', question: 'Q' + id,
    options: ['a', 'b', 'c', 'd'], answer: 'a' });
  sandbox.__SQ.push(q('a', 1), q('b', 2), q('c', 3), q('d', 4));

  ok('the trap is real: getQuestionsForChapter(id, null) returns NOTHING',
    sandbox.getQuestionsForChapter('ch', null, 20).length === 0);
  ok('getMixedQuestions(id, 4) returns the whole chapter',
    sandbox.getMixedQuestions('ch', 4, 20).length === 4);
  ok('a named level still works', sandbox.getQuestionsForChapter('ch', 2, 20).length === 1);

  const at = app.indexOf('async function startChapterPreview(');
  const body = code(app.slice(at, app.indexOf('\n}', at)));
  ok('the preview deals a mixed round with getMixedQuestions',
    /getMixedQuestions\(chapterId, 4, 20\)/.test(body));
  ok('and never asks getQuestionsForChapter for a null level',
    !/getQuestionsForChapter\([^)]*forceDiff \|\| null/.test(body), body.match(/getQuestionsForChapter\([^)]*\)/g));
  ok('an empty level falls back to the whole chapter, as it does for a child',
    /if \(!qs\.length && forceDiff\)/.test(body));
  ok('“nothing loaded” and “nothing here” are different sentences',
    /STATIC_QUESTIONS\.some/.test(body) && /could not be loaded/.test(body));
}

// ── 8. EVERY door out of a preview, not just the ← button ──────────────────
// ⚠ MEASURED IN TEACHER MODE. "⏸️ Continue later" called _saveResume() (a no-op
//   in a preview, so its "Saved — tap this chapter again" toast was a lie) and
//   then navigated to chapter-select. That is a kid screen, so showScreen()
//   bounced it to _returnToParentDashboard() — and a TEACHER has no children,
//   so the parent dashboard rendered "could not be loaded". One wrong exit,
//   two wrong screens, and neither message named the real problem.
{
  const guard = code(app.slice(app.indexOf('const _previewScreen ='),
    app.indexOf('const _previewScreen =') + 900));
  ok('a preview leaves by its own door, never via the parent dashboard',
    guard.indexOf('exitChapterPreview()') < guard.indexOf('_returnToParentDashboard()'),
    { exit: guard.indexOf('exitChapterPreview()'), parent: guard.indexOf('_returnToParentDashboard()') });

  const pause = code(app.slice(app.indexOf('function pausePracticeForLater()'),
    app.indexOf('function pausePracticeForLater()') + 700));
  ok('Continue later bails out of a preview before it claims to have saved',
    pause.indexOf('_isPreviewRun()') < pause.indexOf('_saveResume()')
    && pause.indexOf('_isPreviewRun()') < pause.indexOf('Saved'), pause.slice(0, 160));

  const banner = code(app.slice(app.indexOf('function _setPreviewBanner(on)'),
    app.indexOf('function _setPreviewBanner(on)') + 500));
  ok('the preview chrome hides ⏸️ Continue later', /practice-pause-btn/.test(banner));

  const exit = code(app.slice(app.indexOf('function exitChapterPreview()'),
    app.indexOf('function exitChapterPreview()') + 1800));
  // ⚠ Clear the flag BEFORE navigating, or showScreen's new branch calls back
  //   into this function and the two bounce off each other.
  ok('exitChapterPreview() clears the flag before it navigates',
    exit.indexOf('_setAssignmentContext(false)') < exit.indexOf('showScreen('));
  ok('and it returns to the surface the preview was opened from',
    /previewBack === 'teacher' \? 'teacher' : 'parent'/.test(exit));
}

// ── 9. The dashboard's panel reset must cover EVERY panel ──────────────────
// ⚠ MEASURED IN PARENT MODE. renderParentDashboard() reset to My Children by
//   hiding a hard-coded ['calendar','shop','messages','settings'] — a list
//   written out a second time, which had already drifted: `papers` was missing
//   before this feature existed, and `preview` made it visible. Leaving a
//   preview therefore showed the children page with the chapter picker still
//   open UNDERNEATH it. Now derived from _PD_PANELS, in PD, where that list
//   actually lives.
{
  const at = app.indexOf('function showChildrenPanel()');
  ok('PD.showChildrenPanel() exists', at > 0);
  ok('it is exported', /mainTab, showChildrenPanel,/.test(app));
  ok('renderParentDashboard() goes through it', /PD\.showChildrenPanel\(\);/.test(app));
  // ⚠ code(), not app: the only surviving copy of that literal is the comment
  //   above showChildrenPanel() explaining the bug it caused.
  ok('and no longer carries its own list of panels',
    !/\['calendar','shop','messages','settings'\]/.test(code(app)));

  // Executed: every panel but children ends up hidden, whatever _PD_PANELS holds.
  const panels = (app.match(/const _PD_PANELS = \[([^\]]*)\]/) || [])[1]
    .split(',').map(s => s.trim().replace(/'/g, '')).filter(Boolean);
  ok('_PD_PANELS still lists children and preview',
    panels.includes('children') && panels.includes('preview'), panels);
  const shown = {};
  const sandbox = {
    _PD_PANELS: panels,
    document: {
      getElementById: (id) => ({ classList: { toggle: (_c, on) => { shown[id] = !on; } } }),
      querySelector: () => null,
    },
    console,
  };
  vm.createContext(sandbox);
  vm.runInContext(app.slice(at, app.indexOf('\n  }', at) + 4)
    + '\n;globalThis.__run = showChildrenPanel;', sandbox);
  sandbox.__run();
  ok('children is the only panel left visible',
    panels.every(p => shown[`pd-panel-${p}`] === (p === 'children')), shown);
}

// ── 10. Leaving a preview returns to the TAB it was opened from ────────────
{
  const exit = code(app.slice(app.indexOf('function exitChapterPreview()'),
    app.indexOf('function exitChapterPreview()') + 1800));
  ok('a parent lands back on the Chapter Preview tab', /PD\.mainTab\('preview'\)/.test(exit));
  ok('a teacher lands back on their Chapter preview tab',
    /TeacherMode\.switchTab\('preview'\)/.test(exit));
  // ⚠ After showScreen, never before: showScreen('parent') runs
  //   renderParentDashboard(), which resets to My Children.
  ok('the tab is restored AFTER the screen is shown',
    exit.indexOf('showScreen(back)') < exit.indexOf("mainTab('preview')"));
}

console.log(fails ? `\n${fails} of ${checks} checks FAILED.` : `\nAll ${checks} checks passed.`);
process.exit(fails ? 1 : 0);
