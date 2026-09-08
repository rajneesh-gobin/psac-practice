'use strict';
// Grade 6 French - profondeur pour « Description d'Images » et l'argumentation.
//
// WHY THIS FILE EXISTS
// examWeight is now set from the 2024 paper (see the block above `chapters:` in
// _manifest.js). Q8A - l'histoire en images, 6 points - and Q9 - la rédaction,
// 10 points - mean g6fr-images supplies 3 questions of every 40-question exam
// from a pool of 20, and g6fr-argumentation 4 from a pool of 35. Six and eight
// mock exams and both chapters were used up. Measured 2026-09-08.
//
// ⚠ Comme dans le pack de 5e, les items existants de g6fr-images portent une
//   PHOTOGRAPHIE dans la question. Ceux-ci n'en ont pas - l'illustration
//   n'existe pas dans ce dépôt, et « Observe l'image » sans image est un item
//   cassé. Ils travaillent la même compétence sans photo, et sont rangés dans
//   `decrire` et `raconter`, deux sous-sections déclarées dans _manifest.js.

(function () {
  let n = 0;
  const q = (chapterId, subsection, difficulty, question, options, hint, explanation) => {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g6fr-dep-${String(n).padStart(3, '0')}`,
      chapterId, subsection, difficulty, question,
      options,
      answer: options[0], hint, explanation
    }));
  };

  // ══ g6fr-images (10) ════════════════════════════════════════════════════
  q('g6fr-images', 'decrire', 2, 'Pour situer la scène d\'une image, on écrit d\'abord ...',
    ['où et quand elle se passe', 'ce que l\'on préfère', 'le nom du photographe', 'le nombre de couleurs'],
    'Le lecteur doit d\'abord se repérer.',
    'On commence par dire <b>où et quand</b> la scène se passe, avant de décrire les personnages.');
  q('g6fr-images', 'decrire', 2, 'Quelle phrase décrit le mieux une scène de plage ?',
    ['Des enfants courent sur le sable.', 'C\'est une très belle image.', 'Il y a beaucoup de choses.', 'On voit quelque chose là.'],
    'La bonne description donne des détails précis.',
    '<b>Des enfants courent sur le sable</b> précise qui, quoi et où ; les autres ne disent rien de la scène.');
  q('g6fr-images', 'decrire', 2, 'Quel groupe de mots situe une personne au fond de l\'image ?',
    ['à l\'arrière-plan', 'au premier plan', 'devant nous', 'juste ici'],
    'C\'est le contraire du premier plan.',
    '<b>À l\'arrière-plan</b> désigne ce qui se trouve au fond de l\'image.');
  q('g6fr-images', 'decrire', 3, 'Quel adverbe complète : « La vieille dame marche ................ . »',
    ['lentement', 'lente', 'lenteur', 'ralentir'],
    'Après un verbe, il faut un adverbe.',
    'Un adverbe de manière se termine souvent par -ment : <b>lentement</b>.');
  q('g6fr-images', 'decrire', 3, 'Quelle phrase exprime une impression et non un détail ?',
    ['L\'atmosphère est paisible.', 'L\'homme porte un chapeau.', 'Le banc est en bois.', 'Il y a quatre arbres.'],
    'Cherche ce qui parle de l\'ensemble.',
    '<b>L\'atmosphère est paisible</b> donne une impression générale ; les autres relèvent un détail précis.');
  q('g6fr-images', 'raconter', 2, 'Dans quel ordre emploie-t-on ces connecteurs ?',
    ['D\'abord, ensuite, enfin', 'Enfin, d\'abord, ensuite', 'Ensuite, enfin, d\'abord', 'Enfin, ensuite, d\'abord'],
    'Suis le déroulement de l\'histoire.',
    'L\'ordre est <b>d\'abord, ensuite, enfin</b> : un connecteur par image.');
  q('g6fr-images', 'raconter', 2, 'Pour raconter une histoire en images au passé, on emploie surtout ...',
    ['le passé composé', 'le futur simple', 'le conditionnel', 'le subjonctif'],
    'Les actions sont terminées.',
    'Les actions terminées se racontent au <b>passé composé</b> ; l\'imparfait sert à décrire le décor.');
  q('g6fr-images', 'raconter', 3, 'Complète : « ................ , la voisine est sortie de sa maison. »',
    ['Tout à coup', 'Comme toujours', 'Chaque matin', 'Tous les jours'],
    'L\'événement est brusque.',
    '<b>Tout à coup</b> annonce un événement soudain ; les autres expriment une habitude.');
  q('g6fr-images', 'raconter', 3, 'Quelle phrase conclut le mieux une histoire en images ?',
    ['Depuis, il fait attention.', 'Il était une fois un garçon.', 'D\'abord, il a pris le ballon.', 'La maison était très grande.'],
    'La conclusion vient après tout le reste.',
    '<b>Depuis, il fait attention</b> ferme l\'histoire et en tire la leçon.');
  q('g6fr-images', 'raconter', 3, 'Pourquoi faut-il varier les connecteurs dans un récit ?',
    ['Pour éviter les répétitions', 'Pour allonger le texte', 'Pour cacher la fin', 'Pour changer de sujet'],
    'Un même mot répété lasse le lecteur.',
    'Varier les connecteurs <b>évite les répétitions</b> et rend le récit plus agréable à lire.');

  // ══ g6fr-argumentation (5) ══════════════════════════════════════════════
  q('g6fr-argumentation', 'opinion', 2, 'Quelle expression annonce une opinion personnelle ?',
    ['À mon avis', 'Il est six heures', 'La table est ronde', 'Le train arrive'],
    'Cherche qui parle.',
    '<b>À mon avis</b> annonce ce que l\'on pense soi-même, comme « selon moi » ou « je crois que ».');
  q('g6fr-argumentation', 'connecteurs', 2, 'Quel connecteur introduit un argument contraire ?',
    ['Cependant', 'De plus', 'D\'abord', 'Ainsi'],
    'Il annonce une objection.',
    '<b>Cependant</b>, comme « pourtant » ou « en revanche », introduit une idée qui s\'oppose à la précédente.');
  q('g6fr-argumentation', 'connecteurs', 2, 'Quel connecteur ajoute un argument dans le même sens ?',
    ['De plus', 'Cependant', 'Pourtant', 'En revanche'],
    'Il renforce ce qui vient d\'être dit.',
    '<b>De plus</b>, comme « en outre » ou « par ailleurs », ajoute un argument qui va dans le même sens.');
  q('g6fr-argumentation', 'structure', 3, 'Un texte argumentatif se termine par ...',
    ['une conclusion', 'une nouvelle idée', 'une longue liste', 'une question sans réponse'],
    'Il faut refermer le raisonnement.',
    'Un texte argumentatif se termine par <b>une conclusion</b> qui reprend la thèse et la résume.');
  q('g6fr-argumentation', 'arguments', 3, 'Qu\'est-ce qui rend un argument plus convaincant ?',
    ['Un exemple précis', 'Une phrase très longue', 'Un mot difficile', 'Une répétition'],
    'Le lecteur doit pouvoir se représenter la chose.',
    '<b>Un exemple précis</b> montre que l\'argument tient : il rend l\'idée concrète pour le lecteur.');

})();
