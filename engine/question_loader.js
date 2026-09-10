'use strict';
// ══════════════════════════════════════════════
//  Question Loader
//  Production (Netlify):  fetches from /.netlify/functions/questions
//                         so the raw JS files never reach the browser.
//  Local dev (file://):   dynamically injects the question <script> tags
//                         so you can test without running a server.
//  Local dev (netlify dev / localhost:8888): uses the function - same as prod.
// ══════════════════════════════════════════════

const QuestionLoader = (() => {
  const _done = new Set();

  // file:// → local development without any server
  const _isFileProtocol = location.protocol === 'file:';

  // Question file paths per subject - only used in file:// mode.
  //
  // ⚠ HAND-MAINTAINED AND PRONE TO DRIFT. Production auto-discovers every file
  //   in subjects/<id>/questions/ via the Netlify function, so a file missing
  //   from this list works in prod but is silently invisible under file://.
  //   This list had drifted for 4 packs (8 chapters) before it was corrected.
  //
  // ✅ RECOMMENDED: don't use file:// at all. Run `netlify dev` and you get the
  //   same auto-discovering /.netlify/functions/questions endpoint as
  //   production, and this list is bypassed entirely. Keep it only as a
  //   zero-tooling fallback.
  //
  //   To check for drift:
  //     compare `ls subjects/*/questions/*.js` against the entries below.
  const LOCAL_FILES = {
    // ── Placeholder packs (comingSoon: true) ──────────────────────────────
    // Listed for completeness only. loadForStudent() filters comingSoon packs
    // out before it gets here, so nothing below is ever fetched for a child;
    // the entries exist so this list matches `ls subjects/*/questions/*.js`
    // and the drift check in the comment above stays usable.
    'grade1-maths': ['subjects/grade1-maths/questions/ch01_numbers.js',
                     'subjects/grade1-maths/questions/ch02_addition.js',
                     'subjects/grade1-maths/questions/ch03_subtraction.js',
                     'subjects/grade1-maths/questions/ch04_shapes.js',
                     'subjects/grade1-maths/questions/ch04_shapes_visual.js',
                     'subjects/grade1-maths/questions/ch05_measurement.js',
                     'subjects/grade1-maths/questions/ch06_patterns.js',
                     'subjects/grade1-maths/questions/ch07_time.js',
                     'subjects/grade1-maths/questions/ch08_money.js',
                     'subjects/grade1-maths/questions/ch09_ordinals.js',
                     'subjects/grade1-maths/questions/reasoning_bank.js',
                     'subjects/grade1-maths/questions/reclaimed_sample.js',
                     'subjects/grade1-maths/questions/ch10_visual.js'],
    'grade1-english': ['subjects/grade1-english/questions/ch01_listening.js',
                       'subjects/grade1-english/questions/ch02_speaking.js',
                       'subjects/grade1-english/questions/ch03_reading.js',
                       'subjects/grade1-english/questions/ch04_writing.js',
                       'subjects/grade1-english/questions/ch05_grammar.js',
                       'subjects/grade1-english/questions/ch06_phonics.js',
                       'subjects/grade1-english/questions/reclaimed_sample.js',
                       'subjects/grade1-english/questions/ch07_visual.js'],
    'grade1-french': ['subjects/grade1-french/questions/ch01_comprehension_orale.js',
                      'subjects/grade1-french/questions/ch02_expression_orale.js',
                      'subjects/grade1-french/questions/ch03_lecture.js',
                      'subjects/grade1-french/questions/ch04_ecriture.js',
                      'subjects/grade1-french/questions/ch05_grammaire.js',
                      'subjects/grade1-french/questions/topup_g1fr.js',
                      'subjects/grade1-french/questions/reclaimed_sample.js',
                      'subjects/grade1-french/questions/ch06_visuel.js'],
    'grade1-health': ['subjects/grade1-health/questions/ch01_hygiene.js',
                     'subjects/grade1-health/questions/ch02_nutrition.js',
                     'subjects/grade1-health/questions/ch03_safety.js',
                     'subjects/grade1-health/questions/ch_topup.js',
                     'subjects/grade1-health/questions/ch_topup2.js',
                     'subjects/grade1-health/questions/ch04_visual.js'],
    'grade1-ict':    ['subjects/grade1-ict/questions/ch01_sample.js'],
    'grade2-maths': ['subjects/grade2-maths/questions/ch01_numbers.js',
                     'subjects/grade2-maths/questions/ch02_addition.js',
                     'subjects/grade2-maths/questions/ch03_subtraction.js',
                     'subjects/grade2-maths/questions/ch04_multiplication.js',
                     'subjects/grade2-maths/questions/ch05_fractions.js',
                     'subjects/grade2-maths/questions/ch06_measurement.js',
                     'subjects/grade2-maths/questions/ch07_time.js',
                     'subjects/grade2-maths/questions/ch08_shapes.js',
                     'subjects/grade2-maths/questions/ch08_shapes_visual.js',
                     'subjects/grade2-maths/questions/ch09_ordinals.js',
                     'subjects/grade2-maths/questions/ch10_money.js',
                     'subjects/grade2-maths/questions/ch11_division.js',
                     'subjects/grade2-maths/questions/reasoning_bank.js',
                     'subjects/grade2-maths/questions/reclaimed_sample.js',
                     'subjects/grade2-maths/questions/ch12_visual.js'],
    'grade2-english': ['subjects/grade2-english/questions/ch01_listening.js',
                       'subjects/grade2-english/questions/ch02_speaking.js',
                       'subjects/grade2-english/questions/ch03_reading.js',
                       'subjects/grade2-english/questions/ch03_reading_passages.js',
                       'subjects/grade2-english/questions/ch04_writing.js',
                       'subjects/grade2-english/questions/ch05_grammar.js',
                       'subjects/grade2-english/questions/ch06_phonics.js',
                       'subjects/grade2-english/questions/reclaimed_sample.js',
                       'subjects/grade2-english/questions/ch07_visual.js'],
    'grade2-french': ['subjects/grade2-french/questions/ch01_comprehension_orale.js',
                      'subjects/grade2-french/questions/ch02_expression_orale.js',
                      'subjects/grade2-french/questions/ch03_lecture.js',
                      'subjects/grade2-french/questions/ch03_lecture_passages.js',
                      'subjects/grade2-french/questions/ch04_ecriture.js',
                      'subjects/grade2-french/questions/ch05_grammaire.js',
                      'subjects/grade2-french/questions/reclaimed_sample.js',
                      'subjects/grade2-french/questions/ch06_visuel.js'],
    'grade2-health': ['subjects/grade2-health/questions/ch01_hygiene.js',
                     'subjects/grade2-health/questions/ch02_nutrition.js',
                     'subjects/grade2-health/questions/ch03_safety.js',
                     'subjects/grade2-health/questions/ch_topup.js',
                     'subjects/grade2-health/questions/ch04_visual.js'],
    'grade2-ict':    ['subjects/grade2-ict/questions/ch01_sample.js'],
    'grade3-maths': ['subjects/grade3-maths/questions/ch01_numbers.js',
                     'subjects/grade3-maths/questions/ch02_addition.js',
                     'subjects/grade3-maths/questions/ch03_subtraction.js',
                     'subjects/grade3-maths/questions/ch04_multiplication.js',
                     'subjects/grade3-maths/questions/ch05_division.js',
                     'subjects/grade3-maths/questions/ch06_fractions.js',
                     'subjects/grade3-maths/questions/ch07_measurement.js',
                     'subjects/grade3-maths/questions/ch08_geometry.js',
                     'subjects/grade3-maths/questions/ch09_time.js',
                     'subjects/grade3-maths/questions/topup_g3mth.js',
                     'subjects/grade3-maths/questions/ch10_pictograms.js',
                     'subjects/grade3-maths/questions/ch11_ordinals.js',
                     'subjects/grade3-maths/questions/ch12_roman_numerals.js',
                     'subjects/grade3-maths/questions/ch13_money.js',
                     'subjects/grade3-maths/questions/reasoning_bank.js',
                     'subjects/grade3-maths/questions/reclaimed_sample.js'],
    'grade3-english': ['subjects/grade3-english/questions/ch01_listening.js',
                       'subjects/grade3-english/questions/ch02_speaking.js',
                       'subjects/grade3-english/questions/ch03_reading.js',
                       'subjects/grade3-english/questions/ch03_reading_passages.js',
                       'subjects/grade3-english/questions/ch04_writing.js',
                       'subjects/grade3-english/questions/ch05_grammar.js',
                       'subjects/grade3-english/questions/ch06_phonics.js',
                       'subjects/grade3-english/questions/reclaimed_sample.js'],
    'grade3-french': ['subjects/grade3-french/questions/ch01_comprehension_orale.js',
                      'subjects/grade3-french/questions/ch02_expression_orale.js',
                      'subjects/grade3-french/questions/ch03_lecture.js',
                      'subjects/grade3-french/questions/ch03_lecture_passages.js',
                      'subjects/grade3-french/questions/ch04_ecriture.js',
                      'subjects/grade3-french/questions/ch05_grammaire.js',
                      'subjects/grade3-french/questions/reclaimed_sample.js'],
    'grade3-health': ['subjects/grade3-health/questions/ch01_hygiene.js',
                     'subjects/grade3-health/questions/ch02_nutrition.js',
                     'subjects/grade3-health/questions/ch03_safety.js',
                     'subjects/grade3-health/questions/ch_topup.js'],
    'grade3-ict':    ['subjects/grade3-ict/questions/ch01_sample.js'],
    'grade3-ssee': ['subjects/grade3-ssee/questions/ch01_environment.js',
                    'subjects/grade3-ssee/questions/ch02_myself_family.js',
                    'subjects/grade3-ssee/questions/ch03_natural_environment.js',
                    'subjects/grade3-ssee/questions/ch04_living_things.js',
                    'subjects/grade3-ssee/questions/ch05_locality.js',
                    'subjects/grade3-ssee/questions/ch06_air.js',
                    'subjects/grade3-ssee/questions/ch07_water.js',
                    'subjects/grade3-ssee/questions/ch08_weather.js'],
    'grade7-maths': ['subjects/grade7-maths/questions/depth_hard.js',
                     'subjects/grade7-maths/questions/ch01_core.js',
                     'subjects/grade7-maths/questions/ch02_expanded.js',
                     'subjects/grade7-maths/questions/ch03_sequences_angles.js',
                     'subjects/grade7-maths/questions/reclaimed_sample.js',
                     'subjects/grade7-maths/questions/batch2a_constructions.js',
                     'subjects/grade7-maths/questions/batch2a_coordinates.js',
                     'subjects/grade7-maths/questions/batch2a_factors.js',
                     'subjects/grade7-maths/questions/batch2a_fractions.js',
                     'subjects/grade7-maths/questions/batch2a_indices.js',
                     'subjects/grade7-maths/questions/batch2a_integers.js',
                     'subjects/grade7-maths/questions/batch2a_operations.js',
                     'subjects/grade7-maths/questions/batch2a_percentages.js',
                     'subjects/grade7-maths/questions/batch2a_polygons.js',
                     'subjects/grade7-maths/questions/batch2a_ratio.js',
                     'subjects/grade7-maths/questions/batch2a_symmetry.js',
                     'subjects/grade7-maths/questions/batch2b_algebra.js',
                     'subjects/grade7-maths/questions/batch2b_area.js',
                     'subjects/grade7-maths/questions/batch2b_equations.js',
                     'subjects/grade7-maths/questions/batch2b_length.js',
                     'subjects/grade7-maths/questions/batch2b_mass.js',
                     'subjects/grade7-maths/questions/batch2b_money.js',
                     'subjects/grade7-maths/questions/batch2b_sets.js',
                     'subjects/grade7-maths/questions/batch2b_speed.js',
                     'subjects/grade7-maths/questions/batch2b_statistics.js',
                     'subjects/grade7-maths/questions/batch2b_time.js',
                     'subjects/grade7-maths/questions/batch2b_transformation.js'],
    'grade7-english': ['subjects/grade7-english/questions/depth_hard.js',
                       'subjects/grade7-english/questions/ch01_core.js',
                       'subjects/grade7-english/questions/ch02_expanded.js',
                       'subjects/grade7-english/questions/reclaimed_sample.js',
                       'subjects/grade7-english/questions/batch2_gr_adjectives.js',
                       'subjects/grade7-english/questions/batch2_gr_adverbs.js',
                       'subjects/grade7-english/questions/batch2_gr_determiners.js',
                       'subjects/grade7-english/questions/batch2_gr_modals.js',
                       'subjects/grade7-english/questions/batch2_gr_nouns.js',
                       'subjects/grade7-english/questions/batch2_gr_prepositions.js',
                       'subjects/grade7-english/questions/batch2_gr_pronouns.js',
                       'subjects/grade7-english/questions/batch2_gr_punctuation.js',
                       'subjects/grade7-english/questions/batch2_gr_sentence.js',
                       'subjects/grade7-english/questions/batch2_gr_verbs.js',
                       'subjects/grade7-english/questions/batch2_listening.js',
                       'subjects/grade7-english/questions/batch2_reading.js',
                       'subjects/grade7-english/questions/batch2_speaking.js',
                       'subjects/grade7-english/questions/batch2_writing.js',
                       'subjects/grade7-english/questions/rcp_passages.js'],
    'grade7-french': ['subjects/grade7-french/questions/depth_hard.js',
                      'subjects/grade7-french/questions/ch01_core.js',
                      'subjects/grade7-french/questions/ch02_expanded.js',
                      'subjects/grade7-french/questions/reclaimed_sample.js',
                      'subjects/grade7-french/questions/rcp_textes.js'],
    'grade7-science': ['subjects/grade7-science/questions/depth_hard.js',
                       'subjects/grade7-science/questions/ch01_core.js',
                       'subjects/grade7-science/questions/ch02_expanded.js',
                       'subjects/grade7-science/questions/reclaimed_sample.js',
                       'subjects/grade7-science/questions/batch2_g7s-air.js',
                       'subjects/grade7-science/questions/batch2_g7s-biodiversity.js',
                       'subjects/grade7-science/questions/batch2_g7s-cells.js',
                       'subjects/grade7-science/questions/batch2_g7s-changes.js',
                       'subjects/grade7-science/questions/batch2_g7s-ecosystem.js',
                       'subjects/grade7-science/questions/batch2_g7s-electricity.js',
                       'subjects/grade7-science/questions/batch2_g7s-elements.js',
                       'subjects/grade7-science/questions/batch2_g7s-energy.js',
                       'subjects/grade7-science/questions/batch2_g7s-food-chains.js',
                       'subjects/grade7-science/questions/batch2_g7s-inquiry.js',
                       'subjects/grade7-science/questions/batch2_g7s-matter.js',
                       'subjects/grade7-science/questions/batch2_g7s-measurement.js',
                       'subjects/grade7-science/questions/batch2_g7s-solar-system.js',
                       'subjects/grade7-science/questions/batch2_g7s-sts.js'],
    'grade7-social-modern-studies': ['subjects/grade7-social-modern-studies/questions/depth_hard.js',
                                    'subjects/grade7-social-modern-studies/questions/ch01_core.js',
                                     'subjects/grade7-social-modern-studies/questions/ch02_expanded.js',
                                     'subjects/grade7-social-modern-studies/questions/reclaimed_sample.js',
                                     'subjects/grade7-social-modern-studies/questions/batch2_g7sms-people.js',
                                     'subjects/grade7-social-modern-studies/questions/batch2_g7sms-resources.js',
                                     'subjects/grade7-social-modern-studies/questions/batch2_g7sms-settlement.js'],
    'grade8-maths': [
      'subjects/grade8-maths/questions/depth_hard.js','subjects/grade8-maths/questions/ch01_core.js',
                     'subjects/grade8-maths/questions/ch02_expanded.js',
                     'subjects/grade8-maths/questions/ch03_real_numbers.js',
                     'subjects/grade8-maths/questions/ch04_pythagoras.js',
                     'subjects/grade8-maths/questions/ch05_inequalities.js',
                     'subjects/grade8-maths/questions/ch06_sets.js',
                     'subjects/grade8-maths/questions/ch07_constructions.js',
                     'subjects/grade8-maths/questions/reclaimed_sample.js',
                     'subjects/grade8-maths/questions/batch2_algebra.js',
                     'subjects/grade8-maths/questions/batch2_circles.js',
                     'subjects/grade8-maths/questions/batch2_coordinates.js',
                     'subjects/grade8-maths/questions/batch2_finance.js',
                     'subjects/grade8-maths/questions/batch2_indices.js',
                     'subjects/grade8-maths/questions/batch2_polygons.js',
                     'subjects/grade8-maths/questions/batch2_rate.js',
                     'subjects/grade8-maths/questions/batch2_sequences.js',
                     'subjects/grade8-maths/questions/batch2_statistics.js',
                     'subjects/grade8-maths/questions/batch2_surface_area.js',
                     'subjects/grade8-maths/questions/batch2_volume.js'],
    'grade8-english': ['subjects/grade8-english/questions/depth_hard.js',
                       'subjects/grade8-english/questions/ch01_core.js',
                       'subjects/grade8-english/questions/ch02_expanded.js',
                       'subjects/grade8-english/questions/reclaimed_sample.js',
                       'subjects/grade8-english/questions/batch2_gr_adjectives.js',
                       'subjects/grade8-english/questions/batch2_gr_adverbs.js',
                       'subjects/grade8-english/questions/batch2_gr_determiners.js',
                       'subjects/grade8-english/questions/batch2_gr_modals.js',
                       'subjects/grade8-english/questions/batch2_gr_nouns.js',
                       'subjects/grade8-english/questions/batch2_gr_prepositions.js',
                       'subjects/grade8-english/questions/batch2_gr_pronouns.js',
                       'subjects/grade8-english/questions/batch2_gr_punctuation.js',
                       'subjects/grade8-english/questions/batch2_gr_sentence.js',
                       'subjects/grade8-english/questions/batch2_gr_verbs.js',
                       'subjects/grade8-english/questions/batch2_listening.js',
                       'subjects/grade8-english/questions/batch2_reading.js',
                       'subjects/grade8-english/questions/batch2_speaking.js',
                       'subjects/grade8-english/questions/batch2_writing.js',
                       'subjects/grade8-english/questions/rcp_passages.js'],
    'grade8-french': ['subjects/grade8-french/questions/depth_hard.js',
                      'subjects/grade8-french/questions/ch01_core.js',
                      'subjects/grade8-french/questions/ch02_expanded.js',
                      'subjects/grade8-french/questions/reclaimed_sample.js',
                      'subjects/grade8-french/questions/rcp_textes.js'],
    'grade8-science': ['subjects/grade8-science/questions/depth_hard.js',
                       'subjects/grade8-science/questions/ch01_core.js',
                       'subjects/grade8-science/questions/ch02_expanded.js',
                       'subjects/grade8-science/questions/reclaimed_sample.js',
                       'subjects/grade8-science/questions/batch2_acids.js',
                       'subjects/grade8-science/questions/batch2_chem_language.js',
                       'subjects/grade8-science/questions/batch2_digestive.js',
                       'subjects/grade8-science/questions/batch2_diseases.js',
                       'subjects/grade8-science/questions/batch2_food.js',
                       'subjects/grade8-science/questions/batch2_forces.js',
                       'subjects/grade8-science/questions/batch2_inquiry.js',
                       'subjects/grade8-science/questions/batch2_magnetism.js',
                       'subjects/grade8-science/questions/batch2_mixtures.js',
                       'subjects/grade8-science/questions/batch2_pressure.js',
                       'subjects/grade8-science/questions/batch2_respiratory.js',
                       'subjects/grade8-science/questions/batch2_sts.js',
                       'subjects/grade8-science/questions/batch2_work_energy.js'],
    'grade8-social-modern-studies': [
      'subjects/grade8-social-modern-studies/questions/depth_hard.js','subjects/grade8-social-modern-studies/questions/ch01_core.js',
                                     'subjects/grade8-social-modern-studies/questions/ch02_expanded.js',
                                     'subjects/grade8-social-modern-studies/questions/reclaimed_sample.js',
                                     'subjects/grade8-social-modern-studies/questions/batch2_democracy.js',
                                     'subjects/grade8-social-modern-studies/questions/batch2_independence.js',
                                     'subjects/grade8-social-modern-studies/questions/batch2_society.js'],
    'grade9-ict':   ['subjects/grade9-ict/questions/ch01_computer_systems.js',
                     'subjects/grade9-ict/questions/ch02_word_processing.js',
                     'subjects/grade9-ict/questions/ch03_spreadsheets.js',
                     'subjects/grade9-ict/questions/ch04_algorithms.js',
                     'subjects/grade9-ict/questions/ch05_networks.js',
                     'subjects/grade9-ict/questions/ch06_internet.js',
                     'subjects/grade9-ict/questions/ch07_databases.js',
                     'subjects/grade9-ict/questions/ch08_software_os.js',
                     'subjects/grade9-ict/questions/ch09_ethics_security.js',
                     'subjects/grade9-ict/questions/ch10_presentation.js',
                     'subjects/grade9-ict/questions/ch11_health_safety.js',
                     'subjects/grade9-ict/questions/ch12_troubleshooting.js',
                     'subjects/grade9-ict/questions/exam_depth.js',
                     'subjects/grade9-ict/questions/past_paper_2024.js',
                     'subjects/grade9-ict/questions/nce_section_a.js',
                     'subjects/grade9-ict/questions/nce_section_b.js',
                     'subjects/grade9-ict/questions/presentation_volume.js',
                     'subjects/grade9-ict/questions/ethics_volume.js',
                     'subjects/grade9-ict/questions/wp_volume.js',
                     'subjects/grade9-ict/questions/networks_internet_volume.js',
                     'subjects/grade9-ict/questions/db_health_volume.js',
                     'subjects/grade9-ict/questions/spread_alg_volume.js',
                     'subjects/grade9-ict/questions/ict_tasks.js',
                     'subjects/grade9-ict/questions/ict_paper_inspired.js',
                     'subjects/grade9-ict/questions/ict_multi_year.js',
                     'subjects/grade9-ict/questions/ict_diagram_patch.js',
                     'subjects/grade9-ict/questions/ict_diagram_multi.js',
                     'subjects/grade9-ict/questions/family_expansion.js'],
  'grade9-maths': ['subjects/grade9-maths/questions/ch01_indices.js',
                     'subjects/grade9-maths/questions/ch02_coordinates.js',
                     'subjects/grade9-maths/questions/ch03_number_revision.js',
                     'subjects/grade9-maths/questions/ch04_volume.js',
                     'subjects/grade9-maths/questions/ch05_vectors.js',
                     'subjects/grade9-maths/questions/ch06_statistics.js',
                     'subjects/grade9-maths/questions/ch07_trigonometry.js',
                     'subjects/grade9-maths/questions/ch08_probability.js',
                     'subjects/grade9-maths/questions/ch09_expressions.js',
                     'subjects/grade9-maths/questions/ch10_quadratics.js',
                     'subjects/grade9-maths/questions/ch11_simultaneous.js',
                     'subjects/grade9-maths/questions/ch12_surface_area.js',
                     'subjects/grade9-maths/questions/ch13_patterns.js',
                     'subjects/grade9-maths/questions/ch14_inequalities.js',
                     'subjects/grade9-maths/questions/ch15_finance.js',
                     'subjects/grade9-maths/questions/ch16_capacity.js',
                     'subjects/grade9-maths/questions/ch17_matrices.js',
                     'subjects/grade9-maths/questions/ch18_manipulation.js',
                     'subjects/grade9-maths/questions/mcq_bank.js',
                     'subjects/grade9-maths/questions/extended_bank.js',
                     'subjects/grade9-maths/questions/ch19_geometry_revision.js',
                     'subjects/grade9-maths/questions/extended_bank_2.js',
                     'subjects/grade9-maths/questions/extended_bank_3.js',
                     'subjects/grade9-maths/questions/visual_bank.js',
                     'subjects/grade9-maths/questions/visual_bank_2.js',
                     'subjects/grade9-maths/questions/balance_bank.js',
                     'subjects/grade9-maths/questions/depth_bank.js',
                     'subjects/grade9-maths/questions/past_paper_2024.js',
                     'subjects/grade9-maths/questions/maths_multi_year.js'],
    'grade9-english': ['subjects/grade9-english/questions/starter_bank.js',
                       'subjects/grade9-english/questions/grammar_pronouns_nouns_adj.js',
                       'subjects/grade9-english/questions/grammar_verbs.js',
                       'subjects/grade9-english/questions/grammar_adverbs_sentence_prep_punct.js',
                       'subjects/grade9-english/questions/vocab_volume.js',
                       'subjects/grade9-english/questions/literature_volume.js',
                       'subjects/grade9-english/questions/eng_paper_inspired.js',
                       'subjects/grade9-english/questions/eng_multi_year.js',
                       'subjects/grade9-english/questions/family_expansion.js',
                       'subjects/grade9-english/questions/grammar_depth_modals_det_adj_nouns.js',
                       'subjects/grade9-english/questions/reclaimed_sample.js',
                       'subjects/grade9-english/questions/rcp_passages.js'],
    'grade9-french': ['subjects/grade9-french/questions/starter_bank.js',
                      'subjects/grade9-french/questions/transformation_volume.js',
                      'subjects/grade9-french/questions/grammaire_volume.js',
                      'subjects/grade9-french/questions/vocabulaire_vocab.js',
                      'subjects/grade9-french/questions/formation_mots.js',
                      'subjects/grade9-french/questions/doc_authentique.js',
                      'subjects/grade9-french/questions/ecrit_guide.js',
                      'subjects/grade9-french/questions/oeuvres.js',
                      'subjects/grade9-french/questions/fr_paper_inspired.js',
                      'subjects/grade9-french/questions/fr_multi_year.js',
                      'subjects/grade9-french/questions/family_expansion.js',
                      'subjects/grade9-french/questions/reclaimed_sample.js',
                      'subjects/grade9-french/questions/rcp_textes.js'],
    'grade9-biology': ['subjects/grade9-biology/questions/b1_circulatory.js',
                       'subjects/grade9-biology/questions/b2_reproductive.js',
                       'subjects/grade9-biology/questions/b3_biodiversity.js',
                       'subjects/grade9-biology/questions/b4_plant_nutrition.js',
                       'subjects/grade9-biology/questions/inquiry.js',
                       'subjects/grade9-biology/questions/past_paper_2024.js',
                       'subjects/grade9-biology/questions/sts.js',
                       'subjects/grade9-biology/questions/inquiry_depth.js',
                       'subjects/grade9-biology/questions/sts_depth.js',
                       'subjects/grade9-biology/questions/b1_volume.js',
                       'subjects/grade9-biology/questions/b2_volume.js',
                       'subjects/grade9-biology/questions/b3_volume.js',
                       'subjects/grade9-biology/questions/b4_volume.js',
                       'subjects/grade9-biology/questions/bio_tasks.js',
                       'subjects/grade9-biology/questions/bio_paper_inspired.js',
                       'subjects/grade9-biology/questions/bio_multi_year.js',
                       'subjects/grade9-biology/questions/bio_diagram_patch.js',
                       'subjects/grade9-biology/questions/bio_diagram_multi.js',
                       'subjects/grade9-biology/questions/family_expansion.js',
                       'subjects/grade9-biology/questions/b4_mineral_nutrition.js'],
    'grade9-chemistry': ['subjects/grade9-chemistry/questions/c1_atmosphere.js',
                         'subjects/grade9-chemistry/questions/c2_mixtures.js',
                         'subjects/grade9-chemistry/questions/c3_language.js',
                         'subjects/grade9-chemistry/questions/c4_metals.js',
                         'subjects/grade9-chemistry/questions/c5_salts.js',
                         'subjects/grade9-chemistry/questions/inquiry.js',
                         'subjects/grade9-chemistry/questions/past_paper_2024.js',
                         'subjects/grade9-chemistry/questions/sts.js',
                         'subjects/grade9-chemistry/questions/inquiry_depth.js',
                         'subjects/grade9-chemistry/questions/sts_depth.js',
                         'subjects/grade9-chemistry/questions/c1_volume.js',
                         'subjects/grade9-chemistry/questions/c2_volume.js',
                         'subjects/grade9-chemistry/questions/c3_volume.js',
                         'subjects/grade9-chemistry/questions/c4_volume.js',
                         'subjects/grade9-chemistry/questions/c5_volume.js',
                         'subjects/grade9-chemistry/questions/chem_tasks.js',
                         'subjects/grade9-chemistry/questions/chem_paper_inspired.js',
                         'subjects/grade9-chemistry/questions/chem_multi_year.js',
                         'subjects/grade9-chemistry/questions/chem_diagram_multi.js',
                         'subjects/grade9-chemistry/questions/family_expansion.js',
                         'subjects/grade9-chemistry/questions/sts_evidence_ethics.js'],
    'grade9-physics': ['subjects/grade9-physics/questions/inquiry.js',
                       'subjects/grade9-physics/questions/p1_measurements.js',
                       'subjects/grade9-physics/questions/p2_light.js',
                       'subjects/grade9-physics/questions/p3_energy.js',
                       'subjects/grade9-physics/questions/p4_motion.js',
                       'subjects/grade9-physics/questions/p5_electricity.js',
                       'subjects/grade9-physics/questions/past_paper_2024.js',
                       'subjects/grade9-physics/questions/sts.js',
                       'subjects/grade9-physics/questions/inquiry_depth.js',
                       'subjects/grade9-physics/questions/sts_depth.js',
                       'subjects/grade9-physics/questions/p1_volume.js',
                       'subjects/grade9-physics/questions/p2_volume.js',
                       'subjects/grade9-physics/questions/p3_volume.js',
                       'subjects/grade9-physics/questions/p4_volume.js',
                       'subjects/grade9-physics/questions/p5_volume.js',
                       'subjects/grade9-physics/questions/phy_tasks.js',
                       'subjects/grade9-physics/questions/phy_paper_inspired.js',
                       'subjects/grade9-physics/questions/phy_multi_year.js',
                       'subjects/grade9-physics/questions/phy_diagram_multi.js',
                       'subjects/grade9-physics/questions/family_expansion.js',
                       'subjects/grade9-physics/questions/p2_refraction.js',
                       'subjects/grade9-physics/questions/p3_thermal_expansion.js'],
    'grade9-social-modern-studies': ['subjects/grade9-social-modern-studies/questions/starter_bank.js',
                                     'subjects/grade9-social-modern-studies/questions/sms_volume_1.js',
                                     'subjects/grade9-social-modern-studies/questions/sms_volume_2.js',
                                     'subjects/grade9-social-modern-studies/questions/sms_paper_inspired.js',
                                     'subjects/grade9-social-modern-studies/questions/sms_multi_year.js',
                                     'subjects/grade9-social-modern-studies/questions/family_expansion.js',
                                     'subjects/grade9-social-modern-studies/questions/reclaimed_sample.js',
                                     'subjects/grade9-social-modern-studies/questions/batch2_g9sms-economy-today.js',
                                     'subjects/grade9-social-modern-studies/questions/batch2_g9sms-hazards-environment.js',
                                     'subjects/grade9-social-modern-studies/questions/batch2_g9sms-industrial-impact.js',
                                     'subjects/grade9-social-modern-studies/questions/batch2_g9sms-migration.js',
                                     'subjects/grade9-social-modern-studies/questions/batch2_g9sms-outer-islands.js',
                                     'subjects/grade9-social-modern-studies/questions/batch2_g9sms-social-change.js'],
    'grade5-maths': [
      'subjects/grade5-maths/questions/core.js',
      'subjects/grade5-maths/questions/questions_extra.js',
      'subjects/grade5-maths/questions/questions_diverse.js',
      'subjects/grade5-maths/questions/questions_conversions.js',
      'subjects/grade5-maths/questions/questions_wordproblems.js',
      'subjects/grade5-maths/questions/questions_examstyle.js',
      'subjects/grade5-maths/questions/questions_subsections.js',
      'subjects/grade5-maths/questions/questions_challenge.js',
      'subjects/grade5-maths/questions/questions_challenge2.js',
      'subjects/grade5-maths/questions/questions_audit.js',
      'subjects/grade5-maths/questions/illustrated_diagrams.js',
      'subjects/grade5-maths/questions/reasoning_word_problems.js',
      'subjects/grade5-maths/questions/extended_reasoning_bank.js',
      'subjects/grade5-maths/questions/symmetry_line_drawing.js',
    ],
    'grade5-french': [
      'subjects/grade5-french/questions/depth_hard.js',
      'subjects/grade5-french/questions/ch01_vocabulaire.js',
      'subjects/grade5-french/questions/exam_depth.js',
      'subjects/grade5-french/questions/ch02_noms.js',
      'subjects/grade5-french/questions/ch03_verbes_present.js',
      'subjects/grade5-french/questions/ch04_adjectifs.js',
      'subjects/grade5-french/questions/ch05_passe_compose.js',
      'subjects/grade5-french/questions/ch05_passe_compose_saisie.js',
      'subjects/grade5-french/questions/ch06_pronoms.js',
      'subjects/grade5-french/questions/ch07_lecture.js',
      'subjects/grade5-french/questions/ch08_grammaire.js',
      'subjects/grade5-french/questions/ch09_passe_simple.js',
      'subjects/grade5-french/questions/ch10_subjonctif.js',
      'subjects/grade5-french/questions/ch11_textes.js',
      'subjects/grade5-french/questions/ch12_images.js',
      'subjects/grade5-french/questions/ch13_formation_mots.js',
      'subjects/grade5-french/questions/ch14_textes_trous.js',
      'subjects/grade5-french/questions/ch15_correction.js',
      'subjects/grade5-french/questions/ch15_chasse_erreurs.js',
      'subjects/grade5-french/questions/extended_practice_bank.js',
      'subjects/grade5-french/questions/enrichment_relier_phrases.js',
      'subjects/grade5-french/questions/coverage_g5_balance.js',
    ,
      'subjects/grade5-french/questions/rcp_textes.js'],
    'grade5-english': [
      'subjects/grade5-english/questions/depth_hard.js',
      'subjects/grade5-english/questions/coverage_core_grammar.js',
      'subjects/grade5-english/questions/exam_depth.js',
      'subjects/grade5-english/questions/coverage_articles_determiners.js',
      'subjects/grade5-english/questions/coverage_nouns_context.js',
      'subjects/grade5-english/questions/coverage_noun_meanings.js',
      'subjects/grade5-english/questions/ch01_nouns.js',
      'subjects/grade5-english/questions/ch02_verbs.js',
      'subjects/grade5-english/questions/ch03_adjectives.js',
      'subjects/grade5-english/questions/ch04_sentences.js',
      'subjects/grade5-english/questions/ch05_comprehension.js',
      'subjects/grade5-english/questions/ch06_writing.js',
      'subjects/grade5-english/questions/ch07_vocabulary.js',
      'subjects/grade5-english/questions/ch08_spelling.js',
      'subjects/grade5-english/questions/ch09_passages.js',
      'subjects/grade5-english/questions/passages_full_01_cyclone.js',
      'subjects/grade5-english/questions/passages_full_02_purse.js',
      'subjects/grade5-english/questions/passages_full_03_shortcut.js',
      'subjects/grade5-english/questions/passages_full_04_deep_end.js',
      'subjects/grade5-english/questions/passages_full_05_new_boy.js',
      'subjects/grade5-english/questions/comprehension_full_01_tabla.js',
      'subjects/grade5-english/questions/topup_g5_english.js',
      'subjects/grade5-english/questions/coverage_nouns_verbs.js',
      'subjects/grade5-english/questions/coverage_adjectives_sentences.js',
      'subjects/grade5-english/questions/coverage_comprehension_writing.js',
      'subjects/grade5-english/questions/coverage_vocabulary_spelling.js',
      'subjects/grade5-english/questions/enrichment_joining_sentences.js',
    ,
      'subjects/grade5-english/questions/rcp_passages.js'],
    'grade5-science': [
      'subjects/grade5-science/questions/depth_hard.js',
      'subjects/grade5-science/questions/diagrams_exam_style.js',
      'subjects/grade5-science/questions/ch02_plants.js',
      'subjects/grade5-science/questions/exam_depth.js',
      'subjects/grade5-science/questions/ch03_animals.js',
      'subjects/grade5-science/questions/ch04_energy.js',
      'subjects/grade5-science/questions/ch05_water_matter.js',
      'subjects/grade5-science/questions/ch06_electricity.js',
      'subjects/grade5-science/questions/ch09_conservation.js',
      // @enrichment - bonus content, derived from syllabus
      'subjects/grade5-science/questions/enrichment_g5sci_endemic.js',
      'subjects/grade5-science/questions/enrichment_g5sci_energy.js',
      // past papers
      'subjects/grade5-science/questions/past_paper_2024.js',
      'subjects/grade5-science/questions/past_paper_2023.js',
      'subjects/grade5-science/questions/past_paper_2022.js',
      'subjects/grade5-science/questions/past_paper_2021.js',
      'subjects/grade5-science/questions/past_paper_2020.js',
      'subjects/grade5-science/questions/past_paper_2019.js',
      'subjects/grade5-science/questions/past_paper_2018.js',
      'subjects/grade5-science/questions/past_paper_2017.js',
      'subjects/grade5-science/questions/past_paper_2016.js',
      // top-up
      'subjects/grade5-science/questions/topup_g5_science.js',
      'subjects/grade5-science/questions/coverage_min5.js',
    ,
      'subjects/grade5-science/questions/batch2_g5sci-enr-energy.js'],
    'grade5-history': [
      'subjects/grade5-history/questions/depth_hard.js',
      'subjects/grade5-history/questions/ch01_discovery.js',
      'subjects/grade5-history/questions/exam_depth.js',
      'subjects/grade5-history/questions/ch02_settlement.js',
      'subjects/grade5-history/questions/ch03_trade_agri.js',
      'subjects/grade5-history/questions/ch04_port_louis.js',
      'subjects/grade5-history/questions/ch05_natural_env.js',
      'subjects/grade5-history/questions/ch06_volcanism.js',
      'subjects/grade5-history/questions/ch07_env_problems.js',
      'subjects/grade5-history/questions/ch08_map_skills.js',
      'subjects/grade5-history/questions/ch09_g5_weather.js',
      // @enrichment - bonus content, derived from syllabus
      'subjects/grade5-history/questions/enrichment_g5_personalities.js',
      'subjects/grade5-history/questions/enrichment_g5_landmarks.js',
      'subjects/grade5-history/questions/enrichment_g5_world.js',
      // past papers
      'subjects/grade5-history/questions/past_paper_2024.js',
      'subjects/grade5-history/questions/past_paper_2023.js',
      'subjects/grade5-history/questions/past_paper_2022.js',
      'subjects/grade5-history/questions/past_paper_2021.js',
      'subjects/grade5-history/questions/past_paper_2020.js',
      // top-up
      'subjects/grade5-history/questions/topup_g5_history.js',
      'subjects/grade5-history/questions/coverage_discovery_portlouis.js',
      'subjects/grade5-history/questions/coverage_settlement.js',
      'subjects/grade5-history/questions/coverage_min5.js',
    ],
    'grade6-science': [
      'subjects/grade6-science/questions/depth_hard.js',
      'subjects/grade6-science/questions/ch01_g6_air.js',
      'subjects/grade6-science/questions/ch02_g6_materials.js',
      'subjects/grade6-science/questions/ch03_g6_animals.js',
      'subjects/grade6-science/questions/ch04_g6_plants.js',
      'subjects/grade6-science/questions/ch05_g6_energy.js',
      'subjects/grade6-science/questions/ch06_g6_ecosystems.js',
      'subjects/grade6-science/questions/ch07_g6_conservation.js',
      'subjects/grade6-science/questions/ch08_g6_solar.js',
      // diagram-reading items built on the cropped past-paper artwork
      'subjects/grade6-science/questions/apply_diagrams.js',
      'subjects/grade6-science/questions/exam_depth.js',
      // @enrichment - bonus content, derived from syllabus
      'subjects/grade6-science/questions/enrichment_g6sci_ecosystems.js',
      'subjects/grade6-science/questions/enrichment_g6sci_solar.js',
      // past papers
      'subjects/grade6-science/questions/past_paper_2024.js',
      'subjects/grade6-science/questions/past_paper_2023.js',
      'subjects/grade6-science/questions/past_paper_2022.js',
      'subjects/grade6-science/questions/past_paper_2021.js',
      'subjects/grade6-science/questions/past_paper_2019.js',
      // top-up
      'subjects/grade6-science/questions/topup_g6_science.js',
    ],
    'grade6-history': [
      'subjects/grade6-history/questions/depth_hard.js',
      'subjects/grade6-history/questions/ch01_g6_slaves_immigrants.js',
      'subjects/grade6-history/questions/exam_depth.js',
      'subjects/grade6-history/questions/ch02_g6_independence.js',
      'subjects/grade6-history/questions/ch03_g6_cultural_heritage.js',
      'subjects/grade6-history/questions/ch04_g6_land_use.js',
      'subjects/grade6-history/questions/ch05_g6_natural_hazards.js',
      'subjects/grade6-history/questions/ch07_g6_map_skills.js',
      // reason-giving items - the measured gap in this pack
      'subjects/grade6-history/questions/reasoning_items.js',
      // @enrichment - bonus content, derived from syllabus
      'subjects/grade6-history/questions/enrichment_g6_personalities.js',
      'subjects/grade6-history/questions/enrichment_g6_symbols.js',
      'subjects/grade6-history/questions/enrichment_g6_world.js',
      // past papers
      'subjects/grade6-history/questions/past_paper_2024.js',
      'subjects/grade6-history/questions/past_paper_2023.js',
      'subjects/grade6-history/questions/past_paper_2022.js',
      'subjects/grade6-history/questions/past_paper_2021.js',
      'subjects/grade6-history/questions/past_paper_2019.js',
      // top-up
      'subjects/grade6-history/questions/topup_g6_history.js',
    ],
    'grade6-maths': [
      // stimulus-reading items on the cropped past-paper artwork
      'subjects/grade6-maths/questions/stimulus_reading.js',
      'subjects/grade6-maths/questions/exam_depth.js',
      'subjects/grade6-maths/questions/ch01_g6_numeration.js',
      'subjects/grade6-maths/questions/ch02_g6_four_ops.js',
      'subjects/grade6-maths/questions/ch03_g6_fractions.js',
      'subjects/grade6-maths/questions/ch04_g6_decimals.js',
      'subjects/grade6-maths/questions/ch05_g6_factors_hcf.js',
      'subjects/grade6-maths/questions/ch06_g6_ratio_pct.js',
      'subjects/grade6-maths/questions/ch07_g6_geometry.js',
      'subjects/grade6-maths/questions/ch08_g6_measure.js',
      'subjects/grade6-maths/questions/ch09_g6_area_vol.js',
      'subjects/grade6-maths/questions/ch10_g6_time_speed.js',
      'subjects/grade6-maths/questions/ch11_g6_graphs.js',
      // past papers
      'subjects/grade6-maths/questions/past_paper_2024.js',
      'subjects/grade6-maths/questions/past_paper_2023.js',
      'subjects/grade6-maths/questions/past_paper_2022.js',
      'subjects/grade6-maths/questions/past_paper_2021.js',
      'subjects/grade6-maths/questions/past_paper_2019.js',
      // top-up
      'subjects/grade6-maths/questions/topup_g6_maths.js',
      'subjects/grade6-maths/questions/reasoning_word_problems.js',
      'subjects/grade6-maths/questions/extended_reasoning_bank.js',
      'subjects/grade6-maths/questions/symmetry_line_drawing.js',
    ],
    'grade6-english': [
      'subjects/grade6-english/questions/depth_hard.js',
      // comprehension on passages - the measured gap in this pack
      'subjects/grade6-english/questions/comprehension_passages.js',
      'subjects/grade6-english/questions/coverage_authors_view_inference.js',
      'subjects/grade6-english/questions/coverage_evidence_language.js',
      'subjects/grade6-english/questions/coverage_joining_extended.js',
      'subjects/grade6-english/questions/coverage_roots_context_vocab.js',
      'subjects/grade6-english/questions/coverage_confusables_affixes.js',
      'subjects/grade6-english/questions/coverage_antonyms_homophones.js',
      'subjects/grade6-english/questions/coverage_clauses_essay.js',
      'subjects/grade6-english/questions/coverage_formal_descriptive.js',
      'subjects/grade6-english/questions/coverage_planning_reports_meaning.js',
      'subjects/grade6-english/questions/coverage_verb_cloze_continuous.js',
      'subjects/grade6-english/questions/coverage_voice_auxiliary.js',
      'subjects/grade6-english/questions/coverage_present_past.js',
      'subjects/grade6-english/questions/coverage_nouns_extended.js',
      'subjects/grade6-english/questions/coverage_future_punctuation.js',
      'subjects/grade6-english/questions/coverage_links_perfect.js',
      'subjects/grade6-english/questions/coverage_noun_precision.js',
      'subjects/grade6-english/questions/ch01_nouns.js',
      'subjects/grade6-english/questions/ch02_verbs.js',
      'subjects/grade6-english/questions/ch03_clauses.js',
      'subjects/grade6-english/questions/ch04_comprehension.js',
      'subjects/grade6-english/questions/ch05_writing.js',
      'subjects/grade6-english/questions/ch06_vocabulary.js',
      'subjects/grade6-english/questions/ch07_g6_passages.js',
      // past papers
      'subjects/grade6-english/questions/past_paper_2024.js',
      'subjects/grade6-english/questions/past_paper_2023.js',
      'subjects/grade6-english/questions/past_paper_2022.js',
      'subjects/grade6-english/questions/past_paper_2021.js',
      'subjects/grade6-english/questions/past_paper_2019.js',
      // top-up
      'subjects/grade6-english/questions/topup_g6_english.js',
      'subjects/grade6-english/questions/enrichment_joining_sentences.js',
    ,
      'subjects/grade6-english/questions/rcp_passages.js'],
    'grade6-french': [
      'subjects/grade6-french/questions/depth_hard.js',
      // compréhension sur textes - the measured gap in this pack
      'subjects/grade6-french/questions/comprehension_textes.js',
      'subjects/grade6-french/questions/exam_depth.js',
      'subjects/grade6-french/questions/ch01_imparfait.js',
      'subjects/grade6-french/questions/ch02_futur.js',
      'subjects/grade6-french/questions/ch03_subordonnees.js',
      'subjects/grade6-french/questions/ch04_subjunctif.js',
      'subjects/grade6-french/questions/ch05_argumentation.js',
      'subjects/grade6-french/questions/ch06_lecture.js',
      'subjects/grade6-french/questions/ch07_conditionnel.js',
      'subjects/grade6-french/questions/ch08_pqp.js',
      'subjects/grade6-french/questions/ch09_g6_textes.js',
      'subjects/grade6-french/questions/ch10_g6_images.js',
      'subjects/grade6-french/questions/ch11_g6_formation_mots.js',
      'subjects/grade6-french/questions/ch12_g6_textes_trous.js',
      'subjects/grade6-french/questions/ch13_g6_correction.js',
      'subjects/grade6-french/questions/ch13_g6_chasse_erreurs.js',
      'subjects/grade6-french/questions/extended_practice_bank.js',
      // past papers
      'subjects/grade6-french/questions/past_paper_2024.js',
      'subjects/grade6-french/questions/past_paper_2023.js',
      'subjects/grade6-french/questions/past_paper_2022.js',
      'subjects/grade6-french/questions/past_paper_2021.js',
      'subjects/grade6-french/questions/past_paper_2019.js',
      'subjects/grade6-french/questions/enrichment_relier_phrases.js',
    ,
      'subjects/grade6-french/questions/rcp_textes.js'],
    'grade4-maths': [
      'subjects/grade4-maths/questions/ch01_g4_numeration.js',
      'subjects/grade4-maths/questions/ch02_g4_four_ops.js',
      'subjects/grade4-maths/questions/ch03_g4_fractions.js',
      'subjects/grade4-maths/questions/ch04_g4_geometry.js',
      'subjects/grade4-maths/questions/ch05_g4_measures.js',
      'subjects/grade4-maths/questions/ch06_g4_data.js',
      // top-up
      'subjects/grade4-maths/questions/topup_g4_maths.js',
      'subjects/grade4-maths/questions/coverage_numeration.js',
      'subjects/grade4-maths/questions/coverage_four_ops.js',
      'subjects/grade4-maths/questions/coverage_fractions.js',
      'subjects/grade4-maths/questions/coverage_measures.js',
      'subjects/grade4-maths/questions/coverage_data_reasoning.js',
      'subjects/grade4-maths/questions/extended_reasoning_bank.js',
    ],
    'grade4-english': [
      'subjects/grade4-english/questions/depth_hard.js',
      'subjects/grade4-english/questions/ch01_g4_nouns.js',
      'subjects/grade4-english/questions/ch02_g4_verbs.js',
      'subjects/grade4-english/questions/ch03_g4_adjectives.js',
      'subjects/grade4-english/questions/ch04_g4_sentences.js',
      'subjects/grade4-english/questions/ch05_g4_comprehension.js',
      'subjects/grade4-english/questions/ch06_g4_vocabulary.js',
      'subjects/grade4-english/questions/ch07_g4_passages.js',
      // top-up
      'subjects/grade4-english/questions/topup_g4_english.js',
      'subjects/grade4-english/questions/coverage_articles.js',
      'subjects/grade4-english/questions/coverage_nouns.js',
      'subjects/grade4-english/questions/coverage_verbs.js',
      'subjects/grade4-english/questions/coverage_adjectives_sentences.js',
      'subjects/grade4-english/questions/coverage_comprehension.js',
      'subjects/grade4-english/questions/coverage_vocabulary.js',
      'subjects/grade4-english/questions/coverage_passages.js',
      'subjects/grade4-english/questions/enrichment_joining_sentences.js',
    ],
    'grade4-science': [
      'subjects/grade4-science/questions/depth_hard.js',
      'subjects/grade4-science/questions/ch01_g4_living_things.js',
      'subjects/grade4-science/questions/exam_depth.js',
      'subjects/grade4-science/questions/ch02_g4_plants.js',
      'subjects/grade4-science/questions/ch03_g4_animals.js',
      'subjects/grade4-science/questions/ch04_g4_air.js',
      'subjects/grade4-science/questions/ch05_g4_water.js',
      'subjects/grade4-science/questions/ch06_g4_materials.js',
      'subjects/grade4-science/questions/ch07_g4_energy.js',
      'subjects/grade4-science/questions/ch08_g4_protection.js',
      // @enrichment - bonus content, derived from syllabus
      'subjects/grade4-science/questions/enrichment_g4sci_animals.js',
      'subjects/grade4-science/questions/enrichment_g4sci_equipment.js',
      // top-up
      'subjects/grade4-science/questions/topup_g4_science.js',
    ],
    'grade4-french': [
      'subjects/grade4-french/questions/depth_hard.js',
      'subjects/grade4-french/questions/ch01_g4_vocabulaire.js',
      'subjects/grade4-french/questions/ch02_g4_noms.js',
      'subjects/grade4-french/questions/ch03_g4_verbes.js',
      'subjects/grade4-french/questions/ch04_g4_adjectifs.js',
      'subjects/grade4-french/questions/ch05_g4_phrase.js',
      'subjects/grade4-french/questions/ch06_g4_lecture.js',
      'subjects/grade4-french/questions/ch07_g4_passe_compose.js',
      'subjects/grade4-french/questions/ch08_g4_imparfait.js',
      'subjects/grade4-french/questions/ch09_g4_textes.js',
      'subjects/grade4-french/questions/ch10_g4_images.js',
      'subjects/grade4-french/questions/ch11_g4_formation_mots.js',
      'subjects/grade4-french/questions/ch12_g4_textes_trous.js',
      'subjects/grade4-french/questions/ch13_g4_correction.js',
      'subjects/grade4-french/questions/ch14_g4_chasse_erreurs.js',
      // top-up
      'subjects/grade4-french/questions/topup_g4_french.js',
      'subjects/grade4-french/questions/extended_practice_bank.js',
      'subjects/grade4-french/questions/image_photo_activities.js',
      'subjects/grade4-french/questions/coverage_vocabulaire.js',
      'subjects/grade4-french/questions/coverage_noms_propres.js',
      'subjects/grade4-french/questions/coverage_articles.js',
      'subjects/grade4-french/questions/coverage_pronominaux.js',
      'subjects/grade4-french/questions/coverage_adjectifs.js',
      'subjects/grade4-french/questions/coverage_phrase_passe.js',
      'subjects/grade4-french/questions/coverage_imparfait_lecture.js',
      'subjects/grade4-french/questions/enrichment_relier_phrases.js',
    ],
    'grade4-history': [
      'subjects/grade4-history/questions/depth_hard.js',
      'subjects/grade4-history/questions/ch01_g4_locality.js',
      'subjects/grade4-history/questions/ch02_g4_community.js',
      'subjects/grade4-history/questions/ch03_g4_voyages.js',
      'subjects/grade4-history/questions/ch04_g4_natural_env.js',
      'subjects/grade4-history/questions/ch05_g4_weather.js',
      'subjects/grade4-history/questions/ch06_g4_map_skills.js',
      // @enrichment - bonus content, derived from syllabus
      'subjects/grade4-history/questions/enrichment_g4_explorers.js',
      'subjects/grade4-history/questions/enrichment_g4_mauritius.js',
      'subjects/grade4-history/questions/enrichment_g4_world.js',
      // top-up
      'subjects/grade4-history/questions/topup_g4_history.js',
      'subjects/grade4-history/questions/coverage_locality_community.js',
      'subjects/grade4-history/questions/coverage_voyages_environment.js',
      'subjects/grade4-history/questions/coverage_weather_maps.js',
    ],
  };

  function _injectScript(src) {
    return new Promise(resolve => {
      const s   = document.createElement('script');
      s.src     = src;
      s.onload  = resolve;
      s.onerror = resolve; // silently ignore missing files
      document.head.appendChild(s);
    });
  }

  // ── Multi-part tasks -> ordinary practisable items ────────────────────
  // ⚠ WITHOUT THIS, A WHOLE PACK IS INVISIBLE. `makeTask()` produces
  //   `type: "task"`, and `isPoolQuestion()` in questions_engine.js excludes
  //   "task" from every pool - practice, subsection practice AND
  //   assembleExamPaper. That exclusion is correct: a task carries parts a
  //   machine cannot mark (drawing, extended written) and parts that consume
  //   an earlier part's answer, and dealing one raw would put a number pad
  //   under "construct the perpendicular bisector".
  //
  //   `Assessment.projectToItems()` was written for exactly this and was
  //   never called from anywhere - grep found it only inside a comment. So
  //   grade9-maths held 667 authored tasks and a child would have opened all
  //   19 chapters empty. Measured: the 667 tasks project to 833 items
  //   (numeric 527 · expr 189 · mcq 83 · slots 34) covering all 19 chapters,
  //   none under 20 items, across all four difficulty levels.
  //
  // ⚠ THE PROJECTED ITEMS GO INTO STATIC_QUESTIONS, not into a side list.
  //   Eight places read that array directly - pools, chapter counts, the
  //   learning coach, the practice journey, the admin report viewer - and a
  //   parallel pool would have to be threaded through every one of them.
  //   The raw task stays in the array too: the printable NCE generator reads
  //   tasks, and isPoolQuestion() keeps them out of everything else.
  //
  // ⚠ Idempotent by task id. A subject can be loaded more than once (a failed
  //   load is retried, and useStudent() re-fetches), and expanding twice would
  //   duplicate every item - which getMixedQuestions() de-dupes by id, so it
  //   would look fine while silently halving the effective pool.
  function _expandTasks() {
    if (typeof STATIC_QUESTIONS === 'undefined') return 0;
    // ⚠ LOUD, NOT SILENT. If assessment.js has not run, returning 0 quietly
    //   reproduces the exact bug this function fixes: a pack full of tasks and
    //   a child seeing empty chapters, with nothing anywhere saying why.
    //   index.html loads assessment.js before this file, so this should be
    //   unreachable - which is precisely when a silent return is worst.
    if (typeof Assessment === 'undefined' || !Assessment.expandTasks) {
      if (STATIC_QUESTIONS.some(q => q && q.type === 'task')) {
        console.error('[QuestionLoader] Assessment.expandTasks is missing, so '
          + 'multi-part tasks cannot be turned into practisable questions. '
          + 'Check that engine/assessment.js loads before engine/question_loader.js.');
      }
      return 0;
    }
    // ⚠ THE SHARED HELPER, not a second loop. Assessment.expandTasks() is the
    //   one implementation, used by the bundle builder and the server sandbox
    //   too, and it is idempotent by id - which matters here because a
    //   production bundle ALREADY carries the projected items (they are added
    //   at build time so the browser, the database and assignment grading all
    //   see the same ids). This call is what covers file:// dev, where the
    //   source files are injected and carry only tasks.
    const out = Assessment.expandTasks(STATIC_QUESTIONS);
    if (out.length) STATIC_QUESTIONS.push(...out);
    return out.length;
  }

  async function _loadLocal(subjectId) {
    const files = LOCAL_FILES[subjectId] || [];
    for (const f of files) await _injectScript(f);
    _expandTasks();
  }

  const _CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

  // ⚠ BUMP THIS whenever question files are added or edited.
  //   Without it, the 7-day cache below means a child keeps being served the
  //   old question set for up to a week after a deploy - new chapters simply
  //   do not appear, with nothing in the UI to explain why.
  const _CACHE_VERSION = 132;

  // ⚠ A cached bundle belongs to WHOEVER IT WAS FETCHED FOR, not to the subject.
  // The key used to be the subject alone, on a device where a whole family
  // shares one browser - so the first child to open Maths cached the set the
  // server had filtered for THEM, and the next child, and the parent, read it
  // back. That is the same defect the service worker was stopped from having
  // (see the note above _LRU_KEY); this copy simply outlived the fix.
  //
  // The owner is whatever actually authorised the request, so the two can never
  // drift: a child's own session id, or 'adult' for a parent/teacher/admin JWT.
  // The slot - owner + subject - is the cache's unit of identity from here down;
  // subject ids carry no '|', so it parses back unambiguously.
  const _cacheKey = slot => `mm_qc_v${_CACHE_VERSION}_${slot}`;

  // ⚠ The stored session must belong to the child being served. A parent
  // previewing a child (pdSwitchStudent) has ACTIVE_STUDENT_ID pointing at that
  // child while the LAST real PIN login's session is still in storage - sending
  // that token would fetch one sibling's set while displaying another's. Same
  // discriminator Store.saveStudentProgress() uses to drop a stale write.
  function _activeStudentSession() {
    try {
      const sess = (typeof Store !== 'undefined') ? Store.getStudentSession() : null;
      if (!sess || !sess.token || !sess.id) return null;
      if (typeof ACTIVE_STUDENT_ID !== 'undefined' && ACTIVE_STUDENT_ID && sess.id !== ACTIVE_STUDENT_ID) return null;
      return sess;
    } catch (_) { return null; }
  }
  function _cacheOwner() {
    const sess = _activeStudentSession();
    return sess ? sess.id : 'adult';
  }
  const _slot = subjectId => `${_cacheOwner()}|${subjectId}`;

  // Drop caches written by any earlier version, so a bump reclaims the space
  // instead of leaving a dead copy of every subject behind.
  //
  // ⚠ 'mm_qc_v', not 'mm_qc_'. The recency index lives at `mm_qc_lru` and shares
  // the shorter prefix, so the broader test deleted it on EVERY page load - the
  // counter that decides which subject to evict was therefore empty every time,
  // and _cachedSubjectsLRUFirst treats "not in the index" as oldest, making
  // eviction order arbitrary. It matters more now that two children on one
  // device hold separate entries and evict each other.
  (function _purgeStaleCaches() {
    try {
      const keep = `mm_qc_v${_CACHE_VERSION}_`;
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.startsWith('mm_qc_v') && !k.startsWith(keep)) localStorage.removeItem(k);
      }
    } catch {}
  })();

  // ── Cache pressure ────────────────────────────────────────────────────
  // ⚠⚠ MEASURED 2026-09-07, and the reason this budget is in BYTES:
  //   largest subject   grade6-french  1,413 KB   (the old note here said 473 KB)
  //   all 15 live       8.48 MB                   (the old note said 4.3 MB)
  //   six largest       5.64 MB                   (i.e. _LRU_MAX = 6 on its own
  //                                                is already over the quota)
  // Re-measure with scripts/test-question-cache-budget.js, which reads the
  // built bundles rather than trusting these three lines.
  // The three French packs grew to ~2,100 questions each and nothing
  // re-measured. Counting SLOTS was fine while every subject was about the same
  // size; it stopped being fine the moment one subject was five times another.
  //
  // ⚠ There is nothing to strip from the payload. 74% of a French bundle is
  // question + explanation + hint + options - the teaching content itself, and
  // the part a child needs most when they are offline.
  //
  // Cross-grade practice is a real feature, so a child CAN reach the ceiling.
  //
  // Before this, every write was `catch {}` with no eviction, so hitting the
  // quota failed silently and stayed failed. Two consequences, neither visible:
  // every subject load refetched ~272 KB for ever, and - worse - the writes
  // that lose the race are whatever runs next, including
  // Store.saveStudentSession(). That one is also try/caught, so the token stays
  // installed on the live page and the child only discovers the session was
  // never persisted when they reload and land back on the PIN screen.
  //
  // ⚠ This cache is now the ONLY offline copy of the questions. The service
  // worker used to cache /functions/questions too, and deliberately no longer
  // does - that response varies per caller and a shared URL-keyed cache served
  // one child's entitled question set to another. So this is load-bearing.
  const _LRU_KEY  = 'mm_qc_lru';
  // ⚠ "One full grade" is no longer five subjects. Grade 9 registers EIGHT live
  // packs (Maths, ICT, Biology, Chemistry, Physics, English, Français, Social &
  // Modern Studies), so a cap of six evicted two of a Grade 9 child's own
  // subjects the moment they opened the seventh - measured 2026-09-09, the
  // budget test kept 6 of 8 and dropped Biology and Chemistry. It was invisible
  // because that test only ever measured grades 4-6.
  //
  // Nine = the largest live grade plus one, keeping the original "one grade with
  // room to spare" intent. Safe on size because _writeCache now compresses:
  // measured, all eight Grade 9 packs together store 0.75 MB against a 3.70 MB
  // byte budget. The BYTE budget is the real guard; the slot cap only bounds how
  // many entries can accumulate.
  // ⚠ Re-measure with scripts/test-question-cache-budget.js if a grade grows a
  // ninth subject - do not raise this on reasoning alone.
  //
  // ⚠ The cap counts SLOTS, not subjects, so two children practising on one
  // device now compete for the same six. That is deliberate: the alternative is
  // six per child against a ~5 MB quota shared with the progress blobs and the
  // session token, and a lost cache entry costs one refetch whereas a lost
  // session token reads to a parent as "it keeps logging me out".
  const _LRU_MAX  = 9;

  // ⚠ THE REAL LIMIT. localStorage is quota'd per origin at roughly 5 million
  // characters, and this cache is not the only tenant: the progress blob, the
  // student session token, the known-students list and the parent's stashed
  // refresh token all share it. 3 million leaves ~2 million for them.
  //
  // ⚠ The unit is CHARACTERS (String#length), not UTF-8 bytes, because that is
  // what the quota is actually counted in. For this content the two are within a
  // few percent of each other anyway, and length is free where a byte count is not.
  //
  // Sized so that A CHILD'S OWN GRADE ALWAYS FITS WHOLE, because that is the
  // entire offline case; cross-grade practice is the exception and evicts.
  // ⚠ RE-MEASURED 2026-09-08 after 594 questions were added: Grade 4 2.68 MB,
  // Grade 5 3.38 MB, Grade 6 3.14 MB. Grade 5 no longer fitted a 3.4 MB budget
  // once the per-entry envelope is counted, and the test caught it evicting
  // grade5-english - the exact failure the budget exists to prevent. Raised to
  // 3.7 MB, which leaves Grade 5 about 0.3 MB of headroom and puts the origin
  // near 4.3 MB of the 5 MB quota. Earlier totals were Grade 4 2.66, Grade 5
  // 3.05, Grade 6 2.72; a 3.0 MB budget was tried before that and also cost
  // Grade 5 a subject, which is the one case that must not lose one.
  // ⚠ This number cannot keep rising. At 5 MB the origin is full, so the next
  // grade that stops fitting needs the bundles to shrink or the cache to hold
  // less than a whole grade - decide that deliberately rather than by nudging
  // this constant again.
  // ⚠ An eviction costs one refetch. An over-quota WRITE costs whatever ran
  // next, and the write that loses that race is often
  // Store.saveStudentSession() - which is also try/caught, so the token stays
  // installed on the live page and the child only finds out when they reload.
  // A dropped question bundle is invisible; a dropped session token reads to a
  // parent as "it keeps logging me out".
  const _BYTE_BUDGET = 3700000;

  // Each entry holds BOTH facts: `u` is the monotonic use counter, `b` the size
  // in characters of what was written. An older index stored a bare number, so
  // that is read as { u: n, b: 0 } - b: 0 meaning "not measured yet", filled in
  // from storage the first time a total is needed. An existing install therefore
  // heals itself and no separate migration exists to forget.
  function _lruNorm(v) {
    if (typeof v === 'number') return { u: v, b: 0 };
    if (v && typeof v === 'object' && typeof v.u === 'number') {
      return { u: v.u, b: Number(v.b) || 0 };
    }
    return null;
  }
  function _lruRead() {
    try {
      const raw = JSON.parse(localStorage.getItem(_LRU_KEY)) || {};
      const out = {};
      for (const k of Object.keys(raw)) {
        const v = _lruNorm(raw[k]);
        if (v) out[k] = v;
      }
      return out;
    } catch { return {}; }
  }
  function _lruWrite(m) {
    try { localStorage.setItem(_LRU_KEY, JSON.stringify(m)); } catch {}
  }
  // Written on every cache HIT, so recency reflects USE, not write time. Kept in
  // its own tiny key (a few hundred bytes) rather than by rewriting the cached
  // envelope, which would mean re-serialising ~272 KB just to record a read.
  //
  // ⚠ A MONOTONIC COUNTER, not Date.now(). Timestamps looked obvious and were
  // wrong: several subjects are cached inside the same millisecond by
  // _loadBatchForGrade (it writes all five of a grade's subjects in one pass),
  // so they all recorded an identical time and the sort below had no way to
  // order them. Eviction then picked arbitrarily among the tied entries - which
  // showed up as a test that passed twice and failed the third time. A counter
  // gives a strict total order and does not care about clock resolution.
  // ⚠ Keyed on the SLOT (owner + subject), not the subject - two children on
  // one device hold two independent entries and evict independently.
  // `bytes` is passed on a WRITE and omitted on a read, where the size has not
  // changed and must be carried forward rather than reset to "unknown".
  function _lruTouch(subjectId, bytes) {
    try {
      const m = _lruRead();
      const vals = Object.values(m).map(v => v.u);
      const prev = m[subjectId];
      m[subjectId] = {
        u: (vals.length ? Math.max(...vals) : 0) + 1,
        b: typeof bytes === 'number' ? bytes : (prev ? prev.b : 0),
      };
      // Forget subjects that are no longer cached, so the index cannot grow
      // without bound across _CACHE_VERSION bumps.
      for (const k of Object.keys(m)) {
        if (k !== subjectId && localStorage.getItem(_cacheKey(k)) === null) delete m[k];
      }
      _lruWrite(m);
    } catch {}
  }
  function _lruForget(subjectId) {
    try {
      const m = _lruRead();
      if (subjectId in m) { delete m[subjectId]; _lruWrite(m); }
    } catch {}
  }

  // Cached subject ids, least recently used first. Anything cached but missing
  // from the index is treated as oldest - it was written before the index
  // existed, so it is the right thing to drop first.
  function _cachedSubjectsLRUFirst(exclude) {
    const ids = [];
    try {
      const prefix = `mm_qc_v${_CACHE_VERSION}_`;
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(prefix)) ids.push(k.slice(prefix.length));
      }
    } catch { return []; }
    const m = _lruRead();
    const u = id => (m[id] ? m[id].u : 0);
    return ids.filter(id => id !== exclude).sort((a, b) => u(a) - u(b));
  }

  // What every other cached slot is costing, least recently used first.
  //
  // ⚠ A size the index does not know is MEASURED, never assumed to be zero:
  // guessing low is exactly how a budget silently stops being a budget. The
  // measured value is written back, so this costs one extra read per entry once,
  // and nothing thereafter.
  function _cachedSizes(exclude) {
    const ids = _cachedSubjectsLRUFirst(exclude);
    const m = _lruRead();
    let dirty = false;
    const out = ids.map(id => {
      let b = m[id] ? m[id].b : 0;
      if (!b) {
        try { b = (localStorage.getItem(_cacheKey(id)) || '').length; } catch { b = 0; }
        if (b && m[id]) { m[id].b = b; dirty = true; }
      }
      return { id, b };
    });
    if (dirty) _lruWrite(m);
    return out;
  }

  // Only ever removes THIS cache's own keys. Never touches the session, the
  // progress copy, or anything else sharing the origin's quota.
  function _evictOldest(exclude, n) {
    const victims = _cachedSubjectsLRUFirst(exclude).slice(0, Math.max(1, n || 1));
    for (const id of victims) {
      try { localStorage.removeItem(_cacheKey(id)); } catch {}
      _lruForget(id);
    }
    return victims.length;
  }

  // Safari reports the quota differently from everyone else, and an old Firefox
  // differently again. Matching only 'QuotaExceededError' would silently skip
  // eviction on exactly the browser most likely to be tight for space.
  function _isQuotaError(e) {
    if (!e) return false;
    return e.name === 'QuotaExceededError'
        || e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
        || e.code === 22 || e.code === 1014;
  }

  // ⚠ An EMPTY payload is never a cache hit, and is never written.
  //
  // A subject can legitimately answer with nothing - every chapter gated by the
  // plan, or an expired account with no entitlements - and that answer used to
  // be cached like any other. For the next SEVEN DAYS the child then got a
  // subject with no questions in it, with nothing on screen to explain why, and
  // no way to recover even after the parent bought the chapter or renewed. It
  // also fed startChapterDirect's retry, which before this pass was unbounded.
  //
  // The cost of getting this wrong in the other direction is one extra request
  // per subject load for a family that really is entitled to nothing. That is
  // the cheaper mistake by a wide margin.
// ── Payload compression (lz-string, inlined) ─────────────────────────────
  // ⚠ The cache stores the teaching content itself (74% of a French bundle is
  // question + explanation + hint + options), so there is nothing to STRIP -
  // but JSON of repeated keys and prose compresses ~2:1, which is the same win
  // Netlify already gets gzipping these bundles on the wire. Halving the stored
  // size is what keeps a whole grade inside the ~5 MB localStorage origin quota
  // as the banks grow.
  //
  // compressToUTF16 is used on purpose: its output is valid, storable UTF-16
  // (every char >= 0x20), where raw compress() emits lone surrogates localStorage
  // can mangle. Synchronous by design - _readCache is consulted synchronously by
  // the routing in loadForStudent, and must stay that way.
  //
  // Canonical lz-string (pieroxy, MIT), trimmed to the two entry points used.
  const _LZ = (function () {
    var f = String.fromCharCode;
    function _compress(uncompressed, bitsPerChar, getCharFromInt) {
      if (uncompressed == null) return '';
      var i, value, context_dictionary = {}, context_dictionaryToCreate = {},
          context_c = '', context_wc = '', context_w = '', context_enlargeIn = 2,
          context_dictSize = 3, context_numBits = 2, context_data = [],
          context_data_val = 0, context_data_position = 0, ii;
      for (ii = 0; ii < uncompressed.length; ii += 1) {
        context_c = uncompressed.charAt(ii);
        if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
          context_dictionary[context_c] = context_dictSize++;
          context_dictionaryToCreate[context_c] = true;
        }
        context_wc = context_w + context_c;
        if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
          context_w = context_wc;
        } else {
          if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
            if (context_w.charCodeAt(0) < 256) {
              for (i = 0; i < context_numBits; i++) {
                context_data_val = (context_data_val << 1);
                if (context_data_position == bitsPerChar - 1) { context_data_position = 0; context_data.push(getCharFromInt(context_data_val)); context_data_val = 0; }
                else { context_data_position++; }
              }
              value = context_w.charCodeAt(0);
              for (i = 0; i < 8; i++) {
                context_data_val = (context_data_val << 1) | (value & 1);
                if (context_data_position == bitsPerChar - 1) { context_data_position = 0; context_data.push(getCharFromInt(context_data_val)); context_data_val = 0; }
                else { context_data_position++; }
                value = value >> 1;
              }
            } else {
              value = 1;
              for (i = 0; i < context_numBits; i++) {
                context_data_val = (context_data_val << 1) | value;
                if (context_data_position == bitsPerChar - 1) { context_data_position = 0; context_data.push(getCharFromInt(context_data_val)); context_data_val = 0; }
                else { context_data_position++; }
                value = 0;
              }
              value = context_w.charCodeAt(0);
              for (i = 0; i < 16; i++) {
                context_data_val = (context_data_val << 1) | (value & 1);
                if (context_data_position == bitsPerChar - 1) { context_data_position = 0; context_data.push(getCharFromInt(context_data_val)); context_data_val = 0; }
                else { context_data_position++; }
                value = value >> 1;
              }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) { context_enlargeIn = Math.pow(2, context_numBits); context_numBits++; }
            delete context_dictionaryToCreate[context_w];
          } else {
            value = context_dictionary[context_w];
            for (i = 0; i < context_numBits; i++) {
              context_data_val = (context_data_val << 1) | (value & 1);
              if (context_data_position == bitsPerChar - 1) { context_data_position = 0; context_data.push(getCharFromInt(context_data_val)); context_data_val = 0; }
              else { context_data_position++; }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn == 0) { context_enlargeIn = Math.pow(2, context_numBits); context_numBits++; }
          context_dictionary[context_wc] = context_dictSize++;
          context_w = String(context_c);
        }
      }
      if (context_w !== '') {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
          if (context_w.charCodeAt(0) < 256) {
            for (i = 0; i < context_numBits; i++) {
              context_data_val = (context_data_val << 1);
              if (context_data_position == bitsPerChar - 1) { context_data_position = 0; context_data.push(getCharFromInt(context_data_val)); context_data_val = 0; }
              else { context_data_position++; }
            }
            value = context_w.charCodeAt(0);
            for (i = 0; i < 8; i++) {
              context_data_val = (context_data_val << 1) | (value & 1);
              if (context_data_position == bitsPerChar - 1) { context_data_position = 0; context_data.push(getCharFromInt(context_data_val)); context_data_val = 0; }
              else { context_data_position++; }
              value = value >> 1;
            }
          } else {
            value = 1;
            for (i = 0; i < context_numBits; i++) {
              context_data_val = (context_data_val << 1) | value;
              if (context_data_position == bitsPerChar - 1) { context_data_position = 0; context_data.push(getCharFromInt(context_data_val)); context_data_val = 0; }
              else { context_data_position++; }
              value = 0;
            }
            value = context_w.charCodeAt(0);
            for (i = 0; i < 16; i++) {
              context_data_val = (context_data_val << 1) | (value & 1);
              if (context_data_position == bitsPerChar - 1) { context_data_position = 0; context_data.push(getCharFromInt(context_data_val)); context_data_val = 0; }
              else { context_data_position++; }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn == 0) { context_enlargeIn = Math.pow(2, context_numBits); context_numBits++; }
          delete context_dictionaryToCreate[context_w];
        } else {
          value = context_dictionary[context_w];
          for (i = 0; i < context_numBits; i++) {
            context_data_val = (context_data_val << 1) | (value & 1);
            if (context_data_position == bitsPerChar - 1) { context_data_position = 0; context_data.push(getCharFromInt(context_data_val)); context_data_val = 0; }
            else { context_data_position++; }
            value = value >> 1;
          }
        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) { context_enlargeIn = Math.pow(2, context_numBits); context_numBits++; }
      }
      value = 2;
      for (i = 0; i < context_numBits; i++) {
        context_data_val = (context_data_val << 1) | (value & 1);
        if (context_data_position == bitsPerChar - 1) { context_data_position = 0; context_data.push(getCharFromInt(context_data_val)); context_data_val = 0; }
        else { context_data_position++; }
        value = value >> 1;
      }
      while (true) {
        context_data_val = (context_data_val << 1);
        if (context_data_position == bitsPerChar - 1) { context_data.push(getCharFromInt(context_data_val)); break; }
        else context_data_position++;
      }
      return context_data.join('');
    }
    function _decompress(length, resetValue, getNextValue) {
      var dictionary = [], next, enlargeIn = 4, dictSize = 4, numBits = 3,
          entry = '', result = [], i, w, bits, resb, maxpower, power, c,
          data = { val: getNextValue(0), position: resetValue, index: 1 };
      for (i = 0; i < 3; i += 1) dictionary[i] = i;
      bits = 0; maxpower = Math.pow(2, 2); power = 1;
      while (power != maxpower) {
        resb = data.val & data.position; data.position >>= 1;
        if (data.position == 0) { data.position = resetValue; data.val = getNextValue(data.index++); }
        bits |= (resb > 0 ? 1 : 0) * power; power <<= 1;
      }
      switch (next = bits) {
        case 0:
          bits = 0; maxpower = Math.pow(2, 8); power = 1;
          while (power != maxpower) {
            resb = data.val & data.position; data.position >>= 1;
            if (data.position == 0) { data.position = resetValue; data.val = getNextValue(data.index++); }
            bits |= (resb > 0 ? 1 : 0) * power; power <<= 1;
          }
          c = f(bits); break;
        case 1:
          bits = 0; maxpower = Math.pow(2, 16); power = 1;
          while (power != maxpower) {
            resb = data.val & data.position; data.position >>= 1;
            if (data.position == 0) { data.position = resetValue; data.val = getNextValue(data.index++); }
            bits |= (resb > 0 ? 1 : 0) * power; power <<= 1;
          }
          c = f(bits); break;
        case 2:
          return '';
      }
      dictionary[3] = c; w = c; result.push(c);
      while (true) {
        if (data.index > length) return '';
        bits = 0; maxpower = Math.pow(2, numBits); power = 1;
        while (power != maxpower) {
          resb = data.val & data.position; data.position >>= 1;
          if (data.position == 0) { data.position = resetValue; data.val = getNextValue(data.index++); }
          bits |= (resb > 0 ? 1 : 0) * power; power <<= 1;
        }
        switch (c = bits) {
          case 0:
            bits = 0; maxpower = Math.pow(2, 8); power = 1;
            while (power != maxpower) {
              resb = data.val & data.position; data.position >>= 1;
              if (data.position == 0) { data.position = resetValue; data.val = getNextValue(data.index++); }
              bits |= (resb > 0 ? 1 : 0) * power; power <<= 1;
            }
            dictionary[dictSize++] = f(bits); c = dictSize - 1; enlargeIn--; break;
          case 1:
            bits = 0; maxpower = Math.pow(2, 16); power = 1;
            while (power != maxpower) {
              resb = data.val & data.position; data.position >>= 1;
              if (data.position == 0) { data.position = resetValue; data.val = getNextValue(data.index++); }
              bits |= (resb > 0 ? 1 : 0) * power; power <<= 1;
            }
            dictionary[dictSize++] = f(bits); c = dictSize - 1; enlargeIn--; break;
          case 2:
            return result.join('');
        }
        if (enlargeIn == 0) { enlargeIn = Math.pow(2, numBits); numBits++; }
        if (dictionary[c]) { entry = dictionary[c]; }
        else { if (c === dictSize) { entry = w + w.charAt(0); } else { return null; } }
        result.push(entry);
        dictionary[dictSize++] = w + entry.charAt(0);
        enlargeIn--;
        w = entry;
        if (enlargeIn == 0) { enlargeIn = Math.pow(2, numBits); numBits++; }
      }
    }
    return {
      compress: function (input) { if (input == null) return ''; return _compress(input, 15, function (a) { return f(a + 32); }) + ' '; },
      decompress: function (compressed) { if (compressed == null) return ''; if (compressed == '') return null; return _decompress(compressed.length, 16384, function (index) { return compressed.charCodeAt(index) - 32; }); },
    };
  })();

  // ⚠ A one-time self-test. If the inlined compressor ever fails to round-trip
  // (a broken edit, an exotic engine), compression is disabled and payloads are
  // stored raw - a broken compressor must never be allowed to corrupt the cache.
  // Reads still try to decompress regardless, so entries written by a healthy
  // earlier load stay readable.
  let _LZ_OK = false;
  try { const t = 'psac-cache-selftest-\u00a1\u00e9\u201c{}'; _LZ_OK = _LZ.decompress(_LZ.compress(t)) === t; } catch (_) { _LZ_OK = false; }

  // Compressed entries carry a one-char marker that JSON can never begin with
  // and that lz-string's UTF-16 output (every char >= 0x20) can never produce.
  // So a LEGACY uncompressed entry - which begins with '{' - is still read
  // correctly and simply rewritten compressed on its next refresh. This is why
  // no _CACHE_VERSION bump is needed and nothing is purged on deploy.
  const _CACHE_MARK = '\u0001';
  function _packCache(envelope) {
    if (_LZ_OK) {
      try {
        const z = _LZ.compress(envelope);
        if (z && z.length + 1 < envelope.length) return _CACHE_MARK + z;
      } catch (_) {}
    }
    return envelope;
  }
  function _unpackCache(raw) {
    const s = (raw.charCodeAt(0) === 1) ? _LZ.decompress(raw.slice(1)) : raw;
    return JSON.parse(s);
  }

    function _readCache(subjectId) {
    const slot = _slot(subjectId);
    try {
      const raw = localStorage.getItem(_cacheKey(slot));
      if (!raw) return null;
      const { ts, data } = _unpackCache(raw);
      if (Date.now() - ts > _CACHE_TTL) { localStorage.removeItem(_cacheKey(slot)); _lruForget(slot); return null; }
      if (!Array.isArray(data) || !data.length) { localStorage.removeItem(_cacheKey(slot)); _lruForget(slot); return null; }
      _lruTouch(slot);
      return data;
    } catch { return null; }
  }

  // ⚠ `slotOverride` exists because the WRITE is now deferred off the render
  // path (setTimeout in _loadFromAPI / _loadBatchForGrade), and between the
  // fetch and the deferred write the active child can change (a handover). The
  // owner must be the one who AUTHORISED THE FETCH, so the caller pins the slot
  // at fetch time and passes it here; resolving _slot() late would file one
  // child's bundle under whoever happens to be active when the timer fires.
  function _writeCache(subjectId, data, slotOverride) {
    if (!Array.isArray(data) || !data.length) return;
    const slot = slotOverride || _slot(subjectId);
    const envelope = JSON.stringify({ ts: Date.now(), data });
    const payload = _packCache(envelope);

    // Stay under BOTH caps BEFORE writing, so the common case never has to fail
    // a write first. _cachedSizes excludes this subject either way, so the total
    // after this write is always these entries + this payload - whether this is
    // a new entry or a refresh of an existing one.
    //
    // ⚠ The byte test is what actually protects the quota; the slot count is
    // kept as a second, cheaper guard on the number of entries. Evicting
    // least-recently-used first means a child's current subject is the last
    // thing to go.
    try {
      const held = _cachedSizes(slot);
      let bytes = held.reduce((s, e) => s + e.b, 0);
      let count = held.length;
      for (let i = 0; i < held.length; i++) {
        if (bytes + payload.length <= _BYTE_BUDGET && count + 1 <= _LRU_MAX) break;
        try { localStorage.removeItem(_cacheKey(held[i].id)); } catch {}
        _lruForget(held[i].id);
        bytes -= held[i].b;
        count--;
      }
      // ⚠ If one bundle is bigger than the whole budget the loop above empties
      // the cache and the write still goes ahead: caching the subject the child
      // is using right now, alone, beats caching nothing. The quota retry below
      // is what handles it if even that will not fit.
    } catch {}

    // Up to three attempts: the first may still fail if OTHER origins' data -
    // the progress blobs, another child's cache - has taken the space, and one
    // eviction may not free enough for a 473 KB bundle.
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        localStorage.setItem(_cacheKey(slot), payload);
        _lruTouch(slot, payload.length);
        return;
      } catch (e) {
        if (!_isQuotaError(e)) return;          // not a space problem - give up
        if (!_evictOldest(slot, 2)) return;     // nothing left to evict
      }
    }
    // Still no room: leave the cache alone rather than thrashing. The subject
    // simply refetches next time, which is the pre-existing behaviour.
  }

  // ⚠ The CHILD's credential wins whenever a child is the one being served.
  //
  // This used to prefer the parent's JWT whenever one existed, and on a shared
  // family phone one always does - both sessions live on the device at once, by
  // design. So a child practising beside a signed-in parent was authorised as
  // the PARENT, and questions.js resolves the owner from whoever asked: a JWT
  // carries no studentExpiresAt, so that child's own expiry date was never
  // applied and they were served the full plan set. The server was answering
  // the question it was asked; the browser was asking it as the wrong person.
  //
  // The TOKEN, not the id. The id only ever identified the child; the function
  // used to accept it as proof of who was asking, which meant anyone holding a
  // child's UUID could pull that child's gated question set. This is the same
  // opaque session token RLS already checks through current_student_id(), and
  // it expires and can be revoked.
  async function _buildAuthHeaders() {
    const headers = {};
    const sess = _activeStudentSession();
    if (sess) { headers['X-Student-Token'] = sess.token; return headers; }
    if (typeof _sb !== 'undefined' && _sb) {
      const { data: { session } } = await _sb.auth.getSession().catch(() => ({ data: {} }));
      if (session?.access_token) headers['Authorization'] = `Bearer ${session.access_token}`;
    }
    return headers;
  }

  // Returns TRUE only when the server actually answered. ⚠ The distinction is
  // load-bearing: "the server says you get nothing for this subject" is a final
  // answer and must not be retried, but "we never managed to ask" is not, and
  // treating the two the same is what let one 401 mark a subject permanently
  // loaded with zero questions in it. Every chapter in that subject then looked
  // empty for the rest of the session, with no way back short of a reload.
  async function _loadFromAPI(subjectId) {
    try {
      const cached = _readCache(subjectId);
      if (cached) {
        const existing = new Set(STATIC_QUESTIONS.map(q => q.id));
        STATIC_QUESTIONS.push(...cached.filter(q => !existing.has(q.id)));
        // ⚠ The CACHE holds raw tasks too, so a cache hit needs expanding
        //   exactly as a network fetch does. Missing this would make the
        //   pack work on first load and vanish for the next seven days.
        _expandTasks();
        return true;
      }

      const headers = await _buildAuthHeaders();
      if (!headers['Authorization'] && !headers['X-Student-Token']) {
        // Nothing was asked. This happens on a race with session restore, and
        // the next attempt usually has a token.
        console.warn('[QuestionLoader] No auth - skipping API load for', subjectId);
        return false;
      }

      const resp = await fetch(`/.netlify/functions/questions?subject=${encodeURIComponent(subjectId)}`, { headers });
      if (!resp.ok) { console.warn('[QuestionLoader] API error', resp.status); return false; }

      const incoming = await resp.json();
      const existing = new Set(STATIC_QUESTIONS.map(q => q.id));
      STATIC_QUESTIONS.push(...incoming.filter(q => !existing.has(q.id)));
      _expandTasks();
      // ⚠ Cache AFTER the questions are usable, on a LATER task. Compressing a
      // full bundle is ~0.5s of synchronous lz-string work, and blocking the
      // first question's render on it is the one regression compression adds.
      // The cache only serves offline / the next session, so it owes the child
      // nothing this instant; setTimeout(0) lets the paint happen first.
      const _slotNow = _slot(subjectId);
      setTimeout(() => { try { _writeCache(subjectId, incoming, _slotNow); } catch (_) {} }, 0);
      return true;

    } catch(e) {
      console.warn('[QuestionLoader] Fetch error:', e.message);
      return false;
    }
  }

  // Batch-load all subjects for a grade in a single API call (production only).
  // Falls back to per-subject loads on error.
  async function _loadBatchForGrade(grade, packs) {
    try {
      const headers = await _buildAuthHeaders();
      if (!headers['Authorization'] && !headers['X-Student-Token']) return false;

      const resp = await fetch(`/.netlify/functions/questions?all=1&grade=${grade}`, { headers });
      if (!resp.ok) return false;

      const bundle = await resp.json(); // { 'grade5-maths': [...], ... }
      const existing = new Set(STATIC_QUESTIONS.map(q => q.id));
      for (const [subjectId, questions] of Object.entries(bundle)) {
        if (!Array.isArray(questions)) continue;
        _done.add(subjectId);
        STATIC_QUESTIONS.push(...questions.filter(q => !existing.has(q.id)));
        questions.forEach(q => existing.add(q.id));
        // ⚠ One compression per task, not a whole grade's in one synchronous
        // burst - see _loadFromAPI. Each setTimeout(0) is its own macrotask, so
        // the event loop can paint and take input between subjects instead of
        // freezing for the sum of all of them. The slot is pinned now (owner =
        // the fetch's authoriser), not re-resolved when the timer fires.
        const _slotNow = _slot(subjectId);
        setTimeout(() => { try { _writeCache(subjectId, questions, _slotNow); } catch (_) {} }, 0);
      }
      return true;
    } catch(e) {
      console.warn('[QuestionLoader] Batch fetch error:', e.message);
      return false;
    }
  }

  // ── Public API ─────────────────────────────────
  async function loadSubject(subjectId) {
    if (!subjectId || _done.has(subjectId)) return;
    // Added BEFORE the await so two concurrent calls do not both fetch, and
    // removed again if the load did not actually happen - see _loadFromAPI.
    // Without the rollback a transient failure was permanent for the session:
    // _done said "loaded", the pool was empty, and startChapterDirect's retry
    // then spun on a promise that resolved instantly and changed nothing.
    _done.add(subjectId);

    let ok;
    if (_isFileProtocol) {
      ok = await _loadLocal(subjectId);
    } else {
      ok = await _loadFromAPI(subjectId);
    }
    if (ok === false) _done.delete(subjectId);
  }

  // Which subject to fetch before the others. ACTIVE_PACK is set once the child
  // picks a subject; on a fresh login nobody has picked yet, so fall back to the
  // one the dashboard will open by default - the same `find(!comingSoon)` rule
  // _activePack() uses, kept in step with it deliberately.
  function _activeSubjectId(packs) {
    if (!packs.length) return null;
    const active = (typeof ACTIVE_PACK !== 'undefined' && ACTIVE_PACK) ? ACTIVE_PACK.id : null;
    if (active && packs.some(p => p.id === active)) return active;
    return (packs.find(p => !p.comingSoon) || packs[0]).id;
  }

  // Awaits EVERY subject in the grade. loadForStudent() deliberately no longer
  // does that - it resolves as soon as the active subject is in, and prefetches
  // the rest - so anything that reads across the whole bank (the admin report
  // viewer looking up an arbitrary question id) has to ask for it explicitly.
  async function loadAllForGrade(grade) {
    const gs = window.GLOBAL_SETTINGS || {};
    if (typeof SUBJECT_PACKS === 'undefined') return;
    const packs = SUBJECT_PACKS.filter(p =>
      p.grade === grade && !p.comingSoon &&
      !(gs.disabled_grades   || []).includes(p.grade) &&
      !(gs.disabled_subjects || []).includes(p.id)
    );
    await Promise.allSettled(packs.map(p => loadSubject(p.id)));
  }

  // Pre-load the active subject as soon as we know who's logged in
  async function loadForStudent(grade, subjectHint) {
    const gs = window.GLOBAL_SETTINGS || {};
    const disabledGrades   = gs.disabled_grades   || [];
    const disabledSubjects = gs.disabled_subjects || [];

    if (subjectHint) {
      if (!disabledSubjects.includes(subjectHint)) await loadSubject(subjectHint);
      return;
    }

    if (typeof SUBJECT_PACKS === 'undefined') return;
    const packs = SUBJECT_PACKS.filter(p =>
      p.grade === grade &&
      !p.comingSoon &&
      !disabledGrades.includes(p.grade) &&
      !disabledSubjects.includes(p.id)
    );

    // In file:// mode, fall back to per-subject script injection
    if (_isFileProtocol) {
      for (const p of packs) await loadSubject(p.id);
      return;
    }

    // Check if all subjects are already cached - skip the network entirely
    const allCached = packs.every(p => _done.has(p.id) || _readCache(p.id) !== null);
    if (allCached) {
      for (const p of packs) await loadSubject(p.id);
      return;
    }

    // Fetch the subject the child is about to use FIRST, on its own, and leave
    // the other four to load in the background.
    //
    // The batch call is one request but it is the whole grade - 346 KB gzipped
    // for grade 5 - so a child opening Maths waited on English, French, History
    // and Science too, on every cold cache. One subject is 26-100 KB. The rest
    // still arrive, just after the screen is usable; startChapterDirect() waits
    // on QuestionLoader anyway, so nothing can race ahead of its own questions.
    const active = _activeSubjectId(packs);
    if (active) {
      await loadSubject(active);
      const rest = packs.filter(p => p.id !== active && !_done.has(p.id));
      if (rest.length) {
        // Not awaited on purpose: this is prefetch, not a dependency.
        Promise.all(rest.map(p => loadSubject(p.id))).catch(() => {});
      }
      return;
    }

    // Batch fetch: one request for all subjects in this grade
    const batchOk = await _loadBatchForGrade(grade, packs);
    if (!batchOk) {
      // Fallback: load individually
      for (const p of packs) await loadSubject(p.id);
    }
  }

  // ── Past papers ─────────────────────────────────────────────────────────
  // Deliberately NOT pushed into STATIC_QUESTIONS: these have no `answer` and
  // must never end up in a practice or exam pool that expects to mark them.
  // Returned to the caller instead, and cached for the session only - they are
  // read once, on a screen the child opens on purpose.
  let _papersCache = null;

  async function loadPastPapers(grade) {
    if (_papersCache) return _papersCache.filter(q => !grade || String(q.grade) === String(grade));
    if (_isFileProtocol) return [];          // no API in local file:// dev
    try {
      const headers = await _buildAuthHeaders();
      if (!headers['Authorization'] && !headers['X-Student-Token']) return [];
      const resp = await fetch('/.netlify/functions/questions?papers=1', { headers });
      if (!resp.ok) { console.warn('[QuestionLoader] past papers', resp.status); return []; }
      _papersCache = await resp.json();
      return _papersCache.filter(q => !grade || String(q.grade) === String(grade));
    } catch (e) {
      console.warn('[QuestionLoader] past papers:', e.message);
      return [];
    }
  }

  // ── Handover ────────────────────────────────────────────────────────────
  // ⚠ STATIC_QUESTIONS is a module-level array and _done a module-level Set, and
  // switching child NEVER reloads the page (openStudentSwitch and pdSwitchStudent
  // are both in-page). Without this the next child inherits the previous one's
  // pool outright, and _done tells every loader there is nothing left to fetch -
  // which defeats the owner-scoped cache above entirely.
  //
  // The baseline is captured at module load: this file runs after every
  // _manifest.js, so anything already in the array was put there by the packs
  // themselves and must survive. Everything above it is ours to drop.
  const _baseCount = (typeof STATIC_QUESTIONS !== 'undefined') ? STATIC_QUESTIONS.length : 0;
  let _poolOwner = null;

  function reset() {
    _done.clear();
    _papersCache = null;
    if (typeof STATIC_QUESTIONS !== 'undefined' && STATIC_QUESTIONS.length > _baseCount) {
      STATIC_QUESTIONS.length = _baseCount;
    }
    // Drop in-flight question references so a parent preview of child B never
    // serves child A's question objects from a still-open practice screen.
    if (typeof S !== 'undefined') {
      if (S.practice) S.practice.qs = [];
      if (S.exam)     S.exam.qs     = [];
    }
  }

  // Called on every handover. A no-op when the same child signs back in, so an
  // ordinary re-login still costs nothing; `null` (logout) also parks the pool.
  function useStudent(studentId) {
    const next = studentId || null;
    if (next === _poolOwner) return;
    _poolOwner = next;
    reset();
  }

  return { loadSubject, loadForStudent, loadAllForGrade, loadPastPapers, useStudent, reset };
})();
