'use strict';
// Grade 4 French — Chapitre : Lecture & Compréhension
// IDs format: g4fr-comp-NNN
//
// Passage utilisé dans ce chapitre :
// ─────────────────────────────────────────────────────────────────────
// MA FAMILLE (MIE Grade 4 French — contexte mauricien)
//
// Je m'appelle Priya. J'ai dix ans. J'habite à Curepipe avec ma famille.
// Nous sommes quatre dans ma famille : mon père, ma mère, ma petite sœur
// et moi.
//
// Mon père s'appelle Ravi. Il est médecin. Ma mère s'appelle Anita. Elle
// est professeur. Ma petite sœur s'appelle Mia. Elle a cinq ans.
//
// Le matin, je me lève à six heures. Je mange du pain et je bois du lait.
// Ensuite, je vais à l'école à pied avec ma sœur.
//
// J'aime beaucoup ma famille.
// ─────────────────────────────────────────────────────────────────────

const _PASSAGE_G4FR = '<b>MA FAMILLE</b><br><br>Je m\'appelle Priya. J\'ai dix ans. J\'habite à Curepipe avec ma famille. Nous sommes quatre dans ma famille : mon père, ma mère, ma petite sœur et moi.<br><br>Mon père s\'appelle Ravi. Il est médecin. Ma mère s\'appelle Anita. Elle est professeur. Ma petite sœur s\'appelle Mia. Elle a cinq ans.<br><br>Le matin, je me lève à six heures. Je mange du pain et je bois du lait. Ensuite, je vais à l\'école à pied avec ma sœur.<br><br>J\'aime beaucoup ma famille.';

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4fr-comp-001', chapterId:'g4fr-lecture', difficulty:1,
    question:_PASSAGE_G4FR + '<hr>Quel est le prénom de la narratrice ?',
    options:['Anita','Mia','Priya','Ravi'],
    answer:'Priya',
    hint:'Lis la première phrase du texte.',
    explanation:'"Je m\'appelle <b>Priya</b>." — La première phrase donne directement le prénom de la narratrice. "Je m\'appelle" = My name is. C\'est une question factuelle directe.' }),

  makeMCQ({ id:'g4fr-comp-002', chapterId:'g4fr-lecture', difficulty:1,
    question:_PASSAGE_G4FR + '<hr>Quel âge a Priya ?',
    options:['cinq ans','huit ans','dix ans','douze ans'],
    answer:'dix ans',
    hint:'"J\'ai ___ ans." Quelle est la réponse dans le texte ?',
    explanation:'"J\'ai <b>dix ans</b>." — Priya a 10 ans. En français, pour donner son âge, on utilise le verbe "avoir" : J\'ai dix ans (I am ten years old). "Dix" = 10.' }),

  makeMCQ({ id:'g4fr-comp-003', chapterId:'g4fr-lecture', difficulty:1,
    question:_PASSAGE_G4FR + '<hr>Quelle est la profession du père de Priya ?',
    options:['Professeur','Médecin','Dentiste','Pharmacien'],
    answer:'Médecin',
    hint:'Lis la phrase : "Mon père s\'appelle Ravi. Il est ___."',
    explanation:'"Il est <b>médecin</b>." — Le père de Priya (Ravi) est médecin (doctor). "Il est médecin" = He is a doctor. En français, on ne met pas d\'article devant le métier : "Il est médecin" (pas "un médecin").' }),

  makeMCQ({ id:'g4fr-comp-004', chapterId:'g4fr-lecture', difficulty:1,
    question:_PASSAGE_G4FR + '<hr>Que mange Priya le matin ?',
    options:['Du riz','Des céréales','Du pain','Des fruits'],
    answer:'Du pain',
    hint:'"Je mange ___ et je bois du lait."',
    explanation:'"Je mange <b>du pain</b> et je bois du lait." — Priya mange du pain (bread) et boit du lait (milk) le matin. "Du pain" = some bread. "Du" est l\'article partitif masculin (de + le).' }),

  makeMCQ({ id:'g4fr-comp-005', chapterId:'g4fr-lecture', difficulty:2,
    question:_PASSAGE_G4FR + '<hr>Combien de personnes y a-t-il dans la famille de Priya ?',
    options:['Deux','Trois','Quatre','Cinq'],
    answer:'Quatre',
    hint:'"Nous sommes ___ dans ma famille."',
    explanation:'"Nous sommes <b>quatre</b> dans ma famille." — Il y a 4 personnes : le père, la mère, la petite sœur (Mia) et Priya. "Combien" demande une quantité. "Quatre" = 4.' }),

  makeMCQ({ id:'g4fr-comp-006', chapterId:'g4fr-lecture', difficulty:2,
    question:_PASSAGE_G4FR + '<hr>Que signifie "Je m\'appelle" en anglais ?',
    options:['I call you','My name is / I am called','He is called','We are called'],
    answer:'My name is / I am called',
    hint:'C\'est l\'expression pour se présenter en français.',
    explanation:'"<b>Je m\'appelle</b>" = My name is / I am called. C\'est un verbe réfléchi (s\'appeler). Pour se présenter : Je m\'appelle Priya. / Je m\'appelle ___. Pour demander le nom de quelqu\'un : Comment t\'appelles-tu ? (informal) / Comment vous appelez-vous ? (formal).' }),

  makeMCQ({ id:'g4fr-comp-007', chapterId:'g4fr-lecture', difficulty:2,
    question:_PASSAGE_G4FR + '<hr>Comment Priya va-t-elle à l\'école ?',
    options:['En voiture','En bus','À vélo','À pied'],
    answer:'À pied',
    hint:'"je vais à l\'école ___ avec ma sœur."',
    explanation:'"Je vais à l\'école <b>à pied</b>." — "À pied" = on foot / walking. Priya marche jusqu\'à l\'école avec sa sœur Mia. Moyens de transport : à pied (on foot), en voiture (by car), en bus (by bus), à vélo (by bike).' }),

  makeMCQ({ id:'g4fr-comp-008', chapterId:'g4fr-lecture', difficulty:2,
    question:_PASSAGE_G4FR + '<hr>Quel âge a Mia, la petite sœur de Priya ?',
    options:['Trois ans','Quatre ans','Cinq ans','Six ans'],
    answer:'Cinq ans',
    hint:'"Ma petite sœur s\'appelle Mia. Elle a ___ ans."',
    explanation:'"Elle a <b>cinq ans</b>." — Mia a 5 ans. "Cinq" = 5. N\'oublie pas : en français, on utilise "avoir" pour l\'âge — "Elle a cinq ans" (She has five years / She is five years old).' }),

  makeMCQ({ id:'g4fr-comp-009', chapterId:'g4fr-lecture', difficulty:3,
    question:_PASSAGE_G4FR + '<hr>Que signifie le mot "Ensuite" dans le texte ?',
    options:['Before','Because','Then / Afterwards','But'],
    answer:'Then / Afterwards',
    hint:'"Ensuite" est un mot de liaison qui indique l\'ordre des actions.',
    explanation:'"<b>Ensuite</b>" = Then / Afterwards — c\'est un mot de liaison (connecteur) qui indique que l\'action suivante se passe après. Dans le texte : Priya mange, boit du lait, <b>ensuite</b> elle va à l\'école. Autres connecteurs : d\'abord (first), puis (then), enfin (finally).' }),

  makeMCQ({ id:'g4fr-comp-010', chapterId:'g4fr-lecture', difficulty:4,
    question:_PASSAGE_G4FR + '<hr>D\'après TOUT le texte, quelle phrase décrit le mieux la famille de Priya ?',
    options:[
      'C\'est une grande famille avec six personnes.',
      'C\'est une famille de quatre personnes où les parents ont des professions importantes.',
      'Priya n\'aime pas sa famille.',
      'La famille de Priya habite à Port Louis.'
    ],
    answer:'C\'est une famille de quatre personnes où les parents ont des professions importantes.',
    hint:'Lis le texte en entier. Combien sont-ils ? Quelles sont les professions ? Où habitent-ils ? Comment Priya se sent-elle ?',
    explanation:'La réponse correcte résume bien le texte : <b>quatre personnes</b> (nous sommes quatre), <b>professions</b> importantes (père = médecin, mère = professeur). Ils habitent à Curepipe (pas Port Louis). Priya dit "J\'aime beaucoup ma famille" — elle aime sa famille. Cette question teste la compréhension globale du texte.' })

);
