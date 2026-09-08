'use strict';
const G2FR_SYLLABUS = {};
registerSubject({
  id:         'grade2-french',
  name:       'French',
  grade:      2,
  icon:       '🇫🇷',
  subject:    'French',
  curriculum: 'MIE Mauritius',
  comingSoon: true,
  syllabus:   G2FR_SYLLABUS,
  chapters: [
    { id: 'g2fr-comprehension-orale', name: 'Compréhension orale', icon: '👂', examWeight: 1,
      syllabus: 'Identifier un son spécifique au début, au milieu et à la fin d\'un mot entendu. Écouter et comprendre différents textes oraux courts comme un poème, une comptine, une chanson ou une histoire. Reconnaître des rimes dans une chanson ou une comptine. Identifier quelques détails donnés dans le texte comme le personnage et le lieu. Comprendre un vocabulaire de base dans le contexte de l\'histoire.' },
    { id: 'g2fr-expression-orale', name: 'Expression orale', icon: '🗣️', examWeight: 1,
      syllabus: 'Présenter sa famille et ses amis en donnant des informations basiques. Réciter des comptines et des poèmes simples individuellement et collectivement. Nommer des actions et des sentiments. Utiliser un vocabulaire de base pour nommer des personnes, des endroits et des objets liés à la vie quotidienne. Répondre à des questions simples dans une interaction. Situer des actions dans le temps avec hier, aujourd\'hui et demain.' },
    { id: 'g2fr-lecture', name: 'Compréhension écrite', icon: '📚', examWeight: 1,
      syllabus: 'Distinguer entre différents textes habituels en s\'appuyant sur le format, le contenu et le but des textes. Suivre attentivement différents textes lus par l\'enseignant. Faire la correspondance son-graphie. Reconnaître les syllabes dans des mots familiers. Lire des mots en les découpant en syllabes. Décoder le mot à partir du découpage syllabique et de la lecture globale. Associer les images aux mots correspondants.' },
    { id: 'g2fr-ecriture', name: 'Expression écrite', icon: '✏️', examWeight: 1,
      syllabus: 'Écrire les lettres de l\'alphabet avec modèle en minuscules et en majuscules. Mémoriser des mots. Épeler des mots phonétiquement comme stratégie pour écrire des mots simples. Compléter des mots en s\'aidant du découpage syllabique. Compléter des phrases courtes avec l\'aide de l\'enseignant. Recopier des phrases en respectant les conventions de l\'écrit. Savoir qu\'une phrase commence par une majuscule et se termine par un point.' },
    { id: 'g2fr-grammaire', name: 'Grammaire', icon: '📝', examWeight: 1,
      syllabus: 'Remplacer des noms propres et des noms communs par des pronoms. Utiliser des prépositions usuelles correctement comme sur, sous, dans et entre. Identifier le(s) trait(s) que soulignent les adjectifs usuels. Utiliser correctement les adjectifs pour décrire des objets, des personnes et des lieux. Former des phrases simples pour exprimer ses besoins et partager une idée. Utiliser des verbes au présent.' },
  ],
});
