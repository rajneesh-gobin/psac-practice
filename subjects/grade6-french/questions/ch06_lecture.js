'use strict';
// Grade 6 French - Chapter: Textes & Compréhension
// IDs format: g6fr-lec-NNN

const _TEXTE_G6 = `<div style="background:#f8fafc;border-left:4px solid #7c3aed;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7">
<b style="color:#5b21b6">Lisez le texte attentivement, puis répondez aux questions.</b><br><br>
<b>L'Île Maurice et l'environnement</b><br><br>
L'île Maurice est connue pour ses plages de sable blanc, ses lagons aux eaux cristallines et sa biodiversité exceptionnelle. Cependant, cet écrin de nature est aujourd'hui menacé par plusieurs problèmes environnementaux graves.<br><br>
La pollution des océans constitue l'une des principales menaces. Des milliers de bouteilles en plastique et de sacs jetables se retrouvent dans nos lagons, mettant en danger les poissons, les coraux et les tortues marines. En 2020, le gouvernement mauricien a interdit les sacs en plastique à usage unique - une mesure saluée par les écologistes.<br><br>
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
    explanation:'"<b>Menacé</b>" = threatened / in danger. Le contexte - "problèmes environnementaux graves" qui suivent - confirme que l\'île est en danger. Synonymes : en péril, mis en danger, fragile.' }),

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
    explanation:'"En 2020, le gouvernement mauricien a <b>interdit les sacs en plastique à usage unique</b> - une mesure saluée par les écologistes." "Saluée" = welcomed/praised.' }),

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
    explanation:'"Cet <b>écrin</b> de nature" est une <b>métaphore</b> - l\'île est comparée à un écrin (jewellery box) qui protège des bijoux précieux, mais sans utiliser les mots comparatifs "comme" ou "tel que". Si on disait "comme un écrin", ce serait une comparaison.' }),

  makeTF({ id:'g6fr-lec-007', chapterId:'g6fr-lecture', difficulty:1,
    question:`${_TEXTE_G6}Vrai ou Faux : Les récifs coralliens n'ont aucune importance économique pour Maurice.`,
    answer:false,
    hint:'Regardez la fin du troisième paragraphe.',
    explanation:'<b>Faux.</b> Le texte dit que le tourisme et la pêche sont "<b>deux piliers essentiels de l\'économie mauricienne</b>". Les récifs coralliens soutiennent ces deux secteurs - ils ont donc une importance économique majeure.' }),

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
    hint:'Le dernier paragraphe utilise le mot "unissent" - qui doit s\'unir ?',
    explanation:'"Il est impératif que <b>les citoyens, les entreprises et le gouvernement</b> unissent leurs efforts pour protéger ce patrimoine naturel exceptionnel." Le texte insiste sur une action collective - pas individuelle ou gouvernementale seule.' })

);

const _TEXTE_DODO_FR = `<div style="background:#f8fafc;border-left:4px solid #7c3aed;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7">
<b style="color:#5b21b6">Lisez attentivement le texte, puis répondez aux questions.</b><br><br>
<b>Le dodo : l\'oiseau disparu de Maurice</b><br><br>
Le dodo était un grand oiseau incapable de voler qui vivait uniquement sur l\'île Maurice. Mesurant près d\'un mètre de hauteur et pesant jusqu\'à vingt-trois kilogrammes, cet oiseau étrange possédait des ailes si petites qu\'elles lui étaient totalement inutiles pour s\'élever dans les airs. Les scientifiques pensent que le dodo a perdu la faculté de voler parce que l\'île ne comptait aucun prédateur terrestre - il n\'avait donc aucun besoin de fuir par les airs.<br><br>
Lorsque les marins hollandais débarquèrent à Maurice à la fin du XVIIe siècle, le sort du dodo fut scellé. Ces oiseaux étaient faciles à attraper car ils n\'avaient aucune peur des humains, n\'ayant jamais appris à fuir un danger. Les marins les chassaient pour se nourrir, mais la menace la plus grave provenait des animaux introduits par les colons : des rats, des cochons et des singes qui pillaient les nids et dévoraient les œufs. En moins de quatre-vingts ans après l\'arrivée des premiers hommes, le dodo était éteint.<br><br>
Aujourd\'hui, le dodo est devenu un puissant symbole. On utilise l\'expression "mort comme un dodo" pour désigner quelque chose de complètement et irrémédiablement disparu. Mais son histoire nous adresse également un avertissement : les mêmes facteurs - chasse, destruction des habitats et espèces envahissantes - continuent d\'entraîner l\'extinction d\'autres animaux de nos jours. À Maurice, des efforts de conservation protègent désormais des espèces endémiques comme le Pigeon Rose et la Perruche de Maurice.
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
    explanation:'Le texte explique : "Les scientifiques pensent que le dodo a perdu la faculté de voler parce que l\'île ne comptait <b>aucun prédateur terrestre</b> - il n\'avait donc aucun besoin de fuir par les airs." C\'est un exemple d\'<b>adaptation évolutive</b> : les espèces perdent les caractéristiques dont elles n\'ont pas besoin dans leur environnement.' }),

  makeMCQ({ id:'g6fr-lec-012', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_DODO_FR}Que signifie le mot "scellé" dans "le sort du dodo fut scellé" ?`,
    options:['protégé','déterminé de façon définitive et irréversible','discuté longuement','changé favorablement'],
    answer:'déterminé de façon définitive et irréversible',
    hint:'Dans ce contexte, "scellé" signifie quelque chose qui ne peut plus être changé - comme un destin fixé.',
    explanation:'"Son sort fut <b>scellé</b>" = son destin fut définitivement et irrévocablement fixé. L\'expression "sceller le sort" est une expression figurée signifiant rendre quelque chose inévitable. Le manuel MIE de 6e demande aux élèves d\'expliquer le sens de mots ou d\'expressions en utilisant le contexte environnant - ici le contexte (l\'arrivée des marins, la disparition du dodo) confirme la notion de fin inévitable.' }),

  makeTF({ id:'g6fr-lec-013', chapterId:'g6fr-lecture', difficulty:1,
    question:`${_TEXTE_DODO_FR}Vrai ou Faux : La principale raison de l'extinction du dodo était la chasse par les marins.`,
    answer:false,
    hint:'Relisez attentivement le deuxième paragraphe - quelle menace l\'auteur qualifie de "la plus grave" ?',
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
    explanation:'"Des ailes <b>totalement</b> inutiles" est une légère <b>hyperbole</b> - exagération pour souligner l\'inutilité complète des ailes. En réalité, les ailes jouaient peut-être un rôle d\'équilibre ou de séduction, mais l\'auteur les décrit comme "totalement" inutiles pour créer un effet de surprise. Le manuel MIE de 6e liste les figures de style : comparaison, métaphore, personnification, hyperbole, anaphore.' }),

  makeMCQ({ id:'g6fr-lec-016', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_DODO_FR}Selon le dernier paragraphe, quelle est la leçon que l'on peut tirer de l'histoire du dodo ?`,
    options:[
      'Les oiseaux qui ne peuvent pas voler sont tous destinés à disparaître',
      'La chasse est toujours la principale cause d\'extinction des animaux',
      'Les mêmes facteurs - chasse, destruction des habitats et espèces envahissantes - continuent de menacer d\'autres animaux aujourd\'hui',
      'Maurice est le seul pays à avoir perdu une espèce endémique'
    ],
    answer:'Les mêmes facteurs - chasse, destruction des habitats et espèces envahissantes - continuent de menacer d\'autres animaux aujourd\'hui',
    hint:'Le dernier paragraphe utilise le mot "avertissement" - qu\'est-ce que le dodo nous enseigne ?',
    explanation:'Le texte dit : "son histoire nous adresse également un <b>avertissement</b> : les mêmes facteurs - chasse, destruction des habitats et espèces envahissantes - <b>continuent d\'entraîner l\'extinction d\'autres animaux de nos jours</b>." L\'auteur utilise l\'histoire du dodo pour parler des enjeux de conservation actuels - c\'est une démarche argumentative que le manuel MIE de 6e nomme le "passage du particulier au général".' }),

  makeMCQ({ id:'g6fr-lec-017', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_DODO_FR}Quel est le type de ce texte ?`,
    options:['Un texte poétique','Un texte narratif et informatif','Un texte publicitaire','Une lettre formelle'],
    answer:'Un texte narratif et informatif',
    hint:'Le texte raconte des événements (narratif) et donne des informations scientifiques et historiques (informatif).',
    explanation:'Ce texte est <b>narratif et informatif</b> : (1) <b>Narratif</b> - il raconte l\'histoire du dodo dans un ordre chronologique (passé → présent) ; (2) <b>Informatif</b> - il donne des données scientifiques (poids, taille, évolution) et historiques (arrivée des Hollandais). Le manuel MIE de 6e distingue les types de textes : narratif, descriptif, informatif, argumentatif, poétique - savoir les identifier est une compétence de lecture évaluée au PSAC.' }),

  makeMCQ({ id:'g6fr-lec-018', chapterId:'g6fr-lecture', difficulty:3,
    question:`${_TEXTE_DODO_FR}Quel temps verbal est principalement utilisé dans le deuxième paragraphe pour raconter les événements passés, et pourquoi ?`,
    options:[
      'Le présent, pour rendre les événements vivants',
      'L\'imparfait, pour décrire des actions habituelles',
      'Le passé composé ou le passé simple, pour des actions précises et terminées dans le passé',
      'Le futur antérieur, pour des actions avant un moment futur'
    ],
    answer:'Le passé composé ou le passé simple, pour des actions précises et terminées dans le passé',
    hint:'Les marins "débarquèrent", le sort "fut scellé", ils "chassaient" - identifiez les temps utilisés.',
    explanation:'Le deuxième paragraphe utilise principalement le <b>passé simple</b> (débarquèrent, fut, provenait) pour des <b>actions précises et achevées</b> dans le passé. L\'imparfait est aussi utilisé ("n\'avaient aucune peur", "chassaient") pour des <b>états ou habitudes passés</b>. En lecture, reconnaître les temps verbaux aide à comprendre la structure temporelle du récit - compétence clé dans les épreuves PSAC de français de 6e.' }),

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
    explanation:'"<b>ils n\'avaient aucune peur des humains, n\'ayant jamais appris à fuir un danger</b>" - Cette citation illustre parfaitement la vulnérabilité du dodo. <b>Relevé</b> : "aucune peur" / "jamais appris à fuir". <b>Interprétation</b> : L\'isolement évolutif de Maurice, sans prédateurs terrestres, avait rendu le dodo incapable de reconnaître le danger humain comme une menace - ce qui le rendait d\'une facilité tragique à capturer. La méthode Relevé → Interprétation est enseignée dans le manuel MIE de 6e pour les questions de compréhension de texte.' }),

  makeMCQ({ id:'g6fr-lec-020', chapterId:'g6fr-lecture', difficulty:1,
    question:'Dans un poème, comment appelle-t-on chaque groupe de vers séparés par un espace blanc ?',
    options:['Un verset','Une strophe','Un refrain','Un couplet'],
    answer:'Une strophe',
    hint:'Strophe = groupe de vers dans un poème, séparés par des espaces.',
    explanation:'Une <b>strophe</b> est un groupe de vers dans un poème, séparés par des espaces blancs. Ex : un poème en 3 strophes de 4 vers = 3 × 4 = 12 vers au total. Les strophes de 4 vers s\'appellent des <b>quatrains</b> ; celles de 2 vers des <b>distiques</b> ; celles de 3 vers des <b>tercets</b>.' }),

  makeMCQ({ id:'g6fr-lec-021', chapterId:'g6fr-lecture', difficulty:1,
    question:'Dans le schéma de rimes ABAB, comment s\'appellent ces rimes ?',
    options:['Rimes plates','Rimes croisées','Rimes embrassées','Rimes libres'],
    answer:'Rimes croisées',
    hint:'ABAB = les rimes alternent entre deux sons → elles se "croisent".',
    explanation:'ABAB = <b>rimes croisées</b> (= rimes alternées). A rime avec A, B rime avec B, mais elles alternent : vers 1 rime avec vers 3, vers 2 avec vers 4. Autres schémas : <b>AABB</b> = rimes plates (consécutives) ; <b>ABBA</b> = rimes embrassées (entrelacées).' }),

  makeTF({ id:'g6fr-lec-022', chapterId:'g6fr-lecture', difficulty:1,
    question:'Une métaphore compare directement deux choses SANS utiliser "comme" ou "tel que".',
    answer:true,
    hint:'Métaphore = comparaison implicite. Comparaison = avec "comme".',
    explanation:'<b>Vrai.</b> La <b>métaphore</b> compare deux choses <b>sans "comme"</b> : "La vie est un long fleuve tranquille." La <b>comparaison</b> utilise "comme" : "La vie est <b>comme</b> un long fleuve." La métaphore est plus forte et plus imagée car elle affirme directement l\'équivalence.' }),

  makeMCQ({ id:'g6fr-lec-023', chapterId:'g6fr-lecture', difficulty:2,
    question:'Quel est le schéma de rimes dans ce poème : "Le vent souffle fort (A) / Sur la mer agitée (B) / Il annonce la mort (A) / De la vague brisée (B)" ?',
    options:['AABB (rimes plates)','ABAB (rimes croisées)','ABBA (rimes embrassées)','Rimes libres'],
    answer:'ABAB (rimes croisées)',
    hint:'Fort (A), agitée (B), mort (A), brisée (B) → A et B alternent.',
    explanation:'Fort (A) - agitée (B) - mort (A) - brisée (B) → schéma <b>ABAB</b> = <b>rimes croisées</b>. "Fort" rime avec "mort" (A-A), "agitée" rime avec "brisée" (B-B), mais ils alternent.' }),

  makeMCQ({ id:'g6fr-lec-024', chapterId:'g6fr-lecture', difficulty:2,
    question:'Quelle figure de style est utilisée dans "Le soleil se lève paresseusement" ?',
    options:['Une hyperbole','Une comparaison','Une personnification','Une allitération'],
    answer:'Une personnification',
    hint:'"Paresseusement" est un adverbe humain attribué au soleil (non-humain).',
    explanation:'"Le soleil se lève <b>paresseusement</b>" - <b>personnification</b> : on attribue au soleil (chose non-humaine) un trait humain (être paresseux). La personnification rend la description plus vivante et poétique. C\'est une figure de style très fréquente dans la poésie et la littérature.' }),

  makeMCQ({ id:'g6fr-lec-025', chapterId:'g6fr-lecture', difficulty:2,
    question:'Dans un article de journal, comment s\'appelle la première phrase courte qui résume l\'article ?',
    options:['Le titre','Le chapeau (lead)','Le corps','La signature'],
    answer:'Le chapeau (lead)',
    hint:'Le chapeau est le court texte introductif entre le titre et le corps de l\'article.',
    explanation:'Le <b>chapeau</b> (ou "lead") est un court paragraphe introductif qui répond aux 5 questions de base : <b>Qui ? Quoi ? Quand ? Où ? Pourquoi ?</b> Il résume l\'essentiel pour que le lecteur comprenne l\'article en quelques lignes. Structure d\'un article : <b>Titre → Chapeau → Corps → Signature</b>.' }),

  makeMCQ({ id:'g6fr-lec-026', chapterId:'g6fr-lecture', difficulty:2,
    question:'Dans un texte, comment reconnaît-on une OPINION (par opposition à un fait) ?',
    options:[
      'Un fait peut être vérifié et prouvé ; une opinion exprime un point de vue subjectif.',
      'Une opinion utilise toujours "je pense".',
      'Un fait est toujours faux.',
      'Une opinion est toujours vraie.'
    ],
    answer:'Un fait peut être vérifié et prouvé ; une opinion exprime un point de vue subjectif.',
    hint:'Fait = objectif, vérifiable. Opinion = subjectif, personnel.',
    explanation:'Un <b>fait</b> peut être <b>vérifié</b> : "Maurice a une superficie de 1865 km²." Une <b>opinion</b> exprime un <b>point de vue subjectif</b> : "Maurice est le plus beau pays du monde." Les indicateurs d\'opinion : "je pense que", "il me semble que", "à mon avis", adjectifs évaluatifs (magnifique, terrible…).' }),

  makeMCQ({ id:'g6fr-lec-027', chapterId:'g6fr-lecture', difficulty:3,
    question:'Quelle figure de style utilise la répétition du même son consonantique au début de plusieurs mots proches ?',
    options:['Assonance','Allitération','Anaphore','Métaphore'],
    answer:'Allitération',
    hint:'Allitération = répétition de consonnes. Assonance = répétition de voyelles.',
    explanation:'L\'<b>allitération</b> répète le même son <b>consonantique</b> : "Pour qui sont ces <b>s</b>erpents qui <b>s</b>ifflent <b>s</b>ur vos têtes ?" (Racine). L\'<b>assonance</b> répète le même son <b>vocalique</b> : "Les sangl<b>ots</b> l<b>ongs</b> des vi<b>ol</b>ons" (Verlaine). Les deux créent une musicalité dans le poème.' }),

  makeMCQ({ id:'g6fr-lec-028', chapterId:'g6fr-lecture', difficulty:3,
    question:'Dans la narration, comment appelle-t-on les obstacles et aventures qui compliquent le déroulement de l\'histoire ?',
    options:['Le dénouement','La péripétie','Le cadre','Le narrateur'],
    answer:'La péripétie',
    hint:'Péripétie = événement inattendu qui change le cours de l\'histoire.',
    explanation:'La <b>péripétie</b> est un <b>événement imprévu</b> qui complique la situation ou fait rebondir l\'histoire. C\'est le "rebondissement". Le schéma narratif : <b>Situation initiale → Élément perturbateur → Péripéties → Dénouement → Situation finale</b>. Le <b>dénouement</b> = résolution du problème.' }),

  makeMCQ({ id:'g6fr-lec-029', chapterId:'g6fr-lecture', difficulty:3,
    question:'Quel est le DÉNOUEMENT d\'un récit ?',
    options:[
      'Le début du récit où le cadre est présenté',
      'L\'événement qui crée le problème',
      'La résolution du conflit ou du problème',
      'Les obstacles rencontrés par le héros'
    ],
    answer:'La résolution du conflit ou du problème',
    hint:'Dénouement = fin, résolution. Comme "dénouer" un nœud.',
    explanation:'Le <b>dénouement</b> est la <b>résolution</b> du conflit ou du problème principal du récit. Il précède la situation finale. Structure : Situation initiale → Élément perturbateur → Péripéties → <b>Dénouement</b> → Situation finale. En français "dénouer" = défaire un nœud → résoudre la tension.' }),

  makeTF({ id:'g6fr-lec-030', chapterId:'g6fr-lecture', difficulty:3,
    question:'Un narrateur "interne" (narration à la première personne) est un personnage de l\'histoire.',
    answer:true,
    hint:'"Je" dans le récit = le narrateur est dans l\'histoire = narrateur interne.',
    explanation:'<b>Vrai.</b> Le <b>narrateur interne</b> (= narration à la <b>première personne</b> "je") est un <b>personnage de l\'histoire</b> qui la vit et la raconte. Il ne connaît que ce que son personnage peut voir/savoir. Comparer avec le <b>narrateur externe</b> (troisième personne "il/elle") qui observe de l\'extérieur et peut être omniscient.' }),

  makeMCQ({ id:'g6fr-lec-031', chapterId:'g6fr-lecture', difficulty:4,
    question:'Analyse ce vers : "Tes yeux sont deux étoiles dans la nuit profonde." Quelle figure de style est utilisée et pourquoi ?',
    options:[
      'Comparaison - car "comme" est présent.',
      'Métaphore - car les yeux sont directement identifiés aux étoiles sans "comme".',
      'Personnification - car les étoiles reçoivent un attribut humain.',
      'Hyperbole - car c\'est une exagération.'
    ],
    answer:'Métaphore - car les yeux sont directement identifiés aux étoiles sans "comme".',
    hint:'Pas de "comme" ou "tel que" → c\'est une métaphore, pas une comparaison.',
    explanation:'"Tes yeux sont <b>deux étoiles</b>" - <b>métaphore</b> : identification directe entre les yeux et les étoiles sans "comme". Si on disait "tes yeux sont <b>comme</b> deux étoiles" → comparaison. La métaphore crée une image plus forte car elle affirme l\'équivalence au lieu de la suggérer.' }),

  makeMCQ({ id:'g6fr-lec-032', chapterId:'g6fr-lecture', difficulty:4,
    question:'Dans un texte, la phrase "Le général annonça la victoire. Pourtant, des soldats pleuraient." contient une ironie. Pourquoi ?',
    options:[
      'Parce que le général a menti.',
      'Parce qu\'il y a une contradiction : victoire annoncée mais pleurs des soldats - l\'auteur suggère que cette victoire a un coût humain.',
      'Parce que les soldats sont contents.',
      'Parce que "pourtant" est un connecteur d\'opposition.'
    ],
    answer:'Parce qu\'il y a une contradiction : victoire annoncée mais pleurs des soldats - l\'auteur suggère que cette victoire a un coût humain.',
    hint:'L\'ironie ou l\'implicite : le texte dit "victoire" mais montre des pleurs. Que veut dire l\'auteur vraiment ?',
    explanation:'L\'<b>ironie implicite</b> : le mot "victoire" (positif) contraste avec "des soldats pleuraient" (négatif). L\'auteur ne dit pas explicitement que la victoire est amère - il le <b>suggère par l\'opposition</b>. Lire entre les lignes (l\'implicite) est une compétence clé dans les épreuves PSAC de 6e : repérer ce que le texte dit vs ce qu\'il veut dire.' }),

  makeMCQ({ id:'g6fr-lec-033', chapterId:'g6fr-lecture', difficulty:3,
    question:'Dans un texte, "le narrateur omniscient" signifie que :',
    options:[
      'Le narrateur raconte à la première personne',
      'Le narrateur sait tout sur tous les personnages',
      'Le narrateur est un personnage de l\'histoire',
      'Le narrateur ne connaît que les actions extérieures'
    ],
    answer:'Le narrateur sait tout sur tous les personnages',
    hint:'Omniscient = sait tout (latin : omni = tout, scient = savoir).',
    explanation:'"<b>Le narrateur sait tout sur tous les personnages</b>" - <b>narrateur omniscient</b> (3ème personne) : connaît les pensées, sentiments, et actions de tous. Comparer : <b>narrateur interne</b> (je - point de vue limité au héros) ; <b>narrateur externe</b> (observateur extérieur, pas d\'accès aux pensées). Ces notions sont évaluées en lecture analytique PSAC.' }),

  makeMCQ({ id:'g6fr-lec-034', chapterId:'g6fr-lecture', difficulty:3,
    question:'Quelle figure de style est utilisée dans : "Le vent hurlait comme un loup affamé." ?',
    options:['Métaphore','Comparaison','Personnification','Hyperbole'],
    answer:'Comparaison',
    hint:'La présence de "comme" = comparaison (pas métaphore).',
    explanation:'"<b>Comparaison</b>" - "comme un loup affamé" → outil de comparaison "comme". La <b>comparaison</b> utilise "comme", "tel", "semblable à". La <b>métaphore</b> dit directement : "Le vent est un loup affamé" (pas de "comme"). La <b>personnification</b> attribue des qualités humaines : "le vent décida de partir". Ici "hurlait" (personnification) + "comme" (comparaison) : double figure.' }),

  makeMCQ({ id:'g6fr-lec-035', chapterId:'g6fr-lecture', difficulty:4,
    question:'Texte : "La mer était calme. Soudain, les nuages s\'amassèrent et les vagues se levèrent avec fureur." Quel procédé narratif est utilisé pour créer le suspense ?',
    options:[
      'Un retour en arrière (flashback)',
      'Un contraste entre calme et tempête + accélération du rythme',
      'Une description détaillée de la mer',
      'Un dialogue entre les personnages'
    ],
    answer:'Un contraste entre calme et tempête + accélération du rythme',
    hint:'Le calme soudainement interrompu → contraste + "soudain" = accélération.',
    explanation:'"<b>Contraste + accélération du rythme</b>" - Le procédé du <b>contraste</b> (calme → tempête) crée l\'effet de surprise. "Soudain" marque la rupture. L\'<b>accélération</b> (phrases courtes, verbes d\'action rapides : s\'amassèrent, se levèrent) crée le suspense. Identifier ces procédés stylistiques est une compétence clé en lecture analytique de 6e.' }),

  makeMCQ({ id:'g6fr-lec-036', chapterId:'g6fr-lecture', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Candid_girl_reading_(20946248203).jpg" alt="une image" style="max-height:180px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>Qu\'est-ce qu\'elle fait ?</b>',
    options:['Elle écrit.','Elle lit.','Elle dessine.','Elle dort.'],
    answer:'Elle lit.',
    hint:'Elle regarde attentivement les pages d\'un livre.',
    explanation:'"<b>Elle lit</b>" → verbe <b>lire</b> (to read). Conjugaison : je lis, tu lis, il/elle lit, nous lisons, vous lisez, ils/elles lisent. Verbe irrégulier du 3e groupe — à mémoriser !' }),

  makeMCQ({ id:'g6fr-lec-037', chapterId:'g6fr-lecture', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Notebook-writing-man-book-person-blur-1176206.jpg" alt="une image" style="max-height:180px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>Qu\'est-ce qu\'il fait ?</b>',
    options:['Il dessine.','Il lit.','Il écrit.','Il mange.'],
    answer:'Il écrit.',
    hint:'Il tient un stylo et trace des mots sur le papier.',
    explanation:'"<b>Il écrit</b>" → verbe <b>écrire</b> (to write). Conjugaison : j\'écris, tu écris, il/elle écrit, nous écrivons, vous écrivez, ils/elles écrivent. Verbe irrégulier du 3e groupe.' }),

  makeMCQ({ id:'g6fr-lec-038', chapterId:'g6fr-lecture', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Eating_rice,_China_-_collected_by_Berthold_Laufer.jpg" alt="une image" style="max-height:180px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>Qu\'est-ce qu\'il fait ?</b>',
    options:['Il boit.','Il cuisine.','Il mange.','Il dort.'],
    answer:'Il mange.',
    hint:'Il porte de la nourriture à sa bouche.',
    explanation:'"<b>Il mange</b>" → verbe <b>manger</b> (to eat). Conjugaison : je mange, tu manges, il/elle mange, nous mangeons, vous mangez, ils/elles mangent. Note : "nous mang<b>e</b>ons" garde le "e" pour préserver le son [ʒ] de "manger" — même règle pour nager, voyager, changer.' }),

  makeMCQ({ id:'g6fr-lec-039', chapterId:'g6fr-lecture', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Running.jpg" alt="une image" style="max-height:180px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>Qu\'est-ce qu\'il fait ?</b>',
    options:['Il marche.','Il court.','Il saute.','Il nage.'],
    answer:'Il court.',
    hint:'Il se déplace très vite sur ses pieds.',
    explanation:'"<b>Il court</b>" → verbe <b>courir</b> (to run). Conjugaison : je cours, tu cours, il/elle court, nous courons, vous courez, ils/elles courent. Verbe irrégulier ! Ne pas confondre : <b>marcher</b> (walk, lentement) vs <b>courir</b> (run, vite).' }),

  makeMCQ({ id:'g6fr-lec-040', chapterId:'g6fr-lecture', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Swimming_pool.jpg" alt="une image" style="max-height:180px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>Qu\'est-ce qu\'il fait ?</b>',
    options:['Il plonge.','Il nage.','Il lave.','Il pêche.'],
    answer:'Il nage.',
    hint:'Il se déplace dans l\'eau en faisant des mouvements avec les bras et les jambes.',
    explanation:'"<b>Il nage</b>" → verbe <b>nager</b> (to swim). Conjugaison : je nage, tu nages, il/elle nage, nous nageons, vous nagez, ils/elles nagent. Note : "nous nag<b>e</b>ons" — même règle orthographique que manger pour conserver le son [ʒ].' }),

  makeMCQ({ id:'g6fr-lec-041', chapterId:'g6fr-lecture', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Children_playing.jpg" alt="une image" style="max-height:180px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>Qu\'est-ce qu\'ils font ?</b>',
    options:['Ils étudient.','Ils jouent.','Ils travaillent.','Ils chantent.'],
    answer:'Ils jouent.',
    hint:'Ils s\'amusent ensemble avec énergie.',
    explanation:'"<b>Ils jouent</b>" → verbe <b>jouer</b> (to play). Conjugaison : je joue, tu joues, il/elle joue, nous jouons, vous jouez, ils/elles jouent. Verbe régulier du 1er groupe (-er). "Jouer <b>à</b>" (sport/jeu) vs "jouer <b>de</b>" (instrument) : il joue au football, il joue de la guitare.' })

);
