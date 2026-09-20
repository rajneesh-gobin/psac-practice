'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  g9fr-oeuvres — approfondissement, lot 4.
//
//  Niveau 4 = « Analyse de texte » (level4Label du pack), PAS de la
//  restitution. Chaque item L4 ci-dessous demande pourquoi un choix d'auteur
//  produit tel effet, ce que deux moments rapprochés font comprendre, ou ce
//  qu'une objection plausible oublie — jamais « qui est le forgeron ».
//
//  ⚠ AUCUN détail d'intrigue incertain. Les deux œuvres sont « Le Papa de
//    Simon » (Maupassant, 1879) et « Topaze » (Pagnol, 1928). Les questions
//    s'appuient sur ce que les textes portent de façon indiscutable ; les
//    répliques ne sont jamais citées au-delà de quelques mots.
// ══════════════════════════════════════════════════════════════════════════
(function () {

STATIC_QUESTIONS.push(

  // ── papa_simon_themes (001-008) ─────────────────────────────────────────

  makeMCQ({ id:'g9fr-ap4-001', chapterId:'g9fr-oeuvres', subsection:'papa_simon_themes', difficulty:4,
    question:'À la fin de la nouvelle, les camarades de Simon cessent de se moquer. Deux explications sont possibles. Laquelle le texte rend-il la plus probable ?',
    options:[
      'La réputation du forgeron impose le silence aux moqueurs',
      'Les enfants ont enfin compris la peine de leur camarade',
      'Le maître a fini par interdire toute moquerie en classe',
      'Simon est devenu plus fort et a su se défendre tout seul'],
    answer:'La réputation du forgeron impose le silence aux moqueurs',
    hint:'Demande-toi ce qui a changé entre les deux jours : l\'enfant, ou le nom qu\'il peut donner ?',
    explanation:'Ce qui change à la fin n\'est pas le cœur des camarades mais le <b>nom</b> que Simon peut leur opposer : celui d\'un homme connu et craint de tout le village. L\'explication par la pitié est tentante parce qu\'elle est plus flatteuse, mais rien dans le récit ne montre les enfants touchés par la souffrance de Simon : ils se taisent devant une réputation, pas devant une injustice. Maupassant laisse donc le préjugé entier — il est neutralisé, jamais corrigé.' }),

  makeMCQ({ id:'g9fr-ap4-002', chapterId:'g9fr-oeuvres', subsection:'papa_simon_themes', difficulty:4,
    question:'Au bord de l\'eau, le désespoir de Simon est interrompu : une grenouille passe, il la poursuit et se met à rire, puis le chagrin revient. Quel effet Maupassant obtient-il en plaçant ce jeu au milieu d\'une scène de désespoir ?',
    options:[
      'Il rappelle que ce désespéré est encore un très jeune enfant',
      'Il montre que le chagrin de Simon était en réalité peu sincère',
      'Il détend le lecteur avant de raconter une scène bien plus dure',
      'Il annonce que la nature va bientôt consoler Simon pour de bon'],
    answer:'Il rappelle que ce désespéré est encore un très jeune enfant',
    hint:'Regarde ce qui se passe juste après le rire : le récit repart-il plus léger, ou plus lourd ?',
    explanation:'Le jeu ne console pas : le chagrin revient aussitôt, et c\'est justement le contraste qui frappe. En montrant un enfant qui rit d\'un rien quelques secondes avant de repenser à se noyer, Maupassant rappelle l\'<b>âge</b> de son personnage, et rend sa détresse plus insupportable, non plus légère. L\'erreur tentante est d\'y lire un chagrin peu sincère : c\'est le retour immédiat des larmes qui prouve le contraire.' }),

  makeText({ id:'g9fr-ap4-003', chapterId:'g9fr-oeuvres', subsection:'papa_simon_themes', difficulty:3,
    question:'Les camarades de Simon lui redisent la même moquerie, presque mot pour mot, d\'une bouche à l\'autre. Comment nomme-t-on ce procédé d\'écriture ? Écris-le en un seul mot.',
    answer:'répétition', alsoAccept:['la répétition','une répétition','répétitions','les répétitions'],
    hint:'Le procédé porte le nom de ce que font les enfants : ils redisent sans varier.',
    explanation:'C\'est la <b>répétition</b>. En faisant revenir la même phrase dans plusieurs bouches, Maupassant fait entendre au lecteur ce que Simon entend : un martèlement dont l\'enfant ne peut pas sortir. Dans une copie, nommer le procédé ne suffit pas : il faut dire son effet, ici l\'enfermement de Simon dans une insulte qui ne varie jamais.' }),

  makeMCQ({ id:'g9fr-ap4-004', chapterId:'g9fr-oeuvres', subsection:'papa_simon_themes', difficulty:4,
    question:'Le village juge la mère de Simon sur sa seule faute passée, alors que le récit la montre honnête et laborieuse. Que produit cet écart pour le lecteur ?',
    options:[
      'Le jugement du village se retourne contre ceux qui le portent',
      'Le lecteur finit par douter de la sincérité de cette femme',
      'Le lecteur apprend à se méfier des apparences trompeuses',
      'Le récit excuse la faute de la mère en cachant son passé'],
    answer:'Le jugement du village se retourne contre ceux qui le portent',
    hint:'Compare ce que le village affirme et ce que le récit te montre : lequel des deux se trouve pris en défaut ?',
    explanation:'Le lecteur voit la mère travailler et élever son fils seule ; il voit aussi le village la condamner sans rien regarder. L\'écart ne discrédite pas la femme, il <b>discrédite ceux qui jugent</b>, et c\'est ainsi que Maupassant critique sans jamais prononcer lui-même de condamnation. La réponse sur les apparences trompeuses semble voisine mais dit le contraire : ici l\'apparence ne trompe personne, c\'est le préjugé qui empêche de regarder.' }),

  makeMCQ({ id:'g9fr-ap4-005', chapterId:'g9fr-oeuvres', subsection:'papa_simon_themes', difficulty:4,
    question:'Simon annonce d\'abord à l\'école que son papa s\'appelle Philippe ; les moqueries reprennent. Plus tard, il annonce « Philippe Remy, le forgeron », et elles cessent. Qu\'est-ce qui a réellement changé entre les deux annonces ?',
    options:[
      'Un prénom est devenu un nom reconnu par tout le village',
      'Un mensonge de Simon est devenu une vérité bien établie',
      'Un adulte a remplacé un autre adulte auprès de l\'enfant',
      'Un homme pauvre est devenu un homme riche et estimé'],
    answer:'Un prénom est devenu un nom reconnu par tout le village',
    hint:'Compare mot à mot les deux annonces : qu\'est-ce que la seconde contient que la première n\'avait pas ?',
    explanation:'La première annonce ne donne qu\'un prénom, que n\'importe qui peut inventer ; la seconde donne un nom de famille et un métier, c\'est-à-dire une <b>place vérifiable dans le village</b>. Ce que la société exigeait de Simon n\'était donc pas de l\'affection mais une identité opposable. L\'erreur tentante est de parler de mensonge devenu vrai : Simon n\'a jamais menti, Philippe avait bien accepté dès le premier soir.' }),

  makeText({ id:'g9fr-ap4-006', chapterId:'g9fr-oeuvres', subsection:'papa_simon_themes', difficulty:3,
    question:'Simon n\'est pas rejeté pour ce qu\'il a fait, mais pour les circonstances de sa naissance, que personne n\'examine. Comment nomme-t-on une opinion toute faite, formée avant tout examen ? Écris le mot au singulier.',
    answer:'préjugé', alsoAccept:['un préjugé','le préjugé','préjugés','les préjugés'],
    hint:'Le mot désigne une opinion arrêtée d\'avance, et il est au cœur de toute la nouvelle.',
    explanation:'C\'est le <b>préjugé</b>. Les camarades de Simon ne le connaissent pas : ils répètent ce que les adultes disent de sa mère. La nouvelle montre ainsi qu\'un préjugé se transmet avant de se raisonner, et qu\'un enfant peut en souffrir sans même comprendre de quoi on l\'accuse.' }),

  makeMCQ({ id:'g9fr-ap4-007', chapterId:'g9fr-oeuvres', subsection:'papa_simon_themes', difficulty:4,
    question:'La nouvelle se termine bien pour Simon. Pourquoi cette fin heureuse n\'annule-t-elle pas la critique sociale de Maupassant ?',
    options:[
      'Simon est sauvé par un hasard, non par un changement du village',
      'Maupassant ajoute une dernière moquerie juste après le mariage',
      'Simon reste malheureux à l\'école malgré le mariage de sa mère',
      'Le village finit par reconnaître publiquement son injustice'],
    answer:'Simon est sauvé par un hasard, non par un changement du village',
    hint:'Demande-toi ce qui serait arrivé à Simon si personne n\'était passé près de la rivière ce jour-là.',
    explanation:'Le dénouement tient à une rencontre : un homme passe au bon moment. Rien dans la société décrite n\'a bougé — les mêmes camarades, les mêmes adultes, les mêmes jugements. Maupassant sauve <b>cet</b> enfant-là sans rien réparer, et c\'est ce qui rend la fin à la fois heureuse et inquiétante : le prochain enfant dans la même situation n\'aura peut-être pas ce hasard.' }),

  makeMCQ({ id:'g9fr-ap4-008', chapterId:'g9fr-oeuvres', subsection:'papa_simon_themes', difficulty:4,
    question:'Deux fois Simon parle de se noyer : seul au bord de la rivière, puis devant Philippe et les ouvriers de la forge. Que fait comprendre le rapprochement de ces deux moments ?',
    options:[
      'La même détresse est d\'abord subie, puis employée comme argument',
      'Simon a menti la première fois et dit la vérité la seconde fois',
      'La détresse de Simon a disparu entre les deux moments du récit',
      'Les ouvriers ont montré plus de pitié que le forgeron lui-même'],
    answer:'La même détresse est d\'abord subie, puis employée comme argument',
    hint:'Dans chaque scène, demande-toi à qui Simon s\'adresse, et s\'il attend une réponse.',
    explanation:'Au bord de l\'eau, Simon est seul et sa phrase n\'est adressée à personne : c\'est une détresse subie. À la forge, il la dit devant témoins, à un homme dont il attend une décision : la même phrase devient un <b>moyen d\'obtenir</b> quelque chose. Le rapprochement montre donc un enfant qui apprend, en quelques jours, à se servir de sa propre souffrance — ce qui est à la fois touchant et un peu terrible.' }),

  // ── topaze_personnages (009-014) ────────────────────────────────────────

  makeMCQ({ id:'g9fr-ap4-009', chapterId:'g9fr-oeuvres', subsection:'topaze_personnages', difficulty:4,
    question:'Tamise reste pauvre et honnête d\'un bout à l\'autre de la pièce. Quelle fonction ce personnage remplit-il auprès du spectateur ?',
    options:[
      'Il donne la mesure de la chute morale de son ami Topaze',
      'Il annonce dès le premier acte le dénouement de la pièce',
      'Il apporte à la pièce l\'essentiel de son comique de mots',
      'Il représente l\'élève modèle que Topaze rêvait de former'],
    answer:'Il donne la mesure de la chute morale de son ami Topaze',
    hint:'Imagine la pièce sans lui : que manquerait-il pour juger ce que Topaze est devenu ?',
    explanation:'Tamise est le <b>point fixe</b> de la pièce. Parce qu\'il ne change pas, le spectateur peut mesurer de combien Topaze s\'est déplacé. Sans lui, la réussite finale de Topaze pourrait passer pour l\'évolution normale d\'un homme qui a compris le monde ; avec lui, elle apparaît pour ce qu\'elle est, un renoncement. Un personnage peut donc servir d\'instrument de mesure sans être au centre de l\'intrigue.' }),

  makeMCQ({ id:'g9fr-ap4-010', chapterId:'g9fr-oeuvres', subsection:'topaze_personnages', difficulty:4,
    question:'Castel-Bénac choisit pour diriger son agence un homme dont la réputation d\'honnêteté est entière. Que révèle ce choix sur sa façon de travailler ?',
    options:[
      'L\'honnêteté d\'autrui lui sert de couverture, jamais de modèle',
      'Il croit encore qu\'un honnête homme finira par le corriger',
      'Il cherche un associé capable de le remplacer très bientôt',
      'Il préfère payer moins cher un employé sans aucun diplôme'],
    answer:'L\'honnêteté d\'autrui lui sert de couverture, jamais de modèle',
    hint:'Demande-toi à quoi sert, pour une affaire douteuse, un nom que personne ne soupçonne.',
    explanation:'Castel-Bénac n\'a pas besoin d\'un complice habile : il a besoin d\'un nom <b>au-dessus de tout soupçon</b> à mettre devant le sien. La vertu de Topaze n\'est donc pas un obstacle à son projet, elle en est l\'outil principal — et c\'est le renversement le plus cruel de la pièce : la qualité qui a coûté sa place à Topaze est précisément ce qui le rend utile à un homme malhonnête.' }),

  makeText({ id:'g9fr-ap4-011', chapterId:'g9fr-oeuvres', subsection:'topaze_personnages', difficulty:3,
    question:'Après son renvoi, Topaze dirige une agence dont il n\'est le patron que sur le papier : il prête son nom pour couvrir les affaires d\'un autre. Comment appelle-t-on un tel personnage ? Écris le mot (il s\'écrit avec un trait d\'union).',
    answer:'prête-nom', alsoAccept:['un prête-nom','le prête-nom','prête nom','homme de paille','un homme de paille'],
    hint:'Le mot est formé de deux éléments : ce que le personnage fait, et ce qu\'il fournit à la place de son travail.',
    explanation:'Topaze est un <b>prête-nom</b> (on dit aussi un « homme de paille ») : il assume publiquement la responsabilité d\'affaires qu\'il ne dirige pas. Le mot est important pour comprendre la pièce, car il dit exactement la position de Topaze au milieu de l\'histoire : tout le risque, aucun pouvoir, et pas encore de conscience claire de sa situation.' }),

  makeMCQ({ id:'g9fr-ap4-012', chapterId:'g9fr-oeuvres', subsection:'topaze_personnages', difficulty:4,
    question:'Le directeur ne reproche pas à Topaze une faute professionnelle, mais son refus de céder à une famille influente. En quoi ce renvoi prépare-t-il tout le reste de la pièce ?',
    options:[
      'Il enseigne à Topaze que la vertu coûte et ne rapporte rien',
      'Il prouve à Topaze qu\'il était un très mauvais professeur',
      'Il annonce que Topaze reviendra enseigner au dernier acte',
      'Il montre que l\'école protège toujours ses professeurs'],
    answer:'Il enseigne à Topaze que la vertu coûte et ne rapporte rien',
    hint:'Cherche ce que cette scène apprend à Topaze, et que les actes suivants ne feront que confirmer.',
    explanation:'Le renvoi est la <b>première leçon</b> que Topaze reçoit du monde réel, et elle contredit exactement ce qu\'il enseignait à ses élèves. Toute la suite en découle : quand on lui proposera de s\'enrichir sans scrupules, l\'expérience lui aura déjà appris que l\'honnêteté n\'est pas récompensée. Répondre qu\'il était mauvais professeur, c\'est manquer le point : il est renvoyé pour avoir bien fait son métier.' }),

  makeMCQ({ id:'g9fr-ap4-013', chapterId:'g9fr-oeuvres', subsection:'topaze_personnages', difficulty:4,
    question:'Suzy Courtois s\'adresse à Topaze avec des égards que personne ne lui avait jamais accordés. Pourquoi cette politesse agit-elle sur lui plus sûrement que l\'argent ?',
    options:[
      'Elle lui donne enfin l\'importance que son métier lui refusait',
      'Elle lui rappelle les leçons de morale qu\'il donnait en classe',
      'Elle lui promet un poste de directeur dans une grande école',
      'Elle lui offre de reprendre ses cours particuliers du soir'],
    answer:'Elle lui donne enfin l\'importance que son métier lui refusait',
    hint:'Demande-toi de quoi Topaze manque vraiment depuis le premier acte : d\'argent, ou de considération ?',
    explanation:'Topaze n\'est pas un homme cupide au départ : il est un homme <b>humilié</b>, à qui l\'on parle depuis toujours comme à un subalterne. Être traité en personnage important est donc, pour lui, une tentation plus forte qu\'une somme d\'argent, parce qu\'elle touche exactement là où il a été blessé. C\'est ainsi que Pagnol rend sa chute vraisemblable : on ne l\'achète pas, on le flatte.' }),

  makeMCQ({ id:'g9fr-ap4-014', chapterId:'g9fr-oeuvres', subsection:'topaze_personnages', difficulty:4,
    question:'Au premier acte, Topaze enseigne à ses élèves que la malhonnêteté ne profite jamais ; au dernier, il soutient exactement le contraire. Qu\'est-ce que ce renversement met en cause en premier lieu ?',
    options:[
      'La valeur de ce que l\'école enseigne quand le monde la dément',
      'La sincérité de Topaze lorsqu\'il faisait ses leçons de morale',
      'L\'intelligence des élèves qui écoutaient ces leçons de morale',
      'Le talent de Topaze devant une classe difficile à tenir'],
    answer:'La valeur de ce que l\'école enseigne quand le monde la dément',
    hint:'Le même homme dit les deux phrases : ce n\'est donc pas lui qui est d\'abord en question.',
    explanation:'Topaze ne s\'est pas démenti par légèreté : il a vérifié, dans sa propre vie, que la leçon qu\'il répétait était fausse dans ce monde-là. Ce que le renversement attaque, c\'est donc d\'abord l\'<b>écart entre l\'enseignement et l\'expérience</b>. Mettre en doute sa sincérité du premier acte est l\'erreur tentante : rien ne l\'indique, et la pièce serait beaucoup moins grave s\'il avait toujours été un hypocrite.' }),

  // ── topaze_themes (015-027) ─────────────────────────────────────────────

  makeMCQ({ id:'g9fr-ap4-015', chapterId:'g9fr-oeuvres', subsection:'topaze_themes', difficulty:4,
    question:'Dans la scène de la dictée, Topaze insiste longuement sur des lettres finales que personne n\'entend en parlant. Que cette insistance fait-elle comprendre du personnage, avant même que l\'intrigue commence ?',
    options:[
      'Il croit qu\'une règle vaut d\'être suivie même si nul ne la voit',
      'Il cherche surtout à humilier un élève devant toute sa classe',
      'Il gagne du temps parce qu\'il n\'a rien préparé pour ce cours',
      'Il connaît mal l\'orthographe et hésite devant ses élèves'],
    answer:'Il croit qu\'une règle vaut d\'être suivie même si nul ne la voit',
    hint:'Ce que Topaze défend ici n\'est pas une lettre : c\'est une manière de se conduire. Laquelle ?',
    explanation:'Une lettre muette ne se voit pas et ne s\'entend pas ; l\'écrire quand même, c\'est obéir à une règle sans témoin ni récompense. Pagnol résume ainsi son personnage en une scène comique : un homme pour qui la <b>règle invisible compte</b>. C\'est exactement cet homme-là que la pièce va démolir, et c\'est pourquoi la dictée, qui semble n\'être qu\'un morceau de rire, est en réalité l\'exposition du sujet.' }),

  makeMCQ({ id:'g9fr-ap4-016', chapterId:'g9fr-oeuvres', subsection:'topaze_themes', difficulty:4,
    question:'Pagnol raconte une histoire de corruption dans une comédie, alors que le sujet est grave. Qu\'apporte le rire que le drame n\'apporterait pas ?',
    options:[
      'Le spectateur rit d\'abord, puis se découvre du côté des rieurs',
      'Le spectateur retient plus facilement les noms des personnages',
      'Le spectateur oublie la gravité du sujet et sort tout rassuré',
      'Le spectateur comprend que l\'auteur n\'y croit pas vraiment'],
    answer:'Le spectateur rit d\'abord, puis se découvre du côté des rieurs',
    hint:'Demande-toi de qui l\'on rit au début de la pièce, et ce qu\'on pense de lui à la fin.',
    explanation:'Au premier acte, on rit de Topaze : de sa naïveté, de son application, de ses manières. Quand il devient cynique et réussit, ce rire se retourne, car on a ri de l\'homme qui avait raison. Le drame aurait imposé un jugement ; la comédie <b>compromet le spectateur</b> avant de le lui faire remarquer. Croire que le rire fait oublier la gravité est l\'erreur classique sur la satire : il la fait accepter, ce qui n\'est pas la même chose.' }),

  makeText({ id:'g9fr-ap4-017', chapterId:'g9fr-oeuvres', subsection:'topaze_themes', difficulty:3,
    question:'Une œuvre qui tourne en ridicule les travers d\'une société pour les dénoncer appartient à un genre précis. Écris le nom de ce genre en un seul mot.',
    answer:'satire', alsoAccept:['la satire','une satire','satire sociale'],
    hint:'Le mot désigne à la fois un genre littéraire et une intention : faire rire pour attaquer.',
    explanation:'C\'est la <b>satire</b>. Elle se distingue de la simple comédie par sa cible : elle ne cherche pas seulement à divertir, elle vise un défaut réel de la société et compte sur le rire pour le rendre visible. Dire que <i>Topaze</i> est une satire engage donc à montrer ensuite ce que Pagnol attaque, et par quels moyens.' }),

  makeMCQ({ id:'g9fr-ap4-018', chapterId:'g9fr-oeuvres', subsection:'topaze_themes', difficulty:4,
    question:'Au dernier acte, Topaze n\'a plus besoin de menacer ni de convaincre : il lui suffit de payer. Que dit cette facilité sur la société que peint Pagnol ?',
    options:[
      'Le pouvoir de l\'argent y remplace celui de l\'autorité',
      'La menace y reste le seul moyen d\'obtenir gain de cause',
      'La ruse y compte davantage que la fortune d\'un homme',
      'L\'argent y est devenu inutile à cause de la corruption'],
    answer:'Le pouvoir de l\'argent y remplace celui de l\'autorité',
    hint:'Compare l\'effort qu\'il fallait à Topaze pour obtenir justice au premier acte, et celui qu\'il lui faut maintenant.',
    explanation:'Au premier acte, Topaze réclame son dû et n\'obtient rien, malgré son droit et son travail ; à la fin, il obtient tout sans discuter. Ce que Pagnol montre n\'est donc pas que les hommes sont méchants, mais que l\'<b>argent est devenu la langue commune</b> : il n\'y a plus à persuader quelqu\'un dont on peut acheter l\'accord. C\'est une critique de mécanisme, non de caractère.' }),

  makeMCQ({ id:'g9fr-ap4-019', chapterId:'g9fr-oeuvres', subsection:'topaze_themes', difficulty:4,
    question:'La pension Muche enseigne la morale et renvoie le seul professeur qui l\'applique. En quoi cette contradiction dépasse-t-elle le cas d\'une seule école ?',
    options:[
      'Une institution peut enseigner ce qu\'elle ne pratique jamais',
      'Une institution privée coûte plus cher qu\'une école publique',
      'Un professeur doit toujours obéir au directeur qui l\'emploie',
      'Un élève riche travaille moins bien qu\'un élève sans moyens'],
    answer:'Une institution peut enseigner ce qu\'elle ne pratique jamais',
    hint:'Ne t\'arrête pas au personnage du directeur : demande-toi ce que l\'établissement, comme institution, fait à celui qui le prend au mot.',
    explanation:'Le directeur n\'est pas un monstre isolé : il obéit à une clientèle qui paie. L\'école continue donc d\'afficher des principes tout en punissant leur application, et cela peut se produire dans n\'importe quelle institution — une administration, une entreprise, un parti. La pièce ne vise pas une école en particulier : elle montre comment un <b>discours officiel survit à sa propre contradiction</b>.' }),

  makeMCQ({ id:'g9fr-ap4-020', chapterId:'g9fr-oeuvres', subsection:'topaze_themes', difficulty:4,
    question:'Un élève écrit : « Topaze n\'est pas coupable, c\'est la société qui l\'a corrompu. » Quelle objection la pièce elle-même permet-elle de lui faire ?',
    options:[
      'Topaze finit par écarter Castel-Bénac et prendre sa place',
      'Topaze refuse jusqu\'au bout de toucher le moindre argent',
      'Topaze avoue publiquement tout ce qu\'il a fait de mal',
      'Topaze retourne enseigner dès qu\'il en a les moyens'],
    answer:'Topaze finit par écarter Castel-Bénac et prendre sa place',
    hint:'Distingue ce que Topaze subit de ce qu\'il entreprend de lui-même à la fin.',
    explanation:'Tant qu\'il est le prête-nom d\'un autre, Topaze peut passer pour une victime. Mais il finit par prendre l\'affaire à son compte et par évincer celui qui l\'avait recruté : là, il n\'est plus <b>entraîné</b>, il <b>agit</b>. L\'affirmation de l\'élève n\'est donc pas fausse, elle est incomplète — et c\'est la nuance qu\'une bonne copie doit apporter : la société fournit l\'occasion, l\'homme prend la décision.' }),

  makeMCQ({ id:'g9fr-ap4-021', chapterId:'g9fr-oeuvres', subsection:'topaze_themes', difficulty:4,
    question:'Tamise demeure honnête et demeure pauvre. Pourquoi Pagnol a-t-il besoin de ce contre-exemple pour que sa critique tienne ?',
    options:[
      'Sans lui, la chute de Topaze paraîtrait une simple fatalité',
      'Sans lui, le spectateur ne comprendrait pas l\'intrigue du début',
      'Sans lui, la pièce n\'aurait aucun personnage vraiment comique',
      'Sans lui, Castel-Bénac n\'aurait personne pour le remplacer'],
    answer:'Sans lui, la chute de Topaze paraîtrait une simple fatalité',
    hint:'Si tous les personnages cédaient, que resterait-il à reprocher à celui qui cède ?',
    explanation:'Si personne ne résistait, la pièce dirait seulement que la corruption est inévitable, et il n\'y aurait plus rien à reprocher à Topaze. La présence d\'un homme qui refuse — et qui le paie — prouve qu\'un <b>autre choix existait</b>. La critique de Pagnol vise donc bien une société, mais sans dispenser les individus de leur part : les deux amis ont eu la même occasion.' }),

  makeMCQ({ id:'g9fr-ap4-022', chapterId:'g9fr-oeuvres', subsection:'topaze_themes', difficulty:4,
    question:'Les affaires de Castel-Bénac se disent avec les mots de l\'intérêt public : projets, marchés, services rendus à la ville. Quel est l\'effet de ce vocabulaire ?',
    options:[
      'Il rend acceptable, en le nommant autrement, ce qui est un vol',
      'Il prouve que ces affaires servent réellement l\'intérêt commun',
      'Il montre que Castel-Bénac ignore le sens exact de ces mots',
      'Il rend la pièce difficile à suivre pour un jeune spectateur'],
    answer:'Il rend acceptable, en le nommant autrement, ce qui est un vol',
    hint:'Essaie de redire la même action avec des mots crus : la scène produirait-elle encore le même effet ?',
    explanation:'Personne, dans la pièce, ne dit qu\'il vole la commune : on parle d\'affaires, de services, de projets. Le vocabulaire fait la moitié du travail de la corruption, parce qu\'un acte qu\'on peut nommer honorablement se commet plus facilement. C\'est pourquoi l\'analyse du <b>choix des mots</b> est ici une analyse du thème, et pas un simple relevé de style.' }),

  makeMCQ({ id:'g9fr-ap4-023', chapterId:'g9fr-oeuvres', subsection:'topaze_themes', difficulty:4,
    question:'La pièce porte le nom du professeur, et non celui du conseiller municipal qui organise tout. Que ce choix de titre met-il au centre ?',
    options:[
      'La transformation d\'un homme ordinaire plutôt que le crime',
      'L\'importance du métier de professeur dans la société entière',
      'La description minutieuse d\'un bureau d\'affaires parisien',
      'Le pouvoir d\'un conseiller municipal sur toute une ville'],
    answer:'La transformation d\'un homme ordinaire plutôt que le crime',
    hint:'Demande-toi quel titre la pièce aurait porté si le sujet avait été la corruption elle-même.',
    explanation:'Le sujet de la pièce n\'est pas le système — il existait avant Topaze et continuera après lui — mais ce que ce système fait à un homme qui n\'avait rien demandé. En donnant son nom au titre, Pagnol annonce que l\'on suivra une <b>trajectoire individuelle</b>, ce qui rend la démonstration plus troublante : le spectateur peut s\'y reconnaître, ce qu\'il ne ferait pas devant un dossier de corruption.' }),

  makeText({ id:'g9fr-ap4-024', chapterId:'g9fr-oeuvres', subsection:'topaze_themes', difficulty:4,
    question:'Au premier acte, Topaze perd sa place pour avoir refusé de tricher ; au dernier, il est riche et considéré pour avoir triché. D\'un seul mot, comment nomme-t-on une situation qui aboutit exactement au contraire de ce que l\'on attendait ?',
    answer:'paradoxe', alsoAccept:['un paradoxe','le paradoxe','ironie','une ironie','l\'ironie','ironie du sort'],
    hint:'Cherche le mot qui désigne un résultat contraire à toute attente, et non le sentiment qu\'il provoque.',
    explanation:'On parle d\'un <b>paradoxe</b> — ou, si l\'on insiste sur l\'effet produit sur le spectateur, d\'une <b>ironie</b> du sort. Le mot est utile dans une copie parce qu\'il permet de dire en une phrase la structure entière de la pièce : la même conduite est punie au début et récompensée à la fin, sans que l\'homme qui la tient ait changé de monde.' }),

  makeMCQ({ id:'g9fr-ap4-025', chapterId:'g9fr-oeuvres', subsection:'topaze_themes', difficulty:4,
    question:'À la fin de la pièce, aucun personnage ne punit Topaze et aucun ne le félicite ouvertement. Pourquoi Pagnol laisse-t-il le dénouement sans jugement explicite ?',
    options:[
      'Le jugement est laissé au spectateur, ce qui le rend plus gênant',
      'Le jugement aurait allongé la pièce bien au-delà du raisonnable',
      'Le jugement appartient aux personnages secondaires seulement',
      'Le jugement est impossible parce que Topaze reste innocent'],
    answer:'Le jugement est laissé au spectateur, ce qui le rend plus gênant',
    hint:'Compare avec une fable, qui énonce sa morale : qu\'est-ce que le spectateur n\'a plus à faire, dans ce cas-là ?',
    explanation:'Une morale énoncée dispense de penser : on l\'approuve et l\'on s\'en va. En refusant de conclure, Pagnol laisse le spectateur <b>devant sa propre réponse</b>, et devant le fait gênant qu\'il a ri, pendant deux heures, d\'un homme qui avait raison. Un dénouement sans jugement n\'est donc pas un dénouement sans position : c\'est une position confiée au public.' }),

  makeMCQ({ id:'g9fr-ap4-026', chapterId:'g9fr-oeuvres', subsection:'topaze_themes', difficulty:3,
    question:'Quel rapport la pièce établit-elle entre le rire et la critique sociale ?',
    options:[
      'Le rire attire le spectateur, la critique le retient ensuite',
      'Le rire remplace la critique et la rend tout à fait inutile',
      'Le rire naît des fautes de langue des personnages seuls',
      'Le rire vient des décors, la critique vient des costumes'],
    answer:'Le rire attire le spectateur, la critique le retient ensuite',
    hint:'Demande-toi ce qui fait entrer un spectateur dans une salle, et ce qui le fait réfléchir en sortant.',
    explanation:'Le comique n\'est pas un emballage que l\'on jette : il fait accepter un sujet que personne n\'irait écouter autrement, puis il laisse place à une idée qui reste. Dire que le rire <b>remplace</b> la critique est l\'erreur fréquente — dans une satire, les deux travaillent ensemble, le premier ouvrant la porte à la seconde.' }),

  makeMCQ({ id:'g9fr-ap4-027', chapterId:'g9fr-oeuvres', subsection:'topaze_themes', difficulty:4,
    question:'Un élève affirme que <i>Topaze</i> ne concerne plus personne aujourd\'hui, puisque la pièce a été écrite en 1928. Quel argument, tiré de la pièce elle-même, répond le mieux ?',
    options:[
      'Ce qu\'elle décrit tient à un mécanisme, non à une époque',
      'Elle se déroule dans une école, lieu que chacun connaît',
      'Son auteur a écrit ensuite des films encore très connus',
      'Elle a été jouée sans interruption depuis sa création'],
    answer:'Ce qu\'elle décrit tient à un mécanisme, non à une époque',
    hint:'Un bon argument doit venir du contenu de la pièce, et non de sa célébrité ni de celle de son auteur.',
    explanation:'La date, la gloire de l\'auteur et le succès de la pièce ne prouvent rien sur son actualité. Ce qui la maintient vivante, c\'est le <b>mécanisme</b> qu\'elle démonte : un homme honnête, un système qui le punit d\'abord et le récompense ensuite quand il cède. Tant que ce mécanisme existe, la pièce parle du présent — et c\'est ce genre d\'argument, pris dans l\'œuvre, qu\'attend une question longue.' })

);

})();
