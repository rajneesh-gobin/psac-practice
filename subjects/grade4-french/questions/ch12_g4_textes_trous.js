'use strict';
// Grade 4 French - Textes à Trous (PSAC question 6, 10 marks).
// One text, ten gaps, eleven words, one word deliberately spare.
// ⚠ type 'cloze': excluded from every practice and exam pool by isPoolQuestion()
// in questions_engine.js, and reached only through ClozeText (engine/cloze.js).
// ⚠ The {n} markers must run 1..10 with no gaps, `answers` must have one entry
// per marker in ORDER, and `bank` must contain every answer plus the spare.
// scripts/test-cloze-texts.js asserts all three on every text.
(function () {
  const CH = 'g4fr-textes-trous';
  const add = (n, title, text, bank, answers, notes, difficulty) =>
    STATIC_QUESTIONS.push(makeCloze({
      id: `g4fr-clz-${String(n).padStart(3, '0')}`,
      chapterId: CH, subsection: 'texte_a_trous', difficulty: difficulty || 2,
      title, text, bank, answers, notes,
    }));

  add(1, 'Samedi matin en ville',
    'Chaque samedi, maman et moi allons au {1} de Port-Louis. Il y a beaucoup de {2} : des mangues, des bananes et des ananas. Le marchand est très {3} ; il nous donne toujours un fruit en cadeau. Maman achète aussi des {4} pour le curry. Nous {5} les sacs jusqu\'à la voiture. Sur le {6} du retour, je mange une mangue bien {7}. « Elle est très {8} ! » dis-je à maman. Elle {9} et me donne une serviette. J\'aime {10} le samedi matin.',
    ['chemin', 'gentil', 'marché', 'sucrée', 'chapeau', 'fruits', 'portons', 'beaucoup', 'mûre', 'légumes', 'sourit'],
    ['marché', 'fruits', 'gentil', 'légumes', 'portons', 'chemin', 'mûre', 'sucrée', 'sourit', 'beaucoup'],
    ['Après « au », il faut un nom de lieu.', 'Des mangues et des bananes sont des fruits.', 'Après « très », il faut un adjectif.', 'Pour un curry, on achète des légumes.', 'Le sujet est « Nous » : le verbe prend -ons.', '« Sur le ___ du retour » : la route qu\'on prend.', 'Une mangue prête à manger est mûre.', 'Après « très », un adjectif : le goût du sucre.', 'Le sujet est « Elle » : le verbe prend -t.', '« J\'aime ___ » : un adverbe de quantité.']);

  add(2, 'Devant la porte',
    'Un matin, Riya a trouvé un petit {1} devant sa porte. Il était {2} et il tremblait de froid. Elle lui a donné du {3} dans un bol. Le chien a tout {4} très vite. Riya a demandé à sa {5} si elle pouvait le garder. « Nous devons d\'abord chercher son {6} », a répondu maman. Elles ont collé une {7} sur le mur du village. Deux jours plus {8}, un monsieur est venu. C\'était le propriétaire ! Il était si {9} qu\'il a pleuré. Riya était triste, mais elle a {10} que le chien rentre chez lui.',
    ['maître', 'lait', 'tard', 'mangé', 'heureux', 'chien', 'préféré', 'affiche', 'mouillé', 'maman', 'fenêtre'],
    ['chien', 'mouillé', 'lait', 'mangé', 'maman', 'maître', 'affiche', 'tard', 'heureux', 'préféré'],
    ['« un petit ___ » : l\'animal de l\'histoire.', 'Il tremblait de froid : il était mouillé.', 'On donne du lait dans un bol.', 'Passé composé avec « a » : le participe passé.', '« sa ___ » : la personne à qui elle demande.', 'Le propriétaire d\'un chien est son maître.', 'On colle une affiche sur un mur.', '« Deux jours plus ___ » : après.', '« si ___ qu\'il a pleuré » : un adjectif.', '« elle a ___ que » : passé composé de préférer.']);

  add(3, 'La sortie à la plage',
    'Dimanche, toute la {1} est allée à la plage de Flic-en-Flac. Papa a porté le grand {2} bleu pour nous protéger du soleil. Mon frère et moi avons {3} un château de sable. La {4} était chaude et calme. Maman nous a dit de ne pas aller trop {5}. À midi, nous avons {6} des sandwichs sous les filaos. Un crabe est {7} près de mon pied et j\'ai crié ! Tout le monde a {8}. Le soir, nous étions {9} mais très contents. Je veux y {10} le week-end prochain.',
    ['retourner', 'famille', 'mer', 'construit', 'ri', 'parapluie', 'loin', 'passé', 'mangé', 'fatigués', 'nagé'],
    ['famille', 'parapluie', 'construit', 'mer', 'loin', 'mangé', 'passé', 'ri', 'fatigués', 'retourner'],
    ['« toute la ___ » : les parents et les enfants.', 'On se protège du soleil sous un parapluie.', 'On construit un château de sable.', 'Chaude et calme : c\'est l\'eau de la mer.', '« ne pas aller trop ___ » : adverbe de distance.', 'À midi, on mange des sandwichs.', '« est ___ près de mon pied » : le crabe a marché.', 'Après un cri, tout le monde a ri.', '« nous étions ___ » : accord au pluriel.', 'Après « je veux », un infinitif.']);

  add(4, 'Chez grand-mère',
    'Grand-mère a un joli {1} derrière sa maison. Elle y fait pousser des tomates, des piments et des {2}. Chaque matin, elle {3} ses plantes avec un arrosoir vert. « La terre doit rester {4} », dit-elle. Les {5} viennent chanter dans le manguier. Grand-mère leur laisse toujours quelques {6} sur les branches. Le samedi, je l\'{7} à enlever les mauvaises herbes. Mes mains deviennent toutes {8}, mais cela ne me dérange pas. Nous {9} ensuite un jus de goyave sur la véranda. C\'est mon moment {10} de la semaine.',
    ['fruits', 'jardin', 'humide', 'buvons', 'sales', 'aide', 'oiseaux', 'arrose', 'préféré', 'salades', 'nuage'],
    ['jardin', 'salades', 'arrose', 'humide', 'oiseaux', 'fruits', 'aide', 'sales', 'buvons', 'préféré'],
    ['Derrière la maison, on cultive dans un jardin.', 'Avec les tomates et les piments : des salades.', 'Avec un arrosoir, on arrose.', '« La terre doit rester ___ » : pas sèche.', 'Ce qui chante dans un manguier.', 'On laisse des fruits sur les branches.', '« je l\'___ » : sujet « je », verbe en -e.', 'Après avoir enlevé des herbes : les mains sont sales.', 'Sujet « Nous » : le verbe prend -ons.', '« mon moment ___ » : celui que j\'aime le plus.']);

  add(5, 'Un jour de pluie',
    'Ce matin, le ciel était tout {1}. Il a commencé à {2} très fort avant l\'école. J\'ai pris mon {3} rouge dans l\'entrée. Sur la route, les flaques étaient {4} et mes chaussures ont pris l\'eau. À l\'école, la maîtresse nous a dit de rester à l\'{5} pendant la récréation. Nous avons joué aux {6} dans la classe. Mon ami Kevin a {7} trois parties de suite ! À midi, le soleil est enfin {8}. Un bel {9} est apparu au-dessus du terrain. Toute la classe est sortie pour le {10}.',
    ['pleuvoir', 'gris', 'gagné', 'intérieur', 'arc-en-ciel', 'parapluie', 'profondes', 'regarder', 'revenu', 'cartes', 'dormir'],
    ['gris', 'pleuvoir', 'parapluie', 'profondes', 'intérieur', 'cartes', 'gagné', 'revenu', 'arc-en-ciel', 'regarder'],
    ['Un ciel de pluie est gris.', 'Après « commencé à », un infinitif.', 'Contre la pluie, on prend un parapluie.', 'Des flaques d\'eau peuvent être profondes.', '« rester à l\'___ » : dedans.', 'On joue aux cartes dans la classe.', 'Trois parties de suite : il les a gagnées.', '« le soleil est enfin ___ » : il est revenu.', 'Après la pluie et avec le soleil : un arc-en-ciel.', 'Après « pour », un infinitif.']);

  add(6, 'Vendredi soir à l\'école',
    'Vendredi, notre école a organisé une grande {1}. Chaque classe devait préparer un {2}. Nous avons dansé le séga devant tous les {3}. Ma sœur jouait de la {4} avec le groupe de musique. La cour était décorée de {5} de toutes les couleurs. Il y avait aussi un stand de {6} : gâteaux-piments et samoussas. Le directeur a {7} un discours très court, et tout le monde a applaudi. À la fin, on a distribué des {8} aux gagnants du concours. Je n\'ai rien gagné, mais je me suis bien {9}. C\'était une journée {10}.',
    ['prix', 'ballons', 'spectacle', 'fête', 'amusé', 'guitare', 'nourriture', 'parents', 'fait', 'inoubliable', 'escalier'],
    ['fête', 'spectacle', 'parents', 'guitare', 'ballons', 'nourriture', 'fait', 'prix', 'amusé', 'inoubliable'],
    ['« une grande ___ » : l\'événement de l\'école.', 'Chaque classe prépare un spectacle.', 'On danse devant les parents.', 'On joue de la guitare.', 'On décore une cour avec des ballons.', 'Gâteaux-piments et samoussas : de la nourriture.', '« a ___ un discours » : faire un discours.', 'On distribue des prix aux gagnants.', '« je me suis bien ___ » : s\'amuser.', '« une journée ___ » : qu\'on n\'oublie pas.']);

  add(7, 'Apprendre à rouler',
    'Pour mon anniversaire, papa m\'a offert un {1} bleu. J\'étais tellement {2} que j\'ai sauté partout. Le premier jour, je suis {3} deux fois. Papa tenait la {4} derrière moi et courait à côté. « N\'aie pas {5} », me disait-il. Petit à petit, j\'ai appris à garder l\'{6}. Une semaine plus tard, je pouvais rouler {7} sur le chemin du village. Maintenant, je vais à l\'école à {8} tous les matins. Je mets toujours mon {9} pour être en sécurité. Mon vélo est mon plus beau {10}.',
    ['casque', 'selle', 'tombé', 'vélo', 'peur', 'content', 'seul', 'cadeau', 'équilibre', 'bicyclette', 'crayon'],
    ['vélo', 'content', 'tombé', 'selle', 'peur', 'équilibre', 'seul', 'bicyclette', 'casque', 'cadeau'],
    ['« un ___ bleu » qu\'on offre : le sujet du texte.', 'Après « tellement », un adjectif.', 'Passé composé avec « suis » : tomber.', 'Papa tient la selle du vélo.', '« N\'aie pas ___ » : l\'expression avoir peur.', 'Sur un vélo, on garde l\'équilibre.', '« rouler ___ » : sans aide.', '« à ___ » : un autre mot pour vélo.', 'Pour la sécurité, on met un casque.', '« mon plus beau ___ » : ce qu\'on offre.']);

  add(8, 'La leçon de natation',
    'Tous les mercredis, notre classe va à la {1}. Au début, j\'avais très {2} de l\'eau profonde. Le maître nageur m\'a donné une {3} rouge pour flotter. « Respire bien et bats des {4} », m\'a-t-il expliqué. La première fois, j\'ai bu la {5} et j\'ai toussé. Mais je n\'ai pas {6} : j\'ai recommencé. Après un mois, j\'ai réussi à traverser le {7} sans aide. Mes camarades ont {8} très fort. Aujourd\'hui, je nage {9} que beaucoup d\'élèves de ma classe. La natation est devenue mon sport {10}.',
    ['tasse', 'planche', 'piscine', 'peur', 'bassin', 'jambes', 'abandonné', 'mieux', 'applaudi', 'favori', 'lampe'],
    ['piscine', 'peur', 'planche', 'jambes', 'tasse', 'abandonné', 'bassin', 'applaudi', 'mieux', 'favori'],
    ['On nage dans une piscine.', 'L\'expression avoir peur.', 'Une planche aide à flotter.', 'On bat des jambes en nageant.', '« boire la tasse » : avaler de l\'eau.', '« je n\'ai pas ___ » : j\'ai continué.', 'Traverser le bassin de la piscine.', 'Les camarades ont applaudi.', 'Comparatif irrégulier de « bien ».', '« mon sport ___ » : celui que je préfère.']);

  add(9, 'Le nouveau voisin',
    'Une nouvelle {1} est arrivée dans notre rue. Ils ont un garçon de mon {2}, qui s\'appelle Tino. Le premier jour, il est resté seul devant sa {3}. Maman m\'a dit d\'aller lui {4} bonjour. J\'étais un peu {5}, mais j\'y suis allé. Tino avait un ballon de {6} sous le bras. Nous avons joué jusqu\'à la nuit sans nous {7}. Maintenant, nous allons à l\'école {8}. Sa maman fait des gâteaux au coco {9}. Je suis content d\'avoir un nouvel {10}.',
    ['famille', 'porte', 'délicieux', 'football', 'timide', 'âge', 'dire', 'ami', 'ensemble', 'arrêter', 'bateau'],
    ['famille', 'âge', 'porte', 'dire', 'timide', 'football', 'arrêter', 'ensemble', 'délicieux', 'ami'],
    ['« une nouvelle ___ » arrive dans une rue.', '« un garçon de mon ___ » : aussi vieux que moi.', 'Il reste devant sa porte.', 'Après « aller lui », un infinitif.', 'Quelqu\'un qui n\'ose pas est timide.', 'Un ballon de football.', '« sans nous ___ » : infinitif après « sans ».', '« nous allons à l\'école ___ » : tous les deux.', 'Accord avec « des gâteaux » : masculin pluriel.', '« un nouvel ___ » : un copain.']);

  add(10, 'La sortie au jardin botanique',
    'Mardi, notre classe a visité le jardin de {1}. Le guide nous a montré les grands {2} d\'eau. Sur l\'eau flottaient d\'énormes {3} rondes. « Elles peuvent porter un petit enfant », a-t-il {4}. Nous avons aussi vu des {5} très vieux, plantés il y a deux cents ans. J\'ai pris beaucoup de {6} avec l\'appareil de la maîtresse. À l\'ombre, nous avons fait un {7} avec nos sandwichs. Un singe est descendu voler une {8} à Kevin ! Nous avons tous {9}. Ce fut une {10} très intéressante.',
    ['ri', 'bassins', 'Pamplemousses', 'feuilles', 'arbres', 'expliqué', 'photos', 'banane', 'pique-nique', 'journée', 'chaise'],
    ['Pamplemousses', 'bassins', 'feuilles', 'expliqué', 'arbres', 'photos', 'pique-nique', 'banane', 'ri', 'journée'],
    ['Le célèbre jardin botanique de Maurice.', 'Des bassins d\'eau dans un jardin.', 'Les nénuphars ont d\'énormes feuilles rondes.', 'Passé composé : ce que le guide a fait.', 'Plantés il y a deux cents ans : des arbres.', 'Avec un appareil, on prend des photos.', 'Manger dehors : un pique-nique.', 'Un singe vole une banane.', 'Après une scène drôle : nous avons ri.', '« une ___ intéressante » : un jour de visite.']);

  add(11, 'Quand le vent est arrivé',
    'La radio a annoncé qu\'un {1} approchait de l\'île. Papa a fermé tous les {2} de la maison. Maman a acheté du riz, de l\'eau et des {3}. Le vent a commencé à {4} très fort dans la nuit. Les arbres {5} dans tous les sens. Nous avons perdu l\'{6} pendant deux jours. Nous avons joué aux dominos à la {7} d\'une bougie. Le matin du troisième jour, tout était {8}. Dans la cour, un grand manguier était {9}. Les voisins sont venus nous {10} à nettoyer.',
    ['électricité', 'volets', 'souffler', 'cyclone', 'calme', 'bougies', 'lumière', 'aider', 'penchaient', 'tombé', 'école'],
    ['cyclone', 'volets', 'bougies', 'souffler', 'penchaient', 'électricité', 'lumière', 'calme', 'tombé', 'aider'],
    ['La radio annonce l\'arrivée d\'un cyclone.', 'On ferme les volets des fenêtres.', 'Sans électricité, il faut des bougies.', 'Après « commencé à », un infinitif.', 'Imparfait : les arbres bougeaient.', 'On perd l\'électricité pendant un cyclone.', '« à la ___ d\'une bougie ».', 'Après la tempête, tout est calme.', 'Un arbre qui n\'est plus debout est tombé.', 'Après « venus nous », un infinitif.']);

  add(12, 'Mon petit coin',
    'Ma {1} n\'est pas très grande, mais je l\'aime beaucoup. Mon {2} est contre le mur, près de la fenêtre. Au-dessus, j\'ai collé des {3} de mon équipe de football. Sur mon {4}, il y a mes cahiers et une petite lampe. Tous mes livres sont rangés dans la {5}. Maman dit toujours que ma chambre est en {6}. Alors, chaque samedi, je {7} le sol et je range mes affaires. Mon chat vient dormir sur le {8} pendant que je travaille. Le soir, j\'ouvre la fenêtre pour écouter les {9}. Je m\'endors {10} dans mon petit coin.',
    ['bibliothèque', 'lit', 'bureau', 'chambre', 'balaie', 'affiches', 'désordre', 'grenouilles', 'tapis', 'vite', 'valise'],
    ['chambre', 'lit', 'affiches', 'bureau', 'bibliothèque', 'désordre', 'balaie', 'tapis', 'grenouilles', 'vite'],
    ['La pièce où on dort.', 'On dort dans un lit.', 'On colle des affiches au mur.', 'On pose ses cahiers sur un bureau.', 'Les livres se rangent dans une bibliothèque.', '« en ___ » : le contraire de rangé.', 'Sujet « je » : balayer → je balaie.', 'Le chat dort sur le tapis.', 'Le soir à Maurice, on écoute les grenouilles.', '« Je m\'endors ___ » : un adverbe.']);

  add(13, 'À la cuisine avec maman',
    'Aujourd\'hui, maman m\'apprend à faire un {1} à la banane. D\'abord, il faut {2} les mains. Ensuite, on écrase trois bananes bien {3} dans un bol. On ajoute de la {4}, du sucre et deux œufs. Il faut bien {5} le tout avec une cuillère en bois. Maman allume le {6} pendant que je verse la pâte dans le moule. Le gâteau doit cuire pendant quarante {7}. Une bonne {8} remplit toute la cuisine. Quand il est prêt, on le laisse {9} avant de le couper. Mon petit frère en veut déjà une deuxième {10} !',
    ['refroidir', 'laver', 'gâteau', 'farine', 'minutes', 'mûres', 'mélanger', 'four', 'odeur', 'part', 'rivière'],
    ['gâteau', 'laver', 'mûres', 'farine', 'mélanger', 'four', 'minutes', 'odeur', 'refroidir', 'part'],
    ['On fait un gâteau à la banane.', 'Après « il faut », un infinitif.', 'Accord avec « trois bananes » : féminin pluriel.', 'On ajoute de la farine dans un gâteau.', 'Après « il faut bien », un infinitif.', 'On fait cuire un gâteau dans le four.', '« quarante ___ » : une durée.', 'Ce qui remplit la cuisine et qu\'on sent.', 'Après « on le laisse », un infinitif.', '« une deuxième ___ » : un morceau de gâteau.']);

  add(14, 'Samedi après-midi sur le terrain',
    'Samedi après-midi, notre équipe a joué un {1} important. Le terrain était {2} à cause de la pluie du matin. Notre gardien a arrêté trois {3} très difficiles. À la mi-temps, le score était de zéro {4} zéro. Le capitaine nous a dit de ne pas {5}. Dans la deuxième mi-temps, Vikash a marqué un magnifique {6}. Les supporters ont crié de {7} dans les gradins. L\'arbitre a sifflé la {8} du match cinq minutes plus tard. Nous avons {9} un contre zéro ! Nous étions les {10} du tournoi.',
    ['champions', 'match', 'gagné', 'boueux', 'but', 'ballons', 'à', 'fin', 'joie', 'abandonner', 'cahier'],
    ['match', 'boueux', 'ballons', 'à', 'abandonner', 'but', 'joie', 'fin', 'gagné', 'champions'],
    ['On joue un match de football.', 'Après la pluie, un terrain est boueux.', 'Un gardien arrête des ballons.', '« zéro ___ zéro » : la préposition du score.', 'Après « ne pas », un infinitif.', 'On marque un but.', 'Crier de joie.', 'L\'arbitre siffle la fin du match.', 'Un contre zéro : nous avons gagné.', 'Les vainqueurs d\'un tournoi.']);

  add(15, 'Le mercredi après-midi',
    'Le mercredi, je vais à la {1} du village avec ma cousine. C\'est un endroit très {2} : on ne parle qu\'à voix basse. Il y a des centaines de {3} sur les étagères. La dame qui travaille là est très {4} et connaît tous les titres. J\'aime surtout les {5} d\'aventure et les bandes dessinées. On peut {6} trois livres à la fois pendant deux semaines. Je note toujours la {7} du retour sur mon cahier. Une fois, j\'ai {8} de rendre un livre à temps. J\'ai dû payer une petite {9}. Depuis, je fais très {10}.',
    ['romans', 'bibliothèque', 'oublié', 'livres', 'gentille', 'emprunter', 'silencieux', 'date', 'attention', 'amende', 'vélo'],
    ['bibliothèque', 'silencieux', 'livres', 'gentille', 'romans', 'emprunter', 'date', 'oublié', 'amende', 'attention'],
    ['On emprunte des livres à la bibliothèque.', 'On y parle à voix basse : c\'est silencieux.', 'Des centaines de livres sur les étagères.', 'Accord avec « la dame » : féminin.', 'Des romans d\'aventure.', 'Après « on peut », un infinitif.', 'On note la date du retour.', '« j\'ai ___ de rendre » : oublier.', 'Quand on rend en retard, on paie une amende.', '« je fais très ___ » : l\'expression faire attention.']);

  add(16, 'Au pied de l\'arbre',
    'En rentrant de l\'école, j\'ai trouvé un petit {1} au pied d\'un arbre. Son {2} gauche semblait cassé. Je l\'ai porté doucement dans mes {3}. À la maison, papa a préparé une {4} avec un vieux carton et un tissu doux. Nous lui avons donné de l\'{5} avec une petite cuillère. Chaque jour, l\'oiseau devenait plus {6}. Au bout d\'une semaine, il a commencé à {7} dans la boîte. Papa a dit qu\'il était temps de le {8}. Nous sommes allés au fond du {9}. L\'oiseau s\'est envolé et nous avons été très {10}.',
    ['fiers', 'aile', 'oiseau', 'boîte', 'jardin', 'mains', 'libérer', 'eau', 'fort', 'battre', 'porte'],
    ['oiseau', 'aile', 'mains', 'boîte', 'eau', 'fort', 'battre', 'libérer', 'jardin', 'fiers'],
    ['Un petit animal trouvé au pied d\'un arbre.', 'Un oiseau a deux ailes.', 'On porte quelque chose dans ses mains.', 'On prépare une boîte avec un carton.', 'On donne de l\'eau à la cuillère.', 'Il guérit : il devient plus fort.', 'Un oiseau bat des ailes.', 'Après « de le », un infinitif.', 'Au fond du jardin.', 'Accord au masculin pluriel : « nous » = les deux.']);

  add(17, 'Le premier jour',
    'Ce matin, c\'était la {1} des classes. J\'ai mis mon nouvel {2} et mes chaussures noires. Dans mon {3}, il y avait des cahiers neufs et une trousse. Maman m\'a accompagné jusqu\'à la {4} de l\'école. J\'étais un peu {5} de rencontrer ma nouvelle maîtresse. Elle s\'appelle madame Curé et elle est très {6}. Elle nous a fait chanter une chanson pour nous {7}. Ensuite, chacun a dit son {8} et son âge devant la classe. J\'ai retrouvé deux {9} de l\'année dernière. Finalement, la journée s\'est très bien {10}.',
    ['nerveux', 'uniforme', 'grille', 'rentrée', 'nom', 'sac', 'souriante', 'passée', 'amis', 'accueillir', 'cuisine'],
    ['rentrée', 'uniforme', 'sac', 'grille', 'nerveux', 'souriante', 'accueillir', 'nom', 'amis', 'passée'],
    ['Le premier jour d\'école : la rentrée.', 'À l\'école, on porte un uniforme.', 'On met ses cahiers dans un sac.', 'On entre par la grille de l\'école.', 'Après « un peu », un adjectif.', 'Accord avec « elle » : féminin.', 'Après « pour nous », un infinitif.', 'On dit son nom et son âge.', 'On retrouve des amis.', '« la journée s\'est bien ___ » : se passer.']);

  add(18, 'Monsieur Ramjan',
    'Devant l\'école, il y a un {1} d\'alouda très connu. Son nom est monsieur Ramjan et il vient chaque jour à quatre {2}. Sa charrette est peinte en {3} et en jaune. Il prépare l\'alouda avec du lait, des graines de basilic et de la {4}. Beaucoup d\'élèves font la {5} pour en acheter. Un verre coûte seulement vingt {6}. Monsieur Ramjan connaît le {7} de chaque enfant. Quand il fait très {8}, il vend plus de cent verres. Il dit que c\'est le {9} qui rend les gens heureux. Je pense qu\'il a {10}.',
    ['roupies', 'heures', 'vendeur', 'rouge', 'prénom', 'queue', 'glace', 'chaud', 'sourire', 'raison', 'cahier'],
    ['vendeur', 'heures', 'rouge', 'glace', 'queue', 'roupies', 'prénom', 'chaud', 'sourire', 'raison'],
    ['Celui qui vend est un vendeur.', '« à quatre ___ » : l\'heure.', 'Peinte en ___ et en jaune : une couleur.', 'Dans l\'alouda, on met de la glace.', '« faire la ___ » : attendre son tour.', 'La monnaie de Maurice.', 'Il connaît le prénom de chaque enfant.', '« il fait très ___ » : la météo.', 'Ce qui rend les gens heureux.', '« il a ___ » : l\'expression avoir raison.']);

  add(19, 'Ma grande sœur sur scène',
    'Ma grande sœur prépare un {1} de danse depuis trois mois. Elle répète chaque soir dans le {2} avec ses amies. Sa {3} est rouge avec des paillettes dorées. Hier soir, toute la famille est allée la {4}. La salle était pleine : il n\'y avait plus une seule {5} libre. Quand la musique a commencé, tout le monde s\'est {6}. Ma sœur dansait au {7} de la scène. Elle bougeait avec beaucoup de {8}. À la fin, le public s\'est levé pour {9}. J\'étais très {10} d\'elle.',
    ['fier', 'salon', 'spectacle', 'robe', 'milieu', 'voir', 'chaise', 'grâce', 'tu', 'applaudir', 'chapeau'],
    ['spectacle', 'salon', 'robe', 'voir', 'chaise', 'tu', 'milieu', 'grâce', 'applaudir', 'fier'],
    ['Elle prépare un spectacle.', 'Elle répète dans le salon de la maison.', 'Une danseuse porte une robe.', 'Après « allée la », un infinitif.', 'Plus une seule chaise libre.', '« tout le monde s\'est ___ » : participe de se taire.', 'Au milieu de la scène.', '« avec beaucoup de ___ » : élégance.', 'Après « pour », un infinitif.', '« J\'étais très ___ d\'elle » : adjectif.']);

  add(20, 'Une pièce dans le sable',
    'Pendant la récréation, Ashvin a {1} quelque chose de brillant dans le sable. Il a creusé avec un {2} et a sorti une vieille pièce de monnaie. Tous les élèves se sont {3} autour de lui. « C\'est peut-être un {4} de pirate ! » a crié quelqu\'un. La maîtresse est venue voir de plus {5}. Elle a nettoyé la pièce avec un {6}. On pouvait lire une {7} : mille huit cent trente. « Elle a presque deux cents {8} », a-t-elle dit. Elle a proposé de l\'apporter au {9} de Mahébourg. Toute la classe était très {10}.',
    ['musée', 'bâton', 'excitée', 'trésor', 'ans', 'trouvé', 'date', 'près', 'approchés', 'chiffon', 'bateau'],
    ['trouvé', 'bâton', 'approchés', 'trésor', 'près', 'chiffon', 'date', 'ans', 'musée', 'excitée'],
    ['Passé composé : il a trouvé quelque chose.', 'On creuse le sable avec un bâton.', '« se sont ___ » : venir tout près.', 'Un trésor de pirate.', '« de plus ___ » : l\'expression de plus près.', 'On nettoie avec un chiffon.', 'Mille huit cent trente est une date.', '« deux cents ___ » : la durée en années.', 'Les objets anciens vont au musée.', 'Accord avec « la classe » : féminin singulier.']);
})();
