'use strict';
// Grade 6 French - Chapitre : L'Expression Écrite & Argumentation
// IDs format: g6fr-arg-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-arg-001', chapterId:'g6fr-argumentation', subsection:'opinion', difficulty:2,
    question:'Quelle expression introduit une OPINION PERSONNELLE ?',
    options:['En conclusion','De plus','À mon avis','Cependant'],
    answer:'À mon avis',
    hint:'"À mon avis" signifie "In my opinion" - c\'est une expression d\'opinion.',
    explanation:'"<b>À mon avis</b>" = pour exprimer son opinion. Autres expressions d\'opinion : Je pense que, Je crois que, Il me semble que, Je suis convaincu(e) que, Selon moi. "En conclusion" = conclusion ; "De plus" = ajout d\'idée ; "Cependant" = opposition.' }),

  makeMCQ({ id:'g6fr-arg-002', chapterId:'g6fr-argumentation', subsection:'connecteurs', difficulty:2,
    question:'Quel connecteur AJOUTE une idée à la précédente ?',
    options:['Cependant','Pourtant','De plus','En revanche'],
    answer:'De plus',
    hint:'"De plus" signifie "furthermore" - on ajoute une information.',
    explanation:'"<b>De plus</b>" = pour ajouter une idée. Autres connecteurs d\'ajout : En outre, Par ailleurs, Non seulement… mais aussi, Également. "Cependant / Pourtant / En revanche" = opposition.' }),

  makeMCQ({ id:'g6fr-arg-003', chapterId:'g6fr-argumentation', subsection:'opinion', difficulty:2,
    question:'Quelle structure exprime une CONCESSION (reconnaître le point de vue contraire) ?',
    options:['En conclusion…','Certes, … Cependant,…','De plus…','En résumé…'],
    answer:'Certes, … Cependant,…',
    hint:'"Certes" admet un point, puis "Cependant" introduit l\'opposition.',
    explanation:'"<b>Certes, … Cependant,…</b>" = structure de concession classique : "Certes, les voitures sont pratiques. Cependant, elles polluent l\'environnement." On reconnaît d\'abord l\'argument adverse, puis on donne son propre argument.' }),

  makeMCQ({ id:'g6fr-arg-004', chapterId:'g6fr-argumentation', subsection:'structure', difficulty:1,
    question:'Quelle est la structure d\'un texte argumentatif en français ?',
    options:[
      'Introduction, un seul argument, conclusion',
      'Introduction (contexte + problématique) → Développement (arguments + exemples) → Conclusion',
      'Liste d\'arguments pour, puis liste d\'arguments contre',
      'Résumé, thèse, antithèse seulement'
    ],
    answer:'Introduction (contexte + problématique) → Développement (arguments + exemples) → Conclusion',
    hint:'Pensez à la structure en trois parties utilisée en français.',
    explanation:'Structure du texte argumentatif : <b>Introduction</b> (contexte + problématique = question centrale), <b>Développement</b> (thèse = arguments pour + antithèse = arguments contre, avec exemples), <b>Conclusion</b> (résumé + ouverture = réflexion plus large).' }),

  makeMCQ({ id:'g6fr-arg-005', chapterId:'g6fr-argumentation', subsection:'structure', difficulty:2,
    question:'Quelle expression annonce correctement la CONCLUSION d\'un texte ?',
    options:['De plus','Bien que','En conclusion','Certes'],
    answer:'En conclusion',
    hint:'Cette expression signale le dernier paragraphe.',
    explanation:'"<b>En conclusion</b>" annonce la conclusion. Autres expressions : En résumé, Pour conclure, En définitive, En somme. La conclusion résume les idées principales et propose une réflexion finale - elle n\'introduit pas de nouvelles idées.' }),

  makeTF({ id:'g6fr-arg-006', chapterId:'g6fr-argumentation', subsection:'vocabulaire', difficulty:2,
    question:'"Non seulement… mais aussi" est utilisé pour introduire une idée contraire.',
    answer:false,
    hint:'"Non seulement" = not only. "Mais aussi" = but also.',
    explanation:'<b>Faux.</b> "Non seulement… <b>mais aussi</b>" = "Non seulement… mais également" - cette structure <b>ajoute</b> une idée, elle n\'oppose pas. "Non seulement c\'est utile, mais aussi c\'est beau." Les connecteurs d\'opposition : Cependant, Pourtant, En revanche, Néanmoins, Toutefois.' }),

  makeMCQ({ id:'g6fr-arg-007', chapterId:'g6fr-argumentation', subsection:'connecteurs', difficulty:2,
    question:'Quel connecteur exprime une CONSÉQUENCE ?',
    options:['Cependant','Donc / Ainsi','De plus','Certes'],
    answer:'Donc / Ainsi',
    hint:'"Donc" = therefore/so - la conséquence découle de ce qui précède.',
    explanation:'"<b>Donc</b>" et "<b>Ainsi</b>" expriment la conséquence. "La forêt a brûlé. <b>Donc</b>, de nombreux animaux ont perdu leur habitat." Autres connecteurs de conséquence : Par conséquent, C\'est pourquoi, En conséquence, Si bien que.' }),

  makeMCQ({ id:'g6fr-arg-008', chapterId:'g6fr-argumentation', subsection:'opinion', difficulty:2,
    question:'Quelle phrase exprime l\'opinion la PLUS FORTE ?',
    options:[
      'Il me semble que cela est important.',
      'Je pense que c\'est une bonne idée.',
      'Je suis convaincu(e) que cette solution est la meilleure.',
      'On pourrait peut-être considérer cette option.'
    ],
    answer:'Je suis convaincu(e) que cette solution est la meilleure.',
    hint:'Quelle expression montre la plus grande certitude et conviction ?',
    explanation:'"<b>Je suis convaincu(e) que</b>" exprime l\'opinion la plus forte. Échelle de force : "on pourrait peut-être" (faible) < "il me semble" < "je pense" < "je suis convaincu(e)" (fort). Plus l\'expression est forte, plus l\'argument semble assuré.' }),

  makeTF({ id:'g6fr-arg-009', chapterId:'g6fr-argumentation', subsection:'arguments', difficulty:1,
    question:'Dans un texte argumentatif, la "problématique" est la question centrale à laquelle le texte cherche à répondre.',
    answer:true,
    hint:'Pensez à la question principale posée dans l\'introduction.',
    explanation:'<b>Vrai.</b> La <b>problématique</b> est la question centrale posée dans l\'introduction : ex. "Les réseaux sociaux sont-ils bénéfiques pour les jeunes ?" Tout le développement s\'organise autour de cette question.' }),

  makeMCQ({ id:'g6fr-arg-010', chapterId:'g6fr-argumentation', subsection:'vocabulaire', difficulty:2,
    question:'Que signifie "En revanche" dans un texte ?',
    options:['En conclusion','De plus','En revanche = D\'un autre côté / Par contre','À cause de cela'],
    answer:'En revanche = D\'un autre côté / Par contre',
    hint:'"En revanche" introduit une idée qui s\'oppose à la précédente.',
    explanation:'"<b>En revanche</b>" = D\'un autre côté / Par contre / En contrepartie. "Les voitures sont rapides. <b>En revanche</b>, elles polluent." Synonymes : Cependant, Toutefois, Néanmoins, Pourtant.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-arg-011', chapterId:'g6fr-argumentation', subsection:'connecteurs', difficulty:2,
    question:'Quel connecteur indique qu\'une idée s\'ajoute à la précédente en l\'amplifiant ?',
    options:['Or','Pourtant','De surcroît','Car'],
    answer:'De surcroît',
    hint:'"De surcroît" = moreover/on top of that - on ajoute une idée encore plus forte.',
    explanation:'"<b>De surcroît</b>" (= moreover, on top of that) ajoute une idée en l\'amplifiant : "Ce projet est coûteux. <b>De surcroît</b>, il risque d\'être inefficace." Connecteurs d\'ajout par ordre de fréquence (manuel MIE de 6e) : de plus, en outre, par ailleurs, également, <b>de surcroît</b> (renforcé), non seulement… mais aussi.' }),

  makeMCQ({ id:'g6fr-arg-012', chapterId:'g6fr-argumentation', subsection:'arguments', difficulty:1,
    question:'Qu\'est-ce qu\'une "thèse" dans un texte argumentatif ?',
    options:[
      'La question posée dans l\'introduction',
      'La position ou l\'opinion défendue par l\'auteur dans le texte',
      'Un argument contre l\'opinion de l\'auteur',
      'Le dernier paragraphe du texte'
    ],
    answer:'La position ou l\'opinion défendue par l\'auteur dans le texte',
    hint:'"Thèse" vient du grec "thesis" = position/affirmation.',
    explanation:'La <b>thèse</b> est l\'opinion ou la position que l\'auteur défend dans son texte : par exemple, "Les réseaux sociaux sont bénéfiques pour les jeunes." L\' <b>antithèse</b> est la position contraire. La <b>problématique</b> est la question centrale (sont-ils bénéfiques ou non ?). Le <b>développement</b> présente la thèse + antithèse + arguments + exemples.' }),

  makeMCQ({ id:'g6fr-arg-013', chapterId:'g6fr-argumentation', subsection:'connecteurs', difficulty:2,
    question:'Complétez avec le bon connecteur : "___ je comprends les inquiétudes, je pense que les bénéfices l\'emportent."',
    options:['Donc','Certes','Car','Ainsi'],
    answer:'Certes',
    hint:'"Certes" reconnaît un point opposé avant de le dépasser avec son propre argument.',
    explanation:'"<b>Certes</b> je comprends les inquiétudes, je pense que les bénéfices l\'emportent." - <b>Certes</b> (= admittedly, granted) concède un point à l\'adversaire avant de le réfuter. Structure classique de la concession au bac de français : "Certes… mais/cependant/néanmoins…" Le manuel MIE de 6e enseigne cette structure pour les dissertations et les débats.' }),

  makeMCQ({ id:'g6fr-arg-014', chapterId:'g6fr-argumentation', subsection:'arguments', difficulty:2,
    question:'Quelle phrase représente le meilleur ARGUMENT pour un débat sur la protection de l\'environnement à Maurice ?',
    options:[
      '"Je pense que l\'environnement est important."',
      '"L\'environnement est beau à Maurice."',
      '"La dégradation des récifs coralliens menace directement le tourisme, pilier essentiel de l\'économie mauricienne."',
      '"Il faudrait peut-être faire quelque chose pour la nature."'
    ],
    answer:'"La dégradation des récifs coralliens menace directement le tourisme, pilier essentiel de l\'économie mauricienne."',
    hint:'Un bon argument est précis, factuel et montre clairement les conséquences.',
    explanation:'"La dégradation des récifs coralliens <b>menace directement le tourisme, pilier essentiel de l\'économie mauricienne</b>." - C\'est un argument efficace car : (1) il est <b>précis</b> (récifs coralliens, tourisme) ; (2) il montre les <b>conséquences</b> économiques ; (3) il utilise le vocabulaire soutenu du manuel MIE de 6e. Un bon argument répond toujours à "Pourquoi ? Avec quelles preuves ?"' }),

  makeTF({ id:'g6fr-arg-015', chapterId:'g6fr-argumentation', subsection:'structure', difficulty:1,
    question:'Dans un texte argumentatif, la conclusion peut introduire de nouveaux arguments.',
    answer:false,
    hint:'Que doit contenir la conclusion ? Que ne doit-elle PAS contenir ?',
    explanation:'<b>Faux.</b> La conclusion d\'un texte argumentatif doit : (1) <b>résumer</b> les idées principales ; (2) reprendre la thèse en d\'autres termes ; (3) proposer une <b>ouverture</b> (réflexion plus large). Elle ne doit <b>jamais</b> introduire de nouveaux arguments - ceux-ci appartiennent au développement. Selon le manuel MIE de 6e, introduire un nouveau point dans la conclusion est considéré comme une erreur de structure.' }),

  makeMCQ({ id:'g6fr-arg-016', chapterId:'g6fr-argumentation', subsection:'vocabulaire', difficulty:2,
    question:'Comment orthographie-t-on correctement l\'accord dans : "Elle est convaincue que cette solution est la meilleure."',
    options:[
      '"convaincu" (masculin, sans accord)',
      '"convaincue" (féminin, accord avec le sujet)',
      '"convaincues" (pluriel)',
      '"convaincu" (forme invariable)'
    ],
    answer:'"convaincue" (féminin, accord avec le sujet)',
    hint:'"Elle" est féminin singulier → l\'adjectif s\'accorde en genre et en nombre.',
    explanation:'"Elle est <b>convaincue</b>" - Les adjectifs et les participes passés (attributs du sujet) s\'accordent en <b>genre et en nombre</b> avec le sujet. "Elle" = féminin singulier → "convaincu" + <b>-e</b> = "convaincue". Le manuel MIE de 6e insiste sur les accords (adjectif/nom, verbe/sujet) dans l\'expression écrite - c\'est un critère de notation du PSAC.' }),

  makeMCQ({ id:'g6fr-arg-017', chapterId:'g6fr-argumentation', subsection:'connecteurs', difficulty:3,
    question:'Quel est le rôle du connecteur "Or" dans un texte argumentatif ?',
    options:[
      'Il ajoute une idée semblable à la précédente',
      'Il introduit un fait nouveau qui va modifier ou nuancer ce qui vient d\'être dit',
      'Il conclut le texte',
      'Il exprime la cause'
    ],
    answer:'Il introduit un fait nouveau qui va modifier ou nuancer ce qui vient d\'être dit',
    hint:'"Or" = now/but in fact - il marque une transition vers un fait inattendu ou révélateur.',
    explanation:'"<b>Or</b>" (= now, but, however - en anglais) introduit un fait nouveau qui change ou nuance la perspective : "On pensait que le problème était résolu. <b>Or</b>, les chiffres montrent une aggravation." Il crée une surprise ou un tournant dans l\'argumentation. Très utilisé dans les dissertations de niveau 6e, mais moins fréquent que "cependant" ou "de plus".' }),

  makeMCQ({ id:'g6fr-arg-018', chapterId:'g6fr-argumentation', subsection:'connecteurs', difficulty:2,
    question:'Laquelle de ces phrases utilise correctement les connecteurs pour structurer un paragraphe argumentatif ?',
    options:[
      '"De plus, cependant, en conclusion, les technologies sont utiles."',
      '"Premièrement, les technologies facilitent l\'apprentissage. En effet, les élèves accèdent facilement à des ressources éducatives. Cependant, elles peuvent aussi distraire."',
      '"Les technologies. De plus. Sont utiles. Car. En conclusion."',
      '"Je pense que les technologies. Donc elles sont bonnes."'
    ],
    answer:'"Premièrement, les technologies facilitent l\'apprentissage. En effet, les élèves accèdent facilement à des ressources éducatives. Cependant, elles peuvent aussi distraire."',
    hint:'Un bon paragraphe suit la structure : argument + illustration/explication + nuance.',
    explanation:'"<b>Premièrement</b>, les technologies facilitent l\'apprentissage. <b>En effet</b>, les élèves accèdent à des ressources. <b>Cependant</b>, elles peuvent distraire." - Structure modèle : (1) <b>Premièrement</b> = annonce l\'argument ; (2) <b>En effet</b> = illustre/explique ; (3) <b>Cependant</b> = nuance. Le manuel MIE de 6e utilise ce modèle explicitement pour la rédaction argumentative.' }),

  makeMCQ({ id:'g6fr-arg-019', chapterId:'g6fr-argumentation', subsection:'arguments', difficulty:4,
    question:'Dans un débat sur l\'utilisation des téléphones portables à l\'école, quelle phrase représente la meilleure RÉFUTATION (contre-argument) ?',
    options:[
      '"Je ne suis pas d\'accord avec toi."',
      '"Certes, les téléphones permettent d\'accéder à des informations rapidement. Néanmoins, des études montrent qu\'ils réduisent la concentration des élèves de 25%."',
      '"Les téléphones sont mauvais pour les enfants."',
      '"Mon professeur dit que les téléphones sont interdits."'
    ],
    answer:'"Certes, les téléphones permettent d\'accéder à des informations rapidement. Néanmoins, des études montrent qu\'ils réduisent la concentration des élèves de 25%."',
    hint:'Une bonne réfutation reconnaît d\'abord l\'argument adverse (certes...) puis le dépasse avec une preuve plus forte.',
    explanation:'Structure de la réfutation efficace : (1) <b>Certes</b> [reconnaître l\'argument adverse] + (2) <b>Néanmoins / Cependant / Toutefois</b> [réfuter avec un argument plus fort + preuve]. La preuve chiffrée ("25%") donne plus de crédibilité. Le manuel MIE de 6e enseigne cette technique de concession-réfutation comme l\'une des compétences argumentatives clés pour le PSAC.' }),

  makeMCQ({ id:'g6fr-arg-020', chapterId:'g6fr-argumentation', subsection:'connecteurs', difficulty:1,
    question:'Quel connecteur introduit le DEUXIÈME argument dans un texte argumentatif ?',
    options:['En conclusion','De plus / Deuxièmement','Certes','Néanmoins'],
    answer:'De plus / Deuxièmement',
    hint:'"De plus" ou "Deuxièmement" ajoutent un argument supplémentaire.',
    explanation:'"<b>De plus</b>" ou "<b>Deuxièmement</b>" servent à <b>ajouter</b> un argument supplémentaire du même côté. Ordre type : Premièrement… → De plus… → En outre… → En conclusion…' }),

  makeMCQ({ id:'g6fr-arg-021', chapterId:'g6fr-argumentation', subsection:'connecteurs', difficulty:1,
    question:'Quel connecteur introduit la CONCLUSION d\'un texte argumentatif ?',
    options:['En effet','De plus','En conclusion / En résumé','Cependant'],
    answer:'En conclusion / En résumé',
    hint:'"En conclusion" = fin du texte, synthèse.',
    explanation:'"<b>En conclusion</b>" ou "<b>En résumé</b>" introduisent la <b>synthèse finale</b> du texte. On récapitule les arguments principaux et on donne sa position définitive. Structure : Premièrement… → De plus… → Cependant… → <b>En conclusion</b>…' }),

  makeTF({ id:'g6fr-arg-022', chapterId:'g6fr-argumentation', subsection:'vocabulaire', difficulty:1,
    question:'Un texte INJONCTIF donne des ordres ou des instructions (ex : une recette, un règlement).',
    answer:true,
    hint:'Injonctif = donner des ordres, des conseils, des instructions. Ex : "Mélangez la farine…"',
    explanation:'<b>Vrai.</b> Le texte <b>injonctif</b> donne des <b>ordres, instructions, conseils</b> : recettes de cuisine ("Ajoutez deux œufs…"), règlements ("Il est interdit de…"), modes d\'emploi. Il utilise souvent l\'impératif ou l\'infinitif. Les 5 types de textes MIE : <b>narratif, descriptif, informatif, argumentatif, injonctif</b>.' }),

  makeMCQ({ id:'g6fr-arg-023', chapterId:'g6fr-argumentation', subsection:'connecteurs', difficulty:2,
    question:'Quel connecteur exprime une OPPOSITION ou une nuance (= however) ?',
    options:['De plus','En effet','Cependant / Néanmoins / Toutefois','Par exemple'],
    answer:'Cependant / Néanmoins / Toutefois',
    hint:'"Cependant" = however. Il introduit un point qui contraste avec ce qui précède.',
    explanation:'"<b>Cependant</b>", "<b>néanmoins</b>", "<b>toutefois</b>" = <b>however / nevertheless</b>. Ils introduisent un <b>contraste ou une nuance</b> : "Les téléphones sont utiles. <b>Cependant</b>, ils peuvent distraire." Comparer : "<b>De plus</b>" ajoute dans le même sens ; "<b>Cependant</b>" oppose.' }),

  makeMCQ({ id:'g6fr-arg-024', chapterId:'g6fr-argumentation', subsection:'structure', difficulty:2,
    question:'Quelle est la structure d\'une lettre formelle (ordre correct) ?',
    options:[
      'Corps → Formule de politesse → Objet → Destinataire',
      'Destinataire → Objet → Formule d\'appel → Corps → Formule de politesse',
      'Formule d\'appel → Destinataire → Corps → Objet → Signature',
      'Objet → Corps → Destinataire → Formule de politesse'
    ],
    answer:'Destinataire → Objet → Formule d\'appel → Corps → Formule de politesse',
    hint:'On indique d\'abord à qui on écrit, puis pourquoi (objet), puis on commence (formule d\'appel), puis on dit ce qu\'on veut dire (corps), puis on termine poliment.',
    explanation:'Structure d\'une lettre formelle : (1) <b>Destinataire</b> (nom/adresse) ; (2) <b>Objet</b> ("Objet : demande de rendez-vous") ; (3) <b>Formule d\'appel</b> ("Monsieur, / Madame,") ; (4) <b>Corps</b> (message) ; (5) <b>Formule de politesse</b> ("Veuillez agréer…"). Le manuel MIE de 6e teste la rédaction de lettres formelles au PSAC.' }),

  makeMCQ({ id:'g6fr-arg-025', chapterId:'g6fr-argumentation', subsection:'vocabulaire', difficulty:2,
    question:'Quel type de texte DÉCRIT un lieu, une personne ou une chose en détail ?',
    options:['Texte narratif','Texte descriptif','Texte argumentatif','Texte injonctif'],
    answer:'Texte descriptif',
    hint:'"Descriptif" = décrire = donner les caractéristiques visuelles, sensorielles d\'un objet, lieu ou personne.',
    explanation:'Le texte <b>descriptif</b> peint une image en mots : couleurs, formes, textures, odeurs, tailles. Ex : "La plage était bordée de palmiers aux feuilles frémissantes, le sable blanc brillait sous le soleil…" Il répond à la question : <b>À quoi ressemble ?</b> Comparer : le texte <b>narratif</b> répond à : <b>Que s\'est-il passé ?</b>' }),

  makeMCQ({ id:'g6fr-arg-026', chapterId:'g6fr-argumentation', subsection:'connecteurs', difficulty:2,
    question:'Quel connecteur illustre avec un exemple (= for example) ?',
    options:['Cependant','En conclusion','Par exemple / C\'est-à-dire','En outre'],
    answer:'Par exemple / C\'est-à-dire',
    hint:'"Par exemple" introduit une illustration. "C\'est-à-dire" reformule ou précise.',
    explanation:'"<b>Par exemple</b>" (= for example) introduit une <b>illustration concrète</b> d\'une idée abstraite. "<b>C\'est-à-dire</b>" (= that is to say) <b>reformule ou précise</b> une idée. Ex : "Les énergies renouvelables sont importantes, <b>par exemple</b> l\'énergie solaire et l\'énergie éolienne."' }),

  makeMCQ({ id:'g6fr-arg-027', chapterId:'g6fr-argumentation', subsection:'structure', difficulty:3,
    question:'Dans un texte argumentatif, quelle est la structure d\'un bon paragraphe ?',
    options:[
      'Exemple → Idée directrice → Conclusion',
      'Idée directrice → Développement/Explication → Exemple',
      'Connecteur → Connecteur → Connecteur',
      'Conclusion → Idée → Exemple'
    ],
    answer:'Idée directrice → Développement/Explication → Exemple',
    hint:'D\'abord l\'idée principale, puis on l\'explique, puis on l\'illustre avec un exemple.',
    explanation:'Structure du paragraphe argumentatif : (1) <b>Idée directrice</b> (= topic sentence) : l\'argument principal ; (2) <b>Développement</b> : explication, justification ; (3) <b>Exemple</b> : illustration concrète. Ex : "Les transports en commun réduisent la pollution. <b>En effet</b>, un bus transporte 50 personnes contre 1 voiture. <b>Par exemple</b>, à Port-Louis, les bus publics ont réduit les embouteillages."' }),

  makeMCQ({ id:'g6fr-arg-028', chapterId:'g6fr-argumentation', subsection:'vocabulaire', difficulty:3,
    question:'Quelle formule de politesse convient pour terminer une lettre formelle à un directeur d\'école ?',
    options:[
      '"Bisous et à bientôt"',
      '"Salut"',
      '"Veuillez agréer, Monsieur le Directeur, l\'expression de mes salutations distinguées."',
      '"Merci beaucoup, votre ami"'
    ],
    answer:'"Veuillez agréer, Monsieur le Directeur, l\'expression de mes salutations distinguées."',
    hint:'Les formules de politesse formelles utilisent des expressions comme "Veuillez agréer…" ou "Je vous prie d\'agréer…"',
    explanation:'"<b>Veuillez agréer, Monsieur le Directeur, l\'expression de mes salutations distinguées.</b>" - formule de politesse formelle. Structure : <b>Veuillez agréer / Je vous prie d\'agréer</b> + [titre répété] + <b>l\'expression de mes salutations distinguées / respectueuses / les meilleures</b>. Répéter le titre (Monsieur le Directeur) est obligatoire dans la formule de politesse.' }),

  makeMCQ({ id:'g6fr-arg-029', chapterId:'g6fr-argumentation', subsection:'arguments', difficulty:3,
    question:'Quel type de texte présente des arguments POUR et CONTRE sur un sujet ?',
    options:['Texte narratif','Texte descriptif','Texte argumentatif','Texte injonctif'],
    answer:'Texte argumentatif',
    hint:'Argumentatif = convaincre, débattre, défendre une thèse.',
    explanation:'Le texte <b>argumentatif</b> présente une <b>thèse</b> et des <b>arguments</b> pour convaincre le lecteur. Il peut être organisé en deux parties (pour / contre) ou en plan dialectique (thèse → antithèse → synthèse). Il utilise des connecteurs logiques et des techniques de persuasion. Ex : dissertation, éditorial, lettre d\'opinion.' }),

  makeTF({ id:'g6fr-arg-030', chapterId:'g6fr-argumentation', subsection:'arguments', difficulty:3,
    question:'"En effet" et "car" s\'utilisent tous les deux pour expliquer ou justifier une affirmation.',
    answer:true,
    hint:'"En effet" (= indeed/in fact) et "car" (= because/for) justifient tous les deux.',
    explanation:'<b>Vrai.</b> "<b>En effet</b>" et "<b>car</b>" servent à <b>justifier ou expliquer</b> : "Ce projet est important. <b>En effet</b>, il concernera 500 familles." / "Ce projet est important, <b>car</b> il concernera 500 familles." Différence : "car" est une conjonction de coordination (milieu de phrase) ; "en effet" est un adverbe (début de phrase ou milieu).' }),

  makeMCQ({ id:'g6fr-arg-031', chapterId:'g6fr-argumentation', subsection:'connecteurs', difficulty:4,
    question:'Riya écrit : "La technologie améliore l\'éducation. ___ , elle permet un accès rapide à l\'information. ___ , certains élèves l\'utilisent pour copier les devoirs. ___ , il faut encadrer son usage." Choisis les bons connecteurs.',
    options:[
      'En effet / Cependant / En conclusion',
      'Cependant / En effet / De plus',
      'De plus / En conclusion / En effet',
      'Par exemple / Néanmoins / Certes'
    ],
    answer:'En effet / Cependant / En conclusion',
    hint:'"En effet" explique. "Cependant" oppose. "En conclusion" conclut.',
    explanation:'"<b>En effet</b>" (justifie l\'affirmation précédente : permet accès à l\'info), "<b>Cependant</b>" (nuance / oppose : certains copient), "<b>En conclusion</b>" (synthèse finale : il faut encadrer). Structure parfaite du paragraphe argumentatif en 3 temps.' }),

  makeMCQ({ id:'g6fr-arg-032', chapterId:'g6fr-argumentation', subsection:'vocabulaire', difficulty:4,
    question:'Shanvi doit rédiger une lettre au directeur pour demander une sortie scolaire. Quel est l\'OBJET correct de la lettre ?',
    options:[
      '"Objet : Bonjour, je veux une sortie"',
      '"Objet : Demande d\'organisation d\'une sortie scolaire au Jardin de Pamplemousses"',
      '"Objet : Sortie"',
      '"Objet : Je vous écris pour vous demander si on peut sortir"'
    ],
    answer:'"Objet : Demande d\'organisation d\'une sortie scolaire au Jardin de Pamplemousses"',
    hint:'L\'objet d\'une lettre formelle est concis, précis et nomme clairement la demande.',
    explanation:'"<b>Objet : Demande d\'organisation d\'une sortie scolaire au Jardin de Pamplemousses</b>" - L\'objet est un <b>titre bref et précis</b> qui résume la raison de la lettre. Il doit : (1) utiliser un nom (Demande / Réclamation / Candidature…) + (2) préciser l\'action souhaitée + (3) ajouter les détails pertinents.' }),

  makeMCQ({ id:'g6fr-arg-033', chapterId:'g6fr-argumentation', subsection:'structure', difficulty:3,
    question:'Dans un essai argumentatif, quelle est la structure idéale ?',
    options:[
      'Introduction → Arguments → Conclusion',
      'Arguments → Introduction → Conclusion',
      'Conclusion → Arguments → Introduction',
      'Introduction → Conclusion → Arguments'
    ],
    answer:'Introduction → Arguments → Conclusion',
    hint:'L\'ordre logique : présenter le sujet, développer les arguments, conclure.',
    explanation:'"<b>Introduction → Arguments → Conclusion</b>" - Structure classique de l\'essai argumentatif : (1) <b>Introduction</b> : présenter le sujet et annoncer la thèse ; (2) <b>Développement</b> : arguments avec exemples et connecteurs ; (3) <b>Conclusion</b> : synthèse et ouverture. Cette structure est évaluée au PSAC.' }),

  makeMCQ({ id:'g6fr-arg-034', chapterId:'g6fr-argumentation', subsection:'connecteurs', difficulty:3,
    question:'Quel connecteur introduit une CONCESSION dans un argument ?',
    options:['De plus','En conclusion','Certes','C\'est pourquoi'],
    answer:'Certes',
    hint:'"Certes" = il est vrai que / admittedly - concède un point avant de le nuancer.',
    explanation:'"<b>Certes</b>" = connecteur de concession (admittedly/granted). Usage : "Certes, internet présente des risques, <b>mais</b> ses avantages sont nombreux." Autres connecteurs de concession : "il est vrai que", "même si". À distinguer de "de plus" (ajout), "c\'est pourquoi" (conséquence), "en conclusion" (synthèse).' }),

  makeMCQ({ id:'g6fr-arg-035', chapterId:'g6fr-argumentation', subsection:'structure', difficulty:4,
    question:'Shanvi doit écrire un paragraphe argumentatif sur les réseaux sociaux. Quelle structure est la meilleure ?',
    options:[
      'Argument + Exemple + Explication',
      'Exemple + Argument + Exemple',
      'Conclusion + Argument + Introduction',
      'Explication + Conclusion + Argument'
    ],
    answer:'Argument + Exemple + Explication',
    hint:'Structure P.E.E. (Point / Evidence / Explanation) : d\'abord l\'idée, puis la preuve, puis la justification.',
    explanation:'"<b>Argument + Exemple + Explication</b>" - Structure P.E.E. (Point-Evidence-Explanation) : (1) énoncer l\'<b>argument</b> (thèse du paragraphe), (2) donner un <b>exemple</b> concret ou une statistique, (3) expliquer le lien entre l\'exemple et l\'argument. Ex : "Les réseaux sociaux créent des liens (argument). Par exemple, des amis séparés par l\'océan peuvent rester en contact (exemple). Ainsi, la distance géographique n\'empêche plus l\'amitié (explication)."' })

);
