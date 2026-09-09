'use strict';
// Grade 7 Français — Expanded questions, all 5 chapters
// IDs continue from ch01_core.js: g7fr-co-013…, g7fr-eo-013…, etc.

STATIC_QUESTIONS.push(

  // ── Compréhension orale — type_texte_oral ────────────────────────────────

  makeMCQ({ id:'g7fr-co-013', chapterId:'g7fr-co', difficulty:1, subsection:'type_texte_oral',
    question:'Un texte oral qui décrit un lieu, un objet ou une personne avec des détails est un texte :',
    options:['Descriptif','Injonctif','Argumentatif','Poétique'],
    answer:'Descriptif',
    hint:'Ce type de texte "peint" avec des mots.',
    explanation:'Un texte <b>descriptif</b> donne une image précise d\'un lieu, d\'une personne ou d\'un objet en utilisant des adjectifs et des détails sensoriels.' }),

  makeMCQ({ id:'g7fr-co-014', chapterId:'g7fr-co', difficulty:2, subsection:'type_texte_oral',
    question:'Un discours de campagne électorale est principalement un texte oral :',
    options:['Argumentatif et persuasif','Descriptif','Narratif','Injonctif'],
    answer:'Argumentatif et persuasif',
    hint:'Le candidat veut convaincre les électeurs de voter pour lui.',
    explanation:'Un <b>discours de campagne</b> est à la fois argumentatif (il présente des arguments) et persuasif (il cherche à convaincre l\'auditoire de voter pour le candidat).' }),

  makeMCQ({ id:'g7fr-co-015', chapterId:'g7fr-co', difficulty:2, subsection:'type_texte_oral',
    question:'Le texte oral lu lors d\'une cérémonie de remise de prix est généralement de type :',
    options:['Discours solennel (informatif et laudatif)','Injonctif','Narratif','Argumentatif'],
    answer:'Discours solennel (informatif et laudatif)',
    hint:'Ce texte félicite et informe sur les réalisations des lauréats.',
    explanation:'Un discours de remise de prix est <b>solennel</b> : il informe sur les mérites des lauréats et les félicite (texte laudatif). Il a un registre soutenu.' }),

  makeMCQ({ id:'g7fr-co-016', chapterId:'g7fr-co', difficulty:3, subsection:'type_texte_oral',
    question:'Quel type de texte oral utilise principalement des verbes à l\'impératif ?',
    options:['Le texte injonctif','Le texte narratif','Le texte descriptif','Le texte informatif'],
    answer:'Le texte injonctif',
    hint:'L\'impératif exprime un ordre ou une instruction.',
    explanation:'Le texte <b>injonctif</b> donne des ordres ou des instructions et utilise fréquemment l\'impératif (ex. : "Mélangez", "Tournez à droite", "Ne touchez pas") ou l\'infinitif.' }),

  // ── Compréhension orale — locuteur_message ───────────────────────────────

  makeMCQ({ id:'g7fr-co-017', chapterId:'g7fr-co', difficulty:2, subsection:'locuteur_message',
    question:'Quand un locuteur utilise "vous" pour s\'adresser à quelqu\'un, cela indique généralement :',
    options:['Une situation formelle ou un respect de la personne','Une situation familière entre amis','Un message écrit','Une erreur grammaticale'],
    answer:'Une situation formelle ou un respect de la personne',
    hint:'Le "vous" de politesse marque la distance et le respect.',
    explanation:'L\'utilisation du <b>"vous"</b> de politesse indique une relation formelle ou respectueuse. Le "tu" est réservé aux situations informelles (amis, famille).' }),

  makeMCQ({ id:'g7fr-co-018', chapterId:'g7fr-co', difficulty:2, subsection:'locuteur_message',
    question:'Le "feedback" ou la rétroaction dans une communication, c\'est :',
    options:['La réponse du récepteur qui confirme que le message a été reçu','La qualité de la voix du locuteur','Le bruit de fond','Le sujet du message'],
    answer:'La réponse du récepteur qui confirme que le message a été reçu',
    hint:'Le récepteur réagit pour montrer qu\'il a compris.',
    explanation:'Le <b>feedback</b> (rétroaction) est la réponse du récepteur qui confirme la réception du message. Ex. : hocher la tête, dire "je comprends", poser une question.' }),

  makeMCQ({ id:'g7fr-co-019', chapterId:'g7fr-co', difficulty:3, subsection:'locuteur_message',
    question:'Dans une interview, le journaliste est principalement :',
    options:['Le locuteur qui pose des questions et l\'interlocuteur qui répond','Toujours le récepteur','Uniquement l\'émetteur','Ni locuteur ni interlocuteur'],
    answer:'Le locuteur qui pose des questions et l\'interlocuteur qui répond',
    hint:'Dans une interview, les rôles s\'inversent constamment.',
    explanation:'Dans une interview, le journaliste et l\'invité échangent les rôles : le journaliste est d\'abord <b>locuteur</b> (pose la question) puis <b>interlocuteur</b> (écoute la réponse), et vice versa.' }),

  // ── Compréhension orale — vocabulaire_oral ───────────────────────────────

  makeMCQ({ id:'g7fr-co-020', chapterId:'g7fr-co', difficulty:1, subsection:'vocabulaire_oral',
    question:'Que signifie "s\'exprimer clairement" ?',
    options:['Parler de façon compréhensible, avec des mots précis et une bonne articulation','Parler très vite','Utiliser des mots très rares','Chuchoter'],
    answer:'Parler de façon compréhensible, avec des mots précis et une bonne articulation',
    hint:'Clairement = de façon que tout le monde comprend facilement.',
    explanation:'<b>S\'exprimer clairement</b> signifie choisir des mots précis, articuler correctement et organiser ses idées pour que l\'interlocuteur comprenne sans difficulté.' }),

  makeMCQ({ id:'g7fr-co-021', chapterId:'g7fr-co', difficulty:2, subsection:'vocabulaire_oral',
    question:'Un "propos" à l\'oral désigne :',
    options:['Ce qu\'une personne dit, ses paroles','Un texte écrit','Un bruit de fond','Une image'],
    answer:'Ce qu\'une personne dit, ses paroles',
    hint:'"Tenir des propos" = dire quelque chose.',
    explanation:'Les <b>propos</b> désignent l\'ensemble de ce qu\'une personne dit lors d\'une communication orale. Ex. : "Il a tenu des propos encourageants."' }),

  makeMCQ({ id:'g7fr-co-022', chapterId:'g7fr-co', difficulty:3, subsection:'vocabulaire_oral',
    question:'Quelle est la différence entre "entendre" et "écouter" ?',
    options:['Entendre est passif (percevoir des sons) ; écouter est actif (prêter attention volontairement)','Ils signifient exactement la même chose','Entendre est un effort ; écouter est automatique','Entendre s\'utilise seulement pour la musique'],
    answer:'Entendre est passif (percevoir des sons) ; écouter est actif (prêter attention volontairement)',
    hint:'On "entend" sans le vouloir ; on "écoute" avec intention.',
    explanation:'<b>Entendre</b> est involontaire : on perçoit des sons. <b>Écouter</b> est volontaire : on prête attention à ce qu\'on entend. C\'est la différence entre perception et attention.' }),

  // ── Expression orale — lecture_voix_haute ────────────────────────────────

  makeMCQ({ id:'g7fr-eo-013', chapterId:'g7fr-eo', difficulty:1, subsection:'lecture_voix_haute',
    question:'Que signifie "phrasé" lors d\'une lecture à voix haute ?',
    options:['La façon de regrouper les mots en unités de sens avec les pauses appropriées','La vitesse de lecture uniquement','Le nombre de phrases dans un texte','L\'orthographe des mots'],
    answer:'La façon de regrouper les mots en unités de sens avec les pauses appropriées',
    hint:'Le phrasé rend la lecture naturelle et compréhensible.',
    explanation:'Le <b>phrasé</b> désigne la façon dont on regroupe les mots en groupes de sens lors d\'une lecture, en respectant les pauses et la logique de la phrase.' }),

  makeMCQ({ id:'g7fr-eo-014', chapterId:'g7fr-eo', difficulty:2, subsection:'lecture_voix_haute',
    question:'Pour lire un dialogue à voix haute, il faut :',
    options:['Changer de ton selon le personnage qui parle','Toujours lire à la même vitesse','Ignorer les tirets','Ne pas marquer les pauses'],
    answer:'Changer de ton selon le personnage qui parle',
    hint:'Chaque personnage a sa propre façon de parler.',
    explanation:'Dans la lecture d\'un dialogue, il est essentiel de <b>différencier les voix</b> des personnages en changeant de ton, d\'intonation ou de rythme pour que l\'auditeur distingue qui parle.' }),

  makeMCQ({ id:'g7fr-eo-015', chapterId:'g7fr-eo', difficulty:2, subsection:'lecture_voix_haute',
    question:'Comment marque-t-on une question lors d\'une lecture à voix haute ?',
    options:['En montant la voix en fin de phrase','En baissant la voix en fin de phrase','En lisant très vite','En faisant une longue pause avant'],
    answer:'En montant la voix en fin de phrase',
    hint:'L\'intonation monte pour les questions en français.',
    explanation:'En français, l\'intonation <b>monte</b> à la fin d\'une phrase interrogative (question). Elle <b>descend</b> à la fin d\'une phrase déclarative (affirmation).' }),

  // ── Expression orale — expression_confiance ──────────────────────────────

  makeMCQ({ id:'g7fr-eo-016', chapterId:'g7fr-eo', difficulty:1, subsection:'expression_confiance',
    question:'Quelle est la posture correcte pour s\'exprimer à l\'oral avec confiance ?',
    options:['Se tenir droit, pieds légèrement écartés, tête levée','S\'asseoir par terre','Croiser les bras sur la poitrine','Se cacher derrière un livre'],
    answer:'Se tenir droit, pieds légèrement écartés, tête levée',
    hint:'La posture du corps communique de la confiance avant même de parler.',
    explanation:'Une <b>posture assurée</b> — dos droit, tête levée, pieds stables — transmet de la confiance à l\'auditoire. Le langage corporel renforce ou contredit le message verbal.' }),

  makeMCQ({ id:'g7fr-eo-017', chapterId:'g7fr-eo', difficulty:2, subsection:'expression_confiance',
    question:'Lorsqu\'on doit parler de son environnement immédiat à l\'oral, on peut évoquer :',
    options:['Sa famille, son quartier, son école, ses habitudes quotidiennes','Uniquement les événements historiques','Des sujets de politique internationale','Les mathématiques exclusivement'],
    answer:'Sa famille, son quartier, son école, ses habitudes quotidiennes',
    hint:'L\'environnement immédiat est ce qui entoure la vie quotidienne.',
    explanation:'<b>L\'environnement immédiat</b> comprend tout ce qui fait partie du quotidien : la famille, les amis, le quartier, l\'école, les loisirs. Ces sujets sont familiers et faciles à aborder avec confiance.' }),

  makeMCQ({ id:'g7fr-eo-018', chapterId:'g7fr-eo', difficulty:3, subsection:'expression_confiance',
    question:'Si on perd le fil de ses idées en parlant, quelle est la meilleure réaction ?',
    options:['Faire une courte pause, reprendre ses esprits, puis continuer calmement','Quitter la salle immédiatement','Parler encore plus vite','Répéter la même phrase en boucle'],
    answer:'Faire une courte pause, reprendre ses esprits, puis continuer calmement',
    hint:'Une pause bien gérée montre du sang-froid, pas une faiblesse.',
    explanation:'Perdre le fil est normal. La meilleure réaction est de <b>faire une pause</b>, respirer, reformuler et continuer. Les auditeurs apprécient le calme plus que la précipitation.' }),

  // ── Expression orale — lexique_approprie ─────────────────────────────────

  makeMCQ({ id:'g7fr-eo-019', chapterId:'g7fr-eo', difficulty:1, subsection:'lexique_approprie',
    question:'Quel mot est un synonyme du verbe "parler" dans un registre soutenu ?',
    options:['S\'exprimer','Causer','Jacter','Blablater'],
    answer:'S\'exprimer',
    hint:'"S\'exprimer" est plus formel que "parler".',
    explanation:'"<b>S\'exprimer</b>" est un synonyme formel de "parler". "Causer" est familier. "Jacter" et "blablater" sont argotiques et à éviter dans un contexte scolaire ou professionnel.' }),

  makeMCQ({ id:'g7fr-eo-020', chapterId:'g7fr-eo', difficulty:2, subsection:'lexique_approprie',
    question:'Pour exprimer son désaccord poliment en classe, on peut dire :',
    options:['"Permettez-moi de nuancer cette idée..."','"Tu as tort !"','"C\'est nul."','"N\'importe quoi !"'],
    answer:'"Permettez-moi de nuancer cette idée..."',
    hint:'"Nuancer" signifie apporter des précisions ou des corrections polies.',
    explanation:'"<b>Permettez-moi de nuancer...</b>" est une formule polie pour exprimer un désaccord partiel. Elle montre qu\'on respecte l\'interlocuteur tout en proposant une correction.' }),

  makeMCQ({ id:'g7fr-eo-021', chapterId:'g7fr-eo', difficulty:3, subsection:'lexique_approprie',
    question:'Quel connecteur oral convient pour introduire un exemple ?',
    options:['Par exemple','Cependant','En conclusion','Pourtant'],
    answer:'Par exemple',
    hint:'"Par exemple" annonce une illustration de l\'idée qu\'on vient d\'énoncer.',
    explanation:'"<b>Par exemple</b>", "notamment", "c\'est le cas de" sont des connecteurs qui introduisent un exemple illustrant une idée. "Cependant" et "pourtant" expriment une opposition.' }),

  // ── Compréhension écrite — idee_principale ───────────────────────────────

  makeMCQ({ id:'g7fr-ce-013', chapterId:'g7fr-ce', difficulty:1, subsection:'idee_principale',
    question:'Le titre d\'un texte est souvent lié à :',
    options:['L\'idée principale du texte','La dernière phrase du texte','Un détail secondaire','Le nom de l\'auteur uniquement'],
    answer:'L\'idée principale du texte',
    hint:'Le titre annonce souvent ce dont parle le texte.',
    explanation:'Le <b>titre</b> d\'un texte est généralement un indice fort de son idée principale. Il résume ou annonce le sujet central de façon concise.' }),

  makeMCQ({ id:'g7fr-ce-014', chapterId:'g7fr-ce', difficulty:2, subsection:'idee_principale',
    question:'Dans quel paragraphe l\'idée principale se trouve-t-elle le plus souvent ?',
    options:['Souvent dans le premier ou le dernier paragraphe, ou les deux','Uniquement au milieu du texte','Dans les notes de bas de page','Jamais dans le texte'],
    answer:'Souvent dans le premier ou le dernier paragraphe, ou les deux',
    hint:'Les auteurs annoncent souvent le sujet au début et le récapitulent à la fin.',
    explanation:'L\'idée principale se trouve généralement dans le <b>premier paragraphe</b> (introduction du sujet) ou le <b>dernier paragraphe</b> (conclusion). Parfois, elle est annoncée dès la première phrase.' }),

  makeMCQ({ id:'g7fr-ce-015', chapterId:'g7fr-ce', difficulty:3, subsection:'idee_principale',
    question:'Un texte traite de : la montée du niveau de la mer, la fonte des glaciers et la fréquence des cyclones. Quelle est l\'idée principale ?',
    options:['Les conséquences du changement climatique','Les glaciers de l\'Arctique','Les cyclones dans l\'océan Indien','Le niveau de la mer uniquement'],
    answer:'Les conséquences du changement climatique',
    hint:'Quel thème commun relie ces trois phénomènes ?',
    explanation:'La montée des eaux, la fonte des glaciers et les cyclones sont tous des <b>conséquences du changement climatique</b>. C\'est l\'idée commune qui unit ces trois sujets.' }),

  // ── Compréhension écrite — information_explicite ─────────────────────────

  makeMCQ({ id:'g7fr-ce-016', chapterId:'g7fr-ce', difficulty:1, subsection:'information_explicite',
    question:'Lisez : "Le dodo (Raphus cucullatus) a disparu vers 1693 à Maurice." Quelle information est explicite ?',
    options:['Le dodo a disparu vers 1693','Le dodo était un oiseau rapide','Le dodo vivait en Asie','Le dodo existait encore au XIXe siècle'],
    answer:'Le dodo a disparu vers 1693',
    hint:'La date est clairement mentionnée dans le texte.',
    explanation:'La phrase indique explicitement que le dodo a disparu <b>vers 1693</b>. Les autres affirmations ne sont pas présentes dans la phrase donnée.' }),

  makeMCQ({ id:'g7fr-ce-017', chapterId:'g7fr-ce', difficulty:2, subsection:'information_explicite',
    question:'Comment distingue-t-on une information explicite d\'une information implicite ?',
    options:['L\'explicite est clairement écrite ; l\'implicite doit être déduite des indices','L\'explicite est cachée ; l\'implicite est directe','Elles sont identiques','L\'explicite est toujours fausse'],
    answer:'L\'explicite est clairement écrite ; l\'implicite doit être déduite des indices',
    hint:'Explicite = dit directement ; implicite = suggéré entre les lignes.',
    explanation:'Une information <b>explicite</b> est énoncée directement dans le texte. Une information <b>implicite</b> n\'est pas dite mais peut être déduite du contexte.' }),

  makeMCQ({ id:'g7fr-ce-018', chapterId:'g7fr-ce', difficulty:3, subsection:'information_explicite',
    question:'Pour répondre à une question de compréhension écrite, la meilleure méthode est :',
    options:['Repérer les mots-clés de la question, les chercher dans le texte, puis formuler la réponse','Inventer une réponse de tête','Copier entièrement un paragraphe','Répondre sans relire le texte'],
    answer:'Repérer les mots-clés de la question, les chercher dans le texte, puis formuler la réponse',
    hint:'Les mots-clés de la question guident vers l\'endroit où se trouve la réponse.',
    explanation:'La méthode efficace : identifier les <b>mots-clés</b> de la question, les localiser dans le texte, lire ce passage attentivement, puis reformuler la réponse avec ses propres mots.' }),

  // ── Compréhension écrite — vocabulaire ───────────────────────────────────

  makeMCQ({ id:'g7fr-ce-019', chapterId:'g7fr-ce', difficulty:1, subsection:'vocabulaire',
    question:'Quel est l\'antonyme du mot "rapide" ?',
    options:['Lent','Vif','Prompt','Agile'],
    answer:'Lent',
    hint:'L\'antonyme est le contraire.',
    explanation:'"<b>Lent</b>" est l\'antonyme de "rapide". "Vif", "prompt" et "agile" sont des synonymes de "rapide".' }),

  makeMCQ({ id:'g7fr-ce-020', chapterId:'g7fr-ce', difficulty:2, subsection:'vocabulaire',
    question:'Le mot "lumineux" vient du latin "lumen" qui signifie "lumière". Ce type d\'analyse s\'appelle :',
    options:['L\'étymologie','La syntaxe','La ponctuation','L\'intonation'],
    answer:'L\'étymologie',
    hint:'L\'étymologie étudie l\'origine des mots.',
    explanation:'L\'<b>étymologie</b> est l\'étude de l\'origine et de l\'évolution des mots. Connaître les racines latines ou grecques aide à comprendre le sens de nombreux mots français.' }),

  makeMCQ({ id:'g7fr-ce-021', chapterId:'g7fr-ce', difficulty:3, subsection:'vocabulaire',
    question:'Dans la phrase : "La mer était calme mais le vent s\'est levé brusquement", que signifie "brusquement" ?',
    options:['De façon soudaine et rapide','Lentement','Doucement','Régulièrement'],
    answer:'De façon soudaine et rapide',
    hint:'"Brusque" signifie soudain, sans préavis.',
    explanation:'"<b>Brusquement</b>" est un adverbe qui signifie de façon soudaine et rapide, sans préparation. L\'adjectif correspondant est "brusque" (ex. : un geste brusque).' }),

  // ── Expression écrite — textes_fonctionnels ──────────────────────────────

  makeMCQ({ id:'g7fr-ee-013', chapterId:'g7fr-ee', difficulty:1, subsection:'textes_fonctionnels',
    question:'Lequel de ces textes est fonctionnel ?',
    options:['Un mode d\'emploi d\'une machine à laver','Un poème romantique','Un roman de science-fiction','Une chanson populaire'],
    answer:'Un mode d\'emploi d\'une machine à laver',
    hint:'Ce texte a une utilité pratique et donne des instructions.',
    explanation:'Un <b>mode d\'emploi</b> est un texte fonctionnel (injonctif) : il explique comment utiliser un appareil étape par étape. Il a un but pratique précis.' }),

  makeMCQ({ id:'g7fr-ee-014', chapterId:'g7fr-ee', difficulty:2, subsection:'textes_fonctionnels',
    question:'Une annonce de vente d\'un vélo sur internet est un texte fonctionnel de type :',
    options:['Informatif et incitatif','Narratif','Argumentatif long','Poétique'],
    answer:'Informatif et incitatif',
    hint:'L\'annonce informe sur le produit et incite à l\'achat.',
    explanation:'Une <b>annonce de vente</b> est informatif (décrit l\'objet, donne le prix) et incitatif (cherche à convaincre d\'acheter). Elle doit être claire, précise et courte.' }),

  makeMCQ({ id:'g7fr-ee-015', chapterId:'g7fr-ee', difficulty:2, subsection:'textes_fonctionnels',
    question:'Quelle est la structure correcte d\'une lettre formelle ?',
    options:['Lieu et date — Destinataire — Objet — Corps — Formule de politesse — Signature','Signature — Corps — Date — Objet','Corps — Destinataire — Signature','Date — Corps — Objet — Formule'],
    answer:'Lieu et date — Destinataire — Objet — Corps — Formule de politesse — Signature',
    hint:'La lettre formelle a une structure très codifiée.',
    explanation:'La structure d\'une <b>lettre formelle</b> : lieu et date (en haut à droite), destinataire (en haut à gauche), objet, corps (introduction + développement + conclusion), formule de politesse, signature.' }),

  makeMCQ({ id:'g7fr-ee-016', chapterId:'g7fr-ee', difficulty:3, subsection:'textes_fonctionnels',
    question:'Dans un texte injonctif, quel mode verbal est le plus souvent utilisé ?',
    options:['L\'impératif','Le conditionnel','Le subjonctif','L\'imparfait'],
    answer:'L\'impératif',
    hint:'L\'impératif donne des ordres et des instructions.',
    explanation:'Le texte injonctif utilise surtout l\'<b>impératif</b> ("Ajoutez", "Mélangez") ou l\'infinitif ("Ajouter", "Mélanger"). Ces formes verbales donnent des instructions directes.' }),

  // ── Expression écrite — organisation_paragraphes ─────────────────────────

  makeMCQ({ id:'g7fr-ee-017', chapterId:'g7fr-ee', difficulty:1, subsection:'organisation_paragraphes',
    question:'Quel connecteur logique utilise-t-on pour indiquer l\'ordre chronologique d\'abord ?',
    options:['Premièrement / D\'abord','Cependant','En conclusion','Donc'],
    answer:'Premièrement / D\'abord',
    hint:'Ce connecteur introduit la première idée dans une liste ordonnée.',
    explanation:'"<b>Premièrement</b>" et "<b>d\'abord</b>" indiquent le début d\'une énumération ou d\'une séquence chronologique. Ils s\'utilisent avec "deuxièmement", "ensuite", "enfin".' }),

  makeMCQ({ id:'g7fr-ee-018', chapterId:'g7fr-ee', difficulty:2, subsection:'organisation_paragraphes',
    question:'Qu\'est-ce qu\'un alinéa ?',
    options:['Un retrait en début de paragraphe qui indique le début d\'une nouvelle idée','Une faute d\'orthographe','Un type de ponctuation','Un synonyme de "paragraphe"'],
    answer:'Un retrait en début de paragraphe qui indique le début d\'une nouvelle idée',
    hint:'On laisse un espace avant d\'écrire le premier mot d\'un paragraphe.',
    explanation:'Un <b>alinéa</b> est le retrait (espace) au début d\'un paragraphe. Il marque visuellement le début d\'une nouvelle idée et aide le lecteur à suivre la structure du texte.' }),

  makeMCQ({ id:'g7fr-ee-019', chapterId:'g7fr-ee', difficulty:3, subsection:'organisation_paragraphes',
    question:'Pour relier deux paragraphes de façon fluide, on utilise :',
    options:['Une phrase de transition qui reprend l\'idée précédente et annonce la suivante','Un titre entre les deux','Des points de suspension','Un dessin'],
    answer:'Une phrase de transition qui reprend l\'idée précédente et annonce la suivante',
    hint:'La transition assure la cohésion du texte entre deux parties.',
    explanation:'Une <b>phrase de transition</b> crée un lien logique entre deux paragraphes : elle récapitule brièvement l\'idée précédente et introduit la suivante, assurant la cohérence du texte.' }),

  // ── Expression écrite — correction_syntaxe ───────────────────────────────

  makeMCQ({ id:'g7fr-ee-020', chapterId:'g7fr-ee', difficulty:1, subsection:'correction_syntaxe',
    question:'Dans la phrase "Les oiseaux chantent joyeusement", quel est le sujet ?',
    options:['Les oiseaux','Chantent','Joyeusement','La phrase entière'],
    answer:'Les oiseaux',
    hint:'Le sujet répond à la question : "Qui est-ce qui chante ?"',
    explanation:'"<b>Les oiseaux</b>" est le sujet de la phrase. C\'est le groupe nominal qui fait l\'action exprimée par le verbe "chantent".' }),

  makeMCQ({ id:'g7fr-ee-021', chapterId:'g7fr-ee', difficulty:2, subsection:'correction_syntaxe',
    question:'Quelle est la forme négative correcte de "Il mange du pain" ?',
    options:['Il ne mange pas de pain.','Il mange pas du pain.','Il ne pas mange pain.','Pas il mange pain.'],
    answer:'Il ne mange pas de pain.',
    hint:'La négation en français utilise "ne...pas" et l\'article partitif change.',
    explanation:'La forme négative est "<b>Il ne mange pas de pain</b>." À la forme négative, l\'article partitif "du" devient "de" (ou "d\'"). La structure est : ne + verbe + pas.' }),

  makeMCQ({ id:'g7fr-ee-022', chapterId:'g7fr-ee', difficulty:3, subsection:'correction_syntaxe',
    question:'Dans quelle phrase le participe passé est-il correctement accordé ?',
    options:['Les filles sont arrivées en retard.','Les filles sont arrivé en retard.','Les filles est arrivées en retard.','Les fille sont arrivée en retard.'],
    answer:'Les filles sont arrivées en retard.',
    hint:'Avec "être", le participe passé s\'accorde avec le sujet.',
    explanation:'"<b>Les filles sont arrivées</b>" est correct : le participe passé "arrivées" s\'accorde avec le sujet féminin pluriel "les filles". Avec l\'auxiliaire "être", le participe s\'accorde toujours avec le sujet.' }),

  // ── Littérature — genres_litteraires ─────────────────────────────────────

  makeMCQ({ id:'g7fr-litterature-013', chapterId:'g7fr-litterature', difficulty:1, subsection:'genres_litteraires',
    question:'Une fable est :',
    options:['Un court récit fictif, souvent avec des animaux, qui se termine par une morale','Un texte scientifique','Une pièce de théâtre avec de nombreux actes','Un poème sans rime'],
    answer:'Un court récit fictif, souvent avec des animaux, qui se termine par une morale',
    hint:'La Fontaine a écrit des fables célèbres.',
    explanation:'Une <b>fable</b> est un court récit allégorique (souvent avec des animaux) qui illustre une leçon de vie appelée <b>morale</b>. Jean de La Fontaine est le maître de ce genre en français.' }),

  makeMCQ({ id:'g7fr-litterature-014', chapterId:'g7fr-litterature', difficulty:2, subsection:'genres_litteraires',
    question:'Victor Hugo est célèbre pour ses romans. Lequel de ces titres est l\'un des siens ?',
    options:['Les Misérables','Robinson Crusoé','Don Quichotte','Oliver Twist'],
    answer:'Les Misérables',
    hint:'Ce roman se passe en France au XIXe siècle et raconte l\'histoire de Jean Valjean.',
    explanation:'"<b>Les Misérables</b>" (1862) est l\'un des romans les plus célèbres de <b>Victor Hugo</b>, auteur français du XIXe siècle. Robinson Crusoé est de Defoe, Don Quichotte de Cervantès, Oliver Twist de Dickens.' }),

  makeMCQ({ id:'g7fr-litterature-015', chapterId:'g7fr-litterature', difficulty:2, subsection:'genres_litteraires',
    question:'La rime dans un poème, c\'est :',
    options:['La répétition du même son à la fin de deux vers ou plus','Le nombre de syllabes dans un vers','La ponctuation du poème','Le titre du poème'],
    answer:'La répétition du même son à la fin de deux vers ou plus',
    hint:'Les rimes rendent un poème musical.',
    explanation:'La <b>rime</b> est la répétition du même son à la fin de deux vers ou plus. Ex. : "Les sanglots longs / Des violons / De l\'automne" — la rime est en "-ons".' }),

  // ── Littérature — types_textes ────────────────────────────────────────────

  makeMCQ({ id:'g7fr-litterature-016', chapterId:'g7fr-litterature', difficulty:1, subsection:'types_textes',
    question:'Un texte argumentatif cherche à :',
    options:['Convaincre le lecteur d\'adopter un point de vue ou de changer d\'opinion','Raconter une histoire','Décrire un paysage','Donner des instructions'],
    answer:'Convaincre le lecteur d\'adopter un point de vue ou de changer d\'opinion',
    hint:'"Argumenter" = donner des raisons pour défendre une position.',
    explanation:'Un texte <b>argumentatif</b> présente des arguments pour défendre une thèse et convaincre le lecteur. Il est courant dans les éditoriaux, les essais et les discours.' }),

  makeMCQ({ id:'g7fr-litterature-017', chapterId:'g7fr-litterature', difficulty:2, subsection:'types_textes',
    question:'Quel type de texte commence généralement par "Il était une fois" ?',
    options:['Le texte narratif (conte)','Le texte descriptif','Le texte injonctif','Le texte argumentatif'],
    answer:'Le texte narratif (conte)',
    hint:'"Il était une fois" est la formule d\'ouverture classique des contes.',
    explanation:'"Il était une fois" est la formule traditionnelle d\'ouverture d\'un <b>conte</b>, qui est un texte narratif. Elle situe l\'histoire dans un temps indéfini et magique.' }),

  makeMCQ({ id:'g7fr-litterature-018', chapterId:'g7fr-litterature', difficulty:3, subsection:'types_textes',
    question:'Quel type de texte utilise le plus souvent les cinq sens pour créer une image mentale ?',
    options:['Le texte descriptif','Le texte injonctif','Le texte argumentatif','Le texte informatif'],
    answer:'Le texte descriptif',
    hint:'"Voir, entendre, sentir, toucher, goûter" — ces détails appartiennent à la description.',
    explanation:'Le texte <b>descriptif</b> fait appel aux cinq sens pour créer une représentation vivante d\'un lieu, d\'un personnage ou d\'un objet dans l\'esprit du lecteur.' }),

  // ── Littérature — conte_bd ────────────────────────────────────────────────

  makeMCQ({ id:'g7fr-litterature-019', chapterId:'g7fr-litterature', difficulty:1, subsection:'conte_bd',
    question:'Dans les contes traditionnels, les personnages sont souvent :',
    options:['Soit entièrement bons (héros) soit entièrement mauvais (méchants)','Toujours des animaux','Uniquement des enfants','Des personnages historiques réels'],
    answer:'Soit entièrement bons (héros) soit entièrement mauvais (méchants)',
    hint:'Dans les contes, les personnages sont souvent manichéens (bon ou mauvais, sans nuance).',
    explanation:'Dans les contes traditionnels, les personnages sont souvent <b>manichéens</b> : le héros est entièrement bon, le méchant entièrement mauvais. Il n\'y a pas de nuances psychologiques.' }),

  makeMCQ({ id:'g7fr-litterature-020', chapterId:'g7fr-litterature', difficulty:2, subsection:'conte_bd',
    question:'Dans une bande dessinée, les onomatopées servent à :',
    options:['Représenter des sons par des mots écrits (BOUM !, SPLASH !, CRAC !)','Décrire les personnages','Donner la morale de la BD','Indiquer le lieu de l\'action'],
    answer:'Représenter des sons par des mots écrits (BOUM !, SPLASH !, CRAC !)',
    hint:'Les onomatopées imitent les sons par des mots.',
    explanation:'Les <b>onomatopées</b> dans une BD représentent visuellement des sons : BOUM (explosion), SPLASH (eau), CRAC (cassure). Elles rendent la BD plus vivante et dynamique.' }),

  makeMCQ({ id:'g7fr-litterature-021', chapterId:'g7fr-litterature', difficulty:3, subsection:'conte_bd',
    question:'Le conte "La Belle et la Bête" transmet comme morale principale que :',
    options:['La beauté intérieure compte plus que la beauté extérieure','Les bêtes sont toujours dangereuses','Il faut toujours obéir à ses parents','Les châteaux sont des lieux dangereux'],
    answer:'La beauté intérieure compte plus que la beauté extérieure',
    hint:'Belle aime la Bête malgré son apparence effrayante.',
    explanation:'Dans "La Belle et la Bête", la morale est que la <b>beauté intérieure</b> (la bonté, la gentillesse) est plus importante que la beauté physique. Belle apprend à aimer la Bête pour sa bonté.' })

);
