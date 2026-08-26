'use strict';
// Grade 5 French - Chapitre : Le Passé Composé
// IDs format: g5fr-pc-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-pc-001', chapterId:'fr-passe-compose', subsection:'formation', difficulty:1,
    question:'Quelle est la structure du passé composé ?',
    options:[
      'radical + terminaison',
      'auxiliaire (avoir ou être) + participe passé',
      'infinitif + terminaison',
      'sujet + verbe seulement'
    ],
    answer:'auxiliaire (avoir ou être) + participe passé',
    hint:'Le passé composé se forme avec deux mots.',
    explanation:'Passé composé = <b>auxiliaire</b> (avoir ou être) + <b>participe passé</b>. Exemples : j\'<b>ai mangé</b> (avoir + mangé), je <b>suis allé(e)</b> (être + allé). La plupart des verbes utilisent "avoir".' }),

  makeMCQ({ id:'g5fr-pc-002', chapterId:'fr-passe-compose', subsection:'participe', difficulty:1,
    question:'Quel est le participe passé du verbe "parler" ?',
    options:['parlé','parlés','parlant','parler'],
    answer:'parlé',
    hint:'Les verbes en -ER : enlever -er, ajouter -é.',
    explanation:'"<b>Parlé</b>" est le participe passé de "parler". Règle pour les verbes en -ER : enlever -er → ajouter <b>-é</b>. Exemples : manger → mangé, jouer → joué, regarder → regardé.' }),

  makeMCQ({ id:'g5fr-pc-003', chapterId:'fr-passe-compose', subsection:'formation', difficulty:2,
    question:'Complétez : "Elle ___ (finir) ses devoirs hier."',
    options:['a fini','est finie','a finit','avait fini'],
    answer:'a fini',
    hint:'Finir utilise "avoir" comme auxiliaire. Participe passé de finir = fini.',
    explanation:'"Elle <b>a fini</b> ses devoirs hier." - finir → participe passé : <b>fini</b>. Auxiliaire : avoir → elle a. Règle -IR : enlever -ir → ajouter <b>-i</b>. Exemples : choisir → choisi, grandir → grandi.' }),

  makeMCQ({ id:'g5fr-pc-004', chapterId:'fr-passe-compose', subsection:'auxiliaire', difficulty:2,
    question:'Quel auxiliaire le verbe "aller" utilise-t-il au passé composé ?',
    options:['avoir','être','aller','faire'],
    answer:'être',
    hint:'"Aller" fait partie du groupe DR MRS VAN DER TRAMP.',
    explanation:'"Aller" utilise <b>être</b> comme auxiliaire : je <b>suis allé(e)</b>. Avec "être", le participe passé s\'accorde avec le sujet : il est allé / elle est all<b>ée</b> / ils sont all<b>és</b> / elles sont all<b>ées</b>.' }),

  makeTF({ id:'g5fr-pc-005', chapterId:'fr-passe-compose', subsection:'auxiliaire', difficulty:2,
    question:'Avec l\'auxiliaire "être", le participe passé s\'accorde avec le sujet.',
    answer:true,
    hint:'Comparez : "Il est parti" et "Elle est partie".',
    explanation:'<b>Vrai.</b> Avec l\'auxiliaire <b>être</b>, le participe passé s\'accorde en genre et en nombre avec le sujet : il est parti, elle est parti<b>e</b>, ils sont parti<b>s</b>, elles sont parti<b>es</b>. Avec "avoir", pas d\'accord (en général).' }),

  makeMCQ({ id:'g5fr-pc-006', chapterId:'fr-passe-compose', subsection:'participe', difficulty:2,
    question:'Quel est le participe passé irrégulier du verbe "avoir" ?',
    options:['avé','avait','eu','avoir'],
    answer:'eu',
    hint:'"Avoir" → participe passé = "eu" (ça ne ressemble pas à l\'infinitif !)',
    explanation:'"<b>Eu</b>" est le participe passé irrégulier de "avoir" : j\'<b>ai eu</b>. Participes passés irréguliers à connaître : avoir → eu, être → été, faire → fait, prendre → pris, voir → vu, boire → bu.' }),

  makeMCQ({ id:'g5fr-pc-007', chapterId:'fr-passe-compose', subsection:'participe', difficulty:2,
    question:'Quel est le participe passé de "faire" ?',
    options:['faisé','fai','faisant','fait'],
    answer:'fait',
    hint:'"Faire" est irrégulier. Son participe passé se prononce comme "fay".',
    explanation:'"<b>Fait</b>" est le participe passé de "faire" : j\'ai <b>fait</b> mes devoirs. Autres irréguliers : prendre → pris, mettre → mis, écrire → écrit, lire → lu, venir → venu, partir → parti.' }),

  makeMCQ({ id:'g5fr-pc-008', chapterId:'fr-passe-compose', subsection:'formation', difficulty:2,
    question:'Complétez : "Elles ___ (partir) à huit heures."',
    options:['ont parti','sont parti','sont parties','ont parties'],
    answer:'sont parties',
    hint:'"Partir" utilise "être". Sujet = "elles" → féminin pluriel → accord du participe.',
    explanation:'"Elles <b>sont parties</b>." - partir utilise être. Accord avec le sujet "elles" (féminin pluriel) : parti + <b>es</b>. Règle : avec être, le participe s\'accorde - masc. sing. : parti / fém. sing. : partie / masc. plur. : partis / fém. plur. : <b>parties</b>.' }),

  makeTF({ id:'g5fr-pc-009', chapterId:'fr-passe-compose', subsection:'usage', difficulty:1,
    question:'Le passé composé s\'utilise pour parler d\'une action terminée dans le passé.',
    answer:true,
    hint:'Hier, j\'ai mangé → l\'action est terminée.',
    explanation:'<b>Vrai.</b> Le passé composé exprime une action <b>terminée</b> dans le passé : "Hier, j\'<b>ai mangé</b> une pomme." Comparer avec l\'imparfait qui exprime une action habituelle ou en cours : "Je <b>mangeais</b> quand il est arrivé."' }),

  makeMCQ({ id:'g5fr-pc-010', chapterId:'fr-passe-compose', subsection:'participe', difficulty:2,
    question:'Quel est le participe passé de "prendre" ?',
    options:['prené','prendé','pris','prendu'],
    answer:'pris',
    hint:'"Prendre" est irrégulier. Son participe passé est court.',
    explanation:'"<b>Pris</b>" est le participe passé de "prendre" : j\'<b>ai pris</b> le bus. Autres verbes en -endre : apprendre → appris, comprendre → compris, surprendre → surpris.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-pc-011', chapterId:'fr-passe-compose', subsection:'participe', difficulty:1,
    question:'Quel est le participe passé de "voir" ?',
    options:['voyé','vé','vu','voir'],
    answer:'vu',
    hint:'"Voir" est irrégulier. "J\'ai ___ ce film."',
    explanation:'"<b>vu</b>" - voir → vu. J\'ai vu, tu as vu, il a vu. Autres participes passés irréguliers en -u : boire → bu, croire → cru, lire → lu, courir → couru, savoir → su.' }),

  makeMCQ({ id:'g5fr-pc-012', chapterId:'fr-passe-compose', subsection:'auxiliaire', difficulty:1,
    question:'Quel auxiliaire le verbe "venir" utilise-t-il au passé composé ?',
    options:['avoir','être','aller','faire'],
    answer:'être',
    hint:'"Venir" fait partie du groupe DR MRS VAN DER TRAMP.',
    explanation:'"<b>être</b>" - venir utilise être : je suis venu(e). Les verbes DR MRS VAN DER TRAMP (Devenir, Revenir, Mourir, Rester, Sortir, Venir, Arriver, Naître, Descendre, Entrer, Rentrer, Tomber, Repartir, Aller, Monter, Partir) + tous les verbes réfléchis utilisent être.' }),

  makeMCQ({ id:'g5fr-pc-013', chapterId:'fr-passe-compose', subsection:'formation', difficulty:2,
    question:'Complétez : "Il ___ (tomber) de son vélo hier."',
    options:['a tombé','est tombé','a tombe','est tombe'],
    answer:'est tombé',
    hint:'"Tomber" utilise l\'auxiliaire "être".',
    explanation:'"Il <b>est tombé</b> de son vélo hier." - tomber utilise être. Accord : il est tombé / elle est tombée / ils sont tombés / elles sont tombées. Autres verbes similaires : monter → il est monté, descendre → il est descendu.' }),

  makeMCQ({ id:'g5fr-pc-014', chapterId:'fr-passe-compose', subsection:'formation', difficulty:2,
    question:'Comment forme-t-on la NÉGATION au passé composé ?\n"Il a mangé." → ?',
    options:[
      'Il n\'a pas mangé.',
      'Il a ne mangé pas.',
      'Il n\'mangé pas a.',
      'Il ne pas a mangé.'
    ],
    answer:'Il n\'a pas mangé.',
    hint:'Au passé composé, "ne...pas" encadre l\'AUXILIAIRE, pas le participe passé.',
    explanation:'"Il <b>n\'a pas mangé</b>." - La négation au passé composé : sujet + <b>ne</b> + auxiliaire + <b>pas</b> + participe passé. "Ne" et "pas" encadrent l\'auxiliaire. Exemples : Elle n\'est pas venue. / Nous n\'avons pas fini.' }),

  makeMCQ({ id:'g5fr-pc-015', chapterId:'fr-passe-compose', subsection:'formation', difficulty:2,
    question:'Complétez : "Nous ___ (aller) à la plage samedi dernier."',
    options:['avons allé','sommes allés','sommes allées','avons allés'],
    answer:'sommes allés',
    hint:'"Aller" utilise être. Sujet = "nous" (groupe masculin ou mixte → -és).',
    explanation:'"Nous <b>sommes allés</b> à la plage." - aller → être. Pour "nous" (masculin ou mixte) : sommes + allés. Pour un groupe féminin : nous sommes allées. Avec être, le participe s\'accorde avec le sujet.' }),

  makeMCQ({ id:'g5fr-pc-016', chapterId:'fr-passe-compose', subsection:'participe', difficulty:2,
    question:'Quel est le participe passé de "boire" ?',
    options:['boiré','bu','boi','buvé'],
    answer:'bu',
    hint:'"Boire" est irrégulier. "Il a ___ de l\'eau."',
    explanation:'"<b>bu</b>" - boire → bu. J\'ai bu de l\'eau. Participes irréguliers en -u : boire → bu, avoir → eu, savoir → su, lire → lu, croire → cru. Ces formes doivent être mémorisées car elles n\'ont pas de règle commune.' }),

  makeMCQ({ id:'g5fr-pc-017', chapterId:'fr-passe-compose', subsection:'formation', difficulty:3,
    question:'Complétez : "Elles ___ (naître) à Maurice."',
    options:['ont nées','sont nées','sont nés','ont naîts'],
    answer:'sont nées',
    hint:'"Naître" utilise être. Sujet = "elles" → accord féminin pluriel.',
    explanation:'"Elles <b>sont nées</b> à Maurice." - naître utilise être. Accord féminin pluriel : né + es = nées. Tableau : il est né / elle est née / ils sont nés / elles sont <b>nées</b>. "Naître" fait partie du groupe DR MRS VAN DER TRAMP (N = naître).' }),

  makeMCQ({ id:'g5fr-pc-018', chapterId:'fr-passe-compose', subsection:'formation', difficulty:3,
    question:'Question type PSAC 2025 (Q4c) : "La semaine dernière, ta voisine ___ pour la France." (partir)',
    options:['a parti','est partie','a partis','est partes'],
    answer:'est partie',
    hint:'"Partir" utilise être. Sujet = "ta voisine" (féminin singulier).',
    explanation:'"ta voisine <b>est partie</b> pour la France." - partir utilise être. Accord : "ta voisine" = féminin singulier → partie. Masc. : ton voisin est parti. Fém. : ta voisine est partie. Plur. masc. : ils sont partis. Plur. fém. : elles sont parties. (Cette phrase exacte a été testée au PSAC 2025 Q4c.)' }),

  makeMCQ({ id:'g5fr-pc-019', chapterId:'fr-passe-compose', subsection:'formation', difficulty:4,
    question:'Trouvez l\'erreur dans : "Hier soir, ils ont allé au cinéma et ont bu une limonade."',
    options:[
      '"ont bu" est faux → il faut "sont bu"',
      '"ont allé" est faux → il faut "sont allés" (aller utilise être)',
      '"hier soir" est faux → utiliser seulement "hier"',
      'Il n\'y a pas d\'erreur dans cette phrase'
    ],
    answer:'"ont allé" est faux → il faut "sont allés" (aller utilise être)',
    hint:'Vérifiez l\'auxiliaire du verbe "aller".',
    explanation:'"<b>ont allé</b>" → "<b>sont allés</b>" - aller utilise ÊTRE, pas avoir. "Ils sont allés au cinéma." "Ont bu" est correct (boire → avoir → ils ont bu). L\'erreur la plus courante au PSAC : utiliser "avoir" avec les verbes DR MRS VAN DER TRAMP. "Aller" prend TOUJOURS être.' }),

  makeMCQ({ id:'g5fr-pc-020', chapterId:'fr-passe-compose', subsection:'formation', difficulty:2,
    question:'Complétez : "Elle ___ (sortir) en courant."',
    options:['a sorti','est sortie','est sorti','a sortie'],
    answer:'est sortie',
    hint:'"Sortir" utilise être. Sujet = "elle" → féminin singulier.',
    explanation:'"Elle <b>est sortie</b> en courant." - sortir utilise être. Accord féminin singulier : sorti + <b>e</b> = sortie. Attention : "sortir" peut utiliser AVOIR quand il a un COD ("Elle a sorti les poubelles") - mais ici, pas de COD → être.' }),

  makeMCQ({ id:'g5fr-pc-021', chapterId:'fr-passe-compose', subsection:'formation', difficulty:2,
    question:'Complétez : "Ils ___ (tomber) dans l\'escalier."',
    options:['ont tombé','sont tombés','sont tombé','ont tombés'],
    answer:'sont tombés',
    hint:'"Tomber" utilise être. Sujet = "ils" → masculin pluriel.',
    explanation:'"Ils <b>sont tombés</b> dans l\'escalier." - tomber utilise être. Accord masculin pluriel : tombé + <b>s</b> = tombés. Tableau : il est tombé / elle est tombée / ils sont tombés / elles sont tombées.' }),

  makeTF({ id:'g5fr-pc-022', chapterId:'fr-passe-compose', subsection:'accord', difficulty:2,
    question:'"Elles sont montées" - l\'accord "-ées" est correct pour un groupe féminin avec "monter".',
    answer:true,
    hint:'"Elles" = féminin pluriel → montées.',
    explanation:'<b>Vrai.</b> monter → être → accord avec le sujet. "Elles" = féminin pluriel → montées (montée + s). Tableau de monter : il est monté / elle est montée / ils sont montés / elles sont <b>montées</b>.' }),

  makeMCQ({ id:'g5fr-pc-023', chapterId:'fr-passe-compose', subsection:'formation', difficulty:1,
    question:'Dans l\'aide-mémoire DR MRS VANDERTRAMP, quelle lettre représente "Venir" ?',
    options:['D','M','V','T'],
    answer:'V',
    hint:'Cherchez la première lettre de "Venir" dans l\'acronyme.',
    explanation:'"<b>V</b>" pour Venir. DR MRS VANDERTRAMP : <b>D</b>escendre, <b>R</b>entrer, <b>M</b>ourir, <b>R</b>ester, <b>S</b>ortir, <b>V</b>enir, <b>A</b>rriver, <b>N</b>aître, <b>D</b>evenir, <b>E</b>ntrer, <b>R</b>etourner, <b>T</b>omber, <b>R</b>etourner, <b>A</b>ller, <b>M</b>onter, <b>P</b>artir. Tous ces verbes utilisent être au passé composé.' }),

  makeMCQ({ id:'g5fr-pc-024', chapterId:'fr-passe-compose', subsection:'formation', difficulty:2,
    question:'Verbe pronominal : "Les enfants ___ (s\'amuser) au parc."',
    options:['ont amusé','se sont amusés','s\'ont amusés','se sont amusé'],
    answer:'se sont amusés',
    hint:'Les verbes pronominaux utilisent être. Sujet pluriel masculin = -és.',
    explanation:'"Les enfants <b>se sont amusés</b>." - s\'amuser est pronominal → être. "Les enfants" = masculin pluriel → amusé + s = amusés. Structure : sujet + se (s\') + être + participe passé accordé. Exemples : Elle s\'est levée. Ils se sont levés.' }),

  makeMCQ({ id:'g5fr-pc-025', chapterId:'fr-passe-compose', subsection:'accord', difficulty:3,
    question:'Accord avec COD précédant : "La lettre qu\'il ___ (écrire) est belle."',
    options:['a écrit','a écrite','est écrite','a écrits'],
    answer:'a écrite',
    hint:'Le COD "que" (= la lettre, féminin) précède le verbe → accord du participe passé.',
    explanation:'"La lettre qu\'il <b>a écrite</b>." - Le pronom relatif "que" représente "la lettre" (féminin singulier). Quand le COD précède le verbe (avoir), le participe s\'accorde : écrit + e = écrite. Exemple : les livres qu\'il a <b>écrits</b> (masc. plur.).' }),

  makeTF({ id:'g5fr-pc-026', chapterId:'fr-passe-compose', subsection:'auxiliaire', difficulty:2,
    question:'"Mourir" utilise l\'auxiliaire être au passé composé.',
    answer:true,
    hint:'"Mourir" fait partie du groupe DR MRS VANDERTRAMP.',
    explanation:'<b>Vrai.</b> "Mourir" utilise être : il est mort, elle est morte, ils sont morts, elles sont mortes. C\'est le M de DR MRS VANDER<b>M</b>...TRAMP. Exemple : "Le dodo est mort il y a plusieurs siècles."' }),

  makeMCQ({ id:'g5fr-pc-027', chapterId:'fr-passe-compose', subsection:'auxiliaire', difficulty:1,
    question:'Quel auxiliaire utilise "naître" au passé composé ?',
    options:['avoir','être','aucun des deux','les deux sont possibles'],
    answer:'être',
    hint:'"Naître" fait partie des verbes de mouvement/état avec être.',
    explanation:'"<b>être</b>" - naître utilise être : je suis né(e), il est né, elle est née, nous sommes né(e)s. Exemple : "Riya est née à Port-Louis." Ne jamais dire "j\'ai né" - c\'est une erreur fréquente.' }),

  makeMCQ({ id:'g5fr-pc-028', chapterId:'fr-passe-compose', subsection:'formation', difficulty:2,
    question:'Complétez : "Il ___ (revenir) de vacances hier."',
    options:['a revenu','est revenu','est revenu','a reveni'],
    answer:'est revenu',
    hint:'"Revenir" = re + venir → utilise être.',
    explanation:'"Il <b>est revenu</b> de vacances." - revenir = re- + venir. Tous les composés de "venir" utilisent être : revenir, devenir, parvenir, survenir. Accord : il est revenu, elle est revenue, ils sont revenus.' }),

  makeMCQ({ id:'g5fr-pc-029', chapterId:'fr-passe-compose', subsection:'formation', difficulty:2,
    question:'Choisissez la forme correcte : "_____ (partir) pour l\'école, les filles ont pris le bus."',
    options:['Elles ont parti','Elles sont parties','Elles sont partis','Elles ont parties'],
    answer:'Elles sont parties',
    hint:'"Partir" utilise être. "Les filles" = féminin pluriel → -ies.',
    explanation:'"Elles <b>sont parties</b> pour l\'école." - partir utilise être. "Les filles" = elles = féminin pluriel → partie + s = <b>parties</b>. Tableau : il est parti / elle est partie / ils sont partis / elles sont parties.' }),

  makeTF({ id:'g5fr-pc-030', chapterId:'fr-passe-compose', subsection:'formation', difficulty:3,
    question:'"Descendre" peut utiliser soit "être" soit "avoir" selon le sens de la phrase.',
    answer:true,
    hint:'"Il est descendu" (intransitif) vs "Il a descendu la valise" (transitif).',
    explanation:'<b>Vrai.</b> "Descendre" est ambivalent : (1) Sans COD → être : "Il <b>est descendu</b> de sa chambre." (2) Avec COD → avoir : "Il <b>a descendu</b> la valise." (il a descendu quelque chose). Même règle pour monter, sortir, rentrer, retourner.' }),

  makeMCQ({ id:'g5fr-pc-031', chapterId:'fr-passe-compose', subsection:'formation', difficulty:3,
    question:'Pronominal : "Vous ___ (se souvenir) de cette journée ?"',
    options:['avez souvenu','vous êtes souvenus','vous avez souvenus','êtes souvenus'],
    answer:'vous êtes souvenus',
    hint:'Se souvenir = pronominal → être. "Vous" = masc. pluriel → -us.',
    explanation:'"Vous <b>vous êtes souvenus</b> de cette journée ?" - se souvenir est pronominal → être. "Vous" = 2ème personne plurielle (masculin ou mixte) → souvenu + s = souvenus. Structure : vous + vous + êtes + souvenus.' }),

  makeMCQ({ id:'g5fr-pc-032', chapterId:'fr-passe-compose', subsection:'auxiliaire', difficulty:2,
    question:'"Retourner" utilise quel auxiliaire au passé composé ?',
    options:['avoir','être','les deux sont possibles','aucun des deux'],
    answer:'être',
    hint:'"Retourner" fait partie de DR MRS VANDERTRAMP (R = retourner).',
    explanation:'"<b>être</b>" - retourner utilise être : il est retourné (au sens de "revenir"). Exemple : "Elle est retournée chez sa grand-mère." Attention : "Il a retourné la crêpe" (flip the pancake) → avoir avec COD.' }),

  makeMCQ({ id:'g5fr-pc-033', chapterId:'fr-passe-compose', subsection:'accord', difficulty:3,
    question:'Accord avec COD précédant : "Les filles que nous avons ___ (rencontrer) sont sympas."',
    options:['rencontré','rencontrée','rencontrées','rencontrés'],
    answer:'rencontrées',
    hint:'"Que" = les filles (féminin pluriel) → accord du participe passé.',
    explanation:'"Les filles que nous avons <b>rencontrées</b>." - "que" représente "les filles" (féminin pluriel). Le COD précède → accord : rencontré + es = <b>rencontrées</b>. Si c\'était "les garçons" → rencontrés. Si c\'était "la fille" → rencontrée.' }),

  makeMCQ({ id:'g5fr-pc-034', chapterId:'fr-passe-compose', subsection:'formation', difficulty:3,
    question:'Pourquoi dit-on "Il a sorti les poubelles" et non "Il est sorti les poubelles" ?',
    options:[
      'Parce que "sortir" utilise toujours avoir',
      'Parce qu\'il y a un COD (les poubelles) → avoir',
      'C\'est une exception sans règle',
      'Parce que "poubelles" est pluriel'
    ],
    answer:'Parce qu\'il y a un COD (les poubelles) → avoir',
    hint:'"Sortir" utilise être (sens intransitif) ou avoir (avec COD).',
    explanation:'"Il <b>a sorti</b> les poubelles" - "les poubelles" est le COD (complement d\'objet direct). Quand "sortir" a un COD, il utilise <b>avoir</b>. Sans COD → être : "Il est sorti." Même règle pour descendre, monter, rentrer, retourner.' }),

  makeMCQ({ id:'g5fr-pc-035', chapterId:'fr-passe-compose', subsection:'formation', difficulty:4,
    question:'Complétez : "Hier, ma mère ___ (aller) au marché, ___ (acheter) des légumes, ___ (rentrer) à la maison et ___ (préparer) un bon repas."',
    options:[
      'est allée / a acheté / est rentrée / a préparé',
      'a allé / a acheté / a rentré / a préparé',
      'est allée / est acheté / est rentrée / est préparée',
      'est allée / a acheté / a rentré / a préparé'
    ],
    answer:'est allée / a acheté / est rentrée / a préparé',
    hint:'Aller → être (fém. = allée). Acheter → avoir. Rentrer → être (fém. = rentrée). Préparer → avoir.',
    explanation:'"Ma mère <b>est allée</b> (aller + être, fém. = allée) / <b>a acheté</b> (acheter + avoir) / <b>est rentrée</b> (rentrer + être, fém. = rentrée) / <b>a préparé</b> (préparer + avoir)." - aller et rentrer = être (VANDERTRAMP) ; acheter et préparer = avoir.' })

);
