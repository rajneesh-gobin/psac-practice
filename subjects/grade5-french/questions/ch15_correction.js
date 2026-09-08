'use strict';
// Grade 5 French - Corriger les erreurs (PSAC Q7A).
// The middle rung. Grade 4 drills son/sont and ce/se in short sentences; this
// adds on/ont and ces/ses, the irregular plurals (-al → -aux, -eau → -eaux),
// pronominal verbs in the past, and longer sentences where the subject is
// further from the verb. Grade 6 goes on to c'est/s'est, the participle with
// avoir, and the accent homophones.
// ⚠ `text` items: the child TYPES the correction. See ch13_g4_correction.js and
// scripts/test-french-text-answers.js for how accents are marked.
(function () {
  const CH = 'g5fr-formation';

  const RULES = {
    sont:   '<b>sont</b> est le verbe être : remplace-le par « <i>étaient</i> ». <b>son</b> se met devant un nom.',
    son:    '<b>son</b> se met devant un nom : son cartable. <b>sont</b> est le verbe être : « <i>étaient</i> ».',
    ont:    '<b>ont</b> est le verbe avoir : remplace-le par « <i>avaient</i> ». <b>on</b> est un pronom sujet.',
    on:     '<b>on</b> est un pronom sujet : remplace-le par « <i>il</i> ». <b>ont</b> est le verbe avoir : « <i>avaient</i> ».',
    ce:     '<b>ce</b> se met devant un <b>nom</b> : ce village. <b>se</b> se met devant un <b>verbe</b> : il se souvient.',
    se:     '<b>se</b> se met devant un <b>verbe</b> : elle se souvient. <b>ce</b> se met devant un nom.',
    ces:    '<b>ces</b> est le pluriel de « ce » : il <b>montre</b> (ces arbres-là). <b>ses</b> est le pluriel de « son » : il <b>possède</b>.',
    ses:    '<b>ses</b> est le pluriel de « son / sa » : ce sont les siens. <b>ces</b> montre : ceux-là.',
    ppetre: 'Avec <b>être</b>, le participe passé s\'accorde avec le <b>sujet</b> : elles sont descend<b>ues</b>.',
    pppron: 'Un verbe pronominal se conjugue avec <b>être</b> : le participe s\'accorde avec le sujet - elles se sont lev<b>ées</b>.',
    aux:    'Les noms en <b>-al</b> font leur pluriel en <b>-aux</b> : un cheval → des chevaux, un journal → des journaux.',
    eaux:   'Les noms en <b>-eau</b> et <b>-au</b> prennent un <b>-x</b> au pluriel : un bateau → des bateaux.',
    oux:    'Sept noms en <b>-ou</b> prennent un <b>-x</b> : bijou, caillou, chou, genou, hibou, joujou, pou.',
    adj:    'L\'adjectif s\'accorde en <b>genre</b> et en <b>nombre</b> avec le nom qu\'il qualifie.',
    adjf:   'Attention au <b>féminin irrégulier</b> : beau → belle, vieux → vieille, doux → douce, blanc → blanche.',
    tous:   '<b>tous</b> / <b>toutes</b> devant un nom pluriel ; <b>tout</b> / <b>toute</b> devant un nom singulier.',
    toutadv:'Devant un adjectif, <b>tout</b> veut dire « entièrement » et ne s\'accorde pas au masculin : il est tout content.',
    leurs:  'Devant un nom au <b>pluriel</b> : <b>leurs</b>. Un -s parce qu\'il y a plusieurs objets.',
    leur:   'Devant un nom au <b>singulier</b> : <b>leur</b>, sans -s, même s\'il y a plusieurs personnes.',
    leurpr: 'Devant un <b>verbe</b>, <b>leur</b> est un pronom et ne prend <b>jamais</b> de -s : je leur parle.',
  };

  const HINTS = {
    son_sont:           'Remplace par « <i>étaient</i> » (être) ou « <i>avaient</i> » (avoir). Si ça se dit, c\'est le verbe.',
    ce_se:              'Regarde le mot suivant. Un <b>nom</b> appelle ce / ces ; un <b>verbe</b> appelle se ; et « ses » veut dire « les siens ».',
    accord_participe:   'Trouve le sujet, même s\'il est loin du verbe. Le participe porte sa marque.',
    accord_nom_adjectif:'Pluriel irrégulier ou féminin irrégulier ? Écris le mot en entier avant de le relire.',
    tout_leur:          'Singulier ou pluriel ? Et devant un <b>verbe</b>, « leur » ne prend jamais de -s.',
  };

  // [subsection, difficulty, wrong, answer, sentence with ___, ruleKey]
  const ROWS = [
    // ── son / sont, on / ont ─────────────────────────────────────────
    ['son_sont', 2, 'son',  'sont', 'Les cahiers de ma sœur ___ sur l\'étagère.',        'sont'],
    ['son_sont', 2, 'sont', 'son',  'Le pêcheur répare ___ filet chaque dimanche.',      'son'],
    ['son_sont', 3, 'son',  'sont', 'Les enfants du village ___ partis très tôt.',       'sont'],
    ['son_sont', 2, 'sont', 'son',  'Ma tante a vendu ___ vieux vélo.',                  'son'],
    ['son_sont', 3, 'son',  'sont', 'Les rues de Port-Louis ___ pleines de monde.',      'sont'],
    ['son_sont', 2, 'sont', 'son',  'Le maître explique ___ exercice au tableau.',       'son'],
    ['son_sont', 3, 'son',  'sont', 'Les cannes à sucre ___ hautes cette année.',        'sont'],
    ['son_sont', 2, 'sont', 'son',  'Chaque élève apporte ___ propre matériel.',         'son'],
    ['son_sont', 3, 'son',  'sont', 'Les bateaux du port ___ rentrés avant la pluie.',   'sont'],
    ['son_sont', 2, 'sont', 'son',  'Elle a oublié ___ parapluie à l\'école.',           'son'],
    ['son_sont', 2, 'on',   'ont',  'Les voisins ___ un grand jardin derrière.',         'ont'],
    ['son_sont', 2, 'ont',  'on',   'Le dimanche, ___ va au marché de Flacq.',           'on'],
    ['son_sont', 3, 'on',   'ont',  'Mes cousins ___ gagné le match de football.',       'ont'],
    ['son_sont', 2, 'ont',  'on',   'Quand il pleut, ___ reste à la maison.',            'on'],
    ['son_sont', 3, 'on',   'ont',  'Les élèves de la classe ___ terminé leur projet.',  'ont'],
    ['son_sont', 2, 'ont',  'on',   'Ici, ___ parle créole et français.',                'on'],
    ['son_sont', 3, 'on',   'ont',  'Les pêcheurs ___ vu des dauphins ce matin.',        'ont'],
    ['son_sont', 2, 'ont',  'on',   'Le soir, ___ écoute la radio ensemble.',            'on'],
    ['son_sont', 3, 'on',   'ont',  'Les touristes ___ visité le Jardin de Pamplemousses.','ont'],
    ['son_sont', 2, 'ont',  'on',   'En classe, ___ lève la main pour parler.',          'on'],

    // ── ce / se, ces / ses ───────────────────────────────────────────
    ['ce_se', 2, 'se',  'ce',  '___ village se trouve au bord de la mer.',               'ce'],
    ['ce_se', 2, 'ce',  'se',  'Mon grand-père ___ souvient de son enfance.',            'se'],
    ['ce_se', 2, 'se',  'ce',  '___ chemin mène jusqu\'à la cascade.',                   'ce'],
    ['ce_se', 3, 'ce',  'se',  'Les élèves ___ demandent pourquoi il est absent.',       'se'],
    ['ce_se', 2, 'se',  'ce',  '___ problème est plus difficile qu\'il n\'y paraît.',    'ce'],
    ['ce_se', 3, 'ce',  'se',  'La porte ___ referme toute seule.',                      'se'],
    ['ce_se', 2, 'se',  'ce',  '___ matin-là, le vent soufflait très fort.',             'ce'],
    ['ce_se', 3, 'ce',  'se',  'Les deux frères ___ ressemblent beaucoup.',              'se'],
    ['ce_se', 3, 'ses', 'ces', 'Regarde ___ oiseaux qui volent au-dessus du lagon.',     'ces'],
    ['ce_se', 3, 'ces', 'ses', 'Ravi a perdu ___ clés dans le sable.',                   'ses'],
    ['ce_se', 3, 'ses', 'ces', 'Je n\'aime pas ___ chaussures-là.',                      'ces'],
    ['ce_se', 3, 'ces', 'ses', 'Ma sœur range ___ affaires dans son casier.',            'ses'],
    ['ce_se', 3, 'ses', 'ces', 'Goûte ___ gâteaux que maman a préparés.',                'ces'],
    ['ce_se', 3, 'ces', 'ses', 'Le maître corrige ___ copies chaque soir.',              'ses'],
    ['ce_se', 3, 'ses', 'ces', 'À qui sont ___ livres posés sur le banc ?',              'ces'],
    ['ce_se', 3, 'ces', 'ses', 'Elle a invité tous ___ amis à son anniversaire.',        'ses'],
    ['ce_se', 3, 'ses', 'ces', 'Pendant ___ vacances, il a beaucoup plu.',               'ces'],
    ['ce_se', 3, 'ces', 'ses', 'Le chien remue la queue quand il voit ___ maîtres.',     'ses'],
    ['ce_se', 3, 'ses', 'ces', 'Comment s\'appellent ___ deux garçons là-bas ?',         'ces'],
    ['ce_se', 3, 'ces', 'ses', 'Papa a réparé ___ outils lui-même.',                     'ses'],

    // ── accord du participe passé ────────────────────────────────────
    ['accord_participe', 3, 'descendu', 'descendues', 'Mes cousines sont ___ à la plage.',        'ppetre'],
    ['accord_participe', 3, 'monté',    'montés',     'Les enfants sont ___ dans le bus.',        'ppetre'],
    ['accord_participe', 3, 'levé',     'levées',     'Les filles se sont ___ de bonne heure.',   'pppron'],
    ['accord_participe', 3, 'assis',    'assises',    'Mes tantes se sont ___ sous le manguier.', 'pppron'],
    ['accord_participe', 3, 'venu',     'venues',     'Toutes mes amies sont ___ à la fête.',     'ppetre'],
    ['accord_participe', 3, 'resté',    'restés',     'Les garçons sont ___ à la maison.',        'ppetre'],
    ['accord_participe', 3, 'promené',  'promenées',  'Les deux sœurs se sont ___ au jardin.',    'pppron'],
    ['accord_participe', 3, 'rentré',   'rentrées',   'Les vaches sont ___ à l\'étable.',         'ppetre'],
    ['accord_participe', 3, 'endormi',  'endormis',   'Les bébés se sont ___ très vite.',         'pppron'],
    ['accord_participe', 3, 'né',       'nées',       'Ces plantes sont ___ après la pluie.',     'ppetre'],
    ['accord_participe', 3, 'tombé',    'tombés',     'Plusieurs fruits sont ___ pendant la nuit.','ppetre'],
    ['accord_participe', 3, 'perdu',    'perdues',    'Mes clés sont ___ depuis hier.',           'ppetre'],
    ['accord_participe', 3, 'lavé',     'lavées',     'Les filles se sont ___ les mains.',        'pppron'],
    ['accord_participe', 3, 'arrêté',   'arrêtées',   'Les voitures se sont ___ au feu rouge.',   'pppron'],
    ['accord_participe', 3, 'parti',    'parties',    'Mes sœurs sont ___ en excursion.',         'ppetre'],
    ['accord_participe', 3, 'installé', 'installés',  'Les invités se sont ___ dans le salon.',   'pppron'],
    ['accord_participe', 3, 'ouvert',   'ouvertes',   'Les boutiques sont ___ depuis huit heures.','ppetre'],
    ['accord_participe', 3, 'couché',   'couchées',   'Les petites filles se sont ___ tôt.',      'pppron'],
    ['accord_participe', 3, 'arrivé',   'arrivés',    'Les colis sont ___ ce matin.',             'ppetre'],
    ['accord_participe', 3, 'préparé',  'préparées',  'Elles se sont ___ pour la cérémonie.',     'pppron'],

    // ── pluriels et féminins irréguliers ─────────────────────────────
    ['accord_nom_adjectif', 2, 'chevals',  'chevaux',   'Trois ___ galopent dans le champ.',      'aux'],
    ['accord_nom_adjectif', 2, 'journals', 'journaux',  'Papa lit deux ___ le dimanche.',         'aux'],
    ['accord_nom_adjectif', 2, 'animals',  'animaux',   'Les ___ de la ferme dorment déjà.',      'aux'],
    ['accord_nom_adjectif', 3, 'hôpitals', 'hôpitaux',  'Les ___ de l\'île sont modernes.',       'aux'],
    ['accord_nom_adjectif', 3, 'canals',   'canaux',    'Les ___ amènent l\'eau aux champs.',     'aux'],
    ['accord_nom_adjectif', 2, 'bateaus',  'bateaux',   'Les ___ rentrent avant la nuit.',        'eaux'],
    ['accord_nom_adjectif', 2, 'châteaus', 'châteaux',  'Ces vieux ___ attirent les touristes.',  'eaux'],
    ['accord_nom_adjectif', 2, 'gâteaus',  'gâteaux',   'Maman a préparé des ___ au coco.',       'eaux'],
    ['accord_nom_adjectif', 3, 'bijous',   'bijoux',    'Elle garde ses ___ dans une boîte.',     'oux'],
    ['accord_nom_adjectif', 3, 'genous',   'genoux',    'Il est tombé sur les ___ .',             'oux'],
    ['accord_nom_adjectif', 3, 'caillous', 'cailloux',  'Le chemin est plein de ___ .',           'oux'],
    ['accord_nom_adjectif', 3, 'hibous',   'hiboux',    'Deux ___ chassent la nuit.',             'oux'],
    ['accord_nom_adjectif', 2, 'beau',     'belle',     'Cette ___ maison date de 1900.',         'adjf'],
    ['accord_nom_adjectif', 3, 'vieux',    'vieille',   'Ma ___ tante habite à Curepipe.',        'adjf'],
    ['accord_nom_adjectif', 3, 'doux',     'douce',     'La brise est ___ ce matin.',             'adjf'],
    ['accord_nom_adjectif', 2, 'blanc',    'blanche',   'Elle porte une robe ___ .',              'adjf'],
    ['accord_nom_adjectif', 3, 'nouveau',  'nouvelle',  'La ___ maîtresse arrive lundi.',         'adjf'],
    ['accord_nom_adjectif', 2, 'sportif',  'sportive',  'Ma cousine est très ___ .',              'adjf'],
    ['accord_nom_adjectif', 3, 'heureux',  'heureuses', 'Les deux sœurs sont ___ de partir.',     'adjf'],
    ['accord_nom_adjectif', 3, 'sérieux',  'sérieuses', 'Ces élèves sont ___ et travailleuses.',  'adjf'],

    // ── tout / tous, leur / leurs ────────────────────────────────────
    ['tout_leur', 3, 'tout',  'tous',   '___ les habitants du village se connaissent.',  'tous'],
    ['tout_leur', 3, 'tous',  'toutes', '___ les fenêtres donnent sur la mer.',          'tous'],
    ['tout_leur', 3, 'toute', 'tout',   'Il a répété ___ ce qu\'il avait entendu.',      'tous'],
    ['tout_leur', 3, 'tous',  'tout',   'Le cyclone a duré ___ un week-end.',            'tous'],
    ['tout_leur', 3, 'tout',  'toute',  '___ la famille s\'est réunie dimanche.',        'tous'],
    ['tout_leur', 3, 'tous',  'tout',   'Après la course, il était ___ essoufflé.',      'toutadv'],
    ['tout_leur', 3, 'tout',  'tous',   'Il connaît ___ les chemins de la forêt.',       'tous'],
    ['tout_leur', 3, 'toutes','tous',   '___ les élèves ont rendu leur devoir.',         'tous'],
    ['tout_leur', 3, 'leur',  'leurs',  'Les pêcheurs réparent ___ filets sur la plage.','leurs'],
    ['tout_leur', 3, 'leurs', 'leur',   'Les enfants ont montré ___ bulletin aux parents.','leur'],
    ['tout_leur', 3, 'leur',  'leurs',  'Mes voisins ont repeint ___ volets en bleu.',   'leurs'],
    ['tout_leur', 3, 'leurs', 'leur',   'Les joueurs écoutent ___ entraîneur.',          'leur'],
    ['tout_leur', 3, 'leurs', 'leur',   'Je ___ ai expliqué la règle deux fois.',        'leurpr'],
    ['tout_leur', 3, 'leurs', 'leur',   'Le maître ___ a rendu les copies.',             'leurpr'],
    ['tout_leur', 3, 'leur',  'leurs',  'Les élèves ont rangé ___ affaires de sport.',   'leurs'],
    ['tout_leur', 3, 'leurs', 'leur',   'Nous ___ avons envoyé une invitation.',         'leurpr'],
    ['tout_leur', 3, 'tout',  'tous',   '___ ces livres appartiennent à la classe.',     'tous'],
    ['tout_leur', 3, 'toute', 'toutes', '___ ces histoires sont vraies.',                'tous'],
    ['tout_leur', 3, 'leur',  'leurs',  'Les enfants ont perdu ___ deux ballons.',       'leurs'],
    ['tout_leur', 3, 'tous',  'toute',  'Elle a lu ___ la lettre à voix haute.',         'tous'],
  ];

  let n = 0;
  for (const [subsection, difficulty, wrong, answer, sentence, rule] of ROWS) {
    n += 1;
    STATIC_QUESTIONS.push(makeText({
      id: `g5fr-corr-${String(n).padStart(3, '0')}`,
      chapterId: CH, subsection, difficulty,
      question: `Corrige le mot souligné et écris-le correctement.<br>« ${sentence.replace('___', `<u>${wrong}</u>`)} »`,
      answer,
      confusables: [wrong],
      hint: HINTS[subsection],
      explanation: `On écrit « <b>${answer}</b> ». ${RULES[rule]}`,
    }));
  }
})();
