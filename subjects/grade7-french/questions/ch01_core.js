'use strict';
// Grade 7 Français — Core questions, all 5 chapters
// IDs: g7fr-co-001…, g7fr-eo-001…, g7fr-ce-001…, g7fr-ee-001…, g7fr-litterature-001…

STATIC_QUESTIONS.push(

  // ── Compréhension orale — type_texte_oral ────────────────────────────────

  makeMCQ({ id:'g7fr-co-001', chapterId:'g7fr-co', difficulty:1, subsection:'type_texte_oral',
    question:'Un texte oral qui raconte une histoire avec des personnages est un texte :',
    options:['Narratif','Injonctif','Descriptif','Informatif'],
    answer:'Narratif',
    hint:'Ce type de texte raconte des événements dans un ordre.',
    explanation:'Un texte <b>narratif</b> raconte une histoire avec des personnages, des lieux et des événements.' }),

  makeMCQ({ id:'g7fr-co-002', chapterId:'g7fr-co', difficulty:1, subsection:'type_texte_oral',
    question:'Un texte oral qui donne des instructions ou des ordres est un texte :',
    options:['Injonctif','Narratif','Poétique','Descriptif'],
    answer:'Injonctif',
    hint:'Ce type de texte dit quoi faire — il utilise souvent l\'impératif.',
    explanation:'Un texte <b>injonctif</b> donne des instructions, des ordres ou des conseils. Exemple : une recette de cuisine lue à voix haute.' }),

  makeMCQ({ id:'g7fr-co-003', chapterId:'g7fr-co', difficulty:2, subsection:'type_texte_oral',
    question:'Un bulletin météo entendu à la radio est un exemple de texte oral :',
    options:['Informatif','Narratif','Injonctif','Poétique'],
    answer:'Informatif',
    hint:'Il donne des informations sur la pluie, le soleil et le vent.',
    explanation:'Un <b>texte informatif</b> transmet des informations objectives. Le bulletin météo informe les auditeurs des conditions atmosphériques.' }),

  makeMCQ({ id:'g7fr-co-004', chapterId:'g7fr-co', difficulty:2, subsection:'type_texte_oral',
    question:'Un débat à la radio où deux personnes défendent des opinions opposées est un texte :',
    options:['Argumentatif','Descriptif','Narratif','Injonctif'],
    answer:'Argumentatif',
    hint:'Dans ce type de texte, les locuteurs essaient de convaincre.',
    explanation:'Un texte <b>argumentatif</b> présente des arguments pour défendre ou contredire une opinion.' }),

  makeMCQ({ id:'g7fr-co-005', chapterId:'g7fr-co', difficulty:1, subsection:'type_texte_oral',
    question:'Une publicité entendue à la télévision qui vante un produit est surtout un texte :',
    options:['Persuasif','Narratif','Poétique','Informatif'],
    answer:'Persuasif',
    hint:'Son but est de vous convaincre d\'acheter quelque chose.',
    explanation:'Un texte <b>persuasif</b> cherche à influencer le comportement ou l\'opinion de l\'auditeur.' }),

  // ── Compréhension orale — locuteur_message ───────────────────────────────

  makeMCQ({ id:'g7fr-co-006', chapterId:'g7fr-co', difficulty:1, subsection:'locuteur_message',
    question:'Le locuteur est la personne qui :',
    options:['Parle','Écoute','Lit un livre','Écrit une lettre'],
    answer:'Parle',
    hint:'Le locuteur prend la parole dans une situation de communication.',
    explanation:'Le <b>locuteur</b> est celui qui parle dans une situation de communication. L\'interlocuteur est celui qui l\'écoute.' }),

  makeMCQ({ id:'g7fr-co-007', chapterId:'g7fr-co', difficulty:1, subsection:'locuteur_message',
    question:'L\'interlocuteur est la personne qui :',
    options:['Reçoit le message et écoute','Parle en premier','Écrit le message','Diffuse le message à la radio'],
    answer:'Reçoit le message et écoute',
    hint:'L\'inter-locuteur est celui à qui l\'on s\'adresse.',
    explanation:'L\'<b>interlocuteur</b> est celui qui reçoit le message du locuteur. Dans un dialogue, les rôles de locuteur et d\'interlocuteur s\'inversent.' }),

  makeMCQ({ id:'g7fr-co-008', chapterId:'g7fr-co', difficulty:2, subsection:'locuteur_message',
    question:'Dans un message oral, l\'intention du locuteur peut être de :',
    options:['Informer, convaincre ou divertir','Écrire une lettre','Corriger une dictée','Lire un roman'],
    answer:'Informer, convaincre ou divertir',
    hint:'Pourquoi le locuteur prend-il la parole ?',
    explanation:'Le locuteur peut avoir différentes intentions : <b>informer</b> (donner des informations), <b>convaincre</b> (changer une opinion) ou <b>divertir</b> (amuser).' }),

  makeMCQ({ id:'g7fr-co-009', chapterId:'g7fr-co', difficulty:2, subsection:'locuteur_message',
    question:'Pour identifier le message principal d\'un texte oral, on doit :',
    options:['Écouter attentivement et retenir l\'idée centrale','Répéter chaque mot entendu','Écrire toutes les phrases','Regarder les images'],
    answer:'Écouter attentivement et retenir l\'idée centrale',
    hint:'Il faut distinguer les informations importantes des détails secondaires.',
    explanation:'L\'idée centrale est le message principal que le locuteur veut transmettre. Une <b>écoute active</b> permet de la repérer.' }),

  makeMCQ({ id:'g7fr-co-010', chapterId:'g7fr-co', difficulty:3, subsection:'locuteur_message',
    question:'Dans un dialogue, comment sait-on que le locuteur change ?',
    options:['Une nouvelle voix prend la parole ou une réplique commence','Le texte s\'arrête','Les mots deviennent plus longs','Le sujet change complètement'],
    answer:'Une nouvelle voix prend la parole ou une réplique commence',
    hint:'Dans un dialogue écrit, chaque nouvelle réplique correspond à un locuteur différent.',
    explanation:'Dans un <b>dialogue</b>, on repère le changement de locuteur au changement de voix (à l\'oral) ou au tiret et à la nouvelle réplique (à l\'écrit).' }),

  // ── Compréhension orale — vocabulaire_oral ───────────────────────────────

  makeMCQ({ id:'g7fr-co-011', chapterId:'g7fr-co', difficulty:1, subsection:'vocabulaire_oral',
    question:'Que signifie "écouter attentivement" ?',
    options:['Prêter une grande attention à ce qu\'on entend','Parler fort','Écrire rapidement','Regarder la télévision'],
    answer:'Prêter une grande attention à ce qu\'on entend',
    hint:'"Attentivement" veut dire avec beaucoup d\'attention.',
    explanation:'<b>Écouter attentivement</b> signifie se concentrer pleinement sur ce que dit le locuteur, sans se laisser distraire.' }),

  makeMCQ({ id:'g7fr-co-012', chapterId:'g7fr-co', difficulty:2, subsection:'vocabulaire_oral',
    question:'L\'intonation sert à :',
    options:['Exprimer des émotions et donner du sens à la phrase','Écrire sans fautes','Trouver les synonymes','Conjuguer les verbes'],
    answer:'Exprimer des émotions et donner du sens à la phrase',
    hint:'L\'intonation, c\'est la façon dont la voix monte ou descend.',
    explanation:'L\'<b>intonation</b> est la variation de la hauteur de la voix. Elle permet d\'exprimer la joie, la surprise, la colère ou de distinguer une question d\'une affirmation.' }),

  // ── Expression orale — lecture_voix_haute ────────────────────────────────

  makeMCQ({ id:'g7fr-eo-001', chapterId:'g7fr-eo', difficulty:1, subsection:'lecture_voix_haute',
    question:'Lire à voix haute avec expression signifie :',
    options:['Varier le ton, le rythme et l\'intensité de sa voix','Lire le plus vite possible','Chuchoter pour ne pas déranger','Sauter les mots difficiles'],
    answer:'Varier le ton, le rythme et l\'intensité de sa voix',
    hint:'Une lecture expressive rend le texte vivant et intéressant.',
    explanation:'Une bonne lecture à voix haute implique de <b>varier le ton</b> (grave/aigu), le <b>rythme</b> (lent/rapide) et l\'<b>intensité</b> (fort/doux) pour donner vie au texte.' }),

  makeMCQ({ id:'g7fr-eo-002', chapterId:'g7fr-eo', difficulty:1, subsection:'lecture_voix_haute',
    question:'Que signifie "respecter la ponctuation" lors d\'une lecture à voix haute ?',
    options:['Faire une pause à la virgule et un arrêt au point','Ignorer les signes de ponctuation','Lire toutes les phrases à la même vitesse','Sauter les paragraphes'],
    answer:'Faire une pause à la virgule et un arrêt au point',
    hint:'La ponctuation guide le lecteur sur où s\'arrêter.',
    explanation:'La <b>ponctuation</b> indique au lecteur les pauses. La virgule (,) marque une courte pause ; le point (.) marque un arrêt ; le point d\'exclamation exprime une émotion forte.' }),

  makeMCQ({ id:'g7fr-eo-003', chapterId:'g7fr-eo', difficulty:2, subsection:'lecture_voix_haute',
    question:'Pourquoi est-il important de bien articuler lors d\'une lecture à voix haute ?',
    options:['Pour que l\'auditeur comprenne clairement chaque mot','Pour lire plus vite','Pour impressionner le professeur','Pour éviter d\'apprendre le texte'],
    answer:'Pour que l\'auditeur comprenne clairement chaque mot',
    hint:'Une bonne articulation rend la parole compréhensible.',
    explanation:'<b>Articuler</b> signifie prononcer clairement chaque son et chaque syllabe. Cela permet à l\'auditeur de comprendre sans effort.' }),

  makeMCQ({ id:'g7fr-eo-004', chapterId:'g7fr-eo', difficulty:2, subsection:'lecture_voix_haute',
    question:'Le débit d\'une lecture orale, c\'est :',
    options:['La vitesse à laquelle on lit','Le volume de la voix','La qualité de la voix','Le nombre de mots dans le texte'],
    answer:'La vitesse à laquelle on lit',
    hint:'"Débit" vient du verbe "débiter" — distribuer des mots.',
    explanation:'Le <b>débit</b> désigne la vitesse de lecture. Un débit trop rapide rend la compréhension difficile ; un débit trop lent ennuie l\'auditeur.' }),

  // ── Expression orale — expression_confiance ──────────────────────────────

  makeMCQ({ id:'g7fr-eo-005', chapterId:'g7fr-eo', difficulty:1, subsection:'expression_confiance',
    question:'Pour s\'exprimer avec confiance à l\'oral, il faut :',
    options:['Regarder son auditoire et parler clairement','Chuchoter et regarder par terre','Lire ses notes sans lever les yeux','Parler très vite pour finir rapidement'],
    answer:'Regarder son auditoire et parler clairement',
    hint:'Le contact visuel montre qu\'on est sûr de ce qu\'on dit.',
    explanation:'S\'exprimer avec <b>confiance</b> implique de regarder son auditoire (contact visuel), de parler clairement et à un rythme approprié.' }),

  makeMCQ({ id:'g7fr-eo-006', chapterId:'g7fr-eo', difficulty:2, subsection:'expression_confiance',
    question:'Quand on parle de soi à l\'oral, quel pronom doit-on utiliser ?',
    options:['Je','Il','Tu','Nous'],
    answer:'Je',
    hint:'Pour parler de soi-même, on utilise la première personne du singulier.',
    explanation:'La première personne du singulier <b>"je"</b> est utilisée lorsqu\'on parle de soi-même, de ses expériences et de ses opinions.' }),

  makeMCQ({ id:'g7fr-eo-007', chapterId:'g7fr-eo', difficulty:2, subsection:'expression_confiance',
    question:'Pour mieux s\'exprimer à l\'oral sur un sujet qu\'on connaît, on peut :',
    options:['Préparer ses idées à l\'avance','Parler sans réfléchir','Copier ce que les autres disent','Refuser de prendre la parole'],
    answer:'Préparer ses idées à l\'avance',
    hint:'La préparation donne de l\'assurance.',
    explanation:'<b>Préparer ses idées</b> avant de parler permet de s\'exprimer plus clairement et avec plus de confiance. On peut noter les points principaux.' }),

  makeMCQ({ id:'g7fr-eo-008', chapterId:'g7fr-eo', difficulty:3, subsection:'expression_confiance',
    question:'Lorsqu\'on hésite en parlant, quelle expression peut-on utiliser pour gagner du temps ?',
    options:['"C\'est-à-dire..." ou "En d\'autres termes..."','Arrêter de parler','Parler plus vite','Répéter le même mot plusieurs fois'],
    answer:'"C\'est-à-dire..." ou "En d\'autres termes..."',
    hint:'Ces expressions permettent de reformuler et de mieux expliquer.',
    explanation:'Des expressions comme <b>"c\'est-à-dire"</b> ou <b>"en d\'autres termes"</b> permettent de reformuler une idée, de gagner du temps et de clarifier sa pensée.' }),

  // ── Expression orale — lexique_approprie ─────────────────────────────────

  makeMCQ({ id:'g7fr-eo-009', chapterId:'g7fr-eo', difficulty:1, subsection:'lexique_approprie',
    question:'Utiliser un lexique approprié signifie :',
    options:['Choisir les mots qui conviennent à la situation','Utiliser toujours les mêmes mots','Parler uniquement en créole','Inventer de nouveaux mots'],
    answer:'Choisir les mots qui conviennent à la situation',
    hint:'On ne parle pas de la même façon à son meilleur ami et à son directeur d\'école.',
    explanation:'Un <b>lexique approprié</b> signifie choisir les bons mots selon le contexte : un langage soutenu avec les adultes, un langage familier avec les amis.' }),

  makeMCQ({ id:'g7fr-eo-010', chapterId:'g7fr-eo', difficulty:2, subsection:'lexique_approprie',
    question:'Quel mot est un synonyme courant du verbe "regarder" ?',
    options:['Observer','Écouter','Toucher','Sentir'],
    answer:'Observer',
    hint:'Ce mot suggère une attention plus grande que "regarder".',
    explanation:'<b>Observer</b> est un synonyme de "regarder" qui implique une attention plus minutieuse. Avoir un bon vocabulaire, c\'est connaître plusieurs façons de dire la même chose.' }),

  makeMCQ({ id:'g7fr-eo-011', chapterId:'g7fr-eo', difficulty:2, subsection:'lexique_approprie',
    question:'Pour exprimer son accord à l\'oral, on peut dire :',
    options:['Je suis d\'accord avec toi.','Je n\'aime pas ça.','Tais-toi !','C\'est faux.'],
    answer:'Je suis d\'accord avec toi.',
    hint:'Cette expression montre qu\'on partage le même avis.',
    explanation:'<b>"Je suis d\'accord avec toi"</b> est une expression courante pour montrer son accord. D\'autres expressions : "En effet", "C\'est juste", "Tout à fait".' }),

  makeMCQ({ id:'g7fr-eo-012', chapterId:'g7fr-eo', difficulty:3, subsection:'lexique_approprie',
    question:'Dans un exposé oral, quel connecteur utilise-t-on pour ajouter une idée ?',
    options:['De plus','Cependant','Donc','Pourtant'],
    answer:'De plus',
    hint:'Ce connecteur indique une addition, pas une opposition.',
    explanation:'Le connecteur <b>"de plus"</b> (ou "en outre", "aussi") s\'utilise pour ajouter une idée supplémentaire. "Cependant" et "pourtant" expriment une opposition.' }),

  // ── Compréhension écrite — idee_principale ───────────────────────────────

  makeMCQ({ id:'g7fr-ce-001', chapterId:'g7fr-ce', difficulty:1, subsection:'idee_principale',
    question:'L\'idée principale d\'un texte est :',
    options:['L\'idée la plus importante, celle dont parle tout le texte','Le titre du texte','La dernière phrase du texte','Les mots difficiles'],
    answer:'L\'idée la plus importante, celle dont parle tout le texte',
    hint:'L\'idée principale résume ce dont parle l\'ensemble du texte.',
    explanation:'L\'<b>idée principale</b> est le message central du texte. Toutes les autres informations la développent ou l\'illustrent.' }),

  makeMCQ({ id:'g7fr-ce-002', chapterId:'g7fr-ce', difficulty:2, subsection:'idee_principale',
    question:'Comment trouve-t-on l\'idée principale d\'un texte ?',
    options:['En lisant le texte en entier et en demandant : "De quoi parle ce texte ?"','En lisant seulement la première phrase','En comptant les mots','En regardant les images'],
    answer:'En lisant le texte en entier et en demandant : "De quoi parle ce texte ?"',
    hint:'La question "De quoi parle ce texte ?" guide vers l\'idée principale.',
    explanation:'Pour dégager l\'<b>idée principale</b>, on lit le texte en entier, puis on se demande : "Quel est le sujet central ?" ou "Qu\'est-ce que l\'auteur veut dire essentiellement ?"' }),

  makeMCQ({ id:'g7fr-ce-003', chapterId:'g7fr-ce', difficulty:2, subsection:'idee_principale',
    question:'Les idées secondaires dans un texte servent à :',
    options:['Illustrer, expliquer ou compléter l\'idée principale','Remplacer l\'idée principale','Contredire l\'auteur','Former le titre du texte'],
    answer:'Illustrer, expliquer ou compléter l\'idée principale',
    hint:'Les idées secondaires apportent des détails supplémentaires.',
    explanation:'Les <b>idées secondaires</b> développent l\'idée principale en ajoutant des exemples, des précisions ou des explications.' }),

  makeMCQ({ id:'g7fr-ce-004', chapterId:'g7fr-ce', difficulty:3, subsection:'idee_principale',
    question:'Un texte parle de la pollution des océans, des espèces menacées et du réchauffement climatique. Quelle est l\'idée principale ?',
    options:['L\'environnement est en danger','Les poissons disparaissent','Il fait plus chaud chaque année','Les océans sont grands'],
    answer:'L\'environnement est en danger',
    hint:'Quelle idée regroupe tous ces sujets ?',
    explanation:'Les trois sujets (pollution, espèces menacées, réchauffement) parlent tous de menaces sur l\'environnement. L\'<b>idée principale</b> est donc que l\'environnement est en danger.' }),

  // ── Compréhension écrite — information_explicite ─────────────────────────

  makeMCQ({ id:'g7fr-ce-005', chapterId:'g7fr-ce', difficulty:1, subsection:'information_explicite',
    question:'Une information explicite dans un texte est une information qui est :',
    options:['Directement écrite dans le texte','Cachée entre les lignes','À deviner','Inventée par le lecteur'],
    answer:'Directement écrite dans le texte',
    hint:'"Explicite" vient du latin "explicitus" qui signifie "développé, clair".',
    explanation:'Une information <b>explicite</b> est clairement écrite dans le texte. On n\'a pas besoin de la déduire — elle est dite directement.' }),

  makeMCQ({ id:'g7fr-ce-006', chapterId:'g7fr-ce', difficulty:2, subsection:'information_explicite',
    question:'Dans la phrase : "Marie est née le 5 mars 2010 à Port-Louis", quelle information est explicite ?',
    options:['La date de naissance de Marie','Le métier de Marie','La couleur préférée de Marie','Les études de Marie'],
    answer:'La date de naissance de Marie',
    hint:'La date est clairement mentionnée dans la phrase.',
    explanation:'La phrase dit clairement que Marie est née <b>le 5 mars 2010</b>. Cette information est directement présente — c\'est une information explicite.' }),

  makeMCQ({ id:'g7fr-ce-007', chapterId:'g7fr-ce', difficulty:2, subsection:'information_explicite',
    question:'Pour repérer des informations explicites, on doit :',
    options:['Lire attentivement et souligner les informations importantes','Imaginer l\'histoire','Ne lire que le titre','Compter les paragraphes'],
    answer:'Lire attentivement et souligner les informations importantes',
    hint:'La lecture active consiste à marquer les informations clés.',
    explanation:'La <b>lecture active</b> — souligner, encadrer, annoter — aide à repérer les informations explicites directement présentes dans le texte.' }),

  makeMCQ({ id:'g7fr-ce-008', chapterId:'g7fr-ce', difficulty:3, subsection:'information_explicite',
    question:'Lisez : "Le colibri, le plus petit oiseau du monde, bat ses ailes jusqu\'à 80 fois par seconde." Quelle information est explicite ?',
    options:['Le colibri bat ses ailes 80 fois par seconde','Le colibri vit à Maurice','Le colibri mange des fleurs','Le colibri est en danger'],
    answer:'Le colibri bat ses ailes 80 fois par seconde',
    hint:'Lisez la phrase attentivement — quelle donnée chiffrée est mentionnée ?',
    explanation:'La phrase mentionne explicitement <b>80 fois par seconde</b>. Les autres options ne sont pas mentionnées dans la phrase.' }),

  // ── Compréhension écrite — vocabulaire ───────────────────────────────────

  makeMCQ({ id:'g7fr-ce-009', chapterId:'g7fr-ce', difficulty:1, subsection:'vocabulaire',
    question:'Un synonyme est un mot qui a :',
    options:['Un sens proche ou identique à un autre mot','Un sens opposé à un autre mot','La même longueur qu\'un autre mot','La même lettre initiale'],
    answer:'Un sens proche ou identique à un autre mot',
    hint:'Syn- vient du grec et signifie "avec, ensemble".',
    explanation:'Un <b>synonyme</b> est un mot qui a le même sens ou un sens très proche. Exemple : "rapide" et "vite" sont des synonymes.' }),

  makeMCQ({ id:'g7fr-ce-010', chapterId:'g7fr-ce', difficulty:1, subsection:'vocabulaire',
    question:'Un antonyme est un mot qui a :',
    options:['Un sens contraire à un autre mot','Un sens identique à un autre mot','La même orthographe','Le même son'],
    answer:'Un sens contraire à un autre mot',
    hint:'Anti- signifie "contre" — l\'antonyme est le contraire.',
    explanation:'Un <b>antonyme</b> est le contraire d\'un mot. Exemple : "grand" et "petit" ; "chaud" et "froid" ; "jour" et "nuit".' }),

  makeMCQ({ id:'g7fr-ce-011', chapterId:'g7fr-ce', difficulty:2, subsection:'vocabulaire',
    question:'Quel est le synonyme du mot "difficile" ?',
    options:['Complexe','Facile','Simple','Rapide'],
    answer:'Complexe',
    hint:'"Complexe" signifie compliqué, pas facile.',
    explanation:'"<b>Complexe</b>" est un synonyme de "difficile". "Facile" et "simple" sont des antonymes (contraires) de "difficile".' }),

  makeMCQ({ id:'g7fr-ce-012', chapterId:'g7fr-ce', difficulty:2, subsection:'vocabulaire',
    question:'Pour comprendre un mot inconnu dans un texte, on peut :',
    options:['Utiliser le contexte de la phrase pour deviner son sens','L\'ignorer complètement','Recommencer la lecture depuis le début','Fermer le livre'],
    answer:'Utiliser le contexte de la phrase pour deviner son sens',
    hint:'Les mots autour d\'un mot inconnu aident souvent à comprendre son sens.',
    explanation:'Le <b>contexte</b> — les mots, les phrases autour — aide souvent à comprendre un mot inconnu. C\'est la stratégie la plus efficace avant de chercher dans un dictionnaire.' }),

  // ── Expression écrite — textes_fonctionnels ──────────────────────────────

  makeMCQ({ id:'g7fr-ee-001', chapterId:'g7fr-ee', difficulty:1, subsection:'textes_fonctionnels',
    question:'Un texte fonctionnel est un texte qui :',
    options:['Sert à accomplir une action précise dans la vie quotidienne','Raconte une histoire imaginaire','Décrit un paysage','Exprime des émotions'],
    answer:'Sert à accomplir une action précise dans la vie quotidienne',
    hint:'Ces textes ont une utilité pratique.',
    explanation:'Un <b>texte fonctionnel</b> a un but pratique précis : inviter (lettre d\'invitation), informer (affiche), donner des instructions (mode d\'emploi).' }),

  makeMCQ({ id:'g7fr-ee-002', chapterId:'g7fr-ee', difficulty:1, subsection:'textes_fonctionnels',
    question:'Laquelle de ces productions est un texte fonctionnel ?',
    options:['Une lettre d\'invitation','Un conte de fées','Un poème','Une chanson'],
    answer:'Une lettre d\'invitation',
    hint:'Ce texte sert à inviter quelqu\'un — il a une fonction précise.',
    explanation:'Une <b>lettre d\'invitation</b> est un texte fonctionnel car elle sert à informer quelqu\'un d\'un événement et à l\'inviter à y participer.' }),

  makeMCQ({ id:'g7fr-ee-003', chapterId:'g7fr-ee', difficulty:2, subsection:'textes_fonctionnels',
    question:'Dans une lettre formelle, comment commence-t-on la salutation initiale ?',
    options:['Madame / Monsieur','Salut !','Cher ami,','Bonjour tout le monde,'],
    answer:'Madame / Monsieur',
    hint:'Dans une lettre formelle, on utilise le titre de la personne.',
    explanation:'Une lettre formelle commence par <b>"Madame"</b> ou <b>"Monsieur"</b> suivi d\'une virgule. "Salut" et "Cher ami" sont réservés aux lettres informelles.' }),

  makeMCQ({ id:'g7fr-ee-004', chapterId:'g7fr-ee', difficulty:2, subsection:'textes_fonctionnels',
    question:'Une affiche publicitaire doit contenir :',
    options:['Un titre accrocheur, une illustration et un message clair','Plusieurs longs paragraphes','Des notes de bas de page','Une introduction et une conclusion'],
    answer:'Un titre accrocheur, une illustration et un message clair',
    hint:'Une affiche doit attirer l\'attention rapidement.',
    explanation:'Une affiche efficace contient un <b>titre accrocheur</b> pour attirer l\'attention, une <b>illustration</b> et un <b>message court et clair</b>. Les longues phrases ne conviennent pas à ce format.' }),

  // ── Expression écrite — organisation_paragraphes ─────────────────────────

  makeMCQ({ id:'g7fr-ee-005', chapterId:'g7fr-ee', difficulty:1, subsection:'organisation_paragraphes',
    question:'Un paragraphe est composé de :',
    options:['Plusieurs phrases qui développent une seule idée','Un seul mot','Une seule lettre','Des images uniquement'],
    answer:'Plusieurs phrases qui développent une seule idée',
    hint:'Un paragraphe = une idée développée.',
    explanation:'Un <b>paragraphe</b> regroupe plusieurs phrases qui développent une même idée. On va à la ligne et on laisse un alinéa pour commencer un nouveau paragraphe.' }),

  makeMCQ({ id:'g7fr-ee-006', chapterId:'g7fr-ee', difficulty:2, subsection:'organisation_paragraphes',
    question:'Pour organiser un texte correctement, l\'ordre des parties est :',
    options:['Introduction — Développement — Conclusion','Conclusion — Introduction — Développement','Développement — Conclusion — Introduction','Introduction — Conclusion — Développement'],
    answer:'Introduction — Développement — Conclusion',
    hint:'On commence par présenter le sujet, puis on le développe, puis on termine.',
    explanation:'Un texte bien organisé commence par une <b>introduction</b> (présentation du sujet), suivi d\'un <b>développement</b> (idées principales) et se termine par une <b>conclusion</b> (résumé ou ouverture).' }),

  makeMCQ({ id:'g7fr-ee-007', chapterId:'g7fr-ee', difficulty:2, subsection:'organisation_paragraphes',
    question:'Quel connecteur logique utilise-t-on pour introduire une conclusion ?',
    options:['En conclusion','Premièrement','De plus','Cependant'],
    answer:'En conclusion',
    hint:'Ce connecteur annonce la fin d\'un texte.',
    explanation:'"<b>En conclusion</b>", "pour terminer" et "pour conclure" sont des connecteurs qui annoncent la fin d\'un texte et présentent un résumé ou une idée finale.' }),

  makeMCQ({ id:'g7fr-ee-008', chapterId:'g7fr-ee', difficulty:3, subsection:'organisation_paragraphes',
    question:'Pourquoi doit-on utiliser des connecteurs logiques dans un texte ?',
    options:['Pour assurer la cohérence et la progression des idées','Pour allonger le texte inutilement','Pour impressionner le correcteur','Pour éviter les fautes d\'orthographe'],
    answer:'Pour assurer la cohérence et la progression des idées',
    hint:'Les connecteurs créent des liens entre les idées.',
    explanation:'Les <b>connecteurs logiques</b> (d\'abord, ensuite, enfin, cependant, donc…) créent des liens entre les idées et assurent la cohérence du texte.' }),

  // ── Expression écrite — correction_syntaxe ───────────────────────────────

  makeMCQ({ id:'g7fr-ee-009', chapterId:'g7fr-ee', difficulty:1, subsection:'correction_syntaxe',
    question:'La syntaxe, c\'est :',
    options:['L\'organisation des mots dans une phrase pour qu\'elle ait un sens','La façon d\'écrire les lettres','Le nombre de syllabes d\'un mot','La définition d\'un mot'],
    answer:'L\'organisation des mots dans une phrase pour qu\'elle ait un sens',
    hint:'Syntaxe = façon d\'agencer les mots correctement.',
    explanation:'La <b>syntaxe</b> désigne les règles qui organisent les mots dans une phrase. En français, l\'ordre habituel est : Sujet + Verbe + Complément.' }),

  makeMCQ({ id:'g7fr-ee-010', chapterId:'g7fr-ee', difficulty:2, subsection:'correction_syntaxe',
    question:'Quelle phrase est correctement construite ?',
    options:['Le chat mange la souris.','Mange chat la souris le.','La souris mange le chat la.','Chat le souris mange.'],
    answer:'Le chat mange la souris.',
    hint:'En français, la phrase suit l\'ordre : Sujet + Verbe + Complément.',
    explanation:'"<b>Le chat mange la souris</b>" suit l\'ordre correct : Sujet (le chat) + Verbe (mange) + Complément (la souris). Les autres phrases n\'ont pas de sens.' }),

  makeMCQ({ id:'g7fr-ee-011', chapterId:'g7fr-ee', difficulty:2, subsection:'correction_syntaxe',
    question:'Après avoir écrit un texte, quelle étape est essentielle ?',
    options:['Le relire pour corriger les fautes','Le donner directement au professeur','L\'effacer et recommencer','Le traduire en anglais'],
    answer:'Le relire pour corriger les fautes',
    hint:'La relecture permet d\'améliorer son texte.',
    explanation:'La <b>relecture</b> est une étape essentielle. Elle permet de corriger les fautes d\'orthographe, de grammaire et de syntaxe, et d\'améliorer la clarté du texte.' }),

  makeMCQ({ id:'g7fr-ee-012', chapterId:'g7fr-ee', difficulty:3, subsection:'correction_syntaxe',
    question:'Dans quelle phrase le sujet et le verbe s\'accordent-ils correctement ?',
    options:['Les enfants jouent dans le jardin.','Les enfants joue dans le jardin.','L\'enfant jouent dans le jardin.','Les enfant joue dans le jardin.'],
    answer:'Les enfants jouent dans le jardin.',
    hint:'Le verbe doit s\'accorder avec le sujet en nombre et en personne.',
    explanation:'"<b>Les enfants jouent</b>" est correct : le sujet pluriel "les enfants" demande le verbe au pluriel "jouent". C\'est la règle d\'accord sujet-verbe.' }),

  // ── Littérature — genres_litteraires ─────────────────────────────────────

  makeMCQ({ id:'g7fr-litterature-001', chapterId:'g7fr-litterature', difficulty:1, subsection:'genres_litteraires',
    question:'Quels sont les grands genres littéraires ?',
    options:['Le roman, la poésie, le théâtre et le conte','Les mathématiques, les sciences et la géographie','Les journaux, les affiches et les lettres','Les recettes, les modes d\'emploi et les guides'],
    answer:'Le roman, la poésie, le théâtre et le conte',
    hint:'Ces formes d\'écriture sont étudiées en cours de littérature.',
    explanation:'Les grands <b>genres littéraires</b> sont le roman (récit long en prose), la poésie (texte qui joue avec les sons et les images), le théâtre (texte écrit pour être joué) et le conte (récit court avec une morale).' }),

  makeMCQ({ id:'g7fr-litterature-002', chapterId:'g7fr-litterature', difficulty:1, subsection:'genres_litteraires',
    question:'Un poème se reconnaît surtout à :',
    options:['Ses vers organisés en strophes et ses effets musicaux','Ses longs paragraphes narratifs','Ses personnages qui se disputent sur scène','Ses instructions étape par étape'],
    answer:'Ses vers organisés en strophes et ses effets musicaux',
    hint:'Un poème joue avec les sons, le rythme et les images.',
    explanation:'Un <b>poème</b> est composé de <b>vers</b> (lignes) groupés en <b>strophes</b>. Il crée des effets musicaux grâce à la rime, le rythme et les images (métaphores, comparaisons).' }),

  makeMCQ({ id:'g7fr-litterature-003', chapterId:'g7fr-litterature', difficulty:2, subsection:'genres_litteraires',
    question:'Le théâtre se distingue des autres genres par :',
    options:['La présence de répliques, de didascalies et d\'actes','L\'absence totale de personnages','L\'utilisation exclusive de la rime','La narration à la première personne'],
    answer:'La présence de répliques, de didascalies et d\'actes',
    hint:'Une pièce de théâtre est écrite pour être jouée sur scène.',
    explanation:'Le <b>théâtre</b> est caractérisé par les <b>répliques</b> (ce que disent les personnages), les <b>didascalies</b> (indications de mise en scène) et la division en <b>actes</b> et en <b>scènes</b>.' }),

  makeMCQ({ id:'g7fr-litterature-004', chapterId:'g7fr-litterature', difficulty:2, subsection:'genres_litteraires',
    question:'Quel auteur français est célèbre pour ses fables mettant en scène des animaux ?',
    options:['Jean de La Fontaine','Victor Hugo','Molière','Guy de Maupassant'],
    answer:'Jean de La Fontaine',
    hint:'Il a écrit "La Cigale et la Fourmi".',
    explanation:'<b>Jean de La Fontaine</b> (1621-1695) est célèbre pour ses <b>Fables</b>, des histoires mettant en scène des animaux qui illustrent une morale. Ex. : "La Cigale et la Fourmi".' }),

  // ── Littérature — types_textes ────────────────────────────────────────────

  makeMCQ({ id:'g7fr-litterature-005', chapterId:'g7fr-litterature', difficulty:1, subsection:'types_textes',
    question:'Un texte narratif raconte :',
    options:['Une histoire avec des personnages et des événements','Les caractéristiques d\'un lieu','Comment faire quelque chose','Une opinion sur un sujet'],
    answer:'Une histoire avec des personnages et des événements',
    hint:'"Narrer" signifie raconter.',
    explanation:'Un texte <b>narratif</b> raconte une histoire avec des personnages, un lieu, des événements et souvent un début, un milieu et une fin (schéma narratif).' }),

  makeMCQ({ id:'g7fr-litterature-006', chapterId:'g7fr-litterature', difficulty:1, subsection:'types_textes',
    question:'Un texte descriptif sert à :',
    options:['Donner une image précise d\'un lieu, d\'une personne ou d\'un objet','Raconter une histoire','Donner des instructions','Convaincre le lecteur'],
    answer:'Donner une image précise d\'un lieu, d\'une personne ou d\'un objet',
    hint:'"Décrire" c\'est peindre avec des mots.',
    explanation:'Un texte <b>descriptif</b> donne une représentation détaillée d\'un lieu, d\'une personne ou d\'un objet, en faisant appel aux cinq sens.' }),

  makeMCQ({ id:'g7fr-litterature-007', chapterId:'g7fr-litterature', difficulty:2, subsection:'types_textes',
    question:'Un mode d\'emploi est un exemple de texte :',
    options:['Injonctif','Narratif','Poétique','Argumentatif'],
    answer:'Injonctif',
    hint:'Il donne des instructions à suivre étape par étape.',
    explanation:'Un texte <b>injonctif</b> donne des ordres ou des instructions. Le mode d\'emploi utilise souvent l\'infinitif ou l\'impératif : "Appuyez sur le bouton...".' }),

  makeMCQ({ id:'g7fr-litterature-008', chapterId:'g7fr-litterature', difficulty:2, subsection:'types_textes',
    question:'Le schéma narratif d\'un récit comprend dans l\'ordre :',
    options:['Situation initiale — Élément perturbateur — Péripéties — Résolution — Situation finale','Introduction — Développement — Conclusion','Titre — Corps — Moral','Exposition — Crise — Dénouement'],
    answer:'Situation initiale — Élément perturbateur — Péripéties — Résolution — Situation finale',
    hint:'Le schéma narratif est la structure d\'un récit en 5 étapes.',
    explanation:'Le <b>schéma narratif</b> décrit la structure d\'un récit : 1. Situation initiale (le calme au début), 2. Élément perturbateur (un problème survient), 3. Péripéties (actions des personnages), 4. Résolution (le problème est résolu), 5. Situation finale.' }),

  // ── Littérature — conte_bd ────────────────────────────────────────────────

  makeMCQ({ id:'g7fr-litterature-009', chapterId:'g7fr-litterature', difficulty:1, subsection:'conte_bd',
    question:'Un conte commence souvent par :',
    options:['"Il était une fois..."','"En conclusion..."','"Premièrement..."','"Cher lecteur..."'],
    answer:'"Il était une fois..."',
    hint:'Cette formule magique annonce le début d\'un conte.',
    explanation:'La formule <b>"Il était une fois..."</b> est la formule traditionnelle d\'ouverture des contes. Elle situe l\'histoire dans un temps indéterminé, magique.' }),

  makeMCQ({ id:'g7fr-litterature-010', chapterId:'g7fr-litterature', difficulty:1, subsection:'conte_bd',
    question:'La morale d\'un conte est :',
    options:['La leçon de vie que le conte veut transmettre','Le nom de l\'auteur','Le titre du conte','Le nombre de personnages'],
    answer:'La leçon de vie que le conte veut transmettre',
    hint:'Après le "ils vécurent heureux", quelle leçon retient-on ?',
    explanation:'La <b>morale</b> est le message ou la leçon de vie que l\'auteur veut transmettre à travers le conte. Ex. : "La Cigale et la Fourmi" → Il faut travailler en été pour avoir des réserves en hiver.' }),

  makeMCQ({ id:'g7fr-litterature-011', chapterId:'g7fr-litterature', difficulty:2, subsection:'conte_bd',
    question:'Dans une bande dessinée (BD), les paroles des personnages apparaissent dans :',
    options:['Des bulles (ou phylactères)','Des parenthèses','Des notes de bas de page','Des paragraphes'],
    answer:'Des bulles (ou phylactères)',
    hint:'Ces formes arrondies contiennent les paroles des personnages.',
    explanation:'Dans une <b>bande dessinée</b>, les paroles sont dans des <b>bulles</b> (phylactères) — formes rondes ou ovales qui sortent de la bouche du personnage. Les pensées sont dans des bulles nuageuses.' }),

  makeMCQ({ id:'g7fr-litterature-012', chapterId:'g7fr-litterature', difficulty:3, subsection:'conte_bd',
    question:'Quelle est la différence principale entre un conte traditionnel et un conte moderne ?',
    options:['Le conte traditionnel vient de la tradition orale ; le conte moderne est souvent écrit par un auteur connu','Le conte traditionnel est plus long','Le conte moderne n\'a pas de morale','Le conte traditionnel utilise toujours des animaux'],
    answer:'Le conte traditionnel vient de la tradition orale ; le conte moderne est souvent écrit par un auteur connu',
    hint:'Les contes traditionnels sont transmis de génération en génération oralement.',
    explanation:'Un <b>conte traditionnel</b> est d\'origine orale, souvent anonyme, transmis de génération en génération (ex. contes africains). Un <b>conte moderne</b> est écrit par un auteur identifié (ex. Perrault, Andersen).' })

);
