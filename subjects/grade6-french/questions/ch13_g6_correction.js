'use strict';
// Grade 6 French - Corriger les erreurs (PSAC Q7A).
// The top rung. Everything grades 4 and 5 drill, plus the four things that
// actually separate a 5/5 from a 2/5 at this level:
//   • the participle with AVOIR - it agrees only with a direct object placed
//     BEFORE it, and stays invariable otherwise (the commonest over-correction);
//   • c'est / s'est and sais / sait;
//   • invariable words that look as if they should agree - colours borrowed from
//     nouns, « demi » before the noun, compound nouns built on a verb;
//   • « tout » used as an adverb, which agrees ONLY before a feminine adjective
//     beginning with a consonant.
//
// ⚠ Four items are accent homophones - a/à and ou/où. Those carry
// strictAccents: true, because makeText marks accents leniently by default and
// « a » would otherwise be accepted for « à », marking the item correct whatever
// the child types. The factory THROWS if such an item is written without the
// flag; scripts/test-french-text-answers.js asserts both directions.
(function () {
  const CH = 'g6fr-formation';

  const RULES = {
    sont:   '<b>sont</b> est le verbe être : remplace-le par « <i>étaient</i> ». <b>son</b> se met devant un nom.',
    son:    '<b>son</b> se met devant un nom. <b>sont</b> est le verbe être : « <i>étaient</i> ».',
    ont:    '<b>ont</b> est le verbe avoir : « <i>avaient</i> ». <b>on</b> est un pronom sujet : « <i>il</i> ».',
    on:     '<b>on</b> est un pronom sujet : « <i>il</i> ». <b>ont</b> est le verbe avoir : « <i>avaient</i> ».',
    averb:  '<b>a</b> sans accent est le verbe avoir : remplace-le par « <i>avait</i> ».',
    aprep:  '<b>à</b> avec accent est une préposition : elle indique le lieu, le temps ou le but. On ne peut pas dire « <i>avait</i> ».',
    ouou:   '<b>ou</b> sans accent propose un choix : remplace-le par « <i>ou bien</i> ». <b>où</b> avec accent indique le lieu ou le moment.',
    oulieu: '<b>où</b> avec accent indique le <b>lieu</b> ou le <b>moment</b>. On ne peut pas le remplacer par « ou bien ».',
    cest:   '<b>c\'est</b> = « cela est » : c\'est difficile. <b>s\'est</b> accompagne un verbe pronominal : il s\'est levé.',
    sest:   '<b>s\'est</b> = pronom « se » + être, devant un <b>participe passé</b> : elle s\'est assise.',
    sait:   '<b>sait</b> est le verbe savoir à la 3e personne : il sait. <b>c\'est</b> = cela est ; <b>s\'est</b> accompagne un participe.',
    ce:     '<b>ce</b> se met devant un <b>nom</b>. <b>se</b> se met devant un <b>verbe</b>.',
    se:     '<b>se</b> se met devant un <b>verbe</b> pronominal. <b>ce</b> se met devant un nom.',
    ces:    '<b>ces</b> <b>montre</b> (ceux-là) ; <b>ses</b> dit à qui c\'est (les siens).',
    ses:    '<b>ses</b> dit à qui c\'est : les siens. <b>ces</b> montre : ceux-là.',
    ppavant:'Avec <b>avoir</b>, le participe s\'accorde avec le complément d\'objet direct <b>placé avant lui</b> : les lettres <b>qu\'</b>il a écrit<b>es</b>.',
    ppinv:  'Avec <b>avoir</b>, le participe reste <b>invariable</b> quand le complément d\'objet direct est placé <b>après</b> : elles ont mangé des mangues.',
    ppetre: 'Avec <b>être</b>, le participe s\'accorde avec le <b>sujet</b>.',
    ppindir:'Un verbe pronominal dont le pronom est un complément <b>indirect</b> ne s\'accorde pas : elles se sont parlé (parler <b>à</b> quelqu\'un).',
    coul:   'Un adjectif de couleur emprunté à un <b>nom</b> (marron, orange, noisette, crème) reste <b>invariable</b>.',
    demi:   'Placé <b>avant</b> le nom, <b>demi</b> est invariable et se lie par un trait d\'union : une demi-heure.',
    compo:  'Dans un nom composé, un <b>verbe</b> ne prend jamais la marque du pluriel : des porte-monnaie, des ouvre-boîtes.',
    ailaux: 'Certains noms en <b>-ail</b> font leur pluriel en <b>-aux</b> : travail → travaux, vitrail → vitraux, corail → coraux.',
    adjf:   'Attention au <b>féminin irrégulier</b> de l\'adjectif.',
    tousadv:'Devant un adjectif, <b>tout</b> veut dire « entièrement ». Il ne s\'accorde <b>que</b> devant un féminin commençant par une consonne : toute contente, mais tout étonnée.',
    tous:   '<b>tous</b> / <b>toutes</b> devant un nom pluriel ; <b>tout</b> / <b>toute</b> devant un nom singulier.',
    leurpr: 'Devant un <b>verbe</b>, <b>leur</b> est un pronom et ne prend <b>jamais</b> de -s.',
    leurs:  'Devant un nom au <b>pluriel</b> : <b>leurs</b>.',
    leur:   'Devant un nom au <b>singulier</b> : <b>leur</b>, sans -s.',
    lexpl:  'Certains noms ne s\'emploient qu\'au <b>pluriel</b> : les environs, les alentours, les frais, les vacances.',
    toutpr: 'Ici <b>tout</b> est un pronom neutre : il veut dire « <i>toute la scène</i> », pas « toutes les personnes ». Il reste au singulier.',
  };

  const HINTS = {
    son_sont:           'Essaie « <i>étaient</i> », « <i>avaient</i> », « <i>avait</i> » ou « <i>ou bien</i> ». Si le remplacement se dit, tu tiens le mot.',
    ce_se:              '« c\'est » se remplace par « <i>cela est</i> » ; « s\'est » est toujours suivi d\'un participe passé.',
    accord_participe:   'Avec <b>avoir</b>, cherche le complément d\'objet direct : est-il <b>avant</b> le verbe ? Sinon, le participe ne bouge pas.',
    accord_nom_adjectif:'Méfie-toi des mots qui ont l\'air de s\'accorder et ne s\'accordent pas.',
    tout_leur:          '« tout » devant un adjectif ne s\'accorde qu\'au féminin commençant par une consonne. « leur » devant un verbe ne prend jamais de -s.',
  };

  // [subsection, difficulty, wrong, answer, sentence with ___, ruleKey, strictAccents]
  const ROWS = [
    // ── les petits mots : être, avoir, préposition, choix ────────────
    ['son_sont', 3, 'son',  'sont', 'Les résultats du concours ___ enfin affichés.',            'sont'],
    ['son_sont', 3, 'sont', 'son',  'Malgré la pluie, le facteur a terminé ___ tour.',          'son'],
    ['son_sont', 4, 'son',  'sont', 'Les documents que tu cherches ___ dans le tiroir.',        'sont'],
    ['son_sont', 3, 'sont', 'son',  'Chacun doit apporter ___ propre dictionnaire.',            'son'],
    ['son_sont', 4, 'son',  'sont', 'Les raisons de son absence ___ restées mystérieuses.',     'sont'],
    ['son_sont', 3, 'on',   'ont',  'Les habitants du quartier ___ signé une pétition.',        'ont'],
    ['son_sont', 3, 'ont',  'on',   'Lorsqu\'___ travaille en groupe, tout va plus vite.',      'on'],
    ['son_sont', 4, 'on',   'ont',  'Les décisions qu\'ils ___ prises étaient justes.',         'ont'],
    ['son_sont', 4, 'ont',  'on',   'Ce jour-là, ___ n\'avait rien prévu.',                     'on'],
    ['son_sont', 4, 'on',   'ont',  'Les chercheurs ___ découvert une espèce endémique.',       'ont'],
    ['son_sont', 3, 'ont',  'on',   'Au bord du lagon, ___ entend les vagues.',                 'on'],
    ['son_sont', 4, 'on',   'ont',  'Mes grands-parents ___ toujours vécu à Mahébourg.',        'ont'],
    ['son_sont', 4, 'ont',  'on',   'Quand ___ est pressé, tout devient compliqué.',            'on'],
    ['son_sont', 4, 'a',    'à',    'Le train part ___ sept heures précises.',                  'aprep', true],
    ['son_sont', 4, 'à',    'a',    'Personne n\'___ compris la consigne.',                     'averb', true],
    ['son_sont', 4, 'a',    'à',    'Elle songe ___ partir pour Rodrigues.',                    'aprep', true],
    ['son_sont', 4, 'à',    'a',    'Le vent ___ arraché plusieurs toitures.',                  'averb', true],
    ['son_sont', 4, 'ou',   'où',   'Le village ___ il est né a beaucoup changé.',              'oulieu', true],
    ['son_sont', 4, 'où',   'ou',   'Préfères-tu partir samedi ___ dimanche ?',                 'ouou',  true],
    ['son_sont', 4, 'ou',   'où',   'Je me demande ___ elle a rangé les clés.',                 'oulieu', true],

    // ── c'est / s'est, ce / se, ces / ses, sait ──────────────────────
    ['ce_se', 4, 's\'est', 'c\'est', 'Après tant d\'efforts, ___ enfin réussi.',                'cest'],
    ['ce_se', 4, 'c\'est', 's\'est', 'Le ciel ___ couvert en quelques minutes.',                'sest'],
    ['ce_se', 4, 's\'est', 'c\'est', 'À mon avis, ___ la meilleure solution.',                  'cest'],
    ['ce_se', 4, 'c\'est', 's\'est', 'Elle ___ souvenue de son rendez-vous trop tard.',         'sest'],
    ['ce_se', 4, 's\'est', 'c\'est', 'Ce qui m\'étonne, ___ son calme.',                        'cest'],
    ['ce_se', 4, 'c\'est', 's\'est', 'Le chien ___ échappé par le portail.',                    'sest'],
    ['ce_se', 4, 'c\'est', 'sait',   'Personne ne ___ pourquoi il est parti.',                  'sait'],
    ['ce_se', 4, 's\'est', 'sait',   'Elle ___ déjà lire l\'heure.',                            'sait'],
    ['ce_se', 3, 'se',     'ce',     '___ que tu proposes me convient.',                        'ce'],
    ['ce_se', 4, 'ce',     'se',     'Les deux villages ___ ressemblent étrangement.',          'se'],
    ['ce_se', 3, 'se',     'ce',     'Prends ___ chemin, il est plus court.',                   'ce'],
    ['ce_se', 4, 'ce',     'se',     'La discussion ___ prolongea jusqu\'au soir.',             'se'],
    ['ce_se', 4, 'ses',    'ces',    'Comment expliques-tu ___ résultats inattendus ?',         'ces'],
    ['ce_se', 4, 'ces',    'ses',    'Le peintre expose ___ dernières toiles.',                 'ses'],
    ['ce_se', 4, 'ses',    'ces',    'Depuis ___ événements, tout a changé.',                   'ces'],
    ['ce_se', 4, 'ces',    'ses',    'Chaque candidat présente ___ arguments.',                 'ses'],
    ['ce_se', 4, 'ses',    'ces',    'À qui appartiennent ___ documents ?',                     'ces'],
    ['ce_se', 4, 'ces',    'ses',    'Le directeur a félicité ___ enseignants.',                'ses'],
    ['ce_se', 3, 'se',     'ce',     'Nous ferons ___ qu\'il faudra.',                          'ce'],
    ['ce_se', 4, 'ce',     'se',     'Les élèves ___ sont montrés très attentifs.',             'se'],

    // ── le participe passé avec avoir : le vrai piège ────────────────
    ['accord_participe', 4, 'écrit',    'écrites',  'Les lettres qu\'il a ___ sont restées sans réponse.', 'ppavant'],
    ['accord_participe', 4, 'pris',     'prises',   'Les photos que tu as ___ sont magnifiques.',          'ppavant'],
    ['accord_participe', 4, 'entendu',  'entendue', 'La chanson que j\'ai ___ me trotte dans la tête.',    'ppavant'],
    ['accord_participe', 4, 'cueilli',  'cueillies','Les fleurs qu\'elle a ___ ont déjà fané.',            'ppavant'],
    ['accord_participe', 4, 'lu',       'lus',      'Les romans que nous avons ___ étaient passionnants.', 'ppavant'],
    ['accord_participe', 4, 'perdu',    'perdues',  'Les clés que j\'ai ___ étaient dans ma poche.',       'ppavant'],
    ['accord_participe', 4, 'mangées',  'mangé',    'Les filles ont ___ toutes les mangues du panier.',    'ppinv'],
    ['accord_participe', 4, 'reçues',   'reçu',     'Elles ont ___ une bonne nouvelle ce matin.',          'ppinv'],
    ['accord_participe', 4, 'terminées', 'terminé', 'Les élèves ont ___ leurs révisions hier soir.',       'ppinv'],
    ['accord_participe', 4, 'plantés',  'planté',   'Mes parents ont ___ des arbres devant la maison.',    'ppinv'],
    ['accord_participe', 4, 'vus',      'vues',     'Ces montagnes, je les ai ___ depuis le bateau.',      'ppavant'],
    ['accord_participe', 4, 'invité',   'invitées', 'Mes cousines ? Je les ai ___ pour dimanche.',         'ppavant'],
    ['accord_participe', 4, 'parlées',  'parlé',    'Les deux sœurs se sont ___ pendant une heure.',       'ppindir'],
    ['accord_participe', 4, 'écrites',  'écrit',    'Elles se sont ___ tout l\'été.',                      'ppindir'],
    ['accord_participe', 4, 'succédés', 'succédé',  'Les orateurs se sont ___ à la tribune.',              'ppindir'],
    ['accord_participe', 3, 'revenu',   'revenues', 'Mes tantes sont ___ de Rodrigues hier.',              'ppetre'],
    ['accord_participe', 3, 'devenu',   'devenus',  'Ces enfants sont ___ de vrais musiciens.',            'ppetre'],
    ['accord_participe', 4, 'coupé',    'coupée',   'La branche que le vent a ___ bloque le chemin.',      'ppavant'],
    ['accord_participe', 4, 'offertes', 'offert',   'Il a ___ des fleurs à sa grand-mère.',                'ppinv'],
    ['accord_participe', 4, 'construit','construites','Les maisons qu\'ils ont ___ résistent aux cyclones.','ppavant'],

    // ── les mots qui n'ont pas l'air invariables ─────────────────────
    ['accord_nom_adjectif', 4, 'marrons',   'marron',   'Elle portait des chaussures ___ .',             'coul'],
    ['accord_nom_adjectif', 4, 'oranges',   'orange',   'Les murs ___ éclairent la pièce.',              'coul'],
    ['accord_nom_adjectif', 4, 'noisettes', 'noisette', 'Il a de grands yeux ___ .',                     'coul'],
    ['accord_nom_adjectif', 4, 'crèmes',    'crème',    'Deux rideaux ___ encadrent la fenêtre.',        'coul'],
    ['accord_nom_adjectif', 4, 'demie',     'demi',     'Le trajet dure une ___-heure environ.',         'demi'],
    ['accord_nom_adjectif', 4, 'demies',    'demi',     'Il a attendu trois ___-journées entières.',     'demi'],
    ['accord_nom_adjectif', 4, 'portes',    'porte',    'Elle collectionne les ___-monnaie anciens.',    'compo'],
    ['accord_nom_adjectif', 4, 'ouvres',    'ouvre',    'Range les ___-boîtes dans ce tiroir.',          'compo'],
    ['accord_nom_adjectif', 3, 'travails',  'travaux',  'Les ___ de la route dureront six mois.',        'ailaux'],
    ['accord_nom_adjectif', 4, 'vitrails',  'vitraux',  'Les ___ de l\'église datent du siècle dernier.','ailaux'],
    ['accord_nom_adjectif', 4, 'corails',   'coraux',   'Les ___ du lagon sont fragiles.',               'ailaux'],
    ['accord_nom_adjectif', 3, 'journals',  'journaux', 'Tous les ___ ont publié la nouvelle.',          'ailaux'],
    ['accord_nom_adjectif', 4, 'public',    'publique', 'La bibliothèque ___ ouvre à neuf heures.',      'adjf'],
    ['accord_nom_adjectif', 4, 'long',      'longue',   'La saison des pluies a été ___ cette année.',   'adjf'],
    ['accord_nom_adjectif', 4, 'frais',     'fraîche',  'L\'eau de la source est très ___ .',            'adjf'],
    ['accord_nom_adjectif', 4, 'favori',    'favorite', 'C\'est sa matière ___ .',                       'adjf'],
    ['accord_nom_adjectif', 4, 'roux',      'rousse',   'Une chatte ___ dort sur le muret.',             'adjf'],
    ['accord_nom_adjectif', 4, 'jaloux',    'jalouse',  'Elle n\'est jamais ___ de ses amies.',          'adjf'],
    ['accord_nom_adjectif', 4, 'complet',   'complète', 'La liste n\'est pas encore ___ .',              'adjf'],
    ['accord_nom_adjectif', 4, 'inquiet',   'inquiète', 'Sa mère semblait ___ ce matin.',                'adjf'],

    // ── tout adverbe, leur pronom ────────────────────────────────────
    ['tout_leur', 4, 'tout',   'toute',   'En apprenant la nouvelle, elle était ___ contente.',   'tousadv'],
    ['tout_leur', 4, 'toute',  'tout',    'Devant ce spectacle, elle restait ___ étonnée.',       'tousadv'],
    ['tout_leur', 4, 'tout',   'toutes',  'Les fillettes sont revenues ___ trempées.',            'tousadv'],
    ['tout_leur', 4, 'toutes', 'tout',    'Elles sont sorties ___ émues de la cérémonie.',        'tousadv'],
    ['tout_leur', 4, 'toute',  'tout',    'Il a recopié ___ ce que le maître avait dicté.',       'tous'],
    ['tout_leur', 4, 'tous',   'tout',    'Elle connaît ___ de cette histoire.',                  'tous'],
    ['tout_leur', 4, 'tout',   'tous',    'Ils sont venus ___ les trois.',                        'tous'],
    ['tout_leur', 4, 'tout',   'toute',   '___ la région a été privée d\'électricité.',           'tous'],
    ['tout_leur', 4, 'leurs',  'leur',    'Le directeur ___ a remis les prix.',                   'leurpr'],
    ['tout_leur', 4, 'leurs',  'leur',    'Je ___ ai demandé de patienter.',                      'leurpr'],
    ['tout_leur', 4, 'leurs',  'leur',    'On ___ avait pourtant tout expliqué.',                 'leurpr'],
    ['tout_leur', 4, 'leurs',  'leur',    'Ces livres ___ appartiennent depuis longtemps.',       'leurpr'],
    ['tout_leur', 4, 'leur',   'leurs',   'Les candidats ont défendu ___ arguments avec calme.',  'leurs'],
    ['tout_leur', 4, 'leur',   'leurs',   'Les villageois ont reconstruit ___ maisons.',          'leurs'],
    ['tout_leur', 4, 'leurs',  'leur',    'Chacun des élèves a rendu ___ devoir à l\'heure.',     'leur'],
    ['tout_leur', 4, 'leurs',  'leur',    'Les deux équipes ont perdu ___ capitaine.',            'leur'],
    ['tout_leur', 4, 'tous',   'toutes',  '___ les précautions avaient été prises.',              'tous'],
    ['tout_leur', 4, 'toute',  'toutes',  'Elle a relu ___ ses réponses avant de rendre.',        'tous'],
    ['tout_leur', 4, 'tout',   'tous',    'Ils ont examiné ___ les documents disponibles.',       'tous'],
    ['tout_leur', 4, 'leur',   'leurs',   'Les enfants ont perdu ___ deux parapluies.',           'leurs'],

    // ── Le vrai papier 2025, question 7A, mot pour mot ───────────────
    // Kept verbatim so the chapter contains the real thing and not only its
    // shape; scripts/test-french-correction.js asserts these five answers.
    ['accord_nom_adjectif', 4, 'environ', 'environs', 'Deux voleurs surveillent les ___ .',                          'lexpl'],
    ['accord_participe',    4, 'attaché', 'attachés', 'Plusieurs chevaux sont ___ pour la nuit à une barrière.',     'ppetre'],
    ['son_sont',            3, 'son',     'sont',     'Les chevaux ___ nerveux.',                                    'sont'],
    ['tout_leur',           4, 'tous',    'tout',     'Le gardien a ___ vu.',                                        'toutpr'],
    ['ce_se',               4, 'ce',      'se',       'Les voleurs parviennent à ___ sauver dans l\'obscurité.',     'se'],
  ];

  let n = 0;
  for (const [subsection, difficulty, wrong, answer, sentence, rule, strict] of ROWS) {
    n += 1;
    STATIC_QUESTIONS.push(makeText({
      id: `g6fr-corr-${String(n).padStart(3, '0')}`,
      chapterId: CH, subsection, difficulty,
      question: `Corrige le mot souligné et écris-le correctement.<br>« ${sentence.replace('___', `<u>${wrong}</u>`)} »`,
      answer,
      confusables: [wrong],
      strictAccents: !!strict,
      hint: HINTS[subsection],
      explanation: `On écrit « <b>${answer}</b> ». ${RULES[rule]}`,
    }));
  }
})();
