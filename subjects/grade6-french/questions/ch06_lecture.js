'use strict';
// Grade 6 French — Chapter: Textes & Compréhension
// IDs format: g6fr-lec-NNN

const _TEXTE_G6 = `<div style="background:#f8fafc;border-left:4px solid #7c3aed;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7">
<b style="color:#5b21b6">Lisez le texte attentivement, puis répondez aux questions.</b><br><br>
<b>L'Île Maurice et l'environnement</b><br><br>
L'île Maurice est connue pour ses plages de sable blanc, ses lagons aux eaux cristallines et sa biodiversité exceptionnelle. Cependant, cet écrin de nature est aujourd'hui menacé par plusieurs problèmes environnementaux graves.<br><br>
La pollution des océans constitue l'une des principales menaces. Des milliers de bouteilles en plastique et de sacs jetables se retrouvent dans nos lagons, mettant en danger les poissons, les coraux et les tortues marines. En 2020, le gouvernement mauricien a interdit les sacs en plastique à usage unique — une mesure saluée par les écologistes.<br><br>
De plus, le réchauffement climatique provoque le blanchissement des coraux. Les coraux, qui abritent une grande variété d'espèces marines, blanchissent et meurent lorsque la température de l'eau augmente. La perte des récifs coralliens aurait des conséquences désastreuses pour le tourisme et la pêche, deux piliers essentiels de l'économie mauricienne.<br><br>
Face à ces défis, il est impératif que les citoyens, les entreprises et le gouvernement unissent leurs efforts pour protéger ce patrimoine naturel exceptionnel.
</div>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-lec-001', chapterId:'g6fr-lecture', difficulty:1,
    question:`${_TEXTE_G6}Selon le texte, pourquoi l'île Maurice est-elle célèbre ?`,
    options:[
      'Pour ses montagnes et ses forêts tropicales uniquement',
      'Pour ses plages de sable blanc, ses lagons et sa biodiversité exceptionnelle',
      'Pour ses grandes villes et son industrie',
      'Pour ses volcans actifs'
    ],
    answer:'Pour ses plages de sable blanc, ses lagons et sa biodiversité exceptionnelle',
    hint:'Regardez la première phrase du texte.',
    explanation:'Le texte dit : "L\'île Maurice est connue pour ses <b>plages de sable blanc, ses lagons aux eaux cristallines et sa biodiversité exceptionnelle</b>."' }),

  makeMCQ({ id:'g6fr-lec-002', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_G6}Que signifie le mot "menacé" dans la phrase "cet écrin de nature est aujourd'hui menacé" ?`,
    options:['protégé','célébré','en danger','admirable'],
    answer:'en danger',
    hint:'Le contexte parle de "problèmes environnementaux graves". Quelle est la conséquence pour l\'île ?',
    explanation:'"<b>Menacé</b>" = threatened / in danger. Le contexte — "problèmes environnementaux graves" qui suivent — confirme que l\'île est en danger. Synonymes : en péril, mis en danger, fragile.' }),

  makeMCQ({ id:'g6fr-lec-003', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_G6}Quelle mesure le gouvernement mauricien a-t-il prise en 2020 ?`,
    options:[
      'Il a interdit la pêche dans les lagons.',
      'Il a construit de nouvelles plages artificielles.',
      'Il a interdit les sacs en plastique à usage unique.',
      'Il a planté des milliers de coraux.'
    ],
    answer:'Il a interdit les sacs en plastique à usage unique.',
    hint:'Cherchez "2020" dans le deuxième paragraphe.',
    explanation:'"En 2020, le gouvernement mauricien a <b>interdit les sacs en plastique à usage unique</b> — une mesure saluée par les écologistes." "Saluée" = welcomed/praised.' }),

  makeMCQ({ id:'g6fr-lec-004', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_G6}Qu'est-ce que le blanchissement des coraux et quelle en est la cause selon le texte ?`,
    options:[
      'Les coraux deviennent blancs à cause de la pollution plastique.',
      'Les coraux blanchissent et meurent quand la température de l\'eau augmente.',
      'Les coraux blancs sont une espèce rare et protégée.',
      'Les coraux blanchissent à cause du manque de lumière.'
    ],
    answer:"Les coraux blanchissent et meurent quand la température de l'eau augmente.",
    hint:'Cherchez la définition et la cause dans le troisième paragraphe.',
    explanation:'Le texte explique : "Les coraux... <b>blanchissent et meurent lorsque la température de l\'eau augmente</b>." Le réchauffement climatique est donc la cause du blanchissement des coraux.' }),

  makeMCQ({ id:'g6fr-lec-005', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_G6}Selon le texte, quelles seraient les conséquences de la perte des récifs coralliens ?`,
    options:[
      'Une augmentation du tourisme',
      'Des conséquences désastreuses pour le tourisme et la pêche',
      'La disparition des sacs en plastique',
      'Une amélioration de la qualité de l\'eau'
    ],
    answer:'Des conséquences désastreuses pour le tourisme et la pêche',
    hint:'Le texte utilise le conditionnel ("aurait") pour exprimer ces conséquences potentielles.',
    explanation:'"La perte des récifs coralliens <b>aurait des conséquences désastreuses pour le tourisme et la pêche</b>, deux piliers essentiels de l\'économie mauricienne." Le conditionnel "aurait" exprime une conséquence hypothétique.' }),

  makeMCQ({ id:'g6fr-lec-006', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_G6}Quelle figure de style est utilisée dans "cet écrin de nature" ?`,
    options:['une comparaison avec "comme"','une métaphore','une allitération','une personnification'],
    answer:'une métaphore',
    hint:'L\'île est comparée à un écrin (jewellery box) sans utiliser "comme" ou "tel que".',
    explanation:'"Cet <b>écrin</b> de nature" est une <b>métaphore</b> — l\'île est comparée à un écrin (jewellery box) qui protège des bijoux précieux, mais sans utiliser les mots comparatifs "comme" ou "tel que". Si on disait "comme un écrin", ce serait une comparaison.' }),

  makeTF({ id:'g6fr-lec-007', chapterId:'g6fr-lecture', difficulty:1,
    question:`${_TEXTE_G6}Vrai ou Faux : Les récifs coralliens n'ont aucune importance économique pour Maurice.`,
    answer:false,
    hint:'Regardez la fin du troisième paragraphe.',
    explanation:'<b>Faux.</b> Le texte dit que le tourisme et la pêche sont "<b>deux piliers essentiels de l\'économie mauricienne</b>". Les récifs coralliens soutiennent ces deux secteurs — ils ont donc une importance économique majeure.' }),

  makeMCQ({ id:'g6fr-lec-008', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_G6}Quel est le ton général de ce texte ?`,
    options:['humoristique et léger','informatif et alarmiste','poétique et lyrique','neutre et scientifique'],
    answer:'informatif et alarmiste',
    hint:'Le texte donne des informations mais aussi exprime une urgence. Cherchez les mots qui montrent la gravité.',
    explanation:'Le texte est <b>informatif</b> (donne des faits sur la pollution et les coraux) et <b>alarmiste</b> (souligne le danger : "menacé", "problèmes graves", "conséquences désastreuses", "il est impératif"). L\'auteur veut informer ET alerter le lecteur.' }),

  makeMCQ({ id:'g6fr-lec-009', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_G6}Trouvez dans le texte un connecteur de concession (qui introduit une idée contraire).`,
    options:['De plus','Cependant','Lorsque','Car'],
    answer:'Cependant',
    hint:'Un connecteur de concession introduit un "mais" ou une idée qui contraste.',
    explanation:'"<b>Cependant</b>" est le connecteur de concession dans le texte : "L\'île Maurice est connue pour sa beauté. <b>Cependant</b>, cet écrin de nature est menacé." Il introduit l\'idée contraire (le danger) après l\'idée positive (la beauté).' }),

  makeMCQ({ id:'g6fr-lec-010', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_G6}Selon le dernier paragraphe, qui doit agir pour protéger l'environnement mauricien ?`,
    options:[
      'Uniquement le gouvernement',
      'Uniquement les écologistes et les scientifiques',
      'Les citoyens, les entreprises et le gouvernement ensemble',
      'Les touristes étrangers'
    ],
    answer:'Les citoyens, les entreprises et le gouvernement ensemble',
    hint:'Le dernier paragraphe utilise le mot "unissent" — qui doit s\'unir ?',
    explanation:'"Il est impératif que <b>les citoyens, les entreprises et le gouvernement</b> unissent leurs efforts pour protéger ce patrimoine naturel exceptionnel." Le texte insiste sur une action collective — pas individuelle ou gouvernementale seule.' })

);

const _TEXTE_DODO_FR = `<div style="background:#f8fafc;border-left:4px solid #7c3aed;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7">
<b style="color:#5b21b6">Lisez attentivement le texte, puis répondez aux questions.</b><br><br>
<b>Le dodo : l\'oiseau disparu de Maurice</b><br><br>
Le dodo était un grand oiseau incapable de voler qui vivait uniquement sur l\'île Maurice. Mesurant près d\'un mètre de hauteur et pesant jusqu\'à vingt-trois kilogrammes, cet oiseau étrange possédait des ailes si petites qu\'elles lui étaient totalement inutiles pour s\'élever dans les airs. Les scientifiques pensent que le dodo a perdu la faculté de voler parce que l\'île ne comptait aucun prédateur terrestre — il n\'avait donc aucun besoin de fuir par les airs.<br><br>
Lorsque les marins hollandais débarquèrent à Maurice à la fin du XVIIe siècle, le sort du dodo fut scellé. Ces oiseaux étaient faciles à attraper car ils n\'avaient aucune peur des humains, n\'ayant jamais appris à fuir un danger. Les marins les chassaient pour se nourrir, mais la menace la plus grave provenait des animaux introduits par les colons : des rats, des cochons et des singes qui pillaient les nids et dévoraient les œufs. En moins de quatre-vingts ans après l\'arrivée des premiers hommes, le dodo était éteint.<br><br>
Aujourd\'hui, le dodo est devenu un puissant symbole. On utilise l\'expression "mort comme un dodo" pour désigner quelque chose de complètement et irrémédiablement disparu. Mais son histoire nous adresse également un avertissement : les mêmes facteurs — chasse, destruction des habitats et espèces envahissantes — continuent d\'entraîner l\'extinction d\'autres animaux de nos jours. À Maurice, des efforts de conservation protègent désormais des espèces endémiques comme le Pigeon Rose et la Perruche de Maurice.
</div>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-lec-011', chapterId:'g6fr-lecture', difficulty:1,
    question:`${_TEXTE_DODO_FR}Selon le texte, pourquoi le dodo ne pouvait-il pas voler ?`,
    options:[
      'Parce que ses ailes avaient été blessées par les marins',
      'Parce que l\'île ne comptait aucun prédateur terrestre, donc il n\'avait pas besoin de voler',
      'Parce qu\'il était trop lourd pour s\'envoler',
      'Parce qu\'il préférait nager plutôt que voler'
    ],
    answer:'Parce que l\'île ne comptait aucun prédateur terrestre, donc il n\'avait pas besoin de voler',
    hint:'Cherchez l\'explication scientifique dans le premier paragraphe.',
    explanation:'Le texte explique : "Les scientifiques pensent que le dodo a perdu la faculté de voler parce que l\'île ne comptait <b>aucun prédateur terrestre</b> — il n\'avait donc aucun besoin de fuir par les airs." C\'est un exemple d\'<b>adaptation évolutive</b> : les espèces perdent les caractéristiques dont elles n\'ont pas besoin dans leur environnement.' }),

  makeMCQ({ id:'g6fr-lec-012', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_DODO_FR}Que signifie le mot "scellé" dans "le sort du dodo fut scellé" ?`,
    options:['protégé','déterminé de façon définitive et irréversible','discuté longuement','changé favorablement'],
    answer:'déterminé de façon définitive et irréversible',
    hint:'Dans ce contexte, "scellé" signifie quelque chose qui ne peut plus être changé — comme un destin fixé.',
    explanation:'"Son sort fut <b>scellé</b>" = son destin fut définitivement et irrévocablement fixé. L\'expression "sceller le sort" est une expression figurée signifiant rendre quelque chose inévitable. Le manuel MIE de 6e demande aux élèves d\'expliquer le sens de mots ou d\'expressions en utilisant le contexte environnant — ici le contexte (l\'arrivée des marins, la disparition du dodo) confirme la notion de fin inévitable.' }),

  makeTF({ id:'g6fr-lec-013', chapterId:'g6fr-lecture', difficulty:1,
    question:`${_TEXTE_DODO_FR}Vrai ou Faux : La principale raison de l'extinction du dodo était la chasse par les marins.`,
    answer:false,
    hint:'Relisez attentivement le deuxième paragraphe — quelle menace l\'auteur qualifie de "la plus grave" ?',
    explanation:'<b>Faux.</b> Le texte précise : "les marins les chassaient pour se nourrir, mais <b>la menace la plus grave</b> provenait des animaux introduits par les colons : des rats, des cochons et des singes qui <b>pillaient les nids et dévoraient les œufs</b>." Les espèces envahissantes (invasive species) ont donc causé plus de dégâts que la chasse directe.' }),

  makeMCQ({ id:'g6fr-lec-014', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_DODO_FR}Quel est le sens de l'expression "mort comme un dodo" d'après le texte ?`,
    options:[
      'Quelque chose qui est en danger mais peut encore être sauvé',
      'Quelque chose de complètement et irrémédiablement disparu',
      'Un oiseau qui ne peut pas voler',
      'Une espèce qui vit uniquement à Maurice'
    ],
    answer:'Quelque chose de complètement et irrémédiablement disparu',
    hint:'Le texte donne directement la définition de cette expression.',
    explanation:'Le texte explique : "On utilise l\'expression \'mort comme un dodo\' pour désigner quelque chose de <b>complètement et irrémédiablement disparu</b>." C\'est une expression idiomatique dont le sens est ancré dans l\'histoire réelle de l\'extinction du dodo. "Irrémédiablement" = sans remède possible, de manière définitive.' }),

  makeMCQ({ id:'g6fr-lec-015', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_DODO_FR}Identifiez une figure de style dans "cet oiseau étrange possédait des ailes si petites qu'elles lui étaient totalement inutiles."`,
    options:['une métaphore','une personnification','une hyperbole','une comparaison avec "comme"'],
    answer:'une hyperbole',
    hint:'L\'auteur exagère pour renforcer l\'idée que les ailes ne servaient absolument à rien.',
    explanation:'"Des ailes <b>totalement</b> inutiles" est une légère <b>hyperbole</b> — exagération pour souligner l\'inutilité complète des ailes. En réalité, les ailes jouaient peut-être un rôle d\'équilibre ou de séduction, mais l\'auteur les décrit comme "totalement" inutiles pour créer un effet de surprise. Le manuel MIE de 6e liste les figures de style : comparaison, métaphore, personnification, hyperbole, anaphore.' }),

  makeMCQ({ id:'g6fr-lec-016', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_DODO_FR}Selon le dernier paragraphe, quelle est la leçon que l'on peut tirer de l'histoire du dodo ?`,
    options:[
      'Les oiseaux qui ne peuvent pas voler sont tous destinés à disparaître',
      'La chasse est toujours la principale cause d\'extinction des animaux',
      'Les mêmes facteurs — chasse, destruction des habitats et espèces envahissantes — continuent de menacer d\'autres animaux aujourd\'hui',
      'Maurice est le seul pays à avoir perdu une espèce endémique'
    ],
    answer:'Les mêmes facteurs — chasse, destruction des habitats et espèces envahissantes — continuent de menacer d\'autres animaux aujourd\'hui',
    hint:'Le dernier paragraphe utilise le mot "avertissement" — qu\'est-ce que le dodo nous enseigne ?',
    explanation:'Le texte dit : "son histoire nous adresse également un <b>avertissement</b> : les mêmes facteurs — chasse, destruction des habitats et espèces envahissantes — <b>continuent d\'entraîner l\'extinction d\'autres animaux de nos jours</b>." L\'auteur utilise l\'histoire du dodo pour parler des enjeux de conservation actuels — c\'est une démarche argumentative que le manuel MIE de 6e nomme le "passage du particulier au général".' }),

  makeMCQ({ id:'g6fr-lec-017', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_DODO_FR}Quel est le type de ce texte ?`,
    options:['Un texte poétique','Un texte narratif et informatif','Un texte publicitaire','Une lettre formelle'],
    answer:'Un texte narratif et informatif',
    hint:'Le texte raconte des événements (narratif) et donne des informations scientifiques et historiques (informatif).',
    explanation:'Ce texte est <b>narratif et informatif</b> : (1) <b>Narratif</b> — il raconte l\'histoire du dodo dans un ordre chronologique (passé → présent) ; (2) <b>Informatif</b> — il donne des données scientifiques (poids, taille, évolution) et historiques (arrivée des Hollandais). Le manuel MIE de 6e distingue les types de textes : narratif, descriptif, informatif, argumentatif, poétique — savoir les identifier est une compétence de lecture évaluée au PSAC.' }),

  makeMCQ({ id:'g6fr-lec-018', chapterId:'g6fr-lecture', difficulty:3,
    question:`${_TEXTE_DODO_FR}Quel temps verbal est principalement utilisé dans le deuxième paragraphe pour raconter les événements passés, et pourquoi ?`,
    options:[
      'Le présent, pour rendre les événements vivants',
      'L\'imparfait, pour décrire des actions habituelles',
      'Le passé composé ou le passé simple, pour des actions précises et terminées dans le passé',
      'Le futur antérieur, pour des actions avant un moment futur'
    ],
    answer:'Le passé composé ou le passé simple, pour des actions précises et terminées dans le passé',
    hint:'Les marins "débarquèrent", le sort "fut scellé", ils "chassaient" — identifiez les temps utilisés.',
    explanation:'Le deuxième paragraphe utilise principalement le <b>passé simple</b> (débarquèrent, fut, provenait) pour des <b>actions précises et achevées</b> dans le passé. L\'imparfait est aussi utilisé ("n\'avaient aucune peur", "chassaient") pour des <b>états ou habitudes passés</b>. En lecture, reconnaître les temps verbaux aide à comprendre la structure temporelle du récit — compétence clé dans les épreuves PSAC de français de 6e.' }),

  makeMCQ({ id:'g6fr-lec-019', chapterId:'g6fr-lecture', difficulty:4,
    question:`${_TEXTE_DODO_FR}En utilisant la méthode "Relevé → Interprétation", quelle citation du texte illustre MIEUX l'idée que le dodo était vulnérable face aux humains ?`,
    options:[
      '"Mesurant près d\'un mètre de hauteur"',
      '"ils n\'avaient aucune peur des humains, n\'ayant jamais appris à fuir un danger"',
      '"On utilise l\'expression \'mort comme un dodo\'"',
      '"des espèces endémiques comme le Pigeon Rose"'
    ],
    answer:'"ils n\'avaient aucune peur des humains, n\'ayant jamais appris à fuir un danger"',
    hint:'Cherchez la citation qui explique directement POURQUOI les dodos étaient si faciles à capturer.',
    explanation:'"<b>ils n\'avaient aucune peur des humains, n\'ayant jamais appris à fuir un danger</b>" — Cette citation illustre parfaitement la vulnérabilité du dodo. <b>Relevé</b> : "aucune peur" / "jamais appris à fuir". <b>Interprétation</b> : L\'isolement évolutif de Maurice, sans prédateurs terrestres, avait rendu le dodo incapable de reconnaître le danger humain comme une menace — ce qui le rendait d\'une facilité tragique à capturer. La méthode Relevé → Interprétation est enseignée dans le manuel MIE de 6e pour les questions de compréhension de texte.' })

);
