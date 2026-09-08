# Grade 9 ICT — MIE NCF Grades 7–9 syllabus map

Source: `past-papers/syllabus/NCF 7 to 9_230524.pdf` (330 pages, Adobe InDesign 19.1,
created 2024-05-23). Section **8.0 Information and Communication Technology**.

## Page offset — measured, not assumed

**PDF page 134 carries the printed footer `128`. The offset is therefore +6**
(printed + 6 = PDF). Verified again at the far end: PDF 151 → footer `145`, and
PDF 152 opens `9.0 PHYSICAL EDUCATION` with footer `146`.

| | printed | PDF |
|---|---|---|
| ICT section | 128–145 | **134–151** |
| Physical Education begins | 146 | 152 |

**All 18 PDF pages (134–151) were rendered at 150 dpi and visually inspected**, one
by one. This was not optional: the §8.5 tick-grid and the §8.7 three-column ACL
tables both lose their column alignment in `pdftotext`, which emits every checkmark
in one undifferentiated block detached from its row. Level assignments and grade
ticks in this document come from the rendered pages, never from extracted text.

## How the document separates Grades 7, 8 and 9

Four different mechanisms, and **they do not all mean the same thing**:

| § | printed pp. | Shape | Grade meaning |
|---|---|---|---|
| 8.3 Expected Learning Outcomes | 129 | One list | **Phase terminal outcome** — stated only "By the end of Grade 9" |
| 8.4 Specific Learning Outcomes | 129–130 | Three bullet lists | **New at that grade** |
| 8.5 Scope and Sequence | 130–134 | One table, tick columns 7 / 8 / 9 | **CUMULATIVE** |
| 8.6 Content Areas & SLOs | 135–138 | One table per grade | **New at that grade** |
| 8.7 Achievement Criteria & Levels | 139–145 | One table per grade × 3 cognitive levels | **New at that grade**, graded by level |

> ⚠ **The §8.5 scope table is cumulative, and this is the single most important
> structural fact in the section.** Every Grade 7 row carries a tick in columns 7,
> **8 and 9**; every Grade 8 row carries a tick in 8 **and 9**. Verified on all five
> tick pages (PDF 136–140). "Distinguish between hardware and software" — a Grade 7
> outcome — is ticked at Grade 9.
>
> So **a Grade 9 learner is accountable for the whole three-year corpus**, not for
> §8.6.3's short "new at Grade 9" list. The real NCE papers confirm it: 2025 Q1
> asks input devices, bits in a byte, RAM vs ROM — all Grade 7/8 rows. A
> `grade9-ict` pack built from §8.6.3 alone would miss most of what the exam asks.

### Level scale (§8.7, printed 138)
Level 1 Knowledge and Comprehension · Level 2 Application · Level 3 Analysis.

⚠ **Do not map these onto the project's difficulty 1–4 mechanically.** The document
places "Apply advanced formatting, formulae and function" at **Level 3** and "Write
computer programs for simple problems" at **Level 2**, while "Draw flowcharts" sits
at Level 3. The ACL level records which content area column an outcome was typed
into, not a reliable cognitive ladder.

### Defects in the source, recorded so nobody re-derives them
- **§8.6.3 "Grade 9" is headed "By the end of Grade 8, learners should be able to:"**
  on both its pages (PDF 143 and 144). A typo; the section number and the §8.5 ticks
  both confirm the content is Grade 9.
- **§8.6.2 Grade 8 swaps the Spreadsheet and Presentation rows** (PDF 142, printed
  136): "Spreadsheet" is given speaker notes / Notes Page view / Print Preview, and
  "Presentation" is given filtering and sorting. §8.7.2 (PDF 148) has them the right
  way round.
- **"Write computer programs for simple problems" appears twice** in §8.5 (PDF 140) —
  once correctly under *Practical problem solving and programming* and once under
  *Databases*.
- **§8.5's running row-header says "Computer Operations and Fundamentals" on every
  page**, including the pages whose actual band headers are Internet, Multimedia and
  Databases. A layout artefact; text extraction propagates it.
- **"Analyse the key features in a data protection act"** is a Grade 9 outcome in
  §8.5 and §8.6.3 but is **absent from the §8.7.3 ACL table**, which instead
  introduces **"Discuss the importance of data backups"** — an outcome that appears
  in neither §8.5 nor §8.6.3. Treat both as in scope.

---

## Grade 9 content areas and learning outcomes

**Nine content areas.** Each is given below as: what is **new at Grade 9** (§8.6.3 /
§8.7.3, with ACL level in brackets), then what **carries forward** from Grades 7–8
via the cumulative §8.5 ticks — because the exam draws on both.

### 1. Computer Operations and Fundamentals
New at Grade 9:
- List the different types of operating systems `[L1]`
- Demonstrate an understanding of basic troubleshooting techniques `[L1]`
- List the steps in troubleshooting a particular computer system problem `[L2]`
- Discuss the functions of an operating system `[L3]`

Carried forward (ticked at 9): hardware vs software; components of a computer
system; types of computers; unit of measurement of CPU speed; computer peripherals;
application vs system software; binary data; units of measurement of storage
devices; features of input and output devices; different storage devices; primary
vs secondary storage.

*(§8.4 also credits Grade 9 with "Utility programmes", a term the §8.5/§8.6/§8.7
tables never repeat.)*

### 2. Word Processing
New at Grade 9:
- Explain the advantages of mail merge for generating multiple copies `[L1]`
- Explain the purpose and procedure of auto-generating a table of content and list of figures/tables `[L1]`
- Generate a common document adapted for multiple recipients using mail-merge `[L2]`
- Work with Styles `[L2]`
- Automatically generate a table of contents `[L2]`
- Automatically generate a list of figures and a list of tables `[L2]`
- Use mail merge to produce multiple copies to fit multiple recipients in a fictitious or real context `[L3]`
- Produce a document with table of contents, list of figures, tables to meet a particular purpose `[L3]`

Carried forward: image properties and placement; drawings and shapes; multiple
documents; additional formatting (page/section breaks, tabs, indents, ruler, format
painter, page colour, watermark, multi-column); tables and text↔table conversion.

### 3. Spreadsheet
New at Grade 9:
- Apply advanced Formatting, Formulae and Functions `[L3]`

*(The ACL gives Spreadsheet **no** Level 1 or Level 2 entry at Grade 9 — the row is
a single L3 cell.)*

Carried forward: work with formulae (select an appropriate formula, enter its
parameters); apply filtering and sorting.

### 4. Presentation
New at Grade 9:
- Use title and slide master to create a presentation `[L2]`
- Apply design templates `[L3]`
- Apply multiple slide masters `[L3]`

Carried forward: charts and tables; advanced animations; notes and handouts;
speaker notes; Notes Page view; Print Preview.

### 5. Internet
New at Grade 9:
- Distinguish between types of network by size & purpose — PAN, LAN, MAN, WAN, SAN, VPN `[L1]`
- List network components and explain their importance — NIC, modem, Wifi, router, firewall, ISP `[L1]`
- Show an understanding of web tools — video/audio conferencing, podcasting, vodcasting, wiki, blog, social networking, chat, forum `[L1]`
- Show an understanding of simple web design principles for user-friendliness `[L1]`
- Propose network components for a particular network `[L2]`
- Engage in e-discussion using web tools `[L2]`
- Create a user-friendly website that also includes multimedia elements `[L3]`
- Distinguish between network topologies — bus, ring, star, mesh, tree `[L3]`
- Differentiate between an Intranet and an Extranet `[L3]`

Carried forward: define a computer network; benefits and disadvantages of a network;
Internet vs WWW; email and email vs postal mail; web resources have addresses; web
browser, URL, search engine; refined keyword searches; browser History; search
engine vs meta-search engine and when to use one; cable-based vs wireless, and
choosing between them for a context.

### 6. Multimedia
New at Grade 9:
- Show an understanding of how to create an educational comic strip using ICT `[L1]`
- Develop a plan for creating a comic strip, e.g. a hand-drawn storyboard `[L2]`
- Use an appropriate authoring tool to assemble and sequence cartoons `[L2]`
- Produce a comic strip to fit a purpose `[L3]`

Carried forward: create a simple animated clip; enhance a video with learner-recorded
narration and overlay text.

### 7. Health, Safety and Ethics
New at Grade 9:
- Discuss the importance of data backups `[L1]`
- Define ownership, copyright & plagiarism of Internet resources `[L1]`
- Distinguish between ownership and copyright `[L1]`
- Show an understanding of how to avoid accidental plagiarism when using Internet sources `[L1]`
- Explain the potential health hazards related to the prolonged use of ICT equipment `[L2]`
- Discuss how to prevent the health hazards when using ICT equipment `[L2]`
- Analyse the potential dangers of the Internet `[L3]`
- Analyse the key features in a data protection act *(§8.5 + §8.6.3; absent from the ACL)*

Carried forward: social and economic effects of computer use; computer laboratory
guidelines, rules and regulations; safety precautions with ICT tools; proper care of
equipment; computer ethics, information privacy, security of data; threats to data
security; keeping data secure; software piracy, computer crime and hacking.

### 8. Practical problem solving and programming
New at Grade 9:
- Write computer programs for simple problems `[L2]`
- Draw flowcharts to solve simple problems `[L3]`
- Dry run flowcharts `[L3]`

Carried forward: create a sequence of instructions in a visual programming language
such as Scratch/Logo; perform mathematical calculations and modelling; identify and
use flowchart symbols.

### 9. Database
New at Grade 9:
- Create queries, form and reports `[L2]`

Carried forward: structure of a database; create and modify a database structure;
create a database table; enter, modify and delete data in a table.

---

## Practical vs theoretical — what can actually be assessed

The syllabus is written in the imperative of a computer lab ("Create a website",
"Produce a comic strip"). **The NCE assessment is not.**

Measured across the five papers in `past-papers/nce/ict/` (2021, 2021-2022, 2023,
2024, 2025): every one is `INFORMATION AND COMMUNICATIONS TECHNOLOGY (N540)`,
**1 hour 45 minutes, 100 marks, "Candidates answer on the Question Paper", no
calculators, answer ALL questions.** There is no practical or lab component in
these papers. Structure is stable from 2023 onward:

| | 2023 | 2024 | 2025 |
|---|---|---|---|
| Section A | Q1 **15** (MCQ, 1 mark each) · Q2 10 · Q3 10 · Q4 10 · Q5 5 | same | same |
| Section B | Q6 5 · Q7 8 · Q8 9 · Q9 10 · Q10 8 · Q11 10 | Q6 5 · Q7 6 · Q8 10 · Q9 9 · Q10 9 · Q11 11 | Q6 5 · Q7 7 · Q8 9 · Q9 9 · Q10 10 · Q11 10 |

(2021 is the outlier: 9 questions, still 100 marks / 1h45.)

So the productive split is not practical-vs-theoretical but **"is it assessable on
paper?"** — and almost all of it is, because the paper tests software skills
*declaratively*: 2025 asks which sign starts a spreadsheet formula, which feature
duplicates a cell, names the installed operating system from a screenshot, has the
candidate **complete a query-by-example grid** and **complete a flowchart**.

| Category | Content areas | Verdict for this app |
|---|---|---|
| **Theoretical throughout** | Computer Operations & Fundamentals · Internet (networks, topologies, web concepts) · Health, Safety & Ethics | Fully assessable. MCQ/TF/text. These are also the densest Section A material. |
| **Practical skill, examined declaratively** | Word Processing · Spreadsheet · Presentation · Database | Fully assessable *as written*: name the feature, read a screenshot, state the formula, complete a QBE grid, order the steps. **Assess the knowledge of the tool, never require the tool.** |
| **Genuinely procedural / algorithmic** | Practical problem solving & programming | Assessable and valuable: flowchart symbol identification, completing a flowchart, dry-running a program to a final value. Dry-run answers are `numeric` or short `text` — a good fit. |
| **Artefact production — NOT assessable here** | Create a website · Produce a comic strip · Produce a video · Create an animated clip · Engage in e-discussions | A written paper cannot mark these either, and neither can we. Cover the **planning and principles** (storyboard, sequencing, web-design principles for user-friendliness, choice of authoring tool) and drop the making. |

⚠ The artefact outcomes are a real share of the Grade 9 "new" list — 5 of roughly 30
new outcomes. Writing a chapter that promises "Create a website" and then delivers
multiple-choice questions about `<h1>` would misrepresent the syllabus; scope those
chapters to design principles and evaluation, and say so in the chapter `syllabus`
prose.

---

## Proposed subsection ids, per content area

House style: `lowercase_with_underscores`. Declared ids and tagged ids must match
exactly per chapter — the invariant `scripts/test-subsection-invariant.js` enforces.
Aim for ≥ 20 questions behind each, per `audit-content-coverage.js`.

**Computer Operations and Fundamentals**
`hardware_software` · `system_components` · `computer_types` · `cpu_speed` ·
`peripherals` · `input_output` · `storage_devices` · `primary_secondary` ·
`binary_data` · `os_functions` · `os_types` · `utility_programs` · `troubleshooting`

**Word Processing**
`images_shapes` · `document_formatting` · `page_section_breaks` · `tables_text` ·
`multiple_documents` · `styles` · `mail_merge` · `toc_lists`

**Spreadsheet**
`formulae_basics` · `cell_references` · `functions` · `filter_sort` ·
`advanced_formatting` · `charts_from_data`

**Presentation**
`charts_tables` · `animations` · `notes_handouts` · `print_preview` ·
`design_templates` · `slide_masters`

**Internet**
`network_basics` · `network_types` · `network_topologies` · `network_components` ·
`wired_wireless` · `intranet_extranet` · `internet_www` · `email` ·
`browsers_urls` · `search_engines` · `meta_search` · `web_tools` ·
`web_design_principles`

**Multimedia**
`animated_clips` · `video_enhancement` · `comic_strips` · `storyboarding` ·
`authoring_tools`

**Health, Safety and Ethics**
`lab_guidelines` · `safety_precautions` · `equipment_care` · `health_hazards` ·
`hazard_prevention` · `computer_ethics` · `information_privacy` · `data_security` ·
`data_backups` · `data_protection_act` · `copyright_ownership` · `plagiarism` ·
`internet_dangers` · `social_economic_effects`

**Practical problem solving and programming**
`visual_programming` · `flowchart_symbols` · `drawing_flowcharts` · `dry_running` ·
`simple_programs` · `maths_modelling`

**Database**
`db_structure` · `db_tables` · `data_entry` · `queries` · `forms_reports`

---

## Proposed chapter list for a new `grade9-ict` pack

**13 chapters.** Ids `g9ict-<topic>`, matching the `g9s-*` convention in
`subjects/grade9-science/_manifest.js`. Two content areas are split, both because
the exam treats the halves as separate questions: Computer Operations splits into
hardware and software/OS, and Health/Safety/Ethics splits into physical safety and
law/ethics. Programming splits from flowcharts for the same reason — the papers
carry a whole flowchart question of its own.

| id | name | icon | Content area(s) | Subsections |
|---|---|---|---|---|
| `g9ict-hardware` | Computer Systems & Hardware | 💻 | Computer Ops & Fundamentals | `hardware_software` `system_components` `computer_types` `cpu_speed` `peripherals` `input_output` `storage_devices` `primary_secondary` `binary_data` |
| `g9ict-software-os` | Software & Operating Systems | ⚙️ | Computer Ops & Fundamentals | `os_functions` `os_types` `utility_programs` `troubleshooting` |
| `g9ict-word` | Word Processing | 📄 | Word Processing | `images_shapes` `document_formatting` `page_section_breaks` `tables_text` `multiple_documents` `styles` `mail_merge` `toc_lists` |
| `g9ict-spreadsheet` | Spreadsheets | 📊 | Spreadsheet | `formulae_basics` `cell_references` `functions` `filter_sort` `advanced_formatting` `charts_from_data` |
| `g9ict-presentation` | Presentations | 📽️ | Presentation | `charts_tables` `animations` `notes_handouts` `print_preview` `design_templates` `slide_masters` |
| `g9ict-networks` | Networks & Topologies | 🌐 | Internet | `network_basics` `network_types` `network_topologies` `network_components` `wired_wireless` `intranet_extranet` |
| `g9ict-internet-web` | Internet, Web & Communication | 🔎 | Internet | `internet_www` `email` `browsers_urls` `search_engines` `meta_search` `web_tools` `web_design_principles` |
| `g9ict-multimedia` | Multimedia & Comic Strips | 🎬 | Multimedia | `animated_clips` `video_enhancement` `comic_strips` `storyboarding` `authoring_tools` |
| `g9ict-health-safety` | Health, Safety & Lab Practice | 🦺 | Health, Safety & Ethics | `lab_guidelines` `safety_precautions` `equipment_care` `health_hazards` `hazard_prevention` |
| `g9ict-ethics-law` | Ethics, Privacy & the Law | ⚖️ | Health, Safety & Ethics | `computer_ethics` `information_privacy` `data_security` `data_backups` `data_protection_act` `copyright_ownership` `plagiarism` `internet_dangers` `social_economic_effects` |
| `g9ict-flowcharts` | Algorithms & Flowcharts | 🔀 | Practical problem solving | `flowchart_symbols` `drawing_flowcharts` `dry_running` |
| `g9ict-programming` | Programming & Computational Thinking | 🧩 | Practical problem solving | `visual_programming` `simple_programs` `maths_modelling` |
| `g9ict-database` | Databases & Queries | 🗄️ | Database | `db_structure` `db_tables` `data_entry` `queries` `forms_reports` |

Notes on the list:
- **No enrichment / ✨ BONUS chapter is proposed.** Every content area above is
  examined. The project's own rule applies: a gold BONUS card tells a child a
  yearly exam topic is optional.
- `comingSoon: true` stays set until real questions exist, exactly as
  `grade9-science` does. Real chapters are not on their own a reason to flip it.
- The `syllabus` prose per chapter should be written from the §8.6.3 + §8.7.3
  outcomes above **plus** the carried-forward Grade 7/8 rows, because §8.5 ticks
  them at Grade 9.
- ICT is a **sixth subject** at this level. The existing Grade 7–9 registration
  (English, Français, Mathematics, Science, Social & Modern Studies) does not
  include it, and `CLAUDE.md`'s "15 packs, 159 chapters" count for 7–9 predates
  this. Adding `grade9-ict` means re-running `node scripts/build-subject-index.js`.

### Where the exam weight must come from

⚠ **Do not derive `examWeight` from the syllabus.** The §8.5 tick grid is a coverage
map, not a mark allocation — it would weight Word Processing far above its real
share simply because that content area has the most rows, and it cannot distinguish
the 15 recall marks of Q1 from a 10-mark database question.

Derive it the way the ten weighted PSAC packs were done: **read each paper question
by question and give every mark to the chapter that teaches it**, then record the
mark map in `scripts/exam-mark-maps.json` and generate the comment block above
`chapters:` from it.

- **Use at least three papers.** ICT is topic-rotating like Science and History, not
  fixed like the language papers — Section B question topics move year to year. The
  five available papers (2021, 2021-2022, 2023, 2024, 2025) are enough; prefer
  **2023 + 2024 + 2025**, which share an identical 11-question structure, and treat
  2021 (9 questions) as a cross-check rather than folding it in.
- **Total 300 marks over the three papers.** One chapter's weight is its share of
  that, scaled to the 40-question exam the engine deals.
- **Q1's 15 MCQs must be attributed individually**, not to one chapter. In 2025 they
  span input devices, byte size, cooling, RAM/ROM, bus topology, spreadsheet
  formulae, database records — five or six different chapters in one question.
- Expect the measured result to **over-weight `g9ict-hardware` and
  `g9ict-ethics-law` relative to their syllabus size**, and to **under-weight the
  artefact-production outcomes** — a website is described in the syllabus and barely
  reachable on a written paper. That asymmetry is the whole reason to measure.
- A chapter the exam pool cannot reach comes out of the denominator too.

---

## Verification record

- Offset derived by reading printed footers on rendered pages, not assumed: PDF 134 → `128`, PDF 151 → `145`, PDF 152 → `146`.
- 18/18 PDF pages in range (134–151) rendered at 150 dpi and read as images.
- Grade tick columns read from the rendered grid on PDF 136, 137, 138, 139, 140.
- ACL Grade 9 level assignments read from the rendered three-column tables on PDF 149, 150, 151.
- Paper structure counted from `pdftotext` of the five PDFs in `past-papers/nce/ict/`.
- No table in the range was illegible at 150 dpi; no re-render at higher dpi was needed.
