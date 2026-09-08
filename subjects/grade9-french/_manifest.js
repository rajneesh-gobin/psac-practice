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

// Sub-topics for the Syllabus screen.
//
// ⚠ TAGGING TARGETS, declared ahead of the questions. Every id is transcribed
//   from the "Proposed subsection ids" lines in
//   docs/nce-grade9/syllabus-french.md, which reads them strand by strand off
//   the NCF Grades 7-9 tables. Invisible while comingSoon keeps the pack out of
//   activateSubjectPack(), the per-grade fetch and assembleExamPaper().
//   ⚠ Where a written question already carries a tag, THE TAG WINS — rename the
//   declaration, never the questions.
//
// ⚠⚠ RESTRUCTURED FROM 5 CHAPTERS TO 11 ON 2026-09-08, from
//   docs/nce-grade9/blueprint-french.md, which measured all five NCE French
//   papers question by question. The paper is structurally frozen across those
//   five years, so ONE CHAPTER IS ONE NUMBERED QUESTION and examWeight is that
//   question's marks × 0.4. Marks sum to exactly 100, weights to exactly 40.
//
//   WHY IT HAD TO CHANGE. The pack was shaped by the syllabus STRANDS — CO, EO,
//   CÉ, EÉ, Littérature — which is how the subject is taught but not how it is
//   examined. Two of those five chapters (CO and EO, weight 3 each, 37.5% of
//   every generated exam) were ORAL, and the blueprint measures oral work at
//   ZERO marks on this paper: "Keeping them as chapters would put questions in
//   an exam paper that the real exam never asks."
//   Worse, a strand-shaped pack had nowhere to put grammar or vocabulary at
//   all — yet Q1 and Q2 are exactly that, 12 of the 100 marks, every year.
//
//   ⚠ g9fr-co, g9fr-eo, g9fr-ce, g9fr-ee AND g9fr-litterature NO LONGER EXIST.
//   Their content is redistributed: CÉ becomes g9fr-comprehension and
//   g9fr-doc-authentique; EÉ becomes g9fr-redaction and g9fr-ecrit-guide;
//   Littérature becomes g9fr-oeuvres; the oral pair is dropped. Anything still
//   pointing at an old id is an orphan — scripts/test-chapter-ids.js names it.
//
//   ⚠ A CHAPTER CHANGE MEANS `node scripts/build-subject-index.js`.
//
// ⚠ g9fr-oeuvres names its set texts (Le Papa de Simon, Topaze) in its
//   subsection ids. THE ŒUVRES CHANGE FROM YEAR TO YEAR — check the current
//   programme before writing against those four ids, and rename rather than
//   leaving questions filed under a text no longer set.
const G9FR_SYLLABUS = {
  'g9fr-grammaire': { subsections: [
    { id: 'temps_modes', name: 'Temps et modes verbaux' },
    { id: 'connecteurs', name: 'Les connecteurs logiques' },
    { id: 'accords', name: 'Les accords' },
    { id: 'determinants', name: 'Les déterminants' },
    { id: 'pronoms', name: 'Les pronoms' },
    { id: 'prepositions', name: 'Les prépositions' },
    { id: 'interrogatifs', name: 'Les mots interrogatifs' },
  ] },
  'g9fr-transformation': { subsections: [
    { id: 'ponctuation', name: 'La ponctuation' },
    { id: 'negation', name: 'La négation' },
    { id: 'place_adjectif', name: 'La place de l\'adjectif' },
    { id: 'pronominalisation', name: 'La pronominalisation' },
    { id: 'jonction_phrases', name: 'Joindre deux phrases' },
    { id: 'temps_verbaux', name: 'Changer le temps verbal' },
    { id: 'genre_nombre', name: 'Le genre et le nombre' },
    { id: 'voix_passive', name: 'La voix passive' },
    { id: 'interrogation', name: 'La forme interrogative' },
    { id: 'changement_personne', name: 'Changer de personne' },
  ] },
  'g9fr-vocabulaire': { subsections: [
    { id: 'traits_caractere', name: 'Les traits de caractère' },
    { id: 'verbes_action', name: 'Les verbes d\'action' },
    { id: 'noms_concrets', name: 'Les noms concrets' },
    { id: 'adjectifs_qualificatifs', name: 'Les adjectifs qualificatifs' },
    { id: 'adverbes', name: 'Les adverbes' },
    { id: 'notions_abstraites', name: 'Les notions abstraites' },
  ] },
  'g9fr-doc-authentique': { subsections: [
    { id: 'courriel', name: 'Le courriel' },
    { id: 'fiche_infographie', name: 'La fiche et l\'infographie' },
    { id: 'reperage_explicite', name: 'Le repérage d\'informations explicites' },
    { id: 'reponses_multiples', name: 'Les questions à réponses multiples' },
    { id: 'role_emetteur_destinataire', name: 'L\'émetteur, le destinataire et l\'objet' },
  ] },
  'g9fr-formation-mots': { subsections: [
    { id: 'nominalisation', name: 'La nominalisation' },
    { id: 'formation_adjectif', name: 'La formation de l\'adjectif' },
    { id: 'formation_adverbe', name: 'La formation de l\'adverbe' },
    { id: 'noms_de_personne', name: 'Les noms de personne' },
    { id: 'formation_verbe', name: 'La formation du verbe' },
    { id: 'noms_de_quantite', name: 'Les noms de quantité' },
  ] },
  'g9fr-correction': { subsections: [
    { id: 'homophones', name: 'Les homophones' },
    { id: 'accords', name: 'Les accords' },
    { id: 'participe_infinitif', name: 'Participe passé ou infinitif' },
    { id: 'orthographe_accents', name: 'L\'orthographe et les accents' },
    { id: 'determinants', name: 'Les déterminants' },
  ] },
  'g9fr-textes-trous': { subsections: [
    { id: 'prepositions', name: 'Les prépositions' },
    { id: 'pronoms_relatifs', name: 'Les pronoms relatifs' },
    { id: 'determinants', name: 'Les déterminants' },
    { id: 'conjonctions', name: 'Les conjonctions' },
    { id: 'adverbes_negation', name: 'Les adverbes et la négation' },
    { id: 'verbes_contexte', name: 'Les verbes en contexte' },
  ] },
  'g9fr-ecrit-guide': { subsections: [
    { id: 'invitation', name: 'L\'invitation' },
    { id: 'lettre_amicale', name: 'La lettre amicale' },
    { id: 'points_imposes', name: 'Les points imposés' },
    { id: 'formules_ouverture_cloture', name: 'Les formules d\'ouverture et de clôture' },
    { id: 'longueur_50_75', name: 'La longueur : 50 à 75 mots' },
  ] },
  'g9fr-comprehension': { subsections: [
    { id: 'reperage_explicite', name: 'Le repérage d\'informations explicites' },
    { id: 'inference', name: 'L\'inférence' },
    { id: 'expression_imagee', name: 'Les expressions imagées' },
    { id: 'synonymes_contexte', name: 'Les synonymes en contexte' },
    { id: 'avis_personnel', name: 'L\'avis personnel' },
    { id: 'reponses_multiples', name: 'Les questions à réponses multiples' },
  ] },
  'g9fr-redaction': { subsections: [
    { id: 'recit', name: 'Le récit' },
    { id: 'description', name: 'La description' },
    { id: 'texte_opinion', name: 'Le texte d\'opinion' },
  ] },
  'g9fr-oeuvres': { subsections: [
    { id: 'papa_simon_personnages', name: 'Le Papa de Simon : les personnages' },
    { id: 'papa_simon_themes', name: 'Le Papa de Simon : les thèmes' },
    { id: 'topaze_personnages', name: 'Topaze : les personnages' },
    { id: 'topaze_themes', name: 'Topaze : les thèmes' },
    { id: 'question_longue', name: 'La question longue' },
  ] },
};;;

registerSubject({
  id: 'grade9-french', name: 'Français', grade: 9, icon: '🇫🇷', subject: 'French',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: true,
  practiceble: true, notesBased: false, level4Label: 'Word Problems',
  syllabus: G9FR_SYLLABUS,
  chapters: [
    // ⚠ ONE CHAPTER PER EXAM QUESTION. The NCE French paper is structurally
    //   frozen across all five years, so a chapter maps to a numbered question
    //   and examWeight is that question's marks × 0.4. The eleven sum to
    //   exactly 40, and the marks to exactly 100.
    { id: 'g9fr-grammaire',       name: 'Grammaire : le mot juste',              icon: '🧩', examWeight: 3,
      syllabus: 'Choisir la forme correcte parmi quatre propositions. Temps et modes verbaux, connecteurs logiques, accords, déterminants, pronoms, prépositions et mots interrogatifs. (Q1, items 1 à 7 : 7 points.)' },
    { id: 'g9fr-transformation',  name: 'Transformation de phrases',             icon: '🔄', examWeight: 3,
      syllabus: 'Réécrire une phrase selon une consigne précise : ponctuation, négation, place de l\'adjectif, pronominalisation, jonction de deux phrases, changement de temps, de genre, de nombre ou de personne, voix passive et forme interrogative. (Q1, items 8 à 15 : 8 points.)' },
    { id: 'g9fr-vocabulaire',     name: 'Vocabulaire et sens des mots',          icon: '📗', examWeight: 2,
      syllabus: 'Trouver le mot juste : traits de caractère, verbes d\'action, noms concrets, adjectifs qualificatifs, adverbes et notions abstraites. (Q2 : 5 points.)' },
    { id: 'g9fr-doc-authentique', name: 'Courriel, fiche et documents',          icon: '📧', examWeight: 4,
      syllabus: 'Lire un document authentique — courriel, fiche ou infographie — et y repérer des informations explicites. Identifier l\'émetteur, le destinataire et l\'objet. (Q3 : 10 points.)' },
    { id: 'g9fr-formation-mots',  name: 'Formation des mots',                    icon: '🔠', examWeight: 2,
      syllabus: 'Former un mot dérivé à partir d\'un mot donné : nominalisation, formation de l\'adjectif, de l\'adverbe et du verbe, noms de personne et noms de quantité. (Q4 : 5 points.)' },
    { id: 'g9fr-correction',      name: 'Correction d\'erreurs',                 icon: '✏️', examWeight: 2,
      syllabus: 'Repérer et corriger une erreur dans une phrase : homophones, accords, participe passé ou infinitif, orthographe, accents et déterminants. (Q5 : 5 points.)' },
    { id: 'g9fr-textes-trous',    name: 'Texte à trous',                         icon: '🕳️', examWeight: 2,
      syllabus: 'Compléter un texte lacunaire : prépositions, pronoms relatifs, déterminants, conjonctions, adverbes, négation et verbes en contexte. (Q6 : 5 points.)' },
    { id: 'g9fr-ecrit-guide',     name: 'Écrit guidé : lettre et invitation',    icon: '✉️', examWeight: 4,
      syllabus: 'Rédiger une lettre amicale ou une invitation en respectant les points imposés, les formules d\'ouverture et de clôture, et une longueur de 50 à 75 mots. (Q7 : 10 points.)' },
    { id: 'g9fr-comprehension',   name: 'Compréhension de texte',                icon: '📖', examWeight: 8,
      syllabus: 'Lire un texte long et répondre : repérage d\'informations explicites, inférence, expressions imagées, synonymes en contexte et avis personnel justifié. (Q8 : 20 points, la question la plus lourde du papier.)' },
    { id: 'g9fr-redaction',       name: 'Rédaction',                             icon: '✍️', examWeight: 6,
      syllabus: 'Rédiger un texte suivi. Les trois sujets offerts chaque année sont le récit, la description et le texte d\'opinion. (Q9 : 15 points.)' },
    { id: 'g9fr-oeuvres',         name: 'Œuvres au programme',                   icon: '📚', examWeight: 4,
      syllabus: 'Répondre sur les œuvres étudiées : personnages et thèmes, puis une question longue. (Q10 : 10 points.) ⚠ Les œuvres changent d\'une année à l\'autre — vérifier le programme en cours avant d\'écrire.' },
  ],
});
