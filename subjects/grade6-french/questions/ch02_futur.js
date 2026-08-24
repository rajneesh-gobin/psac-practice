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

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-fut-011', chapterId:'g6fr-futur', difficulty:2,
    question:'Conjuguez "venir" au futur simple pour "je" :',
    options:['je viendrai','je venrai','je venirai','je viendrerai'],
    answer:'je viendrai',
    hint:'Venir a un radical irrégulier au futur : viendr-.',
    explanation:'Venir → radical irrégulier <b>viendr-</b> → + terminaison <b>-ai</b> → <b>je viendrai</b>. Conjugaison complète : <b>je viendrai</b>, tu viendras, il viendra, nous viendrons, vous viendrez, ils viendront. Même radical pour "tenir" → je tiendrai. Ne pas confondre avec le conditionnel (je <b>viendrais</b>) qui se forme pareil mais avec les terminaisons -ais/-ait/-aient.' }),

  makeMCQ({ id:'g6fr-fut-012', chapterId:'g6fr-futur', difficulty:2,
    question:'Conjuguez "pouvoir" au futur simple pour "ils" :',
    options:['ils pourront','ils pourraient','ils peuvent','ils pouvront'],
    answer:'ils pourront',
    hint:'Pouvoir → radical irrégulier pourr- + terminaison -ont.',
    explanation:'Pouvoir → radical irrégulier <b>pourr-</b> → + terminaison <b>-ont</b> → <b>ils pourront</b>. Conjugaison : je pourrai, tu pourras, il pourra, nous pourrons, vous pourrez, <b>ils pourront</b>. Autres radicaux irréguliers importants : savoir → <b>saur-</b>, voir → <b>verr-</b>, courir → <b>courr-</b>.' }),

  makeTF({ id:'g6fr-fut-013', chapterId:'g6fr-futur', difficulty:1,
    question:'Le radical du futur simple de "aller" est "ir-".',
    answer:true,
    hint:'Je ___ → je irai. Que donne "ir-" + "-ai" ?',
    explanation:'<b>Vrai.</b> Aller → radical irrégulier <b>ir-</b> au futur simple. Conjugaison : <b>j\'irai</b>, tu iras, il ira, nous irons, vous irez, ils iront. Ne pas confondre avec "je vais" (présent) ou "je suis allé" (passé composé). "Ir-" est aussi le début de "il" en futur proche : "il va aller" ≠ "il ira" (futur simple).' }),

  makeMCQ({ id:'g6fr-fut-014', chapterId:'g6fr-futur', difficulty:2,
    question:'Complétez : "L\'année prochaine, nous ___ (étudier) à l\'université."',
    options:['étudions','étudierons','étudiions','avons étudié'],
    answer:'étudierons',
    hint:'"L\'année prochaine" indique un futur → futur simple. Étudier est un verbe régulier en -er.',
    explanation:'"L\'année prochaine, nous <b>étudierons</b> à l\'université." — Étudier → infinitif + terminaison -ons → étudier + <b>-ons</b> → nous <b>étudierons</b>. Indicateurs temporels du futur simple : <b>l\'année prochaine, demain, bientôt, dans dix ans, un jour, lorsque + futur</b>. Le manuel MIE de 6e insiste sur la reconnaissance de ces marqueurs.' }),

  makeMCQ({ id:'g6fr-fut-015', chapterId:'g6fr-futur', difficulty:2,
    question:'Conjuguez "vouloir" au futur simple pour "tu" :',
    options:['tu voudras','tu voulras','tu voudrais','tu veuxras'],
    answer:'tu voudras',
    hint:'Vouloir → radical irrégulier voudr- + terminaison pour "tu".',
    explanation:'Vouloir → radical irrégulier <b>voudr-</b> → + terminaison <b>-as</b> → <b>tu voudras</b>. Conjugaison complète : je voudrai, <b>tu voudras</b>, il voudra, nous voudrons, vous voudrez, ils voudront. À apprendre par cœur : aller→ir-, être→ser-, avoir→aur-, faire→fer-, aller→ir-, pouvoir→pourr-, vouloir→<b>voudr-</b>, venir→viendr-, voir→verr-, savoir→saur-.' }),

  makeMCQ({ id:'g6fr-fut-016', chapterId:'g6fr-futur', difficulty:2,
    question:'Quelle structure utilise-t-on après "quand" dans une phrase avec deux actions futures ?',
    options:[
      '"Quand je rentrerai, je mangerai." (futur + futur)',
      '"Quand je rentrerai, je mangerais." (futur + conditionnel)',
      '"Quand je rentrais, je mangerai." (imparfait + futur)',
      '"Quand je rentrerai, je mange." (futur + présent)'
    ],
    answer:'"Quand je rentrerai, je mangerai." (futur + futur)',
    hint:'Après "quand" dans une phrase de sens futur, on utilise le futur simple — pas le présent comme en anglais.',
    explanation:'"Quand je <b>rentrerai</b>, je <b>mangerai</b>." — En français, après <b>quand, lorsque, dès que, aussitôt que, tant que</b> dans un contexte futur, on utilise le <b>futur simple</b> (pas le présent comme en anglais "when I get home, I will eat"). C\'est une règle importante du manuel MIE de 6e qui diffère de l\'anglais.' }),

  makeMCQ({ id:'g6fr-fut-017', chapterId:'g6fr-futur', difficulty:2,
    question:'Conjuguez "savoir" au futur simple pour "elle" :',
    options:['elle saura','elle savra','elle saurait','elle savera'],
    answer:'elle saura',
    hint:'Savoir → radical irrégulier saur- + terminaison pour "il/elle".',
    explanation:'Savoir → radical irrégulier <b>saur-</b> → + terminaison <b>-a</b> → <b>elle saura</b>. Conjugaison : je saurai, tu sauras, <b>il/elle saura</b>, nous saurons, vous saurez, ils sauront. Attention : ne pas confondre avec "elle savait" (imparfait) ou "elle sache" (subjonctif).' }),

  makeTF({ id:'g6fr-fut-018', chapterId:'g6fr-futur', difficulty:2,
    question:'On peut utiliser le futur simple pour exprimer un ordre ou une instruction ferme.',
    answer:true,
    hint:'Exemple : "Vous ferez l\'exercice numéro 3 pour lundi."',
    explanation:'<b>Vrai.</b> Le futur simple peut exprimer un <b>ordre ou une instruction</b>, surtout à l\'écrit formel : "Vous <b>rendrez</b> votre devoir vendredi." / "Tu <b>rangeras</b> ta chambre avant de sortir." Cette valeur est proche de l\'impératif mais plus formelle. Le manuel MIE de 6e cite aussi l\'usage du futur dans les recettes ("vous <b>ajouterez</b>...") et les instructions officielles.' }),

  makeMCQ({ id:'g6fr-fut-019', chapterId:'g6fr-futur', difficulty:3,
    question:'Conjuguez "recevoir" au futur simple pour "nous" :',
    options:['nous recevrons','nous recevrions','nous recevrons','nous recerons'],
    answer:'nous recevrons',
    hint:'Recevoir → radical irrégulier recevr- + terminaison -ons.',
    explanation:'Recevoir → radical irrégulier <b>recevr-</b> → + terminaison <b>-ons</b> → <b>nous recevrons</b>. Conjugaison : je recevrai, tu recevras, il recevra, <b>nous recevrons</b>, vous recevrez, ils recevront. De même : apercevoir → nous apercevrons, décevoir → nous décevrons. Groupe des verbes en -cevoir : radical = -cevr-.' })

);
