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
    explanation:'"Ma mère <b>a</b> dit de rester à la maison." — Passé composé : avoir (conjugué) + participe passé. Sujet = "ma mère" (= elle) → avoir → "<b>a</b>". "Elle a dit" = She said / She has told.' })

);
