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
| **`CLAUDE.md`** (this file) | The working brief: rules, invariants, current state. Loaded every session — **keep it short**. One line per rule; the reasoning lives in the archive. |
| **`ENGINEERING-NOTES.md`** | The long-form archive (~400 KB): why each rule exists, how each bug was found, what was measured. **Grep it before re-investigating anything.** It ends with the full 167 KB CLAUDE.md as it stood on 2026-09-08, so every war story condensed out of here is still there verbatim. |
| `PROJECT_OVERVIEW.md`, `PLAN.md`, `ARCHITECTURE.md` | Older overviews. Historical. |
| `HOW_TO_RUN_LOCALLY.md`, `HOW_TO_PUBLISH.md`, `DB_IMPORT_GUIDE.md` | Operational. |

⚠ Nothing in any `.md` outranks the code or the live database. **Verify before
relying on a summary — this one included.** Version numbers and counts here go
stale within the hour; read the file, don't quote this one.

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
- Images: bundled under `assets/questions/` (see Deploy). Prefer inline SVG — it
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

### Past papers — 164 items, never gradable
Transcriptions (not PDF extractions) of real 2016–2024 PSAC questions. They push
to `window.PSAC_PDF_QUESTIONS`, ship in their own `past-papers.json`, and are
**never merged into `STATIC_QUESTIONS`**: none has an `answer`, and
`assignment-submit.js` grades through the sandbox. 63 carry `needsArtwork: true`
and are hidden. Read-only screen; `markScheme` powers an optional self-marking reveal.

### Dynamic generators
⚠ **A generator can only live in a `_manifest.js`.** In production question files
are fetched as JSON and never executed — only `file://` dev injects them.
`G5M_GENERATORS` (grade5-maths) is the only pack with any (12). Generated ids come
from `genId(prefix)`, never `Date.now()` alone — `getMixedQuestions()` de-dupes by
id and same-millisecond ids collapsed a whole run into one question.

### The two French exercise types (`cloze`, `errorhunt`)
Both are PSAC French Q6/Q7, both are ✨ BONUS chapters per live French pack, both
are **excluded from every pool by `isPoolQuestion()`** (`questions_engine.js`) —
`getStaticQs` feeds practice, subsection practice AND `assembleExamPaper`, and
dealt into any of them these draw a number pad under a French passage.
Both call `recordAnswer()` **once per gap / per error** (one gap = one mark)
passing the TEXT id, so `answeredIds` gives the list its ticks with no new
bookkeeping; unlike the minigames, these answers DO count toward mastery.
- **Textes à Trous** (`engine/cloze.js`, `g{4,5,6}fr-textes-trous`, 20 texts each,
  best score in `DB.cloze`).
  ⚠ **The three packs are not the same shape, because the papers are not.** G4/G5
  = one part, 10 gaps, 11 words, one deliberate spare. **G6 is two parts**: 6A is
  5 gaps with a bank of 6, then 6B is 5 more gaps of the SAME story with **no word
  list** — the child types. Grade 5 text 1 and Grade 6 texts 1–2 are real papers
  verbatim. G6 was first built to the G5 shape, so children in their exam year
  drilled 200 gaps that all handed the word over.
  ⚠ Q6 is grammar-in-context inside a **story**, not a vocabulary quiz (the real
  papers measure 55% grammar words; the first G6 set was 5.5%).
  ⚠ A part-B gap accepts a **list** (`gapAlts`) — failing a child for the better
  word is the one thing this must not do; a missing accent scores right and is
  flagged (a phone keyboard is a device problem, not a French mistake).
  ⚠ Every typed gap is the **same width** — sizing to the answer prints its length.
  ⚠ **Tap-to-place, not drag** (HTML5 drag never fires on touch); tapping a word
  fills the next empty gap, tapping a filled gap takes it back.
  ⚠ A passage printing a content answer in plain sight is **grandfathered, not
  accepted** (19 G4/G5 texts do it, and so does the real 2025 paper); the test
  asserts it only for the two-part pack.
- **Chasse aux Erreurs** (`engine/errorhunt.js`, `g{4,5,6}fr-chasse-erreurs`, 20
  texts each, 8/10/12 errors by grade, 600 in all; best score in `DB.hunt`). The
  child taps every wrong word; **Vérifier** answers with a COUNT only and
  **Terminer** reveals everything.
  ⚠ **Vérifier is capped at 3, and the screen says so** — a count you can ask for
  freely is an oracle. `test-error-hunt-interaction.js` asserts the markup is
  **byte-identical** either side of a check.
  ⚠ Errors are authored INLINE, `{faux>juste:regle}`, so an error can never drift
  from its word. Punctuation outside the braces rides onto both forms
  (`{cahier>cahiers:pl}.`), while `{cour>cour.:pt}` is a MISSING stop; anything
  else containing a brace **throws at build time**.
  ⚠ **Every word outside the braces must be correct French** — one left wrong by
  accident is an error a child can see, cannot score, and is TOLD is correct. The
  factory emits `correct` (the whole text put right) for harnesses to read.
  ⚠ The 44px tap rule is **deliberately bent here only** — every word is a button,
  and 44px words turn a 110-word passage into six phone screens; they are 40px
  with a `min-width` holding the short ones.
- ⚠ Shared by both: **a title must never contain the correction/answer of its own
  text** — it hands a free mark away on the list screen before the text is opened
  (28 cloze titles and 10 of the first 20 hunt titles did). ⚠ **A tap or keystroke
  must never call `renderPlayer()`** — it rebuilds the host's innerHTML and
  destroys the element under the finger/caret. Patch the counter line instead.
- Tests: `test-cloze-texts.js`, `test-cloze-interaction.js`,
  `test-error-hunt.js`, `test-error-hunt-interaction.js`. ⚠ In those harnesses
  measure a gap with **`offsetHeight`, not `getBoundingClientRect()`** — the pop
  animation's `scale(.82)` reports 29px for a 35.7px element.

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

### The importer (`netlify/import-questions.js`)
Full write-up in `DB_IMPORT_GUIDE.md`. What matters here:
- **`--check` (no credential, no network) · `--dry-run` (reads only) · no flag
  (upserts).** An unknown flag exits 2 — it must never fall through to a live import.
- **Two-phase and fail-closed.** The whole corpus is validated before Supabase is
  contacted, so a broken file anywhere means **zero** writes. An unknown question
  `type` fails preflight; it is never coerced to MCQ.
- ⚠ **A protected row can never rewrite local source as `makeMCQ`.** Only
  `mcq`/`numeric`/`text` are regenerable, and even then the candidate file is
  re-executed through the real loader and compared before it is written. Backups
  and the answer-carrying conflict report go to `.import-conflicts/` (gitignored
  **and** given a `netlify.toml` 404 — a CLI deploy ships gitignored files).
- ⚠ **A clean re-import is "0 new, ~560 updated", not zero writes** — `makeMCQ`
  keeps a random 3 distractors, so the items authored with more than 4 options
  change shape on every load. Churn, not drift.
- ⚠ **The importer never deletes.** Removing a question from `subjects/` does not
  remove it from the database.

---

## The landing page (`#screen-landing`, index.html)
The public front door, and the only screen most visitors ever see. Order: nav →
under-construction banner → hero → measured stats strip → **How we teach** →
subjects → what we offer → Game Zone → three ways in → free-while-we-build panel
→ 3 steps → tutors → footer.
- ⚠ **PRICING IS HIDDEN, NOT DELETED.** The three priced tiers at `#plans` were
  replaced by an "everything is free right now" panel; the nav Pricing link and
  `#pd-upgrade-btn` are gone/hidden. `modal-plans`, `Store.listPlans()`,
  `purchase_*()` and the admin Plans tab all still work — restoring it is markup.
  `#plans` is kept as the section id so old anchors still land somewhere sensible.
- ⚠ **"How we teach" is the product's actual claim**, not decoration: many simple
  questions covering the WHOLE syllabus beat a handful of very hard ones;
  difficulty rises Basic → Medium → Hard → Word Problems where harder means
  *applied*, never obscure. It is why the subsection split and the 4-level scale
  exist at all.
- ⚠ **Every number on this page is measured and goes stale silently.** The stats
  strip carries a comment saying how to re-count. (The page claimed "five learning
  games" in three places for two days after the seventh shipped.)
- ⚠ Under 640px every `[data-carousel]` grid becomes a horizontal scroll-snap
  track with dots — **an overflow detector that does not stop at a scrolling
  ancestor reports every card as protruding**; they are off-screen by design.
- ⚠ Contrast here was the worst in the app (footer disclaimer at 1.65:1). The
  colour is usually on an **ANCESTOR** (the `<footer>`, not the `<p>`), and every
  card is translucent white over a gradient with no opaque background anywhere —
  a naive probe reads `rgba(255,255,255,.05)` as the ground and reports 1:1.
  Composite the layers over each gradient stop and take the worst.
- Carousel dots are 16×44px via `padding` + `background-clip: content-box` (+
  explicit `box-sizing: content-box`, or Tailwind preflight eats the padding).

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
  (Pending 10) — but confirm which packs have real content before writing there.
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

## Data & storage

### The progress blob (`DB` → `student_progress.data`)
`stats` · `chapters[id].{attempted,correct,last}` · `examHistory` · `daily` ·
`mistakes` · `assignments` · `restrictions` · `dailyGoal` · `games` · `cloze` · `hunt`.
New keys go in `Store._defaultStudent()` so the key-merge in
`loadStudentProgress()` backfills every existing child for free — and so there is
**no new column-level GRANT to forget**.

| Key | Shape | Cap |
|---|---|---|
| `daily` | `{'YYYY-MM-DD': {a, c, e, s, g, ch:{id:[att,corr]}, asg:{…}}}` | `_DAILY_KEEP` 120 days, `_DAY_CH_KEEP` 12 chapters/day |
| `mistakes` | newest-first | `_MISTAKE_KEEP` 60 |

- ⚠ **Day keys are Mauritius days (`_muDayKey`), never the device clock** — a child
  changing timezone would rewrite their own history. `YYYY-MM-DD` is chosen so a
  lexicographic sort *is* chronological; the prune relies on it. **One deliberate
  exception**: calendar squares are keyed on the *local* date.
- **Attribution**: exam and assignment answers do **not** write `daily[].ch` (each
  already has a dated row of its own). Day totals `a`/`c` count every answer
  whatever the source, and chapter mastery still counts exam answers.
- **Skips are not mistakes.** Mistake text goes through `_plainText()` capped at
  160 chars — question text is `innerHTML` and can carry a whole inline SVG.
- `s` = **time on task, measured as the gap between consecutive answers capped at
  3 minutes** — never a wall-clock timer, which would report an hour of "study"
  for a tab left open. It under-reports on purpose; renders as "—", never "0m".
- `_recordDaily()` and `_checkDailyGoal()` run **before** the `ASSIGNMENT_MODE`
  early return in `recordAnswer()`, and that branch must `save()`.
- ⚠ `examHistory` rows carry **`iso`** as well as the legacy display `date` —
  `toLocaleDateString()` read back through `new Date()` is **Invalid Date** on
  every `en-GB` browser, i.e. exactly the devices this app targets. Legacy rows
  are shown as-is, never round-tripped, and get no calendar square.

### Saving
⚠ `Store.saveStudentProgress()` is a **throttle, not a debounce**
(`_pendingSince` + `_SAVE_MAX_WAIT_MS`). It used to reschedule on every answer, so
steady practice produced **zero** server writes and only exam submit ever got through.
- `clearStudentSession()` / `saveStudentSession()` **flush before** touching the
  stored session; `endStudentSession()` **awaits** the flush before the RPC (after
  it, `current_student_id()` is null and RLS refuses every write).
- `visibilitychange → hidden` and `pagehide` flush. Not `beforeunload` — it does
  not fire reliably on mobile.
- `loadStudentProgress()` **keeps the local cache when its `stats.totalAttempted`
  is higher than the server's** — total answers only ever go up, so a lower server
  row is a strict ancestor. `assignments` stay special-cased (parent-written).
- `_cancelPendingFlush()` genuinely means *discard*; nothing in the session path
  calls it.

### Question cache (`mm_qc_v<N>_<owner>|<subject>`, 7 days)
⚠ **The key carries the OWNER, and the owner is whoever authorised the fetch** — a
child's session id, or `adult`. It was the subject alone, on a device a whole
family shares, so the first child to open Maths cached the set the server had
filtered for *them* and the next child read it straight back.
- ⚠ **A handover must call `QuestionLoader.useStudent(id)`.** `STATIC_QUESTIONS`
  and `_done` are module state and **switching child never reloads the page**
  (`openStudentSwitch` and `pdSwitchStudent` are both in-page), so without it the
  next child inherits the pool outright and `_done` reports every subject already
  loaded. `reset()` truncates to the count captured at module load, so whatever
  the manifests pushed survives.
- ⚠ **The child's token beats the parent's JWT in `_buildAuthHeaders()`** — on a
  shared phone a parent JWT always exists, by design, and `_resolveOwner()` gives
  a JWT no `studentExpiresAt`, so that child's own expiry was never applied. A
  stored session belonging to a *different* child is ignored (the
  `pdSwitchStudent` preview case).
- ⚠ The purge tests `mm_qc_v`, **not** `mm_qc_` — `mm_qc_lru` shares the shorter
  prefix and was deleted on every page load, leaving eviction order arbitrary.
- ⚠ **BUDGETED IN BYTES, NOT SLOTS** (`_BYTE_BUDGET` ≈ 3.4 M characters, with
  `_LRU_MAX = 6` as a cheaper second guard — and six counts **slots, not
  subjects**, so two children on one device compete for the same six). Counting
  slots stopped being fine the moment one subject was five times another. Sized so
  **a child's own grade always fits whole**. ⚠ **Re-measured 2026-09-08: Grade 4
  2.78 MB, Grade 5 3.26 MB, Grade 6 3.29 MB against 3.40 MB** — 0.11 MB of
  headroom, down from 0.36. **The next content addition of this size pushes a
  grade out of its own cache**, and the symptom is a child losing a subject offline
  with nothing explaining it. Raising the budget trades against the 5 MB origin
  quota (Grade 6 already puts the origin at 4.19 MB). ⚠ There is nothing to strip:
  74% of a French bundle is question + explanation + hint + options — the teaching
  content. The fix had to be eviction, not compression.
- ⚠ **A size the index does not know is MEASURED, never assumed zero.** The
  recency index stores `{u, b}` (use counter, size) and reads an older bare number
  as `{u:n, b:0}`, filling `b` in from storage the first time a total is needed.
  Treating an unmeasured 1.4 MB entry as free space is how a budget stays in the
  code and stops doing anything.
- ⚠ **Recency is a monotonic counter, not `Date.now()`** — a grade's five subjects
  are written in the same millisecond and tie.
- ⚠ **`[]` is never written or read back as a hit.** An empty payload is a real
  answer (fully gated account); caching it handed a child an empty subject for a
  week with no recovery.
- On `QuotaExceededError` (incl. Safari's `NS_ERROR_DOM_QUOTA_REACHED`, codes
  22/1014): evict and retry ×3. A non-quota failure evicts nothing. Eviction only
  ever touches this cache's own `mm_qc_` keys — never the session (a silently
  failed write that lost a token read as *"it keeps logging me out"*).
- ⚠ **This is the ONLY offline copy of the questions** — the SW deliberately does
  not cache `/functions/questions` (that response varies per caller).
- Tests: `test-question-pool-isolation.js` (eviction order, legacy index, session
  token), `test-question-cache-budget.js` (drives the real `_writeCache` with the
  real built bundle sizes through a storage stub that enforces a 5 MB quota —
  rebuild the bundles first).

### `QuestionLoader.loadSubject()`
⚠ `_done` is rolled back when a load **failed**; only "the server says you get
nothing" stays `true`. Marking a failed load as done left a subject permanently
empty for the session. `startChapterDirect()` retries **once** then shows a real
message — an unbounded retry through resolved promises pegged the CPU at 20,000
iterations/second and killed the tab.

---

## Auth & sessions

### Two credentials, two worlds
- **Adults** (parent/teacher/admin): a Supabase JWT, `auth.uid()`.
- **Children**: no JWT. A PIN → an opaque session token, stored **SHA-256-hashed**
  in `student_sessions` with an expiry, sent as `x-student-token`, resolved by
  Postgres `current_student_id()` and `netlify/lib/student-auth.js`.

⚠ **Fails closed with no service key.** The old check treated a missing key as
"skip", turning one config mistake into an open endpoint. A fail-closed change
must be paired with a check that its dependency is configured in the target
environment — that omission took the whole app down on the first CLI deploy.
⚠ Missing / expired / revoked all answer the same 401. A student **UUID is not a
credential** — it is permanent client state; only the token proves possession.
The questions auth cache is keyed on the **token**, not the student id, so
revocation actually takes effect. A 503 is never cached.

### ⚠ `x-student-token` must never touch `/auth/v1/`
It is not CORS-safelisted, so it turns the parent's token refresh into a
preflighted request GoTrue rejects — the parent's session then dies silently about
an hour later. `_sbIsAuthRequest()` (engine/supabase.js) is a **deny-list on the
auth path**, not an allow-list on `/rest/v1/`; an unparseable target is auth.

### ⚠ Email is a scarce, shared resource
Custom SMTP on Gmail (`smtp.gmail.com:465`, user and `smtp_admin_email` both
`psacpractice@gmail.com`, a Google **App Password** — Google has refused account
passwords over SMTP since 2022). `mailer_autoconfirm` is **OFF**;
`rate_limit_email_sent` is 30.
⚠ **Gmail's own ceiling is ~500 recipients/day, account-wide**, and no Supabase
setting raises it — that is the real limit. ⚠ `smtp_port` must be sent to the
Management API as a **string**. ⚠ `smtp_admin_email` must BE the Gmail account —
Gmail rewrites `From` to the authenticated user.
- **Password recovery has two routes and only one needs email.** A signed-in
  parent changes their password in Account & Settings with no email at all. A
  signed-out parent needs the reset link — so `admin-account-recovery.js` also
  takes `action:'set_password'`: the server sets a temporary password through the
  service role and returns it **once** to the admin, who passes it on out of band.
  ⚠ The password is in the response and **nowhere else** — not the log line, not
  the `security_events` row. ⚠ An admin may not set a **peer admin's** password
  unless super admin — that would be a straight privilege grab between equals.
  Every use writes `security_events kind='admin:password_set'`.
- ⚠ **The parent PIN can NEVER be a password-reset credential**, and a PIN-minted
  session may not change the password either. Letting four digits REPLACE the
  password they stand in for is the one move that turns a shoulder-surfing child
  into an account takeover. `Auth.isPinOnlySession()` refuses it in **both**
  password forms (auth.js and app.js — two hand-written copies of one action).
- ⚠ **`emailSignUp()` routes off the RESULT, never a stored assumption about the
  project's email setting**: `signUp()` returns a live session when
  `mailer_autoconfirm` is on and none when it sends a link, so the branch is
  `if (data?.session)` → gated handler, else the check-email screen. Hard-coding
  either strands every new parent the day that setting is flipped.
- ⚠ **Every sign-up, resend and reset spends ONE email from ONE shared quota.**
  `_emailErrorText()` separates `over_request_rate_limit` (the 60s per-address
  floor, the caller's own doing) from `over_email_send_rate_limit` (the
  project-wide cap, which no retrying clears) and leaves anything unrecognised
  with its ORIGINAL wording — an invented friendly message over an unknown fault
  is how a real bug becomes unreportable. `scripts/test-email-errors.js`.

### Who owns the device
A shared phone holds both sessions at once. `_markActiveMode()` records who most
recently signed in **on purpose** (a student PIN login, landing on the parent
dashboard, `exitParentMode()`). ⚠ **Never on a restore**, or every reload
re-crowns the parent — which is exactly the bug that threw the child into the
parent dashboard on every cold start. With no record, a stored **student** session
wins.
- `_isParentSession()` = `!!Auth.getParentProfile()` and **wins over
  `ACTIVE_STUDENT_ID`** — a parent previewing a child has that child's `DB`
  loaded, which once showed the parent the child's profile, streak and level and
  wrote the parent's theme into the child's saved progress.
- `switchToStudentSelect()` clears `_parentProfile` (so the kid-only screen guard
  does not bounce the child) but **keeps `_parentUser`** (so `onAuthStateChange`
  does not re-fire mid-session). ⚠ `_parentProfile = null` happens only **after**
  the PIN is accepted — clearing it first strands a parent who mistypes. Success
  is a `_handovers` counter, not "`_parentProfile` went away".
- ⚠ Anything checking "is a parent signed in" must accept **live session +
  `_parentUser` set + `_parentProfile` cleared** — the state the app deliberately
  creates. Getting this wrong locked parents out of their own dashboard.

### The parent PIN — two copies, not equivalent
- `localStorage` `psac_parent_pin_v1` = `btoa(pin + ':psac_v1')`. **Still base64,
  not a hash** — `atob()` gives the PIN straight back. A local convenience check,
  never proof of anything; `_backfillDbPinFromLocal()` moves legacy PINs to the server.
- `profiles.parent_pin_hash` = SHA-256 of `pin + ':psac_v1_db'`. **This one is the
  credential.** `profiles_select` is `id = auth.uid() OR is_admin()`.
- ⚠ **The DB copy is unreachable from the browser in exactly the case it was added
  for** — reading `profiles` needs `auth.uid()`, which is what is missing when the
  session is dead. So a **local miss is not a verdict** (a cleared localStorage,
  another browser profile or a PIN set on a different device all left a CORRECT
  PIN failing against nothing): `_submitParentPin()` falls through to the server,
  and only a refusal from **there** shakes the pad. Offline is the exception —
  nothing to ask, so a miss stays a miss.
- All copy says **"in this browser"**, not "on this device" — localStorage is per
  origin + browser profile, so a preview URL, another browser, a private window or
  Safari's 7-day eviction all lose it. `openParentPinSetup()` (Account & Settings →
  Security) is the unguarded entry; `_promptSetParentPin()` keeps its once-only
  first-run guard.

### Server-side PIN sign-in — `netlify/functions/parent-pin-signin.js`
`POST /api/parent-pin-signin {user_id, pin}` → service role verifies against
`profiles.parent_pin_hash`, mints a session with
`admin.generateLink({type:'magiclink'})` → `verifyOtp({token_hash})`, returns
**only** `access_token` + `refresh_token`; the browser installs it with `setSession()`.
- ⚠ **`generateLink` GENERATES; it does not send.** Load-bearing, given the email
  quota. **Re-verify after deploy.**
- ⚠ **Every kind of "no" answers the SAME 401 `invalid`** — no profile, no PIN on
  file, disabled, closed, an admin, a wrong PIN, a malformed id. Any difference is
  an account-enumeration oracle; the branches exist only for the server log.
- ⚠ **An admin can never be entered by PIN.** Four digits in front of `is_admin()`
  is not a trade this project makes.
- ⚠ **The lockout is the only thing between 10,000 guesses and a parent account.**
  5 wrong → a lockout, **each twice the last** (15m, 30m, 1h, 2h … capped at 24h),
  counted in `parent_pin_attempts`, which has **no grant to anon or authenticated
  at all**. Deliberately NOT a column on `profiles`: `profiles_update` lets a
  parent update their own row with no column restriction, so a counter there could
  be zeroed by the very session an attacker is trying to obtain. A per-IP burst
  cap sits in front, best-effort (module scope, one Lambda container).
- ⚠ A mint failure is **503, never 401** — telling a parent their correct PIN was
  wrong is how an evening is spent retyping four right digits.
- ⚠ The salt `:psac_v1_db` is **hand-copied** into `engine/auth.js`
  (`_hashPinForDb`); drift means a stored PIN silently stops matching with no
  error anywhere. The test asserts both literals.
- ⚠ `psac_parent_uid_v1` is a **separate** localStorage key from the session stash
  and is never cleared with it — the stash holds a refresh token that can
  legitimately die; this holds only WHICH parent this browser belongs to, which
  stays true afterwards. It is not a credential.
- Tests: `test-parent-pin-signin.js`, `test-parent-pin-recovery.js`.

⚠ **A correct PIN must never dead-end on "your sign-in expired".** The PIN cannot
mint a session, but a **refresh token** can — and supabase-js deletes its own
persisted one the first time a refresh fails (a tunnel, a sleeping phone), which
is indistinguishable from a revoked session. `_ensureParentSession()` escalates:
read → re-read (still restoring) → `refreshSession()` →
**`refreshSession({refresh_token})` from our own copy** in `psac_parent_sess_v1`
→ the server (`_pinServerSignIn`).
- ⚠ Step 4 runs **only last and only once** — replaying a rotated-out token can
  revoke the whole family server-side. The stash is rewritten on every auth event,
  because rotation makes a stale copy worse than none.
- ⚠ **Only a refusal drops the stash.** Dropping it on ANY failure meant one 502 or
  one captive portal disarmed the recovery permanently. `_isTokenRefusal()` calls
  400/401/403 a verdict, 5xx/429/408 the network, and falls back to the message.
  Erring towards KEEPING it is the safe direction: replaying a dead token costs one
  refused request; dropping a live one costs the parent their account on this device.
- ⚠ The stash is cleared **only on a deliberate sign-out**, never in the
  `SIGNED_OUT` handler — supabase-js emits that for a dropped refresh too, which is
  the exact case being recovered from.
- ⚠ A successful re-mint **emits `SIGNED_IN`**, so `_suppressAuthEvents` keeps
  `onAuthStateChange` out of the routing the caller is awaiting. Scoped to **that
  arm only** — `SIGNED_OUT` is always honoured.
- ⚠ **Offline is not "signed out"** — the ladder stops at the first read and the
  copy says so; the token may be good and merely unverifiable.
- ⚠ **`session-invalid` is not always the CHILD's session** — `_activeAccount` is
  set for a parent previewing a child, whose writes go through the parent's JWT.
  That path renews the parent in place and says nothing rather than dropping the
  child onto the PIN screen; `_parentProfile` is the discriminator.
- `init()` consults the stash, gated on it existing so a first-time visitor makes
  no network call — otherwise the same lapse logged a parent out on a plain reload.

### Other session rules
- Every fresh student PIN login bumps `session_version`; a 5-minute guard logs out
  a mismatch ("account accessed on another device"). `pdSwitchStudent` passes
  `bumpSession: false`.
- One-tap child login links: `?join=<token>`, 32 random bytes, **single use**,
  48 h, **SHA-256 stored only**, and **never carrying the PIN** (a PIN never
  expires, so a forwarded screenshot would be a permanent key). `_tryJoinLink()`
  runs before every routing decision and signs out any parent session first.
- `psac_known_students` (cap 8) remembers family name + username per child.
  ⚠ **Never the PIN.** Fields are *hidden, not emptied* — `checkStudentReady()` /
  `studentSignIn()` still read them.
- ⚠ **A parent previewing a child is NOT a student login.** `pdSwitchStudent()`
  reaches `_loginStudentRow()` with **no token**; that path must not persist a
  student session or stamp `_markActiveMode('student')` — a tokenless session is a
  credential nobody can use, and the next reload answered "Please sign in again to
  continue." on **every** refresh. Routing reads a tokenless stored session as
  **absent** (`_storedStudentSession()`), which also heals poisoned installs.
- The student-switch PIN pad holds **no auth logic** — same three fields, same
  `studentSignIn()`. ⚠ `_showAuthError()` is routed into the modal while it is
  open, or the wrong-PIN message is written to a screen nobody can see.
- Referrals: `?ref=CODE` captured before routing. `referral_code` (public, for
  WhatsApp) is deliberately **not** `families.family_code` (private join secret).
- ⚠ **Forum ownership is `author_id`, never the display NAME.** `canDel` compared
  names, which gave two same-named parents a delete button on each other's posts
  (the database refused, so the button was a lie) and gave an **admin** none —
  while `posts_delete`/`replies_delete` have allowed `is_admin()` all along. Being
  an admin is a property of the ACCOUNT, not of which screen they are on, so
  `Auth.isAdmin()` applies in the ordinary parent view too. ⚠ 41 of 42 live forum
  rows have `author_id = NULL` (written before the trigger), so `is_admin()` is
  the only way they can ever be removed.
- **The forum is adults-only in the database** (`auth.uid() IS NOT NULL`), not by
  hiding the button. A child session is anon and is excluded by construction;
  `_ADULT_ONLY_SCREENS` in `showScreen()` covers every route in.

---

## Database

### One file: `supabase-schema.sql`
**There is exactly one .sql file at the repo root, and it is generated, not
written.** 31 incremental migrations were consolidated into it on 2026-09-06 (24
more on 2026-08-26, with 31 accumulating in the eleven days after). **Expect the
same drift, and regenerate rather than adding a file.**

| Thing | Where |
|---|---|
| The schema | `supabase-schema.sql` — 48 tables · 144 constraints · 121 indexes · 105 functions · 10 triggers · 77 policies · 1,093 grants |
| Regenerate | `SUPABASE_ACCESS_TOKEN=sbp_… node scripts/dump-schema.js` |
| Test | `scripts/sql-tests/run-schema-tests.sh` |

⚠ **Do not hand-edit it.** Apply the change to the database, then regenerate. Its
whole value is that it says what is *deployed*, not what someone intended — the
difference that has cost this project the most time. `scripts/dump-schema.js`
carries the traps that make the dump correct (the `NOTNULL` postfix-operator
alias that silently deleted every NOT NULL, constraint ordering by kind, deferred
defaults found via `pg_depend`, `check_function_bodies`, the pinned
`search_path`) — read its header before changing it.
- ⚠ **The file is a snapshot, not a diff.** It drops nothing, but it *overwrites*
  function, policy and trigger bodies with the ones recorded in it. **Regenerate
  before re-running it, or you roll a later fix backwards.**
- ⚠ **Applying it to production is no longer a pure no-op** — §12 backfills an
  owner row per family and production is missing 9 of them.
- ⚠ **The live database cannot tell you whether the file works.** Applying it to
  production only proves it is idempotent against a database that already has
  everything; both ordering bugs it has had (an FK before its target's PK, a
  column default calling a function not yet created) were invisible until it was
  built **from nothing**. That is what step 1 of `run-schema-tests.sh` does.
- Two blocks at the end need a human decision: **`families_name_unique_ci`**
  (self-skipping — see Pending 6) and the commented-out **`families_own` fix**
  (Pending 0).

### ⚠ Four rules that have each cost real damage
1. **Never author a policy change from `supabase-schema.sql`** — it is stale.
   Query `pg_policies` on the live database first; writing against the dump once
   produced a policy that would have silently un-restricted the forum.
2. ⚠ **A policy's USING clause is checked on INSERT too — whenever the statement
   carries a `RETURNING`**, which PostgREST emits for every `.insert().select()`.
   A USING predicate that has to **look the row up** answers false for a row being
   created in that same statement (it is `STABLE`; the new tuple is not in its
   snapshot). This broke family creation outright for two days while every
   existing family still read back fine. ⚠ **The 42501 names the wrong half** —
   "new row violates row-level security policy" reads as a WITH CHECK failure, and
   the WITH CHECK was passing throughout. Tell them apart by running both forms as
   `authenticated` in a rolled-back transaction (plain `INSERT` succeeded,
   `INSERT … RETURNING` did not). **Always keep a same-row column predicate in a
   USING clause you widen.**
3. **`public.students` has COLUMN-LEVEL SELECT grants** (so `pin`, `pin_hash`,
   `pin_attempts`, `pin_locked_until` stay unreadable). **Any new column inherits
   no grant**: every query touching it fails `42501 permission denied for table
   students`, a message that never names the column, and the client turns that
   into an empty result. Put a `GRANT SELECT (col)` beside every `ADD COLUMN`.
   (This is how adding `deleted_at` emptied the parent dashboard.)
4. **Grant `TO anon, authenticated` for anything a child calls** — a child session
   is `anon` + a token header; the friend RPCs were `authenticated`-only and dead.
   Check every function in a `revoke … from public` block actually has a matching
   grant. ⚠ And a newly created function inherits Supabase's default privileges
   **including `anon`**; `REVOKE … FROM PUBLIC` does **not** remove that — it only
   drops the `=X` PUBLIC entry. Check `proacl`, not the migration text, after any
   `CREATE FUNCTION`.

### Other database facts worth keeping
- ⚠ **`public.profiles` has NO email column** — the address is in `auth.users`,
  which the browser cannot read and should not, so the admin members list could
  only identify an account by a self-typed display name.
  `admin-member-emails.js` resolves them through the service role: **only for the
  ids asked for, only for an admin**, no list/search/page, so it cannot enumerate
  the user base. Failures leave the line blank rather than toasting every render.
- **Admin › Teachers shows what each teacher has DONE.** `admin-teacher-activity.js`
  (service role, `requireAdmin`, ids only, capped at 30) folds ten teacher-owned
  tables plus `auth.users.last_sign_in_at` via `netlify/lib/teacher-activity.js`
  into one summary per id. ⚠ A table that cannot be read is NAMED in `partial` and
  shown as unknown, never as 0.
- ⚠ **Deleting an account does NOT delete everything it owns.** `auth.users`
  cascades cleanly down `profiles → families → students → …`, but **five tables
  key their owner as `text` with no foreign key** and every row survives:
  `student_progress`, `schedule_entries`, `study_schedules`,
  `student_assignments`, `login_events` (production already carries one orphan).
  `admin-delete-account.js` purges them explicitly and **collects the student ids
  BEFORE the cascade** — afterwards there is no way to know which rows were whose.
  ⚠ `security_events` is deliberately NOT purged — its ids carry no FK precisely
  so the audit trail outlives its subject.
  ⚠ Admin delete is **permanent**; `Store.deleteMyAccount()` is the soft one
  (`profiles.deleted_at`, `auth.users` kept so a parent can restore). Keep Disable
  as the reversible option in the UI.
- A `DELETE` whose RLS policy matches no row returns **no error and no rows**. Use
  `.delete().select('id')` and treat zero rows as failure — reading that as
  success is how a deleted child came back and became a duplicate.
- Soft delete everywhere: `profiles.deleted_at`, `students.deleted_at`, partial
  unique index `students_live_username_key … WHERE deleted_at IS NULL`. The
  `auth.users` row is **deliberately kept** so restore works and re-signup lands
  on "you already have an account".
- ⚠ Fall back to an older column list **only** on a genuine missing-column error
  (42703 / PGRST204). Falling back on *any* error once dropped the
  `deleted_at IS NULL` filter and resurrected deleted children.
- Privileged columns (`role`, `is_super_admin`, `disabled`, `expires_at`,
  `referral_code`, `credits`, `blocked_until`, `students.expires_at`) are protected
  by BEFORE UPDATE triggers, because `profiles_update` allows a parent to update
  their own row with **no column restriction** — a one-line PostgREST call used to
  grant `role: 'admin'`. Deliberately unguarded, each for a reason:
  `teacher_status`/`teacher_tier` (a non-admin applicant writes them, and `role`
  is guarded anyway), `session_version` (anon `verify_student_pin` bumps it),
  `profiles.deleted_at` (the owner's own).
- `credit_ledger`, `chapter_entitlements` and `security_events` have **no
  insert/update/delete grant at all** — stronger than a policy, because a later
  policy mistake cannot open a hole with no grant behind it.
- ⚠ **Family setup is a three-step wizard with no transaction** (profile, family,
  first child). `createProfile()` and `createFamily()` **resume on 23505** rather
  than failing: the profile PK can only be the caller's own row and
  `families.parent_id` is UNIQUE, so "you already have one" is probed via
  `getMyFamily()` and never confused with the family-NAME collision that shares
  the SQLSTATE. Both return `{_error:{code,message}}` — a bare null hid a `42501`.
  A **profile with no family is that interrupted setup**, and
  `_handleParentSession()` routes it back to family-setup — but only when
  `Store.lastFamilyError()` is empty (the query *answered* "none") and only for
  `role === 'parent'`: routing a failed READ there would write a second family
  over one that exists, an admin legitimately has no family, and a co-parent's
  arrives via `my_member_family()`. `scripts/test-setup-recovery.js`.
- ⚠ **A child cannot read `families`** — all three arms of `families_own` need
  `auth.uid()`, so the plan read returned nothing and plan limits had never once
  been applied. Plan features come from **`student_plan_features()`** instead:
  SECURITY DEFINER, returns `{ok, plan_id, features}` and nothing else. ⚠ **The
  obvious fix was the wrong one** — adding a child arm to the policy would let a
  child SELECT **`family_code`, the private join secret**, on the least trusted
  device in the family, and widening a USING clause is what broke family creation
  (rule 2). `p_student` is optional: a child omits it (the token answers), a
  parent previewing a child passes it; asking about another family's child is
  `not_authorized`. Granted to **anon AND authenticated**.
- `Store.getMyEntitlements()` / `getFamilyEntitlements()` return **null** on
  failure, never `[]` — `[]` is a real answer ("owns nothing") and conflating them
  made a flaky network silently re-lock chapters.
- Queries that gate login must never reference a column an un-migrated database
  might lack — hence `getMyPreferences()`, `getAccountDeletedAt()` and
  `referral_code` are fetched **separately** from `getProfile()`.
- Read a family's children in **one** query (`student_id=in.(…)`), and mark every
  requested id fetched hit *or* miss so a child who has never practised is not
  re-queried on every expand.

---

## UI, CSS and layout traps

### Stacking, positioning and the action bar
- ⚠ **Never add `transform`, `translate`, `filter` or `contain` to `.screen`,
  `main` or `body`, even as an animation.** A transformed ancestor becomes the
  containing block for every `position: fixed` descendant — this is what put the
  practice Check/Next bar off-screen. Screen-transition keyframes are opacity-only
  for this reason. If a fixed bar is reported clipped, walk its ancestors'
  computed styles before touching the bar.
- ⚠ **The practice Check/Next bar (`.pr-actions`) is `position: sticky`, not
  `fixed`.** Fixed pinned it to the viewport bottom however short the question was
  (measured 449px of empty gap at 1920×1080, 809px at 2560×1440) — invisible on a
  phone, present in every desktop browser. Sticky gives both from one rule: in
  flow when the page does not scroll, pinned when it does.
  - ⚠ `margin-inline: -1rem` cancels `<main class="px-4">` so the bar stays
    edge-to-edge on a phone; removing it makes the bar read as a card, not a toolbar.
  - ⚠ **`.pr-wrap` must NOT carry a `padding-bottom` reserve** any more — with a
    sticky bar that takes its own space in flow, the old 5.5rem becomes a hole.
  - ⚠ Sticky's dependency differs from fixed's: it breaks inside an ancestor with
    `overflow` hidden/auto, not a transformed one. `body` carries `overflow-x:
    clip` (behind `@supports`), which leaves `overflow-y` visible and creates no
    scroll container — that is why `clip` was chosen over `hidden`, and the sticky
    header relies on it too. `body { overflow: hidden }` would kill both.
- ⚠ **MCQ options pair into two columns only when the option TEXT is short**
  (`.pr-answers-pair`, added by `renderAnswerArea()`, CSS at ≥ 700px). `.mcq-opt`
  is `width: 100%`, so on desktop four numeric options were four 736px bars each
  holding two characters. The test is on the content, not the viewport: a French
  comprehension option is a whole sentence. The class is cleared at the top of the
  render, per the module-state rule — every other type returns early.
- `scripts/test-practice-action-bar.js` guards both. ⚠ Two harness traps: poll for
  `typeof renderAnswerArea === 'function'`, **not** for `.pr-actions` (which is in
  `index.html` from the first byte and so races `app.js`); and read every
  measurement into a plain number **before** re-rendering, because a detached node
  reports 0×0 and that reads as a collapsed layout rather than a late question.

### Cascade and the Tailwind CDN
- ⚠ **`style.css` loads AFTER the Tailwind Play CDN**, so an equally-specific rule
  of yours wins — and a bare `display:flex` outranks `.hidden` (hence
  `.pd-action.hidden { display: none }`, and `.kid-hero`'s own gradient).
- ⚠ **The Play CDN only generates rules for classes present at its initial scan.**
  Markup injected by `innerHTML` later gets the class and no rule. Use inline
  styles there, and **measure the width** — asserting the class passes either way.
- ⚠ **An `<option>` is painted by the PLATFORM.** It inherits the select's `color`
  and **never** its `background`, which computes to `rgba(0,0,0,0)` unless
  something sets it — so `bg-white/10 text-white` rendered white on white, and all
  31 selects carried the same latent defect. `style.css` now gives
  `option`/`optgroup` an explicit opaque pair per theme, plus `color-scheme`
  **scoped to `select`** (on `:root` it repaints every native control in the app).
  `scripts/test-select-contrast.js` measures all 31 in both themes.
- ⚠ **Do not share a class name between two components.** `.nav-btn` was both the
  exam navigator cell (32×32) and the student tab bar, so tab labels spilled out
  of their buttons on every phone. The tab bar is `.tabbar-btn`.

### Screens, dialogs and layout
- ⚠ **A panel that is not INSIDE a `.screen` is never hidden by anything.**
  `showScreen()` toggles `.hidden` on `.screen` elements only. Two live cases,
  both fixed: `#admin-tab-questions` had escaped `#screen-admin` by one `</div>`
  (it read as *"the Parent button does nothing"* and cost a long hunt through
  `enterParentMode()`); and `#tc-classroom-detail` is a deliberate full-page
  overlay `showScreen()` had never heard of — it now hides it but does **not**
  call `TeacherClassroomDetail.close()` (that would clear the remembered classroom
  `psac_teacher_loc_v1` exists to restore) and skips `id === 'teacher'`.
  ⚠ **Ask the DOM, not the indentation** — the file was tidy and nine panels were
  fine. `scripts/check.js` → `checkScreenNesting()` fails any `.admin-tab-panel`
  outside `#screen-admin`.
- **`showScreen()` scrolls to the top and focuses the screen's first heading**
  (`_focusScreen`, only when the id changed) — before this a child arriving from a
  long chapter grid landed mid-page and a screen reader stayed on a button that no
  longer existed. It runs synchronously, so a caller that focuses its own field
  straight after still wins.
- **Every `#modal-*` overlay gets the dialog contract from `_Dialogs`** (app.js, a
  MutationObserver on the `hidden` class): `role="dialog"`, `aria-modal`, labelled
  by its first heading, focus moved in, Tab trapped, **Escape closes through the
  modal's OWN close control** so its cleanup runs, focus returned to the opener.
  New modals need nothing — keep the `modal-` id prefix and the `fixed inset-0`
  wrapper. (`modal-round-complete` has no close control by design.)
- **`_labelUnlabelledFields()`** names any control with no label from its
  placeholder, title or the short element before it. It is a fallback — write a
  real `aria-label` / `<label for>`.
- **The student tab bar is OFF on the practice screen** (`'practice'` is not in
  `_BOTTOM_NAV_SCREENS`) — two stacked fixed bars covered 155px of a 740px phone
  (2 of 4 options visible on first paint).
  `_scrollPracticeFeedbackIntoView()` measures against the bar; `'nearest'` only
  cleared the viewport.
- **Chapter cards inside the chalkboard subject hub keep their own ink** — the
  board's `h3`/`p` chalk overrides painted card titles cream on white (1.2:1);
  `.ch-card` rules under the override block reset it.
- **`.pd-switch` is the promoted "Switch to student mode" bar**, above the
  `.pd-action` row rather than inside it — handing the device over is the most
  frequent thing a parent does and the one they could not find.
  ⚠ Promote by **altitude, not colour**: a louder tile inside the row would break
  the single shape language that row exists to have.
  ⚠ **The two mode switches are ONE control in two directions and must paint
  identically** — all three (`.student-parent-switch` on dashboard and
  subject-select, `#pd-student-view-btn` on `#screen-parent`) are `.pd-switch` and
  are deliberately left OUT of their screen's chalkboard repaint; muting the
  parent-side gradient made it read as a panel rather than the button its twin is.
  ⚠ `test-switch-mode-button.js` hard-codes the gradient stops `[79,70,229]` and
  `[124,58,237]` for its contrast maths — it was once measuring a colour that was
  not on screen. Keep those two numbers in step with `.pd-switch`.
  ⚠ The ids stay `pd-student-view-*` and the flag stays
  `psac_student_view_guide_seen` — renaming it re-shows the nudge to every parent.
- Header: below 1100px everything collapses into one labelled **`☰ Menu`**. ⚠ The
  sheet rows are **built from the live header buttons** (`_buildHeaderMenu()`),
  never hard-coded — which controls exist is decided in half a dozen places.
  Icon-only was tried and rejected. **Logout keeps a labelled twin**
  (`#header-logout-mobile`) and never hides in the menu (`_MENU_EXCLUDED`).
- Fixed-width grids (`.fam-head` / `.fam-row`) share explicit rem columns because
  two grids with `auto` columns cannot align. ⚠ Header labels must stay short — a
  fixed column overflows rather than widening — and an inline `display:flex` on a
  cell silently beats the mobile `display:none`.
- `.pd-tabbar` is `flex-wrap: wrap` with **`flex: 1 0 auto`**; `flex-shrink` must
  stay `0`. A horizontal scroller measured worse — it hid 2 of 5 tabs.
- A centred flex child taller than the viewport gets its top clipped with no way
  to reach it — long modals need `overflow-y: auto` + `my-auto`.
- iOS: any form control under 16px zooms the page in and never back out — a
  `@media (pointer: coarse)` rule raises `.text-sm`/`.text-xs` controls.
  `backdrop-filter` and `user-select` need `-webkit-` twins.
- **Focus ring is theme-neutral** (`:focus-visible` on buttons/links, two-tone,
  both themes; the old rule was light-mode only while dark is the default).
- ⚠ **No regex lookbehind anywhere.** `(?<=…)` is a *parse* error on Safari <16.4
  and would take the whole file down, not one feature (`_syllabusPoints` uses
  `.match(/[^.!?]+[.!?]*/g)` for exactly this reason).
- ⚠ **Line endings differ per file AND between the object store and the working
  tree** — autocrlf converts on checkout, so `git show HEAD:file` is not what is
  on disk. **Measure the file you are about to edit**, preserve what you find, and
  prefer editing by line index over multi-line string patterns: a `\n` pattern
  matches nothing in a CRLF file and reports "anchor not found" as though the code
  had changed. Normalise in memory, restore the file's own convention on write,
  and in `index.html` detect the convention **per anchor**.
- Everything user-supplied goes through `_attr()` / escaping — mistake rows, child
  display names and the digest email all carry typed input.

### ⚠ Module-level UI state must be reset in the RENDER, not in the toggle
Otherwise the next child's panel, the next exam's results or the next subject's
grid opens in the last one's state: `_examReviewWrongOnly` (in `renderResults`) ·
`_repShowAllMistakes` (in `_renderReports`) · `_shopOpen` + the search box (in
`renderShop`) · `_chapterFilter` (in `activateSubjectPack` — declared **above**
that function, or the reference hits the temporal dead zone) · the round-review
collapsed state · `_ttMonth`/`_ttView` (in `renderSchedule`) · the contact form
(`_resetContactForm` from `showScreen('contact')`) · the game-settings card state.

### The rough-working pad clears per SESSION, not per screen
`#scratchpad-practice` / `#scratchpad-exam` live in `index.html` and are never
rebuilt, so a child's drawing used to stay on the canvas for the rest of the
visit. `_resetScratchpadForSession()` blanks them from the two screen observers.
- ⚠ **Keyed on the SESSION OBJECT's identity** (`S.practice.session`, `S.exam.qs`),
  never on the screen becoming visible (that wipes the pad on any return) and
  never per question (that wipes it mid-working, the one moment it is needed).
  All five practice starts and both exam starts assign a fresh object literal
  immediately before `showScreen`, so a sixth entry point gets it for free.
- ⚠ **A reset must restore the placeholder AND re-arm its one-shot listener** —
  that `pointerdown … {once:true}` handler has already fired, so redrawing the
  prompt without re-adding it prints it under everything the child writes. The
  stroke still lands, so a pixel count does not notice; assert the prompt state.
- ⚠ Clear whenever a 2d context exists, **visible or not** — `clearRect` works on
  a hidden canvas.
- `scripts/test-scratchpad-session.js`.

### The interactive map — one module, two surfaces
`engine/interactive_map.js` renders both the child's map (`GeoMap.render`) and the
admin editor (`GeoMap.renderEditor`) from one catalogue, one projection and one set
of marker markup. **Keep it that way** — every bug it has had came from the two
surfaces disagreeing.
- ⚠ **The box's `aspect-ratio` is defined in `ISLANDS` in the JS, not in CSS**, and
  is each base image's own ratio. `object-fit: contain` then fills the box exactly,
  so a percentage of the box is a percentage of the artwork on both surfaces. A
  second copy in `style.css` is how they drift.
- **Catalogue: 88 Mauritius · 25 Rodrigues · 20 world**, every pin a real
  OpenStreetMap coordinate. ⚠ **Do not nudge a pin to make a label fit** — move
  the label (`lx`/`ly`), which lives **on the feature**, not in a positional array
  indexed by `indexOf`.
- ⚠ **A river is a LINE, not a point.** Fifteen carry `line: [[lon,lat],…]` plus
  `labelAt` (0–1); `markerPosition()` walks the course by **distance**. ⚠ Dragging
  a river's pin writes `labelAt` (slides the name along it), never coordinates —
  the course is surveyed data; dragging a course point reshapes it, and handles
  appear only on the SELECTED river. ⚠ **Two Mauritian rivers can share a name**,
  so `build-rivers2.js` picks a chain by a `near` point and **throws over 12 km**.
- ⚠ **Each island has its OWN projection** (`PROJECTIONS`), picked by island, never
  by "this row happens to have a lon". **The world map is Robinson** (fitted, y rms
  0.58px vs 3.0 plate carrée): **Equator at 52.33% of the height, Prime Meridian at
  47.54% of the width** — not 50/50. ⚠ **The graticule is drawn FROM the
  projection**, not from evenly spaced CSS gradients.
- ⚠ **Markers and districts project through `MAURITIUS_BOUNDS` only**, and the
  district `<svg>` is `viewBox="0 0 100 100" preserveAspectRatio="none"` — deriving
  its own bbox letterboxed the districts and put every coastal pin ~15px off.
- ⚠ **A drag never repaints the canvas** — that destroys the button the pointer is
  on, so pointerup lands nowhere and the *next* drag moves two features.
- ⚠ **Filter chips are island-aware** (`typesOn()`); above `LABEL_LIMIT` (15)
  visible pins the layer goes `.labels-quiet`. **Label offsets are therefore solved
  PER CATEGORY** — a filtered view is the only time a group's captions share a screen.
- Editor edits are a **draft** (`psac-geo-map-draft-v2`); **Publish** writes a
  *diff against the built-in catalogue* to `mm_data.geo_map_content` and a built-in
  is `hidden`, never deleted. It goes through `Store.mmSave` (awaited), not
  `Store.mmSet` (fire-and-forget), which claimed success on a refused upsert.
- ⚠ **A feature outside its island's bounds is silently clamped to the edge**, so
  it reads as a coastal feature rather than the error it is.
- ⚠ **Land is a different colour on every base map** — `#fefefe` is the SEA on
  Mauritius (a bay or lagoon islet legitimately samples it); the world sea is
  transparent, land `#cccccc`, Antarctica its own `#ffffff`. ⚠ **A pin "outside
  every district" is not an error on its own** — the polygons are generalised.
- Harnesses (headless Chrome, local static server, under `/scripts/`, which 404s
  on Netlify): `map-editor-harness.html` (editor ↔ child correspondence) ·
  `map-calibration.html` (every pin on the right ground, every river along its
  whole course, 47 known world coordinates) · `map-label-solver.html` (**re-run
  after adding or renaming a feature** — offsets are absolute px) ·
  `map-world-fit.html` (re-derives the world projection).

### Feature-specific UI notes
- **My Timetable** — `#screen-schedule` has a list ⇄ calendar toggle
  (`setTimetableView`, `psac_timetable_view_v1`); both views paint from one load
  (`_ttData`) and both start work through
  `startScheduledSession(subjectId, chapterId, forceDiff)`.
  ⚠ **`#screen-schedule` is a CHALKBOARD in both themes** — the grid needs the
  `#screen-schedule .tt-*` override block (light-mode ink measured 1.1:1); the
  popup is outside the screen and keeps sheet colours. ⚠ Chip labels are hidden
  below 520px (a 46px square cannot hold a readable word); the popup carries them.
  Past days are dimmed, never tagged "missed" — the overdue tag belongs in the
  list, where a child can act on it. Day squares are keyed on the **local** date.
  `scripts/test-timetable-views.js`.
- **Learning materials sorting** — `sortMaterials()` / `materialSortBar()` /
  `readMaterialSort()` in `engine/helpers.js` (teacher Materials tab + a
  classroom's Materials section); `guest.html` gets Newest·Subject·Name.
  ⚠ **"Date" means two things**: `classroom_materials.assigned_at` (shared with
  THIS class) beats `learning_materials.created_at`; rows carry `shared_at` and the
  comparator prefers it. ⚠ **A row with no subject/grade sorts LAST.**
  `classroom-materials.js` had **no ORDER BY at all**. The classroom Work-tab
  preview deliberately gets no sort control. `scripts/test-materials-sort.js`.
- **The public contact form** — `#screen-contact` (open to anyone with no account)
  posts to `netlify/functions/contact-message.js` (service role), which writes into
  **`question_reports`** with `report_type:'contact'`, `question_id:'__contact__'`,
  so a guest message lands in the SAME admin queue — a second inbox is an inbox
  nobody reads. The mailto stays underneath: the one route that still works when
  the app itself is broken.
  ⚠ **A guest has no inbox**, so the admin card hides the in-app reply box and
  shows a **mailto**, or says plainly there is no way to answer. ⚠ Sender
  name/email/browser go in the existing `\n__meta__` JSON — **no schema change**.
  ⚠ **The raw IP is never stored** (a 16-char salted hash, only to count
  3-per-15-minutes; plus a 40-per-hour global brake).
  ⚠ Honeypot (`#contact-website`) is **off-screen, not `display:none`**, and a hit
  answers a plain success. Layers in firing order: honeypot → too-fast (<3 s, and
  a missing value counts as instant) → link count (>2) and a three-real-words rule
  with **URLs stripped first** → per-sender cap → hourly brake. ⚠ The fill time is
  client-supplied and forgeable: these are bot filters, not security controls.
  ⚠ **An unknown sender is not an unlimited one** — unknown callers share one
  bucket on a tighter cap. ⚠ **The rate limit fails CLOSED.**
  Admin → Reports filters **in the query** (`Store.loadReports(offset,limit,kind)`),
  never over one loaded page. ⚠ Bulk delete sends only ids **on screen now** (the
  selection Set outlives a filter change) and reports the count the DELETE
  returned. ⚠ `.contact-field` backgrounds are **opaque**; fields are 16px.
  `scripts/test-contact-form.js`.
- **Sharing to WhatsApp** — `TeacherWorkspace.shareText(title, text, url)` is
  **the** share path (assignment links, reminders, materials).
  ⚠ **The panel is never replaced by `navigator.share`** — the OS sheet lists
  WhatsApp only if the OS knows about it, which on a laptop it usually does not.
  The panel always opens with 💬 Share on WhatsApp, Copy message, Copy link, and
  📤 More apps (the native sheet) as one more button, called inside the click.
  ⚠ WhatsApp is a real `<a href="https://wa.me/?text=…">` — `window.open()` after
  an `await` is eaten by popup blockers. ⚠ **The message states the link's
  lifetime** (`fmtMaterialExpiry`); `TeacherMaterials.getLink()` uses the row's own
  `link_expiry_seconds`, not a hard-coded hour. ⚠ `.tc-share-wa-btn` ink is **dark
  green, not white** (white on `#25d366` measures 2:1).
  `scripts/test-teacher-share.js`.

### Child-facing vs parent-facing, deliberately
- The child's activity recap is **unfiltered** — the parent's `_filters` live in
  localStorage per browser and on a shared phone would silently blank the child's
  own record of their work.
- **There is no "missed sessions" list on a child's screen, and must not be.** On
  a parent's calendar an unticked row is information; on a child's it is a list of
  their failures served every time they open the app.
- Family overview is **ordered by who has been quietest, never by score** —
  ranking siblings is the wrong thing to hand a parent, and accuracy is not
  comparable across grades.
- A chapter with no attempts is reported as **not started**, never 0%.
- ⚠ Report copy says **"they"**, not "she". Nothing records a child's gender.
- The chapter card says **"correct"**, never "mastery" — `getChapterPct()` is
  accuracy, so 2/2 once read as "100% mastery ★★★". `_chapterProgress()` is the
  single reading used by both card and tiles; `attempted` counts **answers given**,
  not distinct questions seen, so the card never claims "12 of 19 done". ⚠ An
  unknown pool (`total === 0`, grid painted before QuestionLoader answered) must
  **withhold** the mastery claim, not assume it.
- The daily goal deliberately does **not** drive the streak — breaking a 12-day
  streak because a nine-year-old managed three questions is a punishment no
  child-facing app should hand out. `daily[key].g` latches the celebration once
  per day.
- Reports and the digest use **rolling 7-day windows, not calendar weeks** (on a
  Monday a calendar week holds one day), and a previous window of zero renders
  "new", never +100%. **"No dated history" means unknown, never idle** — that
  distinction is the difference between an accurate digest and telling every
  parent their child has stopped working.
- Derived activity rows are **never written into `schedule_entries`** — that table
  is parent-editable, and storing actuals there would let a parent delete the
  record that a mock exam happened.
- A parent's own settings apply to children by **merge, never replace** —
  `lockedChapters` is per-child and must survive the write.

---

## Caching & deploy

### Version bumps
- **`SHELL_VERSION` (`sw.js`)** — bump on any change to a shell-cached engine file,
  or returning users never receive it. ⚠ Individual pack manifests are deliberately
  NOT precached; `PackLoader` fetches only what a child opens.
- **`_CACHE_VERSION` (`question_loader.js`)** — bump when question content or the
  cache envelope changes.
- ⚠ **Read both numbers from the files; never quote a number from this file.**
- ⚠ The SW shell list is all-or-nothing (`cache.addAll` rejects wholesale on one
  404). **Re-check `<script src="engine/…">` tags against `SHELL_FILES` on every
  deploy that touches them.**
- ⚠ **`SHELL_VERSION` churn is the multiplier on everything below**, and it is a
  process problem: v232 → v249 in one working session, each bump re-downloading
  the whole shell for every returning user. **Batch deploys.**

### What is and is not precached
The shell was **56 files / 2.87 MB** over the wire; it is now **37 files / 632 KB**.
Three rules, not a one-off tidy-up:
- ⚠ **Static assets (`/assets/**`, `/fonts/**`) are NOT in `SHELL_FILES`** — they
  live in `ASSET_CACHE`, which is **deliberately UNVERSIONED and kept by
  `activate`**. Bundling the question images made them same-origin, which would
  otherwise drop them into `SHELL_CACHE` and re-download every picture a child had
  already seen on every `SHELL_VERSION` bump, on a metered connection. 7.4 MB of
  all-or-nothing pre-cache is also not a first load.
- ⚠ **Size every bundled image against the CSS box it displays in.** Two precached
  photographs were 1.1 MB between them — `mahe-de-labourdonnais.jpg` alone was
  **928 KB**, a third of the whole shell, at 721×1056 for a `max-height:220px`
  slot (re-encoded to 28 KB). ⚠ `market.jpg` was tried and **reverted**: 180 →
  146 KB is not worth degrading a picture a child is asked to describe.
- ⚠ **`admin.js`, the five teacher files and `forum.js` load on demand** — see
  Role modules above.
- ⚠ Netlify's default is `public,max-age=0,must-revalidate` on **everything**
  (measured against production). `netlify.toml` gives `/assets/questions/*` and
  `/fonts/*` a 30-day max-age — deliberately **not** the engine or `index.html`,
  and deliberately not `immutable`.

### Question images are BUNDLED (138 files, 11.9 MB, `assets/questions/`)
The bank used to hotlink from Wikimedia Commons. ⚠ **Hotlinking had already failed
silently**: 24 of the 139 Commons files had been DELETED and were 404ing in
production, in 27 live questions. And ⚠ **the SW never caches cross-origin
requests** (deliberately), so every picture question was a broken icon offline.
- ⚠ **Commons now refuses direct ORIGINAL fetches** (`429 … use thumbnail images`,
  `retry-after: 600`) and refuses arbitrary thumb widths — only certain ones are
  served, and asking for a width above the original hands back the original url,
  which is refused. ⚠ **Commons also rounds a requested width UP**: asked for 1024
  it served 1280. Measure the file, never trust `iiurlwidth`.
- ⚠ **ONE credits record: `assets/questions/provenance.json`**, and
  `image-credits.html` is **generated from it**
  (`node scripts/build-image-credits.js`), linked from the landing footer.
  Bundling is redistribution; CC BY / BY-SA require the author, the licence and a
  link on every copy. Do not hand-edit the page, and **do not give it a
  `netlify.toml` 404** — an attribution nobody can reach discharges nothing.
  ⚠ There were briefly TWO credits files, written the same day by two sessions in
  the same working tree; if a second reappears, **merge rather than pick**.
- ⚠ **Provenance is captured FORWARD, from the API response that produced the
  file. Never reconstruct it from a filename** — the local names are lossy slugs,
  and that reverse lookup reported ~106 of 115 as "no such file", which reads as
  "provenance unknown" for images whose licence was fully recorded. ⚠ Commons
  filenames contain parentheses, so a markdown-link regex of `\(([^)]+)\)`
  truncates the URL at the first `)`.
- ⚠ A PNG only stays a PNG if its alpha is **measured in use** — 8 of 12 were fully
  opaque and became JPEGs (751 KB → 21 KB for Mars); the 4 that really use alpha
  would get a white box behind them in dark mode.
- ⚠ **`/.netlify/functions/questions` must never be cached by the SW** — that
  response is `private` precisely because it varies per caller, and a URL-keyed
  cache hands one child's entitled set to another. `activate` also **evicts**
  entries earlier versions wrote (`DATA_CACHE` survives a version bump).
- Tests: `test-question-images.js` (does a picture reach a child's screen: served
  as an image, decodes, fits 360px, alt text does not leak the answer) and
  `test-question-image-offline.js` (is it there without the network, is its licence
  recorded). ⚠ Harness traps: `Emulation`/`Network` overrides on the page target do
  **not** reach the service worker (shut the origin server down instead); a lazy
  `<img>` in an off-screen iframe never loads, so `decode()` never settles; and
  injecting question HTML into the live app fires `_Dialogs`' MutationObserver once
  per question — measure in an isolated same-origin iframe that loads `style.css`.

### CLI deploy
✅ **Stage the publish directory first — `node scripts/prepare-deploy.js`**, then
`netlify deploy --prod --dir=.deploy --functions=netlify/functions`.
The build runs **locally**, so no Netlify build minutes; there is no `dist/`
(`publish = "."`).
- ⚠ **It uploads from local disk, not git.** Everything gitignored but present
  ships. The repo tree is **491 MB / 8,900 files**; the site is **29 MB / 682**.
  What used to ship with every deploy: `past-papers/` (147 MB of copyrighted
  MES/MIE PDFs), `.netlify/` (60 MB), `netlify/` (21 MB — including the question
  bundles that answered **200 with real questions and their answers**, bypassing
  every entitlement check), `exam_papers/`, and **`.env` with the service role
  key**. That last one is why the staging dir exists: "move `.env` out of the tree
  first" was a manual step in a document, one forgotten command from publishing it.
  - ⚠ It is an **ALLOWLIST**. A denylist ships every new scratch file at the repo
    root by default; the allowlist inverts the failure so something NEEDED goes
    missing and the script's own checks fail loudly.
  - ⚠ `assets/past-papers/` is **kept** — the cropped artwork questions display, a
    different thing that merely shares a name; an unanchored `/past-papers/` rule
    matched it and blocked the first run.
  - ⚠ `netlify/` is **not published**: functions ship via `--functions`, which
    reads the repo. **Verify `/.netlify/functions/questions` answers 401 (not 404)
    right after the first staged deploy** — the one thing no local check can prove.
- ⚠ `publish = "."` serves the repo root, so `netlify.toml` carries explicit 404
  redirects — explicit because Netlify wildcards match only a *trailing* splat
  (`/*.md` matches nothing). Add one for any new sensitive root file;
  `scripts/test-netlify-redirects.js` walks the tree and fails on anything neither
  allowlisted nor blocked (verified in both directions, including that a rule
  matching `/.netlify/*` would 404 every function in the app).
  ⚠ **A 404 from this site has two meanings**: ~398 KB is one of our rules firing,
  ~4.2 KB is Netlify saying the file was not deployed. Never read the second as a block.
- ⚠ **The CDN keys on URL alone** — it does not vary on `Authorization` or
  `X-Student-Token`. Every error path in `questions.js` uses an `errHeaders` object
  with `no-store`; one cached 401 poisoned a subject for 24 hours for every child.
- ⚠ **Draft deploys cannot verify this** (Netlify preview auth answers 401 to
  everything). Verify against **production** immediately after promoting, with a
  cache-busting query string.
- ⚠ **Production builds from `main`.** If a fix is reported as still broken, check
  which branch is deployed before concluding the fix is wrong.
- ⚠ **Probe deployed state, never infer it** — `curl -s <site>/sw.js | grep
  SHELL_VERSION`, and POST to an `/api/` route (**401 means deployed, 404 means
  missing**). Stale numbers recorded here once sent a whole debugging session the
  wrong way. ⚠ **An undeployed `/api/` route returns the SPA fallback: HTML with
  status 404**, so `response.json()` throws and code that treats that as `{}`
  reports the server's own refusal for a request the server never saw.
  `AdminPanel._adminApi()` checks the content type first and says "not available
  (HTTP 404)". The same is true on a plain local static server, where no function
  runs at all — every `/api/` call fails there.

### Netlify env vars (dashboard only, never in the repo)
`SUPABASE_SERVICE_ROLE_KEY` (⚠ its absence used to fail *open*), `SUPABASE_ANON_KEY`,
`GMAIL_USER`, `GMAIL_APP_PASSWORD`, `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`,
`VAPID_EMAIL`.

---

## Verifying work — traps in the harnesses
This project's fixes are **measured, not eyeballed**.
- ⚠ **The service worker serves a stale shell.** A CDP run must
  `Page.setBypassServiceWorker` **and** `Page.reload {ignoreCache:true}`, or you
  measure the previous `style.css` and report a fix that never landed.
- ⚠ **Stop an overflow detector's ancestor walk at `body`** — `overflow-x: clip`
  above it makes every page look clean. `scripts/audit-mobile-screens.js [width]`
  reveals every `.screen` at 360px and 320px, judges per-element rects (a
  scrollWidth check is blinded by that same `clip`), skips children of
  clipping/scrolling ancestors and pure-emoji decorations, and covers **static
  markup only** — dynamic content needs its own probe.
- ⚠ **Give every CDP call its own timeout.** An infinite loop in page JS blocks the
  renderer's message loop so CDP never answers; without a timeout you cannot tell
  "page wedged" from "harness bug".
- ⚠ **`checkVisibility()` answers false for everything in headless Chrome 152** — a
  probe built on it measures nothing and passes. Assert collapse by geometry, and
  filter closed `<details>` by ancestry.
- ⚠ **A contrast probe must composite translucent layers over the real ground.** A
  chalkboard gradient is a background *image*, so its computed `backgroundColor` is
  transparent and a naive walk measures chalk on white at 1:1; taking the first
  background with any alpha reads a .07 tint as solid near-black and fails
  perfectly legible text at 1.2:1. Use a KNOWN-surface table where one exists.
- ⚠ **Do not point a login probe at a real family** — four digits against a real
  username increments `pin_attempts` and can trip `pin_locked_until`.
- ⚠ **Never build a regex through a shell heredoc into a JS template literal.**
  `\s` arrived as `s` and silently deleted the letter *s* from every recorded
  mistake — plausible-looking output, caught only by asserting the exact string.
- Any tooling that loads questions outside the browser must reproduce what each
  factory actually returns (`makeMatch` has **no `question` field** — it builds the
  text from `leftItem`).
- **`scripts/sql-tests/run-schema-tests.sh`** builds the schema from nothing on
  `postgres:17-alpine`, re-applies it for idempotency, then runs 47 RLS assertions
  **as `authenticated`, never the superuser** (RLS does not apply to a superuser,
  which once made every "can see the row" check pass for a total stranger). ⚠ It
  exits **non-zero today** on the co-parent finding in Pending 0 — that is the
  finding, not a broken test.
- SQL changes are applied against production **inside a transaction and rolled
  back**, or against a local Postgres with the live constraints.
- The write step is not self-verifying: always reconcile "rows written" against a
  fresh count. A quote-style mismatch once skipped 119 questions *while reporting
  success*.

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

### Exam weighting — set from the papers, not from item counts
`examWeight` is a chapter's share of a 40-question exam:
`n = Math.max(1, Math.round(examWeight * count / 40))`. It is the **only** lever on
what an exam contains — `getMixedQuestions()` is a flat shuffle inside one chapter,
and how many questions a chapter holds changes nothing.

**Ten of the fifteen primary live packs are weighted from their real papers.** One
rule throughout: read the paper question by question and give each mark to the
chapter that teaches it; a chapter the exam pool cannot reach comes out of the
denominator too. `scripts/exam-mark-maps.json` holds every mark map, and the
comment block above `chapters:` in each `_manifest.js` is **generated from it**, so
the two cannot drift.

| pack | papers read | marks |
|---|---|---|
| grade6-english / grade6-french | 2024 | 100 (French: 90 reachable) |
| grade6-science / grade6-history | 2022 + 2023 + 2024 | 150 |
| grade6-maths | 2023 + 2024 | 200 |
| grade5-english | 2023 + 2024 + 2025 | 51 items |
| grade5-french | 2025 | 100 (90 reachable) |
| grade5-science / grade5-history | 2024 + 2025 | 100 |
| grade5-maths | 2024 + 2025 | 200 |

- ⚠ **One paper is not enough for a topic-based subject.** Science and History
  rotate (`g6-ecosystems` scores 0 in 2023 and 6 in 2022; `g6-solar-system` 0 in
  2024 and 5 in 2023). Three years is the smallest sample that stops a real topic
  reading as zero; the languages are fixed year to year, so one paper is enough.
- ⚠ **THE GRADE 4 PACKS ARE NOT DERIVED AND CANNOT BE** — there is no Grade 4
  paper (`past-papers/` holds `psac6`, `psac5`, `psac5-mes` and `nce` only). All
  five keep hand-set weights and grade4-maths has none at all, so the SHAPE of a
  Grade 4 exam is an accident of chapter count and remains unverified. Do not
  invent a mark map from the Grade 5 paper.
- ⚠ **Some ✨ BONUS chapters are core exam content** — `g6enr-symbols` earns 9.3%
  of the History marks (flag, arms and anthem are asked EVERY year, more than Map
  Skills or Independence) and `g5enr-world` 8%. The gold card tells a child a
  yearly exam topic is optional. Worth re-labelling.
- ⚠ **Some weighted chapters earn almost nothing** — `trade-agri` earned 1 mark in
  two Grade 5 papers against a weight of 4; `percentage` earns **zero** in both
  Grade 5 maths papers (it is a Grade 6 topic), measured over two years. Both sit
  at the floor now.
- ⚠ **Weighting to the paper CONCENTRATES the draw**, and 594 items
  (`subjects/*/questions/exam_depth.js` in eight packs) were written to keep up —
  `g6-land-use` draws 11 of 40 questions from what was a pool of 47, i.e. four mock
  exams and a child had seen it out. **No pool in any of the fifteen primary live
  packs now repeats inside ten exams.** grade4-science was deepened too (every core
  chapter there held exactly 31 items and every enrichment chapter 19 — a fixed
  quota, not a measure of need).
  ⚠ Four new subsections were declared because the syllabus named the content and
  the map did not (`teeth`, `diet` on g6-animals, where the 2023 and 2024 papers
  spend 9 and 6 marks; `decrire`, `raconter` on both French image chapters). The
  new French items deliberately carry **no photograph** — that artwork does not
  exist in this repo, and « Observe l'image » with no image is a broken item.
- ⚠ **A chapter that can fill nothing used to LOSE its slot** — a "40-question"
  French exam dealt 39 (37 in grade 4), silently, for as long as the cloze chapters
  have existed. `assembleExamPaper` now drops such a chapter.
  `scripts/test-exam-paper-shape.js` asserts every live pack deals a whole
  40 / 25 / 15, holds each weighted pack's worst chapter within 4 points of its
  paper (one question is 2.5 points, so a tighter band fails on rounding alone),
  and prints the thin pools on every run.

### The Game Zone (minigames)
`engine/minigame.js`, reached from `#dash-games-tile` / `#screen-minigames`. Seven
live games: **Who Wants to Be a Billionaire?** 💰 (20-rung prize ladder; Q1–10 the
child's grade easy→medium, Q11–15 hardest textbook, **Q16–20 general knowledge**
from `minigame_gk.js`; 4 lifelines, safe havens at 5/10/15; synthesised WebAudio —
**no audio files, no copyright** — and a distinct name and look on purpose, no show
logo/music/wording) · **Quick Fire** ⚡ (60s blitz, combo ×1–5) · **Word Builder**
🧩 (`minigame_words.js`; ⚠ a clue must never contain its own word, and words are
A–Z only because the tiles are letters) · **Island Explorer** 🗺️
(`minigame_geo.js`; ⚠ every fact real and verifiable; two wrongs and the tour
**continues** — a child always finishes the trip) · **Number Ninja** 🥷 (7 belts ×
5 sums, **GENERATED** per belt, never drawn from the bank) · **Brain Battle** ⚔️
(pass-the-phone; both players drawn from the **same difficulty band** but never the
same question — the second would inherit the answer — and a resume always lands on
the handover, never mid-question) · **Time Traveller** 🕰️ (`minigame_time.js`;
⚠ a label must never contain a 3+ digit number, and never two same-year events in
one round, whose order would be unknowable).
- ⚠ **Game answers NEVER call `recordAnswer()` / `_recordDaily()`.** A replay must
  not distort the mastery, mistake and daily reporting parents rely on. Bests live
  in `DB.games.*` (seeded in `Store._defaultStudent`, so existing children backfill
  for free). In-progress games persist to sessionStorage per student.
- The hub's four `mg-card-soon` teasers each have a **full design-intent comment
  block above `renderHub()`** — read it before building one.
- ⚠ **Confetti is `launchConfetti(count)` (app.js), NOT the canvas-confetti
  `confetti({...})` API** — that library is not loaded, and a `typeof` guard made
  every burst silently no-op.
- **Ask the Crowd** — `minigame_polls` + three RPCs (granted `anon, authenticated`);
  the child shares `/v/<CODE>` (`vote.html`, standalone like `guest.html`).
  ⚠ **The CORRECT ANSWER IS NEVER STORED** — the row holds question + options only.
  The table FKs `students(id) ON DELETE CASCADE`.
- **Score sharing** — `navigator.share`, preferring a canvas-rendered 1080×1080 PNG
  where `navigator.canShare({files})` allows, else intent links or clipboard;
  `score.html?s=&c=&a=`. ⚠ **A share carries a score and a challenge — never the
  child's name, id, or any profile link.**
- **Gates**: `DB.restrictions.minigamesDisabled` (parent toggle;
  `MiniGames.syncTile()` hides the tile live) and `_PLAN_GATED_SCREENS.minigames`.
  An excluded games tile **hides rather than teasing** the child.
- Tests: `test-minigame-arcade.js`, `test-number-ninja.js`, `test-brain-battle.js`,
  `test-time-traveller.js`.

### Parent-controlled Game Settings
`engine/game_settings.js` (`GameSettings`, loaded **before** `minigame.js`). Per
child, in `DB.restrictions.games` → `students.settings`, parent-written through
`Auth.saveGameSettings` with the same rollback-on-refusal as every Controls toggle
(**no migration** — RLS on `students` already gives a child SELECT only, proven
live and rolled back). Missing/partial settings `normalise()` to: Balanced · all
grade subjects · Medium · 10 per round · weak focus off · avoid-recent on · GK off.
- **`GameSettings.GAMES` is the single capability table** (`supportsSubjectMix /
  Difficulty / RoundLength / WeakTopics / GeneralKnowledge / RecentAvoidance`).
  **Never branch on a game's name.**
- **Every quiz game draws through `pickForGame()`**: valid MCQs only (`isValidMCQ`
  — answer present once, options unique, answer within the first four), the child's
  grade only (others only with `crossGradePractice`, and last), locked/admin-blocked
  chapters out, excluded subjects removed **before** anything else,
  largest-remainder shares (40/30/30 → 4/3/3) spread through the round rather than
  clumped, levels never above `min(difficulty top, restrictions.maxDifficulty)`,
  weak-area weights from `DB.chapters`, recent ids (`DB.games.recent`, cap 150)
  avoided while fresh ones remain, shortfall filled from another **included**
  subject with a `console.warn`. Zero usable ⇒ `NO_QUESTIONS_MSG`, distinct from
  "still loading". A game with a `levels` ladder keeps the exact level before
  freshness (Brain Battle pairs must match); a free-running game prefers fresh.
- Adaptive: `DB.games.adaptive {level,up,down}` — +1 after 3 right, −1 after 2
  wrong, clamped to the cap at read AND write. Recorded by Billionaire and Quick
  Fire, never by Brain Battle (two players).
- ⚠ GK defaults OFF, so Billionaire's rungs 16–20 are textbook level-4 unless the
  parent turns it on; hub copy and tier badge follow the setting.
- ⚠ The parent card renders by `innerHTML` **inside the chalkboard `#screen-parent`**,
  which is dark in BOTH themes — `.gs-*` carries a `#screen-parent` override block.
  `test-game-settings-ui.js` (19 text styles ≥ 4.5:1 in both themes at 360px, plus
  overflow and touch sizes), `test-game-settings.js`.

### Teacher Mode — Hybrid Classroom Command Centre
Main navigation is **Home · Classrooms · Set Work · Results** plus a labelled
`⋯ More` (Materials, Messages, Gradebook, Archived work, Teacher settings). The
classroom screen is **Overview · Work · Pupils** plus `⋯ More` (Materials, Results,
Settings). Set Work: classroom → sharing choice → grade/subject → chapter → number
of questions → due date; everything else inside `<details id="ta-more-options">`.
Full write-up in ENGINEERING-NOTES.
- **Location survives refresh**: `psac_teacher_loc_v1` (owner-scoped) holds tab,
  list filter, selected results and the open classroom + section.
- **Evidence thresholds** live in `TeacherInsights`: ≥ 5 answers before "may need
  help" (< 50%), ≥ 3 answers in a chapter before naming it, "very quickly" = < 8 s
  /question **and** < 60%. **Never label on one or two answers.**
- ⚠ **The board's `p:not(…):not(…)` rule scores (1,3,1)** and beats every single-id
  override; the command-centre CSS uses `#screen-teacher#screen-teacher` on purpose.
  Paper cards carry their own ink in both themes.
- ⚠ **A refresh superseded by a newer one resolves `undefined`** —
  `TeacherWorkspace.ensureLoaded()` waits for the newest in-flight refresh and
  judges by `loaded`, or Home shows its error state on every load.
- Sharing choice is on step 1 on purpose (online groups need "Anyone with the link"
  without discovering a disclosure); PIN is the default whenever the classroom has
  pupils, flipped only by the teacher's own tap.
- Not shown, on purpose: a "Scheduled" filter (nothing schedules a start), hints /
  attempt limits / answer visibility (no server support). The `?classroom=` share
  link is **inert** (nothing parses it) and is not promoted.
- Tests: `test-teacher-command-centre.js` (VM), `-layout.js` (360/1280 ×
  light/dark, overflow + contrast + 44px targets; `--shots DIR`).

---

## Pending / not yet done
⚠ Re-check anything here against `pg_policies` / `pg_proc` / production before
trusting it. **There are no outstanding SQL migrations** — all were verified
applied against the live database and consolidated into `supabase-schema.sql`.
This list used to name migrations as outstanding that had been applied for weeks,
and that staleness sent a whole debugging session down the wrong path. Everything
below that touches the database is a **decision**, not a pending run.

0. ⚠⚠ **A CO-PARENT CAN TAKE OVER A FAMILY.** `families_own` is
   `USING (parent_id = auth.uid() OR is_family_member(id) OR is_admin())` with
   `WITH CHECK (parent_id = auth.uid() OR is_admin())`, so a co-parent passes
   USING as a member and WITH CHECK by naming themselves — `UPDATE families SET
   parent_id = auth.uid()` succeeds and they inherit the right to invite, remove
   the original parent and delete the family. Measured against production as
   `authenticated` in a rolled-back transaction; `run-schema-tests.sh` **fails on
   it today**. ⚠ A stranger cannot (USING fails, and an UPDATE matching no row
   changes nothing and raises nothing) — the exposure is to an adult the owner
   deliberately invited, which is why it is a decision and not an emergency.
   The one-line fix is written out, commented, at the end of `supabase-schema.sql`:
   narrow **WITH CHECK only** to
   `(parent_id = auth.uid() AND is_family_owner(id)) OR is_admin()`, leaving USING
   untouched so co-parent reads are unaffected and database rule 2 is not
   re-opened. ⚠ Check first whether any co-parent feature legitimately writes to
   `families` (renaming it, say) — if one does, that field needs a SECURITY
   DEFINER function rather than a wider policy.

1. ⚠⚠ **THE WHOLE `netlify/` DIRECTORY IS PUBLICLY SERVED UNTIL THE NEXT DEPLOY.**
   Measured anonymous against production 2026-09-08:
   `/netlify/question-bundles/grade5-maths.json` → **200, 651 KB of real questions
   with their answers** (58 bundle files), `/netlify/functions/questions.js` →
   **200, the source of the entitlement enforcement**, `/netlify/lib/…` and
   `/netlify/import-questions.js` → 200, while `/.netlify/functions/questions`
   → 401 (the function itself is fine). That path bypasses the plan, the kill
   switch, entitlements, expiry and moderation blocks entirely. A `[[redirects]]`
   404 on `/netlify/*` is in `netlify.toml` but **is not verified, because nothing
   has been deployed**. ⚠ After the next deploy probe BOTH:
   `/netlify/question-bundles/grade5-maths.json` must answer 404 **and**
   `/.netlify/functions/questions` must still answer 401 — a rule catching the
   leading-dot path would take the whole question service down. ⚠ Nothing in the
   browser fetches that path (grepped before blocking it).
   ⚠ Also 200: `/docs/content-coverage-plan.md`, `/dbg18.js`, `/test.py`; and
   `past-papers/`, `exam_papers/`, `migrations/`, `tmp/`, `node_modules/` and five
   dot-directories were unblocked and safe only because the last deploy did not
   contain them. **The real defect is that the 404 list is hand-maintained** —
   `/subjects/*/questions/*` was blocked while the build's own later route was
   not. `scripts/test-netlify-redirects.js` now fails on anything neither
   allowlisted nor blocked. ⚠ `.netlify/` cannot be blocked by a path rule (same
   prefix as the functions); it is asserted gitignored instead.

2. ⚠ **`netlify/functions/parent-pin-signin.js` IS NOT DEPLOYED YET** (the table
   `parent_pin_attempts` is applied and recorded in the schema; the function and
   its `/api/parent-pin-signin` redirect are in the working tree only). Until it
   ships, `_pinServerSignIn()` receives the SPA fallback, reads it as
   `unavailable`, and the PIN pad behaves exactly as it did before — the intended
   failure mode, not a silent one. Verify against **production** immediately after
   promoting (a draft deploy answers 401 to everything): 401 means deployed, 404
   means missing. Unverified until then: that `admin.generateLink()` does not SEND
   an email — it should not, but being wrong costs one message per PIN sign-in
   from a shared ~500/day quota.

3. ⚠ **`notify.js` and `weekly-digest.js` are NOT DEPLOYED YET.** Both now send
   through the shared `netlify/lib/mailer.js` (nodemailer over Gmail, reading
   `GMAIL_USER` / `GMAIL_APP_PASSWORD`); Resend is gone from both.
   ⚠ **Measured: `RESEND_API_KEY` was never set on the Netlify site at all**, so
   both were hitting their own `not_configured` guard and **never attempted a
   send** — no parent has ever received an assignment notification or a weekly
   digest. The lesson this file keeps re-learning: a guard that returns "not
   configured" and a send that fails look identical from outside.
   ⚠ `sent++` counted ATTEMPTS, not deliveries, so the closing log line reported a
   full run either way; it now counts only `ok` sends and logs `N FAILED`.
   ⚠ The from-address is deliberately not configurable any more — Gmail rewrites
   `From`, so `NOTIFY_FROM_EMAIL` could only ever be wrong. ⚠ `nodemailer` is the
   first new runtime dependency in a long while and is verified to survive
   Netlify's esbuild bundler (a dynamic require would have failed only in production).

4. ⚠ **`anon` can INSERT into `question_reports` directly, unthrottled** — policy
   `"anon can insert question reports" … WITH CHECK (true)` plus a full INSERT
   grant, so any visitor can write into the admin queue from a console and skip the
   contact form's honeypot, validation and rate limits. **Pre-existing — the
   contact form did not create it**, but it is what makes that throttle advisory
   rather than binding. `reports_insert` already covers a child with a token and
   any signed-in adult, and the guest path holds the service role, so the anon
   policy looks redundant — **verify against `pg_policies` live before dropping
   it**. Proposed:
   `DROP POLICY "anon can insert question reports" ON public.question_reports;`
   then `REVOKE INSERT ON public.question_reports FROM anon;`, then regenerate.

5. ⚠ **Publish the shop catalogue** — Admin → Content → 🛒 Credit Shop → Publish
   catalogue. Not SQL: `purchase_subject()` and `shop_subject_price()` both exist,
   but `mm_data.shop_settings.catalog` is still `[]` and that is what
   `purchase_subject()` validates against, so whole-subject buying refuses today.

6. ⚠ **Two families are both named "gobin"** (`B48C5A`, `4B2D15`), so
   `families_name_unique_ci` cannot be created and `verify_student_pin` can answer
   `ambiguous_family` to a child in either. family_name is one of the three things
   a child types to log in, so renaming one is a **decision about real children's
   credentials**, not a migration to run unattended. §13 of the schema skips itself
   and warns; those children can sign in with their 6-character family code.

7. ⚠ **Rotate the VAPID keypair** — the private key is in git history (`dba9b8e`)
   permanently. Update the Netlify vars and `VAPID_PUBLIC_KEY` in `engine/app.js`.
   Costs nothing now: the VAPID vars are absent from the site env, so `push-*.js`
   is inert and there are no real subscribers.

8. **Push notifications for assignments** — infrastructure ready, `push-send.js`
   not wired to assignment creation. Badge API not started.

9. **Grades 1–2 need a picture-first question mode** — the renderer assumes the
   child can read the question *and* all four options.

10. **The grade 7–9 subject list is CONFIRMED** against the MIE NCF/TLS Grades 7–9
    (2026-09-08): English, Français, Mathematics, Science, **Social & Modern
    Studies** and — at Grade 9 only — **ICT**: 16 packs, 171 chapters.
    ⚠ **ICT was missing from this list and that was a real gap** —
    `past-papers/nce/ict/` holds five real NCE ICT papers and the NCF lists the
    subject at printed page 128; the pack was written on 2026-09-08.
    ⚠ **Three of the sixteen are now LIVE and the other thirteen are not**:
    grade9-maths (833 practisable items), grade9-ict (469) and grade9-science
    (528) have `comingSoon: false`; the rest still hold one sample question each.
    ⚠ **A PACK'S examWeight VALUES MUST SUM TO 40, and grade9-science's did not**
    — they were hand-set, almost every chapter at 3, and summed to **47**. That is
    not cosmetic: `assembleExamPaper()` sheds the surplus with
    `while (total > count) { … findIndex(w => w.n > 1) … }`, which always
    decrements the FIRST chapter in list order, so the excess comes off the top of
    the list instead of being spread. Measured on grade9-maths at a sum of 52: its
    heaviest chapter was dealt **one** question instead of eight, while
    `test-exam-paper-shape.js` passed throughout because the paper still totalled
    40. **The distortion is in the distribution, and no test catches it — check
    the sum.** Both packs were rederived 2026-09-08; the derivation is written out
    in `subjects/grade9-science/_manifest.js`.
    ⚠ **There is no separate History or Geography at 7–9** — both live inside
    Social & Modern Studies and the NCE assesses it as one subject; the old
    `grade{7,8,9}-history` placeholder packs were replaced. ⚠ Grade 9 Science
    carries the exam's own **B/C/P split** (`C1…C5`, `P1…P5`, `B1…B4`), matching
    the three separate NCE science papers.
    ⚠ Still to check before writing questions: the English and French **grammar**
    chapters — those syllabus tables are dense multi-column layouts and pdftotext
    interleaved some columns, so verbs, modals, pronouns and prepositions were
    written at a deliberately general level. Re-read pp. 15–19 of the PDF first.

11. Still open from the security review, none as exploitable as the five fixed:
    the **local** parent-PIN copy is still base64 under `_getStoredPinHash` (now
    only a convenience check — the credential is `profiles.parent_pin_hash`),
    missing SRI on three CDN scripts with a floating `@2` major, CSP
    `'unsafe-inline'` (311 inline handlers), and the dormant plaintext-equality
    branch in `verify_student_pin`.
    ⚠ `parent_pin_hash` is a **plain SHA-256 with a fixed, shared salt**, so a
    4-digit PIN is 10,000 candidates to anyone who can read the column — only the
    owner and an admin can (`profiles_select`), which is why this is a note and not
    an emergency, but a per-user salt and a slow KDF are what it should be now that
    the hash mints sessions. ⚠ `profiles_update` lets a parent write **their own**
    `parent_pin_hash` with no column restriction, deliberately not in the
    privileged-column trigger list — the same power that session already has, so it
    changes nothing today, but it is the next thing to guard if the PIN gains any
    further reach.

12. Content gaps: English "Vocabulary Builder", maths "Shapes Around Us", grade-6
    maths enrichment. Illustration coverage in grade5-maths is ~1.4% of its pool.

13. **`daily` would be better as its own table** than a key in the rewritten-whole
    blob (~2.4 MB uploaded per 30-minute session at current caps). A migration plus
    a rewrite of every reader — not a quick change.

14. Payments are not wired: `openPlansModal()` is the single place to add them, and
    `payment-webhook.js` verifiers **fail closed** on purpose — enabling payments
    must break loudly until real signature checks are written.

15. ⚠ **Bundle sizes drift and nothing re-measures them.** The question cache went
    over the localStorage quota because the French packs quintupled with no one
    noticing; the byte budget fixed the symptom, not the cause. Run
    `node netlify/build-questions.js && node scripts/test-question-cache-budget.js`
    after any large content addition — it fails when a grade stops fitting.

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
- **Measure, don't reason** — every ⚠ above exists because something that looked
  obviously correct was not.

## How to continue
Open this file first, then grep `ENGINEERING-NOTES.md` for anything you are about
to investigate — most surprising behaviour in this app has already been chased
down once, and the full-length version of every rule above is in there. Immediate
next steps are under **Pending / not yet done**.
