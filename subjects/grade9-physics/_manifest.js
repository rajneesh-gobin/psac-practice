'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 - Physics   (NCE paper N530)
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
const G9PHY_SYLLABUS = {
  'g9s-p1-measurements': { subsections: [
    { id: 'si_units', name: 'SI units for length, mass, volume, time and temperature' },
    { id: 'measuring_instruments', name: 'Choosing the right instrument for each quantity' },
    { id: 'accuracy_of_instruments', name: 'Comparing the accuracy of simple instruments' },
    { id: 'measurement_errors', name: 'Parallax error and zero (end) error' },
  ] },
  'g9s-p2-light': { subsections: [
    { id: 'luminous_objects', name: 'Luminous and non-luminous objects' },
    { id: 'light_and_vision', name: 'Light and vision; stars, planets and moons' },
    { id: 'rectilinear_propagation', name: 'Light travels in straight lines in a uniform medium' },
    { id: 'reflection', name: 'Reflection of light' },
    { id: 'laws_of_reflection', name: 'The laws of reflection' },
    { id: 'ray_diagrams', name: 'Ray diagrams' },
    // Not a syllabus statement, but the 2021 paper asks it twice (Fig 1.5, 2.2).
    { id: 'refraction', name: 'Refraction: light bending between two media' },
  ] },
  'g9s-p3-energy': { subsections: [
    { id: 'conservation_of_energy', name: 'Conservation of energy in simple systems' },
    { id: 'energy_problems', name: 'Energy problems: falling objects and the pendulum' },
    { id: 'electricity_production', name: 'How electricity is produced' },
    { id: 'renewable_sources', name: 'Renewable energy sources' },
    { id: 'non_renewable_sources', name: 'Non-renewable energy sources' },
    { id: 'comparing_energy_sources', name: 'Polluting and non-polluting sources: advantages and drawbacks' },
    // The chapter is Energy, Heat & Temperature; the 2021 paper asks the
    // bimetallic strip (Fig 4.1) and no other subsection covers heat.
    { id: 'thermal_expansion', name: 'Heat and the expansion of solids' },
  ] },
  'g9s-p4-motion': { subsections: [
    { id: 'scalars_vectors', name: 'Scalars and vectors' },
    { id: 'distance_displacement', name: 'Distance and displacement' },
    { id: 'speed_velocity', name: 'Speed and velocity' },
    { id: 'acceleration', name: 'Acceleration' },
    { id: 'speed_time_graphs', name: 'Plotting and interpreting speed-time graphs' },
    { id: 'motion_problems', name: 'Problems on the motion of objects' },
  ] },
  'g9s-p5-electricity': { subsections: [
    { id: 'circuit_symbols', name: 'Circuit components and standard symbols' },
    { id: 'series_circuits', name: 'Setting up simple series circuits' },
    { id: 'measuring_current_voltage', name: 'Measuring current with an ammeter and voltage with a voltmeter' },
    { id: 'current_voltage_resistance', name: 'Current, voltage, emf and resistance' },
    { id: 'charge_and_current', name: 'Current as the rate of flow of charge: Q = It' },
    { id: 'potential_difference', name: 'Potential difference as work done per unit charge: W = QV' },
    { id: 'dc_circuit_problems', name: 'Problems on simple DC series circuits' },
  ] },
  'g9s-inquiry': { subsections: [
    { id: 'formula_rearrangement', name: 'Finding a missing quantity from a simple relationship' },
    { id: 'hypothesis_testing', name: 'Developing and testing a simple hypothesis' },
    { id: 'recording_data', name: 'Recording data in tables, diagrams, charts and graphs' },
    { id: 'interpreting_results', name: 'Processing, interpreting and evaluating results' },
    { id: 'lab_safety', name: 'Conducting investigations safely and cooperatively' },
    { id: 'reporting_findings', name: 'Communicating steps and results in reports and presentations' },
  ] },
  // ⚠ energy_and_society IS NOT A SECOND COPY OF P3. P3 owns the classification
  //   of sources; this owns what those choices cost the people who live with
  //   them. justifying_views is the one STS outcome no pack had claimed after
  //   the split - see the header of questions/sts_depth.js for the evidence.
  'g9s-sts': { subsections: [
    { id: 'optical_fibres', name: 'Optical fibres in medicine and communications' },
    { id: 'energy_and_society', name: 'Energy choices for society: supply, land, health and cost' },
    { id: 'justifying_views', name: 'Expressing and justifying views consistent with scientific evidence' },
  ] },
};

registerSubject({
  id: 'grade9-physics', name: 'Physics', grade: 9, icon: '⚛️',
  subject: 'Physics',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: false,
  practiceble: true, notesBased: false, level4Label: 'Applied Scenarios',
  syllabus: G9PHY_SYLLABUS,
  chapters: [
    { id: 'g9s-p1-measurements', name: 'P1 · Measurements', icon: '📏', examWeight: 9,
      syllabus: 'State the SI units for length, mass, volume, time and temperature. Use appropriate instruments to measure each quantity. Compare the accuracy of simple measuring instruments. Recognise parallax error and zero error.' },
    { id: 'g9s-p2-light', name: 'P2 · Light', icon: '💡', examWeight: 6,
      syllabus: 'Distinguish between luminous and non-luminous objects. Investigate the importance of light for vision. Show that light travels in straight lines in a uniform medium. Describe reflection and state the laws of reflection. Use ray diagrams to demonstrate reflection.' },
    { id: 'g9s-p3-energy', name: 'P3 · Energy, Heat & Temperature', icon: '🔥', examWeight: 6,
      syllabus: 'Solve problems on the conservation of energy in simple systems. Describe electricity production from renewable and non-renewable sources. Classify energy sources as polluting or non-polluting. Compare the advantages and drawbacks of each source.' },
    { id: 'g9s-p4-motion', name: 'P4 · Motion', icon: '🏃', examWeight: 9,
      syllabus: 'Distinguish between scalars and vectors. Define distance, displacement, speed, velocity and acceleration. Plot and interpret speed-time graphs. Recognise the nature of motion from a speed-time graph. Solve problems on the motion of objects.' },
    { id: 'g9s-p5-electricity', name: 'P5 · Electricity', icon: '⚡', examWeight: 6,
      syllabus: 'Recognise and draw circuit components using standard symbols. Set up simple series circuits. Measure current with an ammeter and voltage with a voltmeter. Understand current, voltage, electromotive force and resistance. Solve problems on direct current series circuits.' },
    { id: 'g9s-inquiry', name: 'Scientific Inquiry', icon: '🔍', examWeight: 2,
      syllabus: 'Develop a simple hypothesis and test it. Conduct investigations safely in cooperation with others. Record data using appropriate tables, diagrams, charts and graphs. Process, interpret and evaluate the results of an investigation. Communicate findings in written reports and oral presentations.' },
    { id: 'g9s-sts', name: 'Science, Technology & Society', icon: '🌍', examWeight: 2,
      syllabus: 'Evaluate critically the information obtained through searches and investigations. Express and justify views that are consistent with scientific evidence. Identify ethical issues associated with science and technology. Describe applications such as optical fibres in medicine and communications.' },
  ],
});
