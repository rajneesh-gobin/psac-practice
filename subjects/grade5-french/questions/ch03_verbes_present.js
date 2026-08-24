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
    explanation:'"<b>Mon ami et moi allons</b>" ✓ — "mon ami et moi" = nous → allons. Erreurs : (1) "Les élèves <b>font</b>" (pas fait — sujet pluriel), (2) "Tu <b>peux</b>" (pas peut — peux pour je/tu), (3) "Elle <b>se lave</b>" (pas se laves — pas de -s pour il/elle). L\'accord sujet-verbe est l\'une des zones les plus testées au PSAC.' })

);
