'use strict';
// PSAC Grade 6 French 2024 — past-paper questions adapted to MCQ format.
// Source: MES Primary School Achievement Certificate Assessment 2024, French P130.
// Q2 (grammar fill-in) → STATIC_QUESTIONS; Q4A short-answer → PSAC_PDF_QUESTIONS.

STATIC_QUESTIONS.push(

  // ── Q2 : Grammar fill-in (10 marks) ──────────────────────────────────────

  makeMCQ({ id:'g6fr-pp24-001', chapterId:'g6fr-lecture', difficulty:1,
    question:'Maman ouvre la porte ……………… jardin.',
    options:['de','des','du','de la'], answer:'du',
    hint:'Cherche le genre de « jardin » : est-il masculin ou féminin ?',
    explanation:'« Le jardin » est masculin singulier. De + le = du. Maman ouvre la porte <em>du</em> jardin.' }),

  makeMCQ({ id:'g6fr-pp24-002', chapterId:'g6fr-lecture', difficulty:1,
    question:'Ne prends pas ……………… serviette. Elle est sale.',
    options:['ces','ce','cet','cette'], answer:'cette',
    hint:'Détermine le genre et le nombre du nom « serviette » pour choisir le bon adjectif démonstratif.',
    explanation:'L\'adjectif démonstratif devant un nom féminin singulier est <em>cette</em>.' }),

  makeMCQ({ id:'g6fr-pp24-003', chapterId:'g6fr-lecture', difficulty:1,
    question:'Ne marche pas dans l\'eau avec tes chaussures neuves. ……………… vont s\'abîmer.',
    options:['Elle','Elles','Il','Ils'], answer:'Elles',
    hint:'Cherche quel nom le pronom sujet doit remplacer, puis détermine son genre et son nombre.',
    explanation:'« Les chaussures » est féminin pluriel → pronom sujet <em>Elles</em>.' }),

  makeMCQ({ id:'g6fr-pp24-004', chapterId:'g6fr-lecture', difficulty:1,
    question:'Pour les fêtes de fin d\'année, ……………… les garçons auront un cadeau.',
    options:['tout','toute','tous','toutes'], answer:'tous',
    hint:'L\'adjectif indéfini doit s\'accorder avec le nom qui suit — cherche son genre et son nombre.',
    explanation:'Devant un nom masculin pluriel on utilise <em>tous</em>. Toutes les filles / tous les garçons.' }),

  makeMCQ({ id:'g6fr-pp24-005', chapterId:'g6fr-lecture', difficulty:1,
    question:'L\'oiseau est entré dans la maison ……………… la fenêtre.',
    options:['par','en','sur','à'], answer:'par',
    hint:'Quelle préposition indique le passage à travers une ouverture ?',
    explanation:'La préposition <em>par</em> indique le passage : entrer par la fenêtre.' }),

  makeMCQ({ id:'g6fr-pp24-006', chapterId:'g6fr-lecture', difficulty:2,
    question:'……………… -vous ! On est en retard pour l\'ouverture de l\'exposition.',
    options:['Dépêche','Dépêchons','Dépêchez','Dépêches'], answer:'Dépêchez',
    hint:'Identifie la personne à qui on s\'adresse et cherche la forme de l\'impératif correspondante.',
    explanation:'Impératif présent de <em>se dépêcher</em> à la 2e personne du pluriel : <em>Dépêchez</em>-vous !' }),

  makeMCQ({ id:'g6fr-pp24-007', chapterId:'g6fr-lecture', difficulty:1,
    question:'Ce livre d\'histoire contient une ……………… image du port.',
    options:['belle','belles','beau','beaux'], answer:'belle',
    hint:'L\'adjectif doit s\'accorder avec le nom qu\'il qualifie — cherche le genre et le nombre de « image ».',
    explanation:'<em>Belle</em> s\'accorde avec le nom féminin singulier <em>image</em>. (Beau/bel → masculin.)' }),

  makeMCQ({ id:'g6fr-pp24-008', chapterId:'g6fr-lecture', difficulty:1,
    question:'Mon père m\'aide à ……………… les tables de multiplication.',
    options:['apprend','apprendre','appris','apprends'], answer:'apprendre',
    hint:'Quelle forme verbale suit toujours la préposition « à » ?',
    explanation:'La préposition <em>à</em> est suivie de l\'infinitif : aider à <em>apprendre</em>.' }),

  makeMCQ({ id:'g6fr-pp24-009', chapterId:'g6fr-lecture', difficulty:2,
    question:'Mon frère et moi ……………… au cinéma hier.',
    options:['sont partis','êtes partis','sommes partis','est parti'], answer:'sommes partis',
    hint:'Identifie à quelle personne correspond « mon frère et moi » et quel auxiliaire prend « partir ».',
    explanation:'<em>Mon frère et moi</em> équivaut à <em>nous</em>. Partir → nous <em>sommes partis</em> (auxiliaire être).' }),

  makeMCQ({ id:'g6fr-pp24-010', chapterId:'g6fr-lecture', difficulty:2,
    question:'Reza aura besoin de ses cahiers demain. Il ……………… met dans son cartable.',
    options:['leur','le','lui','les'], answer:'les',
    hint:'Identifie le complément remplacé par le pronom : est-il singulier ou pluriel ?',
    explanation:'<em>Ses cahiers</em> est pluriel → pronom COD <em>les</em>. Il <em>les</em> met dans son cartable.' }),

  // ── Q3B : Vocabulaire MCQ (5 marks) ──────────────────────────────────────

  makeMCQ({ id:'g6fr-pp24-011', chapterId:'g6fr-lecture', difficulty:2,
    question:'Cherche dans ……………… quel jour sera le premier décembre.',
    options:['le dictionnaire','l\'album','la calculatrice','le calendrier'], answer:'le calendrier',
    hint:'On cherche une date dans un outil qui montre les jours et les mois.',
    explanation:'Un <em>calendrier</em> donne les jours du mois. Le dictionnaire explique les mots.' }),

  makeMCQ({ id:'g6fr-pp24-012', chapterId:'g6fr-lecture', difficulty:2,
    question:'Toutes sortes de plantes poussent ici. La terre est très ……………….',
    options:['fertile','rocheuse','sèche','aride'], answer:'fertile',
    hint:'Si beaucoup de plantes poussent, la terre est ……… (productrice).',
    explanation:'Une terre <em>fertile</em> est riche et produit bien. Sèche/aride → peu de plantes.' }),

  makeMCQ({ id:'g6fr-pp24-013', chapterId:'g6fr-lecture', difficulty:2,
    question:'Certains oiseaux sont en danger de disparition. Il faut les ……………….',
    options:['chasser','protéger','tuer','effrayer'], answer:'protéger',
    hint:'Pour éviter la disparition d\'une espèce, on doit la ………….',
    explanation:'On <em>protège</em> les espèces menacées pour qu\'elles ne disparaissent pas.' }),

  makeMCQ({ id:'g6fr-pp24-014', chapterId:'g6fr-lecture', difficulty:2,
    question:'Il y a une fuite d\'eau à la maison. Il faut trouver un ……………… pour la réparation.',
    options:['boutiquier','plombier','pharmacien','dentiste'], answer:'plombier',
    hint:'Quel professionnel répare les tuyaux et les conduites d\'eau ?',
    explanation:'Un <em>plombier</em> répare les fuites d\'eau et les canalisations.' }),

  makeMCQ({ id:'g6fr-pp24-015', chapterId:'g6fr-lecture', difficulty:2,
    question:'On ……………… un vieux bâtiment pour construire un autre de vingt étages.',
    options:['a repeint','a restauré','a démoli','a nettoyé'], answer:'a démoli',
    hint:'Pour construire un nouveau bâtiment à cet endroit, l\'ancien doit ………….',
    explanation:'<em>Démolir</em> = détruire un bâtiment. Restaurer = rénover sans détruire.' }),

  // ── Q4B : Compréhension MCQ — «&nbsp;Le moulin magique&nbsp;» (contes chinois) ──

  makeMCQ({ id:'g6fr-pp24-016', chapterId:'g6fr-textes', difficulty:2,
    question:'<em>Il y a fort longtemps deux frères vivaient en Chine : Wang, le grand frère, s\'empara de tout l\'héritage, et Chong, le petit frère, devint pauvre.</em><br><br>Wang et Chong sont ……………….',
    options:['amis','frères','père et fils','mari et femme'], answer:'frères',
    hint:'Relisez la première ligne du texte.',
    explanation:'Wang est le <em>grand frère</em> et Chong est le <em>petit frère</em> : ils sont frères.' }),

  makeMCQ({ id:'g6fr-pp24-017', chapterId:'g6fr-textes', difficulty:2,
    question:'<em>À la mort de leur père, Wang s\'empara de tout l\'héritage : la belle maison, le buffle et les plantations.</em><br><br>Quand le père meurt, Chong ……………….',
    options:['ne reçoit rien en héritage','reçoit tout l\'héritage','a eu le buffle et les plantations','a eu la belle maison'], answer:'ne reçoit rien en héritage',
    hint:'Wang s\'est emparé de TOUT l\'héritage.',
    explanation:'Wang prend tout → Chong <em>ne reçoit rien</em>. Il n\'a ni maison, ni buffle, ni plantation.' }),

  makeMCQ({ id:'g6fr-pp24-018', chapterId:'g6fr-textes', difficulty:2,
    question:'<em>Wang était très égoïste et refusa d\'aider Chong qui n\'avait rien à manger.</em><br><br>D\'après l\'histoire, Wang est ……………….',
    options:['naïf','honnête','généreux','égoïste'], answer:'égoïste',
    hint:'Le texte le dit directement.',
    explanation:'Le texte précise que Wang <em>était très égoïste</em> et refusait d\'aider son frère.' }),

  makeMCQ({ id:'g6fr-pp24-019', chapterId:'g6fr-textes', difficulty:2,
    question:'<em>Chong posa le petit moulin par terre ; en colère, il lui donna un coup de pied. Le moulin se mit à produire du sel en grande quantité. C\'était un moulin magique.</em><br><br>Chong obtient ce qu\'il veut grâce ……………….',
    options:['au travail','à sa femme','au moulin','à son frère'], answer:'au moulin',
    hint:'Qu\'est-ce qui produit le sel que Chong échange contre tout ce qu\'il veut ?',
    explanation:'C\'est <em>le moulin magique</em> qui produit le sel, permettant à Chong d\'avoir tout ce qu\'il désire.' }),

  makeMCQ({ id:'g6fr-pp24-020', chapterId:'g6fr-textes', difficulty:2,
    question:'<em>Wang jeta le moulin à la mer. Le moulin disparut dans l\'océan mais continuait à produire du sel. Et c\'est pour cette raison que l\'eau de la mer est salée.</em><br><br>Cette histoire raconte comment ……………….',
    options:['l\'eau de mer est devenue salée','Chong et Wang vécurent heureux','les graines sont écrasées dans le moulin','on fabrique des moulins'], answer:'l\'eau de mer est devenue salée',
    hint:'Lisez la dernière phrase du texte.',
    explanation:'La dernière phrase explique : « Et c\'est pour cette raison que <em>l\'eau de la mer est salée</em>. »' })

);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g6fr-pp24-pdf-001', chapterId:'g6fr-textes', marks:10, year:2024, grade:6, subject:'French',
    question:'Q4A — Lis le texte sur Le Soleil (p.6) et complète la fiche : nom de l\'étoile, nombre d\'années depuis qu\'elle brille, température à sa surface, nom d\'une planète, deux choses qu\'elle nous donne, danger si on la fixe à l\'œil nu, son diamètre, ce que serait la Terre sans elle, exemple d\'espèce vivante dépendante.', type:'short' },
  { id:'g6fr-pp24-pdf-002', chapterId:'g6fr-textes', marks:15, year:2024, grade:6, subject:'French',
    question:'Q4B — Réponds aux questions sur le conte « Le moulin magique » (Wang et Chong) : Q6–Q10 demandent des réponses courtes sur les actions de Chong et Wang ; Q11 remet 3 événements dans l\'ordre.', type:'short' }
);
