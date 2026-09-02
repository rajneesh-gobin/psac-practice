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
supabase-*.sql              ← see "Database" below; `ls supabase-*.sql` is the authority
engine/
  supabase.js protect.js helpers.js questions_engine.js registry.js events.js store.js
  question_loader.js app.js biometric.js auth.js teacher.js admin.js forum.js
  calendar.js search.js classroom.js shop.js
netlify/
  functions/    questions.js push-*.js weekly-digest.js notify.js assignment-submit.js …
  lib/          student-auth.js questions-sandbox.js
  build-questions.js  import-questions.js
  question-bundles/   ← GITIGNORED, rebuilt by build-questions.js on every deploy
subjects/grade[1-9]-[subject]/
  _manifest.js            ← registerSubject() + chapters + SYLLABUS + generators
  questions/ch01_*.js …   ← plain scripts; enrichment_*.js, past_paper_*.js
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
| Credits + entitlement model, `sellableChapters/Subjects` | `engine/shop.js` (the shop *screen* — `renderShop()` — lives in `app.js`) |
| Admin panel, shop settings, security log | `engine/admin.js` |
| Server-side entitlement enforcement | `netlify/functions/questions.js` |

## Engine load order (script tags in `index.html`)
```
supabase.js → protect.js → helpers.js → questions_engine.js → registry.js →
events.js → store.js → [all 45 subjects/*/_manifest.js] →
subjects/grade5-maths/help.js → question_loader.js → app.js → biometric.js →
auth.js → teacher.js → admin.js → forum.js → calendar.js → search.js → classroom.js
```
Two guarantees are load-bearing — verify against `index.html` before trusting
any summary of it, this one included:
- **Manifests load BEFORE `app.js`.** `CHAPTERS` is declared *once* in the repo,
  as `const CHAPTERS` in `subjects/grade5-maths/_manifest.js`, and `app.js`
  references it at top level. Move a manifest after `app.js` ⇒ ReferenceError.
- **`app.js` loads BEFORE `auth.js`.** `auth.js` ends by calling `Auth.init()`,
  which needs `showScreen` and `ACTIVE_STUDENT_ID` from `app.js`.

⚠ **Before any grade 1–3 / 7–9 pack is filled in, the 45 manifest tags must
become a lazy per-grade load.** They are blocking scripts; 45 real packs ≈ 600 KB
parsed before `app.js` runs, on the cheap Android phones this app already had
display problems on.

## Key globals
- `STATIC_QUESTIONS` — flat array; every question file pushes into it
- `CHAPTERS` — chapters of the active pack. **Starts `[]`**; mutated in place by
  `activateSubjectPack()`. (It used to ship full of Grade 5 Maths, which is how
  a Grade 4 child tapping Science got maths.)
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

## ⚠ Code that is duplicated on purpose — change every copy together
There is no shared module between the browser and the Lambdas. Each of these has
bitten this project at least once:

| Thing | Copies |
|---|---|
| **Question factories** (`makeMCQ`…`makeSymmetry`) | `engine/helpers.js`, `netlify/functions/questions.js`, `netlify/build-questions.js`, `netlify/lib/questions-sandbox.js` |
| Sandbox context (`STATIC_QUESTIONS` as a **real array**, `window.PSAC_PDF_QUESTIONS`) | the three server copies above |
| `FREE_GRADES` / free-grade helpers | `engine/helpers.js`, `netlify/functions/questions.js` |
| Mauritius day-key helpers (`_muDayKey`) | `engine/app.js`, `engine/store.js`, `netlify/functions/weekly-digest.js` |
| Student-token resolution | `netlify/lib/student-auth.js` ↔ Postgres `current_student_id()` |
| Shop defaults | `SHOP_DEFAULTS` (admin.js), `DEFAULTS` (shop.js), the SQL `coalesce()`s |
| `REWARD_SLOTS` | app.js ↔ functions/questions.js |
| Kid vibe list | `KID_VIBES` (app.js) ↔ `:root[data-kid-vibe=…]` (style.css) |
| `FREE_UNTIL_LABEL` | `app.js` constant ↔ 8 `<span data-free-until>` in index.html (first-paint fallback) |

⚠ **Reading the code is not a sufficient check for the factory copies.** Grep the
**built bundle** for the field. `learnMore` and `subsection` were each silently
stripped at build time for months while the source looked correct.

---

## Grades, pricing, and `comingSoon`
- **Registered: grades 1–9.** Live: **4, 5, 6**. The other 30 packs are
  `comingSoon: true` placeholders (one manifest + one sample question).
- **Grades 1–2 are free forever; 3–9 are paid.** Permanent, and deliberately
  stated separately from the temporary "free until `FREE_UNTIL_LABEL`"
  (currently 30 September 2026) promotion.
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

### Question cache (`mm_qc_v<N>_<subject>`, 7 days)
⚠ **This is the ONLY offline copy of the questions** — the SW deliberately no
longer caches `/functions/questions` (that response varies per caller).
- One subject ≈ 272 KB (max 473 KB); a whole grade 1.1–1.66 MB; all three grades
  4.3 MB against a ~5 MB quota. `_LRU_MAX = 6` subjects, trimmed *before* writing.
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
⚠ **Browser-local** (`localStorage`, `psac_parent_pin_v1`), gating a UI switch
only — it cannot mint a Supabase session, which is why an expired session still
asks for the password. All copy says **"in this browser"**, not "on this device":
localStorage is per origin + browser profile, so a preview URL, another browser,
a private window, or Safari's 7-day eviction all lose it.
`openParentPinSetup()` is the unguarded entry (Account & Settings → Security);
`_promptSetParentPin()` keeps its once-only first-run guard.

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
- The student-switch PIN pad holds **no auth logic** — it fills the same three
  fields and calls the same `studentSignIn()`. ⚠ `_showAuthError()` is routed
  into the modal while it is open, or the wrong-PIN message is written to a
  screen nobody can see.
- Referrals: `?ref=CODE` captured before routing. `referral_code` (public, for
  WhatsApp) is deliberately **not** `families.family_code` (private join secret).
- **The forum is adults-only, in the database** (`auth.uid() IS NOT NULL`), not
  by hiding the button. A child session is anon and is excluded by construction.
  `_ADULT_ONLY_SCREENS` in `showScreen()` covers every route in.

---

## Database
⚠ **`ls supabase-*.sql` is the authority** on which files exist — there are **14
today**, one per change, and any list written here goes stale. The table below
covers only the ones that still need a decision; the rest
(`supabase-plan-enforcement`, `-question-reports`, `-questions-admin-policies`,
`-questions-protected`, `-questions-table`, `-storage-setup`) are applied.

| File | What it is |
|---|---|
| `supabase-coparent.sql` | **Outstanding.** Co-parent access: a second/third adult login on one family. Rewrites the ownership predicate **from the live definitions**, never from the dump. Tested by `scripts/sql-tests/run-coparent.sh`. |
| `supabase-forum-author.sql` | **Outstanding — run first.** Trigger deriving forum author identity from the session. |
| `supabase-geo-map.sql` | **Outstanding.** One additive SELECT policy so `mm_data.geo_map_content` (the published interactive-map content) is readable by a child's anon session. Purely additive; writes stay `is_admin()`. |
| `supabase-migration.sql` | Outstanding. Parts 1–4 unattended; **Part 5 is destructive and stays commented out**. |
| `supabase-credits-shop.sql` | Re-run needed (see Pending). Idempotent; **backfills** settings. |
| `supabase-indexes.sql`, `supabase-forum-adults.sql`, `supabase-grades-1-9.sql` | Applied. Idempotent. |
| `supabase-schema.sql` | Generated dump. Reference only. |

### ⚠ Three rules that have each cost real damage
1. **Never author a policy change from `supabase-schema.sql`.** It is stale.
   Query `pg_policies` on the live database first — writing against the dump once
   produced a policy that would have silently un-restricted the forum.
2. **`public.students` has COLUMN-LEVEL SELECT grants** (so `pin`, `pin_hash`,
   `pin_attempts`, `pin_locked_until` stay unreadable). **Any new column inherits
   no grant**: every query touching it fails `42501 permission denied for table
   students`, a message that never names the column, and the client turns that
   into an empty result. Put a `GRANT SELECT (col)` beside every `ADD COLUMN`.
   (This is how adding `deleted_at` emptied the parent dashboard.)
3. **Grant `TO anon, authenticated` for anything a child calls.** A child session
   is `anon` + a token header. The friend RPCs were `authenticated`-only and dead.
   And check every function in a `revoke … from public` block actually has a
   matching grant — `purchase_subject()` did not.

### Other database facts worth keeping
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
- ⚠ `engine/calendar.js`, `style.css` and `weekly-digest.js` are **CRLF**;
  `engine/app.js` is LF. A multi-line search string written with `\n` matches
  nothing in a CRLF file and reports "anchor not found" as though the code had
  changed. Normalise in memory, restore the file's own convention on write.
- Everything user-supplied goes through `_attr()` / escaping — mistake rows,
  child display names and the digest email all carry typed input.

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
- **Catalogue size: 58 Mauritius · 23 Rodrigues · 20 world**, every one on real lon/lat. Categories are
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
  mountain should not), falls in the right district, and — for the world map,
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
  file, or returning users never receive it. Currently **v64**.
- **`_CACHE_VERSION` (`question_loader.js`)** — bump when question content or the
  cache envelope changes. Currently **v14**.
- ⚠ The SW shell list is all-or-nothing (`cache.addAll` rejects wholesale on one
  404). **Re-check `<script src="engine/…">` tags against `SHELL_FILES` on every
  deploy that touches them.**
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

### Netlify env vars (dashboard only, never in the repo)
`SUPABASE_SERVICE_ROLE_KEY` (⚠ its absence used to fail *open*),
`SUPABASE_ANON_KEY`, `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_EMAIL`.

---

## Verifying work — traps in the harnesses
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
- SQL changes are applied against production **inside a transaction and rolled
  back**, or against `postgres:16-alpine` with the live constraints.
- The write step is not self-verifying: always reconcile "rows written" against a
  fresh count. A quote-style mismatch once skipped 119 questions *while reporting
  success*.

---

## Current state
- **15 live packs, 148 chapters, 5,428 questions, 100% subsection-tagged**, plus
  162 past-paper items and 30 `comingSoon` placeholder packs.
- Per-pack counts: grade5-maths 1,023 · grade6-maths 432 · grade4-maths 186 ·
  english 212/269/259 · french 355/415/436 · history 279/369/315 ·
  science 286/287/305.
- Every live grade has enrichment chapters (History, Science), a Map Skills SVG,
  Passages & Text Types (English + French) and Description d'Images (French).
- Read-aloud speaks the **question only, not the options** (accepted). French
  packs speak `fr-FR` with a matching voice; voices are warmed at load because
  `getVoices()` is empty on the first tap, and `speak()` stays synchronous inside
  the gesture for iOS.
- ⚠ **No child had a single day of `daily` data as of 2026-08-30** — the dated
  reporting code had not run in production. Reports, family overview and calendar
  fill in from each child's next session after deploy.

## Pending / not yet done
1. ⚠ **Run `supabase-forum-author.sql`** — the only outstanding migration from the
   security review, and the server half of the forum impersonation fix. Until it
   runs, a crafted request can still mint a teacher badge.
2. ⚠ **Re-run `supabase-credits-shop.sql`**, then Admin → Content → 🛒 Credit Shop
   → **Publish catalogue** once. `purchase_subject()` / `shop_subject_price()` are
   confirmed missing on the live database, and whole-subject buying refuses
   outright without a published catalogue.
3. ⚠ **Run `supabase-geo-map.sql`**, then Admin → 🗺️ Maps → **Publish to
   children** once. Until it runs, `mm_data`'s read policy allows only
   `global_settings`, so a published map edit is readable by nobody but the
   admin who made it. The editor probes the row as an anonymous caller after
   publishing and says so in its status line. The client ships safely without
   it: an unreadable key falls back to the local cache, then to the built-in
   catalogue.
4. **`supabase-migration.sql`** — PIN-counter move, ambiguous-family-name guard,
   push-subscription cleanup on delete.
5. **Run `supabase-coparent.sql`** to switch co-parent access on. The client
   ships safely without it: `getMyFamily()` tries ownership first and only then
   `my_member_family()`, so an un-migrated database behaves exactly as today.
6. ⚠ **Rotate the VAPID keypair** — the private key is in git history (`dba9b8e`)
   permanently. Update the Netlify vars and `VAPID_PUBLIC_KEY` in `engine/app.js`.
   Costs nothing now: there are no real subscribers yet.
7. **Push notifications for assignments** — infrastructure ready, `push-send.js`
   not wired to assignment creation. Badge API not started.
8. **Lazy per-grade manifest loading** — required before any placeholder pack is
   filled in (see load order).
9. **Split `admin.js` (133 KB) + `teacher.js` (28 KB) behind a role check** —
   every child parses them on first load for screens they can never open.
10. **Grades 1–2 need a picture-first question mode** — the renderer assumes the
   child can read the question *and* all four options.
11. **Confirm the MIE lower-secondary subject list for grades 7–9** before writing
   any NCE content.
12. Still open from the security review, none as exploitable as the five fixed:
    parent PIN stored as base64 under `_getStoredPinHash`, missing SRI on three
    CDN scripts with a floating `@2` major, CSP `'unsafe-inline'` (311 inline
    handlers), and the dormant plaintext-equality branch in `verify_student_pin`.
13. Content gaps: English "Vocabulary Builder", maths "Shapes Around Us",
    grade-6 maths enrichment. Illustration coverage in grade5-maths is still only
    ~1.4% of a 1,045-question pool.
14. **`daily` would be better as its own table** than a key in the rewritten-whole
    blob (~2.4 MB uploaded per 30-minute session at current caps). A migration
    plus a rewrite of every reader — not a quick change.
15. Payments are not wired: `openPlansModal()` is the single place to add them,
    and `payment-webhook.js` verifiers **fail closed** on purpose — enabling
    payments must break loudly until real signature checks are written.

---

## Coding rules (do not break these)
- **Vanilla JS only** — no React, no Vue, no frontend bundler.
- **No comments** unless the WHY is non-obvious.
- **Autonomous execution** — implement fully; don't ask for confirmation on
  obvious tasks.
- **Student-first UX** — any new UI must work cleanly on mobile.
- **L4 = word problems** — difficulty 4 must be applied/contextual.
- **Alt text must never reveal the answer.**
- **Never remove `// @enrichment` guard comments.**
- **Measure, don't reason** — every ⚠ above exists because something that looked
  obviously correct was not.

## How to continue
Open this file first, then grep `ENGINEERING-NOTES.md` for anything you are about
to investigate. Immediate next steps are under **Pending / not yet done**.
