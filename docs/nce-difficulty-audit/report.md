# NCE Grade 9 difficulty audit

Audited 9 September 2026. Scope: the current local repository, eight Grade 9 packs. No question content, difficulty labels, production database or application behaviour was changed by this audit.

## Verdict

**The claim is substantially supported, but it needs a precise interpretation.** There are repeated examples of basic recall and simple retrieval labelled Hard or Challenge. There is also a substantial assessment-format gap: all available English, French and Social & Modern Studies practice items are MCQs. Selecting an explanation or writing strategy is easier, and assesses less, than producing a supported answer.

This is not evidence that every easy question is inappropriate for Grade 9, nor that a measured percentage of the whole bank is below standard. The NCE assesses cumulative knowledge and includes accessible opening questions. The problem is calibration, balance and the absence of equivalent opportunities to demonstrate more demanding skills.

Confidence is high in the census, the identified mislabelling examples and the format gap; moderate in subject-wide editorial conclusions. No pupil response data was analysed, so this is an audit of cognitive demand rather than empirical item difficulty.

## Method and limits

- Loaded all eight packs through the application's server sandbox, producing 8,019 records. Separated 871 parent task records from 7,148 practice items using the live practice eligibility rule. A parent task and its projected parts must not be counted as independent practice questions.
- Screened 93 practice items selected systematically: three evenly spaced IDs within each subject/difficulty stratum, after sorting IDs. SMS has no L4, hence 93 rather than 96. This deliberately spreads attention across levels; it is not a random, bank-weighted sample and does not cover every chapter.
- Investigated additional examples and recorded 23 item-level findings/counterexamples in evidence.md and reviewed-items.json. The evidence list includes items outside the systematic sample.
- Read the current selection/projection code and existing syllabus/blueprint documents. Earlier project audit claims were treated as background, not fresh verification.
- Rendered and personally inspected nine selected pages from the eight local 2025 NCE papers. These benchmark both simple and more demanding responses. This audit did not re-read every page of every paper or visually render every app question.
- Checked the official [MES NCE question-paper catalogue](https://mes.govmu.org/mes/?page_id=7606). The substantive comparisons below use the supplied local PDFs.
- These are LOCAL source findings. The live Supabase bank, browser cache and a particular child's actual session may differ. Existing unrelated working-tree edits were preserved. The frozen corpus records what was loaded during this audit.

## Current practice inventory

| Subject | Practice items | MCQ share | L1 / L2 / L3 / L4 |
|---|---:|---:|---|
| biology | 783 | 87.4% | 162 / 344 / 257 / 20 |
| chemistry | 836 | 86.8% | 139 / 395 / 278 / 24 |
| english | 612 | 100.0% | 24 / 323 / 247 / 18 |
| french | 1025 | 100.0% | 28 / 572 / 420 / 5 |
| ict | 1638 | 91.0% | 159 / 1224 / 247 / 8 |
| maths | 1006 | 16.1% | 107 / 239 / 297 / 363 |
| physics | 883 | 80.9% | 157 / 353 / 341 / 32 |
| social-modern-studies | 365 | 100.0% | 34 / 192 / 139 / 0 |


L1–L4 are the app's stored labels, not independently validated levels. MCQ share is a format statistic, not the percentage of easy questions. Some MCQs can be demanding, and some typed answers can be trivial.

## Findings by subject

**English — high priority.** All 612 practice items are MCQs. There are legitimate grammar and reading tasks, but some L4 literature items contrast an obvious figurative meaning with implausible literal alternatives. Selecting the only answer that cites evidence does not assess constructing an interpretation. The 2025 paper requires a 200–250-word essay, visibly worth 15 marks (PDF p15). This capacity is not exercised by an all-MCQ bank.

**French — high priority.** All 1,025 items are MCQs. L4 includes choosing the infinitive after “Il a voulu”; this is routine recognition. Some items test knowing advice about writing rather than writing. The 2025 paper's Q7 requires a 50–75-word invitation addressing three points, worth 10 marks (PDF p11). There are useful harder grammar items, such as passive transformation in the pluperfect; retain those while adding productive assessment.

**Social & Modern Studies — high priority.** All 365 items are MCQs and none is labelled L4. Absence of L4 alone is not proof of poor quality, but recognition cannot replace developed explanations. The 2025 Section B Q6 asks pupils to explain why tax exemptions and labour attracted investors, for four marks (PDF p14). Some app alternatives can be eliminated through general common sense rather than the historical/geographical knowledge being assessed.

**ICT — high priority.** 91.0% of practice items are MCQs; 1,224 of 1,638 are L2. Some Hard items merely ask pupils to retrieve text from a panel. An L4 projected item asks what is needed for Internet banking, with an Internet connection versus a printer/scanner/projector. The real 2025 spreadsheet question mixes retrieval with writing a SUM formula from a displayed range (PDF p18). The bank needs that progression, not uniformly difficult material or uniformly labelled screenshots.

**Biology — substantial calibration issue.** 87.4% MCQ. A Hard item asks the function of the oviduct; this is relevant curriculum knowledge but direct recall. Scientific inquiry and evaluation are valid outcomes, yet some higher-level items have implausible distractors. Real 2025 PDF p13 combines describing a data trend, calculating an average with working, and naming preventive measures. Keep recall but connect it to data and explanation.

**Chemistry — substantial calibration and quality issue.** 86.8% MCQ. L4 includes choosing the largest of three temperature increases and selecting the sensible approach to conflicting websites. Some tasks require genuine chemical knowledge, but other higher labels reflect a scenario rather than greater reasoning. The real 2025 PDF p6 requires pupils to write formulae and match salts to uses. Two additional content defects deserve review before expansion: an incorrect insolubility premise and equivalent correct options in one MCQ (see evidence).

**Physics — substantial calibration issue.** 80.9% MCQ. L4 includes choosing the heading “Current / A” and deciding not to recite every reading in a two-minute presentation. These are useful conventions, not strong challenge tasks. The real 2025 PDF p13 asks for an explanation of circuit behaviour and a charge calculation with working. Its calculations can themselves be straightforward; the answer format and scientific justification still matter.

**Maths — better format range, but unreliable higher labels.** Only 16.1% MCQ; numerical, algebraic and structured representations are present. Some questions combine skills appropriately. However, L4 includes reading a labelled jug scale and routine fraction arithmetic. This can make even chosen Challenge practice feel elementary. Do not infer that all 363 L4 items are weak: 356 are projected from parent tasks, which identifies a review population, not a failure count.

## Why this happens

1. **Task-level difficulty is copied onto every projected part.** engine/assessment.js assigns `difficulty: task.difficulty` when creating practice items. An easy opening part therefore becomes L4 if the whole task was labelled L4. Of Maths's 363 L4 practice items, 356 are projections; of ICT's eight, five are projections. Whole-task labels also need review: bundling three routine fraction operations into six marks does not automatically create challenge-level reasoning.
2. **Recognition substitutes for production.** A question saying “Explain…” but offering the explanation as an answer choice assesses selection. It does not establish that a pupil can compose, justify or organise that response.
3. **Distractors can reveal the answer.** Alternatives such as choosing the prettiest website, or claims that cyclones only form above small islands, reduce the knowledge required. Long wording does not repair that weakness.
4. **Mixed practice reflects the chapter's pool composition.** getMixedQuestions combines all permitted levels then shuffles; it does not balance cognitive demand. Subsection practice similarly samples its available pool. A chapter dominated by routine questions will feel routine. Overall subject percentages are not the exact probability for a particular chapter.
5. **The old cross-level fallback is not the current explanation.** getQuestionsForChapter presently filters by the requested difficulty and does not silently fill Hard with Basic static items. The more immediate problems are labels and content. The printable NCE assembler is a separate path; this audit does not claim every generated paper has the same mix as ordinary practice.

## Counterevidence: retain appropriate basics

The real 2025 Mathematics paper opens with subtraction, decimal addition and a same-denominator fraction subtraction (PDF p2). Later it asks for the volume of a partially filled rectangular tank (p18). The correct target is a progression across demand, not removing all lower-grade prerequisites. The ICT paper likewise includes straightforward cell lookup alongside formula construction on the same page.

## Recommended order of repair

1. Recalibrate the concrete flagged items and inspect their neighbouring batches. Correct ambiguous/incorrect content before adding more volume. Preserve IDs and progress.
2. Add an explicit, validated per-part difficulty mechanism for task projections, with fallback only where deliberately reviewed. Separately review parent task difficulty and mark allocations.
3. Provide productive English/French/SMS tasks with rubrics and honest marking modes. Guided/manual marking can assess responses that objective marking cannot; do not claim that a writing-advice MCQ covers essay performance.
4. Strengthen science/ICT application using actual data, diagrams, formula construction, error diagnosis and justified decisions. Improve distractors based on plausible misconceptions.
5. Define a subject-specific level rubric using easy, middle and demanding anchors from real papers. Level should reflect required thinking, not topic name, word count, total marks or the presence of a story.
6. Re-audit by chapter and outcome, then validate real pupil sessions against the deployed data. Use pupil performance later to distinguish editorial demand from actual difficulty. Do not claim “NCE-ready” solely because a subsection has 20 questions.

Do not globally raise every difficulty label, delete all easy questions, or generate another quota batch before addressing these causes.

## Reusable artifacts

- practice-census.json: actual practice counts, format mix, levels and projection counts.
- census.json: raw loaded-record counts (includes parent tasks; do not use as pupil question totals).
- sample.json: 93 systematically selected practice items, including complete stored prompts/options.
- reviewed-items.json and evidence.md: 23 traceable findings/counterexamples and suggested actions.
- corpus-snapshot.json: frozen local loaded records, including answers, for reproducing this audit.
- collect.cjs, practice.cjs, evidence.cjs: read-only collection and report-support scripts; run from the repository root. Collection uses existing factories, whose option order can vary between runs.
- tmp/nce-difficulty-audit/: text extracts and the nine rendered benchmark pages. These are scratch reference assets, not production assets.

### Personally inspected benchmark pages

| Local paper under past-papers/nce/ | PDF pages | Benchmark |
|---|---|---|
| mathematics/NCE-2025-Mathematics.pdf | 2, 18 | Accessible arithmetic versus compound volume application |
| english/NCE-2025-English (1).pdf | 15 | Independent essay writing |
| french/NCE-2025-French.pdf | 11 | Guided invitation writing |
| ict/NCE-2025-Information-Communication-Technology.pdf | 18 | Retrieval and spreadsheet formula construction |
| science-biology/NCE-2025-Biology.pdf | 13 | Trend explanation, mean, short factual responses |
| science-chemistry/NCE-2025-Chemistry.pdf | 6 | Formula production and matching |
| science-physics/NCE-2025-Physics.pdf | 13 | Circuit explanation and charge calculation |
| social and modern studies/NCE-2025-Social-Modern-Studies.pdf | 14 | Short factual parts and developed causal explanation |
