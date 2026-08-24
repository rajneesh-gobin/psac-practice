'use strict';
// Grade 5 French — Chapitre : Les Verbes au Présent
// IDs format: g5fr-vb-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-vb-001', chapterId:'fr-verbes-present', difficulty:1,
    question:'Conjuguez "parler" au présent pour "je" :',
    options:['parles','parlez','parle','parlons'],
    answer:'parle',
    hint:'Verbes en -ER : enlevez -er, ajoutez -e pour "je".',
    explanation:'"Je <b>parle</b>" — pour les verbes en -ER, on enlève -er et on ajoute : je <b>-e</b>, tu -es, il/elle -e, nous -ons, vous -ez, ils/elles -ent. Parler → je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent.' }),

  makeMCQ({ id:'g5fr-vb-002', chapterId:'fr-verbes-present', difficulty:1,
    question:'Conjuguez "manger" au présent pour "nous" :',
    options:['mange','manges','mangeons','mangez'],
    answer:'mangeons',
    hint:'Verbes en -ger : on ajoute un "e" avant -ons pour garder le son doux.',
    explanation:'"Nous <b>mangeons</b>" — les verbes en -ger (manger, nager, voyager) gardent le "e" avant -ons pour que le "g" reste doux : nous mangeons, nous nageons. Sans le "e", on dirait "mangnons" — incorrect.' }),

  makeMCQ({ id:'g5fr-vb-003', chapterId:'fr-verbes-present', difficulty:1,
    question:'Quelle est la forme correcte de "être" pour "nous" ?',
    options:['nous sommes','nous êtes','nous sont','nous avons'],
    answer:'nous sommes',
    hint:'Être est irrégulier. La forme pour "nous" ne ressemble pas à l\'infinitif.',
    explanation:'"<b>Nous sommes</b>" — être est totalement irrégulier : je suis, tu es, il/elle est, <b>nous sommes</b>, vous êtes, ils/elles sont. À ne pas confondre avec "avoir" : nous avons.' }),

  makeMCQ({ id:'g5fr-vb-004', chapterId:'fr-verbes-present', difficulty:1,
    question:'Conjuguez "avoir" au présent pour "il" :',
    options:['il est','il a','il as','il ont'],
    answer:'il a',
    hint:'Avoir → il/elle ___ (une lettre seulement).',
    explanation:'"<b>Il a</b>" — avoir : j\'ai, tu as, il/elle <b>a</b>, nous avons, vous avez, ils/elles ont. Attention : "il a" (avoir) ≠ "il est" (être).' }),

  makeMCQ({ id:'g5fr-vb-005', chapterId:'fr-verbes-present', difficulty:2,
    question:'Complétez : "Elle ___ (finir) ses devoirs."',
    options:['fini','finit','finissez','finissons'],
    answer:'finit',
    hint:'Finir est un verbe en -IR. Conjugaison de "il/elle" : radical + -it.',
    explanation:'"Elle <b>finit</b>" — les verbes en -IR (-issons) se conjuguent : je finis, tu finis, il/elle <b>finit</b>, nous finissons, vous finissez, ils/elles finissent. Autres verbes -IR : choisir, grandir, réussir.' }),

  makeMCQ({ id:'g5fr-vb-006', chapterId:'fr-verbes-present', difficulty:2,
    question:'Conjuguez "aller" au présent pour "vous" :',
    options:['vous allez','vous allons','vous vont','vous vas'],
    answer:'vous allez',
    hint:'Aller est irrégulier, mais la forme "vous" ressemble à un verbe -ER normal.',
    explanation:'"<b>Vous allez</b>" — aller est irrégulier : je vais, tu vas, il/elle va, nous allons, <b>vous allez</b>, ils/elles vont. "Aller + infinitif" = futur proche : je <b>vais manger</b> (I am going to eat).' }),

  makeTF({ id:'g5fr-vb-007', chapterId:'fr-verbes-present', difficulty:1,
    question:'La terminaison des verbes en -ER pour "tu" au présent est -es.',
    answer:true,
    hint:'Je parle, tu ___.',
    explanation:'<b>Vrai.</b> Les terminaisons des verbes en -ER au présent : je -e, tu <b>-es</b>, il/elle -e, nous -ons, vous -ez, ils/elles -ent. Exemples : tu parles, tu manges, tu joues.' }),

  makeMCQ({ id:'g5fr-vb-008', chapterId:'fr-verbes-present', difficulty:2,
    question:'Complétez : "Ils ___ (faire) du sport tous les jours."',
    options:['font','faites','fais','fait'],
    answer:'font',
    hint:'Faire est irrégulier. La forme pour "ils/elles" est unique.',
    explanation:'"Ils <b>font</b>" — faire est totalement irrégulier : je fais, tu fais, il/elle fait, nous faisons, vous faites, ils/elles <b>font</b>. "Faire du sport" = to play/do sport.' }),

  makeMCQ({ id:'g5fr-vb-009', chapterId:'fr-verbes-present', difficulty:2,
    question:'Complétez avec la bonne forme de "avoir" : "Tu ___ douze ans."',
    options:['est','a','as','avez'],
    answer:'as',
    hint:'On utilise "avoir" pour l\'âge en français. "Tu" + avoir = ?',
    explanation:'"Tu <b>as</b> douze ans." — En français, on utilise <b>avoir</b> (pas être) pour l\'âge : j\'ai (10 ans), tu as, il/elle a, nous avons, vous avez, ils/elles ont. "Tu as" + [âge] + "ans".' }),

  makeMCQ({ id:'g5fr-vb-010', chapterId:'fr-verbes-present', difficulty:2,
    question:'Quelle est la forme correcte ? "Nous ___ (jouer) au football."',
    options:['jouent','joue','jouons','jouez'],
    answer:'jouons',
    hint:'Verbe en -ER, personne "nous". Terminaison = -ons.',
    explanation:'"Nous <b>jouons</b>" — jouer est un verbe en -ER : je joue, tu joues, il joue, <b>nous jouons</b>, vous jouez, ils jouent. La terminaison "nous" pour les -ER est toujours -ons.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-vb-011', chapterId:'fr-verbes-present', difficulty:1,
    question:'Conjuguez "venir" à la première personne du singulier.',
    options:['je vens','je viens','je venis','je venons'],
    answer:'je viens',
    hint:'"Venir" est irrégulier. Je viens, tu viens, il vient, nous venons…',
    explanation:'"<b>je viens</b>" — venir est irrégulier : je viens, tu viens, il/elle vient, nous venons, vous venez, ils/elles viennent. Verbes similaires : tenir → je tiens, devenir → je deviens, revenir → je reviens.' }),

  makeMCQ({ id:'g5fr-vb-012', chapterId:'fr-verbes-present', difficulty:1,
    question:'Verbe réfléchi : "Il ___ les mains." (se laver)',
    options:['lave','se lave','se lavons','me lave'],
    answer:'se lave',
    hint:'Le sujet est "il" → le pronom réfléchi pour il/elle est "se".',
    explanation:'"Il <b>se lave</b> les mains." — Verbes réfléchis : je me lave, tu te laves, il/elle <b>se lave</b>, nous nous lavons, vous vous lavez, ils/elles se lavent. Le pronom réfléchi change avec le sujet.' }),

  makeMCQ({ id:'g5fr-vb-013', chapterId:'fr-verbes-present', difficulty:1,
    question:'Conjuguez "pouvoir" à la première personne du pluriel.',
    options:['nous pouvons','nous pouvez','nous peuvent','nous pouvont'],
    answer:'nous pouvons',
    hint:'Verbe irrégulier — mais la forme "nous" garde -ons comme les verbes réguliers.',
    explanation:'"<b>nous pouvons</b>" — pouvoir (to be able to) : je peux, tu peux, il peut, nous pouvons, vous pouvez, ils peuvent. Même schéma : vouloir → nous voulons ; savoir → nous savons.' }),

  makeMCQ({ id:'g5fr-vb-014', chapterId:'fr-verbes-present', difficulty:2,
    question:'Conjuguez "vouloir" à la troisième personne du pluriel.',
    options:['ils voulons','ils voulez','ils veulent','ils voulent'],
    answer:'ils veulent',
    hint:'Le radical change pour ils/elles avec "vouloir".',
    explanation:'"<b>ils veulent</b>" — vouloir : je veux, tu veux, il veut, nous voulons, vous voulez, ils <b>veulent</b>. Le radical change : voul- pour nous/vous, veul- pour les autres personnes. De même : pouvoir → ils peuvent.' }),

  makeMCQ({ id:'g5fr-vb-015', chapterId:'fr-verbes-present', difficulty:2,
    question:'Verbe réfléchi : "se lever" → "tu" = ?',
    options:['tu lèves','tu te lève','tu te lèves','tu vous levez'],
    answer:'tu te lèves',
    hint:'Verbe réfléchi + changement de radical (e → è devant terminaison muette).',
    explanation:'"<b>tu te lèves</b>" — se lever : je me lève, tu te lèves, il se lève, nous nous levons, vous vous levez, ils se lèvent. L\'accent grave (è) apparaît aux formes singulières et à la 3e personne du pluriel. Même règle : se promener, s\'appeler.' }),

  makeMCQ({ id:'g5fr-vb-016', chapterId:'fr-verbes-present', difficulty:2,
    question:'Conjuguez "prendre" à la deuxième personne du pluriel.',
    options:['vous prennez','vous prenez','vous prend','vous prendre'],
    answer:'vous prenez',
    hint:'"Prendre" est irrégulier — attention au double n pour "ils".',
    explanation:'"<b>vous prenez</b>" — prendre : je prends, tu prends, il prend, nous prenons, vous prenez, ils <b>prennent</b> (double n pour ils !). Verbes similaires : apprendre → vous apprenez, comprendre → vous comprenez.' }),

  makeTF({ id:'g5fr-vb-017', chapterId:'fr-verbes-present', difficulty:2,
    question:'"Savoir" se conjugue : je sais, tu sais, il sait, nous savons.',
    answer:true,
    hint:'"Savoir" est irrégulier mais suit ce schéma.',
    explanation:'<b>Vrai.</b> Savoir (to know a fact) : je sais, tu sais, il/elle sait, nous savons, vous savez, ils/elles savent. Ne pas confondre avec "connaître" (to know a person/place) : je connais, tu connais, il connaît. "Je sais nager." vs "Je connais Paul."' }),

  makeMCQ({ id:'g5fr-vb-018', chapterId:'fr-verbes-present', difficulty:3,
    question:'Corrigez l\'erreur : "Nous allez à la mer ce week-end."',
    options:[
      'Nous allons à la mer ce week-end.',
      'Nous allés à la mer ce week-end.',
      'On allez à la mer ce week-end.',
      'Nous aller à la mer ce week-end.'
    ],
    answer:'Nous allons à la mer ce week-end.',
    hint:'"Nous" prend la terminaison -ons. Pour "aller" : nous allons.',
    explanation:'"<b>Nous allons</b>" — "aller" est irrégulier : je vais, tu vas, il va, nous <b>allons</b>, vous allez, ils vont. "Allez" est la forme pour "vous". C\'est une erreur très fréquente d\'écrire "nous allez" au lieu de "nous allons".' }),

  makeMCQ({ id:'g5fr-vb-019', chapterId:'fr-verbes-present', difficulty:4,
    question:'Choisissez la phrase CORRECTEMENT conjuguée :',
    options:[
      'Les élèves fait leurs devoirs le soir.',
      'Mon ami et moi allons au cinéma samedi.',
      'Tu peut venir chez moi demain.',
      'Elle se laves les mains avant de manger.'
    ],
    answer:'Mon ami et moi allons au cinéma samedi.',
    hint:'Vérifiez l\'accord sujet-verbe dans chaque option.',
    explanation:'"<b>Mon ami et moi allons</b>" ✓ — "mon ami et moi" = nous → allons. Erreurs : (1) "Les élèves <b>font</b>" (pas fait — sujet pluriel), (2) "Tu <b>peux</b>" (pas peut — peux pour je/tu), (3) "Elle <b>se lave</b>" (pas se laves — pas de -s pour il/elle). L\'accord sujet-verbe est l\'une des zones les plus testées au PSAC.' }),

  makeMCQ({ id:'g5fr-vb-020', chapterId:'fr-verbes-present', difficulty:1,
    question:'Conjuguez "devoir" à la première personne : "Je ___ travailler ce soir."',
    options:['doit','dois','doive','devons'],
    answer:'dois',
    hint:'Devoir : je dois, tu dois, il doit, nous devons.',
    explanation:'"Je <b>dois</b> travailler." — Conjugaison de devoir : je <b>dois</b>, tu <b>dois</b>, il/elle <b>doit</b>, nous <b>devons</b>, vous <b>devez</b>, ils/elles <b>doivent</b>. Devoir exprime une obligation.' }),

  makeMCQ({ id:'g5fr-vb-021', chapterId:'fr-verbes-present', difficulty:1,
    question:'Conjuguez "pouvoir" à la deuxième personne : "Tu ___ venir demain."',
    options:['peut','pouvez','peux','puisse'],
    answer:'peux',
    hint:'Pouvoir : je peux, tu peux (attention : je/tu ont la même forme !)',
    explanation:'"Tu <b>peux</b> venir." — Conjugaison de pouvoir : je <b>peux</b>, tu <b>peux</b>, il/elle <b>peut</b>, nous <b>pouvons</b>, vous <b>pouvez</b>, ils/elles <b>peuvent</b>. Pouvoir exprime la capacité ou la permission.' }),

  makeMCQ({ id:'g5fr-vb-022', chapterId:'fr-verbes-present', difficulty:1,
    question:'Conjuguez "vouloir" à la troisième personne plurielle : "Ils ___ partir tôt."',
    options:['voulont','veulent','voulissent','veuillent'],
    answer:'veulent',
    hint:'La 3ème personne plurielle de vouloir a un radical différent : veuil-.',
    explanation:'"Ils <b>veulent</b> partir." — Conjugaison de vouloir : je veux, tu veux, il veut, nous voulons, vous voulez, ils/elles <b>veulent</b>. Notez la différence de radical : je/tu/il = veu-, nous/vous = voul-, ils = veul-.' }),

  makeTF({ id:'g5fr-vb-023', chapterId:'fr-verbes-present', difficulty:1,
    question:'"Nous devons" est la forme correcte de "devoir" pour "nous".',
    answer:true,
    hint:'La terminaison de "nous" est toujours -ons pour les verbes irréguliers.',
    explanation:'<b>Vrai.</b> "Nous <b>devons</b>" — devoir conserve la terminaison -ons pour "nous" : nous devons, nous pouvons, nous voulons. C\'est une règle générale : presque tous les verbes (même irréguliers) utilisent -ons pour "nous".' }),

  makeMCQ({ id:'g5fr-vb-024', chapterId:'fr-verbes-present', difficulty:2,
    question:'Formez le futur proche : "Demain, je ___ le musée." (aller + visiter)',
    options:['vais visiter','vais visitant','vais visité','va visiter'],
    answer:'vais visiter',
    hint:'Futur proche = aller (conjugué) + infinitif.',
    explanation:'"Je <b>vais visiter</b> le musée demain." — Futur proche = aller (au présent) + infinitif. Je <b>vais</b> + visiter. Il <b>va</b> + manger. Nous <b>allons</b> + partir. Cette structure exprime une action qui va se passer dans un avenir proche.' }),

  makeMCQ({ id:'g5fr-vb-025', chapterId:'fr-verbes-present', difficulty:2,
    question:'Que signifie "Il faut + infinitif" ?',
    options:['it is nice to','it is necessary to / one must','it is forbidden to','it is possible to'],
    answer:'it is necessary to / one must',
    hint:'"Il faut" vient du verbe "falloir" — il exprime une obligation.',
    explanation:'"<b>Il faut</b> + infinitif" = it is necessary to / one must. Exemples : Il faut manger (One must eat). Il faut travailler dur (It is necessary to work hard). "Il faut" est impersonnel — il ne change jamais : toujours "il faut".' }),

  makeMCQ({ id:'g5fr-vb-026', chapterId:'fr-verbes-present', difficulty:2,
    question:'Complétez : "Pour réussir à l\'examen, ___ réviser ses leçons."',
    options:['il faut','il fait','il faisait','il ferait'],
    answer:'il faut',
    hint:'"Il faut" exprime la nécessité.',
    explanation:'"Pour réussir, <b>il faut</b> réviser ses leçons." — "Il faut" + infinitif = it is necessary to. Autres structures similaires : il est important de + inf., il est nécessaire de + inf. "Il faut" est la plus courante et la plus directe.' }),

  makeTF({ id:'g5fr-vb-027', chapterId:'fr-verbes-present', difficulty:2,
    question:'"Il faut" peut être suivi d\'un infinitif OU de "que" + subjonctif.',
    answer:true,
    hint:'Il faut travailler. / Il faut que tu travailles.',
    explanation:'<b>Vrai.</b> Deux constructions : (1) "<b>Il faut</b> + infinitif" (sujet général) : Il faut dormir. (2) "<b>Il faut que</b> + subjonctif" (sujet spécifique) : Il faut que tu dormes. La 2ème construction permet de préciser à qui l\'obligation s\'adresse.' }),

  makeMCQ({ id:'g5fr-vb-028', chapterId:'fr-verbes-present', difficulty:2,
    question:'Complétez avec la bonne préposition : "Je ___ mes vacances." (penser à)',
    options:['pense de','pense à','pense en','pense sur'],
    answer:'pense à',
    hint:'"Penser" se construit avec "à" quand il s\'agit d\'une chose ou d\'un souvenir.',
    explanation:'"Je <b>pense à</b> mes vacances." — penser + à + chose/personne. Verbes courants avec "à" : penser à, répondre à, participer à, réussir à. Exemples : Tu penses à ta famille. Il réussit à son examen. Ne pas confondre avec "penser de" (to have an opinion about) : Qu\'est-ce que tu penses de ce film ?' }),

  makeMCQ({ id:'g5fr-vb-029', chapterId:'fr-verbes-present', difficulty:2,
    question:'Complétez : "Elle ___ partir maintenant." (avoir besoin de)',
    options:['a besoin de','a besoin d\'','a besoins de','est besoin de'],
    answer:'a besoin de',
    hint:'"Avoir besoin de" = to need. Conjuguez "avoir" pour elle.',
    explanation:'"Elle <b>a besoin de</b> partir." — avoir besoin de + infinitif = to need to. Conjugaison : j\'ai besoin de / tu as besoin de / il/elle <b>a besoin de</b> / nous avons besoin de. Exemples : J\'ai besoin de dormir. Vous avez besoin d\'aide.' }),

  makeMCQ({ id:'g5fr-vb-030', chapterId:'fr-verbes-present', difficulty:2,
    question:'Conjuguez "devoir" pour "vous" : "Vous ___ finir vos devoirs avant de sortir."',
    options:['devez','doivent','dois','doit'],
    answer:'devez',
    hint:'La forme "vous" de devoir.',
    explanation:'"Vous <b>devez</b> finir vos devoirs." — devoir : vous <b>devez</b>. Tableau complet : je dois / tu dois / il doit / nous devons / vous <b>devez</b> / ils doivent.' }),

  makeMCQ({ id:'g5fr-vb-031', chapterId:'fr-verbes-present', difficulty:2,
    question:'Futur proche : "Il ___ pleuvoir cet après-midi." (aller + pleuvoir)',
    options:['va pleuvoir','vais pleuvoir','allait pleuvoir','va pleuvant'],
    answer:'va pleuvoir',
    hint:'Aller conjugué pour "il" = va.',
    explanation:'"Il <b>va pleuvoir</b> cet après-midi." — aller pour il/elle = <b>va</b> → il va + infinitif. Autres exemples : il va faire chaud, elle va venir, ça va changer. Futur proche = aller au présent + infinitif.' }),

  makeTF({ id:'g5fr-vb-032', chapterId:'fr-verbes-present', difficulty:3,
    question:'"Je peux nager" et "Je sais nager" ont exactement le même sens.',
    answer:false,
    hint:'"Pouvoir" = to be physically able ; "savoir" = to know how to (through learning).',
    explanation:'<b>Faux.</b> "Je <b>peux</b> nager" = I am able to / I am allowed to swim (capacity/permission). "Je <b>sais</b> nager" = I know how to swim (learned skill). Exemple : "Je peux nager dans cette piscine" (permission). "Je sais nager depuis l\'âge de 5 ans" (skill learned).' }),

  makeMCQ({ id:'g5fr-vb-033', chapterId:'fr-verbes-present', difficulty:2,
    question:'"Nous allons voyager en France l\'été prochain." Quel temps est utilisé ?',
    options:['présent de l\'indicatif','futur simple','futur proche','conditionnel'],
    answer:'futur proche',
    hint:'"Aller" au présent + infinitif = futur proche.',
    explanation:'"<b>Futur proche</b>" — Structure : nous <b>allons</b> (présent d\'aller) + voyager (infinitif). Le futur proche exprime une action qui va se passer bientôt ou dans un avenir certain. Le futur simple utiliserait : nous voyagerons.' }),

  makeMCQ({ id:'g5fr-vb-034', chapterId:'fr-verbes-present', difficulty:3,
    question:'Complétez : "___ pas oublier son cartable !" (il faut, forme négative)',
    options:['Il ne faut','Il n\'faut','Il faut ne','N\'il faut'],
    answer:'Il ne faut',
    hint:'Négation de "il faut" : ne + faut + pas.',
    explanation:'"<b>Il ne faut</b> pas oublier son cartable !" — La négation de "il faut" : il ne <b>faut</b> pas. Structure complète : il ne faut pas + infinitif. Exemples : Il ne faut pas mentir. Il ne faut pas courir dans les couloirs.' }),

  makeMCQ({ id:'g5fr-vb-035', chapterId:'fr-verbes-present', difficulty:4,
    question:'"Pour garder la santé, les enfants ___ manger des fruits et légumes, ___ faire du sport et ___ boire beaucoup d\'eau." (devoir)',
    options:['doivent / doivent / doivent','devons / devons / devons','doit / doit / doit','peuvent / peuvent / peuvent'],
    answer:'doivent / doivent / doivent',
    hint:'"Les enfants" = troisième personne du pluriel.',
    explanation:'"Les enfants <b>doivent</b>" — sujet "les enfants" = ils → <b>doivent</b>. Conjugaison de devoir : ils/elles <b>doivent</b>. Les trois verbes ont le même sujet "les enfants" → doivent (répété). Une phrase multi-verbes avec le même sujet = même conjugaison.' })

);
