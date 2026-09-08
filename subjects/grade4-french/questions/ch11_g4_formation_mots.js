'use strict';
// Grade 4 French - Formation des Mots (dérivation lexicale).
// PSAC Q7 ("Écris la forme correcte du mot entre parenthèses", 10 marks) is set
// every year; the bank held three one-off items for it and nothing at Grade 4.
// Data table + loop, like extended_practice_bank.js: the linguistics live in the
// table, so a wrong suffix is a one-line fix and not a hunt through 100 blocks.
(function () {
  const CH = 'g4fr-formation';

  const RULES = {
    nom0: 'Certains verbes donnent un nom <b>sans suffixe</b> : danser → la danse, chanter → le chant, entrer → l\'entrée.',
    age:  'Verbe → nom en <b>-age</b> : laver → le lavage, jardiner → le jardinage, arroser → l\'arrosage.',
    ure:  'Verbe → nom en <b>-ure</b> : ouvrir → l\'ouverture, fermer → la fermeture, blesser → la blessure.',
    eur:  'Verbe → nom de <b>métier</b> en <b>-eur</b> (féminin <b>-euse</b>) : chanter → un chanteur / une chanteuse.',
    eux:  'Nom → adjectif en <b>-eux</b> (féminin <b>-euse</b>) : danger → dangereux, courage → courageux, joie → joyeux.',
    part: 'Nom → adjectif en <b>-é / -i</b>, comme un participe : sucre → sucré, sel → salé, fleur → fleuri.',
    ier:  'Nom → adjectif en <b>-ier</b> (féminin <b>-ière</b>) : lait → laitier, une vache laitière, des produits laitiers.',
    al:   'Nom → adjectif en <b>-al</b> : matin → matinal, nation → national. Féminin <b>-ale</b>, masculin pluriel <b>-aux</b>.',
    aire: 'Nom → adjectif en <b>-aire</b> : école → scolaire, banque → bancaire.',
    adv:  'Adverbe = adjectif au <b>féminin</b> + <b>-ment</b> : lent → lente → lentement, doux → douce → doucement.',
    advi: 'Deux adverbes ne suivent aucune règle : <b>bon → bien</b> et <b>mauvais → mal</b>. Il faut les apprendre par cœur.',
    ver:  'Nom → verbe du <b>1er groupe</b> en <b>-er</b> : jardin → jardiner, sel → saler, danse → danser.',
    vir:  'Adjectif de couleur ou de taille → verbe du <b>2e groupe</b> en <b>-ir</b> : rouge → rougir, grand → grandir.',
    pin:  'Le préfixe <b>in-</b> dit le contraire. Il devient <b>im-</b> devant m, b, p : possible → impossible, poli → impoli.',
    pmal: 'Les préfixes <b>mal-</b> et <b>mé-</b> disent aussi le contraire : heureux → malheureux, content → mécontent.',
    pdes: 'Le préfixe <b>dé- / dés-</b> dit l\'action inverse : ordre → désordre, obéir → désobéir, brancher → débrancher.',
    pre:  'Le préfixe <b>re-</b> ne dit pas le contraire : il dit <b>une deuxième fois</b>. faire → refaire, lire → relire.',
  };

  const HINTS = {
    verbe_nom:        'Il faut un <b>nom</b> : regarde le petit mot devant le trou (le, la, l\', un, une).',
    nom_adjectif:     'Il faut un <b>adjectif</b>, et il doit s\'accorder avec le nom qu\'il décrit.',
    adjectif_adverbe: 'Mets d\'abord l\'adjectif au <b>féminin</b>, puis ajoute <b>-ment</b>.',
    former_verbe:     'Il faut un <b>verbe</b>. Après « va », « veut », « il faut », « aime », on écrit l\'<b>infinitif</b>.',
    prefixes:         'Le mot existe déjà : ajoute devant lui un petit morceau qui dit le <b>contraire</b>.',
  };

  const ROWS = [
    // ── Du verbe au nom ──────────────────────────────────────────────
    ['verbe_nom', 1, 'danser', 'danse', 'Marie aime beaucoup la ___ .', ['danseuse', 'dansement', 'dansage'], 'nom0'],
    ['verbe_nom', 1, 'chanter', 'chant', 'J\'écoute le ___ des oiseaux.', ['chantage', 'chantement', 'chanteur'], 'nom0'],
    ['verbe_nom', 1, 'dessiner', 'dessin', 'Ton ___ est vraiment joli.', ['dessinage', 'dessinement', 'dessinateur'], 'nom0'],
    ['verbe_nom', 1, 'travailler', 'travail', 'Le ___ de Rahul est bien fait.', ['travaillement', 'travaillage', 'travailleur'], 'nom0'],
    ['verbe_nom', 2, 'jouer', 'jeu', 'Le ___ commence à trois heures.', ['jouement', 'jouage', 'joueur'], 'nom0', 'Attention : le nom de « jouer » est <b>le jeu</b>, pas « jouage ».'],
    ['verbe_nom', 1, 'sortir', 'sortie', 'La ___ scolaire est prévue demain.', ['sortage', 'sortement', 'sorteur'], 'nom0'],
    ['verbe_nom', 1, 'entrer', 'entrée', 'L\'___ de l\'école est fermée.', ['entrage', 'entrement', 'entreur'], 'nom0'],
    ['verbe_nom', 1, 'arriver', 'arrivée', 'L\'___ du bus est à huit heures.', ['arrivage', 'arrivement', 'arriveur'], 'nom0'],
    ['verbe_nom', 2, 'promener', 'promenade', 'Nous faisons une ___ au jardin.', ['promenage', 'promenement', 'promeneur'], 'nom0'],
    ['verbe_nom', 1, 'laver', 'lavage', 'Le ___ des mains est très important.', ['lavation', 'lavure', 'laveur'], 'age'],
    ['verbe_nom', 1, 'jardiner', 'jardinage', 'Papa aime le ___ le dimanche.', ['jardinement', 'jardinure', 'jardinier'], 'age'],
    ['verbe_nom', 2, 'nettoyer', 'nettoyage', 'Le ___ de la classe prend dix minutes.', ['nettoyement', 'nettoyure', 'nettoyeur'], 'age'],
    ['verbe_nom', 2, 'arroser', 'arrosage', 'L\'___ des plantes se fait le soir.', ['arrosement', 'arrosure', 'arroseur'], 'age'],
    ['verbe_nom', 2, 'balayer', 'balayage', 'Le ___ de la cour est enfin fini.', ['balayement', 'balayure', 'balayeur'], 'age'],
    ['verbe_nom', 2, 'ouvrir', 'ouverture', 'L\'___ du magasin est à neuf heures.', ['ouvrage', 'ouvrement', 'ouvreur'], 'ure'],
    ['verbe_nom', 2, 'fermer', 'fermeture', 'La ___ de la boutique est à cinq heures.', ['fermage', 'fermement', 'fermier'], 'ure', 'Piège : <b>fermement</b> existe, mais c\'est un adverbe (« il répond fermement »).'],
    ['verbe_nom', 1, 'chanter', 'chanteur', 'Ce ___ a une très belle voix.', ['chantier', 'chantant', 'chanteuse'], 'eur'],
    ['verbe_nom', 2, 'danser', 'danseuse', 'Cette ___ est très gracieuse.', ['danseur', 'dansante', 'danseresse'], 'eur', '« Cette » annonce un mot <b>féminin</b> : danseur → danseuse.'],
    ['verbe_nom', 1, 'vendre', 'vendeur', 'Le ___ du marché est très gentil.', ['vendage', 'vendant', 'vendeuse'], 'eur'],
    ['verbe_nom', 1, 'nager', 'nageur', 'Ce ___ traverse toute la piscine.', ['nagiste', 'nageant', 'nageuse'], 'eur'],

    // ── Du nom à l'adjectif ──────────────────────────────────────────
    ['nom_adjectif', 1, 'danger', 'dangereux', 'Ce chemin est très ___ .', ['dangereuse', 'dangerable', 'dangerel'], 'eux'],
    ['nom_adjectif', 1, 'courage', 'courageux', 'Ce garçon est vraiment ___ .', ['courageuse', 'couragé', 'couragel'], 'eux'],
    ['nom_adjectif', 1, 'orage', 'orageux', 'Le ciel est ___ ce matin.', ['orageuse', 'oragé', 'oragique'], 'eux'],
    ['nom_adjectif', 1, 'nuage', 'nuageux', 'Le temps est ___ aujourd\'hui.', ['nuageuse', 'nuagé', 'nuagique'], 'eux'],
    ['nom_adjectif', 1, 'paresse', 'paresseux', 'Ce gros chat est bien ___ .', ['paresseuse', 'paressé', 'paressant'], 'eux'],
    ['nom_adjectif', 1, 'peur', 'peureux', 'Mon petit frère est ___ la nuit.', ['peureuse', 'peuré', 'peurant'], 'eux'],
    ['nom_adjectif', 1, 'chance', 'chanceux', 'Tu as gagné : tu es ___ !', ['chanceuse', 'chancé', 'chançant'], 'eux'],
    ['nom_adjectif', 2, 'boue', 'boueux', 'Le sentier est ___ après la pluie.', ['boueuse', 'boué', 'bouant'], 'eux'],
    ['nom_adjectif', 2, 'pluie', 'pluvieux', 'Le mois de février a été très ___ .', ['pluvieuse', 'pluieux', 'plueux'], 'eux', 'Le radical change : pluie → <b>pluvi-</b> → pluvieux.'],
    ['nom_adjectif', 2, 'silence', 'silencieux', 'Le couloir est ___ pendant la leçon.', ['silencieuse', 'silencial', 'silenceux'], 'eux'],
    ['nom_adjectif', 2, 'joie', 'joyeux', 'Les enfants sont ___ ce matin.', ['joyeuse', 'joieux', 'joial'], 'eux', 'Le radical change : joie → <b>joy-</b> → joyeux.'],
    ['nom_adjectif', 2, 'montagne', 'montagneux', 'Ce pays est très ___ .', ['montagneuse', 'montagnal', 'montagnier'], 'eux'],
    ['nom_adjectif', 1, 'sucre', 'sucré', 'Ce gâteau est beaucoup trop ___ .', ['sucreux', 'sucrier', 'sucrant'], 'part'],
    ['nom_adjectif', 1, 'sel', 'salé', 'La soupe est vraiment trop ___ .', ['seleux', 'selé', 'salant'], 'part', 'sel → saler → <b>salé</b>. Le mot passe d\'abord par le verbe.'],
    ['nom_adjectif', 2, 'fleur', 'fleuri', 'Au mois d\'octobre, le jardin est très ___ .', ['fleureux', 'fleural', 'fleurant'], 'part'],
    ['nom_adjectif', 2, 'lait', 'laitier', 'Bébé boit chaque jour un produit ___ .', ['laitière', 'laiteux', 'laité'], 'ier'],
    ['nom_adjectif', 2, 'matin', 'matinal', 'Grand-père aime le calme ___ du village.', ['matinel', 'matinale', 'matineux'], 'al', '« le calme » est masculin : on écrit <b>matinal</b>. Avec un nom féminin on écrirait « une promenade <b>matinale</b> ».'],
    ['nom_adjectif', 2, 'nation', 'national', 'Le drapeau ___ flotte devant l\'école.', ['nationnel', 'nationale', 'nationeux'], 'al'],
    ['nom_adjectif', 3, 'amitié', 'amical', 'Il m\'a envoyé un message ___ .', ['amitieux', 'amitial', 'amicale'], 'al'],
    ['nom_adjectif', 2, 'école', 'scolaire', 'La rentrée ___ est en janvier.', ['écolaire', 'écolier', 'scolier'], 'aire', 'Le radical vient du latin : école → <b>scol-</b> → scolaire.'],

    // ── De l'adjectif à l'adverbe ────────────────────────────────────
    ['adjectif_adverbe', 1, 'lent', 'lentement', 'La tortue avance ___ .', ['lentment', 'lenteusement', 'lentemment'], 'adv'],
    ['adjectif_adverbe', 1, 'rapide', 'rapidement', 'Le lièvre court très ___ .', ['rapidment', 'rapidemment', 'rapiduement'], 'adv'],
    ['adjectif_adverbe', 1, 'doux', 'doucement', 'Parle ___ : bébé dort.', ['douxement', 'douzement', 'doucemment'], 'adv', 'doux → <b>douce</b> → doucement.'],
    ['adjectif_adverbe', 2, 'heureux', 'heureusement', '___ , il n\'a pas plu pendant la sortie.', ['heureuxement', 'heureusment', 'heureusemment'], 'adv', 'heureux → <b>heureuse</b> → heureusement.'],
    ['adjectif_adverbe', 2, 'joyeux', 'joyeusement', 'Les enfants chantent ___ .', ['joyeuxement', 'joyeusment', 'joyeusemment'], 'adv'],
    ['adjectif_adverbe', 1, 'calme', 'calmement', 'Il attend ___ son tour.', ['calmément', 'calmment', 'calmeusement'], 'adv'],
    ['adjectif_adverbe', 1, 'facile', 'facilement', 'Elle a trouvé la réponse ___ .', ['facilment', 'facillement', 'facilemment'], 'adv'],
    ['adjectif_adverbe', 2, 'poli', 'poliment', 'Elle répond toujours ___ .', ['polimment', 'poliement', 'polisement'], 'adv', 'Les adjectifs en <b>-i</b> perdent le e : poli → <b>poliment</b> (et non « polie-ment »).'],
    ['adjectif_adverbe', 1, 'simple', 'simplement', 'Explique-moi cela ___ .', ['simplment', 'simplemment', 'simpleusement'], 'adv'],
    ['adjectif_adverbe', 2, 'tranquille', 'tranquillement', 'Le chat dort ___ sur le mur.', ['tranquilement', 'tranquillment', 'tranquillemment'], 'adv'],
    ['adjectif_adverbe', 2, 'vrai', 'vraiment', 'Ce film est ___ drôle.', ['vraiement', 'vraimment', 'vraiuement'], 'adv', 'vrai → <b>vraiment</b> : le e disparaît.'],
    ['adjectif_adverbe', 1, 'seul', 'seulement', 'Il reste ___ deux mangues.', ['seulment', 'seulemment', 'seuleusement'], 'adv'],
    ['adjectif_adverbe', 2, 'sûr', 'sûrement', 'Il va ___ pleuvoir ce soir.', ['sûrment', 'sûremment', 'sûreusement'], 'adv'],
    ['adjectif_adverbe', 2, 'long', 'longuement', 'Le maître a parlé ___ de la sortie.', ['longement', 'longuemment', 'longtement'], 'adv', 'long → <b>longue</b> → longuement : le u du féminin reste.'],
    ['adjectif_adverbe', 3, 'franc', 'franchement', 'Dis-moi ___ ce que tu penses.', ['francement', 'franquement', 'franchemment'], 'adv', 'franc → <b>franche</b> → franchement.'],
    ['adjectif_adverbe', 1, 'dur', 'durement', 'Il travaille ___ toute la journée.', ['durment', 'duremment', 'dureusement'], 'adv'],
    ['adjectif_adverbe', 3, 'gentil', 'gentiment', 'Elle m\'a répondu très ___ .', ['gentillement', 'gentimment', 'gentielement'], 'adv', 'Exception : gentil donne <b>gentiment</b>, et non « gentillement ».'],
    ['adjectif_adverbe', 1, 'lourd', 'lourdement', 'La caisse est tombée ___ .', ['lourdment', 'lourdemment', 'lourdeusement'], 'adv'],
    ['adjectif_adverbe', 3, 'bon', 'bien', 'Cette élève chante très ___ .', ['bonement', 'bonnément', 'bonemment'], 'advi'],
    ['adjectif_adverbe', 3, 'mauvais', 'mal', 'Il a ___ dormi cette nuit.', ['mauvaisement', 'mauvaisment', 'malement'], 'advi'],

    // ── Former un verbe ──────────────────────────────────────────────
    ['former_verbe', 1, 'jardin', 'jardiner', 'Papa aime ___ le dimanche matin.', ['jardinier', 'jardiniser', 'jardonner'], 'ver', 'Piège : <b>jardinier</b> est un nom (la personne), pas un verbe.'],
    ['former_verbe', 1, 'danse', 'danser', 'Les enfants vont ___ à la fête.', ['dansier', 'danciser', 'dansiner'], 'ver'],
    ['former_verbe', 1, 'chant', 'chanter', 'Nous allons ___ pour la fête de l\'école.', ['chantier', 'chantiser', 'chantager'], 'ver'],
    ['former_verbe', 1, 'dessin', 'dessiner', 'Mon frère aime ___ des bateaux.', ['dessinier', 'dessiniser', 'dessinager'], 'ver'],
    ['former_verbe', 2, 'téléphone', 'téléphoner', 'Je dois ___ à ma tante ce soir.', ['téléphonier', 'téléphoniser', 'téléphonner'], 'ver'],
    ['former_verbe', 1, 'travail', 'travailler', 'Il faut ___ pour réussir.', ['travaillier', 'travaillonner', 'travailliser'], 'ver'],
    ['former_verbe', 2, 'sel', 'saler', 'N\'oublie pas de ___ la soupe.', ['seler', 'salier', 'saliner'], 'ver'],
    ['former_verbe', 2, 'sucre', 'sucrer', 'Je vais ___ mon thé.', ['sucrier', 'sucriser', 'sucrager'], 'ver', 'Piège : <b>sucrier</b> est un nom - le pot où l\'on met le sucre.'],
    ['former_verbe', 2, 'neige', 'neiger', 'En France, il peut ___ en hiver.', ['neigier', 'neigeler', 'neigeonner'], 'ver'],
    ['former_verbe', 2, 'arrosage', 'arroser', 'Il faut ___ les plantes chaque soir.', ['arrosager', 'arrosier', 'arrosiser'], 'ver'],
    ['former_verbe', 2, 'nettoyage', 'nettoyer', 'Je vais ___ ma chambre avant midi.', ['nettoyager', 'nettoyier', 'nettoyiser'], 'ver'],
    ['former_verbe', 2, 'rouge', 'rougir', 'Elle va ___ de honte.', ['rouger', 'rougier', 'rougeter'], 'vir'],
    ['former_verbe', 1, 'grand', 'grandir', 'Les plantes vont ___ très vite.', ['grander', 'grandier', 'grandeter'], 'vir'],
    ['former_verbe', 2, 'blanc', 'blanchir', 'Le soleil va ___ le tissu.', ['blancher', 'blanquir', 'blanchoyer'], 'vir'],
    ['former_verbe', 2, 'jaune', 'jaunir', 'Les feuilles vont ___ en automne.', ['jauner', 'jaunoyer', 'jaunier'], 'vir'],
    ['former_verbe', 2, 'sale', 'salir', 'Ne va pas ___ ta chemise blanche.', ['saler', 'salier', 'salissir'], 'vir', 'Piège : <b>saler</b> vient de « sel » ; <b>salir</b> vient de « sale ».'],
    ['former_verbe', 2, 'gros', 'grossir', 'Le chat va ___ s\'il mange trop.', ['grosser', 'grossier', 'grossoyer'], 'vir'],
    ['former_verbe', 2, 'maigre', 'maigrir', 'Le vieux chien commence à ___ .', ['maigrer', 'maigrier', 'maigroyer'], 'vir'],
    ['former_verbe', 3, 'vieux', 'vieillir', 'Personne n\'aime ___ .', ['vieuxir', 'vieuxer', 'vieillier'], 'vir', 'Le radical change : vieux → <b>vieill-</b> → vieillir.'],
    ['former_verbe', 2, 'fleur', 'fleurir', 'Les manguiers vont ___ en septembre.', ['fleurer', 'fleuriser', 'fleuroyer'], 'vir'],

    // ── Préfixes & contraires ────────────────────────────────────────
    ['prefixes', 1, 'poli', 'impoli', 'Ce garçon est ___ : il ne dit jamais bonjour.', ['inpoli', 'dépoli', 'apoli'], 'pin'],
    ['prefixes', 1, 'possible', 'impossible', 'Sans échelle, c\'est ___ .', ['inpossible', 'dépossible', 'apossible'], 'pin'],
    ['prefixes', 2, 'patient', 'impatient', 'Il est ___ : il ne sait pas attendre.', ['inpatient', 'dépatient', 'mépatient'], 'pin'],
    ['prefixes', 1, 'utile', 'inutile', 'Ce vieux stylo est ___ : il n\'écrit plus.', ['imutile', 'désutile', 'mésutile'], 'pin'],
    ['prefixes', 2, 'juste', 'injuste', 'Cette punition est ___ : il n\'a rien fait.', ['imjuste', 'déjuste', 'mésjuste'], 'pin'],
    ['prefixes', 2, 'connu', 'inconnu', 'Cet homme m\'est ___ : je ne l\'ai jamais vu.', ['imconnu', 'déconnu', 'mesconnu'], 'pin'],
    ['prefixes', 1, 'visible', 'invisible', 'Dans le noir, le chat est ___ .', ['imvisible', 'dévisible', 'mévisible'], 'pin'],
    ['prefixes', 2, 'complet', 'incomplet', 'Ton travail est ___ : il manque la fin.', ['imcomplet', 'décomplet', 'mécomplet'], 'pin'],
    ['prefixes', 3, 'actif', 'inactif', 'Ce volcan est ___ depuis très longtemps.', ['imactif', 'désactif', 'méactif'], 'pin'],
    ['prefixes', 2, 'content', 'mécontent', 'Le maître est ___ de ce travail.', ['incontent', 'décontent', 'acontent'], 'pmal'],
    ['prefixes', 2, 'heureux', 'malheureux', 'Depuis la perte de son chien, il est ___ .', ['inheureux', 'déheureux', 'méheureux'], 'pmal'],
    ['prefixes', 3, 'honnête', 'malhonnête', 'Ce marchand est ___ : il trompe ses clients.', ['inhonnête', 'imhonnête', 'méhonnête'], 'pmal'],
    ['prefixes', 3, 'adroit', 'maladroit', 'Il a tout renversé : il est vraiment ___ .', ['inadroit', 'désadroit', 'méadroit'], 'pmal'],
    ['prefixes', 2, 'chance', 'malchance', 'Quelle ___ : il pleut le jour de la sortie !', ['inchance', 'déchance', 'méchance'], 'pmal'],
    ['prefixes', 1, 'ordre', 'désordre', 'Sa chambre est toujours en ___ .', ['inordre', 'mésordre', 'anordre'], 'pdes'],
    ['prefixes', 2, 'obéir', 'désobéir', 'Il ne faut pas ___ à ses parents.', ['inobéir', 'mésobéir', 'anobéir'], 'pdes'],
    ['prefixes', 2, 'agréable', 'désagréable', 'Cette odeur de poubelle est ___ .', ['inagréable', 'mésagréable', 'anagréable'], 'pdes'],
    ['prefixes', 2, 'brancher', 'débrancher', 'N\'oublie pas de ___ le fer avant de sortir.', ['inbrancher', 'mébrancher', 'rebrancher'], 'pdes'],
    ['prefixes', 3, 'faire', 'défaire', 'Il doit ___ son sac pour retrouver son cahier.', ['infaire', 'méfaire', 'refaire'], 'pdes'],
    ['prefixes', 3, 'faire', 'refaire', 'Ton exercice est faux : tu dois le ___ une deuxième fois.', ['défaire', 'méfaire', 'infaire'], 'pre'],
  ];

  let n = 0;
  for (const [subsection, difficulty, base, answer, sentence, wrong, rule, extra] of ROWS) {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g4fr-form-${String(n).padStart(3, '0')}`,
      chapterId: CH, subsection, difficulty,
      question: `Écris la forme correcte du mot entre parenthèses.<br>« ${sentence} » &nbsp;<b>(${base})</b>`,
      options: [answer, ...wrong],
      answer,
      hint: HINTS[subsection],
      explanation: `« <b>${answer}</b> » - ${base} → ${answer}. ${RULES[rule]}${extra ? ' ' + extra : ''}`,
    }));
  }
})();
