'use strict';
// Grade 6 French — Chapitre : L'Expression Écrite & Argumentation
// IDs format: g6fr-arg-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-arg-001', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Quelle expression introduit une OPINION PERSONNELLE ?',
    options:['En conclusion','De plus','À mon avis','Cependant'],
    answer:'À mon avis',
    hint:'"À mon avis" signifie "In my opinion" — c\'est une expression d\'opinion.',
    explanation:'"<b>À mon avis</b>" = pour exprimer son opinion. Autres expressions d\'opinion : Je pense que, Je crois que, Il me semble que, Je suis convaincu(e) que, Selon moi. "En conclusion" = conclusion ; "De plus" = ajout d\'idée ; "Cependant" = opposition.' }),

  makeMCQ({ id:'g6fr-arg-002', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Quel connecteur AJOUTE une idée à la précédente ?',
    options:['Cependant','Pourtant','De plus','En revanche'],
    answer:'De plus',
    hint:'"De plus" signifie "furthermore" — on ajoute une information.',
    explanation:'"<b>De plus</b>" = pour ajouter une idée. Autres connecteurs d\'ajout : En outre, Par ailleurs, Non seulement… mais aussi, Également. "Cependant / Pourtant / En revanche" = opposition.' }),

  makeMCQ({ id:'g6fr-arg-003', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Quelle structure exprime une CONCESSION (reconnaître le point de vue contraire) ?',
    options:['En conclusion…','Certes, … Cependant,…','De plus…','En résumé…'],
    answer:'Certes, … Cependant,…',
    hint:'"Certes" admet un point, puis "Cependant" introduit l\'opposition.',
    explanation:'"<b>Certes, … Cependant,…</b>" = structure de concession classique : "Certes, les voitures sont pratiques. Cependant, elles polluent l\'environnement." On reconnaît d\'abord l\'argument adverse, puis on donne son propre argument.' }),

  makeMCQ({ id:'g6fr-arg-004', chapterId:'g6fr-argumentation', difficulty:1,
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

  makeMCQ({ id:'g6fr-arg-005', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Quelle expression annonce correctement la CONCLUSION d\'un texte ?',
    options:['De plus','Bien que','En conclusion','Certes'],
    answer:'En conclusion',
    hint:'Cette expression signal le dernier paragraphe.',
    explanation:'"<b>En conclusion</b>" annonce la conclusion. Autres expressions : En résumé, Pour conclure, En définitive, En somme. La conclusion résume les idées principales et propose une réflexion finale — elle n\'introduit pas de nouvelles idées.' }),

  makeTF({ id:'g6fr-arg-006', chapterId:'g6fr-argumentation', difficulty:2,
    question:'"Non seulement… mais aussi" est utilisé pour introduire une idée contraire.',
    answer:false,
    hint:'"Non seulement" = not only. "Mais aussi" = but also.',
    explanation:'<b>Faux.</b> "Non seulement… <b>mais aussi</b>" = "Non seulement… mais également" — cette structure <b>ajoute</b> une idée, elle n\'oppose pas. "Non seulement c\'est utile, mais aussi c\'est beau." Les connecteurs d\'opposition : Cependant, Pourtant, En revanche, Néanmoins, Toutefois.' }),

  makeMCQ({ id:'g6fr-arg-007', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Quel connecteur exprime une CONSÉQUENCE ?',
    options:['Cependant','Donc / Ainsi','De plus','Certes'],
    answer:'Donc / Ainsi',
    hint:'"Donc" = therefore/so — la conséquence découle de ce qui précède.',
    explanation:'"<b>Donc</b>" et "<b>Ainsi</b>" expriment la conséquence. "La forêt a brûlé. <b>Donc</b>, de nombreux animaux ont perdu leur habitat." Autres connecteurs de conséquence : Par conséquent, C\'est pourquoi, En conséquence, Si bien que.' }),

  makeMCQ({ id:'g6fr-arg-008', chapterId:'g6fr-argumentation', difficulty:2,
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

  makeTF({ id:'g6fr-arg-009', chapterId:'g6fr-argumentation', difficulty:1,
    question:'Dans un texte argumentatif, la "problématique" est la question centrale à laquelle le texte cherche à répondre.',
    answer:true,
    hint:'Pensez à la question principale posée dans l\'introduction.',
    explanation:'<b>Vrai.</b> La <b>problématique</b> est la question centrale posée dans l\'introduction : ex. "Les réseaux sociaux sont-ils bénéfiques pour les jeunes ?" Tout le développement s\'organise autour de cette question.' }),

  makeMCQ({ id:'g6fr-arg-010', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Que signifie "En revanche" dans un texte ?',
    options:['En conclusion','De plus','En revanche = D\'un autre côté / Par contre','À cause de cela'],
    answer:'En revanche = D\'un autre côté / Par contre',
    hint:'"En revanche" introduit une idée qui s\'oppose à la précédente.',
    explanation:'"<b>En revanche</b>" = D\'un autre côté / Par contre / En contrepartie. "Les voitures sont rapides. <b>En revanche</b>, elles polluent." Synonymes : Cependant, Toutefois, Néanmoins, Pourtant.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-arg-011', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Quel connecteur indique qu\'une idée s\'ajoute à la précédente en l\'amplifiant ?',
    options:['Or','Pourtant','De surcroît','Car'],
    answer:'De surcroît',
    hint:'"De surcroît" = moreover/on top of that — on ajoute une idée encore plus forte.',
    explanation:'"<b>De surcroît</b>" (= moreover, on top of that) ajoute une idée en l\'amplifiant : "Ce projet est coûteux. <b>De surcroît</b>, il risque d\'être inefficace." Connecteurs d\'ajout par ordre de fréquence (manuel MIE de 6e) : de plus, en outre, par ailleurs, également, <b>de surcroît</b> (renforcé), non seulement… mais aussi.' }),

  makeMCQ({ id:'g6fr-arg-012', chapterId:'g6fr-argumentation', difficulty:1,
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

  makeMCQ({ id:'g6fr-arg-013', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Complétez avec le bon connecteur : "___ je comprends les inquiétudes, je pense que les bénéfices l\'emportent."',
    options:['Donc','Certes','Car','Ainsi'],
    answer:'Certes',
    hint:'"Certes" reconnaît un point opposé avant de le dépasser avec son propre argument.',
    explanation:'"<b>Certes</b> je comprends les inquiétudes, je pense que les bénéfices l\'emportent." — <b>Certes</b> (= admittedly, granted) concède un point à l\'adversaire avant de le réfuter. Structure classique de la concession au bac de français : "Certes… mais/cependant/néanmoins…" Le manuel MIE de 6e enseigne cette structure pour les dissertations et les débats.' }),

  makeMCQ({ id:'g6fr-arg-014', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Quelle phrase représente le meilleur ARGUMENT pour un débat sur la protection de l\'environnement à Maurice ?',
    options:[
      '"Je pense que l\'environnement est important."',
      '"L\'environnement est beau à Maurice."',
      '"La dégradation des récifs coralliens menace directement le tourisme, pilier essentiel de l\'économie mauricienne."',
      '"Il faudrait peut-être faire quelque chose pour la nature."'
    ],
    answer:'"La dégradation des récifs coralliens menace directement le tourisme, pilier essentiel de l\'économie mauricienne."',
    hint:'Un bon argument est précis, factuel et montre clairement les conséquences.',
    explanation:'"La dégradation des récifs coralliens <b>menace directement le tourisme, pilier essentiel de l\'économie mauricienne</b>." — C\'est un argument efficace car : (1) il est <b>précis</b> (récifs coralliens, tourisme) ; (2) il montre les <b>conséquences</b> économiques ; (3) il utilise le vocabulaire soutenu du manuel MIE de 6e. Un bon argument répond toujours à "Pourquoi ? Avec quelles preuves ?"' }),

  makeTF({ id:'g6fr-arg-015', chapterId:'g6fr-argumentation', difficulty:1,
    question:'Dans un texte argumentatif, la conclusion peut introduire de nouveaux arguments.',
    answer:false,
    hint:'Que doit contenir la conclusion ? Que ne doit-elle PAS contenir ?',
    explanation:'<b>Faux.</b> La conclusion d\'un texte argumentatif doit : (1) <b>résumer</b> les idées principales ; (2) reprendre la thèse en d\'autres termes ; (3) proposer une <b>ouverture</b> (réflexion plus large). Elle ne doit <b>jamais</b> introduire de nouveaux arguments — ceux-ci appartiennent au développement. Selon le manuel MIE de 6e, introduire un nouveau point dans la conclusion est considéré comme une erreur de structure.' }),

  makeMCQ({ id:'g6fr-arg-016', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Comment orthographie-t-on correctement l\'accord dans : "Elle est convaincue que cette solution est la meilleure."',
    options:[
      '"convaincu" (masculin, sans accord)',
      '"convaincue" (féminin, accord avec le sujet)',
      '"convaincues" (pluriel)',
      '"convaincu" (forme invariable)'
    ],
    answer:'"convaincue" (féminin, accord avec le sujet)',
    hint:'"Elle" est féminin singulier → l\'adjectif s\'accorde en genre et en nombre.',
    explanation:'"Elle est <b>convaincue</b>" — Les adjectifs et les participes passés (attributs du sujet) s\'accordent en <b>genre et en nombre</b> avec le sujet. "Elle" = féminin singulier → "convaincu" + <b>-e</b> = "convaincue". Le manuel MIE de 6e insiste sur les accords (adjectif/nom, verbe/sujet) dans l\'expression écrite — c\'est un critère de notation du PSAC.' }),

  makeMCQ({ id:'g6fr-arg-017', chapterId:'g6fr-argumentation', difficulty:3,
    question:'Quel est le rôle du connecteur "Or" dans un texte argumentatif ?',
    options:[
      'Il ajoute une idée semblable à la précédente',
      'Il introduit un fait nouveau qui va modifier ou nuancer ce qui vient d\'être dit',
      'Il conclut le texte',
      'Il exprime la cause'
    ],
    answer:'Il introduit un fait nouveau qui va modifier ou nuancer ce qui vient d\'être dit',
    hint:'"Or" = now/but in fact — il marque une transition vers un fait inattendu ou révélateur.',
    explanation:'"<b>Or</b>" (= now, but, however — en anglais) introduit un fait nouveau qui change ou nuance la perspective : "On pensait que le problème était résolu. <b>Or</b>, les chiffres montrent une aggravation." Il crée une surprise ou un tournant dans l\'argumentation. Très utilisé dans les dissertations de niveau 6e, mais moins fréquent que "cependant" ou "de plus".' }),

  makeMCQ({ id:'g6fr-arg-018', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Laquelle de ces phrases utilise correctement les connecteurs pour structurer un paragraphe argumentatif ?',
    options:[
      '"De plus, cependant, en conclusion, les technologies sont utiles."',
      '"Premièrement, les technologies facilitent l\'apprentissage. En effet, les élèves accèdent facilement à des ressources éducatives. Cependant, elles peuvent aussi distraire."',
      '"Les technologies. De plus. Sont utiles. Car. En conclusion."',
      '"Je pense que les technologies. Donc elles sont bonnes."'
    ],
    answer:'"Premièrement, les technologies facilitent l\'apprentissage. En effet, les élèves accèdent facilement à des ressources éducatives. Cependant, elles peuvent aussi distraire."',
    hint:'Un bon paragraphe suit la structure : argument + illustration/explication + nuance.',
    explanation:'"<b>Premièrement</b>, les technologies facilitent l\'apprentissage. <b>En effet</b>, les élèves accèdent à des ressources. <b>Cependant</b>, elles peuvent distraire." — Structure modèle : (1) <b>Premièrement</b> = annonce l\'argument ; (2) <b>En effet</b> = illustre/explique ; (3) <b>Cependant</b> = nuance. Le manuel MIE de 6e utilise ce modèle explicitement pour la rédaction argumentative.' }),

  makeMCQ({ id:'g6fr-arg-019', chapterId:'g6fr-argumentation', difficulty:4,
    question:'Dans un débat sur l\'utilisation des téléphones portables à l\'école, quelle phrase représente la meilleure RÉFUTATION (contre-argument) ?',
    options:[
      '"Je ne suis pas d\'accord avec toi."',
      '"Certes, les téléphones permettent d\'accéder à des informations rapidement. Néanmoins, des études montrent qu\'ils réduisent la concentration des élèves de 25%."',
      '"Les téléphones sont mauvais pour les enfants."',
      '"Mon professeur dit que les téléphones sont interdits."'
    ],
    answer:'"Certes, les téléphones permettent d\'accéder à des informations rapidement. Néanmoins, des études montrent qu\'ils réduisent la concentration des élèves de 25%."',
    hint:'Une bonne réfutation reconnaît d\'abord l\'argument adverse (certes...) puis le dépasse avec une preuve plus forte.',
    explanation:'Structure de la réfutation efficace : (1) <b>Certes</b> [reconnaître l\'argument adverse] + (2) <b>Néanmoins / Cependant / Toutefois</b> [réfuter avec un argument plus fort + preuve]. La preuve chiffrée ("25%") donne plus de crédibilité. Le manuel MIE de 6e enseigne cette technique de concession-réfutation comme l\'une des compétences argumentatives clés pour le PSAC.' })

);
