# Feature areas — landing page, games, teacher mode, timetable, materials, contact, sharing

## Points, levels and the leaderboard
Points are **minted in the database**, never in the browser
(`migrations/20260909_points_and_leaderboard.sql`). `DB.xp` still exists and is
still drawn in the header chip, but it is now a **cache** of `student_points`, not
the score. The whole design follows from one fact: a friends leaderboard among 20
children a child chose tolerates a client-written number; a **global** one does
not, and `get_my_friends()` was reading `data->>'xp'` — a value any child can set
from devtools in five seconds.

| Earns | Worth | Paid once per | Cap |
|---|---|---|---|
| a question answered correctly | its `questions.difficulty`, 1–4 | question, **ever** | — |
| a finished game run | 5 | run | 3 a day, **across all games** |
| a planned timetable session done | 10 | `schedule_entries.id` | 3 a day |
| a new friend | 25, **both children** | pair, **ever** | 10 pairs, lifetime |
| old XP carried forward | as it stood | `kind='legacy', ref='v1'` | once |

- ⚠ **The ledger `student_point_events` IS the anti-abuse mechanism**, not a log.
  `UNIQUE (student_id, kind, ref)` is the only thing making any "once" true.
- ⚠ **A friendship's points survive unfriending.** `remove_friend()` deletes the
  `student_friends` row and deliberately **not** the ledger row, so delete-and-
  re-invite pays 0. Two more guards, because "once per pair" alone still allows 20
  accounts made this afternoon: the other account must be **24h old**, and only
  **10 pairs** ever pay against a 20-friend ceiling.
- ⚠ **The client never sends an amount.** `award_activity_points(kind, ref)` looks
  the value up server-side, so there is no number to inflate, and `'question'` /
  `'friend'` / `'legacy'` are refused from it as `unknown_kind`.
- ⚠ **Difficulty comes from the `questions.difficulty` COLUMN**, not from the
  question the client just answered. An id the server does not know pays the
  **floor of 1**, never the maximum — generators and projected `task` items produce
  ids that were never imported, and paying an unknown id well is what would make
  "invent an id" a strategy. (Measured: 194 of 33,832 bundle rows carry no
  difficulty, and all 194 are past papers, which are never gradable.)
- ⚠ **Paying on first CORRECT, not on first ATTEMPT** — a child who gets it wrong,
  learns it and comes back is paid in full. That is the app.
- ⚠ **Game answers still never reach `recordAnswer()` / `_recordDaily()`.** The
  award is a lump in `_awardRun()` at the end of a run, so a replay still cannot
  distort the mastery reporting parents rely on.
- ⚠ **The timetable award fires on RENDER, because there is no completion event** —
  a session reads as done when its chapter was practised today. Safe only because
  the ledger makes every repeat free.
- ⚠ **The leaderboard carries a name, an avatar, a grade and a score, and nothing
  else** — no id, no `friend_code`. It is a public surface showing children who
  have never met. It also filters to **one grade** by default and hides anyone on
  0 points.
- ⚠ **The level curve is written TWICE** — `POINTS_THRESHOLDS` in `engine/app.js`
  and `points_level()` in SQL. `scripts/test-points-levels.js` fails on a
  one-point drift. Twelve levels, top at 13,000; a full grade answered once is
  ~9,600 points, so Level 10 is "finished your grade".
- Tests: `scripts/sql-tests/run-points-tests.sh` (51 assertions against a real
  postgres, run as `anon` with a genuine `x-student-token`) and
  `scripts/test-points-levels.js`.

### The global leaderboard screen (`screen-leaderboard`)
⚠ **OFF BY DEFAULT, and the switch is in the database.** `leaderboard_enabled()`
reads `global_settings.leaderboard_enabled`, which **coalesces to `false`** — an
older blob with no such key reads as off, and so does a failed read on the client
(`Store.leaderboardEnabled()` returns `false`, never `true`, on error).
- **Admin › Content → 🌍 Global Leaderboard** is the only way to turn it on, and
  turning it *on* asks for confirmation naming exactly what becomes visible. This
  is a safeguarding decision, not a feature flag: it makes every child's display
  name and score visible to every other child in the app.
- ⚠ **Hiding `#dash-global-lb` is presentation; the enforcement is that
  `get_points_leaderboard()` returns no rows to anybody while the switch is off**,
  and `get_my_points_rank()` answers `leaderboard_disabled` — a *distinct* error
  from "you are last", because the client has to tell those apart.
- ⚠ **This is the only screen that renders text written by another family.**
  Every name and avatar goes through `_attr()`. `scripts/test-global-leaderboard.js`
  drives a `<img src=x onerror=…>` display name through the real renderer in real
  Chrome and fails if it executes — verified to fail when `_attr()` is removed.
- The RPC returns name · avatar · grade · level · points and **no id, no
  `friend_code`**, so nothing on the board lets one child reach another.
- Defaults to **the child's own grade**, with an "All grades" tab. A Grade 4 child
  ranked against Grade 9 is not a competition.
- `null` from the fetch is a **failed read** and says so; `[]` is a real empty
  board. Conflating them would draw "be the first!" over a network blip.



> Part of the PSAC brief. Start at [`CLAUDE.md`](../../CLAUDE.md) — it carries the
> architecture, the rules that apply anywhere, and the index to these files.
> Read the relevant part before changing one of these surfaces.
> Long-form history and how each rule was found: grep `ENGINEERING-NOTES.md`.

⚠ Nothing in any `.md` outranks the code or the live database. Measure, then edit.

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

---

## The Game Zone (minigames)
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

## Parent-controlled Game Settings
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
  — answer present once, options unique, answer within the first four), the grades
  in `context().grades` and no others (own grade alone by default — see
  **Grade access** below), locked/admin-blocked
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

## Grade access — the parent grants grades, the child aims upward
`GradeAccess` (**engine/helpers.js**, so it loads before everything that reads it)
is the single definition. Two settings in two places, because two different people
write them:
- **Parent** → `restrictions.allowedGrades` (`students.settings`, parent-written).
  The extra grades this child may use. Rendered by `_renderGradeAccess()` (app.js),
  written by `Auth.toggleGradeAccess()`. Read by the practice hub's grade dropdown,
  by Search, and as the ceiling on the child's own control.
- **Child** → `DB.games.sourceGrades` (the progress blob). Which of those grades
  their games draw from. `GameSettings.childGradeBar()` / `toggleSourceGrade()`.
- ⚠ **The child's own grade is NEVER in either list.** It is not a permission, and
  it changes each school year — it is read from the ACCOUNT
  (`GradeAccess.ownGrade()`), never from the blob. `DB.grade` is written nowhere.
- ⚠ **A child may aim UP, never down.** `childChoices()` filters `>= own`. A parent
  may still grant a LOWER grade on purpose — that is how catch-up revision is set
  up — and it reaches Search and the practice hub but never the child's game picker.
- ⚠ **Unlocking a grade changes no game by itself.** `gameGrades()` defaults to
  `[own]`; the child opts in. A grade the parent later revokes drops out of games
  with **no write to the child's blob**.
- ⚠ **Every chosen grade is FIRST-CLASS in the pool** (`buildPool({grades})` sets
  `own: true` for all of them). The legacy `crossGrade: true` path still marks other
  grades `own: false`, i.e. last resort — a child who *asked* for Grade 6 wants
  Grade 6, not Grade 6 once the Grade 5 stock at that level runs out.
- ⚠ **`MiniGames._preloadGrade()` must fetch every source grade**, not just the
  child's own, or the round fails as "not enough suitable questions".
- ⚠ **Legacy `crossGradeSearch` / `crossGradePractice` meant "every other grade"**
  and migrate to exactly that, **on read**, inside `GradeAccess.granted()`. New
  writes keep both booleans in step (`flagsFor()`) so a device on the old shell
  reads the same permission. Nothing else reads them any more.
- ⚠ This is a **parental** control, not an entitlement — the same category as
  `lockedChapters`. `netlify/functions/questions.js` still decides which packs the
  family may fetch; granting Grade 6 cannot hand a child questions their plan
  does not cover.
- Tests: `test-grade-access.js` (model + pool + chips, VM),
  `test-grade-access-ui.js` (both surfaces in real Chrome at 360px, both themes),
  and the grade checks in `test-parent-restrictions.js`.

## Teacher Mode — one destination, one to-do list, one question per screen
Rebuilt 2026-09-10 on one rule: **a teacher must never be asked the same
question in two places, and must never have to work out what to do next.**

### Navigation — Set Work and Results are NOT top-level
Main navigation is **🏫 My classes** and a labelled `⋯ More` (Marks book, All my
files, Past work, Messages, Teacher settings). The classroom screen is
**Today · Work · Pupils · Files** plus `⋯ More` (All marks, Settings).
- ⚠ **`create` and `results` are still real tabs** and `switchTab()` still opens
  them; they are simply not somewhere a teacher *picks*. They used to sit in the
  main nav **beside a classroom screen carrying the same two names**, so
  "Results" meant two different scopes on two screens with no way to tell.
  Each now carries its own `← Back to my class` (`TeacherMode.leaveSetWork()`,
  which reopens the classroom the teacher came from).
- `switchTab('classes')` is an **alias for `'home'`** — Home and Classrooms were
  two tabs with the same greeting, the same "recent activity" and the same
  "needs help" panel. The classroom boards render into `#tc-list` directly under
  `#ta-home` on that one screen.
- `MAIN_TABS` / `DETAIL_TABS` / `MORE_TABS` / `ALL_TABS` in `engine/teacher.js`.

### "What needs you today" — ONE builder
`TeacherInsights.todo(groups, {showClass, limit})` is pure, and **both** Home
(across every class) and a classroom's Today screen call it. A teacher asking
the same question on two screens must not get two answers.
- Pupils are **grouped per piece of work, never one row each** — four pupils who
  have not opened the same homework is one job, not four.
- ⚠ **Never "everyone finished" over a pupil who needs help.** `all-done` is
  suppressed when the same work produced a low or rushed row; a green tick reads
  as "handled", which would be the opposite of the truth.
- Every row's button does exactly what its label says: *Send a reminder* opens
  the share sheet with the message written, *Set easier practice* opens Set Work
  already pointed at the same chapters and the same pupils.
- Evidence thresholds are unchanged and still apply here: ≥ 5 answers before
  "may need help" (< 50%), ≥ 3 answers in a chapter before naming it, "very
  quickly" = < 8 s/question **and** < 60%. **Never label on one or two answers.**

### One counter per classroom
The header strip (`.tc-cd-stats`, four `button.tc-cd-stat`) is the **only** place
a classroom is counted, and each number is the button that opens what it counts.
- ⚠ There used to be **two stat rows on one screen that disagreed**: the strip
  said *"5 submitted"* while a five-tile grid three centimetres below said
  *"2 Submissions"*, because one counted every piece of work and the other only
  the active ones. Do not reintroduce a second counter anywhere in the overlay.

### Set Work — one question per screen
Who → subject → which chapters → how many and how hard → when, five steps with
`Back`/`Next`, a progress track, and a plain-English summary above the button
that sends it (*"Grade 5 Blue will get 10 mixed questions on the whole of
Mathematics, with no timer, due Thursday 17 September."*).
- ⚠ **The wizard owns no state.** Every control is the same element
  `_buildAssignment()` has always read; `gotoStep()` only decides which is on
  screen. A hidden input still answers `.value`, so a step nobody visited still
  publishes correctly — and the publish path, its PGRST202 fallback and the
  success screen are untouched.
- ⚠ **"The whole subject" is a spoken choice** (`input[name=ta-scope]`), not an
  empty form. It used to be "leave every box blank", the least discoverable
  default there is. Choosing it **clears** any tick left from an earlier visit;
  arriving at the step **follows** the ticks instead (`_syncScope`), because
  `prefillPractice()` and `_duplicateAssignment()` tick chapters directly.
- ⚠ **Level 4 does not mean the same thing in every pack**, so the wording
  follows the SUBJECT (`_levelWords`): word problems in maths, a multi-verb
  cloze in French, an extended passage in English, an applied scenario
  elsewhere. A French teacher is never promised word problems.
- `_poolSize()` counts **exactly the pool `_buildAssignment()` will search**, the
  same way. A friendlier number the publish step then contradicts is worse than
  no number. It returns `null` while the subject is still loading, and nothing
  blocks on `null`.
- Each step refuses to be left for a reason in the teacher's own words
  (`_stepProblem`) — every one of them a failure the publish step used to report
  at the very end, moved to the screen that caused it.
- Sharing choice stays on step 1 on purpose (online groups need "Anyone with the
  link" without discovering a disclosure); PIN is the default whenever the
  classroom has pupils, flipped only by the teacher's own tap. The two options
  now say what each **costs**: the open link "cannot be sure who answered".
- **Set Work opens on the classroom's own grade.**
  `teacher_guest_classes.grade` (nullable `smallint`, CHECK 1–9) is asked for
  when a classroom is created and can be changed in its Settings; the class chip
  carries it in `data-grade` and `_applyClassGrade()` preselects `#ta-grade`.
  Migration: `migrations/20260910_teacher_classroom_grade.sql`, applied
  2026-09-10.
  - ⚠ Before it, Set Work opened on the **lowest live grade for everybody** — a
    Grade 5 teacher was shown Grade 1 subjects every time they set homework.
  - ⚠ **NULL is a real answer.** "I have not said" stays expressible, and a
    classroom with no grade changes nothing; `set_grade` with `p_grade: null`
    clears it. A guess dressed as an answer is worse than no answer.
  - ⚠ **Applied only when the chosen classroom CHANGES** (`_gradeAppliedFor`).
    `_renderClassPicker()` re-runs on tab entry and after every list refresh and
    auto-selects the first classroom; re-applying each time would drag the grade
    back from under a teacher who had moved on and changed it.
  - ⚠ The RPC gained `p_grade`, which **cannot** be a `CREATE OR REPLACE` — the
    six-argument overload is dropped in the same transaction, or a six-name
    PostgREST call is ambiguous. The deployed client's six-argument call still
    works, because `p_grade` defaults to NULL.

### The guest homework runner (`guest.html` + `guest.js`)
The page a child opens from a WhatsApp link. It loads **no engine file** by
design, so it carries its own `esc()`, its own answer matching and its own
material sort — and its own copy of the one rule that matters here:
> **Authored content is HTML; only what the PUPIL typed is escaped.**
The question, the options, the answer and the worked explanation all come from
our own repo and are written with `innerHTML`. `d.userAnswer` is the one value
a person supplied, and it stays in `esc()`.
- ⚠ It was the other way round for the answer and the explanation, and that
  printed the tags at the child: *"4⁴ = 4×4×4×4 = 16×16 = `<b>`256 books`</b>`"*.
  Measured in the built bundles: **25,780 of 35,460** questions carry markup in
  their explanation, 55 in their options and 51 in their answer
  (`H<sub>2</sub>O`, `3<sup>6</sup>`) — so this was most of the corpus, and
  stripping tags instead would have turned `3<sup>6</sup>` into **36**.
- ⚠⚠ **Never put authored text in an ATTRIBUTE on this page.** `esc()` escapes
  `& < >` and **not the double quote**, and **944 authored options contain one**
  (`No — it should be "four"`). The option used to be carried in
  `data-v="…"`, which therefore closed early: `dataset.v` held a truncated
  string, that string was POSTed, and `grade()` in
  `netlify/lib/questions-sandbox.js` marked a child who picked the right answer
  **wrong** — stored, and shown to the teacher. The button now carries the
  option **index** (`data-i`) and the text is read back from the question.
- The same asymmetry holds in the app: the assignment review in `app.js` and
  the teacher's *View answers* row in `teacher_workspace.js` escape the pupil's
  answer and render the authored one.
- `scripts/test-guest-answer-rendering.js` — 20 checks in **real headless
  Chrome**, driving the real page with three real authored questions (one with
  a quoted option, one with `<sup>` options, one with a bold explanation) and a
  stubbed `/api/`. ⚠ Needs Chrome for Testing via `CHROME_PATH`; `GUEST_JS`
  points it at a COPY of `guest.js` — never swap the repo's own file to test an
  old version, a second session may be writing it.
  ⚠ Harness trap: **`#g-go` ships enabled**, so "the button is enabled" is not
  "the gate is ready" — `initGate()` attaches its click listener only after the
  metadata arrives, and which side of that race a run landed on flipped with
  the size of `guest.js`.

### One go per device (2026-09-10, APPLIED)
Identity in a guest assignment is the **NAME** — `teacher_guest_open()` keys
`guest_submissions` on `name_key` — so the same name was always refused and a
**made-up one never was**. Measured on a real laptop: finish, reload, type
"Sam2", sit the paper again.
`teacher_guest_access.one_per_device` (**default false**) stops a device that
has already SUBMITTED reopening under a different name.
- ⚠ **A speed bump, not a wall.** The device code is 32 hex characters in
  `localStorage`, not a fingerprint: incognito, a cleared browser and a second
  phone all defeat it. The control that genuinely caps attempts is a
  **per-pupil-PIN classroom**, where `name_key` is a pupil row id nobody can
  invent. Say that to a teacher who asks; do not sell this as more than it is.
- ⚠ **NOT IP, deliberately.** A Mauritian school behind one NAT and mobile CGNAT
  put a whole class on one address — an IP cap locks out twenty-nine innocent
  children to stop one. It is the same reason `teacher_guest_throttle` already
  raises its ceiling to 100 for `nickname`/`shared_pin`. IP stays a wrong-PIN
  throttle key and nothing else.
- ⚠ **It FAILS OPEN.** No device code (private browsing, storage refused) is
  never capped, and an un-migrated database falls back to opening without it.
  This is an integrity nicety, not an entitlement check — the opposite call from
  `questions.js`.
- ⚠ It never fires on the **same** name (`name_taken` already answers that), on
  an **unsubmitted** attempt, or over a teacher-granted `retry_allowed`. It is
  checked **after** the PIN, so it cannot be used to probe an assignment.
- ⚠⚠ The checkbox is shown **only for the open link**, and hiding it is not
  enough — the wizard owns no state and a hidden checkbox still answers
  `.checked`, so `_buildAssignment()` gates on `access === 'nickname'` as well.
  A tick left from an earlier visit would otherwise lock a shared classroom
  tablet after its first pupil.
- The refusal **names who already finished on this device**: on a family laptop
  the honest answer is usually "your brother did it", and a bare refusal reads
  as a bug.
- `scripts/test-guest-device-cap.js` (47 checks) ·
  `scripts/sql-tests/run-device-cap-tests.sh` (the rule on a real postgres:
  fresh build, idempotency, then twelve behavioural assertions).

### The class page — one permanent link (2026-09-10, APPLIED)
`/m/<CODE>` → `materials.html` + `materials.js`, backed by
`netlify/functions/materials-library.js`. Standalone exactly like `guest.html`:
no Tailwind, no supabase-js, no engine file. Four views — **Homework**
(default), **Files**, **Subject**, **Calendar** — plus a search box.
- ⚠ **WHAT IT FIXES.** `shareMaterial()` hands out a signed storage URL for
  **one** file, and `learning_materials.link_expiry_seconds` **defaults to 3600**
  — so the message a teacher sent was one file that was dead by the evening, and
  a second file meant a second message.
- ⚠ **THE SPLIT IS THE FEATURE: the CODE is permanent, the signed URLs are
  minted per visit.** Anything that caches either half breaks it, so `/m/`,
  `materials.html` and `materials.js` are in the service worker's never-cache
  list beside `/a/`, and the function answers `no-store`.
- ⚠⚠ **THE PIN IS THE GATE, NOT THE CODE.** The first draft made the link open
  to anyone holding it, reasoning that the existing single-file share already
  did that. Wrong twice over: a classroom's whole shelf is not one file, and
  this link also lists the class's homework codes. A pupil now signs in the
  same way they already do for homework — **their own PIN** in a per-pupil
  classroom, **the class PIN plus a name** in a shared one. `info: true`
  returns only which form to draw and the class name; nothing behind the gate
  is fetched until it passes.
- ⚠ **Throttled per classroom**, in its own `teacher_guest_class_throttle`
  (`teacher_guest_throttle` keys on `assignment_id` and cannot carry it). Only
  **failures** count and a correct PIN **clears** the counter — a class of
  thirty with the ordinary handful of typos between them would otherwise walk
  the count up and lock the room out by the afternoon. Ceiling 30, because that
  number is shared by everyone behind one school NAT.
- ⚠ **Homework carries codes, never content.** No `question_ids`, no answers,
  no other pupil — and **no score**: a mark belongs on the teacher's screen
  until they have looked at it, and children comparing marks on a shared tablet
  is what this must not enable. Each card links to `/a/<CODE>`, the same guest
  runner; this page starts nothing and grades nothing.
- ⚠ **The per-pupil ROSTER is honoured**: work set for six named pupils must not
  appear on the other twenty-four's page. Expired and deleted work is excluded.
- ⚠ **`get` NEVER MINTS.** Opening the Materials tab reads the code; a read that
  created a public address as a side effect would expose every classroom a
  teacher merely *looked at*. Minting is `create`, reached only by the button
  that says so, and it is idempotent — a second Share tap must reach the SAME
  address or it orphans the first message.
- ⚠ **One `not_found` for every kind of nothing** (no such code, switched off,
  archived, deleted, malformed), or the code becomes an oracle for "does this
  classroom exist".
- ⚠ **The name is remembered per class code; the PIN never is.** One is a label,
  the other is the credential, and this runs on tablets children share.
- ⚠ **NO "Mark as done" on this page**, deliberately: that needs the PIN token a
  child only gets by opening an assignment.
- ⚠ Two defects found by **measuring the rendered page at 360px**, not by
  reading the CSS: `aspect-ratio:1` gave 41px calendar cells (31 sub-44px
  targets), and dark mode's lightened `--brand` left white button text at about
  **2.6:1**. Hence `--on-brand`, which flips with `--brand`.
- `scripts/test-materials-library.js` (116 checks) ·
  `scripts/test-materials-library-render.js` (walks the gate with a wrong PIN
  then a right one, against six awkward materials including a `<script>` title
  and a `javascript:` URL) · `scripts/sql-tests/run-device-cap-tests.sh`.

### ⚠⚠ Uploaded materials that nobody could see (fixed 2026-09-10)
Reported from the field as *"I'm sure I uploaded some materials but I no longer
see them"*. **Nothing was deleted and nothing lives in localStorage** — every
material is a `learning_materials` row plus a Supabase Storage object. Two
separate causes, both of which left the file intact and unreachable:
1. **The junction insert was fired and forgotten.** Both upload paths in
   `teacher_classroom_detail.js` did
   `await _sb.from('classroom_materials').insert({…});` with the result
   discarded, then set the status to *"Uploaded!"* unconditionally. Every list
   — the teacher's and the pupil's — reads **through** that junction, so any
   failure produced a success message over a material no one could ever see.
   ⚠ Zero rows is a refusal too: an INSERT whose RLS policy matches nothing
   returns no error and no rows.
2. **The standalone Materials screen (`engine/teacher.js`) creates no junction
   at all**, by design — you upload there, then tick classrooms. A teacher who
   never ticked had files that existed and belonged to no class.
`_shareWithClass()` now checks the result and says plainly when it failed, and
the classroom's Materials tab carries a collapsed **"Your files not shared with
this class"** list with one-tap Share. ⚠ **A failed share does NOT roll back the
upload** — the file is safely stored and one tap from being fixed; deleting a
teacher's upload because a second write failed would be worse.
### Still true
- **Location survives refresh**: `psac_teacher_loc_v1` (owner-scoped) holds tab,
  list filter, selected results and the open classroom + section.
- ⚠ **The board's `p:not(…):not(…)` rule scores (1,3,1)** and beats every
  single-id override; the teacher CSS uses `#screen-teacher#screen-teacher` on
  purpose. Paper cards carry their own ink in both themes.
- ⚠ **`.tc-cd-nav-btn span` is set three times** (base, the new override, and a
  `max-width:430px` block). Same specificity — the LAST one wins, which is why
  the readable rail labels live at the end of `style.css` with their own copy of
  the media query.
- ⚠ **A refresh superseded by a newer one resolves `undefined`** —
  `TeacherWorkspace.ensureLoaded()` waits for the newest in-flight refresh and
  judges by `loaded`, or Home shows its error state on every load.
- Not shown, on purpose: a "Scheduled" filter (nothing schedules a start), hints
  / attempt limits / answer visibility (no server support). The `?classroom=`
  share link is **inert** (nothing parses it) and is not promoted.
- Tests: `test-teacher-command-centre.js` (VM, 169 checks), `-layout.js`
  (60 screens at 360/1280 × light/dark, overflow + contrast + 44px targets;
  `--shots DIR` walks all five wizard steps), `test-classroom-materials-access.js`,
  `test-coach-teacher-layout.js`.

---

## Paying — manual MCB Juice
Stripe does not accept Mauritius-registered merchants, and the gateways that do
(Peach, MIPS) cost Rs 550–2,200 a month before any revenue. So the first
payment path is the one most small Mauritian sites actually use: the parent
sends a Juice transfer quoting a reference, and an admin confirms it.
- **Parent**: plans modal → *Pay with MCB Juice* → amount, number and a
  6-character reference (no 0/O/1/I/L — it gets typed into a Juice message) →
  *I have sent the money*.
- **Admin**: Plans tab → the queue → *Money received – open access*. The
  confirm dialog names the amount and the reference, because that tap is the
  only thing standing between a stranger and a paid plan.
- ⚠ **"Everything is free right now" and a Buy button cannot both be true.**
  The banner carries `data-free-banner` and comes down exactly when
  `juice_enabled` goes on. ⚠ The *"Grades 1 & 2 are always free"* banner stays
  — that one is permanent and still true.
- ⚠ **The browser never computes an amount.** `payment_start_juice()` takes a
  plan and a month count; the price comes from `plans.price_mur`.
- ⚠ **A failed settings lookup reads as OFF.** Offering a payment method that
  may not be configured is worse than offering none.
- ⚠ **Tapping Buy repeatedly reuses one reference.** Four rows for one transfer
  means an admin guessing which to confirm.
- ⚠ **The parent is never told access is open** until an admin has confirmed.
- ⚠ `netlify/functions/payment-webhook.js` stays a **fail-closed skeleton**.
  Its three verifiers each returned `true` directly above a commented-out block
  that activated subscriptions from the request body; `test-juice-payments.js`
  now fails if any of them returns true again.
- The next step, when volume justifies the monthly fee, is Peach Payments —
  one integration covers cards, MCB Juice, MauCAS QR, blink and Apple Pay, all
  in MUR. ⚠ Juice, MauCAS and blink **cannot be refunded** through it; only
  cards can.

## The printable practice paper (`generatePrintablePaper()`, app.js)
A pop-up window holding a 100-mark paper — Section A (30 × 2, or 20 × 2 for
maths) and Section B (10 × 4, 15 for maths) — plus a second window with the
answer key, opened only by the adult-facing button. Gated on the
`printable_papers` plan feature, and it honours `lockedChapters` and
`maxDifficulty` exactly as `assembleExamPaper()` does.

### The watermark (`_paperWatermarkCSS()`, engine/helpers.js)
A pale diagonal tile behind everything on **all four printed documents**:
the PSAC practice paper (PSAC EXAM PRACTICE) and its answer key (ANSWER KEY, in
red, so a key left on a desk announces itself), and the NCE paper
(PRACTICE PAPER) and its mark scheme (MARK SCHEME).
- ⚠ **It lives in `helpers.js`, not `app.js`.** index.html loads helpers.js
  **third** and `nce_paper.js` **sixth** — both long before app.js at 33. A
  shared builder that only exists once app.js has run is one `nce_paper.js` can
  reach by luck of call timing and nothing more.
- ⚠⚠ **`nce_paper.js` is `require()`d from Node** (`scripts/nce-generate-paper.js`,
  `test-nce-paper*.js`), where there is no helpers.js and no globals at all. Its
  `PAPER_CSS` is a **module-level `const`**, so interpolating the watermark there
  threw *ReferenceError: _paperWatermarkCSS is not defined* on `require()` and
  took the generator and every NCE test down with it — at LOAD time, not render
  time. It now goes through `paperWatermark()`, which resolves the global in the
  browser and `require("./helpers.js")` under Node, and **throws rather than
  skipping**: a command-line paper without the watermark the app prints is a
  different document, and that generator exists to check the two are the same.
  `helpers.js` carries a `typeof module` export guard for it.
- ⚠ **NEVER the app name on the NCE paper.** NCE is Grades 7–9 and PSAC is 1–6,
  so "PSAC" across it names the wrong exam — and the cover promises the sheet
  "carries no examination-board branding".
- ⚠ **A tiled background on `body::before`, never a `position: fixed` overlay.**
  A fixed element is painted on the FIRST SHEET ONLY by several print engines, so
  the sheets the child actually writes on would carry nothing. A repeating
  background on a box spanning the whole document tiles down every page by
  construction. Measured on 6- and 9-page papers.
- ⚠ **`z-index: -1` is what puts it behind the text.** A negative-z-index
  descendant paints above its parent’s background and below its in-flow content,
  so no rule is needed on every child — and adding one is how a watermark ends
  up on top of the questions.
- ⚠ **`print-color-adjust: exact`, or Chrome prints nothing.** "Background
  graphics" is OFF by default in the print dialog. Scoped to that one element
  on purpose: on `.paper` it inherits, and the navy section headers start
  printing solid too, which is a different decision about the pupil’s ink.
- ⚠ **`encodeURIComponent` the SVG.** It carries `#`, `<` and `"`, and any one
  of them ends the `url()` early and leaves no background and no error.
- ⚠ **The footer disclaimers STAY.** They exist so a printed sheet cannot pass
  for an MIE / Ministry document; the watermark repeats that on every sheet where
  it cannot be cut off, and does not replace them.
- ⚠ **Paleness is the design.** Measured in printed pixels at print media across
  all four documents: the tint sits at ~91% luminance and the body ink still
  clears **17.2–17.3:1** over it. One constant (`opacity`, default 0.05) moves it.
  `scripts/test-print-watermark.js` samples REAL pixels across the sheet width at
  three depths, and classifies them as *pale but tinted* — ink and rules are not
  white either, so a naive "not white" check passes on a sheet with no watermark.

### Most choice questions are printed WITHOUT their options
- ⚠ **A printed A/B/C/D block is a worse exercise than the exam it imitates.**
  Four options carry the answer's wording, spelling and grammar; a child who can
  recognise « que » has not shown they can write it. Paper is the one surface
  where that scaffolding can be taken away, so the paper keeps **`_PRINT_MCQ_KEEP`
  = 5** lettered questions at the top and prints every other choice question open,
  with a line to write on. **Section B is written out entirely.**
- ⚠ **Not every MCQ survives the conversion, and that is the whole difficulty.**
  A stem that points AT its options ("Which of the following…", "Choisis la
  phrase correcte", "Identifiez la phrase CORRECTE :") asks nothing once they are
  gone, and a bare statement stem ("British rule began in…", "A computer virus is
  a program that:") is a sentence, not a question. `_printNeedsOptions()` keeps
  those lettered. So does a true/false pair (already an open question, two words
  wide), a `multi`, an "All of the above" option, and an answer over 90
  characters — writing that out is a handwriting exercise.
- ⚠ **It fails SAFE, and the asymmetry is the point.** A question printed WITH
  options it did not need is merely less useful. A question printed WITHOUT
  options it needed cannot be answered at all, and the child finds that out with
  a pencil in their hand. Every shape the rules cannot read keeps its options.
- ⚠ **The rules were measured against the built bundles, not reasoned about**
  (2026-09-09: 23,647 choice questions, 48 packs, **20.0%** must keep their
  options — grade5-french 5%, grade4-history 32%, grade9-ict 62%, whose bank is
  largely "X is a program that:"). That spread is why this is a per-question
  reading and not a per-pack switch. `scripts/test-printable-open-ended.js` holds
  the hand-read verdicts, rebuilds a real paper, and re-measures the corpus.
- ⚠ **Two selection preferences do the real work, and the budget alone did not.**
  Section A's rota picks the open-askable question *within* the chapter whose turn
  it is (the rota, and so `examWeight`, is untouched), and Section B prefers L4
  problems that read on their own. Without the first, a grade4-history paper
  printed **15** lettered blocks of 40 — a third of that bank points at its own
  options and the rota met them by chance. Measured after: **5–7** on every live
  pack, grade9-ict included.
- ⚠ **The answer key says the options were hidden** and tells the marker to accept
  any answer that means the same. Without that line an adult marks a written
  answer against one model wording.
- ⚠ Options are lettered from **the options that exist**, not a hard-coded A–D.
  Every Vrai/Faux question used to print two more empty bubbles labelled C and D.

## Child-facing vs parent-facing, deliberately
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

## Admin › Members — a family's settings, fixed without signing in as them
Built 2026-09-11 for support calls ("my child cannot see Science"). In a
member's **👶 Children** list, each child has **⚙️ Settings**:
- **What is not at its default**, in plain words (`SupportSettings.describe`).
- **Why can or can't they see it?** — every live subject of the child's grade
  (plus granted grades), each chapter open or closed with **every** layer that
  closes it: account disabled/blocked, site-wide kill switches, grade not
  granted, parent lock, expiry vs bought chapters, plan list (only while plan
  limits are on). `SupportSettings.explainChapter`, pure, in helpers.js.
  ⚠ It mirrors `_planAllowsChapter` / `_adminBlocksChapter`; `questions.js` is
  what actually decides. Change one, check the other.
- **Controls** (super admin only): exam mode, hints, Game Zone, hardest level,
  extra grades, chapter locks, a new child PIN, and a "why" field saved with each
  change. Recent admin changes are listed from `admin_actions`.
- ⚠ **Writes go through `admin_patch_student_settings()` only** — never a
  whole-object `students.update({settings})` from admin.js (a test asserts it).
- ⚠ **The child's device used to read settings ONLY at PIN login**, so a lock
  set later — by a parent too, not just an admin — stayed invisible until the
  next PIN. `Auth._refreshChildSettings()` now re-reads `students.settings` on
  resume and on the session guard's focus/online/30-minute check (throttled to
  once a minute), merges with `SupportSettings.mergeServer` (server wins on the
  nine parent keys, device-only keys survive), and **never applies mid-exam or
  mid-round** (deferred 60 s and retried). A failed or malformed read changes
  nothing. A parent previewing a child is excluded. *Apply now* = Force Logout.
- Tests: `scripts/test-support-settings.js` (49), `run-admin-support-tests.sh`
  (37, real postgres), `scripts/test-admin-child-settings.js` (real Chrome, 360px).
