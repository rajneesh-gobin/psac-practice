'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 - Français   ·   SYLLABUS ONLY, NO QUESTIONS YET
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
//       model. IDs: g9fr-<chapter>-001 style. Every question needs a
//       `subsection:` tag, and every tagged id must also be declared in
//       G9FR_SYLLABUS below - the two must match exactly per chapter.
//    2. Add each new file to LOCAL_FILES in engine/question_loader.js (file://
//       dev only - production auto-discovers) and bump _CACHE_VERSION.
//    3. Delete questions/ch01_sample.js.
//    4. Set comingSoon: false only once every chapter above has questions.
// ══════════════════════════════════════════════════════════════════════════

// Sub-topics for the Syllabus screen. Deliberately EMPTY: a subsection id
// declared here with no questions behind it advertises a topic that opens
// empty. Add ids only as questions are written and tagged.
const G9FR_SYLLABUS = {};

registerSubject({
  id: 'grade9-french', name: 'Français', grade: 9, icon: '🇫🇷', subject: 'French',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: true,
  practiceble: true, notesBased: false, level4Label: 'Word Problems',
  syllabus: G9FR_SYLLABUS,
  chapters: [
    { id: 'g9fr-co',                    name: 'Compréhension orale',    icon: '👂', examWeight: 3,
      syllabus: 'Écouter et comprendre des textes sonores complexes. Repérer des indices déictiques qui renvoient au contexte d\'énonciation. Suivre et évaluer un échange entre plusieurs locuteurs. Comprendre par inférence un lexique spécialisé.' },
    { id: 'g9fr-eo',                    name: 'Expression orale',       icon: '🗣️', examWeight: 3,
      syllabus: 'Présenter et justifier son opinion à l\'oral. Défendre son point de vue avec des arguments. Faire un compte-rendu structuré. S\'exprimer en utilisant un lexique riche et varié.' },
    { id: 'g9fr-ce',                    name: 'Compréhension écrite',   icon: '📖', examWeight: 4,
      syllabus: 'Analyser la structure et le registre d\'un texte. Comparer les points de vue exprimés dans plusieurs textes. Dégager le sens implicite et l\'intention de l\'auteur. Justifier sa lecture par des relevés précis.' },
    { id: 'g9fr-ee',                    name: 'Expression écrite',      icon: '✍️', examWeight: 4,
      syllabus: 'Rédiger différents types de textes fonctionnels et argumentatifs. Faire un compte-rendu des points saillants d\'un texte. Exprimer et justifier son opinion en écrit. Réviser son texte pour la langue et la cohérence.' },
    { id: 'g9fr-litterature',           name: 'Littérature',            icon: '📚', examWeight: 2,
      syllabus: 'Analyser des textes relevant de différents genres littéraires. Identifier les procédés d\'écriture. Apprécier et commenter une œuvre littéraire.' },
  ],
});
