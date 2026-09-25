# Engine Internals

## Engine load order (script tags in `index.html`)
```
supabase.js → protect.js → helpers.js → questions_engine.js → registry.js →
events.js → store.js → subjects/_index.js → question_loader.js → app.js →
biometric.js → auth.js → calendar.js → search.js → classroom.js
```
- ⚠ **`app.js` loads BEFORE `auth.js`.** `auth.js` ends by calling `Auth.init()`,
  which needs `showScreen` and `ACTIVE_STUDENT_ID` from `app.js`. Verify against
  `index.html` before trusting any summary of the order, this one included.

---

## Lazy loading — two mechanisms, same shape

**Subject packs** (`PackLoader`, engine/registry.js). `index.html` carries one
generated `subjects/_index.js` (~40 KB, one request) instead of one blocking
manifest per pack (measured: 45 requests, 323 KB parsed before `app.js` ran).
- The index registers every pack with its **chapter list** but no prose,
  subsection maps, generators, badges, formulas or help. `_lite: true` marks one.
- `PackLoader.ensure(packId)` / `ensureGrade(grade)` injects the real
  `_manifest.js` plus extras (`grade5-maths/help.js`).
- ⚠ Anything taking a child **into** a subject must `await PackLoader.ensure()`
  first, or the syllabus screen and generators are missing. Anything that only
  **lists** chapters across packs needs nothing — every such consumer reads
  `id`/`name`/`icon` only (checked, not assumed).
- ⚠ **`registerSubject()` MERGES on a second call and MUTATES the existing
  object** — callers hold references (`ACTIVE_PACK`), so replacing the array slot
  would leave the open subject pointing at the lite copy. It refreshes `CHAPTERS`
  in place when the pack is active.
- ⚠ A failed load **drops the cached promise** so a retry can succeed.
- ⚠ **The index is GENERATED — never hand-edit it.**
  `node scripts/build-subject-index.js`. Prose fields are dropped **by name**, so
  a new chapter field is kept by default rather than silently stripped.
- `scripts/check.js` fails on drift (new pack, renamed/reordered chapter, bad
  `_src`) and if `index.html` loads a pack manifest eagerly again.

**Role modules** (`RoleModules`, same file). `admin.js`, the five teacher files
and `forum.js` load **on demand** — 0.48 MB of source every child used to parse
for screens they can never open.
- ⚠ The order inside the teacher group is load-bearing: the four helpers, then
  `teacher.js`, then `teacher_classroom_detail.js`.
- ⚠ **Check a module is loaded by BARE IDENTIFIER, never `window.X`** — they are
  `const X = (() => {…})()` at classic-script top level, which never lands on
  `window`. Only `TeacherHome` and `TeacherInsights` assign themselves across.
- ⚠ `showScreen()` stays **synchronous** — dozens of callers read the DOM straight
  after it. It shows the screen and renders when the module lands.
- `scripts/test-role-modules.js`. ⚠ Anchor "was it fetched" regexes on `engine/` —
  a bare `/(admin|teacher|forum)\.js/` also matches `engine/nce_paper_admin.js`.
