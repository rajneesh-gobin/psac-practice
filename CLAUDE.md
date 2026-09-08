# PSAC Exam Practice — Project Brief for Claude

## What this is
A vanilla JS single-page app for Mauritian primary children revising for the
**PSAC** exam (grades 1–9 registered; **4, 5, 6 are the live ones**). Subjects:
Maths, English, French, Science, History & Geography.

Hosted on **Netlify**. Backend: **Supabase** (`https://xawvjwsiqhtxgpocdqgm.supabase.co`).
No frameworks — HTML/CSS/JS + Tailwind CDN.

## Where the documentation lives
| File | What it is |
|---|---|
| **`CLAUDE.md`** (this file) | The working brief: rules, invariants, current state. Loaded every session — **keep it short**. |
| **`ENGINEERING-NOTES.md`** | The long-form archive: why each rule exists, how each bug was found, what was measured. ~200 KB. **Grep it before re-investigating anything** — most surprising behaviour in this app has already been chased down once. |
| `PROJECT_OVERVIEW.md`, `PLAN.md`, `ARCHITECTURE.md` | Older overviews. Treat as historical. |
| `HOW_TO_RUN_LOCALLY.md`, `HOW_TO_PUBLISH.md`, `DB_IMPORT_GUIDE.md` | Operational. |

⚠ Nothing in any `.md` outranks the code or the live database. Several claims in
the archive were stale when written. **Verify before relying on a summary — this
one included.**

---

## File layout
```
index.html                  ← entire app UI, all screens, shown/hidden by showScreen(id)
style.css                   ← custom CSS, loaded AFTER the Tailwind Play CDN
sw.js  manifest.json  icons/
netlify.toml                ← functions, cron, and 28 explicit 404 redirects
supabase-schema.sql         ← THE schema. One file, generated. See "Database"
engine/
  supabase.js protect.js helpers.js questions_engine.js registry.js events.js store.js
  question_loader.js app.js biometric.js auth.js teacher.js teacher_home.js
  teacher_insights.js teacher_workspace.js teacher_guest_classes.js
  teacher_classroom_detail.js admin.js forum.js
  calendar.js search.js classroom.js shop.js
netlify/
  functions/    questions.js push-*.js weekly-digest.js notify.js assignment-submit.js …
  lib/          student-auth.js questions-sandbox.js
  build-questions.js  import-questions.js
  question-bundles/   ← GITIGNORED, rebuilt by build-questions.js on every deploy
subjects/
  _index.js               ← GENERATED eager pack index — the ONLY subject script
                             index.html loads. node scripts/build-subject-index.js
  grade[1-9]-[subject]/
    _manifest.js          ← registerSubject() + chapters + SYLLABUS + generators.
                             LAZY: fetched by PackLoader.ensure() on demand
    questions/ch01_*.js … ← plain scripts; enrichment_*.js, past_paper_*.js
```

### Where a feature lives
| Feature | File |
|---|---|
| Screens, practice, exam, dashboards, reports, daily goal | `engine/app.js` (~478 KB — the big one) |
| Parent/teacher auth, student PIN login, session guard, mode handover | `engine/auth.js` |
| localStorage + Supabase data layer, progress blob | `engine/store.js` |
| Question fetching + 7-day localStorage cache | `engine/question_loader.js` |
| Timetable, calendar, activity layer | `engine/calendar.js` |
| Interactive map — the child's map AND the admin editor | `engine/interactive_map.js` |
| Textes à Trous (French Q6) · Chasse aux Erreurs (French Q7) | `engine/cloze.js` · `engine/errorhunt.js` |
| Credits + entitlement model, `sellableChapters/Subjects` | `engine/shop.js` (the shop *screen* — `renderShop()` — lives in `app.js`) |
| Admin panel, shop settings, security log | `engine/admin.js` |
| Server-side entitlement enforcement | `netlify/functions/questions.js` |
| Teacher navigation, Set Work form, success screen, location restore | `engine/teacher.js` (`TeacherMode`) |
| Teacher Home dashboard | `engine/teacher_home.js` |
| Assignment cards, Results screen, results cache, reminders/export | `engine/teacher_workspace.js` |
| Classroom screen (Overview · Work · Pupils · More) | `engine/teacher_classroom_detail.js` |
| Classroom list + new-classroom form | `engine/teacher_guest_classes.js` |
| Evidence thresholds, grouping, "who needs my help" (pure) | `engine/teacher_insights.js` |

## Engine load order (script tags in `index.html`)
```
supabase.js → protect.js → helpers.js → questions_engine.js → registry.js →
events.js → store.js → subjects/_index.js → question_loader.js → app.js →
biometric.js → auth.js → teacher.js → admin.js → forum.js → calendar.js →
search.js → classroom.js
```
One guarantee is load-bearing — verify against `index.html` before trusting any
summary of it, this one included:
- **`app.js` loads BEFORE `auth.js`.** `auth.js` ends by calling `Auth.init()`,
  which needs `showScreen` and `ACTIVE_STUDENT_ID` from `app.js`.

### Subject packs are LAZY — one index, then per-pack on demand (2026-09-08)
`index.html` carries **one** subject script, the generated `subjects/_index.js`.
It used to carry one blocking `<script>` per pack: **measured 45 requests and
323 KB parsed before `app.js` ran**, on the cheap Android phones this app
already had display problems on. The index is **39.9 KB in one request**.
- `subjects/_index.js` registers all 45 packs with their **chapter lists** but
  **without** chapter prose, subsection maps, generators, badges, formulas or
  help. `_lite: true` marks such an entry.
- `PackLoader.ensure(packId)` (engine/registry.js) injects that pack's own
  `_manifest.js` plus any extras (`grade5-maths/help.js`) and resolves with the
  full pack. `ensureGrade(grade)` does a whole grade.
- ⚠ **The split is measured, not guessed.** Pack metadata 6.3 KB · chapter
  metadata 38.2 KB · chapter prose 94.4 KB · subsection maps 41.1 KB. Every
  consumer outside the active pack (`admin _allChapters`, `Shop.sellableChapters`,
  the plan chapter picker, reports, calendar, search, the grade/subject pickers)
  was checked and reads a chapter's `id`, `name` and `icon` **only** — so the
  index alone satisfies them all.
- ⚠ **`CHAPTERS` is declared in `engine/registry.js`,** not in a pack. It used to
  be `const CHAPTERS` at the top of `subjects/grade5-maths/_manifest.js`, which
  made one arbitrary pack a load-bearing dependency of `app.js` — and made lazy
  loading impossible, since a deferred file cannot declare a global `app.js`
  references at top level. Re-adding it to that manifest throws *"Identifier
  'CHAPTERS' has already been declared"* the moment the pack loads.
- ⚠ **`registerSubject()` MERGES on a second call for the same id** — that is how
  the real manifest lands over the lite entry. It **mutates the existing object**
  rather than replacing the array slot, because callers hold references to it
  (`ACTIVE_PACK` among them); replacing the slot would leave the open subject
  pointing at the lite copy for the rest of the session. If the pack is the
  active one it also refreshes `CHAPTERS` in place, so a subject activated while
  still lite picks up its prose when the load finishes.
- ⚠ **A failed load drops the cached promise** so a retry can succeed. Keeping it
  would turn one dropped request into a permanently prose-less subject for the
  session — the defect `QuestionLoader._done` was fixed for.
- ⚠ **The index is GENERATED — never hand-edit it.** `node scripts/build-subject-index.js`.
  Prose fields are dropped **by name** (`syllabus`/`notes`/`enrichmentNote` on a
  chapter), so a new chapter field is kept by default rather than silently
  stripped and read as `undefined` at the far end.
- `scripts/check.js` executes both the index and the manifests and **fails on
  drift** (a new pack, a renamed or reordered chapter, a bad `_src`), and fails if
  `index.html` ever loads a pack manifest eagerly again. Verified to catch it by
  renaming a chapter id and restoring the file byte-for-byte.
- Verified in real headless Chrome, 28/28: one `subjects/` request at boot, 45
  packs and 334 chapters registered, no prose/generators until `ensure()`, no
  duplicate pack after it, generators + help + badges arriving for grade5-maths,
  `Shop.sellableChapters()` returning 160 named chapters off the index alone.

## Key globals
- `STATIC_QUESTIONS` — flat array; every question file pushes into it
- `CHAPTERS` — chapters of the active pack, declared in `engine/registry.js`.
  **Starts `[]`**; mutated in place by `activateSubjectPack()` and refreshed in
  place by `registerSubject()` when a lazily-loaded pack lands on the active one.
  (It used to ship full of Grade 5 Maths, which is how a Grade 4 child tapping
  Science got maths.)
- `PackLoader` — `ensure(packId)` / `ensureGrade(grade)` / `isLoaded(packId)`.
  ⚠ Anything that takes a child **into** a subject must `await PackLoader.ensure()`
  first, or the syllabus screen and the generators are missing. Anything that only
  **lists** chapters across packs needs nothing — the index already has them.
- `ACTIVE_PACK` / `ACTIVE_STUDENT_ID` / `SUBJECT_PACKS`
- `DB` — the student progress blob (localStorage + Supabase `student_progress.data`)
- `S` — session state: `S.practice.{chapterId,qs,idx,difficulty,session}`,
  `S.exam.{qs,answers,flagged,idx,type,endTime}`
- `_activePack()` returns **null** when nothing is chosen — never a fallback pack.
  Every caller handles null; a guess dressed as an answer is worse than no answer.

## Key functions
`makeMCQ / makeNum / makeTF / makeMatch / makeSymmetry` (factories) ·
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
- IDs: `[grade][subject]-[chapter]-[3 digits]`
- difficulty: 1 Basic · 2 Medium · 3 Hard · **4 = word problems** (applied/contextual, not just harder recall)
  ⚠ **That L4 definition is MATHS-SHAPED and is not what L4 holds in every pack.**
  Measured 2026-09-08: maths L4 = multi-step word problems (as above); english L4 =
  extended passage/essay analysis; french L4 = multi-verb cloze passages;
  history/science L4 = applied scenarios. A rule written across all five is wrong —
  two automatic gates were tried and rejected for exactly that reason (they fired on
  1 055 French and 206 English items, whose grammar answers are single words by
  nature). `scripts/audit-difficulty-labels.js` therefore **reviews, never fails**:
  whether a question demands reasoning is a reading, and a script can only count what
  someone has already asserted. It carries the per-level criteria, anchored on what
  the real papers award marks for. ⚠ The labels are the AUTHOR'S assertion, not a
  measurement — L1 measured 86% recall, but L3/L4 had been diluted with plain
  retrieval ("In which year was Aapravasi Ghat inscribed?" sat at L3); 34 grade-6
  history/science items were re-labelled on 2026-09-08.
- Images: Wikimedia `Special:FilePath` URLs, **verified to exist via the
  `action=query` API before being written into a question**. Prefer inline SVG —
  it cannot 404, works offline, and its contents are known exactly.
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
"Practise →" (5,428 questions, 100% tagged). ⚠ **Invariant: declared subsection
ids and tagged subsection ids must be identical per chapter.** A declared id with
no questions opens empty; a tagged id that is not declared hides those questions
from the screen. The English/French maps are *generated from the tags* so they
cannot disagree at birth. Tagging traps (match question text not options, order
is load-bearing, comprehension passages are stimulus not task, etc.) are in the
archive under "Per-subsection Practise".
⚠ **It was broken in five chapters at once, and had been for a long time**
(found 2026-09-08, all pre-existing): 22 elapsed-time word problems on
`g6-time-speed` tagged `word_probs` with no declaration — unreachable on the
Practise screen; four more on `g4fr-lecture`, three on `g6fr-lecture`, one on
`g6-animals`; and `independence` declared on `g5enr-personalities` with nothing
behind it. **`audit-content-coverage.js` was counting undeclared tags the whole
time** — it prints a total, never names them and never fails, which is precisely
how five survived. `scripts/test-subsection-invariant.js` now names them and
fails the build; verified by reintroducing BOTH halves separately and restoring
the files byte-for-byte. Prefer reusing the id a sibling pack already uses
(`narration`, `figures_style`, `vrai_faux`, `word_probs`) over inventing a
one-item subsection.

### Enrichment chapters
```js
{ id:'g5enr-personalities', name:'…', icon:'👤', enrichment:true,
  examWeight:2, enrichmentNote:'Derived from syllabus, NOT a direct MIE chapter.' }
```
Gold "✨ BONUS" card; `examWeight: 0` excludes from exams.

### Past papers — 162 items, never gradable
Transcriptions (not PDF extractions) of real 2016–2024 PSAC questions. They push
to `window.PSAC_PDF_QUESTIONS`, ship in their own `past-papers.json`, and are
**never merged into `STATIC_QUESTIONS`**: none has an `answer`, and
`assignment-submit.js` grades through the sandbox. 63 carry `needsArtwork: true`
and are hidden (the artwork never existed in this repo). Read-only screen, no
scoring; `markScheme` powers an optional self-marking reveal.

### Dynamic generators
⚠ **A generator can only live in a `_manifest.js`.** In production question files
are fetched as JSON and never executed as scripts — only `file://` dev injects
them. `G5M_GENERATORS` (grade5-maths) is the only pack with any (12).
Generated ids come from `genId(prefix)`, never `Date.now()` alone —
`getMixedQuestions()` de-dupes by id and same-millisecond ids collapsed a whole
run into one question.

---

## Adding or changing questions — checklist
1. Write the file under `subjects/[pack]/questions/`.
2. Add it to `LOCAL_FILES[pack]` in `question_loader.js` (**`file://` dev only**;
   prod auto-discovers).
3. ⚠ **Bump `_CACHE_VERSION`** in the same file. Prod caches each subject's JSON
   in localStorage for 7 days — without a bump a child keeps the old set for up
   to a week and nothing in the UI explains why. Bumping also purges the old keys.
4. If you touched a **question factory**, apply it to all four copies (below).
5. If chapters changed, keep the SYLLABUS subsection map in step.
6. ⚠ If you added, removed, renamed or reordered a **chapter** — or added a pack —
   re-run `node scripts/build-subject-index.js`. `scripts/check.js` fails on drift,
   so this cannot ship stale, but it will stop the build until you do.

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
| Teacher assignment caps | `GUEST_LIMIT_DEFAULTS` (admin.js), the `coalesce()`s in `guest_assignment_limits()`, the seeded `mm_data` row |
| `REWARD_SLOTS` | app.js ↔ functions/questions.js |
| Kid vibe list | `KID_VIBES` (app.js) ↔ `:root[data-kid-vibe=…]` (style.css) |

⚠ **Reading the code is not a sufficient check for the factory copies.** Grep the
**built bundle** for the field. `learnMore` and `subsection` were each silently
stripped at build time for months while the source looked correct.

⚠ **`netlify/import-questions.js` used to be a FIFTH copy, and that cost 365
questions in production** (fixed 2026-09-08). Its private `_buildContext()` held
only `makeMCQ/makeNum/makeTF/makeMatch/makeSymmetry`, so six French files threw
`makeCloze is not defined` / `makeText is not defined`, were skipped with a
warning in a summary nobody read, and it uploaded **14,361 of 14,726** questions
— **measured live: 0 `text` and 0 `cloze` rows in the database.** It now loads
through `netlify/lib/questions-sandbox.js` (`loadCorpus()` / `loadPack()` /
`evaluateSources()`), the same module the question service and re-grading use, so
it can never drift again; `scripts/test-question-import-parity.js` fails if it
grows a factory or a `vm.createContext` of its own.

### The importer (`netlify/import-questions.js`)
Full write-up in `DB_IMPORT_GUIDE.md`. The three things worth knowing here:
- **`--check` (no credential, no network) · `--dry-run` (reads only) · no flag
  (upserts).** An unknown flag exits 2 with usage — it must never fall through
  to a live import.
- **Two-phase and fail-closed.** The whole corpus is validated before Supabase
  is contacted, so a broken file anywhere means **zero** writes. An unknown
  question `type` fails preflight; it is never coerced to MCQ.
- ⚠ **A protected row can never rewrite local source as `makeMCQ`.** Only
  `mcq`/`numeric`/`text` are regenerable, and even then the candidate file is
  re-executed through the real loader and compared before it is written.
  Backups + the answer-carrying conflict report go to `.import-conflicts/`
  (gitignored **and** given a `netlify.toml` 404 — a CLI deploy ships
  gitignored files).
- ⚠ **A clean re-import is "0 new, ~560 updated", not zero writes.** `makeMCQ`
  keeps a random 3 distractors, so the 580 questions authored with more than 4
  options change shape on every load. Churn, not drift.

---

## The landing page (`#screen-landing`, index.html)
The public front door, and the only screen most visitors ever see. Order:
nav → under-construction banner → hero → **measured stats strip** →
**How we teach** → subjects → what we offer → Game Zone → three ways in →
**free-while-we-build panel** → 3 steps → tutors → footer.
- ⚠ **PRICING IS HIDDEN, NOT DELETED.** The three priced tiers that used to sit at
  `#plans` were replaced by a "everything is free right now" panel, and the nav's
  Pricing link and the dashboard's `#pd-upgrade-btn` are gone/hidden. The machinery
  is untouched — `modal-plans`, `Store.listPlans()`, `purchase_*()` and the admin
  Plans tab all still work — so restoring it is a markup change. `#plans` is kept as
  the section id so any old anchor still lands somewhere sensible.
- ⚠ **The "How we teach" section is the product's actual claim**, not decoration:
  many simple questions covering the WHOLE syllabus beat a handful of very hard
  ones; difficulty rises Basic → Medium → Hard → Word Problems where harder means
  *applied*, never obscure. Keep new copy consistent with that — it is why the
  subsection split and the 4-level scale exist at all.
- ⚠ **Every number on this page is measured, and they go stale silently.** The
  stats strip carries a comment saying how to re-count. The page claimed "five
  learning games" in three places for two days after the seventh shipped.
- ⚠ Under 640px every `[data-carousel]` grid becomes a horizontal scroll-snap
  track with dots. **An overflow detector that does not stop at a scrolling
  ancestor will report every card as protruding** — they are off-screen by design.
- ⚠ Contrast on this page was the worst in the app: 20 text runs under 4.5:1,
  the footer disclaimer at **1.65:1**. Fixed 2026-09-06 by raising the alpha on
  `text-indigo-*/30..60` and moving the two CTAs from indigo-500 to indigo-600.
  ⚠ The colour is usually on an ANCESTOR (the `<footer>`, not the `<p>`), and every
  card is a translucent white over a gradient with no opaque background anywhere —
  a naive contrast probe reads `rgba(255,255,255,.05)` as the ground and reports
  1:1 for white text. Composite the layers over each gradient stop and take the worst.
- Tap targets: the nav controls were 32–36px and the carousel dots **8px**. The dots
  are now 16×44px via `padding` + `background-clip: content-box` (+ explicit
  `box-sizing: content-box`, or Tailwind preflight's border-box eats the padding),
  so they look identical and measure 5.5x the area.

## Grades, pricing, and `comingSoon`
- **Registered: grades 1–9.** Live: **4, 5, 6**. The other 30 packs are
  `comingSoon: true` placeholders (one manifest + one sample question).
- **Grades 1–2 are free forever; 3–9 are paid.** Permanent, and deliberately
  stated separately from the fact that **everything is free right now** while the
  app is being built. ⚠ That second promise carries **no end date anywhere** —
  `FREE_UNTIL_LABEL`, the `data-free-until` spans and `_applyFreeUntilLabel()`
  were all removed. The copy says "free right now, paid plans later"; do not
  reintroduce a deadline without changing every surface at once.
- **Grades 1–6 = PSAC; 7–9 = NCE.** `_gradeStage()` / `_PSAC_MAX_GRADE = 6` is
  the single definition. ⚠ The five subjects registered for 7–9 are a
  **placeholder copy of the primary five** and are not confirmed against the MIE
  lower-secondary syllabus. Confirm before writing any question there.
- ⚠ **Coverage copy stays "Grades 4–6" everywhere** — that is what a child can
  actually practise today.

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
`_populateGradeSelects()` fills anything with `data-grade-select`:
`"live"` = grades with a non-`comingSoon` pack (**parent-facing**: family setup,
add child) · `"all"` = every registered grade (**authoring**: admin filters).
⚠ It runs twice — the script tags sit mid-`<body>`, so `#modal-qm-form` is not
parsed yet at first run. `DOMContentLoaded` catches the rest.

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
| Parent PIN, when it mints a session | `netlify/functions/parent-pin-signin.js` + `parent_pin_attempts` (service role) | `_pinMatches()` — a local convenience check only |
| Parent's own `lockedChapters` | client only — **deliberate**: the parent is not the adversary, and per-child server filtering would make the question cache per-child |

Ordering that is the whole feature, in `questions.js`:
- **expired** ⇒ allowed list becomes *exactly* the live entitlements, even on an
  unlimited plan and even with plan enforcement off.
- **not expired** ⇒ entitlements are *added* to the plan. Buying is never subtractive.
- Free grades bypass the plan list and expiry, but **not** moderation blocks or
  the admin kill switch.

⚠ `security_events` rows prefixed `client:` are **hints, not evidence** — a real
attacker does not call `flag_security_event()`. Never build enforcement on one.
A referral burst is flagged, never auto-blocked: a genuinely popular referrer
looks exactly like a farm for the first few hours.

---

## Data & storage

### The progress blob (`DB`, → `student_progress.data`)
`stats` · `chapters[id].{attempted,correct,last}` · `examHistory` ·
`daily` · `mistakes` · `assignments` · `restrictions` · `dailyGoal`.
New keys go in `Store._defaultStudent()` so the key-merge in
`loadStudentProgress()` backfills every existing child for free — and so there is
**no new column-level GRANT to forget**.

| Key | Shape | Cap |
|---|---|---|
| `daily` | `{'YYYY-MM-DD': {a, c, e, s, g, ch:{id:[att,corr]}, asg:{…}}}` | `_DAILY_KEEP` 120 days, `_DAY_CH_KEEP` 12 chapters/day |
| `mistakes` | newest-first | `_MISTAKE_KEEP` 60 |

- ⚠ **Day keys are Mauritius days (`_muDayKey`), never the device clock.** A child
  changing timezone would otherwise rewrite their own history. `YYYY-MM-DD` is
  chosen so a lexicographic sort *is* chronological; the prune relies on it.
  **One deliberate exception**: calendar squares are keyed on the *local* date,
  because the squares are local dates.
- **Attribution**: exam and assignment answers do **not** write `daily[].ch` —
  each already has a dated row of its own (`examHistory`, `completed_at` / `asg`).
  Day totals `a`/`c` still count every answer whatever the source, and chapter
  mastery (`DB.chapters`) still counts exam answers.
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
(`_pendingSince` + `_SAVE_MAX_WAIT_MS`). It used to reschedule on every answer,
so steady practice produced **zero** server writes and only exam submit
(`immediate: true`) ever got through.
- `clearStudentSession()` / `saveStudentSession()` **flush before** touching the
  stored session; `endStudentSession()` **awaits** the flush before the RPC
  (after it, `current_student_id()` is null and RLS refuses every write).
- `visibilitychange → hidden` and `pagehide` flush. Not `beforeunload` — it does
  not fire reliably on mobile.
- `loadStudentProgress()` **keeps the local cache when its `stats.totalAttempted`
  is higher than the server's** — total answers only ever go up, so a lower server
  row is a strict ancestor. `assignments` stay special-cased (parent-written).
- `_cancelPendingFlush()` now genuinely means *discard*; nothing in the session
  path calls it.

### Question cache (`mm_qc_v<N>_<owner>|<subject>`, 7 days)
⚠ **The key carries the OWNER, and the owner is whoever authorised the fetch** —
a child's session id, or `adult`. It was the subject alone, on a device a whole
family shares, so the first child to open Maths cached the set the server had
filtered for *them* and the next child read it straight back. Same defect the
service worker was stopped from having; this copy simply outlived that fix.
- ⚠ **A handover must call `QuestionLoader.useStudent(id)`.** `STATIC_QUESTIONS`
  and `_done` are module state and **switching child never reloads the page**
  (`openStudentSwitch` and `pdSwitchStudent` are both in-page), so without it the
  next child inherits the pool outright and `_done` reports every subject already
  loaded — which defeats the owner-scoped key entirely. `reset()` truncates to the
  count captured at module load, so whatever the manifests pushed survives.
- ⚠ **The child's token beats the parent's JWT in `_buildAuthHeaders()`.** It
  preferred the JWT whenever one existed — and on a shared phone one always does,
  by design — so a child practising beside a signed-in parent was authorised as
  the *parent*, and `_resolveOwner()` gives a JWT no `studentExpiresAt`. That
  child's own expiry was never applied. A stored session belonging to a *different*
  child is ignored (the `pdSwitchStudent` preview case).
- ⚠ The purge tests `mm_qc_v`, **not** `mm_qc_` — `mm_qc_lru` shares the shorter
  prefix and was deleted on every page load, leaving eviction order arbitrary.
- `_LRU_MAX = 6` counts **slots, not subjects**: two children on one device
  compete for the same six. Deliberate — a lost bundle costs one refetch; losing
  the session token to the quota reads as "it keeps logging me out".
- `scripts/test-question-pool-isolation.js` (25 checks).
⚠ **This is the ONLY offline copy of the questions** — the SW deliberately no
longer caches `/functions/questions` (that response varies per caller).
- ⚠ **THE CACHE IS BUDGETED IN BYTES, NOT SLOTS** (`_BYTE_BUDGET = 3,400,000`
  characters, alongside `_LRU_MAX = 6` as a second, cheaper guard). Counting slots
  was fine while every subject was a similar size and stopped being fine the moment
  one was five times another. **Measured 2026-09-07:** grade6-french **1,413 KB**
  against grade4-science 237 KB; all fifteen live subjects **8.48 MB**; the six
  largest **5.64 MB** — i.e. six slots exceeded a ~5 MB quota on their own.
  ⚠ Sized so **a child's own grade always fits whole**. ⚠ **RE-MEASURED
  2026-09-08, after 525 items were added: Grade 4 2.78 MB, Grade 5 3.26 MB,
  Grade 6 3.29 MB against the 3.40 MB budget** — the headroom is down to about
  0.11 MB, from 0.36 MB. The largest bundle is now grade6-french at 1,508 KB and
  all fifteen come to 9.33 MB. **The next content addition of this size pushes a
  grade out of its own cache**, and the symptom is a child losing a subject
  offline with nothing in the UI to explain it. Re-run the budget test before
  writing another bank, and treat raising _BYTE_BUDGET as a trade against the
  5 MB origin quota (Grade 6 already puts the origin at 4.19 MB). Earlier figures
  were Grade 4 2.72 MB, Grade 5 3.04 MB, Grade 6 2.72 MB — that is the entire offline case, and cross-grade
  practice is the exception that evicts. A 3.0 MB budget was tried first and cost
  Grade 5 a subject.
  ⚠ **A size the index does not know is MEASURED, never assumed to be zero.**
  The recency index now stores `{u, b}` — use counter and size — and reads an
  older bare number as `{u: n, b: 0}`, filling `b` in from storage the first time a
  total is needed. Treating an unmeasured 1.4 MB entry as free space is how a budget
  stays in the code and stops doing anything.
  ⚠ There is nothing to strip from the payload: **74% of a French bundle is
  question + explanation + hint + options**, which is the teaching content and
  exactly what a child needs offline. The fix had to be eviction, not compression.
  `scripts/test-question-cache-budget.js` drives the real `_writeCache` with the
  real built bundle sizes through a storage stub that enforces a 5 MB quota, and
  fails if a grade stops fitting — rebuild the bundles first
  (`node netlify/build-questions.js`). `scripts/test-question-pool-isolation.js`
  covers the eviction order, the legacy index and the session token (42 checks).
- On `QuotaExceededError` (incl. Safari's `NS_ERROR_DOM_QUOTA_REACHED`, codes
  22/1014): evict and retry ×3. A non-quota failure evicts nothing.
- ⚠ **Recency is a monotonic counter, not `Date.now()`** — a grade's five
  subjects are written in the same millisecond and tie.
- ⚠ **`[]` is never written or read back as a hit.** An empty payload is a real
  answer (fully gated account) and caching it handed a child an empty subject for
  a week with no recovery.
- Eviction only ever touches this cache's own `mm_qc_` keys — never the session.
  (A silently failed `localStorage` write is also how `saveStudentSession()` lost
  a token and the app read as *"it keeps logging me out"*.)

### `QuestionLoader.loadSubject()`
⚠ `_done` is rolled back when a load **failed**; only "the server says you get
nothing" stays `true`. Marking a failed load as done left a subject permanently
empty for the session. `startChapterDirect()` retries **once** and then shows a
real message — an unbounded retry through resolved promises pegged the CPU at
20,000 iterations/second and killed the tab.

---

## Auth & sessions

### Two credentials, two worlds
- **Adults** (parent/teacher/admin): a Supabase JWT, `auth.uid()`.
- **Children**: no JWT. A PIN → an opaque session token, stored **SHA-256-hashed**
  in `student_sessions` with an expiry, sent as `x-student-token`, resolved by
  Postgres `current_student_id()` and by `netlify/lib/student-auth.js`
  (`resolveStudent(headers)` — same header, same digest, same expiry bound).

⚠ **Fails closed with no service key.** The old check treated a missing key as
"skip", turning one config mistake into an open endpoint. A fail-closed change
must be paired with a check that its dependency is configured in the target
environment — that omission took the whole app down on the first CLI deploy.
⚠ Missing / expired / revoked all answer the same 401. A student **UUID is not a
credential** — it is permanent client state; only the token proves possession.
⚠ The questions auth cache is keyed on the **token**, not the student id, so
revocation actually takes effect. A 503 is never cached.

### ⚠ Email is a scarce, shared resource
- **Password recovery has two routes, and only one needs email.** A parent still
  signed in changes their password in Account & Settings (`Auth.changePassword`
  → `updateUser`) with no email at all. A parent who is signed out needs the
  reset link, which **is** capped — so `admin-account-recovery.js` also takes
  `action:'set_password'`: the server generates a temporary password, sets it
  through the service role, and returns it **once** to the administrator, who
  passes it on out of band. Nothing is emailed.
  ⚠ The password is in the response and **nowhere else** — not the log line, not
  the `security_events` row. ⚠ An admin may not set a **peer admin's** password
  unless they are super admin; that would be a straight privilege grab between
  equals. Every use writes `security_events kind='admin:password_set'`
  (`service_role` has the INSERT grant — checked, not assumed).
- ⚠ **The parent PIN can NEVER be a password-reset credential**, and a
  PIN-minted session may not change the password either. It can sign a parent
  back IN on a browser that already knows them (see The parent PIN), and that
  is the whole of its reach. On a new device — the actual "I forgot my
  password" case — there is no remembered parent to sign in as, so the PIN is
  not even applicable; and letting four digits REPLACE the password they stand
  in for is the one move that turns a shoulder-surfing child into an account
  takeover. `Auth.isPinOnlySession()` refuses it in **both** password forms
  (`changePassword` in auth.js, `_saveProfilePassword` in app.js — two hand-written
  copies of one action, so both check or the guard is decorative).
- ⚠ **`emailSignUp()` routes off the RESULT, never a stored assumption about the
  project's email setting.** `signUp()` returns a live session when
  `mailer_autoconfirm` is on and none when it sends a link, so the branch is
  `if (data?.session)` → `_handleParentSessionGated`, else the check-email
  screen. Hard-coding either one strands every new parent on the wrong screen the
  day that setting is flipped.
- ⚠ **Every sign-up, resend and password reset spends ONE email from ONE shared
  quota.** `_emailErrorText()` separates the two situations GoTrue returns behind
  the same 429 — `over_request_rate_limit` (the 60s per-address floor, the
  caller's own doing) from `over_email_send_rate_limit` (the project-wide cap,
  which no amount of retrying clears) — and leaves anything it does not recognise
  with its ORIGINAL wording, because an invented friendly message over an unknown
  fault is how a real bug becomes unreportable.
  `scripts/test-email-errors.js`.

### ⚠ `x-student-token` must never touch `/auth/v1/`
It is not CORS-safelisted, so it turns the parent's token refresh into a
preflighted request GoTrue rejects — the parent's session then dies silently
about an hour later. `_sbIsAuthRequest()` in `engine/supabase.js` is a
**deny-list on the auth path**, not an allow-list on `/rest/v1/`; an unparseable
target is treated as auth.

### Who owns the device
A shared phone holds both sessions at once. `_markActiveMode()` records who most
recently signed in **on purpose** — a student PIN login, landing on the parent
dashboard, `exitParentMode()`. ⚠ **Never on a restore**, or every reload
re-crowns the parent (which is exactly the bug: `init()` used to check the parent
session first and `return`, throwing the child into the parent dashboard on every
cold start). With no record, a stored **student** session wins.
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

### The parent PIN
⚠ **CHANGED 2026-09-06: the PIN is now a real credential.** It used to gate a
UI switch and nothing else, and a correct PIN could still end at "signing in
again needs your email and password" whenever the refresh token was genuinely
dead. It now signs the parent back in through the server. Two copies exist and
they are not equivalent:
- `localStorage` `psac_parent_pin_v1` = `btoa(pin + ':psac_v1')`. **Still base64,
  still not a hash** — `atob()` gives the PIN straight back. It is a local
  convenience check, never proof of anything, and `_backfillDbPinFromLocal()`
  exists to read it back out and move legacy PINs to the server.
- `profiles.parent_pin_hash` = SHA-256 of `pin + ':psac_v1_db'`. **This one is
  the credential.** `profiles_select` is `id = auth.uid() OR is_admin()`, so
  only the owner and an admin can ever read it.

⚠ **The DB copy is unreachable from the browser in exactly the case it was
added for.** `_fetchDbPinHash()` reads `profiles` through the browser client,
which needs `auth.uid()` — which is what is missing when the session is dead.
So `_pinMatches()` can only ever compare against `localStorage` at that point,
and a **local miss is not a verdict**: a cleared localStorage, another browser
profile or a PIN set on a different device all left a CORRECT PIN failing
against nothing at all. `_submitParentPin()` therefore falls through to the
server on a local miss, and only a refusal from **there** shakes the pad.
Offline is the exception — nothing to ask, so a miss stays a miss.

All copy says **"in this browser"**, not "on this device":
localStorage is per origin + browser profile, so a preview URL, another browser,
a private window, or Safari's 7-day eviction all lose it.
`openParentPinSetup()` is the unguarded entry (Account & Settings → Security);
`_promptSetParentPin()` keeps its once-only first-run guard.

### Server-side PIN sign-in — `netlify/functions/parent-pin-signin.js`
`POST /api/parent-pin-signin {user_id, pin}` → service role verifies against
`profiles.parent_pin_hash`, then mints a session with
`admin.generateLink({type:'magiclink'})` → `verifyOtp({token_hash})` and returns
**only** `access_token` + `refresh_token`. The browser installs it with
`setSession()`. `scripts/test-parent-pin-signin.js` (36 checks) and the ladder + wiring in
`scripts/test-parent-pin-recovery.js` (51).
- ⚠ **`generateLink` GENERATES; it does not send.** That distinction is
  load-bearing — email is a shared ~500/day Gmail quota and a recovery path
  that spent one per attempt would exhaust it. Re-verify after deploy.
- ⚠ **Every kind of "no" answers the SAME 401 `invalid`**: no such profile, no
  PIN on file, disabled, closed, an admin, a wrong PIN, a malformed id. Any
  difference between them is an account-enumeration oracle. The branches exist
  only so the server log can tell them apart.
- ⚠ **An admin can never be entered by PIN.** Four digits in front of
  `is_admin()` is not a trade this project makes.
- ⚠ **The lockout is the only thing standing between 10 000 guesses and a
  parent account.** 5 wrong → a lockout, and **each lockout is twice the
  last** (15m, 30m, 1h, 2h ... capped at 24h), counted in `parent_pin_attempts`,
  which has **no grant to anon or authenticated at all**. Deliberately NOT a
  column on `profiles`: `profiles_update` lets a parent update their own row
  with no column restriction, so a counter there could be zeroed by the very
  session an attacker is trying to obtain. A per-IP burst cap sits in front of
  it, best-effort (module scope, one Lambda container).
- ⚠ A mint failure is **503, never 401** — telling a parent their correct PIN
  was wrong is how an evening is spent retyping four right digits.
- ⚠ The **salt `:psac_v1_db` is hand-copied** into `engine/auth.js`
  (`_hashPinForDb`) and the function. Drift means a stored PIN silently stops
  matching with no error anywhere; the test asserts both literals.
- ⚠ `psac_parent_uid_v1` is a **separate** localStorage key from the stash and
  is never cleared with it. The stash holds a refresh token that can
  legitimately die; this holds only WHICH parent this browser belongs to, which
  stays true afterwards and is the subject the endpoint needs. Keeping it
  inside the stash is how a verified PIN ended up with nobody to sign in as.
  It is **not** a credential — a user id is permanent client state; only the
  PIN proves possession.

⚠ **A correct PIN must never dead-end on "your sign-in expired".** The PIN
cannot mint a session, but a **refresh token** can — and supabase-js deletes its
own persisted one the first time a refresh fails (a tunnel, a sleeping phone),
which is indistinguishable from a revoked session. `_ensureParentSession()`
escalates instead: read → re-read (still restoring) → `refreshSession()` →
**`refreshSession({refresh_token})` from our own copy** in `psac_parent_sess_v1`,
rewritten on every auth event because rotation makes a stale copy worse than
none. Same origin, same localStorage, no new exposure — `persistSession` already
writes that value under `mm_sb_auth`.
- ⚠ Step 4 runs **only last, and only once**: replaying a rotated-out token can
  revoke the whole family server-side. A **refusal** drops the stash.
- ⚠ **Only a refusal.** This used to drop the stash on ANY failure, so one 502,
  one captive portal, one connection dropped mid-flight — none of which say
  anything about the token — disarmed the recovery permanently, and every
  correct PIN afterwards dead-ended. `_isTokenRefusal()` calls 400/401/403 a
  verdict, 5xx/429/408 the network, and falls back to the message (GoTrue names
  a dead token; a network failure says "Failed to fetch"). Erring towards
  KEEPING it is the safe direction: replaying a dead token costs one refused
  request, dropping a live one costs the parent their account on this device.
- **Step 5 is the server** (`_pinServerSignIn`) — see Server-side PIN sign-in
  below. Reaching the "could not reach your account" message now means BOTH
  routes are gone, which is why that copy no longer implies the PIN was wrong.
- ⚠ The stash is cleared **only on a deliberate sign-out**, never in the
  `SIGNED_OUT` handler — supabase-js emits that for a dropped refresh too, which
  is the exact case being recovered from.
- ⚠ A successful re-mint **emits `SIGNED_IN`**, so `_suppressAuthEvents` keeps
  `onAuthStateChange` out of the routing the caller is already awaiting. It is
  scoped to **that arm only** — `SIGNED_OUT` is always honoured, including the
  one `_handleParentSession()` raises for a disabled account, or `_parentUser`
  survives the refusal and the next sign-in opens the dashboard anyway.
- ⚠ **Offline is not "signed out"** — the ladder stops at the first read and the
  copy says so; the token may be perfectly good and merely unverifiable.
- ⚠ **`session-invalid` is not always the CHILD's session.** `_activeAccount` is
  set for a parent *previewing* a child too, and that path has no student token —
  its writes go through the parent's JWT. The handler used to answer a refusal
  there by clearing the child's session and dropping the parent onto the student
  PIN screen reading "Your session has expired". It now renews the parent's
  session in place and says nothing; `_parentProfile` is the discriminator.
- `init()` consults the stash too, gated on it existing so a first-time visitor
  makes no network call — otherwise the same lapse still logged a parent out on a
  plain reload, with no PIN involved to hint why.
- `scripts/test-parent-pin-recovery.js` (25 checks, scripted `_sb` stub).

### Other session rules
- Every fresh student PIN login bumps `session_version`; a 5-minute guard logs out
  a mismatch ("account accessed on another device"). `pdSwitchStudent` passes
  `bumpSession: false`.
- One-tap child login links: `?join=<token>`, 32 random bytes, **single use**,
  48 h, **SHA-256 stored only**, and **never carrying the PIN** (a PIN never
  expires, so a forwarded screenshot would be a permanent key).
  `_tryJoinLink()` runs before every routing decision and signs out any parent
  session on that device first.
- `psac_known_students` (cap 8) remembers family name + username per child for
  quick sign-in. ⚠ **Never the PIN.** The fields are *hidden, not emptied* —
  `checkStudentReady()` / `studentSignIn()` still read them.
- ⚠ **A parent previewing a child is NOT a student login.** `pdSwitchStudent()`
  reaches `_loginStudentRow()` with **no token**, and that path must not persist
  a student session or stamp `_markActiveMode('student')` — a tokenless session
  is a credential nobody can use, so the next reload resumed it, found no token
  and answered "Please sign in again to continue." on **every** refresh. One tap
  on a child's card in the parent dashboard poisoned the device permanently.
  Routing therefore reads a tokenless stored session as **absent**
  (`_storedStudentSession()`), which also heals installs already poisoned.
- The student-switch PIN pad holds **no auth logic** — it fills the same three
  fields and calls the same `studentSignIn()`. ⚠ `_showAuthError()` is routed
  into the modal while it is open, or the wrong-PIN message is written to a
  screen nobody can see.
- Referrals: `?ref=CODE` captured before routing. `referral_code` (public, for
  WhatsApp) is deliberately **not** `families.family_code` (private join secret).
- ⚠ **Forum ownership is `author_id`, never the display NAME.** `canDel` compared
  `author_name` to the caller's own name, which gave two parents with the same
  name a delete button on each other's posts (the database refused, so the button
  was simply a lie) and gave an **admin** no delete button at all — while
  `posts_delete`/`replies_delete` have allowed `is_admin()` the whole time.
  Being an admin is a property of the ACCOUNT, not of which screen they are on,
  so `Auth.isAdmin()` applies in the ordinary parent view too.
  ⚠ **41 of the 42 live forum rows have `author_id = NULL`** — written before the
  `forum_set_author` trigger — so their authors can never satisfy the ownership
  arm of the policy and `is_admin()` is the only way they can ever be removed.
  Verified as `authenticated` in a rolled-back transaction: a parent's DELETE of
  someone else's post matches **no rows and raises nothing**; the admin's removes it.
- **The forum is adults-only, in the database** (`auth.uid() IS NOT NULL`), not
  by hiding the button. A child session is anon and is excluded by construction.
  `_ADULT_ONLY_SCREENS` in `showScreen()` covers every route in.

---

## Database

### One file: `supabase-schema.sql`
**There is exactly one .sql file at the repo root, and it is generated, not
written.** On 2026-09-06 the 31 incremental migrations (every `supabase-*.sql`,
plus `guest.sql`, `report_error.sql` and `migrations/`) were replaced by a
single dump of the live database. Every one of them had already been applied.

This has happened before: the previous `supabase-schema.sql` replaced 24
incremental files on 2026-08-26, and 31 more accumulated in the eleven days
after. **Expect the same drift, and regenerate rather than adding a file.**

| Thing | Where |
|---|---|
| The schema | `supabase-schema.sql` — 48 tables · 144 constraints · 121 indexes · 105 functions · 10 triggers · 77 policies · 1 093 grants |
| Regenerate it | `SUPABASE_ACCESS_TOKEN=sbp_… node scripts/dump-schema.js` |
| Test it | `scripts/sql-tests/run-schema-tests.sh` |

⚠ **Do not hand-edit `supabase-schema.sql`.** Apply the change to the database,
then regenerate. The file's whole value is that it says what is *deployed*, not
what someone intended — which is the difference that has cost this project the
most time. `scripts/dump-schema.js` carries the traps that make the dump
correct (the `NOTNULL` postfix-operator alias that silently deleted every NOT
NULL, constraint ordering by kind, deferred defaults found via `pg_depend`,
`check_function_bodies`, the pinned `search_path`); read its header before
changing it.

⚠ **Verified 2026-09-06, not asserted:** a database rebuilt from this file alone
on `postgres:17-alpine` matches production on **1 969 catalogue objects** —
every column with its type, nullability and default, every constraint, index,
function body, trigger, policy and grant. The only differences are the two
explained in the file. Re-measure with `scripts/sql-tests/run-schema-tests.sh`
plus the comparison it describes; do not carry that number forward.

⚠ **The file is a snapshot, not a diff.** It drops nothing, so anything added to
production later survives a re-run — but it *overwrites* function, policy and
trigger bodies with the ones recorded in it. **Regenerate before you re-run it,
or you roll a later fix backwards.**

⚠ **Applying it to production is no longer a pure no-op.** §12 backfills an
owner row per family and production is missing 9 of them (measured 2026-09-06).
That is the intended convergence, but know it before you run it.

⚠ **The live database cannot tell you whether the file works.** Applying it to
production only proves it is idempotent against a database that already has
everything. Both ordering bugs it has had — a foreign key emitted before its
target's primary key, and a column default calling a function not yet created —
were invisible until it was built **from nothing**. That is what step 1 of
`run-schema-tests.sh` does.

### Two things in the file are deliberately NOT applied
`supabase-schema.sql` ends with two blocks that need a human decision:
1. **`families_name_unique_ci`** — self-skipping, because two families are both
   named "gobin" (see Pending). It warns instead of failing.
2. **The `families_own` fix** — commented out. See the security finding in
   Pending; a co-parent can currently take over a family.

### ⚠ Four rules that have each cost real damage
1. **Never author a policy change from `supabase-schema.sql`.** It is stale.
   Query `pg_policies` on the live database first — writing against the dump once
   produced a policy that would have silently un-restricted the forum.
2. ⚠ **A policy's USING clause is checked on INSERT too — whenever the statement
   carries a `RETURNING`**, which PostgREST emits for every `.insert().select()`.
   So a USING predicate that has to **look the row up** answers false for a row
   being created in that same statement: it is `STABLE`, and the new tuple is not
   in its snapshot. The co-parent change rewrote `families_own` USING from
   `parent_id = auth.uid()` to `is_family_member(id)` and broke creating a family
   outright — for two days, four real parents, while every existing family still
   read back fine. ⚠ **The 42501 names the wrong half**: "new row violates
   row-level security policy" reads as a WITH CHECK failure and the WITH CHECK
   was passing throughout. Tell them apart by running both forms as
   `authenticated` in a rolled-back transaction — plain `INSERT` succeeded,
   `INSERT … RETURNING` did not. **Always keep a same-row column predicate in a
   USING clause you widen.**
3. **`public.students` has COLUMN-LEVEL SELECT grants** (so `pin`, `pin_hash`,
   `pin_attempts`, `pin_locked_until` stay unreadable). **Any new column inherits
   no grant**: every query touching it fails `42501 permission denied for table
   students`, a message that never names the column, and the client turns that
   into an empty result. Put a `GRANT SELECT (col)` beside every `ADD COLUMN`.
   (This is how adding `deleted_at` emptied the parent dashboard.)
4. **Grant `TO anon, authenticated` for anything a child calls.** A child session
   is `anon` + a token header. The friend RPCs were `authenticated`-only and dead.
   And check every function in a `revoke … from public` block actually has a
   matching grant — `purchase_subject()` did not.

### Other database facts worth keeping
- ⚠ **`public.profiles` has NO email column** — the address is in `auth.users`,
  which the browser cannot read and should not. So the admin members list could
  only identify an account by a display name the member typed themselves, which
  is worthless for telling two test accounts apart.
  `admin-member-emails.js` resolves them through the service role: **only for
  the ids asked for, only for an admin**, with no list/search/page, so it cannot
  enumerate the user base. Failures are logged and leave the line blank rather
  than toasting on every render.
- **Admin › Teachers shows what each teacher has DONE, not just who they are.**
  `profiles` holds a name, status and tier; whether a teacher ever set work
  lives in ten teacher-owned tables plus `auth.users.last_sign_in_at`, most of
  which an admin cannot read from the browser. `admin-teacher-activity.js`
  (service role, `requireAdmin`, ids only, capped at 30 — same shape as
  `admin-member-emails.js`) folds them via `netlify/lib/teacher-activity.js`
  into one summary per id: status bucket (active in 30 days / dormant / signed
  in but never set work / never signed in), last thing done and when, last
  sign-in, classes and pupils, assignments and results (total + last 30 days),
  materials, and a per-class + recent-guest-assignment breakdown. A table that
  cannot be read is NAMED in `partial` and shown as unknown, never as 0.
  `scripts/test-admin-teacher-activity.js` asserts every bucket.
- ⚠ **Deleting an account does NOT delete everything it owns.** `auth.users`
  cascades cleanly down `profiles → families → students →` sessions,
  submissions, enrolments, push subs, friends, invites (verified against the
  live constraints, not the dump). But **five tables key their owner as `text`
  with no foreign key**, so the cascade cannot see them and every row survives:
  `student_progress`, `schedule_entries`, `study_schedules`,
  `student_assignments`, `login_events`. Production already carries one
  orphaned `student_progress` row. `admin-delete-account.js` purges them
  explicitly, and **collects the student ids BEFORE the cascade** — afterwards
  there is no way left to know which rows belonged to whom.
  ⚠ `security_events` is deliberately NOT purged: its `user_id`/`student_id`
  carry no FK precisely so the audit trail outlives its subject.
  ⚠ Admin delete is **permanent**; `Store.deleteMyAccount()` is the soft one
  (`profiles.deleted_at`, `auth.users` kept so a parent can restore). Do not
  confuse them, and keep Disable as the reversible option in the UI.
- A `DELETE` whose RLS policy matches no row returns **no error and no rows**.
  Use `.delete().select('id')` and treat zero rows as failure — reading that as
  success is how a deleted child came back and became a duplicate.
- Soft delete everywhere: `profiles.deleted_at`, `students.deleted_at`, partial
  unique index `students_live_username_key … WHERE deleted_at IS NULL`. The
  `auth.users` row is **deliberately kept** so restore works and re-signup lands
  on "you already have an account".
- ⚠ Fall back to an older column list **only** on a genuine missing-column error
  (42703 / PGRST204). Falling back on *any* error once dropped the
  `deleted_at IS NULL` filter and resurrected deleted children.
- Privileged columns (`role`, `is_super_admin`, `disabled`, `expires_at`,
  `referral_code`, `credits`, `blocked_until`, `students.expires_at`) are
  protected by BEFORE UPDATE triggers, because `profiles_update` allows a parent
  to update their own row with **no column restriction** — a one-line PostgREST
  call used to grant `role: 'admin'`. Deliberately **not** guarded, each for a
  reason: `teacher_status` / `teacher_tier` (a non-admin applicant writes them,
  and `role` is guarded anyway), `session_version` (anon `verify_student_pin`
  bumps it), `profiles.deleted_at` (the owner's own).
- `credit_ledger`, `chapter_entitlements` and `security_events` have **no
  insert/update/delete grant at all** — stronger than a policy, because a later
  policy mistake cannot open a hole with no grant behind it.
- ⚠ **Family setup is a three-step wizard with no transaction** — profile, then
  family, then the first child. A failure at step 2 or 3 leaves earlier rows
  written, so `createProfile()` and `createFamily()` **resume on 23505** rather
  than failing: the profile PK can only be the caller's own row, and
  `families.parent_id` is UNIQUE, so "you already have one" is probed via
  `getMyFamily()` and never confused with the family-NAME collision that shares
  the same SQLSTATE. Both now return `{_error:{code,message}}`; a bare null hid
  a `42501` behind "Error creating profile. Please try again."
  A **profile with no family is that interrupted setup**, and
  `_handleParentSession()` routes it back to family-setup — but only when
  `Store.lastFamilyError()` is empty (the query *answered* "none") and only for
  `role === 'parent'`. Routing a failed READ there would write a second family
  over one that exists; an admin legitimately has no family of their own, and a
  co-parent's arrives via `my_member_family()`. Covered by
  `scripts/test-setup-recovery.js`.
- `Store.getMyEntitlements()` / `getFamilyEntitlements()` return **null** on
  failure, never `[]`. `[]` is a real answer ("owns nothing") and conflating them
  made a flaky network silently re-lock chapters.
- Queries that gate login must never reference a column an un-migrated database
  might lack — hence `getMyPreferences()`, `getAccountDeletedAt()` and
  `referral_code` are fetched **separately** from `getProfile()`.
- Read a family's children in **one** query (`student_id=in.(…)`), not one per
  child, and mark every requested id fetched hit *or* miss so a child who has
  never practised is not re-queried on every expand.

---

## UI, CSS and layout traps
- ⚠ **Never add `transform`, `translate`, `filter` or `contain` to `.screen`,
  `main` or `body`, even as an animation.** A transformed ancestor becomes the
  containing block for every `position: fixed` descendant — this is what put the
  practice Check/Next bar off-screen. Screen-transition keyframes are
  opacity-only for this reason. If a fixed bar is reported clipped, walk its
  ancestors' computed styles before touching the bar.
- ⚠ **The practice Check/Next bar (`.pr-actions`) is `position: sticky`, not
  `fixed`** (changed 2026-09-08). Fixed pinned it to the bottom of the VIEWPORT
  however short the question was, so on a desktop browser the primary action
  floated in empty space: **measured 449px of empty gap at 1920×1080 and 809px
  at 2560×1440**, putting Check Answer ~620px below the last option. The bug is
  invisible on a phone, where content fills the screen — it only appears when
  the viewport is taller than the content, which is every desktop browser.
  Sticky gives both from one rule: in flow under the content when the page does
  not scroll, pinned when it does. After the change the gap is **0px at every
  size**, and at full scroll every element still clears the bar.
  - ⚠ `margin-inline: -1rem` cancels `<main class="px-4">` so the bar stays
    edge-to-edge on a phone exactly as the fixed version was. Removing it makes
    the bar read as a card rather than a toolbar.
  - ⚠ **`.pr-wrap` must NOT carry a `padding-bottom` reserve any more.** The old
    5.5rem existed to stop the fixed bar covering the last of the content; with
    a sticky bar that takes its own space in flow, the reserve becomes a 5.5rem
    hole between the content and the bar on every screen.
  - ⚠ Sticky's dependency is different from fixed's: it breaks inside an
    ancestor with `overflow` hidden/auto, not a transformed one. `body` carries
    `overflow-x: clip`, which leaves `overflow-y` visible and creates no scroll
    container — that is why `clip` was chosen over `hidden`, and the sticky
    header relies on it too. `body { overflow: hidden }` would kill both.
- ⚠ **MCQ options pair into two columns only when the option TEXT is short**
  (`.pr-answers-pair`, added by `renderAnswerArea()`, CSS at ≥ 700px).
  `.mcq-opt` is `width: 100%`, so on desktop four numeric options were four
  736px-wide bars each holding two characters. The test is on the content, not
  the viewport alone: a French comprehension option is a whole sentence, and
  half a column wraps it to four lines. The class is cleared at the top of the
  render, per the module-state rule — every other question type returns early,
  so a numeric item after an MCQ would inherit the grid.
- `scripts/test-practice-action-bar.js` (85 checks) guards both: the source
  rules, the gap at six viewports from 360×740 to 2560×1440, the phone bar
  staying edge-to-edge, the option pairing, 44px targets, and that the note and
  the explanation still clear the bar at full scroll. ⚠ **Verified to catch the
  bug** by restoring `position: fixed` and the `padding-bottom` reserve — the
  gap came back at 89/135/299/355px and 16 checks failed — then restoring
  `style.css` byte-for-byte (sha256 re-checked).
  ⚠ Two harness traps, both of which produce confident wrong numbers:
  poll for `typeof renderAnswerArea === 'function'`, **not** for `.pr-actions`,
  which is in `index.html` from the first byte and so races `app.js`; and read
  every element measurement into a plain number **before** re-rendering the
  answer area, because a detached node reports 0×0 and that reads as a collapsed
  layout rather than a late question.
- ⚠ **`style.css` loads AFTER the Tailwind Play CDN**, so an equally-specific
  rule of yours wins over Tailwind's — and a bare `display:flex` outranks
  `.hidden` (that is why `.pd-action.hidden { display: none }` is required, and
  why `.kid-hero` carries its own gradient instead of `bg-gradient-to-br`).
- ⚠ **The Play CDN only generates rules for classes present at its initial
  scan.** Markup injected by `innerHTML` later gets the class and no rule. Use
  inline styles there (`style="grid-column:1/-1"`), and **measure the width** —
  asserting the class is present passes either way.
- ⚠ **`body { overflow-x: clip }` behind `@supports`**, not `hidden`: `hidden`
  propagates to the viewport, makes it a scroll container, and breaks the sticky
  header in Safari.
- ⚠ **An `<option>` is painted by the PLATFORM, not by the page.** It inherits
  the select’s `color` and **never** its `background`, which computes to
  `rgba(0,0,0,0)` on every option unless something sets it — so the popup list is
  drawn on whatever ground the platform picks. `bg-white/10 text-white` on the
  family-setup grade picker therefore rendered "Grade 4 / 5 / 6" white on white,
  and all 31 selects in index.html carried the same latent defect. `style.css`
  now gives `option`/`optgroup` an explicit opaque pair per theme, plus
  `color-scheme` **scoped to `select`** (on `:root` it would repaint every native
  control in the app). Guarded by `scripts/test-select-contrast.js`, which
  measures all 31 in both themes and fails below 4.5:1.
- **`.pd-switch` is the promoted "Switch to student mode" bar**, and it sits
  **above** the `.pd-action` row rather than inside it. Handing the device over is
  the most frequent thing a parent does on that screen and the one they could not
  find — as one of eight identical tiles labelled "Student view" it read as a
  settings item, which is why the app carries a one-time nudge pointing at it.
  ⚠ Promote by **altitude, not by colour**: a louder tile inside the row would
  break the single shape language that row exists to have, and put a second CTA
  beside "Add child". Measured by `scripts/test-switch-mode-button.js` — at 360px
  (re-measured 2026-09-06) it is **296px** wide and **5.3x the area** of the
  largest tile, clears 4.5:1 on both gradient stops, and adds no horizontal
  scroll. It is narrower than the student-side twin (328px) only because the
  chalkboard frame pads `#screen-parent`; do not break it out of that padding.
  ⚠ **The two mode switches are ONE control in two directions and must paint
  identically.** `.student-parent-switch` on `#screen-dashboard` /
  `#screen-subject-select` sends the child to the parent gate; `#pd-student-view-btn`
  on `#screen-parent` hands the device back. All three are `.pd-switch` and all
  three are deliberately left OUT of their screen's chalkboard repaint — the
  student side always was (`#screen-dashboard .student-parent-switch` is an
  explicit no-op marker), and `#screen-parent .pd-switch` used to mute the
  gradient to `rgba(99,102,241,.45)`, which made the parent-side bar read as a
  panel rather than the button its twin is. Removed 2026-09-06; a scratch CDP
  probe compares `background-image`, border, radius, padding, shadow and both
  label colours/sizes across all three in **both themes** and they now match
  exactly. ⚠ `test-switch-mode-button.js` hard-codes the stops `[79,70,229]` and
  `[124,58,237]` for its contrast maths — it was measuring the base gradient
  while the screen painted the muted one, so it was passing against a colour
  that was not on screen. Keep those two numbers in step with `.pd-switch`.
  ⚠ The ids stay `pd-student-view-*` and the seen-flag stays
  `psac_student_view_guide_seen` — renaming that key would re-show the onboarding
  nudge to every existing parent.
- ⚠ **Do not share a class name between two components.** `.nav-btn` was both the
  exam question-navigator cell (32×32) and the student tab bar, so tab labels
  spilled out of their buttons on every phone. The tab bar is `.tabbar-btn`.
- Header: below 1100px everything collapses into one labelled **`☰ Menu`**.
  ⚠ The sheet rows are **built from the live header buttons**
  (`_buildHeaderMenu()`), never hard-coded — which controls exist is decided in
  half a dozen places. Icon-only was tried and rejected: an emoji alone is a
  guess, and vertical space is not worth comprehension.
  **Logout keeps a labelled twin (`#header-logout-mobile`)** and never hides in
  the menu (`_MENU_EXCLUDED`).
- Fixed-width grids (`.fam-head` / `.fam-row`) share explicit rem columns because
  two separate grids with `auto` columns cannot align. ⚠ Header labels must stay
  short — a fixed column overflows rather than widening. An inline
  `display:flex` on a cell will silently beat the mobile `display:none`.
- `.pd-tabbar` is `flex-wrap: wrap` with **`flex: 1 0 auto`**; `flex-shrink` must
  stay `0`. A horizontal scroller measured worse — it hid 2 of 5 tabs.
- A centred flex child taller than the viewport gets its top clipped with no way
  to reach it — long modals need `overflow-y: auto` + `my-auto`.
- iOS: any form control under 16px zooms the page in and never back out — a
  `@media (pointer: coarse)` rule raises only `.text-sm`/`.text-xs` controls.
  `backdrop-filter` and `user-select` need `-webkit-` twins.
- ⚠ **No regex lookbehind anywhere.** `(?<=…)` is a *parse* error on Safari <16.4
  and would take the whole file down, not one feature. (`_syllabusPoints` uses
  `.match(/[^.!?]+[.!?]*/g)` for exactly this reason.)
- ⚠ **Line endings differ per file AND between the object store and the working
  tree** — git's autocrlf converts on checkout, so what `git show HEAD:file` gives
  you is not what is on disk. **Measured 2026-09-06 in this working tree:**
  `engine/auth.js` and `scripts/test-*.js` are **CRLF**; `index.html`, `style.css`,
  `engine/app.js` and `sw.js` are **all LF** — index.html is no longer the mixed
  file this note used to describe. **Do not trust this list either: measure the file
  you are about to edit**, preserve what you find, and prefer editing by line index
  over multi-line string patterns. A multi-line search
  string written with `\n` matches nothing in a CRLF file and reports "anchor not
  found" as though the code had changed. Normalise in memory, restore the file's
  own convention on write, and in `index.html` detect the convention **per
  anchor**.
  ⚠ Not theoretical: `scripts/test-family-setup-routing.js` extracted
  `_needsFamilySetup` with a `\n  }\n` pattern and had been reporting "could not
  extract" — which reads as "the function is gone" — while the function was
  present and correct the whole time.
- Everything user-supplied goes through `_attr()` / escaping — mistake rows,
  child display names and the digest email all carry typed input.

### Screen changes, dialogs and field names (added 2026-09-06)
- ⚠ **A panel that is not INSIDE a `.screen` is never hidden by anything.**
  `showScreen()` toggles `.hidden` on `.screen` elements only, so a full-page
  panel that has escaped its screen simply stays on top of whatever comes next.
  Two live cases, both measured 2026-09-07 and both fixed:
  - **`#admin-tab-questions` sat OUTSIDE `#screen-admin`** — one `</div>` at
    indent 4 closed the admin screen a panel early, and it was the last of the
    ten tab panels so nothing looked wrong. Admin → Question bank → 🔒 Parent
    hid the admin header, stats and tab bar and left the Question bank painted
    over the parent dashboard. It reads as **"the Parent button does nothing"**,
    which is how it was reported and why it cost a long hunt through
    `enterParentMode()` before the DOM was asked instead. ⚠ **Ask the DOM, not
    the indentation** — the file was perfectly tidy and nine panels were fine.
  - **`#tc-classroom-detail`** is a deliberate full-page overlay that is also
    not a `.screen`, and `showScreen()` had never heard of it. A teacher with a
    classroom open who tapped 🔒 Parent got the dashboard rendered under a
    1394×900 panel with `body.style.overflow` still locked to `hidden`, so the
    page could not even scroll. `showScreen()` now hides it — ⚠ but does **not**
    call `TeacherClassroomDetail.close()`, which would clear the remembered
    classroom that `psac_teacher_loc_v1` exists to restore, and it skips the
    case `id === 'teacher'` for the same reason.
  `scripts/check.js` → `checkScreenNesting()` matches each `<div id>` to its
  `</div>` by depth (skipping HTML comments) and fails any `.admin-tab-panel`
  outside `#screen-admin`. Verified to actually catch it by reintroducing the
  bug and restoring the file byte-for-byte.
- **`showScreen()` scrolls to the top and focuses the screen's first heading**
  (`_focusScreen`, only when the id actually changed). Before this, a child
  arriving from a long chapter grid landed mid-page and a screen reader stayed
  "on" a button that no longer existed. It runs synchronously, so a caller that
  focuses its own field straight after still wins.
- **Every `#modal-*` overlay gets the dialog contract from `_Dialogs`** (app.js,
  a MutationObserver on the `hidden` class): `role="dialog"`, `aria-modal`,
  labelled by its first heading (or `*-title` / `*-msg`), focus moved in, Tab
  trapped, **Escape closes through the modal's OWN close control** (backdrop
  handler, ✕, Cancel/Close/Not now…) so its cleanup runs, focus returned to the
  opener. Measured 26/26 get the role, 25/26 close on Escape;
  `modal-round-complete` has no close control by design. New modals need
  nothing — keep the `modal-` id prefix and the `fixed inset-0` wrapper.
- **`_labelUnlabelledFields()`** names any input/select/textarea that has no
  label from its placeholder, title or the short element before it. It is a
  fallback: write a real `aria-label` / `<label for>` (the login, sign-up and
  family-setup fields now have them).
- **The student tab bar is OFF on the practice screen** (`'practice'` is not in
  `_BOTTOM_NAV_SCREENS`). Two stacked fixed bars covered 155px of a 740px
  phone: 2 of 4 options visible on first paint, explanation hidden after Check.
  `_scrollPracticeFeedbackIntoView()` measures against the bar; `'nearest'`
  only cleared the viewport, not the bar.
- **Chapter cards inside the chalkboard subject hub keep their own ink.** The
  board's `h3`/`p` chalk overrides painted card titles cream on white (1.2:1
  in light mode). `.ch-card` rules under the override block reset it; measured
  13.0:1 light, 11.5:1 dark.
- **Focus ring is theme-neutral** (`:focus-visible` on buttons/links in both
  themes, two-tone). The old rule was `html:not(.dark)` only while dark is the
  default.

### The rough-working pad clears per SESSION, not per screen (2026-09-08)
`#scratchpad-practice` / `#scratchpad-exam` live in `index.html` and are never
rebuilt, so whatever a child drew stayed on the canvas for the rest of the visit —
leave a chapter, open another, and the last chapter's sums sat under the new
question. `_resetScratchpadForSession()` blanks it from the two screen observers.
- ⚠ **Keyed on the SESSION OBJECT's identity** (`S.practice.session`, `S.exam.qs`),
  never on the screen becoming visible and never per question. All five practice
  starts and both exam starts already assign a fresh object literal immediately
  before `showScreen`, so identity alone separates "a new session began" from
  "the child came back to the one they were in" — and a sixth entry point gets
  the behaviour for free, since it cannot start without resetting those counters.
  Clearing on visibility wipes the pad on any return to the screen; clearing per
  question wipes it mid-working, which is the one moment it is needed.
- ⚠ **A reset must restore the placeholder AND re-arm its one-shot listener.**
  That `pointerdown … {once:true}` handler has already fired and been removed by
  the time a session ends, so redrawing the faint prompt without re-adding it
  prints it under everything the child writes for the rest of the session. The
  stroke still lands, so a pixel count does not notice — assert the prompt state.
- ⚠ Clear whenever a 2d context exists, **visible or not**: a pad initialised in
  an earlier session keeps its strokes while its wrapper is collapsed, and
  `clearRect` works on a hidden canvas (the dimensions are the backing store's).
- `scripts/test-scratchpad-session.js` (19 checks, real PointerEvents on real
  pixels, no login — the pad's lifecycle is driven by session identity and the
  screen's class, both drivable directly; the "fresh session object" half is
  asserted against the source). Verified to catch both regressions.

### ⚠ Module-level UI state must be reset in the RENDER, not in the toggle
Otherwise the next child's panel, the next exam's results or the next subject's
grid opens in the last one's state:
`_examReviewWrongOnly` (in `renderResults`) · `_repShowAllMistakes` (in
`_renderReports`) · `_shopOpen` + the search box (in `renderShop`) ·
`_chapterFilter` (in `activateSubjectPack` — and it is declared **above** that
function, or the reference hits the temporal dead zone) · the round-review
collapsed state.

### The interactive map — one module, two surfaces
`engine/interactive_map.js` renders both the child's map (`GeoMap.render`) and
the admin editor (`GeoMap.renderEditor`) from one catalogue, one projection and
one set of marker markup. Keep it that way — every bug it has had came from the
two surfaces disagreeing.
- ⚠ **The box's `aspect-ratio` is defined in `ISLANDS` in the JS, not in CSS**,
  and is each base image's own ratio (755×874, 1700×1600). `object-fit: contain`
  then fills the box exactly, so *a percentage of the box is a percentage of the
  artwork* — on both surfaces. A second copy in `style.css` is how they drift.
- **Catalogue size: 88 Mauritius · 25 Rodrigues · 20 world**, every one on real
  lon/lat. Island categories: mountain · **crater** · river · waterfall · water ·
  coast · island · **plain** · reserve · cave · port · town · heritage.
- ⚠ **A river is a LINE, not a point.** Fifteen carry `line: [[lon,lat],…]`
  straight from OpenStreetMap, plus `labelAt` (0–1) saying how far along that
  course the pin and caption sit. `markerPosition()` walks the course by
  DISTANCE, so `labelAt` means "half way down the river" and not "half way
  through the point list" — otherwise the caption bunches wherever OSM happened
  to record detail. Everything else — labels, selection, the info card, the
  editor form — then treats a river exactly like a place.
- ⚠ **Dragging a river's pin slides the name ALONG it; dragging a course point
  reshapes it.** The course is surveyed data and the caption position is ours,
  so `setPosition()` on a line writes `labelAt`, never coordinates. Course
  points get handles only on the SELECTED river — every course at once is a few
  hundred overlapping targets.
- ⚠ **Two Mauritian rivers can share a name.** "Rivière du Rempart" names one
  river in the west and the northern one the district is named after; "Rivière
  du Poste" is in the south while the Flacq river is "Rivière du Poste de
  Flacq". Taking the longest stitched chain silently picked the wrong river and
  attached the wrong fact to it. `build-rivers2.js` therefore chooses a chain
  by a `near` point and **throws if the nearest match is over 12 km away**. Categories are
  mountain · river · waterfall · water · coast · island · reserve · cave · port
  · town · heritage (plus the world map's continent/region/ocean/volcano/
  latitude/longitude). Adding one is content work — write the row, re-run the
  three harnesses, done.
- ⚠ **Filter chips are island-aware** (`typesOn()`): only categories that
  island actually has. Eleven categories is already three chip rows on a phone,
  and offering "Caves" on the world map is a filter that can only empty the map.
- ⚠ **Above `LABEL_LIMIT` (15) visible pins the markers layer goes
  `.labels-quiet`**: only the selected or hovered caption is drawn. Fifty-eight
  captions at once is a wall of text, not a map — the category filters are how a
  child reads a group, tapping is how they read one place, and a hint line says
  so. **Therefore label offsets are solved PER CATEGORY**, because a filtered
  view is the only time a group's captions share the screen.
- ⚠ **Pin positions are real coordinates, and every one is sourced.** All
  came from OpenStreetMap (peaks carry a matching `ele`; reservoirs, parks and
  islands are the polygon's centre) — Wikipedia rounds several to 0.1°, i.e.
  11 km. One deliberate exception: **Gris Gris** is the island's southernmost
  point and sits ~40 m beyond the district bbox the artwork covers, so it is
  placed at the southern limit the artwork reaches.
  **Do not nudge a pin to make a label fit**; move the label (`lx`/`ly`).
- ⚠ **Each island has its OWN projection**, picked by island in
  `PROJECTIONS` — never by "this row happens to have a lon". Mauritius and
  Rodrigues are rectangular lon/lat boxes; **the world map is Robinson**.
  Mauritius = the district GeoJSON's bbox, and the base image's land spans it to
  within 1px (rasterised and measured). Rodrigues = the extent its Commons file
  page declares, and the island fills only 14.5–92.8% × 20.1–71.8% of that
  image. Both were hand-placed x/y grids with no geographic meaning before.
- ⚠ **The world artwork is Robinson, established by measurement.** Its SVG
  carries eight id'd country paths (Iceland, Czechia, Mongolia, Uzbekistan,
  Madagascar, Eswatini, Lesotho, Tasmania); fitting those against candidates
  picks Robinson by an order of magnitude — y rms **0.58px** on a 1538px canvas
  against 3.0 (plate carrée), 5.2 (Mollweide), 10.3 (Eckert IV). It also puts
  the poles at 6.95% and 97.72% of the height, which is exactly where the
  artwork's land starts and stops. Longitude is fitted to ~0.2% of width.
  **The Equator is at 52.33% of the height and the Prime Meridian at 47.54% of
  the width** — not 50/50, which is what the graticule used to assume.
- ⚠ **The world graticule is drawn FROM the projection**, not from evenly
  spaced CSS gradients: Robinson's parallels are not evenly spaced and its
  meridians curve. A card that names the Equator was pointing at the wrong line.
  `map-calibration` re-checks the Equator, Prime Meridian and pole positions on
  every run.
- ⚠ **Markers and districts project through `MAURITIUS_BOUNDS` only**, and the
  district `<svg>` is `viewBox="0 0 100 100" preserveAspectRatio="none"`. It used
  to derive its own bbox and fit uniformly, letterboxing the districts 6.8%
  against markers that fill the box — every coastal pin sat ~15px off its
  district. `MAURITIUS_BOUNDS` **is** the GeoJSON's bbox; verified, not assumed.
- ⚠ **A drag never repaints the canvas.** Repainting replaces the markers'
  innerHTML and destroys the button the pointer is on, so pointerup lands
  nowhere, the move listener survives, and the *next* drag moves two features.
  Selection mid-drag toggles a class and repaints the side panel only.
- Label offsets (`lx`/`ly`) live **on the feature**, not in a positional array
  indexed by `indexOf` — that gave every added feature one shared offset.
- Editor edits are a **draft** (localStorage, `psac-geo-map-draft-v2`) and never
  touch the array the child's map paints. **Publish** writes a *diff against the
  built-in catalogue* to `mm_data.geo_map_content`, so later code changes to a
  built-in fact still reach installs that have published something else. A
  built-in is `hidden`, never deleted.
- Publishing goes through `Store.mmSave` (awaited, returns `{ok,error}`), not
  `Store.mmSet` (fire-and-forget). Reporting "saved" for a write nobody waited
  for is how the old editor claimed success on a refused upsert.
- Three harnesses, all headless Chrome over a local static server, all under
  `/scripts/` (which 404s on Netlify):
  `map-editor-harness.html` — 33 self-asserting checks on the editor ↔ child
  correspondence · `map-calibration.html` — rasterises each base map and checks
  every pin samples the right ground (a reservoir marker SHOULD be on water; a
  mountain should not), checks every river along its WHOLE course rather than at
  one point, falls in the right district, and — for the world map,
  which has no district layer — pushes 47 known land and ocean coordinates
  through the shipped projection to confirm it still agrees with the artwork ·
  `map-label-solver.html` — recomputes `lx`/`ly` from the measured caption
  sizes · `map-world-fit.html` — re-derives the world projection from scratch;
  run it if the world artwork is ever replaced. Re-run the solver
  after adding or renaming a feature: offsets are absolute px against a
  percentage-positioned pin, so they do not survive a text change.
- ⚠ **A feature outside its island's bounds is silently clamped to the edge** by
  the percentage positioning, so it reads as a coastal feature rather than the
  error it is. Coin de Mire, Flat Island and Round Island are all north of the
  Mauritius artwork; the calibration harness fails any such pin outright.
- ⚠ **Land is a different colour on every base map.** `#fefefe` is the SEA on
  Mauritius; on the world map the sea is **transparent**, land is `#cccccc`, and
  **Antarctica carries its own `fill:#ffffff`** (ice) so white counts as land
  there. Each is a fact about that one file, not a convention.
- ⚠ **`#fefefe` is the SEA on the Mauritius base map**, not a neutral
  background — a bay, a lagoon islet and a marine reserve all legitimately
  sample it. The harness judges by feature type (a reservoir marker SHOULD be on
  water) and treats anything within 4px of land as "on the shoreline".
- ⚠ **Do not read a pin being "outside every district" as an error on its own.**
  The district polygons are generalised and do not quite tile; Pieter Both sits
  338 m outside the nearest one while being demonstrably on land and on its own
  peak. The calibration harness prints the distance so the two cases are
  distinguishable.

### My Timetable — list ⇄ calendar (2026-09-06)
`#screen-schedule` carries a two-button view toggle (`setTimetableView`,
remembered in `psac_timetable_view_v1`). The **list** is unchanged. The
**calendar** is a Monday-first month grid (`_ttCalendarHtml`) with big dates and
a chip per session in each square; tapping a square opens `#modal-tt-day` with
that day's sessions, the parent's note, chapter accuracy, **Start practice** plus
per-level buttons, what the child already did that day, and "Choose any chapter".
Both views paint from one load (`_ttData`) and both start work through
`startScheduledSession(subjectId, chapterId, forceDiff)` — that third argument is
new and optional.
- ⚠ **`#screen-schedule` is a CHALKBOARD in both themes**, so the grid needs the
  `#screen-schedule .tt-*` override block; the light-mode ink measured **1.1:1**
  on the board. The popup is outside the screen and keeps ordinary sheet colours.
- ⚠ `_ttMonth` / `_ttView` reset in `renderSchedule()`, per the module-state rule
  — otherwise the next child opens on the last one's month.
- ⚠ Chip **labels are hidden below 520px**: a 46px square cannot hold a word a
  nine-year-old can read, so the phone grid is colour + icon and the popup
  carries the words.
- Past days are dimmed, never tagged "missed" — the overdue tag belongs in the
  list, where a child can act on it (see `renderMyActivity`'s note).
- Day squares are keyed on the **local** date, the same deliberate exception the
  parent's calendar makes.
- `scripts/test-timetable-views.js` (58 checks, real headless Chrome at 360px and
  768px in both themes: grid shape, chips, month nav, the dialog contract,
  Escape, the difficulty cap, overflow, contrast).
  ⚠ Its contrast helper **composites translucent backgrounds**; taking the first
  background with any alpha reads a .07 tint as solid near-black and fails
  perfectly legible text at 1.2:1.

### Learning materials — sorting, three surfaces (2026-09-06)
`sortMaterials()` / `materialSortBar()` / `readMaterialSort()` live in
**`engine/helpers.js`** and are used by the teacher **Materials tab**
(`TeacherMaterials.setSort`, keys recent·oldest·subject·grade·title) and by a
classroom's **Materials section** (`TeacherClassroomDetail.setMaterialSort`).
The pupil's list on **`guest.html`** gets Newest·Subject·Name.
- ⚠ **`guest.js` carries its own copy** of the comparator — that page loads no
  engine file at all, by design. Change both together.
- ⚠ **"Date" means two different things.** `classroom_materials.assigned_at`
  (when the file was shared with THIS class) beats `learning_materials.created_at`
  (when it was uploaded, possibly for another class). Rows carry `shared_at`
  where the junction was read; the comparator prefers it and falls back.
- ⚠ **A row with no subject/grade sorts LAST**, never first.
- `classroom-materials.js` had **no ORDER BY at all**, so two identical requests
  could answer in different orders; it now orders by `assigned_at desc` and
  returns `shared_at` + `created_at`.
- One file gets **no** sort control on any surface. The classroom Work-tab
  preview stays newest-first whatever the Materials tab is sorted by.
- `scripts/test-materials-sort.js` (69 checks: comparator in a VM, wiring, then
  the teacher tab and the pupil page in real headless Chrome at 360px).
  ⚠ Its contrast probe needs the **KNOWN-surface table** the command-centre
  harness uses: a chalkboard gradient is a background *image*, so its computed
  `backgroundColor` is transparent and a naive walk measures chalk on white at
  1:1.

### The public contact form (2026-09-07)
`#screen-contact` (reached from the landing nav and footer) now carries a real
form — message · bug · suggestion · question · account help — open to anyone
with no account at all. It posts to **`netlify/functions/contact-message.js`**
(service role), which writes into **`question_reports`** with
`report_type: 'contact'` and `question_id: '__contact__'`, so a guest message
lands in the SAME admin queue as every other report. A second inbox is an inbox
nobody reads. The mailto stays underneath: it is the one route that still works
when the app itself is broken.
- ⚠ **A guest has no inbox**, so the admin card hides the in-app reply box for
  these rows and shows a **mailto** for the address they left (or says plainly
  that there is no way to answer). Replying in-app would write into nothing.
- The sender's name/email/browser go in the existing `\n__meta__` JSON the card
  already parses — **no schema change**, no new column-level GRANT to forget.
- ⚠ **The raw IP is never stored.** A 16-char salted hash goes in the meta, only
  so 3-per-15-minutes can be counted; there is also a 40-per-hour global brake.
- ⚠ Honeypot (`#contact-website`) is **off-screen, not `display:none`**, and a
  hit answers a plain success so a bot learns nothing from the difference.
- **Anti-spam layers, in the order they fire**: honeypot → too-fast (`elapsedMs`
  under 3 s, and an absurd or missing value counts as instant) → link count
  (> 2) and a three-real-words rule with **URLs stripped first**, or
  `https://spam.example/buy` counts as three words of its own → per-sender
  15-minute cap → hourly global brake.
  ⚠ The fill time comes from the client and is forgeable, exactly like the
  honeypot: these are bot filters, not security controls.
  ⚠ **An unknown sender is not an unlimited one.** No IP header used to skip the
  per-sender check entirely; unknown callers now share one bucket
  (`noip000000000000`) on a *tighter* cap.
  ⚠ **The rate limit fails CLOSED.** It used to allow the message through
  whenever the count could not be read, so one database hiccup lifted the limit
  — the same shape as the missing-service-key bug this project has paid for.
- **Admin → Reports** filters `All · 🚩 Question reports · 🌐 Contact form` **in
  the query** (`Store.loadReports(offset, limit, kind)` / `countReports(kind)`),
  never over one loaded page, plus per-row tick boxes, Select all shown and
  `Store.deleteReports(ids)`. ⚠ Bulk delete sends only ids that are **on screen
  now** — the selection Set can outlive a filter change — and reports the count
  the DELETE returned, never the count requested (`.select('id')`, zero rows is
  a failure).
- ⚠ `.contact-field` backgrounds are **opaque**: a translucent `<select>` is
  painted over the UA's own light control ground and white text vanishes — the
  same defect the option-contrast rules exist for. Fields are 16px (iOS zoom).
- ⚠ **The form is hidden after a send, never overwritten.** Replacing its
  innerHTML left a visitor who sent one message looking at the receipt for the
  rest of the session; `_resetContactForm()` runs from `showScreen('contact')`,
  per the module-state rule.
- ⚠ An undeployed `/api/` route answers with the SPA fallback (HTML, status
  404), so the client checks the content type before `res.json()`.
- `scripts/test-contact-form.js` (102 checks: the Lambda's rules against a
  stubbed PostgREST, the form in headless Chrome at 360px, and the guest card
  the admin actually sees).

### Sharing to WhatsApp — one panel, always (2026-09-06)
`TeacherWorkspace.shareText(title, text, url)` is **the** share path: assignment
links, reminders, and now materials (`TeacherMaterials.share(id)` and
`TeacherClassroomDetail.shareMaterial(id)`, both building the message with
`materialShareMessage()` in `engine/helpers.js`).
- ⚠ **The panel is never replaced by `navigator.share`.** It used to hand the
  whole job to the OS sheet wherever one existed — and that sheet lists WhatsApp
  only if the OS knows about it, which on a laptop it usually does not. The panel
  now always opens with **💬 Share on WhatsApp**, Copy message, Copy link, and
  **📤 More apps** (the native sheet) as one more button, called inside the click
  so the gesture is still live.
- ⚠ WhatsApp is a real `<a href="https://wa.me/?text=…">` the teacher taps —
  `window.open()` after an `await` is eaten by popup blockers.
- ⚠ **The share message states the link's lifetime** (`fmtMaterialExpiry`). A
  signed URL that dies silently reads to the recipient as a broken app.
- ⚠ `TeacherMaterials.getLink()` signed for a **hard-coded hour** and said so,
  whatever the teacher had chosen; it now takes the material id and uses the
  row's own `link_expiry_seconds`.
- ⚠ `.tc-share-wa-btn` ink is **dark green, not white** — white on WhatsApp's
  own `#25d366` measures **2:1**.
- `scripts/test-teacher-share.js` (43 checks: message building in a VM, wiring,
  then headless Chrome with `navigator.share` **stubbed present** — the point is
  that WhatsApp survives a device that has a native sheet — plus escaping, tap
  targets, overflow and contrast).

### Child-facing vs parent-facing, deliberately
- The child's activity recap is **unfiltered** — the parent's `_filters` live in
  `localStorage` per browser, and on a shared phone would silently blank the
  child's own record of their work.
- **There is no "missed sessions" list on a child's screen, and must not be.** On
  a parent's calendar an unticked row is information; on a child's it is a list
  of their failures served every time they open the app.
- Family overview is **ordered by who has been quietest, never by score**;
  ranking siblings is the wrong thing to hand a parent, and accuracy is not
  comparable across grades.
- A chapter with no attempts is reported as **not started**, never 0%.
- ⚠ Report copy says **"they"**, not "she". Nothing records a child's gender.
- The chapter card says **"correct"**, never "mastery" — `getChapterPct()` is
  accuracy, so 2/2 once read as "100% mastery ★★★". `_chapterProgress()` is the
  single reading used by both card and tiles; `attempted` counts **answers
  given**, not distinct questions seen, so the card never claims "12 of 19 done".
  ⚠ An unknown question pool (`total === 0`, grid painted before QuestionLoader
  answered) must **withhold** the mastery claim, not assume it.
- The daily goal deliberately does **not** drive the streak — breaking a 12-day
  streak because a nine-year-old managed three questions is a punishment no
  child-facing app should hand out. `daily[key].g` latches the celebration once
  per day.
- Reports and the digest use **rolling 7-day windows, not calendar weeks** (on a
  Monday a calendar week holds one day), and a previous window of zero renders
  "new", never +100%. "No dated history" means **unknown**, never idle — that
  distinction is the difference between an accurate digest and telling every
  parent their child has stopped working.
- Derived activity rows are **never written into `schedule_entries`**: that table
  is parent-editable, and storing actuals there would let a parent delete the
  record that a mock exam happened.
- A parent's own settings apply to children by **merge, never replace** —
  `lockedChapters` is per-child and must survive the write.

---

## Caching & deploy

### Version bumps
- **`SHELL_VERSION` (`sw.js`)** — bump on any change to a shell-cached engine
  file, or returning users never receive it. Currently **v198** (bumped 2026-09-08
  for lazy pack loading: `subjects/_index.js` joined `SHELL_FILES` and
  `engine/registry.js` changed). ⚠ Individual pack manifests are deliberately NOT
  precached — `PackLoader` fetches only the packs a child opens, and listing all
  45 would put the whole 323 KB back on first load.
- **`_CACHE_VERSION` (`question_loader.js`)** — bump when question content or the
  cache envelope changes. Currently **v39** (bumped 2026-09-07 for the two-part
  cloze envelope — `textB` / `gapAlts` / `gapsA` / `gapsB` / `twoPart`. A bundle
  cached before them has no part B at all, and the bump purges the old keys).
- ⚠ **Both numbers above are STALE in this file and go stale within the hour.**
  Read `sw.js` and `engine/question_loader.js`; do not quote these.
- ⚠ The SW shell list is all-or-nothing (`cache.addAll` rejects wholesale on one
  404). **Re-check `<script src="engine/…">` tags against `SHELL_FILES` on every
  deploy that touches them.**

### The shell is 632 KB, not 2.87 MB — what is NOT precached (2026-09-08)
Measured, then cut: the shell was **56 files / 2.87 MB over the wire**, of which
1.63 MB was media that does not compress at all. It is now **37 files / 632 KB**.
Three separate things came out, and each is a rule, not a one-off tidy-up:
- ⚠ **Static assets (`/assets/**`, `/fonts/**`) are NOT in `SHELL_FILES`** and
  live in the unversioned `ASSET_CACHE` — see the next section.
- ⚠ **Two precached photographs were 1.1 MB between them.**
  `mahe-de-labourdonnais.jpg` alone was **928 KB**, a third of the whole shell,
  at 721×1056 for a `max-height:220px` slot. Re-encoded to 340×498 → **28 KB**;
  `pierre-poivre.jpg` 167 → 36 KB. ⚠ `market.jpg` was tried and **reverted**:
  180 → 146 KB is not worth degrading a picture a child is asked to describe.
  Size every bundled image against the CSS box it is displayed in.
- ⚠ **`admin.js` + the five teacher files + `forum.js` are loaded ON DEMAND** by
  `RoleModules` (`engine/registry.js`) — 0.48 MB of source, 126 KB brotli, that
  every child used to download and parse for screens they can never open.
  - The order inside the teacher group is **load-bearing** and is now a list in
    one file rather than `<script>` tag order: the four helpers, then
    `teacher.js`, then `teacher_classroom_detail.js`.
  - ⚠ **Check a module is loaded by BARE IDENTIFIER, never `window.X`.** They
    declare `const AdminPanel = (() => {…})()` at the top level of a classic
    script, which lands in the global *lexical* environment and never on
    `window`; only `TeacherHome` and `TeacherInsights` assign themselves across.
    A `window.AdminPanel` probe reports a working module as missing.
  - ⚠ `showScreen()` stays **synchronous** — dozens of callers read the DOM
    straight after it. It shows the screen and renders when the module lands,
    exactly as a lazy subject pack does.
  - Verified safe before splitting: every reference from an earlier-loading file
    was already behind `typeof X !== 'undefined'`, all 81 inline handlers sit
    INSIDE their own screen, and the only unguarded-looking uses
    (`TeacherMode.getAttemptCount/hasRetry/saveResult`) are reached through
    `renderAssignmentEntrance()`, **which nothing calls** — dead code.
  - `scripts/test-role-modules.js` (22 checks: boots clean with none of the
    eight globals defined, nothing fetched, then each group arriving on demand).
    ⚠ Anchor any "was it fetched" regex on `engine/` — a bare
    `/(admin|teacher|forum)\.js/` also matches `engine/nce_paper_admin.js`.
- ⚠ **`SHELL_VERSION` churn is the multiplier on all of this**, and it is a
  process problem, not a code one: v232 → v249 in one working session, each bump
  re-downloading the whole shell for every returning user. Batch deploys.
- ⚠ Netlify's default is `public,max-age=0,must-revalidate` on **everything**
  (measured against production). `netlify.toml` now gives `/assets/questions/*`
  and `/fonts/*` a 30-day max-age — deliberately **not** the engine or
  `index.html`, and deliberately not `immutable`.

### Question images are BUNDLED, in their own unversioned cache (2026-09-08)
The bank used to hotlink its pictures from Wikimedia Commons. It no longer does:
**138 files, 11.9 MB**, served from **`assets/questions/`**. Two harnesses, and
they ask different questions: `scripts/test-question-images.js` asks whether a
picture reaches a child's screen (served as an image, decoded, fits 360px, alt
text does not leak the answer); `scripts/test-question-image-offline.js`
(15 checks) asks whether it is still there when the network is not, and whether
its licence is recorded.
- ⚠ **Hotlinking had already failed silently.** 24 of the 139 Commons files had
  been DELETED and were 404ing in production, in 27 live questions.
- ⚠ **The SW never caches cross-origin requests** (deliberately — see the note in
  its fetch handler), so every picture question was a broken icon offline.
- ⚠ **Commons now refuses direct ORIGINAL fetches**: `429 ... instead use
  thumbnail images in sizes listed on https://w.wiki/GHai`, `retry-after: 600`.
  An arbitrary thumb width is refused too (`400 Use thumbnail sizes listed on…`).
  Only certain widths are served — **120 and 250 were the only ones available**
  for the five files whose original is under 480px. Ask for a width *below* the
  original or the API hands back the original url and the fetch is refused.
  ⚠ **Commons also rounds a requested width UP to its own standard size** — asked
  for 1024 it served 1280. Measure the file, never trust `iiurlwidth`.
- ⚠ **`ASSET_CACHE` in `sw.js` is deliberately UNVERSIONED and `activate` keeps it,**
  and it now covers **all** of `/assets/**` and `/fonts/**`, not just the question images.
  Bundling made these same-origin, which dropped them into `SHELL_CACHE` — deleted
  on every `SHELL_VERSION` bump, so each deploy would re-download every picture a
  child had already seen on a metered connection. They are also kept OUT of
  `SHELL_FILES`: 7.4 MB of all-or-nothing pre-cache is not a first load.
- ⚠ **ONE credits record: `assets/questions/provenance.json`** (138 images, every
  one with a licence), and `image-credits.html` is **generated from it** by
  `node scripts/build-image-credits.js` and linked from the landing footer.
  Bundling is redistribution, and CC BY / BY-SA require the author, the licence
  and a link on every copy. Do not hand-edit the page, and do not give it a
  `netlify.toml` 404 — an attribution nobody can reach discharges nothing.
  ⚠ There were briefly TWO credits files (`assets/questions/CREDITS.md` and this
  one), written the same day by two sessions in the same working tree. Merged
  2026-09-08; if a second one reappears, merge rather than pick.
- ⚠ **Provenance is captured FORWARD, from the API response that produced the
  file. Never reconstruct it from a filename** — the local names are lossy slugs,
  so `adrien-d-epinay1.jpg` never matches `File:Adrien d'Epinay1.jpg` and a
  generic `ball.jpg` matches an unrelated Commons file. That reverse lookup
  reported ~106 of 115 as "no such file", which reads as "provenance unknown"
  for images whose licence and author were fully recorded — and is what produced
  the second file.
  ⚠ Commons filenames contain parentheses (`Ganga Talao (5489050038).jpg`), so a
  markdown-link regex of `\(([^)]+)\)` truncates the URL at the first `)` and
  yields a title that does not exist. Six of twenty-three hit that.
- ⚠ A PNG only stays a PNG if its alpha is **measured in use**. 8 of 12 were fully
  opaque and became JPEGs (751 KB → 21 KB for Mars); the 4 that really use alpha
  would get a white box behind them in dark mode.
- ⚠ Harness traps, all paid for once: `Emulation`/`Network` overrides on the page
  target do **not** reach the service worker (shut the origin server down instead);
  a lazy `<img>` in an off-screen iframe never loads, so `decode()` never settles;
  and injecting question HTML into the live app fires `_Dialogs`' MutationObserver
  once per question — measure in an isolated same-origin iframe that loads
  `style.css`.
- ⚠ **`/.netlify/functions/questions` must never be cached by the SW.** That
  response is `private` precisely because it varies per caller; a URL-keyed cache
  hands one child's entitled set to another. `activate` also **evicts** entries
  earlier versions wrote — `DATA_CACHE` survives a version bump, so skipping the
  route from now on would not remove the leak.

### CLI deploy
`netlify deploy --prod --dir=. --functions=netlify/functions` (there is no
`dist/`; `publish = "."`). The build runs **locally**, so no Netlify build
minutes.
- ⚠ **It uploads from local disk, not git.** Everything gitignored but present
  ships. **Move `.env` (holds `SUPABASE_SERVICE_ROLE_KEY`) out of the tree before
  every CLI deploy.**
- ⚠ `publish = "."` serves the repo root. `netlify.toml` carries **28 explicit
  404 redirects** — explicit because Netlify wildcards match only a *trailing*
  splat, so `/*.md` matches nothing. Add one for any new sensitive root file.
- ⚠ **The CDN keys on URL alone** — it does not vary on `Authorization` or
  `X-Student-Token`. Every error path in `questions.js` uses an `errHeaders`
  object with `no-store`; one cached 401 poisoned a subject for 24 hours for
  every child.
- ⚠ **Draft deploys cannot verify this** (Netlify preview auth answers 401 to
  everything). Verify against **production immediately after promoting**, with a
  cache-busting query string.
- ⚠ **Production builds from `main`.** If a fix is reported as still broken,
  check which branch is deployed before concluding the fix is wrong.
- ⚠ **MEASURED 2026-09-04: production, `main` and `dev` HEAD are all on
  `shell-v88`; only the working tree is ahead (v106).** The older note here
  claimed production was on v23 with `admin-account-recovery` returning 404 —
  both were stale, and that staleness once sent a whole debugging session the
  wrong way. Re-measure; never carry these numbers forward.

  | | `SHELL_VERSION` | `admin-account-recovery` |
  |---|---|---|
  | `psac-practice.netlify.app` | v88 | **401 — deployed** |
  | `main` | v88 | present |
  | `dev` HEAD | v88 | present |
  | working tree | **v106** | present |

  Probe it, never infer it — `curl -s <site>/sw.js | grep SHELL_VERSION` and
  POST to an `/api/` route (**401 means deployed**, 404 means missing).
  ⚠ **An undeployed `/api/` route returns the SPA fallback: HTML with status
  404, not an error.** `response.json()` then throws, and code that treats that
  as `{}` reports the server’s own refusal message for a request the server
  never saw. `AdminPanel._adminApi()` checks the content type first and says
  "not available (HTTP 404)" instead. The same is true on a plain local static
  server, where no function runs at all — every `/api/` call fails there.
### Netlify env vars (dashboard only, never in the repo)
`SUPABASE_SERVICE_ROLE_KEY` (⚠ its absence used to fail *open*),
`SUPABASE_ANON_KEY`, `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_EMAIL`.

---

## Verifying work — traps in the harnesses
- `scripts/audit-mobile-screens.js [width]` reveals every `.screen` at 360px and
  320px and reports elements that visibly protrude past the viewport. It judges
  per-element rects (a scrollWidth check is blinded by body's `overflow-x:
  clip`), skips children of clipping/scrolling ancestors and pure-emoji
  decorations, and covers **static markup only** — dynamically rendered
  content needs its own probe.
This project's fixes are **measured, not eyeballed**. Repeat that, and know these:
- ⚠ **The service worker serves a stale shell.** A CDP run must
  `Page.setBypassServiceWorker` **and** `Page.reload {ignoreCache:true}`, or you
  will measure the previous `style.css` and report a fix that never landed.
- ⚠ **Stop an overflow detector's ancestor walk at `body`** — `overflow-x: clip`
  above it makes every page look clean.
- ⚠ **Give every CDP call its own timeout.** An infinite loop in page JS blocks
  the renderer's message loop so CDP never answers; without a timeout you cannot
  tell "page wedged" from "harness bug".
- ⚠ **Do not point a login probe at a real family.** Four digits against a real
  username increments `pin_attempts` and can trip `pin_locked_until`.
- ⚠ **Never build a regex through a shell heredoc into a JS template literal.**
  `\s` arrived as `s` and silently deleted the letter *s* from every recorded
  mistake — plausible-looking output, caught only by asserting the exact string.
- Any tooling that loads questions outside the browser must reproduce what each
  factory actually returns (`makeMatch` has **no `question` field** — it builds
  the text from `leftItem`).
- **`scripts/sql-tests/run-schema-tests.sh`** builds `supabase-schema.sql` from
  nothing on `postgres:17-alpine`, re-applies it to prove idempotency, then runs
  47 RLS assertions as `authenticated`. ⚠ It exits **non-zero today**, on the
  co-parent finding in Pending item 0 — that is the finding, not a broken test.
  ⚠ The assertions run as `authenticated`, never the superuser: RLS does not
  apply to a superuser, which once made every "can see the row" check pass for a
  total stranger.
- SQL changes are applied against production **inside a transaction and rolled
  back**, or against `postgres:16-alpine` with the live constraints.
- The write step is not self-verifying: always reconcile "rows written" against a
  fresh count. A quote-style mismatch once skipped 119 questions *while reporting
  success*.

---

## Current state

### The question database is now complete — imported 2026-09-08
The live `questions` table holds **14,893 rows: 14,729 practice + 164 past
papers**, verified by read-after-write on every row written.
`mcq 12,322 · numeric 2,024 · text 305 · cloze 60 · multi 12 · symmetry 6`,
0 protected. Before this run it held **0 `text` and 0 `cloze`** — see the
importer note above.
- ⚠ **3 rows in the database are not in the corpus** and are not errors:
  `g7h-samp-001`, `g8h-samp-001`, `g9h-samp-001`, left by the retired
  `grade{7,8,9}-history` placeholder packs that `-social-modern-studies`
  replaced. **The importer never deletes**, so removing a question from
  `subjects/` does not remove it from the database.
- ⚠ **No migration was needed and none was made.** `questions.data` is `jsonb
  NOT NULL` with no type column and no CHECK constraint (live schema read, not
  taken from the dump), and the table already carried `multi` and `symmetry`
  rows — proof JSONB accepts the non-MCQ shapes.
- Two single-option MCQs found by the new preflight and fixed:
  `g5hg-min5-coast-0` and `g5s-min5-renew-0` had one option, which was the
  answer. Pre-existing; the `rows()` helper in `coverage_min5.js` shares one
  option pool across a group, so a one-row group got a one-word pool.

## The Game Zone (minigames) — added 2026-09-04
`engine/minigame.js` (the `MiniGames` module), reached from the kid dashboard
`#dash-games-tile` and `#screen-minigames`. Seven live games:
- **Who Wants to Be a Billionaire?** 💰 (was "Peak Quest") — a 20-question prize
  ladder to Rs 1 Billion, TV-quiz styled (dark set, lozenge answers, prize
  ladder, 4 lifelines: 50:50, Ask the Crowd, Wise Owl, Safety Rope). Q1–10 are
  the child's grade easy→medium, Q11–15 the hardest textbook questions, and
  **Q16–20 are general knowledge** from `engine/minigame_gk.js` (37 curated
  MCQs, same subjects, beyond the book) — each question shows its subject +
  chapter/topic. Safe havens at Q5/Q10/Q15. Synthesised WebAudio sounds
  (correct/wrong/lock-in/win) — **no audio files, no copyright**. A distinct
  name and look on purpose; no show logo/music/wording. `startBillionaire`.
- **Quick Fire** ⚡ — a 60-second MCQ blitz with a combo multiplier (×1–5), a
  time penalty on wrong answers, and a shareable score.
- **Word Builder** 🧩 (added 2026-09-04) — spell 10 clued words to cross the
  lagoon on stepping stones; tap scrambled letter tiles into slots, auto-check
  on full, 3 lives, 3 hints (each locks in the next correct letter, clearing any
  wrong prefix first). Words come from `engine/minigame_words.js` —
  `window.MINIGAME_WORDS`, 90 curated words in 3 bands, mixed by the child's own
  grade. ⚠ A clue must never contain its own word; words are A–Z only (tiles).
  `startWords`.
- **Island Explorer** 🗺️ (added 2026-09-04) — a 12-stop geography tour of real
  Mauritius places (Port Louis → clockwise → Curepipe) from
  `engine/minigame_geo.js` (`window.MINIGAME_GEO`, ~40 curated fact MCQs, one
  drawn per stop per tour). First try = 🏅 gold stamp, second = ⭐ silver, two
  wrongs = the guide explains and the tour **continues** — a child always
  finishes the trip. ⚠ Every fact is real, verifiable geography; keep it that
  way. `startExplorer`.
- **Number Ninja** 🥷 (added 2026-09-04) — mental-maths belts, white → black:
  7 belts × 5 sums, per-question timer tightening 12s → 7s, 3 lives. ⚠ Sums are
  **GENERATED** per belt (`_njGen`), never drawn from the question bank; the
  harness `scripts/test-number-ninja.js` re-derives every answer from the
  question text and simulates full win/loss runs through the real module (29
  checks). Bests in `DB.games.ninja` `{plays,bestBelts,bestScore}`. `startNinja`.
  The hub shows four `mg-card-soon` teasers (Memory Reef, Potion Lab, Écoute!,
  Story Sprint) — **each has a full design-intent comment block above
  `renderHub()` in `minigame.js`** (mechanics, data file to create, DB.games
  key, traps); read it before building one.
- **Brain Battle** ⚔️ (added 2026-09-04) — pass-the-phone duel: 5 rounds, one
  question EACH per round, both drawn from the **same difficulty band** but
  never the same question (the second player would inherit the answer). A
  handover screen hides the question until the player taps Ready — and a resume
  after reload always lands on that handover, never mid-question. 25s/question,
  speed bonus; tie → sudden death (max 3 extra rounds) → draw. Tallies in
  `DB.games.battle` `{plays,p1Wins,p2Wins,draws}`.
  `scripts/test-brain-battle.js` (11 checks: same-band pairing measured over
  240 rounds, crown/draw paths, phase guards). `startBattle`.
- **Time Traveller** 🕰️ (added 2026-09-04) — history sequencing: 8 rounds of
  3–4 real dated events (`engine/minigame_time.js`, `window.MINIGAME_TIME`,
  38 curated facts, Mauritius core + world anchors) TAPPED into chronological
  order before a rewind timer; years stay hidden until the reveal, which waits
  for a tap (the learning moment). ⚠ Every fact real and verifiable; ⚠ a label
  must never contain a 3+ digit number (it would leak the order); ⚠ never two
  same-year events in one round (their order would be unknowable). Bests in
  `DB.games.timetravel` `{plays,bestScore,bestPerfect}`.
  `scripts/test-time-traveller.js` (20 checks). `startTimeTravel`.
⚠ **Game answers NEVER call recordAnswer()/_recordDaily().** A replay must not
distort the mastery, mistake and daily reporting parents rely on. Game bests
live in `DB.games.{billionaire,quickfire,wordbuilder,explorer,ninja,battle,timetravel}`
(`games` key seeded in `Store._defaultStudent`, so existing children backfill for
free — no schema change). The four data files (`minigame_gk/words/geo/time.js`)
are blocking script tags before `minigame.js` and listed in `SHELL_FILES`. In-progress games persist to
sessionStorage per student (`_persist`/`resumeOrHub`) — the explorer stash
stores indices into `MINIGAME_GEO`, so it is only resumed while the catalogue
shape still matches. `scripts/test-minigame-arcade.js` (789 checks: bank
integrity, full win/lose playthroughs of both new games in a VM, wiring).

### Exam weighting — set from the papers, not from item counts (2026-09-08)
`examWeight` is a chapter's share of a 40-question exam:
`n = Math.max(1, Math.round(examWeight * count / 40))`. It is the **only** lever
on what an exam contains — `getMixedQuestions()` is a flat shuffle inside one
chapter, and how many questions a chapter holds changes nothing.

**Ten of the fifteen live packs are now weighted from their real papers.** One
rule throughout: read the paper question by question and give each mark to the
chapter that teaches it; a chapter the exam pool cannot reach comes out of the
denominator too. `scripts/exam-mark-maps.json` holds every mark map, and the
comment block above `chapters:` in each `_manifest.js` is **generated from it**,
so the two cannot drift.

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
  rotate: `g6-ecosystems` scores 0 in 2023 and 6 in 2022; `g6-solar-system` 0 in
  2024 and 5 in 2023. Three years is the smallest sample that stops a real topic
  reading as zero. The languages are fixed year to year, so one paper is enough.
- ⚠ **THE GRADE 4 PACKS ARE NOT DERIVED AND CANNOT BE.** There is no Grade 4
  paper — `past-papers/` holds `psac6`, `psac5`, `psac5-mes` and `nce` only. All
  five keep their hand-set weights, and grade4-maths still has **none at all**
  (0 of 6 chapters), so its exam shape is an accident of chapter count. Do not
  invent a mark map for them from the Grade 5 paper.
- ⚠ **Some ✨ BONUS chapters are core exam content.** `g6enr-symbols` earns 9.3%
  of the History marks — flag, coat of arms and anthem are asked EVERY year, more
  than Map Skills or Independence — and `g5enr-world` earns 8%. The gold "BONUS"
  card tells a child a yearly exam topic is optional. Worth re-labelling.
- ⚠ **Some weighted chapters earn almost nothing.** `trade-agri` earned 1 mark in
  two Grade 5 papers against a weight of 4; `percentage` earns **zero** in both
  Grade 5 maths papers (it is a Grade 6 topic) — that is measured over two years,
  not a sampling artefact. Both sit at the floor now.
- ⚠ **Weighting to the paper CONCENTRATES the draw, and the bank is not deep
  enough underneath it.** Measured 2026-09-08: **23 chapters now repeat inside
  ten exams**, worst `g6-materials` and `g6-animals` (3 exams each, 9 and 10
  questions a paper from 35 and 39 items), `fr-images` (3), `g6-land-use` (4).
  Reaching a ten-exam pool everywhere needs about **520 new items**, and they are
  needed in exactly the chapters the real exam leans on hardest. The weights are
  right; the content behind them is thin. `scripts/test-exam-paper-shape.js`
  prints the full list on every run.
- ⚠ **Weighting to the paper CONCENTRATES the draw, and 594 items were written
  to keep up.** Matching the paper meant chapters like `g6-land-use` (11 of 40
  questions) drawing from a pool of 47 — four mock exams and a child had seen it
  out. `subjects/*/questions/exam_depth.js` in eight packs adds **594 items** to
  the 23 chapters that repeated inside ten exams, and every one of them now
  clears it. Measured 2026-09-08:
  | pack | items | chapters |
  |---|---|---|
  | grade6-science | 133 | materials 55, animals 61, air 12, energy 5 |
  | grade6-history | 121 | land-use 63, slaves-immigrants 31, hazards 23, heritage 4 |
  | grade5-science | 106 | energy 39, electricity 36, water-matter 17, plants 9, conservation 5 |
  | grade5-english | 89 | verbs 45, sentences 14, writing 17, comprehension 10, vocabulary 3 |
  | grade5-french | 40 | fr-images 40 |
  | grade5-history | 18 | g5ge-weather 18 |
  | grade6-french | 15 | images 10, argumentation 5 |
  | grade6-maths | 3 | ratio-pct 3 |
  | grade4-science | 58 | plants 20, animals 20, enr-animals 9, enr-equipment 9 |
  | grade5-history | +11 | g5enr-personalities/independence (see Subsections) |
  ⚠ **`makeMCQ()` SHUFFLES its own options** (engine/helpers.js) — every one of
  these files was first written with an answer-first rotation meant to spread
  the answer across A/B/C/D, and it did nothing at all. The spread comes from
  the factory. Authoring answer-first is still worth doing because `options[0]`
  is then always the answer and an item can be checked at a glance, but do not
  believe a comment that claims it positions anything. What DOES need care is
  keeping all four options the same grammatical shape and length: measured
  4.9 characters of spread here against the real papers' 6.5-6.8, and
  `test-option-parity.js` caught one length leak (`g6sc-dep-028`) before it
  shipped.
  ⚠ **Four new subsections were declared**, because the syllabus named the
  content and the map did not: `teeth` and `diet` on g6-animals (the 2023 and
  2024 papers spend 9 and 6 marks there and neither had anywhere to live), and
  `decrire` / `raconter` on both French image chapters. The existing fr-images
  items each carry a PHOTOGRAPH; the new ones deliberately do not, because that
  artwork does not exist in this repo and « Observe l'image » with no image is a
  broken item. They train the same Q8 skill without one.
  ⚠ **grade4-science was deepened too** (58 items, 2026-09-08): four chapters
  repeated inside 7-9 exams. Every core chapter in that pack held exactly 31
  items and every enrichment chapter exactly 19 — a fixed quota, not a measure
  of need. **No pool in any of the fifteen live packs now repeats inside ten
  exams.** ⚠ Grade 4 still has no paper, so its examWeight values are the
  original hand-set ones and the SHAPE of a Grade 4 exam remains unverified;
  only its depth was fixed.
- `scripts/test-exam-paper-shape.js` asserts every live pack deals a whole
  40 / 25 / 15, holds each weighted pack's worst chapter within 4 points of its
  paper (one question is 2.5 points, so a tighter band fails on rounding alone),
  and reports the thin pools.

### Parent-controlled Game Settings — added 2026-09-06
`engine/game_settings.js` (`GameSettings`, loaded **before** `minigame.js`, in
`SHELL_FILES`). Per child, in `DB.restrictions.games` → `students.settings`
(parent-written through `Auth.saveGameSettings` → `_saveRestrictions`, same
rollback-on-refusal as every Controls toggle; **no migration** — RLS on
`students` already gives a child SELECT only, proven live and rolled back by
`scripts/sql-tests/game-settings-rls.js`). Missing/partial settings
`normalise()` to: Balanced · all grade subjects · Medium · 10 per round · weak
focus off · avoid-recent on · GK off.
- **`GameSettings.GAMES` is the single capability table** (`supportsSubjectMix
  / Difficulty / RoundLength / WeakTopics / GeneralKnowledge / RecentAvoidance`).
  Billionaire, Quick Fire, Brain Battle take the mix; Word Builder and Time
  Traveller take difficulty (band windows) and Word Builder the round length
  (stones); Explorer and Ninja take nothing. Never branch on a game's name.
- **Every quiz game draws through `pickForGame()`**: valid MCQs only
  (`isValidMCQ` — answer present once, options unique, answer within the first
  four), the child's grade only (other grades only with `crossGradePractice`,
  and last), locked/admin-blocked chapters out, excluded subjects removed
  **before** anything else, largest-remainder shares (40/30/30 → 4/3/3, spread
  through the round, not clumped), levels never above
  `min(difficulty top, restrictions.maxDifficulty)`, weak-area weights from
  `DB.chapters`, recent ids (`DB.games.recent`, cap 150) avoided while fresh
  ones remain, shortfall filled from another **included** subject with a
  `console.warn`. Zero usable ⇒ `NO_QUESTIONS_MSG`, distinct from "still
  loading" (`_pickFailToast`). A game with a `levels` ladder keeps the exact
  level before freshness (Brain Battle pairs must match); a free-running game
  prefers fresh at a nearby level.
- Adaptive: `DB.games.adaptive {level,up,down}` — +1 after 3 right, −1 after 2
  wrong, clamped to the cap at read AND write. Recorded by Billionaire and
  Quick Fire (which re-orders its remaining stream), never by Brain Battle
  (two players).
- ⚠ GK defaults OFF, so Billionaire's rungs 16–20 are textbook level-4 unless
  the parent turns it on; hub copy and tier badge follow the setting.
- ⚠ The parent card is rendered by `innerHTML` **inside the chalkboard
  `#screen-parent`**, which is dark in BOTH themes — `.gs-*` carries a
  `#screen-parent` override block, and `scripts/test-game-settings-ui.js`
  measures 19 text styles ≥ 4.5:1 in both themes at 360px, plus overflow and
  touch sizes. `scripts/test-game-settings.js` (231 checks) is the model +
  picker + game-integration suite. Card state (`_open`, `_draft`) resets when
  the child id changes — in the render, per the module-state rule above.

⚠ **Confetti is `launchConfetti(count)` (app.js), NOT the canvas-confetti
`confetti({...})` API** — that library is not loaded. The first cut of Peak
Quest called the library form guarded by `typeof confetti === "function"`, so
every burst silently no-opped until this was fixed.

### Ask the Crowd — live public voting
**Applied** (now in `supabase-schema.sql`): `minigame_polls` + three RPCs
(`minigame_poll_create/vote/results`), granted `anon, authenticated`. The child
creates a 3-minute poll and shares `/v/<CODE>` (`vote.html`, standalone like
`guest.html`); anyone votes, the child watches counts live.
⚠ **The CORRECT ANSWER IS NEVER STORED** — the row holds question + options
only, so neither a voter nor the child can read the answer back from the server.
⚠ `minigame_polls` FKs `students(id) ON DELETE CASCADE`, so the account-delete
cascade takes polls with it — nothing added to `admin-delete-account.js`. (Unlike
the five text-keyed orphan tables.)

### Score sharing
Quick Fire shares via `navigator.share` (native sheet → WhatsApp/Instagram/…),
preferring a **canvas-rendered 1080×1080 PNG** score card where
`navigator.canShare({files})` allows, else WhatsApp/Facebook/X intent links or
clipboard. Landing page `score.html?s=&c=&a=` shows the score and a play CTA.
⚠ **A share carries a score and a challenge — never the child’s name, id, or any
profile link.** A game score is the one thing safe to post; keep it that way.

### Gates
- Parent: `DB.restrictions.minigamesDisabled` (per-child toggle on the parent
  dashboard, `Auth.toggleMinigamesDisabled`). `MiniGames.syncTile()` (called from
  `renderDashboard`) hides the tile live.
- Plan: `_PLAN_GATED_SCREENS.minigames = 'minigames'` + the `minigames` capB
  switch in the admin Plans tab. Unlike a feature that opens an upsell, an
  excluded games tile simply hides rather than teasing the child.

⚠ Verified end to end in headless Chrome as a real child (14/14 Peak Quest incl.
a second tab voting on `vote.html`; 8/8 Quick Fire incl. `score.html`). All
throwaway data purged; `minigame.js`/`style.css` are shell-cached (SHELL bumped).

- **15 live packs, 164 chapters, 14,636 questions**, plus 164 past-paper items
  and 30 `comingSoon` placeholder packs. 24 of the 160 chapters are bonus/enrichment.
  ⚠ **Measured 2026-09-06** by executing the manifests and counting distinct ids in
  the BUILT bundles (`node netlify/build-questions.js`, then count `id` per file) —
  not by adding up the numbers that used to be here, every one of which was stale.
  Re-measure rather than carrying these forward.
- Per-pack question counts, measured the same way:
  | pack | q | pack | q | pack | q |
  |---|---|---|---|---|---|
  | grade4-maths | 662 | grade5-maths | 1,419 | grade6-maths | 705 |
  | grade4-english | 873 | grade5-english | 645 | grade6-english | 890 |
  | grade4-french | **2,121** | grade5-french | **2,295** | grade6-french | **2,234** |
  | grade4-history | 558 | grade5-history | 532 | grade6-history | 460 |
  | grade4-science | 344 | grade5-science | 424 | grade6-science | 463 |
- **Formation des Mots** — added 2026-09-06, one ordinary chapter per live French
  pack (`g4fr-formation` / `g5fr-formation` / `g6fr-formation`), 100 questions
  each in five subsections of 20 (`verbe_nom`, `nom_adjectif`,
  `adjectif_adverbe`, `former_verbe`, `prefixes`). This drills PSAC French **Q7**
  ("Écris la forme correcte du mot entre parenthèses"), **10 marks on every**
  **paper**, which the bank covered with three one-off items and Grade 6 not at
  all. ⚠ Deliberately **not** an enrichment chapter: a gold "✨ BONUS" card would
  tell a child a numbered exam question is optional. Files are a data table +
  loop like `extended_practice_bank.js`. The five 2025 Q7 items are in the
  Grade 5 table verbatim and `scripts/test-french-word-formation.js` (86 checks)
  asserts their answers, the declared-vs-tagged subsection invariant, and that
  no prompt contains its own answer.
  ⚠ 20 per subsection is not arbitrary — `audit-content-coverage.js` reports any
  declared subsection under 20 as a permanent gap.
- **Chasse aux Erreurs** — added 2026-09-08, a ✨ BONUS chapter per live French
  pack (`g4fr-chasse-erreurs` / `g5fr-chasse-erreurs` / `g6fr-chasse-erreurs`),
  **20 texts each**. Correction de texte, PSAC French **Q7**. The child reads a
  deliberately broken passage and taps every word they think is wrong;
  **Vérifier** answers with a COUNT only and **Terminer** reveals everything.
  Errors per text rise with the grade: **8 / 10 / 12**, 600 in total.
  ⚠ **A NEW QUESTION TYPE, `errorhunt`, from a new factory `makeErrorHunt`** — so
  it lives in all four copies (`helpers.js` + the three server ones) **and in
  their exported context lists**, which is the step `makeCloze` was missing when
  every cloze text vanished from the built bundle while the source read correctly.
  `isPoolQuestion()` excludes it, like `cloze`; dealt into practice it would draw
  a number pad under a French passage.
  ⚠ **VÉRIFIER IS CAPPED AT 3, and the screen says so.** A count you can ask for
  freely is an oracle: click one word, read the count, and you have been told
  whether that word is an error. `test-error-hunt-interaction.js` captures the
  text's markup either side of a check and asserts it **byte-identical** — the
  moment a checked word looks different from an unchecked one, Vérifier has
  answered the question instead of the child.
  ⚠ **Errors are authored INLINE**, `{faux>juste:regle}`, so an error can never
  drift from its word. Punctuation outside the braces rides onto both forms
  (`{cahier>cahiers:pl}.` = a wrong word with a correct stop) while
  `{cour>cour.:pt}` is a MISSING stop — the child clicks the word it should
  follow. Anything else containing a brace **throws at build time**: a
  half-written token would otherwise print `{cour>cour.:pt}` at a child.
  ⚠ **Every word outside the braces must be correct French.** A word left wrong
  by accident is an error a child can see, cannot score, and **is told is
  correct** when they click it. The factory therefore also emits `correct`, the
  whole text put right, so a harness can read all sixty as plain French.
  ⚠ **A title must not contain the correction of its own error** — 10 of the
  first 20 titles did, handing a proper noun away on the list screen before the
  text was opened. Same rule the cloze titles learned.
  ⚠ **A tap must never call `renderPlayer()`** — it rebuilds the host's
  innerHTML, destroying the button under the finger and jumping to the top of
  the text. `tap()` flips one class and patches the counter line.
  ⚠ The 44px tap rule is **deliberately bent, here only**: every word is a
  button, and 44px-tall words turn a 110-word Grade 6 passage into six phone
  screens. Words are 40px with `min-width` holding the short ones.
  Progress: one `recordAnswer()` per error (one error = one mark), passing the
  TEXT id, so `answeredIds` gains it once; `DB.hunt` (seeded in
  `Store._defaultStudent`) holds the best score per text. These answers DO count
  toward mastery.
  `engine/errorhunt.js` · `scripts/test-error-hunt.js` (70 checks) ·
  `scripts/test-error-hunt-interaction.js` (42 checks, real headless Chrome at
  360px in both themes).
- **Textes à Trous** — added 2026-09-06, a ✨ BONUS chapter per live French pack
  (`g4fr-textes-trous` / `g5fr-textes-trous` / `g6fr-textes-trous`), **20 texts
  each**. This is PSAC French **Q6** (10 marks); the bank had **nothing** for it
  in any grade.
  ⚠ **THE THREE PACKS ARE NOT THE SAME SHAPE, because the real papers are not.**
  Grades 4 and 5 are **one part** — one passage, ten gaps, eleven words, one
  deliberate spare — and Grade 5 text 1 is the real 2025 paper. **Grade 6 is two
  parts** (rebuilt 2026-09-07): **6A** is 5 gaps with a bank of 6 and one spare,
  then **6B** is 5 more gaps of the SAME story with **no word list at all** — the
  child types the word. Texts 1 and 2 are real papers (Jumbo, Alice), verbatim.
  Grade 6 was originally built to the Grade 5 shape, so a child in the year they
  actually sit the PSAC drilled 200 gaps that every one of them handed the word
  over, and had never met the half of Q6 that does not.
  ⚠ **Q6 is grammar-in-context inside a STORY, not a vocabulary quiz.** Measured
  over the two real papers: **11 of 20 answers are grammar words** (`devant sans`
  `très tard sous sa autour dans qui`), the other 9 everyday narrative vocabulary
  (`petit première ronde commence matin perdu`). The first Grade 6 set answered
  with `transbordement`, `blanchiment`, `écosystème` in expository texts about the
  port and coral reefs — **5.5% grammar words**, a different skill in a different
  genre. The rebuild measures **85%**; the papers are 55%, so it now errs the
  other way. Keep new texts narrative and the answers to words a child owns.
  ⚠ **A part-B gap accepts a LIST** (`gapAlts`): « je veux rentrer / retourner /
  revenir chez moi » are all correct, and failing a child for the better word is
  the one thing this exercise must not do. A **missing accent scores as right**
  and is flagged — a phone keyboard is a device problem, not a French mistake.
  ⚠ **Every typed gap is the SAME width.** An input sized to its answer prints
  the answer's length on screen; the paper draws one dotted line for every gap.
  ⚠ **Typing must never call `renderPlayer()`** — it rebuilds the host's
  `innerHTML`, destroying the input being typed into and dropping the caret
  mid-word. `typeGap()` writes state and patches the progress line only.
  ⚠ **A NEW QUESTION TYPE, `cloze`**, from a new factory `makeCloze` — so it lives
  in all four copies (`helpers.js` + the three server ones). It was defined in all
  three server copies and **missing from their exported context list**, so every
  text was silently absent from the built bundle while the source read correctly.
  That is the standing hazard in this table, caught only by grepping the BUNDLE.
  ⚠ **`isPoolQuestion()` in `questions_engine.js` excludes `cloze` from every
  pool** — `getStaticQs` feeds practice, subsection practice AND
  `assembleExamPaper`. Dealt into either, a cloze item falls through to the
  numeric branch and draws a **number pad under a French passage**.
  ⚠ **`examWeight: 0` does NOT keep a chapter out of an exam.**
  `assembleExamPaper()` clamps every weight with `Math.max(1, …)`, so a 0 still
  buys a slot. The older claim in this file was wrong. The TYPE filter is the
  guard that actually holds — and until 2026-09-08 that slot was simply LOST:
  a chapter that could fill nothing still took its question out of the paper,
  so a "40-question" French exam dealt 39 in grades 5 and 6 and **37 in grade
  4**, silently, for as long as these chapters have existed. `assembleExamPaper`
  now drops a chapter that has neither a poolable question nor a generator.
  `scripts/test-exam-paper-shape.js` asserts all fifteen live packs deal a whole
  40 / 25 / 15, and was verified to catch it by reintroducing the bug.
  ⚠ **Tap-to-place, not drag.** HTML5 drag does not fire on touch at all, and a
  pointer-drag on a 360px phone means a nine-year-old holding a chip over a 40px
  target while the page scrolls. Tapping a word fills the **next empty gap**, so
  a child never has to aim; tapping a filled gap takes the word back. Drag is
  added on top for mouse/stylus only.
  ⚠ **A title must never contain one of its own answers** — 28 did, which handed
  a free mark on the list screen before the text was even opened. ⚠ With `le`,
  `la`, `un` and `à` now among the Grade 6 answers this rules out most « Le … »
  titles: three of the twenty tripped it on the first run.
  ⚠ **A passage printing a content answer in plain sight is grandfathered, not
  accepted.** 19 Grade 4/5 texts do it (`g4fr-clz-002` gap 1 is « chien » and the
  next sentence reads « Le chien a tout … ») — and so does the real 2025 hérisson
  paper, which repeats « doux », so it is not a rule the papers follow. The test
  prints those as notes and **asserts** it only for the two-part pack.
  Progress: `recordAnswer()` runs **once per gap** (one gap = one mark), passing
  the TEXT id, so `DB.chapters[ch].answeredIds` gives the list its ticks with no
  new bookkeeping; `DB.cloze` (seeded in `Store._defaultStudent`) holds only the
  best score per text. Unlike the minigames, these answers DO count toward mastery.
  `engine/cloze.js` · `scripts/test-cloze-texts.js` (100 checks) ·
  `scripts/test-cloze-interaction.js` (64 checks, real headless Chrome at 360px:
  place, un-place, mark, tick, overflow, tap targets).
  ⚠ In that harness, measure a gap with **`offsetHeight`, not**
  **`getBoundingClientRect()`** — the pop animation's `scale(.82)` reports 29px
  for an element that is really 35.7px.
- Every live grade has enrichment chapters (History, Science), a Map Skills SVG,
  Passages & Text Types (English + French) and Description d'Images (French).
- Read-aloud speaks the **question only, not the options** (accepted). French
  packs speak `fr-FR` with a matching voice; voices are warmed at load because
  `getVoices()` is empty on the first tap, and `speak()` stays synchronous inside
  the gesture for iOS.
- ⚠ **No child had a single day of `daily` data as of 2026-08-30** — the dated
  reporting code had not run in production. Reports, family overview and calendar
  fill in from each child's next session after deploy.

## Teacher Mode — Hybrid Classroom Command Centre (2026-09-06)
Main navigation is **Home · Classrooms · Set Work · Results** plus a labelled
`⋯ More` menu (Materials, Messages, Gradebook, Archived work, Teacher settings).
The classroom screen is **Overview · Work · Pupils** plus `⋯ More` (Materials,
Results, Settings). Set Work shows classroom → sharing choice → grade/subject →
chapter → number of questions → due date; everything else is inside
`<details id="ta-more-options">`. Full write-up: ENGINEERING-NOTES
"Teacher Mode → Hybrid Classroom Command Centre".
- **Location survives refresh**: `psac_teacher_loc_v1` (owner-scoped) holds tab,
  list filter, selected results and the open classroom + section.
- **Evidence thresholds** live in `TeacherInsights`: ≥ 5 answers before "may
  need help" (< 50 %), ≥ 3 answers in a chapter before naming it, "very
  quickly" = < 8 s/question **and** < 60 %. Never label on one or two answers.
- ⚠ **The board's `p:not(…):not(…)` rule scores (1,3,1)** and beats every
  single-id override; the command-centre CSS uses `#screen-teacher#screen-teacher`
  on purpose. Paper cards carry their own ink in both themes.
- ⚠ **`checkVisibility()` answers false for everything in headless Chrome 152.**
  A probe built on it measures nothing and passes. The harness filters closed
  `<details>` by ancestry and asserts collapse by geometry.
- ⚠ **A refresh superseded by a newer one resolves `undefined`** —
  `TeacherWorkspace.ensureLoaded()` waits for the newest in-flight refresh and
  judges by `loaded`, or Home shows its error state on every load.
- Sharing choice is on step 1 on purpose (online groups need "Anyone with the
  link" without discovering a disclosure); PIN is the default whenever the
  classroom has pupils, flipped only by the teacher's own tap.
- Not shown, on purpose: a "Scheduled" filter (nothing schedules a start),
  hints / attempt limits / answer visibility (no server support). The classroom
  `?classroom=` share link is **inert** (nothing parses it) and is not promoted.
- Tests: `scripts/test-teacher-command-centre.js` (141 checks, VM) and
  `scripts/test-teacher-command-centre-layout.js` (headless Chrome, 360/1280 ×
  light/dark, overflow + contrast + 44 px targets; `--shots DIR` for screenshots).

## Pending / not yet done
⚠⚠ **THE PUBLISH ROOT LEAKED MORE THAN netlify/, AND THE REAL DEFECT IS THAT
THE 404 LIST IS HAND-MAINTAINED.** Also measured live 2026-09-08:
`/docs/content-coverage-plan.md`, `/dbg18.js` and `/test.py` answered **200**;
`past-papers/` (PDFs of real copyrighted exam papers), `exam_papers/`,
`migrations/`, `tmp/`, `node_modules/` and five dot-directories were unblocked
and safe only because the last deploy did not contain them.
⚠ **A 404 from this site has two meanings**: ~398 KB is one of our rules firing,
~4.2 KB is Netlify saying the file was not deployed. Never read the second as a
block. Rules are added; `scripts/test-netlify-redirects.js` (133 checks) now
walks the tree and fails on anything neither allowlisted nor blocked, and was
verified in both directions - including that a rule matching `/.netlify/*`
would 404 every function in the app.
⚠ `.netlify/` CANNOT be blocked by a path rule (same prefix as the functions);
it is asserted gitignored instead.

⚠⚠ **THE WHOLE `netlify/` DIRECTORY WAS PUBLICLY SERVED, AND IS UNTIL THE
NEXT DEPLOY.** Measured against production 2026-09-08, anonymous, no headers:

| path | status |
|---|---|
| `/netlify/question-bundles/grade5-maths.json` | **200 — 651 KB of real questions with their answers** |
| `/netlify/functions/questions.js` | **200 — 36 KB, the source of the entitlement enforcement** |
| `/netlify/lib/questions-sandbox.js` | 200 |
| `/netlify/import-questions.js` | 200 |
| `/.netlify/functions/questions` | 401 — the function itself is fine |

58 bundle files. That path bypasses `netlify/functions/questions.js` entirely:
the plan, the kill switch, entitlements, expiry and moderation blocks are all
decided in that function and **none of them ran**. `publish = "."` serves the
repo root, and the bundles being gitignored is exactly what ships them — a CLI
deploy uploads from local disk.
⚠ A `[[redirects]]` 404 on `/netlify/*` is now in `netlify.toml` (trailing
splat, the only wildcard shape Netlify matches). It is **not verified**, because
nothing has been deployed. After the next deploy, probe BOTH:
`/netlify/question-bundles/grade5-maths.json` must answer 404 **and**
`/.netlify/functions/questions` must still answer 401 — a rule that caught the
leading-dot path would take the whole question service down.
⚠ Nothing in the browser fetches that path; grepped across `engine/`,
`index.html`, `guest.html`, `vote.html` and `score.html` before blocking it.
⚠ **`/subjects/*/questions/*` was already blocked.** One of the two source
routes was closed and the other, added later by the build, never was — which is
the standing shape of this hazard: the 404 list is hand-maintained and a new
directory joins the publish root silently.
⚠ **`netlify/functions/parent-pin-signin.js` IS NOT DEPLOYED YET.** The table
it needs (`parent_pin_attempts`) is applied to production and recorded in
`supabase-schema.sql`; the function and its `/api/parent-pin-signin` redirect
are in the working tree only. Until it ships, `_pinServerSignIn()` receives the
SPA fallback (HTML at status 404), reads it as `unavailable`, and the PIN pad
behaves exactly as it did before — the intended failure mode, not a silent one.
Verify against **production** immediately after promoting (a draft deploy
answers 401 to everything): **401 means deployed, 404 means missing**.
⚠ Unverified until then: that `admin.generateLink()` does not SEND an email.
It should not — that is what it is for — but email is a shared ~500/day Gmail
quota and being wrong costs one message per PIN sign-in.

⚠ **The question cache was over the localStorage quota and is now fixed** (byte
budget, 2026-09-07 — see "Question cache" above). It is listed here only
because the thing that caused it will happen again: **bundle sizes drift and
nothing re-measures them.** The French packs quintupled with no one noticing.
Run `node netlify/build-questions.js && node scripts/test-question-cache-budget.js`
after any large content addition; it fails when a grade stops fitting.

**There are no outstanding SQL migrations.** The teacher due-date /
chosen-pupils migration (`teacher_guest_create_assignment` gains `p_due_at` +
`p_pupil_ids`; `guest_my_assignments` returns `chapter_ids`) was **applied to
production on 2026-09-06**, verified as `authenticated` in rolled-back
transactions (a 7-day due date writes `due_at` and `expires_at` at 168 h, not
48; three chosen pupils roster three of twenty-five; no due date still gives
48 h and the whole class; a past due date and a foreign pupil id are both
refused), and `supabase-schema.sql` regenerated from the live database — the
diff is exactly those two function bodies and one grant line.
⚠ **A newly created function inherits Supabase's default privileges, which
include `anon`.** `REVOKE ... FROM PUBLIC` does NOT remove that — it only drops
the `=X` PUBLIC entry. The migration's own REVOKE/GRANT pair therefore left
`anon=X` on the new signature; it was revoked explicitly so the ACL matches the
signature it replaced. Check `proacl`, not the migration text, after any
`CREATE FUNCTION`. The migration file was deleted on application, per the rule
below. Before it, **there were no outstanding SQL migrations, because there
were no migration files.** All 31 were verified applied against the live database and consolidated
into `supabase-schema.sql` on 2026-09-06. This list used to name migrations as
outstanding that had been applied for weeks, and that staleness sent a whole
debugging session down the wrong path — so it cannot go stale that way again.
Anything below that touches the database is a **decision**, not a pending run.
Re-check with `pg_policies` / `pg_proc` before trusting any line of it.

0. ⚠⚠ **A CO-PARENT CAN TAKE OVER A FAMILY.** `families_own` is
   `USING (parent_id = auth.uid() OR is_family_member(id) OR is_admin())` with
   `WITH CHECK (parent_id = auth.uid() OR is_admin())`. A co-parent passes
   USING because they **are** a member, then passes WITH CHECK because the row
   they write names **themselves** as `parent_id` — so
   `UPDATE families SET parent_id = auth.uid()` succeeds and they become the
   owner, inheriting the right to invite, to remove the original parent, and to
   delete the family.
   **Measured against production 2026-09-06** as `authenticated` in a
   rolled-back transaction, and asserted by
   `scripts/sql-tests/run-schema-tests.sh`, **which fails on it today**.
   ⚠ A **stranger cannot** — USING fails for a non-member, and an UPDATE whose
   USING matches no row changes nothing and raises nothing. The exposure is to
   an adult the owner deliberately invited, which is why it is a decision and
   not an emergency.
   The one-line fix is written out, commented, at the end of
   `supabase-schema.sql`: narrow **WITH CHECK only** to
   `(parent_id = auth.uid() AND is_family_owner(id)) OR is_admin()`, leaving
   USING untouched so co-parent reads are unaffected and rule 2 above is not
   re-opened. ⚠ Check first whether any co-parent feature legitimately writes to
   `families` (renaming it, say) — if one does, that field needs a SECURITY
   DEFINER function rather than a wider policy.

1. **Email is SOLVED — custom SMTP is live on Gmail, verified 2026-09-04.**
   `smtp.gmail.com:465`, user and `smtp_admin_email` both
   `psacpractice@gmail.com`, sender name "PSAC Exam Practice", authenticated
   with a Google **App Password** (not the account password — Google has refused
   those over SMTP since 2022; measured: `535-5.7.8 Username and Password not
   accepted`). `mailer_autoconfirm` is **OFF** and `rate_limit_email_sent` is
   **30**, up from the built-in sender’s hard cap of 2/hour.
   ⚠ **`smtp_port` must be sent to the Management API as a STRING** (`"465"`).
   A number is rejected: `smtp_port: Invalid input: expected string, received
   number`.
   ⚠ **`smtp_admin_email` must BE the Gmail account.** Gmail rewrites `From`
   to the authenticated user, so any other sender address is replaced or
   refused. Mail visibly comes from `psacpractice@gmail.com`.
   ⚠ **Gmail’s own ceiling is ~500 recipients/day**, account-wide, and no
   Supabase setting raises it. That is the limit now — not `rate_limit_email_sent`.
   ⚠ Verified end to end, not assumed: a real recovery email was delivered and
   confirmed received, then a real sign-up returned **no session** with
   `confirmed_at: null` — which is what keeps `emailSignUp()`’s
   `if (data?.session)` branch landing on the check-email screen. The test
   user was deleted; `auth.users` was re-counted to prove it.
   ⚠ **Resend is now legacy for auth mail and was never the blocker’s fix.**
   The old plan (verify a domain at resend.com) is moot for GoTrue. It still
   matters for the two Netlify functions below.
   ⚠ **`psac-practice.netlify.app` can NEVER be a sending domain** — SPF/DKIM
   would have to live in a DNS zone Netlify owns. Still true, still worth not
   re-proposing.

1b. **`notify.js` and `weekly-digest.js` now send through the same Gmail
   account** — 2026-09-04. Both call the shared `netlify/lib/mailer.js`
   (nodemailer over `smtp.gmail.com:465`), reading `GMAIL_USER` /
   `GMAIL_APP_PASSWORD`, which are set on the Netlify site. Resend is gone from
   both. ⚠ **NOT DEPLOYED YET** — see the deploy note below.
   ⚠ **MEASURED: `RESEND_API_KEY` was never set on the Netlify site at all.**
   The site held only `SUPABASE_URL`, `SUPABASE_ANON_KEY` and
   `SUPABASE_SERVICE_ROLE_KEY`. So both functions were hitting their own
   `not_configured` guard and **never attempted a send** — no parent has ever
   received an assignment notification or a weekly digest. The 403
   unverified-domain finding recorded here previously was real, but it was
   measured against the Resend API directly and is **not** what production hit.
   The lesson is the one this file keeps re-learning: a guard that returns
   "not configured" and a send that fails look identical from outside.
   ⚠ **`VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY` / `VAPID_EMAIL` are also absent**
   from the site env, so `push-*.js` is equally inert. Pending item 4 (rotate
   the leaked keypair) is therefore free to do — nothing is using them.
   ⚠ **`sent++` in the digest counted ATTEMPTS, not deliveries**, so the closing
   log line reported a full run whether or not one email left the building.
   It now counts only `ok` sends and logs `N FAILED` beside them.
   ⚠ The from-address is deliberately **not** configurable any more. Gmail
   rewrites `From` to the authenticated account, so `NOTIFY_FROM_EMAIL` could
   only ever be wrong; `mailer.js` builds it from `GMAIL_USER`.
   ⚠ `nodemailer` is the first new runtime dependency in a long while. Verified
   it survives the esbuild bundler Netlify uses (488 KB, handler loads and
   runs) — a dynamic require would have failed only in production.
1c. **Child sessions can load their plan again — fixed 2026-09-04**, via
   `student_plan_features()` (applied; now in `supabase-schema.sql`). Found by signing in as a
   real child in a browser: `_loginStudentRow()` read `families.parent_id` to
   reach the plan, but `families_own` is
   `parent_id = auth.uid() OR is_family_member(id) OR is_admin()` and all three
   arms need `auth.uid()` — a child is **anon + a token header**. The read
   returned nothing, `_planFeaturesState` went to `failed`, and every child
   login logged *"plan limits are NOT being applied this session"*. It had
   never once succeeded. The family rows were fine; the child could not see them.
   ⚠ **THE OBVIOUS FIX WAS THE WRONG ONE.** Adding a child arm to `families_own`
   would let a child SELECT the whole row — including **`family_code`, the
   private join secret** (deliberately not the public `referral_code`), on the
   least trusted device in the family. The policy is therefore UNCHANGED, and
   the child calls `student_plan_features()` instead: SECURITY DEFINER, returns
   `{ok, plan_id, features}` and nothing else — no family_code, no parent_id,
   no credits, no family name.
   ⚠ Leaving the policy alone also sidesteps rule 2 above entirely: widening a
   USING clause with a predicate that must look the row up is what broke family
   creation for two days. Touching no policy cannot reintroduce it.
   ⚠ `p_student` is optional. A child omits it (the token answers); a parent
   PREVIEWING a child passes it, because that path has **no student token** and
   authorises through the parent’s JWT. Asking about a child that is not the
   token holder requires an adult of that family — verified: parent→own child
   `ok`, stranger→`not_authorized`, anon→`no_student`, anon naming a child
   →`not_authorized`.
   ⚠ Granted to **anon AND authenticated**. An authenticated-only grant is how
   the friend RPCs ended up dead (rule 4).
   ⚠ Verified in a browser on a **pure child session with no parent JWT in it**
   — that distinction matters, because a parent signed in on the same device
   answers these queries as the parent and hides the bug. Result: RPC `ok:true`,
   `plan_id "free"`, 12 features, **no console warning**, and a direct
   `families` select still returns **0 rows**.
1d. ⚠ **`anon` can INSERT into `question_reports` directly, unthrottled.**
   Measured in `supabase-schema.sql` 2026-09-07: policy
   `"anon can insert question reports" FOR INSERT TO anon WITH CHECK (true)`
   plus a full INSERT grant. Any visitor can therefore write rows into the
   admin queue from a console and skip the contact form's honeypot, validation
   and rate limits entirely. **Pre-existing — the contact form did not create
   it**, but it is what makes that throttle advisory rather than binding.
   ⚠ `reports_insert` (`current_student_id() IS NOT NULL OR auth.uid() IS NOT
   NULL`) already covers a child with a token and any signed-in adult, so the
   anon-true policy looks redundant — **verify that against `pg_policies` on
   the live database before dropping it**, not against this file. The guest
   path does not need it: the function holds the service role and bypasses RLS.
   Proposed, not applied:
   `DROP POLICY "anon can insert question reports" ON public.question_reports;`
   then `REVOKE INSERT ON public.question_reports FROM anon;` — and regenerate
   the dump.

2. ⚠ **Publish the shop catalogue** — Admin → Content → 🛒 Credit Shop →
   **Publish catalogue**. Not SQL: `purchase_subject()` and
   `shop_subject_price()` both exist, but `mm_data.shop_settings.catalog` is
   still `[]`, and that is what `purchase_subject()` validates against — so
   whole-subject buying refuses today.
3. ⚠ **Two families are both named "gobin"** (`B48C5A`, `4B2D15`), so
   `families_name_unique_ci` cannot be created and `verify_student_pin` can
   answer `ambiguous_family` to a child in either. family_name is one of the
   three things a child types to log in, so renaming one is a **decision about
   real children's credentials** — not a migration to run unattended.
   §13 of `supabase-schema.sql` therefore **skips itself and warns** rather
   than failing; those children can sign in with their 6-character family code
   meanwhile. Still true 2026-09-06.
4. ⚠ **Rotate the VAPID keypair** — the private key is in git history (`dba9b8e`)
   permanently. Update the Netlify vars and `VAPID_PUBLIC_KEY` in `engine/app.js`.
   Costs nothing now: there are no real subscribers yet.
5. **Push notifications for assignments** — infrastructure ready, `push-send.js`
   not wired to assignment creation. Badge API not started.
6. **Split `admin.js` (133 KB) + `teacher.js` (28 KB) behind a role check** —
   every child parses them on first load for screens they can never open.
7. **Grades 1–2 need a picture-first question mode** — the renderer assumes the
   child can read the question *and* all four options.
8. **The grade 7–9 subject list is CONFIRMED** against the MIE NCF/TLS Grades 7–9
   (2026-09-08): English, Français, Mathematics, Science and **Social & Modern
   Studies** — 15 packs, 159 chapters, all still `comingSoon: true` because they
   have no questions yet.
   ⚠ **There is no separate History or Geography at 7–9.** Both live inside Social
   & Modern Studies, and the NCE assesses it as one subject; the old
   `grade{7,8,9}-history` placeholder packs were replaced. Chapters are grouped so
   the historical, geographical and civic strands stay distinguishable.
   ⚠ Grade 9 Science carries the exam’s own **B/C/P split** (`C1…C5`, `P1…P5`,
   `B1…B4`), matching the three separate NCE science papers.
   ⚠ Still to check before writing questions: the English and French **grammar**
   chapters. Those syllabus tables are dense multi-column layouts and pdftotext
   interleaved some columns, so verbs, modals, pronouns and prepositions were
   written at a deliberately general level. Re-read pp. 15–19 of the PDF first.
9. Still open from the security review, none as exploitable as the five fixed:
    the **local** parent-PIN copy is still base64 under `_getStoredPinHash`
    (now only a convenience check — the credential is
    `profiles.parent_pin_hash`), missing SRI on three CDN scripts with a
    floating `@2` major, CSP `'unsafe-inline'` (311 inline handlers), and the
    dormant plaintext-equality branch in `verify_student_pin`.
    ⚠ `parent_pin_hash` is a **plain SHA-256 with a fixed, shared salt**, so a
    4-digit PIN is 10 000 candidates to anyone who can read the column. Only
    the owner and an admin can (`profiles_select`), which is why this is a note
    and not an emergency — but a per-user salt and a slow KDF are what it
    should be now that the hash mints sessions.
    ⚠ `profiles_update` lets a parent write **their own** `parent_pin_hash`
    with no column restriction, and it is deliberately not in the privileged-
    column trigger list. That was harmless while the PIN gated a UI switch. It
    now means a live parent session can rewrite the credential — the same power
    that session already has, so it changes nothing today, but it is the next
    thing to guard if the PIN gains any further reach.
10. Content gaps: English "Vocabulary Builder", maths "Shapes Around Us",
    grade-6 maths enrichment. Illustration coverage in grade5-maths is still only
    ~1.4% of a 1,045-question pool.
11. **`daily` would be better as its own table** than a key in the rewritten-whole
    blob (~2.4 MB uploaded per 30-minute session at current caps). A migration
    plus a rewrite of every reader — not a quick change.
12. Payments are not wired: `openPlansModal()` is the single place to add them,
    and `payment-webhook.js` verifiers **fail closed** on purpose — enabling
    payments must break loudly until real signature checks are written.

---

## Coding rules (do not break these)
- **Vanilla JS only** — no React, no Vue, no frontend bundler.
- **No comments** unless the WHY is non-obvious.
- **Autonomous execution** — implement fully; don't ask for confirmation on
  obvious tasks.
- **Student-first UX** — any new UI must work cleanly on mobile.
- **L4 = word problems** — difficulty 4 must be applied/contextual. ⚠ In maths only;
  L4 means something different in each pack (see the difficulty note above).
- **Alt text must never reveal the answer.**
- **Never remove `// @enrichment` guard comments.**
- **Measure, don't reason** — every ⚠ above exists because something that looked
  obviously correct was not.

## How to continue
Open this file first, then grep `ENGINEERING-NOTES.md` for anything you are about
to investigate. Immediate next steps are under **Pending / not yet done**.
