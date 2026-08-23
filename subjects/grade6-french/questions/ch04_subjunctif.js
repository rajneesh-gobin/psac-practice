'use strict';
// Grade 6 French — Chapter: Le Subjonctif
// IDs format: g6fr-sjv-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-sjv-001', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'After which expression is the SUBJONCTIF required?',
    options:['je pense que','il est certain que','il faut que','je sais que'],
    answer:'il faut que',
    hint:'"Il faut que" expresses necessity — it always triggers the subjunctive.',
    explanation:'"<b>Il faut que</b>" triggers the subjunctive: "Il faut que tu <b>viennes</b>." Expressions requiring subjunctive: il faut que, je veux que, bien que, pour que, avant que, il est possible que. Expressions NOT requiring it (followed by indicative): je pense que, il est certain que, je sais que.' }),

  makeMCQ({ id:'g6fr-sjv-002', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'How is the subjunctive stem formed for regular verbs?',
    options:[
      'From the infinitive',
      'From the "ils" present form, remove -ent',
      'From the "nous" present form, remove -ons',
      'From the past participle'
    ],
    answer:'From the "ils" present form, remove -ent',
    hint:'Parler → ils parlent → remove -ent → parl- → que je parle.',
    explanation:'Subjunctive stem = <b>ils present form minus -ent</b>. Then add endings: <b>-e, -es, -e, -ions, -iez, -ent</b>. Example: parler → ils parlent → parl- → que je parle, que tu parles, qu\'il parle, que nous parlions, que vous parliez, qu\'ils parlent.' }),

  makeMCQ({ id:'g6fr-sjv-003', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'Complete: "Il faut que tu ___ (finir) tes devoirs."',
    options:['finis','finissais','finisses','finiras'],
    answer:'finisses',
    hint:'"Il faut que" → subjunctive. Finir → ils finissent → finiss- → tu: -es.',
    explanation:'"Il faut que tu <b>finisses</b>." — finir → ils finissent → stem: finiss- → subjunctive: que je finisse, que tu <b>finisses</b>, qu\'il finisse, que nous finissions, que vous finissiez, qu\'ils finissent.' }),

  makeMCQ({ id:'g6fr-sjv-004', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'What is the subjunctive of "être" for "il"?',
    options:['il est','il était','il soit','il sera'],
    answer:'il soit',
    hint:'Être has an irregular subjunctive: sois, sois, soit, soyons, soyez, soient.',
    explanation:'"<b>Il soit</b>" — être is completely irregular in the subjunctive: que je sois, que tu sois, qu\'il/elle <b>soit</b>, que nous soyons, que vous soyez, qu\'ils/elles soient. Example: "Il faut qu\'il soit à l\'heure."' }),

  makeTF({ id:'g6fr-sjv-005', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'"Je pense que" is followed by the subjunctive in French.',
    answer:false,
    hint:'"Je pense que" expresses an opinion or belief — does it express doubt or uncertainty?',
    explanation:'<b>Faux (False).</b> "Je pense que" (I think that) is followed by the <b>indicative</b> (normal tense), not the subjunctive: "Je pense qu\'il <b>est</b> là." The subjunctive is used after doubt, emotion, wish or necessity — not after expressions of certainty or belief.' }),

  makeMCQ({ id:'g6fr-sjv-006', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'Complete: "Je veux que vous ___ (venir) à ma fête."',
    options:['venez','êtes venus','veniez','viendrez'],
    answer:'veniez',
    hint:'"Je veux que" → subjunctive. Venir → ils viennent → stem: vienn- (for most forms) / ven- (for nous/vous).',
    explanation:'"Je veux que vous <b>veniez</b>." — venir is slightly irregular in subjunctive (two stems): que je vienne, tu viennes, il vienne, nous <b>venions</b>, vous <b>veniez</b>, ils viennent. "Je veux que" always triggers subjunctive.' }),

  makeMCQ({ id:'g6fr-sjv-007', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'Which expression does NOT trigger the subjunctive?',
    options:['bien que (although)','pour que (so that)','avant que (before)','parce que (because)'],
    answer:'parce que (because)',
    hint:'"Parce que" expresses cause/reason — it is followed by the indicative.',
    explanation:'"<b>Parce que</b>" is followed by the <b>indicative</b>: "Il est parti parce qu\'il <b>était</b> fatigué." Subjunctive triggers: bien que (although), pour que (so that), avant que (before), à moins que (unless), afin que (in order that).' }),

  makeMCQ({ id:'g6fr-sjv-008', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'What is the subjunctive of "avoir" for "qu\'il"?',
    options:['qu\'il a','qu\'il ait','qu\'il avait','qu\'il aura'],
    answer:"qu'il ait",
    hint:'Avoir is irregular in the subjunctive: aie, aies, ait, ayons, ayez, aient.',
    explanation:'"<b>Qu\'il ait</b>" — avoir is irregular in the subjunctive: que j\'aie, que tu aies, qu\'il/elle <b>ait</b>, que nous ayons, que vous ayez, qu\'ils/elles aient. Example: "Il est possible qu\'il ait raison."' }),

  makeTF({ id:'g6fr-sjv-009', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'"Bien que" (although) is always followed by the subjunctive.',
    answer:true,
    hint:'Concessive conjunctions like "bien que" always require the subjunctive.',
    explanation:'<b>Vrai (True).</b> "Bien que" always triggers the subjunctive: "Bien qu\'il <b>soit</b> fatigué, il continue." (Although he is tired, he continues.) Other concessive conjunctions + subjunctive: quoique, encore que.' }),

  makeMCQ({ id:'g6fr-sjv-010', chapterId:'g6fr-subjunctif', difficulty:2,
    question:'Complete: "Il est possible qu\'elle ___ (faire) une erreur."',
    options:['fait','faisait','fasse','fera'],
    answer:'fasse',
    hint:'"Il est possible que" expresses possibility → subjunctive. Faire is irregular.',
    explanation:'"Il est possible qu\'elle <b>fasse</b> une erreur." — faire is irregular in the subjunctive: que je fasse, que tu fasses, qu\'il/elle <b>fasse</b>, que nous fassions, que vous fassiez, qu\'ils fassent.' })

);
