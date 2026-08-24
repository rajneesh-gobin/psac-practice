'use strict';
// Grade 4 French - Le Passé Composé
// IDs format: g4fr-passe-comp-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4fr-passe-comp-001', chapterId:'g4fr-passe-comp', difficulty:1,
    question:'Quelle est la traduction de "J\'ai mangé" en anglais ?',
    options:['I am eating','I eat','I ate / I have eaten','I will eat'],
    answer:'I ate / I have eaten',
    hint:'J\'ai mangé = passé composé = action terminée dans le passé.',
    explanation:'"<b>J\'ai mangé</b>" = I ate / I have eaten. Le passé composé exprime une action <b>terminée</b> dans le passé. Structure : <b>avoir</b> (conjugué) + participe passé. Manger → mangé.' }),

  makeMCQ({ id:'g4fr-passe-comp-002', chapterId:'g4fr-passe-comp', difficulty:1,
    question:'Quel est le participe passé du verbe PARLER ?',
    options:['parles','parlé','parlons','parlant'],
    answer:'parlé',
    hint:'Les verbes en -ER : ôte -ER et ajoute -É.',
    explanation:'Parler → <b>parlé</b>. Pour les verbes en -ER, le participe passé se forme en remplaçant <b>-ER</b> par <b>-É</b> : parler → parlé, manger → mangé, jouer → joué, regarder → regardé.' }),

  makeMCQ({ id:'g4fr-passe-comp-003', chapterId:'g4fr-passe-comp', difficulty:1,
    question:'Complète : "Il ___ son repas." (manger - passé composé)',
    options:['a mangé','ai mangé','avons mangé','ont mangé'],
    answer:'a mangé',
    hint:'Sujet = "il". Avoir pour "il" = a. Participe passé de manger = mangé.',
    explanation:'"Il <b>a mangé</b>" - sujet "il", donc auxiliaire = <b>a</b>. Avoir : j\'ai, tu as, il/elle <b>a</b>, nous avons, vous avez, ils/elles ont. Participe passé : manger → mangé.' }),

  makeTF({ id:'g4fr-passe-comp-004', chapterId:'g4fr-passe-comp', difficulty:1,
    question:'Le passé composé se forme avec "avoir" ou "être" + participe passé.',
    answer:true,
    hint:'Pense à la structure : auxiliaire + participe passé.',
    explanation:'<b>Vrai.</b> Le passé composé = <b>avoir</b> ou <b>être</b> (auxiliaire) + participe passé. La majorité des verbes utilisent <b>avoir</b>. Exemple : j\'ai parlé, tu as fini. Certains verbes (aller, venir, partir…) utilisent <b>être</b>.' }),

  makeMCQ({ id:'g4fr-passe-comp-005', chapterId:'g4fr-passe-comp', difficulty:1,
    question:'Quel est le participe passé du verbe JOUER ?',
    options:['joué','jouons','joues','jouant'],
    answer:'joué',
    hint:'Verbe en -ER : ôte -ER, ajoute -É.',
    explanation:'Jouer → <b>joué</b>. Règle des verbes en -ER : ôte -ER et ajoute -É. Exemples : aimer → aimé, regarder → regardé, travailler → travaillé.' }),

  makeMCQ({ id:'g4fr-passe-comp-006', chapterId:'g4fr-passe-comp', difficulty:2,
    question:'Complète : "Nous ___ un film hier soir." (regarder)',
    options:['avons regardé','avez regardé','ont regardé','ai regardé'],
    answer:'avons regardé',
    hint:'Sujet = "nous". Avoir pour "nous" = avons.',
    explanation:'"Nous <b>avons regardé</b>" - sujet "nous", auxiliaire = <b>avons</b>. Regarder → regardé (participe passé). Avoir : j\'ai, tu as, il a, nous <b>avons</b>, vous avez, ils ont.' }),

  makeMCQ({ id:'g4fr-passe-comp-007', chapterId:'g4fr-passe-comp', difficulty:2,
    question:'Quel est le participe passé IRRÉGULIER du verbe FAIRE ?',
    options:['faisé','fait','faité','fais'],
    answer:'fait',
    hint:'Le participe passé de "faire" est irrégulier - à apprendre par cœur !',
    explanation:'Faire → <b>fait</b> (irrégulier). Participes passés irréguliers à apprendre : faire → <b>fait</b>, voir → <b>vu</b>, prendre → <b>pris</b>, avoir → <b>eu</b>, être → <b>été</b>, dire → <b>dit</b>.' }),

  makeMCQ({ id:'g4fr-passe-comp-008', chapterId:'g4fr-passe-comp', difficulty:2,
    question:'Complète la négation : "Je ___ pas mangé de pizza." (passé composé)',
    options:['n\'ai','ne ai','n\'a','n\'avons'],
    answer:"n'ai",
    hint:'Négation au passé composé : ne + auxiliaire + pas. Sujet = "je".',
    explanation:'"Je <b>n\'ai</b> pas mangé" - au passé composé, la négation encadre l\'<b>auxiliaire</b> : <b>ne</b> + auxiliaire + <b>pas</b>. Je n\'ai pas mangé. Tu n\'as pas parlé. Il n\'a pas joué.' }),

  makeTF({ id:'g4fr-passe-comp-009', chapterId:'g4fr-passe-comp', difficulty:2,
    question:'Le participe passé du verbe "voir" est "vué".',
    answer:false,
    hint:'Le participe passé de "voir" est irrégulier.',
    explanation:'<b>Faux.</b> Le participe passé de "voir" est <b>vu</b> (pas "vué"). Exemples avec "voir" : j\'ai vu, tu as vu, il a vu. "Vué" n\'existe pas en français.' }),

  makeMCQ({ id:'g4fr-passe-comp-010', chapterId:'g4fr-passe-comp', difficulty:2,
    question:'Quelle phrase est correcte au passé composé ?',
    options:['Elle a parler.','Elle a parlé.','Elle est parlé.','Elle avons parlé.'],
    answer:'Elle a parlé.',
    hint:'Structure : avoir (elle → a) + participe passé (-ER → -É).',
    explanation:'"<b>Elle a parlé.</b>" - auxiliaire "a" (avoir, sujet elle) + participe passé "parlé". Les autres options sont incorrectes : "parler" est un infinitif (pas un participe passé), "est" n\'est pas l\'auxiliaire de parler, "avons" ne correspond pas au sujet "elle".' }),

  makeMCQ({ id:'g4fr-passe-comp-011', chapterId:'g4fr-passe-comp', difficulty:2,
    question:'Quel est le participe passé du verbe PRENDRE ?',
    options:['prendu','prend','pris','prené'],
    answer:'pris',
    hint:'Le participe passé de "prendre" est irrégulier.',
    explanation:'Prendre → <b>pris</b> (irrégulier). Exemples : j\'ai pris mon sac, tu as pris le bus, il a pris son stylo. Autres irréguliers similaires : apprendre → appris, comprendre → compris.' }),

  makeMCQ({ id:'g4fr-passe-comp-012', chapterId:'g4fr-passe-comp', difficulty:2,
    question:'Complète : "Vous ___ vos devoirs." (finir - passé composé)',
    options:['avez fini','avons fini','ont fini','ai fini'],
    answer:'avez fini',
    hint:'Sujet = "vous". Avoir pour "vous" = avez. Participe passé de finir = fini.',
    explanation:'"Vous <b>avez fini</b>" - sujet "vous", auxiliaire = <b>avez</b>. Finir → fini (verbe en -IR : participe passé = -I). Avoir : vous <b>avez</b>.' }),

  makeTF({ id:'g4fr-passe-comp-013', chapterId:'g4fr-passe-comp', difficulty:3,
    question:'"Ils ont vu le film" est une phrase correcte au passé composé.',
    answer:true,
    hint:'Voir → vu (irrégulier). Sujet "ils" → ont.',
    explanation:'<b>Vrai.</b> "Ils <b>ont vu</b>" - sujet "ils", auxiliaire = <b>ont</b> (avoir), participe passé de voir = <b>vu</b>. C\'est une phrase correcte au passé composé.' }),

  makeMCQ({ id:'g4fr-passe-comp-014', chapterId:'g4fr-passe-comp', difficulty:3,
    question:'Quel est le participe passé du verbe DIRE ?',
    options:['diré','disé','dit','disant'],
    answer:'dit',
    hint:'Le participe passé de "dire" est irrégulier - à apprendre par cœur.',
    explanation:'Dire → <b>dit</b> (irrégulier). J\'ai dit, tu as dit, il a dit. Autres verbes en -it : écrire → écrit, conduire → conduit.' }),

  makeMCQ({ id:'g4fr-passe-comp-015', chapterId:'g4fr-passe-comp', difficulty:3,
    question:'Transforme au passé composé : "Tu manges une banane." →',
    options:['Tu as mangé une banane.','Tu avais mangé une banane.','Tu auras mangé une banane.','Tu mangeas une banane.'],
    answer:'Tu as mangé une banane.',
    hint:'Passé composé = avoir (tu → as) + participe passé de manger (= mangé).',
    explanation:'"Tu <b>as mangé</b> une banane." - sujet "tu", auxiliaire = <b>as</b>, participe passé = <b>mangé</b>. Structure correcte : tu + as + mangé.' }),

  makeMCQ({ id:'g4fr-passe-comp-016', chapterId:'g4fr-passe-comp', difficulty:3,
    question:'Complète la phrase négative : "Ils ___ ___ regardé le match."',
    options:["n'ont pas","ne ont pas","n'avons pas","n'ont point"],
    answer:"n'ont pas",
    hint:'Négation : ne + auxiliaire (ils → ont) + pas.',
    explanation:'"Ils <b>n\'ont pas</b> regardé le match." - la négation encadre l\'auxiliaire : <b>n\'</b> + ont + <b>pas</b>. Rappel : "ne" devient "n\'" devant une voyelle.' }),

  makeMCQ({ id:'g4fr-passe-comp-017', chapterId:'g4fr-passe-comp', difficulty:3,
    question:'Quelle forme du passé composé est INCORRECTE ?',
    options:['j\'ai fini','nous avons parlé','tu as vu','vous avez allé'],
    answer:'vous avez allé',
    hint:'Le verbe "aller" n\'utilise pas "avoir" comme auxiliaire.',
    explanation:'"<b>Vous avez allé</b>" est incorrect. Le verbe <b>aller</b> se conjugue avec l\'auxiliaire <b>être</b>, pas avoir : vous <b>êtes allé(s)</b>. Les verbes avec être : aller (allé), venir (venu), partir (parti), arriver (arrivé).' }),

  makeMCQ({ id:'g4fr-passe-comp-018', chapterId:'g4fr-passe-comp', difficulty:3,
    question:'Complète : "Ce matin, ma mère ___ (faire) les courses et mon père ___ (lire) le journal."',
    options:['a fait / a lu','avait fait / avait lu','faisait / lisait','a faisé / a lisé'],
    answer:'a fait / a lu',
    hint:'Actions terminées dans le passé → passé composé. Irréguliers : faire → fait, lire → lu.',
    explanation:'"Ma mère <b>a fait</b> les courses" - faire → <b>fait</b> (irrégulier), auxiliaire avoir (elle → a). "Mon père <b>a lu</b> le journal" - lire → <b>lu</b> (irrégulier), auxiliaire avoir (il → a).' }),

  makeMCQ({ id:'g4fr-passe-comp-019b', chapterId:'g4fr-passe-comp', difficulty:3,
    question:'Quel verbe utilise l\'auxiliaire ÊTRE au passé composé ?',
    options:['manger','jouer','aller','finir'],
    answer:'aller',
    hint:'"Aller" fait partie des verbes qui utilisent "être".',
    explanation:'"<b>Aller</b>" se conjugue avec <b>être</b> : je suis allé(e), tu es allé(e), il est allé, elle est allée. Les verbes avec être : aller, venir, partir, arriver, entrer, sortir, naître, mourir, monter, descendre, rester, tomber, retourner, passer.' }),

  makeMCQ({ id:'g4fr-passe-comp-019', chapterId:'g4fr-passe-comp', difficulty:4,
    question:'Riya écrit à sa correspondante : "Hier, j\'___ (avoir) une belle journée. Je ___ (jouer) au parc avec mes amis. Nous ___ (manger) des gâteaux et nous ___ (voir) un beau coucher de soleil." Choisissez la bonne série.',
    options:[
      "ai eu / ai joué / avons mangé / avons vu",
      "ai eu / ai joué / avons mangé / avons vué",
      "avais / jouais / mangions / voyions",
      "aurai eu / aurai joué / aurons mangé / aurons vu"
    ],
    answer:"ai eu / ai joué / avons mangé / avons vu",
    hint:'Passé composé : avoir + participe passé. Irréguliers : avoir → eu, voir → vu.',
    explanation:'"J\'<b>ai eu</b>" (avoir→eu), "j\'<b>ai joué</b>" (jouer→joué), "nous <b>avons mangé</b>" (manger→mangé), "nous <b>avons vu</b>" (voir→vu). Toutes ces actions sont terminées dans le passé → passé composé.' }),

  makeMCQ({ id:'g4fr-passe-comp-020', chapterId:'g4fr-passe-comp', difficulty:2,
    question:'Conjugue ALLER au passé composé : "Elle ___ au marché."',
    options:['a allée','est allée','était allée','avait allé'],
    answer:'est allée',
    hint:'"Aller" utilise être. Elle = féminin → accord du participe.',
    explanation:'"Elle <b>est allée</b> au marché." - <b>aller</b> utilise être. Sujet féminin "elle" → accord : allé<b>e</b>. Règle : avec être, le participe passé s\'accorde avec le sujet : il est allé, <b>elle est allée</b>, ils sont allés, elles sont allées.' }),

  makeMCQ({ id:'g4fr-passe-comp-021', chapterId:'g4fr-passe-comp', difficulty:2,
    question:'Quel est le participe passé de METTRE ?',
    options:['metté','mis','mettis','mettant'],
    answer:'mis',
    hint:'Mettre → mis (irrégulier, à apprendre).',
    explanation:'"Mettre" → <b>mis</b> (irrégulier). J\'ai mis mon manteau. Verbes similaires : permettre → permis, promettre → promis, admettre → admis. Mémo : "mis" ressemble à "mise" (comme "mise en scène").' }),

  makeMCQ({ id:'g4fr-passe-comp-022', chapterId:'g4fr-passe-comp', difficulty:2,
    question:'Conjugue PARTIR au passé composé : "Ils ___ tôt ce matin."',
    options:['ont parti','sont partis','ont partis','est parti'],
    answer:'sont partis',
    hint:'"Partir" utilise être. Ils = masculin pluriel → accord.',
    explanation:'"Ils <b>sont partis</b> tôt ce matin." - <b>partir</b> utilise être. Sujet masculin pluriel "ils" → accord : parti<b>s</b>. Conjugaison complète : je suis parti(e), tu es parti(e), il est parti, elle est partie, nous sommes parti(e)s, vous êtes parti(e)(s), ils sont <b>partis</b>, elles sont parties.' }),

  makeTF({ id:'g4fr-passe-comp-023', chapterId:'g4fr-passe-comp', difficulty:2,
    question:'Au passé composé avec être, le participe passé s\'accorde avec le sujet.',
    answer:true,
    hint:'Il est allé / Elle est allée - la différence = accord.',
    explanation:'<b>Vrai.</b> Avec <b>être</b> comme auxiliaire, le participe passé s\'accorde avec le sujet : <b>il</b> est allé, <b>elle</b> est allée, <b>ils</b> sont allés, <b>elles</b> sont allées. Avec <b>avoir</b>, pas d\'accord avec le sujet : il a mangé, elle a mangé (pas de changement).' }),

  makeMCQ({ id:'g4fr-passe-comp-024', chapterId:'g4fr-passe-comp', difficulty:2,
    question:'Quel est le participe passé de OUVRIR ?',
    options:['ouvri','ouvert','ouvris','ouvrant'],
    answer:'ouvert',
    hint:'Ouvrir → ouvert (comme "une fenêtre ouverte").',
    explanation:'"Ouvrir" → <b>ouvert</b>. J\'ai ouvert la porte. Verbes similaires en -<b>vert</b> : couvrir → couvert, découvrir → découvert, offrir → offert, souffrir → souffert.' }),

  makeMCQ({ id:'g4fr-passe-comp-025', chapterId:'g4fr-passe-comp', difficulty:3,
    question:'Conjugue VENIR au passé composé : "Vous ___ à ma fête ?"',
    options:['avez venu','êtes venus','avez venus','êtes venez'],
    answer:'êtes venus',
    hint:'"Venir" utilise être. Vous = pluriel → accord.',
    explanation:'"Vous <b>êtes venus</b> à ma fête ?" - <b>venir</b> utilise être. "Vous" pluriel → venus. Attention : "vous" peut être singulier (poli) ou pluriel. Ici, pluriel → <b>êtes venus</b>.' }),

  makeMCQ({ id:'g4fr-passe-comp-026', chapterId:'g4fr-passe-comp', difficulty:3,
    question:'Quelle question au passé composé est correcte (inversion) ?',
    options:[
      'Est-ce que tu as mangé ?',
      'Tu as mangé est-ce que ?',
      'As-tu mangé ?',
      'A et C sont correctes.'
    ],
    answer:'A et C sont correctes.',
    hint:'Il y a deux façons de poser une question au passé composé.',
    explanation:'Il y a deux formes correctes : (A) "<b>Est-ce que</b> tu as mangé ?" (avec est-ce que) et (C) "<b>As</b>-tu mangé ?" (inversion sujet-auxiliaire). Les deux sont correctes. En inversion, l\'auxiliaire se met avant le sujet avec un trait d\'union : as-tu, a-t-il, avez-vous.' }),

  makeMCQ({ id:'g4fr-passe-comp-027', chapterId:'g4fr-passe-comp', difficulty:3,
    question:'Conjugue NAÎTRE au passé composé : "Je ___ à Curepipe."',
    options:['ai né','suis né(e)','avais né','était né'],
    answer:'suis né(e)',
    hint:'"Naître" utilise être. Je suis...',
    explanation:'"Je <b>suis né(e)</b> à Curepipe." - <b>naître</b> utilise être. Le participe passé "né" s\'accorde : je suis né (garçon), je suis née (fille). C\'est la même structure qu\'aller, venir, partir : sujet + être + participe accordé.' }),

  makeMCQ({ id:'g4fr-passe-comp-028', chapterId:'g4fr-passe-comp', difficulty:3,
    question:'Forme la question par inversion : "Tu es arrivé à l\'heure." →',
    options:[
      'Est-ce que tu es arrivé à l\'heure ?',
      'Es-tu arrivé à l\'heure ?',
      'Arrivé-tu es à l\'heure ?',
      'Es-tu arrives à l\'heure ?'
    ],
    answer:'Es-tu arrivé à l\'heure ?',
    hint:'Inversion : place l\'auxiliaire avant le sujet avec un trait d\'union.',
    explanation:'"<b>Es</b>-tu arrivé à l\'heure ?" - Pour l\'inversion avec être : l\'auxiliaire (es) se place avant le sujet (tu) avec un trait d\'union : <b>es-tu</b>. Le participe "arrivé" reste après. Autres exemples : est-il parti ? êtes-vous venus ? sont-elles arrivées ?' }),

  makeMCQ({ id:'g4fr-passe-comp-029', chapterId:'g4fr-passe-comp', difficulty:4,
    question:'Priya raconte : "Hier, ma famille ___ (aller) au restaurant. Mon père ___ (choisir) une pizza. Ma mère ___ (prendre) du riz. Moi, j\'___ (manger) une glace." Bonne série ?',
    options:[
      'est allée / a choisi / a pris / ai mangé',
      'a allée / a choisi / a pris / ai mangé',
      'est allée / a choisi / a pris / ai mangée',
      'est allé / a choisit / a prendu / ai mangé'
    ],
    answer:'est allée / a choisi / a pris / ai mangé',
    hint:'"Ma famille" = f.sg. → être + accord. Les autres = avoir.',
    explanation:'"Ma famille <b>est allée</b>" (aller+être, famille=f.sg. → allée). "Mon père <b>a choisi</b>" (choisir→choisi, avoir). "Ma mère <b>a pris</b>" (prendre→pris, irrégulier, avoir). "J\'<b>ai mangé</b>" (manger→mangé, avoir, pas de -e car avoir). Quatre règles en une phrase !' }),

  makeMCQ({ id:'g4fr-passe-comp-030', chapterId:'g4fr-passe-comp', difficulty:4,
    question:'Lesquelles de ces phrases sont correctes au passé composé avec être ? (Deux réponses correctes)',
    options:[
      'Elle est tombée de son vélo.',
      'Il a tombé de son vélo.',
      'Nous sommes restés à la maison.',
      'Nous avons restés à la maison.'
    ],
    answer:'Elle est tombée de son vélo.',
    hint:'"Tomber" et "rester" utilisent être. Mais vérifiez les accords.',
    explanation:'"<b>Elle est tombée</b>" ✓ (tomber = être, f.sg. → tombée). "Il a tombé" ✗ (tomber utilise être, pas avoir). "Nous sommes restés" ✓ (rester = être, m.pl. → restés). "Nous avons restés" ✗ (rester = être, pas avoir). Question : la réponse demande de choisir une parmi les options données → elle est tombée.' }),

  makeMCQ({ id:'g4fr-passe-comp-031', chapterId:'g4fr-passe-comp', difficulty:4,
    question:'Traduis : "Did you (tu) open the window and go out?" (passé composé)',
    options:[
      'Est-ce que tu as ouvert la fenêtre et es sorti(e) ?',
      'Est-ce que tu avais ouvert la fenêtre et sortais ?',
      'Tu ouvres la fenêtre et tu sors ?',
      'As-tu ouverte la fenêtre et allé dehors ?'
    ],
    answer:'Est-ce que tu as ouvert la fenêtre et es sorti(e) ?',
    hint:'"Ouvrir" → avoir. "Sortir" → être.',
    explanation:'"Est-ce que tu <b>as ouvert</b> la fenêtre et <b>es sorti(e)</b> ?" - "ouvrir" (→ avoir : tu as ouvert). "sortir" (→ être : tu es sorti/sortie). Deux verbes en une question : l\'un avec avoir, l\'autre avec être. "Ouverte" serait incorrect (avoir ne s\'accorde pas avec le sujet).' }),

  makeMCQ({ id:'g4fr-passe-comp-032', chapterId:'g4fr-passe-comp', difficulty:4,
    question:'Shanvi écrit dans son journal : "Aujourd\'hui ___ une bonne journée ! Ce matin, je ___ (se réveiller) tôt. Mes amis ___ (venir) chez moi. Nous ___ (jouer) et ___ (rire) beaucoup." Bonne série ?',
    options:[
      'a été / me suis réveillée / sont venus / avons joué / avons ri',
      'était / me suis réveillée / sont venus / avons joué / avons ri',
      'a été / me suis réveillée / ont venu / avons joué / avons ri',
      'a été / suis réveillée / sont venus / avons joué / avons ri'
    ],
    answer:'a été / me suis réveillée / sont venus / avons joué / avons ri',
    hint:'"Être" → a été. "Se réveiller" → être réfléchi. "Venir" → être. "Jouer/rire" → avoir.',
    explanation:'"<b>a été</b>" (être → avoir : ça a été). "<b>me suis réveillée</b>" (se réveiller = réfléchi → être, f. → -ée). "<b>sont venus</b>" (venir → être, ils m.pl. → venus). "<b>avons joué</b>" (jouer → avoir). "<b>avons ri</b>" (rire → ri, avoir). Cinq verbes, trois règles différentes !' }),

  makeMCQ({ id:'g4fr-passe-comp-033', chapterId:'g4fr-passe-comp', difficulty:3,
    question:'Conjugue RESTER au passé composé : "Elles ___ à la maison tout le week-end."',
    options:['ont resté','sont restées','avaient restées','sont restés'],
    answer:'sont restées',
    hint:'"Rester" utilise être. Elles = féminin pluriel → accord -ées.',
    explanation:'"Elles <b>sont restées</b>" - <b>rester</b> utilise être. Sujet féminin pluriel "elles" → participe passé accordé : rest-<b>ées</b>. Rappel : avec être, accord avec le sujet : il est resté / elle est restée / ils sont restés / elles sont <b>restées</b>.' }),

  makeMCQ({ id:'g4fr-passe-comp-034', chapterId:'g4fr-passe-comp', difficulty:4,
    question:'Complète le message de Ravi à sa cousine : "Ce week-end, je ___ (sortir) avec papa. Nous ___ (aller) au marché et nous ___ (acheter) des fruits. Maman ___ (rester) à la maison et elle ___ (faire) un gâteau."',
    options:[
      'suis sorti / sommes allés / avons acheté / est restée / a fait',
      'ai sorti / avons allés / avons acheté / a restée / a fait',
      'suis sorti / sommes allés / avons acheté / a restée / a faisé',
      'suis sorti / sommes allés / avons acheté / est restée / a faisé'
    ],
    answer:'suis sorti / sommes allés / avons acheté / est restée / a fait',
    hint:'"Sortir" et "aller" et "rester" = être. "Acheter" et "faire" = avoir.',
    explanation:'"<b>suis sorti</b>" (sortir→être, je m.), "<b>sommes allés</b>" (aller→être, nous m.pl.), "<b>avons acheté</b>" (acheter→avoir), "<b>est restée</b>" (rester→être, elle f. → -ée), "<b>a fait</b>" (faire→fait, avoir). Cinq verbes : trois avec être, deux avec avoir !' }),

  makeMCQ({ id:'g4fr-passe-comp-035', chapterId:'g4fr-passe-comp', difficulty:4,
    question:'La maîtresse demande : "Qu\'est-ce que tu ___ (faire) hier ?" Priya répond : "J\'___ (aller) à la plage avec ma famille. Nous ___ (jouer) au foot et nous ___ (manger) une glace." Choisis la bonne réponse pour Priya.',
    options:[
      'as fait / suis allée / avons joué / avons mangé',
      'a fait / suis allée / avons joué / avons mangé',
      'as fait / suis allée / avons jouée / avons mangée',
      'as fait / ai allée / avons joué / avons mangé'
    ],
    answer:'as fait / suis allée / avons joué / avons mangé',
    hint:'"Faire" = avoir (tu as fait). "Aller" = être (je suis allée - Priya est fille). "Jouer/manger" = avoir.',
    explanation:'"tu <b>as fait</b>" (faire→avoir, tu). "j\'<b>suis allée</b>" (aller→être, je f. → allée). "<b>avons joué</b>" (jouer→avoir, nous - pas d\'accord). "<b>avons mangé</b>" (manger→avoir, nous). Avec avoir, pas d\'accord sauf COD placé avant !' })

);
