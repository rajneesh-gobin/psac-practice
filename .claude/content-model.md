# Content Model

## Question file pattern
```js
'use strict';
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5sc-plants-001', chapterId:'plants', difficulty:2,
    subsection:'photosynthesis',
    question:'Question text (innerHTML — <b>, <img>, inline <svg> all work)',
    options:['A','B','C','D'], answer:'B', hint:'…', explanation:'…' })
);
```
- IDs: `[grade][subject]-[chapter]-[3 digits]`.
- difficulty: 1 Basic · 2 Medium · 3 Hard · **4 = word problems** (applied, not
  just harder recall).
  ⚠ **That L4 definition is MATHS-SHAPED.** Measured per pack: english L4 =
  extended passage/essay analysis; french L4 = multi-verb cloze; history/science
  L4 = applied scenarios. Two automatic gates were tried and rejected (they fired
  on 1,055 French and 206 English items whose grammar answers are single words by
  nature). `scripts/audit-difficulty-labels.js` therefore **reviews, never fails**:
  whether a question demands reasoning is a reading, and a script can only count
  what someone has already asserted. ⚠ The labels are the AUTHOR'S assertion, not
  a measurement — L3/L4 had been diluted with plain retrieval.
  ⚠ **It audits EVERY live pack** (derived, not a literal list) and reports two
  more things, both added 2026-09-09:
  - **Template runs** — stems compared with every number replaced by `#`. Two
    questions that differ only in their numbers are ONE question for a child.
    Measured then: grade4-maths **62%** of items shared a stem, grade3-maths had
    a run of **48** (`# × # = ?`), and grade5-maths had **17 families of exactly
    20, every item at L4** — half the pack's L4 stock, one sentence each with the
    values walked upward. Rewritten to 4–6 real situations per family; the
    biggest g5x run is now 5.
  - **Maths L4 depth** — operands in the stem are a floor on step count, and
    maths is the one family where L4 claims multi-step. An L4 with two numbers
    cannot be multi-step. Still a review: "15% profit on Rs 18,000" is two
    operands and a legitimate two-stage problem.
- ⚠ **Varying the numbers is not varying the question.** A new situation must
  change what the child has to *do* — withhold a quantity they must derive, ask
  for an intermediate rather than the final total, or run the problem backwards.
  ⚠ And check every division comes out exact: the rewrite caught 94.5° angles,
  22.5 walkers, 568.888… seconds and "42.5 g per person" in worked routes.
- ⚠ **`makeMCQ()` SHUFFLES its own options.** Authoring answer-first is still
  useful (`options[0]` is then always the answer, checkable at a glance) but
  positions nothing — do not believe a comment that claims it does. What needs
  care is keeping all four options the same grammatical shape and length;
  `scripts/test-option-parity.js` catches length leaks.
- Images: bundled under `assets/questions/` (see [deploy-and-verification.md](docs/claude/deploy-and-verification.md)). Prefer inline SVG — it
  cannot 404, works offline, and its contents are known exactly.
- ⚠ **Alt text must NEVER reveal the answer** ("an object", "a diagram").
- ⚠ **Never remove a `// @enrichment` guard comment** during syllabus audits.

---

## Chapter content comes in FOUR shapes — a reader must handle all four
| Shape | Chapters | Where |
|---|---|---|
| `pack.syllabus[id].subsections` | 18 | **grade5-maths only** |
| `chapter.syllabus` prose | 60 | History ×3, Science ×3, grade4/6-maths |
| `chapter.notes` | 55 | English ×3, French ×3 (`notesBased: true`) |
| `chapter.enrichmentNote` | 15 | bonus chapters |

`renderSyllabus()` reads all four; `_notesToHtml()` and `Calendar.showNotes()`
share a `**bold**`/`*italic*` subset — **keep them in step**.

---

## Subsections
Every chapter expands into named sub-topics with a live count and its own
"Practise →" (100% tagged). ⚠ **Invariant: declared subsection ids and tagged
subsection ids must be identical per chapter.** A declared id with no questions
opens empty; a tagged id that is not declared hides those questions from the
screen. The English/French maps are *generated from the tags* so they cannot
disagree at birth.
- ⚠ It was broken in five chapters at once and had been for a long time — 22
  elapsed-time items on `g6-time-speed` alone were unreachable.
  `audit-content-coverage.js` was counting undeclared tags the whole time but
  never naming them and never failing, which is precisely how five survived.
  `scripts/test-subsection-invariant.js` names them and fails the build.
- Prefer reusing a sibling pack's id (`narration`, `figures_style`, `vrai_faux`,
  `word_probs`) over inventing a one-item subsection. ⚠ A declared subsection
  under 20 questions is reported as a permanent gap by `audit-content-coverage.js`.

---

## Enrichment chapters
```js
{ id:'g5enr-personalities', name:'…', icon:'👤', enrichment:true,
  examWeight:2, enrichmentNote:'Derived from syllabus, NOT a direct MIE chapter.' }
```
Gold "✨ BONUS" card. **An EXPLICIT `examWeight: 0` now keeps a chapter out of an
exam**, as it always read as though it did; a MISSING weight still defaults to 1,
because 7 packs never set one. ⚠ It used to clamp both with `Math.max(1, …)`, so
a deliberate 0 still bought a slot — measured on grade9-english, where
`g9eng-listening` and `g9eng-speaking` are weighted 0 and hold two poolable items
each: the paper was built from 42 slots and reconciliation took both back off
`g9eng-reading`, the pack's HIGHEST-weighted chapter, 10 → 8. No amount of new
content could fix that. ⚠ Only 8 chapters carry an explicit 0 and 6 are the French
cloze/errorhunt chapters `canFill()` already drops, so this changed one pack.
⚠ The TYPE filter is still the guard that holds for a chapter that is weighted but
unfillable.

---

## The rest of authoring → [`content-authoring.md`](docs/claude/content-authoring.md)
Past papers (164 items, never gradable) · dynamic generators · the two French
exercise types (`cloze`, `errorhunt`) · exam weighting derived from the real
papers · the importer's flags and fail-closed preflight. Headlines:
- ⚠ **`isPoolQuestion()` excludes `cloze` and `errorhunt` from every pool** —
  dealt into practice or an exam they draw a number pad under a French passage.
- ⚠ **A generator can only live in a `_manifest.js`** — in production question
  files are fetched as JSON and never executed.
- ⚠ **`examWeight` is the only lever on what an exam contains**, and ten packs are
  weighted from their real papers; **the Grade 4 packs are not derived and cannot
  be** — there is no Grade 4 paper.
- ⚠ **The importer never deletes**, is two-phase and fail-closed, and a clean
  re-import is "0 new, ~560 updated", not zero writes.
