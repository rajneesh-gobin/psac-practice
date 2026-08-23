'use strict';
// Grade 6 French — Chapter: Le Futur Simple
// IDs format: g6fr-fut-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-fut-001', chapterId:'g6fr-futur', difficulty:1,
    question:'How is the FUTUR SIMPLE formed for regular -ER and -IR verbs?',
    options:[
      'stem + present endings',
      'infinitive + futur endings (-ai, -as, -a, -ons, -ez, -ont)',
      'past participle + endings',
      'nous present form + endings'
    ],
    answer:'infinitive + futur endings (-ai, -as, -a, -ons, -ez, -ont)',
    hint:'For regular verbs, keep the full infinitive and add the endings directly.',
    explanation:'Futur simple = <b>infinitive + endings</b>: -ai, -as, -a, -ons, -ez, -ont. Example: parler → je <b>parlerai</b>, tu parleras, il parlera, nous parlerons, vous parlerez, ils parleront. (-RE verbs drop the final -e first: vendre → vendr- → je vendrai.)' }),

  makeMCQ({ id:'g6fr-fut-002', chapterId:'g6fr-futur', difficulty:2,
    question:'Complete: "Demain, elle ___ (partir) en vacances."',
    options:['parte','est partie','partira','partait'],
    answer:'partira',
    hint:'Futur simple of partir: partir → partir + -a (il/elle form) = partira.',
    explanation:'"elle <b>partira</b>" — partir is a regular -IR verb in the futur. Stem = partir (keep the full infinitive). elle → -a ending: partir + a = <b>partira</b>. "Demain" is a future time clue.' }),

  makeMCQ({ id:'g6fr-fut-003', chapterId:'g6fr-futur', difficulty:2,
    question:'What is the irregular futur stem of "aller"?',
    options:['aller-','all-','ir-','va-'],
    answer:'ir-',
    hint:'Aller is completely irregular — its futur stem looks like a different verb.',
    explanation:'Aller → futur stem: <b>ir-</b>. So: j\'<b>ir</b>ai, tu iras, il ira, nous irons, vous irez, ils iront. Other irregular stems: être→ser-, avoir→aur-, faire→fer-, pouvoir→pourr-, vouloir→voudr-, venir→viendr-.' }),

  makeMCQ({ id:'g6fr-fut-004', chapterId:'g6fr-futur', difficulty:2,
    question:'Complete: "Vous ___ (avoir) les résultats lundi."',
    options:['avez','aurez','aviez','auriez'],
    answer:'aurez',
    hint:'Avoir is irregular in the futur. Its stem is "aur-".',
    explanation:'"Vous <b>aurez</b>" — avoir → futur stem: <b>aur-</b>. vous form: aur + -ez = <b>aurez</b>. Full futur of avoir: j\'aurai, tu auras, il aura, nous aurons, vous aurez, ils auront.' }),

  makeTF({ id:'g6fr-fut-005', chapterId:'g6fr-futur', difficulty:1,
    question:'The futur simple of "être" uses the stem "ser-".',
    answer:true,
    hint:'Je serai, tu seras, il sera... what is the stem?',
    explanation:'<b>Vrai (True).</b> Être → futur stem: <b>ser-</b>. Full conjugation: je serai, tu seras, il/elle sera, nous serons, vous serez, ils/elles seront. "Demain, il sera à Paris." (Tomorrow, he will be in Paris.)' }),

  makeMCQ({ id:'g6fr-fut-006', chapterId:'g6fr-futur', difficulty:2,
    question:'Complete: "Nous ___ (faire) un pique-nique s\'il fait beau."',
    options:['faisions','avons fait','ferons','faisons'],
    answer:'ferons',
    hint:'Faire is irregular in the futur. Its stem is "fer-".',
    explanation:'"Nous <b>ferons</b>" — faire → futur stem: <b>fer-</b>. nous: fer + -ons = ferons. Full futur of faire: je ferai, tu feras, il fera, nous ferons, vous ferez, ils feront.' }),

  makeMCQ({ id:'g6fr-fut-007', chapterId:'g6fr-futur', difficulty:2,
    question:'What is the difference between "futur proche" and "futur simple"?',
    options:[
      'They are identical — there is no difference.',
      'Futur proche (aller + inf.) = imminent/near future; futur simple = more distant or formal future.',
      'Futur simple is only used in spoken French.',
      'Futur proche is only used in written French.'
    ],
    answer:'Futur proche (aller + inf.) = imminent/near future; futur simple = more distant or formal future.',
    hint:'Think of "I am going to eat now" vs "I will eat dinner tomorrow evening".',
    explanation:'<b>Futur proche</b> (aller + infinitive): near/planned future — "Je vais manger maintenant." <b>Futur simple</b>: more distant or formal — "Un jour, je voyagerai le monde." In everyday speech, futur proche is more common; futur simple is more formal.' }),

  makeMCQ({ id:'g6fr-fut-008', chapterId:'g6fr-futur', difficulty:2,
    question:'Complete: "S\'il pleut, je ___ (rester) à la maison."',
    options:['restais','reste','resterai','resterais'],
    answer:'resterai',
    hint:'Si (if) + present → futur simple (real condition, like English Type 1).',
    explanation:'"je <b>resterai</b>" — in French, after "si" (if) expressing a real condition: si + present → futur simple in the main clause. This mirrors English Type 1 conditional: "If it rains, I will stay home." Never use futur after si.' }),

  makeTF({ id:'g6fr-fut-009', chapterId:'g6fr-futur', difficulty:2,
    question:'It is correct to use the futur simple immediately after "si" (if).',
    answer:false,
    hint:'"Si" is followed by the present tense, not the future.',
    explanation:'<b>Faux (False).</b> After "si" (if) in a real conditional, French uses the <b>present tense</b>, NOT the futur: "Si il <b>fait</b> beau, nous <b>irons</b> à la plage." The main clause uses the futur, but the si-clause uses the present.' }),

  makeMCQ({ id:'g6fr-fut-010', chapterId:'g6fr-futur', difficulty:2,
    question:'Complete: "Ils ___ (venir) nous rendre visite la semaine prochaine."',
    options:['venaient','sont venus','viendront','viennent'],
    answer:'viendront',
    hint:'Venir is irregular in the futur. Its stem is "viendr-".',
    explanation:'"Ils <b>viendront</b>" — venir → futur stem: <b>viendr-</b>. ils: viendr + -ont = viendront. "La semaine prochaine" (next week) confirms future tense. Full futur: je viendrai, tu viendras, il viendra, nous viendrons, vous viendrez, ils viendront.' })

);
