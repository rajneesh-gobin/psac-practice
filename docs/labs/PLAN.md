# NCE Science Labs — build plan

> Status 2026-09-11: **Phase 0 built — the Mixing Bench — not yet deployed.**
> Readable version of the plan published as an Artifact ("NCE Science Labs").

> ⏸ **Paused 2026-09-11 (night). What is left — in-flight builds, the next
> batch, the optional batch, open questions, the commit checklist — is in
> [`lab_plan.md`](lab_plan.md). Start there.**

## Build status (2026-09-11, late evening) — read this first when resuming
- **Batch complete. All nine Grade 9 labs are live** (`ready: true`, every data
  test, browser test and `check.js` re-run by the lead, not taken from the build
  reports): mixing, separation, light, measure, circuit, motion, photo, quadrat,
  microscope.
- **Primary labs built and verified, `ready`, but not yet visible:** rusting
  (G6), materials (G4). The hub lists only Chemistry/Physics/Biology, so they
  appear when the per-grade layer adds the Science group and the grade picker.
- Each lab owns five files — `engine/labs/lab_<id>_data.js`, `lab_<id>.js`,
  `lab_<id>.css`, `scripts/test-labs-<id>-data.js`, `scripts/test-labs-<id>.js`;
  browser tests use ports 9401–9410, one per lab.
- ⚠ Commit `5136b04` "labs" (not made by this session) already holds most of
  the lab work; what is uncommitted after it is listed by `git status`.
- **Batch A done — the per-grade layer (2026-09-11, night):**
  - every `Labs.LABS` row carries `grades`; the hub shows the labs for one grade,
    with a **"My grade"** picker only when the child may use more than one grade
    that has labs (own grade + parent-granted grades ABOVE it, never below);
  - **Grade 5 has no core science in the app, so it borrows the Grade 4 and 6
    labs** (`Labs.GRADE_ALIASES = { 5: [4, 6] }`);
  - **`Labs.grade()`** = the grade the open lab is being used at (a Grade 5
    pupil in the Materials Tester gets 4, in the Rusting Lab 6);
  - hazard/result cards say "📝 In the PSAC exam" (≤ 6) or "📝 On the NCE paper"
    (9) by themselves; `examLabel` overrides;
  - new ISO 7010 `sharp` sign (W022) — the cracked slide, cracked glass and rusty
    nail no longer borrow the chemical "Harmful" diamond;
  - `Labs.quiz` options may be `{ label, svg }`; 44px tap targets throughout;
  - `_LAB_GRADES = [4, 5, 6, 9]` in app.js — ⚠ must equal the ready grades in
    `Labs.LABS` plus 5; `scripts/test-labs-grades.js` fails if they drift;
  - ⚠ the picked grade is reset when the child (own grade / usable grades)
    changes — switching child never reloads the page, and a Grade 6 child
    opened on the Grade 9 a sibling had chosen.
- **Batch B in progress:** ✅ water (Water & States, G4) verified by the lead
  (data 110/0, browser 85/0, grades 30/0) and `ready`; ✅ air (Air & Burning,
  G4/G6) verified (data 123/0, browser 96/0, grades 30/0) and `ready` — to
  confirm before release: the fire service number 115 and "1 litre of air
  weighs about 1.2 g" (from the builder's own knowledge, not the repo);
  limewater is beyond the app's Grade 6 questions; ✅ Circuit Board G4/G6
  levels (data 185/0, registered `[4, 6, 9]`); ✅ Photosynthesis G4/G6 levels
  (data 157/0, registered `[4, 6, 9]`) — primary ids carry their grade
  (`g4_…`, `g6_…`); Grade 4 level for the Light Bench (started early, first of
  Batch C). Browser ports 9412–9416. ⚠ Commit `eb9c86b` "test" (another
  session) swept in a half-built `lab_water.js` with a duplicate `_tick` bug;
  the fix is in the working tree only. On each report: verify, then add
  the grades to the `L(...)` row AND `_LAB_GRADES`, flip `ready`, re-run
  `test-labs-grades.js` (its per-grade expectations change).
- **New mandatory `goggles` sign** (ISO 7010 M004 "Wear eye protection", blue
  disc) — `eye` reads "Bright light" and had nothing to say about splashes.
  Separation's spitting-basin cards and the Mixing Bench's two no-goggles cards
  now pair it with the hazard sign. ✅ Mixing Bench Grade 8 (kitchen acids and
  alkalis, litmus, neutralisation) registered `[8, 9]`.
- ✅ Circuit G7 registered `[4, 6, 7, 9]`; ✅ new lab **Food Tests** (G8 —
  iodine, Benedict's, biuret, grease spot, ethanol) `ready`; ✅ Measurement
  G7/G8 (displacement, density, float or sink) registered `[4, 7, 8, 9]`.
  Nothing in flight. Remaining work:
  [`lab_plan.md`](lab_plan.md).
- **Hub cards count progress per grade** (`_tag()` in `persist()` stamps each
  discovery/mission written since the lab opened with `Labs.grade()`; untagged
  = the lab's highest grade). Cards sit under "Science" at Grades 4-6, and a
  row's blurb may be `{ 9: '…', 4: '…' }`. Full browser suite re-run after
  that change: all green (grades 34/0, circuit 181/0, the rest unchanged).
- **Batch C (in progress):** ✅ Light G4 (data 105/0, browser 130/0 on the real
  path, registered `[4, 9]`; Grade 6 has light content too — shadows through
  the day, the Moon, eclipses — a possible later level), ✅ Measurement G4 (data
  137/0, registered `[4, 9]`; Grade 6 has no measuring-instrument content),
  ✅ Separation G7/G8 (data 216/0, registered `[7, 8, 9]`; **Grade 8's first
  lab — `_LAB_GRADES` now `[4, 5, 6, 7, 8, 9]`**; follow-ups: the Grade 7
  distillation bench reuses the Grade 9 faulty-rig cards, which quote Grade 9
  papers), ✅ Microscope G7 (data 180/0, browser 117/0 on the
  real path, registered `[7, 9]`; **Grade 7's first lab — `_LAB_GRADES` now
  `[4, 5, 6, 7, 9]`**; stains and cover slips are lab method, not in the Grade
  7 pack, and are never an exam point), Mixing G8 (9420). Tests now use Grade 3
  as "a grade with no lab". Hub cards sit under "Science" up to Grade 8. When a G7/G8 level lands, add
  7/8 to `_LAB_GRADES` — Grades 7-8 have no lab yet. Queued after: Light G4 (transparent/opaque, shadows), Measurement
  G4/G7/G8, Separation G8/G7, Mixing G8, Microscope G7, Circuit G7; then the
  new labs Magnets (G8, G4), Food Tests (G8), Forces & Pressure (G8).
- Still to check: every lab restarts its animation loop after leaving and
  returning to the Labs screen (Rusting and Photosynthesis do).
- **Verified since:** quadrat, circuit, motion (live); rusting (G6) and
  materials (G4) verified and `ready`, hidden until the hub lists Science labs.
  ⚠ The Materials Tester already calls `Labs.grade()` if it exists (falling back
  to Grade 4 for its eyebrow) — the per-grade layer must provide it.
- A lab is switched on by adding `, true` to its `L(...)` line in `lab_core.js`
  only after its data test, browser test and `check.js` pass.

## What exists (2026-09-11)
- `engine/labs/lab_chem_data.js` (`LabChem`) — every reaction, rate, colour,
  equation, hazard, fact, mission and quiz question. **The science lives here.**
- `engine/labs/lab_core.js` (`Labs`) — hub, overlays, GHS-style hazard cards,
  result cards, the quiz, discoveries, `DB.labs` progress.
- `engine/labs/lab_mixing.js` (`LabMixing`) — the bench: canvas simulation and
  animation, shelf (tap; drag with mouse/pen), splints, bung, rinse, the lab
  assistant, missions **Reactivity Race** and **Hit pH 7**, 21 discoveries.
- `engine/labs/labs.css` — linked by `lab_core.js` on first open.
- ⚠ **Landing must say what to do.** A real parent landed on the bench, mixed
  acid and alkali (the one experiment with nothing to see) and could not tell
  what the page was for. The Bench tab now opens with "What would you like to
  do?" — three steps, four **guided experiments** (`LabChem.GUIDES`: Make it
  fizz, Acid or alkali?, The metal that refuses, Teacher demo: sodium) and both
  missions. A guide shows ONE step at a time in a yellow box under the tube,
  with a button that does it, and the same shelf item glows (`.is-next`). The
  welcome card's "Show me how" starts Make it fizz.
- ⚠ **Loading (changed 2026-09-11 for nine labs):** RoleModules group `labs`
  loads ONLY `lab_core.js`. `Labs.LABS` registers every lab with its files —
  `lab_<id>_data.js`, `lab_<id>.js`, `lab_<id>.css` (the Mixing Bench keeps
  `lab_chem_data.js` + `lab_mixing.js`) — and `_ensure()` fetches them when that
  lab opens. A module is found through `window[global]`. `ready` only decides
  whether the hub offers it; `Labs.openLab(id)` loads any registered lab, which
  is how a lab is tested before it is switched on. How to build one:
  **`docs/labs/LAB_SPEC.md`**.
- Wiring: RoleModules group `labs` (registry.js), `#screen-labs` and the
  `#sh-note-labs` sticky note (index.html), `openLabs()` / `_labsAvailable()` /
  `_LAB_GRADES` (app.js), `labs: {}` in `Store._defaultStudent()`.
- ⚠ **Who sees Labs:** the grade on screen OR any grade at or above the child's
  own that a parent ticked in ⚙️ Controls › 🎓 Grade access
  (`GradeAccess.childChoices()`) must be in `_LAB_GRADES`. Reading
  `SELECTED_GRADE` alone hid it from a younger child with Grade 9 granted —
  opening any of their own subjects resets it.
- Hazards that stop the experiment: acid/alkali without goggles (corrosive),
  an alkali metal in acid or alkali (explosive + flammable, tube replaced), a
  bung on a fizzing tube (gas under pressure). An overshot neutralisation gets a
  "what went wrong" card. Sodium/potassium in pure water run as a teacher demo
  behind a safety screen.
- Tests: `scripts/test-labs-chem-data.js` (38 — every symbol equation balances
  atom for atom, rates follow the series, pH maths, discoveries reachable) and
  `scripts/test-labs-mixing.js` (46, real browser at 360px).
- Not yet: a parent toggle for `labsDisabled` in the dashboard (the flag is
  honoured), "Try it in the lab" links inside chapters, Light Bench,
  Photosynthesis Lab.

## The idea
Interactive, animated virtual labs where NCE pupils do real experiments on their
phone — mix chemicals, heat, bend light, build circuits — and every lab ends in
the exact practical questions the NCE paper asks.

- **Who:** NCE pupils only — the lower-secondary stage, `_gradeStage(grade).id ===
  'secondary'` (Grades 7–9). ⚠ Grade 7 and 8 science packs are **live**
  (`comingSoon: false`), not only Grade 9 as older docs say.
- **Why it earns its place:** none of the three NCE science papers is a practical
  exam, yet each examines practical work on paper — naming apparatus, choosing a
  technique, spotting a mistake in a rig, naming a controlled variable, a safety
  precaution, a source of error, reading a results table. Measured: **~8–12 marks
  per paper** (`docs/nce-grade9/blueprint-science.md` §X.6). Most pupils rarely
  touch the real equipment.
- **Fun and marks, not either/or:** every lab has a free **Sandbox** and short
  **Missions**; a mission always ends in paper-style questions.

## What a lab is
1. **Sandbox** — a bench. Drag (or tap) apparatus and chemicals on, pour, mix,
   heat, switch on. Canvas animation shows what really happens: bubbles at a rate
   set by reactivity, colour changes, crystals growing, light rays bending.
   Unknown combinations honestly show "no visible reaction".
2. **Missions** — 3–6 guided steps with one goal ("Rank four metals by how fast
   they react with acid"). The pupil's own results fill a **lab notebook** table;
   the mission ends with 3–5 questions in the paper's own shapes: label the rig,
   draw the arrow, name the controlled variable, spot the two mistakes, give a
   safety precaution, conclude from the table.
3. **The Safety Officer** — a character who stops an unsafe move (heating a
   closed flask, tasting, no goggles) and says why. That is the safety-precaution
   mark (Chemistry 2021 Q5(c)(ii), 2022 Q5(a)(ii), 2025 Q3(b)(iii)) turned into play.

## The labs (grounded in the live Grade 9 chapters)
| Lab | Subject | What you do | Chapters | Paper shapes it trains |
|---|---|---|---|---|
| **Mixing Bench** ★ pilot | Chemistry | Metals (K…Cu) in water/steam/dilute acids — bubble rate by reactivity, squeaky-pop test; acid + alkali with universal indicator to pH 7; evaporate to a salt | metals_with_acids, metals_with_water_steam, reactivity_series, predicting_reactions, neutralisation, soluble_insoluble | rank by reactivity, word → balanced equation, results table, safety |
| **Separation Station** | Chemistry | Build a distillation rig, crystallise, sublime | distillation, crystallization, sublimation, apparatus_diagrams, choosing_a_technique | label rig from word bank (2024 Q2(b)(i)), water into condenser (2022 Q3(b)), two errors in a rig (2025 Q5(b)(iii)), apparatus MCQ (2024 Q1(1)) |
| **Light Bench** ★ pilot | Physics | Ray box, plane mirror, glass block, on-screen protractor | reflection, laws_of_reflection, ray_diagrams, refraction, rectilinear_propagation | measure an angle with a protractor (examined for marks), draw a ray diagram |
| **Measurement Lab** | Physics | Read a measuring cylinder at eye level, a vernier caliper, find zero error | measuring_instruments, accuracy_of_instruments, measurement_errors | mark main scale M / vernier V (2023 Q2(a)), type of error (2021 Q3(b)(i), 2023 Q2(d)) |
| **Circuit Board** | Physics | Snap cells, bulbs, switches into series/parallel | circuit_symbols (+ electricity chapters) | draw with standard symbols |
| **Motion Track** | Physics | Trolley down a ramp, live speed–time graph | speed_velocity, acceleration, speed_time_graphs | plot and read a speed–time graph |
| **Photosynthesis Lab** ★ pilot | Biology | Pondweed bubbles vs lamp distance; starch test on a variegated leaf | photosynthesis_experiments, factors_for_photosynthesis, hypothesis_testing | name a controlled variable (2024 Q5(b)(i)), conclude from a table |
| **Quadrat Field** | Biology | Throw quadrats on a Mauritian habitat, estimate a population | quadrat_sampling, what_is_biodiversity | estimate, improve accuracy |
| **Microscope** | Biology | View blood cells, measure the drawing, compute magnification | magnification, components_of_blood | magnification calculation (÷15000 [3]) |

Pilots: one per subject — **Mixing Bench** (the "mix chemicals" hook),
**Light Bench**, **Photosynthesis Lab**.

## Guardrails
- **The science must be true.** Every outcome comes from a reviewed data table
  (`lab_reactions.js`), never invented in animation code. Reactivity order,
  products and colours checked against the syllabus before release.
- **Nothing to try at home.** No hazardous quantities or recipes; alkali metals
  and strong acids are shown "behind the safety screen, school lab only".
- **Phones first.** 360px, touch; tap-to-place as well as drag; Canvas at
  devicePixelRatio ≤ 2, ~30 fps, paused when the tab is hidden.
- **Calm Mode and reduced motion** get the end state without the animation.
  Indicator colours always carry the pH number too (colour-blind pupils).
- **Offline after first open** — the lab files are cached on first use, not
  added to the shell precache.
- **No `transform`/`filter` on `.screen`** — animate inside the bench element only
  (see ui-css.md).

## How it fits the code
- **Lazy module group `labs`** in `RoleModules` (engine/registry.js):
  `engine/labs/lab_core.js` (bench, drag/tap, canvas loop, notebook, mission
  runner, Safety Officer), `lab_reactions.js` (data), one file per lab. A child
  who never opens Labs parses none of it. ⚠ Detect loaded by bare identifier.
- **Screens:** `#screen-labs` (hub) and `#screen-lab` (bench) in index.html.
- **Entry points:** a "🔬 Science Labs" sticky note in `#sh-notes-grid`, shown only
  when the child's grade is secondary **and** that grade has a lab; plus "Try it
  in the lab" on matching chapters, mapped in a lab registry (not in manifests,
  so `subjects/_index.js` needs no regeneration).
- **Progress:** new `DB.labs` key in `Store._defaultStudent()` (backfills every
  child). Labs do **not** call `recordAnswer()` — same rule as games.
- **Gates:** parent toggle `DB.restrictions.labsDisabled`; plan feature `labs` in
  `_PLAN_GATED_SCREENS` (free for now, like everything).
- **Tests:** a Chrome-for-Testing harness per lab over `file://` (360px, drag and
  tap paths, calm mode), and a data test that every metal × reagent pair has an
  outcome and the reactivity order matches the syllabus.
- Bump `SHELL_VERSION` for the index.html / app.js / registry.js changes.

## Phases (rough estimates)
0. **Prototype (2–3 days):** Mixing Bench only — bench, 4 metals, dilute HCl,
   indicator, bubbles. Put it in front of 3–5 real Grade 9 pupils. Go / no-go.
1. **Pilot (~2 weeks):** lab core, the 3 pilots with 2 missions each, hub, entry
   points, `DB.labs`, parent toggle, tests.
2. **Full Grade 9 set (~2–3 weeks):** the other six labs.
3. **Grades 7–8 and teachers:** labs for the live Grade 7–8 science packs;
   "set a lab as homework" in Teacher Mode; points for missions.

## Next: labs per grade (decided 2026-09-11 — build AFTER the Grade 9 labs finish)
The owner approved opening Labs beyond NCE: a pupil picks a grade and sees the
labs for that grade. Evidence (every Grade 4–8 science chapter and question
scanned, plus the MIE-textbook audit) is summarised below.
- **Core:** every lab in `Labs.LABS` gets `grades: [...]`; the hub gets a grade
  picker limited to the grades the child may use (`GradeAccess.childChoices()` —
  own grade plus parent-granted grades above it), defaulting to their own.
  `_labsAvailable()` becomes "any usable grade has a lab" (replaces `_LAB_GRADES`).
  A lab asks `Labs.grade()` which grade it is being used at.
- **Content per grade:** guides, missions and discoveries carry `grades` in each
  lab's data file; a lab shows only the current grade's set. Primary grades get
  shorter text, bigger visuals, read-aloud for the assistant, and no alkali-metal
  demos.
- **Grade 9 labs that also serve younger grades:** Measurement (G4 instruments,
  G7 SI/displacement, G8 density) · Separation (G8 filtration/evaporation, G7
  distillation/sublimation) · Mixing (G8 indicators/neutralisation) · Circuit
  (G4/G6 simple circuits and conductors, G7 components/symbols) · Microscope (G7
  cells) · Photosynthesis (G4/G6 what plants need, fair tests) · Light (G4
  transparent/opaque, shadows).
- **New labs, strongest evidence first:** Rusting (G6 — the PSAC three-tube
  diagrams), Materials Tester (G4, G7), Water & States (G4, G7), Air & Burning
  (G4, G6, G7), Magnets (G8, G4), Food Tests (G8), Forces & Pressure (G8);
  later Sun–Earth–Moon (G6/G7) and Heat transfer (G6).
- ⚠ **Grade 5 science has no core chapters in the app** (two enrichment chapters,
  66 questions), so Grade 5 uses the shared primary (PSAC Grades 4–6) labs.
- ⚠ **Filtration is not in the app's Grade 4 syllabus** (it is Grade 8). The
  owner believes Grade 4 does filtration; the Grade 4–6 science textbooks are
  not in `books/`, so it is unconfirmed — a Grade 4 filtration level waits on that.

## Decisions needed
1. Missions separate from mastery and parent reports (recommended, like games),
   or counted?
2. Grade 7–8 pupils before their labs exist: hide the Labs note (recommended) or
   let them preview Grade 9 labs?
3. Sound on or off by default (recommended: off, one tap to turn on).
4. Name: "Science Labs" (recommended) or "Lab Bench".
5. Points for missions: needs a new kind in `_award_points()` (SQL) — phase 3?

## How we'll know it works
Share of NCE pupils who open a lab in their first week; missions completed per
pupil; return visits; and scores on practical-shaped questions in the matching
chapters before vs after.
