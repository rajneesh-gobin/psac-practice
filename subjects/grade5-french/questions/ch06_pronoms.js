'use strict';
// Grade 5 French - Chapitre : Les Pronoms
// IDs format: g5fr-pro-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-pro-001', chapterId:'fr-pronoms', difficulty:1,
    question:'Quel pronom sujet correspond à "we" en français ?',
    options:['ils','vous','on / nous','tu'],
    answer:'on / nous',
    hint:'"We" = nous (formel) ou on (informel en français parlé).',
    explanation:'"<b>Nous</b>" = we (formel). "<b>On</b>" = we (informel, très courant à l\'oral) ou one. Les pronoms sujets : je, tu, il/elle/on, nous, vous, ils/elles.' }),

  makeMCQ({ id:'g5fr-pro-002', chapterId:'fr-pronoms', difficulty:1,
    question:'Quel pronom sujet utilise-t-on pour parler poliment à une personne adulte que l\'on ne connaît pas bien ?',
    options:['tu','il','vous','on'],
    answer:'vous',
    hint:'La politesse en français - "tu" pour les amis, ___ pour les adultes.',
    explanation:'"<b>Vous</b>" s\'utilise pour la politesse (vouvoiement) avec une personne qu\'on ne connaît pas, un adulte ou un supérieur. "Tu" = tutoiement, pour les amis, la famille et les enfants. "Vous" est aussi le pronom pluriel (you all).' }),

  makeMCQ({ id:'g5fr-pro-003', chapterId:'fr-pronoms', difficulty:2,
    question:'Remplacez le COD par un pronom : "Je mange la pomme." → "Je ___ mange."',
    options:['lui','y','la','le'],
    answer:'la',
    hint:'"La pomme" est féminin singulier. Le pronom COD féminin singulier est "la".',
    explanation:'"Je <b>la</b> mange." - "La pomme" = féminin singulier → pronom COD : <b>la</b>. Les pronoms COD : <b>le</b> (masc. sing.), <b>la</b> (fém. sing.), <b>les</b> (pluriel). Le pronom se place <b>avant</b> le verbe.' }),

  makeMCQ({ id:'g5fr-pro-004', chapterId:'fr-pronoms', difficulty:2,
    question:'Remplacez par un pronom : "Il parle à ses parents." → "Il ___ parle."',
    options:['les','leur','lui','y'],
    answer:'leur',
    hint:'"Ses parents" est pluriel. Le pronom COI pluriel est "leur".',
    explanation:'"Il <b>leur</b> parle." - "À ses parents" (pluriel) → pronom COI : <b>leur</b>. Pronoms COI : <b>lui</b> (à lui / à elle, singulier), <b>leur</b> (à eux / à elles, pluriel). Attention : "leur" COI est invariable (pas de -s).' }),

  makeTF({ id:'g5fr-pro-005', chapterId:'fr-pronoms', difficulty:2,
    question:'En français, les pronoms COD et COI se placent après le verbe conjugué.',
    answer:false,
    hint:'Comparez : "Je mange la pomme" → "Je ___ mange" (le pronom est où ?)',
    explanation:'<b>Faux.</b> Les pronoms COD et COI se placent <b>avant</b> le verbe conjugué : "Je <b>la</b> mange" (pas "Je mange la"). Exception : à l\'impératif affirmatif, ils se placent après : "Mange-<b>la</b> !"' }),

  makeMCQ({ id:'g5fr-pro-006', chapterId:'fr-pronoms', difficulty:2,
    question:'Complétez : "Il ___ a offert des fleurs." (à Marie)',
    options:['le','lui','la','y'],
    answer:'lui',
    hint:'"À Marie" est singulier féminin. Le pronom COI singulier est "lui" (pour les deux genres).',
    explanation:'"Il <b>lui</b> a offert des fleurs." - "À Marie" (singulier) → pronom COI : <b>lui</b>. "Lui" remplace "à + personne" au singulier pour les deux genres. "Leur" remplace "à + personnes" au pluriel.' }),

  makeMCQ({ id:'g5fr-pro-007', chapterId:'fr-pronoms', difficulty:2,
    question:'Quel pronom tonique (stressed) correspond à "ils" ?',
    options:['lui','moi','eux','soi'],
    answer:'eux',
    hint:'Les pronoms toniques : moi, toi, lui, elle, nous, vous, ___, elles.',
    explanation:'"<b>Eux</b>" est le pronom tonique de "ils". Tableau des pronoms toniques : moi (je), toi (tu), lui (il), elle (elle), nous (nous), vous (vous), <b>eux</b> (ils), elles (elles). Utilisés après une préposition : avec lui, pour eux.' }),

  makeMCQ({ id:'g5fr-pro-008', chapterId:'fr-pronoms', difficulty:2,
    question:'Remplacez par un pronom : "Je mange des gâteaux." → "J\'___ mange."',
    options:['y','en','les','lui'],
    answer:'en',
    hint:'"En" remplace "de + chose" - ici "des gâteaux" = de + les gâteaux.',
    explanation:'"J\'<b>en</b> mange." - "En" remplace "de + nom" ou une quantité : "des gâteaux" → <b>en</b>. Autres exemples : "J\'ai besoin <b>d\'</b>argent." → "J\'<b>en</b> ai besoin." "Y" remplace "à/dans + lieu" : "Je vais à Paris." → "J\'<b>y</b> vais."' }),

  makeTF({ id:'g5fr-pro-009', chapterId:'fr-pronoms', difficulty:1,
    question:'"Vous" peut être utilisé pour s\'adresser à une seule personne en français.',
    answer:true,
    hint:'Pensez au vouvoiement - parler poliment à un seul adulte.',
    explanation:'<b>Vrai.</b> "Vous" est à la fois le pluriel de "tu" <b>ET</b> la forme de politesse (vouvoiement) pour s\'adresser à une seule personne : "Vous êtes le directeur ?" (une seule personne, mais forme polie). C\'est le vouvoiement.' }),

  makeMCQ({ id:'g5fr-pro-010', chapterId:'fr-pronoms', difficulty:2,
    question:'Complétez : "Je pense ___ lui. Je pense ___ Paris." (à lui / à Paris)',
    options:['à / à','à / y','lui / y','lui / à'],
    answer:'à / y',
    hint:'"À + personne" → pronom tonique (à lui). "À + lieu" → pronom "y".',
    explanation:'"Je pense <b>à lui</b>." → "Je pense à lui" (on garde "à lui" pour les personnes, pas de remplacement par "y"). "Je pense à Paris." → "J\'<b>y</b> pense." - <b>y</b> remplace "à + lieu/chose". Note : pour les personnes, on garde la préposition + pronom tonique.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-pro-011', chapterId:'fr-pronoms', difficulty:1,
    question:'Quel est le rôle du pronom relatif "qui" dans une phrase ?',
    options:['il remplace un COD','il remplace le SUJET','il remplace un COI','il remplace un lieu'],
    answer:'il remplace le SUJET',
    hint:'"Qui" = who/which comme sujet. "Que" = whom/which comme COD.',
    explanation:'"<b>Qui</b>" = pronom relatif sujet. "C\'est l\'enfant <b>qui</b> pleure." - qui = l\'enfant (sujet de pleure). "Que" = pronom relatif COD. "C\'est le livre <b>que</b> je lis." - que = le livre (COD de lis). Moyen mnémotechnique : <b>qui</b> fait l\'action (sujet), <b>que</b> reçoit l\'action (COD).' }),

  makeMCQ({ id:'g5fr-pro-012', chapterId:'fr-pronoms', difficulty:1,
    question:'Complétez : "C\'est la fleur ___ tu achètes."',
    options:['qui','que','dont','où'],
    answer:'que',
    hint:'"tu achètes" a déjà un sujet ("tu") → il faut le pronom COD.',
    explanation:'"C\'est la fleur <b>que</b> tu achètes." - "que" est le COD (tu achètes QUOI ? → la fleur → que). "Qui" serait utilisé si la fleur était le sujet : "C\'est la fleur <b>qui</b> est belle." (Construction tirée du PSAC 2025 Q5a.)' }),

  makeMCQ({ id:'g5fr-pro-013', chapterId:'fr-pronoms', difficulty:2,
    question:'Remplacez le COD : "Je regarde le film." → ?',
    options:['Je lui regarde.','Je le regarde.','J\'y regarde.','J\'en regarde.'],
    answer:'Je le regarde.',
    hint:'"le film" = masculin singulier → pronom COD = le.',
    explanation:'"Je <b>le</b> regarde." - le film (masc. sing.) → COD pronom : le. Placer avant le verbe. Pronoms COD : le (m.s.), la (f.s.), les (pl.), me, te, nous, vous. Avec pronom féminin : "Je regarde la série" → "Je <b>la</b> regarde."' }),

  makeMCQ({ id:'g5fr-pro-014', chapterId:'fr-pronoms', difficulty:2,
    question:'Joignez avec "parce que" : "Maman est triste. Sa fille est malade."',
    options:[
      'Maman est triste parce que elle sa fille est malade.',
      'Maman est triste parce que sa fille est malade.',
      'Maman est triste parce sa fille est malade.',
      'Parce que maman est triste, sa fille est malade.'
    ],
    answer:'Maman est triste parce que sa fille est malade.',
    hint:'"parce que" introduit une proposition de cause - gardez la deuxième phrase telle quelle.',
    explanation:'"<b>Maman est triste parce que sa fille est malade.</b>" - "parce que" (because) relie deux propositions : proposition principale + cause. "Parce que" est toujours suivi d\'une phrase complète (sujet + verbe). (Construction testée au PSAC 2025 Q5b.)' }),

  makeMCQ({ id:'g5fr-pro-015', chapterId:'fr-pronoms', difficulty:2,
    question:'"Je vais à Paris." → Remplacez "à Paris" par un pronom.',
    options:['Je lui vais.','J\'en vais.','J\'y vais.','Je me vais.'],
    answer:'J\'y vais.',
    hint:'"Y" remplace "à + lieu/chose".',
    explanation:'"<b>J\'y vais.</b>" - "y" remplace "à + lieu" : à Paris → y. J\'y vais. Autres exemples : Tu vas au marché → Tu y vas. Ils sont à l\'école → Ils y sont. "Y" se place avant le verbe. Ne pas confondre avec "en" qui remplace "de + chose".' }),

  makeTF({ id:'g5fr-pro-016', chapterId:'fr-pronoms', difficulty:2,
    question:'"Le pronom \'dont\' peut remplacer \'de + nom\'."',
    answer:true,
    hint:'"Dont" = of which, about which, whose.',
    explanation:'<b>Vrai.</b> "Dont" remplace "de + nom" : "J\'ai besoin de ce livre." → "C\'est le livre <b>dont</b> j\'ai besoin." "Dont" est utilisé quand le verbe ou l\'expression demande "de" : avoir besoin de, parler de, être fier de. (Couvert dans le manuel MIE Dossier 2.)' }),

  makeMCQ({ id:'g5fr-pro-017', chapterId:'fr-pronoms', difficulty:3,
    question:'Remplacez "à ses amis" ET "de ses vacances" :\n"Il parle à ses amis de ses vacances."',
    options:['Il leur en parle.','Il y en parle.','Il lui y parle.','Il en lui parle.'],
    answer:'Il leur en parle.',
    hint:'"à ses amis" (pluriel, personnes) → leur. "de ses vacances" (de + chose) → en.',
    explanation:'"Il <b>leur en</b> parle." - "à ses amis" (plur. COI) → leur. "de ses vacances" (de + chose) → en. Ordre des pronoms : COI (lui/leur) vient avant "en" → "leur en". En général : me/te/se/nous/vous + le/la/les + lui/leur + y + en.' }),

  makeMCQ({ id:'g5fr-pro-018', chapterId:'fr-pronoms', difficulty:3,
    question:'"C\'est l\'endroit ___ l\'accident a eu lieu." Quel pronom relatif ?',
    options:['qui','que','dont','où'],
    answer:'où',
    hint:'"Où" remplace une expression de lieu ou de temps.',
    explanation:'"C\'est l\'endroit <b>où</b> l\'accident a eu lieu." - "où" remplace un lieu (à cet endroit). Il peut aussi remplacer un moment : "C\'est le jour où il est parti." (Construction testée au PSAC 2025 Q5e : "Voici l\'endroit. L\'accident a eu lieu à cet endroit. → où")' }),

  makeMCQ({ id:'g5fr-pro-019', chapterId:'fr-pronoms', difficulty:4,
    question:'Identifiez la phrase qui utilise les pronoms CORRECTEMENT :',
    options:[
      'Je l\'ai vu lui hier au marché.',
      'Elle leur a donné les fleurs à eux.',
      'Nous y sommes allés la semaine dernière.',
      'Il me l\'a dit à moi ce matin.'
    ],
    answer:'Nous y sommes allés la semaine dernière.',
    hint:'Cherchez les phrases avec des pronoms redondants (répétition inutile).',
    explanation:'"<b>Nous y sommes allés la semaine dernière.</b>" ✓ - "y" remplace correctement le lieu. Erreurs : (1) "Je l\'ai vu <b>lui</b>" - redondant : "lui" est déjà remplacé par "l\'" ; (2) "leur a donné... <b>à eux</b>" - répétition inutile ; (3) "Il me l\'a dit <b>à moi</b>" - "à moi" est redondant quand "me" exprime déjà le COI. En français formel, on évite cette répétition.' }),

  makeMCQ({ id:'g5fr-pro-020', chapterId:'fr-pronoms', difficulty:2,
    question:'Complétez avec le bon pronom relatif : "C\'est l\'élève ___ a gagné le prix."',
    options:['que','qui','dont','où'],
    answer:'qui',
    hint:'"Qui" remplace le sujet du verbe "a gagné".',
    explanation:'"C\'est l\'élève <b>qui</b> a gagné." - "qui" est utilisé quand le pronom est sujet du verbe qui suit : "l\'élève" = sujet de "a gagné" → qui. "Que/qu\'" est utilisé quand le pronom est objet : "C\'est le prix <b>que</b> j\'ai gagné."' }),

  makeMCQ({ id:'g5fr-pro-021', chapterId:'fr-pronoms', difficulty:2,
    question:'Complétez : "Le film ___ nous regardons est intéressant."',
    options:['qui','que','dont','où'],
    answer:'que',
    hint:'"Le film" est l\'objet de "regardons" → "que".',
    explanation:'"Le film <b>que</b> nous regardons." - "que/qu\'" remplace l\'objet direct du verbe. "Nous regardons le film" → "le film" est COD → que. Contraste : "Le film <b>qui</b> passe au cinéma" (sujet de "passe") vs "Le film <b>que</b> nous regardons" (objet de "regardons").' }),

  makeTF({ id:'g5fr-pro-022', chapterId:'fr-pronoms', difficulty:1,
    question:'"Qui" peut être utilisé comme pronom relatif sujet pour des personnes ET des choses.',
    answer:true,
    hint:'"Le chat qui dort" et "la fille qui chante" - les deux fonctionnent.',
    explanation:'<b>Vrai.</b> "Qui" s\'utilise pour des personnes et des choses : "La maison <b>qui</b> est rouge." "L\'élève <b>qui</b> parle." Dans les deux cas, "qui" est sujet du verbe qui suit.' }),

  makeMCQ({ id:'g5fr-pro-023', chapterId:'fr-pronoms', difficulty:2,
    question:'"Ce livre est le mien." Que signifie "le mien" ?',
    options:['yours (masc.)','mine (masc.)','his (masc.)','ours (masc.)'],
    answer:'mine (masc.)',
    hint:'"Le mien" = pronom possessif masculin singulier de "je".',
    explanation:'"<b>le mien</b>" = mine (masculin singulier). Tableau des pronoms possessifs : le mien/la mienne (mine), le tien/la tienne (yours), le sien/la sienne (his/hers), le nôtre/la nôtre (ours), le vôtre/la vôtre (yours, plur.), le leur/la leur (theirs).' }),

  makeMCQ({ id:'g5fr-pro-024', chapterId:'fr-pronoms', difficulty:2,
    question:'"Ces stylos sont ___ ." (tu, possessif pluriel)',
    options:['les tiens','les tiens','le tien','les tiennes'],
    answer:'les tiens',
    hint:'"Stylos" = masculin pluriel → les tiens.',
    explanation:'"Ces stylos sont <b>les tiens</b>." - "Stylos" = masculin pluriel → <b>les tiens</b>. Tableau pour "tu" : le tien (masc. sing.) / la tienne (fém. sing.) / les tiens (masc. plur.) / les tiennes (fém. plur.).' }),

  makeMCQ({ id:'g5fr-pro-025', chapterId:'fr-pronoms', difficulty:2,
    question:'"Quel manteau préfères-tu ?" → En montrant un manteau loin de vous :',
    options:['celui-ci','celle-là','celui-là','ceux-ci'],
    answer:'celui-là',
    hint:'"Celui-ci" = near ; "celui-là" = far.',
    explanation:'"<b>celui-là</b>" - Le manteau est loin → <b>-là</b>. Tableau des pronoms démonstratifs : celui-ci/celle-ci/ceux-ci/celles-ci (near, = this one/these ones) vs celui-là/celle-là/ceux-là/celles-là (far, = that one/those ones).' }),

  makeTF({ id:'g5fr-pro-026', chapterId:'fr-pronoms', difficulty:1,
    question:'"Celle" est le féminin singulier du pronom démonstratif.',
    answer:true,
    hint:'Masculin : celui ; Féminin : celle.',
    explanation:'<b>Vrai.</b> Pronoms démonstratifs : <b>celui</b> (masc. sing.) / <b>celle</b> (fém. sing.) / <b>ceux</b> (masc. plur.) / <b>celles</b> (fém. plur.). Exemples : "Quelle robe veux-tu ? Celle-ci ou celle-là ?" "Quel livre ? Celui de droite."' }),

  makeMCQ({ id:'g5fr-pro-027', chapterId:'fr-pronoms', difficulty:2,
    question:'Remplacez "à ma mère" : "Je parle ___ chaque soir."',
    options:['la','le','lui','leur'],
    answer:'lui',
    hint:'"Lui" = pronom COI (indirect object) pour une personne singulière.',
    explanation:'"Je <b>lui</b> parle chaque soir." - "à ma mère" = COI (complément d\'objet indirect) → lui (pour une personne singulière, masc. ou fém.). Pour une personne plurielle → leur. Exemples : Je parle à Marie → Je lui parle. Je parle aux enfants → Je leur parle.' }),

  makeMCQ({ id:'g5fr-pro-028', chapterId:'fr-pronoms', difficulty:2,
    question:'"Nous ___ écrivons une lettre." (à nos parents → pronom)',
    options:['les','lui','leur','y'],
    answer:'leur',
    hint:'"Nos parents" = pluriel, personnes → leur.',
    explanation:'"Nous <b>leur</b> écrivons une lettre." - "à nos parents" (pluriel, personnes) → <b>leur</b>. Tableau : COI singulier → lui (à Marie → lui) ; COI pluriel → leur (aux parents → leur).' }),

  makeMCQ({ id:'g5fr-pro-029', chapterId:'fr-pronoms', difficulty:2,
    question:'"Mon chien est calme. ___ chien (son) est bruyant." → Pronom possessif pour "son chien".',
    options:['Le sien','La sienne','Les siens','Son'],
    answer:'Le sien',
    hint:'"Son chien" = masculin singulier → le sien.',
    explanation:'"<b>Le sien</b>" - son chien → le sien (remplace son/sa + nom). Tableau de "son/sa/ses" : le sien (masc. sing.) / la sienne (fém. sing.) / les siens (masc. plur.) / les siennes (fém. plur.).' }),

  makeTF({ id:'g5fr-pro-030', chapterId:'fr-pronoms', difficulty:2,
    question:'"Leur" peut être soit un adjectif possessif soit un pronom COI.',
    answer:true,
    hint:'(1) "leur livre" (adjectif poss.) vs (2) "je leur parle" (pronom COI).',
    explanation:'<b>Vrai.</b> "Leur" a deux fonctions : (1) <b>Adjectif possessif</b> (invariable) : "leur maison / leurs livres" ; (2) <b>Pronom COI</b> (invariable) : "Je leur écris une lettre." Dans les deux cas, "leur" est invariable (ne prend jamais -s sauf comme adjectif pluriel : "leurs livres").' }),

  makeMCQ({ id:'g5fr-pro-031', chapterId:'fr-pronoms', difficulty:3,
    question:'Choisissez la bonne proposition relative : "Voilà la voiture ___ mon père est très fier."',
    options:['qui','que','dont','où'],
    answer:'dont',
    hint:'"Être fier DE" → "dont" remplace "de + nom".',
    explanation:'"Voilà la voiture <b>dont</b> mon père est très fier." - "être fier de la voiture" → "dont" remplace "de + nom". "Dont" s\'utilise quand le verbe/expression se construit avec "de" : avoir besoin de, parler de, être fier de, se souvenir de.' }),

  makeMCQ({ id:'g5fr-pro-032', chapterId:'fr-pronoms', difficulty:3,
    question:'"C\'est l\'enfant ___ les parents habitent à Paris."',
    options:['qui','que','dont','où'],
    answer:'dont',
    hint:'"Les parents DE l\'enfant" → dont.',
    explanation:'"C\'est l\'enfant <b>dont</b> les parents habitent à Paris." - "les parents de l\'enfant" → "dont" (remplace "de + nom"). Ici "dont" exprime la possession : les parents DE l\'enfant. Comparez : "l\'enfant qui joue" (sujet) / "l\'enfant que je vois" (objet) / "l\'enfant dont les parents..." (de + nom).' }),

  makeMCQ({ id:'g5fr-pro-033', chapterId:'fr-pronoms', difficulty:2,
    question:'"___ qui travaille bien réussit." (The one who works well succeeds.)',
    options:['Lui','Celui','Cela','Il'],
    answer:'Celui',
    hint:'"Celui qui" = "the one who" (masculin).',
    explanation:'"<b>Celui qui</b> travaille bien réussit." - "Celui qui" = the one who (masculin). Féminin : "<b>Celle qui</b> travaille bien réussit." Cette structure est très courante en français : celui qui/celle qui + verbe.' }),

  makeMCQ({ id:'g5fr-pro-034', chapterId:'fr-pronoms', difficulty:3,
    question:'Complétez : "J\'aime les pommes. ___ que tu m\'as données étaient délicieuses."',
    options:['Celles','Ceux','Celle','Ceci'],
    answer:'Celles',
    hint:'"Les pommes" = féminin pluriel → celles.',
    explanation:'"<b>Celles</b> que tu m\'as données" - "les pommes" est féminin pluriel → celles. "Celles que tu m\'as données" = the ones (f. plur.) that you gave me. Notez aussi l\'accord : "données" (fém. plur. car le COD "que" = les pommes précède).' }),

  makeMCQ({ id:'g5fr-pro-035', chapterId:'fr-pronoms', difficulty:4,
    question:'Identifiez la phrase CORRECTE avec les pronoms :',
    options:[
      'Il me l\'a dit la vérité à moi.',
      'Elle lui a parlé de son projet à lui.',
      'Nous y sommes allés avec plaisir.',
      'Tu le leur as donné les livres.'
    ],
    answer:'Nous y sommes allés avec plaisir.',
    hint:'Cherchez la phrase sans pronom redondant et avec le bon ordre.',
    explanation:'"<b>Nous y sommes allés avec plaisir.</b>" ✓ - "y" remplace correctement le lieu. Erreurs : (1) "me l\'a dit <b>la vérité à moi</b>" - double COD + redondance ; (2) "lui a parlé <b>à lui</b>" - "lui" est redondant ; (3) "le leur as donné <b>les livres</b>" - "le" est redondant si on garde "les livres".' })

);
