'use strict';
// Grade 4 French - Chapitre : Lecture & Compréhension
// IDs format: g4fr-comp-NNN
//
// Passage utilisé dans ce chapitre :
// ─────────────────────────────────────────────────────────────────────
// MA FAMILLE (MIE Grade 4 French - contexte mauricien)
//
// Je m\'appelle Priya. J\'ai dix ans. J\'habite à Curepipe avec ma famille.
// Nous sommes quatre dans ma famille : mon père, ma mère, ma petite sœur
// et moi.
//
// Mon père s\'appelle Ravi. Il est médecin. Ma mère s\'appelle Anita. Elle
// est professeur. Ma petite sœur s\'appelle Mia. Elle a cinq ans.
//
// Le matin, je me lève à six heures. Je mange du pain et je bois du lait.
// Ensuite, je vais à l\'école à pied avec ma sœur.
//
// J\'aime beaucoup ma famille.
// ─────────────────────────────────────────────────────────────────────

const _PASSAGE_G4FR = '<b>MA FAMILLE</b><br><br>Je m\'appelle Priya. J\'ai dix ans. J\'habite à Curepipe avec ma famille. Nous sommes quatre dans ma famille : mon père, ma mère, ma petite sœur et moi.<br><br>Mon père s\'appelle Ravi. Il est médecin. Ma mère s\'appelle Anita. Elle est professeur. Ma petite sœur s\'appelle Mia. Elle a cinq ans.<br><br>Le matin, je me lève à six heures. Je mange du pain et je bois du lait. Ensuite, je vais à l\'école à pied avec ma sœur.<br><br>J\'aime beaucoup ma famille.';

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4fr-comp-001', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:1,
    question:_PASSAGE_G4FR + '<hr>Quel est le prénom de la narratrice ?',
    options:['Anita','Mia','Priya','Ravi'],
    answer:'Priya',
    hint:'Lis la première phrase du texte.',
    explanation:'"Je m\'appelle <b>Priya</b>." - La première phrase donne directement le prénom de la narratrice. "Je m\'appelle" = My name is. C\'est une question factuelle directe.' }),

  makeMCQ({ id:'g4fr-comp-002', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:1,
    question:_PASSAGE_G4FR + '<hr>Quel âge a Priya ?',
    options:['cinq ans','huit ans','dix ans','douze ans'],
    answer:'dix ans',
    hint:'"J\'ai ___ ans." Quelle est la réponse dans le texte ?',
    explanation:'"J\'ai <b>dix ans</b>." - Priya a 10 ans. En français, pour donner son âge, on utilise le verbe "avoir" : J\'ai dix ans (I am ten years old). "Dix" = 10.' }),

  makeMCQ({ id:'g4fr-comp-003', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:1,
    question:_PASSAGE_G4FR + '<hr>Quelle est la profession du père de Priya ?',
    options:['Professeur','Médecin','Dentiste','Pharmacien'],
    answer:'Médecin',
    hint:'Lis la phrase : "Mon père s\'appelle Ravi. Il est ___."',
    explanation:'"Il est <b>médecin</b>." - Le père de Priya (Ravi) est médecin (doctor). "Il est médecin" = He is a doctor. En français, on ne met pas d\'article devant le métier : "Il est médecin" (pas "un médecin").' }),

  makeMCQ({ id:'g4fr-comp-004', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:1,
    question:_PASSAGE_G4FR + '<hr>Que mange Priya le matin ?',
    options:['Du riz','Des céréales','Du pain','Des fruits'],
    answer:'Du pain',
    hint:'"Je mange ___ et je bois du lait."',
    explanation:'"Je mange <b>du pain</b> et je bois du lait." - Priya mange du pain (bread) et boit du lait (milk) le matin. "Du pain" = some bread. "Du" est l\'article partitif masculin (de + le).' }),

  makeMCQ({ id:'g4fr-comp-005', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:2,
    question:_PASSAGE_G4FR + '<hr>Combien de personnes y a-t-il dans la famille de Priya ?',
    options:['Deux','Trois','Quatre','Cinq'],
    answer:'Quatre',
    hint:'"Nous sommes ___ dans ma famille."',
    explanation:'"Nous sommes <b>quatre</b> dans ma famille." - Il y a 4 personnes : le père, la mère, la petite sœur (Mia) et Priya. "Combien" demande une quantité. "Quatre" = 4.' }),

  makeMCQ({ id:'g4fr-comp-006', chapterId:'g4fr-lecture', subsection:'vocabulaire', difficulty:2,
    question:_PASSAGE_G4FR + '<hr>Que signifie "Je m\'appelle" en anglais ?',
    options:['I call you','My name is / I am called','He is called','We are called'],
    answer:'My name is / I am called',
    hint:'C\'est l\'expression pour se présenter en français.',
    explanation:'"<b>Je m\'appelle</b>" = My name is / I am called. C\'est un verbe réfléchi (s\'appeler). Pour se présenter : Je m\'appelle Priya. / Je m\'appelle ___. Pour demander le nom de quelqu\'un : Comment t\'appelles-tu ? (informal) / Comment vous appelez-vous ? (formal).' }),

  makeMCQ({ id:'g4fr-comp-007', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:2,
    question:_PASSAGE_G4FR + '<hr>Comment Priya va-t-elle à l\'école ?',
    options:['En voiture','En bus','À vélo','À pied'],
    answer:'À pied',
    hint:'"je vais à l\'école ___ avec ma sœur."',
    explanation:'"Je vais à l\'école <b>à pied</b>." - "À pied" = on foot / walking. Priya marche jusqu\'à l\'école avec sa sœur Mia. Moyens de transport : à pied (on foot), en voiture (by car), en bus (by bus), à vélo (by bike).' }),

  makeMCQ({ id:'g4fr-comp-008', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:2,
    question:_PASSAGE_G4FR + '<hr>Quel âge a Mia, la petite sœur de Priya ?',
    options:['Trois ans','Quatre ans','Cinq ans','Six ans'],
    answer:'Cinq ans',
    hint:'"Ma petite sœur s\'appelle Mia. Elle a ___ ans."',
    explanation:'"Elle a <b>cinq ans</b>." - Mia a 5 ans. "Cinq" = 5. N\'oublie pas : en français, on utilise "avoir" pour l\'âge - "Elle a cinq ans" (She has five years / She is five years old).' }),

  makeMCQ({ id:'g4fr-comp-009', chapterId:'g4fr-lecture', subsection:'vocabulaire', difficulty:3,
    question:_PASSAGE_G4FR + '<hr>Que signifie le mot "Ensuite" dans le texte ?',
    options:['Before','Because','Then / Afterwards','But'],
    answer:'Then / Afterwards',
    hint:'"Ensuite" est un mot de liaison qui indique l\'ordre des actions.',
    explanation:'"<b>Ensuite</b>" = Then / Afterwards - c\'est un mot de liaison (connecteur) qui indique que l\'action suivante se passe après. Dans le texte : Priya mange, boit du lait, <b>ensuite</b> elle va à l\'école. Autres connecteurs : d\'abord (first), puis (then), enfin (finally).' }),

  makeMCQ({ id:'g4fr-comp-010', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:4,
    question:_PASSAGE_G4FR + '<hr>D\'après TOUT le texte, quelle phrase décrit le mieux la famille de Priya ?',
    options:[
      'C\'est une grande famille avec six personnes.',
      'C\'est une famille de quatre personnes où les parents ont des professions importantes.',
      'Priya n\'aime pas sa famille.',
      'La famille de Priya habite à Port Louis.'
    ],
    answer:'C\'est une famille de quatre personnes où les parents ont des professions importantes.',
    hint:'Lis le texte en entier. Combien sont-ils ? Quelles sont les professions ? Où habitent-ils ? Comment Priya se sent-elle ?',
    explanation:'La réponse correcte résume bien le texte : <b>quatre personnes</b> (nous sommes quatre), <b>professions</b> importantes (père = médecin, mère = professeur). Ils habitent à Curepipe (pas Port Louis). Priya dit "J\'aime beaucoup ma famille" - elle aime sa famille. Cette question teste la compréhension globale du texte.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4fr-comp-011', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:1,
    question:_PASSAGE_G4FR + '<hr>Quelle est la profession de la MÈRE de Priya ?',
    options:['Médecin','Infirmière','Professeur','Directrice'],
    answer:'Professeur',
    hint:'"Ma mère s\'appelle Anita. Elle est ___."',
    explanation:'"Elle est <b>professeur</b>." - La mère de Priya (Anita) est professeur (teacher). Le père (Ravi) est médecin. En français, on dit "elle est professeur" sans article défini.' }),

  makeMCQ({ id:'g4fr-comp-012', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:1,
    question:_PASSAGE_G4FR + '<hr>À quelle heure Priya se lève-t-elle le matin ?',
    options:['À cinq heures','À six heures','À sept heures','À huit heures'],
    answer:'À six heures',
    hint:'"Le matin, je me lève à ___ heures."',
    explanation:'"Le matin, je me lève à <b>six heures</b>." - Priya se lève à 6h. "Six" = 6. "Je me lève" = I get up (verbe réfléchi se lever).' }),

  makeMCQ({ id:'g4fr-comp-013', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:1,
    question:_PASSAGE_G4FR + '<hr>Que BOIT Priya le matin ?',
    options:['Du jus d\'orange','De l\'eau','Du thé','Du lait'],
    answer:'Du lait',
    hint:'"Je mange du pain et je bois ___."',
    explanation:'"Je bois <b>du lait</b>." - Priya boit du lait (milk) le matin. "Boire" = to drink. "Du lait" = some milk (article partitif du = de + le). Ne pas confondre manger (to eat) et boire (to drink).' }),

  makeMCQ({ id:'g4fr-comp-014', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:2,
    question:_PASSAGE_G4FR + '<hr>Avec qui Priya va-t-elle à l\'école ?',
    options:['Avec son père','Seule','Avec sa mère','Avec sa sœur'],
    answer:'Avec sa sœur',
    hint:'"je vais à l\'école à pied avec ___."',
    explanation:'"Je vais à l\'école à pied avec <b>ma sœur</b>." - Priya va à l\'école avec sa sœur Mia. "Avec" = with. "Sa sœur" = her sister.' }),

  makeMCQ({ id:'g4fr-comp-015', chapterId:'g4fr-lecture', subsection:'idee_principale', difficulty:2,
    question:_PASSAGE_G4FR + '<hr>Quelle est l\'idée principale du TROISIÈME paragraphe (qui commence par "Le matin") ?',
    options:[
      'Priya présente les membres de sa famille.',
      'Priya décrit sa routine matinale : elle se lève, mange et va à l\'école.',
      'Priya explique où elle habite.',
      'Priya parle de ses matières préférées à l\'école.'
    ],
    answer:'Priya décrit sa routine matinale : elle se lève, mange et va à l\'école.',
    hint:'Le troisième paragraphe commence par "Le matin...". De quoi parle-t-il entièrement ?',
    explanation:'Le troisième paragraphe décrit la <b>routine matinale</b> de Priya : elle se lève à six heures, mange du pain, boit du lait, puis va à l\'école. Les autres réponses décrivent d\'autres paragraphes du texte.' }),

  makeMCQ({ id:'g4fr-comp-016', chapterId:'g4fr-lecture', subsection:'inference', difficulty:3,
    question:_PASSAGE_G4FR + '<hr>Pourquoi Priya va-t-elle à l\'école avec SA SŒUR et non toute seule ?',
    options:[
      'Parce que sa sœur est plus âgée et la guide.',
      'Le texte ne le dit pas explicitement - on peut inférer qu\'elles vont à la même école ou que c\'est pour la sécurité.',
      'Parce que Priya ne connaît pas le chemin.',
      'Parce que sa mère les oblige à y aller ensemble.'
    ],
    answer:'Le texte ne le dit pas explicitement - on peut inférer qu\'elles vont à la même école ou que c\'est pour la sécurité.',
    hint:'Le texte dit-il POURQUOI ? Ou doit-on faire une inférence ?',
    explanation:'Le texte ne donne pas de raison directe - il dit seulement "je vais à l\'école à pied avec ma sœur". Pour répondre "pourquoi", on doit faire une <b>inférence</b> (lire entre les lignes). Les deux raisons les plus probables : même école, ou sécurité.' }),

  makeTF({ id:'g4fr-comp-017', chapterId:'g4fr-lecture', subsection:'fait_opinion', difficulty:3,
    question:_PASSAGE_G4FR + '<hr>"J\'aime beaucoup ma famille" est une OPINION et non un fait.',
    answer:true,
    hint:'Un fait peut être vérifié. Une opinion exprime un sentiment ou un jugement personnel.',
    explanation:'<b>Vrai.</b> "J\'aime beaucoup ma famille" exprime le <b>sentiment personnel</b> de Priya - c\'est une opinion. Les faits (nombre de personnes, professions, horaire) peuvent être vérifiés. Les sentiments personnels sont des opinions, pas des faits.' }),

  makeMCQ({ id:'g4fr-comp-018', chapterId:'g4fr-lecture', subsection:'vocabulaire', difficulty:3,
    question:_PASSAGE_G4FR + '<hr>Que signifie l\'expression "je bois du lait" en anglais ?',
    options:['I eat some milk','I want some milk','I drink some milk','I like milk'],
    answer:'I drink some milk',
    hint:'"Boire" = to drink. "Du lait" = some milk.',
    explanation:'"Je bois du lait" = <b>I drink some milk</b>. "Boire" = to drink. "Du lait" = du (article partitif = some) + lait (milk). L\'article partitif "du" (de + le) s\'utilise pour des quantités indéfinies : du lait, du pain, du jus.' }),

  makeMCQ({ id:'g4fr-comp-019', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:4,
    question:_PASSAGE_G4FR + '<hr>Ce texte est écrit à la PREMIÈRE PERSONNE ("Je m\'appelle Priya, J\'ai..."). Quel est l\'effet de ce choix sur le lecteur ?',
    options:[
      'Il rend le texte difficile à lire.',
      'Il crée une distance entre le lecteur et Priya.',
      'Il donne au lecteur l\'impression de connaître Priya directement - le texte est personnel et intime.',
      'Il indique que le texte est une fiction inventée par quelqu\'un d\'autre.'
    ],
    answer:'Il donne au lecteur l\'impression de connaître Priya directement - le texte est personnel et intime.',
    hint:'Quand un auteur dit "Je...", quel effet cela crée-t-il sur le lecteur ?',
    explanation:'La <b>première personne</b> ("je") crée une narration personnelle et directe - le lecteur a l\'impression que Priya lui parle directement. Cela rend le texte plus <b>intime et personnel</b>. À comparer avec la troisième personne ("Elle s\'appelle Priya") qui crée plus de distance. C\'est un choix d\'écriture délibéré.' }),

  makeMCQ({ id:'g4fr-comp-020', chapterId:'g4fr-lecture', subsection:'connecteurs', difficulty:1,
    question:'Quel connecteur logique signifie "first of all" ?',
    options:['ensuite','enfin','d\'abord','donc'],
    answer:"d\'abord",
    hint:'Pour commencer une liste d\'actions ou d\'étapes.',
    explanation:'"First of all" = <b>d\'abord</b>. L\'ordre des connecteurs de séquence : <b>d\'abord</b> (first), <b>ensuite/puis</b> (then/next), <b>enfin</b> (finally). Ces mots structurent un texte narratif ou des instructions.' }),

  makeMCQ({ id:'g4fr-comp-021', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:1,
    question:'Comment s\'appelle le type de texte qui raconte une histoire ?',
    options:['une recette','une lettre','une affiche','une histoire (texte narratif)'],
    answer:'une histoire (texte narratif)',
    hint:'Ce type de texte a un début, un milieu et une fin.',
    explanation:'Un <b>texte narratif</b> (= une histoire) raconte des événements. Il a : un <b>début</b> (introduction des personnages), un <b>milieu</b> (événements), une <b>fin</b> (résolution). Les autres types : <b>recette</b> (instructions), <b>lettre</b> (communication), <b>affiche</b> (annonce visuelle).' }),

  makeTF({ id:'g4fr-comp-022', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:1,
    question:'"Ensuite" et "puis" ont le même sens (= "then / next").',
    answer:true,
    hint:'Les deux expriment ce qui vient après.',
    explanation:'<b>Vrai.</b> <b>ensuite</b> et <b>puis</b> sont synonymes et signifient tous les deux "then / next". On peut les utiliser de manière interchangeable : "D\'abord je mange, <b>ensuite</b> je dors." = "D\'abord je mange, <b>puis</b> je dors."' }),

  makeMCQ({ id:'g4fr-comp-023', chapterId:'g4fr-lecture', subsection:'vocabulaire', difficulty:2,
    question:'Quel est le synonyme de "content" (happy) ?',
    options:['triste','fatigué','joyeux','fâché'],
    answer:'joyeux',
    hint:'"Joyeux" et "content" expriment tous les deux la joie.',
    explanation:'"Content" = <b>joyeux</b> (synonyme). Les deux mots signifient "happy". D\'autres synonymes : heureux, ravi, enchanté. Antonymes (opposés) : triste (sad), malheureux (unhappy), fâché (angry), déçu (disappointed).' }),

  makeMCQ({ id:'g4fr-comp-024', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:2,
    question:'Quel est l\'antonyme (opposé) de "petit" ?',
    options:['petit','joli','grand','mignon'],
    answer:'grand',
    hint:'L\'opposé de "small" est "big".',
    explanation:'"Petit" (small) → antonyme = <b>grand</b> (big). Les antonymes sont des mots de sens opposé. Autres paires : chaud/froid, rapide/lent, fort/faible, beau/laid, riche/pauvre, jeune/vieux.' }),

  makeMCQ({ id:'g4fr-comp-025', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:2,
    question:'Lis : "Priya a d\'abord fait ses devoirs, puis elle a regardé la télévision, enfin elle a dormi." Quelle action est arrivée en DERNIER ?',
    options:['faire les devoirs','regarder la télévision','dormir','manger'],
    answer:'dormir',
    hint:'"Enfin" indique la dernière action.',
    explanation:'"<b>Enfin</b> elle a dormi" - <b>enfin</b> = finally = la dernière action. Ordre : d\'abord (1er) → puis (2ème) → enfin (3ème). Donc : 1. devoirs, 2. télévision, 3. <b>dormir</b>. Les connecteurs de séquence révèlent l\'ordre chronologique.' }),

  makeMCQ({ id:'g4fr-comp-026', chapterId:'g4fr-lecture', subsection:'connecteurs', difficulty:2,
    question:'Quel connecteur signifie "because" ?',
    options:['d\'abord','enfin','donc','parce que'],
    answer:'parce que',
    hint:'"Parce que" répond à la question "pourquoi ?".',
    explanation:'"Because" = <b>parce que</b>. "Je reste à la maison <b>parce que</b> je suis malade." (I stay home because I\'m sick). À ne pas confondre avec <b>donc</b> (so/therefore) qui exprime une conséquence, pas une raison.' }),

  makeMCQ({ id:'g4fr-comp-027', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:2,
    question:'Une "recette" est quel type de texte ?',
    options:['un texte narratif','un texte instructif','une lettre','une affiche'],
    answer:'un texte instructif',
    hint:'Une recette donne des instructions étapes par étapes.',
    explanation:'Une <b>recette</b> est un <b>texte instructif</b> - elle donne des instructions à suivre (liste d\'ingrédients + étapes de préparation). Elle utilise souvent l\'impératif : "Mélangez la farine, ajoutez les œufs..." À distinguer : narratif (histoire), descriptif (description), argumentatif (opinion).' }),

  makeMCQ({ id:'g4fr-comp-028', chapterId:'g4fr-lecture', subsection:'idee_principale', difficulty:3,
    question:'Lis : "Luc adore le football. Il s\'entraîne tous les jours. Son équipe a gagné le championnat." Quelle est l\'idée principale ?',
    options:[
      'L\'équipe de Luc a gagné.',
      'Luc est un jeune footballeur passionné et talentueux.',
      'Luc s\'entraîne le mardi.',
      'Le football est un sport populaire.'
    ],
    answer:'Luc est un jeune footballeur passionné et talentueux.',
    hint:'L\'idée principale résume ce que tout le texte dit sur Luc.',
    explanation:'L\'<b>idée principale</b> résume l\'ensemble du texte. "Luc adore le football" (passion), "s\'entraîne tous les jours" (dévouement), "a gagné le championnat" (talent/succès) → tout pointe vers : "<b>Luc est un jeune footballeur passionné et talentueux.</b>" Les autres options ne sont que des détails.' }),

  makeMCQ({ id:'g4fr-comp-029', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:3,
    question:'Dans le texte de Priya (Ma Famille), quel mot pourrait remplacer "habite" dans "J\'habite à Curepipe" ?',
    options:['joue','mange','vis','court'],
    answer:'vis',
    hint:'"Habiter" et "vivre" peuvent tous les deux signifier "to live (somewhere)".',
    explanation:'"J\'<b>habite</b> à Curepipe" = "Je <b>vis</b> à Curepipe." - <b>habiter</b> et <b>vivre</b> sont synonymes quand on parle d\'un lieu de résidence. "Vivre" est plus général (to live/to be alive), "habiter" est plus spécifique (to reside). Les deux sont corrects ici.' }),

  makeMCQ({ id:'g4fr-comp-030', chapterId:'g4fr-lecture', subsection:'connecteurs', difficulty:3,
    question:'Lis : "Il fait beau. Marie décide donc d\'aller au parc." Quel connecteur pourrait remplacer "donc" ici ?',
    options:['parce que','d\'abord','mais','cependant'],
    answer:'parce que',
    hint:'La belle météo est la raison d\'aller au parc.',
    explanation:'On pourrait restructurer : "Marie décide d\'aller au parc <b>parce qu\'</b>il fait beau." - <b>donc</b> (conséquence) et <b>parce que</b> (cause) expriment la même relation logique mais dans des structures différentes : Cause + donc + Résultat ↔ Résultat + parce que + Cause.' }),

  makeMCQ({ id:'g4fr-comp-031', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:3,
    question:'Quel est l\'antonyme de "rapide" ?',
    options:['vite','lent','court','fort'],
    answer:'lent',
    hint:'"Slow" est l\'opposé de "fast".',
    explanation:'"Rapide" (fast/quick) → antonyme = <b>lent</b> (slow). Autres paires d\'antonymes : grand/petit, chaud/froid, fort/faible, riche/pauvre, heureux/triste, beau/laid. Ces paires sont utiles dans les exercices de synonymes/antonymes.' }),

  makeMCQ({ id:'g4fr-comp-032', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:4,
    question:'Lis : "D\'abord, Riya a préparé ses affaires. Ensuite, elle a dit au revoir à sa famille. Enfin, elle est partie à l\'école." Combien d\'actions y a-t-il et dans quel ordre ?',
    options:[
      '2 actions : au revoir → école',
      '3 actions : préparer → au revoir → partir',
      '3 actions : partir → préparer → au revoir',
      '4 actions : école → famille → affaires → partir'
    ],
    answer:'3 actions : préparer → au revoir → partir',
    hint:'Compte les connecteurs de séquence.',
    explanation:'Il y a <b>3 actions</b>, dans cet ordre : 1. (<b>d\'abord</b>) préparer ses affaires → 2. (<b>ensuite</b>) dire au revoir → 3. (<b>enfin</b>) partir à l\'école. Chaque connecteur de séquence (d\'abord, ensuite, enfin) introduit une nouvelle action dans l\'ordre chronologique.' }),

  makeMCQ({ id:'g4fr-comp-033', chapterId:'g4fr-lecture', subsection:'idee_principale', difficulty:4,
    question:'Lis ce court texte et choisis l\'idée principale : "La tortue géante peut vivre plus de 100 ans. Elle mange des plantes et des fruits. Elle peut peser jusqu\'à 200 kg. La tortue géante est un animal endémique des Mascareignes."',
    options:[
      'La tortue mange des fruits.',
      'La tortue géante est un animal remarquable des Mascareignes.',
      'La tortue peut peser 200 kg.',
      'La tortue vit 100 ans.'
    ],
    answer:'La tortue géante est un animal remarquable des Mascareignes.',
    hint:'L\'idée principale couvre TOUT le texte, pas juste un détail.',
    explanation:'L\'<b>idée principale</b> englobe tous les détails : longévité (100 ans), régime alimentaire (plantes/fruits), poids (200 kg) → tout prouve que "<b>La tortue géante est un animal remarquable des Mascareignes.</b>" Les autres options ne sont que des détails spécifiques.' }),

  makeMCQ({ id:'g4fr-comp-034', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:4,
    question:'Dans la phrase "Je n\'aime pas la pluie parce qu\'elle mouille mes vêtements", quel est le rôle de "parce que" ?',
    options:[
      'Il exprime la conséquence.',
      'Il exprime la raison/cause.',
      'Il exprime l\'opposition.',
      'Il exprime l\'ordre des événements.'
    ],
    answer:'Il exprime la raison/cause.',
    hint:'"Parce que" répond à "Pourquoi n\'aimes-tu pas la pluie ?"',
    explanation:'"<b>Parce que</b>" exprime la <b>raison/cause</b>. "Je n\'aime pas la pluie" (effet) + "parce qu\'elle mouille mes vêtements" (cause = raison). À comparer : <b>donc</b> (so → conséquence), <b>mais</b> (but → opposition), <b>d\'abord/ensuite</b> (ordre chronologique).' }),

  makeMCQ({ id:'g4fr-comp-035', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:4,
    question:'Priya écrit une lettre à sa correspondante française. Elle termine : "J\'espère te revoir bientôt. ___" Quelle formule de politesse est la plus appropriée pour FINIR une lettre amicale ?',
    options:[
      'Bonjour,',
      'Grosses bises,',
      'Monsieur / Madame,',
      'Veuillez agréer...'
    ],
    answer:'Grosses bises,',
    hint:'Pour une lettre entre amis/enfants, on utilise une formule affectueuse.',
    explanation:'"<b>Grosses bises</b>" (big kisses) est appropriée pour une lettre <b>amicale/informelle</b> entre enfants. "Bonjour" = salutation initiale. "Monsieur/Madame" = formule formelle (début). "Veuillez agréer..." = formule très formelle (lettre officielle). Une lettre amicale commence par "Chère/Cher..." et finit par "Bisous, Grosses bises, Amicalement..."' }),

// ── Passage B : Le marché du samedi ────────────────────────────────────────
  makeMCQ({ id:'g4fr-comp-036', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:1,
    question:'<div style="background:#f8fafc;border-left:4px solid #0891b2;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#164e63">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>Le marché du samedi</b><br><br>Le samedi matin, Priya part au marché de Port Louis avec sa maman. Le marché est grand et animé. Les marchands crient leurs prix pour attirer les clients. "Des mangues bien mûres ! Dix roupies le kilo !" lance un vieux monsieur.<br><br>Priya et sa maman achètent du fruit à pain, des mangues jaunes et de la coriandre fraîche. Elles s\'arrêtent aussi devant l\'étalage d\'un pêcheur qui vend des capitaines et des cordonniers. Le poisson frais brille sous le soleil.<br><br>Sur le chemin du retour, les bras chargés de sacs, Priya est heureuse. Ce soir, sa maman va préparer un délicieux curry de poisson avec du riz blanc.</div><hr style="margin:8px 0">Quel jour Priya va-t-elle au marché ?',
    options:['Le vendredi','Le samedi','Le dimanche','Le lundi'],
    answer:'Le samedi',
    hint:'Regardez la première phrase du texte.',
    explanation:'"<b>Le samedi</b> matin, Priya part au marché…" — La première phrase donne directement le jour.' }),

  makeMCQ({ id:'g4fr-comp-037', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:1,
    question:'<div style="background:#f8fafc;border-left:4px solid #0891b2;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#164e63">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>Le marché du samedi</b><br><br>Le samedi matin, Priya part au marché de Port Louis avec sa maman. Le marché est grand et animé. Les marchands crient leurs prix pour attirer les clients. "Des mangues bien mûres ! Dix roupies le kilo !" lance un vieux monsieur.<br><br>Priya et sa maman achètent du fruit à pain, des mangues jaunes et de la coriandre fraîche. Elles s\'arrêtent aussi devant l\'étalage d\'un pêcheur qui vend des capitaines et des cordonniers. Le poisson frais brille sous le soleil.<br><br>Sur le chemin du retour, les bras chargés de sacs, Priya est heureuse. Ce soir, sa maman va préparer un délicieux curry de poisson avec du riz blanc.</div><hr style="margin:8px 0">Qui vend du poisson au marché ?',
    options:['Un marchand de légumes','Un vieux monsieur','Un pêcheur','La maman de Priya'],
    answer:'Un pêcheur',
    hint:'Cherchez la personne qui a un étalage de poissons.',
    explanation:'"Elles s\'arrêtent devant l\'étalage d\'<b>un pêcheur</b> qui vend des capitaines et des cordonniers." — Le pêcheur est la personne qui vend le poisson.' }),

  makeMCQ({ id:'g4fr-comp-038', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:1,
    question:'<div style="background:#f8fafc;border-left:4px solid #0891b2;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#164e63">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>Le marché du samedi</b><br><br>Le samedi matin, Priya part au marché de Port Louis avec sa maman. Le marché est grand et animé. Les marchands crient leurs prix pour attirer les clients. "Des mangues bien mûres ! Dix roupies le kilo !" lance un vieux monsieur.<br><br>Priya et sa maman achètent du fruit à pain, des mangues jaunes et de la coriandre fraîche. Elles s\'arrêtent aussi devant l\'étalage d\'un pêcheur qui vend des capitaines et des cordonniers. Le poisson frais brille sous le soleil.<br><br>Sur le chemin du retour, les bras chargés de sacs, Priya est heureuse. Ce soir, sa maman va préparer un délicieux curry de poisson avec du riz blanc.</div><hr style="margin:8px 0">Qu\'est-ce que la maman de Priya va préparer ce soir ?',
    options:['Un gâteau au miel','Un briani de légumes','Un curry de poisson avec du riz','Des sandwichs au fromage'],
    answer:'Un curry de poisson avec du riz',
    hint:'Lisez la dernière phrase du texte.',
    explanation:'"sa maman va préparer un délicieux <b>curry de poisson avec du riz blanc</b>" — La réponse est dans la dernière phrase.' }),

  makeMCQ({ id:'g4fr-comp-039', chapterId:'g4fr-lecture', subsection:'vocabulaire', difficulty:2,
    question:'<div style="background:#f8fafc;border-left:4px solid #0891b2;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#164e63">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>Le marché du samedi</b><br><br>Le samedi matin, Priya part au marché de Port Louis avec sa maman. Le marché est grand et animé. Les marchands crient leurs prix pour attirer les clients. "Des mangues bien mûres ! Dix roupies le kilo !" lance un vieux monsieur.<br><br>Priya et sa maman achètent du fruit à pain, des mangues jaunes et de la coriandre fraîche. Elles s\'arrêtent aussi devant l\'étalage d\'un pêcheur qui vend des capitaines et des cordonniers. Le poisson frais brille sous le soleil.<br><br>Sur le chemin du retour, les bras chargés de sacs, Priya est heureuse. Ce soir, sa maman va préparer un délicieux curry de poisson avec du riz blanc.</div><hr style="margin:8px 0">Dans le texte, que veut dire le mot "animé" ?',
    options:['Calme et silencieux','Plein de monde et de vie','Petit et étroit','Sombre et fermé'],
    answer:'Plein de monde et de vie',
    hint:'Pensez à ce qui se passe au marché : des marchands, des clients, du bruit…',
    explanation:'"Le marché est grand et <b>animé</b>" — "Animé" signifie <b>plein de monde et de vie</b>. Un endroit animé est vivant, bruyant, actif. Le contraire est "calme" ou "désert".' }),

  makeMCQ({ id:'g4fr-comp-040', chapterId:'g4fr-lecture', subsection:'inference', difficulty:2,
    question:'<div style="background:#f8fafc;border-left:4px solid #0891b2;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#164e63">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>Le marché du samedi</b><br><br>Le samedi matin, Priya part au marché de Port Louis avec sa maman. Le marché est grand et animé. Les marchands crient leurs prix pour attirer les clients. "Des mangues bien mûres ! Dix roupies le kilo !" lance un vieux monsieur.<br><br>Priya et sa maman achètent du fruit à pain, des mangues jaunes et de la coriandre fraîche. Elles s\'arrêtent aussi devant l\'étalage d\'un pêcheur qui vend des capitaines et des cordonniers. Le poisson frais brille sous le soleil.<br><br>Sur le chemin du retour, les bras chargés de sacs, Priya est heureuse. Ce soir, sa maman va préparer un délicieux curry de poisson avec du riz blanc.</div><hr style="margin:8px 0">Pourquoi les marchands crient-ils leurs prix ?',
    options:['Parce qu\'ils sont en colère','Pour attirer les clients','Parce qu\'il y a beaucoup de bruit','Pour appeler leurs amis'],
    answer:'Pour attirer les clients',
    hint:'Le texte explique directement la raison.',
    explanation:'"Les marchands crient leurs prix <b>pour attirer les clients</b>" — Le texte donne clairement la raison : crier les prix est une technique pour faire venir plus d\'acheteurs.' }),

  makeMCQ({ id:'g4fr-comp-041', chapterId:'g4fr-lecture', subsection:'inference', difficulty:2,
    question:'<div style="background:#f8fafc;border-left:4px solid #0891b2;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#164e63">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>Le marché du samedi</b><br><br>Le samedi matin, Priya part au marché de Port Louis avec sa maman. Le marché est grand et animé. Les marchands crient leurs prix pour attirer les clients. "Des mangues bien mûres ! Dix roupies le kilo !" lance un vieux monsieur.<br><br>Priya et sa maman achètent du fruit à pain, des mangues jaunes et de la coriandre fraîche. Elles s\'arrêtent aussi devant l\'étalage d\'un pêcheur qui vend des capitaines et des cordonniers. Le poisson frais brille sous le soleil.<br><br>Sur le chemin du retour, les bras chargés de sacs, Priya est heureuse. Ce soir, sa maman va préparer un délicieux curry de poisson avec du riz blanc.</div><hr style="margin:8px 0">Comment sait-on que Priya et sa maman ont beaucoup acheté ?',
    options:['Le texte dit qu\'elles ont dépensé beaucoup d\'argent','Elles rentrent "les bras chargés de sacs"','Elles sont restées au marché toute la journée','Le marchand leur a dit qu\'elles avaient pris trop de choses'],
    answer:'Elles rentrent "les bras chargés de sacs"',
    hint:'Cherchez ce qui décrit leur retour à la maison.',
    explanation:'"Sur le chemin du retour, <b>les bras chargés de sacs</b>…" — Cette expression montre qu\'elles ont acheté beaucoup de choses : leurs bras sont pleins de sacs lourds.' }),

  makeMCQ({ id:'g4fr-comp-042', chapterId:'g4fr-lecture', subsection:'figures_style', difficulty:3,
    question:'<div style="background:#f8fafc;border-left:4px solid #0891b2;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#164e63">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>Le marché du samedi</b><br><br>Le samedi matin, Priya part au marché de Port Louis avec sa maman. Le marché est grand et animé. Les marchands crient leurs prix pour attirer les clients. "Des mangues bien mûres ! Dix roupies le kilo !" lance un vieux monsieur.<br><br>Priya et sa maman achètent du fruit à pain, des mangues jaunes et de la coriandre fraîche. Elles s\'arrêtent aussi devant l\'étalage d\'un pêcheur qui vend des capitaines et des cordonniers. Le poisson frais brille sous le soleil.<br><br>Sur le chemin du retour, les bras chargés de sacs, Priya est heureuse. Ce soir, sa maman va préparer un délicieux curry de poisson avec du riz blanc.</div><hr style="margin:8px 0">"Le poisson frais brille sous le soleil." Que nous dit cette phrase sur le poisson ?',
    options:['Le poisson est recouvert de paillettes dorées','Le poisson est de très bonne qualité et vient d\'être pêché','Le soleil réchauffe le poisson et le fait cuire','Le marchand a mis une lampe pour éclairer son étalage'],
    answer:'Le poisson est de très bonne qualité et vient d\'être pêché',
    hint:'Quand un poisson "brille", c\'est un signe de fraîcheur.',
    explanation:'"Le poisson frais <b>brille</b> sous le soleil" — Un poisson frais et de bonne qualité est brillant et luisant. Cela montre que le poisson vient d\'être pêché et est en excellent état. C\'est une description sensorielle qui donne envie d\'acheter.' }),

  makeMCQ({ id:'g4fr-comp-043', chapterId:'g4fr-lecture', subsection:'idee_principale', difficulty:4,
    question:'<div style="background:#f8fafc;border-left:4px solid #0891b2;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#164e63">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>Le marché du samedi</b><br><br>Le samedi matin, Priya part au marché de Port Louis avec sa maman. Le marché est grand et animé. Les marchands crient leurs prix pour attirer les clients. "Des mangues bien mûres ! Dix roupies le kilo !" lance un vieux monsieur.<br><br>Priya et sa maman achètent du fruit à pain, des mangues jaunes et de la coriandre fraîche. Elles s\'arrêtent aussi devant l\'étalage d\'un pêcheur qui vend des capitaines et des cordonniers. Le poisson frais brille sous le soleil.<br><br>Sur le chemin du retour, les bras chargés de sacs, Priya est heureuse. Ce soir, sa maman va préparer un délicieux curry de poisson avec du riz blanc.</div><hr style="margin:8px 0">Quel est le sujet principal de ce texte ?',
    options:[
      'Un cours sur les poissons de Maurice',
      'Une visite au marché et les achats pour le repas du soir',
      'La vie d\'un marchand de légumes à Port Louis',
      'Les différentes sortes de mangues que l\'on trouve à Maurice'
    ],
    answer:'Une visite au marché et les achats pour le repas du soir',
    hint:'Le texte parle d\'une sortie au marché, de ce qu\'elles achètent, et de ce qu\'elles vont préparer.',
    explanation:'Le texte décrit <b>une visite au marché de Port Louis</b> avec une maman et sa fille, les achats qu\'elles font (fruit à pain, mangues, poisson), et le repas préparé le soir. C\'est le fil conducteur de tout le texte.' }),

// ── Passage C : Mon école ───────────────────────────────────────────────────
  makeMCQ({ id:'g4fr-comp-044', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:1,
    question:'<div style="background:#f8fafc;border-left:4px solid #16a34a;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#14532d">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>Mon école</b><br><br>Je m\'appelle Rohan. J\'ai dix ans et je suis en classe de quatrième à l\'école Jean La Fontaine de Quatre Bornes. Chaque matin, je prends le bus à sept heures.<br><br>À l\'école, la journée commence par le rassemblement dans la cour. Nous chantons l\'hymne national et le directeur nous parle des règles importantes.<br><br>Ma matière préférée, c\'est les sciences. J\'adore faire des expériences avec ma maîtresse, Madame Pillay. Elle nous explique comment les plantes poussent et pourquoi le ciel est bleu.<br><br>À la récréation, je joue au football avec mes amis Vikash et Omar. L\'après-midi, nous avons le français et les mathématiques. Je rentre à la maison à trois heures et demie.</div><hr style="margin:8px 0">Quel âge a Rohan ?',
    options:['Huit ans','Neuf ans','Dix ans','Onze ans'],
    answer:'Dix ans',
    hint:'Lisez la première ligne du texte.',
    explanation:'"Je m\'appelle Rohan. J\'ai <b>dix ans</b>…" — L\'âge est mentionné dès la première phrase.' }),

  makeMCQ({ id:'g4fr-comp-045', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:1,
    question:'<div style="background:#f8fafc;border-left:4px solid #16a34a;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#14532d">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>Mon école</b><br><br>Je m\'appelle Rohan. J\'ai dix ans et je suis en classe de quatrième à l\'école Jean La Fontaine de Quatre Bornes. Chaque matin, je prends le bus à sept heures.<br><br>À l\'école, la journée commence par le rassemblement dans la cour. Nous chantons l\'hymne national et le directeur nous parle des règles importantes.<br><br>Ma matière préférée, c\'est les sciences. J\'adore faire des expériences avec ma maîtresse, Madame Pillay. Elle nous explique comment les plantes poussent et pourquoi le ciel est bleu.<br><br>À la récréation, je joue au football avec mes amis Vikash et Omar. L\'après-midi, nous avons le français et les mathématiques. Je rentre à la maison à trois heures et demie.</div><hr style="margin:8px 0">Quelle est la matière préférée de Rohan ?',
    options:['Le français','Les mathématiques','Les sciences','Le sport'],
    answer:'Les sciences',
    hint:'Le texte le dit clairement au troisième paragraphe.',
    explanation:'"Ma matière préférée, c\'est <b>les sciences</b>." — Rohan l\'indique lui-même directement.' }),

  makeMCQ({ id:'g4fr-comp-046', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:1,
    question:'<div style="background:#f8fafc;border-left:4px solid #16a34a;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#14532d">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>Mon école</b><br><br>Je m\'appelle Rohan. J\'ai dix ans et je suis en classe de quatrième à l\'école Jean La Fontaine de Quatre Bornes. Chaque matin, je prends le bus à sept heures.<br><br>À l\'école, la journée commence par le rassemblement dans la cour. Nous chantons l\'hymne national et le directeur nous parle des règles importantes.<br><br>Ma matière préférée, c\'est les sciences. J\'adore faire des expériences avec ma maîtresse, Madame Pillay. Elle nous explique comment les plantes poussent et pourquoi le ciel est bleu.<br><br>À la récréation, je joue au football avec mes amis Vikash et Omar. L\'après-midi, nous avons le français et les mathématiques. Je rentre à la maison à trois heures et demie.</div><hr style="margin:8px 0">Comment Rohan va-t-il à l\'école chaque matin ?',
    options:['À pied','En voiture avec son père','En bus','À vélo'],
    answer:'En bus',
    hint:'Lisez la fin du premier paragraphe.',
    explanation:'"Chaque matin, je prends <b>le bus</b> à sept heures." — Le bus est le moyen de transport de Rohan.' }),

  makeMCQ({ id:'g4fr-comp-047', chapterId:'g4fr-lecture', subsection:'vocabulaire', difficulty:2,
    question:'<div style="background:#f8fafc;border-left:4px solid #16a34a;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#14532d">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>Mon école</b><br><br>Je m\'appelle Rohan. J\'ai dix ans et je suis en classe de quatrième à l\'école Jean La Fontaine de Quatre Bornes. Chaque matin, je prends le bus à sept heures.<br><br>À l\'école, la journée commence par le rassemblement dans la cour. Nous chantons l\'hymne national et le directeur nous parle des règles importantes.<br><br>Ma matière préférée, c\'est les sciences. J\'adore faire des expériences avec ma maîtresse, Madame Pillay. Elle nous explique comment les plantes poussent et pourquoi le ciel est bleu.<br><br>À la récréation, je joue au football avec mes amis Vikash et Omar. L\'après-midi, nous avons le français et les mathématiques. Je rentre à la maison à trois heures et demie.</div><hr style="margin:8px 0">Que veut dire "le rassemblement" dans ce texte ?',
    options:['Un repas partagé entre élèves','La réunion de tous les élèves dans la cour','Une compétition sportive','Une séance de travaux pratiques'],
    answer:'La réunion de tous les élèves dans la cour',
    hint:'Pensez à ce qui se passe au début de la journée scolaire dans la cour.',
    explanation:'"La journée commence par <b>le rassemblement</b> dans la cour. Nous chantons l\'hymne national…" — Le rassemblement est la <b>réunion de tous les élèves</b> dans la cour avant d\'entrer en classe.' }),

  makeMCQ({ id:'g4fr-comp-048', chapterId:'g4fr-lecture', subsection:'inference', difficulty:2,
    question:'<div style="background:#f8fafc;border-left:4px solid #16a34a;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#14532d">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>Mon école</b><br><br>Je m\'appelle Rohan. J\'ai dix ans et je suis en classe de quatrième à l\'école Jean La Fontaine de Quatre Bornes. Chaque matin, je prends le bus à sept heures.<br><br>À l\'école, la journée commence par le rassemblement dans la cour. Nous chantons l\'hymne national et le directeur nous parle des règles importantes.<br><br>Ma matière préférée, c\'est les sciences. J\'adore faire des expériences avec ma maîtresse, Madame Pillay. Elle nous explique comment les plantes poussent et pourquoi le ciel est bleu.<br><br>À la récréation, je joue au football avec mes amis Vikash et Omar. L\'après-midi, nous avons le français et les mathématiques. Je rentre à la maison à trois heures et demie.</div><hr style="margin:8px 0">Pourquoi Rohan aime-t-il les sciences ?',
    options:[
      'Parce que c\'est la matière la plus facile',
      'Parce que sa maîtresse explique des choses intéressantes comme les plantes et le ciel',
      'Parce qu\'il y a beaucoup de récréation pendant les sciences',
      'Parce que son ami Vikash aime aussi les sciences'
    ],
    answer:'Parce que sa maîtresse explique des choses intéressantes comme les plantes et le ciel',
    hint:'Lisez ce que Rohan dit de Madame Pillay.',
    explanation:'"J\'adore faire des expériences avec ma maîtresse, Madame Pillay. Elle nous explique <b>comment les plantes poussent</b> et <b>pourquoi le ciel est bleu</b>." — Ce sont des sujets fascinants qui expliquent son amour pour la matière.' }),

  makeMCQ({ id:'g4fr-comp-049', chapterId:'g4fr-lecture', subsection:'inference', difficulty:2,
    question:'<div style="background:#f8fafc;border-left:4px solid #16a34a;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#14532d">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>Mon école</b><br><br>Je m\'appelle Rohan. J\'ai dix ans et je suis en classe de quatrième à l\'école Jean La Fontaine de Quatre Bornes. Chaque matin, je prends le bus à sept heures.<br><br>À l\'école, la journée commence par le rassemblement dans la cour. Nous chantons l\'hymne national et le directeur nous parle des règles importantes.<br><br>Ma matière préférée, c\'est les sciences. J\'adore faire des expériences avec ma maîtresse, Madame Pillay. Elle nous explique comment les plantes poussent et pourquoi le ciel est bleu.<br><br>À la récréation, je joue au football avec mes amis Vikash et Omar. L\'après-midi, nous avons le français et les mathématiques. Je rentre à la maison à trois heures et demie.</div><hr style="margin:8px 0">Combien d\'amis Rohan mentionne-t-il dans le texte ?',
    options:['Un seul ami','Deux amis','Trois amis','Il n\'a pas d\'amis'],
    answer:'Deux amis',
    hint:'Lisez le paragraphe sur la récréation.',
    explanation:'"je joue au football avec mes amis <b>Vikash</b> et <b>Omar</b>" — Rohan nomme deux amis dans le texte.' }),

  makeMCQ({ id:'g4fr-comp-050', chapterId:'g4fr-lecture', subsection:'grammaire', difficulty:3,
    question:'<div style="background:#f8fafc;border-left:4px solid #16a34a;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#14532d">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>Mon école</b><br><br>Je m\'appelle Rohan. J\'ai dix ans et je suis en classe de quatrième à l\'école Jean La Fontaine de Quatre Bornes. Chaque matin, je prends le bus à sept heures.<br><br>À l\'école, la journée commence par le rassemblement dans la cour. Nous chantons l\'hymne national et le directeur nous parle des règles importantes.<br><br>Ma matière préférée, c\'est les sciences. J\'adore faire des expériences avec ma maîtresse, Madame Pillay. Elle nous explique comment les plantes poussent et pourquoi le ciel est bleu.<br><br>À la récréation, je joue au football avec mes amis Vikash et Omar. L\'après-midi, nous avons le français et les mathématiques. Je rentre à la maison à trois heures et demie.</div><hr style="margin:8px 0">Ce texte est écrit à quelle personne ?',
    options:['À la première personne (je / nous)','À la deuxième personne (tu / vous)','À la troisième personne (il / elle)','À la troisième personne du pluriel (ils / elles)'],
    answer:'À la première personne (je / nous)',
    hint:'Regardez les pronoms utilisés dans le texte.',
    explanation:'Le texte utilise les pronoms <b>"Je"</b> ("Je m\'appelle Rohan", "Je prends le bus", "Je joue") et <b>"Nous"</b> ("Nous chantons", "nous avons"). Ce sont des pronoms de la <b>première personne</b>. Rohan raconte sa propre histoire.' }),

  makeMCQ({ id:'g4fr-comp-051', chapterId:'g4fr-lecture', subsection:'idee_principale', difficulty:4,
    question:'<div style="background:#f8fafc;border-left:4px solid #16a34a;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#14532d">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>Mon école</b><br><br>Je m\'appelle Rohan. J\'ai dix ans et je suis en classe de quatrième à l\'école Jean La Fontaine de Quatre Bornes. Chaque matin, je prends le bus à sept heures.<br><br>À l\'école, la journée commence par le rassemblement dans la cour. Nous chantons l\'hymne national et le directeur nous parle des règles importantes.<br><br>Ma matière préférée, c\'est les sciences. J\'adore faire des expériences avec ma maîtresse, Madame Pillay. Elle nous explique comment les plantes poussent et pourquoi le ciel est bleu.<br><br>À la récréation, je joue au football avec mes amis Vikash et Omar. L\'après-midi, nous avons le français et les mathématiques. Je rentre à la maison à trois heures et demie.</div><hr style="margin:8px 0">Quel est le sujet principal de ce texte ?',
    options:[
      'Les règles à respecter dans une école mauricienne',
      'La journée typique d\'un écolier mauricien',
      'Pourquoi les sciences sont importantes',
      'Les jeux pratiqués pendant la récréation'
    ],
    answer:'La journée typique d\'un écolier mauricien',
    hint:'Le texte décrit toute la journée de Rohan, du matin au soir.',
    explanation:'Le texte décrit la journée complète de Rohan : le bus du matin, le rassemblement, les cours, la récréation et le retour chez lui. C\'est donc <b>la journée typique d\'un écolier mauricien</b> qui est le sujet central.' }),

// ── Passage D : La fête de Divali à la maison ───────────────────────────────
  makeMCQ({ id:'g4fr-comp-052', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:1,
    question:'<div style="background:#f8fafc;border-left:4px solid #a855f7;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#6b21a8">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>La fête de Divali</b><br><br>Ce soir, c\'est Divali ! La maison de Riya sent bon les fleurs et les bougies.<br><br>Sa maman prépare des gâteaux dans la cuisine : des gâteaux piments, des napolitaines et du gâteau au miel. Riya aide à disposer les douceurs (les napolitaines et le gâteau au miel) sur un grand plateau décoré de pétales de rose.<br><br>Son papa allume les diyas sur le balcon. Ces petites lampes en terre cuite brillent dans la nuit. La rue entière est illuminée.<br><br>Les voisins arrivent avec leurs enfants. Ils apportent des boîtes remplies de friandises. Tout le monde rit, mange et chante ensemble dans la cour.<br><br>Riya est très heureuse. Ce qu\'elle préfère à Divali, c\'est voir toutes les lumières briller et partager les gâteaux avec ses amis et ses voisins.</div><hr style="margin:8px 0">Quelle fête est célébrée dans le texte ?',
    options:['Noël','Divali','Eid','La fête nationale'],
    answer:'Divali',
    hint:'Regardez la première phrase du texte.',
    explanation:'"Ce soir, c\'est <b>Divali</b> !" — La première phrase annonce directement la fête. Divali est la fête hindoue des lumières, célébrée à Maurice par de nombreuses familles.' }),

  makeMCQ({ id:'g4fr-comp-053', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:1,
    question:'<div style="background:#f8fafc;border-left:4px solid #a855f7;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#6b21a8">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>La fête de Divali</b><br><br>Ce soir, c\'est Divali ! La maison de Riya sent bon les fleurs et les bougies.<br><br>Sa maman prépare des gâteaux dans la cuisine : des gâteaux piments, des napolitaines et du gâteau au miel. Riya aide à disposer les douceurs (les napolitaines et le gâteau au miel) sur un grand plateau décoré de pétales de rose.<br><br>Son papa allume les diyas sur le balcon. Ces petites lampes en terre cuite brillent dans la nuit. La rue entière est illuminée.<br><br>Les voisins arrivent avec leurs enfants. Ils apportent des boîtes remplies de friandises. Tout le monde rit, mange et chante ensemble dans la cour.<br><br>Riya est très heureuse. Ce qu\'elle préfère à Divali, c\'est voir toutes les lumières briller et partager les gâteaux avec ses amis et ses voisins.</div><hr style="margin:8px 0">Qui allume les diyas ?',
    options:['La maman de Riya','Les voisins','Le papa de Riya','Riya elle-même'],
    answer:'Le papa de Riya',
    hint:'Lisez le troisième paragraphe.',
    explanation:'"<b>Son papa</b> allume les diyas sur le balcon." — C\'est le père de Riya qui s\'occupe d\'allumer les petites lampes.' }),

  makeMCQ({ id:'g4fr-comp-054', chapterId:'g4fr-lecture', subsection:'reperage', difficulty:1,
    question:'<div style="background:#f8fafc;border-left:4px solid #a855f7;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#6b21a8">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>La fête de Divali</b><br><br>Ce soir, c\'est Divali ! La maison de Riya sent bon les fleurs et les bougies.<br><br>Sa maman prépare des gâteaux dans la cuisine : des gâteaux piments, des napolitaines et du gâteau au miel. Riya aide à disposer les douceurs (les napolitaines et le gâteau au miel) sur un grand plateau décoré de pétales de rose.<br><br>Son papa allume les diyas sur le balcon. Ces petites lampes en terre cuite brillent dans la nuit. La rue entière est illuminée.<br><br>Les voisins arrivent avec leurs enfants. Ils apportent des boîtes remplies de friandises. Tout le monde rit, mange et chante ensemble dans la cour.<br><br>Riya est très heureuse. Ce qu\'elle préfère à Divali, c\'est voir toutes les lumières briller et partager les gâteaux avec ses amis et ses voisins.</div><hr style="margin:8px 0">Que sont les diyas, selon le texte ?',
    options:['Des fleurs décoratives','De grandes bougies parfumées','De petites lampes en terre cuite','Des boîtes de friandises'],
    answer:'De petites lampes en terre cuite',
    hint:'Le troisième paragraphe explique ce que sont les diyas.',
    explanation:'"Ces <b>petites lampes en terre cuite</b> brillent dans la nuit." — Le texte définit lui-même les diyas juste après les avoir mentionnés.' }),

  makeMCQ({ id:'g4fr-comp-055', chapterId:'g4fr-lecture', subsection:'inference', difficulty:2,
    question:'<div style="background:#f8fafc;border-left:4px solid #a855f7;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#6b21a8">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>La fête de Divali</b><br><br>Ce soir, c\'est Divali ! La maison de Riya sent bon les fleurs et les bougies.<br><br>Sa maman prépare des gâteaux dans la cuisine : des gâteaux piments, des napolitaines et du gâteau au miel. Riya aide à disposer les douceurs (les napolitaines et le gâteau au miel) sur un grand plateau décoré de pétales de rose.<br><br>Son papa allume les diyas sur le balcon. Ces petites lampes en terre cuite brillent dans la nuit. La rue entière est illuminée.<br><br>Les voisins arrivent avec leurs enfants. Ils apportent des boîtes remplies de friandises. Tout le monde rit, mange et chante ensemble dans la cour.<br><br>Riya est très heureuse. Ce qu\'elle préfère à Divali, c\'est voir toutes les lumières briller et partager les gâteaux avec ses amis et ses voisins.</div><hr style="margin:8px 0">Pourquoi la maison de Riya sent-elle bon ?',
    options:['Parce que la maman fait cuire de la viande','À cause des fleurs et des bougies','Parce que les voisins apportent du parfum','Parce que les diyas brûlent'],
    answer:'À cause des fleurs et des bougies',
    hint:'La première phrase du texte donne la réponse.',
    explanation:'"La maison de Riya sent bon <b>les fleurs et les bougies</b>." — Les deux sources du bon parfum sont mentionnées dès la première phrase.' }),

  makeMCQ({ id:'g4fr-comp-056', chapterId:'g4fr-lecture', subsection:'vocabulaire', difficulty:2,
    question:'<div style="background:#f8fafc;border-left:4px solid #a855f7;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#6b21a8">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>La fête de Divali</b><br><br>Ce soir, c\'est Divali ! La maison de Riya sent bon les fleurs et les bougies.<br><br>Sa maman prépare des gâteaux dans la cuisine : des gâteaux piments, des napolitaines et du gâteau au miel. Riya aide à disposer les douceurs (les napolitaines et le gâteau au miel) sur un grand plateau décoré de pétales de rose.<br><br>Son papa allume les diyas sur le balcon. Ces petites lampes en terre cuite brillent dans la nuit. La rue entière est illuminée.<br><br>Les voisins arrivent avec leurs enfants. Ils apportent des boîtes remplies de friandises. Tout le monde rit, mange et chante ensemble dans la cour.<br><br>Riya est très heureuse. Ce qu\'elle préfère à Divali, c\'est voir toutes les lumières briller et partager les gâteaux avec ses amis et ses voisins.</div><hr style="margin:8px 0">Dans le texte, que veut dire le mot "douceurs" ?',
    options:['Des mots gentils','Des friandises sucrées','Des parfums de fleurs','Des décorations colorées'],
    answer:'Des friandises sucrées',
    hint:'Le contexte montre que les douceurs sont sur un plateau dans la cuisine, à côté des gâteaux.',
    explanation:'"Riya aide à disposer les <b>douceurs</b> (les napolitaines et le gâteau au miel) sur un grand plateau." — Ici, "douceurs" désigne des <b>friandises sucrées</b> (gâteaux sucrés, bonbons). Le mot vient de "doux" et désigne tout ce qui est sucré et bon à manger lors d\'une fête.' }),

  makeMCQ({ id:'g4fr-comp-057', chapterId:'g4fr-lecture', subsection:'inference', difficulty:2,
    question:'<div style="background:#f8fafc;border-left:4px solid #a855f7;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#6b21a8">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>La fête de Divali</b><br><br>Ce soir, c\'est Divali ! La maison de Riya sent bon les fleurs et les bougies.<br><br>Sa maman prépare des gâteaux dans la cuisine : des gâteaux piments, des napolitaines et du gâteau au miel. Riya aide à disposer les douceurs (les napolitaines et le gâteau au miel) sur un grand plateau décoré de pétales de rose.<br><br>Son papa allume les diyas sur le balcon. Ces petites lampes en terre cuite brillent dans la nuit. La rue entière est illuminée.<br><br>Les voisins arrivent avec leurs enfants. Ils apportent des boîtes remplies de friandises. Tout le monde rit, mange et chante ensemble dans la cour.<br><br>Riya est très heureuse. Ce qu\'elle préfère à Divali, c\'est voir toutes les lumières briller et partager les gâteaux avec ses amis et ses voisins.</div><hr style="margin:8px 0">Comment sait-on que toute la rue participe à la fête ?',
    options:[
      'Parce que les voisins arrivent chez Riya',
      'Parce que la rue entière est illuminée',
      'Parce que tout le monde chante dans la cour',
      'Parce que la maman a préparé beaucoup de gâteaux'
    ],
    answer:'Parce que la rue entière est illuminée',
    hint:'Cherchez la phrase qui décrit l\'aspect de la rue pendant la fête.',
    explanation:'"<b>La rue entière est illuminée</b>." — Cette phrase montre que toutes les maisons de la rue ont allumé leurs diyas. L\'adjectif "entière" est important : ce n\'est pas seulement la maison de Riya, c\'est tout le quartier.' }),

  makeTF({ id:'g4fr-comp-058', chapterId:'g4fr-lecture', subsection:'vrai_faux', difficulty:2,
    question:'<div style="background:#f8fafc;border-left:4px solid #a855f7;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#6b21a8">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>La fête de Divali</b><br><br>Ce soir, c\'est Divali ! La maison de Riya sent bon les fleurs et les bougies.<br><br>Sa maman prépare des gâteaux dans la cuisine : des gâteaux piments, des napolitaines et du gâteau au miel. Riya aide à disposer les douceurs (les napolitaines et le gâteau au miel) sur un grand plateau décoré de pétales de rose.<br><br>Son papa allume les diyas sur le balcon. Ces petites lampes en terre cuite brillent dans la nuit. La rue entière est illuminée.<br><br>Les voisins arrivent avec leurs enfants. Ils apportent des boîtes remplies de friandises. Tout le monde rit, mange et chante ensemble dans la cour.<br><br>Riya est très heureuse. Ce qu\'elle préfère à Divali, c\'est voir toutes les lumières briller et partager les gâteaux avec ses amis et ses voisins.</div><hr style="margin:8px 0">Vrai ou Faux : Riya prépare les gâteaux toute seule.',
    answer:false,
    hint:'Qui prépare les gâteaux selon le texte ? Et quel est le rôle de Riya ?',
    explanation:'<b>Faux.</b> "<b>Sa maman</b> prépare des gâteaux dans la cuisine. Riya <b>aide</b> à disposer les douceurs sur le plateau." — La maman prépare ; Riya aide seulement. Elle ne fait pas tout toute seule.' }),

  makeMCQ({ id:'g4fr-comp-059', chapterId:'g4fr-lecture', subsection:'figures_style', difficulty:3,
    question:'<div style="background:#f8fafc;border-left:4px solid #a855f7;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#6b21a8">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>La fête de Divali</b><br><br>Ce soir, c\'est Divali ! La maison de Riya sent bon les fleurs et les bougies.<br><br>Sa maman prépare des gâteaux dans la cuisine : des gâteaux piments, des napolitaines et du gâteau au miel. Riya aide à disposer les douceurs (les napolitaines et le gâteau au miel) sur un grand plateau décoré de pétales de rose.<br><br>Son papa allume les diyas sur le balcon. Ces petites lampes en terre cuite brillent dans la nuit. La rue entière est illuminée.<br><br>Les voisins arrivent avec leurs enfants. Ils apportent des boîtes remplies de friandises. Tout le monde rit, mange et chante ensemble dans la cour.<br><br>Riya est très heureuse. Ce qu\'elle préfère à Divali, c\'est voir toutes les lumières briller et partager les gâteaux avec ses amis et ses voisins.</div><hr style="margin:8px 0">Dans la liste "rit, mange et chante", combien d\'actions font les voisins ensemble ?',
    options:['Une seule','Deux','Trois','Quatre'],
    answer:'Trois',
    hint:'Comptez les verbes dans la phrase "Tout le monde rit, mange et chante ensemble."',
    explanation:'"Tout le monde <b>rit</b>, <b>mange</b> et <b>chante</b> ensemble dans la cour." — Il y a <b>trois verbes</b>, donc trois actions. Cette liste montre la joyeuse activité de la soirée.' }),

  makeMCQ({ id:'g4fr-comp-060', chapterId:'g4fr-lecture', subsection:'inference', difficulty:3,
    question:'<div style="background:#f8fafc;border-left:4px solid #a855f7;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#6b21a8">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>La fête de Divali</b><br><br>Ce soir, c\'est Divali ! La maison de Riya sent bon les fleurs et les bougies.<br><br>Sa maman prépare des gâteaux dans la cuisine : des gâteaux piments, des napolitaines et du gâteau au miel. Riya aide à disposer les douceurs (les napolitaines et le gâteau au miel) sur un grand plateau décoré de pétales de rose.<br><br>Son papa allume les diyas sur le balcon. Ces petites lampes en terre cuite brillent dans la nuit. La rue entière est illuminée.<br><br>Les voisins arrivent avec leurs enfants. Ils apportent des boîtes remplies de friandises. Tout le monde rit, mange et chante ensemble dans la cour.<br><br>Riya est très heureuse. Ce qu\'elle préfère à Divali, c\'est voir toutes les lumières briller et partager les gâteaux avec ses amis et ses voisins.</div><hr style="margin:8px 0">Que nous apprend ce texte sur la façon dont les Mauriciens fêtent Divali ?',
    options:[
      'Divali est une fête célébrée uniquement à l\'intérieur de la maison',
      'Divali est une fête de lumières et de partage entre familles et voisins',
      'Divali est surtout une fête pour les enfants qui reçoivent des cadeaux',
      'Divali est une fête où l\'on mange uniquement des gâteaux salés'
    ],
    answer:'Divali est une fête de lumières et de partage entre familles et voisins',
    hint:'Pensez à tout ce qui se passe : les diyas, les gâteaux partagés, les voisins…',
    explanation:'Le texte montre deux éléments clés : les <b>lumières</b> (les diyas qui illuminent la rue) et le <b>partage</b> (les voisins qui apportent des friandises, tout le monde qui mange ensemble). Ce n\'est pas une fête privée — c\'est toute la communauté qui célèbre ensemble.' }),

  makeMCQ({ id:'g4fr-comp-061', chapterId:'g4fr-lecture', subsection:'idee_principale', difficulty:4,
    question:'<div style="background:#f8fafc;border-left:4px solid #a855f7;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#6b21a8">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>La fête de Divali</b><br><br>Ce soir, c\'est Divali ! La maison de Riya sent bon les fleurs et les bougies.<br><br>Sa maman prépare des gâteaux dans la cuisine : des gâteaux piments, des napolitaines et du gâteau au miel. Riya aide à disposer les douceurs (les napolitaines et le gâteau au miel) sur un grand plateau décoré de pétales de rose.<br><br>Son papa allume les diyas sur le balcon. Ces petites lampes en terre cuite brillent dans la nuit. La rue entière est illuminée.<br><br>Les voisins arrivent avec leurs enfants. Ils apportent des boîtes remplies de friandises. Tout le monde rit, mange et chante ensemble dans la cour.<br><br>Riya est très heureuse. Ce qu\'elle préfère à Divali, c\'est voir toutes les lumières briller et partager les gâteaux avec ses amis et ses voisins.</div><hr style="margin:8px 0">Quel est le message principal de ce texte ?',
    options:[
      'Divali est une fête difficile à préparer car il y a beaucoup de travail',
      'Divali est une fête qui unit la famille et les voisins dans la joie, les lumières et le partage',
      'La maman de Riya est une excellente cuisinière qui prépare beaucoup de gâteaux',
      'Les diyas sont des objets très importants qu\'il faut acheter pour Divali'
    ],
    answer:'Divali est une fête qui unit la famille et les voisins dans la joie, les lumières et le partage',
    hint:'Le texte décrit plusieurs éléments. Lequel les regroupe tous ?',
    explanation:'Trois thèmes traversent tout le texte : <b>les lumières</b> (diyas, rue illuminée), <b>la nourriture partagée</b> (gâteaux, friandises) et <b>la communauté</b> (voisins, amis, tout le monde ensemble). Le message est donc que Divali <b>unit les gens</b> dans la joie et le partage.' })

);
