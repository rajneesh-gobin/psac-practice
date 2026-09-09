'use strict';

const G1FR_SYLLABUS = {
  'g1fr-comprehension-orale': { subsections: [
    { id:'discrimination_sons',    name:'Distinguer les sons' },
    { id:'comprehension_messages', name:'Comprendre un message' },
    { id:'vocabulaire_oral',       name:'Vocabulaire oral' },
  ]},
  'g1fr-expression-orale': { subsections: [
    { id:'comptines_chansons',     name:'Comptines et chansons' },
    { id:'conversation_simple',    name:'Conversation simple' },
    { id:'description_images',     name:'Décrire une image' },
  ]},
  'g1fr-lecture': { subsections: [
    { id:'conscience_phonique',    name:'Conscience phonique' },
    { id:'lettres_sons',           name:'Lettres et sons' },
    { id:'mots_simples',           name:'Mots simples' },
  ]},
  'g1fr-ecriture': { subsections: [
    { id:'lettres_minuscules',     name:'Lettres minuscules' },
    { id:'copie_mots',             name:'Copier des mots' },
    { id:'phrases_simples',        name:'Phrases simples' },
  ]},
  'g1fr-grammaire': { subsections: [
    { id:'noms_communs',           name:'Noms communs' },
    { id:'determinants_le_la_les', name:'le, la, les' },
    { id:'phrases_simples_grm',    name:'Construire une phrase' },
  ]},
};

registerSubject({
  id:           'grade1-french',
  name:         'French',
  grade:        1,
  icon:         '🇫🇷',
  subject:      'French',
  curriculum:   'MIE Mauritius',
  comingSoon: false,
  notesBased:   true,
  noDifficulty: true,
  syllabus:     G1FR_SYLLABUS,
  chapters: [
    {
      id: 'g1fr-comprehension-orale', name: 'Compréhension orale', icon: '👂', examWeight: 1,
      notes: [
        'On utilise ses **oreilles** pour écouter. (We use our ears to listen.)',
        'Les sons du français sont différents de l\'anglais — écoute bien !',
        'Écoute une phrase et pense : *Qui ? Quoi ? Où ?*',
        'Un **bruit** vient de l\'environnement. Une **voix** vient d\'une personne.',
      ],
    },
    {
      id: 'g1fr-expression-orale', name: 'Expression orale', icon: '🗣️', examWeight: 1,
      notes: [
        'Dis **bonjour** le matin et **bonsoir** le soir.',
        'Pour décrire quelque chose, dis sa couleur et sa taille.',
        'Une **comptine** a des mots qui riment à la fin.',
        'Parle clairement et à voix haute.',
      ],
    },
    {
      id: 'g1fr-lecture', name: 'Compréhension écrite', icon: '📚', examWeight: 1,
      notes: [
        'On lit de **gauche à droite** en français.',
        'Les voyelles en français : **a, e, i, o, u** (et y).',
        'Une **syllabe** est un groupe de sons : *ma-man* = 2 syllabes.',
        'Chaque lettre a un son. Apprends-les un par un !',
      ],
    },
    {
      id: 'g1fr-ecriture', name: 'Expression écrite', icon: '✏️', examWeight: 1,
      notes: [
        'Tiens le crayon correctement — pas trop fort !',
        'Les lettres **minuscules** sont petites : a, b, c…',
        'Les lettres **majuscules** sont grandes : A, B, C…',
        'Laisse un espace entre chaque mot quand tu écris.',
      ],
    },
    {
      id: 'g1fr-grammaire', name: 'Grammaire', icon: '📝', examWeight: 1,
      notes: [
        'Un **nom commun** désigne une chose, une personne ou un animal : *chien, maison, fille*.',
        'En français, les noms sont **masculins** (le, un) ou **féminins** (la, une).',
        '**le** devant un nom masculin : *le chat*. **la** devant un nom féminin : *la maison*.',
        '**les** devant un nom pluriel : *les chats, les maisons*.',
      ],
    },
  ],
});
