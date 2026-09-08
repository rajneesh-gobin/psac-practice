'use strict';
const G1FR_SYLLABUS = {};
registerSubject({
  id:         'grade1-french',
  name:       'French',
  grade:      1,
  icon:       '🇫🇷',
  subject:    'French',
  curriculum: 'MIE Mauritius',
  comingSoon: true,
  syllabus:   G1FR_SYLLABUS,
  chapters: [
    { id: 'g1fr-comprehension-orale', name: 'Compréhension orale', icon: '👂', examWeight: 1,
      syllabus: 'Distinguer entre les sons et les bruits produits par des êtres humains, des animaux et des choses. Identifier les sons du français dans des mots entendus. Lire des syllabes ou des mots avec la bonne articulation. Suivre des instructions simples de direction et de placement spatial. Comprendre des phrases simples qui se rapportent à un visuel.' },
    { id: 'g1fr-expression-orale', name: 'Expression orale', icon: '🗣️', examWeight: 1,
      syllabus: 'Prendre l\'habitude de prendre la parole et de répondre en français. Utiliser des formules de salutation et de politesse basiques comme Bonjour, merci, s\'il vous plaît. Se présenter en donnant son nom, âge et adresse. Mémoriser des comptines et des chansons. Nommer des objets concrets de la maison et de l\'école. Construire des phrases simples avec sujet et verbe.' },
    { id: 'g1fr-lecture', name: 'Compréhension écrite', icon: '📚', examWeight: 1,
      syllabus: 'Comprendre que l\'imprimé contient un message. Reconnaître l\'imprimé familier comme les emballages et les autocollants. Distinguer entre des mots, des symboles et des chiffres. Faire la correspondance son-graphie. Reconnaître les syllabes dans des mots familiers. Associer les images aux mots correspondants.' },
    { id: 'g1fr-ecriture', name: 'Expression écrite', icon: '✏️', examWeight: 1,
      syllabus: 'Tenir le crayon ou stylo correctement. Tracer des lettres convenablement et lisiblement. Identifier les lettres de l\'alphabet en minuscules et en majuscules. Discriminer entre des lettres ayant des formes ressemblantes comme b/d et p/q. Écrire les lettres de l\'alphabet avec modèle. Copier des informations simples de gauche à droite et de haut en bas.' },
    { id: 'g1fr-grammaire', name: 'Grammaire', icon: '📝', examWeight: 1,
      syllabus: 'Utiliser des pronoms personnels de base pour se présenter et parler de son entourage. Utiliser des adjectifs usuels pour décrire des objets, des personnes et des lieux. Construire des phrases simples en français avec sujet et verbe. Situer des actions dans le temps en utilisant hier, aujourd\'hui et demain. Nommer les jours de la semaine.' },
  ],
});
