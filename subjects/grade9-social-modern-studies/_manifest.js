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

// Sub-topics for the Syllabus screen. Deliberately EMPTY: a subsection id
// declared here with no questions behind it advertises a topic that opens
// empty. Add ids only as questions are written and tagged.
const G9SMS_SYLLABUS = {};

registerSubject({
  id: 'grade9-social-modern-studies', name: 'Social & Modern Studies', grade: 9, icon: '🌍', subject: 'Social & Modern Studies',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: true,
  practiceble: true, notesBased: false, level4Label: 'Word Problems',
  syllabus: G9SMS_SYLLABUS,
  chapters: [
    { id: 'g9sms-development',          name: 'Socio-Economic Development since 1968',   icon: '📈', examWeight: 3,
      syllabus: 'Understand the socio-economic conditions of Mauritius at the time of independence. Discuss the salient features that shaped our welfare state. Discuss the different stages in the economic development of Mauritius. Analyse the social and environmental impact of industrialisation. Understand the need for innovation in sustaining development.' },
    { id: 'g9sms-links',                name: 'Our Links with the World',                icon: '🌐', examWeight: 3,
      syllabus: 'Recall that people came to settle in our islands from different countries. Explain the historical and contemporary links between Mauritius and Africa, Asia and Europe. Recognise that Mauritius has maintained and strengthened links with countries of origin. Discuss the importance of membership of regional and international organisations.' },
    { id: 'g9sms-population',           name: 'Population Studies',                      icon: '👥', examWeight: 3,
      syllabus: 'Identify and discuss the factors affecting population growth in Mauritius and the world. Explore the socio-economic, political and environmental reasons for the movement of people. Distinguish between migration, circulation and displacement. Develop skills in interpreting population data.' },
  ],
});
