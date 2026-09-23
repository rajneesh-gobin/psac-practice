'use strict';
// Grade 5 French - Textes à Trous, deuxième série (ids 021+).
// Même contrat que ch14_textes_trous.js : dix trous, onze mots, un seul en trop.
// ⚠ Le mot en trop n'est jamais un synonyme d'une réponse — sinon deux mots
//   remplissent le même trou et l'enfant qui a bien lu perd un point.
(function () {
  const CH = 'g5fr-textes-trous';
  const add = (n, title, text, bank, answers, notes, difficulty) =>
    STATIC_QUESTIONS.push(makeCloze({
      id: `g5fr-clz-${String(n).padStart(3, '0')}`,
      chapterId: CH, subsection: 'texte_a_trous', difficulty: difficulty || 3,
      title, text, bank, answers, notes,
    }));

  add(21, 'La cheminée de l\'usine',
    'L\'usine sucrière de notre village a fermé il y a douze {1}. Pendant longtemps, le bâtiment est resté {2}, avec sa haute cheminée qu\'on voyait depuis la route. Les anciens ouvriers n\'en parlaient pas {3}. Certains ont trouvé du travail dans les hôtels de la {4} ; d\'autres n\'ont jamais vraiment retrouvé quoi que ce {5}. Puis la commune a décidé de ne pas la {6}. On a gardé la cheminée et les murs, et on a installé à l\'intérieur une bibliothèque et une {7} pour les associations. Mon grand-père y a travaillé vingt-huit ans. Le mercredi, il y emmène ma petite {8} pour qu\'elle lise. Il dit encore « l\'usine » au lieu de « la {9} ». Il trouve cela étrange, mais il ajoute que c\'est mieux qu\'une {10}.',
    ['ans', 'vide', 'beaucoup', 'côte', 'soit', 'démolir', 'salle', 'sœur', 'bibliothèque', 'ruine', 'casserole'],
    ['ans', 'vide', 'beaucoup', 'côte', 'soit', 'démolir', 'salle', 'sœur', 'bibliothèque', 'ruine'],
    ['Douze ___ : la durée depuis la fermeture.',
      'Le bâtiment est resté ___ : sans personne dedans.',
      'Ils n\'en parlaient pas ___ : peu souvent.',
      'Les hôtels se trouvent au bord de la mer, sur la ___.',
      '« Quoi que ce ___ » : l\'expression figée.',
      'Ne pas la ___ : ne pas la faire tomber.',
      'Une ___ pour les associations : une grande pièce.',
      'La petite fille qu\'il emmène lire.',
      'Le nouveau nom du bâtiment.',
      'Mieux qu\'une ___ : un bâtiment abandonné qui tombe.']);

  add(22, 'Le mois sec',
    'Maurice reçoit beaucoup de {1} : plus de deux mètres par an au centre de l\'île. Il est donc surprenant d\'entendre parler de coupures d\'{2}. La difficulté n\'est pas la quantité qui tombe, mais le {3} où elle tombe. La plus grande partie arrive pendant quelques mois d\'{4}. L\'île est petite et {5}, si bien que l\'eau qu\'on ne retient pas atteint la mer en quelques {6}. Les réservoirs gardent ce qu\'ils {7}, mais les vieux tuyaux en perdent une partie avant même qu\'elle n\'arrive au {8}. Un mois de septembre sec est donc moins un manque de pluie qu\'un manque de réservoirs et de tuyaux qui ne {9} pas. Réparer un tuyau n\'est pas un travail {10}, mais c\'est l\'un des plus utiles.',
    ['pluie', 'eau', 'moment', 'été', 'pentue', 'heures', 'peuvent', 'robinet', 'fuient', 'spectaculaire', 'échelle'],
    ['pluie', 'eau', 'moment', 'été', 'pentue', 'heures', 'peuvent', 'robinet', 'fuient', 'spectaculaire'],
    ['Ce que Maurice reçoit en grande quantité.',
      'Des coupures d\'___ : quand le robinet ne donne plus rien.',
      'Le ___ où elle tombe : la question du quand.',
      'La saison des fortes pluies à Maurice.',
      'Une île ___ : avec des pentes fortes.',
      'En quelques ___ : très peu de temps.',
      'Ce qu\'ils ___ : ce dont ils sont capables.',
      'Là où l\'eau sort dans une maison.',
      'Des tuyaux qui ne ___ pas : qui ne perdent pas d\'eau.',
      'Un travail ___ : qu\'on remarque, dont on parle.']);

  add(23, 'Les arbres des plages',
    'Sur presque toutes les plages publiques de Maurice, on passe sous des {1}. Ils ne sont pas originaires de l\'île : on les a {2} en grand nombre parce qu\'ils poussent vite dans un sol {3} et pauvre, et parce que leurs {4} retiennent le sable quand la mer le pousse. Pendant longtemps, cela a semblé une bonne chose sans aucun {5}. Depuis peu, des botanistes font remarquer un problème : les aiguilles de filao tombent en un tapis si {6} que presque aucune autre plante ne peut y {7}. Une plage de filaos est donc souvent une plage de filaos et de rien d\'{8}. Personne ne dit que ces arbres sont {9} — ils sont manifestement utiles. La question est de savoir si tout un littoral doit reposer sur une seule {10}.',
    ['filaos', 'plantés', 'sableux', 'racines', 'défaut', 'épais', 'pousser', 'autre', 'inutiles', 'espèce', 'lanterne'],
    ['filaos', 'plantés', 'sableux', 'racines', 'défaut', 'épais', 'pousser', 'autre', 'inutiles', 'espèce'],
    ['Les arbres qui bordent les plages mauriciennes.',
      'On les a ___ : participe passé de planter.',
      'Un sol de plage est ___.',
      'La partie de l\'arbre qui tient le sable.',
      'Sans aucun ___ : sans inconvénient.',
      'Un tapis si ___ que rien ne passe.',
      'Aucune plante ne peut y ___.',
      'Rien d\'___ : rien de plus.',
      'Personne ne dit qu\'ils sont ___ : le contraire d\'utiles.',
      'Une seule ___ : une seule sorte d\'arbre.']);

  add(24, 'Trois façons de parler avant sept ans',
    'Un enfant mauricien peut parler le kreol à la {1}, étudier en anglais et apprendre le français comme {2}, tout cela avant l\'âge de sept ans. Pour un visiteur, cela ressemble à une {3} très lourde. Les recherches sur les classes multilingues suggèrent pourtant autre {4} : les enfants qui passent tôt d\'une langue à l\'autre remarquent souvent plus vite comment la langue {5} — qu\'un mot est un choix et non un {6}. La vraie difficulté n\'est presque jamais le nombre de {7}. Elle apparaît quand on demande à un enfant de lire dans une langue qu\'il ne parle pas encore {8}, et qu\'on le juge ensuite sur la lecture plutôt que sur la {9}. Un enfant qui comprend la science mais bute sur l\'anglais est alors noté comme {10} en science.',
    ['maison', 'matière', 'charge', 'chose', 'fonctionne', 'fait', 'langues', 'bien', 'compréhension', 'faible', 'boussole'],
    ['maison', 'matière', 'charge', 'chose', 'fonctionne', 'fait', 'langues', 'bien', 'compréhension', 'faible'],
    ['Le kreol se parle à la ___.',
      'Le français s\'apprend comme ___ à l\'école.',
      'Une ___ très lourde : quelque chose de difficile à porter.',
      'Autre ___ : l\'expression figée.',
      'Comment la langue ___ : comment elle marche.',
      'Un choix et non un ___ : quelque chose de fixé.',
      'Le nombre de ___ n\'est pas le problème.',
      'Une langue qu\'il ne parle pas encore ___.',
      'Jugé sur la lecture plutôt que sur la ___.',
      'Noté comme ___ en science, à tort.']);

  add(25, 'La nuit des tortues',
    'À minuit, la plage de Rodrigues paraît {1}, mais elle ne l\'est pas. Si l\'on reste très {2} et qu\'on laisse ses yeux s\'habituer, on peut voir une forme sombre sortir lentement de la {3}. Une tortue femelle ne vient à terre que pour {4} ses œufs, et elle choisit la même bande de sable où elle est elle-même {5}. Elle creuse avec ses pattes arrière, pond, recouvre le nid, puis retourne à l\'eau avant l\'{6}. Tout cela prend environ deux heures. Sur cent petites tortues, très {7} arriveront à l\'âge adulte : les crabes, les oiseaux et les poissons prennent les {8}. On pourrait croire que les gens qui surveillent ces nids sont {9}. Ils ne le sont pas. Ils marquent chaque nid, éloignent les chiens, et {10}.',
    ['vide', 'immobile', 'mer', 'pondre', 'née', 'aube', 'peu', 'autres', 'découragés', 'comptent', 'ancre'],
    ['vide', 'immobile', 'mer', 'pondre', 'née', 'aube', 'peu', 'autres', 'découragés', 'comptent'],
    ['La plage paraît ___ : sans personne.',
      'Rester très ___ : sans bouger.',
      'D\'où sort la tortue.',
      'Ce qu\'une tortue vient faire à terre.',
      'Où elle est elle-même ___ : participe passé de naître.',
      'Avant l\'___ : avant le lever du jour.',
      'Très ___ arriveront à l\'âge adulte.',
      'Les prédateurs prennent les ___.',
      'Ce qu\'on pourrait croire, vu le nombre de pertes.',
      'Ce qu\'ils font, en plus de marquer et d\'éloigner.']);

  add(26, 'La lettre dans le tiroir',
    'Ma tante garde dans le tiroir de sa machine à {1} une lettre qu\'elle n\'a jamais {2}. Elle l\'a écrite à son frère aîné il y a trente ans, après une dispute dont aucun des deux ne se {3} plus la raison. Elle l\'a relue le lendemain matin, l\'a trouvée trop {4}, et l\'a rangée en se promettant d\'en écrire une plus {5}. Celle-là n\'a jamais été écrite. Ils se parlent aujourd\'hui — aux mariages, aux enterrements, au {6} pour le Nouvel An — mais jamais de {7}. L\'an dernier, elle m\'a montré l\'enveloppe. L\'encre est devenue {8} et le papier est mou aux pliures. Je lui ai demandé pourquoi elle la {9}. Elle m\'a répondu que cela lui rappelle à quelle vitesse une petite chose devient {10} si on la laisse tranquille.',
    ['coudre', 'envoyée', 'rappelle', 'dure', 'douce', 'téléphone', 'cela', 'brune', 'garde', 'grande', 'bateau'],
    ['coudre', 'envoyée', 'rappelle', 'dure', 'douce', 'téléphone', 'cela', 'brune', 'garde', 'grande'],
    ['Une machine à ___ : celle qui a un tiroir.',
      'Ce qu\'on fait d\'une lettre pour qu\'elle parte.',
      'Aucun des deux ne se ___ plus la raison.',
      'Trop ___ : le ton de la lettre.',
      'Une lettre plus ___ : le contraire de dure.',
      'Comment on se parle de loin au Nouvel An.',
      'Jamais de ___ : jamais de cette dispute.',
      'La couleur que prend une vieille encre.',
      'Pourquoi elle la ___ : pourquoi elle la conserve.',
      'Une petite chose devient ___ si on la laisse.']);

  console.log('[g5fr-textes-trous] série B loaded');
})();
