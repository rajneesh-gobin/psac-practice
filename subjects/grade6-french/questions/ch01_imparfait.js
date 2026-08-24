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

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-imp-011', chapterId:'g6fr-imparfait', difficulty:1,
    question:'Conjuguez "finir" à l\'imparfait pour "nous" :',
    options:['nous finissions','nous finissons','nous finirons','nous finissions'],
    answer:'nous finissions',
    hint:'Finir → nous finissons → finiss- → + terminaison -ions pour "nous".',
    explanation:'Finir → forme "nous" au présent : <b>nous finissons</b> → radical : <b>finiss-</b> → + terminaison <b>-ions</b> → <b>nous finissions</b>. Rappel des terminaisons complètes de l\'imparfait : -ais, -ais, -ait, <b>-ions</b>, -iez, -aient. Attention à bien garder le double -ss- pour les verbes en -ir comme "finir" et "choisir".' }),

  makeMCQ({ id:'g6fr-imp-012', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Choisissez le bon temps : "Hier, je ___ mes devoirs quand le téléphone a sonné."',
    options:['faisais','ai fait','ferai','fis'],
    answer:'faisais',
    hint:'Une action était en cours (imparfait) quand une action soudaine s\'est produite (passé composé).',
    explanation:'"Hier, je <b>faisais</b> mes devoirs quand le téléphone <b>a sonné</b>." — Structure classique : <b>imparfait</b> (action en cours, arrière-plan) + <b>passé composé</b> (action soudaine qui l\'interrompt). Le manuel MIE de 6e présente ce modèle comme l\'un des usages fondamentaux de l\'imparfait. Mots clés signalant l\'imparfait dans ce contexte : quand, lorsque, pendant que, au moment où.' }),

  makeTF({ id:'g6fr-imp-013', chapterId:'g6fr-imparfait', difficulty:1,
    question:'Pour les verbes en -ger comme "manger", on écrit "nous mangions" à l\'imparfait.',
    answer:true,
    hint:'Manger → nous mangeons → mange- (on garde le -e pour conserver le son /dʒ/) → +ions.',
    explanation:'<b>Vrai.</b> Pour "manger" : présent "nous" = nous mang<b>e</b>ons → radical : <b>mange-</b> → nous <b>mangions</b>. Le -e- se conserve à toutes les personnes de l\'imparfait sauf "nous" et "vous" : je mangeais, tu mangeais, il mangeait, <b>nous mangions</b>, <b>vous mangiez</b>, ils mangeaient. De même : voyager → nous voyagions, nager → nous nagions.' }),

  makeMCQ({ id:'g6fr-imp-014', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Conjuguez "venir" à l\'imparfait pour "ils" :',
    options:['ils venaient','ils viendraient','ils sont venus','ils viennent'],
    answer:'ils venaient',
    hint:'Venir → nous venons → ven- → + terminaison -aient.',
    explanation:'Venir → forme "nous" au présent : nous venons → radical : <b>ven-</b> → + terminaison <b>-aient</b> → <b>ils venaient</b>. Conjugaison complète : je venais, tu venais, il venait, nous venions, vous veniez, <b>ils venaient</b>. De même pour "tenir" → ils tenaient.' }),

  makeMCQ({ id:'g6fr-imp-015', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Quelle phrase exprime une habitude dans le passé (usage typique de l\'imparfait) ?',
    options:[
      '"Lundi dernier, il a mangé une pizza."',
      '"Demain, il mangera de la pizza."',
      '"Quand il était enfant, il mangeait de la pizza chaque vendredi."',
      '"Il mange de la pizza maintenant."'
    ],
    answer:'"Quand il était enfant, il mangeait de la pizza chaque vendredi."',
    hint:'Les mots "chaque vendredi" et "quand il était enfant" indiquent une habitude passée répétée.',
    explanation:'"Quand il était enfant, il <b>mangeait</b> de la pizza chaque vendredi." — L\'imparfait exprime ici une <b>habitude passée répétée</b>. Marqueurs habituels de l\'imparfait : <b>chaque semaine / jour / fois, tous les + temps, souvent, toujours, généralement, autrefois, jadis, d\'habitude</b>. Ces indicateurs temporels sont des indices importants dans les épreuves PSAC.' }),

  makeMCQ({ id:'g6fr-imp-016', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Conjuguez "voir" à l\'imparfait pour "vous" :',
    options:['vous voyiez','vous voyez','vous verrez','vous vîtes'],
    answer:'vous voyiez',
    hint:'Voir → nous voyons → voy- → + terminaison -iez.',
    explanation:'Voir → forme "nous" au présent : nous voyons → radical : <b>voy-</b> → + terminaison <b>-iez</b> → <b>vous voyiez</b>. Attention : "voy-" + "-iez" = "voyiez" (avec le -y- du radical puis le -i- de la terminaison). De même : croire → nous croyons → vous croyiez ; envoyer → vous envoyiez.' }),

  makeMCQ({ id:'g6fr-imp-017', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Choisissez le bon temps : "Lorsque j\'étais petit, je ___ (avoir) peur du noir."',
    options:['ai eu','aurais','avais','aurai'],
    answer:'avais',
    hint:'"Lorsque j\'étais petit" décrit une période de l\'enfance → état continu et habituel = imparfait.',
    explanation:'"Lorsque j\'étais petit, j\'<b>avais</b> peur du noir." — <b>Avoir</b> à l\'imparfait : j\'<b>avais</b>. Le contexte "lorsque j\'étais petit" place l\'action dans une période continue du passé. Les <b>états</b> (avoir faim, avoir peur, être triste, se sentir bien) se mettent à l\'imparfait quand ils décrivent une situation passée durable.' }),

  makeTF({ id:'g6fr-imp-018', chapterId:'g6fr-imparfait', difficulty:2,
    question:'L\'imparfait et le passé composé peuvent s\'utiliser ensemble dans la même phrase.',
    answer:true,
    hint:'Pensez à la structure : action en cours (imparfait) + action soudaine (passé composé).',
    explanation:'<b>Vrai.</b> L\'imparfait et le passé composé s\'utilisent souvent ensemble : "<b>Je dormais</b> (imparfait = action en cours) quand il <b>est arrivé</b> (passé composé = action soudaine)." Le manuel MIE de 6e présente ce contraste comme essentiel : l\'imparfait = <b>décor / arrière-plan</b> ; le passé composé = <b>événement / premier plan</b>.' }),

  makeMCQ({ id:'g6fr-imp-019', chapterId:'g6fr-imparfait', difficulty:3,
    question:'Quel est le radical de l\'imparfait pour le verbe "savoir" ?',
    options:['sav-','sach-','sau-','sai-'],
    answer:'sav-',
    hint:'Savoir → nous savons → enlève -ons → ?',
    explanation:'Savoir → forme "nous" au présent : nous <b>savons</b> → enlève -ons → radical : <b>sav-</b> → je savais, tu savais, il savait, nous savions, vous saviez, ils savaient. Attention : ne pas confondre avec le subjonctif (que je <b>sache</b>) qui a un radical différent. L\'imparfait se forme toujours sur le radical "nous" du présent.' })

);
