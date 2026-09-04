'use strict';
// Grade 4 French - Chapitre : Les Verbes au Présent
// IDs format: g4fr-verb-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4fr-verb-001', chapterId:'g4fr-verbes', subsection:'etre_avoir', difficulty:1,
    question:'Que signifie "Je suis" en anglais ?',
    options:['I have','I go','I am','I do'],
    answer:'I am',
    hint:'"Être" = to be. "Je suis" = I ___.',
    explanation:'"<b>Je suis</b>" = I am (verbe être). Conjugaison de ÊTRE : je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont. C\'est le verbe le plus important en français - apprenez-le par cœur !' }),

  makeMCQ({ id:'g4fr-verb-002', chapterId:'g4fr-verbes', subsection:'etre_avoir', difficulty:1,
    question:'Que signifie "Il a" en anglais ?',
    options:['He is','He goes','He has','He eats'],
    answer:'He has',
    hint:'"Avoir" = to have. "Il a" = He ___.',
    explanation:'"<b>Il a</b>" = He has (verbe avoir). Conjugaison de AVOIR : j\'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont. "Avoir" = to have. Ne pas confondre avec "être" (to be) !' }),

  makeMCQ({ id:'g4fr-verb-003', chapterId:'g4fr-verbes', subsection:'verbes_er', difficulty:1,
    question:'Conjugue le verbe PARLER pour "tu" : Tu ___ français.',
    options:['parlons','parle','parles','parlent'],
    answer:'parles',
    hint:'Les verbes en -ER réguliers : je parle, tu ___es, il parle.',
    explanation:'"Tu <b>parles</b>" - pour les verbes en -ER réguliers : ôte -ER et ajoute les terminaisons : -e (je), <b>-es</b> (tu), -e (il/elle), -ons (nous), -ez (vous), -ent (ils/elles). Parler → je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent.' }),

  makeTF({ id:'g4fr-verb-004', chapterId:'g4fr-verbes', subsection:'etre_avoir', difficulty:1,
    question:'"Nous sommes" vient du verbe "avoir".',
    answer:false,
    hint:'"Sommes" - de quel verbe vient ce mot ? Être ou avoir ?',
    explanation:'<b>Faux.</b> "Nous sommes" vient du verbe "<b>être</b>" (to be), non de "avoir" (to have). Être : je suis, tu es, il est, nous sommes, vous êtes, ils sont. Avoir : j\'ai, tu as, il a, nous avons, vous avez, ils ont.' }),

  makeMCQ({ id:'g4fr-verb-005', chapterId:'g4fr-verbes', subsection:'etre_avoir', difficulty:2,
    question:'Que signifie "Vous êtes" en anglais ?',
    options:['They are','We are','You are','I am'],
    answer:'You are',
    hint:'"Vous" = you (formal or plural). "Êtes" = form of être.',
    explanation:'"<b>Vous êtes</b>" = You are (formel ou pluriel). "Vous" s\'utilise pour une personne que l\'on respecte (un professeur, un adulte inconnu) ou pour plusieurs personnes. Exemples : Vous êtes mon professeur. / Vous êtes mes amis.' }),

  makeMCQ({ id:'g4fr-verb-006', chapterId:'g4fr-verbes', subsection:'conjugaison', difficulty:2,
    question:'Quel est l\'infinitif du verbe dans "Elle mange une pomme" ?',
    options:['manges','mangé','manger','mangeons'],
    answer:'manger',
    hint:'L\'infinitif est la forme de base du verbe - il se termine en -ER, -IR ou -RE.',
    explanation:'L\'infinitif de "mange" est "<b>manger</b>" (to eat). Les verbes en -ER : manger, parler, habiter, aimer, regarder. La conjugaison : je mange, tu manges, il/elle mange, nous mangeons, vous mangez, ils/elles mangent.' }),

  makeMCQ({ id:'g4fr-verb-007', chapterId:'g4fr-verbes', subsection:'irreguliers', difficulty:2,
    question:'Complète : "Ils ___ à l\'école." (aller)',
    options:['va','vont','allez','allons'],
    answer:'vont',
    hint:'Conjugue "aller" pour "ils" : je vais, tu vas, il va, nous allons, vous allez, ils ___.',
    explanation:'"Ils <b>vont</b>" - conjugaison de ALLER : je vais, tu vas, il/elle <b>va</b>, nous allons, vous allez, ils/elles <b>vont</b>. "Aller" est un verbe irrégulier - apprenez toute la conjugaison par cœur !' }),

  makeMCQ({ id:'g4fr-verb-008', chapterId:'g4fr-verbes', subsection:'etre_avoir', difficulty:2,
    question:'Quelle phrase utilise "avoir" CORRECTEMENT ?',
    options:[
      'J\'ai onze ans.',
      'J\'est onze ans.',
      'Je suis onze ans.',
      'Il a suis dix ans.'
    ],
    answer:"J'ai onze ans.",
    hint:'Pour dire son âge en français, on utilise "avoir" (to have), pas "être" (to be).',
    explanation:'"<b>J\'ai onze ans.</b>" = I am eleven years old (literally: I have eleven years). En français, on utilise <b>avoir</b> pour l\'âge - pas être. "J\'ai onze ans", "Tu as dix ans", "Il a douze ans". Erreur classique : "Je suis onze ans" ✗.' }),

  makeMCQ({ id:'g4fr-verb-009', chapterId:'g4fr-verbes', subsection:'verbes_er', difficulty:3,
    question:'Conjugue le verbe HABITER pour "nous" : Nous ___ à Curepipe.',
    options:['habite','habites','habitons','habitent'],
    answer:'habitons',
    hint:'Terminaisons des verbes en -ER : nous -ons. Ôte -ER et ajoute -ons.',
    explanation:'"Nous <b>habitons</b>" - verbe habiter (to live). Terminaison "nous" pour les verbes en -ER : -<b>ons</b>. Habiter → nous habitons. Autres exemples : nous parlons, nous mangeons, nous aimons. Attention : manger → nous mang<b>e</b>ons (on garde le "e" pour conserver le son /ʒ/).' }),

  makeMCQ({ id:'g4fr-verb-010', chapterId:'g4fr-verbes', subsection:'etre_avoir', difficulty:4,
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

  makeMCQ({ id:'g4fr-verb-011', chapterId:'g4fr-verbes', subsection:'verbes_er', difficulty:1,
    question:'Conjugue le verbe MANGER pour "elle" : Elle ___ une pomme.',
    options:['mangeons','manges','mange','mangent'],
    answer:'mange',
    hint:'Verbes en -ER : je mange, tu manges, il/elle ___.',
    explanation:'"Elle <b>mange</b>" - terminaison pour il/elle avec les verbes en -ER : <b>-e</b> (sans s). Je mange, tu manges, il/elle <b>mange</b>, nous mangeons, vous mangez, ils/elles mangent.' }),

  makeMCQ({ id:'g4fr-verb-012', chapterId:'g4fr-verbes', subsection:'verbes_er', difficulty:1,
    question:'Que signifie "Je vais jouer" en anglais ?',
    options:['I played','I am playing','I am going to play','I have played'],
    answer:'I am going to play',
    hint:'"Aller" + infinitif = futur proche.',
    explanation:'"<b>Je vais jouer</b>" = I am going to play - c\'est le <b>futur proche</b> : aller (conjugué) + infinitif. Exemples : Tu vas manger (You are going to eat). Nous allons partir (We are going to leave).' }),

  makeMCQ({ id:'g4fr-verb-013', chapterId:'g4fr-verbes', subsection:'pronominaux', difficulty:1,
    question:'Que signifie "Je me lève" en anglais ?',
    options:['I am sleeping','I am sitting down','I get up','I go to school'],
    answer:'I get up',
    hint:'"Se lever" = to get up. C\'est un verbe réfléchi.',
    explanation:'"<b>Je me lève</b>" = I get up. "Se lever" est un verbe réfléchi - l\'action s\'applique à soi-même. Conjugaison : je me lève, tu te lèves, il/elle se lève, nous nous levons, vous vous levez, ils/elles se lèvent.' }),

  makeMCQ({ id:'g4fr-verb-014', chapterId:'g4fr-verbes', subsection:'irreguliers', difficulty:2,
    question:'Conjugue le verbe FINIR (to finish) pour "il" - verbe en -IR : Il ___ ses devoirs.',
    options:['finis','finit','finissons','finissent'],
    answer:'finit',
    hint:'Verbes en -IR (2e groupe) : je finis, tu finis, il ___.',
    explanation:'"Il <b>finit</b>" - conjugaison des verbes en -IR : je finis, tu finis, il/elle <b>finit</b>, nous finissons, vous finissez, ils/elles finissent. Autres verbes en -IR : choisir (to choose), grandir (to grow).' }),

  makeMCQ({ id:'g4fr-verb-015', chapterId:'g4fr-verbes', subsection:'irreguliers', difficulty:2,
    question:'Que signifie "Je veux" (verbe vouloir) en anglais ?',
    options:['I can','I must','I want','I go'],
    answer:'I want',
    hint:'"Vouloir" = to want.',
    explanation:'"<b>Je veux</b>" = I want (verbe vouloir). Conjugaison : je veux, tu veux, il/elle veut, nous voulons, vous voulez, ils/elles veulent. Exemple : Je veux manger une glace (I want to eat an ice cream).' }),

  makeMCQ({ id:'g4fr-verb-016', chapterId:'g4fr-verbes', subsection:'etre_avoir', difficulty:2,
    question:'Que signifie "J\'ai mangé" en anglais ?',
    options:['I am eating','I eat','I ate / I have eaten','I will eat'],
    answer:'I ate / I have eaten',
    hint:'"Avoir" + participe passé = passé composé. "Mangé" = participe passé de manger.',
    explanation:'"<b>J\'ai mangé</b>" = I ate / I have eaten - c\'est le <b>passé composé</b> : avoir (conjugué) + participe passé. Participes passés des verbes en -ER : manger → mangé, parler → parlé, jouer → joué.' }),

  makeMCQ({ id:'g4fr-verb-017', chapterId:'g4fr-verbes', subsection:'verbes_er', difficulty:2,
    question:'Quelle est la conjugaison correcte de PARLER pour "ils" ?',
    options:['ils parle','ils parlons','ils parlez','ils parlent'],
    answer:'ils parlent',
    hint:'Terminaison de "ils/elles" pour les verbes en -ER : -ent (muet).',
    explanation:'"Ils <b>parlent</b>" - terminaison pour ils/elles avec les verbes en -ER : <b>-ent</b> (ne se prononce pas). Je parle, tu parles, il parle, nous parlons, vous parlez, ils/elles <b>parlent</b>.' }),

  makeMCQ({ id:'g4fr-verb-018', chapterId:'g4fr-verbes', subsection:'pronominaux', difficulty:3,
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

  makeMCQ({ id:'g4fr-verb-019', chapterId:'g4fr-verbes', subsection:'etre_avoir', difficulty:4,
    question:'Lina écrit son journal : "Hier, j\'___ (avoir) une bonne journée. Je ___ (jouer) avec mes amis et nous ___ (manger) une pizza." Quelle série AU PASSÉ COMPOSÉ est correcte ?',
    options:[
      'ai eu / ai joué / avons mangé',
      'avais / jouais / mangions',
      'aurai / jouerai / mangerons',
      'ai eu / jouais / avons mangé'
    ],
    answer:'ai eu / ai joué / avons mangé',
    hint:'Passé composé = avoir (conjugué) + participe passé. Sujet "j\'" = je, "nous" = nous.',
    explanation:'"J\'<b>ai eu</b>" (avoir, je → j\'ai + eu). "J\'<b>ai joué</b>" (jouer, je → j\'ai + joué). "Nous <b>avons mangé</b>" (manger, nous → nous avons + mangé). Le passé composé se forme avec avoir + participe passé.' }),

  makeMCQ({ id:'g4fr-verb-020', chapterId:'g4fr-verbes', subsection:'irreguliers', difficulty:1,
    question:'Conjugue POUVOIR : "Je ___ venir ce soir."',
    options:['peut','peux','pouvez','peuvent'],
    answer:'peux',
    hint:'Pouvoir : je peux, tu peux, il peut.',
    explanation:'"Je <b>peux</b> venir ce soir." - Conjugaison de <b>pouvoir</b> (to be able to / can) : je <b>peux</b>, tu <b>peux</b>, il/elle <b>peut</b>, nous <b>pouvons</b>, vous <b>pouvez</b>, ils/elles <b>peuvent</b>.' }),

  makeMCQ({ id:'g4fr-verb-021', chapterId:'g4fr-verbes', subsection:'irreguliers', difficulty:1,
    question:'Conjugue VOULOIR : "Elle ___ un gâteau."',
    options:['veut','veux','voulez','voulons'],
    answer:'veut',
    hint:'Vouloir : il/elle veut (pas veux pour elle).',
    explanation:'"Elle <b>veut</b> un gâteau." - Conjugaison de <b>vouloir</b> (to want) : je <b>veux</b>, tu <b>veux</b>, il/elle <b>veut</b>, nous <b>voulons</b>, vous <b>voulez</b>, ils/elles <b>veulent</b>. Attention : "je veux" mais "il veut".' }),

  makeMCQ({ id:'g4fr-verb-022', chapterId:'g4fr-verbes', subsection:'pronominaux', difficulty:1,
    question:'Comment se conjugue SE LAVER pour "tu" ?',
    options:['tu se lave','tu te laves','tu me lave','tu laves'],
    answer:'tu te laves',
    hint:'Verbe réfléchi : tu + te + verbe.',
    explanation:'"Tu <b>te laves</b>." - Les verbes réfléchis ont un pronom : je <b>me</b> lave, tu <b>te</b> laves, il/elle <b>se</b> lave, nous <b>nous</b> lavons, vous <b>vous</b> lavez, ils/elles <b>se</b> lavent. Le pronom change avec le sujet.' }),

  makeTF({ id:'g4fr-verb-023', chapterId:'g4fr-verbes', subsection:'conjugaison', difficulty:1,
    question:'"Il sait nager" signifie "He knows how to swim".',
    answer:true,
    hint:'"Savoir + infinitif" = to know how to do something.',
    explanation:'<b>Vrai.</b> "<b>Savoir</b> + infinitif" = know how to. "Il <b>sait</b> nager" = He knows how to swim. Conjugaison de savoir : je <b>sais</b>, tu <b>sais</b>, il <b>sait</b>, nous <b>savons</b>, vous <b>savez</b>, ils <b>savent</b>.' }),

  makeMCQ({ id:'g4fr-verb-024', chapterId:'g4fr-verbes', subsection:'irreguliers', difficulty:2,
    question:'Conjugue PRENDRE : "Nous ___ le bus chaque matin."',
    options:['prenons','prennent','prenez','prend'],
    answer:'prenons',
    hint:'Prendre : nous prenons.',
    explanation:'"Nous <b>prenons</b> le bus." - Conjugaison de <b>prendre</b> (to take) : je <b>prends</b>, tu <b>prends</b>, il <b>prend</b>, nous <b>prenons</b>, vous <b>prenez</b>, ils <b>prennent</b>. Attention : "ils prennent" (double n).' }),

  makeMCQ({ id:'g4fr-verb-025', chapterId:'g4fr-verbes', subsection:'adverbes', difficulty:2,
    question:'Quel adverbe de fréquence signifie "always" ?',
    options:['parfois','jamais','toujours','souvent'],
    answer:'toujours',
    hint:'"Always" = sans exception.',
    explanation:'"Always" = <b>toujours</b>. Adverbes de fréquence du plus au moins fréquent : <b>toujours</b> (always) → <b>souvent</b> (often) → <b>parfois</b> (sometimes) → <b>jamais</b> (never). "Je ne mange <b>jamais</b> de bonbons." (jamais avec ne).' }),

  makeMCQ({ id:'g4fr-verb-026', chapterId:'g4fr-verbes', subsection:'adverbes', difficulty:2,
    question:'Quelle phrase est correcte avec "maintenant" ?',
    options:[
      'Je joue maintenant hier.',
      'Maintenant, je joue au foot.',
      'Maintenant = demain.',
      'Je jouais maintenant.'
    ],
    answer:'Maintenant, je joue au foot.',
    hint:'"Maintenant" = right now, au présent.',
    explanation:'"<b>Maintenant, je joue au foot.</b>" - <b>maintenant</b> (now/right now) s\'utilise avec le présent. On ne peut pas dire "maintenant hier" (deux temps qui se contredisent) ou "jouais maintenant" (l\'imparfait décrit le passé, pas le présent).' }),

  makeMCQ({ id:'g4fr-verb-027', chapterId:'g4fr-verbes', subsection:'pronominaux', difficulty:2,
    question:'Conjugue SE LEVER pour "nous" :',
    options:['nous se levons','nous levons','nous nous levons','nous me levons'],
    answer:'nous nous levons',
    hint:'Verbe réfléchi : nous + nous + verbe.',
    explanation:'"Nous <b>nous levons</b>." - Pour les verbes réfléchis, le pronom réfléchi change avec le sujet : je <b>me</b>, tu <b>te</b>, il/elle <b>se</b>, nous <b>nous</b>, vous <b>vous</b>, ils/elles <b>se</b>. On dit bien "nous nous levons" (deux fois "nous").' }),

  makeMCQ({ id:'g4fr-verb-028', chapterId:'g4fr-verbes', subsection:'irreguliers', difficulty:2,
    question:'Conjugue SAVOIR : "Vous ___ parler français ?"',
    options:['savez','savent','sais','sait'],
    answer:'savez',
    hint:'Savoir pour "vous" = savez.',
    explanation:'"Vous <b>savez</b> parler français ?" - Savoir : je sais, tu sais, il sait, nous savons, <b>vous savez</b>, ils savent. "Savoir + infinitif" = to know how to : je sais <b>nager</b>, tu sais <b>chanter</b>.' }),

  makeMCQ({ id:'g4fr-verb-029', chapterId:'g4fr-verbes', subsection:'adverbes', difficulty:3,
    question:'Quelle phrase utilise "parfois" correctement ?',
    options:[
      'Je mange parfois des légumes.',
      'Je ne mange parfois jamais.',
      'Parfois = toujours.',
      'Je parfois mange des légumes.'
    ],
    answer:'Je mange parfois des légumes.',
    hint:'"Parfois" se place après le verbe conjugué.',
    explanation:'"Je mange <b>parfois</b> des légumes." - <b>parfois</b> (sometimes) se place généralement après le verbe conjugué. Règle de position : sujet + verbe + <b>adverbe</b> + complément. On ne dit pas "Je parfois mange" (adverbe avant le verbe = anglicisme).' }),

  makeMCQ({ id:'g4fr-verb-030', chapterId:'g4fr-verbes', subsection:'irreguliers', difficulty:3,
    question:'Conjugue POUVOIR à la 3ème personne du pluriel :',
    options:['ils peut','ils pouvent','ils peuvent','ils peux'],
    answer:'ils peuvent',
    hint:'Pouvoir : ils peuvent (avec -ent).',
    explanation:'"Ils <b>peuvent</b>." - Attention : "ils peuvent" ≠ "ils pouvent" (fausse forme). Conjugaison complète de pouvoir : je peux, tu peux, il peut, nous pouvons, vous pouvez, <b>ils peuvent</b>. La forme "ils peuvent" vient du radical "peuv-".' }),

  makeMCQ({ id:'g4fr-verb-031', chapterId:'g4fr-verbes', subsection:'conjugaison', difficulty:3,
    question:'Quelle phrase utilise un verbe réfléchi correctement ?',
    options:[
      'Elles se appellent Marie et Sophie.',
      "Elles s'appellent Marie et Sophie.",
      'Elles appellent se Marie et Sophie.',
      'Elles me appellent Marie et Sophie.'
    ],
    answer:"Elles s'appellent Marie et Sophie.",
    hint:'"S\'appeler" → le pronom "se" s\'élide devant une voyelle.',
    explanation:'"Elles <b>s\'appellent</b> Marie et Sophie." - Le pronom réfléchi <b>se</b> devient <b>s\'</b> devant une voyelle (s\'appeler, s\'habiller, s\'arrêter). On ne peut pas dire "se appellent" (élision obligatoire). Structure : elles + s\' + appellent.' }),

  makeMCQ({ id:'g4fr-verb-032', chapterId:'g4fr-verbes', subsection:'adverbes', difficulty:3,
    question:'Quelle phrase exprime une habitude avec "souvent" ?',
    options:[
      'Je joue souvent au football le week-end.',
      'Je jouerai souvent au football maintenant.',
      'Souvent je jouais hier.',
      'Je jouais toujours jamais.'
    ],
    answer:'Je joue souvent au football le week-end.',
    hint:'"Souvent" + présent pour une habitude.',
    explanation:'"Je joue <b>souvent</b> au football le week-end." - <b>souvent</b> (often) + présent = habitude régulière. "Le week-end" confirme la régularité. Les autres options mélangent les temps de façon incorrecte.' }),

  makeMCQ({ id:'g4fr-verb-033', chapterId:'g4fr-verbes', subsection:'irreguliers', difficulty:4,
    question:'Priya demande à son frère : "Est-ce que tu ___ (vouloir) venir au parc ? Nous ___ (pouvoir) y aller ensemble. Tu ___ (savoir) que c\'est amusant !" Bonne série ?',
    options:[
      'veux / pouvons / sais',
      'veut / peuvent / sait',
      'voulez / pouvez / savez',
      'veux / pouvez / savons'
    ],
    answer:'veux / pouvons / sais',
    hint:'"tu" → veux ; "nous" → pouvons ; "tu" → sais.',
    explanation:'"Tu <b>veux</b>" (vouloir, tu → veux). "Nous <b>pouvons</b>" (pouvoir, nous → pouvons). "Tu <b>sais</b>" (savoir, tu → sais). Chaque verbe s\'accorde avec son sujet différent.' }),

  makeMCQ({ id:'g4fr-verb-034', chapterId:'g4fr-verbes', subsection:'pronominaux', difficulty:4,
    question:'Décris ta routine du matin : "Je ___ (se réveiller) à 6h. Je ___ (se laver) et je ___ (prendre) mon petit déjeuner. Je ___ (ne jamais / être) en retard !" Bonne série ?',
    options:[
      "me réveille / me lave / prends / ne suis jamais",
      "se réveille / se lave / prend / ne sont jamais",
      "me réveille / te laves / prenons / ne suis jamais",
      "me réveille / me lave / prend / suis jamais"
    ],
    answer:"me réveille / me lave / prends / ne suis jamais",
    hint:'Sujet = "je" pour tous les verbes. Réfléchis : je me... Jamais : ne + verbe + jamais.',
    explanation:'"Je <b>me réveille</b>" (se réveiller → je me). "Je <b>me lave</b>" (se laver → je me). "Je <b>prends</b>" (prendre → je prends). "Je <b>ne suis jamais</b> en retard" (jamais → ne + suis + jamais). Quatre règles grammaticales en une routine !' }),

  makeMCQ({ id:'g4fr-verb-035', chapterId:'g4fr-verbes', subsection:'irreguliers', difficulty:4,
    question:'Complète le dialogue : "- ___ -tu aller au cinéma ? (pouvoir) - Oui, je ___ y aller ! Mes amis ___ aussi venir. Nous ___ (vouloir) tous voir le même film !"',
    options:[
      'Peux / peux / peuvent / voulons',
      'Peut / peut / peuvent / veulent',
      'Pouvez / pouvez / pouvez / voulons',
      'Peux / peux / pouvent / voulons'
    ],
    answer:'Peux / peux / peuvent / voulons',
    hint:'Sujets : tu → peux ; je → peux ; mes amis (ils) → peuvent ; nous → voulons.',
    explanation:'"<b>Peux</b>-tu" (pouvoir, tu → peux, inversion question). "je <b>peux</b>" (je → peux). "Mes amis <b>peuvent</b>" (ils → peuvent). "Nous <b>voulons</b>" (nous → voulons). Quatre sujets différents, deux verbes irréguliers différents !' })

);
