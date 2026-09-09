'use strict';

const G2FR_SYLLABUS = {
  'g2fr-comprehension-orale': { subsections: [
    { id:'texte_oral',          name:'Comprendre un texte oral' },
    { id:'sequence_evenements', name:'Séquence des événements' },
    { id:'vocabulaire',         name:'Nouveau vocabulaire' },
  ]},
  'g2fr-expression-orale': { subsections: [
    { id:'description_images',  name:'Décrire une image' },
    { id:'recit_simple',        name:'Raconter une histoire courte' },
    { id:'questions_reponses',  name:'Questions et réponses' },
  ]},
  'g2fr-lecture': { subsections: [
    { id:'decodage_syllabes',      name:'Décoder par syllabes' },
    { id:'lecture_comprehension',  name:'Comprendre ce qu\'on lit' },
    { id:'type_texte',             name:'Type de texte' },
  ]},
  'g2fr-ecriture': { subsections: [
    { id:'phrases_courtes',     name:'Écrire des phrases courtes' },
    { id:'ponctuation_de_base', name:'Ponctuation de base' },
    { id:'orthographe_mots',    name:'Orthographe des mots' },
  ]},
  'g2fr-grammaire': { subsections: [
    { id:'nom_determinant',     name:'Nom et déterminant' },
    { id:'verbe_etre_avoir',    name:'être et avoir' },
    { id:'adjectifs_simples',   name:'Adjectifs simples' },
  ]},
};

registerSubject({
  id:         'grade2-french',
  name:       'French',
  grade:      2,
  icon:       '🇫🇷',
  subject:    'French',
  curriculum: 'MIE Mauritius',
  comingSoon: true,
  notesBased: true,
  noDifficulty: true,
  syllabus:   G2FR_SYLLABUS,
  chapters: [
    {
      id: 'g2fr-comprehension-orale', name: 'Compréhension orale', icon: '👂', examWeight: 1,
      notes: [
        'Écoute attentivement pour trouver l\'**idée principale** du texte.',
        'Les mots *d\'abord, ensuite, puis, enfin* indiquent l\'**ordre des événements**.',
        'Utilise le contexte pour deviner le sens d\'un **mot nouveau**.',
        'Après avoir écouté, demande-toi : *De quoi s\'agit-il ?*',
      ],
    },
    {
      id: 'g2fr-expression-orale', name: 'Expression orale', icon: '🗣️', examWeight: 1,
      notes: [
        'Pour décrire une image, dis ce que tu vois : les personnages, les objets, les couleurs.',
        'Pour raconter, utilise : *d\'abord... ensuite... enfin...*',
        'Pose des questions avec : *Qui ? Quoi ? Où ? Quand ? Pourquoi ?*',
        'Réponds toujours avec une phrase complète.',
      ],
    },
    {
      id: 'g2fr-lecture', name: 'Compréhension écrite', icon: '📚', examWeight: 1,
      notes: [
        'Découpe les mots difficiles en **syllabes** : ma-te-las (3 syllabes).',
        'Lis la phrase en entier avant de répondre.',
        'Un **texte narratif** raconte une histoire. Une **liste** donne des informations.',
        'Les **majuscules** commencent les noms propres et les phrases.',
      ],
    },
    {
      id: 'g2fr-ecriture', name: 'Expression écrite', icon: '✏️', examWeight: 1,
      notes: [
        'Chaque phrase commence par une **majuscule** et se termine par un **point**.',
        'Le **point d\'interrogation** ( ? ) termine une question.',
        'La **virgule** ( , ) sépare les éléments d\'une liste.',
        'Vérifie l\'orthographe des mots que tu connais déjà.',
      ],
    },
    {
      id: 'g2fr-grammaire', name: 'Grammaire', icon: '📝', examWeight: 1,
      notes: [
        'Le **déterminant** accompagne le nom : *le, la, les, un, une, des*.',
        'Le verbe **être** : je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont.',
        'Le verbe **avoir** : j\'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont.',
        'Un **adjectif** décrit un nom et s\'accorde avec lui : *un grand garçon / une grande fille*.',
      ],
    },
  ],
});
