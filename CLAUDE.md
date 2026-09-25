# PSAC Exam Practice — Project Brief for Claude

## What this is
A vanilla JS single-page app for Mauritian primary children revising for the
**PSAC** exam (grades 1–9 registered; **grades 1–9 are all live** as of
2026-09-16 — only `grade1/2/3-ict` are still `comingSoon`). Subjects: Maths, English, French, Science, History
& Geography. Hosted on **Cloudflare Workers** (`wrangler deploy`, assets staged
into `.deploy/` by `scripts/prepare-deploy.js`); backend **Supabase**
(`https://xawvjwsiqhtxgpocdqgm.supabase.co`). No frameworks — HTML/CSS/JS +
Tailwind CDN.

## Where the documentation lives
| File | What it is |
|---|---|
| **`CLAUDE.md`** (this file) | The index, the architecture, and the rules that apply anywhere. Loaded every session — **keep it short**. |
| **`docs/claude/*.md`** | One file per area (routing table below). Each holds the full rules for that area. |
| **`.claude/*.md`** | Detailed reference extracted from CLAUDE.md — feature map, engine internals, content model, enforcement table, current state. |
| **`ENGINEERING-NOTES.md`** | The long-form archive (~400 KB): why each rule exists, how each bug was found, what was measured. **Grep it before re-investigating anything.** |
| `PROJECT_OVERVIEW.md`, `PLAN.md`, `ARCHITECTURE.md` | Older overviews. Historical. |
| `HOW_TO_RUN_LOCALLY.md`, `HOW_TO_PUBLISH.md`, `DB_IMPORT_GUIDE.md` | Operational. |

### ⚠ Read the area file BEFORE you touch that area

| Touching… | Read first |
|---|---|
| **NCE Grade 9 content — what to write next** | [`docs/nce-grade9/batch_plan.md`](docs/nce-grade9/batch_plan.md) |
| a question file, a pack, `exam_depth.js`, cloze/errorhunt, exam weights, the importer | [`content-authoring.md`](docs/claude/content-authoring.md) |
| `store.js`, `question_loader.js`, `DB`, the localStorage caches | [`data-storage.md`](docs/claude/data-storage.md) |
| `auth.js`, the parent PIN, sessions, anything that sends email | [`auth-sessions.md`](docs/claude/auth-sessions.md) |
| SQL, RLS, a policy, a grant, `supabase-schema.sql` | [`database.md`](docs/claude/database.md) |
| `style.css`, `index.html`, any screen, modal, layout or the map | [`ui-css.md`](docs/claude/ui-css.md) |
| `sw.js`, `netlify.toml`, a deploy, or a headless-Chrome harness | [`deploy-and-verification.md`](docs/claude/deploy-and-verification.md) |
| minigames, teacher mode, the landing page, timetable, materials, contact form, sharing, **subject certificates**, **the activity trail** (`engine/activity.js`, Admin › Activity) | [`features.md`](docs/claude/features.md) |
| what to do next, or anything reported as outstanding | [`pending.md`](docs/claude/pending.md) |
| **building the Android app** — keystore, Bubblewrap, assetlinks | [`docs/android-build.md`](docs/android-build.md) |
| **the Android app / Google Play** — what must change in the web app first | [`docs/android-readiness.md`](docs/android-readiness.md) |
| **the teacher board or the classroom section** — before changing either | [`teacher-redesign-plan.md`](docs/claude/teacher-redesign-plan.md) |
| **Science Labs** (`engine/labs/` — per grade: Grades 4-9, Grade 5 borrows 4 and 6; build contract in `docs/labs/LAB_SPEC.md`) | [`docs/labs/PLAN.md`](docs/labs/PLAN.md) |

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
  _index.js               ← GENERATED eager pack index
  _counts.js              ← GENERATED per-pack/per-chapter/per-difficulty question counts
  grade[1-9]-[subject]/
    _manifest.js          ← registerSubject() + chapters + SYLLABUS + generators
    questions/ch01_*.js … ← plain scripts; enrichment_*.js, past_paper_*.js, exam_depth.js
```

See [`.claude/feature-map.md`](.claude/feature-map.md) for the full feature → file table.

---

## Engine load order
```
supabase.js → protect.js → helpers.js → questions_engine.js → registry.js →
events.js → store.js → subjects/_index.js → question_loader.js → app.js →
biometric.js → auth.js → calendar.js → search.js → classroom.js
```
- ⚠ **`app.js` loads BEFORE `auth.js`** — verify against `index.html`, never a summary.
- ⚠ Anything taking a child **into** a subject must `await PackLoader.ensure()` first.
- ⚠ **`registerSubject()` MERGES and MUTATES** — never replace the array slot.

Full details: [`.claude/engine-internals.md`](.claude/engine-internals.md)

---

## Key globals
- `STATIC_QUESTIONS` — flat array; every question file pushes into it.
- `CHAPTERS` — declared in `engine/registry.js`, starts `[]`, mutated in place.
  ⚠ Re-declaring it in a pack manifest throws *"Identifier 'CHAPTERS' has already been declared"*.
- `PackLoader` — `ensure(packId)` / `ensureGrade(grade)` / `isLoaded(packId)`.
- `ACTIVE_PACK` / `ACTIVE_STUDENT_ID` / `SUBJECT_PACKS`.
- `DB` — the student progress blob (localStorage + Supabase `student_progress.data`).
- `S` — session state: `S.practice.{chapterId,qs,idx,difficulty,session}`, `S.exam.{…}`.
- `_activePack()` returns **null** when nothing is chosen — every caller handles null.

## Key functions
`makeMCQ / makeNum / makeTF / makeMatch / makeSymmetry / makeCloze / makeErrorHunt` ·
`startChapterDirect(chapterId, forceDiff)` · `loadPracticeQuestion()` ·
`renderExamQuestion()` · `renderChapterSelect()` · `assembleExamPaper(type)` ·
`showScreen(id)` · `getQuestionsForChapter()` / `getMixedQuestions()` ·
`_makeImgsZoomable()` · `speakQuestion(mode)` · `_saveResume()` / `_doResume()` ·
`_chapterProgress(chapterId)` · `_prettyMath()` · `_gradeStage(grade)`

---

## Content model
→ [`.claude/content-model.md`](.claude/content-model.md) — question format, chapter shapes, subsections, enrichment, difficulty rules

## Adding or changing questions
→ [`.claude/questions-checklist.md`](.claude/questions-checklist.md) — 7-step checklist

## Duplicated code — change every copy together
→ [`.claude/duplicated-code.md`](.claude/duplicated-code.md) — factories, sandbox context, salt, PIN, rewards, email prefs, share copy

## Grades, pricing, and `comingSoon`
→ [`.claude/grades-pricing.md`](.claude/grades-pricing.md) — which grades are live, free/paid rules, comingSoon guard

## ⚠ Where each rule is ACTUALLY enforced
→ [`.claude/enforcement.md`](.claude/enforcement.md) — client draws, server decides; the full enforcement table

---

## Subject certificates → [`features.md`](docs/claude/features.md)
One certificate per **subject**, nine levels, overwritten in place.
- ⚠ **"Mastered" is `state = 'secure'` and nothing else** — `improved` does not count.
- ⚠ **The denominator is `subjects/_counts.js`, GENERATED** — `check.js` fails on drift.
- ⚠⚠ **Every gradient id in the SVG is unique per render** — shared `id="cg"` paints with the first one's paper.

## Data & storage → [`data-storage.md`](docs/claude/data-storage.md)
- ⚠ **Day keys are Mauritius days (`_muDayKey`)**, never the device clock.
- ⚠ **`Store.saveStudentProgress()` is a throttle, not a debounce.**
- ⚠ **The question-cache key carries the OWNER** — a handover must call `QuestionLoader.useStudent(id)`.

## Auth & sessions → [`auth-sessions.md`](docs/claude/auth-sessions.md)
- ⚠ **`x-student-token` must never touch `/auth/v1/`** — it is not CORS-safelisted.
- ⚠ **The parent PIN may never reset or change a password**, and an admin can never be entered by PIN.

## Database → [`database.md`](docs/claude/database.md)
- ⚠ **`public.students` has COLUMN-LEVEL SELECT grants** — add `GRANT SELECT (col)` beside every `ADD COLUMN`.
- ⚠ **A `DELETE` whose policy matches no row returns no error** — use `.delete().select('id')`.

## UI, CSS and layout → [`ui-css.md`](docs/claude/ui-css.md)
- ⚠ **Never add `transform`, `translate`, `filter` or `contain` to `.screen`, `main` or `body`.**
- ⚠ **No regex lookbehind anywhere** — `(?<=…)` is a parse error on Safari <16.4.

## Caching, deploy and verification → [`deploy-and-verification.md`](docs/claude/deploy-and-verification.md)
- ⚠ **Read `SHELL_VERSION` and `_CACHE_VERSION` from `sw.js` and `question_loader.js`**, never from a `.md`.
- ✅ **Stage first**: `node scripts/prepare-deploy.js`, then `netlify deploy --prod --dir=.deploy`.

---

## Current state
→ [`.claude/current-state.md`](.claude/current-state.md) — 46 live packs, 457 chapters, 34,392 questions (measured 2026-09-16)

---

## Pending / not yet done → [`pending.md`](docs/claude/pending.md)
20 numbered items, 0 and 1 closed. **There are no outstanding SQL migrations.**
- ⚠ **Item 1 (the public `netlify/` directory) is CLOSED** — re-probed anonymous
  2026-09-26: every leaked path 404s, `/api/questions` and
  `/.netlify/functions/questions` both 401.
- ⚠ **Item 19: CI runs on `[main, dev]` only, and the work happens on `cloudflare`.**
  No suite in `ci.yml` has ever run on a commit on this branch.

## ⚠⚠ A SERVICE-WORKER CACHE CAN OUTLIVE EVERY DEPLOY
A `.js` request answered with the HTML shell is a **200**, so it is cached and
then served ahead of the network — `Unexpected token '<'` at line 1 on every
load, forever. `DATA_CACHE` and `psac-static-assets` **survive a
`SHELL_VERSION` bump by design**, so no deploy can clear them; only a
`DATA_VERSION` bump can, and nothing clears the unversioned asset cache.
- ⚠ **A hard reload does not touch Cache Storage.** Ctrl+Shift+R bypasses the
  HTTP cache only. This is why the symptom survived three correct deploys.
- ⚠ **It is not a boot failure, so the recovery panel never fires** — the app
  starts fine, `appStarted()` is true, and the child is told “No subjects
  available for Grade 5 yet”, a content message for a corrupted cache.
- ✅ Now guarded twice: `typeOk()` in `sw.js` refuses to serve *or store* a
  wrong-typed response in **both** cache strategies, and `selfHealOnce()` in
  `engine/protect.js` clears every cache and reloads **once per session**
  (`scripts/test-self-heal.js`, 16 checks).

---

## Coding rules (do not break these)
- **Vanilla JS only** — no React, no Vue, no frontend bundler.
- **No comments** unless the WHY is non-obvious.
- **Autonomous execution** — implement fully; don't ask for confirmation on obvious tasks.
- **Student-first UX** — any new UI must work cleanly on mobile.
- **L4 = word problems** in maths only; L4 means something different in each pack.
- **Alt text must never reveal the answer.**
- **Never remove `// @enrichment` guard comments.**
- **Measure, don't reason** — every ⚠ in this brief exists because something obviously correct was not.

## How to continue
1. Read this file.
2. Open the area file for whatever you are about to touch — the routing table is at the top.
3. Grep `ENGINEERING-NOTES.md` before re-investigating anything.
4. Immediate next steps are in [`pending.md`](docs/claude/pending.md).
5. **For NCE Grade 9 content work**, the sized queue is [`docs/nce-grade9/batch_plan.md`](docs/nce-grade9/batch_plan.md).
