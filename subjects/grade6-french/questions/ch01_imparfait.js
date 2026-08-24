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
    explanation:'Savoir → forme "nous" au présent : nous <b>savons</b> → enlève -ons → radical : <b>sav-</b> → je savais, tu savais, il savait, nous savions, vous saviez, ils savaient. Attention : ne pas confondre avec le subjonctif (que je <b>sache</b>) qui a un radical différent. L\'imparfait se forme toujours sur le radical "nous" du présent.' }),

  makeMCQ({ id:'g6fr-imp-020', chapterId:'g6fr-imparfait', difficulty:1,
    question:'Conjugue ALLER à l\'imparfait pour "je" :',
    options:['j\'aillais','j\'allais','je vais','j\'allai'],
    answer:'j\'allais',
    hint:'Aller → radical imparfait : nous allons → all- → j\'allais.',
    explanation:'Aller → présent "nous" : nous <b>allons</b> → radical = <b>all-</b> → imparfait : j\'<b>allais</b>, tu allais, il allait, nous allions, vous alliez, ils allaient. C\'est un verbe très fréquent : "Quand j\'étais petit, j\'<b>allais</b> à la plage chaque dimanche."' }),

  makeMCQ({ id:'g6fr-imp-021', chapterId:'g6fr-imparfait', difficulty:1,
    question:'Conjugue VENIR à l\'imparfait pour "il" :',
    options:['il venait','il vient','il vint','il viendrait'],
    answer:'il venait',
    hint:'Venir → nous venons → radical ven- → il venait.',
    explanation:'Venir → présent "nous" : nous <b>venons</b> → radical = <b>ven-</b> → imparfait : je venais, tu venais, <b>il venait</b>, nous venions, vous veniez, ils venaient.' }),

  makeTF({ id:'g6fr-imp-022', chapterId:'g6fr-imparfait', difficulty:1,
    question:'L\'expression "Il était une fois…" au début d\'un conte utilise l\'imparfait.',
    answer:true,
    hint:'"Il était" = imparfait de être. Les contes commencent par une description = imparfait.',
    explanation:'<b>Vrai.</b> "Il <b>était</b> une fois…" est l\'imparfait de être (il <b>était</b>). Dans les contes, l\'imparfait sert à décrire le <b>cadre</b> (personnages, décors, situation initiale). C\'est l\'imparfait de <b>description</b>.' }),

  makeMCQ({ id:'g6fr-imp-023', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Conjugue PRENDRE à l\'imparfait pour "nous" :',
    options:['nous prenions','nous preniions','nous prenons','nous prendions'],
    answer:'nous prenions',
    hint:'Prendre → nous prenons → radical pren- → nous prenions.',
    explanation:'Prendre → présent "nous" : nous <b>prenons</b> → radical = <b>pren-</b> → imparfait : je prenais, tu prenais, il prenait, <b>nous prenions</b>, vous preniez, ils prenaient.' }),

  makeMCQ({ id:'g6fr-imp-024', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Conjugue VOIR à l\'imparfait pour "vous" :',
    options:['vous voyiez','vous voyez','vous viez','vous verriez'],
    answer:'vous voyiez',
    hint:'Voir → nous voyons → radical voy- → vous voyiez.',
    explanation:'Voir → présent "nous" : nous <b>voyons</b> → radical = <b>voy-</b> → imparfait : je voyais, tu voyais, il voyait, nous voyions, <b>vous voyiez</b>, ils voyaient. Remarque : même radical que le présent pluriel.' }),

  makeMCQ({ id:'g6fr-imp-025', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Conjugue POUVOIR à l\'imparfait pour "ils" :',
    options:['ils pouvaient','ils peuvent','ils pourraient','ils purent'],
    answer:'ils pouvaient',
    hint:'Pouvoir → nous pouvons → radical pouv- → ils pouvaient.',
    explanation:'Pouvoir → présent "nous" : nous <b>pouvons</b> → radical = <b>pouv-</b> → imparfait : je pouvais, tu pouvais, il pouvait, nous pouvions, vous pouviez, <b>ils pouvaient</b>.' }),

  makeMCQ({ id:'g6fr-imp-026', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Conjugue VOULOIR à l\'imparfait pour "tu" :',
    options:['tu voulais','tu vouldrais','tu veux','tu voulus'],
    answer:'tu voulais',
    hint:'Vouloir → nous voulons → radical voul- → tu voulais.',
    explanation:'Vouloir → présent "nous" : nous <b>voulons</b> → radical = <b>voul-</b> → imparfait : je voulais, <b>tu voulais</b>, il voulait, nous voulions, vous vouliez, ils voulaient.' }),

  makeMCQ({ id:'g6fr-imp-027', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Laquelle de ces phrases est une demande polie utilisant l\'imparfait ?',
    options:[
      'Je veux vous demander un conseil.',
      'Je voulais vous demander un conseil.',
      'Je voudrais vous demander un conseil.',
      'Je demande un conseil.'
    ],
    answer:'Je voulais vous demander un conseil.',
    hint:'"Je voulais…" = imparfait de vouloir = forme polie pour atténuer une demande.',
    explanation:'"Je <b>voulais</b> vous demander un conseil" — l\'imparfait de vouloir (<b>voulais</b>) atténue la demande et la rend plus polie. C\'est l\'<b>imparfait de politesse</b> : on s\'efface par rapport au présent "je veux" qui paraît trop direct. Remarque : "Je <b>voudrais</b>" (conditionnel) est aussi poli.' }),

  makeTF({ id:'g6fr-imp-028', chapterId:'g6fr-imparfait', difficulty:2,
    question:'"Je mangeais" et "je téléphonais" sont tous les deux à l\'imparfait.',
    answer:true,
    hint:'Les deux finissent en -ais = terminaison de l\'imparfait pour "je".',
    explanation:'<b>Vrai.</b> Les deux formes se terminent par <b>-ais</b>, terminaison de l\'imparfait pour "je". Manger → je manger + <b>ais</b> = mangeais. Téléphoner → je téléphon + <b>ais</b> = téléphonais.' }),

  makeMCQ({ id:'g6fr-imp-029', chapterId:'g6fr-imparfait', difficulty:3,
    question:'Complète la phrase d\'interruption : "Je ___ (lire) un livre quand le tonnerre ___ (éclater)."',
    options:['lisais / a éclaté','lisais / éclatait','lus / a éclaté','ai lu / a éclaté'],
    answer:'lisais / a éclaté',
    hint:'Action en cours (durée) = imparfait. Action soudaine qui interrompt = passé composé.',
    explanation:'"Je <b>lisais</b>" (imparfait = action en cours, décor) "quand le tonnerre <b>a éclaté</b>" (passé composé = action soudaine). Structure classique : <b>imparfait (arrière-plan) + quand + passé composé (événement)</b>.' }),

  makeMCQ({ id:'g6fr-imp-030', chapterId:'g6fr-imparfait', difficulty:3,
    question:'Dans la phrase "Il était une fois une petite fille qui habitait dans la forêt", quel est le rôle de l\'imparfait ?',
    options:['Décrire des actions rapides et ponctuelles','Décrire le cadre et la situation initiale du conte','Indiquer des actions futures','Exprimer des ordres'],
    answer:'Décrire le cadre et la situation initiale du conte',
    hint:'Dans les contes, l\'imparfait dessine le décor : personnages, lieu, habitudes.',
    explanation:'Dans les contes, l\'<b>imparfait descriptif</b> sert à poser le <b>cadre</b> : qui sont les personnages, où ils vivent, leurs habitudes. "Il <b>était</b> une fois", "elle <b>habitait</b>", "il <b>aimait</b>"… Ces descriptions forment l\'arrière-plan du récit. Les événements ponctuels, eux, sont au passé composé ou passé simple.' }),

  makeMCQ({ id:'g6fr-imp-031', chapterId:'g6fr-imparfait', difficulty:3,
    question:'Choisis le bon temps : "Tous les étés, la famille Sharma ___ (partir) à Rodrigues."',
    options:['est partie','partait','part','sera partie'],
    answer:'partait',
    hint:'"Tous les étés" = habitude répétée dans le passé → imparfait.',
    explanation:'"Tous les étés, la famille Sharma <b>partait</b>" — l\'expression "tous les étés" indique une action <b>habituelle et répétée</b> dans le passé → <b>imparfait</b>. C\'est l\'imparfait d\'habitude. Comparer avec : "Cet été, la famille est partie à Rodrigues" (événement unique → passé composé).' }),

  makeTF({ id:'g6fr-imp-032', chapterId:'g6fr-imparfait', difficulty:3,
    question:'"Nous nagions" est l\'imparfait de NAGER pour "nous".',
    answer:true,
    hint:'Nager → nous nageons (présent) → radical : nage- → imparfait nous : nagions. Le -e s\'efface avant -ions.',
    explanation:'<b>Vrai.</b> Nager → présent "nous" : nous <b>nageons</b> → à l\'imparfait, le -e disparaît : radical = <b>nag-</b> → nous nag + <b>ions</b> = <b>nagions</b>. Règle spéciale pour les verbes en -ger : un -e s\'intercale devant les terminaisons -ais/-ait/-aient mais PAS devant -ions/-iez.' }),

  makeMCQ({ id:'g6fr-imp-033', chapterId:'g6fr-imparfait', difficulty:3,
    question:'Quel est l\'imparfait de ÊTRE ASSIS pour "elle" ? (description physique)',
    options:['elle s\'asseyait','elle était assise','elle asseyait','elle a été assise'],
    answer:'elle était assise',
    hint:'"Être assis(e)" est une locution = être + adjectif. Description d\'état = imparfait de être.',
    explanation:'"Elle <b>était assise</b>" — pour décrire une position ou un état physique dans le passé, on utilise <b>être à l\'imparfait + adjectif</b>. "Elle était assise sur le banc, les yeux fermés…" C\'est une description typique du roman ou du conte.' }),

  makeMCQ({ id:'g6fr-imp-034', chapterId:'g6fr-imparfait', difficulty:4,
    question:'Complète le passage : "Ce soir-là, le ciel ___ (être) nuageux, le vent ___ (souffler) fort et les vagues ___ (claquer) contre les rochers, quand soudain un bateau ___ (apparaître) à l\'horizon."',
    options:[
      'était / soufflait / claquaient / a apparu',
      'a été / a soufflé / ont claqué / a apparu',
      'était / soufflait / claquaient / apparaissait',
      'était / souffla / claquèrent / apparut'
    ],
    answer:'était / soufflait / claquaient / a apparu',
    hint:'Descriptions de décors = imparfait (x3). Événement soudain = passé composé (x1).',
    explanation:'"<b>était</b> / <b>soufflait</b> / <b>claquaient</b>" = descriptions du cadre → <b>imparfait</b>. "<b>a apparu</b>" = événement soudain qui rompt le décor → <b>passé composé</b>. Structure narrative : imparfait (arrière-plan) + passé composé (événement de premier plan).' }),

  makeMCQ({ id:'g6fr-imp-035', chapterId:'g6fr-imparfait', difficulty:4,
    question:'Shanvi écrit dans son journal : "Quand j\'___ (avoir) 6 ans, je n\'___ (pas savoir) nager, je ___ (avoir peur) de l\'eau mais j\'___ (adorer) regarder la mer de loin." Bonne série ?',
    options:[
      'avais / ne savais / avais peur / adorais',
      'ai eu / n\'ai pas su / ai eu peur / ai adoré',
      'avais / ne savais / ai eu peur / adorais',
      'étais / ne savait / avais peur / adorais'
    ],
    answer:'avais / ne savais / avais peur / adorais',
    hint:'Journal intime = souvenirs d\'enfance = habitudes et états dans le passé = imparfait (x4).',
    explanation:'"<b>avais</b>" (état : avoir 6 ans), "<b>ne savais</b> pas" (état : ne pas savoir), "<b>avais peur</b>" (état émotionnel), "<b>adorais</b>" (goût habituel) — tous ces états et habitudes de l\'enfance sont à l\'<b>imparfait</b>. Le passé composé serait pour des événements précis et ponctuels.' })

);
