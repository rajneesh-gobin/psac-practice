'use strict';
// Grade 4 French - Textes à Trous, deuxième série.
// Continues ch12_g4_textes_trous.js (ids 001-020) from 021.
//
// ⚠ Même contrat que la première série : un texte, dix trous, onze mots, un mot
//   en trop qui n'est JAMAIS un synonyme d'une réponse. Un trou que deux mots de
//   la banque peuvent remplir enlève un point à l'enfant qui a bien lu, et cela
//   ne se voit pas à la relecture : on croit qu'il a deviné.
// ⚠ Pas de `lang` ici : le défaut de makeCloze est le français.
(function () {
  const CH = 'g4fr-textes-trous';
  const add = (n, title, text, bank, answers, notes, difficulty) =>
    STATIC_QUESTIONS.push(makeCloze({
      id: `g4fr-clz-${String(n).padStart(3, '0')}`,
      chapterId: CH, subsection: 'texte_a_trous', difficulty: difficulty || 2,
      title, text, bank, answers, notes,
    }));

  add(21, 'Le marché de Flacq',
    'Tous les dimanches, Maya va au {1} de Flacq avec sa mère. Il faut partir tôt, car à huit heures il y a déjà beaucoup de {2}. Les étals sont pleins de légumes : des tomates, des brèdes, des {3} et des piments. Maya aime surtout l\'odeur des gâteaux-piments que l\'on {4} au coin de l\'allée. Sa mère achète toujours chez la même {5}, qui la connaît depuis longtemps. « Bonjour ma fille ! » dit la marchande à Maya, et elle ajoute une petite {6} de letchis dans le sac. Sur le chemin du {7}, les sacs sont lourds, mais Maya ne se plaint {8}. Elle sait que le marché n\'est pas seulement un endroit où l\'on {9} des choses. C\'est un endroit où les gens se {10}.',
    ['marché', 'monde', 'oignons', 'vend', 'marchande', 'grappe', 'retour', 'pas', 'achète', 'connaissent', 'bateau'],
    ['marché', 'monde', 'oignons', 'vend', 'marchande', 'grappe', 'retour', 'pas', 'achète', 'connaissent'],
    ['L\'endroit où l\'on achète des légumes le dimanche.',
      'Beaucoup de ___ : il y a foule.',
      'Un légume qui fait pleurer quand on le coupe.',
      'Ce qu\'on fait des gâteaux-piments au coin de l\'allée.',
      'La femme qui vend au marché.',
      'Une petite ___ de letchis : ils poussent en groupe.',
      'Le chemin du ___ : quand on rentre à la maison.',
      'Elle ne se plaint ___ : la négation.',
      'Ce qu\'on fait avec de l\'argent au marché.',
      'Les gens se ___ : ils savent qui est l\'autre.']);

  add(22, 'Le cerf-volant',
    'Ravi attendait le vent depuis une {1}. Samedi matin, enfin, les cocotiers bougeaient. Il est descendu dans le grand {2} derrière la maison de son grand-père et il a déroulé la {3} tout doucement. Le cerf-volant est monté très {4}, plus haut que les arbres. Puis un coup de vent plus fort a tout cassé et le cerf-volant est {5} au-dessus des champs de canne. Ravi a couru longtemps avant de le {6} dans un tamarinier. Le papier était déchiré en deux {7}. Le soir, sa grand-mère a sorti sa boîte à {8} et lui a montré comment réparer la déchirure avec du papier brun et de la {9}. « Les choses qu\'on répare, dit-elle, sont souvent celles auxquelles on tient le {10}. »',
    ['semaine', 'terrain', 'ficelle', 'haut', 'parti', 'trouver', 'morceaux', 'couture', 'colle', 'plus', 'casserole'],
    ['semaine', 'terrain', 'ficelle', 'haut', 'parti', 'trouver', 'morceaux', 'couture', 'colle', 'plus'],
    ['Sept jours.',
      'Un grand espace ouvert derrière la maison.',
      'Le fil qui retient un cerf-volant.',
      'Monté très ___ : vers le ciel.',
      'Le cerf-volant est ___ : il s\'est envolé au loin.',
      'Avant de le ___ dans l\'arbre : après l\'avoir cherché.',
      'Le papier déchiré en deux ___.',
      'Une boîte à ___ : où l\'on range fil et aiguilles.',
      'Ce qui sert à recoller du papier.',
      'Celles auxquelles on tient le ___ : superlatif.']);

  add(23, 'Le dodo',
    'Il y a très {1}, un gros oiseau gris vivait sur notre île. On l\'appelait le {2}. Il avait de toutes petites {3} et il ne pouvait pas voler. Cela ne lui posait aucun problème : sur l\'île, rien ne le {4}. Il marchait lentement dans la forêt et mangeait les fruits {5}. Puis les marins sont arrivés avec des chiens, des rats et des {6}. En moins de cent ans, le dodo avait complètement {7}. Aujourd\'hui, on ne peut plus le voir que sur les armoiries de {8}. Quand la maîtresse a raconté cette histoire, personne dans la classe n\'a {9}. Sanjay a demandé si un dodo pouvait revenir un {10}. La maîtresse a répondu doucement que non.',
    ['longtemps', 'dodo', 'ailes', 'chassait', 'tombés', 'cochons', 'disparu', 'Maurice', 'ri', 'jour', 'échelle'],
    ['longtemps', 'dodo', 'ailes', 'chassait', 'tombés', 'cochons', 'disparu', 'Maurice', 'ri', 'jour'],
    ['Il y a très ___ : dans un passé lointain.',
      'Le nom de l\'oiseau.',
      'Ce qui sert à voler, et qui chez lui étaient minuscules.',
      'Rien ne le ___ : personne ne lui courait après.',
      'Les fruits ___ par terre.',
      'Animaux de ferme amenés par les marins.',
      'Le dodo avait complètement ___ : il n\'existait plus.',
      'Les armoiries de ___ : le pays.',
      'Personne n\'a ___ : passé composé de rire.',
      'Revenir un ___ : dans l\'avenir.']);

  add(24, 'La pluie de quatre heures',
    'Le ciel est devenu tout {1} vers quatre heures. Sam jouait au football dans la {2} avec son cousin. D\'abord il est tombé une grosse {3}, puis dix, puis beaucoup trop pour les compter. Les garçons sont rentrés en {4}. Ils ont regardé la pluie par la {5}. Le manguier se penchait dans le vent et l\'eau coulait dans la rue comme une petite {6}. Au bout de vingt minutes, le {7} est revenu. Tout sentait la terre {8}. Les deux cousins sont ressortis, mais le ballon était plein de {9} et le terrain était devenu une vraie {10}.',
    ['noir', 'cour', 'goutte', 'courant', 'fenêtre', 'rivière', 'soleil', 'mouillée', 'boue', 'mare', 'lanterne'],
    ['noir', 'cour', 'goutte', 'courant', 'fenêtre', 'rivière', 'soleil', 'mouillée', 'boue', 'mare'],
    ['La couleur du ciel avant un gros orage.',
      'L\'espace devant ou derrière la maison où l\'on joue.',
      'Une seule ___ de pluie, la première.',
      'Rentrés en ___ : vite.',
      'Ce par quoi on regarde dehors sans sortir.',
      'L\'eau dans la rue coulait comme une petite ___.',
      'Ce qui revient après la pluie.',
      'La terre ___ après la pluie.',
      'De la terre mélangée à l\'eau.',
      'Une flaque très large sur le terrain.']);

  add(25, 'Le jardin de grand-père',
    'Derrière la maison de mon grand-père, il y a un jardin qui n\'est pas plus {1} que notre classe. Il y fait pousser des tomates, des haricots, des piments et trois sortes de {2}. Il ne plante jamais la même chose au même {3} deux années de suite. « La terre se {4}, dit-il, si on lui demande toujours la même chose. » Il garde toutes les épluchures dans un grand {5} bleu près du robinet. Au bout de quelques mois, elles deviennent une terre {6} et riche qu\'il remet au pied des plantes. Rien n\'est {7}. Quand je lui ai demandé où il avait {8} tout cela, il m\'a répondu que c\'était sa propre grand-mère, et qu\'elle ne savait pas {9} un seul mot. Je croyais que jardiner, c\'était surtout {10}.',
    ['grand', 'brèdes', 'endroit', 'fatigue', 'seau', 'noire', 'jeté', 'appris', 'lire', 'arroser', 'ancre'],
    ['grand', 'brèdes', 'endroit', 'fatigue', 'seau', 'noire', 'jeté', 'appris', 'lire', 'arroser'],
    ['Pas plus ___ que notre classe : comparaison de taille.',
      'Légumes-feuilles mauriciens.',
      'Au même ___ : à la même place.',
      'La terre se ___ : elle s\'épuise.',
      'Un grand récipient bleu près du robinet.',
      'La couleur d\'une bonne terre de compost.',
      'Rien n\'est ___ : rien ne part à la poubelle.',
      'Où il avait ___ tout cela : participe passé d\'apprendre.',
      'Ce que sa grand-mère ne savait pas faire.',
      'Ce qu\'on croit que jardiner veut surtout dire.']);

  add(26, 'Le jour du sport',
    'Il a plu le matin du jour du {1}, et pendant une heure tout le monde a cru que ce serait {2}. Puis le ciel s\'est dégagé et toute l\'école est descendue sur le {3} en deux longues files. Nisha courait le dernier relais. Son équipe était {4} quand le témoin est arrivé dans sa main. Elle a couru comme son entraîneur le lui avait {5} : les yeux devant, les bras souples, la respiration {6}. Elle a dépassé une coureuse dans le virage, mais elle n\'a pas rattrapé la {7}. Son équipe est arrivée deuxième. Nisha a été surprise de ne pas se sentir {8} du tout. Ses amies criaient son {9} et le soleil brillait enfin. Dans le bus, elle s\'est {10} contre la vitre, la médaille encore dans la main.',
    ['sport', 'annulé', 'terrain', 'troisième', 'appris', 'régulière', 'première', 'déçue', 'nom', 'endormie', 'boussole'],
    ['sport', 'annulé', 'terrain', 'troisième', 'appris', 'régulière', 'première', 'déçue', 'nom', 'endormie'],
    ['Le jour du ___ : la fête sportive de l\'école.',
      'Ce serait ___ : la course n\'aurait pas lieu.',
      'L\'endroit où se déroule le sport.',
      'Le rang de son équipe avant qu\'elle ne coure.',
      'Comme son entraîneur le lui avait ___.',
      'Une respiration ___ : ni trop vite ni trop lente.',
      'Elle n\'a pas rattrapé la ___ coureuse.',
      'Ce qu\'on s\'attendrait à ressentir après une deuxième place.',
      'Ce que ses amies criaient.',
      'Elle s\'est ___ contre la vitre du bus.']);

  console.log('[g4fr-textes-trous] série B loaded');
})();
