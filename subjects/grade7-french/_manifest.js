'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 7 - Français   ·   SYLLABUS ONLY, NO QUESTIONS YET
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
//       model. IDs: g7fr-<chapter>-001 style. Every question needs a
//       `subsection:` tag, and every tagged id must also be declared in
//       G7FR_SYLLABUS below - the two must match exactly per chapter.
//    2. Add each new file to LOCAL_FILES in engine/question_loader.js (file://
//       dev only - production auto-discovers) and bump _CACHE_VERSION.
//    3. Delete questions/ch01_sample.js.
//    4. Set comingSoon: false only once every chapter above has questions.
// ══════════════════════════════════════════════════════════════════════════

const G7FR_SYLLABUS = {
  'g7fr-co': { subsections: [
    { id:'type_texte_oral',   name:'Types de textes oraux' },
    { id:'locuteur_message',  name:'Locuteur et message' },
    { id:'vocabulaire_oral',  name:'Vocabulaire oral' },
  ]},
  'g7fr-eo': { subsections: [
    { id:'lecture_voix_haute',    name:'Lecture à voix haute' },
    { id:'expression_confiance',  name:'S\'exprimer avec confiance' },
    { id:'lexique_approprie',     name:'Lexique approprié' },
  ]},
  'g7fr-ce': { subsections: [
    { id:'idee_principale',       name:'Idée principale' },
    { id:'information_explicite', name:'Informations explicites' },
    { id:'vocabulaire',           name:'Vocabulaire' },
  ]},
  'g7fr-ee': { subsections: [
    { id:'textes_fonctionnels',        name:'Textes fonctionnels' },
    { id:'organisation_paragraphes',   name:'Organisation en paragraphes' },
    { id:'correction_syntaxe',         name:'Correction syntaxique' },
  ]},
  'g7fr-litterature': { subsections: [
    { id:'genres_litteraires', name:'Genres littéraires' },
    { id:'types_textes',       name:'Types de textes' },
    { id:'conte_bd',           name:'Contes et bandes dessinées' },
  ]},
};

registerSubject({
  id: 'grade7-french', name: 'Français', grade: 7, icon: '🇫🇷', subject: 'French',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: false,
  practiceble: true, notesBased: false, level4Label: 'Word Problems',
  syllabus: G7FR_SYLLABUS,
  chapters: [
    { id: 'g7fr-co',                    name: 'Compréhension orale',    icon: '👂', examWeight: 3,
      syllabus: 'Écouter avec attention une variété de textes sonores. Distinguer les différents types de textes écoutés. Identifier le locuteur, l\'interlocuteur et le message. Comprendre le lexique spécifique au texte. Suivre des conversations simples.' },
    { id: 'g7fr-eo',                    name: 'Expression orale',       icon: '🗣️', examWeight: 3,
      syllabus: 'Lire à voix haute en variant l\'intonation et le rythme. S\'exprimer avec confiance sur soi et sur son environnement immédiat. Utiliser un lexique approprié. Produire des énoncés clairs et cohérents.' },
    { id: 'g7fr-ce',                    name: 'Compréhension écrite',   icon: '📖', examWeight: 4,
      syllabus: 'Lire et comprendre différents types de textes écrits. Dégager l\'idée principale d\'un texte. Repérer les informations explicites. Comprendre le vocabulaire d\'usage.' },
    { id: 'g7fr-ee',                    name: 'Expression écrite',      icon: '✍️', examWeight: 4,
      syllabus: 'Produire des textes fonctionnels simples. Organiser ses idées en paragraphes. Utiliser un lexique et une syntaxe corrects. Relire et corriger son texte.' },
    { id: 'g7fr-litterature',           name: 'Littérature',            icon: '📚', examWeight: 2,
      syllabus: 'Reconnaître différents types de textes littéraires. Classer les textes selon les genres littéraires. Écouter et visionner des contes, des bandes dessinées et des dessins animés.' },
  ],
});
