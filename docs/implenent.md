# Claude Code prompt: build NCE Grade 9 subjects and exam papers

You are working in `D:\git-repo\psac-practice`.

Implement a production-quality Grade 9 NCE question bank and exam-generation
system using the local NCE sample papers and the Mauritius Grades 7–9 curriculum
as the primary references. Do not merely write an analysis or proposal: inspect
the repository, analyse every relevant source PDF, implement the necessary
question formats and engine changes, create original Grade 9 questions and
visuals, rebuild the generated data, test the result, and maintain a detailed
progress record. Continue through substantial batches without asking for
confirmation unless a genuinely consequential product decision cannot be
resolved from the source papers.

## Non-negotiable repository rules

1. Read `CLAUDE.md` completely before making changes. Read the architecture and
   content documentation it routes you to.
2. The worktree contains valuable unfinished work. Preserve all unrelated
   changes. Never reset, clean, revert or overwrite them.
3. Use the established subject registry, lazy-loading and build pipeline. Do not
   paste a huge question bank into `index.html` or a central engine file.
4. Do not deploy, import into production, execute migrations remotely, purchase
   anything or change secrets.
5. Do not mark a Grade 9 subject as available until it has a coherent syllabus,
   a sufficiently varied validated bank and a working exam matching that
   subject’s NCE structure.
6. Preserve all existing Grades 4–6 behaviour and content. Add regression tests
   before changing shared question, practice, exam or printable-paper logic.

## Authoritative local sources

Curriculum:

- `past-papers/syllabus/NCF 7 to 9_230524.pdf` — 330 pages. Extract the Grade 9
  outcomes and content for each target subject; do not rely only on the short
  descriptions already present in the placeholder manifests.

NCE samples under `past-papers/nce/`:

- `english/` — 5 PDFs
- `french/` — 5 PDFs
- `ict/` — 5 PDFs
- `mathematics/` — 5 PDFs
- `science-biology/` — 5 PDFs
- `science-chemistry/` — 5 PDFs
- `science-physics/` — 4 PDFs
- `social and modern studies/` — 5 PDFs

There are 39 NCE PDFs in total. Some filenames combine 2021 and 2022, so inspect
the actual pages and paper headings rather than trusting filenames. Treat the
PDF page layout as evidence: ordinary text extraction will miss or corrupt
diagrams, tables, maps, mathematical notation, answer lines and visual
relationships.

## Mandatory PDF-analysis method

For every source paper:

1. Record filename, examination year(s), subject, paper/component, duration,
   total marks, number of pages, sections and instructions.
2. Extract text with `pdfplumber` or `pypdf` for searching and indexing.
3. Render every page with Poppler (`pdftoppm`) and visually inspect it. Do not
   claim a paper was analysed from extracted text alone.
4. Record every question’s topic, marks, format, cognitive demand and stimulus
   type. Capture whether it uses a passage, picture, map, table, graph, circuit,
   ray diagram, biological drawing, chemical apparatus, formula, source extract
   or linked multi-part stimulus.
5. Record the section order, progression in difficulty, approximate space given
   for answers, and how frequently visual or extended-response items occur.
6. Inspect front matter, continuation pages and any answer/mark material; do not
   assume every page is a question page.
7. Maintain page-level traceability in the analysis documents, but do not copy
   long passages or reproduce whole copyrighted papers in the repository.

Create and maintain:

- `docs/nce-grade9/source-inventory.md`
- `docs/nce-grade9/syllabus-map.md`
- `docs/nce-grade9/exam-blueprints.md`
- `docs/nce-grade9/question-format-gap-analysis.md`
- `docs/nce-grade9/progress.md`
- `docs/nce-grade9/visual-assets.md`

The blueprint must be empirical. For each subject and available year, include a
table of sections, marks, question types, assessed topics and visual/stimulus
frequency. Then derive a stable subject blueprint from the repeated patterns;
do not imitate an accidental feature of one year.

## Resolve the current Grade 9 subject architecture

The current Grade 9 packs are placeholders. In particular:

- `grade9-english`, `grade9-french`, `grade9-maths` and
  `grade9-social-modern-studies` have chapter outlines but no real bank.
- `grade9-science` combines science, while the supplied NCE samples are separate
  Biology, Chemistry and Physics examinations.
- ICT sample papers exist, but there is no complete Grade 9 ICT subject pack.

Audit all registry, UI, loading, parent-control, teacher, search, analytics,
game and exam assumptions before changing this. Unless the actual papers prove
otherwise, implement the NCE-facing subjects as:

- Grade 9 English
- Grade 9 French
- Grade 9 Mathematics
- Grade 9 Biology
- Grade 9 Chemistry
- Grade 9 Physics
- Grade 9 Information and Communication Technology
- Grade 9 Social & Modern Studies

Choose stable IDs consistent with repository conventions. If retaining a
“Science” umbrella improves navigation, it may group the three sciences in the
UI, but generated exams, question banks, analytics and teacher assignment
filters must preserve the separate NCE subjects. Document the compatibility
decision and test that it does not affect Grades 4–6.

## Question and assessment model

First audit what the application truly supports. It currently has factories
and paths centred on MCQ, numeric, typed text, true/false, matching converted to
MCQ, symmetry and specialised French cloze work. The ordinary exam builder is
largely a flat 15/25/40-question weighted selection. Do not distort NCE tasks to
fit those limitations.

Where the samples require it, introduce a backward-compatible assessment model
that can represent at least:

- A shared stimulus rendered once with several linked subquestions.
- Named sections with their own instructions, mark totals and ordering rules.
- Multi-part questions such as (a), (b)(i) and (b)(ii).
- Single-choice and multiple-select responses.
- Short typed answers, numeric answers with units and accepted equivalent forms.
- Structured and extended responses that need a model answer or marking rubric
  rather than automatic right/wrong marking.
- Matching, ordering and table-completion tasks where present in the samples.
- Mathematical expressions, fractions, powers, inequalities and working space.
- Label-a-diagram, identify-a-feature and select-on-image interactions where an
  objective answer can be marked reliably.
- Graph, construction, drawing and explanation tasks that are printable or
  self-marked with a mark scheme when reliable automatic marking is impossible.
- Marks per part, dependencies between parts and partial-credit rubrics.
- Original SVG diagrams, graphs, tables, maps, circuits, apparatus, biological
  drawings and geometric figures.

Separate the underlying assessment schema from its renderers. Update every
affected consumer deliberately: student practice, online exam, answer capture,
review screen, analytics, teacher assignment/results, admin question manager,
search, downloadable paper and answer/mark-scheme generation. A new format must
never silently fall through to a numeric input or disappear from a paper.

Keep legacy question objects working. Provide schema validation and explicit
handling for unsupported types. If a format cannot be marked automatically,
label it honestly and include it in printable exam mode with a rubric rather
than replacing it with an easier MCQ.

## Visual questions and assets

Pictures and diagrams are part of the assessment, not decoration.

1. Use the papers to understand the visual skill being tested, then create
   original, clean assets at approximately the same complexity. Do not crop and
   redistribute entire questions or pages from the sample papers.
2. Prefer repository-owned SVG for diagrams that require crisp labels or
   interaction. Use accessible alternative text and stable local paths.
3. Every visual question must still make sense at mobile size and in a printed
   PDF. Labels, arrowheads, axes, scales, circuit symbols and measurement marks
   must remain legible.
4. Record each asset’s author/source/licence or mark it as original in
   `visual-assets.md`. Do not hotlink unstable images.
5. Do not create a text-only substitute for a syllabus outcome that explicitly
   tests reading a diagram, graph, map, apparatus or image.
6. Render and inspect all generated visual questions. Programmatic existence
   checks are not visual QA.

## Creating original questions

Use sample papers to match level, structure, vocabulary, mark allocation and
cognitive demand. Use the curriculum to define scope. Create original questions
and stimuli; do not make superficial number/name substitutions to copied items.

Each question must have:

- A stable unique ID, correct subject/chapter/subsection and Grade 9 difficulty.
- The exact marks and response format.
- A correct answer where objective marking is possible.
- Accepted equivalent answers, units and tolerances where appropriate.
- A meaningful hint for practice mode.
- A worked explanation or marking rubric.
- A source note identifying the curriculum outcome and the sample-paper pattern
  that informed the item, without reproducing copyrighted source text.

Distractors must be plausible misconceptions and distinct from each other. Do
not pad the bank with near-duplicates, ambiguous alternatives, repeated answers,
trivial vocabulary changes or questions below Grade 9 level. Science and Social
Studies facts must be accurate; mathematical values and diagrams must be
recomputed independently.

Coverage target before enabling a subject:

- Every declared assessable subsection has at least 20 valid original items.
- High-weight outcomes have a deeper pool proportionate to their paper weight.
- The pool can generate at least five blueprint-compliant full papers without
  repeating the same memorable passage, dataset or visual stimulus.
- The distribution of objective, short-answer, structured, extended and visual
  questions is close to the multi-year sample-paper distribution.

Do not treat reaching a numeric floor as proof of quality.

## NCE-like exam generation

Do not reuse the PSAC flat paper shape for Grade 9 unless a sample paper truly
has that shape. Implement subject-specific, data-driven NCE blueprints. A full
generated paper should approximately reproduce:

- Cover information, duration, total marks and candidate instructions.
- Subject-specific section names and order.
- Number of questions and marks per section.
- Progression and mix of cognitive demand.
- Multi-part numbering and linked stimuli.
- Approximate proportion of diagrams, tables, graphs, passages and sources.
- Sensible answer space for the expected response.
- Page headers, footers, page numbering and marks columns where appropriate.

Generate a separate answer sheet or marking scheme with every downloadable
paper. It must preserve question numbering, marks, accepted answers, workings
and partial-credit points. For writing and extended responses, provide a rubric
and indicative content rather than pretending that one sentence is the only
correct answer.

Support deterministic seeds for testing and fresh seeds for users. Add recent
paper history so repeated downloads avoid the same opening stimulus and minimise
repeated question IDs. Never sacrifice blueprint compliance merely to avoid a
repeat; report an insufficient pool honestly.

## Recommended implementation order

Work vertically, one subject at a time, so each completed subject can generate a
real paper:

1. Shared assessment schema, renderer and PDF/mark-scheme foundations.
2. Mathematics, because it exercises notation, diagrams, working and multi-part
   numerical answers.
3. English and French, because they exercise shared passages, writing rubrics
   and language-specific marking.
4. Biology, Chemistry and Physics as separate subjects, including their
   discipline-specific diagrams and structured responses.
5. Social & Modern Studies, including source, map, graph and data interpretation.
6. ICT, including screenshots/interface diagrams, logic, tables and structured
   responses where supported by the samples.

Keep `comingSoon: true` for unfinished packs. A partly built pack may be tested
directly, but must not appear as officially available to children.

## Testing and evidence required

Add automated tests for:

- Schema validation for every old and new question type.
- Unique IDs and normalised prompts within each subject.
- No duplicate MCQ choices and exactly one valid keyed choice unless explicitly
  multiple-select.
- Numeric tolerances, units and equivalent mathematical answers.
- Marks per part summing exactly to question, section and paper totals.
- Every declared subsection having questions and no undeclared subsection tags.
- Every referenced local asset existing and having useful alternative text.
- Every new format rendering in practice, online exam, review, teacher/admin
  views and printable output, or being explicitly excluded with a tested reason.
- Seeded papers matching their subject blueprint.
- Ten generated papers per subject: report repeated-question rate, repeated
  stimulus rate, opening-question diversity and section/mark compliance.
- No Grade 9 paper containing Grade 4–6 questions or another NCE subject’s bank.
- No regression in the existing Grades 4–6 bundles and printable papers.
- Refresh/session behaviour during an unfinished online exam.

For downloadable papers and marking schemes, render every page to PNG and
visually inspect representative mobile and print outputs. Reject clipped text,
broken SVG, unreadable notation, orphaned subquestions, missing labels, excessive
blank space, repeated passages or answer lines split from their question.

After each substantial batch run the repository’s required checks, including at
minimum:

```powershell
node --check <every changed/new JavaScript file>
node netlify/build-questions.js
node scripts/check.js
git diff --check
```

Also run all new subject/schema/PDF tests and relevant existing exam, question
loader, teacher and admin tests.

## Progress reporting

Update `docs/nce-grade9/progress.md` after every batch with:

- Sources fully inspected, including page coverage.
- Syllabus outcomes mapped and any ambiguity.
- Engine/schema changes completed.
- Questions added by subject/chapter/subsection/type and before/after counts.
- Visual assets created and visually checked.
- Generated-paper conformance results.
- Tests run and exact outcomes.
- Remaining work and any genuinely blocked items.

Do not write “analysed” when only text extraction was run, “complete” when a
paper cannot yet be generated, or “NCE-aligned” without a traceable multi-year
blueprint. Finish with a concise implementation summary and exact local steps
needed to preview the new Grade 9 subjects. Do not deploy.
