'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 8 - Français   ·   SYLLABUS ONLY, NO QUESTIONS YET
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
//       model. IDs: g8fr-<chapter>-001 style. Every question needs a
//       `subsection:` tag, and every tagged id must also be declared in
//       G8FR_SYLLABUS below - the two must match exactly per chapter.
//    2. Add each new file to LOCAL_FILES in engine/question_loader.js (file://
//       dev only - production auto-discovers) and bump _CACHE_VERSION.
//    3. Delete questions/ch01_sample.js.
//    4. Set comingSoon: false only once every chapter above has questions.
// ══════════════════════════════════════════════════════════════════════════

const G8FR_SYLLABUS = {
  'g8fr-co': { subsections: [
    { id:'schema_communication', name:'Schéma de communication' },
    { id:'types_textes_oral',    name:'Types de textes oraux' },
    { id:'sens_contexte',        name:'Sens et contexte' },
  ]},
  'g8fr-eo': { subsections: [
    { id:'lecture_expressive',    name:'Lecture expressive' },
    { id:'conversation_multi',    name:'Conversation à plusieurs' },
    { id:'lexique_varie',         name:'Lexique varié et précis' },
  ]},
  'g8fr-ce': { subsections: [
    { id:'idee_implicite',    name:'Idée principale et implicite' },
    { id:'registres_langue',  name:'Registres de langue' },
    { id:'analyse_texte',     name:'Analyse de texte' },
  ]},
  'g8fr-ee': { subsections: [
    { id:'textes_fonctionnels_divers', name:'Textes fonctionnels divers' },
    { id:'resume_opinion',             name:'Résumé et opinion' },
    { id:'structure_coherente',        name:'Structure et cohérence' },
  ]},
  'g8fr-litterature': { subsections: [
    { id:'genres_caracteristiques', name:'Genres et caractéristiques' },
    { id:'appreciation_textes',     name:'Appréciation de textes' },
    { id:'reaction_litteraire',     name:'Réaction littéraire' },
  ]},
};

registerSubject({
  id: 'grade8-french', name: 'Français', grade: 8, icon: '🇫🇷', subject: 'French',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: false,
  practiceble: true, notesBased: false,
  // ⚠ level4Label set with the content, never before it — a relabelled empty
  // level is still an empty level. L4 is maths-shaped and does not travel.
  // ⚠ Deliberately IN FRENCH: every other label a child meets in this pack is
    // French, and an English word in the level badge would be the only one.
  level4Label: 'Analyse de texte',
  syllabus: G8FR_SYLLABUS,
  chapters: [
    { id: 'g8fr-co',                    name: 'Compréhension orale',    icon: '👂', examWeight: 3,
      syllabus: 'Différencier les types de textes écoutés. Dégager le sens et les paramètres de la communication. Préciser les éléments du schéma de communication. Suivre des discussions entre plusieurs locuteurs.' },
    { id: 'g8fr-eo',                    name: 'Expression orale',       icon: '🗣️', examWeight: 3,
      syllabus: 'Lire à voix haute différents types de textes. Converser clairement avec plusieurs interlocuteurs. Traiter une problématique à l\'oral. Utiliser un lexique varié et précis.' },
    { id: 'g8fr-ce',                    name: 'Compréhension écrite',   icon: '📖', examWeight: 4,
      syllabus: 'Comparer et analyser différents types de production écrite. Identifier les registres de langue utilisés. Dégager judicieusement l\'idée principale d\'un texte. Repérer les informations implicites.' },
    { id: 'g8fr-ee',                    name: 'Expression écrite',      icon: '✍️', examWeight: 4,
      syllabus: 'Produire seul ou en groupe des textes fonctionnels divers. Résumer les éléments clés d\'un texte. Exprimer son opinion par écrit. Structurer un texte cohérent.' },
    { id: 'g8fr-litterature',           name: 'Littérature',            icon: '📚', examWeight: 2,
      syllabus: 'Identifier les genres littéraires et leurs caractéristiques. Apprécier des textes littéraires variés. Réagir à un texte littéraire à l\'oral et à l\'écrit.' },
  ],
});
