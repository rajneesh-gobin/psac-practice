'use strict';

const G3FR_SYLLABUS = {
  'g3fr-comprehension-orale': { subsections: [
    { id:'sons_phonetiques',   name:'Sons phonétiquement proches' },
    { id:'idee_globale',       name:'Idée globale et séquence' },
    { id:'type_message',       name:'Type de message' },
  ]},
  'g3fr-expression-orale': { subsections: [
    { id:'vocabulaire_descriptif', name:'Vocabulaire descriptif' },
    { id:'recit_oral',             name:'Raconter à l\'oral' },
    { id:'questions_reponses',     name:'Questions et réponses' },
  ]},
  'g3fr-lecture': { subsections: [
    { id:'decodage_syllabes',     name:'Lire par syllabes' },
    { id:'lecture_comprehension', name:'Comprendre un texte lu' },
    { id:'ponctuation_sens',      name:'Ponctuation et sens' },
  ]},
  'g3fr-ecriture': { subsections: [
    { id:'majuscule_minuscule', name:'Majuscule et minuscule' },
    { id:'ponctuation_base',    name:'Ponctuation de base' },
    { id:'orthographe_accents', name:'Orthographe et accents' },
  ]},
  'g3fr-grammaire': { subsections: [
    { id:'types_phrases',  name:'Types de phrases' },
    { id:'accord_nom_adj', name:'Accord nom–adjectif' },
    { id:'temps_verbes',   name:'Temps des verbes' },
  ]},
};

registerSubject({
  id:         'grade3-french',
  name:       'French',
  grade:      3,
  icon:       '🇫🇷',
  subject:    'French',
  curriculum: 'MIE Mauritius',
  comingSoon: true,
  notesBased: true,
  noDifficulty: true,
  syllabus:   G3FR_SYLLABUS,
  chapters: [
    {
      id: 'g3fr-comprehension-orale', name: 'Compréhension orale', icon: '👂', examWeight: 1,
      notes: [
        'Certains sons se ressemblent : /b/ et /p/, /d/ et /t/, /f/ et /v/ — écoute bien la différence !',
        'L\'**idée globale** est ce dont parle le texte en général.',
        'Les mots *d\'abord, puis, ensuite, enfin* indiquent la **séquence des événements**.',
        'Un message peut informer, demander, ordonner ou suggérer — l\'intonation aide à le comprendre.',
      ],
    },
    {
      id: 'g3fr-expression-orale', name: 'Expression orale', icon: '🗣️', examWeight: 1,
      notes: [
        'Utilise des **adjectifs** pour décrire : *grand, petit, rond, beau, rouge*.',
        'Pour raconter : *D\'abord... Ensuite... Puis... Enfin...*',
        'Pour poser une question : *Qui ? Que/Quoi ? Où ? Quand ? Pourquoi ? Comment ?*',
        'Réponds en faisant une **phrase complète** avec un sujet et un verbe.',
      ],
    },
    {
      id: 'g3fr-lecture', name: 'Compréhension écrite', icon: '📚', examWeight: 1,
      notes: [
        'Découpe les mots en **syllabes** pour les lire : ta-bleau (2), pa-pi-llon (3).',
        'La **ponctuation** t\'aide : le point (.) = pause, le point d\'interrogation (?) = question, la virgule (,) = courte pause.',
        'Lis le texte entier, puis relis chaque question soigneusement.',
        'Cherche les réponses dans le texte — elles sont souvent présentes mot pour mot.',
      ],
    },
    {
      id: 'g3fr-ecriture', name: 'Expression écrite', icon: '✏️', examWeight: 1,
      notes: [
        'Une phrase commence par une **majuscule** et se termine par un **point**, un **?** ou un **!**.',
        'La **virgule** (,) sépare les éléments d\'une liste.',
        'Les accents changent le son : é (école), è (mère), ê (fête), à (à côté), ù (où).',
        'Copie soigneusement — chaque mot séparé par un espace.',
      ],
    },
    {
      id: 'g3fr-grammaire', name: 'Grammaire', icon: '📝', examWeight: 1,
      notes: [
        '**Phrase déclarative** : affirme quelque chose — *Le chat est gris.*',
        '**Phrase négative** : utilise ne...pas — *Le chat n\'est pas gris.*',
        '**Phrase interrogative** : pose une question — *Le chat est-il gris ?*',
        'L\'adjectif s\'accorde avec le nom : *un grand arbre / une grande maison / de grands arbres*.',
        '**Présent** : je mange. **Passé composé** : j\'ai mangé. **Futur simple** : je mangerai.',
      ],
    },
  ],
});
