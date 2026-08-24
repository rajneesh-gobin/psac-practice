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

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4fr-comp-011', chapterId:'g4fr-lecture', difficulty:1,
    question:_PASSAGE_G4FR + '<hr>Quelle est la profession de la MÈRE de Priya ?',
    options:['Médecin','Infirmière','Professeur','Directrice'],
    answer:'Professeur',
    hint:'"Ma mère s\'appelle Anita. Elle est ___."',
    explanation:'"Elle est <b>professeur</b>." — La mère de Priya (Anita) est professeur (teacher). Le père (Ravi) est médecin. En français, on dit "elle est professeur" sans article défini.' }),

  makeMCQ({ id:'g4fr-comp-012', chapterId:'g4fr-lecture', difficulty:1,
    question:_PASSAGE_G4FR + '<hr>À quelle heure Priya se lève-t-elle le matin ?',
    options:['À cinq heures','À six heures','À sept heures','À huit heures'],
    answer:'À six heures',
    hint:'"Le matin, je me lève à ___ heures."',
    explanation:'"Le matin, je me lève à <b>six heures</b>." — Priya se lève à 6h. "Six" = 6. "Je me lève" = I get up (verbe réfléchi se lever).' }),

  makeMCQ({ id:'g4fr-comp-013', chapterId:'g4fr-lecture', difficulty:1,
    question:_PASSAGE_G4FR + '<hr>Que BOIT Priya le matin ?',
    options:['Du jus d\'orange','De l\'eau','Du thé','Du lait'],
    answer:'Du lait',
    hint:'"Je mange du pain et je bois ___."',
    explanation:'"Je bois <b>du lait</b>." — Priya boit du lait (milk) le matin. "Boire" = to drink. "Du lait" = some milk (article partitif du = de + le). Ne pas confondre manger (to eat) et boire (to drink).' }),

  makeMCQ({ id:'g4fr-comp-014', chapterId:'g4fr-lecture', difficulty:2,
    question:_PASSAGE_G4FR + '<hr>Avec qui Priya va-t-elle à l\'école ?',
    options:['Avec son père','Seule','Avec sa mère','Avec sa sœur'],
    answer:'Avec sa sœur',
    hint:'"je vais à l\'école à pied avec ___."',
    explanation:'"Je vais à l\'école à pied avec <b>ma sœur</b>." — Priya va à l\'école avec sa sœur Mia. "Avec" = with. "Sa sœur" = her sister.' }),

  makeMCQ({ id:'g4fr-comp-015', chapterId:'g4fr-lecture', difficulty:2,
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

  makeMCQ({ id:'g4fr-comp-016', chapterId:'g4fr-lecture', difficulty:3,
    question:_PASSAGE_G4FR + '<hr>Pourquoi Priya va-t-elle à l\'école avec SA SŒUR et non toute seule ?',
    options:[
      'Parce que sa sœur est plus âgée et la guide.',
      'Le texte ne le dit pas explicitement — on peut inférer qu\'elles vont à la même école ou que c\'est pour la sécurité.',
      'Parce que Priya ne connaît pas le chemin.',
      'Parce que sa mère les oblige à y aller ensemble.'
    ],
    answer:'Le texte ne le dit pas explicitement — on peut inférer qu\'elles vont à la même école ou que c\'est pour la sécurité.',
    hint:'Le texte dit-il POURQUOI ? Ou doit-on faire une inférence ?',
    explanation:'Le texte ne donne pas de raison directe — il dit seulement "je vais à l\'école à pied avec ma sœur". Pour répondre "pourquoi", on doit faire une <b>inférence</b> (lire entre les lignes). Les deux raisons les plus probables : même école, ou sécurité.' }),

  makeTF({ id:'g4fr-comp-017', chapterId:'g4fr-lecture', difficulty:3,
    question:_PASSAGE_G4FR + '<hr>"J\'aime beaucoup ma famille" est une OPINION et non un fait.',
    answer:true,
    hint:'Un fait peut être vérifié. Une opinion exprime un sentiment ou un jugement personnel.',
    explanation:'<b>Vrai.</b> "J\'aime beaucoup ma famille" exprime le <b>sentiment personnel</b> de Priya — c\'est une opinion. Les faits (nombre de personnes, professions, horaire) peuvent être vérifiés. Les sentiments personnels sont des opinions, pas des faits.' }),

  makeMCQ({ id:'g4fr-comp-018', chapterId:'g4fr-lecture', difficulty:3,
    question:_PASSAGE_G4FR + '<hr>Que signifie l\'expression "je bois du lait" en anglais ?',
    options:['I eat some milk','I want some milk','I drink some milk','I like milk'],
    answer:'I drink some milk',
    hint:'"Boire" = to drink. "Du lait" = some milk.',
    explanation:'"Je bois du lait" = <b>I drink some milk</b>. "Boire" = to drink. "Du lait" = du (article partitif = some) + lait (milk). L\'article partitif "du" (de + le) s\'utilise pour des quantités indéfinies : du lait, du pain, du jus.' }),

  makeMCQ({ id:'g4fr-comp-019', chapterId:'g4fr-lecture', difficulty:4,
    question:_PASSAGE_G4FR + '<hr>Ce texte est écrit à la PREMIÈRE PERSONNE ("Je m\'appelle Priya, J\'ai..."). Quel est l\'effet de ce choix sur le lecteur ?',
    options:[
      'Il rend le texte difficile à lire.',
      'Il crée une distance entre le lecteur et Priya.',
      'Il donne au lecteur l\'impression de connaître Priya directement — le texte est personnel et intime.',
      'Il indique que le texte est une fiction inventée par quelqu\'un d\'autre.'
    ],
    answer:'Il donne au lecteur l\'impression de connaître Priya directement — le texte est personnel et intime.',
    hint:'Quand un auteur dit "Je...", quel effet cela crée-t-il sur le lecteur ?',
    explanation:'La <b>première personne</b> ("je") crée une narration personnelle et directe — le lecteur a l\'impression que Priya lui parle directement. Cela rend le texte plus <b>intime et personnel</b>. À comparer avec la troisième personne ("Elle s\'appelle Priya") qui crée plus de distance. C\'est un choix d\'écriture délibéré.' }),

  makeMCQ({ id:'g4fr-comp-020', chapterId:'g4fr-lecture', difficulty:1,
    question:'Quelle connecteur logique signifie "first of all" ?',
    options:['ensuite','enfin','d\'abord','donc'],
    answer:"d'abord",
    hint:'Pour commencer une liste d\'actions ou d\'étapes.',
    explanation:'"First of all" = <b>d\'abord</b>. L\'ordre des connecteurs de séquence : <b>d\'abord</b> (first), <b>ensuite/puis</b> (then/next), <b>enfin</b> (finally). Ces mots structurent un texte narratif ou des instructions.' }),

  makeMCQ({ id:'g4fr-comp-021', chapterId:'g4fr-lecture', difficulty:1,
    question:'Comment s\'appelle le type de texte qui raconte une histoire ?',
    options:['une recette','une lettre','une affiche','une histoire (texte narratif)'],
    answer:'une histoire (texte narratif)',
    hint:'Ce type de texte a un début, un milieu et une fin.',
    explanation:'Un <b>texte narratif</b> (= une histoire) raconte des événements. Il a : un <b>début</b> (introduction des personnages), un <b>milieu</b> (événements), une <b>fin</b> (résolution). Les autres types : <b>recette</b> (instructions), <b>lettre</b> (communication), <b>affiche</b> (annonce visuelle).' }),

  makeTF({ id:'g4fr-comp-022', chapterId:'g4fr-lecture', difficulty:1,
    question:'"Ensuite" et "puis" ont le même sens (= "then / next").',
    answer:true,
    hint:'Les deux expriment ce qui vient après.',
    explanation:'<b>Vrai.</b> <b>ensuite</b> et <b>puis</b> sont synonymes et signifient tous les deux "then / next". On peut les utiliser de manière interchangeable : "D\'abord je mange, <b>ensuite</b> je dors." = "D\'abord je mange, <b>puis</b> je dors."' }),

  makeMCQ({ id:'g4fr-comp-023', chapterId:'g4fr-lecture', difficulty:2,
    question:'Quel est le synonyme de "content" (happy) ?',
    options:['triste','fatigué','joyeux','fâché'],
    answer:'joyeux',
    hint:'"Joyeux" et "content" expriment tous les deux la joie.',
    explanation:'"Content" = <b>joyeux</b> (synonyme). Les deux mots signifient "happy". D\'autres synonymes : heureux, ravi, enchanté. Antonymes (opposés) : triste (sad), malheureux (unhappy), fâché (angry), déçu (disappointed).' }),

  makeMCQ({ id:'g4fr-comp-024', chapterId:'g4fr-lecture', difficulty:2,
    question:'Quel est l\'antonyme (opposé) de "petit" ?',
    options:['petit','joli','grand','mignon'],
    answer:'grand',
    hint:'L\'opposé de "small" est "big".',
    explanation:'"Petit" (small) → antonyme = <b>grand</b> (big). Les antonymes sont des mots de sens opposé. Autres paires : chaud/froid, rapide/lent, fort/faible, beau/laid, riche/pauvre, jeune/vieux.' }),

  makeMCQ({ id:'g4fr-comp-025', chapterId:'g4fr-lecture', difficulty:2,
    question:'Lis : "Priya a d\'abord fait ses devoirs, puis elle a regardé la télévision, enfin elle a dormi." Quelle action est arrivée en DERNIER ?',
    options:['faire les devoirs','regarder la télévision','dormir','manger'],
    answer:'dormir',
    hint:'"Enfin" indique la dernière action.',
    explanation:'"<b>Enfin</b> elle a dormi" — <b>enfin</b> = finally = la dernière action. Ordre : d\'abord (1er) → puis (2ème) → enfin (3ème). Donc : 1. devoirs, 2. télévision, 3. <b>dormir</b>. Les connecteurs de séquence révèlent l\'ordre chronologique.' }),

  makeMCQ({ id:'g4fr-comp-026', chapterId:'g4fr-lecture', difficulty:2,
    question:'Quel connecteur signifie "because" ?',
    options:['d\'abord','enfin','donc','parce que'],
    answer:'parce que',
    hint:'"Parce que" répond à la question "pourquoi ?".',
    explanation:'"Because" = <b>parce que</b>. "Je reste à la maison <b>parce que</b> je suis malade." (I stay home because I\'m sick). À ne pas confondre avec <b>donc</b> (so/therefore) qui exprime une conséquence, pas une raison.' }),

  makeMCQ({ id:'g4fr-comp-027', chapterId:'g4fr-lecture', difficulty:2,
    question:'Une "recette" est quel type de texte ?',
    options:['un texte narratif','un texte instructif','une lettre','une affiche'],
    answer:'un texte instructif',
    hint:'Une recette donne des instructions étapes par étapes.',
    explanation:'Une <b>recette</b> est un <b>texte instructif</b> — elle donne des instructions à suivre (liste d\'ingrédients + étapes de préparation). Elle utilise souvent l\'impératif : "Mélangez la farine, ajoutez les œufs..." À distinguer : narratif (histoire), descriptif (description), argumentatif (opinion).' }),

  makeMCQ({ id:'g4fr-comp-028', chapterId:'g4fr-lecture', difficulty:3,
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

  makeMCQ({ id:'g4fr-comp-029', chapterId:'g4fr-lecture', difficulty:3,
    question:'Dans le texte de Priya (Ma Famille), quel mot pourrait remplacer "habite" dans "J\'habite à Curepipe" ?',
    options:['joue','mange','vis','court'],
    answer:'vis',
    hint:'"Habiter" et "vivre" peuvent tous les deux signifier "to live (somewhere)".',
    explanation:'"J\'<b>habite</b> à Curepipe" = "Je <b>vis</b> à Curepipe." — <b>habiter</b> et <b>vivre</b> sont synonymes quand on parle d\'un lieu de résidence. "Vivre" est plus général (to live/to be alive), "habiter" est plus spécifique (to reside). Les deux sont corrects ici.' }),

  makeMCQ({ id:'g4fr-comp-030', chapterId:'g4fr-lecture', difficulty:3,
    question:'Lis : "Il fait beau. Marie décide donc d\'aller au parc." Quel connecteur pourrait remplacer "donc" ici ?',
    options:['parce que','d\'abord','mais','cependant'],
    answer:'parce que',
    hint:'La belle météo est la raison d\'aller au parc.',
    explanation:'On pourrait restructurer : "Marie décide d\'aller au parc <b>parce qu\'</b>il fait beau." — <b>donc</b> (conséquence) et <b>parce que</b> (cause) expriment la même relation logique mais dans des structures différentes : Cause + donc + Résultat ↔ Résultat + parce que + Cause.' }),

  makeMCQ({ id:'g4fr-comp-031', chapterId:'g4fr-lecture', difficulty:3,
    question:'Quel est l\'antonyme de "rapide" ?',
    options:['vite','lent','court','fort'],
    answer:'lent',
    hint:'"Slow" est l\'opposé de "fast".',
    explanation:'"Rapide" (fast/quick) → antonyme = <b>lent</b> (slow). Autres paires d\'antonymes : grand/petit, chaud/froid, fort/faible, riche/pauvre, heureux/triste, beau/laid. Ces paires sont utiles dans les exercices de synonymes/antonymes.' }),

  makeMCQ({ id:'g4fr-comp-032', chapterId:'g4fr-lecture', difficulty:4,
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

  makeMCQ({ id:'g4fr-comp-033', chapterId:'g4fr-lecture', difficulty:4,
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

  makeMCQ({ id:'g4fr-comp-034', chapterId:'g4fr-lecture', difficulty:4,
    question:'Dans la phrase "Je n\'aime pas la pluie parce qu\'elle mouille mes vêtements", quel est le rôle de "parce que" ?',
    options:[
      'Il exprime la conséquence.',
      'Il exprime la raison/cause.',
      'Il exprime l\'opposition.',
      'Il exprime l\'ordre des événements.'
    ],
    answer:'Il exprime la raison/cause.',
    hint:'"Parce que" répond à "Pourquoi n\'aimes-tu pas la pluie ?"',
    explanation:'"<b>Parce que</b>" exprime la <b>raison/cause</b>. "Je n\'aime pas la pluie" (effet) + "parce que elle mouille mes vêtements" (cause = raison). À comparer : <b>donc</b> (so → conséquence), <b>mais</b> (but → opposition), <b>d\'abord/ensuite</b> (ordre chronologique).' }),

  makeMCQ({ id:'g4fr-comp-035', chapterId:'g4fr-lecture', difficulty:4,
    question:'Priya écrit une lettre à sa correspondante française. Elle termine : "J\'espère te revoir bientôt. ___" Quelle formule de politesse est la plus appropriée pour FINIR une lettre amicale ?',
    options:[
      'Bonjour,',
      'Grosses bises,',
      'Monsieur / Madame,',
      'Veuillez agréer...'
    ],
    answer:'Grosses bises,',
    hint:'Pour une lettre entre amis/enfants, on utilise une formule affectueuse.',
    explanation:'"<b>Grosses bises</b>" (big kisses) est appropriée pour une lettre <b>amicale/informelle</b> entre enfants. "Bonjour" = salutation initiale. "Monsieur/Madame" = formule formelle (début). "Veuillez agréer..." = formule très formelle (lettre officielle). Une lettre amicale commence par "Chère/Cher..." et finit par "Bisous, Grosses bises, Amicalement..."' })

);
