'use strict';
// Grade 5 French - profondeur pour « Description d'Images ».
//
// WHY THIS FILE EXISTS
// examWeight is now set from the 2025 Grade 5 paper (see the block above
// `chapters:` in _manifest.js). Q8 - écrire une histoire d'après des images -
// is 15 marks of 100, so fr-images now supplies 6 questions of every
// 40-question exam from a pool of 20. Three mock exams and the chapter was
// used up: the thinnest pool in the whole repo. Measured 2026-09-08.
//
// ⚠ The existing 20 items each carry a PHOTOGRAPH inside the question and ask
//   what can be seen in it. These 40 deliberately do not: the artwork for them
//   does not exist in this repo, and an item that says « Observe l'image » with
//   no image is broken. They train the same exam skill without one - the words
//   used to describe a scene, and the connectives and tenses used to tell a
//   story from a series of pictures, which is exactly what Q8 asks a child to
//   produce. They are tagged `decrire` and `raconter`, two new subsections
//   declared in _manifest.js, rather than being forced into the image ones.
//
// ⚠ Les options sont écrites RÉPONSE EN PREMIER uniquement pour que l'item soit
//   facile à relire : options[0] est toujours la bonne réponse. Cela ne décide
//   PAS de sa place à l'écran - makeMCQ() mélange lui-même les options
//   (engine/helpers.js). Ce qui compte, c'est que les quatre options aient la
//   même forme et la même longueur.

(function () {
  let n = 0;
  const q = (subsection, difficulty, question, options, hint, explanation) => {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g5fr-dep-${String(n).padStart(3, '0')}`,
      chapterId: 'fr-images', subsection, difficulty, question,
      options,
      answer: options[0], hint, explanation
    }));
  };

  // ══ decrire - le vocabulaire pour décrire une scène (20) ════════════════
  q('decrire', 1, 'Pour dire OÙ se passe une scène, on commence souvent par ...',
    ['« La scène se passe ... »', '« Le garçon court ... »', '« Il fait beau ... »', '« Enfin, tout ... »'],
    'On situe le lieu avant de raconter.',
    'On situe d\'abord le lieu : <b>« La scène se passe à la plage. »</b>');
  q('decrire', 1, 'Quel mot désigne le lieu d\'une scène au bord de la mer ?',
    ['la plage', 'la cuisine', 'la salle', 'le couloir'],
    'Regarde où il y a du sable.',
    'Au bord de la mer on est sur <b>la plage</b>, avec le sable et les vagues.');
  q('decrire', 1, 'Quel mot désigne le lieu où l\'on achète des légumes ?',
    ['le marché', 'le stade', 'le musée', 'le bureau'],
    'C\'est là que les marchands installent leurs étals.',
    'On achète des légumes au <b>marché</b>, chez le marchand de légumes.');
  q('decrire', 2, 'Complète : « Au premier plan, on voit ................ . »',
    ['un enfant qui court', 'il fait très chaud', 'depuis ce matin', 'parce qu\'il pleut'],
    'Après « on voit » il faut un groupe du nom.',
    'Après <i>on voit</i> il faut un nom : <b>on voit un enfant qui court</b>.');
  q('decrire', 2, 'Que veut dire « à l\'arrière-plan » ?',
    ['au fond de l\'image', 'devant l\'image', 'à côté du cadre', 'sous la photo'],
    'C\'est le contraire du premier plan.',
    '<b>À l\'arrière-plan</b> veut dire au fond de l\'image, derrière ce qui est le plus près.');
  q('decrire', 2, 'Quelle phrase décrit le temps qu\'il fait ?',
    ['Le ciel est gris et couvert.', 'Le garçon porte un sac.', 'La maison est en bois.', 'Le chien dort par terre.'],
    'Cherche la phrase qui parle du ciel.',
    '<b>Le ciel est gris et couvert</b> décrit le temps ; les autres décrivent des personnes ou des objets.');
  q('decrire', 2, 'Quel adjectif décrit le mieux un marché plein de monde ?',
    ['animé', 'désert', 'vide', 'fermé'],
    'Il y a beaucoup de personnes.',
    'Un marché plein de monde est <b>animé</b>. « Désert » et « vide » veulent dire le contraire.');
  q('decrire', 2, 'Quel verbe convient : « Le vendeur ................ ses fruits. »',
    ['vend', 'mange', 'dort', 'nage'],
    'Que fait un vendeur ?',
    'Un vendeur <b>vend</b> ses marchandises.');
  q('decrire', 2, 'Quelle phrase décrit une personne ?',
    ['Elle porte une robe rouge.', 'Il y a trois maisons.', 'Le soleil brille fort.', 'La rue est très large.'],
    'Cherche celle qui parle de quelqu\'un.',
    '<b>Elle porte une robe rouge</b> décrit une personne ; les autres décrivent le décor.');
  q('decrire', 2, 'Pour décrire une image, on emploie surtout le ...',
    ['présent', 'passé simple', 'plus-que-parfait', 'conditionnel'],
    'On décrit ce que l\'on voit maintenant.',
    'On décrit une image au <b>présent</b> : « on voit », « il porte », « le ciel est bleu ».');
  q('decrire', 2, 'Quelle expression sert à situer quelque chose entre deux objets ?',
    ['entre', 'derrière', 'devant', 'sous'],
    'Il y a un objet de chaque côté.',
    '<b>Entre</b> place une chose au milieu de deux autres : « la table est entre les deux chaises ».');
  q('decrire', 2, 'Quel mot complète : « Le chat est ................ la table. » (le chat n\'est pas visible dessus)',
    ['sous', 'sur', 'dans', 'vers'],
    'Il est caché en dessous.',
    'Le chat est <b>sous</b> la table, donc au-dessous d\'elle.');
  q('decrire', 3, 'Quelle phrase est la plus précise pour décrire une image ?',
    ['Une fillette arrose des fleurs.', 'Il y a une personne.', 'C\'est une belle image.', 'On voit quelque chose.'],
    'La meilleure description donne des détails.',
    '<b>Une fillette arrose des fleurs</b> dit qui, quoi et quelle action. Les autres ne donnent aucun détail.');
  q('decrire', 3, 'Comment éviter de répéter « il y a » dans une description ?',
    ['Employer « on voit » ou « on aperçoit »', 'Employer « il y a » deux fois', 'Ne rien écrire du tout', 'Employer seulement des adjectifs'],
    'Il faut varier les tournures.',
    'On varie avec <b>« on voit », « on aperçoit », « on remarque »</b>, ce qui rend le texte plus riche.');
  q('decrire', 3, 'Quel adjectif décrit le mieux une personne qui n\'est pas contente ?',
    ['furieuse', 'joyeuse', 'ravie', 'contente'],
    'Cherche le sentiment négatif.',
    'Une personne mécontente est <b>furieuse</b>, c\'est-à-dire très en colère.');
  q('decrire', 3, 'Complète : « Les enfants jouent ................ dans la cour. »',
    ['joyeusement', 'joyeux', 'la joie', 'joyeuse'],
    'Il faut un mot qui dit COMMENT ils jouent.',
    'Après un verbe on emploie un adverbe : <b>joyeusement</b>.');
  q('decrire', 3, 'Quelle phrase décrit un bruit ?',
    ['On entend le bruit des vagues.', 'Le sable est très chaud.', 'Le ciel est tout bleu.', 'Les arbres sont hauts.'],
    'Cherche le verbe « entendre ».',
    '<b>On entend le bruit des vagues</b> décrit un son ; les autres décrivent ce que l\'on voit ou ce que l\'on touche.');
  q('decrire', 3, 'Pour décrire un vêtement, on emploie le verbe ...',
    ['porter', 'manger', 'courir', 'ouvrir'],
    'Que fait-on avec une chemise ?',
    'On dit qu\'une personne <b>porte</b> un vêtement : « il porte une chemise bleue ».');
  q('decrire', 3, 'Quelle phrase donne une impression générale de l\'image ?',
    ['L\'ambiance est joyeuse.', 'Il porte un chapeau.', 'La table est ronde.', 'Le chien est noir.'],
    'Cherche la phrase qui parle de l\'ensemble.',
    '<b>L\'ambiance est joyeuse</b> parle de l\'image entière ; les autres décrivent un détail.');
  q('decrire', 3, 'Dans une description, l\'adjectif « immense » veut dire ...',
    ['très grand', 'très petit', 'très vieux', 'très propre'],
    'Pense à la mer ou au ciel.',
    '<b>Immense</b> veut dire très grand, beaucoup plus grand que la normale.');

  // ══ raconter - construire l'histoire des images (20) ════════════════════
  q('raconter', 1, 'Quel connecteur commence une histoire en images ?',
    ['D\'abord', 'Enfin', 'Ensuite', 'Finalement'],
    'C\'est la toute première étape.',
    'On commence par <b>D\'abord</b>, puis on emploie « Ensuite », « Puis » et « Enfin ».');
  q('raconter', 1, 'Quel connecteur termine une histoire ?',
    ['Enfin', 'D\'abord', 'Ensuite', 'Puis'],
    'C\'est la dernière image.',
    'On termine par <b>Enfin</b> ou « Finalement », qui annoncent la fin de l\'histoire.');
  q('raconter', 1, 'Quel connecteur relie la deuxième image à la première ?',
    ['Ensuite', 'D\'abord', 'Enfin', 'Au début'],
    'C\'est l\'étape du milieu.',
    '<b>Ensuite</b>, ou « Puis », relie une image à la suivante.');
  q('raconter', 2, 'Mets dans l\'ordre : « Enfin, ils rentrent. » / « D\'abord, ils partent. » / « Ensuite, ils jouent. »',
    ['partent, jouent, rentrent', 'jouent, partent, rentrent', 'rentrent, jouent, partent', 'jouent, rentrent, partent'],
    'Suis les connecteurs.',
    'Les connecteurs donnent l\'ordre : d\'abord ils <b>partent</b>, ensuite ils <b>jouent</b>, enfin ils <b>rentrent</b>.');
  q('raconter', 2, 'Quel temps emploie-t-on surtout pour raconter une histoire au passé ?',
    ['Le passé composé', 'Le futur simple', 'Le conditionnel', 'Le subjonctif'],
    'On raconte des actions terminées.',
    'On raconte les actions terminées au <b>passé composé</b> : « il a cassé la vitre ».');
  q('raconter', 2, 'Quel temps décrit le décor d\'une histoire au passé ?',
    ['L\'imparfait', 'Le futur simple', 'Le passé simple', 'Le conditionnel'],
    'On plante le décor, on ne raconte pas une action.',
    'L\'<b>imparfait</b> décrit le décor : « il faisait beau, les enfants jouaient dans la cour ».');
  q('raconter', 2, 'Complète : « Hier, Paul ................ au football avec ses amis. »',
    ['a joué', 'joue', 'jouera', 'jouerait'],
    '« Hier » indique le passé.',
    'Une action terminée hier se met au passé composé : <b>a joué</b>.');
  q('raconter', 2, 'Complète : « Pendant qu\'il pleuvait, les enfants ................ à la maison. »',
    ['restaient', 'resteront', 'resteraient', 'restent'],
    'Les deux actions durent en même temps.',
    'Deux actions qui durent ensemble se mettent à l\'imparfait : <b>restaient</b>.');
  q('raconter', 2, 'Quelle phrase raconte une action ?',
    ['Le ballon a cassé la vitre.', 'Le ciel était tout bleu.', 'La maison est blanche.', 'Il faisait très chaud.'],
    'Cherche ce qui se passe, pas ce qui est.',
    '<b>Le ballon a cassé la vitre</b> raconte une action. Les autres décrivent le décor.');
  q('raconter', 2, 'Quel mot indique la cause dans une histoire ?',
    ['parce que', 'ensuite', 'd\'abord', 'enfin'],
    'Il répond à la question « pourquoi ? ».',
    '<b>Parce que</b> introduit la cause : « il a pleuré parce qu\'il avait peur ».');
  q('raconter', 2, 'Quel mot indique la conséquence dans une histoire ?',
    ['donc', 'parce que', 'pendant', 'malgré'],
    'Il annonce le résultat.',
    '<b>Donc</b> introduit la conséquence : « la vitre était cassée, donc la voisine s\'est fâchée ».');
  q('raconter', 3, 'Une histoire en images doit avoir ...',
    ['un début, un milieu et une fin', 'seulement une fin', 'seulement un début', 'trois fins différentes'],
    'Pense aux trois images.',
    'Une histoire complète a <b>un début, un milieu et une fin</b>, une partie pour chaque image.');
  q('raconter', 3, 'Complète : « Le garçon a tiré fort ; ................ , la vitre s\'est cassée. »',
    ['soudain', 'lentement', 'peut-être', 'souvent'],
    'L\'action est brusque.',
    '<b>Soudain</b> marque une action brusque et inattendue, ce qui convient à un accident.');
  q('raconter', 3, 'Comment nommer les personnages d\'une histoire pour éviter les répétitions ?',
    ['Par des pronoms : il, elle', 'En répétant le nom partout', 'En les appelant « la chose »', 'En ne les nommant jamais'],
    'On remplace le nom déjà employé.',
    'On emploie <b>des pronoms : il, elle, ils</b>, une fois que le personnage a été nommé.');
  q('raconter', 3, 'Quelle phrase termine le mieux une histoire ?',
    ['Depuis ce jour, il est prudent.', 'Il était une fois un garçon.', 'D\'abord, il a pris le ballon.', 'La maison était grande.'],
    'Une bonne fin tire une leçon ou clôt l\'action.',
    '<b>Depuis ce jour, il est prudent</b> clôt l\'histoire et en tire la leçon.');
  q('raconter', 3, 'Dans « la voisine furieuse a grondé le garçon », qui a grondé ?',
    ['La voisine', 'Le garçon', 'Le ballon', 'La vitre'],
    'Cherche le sujet du verbe.',
    'Le sujet du verbe <i>a grondé</i> est <b>la voisine</b> ; le garçon est celui qui a été grondé.');
  q('raconter', 3, 'Quel connecteur indique que deux actions se passent en même temps ?',
    ['pendant que', 'ensuite', 'enfin', 'après'],
    'Les deux actions sont simultanées.',
    '<b>Pendant que</b> montre que deux actions se déroulent en même temps.');
  q('raconter', 3, 'Complète : « ................ avoir cassé la vitre, il s\'est enfui. »',
    ['Après', 'Pendant', 'Avant', 'Depuis'],
    'La fuite vient en second.',
    '<b>Après avoir cassé la vitre</b>, il s\'est enfui : la fuite suit l\'accident.');
  q('raconter', 3, 'Pour écrire une histoire d\'environ dix lignes, il vaut mieux ...',
    ['faire un plan des images', 'écrire sans réfléchir', 'copier le titre partout', 'compter les lettres'],
    'On organise avant d\'écrire.',
    '<b>Faire un plan des images</b> aide à écrire une phrase ou deux par image, dans le bon ordre.');
  q('raconter', 3, 'Dans une histoire, quel mot annonce un événement inattendu ?',
    ['tout à coup', 'comme d\'habitude', 'chaque matin', 'tous les jours'],
    'Cherche ce qui rompt la routine.',
    '<b>Tout à coup</b> annonce un événement soudain, alors que les autres expriment l\'habitude.');

})();
