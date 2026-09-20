# Science Labs — analysis and rework plan

Date: 19 September 2026. Supersedes the "Proposed student journey" in
`USABILITY_AUDIT_2026-09-12.md` (what that audit proposed was built the same
day as `lab_study.js`, and this document explains why it did not fix the
problem). Background: `PLAN.md`, `LAB_SPEC.md`, `lab_plan.md`.

## 1. Verdict

The science in the labs is sound and well matched to the syllabus. The
problem is everything wrapped around it. A child arrives at a text form, is
walked through a script of "tap this, tap that" that asks for no decision,
ends in two typing boxes that nobody marks, and never sees the exam-style
questions unless they find a tab that is hidden until they press "Explore
freely". On a phone the experiment picture is often a full screen or more
below the controls. Nothing tells the child which lab belongs to the chapter
they are revising, and nothing they do in a lab is ever visible to a parent
or a teacher.

**Recommendation: keep the simulations and the data files, replace the
shell.** A rewrite of the 22 benches is not needed. What needs rebuilding is
the entry, the hub, the in-lab flow and the phone layout, plus a re-cut of
each lab's content from three overlapping shapes (guides, missions,
discoveries) into one shape: a short **experiment** with an aim, a
prediction, a few real decisions, a result, and two or three checked questions.

## 2. What was measured (19 September 2026)

Method: read `lab_core.js`, `lab_study.js`, `labs.css`, the Rusting and
Circuit benches and data files; executed every data file in Node to count
content per grade; ran all 22 data tests and `test-labs-grades.js`; drove
the app in Chrome for Testing at 360 px as a Grade 4, 6 and 9 child and
screenshotted the hub, first screen, predict screen, experiment screen,
free bench, Missions tab and a mission in progress. No student session was
observed; the ten-student trial in the audit is the only field evidence.

### 2.1 The first screen hides the experiment
`LabStudy.attach()` runs on every lab open and sets `data-study-mode="choose"`,
and `labs.css` hides the whole `.lab-body` in that mode. The child's first
view of the Rusting Lab is a text card: "Use science to answer a question /
The three test tubes / Start investigation / Choose another investigation /
Explore freely". No test tubes, no nail, no picture. The Circuit Board and
the Mixing Bench open the same way. A lab that opens on a form is not a lab
to a nine-year-old.

The first-visit welcome card with "Show me how" never appears any more:
`attach()` calls `Labs.closeOverlay(true)` immediately after `mount()` opens
it, and because it is closed silently `st.intro` is never set, so it is
created and destroyed on every open.

### 2.2 Two entry systems stacked, seventeen concepts
Behind the study card sits the older bench: three tabs (Bench, Missions,
Discoveries), a "What would you like to do?" panel listing the same guides
again plus missions, a coach line, a task strip, a tools row, a shelf and a
notebook. Counted from the shell and one bench, a child meets about
seventeen distinct UI ideas: study card, investigation, prediction box, the
Think/Try/Explain/Finished pills, guide box and step dots, glow and dim,
Hint, coach and fact, read-aloud, task strip, tools row, tabs, start panel,
mission checklist, quiz, stars, hazard and result cards, discoveries and
notebook, and the difference between "investigation" and "explore" mode.
Three words mean roughly the same thing: investigation, guided experiment,
mission.

### 2.3 Guides are scripts, not experiments
The Rusting "three test tubes" guide is 11 steps, every one of the form
"Tap X". The child chooses nothing. Instruction text and button labels also
disagree: the step says "Tap 🧪 Test tubes" and the button reads "🧪 Three
tubes"; "Tap ⏩ Wait 7 days" versus "⏩ Wait to day 7"; "Tap 🛡️ The five jars"
versus "🛡️ Stop the rust". The glow points at the right control so it works
if the child ignores the words. The Circuit guide says "Tap the glowing gap"
but the wire tool is not selected, so it is two taps and the first one
answers "An empty space. Pick a part…".

### 2.4 The investigation ends in typing, and the questions are somewhere else
After the last step the study layer asks for two free-text answers ("What
did you observe?", "Why did that happen?") in textareas, then a self-check
that says it is "not an automatically marked answer", then Finish. A Grade
4 child on a phone is asked to type two sentences and mark themselves. The
MCQ quiz, the one part tied to the PSAC and NCE papers, is reached only via
Explore freely, then the Missions tab, then a mission, then 9 to 15 taps of
set-up, then "Answer the questions". Nothing tells the child that route
exists. The quiz itself shows none of the child's results beside the question.

### 2.5 Phone layout buries the picture
At 360 px in Explore mode the order is: study strip, tabs, the start panel,
the set-up buttons, the notebook, and only then the test-tube canvas, about
1,500 px down a 2,800 px page. In a mission the checklist and the "Answer
the questions" button sit at the top and the Wait buttons at the bottom,
more than one viewport apart, with the canvas between them. The cause is
`.lab-side { order: -1 }` at ≤ 899 px, added on 12 September to answer a
tester's complaint that the menu was below the fold. It put the menu first
and the experiment last.

### 2.6 No link to the syllabus, in either direction
The only door is the "Science Labs" note on the home board. The hub is a
flat list of 7 to 12 cards in registry order (physics first) with no "start
here", no grouping by chapter, and no notion of what the child is revising.
No chapter card, syllabus screen or practice screen links to a lab; no lab
links back to a chapter; no data file carries a chapter id (only comments).
`DB.labs` is written by the labs and read by nothing else: no dashboard,
parent report, weekly digest or teacher screen mentions it. The one parent
lever, `labsDisabled`, has no UI.

### 2.7 Breadth over depth
The 22 labs total 3.3 MB of source. The Measurement Lab at Grade 9 offers 6
guides, 3 missions, 19 discoveries and up to 46 specimens; the Microscope at
Grade 7 renders 23 controls; the Grade 6 Food Groups bench about 28. Every
lab meets the spec's minimums (3 guides, 2 missions, 10 to 12 discoveries)
and that is the problem: the minimums were counts, and a child cannot tell
which of the 24 things on the page is the one that teaches the syllabus point.

### 2.8 Defects found on the way
| Where | What |
|---|---|
| `lab_nutrition.js:767-771` | Calls `Labs.quiz` and `Labs.missionDone` with the wrong signatures; both missions can be played but never award stars or complete. |
| `lab_circuit.js:386-392, 410` | With the wire tool selected, tapping an occupied slot replaces the switch or bulb with wire; placing a wire does not reset the tool. Mitigated only inside a guide, live in the torch mission and free build. |
| `lab_study.js:212` | Kills the welcome overlay on every mount (see 2.1). |
| `lab_periodic.js` | Registered at Grade 9 with no guides, missions, discoveries or chapter; the periodic table is a Grade 7 subsection (`g7s-elements`). Records no progress. |
| `scripts/test-labs-grades.js` | 35 pass, 3 fail: still expects nine Grade 9 labs. |
| `scripts/test-labs-sunmoon-data.js` | Crashes: reads a top-level `const` off the vm context. |
| magnets, energy, forces, food, light, heat data tests | Fail on a "Skip this step" button contract no bench renders; heat also fails "4 distinct options / valid answer" on both missions, which needs a real look. |
| `store.js:38` | Comment still says labs are "NCE only". |

Overall the data suites stand at 17 of 22 not clean (16 failing, 1 crash).
Most failures are stale contracts, not broken science, but a suite nobody
trusts is a suite nobody runs.

## 3. Why the 12 September fix did not land
The audit's diagnosis was right: activities and questions were separate
journeys, and there were too many equally plausible starts. The fix built the
same day added a fourth entry system on top of the three it meant to replace,
hid the bench behind it, swapped the marked MCQs for unmarked typing, and
never removed the old panel or tabs. The audit's own pilot design ("Can you
light the bulb? Predict yes/no. Connect the gap. Bulb lights. Why did it go
out? Two observations visible beside the choices.") was not what shipped.

## 4. The rework

### 4.1 One unit: the experiment
Every lab becomes a short list of **experiments**, 3 to 5 per grade, each
answering one question a child can say back. Every experiment runs through
the same six stops, in the same words, with the same six-dot progress bar:

| Stop | What the child sees | What the child does | Rule |
|---|---|---|---|
| **Aim** | The bench picture already set up, one question in child words ("Which nail will rust?"), a 🔊 button, one big Start. | Taps Start. | The picture is on the first screen. Always. |
| **Predict** | The question with 2 to 4 picture options (Nail A / B / C / all of them). | Taps one. | Never typing. Not marked, but remembered. |
| **Do** | The bench with ONLY this experiment's controls; the instruction strip directly under the picture. | 2 to 5 actions, each a **decision** or an **observation**, never "tap X". | See 4.2. |
| **See** | The result on the canvas plus one sentence ("Only nail B rusted") and the notebook row it wrote. "You said B. It was B ✓." | Reads, taps Next. | The prediction is answered here, by the bench. |
| **Check** | 2 or 3 MCQs from the existing mission quiz, with the evidence pinned beside them (the notebook row or a small snapshot of the canvas). | Answers. Immediate feedback with the reason. | This is the exam-shaped part and it is on the main path. |
| **Done** | "You found out: iron needs air AND water to rust." The PSAC or NCE reference. Two buttons: Next experiment · Practise this chapter. | Chooses. | Progress saved once; the chapter link is live. |

Six words: Aim, Predict, Do, See, Check, Done. "Investigation", "guided
experiment", "mission", "discovery" and "sandbox" all go from the child's
screen. The free bench survives as **Explore**, offered on the Done card
after the first experiment in a lab (support fades, it does not vanish).

### 4.2 Decisions, not taps
A step that says "Tap ♨️ Boiled water" teaches nothing. The same content as a
decision: "Tube A must have **no air** in it. Which water?" with the four
waters as options. Tap water gives a result card ("Tap water has air mixed
in. Nail A would rust and the test would prove nothing"), boiled water
advances. The wrong choice is the lesson, and the existing `resultCard` and
`hazardCard` already do this job. Budget: at most five decisions per
experiment, and the answer to the child's prediction must come from the
bench, not from text.

Where the PSAC paper gives the set-up as a diagram (the 2024 three-tube
question), the experiment starts with the tubes already filled. Reading the
set-up and predicting is the skill the paper examines; filling eleven things
is not.

### 4.3 The hub becomes "what you are revising"
- Cards are grouped by the child's own chapters, not by registry order:
  "Materials & Properties → Rusting Lab · 4 experiments · 1 done".
- The first card is **Start here**: the next unfinished experiment in the
  chapter the child practised most recently (`DB.chapters` last-touched),
  falling back to the first chapter with a lab.
- Each card shows a picture (the lab's own canvas thumbnail, drawn once at
  build time as inline SVG), the aim of the next experiment, and a count.
- A machine-readable `chapters: { 6: ['g6-materials'], 4: [...] }` on every
  `Labs.LABS` row is the source of the grouping. It is the first time a lab
  says which chapter it teaches in code rather than in a comment.

### 4.4 Two-way links with the syllabus
- A chapter card and the syllabus screen show a "🔬 Try the experiment" chip
  when the lab map has an experiment for that chapter at that grade. It opens
  that experiment directly, not the hub.
- The Done card's "Practise this chapter" calls `startChapterDirect()`.
- Later: a wrong practice answer on a question tagged with an experiment id
  offers "See it in the lab".

### 4.5 Phone layout: the picture stays put
- At ≤ 899 px the canvas is sticky at the top, capped at about 42 % of the
  viewport, with the instruction strip directly beneath it and the
  experiment's controls below that. The child never scrolls between reading
  and tapping. The `.lab-side { order: -1 }` rule and the sticky guide go.
- The bench exposes `focus(ids)` so an experiment can hide every control it
  does not use. The shelf is the exception list, not the default.
- Sentences at Grades 4 to 6: at most 12 words, one instruction per line,
  every science word tappable for a one-line meaning ("drying agent: a powder
  that soaks up water from the air").

### 4.6 Progress that someone can see
- `DB.labs.<lab>.done[experimentId] = timestamp` is the one fact that
  matters. Keep discoveries and stars as the collection they are.
- Chapter card: "🔬 1 of 4 experiments done". Parent weekly digest: one line
  ("Did 3 science experiments: rusting, circuits"). Teacher Mode, later: set
  an experiment as homework, using the same `done` timestamps.
- Mastery, `recordAnswer()` and `_recordDaily()` stay untouched, as now.

### 4.7 Words and reading
One vocabulary across all 22 labs and all grades, enforced by test: the
instruction text of a Do step must contain the exact label of the control it
points at. Grades 7 to 9 get the same six stops with more decisions per
experiment and the NCE paper reference on the Done card; they do not get a
different interface.

## 5. Technical shape (rework, not rewrite)

**Keep:** every `lab_<id>.js` bench and canvas, every `lab_<id>_data.js`
(the science), `Labs.quiz`, `hazardCard`, `resultCard`, `discover`, the lazy
loader, `DB.labs`, the guide token system (`_guideEvent(token)` is exactly
the hook an experiment runner needs), `snapshot()`/`restore()` from the
study layer.

**Add:**
- `engine/labs/lab_experiment.js` — the six-stop runner. Data-driven. It
  replaces `lab_study.js`, which is deleted.
- In each data file, `EXPERIMENTS = [{ id, grades, chapter, aim, picture,
  predict: { q, options }, steps: [{ ask, options | on, say, wrong: resultId }],
  see: { saw, learn }, check: [quiz refs], exam }]`. Most of this already
  exists: `steps` come from GUIDES, `check` from MISSIONS[].quiz, `saw`/`learn`
  from DISCOVERIES. The work is re-cutting, and the first pass can be scripted
  from the three existing shapes, then edited by hand for decisions.
- `Labs.LABS[].chapters` per grade, and a `labFor(chapterId, grade)` lookup
  used by `_chapterCard()` and `renderSyllabus()` in `app.js`.
- `bench.focus(ids)` and `bench.thumbnail()` on each module (a ten-line
  addition per bench; the shelf renderers already iterate arrays).
- `labs.css`: the sticky-canvas experiment layout; delete the study-mode and
  side-order rules.

**Remove from the child's path:** the study card, the tabs, the start panel,
the task strip, the "Skip"/"Stop guide" links. They can stay in Explore mode
for one release, then go.

**Tests:** one browser test per lab that walks every experiment at every
grade from the home note to the Done card, asserting (a) the tap count is
under a budget, (b) each Do instruction contains its control's label, (c) the
canvas is inside the viewport at every Do step at 360 px, (d) the Check quiz
opens with the evidence block present, (e) no page errors. Retire the
"Skip this step" contracts. Fix the sunmoon harness. `test-labs-grades.js`
derives its expectations from the registry and must stop hard-coding nine.

## 6. Phases

### Phase 0 — stop the bleeding (1 to 2 days, ship first)
**Status 2026-09-19: done in the working tree, not committed or deployed.**
What changed: the study layer is no longer loaded (`lab_study.js` is left on
disk but dropped from the `labs` RoleModules group; its test and preview page
are deleted); the bench is the first screen again and the welcome card is back;
on phones the canvas comes first, the active instruction sits above it and
stays sticky, and the top bar is static; Food Groups missions save their stars;
a circuit guide pre-selects the part its step places (one tap) and a held part
never overwrites a switch, bulb or cell (a plain wire may be built over); the
Periodic Table is unregistered; `SHELL_VERSION` is `shell-v372`.
Measured after: the Rusting Lab canvas is at 255 px on the first screen (it was
about 1,500 px down), and the step instruction sits above the picture rather
than at 788 px on a 780 px screen. Tests: all 22 data suites clean (3,090
checks), role-modules 25/0, grades 38/0, rusting 68/0, circuit 238/0, nutrition
21/1 (the one failure is the app header's 36 px Log out / Menu buttons, not a
lab). ⚠ The other 18 browser suites still click the removed `[data-guide-do]`
button and are rewritten in Phase 2. Deploy and probe are the owner's call.

1. Remove `data-study-mode="choose"` hiding of the bench, or unmount the
   study layer entirely; restore the welcome card or delete it.
2. Drop `.lab-side { order: -1 }`; put the canvas first on phones.
3. Fix nutrition's stars, the circuit wire-replace bug, the heat quiz data.
4. Fix the sunmoon test crash and the six stale "Skip" contracts; make
   `test-labs-grades.js` read the registry. Get the data suites to 22 clean.
5. Unregister the Periodic Table from Grade 9 (or re-home it at Grade 7 with
   content) so the hub shows nothing a child cannot use.
6. Bump `SHELL_VERSION`; deploy; probe.

### Phase 1 — the experiment runner and three pilots (about 1 week)
**Status 2026-09-20: built and verified in the working tree, not committed or
deployed. The child test has not happened yet and is the gate for Phase 2.**
What exists:
- `engine/labs/lab_experiment.js` — the runner: Aim → Predict → Do → See →
  Check → Done, one panel above the bench, nothing to type. Loaded with
  `lab_core.js` by the `labs` RoleModules group. Attaches to any lab whose
  module exports an `experiment` adapter (LAB_SPEC.md §10). Progress in
  `Labs.store(<lab>).done[<experiment>]`.
- **Three labs converted** — Rusting (Grade 6: 4 experiments), Circuit Board
  (Grade 4: 4, Grade 6: 3), Food Tests (Grade 8: 5). Sixteen experiments; the
  first at each grade is the exam's own set-up (PSAC 2024 three tubes; "Can you
  light the bulb?"; "Does bread contain starch?" with a control).
- **Hub grouped by chapter** with a "▶ Start here" section (the most recently
  practised chapter with a lab, else the first with experiments), cards saying
  "🔬 0 of 4 experiments done · Start the experiment →". Every lab now carries
  `chapters` per grade in `lab_core.js` (`CHAPTERS_BY_LAB`), checked against
  `subjects/_index.js`.
- **Two-way chapter links**: "🔬 Try the experiment" chip on the chapter card and
  the syllabus row (`_LAB_CHAPTERS` in `app.js`, parity-tested against the
  registry) opens that chapter's next experiment; the Done card's "Practise this
  chapter" lands on that chapter's practice screen.
- **Phone layout in Do**: the guide box moves inside the sticky picture, only
  the experiment's controls are shown (`focus`), and the Check quiz pins the
  child's notebook above every question.
Measured: `scripts/test-labs-experiments.js` walks all 16 experiments at
360 px from the hub to Done, tapping the wrong option of every decision first
— **577/0**; `test-labs-experiments-data.js` **423/0**; the 22 data suites
**3,677 checks, 0 failures**; grades 38/0, rusting 69/0, circuit 238/0, food
77/0 (all three converted to tap what glows, and to expect the Aim instead of
the welcome card), nutrition 21/1 (app header buttons), role-modules 25/0,
`check.js` green. Not measured: any child. Not done: the other 19 labs
(Phase 2), retiring discoveries/missions tabs from the child's path outside
Explore, the Grade 7/9 circuit levels, parent/teacher visibility (Phase 3).

Build `lab_experiment.js`, the layout, the hub grouping and the chapter
chip. Convert three labs that cover the three interaction shapes:
- **Rusting** (Grade 6, wait-and-see): 4 experiments, of which the first is
  the PSAC 2024 three-tube diagram with pre-filled tubes.
- **Circuit Board** (Grade 4, build): "Can you light the bulb?" exactly as
  the audit's pilot describes, then conductors, then Grade 6 safety.
- **Food Tests** (Grade 8, procedure): "Does bread contain starch?" with a
  control, then one test per experiment, then an unknown sample.
Then put it in front of 6 to 8 children (Grades 4, 6, 8; some who tried it
before, some new), one at a time, with a task and no navigation help:
"Use this to find out why a bulb goes out, answer its questions, tell me
when you are finished." Targets before testing: 8 of 10 start the intended
experiment within 30 seconds; 8 of 10 reach Check without adult navigation
help; 8 of 10 can say the aim's answer in their own words afterwards.
Record where each child stops and what they were looking for.

### Phase 2 — convert the other 19 labs (about 2 weeks)
Re-cut each lab's guides, missions and discoveries into 3 to 5 experiments
per grade. Budget the content down, not up: an experiment with more than
five decisions is two experiments; a discovery that no experiment reaches is
cut or becomes an Explore badge. Delete `lab_study.js`. Rewrite each lab's
browser test to the experiment path. Re-measure the question-cache and
shell budgets afterwards (the lab files are not precached, so this should be
neutral, but measure).

### Phase 3 — visibility (after Phase 2 has shipped)
Chapter-card counts, the digest line, the parent toggle UI for
`labsDisabled`, "set an experiment as homework" in Teacher Mode, and a
decision on points (needs a new `_award_points()` kind in SQL).

## 7. Decisions for the owner
1. **Typing.** Drop the free-text observe/explain boxes at Grades 4 to 6
   (recommended); keep an optional "say it aloud" prompt at 7 to 9.
2. **Discoveries.** Keep as a collection reached from the Done card, not a tab
   on the main path (recommended), or drop them.
3. **Periodic Table.** Re-home at Grade 7 with real experiments, or remove.
4. **Grade 5.** It still borrows Grade 4 and 6; the hub grouping by chapter
   will make that visible ("Grade 4 · Materials"). Accept, or write Grade 5
   science chapters first.
5. **Points for experiments.** Phase 3 or never.

## 8. How we will know
Per child, from `DB.labs` and the study events: share of children who open a
lab in their first week; share of opened experiments that reach Check; share
that reach Done; first-try quiz accuracy in Check; return visits within 7
days; and, in the matching chapters, accuracy on questions tagged to an
experiment before and after. The Phase 1 child test is the gate for Phase 2.
