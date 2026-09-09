# Do the books match our app syllabus?

**Only partially. The app is not yet a faithful match to the supplied books for Grades 1, 2, 3, 7 and 8.** There are genuine missing chapters, incomplete outcomes hidden inside broad chapters, and differences in grade progression. Different chapter titles alone are not the problem: many textbook units legitimately map to several app chapters.

Audited on **9 September 2026**: **33 PDFs, 4,663 PDF pages in the source collection, 25 app packs and 170 declared app chapters**. Six of those chapters are placeholders. The detailed comparison contains **235 chapter, lesson and supporting-material entries**, not 235 equal-weight learning outcomes. No coverage percentage is inferred from these counts.

## Findings by grade and subject

| Grade | Maths | English | French | Other supplied subjects |
|---|---|---|---|---|
| 1 | Significant scope/level mismatch; time, money and ordinals omitted | Broad skills align; grammar and sound inventory incomplete | Broad skills align; proper nouns, number and adjectives insufficiently specified | Health has no substantive syllabus |
| 2 | Money, division and ordinals omitted; operations/measurement level differs | Several explicit grammar structures missing from declarations | Prepositions, pronouns and sentence types insufficiently specified | Health has no substantive syllabus |
| 3 | Pictograms, Roman numerals, money and ordinals omitted; level/unit differences | Generic grammar/writing needs expansion | Tenses broadly align; possessives, plurals, vocabulary/spelling need expansion | Health has no substantive syllabus; SSEE pack absent |
| 7 | Most chapters map; sequences missing and angle rules incomplete | Broad skills align; grammar details and writing formats unspecified | Five strands omit the book’s explicit grammar and image-reading progression | Science and SMS broadly align, with specific omissions |
| 8 | Five whole chapters absent, plus several partial chapters | Continuous-perfect tenses, voice and other grammar not explicit | Text types broadly map; substantial grammar/conjugation missing | Science and SMS broadly align, with specific omissions |

Grades 1–3 ICT packs also contain only a Sample Chapter. No dedicated ICT book was supplied, so **their standalone syllabus alignment is unverified**. Integrated ICT activities in English/Maths are real, but do not establish a complete ICT-subject syllabus.

## 1. Primary Maths: repair missing topics and grade progression together

| Grade | What the supplied book specifies | What the app currently specifies | Finding |
|---|---|---|---|
| 1 | Part 1 numbers 1–8; Part 2 numbers 0–10 and addition with total at most 10 | Numbers to 20; addition and subtraction within 20; odd/even | App goes beyond the supplied book while omitting book content |
| 2 | Addition without carrying; subtraction without borrowing | Both operations with and without regrouping | Clear progression mismatch |
| 2 | Arbitrary units for length, mass and capacity; nearest-hour clock reading; multiply/divide by 2 within 20 | cm/m, kg, litres; half past; multiplication by 2, 5 and 10 | App introduces later/different scope and omits division |
| 3 | Multiplication/division chiefly by 2–5; hour/half-hour/quarter-hour; capacity in L/cL | Tables 2–10, two-digit multiplication; five-minute time; L/ml | Core overlap, but difficulty and units do not match the stated objectives |

Evidence: [B04 PDF p.8](<D:/git-repo/psac-practice/books/grade1/Maths-Grade 1-PART-1-pupil (2021).pdf>), [B05 PDF p.6](<D:/git-repo/psac-practice/books/grade1/Maths-Grade 1-PART-2-PUPIL (2021).pdf>), [B11 PDF p.8](<D:/git-repo/psac-practice/books/grade2/Maths-grade2-part-1-pupil (2021).pdf>), [B12 PDF p.6](<D:/git-repo/psac-practice/books/grade2/Maths-grade2-Pupil-part 2 (2021).pdf>), [B21 PDF p.8](<D:/git-repo/psac-practice/books/grade3/Maths-Grade 3-part 1-pupil (2021).pdf>), [B20 PDF p.6](<D:/git-repo/psac-practice/books/grade3/Mathematics-Grade 3 - Part 2 - PUPIL (2021).pdf>). All six objective pages were visually checked. Compare [grade1-maths](<D:/git-repo/psac-practice/subjects/grade1-maths/_manifest.js>), [grade2-maths](<D:/git-repo/psac-practice/subjects/grade2-maths/_manifest.js>) and [grade3-maths](<D:/git-repo/psac-practice/subjects/grade3-maths/_manifest.js>).

**Confirmed omissions from the declared Maths syllabus:**

- **Grade 1:** time concepts (day/night, morning/afternoon); coins and decomposition up to Rs 10; ordinal positions up to fifth. Colour recognition and sorting by one attribute also need explicit outcomes. Book money activities appear at printed pp.42–46 of Part 2; time at Part 1 pp.40–41 and Part 2 p.65.
- **Grade 2:** ordinals to twelfth (Part 2 pp.1–10), money to Rs 100 (pp.83–102), and division by 2 (pp.103–113). Sorting by two attributes and measurement with arbitrary units need to be preserved.
- **Grade 3:** pictograms (Part 1 pp.14–22), ordinals to twentieth (Part 2 pp.19–32), Roman numerals to XX (pp.33–40), and money to Rs 1000 (pp.142–163). Abacus representation has a place-value umbrella but is not explicit. Add centilitres to capacity.

**App material not established by these book objectives** includes Grade 1 subtraction/odd-even/capacity; Grade 2 fractions, 3D shapes and symmetry; and several Grade 3 geometry, rounding and fraction extensions. Treat these as extensions pending separate curriculum justification, rather than assuming the book requires them. This audit does not recommend deleting useful practice indiscriminately.

## 2. Grade 8 Maths: the largest secondary chapter gap

The book has **17 numbered chapters**. The app has **11**, but counts alone would be misleading: some chapters are split or combined. The actual missing areas are:

| Book chapter | Printed pages | Current Grade 8 app destination |
|---|---:|---|
| Real Numbers | 26–41 | None |
| Pythagoras Theorem | 87–98 | None |
| Inequalities | 165–179 | None |
| Sets | 245–253 | None |
| Construction of triangles | 254–266 | None |

Source: [B33 contents PDF p.8; objective pages PDF 34, 95, 173, 253 and 262](<D:/git-repo/psac-practice/books/grade8/WEB REPRINT Maths Grade 8.pdf>). App: [grade8-maths](<D:/git-repo/psac-practice/subjects/grade8-maths/_manifest.js>).

Existing chapters also need these additions:

- **Sequences:** Fibonacci and sequences of ordered pairs.
- **Indices:** negative and unit-fractional indices.
- **Rate/proportion:** indirect/inverse proportion and scale problems; the app currently names direct proportion.
- **Finance:** commission and percentage increase/decrease.
- **Algebra:** explicit HCF/LCM of algebraic terms, factorisation by grouping, operations on algebraic fractions, and equations involving rational coefficients/fractions. Equations have one prose mention but no subsection.
- **Coordinates:** graphical intersections of lines.
- **Circles:** arcs, sectors, chord calculations, sector perimeter and sector area.

Statistics, polygons, and cube/cuboid surface area/volume have clear broad matches. General non-rectangular prisms and coordinate-midpoint calculation are not established as chapter outcomes in this supplied book; keep any such app content distinguishable from the matched core.

## 3. Grade 7 Maths: broad match with important holes

The book and app both have **22 chapters**, yet they do **not** match one-to-one.

- **Patterns and Sequences** (printed pp.187–193) has no app chapter or subsection. Identifying square/triangular numbers under Integers does not fully cover finding or completing patterns.
- **Angles** (pp.66–83) is only partly represented by Polygons and Constructions. The missing explicit rules include complementary/supplementary angles, vertically opposite angles and corresponding/alternate/co-interior angles with parallel lines.
- **Factors:** add HCF/LCM and word problems.
- **Indices:** the book teaches multiplication, division, power and zero-index laws; the app largely declares notation and evaluation.
- **Time:** add GMT/time-zone problems.
- **Algebra, coordinates and sets:** make the extra book operations explicit, as listed in the detailed comparison.

Translation, rotational symmetry and statistical mean are app extensions relative to this book’s declared chapter scope. Source: [B28 contents PDF p.8 and chapter objectives](<D:/git-repo/psac-practice/books/grade7/WEB REPRINT 2021 Maths Grade 7.pdf>); app: [grade7-maths](<D:/git-repo/psac-practice/subjects/grade7-maths/_manifest.js>).

## 4. Languages: preserve the skill strands, add the actual book outcomes

A theme such as “Moving around” can teach speaking, reading, writing, phonics and grammar together. The app’s skill-based structure is therefore reasonable. The problem is that a generic chapter such as “Grammar” does not specify all the grammar actually taught.

| Grade | English findings | French findings |
|---|---|---|
| 1 | Explicit pronouns, question words, positional prepositions and plural -s are not declared; sound sequence needs a checklist | Add proper nouns, singular/plural and adjectives; gender partly appears in notes |
| 2 | Add present continuous, future, possessives, prepositions, plural forms, can/cannot, negatives and question structures | Add prepositions, personal pronouns and explicit sentence types; noun groups need clearer treatment |
| 3 | Add present continuous, possession, articles/countability/plurals, connectives, comparisons and named writing formats | Tenses broadly map; specify possessive adjectives, plural nouns, synonyms/antonyms/word families and the spelling/sound sequence |
| 7 | Specify perfect and conditional tenses, indefinite pronouns, noun formation, phrasal verbs and the book’s writing formats; conjunctions have partial coverage under sentence structure | Explicit grammar progression has no dedicated inventory; image interpretation requires more than generic comprehension/BD |
| 8 | Present/past perfect continuous, active/passive voice, interrogative pronouns and phrasal verbs are not explicit; adverb subtypes also differ | Add noun/verbal group expansions, COD/COI and circumstantial complements, agreement and conjugation |

For the strongest tense discrepancy, the Grade 8 book teaches **present perfect continuous** at printed p.19 and **past perfect continuous** at p.45. The app names **present perfect** and **future continuous** in its two verb subsections. These are different tenses, not alternative chapter names. Evidence: [B29 PDF pp.29 and 55](<D:/git-repo/psac-practice/books/grade8/ENGLISH GRADE 8 (Review 2021) - WEB.pdf>); app: [grade8-english](<D:/git-repo/psac-practice/subjects/grade8-english/_manifest.js>).

Grade 7 French devotes an entire unit to grammar and teaches more grammar inside the listening/writing units. It also explicitly analyses image type, context, purpose and framing at printed p.144. Grade 8 French includes past-participle agreement at pp.111–112 and conjugation tables at pp.113–121, with no explicit counterpart in the five app strands. Evidence: [B27 PDF pp.53–67 and 154](<D:/git-repo/psac-practice/books/grade7/WEB REPRINT 2021 Français Grade 7.pdf>), [B32 PDF pp.119–129](<D:/git-repo/psac-practice/books/grade8/WEB REPRINT 2021 Francais Grade 8.pdf>); app: [grade7-french](<D:/git-repo/psac-practice/subjects/grade7-french/_manifest.js>), [grade8-french](<D:/git-repo/psac-practice/subjects/grade8-french/_manifest.js>).

Vocabulary themes and the exact phoneme/grapheme lists should be recorded as outcomes or tags. A generic “sounds” or “vocabulary” heading establishes only a broad mapping. This audit does not assert that every unspecified sound or word is absent from the question files.

## 5. Health and SSEE: missing subject content

**All 41 Health lessons in the supplied three books have no substantive declared app syllabus.** The Grade 1–3 Health packs each contain only one Sample Chapter and are marked coming soon.

- Grade 1: 13 lessons covering hygiene, teeth/handwashing, food and school/environment safety.
- Grade 2: 15 lessons covering grooming, dental/hand care, meals and home safety.
- Grade 3: 13 lessons covering hygiene and food groups, including water and food for energy/growth/health.

Sources: [B03](<D:/git-repo/psac-practice/books/grade1/HE-Pupil Book Grade 1.pdf>), [B10](<D:/git-repo/psac-practice/books/grade2/HE Grade 2 - Pupil's Activity Book.pdf>), [B19](<D:/git-repo/psac-practice/books/grade3/HPE_G3_PUPIL.pdf>), all contents at PDF p.7. The Grade 3 filename says HPE, but the supplied contents are labelled **Health Education**; this audit does not invent a separate Physical Education syllabus from the filename.

**Grade 3 SSEE is absent as a subject pack.** Both supplied books together contain eight units: environment, self/family, natural environment, living/non-living things, locality, air, water and weather. Language texts on similar themes do not substitute for those science/social/environmental objectives. Sources: [B22 contents PDF p.10](<D:/git-repo/psac-practice/books/grade3/SSEE_G3_P1_TB_Reprint2022.pdf>), [B23 contents PDF p.7](<D:/git-repo/psac-practice/books/grade3/SSEE_G3_p2_PUPILS_REPRINT 2022.pdf>).

## 6. Science: closest broad content match, but details matter

**Grade 7:** all nine book units have clear app homes. The app validly splits Matter/Changes, Solar System/Energy and Ecosystems/Food Chains. Add explicit outcomes for irregular-volume displacement, pendulum period, data logging/light-years, quadrat sampling, periodic-table periods/groups and the fuller air topic.

**Grade 8:** all nine book units have broad app homes. Important differences remain:

- **Work/Energy/Power:** the book explicitly calculates kinetic and gravitational potential energy; the app declares work and power but not these energy calculations. See [B30 printed pp.201, 213–225; PDF pp.209, 221–233](<D:/git-repo/psac-practice/books/grade8/Science Grade 8_Reprint 2021_WEB.pdf>).
- **Mixtures:** explicitly include solutions/suspensions, magnetic separation and alloys.
- **Forces/pressure:** include weight calculation, friction and force effects.
- **Digestion:** make teeth, peristalsis and liver/pancreas roles explicit.
- **Acids/bases:** specify pH, alkalis, carbonate reactions, named indicators and hydrogen testing.
- **Chemistry language:** book outcomes specify word equations; the app adds balancing chemical equations. No balancing-equation lesson was found in the extracted book text.

Magnetic force and magnetic separation are present in the book. Therefore, calling the entire Magnetism app chapter “not in the book” would be wrong. Magnetic fields/poles are not established by the examined book scope and should be separately justified. These are distinctions between the supplied textbook and declared syllabus, not a current-curriculum ruling.

Sources: [B25](<D:/git-repo/psac-practice/books/grade7/Science Grade 7_REPRINT 2021.pdf>), [B30](<D:/git-repo/psac-practice/books/grade8/Science Grade 8_Reprint 2021_WEB.pdf>); app: [grade7-science](<D:/git-repo/psac-practice/subjects/grade7-science/_manifest.js>), [grade8-science](<D:/git-repo/psac-practice/subjects/grade8-science/_manifest.js>).

## 7. Social & Modern Studies: broad alignment, some hidden omissions

**Grade 7:** islands, origins/identity, Mauritian contributions, settlements and natural resources align. Add explicit Indian Ocean trade/migration content and the substantial water-resources topic (printed pp.129–146), including sources, reservoirs and distribution. A generic “natural resources” statement is too broad to establish these outcomes.

**Grade 8:** slavery/indenture, independence, climate and democracy broadly align. Clarify nineteenth-century population content currently nested under a chapter titled “1920s to 1960s”; explicitly name both World Wars and their impact on Mauritius, and the origins of democracy. These are partial-detail gaps rather than wholly missing subject chapters.

Sources: [B26 contents PDF p.7; water PDF pp.137–138](<D:/git-repo/psac-practice/books/grade7/SMS Grade 7_Review 2021.pdf>), [B31 contents PDF p.7; World Wars PDF p.45 and democracy origins PDF p.122](<D:/git-repo/psac-practice/books/grade8/SMS_G8_rep2022.pdf>); app: [grade7-social-modern-studies](<D:/git-repo/psac-practice/subjects/grade7-social-modern-studies/_manifest.js>), [grade8-social-modern-studies](<D:/git-repo/psac-practice/subjects/grade8-social-modern-studies/_manifest.js>).

## Recommended correction order

1. **Repair Maths scope for Grades 1–3 and Grade 8.** Add the confirmed missing topics and separate book-core learning from extensions. Grade 7 sequences/angles should be included in this pass.
2. **Define real Health syllabuses and a Grade 3 SSEE destination.** Keep availability tied to usable content; replacing a placeholder title alone does not make a subject ready.
3. **Expand language outcomes.** Keep skill strands if useful, but add explicit grammar, writing-format, vocabulary/theme and phonics mappings. Correct Grade 8 tense declarations first.
4. **Fill Science and SMS detail gaps.** Use the unit-level evidence rather than replacing already-valid subject organisation.
5. **Audit practice questions against the corrected outcome map.** Check existence, quantity, grade difficulty, diagrams/audio and meaningful assessment. The current audit deliberately does not equate a manifest match with question-bank coverage.

Before making a book-core extension into compulsory grade content, reconcile any conflict with the authoritative curriculum version the app intends to follow. These supplied books mainly carry 2021 review and 2022 reprint labels; this comparison is against those files, not a claim that they settle every newer curriculum change.

## Evidence and limits

- All 33 books were text-extracted and inventoried. Every contents page needed for the chapter mapping was read; representative learning objectives and body pages were checked, including 54 visually reviewed PDF pages.
- The 4,663-page count is the **size of the source collection**, not a claim of exhaustive page-by-page visual review.
- The app side is the **local manifest snapshot**, including chapter prose, notes and subsections. No live database, deployed app or complete question-bank audit was performed.
- **Missing** means absent from the declared syllabus. **Partial** means a broad home exists but the detail/level is insufficiently specified. Generic umbrella chapters are not automatically credited as full coverage.
- No app syllabus or question file was changed.

## Deliverables

- [Detailed comparison: all 235 entries](<D:/git-repo/psac-practice/docs/book-syllabus-audit/detailed-comparison.md>)
- [Source inventory and app manifest links](<D:/git-repo/psac-practice/docs/book-syllabus-audit/sources.md>)
- [Machine-readable chapter mapping](<D:/git-repo/psac-practice/docs/book-syllabus-audit/chapter-mapping.json>)
- [App syllabus snapshot](<D:/git-repo/psac-practice/docs/book-syllabus-audit/app-syllabus-snapshot.json>)
- [Book inventory with source hashes](<D:/git-repo/psac-practice/docs/book-syllabus-audit/book-inventory.json>)
