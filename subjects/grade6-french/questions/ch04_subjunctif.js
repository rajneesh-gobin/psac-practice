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

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-sjv-011', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'Conjuguez "prendre" au subjonctif pour "que nous" :',
    options:['que nous prenons','que nous prenions','que nous prennions','que nous prendrons'],
    answer:'que nous prenions',
    hint:'Prendre → ils prennent → prenn- (pour je/tu/il/ils) MAIS pour nous/vous : nous prenons → pren-.',
    explanation:'"Que nous <b>prenions</b>." — Prendre a deux radicaux au subjonctif : radical <b>prenn-</b> (de ils prennent) pour je/tu/il/ils, et radical <b>pren-</b> (de nous prenons) pour nous/vous. Conjugaison : que je prenne, tu prennes, il prenne, <b>nous prenions</b>, vous preniez, ils prennent. De même pour : venir, tenir, boire, croire.' }),

  makeTF({ id:'g6fr-sjv-012', chapterId:'g6fr-subjunctif', difficulty:1,
    question:'"Pour que" est toujours suivi du subjonctif.',
    answer:true,
    hint:'"Pour que" exprime le but ou la finalité — c\'est une conjonction de but.',
    explanation:'<b>Vrai.</b> "<b>Pour que</b>" (so that / in order that) exprime le but et est toujours suivi du <b>subjonctif</b> : "Il parle lentement <b>pour que</b> nous <b>comprenions</b>." Autres conjonctions de but + subjonctif : afin que, de peur que (+ ne). Conjonctions similaires + indicatif : parce que, puisque, car (cause).' }),

  makeMCQ({ id:'g6fr-sjv-013', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'Complétez : "Je suis content que tu ___ (venir) à ma fête."',
    options:['viens','viendras','viennes','venais'],
    answer:'viennes',
    hint:'"Je suis content que" exprime une émotion → subjonctif. Venir est irrégulier.',
    explanation:'"Je suis content que tu <b>viennes</b>." — Les expressions d\'<b>émotion</b> déclenchent le subjonctif : être content que, être triste que, être surpris que, avoir peur que, regretter que. Venir est irrégulier : que je vienne, que tu <b>viennes</b>, qu\'il vienne, que nous venions, que vous veniez, qu\'ils viennent.' }),

  makeMCQ({ id:'g6fr-sjv-014', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'Quelle est la forme correcte de "aller" au subjonctif pour "que tu" ?',
    options:['que tu ailles','que tu iras','que tu vas','que tu aillais'],
    answer:'que tu ailles',
    hint:'Aller est totalement irrégulier au subjonctif : ill- (je/tu/il/ils) et all- (nous/vous).',
    explanation:'"Que tu <b>ailles</b>" — aller est irrégulier : que j\'aille, que tu <b>ailles</b>, qu\'il aille, que nous allions, que vous alliez, qu\'ils aillent. Deux radicaux : <b>aill-</b> (je, tu, il, ils) et <b>all-</b> (nous, vous). Exemple : "Il faut que tu <b>ailles</b> chez le médecin."' }),

  makeMCQ({ id:'g6fr-sjv-015', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'Quel verbe de la liste NE déclenche PAS le subjonctif ?',
    options:['douter que','espérer que','craindre que','souhaiter que'],
    answer:'espérer que',
    hint:'"Espérer" exprime un espoir certain → indicatif (futur ou présent). Les autres expriment le doute ou l\'émotion.',
    explanation:'"<b>Espérer que</b>" est suivi de l\'<b>indicatif</b> (futur simple à l\'affirmatif) : "J\'espère que tu <b>viendras</b>." Les autres déclenchent le subjonctif : douter que (doute), craindre que (peur), souhaiter que (souhait). Attention : "espérer que" + indicatif ; "souhaiter que" + subjonctif — cette distinction est fréquente dans les épreuves PSAC de 6e.' }),

  makeMCQ({ id:'g6fr-sjv-016', chapterId:'g6fr-subjunctif', difficulty:3,
    question:'Conjuguez "savoir" au subjonctif pour "que vous" :',
    options:['que vous sachiez','que vous savez','que vous saurez','que vous saviez'],
    answer:'que vous sachiez',
    hint:'Savoir est irrégulier au subjonctif : sach- + terminaisons.',
    explanation:'"Que vous <b>sachiez</b>." — Savoir est irrégulier au subjonctif : que je sache, que tu saches, qu\'il sache, que nous sachions, que <b>vous sachiez</b>, qu\'ils sachent. Exemple : "Il faut que vous <b>sachiez</b> la vérité." Autres irréguliers importants à retenir : être → sois/soit/soyons, avoir → aie/ait/ayons, aller → aille/ailles, faire → fasse.' }),

  makeTF({ id:'g6fr-sjv-017', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'"Avant que" est suivi du subjonctif, mais "après que" est suivi de l\'indicatif.',
    answer:true,
    hint:'Avant que = action qui n\'a pas encore eu lieu (incertitude) → subjonctif. Après que = action passée et certaine → indicatif.',
    explanation:'<b>Vrai.</b> "<b>Avant que</b>" + subjonctif : "Pars <b>avant qu\'il</b> <b>parte</b>." — l\'action est à venir, donc incertaine. "<b>Après que</b>" + indicatif (en principe) : "Je partirai <b>après qu\'il</b> <b>est</b> arrivé." — l\'action est passée et réelle. Attention : dans la pratique, "après que" + subjonctif est de plus en plus courant dans la langue parlée, mais les règles scolaires du manuel MIE maintiennent l\'indicatif.' }),

  makeMCQ({ id:'g6fr-sjv-018', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'Complétez avec le bon mode : "Il est important que chacun ___ (respecter) l\'environnement."',
    options:['respecte','respectera','respectait','a respecté'],
    answer:'respecte',
    hint:'"Il est important que" = expression d\'obligation/nécessité → subjonctif.',
    explanation:'"Il est important que chacun <b>respecte</b> l\'environnement." — "<b>Il est important que</b>" déclenche le subjonctif. Autres expressions impersonnelles + subjonctif : il est nécessaire que, il est urgent que, il est indispensable que, il est dommage que, il est possible que. Structure : pronom "que" + sujet + subjonctif.' }),

  makeMCQ({ id:'g6fr-sjv-019', chapterId:'g6fr-subjunctif', difficulty:4,
    question:'Dans quelle phrase le subjonctif est-il utilisé INCORRECTEMENT ?',
    options:[
      '"Il faut que tu finisses tes devoirs."',
      '"Je suis sûr qu\'il soit là." ✗',
      '"Bien qu\'il soit fatigué, il continue."',
      '"Je veux que vous veniez."'
    ],
    answer:'"Je suis sûr qu\'il soit là." ✗',
    hint:'"Je suis sûr que" exprime une certitude → indicatif, pas subjonctif.',
    explanation:'"Je suis sûr qu\'il <b>est</b> là" est la forme correcte — pas le subjonctif. "<b>Je suis sûr que</b>" exprime une certitude → <b>indicatif</b>. Règle générale : <b>certitude → indicatif</b> (je suis sûr que, je sais que, il est évident que, il est certain que) ; <b>doute/émotion/volonté/nécessité → subjonctif</b>. C\'est l\'une des erreurs les plus fréquentes dans les rédactions de 6e.' })

);
