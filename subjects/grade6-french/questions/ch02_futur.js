'use strict';
// Grade 6 French — Chapitre : Le Futur Simple
// IDs format: g6fr-fut-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-fut-001', chapterId:'g6fr-futur', difficulty:1,
    question:'Comment forme-t-on le futur simple des verbes réguliers en -ER et -IR ?',
    options:[
      'infinitif + terminaisons du présent',
      'infinitif + -ai, -as, -a, -ons, -ez, -ont',
      'radical du présent + -rai',
      'participe passé + terminaisons'
    ],
    answer:'infinitif + -ai, -as, -a, -ons, -ez, -ont',
    hint:'Pour "parler" : parler + ai = je parlerai.',
    explanation:'Futur simple = <b>infinitif + terminaisons</b> : <b>-ai, -as, -a, -ons, -ez, -ont</b>. Exemples : parler → je <b>parlerai</b> ; finir → tu <b>finiras</b> ; vendre → il <b>vendra</b> (on enlève le -e final des verbes en -RE).' }),

  makeMCQ({ id:'g6fr-fut-002', chapterId:'g6fr-futur', difficulty:1,
    question:'Conjuguez "parler" au futur simple pour "nous" :',
    options:['nous parlons','nous parlions','nous parlerons','nous parlerez'],
    answer:'nous parlerons',
    hint:'Infinitif + terminaison pour "nous".',
    explanation:'Parler + <b>-ons</b> = <b>nous parlerons</b>. Les terminaisons complètes : je parlerai, tu parleras, il parlera, <b>nous parlerons</b>, vous parlerez, ils parleront.' }),

  makeMCQ({ id:'g6fr-fut-003', chapterId:'g6fr-futur', difficulty:2,
    question:'Quel est le radical irrégulier du verbe "être" au futur simple ?',
    options:['êtr-','ét-','ser-','est-'],
    answer:'ser-',
    hint:'Je ___ → je serai.',
    explanation:'<b>Être → ser-</b> au futur. Conjugaison : je <b>serai</b>, tu seras, il sera, nous serons, vous serez, ils seront. Autres radicaux irréguliers : avoir → <b>aur-</b>, aller → <b>ir-</b>, faire → <b>fer-</b>, venir → <b>viendr-</b>.' }),

  makeMCQ({ id:'g6fr-fut-004', chapterId:'g6fr-futur', difficulty:2,
    question:'Conjuguez "avoir" au futur simple pour "il" :',
    options:['il aura','il avra','il aurait','il a'],
    answer:'il aura',
    hint:'Avoir → radical irrégulier aur- + terminaison pour "il".',
    explanation:'Avoir → radical <b>aur-</b> + <b>-a</b> → <b>il aura</b>. Conjugaison complète : j\'aurai, tu auras, <b>il aura</b>, nous aurons, vous aurez, ils auront.' }),

  makeTF({ id:'g6fr-fut-005', chapterId:'g6fr-futur', difficulty:1,
    question:'Pour les verbes en -RE comme "vendre", on ajoute les terminaisons du futur directement à l\'infinitif sans enlever le -e final.',
    answer:false,
    hint:'Vendre + ai = vendr + ai = vendrai.',
    explanation:'<b>Faux.</b> Pour les verbes en -RE, on <b>enlève le -e final</b> avant d\'ajouter les terminaisons. Vendre → <b>vendr</b>- → je vendrai, tu vendras, il vendra… Si on gardait le -e : "vendreai" — ce n\'est pas correct.' }),

  makeMCQ({ id:'g6fr-fut-006', chapterId:'g6fr-futur', difficulty:2,
    question:'Choisissez la forme correcte : "Demain, nous ___ (aller) à la plage."',
    options:['allons','allions','irons','allerons'],
    answer:'irons',
    hint:'Aller a un radical irrégulier au futur.',
    explanation:'"Demain, nous <b>irons</b> à la plage." — Aller → radical irrégulier <b>ir-</b> → nous <b>irons</b>. Ne pas confondre avec le futur proche : "nous <b>allons aller</b>" (futur proche) vs "nous <b>irons</b>" (futur simple).' }),

  makeMCQ({ id:'g6fr-fut-007', chapterId:'g6fr-futur', difficulty:2,
    question:'Quelle est la différence entre le futur proche et le futur simple ?',
    options:[
      'Il n\'y a aucune différence.',
      'Le futur proche (aller + infinitif) exprime un futur immédiat ; le futur simple exprime un futur plus lointain ou formel.',
      'Le futur simple est plus poli que le futur proche.',
      'Le futur proche ne s\'utilise qu\'à l\'oral.'
    ],
    answer:'Le futur proche (aller + infinitif) exprime un futur immédiat ; le futur simple exprime un futur plus lointain ou formel.',
    hint:'Comparez : "Je vais manger" vs "Je mangerai demain".',
    explanation:'<b>Futur proche</b> (aller + infinitif) : action <b>imminente ou certaine</b> : "Je <b>vais partir</b> maintenant." <b>Futur simple</b> : action <b>future, plus lointaine ou formelle</b> : "Je <b>partirai</b> l\'année prochaine." Les deux peuvent souvent s\'échanger.' }),

  makeMCQ({ id:'g6fr-fut-008', chapterId:'g6fr-futur', difficulty:2,
    question:'Complétez : "Si tu travailles bien, tu ___ (réussir) ton examen."',
    options:['réussirais','réussiras','réussiras','as réussi'],
    answer:'réussiras',
    hint:'Si + présent → futur simple dans la principale.',
    explanation:'"Si tu travailles bien, tu <b>réussiras</b> ton examen." — Structure conditionnelle : <b>si + présent</b> dans la subordonnée → <b>futur simple</b> dans la principale. <b>Attention</b> : on ne met JAMAIS le futur après "si" conditionnel.' }),

  makeTF({ id:'g6fr-fut-009', chapterId:'g6fr-futur', difficulty:2,
    question:'On peut utiliser le futur simple dans la proposition avec "si" conditionnel : "Si tu viendras, je serai content."',
    answer:false,
    hint:'Après "si" conditionnel, quel temps utilise-t-on ?',
    explanation:'<b>Faux.</b> Après "si" conditionnel, on utilise le <b>présent</b>, jamais le futur. Forme correcte : "Si tu <b>viens</b>, je serai content." — si + présent → futur dans la principale.' }),

  makeMCQ({ id:'g6fr-fut-010', chapterId:'g6fr-futur', difficulty:2,
    question:'Conjuguez "faire" au futur simple pour "vous" :',
    options:['vous ferez','vous farez','vous ferez','vous feriez'],
    answer:'vous ferez',
    hint:'Faire → radical irrégulier fer- + terminaison pour "vous".',
    explanation:'Faire → radical irrégulier <b>fer-</b> + <b>-ez</b> → <b>vous ferez</b>. Conjugaison : je ferai, tu feras, il fera, nous ferons, <b>vous ferez</b>, ils feront.' })

);
