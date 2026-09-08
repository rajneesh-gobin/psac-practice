# NCE Grade 9 — syllabus map

Maps each Grade 9 chapter in this repository to the content area in the
**National Curriculum Framework / Teaching and Learning Syllabus, Grades 7–9**
(`past-papers/syllabus/NCF 7 to 9_230524.pdf`) that it assesses, and to what
the real NCE papers were measured to assess.

⚠ **Correction: the file is 330 pages, not 203.** An earlier note here said 203.
That came from a hand-rolled page counter that takes the largest `/Count` on a
`/Type /Pages` node — which is the whole document only when the page tree is
flat. This PDF's tree is nested, so the counter read a sub-tree. `pdfinfo` says
**330**, `pdftotext` yields 330 form-feed-separated pages, and the printed page
numbers run to 324. **Use `pdfinfo`, never that script.** The same script also
under-counted four English papers (it reported 9–10 pages for papers that are
24); `source-inventory.md` has been corrected throughout.

⚠ **PDF page ≠ printed page.** The PDF carries six pages of front matter, so
PDF page *n* is printed page *n* − 6 in the Mathematics section. References
below give the **PDF** page, with the printed page in brackets.

## Document structure (measured)

| Section | PDF pages |
|---|---|
| 1.0 English Language | 7–19 |
| 2.0 French | 20–29 |
| **3.0 Mathematics** | **30–65** |
| 4.0 Science | 66–81 |
| 5.0 Social & Modern Studies | 82–97 |
| 6.0 Technology Studies | 98–117 |
| 7.0 Art and Design | 118–133 |
| **8.0 Information and Communication Technology** | **134–151** |
| 9.0 Physical Education | 152–234 |
| 10.0 Business and Entrepreneurship | 235–244 |
| 11.0 Life Skills & Values Education | 245–259 |
| 12.0 Arabic | 260–284 |
| 13.0 Kreol Morisien | 285–292 |
| 14.0 Drama & Theatre | 293–301 |
| 15.0 Performing Arts | 302–329 |

⚠ **Science is one subject in the syllabus, split into three components.** PDF
p.76 [70] onwards, §4.2.3 GRADE 9, is organised as **Component 1: Chemistry**
(C1…), **Component 2: Physics** (P1…), **Component 3: Biology** (B1…). This is
the syllabus-side evidence for the separate Biology / Chemistry / Physics NCE
papers, and it is a *component* split inside one subject rather than three
subjects. That distinction matters for the architecture decision and is
recorded in `progress.md`.

---

## Mathematics — COMPLETE

Read visually: PDF p.35 [29] (§3.6 Grade 9 outcomes) and PDF p.48–52 [42–46]
(§3.9 Content Areas and Specific Learning Outcomes for Grade 9).

### The 17 content areas the syllabus declares for Grade 9

| # | Strand | Content area | Sub-topics (§3.9) |
|---|---|---|---|
| 1 | Numbers | **Indices** | negative indices; multiplication, division and power laws; zero index; simple equations involving indices |
| 2 | Numbers | **Patterns and Sequences** | Pascal's triangle; extending patterns and figures, general term; sequences of ordered pairs |
| 3 | Numbers | **Personal and Household Finance** | hire purchase; salaries and wages; tables and charts (CEB, CWA bills) |
| 4 | Geometry | **Trigonometry** | sine, cosine, tangent for acute angles; 2-D problems, unknown sides/angles (**excluding** angle of elevation and depression) |
| 5 | Geometry | **Coordinates** | gradient of inclined/horizontal/vertical lines; gradient of parallel lines; equation `y = mx + c`; straight-line graphs in practical situations |
| 6 | Geometry | **Vectors and Translation** | scalar vs vector; column form; magnitude; translation — image, object, and finding the translation vector |
| 7 | Measurement | **Surface area** | nets of a cylinder and a right prism; circumference and area of a circle; surface area of a cylinder (closed, semi-open, hollow) and of a right prism |
| 8 | Measurement | **Volume** | volume of a cylinder and a right prism, and problems |
| 9 | Measurement | **Capacity** | mL, cL, L; conversion; capacity of containers; capacity-and-volume problems |
| 10 | Algebra | **Expressions** | binomial expressions; binomial expansion by area tables and the distributive law; perfect squares; difference of two squares; algebraic fractions |
| 11 | Algebra | **Matrices** | matrix as a store of information; order; types (null, zero, square, identity, equal, diagonal); addition, subtraction, multiplication; matrix equations |
| 12 | Algebra | **Quadratics** | identify; factorise `ax² + bx + c`; solve by factorisation (`a = 1`) including algebraic fractions; formulate and solve problems |
| 13 | Algebra | **Algebraic manipulation** | evaluate an unknown in a formula; change the subject of a formula |
| 14 | Algebra | **Inequalities** | linear inequalities, solutions in **set-builder notation** |
| 15 | Algebra | **Simultaneous Equations** | meaning; solve graphically, by substitution or by elimination |
| 16 | Stats & Prob | **Statistics** | raw data → frequency table (ungrouped); mean, median, mode from a frequency table |
| 17 | Stats & Prob | **Probability** | sample space, outcome, event (simple, combined, complement); probability of simple and combined events; **possibility diagrams** |

### ⚠ The repository is missing four of the seventeen

`subjects/grade9-maths/_manifest.js` declared **13** chapters. All four missing
areas are **assessed in the real papers**, one of them by the heaviest question
on a paper.

| Missing content area | Repo chapter | Witness in the papers |
|---|---|---|
| Geometry: **Coordinates** | none | 2025 Q18 (gradient + equation of a line, 3 marks), 2025 Q29 (draw `y = x + 4`, name and find the area of the enclosed figure, 5 marks), 2024 Q26(a) |
| Algebra: **Matrices** | none | 2025 Q4 (order of a matrix), 2025 Q16 (`P − Q`, `2Q`, 4 marks), 2024 Q24 (`2A − B`) |
| Algebra: **Algebraic manipulation** | none | 2025 Q23 (evaluate `A = πr² + πrl`; make `l` the subject, 4 marks) |
| Algebra: **Simultaneous Equations** | none | 2025 Q25 (4 marks), **2024 Q31 (6 marks — the second-heaviest question on that paper)** |

⚠ "Change the subject of a formula" was present, but filed inside
`g9m-expressions`. The syllabus puts it in **Algebraic manipulation**, a
separate content area. Leaving it there hid the fact that "evaluate an unknown
in a given formula" had no home at all.

### ⚠ One chapter was named more narrowly than the syllabus

`g9m-surface-area` was **"Surface Area of a Right Prism"**. The syllabus content
area is **"Surface area"**, covering *the cylinder as well as the right prism*,
and explicitly including **circumference and area of a circle**. The narrow name
would have led an author to leave out the cylinder — which is exactly what 2025
Q28(b) asks about.

### ⚠ The papers assess more than the Grade 9 syllabus lists

Both of these are real and neither is an error in the papers — Grade 9 sits at
the end of a three-year cycle and the NCE examines the whole of it.

1. **Vector arithmetic.** §3.9 Vectors and Translation lists scalar-vs-vector,
   column notation, magnitude and translation. It does **not** list adding,
   subtracting or scaling vectors. 2025 Q16 asks for `P − Q` and `2Q`, worth
   4 marks. The repository's chapter prose already claimed "Add and subtract
   vectors", so the prose was right about the exam and wrong about the syllabus.
   Keep the content; the note now says why.
2. **Grade 7–8 number work is a large part of the paper.** Measured on the 2025
   paper by assigning each question's marks to a content area: roughly **30 of
   the 100 marks** are ordinary arithmetic, fractions, decimals, percentages,
   ratio, order of operations, metric conversion and number properties —
   material the Grade 9 syllabus does not list because it was taught in Grades 7
   and 8. A Grade 9-only chapter list therefore cannot cover about a third of
   the paper. Recorded as a gap; the fix is a revision chapter, not a change to
   the Grade 9 syllabus mapping.

### Measured mark distribution, 2025 paper

Method: every question's marks assigned to one content area by reading the
page. This is one paper, so it sets the **order of magnitude** of a weight, not
its exact value.

| Content area | Marks (2025) |
|---|---|
| Grade 7–8 number revision | ~30 |
| Coordinates | 8 |
| Vectors and Translation | 7 |
| Volume | 7 |
| Expressions | 6 |
| Personal and Household Finance | 5 |
| Probability | 5 |
| Indices | 4 |
| Statistics | 4 |
| Algebraic manipulation | 4 |
| Simultaneous Equations | 4 |
| Trigonometry | 3 |
| Quadratics | 3 |
| Inequalities | 3 |
| Patterns and Sequences | 1 |
| Capacity | 1 |
| Matrices | 1 |
| Surface area | 0 |

⚠ **Surface area scored 0 in 2025 and Matrices only 1.** Neither is evidence
that they are unimportant — they are in the syllabus and the 2024 paper weights
them differently. One year is not a weighting; `exam-blueprints.md` derives
weights from the repeated pattern, not from an accidental feature of one year.

### English
Not started. PDF pp. 7–19. ⚠ `CLAUDE.md` warns that the grammar tables at
PDF pp. 15–19 are dense multi-column layouts that `pdftotext` interleaves —
render and read those pages, do not extract them.

### French
Not started. PDF pp. 20–29.

### Science (Biology / Chemistry / Physics components)
Not started. PDF pp. 66–81; Grade 9 is §4.2.3 at PDF p.76 [70] onwards.

### Social & Modern Studies
Not started. PDF pp. 82–97; Grade 9 content areas at §5.8, PDF p.88 [82].

### Information and Communication Technology
Not started. PDF pp. 134–151; Grade 9 outcomes at §8.6.3 and ACL Grade 9 at
§8.7.3, PDF pp. 144–151.
