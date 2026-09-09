'use strict';
(function () {

  // Tous les textes ci-dessous sont des textes originaux écrits pour cette
  // banque. Chaque variante réimprime son texte en entier : un élève peut
  // rencontrer n'importe laquelle en premier, en pratique mixte ou en examen.

  const P1 = "Chaque samedi, bien avant le lever du soleil, Madame Ramdin installe sa table au bord du marché. Elle vend des gâteaux piments qu'elle a préparés la veille, entre neuf heures du soir et minuit. Ses mains connaissent la recette par cœur ; sa tête, elle, pense déjà aux frais du mois. Depuis trois ans, elle range chaque roupie dans une petite boîte en fer : son fils entrera au collège en janvier et les livres coûtent cher. Les clients la trouvent toujours souriante. Ils ignorent qu'à midi, quand le marché se vide, elle s'assoit sur une caisse retournée et ferme les yeux un long moment avant de rentrer à pied.";
  const R1 = "Lis le texte, puis réponds à la question.<br><br><em>" + P1 + "</em><br><br>";

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-001-a', chapterId: 'g9fr-comprehension', subsection: 'reperage_explicite', difficulty: 1,
    question: R1 + "Depuis combien d'années Madame Ramdin met-elle son argent de côté ? Écris seulement le nombre, en chiffres.",
    answer: '3', alsoAccept: ['trois', '3 ans', 'trois ans'],
    hint: "Le texte donne plusieurs nombres : cherche celui qui compte des années, pas des heures.",
    explanation: "Le texte dit « Depuis <b>trois</b> ans, elle range chaque roupie ». L'erreur courante est de relever le premier nombre rencontré, « neuf heures », qui mesure une heure de la soirée et non une durée. Quand un texte contient plusieurs nombres, demande-toi d'abord ce que chacun compte avant de le recopier."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-001-b', chapterId: 'g9fr-comprehension', subsection: 'synonymes_contexte', difficulty: 2,
    question: R1 + "Relève dans le texte le groupe de deux mots qui signifie « le jour d'avant ».",
    answer: 'la veille', alsoAccept: ['veille'],
    hint: "Le mot cherché se trouve dans la phrase qui parle de la préparation des gâteaux.",
    explanation: "Le texte dit qu'elle a préparé ses gâteaux « <b>la veille</b> », c'est-à-dire le jour précédent. Beaucoup d'élèves écrivent « hier » : c'est bien un synonyme, mais le mot ne figure pas dans le texte. « Relever » veut dire recopier le mot employé par l'auteur, pas en proposer un autre de sa tête."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-001-c', chapterId: 'g9fr-comprehension', subsection: 'inference', difficulty: 3,
    question: R1 + "Le texte n'explique jamais pourquoi Madame Ramdin garde son argent dans une boîte en fer. Que peut-on en <b>déduire</b> ?",
    options: [
      "Elle économise pour une dépense déjà prévue",
      "Elle garde chaque roupie dans une boîte en fer",
      "Elle se méfie des gens qui passent au marché",
      "Elle a gagné toute cette somme ce samedi-là"
    ],
    answer: "Elle économise pour une dépense déjà prévue",
    hint: "Regarde ce que la phrase annonce juste après les deux points.",
    explanation: "Les deux points relient la boîte au collège et aux livres qui « coûtent cher » : elle met de l'argent de côté pour une dépense qu'elle voit venir. Le piège est de choisir une phrase recopiée du texte : redire ce qui est écrit n'est pas déduire. Une déduction ajoute ce que le texte laisse entendre sans l'écrire."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-001-d', chapterId: 'g9fr-comprehension', subsection: 'expression_imagee', difficulty: 3,
    question: R1 + "Que veut dire l'expression « connaître la recette <b>par cœur</b> » employée dans le texte ?",
    options: [
      "Le savoir parfaitement, sans avoir à réfléchir",
      "L'apprendre très lentement, avec beaucoup de peine",
      "Le faire avec beaucoup d'affection pour les gens",
      "Le faire en y mettant chaque fois de l'émotion"
    ],
    answer: "Le savoir parfaitement, sans avoir à réfléchir",
    hint: "C'est une expression toute faite : son sens ne se devine pas mot à mot.",
    explanation: "« Savoir par cœur » signifie <b>savoir parfaitement</b>, au point de ne plus avoir besoin d'y penser — ce que confirme « ses mains connaissent ». L'erreur classique est de lire le mot « cœur » au sens propre et d'y voir de l'affection ou de l'émotion. Dans une expression imagée, aucun mot ne garde son sens littéral."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-001-e', chapterId: 'g9fr-comprehension', subsection: 'avis_personnel', difficulty: 4,
    question: R1 + "D'après toi, Madame Ramdin est-elle heureuse de son travail ? Le texte dit que ses clients la trouvent « toujours souriante », et pourtant il montre à midi une femme épuisée. Quelle réponse tient compte des <b>deux</b> ?",
    options: [
      "Elle tient à son travail, mais il lui coûte beaucoup",
      "Elle est heureuse : le texte dit qu'elle sourit toujours",
      "Elle déteste son travail : elle s'assoit dès qu'elle peut",
      "On ne peut rien dire : le texte se contredit lui-même"
    ],
    answer: "Elle tient à son travail, mais il lui coûte beaucoup",
    hint: "Une contradiction apparente se résout souvent en distinguant ce qu'on montre et ce qu'on cache.",
    explanation: "Le sourire est ce qu'elle <b>montre</b> ; la fatigue est ce qu'elle garde pour le moment où le marché s'est vidé. Les deux sont vrais, et un avis solide les garde ensemble. Deux erreurs guettent : ne retenir qu'une moitié des indices (le sourire, ou la fatigue), ou conclure que le texte se contredit. Un texte qui présente deux faces d'une même personne ne se contredit pas."
  }));

  const P2 = "Le vent avait tourné pendant la nuit. Quand Jayen poussa sa pirogue vers l'eau, la mer n'était plus la même : elle avait cette couleur d'étain que son grand-père appelait « le mauvais silence ». Les autres pêcheurs étaient déjà partis vers le récif. Jayen, lui, resta un long moment la main sur la coque, à regarder l'horizon. Puis il tira la pirogue sur le sable, la retourna et rentra chez lui sans un mot. À onze heures, l'orage creva sur la baie. Les bateaux revinrent trempés et en désordre, et l'on chercha longtemps le canot du jeune Sooresh, parti le dernier. Ce soir-là, personne ne demanda à Jayen pourquoi il n'avait pas pris la mer.";
  const R2 = "Lis le texte, puis réponds à la question.<br><br><em>" + P2 + "</em><br><br>";

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-002-a', chapterId: 'g9fr-comprehension', subsection: 'reperage_explicite', difficulty: 1,
    question: R2 + "À quelle heure l'orage a-t-il éclaté sur la baie ? Écris l'heure telle qu'elle est donnée dans le texte.",
    answer: 'onze heures', alsoAccept: ['onze', '11 heures', '11h', '11 h', 'à onze heures'],
    hint: "L'heure est écrite en toutes lettres, juste avant le mot « orage ».",
    explanation: "Le texte dit : « À <b>onze heures</b>, l'orage creva sur la baie. » L'erreur fréquente est de répondre « pendant la nuit », qui est le moment où le vent a tourné, et non celui de l'orage. Vérifie toujours que l'indication de temps que tu relèves porte bien sur l'événement demandé."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-002-b', chapterId: 'g9fr-comprehension', subsection: 'synonymes_contexte', difficulty: 2,
    question: R2 + "Relève dans le texte le verbe qui dit que l'orage a éclaté d'un seul coup.",
    answer: 'creva', alsoAccept: ['il creva', "l'orage creva"],
    hint: "C'est un verbe au passé simple, dans la phrase qui parle de l'orage.",
    explanation: "Le texte emploie « l'orage <b>creva</b> sur la baie » : le verbe « crever » dit ici l'éclatement brutal. Beaucoup d'élèves relèvent « revinrent », qui est bien un passé simple mais qui décrit le retour des bateaux, c'est-à-dire la conséquence. Relis la phrase avec le mot que tu proposes pour vérifier qu'il désigne bien l'action demandée."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-002-c', chapterId: 'g9fr-comprehension', subsection: 'expression_imagee', difficulty: 3,
    question: R2 + "Le grand-père de Jayen appelait cet état de la mer « le mauvais silence ». Que désigne cette expression ?",
    options: [
      "Un calme trompeur qui annonce le gros temps",
      "Le silence des pêcheurs avant de partir en mer",
      "Une mer sans poissons, où la pêche est nulle",
      "Le refus de parler après une mauvaise journée"
    ],
    answer: "Un calme trompeur qui annonce le gros temps",
    hint: "Demande-toi pourquoi ce silence est qualifié de « mauvais ».",
    explanation: "L'expression nomme un <b>calme trompeur</b> : la mer paraît tranquille alors qu'elle annonce la tempête, et la suite du texte le confirme. L'erreur est de comprendre « silence » au sens propre, comme une absence de bruit ou de paroles. Dans une expression imagée, c'est l'ensemble du groupe de mots qui prend un sens nouveau."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-002-d', chapterId: 'g9fr-comprehension', subsection: 'reponses_multiples', difficulty: 3,
    question: R2 + "Deux détails, et deux seulement, montrent que Jayen s'est fié à ce que son grand-père lui avait appris. Lesquels ?",
    options: [
      "La couleur de la mer et les mots de son grand-père",
      "Le départ des autres pêcheurs et le canot de Sooresh",
      "L'heure de l'orage et le retour des bateaux trempés",
      "La main sur la coque et le silence du soir venu"
    ],
    answer: "La couleur de la mer et les mots de son grand-père",
    hint: "Cherche ce que Jayen pouvait observer <b>avant</b> de décider, pas ce qui est arrivé après.",
    explanation: "Jayen décide en voyant la « couleur d'étain » et en se rappelant le nom que son grand-père donnait à cet état de la mer : ces deux détails précèdent sa décision. Le piège est de choisir l'orage ou le retour des bateaux, qui sont les <b>conséquences</b> : ils prouvent qu'il a eu raison, mais ils ne peuvent pas expliquer un choix fait plus tôt. Une preuve doit exister au moment de la décision."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-002-e', chapterId: 'g9fr-comprehension', subsection: 'avis_personnel', difficulty: 4,
    question: R2 + "D'après toi, Jayen a-t-il eu raison de rester à terre ? Un élève répond : « Oui, parce que l'orage a éclaté ensuite. » Que manque-t-il à cette réponse ?",
    options: [
      "Elle juge après coup, sans dire ce que Jayen savait",
      "Elle ne précise pas à quelle heure l'orage a éclaté",
      "Elle ne raconte pas ce qui est arrivé au canot",
      "Elle n'emploie pas le passé simple du récit"
    ],
    answer: "Elle juge après coup, sans dire ce que Jayen savait",
    hint: "Un choix se juge sur ce que la personne pouvait savoir au moment où elle décide.",
    explanation: "Dire « il a eu raison parce que l'orage est venu », c'est juger sur le <b>résultat</b>. Une réponse complète dit ce que Jayen avait sous les yeux avant de décider : la couleur de la mer et l'avertissement de son grand-père. C'est le piège du raisonnement après coup, très fréquent : le résultat n'est pas la raison, il ne fait que la confirmer."
  }));

  const P3 = "Depuis la rentrée, Nadia rapportait chaque semaine un carnet couvert de bonnes notes, que ses parents affichaient sur la porte du frigo. Ce vendredi-là pourtant, elle traîna longtemps devant le portail du collège avant de rentrer. Dans son sac, la feuille de mathématiques pesait comme une pierre : douze sur trente. À table, personne ne posa de question. Nadia mangea, débarrassa, puis monta dans sa chambre. Vers neuf heures, son père frappa doucement à la porte, s'assit au bord du lit et dit simplement : « Montre-moi ce qui n'a pas marché. » Il ne parla pas de la note. Ils reprirent l'exercice ensemble jusqu'à ce que Nadia comprenne son erreur, et ce soir-là le carnet resta dans le sac.";
  const R3 = "Lis le texte, puis réponds à la question.<br><br><em>" + P3 + "</em><br><br>";

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-003-a', chapterId: 'g9fr-comprehension', subsection: 'reperage_explicite', difficulty: 1,
    question: R3 + "Quelle note Nadia a-t-elle obtenue en mathématiques ? Écris-la exactement comme le texte la donne.",
    answer: 'douze sur trente', alsoAccept: ['12 sur 30', '12/30', 'douze sur trente.'],
    hint: "La note est écrite en toutes lettres, juste après les deux points.",
    explanation: "Le texte donne « <b>douze sur trente</b> ». L'erreur fréquente est de relever « neuf heures », qui est l'heure à laquelle le père monte, ou de n'écrire que « douze » en oubliant le total. Une note se lit toujours en deux parties : les points obtenus et les points possibles."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-003-b', chapterId: 'g9fr-comprehension', subsection: 'synonymes_contexte', difficulty: 2,
    question: R3 + "Relève dans le texte le verbe qui signifie « rester là sans se décider à partir ».",
    answer: 'traîna', alsoAccept: ['elle traîna', 'traîner'],
    hint: "Le verbe est au passé simple, dans la phrase qui parle du portail du collège.",
    explanation: "Le texte dit qu'elle « <b>traîna</b> longtemps devant le portail » : le verbe traduit l'hésitation avant de rentrer. Beaucoup d'élèves relèvent « monta » ou « resta », qui décrivent d'autres moments. Vérifie que le verbe choisi se trouve bien dans la phrase où l'idée demandée apparaît."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-003-c', chapterId: 'g9fr-comprehension', subsection: 'expression_imagee', difficulty: 3,
    question: R3 + "Que veut dire l'auteur en écrivant que la feuille de mathématiques « pesait comme une pierre » ?",
    options: [
      "Cette feuille lui causait une lourde inquiétude",
      "Cette feuille était très épaisse et très lourde",
      "Cette feuille était froissée au fond de son sac",
      "Cette feuille lui avait demandé beaucoup de travail"
    ],
    answer: "Cette feuille lui causait une lourde inquiétude",
    hint: "Une feuille de papier ne pèse rien : la comparaison parle d'autre chose.",
    explanation: "La comparaison transporte le poids du sac vers l'esprit de Nadia : c'est son <b>inquiétude</b> qui est lourde. Le piège est de lire la comparaison au sens propre et de parler de l'épaisseur du papier. Quand une image dit une chose impossible au sens propre, cherche le sentiment qu'elle traduit."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-003-d', chapterId: 'g9fr-comprehension', subsection: 'inference', difficulty: 3,
    question: R3 + "Le texte ne l'explique pas : pourquoi, ce soir-là, le carnet est-il resté dans le sac ?",
    options: [
      "Parce que la note n'était pas l'important ce soir-là",
      "Parce que Nadia avait oublié de le faire signer",
      "Parce que ses parents ne regardaient plus ses notes",
      "Parce que le père avait interdit de l'afficher"
    ],
    answer: "Parce que la note n'était pas l'important ce soir-là",
    hint: "Relie la dernière phrase à ce que le père a fait et à ce qu'il n'a pas dit.",
    explanation: "Le père « ne parla pas de la note » et reprit l'exercice : ce soir-là, comprendre comptait plus que le chiffre, et le carnet n'avait donc plus de raison d'aller sur le frigo. L'erreur est de supposer une habitude abandonnée ou une interdiction, que rien n'appuie. Une déduction se construit sur les détails donnés, pas sur ce qu'on imagine autour."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-003-e', chapterId: 'g9fr-comprehension', subsection: 'avis_personnel', difficulty: 4,
    question: R3 + "D'après toi, le père a-t-il bien agi en ne parlant pas de la note ? Voici quatre réponses d'élèves. Laquelle est à la fois un avis <b>et</b> une justification tirée du texte ?",
    options: [
      "Oui : en reprenant l'exercice, il l'aide à comprendre",
      "Oui : des parents doivent toujours encourager l'enfant",
      "Le père s'est assis au bord du lit et a parlé bas",
      "Non : il aurait dû afficher le carnet comme avant"
    ],
    answer: "Oui : en reprenant l'exercice, il l'aide à comprendre",
    hint: "Un avis personnel doit être énoncé, puis appuyé sur un détail précis du texte.",
    explanation: "La bonne réponse donne un avis (« oui ») <b>et</b> le fonde sur un fait écrit : ils reprennent l'exercice jusqu'à ce que Nadia comprenne son erreur. Trois erreurs sont représentées ici : justifier par une idée générale sur les parents plutôt que par le texte, recopier une phrase sans donner d'avis, et appuyer un avis sur un détail qui ne le soutient pas."
  }));

  const P4 = "Au début, l'idée fit sourire. Trois élèves de Grade 9 avaient demandé au directeur deux poubelles supplémentaires : une pour le papier, une pour le plastique. « Vous les remplirez le premier jour, puis vous oublierez », leur dit-il. Ils installèrent les bacs un lundi. Le vendredi, les bacs débordaient et l'employé dut faire deux voyages. Les trois élèves changèrent alors de méthode : ils passèrent dans les classes, expliquèrent leur projet et demandèrent à chaque classe de désigner deux responsables. Un mois plus tard, le collège vendait son papier à un récupérateur et l'argent servait à acheter des livres pour la bibliothèque. Le directeur, lui, ne dit rien, mais il fit installer quatre bacs de plus dans la cour.";
  const R4 = "Lis le texte, puis réponds à la question.<br><br><em>" + P4 + "</em><br><br>";

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-004-a', chapterId: 'g9fr-comprehension', subsection: 'reperage_explicite', difficulty: 2,
    question: R4 + "Combien de bacs supplémentaires le directeur a-t-il fait installer un mois plus tard ? Écris le nombre en chiffres.",
    answer: '4', alsoAccept: ['quatre', '4 bacs', 'quatre bacs'],
    hint: "Le texte parle de bacs à deux moments différents : lis bien lequel est demandé.",
    explanation: "La dernière phrase dit qu'il « fit installer <b>quatre</b> bacs de plus ». Deux erreurs sont fréquentes : répondre 2, qui est le nombre demandé au départ par les élèves, ou 6, en additionnant les deux nombres. Quand un même objet est compté deux fois dans un texte, repère d'abord le moment dont parle la question."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-004-b', chapterId: 'g9fr-comprehension', subsection: 'synonymes_contexte', difficulty: 2,
    question: R4 + "Relève dans le texte le verbe à l'infinitif qui signifie « choisir quelqu'un pour une tâche ».",
    answer: 'désigner', alsoAccept: ['de désigner'],
    hint: "Le verbe suit « demandèrent à chaque classe de… ».",
    explanation: "Le texte demande à chaque classe de « <b>désigner</b> deux responsables » : désigner, c'est choisir une personne pour une fonction. L'erreur courante est de relever « expliquèrent » ou « demandèrent », qui sont dans la même phrase mais décrivent d'autres actions. Remplace mentalement le mot par la définition donnée pour vérifier qu'il convient."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-004-c', chapterId: 'g9fr-comprehension', subsection: 'inference', difficulty: 3,
    question: R4 + "Le texte ne dit pas ce que le directeur pense à la fin. Que montre le fait qu'il fasse installer quatre bacs de plus sans rien dire ?",
    options: [
      "Il reconnaît en actes qu'il s'était trompé",
      "Il veut occuper les élèves pour qu'ils se taisent",
      "Il n'a pas remarqué ce que les élèves ont fait",
      "Il préfère acheter des bacs plutôt que des livres"
    ],
    answer: "Il reconnaît en actes qu'il s'était trompé",
    hint: "Compare ce qu'il avait annoncé au début avec ce qu'il fait à la fin.",
    explanation: "Il avait prédit que les élèves oublieraient ; il finance finalement quatre bacs de plus. Le geste dit ce que les mots ne disent pas : il a changé d'avis. L'erreur est d'attendre qu'un revirement soit annoncé à voix haute et de conclure qu'il n'a rien remarqué. Dans un récit, une action vaut souvent déclaration."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-004-d', chapterId: 'g9fr-comprehension', subsection: 'avis_personnel', difficulty: 4,
    question: R4 + "Selon toi, qu'est-ce qui a fait la réussite du projet ? Un élève répond : « Le succès vient de ce que les bacs étaient bien placés. » Pourquoi cette réponse ne convient-elle pas ?",
    options: [
      "Le texte attribue le succès au travail d'explication",
      "Le texte ne dit nulle part où les bacs ont été posés",
      "Le texte parle de papier et non de plastique",
      "Le texte ne donne pas l'avis du directeur"
    ],
    answer: "Le texte attribue le succès au travail d'explication",
    hint: "Repère le moment précis où les élèves changent de méthode, et ce qui arrive ensuite.",
    explanation: "Le tournant est explicite : les élèves « changèrent alors de méthode », passèrent dans les classes et firent désigner des responsables ; c'est de là que vient la réussite. L'erreur consiste à retenir un détail de décor plausible et à en faire la cause. Une explication doit s'appuyer sur ce que le texte présente comme un changement, pas sur ce qui reste au second plan."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-004-e', chapterId: 'g9fr-comprehension', subsection: 'reponses_multiples', difficulty: 3,
    question: R4 + "Deux éléments, et deux seulement, montrent que le projet a dépassé son but de départ. Lesquels ?",
    options: [
      "La vente du papier et l'achat de livres",
      "Les deux poubelles et le sourire du directeur",
      "Le lundi de l'installation et les deux voyages",
      "Les responsables de classe et le mois écoulé"
    ],
    answer: "La vente du papier et l'achat de livres",
    hint: "Le but de départ était de trier. Cherche ce que le collège obtient <b>en plus</b> du tri.",
    explanation: "Au départ, les élèves voulaient seulement deux bacs pour trier. À la fin, le collège <b>vend</b> son papier et <b>achète</b> des livres : le projet rapporte, ce qui n'était pas prévu. Le piège est de relever des détails du début, qui décrivent le but lui-même, ou des dates, qui ne mesurent rien. Pour montrer qu'un but est dépassé, il faut nommer ce qui s'ajoute au but."
  }));

  const P5 = "Je n'avais jamais vu la neige. À Curepipe, la pluie tombait droit, tiède, et mon oncle riait quand je lui demandais si l'hiver existait vraiment. Le jour où l'avion s'est posé à Lyon, j'ai compris que je m'étais trompé sur tout : la neige n'était pas blanche mais grise, elle ne tombait pas, elle rôdait, et elle entrait dans les chaussures. Ma tante m'a tendu une écharpe en riant : « Tu apprendras. » J'ai mis trois semaines à ne plus avoir froid, et deux ans à comprendre que ce n'était pas le froid qui me pesait : c'était l'absence de la pluie tiède de Curepipe.";
  const R5 = "Lis le texte, puis réponds à la question.<br><br><em>" + P5 + "</em><br><br>";

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-005-a', chapterId: 'g9fr-comprehension', subsection: 'reperage_explicite', difficulty: 2,
    question: R5 + "Combien de semaines le narrateur a-t-il mises à ne plus avoir froid ? Écris seulement le nombre, en chiffres.",
    answer: '3', alsoAccept: ['trois', '3 semaines', 'trois semaines'],
    hint: "La dernière phrase donne deux durées : l'une en semaines, l'autre en années.",
    explanation: "Le texte dit : « J'ai mis <b>trois</b> semaines à ne plus avoir froid. » L'erreur fréquente est de répondre 2, en prenant les « deux ans » de la même phrase, qui mesurent le temps d'une compréhension et non celui de l'acclimatation au froid. Lis jusqu'au bout de la phrase avant de choisir un nombre."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-005-b', chapterId: 'g9fr-comprehension', subsection: 'synonymes_contexte', difficulty: 2,
    question: R5 + "Relève dans le texte l'adjectif qui signifie « un peu chaude » et qui qualifie deux fois la pluie.",
    answer: 'tiède', alsoAccept: ['tiede'],
    hint: "L'adjectif apparaît au début du texte, puis une seconde fois à la toute fin.",
    explanation: "La pluie de Curepipe est décrite comme « <b>tiède</b> », c'est-à-dire légèrement chaude, ni froide ni brûlante. Beaucoup d'élèves relèvent « chaude », qui n'est pas dans le texte, ou « droit », qui décrit la manière de tomber et non la température. Relever, c'est recopier le mot exact employé par l'auteur."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-005-c', chapterId: 'g9fr-comprehension', subsection: 'expression_imagee', difficulty: 3,
    question: R5 + "Le narrateur écrit que la neige « ne tombait pas, elle rôdait ». Pourquoi choisit-il ce verbe ?",
    options: [
      "Pour dire que la neige était partout et sournoise",
      "Pour dire que la neige descendait très lentement",
      "Pour dire que la neige faisait un bruit de pas",
      "Pour dire que la neige fondait avant de toucher"
    ],
    answer: "Pour dire que la neige était partout et sournoise",
    hint: "Pense à ce qu'on dit d'une personne qui rôde autour d'une maison.",
    explanation: "« Rôder » se dit de quelqu'un qui tourne autour sans se montrer franchement : la neige est présentée comme une présence insistante, qui « entrait dans les chaussures ». C'est une <b>personnification</b>. L'erreur est de traduire le verbe par une vitesse ou un bruit : ce sont des sens littéraux que le mot n'a pas ici."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-005-d', chapterId: 'g9fr-comprehension', subsection: 'inference', difficulty: 4,
    question: R5 + "À la fin, le narrateur dit qu'il lui a fallu deux ans pour comprendre que ce n'était pas le froid qui lui pesait. Que faut-il comprendre ?",
    options: [
      "Ce qui lui manquait, c'était son pays, non le climat",
      "Il a fini par trouver l'hiver de Lyon très agréable",
      "Il avait oublié quel temps il faisait à Curepipe",
      "Le froid de Lyon était moins vif qu'il ne le croyait"
    ],
    answer: "Ce qui lui manquait, c'était son pays, non le climat",
    hint: "Compare les deux durées : trois semaines pour le corps, deux ans pour autre chose.",
    explanation: "Trois semaines suffisent au corps ; il en faut deux ans pour mettre un nom sur le manque, et ce manque est celui du pays, que la pluie de Curepipe résume. L'erreur est de lire cette dernière phrase comme une information sur la température, alors qu'elle parle d'un sentiment. Quand une phrase de fin oppose deux durées très inégales, elle oppose presque toujours deux choses de nature différente."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-005-e', chapterId: 'g9fr-comprehension', subsection: 'avis_personnel', difficulty: 3,
    question: R5 + "La tante lui tend une écharpe en riant et dit : « Tu apprendras. » D'après toi, qu'a-t-elle voulu dire ?",
    options: [
      "Qu'il s'habituera, comme le montre la suite du texte",
      "Qu'il apprendra à parler comme les gens de Lyon",
      "Qu'il devra apprendre à porter une écharpe l'hiver",
      "Qu'elle se moque de lui, comme le faisait son oncle"
    ],
    answer: "Qu'il s'habituera, comme le montre la suite du texte",
    hint: "Le geste de la tante accompagne la parole : que fait-elle en même temps qu'elle parle ?",
    explanation: "Elle lui donne une écharpe : le rire est bienveillant, et la suite du texte lui donne raison puisque le narrateur finit par ne plus avoir froid. Deux erreurs guettent : prendre le verbe « apprendre » au sens scolaire, ou lire de la moquerie parce que l'oncle riait plus tôt. Un même geste — rire — ne veut pas dire la même chose selon celui qui le fait et ce qu'il fait en même temps."
  }));

  // ── Rédaction (Q9, 15 points) : produire, et non choisir un conseil ────────

  const RED = "Rédaction — sujet de récit au passé.<br><br>";

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-006-a', chapterId: 'g9fr-redaction', subsection: 'recit', difficulty: 2,
    question: RED + "Voici le début du récit d'un élève : « Ce matin-là, Krish <b>(se lever)</b> tôt. » Écris le verbe entre parenthèses au <b>passé simple</b>. Écris seulement le verbe avec son pronom réfléchi, comme dans « se coucha ».",
    answer: 'se leva', alsoAccept: ['il se leva'],
    hint: "Le passé simple de « lever » à la 3e personne du singulier se termine par -a.",
    explanation: "Le passé simple de « se lever » est <b>se leva</b> : le pronom réfléchi « se » reste devant le verbe. Deux erreurs reviennent souvent : oublier le pronom et écrire « leva », ce qui change le sens (lever quelque chose), ou écrire « s'est levé », qui est du passé composé et non du passé simple demandé."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-006-b', chapterId: 'g9fr-redaction', subsection: 'recit', difficulty: 3,
    question: RED + "Dans le même récit, ces deux verbes plantent le décor : « La cour <b>(être)</b> encore sombre et le coq <b>(chanter)</b> déjà. » Écris les deux verbes à l'<b>imparfait</b>, séparés par une virgule.",
    answer: 'était, chantait', alsoAccept: ['était chantait', 'était,chantait', 'était et chantait'],
    hint: "Le décor d'un récit ne se raconte pas comme une action : il dure.",
    explanation: "Le décor se met à l'imparfait : <b>était</b>, <b>chantait</b>. L'erreur classique est de tout mettre au passé simple (« fut », « chanta »), ce qui transformerait le décor en deux actions brèves et donnerait l'impression que le coq n'a chanté qu'une fois. Le passé simple porte les actions ; l'imparfait porte ce qui dure autour d'elles."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-006-c', chapterId: 'g9fr-redaction', subsection: 'recit', difficulty: 4,
    question: RED + "Récris la phrase suivante en mettant les <b>deux</b> verbes au passé simple, et écris la phrase entière : « Il <b>(prendre)</b> son vélo et <b>(partir)</b> sans réveiller personne. »",
    answer: 'Il prit son vélo et partit sans réveiller personne.',
    alsoAccept: ['Il prit son vélo et partit sans réveiller personne', 'il prit son velo et partit sans reveiller personne'],
    hint: "Les deux verbes sont irréguliers : leur passé simple ne se forme pas sur l'infinitif.",
    explanation: "Au passé simple, « prendre » donne <b>prit</b> et « partir » donne <b>partit</b> — deux formes irrégulières qu'il faut connaître. Les erreurs les plus fréquentes sont « prendit », construit à tort sur l'infinitif, et « partis », qui est la 1re ou la 2e personne. Le troisième verbe, « réveiller », reste à l'infinitif car il suit la préposition « sans »."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-006-d', chapterId: 'g9fr-redaction', subsection: 'recit', difficulty: 3,
    question: RED + "Un élève écrit : « Krish pédalait vite quand un chien traversa la route. Il freine et tomba. » Quel verbe rompt le récit au passé ?",
    options: ['freine', 'pédalait', 'traversa', 'tomba'],
    answer: 'freine',
    hint: "Trois de ces verbes appartiennent au système du passé ; un seul n'y appartient pas.",
    explanation: "« <b>Freine</b> » est au présent, au milieu d'un récit au passé : le lecteur est brutalement sorti de l'histoire. « Pédalait » (imparfait, le décor) et « traversa », « tomba » (passé simple, les actions) sont corrects ensemble. L'erreur est de croire que l'imparfait et le passé simple ne peuvent pas se côtoyer : c'est au contraire le couple normal du récit."
  }));

  const DES = "Rédaction — sujet de description.<br><br>";

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-007-a', chapterId: 'g9fr-redaction', subsection: 'description', difficulty: 2,
    question: DES + "Un élève décrit un marché et écrit : « L'endroit était très joli et super sympa. » Quelle réécriture <b>décrit</b> vraiment ?",
    options: [
      "Des paniers de letchis rouges bordaient l'allée",
      "L'endroit était vraiment magnifique et bien agréable",
      "J'ai beaucoup aimé cet endroit, il m'a vraiment plu",
      "C'était un endroit comme on en voit assez rarement"
    ],
    answer: "Des paniers de letchis rouges bordaient l'allée",
    hint: "Décrire, c'est donner à voir : le lecteur doit pouvoir se faire une image.",
    explanation: "Seule la première phrase donne ce que l'œil enregistre : des paniers, des letchis, une couleur, une place dans l'allée. Les autres remplacent un jugement (« joli ») par un autre jugement (« magnifique », « j'ai aimé », « on en voit rarement ») : le lecteur ne voit toujours rien. Une description se juge à l'image qu'elle produit, pas au nombre d'adjectifs appréciatifs."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-007-b', chapterId: 'g9fr-redaction', subsection: 'description', difficulty: 3,
    question: DES + "Dans une description au passé, écris les deux verbes entre parenthèses à l'<b>imparfait</b>, séparés par une virgule : « Le vent <b>(sentir)</b> le sel et les filets <b>(sécher)</b> sur le mur. »",
    answer: 'sentait, séchaient', alsoAccept: ['sentait séchaient', 'sentait,séchaient', 'sentait et séchaient'],
    hint: "Attention au sujet du second verbe : il n'est pas au singulier.",
    explanation: "L'imparfait donne <b>sentait</b> (le vent, singulier) et <b>séchaient</b> (les filets, pluriel). Deux erreurs sont fréquentes : employer le passé simple (« sentit », « séchèrent »), qui ferait de ces états deux actions ponctuelles, et accorder les deux verbes au singulier en oubliant que « les filets » commande la terminaison -aient."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-007-c', chapterId: 'g9fr-redaction', subsection: 'description', difficulty: 4,
    question: DES + "Récris la phrase entière à l'<b>imparfait</b>, sans changer l'ordre des mots : « Une odeur de pain chaud <b>(monter)</b> de la boutique et <b>(remplir)</b> toute la rue. »",
    answer: 'Une odeur de pain chaud montait de la boutique et remplissait toute la rue.',
    alsoAccept: ['Une odeur de pain chaud montait de la boutique et remplissait toute la rue'],
    hint: "Les verbes du deuxième groupe intercalent -iss- devant la terminaison de l'imparfait.",
    explanation: "« Monter » est du premier groupe : <b>montait</b>. « Remplir » est du deuxième groupe et prend l'infixe -iss- à l'imparfait : <b>remplissait</b>. L'erreur très répandue est d'écrire « remplait », formé comme un verbe du premier groupe. Le sujet des deux verbes est le même — « une odeur » — donc les deux restent au singulier."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-007-d', chapterId: 'g9fr-redaction', subsection: 'description', difficulty: 3,
    question: DES + "Un élève décrit une plage : « Le sable était chaud. Le sable était blanc. Le sable était fin. » Quel est le principal défaut, et comment le corriger ?",
    options: [
      "Trois phrases répètent le sujet : il faut les relier",
      "Les adjectifs sont mal choisis : il faut les changer",
      "Le temps est faux : il fallait le passé simple ici",
      "Il manque des verbes : la description en demande plus"
    ],
    answer: "Trois phrases répètent le sujet : il faut les relier",
    hint: "Lis les trois phrases à voix haute : qu'est-ce qui revient à chaque fois ?",
    explanation: "Les trois adjectifs sont bons et l'imparfait convient : le défaut est la <b>répétition</b> du sujet et du verbe, qu'une seule phrase corrige — « Le sable était chaud, blanc et fin. » L'erreur est de croire qu'une description s'améliore en ajoutant des mots ou des verbes ; elle s'améliore en supprimant ce qui se répète."
  }));

  const OPI = "Rédaction — sujet d'opinion : « Faut-il interdire le portable au collège ? »<br><br>";

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-008-a', chapterId: 'g9fr-redaction', subsection: 'texte_opinion', difficulty: 2,
    question: OPI + "Dans un texte d'opinion, il faut distinguer les faits et les opinions. Laquelle de ces phrases exprime une <b>opinion</b> ?",
    options: [
      "À mon avis, le portable dérange plus qu'il n'aide",
      "Le collège compte huit cents élèves cette année",
      "Les cours commencent à huit heures et demie",
      "Trois classes ont reçu des tablettes en janvier"
    ],
    answer: "À mon avis, le portable dérange plus qu'il n'aide",
    hint: "Un fait se vérifie ; une opinion se discute.",
    explanation: "Seule la première phrase donne un point de vue, annoncé par « à mon avis », et un autre élève pourrait soutenir le contraire. Les trois autres énoncent des faits vérifiables : un effectif, un horaire, une livraison. L'erreur est de prendre un chiffre pour un argument : un fait ne devient une opinion que lorsqu'on dit ce qu'on en pense."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-008-b', chapterId: 'g9fr-redaction', subsection: 'texte_opinion', difficulty: 3,
    question: OPI + "Complète cette phrase de ton texte d'opinion en écrivant le verbe <b>être</b> à la forme qui convient : « Bien que le portable ... utile en classe, il distrait souvent les élèves. » Écris seulement le verbe.",
    answer: 'soit',
    hint: "« Bien que » n'est pas suivi du même mode que « parce que ».",
    explanation: "La locution « bien que » exprime une concession et commande le <b>subjonctif</b> : « bien que le portable <b>soit</b> utile ». L'erreur la plus fréquente est d'écrire « est », parce que la phrase énonce un fait ; mais c'est la conjonction, et non le sens, qui impose le mode. Retiens le couple : « parce qu'il est » (indicatif) / « bien qu'il soit » (subjonctif)."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-008-c', chapterId: 'g9fr-redaction', subsection: 'texte_opinion', difficulty: 4,
    question: OPI + "Un élève écrit ce paragraphe : « Je pense que le portable doit être interdit au collège. Il doit être interdit parce qu'il ne faut pas l'autoriser. » Quel est le défaut de ce paragraphe ?",
    options: [
      "L'argument répète l'opinion au lieu de la prouver",
      "L'argument est juste mais il manque un exemple",
      "L'opinion n'est pas annoncée par une formule claire",
      "Le paragraphe emploie deux fois le même connecteur"
    ],
    answer: "L'argument répète l'opinion au lieu de la prouver",
    hint: "Demande-toi si la deuxième phrase apporte une information que la première ne contient pas.",
    explanation: "« Il faut l'interdire parce qu'il ne faut pas l'autoriser » dit deux fois la même chose : c'est un <b>raisonnement circulaire</b>. L'opinion est bien annoncée et le connecteur est correct ; ce qui manque, c'est une raison extérieure à l'opinion (les élèves distraits, les vols, le bruit). Pour vérifier un argument, demande-toi s'il ajoute un fait ou s'il se contente de reformuler ce qu'on veut prouver."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-008-d', chapterId: 'g9fr-redaction', subsection: 'texte_opinion', difficulty: 3,
    question: OPI + "Relie ces deux phrases en une seule, avec le connecteur <b>puisque</b>, sans rien ajouter d'autre. Écris la phrase entière. « Les élèves se distraient. Les portables sonnent pendant les cours. »",
    answer: 'Les élèves se distraient puisque les portables sonnent pendant les cours.',
    alsoAccept: ['Les élèves se distraient puisque les portables sonnent pendant les cours'],
    hint: "« Puisque » introduit la cause : il se place devant ce qui explique, pas devant ce qui est expliqué.",
    explanation: "« Puisque » introduit la <b>cause</b> : la sonnerie explique la distraction, donc le connecteur se place devant « les portables sonnent ». L'erreur est d'écrire « Les portables sonnent puisque les élèves se distraient », qui inverse la cause et la conséquence et fait dire au texte le contraire de ce qu'on veut soutenir. Avant d'employer un connecteur logique, dis-toi laquelle des deux idées explique l'autre."
  }));

  const SUJ = "Rédaction — respecter le sujet imposé.<br><br>";

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-009-a', chapterId: 'g9fr-redaction', subsection: 'recit', difficulty: 2,
    question: SUJ + "Le sujet demande : « Raconte un jour où tu as eu très peur. » Quel début respecte le sujet ?",
    options: [
      "Ce jeudi-là, le vent a arraché la tôle du hangar",
      "La peur est un sentiment que tout le monde connaît",
      "Je vais vous parler de la peur et de ses effets",
      "Il y a beaucoup de choses qui font peur aux gens"
    ],
    answer: "Ce jeudi-là, le vent a arraché la tôle du hangar",
    hint: "Le verbe du sujet est « raconte » : que faut-il donc écrire dès la première ligne ?",
    explanation: "« Raconter » demande un <b>événement daté et vécu</b> : un jour précis, un lieu, un fait. Les trois autres débuts ouvrent une dissertation générale sur la peur — c'est le hors-sujet le plus fréquent à cette question. Avant d'écrire, souligne le verbe de la consigne : raconter, décrire et donner son avis n'appellent pas la même première phrase."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-009-b', chapterId: 'g9fr-redaction', subsection: 'description', difficulty: 3,
    question: SUJ + "Le sujet demande : « Décris le marché de ton village un samedi matin. » Un élève écrit six phrases qui racontent tout ce qu'il a acheté, dans l'ordre. Que doit-il changer ?",
    options: [
      "Montrer ce que l'on voit et entend, non ce qu'on fait",
      "Ajouter la date exacte et le nom du village au début",
      "Employer le passé composé plutôt que l'imparfait",
      "Écrire plus de phrases pour atteindre la longueur"
    ],
    answer: "Montrer ce que l'on voit et entend, non ce qu'on fait",
    hint: "Une suite d'actions dans l'ordre, c'est un récit. Le sujet demande autre chose.",
    explanation: "Une liste d'achats successifs est un <b>récit</b> ; le sujet demande une <b>description</b>, c'est-à-dire ce qui s'offre aux sens : les étals, les couleurs, les cris des marchands, l'odeur du poisson. L'erreur n'est ni dans la longueur ni dans le temps employé, mais dans la nature même du texte produit. Le verbe de la consigne commande le type de texte."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-009-c', chapterId: 'g9fr-redaction', subsection: 'recit', difficulty: 4,
    question: SUJ + "Ton récit doit être écrit à la première personne. Récris la phrase entière en remplaçant « Karim » par « je » (tu es un garçon) : « Karim est arrivé en retard et s'est excusé auprès de sa maîtresse. »",
    answer: "Je suis arrivé en retard et je me suis excusé auprès de ma maîtresse.",
    alsoAccept: ["Je suis arrivé en retard et me suis excusé auprès de ma maîtresse.",
                 "Je suis arrivé en retard et je me suis excusé auprès de ma maîtresse",
                 "Je suis arrivé en retard et me suis excusé auprès de ma maîtresse"],
    hint: "Quatre mots au moins doivent changer : l'auxiliaire, le pronom réfléchi et le déterminant possessif.",
    explanation: "Passer à « je » entraîne une chaîne d'accords : l'auxiliaire devient <b>suis</b>, le pronom réfléchi devient <b>me</b> et le possessif devient <b>ma</b>. L'erreur la plus fréquente est de laisser « s'est excusé », qui reste à la 3e personne, ou de garder « sa maîtresse ». Quand on change de personne, tout ce qui renvoie au sujet change avec lui."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-009-d', chapterId: 'g9fr-redaction', subsection: 'description', difficulty: 3,
    question: SUJ + "Dans une description, place les deux adjectifs à leur place habituelle et récris la phrase entière : « Une table <b>(petite, ronde)</b> occupait le coin de la pièce. »",
    answer: 'Une petite table ronde occupait le coin de la pièce.',
    alsoAccept: ['Une petite table ronde occupait le coin de la pièce'],
    hint: "Les adjectifs courts et très courants ne se placent pas comme les adjectifs de forme ou de couleur.",
    explanation: "« Petite » est un adjectif court et courant : il se place <b>avant</b> le nom. « Ronde » indique la forme : il se place <b>après</b>. On obtient « une petite table ronde ». Les deux erreurs sont de tout mettre après (« une table petite ronde ») ou tout avant (« une petite ronde table ») : en français, la place de l'adjectif dépend de l'adjectif, pas d'une règle unique."
  }));

  // ── Voix passive : la produire, et non la reconnaître ──────────────────────

  const VP = "Voix active et voix passive.<br><br>";

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-010-a', chapterId: 'g9fr-transformation', subsection: 'voix_passive', difficulty: 2,
    question: VP + "Récris cette phrase à la <b>voix passive</b>, en gardant le présent. Écris la phrase entière : « Le facteur distribue les lettres. »",
    answer: 'Les lettres sont distribuées par le facteur.',
    alsoAccept: ['Les lettres sont distribuées par le facteur'],
    hint: "Le complément d'objet devient sujet ; le sujet devient complément d'agent, introduit par « par ».",
    explanation: "« Les lettres » devient sujet, le verbe se met à l'auxiliaire <b>être</b> au présent suivi du participe passé, accordé avec le nouveau sujet : <b>sont distribuées</b>. L'erreur fréquente est d'oublier l'accord du participe et d'écrire « sont distribué ». À la voix passive, le participe s'accorde toujours avec le sujet."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-010-b', chapterId: 'g9fr-transformation', subsection: 'voix_passive', difficulty: 3,
    question: VP + "Récris cette phrase à la <b>voix passive</b> en conservant le plus-que-parfait. Écris la phrase entière : « Le directeur avait signé les bulletins. »",
    answer: 'Les bulletins avaient été signés par le directeur.',
    alsoAccept: ['Les bulletins avaient été signés par le directeur'],
    hint: "Au passif, c'est le verbe « être » qui porte le temps de la phrase active.",
    explanation: "Le plus-que-parfait de « être » est « avait été » : on obtient <b>avaient été signés</b>, au pluriel comme « les bulletins ». L'erreur la plus courante est d'écrire « étaient signés », qui est un imparfait passif et recule l'action dans un autre temps. Pour ne pas te tromper, conjugue d'abord « être » au temps de la phrase de départ, puis ajoute le participe."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-010-c', chapterId: 'g9fr-transformation', subsection: 'voix_passive', difficulty: 4,
    question: VP + "Récris cette phrase à la <b>voix passive</b>. Attention : le pronom « on » ne peut jamais devenir complément d'agent. Écris la phrase entière : « On a volé les vélos pendant la nuit. »",
    answer: 'Les vélos ont été volés pendant la nuit.',
    alsoAccept: ['Les vélos ont été volés pendant la nuit'],
    hint: "Deux choses à décider : le temps de l'auxiliaire, et ce que devient « on ».",
    explanation: "Le passé composé actif « a volé » donne le passé composé passif <b>ont été volés</b>, accordé avec « les vélos ». Et « on » disparaît : la phrase passive n'a pas de complément d'agent, ce qui est normal quand l'auteur de l'action est inconnu. L'erreur est d'écrire « par on », qui n'existe pas en français, ou de garder l'auxiliaire au présent."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-010-d', chapterId: 'g9fr-transformation', subsection: 'voix_passive', difficulty: 3,
    question: VP + "Fais l'opération inverse : récris cette phrase à la <b>voix active</b>, en gardant le même temps. Écris la phrase entière : « Les fenêtres avaient été fermées par le gardien. »",
    answer: 'Le gardien avait fermé les fenêtres.',
    alsoAccept: ['Le gardien avait fermé les fenêtres'],
    hint: "Le complément d'agent devient sujet. Demande-toi ensuite si le participe doit encore s'accorder.",
    explanation: "Le complément d'agent devient sujet et le temps est le plus-que-parfait de l'actif : <b>avait fermé</b>. Le piège est de conserver l'accord et d'écrire « avait fermées » : avec l'auxiliaire <b>avoir</b>, le participe ne s'accorde que si le complément d'objet est placé <b>avant</b> le verbe, ce qui n'est pas le cas ici."
  }));

  // ── Temps et modes : produire la forme, pas la reconnaître ─────────────────

  const TM = "Temps et modes verbaux.<br><br>";

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-011-a', chapterId: 'g9fr-grammaire', subsection: 'temps_modes', difficulty: 3,
    question: TM + "Écris le verbe entre parenthèses au temps qui convient. Écris seulement le verbe : « Quand tu <b>(arriver)</b> à la gare, téléphone-moi. »",
    answer: 'arriveras',
    hint: "L'action de la seconde partie de la phrase n'a pas encore eu lieu.",
    explanation: "Après « quand », le français emploie le <b>futur simple</b> lorsque l'action est encore à venir : « quand tu <b>arriveras</b> ». L'erreur très fréquente est d'écrire « arrives » au présent, par analogie avec l'anglais « when you arrive ». En français, « quand » n'empêche pas le futur ; c'est « si » qui l'interdit."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-011-b', chapterId: 'g9fr-grammaire', subsection: 'temps_modes', difficulty: 3,
    question: TM + "Écris le verbe entre parenthèses au temps qui convient. Écris seulement le verbe : « Si tu <b>(venir)</b> demain, nous irons à la plage. »",
    answer: 'viens',
    hint: "La seconde partie est déjà au futur : la première ne peut pas l'être aussi.",
    explanation: "Après « si » exprimant une condition réalisable, on emploie le <b>présent</b>, jamais le futur : « si tu <b>viens</b> demain, nous irons ». L'erreur est d'écrire « viendras » parce que l'action est dans l'avenir : c'est la principale qui porte le futur, pas la subordonnée en « si ». Retiens la paire : si + présent → futur dans l'autre partie."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-011-c', chapterId: 'g9fr-grammaire', subsection: 'temps_modes', difficulty: 4,
    question: TM + "Le fait ne s'est pas produit : il s'agit d'un regret. Récris la phrase entière en mettant les <b>deux</b> verbes au temps qui convient : « Si tu <b>(écouter)</b> le maître, tu <b>(comprendre)</b> l'exercice ce jour-là. »",
    answer: "Si tu avais écouté le maître, tu aurais compris l'exercice ce jour-là.",
    alsoAccept: ["Si tu avais écouté le maître, tu aurais compris l'exercice ce jour-là",
                 "Si tu avais écouté le maître tu aurais compris l'exercice ce jour-là"],
    hint: "Un regret porte sur un fait passé qui n'a pas eu lieu : les deux verbes sont donc à des temps composés.",
    explanation: "Un regret sur le passé demande <b>si + plus-que-parfait</b> dans la subordonnée et le <b>conditionnel passé</b> dans la principale : « si tu <b>avais écouté</b>… tu <b>aurais compris</b> ». L'erreur la plus répandue de tout le programme est d'écrire « si tu aurais écouté » : le conditionnel ne se met jamais directement après « si ». Le conditionnel appartient à l'autre moitié de la phrase."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-011-d', chapterId: 'g9fr-grammaire', subsection: 'temps_modes', difficulty: 3,
    question: TM + "Un élève écrit : « Je veux que tu fais attention. » Quelle correction convient ?",
    options: ['Je veux que tu fasses attention', 'Je veux que tu feras attention', 'Je veux que tu fasse attention', 'Je veux que tu faisais attention'],
    answer: 'Je veux que tu fasses attention',
    hint: "Le verbe « vouloir que » n'introduit pas un fait, mais une volonté.",
    explanation: "« Vouloir que » commande le <b>subjonctif</b> : « je veux que tu <b>fasses</b> attention ». Deux erreurs se croisent ici : garder l'indicatif (« feras », « faisais ») parce que la phrase paraît énoncer un fait, et oublier le -s de la 2e personne du subjonctif (« fasse »). Une volonté n'est pas un fait : le mode le montre."
  }));

  // ── Correction d'erreurs (Q5) : corriger, non reconnaître ──────────────────

  const CE = "Corrige l'erreur soulignée dans cette phrase, tirée du récit d'une sortie de classe à la plage.<br><br>";

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-012-a', chapterId: 'g9fr-correction', subsection: 'orthographe_accents', difficulty: 2,
    question: CE + "<em>« <u>Aujourdui</u>, notre classe part en sortie à la plage. »</em><br><br>Écris le mot souligné correctement orthographié.",
    answer: "Aujourd'hui", alsoAccept: ["aujourd'hui"],
    hint: "Ce mot est formé de plusieurs mots soudés, dont l'un se termine par une apostrophe.",
    explanation: "Le mot correct est <b>aujourd'hui</b> : il vient de « au jour d'hui » et garde le <b>d</b> et l'<b>apostrophe</b> du milieu. L'erreur vient de la prononciation, qui ne fait pas entendre le d. Les mots soudés de ce type — aujourd'hui, quelqu'un, presqu'île — s'écrivent rarement comme ils se disent."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-012-b', chapterId: 'g9fr-correction', subsection: 'determinants', difficulty: 2,
    question: CE + "<em>« <u>Ce</u> filles attendaient devant le portail. »</em><br><br>Écris le déterminant souligné sous sa forme correcte.",
    answer: 'Ces', alsoAccept: ['ces'],
    hint: "Regarde le nom qui suit : combien sont-elles, et de quel genre ?",
    explanation: "Le déterminant démonstratif s'accorde avec le nom : « filles » est féminin pluriel, donc <b>ces</b>. L'erreur est de garder « ce », qui est masculin singulier, parce qu'on ne relit pas le nom. Attention aussi à ne pas écrire « ses », qui est un possessif et changerait le sens : ces filles-là, ou les siennes ?"
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-012-c', chapterId: 'g9fr-correction', subsection: 'homophones', difficulty: 3,
    strictAccents: true, confusables: ['à'],
    question: CE + "<em>« Le maître <u>à</u> rangé le matériel avant de partir. »</em><br><br>Écris le mot souligné sous sa forme correcte.",
    answer: 'a',
    hint: "Remplace le mot par « avait » : si la phrase tient encore debout, c'est le verbe.",
    explanation: "Ici, le mot est l'auxiliaire du verbe « avoir », donc <b>a</b> sans accent : « le maître <b>a</b> rangé », qu'on peut remplacer par « le maître <b>avait</b> rangé ». « À » avec accent est une préposition (« à la plage ») et ne se remplace pas par « avait ». C'est le test de substitution qui départage ces deux homophones."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-012-d', chapterId: 'g9fr-correction', subsection: 'participe_infinitif', difficulty: 3,
    question: CE + "<em>« Les élèves ont <u>organiser</u> la sortie eux-mêmes. »</em><br><br>Écris le verbe souligné sous sa forme correcte.",
    answer: 'organisé',
    hint: "Remplace le verbe par « vendre » : dirais-tu « ont vendre » ou « ont vendu » ?",
    explanation: "Après l'auxiliaire « avoir », il faut le <b>participe passé</b> : « ont <b>organisé</b> ». L'erreur vient de ce que -er et -é se prononcent de la même manière. Le test sûr est de remplacer par un verbe du troisième groupe : « ont vendu » se dit, « ont vendre » ne se dit pas — donc c'est le participe qu'il faut. Ici, le participe ne s'accorde pas, car le complément est placé après le verbe."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-012-e', chapterId: 'g9fr-correction', subsection: 'accords', difficulty: 4,
    question: "Une faute, et une seule, s'est glissée dans cette phrase du récit d'une sortie de classe. Rien n'est souligné : trouve le mot fautif et écris-le corrigé.<br><br><em>« Nous avons pris le bus à sept heures et nous sommes arrivé avant les autres. »</em>",
    answer: 'arrivés',
    hint: "Deux verbes sont conjugués : l'un avec « avoir », l'autre avec « être ». Un seul des deux participes doit s'accorder.",
    explanation: "Avec l'auxiliaire <b>être</b>, le participe passé s'accorde avec le sujet : « nous sommes <b>arrivés</b> ». « Avons pris » est correct, car avec « avoir » le participe ne s'accorde pas quand le complément suit le verbe. L'erreur consiste à traiter les deux participes de la même façon, ou à corriger « pris » qui n'a rien de fautif. Repère d'abord l'auxiliaire, la règle en découle."
  }));

  // ── Écrit guidé (Q7) : tenir la longueur ET les points imposés ─────────────

  const EG = "Écrit guidé : une invitation de <b>50 à 75 mots</b>, contenant trois points imposés — la date, le lieu et ce qu'il faut apporter.<br><br>";

  STATIC_QUESTIONS.push(makeNum({
    id: 'g9fr-fam-013-a', chapterId: 'g9fr-ecrit-guide', subsection: 'longueur_50_75', difficulty: 2,
    question: EG + "Ton brouillon compte <b>92 mots</b>. Combien de mots dois-tu supprimer <b>au minimum</b> pour respecter la consigne ?",
    answer: 17,
    hint: "Il suffit d'atteindre la limite haute autorisée, pas de descendre plus bas.",
    explanation: "La consigne autorise jusqu'à 75 mots, donc il faut retirer 92 − 75 = <b>17</b> mots. L'erreur habituelle est de viser 50, la limite basse, et de calculer 92 − 50 = 42 : on supprimerait alors 25 mots utiles, et souvent l'un des points imposés avec eux. « Au minimum » veut dire : atteindre la borne la plus proche."
  }));

  STATIC_QUESTIONS.push(makeNum({
    id: 'g9fr-fam-013-b', chapterId: 'g9fr-ecrit-guide', subsection: 'longueur_50_75', difficulty: 3,
    question: EG + "Cette fois, ton brouillon ne compte que <b>38 mots</b>. Tu ajoutes une phrase de 9 mots, puis une autre de 7 mots. Combien de mots peux-tu encore ajouter <b>au maximum</b> ?",
    answer: 21,
    hint: "Calcule d'abord le total atteint après les deux ajouts, puis compare-le à la limite haute.",
    explanation: "Après les deux ajouts, le texte compte 38 + 9 + 7 = 54 mots ; il reste donc 75 − 54 = <b>21</b> mots disponibles. Deux erreurs sont fréquentes : oublier un des deux ajouts, et compter à partir de 50 au lieu de 75, ce qui donnerait un texte qu'on croit trop long alors qu'il est encore trop court. La question inverse celle du texte trop long : on mesure ici la marge qui reste."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-013-c', chapterId: 'g9fr-ecrit-guide', subsection: 'points_imposes', difficulty: 3,
    question: EG + "Ton brouillon compte 68 mots. Il donne la date et le lieu, puis se termine par une formule de politesse. Que faut-il faire ?",
    options: [
      "Ajouter ce qu'il faut apporter, en restant sous 75 mots",
      "Laisser le texte tel quel : la longueur est respectée",
      "Supprimer la formule finale pour ajouter des détails",
      "Recommencer le brouillon en suivant un autre plan"
    ],
    answer: "Ajouter ce qu'il faut apporter, en restant sous 75 mots",
    hint: "Vérifie les trois points imposés un par un avant de regarder le nombre de mots.",
    explanation: "Le troisième point imposé — ce qu'il faut apporter — manque, et il reste 7 mots de marge pour l'écrire. L'erreur est de croire qu'un texte de bonne longueur est un texte fini : la longueur n'est qu'une des consignes, et un point imposé oublié coûte plus cher qu'un mot de trop. Il n'y a aucune raison de sacrifier la formule finale, qui est elle aussi attendue."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-013-d', chapterId: 'g9fr-ecrit-guide', subsection: 'longueur_50_75', difficulty: 4,
    question: EG + "Ton brouillon compte 78 mots et contient bien les trois points imposés. La dernière phrase, longue de 11 mots, répète le deuxième point. Que faire ?",
    options: [
      "Supprimer cette phrase : le texte tombe à 67 mots",
      "Supprimer la formule d'ouverture, plus courte à ôter",
      "Garder la phrase : 78 mots, c'est presque 75 mots",
      "Supprimer un des trois points pour gagner des mots"
    ],
    answer: "Supprimer cette phrase : le texte tombe à 67 mots",
    hint: "Cherche à couper ce qui n'apporte rien, puis vérifie que le total retombe dans la fourchette.",
    explanation: "78 − 11 = <b>67</b> mots : le texte rentre dans la fourchette 50-75 et les trois points imposés sont conservés, puisque la phrase supprimée ne faisait que répéter. Les trois autres solutions coûtent un point de la consigne : supprimer un point imposé, retirer une formule attendue, ou dépasser la longueur en se disant que c'est « presque ». Coupe toujours d'abord ce qui se répète."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-013-e', chapterId: 'g9fr-ecrit-guide', subsection: 'points_imposes', difficulty: 3,
    question: EG + "Écris la phrase qui traite le troisième point imposé. Elle doit compter exactement trois mots, commencer par le verbe « apporter » à l'<b>impératif</b> (2e personne du pluriel) et se terminer par « un chapeau ».",
    answer: 'Apportez un chapeau', alsoAccept: ['Apportez un chapeau.'],
    hint: "À l'impératif, le verbe se conjugue sans pronom sujet.",
    explanation: "L'impératif de « apporter » à la 2e personne du pluriel est <b>apportez</b>, écrit sans « vous » devant : « Apportez un chapeau. » Deux erreurs sont fréquentes : écrire l'infinitif « Apporter un chapeau », qui sonne comme une notice et non comme une invitation, et écrire « Vous apportez un chapeau », qui est de l'indicatif et n'invite plus, il constate."
  }));

  // ── Formation des mots (Q4) : écrire la forme dérivée, sans choix proposé ───

  const FM = "Le potager du collège — écris la forme dérivée demandée.<br><br>";

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-014-a', chapterId: 'g9fr-formation-mots', subsection: 'nominalisation', difficulty: 2,
    question: FM + "« L'<b>(arroser)</b> des plants se fait le matin. » Écris le <b>nom</b> formé sur le verbe entre parenthèses.",
    answer: 'arrosage',
    hint: "Le nom cherché désigne l'action elle-même, et se termine par un suffixe de trois lettres.",
    explanation: "Le nom d'action formé sur « arroser » est <b>arrosage</b>, avec le suffixe -age qu'on retrouve dans « nettoyage » ou « balayage ». Deux erreurs reviennent : inventer « arrosement », qui n'existe pas, et recopier le verbe tel quel. Le déterminant « l' » suivi de « des plants » annonce un nom, jamais un infinitif."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-014-b', chapterId: 'g9fr-formation-mots', subsection: 'formation_adjectif', difficulty: 3,
    question: FM + "« Un sol <b>(pierre)</b> retient mal l'eau. » Écris l'<b>adjectif</b> formé sur le nom entre parenthèses.",
    answer: 'pierreux',
    hint: "Le suffixe cherché sert à dire « plein de » : on le retrouve dans « boueux » et « sableux ».",
    explanation: "L'adjectif formé sur « pierre » est <b>pierreux</b>, avec le suffixe -eux qui signifie « plein de », comme dans « boueux ». L'erreur est de fabriquer un participe (« pierré ») ou de laisser le nom tel quel, « un sol pierre », qui n'est pas français. Le mot manquant suit le nom « sol » et le qualifie : ce ne peut être qu'un adjectif."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-014-c', chapterId: 'g9fr-formation-mots', subsection: 'formation_adverbe', difficulty: 3,
    question: FM + "« Le potager a <b>(heureux)</b> résisté au cyclone. » Écris l'<b>adverbe</b> formé sur l'adjectif entre parenthèses.",
    answer: 'heureusement',
    hint: "Un adverbe en -ment se construit sur le féminin de l'adjectif, pas sur le masculin.",
    explanation: "On part du féminin « heureuse », auquel on ajoute -ment : <b>heureusement</b>. L'erreur la plus fréquente est de coller le suffixe sur le masculin et d'écrire « heureuxment », qui est impossible à prononcer. La même règle donne « doucement » (douce), « vivement » (vive) : cherche toujours le féminin d'abord."
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-014-d', chapterId: 'g9fr-formation-mots', subsection: 'formation_verbe', difficulty: 4,
    question: FM + "« Le <b>(jardin)</b> du collège s'occupe du potager et il <b>(large)</b> les allées chaque année. » Écris les <b>deux</b> mots dérivés, séparés par une virgule : d'abord le nom de personne formé sur « jardin », puis le verbe formé sur « large », conjugué comme dans la phrase.",
    answer: 'jardinier, élargit',
    alsoAccept: ['jardinier élargit', 'jardinier,élargit', 'jardinier et élargit'],
    hint: "Le premier mot désigne quelqu'un ; le second doit être conjugué à la 3e personne du singulier.",
    explanation: "Sur « jardin » on forme le nom de personne <b>jardinier</b> (suffixe -ier, comme « cuisinier ») ; sur « large » on forme le verbe « élargir », conjugué ici <b>élargit</b> puisque le sujet est « il ». Deux erreurs se combinent souvent : écrire « jardinage », qui nomme l'activité et non la personne, et laisser le verbe à l'infinitif au lieu de l'accorder au sujet de la phrase."
  }));

  // ── Œuvre au programme : construire et appuyer une réponse longue ──────────

  const OE = "« Le Papa de Simon », nouvelle de Guy de Maupassant.<br><br>";

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-fam-015-a', chapterId: 'g9fr-oeuvres', subsection: 'question_longue', difficulty: 2,
    question: OE + "Une réponse longue doit s'appuyer sur des faits précis de la nouvelle. Quel est le métier de Philippe Remy, l'homme qui ramène Simon chez sa mère ? Écris-le en un seul mot.",
    answer: 'forgeron', alsoAccept: ['un forgeron', 'le forgeron'],
    hint: "Il travaille le métal dans un atelier, entouré de ses compagnons.",
    explanation: "Philippe Remy est <b>forgeron</b> : c'est à la forge, devant ses compagnons, qu'il annonce sa décision. L'erreur fréquente est de répondre « ouvrier », qui est vrai mais trop vague pour une réponse longue, ou de confondre son métier avec celui du maître d'école. Dans une question sur l'œuvre, le mot exact vaut mieux qu'un mot général."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-015-b', chapterId: 'g9fr-oeuvres', subsection: 'question_longue', difficulty: 3,
    question: OE + "La question longue demande : « Pourquoi Philippe accepte-t-il de devenir le père de Simon ? » Un élève commence par : « Philippe est un homme fort. » Que doit-il faire ensuite pour que sa réponse tienne ?",
    options: [
      "Donner sa raison, puis un fait du récit qui l'appuie",
      "Résumer toute la nouvelle, du début jusqu'à la fin",
      "Donner le nom de l'auteur et la date de publication",
      "Dire ce qu'il a ressenti en lisant cette nouvelle"
    ],
    answer: "Donner sa raison, puis un fait du récit qui l'appuie",
    hint: "Relis la question : elle commence par « pourquoi ». Qu'attend-on d'une réponse à un « pourquoi » ?",
    explanation: "Une question en « pourquoi » attend une <b>raison</b>, suivie d'une <b>preuve</b> tirée du récit. Décrire le personnage, résumer l'histoire ou raconter ses impressions de lecture sont trois manières de remplir des lignes sans répondre. C'est l'erreur la plus coûteuse à cette question : la copie est longue et ne vaut presque rien, faute d'avoir répondu à ce qui était demandé."
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-fam-015-c', chapterId: 'g9fr-oeuvres', subsection: 'question_longue', difficulty: 4,
    question: OE + "Un élève soutient : « Philippe devient le père de Simon d'abord par pitié, puis par attachement. » Quel élément du récit soutient le mieux la <b>seconde</b> partie de cette affirmation ?",
    options: [
      "Il demande à la Blanchotte de devenir sa femme",
      "Il ramène Simon chez sa mère après la rivière",
      "Simon est moqué par ses camarades à l'école",
      "Simon dit à ses camarades qu'il a un papa"
    ],
    answer: "Il demande à la Blanchotte de devenir sa femme",
    hint: "La pitié dure un après-midi ; l'attachement engage la suite d'une vie.",
    explanation: "Le mariage est un engagement durable : il prouve un <b>attachement</b>, alors que ramener l'enfant au bord de la rivière prouve seulement la <b>pitié</b> du premier moment, c'est-à-dire la première partie de l'affirmation. L'erreur est de choisir une preuve juste mais qui appuie l'autre moitié de la phrase, ou un détail de contexte comme les moqueries. Une affirmation en deux temps demande une preuve par temps."
  }));

})();
