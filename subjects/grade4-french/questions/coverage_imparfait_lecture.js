'use strict';
(function () {
  const add = (id, chapterId, subsection, question, options, answer, hint, explanation) => STATIC_QUESTIONS.push(makeMCQ({ id, chapterId, subsection, difficulty: 2, question, options, answer, hint, explanation }));
  const rows = (prefix, chapterId, subsection, data, options, hint, explanation) => data.forEach(([question, answer], i) => add(`g4fr-cov-${prefix}-${i}`, chapterId, subsection, prefix === 'usage' ? `${question} (indice : ${answer})` : question, options, answer, hint, explanation(answer)));

  rows('vs', 'g4fr-imparfait', 'vs_passe_comp', [
    ['Hier, pendant que je ___ (lire), le téléphone a sonné.', 'lisais'], ['Chaque été, nous ___ (aller) à la mer.', 'allions'],
    ['Soudain, le chien ___ (aboyer).', 'a aboyé'], ['Avant, Lina ___ (habiter) à Port-Louis.', 'habitait'],
    ['Tous les soirs, papa ___ (raconter) une histoire.', 'racontait'], ['Quand il était petit, Sami ___ (jouer) au football.', 'jouait'],
    ['Tout à coup, la pluie ___ (commencer).', 'a commencé'], ['Le soleil ___ (briller) quand nous sommes sortis.', 'brillait'],
    ['Hier, nous ___ (finir) le puzzle.', 'avons fini'], ['Chaque matin, je ___ (prendre) le bus.', 'prenais'],
    ['Pendant que maman cuisait, je ___ (mettre) la table.', 'mettais'], ['Un jour, elle ___ (trouver) une coquille rare.', 'a trouvé'],
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

  rows('usage', 'g4fr-imparfait', 'usage', [
    ['Quel indice indique souvent l’imparfait ?', 'Chaque jour'], ['Quel indice indique souvent l’imparfait ?', 'Souvent'], ['Quel indice indique souvent l’imparfait ?', 'Quand j’étais petit'],
    ['L’imparfait sert surtout à décrire…', 'une habitude dans le passé'], ['L’imparfait peut décrire…', 'le temps qu’il faisait'],
    ['Dans « Je lisais quand il est entré », « lisais » exprime…', 'une action en cours'], ['Quel groupe convient avec l’imparfait ?', 'Tous les soirs'],
    ['Dans « La mer était calme », l’imparfait décrit…', 'une situation'], ['Dans « Nous jouions souvent », l’imparfait exprime…', 'une habitude'],
    ['Quel mot n’indique pas forcément l’imparfait ?', 'Soudain'], ['Dans « Il faisait chaud », l’imparfait sert à…', 'décrire le temps'],
    ['Avant, elle habitait ici. « habitait » indique…', 'une situation passée'], ['Quand j’étais jeune, je nageais. « nageais » indique…', 'une habitude passée'],
    ['L’imparfait est utile pour raconter…', 'le décor d’une histoire'], ['Dans « Les oiseaux chantaient », l’action est…', 'en cours dans le passé']
  ], ['Chaque jour', 'Souvent', 'Quand j’étais petit', 'une habitude dans le passé', 'le temps qu’il faisait', 'une action en cours', 'Tous les soirs', 'une situation', 'une habitude', 'Soudain', 'décrire le temps', 'une situation passée', 'une habitude passée', 'le décor d’une histoire', 'en cours dans le passé'], 'Pense aux habitudes, descriptions et actions en cours.', a => `La bonne idée est <b>${a}</b>.`);

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

  rows('conn', 'g4fr-lecture', 'connecteurs', [
    ['Le mot « d’abord » annonce…', 'la première étape'], ['Le mot « ensuite » annonce…', 'la suite'], ['Le mot « enfin » annonce…', 'la dernière étape'],
    ['« Parce que » donne souvent…', 'une raison'], ['« Mais » montre souvent…', 'une opposition'], ['« Donc » annonce souvent…', 'une conséquence'],
    ['« Puis » veut dire…', 'après'], ['« Cependant » veut dire souvent…', 'mais'], ['« Par exemple » introduit…', 'un exemple'],
    ['« Ainsi » peut introduire…', 'une conséquence'], ['« Pourtant » annonce…', 'une opposition'], ['« Grâce à » explique…', 'une cause positive'],
    ['« Après cela » indique…', 'la suite'], ['« Car » signifie souvent…', 'parce que'], ['« Finalement » indique…', 'la fin'],
    ['« D’un côté… de l’autre… » aide à…', 'comparer deux idées'], ['« En effet » aide à…', 'expliquer une idée']
  ], ['la première étape', 'la suite', 'la dernière étape', 'une raison', 'une opposition', 'une conséquence', 'après', 'mais', 'un exemple', 'une cause positive', 'comparer deux idées', 'expliquer une idée', 'la fin', 'parce que'], 'Un connecteur montre le lien entre les idées.', a => `<b>${a}</b> est le rôle de ce connecteur.`);

  rows('sens', 'g4fr-lecture', 'vocabulaire', [
    ['Dans « Le chemin est étroit », « étroit » veut dire…', 'pas large'], ['Dans « Le lapin est rapide », « rapide » veut dire…', 'vite'],
    ['Dans « La mer est calme », « calme » veut dire…', 'sans grandes vagues'], ['Dans « Il est affamé », « affamé » veut dire…', 'très faim'],
    ['Dans « Le trésor est caché », « caché » veut dire…', 'qu’on ne voit pas'], ['Dans « La fleur est parfumée », « parfumée » veut dire…', 'qui sent bon'],
    ['Dans « Le garçon est courageux », « courageux » veut dire…', 'brave'], ['Dans « Le sac est lourd », « lourd » veut dire…', 'difficile à porter'],
    ['Dans « Le vieux pont est solide », « solide » veut dire…', 'qui ne se casse pas facilement'], ['Dans « La forêt est sombre », « sombre » veut dire…', 'peu éclairée'],
    ['Dans « La réponse est exacte », « exacte » veut dire…', 'correcte'], ['Dans « Le chien est fidèle », « fidèle » veut dire…', 'qui reste avec son maître'],
    ['Dans « Le paysage est magnifique », « magnifique » veut dire…', 'très beau']
  ], ['pas large', 'vite', 'sans grandes vagues', 'très faim', 'qu’on ne voit pas', 'qui sent bon', 'brave', 'difficile à porter', 'qui ne se casse pas facilement', 'peu éclairée', 'correcte', 'qui reste avec son maître', 'très beau'], 'Utilise les autres mots de la phrase pour comprendre.', a => `Dans ce contexte, cela veut dire <b>${a}</b>.`);

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
