'use strict';
// Grade 5 French — Chapter: Le Passé Composé
// IDs format: g5fr-pc-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-pc-001', chapterId:'fr-passe-compose', difficulty:1,
    question:'What is the structure of the passé composé?',
    options:[
      'subject + verb stem + ending',
      'subject + avoir/être (present) + past participle',
      'subject + past participle only',
      'subject + would + infinitive'
    ],
    answer:'subject + avoir/être (present) + past participle',
    hint:'It takes two parts: a helper verb (avoir or être) plus the past participle.',
    explanation:'The <b>passé composé</b> = subject + <b>avoir or être</b> (in present tense) + <b>past participle</b>. Example: J\'<b>ai mangé</b> (I ate/have eaten). Elle <b>est allée</b> (She went/has gone).' }),

  makeMCQ({ id:'g5fr-pc-002', chapterId:'fr-passe-compose', difficulty:1,
    question:'What is the past participle of "parler"?',
    options:['parlu','parlé','parlait','parle'],
    answer:'parlé',
    hint:'-ER verbs: remove -er, add -é. parl + é = ?',
    explanation:'"<b>Parlé</b>" — for -ER verbs, the past participle is formed by removing -er and adding <b>-é</b>: parler→parlé, manger→mangé, jouer→joué, aimer→aimé.' }),

  makeMCQ({ id:'g5fr-pc-003', chapterId:'fr-passe-compose', difficulty:2,
    question:'Complete: "Nous ___ ___ du pain." (we ate — manger)',
    options:['avons mangé','sommes mangé','avons mangé','ont mangé'],
    answer:'avons mangé',
    hint:'Manger uses avoir. Nous form of avoir = avons. Past participle of manger = mangé.',
    explanation:'"Nous <b>avons mangé</b> du pain" — most verbs use avoir: nous avons + mangé. "Avons" is the nous form of avoir (j\'ai, tu as, il a, nous avons, vous avez, ils ont).' }),

  makeMCQ({ id:'g5fr-pc-004', chapterId:'fr-passe-compose', difficulty:2,
    question:'Complete: "Elle ___ ___ à Paris." (she went — aller)',
    options:['a allé','est allé','est allée','a allée'],
    answer:'est allée',
    hint:'Aller uses être (DR MRS VAN DER TRAMP). With être, the participle agrees with the subject. Elle = feminine singular → add -e.',
    explanation:'"Elle <b>est allée</b>" — aller uses <b>être</b> as the helper verb. With être, the past participle agrees with the subject: elle (feminine singular) → allé + e = <b>allée</b>. Il est allé. Ils sont allés. Elles sont allées.' }),

  makeMCQ({ id:'g5fr-pc-005', chapterId:'fr-passe-compose', difficulty:1,
    question:'What is the past participle of "finir"?',
    options:['finu','finié','fini','finit'],
    answer:'fini',
    hint:'-IR verbs: remove -ir, add -i.',
    explanation:'"<b>Fini</b>" — for -IR verbs, remove -ir and add <b>-i</b>: finir→fini, choisir→choisi, dormir→dormi.' }),

  makeMCQ({ id:'g5fr-pc-006', chapterId:'fr-passe-compose', difficulty:2,
    question:'Which verb uses ÊTRE (not avoir) in the passé composé?',
    options:['manger','travailler','partir','parler'],
    answer:'partir',
    hint:'DR MRS VAN DER TRAMP verbs use être. Does "partir" (to leave) appear in that list?',
    explanation:'"<b>Partir</b>" uses être. The DR MRS VAN DER TRAMP verbs use être: <b>D</b>escendre, <b>R</b>entrer, <b>M</b>ourir, <b>R</b>ester, <b>S</b>ortir, <b>V</b>enir, <b>A</b>ller, <b>N</b>aître, <b>D</b>evenir, <b>E</b>ntrer, <b>R</b>etourner, <b>T</b>omber, <b>R</b>evenir, <b>A</b>rriver, <b>M</b>onter, <b>P</b>artir.' }),

  makeTF({ id:'g5fr-pc-007', chapterId:'fr-passe-compose', difficulty:2,
    question:'In "Ils sont partis", the past participle "partis" has an -s because the subject is masculine plural.',
    answer:true,
    hint:'With être, the past participle agrees with the subject in gender and number.',
    explanation:'<b>Vrai (True).</b> With être, the past participle agrees with the subject: parti (m.sg), partie (f.sg), <b>partis</b> (m.pl), parties (f.pl). "Ils" = masculine plural → partis.' }),

  makeMCQ({ id:'g5fr-pc-008', chapterId:'fr-passe-compose', difficulty:2,
    question:'What is the passé composé of "avoir" (to have)? (irregular)',
    options:['j\'ai avé','j\'ai eu','j\'ai avoir','j\'avais'],
    answer:"j'ai eu",
    hint:'Avoir has an irregular past participle: it is NOT "avé".',
    explanation:'"<b>J\'ai eu</b>" — avoir has the irregular past participle <b>eu</b>. Other irregular participles: être→été, faire→fait, prendre→pris, voir→vu, vouloir→voulu, pouvoir→pu.' }),

  makeMCQ({ id:'g5fr-pc-009', chapterId:'fr-passe-compose', difficulty:2,
    question:'Complete: "J\'___ ___ mes clés." (I lost — perdre)',
    options:['ai perdu','suis perdu','ai perdi','suis perdit'],
    answer:'ai perdu',
    hint:'Perdre is an -RE verb → past participle = perdu. Perdre uses avoir.',
    explanation:'"J\'<b>ai perdu</b> mes clés" — -RE verbs: remove -re, add -u: perdre→perdu, vendre→vendu, attendre→attendu. Perdre uses avoir (not être). "J\'ai perdu mes clés" = I lost my keys.' }),

  makeTF({ id:'g5fr-pc-010', chapterId:'fr-passe-compose', difficulty:1,
    question:'The passé composé can only be used with "avoir" — never with "être".',
    answer:false,
    hint:'Think of aller, venir, partir, arriver — which auxiliary verb do they use?',
    explanation:'<b>Faux (False).</b> The passé composé uses <b>either avoir OR être</b> depending on the verb. DR MRS VAN DER TRAMP verbs (aller, venir, partir, etc.) and all reflexive verbs (se lever, se laver) use <b>être</b>.' })

);
