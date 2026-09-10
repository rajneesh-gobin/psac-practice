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
- ⚠ Set Work opens on the **lowest live grade**, not the classroom's — a
  classroom row carries no grade, so there is nothing honest to infer from.

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

## The printable practice paper (`generatePrintablePaper()`, app.js)
A pop-up window holding a 100-mark paper — Section A (30 × 2, or 20 × 2 for
maths) and Section B (10 × 4, 15 for maths) — plus a second window with the
answer key, opened only by the adult-facing button. Gated on the
`printable_papers` plan feature, and it honours `lockedChapters` and
`maxDifficulty` exactly as `assembleExamPaper()` does.

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
