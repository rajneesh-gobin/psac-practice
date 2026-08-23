'use strict';
// Grade 6 French — Chapitre : L'Imparfait
// IDs format: g6fr-imp-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-imp-001', chapterId:'g6fr-imparfait', difficulty:1,
    question:'Quelle terminaison ajoute-t-on pour former l\'imparfait à la première personne du singulier (je) ?',
    options:['-ais','-ai','-é','-ait'],
    answer:'-ais',
    hint:'Les terminaisons de l\'imparfait commencent par -a.',
    explanation:'Les terminaisons de l\'imparfait : <b>-ais, -ais, -ait, -ions, -iez, -aient</b>. Pour "je" : je parlais, je finissais, je vendais.' }),

  makeMCQ({ id:'g6fr-imp-002', chapterId:'g6fr-imparfait', difficulty:1,
    question:'À partir de quelle forme du verbe forme-t-on le radical de l\'imparfait ?',
    options:['La forme infinitive','La forme "nous" au présent, sans -ons','La forme "ils" au présent, sans -ent','Le participe passé'],
    answer:'La forme "nous" au présent, sans -ons',
    hint:'Nous parlons → parl- → je parlais.',
    explanation:'Radical de l\'imparfait = forme <b>nous</b> au présent sans <b>-ons</b>. Exemples : nous parlons → <b>parl</b>- ; nous finissons → <b>finiss</b>- ; nous mangeons → <b>mange</b>-.' }),

  makeMCQ({ id:'g6fr-imp-003', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Conjuguez "parler" à l\'imparfait — troisième personne du pluriel (ils) :',
    options:['ils parlaient','ils parlait','ils parleront','ils parlent'],
    answer:'ils parlaient',
    hint:'Radical : parl- + terminaison de la 3e personne du pluriel.',
    explanation:'Parler → nous parlons → radical <b>parl-</b> + terminaison <b>-aient</b> → <b>ils parlaient</b>. Les terminaisons : je -ais, tu -ais, il -ait, nous -ions, vous -iez, ils <b>-aient</b>.' }),

  makeMCQ({ id:'g6fr-imp-004', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Choisissez la forme correcte de "être" à l\'imparfait pour "nous" :',
    options:['nous sommes','nous étions','nous serons','nous étais'],
    answer:'nous étions',
    hint:'Être est irrégulier à l\'imparfait : ét- est le radical.',
    explanation:'<b>Être</b> est le seul verbe irrégulier à l\'imparfait. Radical : <b>ét-</b>. Conjugaison : j\'étais, tu étais, il était, <b>nous étions</b>, vous étiez, ils étaient.' }),

  makeTF({ id:'g6fr-imp-005', chapterId:'g6fr-imparfait', difficulty:2,
    question:'L\'imparfait s\'utilise pour décrire une action courte et soudaine dans le passé.',
    answer:false,
    hint:'Pensez à la différence entre le passé composé et l\'imparfait.',
    explanation:'<b>Faux.</b> L\'imparfait exprime une action <b>habituelle, répétée ou en cours</b> dans le passé. Les actions soudaines et courtes utilisent le <b>passé composé</b>. Exemple : "Je <b>lisais</b> (imparfait = action en cours) quand il <b>est entré</b> (passé composé = action soudaine)."' }),

  makeMCQ({ id:'g6fr-imp-006', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Choisissez le temps correct : "Quand j\'étais petit, je ___ (jouer) au football tous les samedis."',
    options:['ai joué','jouais','jouerai','joue'],
    answer:'jouais',
    hint:'L\'action est habituelle et répétée dans le passé.',
    explanation:'"Je <b>jouais</b> au football tous les samedis." — L\'imparfait convient car l\'action est <b>habituelle et répétée</b>. Les mots comme "tous les samedis", "chaque jour", "souvent", "toujours" signalent l\'imparfait.' }),

  makeMCQ({ id:'g6fr-imp-007', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Conjuguez "avoir" à l\'imparfait pour "elle" :',
    options:['elle a','elle avait','elle aura','elle ait'],
    answer:'elle avait',
    hint:'Avoir → nous avons → radical av- + terminaison pour "il/elle".',
    explanation:'Avoir → nous avons → radical <b>av-</b> + terminaison <b>-ait</b> → <b>elle avait</b>. Conjugaison : j\'avais, tu avais, il/elle <b>avait</b>, nous avions, vous aviez, ils avaient.' }),

  makeMCQ({ id:'g6fr-imp-008', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Choisissez le temps correct : "Hier, Marie ___ (tomber) dans la cour."',
    options:['tombait','est tombée','tombera','tombe'],
    answer:'est tombée',
    hint:'L\'action est précise, unique et terminée — quelle est la différence avec l\'imparfait ?',
    explanation:'"Hier, Marie <b>est tombée</b> dans la cour." — Le <b>passé composé</b> convient car l\'action est unique, soudaine et terminée. "Hier" peut accompagner les deux temps, mais c\'est le sens de l\'action (soudaine/unique vs habituelle) qui décide.' }),

  makeTF({ id:'g6fr-imp-009', chapterId:'g6fr-imparfait', difficulty:1,
    question:'La terminaison de l\'imparfait pour "vous" est -iez.',
    answer:true,
    hint:'Rappel : -ais, -ais, -ait, -ions, ___, -aient.',
    explanation:'<b>Vrai.</b> Les terminaisons de l\'imparfait : je -ais, tu -ais, il -ait, nous -ions, vous <b>-iez</b>, ils -aient. Exemple : vous parliez, vous finissiez, vous étiez.' }),

  makeMCQ({ id:'g6fr-imp-010', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Complétez : "Il ___ (faire) beau et les enfants ___ (jouer) dehors."',
    options:['a fait / ont joué','faisait / jouaient','fera / joueront','fait / jouent'],
    answer:'faisait / jouaient',
    hint:'Ce sont deux descriptions d\'une situation dans le passé — pas des actions soudaines.',
    explanation:'"Il <b>faisait</b> beau et les enfants <b>jouaient</b> dehors." — Les deux verbes sont à l\'imparfait car ce sont des <b>descriptions</b> d\'un état passé, pas des actions précises. Faire → nous faisons → fais- + ait/aient.' })

);
