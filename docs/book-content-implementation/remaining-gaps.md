# Remaining Gaps After 2026-09-09 Implementation

## Health Education — Grade 2 and Grade 3

**Status:** RESOLVED. All 9 subsections in each health pack have exactly 20 questions.

- grade2-health: ch_topup.js added (90 questions; 10 per subsection × 9 subsections)
- grade3-health: ch_topup.js added (90 questions; 10 per subsection × 9 subsections)

Both files added to `question_loader.js`.

## Grade 1–3 Health — ch01_sample.js Cleanup

**RESOLVED.** All three sample files have been deleted:
- `subjects/grade1-health/questions/ch01_sample.js` — deleted ✓
- `subjects/grade2-health/questions/ch01_sample.js` — deleted ✓
- `subjects/grade3-health/questions/ch01_sample.js` — deleted ✓

## subjects/_index.js — Regeneration

The index was updated manually. Once Node.js is available, run:
```
node scripts/build-subject-index.js
```
Then run `node scripts/check.js` to verify no drift.

## Grade 7 Maths — Existing Chapters

The original grade7-maths chapters (integers, operations, indices, factors, fractions,
percentages, ratio, polygons, coordinates, constructions, symmetry, transformation, mass,
length, area, time, speed, money, algebra, equations, sets, statistics) have existing
question files (ch01_core.js, ch02_expanded.js) with good question counts. These were not
audited in this pass — they may benefit from a subsection-level quality check.

## Grade 8 Maths — Existing Chapters

Same as Grade 7 above. ch01_core.js and ch02_expanded.js exist and were not re-audited.

## Subsection Invariant Validation

Run to verify all tagged subsection IDs in question files match manifest declarations:
```
node scripts/test-subsection-invariant.js
```
Known potential mismatch to watch: grade3-ssee weather chapter (corrected by agent;
verify it held).

## Grade 3 SSEE — Not in Live Packs Count

The `grade3-ssee` pack is grade 3, which is listed as paid. Since the app is currently
free, this won't block access. But note that `comingSoon: false` means it will appear in
the grade selector for Grade 3, and parents will see it.

## ICT Grades 1–3

All three ICT packs remain `comingSoon: true` with only `ch01_sample.js`. Not in scope
for this implementation pass.
