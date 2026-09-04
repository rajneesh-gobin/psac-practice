'use strict';
(function () {
  const add = (id, chapterId, subsection, question, options, answer, hint, explanation) => STATIC_QUESTIONS.push(makeMCQ({ id, chapterId, subsection, difficulty: 2, question, options, answer, hint, explanation }));
  const rows = (prefix, chapterId, subsection, data, options, hint, explanation) => data.forEach(([question, answer], i) => add(`g4fr-cov-${prefix}-${i}`, chapterId, subsection, question, options, answer, hint, explanation(answer)));

  rows('vs', 'g4fr-imparfait', 'vs_passe_comp', [
    ['Hier, pendant que je ___ (lire), le téléphone a sonné.', 'lisais'], ['Chaque été, nous ___ (aller) à la mer.', 'allions'],
    ['Soudain, le chien ___ (aboyer).', 'a aboyé'], ['Avant, Lina ___ (habiter) à Port-Louis.', 'habitait'],
    ['Tous les soirs, papa ___ (raconter) une histoire.', 'racontait'], ['Quand il était petit, Sami ___ (jouer) au football.', 'jouait'],
    ['Tout à coup, la pluie ___ (commencer).', 'a commencé'], ['Le soleil ___ (briller) quand nous sommes sortis.', 'brillait'],
    ['Hier, nous ___ (finir) le puzzle.', 'avons fini'], ['Chaque matin, je ___ (prendre) le bus.', 'prenais'],
    ['Pendant que maman cuisinait, je ___ (mettre) la table.', 'mettais'], ['Un jour, elle ___ (trouver) une coquille rare.', 'a trouvé'],
    ['La mer ___ (être) calme ce matin-là.', 'était'], ['La semaine dernière, vous ___ (visiter) le musée.', 'avez visité'],
    ['Quand nous étions jeunes, nous ___ (aimer) danser.', 'aimions'], ['Soudain, le ballon ___ (tomber) dans l’eau.', 'est tombé'],
    ['Tous les dimanches, ils ___ (rendre) visite à grand-mère.', 'rendaient'], ['Hier soir, tu ___ (regarder) un film.', 'as regardé'],
    ['Il ___ (faire) beau et les oiseaux chantaient.', 'faisait']
  ], ['lisais', 'allions', 'a aboyé', 'habitait', 'racontait', 'jouait', 'a commencé', 'brillait', 'avons fini', 'prenais', 'mettais', 'a trouvé', 'était', 'avez visité', 'aimions', 'est tombé', 'rendaient', 'as regardé', 'faisait'], 'Une habitude, une description ou une action en cours prend souvent l’imparfait.', a => `La forme correcte est <b>${a}</b>.`);

  rows('term', 'g4fr-imparfait', 'terminaisons', [
    ['Je parl___ avec mon ami.', 'ais'], ['Tu finiss___ ton dessin.', 'ais'], ['Il regard___ la mer.', 'ait'], ['Nous jou___ dans la cour.', 'ions'],
    ['Vous chant___ très bien.', 'iez'], ['Elles dans___ ensemble.', 'aient'], ['Je choisiss___ un livre.', 'ais'], ['Tu pren___ le bus.', 'ais'],
    ['Elle ét___ contente.', 'ait'], ['Nous rang___ la classe.', 'ions'], ['Vous av___ faim.', 'iez'], ['Ils regard___ les étoiles.', 'aient'],
    ['Je march___ vers l’école.', 'ais'], ['Tu écout___ la radio.', 'ais'], ['On prépar___ un gâteau.', 'ait'], ['Nous finiss___ tôt.', 'ions'],
    ['Vous lis___ le journal.', 'iez'], ['Les enfants jou___ dehors.', 'aient']
  ], ['ais', 'ait', 'ions', 'iez', 'aient'], 'Les terminaisons de l’imparfait sont -ais, -ais, -ait, -ions, -iez, -aient.', a => `Ici, la terminaison est <b>-${a}</b>.`);

  [
    ['Quel indice indique souvent l’imparfait ?', 'Chaque jour', ['Soudain', 'Tout à coup', 'Un jour']],
    ['Quel indice indique souvent l’imparfait ?', 'Souvent', ['Soudain', 'Hier à midi', 'Tout à coup']],
    ['Quel indice indique souvent l’imparfait ?', 'Quand j’étais petit', ['Tout à coup', 'Un jour', 'Soudain']],
    ['L’imparfait sert surtout à décrire…', 'une habitude dans le passé', ['une action soudaine', 'un ordre', 'un projet futur']],
    ['L’imparfait peut décrire…', 'le temps qu’il faisait', ['un ordre', 'un projet futur', 'une action soudaine']],
    ['Dans « Je lisais quand il est entré », « lisais » exprime…', 'une action en cours', ['une action soudaine', 'un ordre', 'une action future']],
    ['Quel groupe convient avec l’imparfait ?', 'Tous les soirs', ['Soudain', 'Tout à coup', 'Hier à midi']],
    ['Dans « La mer était calme », l’imparfait décrit…', 'une situation', ['un ordre', 'une action soudaine', 'un projet futur']],
    ['Dans « Nous jouions souvent », l’imparfait exprime…', 'une habitude', ['un ordre', 'une action soudaine', 'une action future']],
    ['Quel mot n’indique pas forcément l’imparfait ?', 'Soudain', ['Chaque jour', 'Souvent', 'Tous les soirs']],
    ['Dans « Il faisait chaud », l’imparfait sert à…', 'décrire le temps', ['donner un ordre', 'annoncer le futur', 'raconter une action soudaine']],
    ['Avant, elle habitait ici. « habitait » indique…', 'une situation passée', ['un ordre', 'une action future', 'une action soudaine']],
    ['Quand j’étais jeune, je nageais. « nageais » indique…', 'une habitude passée', ['un ordre', 'une action future', 'une action soudaine']],
    ['L’imparfait est utile pour raconter…', 'le décor d’une histoire', ['le futur', 'un ordre', 'une seule action rapide']],
    ['Dans « Les oiseaux chantaient », l’action est…', 'en cours dans le passé', ['terminée en un instant', 'dans le futur', 'un ordre']]
  ].forEach(([question, answer, wrong], i) => add(`g4fr-cov-usage-${i}`, 'g4fr-imparfait', 'usage', question,
    [answer].concat(wrong), answer, 'Pense aux habitudes, descriptions et actions en cours.', `La bonne idée est <b>${answer}</b>.`));

  rows('fact', 'g4fr-lecture', 'fait_opinion', [
    ['« Maurice est une île de l’océan Indien. » Est-ce un fait ou une opinion ?', 'Un fait'], ['« Les mangues sont les meilleurs fruits. » Est-ce un fait ou une opinion ?', 'Une opinion'],
    ['« Une semaine compte sept jours. » Est-ce un fait ou une opinion ?', 'Un fait'], ['« Le bleu est la plus jolie couleur. » Est-ce un fait ou une opinion ?', 'Une opinion'],
    ['« Les oiseaux ont des plumes. » Est-ce un fait ou une opinion ?', 'Un fait'], ['« Les devoirs sont trop difficiles. » Est-ce un fait ou une opinion ?', 'Une opinion'],
    ['« L’eau peut devenir de la glace. » Est-ce un fait ou une opinion ?', 'Un fait'], ['« Le football est le sport le plus amusant. » Est-ce un fait ou une opinion ?', 'Une opinion'],
    ['« Le soleil est une étoile. » Est-ce un fait ou une opinion ?', 'Un fait'], ['« Les chats sont plus gentils que les chiens. » Est-ce un fait ou une opinion ?', 'Une opinion'],
    ['« Un triangle a trois côtés. » Est-ce un fait ou une opinion ?', 'Un fait'], ['« Les vacances sont trop courtes. » Est-ce un fait ou une opinion ?', 'Une opinion'],
    ['« Les plantes ont besoin d’eau. » Est-ce un fait ou une opinion ?', 'Un fait'], ['« La lecture est plus agréable que la télévision. » Est-ce un fait ou une opinion ?', 'Une opinion'],
    ['« Un kilogramme contient mille grammes. » Est-ce un fait ou une opinion ?', 'Un fait'], ['« Les films drôles sont les meilleurs. » Est-ce un fait ou une opinion ?', 'Une opinion'],
    ['« Les abeilles fabriquent du miel. » Est-ce un fait ou une opinion ?', 'Un fait'], ['« Les maths sont faciles. » Est-ce un fait ou une opinion ?', 'Une opinion'],
    ['« La lune tourne autour de la Terre. » Est-ce un fait ou une opinion ?', 'Un fait']
  ], ['Un fait', 'Une opinion'], 'Un fait peut être vérifié; une opinion exprime ce que quelqu’un pense.', a => `<b>${a}</b> est la bonne réponse.`);

  [
    ['Le mot « d’abord » annonce…', 'la première étape', ['la fin', 'une opposition', 'un exemple']],
    ['Le mot « ensuite » annonce…', 'la suite', ['la première étape', 'une opposition', 'une raison']],
    ['Le mot « enfin » annonce…', 'la dernière étape', ['la première étape', 'une raison', 'une opposition']],
    ['« Parce que » donne souvent…', 'une raison', ['une opposition', 'un exemple', 'la première étape']],
    ['« Mais » montre souvent…', 'une opposition', ['une raison', 'un exemple', 'la suite']],
    ['« Donc » annonce souvent…', 'une conséquence', ['une opposition', 'un exemple', 'la première étape']],
    ['« Puis » veut dire…', 'après', ['avant', 'mais', 'parce que']],
    ['« Cependant » veut dire souvent…', 'mais', ['parce que', 'donc', 'après']],
    ['« Par exemple » introduit…', 'un exemple', ['une raison', 'une opposition', 'une conséquence']],
    ['« Ainsi » peut introduire…', 'une conséquence', ['une opposition', 'une raison', 'la première étape']],
    ['« Pourtant » annonce…', 'une opposition', ['une raison', 'un exemple', 'la suite']],
    ['« Grâce à » explique…', 'une cause positive', ['une opposition', 'un exemple', 'la dernière étape']],
    ['« Après cela » indique…', 'la suite', ['la première étape', 'une raison', 'une opposition']],
    ['« Car » signifie souvent…', 'parce que', ['mais', 'donc', 'après']],
    ['« Finalement » indique…', 'la fin', ['le début', 'une raison', 'une opposition']],
    ['« D’un côté… de l’autre… » aide à…', 'comparer deux idées', ['annoncer la fin', 'donner une raison', 'donner un exemple']],
    ['« En effet » aide à…', 'expliquer une idée', ['comparer deux idées', 'annoncer la fin', 'donner un ordre']]
  ].forEach(([question, answer, wrong], i) => add(`g4fr-cov-conn-${i}`, 'g4fr-lecture', 'connecteurs', question,
    [answer].concat(wrong), answer, 'Un connecteur montre le lien entre les idées.', `La bonne réponse est <b>${answer}</b>.`));

  rows('sens', 'g4fr-lecture', 'vocabulaire', [
    ['Dans « Le chemin est étroit », « étroit » veut dire…', 'pas large'], ['Dans « Le lapin est rapide », « rapide » veut dire…', 'vite'],
    ['Dans « La mer est calme », « calme » veut dire…', 'sans grandes vagues'], ['Dans « Il est affamé », « affamé » veut dire…', 'qui a très faim'],
    ['Dans « Le trésor est caché », « caché » veut dire…', 'qu’on ne voit pas'], ['Dans « La fleur est parfumée », « parfumée » veut dire…', 'qui sent bon'],
    ['Dans « Le garçon est courageux », « courageux » veut dire…', 'brave'], ['Dans « Le sac est lourd », « lourd » veut dire…', 'difficile à porter'],
    ['Dans « Le vieux pont est solide », « solide » veut dire…', 'qui ne se casse pas facilement'], ['Dans « La forêt est sombre », « sombre » veut dire…', 'peu éclairée'],
    ['Dans « La réponse est exacte », « exacte » veut dire…', 'correcte'], ['Dans « Le chien est fidèle », « fidèle » veut dire…', 'qui reste avec son maître'],
    ['Dans « Le paysage est magnifique », « magnifique » veut dire…', 'très beau']
  ], ['pas large', 'vite', 'sans grandes vagues', 'qui a très faim', 'qu’on ne voit pas', 'qui sent bon', 'brave', 'difficile à porter', 'qui ne se casse pas facilement', 'peu éclairée', 'correcte', 'qui reste avec son maître', 'très beau'], 'Utilise les autres mots de la phrase pour comprendre.', a => `Dans ce contexte, cela veut dire <b>${a}</b>.`);

  rows('legend', 'g4fr-textes', 'legende', [
    ['Une légende raconte souvent…', 'une histoire ancienne et merveilleuse'], ['Dans une légende, on peut rencontrer…', 'un personnage extraordinaire'],
    ['Une légende explique parfois…', 'l’origine d’un lieu'], ['Quel titre convient à une légende ?', 'Le géant de la montagne'], ['Une légende se passe souvent…', 'il y a très longtemps'],
    ['Dans une légende, un dragon est un personnage…', 'imaginaire'], ['Une légende peut contenir…', 'de la magie'], ['Le héros d’une légende doit souvent…', 'surmonter une épreuve'],
    ['« Il était une fois » annonce souvent…', 'un récit imaginaire'], ['Une légende est différente d’une recette car elle…', 'raconte une histoire'],
    ['Dans une légende, le lieu peut être…', 'mystérieux'], ['Quel mot convient à un récit légendaire ?', 'sortilège'],
    ['Une légende transmet parfois…', 'une leçon'], ['Le personnage qui aide le héros peut être…', 'un animal qui parle'],
    ['Dans une légende, la fin peut expliquer…', 'pourquoi un lieu porte un nom'], ['Un monstre dans une légende est souvent…', 'imaginaire'],
    ['Une légende peut être racontée…', 'de génération en génération']
  ], ['une histoire ancienne et merveilleuse', 'un personnage extraordinaire', 'l’origine d’un lieu', 'Le géant de la montagne', 'il y a très longtemps', 'imaginaire', 'de la magie', 'surmonter une épreuve', 'un récit imaginaire', 'raconte une histoire', 'mystérieux', 'sortilège', 'une leçon', 'un animal qui parle', 'pourquoi un lieu porte un nom', 'de génération en génération'], 'Pense aux éléments merveilleux d’une légende.', a => `Une légende peut contenir <b>${a}</b>.`);

  rows('body', 'g4fr-vocabulaire', 'corps', [
    ['Quel mot français désigne « hand » ?', 'la main'], ['Quel mot français désigne « foot » ?', 'le pied'], ['Quel mot français désigne « eyes » ?', 'les yeux']
  ], ['la main', 'le pied', 'les yeux'], 'Choisis le mot français pour cette partie du corps.', a => `La bonne réponse est <b>${a}</b>.`);
  rows('pol', 'g4fr-vocabulaire', 'politesse', [
    ['Que dis-tu en partant ?', 'Au revoir'], ['Que dis-tu pour demander poliment quelque chose ?', 'S’il te plaît'], ['Que réponds-tu à « Merci » ?', 'De rien']
  ], ['Au revoir', 'S’il te plaît', 'De rien'], 'Choisis la formule de politesse adaptée.', a => `On peut dire <b>${a}</b>.`);
})();
