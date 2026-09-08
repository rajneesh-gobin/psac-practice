# NCE Grade 9 — Science syllabus map

Source: `past-papers/syllabus/NCF 7 to 9_230524.pdf` (MIE, *Nine-Year Continuous
Basic Education · Teaching and Learning Syllabus · Grades 7 to 9*, 23 May 2024,
330 PDF pages).

## Page offset — measured, not assumed

**Offset = +6** (PDF page = printed page + 6). Derived by rendering PDF page 66
and reading its printed footer: **60**. Re-checked at every page below; the
footers run 60…75 across PDF 66…81 with no jump.

| | printed | PDF |
|---|---|---|
| §4.0 SCIENCE begins | 60 | 66 |
| §4.2.1 Grade 7 | 61 | 67 |
| §4.2.2 Grade 8 | 66 | 72 |
| **§4.2.3 Grade 9** | **70** | **76** |
| Science ends | 75 | 81 |
| §5.0 Social & Modern Studies begins | 76 | 82 |

**Pages visually inspected: 16 of 16 in range (PDF 66–81)**, rendered at 130 dpi
with `pdftoppm` and read as images. Text extraction was used only to locate the
range; every outcome below was read off the rendered page.

There is no §4.3 — the Science chapter is the Introduction (§4.1) plus the
per-grade outcome tables (§4.2), and nothing else. **The document contains no
assessment or exam-paper structure for Science**, so it cannot be cited as the
source of the NCE's three-paper split.

---

## How the document distinguishes the three grades

Each grade is one table headed *"By the end of Grade N, learners will be able
to:"* — first column the content area, second column bulleted specific learning
outcomes. **The grades differ in that first column, and that is the whole
finding:**

- **Grades 7 and 8** are organised by the **five unifying themes** of Figure 1
  (Models · Systems · Diversity · Interactions · Energy · Measurement), plus
  **Scientific Inquiry** and **Science, Technology and Society** as two extra
  rows. Biology, chemistry and physics content is deliberately mixed inside one
  theme — Grade 7 *Diversity* holds both `Elements, Compounds & Mixtures`
  (chemistry) and `Biodiversity` (biology).
- **Grade 9 abandons the themes entirely.** Its first column reads
  **Scientific Inquiry · Component 1: Chemistry · Component 2: Physics ·
  Component 3: Biology · Science, Technology and Society**.

## ⚠ Does the syllabus separate Biology, Chemistry and Physics? Yes — at Grade 9 only, and explicitly

The Introduction (printed 60 / PDF 66) says it in so many words: for Grade 9 the
syllabus gives clear indications of the Biology, Chemistry and Physics content
under **three different components referred to as B, C and P**, and states why —
*to allow learners to recognise the different components in view of helping them
for their subject choice at Grade 10 level*.

The Grade 9 table carries it through:

- Sub-topics are **numbered and prefixed in the source itself**: `C1:`…`C5:`,
  `P1:`…`P5:`, `B1:`…`B4:`. The repo's chapter prefixes are not an invention of
  this project — **they are the syllabus's own labels, verbatim.**
- Component order **in the table** is Chemistry (1), Physics (2), Biology (3),
  even though the prose names them "B, C and P".
- **Scientific Inquiry and STS sit OUTSIDE all three components** and carry no
  prefix. They are shared rows spanning the whole grade.

**What this means for the one-pack-vs-three-packs question.** The syllabus
splits the *content* three ways but publishes it as **one subject called
Science with one outcome table**, and frames the split as preparation for
Grade 10 subject choice rather than as three subjects. The three separate NCE
papers are an assessment fact this document does not state. So a single
`grade9-science` pack whose chapters carry the C/P/B prefixes is **faithful to
the source**, and those prefixes are exactly the handle needed to deal a
Biology-only, Chemistry-only or Physics-only paper later:

- C1–C5, P1–P5, B1–B4 partition the subject cleanly — 14 chapters, no overlap.
- `g9s-inquiry` and `g9s-sts` belong to **no component** and would have to be
  drawn into all three papers, or excluded from all three. That is the only
  genuine ambiguity, and it comes from the syllabus, not from the pack shape.

---

## Grade 9 content areas — 16 in total

Counting as the source's own headings do: 1 Scientific Inquiry + 5 Chemistry +
5 Physics + 4 Biology + 1 STS = **16**. Outcomes are condensed to their subject
matter; source wording is not reproduced at length.

### Scientific Inquiry — printed 70 / PDF 76
- Develop a simple hypothesis and test it
- Conduct investigations safely, in cooperation with others
- Record data using tables, diagrams, charts and graphs
- Process, interpret and evaluate the results of an investigation
- Apply simple mathematical relationships to find a missing quantity given the other two terms
- Communicate steps and results in written reports and oral presentations
- Use print and electronic resources (including the Internet) to collect information
- Use ICT to present information and results

Proposed subsections: `hypothesis_testing` · `lab_safety` · `recording_data` ·
`interpreting_results` · `formula_rearrangement` · `reporting_findings` ·
`research_and_ict`

---

### Component 1: Chemistry

#### C1 · The Atmosphere and Environment around us — printed 70 / PDF 76
- Causes and effects of water pollution; measures to prevent it
- Eutrophication and its harmful effects
- Identify air pollutants: carbon monoxide, oxides of nitrogen, sulfur dioxide, CFCs, smoke
- Sources and effects of those pollutants; measures to prevent air pollution
- Define greenhouse gases; identify carbon dioxide and methane as such; greenhouse gases retain heat energy
- Causes and harmful effects of **acid rain**
- Causes of global warming; increased absorption of heat by the atmosphere as its mechanism; relate global warming to **climate change**

Proposed subsections: `water_pollution` · `eutrophication` · `air_pollutants` ·
`greenhouse_gases` · `acid_rain` · `global_warming`

#### C2 · Mixtures and Separation Techniques — printed 70 / PDF 76
- Separate mixtures by **crystallization, sublimation and distillation** (these three only)
- Give labelled illustrations showing how each technique is carried out
- Describe the principles involved in each

⚠ **Chromatography is NOT in C2.** At Grade 9 it appears only under STS, as an
application. Filtration, decantation, evaporation and magnetic attraction are
**Grade 8** (printed 66–67 / PDF 72–73).

Proposed subsections: `crystallization` · `sublimation` · `distillation` ·
`apparatus_diagrams` · `choosing_a_technique`

#### C3 · Language of Chemistry — printed 71 / PDF 77
- Chemical reactions involve a rearrangement of atoms
- Work out formulae of compounds
- Convert word equations to chemical equations
- Write and balance chemical equations

Proposed subsections: `rearrangement_of_atoms` · `formulae_of_compounds` ·
`word_equations` · `balancing_equations`

#### C4 · Metals & Reactivity Series — printed 71 / PDF 77
- Reactions of metals with oxygen, acids, and water or steam; identify the products
- Write balanced equations for those reactions
- Infer **through experiments** that metals differ in reactivity
- Understand the reactivity series of metals
- Use the reactivity series to investigate and explain reactions with air, water and dilute acids

Proposed subsections: `metals_with_oxygen` · `metals_with_acids` ·
`metals_with_water_steam` · `reactivity_series` · `predicting_reactions` ·
`equations_for_metals`

#### C5 · Salts — printed 71 / PDF 77
- Define neutralisation
- Identify soluble and insoluble salts
- Importance of neutralisation: indigestion, insect stings, agriculture, **prevention of acid rain**
- Applications of named salts: sodium chloride (taste), ammonium sulfate and potassium nitrate (fertilisers), magnesium sulfate and sodium sulfate (laxatives), sodium bicarbonate (baking), sodium carbonate (glass), calcium sulfate (plaster of Paris)

Proposed subsections: `neutralisation` · `soluble_insoluble` ·
`neutralisation_in_daily_life` · `uses_of_salts`

---

### Component 2: Physics

#### P1 · Measurements — printed 72 / PDF 78
- SI units for length, mass, volume, time, temperature
- Use appropriate instruments for each
- Compare the accuracy of simple instruments
- Main types of error in length measurement: **parallax error** and **zero (end) error**

Proposed subsections: `si_units` · `measuring_instruments` ·
`accuracy_of_instruments` · `measurement_errors`

#### P2 · Light — printed 72 / PDF 78
- Luminous vs non-luminous objects, with examples
- Stars produce their own light; planets and moons reflect light from the sun
- Importance of light for vision
- Devise experiments showing light travels in straight lines in a uniform medium
- Reflection of light; the laws of reflection; ray diagrams

Proposed subsections: `luminous_objects` · `light_and_vision` ·
`rectilinear_propagation` · `reflection` · `laws_of_reflection` · `ray_diagrams`

#### P3 · Energy, Heat and Temperature — printed 72 / PDF 78
- Solve problems on conservation of energy in simple systems (falling objects, pendulum)
- Production of electricity from renewable and non-renewable sources
- Classify sources as polluting / non-polluting
- Compare the advantages and drawbacks of each

⚠ **The heading names heat and temperature; no outcome under it does.** There is
no calorimetry, no heat transfer and no temperature-scale outcome at Grade 9.
Heat/temperature content sits in Grade 7 Measurement (thermometers) and the
Grade 7/8 Energy rows.

Proposed subsections: `conservation_of_energy` · `energy_problems` ·
`electricity_production` · `renewable_sources` · `non_renewable_sources` ·
`comparing_energy_sources`

#### P4 · Motion — printed 73 / PDF 79
- Distinguish scalars and vectors, with examples
- Define distance, displacement, speed, velocity, acceleration
- Plot speed–time graphs for motion in a single direction
- Interpret speed–time graphs for motion along a straight line
- Recognise the nature of motion from a speed–time graph (at rest, constant speed, changing speed)
- Solve problems on the motion of objects

Proposed subsections: `scalars_vectors` · `distance_displacement` ·
`speed_velocity` · `acceleration` · `speed_time_graphs` · `motion_problems`

#### P5 · Electricity — printed 73 / PDF 79
- Recognise circuit components (cells, bulbs/lamps, switches, resistors)
- Draw circuits using standard conventions and symbols
- Set up simple series circuits
- Measure current with an ammeter; measure voltage with a voltmeter
- Understand current, voltage, emf and resistance
- Current as the rate of flow of charge; recall and use **Q = It**
- Potential difference as work done per unit charge moved between two points; recall and use **W = QV**
- Solve problems on simple DC series circuits

Proposed subsections: `circuit_symbols` · `series_circuits` ·
`measuring_current_voltage` · `current_voltage_resistance` · `charge_and_current` ·
`potential_difference` · `dc_circuit_problems`

---

### Component 3: Biology

#### B1 · Blood Circulatory System — printed 74 / PDF 80
- The system consists of blood, the heart and the blood vessels; the heart is a pump
- Four components of blood: plasma, red cells, white cells, platelets; the function of each
- **Calculate the magnification of drawings of blood cells**
- Compare arteries, veins and capillaries; relate function to structure
- Define a pulse and locate a pulse point
- Cardiovascular disease (stroke, heart attack); contributing factors and prevention
- Interpret data from graphs related to cardiovascular disease

Proposed subsections: `circulatory_overview` · `components_of_blood` ·
`blood_vessels` · `magnification` · `pulse` · `cardiovascular_disease` ·
`interpreting_health_data`

#### B2 · Reproductive System — printed 74 / PDF 80
- Define reproduction; state its importance in living things
- Distinguish the two modes: sexual and asexual
- Identify, label and give the main function of the parts of the male and female human reproductive systems
- Define STDs; examples including HIV/AIDS and syphilis
- Interpret data from graphs related to STDs

Proposed subsections: `reproduction_basics` · `sexual_asexual` ·
`male_reproductive_system` · `female_reproductive_system` · `stds` ·
`interpreting_health_data`

#### B3 · Biodiversity — printed 74 / PDF 80
- Simple understanding of biodiversity and its importance
- **Use quadrats to estimate and record the number of species in a given ecosystem**
- Biodiversity is affected by natural calamities such as cyclones and droughts
- Human activities affecting biodiversity: deforestation, pollution, habitat degradation, invasive alien species

⚠ **Classification of organisms is NOT in Grade 9 B3.** The five-kingdom,
vertebrate and flowering-plant classification outcomes are **Grade 7**
(printed 64 / PDF 70). The current chapter prose in the manifest imports them.

Proposed subsections: `what_is_biodiversity` · `importance_of_biodiversity` ·
`quadrat_sampling` · `natural_threats` · `human_threats`

#### B4 · Nutrition in Plants — printed 75 / PDF 81
- Photosynthesis is the process through which green plants manufacture their food
- Write down the word equation for photosynthesis
- Describe briefly how a leaf is adapted for photosynthesis
- List the factors essential for photosynthesis
- **Conduct simple laboratory experiments** showing the importance of those factors

Proposed subsections: `photosynthesis` · `word_equation` · `leaf_adaptation` ·
`factors_for_photosynthesis` · `photosynthesis_experiments`

---

### Science, Technology and Society — printed 75 / PDF 81
- Literature search on heart transplant, through the life and work of **Christiaan Barnard**; make a poster on him
- Applications of **distillation**: crude oil, air, essential oils from plants, distilleries
- Applications of **chromatography**: drugs in sport, pesticides in agriculture, contaminants in food, testing purity
- Causes of global warming and climate change; impacts and hazards; measures to combat it
- Use data to correlate rising global temperature with rising atmospheric carbon dioxide
- Evaluate critically the information obtained through searches and investigations
- Express and justify views consistent with scientific knowledge and claims
- Identify ethical issues associated with applications of science and technology
- **Optical fibres** in medicine and in communications technology

Proposed subsections: `christiaan_barnard` · `applications_of_distillation` ·
`applications_of_chromatography` · `climate_change` · `interpreting_climate_data` ·
`evaluating_information` · `ethics_of_science` · `optical_fibres`

---

## Practical / experimental outcomes — not assessable on a written paper

These need apparatus, a bench and observation. A written paper can test the
*method*, the *diagram* and the *expected result*, but not the act. A question
bank built from them must be authored as "describe / label / predict", never
"carry out".

| Area | Outcome that is inherently practical |
|---|---|
| Scientific Inquiry | conduct investigations safely in cooperation with others; develop and test a hypothesis |
| C2 | investigate separation by crystallization, sublimation, distillation |
| C4 | **infer through experiments** that metals differ in reactivity; investigate reactions with air, water, dilute acids |
| P1 | use instruments to measure length, mass, volume, time, temperature; compare their accuracy |
| P2 | **devise experiments** to show light travels in straight lines |
| P5 | set up simple series circuits; measure current with an ammeter and voltage with a voltmeter |
| B1 | calculate magnification of a drawing (presupposes microscope work); locate a pulse point |
| B3 | **use quadrats** to estimate species number in an ecosystem — fieldwork, not a lab |
| B4 | **conduct simple laboratory experiments** on the factors for photosynthesis |
| STS | carry out a literature search; make a poster on Christiaan Barnard |

Two of these are project/coursework-shaped rather than lab-shaped — the STS
poster and literature search, and the B3 quadrat fieldwork — and are the least
convertible of all.

---

## Mapping: syllabus content area → `subjects/grade9-science/_manifest.js`

The manifest holds 16 chapters. **Every Grade 9 content area maps to exactly one
chapter, and every chapter maps to exactly one content area — the
correspondence is 1:1 with no gaps in either direction.** That is unusual for
this project and follows directly from the pack having been built from this
table.

| Syllabus content area | printed / PDF | Chapter id | Chapter name | Accuracy of the chapter's `syllabus` prose |
|---|---|---|---|---|
| Scientific Inquiry | 70 / 76 | `g9s-inquiry` | Scientific Inquiry | Accurate. Omits "apply simple mathematical relationships to find a missing quantity" and the print/electronic research outcome. |
| C1 · The Atmosphere and Environment around us | 70 / 76 | `g9s-c1-atmosphere` | C1 · The Atmosphere & Environment Around Us | Accurate but thin: **acid rain and climate change are missing**, and the named pollutants (CO, NOx, SO₂, CFCs, smoke) are not listed. |
| C2 · Mixtures and Separation Techniques | 70 / 76 | `g9s-c2-mixtures` | C2 · Mixtures & Separation Techniques | Accurate. "Choose a suitable technique for a given mixture" is an addition, not a source outcome. |
| C3 · Language of Chemistry | 71 / 77 | `g9s-c3-language` | C3 · Language of Chemistry | Accurate and complete — all four outcomes present. |
| C4 · Metals & Reactivity Series | 71 / 77 | `g9s-c4-metals` | C4 · Metals & the Reactivity Series | Accurate. The source stresses *through experiments*; the prose drops that. |
| C5 · Salts | 71 / 77 | `g9s-c5-salts` | C5 · Salts | Accurate but generic — the source names seven salts and their uses; the prose says only "common salts", and omits acid-rain prevention. |
| P1 · Measurements | 72 / 78 | `g9s-p1-measurements` | P1 · Measurements | Accurate and complete. |
| P2 · Light | 72 / 78 | `g9s-p2-light` | P2 · Light | Accurate. Omits stars producing their own light / planets and moons reflecting it. |
| P3 · Energy, Heat and Temperature | 72 / 78 | `g9s-p3-energy` | P3 · Energy, Heat & Temperature | Accurate — and correctly carries **no** heat/temperature outcomes, matching a source heading that has none either. |
| P4 · Motion | 73 / 79 | `g9s-p4-motion` | P4 · Motion | Accurate and complete. |
| P5 · Electricity | 73 / 79 | `g9s-p5-electricity` | P5 · Electricity | Accurate. **Omits the two named formulae, `Q = It` and `W = QV`** — the only equations Grade 9 physics requires by name. |
| B1 · Blood Circulatory System | 74 / 80 | `g9s-b1-circulatory` | B1 · Blood Circulatory System | Accurate. Omits calculating magnification, defining/locating a pulse, and interpreting graph data. |
| B2 · Reproductive System | 74 / 80 | `g9s-b2-reproductive` | B2 · Reproductive System | Accurate. Omits the named examples (HIV/AIDS, syphilis) and graph interpretation. |
| B3 · Biodiversity | 74 / 80 | `g9s-b3-biodiversity` | B3 · Biodiversity | ⚠ **Partly wrong.** "Recognise the variety of living organisms" and "classify organisms using observable characteristics" are **Grade 7** content (printed 64 / PDF 70), not Grade 9 B3. Missing: **quadrat sampling**, and cyclones/droughts as natural threats. |
| B4 · Nutrition in Plants | 75 / 81 | `g9s-b4-plant-nutrition` | B4 · Nutrition in Plants | Accurate and complete. |
| Science, Technology and Society | 75 / 81 | `g9s-sts` | Science, Technology & Society | Accurate as far as it goes, but omits most of the row: Christiaan Barnard, applications of distillation, applications of **chromatography**, and the whole climate-change block including the CO₂/temperature correlation. |

**Syllabus areas with no chapter: none.**
**Chapters with no syllabus area: none.**

### Consequences worth acting on before questions are written

1. **`g9s-b3-biodiversity` is the one real defect.** Its prose describes Grade 7
   classification. Questions authored from it would test the wrong grade.
2. **Chromatography has no home in the pack's chemistry chapters**, because the
   syllabus puts it in STS and not in C2. It belongs in `g9s-sts` questions
   tagged `applications_of_chromatography`, not in `g9s-c2-mixtures`.
3. **`Q = It` and `W = QV` are the only named formulae in Grade 9 Physics** and
   are absent from the P5 chapter prose.
4. **Acid rain spans two chapters** — causes and effects in C1, prevention by
   neutralisation in C5. Both need the link, or a child meets it twice with
   nothing connecting the two.
5. **`g9s-inquiry` and `g9s-sts` belong to no exam component.** If per-paper
   practice is ever built, these two are the only chapters needing a rule.

### On `examWeight`

The manifest's weights (inquiry 2 · C1–C5 3 each · P1 2 · P2/P3 3 · P4/P5 4 ·
B1–B4 3 · STS 2) are **hand-set and not derivable from this document** — it
publishes learning outcomes only, with no mark allocation, no paper structure
and no weighting of any kind. No Grade 9 NCE paper is present in `past-papers/`
either. Treat the weights the way this project treats the Grade 4 packs:
unverified, and never described as measured.
