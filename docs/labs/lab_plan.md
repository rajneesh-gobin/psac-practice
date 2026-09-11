# Science Labs — what is left to do

> Written 2026-09-11 (night), when the owner paused the batches. Pick up from
> here. Background and history: `docs/labs/PLAN.md`. How to build a lab:
> `docs/labs/LAB_SPEC.md` (§8 primary labs, §9 grade levels).
> ⚠ Re-check this against the code before trusting it: `Labs.LABS` in
> `engine/labs/lab_core.js` and `_LAB_GRADES` in `engine/app.js` are the truth.

## Where things stand
| Grade | Labs live (`ready`, verified by the lead) |
|---|---|
| 4 | Materials, Water & States, Air & Burning, Circuit Board, Photosynthesis, Light Bench, Measurement |
| 5 | none of its own — borrows the Grade 4 and 6 labs (`Labs.GRADE_ALIASES`) |
| 6 | Rusting, Air & Burning, Circuit Board, Photosynthesis |
| 7 | Microscope, Separation Station, Circuit Board, Measurement |
| 8 | Separation Station, Mixing Bench, Food Tests, Measurement |
| 9 | all nine (Mixing, Separation, Light, Measurement, Circuit, Motion, Photosynthesis, Quadrat, Microscope) |

`_LAB_GRADES = [4, 5, 6, 7, 8, 9]`. Nothing is committed or deployed by this
work (see "Before you commit" below).

## 1. Builds that were still running when we paused — ✅ all four finished
Four builders were mid-edit when the owner paused; they were left to finish
rather than be killed, because three of them edit live labs. All four reported
the same night and were verified and registered by the lead (table below), so
nothing is in flight. Start the next session at §2.

| Build | Lab files | Port | On a good report |
|---|---|---|---|
| ✅ Mixing Bench — Grade 8 level — **done**: data 107/0, browser 124/0 on the real path, registered `[8, 9]` with `blurbs`; both no-goggles cards now carry the `goggles` sign; door checks moved to Grade 3 | `lab_chem_data.js`, `lab_mixing.js`, `test-labs-chem-data.js`, `test-labs-mixing.js` | 9420 | — |
| ✅ Circuit Board — Grade 7 level — **done**: data 252/0, browser 238/0 on the real path, grades 38/0, registered `[4, 6, 7, 9]` with its blurb | `lab_circuit*` | 9421 | — |
| ✅ **Food Tests** — new lab, Grade 8 — **done**: data 111/0, browser 76/0, grades 38/0, `ready`. Gelatine (not egg white, which holds free glucose) is the protein food; water-bath ~80 °C, Biuret ~3 min and spot-drying ~5 min are typical school-lab figures from the builder, not the repo | `lab_food*` | 9422 | — |
| ✅ Measurement Lab — Grade 7 and 8 levels — **done**: data 188/0, registered `[4, 7, 8, 9]` with blurbs. Not built (not in the packs): an overflow can, a drawn spring balance; kg/m³ accepted but labelled beyond the Grade 8 questions | `lab_measure*` | 9423 | — |

⚠ If a session ended before a report came in, the builder's work may be half
done. Check `git diff` on those files and run that lab's two tests before
registering anything; if they fail, re-run the build from its brief.
⚠ The Mixing builder was told to move the door checks at the top of
`scripts/test-labs-mixing.js` from Grade 7 to Grade 3 (Grade 7 now has labs).
If it did not, do it: "no labs" = Grade 3, the grant test = Grade 3 + Grade 9.

## 2. Next batch (the last planned one)
- **Magnets** — new lab, Grades 8 and 4 (`L('magnets', …, [4, 8])`). Keep the
  Grade 4 level distinct from the Materials Tester's magnet test (poles,
  attract/repel, magnetic materials, field lines with iron filings at Grade 8).
- **Forces & Pressure** — new lab, Grade 8 (pressure = force ÷ area, friction,
  balanced/unbalanced forces — verify against `subjects/grade8-science`).
- Lead fixes, no builder needed:
  - Separation Station, Grade 7: the distillation bench reuses the Grade 9
    faulty-rig cards, which quote Grade 9 papers ("Chemistry 2025 Q5(b)(iv)").
    Give Grade 7 its own card texts or drop the paper line at Grade 7.
  - ✅ Mixing Bench `goggles` sign — done.
  - **Question bank, not labs:** two Grade 8 explanations carry unbalanced
    equations — `g8s-acids-004` "HCl + CaCO₃ → CaCl₂ + H₂O + CO₂" and
    `g8s-acids-008` "HCl + CuO → CuCl₂ + H₂O" (both need 2HCl). Fixing them is a
    content change: bump `_CACHE_VERSION` and re-import (content-authoring.md).
  - The Mixing Bench's three text links use an inline `min-height:44px`; could
    move to a `.lab-mixing .lab-link` rule in `labs.css`.

## 3. Optional batch (weaker evidence in the grade analysis)
- **Sun, Earth & Moon** — new lab, Grades 6 and 7 (day and night, shadows
  through the day, phases, eclipses).
- **Heat Transfer** — new lab, Grade 6 (conduction, convection, radiation,
  insulators).
- **Light Bench — Grade 6 level**: Grade 6 has light content (shadow length
  through the day `g6sc-hd-059`, the Moon reflecting sunlight, eclipses, day and
  night) — may fold into Sun, Earth & Moon instead.
- Maybe: Motion Track / Quadrat Field lower-grade levels — not analysed yet.

## 4. Questions for the owner
- Is filtration in the Grade 4 textbook? (The app's Grade 4 syllabus has none;
  it is Grade 8. The Grade 4-6 books are not in `books/`.) If yes, the
  Separation Station gets a Grade 4 level.
- Should Grade 5 get science content of its own? (Today it borrows 4 and 6.)
- Air & Burning quotes the Mauritius fire service number **115** and "1 litre of
  air weighs about 1.2 g" from the builder's own knowledge — confirm 115.
- Air & Burning (Grade 6) uses the limewater test, which is not in the app's
  Grade 6 questions — keep or drop?

## 5. How to take a finished build (the lead's checklist)
1. Read the report; re-run its data test yourself (`node scripts/test-labs-<id>-data.js`).
2. Register: add the grades to the lab's `L(...)` row in `lab_core.js` (a
   per-grade blurb is `{ 9: '…', 7: '…' }`), flip `ready` for a new lab, and add
   any NEW grade to `_LAB_GRADES` in `app.js` (CRLF file).
3. `node --check` both; then, one Chrome at a time, the lab's browser test
   (now on the real path — its NOTE line should be gone) and
   `scripts/test-labs-grades.js` (derives its expectations from the registry).
4. Update the tables above and the status in `PLAN.md`.
- Chrome for Testing only, over `file://`:
  `CHROME_PATH=C:/Users/rajneesh.gobin/AppData/Local/Temp/claude/D--git-repo-psac-practice/c232e26e-5526-4712-885f-5707afb8a26d/scratchpad/chrome/win64-153.0.8010.36/chrome-win64/chrome.exe`
  (if that scratch folder is gone, reinstall Chrome for Testing — never drive
  the installed Chrome headless).
- Parallel builds: at most 4, one port each (next free: 9424+), check free
  memory first (this laptop has ~5-7 GB free), briefs modelled on LAB_SPEC §8/§9.

## 6. Before you commit / deploy
- ⚠ Commit `eb9c86b` "test" (made by another session mid-build) holds
  half-built versions of the water, air, circuit, photo and some light/measure
  files; the finished versions are only in the working tree. The next commit
  must include all of `engine/labs/`, `scripts/test-labs-*.js`, `engine/app.js`
  (`_LAB_GRADES`, `openLabs` toast), `index.html` (Labs note text) and the docs.
- Run the whole suite once: every `scripts/test-labs-*-data.js`, every
  `scripts/test-labs-*.js` (sequentially), `scripts/test-labs-grades.js`,
  `scripts/test-role-modules.js`, `node scripts/check.js`.
- Bump `SHELL_VERSION` in `sw.js` (app.js and index.html changed). Lab files
  are fetched on demand and not precached.
- Pre-existing, unrelated: `scripts/test-pending-report-clarity.js` also fails
  on HEAD.
