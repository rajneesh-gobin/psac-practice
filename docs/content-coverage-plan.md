# Question-bank coverage plan (Grades 4–6)

## Goal

For every published Grade 4, Grade 5 and Grade 6 subject, every syllabus
subsection must have **at least 20 questions**.  Each addition must remain
age-appropriate, use a variety of prompts, include hints and explanations,
and avoid duplicate question text.

## Resume point — 2 September 2026

### Latest automatic checkpoint — 4 September 2026, English noun batches

Completed two grade-specific batches, 80 new questions total:

| Grade / subsection | Before | After |
| --- | ---: | ---: |
| Grade 5 English: collective nouns | 6 | 26 |
| Grade 5 English: abstract nouns | 5 | 25 |
| Grade 6 English: plurals | 2 | 22 |
| Grade 6 English: abstract nouns | 1 | 21 |

Files: `coverage_noun_meanings.js` (Grade 5 English) and
`coverage_noun_precision.js` (Grade 6 English). Grade 5 uses contextual noun
meanings; Grade 6 adds plural editing, compounds and abstract-noun word forms.
All have hints and explanations. New IDs and normalised prompts are unique in
their respective rebuilt banks; every new MCQ has four distinct options and
exactly one keyed answer. Cache v18 / shell v120. No deploy or database import.

Validation: `node netlify/build-questions.js`,
`node scripts/test-english-noun-coverage.js`,
`node scripts/test-grade56-english-context.js`, `node scripts/check.js`.

#### Fresh all-subject count audit

Run `node scripts/audit-content-coverage.js --bundles` after rebuilding.
Add `--detail` for subsection lists or `--json` for structured output.
The audit includes declared zero-count subsections and reports undeclared tags.
These are **raw counts**, not a claim that every existing question has passed
semantic/duplicate quality review. The shortfall is a lower bound.

| Pack | Declared subsections below 20 | Raw questions needed |
| --- | ---: | ---: |
| Grade 4 English | 0 | 0 |
| Grade 4 French | 0 | 0 |
| Grade 4 History | 6 | 73 |
| Grade 4 Maths | 6 | 89 |
| Grade 4 Science | 41 | 575 |
| Grade 5 English | 42 | 552 |
| Grade 5 French | 44 | 684 |
| Grade 5 History | 32 | 377 |
| Grade 5 Maths | 54 | 542 |
| Grade 5 Science | 29 | 367 |
| Grade 6 English | 35 | 501 |
| Grade 6 French | 36 | 529 |
| Grade 6 History | 42 | 594 |
| Grade 6 Maths | 57 | 781 |
| Grade 6 Science | 41 | 599 |
| **Total** | **465** | **6,263** |

Undeclared tags requiring inspection (do not silently count them as visible
syllabus coverage): Grade 4 French `g4fr-lecture/figures_style` (2), `grammaire`
(1), `vrai_faux` (1); Grade 5 French `fr-lecture/idee_principale` (3), `grammaire`
(1); Grade 6 French `g6fr-lecture/grammaire` (1), `source_anonyme` (1), `biais`
(1); Grade 6 Maths `g6-time-speed/word_probs` (22).

Next: Grade 5 English articles/determiners and Grade 6 English future tense /
punctuation, after inspecting their grade-specific source questions. Image-led
topics still need genuine artwork; these noun batches do not substitute text
for those activities. Continue Grade 5/6 before remaining Grade 4 gaps.
Earlier checkpoints below are historical and must not override this audit.

### Current priority — Grades 5 and 6 (user request, 4 September 2026)

Added 80 English questions in this batch, based on the existing grade-specific
syllabus and question styles:

| Grade | Subsection | Before | After |
| --- | --- | ---: | ---: |
| 5 English | Nouns: plurals | 5 | 25 |
| 5 English | Nouns: pronouns | 5 | 25 |
| 6 English | Clauses: conjunctions | 3 | 23 |
| 6 English | Verbs: perfect tense | 3 | 23 |

Files: `subjects/grade5-english/questions/coverage_nouns_context.js` and
`subjects/grade6-english/questions/coverage_links_perfect.js`. Grade 5 uses
sentence-level noun/pronoun selection (difficulty 2); Grade 6 uses explicit
logical relationships and present/past perfect verb phrases (difficulty 3).
Every addition has a hint and explanation. No content copied between grades.

Validation: bundle rebuild, syntax/static checks, new-prompt uniqueness and
four-option/answer checks using `scripts/test-grade56-english-context.js`.
Loader cache v17, shell v111. Not deployed or database-imported.

Next candidates: Grade 5 articles (5), collective nouns (6), abstract nouns (5),
determiners (5); Grade 6 plurals (2), abstract nouns (1), punctuation (1),
future tense (1). Audit again before adding. These subjects still have other
underfilled subsections; this is not an all-subject completion claim.

### Latest verified batch — 4 September 2026

Resumed the partially completed Grade 4 Mathematics bank. Added 80 questions in
`subjects/grade4-maths/questions/coverage_data_reasoning.js`, derived from the
existing Data Handling syllabus and question styles. Includes standalone tally
tables, pictograms with half symbols, SVG bar charts and averages tasks. Each
question has a hint and worked explanation.

Verified generated counts:

| Data Handling subsection | Before | After |
| --- | ---: | ---: |
| Tally charts | 5 | 25 |
| Pictograms | 8 | 28 |
| Bar charts | 11 | 31 |
| Mean, median, mode and range | 7 | 27 |

Next Mathematics batch: Geometry, the only remaining Grade 4 Mathematics gaps:
2-D shapes 7/20 (13 needed), 3-D solids 8/20 (12), angles 7/20 (13), lines 2/20
(18), symmetry 3/20 (17), perimeter 4/20 (16). Total shortfall: 89 questions.
Other subjects still require fresh audits; earlier completion notes below are
historical checkpoints, not a current all-subject verification.

Validation: rebuilt bundles, static checks, new-ID and new-prompt uniqueness,
all 80 expected numerical answers, hints/explanations and subsection audit via
`node scripts/test-grade4-data-coverage.js`. Loader cache v16; shell v110.
No deployment or database import performed.

### Completed in this pass

Grade 4 English is now fully complete:

- Nouns, Pronouns & Articles — all 9 subsections are at 20+.
- Verbs & Tenses — all 8 subsections are at 20+.
- Adjectives & Adverbs — all 5 subsections are at 20+.
- Sentences & Punctuation — all 3 subsections are at 20+.
- Reading Comprehension — all 6 subsections are at 20+.
- Vocabulary & Word Study — all 6 subsections are at 20+.
- Passages & Text Types — all 4 subsections are at 20+.

New source banks added in this pass:

- `subjects/grade4-english/questions/coverage_articles.js`
- `subjects/grade4-english/questions/coverage_nouns.js`
- `subjects/grade4-english/questions/coverage_verbs.js`
- `subjects/grade4-english/questions/coverage_adjectives_sentences.js`
- `subjects/grade4-english/questions/coverage_comprehension.js`
- `subjects/grade4-english/questions/coverage_vocabulary.js`
- `subjects/grade4-english/questions/coverage_passages.js`

All five are registered in `engine/question_loader.js`.

Grade 4 French is now fully complete:

- Every syllabus subchapter now has 20 or more questions.
- The generated Grade 4 French bank contains 1,851 questions.
- New coverage banks include vocabulary, articles, adjective/adverb practice,
  sentence grammar, past tenses, reading and text types.

### Immediate next batch

Next, work grade by grade, one subject at a time:

1. Grade 4: History, Mathematics, Science.
2. Grade 5: English, French, History, Mathematics, Science.
3. Grade 6: English, French, History, Mathematics, Science.

The live audit at this checkpoint still reports gaps in the subjects above.
Do not use total subject question counts as proof of coverage: inspect each
manifest subsection separately.

## Content rules

- Use chapter and subsection IDs already declared in each subject `_manifest.js`.
- Keep questions targeted to their own grade; do not copy advanced Grade 6
  material into Grade 4.
- Mathematics additions should prioritise varied word problems, reasoning,
  diagrams/tables when useful, and not merely arithmetic drills.
- Language additions should use varied contexts and authentic reading/writing
  examples. Image activities must use real, properly attributed/reusable assets
  when an image is integral to the question.
- Add `hint` and `explanation` to every question.
- Use stable, unique IDs and unique question prompts.

## Required validation after every batch

```powershell
node --check <new-question-file.js>
node netlify/build-questions.js
node scripts/check.js
git diff --check
```

Run the subsection audit before moving to the next subject. A subsection is
complete only when the generated bundle reports 20 or more matching questions.
Also run a duplicate-prompt check within the edited subject bank.

## Release note

When `engine/question_loader.js` changes, bump `SHELL_VERSION` in `sw.js` so
cached browsers receive the new loader. Rebuild the question bundles before
testing in the local app or deploying.
