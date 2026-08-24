'use strict';
// Grade 4 French — Chapitre : La Phrase & Grammaire de base
// IDs format: g4fr-phr-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4fr-phr-001', chapterId:'g4fr-phrase', difficulty:1,
    question:'Comment dit-on "I do not eat" en français ?',
    options:['Je mange pas.','Je pas mange.','Je ne mange pas.','Ne je mange pas.'],
    answer:'Je ne mange pas.',
    hint:'La négation en français : ne ___ pas. Place "ne" avant le verbe et "pas" après.',
    explanation:'"<b>Je ne mange pas.</b>" — La négation en français utilise deux mots : <b>ne</b> (avant le verbe) et <b>pas</b> (après le verbe). Structure : sujet + ne + verbe + pas. Exemples : Je ne parle pas (I do not speak). Il ne joue pas (He does not play).' }),

  makeMCQ({ id:'g4fr-phr-002', chapterId:'g4fr-phrase', difficulty:1,
    question:'Que signifie le mot interrogatif "Où" ?',
    options:['Who','When','Where','How'],
    answer:'Where',
    hint:'"Où" demande la localisation — l\'endroit.',
    explanation:'"<b>Où</b>" = Where. Mots interrogatifs : Qui (Who), Où (Where), Quand (When), Comment (How), Pourquoi (Why), Combien (How many/much), Qu\'est-ce que (What). Exemple : Où habites-tu ? (Where do you live?)' }),

  makeMCQ({ id:'g4fr-phr-003', chapterId:'g4fr-phrase', difficulty:1,
    question:'Que signifie "Comment" ?',
    options:['Why','When','What','How'],
    answer:'How',
    hint:'"Comment allez-vous ?" — "How are you?"',
    explanation:'"<b>Comment</b>" = How. Exemples : Comment t\'appelles-tu ? (What is your name? / How are you called?). Comment vas-tu ? (How are you? — informal). Ne pas confondre avec "Quand" (When) ou "Pourquoi" (Why).' }),

  makeTF({ id:'g4fr-phr-004', chapterId:'g4fr-phrase', difficulty:1,
    question:'"Je ne parle pas" signifie "I do not speak".',
    answer:true,
    hint:'La négation : ne + verbe + pas. Traduction directe.',
    explanation:'<b>Vrai.</b> "Je ne parle pas" = I do not speak. Structure : Je (I) + ne (not — première partie) + parle (speak) + pas (not — deuxième partie). La négation française utilise toujours les deux mots : ne...pas.' }),

  makeMCQ({ id:'g4fr-phr-005', chapterId:'g4fr-phrase', difficulty:2,
    question:'Que signifie "Qui" ?',
    options:['Where','When','Why','Who'],
    answer:'Who',
    hint:'"Qui" demande l\'identité d\'une personne.',
    explanation:'"<b>Qui</b>" = Who. Exemple : Qui est-ce ? (Who is it?). Qui parle ? (Who is speaking?). Ne pas confondre avec "Quoi" (What — chose) ou "Qu\'est-ce que" (What — début de phrase).' }),

  makeMCQ({ id:'g4fr-phr-006', chapterId:'g4fr-phrase', difficulty:2,
    question:'Quel mot interrogatif demande une QUANTITÉ ?',
    options:['Où','Quand','Combien','Pourquoi'],
    answer:'Combien',
    hint:'"Combien" demande un nombre ou une quantité.',
    explanation:'"<b>Combien</b>" = How many / How much. Exemples : Combien de frères as-tu ? (How many brothers do you have?). Combien coûte ce livre ? (How much does this book cost?). Combien de temps ? (How long?).' }),

  makeMCQ({ id:'g4fr-phr-007', chapterId:'g4fr-phrase', difficulty:2,
    question:'Comment transforme-t-on "Tu parles français." en question avec "Est-ce que" ?',
    options:[
      'Est-ce que tu parle français ?',
      'Est-ce que tu parles français ?',
      'Est-ce que parles tu français ?',
      'Tu est-ce que parles français ?'
    ],
    answer:'Est-ce que tu parles français ?',
    hint:'"Est-ce que" + sujet + verbe (forme normale). Ajoutez "Est-ce que" au début de la phrase.',
    explanation:'"<b>Est-ce que tu parles français ?</b>" — Pour former une question avec "Est-ce que", on ajoute simplement "Est-ce que" au début de la phrase affirmative et on met un point d\'interrogation. L\'ordre sujet + verbe ne change pas. C\'est la façon la plus simple de poser une question en français.' }),

  makeMCQ({ id:'g4fr-phr-008', chapterId:'g4fr-phrase', difficulty:2,
    question:'Que signifie "Le chat est sur la table" ?',
    options:['The cat is under the table','The cat is behind the table','The cat is on the table','The cat is in the table'],
    answer:'The cat is on the table',
    hint:'"Sur" est une préposition de lieu.',
    explanation:'"<b>Sur</b>" = on / on top of. Le chat est <b>sur</b> la table = The cat is <b>on</b> the table. Prépositions de lieu : dans (in), <b>sur</b> (on), sous (under), devant (in front of), derrière (behind), entre (between).' }),

  makeMCQ({ id:'g4fr-phr-009', chapterId:'g4fr-phrase', difficulty:3,
    question:'Choisis la phrase négative CORRECTE pour "Ils jouent au football."',
    options:[
      'Ils jouent ne pas au football.',
      'Ils ne pas jouent au football.',
      'Ne ils jouent pas au football.',
      'Ils ne jouent pas au football.'
    ],
    answer:'Ils ne jouent pas au football.',
    hint:'Rappel : sujet + <b>ne</b> + verbe + <b>pas</b>.',
    explanation:'"<b>Ils ne jouent pas au football.</b>" — La négation encadre le verbe conjugué : Ils + <b>ne</b> + jouent + <b>pas</b>. Le reste de la phrase ne change pas. La règle ne/pas s\'applique toujours au verbe conjugué, même si d\'autres mots suivent.' }),

  makeMCQ({ id:'g4fr-phr-010', chapterId:'g4fr-phrase', difficulty:4,
    question:'Luc dit : "___ est ton ami ? — C\'est Ravi." et "___ habites-tu ? — J\'habite à Port Louis." Quels mots interrogatifs complètent les questions ?',
    options:[
      'Où / Qui',
      'Qui / Où',
      'Quand / Combien',
      'Comment / Pourquoi'
    ],
    answer:'Qui / Où',
    hint:'Première question : elle demande l\'identité d\'une personne. Deuxième : elle demande un lieu.',
    explanation:'"<b>Qui</b> est ton ami ?" demande l\'identité → Qui (Who). "<b>Où</b> habites-tu ?" demande le lieu → Où (Where). Associer le bon mot interrogatif à la réponse attendue est une compétence essentielle : Qui → personne, Où → lieu, Quand → temps, Comment → manière, Pourquoi → raison.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4fr-phr-011', chapterId:'g4fr-phrase', difficulty:1,
    question:'Que signifie la préposition "dans" ?',
    options:['on','under','in / inside','in front of'],
    answer:'in / inside',
    hint:'"Le chat est dans la boîte." Où est le chat ?',
    explanation:'"<b>Dans</b>" = in / inside. Prépositions de lieu : dans (in), sur (on), sous (under), devant (in front of), derrière (behind), entre (between). Exemple : Le livre est dans le sac (The book is in the bag).' }),

  makeMCQ({ id:'g4fr-phr-012', chapterId:'g4fr-phrase', difficulty:1,
    question:'Que signifie le mot interrogatif "Quand" ?',
    options:['Who','Where','When','Why'],
    answer:'When',
    hint:'"Quand" demande le temps — à quel moment quelque chose se passe.',
    explanation:'"<b>Quand</b>" = When. Exemple : Quand vas-tu à l\'école ? (When do you go to school?). Mots interrogatifs : Qui (Who), Où (Where), <b>Quand</b> (When), Comment (How), Pourquoi (Why), Combien (How much/many).' }),

  makeMCQ({ id:'g4fr-phr-013', chapterId:'g4fr-phrase', difficulty:1,
    question:'Que signifie le mot interrogatif "Pourquoi" ?',
    options:['Where','When','How','Why'],
    answer:'Why',
    hint:'"Pourquoi es-tu en retard ?" — "Why are you late?"',
    explanation:'"<b>Pourquoi</b>" = Why. La réponse à "pourquoi" utilise souvent "parce que" (because) : Pourquoi pleures-tu ? — Parce que j\'ai mal (Because I am in pain).' }),

  makeMCQ({ id:'g4fr-phr-014', chapterId:'g4fr-phrase', difficulty:2,
    question:'Que signifie "sous" dans "Le chat est sous la table" ?',
    options:['on','in','under','behind'],
    answer:'under',
    hint:'"Sur" = on (dessus), "sous" = ? (dessous)',
    explanation:'"<b>Sous</b>" = under. Le chat est <b>sous</b> la table = The cat is <b>under</b> the table. Ne pas confondre : sur (on/above) ≠ sous (under/below). Exemple : le stylo est sous le livre (the pen is under the book).' }),

  makeMCQ({ id:'g4fr-phr-015', chapterId:'g4fr-phrase', difficulty:2,
    question:'Que signifie "du" dans "Je parle du professeur" ? (du = de + le)',
    options:[
      'of the (professeur = masculin, du = de + le)',
      'to the (aller au marché)',
      'from a (source indéfinie)',
      'some (article partitif)'
    ],
    answer:'of the (professeur = masculin, du = de + le)',
    hint:'"Je parle du professeur" = I talk about the teacher. "Du" ici = de + le.',
    explanation:'"<b>Du</b>" = de + le (contraction obligatoire). "Je parle <b>du</b> professeur" = I am talking about the teacher. Contractions : de + le = <b>du</b>, de + les = <b>des</b>. À comparer : au = à + le (direction) vs du = de + le (about/of).' }),

  makeTF({ id:'g4fr-phr-016', chapterId:'g4fr-phrase', difficulty:2,
    question:'Pour mettre "Tu habites à Paris." à la forme négative, on dit : "Tu n\'habites pas à Paris."',
    answer:true,
    hint:'Négatif : sujet + ne + verbe + pas. Devant voyelle, "ne" → "n\'".',
    explanation:'<b>Vrai.</b> "Tu <b>n\'habites pas</b> à Paris." — La négation encadre le verbe. "Ne" → "<b>n\'</b>" devant une voyelle ou h muet : n\'habite, n\'aime, n\'est, n\'a.' }),

  makeMCQ({ id:'g4fr-phr-017', chapterId:'g4fr-phrase', difficulty:2,
    question:'Quelle conjonction exprime un CONTRASTE — comme "but" en anglais ?',
    options:['et','ou','donc','mais'],
    answer:'mais',
    hint:'"I like maths but I prefer French." Quel mot français traduit "but" ?',
    explanation:'"<b>Mais</b>" = but (contraste). Conjonctions : <b>et</b> (and), <b>ou</b> (or), <b>mais</b> (but), <b>donc</b> (so/therefore), <b>car</b> (because). Exemple : J\'aime les maths mais je préfère le français.' }),

  makeMCQ({ id:'g4fr-phr-018', chapterId:'g4fr-phrase', difficulty:3,
    question:'Forme une phrase correcte avec ces mots : [joue / mon / le / frère / football / à]',
    options:[
      'Le football joue mon frère à.',
      'Mon frère joue au football.',
      'Football mon frère au joue.',
      'Mon frère au joue football.'
    ],
    answer:'Mon frère joue au football.',
    hint:'Structure : sujet + verbe + complément. N\'oublie pas : à + le = au.',
    explanation:'"<b>Mon frère joue au football.</b>" — sujet (Mon frère) + verbe (joue) + complément (au football). "Au" = à + le (football est masculin). L\'ordre des mots : sujet + verbe + complément.' }),

  makeMCQ({ id:'g4fr-phr-019', chapterId:'g4fr-phrase', difficulty:4,
    question:'Priya écrit : "Je ne suis pas à l\'école aujourd\'hui. Je suis malade. Ma mère ___ dit de rester à la maison." Quel mot complète correctement ?',
    options:['a','est','ai','ont'],
    answer:'a',
    hint:'Sujet = "ma mère" (= elle, 3e personne sg.). Verbe AVOIR pour elle au passé composé = ?',
    explanation:'"Ma mère <b>a</b> dit de rester à la maison." — Passé composé : avoir (conjugué) + participe passé. Sujet = "ma mère" (= elle) → avoir → "<b>a</b>". "Elle a dit" = She said / She has told.' }),

  makeMCQ({ id:'g4fr-phr-020', chapterId:'g4fr-phrase', difficulty:1,
    question:'Quel est le mode impératif de "parler" pour "tu" ?',
    options:['tu parles','parles','parle','parler'],
    answer:'parle',
    hint:'Impératif -ER pour "tu" : enlève le -s final.',
    explanation:'"<b>Parle</b> !" — Pour l\'impératif des verbes en <b>-ER</b> avec "tu" : prends la forme du présent (tu parles) et <b>enlève le -s</b> : parle ! Attention : cette règle s\'applique uniquement aux verbes en -ER (pas finir → finis, rendre → rends).' }),

  makeMCQ({ id:'g4fr-phr-021', chapterId:'g4fr-phrase', difficulty:1,
    question:'Quelle conjonction signifie "but" ?',
    options:['et','ou','car','mais'],
    answer:'mais',
    hint:'"But" exprime une opposition.',
    explanation:'"But" = <b>mais</b>. Les conjonctions de coordination (mémo <b>MAIS OU ET DONC OR NI CAR</b>) : <b>mais</b> (but), <b>ou</b> (or), <b>et</b> (and), <b>donc</b> (so/therefore), <b>or</b> (now/yet), <b>ni</b> (neither/nor), <b>car</b> (because/for).' }),

  makeMCQ({ id:'g4fr-phr-022', chapterId:'g4fr-phrase', difficulty:1,
    question:'Dans "Je mange une pomme", qu\'est-ce que le COD ?',
    options:['Je','mange','une pomme','est'],
    answer:'une pomme',
    hint:'Le COD répond à la question "Je mange quoi ?"',
    explanation:'"Je mange <b>une pomme</b>" — le <b>COD</b> (Complément d\'Objet Direct) répond à "quoi ?" ou "qui ?" après le verbe, sans préposition. "Je mange quoi ?" → "une pomme" = COD. Le COD se place directement après le verbe.' }),

  makeTF({ id:'g4fr-phr-023', chapterId:'g4fr-phrase', difficulty:1,
    question:'L\'impératif de "vous" pour les verbes en -ER garde le -z final.',
    answer:true,
    hint:'Tu parles → Parle ! (perd -s). Vous parlez → Parlez ! (garde -z).',
    explanation:'<b>Vrai.</b> Impératif pour <b>vous</b> : identique à la forme du présent (avec -z). "Vous parlez" → "<b>Parlez</b> !" "Vous écoutez" → "<b>Écoutez</b> !" Seul le "tu" des -ER perd son -s ; le "vous" garde toujours -z.' }),

  makeMCQ({ id:'g4fr-phr-024', chapterId:'g4fr-phrase', difficulty:2,
    question:'Quelle phrase utilise "donc" correctement ?',
    options:[
      'Il pleut, donc nous sortons.',
      'Il pleut, donc mais nous sortons.',
      'Donc il pleut et nous.',
      'Il pleut, nous donc sortons.'
    ],
    answer:'Il pleut, donc nous sortons.',
    hint:'"Donc" = therefore/so. Il relie une cause et une conséquence.',
    explanation:'"Il pleut, <b>donc</b> nous sortons." — <b>donc</b> (so/therefore) exprime une conséquence. Position : entre deux propositions. Structure : cause + donc + conséquence. "Il pleut" (cause) → "donc nous sortons" (conséquence logique — même si ici ça semble illogique ! C\'est la grammaire qui compte).' }),

  makeMCQ({ id:'g4fr-phr-025', chapterId:'g4fr-phrase', difficulty:2,
    question:'Identifie le COI dans : "Je téléphone à ma mère."',
    options:['Je','téléphone','à ma mère','mère'],
    answer:'à ma mère',
    hint:'Le COI répond à "à qui ?" et contient une préposition.',
    explanation:'"Je téléphone <b>à ma mère</b>" — le <b>COI</b> (Complément d\'Objet Indirect) répond à "à qui ?" ou "de qui ?" et est introduit par une <b>préposition</b> (à, de). "Je téléphone à qui ?" → "à ma mère" = COI. Différence avec COD : le COI a une préposition.' }),

  makeMCQ({ id:'g4fr-phr-026', chapterId:'g4fr-phrase', difficulty:2,
    question:'Quel est le mode impératif de "finir" pour "vous" ?',
    options:['finissez','finissez-vous','vous finissez','finis'],
    answer:'finissez',
    hint:'Impératif "vous" : même forme que le présent sans "vous".',
    explanation:'"<b>Finissez</b> vos devoirs !" — Impératif "vous" de "finir" : prends la forme du présent (vous finissez), supprime le sujet (vous) → <b>finissez</b>. Même règle pour tous les verbes au "vous" : vous mangez → <b>mangez</b>, vous allez → <b>allez</b>.' }),

  makeMCQ({ id:'g4fr-phr-027', chapterId:'g4fr-phrase', difficulty:2,
    question:'Quelle conjonction complète : "Je veux un sandwich ___ une pizza."',
    options:['donc','ni','car','ou'],
    answer:'ou',
    hint:'"Ou" exprime un choix entre deux options.',
    explanation:'"Je veux un sandwich <b>ou</b> une pizza." — <b>ou</b> (or) exprime une <b>alternative/un choix</b>. Les conjonctions MAIS OU ET DONC OR NI CAR : <b>ou</b> = or, <b>et</b> = and (accumulation), <b>mais</b> = but (opposition), <b>car</b> = because (raison).' }),

  makeMCQ({ id:'g4fr-phr-028', chapterId:'g4fr-phrase', difficulty:3,
    question:'Dans "Elle donne des fleurs à son professeur", qu\'est-ce que "des fleurs" ?',
    options:['sujet','COD','COI','verbe'],
    answer:'COD',
    hint:'"Elle donne quoi ?" → pas de préposition avant "des fleurs".',
    explanation:'"Elle donne <b>des fleurs</b>" = COD. "Elle donne quoi ?" → "des fleurs" (sans préposition → COD). "à son professeur" = COI ("elle donne à qui ?" → à son professeur, avec préposition "à"). Une phrase peut avoir les deux : COD + COI.' }),

  makeMCQ({ id:'g4fr-phr-029', chapterId:'g4fr-phrase', difficulty:3,
    question:'Quelle phrase utilise l\'impératif correctement pour ordonner à quelqu\'un d\'aller à la maison ?',
    options:['Vas à la maison !','Va à la maison !','Aller à la maison !','Tu vas à la maison !'],
    answer:'Va à la maison !',
    hint:'"Aller" impératif "tu" = Va (irrégulier, sans -s).',
    explanation:'"<b>Va</b> à la maison !" — "aller" est irrégulier à l\'impératif : <b>va</b> (tu), <b>allons</b> (nous), <b>allez</b> (vous). "Vas" n\'existe pas à l\'impératif seul (sauf devant "y" : vas-y !). "Aller !" = infinitif (pas impératif). "Tu vas" = présent indicatif.' }),

  makeMCQ({ id:'g4fr-phr-030', chapterId:'g4fr-phrase', difficulty:3,
    question:'Identifie la conjonction correcte : "Je n\'aime ___ le poisson ___ la viande." (neither...nor)',
    options:['ni / ni','ou / ou','et / et','mais / mais'],
    answer:'ni / ni',
    hint:'"Neither...nor" en français = ni...ni.',
    explanation:'"Je n\'aime <b>ni</b> le poisson <b>ni</b> la viande." — <b>ni...ni</b> = neither...nor. On utilise toujours "ne" devant le verbe : "je <b>n\'</b>aime ni... ni...". Structure : ne + verbe + ni + X + ni + Y.' }),

  makeMCQ({ id:'g4fr-phr-031', chapterId:'g4fr-phrase', difficulty:3,
    question:'Quelle phrase a un COD et un COI ?',
    options:[
      'Je lis un livre.',
      'Je donne un livre à mon ami.',
      'Je parle à mon ami.',
      'Mon ami lit.'
    ],
    answer:'Je donne un livre à mon ami.',
    hint:'"Je donne quoi ?" (COD) et "à qui ?" (COI).',
    explanation:'"Je donne <b>un livre</b> (COD) <b>à mon ami</b> (COI)." — COD = "un livre" (quoi ?, sans préposition). COI = "à mon ami" (à qui ?, avec préposition "à"). Les autres phrases n\'ont qu\'un seul complément.' }),

  makeMCQ({ id:'g4fr-phr-032', chapterId:'g4fr-phrase', difficulty:4,
    question:'Priya donne un ordre à sa petite sœur. Traduis : "Finish your homework and go to bed!" (using tu-form)',
    options:[
      'Finis tes devoirs et va au lit !',
      'Finissez vos devoirs et allez au lit !',
      'Tu finis tes devoirs et tu vas au lit !',
      'Finir les devoirs et aller au lit !'
    ],
    answer:'Finis tes devoirs et va au lit !',
    hint:'"Finir" (tu) impératif = ? "Aller" (tu) impératif = ?',
    explanation:'"<b>Finis</b> tes devoirs et <b>va</b> au lit !" — "finir" impératif tu = <b>finis</b> (verbe -IR : garde le -s). "aller" impératif tu = <b>va</b> (irrégulier). La forme "vous" serait : finissez / allez. Les infinitifs ne peuvent pas servir d\'impératifs.' }),

  makeMCQ({ id:'g4fr-phr-033', chapterId:'g4fr-phrase', difficulty:4,
    question:'Complète en choisissant la bonne conjonction : "J\'aime le chocolat ___ je n\'en mange pas souvent ___ c\'est trop sucré."',
    options:['mais / car','et / mais','ou / donc','ni / car'],
    answer:'mais / car',
    hint:'"mais" = opposition (j\'aime... mais pas souvent). "car" = raison (pas souvent, car = because).',
    explanation:'"J\'aime le chocolat <b>mais</b> je n\'en mange pas souvent <b>car</b> c\'est trop sucré." — <b>mais</b> = opposition entre "j\'aime" et "je n\'en mange pas". <b>car</b> = raison/explication ("because it\'s too sweet"). Deux conjonctions MAIS OU ET DONC OR NI CAR dans une phrase !' }),

  makeMCQ({ id:'g4fr-phr-034', chapterId:'g4fr-phrase', difficulty:4,
    question:'Identifie le COD et le COI dans : "Ma sœur envoie un message à ses amies."',
    options:[
      'COD = un message / COI = à ses amies',
      'COD = ses amies / COI = un message',
      'COD = ma sœur / COI = un message',
      'Il n\'y a pas de COD ni COI.'
    ],
    answer:'COD = un message / COI = à ses amies',
    hint:'"Elle envoie quoi ?" (COD) et "à qui ?" (COI).',
    explanation:'"Ma sœur envoie <b>un message</b> (COD) <b>à ses amies</b> (COI)." — COD = "un message" (quoi ? sans préposition). COI = "à ses amies" (à qui ? avec préposition "à"). Règle : COD répond à quoi/qui SANS préposition, COI AVEC préposition.' }),

  makeMCQ({ id:'g4fr-phr-035', chapterId:'g4fr-phrase', difficulty:4,
    question:'Traduis et mets à l\'impératif : "Sophie, don\'t eat the cake and don\'t drink the juice — they are for Grandma!"',
    options:[
      'Ne mange pas le gâteau et ne bois pas le jus !',
      'Ne mangez pas le gâteau et ne buvez pas le jus !',
      'Tu ne manges pas le gâteau et tu ne bois pas le jus !',
      'Pas manger le gâteau et pas boire le jus !'
    ],
    answer:'Ne mange pas le gâteau et ne bois pas le jus !',
    hint:'Négatif impératif (tu) : ne + verbe + pas. Sophie = une personne = tu-form.',
    explanation:'"<b>Ne mange pas</b> le gâteau et <b>ne bois pas</b> le jus !" — Impératif négatif : <b>ne</b> + verbe impératif + <b>pas</b>. "Tu" form : manger → mange → ne mange pas. boire → bois → ne bois pas. "Vous" form aurait été : ne mangez pas, ne buvez pas.' })

);
