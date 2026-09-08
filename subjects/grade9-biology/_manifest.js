'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 - Biology   (NCE paper N530)
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
const G9BIO_SYLLABUS = {
  'g9s-b1-circulatory': { subsections: [
    { id: 'circulatory_overview', name: 'Blood, the heart and the blood vessels' },
    { id: 'components_of_blood', name: 'Plasma, red cells, white cells and platelets' },
    { id: 'blood_vessels', name: 'Arteries, veins and capillaries: structure and function' },
    { id: 'magnification', name: 'Calculating the magnification of drawings of blood cells' },
    { id: 'pulse', name: 'Defining a pulse and locating a pulse point' },
    { id: 'cardiovascular_disease', name: 'Stroke and heart attack: contributing factors and prevention' },
    { id: 'interpreting_health_data', name: 'Interpreting graphs on cardiovascular disease' },
  ] },
  'g9s-b2-reproductive': { subsections: [
    { id: 'reproduction_basics', name: 'Defining reproduction and its importance' },
    { id: 'sexual_asexual', name: 'Sexual and asexual reproduction' },
    { id: 'male_reproductive_system', name: 'Parts and functions of the male reproductive system' },
    { id: 'female_reproductive_system', name: 'Parts and functions of the female reproductive system' },
    { id: 'stds', name: 'STDs, including HIV/AIDS and syphilis' },
    { id: 'interpreting_health_data', name: 'Interpreting graphs related to STDs' },
  ] },
  'g9s-b3-biodiversity': { subsections: [
    { id: 'what_is_biodiversity', name: 'What biodiversity is' },
    { id: 'importance_of_biodiversity', name: 'Why biodiversity matters' },
    { id: 'quadrat_sampling', name: 'Using quadrats to estimate species in an ecosystem' },
    { id: 'natural_threats', name: 'Natural calamities: cyclones and droughts' },
    { id: 'human_threats', name: 'Deforestation, pollution, habitat degradation and invasive alien species' },
  ] },
  'g9s-b4-plant-nutrition': { subsections: [
    { id: 'photosynthesis', name: 'Photosynthesis: how green plants make their food' },
    { id: 'word_equation', name: 'The word equation for photosynthesis' },
    { id: 'leaf_adaptation', name: 'How a leaf is adapted for photosynthesis' },
    { id: 'factors_for_photosynthesis', name: 'The factors essential for photosynthesis' },
    { id: 'photosynthesis_experiments', name: 'Simple experiments showing why those factors matter' },
  ] },
  'g9s-inquiry': { subsections: [
    { id: 'hypothesis_testing', name: 'Developing and testing a simple hypothesis' },
    { id: 'lab_safety', name: 'Conducting investigations safely and cooperatively' },
    { id: 'recording_data', name: 'Recording data in tables, diagrams, charts and graphs' },
    { id: 'interpreting_results', name: 'Processing, interpreting and evaluating results' },
    { id: 'reporting_findings', name: 'Communicating steps and results in reports and presentations' },
  ] },
  'g9s-sts': { subsections: [
    { id: 'christiaan_barnard', name: 'Heart transplant and the work of Christiaan Barnard' },
    { id: 'evaluating_information', name: 'Evaluating information from searches and investigations critically' },
    { id: 'ethics_of_science', name: 'Ethical issues in applications of science and technology' },
  ] },
};

registerSubject({
  id: 'grade9-biology', name: 'Biology', grade: 9, icon: '🧬',
  subject: 'Biology',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: false,
  practiceble: true, notesBased: false, level4Label: 'Applied Scenarios',
  syllabus: G9BIO_SYLLABUS,
  chapters: [
    { id: 'g9s-b1-circulatory', name: 'B1 · Blood Circulatory System', icon: '🫀', examWeight: 9,
      syllabus: 'State that the circulatory system consists of blood, the heart and the blood vessels. List the components of blood and outline their functions. Compare the structure of arteries, veins and capillaries. Relate the function of each blood vessel to its structure. Discuss cardiovascular disease and its prevention.' },
    { id: 'g9s-b2-reproductive', name: 'B2 · Reproductive System', icon: '👶', examWeight: 9,
      syllabus: 'Define reproduction and state its importance in living things. Distinguish between sexual and asexual reproduction. Identify and label the parts of the human reproductive systems. Understand sexually transmitted diseases and how they are prevented.' },
    { id: 'g9s-b3-biodiversity', name: 'B3 · Biodiversity', icon: '🦋', examWeight: 9,
      syllabus: 'Recognise the variety of living organisms. Classify organisms using observable characteristics. Explain the importance of biodiversity. Discuss threats to biodiversity and the need for conservation.' },
    { id: 'g9s-b4-plant-nutrition', name: 'B4 · Nutrition in Plants', icon: '🌱', examWeight: 9,
      syllabus: 'State that photosynthesis is the process by which green plants make their food. Write the word equation for photosynthesis. Describe how a leaf is adapted for photosynthesis. List the factors essential for photosynthesis. Carry out simple experiments to show the importance of these factors.' },
    { id: 'g9s-inquiry', name: 'Scientific Inquiry', icon: '🔍', examWeight: 2,
      syllabus: 'Develop a simple hypothesis and test it. Conduct investigations safely in cooperation with others. Record data using appropriate tables, diagrams, charts and graphs. Process, interpret and evaluate the results of an investigation. Communicate findings in written reports and oral presentations.' },
    { id: 'g9s-sts', name: 'Science, Technology & Society', icon: '🌍', examWeight: 2,
      syllabus: 'Evaluate critically the information obtained through searches and investigations. Express and justify views that are consistent with scientific evidence. Identify ethical issues associated with science and technology. Describe applications such as optical fibres in medicine and communications.' },
  ],
});
