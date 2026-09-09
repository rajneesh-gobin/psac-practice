'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 - Chemistry   (NCE paper N530)
//
//  ⚠⚠ THE NCE ASSESSES SCIENCE AS THREE SEPARATE PAPERS, and this pack is one
//    of them. past-papers/nce/ holds science-biology, science-chemistry and
//    science-physics as three folders of independent 45-minute / 50-mark
//    papers, and docs/implenent.md asks for "Grade 9 Biology / Chemistry /
//    Physics" by name, adding that "generated exams, question banks, analytics
//    and teacher assignment filters must preserve the separate NCE subjects".
//    This content was first written as ONE grade9-science pack of 16 chapters;
//    it was split on 2026-09-08.
//
//  ⚠ CHAPTER AND QUESTION IDS KEEP THE g9s- PREFIX ON PURPOSE. They are stable
//    identifiers, the importer keys on them, and every one already exists as a
//    row in the questions table - renaming them would orphan 585 rows and
//    re-import them as duplicates. The prefix records where the content came
//    from; it does not mean the pack is still combined.
//
//  ⚠ SCIENTIFIC INQUIRY AND STS ARE CROSS-CUTTING and were split by subject
//    affinity, not duplicated - a question exists once, in one pack, so no id
//    collides. Each pack therefore carries only PART of those two chapters and
//    declares only the subsections it actually holds. Filling each pack's
//    inquiry and STS coverage back to full is real remaining work, recorded in
//    docs/nce-grade9/progress.md.
//
//  ⚠ examWeight PRESERVES THE MEASURED PROPORTIONS of the combined pack: each
//    science held 12 of 40 there and now carries a whole paper, so those
//    figures are scaled x3 to 36, with Inquiry and STS keeping their measured
//    2 + 2. The sum is exactly 40. A sum over 40 is not cosmetic:
//    assembleExamPaper() sheds the surplus off the FIRST chapter in list order,
//    so one chapter gets starved while the paper still totals 40 and every
//    test passes.
// ══════════════════════════════════════════════════════════════════════════

// ⚠ UNIQUELY NAMED. scripts/build-subject-index.js executes every manifest in
// ONE shared context, so a bare `const SYLLABUS` in three packs throws
// "Identifier already declared" - the same collision CLAUDE.md records for
// CHAPTERS. Every pack names its map after itself.
const G9CHEM_SYLLABUS = {
  'g9s-c1-atmosphere': { subsections: [
    { id: 'water_pollution', name: 'Causes and effects of water pollution, and how to prevent it' },
    { id: 'eutrophication', name: 'Eutrophication and its harmful effects' },
    { id: 'air_pollutants', name: 'Air pollutants: carbon monoxide, oxides of nitrogen, sulfur dioxide, CFCs and smoke' },
    { id: 'greenhouse_gases', name: 'Greenhouse gases: carbon dioxide, methane and heat retention' },
    { id: 'acid_rain', name: 'Causes and harmful effects of acid rain' },
    { id: 'global_warming', name: 'Global warming, its mechanism, and climate change' },
  ] },
  'g9s-c2-mixtures': { subsections: [
    { id: 'distillation', name: 'Distillation' },
    { id: 'crystallization', name: 'Crystallization' },
    { id: 'sublimation', name: 'Sublimation' },
    { id: 'apparatus_diagrams', name: 'Labelled illustrations of each technique' },
    { id: 'choosing_a_technique', name: 'Choosing a technique, and the principle behind it' },
  ] },
  'g9s-c3-language': { subsections: [
    { id: 'rearrangement_of_atoms', name: 'Chemical reactions as a rearrangement of atoms' },
    { id: 'formulae_of_compounds', name: 'Working out formulae of compounds' },
    { id: 'word_equations', name: 'Converting word equations to chemical equations' },
    { id: 'balancing_equations', name: 'Writing and balancing chemical equations' },
  ] },
  'g9s-c4-metals': { subsections: [
    { id: 'metals_with_oxygen', name: 'Reactions of metals with oxygen' },
    { id: 'metals_with_acids', name: 'Reactions of metals with acids' },
    { id: 'metals_with_water_steam', name: 'Reactions of metals with water and steam' },
    { id: 'reactivity_series', name: 'The reactivity series of metals' },
    { id: 'predicting_reactions', name: 'Using the reactivity series to explain reactions with air, water and dilute acids' },
    { id: 'equations_for_metals', name: 'Balanced equations for reactions of metals' },
  ] },
  'g9s-c5-salts': { subsections: [
    { id: 'neutralisation', name: 'Defining neutralisation' },
    { id: 'soluble_insoluble', name: 'Soluble and insoluble salts' },
    { id: 'neutralisation_in_daily_life', name: 'Neutralisation in indigestion, insect stings, agriculture and acid rain' },
    { id: 'uses_of_salts', name: 'Applications of named salts' },
  ] },
  'g9s-inquiry': { subsections: [
    { id: 'hypothesis_testing', name: 'Developing and testing a simple hypothesis' },
    { id: 'lab_safety', name: 'Conducting investigations safely and cooperatively' },
    { id: 'recording_data', name: 'Recording data in tables, diagrams, charts and graphs' },
    { id: 'interpreting_results', name: 'Processing, interpreting and evaluating results' },
    { id: 'reporting_findings', name: 'Communicating steps and results in reports and presentations' },
    { id: 'research_and_ict', name: 'Using print, electronic and ICT resources' },
  ] },
  'g9s-sts': { subsections: [
    { id: 'applications_of_distillation', name: 'Distillation: crude oil, air, essential oils and distilleries' },
    { id: 'applications_of_chromatography', name: 'Chromatography: drugs in sport, pesticides, food contaminants and purity' },
    { id: 'climate_change', name: 'Global warming and climate change: impacts, hazards and measures' },
    { id: 'interpreting_climate_data', name: 'Correlating global temperature with atmospheric carbon dioxide' },
  ] },
};

registerSubject({
  id: 'grade9-chemistry', name: 'Chemistry', grade: 9, icon: '🧪',
  subject: 'Chemistry',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: false,
  practiceble: true, notesBased: false, level4Label: 'Applied Scenarios',
  syllabus: G9CHEM_SYLLABUS,
  chapters: [
    { id: 'g9s-c1-atmosphere', name: 'C1 · The Atmosphere & Environment Around Us', icon: '🌍', examWeight: 9,
      syllabus: 'Describe the causes and effects of water pollution. Explain eutrophication and its harmful effects. Identify the main air pollutants and their sources. Define greenhouse gases and relate them to global warming. Discuss measures to prevent air and water pollution.' },
    { id: 'g9s-c2-mixtures', name: 'C2 · Mixtures & Separation Techniques', icon: '⚗️', examWeight: 6,
      syllabus: 'Separate mixtures by crystallisation, sublimation and distillation. Draw labelled diagrams showing how each technique is carried out. Explain the principle behind each method. Choose a suitable technique for a given mixture.' },
    { id: 'g9s-c3-language', name: 'C3 · Language of Chemistry', icon: '🧪', examWeight: 9,
      syllabus: 'Recognise that chemical reactions involve a rearrangement of atoms. Work out the formulae of compounds. Convert word equations into chemical equations. Write and balance chemical equations.' },
    { id: 'g9s-c4-metals', name: 'C4 · Metals & the Reactivity Series', icon: '🔩', examWeight: 9,
      syllabus: 'Describe the reactions of metals with oxygen, acids, water and steam. Write balanced equations for these reactions. Infer that different metals differ in reactivity. Use the reactivity series to explain and predict reactions.' },
    { id: 'g9s-c5-salts', name: 'C5 · Salts', icon: '🧂', examWeight: 3,
      syllabus: 'Define a neutralisation reaction. Identify soluble and insoluble salts. Appreciate the importance of neutralisation in everyday life. State the applications of common salts.' },
    { id: 'g9s-inquiry', name: 'Scientific Inquiry', icon: '🔍', examWeight: 2,
      syllabus: 'Develop a simple hypothesis and test it. Conduct investigations safely in cooperation with others. Record data using appropriate tables, diagrams, charts and graphs. Process, interpret and evaluate the results of an investigation. Communicate findings in written reports and oral presentations.' },
    { id: 'g9s-sts', name: 'Science, Technology & Society', icon: '🌍', examWeight: 2,
      syllabus: 'Evaluate critically the information obtained through searches and investigations. Express and justify views that are consistent with scientific evidence. Identify ethical issues associated with science and technology. Describe applications such as optical fibres in medicine and communications.' },
  ],
});
