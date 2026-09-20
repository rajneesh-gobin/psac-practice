'use strict';
(function () {
  const add = (id, chapterId, subsection, question, options, answer, hint, explanation) => STATIC_QUESTIONS.push(makeMCQ({ id, chapterId, subsection, difficulty: 2, question, options, answer, hint, explanation }));

  // vs — imparfait vs passé composé: each question gets the correct conjugation + 3 wrong forms of the same verb
  add('g4fr-cov-vs-0','g4fr-imparfait','vs_passe_comp','Hier, pendant que je ___ (lire), le téléphone a sonné.',['lisais','ai lu','lis','lira'],'lisais','Une habitude, une description ou une action en cours prend souvent l\'imparfait.','La forme correcte est <b>lisais</b>.');
  add('g4fr-cov-vs-1','g4fr-imparfait','vs_passe_comp','Chaque été, nous ___ (aller) à la mer.',['allions','sommes allés','allons','irons'],'allions','Une habitude, une description ou une action en cours prend souvent l\'imparfait.','La forme correcte est <b>allions</b>.');
  add('g4fr-cov-vs-2','g4fr-imparfait','vs_passe_comp','Soudain, le chien ___ (aboyer).',['a aboyé','aboyait','aboie','aboyera'],'a aboyé','Une habitude, une description ou une action en cours prend souvent l\'imparfait.','La forme correcte est <b>a aboyé</b>.');
  add('g4fr-cov-vs-3','g4fr-imparfait','vs_passe_comp','Avant, Lina ___ (habiter) à Port-Louis.',['habitait','a habité','habite','habitera'],'habitait','Une habitude, une description ou une action en cours prend souvent l\'imparfait.','La forme correcte est <b>habitait</b>.');
  add('g4fr-cov-vs-4','g4fr-imparfait','vs_passe_comp','Tous les soirs, papa ___ (raconter) une histoire.',['racontait','a raconté','raconte','racontera'],'racontait','Une habitude, une description ou une action en cours prend souvent l\'imparfait.','La forme correcte est <b>racontait</b>.');
  add('g4fr-cov-vs-5','g4fr-imparfait','vs_passe_comp','Quand il était petit, Sami ___ (jouer) au football.',['jouait','a joué','joue','jouera'],'jouait','Une habitude, une description ou une action en cours prend souvent l\'imparfait.','La forme correcte est <b>jouait</b>.');
  add('g4fr-cov-vs-6','g4fr-imparfait','vs_passe_comp','Tout à coup, la pluie ___ (commencer).',['a commencé','commençait','commence','commencera'],'a commencé','Une habitude, une description ou une action en cours prend souvent l\'imparfait.','La forme correcte est <b>a commencé</b>.');
  add('g4fr-cov-vs-7','g4fr-imparfait','vs_passe_comp','Le soleil ___ (briller) quand nous sommes sortis.',['brillait','a brillé','brille','brillera'],'brillait','Une habitude, une description ou une action en cours prend souvent l\'imparfait.','La forme correcte est <b>brillait</b>.');
  add('g4fr-cov-vs-8','g4fr-imparfait','vs_passe_comp','Hier, nous ___ (finir) le puzzle.',['avons fini','finissions','finissons','finirons'],'avons fini','Une habitude, une description ou une action en cours prend souvent l\'imparfait.','La forme correcte est <b>avons fini</b>.');
  add('g4fr-cov-vs-9','g4fr-imparfait','vs_passe_comp','Chaque matin, je ___ (prendre) le bus.',['prenais','ai pris','prends','prendrai'],'prenais','Une habitude, une description ou une action en cours prend souvent l\'imparfait.','La forme correcte est <b>prenais</b>.');
  add('g4fr-cov-vs-10','g4fr-imparfait','vs_passe_comp','Pendant que maman cuisinait, je ___ (mettre) la table.',['mettais','ai mis','mets','mettrai'],'mettais','Une habitude, une description ou une action en cours prend souvent l\'imparfait.','La forme correcte est <b>mettais</b>.');
  add('g4fr-cov-vs-11','g4fr-imparfait','vs_passe_comp','Un jour, elle ___ (trouver) une coquille rare.',['a trouvé','trouvait','trouve','trouvera'],'a trouvé','Une habitude, une description ou une action en cours prend souvent l\'imparfait.','La forme correcte est <b>a trouvé</b>.');
  add('g4fr-cov-vs-12','g4fr-imparfait','vs_passe_comp','La mer ___ (être) calme ce matin-là.',['était','a été','est','sera'],'était','Une habitude, une description ou une action en cours prend souvent l\'imparfait.','La forme correcte est <b>était</b>.');
  add('g4fr-cov-vs-13','g4fr-imparfait','vs_passe_comp','La semaine dernière, vous ___ (visiter) le musée.',['avez visité','visitiez','visitez','visiterez'],'avez visité','Une habitude, une description ou une action en cours prend souvent l\'imparfait.','La forme correcte est <b>avez visité</b>.');
  add('g4fr-cov-vs-14','g4fr-imparfait','vs_passe_comp','Quand nous étions jeunes, nous ___ (aimer) danser.',['aimions','avons aimé','aimons','aimerons'],'aimions','Une habitude, une description ou une action en cours prend souvent l\'imparfait.','La forme correcte est <b>aimions</b>.');
  add('g4fr-cov-vs-15','g4fr-imparfait','vs_passe_comp','Soudain, le ballon ___ (tomber) dans l\'eau.',['est tombé','tombait','tombe','tombera'],'est tombé','Une habitude, une description ou une action en cours prend souvent l\'imparfait.','La forme correcte est <b>est tombé</b>.');
  add('g4fr-cov-vs-16','g4fr-imparfait','vs_passe_comp','Tous les dimanches, ils ___ (rendre) visite à grand-mère.',['rendaient','ont rendu','rendent','rendront'],'rendaient','Une habitude, une description ou une action en cours prend souvent l\'imparfait.','La forme correcte est <b>rendaient</b>.');
  add('g4fr-cov-vs-17','g4fr-imparfait','vs_passe_comp','Hier soir, tu ___ (regarder) un film.',['as regardé','regardais','regardes','regarderas'],'as regardé','Une habitude, une description ou une action en cours prend souvent l\'imparfait.','La forme correcte est <b>as regardé</b>.');
  add('g4fr-cov-vs-18','g4fr-imparfait','vs_passe_comp','Il ___ (faire) beau et les oiseaux chantaient.',['faisait','a fait','fait','fera'],'faisait','Une habitude, une description ou une action en cours prend souvent l\'imparfait.','La forme correcte est <b>faisait</b>.');

  // term — fixed small distractor set (already correct, left intact)
  const rows = (prefix, chapterId, subsection, data, options, hint, explanation) => data.forEach(([question, answer], i) => add(`g4fr-cov-${prefix}-${i}`, chapterId, subsection, question, options, answer, hint, explanation(answer)));

  rows('term', 'g4fr-imparfait', 'terminaisons', [
    ['Je parl___ avec mon ami.', 'ais'], ['Tu finiss___ ton dessin.', 'ais'], ['Il regard___ la mer.', 'ait'], ['Nous jou___ dans la cour.', 'ions'],
    ['Vous chant___ très bien.', 'iez'], ['Elles dans___ ensemble.', 'aient'], ['Je choisiss___ un livre.', 'ais'], ['Tu pren___ le bus.', 'ais'],
    ['Elle ét___ contente.', 'ait'], ['Nous rang___ la classe.', 'ions'], ['Vous av___ faim.', 'iez'], ['Ils regard___ les étoiles.', 'aient'],
    ['Je march___ vers l\'école.', 'ais'], ['Tu écout___ la radio.', 'ais'], ['On prépar___ un gâteau.', 'ait'], ['Nous finiss___ tôt.', 'ions'],
    ['Vous lis___ le journal.', 'iez'], ['Les enfants jou___ dehors.', 'aient']
  ], ['ais', 'ait', 'ions', 'iez', 'aient'], 'Les terminaisons de l\'imparfait sont -ais, -ais, -ait, -ions, -iez, -aient.', a => `Ici, la terminaison est <b>-${a}</b>.`);

  // usage — per-row custom options (already correct, left intact)
  [
    ['Quel indice indique souvent l\'imparfait ?', 'Chaque jour', ['Soudain', 'Hier à midi', 'Un jour']],
    ['Quel indice indique souvent l\'imparfait ?', 'Souvent', ['Soudain', 'Hier à midi', 'Un jour']],
    ['Quel indice indique souvent l\'imparfait ?', 'Quand j\'étais petit', ['Tout à coup', 'Un jour', 'Hier à midi']],
    ['L\'imparfait sert surtout à décrire…', 'une habitude dans le passé', ['une action soudaine', 'un ordre', 'un projet futur']],
    ['L\'imparfait peut décrire…', 'le temps qu\'il faisait', ['un ordre', 'un projet futur', 'une action soudaine']],
    ['Dans « Je lisais quand il est entré », « lisais » exprime…', 'une action en cours', ['une action soudaine', 'un ordre', 'une action future']],
    ['Quel groupe convient avec l\'imparfait ?', 'Tous les soirs', ['Soudain', 'Un jour', 'Hier à midi']],
    ['Dans « La mer était calme », l\'imparfait décrit…', 'une situation', ['un ordre', 'une action soudaine', 'un projet futur']],
    ['Dans « Nous jouions souvent », l\'imparfait exprime…', 'une habitude', ['un ordre', 'une action soudaine', 'une action future']],
    ['Quel mot n\'indique pas forcément l\'imparfait ?', 'Soudain', ['Chaque jour', 'Souvent', 'Tous les soirs']],
    ['Dans « Il faisait chaud », l\'imparfait sert à…', 'décrire le temps', ['donner un ordre', 'annoncer le futur', 'raconter une action soudaine']],
    ['Avant, elle habitait ici. « habitait » indique…', 'une situation passée', ['un ordre', 'une action future', 'une action soudaine']],
    ['Quand j\'étais jeune, je nageais. « nageais » indique…', 'une habitude passée', ['un ordre', 'une action future', 'une action soudaine']],
    ['L\'imparfait est utile pour raconter…', 'le décor d\'une histoire', ['le futur', 'un ordre', 'une seule action rapide']],
    ['Dans « Les oiseaux chantaient », l\'action est…', 'en cours dans le passé', ['terminée en un instant', 'dans le futur', 'un ordre']]
  ].forEach(([question, answer, wrong], i) => add(`g4fr-cov-usage-${i}`, 'g4fr-imparfait', 'usage', question,
    [answer].concat(wrong), answer, 'Pense aux habitudes, descriptions et actions en cours.', `La bonne idée est <b>${answer}</b>.`));

  // fact — True/False style fixed two-option set (already correct, left intact)
  rows('fact', 'g4fr-lecture', 'fait_opinion', [
    ['« Maurice est une île de l\'océan Indien. » Est-ce un fait ou une opinion ?', 'Un fait'], ['« Les mangues sont les meilleurs fruits. » Est-ce un fait ou une opinion ?', 'Une opinion'],
    ['« Une semaine compte sept jours. » Est-ce un fait ou une opinion ?', 'Un fait'], ['« Le bleu est la plus jolie couleur. » Est-ce un fait ou une opinion ?', 'Une opinion'],
    ['« Les oiseaux ont des plumes. » Est-ce un fait ou une opinion ?', 'Un fait'], ['« Les devoirs sont trop difficiles. » Est-ce un fait ou une opinion ?', 'Une opinion'],
    ['« L\'eau peut devenir de la glace. » Est-ce un fait ou une opinion ?', 'Un fait'], ['« Le football est le sport le plus amusant. » Est-ce un fait ou une opinion ?', 'Une opinion'],
    ['« Le soleil est une étoile. » Est-ce un fait ou une opinion ?', 'Un fait'], ['« Les chats sont plus gentils que les chiens. » Est-ce un fait ou une opinion ?', 'Une opinion'],
    ['« Un triangle a trois côtés. » Est-ce un fait ou une opinion ?', 'Un fait'], ['« Les vacances sont trop courtes. » Est-ce un fait ou une opinion ?', 'Une opinion'],
    ['« Les plantes ont besoin d\'eau. » Est-ce un fait ou une opinion ?', 'Un fait'], ['« La lecture est plus agréable que la télévision. » Est-ce un fait ou une opinion ?', 'Une opinion'],
    ['« Un kilogramme contient mille grammes. » Est-ce un fait ou une opinion ?', 'Un fait'], ['« Les films drôles sont les meilleurs. » Est-ce un fait ou une opinion ?', 'Une opinion'],
    ['« Les abeilles fabriquent du miel. » Est-ce un fait ou une opinion ?', 'Un fait'], ['« Les maths sont faciles. » Est-ce un fait ou une opinion ?', 'Une opinion'],
    ['« La lune tourne autour de la Terre. » Est-ce un fait ou une opinion ?', 'Un fait']
  ], ['Un fait', 'Une opinion'], 'Un fait peut être vérifié; une opinion exprime ce que quelqu\'un pense.', a => `<b>${a}</b> est la bonne réponse.`);

  // conn — per-row custom options (already correct, left intact)
  [
    ['Le mot « d\'abord » annonce…', 'la première étape', ['la fin', 'une opposition', 'un exemple']],
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
    ['« D\'un côté… de l\'autre… » aide à…', 'comparer deux idées', ['annoncer la fin', 'donner une raison', 'donner un exemple']],
    ['« En effet » aide à…', 'expliquer une idée', ['comparer deux idées', 'annoncer la fin', 'donner un ordre']]
  ].forEach(([question, answer, wrong], i) => add(`g4fr-cov-conn-${i}`, 'g4fr-lecture', 'connecteurs', question,
    [answer].concat(wrong), answer, 'Un connecteur montre le lien entre les idées.', `La bonne réponse est <b>${answer}</b>.`));

  // sens — vocabulary in context: each question gets the correct definition + 3 plausible wrong ones
  add('g4fr-cov-sens-0','g4fr-lecture','vocabulaire','Dans « Le chemin est étroit », « étroit » veut dire…',['pas large','très long','très profond','tout droit'],'pas large','Utilise les autres mots de la phrase pour comprendre.','Dans ce contexte, cela veut dire <b>pas large</b>.');
  add('g4fr-cov-sens-1','g4fr-lecture','vocabulaire','Dans « Le lapin est rapide », « rapide » veut dire…',['vite','silencieux','mignon','grand'],'vite','Utilise les autres mots de la phrase pour comprendre.','Dans ce contexte, cela veut dire <b>vite</b>.');
  add('g4fr-cov-sens-2','g4fr-lecture','vocabulaire','Dans « La mer est calme », « calme » veut dire…',['sans grandes vagues','très froide','très bleue','très profonde'],'sans grandes vagues','Utilise les autres mots de la phrase pour comprendre.','Dans ce contexte, cela veut dire <b>sans grandes vagues</b>.');
  add('g4fr-cov-sens-3','g4fr-lecture','vocabulaire','Dans « Il est affamé », « affamé » veut dire…',['qui a très faim','qui a très soif','qui est très fatigué','qui est en colère'],'qui a très faim','Utilise les autres mots de la phrase pour comprendre.','Dans ce contexte, cela veut dire <b>qui a très faim</b>.');
  add('g4fr-cov-sens-4','g4fr-lecture','vocabulaire','Dans « Le trésor est caché », « caché » veut dire…',['qu\'on ne voit pas','très précieux','très lourd','très brillant'],'qu\'on ne voit pas','Utilise les autres mots de la phrase pour comprendre.','Dans ce contexte, cela veut dire <b>qu\'on ne voit pas</b>.');
  add('g4fr-cov-sens-5','g4fr-lecture','vocabulaire','Dans « La fleur est parfumée », « parfumée » veut dire…',['qui sent bon','qui est colorée','qui est fragile','qui est belle'],'qui sent bon','Utilise les autres mots de la phrase pour comprendre.','Dans ce contexte, cela veut dire <b>qui sent bon</b>.');
  add('g4fr-cov-sens-6','g4fr-lecture','vocabulaire','Dans « Le garçon est courageux », « courageux » veut dire…',['brave','gentil','fort','rapide'],'brave','Utilise les autres mots de la phrase pour comprendre.','Dans ce contexte, cela veut dire <b>brave</b>.');
  add('g4fr-cov-sens-7','g4fr-lecture','vocabulaire','Dans « Le sac est lourd », « lourd » veut dire…',['difficile à porter','très grand','très plein','très ancien'],'difficile à porter','Utilise les autres mots de la phrase pour comprendre.','Dans ce contexte, cela veut dire <b>difficile à porter</b>.');
  add('g4fr-cov-sens-8','g4fr-lecture','vocabulaire','Dans « Le vieux pont est solide », « solide » veut dire…',['qui ne se casse pas facilement','qui est très vieux','qui est très long','qui est très large'],'qui ne se casse pas facilement','Utilise les autres mots de la phrase pour comprendre.','Dans ce contexte, cela veut dire <b>qui ne se casse pas facilement</b>.');
  add('g4fr-cov-sens-9','g4fr-lecture','vocabulaire','Dans « La forêt est sombre », « sombre » veut dire…',['peu éclairée','très grande','très ancienne','très froide'],'peu éclairée','Utilise les autres mots de la phrase pour comprendre.','Dans ce contexte, cela veut dire <b>peu éclairée</b>.');
  add('g4fr-cov-sens-10','g4fr-lecture','vocabulaire','Dans « La réponse est exacte », « exacte » veut dire…',['correcte','difficile','longue','différente'],'correcte','Utilise les autres mots de la phrase pour comprendre.','Dans ce contexte, cela veut dire <b>correcte</b>.');
  add('g4fr-cov-sens-11','g4fr-lecture','vocabulaire','Dans « Le chien est fidèle », « fidèle » veut dire…',['qui reste avec son maître','qui mange beaucoup','qui court vite','qui aboie fort'],'qui reste avec son maître','Utilise les autres mots de la phrase pour comprendre.','Dans ce contexte, cela veut dire <b>qui reste avec son maître</b>.');
  add('g4fr-cov-sens-12','g4fr-lecture','vocabulaire','Dans « Le paysage est magnifique », « magnifique » veut dire…',['très beau','très grand','très loin','très calme'],'très beau','Utilise les autres mots de la phrase pour comprendre.','Dans ce contexte, cela veut dire <b>très beau</b>.');

  // legend — questions about what a légende contains: each gets the correct answer + 3 contextually wrong ones
  add('g4fr-cov-legend-0','g4fr-textes','legende','Une légende raconte souvent…',['une histoire ancienne et merveilleuse','une liste d\'ingrédients','une règle de grammaire','un tableau de données'],'une histoire ancienne et merveilleuse','Pense aux éléments merveilleux d\'une légende.','La bonne réponse est <b>une histoire ancienne et merveilleuse</b>.');
  add('g4fr-cov-legend-1','g4fr-textes','legende','Dans une légende, on peut rencontrer…',['un personnage extraordinaire','une liste de courses','un calendrier','une recette de cuisine'],'un personnage extraordinaire','Pense aux éléments merveilleux d\'une légende.','La bonne réponse est <b>un personnage extraordinaire</b>.');
  add('g4fr-cov-legend-2','g4fr-textes','legende','Une légende explique parfois…',['l\'origine d\'un lieu','la météo du lendemain','une règle de sport','un mode d\'emploi'],'l\'origine d\'un lieu','Pense aux éléments merveilleux d\'une légende.','La bonne réponse est <b>l\'origine d\'un lieu</b>.');
  add('g4fr-cov-legend-3','g4fr-textes','legende','Quel titre convient à une légende ?',['Le géant de la montagne','La recette du gâteau','Les règles du jeu','Mon emploi du temps'],'Le géant de la montagne','Pense aux éléments merveilleux d\'une légende.','La bonne réponse est <b>Le géant de la montagne</b>.');
  add('g4fr-cov-legend-4','g4fr-textes','legende','Une légende se passe souvent…',['il y a très longtemps','dans le futur','aujourd\'hui','demain matin'],'il y a très longtemps','Pense aux éléments merveilleux d\'une légende.','La bonne réponse est <b>il y a très longtemps</b>.');
  add('g4fr-cov-legend-5','g4fr-textes','legende','Dans une légende, un dragon est un personnage…',['imaginaire','réel','historique','scientifique'],'imaginaire','Pense aux éléments merveilleux d\'une légende.','La bonne réponse est <b>imaginaire</b>.');
  add('g4fr-cov-legend-6','g4fr-textes','legende','Une légende peut contenir…',['de la magie','des formules mathématiques','des règles de grammaire','des données chiffrées'],'de la magie','Pense aux éléments merveilleux d\'une légende.','La bonne réponse est <b>de la magie</b>.');
  add('g4fr-cov-legend-7','g4fr-textes','legende','Le héros d\'une légende doit souvent…',['surmonter une épreuve','résoudre une équation','lire une carte','suivre une recette'],'surmonter une épreuve','Pense aux éléments merveilleux d\'une légende.','La bonne réponse est <b>surmonter une épreuve</b>.');
  add('g4fr-cov-legend-8','g4fr-textes','legende','« Il était une fois » annonce souvent…',['un récit imaginaire','un document officiel','un article de journal','une liste de règles'],'un récit imaginaire','Pense aux éléments merveilleux d\'une légende.','La bonne réponse est <b>un récit imaginaire</b>.');
  add('g4fr-cov-legend-9','g4fr-textes','legende','Une légende est différente d\'une recette car elle…',['raconte une histoire','donne des quantités','liste des ingrédients','explique une procédure'],'raconte une histoire','Pense aux éléments merveilleux d\'une légende.','La bonne réponse est <b>raconte une histoire</b>.');
  add('g4fr-cov-legend-10','g4fr-textes','legende','Dans une légende, le lieu peut être…',['mystérieux','ennuyeux','ordinaire','moderne'],'mystérieux','Pense aux éléments merveilleux d\'une légende.','La bonne réponse est <b>mystérieux</b>.');
  add('g4fr-cov-legend-11','g4fr-textes','legende','Quel mot convient à un récit légendaire ?',['sortilège','facture','calendrier','recette'],'sortilège','Pense aux éléments merveilleux d\'une légende.','La bonne réponse est <b>sortilège</b>.');
  add('g4fr-cov-legend-12','g4fr-textes','legende','Une légende transmet parfois…',['une leçon','une liste d\'achats','un règlement scolaire','une formule chimique'],'une leçon','Pense aux éléments merveilleux d\'une légende.','La bonne réponse est <b>une leçon</b>.');
  add('g4fr-cov-legend-13','g4fr-textes','legende','Le personnage qui aide le héros peut être…',['un animal qui parle','un chef cuisinier','un comptable','un jardinier'],'un animal qui parle','Pense aux éléments merveilleux d\'une légende.','La bonne réponse est <b>un animal qui parle</b>.');
  add('g4fr-cov-legend-14','g4fr-textes','legende','Dans une légende, la fin peut expliquer…',['pourquoi un lieu porte un nom','comment préparer un plat','quand payer une facture','où trouver un magasin'],'pourquoi un lieu porte un nom','Pense aux éléments merveilleux d\'une légende.','La bonne réponse est <b>pourquoi un lieu porte un nom</b>.');
  add('g4fr-cov-legend-15','g4fr-textes','legende','Un monstre dans une légende est souvent…',['imaginaire','basé sur la réalité','vu par des témoins','décrit dans une encyclopédie'],'imaginaire','Pense aux éléments merveilleux d\'une légende.','La bonne réponse est <b>imaginaire</b>.');
  add('g4fr-cov-legend-16','g4fr-textes','legende','Une légende peut être racontée…',['de génération en génération','uniquement à l\'école','seulement par des professeurs','une seule fois'],'de génération en génération','Pense aux éléments merveilleux d\'une légende.','La bonne réponse est <b>de génération en génération</b>.');

  // body — body parts: correct French word + 3 other body part words
  add('g4fr-cov-body-0','g4fr-vocabulaire','corps','Quel mot français désigne « hand » ?',['la main','le bras','le doigt','l\'épaule'],'la main','Choisis le mot français pour cette partie du corps.','La bonne réponse est <b>la main</b>.');
  add('g4fr-cov-body-1','g4fr-vocabulaire','corps','Quel mot français désigne « foot » ?',['le pied','la jambe','le genou','la cheville'],'le pied','Choisis le mot français pour cette partie du corps.','La bonne réponse est <b>le pied</b>.');
  add('g4fr-cov-body-2','g4fr-vocabulaire','corps','Quel mot français désigne « eyes » ?',['les yeux','les oreilles','le nez','la bouche'],'les yeux','Choisis le mot français pour cette partie du corps.','La bonne réponse est <b>les yeux</b>.');

  // pol — politeness phrases: correct formula + 3 other politeness words
  add('g4fr-cov-pol-0','g4fr-vocabulaire','politesse','Que dis-tu en partant ?',['Au revoir','Bonjour','Merci','S\'il te plaît'],'Au revoir','Choisis la formule de politesse adaptée.','On peut dire <b>Au revoir</b>.');
  add('g4fr-cov-pol-1','g4fr-vocabulaire','politesse','Que dis-tu pour demander poliment quelque chose ?',['S\'il te plaît','Au revoir','Merci','De rien'],'S\'il te plaît','Choisis la formule de politesse adaptée.','On peut dire <b>S\'il te plaît</b>.');
  add('g4fr-cov-pol-2','g4fr-vocabulaire','politesse','Que réponds-tu à « Merci » ?',['De rien','Au revoir','S\'il te plaît','Bonjour'],'De rien','Choisis la formule de politesse adaptée.','On peut dire <b>De rien</b>.');
})();
