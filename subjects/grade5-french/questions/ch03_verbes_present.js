'use strict';
// Grade 5 French — Chapter: Les Verbes au Présent
// IDs format: g5fr-vb-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-vb-001', chapterId:'fr-verbes-present', difficulty:1,
    question:'Complete: "Je ___ (parler) français."',
    options:['parles','parlez','parle','parlons'],
    answer:'parle',
    hint:'-ER verbs: je → remove -er, add -e. je parle, tu parles, il parle...',
    explanation:'"Je <b>parle</b>" — for -ER verbs, the "je" form removes -er and adds <b>-e</b>: parler → je parle. The conjugation: je parle, tu parles, il/elle parle, nous parlons, vous parlez, ils/elles parlent.' }),

  makeMCQ({ id:'g5fr-vb-002', chapterId:'fr-verbes-present', difficulty:1,
    question:'Complete: "Nous ___ (manger) du pain."',
    options:['mange','manges','mangeons','mangez'],
    answer:'mangeons',
    hint:'"Nous" form of -ER verbs: remove -er, add -ons. Note: manger keeps the -e before -ons.',
    explanation:'"Nous <b>mangeons</b>" — the nous form of -ER verbs adds -ons. For verbs ending in -ger (manger, nager), we add -e before -ons to keep the soft g sound: nous mangeons, nous nageons.' }),

  makeMCQ({ id:'g5fr-vb-003', chapterId:'fr-verbes-present', difficulty:1,
    question:'Complete: "Il ___ (être) médecin."',
    options:['es','suis','est','sont'],
    answer:'est',
    hint:'Être is irregular. il/elle → ?',
    explanation:'"Il <b>est</b>" — être (to be) is completely irregular: je suis, tu es, il/elle <b>est</b>, nous sommes, vous êtes, ils/elles sont. "Il est médecin" = He is a doctor.' }),

  makeMCQ({ id:'g5fr-vb-004', chapterId:'fr-verbes-present', difficulty:1,
    question:'Complete: "Vous ___ (avoir) un chien."',
    options:['avons','a','as','avez'],
    answer:'avez',
    hint:'Avoir (to have): je, tu, il, nous, vous, ils → ai, as, a, avons, avez, ont',
    explanation:'"Vous <b>avez</b>" — avoir (to have) conjugation: j\'ai, tu as, il/elle a, nous avons, vous <b>avez</b>, ils/elles ont. "Vous avez un chien" = You have a dog.' }),

  makeMCQ({ id:'g5fr-vb-005', chapterId:'fr-verbes-present', difficulty:2,
    question:'Complete: "Ils ___ (aller) à l\'école."',
    options:['va','allons','vont','allez'],
    answer:'vont',
    hint:'Aller (to go): je vais, tu vas, il va, nous allons, vous allez, ils ___',
    explanation:'"Ils <b>vont</b>" — aller (to go) is irregular: je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles <b>vont</b>. "Ils vont à l\'école" = They go to school.' }),

  makeMCQ({ id:'g5fr-vb-006', chapterId:'fr-verbes-present', difficulty:2,
    question:'Complete: "Tu ___ (finir) tes devoirs."',
    options:['finis','finit','finissons','finissez'],
    answer:'finis',
    hint:'-IR verbs: je/tu → remove -ir, add -is. il → -it, nous → -issons...',
    explanation:'"Tu <b>finis</b>" — -IR verbs: je finis, tu <b>finis</b>, il/elle finit, nous finissons, vous finissez, ils/elles finissent. "Tu finis tes devoirs" = You finish your homework.' }),

  makeMCQ({ id:'g5fr-vb-007', chapterId:'fr-verbes-present', difficulty:2,
    question:'Complete: "Elle ___ (faire) la cuisine."',
    options:['fais','faites','fait','font'],
    answer:'fait',
    hint:'Faire (to do/make): je fais, tu fais, il/elle ___, nous faisons, vous faites, ils font.',
    explanation:'"Elle <b>fait</b>" — faire is irregular: je fais, tu fais, il/elle <b>fait</b>, nous faisons, vous faites, ils/elles font. "Elle fait la cuisine" = She does the cooking.' }),

  makeTF({ id:'g5fr-vb-008', chapterId:'fr-verbes-present', difficulty:1,
    question:'The correct form of "parler" for "nous" is "nous parlons".',
    answer:true,
    hint:'-ER verbs: nous form always ends in -ons.',
    explanation:'<b>Vrai (True).</b> For all -ER verbs, the nous form adds <b>-ons</b>: nous parlons, nous mangeons, nous jouons, nous aimons. This pattern applies to most regular -ER verbs.' }),

  makeMCQ({ id:'g5fr-vb-009', chapterId:'fr-verbes-present', difficulty:2,
    question:'Which sentence is CORRECT?',
    options:[
      'Je suis douze ans.',
      'J\'ai douze ans.',
      'Je fais douze ans.',
      'Je vais douze ans.'
    ],
    answer:"J'ai douze ans.",
    hint:'In French, you "have" years, not "are" years old. Which verb means "to have"?',
    explanation:'"<b>J\'ai douze ans</b>" — In French, age uses the verb <b>avoir</b> (to have): "J\'ai 12 ans" = I am 12 years old (literally "I have 12 years"). In English we "be" an age; in French we "have" an age.' }),

  makeMCQ({ id:'g5fr-vb-010', chapterId:'fr-verbes-present', difficulty:2,
    question:'Complete: "Nous ___ (être) à Maurice."',
    options:['est','sont','sommes','êtes'],
    answer:'sommes',
    hint:'Être: je suis, tu es, il est, nous ___, vous êtes, ils sont.',
    explanation:'"Nous <b>sommes</b>" — être (to be): je suis, tu es, il est, nous <b>sommes</b>, vous êtes, ils sont. "Nous sommes à Maurice" = We are in Mauritius.' })

);
