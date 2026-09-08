'use strict';
const G3FR_SYLLABUS = {};
registerSubject({
  id:         'grade3-french',
  name:       'French',
  grade:      3,
  icon:       '🇫🇷',
  subject:    'French',
  curriculum: 'MIE Mauritius',
  comingSoon: true,
  syllabus:   G3FR_SYLLABUS,
  chapters: [
    { id: 'g3fr-comprehension-orale', name: 'Compréhension orale', icon: '👂', examWeight: 1,
      syllabus: 'Distinguer entre deux sons phonétiquement proches et jouer avec eux. Écouter attentivement un texte et identifier l\'idée globale et le sujet. Identifier la séquence des événements dans les textes oraux courts. Comprendre le but d\'un message comme une requête, un ordre ou une suggestion et réagir de manière appropriée. Identifier le type de message en fonction de l\'intonation, du débit et du rythme.' },
    { id: 'g3fr-expression-orale', name: 'Expression orale', icon: '🗣️', examWeight: 1,
      syllabus: 'Raconter une situation vécue ou imaginaire avec un vocabulaire approprié. Raconter de nouveau une histoire en utilisant un vocabulaire approprié. Répondre et poser des questions simples dans une interaction. Participer verbalement dans des activités de groupe et de classe. Articuler clairement des consonnes et des voyelles. Utiliser des adjectifs usuels pour décrire des objets, des personnes et des lieux.' },
    { id: 'g3fr-lecture', name: 'Compréhension écrite', icon: '📚', examWeight: 1,
      syllabus: 'Lire des mots en les découpant en syllabes avec la prononciation appropriée. Reconnaître certains mots par la méthode globale. Lire des phrases courtes à haute voix en étant guidé par l\'enseignant. Comprendre des conventions de base de la mise en page des textes. Varier l\'intonation en s\'aidant des signes de ponctuation. Établir le lien entre l\'histoire et son propre vécu.' },
    { id: 'g3fr-ecriture', name: 'Expression écrite', icon: '✏️', examWeight: 1,
      syllabus: 'Écrire des mots en entier en employant la majuscule et la minuscule. Compléter des mots et des phrases avec l\'aide de l\'enseignant. Recopier des phrases en détachant bien les mots et en respectant les conventions de l\'écrit. Utiliser les signes de ponctuation de base comme le point final, la virgule et le point d\'interrogation. Saisir des mots simples sur le clavier de l\'ordinateur.' },
    { id: 'g3fr-grammaire', name: 'Grammaire', icon: '📝', examWeight: 1,
      syllabus: 'Produire des phrases grammaticalement et syntaxiquement correctes. Connaître l\'ordre des mots dans les différents types de phrase comme la phrase déclarative, négative et interrogative. Connaître les règles d\'accord de base entre le déterminant, le nom et l\'adjectif. Utiliser correctement les marques de personne, de temps et d\'espace. Connaître les règles d\'orthographe de base avec accents appropriés.' },
  ],
});
