'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 7 - Social & Modern Studies   ·   SYLLABUS ONLY, NO QUESTIONS YET
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
//       model. IDs: g7sms-<chapter>-001 style. Every question needs a
//       `subsection:` tag, and every tagged id must also be declared in
//       G7SMS_SYLLABUS below - the two must match exactly per chapter.
//    2. Add each new file to LOCAL_FILES in engine/question_loader.js (file://
//       dev only - production auto-discovers) and bump _CACHE_VERSION.
//    3. Delete questions/ch01_sample.js.
//    4. Set comingSoon: false only once every chapter above has questions.
// ══════════════════════════════════════════════════════════════════════════

const G7SMS_SYLLABUS = {
  'g7sms-islands': { subsections: [
    { id:'islands_republic', name:'Islands of the Republic' },
    { id:'island_types',     name:'Types of Islands' },
    { id:'landforms',        name:'Landforms' },
  ]},
  'g7sms-origins': { subsections: [
    { id:'historical_significance', name:'Historical Significance' },
    { id:'settlers_origins',        name:'Origins of Settlers' },
    { id:'cultural_diversity',      name:'Cultural Diversity' },
  ]},
  'g7sms-people': { subsections: [
    { id:'contributions_mauritians',   name:'Contributions of Mauritians' },
    { id:'achievements_arts_sport',    name:'Achievements in Arts & Sport' },
    { id:'individuals_country',        name:'Individuals & the Country' },
  ]},
  'g7sms-settlement': { subsections: [
    { id:'settlement_factors',   name:'Settlement Factors' },
    { id:'physical_historical',  name:'Physical & Historical Factors' },
    { id:'settlement_evolution', name:'Evolution of Settlements' },
  ]},
  'g7sms-resources': { subsections: [
    { id:'natural_resources',    name:'Natural Resources' },
    { id:'resource_types',       name:'Types of Resources' },
    { id:'resources_settlement', name:'Resources & Settlement' },
  ]},
};

registerSubject({
  id: 'grade7-social-modern-studies', name: 'Social & Modern Studies', grade: 7, icon: '🌍', subject: 'Social & Modern Studies',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: false,
  practiceble: true, notesBased: false, level4Label: 'Word Problems',
  syllabus: G7SMS_SYLLABUS,
  chapters: [
    { id: 'g7sms-islands',              name: 'Our Islands & their Landforms',      icon: '🏝️', examWeight: 3,
      syllabus: 'Name and locate on maps the islands forming the Republic of Mauritius. Describe the main characteristics of a volcanic island, a coral island and a coral atoll. Understand the different types of island found in the region. Geographical strand of the content area Knowing my country.' },
    { id: 'g7sms-origins',              name: 'Origins, Heritage & Identity',       icon: '📜', examWeight: 3,
      syllabus: 'Discuss the importance of our islands from a historical perspective. Discuss the origins of the people who settled on the islands. Explain the meaning of cultural diversity. Recognise that our origins and cultural diversity are our heritage. Appreciate our unique Mauritian identity.' },
    { id: 'g7sms-people',               name: 'Our Country, Our People',            icon: '👥', examWeight: 2,
      syllabus: 'Appreciate the contributions of Mauritians and of groups from various fields. Recognise achievements in the arts, sport, science and public life. Understand how individuals shape the life of a country.' },
    { id: 'g7sms-settlement',           name: 'Where People Live',                  icon: '🏘️', examWeight: 3,
      syllabus: 'Describe and explain the factors that promote settlement in different places. Consider physical, historical and social factors together. Explore how settlements have evolved differently over time in our islands.' },
    { id: 'g7sms-resources',            name: 'People, Places & the Environment',   icon: '🌍', examWeight: 3,
      syllabus: 'Explain the meaning of the term natural resource. Recognise that natural resources are found in the atmosphere, hydrosphere, lithosphere and biosphere. Identify the natural resources of our islands. Recognise that natural resources have always influenced where people live.' },
  ],
});
