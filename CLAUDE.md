# PSAC Exam Practice — Project Brief for Claude

## What this is
A vanilla JS single-page app for Mauritian primary children revising for the
**PSAC** exam (grades 1–9 registered; **4, 5, 6 are the live ones**, plus NCE
Grade 9 Mathematics and ICT). Subjects: Maths, English, French, Science, History
& Geography. Hosted on **Netlify**; backend **Supabase**
(`https://xawvjwsiqhtxgpocdqgm.supabase.co`). No frameworks — HTML/CSS/JS +
Tailwind CDN.

## Where the documentation lives
| File | What it is |
|---|---|
| **`CLAUDE.md`** (this file) | The index, the architecture, and the rules that apply anywhere. Loaded every session — **keep it short**. |
| **`docs/claude/*.md`** | One file per area (routing table below). Each holds the full rules for that area, and is where a rule and its bound actually live. |
| **`ENGINEERING-NOTES.md`** | The long-form archive (~400 KB): why each rule exists, how each bug was found, what was measured. **Grep it before re-investigating anything.** It ends with the full 167 KB CLAUDE.md as it stood on 2026-09-08. |
| `PROJECT_OVERVIEW.md`, `PLAN.md`, `ARCHITECTURE.md` | Older overviews. Historical. |
| `HOW_TO_RUN_LOCALLY.md`, `HOW_TO_PUBLISH.md`, `DB_IMPORT_GUIDE.md` | Operational. |

### ⚠ Read the area file BEFORE you touch that area
The bullets under each heading below are **headlines only** — they name a rule so
you know it exists. The area file carries the rule, its bound and its test.

| Touching… | Read first |
|---|---|
| a question file, a pack, `exam_depth.js`, cloze/errorhunt, exam weights, the importer | [`content-authoring.md`](docs/claude/content-authoring.md) |
| `store.js`, `question_loader.js`, `DB`, the localStorage caches | [`data-storage.md`](docs/claude/data-storage.md) |
| `auth.js`, the parent PIN, sessions, anything that sends email | [`auth-sessions.md`](docs/claude/auth-sessions.md) |
| SQL, RLS, a policy, a grant, `supabase-schema.sql` | [`database.md`](docs/claude/database.md) |
| `style.css`, `index.html`, any screen, modal, layout or the map | [`ui-css.md`](docs/claude/ui-css.md) |
| `sw.js`, `netlify.toml`, a deploy, or a headless-Chrome harness | [`deploy-and-verification.md`](docs/claude/deploy-and-verification.md) |
| minigames, teacher mode, the landing page, timetable, materials, contact form, sharing | [`features.md`](docs/claude/features.md) |
| what to do next, or anything reported as outstanding | [`pending.md`](docs/claude/pending.md) |

⚠ Nothing in any `.md` outranks the code or the live database. **Verify before
relying on a summary — this one included.** Version numbers and counts go stale
within the hour; read the file, don't quote this one.

---

## File layout
```
index.html                  ← entire app UI, all screens, shown/hidden by showScreen(id)
style.css                   ← custom CSS, loaded AFTER the Tailwind Play CDN
sw.js  manifest.json  icons/
netlify.toml                ← functions, cron, and the explicit 404 redirects
supabase-schema.sql         ← THE schema. One file, generated. See "Database"
engine/                     ← see the feature table below
netlify/
  functions/    questions.js push-*.js weekly-digest.js notify.js assignment-submit.js …
  lib/          student-auth.js questions-sandbox.js mailer.js teacher-activity.js
  build-questions.js  import-questions.js
  question-bundles/   ← GITIGNORED, rebuilt by build-questions.js on every deploy
subjects/
  _index.js               ← GENERATED eager pack index — the ONLY subject script
                             index.html loads. node scripts/build-subject-index.js
  grade[1-9]-[subject]/
    _manifest.js          ← registerSubject() + chapters + SYLLABUS + generators.
                             LAZY: fetched by PackLoader.ensure() on demand
    questions/ch01_*.js … ← plain scripts; enrichment_*.js, past_paper_*.js, exam_depth.js
```

### Where a feature lives
| Feature | File |
|---|---|
| Screens, practice, exam, dashboards, reports, daily goal | `engine/app.js` (~478 KB — the big one) |
| Parent/teacher auth, student PIN login, session guard, mode handover | `engine/auth.js` |
| localStorage + Supabase data layer, progress blob | `engine/store.js` |
| Question fetching + 7-day localStorage cache | `engine/question_loader.js` |
| Pack registry, `CHAPTERS`, `PackLoader`, `RoleModules` | `engine/registry.js` |
| Timetable, calendar, activity layer | `engine/calendar.js` |
| Interactive map — the child's map AND the admin editor | `engine/interactive_map.js` |
| Textes à Trous (French Q6) · Chasse aux Erreurs (French Q7) | `engine/cloze.js` · `engine/errorhunt.js` |
| Minigames · their data · parent game settings | `engine/minigame.js` · `minigame_{gk,words,geo,time}.js` · `game_settings.js` |
| Credits + entitlement model, `sellableChapters/Subjects` | `engine/shop.js` (the shop *screen*, `renderShop()`, is in `app.js`) |
| Admin panel, shop settings, security log | `engine/admin.js` |
| Server-side entitlement enforcement | `netlify/functions/questions.js` |
| Teacher navigation, Set Work, success screen, location restore | `engine/teacher.js` (`TeacherMode`) |
| Teacher Home dashboard | `engine/teacher_home.js` |
| Assignment cards, Results screen, results cache, reminders/export | `engine/teacher_workspace.js` |
| Classroom screen (Overview · Work · Pupils · More) | `engine/teacher_classroom_detail.js` |
| Classroom list + new-classroom form | `engine/teacher_guest_classes.js` |
| Evidence thresholds, grouping, "who needs my help" (pure) | `engine/teacher_insights.js` |

## Engine load order (script tags in `index.html`)
```
supabase.js → protect.js → helpers.js → questions_engine.js → registry.js →
events.js → store.js → subjects/_index.js → question_loader.js → app.js →
biometric.js → auth.js → calendar.js → search.js → classroom.js
```
- ⚠ **`app.js` loads BEFORE `auth.js`.** `auth.js` ends by calling `Auth.init()`,
  which needs `showScreen` and `ACTIVE_STUDENT_ID` from `app.js`. Verify against
  `index.html` before trusting any summary of the order, this one included.

### Lazy loading — two mechanisms, same shape
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

## Key globals
- `STATIC_QUESTIONS` — flat array; every question file pushes into it.
- `CHAPTERS` — chapters of the active pack, **declared in `engine/registry.js`**,
  starts `[]`, mutated in place by `activateSubjectPack()` / `registerSubject()`.
  ⚠ Re-declaring it in a pack manifest throws *"Identifier 'CHAPTERS' has already
  been declared"* and makes lazy loading impossible. (It used to ship full of
  Grade 5 Maths, which is how a Grade 4 child tapping Science got maths.)
- `PackLoader` — `ensure(packId)` / `ensureGrade(grade)` / `isLoaded(packId)`.
- `ACTIVE_PACK` / `ACTIVE_STUDENT_ID` / `SUBJECT_PACKS`.
- `DB` — the student progress blob (localStorage + Supabase `student_progress.data`).
- `S` — session state: `S.practice.{chapterId,qs,idx,difficulty,session}`,
  `S.exam.{qs,answers,flagged,idx,type,endTime}`.
- `_activePack()` returns **null** when nothing is chosen — never a fallback pack.
  Every caller handles null; a guess dressed as an answer is worse than no answer.

## Key functions
`makeMCQ / makeNum / makeTF / makeMatch / makeSymmetry / makeCloze / makeErrorHunt` ·
`startChapterDirect(chapterId, forceDiff)` · `loadPracticeQuestion()` ·
`renderExamQuestion()` · `renderChapterSelect()` · `assembleExamPaper(type)` ·
`showScreen(id)` · `getQuestionsForChapter()` / `getMixedQuestions()` ·
`_makeImgsZoomable()` · `speakQuestion(mode)` · `_saveResume()` / `_doResume()` ·
`_chapterProgress(chapterId)` · `_prettyMath()` · `_gradeStage(grade)`

---

## Content model

### Question file pattern
```js
'use strict';
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5sc-plants-001', chapterId:'plants', difficulty:2,
    subsection:'photosynthesis',
    question:'Question text (innerHTML — <b>, <img>, inline <svg> all work)',
    options:['A','B','C','D'], answer:'B', hint:'…', explanation:'…' })
);
```
- IDs: `[grade][subject]-[chapter]-[3 digits]`.
- difficulty: 1 Basic · 2 Medium · 3 Hard · **4 = word problems** (applied, not
  just harder recall).
  ⚠ **That L4 definition is MATHS-SHAPED.** Measured per pack: english L4 =
  extended passage/essay analysis; french L4 = multi-verb cloze; history/science
  L4 = applied scenarios. Two automatic gates were tried and rejected (they fired
  on 1,055 French and 206 English items whose grammar answers are single words by
  nature). `scripts/audit-difficulty-labels.js` therefore **reviews, never fails**:
  whether a question demands reasoning is a reading, and a script can only count
  what someone has already asserted. ⚠ The labels are the AUTHOR'S assertion, not
  a measurement — L3/L4 had been diluted with plain retrieval.
- ⚠ **`makeMCQ()` SHUFFLES its own options.** Authoring answer-first is still
  useful (`options[0]` is then always the answer, checkable at a glance) but
  positions nothing — do not believe a comment that claims it does. What needs
  care is keeping all four options the same grammatical shape and length;
  `scripts/test-option-parity.js` catches length leaks.
- Images: bundled under `assets/questions/` (see [deploy-and-verification.md](docs/claude/deploy-and-verification.md)). Prefer inline SVG — it
  cannot 404, works offline, and its contents are known exactly.
- ⚠ **Alt text must NEVER reveal the answer** ("an object", "a diagram").
- ⚠ **Never remove a `// @enrichment` guard comment** during syllabus audits.

### Chapter content comes in FOUR shapes — a reader must handle all four
| Shape | Chapters | Where |
|---|---|---|
| `pack.syllabus[id].subsections` | 18 | **grade5-maths only** |
| `chapter.syllabus` prose | 60 | History ×3, Science ×3, grade4/6-maths |
| `chapter.notes` | 55 | English ×3, French ×3 (`notesBased: true`) |
| `chapter.enrichmentNote` | 15 | bonus chapters |

`renderSyllabus()` reads all four; `_notesToHtml()` and `Calendar.showNotes()`
share a `**bold**`/`*italic*` subset — **keep them in step**.

### Subsections
Every chapter expands into named sub-topics with a live count and its own
"Practise →" (100% tagged). ⚠ **Invariant: declared subsection ids and tagged
subsection ids must be identical per chapter.** A declared id with no questions
opens empty; a tagged id that is not declared hides those questions from the
screen. The English/French maps are *generated from the tags* so they cannot
disagree at birth.
- ⚠ It was broken in five chapters at once and had been for a long time — 22
  elapsed-time items on `g6-time-speed` alone were unreachable.
  `audit-content-coverage.js` was counting undeclared tags the whole time but
  never naming them and never failing, which is precisely how five survived.
  `scripts/test-subsection-invariant.js` names them and fails the build.
- Prefer reusing a sibling pack's id (`narration`, `figures_style`, `vrai_faux`,
  `word_probs`) over inventing a one-item subsection. ⚠ A declared subsection
  under 20 questions is reported as a permanent gap by `audit-content-coverage.js`.

### Enrichment chapters
```js
{ id:'g5enr-personalities', name:'…', icon:'👤', enrichment:true,
  examWeight:2, enrichmentNote:'Derived from syllabus, NOT a direct MIE chapter.' }
```
Gold "✨ BONUS" card. ⚠ **`examWeight: 0` does NOT keep a chapter out of an
exam** — `assembleExamPaper()` clamps every weight with `Math.max(1, …)`, so a 0
still buys a slot. The TYPE filter is the guard that actually holds.

### The rest of authoring → [`content-authoring.md`](docs/claude/content-authoring.md)
Past papers (164 items, never gradable) · dynamic generators · the two French
exercise types (`cloze`, `errorhunt`) · exam weighting derived from the real
papers · the importer's flags and fail-closed preflight. Headlines:
- ⚠ **`isPoolQuestion()` excludes `cloze` and `errorhunt` from every pool** —
  dealt into practice or an exam they draw a number pad under a French passage.
- ⚠ **A generator can only live in a `_manifest.js`** — in production question
  files are fetched as JSON and never executed.
- ⚠ **`examWeight` is the only lever on what an exam contains**, and ten packs are
  weighted from their real papers; **the Grade 4 packs are not derived and cannot
  be** — there is no Grade 4 paper.
- ⚠ **The importer never deletes**, is two-phase and fail-closed, and a clean
  re-import is "0 new, ~560 updated", not zero writes.

---

## Adding or changing questions — checklist
1. Write the file under `subjects/[pack]/questions/`.
2. Add it to `LOCAL_FILES[pack]` in `question_loader.js` (**`file://` dev only**;
   prod auto-discovers).
3. ⚠ **Bump `_CACHE_VERSION`** in the same file, or a child keeps the old set for
   up to a week with nothing in the UI explaining why. Bumping purges old keys.
4. If you touched a **question factory**, apply it to all four copies (below).
5. If chapters changed, keep the SYLLABUS subsection map in step.
6. ⚠ If you added/removed/renamed/reordered a **chapter** — or added a pack —
   re-run `node scripts/build-subject-index.js`. `scripts/check.js` fails on
   drift, so this cannot ship stale, but it will stop the build until you do.
7. After any large content addition:
   `node netlify/build-questions.js && node scripts/test-question-cache-budget.js`.

## ⚠ Code that is duplicated on purpose — change every copy together
There is no shared module between the browser and the Lambdas. Each of these has
bitten this project at least once:

| Thing | Copies |
|---|---|
| **Question factories** (`makeMCQ`…`makeSymmetry`, `makeCloze`, `makeErrorHunt`) | `engine/helpers.js`, `netlify/functions/questions.js`, `netlify/build-questions.js`, `netlify/lib/questions-sandbox.js` |
| Sandbox context (`STATIC_QUESTIONS` as a **real array**, `window.PSAC_PDF_QUESTIONS`) | the three server copies above |
| `FREE_GRADES` / free-grade helpers | `engine/helpers.js`, `netlify/functions/questions.js` |
| Mauritius day-key helpers (`_muDayKey`) | `engine/app.js`, `engine/store.js`, `netlify/functions/weekly-digest.js` |
| Student-token resolution | `netlify/lib/student-auth.js` ↔ Postgres `current_student_id()` |
| Parent PIN salt `:psac_v1_db` | `_hashPinForDb` (auth.js) ↔ `hashPin` (functions/parent-pin-signin.js) |
| Refusing a password change on a PIN-only session | `changePassword` (auth.js) ↔ `_saveProfilePassword` (app.js) |
| Shop defaults | `SHOP_DEFAULTS` (admin.js), `DEFAULTS` (shop.js), the SQL `coalesce()`s |
| Teacher assignment caps | `GUEST_LIMIT_DEFAULTS` (admin.js), `guest_assignment_limits()`, the seeded `mm_data` row |
| `REWARD_SLOTS` | app.js ↔ functions/questions.js |
| Kid vibe list | `KID_VIBES` (app.js) ↔ `:root[data-kid-vibe=…]` (style.css) |
| Materials sort comparator | `engine/helpers.js` ↔ `guest.js` (that page loads no engine file, by design) |

⚠ **Reading the code is not a sufficient check for the factory copies. Grep the
BUILT bundle for the field.** A new factory must be added to the three server
copies **and to their exported context lists** — `makeCloze` was defined in all
three and missing from the export list, so every cloze text was absent from the
built bundle while the source read correctly. `learnMore` and `subsection` were
each silently stripped for months the same way.

⚠ `netlify/import-questions.js` used to be a FIFTH copy and that cost 365
questions in production: six French files threw `makeCloze is not defined`, were
skipped with a warning in a summary nobody read, and the database held **0 `text`
and 0 `cloze` rows**. It now loads through `netlify/lib/questions-sandbox.js`, and
`scripts/test-question-import-parity.js` fails if it grows a factory or a
`vm.createContext` of its own.

---

## Grades, pricing, and `comingSoon`
- **Registered: grades 1–9.** Live: **4, 5, 6** plus three Grade 9 packs
  (**grade9-maths, grade9-ict, grade9-science**). Every other pack is a
  `comingSoon: true` placeholder (one manifest + one sample question).
- **Grades 1–2 are free forever; 3–9 are paid.** Permanent, and stated separately
  from the fact that **everything is free right now** while the app is built.
  ⚠ That second promise carries **no end date anywhere** (`FREE_UNTIL_LABEL`, the
  `data-free-until` spans and `_applyFreeUntilLabel()` were all removed). Do not
  reintroduce a deadline without changing every surface at once.
- **Grades 1–6 = PSAC; 7–9 = NCE.** `_gradeStage()` / `_PSAC_MAX_GRADE = 6` is the
  single definition. The 7–9 subject list is confirmed against the MIE NCF/TLS
  ([pending.md](docs/claude/pending.md) item 10) — but confirm which packs have real
  content before writing there.
- ⚠ **Coverage copy is "Grades 4–6, plus NCE Grade 9 Mathematics, ICT and
  Science"** — that, and only that, is what a child can actually practise
  (re-measured 2026-09-08, after Science shipped). ⚠ **Name the SUBJECT, never
  the grade**: Grade 9 registers six packs and three are still `comingSoon`,
  holding one sample question each. "Grade 9 is live" or "NCE is live" promises
  three subjects that open empty.
  The landing page, `_appShareText()` (app.js) and `_inviteText()` (auth.js) name
  the live Grade 9 subjects, each with a comment saying why, and have twice been
  changed **all three together** — to "and ICT", then "and Science" — because a
  share message and an invite that disagree with the landing page is how a parent
  arrives expecting something that is not there. ⚠ A WhatsApp message cannot be corrected
  once forwarded.
- ⚠ **Count what PROJECTS, not what is stored.** 833 of the practisable total
  comes from 667 grade9-maths `task` items via `Assessment.projectToItems()`; a
  raw task is in `_POOL_TYPES_EXCLUDED` and has no `question` field at all, so
  counting bundle rows advertises questions no child can ever be dealt. (Verified
  before publishing: all 19 chapters project to something; only 2 tasks —
  drawing/construction — yield nothing online, by design.)

### The `comingSoon` rule
> Anything that builds a list a **parent or child** sees filters `!p.comingSoon`.
> Anything an **admin authors with** does not. The two grade pickers show them on
> purpose, disabled, badged "Coming Soon".

Filtering: `Shop.sellableChapters/sellableSubjects`, `admin _allChapters/_allSubjects`
(⚠ these feed **Publish catalogue**, which is what `purchase_subject()` validates
against server-side), the plan chapter picker, `calendar _subjectsForGrade`,
`search _fillSubjectFilter`, `app _subjectChips`.
Not filtering, and must not start: `renderGradeSelect` / `renderSubjectSelect`,
the admin Content kill switch, the admin question-manager cascades.

### Grade dropdowns
`_populateGradeSelects()` fills anything with `data-grade-select`: `"live"` =
grades with a non-`comingSoon` pack (**parent-facing**: family setup, add child) ·
`"all"` = every registered grade (**authoring**: admin filters). ⚠ It runs twice —
the script tags sit mid-`<body>`, so `#modal-qm-form` is not parsed at first run;
`DOMContentLoaded` catches the rest.

---

## ⚠ Where each rule is ACTUALLY enforced
The client decides what to *draw*. The server decides what a child *receives*.
Never move an entitlement decision into the browser.

| Rule | Enforced in | NOT enforced by |
|---|---|---|
| Which questions a child gets (plan, kill switch, entitlements, expiry, blocks) | `netlify/functions/questions.js` (service role) | `_planAllowsChapter()` — UI only |
| Credits earned | `record_student_activity()` RPC (idempotent, reads `current_student_id()`) | anything client-side |
| Credits spent | `purchase_chapter()` / `purchase_subject()` (price + balance read server-side, row-locked) | the Buy button |
| Expired account | `questions.js` | `Auth.isAccessExpired()` — picks wording only |
| Forum identity (`author_name`/`author_type`) | `forum_set_author` BEFORE INSERT trigger | the browser (it no longer sends them) |
| Parent PIN, when it mints a session | `netlify/functions/parent-pin-signin.js` + `parent_pin_attempts` (service role) | `_pinMatches()` — a local convenience check |
| Parent's own `lockedChapters` | client only — **deliberate**: the parent is not the adversary, and per-child server filtering would make the question cache per-child |

Ordering that is the whole feature, in `questions.js`:
- **expired** ⇒ the allowed list becomes *exactly* the live entitlements, even on
  an unlimited plan and even with plan enforcement off.
- **not expired** ⇒ entitlements are *added* to the plan. Buying is never subtractive.
- Free grades bypass the plan list and expiry, but **not** moderation blocks or
  the admin kill switch.

⚠ `security_events` rows prefixed `client:` are **hints, not evidence** — a real
attacker does not call `flag_security_event()`. Never build enforcement on one. A
referral burst is flagged, never auto-blocked: a genuinely popular referrer looks
exactly like a farm for the first few hours.

---

## Data & storage → [`data-storage.md`](docs/claude/data-storage.md)
The progress blob (`DB` → `student_progress.data`), the save throttle, and the
owner-scoped 7-day question cache. Headlines:
- New `DB` keys go in `Store._defaultStudent()` — the key-merge backfills every
  existing child for free, and there is no new column-level GRANT to forget.
- ⚠ **Day keys are Mauritius days (`_muDayKey`), never the device clock.**
  Calendar squares are the one deliberate exception.
- ⚠ **`Store.saveStudentProgress()` is a throttle, not a debounce** — as a debounce
  it produced zero server writes during steady practice.
- ⚠ **The question-cache key carries the OWNER**, and a handover must call
  `QuestionLoader.useStudent(id)` — switching child never reloads the page.
- ⚠ **The cache is budgeted in BYTES, not slots**, with ~0.11 MB of headroom: the
  next large content addition pushes a grade out of its own offline cache.
- ⚠ **`_done` is rolled back when a load failed** — only "you get nothing" sticks.

## Auth & sessions → [`auth-sessions.md`](docs/claude/auth-sessions.md)
Two credentials, two worlds. **Adults** carry a Supabase JWT (`auth.uid()`);
**children** have no JWT — a PIN buys an opaque token, stored SHA-256-hashed in
`student_sessions` and sent as `x-student-token`, resolved by Postgres
`current_student_id()` and `netlify/lib/student-auth.js`. Headlines:
- ⚠ **It fails closed with no service key.** Treating a missing key as "skip"
  turned one config mistake into an open endpoint.
- ⚠ **`x-student-token` must never touch `/auth/v1/`** — it is not CORS-safelisted,
  so the parent's token refresh is preflighted, rejected, and their session dies
  silently about an hour later.
- ⚠ **The parent PIN is a real credential** (`profiles.parent_pin_hash`), but it may
  never reset or change a password, and **an admin can never be entered by PIN**.
  Every kind of "no" answers the same 401.
- ⚠ **A parent previewing a child is NOT a student login** — that path has no token
  and must not persist a session or claim the device.
- ⚠ **Email is one shared ~500/day Gmail quota**; every sign-up, resend and reset
  spends one.

## Database → [`database.md`](docs/claude/database.md)
**One generated file, `supabase-schema.sql`** — apply the change to the database,
then regenerate. Never hand-edit it, and never author a policy change from it:
query `pg_policies` on the live database first. Headlines:
- ⚠ **A policy's USING clause is checked on INSERT too**, whenever the statement
  carries a `RETURNING` — which PostgREST emits for every `.insert().select()`.
  Always keep a same-row column predicate in a USING clause you widen.
- ⚠ **`public.students` has COLUMN-LEVEL SELECT grants**: put a
  `GRANT SELECT (col)` beside every `ADD COLUMN`, or every query touching it fails
  `42501` and the client turns that into an empty result.
- ⚠ **Grant `TO anon, authenticated` for anything a child calls** — a child session
  is `anon` + a token header — and check `proacl`, not the migration text, after
  any `CREATE FUNCTION`.
- ⚠ **Deleting an account does not delete everything it owns**: five tables key
  their owner as `text` with no FK, so the cascade cannot see them.
- ⚠ **A `DELETE` whose policy matches no row returns no error and no rows** — use
  `.delete().select('id')` and treat zero rows as failure.

## UI, CSS and layout traps → [`ui-css.md`](docs/claude/ui-css.md)
Stacking and the sticky action bar · the Tailwind Play CDN cascade · screens,
dialogs and focus · the scratchpad · the interactive map. Headlines:
- ⚠ **Never add `transform`, `translate`, `filter` or `contain` to `.screen`,
  `main` or `body`, even as an animation** — a transformed ancestor becomes the
  containing block for every `position: fixed` descendant. Screen-transition
  keyframes are opacity-only for exactly this reason.
- ⚠ **`style.css` loads AFTER the Tailwind Play CDN**, so an equally-specific rule
  of yours wins — and the CDN only generates rules for classes present at its
  **initial scan**, so markup injected by `innerHTML` gets the class and no rule.
- ⚠ **A panel that is not INSIDE a `.screen` is never hidden by anything** —
  `showScreen()` toggles `.hidden` on `.screen` elements only. Ask the DOM, not
  the indentation.
- ⚠ **Module-level UI state must be reset in the RENDER, not in the toggle** —
  `_examReviewWrongOnly`, `_repShowAllMistakes`, `_shopOpen`, `_chapterFilter`,
  `_ttMonth`/`_ttView`, the contact form, the game-settings card, the scratchpad.
- ⚠ **No regex lookbehind anywhere** — `(?<=…)` is a *parse* error on Safari <16.4
  and takes the whole file down, not one feature.
- ⚠ **Line endings differ per file, and between the object store and the working
  tree** — measure the file you are about to edit and prefer line indexes to
  multi-line `\n` patterns, which match nothing in a CRLF file and report
  "anchor not found" as though the code had changed.
- ⚠ **Everything user-supplied goes through `_attr()` / escaping.**

## Caching, deploy and verification → [`deploy-and-verification.md`](docs/claude/deploy-and-verification.md)
Version bumps, what the service worker precaches, the bundled question images, the
staged CLI deploy, and the harness traps. Headlines:
- ⚠ **Read `SHELL_VERSION` and `_CACHE_VERSION` from `sw.js` and
  `question_loader.js`, never from a `.md`.** Bump the shell version for any
  shell-cached engine file, and **batch deploys** — each bump re-downloads the
  whole shell for every returning user.
- ✅ **Stage the publish directory first**: `node scripts/prepare-deploy.js`, then
  `netlify deploy --prod --dir=.deploy --functions=netlify/functions`. A CLI deploy
  uploads from local disk, so `.gitignore` excludes nothing — that is how `.env`
  and 651 KB question bundles reached the public site.
- ⚠ **The CDN keys on URL alone** — it does not vary on `Authorization` or
  `X-Student-Token`, so every error path in `questions.js` sends `no-store`.
- ⚠ **Production builds from `main`**, and an undeployed `/api/` route answers with
  the SPA fallback: HTML at status 404. **401 means deployed.** Probe it, never
  infer it.
- ⚠ **Measure, don't eyeball**: a CDP run must `Page.setBypassServiceWorker` **and**
  reload ignoring cache, or you measure the previous `style.css` and report a fix
  that never landed.

---

## Current state

### Content, measured 2026-09-08
**18 live packs, 210 chapters, 16,502 practisable questions**, plus 164 past-paper
items and the `comingSoon` placeholder packs. ⚠ **Measured by executing the
manifests and counting distinct ids in the BUILT bundles**
(`node netlify/build-questions.js`) — not by adding up numbers written here.
Re-measure rather than carrying these forward, and count what **projects**.

Per-pack (grades 4–6, measured the same way):
| pack | q | pack | q | pack | q |
|---|---|---|---|---|---|
| grade4-maths | 662 | grade5-maths | 1,419 | grade6-maths | 705 |
| grade4-english | 873 | grade5-english | 645 | grade6-english | 890 |
| grade4-french | 2,121 | grade5-french | 2,295 | grade6-french | 2,234 |
| grade4-history | 558 | grade5-history | 532 | grade6-history | 460 |
| grade4-science | 344 | grade5-science | 424 | grade6-science | 463 |

Grade 9: **grade9-maths 833 practisable items** (from 667 `task` rows via
`Assessment.projectToItems()`) and **grade9-ict 469**; both `comingSoon: false`.

The live `questions` table held **14,893 rows** at the 2026-09-08 import (14,729
practice + 164 past papers): `mcq 12,322 · numeric 2,024 · text 305 · cloze 60 ·
multi 12 · symmetry 6`, 0 protected, verified by read-after-write on every row.
⚠ **3 rows are in the database but not the corpus** and are not errors:
`g{7,8,9}h-samp-001`, left by the retired history placeholder packs — **the
importer never deletes**. ⚠ **No migration was needed and none was made**:
`questions.data` is `jsonb NOT NULL` with no type column and no CHECK constraint
(live schema read, not taken from the dump).

Also live: **Formation des Mots** (one ordinary chapter per French pack, 100
questions in five subsections of 20 — PSAC French **Q7**, 10 marks on every paper,
which the bank previously covered with three one-off items; ⚠ deliberately **not**
enrichment, because a gold BONUS card would tell a child a numbered exam question
is optional). Every live grade has enrichment chapters (History, Science), a Map
Skills SVG, Passages & Text Types and Description d'Images.
- Read-aloud speaks the **question only, not the options** (accepted). French packs
  speak `fr-FR` with a matching voice; voices are warmed at load because
  `getVoices()` is empty on the first tap, and `speak()` stays synchronous inside
  the gesture for iOS.

### Feature areas → [`features.md`](docs/claude/features.md)
The landing page and its copy rules · the Game Zone (seven games) and
parent-controlled Game Settings · Teacher Mode, the classroom command centre ·
the timetable, materials sorting, the contact form and WhatsApp sharing · and what
is child-facing versus parent-facing, deliberately. Headlines:
- ⚠ **Game answers NEVER call `recordAnswer()` / `_recordDaily()`** — a replay must
  not distort the mastery, mistake and daily reporting parents rely on.
- ⚠ **A score share carries a score and a challenge — never the child's name, id or
  any profile link**, and Ask the Crowd **never stores the correct answer**.
- ⚠ **PRICING IS HIDDEN, NOT DELETED**, and the "free right now" promise carries no
  end date on any surface. Do not reintroduce a deadline in one place.
- ⚠ **Every number on the landing page is measured and goes stale silently.**
- ⚠ **Report copy says "they"**, a chapter with no attempts is "not started" (never
  0%), and there is no "missed sessions" list on a child's screen.

---

## Pending / not yet done → [`pending.md`](docs/claude/pending.md)
16 numbered items. **There are no outstanding SQL migrations** — everything there
that touches the database is a *decision*, not a pending run, and each should be
re-checked against `pg_policies` / `pg_proc` / production before it is trusted.
The two that are not housekeeping:
- **0. ⚠⚠ A co-parent can take over a family.** `families_own`'s WITH CHECK lets a
  member write themselves in as `parent_id`. The one-line fix is written out,
  commented, at the end of `supabase-schema.sql`; `run-schema-tests.sh` fails on
  it today. A stranger cannot — the exposure is to an adult the owner invited.
- **1. ⚠⚠ The whole `netlify/` directory is publicly served until the next
  deploy.** `/netlify/question-bundles/*.json` answered 200 with real questions and
  their answers, bypassing every entitlement check. The `netlify.toml` 404 is
  written but **unverified**; after deploying, probe that path **and**
  `/.netlify/functions/questions` (which must still answer 401).

Also written but never shipped, so their behaviour in production is still the old
one: `parent-pin-signin.js`, and `notify.js` / `weekly-digest.js` — which,
measured, have **never sent a single email**.

---

## Coding rules (do not break these)
- **Vanilla JS only** — no React, no Vue, no frontend bundler.
- **No comments** unless the WHY is non-obvious.
- **Autonomous execution** — implement fully; don't ask for confirmation on
  obvious tasks.
- **Student-first UX** — any new UI must work cleanly on mobile.
- **L4 = word problems** in maths only; L4 means something different in each pack.
- **Alt text must never reveal the answer.**
- **Never remove `// @enrichment` guard comments.**
- **Measure, don't reason** — every ⚠ in this brief and its area files exists
  because something that looked
  obviously correct was not.

## How to continue
1. Read this file.
2. Open the area file for whatever you are about to touch — the routing table is
   at the top. The headlines here name a rule; the area file is where it lives.
3. Grep `ENGINEERING-NOTES.md` before re-investigating anything. Most surprising
   behaviour in this app has already been chased down once, and the full-length
   version of every rule is in there.
4. Immediate next steps are in [`pending.md`](docs/claude/pending.md).
