'use strict';
// Grade 6 French - Le Plus-que-parfait
// IDs format: g6fr-pqp-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-pqp-001', chapterId:'g6fr-pqp', difficulty:1,
    question:'Le plus-que-parfait exprime…',
    options:['une action future','une action passée qui s\'est produite AVANT une autre action passée','une action habituelle dans le passé','une action en cours dans le passé'],
    answer:'une action passée qui s\'est produite AVANT une autre action passée',
    hint:'Plus-que-parfait = "plus tôt que le passé". C\'est le passé du passé.',
    explanation:'Le <b>plus-que-parfait</b> exprime une action qui a eu lieu <b>avant</b> une autre action passée. Exemple : "Quand je suis arrivé, il <b>avait déjà mangé</b>." - il a mangé en premier, puis je suis arrivé.' }),

  makeMCQ({ id:'g6fr-pqp-002', chapterId:'g6fr-pqp', difficulty:1,
    question:'Comment se forme le plus-que-parfait ?',
    options:['futur de avoir/être + participe passé','présent de avoir/être + participe passé','imparfait de avoir/être + participe passé','passé simple de avoir/être + participe passé'],
    answer:'imparfait de avoir/être + participe passé',
    hint:'Plus-que-parfait = imparfait de l\'auxiliaire + participe passé.',
    explanation:'Le plus-que-parfait se forme avec : <b>imparfait de avoir ou être</b> + <b>participe passé</b>. Manger → j\'avais mangé (j\'avais = imparfait de avoir + mangé = participe passé).' }),

  makeMCQ({ id:'g6fr-pqp-003', chapterId:'g6fr-pqp', difficulty:1,
    question:'Complète : "Il ___ déjà ___ quand je suis arrivé." (manger)',
    options:['avait / mangé','a / mangé','avait / mangé','avait / mangeait'],
    answer:'avait / mangé',
    hint:'Plus-que-parfait : imparfait de avoir (il → avait) + participe passé (manger → mangé).',
    explanation:'"Il <b>avait déjà mangé</b>" - imparfait de avoir pour "il" = <b>avait</b>. Participe passé de manger = <b>mangé</b>. "Déjà" est souvent utilisé avec le plus-que-parfait.' }),

  makeTF({ id:'g6fr-pqp-004', chapterId:'g6fr-pqp', difficulty:1,
    question:'"J\'avais fini mes devoirs avant de regarder la télé." utilise correctement le plus-que-parfait.',
    answer:true,
    hint:'"J\'avais fini" = imparfait de avoir (avais) + participe passé (fini).',
    explanation:'<b>Vrai.</b> "J\'<b>avais fini</b>" est le plus-que-parfait de finir. Action 1 (plus ancienne) : finir les devoirs (PQP). Action 2 : regarder la télé. Séquence correcte.' }),

  makeMCQ({ id:'g6fr-pqp-005', chapterId:'g6fr-pqp', difficulty:1,
    question:'Quel est le plus-que-parfait de PARLER pour "nous" ?',
    options:['nous avons parlé','nous parlions','nous avions parlé','nous aurions parlé'],
    answer:'nous avions parlé',
    hint:'Imparfait de avoir pour "nous" = avions. Participe passé de parler = parlé.',
    explanation:'"Nous <b>avions parlé</b>" - imparfait de avoir (nous) = <b>avions</b> + participe passé = <b>parlé</b>.' }),

  makeMCQ({ id:'g6fr-pqp-006', chapterId:'g6fr-pqp', difficulty:2,
    question:'Dans la phrase "Quand elle est arrivée, ses amis <u>avaient déjà</u> commencé à manger", que signifie le plus-que-parfait ?',
    options:['Ses amis mangent encore.','Ses amis commenceront à manger.','Ses amis ont commencé à manger AVANT qu\'elle arrive.','Ses amis et elle ont mangé en même temps.'],
    answer:'Ses amis ont commencé à manger AVANT qu\'elle arrive.',
    hint:'Le plus-que-parfait indique l\'action antérieure (qui s\'est passée avant).',
    explanation:'Le plus-que-parfait "<b>avaient déjà commencé</b>" montre que cette action est <b>antérieure</b> à l\'arrivée d\'elle. Séquence : 1. Ses amis commencent → 2. Elle arrive.' }),

  makeMCQ({ id:'g6fr-pqp-007', chapterId:'g6fr-pqp', difficulty:2,
    question:'Quel est le plus-que-parfait de ALLER pour "elle" ?',
    options:['elle avait allé','elle était allée','elle allait','elle serait allée'],
    answer:'elle était allée',
    hint:'Aller utilise ÊTRE comme auxiliaire. Imparfait de être (elle) = était. Participe passé = allée (accord féminin).',
    explanation:'"Elle <b>était allée</b>" - aller utilise l\'auxiliaire <b>être</b>. Imparfait de être pour "elle" = <b>était</b>. Participe passé = <b>allée</b> (accord féminin). Rappel : les verbes avec être s\'accordent avec le sujet.' }),

  makeMCQ({ id:'g6fr-pqp-008', chapterId:'g6fr-pqp', difficulty:2,
    question:'Complète : "Il a dit qu\'il ___ déjà ___ le film." (voir)',
    options:['avait / vu','a / vu','avait / vuyé','aura / vu'],
    answer:'avait / vu',
    hint:'Voir → participe passé irrégulier = vu. Auxiliaire avoir, imparfait il = avait.',
    explanation:'"Il <b>avait</b> déjà <b>vu</b> le film" - voir → participe passé irrégulier = <b>vu</b>. Auxiliaire avoir, imparfait pour "il" = <b>avait</b>.' }),

  makeTF({ id:'g6fr-pqp-009', chapterId:'g6fr-pqp', difficulty:2,
    question:'"Nous étions partis avant que le film commence." est un exemple de plus-que-parfait avec l\'auxiliaire être.',
    answer:true,
    hint:'"Étions partis" = imparfait de être (étions) + participe passé (partis). Partir utilise être.',
    explanation:'<b>Vrai.</b> Partir utilise l\'auxiliaire <b>être</b>. Imparfait de être pour "nous" = <b>étions</b>. Participe passé de partir = <b>partis</b> (accord avec le sujet nous = masculin pluriel). Correct.' }),

  makeMCQ({ id:'g6fr-pqp-010', chapterId:'g6fr-pqp', difficulty:2,
    question:'Identifie le plus-que-parfait dans ces phrases :',
    options:[
      '"Elle avait lu le livre avant le cours." ✓',
      '"Il lisait le livre hier soir." ✓',
      '"Nous avons lu le livre ce matin." ✓',
      '"Vous lirez le livre demain." ✓'
    ],
    answer:'"Elle avait lu le livre avant le cours." ✓',
    hint:'Plus-que-parfait = imparfait de avoir/être + participe passé.',
    explanation:'"Elle <b>avait lu</b>" - imparfait de avoir (avait) + participe passé (lu) = plus-que-parfait. "Lisait" = imparfait. "Avons lu" = passé composé. "Lirez" = futur.' }),

  makeMCQ({ id:'g6fr-pqp-011', chapterId:'g6fr-pqp', difficulty:2,
    question:'Quel est le plus-que-parfait de FAIRE pour "tu" ?',
    options:['tu avais fait','tu as fait','tu faisais','tu avais faisé'],
    answer:'tu avais fait',
    hint:'Faire → participe passé irrégulier = fait. Imparfait avoir (tu) = avais.',
    explanation:'"Tu <b>avais fait</b>" - faire → participe passé irrégulier = <b>fait</b>. Imparfait de avoir pour "tu" = <b>avais</b>.' }),

  makeMCQ({ id:'g6fr-pqp-012', chapterId:'g6fr-pqp', difficulty:3,
    question:'Complète en distinguant passé composé et plus-que-parfait : "Quand mon père ___ (rentrer), ma mère ___ (déjà/préparer) le dîner."',
    options:['est rentré / avait déjà préparé','rentrait / a déjà préparé','a rentré / avait déjà préparé','était rentré / a déjà préparé'],
    answer:'est rentré / avait déjà préparé',
    hint:'L\'action principale (rentrer) = passé composé. L\'action antérieure (préparer) = plus-que-parfait.',
    explanation:'"Mon père <b>est rentré</b>" (passé composé = action principale). "Ma mère <b>avait déjà préparé</b>" (plus-que-parfait = action antérieure, faite avant). Aller → être : <b>est</b> rentré.' }),

  makeMCQ({ id:'g6fr-pqp-013', chapterId:'g6fr-pqp', difficulty:3,
    question:'Quel est le plus-que-parfait de VENIR pour "ils" ?',
    options:['ils avaient venu','ils étaient venus','ils venaient','ils sont venus'],
    answer:'ils étaient venus',
    hint:'Venir utilise être. Imparfait de être (ils) = étaient. Participe passé = venus (pluriel).',
    explanation:'"Ils <b>étaient venus</b>" - venir utilise l\'auxiliaire <b>être</b>. Imparfait de être pour "ils" = <b>étaient</b>. Participe passé = <b>venus</b> (accord masculin pluriel).' }),

  makeMCQ({ id:'g6fr-pqp-014', chapterId:'g6fr-pqp', difficulty:3,
    question:'Distingue les temps : "Lorsqu\'il ___ (arriver), je ___ (partir) depuis une heure."',
    options:['est arrivé / étais parti','arrivait / étais parti','arriva / suis parti','est arrivé / ai parti'],
    answer:'est arrivé / étais parti',
    hint:'L\'action principale = passé composé (est arrivé). L\'action antérieure = plus-que-parfait (étais parti, avec être).',
    explanation:'"Il <b>est arrivé</b>" (passé composé). "J\'<b>étais parti</b> depuis une heure" (plus-que-parfait : partir + être → j\'étais parti). Partir est un verbe avec être → auxiliaire être.' }),

  makeTF({ id:'g6fr-pqp-015', chapterId:'g6fr-pqp', difficulty:3,
    question:'"Elles avaient fini leurs devoirs avant que le cours commence." est correctement formé.',
    answer:true,
    hint:'"Avaient fini" = imparfait de avoir (elles → avaient) + participe passé (finir → fini). Correct.',
    explanation:'<b>Vrai.</b> "Elles <b>avaient fini</b>" - finir utilise avoir. Imparfait de avoir pour "elles" = <b>avaient</b>. Participe passé de finir = <b>fini</b>. Plus-que-parfait bien formé.' }),

  makeMCQ({ id:'g6fr-pqp-016', chapterId:'g6fr-pqp', difficulty:3,
    question:'Lequel de ces verbes utilise ÊTRE (et non avoir) au plus-que-parfait ?',
    options:['manger','finir','partir','voir'],
    answer:'partir',
    hint:'Les verbes de mouvement/état utilisent être : aller, venir, partir, arriver, naître, mourir…',
    explanation:'<b>Partir</b> utilise l\'auxiliaire <b>être</b> au plus-que-parfait (et au passé composé) : j\'étais parti. Les autres - manger (j\'avais mangé), finir (j\'avais fini), voir (j\'avais vu) - utilisent avoir.' }),

  makeMCQ({ id:'g6fr-pqp-017', chapterId:'g6fr-pqp', difficulty:3,
    question:'Accorde le participe passé : "Mes sœurs ___ (partir) avant moi." (plus-que-parfait)',
    options:['étaient parti','étaient partis','étaient parties','avaient parti'],
    answer:'étaient parties',
    hint:'Partir + être → accord avec le sujet "mes sœurs" (féminin pluriel) → -ies.',
    explanation:'"Mes sœurs <b>étaient parties</b>" - partir + être, sujet "mes sœurs" = féminin pluriel → accord : <b>parties</b> (-es au féminin pluriel).' }),

  makeMCQ({ id:'g6fr-pqp-018', chapterId:'g6fr-pqp', difficulty:4,
    question:'Complète le récit : "Quand la cloche ___ (sonner), les élèves ___ (déjà/ranger) leurs affaires et ___ (se lever) de leur chaise."',
    options:[
      'a sonné / avaient déjà rangé / s\'étaient levés',
      'a sonné / avaient déjà rangé / ont levé',
      'sonnait / ont rangé / se sont levés',
      'a sonné / rangeaient / se levaient'
    ],
    answer:'a sonné / avaient déjà rangé / s\'étaient levés',
    hint:'La cloche sonne = passé composé. Les élèves ont déjà rangé/se sont levés AVANT = plus-que-parfait.',
    explanation:'"La cloche <b>a sonné</b>" (passé composé, action déclenchante). "Les élèves <b>avaient déjà rangé</b>" (PQP, avec avoir). "S\'<b>étaient levés</b>" (PQP, verbe pronominal avec être).' }),

  makeMCQ({ id:'g6fr-pqp-019', chapterId:'g6fr-pqp', difficulty:4,
    question:'Riya raconte : "Quand je ___ (arriver) à la fête, tout le monde ___ (déjà/manger), la musique ___ (déjà/commencer) et mes amis ___ (déjà/partir) danser." Bonne série ?',
    options:[
      'suis arrivée / avait déjà mangé / avait déjà commencé / étaient déjà partis',
      'suis arrivée / avait déjà mangé / avait déjà commencé / avaient déjà parti',
      'arrivais / avait mangé / commençait / étaient partis',
      'suis arrivée / a mangé / a commencé / est parti'
    ],
    answer:'suis arrivée / avait déjà mangé / avait déjà commencé / étaient déjà partis',
    hint:'"Je suis arrivée" = passé composé. Tout le reste était DÉJÀ fait = plus-que-parfait. Partir → être → étaient partis.',
    explanation:'"Je <b>suis arrivée</b>" (passé composé, Riya = féminin → arrivée). "Tout le monde <b>avait déjà mangé</b>" (avoir + mangé). "La musique <b>avait déjà commencé</b>" (avoir + commencé). "Mes amis <b>étaient déjà partis</b>" (partir + être → étaient partis, masculin pluriel).' }),

  makeMCQ({ id:'g6fr-pqp-020', chapterId:'g6fr-pqp', difficulty:1,
    question:'Quel est le plus-que-parfait de FINIR pour "tu" ?',
    options:['tu as fini','tu avais fini','tu aurais fini','tu finissais'],
    answer:'tu avais fini',
    hint:'PQP = imparfait de avoir (tu → avais) + participe passé (finir → fini).',
    explanation:'"Tu <b>avais fini</b>" - imparfait de avoir pour "tu" = <b>avais</b>. Participe passé de finir = <b>fini</b>.' }),

  makeMCQ({ id:'g6fr-pqp-021', chapterId:'g6fr-pqp', difficulty:1,
    question:'Quel est le plus-que-parfait de PRENDRE pour "ils" ?',
    options:['ils avaient pris','ils ont pris','ils prenaient','ils auraient pris'],
    answer:'ils avaient pris',
    hint:'PQP = imparfait de avoir (ils → avaient) + participe passé irrégulier (prendre → pris).',
    explanation:'"Ils <b>avaient pris</b>" - prendre → participe passé irrégulier = <b>pris</b>. Imparfait de avoir pour "ils" = <b>avaient</b>.' }),

  makeTF({ id:'g6fr-pqp-022', chapterId:'g6fr-pqp', difficulty:1,
    question:'"Elles étaient arrivées" est le plus-que-parfait de ARRIVER pour "elles".',
    answer:true,
    hint:'Arriver + être. Imparfait de être (elles → étaient) + arrivées (accord féminin pluriel).',
    explanation:'<b>Vrai.</b> Arriver utilise l\'auxiliaire <b>être</b>. Imparfait de être pour "elles" = <b>étaient</b>. Participe passé = <b>arrivées</b> (accord féminin pluriel : +es). "Elles étaient arrivées".' }),

  makeMCQ({ id:'g6fr-pqp-023', chapterId:'g6fr-pqp', difficulty:2,
    question:'Quel est le plus-que-parfait de DIRE pour "nous" ?',
    options:['nous avions dit','nous avions dis','nous disions','nous aurions dit'],
    answer:'nous avions dit',
    hint:'Dire → participe passé irrégulier = dit. Imparfait de avoir (nous → avions).',
    explanation:'"Nous <b>avions dit</b>" - dire → participe passé irrégulier = <b>dit</b>. Imparfait de avoir pour "nous" = <b>avions</b>. Attention : "dis" est incorrect, le participe passé de dire = <b>dit</b>.' }),

  makeMCQ({ id:'g6fr-pqp-024', chapterId:'g6fr-pqp', difficulty:2,
    question:'Transforme au plus-que-parfait : "Elle a ouvert la fenêtre." →',
    options:['Elle avait ouvert la fenêtre.','Elle ouvrait la fenêtre.','Elle avait ouvri la fenêtre.','Elle aurait ouvert la fenêtre.'],
    answer:'Elle avait ouvert la fenêtre.',
    hint:'Ouvrir → participe passé irrégulier = ouvert. Auxiliaire avoir → imparfait = avait.',
    explanation:'"Elle <b>avait ouvert</b>" - ouvrir → participe passé irrégulier = <b>ouvert</b>. Passé composé (a ouvert) → plus-que-parfait : remplacer "a" (présent de avoir) par "avait" (imparfait de avoir).' }),

  makeMCQ({ id:'g6fr-pqp-025', chapterId:'g6fr-pqp', difficulty:2,
    question:'Quel est le plus-que-parfait de METTRE pour "vous" ?',
    options:['vous aviez mis','vous mettiez','vous aviez metti','vous auriez mis'],
    answer:'vous aviez mis',
    hint:'Mettre → participe passé irrégulier = mis. Imparfait de avoir (vous → aviez).',
    explanation:'"Vous <b>aviez mis</b>" - mettre → participe passé irrégulier = <b>mis</b>. Imparfait de avoir pour "vous" = <b>aviez</b>. Famille : mettre, promettre, remettre, soumettre → tous avec participe passé en <b>-mis</b>.' }),

  makeMCQ({ id:'g6fr-pqp-026', chapterId:'g6fr-pqp', difficulty:2,
    question:'Dans quelle phrase le plus-que-parfait est-il utilisé correctement ?',
    options:[
      '"Quand il arriva, elle partait."',
      '"Il était déjà parti quand elle est arrivée."',
      '"Il avait parti quand elle est arrivée."',
      '"Il était parti quand elle arrivera."'
    ],
    answer:'"Il était déjà parti quand elle est arrivée."',
    hint:'"Était parti" = PQP de partir (avec être). Action antérieure à son arrivée (passé composé).',
    explanation:'"Il <b>était déjà parti</b>" (PQP - action antérieure) "quand elle <b>est arrivée</b>" (passé composé - action déclenchante). "Il avait parti" est incorrect - partir utilise être, pas avoir.' }),

  makeMCQ({ id:'g6fr-pqp-027', chapterId:'g6fr-pqp', difficulty:3,
    question:'Quel est le plus-que-parfait de ÉCRIRE pour "elle" ?',
    options:['elle avait écrit','elle avait écrive','elle écrivait','elle aurait écrit'],
    answer:'elle avait écrit',
    hint:'Écrire → participe passé irrégulier = écrit. Auxiliaire avoir, imparfait = avait.',
    explanation:'"Elle <b>avait écrit</b>" - écrire → participe passé irrégulier = <b>écrit</b>. Imparfait de avoir pour "elle" = <b>avait</b>. Famille : écrire, décrire, inscrire → tous avec participe passé en <b>-crit</b>.' }),

  makeMCQ({ id:'g6fr-pqp-028', chapterId:'g6fr-pqp', difficulty:3,
    question:'Accorde le participe passé : "Mes cousines ___ (se lever) tôt ce matin-là." (plus-que-parfait)',
    options:['s\'étaient levé','s\'étaient levées','s\'étaient levés','avaient levées'],
    answer:'s\'étaient levées',
    hint:'Se lever = verbe pronominal → être. Sujet "mes cousines" = féminin pluriel → -ées.',
    explanation:'"Mes cousines <b>s\'étaient levées</b>" - se lever est pronominal → auxiliaire <b>être</b>. Imparfait de être pour "elles" = <b>étaient</b>. Accord avec "mes cousines" (féminin pluriel) → <b>levées</b> (+es).' }),

  makeMCQ({ id:'g6fr-pqp-029', chapterId:'g6fr-pqp', difficulty:3,
    question:'Complète la si-clause (hypothèse passée non réalisée) : "Si j\'___ (savoir), je n\'aurais pas fait cette erreur."',
    options:['savais','avais su','ai su','aurais su'],
    answer:'avais su',
    hint:'Si + plus-que-parfait → conditionnel passé. Savoir → avais su.',
    explanation:'"Si j\'<b>avais su</b>" (si + PQP) "je n\'aurais pas fait" (conditionnel passé). Structure de l\'hypothèse passée : <b>si + PQP → conditionnel passé</b>. "Savais" = imparfait → incorrect dans cette structure.' }),

  makeTF({ id:'g6fr-pqp-030', chapterId:'g6fr-pqp', difficulty:3,
    question:'"Si nous avions étudié, nous aurions réussi." utilise la structure si + PQP → conditionnel passé.',
    answer:true,
    hint:'"Avions étudié" = PQP. "Aurions réussi" = conditionnel passé.',
    explanation:'<b>Vrai.</b> "<b>avions étudié</b>" = plus-que-parfait de étudier (imparfait de avoir = avions + participe passé = étudié). "<b>aurions réussi</b>" = conditionnel passé (conditionnel de avoir = aurions + participe passé = réussi). Structure correcte : <b>si + PQP → conditionnel passé</b>.' }),

  makeMCQ({ id:'g6fr-pqp-031', chapterId:'g6fr-pqp', difficulty:3,
    question:'Dans un récit, quelle est la chronologie des événements dans "Il sortit après qu\'il avait fini son travail" ?',
    options:[
      'Il est sorti puis il a fini son travail.',
      'Il a fini son travail, puis il est sorti.',
      'Les deux actions se sont passées en même temps.',
      'Il sortira quand il finira.'
    ],
    answer:'Il a fini son travail, puis il est sorti.',
    hint:'Plus-que-parfait = action antérieure. Passé simple = action principale qui suit.',
    explanation:'"Il <b>avait fini</b> son travail" (PQP = action plus ancienne) → "Il sortit" (passé simple = action qui suit). Séquence : (1) finir le travail → (2) sortir. Le PQP marque toujours l\'action <b>antérieure</b> dans le récit.' }),

  makeMCQ({ id:'g6fr-pqp-032', chapterId:'g6fr-pqp', difficulty:4,
    question:'Complète le récit : "Le professeur remarqua que les élèves ___ (ne pas faire) leurs devoirs et qu\'ils ___ (oublier) leurs cahiers à la maison."',
    options:[
      'n\'avaient pas fait / avaient oublié',
      'ne faisaient pas / oubliaient',
      'n\'ont pas fait / ont oublié',
      'n\'avaient pas fait / ont oublié'
    ],
    answer:'n\'avaient pas fait / avaient oublié',
    hint:'Le professeur "remarque" au passé simple → ce qu\'il remarque (antérieur) = PQP (x2).',
    explanation:'"Le professeur remarqua que les élèves <b>n\'avaient pas fait</b>" (PQP, négatif) "et qu\'ils <b>avaient oublié</b>" (PQP). Les deux actions (ne pas faire, oublier) sont antérieures au moment où le professeur les remarque → <b>plus-que-parfait</b> dans les deux cas.' }),

  makeMCQ({ id:'g6fr-pqp-033', chapterId:'g6fr-pqp', difficulty:4,
    question:'Riya n\'a pas pu regarder le film hier soir car elle avait déjà tout lu le livre. Transforme en récit : "Riya ne pouvait pas regarder le film car elle ___ déjà ___ le livre."',
    options:[
      'avait / lu',
      'a / lu',
      'avait / lire',
      'était / lu'
    ],
    answer:'avait / lu',
    hint:'Action antérieure (avait lu avant de regarder) = PQP. Lire → participe passé irrégulier = lu.',
    explanation:'"Elle <b>avait</b> déjà <b>lu</b> le livre" - lire → participe passé irrégulier = <b>lu</b>. Auxiliaire avoir, imparfait = <b>avait</b>. Action (lire le livre) antérieure à l\'action principale (regarder le film) → <b>PQP</b>.' }),

  makeMCQ({ id:'g6fr-pqp-034', chapterId:'g6fr-pqp', difficulty:3,
    question:'Complète : "Quand nous sommes arrivés, le professeur ___ (commencer) déjà le cours."',
    options:['a commencé','commençait','avait commencé','commença'],
    answer:'avait commencé',
    hint:'Action antérieure à "sommes arrivés" (passé composé) → plus-que-parfait.',
    explanation:'"le professeur <b>avait commencé</b> déjà le cours." - Le cours a commencé <b>avant</b> notre arrivée → <b>PQP</b>. Action de référence : nous sommes arrivés (passé composé). Action antérieure : avait commencé (PQP). "Déjà" confirme l\'antériorité. Commencer → participe passé = commencé ; auxiliaire avoir imparfait = avait.' }),

  makeMCQ({ id:'g6fr-pqp-035', chapterId:'g6fr-pqp', difficulty:4,
    question:'Texte : "Après qu\'il eut terminé son discours, tout le monde applaudit." Quel temps est "eut terminé" et pourquoi ?',
    options:[
      'Plus-que-parfait - action antérieure au passé composé',
      'Passé antérieur - action antérieure au passé simple dans un récit littéraire',
      'Conditionnel passé - hypothèse passée',
      'Subjonctif passé - après une expression de doute'
    ],
    answer:'Passé antérieur - action antérieure au passé simple dans un récit littéraire',
    hint:'"Eut terminé" = avoir à passé simple (eut) + participe passé → passé antérieur.',
    explanation:'"<b>Passé antérieur</b>" - "eut terminé" = eut (passé simple de avoir) + terminé (participe passé). Le passé antérieur exprime une action <b>immédiatement antérieure</b> à un passé simple, après "après que", "dès que", "quand" dans le registre littéraire. Ici : discours terminé → immédiatement → applaudissements (passé simple). À distinguer du PQP (avait terminé).' })

);
