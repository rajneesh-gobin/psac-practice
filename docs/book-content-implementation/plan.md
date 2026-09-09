# Book Content Implementation Plan

Generated: 2026-09-09

## Scope

Add syllabus-aligned questions for Grades 1, 2, 3, 7 and 8, based on the book-syllabus audit findings in docs/book-syllabus-audit/report.md.

## Workstreams and Ownership

### Shared files — coordinator only
- `engine/question_loader.js` (LOCAL_FILES additions + _CACHE_VERSION bump to 120)
- `subjects/_index.js` (regenerate after all manifest changes: `node scripts/build-subject-index.js`)

### Grade 1 Maths
Missing from book-aligned syllabus:
- **Time chapter** (g1mth-time): day/night, morning/afternoon (book Part 1 pp.40-41, Part 2 p.65)
- **Money chapter** (g1mth-money): coins to Rs 10 (book Part 2 pp.42-46)
- **Ordinals chapter** (g1mth-ordinals): 1st–5th (book scope)

Files:
- `subjects/grade1-maths/_manifest.js` — add 3 chapters + syllabus entries
- `subjects/grade1-maths/questions/ch07_time.js` (new)
- `subjects/grade1-maths/questions/ch08_money.js` (new, with SVG coins)
- `subjects/grade1-maths/questions/ch09_ordinals.js` (new, with SVG visuals)

### Grade 2 Maths
Missing from book-aligned syllabus:
- **Ordinals chapter** (g2mth-ordinals): 1st–12th (book Part 2 pp.1-10)
- **Money chapter** (g2mth-money): Rs 1–100 (book Part 2 pp.83-102)
- **Division chapter** (g2mth-division): dividing by 2 (book Part 2 pp.103-113)

Files:
- `subjects/grade2-maths/_manifest.js` — add 3 chapters
- `subjects/grade2-maths/questions/ch09_ordinals.js` (new)
- `subjects/grade2-maths/questions/ch10_money.js` (new)
- `subjects/grade2-maths/questions/ch11_division.js` (new)

### Grade 3 Maths
Missing from book-aligned syllabus:
- **Pictograms chapter** (g3mth-pictograms): reading/interpreting pictograms (book Part 1 pp.14-22)
- **Ordinals chapter** (g3mth-ordinals): 1st–20th (book Part 2 pp.19-32)
- **Roman Numerals chapter** (g3mth-roman): I–XX (book Part 2 pp.33-40)
- **Money chapter** (g3mth-money): Rs 1–1000 (book Part 2 pp.142-163)

Files:
- `subjects/grade3-maths/_manifest.js` — add 4 chapters
- `subjects/grade3-maths/questions/ch10_pictograms.js` (new, SVG diagrams)
- `subjects/grade3-maths/questions/ch11_ordinals.js` (new)
- `subjects/grade3-maths/questions/ch12_roman_numerals.js` (new)
- `subjects/grade3-maths/questions/ch13_money.js` (new)

### Grade 7 Maths
Missing from book-aligned syllabus:
- **Sequences chapter** (g7m-sequences): patterns, square/triangular numbers, nth term (book pp.187-193)
  - Note: existing g7m-sequences chapter in manifest covers Sequences; need to add questions
- **Angles topics**: complementary/supplementary, vertically opposite, corresponding/alternate angles (book pp.66-83)
  - Note: need to add angles chapter to manifest

Files:
- `subjects/grade7-maths/_manifest.js` — add angles chapter (g7m-angles)
- `subjects/grade7-maths/questions/ch03_sequences_angles.js` (new — sequences + angles questions)

### Grade 8 Maths
Five chapters entirely absent from the app:
- **Real Numbers** (g8m-real-numbers): rational/irrational, surds (book pp.26-41)
- **Pythagoras Theorem** (g8m-pythagoras): right triangles, applications (book pp.87-98)
- **Inequalities** (g8m-inequalities): solving and graphing (book pp.165-179)
- **Sets** (g8m-sets): union, intersection, complement, Venn (book pp.245-253)
- **Construction of Triangles** (g8m-constructions): compass + ruler (book pp.254-266)

Files:
- `subjects/grade8-maths/_manifest.js` — add 5 chapters
- `subjects/grade8-maths/questions/ch03_real_numbers.js` (new)
- `subjects/grade8-maths/questions/ch04_pythagoras.js` (new)
- `subjects/grade8-maths/questions/ch05_inequalities.js` (new)
- `subjects/grade8-maths/questions/ch06_sets.js` (new)
- `subjects/grade8-maths/questions/ch07_constructions.js` (new)

## Question Targets (minimum to pass test-live-pack-content.js)
- Each declared subsection: minimum 20 questions
- Each chapter: minimum 40 questions total
- Prefer 25-30 per subsection for a working bank

## IDs Convention
- Grade 1: `g1mth-<topic>-NNN`
- Grade 2: `g2mth-<topic>-NNN`
- Grade 3: `g3mth-<topic>-NNN`
- Grade 7: `g7m-<chapter>-NNN` (continuing from existing highest)
- Grade 8: `g8m-<chapter>-NNN` (continuing from existing highest)

## Status

| Task | Status |
|---|---|
| docs/book-content-implementation/ created | ✅ |
| Grade 1 Maths new chapters | ⏳ in progress |
| Grade 2 Maths new chapters | ⏳ in progress |
| Grade 3 Maths new chapters | ⏳ in progress |
| Grade 7 Maths sequences + angles | ⏳ in progress |
| Grade 8 Maths 5 new chapters | ⏳ in progress |
| question_loader.js updated | pending |
| subjects/_index.js regenerated | pending |
| Validation run | pending |
