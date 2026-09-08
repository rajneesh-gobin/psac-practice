# Content authoring — past papers, generators, French exercises, exam weighting, the importer

> Part of the PSAC brief. Start at [`CLAUDE.md`](../../CLAUDE.md) — it carries the
> architecture, the rules that apply anywhere, and the index to these files.
> Read this before writing or changing questions, packs or exam weights.
> Long-form history and how each rule was found: grep `ENGINEERING-NOTES.md`.

⚠ Nothing in any `.md` outranks the code or the live database. Measure, then edit.

---
## Past papers — 164 items, never gradable
Transcriptions (not PDF extractions) of real 2016–2024 PSAC questions. They push
to `window.PSAC_PDF_QUESTIONS`, ship in their own `past-papers.json`, and are
**never merged into `STATIC_QUESTIONS`**: none has an `answer`, and
`assignment-submit.js` grades through the sandbox. 63 carry `needsArtwork: true`
and are hidden. Read-only screen; `markScheme` powers an optional self-marking reveal.

## Dynamic generators
⚠ **A generator can only live in a `_manifest.js`.** In production question files
are fetched as JSON and never executed — only `file://` dev injects them.
`G5M_GENERATORS` (grade5-maths) is the only pack with any (12). Generated ids come
from `genId(prefix)`, never `Date.now()` alone — `getMixedQuestions()` de-dupes by
id and same-millisecond ids collapsed a whole run into one question.

## The two French exercise types (`cloze`, `errorhunt`)
Both are PSAC French Q6/Q7, both are ✨ BONUS chapters per live French pack, both
are **excluded from every pool by `isPoolQuestion()`** (`questions_engine.js`) —
`getStaticQs` feeds practice, subsection practice AND `assembleExamPaper`, and
dealt into any of them these draw a number pad under a French passage.
Both call `recordAnswer()` **once per gap / per error** (one gap = one mark)
passing the TEXT id, so `answeredIds` gives the list its ticks with no new
bookkeeping; unlike the minigames, these answers DO count toward mastery.
- **Textes à Trous** (`engine/cloze.js`, `g{4,5,6}fr-textes-trous`, 20 texts each,
  best score in `DB.cloze`).
  ⚠ **The three packs are not the same shape, because the papers are not.** G4/G5
  = one part, 10 gaps, 11 words, one deliberate spare. **G6 is two parts**: 6A is
  5 gaps with a bank of 6, then 6B is 5 more gaps of the SAME story with **no word
  list** — the child types. Grade 5 text 1 and Grade 6 texts 1–2 are real papers
  verbatim. G6 was first built to the G5 shape, so children in their exam year
  drilled 200 gaps that all handed the word over.
  ⚠ Q6 is grammar-in-context inside a **story**, not a vocabulary quiz (the real
  papers measure 55% grammar words; the first G6 set was 5.5%).
  ⚠ A part-B gap accepts a **list** (`gapAlts`) — failing a child for the better
  word is the one thing this must not do; a missing accent scores right and is
  flagged (a phone keyboard is a device problem, not a French mistake).
  ⚠ Every typed gap is the **same width** — sizing to the answer prints its length.
  ⚠ **Tap-to-place, not drag** (HTML5 drag never fires on touch); tapping a word
  fills the next empty gap, tapping a filled gap takes it back.
  ⚠ A passage printing a content answer in plain sight is **grandfathered, not
  accepted** (19 G4/G5 texts do it, and so does the real 2025 paper); the test
  asserts it only for the two-part pack.
- **Chasse aux Erreurs** (`engine/errorhunt.js`, `g{4,5,6}fr-chasse-erreurs`, 20
  texts each, 8/10/12 errors by grade, 600 in all; best score in `DB.hunt`). The
  child taps every wrong word; **Vérifier** answers with a COUNT only and
  **Terminer** reveals everything.
  ⚠ **Vérifier is capped at 3, and the screen says so** — a count you can ask for
  freely is an oracle. `test-error-hunt-interaction.js` asserts the markup is
  **byte-identical** either side of a check.
  ⚠ Errors are authored INLINE, `{faux>juste:regle}`, so an error can never drift
  from its word. Punctuation outside the braces rides onto both forms
  (`{cahier>cahiers:pl}.`), while `{cour>cour.:pt}` is a MISSING stop; anything
  else containing a brace **throws at build time**.
  ⚠ **Every word outside the braces must be correct French** — one left wrong by
  accident is an error a child can see, cannot score, and is TOLD is correct. The
  factory emits `correct` (the whole text put right) for harnesses to read.
  ⚠ The 44px tap rule is **deliberately bent here only** — every word is a button,
  and 44px words turn a 110-word passage into six phone screens; they are 40px
  with a `min-width` holding the short ones.
- ⚠ Shared by both: **a title must never contain the correction/answer of its own
  text** — it hands a free mark away on the list screen before the text is opened
  (28 cloze titles and 10 of the first 20 hunt titles did). ⚠ **A tap or keystroke
  must never call `renderPlayer()`** — it rebuilds the host's innerHTML and
  destroys the element under the finger/caret. Patch the counter line instead.
- Tests: `test-cloze-texts.js`, `test-cloze-interaction.js`,
  `test-error-hunt.js`, `test-error-hunt-interaction.js`. ⚠ In those harnesses
  measure a gap with **`offsetHeight`, not `getBoundingClientRect()`** — the pop
  animation's `scale(.82)` reports 29px for a 35.7px element.

---

## Exam weighting — set from the papers, not from item counts
`examWeight` is a chapter's share of a 40-question exam:
`n = Math.max(1, Math.round(examWeight * count / 40))`. It is the **only** lever on
what an exam contains — `getMixedQuestions()` is a flat shuffle inside one chapter,
and how many questions a chapter holds changes nothing.

**Ten of the fifteen primary live packs are weighted from their real papers.** One
rule throughout: read the paper question by question and give each mark to the
chapter that teaches it; a chapter the exam pool cannot reach comes out of the
denominator too. `scripts/exam-mark-maps.json` holds every mark map, and the
comment block above `chapters:` in each `_manifest.js` is **generated from it**, so
the two cannot drift.

| pack | papers read | marks |
|---|---|---|
| grade6-english / grade6-french | 2024 | 100 (French: 90 reachable) |
| grade6-science / grade6-history | 2022 + 2023 + 2024 | 150 |
| grade6-maths | 2023 + 2024 | 200 |
| grade5-english | 2023 + 2024 + 2025 | 51 items |
| grade5-french | 2025 | 100 (90 reachable) |
| grade5-science / grade5-history | 2024 + 2025 | 100 |
| grade5-maths | 2024 + 2025 | 200 |

- ⚠ **One paper is not enough for a topic-based subject.** Science and History
  rotate (`g6-ecosystems` scores 0 in 2023 and 6 in 2022; `g6-solar-system` 0 in
  2024 and 5 in 2023). Three years is the smallest sample that stops a real topic
  reading as zero; the languages are fixed year to year, so one paper is enough.
- ⚠ **THE GRADE 4 PACKS ARE NOT DERIVED AND CANNOT BE** — there is no Grade 4
  paper (`past-papers/` holds `psac6`, `psac5`, `psac5-mes` and `nce` only). All
  five keep hand-set weights and grade4-maths has none at all, so the SHAPE of a
  Grade 4 exam is an accident of chapter count and remains unverified. Do not
  invent a mark map from the Grade 5 paper.
- ⚠ **Some ✨ BONUS chapters are core exam content** — `g6enr-symbols` earns 9.3%
  of the History marks (flag, arms and anthem are asked EVERY year, more than Map
  Skills or Independence) and `g5enr-world` 8%. The gold card tells a child a
  yearly exam topic is optional. Worth re-labelling.
- ⚠ **Some weighted chapters earn almost nothing** — `trade-agri` earned 1 mark in
  two Grade 5 papers against a weight of 4; `percentage` earns **zero** in both
  Grade 5 maths papers (it is a Grade 6 topic), measured over two years. Both sit
  at the floor now.
- ⚠ **Weighting to the paper CONCENTRATES the draw**, and 594 items
  (`subjects/*/questions/exam_depth.js` in eight packs) were written to keep up —
  `g6-land-use` draws 11 of 40 questions from what was a pool of 47, i.e. four mock
  exams and a child had seen it out. **No pool in any of the fifteen primary live
  packs now repeats inside ten exams.** grade4-science was deepened too (every core
  chapter there held exactly 31 items and every enrichment chapter 19 — a fixed
  quota, not a measure of need).
  ⚠ Four new subsections were declared because the syllabus named the content and
  the map did not (`teeth`, `diet` on g6-animals, where the 2023 and 2024 papers
  spend 9 and 6 marks; `decrire`, `raconter` on both French image chapters). The
  new French items deliberately carry **no photograph** — that artwork does not
  exist in this repo, and « Observe l'image » with no image is a broken item.
- ⚠ **A chapter that can fill nothing used to LOSE its slot** — a "40-question"
  French exam dealt 39 (37 in grade 4), silently, for as long as the cloze chapters
  have existed. `assembleExamPaper` now drops such a chapter.
  `scripts/test-exam-paper-shape.js` asserts every live pack deals a whole
  40 / 25 / 15, holds each weighted pack's worst chapter within 4 points of its
  paper (one question is 2.5 points, so a tighter band fails on rounding alone),
  and prints the thin pools on every run.

---

## The importer (`netlify/import-questions.js`)
Full write-up in `DB_IMPORT_GUIDE.md`. What matters here:
- **`--check` (no credential, no network) · `--dry-run` (reads only) · no flag
  (upserts).** An unknown flag exits 2 — it must never fall through to a live import.
- **Two-phase and fail-closed.** The whole corpus is validated before Supabase is
  contacted, so a broken file anywhere means **zero** writes. An unknown question
  `type` fails preflight; it is never coerced to MCQ.
- ⚠ **A protected row can never rewrite local source as `makeMCQ`.** Only
  `mcq`/`numeric`/`text` are regenerable, and even then the candidate file is
  re-executed through the real loader and compared before it is written. Backups
  and the answer-carrying conflict report go to `.import-conflicts/` (gitignored
  **and** given a `netlify.toml` 404 — a CLI deploy ships gitignored files).
- ⚠ **A clean re-import is "0 new, ~560 updated", not zero writes** — `makeMCQ`
  keeps a random 3 distractors, so the items authored with more than 4 options
  change shape on every load. Churn, not drift.
- ⚠ **The importer never deletes.** Removing a question from `subjects/` does not
  remove it from the database.
