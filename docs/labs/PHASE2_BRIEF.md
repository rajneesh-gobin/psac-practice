# Phase 2 brief — converting a lab to experiments

> Read this, then `LAB_SPEC.md` §10 (the contract), then `REWORK_PLAN_2026-09-19.md`
> §4 (the six stops and "decisions, not taps"). Three labs are already
> converted and are the reference — copy their shape, not their words:
> Rusting (`lab_rusting*.js`, the simplest), Circuit Board (`lab_circuit*.js`,
> a board with slots and a palette, two grades), Food Tests (`lab_food*.js`,
> a procedure with waits and a control tube). `engine/labs/lab_experiment.js`
> is the runner: read it to know what your adapter must provide; never edit it.

## What you own — and nothing else
`engine/labs/lab_<id>.js`, `engine/labs/lab_<id>_data.js`, `engine/labs/lab_<id>.css`,
`scripts/test-labs-<id>-data.js`, `scripts/test-labs-<id>.js`. (The Mixing
Bench's files are `lab_chem_data.js` + `lab_mixing.js`, tests
`test-labs-chem-data.js` + `test-labs-mixing.js`.) Do not edit `lab_core.js`,
`app.js`, `labs.css`, `lab_experiment.js`, `registry.js`, `sw.js`, `index.html`,
any other lab or any other test. Do not commit. Do not run any browser test —
Chrome runs one at a time and the lead runs them all afterwards. Scratch files
go in a folder named after your lab under your scratchpad. Other agents are
editing other labs in this same working tree right now.

## 1. EXPERIMENTS in the data file — 3 to 5 per grade the lab serves
Your brief names the grades and the chapter ids (they are the `chapters` of
your lab's row in `lab_core.js`; every experiment's `chapter` must be one of
that grade's ids). Re-cut what is already there: `steps` from GUIDES, `check`
from MISSIONS[].quiz (refs `"<mission id>:<index>"`), `saw`/`learn` from
DISCOVERIES. Shared apparatus across grades is fine; shared questions are not
— a Grade 4 level teaches Grade 4's syllabus at Grade 4's reading level.
- **Experiment 1 at each grade is the most exam-shaped thing the grade does**
  — if a past paper gives a set-up as a diagram, `setup` builds it and the
  child predicts and observes.
- `title` is a question a child can say back (≤ 60 chars, ends in "?");
  `aim` is one or two short sentences (≤ 200 chars).
- `predict`: 2–4 tappable options, the answer among them. Never typing.
- `steps`: 1–5. Each is a **decision** (`ask` + `options`, the wrong ones
  explaining themselves in `wrong`; several right answers via `any`) or an
  **observation** (`on` + `say`). Never "tap X" for its own sake: if a step
  exists only to set something up, put it in `setup` instead. Every `say`
  must CONTAIN the visible label of the control it points at (the button's
  text without its `<small>` sub-line; strip emoji). Instructions ≤ 25 words;
  at Grades 4–6 aim for ≤ 12.
- `see.saw` states what the bench will actually show after those steps (the
  test replays it; it must be TRUE), `see.learn` the syllabus point in one or
  two sentences.
- `check`: 2–3 questions answerable from what was just seen.
- `exam`: the paper point, quoted only if it is in the app's question files
  for that grade (`subjects/grade<N>-science/questions/`); otherwise a plain
  "In the exam you may be asked…" sentence.
- Words a 9–11-year-old does not know get explained the first time they appear.

## 2. The `experiment` adapter — exported by the bench module
`list / question / reset / apply / guide / stop / evidence / focus / selector / hooks`,
exactly as LAB_SPEC §10.2. Then the bench changes (see the rusting diff):
- `startGuide`: no bench reset when `G.exp`;
- `_guideEvent`: `experiment.hooks.token(token, step)` before matching, and
  `any` matching (`_stepHit`);
- `_guideEnter`: guard the "already satisfied" skip against a step with no
  `on`; call `experiment.hooks.step(i)` after rendering;
- `_guideDone`: when `G.exp` stop silently and call `experiment.hooks.done()`;
- `_highlight`: glow every token in `step.options || step.any || [step.on]`;
  no scrolling in exp guides;
- `focus(tokens)`: hide every tool / shelf / palette button whose token is
  not listed (and rows or groups left empty), re-applied after every render
  of those controls; `focus(null)` shows everything;
- `apply(tok)`: perform a token silently and instantly (suppress discovery
  toasts and cards during setup); a wait token in `setup` runs the clock
  until met;
- `selector(tok)`: the CSS selector of the control a token belongs to — the
  test taps it; for a wait/observe token with no control, return the
  selector of a harmless visible control (Food returns the selected tube);
- `evidence()`: ≤ 6 notebook lines, oldest first, in words a child wrote.
- Keep every existing guide, mission and discovery working in Explore.
- If a wrong option must not actually happen on the bench (tasting, a flame
  under a closed tube), make the bench *hear* the token without acting when
  the current exp step lists it as `wrong` (Food's `_expWrong`).

## 3. Your two tests
- `scripts/test-labs-<id>-data.js`: add an Experiments section — every setup
  and step token is one the bench accepts, refs resolve, `say` names its
  control, the See text is true by replaying the tokens through the data's
  own model where one exists. 0 failures.
- `scripts/test-labs-<id>.js` (browser; you edit, the lead runs): the lab now
  opens on an Aim at every grade you converted, so (a) replace the welcome
  card checks with "opens on an experiment Aim, no overlay in the way",
  then `click('[data-exp="explore"]')` and `await ev('Lab<Name>.experiment.reset(); true')`
  before the old-bench checks; do the same after every later `Labs.openLab`
  at a converted grade; (b) replace every `[data-guide-do]` click with
  tapping `.is-next` (a `next()` helper), including inside any
  discovery-runner loop; (c) fix stale wording expectations against the data
  file, never the other way round. Grades you did not convert are unchanged.
  Also run `LAB_EXP_COUNTS='{"<id>":{"<grade>":<n>,…}}' node scripts/test-labs-experiments-data.js`
  — 0 failures for your lab.

## 4. Report back (compact)
Experiments per grade (id, title, chapter, one-line steps); the counts to
register (`EXPERIMENTS_BY_LAB.<id> = {…}`) and the chapter → lab lines for
`_LAB_CHAPTERS`; bench functions changed; test numbers; anything you could
not do; anything the shared shell needs.
