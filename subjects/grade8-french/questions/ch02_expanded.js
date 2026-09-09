'use strict';
// Grade 8 Français — Expanded questions, all 5 chapters
// IDs continue from ch01_core.js: g8fr-co-013…, g8fr-eo-013…, etc.

STATIC_QUESTIONS.push(

  // ── Compréhension orale — schema_communication ───────────────────────────

  makeMCQ({ id:'g8fr-co-013', chapterId:'g8fr-co', difficulty:2, subsection:'schema_communication',
    question:'Dans le schéma de communication, le "contexte" désigne :',
    options:['L\'ensemble des circonstances (lieu, moment, situation) dans lesquelles la communication a lieu','Le niveau de langue utilisé','Le canal de transmission uniquement','Le volume de la voix'],
    answer:'L\'ensemble des circonstances (lieu, moment, situation) dans lesquelles la communication a lieu',
    hint:'Le contexte répond aux questions : Où ? Quand ? Dans quelle situation ?',
    explanation:'Le <b>contexte</b> englobe toutes les circonstances entourant la communication : le lieu, le moment, la relation entre les interlocuteurs et la situation sociale. Il influence fortement le sens du message.' }),

  makeMCQ({ id:'g8fr-co-014', chapterId:'g8fr-co', difficulty:3, subsection:'schema_communication',
    question:'Quand l\'émetteur et le récepteur ne partagent pas le même code, on parle de :',
    options:['Malentendus ou barrière linguistique','Bonne communication','Silence partagé','Message clair'],
    answer:'Malentendus ou barrière linguistique',
    hint:'Si on ne parle pas la même langue, on ne peut pas se comprendre.',
    explanation:'Si l\'émetteur et le récepteur ne partagent pas le même <b>code</b> (langue, signes), la communication échoue : il y a <b>malentendus</b> ou <b>barrière linguistique</b>. C\'est l\'un des obstacles fréquents à la communication.' }),

  makeMCQ({ id:'g8fr-co-015', chapterId:'g8fr-co', difficulty:2, subsection:'schema_communication',
    question:'Dans un message publicitaire télévisé, quel est le canal ?',
    options:['La télévision (support audiovisuel)','La langue française','Le produit vendu','L\'acteur dans la publicité'],
    answer:'La télévision (support audiovisuel)',
    hint:'Le canal est le moyen technique par lequel passe le message.',
    explanation:'Dans une publicité télévisée, le <b>canal</b> est la <b>télévision</b> — le support audiovisuel qui transmet le message de l\'émetteur (l\'entreprise) au récepteur (le téléspectateur).' }),

  // ── Compréhension orale — types_textes_oral ──────────────────────────────

  makeMCQ({ id:'g8fr-co-016', chapterId:'g8fr-co', difficulty:2, subsection:'types_textes_oral',
    question:'Une émission de radio où des auditeurs appellent pour donner leur avis est un exemple de :',
    options:['Conversation interactive (talk-show radiophonique)','Monologue','Conférence','Bulletin météo'],
    answer:'Conversation interactive (talk-show radiophonique)',
    hint:'Plusieurs personnes échangent leurs points de vue en direct.',
    explanation:'Un <b>talk-show radiophonique</b> avec appels d\'auditeurs est une conversation interactive où plusieurs locuteurs (animateur et auditeurs) échangent en direct. Les rôles d\'émetteur et récepteur s\'alternent.' }),

  makeMCQ({ id:'g8fr-co-017', chapterId:'g8fr-co', difficulty:3, subsection:'types_textes_oral',
    question:'Qu\'est-ce qui différencie un monologue d\'un dialogue ?',
    options:['Le monologue est prononcé par un seul locuteur ; le dialogue implique plusieurs interlocuteurs','Le monologue est plus long','Le dialogue est écrit uniquement','Le monologue est toujours narratif'],
    answer:'Le monologue est prononcé par un seul locuteur ; le dialogue implique plusieurs interlocuteurs',
    hint:'Mono = un seul ; dia = deux (ou plus).',
    explanation:'Le <b>monologue</b> est une prise de parole d\'un seul locuteur (ex. : un discours, un exposé). Le <b>dialogue</b> implique au moins deux interlocuteurs qui échangent à tour de rôle.' }),

  makeMCQ({ id:'g8fr-co-018', chapterId:'g8fr-co', difficulty:2, subsection:'types_textes_oral',
    question:'Un documentaire audio sur la faune marine est principalement un texte oral de type :',
    options:['Informatif et descriptif','Injonctif','Argumentatif','Narratif fictionnel'],
    answer:'Informatif et descriptif',
    hint:'Il informe sur des faits réels et décrit ce qu\'on ne peut pas voir.',
    explanation:'Un documentaire audio est <b>informatif</b> (transmet des connaissances) et <b>descriptif</b> (décrit les animaux, les milieux). Il s\'appuie sur des faits réels et utilise un vocabulaire scientifique.' }),

  // ── Compréhension orale — sens_contexte ──────────────────────────────────

  makeMCQ({ id:'g8fr-co-019', chapterId:'g8fr-co', difficulty:2, subsection:'sens_contexte',
    question:'Pourquoi le ton d\'un locuteur est-il important pour comprendre son message ?',
    options:['Le ton révèle les émotions et les intentions du locuteur que les mots seuls ne montrent pas','Le ton n\'a aucune importance','Le ton indique uniquement la vitesse de parole','Le ton remplace les mots'],
    answer:'Le ton révèle les émotions et les intentions du locuteur que les mots seuls ne montrent pas',
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
    options:['Une pause intentionnelle pour créer un effet de suspense ou d\'emphase','Une pause due à une erreur de lecture','Une très longue pause sans raison','Le silence entre deux paragraphes uniquement'],
    answer:'Une pause intentionnelle pour créer un effet de suspense ou d\'emphase',
    hint:'Le lecteur s\'arrête volontairement pour que les mots résonnent.',
    explanation:'Une <b>pause expressive</b> est une pause volontaire après ou avant un mot ou une phrase importante. Elle crée un effet de suspense, d\'emphase ou d\'émotion et aide l\'auditoire à absorber le message.' }),

  makeMCQ({ id:'g8fr-eo-014', chapterId:'g8fr-eo', difficulty:2, subsection:'lecture_expressive',
    question:'Pour lire un texte poétique à voix haute, il faut :',
    options:['Respecter le rythme des vers, marquer les rimes et varier l\'intonation','Lire à la même vitesse que la prose','Ignorer les strophes','Ne pas prononcer les mots en "-e" muet'],
    answer:'Respecter le rythme des vers, marquer les rimes et varier l\'intonation',
    hint:'La poésie a un rythme et une musique propres qu\'il faut faire entendre.',
    explanation:'Lire un poème à voix haute demande de <b>respecter le rythme</b> des vers (le nombre de syllabes), de <b>mettre en valeur les rimes</b> et de <b>varier l\'intonation</b> pour faire sentir les émotions du texte.' }),

  makeMCQ({ id:'g8fr-eo-015', chapterId:'g8fr-eo', difficulty:3, subsection:'lecture_expressive',
    question:'Quelle est la différence entre la "diction" et la "prononciation" ?',
    options:['La diction est l\'art de parler avec clarté et expression ; la prononciation est l\'émission correcte des sons','Ils sont synonymes','La diction s\'applique uniquement à l\'écriture','La prononciation ne concerne que les voyelles'],
    answer:'La diction est l\'art de parler avec clarté et expression ; la prononciation est l\'émission correcte des sons',
    hint:'La diction englobe la prononciation mais va plus loin.',
    explanation:'La <b>prononciation</b> est l\'émission correcte des sons d\'une langue. La <b>diction</b> est l\'art de s\'exprimer clairement avec le ton, le rythme et l\'expression appropriés — c\'est une compétence plus large.' }),

  // ── Expression orale — conversation_multi ────────────────────────────────

  makeMCQ({ id:'g8fr-eo-016', chapterId:'g8fr-eo', difficulty:2, subsection:'conversation_multi',
    question:'Lors d\'une discussion en groupe, pourquoi est-il important de reformuler les idées des autres ?',
    options:['Pour montrer qu\'on a compris et pour clarifier le débat','Pour montrer qu\'on est meilleur','Pour remplir le temps','Pour critiquer l\'autre'],
    answer:'Pour montrer qu\'on a compris et pour clarifier le débat',
    hint:'Reformuler = répéter avec ses propres mots pour confirmer la compréhension.',
    explanation:'<b>Reformuler</b> l\'idée d\'un autre ("Si je comprends bien, tu veux dire que...") montre qu\'on a écouté attentivement, clarifie d\'éventuelles confusions et améliore la qualité du débat.' }),

  makeMCQ({ id:'g8fr-eo-017', chapterId:'g8fr-eo', difficulty:3, subsection:'conversation_multi',
    question:'Quelle est la différence entre "débattre" et "disputer" ?',
    options:['Débattre est un échange argumenté et respectueux ; disputer implique souvent de l\'agressivité et des conflits','Ils sont identiques','Débattre est informel ; disputer est formel','Disputer utilise plus d\'arguments'],
    answer:'Débattre est un échange argumenté et respectueux ; disputer implique souvent de l\'agressivité et des conflits',
    hint:'Un débat est organisé et respectueux ; une dispute est émotionnelle.',
    explanation:'<b>Débattre</b> est un échange organisé où chacun défend ses arguments avec respect et logique. <b>Se disputer</b> implique souvent des émotions fortes, de l\'agressivité et peu d\'arguments raisonnés.' }),

  // ── Expression orale — lexique_varie ─────────────────────────────────────

  makeMCQ({ id:'g8fr-eo-018', chapterId:'g8fr-eo', difficulty:1, subsection:'lexique_varie',
    question:'Quel mot est plus précis que "chose" pour désigner un instrument de musique ?',
    options:['Un violon (ou tout autre instrument spécifique)','Un machin','Un truc','Un objet quelconque'],
    answer:'Un violon (ou tout autre instrument spécifique)',
    hint:'Un mot précis remplace avantageusement les mots vagues comme "chose" ou "truc".',
    explanation:'Un vocabulaire précis évite les mots vagues ("chose", "truc", "machin"). <b>Nommer précisément</b> (un violon, une flûte, un piano) montre une maîtrise du lexique et améliore la communication.' }),

  makeMCQ({ id:'g8fr-eo-019', chapterId:'g8fr-eo', difficulty:2, subsection:'lexique_varie',
    question:'Quelle est la différence entre le "vocabulaire actif" et le "vocabulaire passif" ?',
    options:['Le vocabulaire actif est utilisé à l\'oral et à l\'écrit ; le passif est compris mais pas utilisé','Ils sont identiques','Le passif est plus riche','L\'actif est uniquement oral'],
    answer:'Le vocabulaire actif est utilisé à l\'oral et à l\'écrit ; le passif est compris mais pas utilisé',
    hint:'On comprend plus de mots qu\'on n\'en utilise spontanément.',
    explanation:'Le <b>vocabulaire actif</b> regroupe les mots qu\'on utilise spontanément. Le <b>vocabulaire passif</b> comprend les mots qu\'on comprend quand on les lit ou les entend mais qu\'on n\'utilise pas soi-même.' }),

  makeMCQ({ id:'g8fr-eo-020', chapterId:'g8fr-eo', difficulty:3, subsection:'lexique_varie',
    question:'Pour parler de l\'environnement marin avec précision, il vaut mieux utiliser :',
    options:['Des termes scientifiques comme "coraux", "phytoplancton", "récif"','Des mots vagues comme "plantes marines"','Uniquement des adjectifs','Des métaphores uniquement'],
    answer:'Des termes scientifiques comme "coraux", "phytoplancton", "récif"',
    hint:'Un lexique précis et varié montre une maîtrise du sujet.',
    explanation:'Utiliser un <b>lexique précis et varié</b> — "coraux", "phytoplancton", "récif corallien" — montre une maîtrise du domaine et permet de communiquer avec exactitude sur des sujets spécialisés.' }),

  // ── Compréhension écrite — idee_implicite ────────────────────────────────

  makeMCQ({ id:'g8fr-ce-013', chapterId:'g8fr-ce', difficulty:1, subsection:'idee_implicite',
    question:'Que signifie "lire entre les lignes" ?',
    options:['Comprendre ce qui est sous-entendu mais non dit directement','Lire les notes de bas de page','Lire chaque ligne deux fois','Souligner chaque mot'],
    answer:'Comprendre ce qui est sous-entendu mais non dit directement',
    hint:'"Entre les lignes" = ce qui n\'est pas écrit mais qu\'on peut déduire.',
    explanation:'"<b>Lire entre les lignes</b>" signifie décoder les informations implicites — ce que l\'auteur suggère sans le dire explicitement. C\'est une compétence de lecture avancée.' }),

  makeMCQ({ id:'g8fr-ce-014', chapterId:'g8fr-ce', difficulty:3, subsection:'idee_implicite',
    question:'Dans la phrase : "Elle regardait l\'horloge pour la dixième fois", quelle information est implicite ?',
    options:['Elle s\'impatiente ou attend quelque chose avec anxiété','Elle aime les horloges','L\'horloge est très belle','Il est tard'],
    answer:'Elle s\'impatiente ou attend quelque chose avec anxiété',
    hint:'Regarder l\'horloge plusieurs fois exprime de l\'impatience.',
    explanation:'La phrase ne dit pas explicitement qu\'elle s\'impatiente, mais <b>regarder l\'horloge pour la dixième fois</b> le suggère fortement. C\'est une information implicite que le lecteur déduit du comportement décrit.' }),

  makeMCQ({ id:'g8fr-ce-015', chapterId:'g8fr-ce', difficulty:2, subsection:'idee_implicite',
    question:'Pour repérer les informations implicites dans un texte, on doit :',
    options:['Analyser les mots choisis, les actions des personnages et le contexte','Lire uniquement les mots en gras','Compter les paragraphes','Ignorer les adverbes'],
    answer:'Analyser les mots choisis, les actions des personnages et le contexte',
    hint:'L\'implicite se cache dans les détails : les mots choisis, les gestes, le contexte.',
    explanation:'Les informations implicites se trouvent dans les <b>choix lexicaux</b> (mots positifs ou négatifs), les <b>actions des personnages</b> et le <b>contexte</b>. Il faut analyser ces éléments pour déduire ce que l\'auteur ne dit pas directement.' }),

  // ── Compréhension écrite — registres_langue ──────────────────────────────

  makeMCQ({ id:'g8fr-ce-016', chapterId:'g8fr-ce', difficulty:2, subsection:'registres_langue',
    question:'Quelle phrase appartient au registre soutenu ?',
    options:['"Je vous serais reconnaissant de bien vouloir m\'indiquer..."','"T\'aurais pas cinq minutes ?"','"Donne-moi l\'info."','"Ça me fait chier."'],
    answer:'"Je vous serais reconnaissant de bien vouloir m\'indiquer..."',
    hint:'Cette formule est longue, polie et utilise le conditionnel de politesse.',
    explanation:'"<b>Je vous serais reconnaissant de bien vouloir m\'indiquer...</b>" est une formulation soutenue avec le conditionnel de politesse et un vocabulaire formel. C\'est le style des lettres officielles.' }),

  makeMCQ({ id:'g8fr-ce-017', chapterId:'g8fr-ce', difficulty:3, subsection:'registres_langue',
    question:'L\'identification du registre de langue d\'un personnage dans un roman peut indiquer :',
    options:['Son niveau social, son éducation ou sa relation avec l\'interlocuteur','Uniquement son âge','La nationalité de l\'auteur','Le genre du roman'],
    answer:'Son niveau social, son éducation ou sa relation avec l\'interlocuteur',
    hint:'La façon de parler d\'un personnage révèle beaucoup sur lui.',
    explanation:'Le <b>registre de langue</b> d\'un personnage est un indice de son niveau social, son éducation et sa relation avec l\'interlocuteur. Un personnage cultivé utilisera un registre soutenu ; un personnage issu des classes populaires, un registre familier.' }),

  makeMCQ({ id:'g8fr-ce-018', chapterId:'g8fr-ce', difficulty:2, subsection:'registres_langue',
    question:'Le registre courant est utilisé :',
    options:['Dans la communication quotidienne standard : journaux, conversations normales, cours','Uniquement dans la littérature classique','Seulement entre amis proches','Dans les textes scientifiques uniquement'],
    answer:'Dans la communication quotidienne standard : journaux, conversations normales, cours',
    hint:'Le registre courant est le niveau intermédiaire — ni trop formel, ni trop familier.',
    explanation:'Le <b>registre courant</b> est le niveau de langue standard utilisé dans la communication ordinaire : articles de journaux, cours, conversations professionnelles non formelles. Il respecte les règles grammaticales sans être pompeux.' }),

  // ── Compréhension écrite — analyse_texte ─────────────────────────────────

  makeMCQ({ id:'g8fr-ce-019', chapterId:'g8fr-ce', difficulty:2, subsection:'analyse_texte',
    question:'Une comparaison est une figure de style qui :',
    options:['Compare deux éléments à l\'aide d\'un outil comparatif ("comme", "tel que", "pareil à")','Compare sans outil comparatif','Attribue des qualités humaines aux objets','Répète les mêmes sons'],
    answer:'Compare deux éléments à l\'aide d\'un outil comparatif ("comme", "tel que", "pareil à")',
    hint:'La comparaison utilise toujours un mot comparatif explicite.',
    explanation:'La <b>comparaison</b> associe deux éléments en utilisant un outil comparatif : "comme", "tel que", "pareil à". Ex. : "Il est fort <b>comme</b> un lion." À distinguer de la métaphore, qui supprime l\'outil comparatif.' }),

  makeMCQ({ id:'g8fr-ce-020', chapterId:'g8fr-ce', difficulty:3, subsection:'analyse_texte',
    question:'L\'hyperbole est une figure de style qui consiste à :',
    options:['Exagérer volontairement pour produire un effet fort','Minimiser la réalité','Comparer deux choses','Répéter une idée deux fois'],
    answer:'Exagérer volontairement pour produire un effet fort',
    hint:'"Je l\'ai dit mille fois" — vraiment mille fois ? C\'est une exagération.',
    explanation:'L\'<b>hyperbole</b> est une exagération volontaire pour produire un effet fort. Ex. : "Je meurs de faim" (on n\'est pas en train de mourir), "C\'est une montagne de travail" (il y a beaucoup de travail).' }),

  makeMCQ({ id:'g8fr-ce-021', chapterId:'g8fr-ce', difficulty:2, subsection:'analyse_texte',
    question:'Analyser les temps verbaux dans un texte permet de :',
    options:['Comprendre la chronologie des événements et les intentions de l\'auteur','Uniquement trouver les verbes conjugués','Compter les phrases','Identifier les personnages'],
    answer:'Comprendre la chronologie des événements et les intentions de l\'auteur',
    hint:'Les temps verbaux situent les événements dans le temps.',
    explanation:'Analyser les <b>temps verbaux</b> révèle la chronologie (imparfait pour des habitudes, passé composé pour des actions précises, présent pour des faits universels) et les intentions de l\'auteur (suspense, retour en arrière).' }),

  // ── Expression écrite — textes_fonctionnels_divers ───────────────────────

  makeMCQ({ id:'g8fr-ee-013', chapterId:'g8fr-ee', difficulty:1, subsection:'textes_fonctionnels_divers',
    question:'Un curriculum vitae (CV) est un texte fonctionnel qui sert à :',
    options:['Présenter ses compétences, son expérience et sa formation pour trouver un emploi ou une formation','Raconter sa vie en détail comme un roman','Exprimer ses émotions','Défendre une opinion politique'],
    answer:'Présenter ses compétences, son expérience et sa formation pour trouver un emploi ou une formation',
    hint:'Le CV est le premier document qu\'on envoie à un employeur.',
    explanation:'Un <b>curriculum vitae (CV)</b> est un document fonctionnel qui présente de façon structurée et concise : l\'identité, les études, les expériences professionnelles et les compétences d\'une personne.' }),

  makeMCQ({ id:'g8fr-ee-014', chapterId:'g8fr-ee', difficulty:2, subsection:'textes_fonctionnels_divers',
    question:'Un rapport de stage doit être rédigé dans un style :',
    options:['Objectif, factuel et bien structuré, sans opinions personnelles excessives','Très émotionnel et personnel','Informel et avec beaucoup d\'humour','En créole ou en anglais uniquement'],
    answer:'Objectif, factuel et bien structuré, sans opinions personnelles excessives',
    hint:'Un rapport professionnel doit être neutre et factuel.',
    explanation:'Un <b>rapport de stage</b> doit être <b>objectif</b> (décrire les faits sans jugements personnels excessifs), <b>factuel</b> (basé sur des observations réelles) et <b>bien structuré</b> (introduction, développement, conclusion).' }),

  makeMCQ({ id:'g8fr-ee-015', chapterId:'g8fr-ee', difficulty:3, subsection:'textes_fonctionnels_divers',
    question:'Dans une pétition, l\'objectif principal est de :',
    options:['Collecter des signatures pour soutenir une cause ou demander un changement','Raconter une histoire','Expliquer un concept scientifique','Vendre un produit'],
    answer:'Collecter des signatures pour soutenir une cause ou demander un changement',
    hint:'Une pétition est signée par de nombreuses personnes pour montrer leur soutien.',
    explanation:'Une <b>pétition</b> est un texte fonctionnel qui demande le soutien de nombreuses personnes (par leurs signatures) pour défendre une cause ou demander un changement à une autorité.' }),

  // ── Expression écrite — resume_opinion ───────────────────────────────────

  makeMCQ({ id:'g8fr-ee-016', chapterId:'g8fr-ee', difficulty:2, subsection:'resume_opinion',
    question:'Dans un résumé, que doit-on absolument éviter ?',
    options:['D\'ajouter ses propres opinions ou des informations absentes du texte original','De garder les idées principales','D\'utiliser ses propres mots','D\'être concis'],
    answer:'D\'ajouter ses propres opinions ou des informations absentes du texte original',
    hint:'Un résumé reproduit les idées de l\'auteur, pas les siennes.',
    explanation:'Un résumé doit être fidèle au texte original : on ne doit pas y ajouter ses <b>opinions personnelles</b> ni des informations externes. On reformule les idées de l\'auteur avec ses propres mots.' }),

  makeMCQ({ id:'g8fr-ee-017', chapterId:'g8fr-ee', difficulty:3, subsection:'resume_opinion',
    question:'Comment distinguer un fait d\'une opinion dans un article de journal ?',
    options:['Un fait est vérifiable et neutre ("En 2023, la température a augmenté de 1,5°C") ; une opinion est subjective ("Je crois que c\'est catastrophique")','Ils sont indistinguables','Les faits sont toujours en gras','Les opinions sont toujours en début d\'article'],
    answer:'Un fait est vérifiable et neutre ("En 2023, la température a augmenté de 1,5°C") ; une opinion est subjective ("Je crois que c\'est catastrophique")',
    hint:'Un fait peut être prouvé ; une opinion dépend du point de vue.',
    explanation:'Un <b>fait</b> est vérifiable, objectif et peut être confirmé par des données. Une <b>opinion</b> est subjective et exprime un point de vue personnel. Les journalistes doivent clairement distinguer les deux.' }),

  makeMCQ({ id:'g8fr-ee-018', chapterId:'g8fr-ee', difficulty:2, subsection:'resume_opinion',
    question:'Quelle longueur un résumé devrait-il avoir par rapport au texte original ?',
    options:['Environ un quart (1/4) de la longueur du texte original','Exactement la même longueur','Le double','Une seule phrase'],
    answer:'Environ un quart (1/4) de la longueur du texte original',
    hint:'Un résumé doit être nettement plus court que le texte de départ.',
    explanation:'Un <b>résumé</b> doit être significativement plus court que le texte original — généralement <b>environ 1/4</b> de sa longueur. Il ne retient que les idées essentielles, sans les détails ni les exemples.' }),

  // ── Expression écrite — structure_coherente ──────────────────────────────

  makeMCQ({ id:'g8fr-ee-019', chapterId:'g8fr-ee', difficulty:2, subsection:'structure_coherente',
    question:'La "progression thématique" dans un texte signifie que :',
    options:['Chaque phrase apporte une information nouvelle qui fait avancer le texte','Les phrases sont toutes identiques','Le texte revient constamment en arrière','Les paragraphes sont dans le désordre'],
    answer:'Chaque phrase apporte une information nouvelle qui fait avancer le texte',
    hint:'Le texte progresse — il ne tourne pas en rond.',
    explanation:'La <b>progression thématique</b> est le principe selon lequel chaque phrase ajoute une information nouvelle par rapport à la précédente, faisant avancer le texte logiquement vers sa conclusion.' }),

  makeMCQ({ id:'g8fr-ee-020', chapterId:'g8fr-ee', difficulty:3, subsection:'structure_coherente',
    question:'Dans un texte argumentatif, la "concession" consiste à :',
    options:['Reconnaître un argument de l\'adversaire avant de le réfuter ou de nuancer sa propre position','Abandonner complètement sa thèse','Répéter ses arguments plus fort','Ignorer les arguments opposés'],
    answer:'Reconnaître un argument de l\'adversaire avant de le réfuter ou de nuancer sa propre position',
    hint:'On reconnaît ce qui est vrai dans l\'argument opposé avant de montrer ses limites.',
    explanation:'La <b>concession</b> est une technique argumentative : on reconnaît la validité partielle de l\'argument adverse ("Certes... / Il est vrai que...") avant de l\'atténuer ou de le réfuter ("Cependant... / Néanmoins...").' }),

  makeMCQ({ id:'g8fr-ee-021', chapterId:'g8fr-ee', difficulty:2, subsection:'structure_coherente',
    question:'Pour assurer la cohérence d\'un texte, quel outil évite les répétitions du même nom ?',
    options:['Les pronoms (il, elle, ils, ce...) et les synonymes','Les points de suspension','Les guillemets','Les tirets'],
    answer:'Les pronoms (il, elle, ils, ce...) et les synonymes',
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
    options:['Analyser ses points forts, ses faiblesses et son message, pas seulement le comprendre','Trouver uniquement les fautes','Critiquer négativement l\'auteur','Lire très lentement mot par mot'],
    answer:'Analyser ses points forts, ses faiblesses et son message, pas seulement le comprendre',
    hint:'La lecture critique va au-delà de la compréhension de base.',
    explanation:'La <b>lecture critique</b> implique d\'analyser le texte en profondeur : évaluer la qualité des arguments, identifier les figures de style, apprécier les intentions de l\'auteur et questionner les idées présentées.' }),

  makeMCQ({ id:'g8fr-litterature-017', chapterId:'g8fr-litterature', difficulty:3, subsection:'appreciation_textes',
    question:'La littérature mauricienne d\'expression française est marquée par :',
    options:['Le mélange des cultures, la diversité ethnique et le rapport à l\'île','Uniquement des thèmes européens','L\'absence de références locales','Des textes uniquement en créole'],
    answer:'Le mélange des cultures, la diversité ethnique et le rapport à l\'île',
    hint:'Maurice est une île aux multiples cultures et cette richesse se reflète dans sa littérature.',
    explanation:'La littérature mauricienne d\'expression française est riche en diversité : elle reflète le <b>mélange des cultures</b> (africaine, indienne, européenne, créole), le rapport à <b>l\'île</b> et aux traditions locales.' }),

  // ── Littérature — reaction_litteraire ────────────────────────────────────

  makeMCQ({ id:'g8fr-litterature-018', chapterId:'g8fr-litterature', difficulty:1, subsection:'reaction_litteraire',
    question:'Pour exprimer qu\'un texte vous a ému, on peut dire :',
    options:['"Ce texte m\'a profondément touché parce que..."','"Ce texte est très long."','"Ce texte contient beaucoup de mots."','"Ce texte a été écrit en 1850."'],
    answer:'"Ce texte m\'a profondément touché parce que..."',
    hint:'La réaction littéraire exprime une émotion et la justifie.',
    explanation:'"<b>Ce texte m\'a profondément touché parce que...</b>" est une formule de réaction littéraire qui exprime une émotion ("touché") et l\'introduit avec une justification ("parce que"). C\'est la structure d\'une bonne réaction.' }),

  makeMCQ({ id:'g8fr-litterature-019', chapterId:'g8fr-litterature', difficulty:2, subsection:'reaction_litteraire',
    question:'Quelle est la différence entre une réaction littéraire et un résumé ?',
    options:['La réaction exprime ce qu\'on ressent face au texte ; le résumé retrace le contenu sans opinion','Ils sont identiques','Le résumé est plus personnel','La réaction est plus objective'],
    answer:'La réaction exprime ce qu\'on ressent face au texte ; le résumé retrace le contenu sans opinion',
    hint:'Réaction = subjectif (émotions) ; résumé = objectif (faits).',
    explanation:'La <b>réaction littéraire</b> est subjective : elle exprime les émotions, impressions et opinions du lecteur face au texte. Le <b>résumé</b> est objectif : il retrace le contenu du texte sans jugement personnel.' }),

  makeMCQ({ id:'g8fr-litterature-020', chapterId:'g8fr-litterature', difficulty:3, subsection:'reaction_litteraire',
    question:'Pour justifier sa réaction à un texte, on doit :',
    options:['Citer des extraits précis du texte qui illustrent ce qu\'on a ressenti','Inventer des événements qui n\'y sont pas','Donner l\'avis de quelqu\'un d\'autre','Ne donner que son opinion sans preuve'],
    answer:'Citer des extraits précis du texte qui illustrent ce qu\'on a ressenti',
    hint:'Une réaction bien argumentée s\'appuie sur des preuves tirées du texte.',
    explanation:'Une bonne réaction littéraire doit être <b>justifiée par des citations</b> précises du texte. Ex. : "Ce passage m\'a ému car l\'auteur écrit : [citation]." La citation est la preuve qui donne de la crédibilité à la réaction.' })

);
