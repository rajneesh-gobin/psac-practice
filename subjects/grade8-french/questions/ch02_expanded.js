'use strict';
// Grade 8 Français — Expanded questions, all 5 chapters
// IDs continue from ch01_core.js: g8fr-co-013…, g8fr-eo-013…, etc.

STATIC_QUESTIONS.push(

  // ── Compréhension orale — schema_communication ───────────────────────────

  makeMCQ({ id:'g8fr-co-013', chapterId:'g8fr-co', difficulty:2, subsection:'schema_communication',
    question:'Dans le schéma de communication, le "contexte" désigne :',
    options:['Les circonstances de l\'échange','Le canal de transmission utilisé','Le volume de la voix du locuteur','Le niveau de langue employé'],
    answer:'Les circonstances de l\'échange',
    hint:'Le contexte répond aux questions : Où ? Quand ? Dans quelle situation ?',
    explanation:'Le <b>contexte</b> englobe toutes les circonstances entourant la communication : le lieu, le moment, la relation entre les interlocuteurs et la situation sociale. Il influence fortement le sens du message.' }),

  makeMCQ({ id:'g8fr-co-014', chapterId:'g8fr-co', difficulty:3, subsection:'schema_communication',
    question:'Quand l\'émetteur et le récepteur ne partagent pas le même code, on parle de :',
    options:['Barrière linguistique','Bonne communication','Message très clair','Silence partagé'],
    answer:'Barrière linguistique',
    hint:'Si on ne parle pas la même langue, on ne peut pas se comprendre.',
    explanation:'Si l\'émetteur et le récepteur ne partagent pas le même <b>code</b> (langue, signes), la communication échoue : il y a <b>malentendus</b> ou <b>barrière linguistique</b>. C\'est l\'un des obstacles fréquents à la communication.' }),

  makeMCQ({ id:'g8fr-co-015', chapterId:'g8fr-co', difficulty:2, subsection:'schema_communication',
    question:'Dans un message publicitaire télévisé, quel est le canal ?',
    options:['La télévision','Le produit vendu','La langue utilisée','L\'acteur principal'],
    answer:'La télévision',
    hint:'Le canal est le moyen technique par lequel passe le message.',
    explanation:'Dans une publicité télévisée, le <b>canal</b> est la <b>télévision</b> — le support audiovisuel qui transmet le message de l\'émetteur (l\'entreprise) au récepteur (le téléspectateur).' }),

  // ── Compréhension orale — types_textes_oral ──────────────────────────────

  makeMCQ({ id:'g8fr-co-016', chapterId:'g8fr-co', difficulty:2, subsection:'types_textes_oral',
    question:'Une émission de radio où des auditeurs appellent pour donner leur avis est un exemple de :',
    options:['Talk-show interactif','Bulletin météo','Monologue radio','Conférence savante'],
    answer:'Talk-show interactif',
    hint:'Plusieurs personnes échangent leurs points de vue en direct.',
    explanation:'Un <b>talk-show radiophonique</b> avec appels d\'auditeurs est une conversation interactive où plusieurs locuteurs (animateur et auditeurs) échangent en direct. Les rôles d\'émetteur et récepteur s\'alternent.' }),

  makeMCQ({ id:'g8fr-co-017', chapterId:'g8fr-co', difficulty:3, subsection:'types_textes_oral',
    question:'Qu\'est-ce qui différencie un monologue d\'un dialogue ?',
    options:['Le monologue n\'a qu\'un seul locuteur','Le dialogue n\'a qu\'un seul locuteur','Le monologue est toujours narratif','Le dialogue est écrit uniquement'],
    answer:'Le monologue n\'a qu\'un seul locuteur',
    hint:'Mono = un seul ; dia = deux (ou plus).',
    explanation:'Le <b>monologue</b> est une prise de parole d\'un seul locuteur (ex. : un discours, un exposé). Le <b>dialogue</b> implique au moins deux interlocuteurs qui échangent à tour de rôle.' }),

  makeMCQ({ id:'g8fr-co-018', chapterId:'g8fr-co', difficulty:2, subsection:'types_textes_oral',
    question:'Un documentaire audio sur la faune marine est principalement un texte oral de type :',
    options:['Informatif','Injonctif','Narratif','Argumentatif'],
    answer:'Informatif',
    hint:'Il informe sur des faits réels et décrit ce qu\'on ne peut pas voir.',
    explanation:'Un documentaire audio est <b>informatif</b> (transmet des connaissances) et <b>descriptif</b> (décrit les animaux, les milieux). Il s\'appuie sur des faits réels et utilise un vocabulaire scientifique.' }),

  // ── Compréhension orale — sens_contexte ──────────────────────────────────

  makeMCQ({ id:'g8fr-co-019', chapterId:'g8fr-co', difficulty:2, subsection:'sens_contexte',
    question:'Pourquoi le ton d\'un locuteur est-il important pour comprendre son message ?',
    options:['Le ton révèle les émotions du locuteur','Le ton remplace complètement les mots','Le ton indique seulement la vitesse','Le ton n\'a aucune importance réelle'],
    answer:'Le ton révèle les émotions du locuteur',
    hint:'On peut dire "C\'est super..." avec un ton sincère ou sarcastique.',
    explanation:'Le <b>ton</b> (sérieux, ironique, joyeux, triste) révèle les émotions et les intentions réelles du locuteur. Les mêmes mots peuvent avoir un sens très différent selon le ton utilisé.' }),

  makeMCQ({ id:'g8fr-co-020', chapterId:'g8fr-co', difficulty:3, subsection:'sens_contexte',
    question:'Si quelqu\'un dit "C\'est vraiment une bonne idée..." avec un sourire sarcastique, son message réel est :',
    options:['Il pense que l\'idée est mauvaise','Il pense que l\'idée est excellente','Il ne sait pas si l\'idée est bonne','Il n\'a pas écouté l\'idée'],
    answer:'Il pense que l\'idée est mauvaise',
    hint:'Le sourire sarcastique contredit les mots positifs.',
    explanation:'Le sarcasme et l\'<b>ironie</b> consistent à dire le contraire de ce qu\'on pense, souvent avec un ton moqueur ou un sourire sarcastique. Ici, "bonne idée" dit avec ironie signifie "mauvaise idée".' }),

  // ── Expression orale — lecture_expressive ────────────────────────────────

  makeMCQ({ id:'g8fr-eo-013', chapterId:'g8fr-eo', difficulty:1, subsection:'lecture_expressive',
    question:'Qu\'est-ce qu\'une "pause expressive" dans une lecture à voix haute ?',
    options:['Une pause voulue, pour créer un effet','Une pause due à une erreur de lecture','Le silence entre deux paragraphes','Une très longue pause sans raison'],
    answer:'Une pause voulue, pour créer un effet',
    hint:'Le lecteur s\'arrête volontairement pour que les mots résonnent.',
    explanation:'Une <b>pause expressive</b> est une pause volontaire après ou avant un mot ou une phrase importante. Elle crée un effet de suspense, d\'emphase ou d\'émotion et aide l\'auditoire à absorber le message.' }),

  makeMCQ({ id:'g8fr-eo-014', chapterId:'g8fr-eo', difficulty:2, subsection:'lecture_expressive',
    question:'Pour lire un texte poétique à voix haute, il faut :',
    options:['Respecter le rythme et les rimes','Lire à la vitesse de la prose','Ne pas prononcer les "e" muets','Ignorer les strophes du poème'],
    answer:'Respecter le rythme et les rimes',
    hint:'La poésie a un rythme et une musique propres qu\'il faut faire entendre.',
    explanation:'Lire un poème à voix haute demande de <b>respecter le rythme</b> des vers (le nombre de syllabes), de <b>mettre en valeur les rimes</b> et de <b>varier l\'intonation</b> pour faire sentir les émotions du texte.' }),

  makeMCQ({ id:'g8fr-eo-015', chapterId:'g8fr-eo', difficulty:3, subsection:'lecture_expressive',
    question:'Quelle est la différence entre la "diction" et la "prononciation" ?',
    options:['La diction est l\'art de parler avec clarté','La prononciation ne concerne que les voyelles','La diction s\'applique seulement à l\'écriture','La diction et la prononciation sont pareilles'],
    answer:'La diction est l\'art de parler avec clarté',
    hint:'La diction englobe la prononciation mais va plus loin.',
    explanation:'La <b>prononciation</b> est l\'émission correcte des sons d\'une langue. La <b>diction</b> est l\'art de s\'exprimer clairement avec le ton, le rythme et l\'expression appropriés — c\'est une compétence plus large.' }),

  // ── Expression orale — conversation_multi ────────────────────────────────

  makeMCQ({ id:'g8fr-eo-016', chapterId:'g8fr-eo', difficulty:2, subsection:'conversation_multi',
    question:'Lors d\'une discussion en groupe, pourquoi est-il important de reformuler les idées des autres ?',
    options:['Pour montrer qu\'on a bien compris','Pour montrer qu\'on est le meilleur','Pour critiquer l\'autre plus fort','Pour remplir le temps de parole'],
    answer:'Pour montrer qu\'on a bien compris',
    hint:'Reformuler = répéter avec ses propres mots pour confirmer la compréhension.',
    explanation:'<b>Reformuler</b> l\'idée d\'un autre ("Si je comprends bien, tu veux dire que...") montre qu\'on a écouté attentivement, clarifie d\'éventuelles confusions et améliore la qualité du débat.' }),

  makeMCQ({ id:'g8fr-eo-017', chapterId:'g8fr-eo', difficulty:3, subsection:'conversation_multi',
    question:'Quelle est la différence entre "débattre" et "disputer" ?',
    options:['Débattre est argumenté ; disputer est agressif','Débattre est agressif ; disputer est argumenté','Débattre est informel ; disputer est formel','Débattre et disputer sont deux synonymes'],
    answer:'Débattre est argumenté ; disputer est agressif',
    hint:'Un débat est organisé et respectueux ; une dispute est émotionnelle.',
    explanation:'<b>Débattre</b> est un échange organisé où chacun défend ses arguments avec respect et logique. <b>Se disputer</b> implique souvent des émotions fortes, de l\'agressivité et peu d\'arguments raisonnés.' }),

  // ── Expression orale — lexique_varie ─────────────────────────────────────

  makeMCQ({ id:'g8fr-eo-018', chapterId:'g8fr-eo', difficulty:1, subsection:'lexique_varie',
    question:'Quel mot est plus précis que "chose" pour désigner un instrument de musique ?',
    options:['Un violon','Un truc','Un machin','Un objet'],
    answer:'Un violon',
    hint:'Un mot précis remplace avantageusement les mots vagues comme "chose" ou "truc".',
    explanation:'Un vocabulaire précis évite les mots vagues ("chose", "truc", "machin"). <b>Nommer précisément</b> (un violon, une flûte, un piano) montre une maîtrise du lexique et améliore la communication.' }),

  makeMCQ({ id:'g8fr-eo-019', chapterId:'g8fr-eo', difficulty:2, subsection:'lexique_varie',
    question:'Quelle est la différence entre le "vocabulaire actif" et le "vocabulaire passif" ?',
    options:['L\'actif est utilisé ; le passif est seulement compris','L\'actif est compris ; le passif est seulement utilisé','L\'actif ne sert qu\'à l\'oral ; le passif qu\'à l\'écrit','L\'actif et le passif sont exactement identiques'],
    answer:'L\'actif est utilisé ; le passif est seulement compris',
    hint:'On comprend plus de mots qu\'on n\'en utilise spontanément.',
    explanation:'Le <b>vocabulaire actif</b> regroupe les mots qu\'on utilise spontanément. Le <b>vocabulaire passif</b> comprend les mots qu\'on comprend quand on les lit ou les entend mais qu\'on n\'utilise pas soi-même.' }),

  makeMCQ({ id:'g8fr-eo-020', chapterId:'g8fr-eo', difficulty:3, subsection:'lexique_varie',
    question:'Pour parler de l\'environnement marin avec précision, il vaut mieux utiliser :',
    options:['Des termes précis : corail, récif','Des mots vagues comme "plantes marines"','Uniquement des adjectifs de couleur','Uniquement des métaphores poétiques'],
    answer:'Des termes précis : corail, récif',
    hint:'Un lexique précis et varié montre une maîtrise du sujet.',
    explanation:'Utiliser un <b>lexique précis et varié</b> — "coraux", "phytoplancton", "récif corallien" — montre une maîtrise du domaine et permet de communiquer avec exactitude sur des sujets spécialisés.' }),

  // ── Compréhension écrite — idee_implicite ────────────────────────────────

  makeMCQ({ id:'g8fr-ce-013', chapterId:'g8fr-ce', difficulty:1, subsection:'idee_implicite',
    question:'Que signifie "lire entre les lignes" ?',
    options:['Comprendre ce qui est sous-entendu','Lire chaque ligne exactement deux fois','Lire les notes de bas de page','Souligner chaque mot du texte'],
    answer:'Comprendre ce qui est sous-entendu',
    hint:'"Entre les lignes" = ce qui n\'est pas écrit mais qu\'on peut déduire.',
    explanation:'"<b>Lire entre les lignes</b>" signifie décoder les informations implicites — ce que l\'auteur suggère sans le dire explicitement. C\'est une compétence de lecture avancée.' }),

  makeMCQ({ id:'g8fr-ce-014', chapterId:'g8fr-ce', difficulty:3, subsection:'idee_implicite',
    question:'Dans la phrase : "Elle regardait l\'horloge pour la dixième fois", quelle information est implicite ?',
    options:['Elle s\'impatiente en attendant','Elle adore les vieilles horloges','L\'horloge est très belle à voir','Il est très tard dans la nuit'],
    answer:'Elle s\'impatiente en attendant',
    hint:'Regarder l\'horloge plusieurs fois exprime de l\'impatience.',
    explanation:'La phrase ne dit pas explicitement qu\'elle s\'impatiente, mais <b>regarder l\'horloge pour la dixième fois</b> le suggère fortement. C\'est une information implicite que le lecteur déduit du comportement décrit.' }),

  makeMCQ({ id:'g8fr-ce-015', chapterId:'g8fr-ce', difficulty:2, subsection:'idee_implicite',
    question:'Pour repérer les informations implicites dans un texte, on doit :',
    options:['Analyser les mots et le contexte','Lire uniquement les mots en gras','Compter les paragraphes du texte','Ignorer les adverbes du texte'],
    answer:'Analyser les mots et le contexte',
    hint:'L\'implicite se cache dans les détails : les mots choisis, les gestes, le contexte.',
    explanation:'Les informations implicites se trouvent dans les <b>choix lexicaux</b> (mots positifs ou négatifs), les <b>actions des personnages</b> et le <b>contexte</b>. Il faut analyser ces éléments pour déduire ce que l\'auteur ne dit pas directement.' }),

  // ── Compréhension écrite — registres_langue ──────────────────────────────

  makeMCQ({ id:'g8fr-ce-016', chapterId:'g8fr-ce', difficulty:2, subsection:'registres_langue',
    question:'Quelle phrase appartient au registre soutenu ?',
    options:['"Je vous saurais gré de m\'indiquer..."','"Donne-moi l\'info tout de suite, allez !"','"T\'aurais pas cinq minutes, dis donc ?"','"Ça me saoule, ce truc, j\'en peux plus."'],
    answer:'"Je vous saurais gré de m\'indiquer..."',
    hint:'Cette formule est longue, polie et utilise le conditionnel de politesse.',
    explanation:'"<b>Je vous saurais gré de m\'indiquer...</b>" appartient au registre <b>soutenu</b> : vouvoiement, tournure recherchée, vocabulaire formel. "Je vous serais reconnaissant de bien vouloir m\'indiquer..." en est une variante. C\'est le style des lettres officielles.' }),

  makeMCQ({ id:'g8fr-ce-017', chapterId:'g8fr-ce', difficulty:3, subsection:'registres_langue',
    question:'L\'identification du registre de langue d\'un personnage dans un roman peut indiquer :',
    options:['Son niveau social et son éducation','La nationalité exacte de l\'auteur','Le genre du roman que l\'on lit','Uniquement son âge et sa taille'],
    answer:'Son niveau social et son éducation',
    hint:'La façon de parler d\'un personnage révèle beaucoup sur lui.',
    explanation:'Le <b>registre de langue</b> d\'un personnage est un indice de son niveau social, son éducation et sa relation avec l\'interlocuteur. Un personnage cultivé utilisera un registre soutenu ; un personnage issu des classes populaires, un registre familier.' }),

  makeMCQ({ id:'g8fr-ce-018', chapterId:'g8fr-ce', difficulty:2, subsection:'registres_langue',
    question:'Le registre courant est utilisé :',
    options:['Dans la communication quotidienne','Dans les textes scientifiques seuls','Seulement entre amis très proches','Uniquement en littérature classique'],
    answer:'Dans la communication quotidienne',
    hint:'Le registre courant est le niveau intermédiaire — ni trop formel, ni trop familier.',
    explanation:'Le <b>registre courant</b> est le niveau de langue standard utilisé dans la communication ordinaire : articles de journaux, cours, conversations professionnelles non formelles. Il respecte les règles grammaticales sans être pompeux.' }),

  // ── Compréhension écrite — analyse_texte ─────────────────────────────────

  makeMCQ({ id:'g8fr-ce-019', chapterId:'g8fr-ce', difficulty:2, subsection:'analyse_texte',
    question:'Une comparaison est une figure de style qui :',
    options:['Compare deux éléments avec "comme"','Compare deux éléments sans outil','Répète les mêmes sons plusieurs fois','Attribue des qualités humaines'],
    answer:'Compare deux éléments avec "comme"',
    hint:'La comparaison utilise toujours un mot comparatif explicite.',
    explanation:'La <b>comparaison</b> associe deux éléments en utilisant un outil comparatif : "comme", "tel que", "pareil à". Ex. : "Il est fort <b>comme</b> un lion." À distinguer de la métaphore, qui supprime l\'outil comparatif.' }),

  makeMCQ({ id:'g8fr-ce-020', chapterId:'g8fr-ce', difficulty:3, subsection:'analyse_texte',
    question:'L\'hyperbole est une figure de style qui consiste à :',
    options:['Exagérer volontairement les choses','Minimiser fortement la réalité','Comparer deux choses entre elles','Répéter deux fois la même idée'],
    answer:'Exagérer volontairement les choses',
    hint:'"Je l\'ai dit mille fois" — vraiment mille fois ? C\'est une exagération.',
    explanation:'L\'<b>hyperbole</b> est une exagération volontaire pour produire un effet fort. Ex. : "Je meurs de faim" (on n\'est pas en train de mourir), "C\'est une montagne de travail" (il y a beaucoup de travail).' }),

  makeMCQ({ id:'g8fr-ce-021', chapterId:'g8fr-ce', difficulty:2, subsection:'analyse_texte',
    question:'Analyser les temps verbaux dans un texte permet de :',
    options:['Comprendre la chronologie','Trouver les verbes conjugués','Identifier les personnages','Compter les phrases'],
    answer:'Comprendre la chronologie',
    hint:'Les temps verbaux situent les événements dans le temps.',
    explanation:'Analyser les <b>temps verbaux</b> révèle la chronologie (imparfait pour des habitudes, passé composé pour des actions précises, présent pour des faits universels) et les intentions de l\'auteur (suspense, retour en arrière).' }),

  // ── Expression écrite — textes_fonctionnels_divers ───────────────────────

  makeMCQ({ id:'g8fr-ee-013', chapterId:'g8fr-ee', difficulty:1, subsection:'textes_fonctionnels_divers',
    question:'Un curriculum vitae (CV) est un texte fonctionnel qui sert à :',
    options:['Présenter ses compétences','Raconter sa vie comme un roman','Défendre une opinion politique','Exprimer ses émotions intimes'],
    answer:'Présenter ses compétences',
    hint:'Le CV est le premier document qu\'on envoie à un employeur.',
    explanation:'Un <b>curriculum vitae (CV)</b> est un document fonctionnel qui présente de façon structurée et concise : l\'identité, les études, les expériences professionnelles et les compétences d\'une personne.' }),

  makeMCQ({ id:'g8fr-ee-014', chapterId:'g8fr-ee', difficulty:2, subsection:'textes_fonctionnels_divers',
    question:'Un rapport de stage doit être rédigé dans un style :',
    options:['Objectif, factuel et bien structuré','Très émotionnel et très personnel','Informel et plein de blagues','En créole ou en anglais courant'],
    answer:'Objectif, factuel et bien structuré',
    hint:'Un rapport professionnel doit être neutre et factuel.',
    explanation:'Un <b>rapport de stage</b> doit être <b>objectif</b> (décrire les faits sans jugements personnels excessifs), <b>factuel</b> (basé sur des observations réelles) et <b>bien structuré</b> (introduction, développement, conclusion).' }),

  makeMCQ({ id:'g8fr-ee-015', chapterId:'g8fr-ee', difficulty:3, subsection:'textes_fonctionnels_divers',
    question:'Dans une pétition, l\'objectif principal est de :',
    options:['Réunir des signatures','Expliquer un concept','Raconter une histoire','Vendre un produit'],
    answer:'Réunir des signatures',
    hint:'Une pétition est signée par de nombreuses personnes pour montrer leur soutien.',
    explanation:'Une <b>pétition</b> est un texte fonctionnel qui demande le soutien de nombreuses personnes (par leurs signatures) pour défendre une cause ou demander un changement à une autorité.' }),

  // ── Expression écrite — resume_opinion ───────────────────────────────────

  makeMCQ({ id:'g8fr-ee-016', chapterId:'g8fr-ee', difficulty:2, subsection:'resume_opinion',
    question:'Dans un résumé, que doit-on absolument éviter ?',
    options:['D\'ajouter ses propres opinions','D\'utiliser ses propres mots','De garder les idées principales','D\'être concis et bien organisé'],
    answer:'D\'ajouter ses propres opinions',
    hint:'Un résumé reproduit les idées de l\'auteur, pas les siennes.',
    explanation:'Un résumé doit être fidèle au texte original : on ne doit pas y ajouter ses <b>opinions personnelles</b> ni des informations externes. On reformule les idées de l\'auteur avec ses propres mots.' }),

  makeMCQ({ id:'g8fr-ee-017', chapterId:'g8fr-ee', difficulty:3, subsection:'resume_opinion',
    question:'Comment distinguer un fait d\'une opinion dans un article de journal ?',
    options:['Le fait est vérifiable ; l\'opinion est subjective','Le fait est subjectif ; l\'opinion est vérifiable','Le fait est en gras ; l\'opinion est en italique','Le fait et l\'opinion sont indistinguables'],
    answer:'Le fait est vérifiable ; l\'opinion est subjective',
    hint:'Un fait peut être prouvé ; une opinion dépend du point de vue.',
    explanation:'Un <b>fait</b> est vérifiable, objectif et peut être confirmé par des données. Une <b>opinion</b> est subjective et exprime un point de vue personnel. Les journalistes doivent clairement distinguer les deux. Exemple : « En 2023, la température a augmenté de 1,5 °C » est un fait, on peut le vérifier ; « Je crois que c\'est catastrophique » est une opinion, elle n\'engage que celui qui la donne.' }),

  makeMCQ({ id:'g8fr-ee-018', chapterId:'g8fr-ee', difficulty:2, subsection:'resume_opinion',
    question:'Quelle longueur un résumé devrait-il avoir par rapport au texte original ?',
    options:['Environ un quart du texte','Exactement la même longueur','Le double du texte original','Une seule phrase très courte'],
    answer:'Environ un quart du texte',
    hint:'Un résumé doit être nettement plus court que le texte de départ.',
    explanation:'Un <b>résumé</b> doit être significativement plus court que le texte original — généralement <b>environ 1/4</b> de sa longueur. Il ne retient que les idées essentielles, sans les détails ni les exemples.' }),

  // ── Expression écrite — structure_coherente ──────────────────────────────

  makeMCQ({ id:'g8fr-ee-019', chapterId:'g8fr-ee', difficulty:2, subsection:'structure_coherente',
    question:'La "progression thématique" dans un texte signifie que :',
    options:['Chaque phrase apporte du nouveau','Les phrases sont toutes identiques','Les paragraphes sont en désordre','Le texte revient sans cesse en arrière'],
    answer:'Chaque phrase apporte du nouveau',
    hint:'Le texte progresse — il ne tourne pas en rond.',
    explanation:'La <b>progression thématique</b> est le principe selon lequel chaque phrase ajoute une information nouvelle par rapport à la précédente, faisant avancer le texte logiquement vers sa conclusion.' }),

  makeMCQ({ id:'g8fr-ee-020', chapterId:'g8fr-ee', difficulty:3, subsection:'structure_coherente',
    question:'Dans un texte argumentatif, la "concession" consiste à :',
    options:['Reconnaître un argument de l\'adversaire','Abandonner complètement sa propre thèse','Ignorer tous les arguments opposés','Répéter ses arguments plus fort'],
    answer:'Reconnaître un argument de l\'adversaire',
    hint:'On reconnaît ce qui est vrai dans l\'argument opposé avant de montrer ses limites.',
    explanation:'La <b>concession</b> est une technique argumentative : on reconnaît la validité partielle de l\'argument adverse ("Certes... / Il est vrai que...") avant de l\'atténuer ou de le réfuter ("Cependant... / Néanmoins...").' }),

  makeMCQ({ id:'g8fr-ee-021', chapterId:'g8fr-ee', difficulty:2, subsection:'structure_coherente',
    question:'Pour assurer la cohérence d\'un texte, quel outil évite les répétitions du même nom ?',
    options:['Les pronoms et les synonymes','Les points de suspension répétés','Les guillemets français','Les tirets de dialogue'],
    answer:'Les pronoms et les synonymes',
    hint:'Pour éviter de répéter "Paul" dix fois, on utilise "il" ou un synonyme.',
    explanation:'Pour éviter les répétitions et assurer la cohérence, on utilise des <b>pronoms</b> ("il", "elle", "ils") et des <b>synonymes</b> pour désigner le même référent sans le répéter mot pour mot.' }),

  // ── Littérature — genres_caracteristiques ────────────────────────────────

  makeMCQ({ id:'g8fr-litterature-013', chapterId:'g8fr-litterature', difficulty:1, subsection:'genres_caracteristiques',
    question:'La comédie se distingue de la tragédie par :',
    options:['Une fin heureuse et des situations comiques','Une fin tragique et des personnages nobles','L\'absence de personnages','L\'utilisation exclusive de la rime'],
    answer:'Une fin heureuse et des situations comiques',
    hint:'La comédie fait rire et se termine bien.',
    explanation:'La <b>comédie</b> est un genre théâtral caractérisé par des situations comiques, des personnages souvent ordinaires et une <b>fin heureuse</b>. Molière est le maître de la comédie française.' }),

  makeMCQ({ id:'g8fr-litterature-014', chapterId:'g8fr-litterature', difficulty:2, subsection:'genres_caracteristiques',
    question:'Molière est célèbre pour ses comédies. Lequel de ces titres est l\'un des siens ?',
    options:['L\'Avare','Les Misérables','Madame Bovary','Notre-Dame de Paris'],
    answer:'L\'Avare',
    hint:'"L\'Avare" met en scène Harpagon, un homme obsédé par l\'argent.',
    explanation:'"<b>L\'Avare</b>" (1668) est une comédie de <b>Molière</b> (Jean-Baptiste Poquelin). Les Misérables et Notre-Dame de Paris sont de Victor Hugo ; Madame Bovary est de Gustave Flaubert.' }),

  makeMCQ({ id:'g8fr-litterature-015', chapterId:'g8fr-litterature', difficulty:3, subsection:'genres_caracteristiques',
    question:'Le roman "Madame Bovary" de Flaubert appartient au courant littéraire :',
    options:['Réaliste','Romantique','Surréaliste','Classique'],
    answer:'Réaliste',
    hint:'Ce roman décrit la société de province française du XIXe siècle avec précision.',
    explanation:'"<b>Madame Bovary</b>" (1857) de Gustave Flaubert est une œuvre du courant <b>réaliste</b> : il décrit avec précision et objectivité la société de province française, ses frustrations et ses illusions.' }),

  // ── Littérature — appreciation_textes ────────────────────────────────────

  makeMCQ({ id:'g8fr-litterature-016', chapterId:'g8fr-litterature', difficulty:2, subsection:'appreciation_textes',
    question:'Lire un texte de façon critique signifie :',
    options:['Analyser ses forces et faiblesses','Trouver uniquement ses fautes','Critiquer négativement l\'auteur','Lire très lentement mot par mot'],
    answer:'Analyser ses forces et faiblesses',
    hint:'La lecture critique va au-delà de la compréhension de base.',
    explanation:'La <b>lecture critique</b> implique d\'analyser le texte en profondeur : évaluer la qualité des arguments, identifier les figures de style, apprécier les intentions de l\'auteur et questionner les idées présentées.' }),

  makeMCQ({ id:'g8fr-litterature-017', chapterId:'g8fr-litterature', difficulty:3, subsection:'appreciation_textes',
    question:'La littérature mauricienne d\'expression française est marquée par :',
    options:['Le mélange des cultures et de l\'île','L\'absence de toute référence locale','Des thèmes uniquement européens','Des textes écrits seulement en créole'],
    answer:'Le mélange des cultures et de l\'île',
    hint:'Maurice est une île aux multiples cultures et cette richesse se reflète dans sa littérature.',
    explanation:'La littérature mauricienne d\'expression française est riche en diversité : elle reflète le <b>mélange des cultures</b> (africaine, indienne, européenne, créole), le rapport à <b>l\'île</b> et aux traditions locales.' }),

  // ── Littérature — reaction_litteraire ────────────────────────────────────

  makeMCQ({ id:'g8fr-litterature-018', chapterId:'g8fr-litterature', difficulty:1, subsection:'reaction_litteraire',
    question:'Pour exprimer qu\'un texte vous a ému, on peut dire :',
    options:['"Ce texte m\'a beaucoup touché."','"Ce texte contient beaucoup de mots."','"Ce texte a été écrit en 1850."','"Ce texte est vraiment très long."'],
    answer:'"Ce texte m\'a beaucoup touché."',
    hint:'La réaction littéraire exprime une émotion et la justifie.',
    explanation:'"<b>Ce texte m\'a beaucoup touché.</b>" exprime une émotion ("touché"), ce que les trois autres phrases ne font pas. Une bonne réaction ajoute ensuite la justification : "Ce texte m\'a profondément touché <b>parce que</b>..."' }),

  makeMCQ({ id:'g8fr-litterature-019', chapterId:'g8fr-litterature', difficulty:2, subsection:'reaction_litteraire',
    question:'Quelle est la différence entre une réaction littéraire et un résumé ?',
    options:['La réaction donne un avis ; le résumé n\'en donne pas','Le résumé donne un avis ; la réaction n\'en donne pas','La réaction est plus objective que le résumé','La réaction et le résumé disent la même chose'],
    answer:'La réaction donne un avis ; le résumé n\'en donne pas',
    hint:'Réaction = subjectif (émotions) ; résumé = objectif (faits).',
    explanation:'La <b>réaction littéraire</b> est subjective : elle exprime les émotions, impressions et opinions du lecteur face au texte. Le <b>résumé</b> est objectif : il retrace le contenu du texte sans jugement personnel.' }),

  makeMCQ({ id:'g8fr-litterature-020', chapterId:'g8fr-litterature', difficulty:3, subsection:'reaction_litteraire',
    question:'Pour justifier sa réaction à un texte, on doit :',
    options:['Citer des extraits précis du texte','Inventer des événements absents','Donner l\'avis de quelqu\'un d\'autre','Donner son opinion sans preuve'],
    answer:'Citer des extraits précis du texte',
    hint:'Une réaction bien argumentée s\'appuie sur des preuves tirées du texte.',
    explanation:'Une bonne réaction littéraire doit être <b>justifiée par des citations</b> précises du texte. Ex. : "Ce passage m\'a ému car l\'auteur écrit : [citation]." La citation est la preuve qui donne de la crédibilité à la réaction.' })

);
