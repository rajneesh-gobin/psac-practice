'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 8 - Social & Modern Studies   ·   SYLLABUS ONLY, NO QUESTIONS YET
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
//       model. IDs: g8sms-<chapter>-001 style. Every question needs a
//       `subsection:` tag, and every tagged id must also be declared in
//       G8SMS_SYLLABUS below - the two must match exactly per chapter.
//    2. Add each new file to LOCAL_FILES in engine/question_loader.js (file://
//       dev only - production auto-discovers) and bump _CACHE_VERSION.
//    3. Delete questions/ch01_sample.js.
//    4. Set comingSoon: false only once every chapter above has questions.
// ══════════════════════════════════════════════════════════════════════════

// Sub-topics for the Syllabus screen. Deliberately EMPTY: a subsection id
// declared here with no questions behind it advertises a topic that opens
// empty. Add ids only as questions are written and tagged.
const G8SMS_SYLLABUS = {};

registerSubject({
  id: 'grade8-social-modern-studies', name: 'Social & Modern Studies', grade: 8, icon: '🌍', subject: 'Social & Modern Studies',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: true,
  practiceble: true, notesBased: false, level4Label: 'Word Problems',
  syllabus: G8SMS_SYLLABUS,
  chapters: [
    { id: 'g8sms-slavery',              name: 'Slavery & Indentured Labour',         icon: '⛓️', examWeight: 3,
      syllabus: 'Recall the slave trade and slavery during the French period. Explain the abolition of slavery during the British period. Discuss the apprenticeship system. Discuss the living and working conditions of Indian indentured labourers. Understand slavery and indenture as economic labour systems.' },
    { id: 'g8sms-society',              name: 'Mauritian Society, 1920s to 1960s',   icon: '📜', examWeight: 3,
      syllabus: 'Recall the socio-economic conditions of the people at the end of the First World War. Discuss the social and economic changes in the life of the people between the 1920s and the 1960s. Discuss Mauritian society in the nineteenth century.' },
    { id: 'g8sms-independence',         name: 'The Way to Independence',             icon: '🇲🇺', examWeight: 3,
      syllabus: 'Identify the empires and colonies of the twentieth century. Explain the factors that led to decolonisation worldwide. Realise that decolonisation worldwide had an impact on Mauritius. Recognise the rise of political awareness in Mauritius. Discuss the contributions of the various movements and the role of the media.' },
    { id: 'g8sms-democracy',            name: 'Mauritius, a Democratic Country',     icon: '🏛️', examWeight: 3,
      syllabus: 'Show an understanding of the term democracy and identify its features. Explain the functions of the Constitution, the electoral process, the Legislature, the Executive and the Judiciary. Appreciate the role of unions, NGOs, associations and movements. Discuss the role of the media in a democracy.' },
    { id: 'g8sms-climate',              name: 'The Changing Climate',                icon: '🌍', examWeight: 3,
      syllabus: 'Explain the causes and consequences of global warming. Discuss the impact of global warming on our islands. Explore ways to adapt to climate change and mitigate its consequences. Show awareness of the measures taken to combat climate change.' },
  ],
});
