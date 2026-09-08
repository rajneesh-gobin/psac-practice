# NCE Grade 9 — question format gap analysis

What the application can represent today, measured against what the NCE
Mathematics paper actually contains (`exam-blueprints.md`). Written by reading
the code, not by reading a summary of it.

## What exists today

### Factories — `engine/helpers.js`, duplicated in three server files

⚠ Per `CLAUDE.md`, every factory exists in **four** hand-written copies:
`engine/helpers.js`, `netlify/functions/questions.js`,
`netlify/build-questions.js`, `netlify/lib/questions-sandbox.js`. All four were
checked.

| Factory | Emits `type` | Notes |
|---|---|---|
| `makeMCQ` | `mcq` | Shuffles, keeps 4 options. |
| `makeNum` | `numeric` | `acceptableAnswers` as strings. |
| `makeTF` | `mcq` | Wrapper over `makeMCQ`; French labels by id prefix. |
| `makeMatch` | `mcq` | Collapses one pair into an MCQ. |
| `makeSymmetry` | `symmetry` | Grid reflection; its own renderer. |
| `makeCloze` | `cloze` | French Q6 only; excluded from every pool. |
| `makeText` | `text` | Typed French word, accent-lenient. |

### Renderers — `renderAnswerArea()`, `engine/app.js:2905`

Branches on `symmetry`, then `mcq`/`multi`, then `text`, then an **`else`**.

⚠ **The `else` is a numeric text input with `inputmode="decimal"` and a digit
pad.** Any question whose `type` the function does not recognise is drawn as a
number pad. This is the exact failure the brief names, and it is not
hypothetical — it is what `cloze` did before `isPoolQuestion()` was taught to
exclude it, and it is what every NCE format below would do today.

### Marking — `checkAnswer()`, `engine/app.js:2757`

Branches on `symmetry`, `multi`, `text`, else `normalise()` string comparison
against `[answer, ...acceptableAnswers]`.

### `multi` is half-built

`type: 'multi'` is handled by `checkAnswer()`, `renderAnswerArea()`,
`getSelectedAnswer()` (app.js:3048) and the printable paper (app.js:7711) — but
**there is no `makeMulti` factory in any of the four copies**, so no shared
factory can produce one.

⚠ **It is nevertheless in real use.** Measured in the built bundles: **12
`multi` items**, all in `grade4-french` (`g4fr-photo-001`…`-012`, chapter
`g4fr-images`), authored as raw object literals through a local helper in
`subjects/grade4-french/questions/image_photo_activities.js`. So multiple-select
is a live, shipping format with no schema, no validation and no shared factory
behind it — which is the same shape of hazard as the missing-from-the-context-list
`makeCloze` bug, one step earlier.

### The full type census

Counted in the built bundles, not inferred from the source:

| `type` | Count |
|---|---|
| `mcq` | 12,259 |
| `numeric` | 2,024 |
| `text` | 305 |
| `cloze` | 60 |
| `multi` | 12 |
| `symmetry` | 6 |

No question carries an undefined `type`.

### Pools — `isPoolQuestion()`, `engine/questions_engine.js:23`

`_POOL_TYPES_EXCLUDED = new Set(['cloze'])`. Everything else is dealt into
practice, subsection practice and `assembleExamPaper()`.

### Exam assembly — `assembleExamPaper(type)`, `engine/questions_engine.js:115`

Flat: `drill` 15 / `short` 25 / `full` 40 questions, chapters weighted by
`examWeight`, then a fixed 25/35/25/15 split across difficulties 1–4. No marks,
no sections, no ordering beyond difficulty, no multi-part.

### Printable paper — `engine/app.js:~7690`

Hard-codes the PSAC shape: a comprehension block, a **Section A at 2 marks per
question**, a **Section B at 4 marks per question**, and a separate answer key.
Marks are a constant per section, not a property of the question.

## The gap, format by format

Every row is a format the NCE Mathematics paper actually uses, with the witness
recorded in `exam-blueprints.md`.

| NCE format | Supported? | What is missing |
|---|---|---|
| MCQ, 4 options | **yes** | — |
| MCQ with a diagram in the stem | **yes** | `question` is innerHTML, so an inline SVG works. |
| MCQ with diagrams as the options | **partly** | Options are innerHTML too, but the printable paper prints them into a one-line `.mcq-opt` span; four SVG graphs would not lay out. |
| Numeric answer | **yes** | — |
| Numeric with a fixed unit | **no** | No `unit` field. The unit is currently glued into the answer string, which breaks `normalise()`. |
| Numeric with a tolerance | **no** | Comparison is string equality after normalising. `2.24` vs `2.236` cannot be accepted. |
| Exact/symbolic answer (`14π`, `22/7`, surds) | **partly** | Only via hand-listed `acceptableAnswers`. No equivalence rule, so `1/2`, `0.5` and `2/4` must each be listed. |
| Algebraic expression answer | **partly** | Same — no normalisation, so `4x+8` and `8+4x` need separate entries. |
| Column vector / matrix answer | **no** | No representation and no renderer. |
| Multi-blank answer (`x = , y =`) | **no** | One `answer` per question. |
| Ordering answer | **no** | No type. |
| Circle one item from an inline list | **no** | Expressible as an MCQ, but the printable paper must render it inline, not as an A/B/C/D block. |
| Tick one box from several | **no** | Same shape as MCQ, different presentation. No presentation field exists. |
| Multiple-select | **half** | Renderer and marking exist; **no factory**, so unauthorable. |
| Table completion | **no** | No type, no renderer, no per-cell marking. |
| Complete boxes on a diagram | **no** | As above. |
| Shade / draw / construct | **no** | No type, and no concept of "not automatically markable". |
| Extended response with a rubric | **no** | No `rubric` field anywhere. |
| Shared stimulus, several linked parts | **no** | Every question is independent; there is no parent/child relationship. |
| Multi-part `(a)`, `(b)(i)`, `(b)(ii)` | **no** | No part structure and no numbering depth. |
| Dependency between parts ("Hence…") | **no** | No way to state it, no follow-through credit. |
| Marks per part | **no** | Marks are a constant per printable section. |
| Named sections with their own instructions | **no** | Not needed for Mathematics (there are none), but required for other NCE subjects. |
| Data supplied in the stem (`sin 60° = 0.87`) | **yes** | Prose in `question`. Worth a dedicated field so a generator can guarantee consistency. |

## Consequences that decide the design

1. **A new `type` must be refused, not rendered.** The `else` branch has to
   become explicit: known types render, unknown types raise a visible
   "unsupported format" state. Falling through to a number pad is how a French
   passage got a digit keypad, and it will happen again the first time a Grade 9
   table-completion item reaches practice.

2. **Marks have to live on the question, not on the section.** Every NCE part
   carries its own `[n]`, and the totals must sum to 100. A per-section constant
   cannot express a paper whose last question is worth 7.

3. **A question needs to be able to say "I cannot be auto-marked".** Six
   Mathematics formats are drawing or construction tasks. The honest handling is
   to keep them, put them in printable mode with a rubric, and exclude them from
   the online pool — the same mechanism `cloze` already uses, generalised.

4. **Parts need a parent.** A shared stimulus printed once with `(a)`, `(b)(i)`,
   `(b)(ii)` under it is not three independent questions, and flattening it
   loses both the stimulus and the dependency.

5. **Legacy must not move.** 13,079 Grades 4–6 questions have no marks, no
   parts and no units. Every new field has to be optional with a defaulting rule
   that reproduces today's behaviour exactly, and the Grades 4–6 bundles must be
   byte-comparable before and after.

## Proposed model

A **task** is the unit an NCE paper numbers. It carries an optional shared
`stimulus` and one or more **parts**. A legacy question is a task with exactly
one part, one mark and no stimulus — produced by the existing factories with no
change to their call sites.

```
task {
  id, chapterId, subsection, difficulty,
  stimulus?   { html, altText, printOnly? },
  sectionId?,                 // named sections, for subjects that have them
  parts: [ part, ... ]        // 1..n, numbered (a), (b)(i), …
}

part {
  label,                      // 'a', 'b.i' — the generator renders the notation
  prompt,                     // innerHTML
  marks,                      // integer, required
  response { … },             // one of the response shapes below
  dependsOn?,                 // label of an earlier part, for follow-through
  hint, explanation,
  rubric?                     // required when response.autoMark === false
}
```

Response shapes, each with a renderer and a marker:

| `response.kind` | Auto-marked | Presentation |
|---|---|---|
| `choice` | yes | `variant: 'options' \| 'circle' \| 'tick'` |
| `multi` | yes | checkbox list |
| `number` | yes | `unit?`, `tolerance?`, `label?` (`x =`) |
| `expression` | yes | normalised algebra/fraction/surd comparison |
| `blanks` | yes, per blank | ordered list of blanks, `x = …, y = …` |
| `cells` | yes, per cell | table or diagram-box completion |
| `written` | **no** | rubric, printable answer space |
| `drawing` | **no** | rubric, printable grid or figure |

`written` and `drawing` are excluded from every online pool by the same
mechanism as `cloze`, and are the reason the printable generator has to exist
rather than being a nicety.

## Order of work this implies

1. Schema + validator + the four factory copies + the explicit-refusal renderer,
   with the Grades 4–6 bundles proven unchanged.
2. Marks-aware printable paper and mark scheme.
3. NCE blueprint-driven paper assembly for Mathematics.
4. Then content.
