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

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4fr-verb-011', chapterId:'g4fr-verbes', difficulty:1,
    question:'Conjugue le verbe MANGER pour "elle" : Elle ___ une pomme.',
    options:['mangeons','manges','mange','mangent'],
    answer:'mange',
    hint:'Verbes en -ER : je mange, tu manges, il/elle ___.',
    explanation:'"Elle <b>mange</b>" — terminaison pour il/elle avec les verbes en -ER : <b>-e</b> (sans s). Je mange, tu manges, il/elle <b>mange</b>, nous mangeons, vous mangez, ils/elles mangent.' }),

  makeMCQ({ id:'g4fr-verb-012', chapterId:'g4fr-verbes', difficulty:1,
    question:'Que signifie "Je vais jouer" en anglais ?',
    options:['I played','I am playing','I am going to play','I have played'],
    answer:'I am going to play',
    hint:'"Aller" + infinitif = futur proche.',
    explanation:'"<b>Je vais jouer</b>" = I am going to play — c\'est le <b>futur proche</b> : aller (conjugué) + infinitif. Exemples : Tu vas manger (You are going to eat). Nous allons partir (We are going to leave).' }),

  makeMCQ({ id:'g4fr-verb-013', chapterId:'g4fr-verbes', difficulty:1,
    question:'Que signifie "Je me lève" en anglais ?',
    options:['I am sleeping','I am sitting down','I get up','I go to school'],
    answer:'I get up',
    hint:'"Se lever" = to get up. C\'est un verbe réfléchi.',
    explanation:'"<b>Je me lève</b>" = I get up. "Se lever" est un verbe réfléchi — l\'action s\'applique à soi-même. Conjugaison : je me lève, tu te lèves, il/elle se lève, nous nous levons, vous vous levez, ils/elles se lèvent.' }),

  makeMCQ({ id:'g4fr-verb-014', chapterId:'g4fr-verbes', difficulty:2,
    question:'Conjugue le verbe FINIR (to finish) pour "il" — verbe en -IR : Il ___ ses devoirs.',
    options:['finis','finit','finissons','finissent'],
    answer:'finit',
    hint:'Verbes en -IR (2e groupe) : je finis, tu finis, il ___.',
    explanation:'"Il <b>finit</b>" — conjugaison des verbes en -IR : je finis, tu finis, il/elle <b>finit</b>, nous finissons, vous finissez, ils/elles finissent. Autres verbes en -IR : choisir (to choose), grandir (to grow).' }),

  makeMCQ({ id:'g4fr-verb-015', chapterId:'g4fr-verbes', difficulty:2,
    question:'Que signifie "Je veux" (verbe vouloir) en anglais ?',
    options:['I can','I must','I want','I go'],
    answer:'I want',
    hint:'"Vouloir" = to want.',
    explanation:'"<b>Je veux</b>" = I want (verbe vouloir). Conjugaison : je veux, tu veux, il/elle veut, nous voulons, vous voulez, ils/elles veulent. Exemple : Je veux manger une glace (I want to eat an ice cream).' }),

  makeMCQ({ id:'g4fr-verb-016', chapterId:'g4fr-verbes', difficulty:2,
    question:'Que signifie "J\'ai mangé" en anglais ?',
    options:['I am eating','I eat','I ate / I have eaten','I will eat'],
    answer:'I ate / I have eaten',
    hint:'"Avoir" + participe passé = passé composé. "Mangé" = participe passé de manger.',
    explanation:'"<b>J\'ai mangé</b>" = I ate / I have eaten — c\'est le <b>passé composé</b> : avoir (conjugué) + participe passé. Participes passés des verbes en -ER : manger → mangé, parler → parlé, jouer → joué.' }),

  makeMCQ({ id:'g4fr-verb-017', chapterId:'g4fr-verbes', difficulty:2,
    question:'Quelle est la conjugaison correcte de PARLER pour "ils" ?',
    options:['ils parle','ils parlons','ils parlez','ils parlent'],
    answer:'ils parlent',
    hint:'Terminaison de "ils/elles" pour les verbes en -ER : -ent (muet).',
    explanation:'"Ils <b>parlent</b>" — terminaison pour ils/elles avec les verbes en -ER : <b>-ent</b> (ne se prononce pas). Je parle, tu parles, il parle, nous parlons, vous parlez, ils/elles <b>parlent</b>.' }),

  makeMCQ({ id:'g4fr-verb-018', chapterId:'g4fr-verbes', difficulty:3,
    question:'Complète : "Chaque matin, je ___ (se lever) à sept heures. Je ___ (manger) des céréales. Ensuite, je ___ (aller) à l\'école."',
    options:[
      'me lève / mange / vais',
      'se lève / manges / va',
      'me levons / mange / allons',
      'me lève / manges / allez'
    ],
    answer:'me lève / mange / vais',
    hint:'Sujet = "je" pour les trois verbes.',
    explanation:'"Je <b>me lève</b>" (se lever, je → me lève). "Je <b>mange</b>" (manger, je → mange). "Je <b>vais</b>" (aller, je → vais). Les trois verbes s\'accordent avec le même sujet "je".' }),

  makeMCQ({ id:'g4fr-verb-019', chapterId:'g4fr-verbes', difficulty:4,
    question:'Lina écrit son journal : "Hier, j\'___ (avoir) une bonne journée. Je ___ (jouer) avec mes amis et nous ___ (manger) une pizza." Quelle série AU PASSÉ COMPOSÉ est correcte ?',
    options:[
      'ai eu / ai joué / avons mangé',
      'avais / jouais / mangions',
      'aurai / jouerai / mangerons',
      'ai eu / jouais / avons mangé'
    ],
    answer:'ai eu / ai joué / avons mangé',
    hint:'Passé composé = avoir (conjugué) + participe passé. Sujet "j\'" = je, "nous" = nous.',
    explanation:'"J\'<b>ai eu</b>" (avoir, je → j\'ai + eu). "J\'<b>ai joué</b>" (jouer, je → j\'ai + joué). "Nous <b>avons mangé</b>" (manger, nous → nous avons + mangé). Le passé composé se forme avec avoir + participe passé.' })

);
