'use strict';
// Grade 6 French — Chapitre : Le Subjonctif
// IDs format: g6fr-sjv-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-sjv-001', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'Après quelle expression utilise-t-on le subjonctif ?',
    options:['je pense que','il est certain que','il faut que','je sais que'],
    answer:'il faut que',
    hint:'"Il faut que" exprime la nécessité — il déclenche toujours le subjonctif.',
    explanation:'"<b>Il faut que</b>" → subjonctif : "Il faut que tu <b>viennes</b>." Expressions déclenchant le subjonctif : il faut que, je veux que, bien que, pour que, avant que, il est possible que. Expressions + indicatif : je pense que, il est certain que, je sais que.' }),

  makeMCQ({ id:'g6fr-sjv-002', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'Comment forme-t-on le radical du subjonctif pour les verbes réguliers ?',
    options:[
      'À partir de l\'infinitif',
      'À partir de la forme "ils" au présent, sans -ent',
      'À partir de la forme "nous" au présent, sans -ons',
      'À partir du participe passé'
    ],
    answer:'À partir de la forme "ils" au présent, sans -ent',
    hint:'Parler → ils parlent → enlève -ent → parl- → que je parle.',
    explanation:'Radical du subjonctif = forme <b>ils</b> au présent sans <b>-ent</b>. Terminaisons : <b>-e, -es, -e, -ions, -iez, -ent</b>. Exemple : parler → ils parlent → parl- → que je parle, que tu parles, qu\'il parle, que nous parlions, que vous parliez, qu\'ils parlent.' }),

  makeMCQ({ id:'g6fr-sjv-003', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'Complétez : "Il faut que tu ___ (finir) tes devoirs."',
    options:['finis','finissais','finisses','finiras'],
    answer:'finisses',
    hint:'"Il faut que" → subjonctif. Finir → ils finissent → finiss- → tu : -es.',
    explanation:'"Il faut que tu <b>finisses</b>." — finir → ils finissent → radical : finiss- → subjonctif : que je finisse, que tu <b>finisses</b>, qu\'il finisse, que nous finissions, que vous finissiez, qu\'ils finissent.' }),

  makeMCQ({ id:'g6fr-sjv-004', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'Quelle est la forme correcte de "être" au subjonctif pour "il" ?',
    options:['il est','il était','il soit','il sera'],
    answer:'il soit',
    hint:'Être est irrégulier au subjonctif : sois, sois, soit, soyons, soyez, soient.',
    explanation:'"<b>Il soit</b>" — être est totalement irrégulier au subjonctif : que je sois, que tu sois, qu\'il/elle <b>soit</b>, que nous soyons, que vous soyez, qu\'ils/elles soient. Exemple : "Il faut qu\'il <b>soit</b> à l\'heure."' }),

  makeTF({ id:'g6fr-sjv-005', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'"Je pense que" est suivi du subjonctif.',
    answer:false,
    hint:'"Je pense que" exprime une opinion — exprime-t-il un doute ou une certitude ?',
    explanation:'<b>Faux.</b> "Je pense que" est suivi de l\'<b>indicatif</b> (temps normal) : "Je pense qu\'il <b>est</b> là." Le subjonctif s\'utilise après le doute, l\'émotion, la volonté ou la nécessité — pas après les expressions de certitude.' }),

  makeMCQ({ id:'g6fr-sjv-006', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'Complétez : "Je veux que vous ___ (venir) à ma fête."',
    options:['venez','êtes venus','veniez','viendrez'],
    answer:'veniez',
    hint:'"Je veux que" → subjonctif. Venir a deux radicaux au subjonctif : vienn- (je/tu/il/ils) et ven- (nous/vous).',
    explanation:'"Je veux que vous <b>veniez</b>." — venir est légèrement irrégulier : que je vienne, tu viennes, il vienne, nous <b>venions</b>, vous <b>veniez</b>, ils viennent. "Je veux que" déclenche toujours le subjonctif.' }),

  makeMCQ({ id:'g6fr-sjv-007', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'Quelle expression ne déclenche PAS le subjonctif ?',
    options:['bien que (although)','pour que (so that)','avant que (before)','parce que (because)'],
    answer:'parce que (because)',
    hint:'"Parce que" exprime la cause — il est suivi de l\'indicatif.',
    explanation:'"<b>Parce que</b>" est suivi de l\'<b>indicatif</b> : "Il est parti parce qu\'il <b>était</b> fatigué." Expressions + subjonctif : bien que, pour que, avant que, à moins que, afin que, il faut que, je veux que.' }),

  makeMCQ({ id:'g6fr-sjv-008', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'Quelle est la forme correcte de "avoir" au subjonctif pour "qu\'il" ?',
    options:['qu\'il a','qu\'il ait','qu\'il avait','qu\'il aura'],
    answer:"qu'il ait",
    hint:'Avoir est irrégulier au subjonctif : aie, aies, ait, ayons, ayez, aient.',
    explanation:'"<b>Qu\'il ait</b>" — avoir est irrégulier au subjonctif : que j\'aie, que tu aies, qu\'il/elle <b>ait</b>, que nous ayons, que vous ayez, qu\'ils/elles aient. Exemple : "Il est possible qu\'il <b>ait</b> raison."' }),

  makeTF({ id:'g6fr-sjv-009', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'"Bien que" est toujours suivi du subjonctif.',
    answer:true,
    hint:'Les conjonctions de concession comme "bien que" déclenchent toujours le subjonctif.',
    explanation:'<b>Vrai.</b> "Bien que" déclenche toujours le subjonctif : "Bien qu\'il <b>soit</b> fatigué, il continue." Autres conjonctions + subjonctif : quoique, encore que, pour que, avant que, à moins que.' }),

  makeMCQ({ id:'g6fr-sjv-010', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'Complétez : "Il est possible qu\'elle ___ (faire) une erreur."',
    options:['fait','faisait','fasse','fera'],
    answer:'fasse',
    hint:'"Il est possible que" exprime la possibilité → subjonctif. Faire est irrégulier.',
    explanation:'"Il est possible qu\'elle <b>fasse</b> une erreur." — faire est irrégulier au subjonctif : que je fasse, que tu fasses, qu\'il/elle <b>fasse</b>, que nous fassions, que vous fassiez, qu\'ils fassent.' })

);
