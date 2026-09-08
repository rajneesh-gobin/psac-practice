'use strict';
// Grade 4 French - Corriger les erreurs (PSAC Q7A).
// PSAC question 7 is worth 10 marks and is set in TWO halves: 7A « Corrige les
// erreurs soulignées » (5 marks) and 7B « Écris chaque mot entre parenthèses à
// la forme correcte » (5 marks). The bank covered 7B only - this is 7A.
//
// ⚠ These are `text` items: the child TYPES the correction, exactly as on the
// paper. makeText marks accents leniently (a phone keyboard that will not
// produce « é » is a device problem, not a French mistake) but refuses to build
// an item whose answer differs from a confusable ONLY by an accent - see
// scripts/test-french-text-answers.js.
//
// Grade 4 is the easy end of the ladder: short concrete sentences, one error
// each, and only the four commonest confusions. Grades 5 and 6 add on/ont,
// ces/ses, c'est/s'est, the participle with avoir, and the accent homophones.
// Data table + loop, like extended_practice_bank.js.
(function () {
  const CH = 'g4fr-formation';

  const RULES = {
    sont:   '<b>sont</b> est le verbe être : on peut dire « <i>étaient</i> ». <b>son</b> se met devant un nom : son cahier.',
    son:    '<b>son</b> se met devant un nom : son cahier, son sac. <b>sont</b> est le verbe être : « <i>étaient</i> ».',
    ce:     '<b>ce</b> se met devant un <b>nom</b> : ce livre, ce chien. <b>se</b> se met devant un <b>verbe</b> : il se lave.',
    se:     '<b>se</b> se met devant un <b>verbe</b> : il se lave, elle se repose. <b>ce</b> se met devant un nom : ce livre.',
    ppetre: 'Avec <b>être</b>, le participe passé s\'accorde avec le <b>sujet</b> : les portes sont ferm<b>ées</b>.',
    adj:    'L\'adjectif s\'accorde avec le nom : au pluriel il prend un <b>-s</b>, au féminin un <b>-e</b>.',
    tous:   '<b>tous</b> / <b>toutes</b> se mettent devant un nom au pluriel ; <b>tout</b> / <b>toute</b> devant un nom au singulier.',
    leurs:  'Devant un nom au <b>pluriel</b>, on écrit <b>leurs</b> : leurs cahiers.',
    leur:   'Devant un nom au <b>singulier</b>, on écrit <b>leur</b> sans -s : leur maître.',
  };

  const HINTS = {
    son_sont:           'Essaie de remplacer le mot par « <i>étaient</i> ». Si la phrase se dit encore, il faut <b>sont</b>.',
    ce_se:              'Regarde le mot qui suit : un <b>nom</b> demande « ce », un <b>verbe</b> demande « se ».',
    accord_participe:   'Cherche le sujet : de qui parle-t-on ? Le participe prend la même marque que lui.',
    accord_nom_adjectif:'Compte : combien y en a-t-il ? Et est-ce masculin ou féminin ?',
    tout_leur:          'Le nom qui suit est-il au singulier ou au pluriel ? Le petit mot s\'accorde avec lui.',
  };

  // [subsection, difficulty, wrong, answer, sentence with ___, ruleKey]
  const ROWS = [
    // ── son / sont ───────────────────────────────────────────────────
    ['son_sont', 1, 'son',  'sont',  'Les élèves ___ dans la classe.',            'sont'],
    ['son_sont', 1, 'sont', 'son',   'Marie cherche ___ cahier.',                 'son'],
    ['son_sont', 1, 'son',  'sont',  'Mes parents ___ au marché.',                'sont'],
    ['son_sont', 1, 'sont', 'son',   'Le chien remue ___ queue.',                 'son'],
    ['son_sont', 1, 'son',  'sont',  'Les mangues ___ mûres.',                    'sont'],
    ['son_sont', 1, 'sont', 'son',   'Papa gare ___ camion devant la maison.',    'son'],
    ['son_sont', 1, 'son',  'sont',  'Les portes ___ ouvertes.',                  'sont'],
    ['son_sont', 1, 'sont', 'son',   'Ravi a perdu ___ stylo bleu.',              'son'],
    ['son_sont', 2, 'son',  'sont',  'Les oiseaux ___ dans le manguier.',         'sont'],
    ['son_sont', 1, 'sont', 'son',   'Elle range ___ sac sous la table.',         'son'],
    ['son_sont', 1, 'son',  'sont',  'Les fleurs ___ très jolies.',               'sont'],
    ['son_sont', 2, 'sont', 'son',   'Chaque matin, il salue ___ voisin.',        'son'],
    ['son_sont', 1, 'son',  'sont',  'Les enfants ___ contents de partir.',       'sont'],
    ['son_sont', 2, 'sont', 'son',   'Le maître corrige ___ travail.',            'son'],
    ['son_sont', 2, 'son',  'sont',  'Mes cousins ___ à Rodrigues.',              'sont'],
    ['son_sont', 1, 'sont', 'son',   'Anya montre ___ dessin à la classe.',       'son'],
    ['son_sont', 1, 'son',  'sont',  'Les livres ___ sur l\'étagère.',            'sont'],
    ['son_sont', 1, 'sont', 'son',   'Le bébé dort dans ___ lit.',                'son'],
    ['son_sont', 1, 'son',  'sont',  'Les poissons ___ dans le lagon.',           'sont'],
    ['son_sont', 1, 'sont', 'son',   'Il met ___ chapeau pour sortir.',           'son'],

    // ── ce / se ──────────────────────────────────────────────────────
    ['ce_se', 1, 'se', 'ce', '___ matin, il a beaucoup plu.',                     'ce'],
    ['ce_se', 1, 'ce', 'se', 'Il ___ lave les mains avant de manger.',            'se'],
    ['ce_se', 1, 'se', 'ce', '___ livre raconte une belle histoire.',             'ce'],
    ['ce_se', 1, 'ce', 'se', 'Elle ___ prépare pour l\'école.',                   'se'],
    ['ce_se', 1, 'se', 'ce', '___ chien aboie toute la nuit.',                    'ce'],
    ['ce_se', 2, 'ce', 'se', 'Les enfants ___ cachent derrière l\'arbre.',        'se'],
    ['ce_se', 1, 'se', 'ce', '___ gâteau est vraiment délicieux.',                'ce'],
    ['ce_se', 1, 'ce', 'se', 'Mon frère ___ lève très tôt.',                      'se'],
    ['ce_se', 1, 'se', 'ce', '___ soir, nous allons chez grand-mère.',            'ce'],
    ['ce_se', 2, 'ce', 'se', 'Après la course, elle ___ repose un peu.',          'se'],
    ['ce_se', 1, 'se', 'ce', '___ garçon court très vite.',                       'ce'],
    ['ce_se', 2, 'ce', 'se', 'Ils ___ parlent souvent au téléphone.',             'se'],
    ['ce_se', 1, 'se', 'ce', '___ sac est trop lourd pour moi.',                  'ce'],
    ['ce_se', 1, 'ce', 'se', 'Le chat ___ couche au soleil.',                     'se'],
    ['ce_se', 1, 'se', 'ce', '___ film est très amusant.',                        'ce'],
    ['ce_se', 2, 'ce', 'se', 'Les deux amis ___ retrouvent à midi.',              'se'],
    ['ce_se', 1, 'se', 'ce', '___ stylo écrit très bien.',                        'ce'],
    ['ce_se', 2, 'ce', 'se', 'Elle ___ promène dans le jardin.',                  'se'],
    ['ce_se', 1, 'se', 'ce', '___ travail est facile à faire.',                   'ce'],
    ['ce_se', 2, 'ce', 'se', 'Le soleil ___ couche derrière la montagne.',        'se'],

    // ── accord du participe passé avec être ──────────────────────────
    ['accord_participe', 2, 'fermé',    'fermées',  'Les portes sont ___ à clé.',            'ppetre'],
    ['accord_participe', 2, 'ouvert',   'ouvertes', 'Les fenêtres sont ___ .',               'ppetre'],
    ['accord_participe', 2, 'parti',    'partis',   'Les garçons sont ___ à la plage.',      'ppetre'],
    ['accord_participe', 2, 'arrivé',   'arrivées', 'Les filles sont ___ les premières.',    'ppetre'],
    ['accord_participe', 2, 'cassé',    'cassés',   'Les verres sont ___ .',                 'ppetre'],
    ['accord_participe', 2, 'rangé',    'rangées',  'Les affaires sont ___ dans l\'armoire.','ppetre'],
    ['accord_participe', 2, 'tombé',    'tombées',  'Les feuilles sont ___ sur le sol.',     'ppetre'],
    ['accord_participe', 2, 'fatigué',  'fatigués', 'Après la course, les élèves sont ___ .','ppetre'],
    ['accord_participe', 2, 'lavé',     'lavées',   'Mes mains sont ___ .',                  'ppetre'],
    ['accord_participe', 2, 'perdu',    'perdus',   'Mes stylos sont ___ .',                 'ppetre'],
    ['accord_participe', 2, 'mouillé',  'mouillées','Mes chaussures sont ___ .',             'ppetre'],
    ['accord_participe', 2, 'rentré',   'rentrés',  'Les enfants sont ___ avant la pluie.',  'ppetre'],
    ['accord_participe', 2, 'assis',    'assises',  'Les filles sont ___ au premier rang.',  'ppetre'],
    ['accord_participe', 2, 'couché',   'couchés',  'Les bébés sont ___ depuis huit heures.','ppetre'],
    ['accord_participe', 2, 'plié',     'pliées',   'Les serviettes sont ___ .',             'ppetre'],
    ['accord_participe', 2, 'rempli',   'remplies', 'Les bouteilles sont ___ d\'eau.',       'ppetre'],
    ['accord_participe', 2, 'terminé',  'terminés', 'Les devoirs sont ___ .',                'ppetre'],
    ['accord_participe', 2, 'vendu',    'vendues',  'Les mangues sont ___ au marché.',       'ppetre'],
    ['accord_participe', 2, 'cuit',     'cuites',   'Les frites sont ___ .',                 'ppetre'],
    ['accord_participe', 2, 'sorti',    'sorties',  'Les vaches sont ___ du champ.',         'ppetre'],

    // ── accord du nom et de l'adjectif ───────────────────────────────
    ['accord_nom_adjectif', 1, 'petit',   'petits',   'Les ___ garçons jouent au ballon.',   'adj'],
    ['accord_nom_adjectif', 1, 'grand',   'grandes',  'Les ___ filles chantent bien.',       'adj'],
    ['accord_nom_adjectif', 1, 'vert',    'vertes',   'Les feuilles ___ tombent en tas.',    'adj'],
    ['accord_nom_adjectif', 1, 'joli',    'jolies',   'Les ___ fleurs sentent très bon.',    'adj'],
    ['accord_nom_adjectif', 1, 'noir',    'noirs',    'Les chats ___ dorment sur le mur.',   'adj'],
    ['accord_nom_adjectif', 2, 'long',    'longues',  'Les ___ routes fatiguent les jambes.','adj'],
    ['accord_nom_adjectif', 1, 'bleu',    'bleus',    'Les cahiers ___ sont neufs.',         'adj'],
    ['accord_nom_adjectif', 2, 'chaud',   'chaudes',  'Les ___ journées reviennent.',        'adj'],
    ['accord_nom_adjectif', 1, 'lourd',   'lourds',   'Les sacs ___ pèsent sur le dos.',     'adj'],
    ['accord_nom_adjectif', 2, 'blanc',   'blanches', 'Les robes ___ brillent au soleil.',   'adj'],
    ['accord_nom_adjectif', 1, 'gentil',  'gentils',  'Les voisins ___ nous aident.',        'adj'],
    ['accord_nom_adjectif', 2, 'neuf',    'neuves',   'Les tables ___ arrivent lundi.',      'adj'],
    ['accord_nom_adjectif', 1, 'froid',   'froides',  'Les nuits ___ reviennent en juillet.','adj'],
    ['accord_nom_adjectif', 2, 'haut',    'hautes',   'Les ___ montagnes cachent le soleil.','adj'],
    ['accord_nom_adjectif', 1, 'content', 'contents', 'Les élèves ___ applaudissent.',       'adj'],
    ['accord_nom_adjectif', 1, 'rouge',   'rouges',   'Les pommes ___ sont mûres.',          'adj'],
    ['accord_nom_adjectif', 2, 'doux',    'douces',   'Les ___ voix bercent le bébé.',       'adj'],
    ['accord_nom_adjectif', 1, 'fort',    'forts',    'Les vents ___ soufflent en février.', 'adj'],
    ['accord_nom_adjectif', 1, 'propre',  'propres',  'Les mains ___ sont importantes.',     'adj'],
    ['accord_nom_adjectif', 1, 'sucré',   'sucrées',  'Les mangues ___ plaisent aux enfants.','adj'],

    // ── tout / tous / leur / leurs ───────────────────────────────────
    ['tout_leur', 2, 'tout',  'tous',    '___ les élèves sont présents.',            'tous'],
    ['tout_leur', 2, 'tous',  'toutes',  '___ les filles chantent ensemble.',        'tous'],
    ['tout_leur', 2, 'leur',  'leurs',   'Les enfants rangent ___ cahiers.',         'leurs'],
    ['tout_leur', 2, 'leurs', 'leur',    'Les élèves lèvent ___ main droite.',       'leur'],
    ['tout_leur', 2, 'tout',  'toute',   '___ la classe écoute le maître.',          'tous'],
    ['tout_leur', 2, 'toute', 'tout',    '___ le monde est arrivé à l\'heure.',      'tous'],
    ['tout_leur', 2, 'tout',  'tous',    '___ les jours, il court sur la plage.',    'tous'],
    ['tout_leur', 2, 'leur',  'leurs',   'Ils mettent ___ chaussures neuves.',       'leurs'],
    ['tout_leur', 2, 'leurs', 'leur',    'Les enfants montrent ___ carnet.',         'leur'],
    ['tout_leur', 2, 'tous',  'tout',    'Il a mangé ___ le gâteau.',                'tous'],
    ['tout_leur', 2, 'toute', 'toutes',  '___ les portes sont fermées.',             'tous'],
    ['tout_leur', 2, 'leur',  'leurs',   'Les voisins ouvrent ___ fenêtres.',        'leurs'],
    ['tout_leur', 2, 'tout',  'tous',    '___ mes amis viennent ce soir.',           'tous'],
    ['tout_leur', 2, 'leurs', 'leur',    'Les garçons prennent ___ sac de sport.',   'leur'],
    ['tout_leur', 2, 'toute', 'tout',    'Il a plu ___ le temps hier.',              'tous'],
    ['tout_leur', 2, 'tous',  'toutes',  '___ les fleurs du jardin sont ouvertes.',  'tous'],
    ['tout_leur', 2, 'leur',  'leurs',   'Les élèves montrent ___ dessins.',         'leurs'],
    ['tout_leur', 2, 'tout',  'toute',   '___ la journée, le vent a soufflé.',       'tous'],
    ['tout_leur', 2, 'leurs', 'leur',    'Ils écoutent ___ maître avec attention.',  'leur'],
    ['tout_leur', 2, 'toutes','tous',    '___ les garçons sont rentrés.',            'tous'],
  ];

  let n = 0;
  for (const [subsection, difficulty, wrong, answer, sentence, rule] of ROWS) {
    n += 1;
    STATIC_QUESTIONS.push(makeText({
      id: `g4fr-corr-${String(n).padStart(3, '0')}`,
      chapterId: CH, subsection, difficulty,
      question: `Corrige le mot souligné et écris-le correctement.<br>« ${sentence.replace('___', `<u>${wrong}</u>`)} »`,
      answer,
      confusables: [wrong],
      hint: HINTS[subsection],
      explanation: `On écrit « <b>${answer}</b> ». ${RULES[rule]}`,
    }));
  }
})();
