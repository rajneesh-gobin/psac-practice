'use strict';
(function () {

  // Lot « approfondissement 2 » — g9fr-vocabulaire, g9fr-doc-authentique et
  // g9fr-ecrit-guide, niveau 4 (« Analyse de texte » dans ce pack).
  //
  // Le niveau 4 ici n'est pas « plus difficile » : c'est un contexte où l'élève
  // doit raisonner plutôt que restituer. En vocabulaire, c'est le mot juste en
  // situation ; en document authentique, c'est l'inférence à partir d'un vrai
  // document ; en écrit guidé, c'est le jugement porté sur un brouillon.
  //
  // Les documents ci-dessous sont écrits pour cette banque : aucun logo, aucune
  // capture d'écran, rien qu'un peu de HTML. Chaque question réimprime son
  // document en entier — un élève peut rencontrer n'importe laquelle en premier,
  // en pratique mixte ou en examen.

  const CELL = " style='border:1px solid #94a3b8;padding:4px 8px;text-align:left'";
  const BOX  = " style='border:1px solid #94a3b8;border-radius:8px;padding:10px;margin:6px 0'";

  // ══════════════════════════════════════════════════════════════════════
  //  g9fr-vocabulaire — le mot juste en contexte (001-020)
  // ══════════════════════════════════════════════════════════════════════

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-001', chapterId: 'g9fr-vocabulaire', subsection: 'traits_caractere', difficulty: 4,
    question: "Le proviseur écrit dans le rapport annuel : « Priya a présenté le même projet de club de lecture trois années de suite. Deux fois on le lui a refusé ; la troisième, elle l'a obtenu. » Il cherche un mot qui garde la valeur d'un compliment. Lequel convient ?",
    options: ["tenace", "têtue", "docile", "susceptible"],
    answer: "tenace",
    hint: "Deux de ces mots décrivent quelqu'un qui ne lâche pas ; un seul le dit en bien.",
    explanation: "« Tenace » et « têtue » nomment la même obstination, mais pas avec le même regard : <b>tenace</b> salue un effort qui a fini par payer, têtue reproche un refus d'écouter. Un rapport qui félicite exige donc tenace. « Docile » dirait le contraire, et « susceptible » parle de la sensibilité, pas de la persévérance.",
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-ap2-002', chapterId: 'g9fr-vocabulaire', subsection: 'traits_caractere', difficulty: 4,
    question: "Deux mots sont possibles : <b>économe</b> ou <b>avare</b>.<br><br><em>Monsieur Baboolall note chaque dépense dans un cahier, achète ses légumes en fin de marché et n'a jamais rien emprunté à personne. Il paie pourtant la cotisation du club pour deux voisins qui n'en ont pas les moyens.</em><br><br>Écris le mot qui convient à cet homme.",
    answer: "économe", alsoAccept: ["un homme économe", "il est économe", "econome"],
    hint: "Regarde la dernière phrase : elle dit ce que cet homme fait de son argent quand un autre en manque.",
    explanation: "<b>Économe</b> veut dire qu'on dépense avec mesure ; <b>avare</b> qu'on refuse de donner. Les trois premiers détails conviendraient aux deux mots — c'est la cotisation payée pour les voisins qui tranche, car un avare ne l'aurait jamais payée. Devant deux mots proches, cherche le détail qui sépare leurs deux sens.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-003', chapterId: 'g9fr-vocabulaire', subsection: 'traits_caractere', difficulty: 4,
    question: "Dans son discours de fin d'année, la directrice veut dire que Sanjay accepte les remarques sans jamais se vexer. Quel mot est le mot juste ?",
    options: ["humble", "effacé", "indécis", "servile"],
    answer: "humble",
    hint: "Cherche le mot qui porte sur l'accueil fait à une remarque, et non sur la discrétion ou sur les décisions.",
    explanation: "<b>Humble</b> dit qu'on ne se croit pas au-dessus des remarques : c'est exactement ce que décrit la directrice. « Effacé » parle de quelqu'un qu'on ne remarque pas, ce qui est autre chose ; « indécis » porte sur les décisions ; « servile » dirait qu'il obéit bassement, et deviendrait une critique.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-004', chapterId: 'g9fr-vocabulaire', subsection: 'verbes_action', difficulty: 4,
    question: "Compte rendu d'une cérémonie à Port-Louis : « Le drapeau ___ lentement jusqu'en haut du mât pendant que l'hymne était joué. » Quel verbe est le mot juste ?",
    options: ["se hissait", "grimpait", "grandissait", "s'écroulait"],
    answer: "se hissait",
    hint: "Un seul de ces verbes s'emploie couramment pour un drapeau et un mât.",
    explanation: "On <b>hisse</b> un drapeau : le verbe dit qu'on le fait monter au bout d'une corde, et c'est le mot exact de la cérémonie. « Grimper » suppose quelqu'un ou quelque chose qui s'agrippe, « grandir » parle de la taille et non du déplacement, et « s'écrouler » dit l'inverse d'une montée.",
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-ap2-005', chapterId: 'g9fr-vocabulaire', subsection: 'verbes_action', difficulty: 4,
    question: "Deux verbes sont possibles : <b>apercevoir</b> ou <b>observer</b>.<br><br><em>Le gardien de nuit de l'usine de Phoenix a vu une silhouette près de la barrière pendant moins d'une seconde, avant que la pluie ne cache tout.</em><br><br>Écris à l'infinitif le verbe qui convient pour raconter ce qu'il a fait.",
    answer: "apercevoir", alsoAccept: ["l'apercevoir", "apercevoir quelqu'un", "apercevoir une silhouette"],
    hint: "Regarde combien de temps la scène a duré : l'un des deux verbes réclame de la durée.",
    explanation: "<b>Apercevoir</b>, c'est voir un instant, souvent par hasard ; <b>observer</b>, c'est regarder avec attention et pendant un certain temps. Moins d'une seconde, puis une silhouette aussitôt cachée : seul apercevoir convient. Deux verbes proches cessent d'être interchangeables dès qu'on regarde la durée et l'intention.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-006', chapterId: 'g9fr-vocabulaire', subsection: 'verbes_action', difficulty: 4,
    question: "Après la pétition des habitants, le conseil de village a pris une décision qui efface celle du mois dernier : cette dernière ne s'applique plus du tout. Quel verbe dit exactement cela ?",
    options: ["annuler", "reporter", "modifier", "contester"],
    answer: "annuler",
    hint: "Demande-toi si la décision existe encore, si elle a seulement changé de date, ou si elle a seulement été discutée.",
    explanation: "<b>Annuler</b>, c'est faire qu'une décision n'existe plus. « Reporter » la garderait en la décalant dans le temps, « modifier » la garderait en la changeant, et « contester » dirait seulement qu'on la discute, sans qu'elle disparaisse. Le texte dit « ne s'applique plus du tout » : un seul verbe va aussi loin.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-007', chapterId: 'g9fr-vocabulaire', subsection: 'noms_concrets', difficulty: 4,
    question: "À Mahébourg, les pêcheurs amarrent leurs pirogues le long d'une plateforme de bois posée sur pilotis, qui avance de quelques mètres dans le lagon. Quel nom désigne exactement cette construction ?",
    options: ["un ponton", "un quai", "une digue", "une écluse"],
    answer: "un ponton",
    hint: "Deux de ces mots désignent une maçonnerie lourde, et un autre un ouvrage qui fait monter ou descendre l'eau.",
    explanation: "Un <b>ponton</b> est une plateforme légère, souvent en bois et sur pilotis, où l'on accoste. Un quai est un ouvrage maçonné qui borde un port, une digue protège la côte des vagues, et une écluse fait passer un bateau d'un niveau d'eau à un autre. Le mot juste se choisit sur la matière et sur la fonction.",
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-ap2-008', chapterId: 'g9fr-vocabulaire', subsection: 'noms_concrets', difficulty: 4,
    question: "Deux noms sont possibles : <b>un ruisseau</b> ou <b>un torrent</b>.<br><br><em>Après trois jours de pluie sur les hauteurs, le petit cours d'eau qui passe derrière l'école de Curepipe roulait des pierres, arrachait des branches et débordait sur la route.</em><br><br>Écris le nom qui convient à ce cours d'eau ce jour-là.",
    answer: "un torrent", alsoAccept: ["torrent", "le torrent", "c'est un torrent"],
    hint: "Regarde ce que l'eau emporte : l'un des deux noms suppose de la force.",
    explanation: "Un <b>torrent</b> est un cours d'eau rapide et violent, capable de rouler des pierres ; un <b>ruisseau</b> est petit et paisible. Le même filet d'eau peut être un ruisseau un jour et un torrent après l'orage : c'est la situation décrite, et non la taille habituelle, qui commande le mot.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-009', chapterId: 'g9fr-vocabulaire', subsection: 'noms_concrets', difficulty: 4,
    question: "Madame Sewsurn doit prouver devant un notaire qu'un terrain de Flacq lui appartient bien. Quel document doit-elle présenter ?",
    options: ["un titre de propriété", "un devis de maçonnerie", "un reçu de paiement", "un bail de location"],
    answer: "un titre de propriété",
    hint: "Trois de ces documents prouvent une dépense, un projet de travaux ou un droit d'occuper — aucun ne prouve un droit de posséder.",
    explanation: "Le <b>titre de propriété</b> est le seul document qui établit à qui appartient un bien. Un reçu prouve qu'une somme a été payée, un devis annonce le prix de travaux à venir, et un bail dit seulement qu'on a le droit d'occuper le terrain d'un autre. Payer, occuper et posséder sont trois choses différentes.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-010', chapterId: 'g9fr-vocabulaire', subsection: 'adjectifs_qualificatifs', difficulty: 4,
    question: "Après l'incendie du dépôt de Pailles, la direction a publié un communiqué de quatre lignes : des faits, des dates, aucune explication et aucun commentaire. Quel adjectif qualifie le mieux ce communiqué ?",
    options: ["laconique", "élogieux", "chaleureux", "approximatif"],
    answer: "laconique",
    hint: "Cherche l'adjectif qui parle de la brièveté du texte, et non de son ton ni de son exactitude.",
    explanation: "<b>Laconique</b> qualifie ce qui est dit en très peu de mots. « Élogieux » et « chaleureux » décrivent un ton, que ce communiqué n'a pas ; « approximatif » dirait que les informations sont imprécises, alors que le texte donne des faits et des dates. Être court n'est pas être vague.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-011', chapterId: 'g9fr-vocabulaire', subsection: 'adjectifs_qualificatifs', difficulty: 4,
    question: "« Pendant la lecture des résultats, personne n'osait bouger ni même respirer trop fort. » Quel adjectif qualifie exactement le silence de cette salle ?",
    options: ["pesant", "paisible", "sonore", "distrait"],
    answer: "pesant",
    hint: "Un silence peut soulager ou étouffer : demande-toi lequel des deux est décrit ici.",
    explanation: "Un silence <b>pesant</b> est un silence lourd, chargé de tension — c'est bien ce que disent des gens qui n'osent plus bouger. « Paisible » décrirait un silence agréable, donc le contraire ; « sonore » se contredit lui-même ; « distrait » qualifie une personne et non un silence.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-012', chapterId: 'g9fr-vocabulaire', subsection: 'adjectifs_qualificatifs', difficulty: 4,
    question: "Un journaliste écrit : « Le nouveau stade a une capacité conséquente. » Que faut-il penser de l'adjectif employé ?",
    options: [
      "Il est mal employé : conséquent ne veut pas dire important",
      "Il est bien employé : conséquent est le mot exact ici",
      "Il est bien trop familier pour un article de presse",
      "Il est mal accordé avec le nom qui le précède",
    ],
    answer: "Il est mal employé : conséquent ne veut pas dire important",
    hint: "Cherche d'abord de quel nom cet adjectif est formé.",
    explanation: "« Conséquent » est formé sur « conséquence » : il qualifie ce qui suit logiquement, comme dans « un raisonnement conséquent ». L'employer pour dire « important » ou « grand » est un emploi fautif, très répandu ; il faudrait écrire « une capacité importante ». L'accord, lui, est correct : l'erreur porte sur le sens, pas sur la forme.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-013', chapterId: 'g9fr-vocabulaire', subsection: 'adjectifs_qualificatifs', difficulty: 4,
    question: "Le rapport d'un expert décrit un bâtiment de Port-Louis dont les murs sont fissurés, les poutres rongées et la toiture prête à céder. Quel adjectif est le mot juste ?",
    options: ["vétuste", "ancien", "spacieux", "pittoresque"],
    answer: "vétuste",
    hint: "L'âge d'un bâtiment et son état ne sont pas la même chose.",
    explanation: "<b>Vétuste</b> dit qu'un bâtiment est dégradé par le temps, au point d'en devenir dangereux : c'est exactement ce que décrit l'expert. « Ancien » ne dit que l'âge, et une maison ancienne peut être en parfait état ; « spacieux » parle de la surface et « pittoresque » du charme. Un rapport d'expert nomme l'état, pas le charme.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-014', chapterId: 'g9fr-vocabulaire', subsection: 'adverbes', difficulty: 4,
    question: "La compagnie annonce que la ligne d'autobus 198 n'a pas eu une seule minute de retard de toute l'année. Quel adverbe dit exactement cela ?",
    options: ["ponctuellement", "rarement", "brusquement", "éventuellement"],
    answer: "ponctuellement",
    hint: "Un seul de ces adverbes porte sur le respect de l'heure annoncée.",
    explanation: "<b>Ponctuellement</b> veut dire « à l'heure exacte », ce que confirme « pas une seule minute de retard ». « Rarement » compte les fois, « brusquement » décrit la manière, et « éventuellement » signifie « peut-être », ce qui ne dit rien de l'heure. En français, éventuellement ne veut jamais dire « pour finir ».",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-015', chapterId: 'g9fr-vocabulaire', subsection: 'adverbes', difficulty: 4,
    question: "Dans un courriel de travail, un collègue écrit : « Je passerai éventuellement lundi au bureau. » Comment faut-il comprendre cette phrase ?",
    options: ["Il viendra peut-être lundi", "Il viendra sûrement lundi", "Il viendra très tôt lundi", "Il viendra rarement le lundi"],
    answer: "Il viendra peut-être lundi",
    hint: "Cet adverbe est un faux ami de l'anglais : compare-le à « eventually ».",
    explanation: "En français, « éventuellement » signifie <b>peut-être, si l'occasion se présente</b> : il annonce une possibilité, jamais une certitude. L'anglais « eventually », qui veut dire « pour finir », est à l'origine de l'erreur. Le collègue ne promet donc rien, et lui répondre « d'accord, à lundi » serait l'avoir mal compris.",
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-ap2-016', chapterId: 'g9fr-vocabulaire', subsection: 'adverbes', difficulty: 4,
    question: "Un seul de ces deux mots convient : <b>davantage</b> ou <b>plutôt</b>.<br><br><em>Grâce aux nouvelles plantations de Rivière-du-Rempart, la coopérative a récolté ___ de litchis cette année que l'an dernier.</em><br><br>Écris le mot qui complète la phrase.",
    answer: "davantage", alsoAccept: ["davantage de", "davantage de litchis"],
    hint: "Remplace le blanc par « plus » : lequel des deux mots joue le même rôle ?",
    explanation: "<b>Davantage</b> est l'équivalent de « plus » dans une comparaison de quantité : on récolte davantage de litchis. <b>Plutôt</b> exprime une préférence ou une correction — « il est plutôt grand », « allons plutôt à la plage » — et ne peut pas introduire une quantité comparée. Deux adverbes proches par le son n'ont pas la même fonction.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-017', chapterId: 'g9fr-vocabulaire', subsection: 'adverbes', difficulty: 4,
    question: "Rajesh s'est retourné pour attraper son sac et a renversé le vase du couloir sans l'avoir voulu. Comment le rapport de l'école doit-il décrire son geste ?",
    options: ["involontairement", "méthodiquement", "ouvertement", "régulièrement"],
    answer: "involontairement",
    hint: "Regarde ce qui manque à ce geste : l'intention, la méthode, le secret ou la répétition ?",
    explanation: "<b>Involontairement</b> dit que le geste n'a pas été voulu, ce qu'établit « sans l'avoir voulu ». « Méthodiquement » parlerait d'une manière organisée, « ouvertement » du fait de ne rien cacher, « régulièrement » d'une habitude. Un rapport qui se trompe d'adverbe transforme un accident en faute.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-018', chapterId: 'g9fr-vocabulaire', subsection: 'adverbes', difficulty: 4,
    question: "Le règlement du collège précise que le portail est fermé à 7 h 45 « sans exception ». Quel adverbe remplace le mieux ces deux mots dans une phrase ?",
    options: ["systématiquement", "occasionnellement", "approximativement", "provisoirement"],
    answer: "systématiquement",
    hint: "Demande-toi si la règle souffre des exceptions, si elle est approchée, ou si elle va bientôt changer.",
    explanation: "<b>Systématiquement</b> veut dire « chaque fois, sans exception » : c'est la reprise exacte de la formule du règlement. « Occasionnellement » dirait le contraire, « approximativement » porterait sur l'heure et non sur la règle, et « provisoirement » annoncerait un changement prochain que le règlement ne prévoit pas.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-019', chapterId: 'g9fr-vocabulaire', subsection: 'notions_abstraites', difficulty: 4,
    question: "La mairie de Beau-Bassin publie désormais en ligne tous ses contrats et le détail de ses dépenses, alors que personne ne le lui avait demandé. Quelle notion cette décision met-elle en pratique ?",
    options: ["la transparence", "la prudence", "la tolérance", "la générosité"],
    answer: "la transparence",
    hint: "Demande-toi ce que la mairie rend possible pour les habitants : voir, se protéger, supporter ou donner ?",
    explanation: "La <b>transparence</b> est le fait de rendre visible ce qui pourrait rester caché, et publier ses contrats en est l'exemple même. « Prudence » désignerait une précaution contre un risque, « tolérance » l'acceptation d'opinions différentes, et « générosité » un don. Nommer une notion abstraite, c'est retrouver l'idée derrière l'acte.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-020', chapterId: 'g9fr-vocabulaire', subsection: 'notions_abstraites', difficulty: 4,
    question: "À un concours, les candidats malvoyants disposent d'un tiers de temps en plus. Ils n'ont donc pas le même temps que les autres, mais la même chance de réussir. Quelle notion ce choix respecte-t-il ?",
    options: ["l'équité", "l'égalité", "l'unanimité", "la gratuité"],
    answer: "l'équité",
    hint: "Traiter tout le monde de façon identique et donner à chacun les mêmes chances ne sont pas la même idée.",
    explanation: "L'<b>équité</b> consiste à adapter les moyens pour que chacun ait la même chance ; l'<b>égalité</b> consisterait à donner exactement le même temps à tous, ce que le texte dit justement ne pas faire. « Unanimité » parle d'un accord de tous et « gratuité » de l'absence de paiement. Ce sont les deux premières notions qu'il faut savoir distinguer.",
  }));

  // ══════════════════════════════════════════════════════════════════════
  //  g9fr-doc-authentique — de vrais documents, et des inférences (021-040)
  // ══════════════════════════════════════════════════════════════════════

  const COURRIEL_SORTIE =
    "<div" + BOX + ">" +
    "<b>De :</b> secretariat@collegemontagneblanche.mu<br>" +
    "<b>À :</b> parents-grade9@collegemontagneblanche.mu<br>" +
    "<b>Cc :</b> m.appadoo@collegemontagneblanche.mu (professeur responsable)<br>" +
    "<b>Objet :</b> Sortie au Jardin de Pamplemousses — coupon à retourner avant le 12 mai" +
    "<hr>" +
    "Madame, Monsieur,<br><br>" +
    "La sortie du Grade 9 au Jardin de Pamplemousses aura lieu le <b>vendredi 23 mai</b>. " +
    "Le car quittera le collège à 7 h 30 et sera de retour à 15 h 00.<br><br>" +
    "La participation est de <b>250 roupies par élève</b> ; elle couvre le transport et le droit d'entrée. " +
    "Le repas de midi n'est pas fourni.<br><br>" +
    "Merci de signer le coupon joint et de le remettre au secrétariat <b>avant le 12 mai</b>. " +
    "Sans ce coupon, l'élève restera au collège ce jour-là.<br><br>" +
    "Le secrétariat</div>";
  const LIRE_COURRIEL = "Lis ce courriel, puis réponds à la question.<br>" + COURRIEL_SORTIE + "<br>";

  const HORAIRE_BUS =
    "<table style='border-collapse:collapse;margin:6px 0'>" +
    "<caption style='text-align:left;padding-bottom:4px'><b>Ligne 198 — Curepipe vers Port-Louis</b></caption>" +
    "<tr><th" + CELL + ">Départ Curepipe</th><th" + CELL + ">Arrivée Port-Louis</th><th" + CELL + ">Jours de circulation</th></tr>" +
    "<tr><td" + CELL + ">05 h 45 *</td><td" + CELL + ">06 h 50</td><td" + CELL + ">Du lundi au vendredi</td></tr>" +
    "<tr><td" + CELL + ">07 h 10</td><td" + CELL + ">08 h 30</td><td" + CELL + ">Du lundi au samedi</td></tr>" +
    "<tr><td" + CELL + ">12 h 00</td><td" + CELL + ">13 h 05</td><td" + CELL + ">Tous les jours</td></tr>" +
    "<tr><td" + CELL + ">17 h 30 *</td><td" + CELL + ">18 h 55</td><td" + CELL + ">Du lundi au vendredi</td></tr>" +
    "</table><em>* Ne circule pas les jours fériés.</em>";
  const LIRE_HORAIRE = "Lis cet horaire, puis réponds à la question.<br>" + HORAIRE_BUS + "<br><br>";

  const ANNONCE_EMPLOI =
    "<div" + BOX + ">" +
    "<b>OFFRE D'EMPLOI — Aide-pâtissier(ère)</b><br>Boulangerie Sunrise, Quatre-Bornes<br><br>" +
    "• Du mardi au samedi, de 5 h 00 à 11 h 00<br>" +
    "• Expérience <b>non exigée</b> : formation assurée sur place<br>" +
    "• Permis de conduire un scooter <b>souhaité</b> pour les livraisons du matin<br>" +
    "• Salaire : 9 500 roupies par mois, repas du matin compris<br><br>" +
    "Envoyer une courte lettre de motivation à sunrise.qb@intnet.mu <b>avant le 30 juin</b>. " +
    "Ne pas se présenter sans rendez-vous.</div>";
  const LIRE_ANNONCE = "Lis cette annonce, puis réponds à la question.<br>" + ANNONCE_EMPLOI + "<br>";

  const FACTURE =
    "<div" + BOX + "><b>Quincaillerie Ramjuttun — Rose-Hill</b><br>Facture n° 4187 — 12 mars<br>" +
    "<table style='border-collapse:collapse;margin:6px 0'>" +
    "<tr><th" + CELL + ">Article</th><th" + CELL + ">Quantité</th><th" + CELL + ">Prix unitaire</th><th" + CELL + ">Montant</th></tr>" +
    "<tr><td" + CELL + ">Sac de ciment 25 kg</td><td" + CELL + ">2</td><td" + CELL + ">320 Rs</td><td" + CELL + ">640 Rs</td></tr>" +
    "<tr><td" + CELL + ">Rouleau de grillage 10 m</td><td" + CELL + ">1</td><td" + CELL + ">1 250 Rs</td><td" + CELL + ">1 250 Rs</td></tr>" +
    "<tr><td" + CELL + ">Livraison à domicile</td><td" + CELL + ">1</td><td" + CELL + ">—</td><td" + CELL + ">offerte</td></tr>" +
    "<tr><td" + CELL + "><b>Total à payer</b></td><td" + CELL + "></td><td" + CELL + "></td><td" + CELL + "><b>1 890 Rs</b></td></tr>" +
    "</table>" +
    "<em>Les travaux de pose ne sont pas compris dans ce total. Facture payable sous 30 jours ; passé ce délai, majoration de 2 %.</em></div>";
  const LIRE_FACTURE = "Lis cette facture, puis réponds à la question.<br>" + FACTURE + "<br>";

  const RECLAMATION =
    "<div" + BOX + ">" +
    "<b>De :</b> j.ramsamy@intnet.mu<br>" +
    "<b>À :</b> service.clients@electroplus.mu<br>" +
    "<b>Objet :</b> Ventilateur livré en panne — commande n° 7742 du 3 août" +
    "<hr>" +
    "Madame, Monsieur,<br><br>" +
    "J'ai reçu le 3 août le ventilateur commandé sur votre site. Il ne fonctionne pas : le moteur tourne, mais les pales restent immobiles.<br><br>" +
    "Je joins la photo de l'étiquette et la copie de la facture. Je souhaite <b>un échange, et non un avoir</b>, car j'ai besoin de l'appareil avant la saison chaude.<br><br>" +
    "Je vous remercie de me répondre avant la fin de la semaine.<br><br>" +
    "Jaycee Ramsamy</div>";
  const LIRE_RECLAMATION = "Lis ce courriel, puis réponds à la question.<br>" + RECLAMATION + "<br>";

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-021', chapterId: 'g9fr-doc-authentique', subsection: 'courriel', difficulty: 4,
    question: LIRE_COURRIEL + "Le message est adressé aux parents, et le professeur responsable n'est qu'en copie. Qu'est-ce que ce choix indique ?",
    options: [
      "La réponse attendue vient des parents, pas du professeur",
      "Le professeur n'avait pas encore été informé de la sortie",
      "Les parents doivent écrire directement au professeur Appadoo",
      "Le professeur est le destinataire principal de ce message",
    ],
    answer: "La réponse attendue vient des parents, pas du professeur",
    hint: "Compare le champ « À : » et le champ « Cc : » : l'un attend une action, l'autre informe seulement.",
    explanation: "Le champ « À : » désigne celui de qui on attend quelque chose — ici la signature du coupon, que seul un parent peut donner. Le « Cc : » met le professeur au courant sans rien lui demander. C'est pourquoi lire le seul corps du message ne suffit pas : l'en-tête dit déjà qui doit agir.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-022', chapterId: 'g9fr-doc-authentique', subsection: 'courriel', difficulty: 4,
    question: LIRE_COURRIEL + "Le courriel ne demande nulle part aux élèves d'emporter leur repas. Qu'est-ce qui permet pourtant de le déduire ?",
    options: [
      "Le retour est fixé à 15 h 00 et le repas n'est pas fourni",
      "La participation de 250 roupies couvre l'entrée du jardin",
      "Le coupon doit être remis au secrétariat avant le 12 mai",
      "Le car quitte le collège à 7 h 30, avant le petit-déjeuner",
    ],
    answer: "Le retour est fixé à 15 h 00 et le repas n'est pas fourni",
    hint: "Rapproche l'heure du retour d'une phrase du deuxième paragraphe.",
    explanation: "Deux informations, prises ensemble, donnent la réponse : le groupe ne rentre qu'à 15 h 00, donc les élèves déjeuneront dehors, et « le repas de midi n'est pas fourni ». Aucune des deux ne suffit seule. Déduire, c'est relier deux endroits du document, pas recopier la phrase la plus proche de la question.",
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-ap2-023', chapterId: 'g9fr-doc-authentique', subsection: 'courriel', difficulty: 4,
    question: LIRE_COURRIEL + "Madame Mungur a deux enfants inscrits en Grade 9 dans ce collège. D'après le courriel, quelle somme devra-t-elle verser en tout ? Écris seulement le nombre.",
    answer: "500", alsoAccept: ["500 roupies", "Rs 500", "500 Rs", "cinq cents", "cinq cents roupies"],
    hint: "Le courriel donne un prix par élève, et non un prix par famille.",
    explanation: "Le courriel écrit « 250 roupies <b>par élève</b> » : pour deux enfants, il faut donc 2 × 250 = <b>500</b> roupies. L'erreur courante est de recopier le nombre tel qu'il apparaît, 250, sans lire l'unité qui le suit. Dans un document authentique, le mot qui accompagne un chiffre compte autant que le chiffre lui-même.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-024', chapterId: 'g9fr-doc-authentique', subsection: 'courriel', difficulty: 4,
    question: LIRE_COURRIEL + "Le message est signé « Le secrétariat », sans nom de personne. Qu'est-ce que cette signature apprend au lecteur ?",
    options: [
      "Le message engage le collège, non une personne précise",
      "L'expéditeur a oublié de signer ce courriel de service",
      "Le message part sans l'accord de la direction du collège",
      "Le collège cache le nom des personnes qui y travaillent",
    ],
    answer: "Le message engage le collège, non une personne précise",
    hint: "Demande-toi si une sortie scolaire est décidée par une personne ou par l'établissement.",
    explanation: "Signer d'une fonction — « Le secrétariat », « La direction » — indique que le message vient de l'institution et vaut pour elle, quel que soit l'employé qui l'a tapé. Ce n'est ni un oubli ni une cachotterie : c'est l'usage des messages de service, et c'est ce qui donne au courriel sa valeur officielle.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-025', chapterId: 'g9fr-doc-authentique', subsection: 'fiche_infographie', difficulty: 4,
    question: LIRE_HORAIRE + "Un voyageur cherche combien coûte le billet. Que doit-il conclure en lisant cette fiche ?",
    options: [
      "La fiche ne donne aucun prix : il faut le demander",
      "Le prix est le même pour les quatre départs indiqués",
      "Le prix dépend du jour, comme la circulation",
      "Le prix est caché dans la note en bas du tableau",
    ],
    answer: "La fiche ne donne aucun prix : il faut le demander",
    hint: "Passe en revue les trois colonnes et la note : quelle sorte d'information n'apparaît nulle part ?",
    explanation: "Le tableau donne des heures et des jours, et la note parle des jours fériés. Le prix n'est écrit nulle part, et une information absente ne se devine pas : il faut la chercher au guichet ou auprès de la compagnie. Savoir dire ce qu'un document <b>ne</b> dit <b>pas</b> est aussi utile que savoir y lire.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-026', chapterId: 'g9fr-doc-authentique', subsection: 'fiche_infographie', difficulty: 4,
    question: LIRE_HORAIRE + "L'astérisque ne figure que sur deux départs. Qu'ont en commun ces deux départs, et eux seuls ?",
    options: [
      "Seuls ces deux-là sont supprimés les jours fériés",
      "Seuls ces deux-là partent avant huit heures du matin",
      "Seuls ces deux-là mettent plus d'une heure de trajet",
      "Seuls ces deux-là circulent aussi pendant le week-end",
    ],
    answer: "Seuls ces deux-là sont supprimés les jours fériés",
    hint: "Lis la note du bas, puis vérifie chacune des autres explications sur le tableau lui-même.",
    explanation: "L'astérisque renvoie à la note : ces deux départs ne circulent pas les jours fériés. Les autres explications tombent dès qu'on vérifie — le départ de 7 h 10 est lui aussi matinal et dure plus d'une heure, et aucun des deux départs marqués ne roule le week-end. Dans une fiche, un signe n'a que le sens que lui donne sa légende.",
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-ap2-027', chapterId: 'g9fr-doc-authentique', subsection: 'fiche_infographie', difficulty: 4,
    question: LIRE_HORAIRE + "Le 1<sup>er</sup> mai, jour férié, tombe un jeudi. Combien de départs de Curepipe restent-ils ce jour-là ? Écris seulement le nombre.",
    answer: "2", alsoAccept: ["deux", "2 départs", "deux départs"],
    hint: "Vérifie d'abord quels départs circulent un jeudi, puis applique la note du bas.",
    explanation: "Un jeudi ordinaire, les quatre départs circulent. Mais le 1<sup>er</sup> mai est férié : les deux départs marqués d'un astérisque, celui de 5 h 45 et celui de 17 h 30, sont supprimés. Il reste donc <b>2</b> départs, à 7 h 10 et à 12 h 00. Il faut croiser la colonne des jours et la note : l'une ne suffit pas.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-028', chapterId: 'g9fr-doc-authentique', subsection: 'reperage_explicite', difficulty: 4,
    question: LIRE_COURRIEL + "Monsieur Bhugaloo remet le coupon signé au secrétariat le 12 mai au matin. D'après la lettre du courriel, est-il dans les temps ?",
    options: [
      "Non, « avant le 12 mai » s'arrête le 11 au soir",
      "Oui, « avant le 12 mai » inclut la journée du 12",
      "Oui, puisque la sortie n'a lieu que le 23 mai",
      "Non, le coupon devait être posté et non remis",
    ],
    answer: "Non, « avant le 12 mai » s'arrête le 11 au soir",
    hint: "Regarde le mot placé juste devant la date, et demande-toi s'il inclut ce jour-là.",
    explanation: "« Avant le 12 mai » signifie que le 12 est déjà trop tard : le dernier jour utile est le 11. L'information est explicite, mais elle tient dans une préposition et non dans un chiffre. Que la sortie soit le 23 n'y change rien : le courriel donne deux dates, et chacune a son rôle.",
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-ap2-029', chapterId: 'g9fr-doc-authentique', subsection: 'reperage_explicite', difficulty: 4,
    question: LIRE_HORAIRE + "Kavi doit arriver à Port-Louis avant 9 h un samedi. Quel départ de Curepipe doit-il prendre ? Écris l'heure telle qu'elle est écrite dans le tableau.",
    answer: "07 h 10", alsoAccept: ["7 h 10", "7h10", "07h10", "7:10", "07:10", "sept heures dix"],
    hint: "Vérifie d'abord la colonne des jours, puis l'heure d'arrivée.",
    explanation: "Le départ de 5 h 45 arriverait à temps, mais il ne circule que du lundi au vendredi : un samedi, il n'existe pas. Celui de <b>07 h 10</b> circule du lundi au samedi et arrive à 8 h 30, donc avant 9 h ; celui de 12 h 00 est bien trop tard. Une heure ne se relève jamais sans la colonne qui dit quels jours elle vaut.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-030', chapterId: 'g9fr-doc-authentique', subsection: 'reperage_explicite', difficulty: 4,
    question: LIRE_ANNONCE + "D'après l'annonce, que doit faire exactement une personne qui veut ce poste ?",
    options: [
      "Envoyer une lettre de motivation avant le 30 juin",
      "Se présenter à la boulangerie un matin de semaine",
      "Téléphoner à la boulangerie avant cinq heures",
      "Joindre une copie de son permis à sa candidature",
    ],
    answer: "Envoyer une lettre de motivation avant le 30 juin",
    hint: "L'annonce indique une seule manière de prendre contact, et elle en interdit une autre.",
    explanation: "L'annonce demande d'envoyer une lettre à l'adresse indiquée avant le 30 juin, et ajoute « ne pas se présenter sans rendez-vous » : se déplacer est donc explicitement exclu. Le permis n'est que « souhaité » et rien ne demande d'en joindre une copie. Une consigne de contact se lit en entier, y compris ce qu'elle interdit.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-031', chapterId: 'g9fr-doc-authentique', subsection: 'reponses_multiples', difficulty: 4,
    question: LIRE_ANNONCE + "Deux personnes hésitent : Vishal n'a jamais travaillé en boulangerie, et Anisha n'a pas de permis. Que dit l'annonce de leurs deux cas ?",
    options: [
      "Les deux peuvent postuler : ni l'un ni l'autre n'est exigé",
      "Seul Vishal peut postuler : le permis est obligatoire",
      "Seule Anisha peut postuler : l'expérience est obligatoire",
      "Aucun des deux ne peut postuler d'après cette annonce",
    ],
    answer: "Les deux peuvent postuler : ni l'un ni l'autre n'est exigé",
    hint: "Compare le mot employé pour l'expérience et celui employé pour le permis.",
    explanation: "L'annonce écrit « expérience non exigée » et « permis souhaité » : aucune des deux conditions n'est obligatoire. <b>Souhaité</b> signale un avantage, pas une exigence, et c'est cette nuance qui décide. Il faut relever les <b>deux</b> lignes et les comparer : l'une seule ferait conclure à tort.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-032', chapterId: 'g9fr-doc-authentique', subsection: 'reponses_multiples', difficulty: 4,
    question: LIRE_ANNONCE + "Combien d'heures de travail par semaine ce poste représente-t-il, d'après l'annonce ?",
    options: ["30 heures", "36 heures", "25 heures", "42 heures"],
    answer: "30 heures",
    hint: "Multiplie la durée d'une journée par le nombre de jours travaillés : l'annonce donne les deux.",
    explanation: "L'annonce donne l'horaire, de 5 h 00 à 11 h 00, soit <b>6 heures</b>, et les jours, du mardi au samedi, soit <b>5 jours</b> : 6 × 5 = <b>30 heures</b>. L'erreur habituelle est de compter six jours en oubliant que la semaine commence ici au mardi. Deux données à relever, une seule réponse.",
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-ap2-033', chapterId: 'g9fr-doc-authentique', subsection: 'reponses_multiples', difficulty: 4,
    question: LIRE_FACTURE + "Le client a payé le total indiqué, mais un travail restera à sa charge. Lequel ? Réponds en un mot.",
    answer: "la pose", alsoAccept: ["pose", "les travaux de pose", "la pose des matériaux"],
    hint: "Le tableau ne suffit pas : la réponse est dans la phrase qui le suit.",
    explanation: "La note sous le tableau précise que « les travaux de <b>pose</b> ne sont pas compris dans ce total » : le client paie les matériaux et la livraison, mais devra payer à part la main-d'œuvre qui posera le grillage. Un total n'est complet que si l'on a lu ce qui est écrit sous le tableau.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-034', chapterId: 'g9fr-doc-authentique', subsection: 'reponses_multiples', difficulty: 4,
    question: LIRE_FACTURE + "Le tableau compte trois lignes d'articles, et pourtant le total n'en additionne que deux. Pourquoi ?",
    options: [
      "La livraison est offerte : elle vaut zéro roupie",
      "La livraison a été oubliée par le commerçant",
      "La livraison sera portée sur une facture suivante",
      "La livraison est comprise dans le prix du grillage",
    ],
    answer: "La livraison est offerte : elle vaut zéro roupie",
    hint: "Additionne les montants de la colonne de droite et compare le résultat au total.",
    explanation: "640 + 1 250 = 1 890 : la troisième ligne n'ajoute rien parce que son montant est « offerte », c'est-à-dire zéro. Rien n'a été oublié ni reporté ailleurs. Une ligne sans chiffre dans la colonne des montants compte quand même : elle vaut zéro, ce qui n'est pas la même chose qu'une ligne absente.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-035', chapterId: 'g9fr-doc-authentique', subsection: 'reponses_multiples', difficulty: 4,
    question: LIRE_FACTURE + "Deux éléments peuvent encore alourdir la note du client. Lesquels ?",
    options: [
      "Les travaux de pose et la majoration de retard",
      "La livraison à domicile et les travaux de pose",
      "Le prix du grillage et la majoration de retard",
      "La livraison à domicile et le prix du ciment",
    ],
    answer: "Les travaux de pose et la majoration de retard",
    hint: "Relis la phrase placée sous le tableau : elle contient deux réserves, pas une seule.",
    explanation: "La note dit deux choses : la pose n'est pas comprise, et un paiement au-delà de 30 jours entraîne 2 % de plus. Ce sont les deux seuls postes qui peuvent encore faire monter la note. La livraison est offerte, et le ciment comme le grillage sont déjà payés dans le total. Une note de bas de tableau se lit jusqu'au bout.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-036', chapterId: 'g9fr-doc-authentique', subsection: 'reponses_multiples', difficulty: 4,
    question: LIRE_COURRIEL + "Trois conditions doivent être réunies pour qu'un élève monte dans le car le 23 mai. Lesquelles ?",
    options: [
      "Le coupon signé, remis avant le 12 mai, et les 250 roupies",
      "Le coupon signé, un repas apporté, et les 250 roupies",
      "Le coupon signé, remis avant le 23 mai, et un ticket de car",
      "L'accord du professeur, un repas apporté, et les 250 roupies",
    ],
    answer: "Le coupon signé, remis avant le 12 mai, et les 250 roupies",
    hint: "Le troisième paragraphe impose deux obligations, et un paragraphe plus haut en impose une autre.",
    explanation: "Le troisième paragraphe impose deux choses — signer le coupon et le remettre avant le 12 mai — et le deuxième en impose une autre : la participation de 250 roupies. Le repas n'est pas fourni mais n'est exigé nulle part, et le professeur n'a rien à autoriser, puisqu'il est seulement en copie. Une question à réponses multiples se perd dès qu'on ne relève qu'un paragraphe.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-037', chapterId: 'g9fr-doc-authentique', subsection: 'reponses_multiples', difficulty: 4,
    question: LIRE_HORAIRE + "Kavi doit être à Port-Louis avant 9 h le samedi, et il ne peut pas quitter Curepipe avant 6 h. Quels départs lui restent-ils ?",
    options: [
      "Un seul départ convient : celui de 7 h 10",
      "Deux départs conviennent : 5 h 45 et 7 h 10",
      "Deux départs conviennent : 7 h 10 et 12 h 00",
      "Aucun départ ne convient ce jour-là avant 9 h",
    ],
    answer: "Un seul départ convient : celui de 7 h 10",
    hint: "Applique les contraintes l'une après l'autre : d'abord le jour, puis les deux heures.",
    explanation: "Le samedi, les départs de 5 h 45 et de 17 h 30 ne circulent pas : restent 7 h 10 et 12 h 00. La contrainte « arriver avant 9 h » élimine le départ de midi, qui n'arrive qu'à 13 h 05. Un seul départ satisfait donc toutes les conditions. Quand une question pose plusieurs contraintes, il faut les appliquer toutes, et pas seulement la première.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-038', chapterId: 'g9fr-doc-authentique', subsection: 'role_emetteur_destinataire', difficulty: 4,
    question: LIRE_RECLAMATION + "Qui est l'émetteur de ce courriel, et que demande-t-il exactement ?",
    options: [
      "Un client, qui demande l'échange de l'appareil",
      "Un client, qui demande le remboursement complet",
      "Un vendeur, qui propose l'échange de l'appareil",
      "Un livreur, qui signale une erreur de livraison",
    ],
    answer: "Un client, qui demande l'échange de l'appareil",
    hint: "Le courriel distingue deux réparations possibles et en écarte une expressément.",
    explanation: "L'émetteur est le client, Jaycee Ramsamy, qui écrit au service clients du magasin. Il demande « un échange, et non un avoir » : la nuance est écrite noir sur blanc et elle écarte le remboursement. Identifier l'émetteur ne suffit donc pas — un courriel de réclamation se résume par ce qu'il réclame.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-039', chapterId: 'g9fr-doc-authentique', subsection: 'role_emetteur_destinataire', difficulty: 4,
    question: LIRE_RECLAMATION + "Pourquoi l'expéditeur joint-il la photo de l'étiquette et la copie de la facture ?",
    options: [
      "Pour prouver l'achat et identifier l'appareil précis",
      "Pour montrer qu'il connaît bien le matériel vendu",
      "Pour éviter d'avoir à donner le numéro de commande",
      "Pour obliger le magasin à répondre dans la semaine",
    ],
    answer: "Pour prouver l'achat et identifier l'appareil précis",
    hint: "Demande-toi ce que le service clients doit vérifier avant d'accepter un échange.",
    explanation: "Une réclamation n'est traitée que si le vendeur peut vérifier deux choses : que l'achat a bien eu lieu chez lui — c'est la facture — et de quel appareil il s'agit — c'est l'étiquette. Les pièces jointes servent donc de preuves. Elles ne remplacent pas le numéro de commande, qui figure d'ailleurs dans l'objet.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-040', chapterId: 'g9fr-doc-authentique', subsection: 'role_emetteur_destinataire', difficulty: 4,
    question: LIRE_RECLAMATION + "Ce courriel ne met personne en copie. Qu'est-ce que cela indique sur la démarche du client ?",
    options: [
      "Il s'adresse d'abord au magasin, sans alerter de tiers",
      "Il a déjà écrit une première fois sans obtenir de réponse",
      "Il ne connaît pas l'adresse du responsable du magasin",
      "Il veut que sa réclamation reste connue de lui seul",
    ],
    answer: "Il s'adresse d'abord au magasin, sans alerter de tiers",
    hint: "Mettre quelqu'un en copie revient à le prendre à témoin : ici, personne ne l'est.",
    explanation: "Mettre une association de consommateurs ou un supérieur en copie reviendrait à prendre témoin d'un litige. En n'écrivant qu'au service clients, le client garde sa réclamation au premier niveau et laisse au magasin l'occasion de régler l'affaire. Rien n'indique une démarche antérieure : l'objet et le corps du message décrivent un premier contact.",
  }));

  // ══════════════════════════════════════════════════════════════════════
  //  g9fr-ecrit-guide — juger un brouillon (041-059)
  // ══════════════════════════════════════════════════════════════════════

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-041', chapterId: 'g9fr-ecrit-guide', subsection: 'invitation', difficulty: 4,
    question: "Sanjay a écrit ce brouillon d'invitation :<br><br><em>« Salut Yash ! Je t'invite à mon anniversaire samedi, chez moi. Viens, ça va être bien ! Réponds-moi vite. »</em><br><br>Que doit-il ajouter en priorité ?",
    options: [
      "L'heure et l'adresse exacte de la fête",
      "Le nombre d'invités et le programme prévu",
      "La liste des cadeaux qui lui feraient plaisir",
      "Une formule de politesse plus soutenue",
    ],
    answer: "L'heure et l'adresse exacte de la fête",
    hint: "Demande-toi ce qui manque encore à Yash pour se rendre au bon endroit au bon moment.",
    explanation: "Une invitation doit répondre à trois questions : quoi, quand et où. Le brouillon donne l'occasion et le jour, mais ni l'heure ni l'adresse, si bien que Yash ne peut pas venir. Le ton familier convient entre camarades et la liste de cadeaux serait déplacée : on complète d'abord ce qui empêche le destinataire d'agir.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-042', chapterId: 'g9fr-ecrit-guide', subsection: 'invitation', difficulty: 4,
    question: "Nadia invite sa tante Meera à la remise des prix de son collège. Elle hésite entre quatre ouvertures. Laquelle convient à ce destinataire ?",
    options: [
      "Chère Tante Meera, j'aimerais t'inviter à…",
      "Madame, j'ai l'honneur de vous convier à…",
      "Coucou Meera ! Devine quoi, je t'invite à…",
      "À qui de droit, vous êtes cordialement invitée…",
    ],
    answer: "Chère Tante Meera, j'aimerais t'inviter à…",
    hint: "Une tante n'est ni une inconnue ni une camarade de classe.",
    explanation: "Le lien de parenté demande un ton affectueux mais respectueux : « Chère Tante Meera » et le tutoiement conviennent. « Madame » et « À qui de droit » s'adressent à une inconnue et sonnent glacials en famille, tandis que « Coucou, devine quoi » est le registre des camarades. C'est le destinataire qui commande le registre, pas l'événement.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-043', chapterId: 'g9fr-ecrit-guide', subsection: 'invitation', difficulty: 4,
    question: "Une invitation se termine par : « Réponds-moi vite. » Le professeur demande une demande de réponse plus précise. Laquelle convient ?",
    options: [
      "Merci de me répondre avant mercredi 10 juin",
      "Merci de me répondre le plus tôt possible",
      "Merci de me dire si tu es d'accord avec moi",
      "Merci de confirmer ta présence un de ces jours",
    ],
    answer: "Merci de me répondre avant mercredi 10 juin",
    hint: "« Vite » et « le plus tôt possible » ne fixent rien : cherche ce qui peut se vérifier.",
    explanation: "Une demande de réponse n'est utile que si elle donne une date, car l'organisateur doit compter les participants. « Le plus tôt possible » et « un de ces jours » laissent le destinataire libre de ne rien décider, et « si tu es d'accord » ne porte même pas sur sa présence. Une consigne précise est une consigne qu'on peut mesurer.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-044', chapterId: 'g9fr-ecrit-guide', subsection: 'invitation', difficulty: 4,
    question: "Dans une invitation de 70 mots, Reza a écrit trois phrases sur la décoration de la salle, et n'a pas dit à quelle heure la fête se termine. Quel conseil faut-il lui donner ?",
    options: [
      "Remplacer la décoration par l'heure de fin",
      "Ajouter l'heure de fin après la décoration",
      "Supprimer la décoration et raccourcir le texte",
      "Garder le tout et dépasser les 75 mots permis",
    ],
    answer: "Remplacer la décoration par l'heure de fin",
    hint: "La longueur est limitée : ce qui entre doit prendre la place de quelque chose.",
    explanation: "Quand la longueur est imposée, ajouter sans retirer fait dépasser la limite, et retirer sans ajouter laisse l'information manquante absente. Le détail décoratif, lui, n'est demandé par personne : c'est donc lui qui cède sa place à l'heure de fin. Écrire court, c'est surtout choisir ce qu'on n'écrit pas.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-045', chapterId: 'g9fr-ecrit-guide', subsection: 'lettre_amicale', difficulty: 4,
    question: "Dans une lettre à son cousin, Yohann écrit : « Suite à votre courrier du 12 courant, je vous informe que… » Qu'est-ce qui ne va pas ?",
    options: [
      "Le registre est administratif, pas amical",
      "La phrase contient une faute d'accord",
      "La date indiquée n'est pas assez précise",
      "Le cousin n'a jamais écrit à Yohann avant",
    ],
    answer: "Le registre est administratif, pas amical",
    hint: "Regarde le vouvoiement et les mots choisis, plutôt que l'orthographe.",
    explanation: "« Suite à votre courrier du 12 courant » est une formule de bureau : vouvoiement, tournure figée, vocabulaire administratif. Entre cousins, on écrit « J'ai bien reçu ta lettre du 12 ». Il n'y a ici ni faute d'accord ni problème de date : l'erreur est de registre, et le registre se choisit d'après le destinataire.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-046', chapterId: 'g9fr-ecrit-guide', subsection: 'lettre_amicale', difficulty: 4,
    question: "Une lettre amicale de 70 mots raconte trois événements, mais rien ne relie les phrases entre elles. Que faut-il ajouter sans allonger le texte ?",
    options: [
      "Des mots de liaison entre les événements",
      "Des adjectifs qui décrivent chaque événement",
      "Des questions posées au destinataire",
      "Des exemples qui illustrent chaque événement",
    ],
    answer: "Des mots de liaison entre les événements",
    hint: "Ce qui manque n'est pas de la matière, mais un fil entre les phrases.",
    explanation: "Des phrases justes mais simplement juxtaposées se lisent comme une liste. Deux ou trois mots de liaison suffisent à montrer l'ordre ou la cause, et ils coûtent très peu de mots. Ajouter des adjectifs ou des exemples ferait grossir le texte sans le rendre plus clair, et des questions changeraient de sujet au lieu de le lier.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-047', chapterId: 'g9fr-ecrit-guide', subsection: 'lettre_amicale', difficulty: 4,
    question: "Priya termine une lettre à son amie par : « Veuillez agréer, Madame, l'expression de mes salutations distinguées. » Pourquoi le professeur la corrige-t-il ?",
    options: [
      "La formule appartient à la lettre officielle",
      "La formule contient une erreur de conjugaison",
      "La formule est trop courte pour une clôture",
      "La formule doit toujours répéter le prénom",
    ],
    answer: "La formule appartient à la lettre officielle",
    hint: "Demande-toi à qui l'on écrit « Madame » et « salutations distinguées ».",
    explanation: "Cette formule est celle des lettres administratives ou commerciales : elle vouvoie et emploie « Madame ». À une amie, on écrit « Je t'embrasse », « À bientôt » ou « Amitiés ». Il n'y a aucune erreur de conjugaison : la faute est de registre, et c'est le lien avec le destinataire qui la rend visible.",
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-ap2-048', chapterId: 'g9fr-ecrit-guide', subsection: 'lettre_amicale', difficulty: 4,
    question: "Ashvin termine une lettre à son meilleur ami. Deux clôtures lui sont proposées : <b>Amitiés</b> ou <b>Salutations distinguées</b>.<br><br>Recopie celle qui convient à ce destinataire.",
    answer: "Amitiés", alsoAccept: ["amities", "Amitiés,", "amitié", "Amitié"],
    hint: "L'une des deux formules ne s'emploie qu'avec un vouvoiement.",
    explanation: "<b>Amitiés</b> est une clôture brève et chaleureuse, faite pour un ami. <b>Salutations distinguées</b> appartient à la lettre officielle, où l'on vouvoie et où l'on ne connaît pas toujours son destinataire ; employée entre amis, elle installe une distance que rien ne justifie. La clôture doit avoir le même registre que l'ouverture.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-049', chapterId: 'g9fr-ecrit-guide', subsection: 'points_imposes', difficulty: 4,
    question: "La consigne impose quatre points : la date du séjour, le lieu, deux activités pratiquées et une impression personnelle. Le brouillon de Sarah donne la date, le lieu et trois activités, puis se termine par « Voilà, c'est tout. » Que manque-t-il ?",
    options: [
      "L'impression personnelle sur le séjour",
      "Une activité supplémentaire à raconter",
      "La date précise du retour de séjour",
      "Le nom des personnes rencontrées",
    ],
    answer: "L'impression personnelle sur le séjour",
    hint: "Compare la liste de la consigne au contenu du brouillon, point par point.",
    explanation: "Trois des quatre points sont traités, et même généreusement puisqu'il y a trois activités au lieu de deux. Le quatrième, l'impression personnelle, est remplacé par « Voilà, c'est tout », qui ne dit rien de ce que Sarah a ressenti. Un point imposé non traité coûte ses points : un excédent ailleurs ne compense jamais un manque.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-050', chapterId: 'g9fr-ecrit-guide', subsection: 'points_imposes', difficulty: 4,
    question: "Un élève traite bien les quatre points imposés, mais consacre 50 de ses 70 mots au premier. Quel reproche le correcteur peut-il lui faire ?",
    options: [
      "Les trois autres points sont à peine effleurés",
      "Le texte dépasse la longueur qui était imposée",
      "Le premier point n'était pas le plus important",
      "Les points devaient être traités dans le désordre",
    ],
    answer: "Les trois autres points sont à peine effleurés",
    hint: "Compte les mots qu'il reste pour les points suivants.",
    explanation: "Il reste 20 mots pour trois points, soit moins de sept mots chacun : ils ne peuvent qu'être évoqués. Le texte respecte pourtant la longueur imposée, et l'ordre des points est libre. L'équilibre fait partie de la consigne : quatre points imposés valent chacun leur part de la note, et donc, à peu près, leur part du texte.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-051', chapterId: 'g9fr-ecrit-guide', subsection: 'points_imposes', difficulty: 4,
    question: "La consigne demande d'écrire à un ami pour l'inviter à une randonnée et de préciser ce qu'il doit apporter. Le brouillon décrit longuement le paysage du Morne mais ne dit rien du matériel. Que faut-il faire ?",
    options: [
      "Réduire la description et ajouter le matériel",
      "Garder la description et ajouter le matériel",
      "Réduire la description sans rien ajouter",
      "Remplacer la randonnée par une autre sortie",
    ],
    answer: "Réduire la description et ajouter le matériel",
    hint: "Deux exigences pèsent en même temps : la consigne et la longueur.",
    explanation: "Le point imposé « ce qu'il doit apporter » n'est pas traité : il faut l'ajouter. Mais la longueur est limitée, donc la description, qui n'était pas demandée, doit céder de la place. Tout garder ferait dépasser ; réduire sans ajouter laisserait le point manquant. Le hors-sujet et le point oublié se soignent d'un même geste.",
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-ap2-052', chapterId: 'g9fr-ecrit-guide', subsection: 'points_imposes', difficulty: 4,
    question: "La consigne impose trois points : le lieu du pique-nique, l'heure du rendez-vous, et ce que chacun doit apporter.<br><br>Le brouillon de Yanis dit : <em>« On se retrouve à la plage de Flic-en-Flac. Apporte une natte et des boissons. À samedi ! »</em><br><br>Quel point imposé manque encore ? Réponds en un ou deux mots.",
    answer: "l'heure", alsoAccept: ["heure", "l'heure du rendez-vous", "l'heure du rendez vous", "l heure"],
    hint: "Coche les trois points de la consigne un par un sur le brouillon.",
    explanation: "Le lieu est donné, la plage de Flic-en-Flac, et ce qu'il faut apporter aussi, une natte et des boissons. Le jour est indiqué, mais l'<b>heure</b> du rendez-vous ne l'est pas, et c'est elle que la consigne exigeait. « À samedi » ressemble à une information complète : c'en est une, mais ce n'est pas celle qui était demandée.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-053', chapterId: 'g9fr-ecrit-guide', subsection: 'formules_ouverture_cloture', difficulty: 4,
    question: "Kevin, élève du collège, écrit au directeur pour demander qu'une salle lui soit prêtée. Quelle ouverture convient ?",
    options: ["Monsieur le Directeur,", "Cher Monsieur Kevin,", "Bonjour Monsieur le Chef,", "Salut Monsieur le Directeur,"],
    answer: "Monsieur le Directeur,",
    hint: "Une ouverture nomme la fonction du destinataire, jamais celle de l'expéditeur.",
    explanation: "« Monsieur le Directeur, » nomme la fonction du destinataire et convient à une demande officielle. « Cher Monsieur Kevin » nomme l'expéditeur, ce qui n'a aucun sens ; « Monsieur le Chef » n'est pas un titre en usage ; « Salut » casse le registre dès le premier mot. L'ouverture annonce le ton de toute la lettre.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-054', chapterId: 'g9fr-ecrit-guide', subsection: 'formules_ouverture_cloture', difficulty: 4,
    question: "Une lettre commence par « Chère Madame Bhoyroo, » et se termine par « À plus, bisous ! ». Quel est son défaut principal ?",
    options: [
      "L'ouverture et la clôture n'ont pas le même registre",
      "L'ouverture est trop longue pour ce genre de lettre",
      "La clôture devrait figurer avant la date de la lettre",
      "L'ouverture nomme une personne que rien ne présente",
    ],
    answer: "L'ouverture et la clôture n'ont pas le même registre",
    hint: "Lis seulement les premiers mots puis les derniers, l'un après l'autre.",
    explanation: "« Chère Madame Bhoyroo » est poli et distant ; « À plus, bisous ! » est familier et intime. Une lettre doit garder le même registre du début à la fin, sinon le destinataire ne sait plus quelle relation on lui propose. Il faudrait soit une clôture du type « Cordialement », soit une ouverture plus proche — mais pas l'une avec l'autre.",
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-ap2-055', chapterId: 'g9fr-ecrit-guide', subsection: 'formules_ouverture_cloture', difficulty: 4,
    question: "Un élève termine ainsi sa lettre à la directrice du collège :<br><br><em>« Je vous prie d'agréer, Madame la Directrice, mes salutations distinguées. Bisous. »</em><br><br>Un seul mot doit disparaître. Recopie-le.",
    answer: "Bisous", alsoAccept: ["bisous", "Bisous.", "le mot bisous"],
    hint: "Relis la clôture entière : un mot ne vient pas du même monde que les autres.",
    explanation: "« Je vous prie d'agréer… mes salutations distinguées » est la formule officielle complète. <b>Bisous</b> appartient au registre intime et détruit en un mot tout ce que la formule venait d'établir. Une clôture officielle ne se double jamais d'une clôture familière : il faut choisir un registre et s'y tenir jusqu'au point final.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-056', chapterId: 'g9fr-ecrit-guide', subsection: 'formules_ouverture_cloture', difficulty: 4,
    question: "Dans une lettre d'invitation à une camarade de classe, un élève écrit en tête : « Objet : invitation à mon anniversaire ». Que faut-il en penser ?",
    options: [
      "Une lettre amicale ne porte pas de ligne « Objet »",
      "La ligne « Objet » doit être placée sous la date",
      "Une lettre amicale porte l'objet après la signature",
      "La ligne « Objet » doit annoncer le lieu de la fête",
    ],
    answer: "Une lettre amicale ne porte pas de ligne « Objet »",
    hint: "Demande-toi dans quels documents on rencontre une ligne « Objet ».",
    explanation: "La ligne « Objet » sert dans un courriel ou dans une lettre administrative, où le destinataire doit classer et prioriser des messages. Une lettre amicale s'ouvre directement sur « Chère… » et annonce son objet dans la première phrase. Ce n'est pas une question de place : c'est un élément qui n'appartient pas à ce type de lettre.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-057', chapterId: 'g9fr-ecrit-guide', subsection: 'longueur_50_75', difficulty: 4,
    question: "Un brouillon d'invitation compte 38 mots et traite déjà les quatre points imposés. La consigne demande 50 à 75 mots. Que doit faire l'élève ?",
    options: [
      "Développer un point, par exemple le programme",
      "Ajouter une longue description du lieu choisi",
      "Recopier deux fois la formule de clôture",
      "Laisser le texte ainsi, les points y sont",
    ],
    answer: "Développer un point, par exemple le programme",
    hint: "La longueur imposée a un plancher autant qu'un plafond.",
    explanation: "Le texte est sous le minimum de 50 mots : il faut l'allonger, mais sans sortir du sujet ni se répéter. Développer l'un des points imposés — ce qui se passera, ce qu'il faut apporter — ajoute des mots <b>et</b> de l'information. Répéter une formule ou décrire longuement le décor remplit la page sans rien apporter, et le correcteur le voit.",
  }));

  STATIC_QUESTIONS.push(makeText({
    id: 'g9fr-ap2-058', chapterId: 'g9fr-ecrit-guide', subsection: 'longueur_50_75', difficulty: 4,
    question: "La consigne impose 50 à 75 mots. Le brouillon de Divya en compte 92 :<br><br><em>« Chère Ameera, je t'invite à mon anniversaire samedi 14 juin à 15 heures chez moi, au 12 rue des Manguiers à Rose-Hill. Il y aura un gâteau au chocolat, un gâteau à la vanille, un gâteau aux fruits, des samoussas, des gâteaux piments, du jus et de la limonade. Apporte ton maillot. Réponds-moi avant mercredi. Bisous, Divya. »</em><br><br>Quelle partie faut-il raccourcir en premier ? Réponds par un mot : <b>l'adresse</b>, <b>la liste</b>, <b>la date</b> ou <b>la clôture</b>.",
    answer: "la liste", alsoAccept: ["liste", "la liste des gâteaux", "la liste de nourriture", "la liste du menu"],
    hint: "Cherche l'endroit où le brouillon répète plusieurs fois la même sorte d'information.",
    explanation: "Sept aliments sont énumérés : cette <b>liste</b> coûte à elle seule une trentaine de mots et n'apporte qu'une information, « il y aura à manger ». La date, l'adresse et la clôture sont chacune indispensables et tiennent en peu de mots. Pour revenir sous 75 mots, on coupe d'abord là où les mots se répètent sans rien ajouter.",
  }));

  STATIC_QUESTIONS.push(makeMCQ({
    id: 'g9fr-ap2-059', chapterId: 'g9fr-ecrit-guide', subsection: 'longueur_50_75', difficulty: 4,
    question: "Deux élèves rendent une lettre de 74 mots. Celle de Karim traite les quatre points imposés ; celle de Lina n'en traite que deux et décrit la météo. Que peut-on en conclure ?",
    options: [
      "Les deux respectent la longueur, un seul la consigne",
      "Les deux respectent la consigne, un seul la longueur",
      "Seul le texte de Lina respecte la longueur imposée",
      "Seul le texte de Karim respecte la longueur imposée",
    ],
    answer: "Les deux respectent la longueur, un seul la consigne",
    hint: "Deux exigences se vérifient séparément : combien de mots, et quels contenus.",
    explanation: "74 mots entrent dans la fourchette de 50 à 75 : les deux lettres sont dans les clous de ce côté-là. Mais Lina n'a traité que deux des quatre points imposés et a rempli le reste avec un sujet que personne ne demandait. Respecter la longueur ne prouve rien sur le contenu : les mots et les points imposés se notent séparément.",
  }));

})();
