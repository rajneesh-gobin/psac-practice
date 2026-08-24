'use strict';
// Grade 4 French — Chapitre : Les Verbes au Présent
// IDs format: g4fr-verb-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4fr-verb-001', chapterId:'g4fr-verbes', difficulty:1,
    question:'Que signifie "Je suis" en anglais ?',
    options:['I have','I go','I am','I do'],
    answer:'I am',
    hint:'"Être" = to be. "Je suis" = I ___.',
    explanation:'"<b>Je suis</b>" = I am (verbe être). Conjugaison de ÊTRE : je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont. C\'est le verbe le plus important en français — apprenez-le par cœur !' }),

  makeMCQ({ id:'g4fr-verb-002', chapterId:'g4fr-verbes', difficulty:1,
    question:'Que signifie "Il a" en anglais ?',
    options:['He is','He goes','He has','He eats'],
    answer:'He has',
    hint:'"Avoir" = to have. "Il a" = He ___.',
    explanation:'"<b>Il a</b>" = He has (verbe avoir). Conjugaison de AVOIR : j\'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont. "Avoir" = to have. Ne pas confondre avec "être" (to be) !' }),

  makeMCQ({ id:'g4fr-verb-003', chapterId:'g4fr-verbes', difficulty:1,
    question:'Conjugue le verbe PARLER pour "tu" : Tu ___ français.',
    options:['parlons','parle','parles','parlent'],
    answer:'parles',
    hint:'Les verbes en -ER réguliers : je parle, tu ___es, il parle.',
    explanation:'"Tu <b>parles</b>" — pour les verbes en -ER réguliers : ôte -ER et ajoute les terminaisons : -e (je), <b>-es</b> (tu), -e (il/elle), -ons (nous), -ez (vous), -ent (ils/elles). Parler → je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent.' }),

  makeTF({ id:'g4fr-verb-004', chapterId:'g4fr-verbes', difficulty:1,
    question:'"Nous sommes" vient du verbe "avoir".',
    answer:false,
    hint:'"Sommes" — de quel verbe vient ce mot ? Être ou avoir ?',
    explanation:'<b>Faux.</b> "Nous sommes" vient du verbe "<b>être</b>" (to be), non de "avoir" (to have). Être : je suis, tu es, il est, nous sommes, vous êtes, ils sont. Avoir : j\'ai, tu as, il a, nous avons, vous avez, ils ont.' }),

  makeMCQ({ id:'g4fr-verb-005', chapterId:'g4fr-verbes', difficulty:2,
    question:'Que signifie "Vous êtes" en anglais ?',
    options:['They are','We are','You are','I am'],
    answer:'You are',
    hint:'"Vous" = you (formal or plural). "Êtes" = form of être.',
    explanation:'"<b>Vous êtes</b>" = You are (formel ou pluriel). "Vous" s\'utilise pour une personne que l\'on respecte (un professeur, un adulte inconnu) ou pour plusieurs personnes. Exemples : Vous êtes mon professeur. / Vous êtes mes amis.' }),

  makeMCQ({ id:'g4fr-verb-006', chapterId:'g4fr-verbes', difficulty:2,
    question:'Quel est l\'infinitif du verbe dans "Elle mange une pomme" ?',
    options:['manges','mangé','manger','mangeons'],
    answer:'manger',
    hint:'L\'infinitif est la forme de base du verbe — il se termine en -ER, -IR ou -RE.',
    explanation:'L\'infinitif de "mange" est "<b>manger</b>" (to eat). Les verbes en -ER : manger, parler, habiter, aimer, regarder. La conjugaison : je mange, tu manges, il/elle mange, nous mangeons, vous mangez, ils/elles mangent.' }),

  makeMCQ({ id:'g4fr-verb-007', chapterId:'g4fr-verbes', difficulty:2,
    question:'Complète : "Ils ___ à l\'école." (aller)',
    options:['va','vont','allez','allons'],
    answer:'vont',
    hint:'Conjugue "aller" pour "ils" : je vais, tu vas, il va, nous allons, vous allez, ils ___.',
    explanation:'"Ils <b>vont</b>" — conjugaison de ALLER : je vais, tu vas, il/elle <b>va</b>, nous allons, vous allez, ils/elles <b>vont</b>. "Aller" est un verbe irrégulier — apprenez toute la conjugaison par cœur !' }),

  makeMCQ({ id:'g4fr-verb-008', chapterId:'g4fr-verbes', difficulty:2,
    question:'Quelle phrase utilise "avoir" CORRECTEMENT ?',
    options:[
      'J\'ai onze ans.',
      'J\'est onze ans.',
      'Je suis onze ans.',
      'Il a suis dix ans.'
    ],
    answer:"J'ai onze ans.",
    hint:'Pour dire son âge en français, on utilise "avoir" (to have), pas "être" (to be).',
    explanation:'"<b>J\'ai onze ans.</b>" = I am eleven years old (literally: I have eleven years). En français, on utilise <b>avoir</b> pour l\'âge — pas être. "J\'ai onze ans", "Tu as dix ans", "Il a douze ans". Erreur classique : "Je suis onze ans" ✗.' }),

  makeMCQ({ id:'g4fr-verb-009', chapterId:'g4fr-verbes', difficulty:3,
    question:'Conjugue le verbe HABITER pour "nous" : Nous ___ à Curepipe.',
    options:['habite','habites','habitons','habitent'],
    answer:'habitons',
    hint:'Terminaisons des verbes en -ER : nous -ons. Ôte -ER et ajoute -ons.',
    explanation:'"Nous <b>habitons</b>" — verbe habiter (to live). Terminaison "nous" pour les verbes en -ER : -<b>ons</b>. Habiter → nous habitons. Autres exemples : nous parlons, nous mangeons, nous aimons. Attention : manger → nous mang<b>e</b>ons (on garde le "e" pour conserver le son /ʒ/).' }),

  makeMCQ({ id:'g4fr-verb-010', chapterId:'g4fr-verbes', difficulty:4,
    question:'Meena écrit une carte postale : "Bonjour ! Je ___ (être) à Maurice. Mon frère et moi, nous ___ (avoir) beaucoup de soleil. Nous ___ (aller) à la plage tous les jours." Quelle série de verbes complète correctement ?',
    options:[
      'suis / avons / allons',
      'est / ont / vont',
      'suis / avez / allez',
      'sommes / avons / vont'
    ],
    answer:'suis / avons / allons',
    hint:'Sujet 1 : "Je" → forme de je. Sujet 2 : "nous" → forme de nous (x2).',
    explanation:'"Je <b>suis</b> à Maurice" (être, sujet = je → suis). "Nous <b>avons</b> beaucoup de soleil" (avoir, sujet = nous → avons). "Nous <b>allons</b> à la plage" (aller, sujet = nous → allons). Chaque verbe doit s\'accorder avec son sujet.' })

);
