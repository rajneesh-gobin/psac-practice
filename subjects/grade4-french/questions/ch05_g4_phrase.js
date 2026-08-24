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
