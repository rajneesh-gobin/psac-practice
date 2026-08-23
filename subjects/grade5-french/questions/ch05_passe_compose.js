'use strict';
// Grade 5 French — Chapitre : Le Passé Composé
// IDs format: g5fr-pc-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-pc-001', chapterId:'fr-passe-compose', difficulty:1,
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

  makeMCQ({ id:'g5fr-pc-002', chapterId:'fr-passe-compose', difficulty:1,
    question:'Quel est le participe passé du verbe "parler" ?',
    options:['parlé','parlés','parlant','parler'],
    answer:'parlé',
    hint:'Les verbes en -ER : enlever -er, ajouter -é.',
    explanation:'"<b>Parlé</b>" est le participe passé de "parler". Règle pour les verbes en -ER : enlever -er → ajouter <b>-é</b>. Exemples : manger → mangé, jouer → joué, regarder → regardé.' }),

  makeMCQ({ id:'g5fr-pc-003', chapterId:'fr-passe-compose', difficulty:2,
    question:'Complétez : "Elle ___ (finir) ses devoirs hier."',
    options:['a fini','est finie','a finit','avait fini'],
    answer:'a fini',
    hint:'Finir utilise "avoir" comme auxiliaire. Participe passé de finir = fini.',
    explanation:'"Elle <b>a fini</b> ses devoirs hier." — finir → participe passé : <b>fini</b>. Auxiliaire : avoir → elle a. Règle -IR : enlever -ir → ajouter <b>-i</b>. Exemples : choisir → choisi, grandir → grandi.' }),

  makeMCQ({ id:'g5fr-pc-004', chapterId:'fr-passe-compose', difficulty:2,
    question:'Quel auxiliaire le verbe "aller" utilise-t-il au passé composé ?',
    options:['avoir','être','aller','faire'],
    answer:'être',
    hint:'"Aller" fait partie du groupe DR MRS VAN DER TRAMP.',
    explanation:'"Aller" utilise <b>être</b> comme auxiliaire : je <b>suis allé(e)</b>. Avec "être", le participe passé s\'accorde avec le sujet : il est allé / elle est all<b>ée</b> / ils sont all<b>és</b> / elles sont all<b>ées</b>.' }),

  makeTF({ id:'g5fr-pc-005', chapterId:'fr-passe-compose', difficulty:2,
    question:'Avec l\'auxiliaire "être", le participe passé s\'accorde avec le sujet.',
    answer:true,
    hint:'Comparez : "Il est parti" et "Elle est partie".',
    explanation:'<b>Vrai.</b> Avec l\'auxiliaire <b>être</b>, le participe passé s\'accorde en genre et en nombre avec le sujet : il est parti, elle est parti<b>e</b>, ils sont parti<b>s</b>, elles sont parti<b>es</b>. Avec "avoir", pas d\'accord (en général).' }),

  makeMCQ({ id:'g5fr-pc-006', chapterId:'fr-passe-compose', difficulty:2,
    question:'Quel est le participe passé irrégulier du verbe "avoir" ?',
    options:['avé','avait','eu','avoir'],
    answer:'eu',
    hint:'"Avoir" → participe passé = "eu" (ça ne ressemble pas à l\'infinitif !)',
    explanation:'"<b>Eu</b>" est le participe passé irrégulier de "avoir" : j\'<b>ai eu</b>. Participes passés irréguliers à connaître : avoir → eu, être → été, faire → fait, prendre → pris, voir → vu, boire → bu.' }),

  makeMCQ({ id:'g5fr-pc-007', chapterId:'fr-passe-compose', difficulty:2,
    question:'Quel est le participe passé de "faire" ?',
    options:['faisé','fai','faisant','fait'],
    answer:'fait',
    hint:'"Faire" est irrégulier. Son participe passé se prononce comme "fay".',
    explanation:'"<b>Fait</b>" est le participe passé de "faire" : j\'ai <b>fait</b> mes devoirs. Autres irréguliers : prendre → pris, mettre → mis, écrire → écrit, lire → lu, venir → venu, partir → parti.' }),

  makeMCQ({ id:'g5fr-pc-008', chapterId:'fr-passe-compose', difficulty:2,
    question:'Complétez : "Elles ___ (partir) à huit heures."',
    options:['ont parti','sont parti','sont parties','ont parties'],
    answer:'sont parties',
    hint:'"Partir" utilise "être". Sujet = "elles" → féminin pluriel → accord du participe.',
    explanation:'"Elles <b>sont parties</b>." — partir utilise être. Accord avec le sujet "elles" (féminin pluriel) : parti + <b>es</b>. Règle : avec être, le participe s\'accorde — masc. sing. : parti / fém. sing. : partie / masc. plur. : partis / fém. plur. : <b>parties</b>.' }),

  makeTF({ id:'g5fr-pc-009', chapterId:'fr-passe-compose', difficulty:1,
    question:'Le passé composé s\'utilise pour parler d\'une action terminée dans le passé.',
    answer:true,
    hint:'Hier, j\'ai mangé → l\'action est terminée.',
    explanation:'<b>Vrai.</b> Le passé composé exprime une action <b>terminée</b> dans le passé : "Hier, j\'<b>ai mangé</b> une pomme." Comparer avec l\'imparfait qui exprime une action habituelle ou en cours : "Je <b>mangeais</b> quand il est arrivé."' }),

  makeMCQ({ id:'g5fr-pc-010', chapterId:'fr-passe-compose', difficulty:2,
    question:'Quel est le participe passé de "prendre" ?',
    options:['prené','prendé','pris','prendu'],
    answer:'pris',
    hint:'"Prendre" est irrégulier. Son participe passé est court.',
    explanation:'"<b>Pris</b>" est le participe passé de "prendre" : j\'<b>ai pris</b> le bus. Autres verbes en -endre : apprendre → appris, comprendre → compris, surprendre → surpris.' })

);
