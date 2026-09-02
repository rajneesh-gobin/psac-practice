# Question-bank coverage plan (Grades 4–6)

## Goal

For every published Grade 4, Grade 5 and Grade 6 subject, every syllabus
subsection must have **at least 20 questions**.  Each addition must remain
age-appropriate, use a variety of prompts, include hints and explanations,
and avoid duplicate question text.

## Resume point — 2 September 2026

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
