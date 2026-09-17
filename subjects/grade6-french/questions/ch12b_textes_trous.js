'use strict';
// Grade 6 French - Textes à Trous, deuxième série (ids 021+). DEUX PARTIES.
//
// ⚠ Partie A : cinq trous remplis avec les mots de la banque.
//   Partie B : cinq trous SANS banque — l'enfant écrit lui-même. C'est là que
//   vivent les mots grammaticaux (qui, dont, parce que, jusqu'à ce que) et on ne
//   peut pas les proposer dans un cadre sans donner la grammaire.
//
// ⚠ CHAQUE TROU DE LA PARTIE B PREND UNE LISTE de réponses acceptées, la
//   première étant le modèle. makeCloze passe answersB par gapAlts exactement
//   pour cela : « mais » et « pourtant » sont tous les deux justes, et refuser
//   le meilleur mot est la seule faute que cet exercice ne peut pas se
//   permettre. Une chaîne seule là où il faut une liste refuse du bon français
//   sans que personne ne s'en aperçoive.
(function () {
  const CH = 'g6fr-textes-trous';
  const add = (n, title, text, bank, answers, notes, textB, answersB, notesB, introB, difficulty) =>
    STATIC_QUESTIONS.push(makeCloze({
      id: `g6fr-clz-${String(n).padStart(3, '0')}`,
      chapterId: CH, subsection: 'texte_a_trous', difficulty: difficulty || 3,
      title, text, bank, answers, notes, textB, answersB, notesB, introB,
    }));

  add(21, 'L\'homme qui comptait les oiseaux',
    'Pendant trente et un ans, monsieur Bhugeerathee a parcouru le même {1} dans les gorges de Rivière Noire, chaque dimanche matin. Il emportait un carnet, un crayon et une vieille paire de {2}. Il n\'était pas {3} et personne ne le payait. Il comptait simplement les oiseaux. Quand la crécerelle de Maurice est tombée à quatre individus connus, ses carnets se sont révélés l\'un des rares {4} continus dont on {5} pour savoir où les oiseaux se nourrissaient encore.',
    ['chemin', 'jumelles', 'scientifique', 'relevés', 'disposait', 'tambour'],
    ['chemin', 'jumelles', 'scientifique', 'relevés', 'disposait'],
    ['Le même ___ chaque dimanche : le trajet qu\'il suivait.',
      'Ce avec quoi on observe des oiseaux de loin.',
      'Il n\'était pas ___ : ce n\'était pas son métier.',
      'Des ___ continus : des notes prises régulièrement.',
      'Dont on ___ : dont on disposait, qu\'on avait.'],
    'L\'équipe de conservation est venue le voir en 1979, {6} elle avait appris qu\'il observait la même vallée depuis des années. Il leur a tout donné {7} rien demander en retour. La crécerelle s\'est lentement rétablie, {8} elle reste l\'un des oiseaux les plus rares du monde. Monsieur Bhugeerathee a continué à marcher {9} l\'âge de quatre-vingt-quatre ans. Il disait que pour être utile, il suffit de faire la même chose, soigneusement, pendant très {10}.',
    [['parce qu\'', 'car', 'puisqu\'', 'comme'],
      ['sans'],
      ['mais', 'pourtant', 'même si', 'bien qu\''],
      ['jusqu\'à'],
      ['longtemps']],
    ['Introduit la raison de leur visite.',
      '___ rien demander : la préposition qui exprime l\'absence.',
      'Oppose le rétablissement à la rareté qui demeure.',
      'Il a marché ___ l\'âge de quatre-vingt-quatre ans.',
      'Pendant très ___ : la durée.'],
    'écris UN mot qui convient dans chaque trou. Il n\'y a pas de cadre pour cette partie.');

  add(22, 'Les tortues de Rodrigues',
    'Il y a quatre cents ans, les tortues géantes {1} Rodrigues par milliers. Les marins qui s\'arrêtaient sur l\'île en emportaient des centaines : la {2} se conservait vivante à bord pendant des mois, ce qui était précieux avant l\'invention du {3}. En moins de deux siècles, l\'espèce locale avait {4}. Aujourd\'hui, une réserve de l\'île élève des tortues venues d\'Aldabra, une espèce {5}.',
    ['couvraient', 'viande', 'froid', 'disparu', 'cousine', 'échelle'],
    ['couvraient', 'viande', 'froid', 'disparu', 'cousine'],
    ['Les tortues ___ l\'île : imparfait, elles étaient partout.',
      'Ce que les marins emportaient pour manger.',
      'Avant l\'invention du ___ : du réfrigérateur.',
      'L\'espèce locale avait ___ : elle n\'existait plus.',
      'Une espèce ___ : proche parente.'],
    'Ces tortues ne remplacent pas celles {6} on a perdues, {7} elles mangent les mêmes plantes et dispersent les mêmes graines. La forêt retrouve donc une partie de ce {8} lui manquait. Les gardiens de la réserve expliquent {9} il faudra encore des dizaines d\'années avant de savoir si cela a vraiment marché. En attendant, ils comptent, ils notent, et ils {10}.',
    [['qu\'', 'que'],
      ['mais', 'pourtant', 'cependant'],
      ['qui'],
      ['que', 'qu\''],
      ['attendent', 'patientent', 'continuent']],
    ['Pronom relatif complément d\'objet : celles ___ on a perdues.',
      'Oppose « ne remplacent pas » à « mangent les mêmes plantes ».',
      'Ce ___ lui manquait : pronom relatif sujet.',
      'Introduit ce qu\'ils expliquent.',
      'Ce qu\'ils font, en plus de compter et de noter.'],
    'écris UN mot qui convient dans chaque trou. Il n\'y a pas de cadre pour cette partie.');

  add(23, 'La bagasse',
    'Quand on écrase la canne à sucre, le jus s\'écoule et il reste une {1} sèche qu\'on appelle la bagasse. Pendant longtemps, ce n\'était qu\'un {2} : on l\'entassait à côté de l\'usine. Puis quelqu\'un a remarqué qu\'elle brûlait très {3}. Aujourd\'hui, plusieurs usines de Maurice brûlent la bagasse pour produire de la {4}, et la vapeur fait tourner des turbines qui produisent de l\'{5}.',
    ['fibre', 'déchet', 'bien', 'vapeur', 'électricité', 'boussole'],
    ['fibre', 'déchet', 'bien', 'vapeur', 'électricité'],
    ['Ce qui reste de la canne après l\'écrasement.',
      'Ce n\'était qu\'un ___ : quelque chose dont on veut se débarrasser.',
      'Elle brûlait très ___ : adverbe.',
      'Ce qu\'on produit en chauffant de l\'eau.',
      'Ce que produisent les turbines.'],
    'La canne repousse chaque année, {6} le combustible repousse avec elle. Une chose {7} posait problème aide maintenant à éclairer l\'île. Il vaut la peine de se rappeler {8} personne n\'a inventé la bagasse : elle était là depuis toujours, à côté de l\'usine, en attendant {9} quelqu\'un la regarde autrement. Les meilleures idées ne sont pas toujours des choses nouvelles ; ce sont parfois des choses anciennes {10} on finit par comprendre.',
    [['donc', 'et', 'si bien que', 'alors'],
      ['qui'],
      ['que', 'qu\''],
      ['que', 'qu\''],
      ['qu\'', 'que']],
    ['Exprime la conséquence : la canne repousse, ___ le combustible aussi.',
      'Une chose ___ posait problème : pronom relatif sujet.',
      'Se rappeler ___ personne n\'a inventé : introduit la subordonnée.',
      'En attendant ___ quelqu\'un la regarde : suivi du subjonctif.',
      'Des choses anciennes ___ on finit par comprendre : complément d\'objet.'],
    'écris UN mot qui convient dans chaque trou. Il n\'y a pas de cadre pour cette partie.');

  console.log('[g6fr-textes-trous] série B loaded');
})();
