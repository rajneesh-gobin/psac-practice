# How to build a Science Lab

> Read this, then `docs/labs/PLAN.md`, then **all of `engine/labs/lab_mixing.js`**
> and `engine/labs/lab_chem_data.js`. The Mixing Bench is the reference
> implementation: a new lab must look and behave like it. Its tests
> (`scripts/test-labs-mixing.js`, `scripts/test-labs-chem-data.js`) are the
> reference tests.

## 1. What you own — and nothing else
Each lab is five new files. **Create only these; edit nothing else.** Other labs
are being built at the same time in this same working tree, and another session
edits the rest of the app. If the shared shell needs a change, say so in your
report instead of making it.

| File | Global | What it holds |
|---|---|---|
| `engine/labs/lab_<id>_data.js` | `Lab<Name>Data` | **All the science**: every outcome, number, formula, equation, hazard text, fact, guide, discovery, mission and quiz question |
| `engine/labs/lab_<id>.js` | `Lab<Name>` | The bench: canvas, simulation, UI, guides, missions |
| `engine/labs/lab_<id>.css` | — | Styles only this lab needs, every class prefixed `.lab-<id>-` |
| `scripts/test-labs-<id>-data.js` | — | Node test of the data (maths and science checks) |
| `scripts/test-labs-<id>.js` | — | Real-browser test (Chrome for Testing, `file://`) |

Both JS files: `'use strict';`, one IIFE `const X = (() => { … })();`, and end
with `if (typeof window !== 'undefined') window.X = X;` — the shell finds the
module through `window[global]`, and a top-level `const` never lands on window.
The data file loads first. The shell (`engine/labs/lab_core.js`, `Labs`) already
registers your lab and its three file names; it loads them when the lab opens.

The module must export `mount(root)` and `unmount()` (stop the animation loop,
drop references), plus the test hooks `_test({instant})`, `_tick(seconds)` and
`_debug()` — same meaning as in `LabMixing`.

## 2. What a pupil must see (the Mixing Bench pattern)
A real parent landed on the first bench and could not tell what to do. Every lab
therefore has **all** of these, built like the Mixing Bench:
- **Top bar**: ← back (`Labs.backToHub()`), eyebrow `<Subject> · Grade 9`, title,
  a safety toggle if the lab needs one (goggles, gloves…), and `?` help.
- **The stage**: an HTML5 Canvas 2D scene that ANIMATES what is happening, with
  readout chips over it. 30 fps cap, devicePixelRatio ≤ 2, stop the loop when the
  screen is not `labs` or the page is hidden.
- **Lab assistant** under the stage (`.lab-coach`) with 💡 facts.
- **Guide box** (`#lab-guide`, the yellow one) and the `.is-next` glow on the thing
  to tap next.
- **Tabs**: 🧪 Bench · 🎯 Missions · ✨ Discoveries. The Bench tab opens, when
  nothing is under way, with **“What would you like to do?”**: the three steps,
  then **at least 3 guided experiments** and **at least 2 missions**.
- **Lab notebook** of observations / readings / results tables.
- **Discoveries (at least 12)**: tappable cards. Found → what you saw, the
  equation or formula, why it happens, “Do it again”. Locked → the clue, “How to
  find it”, “Show me how →” (a guide built from the discovery’s recipe).
- **Missions (at least 2)**: a goal, then exam-style questions through
  `Labs.quiz()`, stars through `Labs.missionDone()`, best stars saved in
  `Labs.store('<id>').missions`.
- **Mistakes that teach — at least 3 per lab**:
  - dangerous ones stop the experiment with `Labs.hazardCard()` and real signs
    (`Labs.sign` kinds: corrosive, explosive, flammable, pressure, toxic,
    irritant, oxidising, electric, hot, eye, biohazard): what happened, why it is
    dangerous, what to do instead, and the NCE paper point;
  - wrong-but-safe ones (a misread scale, parallax, a zero error, a wrong
    technique, an unfair test) use `Labs.resultCard()`: what happened and what
    you should have done.
  Show the consequence on the canvas before the card.
- **First-visit welcome** with “Show me how →”.

Reuse the shared classes in `engine/labs/labs.css` (`lab`, `lab-top`, `lab-body`,
`lab-stage`, `lab-canvas-wrap`, `lab-chip`, `lab-coach`, `lab-guide`, `lab-tools`,
`lab-tool`, `lab-tabs`, `lab-panel`, `lab-start*`, `lab-shelf`, `lab-item`,
`lab-notebook`, `lab-log`, `lab-table`, `lab-found*`, `lab-mission*`, `lab-btn*`,
`lab-eq`, `lab-hint`…) so every lab looks like one app. Add your own only in
`lab_<id>.css`.

## 3. The science
- **Grade 9 NCE only.** Ground every lab in the live chapters
  (`subjects/grade9-<subject>/_manifest.js`, `docs/nce-grade9/syllabus-science.md`)
  and the paper shapes in `docs/nce-grade9/blueprint-science.md` — quote real
  paper references (e.g. “Physics 2023 Q2(a)”) in the exam points.
- **Every outcome lives in the data file.** The bench never invents a number.
- **It must be true.** Use real formulas and real values (refractive index of
  glass ≈ 1.5; angle of incidence = angle of reflection; magnification = image
  size ÷ actual size; speed = distance ÷ time; …). Anything beyond the syllabus
  is labelled “beyond the NCE syllabus”.
- **Nothing to try at home** that could hurt a child.

## 4. Engineering rules (this app’s traps)
- Vanilla JS. No libraries, no frameworks, no build step.
- ⚠ Never put `transform`, `filter` or `contain` on `.screen` or its ancestors.
  Only the canvas animates.
- ⚠ Markup you inject is never seen by the Tailwind CDN — use `labs.css` classes
  and your own `.lab-<id>-` classes, never Tailwind utility classes.
- Escape everything through `Labs.esc()`. No regex lookbehind (Safari).
- Phones first: works at **360px** with no horizontal overflow; tap targets
  ≥ 44px; drag only for mouse/pen, with tap as the way that always works.
- Calm Mode (`.kid-calm` on `<html>`) and `prefers-reduced-motion`: the
  simulation still runs, nothing moves, effects apply at once (`Labs.calm()`).
- Progress only through `Labs.store('<id>')` + `Labs.persist()`; discoveries
  through `Labs.discover('<id>', discId, { title, total })` and then repaint the
  counter (the Mixing Bench once lagged a discovery behind). **Never** call
  `recordAnswer()` / `_recordDaily()`.
- Keyboard: every control is a real `<button>`.

## 5. Tests you must write and pass
- **Data test** (node, `vm`): every formula and number the lab shows, every
  discovery has a valid recipe, lesson and what-you-saw, every quiz question has
  4 distinct options and a reason, every hazard has all four texts.
- **Browser test**: copy the harness from `scripts/test-labs-mixing.js`. Open the
  app with `SELECTED_GRADE = 9; openLabs();` then `Labs.openLab('<id>')`. Cover:
  the start panel; one guided experiment end to end; **every discovery unlocks by
  following its own “Show me how”**; each hazard and result card; a mission to
  three stars; Calm Mode; 360px with no control past the screen edge; no page
  errors.
- Chrome for Testing:
  `CHROME_PATH=C:/Users/rajneesh.gobin/AppData/Local/Temp/claude/D--git-repo-psac-practice/c232e26e-5526-4712-885f-5707afb8a26d/scratchpad/chrome/win64-153.0.8010.36/chrome-win64/chrome.exe`.
  Serve over `file://` — it cannot reach a 127.0.0.1 server here. Use the
  **debugging port assigned to your lab** so parallel builds do not collide. Run
  **one Chrome at a time** and keep runs few: this laptop has limited memory.
- `node scripts/check.js` must still pass.
- Put scratch files in a folder named after your lab — parallel builds clobber
  each other’s scratch otherwise.

## 6. Do not
- commit, push or deploy;
- edit any file you do not own (`lab_core.js`, `labs.css`, `registry.js`,
  `index.html`, `app.js`, `sw.js`, other labs, other tests);
- flip your lab to `ready` — the lead does that after reviewing your report.

## 8. Labs for primary grades (PSAC Grades 4–6)
These labs serve younger children, so §3's "Grade 9 NCE only" is replaced by the
grades named in your brief. Everything else in this spec still applies, plus:
- **Declare the grades.** The data file exports `GRADES` (e.g. `[6]` or `[4, 6]`),
  and every guided experiment, mission and discovery carries `grades: [...]`, so
  the coming per-grade layer can show a Grade 4 child only the Grade 4 set.
- **Reading level of a 9–11-year-old.** Short sentences (about 15 words at most),
  everyday words, one instruction per step. Explain any science word the first
  time it appears. Bigger pictures, fewer words on the stage.
- **Read-aloud.** A 🔊 button on the lab assistant and on the guide box reads that
  text with `window.speechSynthesis` (an English voice). Never auto-play; cancel
  speech on every step change, overlay, `unmount()` and screen change.
- **Grounded in PSAC.** Use the app's own Grade 4–6 science chapters
  (`subjects/grade4-science`, `grade6-science` manifests and question files) and
  the PSAC past-paper items in `subjects/grade6-science/questions/past_paper_*.js`.
  Quote a paper reference (e.g. "PSAC 2025 Q8c") only if you found it in those files.
- **Age-appropriate hazards only**: hot things, flames, sharp or broken glass,
  electricity (low-voltage cells are safe; mains is not). No alkali metals, no
  strong acids, nothing a child could copy at home that could hurt them — say
  "ask an adult" where a real home version exists.
- **Smaller minimums:** at least 3 guided experiments, at least 10 discoveries,
  at least 2 missions with 5 simpler questions each.
- **Top bar eyebrow:** `Science · Grade <n>` (or `Grades 4 & 6`).
- **Opening it in tests:** `openLabs()` refuses non-NCE grades until the per-grade
  layer lands, so use `SELECTED_GRADE = <grade>; showScreen('labs');`, wait for
  `window.Labs`, then `Labs.openLab('<id>')`.

## 7. Report back
Files created; counts of guided experiments / discoveries / missions / hazard and
result cards; the science you checked and how; test results (numbers); anything
you could not do; any change the shared shell needs.
