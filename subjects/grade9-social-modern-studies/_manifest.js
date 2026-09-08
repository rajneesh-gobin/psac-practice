'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 - Social & Modern Studies   ·   SYLLABUS ONLY, NO QUESTIONS YET
//
//  Chapters below are the real MIE lower-secondary syllabus, taken from the
//  National Curriculum Framework / Teaching and Learning Syllabus, Grades 7 to 9
//  (Nine-Year Continuous Basic Education, MIE). The exam at the end of Grade 9
//  is the NCE, not the PSAC.
//
//  ⚠ comingSoon STAYS true until real questions land. It makes
//    activateSubjectPack() refuse the pack, keeps it out of QuestionLoader's
//    per-grade fetch and out of assembleExamPaper(), and renders the grade card
//    as "Coming Soon" and disabled. Real chapters are NOT on their own a reason
//    to flip it - a child opening a chapter with no questions is worse than a
//    card that says the pack is not ready.
//
//  TO FILL THIS IN
//    1. Write questions/ch01_*.js files, using subjects/grade4-maths as the
//       model. IDs: g9sms-<chapter>-001 style. Every question needs a
//       `subsection:` tag, and every tagged id must also be declared in
//       G9SMS_SYLLABUS below - the two must match exactly per chapter.
//    2. Add each new file to LOCAL_FILES in engine/question_loader.js (file://
//       dev only - production auto-discovers) and bump _CACHE_VERSION.
//    3. Delete questions/ch01_sample.js.
//    4. Set comingSoon: false only once every chapter above has questions.
// ══════════════════════════════════════════════════════════════════════════

// Sub-topics for the Syllabus screen.
//
// ⚠⚠ THIS PACK WAS RESTRUCTURED FROM 3 CHAPTERS TO 17 ON 2026-09-08, and the
//   chapter list, the weights and the map below all come from
//   docs/nce-grade9/blueprint-social-modern-studies.md, which measured all five
//   NCE papers question by question. examWeight is derived from marks and the
//   seventeen sum to exactly 40 (History 13 + Geography 11 + Civics 16).
//
//   WHY IT HAD TO CHANGE. The three chapters it had — development, links,
//   population, weight 3 each, summing to 9 — covered **103 of 472 mark-bearing
//   points, 22% of the exam**. Missing entirely: the whole History strand
//   (colonial period and independence, living conditions 1940s-60s,
//   industrialisation and the EPZ, Chagos and Tromelin), map/table/graph skills,
//   migration, the outer islands, natural hazards, government and the welfare
//   state, media, family, and social change. Writing questions against the old
//   three would have built a pack that ignored four fifths of the paper.
//
//   ⚠ `g9sms-development` NO LONGER EXISTS. It was a merge of four blueprint
//   chapters (economy-1960s, industrialisation, industrial-impact,
//   economy-today) and is split back into them here. Anything still pointing at
//   that id is an orphan — scripts/test-chapter-ids.js will name it.
//   `g9sms-population` and `g9sms-links` survive unchanged in id, though links
//   is renamed to the blueprint's "Mauritius and the World" and both gain
//   weight (3 → 4) to match their measured marks.
//
//   ⚠ A CHAPTER CHANGE MEANS `node scripts/build-subject-index.js`.
//   scripts/check.js fails on drift, so this cannot ship stale.
//
// ⚠ TAGGING TARGETS, declared ahead of the questions. Invisible while
//   comingSoon keeps the pack out of activateSubjectPack(), the per-grade fetch
//   and assembleExamPaper(). THIS PACK MUST NOT GO LIVE UNTIL EVERY ID BELOW
//   HAS QUESTIONS — scripts/test-subsection-invariant.js starts failing the
//   moment comingSoon flips, and already reports orphaned tags in hidden packs.
//   ⚠ Where a written question already carries a tag, THE TAG WINS: rename the
//   declaration, never the questions.
//
// ⚠ `life_expectancy` appears in BOTH g9sms-development and g9sms-population.
//   That is the blueprint's own doing — it is asked as an effect of
//   industrialisation and as a demographic measure — and the invariant is
//   per-chapter, so this is legal. Tag by which question is being asked.
const G9SMS_SYLLABUS = {
  'g9sms-colonial-independence': { subsections: [
    { id: 'colonial_period', name: 'The colonial period' },
    { id: 'parties_1967', name: 'The political parties and the 1967 election' },
    { id: 'independence_1968', name: 'Independence in 1968' },
    { id: 'republic_1992', name: 'Becoming a republic in 1992' },
  ] },
  'g9sms-living-conditions': { subsections: [
    { id: 'health_and_disease', name: 'Health and disease, including malaria' },
    { id: 'housing_transport', name: 'Housing and transport' },
    { id: 'education_before_reform', name: 'Education before the reforms' },
    { id: 'strike_1975', name: 'The 1975 student strike' },
  ] },
  'g9sms-economy-1960s': { subsections: [
    { id: 'sugar_dependence', name: 'Dependence on sugar at independence' },
    { id: 'obstacles', name: 'Obstacles facing the new country' },
    { id: 'predictions', name: 'Predictions made for the new country' },
    { id: 'early_measures', name: 'The first measures taken' },
  ] },
  'g9sms-industrialisation': { subsections: [
    { id: 'import_substitution', name: 'Import substitution industrialisation' },
    { id: 'epz_incentives', name: 'The EPZ and its incentives' },
    { id: 'sectors_over_time', name: 'How the sectors changed over time' },
    { id: 'mauritian_miracle', name: 'The Mauritian Miracle' },
  ] },
  'g9sms-industrial-impact': { subsections: [
    { id: 'work_and_jobs', name: 'Effects on work and jobs' },
    { id: 'life_expectancy', name: 'Life expectancy and standard of living' },
    { id: 'environment_impact', name: 'Effects on the environment' },
  ] },
  'g9sms-chagos-tromelin': { subsections: [
    { id: 'chagos_history', name: 'The history of the Chagos Archipelago' },
    { id: 'expulsion_and_icj', name: 'The expulsion of the Chagossians and the ICJ opinion' },
    { id: 'diego_garcia', name: 'Diego Garcia' },
    { id: 'tromelin', name: 'Tromelin' },
  ] },
  'g9sms-map-data-skills': { subsections: [
    { id: 'map_key_and_scale', name: 'Using a map key and scale' },
    { id: 'map_shading', name: 'Reading and completing shaded maps' },
    { id: 'table_reading', name: 'Reading data from a table' },
    { id: 'graph_reading', name: 'Reading data from a graph' },
    { id: 'pyramid_construction', name: 'Constructing a population pyramid' },
  ] },
  'g9sms-population': { subsections: [
    { id: 'density_distribution', name: 'Population density and distribution' },
    { id: 'structure_pyramids', name: 'Population structure and pyramids' },
    { id: 'birth_death_rates', name: 'Birth and death rates' },
    { id: 'life_expectancy', name: 'Life expectancy and standard of living' },
    { id: 'ageing', name: 'An ageing population' },
  ] },
  'g9sms-migration': { subsections: [
    { id: 'internal_international', name: 'Internal and international migration' },
    { id: 'push_pull', name: 'Push and pull factors' },
    { id: 'refugees_displacement', name: 'Refugees and displacement' },
  ] },
  'g9sms-outer-islands': { subsections: [
    { id: 'agalega', name: 'Agalega' },
    { id: 'rodrigues', name: 'Rodrigues' },
    { id: 'services_and_access', name: 'Services on the outer islands and how people reach them' },
  ] },
  'g9sms-hazards-environment': { subsections: [
    { id: 'cyclones', name: 'Cyclones and their effects' },
    { id: 'climate_change', name: 'Climate change' },
    { id: 'environmental_damage', name: 'Environmental damage and how to reduce it' },
  ] },
  'g9sms-government-welfare': { subsections: [
    { id: 'head_of_state_voting', name: 'The Head of State and how voting works' },
    { id: 'constitution', name: 'The Constitution' },
    { id: 'taxes_and_mra', name: 'Taxes and the MRA' },
    { id: 'welfare_measures', name: 'The welfare state and its measures' },
    { id: 'rights_and_law', name: 'Rights, responsibilities and the law' },
  ] },
  'g9sms-media': { subsections: [
    { id: 'types_of_media', name: 'The types of media' },
    { id: 'roles_of_media', name: 'The roles of the media in society' },
    { id: 'media_and_learning', name: 'Media and learning' },
    { id: 'media_and_lifestyle', name: 'Media and lifestyle' },
  ] },
  'g9sms-family': { subsections: [
    { id: 'family_types', name: 'The types of family' },
    { id: 'family_functions', name: 'The functions of the family' },
    { id: 'gender_roles', name: 'Gender roles' },
    { id: 'women_at_work', name: 'Women at work' },
  ] },
  'g9sms-social-change': { subsections: [
    { id: 'forces_of_change', name: 'The forces that bring about social change' },
    { id: 'social_movements', name: 'Social movements and collective behaviour' },
    { id: 'deviance_and_norms', name: 'Deviance and social norms' },
    { id: 'social_mobility', name: 'Social mobility' },
  ] },
  'g9sms-links': { subsections: [
    { id: 'origins_of_our_people', name: 'Where our people came from' },
    { id: 'links_india_africa', name: 'Links with India and Africa' },
    { id: 'links_europe_france', name: 'Links with Europe and France' },
    { id: 'regional_organisations', name: 'Regional and international organisations' },
    { id: 'benefits_of_membership', name: 'What membership brings us' },
  ] },
  'g9sms-economy-today': { subsections: [
    { id: 'sectors', name: 'The sectors of the economy today' },
    { id: 'factors_of_production', name: 'Factors of production' },
    { id: 'siting_a_factory', name: 'Choosing where to site a factory' },
  ] },
};;

registerSubject({
  id: 'grade9-social-modern-studies', name: 'Social & Modern Studies', grade: 9, icon: '🌍', subject: 'Social & Modern Studies',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: true,
  practiceble: true, notesBased: false, level4Label: 'Word Problems',
  syllabus: G9SMS_SYLLABUS,
  chapters: [
    // ── History strand — 160 marks, 32.0% of the exam, weights sum 13 ────────
    { id: 'g9sms-colonial-independence', name: 'Colonial Past & the Road to Independence', icon: '🏛️', examWeight: 1,
      syllabus: 'Recall the main features of the colonial period. Identify the political parties contesting the 1967 election and what was at stake. Explain how Mauritius became independent in 1968 and a republic in 1992.' },
    { id: 'g9sms-living-conditions',     name: 'Living Conditions, 1940s–1960s',           icon: '🏚️', examWeight: 2,
      syllabus: 'Describe health and disease before independence, including malaria. Describe housing and transport of the period. Explain what education was like before the reforms. Discuss the 1975 student strike and what it changed.' },
    { id: 'g9sms-economy-1960s',         name: 'The Economy at Independence & Its Obstacles', icon: '🌾', examWeight: 2,
      syllabus: 'Understand the socio-economic conditions of Mauritius at the time of independence, and its dependence on sugar. Identify the obstacles the new country faced and the predictions made about its future. Describe the first measures taken to address them.' },
    { id: 'g9sms-industrialisation',     name: 'Industrialisation: ISI, the EPZ & the Mauritian Miracle', icon: '🏭', examWeight: 4,
      syllabus: 'Discuss the different stages in the economic development of Mauritius. Explain import substitution industrialisation and why it was adopted. Describe the Export Processing Zone and the incentives offered. Trace how the sectors of the economy changed over time and explain the Mauritian Miracle.' },
    { id: 'g9sms-industrial-impact',     name: 'Impacts of Industrialisation on Society',  icon: '🔁', examWeight: 2,
      syllabus: 'Analyse the social and environmental impact of industrialisation. Discuss its effects on work and jobs, on life expectancy and standard of living, and on the environment.' },
    { id: 'g9sms-chagos-tromelin',       name: 'Chagos, Tromelin & Our Territory',         icon: '🗺️', examWeight: 2,
      syllabus: 'Recall the history of the Chagos Archipelago and the expulsion of its people. Discuss the ICJ opinion and the status of Diego Garcia. Explain the position of Tromelin.' },

    // ── Geography strand — 128 marks, 25.6%, weights sum 11 ─────────────────
    // ⚠ Map, Table & Graph Skills is deliberately a chapter, not a footnote:
    //   23 marks a paper-cycle are pure stimulus interpretation with no content
    //   recall, and the pack previously said nothing about a skill at all.
    { id: 'g9sms-map-data-skills',       name: 'Map, Table & Graph Skills',                icon: '📐', examWeight: 2,
      syllabus: 'Use a map key and scale. Read and complete shaded maps. Read data from tables and graphs. Construct a population pyramid from given figures.' },
    { id: 'g9sms-population',            name: 'Population Studies',                       icon: '👥', examWeight: 4,
      syllabus: 'Identify and discuss the factors affecting population growth in Mauritius and the world. Describe population density and distribution. Read and construct population pyramids. Explain birth and death rates, life expectancy and an ageing population. Develop skills in interpreting population data.' },
    { id: 'g9sms-migration',             name: 'Migration & the Movement of People',       icon: '🧳', examWeight: 2,
      syllabus: 'Explore the socio-economic, political and environmental reasons for the movement of people. Distinguish internal from international migration. Explain push and pull factors. Distinguish migration, circulation and displacement, including refugees.' },
    { id: 'g9sms-outer-islands',         name: 'Rodrigues, Agalega & the Outer Islands',   icon: '🏝️', examWeight: 2,
      syllabus: 'Locate and describe Rodrigues and Agalega. Discuss the services available on the outer islands and how people reach them.' },
    { id: 'g9sms-hazards-environment',   name: 'Natural Hazards & the Environment',        icon: '🌀', examWeight: 1,
      syllabus: 'Describe cyclones and their effects on Mauritius. Discuss climate change and environmental damage, and measures to reduce them.' },

    // ── Civics / modern studies strand — 212 marks, 42.4%, weights sum 16 ───
    { id: 'g9sms-government-welfare',    name: 'Government, Citizenship & the Welfare State', icon: '⚖️', examWeight: 3,
      syllabus: 'Identify the Head of State and explain how voting works. Describe the Constitution. Explain taxes and the role of the MRA. Discuss the salient features that shaped our welfare state, and the rights and responsibilities of a citizen before the law.' },
    { id: 'g9sms-media',                 name: 'Media & Communication',                    icon: '📱', examWeight: 3,
      syllabus: 'Identify the types of media. Discuss the roles of the media in society. Explain how media supports learning and how it shapes lifestyle.' },
    { id: 'g9sms-family',                name: 'Family & Social Roles',                    icon: '👨‍👩‍👧', examWeight: 3,
      syllabus: 'Identify the types of family. Discuss the functions of the family. Examine gender roles and the place of women at work.' },
    { id: 'g9sms-social-change',         name: 'Social Change & Collective Behaviour',     icon: '🔀', examWeight: 2,
      syllabus: 'Identify the forces that bring about social change. Discuss social movements and collective behaviour. Explain deviance and social norms, and describe social mobility.' },
    { id: 'g9sms-links',                 name: 'Mauritius and the World',                  icon: '🌐', examWeight: 4,
      syllabus: 'Recall that people came to settle in our islands from different countries. Explain the historical and contemporary links between Mauritius and Africa, Asia and Europe. Recognise that Mauritius has maintained and strengthened links with countries of origin. Discuss the importance of membership of regional and international organisations and what it brings.' },
    { id: 'g9sms-economy-today',         name: 'Economy & Work Today',                     icon: '💼', examWeight: 1,
      syllabus: 'Identify the sectors of the economy today. Explain the factors of production. Discuss what decides where a factory is sited. Understand the need for innovation in sustaining development.' },
  ],
});
