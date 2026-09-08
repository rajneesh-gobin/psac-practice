# NCE Grade 9 — source inventory

Every local source used to build the Grade 9 banks and exam blueprints, with the
**exact** level of inspection each has actually received. This file is the
answer to "has anyone really looked at this paper?", so the status column is
kept literal.

## Status vocabulary — read this before trusting a row

| Status | What it means |
|---|---|
| `visual-full` | Every page rendered to PNG and looked at. Diagrams, tables, answer lines and mark allocations read off the page. |
| `visual-partial` | Some pages rendered and looked at; the page numbers are listed. The rest is **unexamined**. |
| `text-only` | `pdftotext -layout` extraction exists and has been searched. **No page has been looked at.** This is NOT analysis — see the corruption note below. |
| `not-started` | Nothing has been done beyond counting its pages. |

⚠ **`text-only` is not evidence about anything visual.** Measured on
`mathematics/NCE-2025-Mathematics.pdf` p.2: the paper's `849 − 523` extracts as
`849 / 523` (minus sign lost), `2.1 + 0.5` as `2.1 0.5` (plus sign lost),
`∛8` as `38`, and `9/17 − 3/17` as `93 / 17 17`. Every operator and every root
was destroyed. A blueprint or a question written from extracted text alone would
be wrong in ways that look plausible. Extraction is used **only** for indexing
and searching; every structural claim in `exam-blueprints.md` is sourced to a
page that was rendered and read.

## Tooling

Poppler 25.07.0, installed locally with `winget install oschwartz10612.Poppler`
(user scope). It is a **development tool only** — nothing in `engine/`,
`netlify/` or the deployed site depends on it, and it is not in `package.json`.

Render a paper for inspection with:

```bash
scripts/nce-render.sh <pdf> <outdir> [firstPage] [lastPage] [dpi]
```

100 dpi is enough to read body text and diagram labels on A4.

## Curriculum

| File | Pages | Status |
|---|---|---|
| `past-papers/syllabus/NCF 7 to 9_230524.pdf` | 330 | `not-started` |

⚠ **An earlier version of this file said 203 pages. That was wrong, and the
brief was right: it is 330.** The 203 came from a hand-rolled counter that takes
the largest `/Count` on a `/Type /Pages` node — which is the whole document only
when the page tree is flat. This PDF nests its tree, so the counter read a
sub-tree. `pdfinfo` reports 330 and `pdftotext` yields 330 pages.

⚠ **The same counter also under-counted four English papers and one French
paper**, reporting 9–10 pages for papers that are 24 — it agreed with `pdfinfo`
on the 34 flat-tree files and disagreed on the nested ones, which is exactly the
kind of error that looks like data. Every count in this file has been
re-measured with `pdfinfo`. **Do not use that script. Use `pdfinfo`.**

## NCE sample papers — 39 files

Page counts are from **`pdfinfo`**, not from the paper's own "printed on N
pages" statement (those differ: a paper's cover and any blank continuation
pages are not counted by the examiner's wording).

All 39 counts below were re-verified against `pdfinfo` in a single pass, with
**0 mismatches**. Re-run that check after adding any paper.

### Mathematics — paper code N510

| File | Pages | Status | Pages inspected |
|---|---|---|---|
| `NCE-2025-Mathematics.pdf` | 24 | `visual-full` | 1–24 |
| `2024-Mathematics.pdf` | 20 | `visual-partial` | 1–10, 12, 14, 16, 18, 20 |
| `2023-Mathematics.pdf` | 24 | `visual-partial` | 1 |
| `2022-Mathematics 2021 2022.pdf` | 28 | `visual-partial` | 1 |
| `2021-Mathematics.pdf` | 24 | `visual-partial` | 1 |

### English

| File | Pages | Status |
|---|---|---|
| `NCE-2025-English (1).pdf` | 24 | `text-only` |
| `2024-English.pdf` | 24 | `text-only` |
| `2023-English.pdf` | 24 | `text-only` |
| `2022-English 2021 2022.pdf` | 24 | `text-only` |
| `2021-English.pdf` | 20 | `text-only` |

### French

| File | Pages | Status |
|---|---|---|
| `NCE-2025-French.pdf` | 24 | `text-only` |
| `2024-French.pdf` | 24 | `text-only` |
| `2023-French.pdf` | 24 | `text-only` |
| `2022-French 2021 2022.pdf` | 24 | `text-only` |
| `2021-French.pdf` | 24 | `text-only` |

### Biology

| File | Pages | Status |
|---|---|---|
| `NCE-2025-Biology.pdf` | 16 | `text-only` |
| `2024-Biology.pdf` | 12 | `text-only` |
| `2023-Science Biology.pdf` | 16 | `text-only` |
| `2022-Science Biology 2021 2022.pdf` | 16 | `text-only` |
| `2021-Science Biology.pdf` | 12 | `text-only` |

### Chemistry

| File | Pages | Status |
|---|---|---|
| `NCE-2025-Chemistry.pdf` | 16 | `text-only` |
| `2024-Chemistry.pdf` | 12 | `text-only` |
| `2023-Science Chemistry.pdf` | 12 | `text-only` |
| `2022-Science Chemistry 2021 2022.pdf` | 12 | `text-only` |
| `2021-Science Chemistry.pdf` | 16 | `text-only` |

### Physics — only four years supplied (no 2024)

| File | Pages | Status |
|---|---|---|
| `NCE-2025-Physics.pdf` | 16 | `text-only` |
| `2023-Science Physics.pdf` | 16 | `text-only` |
| `2022-Science Physics 2021 2022.pdf` | 16 | `text-only` |
| `2021-Science Physics.pdf` | 20 | `text-only` |

### Social & Modern Studies

| File | Pages | Status |
|---|---|---|
| `NCE-2025-Social-Modern-Studies.pdf` | 20 | `text-only` |
| `NCE-2024-Social-Modern-Studies.pdf` | 16 | `text-only` |
| `NCE-2023-Social-Modern-Studies.pdf` | 20 | `text-only` |
| `NCE-Social-and-Modern-Studies-2021-2022.pdf` | 20 | `text-only` |
| `Social-and-Modern-Studies.pdf` | 16 | `text-only` |

### Information and Communication Technology

| File | Pages | Status |
|---|---|---|
| `NCE-2025-Information-Communication-Technology.pdf` | 28 | `text-only` |
| `NCE-2024-Information-Communication-Technology (1).pdf` | 28 | `text-only` |
| `NCE-2023-Information-and-Communications-Technology.pdf` | 24 | `text-only` |
| `NCE-Information-Communications-Tech-2021-2022.pdf` | 24 | `text-only` |
| `Information-and-Communications-Technology.pdf` | 20 | `text-only` |

⚠ **Two files carry no year in the filename** (`Social-and-Modern-Studies.pdf`,
`Information-and-Communications-Technology.pdf`) and four combine 2021 and 2022.
The year on the **cover page** is authoritative, not the filename — verified for
Mathematics, where `2022-Mathematics 2021 2022.pdf` has a cover reading
"2021-2022" and `2021-Mathematics.pdf` reads "March / April 2021". The other
subjects' covers have not been read yet, so their years above are the
filename's claim and are **not confirmed**.

## Copyright

These papers are © Mauritius Examinations Syndicate. Nothing in this repository
reproduces a passage, a whole question or a page image from them. The analysis
documents record structure, marks, topics and format only, with page-level
references so a reader can go back to the source.
