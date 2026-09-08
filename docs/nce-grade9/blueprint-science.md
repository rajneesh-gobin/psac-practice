# NCE Grade 9 — Science: empirical exam blueprint

**Three separate papers, three separate blueprints.** Biology (N530), Chemistry (N530)
and Physics (N530) are sat as independent 45-minute / 50-mark papers. This document
treats them as three blueprints and then reports what they share.

Everything below was **read off the paper**, page by page, from rendered images. No
figure here is inferred from text extraction, and none is carried forward from an
earlier document.

---

## 0. Sources, page counts and inspection record

`pdfinfo` page counts are exact. "Pages inspected" is the number of rendered page
images actually opened and read.

| Paper | File | PDF pages | Pages visually inspected | Not inspected |
|---|---|---|---|---|
| Biology 2025 | `NCE-2025-Biology.pdf` | **16** | 14 (p1–14) | p15–16, trailing blanks |
| Biology 2024 | `2024-Biology.pdf` | **12** | 11 (p1–11) | p12, trailing blank |
| Biology 2023 | `2023-Science Biology.pdf` | **16** | 15 (p1–15) | p16, trailing blank |
| Biology 2022 | `2022-Science Biology 2021 2022.pdf` | **16** | 13 (p1–13) | p14–16, trailing blanks |
| Biology 2021 | `2021-Science Biology.pdf` | **12** | 10 (p1–10) | p11–12, trailing blanks |
| Chemistry 2025 | `NCE-2025-Chemistry.pdf` | **16** | 14 (p1–14, incl. Periodic Table) | p15–16, trailing blanks |
| Chemistry 2024 | `2024-Chemistry.pdf` | **12** | 10 (p1–10) | p11 Periodic Table, p12 blank |
| Chemistry 2023 | `2023-Science Chemistry.pdf` | **12** | 11 (p1–11) | p12 Periodic Table |
| Chemistry 2022 | `2022-Science Chemistry 2021 2022.pdf` | **12** | 10 (p1–10) | p11 Periodic Table, p12 blank |
| Chemistry 2021 | `2021-Science Chemistry.pdf` | **16** | 13 (p1–13) | p14 Periodic Table, p15–16 blanks |
| Physics 2025 | `NCE-2025-Physics.pdf` | **16** | 13 (p1–13) | p14–16, trailing blanks |
| Physics 2024 | — | — | — | **absent, see below** |
| Physics 2023 | `2023-Science Physics.pdf` | **16** | 15 (p1–15) | p16, trailing blank |
| Physics 2022 | `2022-Science Physics 2021 2022.pdf` | **16** | 15 (p1–15) | p16, trailing blank |
| Physics 2021 | `2021-Science Physics.pdf` | **20** | 18 (p1–18, p18 confirmed blank) | p19–20, trailing blanks |

**Total: 14 PDFs, 192 pages, 182 page images read.** Every question and every
mark allocation in this document comes from one of those images. All un-inspected
pages are trailing blank/copyright leaves after `END OF PAPER`, or a Periodic Table
page whose content was verified once (Chemistry 2025 p14) and whose layout is
identical across years per the cover-page reference.

### Physics 2024 is genuinely absent

Not a download failure and not a naming problem. `past-papers/nce/_report.json`
records the source folder itself:

```json
{ "subject": "science-physics", "year": "2024", "status": "EMPTY FOLDER",
  "folderId": "1IbE2WPOxdb_m_G62QWyzprAgSTPmYc-A" }
```

A repo-wide `find -iname "*physic*"` returns only the four PDFs listed above. So the
Physics blueprint rests on **four** years (2021, 2022, 2023, 2025) against five for
Biology and Chemistry, and the Physics topic weights below are out of **200** marks,
not 250. Treat that asymmetry as real when deriving weights.

---

# BIOLOGY

## B.1 Per-year shape

| | 2021 | 2022 | 2023 | 2024 | 2025 |
|---|---|---|---|---|---|
| Duration | 45 min | 45 min | 45 min | 45 min | 45 min |
| Total marks | 50 | 50 | 50 | 50 | 50 |
| Named sections | none | none | none | none | none |
| Questions | 5 | 5 | 6 | 5 | 6 |
| Mark-bearing parts | 29 | 30 | 30 | 31 | 33 |
| Content pages (per cover) | 9 | 11 | 14 | 10 | 12 |
| Additional materials | **Ruler only** | Ruler, Calculator | Ruler, Calculator | Ruler, Calculator | Ruler, Calculator |
| Q1 | 10 MCQ = 10 | 10 MCQ = 10 | 10 MCQ = 10 | 10 MCQ = 10 | 10 MCQ = 10 |
| Q2 | 8 | 9 | 8 | 7 | 7 |
| Q3 | 9 | 9 | 10 | 10 | 7 |
| Q4 | 14 | 12 | 5 | 11 | 8 |
| Q5 | 9 | 10 | 10 | 12 | 7 |
| Q6 | — | — | 7 | — | 11 |

The 2021 paper is the only Biology paper with **no calculator**, and it still asks for
a mean (2021 Q5(a)(ii)) and a bar chart. 2022 and 2021 carry an extra
"Quality Controller" row in the examiner grid; 2023–2025 do not.

## B.2 Mark distribution (all five years, 153 mark-bearing parts)

| Part value | 2021 | 2022 | 2023 | 2024 | 2025 | Total parts | % of parts | Marks carried |
|---|---|---|---|---|---|---|---|---|
| 1 mark | 16 | 19 | 21 | 19 | 22 | **97** | **63.4 %** | 97 (38.8 %) |
| 2 marks | 7 | 6 | 3 | 9 | 7 | 32 | 20.9 % | 64 (25.6 %) |
| 3 marks | 5 | 1 | 3 | 0 | 2 | 11 | 7.2 % | 33 (13.2 %) |
| 4 marks | 0 | 4 | 1 | 2 | 2 | 9 | 5.9 % | 36 (14.4 %) |
| 5 marks | 1 | 0 | 2 | 1 | 0 | 4 | 2.6 % | 20 (8.0 %) |
| **6+ marks** | 0 | 0 | 0 | 0 | 0 | **0** | **0 %** | 0 |

No award in five years of Biology exceeds 5 marks, and every 4- and 5-mark award is a
**multi-item table, matching set, labelling set or graph** — never continuous prose.
There is no essay or extended-response question anywhere in the Biology corpus.

## B.3 Format census, with witnesses

| Format | Witness(es) |
|---|---|
| MCQ, text stem + text options | Biology 2025 Q1(a); Biology 2021 Q1(4) |
| MCQ with a diagram in the stem | Biology 2025 Q1(c); Biology 2023 Q1(5) |
| MCQ whose **options are photographs** | Biology 2023 Q1(1), Q1(9), Q1(10); Biology 2022 Q1(3), Q1(4), Q1(5) |
| MCQ whose options are line diagrams | Biology 2022 Q1(9), Q1(10) |
| MCQ whose option set is a **two-column table** | Biology 2024 Q1(9) |
| Matching, Column A → Column B | Biology 2025 Q2(a); Biology 2021 Q3(d) |
| Matching where one column is diagrams | Biology 2023 Q2(b) |
| Label a supplied diagram **from a word bank** | Biology 2023 Q3(b); Biology 2022 Q3(a); Biology 2024 Q2(a) |
| Label a supplied diagram **with no word bank** | Biology 2025 Q2(b); Biology 2021 Q2(a) |
| Fill blanks in prose using a supplied diagram | Biology 2023 Q3(a) |
| Mark a position **on** a supplied figure | Biology 2025 Q4(a)(iii) — indicate the organ's location with an X |
| Complete a table | Biology 2024 Q3(a)(ii); Biology 2022 Q3(c); Biology 2021 Q4(d)(i) |
| Tick-box single choice (non-MCQ) | Biology 2023 Q2(c)(ii) |
| Define / state | Biology 2024 Q3(a)(i); Biology 2023 Q5(c) |
| Short answer, name / give one / give two | Biology 2025 Q3(b)(i); Biology 2024 Q4(d) |
| Explain / give a reason | Biology 2023 Q4(c); Biology 2022 Q3(b) |
| Suggest / predict | Biology 2025 Q5(a); Biology 2025 Q6(d) |
| Order the steps of a procedure | Biology 2025 Q5(c) |
| Complete a word equation into boxes | Biology 2024 Q5(c)(i) — 5 marks, the largest single Biology award measured |
| Calculation, working shown, unit demanded | Biology 2025 Q6(c) |
| **Magnification calculation requiring the candidate to measure the printed figure with a ruler** | Biology 2024 Q4(e)(ii); Biology 2023 Q5(a) |
| Plot a graph on a **bare grid** (candidate chooses axes and scale) | Biology 2025 Q6(a) [4]; Biology 2023 Q6(a) [4] |
| Construct a **bar chart** on a bare grid | Biology 2021 Q5(b) [3] |
| Show a reading-off construction on your own graph | Biology 2023 Q6(b)1 |
| Read values from a supplied graph | Biology 2022 Q5(b)(i) |
| Describe a trend from a supplied graph | Biology 2023 Q5(d)(ii); Biology 2022 Q5(b)(ii) |
| Describe a trend from a supplied table | Biology 2025 Q6(b) |
| **Draw a biological diagram from a photomicrograph** | Biology 2022 Q4(d) [2] |
| Experimental design: name a controlled variable | Biology 2024 Q5(b)(i) |
| Draw conclusions from a results table | Biology 2024 Q5(b)(ii); Biology 2025 Q5(d) |
| Suggest an improvement to a set-up | Biology 2024 Q5(b)(iii) |

## B.4 Visual frequency — **the headline number**

A question counts as visual if it carries a diagram, photograph, graph or data table.

| Year | Questions carrying a visual | % |
|---|---|---|
| 2021 | 4 of 5 | 80 % |
| 2022 | 5 of 5 | 100 % |
| 2023 | 6 of 6 | 100 % |
| 2024 | 5 of 5 | 100 % |
| 2025 | 5 of 6 | 83 % |
| **All years** | **25 of 27** | **92.6 %** |

Within Q1 (the MCQ block) specifically, **20 of 50 items across five years carry a
figure, photograph or table — 40 %.**

Only two Biology questions in five years have no visual element at all: 2025 Q3
(biodiversity, all prose) and 2021 Q3 (reproduction, prose + a text matching grid).

## B.5 Topic weighting (marks per topic, 250 marks over five years)

| Topic | 2021 | 2022 | 2023 | 2024 | 2025 | Total | % |
|---|---|---|---|---|---|---|---|
| Blood, heart & circulation (incl. cardiovascular disease) | 15 | 11 | 21 | 13 | 11 | **71** | **28.4 %** |
| Photosynthesis, leaf structure & plant nutrition | 9 | 11 | 9 | 15 | 16 | **60** | **24.0 %** |
| Biodiversity, ecosystems & human impact | 13 | 13 | 7 | 11 | 8 | **52** | **20.8 %** |
| Reproduction (sexual & asexual, human systems) | 11 | 10 | 12 | 9 | 3 | **45** | **18.0 %** |
| Disease, HIV/AIDS & STDs | 2 | 5 | 1 | 2 | 12 | **22** | **8.8 %** |

Year-to-year volatility is high: reproduction swings from 12 marks (2023) to 3 (2025);
HIV/STD from 1 (2023) to 12 (2025). **No single year is a safe sample.** The five
topics are, however, remarkably stable in aggregate — the top four all sit between
18 % and 29 %, so a Biology paper is close to an even split across four core areas
with a smaller disease strand.

## B.6 Calculation and equipment demand

- **Calculator listed 2022–2025; absent in 2021.** It is barely used: the only
  arithmetic in five years is a mean of six values (2025 Q6(c)), a mean of five
  (2021 Q5(a)(ii)) and two magnification divisions.
- **The ruler is load-bearing, not decorative.** Biology 2024 Q4(e)(ii) and 2023 Q5(a)
  give a magnification (×8000, ×15000) and require the candidate to measure the
  printed cell and divide. A question of this type cannot be reproduced on a screen
  without a known physical scale.
- **No formula sheet.** The only formula needed is
  `actual size = image size ÷ magnification`, and the word equation for
  photosynthesis is itself examined (2024 Q5(c)(i), 5 marks; 2021 Q2(b)).

---

# CHEMISTRY

## C.1 Per-year shape

| | 2021 | 2022 | 2023 | 2024 | 2025 |
|---|---|---|---|---|---|
| Duration | 45 min | 45 min | 45 min | 45 min | 45 min |
| Total marks | 50 | 50 | 50 | 50 | 50 |
| Named sections | **Q1 labelled "MULTIPLE CHOICE QUESTIONS"** | none | none | none | none |
| Questions | 5 | 5 | 5 | 5 | 5 |
| Mark-bearing parts | 43 | 32 | 34 | 32 | 35 |
| Content pages (per cover) | 12 | 9 | 10 | 9 | 12 |
| Additional materials | **none listed** | Ruler, Calculator | Ruler, Calculator | Ruler, Calculator | Ruler, Calculator |
| Periodic Table | p14 | p11 | p12 | p11 | p14 |
| Q1 | 10 | 10 | 10 | 10 | 10 |
| Q2 | 10 | 8 | 9 | 7 | 11 |
| Q3 | 7 | 11 | 9 | 10 | 10 |
| Q4 | 9 | 10 | 10 | 11 | 10 |
| Q5 | 14 | 11 | 12 | 12 | 9 |

**Chemistry is the only one of the three that never varies its question count: five
questions, every year.** 2021 is the only paper in the whole 14-paper corpus that names
a section type ("MULTIPLE CHOICE QUESTIONS"), and the only one with no
"Additional Materials" line at all.

## C.2 Mark distribution (all five years, 176 mark-bearing parts)

| Part value | 2021 | 2022 | 2023 | 2024 | 2025 | Total parts | % of parts | Marks carried |
|---|---|---|---|---|---|---|---|---|
| 1 mark | 38 | 23 | 25 | 21 | 25 | **132** | **75.0 %** | 132 (52.8 %) |
| 2 marks | 4 | 5 | 5 | 7 | 7 | 28 | 15.9 % | 56 (22.4 %) |
| 3 marks | 0 | 1 | 2 | 1 | 1 | 5 | 2.8 % | 15 (6.0 %) |
| 4 marks | 1 | 1 | 1 | 3 | 2 | 8 | 4.5 % | 32 (12.8 %) |
| 5 marks | 0 | 2 | 1 | 0 | 0 | 3 | 1.7 % | 15 (6.0 %) |
| **6+ marks** | 0 | 0 | 0 | 0 | 0 | **0** | **0 %** | 0 |

Chemistry is the most finely fragmented of the three papers: **three quarters of its
mark-bearing parts are worth exactly one mark**, and 2021 fragments furthest —
43 parts for 50 marks, i.e. an average award of 1.16 marks.

## C.3 Format census, with witnesses

| Format | Witness(es) |
|---|---|
| MCQ, text stem + text options | Chemistry 2025 Q1(a); Chemistry 2022 Q1(9) |
| MCQ with a diagram/photograph in the stem | Chemistry 2023 Q1(7); Chemistry 2025 Q1(j) |
| MCQ with a **photograph** in the stem | Chemistry 2025 Q1(g) — eutrophied lake |
| MCQ whose **options are apparatus drawings** | Chemistry 2024 Q1(1) — test tube / thermometer / funnel / measuring cylinder |
| MCQ whose options are molecular diagrams | Chemistry 2023 Q1(4); Chemistry 2022 Q1(4) |
| MCQ whose option set is a **table** | Chemistry 2025 Q1(d) — radical / formula / valency |
| Matching, symbol → name | Chemistry 2023 Q2(a) [5] |
| Matching, salt → use | Chemistry 2025 Q2(b) [4] |
| Matching, pollutant → source | Chemistry 2022 Q2(a) [4] |
| **Matching where one column is apparatus pictures** | Chemistry 2022 Q3(c) [3] |
| Label an apparatus diagram from a word bank | Chemistry 2024 Q2(b)(i) [4]; Chemistry 2022 Q3(a) [5]; Chemistry 2021 Q2(a)(i) [4] |
| **Draw an arrow onto a supplied apparatus diagram** | Chemistry 2022 Q3(b) — show where water enters the condenser |
| Complete a table | Chemistry 2025 Q4(a) [4]; Chemistry 2024 Q5(c) [4]; Chemistry 2024 Q3(a)(i) [4] |
| Classify into a two-column table | Chemistry 2022 Q4(a) [5] — symbol vs formula |
| **TRUE / FALSE** | Chemistry 2023 Q3(c)(i)–(iv) |
| Identify photographs against a word list | Chemistry 2023 Q3(a) [3] — drought / ice-caps / flash floods |
| Circle N items from a list | Chemistry 2023 Q3(b) [2] |
| Define | Chemistry 2025 Q2(c)(i) — neutralisation |
| Short answer, name / state | Chemistry 2025 Q3(c)(i); Chemistry 2021 Q4(b)(ii) |
| Explain / give a reason | Chemistry 2023 Q4(b)(i); Chemistry 2021 Q2(b)(iii) |
| Suggest | Chemistry 2025 Q3(b)(ii) — identify an unknown metal from observations |
| Deduce from an observation table | Chemistry 2025 Q3(b)(i); Chemistry 2024 Q5(b) |
| Complete a **word equation** | Chemistry 2025 Q3(d)(i); Chemistry 2023 Q2(b) [4]; Chemistry 2021 Q3(a) |
| Write a **balanced chemical equation** | Chemistry 2025 Q3(d)(ii) [2]; Chemistry 2023 Q5(d)(ii) [2] |
| **Balance a given equation** (insert coefficients) | Chemistry 2023 Q5(b) [3]; Chemistry 2022 Q4(d); Chemistry 2021 Q3(c) [2] |
| Write a formula from valencies | Chemistry 2025 Q2(a) [3]; Chemistry 2024 Q3(b); Chemistry 2021 Q3(b) |
| Interpret a **chromatogram** | Chemistry 2023 Q4(a); Chemistry 2021 Q2(b) |
| Read a supplied **graph** | Chemistry 2021 Q4(a)(i)–(ii) |
| Plot a graph on a **pre-axed, pre-scaled grid** | Chemistry 2024 Q4(b)(i) [2] |
| Describe a trend from your own graph | Chemistry 2024 Q4(b)(ii) [2] |
| Simple subtraction from a data table | Chemistry 2024 Q4(a) — the only arithmetic in the 2024 paper |
| **Spot the mistakes in an apparatus set-up** | Chemistry 2025 Q5(b)(iii) [2] — two errors in a distillation rig |
| Laboratory safety precaution | Chemistry 2025 Q3(b)(iii); Chemistry 2022 Q5(a)(ii); Chemistry 2021 Q5(c)(ii) |
| Explain why a procedural step is taken | Chemistry 2025 Q5(b)(iv) — boiling chips; Chemistry 2023 Q4(c)(iii) — cotton wool |

## C.4 Visual frequency

| Year | Questions carrying a visual | % |
|---|---|---|
| 2021 | 5 of 5 | 100 % |
| 2022 | 4 of 5 | 80 % |
| 2023 | 4 of 5 | 80 % |
| 2024 | 5 of 5 | 100 % |
| 2025 | 5 of 5 | 100 % |
| **All years** | **23 of 25** | **92.0 %** |

Within Q1: **19 of 50 MCQ items across five years carry a figure, photograph or
table — 38 %.** 2023 is the extreme, at 7 of 10.

Chemistry's visuals divide into three distinct families, and they are not
interchangeable:
1. **Apparatus rigs** (distillation, sublimation, Bunsen + tongs, test tube, boiling
   tube) — the single most common Chemistry figure. Present in every year.
2. **Molecular/atomic diagrams** (ball-and-stick with a key) — 2021, 2022, 2023, 2024.
3. **Photographs of real-world consequences** (algal bloom, polar bear, flash flood,
   drought, factory) — 2023 and 2025.

## C.5 Topic weighting (marks per topic, 250 marks over five years)

Buckets follow the chapter names already in `subjects/grade9-science/_manifest.js`.

| Topic | 2021 | 2022 | 2023 | 2024 | 2025 | Total | % |
|---|---|---|---|---|---|---|---|
| C3 · Language of Chemistry (symbols, formulae, valency, equations) | 10 | 15 | 17 | 13 | 9 | **64** | **25.6 %** |
| C1 · Atmosphere & environment (pollution, greenhouse, ozone, eutrophication) | 12 | 9 | 11 | 13 | 14 | **59** | **23.6 %** |
| C4 · Metals & the reactivity series | 15 | 10 | 8 | 9 | 10 | **52** | **20.8 %** |
| C2 · Mixtures & separation techniques | 13 | 12 | 9 | 8 | 9 | **51** | **20.4 %** |
| C5 · Salts (neutralisation, solubility, uses) | **0** | 4 | 5 | 7 | 8 | **24** | **9.6 %** |

⚠ **C5 Salts scored zero in 2021 and has risen every year since** (0 → 4 → 5 → 7 → 8).
That is the only clear directional trend in the whole corpus. The other four topics
are stable at roughly a fifth to a quarter of the paper each.

## C.6 Calculation and equipment demand — the key Chemistry finding

- **A Periodic Table is supplied in all five years** (cover-page instruction 8), and
  the copy inspected (2025 p14) carries **symbols, element names and group numbers
  only — no atomic numbers and no relative atomic masses.**
- **Consequence, verified across all five papers: there is not one mole calculation,
  not one relative-molecular-mass calculation and not one reacting-mass calculation
  in five years of NCE Chemistry.** The Periodic Table is used for spelling symbols
  (2023 Q2(a) explicitly says "You may use the Periodic Table on page 12") and for
  group/valency reasoning, nothing more.
- **Chemistry 2025 contains no arithmetic at all.** Chemistry 2024's only arithmetic
  is `450 − 230` (Q4(a)). A calculator is listed and is effectively unused.
- Valencies are given when needed (Chemistry 2021 Q3(b) supplies a full
  element/symbol/valency table) or expected as recall (Chemistry 2024 Q1(3),
  Q3(a)(i)).

---

# PHYSICS

## P.1 Per-year shape

Four years only — see §0 for why 2024 is missing.

| | 2021 | 2022 | 2023 | 2025 |
|---|---|---|---|---|
| Duration | 45 min | 45 min | 45 min | 45 min |
| Total marks | 50 | 50 | 50 | 50 |
| Named sections | none | none | none | none |
| Questions | 6 | 6 | 6 | 6 |
| Mark-bearing parts | 34 | 40 | 36 | 37 |
| Content pages (per cover) | 16 | 14 | 14 | 12 |
| Additional materials | **Mathematical set only** | Mathematical set, Calculator | Mathematical set, Calculator | Mathematical set, Calculator |
| Q1 | 10 | 10 | 10 | 10 |
| Q2 | 8 | 7 | 7 | 7 |
| Q3 | 7 | 8 | 8 | 5 |
| Q4 | 11 | 7 | 7 | 13 |
| Q5 | 10 | 9 | 12 | 7 |
| Q6 | 4 | 9 | 6 | 8 |

**Physics is always six questions.** It is also the only one of the three that asks for
a **mathematical set** rather than a ruler — and the protractor and set-square are
genuinely used, not nominal (see P.6).

## P.2 Mark distribution (four years, 147 mark-bearing parts)

| Part value | 2021 | 2022 | 2023 | 2025 | Total parts | % of parts | Marks carried |
|---|---|---|---|---|---|---|---|
| 1 mark | 25 | 33 | 26 | 27 | **111** | **75.5 %** | 111 (55.5 %) |
| 2 marks | 3 | 5 | 8 | 8 | 24 | 16.3 % | 48 (24.0 %) |
| 3 marks | 5 | 1 | 1 | 1 | 8 | 5.4 % | 24 (12.0 %) |
| 4 marks | 1 | 1 | 0 | 1 | 3 | 2.0 % | 12 (6.0 %) |
| 5 marks | 0 | 0 | 1 | 0 | 1 | 0.7 % | 5 (2.5 %) |
| **6+ marks** | 0 | 0 | 0 | 0 | **0** | **0 %** | 0 |

Physics fragments as finely as Chemistry — 75.5 % of parts are single-mark — and it is
the paper with the **fewest large awards**: only four parts in four years are worth
more than 3 marks.

## P.3 Format census, with witnesses

| Format | Witness(es) |
|---|---|
| MCQ, text stem + text options | Physics 2025 Q1(a); Physics 2023 Q1(d) |
| MCQ with a diagram in the stem | Physics 2025 Q1(c); Physics 2021 Q1(c) |
| MCQ with a **photograph** in the stem | Physics 2022 Q1(j) — athlete; Physics 2021 Q1(i) — pencil in water |
| MCQ whose **options are photographs of instruments** | Physics 2023 Q1(a) — tape / balance / stopwatch / ruler |
| MCQ whose **options are circuit diagrams** | Physics 2025 Q1(b) |
| MCQ whose **options are circuit symbols** | Physics 2023 Q1(c) |
| MCQ whose **options are ray diagrams** | Physics 2023 Q1(i) |
| MCQ whose **options are flow charts** | Physics 2025 Q1(i) — energy transformation chains |
| MCQ whose options are mirror-image shapes | Physics 2022 Q1(i) — image of the letter F |
| MCQ requiring a **calculation** | Physics 2025 Q1(h) — a = Δv/t; Physics 2021 Q1(j) — Q = It |
| MCQ requiring a **graph reading** | Physics 2025 Q1(g) |
| MCQ, **order-of-magnitude estimation** | Physics 2025 Q1(e) — desk height; 2023 Q1(j) — pencil diameter; 2022 Q1(j) — athlete's speed |
| MCQ, **circle a letter placed on the figure** | Physics 2025 Q1(c) — line of sight; Physics 2023 Q1(f) — image position |
| MCQ testing **recall of a formula** | Physics 2022 Q1(h) — KE = ½mv² |
| Matching, Column A → Column B | Physics 2025 Q4(b) [4] |
| Matching where one column is diagrams | Physics 2023 Q3(b) — beam shapes → divergent/convergent/parallel |
| Label a supplied diagram from a word bank | Physics 2022 Q2(a) [4]; Physics 2021 Q2(c) [3] |
| **Label a supplied diagram by writing letters onto it** | Physics 2023 Q2(a) — mark main scale M and vernier scale V |
| Mark a named part on a figure | Physics 2022 Q3(b)(i) — mark the tail T |
| Complete a classification table | Physics 2025 Q4(a)(i); Physics 2023 Q3(a) [5]; Physics 2021 Q3(a)(i) [3] |
| Tick-box single choice | Physics 2023 Q2(b); Physics 2022 Q6(a); Physics 2021 Q2(b)(i) |
| Tick exactly N boxes | Physics 2025 Q4(c) [2] |
| Fill blanks in prose from a word list | Physics 2021 Q2(a) |
| Define | Physics 2025 Q2(a) — time period; Physics 2021 Q4(b)(i) — resistance |
| Explain / give a reason | Physics 2025 Q3(a); Physics 2023 Q4(c)(ii) |
| Predict + justify | Physics 2025 Q6(b)(iv) — will the lamp light, and why |
| **Read an analogue instrument scale** | Physics 2025 Q2(b)(i) [3] — stopwatch dial; Physics 2022 Q3(a)(i) — measuring cylinder; Physics 2022 Q3(c)(i)–(iii) — vernier main + vernier scale, then combine |
| Calculation with units, working shown | Physics 2025 Q6(c); Physics 2022 Q6(d)–(e); Physics 2021 Q5(a)–(b) |
| **Parallel-resistance calculation** | Physics 2022 Q5(b)(i) [3] — the heaviest arithmetic in the entire 14-paper corpus |
| Plot a graph on a **pre-axed, pre-scaled grid** | Physics 2021 Q5(c) [3] |
| **Complete / extend a supplied graph** | Physics 2025 Q5(c) [2]; Physics 2023 Q6(a); Physics 2022 Q6(f) |
| **Shade an area under a graph to represent a quantity** | Physics 2023 Q6(c) |
| Find a gradient from a graph | Physics 2023 Q6(d) [3] — maximum acceleration |
| Find an area under a graph | Physics 2022 Q6(d) [2] — distance travelled |
| **Draw a circuit diagram from a written specification** | Physics 2021 Q4(a) [4] — the largest single drawing award measured |
| **Draw a ray onto a diagram** | Physics 2022 Q4(a) normal, Q4(c)(i) refracted ray |
| **Measure an angle with a protractor** | Physics 2022 Q4(b) |
| Draw arrows to show direction of motion | Physics 2021 Q5… (2023 Q5(b)(i) — pendulum bob) |
| Order scrambled sentences | Physics 2021 Q4(c)(i) [3] — how a bimetallic strip works |
| Identify a type of experimental error | Physics 2021 Q3(b)(i); Physics 2023 Q2(d) |
| Improve the accuracy of a measurement | Physics 2021 Q6(b)(i)–(ii) |
| Choose the correct method and justify | Physics 2023 Q5(c) — three ways to open a jar lid |
| Compare two set-ups and reason | Physics 2023 Q5(d)(ii)–(iii) — which cylinder held more water |

## P.4 Visual frequency — Physics is total

| Year | Questions carrying a visual | % |
|---|---|---|
| 2021 | 6 of 6 | 100 % |
| 2022 | 6 of 6 | 100 % |
| 2023 | 6 of 6 | 100 % |
| 2025 | 6 of 6 | 100 % |
| **All years** | **24 of 24** | **100 %** |

**Every single Physics question in four years carries a figure, graph or table.** There
is no prose-only question anywhere in the Physics corpus.

Within Q1: **19 of 40 MCQ items carry a visual — 47.5 %**, the highest MCQ visual rate
of the three sciences. And Physics is the only paper where the MCQ *options themselves*
are routinely drawings: circuit diagrams, circuit symbols, ray diagrams, flow charts
and mirror-image shapes all appear as answer sets.

## P.5 Topic weighting (marks per topic, 200 marks over four years)

| Topic | 2021 | 2022 | 2023 | 2025 | Total | % |
|---|---|---|---|---|---|---|
| P1 · Measurements (instruments, units, accuracy, errors) | 9 | 10 | 19 | 10 | **48** | **24.0 %** |
| P4 · Motion (scalars/vectors, speed-time graphs) | 12 | 11 | 8 | 9 | **40** | **20.0 %** |
| P3 · Energy, heat & temperature | 10 | 9 | 5 | 14 | **38** | **19.0 %** |
| P5 · Electricity (circuits, current, resistance, charge) | 9 | 11 | 8 | 10 | **38** | **19.0 %** |
| P2 · Light (luminous bodies, reflection, refraction) | 10 | 9 | 10 | 7 | **36** | **18.0 %** |

Physics is the most evenly weighted of the three papers: the five topics span only
18–24 %, and no topic scores below 5 marks in any year. **A Physics paper is close to
one question per topic plus a distributed MCQ block.**

The one outlier is 2023, where Measurements took 19 of 50 marks (Q2 vernier caliper
7 + Q5(b) pendulum 3 + Q5(d) displacement volume 5 + 4 MCQ items).

## P.6 Calculation and equipment demand — the key Physics finding

- **No formula sheet is supplied in any year, and formula recall is itself examined**
  (Physics 2022 Q1(h) asks which of `mgh / ½mv² / ma / mv` is kinetic energy).
- Formulas assumed known and used: `speed = distance ÷ time`, `a = Δv ÷ t`,
  `Q = I t`, `V = I R`, series resistance `R = R₁ + R₂`, **parallel resistance
  `1/R = 1/R₁ + 1/R₂`**, `distance = area under a speed-time graph`,
  `time period = total time ÷ number of oscillations`, GPE qualitatively as
  `m g h` (Physics 2025 Q4(c) asks which two quantities are needed, without
  requiring the calculation).
- **The mathematical set is used, not nominal.** Physics 2022 Q4 is a full
  construction: draw the normal on the traced outline, **measure the angle of
  incidence with the protractor already drawn in position**, draw the refracted ray,
  mark the angle of refraction. Physics 2021 Q3(b) turns a set-square arrangement into
  a parallax-error question.
- **Calculator listed 2022–2025; absent in 2021.** The 2021 paper still asks for
  200 ÷ 10, (44 − 20) ÷ 8, and a series resistance sum — all deliberately clean.
- Heaviest arithmetic measured anywhere: `1/R = 1/2 + 1/6` (Physics 2022 Q5(b)(i),
  3 marks), then `3 ÷ 1.5` for the current. Everything else divides exactly.

---

# CROSS-CUTTING: what the three papers share

## X.1 Identical exam shell

Every one of the 14 papers, without exception:

- Mauritius Examinations Syndicate, subject code **N530**, **45 minutes**,
  **50 marks**, candidates answer **on the question paper**.
- Instruction 6 is always **"Answer ALL questions."** There is no optionality anywhere
  in the corpus.
- A per-question **"For Examiners' use"** grid on the cover; the 2021 and 2022 series
  add a "Quality Controller" row that 2023–2025 drop.
- A **"Marks"** column ruled down the right margin of every content page.
- "Diagrams are not drawn to scale unless otherwise specified."
- "You may use a soft pencil for any diagram, graph or rough working" — i.e. drawing
  and plotting are expected in all three sciences.
- **No named sections in 13 of 14 papers.** Chemistry 2021 alone labels Q1
  "MULTIPLE CHOICE QUESTIONS".

## X.2 Question 1 is a fixed 10-mark MCQ block in all 14 papers

Ten items, one mark each, exactly 20 % of every paper, always the first question,
always headed "Circle the correct answer. Each item carries one mark." Two labelling
conventions coexist: items numbered `1.`–`10.` (Biology 2022–2024, Chemistry 2022–2024)
or lettered `(a)`–`(j)` (Biology 2025, Chemistry 2021/2025, all Physics). Both are
otherwise identical.

## X.3 Nothing above 5 marks; nothing resembling an essay

Across 476 mark-bearing parts and 700 marks, **the largest single award is 5 marks**,
and there are only 8 of them. Every 4- and 5-mark award is a multi-item task —
a table to complete, a set of labels, a matching column, a graph to plot, a circuit
to draw — never a block of continuous writing. **There is no extended-response
question in the NCE Science corpus.**

| | Biology | Chemistry | Physics | All |
|---|---|---|---|---|
| Mark-bearing parts | 153 | 176 | 147 | **476** |
| 1-mark parts | 97 (63.4 %) | 132 (75.0 %) | 111 (75.5 %) | **340 (71.4 %)** |
| Parts worth 4+ | 13 (8.5 %) | 11 (6.3 %) | 4 (2.7 %) | 28 (5.9 %) |

## X.4 The visual figure, all three sciences

| Science | Questions with a visual | Rate | MCQ items with a visual |
|---|---|---|---|
| Biology | 25 of 27 | **92.6 %** | 20 of 50 (40 %) |
| Chemistry | 23 of 25 | **92.0 %** | 19 of 50 (38 %) |
| Physics | 24 of 24 | **100 %** | 19 of 40 (47.5 %) |
| **All** | **72 of 76** | **94.7 %** | **58 of 140 (41.4 %)** |

**Nineteen questions out of twenty carry a diagram, photograph, graph or table.** Only
four questions in the entire corpus are prose-only: Biology 2025 Q3, Biology 2021 Q3,
Chemistry 2023 Q2 and Chemistry 2022 Q2/Q4.

For an app, this is the single most consequential number in this document. A
question bank that is 5 % visual cannot rehearse this exam. The visuals also are not
decorative: in most cases the answer **cannot be produced without reading the figure**
(measuring a printed cell, reading a vernier, deducing which cylinder held more water,
identifying two errors in a distillation rig).

## X.5 Visual *types*, ranked by how often they appear

1. **Labelled line diagram of a structure or apparatus** — the workhorse of all three
   papers, present in every year of every science.
2. **Data table supplied for interpretation** — every science, every year.
3. **Graph, supplied to be read** — Biology, Chemistry, Physics.
4. **Grid, supplied to be plotted on** — two distinct sub-types that behave very
   differently for an app:
   - **bare grid**, candidate chooses and labels both axes (Biology 2025 Q6(a) [4],
     Biology 2023 Q6(a) [4], Biology 2021 Q5(b) [3]);
   - **pre-axed grid**, axes and scale already printed (Chemistry 2024 Q4(b)(i) [2],
     Physics 2021 Q5(c) [3]).
   The bare grid is worth roughly double, because scaling and labelling carry marks.
5. **Pictures as the answer options** — Biology (photographs of organisms),
   Chemistry (apparatus, molecules), Physics (instruments, circuits, ray diagrams,
   flow charts).
6. **Photographs of real situations** — Biology (endemic species, cyclone damage,
   deforestation, photomicrographs) and Chemistry (algal bloom, polar bear, drought,
   flooding). Physics uses drawings almost exclusively.
7. **A figure to be drawn on** — arrows, X marks, normals, refracted rays, ticks placed
   on the diagram itself.
8. **A blank box to draw into** — Physics 2021 Q4(a) circuit [4], Biology 2022 Q4(d)
   biological drawing [2].

## X.6 Practical / investigative science is examined on paper, heavily

None of the three papers is a practical exam, yet every one of them examines practical
work through diagrams: naming apparatus, choosing a technique, spotting a mistake in a
rig, naming a controlled variable, stating a safety precaution, identifying a source of
error, suggesting how to improve accuracy, and drawing a conclusion from a results
table. Measured across the corpus this is worth roughly **8–12 marks per paper** and it
is spread across questions rather than concentrated in one.

## X.7 Localisation

Mauritian content appears in **Biology** (endemic species and the pink pigeon,
Biology 2023 Q1(10); invasive aliens, Biology 2022 Q1(5); the Mauritius Kestrel
recovery graph, Biology 2022 Q5 [10 marks]; HIV/AIDS case statistics for Mauritius,
Biology 2025 Q6 [11 marks] and Biology 2022 Q4(e)) and in **Physics** (bagasse as an
energy source, Physics 2022 Q1(d)). **Chemistry is entirely unlocalised** across five
years.

## X.8 Equipment, calculators and reference material — summary table

| | Biology | Chemistry | Physics |
|---|---|---|---|
| 2021 materials | Ruler | *(none listed)* | Mathematical set |
| 2022–2025 materials | Ruler, Calculator | Ruler, Calculator | Mathematical set, Calculator |
| Reference sheet supplied | none | **Periodic Table** (all 5 years) | none |
| Formula sheet | none | none | **none — and formula recall is examined** |
| Is the drawing instrument actually used? | **Yes** — magnification questions require measuring the printed figure | Not observed; ruler is for table/graph neatness | **Yes** — protractor measures an angle for marks |
| Heaviest arithmetic in the corpus | ÷15000 magnification [3] | 450 − 230 [1] | 1/R = 1/2 + 1/6 [3] |

---

# PROPOSAL — mapping onto `subjects/grade9-science/_manifest.js`

> ⚠ **This section is a PROPOSAL.** `_manifest.js` was read, not modified. Nothing
> here has been applied. The `examWeight` figures below are suggestions derived from
> measured marks; the chapter ids and names are quoted from the file as it stands.

The manifest declares **16 chapters**: `g9s-inquiry`, `g9s-c1`…`c5`, `g9s-p1`…`p5`,
`g9s-b1`…`b4`, `g9s-sts`. Its C/P/B chapter titles map onto the measured topics
almost exactly — whoever wrote it worked from the same syllabus the examiner does.

## M.1 Chemistry: measured topic → chapter

| Measured topic | Marks / 250 | % | Chapter | Current `examWeight` | Proposed |
|---|---|---|---|---|---|
| Symbols, formulae, valency, equations, molecules | 64 | 25.6 % | `g9s-c3-language` | 3 | **5** |
| Pollution, greenhouse effect, ozone, eutrophication | 59 | 23.6 % | `g9s-c1-atmosphere` | 3 | **5** |
| Metals, reactivity series, displacement | 52 | 20.8 % | `g9s-c4-metals` | 3 | **4** |
| Crystallisation, sublimation, distillation, chromatography, filtration | 51 | 20.4 % | `g9s-c2-mixtures` | 3 | **4** |
| Neutralisation, soluble/insoluble salts, uses of salts | 24 | 9.6 % | `g9s-c5-salts` | 3 | **2** |

The five Chemistry chapters currently carry an identical weight of 3. Measured against
the papers, four of them are worth roughly twice the fifth. **C5 Salts is the clear
over-weighting** — it scored 0 marks in 2021, and only 24 of 250 across five years.

⚠ One thing the manifest's C2 line does not say but the papers demand:
**chromatography**. C2's syllabus text names "crystallisation, sublimation and
distillation" only, yet chromatography earned 5 marks in Chemistry 2023 Q4(a)–(b) and
5 in Chemistry 2021 Q2(b), plus MCQ items in 2022 and 2021. Filtration also appears
(Chemistry 2022 Q3(c), 2025 Q5(a)(i)). C2's prose should name all five techniques.

## M.2 Physics: measured topic → chapter

| Measured topic | Marks / 200 | % | Chapter | Current `examWeight` | Proposed |
|---|---|---|---|---|---|
| Units, instruments, accuracy, errors, estimation | 48 | 24.0 % | `g9s-p1-measurements` | 2 | **5** |
| Scalars/vectors, speed, acceleration, speed-time graphs | 40 | 20.0 % | `g9s-p4-motion` | 4 | **4** |
| Energy forms, sources, conservation, heat | 38 | 19.0 % | `g9s-p3-energy` | 3 | **4** |
| Circuits, current, voltage, resistance, charge | 38 | 19.0 % | `g9s-p5-electricity` | 4 | **4** |
| Luminous bodies, rectilinear propagation, reflection, refraction | 36 | 18.0 % | `g9s-p2-light` | 3 | **4** |

⚠ **`g9s-p1-measurements` is the largest single Physics topic by measured marks
(24 %) and currently carries the *lowest* weight in the pack (2).** That is backwards.
Measurements is where the vernier caliper, the stopwatch dial, the measuring cylinder,
parallax and zero error, and order-of-magnitude estimation all live, and it took
19 of 50 marks in 2023 alone.

## M.3 Biology: measured topic → chapter

| Measured topic | Marks / 250 | % | Chapter | Current `examWeight` | Proposed |
|---|---|---|---|---|---|
| Blood, heart, vessels, cardiovascular disease | 71 | 28.4 % | `g9s-b1-circulatory` | 3 | **5** |
| Photosynthesis, leaf structure, starch test | 60 | 24.0 % | `g9s-b4-plant-nutrition` | 3 | **4** |
| Biodiversity, human impact, conservation, quadrats | 52 | 20.8 % | `g9s-b3-biodiversity` | 3 | **4** |
| Reproduction (sexual/asexual, human systems) | 45 | 18.0 % | `g9s-b2-reproductive` | 3 | **4** |
| HIV/AIDS, STDs, communicable disease | 22 | 8.8 % | **split** — see below | — | — |

The 22 marks of disease content have no chapter of their own. The manifest handles
them by clause, not by chapter:
- `g9s-b2-reproductive` says *"Understand sexually transmitted diseases and how they
  are prevented"* → absorbs HIV/AIDS/STD (≈21 marks, incl. the whole 11-mark
  Biology 2025 Q6).
- `g9s-b1-circulatory` says *"Discuss cardiovascular disease and its prevention"*
  → absorbs stroke / heart attack / coronary artery items, already counted in B1's 71.

That is workable, but it means **B2 is really worth ~26 % of Biology, not 18 %**, and
its questions are as likely to be a data-handling exercise on HIV statistics as a
labelling exercise on the reproductive system.

## M.4 Chapters the papers never test

| Chapter | Verdict |
|---|---|
| `g9s-sts` · Science, Technology & Society | **Never tested.** No question in 14 papers asks about ethics, evaluating information sources, or named applications such as optical fibres. The nearest neighbours — catalytic converters (Chemistry 2025 Q1(e), 2021 Q1(b)) and "give one advantage of a thermal power station" (Physics 2022 Q2(c)) — sit more naturally under C1 and P3. Its `examWeight: 2` currently buys exam slots for content the exam does not sample. |
| `g9s-inquiry` · Scientific Inquiry | **Never a standalone topic — but pervasive as a skill.** Variables, conclusions, safety precautions, sources of error, improving accuracy, tabulating and graphing are worth roughly 8–12 marks per paper, always attached to a subject-matter question rather than asked on their own. Recommendation: keep the chapter for teaching, but do **not** let it deal exam questions of its own; fold its skills into every other chapter's items instead. |

## M.5 Tested content with no home in the manifest

| Measured content | Marks | Where it currently has nowhere to go |
|---|---|---|
| **Refraction of light** | ≥11 (Physics 2022 Q4 [7], 2021 Q1(i) + Q2(c) [4]) | `g9s-p2-light`'s syllabus text names luminous/non-luminous, rectilinear propagation and **reflection** only. Refraction is not mentioned, yet it carried a whole 7-mark question in 2022. **Real gap — P2's prose needs a refraction line.** |
| **Thermal expansion / bimetallic strip** | ≥6 (Physics 2021 Q4(c) [4], 2023 Q5(c) [2]) | `g9s-p3-energy` is titled "Energy, Heat & Temperature" but every one of its syllabus lines is about energy sources and conservation. Expansion on heating is not in them. **Real gap.** |
| **Order-of-magnitude estimation** | 3 (Physics 2025 Q1(e), 2023 Q1(j), 2022 Q1(j)) | Fits `g9s-p1-measurements` conceptually, but its syllabus lines cover SI units, instruments, accuracy and errors — not estimation. Minor gap; one added line covers it. |
| **Vernier caliper specifically** | ≥12 (Physics 2023 Q2 [7], 2022 Q3(b)–(c) [5]) | `g9s-p1-measurements` says "use appropriate instruments" and "compare the accuracy of simple measuring instruments" — broad enough, but the vernier is the single most-examined instrument in Physics and deserves naming. |
| **Chromatography and filtration** | ≥12 (Chemistry 2023 Q4 [5], 2021 Q2(b) [5], plus MCQ) | `g9s-c2-mixtures` names only crystallisation, sublimation and distillation. **Real gap.** |
| **Magnification / scale calculation** | 5 (Biology 2024 Q4(e)(ii) [2], 2023 Q5(a) [3]) | No Biology chapter mentions magnification or cell size. It sits closest to `g9s-b1-circulatory` because both instances used blood cells, but that is an accident of the years sampled. |
| **General laboratory apparatus recognition** | ≥2 (Chemistry 2024 Q1(1), 2023 Q1(1)) | Straddles `g9s-c2-mixtures` (apparatus diagrams) and `g9s-p1-measurements` (measuring instruments). Not a gap so much as a duplication risk: the same thermometer question could be authored under either. |

## M.6 Proposed authoring priorities, in order

1. **Every question needs a visual by default, not by exception.** 94.7 % of real
   questions carry one. Inline SVG for apparatus, circuits, ray diagrams, leaf and
   organ cross-sections, chromatograms, molecular ball-and-stick, speed-time graphs.
2. **Build the four visual *interaction* types the papers actually use**, because
   plain MCQ cannot reach them:
   label-from-word-bank · complete-a-table · read-a-graph/instrument-scale ·
   mark-a-point-on-a-figure. Between them these cover the majority of non-MCQ marks.
3. **Ten one-mark MCQs is a fixed 20 % of every paper.** An NCE mock generator should
   hard-code that block and its 40 % visual rate rather than sampling it.
4. **Weight difficulty toward 1-mark recall-and-read.** 71.4 % of real mark-bearing
   parts are worth a single mark; nothing exceeds 5. An app that models NCE Science as
   long multi-step problems models the wrong exam.
5. **Physics needs a protractor/ruler-on-screen affordance or those marks are
   unreachable**; Biology needs a known physical scale for magnification items.
6. **Do not author mole, Mr or reacting-mass chemistry.** The supplied Periodic Table
   carries no atomic numbers and no relative atomic masses, and five years of papers
   contain none of it.
7. **Rebalance `examWeight` per M.1–M.3** — in particular raise `g9s-p1-measurements`
   from 2 and lower `g9s-c5-salts` from 3.

---

## Confidence and limits

- Every mark total, part count, topic figure and visual count above was derived by
  reading the rendered page and adding up the printed `[n]` awards. All 14 papers
  reconcile to exactly 50 marks, which is the check that the part-by-part tallies are
  right.
- **Topic assignment is a judgement**, not a measurement. Where an item straddles two
  chapters (a thermometer: apparatus or temperature? photosynthesis in a Chemistry
  MCQ: C1 or biology?) it was assigned to the chapter whose manifest syllabus text
  covers it best, and the ambiguous cases are named in M.5. Re-deriving the weights
  with different bucket boundaries would move individual topics by a few points; it
  would not change the ordering or the headline visual figures.
- **Physics rests on four years, not five.** Its percentages are out of 200 marks.
- Mark schemes were not available for any paper; nothing here depends on one.
