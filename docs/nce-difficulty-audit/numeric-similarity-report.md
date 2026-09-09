# Number-only similarity audit — Grade 9

9 September 2026; local source banks, not the live database.

**131 practice questions belong to 54 strict number-variation groups.** Counting only variants beyond one question per group gives **77 additional versions**. A further 17 diagram/table questions in 8 groups and 2 context-dependent questions are candidates requiring contextual review; they are excluded from the headline.

| Subject | Practice items | Questions in strict groups | Groups | Variants beyond one per group |
|---|---:|---:|---:|---:|
| biology | 783 | 5 | 2 | 3 |
| chemistry | 836 | 0 | 0 | 0 |
| english | 612 | 0 | 0 | 0 |
| french | 1025 | 0 | 0 | 0 |
| ict | 1638 | 2 | 1 | 1 |
| maths | 1006 | 122 | 50 | 72 |
| physics | 883 | 2 | 1 | 1 |
| social-modern-studies | 365 | 0 | 0 | 0 |

Method: execute all Grade 9 packs through the real sandbox, fail on loader errors, exclude parent tasks/cloze/errorhunt, group within chapter and response type by identical question markup after whitespace normalisation and replacement of digit sequences. MCQ option templates must also match (ignoring option order and numerical changes). Require at least two distinct original prompts. Exact repeated prompts are not counted as numerical variants. Diagram/table questions are separate because geometry or displayed data may change the reasoning. Hence-type projected prompts are separate because their earlier expression may differ.

This is a conservative literal-template scan, not an exhaustive semantic duplication audit. It misses changed names, paraphrases, number words, different formatting and equivalent questions in different chapters. A zero means no strict matches, not no repetition. Numerical variation can also legitimately introduce a new mathematical case; these counts identify review candidates, not questions that must all be deleted. Preserve useful fluency practice while reducing repetitive experiences in mixed and challenge sessions.

## Examples

- **7 questions:** g9m-crd-002-a — Find the gradient of the line joining (1, 2) and (4, 11). / g9m-crd-004-a — Find the gradient of the line joining (2, 5) and (6, 13).
- **5 questions:** g9m-vec-004-a — Find the  magnitude  of the vector  (  3 4  ) . / g9m-vec-005-a — Find the  magnitude  of the vector  (  6 8  ) .
- **4 questions:** g9m-exp-007-a — Factorise  x  2  &minus; 9. / g9m-exp-008-a — Factorise  x  2  &minus; 25.
- **3 questions:** g9s-b1-v062 — A pupil counts  18  pulse beats in  15 seconds . Calculate the pulse rate in beats per minute. / g9s-b1-v063 — A pupil counts  20  pulse beats in  15 seconds . Calculate the pulse rate in beats per minute.
- **3 questions:** g9m-ind-021-a — Write 3 &minus;2  as a fraction. / g9m-ind-024-a — Write 4 &minus;1  as a fraction.

Full IDs, prompts and options: numeric-similarity-groups.json. Summary: numeric-similarity-summary.json. Re-run from the repository root with node docs/nce-difficulty-audit/count-numeric-similarity.cjs. No question content was changed.
