'use strict';
// Grade 5 French - Textes à Trous (PSAC question 6, 10 marks).
// One text, ten gaps, eleven words, one word deliberately spare.
// ⚠ type 'cloze': excluded from every practice and exam pool by isPoolQuestion()
// in questions_engine.js, and reached only through ClozeText (engine/cloze.js).
// ⚠ Text 1 is the real 2025 paper. Its printed table listed TWELVE words for ten
// gaps while promising only one spare - because « toujours » already appears in
// the opening sentence (« la vie a toujours été difficile »). It is kept printed
// here, exactly as on the paper, and the bank holds the ten answers plus the one
// genuine distractor, « chapeau ».
(function () {
  const CH = 'g5fr-textes-trous';
  const add = (n, title, text, bank, answers, notes, difficulty) =>
    STATIC_QUESTIONS.push(makeCloze({
      id: `g5fr-clz-${String(n).padStart(3, '0')}`,
      chapterId: CH, subsection: 'texte_a_trous', difficulty: difficulty || 3,
      title, text, bank, answers, notes,
    }));

  add(1, 'Le hérisson (PSAC 2025)',
    'Il était une fois vivait un jeune hérisson dont la vie a toujours été difficile. La seule {1} qu\'il savait faire, c\'était de se mettre en boule. On l\'attaquait {2} souvent, qu\'il avait appris à se protéger. Cela le rendait triste et il avait fini par {3} qu\'on ne l\'aimait pas. Un jour, alors qu\'il se promenait non {4} d\'une maison, il entendit une {5} entre deux frères. « Tu sais, sur son dos, il y a plein de {6}. Mais papa dit que son ventre est aussi {7} que Caramel, ma peluche préférée. » disait le plus jeune frère. Surpris, notre ami à quatre {8} alla se cacher dans un coin. Il toucha {9} ventre. « Mais oui, moi aussi je suis doux en dedans, » remarqua-t-il. Tout {10}, le petit hérisson continua sa promenade.',
    ['conversation', 'pattes', 'doux', 'heureux', 'son', 'chose', 'loin', 'chapeau', 'si', 'croire', 'piquants'],
    ['chose', 'si', 'croire', 'loin', 'conversation', 'piquants', 'doux', 'pattes', 'son', 'heureux'],
    ['« la seule ___ qu\'il savait faire » : il faut un nom.', '« ___ … que » exprime la conséquence.', 'Après « fini par », on écrit l\'infinitif.', '« non ___ de » veut dire tout près de.', 'Ce qu\'on entend entre deux personnes qui parlent.', 'Ce qu\'un hérisson porte sur le dos.', '« aussi ___ que » : comparaison, il faut un adjectif.', 'Un hérisson est un animal à quatre pattes.', 'Devant « ventre », il faut un déterminant possessif.', '« Tout ___ » : ce qu\'il ressent à la fin.']);

  add(2, 'La légende du Morne',
    'Le Morne Brabant est une montagne {1} au sud-ouest de Maurice. Son histoire est {2} liée à celle de l\'esclavage. Des esclaves en fuite s\'y étaient {3} pendant des années. Du haut du rocher, ils pouvaient {4} toute la côte. Un jour, des soldats sont montés pour leur annoncer une bonne {5} : l\'esclavage était aboli. Mais les fugitifs ont {6} qu\'on venait les reprendre. Plutôt que de retourner en esclavage, ils ont {7} de sauter. Aujourd\'hui, le Morne est classé au patrimoine {8} de l\'humanité. Chaque année, une {9} y est organisée. Ce lieu rappelle à tous le {10} de la liberté.',
    ['cérémonie', 'réfugiés', 'nouvelle', 'située', 'prix', 'étroitement', 'surveiller', 'cru', 'mondial', 'décidé', 'bateau'],
    ['située', 'étroitement', 'réfugiés', 'surveiller', 'nouvelle', 'cru', 'décidé', 'mondial', 'cérémonie', 'prix'],
    ['Accord avec « une montagne » : féminin singulier.', '« ___ liée » : il faut un adverbe.', '« s\'y étaient ___ » : ils s\'étaient cachés là.', 'Après « pouvaient », un infinitif.', '« une bonne ___ » : ce qu\'on annonce.', 'Participe passé de croire.', '« ils ont ___ de sauter » : participe passé de décider.', 'Le patrimoine ___ de l\'humanité : de tout le monde.', 'Ce qu\'on organise chaque année pour se souvenir.', '« le ___ de la liberté » : ce qu\'elle a coûté.']);

  add(3, 'Une journée de pêche',
    'Mon grand-père est {1} depuis quarante ans. Chaque matin, il part avant le lever du {2}. Il connaît chaque récif et chaque {3} du lagon. Hier, il m\'a {4} avec lui pour la première fois. La pirogue avançait {5} sur l\'eau calme. Grand-père m\'a montré comment lancer le {6} sans le déchirer. Nous avons attendu près d\'une {7} sans rien attraper. « La patience est la première {8} du pêcheur », m\'a-t-il dit en souriant. Vers midi, nous avons enfin ramené trois beaux {9}. En rentrant, j\'étais épuisé mais très {10} de notre prise.',
    ['soleil', 'poissons', 'pêcheur', 'filet', 'qualité', 'emmené', 'heure', 'courant', 'doucement', 'fier', 'chapeau'],
    ['pêcheur', 'soleil', 'courant', 'emmené', 'doucement', 'filet', 'heure', 'qualité', 'poissons', 'fier'],
    ['Celui qui pêche est un pêcheur.', '« le lever du ___ » : très tôt le matin.', 'Dans un lagon : les récifs et les courants.', 'Participe passé : il m\'a emmené.', '« avançait ___ » : il faut un adverbe.', 'On lance un filet pour pêcher.', '« près d\'une ___ » : une durée.', '« la première ___ du pêcheur » : un nom.', 'Ce qu\'on ramène de la pêche.', 'Accord avec « j\' » (masculin) : adjectif.']);

  add(4, 'L\'arbre du village',
    'Au centre du village se dresse un {1} banian. Personne ne sait exactement quel {2} il a. Ses racines descendent des branches jusqu\'au {3}. Sous son ombre, les anciens se {4} chaque après-midi. Ils y jouent aux dominos et racontent des {5} d\'autrefois. Les enfants, eux, grimpent {6} sur les branches basses. L\'an dernier, la mairie a voulu l\'{7} pour élargir la route. Tout le village a {8} une pétition. Finalement, la route a été {9} de l\'autre côté. Le banian est resté : il est devenu le {10} du village.',
    ['sol', 'âge', 'vieux', 'retrouvent', 'histoires', 'abattre', 'signé', 'déviée', 'symbole', 'facilement', 'poisson'],
    ['vieux', 'âge', 'sol', 'retrouvent', 'histoires', 'facilement', 'abattre', 'signé', 'déviée', 'symbole'],
    ['Devant « banian », il faut un adjectif.', '« quel ___ il a » : le nombre d\'années.', 'Les racines descendent jusqu\'au sol.', 'Sujet « les anciens » : le verbe prend -ent.', 'Les anciens racontent des histoires.', '« grimpent ___ » : il faut un adverbe.', 'Après « a voulu l\' », un infinitif : couper l\'arbre.', 'On signe une pétition.', 'Accord avec « la route » : féminin singulier.', 'Ce que l\'arbre représente pour le village.']);

  add(5, 'La course de char à bœufs',
    'Autrefois, la course de char à bœufs était le {1} le plus attendu de l\'année. Les paysans {2} leurs bêtes pendant des mois. Le jour venu, la piste était bordée de {3} venus de partout. Chaque char portait les {4} de son village. Au signal, les bœufs s\'élançaient dans un nuage de {5}. Les conducteurs criaient pour les {6}. La course ne durait que quelques {7}, mais la fête continuait toute la journée. Le vainqueur recevait une {8} et beaucoup de félicitations. Aujourd\'hui, cette {9} a presque disparu. Quelques villages essaient pourtant de la faire {10}.',
    ['revivre', 'entraînaient', 'spectateurs', 'événement', 'poussière', 'couleurs', 'encourager', 'minutes', 'coupe', 'tradition', 'bateau'],
    ['événement', 'entraînaient', 'spectateurs', 'couleurs', 'poussière', 'encourager', 'minutes', 'coupe', 'tradition', 'revivre'],
    ['« le ___ le plus attendu » : il faut un nom.', 'Imparfait, sujet « les paysans ».', 'Ceux qui viennent regarder.', 'Chaque char porte les couleurs de son village.', 'Des bœufs qui courent soulèvent la poussière.', 'Après « pour les », un infinitif.', '« quelques ___ » : une courte durée.', 'Le vainqueur reçoit une coupe.', '« cette ___ » : une coutume ancienne.', 'Après « faire », un infinitif.']);

  add(6, 'Monsieur Appadoo',
    'Monsieur Appadoo a été {1} pendant trente-deux ans. Il connaissait le nom de chaque {2} de son secteur. Sa bicyclette verte était {3} de tous. Par temps de pluie, il protégeait les lettres dans un sac en {4}. Il ne s\'est jamais {5} d\'adresse, disait-il fièrement. Quand une famille recevait une lettre de l\'{6}, tout le quartier le savait. Il s\'arrêtait souvent pour {7} un verre d\'eau chez les anciens. Le jour de son départ à la {8}, le village a organisé une fête. On lui a offert une {9} avec son nom gravé. Il en parle encore avec beaucoup d\'{10}.',
    ['plastique', 'habitant', 'facteur', 'connue', 'trompé', 'étranger', 'boire', 'retraite', 'montre', 'émotion', 'poisson'],
    ['facteur', 'habitant', 'connue', 'plastique', 'trompé', 'étranger', 'boire', 'retraite', 'montre', 'émotion'],
    ['Celui qui distribue le courrier.', '« chaque ___ de son secteur » : une personne du village.', 'Accord avec « sa bicyclette » : féminin.', 'Un sac en plastique protège de la pluie.', '« il ne s\'est jamais ___ » : se tromper.', '« une lettre de l\'___ » : d\'un autre pays.', 'Après « pour », un infinitif.', '« son départ à la ___ » : la fin de sa carrière.', 'Un cadeau avec un nom gravé.', '« avec beaucoup d\'___ » : un nom.']);

  add(7, 'Le dodo',
    'Le dodo est l\'{1} le plus célèbre de Maurice. C\'était un oiseau {2} : ses ailes étaient trop petites pour voler. Comme il n\'avait aucun {3} sur l\'île, il n\'avait pas appris à fuir. À l\'arrivée des marins, il s\'approchait d\'eux sans {4}. Les rats et les cochons débarqués des navires ont mangé ses {5}. En moins d\'un siècle, l\'espèce a totalement {6}. Aucun dodo vivant n\'a été vu après {7}. Aujourd\'hui, on ne connaît son apparence que par des dessins et quelques {8}. Il figure sur les {9} de la République de Maurice. Son histoire est un {10} pour tous les pays du monde.',
    ['ennemi', 'coureur', 'animal', 'crainte', 'œufs', 'disparu', 'armoiries', 'os', 'avertissement', '1700', 'chapeau'],
    ['animal', 'coureur', 'ennemi', 'crainte', 'œufs', 'disparu', '1700', 'os', 'armoiries', 'avertissement'],
    ['« l\'___ le plus célèbre » : un nom.', 'Il ne volait pas : c\'était un oiseau coureur.', '« aucun ___ sur l\'île » : personne pour l\'attaquer.', '« sans ___ » : sans peur.', 'Les rats mangent les œufs des oiseaux.', '« l\'espèce a totalement ___ » : participe de disparaître.', '« après ___ » : une date.', 'On connaît le dodo par ses os retrouvés.', 'Le dodo figure sur les armoiries du pays.', 'Une leçon pour l\'avenir : un avertissement.']);

  add(8, 'La rivière polluée',
    'La rivière qui traverse notre village était autrefois très {1}. Les enfants y {2} pendant les vacances. Depuis quelques années, elle est devenue toute {3}. Des sacs et des bouteilles flottent sur l\'{4}. Les poissons ont presque tous {5}. Un groupe d\'élèves a décidé d\'{6}. Chaque samedi, ils ramassent les {7} sur les berges. Ils ont aussi écrit une lettre au {8} du village. « Il ne suffit pas de nettoyer, il faut arrêter de {9} », expliquent-ils. Leur action a déjà donné de bons {10}.',
    ['maire', 'déchets', 'claire', 'eau', 'nageaient', 'sale', 'disparu', 'agir', 'jeter', 'résultats', 'bateau'],
    ['claire', 'nageaient', 'sale', 'eau', 'disparu', 'agir', 'déchets', 'maire', 'jeter', 'résultats'],
    ['Accord avec « la rivière » : féminin.', 'Imparfait, sujet « les enfants ».', '« toute ___ » : le contraire de propre.', 'Ce qui coule dans une rivière.', '« ont presque tous ___ » : participe de disparaître.', 'Après « décidé d\' », un infinitif.', 'Sacs et bouteilles : des déchets.', 'Le responsable élu d\'une commune.', 'Après « arrêter de », un infinitif.', '« de bons ___ » : ce que l\'action a produit.']);

  add(9, 'Les histoires du soir',
    'Chaque soir, grand-mère nous {1} une histoire avant de dormir. Elle éteint la lumière et allume une petite {2}. Sa voix devient {3} et un peu mystérieuse. Elle raconte des contes qu\'elle tient de sa propre {4}. Il y a toujours un roi, une ruse et une {5}. Mon frère et moi n\'osons plus {6}. Quand elle s\'arrête, nous en {7} toujours une autre. « Demain », répond-elle en {8}. Un jour, j\'écrirai tous ses contes dans un {9}. Il ne faut pas que ces histoires se {10}.',
    ['bougie', 'grand-mère', 'raconte', 'basse', 'morale', 'bouger', 'demandons', 'souriant', 'cahier', 'perdent', 'poisson'],
    ['raconte', 'bougie', 'basse', 'grand-mère', 'morale', 'bouger', 'demandons', 'souriant', 'cahier', 'perdent'],
    ['Sujet « grand-mère » : le verbe prend -e.', 'On allume une bougie.', 'Accord avec « sa voix » : féminin.', 'Elle tient ces contes de sa propre grand-mère.', 'Un conte finit par une morale.', 'Après « n\'osons plus », un infinitif.', 'Sujet « nous » : le verbe prend -ons.', 'Après « en », le participe présent.', 'On écrit des histoires dans un cahier.', '« que ces histoires se ___ » : subjonctif de se perdre.']);

  add(10, 'Derrière la cantine',
    'Notre école a créé un {1} derrière la cantine. Chaque classe s\'occupe d\'une petite {2}. Nous y avons planté des tomates, des brèdes et du {3}. Le directeur a fait installer un {4} pour récupérer l\'eau de pluie. Il ne faut jamais arroser en plein {5} : l\'eau s\'évapore. Les légumes récoltés sont {6} à la cantine le vendredi. Ce que nous ne mangeons pas, nous le {7} aux familles du quartier. Le projet nous apprend la {8} et le travail d\'équipe. Certains élèves ont même commencé un potager {9} chez eux. Le jardinage est devenu notre activité {10}.',
    ['réservoir', 'parcelle', 'potager', 'thym', 'soleil', 'cuisinés', 'donnons', 'patience', 'semblable', 'préférée', 'chapeau'],
    ['potager', 'parcelle', 'thym', 'réservoir', 'soleil', 'cuisinés', 'donnons', 'patience', 'semblable', 'préférée'],
    ['Un jardin de légumes est un potager.', 'Chaque classe cultive une petite parcelle.', 'Une herbe qu\'on plante avec les brèdes.', 'On récupère l\'eau de pluie dans un réservoir.', '« en plein ___ » : au moment le plus chaud.', 'Accord avec « les légumes » : masculin pluriel.', 'Sujet « nous » : le verbe prend -ons.', 'Le jardinage apprend la patience.', '« un potager ___ » : du même genre.', 'Accord avec « notre activité » : féminin.']);

  add(11, 'Le premier jour au collège',
    'Ce matin-là, Anaïs a mis son uniforme {1} pour la première fois. Le collège lui paraissait immense par {2} à son ancienne école. Elle a cherché sa salle pendant dix {3} avant de la trouver. Dans la classe, elle ne connaissait {4}. La professeure principale a demandé à chacun de se {5}. Anaïs a parlé trop vite, tellement elle était {6}. À la récréation, une fille est venue lui {7}. Elles ont découvert qu\'elles habitaient le même {8}. Le soir, Anaïs a raconté sa journée à sa mère sans s\'{9}. Finalement, ce collège n\'était pas si {10}.',
    ['comparaison', 'neuf', 'minutes', 'personne', 'présenter', 'quartier', 'nerveuse', 'parler', 'arrêter', 'effrayant', 'poisson'],
    ['neuf', 'comparaison', 'minutes', 'personne', 'présenter', 'nerveuse', 'parler', 'quartier', 'arrêter', 'effrayant'],
    ['Accord avec « son uniforme » : masculin.', '« par ___ à » : l\'expression par comparaison à.', '« pendant dix ___ » : une durée.', '« elle ne connaissait ___ » : la négation.', 'Après « de se », un infinitif.', 'Accord avec « elle » : féminin.', 'Après « venue lui », un infinitif.', 'Elles habitent le même quartier.', 'Après « sans s\' », un infinitif.', '« pas si ___ » : un adjectif.']);

  add(12, 'Le filet coupé',
    'Un pêcheur de Rodrigues remonta un jour une {1} prise dans son filet. Elle était très {2} : sa carapace mesurait presque un mètre. L\'animal se débattait faiblement, {3} de fatigue. Le pêcheur aurait pu la {4} au marché pour beaucoup d\'argent. Mais il pensa à ses {5}, qui n\'en verraient peut-être jamais. Il coupa le filet avec son {6} et la remit à l\'eau. La tortue resta un instant {7}, puis disparut dans le bleu. Le pêcheur rentra les mains {8}, mais le cœur léger. Sa femme ne lui fit aucun {9}. « Tu as bien {10} », lui dit-elle simplement.',
    ['couteau', 'grande', 'tortue', 'épuisée', 'vendre', 'enfants', 'immobile', 'vides', 'reproche', 'fait', 'bateau'],
    ['tortue', 'grande', 'épuisée', 'vendre', 'enfants', 'couteau', 'immobile', 'vides', 'reproche', 'fait'],
    ['L\'animal marin pris dans le filet.', 'Accord avec « elle » : féminin.', 'Accord avec l\'animal (la tortue) : féminin.', 'Après « aurait pu la », un infinitif.', 'Ceux qui n\'en verraient jamais.', 'On coupe un filet avec un couteau.', 'Accord avec « la tortue » : elle ne bouge pas.', 'Accord avec « les mains » : féminin pluriel.', '« aucun ___ » : elle ne le critique pas.', '« Tu as bien ___ » : participe passé de faire.']);

  add(13, 'La sécheresse',
    'Cette année, il n\'a presque pas {1} depuis le mois de mai. Les réservoirs sont descendus à un niveau {2}. Le gouvernement a décidé de {3} l\'eau certains jours. Dans les champs, la canne à sucre est devenue toute {4}. Les agriculteurs regardent le ciel avec {5}. À l\'école, on nous apprend à ne pas {6} l\'eau. « Une douche courte vaut mieux qu\'un {7} plein », répète la maîtresse. Certains villages reçoivent l\'eau par {8}. Tout le monde attend l\'arrivée de la {9} des pluies. On dit qu\'elle pourrait commencer plus {10} que d\'habitude.',
    ['camion', 'inquiétude', 'plu', 'inquiétant', 'couper', 'jaune', 'gaspiller', 'bain', 'saison', 'tard', 'poisson'],
    ['plu', 'inquiétant', 'couper', 'jaune', 'inquiétude', 'gaspiller', 'bain', 'camion', 'saison', 'tard'],
    ['« il n\'a presque pas ___ » : participe de pleuvoir.', 'Accord avec « un niveau » : masculin.', 'Après « décidé de », un infinitif.', 'Accord avec « la canne » : féminin.', '« avec ___ » : un nom qui dit leur sentiment.', 'Après « à ne pas », un infinitif.', 'Le contraire d\'une douche courte.', 'On livre l\'eau par camion.', '« la ___ des pluies » : une période de l\'année.', '« plus ___ que d\'habitude » : un adverbe de temps.']);

  add(14, 'La salle de Curepipe',
    'À Curepipe, il y avait autrefois un {1} très fréquenté. Mon père y allait chaque {2} avec ses cousins. Les billets coûtaient trois {3} à l\'époque. La salle était toujours {4}, surtout pour les films indiens. Quand la lumière s\'éteignait, un silence {5} tombait sur la salle. Les spectateurs applaudissaient à chaque {6} du héros. À l\'entracte, on vendait des cacahuètes et de la {7}. Le cinéma a fermé ses portes en 1998, faute de {8}. Le bâtiment est aujourd\'hui à l\'{9}. Mon père en parle encore avec beaucoup de {10}.',
    ['roupies', 'dimanche', 'cinéma', 'pleine', 'complet', 'victoire', 'limonade', 'clients', 'abandon', 'nostalgie', 'chapeau'],
    ['cinéma', 'dimanche', 'roupies', 'pleine', 'complet', 'victoire', 'limonade', 'clients', 'abandon', 'nostalgie'],
    ['« un ___ très fréquenté » où l\'on voit des films.', '« chaque ___ » : un jour de la semaine.', 'La monnaie de Maurice, au pluriel.', 'Accord avec « la salle » : féminin.', 'Accord avec « un silence » : masculin.', '« à chaque ___ du héros » : un nom.', 'On vend de la limonade à l\'entracte.', '« faute de ___ » : plus personne ne venait.', '« à l\'___ » : plus personne ne s\'en occupe.', '« avec beaucoup de ___ » : le regret du passé.']);

  add(15, 'La classe de madame Bissoon',
    'La classe de madame Bissoon participe chaque année au {1} de dictée. Les élèves s\'entraînent pendant tout le deuxième {2}. Chaque matin, ils écrivent un court {3} sous la dictée. La maîtresse insiste beaucoup sur les {4} du participe passé. « Une virgule oubliée peut vous coûter un {5} », rappelle-t-elle. Le jour du concours, Yash était si nerveux qu\'il a failli {6}. Pourtant, il a écrit sa dictée avec beaucoup de {7}. Il n\'a fait que deux {8} en tout. Il est arrivé {9} sur cent vingt participants. Toute la classe était {10} de lui.',
    ['trimestre', 'concours', 'texte', 'accords', 'point', 'abandonner', 'soin', 'fautes', 'troisième', 'fière', 'bateau'],
    ['concours', 'trimestre', 'texte', 'accords', 'point', 'abandonner', 'soin', 'fautes', 'troisième', 'fière'],
    ['« le ___ de dictée » : une compétition.', 'Une partie de l\'année scolaire.', 'On écrit un texte sous la dictée.', 'Les règles d\'accord du participe passé.', 'Une virgule oubliée coûte un point.', 'Après « a failli », un infinitif.', '« avec beaucoup de ___ » : en faisant attention.', 'Une erreur d\'orthographe est une faute.', 'Sa place sur cent vingt : un nombre ordinal.', 'Accord avec « la classe » : féminin.']);

  add(16, 'Une lettre de Rodrigues',
    'Chère Anjali,\nJe t\'écris depuis Rodrigues, où je passe mes {1} chez mon oncle. L\'île est beaucoup plus {2} que Maurice, et bien plus calme. Il n\'y a presque pas de {3} sur les routes. Les gens se déplacent à pied ou en {4}. Ce matin, nous sommes allés à l\'île aux Cocos en {5}. J\'ai vu des oiseaux que je n\'avais {6} vus auparavant. Tante Marie m\'a fait goûter des {7} au piment, une spécialité d\'ici. Le soir, on entend seulement le {8} de la mer. Je rentre {9} prochain. Je te raconterai tout en {10}.\nTon amie, Sarita',
    ['bateau', 'petite', 'vacances', 'voitures', 'camionnette', 'jamais', 'ourites', 'bruit', 'lundi', 'détail', 'chapeau'],
    ['vacances', 'petite', 'voitures', 'camionnette', 'bateau', 'jamais', 'ourites', 'bruit', 'lundi', 'détail'],
    ['« je passe mes ___ » : la période de repos.', 'Accord avec « l\'île » : féminin.', 'Ce qui circule sur les routes.', 'On se déplace à pied ou en camionnette.', 'On va à l\'île aux Cocos en bateau.', '« je n\'avais ___ vus » : la négation.', 'Une spécialité de Rodrigues, au pluriel.', '« seulement le ___ de la mer » : un nom.', '« Je rentre ___ prochain » : un jour.', '« en ___ » : l\'expression en détail.']);

  add(17, 'La première expérience',
    'Notre nouveau {1} de sciences a ouvert le mois dernier. Avant d\'entrer, il faut mettre une {2} blanche et des lunettes. Le professeur nous a d\'abord expliqué les règles de {3}. « Ne touchez à rien sans ma {4} », a-t-il insisté. Notre première expérience était de faire {5} de l\'eau. Nous avons mesuré la {6} toutes les deux minutes. Quand l\'eau a atteint cent {7}, elle s\'est mise à bouillir. Nous avons noté nos résultats dans un {8}. Ensuite, chaque groupe a présenté ses {9} devant la classe. Cette leçon m\'a donné envie de devenir {10}.',
    ['blouse', 'laboratoire', 'sécurité', 'permission', 'chauffer', 'température', 'degrés', 'tableau', 'conclusions', 'scientifique', 'poisson'],
    ['laboratoire', 'blouse', 'sécurité', 'permission', 'chauffer', 'température', 'degrés', 'tableau', 'conclusions', 'scientifique'],
    ['La salle où on fait des expériences.', 'On met une blouse blanche.', 'Les règles de sécurité.', '« sans ma ___ » : sans mon accord.', 'Après « faire », un infinitif.', 'On mesure la température de l\'eau.', 'L\'eau bout à cent degrés.', 'On note les résultats dans un tableau.', 'Chaque groupe présente ses conclusions.', '« devenir ___ » : le métier.']);

  add(18, 'Le marchand de gâteaux-piments',
    'Tous les matins, monsieur Louis installe sa {1} au coin de la rue. Il prépare ses gâteaux-piments dès quatre heures du {2}. La pâte doit reposer toute la {3} avant d\'être frite. Il utilise des pois cassés trempés et beaucoup de {4} vert. L\'{5} attire les passants de très loin. À sept heures, une longue {6} s\'est déjà formée. Les enfants en achètent avant d\'aller à l\'{7}. Monsieur Louis vend tout avant {8}. « Le secret, c\'est de ne jamais {9} la qualité », dit-il. Il exerce ce métier depuis vingt-cinq {10}.',
    ['matin', 'charrette', 'nuit', 'piment', 'odeur', 'file', 'école', 'midi', 'changer', 'ans', 'bateau'],
    ['charrette', 'matin', 'nuit', 'piment', 'odeur', 'file', 'école', 'midi', 'changer', 'ans'],
    ['Un marchand de rue installe sa charrette.', '« quatre heures du ___ » : très tôt.', 'La pâte repose toute la nuit.', 'Des gâteaux-piments contiennent du piment.', 'Ce qui attire les passants de loin.', '« une longue ___ » : les gens qui attendent.', 'Les enfants y vont le matin.', '« avant ___ » : le milieu de la journée.', 'Après « ne jamais », un infinitif.', '« vingt-cinq ___ » : la durée.']);

  add(19, 'Samedi à Mahébourg',
    'Samedi dernier, notre club a participé à une {1} de mangroves à Mahébourg. Ces arbres poussent les pieds dans l\'eau {2}. Leurs racines retiennent la {3} et protègent la côte. Elles servent aussi de {4} aux jeunes poissons. Un biologiste nous a montré comment {5} les jeunes plants. Il fallait les enfoncer à la bonne {6}, ni trop ni pas assez. Nous avions de la boue jusqu\'aux {7}. En trois heures, nous en avons planté plus de deux {8}. Le biologiste a expliqué qu\'il faudrait revenir les {9} l\'an prochain. Protéger la côte est devenu une {10} pour tout le club.',
    ['vase', 'salée', 'plantation', 'abri', 'planter', 'profondeur', 'genoux', 'cents', 'compter', 'priorité', 'chapeau'],
    ['plantation', 'salée', 'vase', 'abri', 'planter', 'profondeur', 'genoux', 'cents', 'compter', 'priorité'],
    ['« une ___ de mangroves » : l\'action de planter.', 'Accord avec « l\'eau » : féminin.', 'Les racines retiennent la vase du littoral.', 'Les mangroves servent d\'abri aux poissons.', 'Après « comment », un infinitif.', '« à la bonne ___ » : ni trop ni pas assez profond.', 'La boue montait jusqu\'aux genoux.', '« plus de deux ___ » : deux cents plants.', 'Après « revenir les », un infinitif.', '« une ___ » : ce qui passe avant tout.']);

  add(20, 'Un samedi sur la plage',
    'Notre village organise chaque année un grand {1} de la plage. Cette fois, plus de deux cents {2} sont venus aider. On nous a distribué des gants et des sacs {3}. En deux heures, nous avons rempli quarante {4}. Le plus surprenant était la {5} de bouteilles en plastique. Un pêcheur nous a raconté qu\'il en trouve dans ses {6} chaque semaine. Les organisateurs ont ensuite {7} les déchets pour le recyclage. Une camionnette est venue les {8} en fin de journée. Le maire a remercié tous les {9} dans un petit discours. Il a promis que l\'opération serait {10} en décembre.',
    ['sacs', 'volontaires', 'nettoyage', 'poubelle', 'quantité', 'filets', 'trié', 'emporter', 'participants', 'répétée', 'poisson'],
    ['nettoyage', 'volontaires', 'poubelle', 'sacs', 'quantité', 'filets', 'trié', 'emporter', 'participants', 'répétée'],
    ['« un grand ___ de la plage » : l\'action de nettoyer.', 'Ceux qui viennent aider sans être payés.', '« des sacs ___ » : des sacs à déchets.', 'On a rempli quarante sacs.', '« la ___ de bouteilles » : combien il y en avait.', 'Un pêcheur trouve du plastique dans ses filets.', 'Participe passé : séparer les déchets.', 'Après « venue les », un infinitif.', 'Ceux qui ont participé.', 'Accord avec « l\'opération » : féminin.']);
})();
