'use strict';
// grade7-french — compréhension écrite : 6 textes originaux, 10 questions chacun.
// IDs : g7fr-rcp-001-m1 … g7fr-rcp-006-o5   (chapitre g7fr-ce)
//
// Le chapitre g7fr-ce ne contenait aucun texte : ses 21 items posaient des
// questions abstraites sur la théorie de la lecture (« L'idée principale d'un
// texte est : ») sans jamais donner un texte à lire. Ces six blocs comblent ce
// manque. Tous les textes sont originaux et situés à Maurice ; rien n'est copié.
//
// Six types de texte différents : récit · courriel · article de journal ·
// affiche · texte documentaire · entretien.
(function () {
const CH = 'g7fr-ce';
function box(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

// ══ TEXTE 1 · RÉCIT · « Le penalty du samedi » ════════════════════════════
const _P1 = box(`
<b style="color:#1e40af">Lisez le texte, puis répondez à la question.</b><br><br>
<b>Le penalty du samedi</b><br><br>
Le terrain du village n’est pas un vrai stade. L’herbe pousse en touffes, une des cages n’a plus de filet, et quand le ballon part trop à droite il finit dans le jardin de madame Lisette, qui le garde une heure pour le principe. Pourtant, chaque samedi après-midi, presque tout le village vient s’asseoir sur le petit mur de béton pour regarder jouer les jeunes.<br><br>
Ce samedi-là, l’équipe de Rivière-Sèche jouait contre celle de Camp-Diable. À vingt minutes de la fin, le score était de un partout. Kevin, quatorze ans, jouait défenseur. Il n’avait jamais marqué un seul but de sa vie et cela ne le dérangeait pas : son travail, disait son entraîneur, était d’empêcher les autres de marquer.<br><br>
Puis un joueur de Camp-Diable a poussé l’avant-centre de Rivière-Sèche dans la surface. L’arbitre a sifflé. Penalty.<br><br>
Les joueurs se sont regardés. D’habitude, c’était Yannick qui tirait les penalties, mais Yannick était sorti à la mi-temps avec la cheville enflée. Personne ne bougeait. Sur le mur, les spectateurs criaient des noms différents.<br><br>
L’entraîneur a appelé Kevin.<br><br>
— Moi ?<br>
— Toi.<br>
— Mais je n’ai jamais…<br>
— Justement. Le gardien non plus ne t’a jamais vu tirer.<br><br>
Kevin a posé le ballon sur la marque blanche, qui n’était plus très blanche. Il a reculé de six pas. Il entendait son cœur plus fort que la foule. Il a pensé à sa mère, qui travaillait ce samedi-là et qui lui demanderait le score le soir, et il s’est dit qu’il aimerait bien avoir quelque chose à raconter.<br><br>
Il a couru. Il a frappé le ballon du plat du pied, vers la gauche, comme il avait vu faire cent fois à la télévision.<br><br>
Le gardien est parti à gauche lui aussi.<br><br>
Le ballon a claqué contre le poteau, est revenu vers le terrain, et Kevin, qui courait toujours, l’a poussé au fond des filets avec le genou. Ce n’était pas beau. Ce n’était pas non plus un vrai tir. Mais l’arbitre a montré le rond central et le mur de béton s’est levé d’un seul coup.<br><br>
Après le match, un vieux monsieur a arrêté Kevin près de la route.<br><br>
— Tu as eu de la chance, a-t-il dit.<br>
— Je sais, a répondu Kevin.<br>
— Non, tu ne sais pas. La chance ne sert à rien si tu t’arrêtes de courir après avoir tiré. Tu as continué. C’est pour cela que tu as marqué.<br><br>
Kevin y a repensé toute la soirée, dans le bus, puis à table. Le lendemain, à l’entraînement, il a couru derrière chacun de ses tirs, même les mauvais.
`, '#2563eb');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7fr-rcp-001-m1', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P1 + 'Contre quelle équipe joue Rivière-Sèche ce samedi-là ?',
    options:['Camp-Diable','Grand-Gaube','Beau-Bassin','Petit-Raffray'],
    answer:'Camp-Diable',
    hint:'Le nom des deux équipes est donné au début du deuxième paragraphe. (The two team names are in the second paragraph.)',
    explanation:'Le texte dit : « l’équipe de Rivière-Sèche jouait contre celle de <b>Camp-Diable</b> ». Les autres noms n’apparaissent nulle part. (The text names Camp-Diable as the opponent.)' }),

  makeMCQ({ id:'g7fr-rcp-001-m2', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P1 + 'Pourquoi Yannick ne tire-t-il pas le penalty ?',
    options:['Il s’est blessé à la cheville.','Il n’était pas venu au match.','Il avait refusé de tirer.','Il gardait les buts ce jour-là.'],
    answer:'Il s’est blessé à la cheville.',
    hint:'Cherchez la phrase où le nom de Yannick est écrit. (Find the sentence that mentions Yannick.)',
    explanation:'« Yannick était sorti à la mi-temps avec la <b>cheville enflée</b> » : il est blessé, donc il ne peut pas tirer. (He left at half-time with a swollen ankle.)' }),

  makeMCQ({ id:'g7fr-rcp-001-m3', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P1 + 'Dans « le mur de béton s’est levé d’un seul coup », que veut dire « d’un seul coup » ?',
    options:['tous ensemble','très lentement','un par un','en silence'],
    answer:'tous ensemble',
    hint:'Imaginez le geste des spectateurs au moment du but. (Picture the crowd at the moment of the goal.)',
    explanation:'« D’un seul coup » signifie <b>en même temps, d’un seul mouvement</b>. Tout le monde se lève ensemble parce que le but vient d’être marqué. (All at once, together.)' }),

  makeMCQ({ id:'g7fr-rcp-001-m4', chapterId:CH, difficulty:3, subsection:'idee_principale',
    question:_P1 + 'Quel autre titre conviendrait le mieux à ce texte ?',
    options:['Le premier but de Kevin','Le jardin de madame Lisette','Un samedi sous la pluie','Le bus du village'],
    answer:'Le premier but de Kevin',
    hint:'Un bon titre annonce ce dont parle le texte tout entier, pas un seul détail. (A title covers the whole text, not one detail.)',
    explanation:'Tout le texte conduit au but de Kevin, lui « qui n’avait jamais marqué un seul but de sa vie ». Le jardin de madame Lisette n’est qu’un détail du décor. (The whole story leads to Kevin’s first goal.)' }),

  makeMCQ({ id:'g7fr-rcp-001-m5', chapterId:CH, difficulty:4, subsection:'idee_principale',
    question:_P1 + 'Quelle leçon le vieux monsieur veut-il donner à Kevin ?',
    options:['Il faut continuer après avoir tiré.','Il faut tirer toujours à gauche.','Il faut jouer comme à la télévision.','Il faut laisser tirer les avants.'],
    answer:'Il faut continuer après avoir tiré.',
    hint:'Relisez les trois dernières répliques du vieux monsieur. (Re-read the old man’s last three lines.)',
    explanation:'Il dit : « La chance ne sert à rien si tu t’arrêtes de courir après avoir tiré. <b>Tu as continué.</b> C’est pour cela que tu as marqué. » (Luck is useless if you stop running after the shot.)' }),

  makeText({ id:'g7fr-rcp-001-o1', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P1 + 'En un mot, quel jour de la semaine ce match a-t-il lieu ?',
    answer:'samedi', alsoAccept:['le samedi','samedi après-midi','un samedi'],
    hint:'Le jour est répété plusieurs fois dans le texte. (The day is repeated several times.)',
    explanation:'« chaque <b>samedi</b> après-midi » et « Ce <b>samedi</b>-là » : le match a lieu un samedi. (The match takes place on a Saturday.)' }),

  makeText({ id:'g7fr-rcp-001-o2', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P1 + 'Quel âge a Kevin ? Écrivez le nombre en chiffres ou en lettres.',
    answer:'14', alsoAccept:['quatorze','14 ans','quatorze ans'],
    hint:'L’âge est donné juste après le nom de Kevin. (His age follows his name.)',
    explanation:'« Kevin, <b>quatorze ans</b>, jouait défenseur. » Il a donc 14 ans. (Kevin is fourteen.)' }),

  makeText({ id:'g7fr-rcp-001-o3', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P1 + 'Relevez dans le texte le mot qui désigne la personne qui siffle le penalty. (un seul mot)',
    answer:'arbitre', alsoAccept:['l’arbitre','un arbitre','le sifflet de l’arbitre'],
    hint:'Ce mot revient deux fois : au moment de la faute et au moment du but. (The word appears twice.)',
    explanation:'« L’<b>arbitre</b> a sifflé. Penalty. » L’arbitre est celui qui dirige le match et sanctionne les fautes. (The referee.)' }),

  makeText({ id:'g7fr-rcp-001-o4', chapterId:CH, difficulty:4, subsection:'vocabulaire',
    question:_P1 + 'Dans la phrase « le mur de béton s’est levé », qui l’expression « le mur de béton » désigne-t-elle vraiment ? (trois mots au maximum)',
    answer:'les spectateurs', alsoAccept:['le public','la foule','les gens du village','les villageois'],
    hint:'Un mur ne se lève pas. Cherchez qui est assis sur ce mur au début du texte. (A wall cannot stand up.)',
    explanation:'Au premier paragraphe : « presque tout le village vient <b>s’asseoir sur le petit mur de béton</b> ». Le mur désigne donc les spectateurs assis dessus. (The wall stands for the crowd sitting on it.)' }),

  makeText({ id:'g7fr-rcp-001-o5', chapterId:CH, difficulty:4, subsection:'idee_principale',
    question:_P1 + 'Selon le vieux monsieur, qu’est-ce que Kevin a fait de bien ? (trois mots au maximum)',
    answer:'il a continué', alsoAccept:['continuer à courir','il a couru','continué à courir','il a suivi son tir'],
    hint:'Le vieux monsieur corrige lui-même le mot « chance ». (The old man corrects the word “luck”.)',
    explanation:'« Tu as eu de la chance… Non, tu ne sais pas… <b>Tu as continué.</b> C’est pour cela que tu as marqué. » Kevin a couru derrière son tir. (He kept running after the shot.)' })
);

// ══ TEXTE 2 · COURRIEL · « Ma première semaine au collège » ═══════════════
const _P2 = box(`
<b style="color:#1e40af">Lisez le courriel, puis répondez à la question.</b><br><br>
<b>De :</b> anjali.ramdin@courriel.mu<br>
<b>À :</b> elodie.perrine@courriel.mu<br>
<b>Objet :</b> Ma première semaine au collège<br><br>
Chère Élodie,<br><br>
Je t’écris de la table de la cuisine, avec mon nouveau cartable posé à côté de moi comme un chien qui attend. Voilà, ça y est : j’ai commencé le collège lundi. Tu m’avais dit que ce serait « bizarre les trois premiers jours, puis normal ». Tu avais raison, sauf que pour moi cela a duré quatre jours.<br><br>
Le plus grand changement, c’est le trajet. À l’école primaire, je partais à sept heures vingt et je marchais huit minutes. Maintenant, je dois prendre le bus de six heures cinquante pour Curepipe. Il est toujours plein. La première fois, je suis restée debout pendant tout le voyage, serrée entre un monsieur qui lisait son journal et une dame qui portait un panier de brèdes. Depuis, je monte deux arrêts plus haut, où il reste encore des places, même si je dois me lever plus tôt. Papa dit que c’est ma première vraie décision d’adulte : perdre dix minutes de sommeil pour gagner une place assise.<br><br>
Le collège lui-même est immense. Il y a trois bâtiments, une cour couverte et un laboratoire de sciences avec de vrais becs Bunsen. Nous changeons de salle à chaque matière, ce qui veut dire que la moitié des élèves passe la journée à se demander où aller. Mardi, je suis entrée dans un cours d’espagnol de troisième année. Personne n’a rien dit pendant une minute entière, puis le professeur m’a demandé, très poliment, si je venais m’inscrire.<br><br>
Les matières sont : français, anglais, mathématiques, sciences, histoire-géographie, informatique et éducation physique. L’informatique est ma préférée pour l’instant, parce que nous apprenons à faire un tableur. J’ai déjà calculé combien d’argent de poche je vais recevoir jusqu’à Noël. (Pas assez.)<br><br>
Ce qui me manque, c’est de connaître tout le monde. À l’école primaire, je pouvais dire le nom des vingt-huit élèves de ma classe et de leurs frères et sœurs. Ici, nous sommes plus de six cents. Madame Appadoo, ma professeure principale, nous a dit vendredi une chose que j’ai notée : « Vous n’avez pas besoin de connaître six cents personnes. Vous avez besoin d’en connaître trois, et ensuite le collège devient petit. » J’en ai déjà deux : Shanaz, qui prend le même bus, et Priya, qui est assise devant moi en sciences.<br><br>
Et toi ? Est-ce que le nouveau collège de Port-Mathurin a ouvert ? Écris-moi vite, même deux lignes.<br><br>
Grosses bises,<br>
Anjali<br><br>
P.-S. Maman a mis de côté des letchis de notre arbre pour ta visite de décembre. Elle dit qu’elle va les congeler. Je ne crois pas que cela marche.
`, '#2563eb');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7fr-rcp-002-m1', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P2 + 'À quelle heure Anjali doit-elle prendre le bus pour Curepipe ?',
    options:['six heures cinquante','sept heures cinquante','six heures trente','sept heures vingt'],
    answer:'six heures cinquante',
    hint:'Deux heures sont données dans le même paragraphe : l’ancienne et la nouvelle. (Two times are given: the old one and the new one.)',
    explanation:'« je dois prendre le bus de <b>six heures cinquante</b> pour Curepipe ». Sept heures vingt était son heure de départ à l’école primaire. (6:50 is the new bus; 7:20 was primary school.)' }),

  makeMCQ({ id:'g7fr-rcp-002-m2', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P2 + 'Pourquoi Anjali monte-t-elle maintenant deux arrêts plus haut ?',
    options:['Pour trouver une place assise.','Pour voyager avec son amie.','Pour arriver plus tôt en classe.','Pour payer un ticket moins cher.'],
    answer:'Pour trouver une place assise.',
    hint:'Son père résume lui-même cette décision à la fin du paragraphe. (Her father sums the decision up.)',
    explanation:'« je monte deux arrêts plus haut, où il reste encore des places » ; son père parle de « perdre dix minutes de sommeil pour <b>gagner une place assise</b> ». (She gets on earlier to get a seat.)' }),

  makeMCQ({ id:'g7fr-rcp-002-m3', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P2 + 'Dans « Le collège lui-même est immense », que veut dire « immense » ?',
    options:['très grand','très vieux','très propre','très bruyant'],
    answer:'très grand',
    hint:'La phrase suivante donne trois bâtiments, une cour couverte et un laboratoire. (The next sentence lists what the school contains.)',
    explanation:'« Immense » veut dire <b>très grand</b>. Anjali le prouve aussitôt : trois bâtiments, une cour couverte, un laboratoire, plus de six cents élèves. (Immense = huge.)' }),

  makeMCQ({ id:'g7fr-rcp-002-m4', chapterId:CH, difficulty:3, subsection:'idee_principale',
    question:_P2 + 'Quel est le but principal de ce courriel ?',
    options:['Raconter sa première semaine.','Demander de l’argent de poche.','Inviter sa cousine à Curepipe.','Se plaindre du bus du matin.'],
    answer:'Raconter sa première semaine.',
    hint:'Regardez l’objet du courriel, tout en haut. (Look at the subject line.)',
    explanation:'L’objet annonce « <b>Ma première semaine au collège</b> » et chaque paragraphe raconte un aspect de cette semaine : le trajet, le bâtiment, les matières, les amies. (The email recounts her first week.)' }),

  makeMCQ({ id:'g7fr-rcp-002-m5', chapterId:CH, difficulty:4, subsection:'idee_principale',
    question:_P2 + 'Que veut dire madame Appadoo quand elle affirme que « le collège devient petit » ?',
    options:['On finit par s’y sentir chez soi.','Les bâtiments paraissent plus bas.','Les classes comptent moins d’élèves.','On finit par changer de collège.'],
    answer:'On finit par s’y sentir chez soi.',
    hint:'Elle vient de dire qu’il suffit de connaître trois personnes. (She has just said three people are enough.)',
    explanation:'« Vous avez besoin d’en connaître trois, et ensuite le collège devient petit. » Un lieu où l’on connaît quelqu’un cesse de faire peur : il devient <b>familier</b>. (Once you know a few people the place feels like home.)' }),

  makeText({ id:'g7fr-rcp-002-o1', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P2 + 'Combien d’élèves y a-t-il dans le nouveau collège d’Anjali ? (quatre mots au maximum)',
    answer:'plus de six cents', alsoAccept:['six cents','600','plus de 600','environ six cents'],
    hint:'Anjali compare ce nombre aux vingt-huit élèves de son ancienne classe. (She compares it with her old class of 28.)',
    explanation:'« Ici, nous sommes <b>plus de six cents</b>. » Vingt-huit était l’effectif de sa classe à l’école primaire. (Over six hundred pupils.)' }),

  makeText({ id:'g7fr-rcp-002-o2', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P2 + 'Comment s’appelle la professeure principale d’Anjali ? (deux mots au maximum)',
    answer:'madame Appadoo', alsoAccept:['Appadoo','Mme Appadoo','madame appadoo'],
    hint:'Elle est citée dans l’avant-dernier paragraphe. (She appears in the second-to-last paragraph.)',
    explanation:'« <b>Madame Appadoo</b>, ma professeure principale, nous a dit vendredi une chose que j’ai notée. » (Madame Appadoo is her form teacher.)' }),

  makeText({ id:'g7fr-rcp-002-o3', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P2 + 'Quel mot du courriel désigne le sac dans lequel Anjali porte ses affaires d’école ? (un seul mot)',
    answer:'cartable', alsoAccept:['le cartable','un cartable','mon cartable'],
    hint:'Ce mot se trouve dans la toute première phrase. (The word is in the very first sentence.)',
    explanation:'« avec mon nouveau <b>cartable</b> posé à côté de moi comme un chien qui attend ». Le cartable est le sac d’écolier. (A cartable is a school bag.)' }),

  makeText({ id:'g7fr-rcp-002-o4', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P2 + 'Dans le post-scriptum, quel verbe signifie « mettre au congélateur » ? (un seul mot)',
    answer:'congeler', alsoAccept:['les congeler','congeler les letchis','elle va les congeler'],
    hint:'Regardez la dernière phrase, après « P.-S. ». (Look at the very last lines.)',
    explanation:'« Elle dit qu’elle va les <b>congeler</b>. » Congeler, c’est garder un aliment dans le congélateur. (To freeze.)' }),

  makeText({ id:'g7fr-rcp-002-o5', chapterId:CH, difficulty:3, subsection:'idee_principale',
    question:_P2 + 'Ce courriel sert surtout à informer, à raconter ou à vendre ? Écrivez un seul mot.',
    answer:'raconter', alsoAccept:['à raconter','il raconte','elle raconte'],
    hint:'Demandez-vous si Anjali donne des règles, propose un produit, ou décrit ce qui lui est arrivé. (Rules, a product, or events?)',
    explanation:'Anjali <b>raconte</b> : elle décrit dans l’ordre ce qui lui est arrivé pendant sa semaine (le bus, le cours d’espagnol, les matières, ses deux amies). Elle ne vend rien et ne donne aucune consigne. (It is a personal recount.)' })
);

// ══ TEXTE 3 · ARTICLE DE JOURNAL · nettoyage de plage ═════════════════════
const _P3 = box(`
<b style="color:#1e40af">Lisez l’article, puis répondez à la question.</b><br><br>
<b>Deux cents sacs en trois heures : les jeunes nettoient la plage de Blue Bay</b><br><br>
<i>Blue Bay, samedi.</i> — Ils étaient cent trente-deux, la plupart âgés de onze à seize ans, à se retrouver sur le parking de la plage publique de Blue Bay à sept heures du matin. Trois heures plus tard, ils avaient rempli deux cent quatre sacs de déchets.<br><br>
L’opération, organisée par le club environnement du collège de Mahébourg avec l’aide de deux associations locales, se répète chaque premier samedi du mois depuis février. « Au début, nous ramassions surtout des bouteilles et des sacs en plastique », explique Mme Sunita Jhurry, professeure de biologie et responsable du club. « Aujourd’hui, ce qui domine, ce sont les petits morceaux : bouchons, pailles, emballages de bonbons, morceaux de filet. Ils sont plus difficiles à voir et beaucoup plus dangereux pour les poissons. »<br><br>
Le tri effectué à la fin de la matinée donne une idée du problème. Sur les 204 sacs, 118 contenaient du plastique, 41 du verre, 23 du métal et 22 des déchets divers. Autrement dit, près de six sacs sur dix étaient remplis de plastique.<br><br>
Les organisateurs insistent : ramasser ne suffit pas. « Nous revenons au même endroit tous les mois et nous ramassons presque la même quantité », reconnaît Kevin Perrine, dix-sept ans, élève du même collège et bénévole depuis le premier jour. « Cela veut dire que le robinet coule toujours. Nous, nous passons la serpillière. »<br><br>
Le club a donc lancé, en juin, une seconde action, moins visible mais peut-être plus utile : des visites dans les écoles primaires de la région. Les élèves y présentent une expérience simple. Ils placent un morceau de sac plastique dans un bocal d’eau de mer, puis le montrent aux enfants six semaines plus tard. Le sac n’a pas changé.<br><br>
Selon les chiffres cités par les associations, un sac en plastique met plusieurs centaines d’années à disparaître, et une bouteille peut rester dans la mer bien plus longtemps encore. Les tortues, elles, confondent les sacs flottants avec des méduses et les avalent.<br><br>
La municipalité a annoncé l’installation de six poubelles supplémentaires sur le site avant la fin de l’année, ainsi qu’un panneau d’information à l’entrée du parking. Les bénévoles, eux, demandent autre chose : que les commerçants du bord de mer cessent de distribuer des pailles et des couverts en plastique.<br><br>
« Une plage propre, ce n’est pas une plage nettoyée », conclut Mme Jhurry. « C’est une plage que personne n’a salie. »<br><br>
Prochaine sortie : le premier samedi d’octobre, à sept heures, sur le même parking. Le club demande aux participants d’apporter des gants, une casquette et une bouteille d’eau réutilisable.
`, '#2563eb');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7fr-rcp-003-m1', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P3 + 'Combien de sacs de déchets les jeunes ont-ils remplis ?',
    options:['204','132','118','241'],
    answer:'204',
    hint:'Attention : plusieurs nombres se ressemblent dans cet article. (Careful, several numbers look alike.)',
    explanation:'« Trois heures plus tard, ils avaient rempli <b>deux cent quatre</b> sacs de déchets. » 132 est le nombre de participants, 118 le nombre de sacs de plastique. (204 bags in all.)' }),

  makeMCQ({ id:'g7fr-rcp-003-m2', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P3 + 'Quelle matière remplissait le plus grand nombre de sacs ?',
    options:['le plastique','le verre','le métal','le papier'],
    answer:'le plastique',
    hint:'Le paragraphe sur le tri donne quatre chiffres. Comparez-les. (The sorting paragraph gives four figures.)',
    explanation:'« Sur les 204 sacs, <b>118 contenaient du plastique</b>, 41 du verre, 23 du métal et 22 des déchets divers », soit près de six sacs sur dix. (Plastic filled the most bags.)' }),

  makeMCQ({ id:'g7fr-rcp-003-m3', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P3 + 'Dans « ce qui domine, ce sont les petits morceaux », que veut dire « domine » ?',
    options:['être le plus nombreux','être le plus lourd','être le plus propre','être le plus profond'],
    answer:'être le plus nombreux',
    hint:'Mme Jhurry compare ce qu’elle trouvait avant et ce qu’elle trouve aujourd’hui. (She compares then and now.)',
    explanation:'Ce qui « domine » est ce qu’on trouve <b>en plus grande quantité</b>. Autrefois les bouteilles dominaient ; aujourd’hui, ce sont les bouchons, pailles et emballages. (What is most numerous.)' }),

  makeMCQ({ id:'g7fr-rcp-003-m4', chapterId:CH, difficulty:3, subsection:'idee_principale',
    question:_P3 + 'Quel est le message principal de cet article ?',
    options:['Ramasser ne suffit pas à régler le problème.','La plage de Blue Bay est la plus sale du pays.','Les tortues préfèrent manger des méduses.','Le club veut acheter six nouvelles poubelles.'],
    answer:'Ramasser ne suffit pas à régler le problème.',
    hint:'Une phrase courte, placée au milieu de l’article, résume la position des organisateurs. (One short sentence sums up their position.)',
    explanation:'« Les organisateurs insistent : <b>ramasser ne suffit pas</b>. » Toute la suite (les visites dans les écoles, la demande faite aux commerçants) développe cette idée. (Picking up litter is not enough.)' }),

  makeMCQ({ id:'g7fr-rcp-003-m5', chapterId:CH, difficulty:4, subsection:'idee_principale',
    question:_P3 + 'Que veut dire Kevin Perrine par « le robinet coule toujours » ?',
    options:['Les déchets continuent d’arriver.','L’eau de la plage est gaspillée.','Les bénévoles manquent de matériel.','La municipalité oublie ses promesses.'],
    answer:'Les déchets continuent d’arriver.',
    hint:'Il ajoute aussitôt : « Nous, nous passons la serpillière. » (He adds that they are only mopping the floor.)',
    explanation:'Passer la serpillière sans fermer le robinet ne sert à rien : le sol se remouille aussitôt. De même, ramasser les déchets ne change rien tant que <b>de nouveaux déchets arrivent</b>. (The source of the litter has not been stopped.)' }),

  makeText({ id:'g7fr-rcp-003-o1', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P3 + 'Combien de jeunes ont participé au nettoyage ? Écrivez le nombre.',
    answer:'132', alsoAccept:['cent trente-deux','132 jeunes','cent trente deux'],
    hint:'Ce nombre est le tout premier de l’article. (It is the first figure in the article.)',
    explanation:'« Ils étaient <b>cent trente-deux</b>, la plupart âgés de onze à seize ans. » (132 young people took part.)' }),

  makeText({ id:'g7fr-rcp-003-o2', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P3 + 'Sur quelle plage le nettoyage a-t-il eu lieu ? (trois mots au maximum)',
    answer:'Blue Bay', alsoAccept:['à Blue Bay','la plage de Blue Bay','Blue-Bay'],
    hint:'Le lieu est donné dans le titre et répété au début. (The place is in the headline.)',
    explanation:'Le titre annonce « les jeunes nettoient la plage de <b>Blue Bay</b> », et l’article commence par la même indication. (Blue Bay, near Mahébourg.)' }),

  makeText({ id:'g7fr-rcp-003-o3', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P3 + 'Quel mot de l’article désigne l’action de séparer les déchets selon leur matière ? (deux mots au maximum)',
    answer:'le tri', alsoAccept:['tri','trier','un tri'],
    hint:'Ce mot ouvre le paragraphe des chiffres. (The word opens the paragraph of figures.)',
    explanation:'« Le <b>tri</b> effectué à la fin de la matinée donne une idée du problème. » Trier, c’est séparer le plastique, le verre et le métal. (Sorting.)' }),

  makeText({ id:'g7fr-rcp-003-o4', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P3 + 'Quel mot de l’article désigne une personne qui aide sans être payée ? (un seul mot)',
    answer:'bénévole', alsoAccept:['un bénévole','les bénévoles','bénévoles'],
    hint:'Kevin Perrine est présenté ainsi, et le mot revient à l’avant-dernier paragraphe. (Kevin is described with this word.)',
    explanation:'« Kevin Perrine, dix-sept ans, élève du même collège et <b>bénévole</b> depuis le premier jour. » Un bénévole travaille gratuitement. (A volunteer.)' }),

  makeText({ id:'g7fr-rcp-003-o5', chapterId:CH, difficulty:3, subsection:'idee_principale',
    question:_P3 + 'Quel est le problème principal décrit dans l’article ? (trois mots au maximum)',
    answer:'les déchets plastiques', alsoAccept:['le plastique','la pollution plastique','les plastiques','la pollution'],
    hint:'Regardez quelle matière revient dans presque tous les paragraphes. (Which material comes back everywhere?)',
    explanation:'Le plastique remplit 118 sacs sur 204, ne disparaît pas dans l’eau de mer, tue les tortues, et c’est lui que les bénévoles veulent faire interdire. (Plastic waste is the article’s subject.)' })
);

// ══ TEXTE 4 · AFFICHE (annonce-programme) · Fête du séga ══════════════════
// ⚠ Une affiche est normalement plus courte qu’un récit. Celle-ci est une
//   affiche-programme : horaires, tarifs, consignes et transport, ce qui la
//   porte à la longueur d’examen sans devenir un texte suivi artificiel.
const _P4 = box(`
<b style="color:#1e40af">Lisez l’affiche, puis répondez à la question.</b><br><br>
<b>FÊTE DU SÉGA — 14e ÉDITION</b><br>
Terrain de football de Bel-Air Rivière-Sèche · Samedi 18 octobre, de 15 h à 22 h<br><br>
<i>Quatorze ans que le village danse. Venez danser aussi.</i><br><br>
<b>AU PROGRAMME</b><br>
15 h 00 — Ouverture. Atelier de ravanne pour les débutants, sous le manguier. Douze instruments sont prêtés ; les autres participants apprennent sur la maravanne et le triangle.<br>
16 h 00 — Concours de jeunes talents. Ouvert aux enfants de 8 à 15 ans, seuls ou en groupe de quatre au maximum. Inscription gratuite jusqu’au 10 octobre, à la bibliothèque du village.<br>
17 h 30 — « Le séga d’avant ». Cinq grands-mères du village, dont Mme Rosemay Ithier, 81 ans, racontent et chantent les ségas qu’elles ont appris enfants. Séance enregistrée par le club d’histoire du collège.<br>
18 h 30 — Repas. Riz frit, gâteaux piment, dholl puri, achards. Comptoir tenu par les parents d’élèves. Rs 60 l’assiette.<br>
20 h 00 — Grand concert. Groupe Zenfan Later, puis feu de camp et séga jusqu’à 22 h.<br><br>
<b>ENTRÉE</b><br>
Gratuite pour les moins de 12 ans. Rs 50 pour les autres. Les billets s’achètent à l’entrée, en espèces uniquement. Aucun billet n’est vendu à l’avance.<br><br>
<b>CE QU’IL FAUT APPORTER</b><br>
Une natte ou une chaise pliante : il n’y a que deux cents places assises. Une lampe de poche pour le retour, car l’éclairage de la route s’arrête au pont. Une bouteille : l’eau est gratuite au robinet, près des vestiaires.<br><br>
<b>CE QU’IL NE FAUT PAS APPORTER</b><br>
Ni bouteilles en verre, ni pétards, ni animaux. Le terrain reste un terrain de sport : les crampons et les vélos restent dehors.<br><br>
<b>EN CAS DE PLUIE</b><br>
La fête est reportée au samedi suivant, à la même heure. En cas d’avis de cyclone de classe 2 ou plus, elle est annulée et l’argent des repas déjà commandés est rendu. L’information est donnée sur la page du village et affichée à la boutique de M. Ah-Foon.<br><br>
<b>TRANSPORT</b><br>
Le dernier bus pour Curepipe part à 21 h 15 de l’arrêt du pont, à sept minutes à pied du terrain. Après cette heure, il n’y a plus de bus. Un service de covoiturage est organisé par le comité : inscrivez-vous à la bibliothèque avant le 15 octobre.<br><br>
<b>BÉNÉVOLES DEMANDÉS</b><br>
Nous cherchons douze personnes pour le montage du vendredi après-midi et huit pour le rangement du dimanche matin. Le repas du samedi leur est offert.<br><br>
Renseignements : comité de la fête, bibliothèque du village, du lundi au vendredi, de 14 h à 17 h.
`, '#2563eb');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7fr-rcp-004-m1', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P4 + 'À quelle heure commence le grand concert ?',
    options:['20 h 00','15 h 00','17 h 30','18 h 30'],
    answer:'20 h 00',
    hint:'Suivez le programme jusqu’à la dernière ligne des horaires. (Read down the programme.)',
    explanation:'« <b>20 h 00</b> — Grand concert. Groupe Zenfan Later, puis feu de camp et séga jusqu’à 22 h. » (The concert starts at 8 p.m.)' }),

  makeMCQ({ id:'g7fr-rcp-004-m2', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P4 + 'Que se passe-t-il si un avis de cyclone de classe 2 est annoncé ?',
    options:['La fête est annulée.','La fête est avancée.','La fête a lieu en salle.','La fête dure moins longtemps.'],
    answer:'La fête est annulée.',
    hint:'Lisez la rubrique « EN CAS DE PLUIE » jusqu’au bout : la pluie et le cyclone n’ont pas le même effet. (Rain and a cyclone are treated differently.)',
    explanation:'« En cas d’avis de cyclone de classe 2 ou plus, elle est <b>annulée</b> et l’argent des repas déjà commandés est rendu. » Seule la pluie entraîne un report. (A class 2 warning cancels it outright.)' }),

  makeMCQ({ id:'g7fr-rcp-004-m3', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P4 + 'Les billets se paient « en espèces uniquement ». Cela veut dire :',
    options:['en argent liquide','par carte bancaire','par chèque signé','par téléphone'],
    answer:'en argent liquide',
    hint:'L’affiche précise aussi qu’aucun billet n’est vendu à l’avance. (No advance sales either.)',
    explanation:'Payer « en espèces », c’est payer avec des <b>pièces et des billets</b>, sur place. Ni carte, ni chèque, ni virement. (Cash only.)' }),

  makeMCQ({ id:'g7fr-rcp-004-m4', chapterId:CH, difficulty:3, subsection:'idee_principale',
    question:_P4 + 'Pourquoi l’affiche conseille-t-elle d’apporter une lampe de poche ?',
    options:['La route n’est pas éclairée.','Le terrain ferme très tôt.','Le concert se joue dans le noir.','Les bénévoles en manquent.'],
    answer:'La route n’est pas éclairée.',
    hint:'La raison est donnée dans la même phrase que le conseil. (The reason follows the advice in the same sentence.)',
    explanation:'« Une lampe de poche pour le retour, car <b>l’éclairage de la route s’arrête au pont</b>. » La fête finit à 22 h : on rentre dans le noir. (The street lighting stops at the bridge.)' }),

  makeMCQ({ id:'g7fr-rcp-004-m5', chapterId:CH, difficulty:4, subsection:'idee_principale',
    question:_P4 + 'Quel est le but principal de cette affiche ?',
    options:['Annoncer une fête et son programme.','Raconter la fête de l’an dernier.','Expliquer comment danser le séga.','Présenter le village de Bel-Air.'],
    answer:'Annoncer une fête et son programme.',
    hint:'Demandez-vous ce que le lecteur doit faire après avoir lu. (What is the reader meant to do?)',
    explanation:'Une affiche <b>annonce</b> : elle donne la date, le lieu, les horaires, les tarifs et les consignes pour que le lecteur puisse venir. Elle ne raconte rien et n’enseigne pas la danse. (It advertises the event.)' }),

  makeText({ id:'g7fr-rcp-004-o1', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P4 + 'Quel jour la fête a-t-elle lieu ? (trois mots au maximum)',
    answer:'samedi 18 octobre', alsoAccept:['le 18 octobre','18 octobre','samedi'],
    hint:'La date est écrite juste sous le titre. (The date sits under the title.)',
    explanation:'« Terrain de football de Bel-Air Rivière-Sèche · <b>Samedi 18 octobre</b>, de 15 h à 22 h. » (Saturday 18 October.)' }),

  makeText({ id:'g7fr-rcp-004-o2', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P4 + 'À quelle heure part le dernier bus pour Curepipe ?',
    answer:'21 h 15', alsoAccept:['21h15','21:15','neuf heures et quart'],
    hint:'Lisez la rubrique « TRANSPORT ». (Read the transport section.)',
    explanation:'« Le dernier bus pour Curepipe part à <b>21 h 15</b> de l’arrêt du pont. » Après cette heure, il n’y a plus de bus. (The last bus leaves at 9:15 p.m.)' }),

  makeText({ id:'g7fr-rcp-004-o3', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P4 + 'Quel mot de l’affiche signifie que la fête est remise à plus tard ? (un seul mot)',
    answer:'reportée', alsoAccept:['reporté','elle est reportée','report'],
    hint:'Cherchez sous le titre « EN CAS DE PLUIE ». (Look under the rain heading.)',
    explanation:'« La fête est <b>reportée</b> au samedi suivant, à la même heure. » Reporter, c’est déplacer à une date plus tardive, sans annuler. (Postponed.)' }),

  makeText({ id:'g7fr-rcp-004-o4', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P4 + 'Quel mot de l’affiche désigne le fait de partager une voiture pour rentrer ? (un seul mot)',
    answer:'covoiturage', alsoAccept:['le covoiturage','un covoiturage','du covoiturage'],
    hint:'Ce mot se trouve dans la rubrique « TRANSPORT », après l’horaire du bus. (Transport section, after the bus time.)',
    explanation:'« Un service de <b>covoiturage</b> est organisé par le comité. » Le covoiturage, c’est voyager à plusieurs dans la même voiture. (Car-sharing.)' }),

  makeText({ id:'g7fr-rcp-004-o5', chapterId:CH, difficulty:3, subsection:'idee_principale',
    question:_P4 + 'Cette affiche s’adresse-t-elle surtout aux touristes, aux villageois ou aux professeurs ? Écrivez un seul mot.',
    answer:'villageois', alsoAccept:['aux villageois','les villageois','au village'],
    hint:'Regardez qui tient le comptoir, qui chante à 17 h 30 et où l’on s’inscrit. (Who runs the stall and who sings?)',
    explanation:'Tout est local : la bibliothèque du village, les parents d’élèves, cinq grands-mères du village, la boutique de M. Ah-Foon. L’affiche parle aux <b>habitants du village</b>. (It is aimed at the villagers.)' })
);

// ══ TEXTE 5 · TEXTE DOCUMENTAIRE · « Le letchi, l’arbre qui décide » ══════
const _P5 = box(`
<b style="color:#1e40af">Lisez le texte documentaire, puis répondez à la question.</b><br><br>
<b>Le letchi, l’arbre qui décide</b><br><br>
Chaque année, à Maurice, la même question revient dans les cours d’école et sur les marchés à partir du mois de novembre : « Est-ce qu’il y aura des letchis pour Noël ? » La réponse ne dépend ni des marchands ni des planteurs. Elle dépend du temps qu’il a fait plusieurs mois plus tôt.<br><br>
Le letchi n’est pas un arbre mauricien. Il vient du sud de la Chine, où on le cultive depuis plus de deux mille ans. Il est arrivé dans l’océan Indien il y a environ deux siècles et il s’est si bien installé à Maurice que beaucoup de familles en possèdent un dans leur cour.<br><br>
L’arbre est facile à reconnaître. Il est large, très dense, et ses feuilles restent vert foncé toute l’année. Il peut vivre plus de cent ans et atteindre douze mètres de haut. Ses fruits poussent en grappes ; chacun est protégé par une peau rouge et rugueuse qui se casse entre les doigts. À l’intérieur, la chair est blanche, translucide et sucrée, et elle entoure un seul gros noyau brun.<br><br>
Ce qui rend le letchi capricieux, c’est sa floraison. Pour donner des fleurs, l’arbre a besoin de plusieurs semaines fraîches et plutôt sèches pendant l’hiver austral, c’est-à-dire entre juin et août. Si l’hiver a été trop doux ou trop pluvieux, l’arbre produit des feuilles au lieu de fleurs, et il n’y aura presque pas de fruits en décembre. Un planteur peut soigner son arbre parfaitement toute l’année et récolter très peu : c’est l’hiver qui décide.<br><br>
Quand la floraison réussit, les fleurs, petites et jaunâtres, apparaissent vers le mois de septembre. Les abeilles font le reste. Les fruits mûrissent ensuite en une dizaine de semaines, et la récolte tombe presque toujours entre la mi-décembre et la mi-janvier, donc exactement au moment des fêtes : cela explique le prix.<br><br>
Les planteurs ont un autre adversaire : les oiseaux, et surtout les roussettes, ces grandes chauves-souris frugivores qui travaillent la nuit. Beaucoup de propriétaires couvrent leurs arbres de filets, ou attachent des sacs autour des plus belles grappes. Un arbre bien couvert peut donner plus de cent kilos de fruits.<br><br>
Il faut savoir enfin que le letchi ne mûrit plus une fois cueilli. Une grappe ramassée trop tôt restera acide, quoi qu’on fasse. C’est pourquoi les vendeurs du marché de Port-Louis laissent souvent goûter un fruit avant l’achat : le client ne vérifie pas la fraîcheur, il vérifie la maturité au moment de la cueillette.<br><br>
Ainsi, derrière un simple fruit rouge vendu par grappes au bord de la route, il y a un hiver, des abeilles, des filets et beaucoup de patience.
`, '#2563eb');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7fr-rcp-005-m1', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P5 + 'D’où vient le letchi à l’origine ?',
    options:['du sud de la Chine','du nord de l’Inde','du sud du Brésil','de Madagascar'],
    answer:'du sud de la Chine',
    hint:'La réponse est dans le deuxième paragraphe. (The answer is in the second paragraph.)',
    explanation:'« Il vient du <b>sud de la Chine</b>, où on le cultive depuis plus de deux mille ans. » Il n’est arrivé à Maurice qu’il y a environ deux siècles. (It comes from southern China.)' }),

  makeMCQ({ id:'g7fr-rcp-005-m2', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P5 + 'De quel temps l’arbre a-t-il besoin en hiver pour donner des fleurs ?',
    options:['de semaines fraîches et sèches','de semaines chaudes et humides','de beaucoup de pluie tiède','de vents forts et réguliers'],
    answer:'de semaines fraîches et sèches',
    hint:'Le paragraphe sur la floraison donne la condition exacte. (The flowering paragraph gives the condition.)',
    explanation:'« l’arbre a besoin de plusieurs semaines <b>fraîches et plutôt sèches</b> pendant l’hiver austral ». Un hiver trop doux ou trop pluvieux donne des feuilles au lieu de fleurs. (Cool, dry weeks.)' }),

  makeMCQ({ id:'g7fr-rcp-005-m3', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P5 + 'Dire que le letchi est « capricieux » signifie qu’il :',
    options:['ne donne pas toujours des fruits','pousse seulement en montagne','demande beaucoup d’engrais','meurt avant l’âge de dix ans'],
    answer:'ne donne pas toujours des fruits',
    hint:'Lisez la phrase qui suit immédiatement le mot. (Read the sentence right after the word.)',
    explanation:'Un arbre capricieux est un arbre <b>irrégulier, imprévisible</b> : « Un planteur peut soigner son arbre parfaitement toute l’année et récolter très peu. » (Unpredictable from year to year.)' }),

  makeMCQ({ id:'g7fr-rcp-005-m4', chapterId:CH, difficulty:3, subsection:'idee_principale',
    question:_P5 + 'Quelle est l’idée principale de ce texte ?',
    options:['La récolte dépend surtout de l’hiver.','Les oiseaux mangent tous les letchis.','Le letchi coûte cher au mois de mai.','Le letchi vient d’Afrique du Sud.'],
    answer:'La récolte dépend surtout de l’hiver.',
    hint:'Relisez le titre, puis la dernière phrase du quatrième paragraphe. (Look at the title, then the fourth paragraph.)',
    explanation:'Le titre l’annonce déjà : « l’arbre qui décide ». Le texte le dit ensuite en clair : « c’est <b>l’hiver qui décide</b> ». Les oiseaux et les filets ne sont qu’un problème secondaire. (Winter weather decides the crop.)' }),

  makeMCQ({ id:'g7fr-rcp-005-m5', chapterId:CH, difficulty:4, subsection:'idee_principale',
    question:_P5 + 'Pourquoi les vendeurs du marché laissent-ils goûter un letchi avant l’achat ?',
    options:['Un letchi cueilli trop tôt reste acide.','Un letchi se conserve mieux au marché.','Le client choisit ainsi sa couleur.','Le vendeur veut vider son panier.'],
    answer:'Un letchi cueilli trop tôt reste acide.',
    hint:'Le dernier paragraphe explique ce que le letchi ne peut pas faire après la cueillette. (What can the fruit no longer do?)',
    explanation:'« le letchi <b>ne mûrit plus une fois cueilli</b>. Une grappe ramassée trop tôt restera acide. » Goûter est le seul moyen de le savoir. (Tasting is the only test.)' }),

  makeText({ id:'g7fr-rcp-005-o1', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P5 + 'En quel mois la récolte des letchis commence-t-elle surtout ? (un seul mot)',
    answer:'décembre', alsoAccept:['en décembre','mi-décembre','décembre et janvier'],
    hint:'Le texte donne la période exacte de la récolte. (The text gives the harvest window.)',
    explanation:'« la récolte tombe presque toujours entre la <b>mi-décembre</b> et la mi-janvier », c’est-à-dire au moment des fêtes. (Mid-December to mid-January.)' }),

  makeText({ id:'g7fr-rcp-005-o2', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P5 + 'Combien de kilos de fruits un arbre bien couvert peut-il donner ? (quatre mots au maximum)',
    answer:'plus de cent kilos', alsoAccept:['cent kilos','100 kilos','plus de 100 kilos'],
    hint:'Le chiffre est donné juste après la phrase sur les filets. (The figure follows the sentence about nets.)',
    explanation:'« Un arbre bien couvert peut donner <b>plus de cent kilos</b> de fruits. » (More than a hundred kilos.)' }),

  makeText({ id:'g7fr-rcp-005-o3', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P5 + 'Quel mot du texte désigne les grandes chauves-souris qui mangent les fruits la nuit ? (un seul mot)',
    answer:'roussettes', alsoAccept:['les roussettes','des roussettes','roussette'],
    hint:'Ce mot est expliqué dans la phrase même où il apparaît. (The word is explained in its own sentence.)',
    explanation:'« les oiseaux, et surtout les <b>roussettes</b>, ces grandes chauves-souris frugivores qui travaillent la nuit ». « Frugivore » veut dire qui mange des fruits. (Fruit bats.)' }),

  makeText({ id:'g7fr-rcp-005-o4', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P5 + 'Quel verbe du texte signifie « devenir mûr » ? (un seul mot)',
    answer:'mûrir', alsoAccept:['mûrissent','mûrit','mûrissant'],
    hint:'Ce verbe apparaît deux fois : au sujet des fruits, puis à propos de la cueillette. (The verb appears twice.)',
    explanation:'« Les fruits <b>mûrissent</b> ensuite en une dizaine de semaines » et « le letchi ne <b>mûrit</b> plus une fois cueilli ». (To ripen.)' }),

  makeText({ id:'g7fr-rcp-005-o5', chapterId:CH, difficulty:4, subsection:'idee_principale',
    question:_P5 + 'Selon le texte, qu’est-ce qui décide vraiment s’il y aura des letchis pour Noël ? (deux mots au maximum)',
    answer:'l’hiver', alsoAccept:['hiver','le temps','la météo','le climat'],
    hint:'Le titre du texte contient déjà un indice. (The title is already a clue.)',
    explanation:'« La réponse ne dépend ni des marchands ni des planteurs. » et plus loin : « c’est <b>l’hiver qui décide</b> ». Sans semaines fraîches et sèches, pas de fleurs, donc pas de fruits. (The winter weather decides.)' })
);

// ══ TEXTE 6 · ENTRETIEN · une prévisionniste et les classes de cyclone ════
const _P6 = box(`
<b style="color:#1e40af">Lisez l’entretien, puis répondez à la question.</b><br><br>
<b>« Une classe 3 n’est pas une classe 4 »</b><br>
<i>Propos recueillis par le journal du collège.</i><br><br>
Nous avons rencontré Mme Fabiola Rousset, prévisionniste à la station météorologique, deux jours après le passage du cyclone Berenice.<br><br>
<b>Le journal :</b> Beaucoup d’élèves croient que la classe d’un avis indique la force du cyclone. Est-ce exact ?<br>
<b>Mme Rousset :</b> Non, et c’est le malentendu le plus répandu. Les classes ne mesurent pas la force du vent : elles mesurent le temps qu’il vous reste. Une classe 1 signifie qu’un cyclone peut menacer Maurice dans les quarante-huit prochaines heures. Une classe 2 veut dire que des vents dangereux sont attendus dans les douze heures. Une classe 3, dans les six heures. Une classe 4 veut dire que les vents dangereux soufflent déjà.<br><br>
<b>Le journal :</b> Que doit faire une famille dès la classe 2 ?<br>
<b>Mme Rousset :</b> Tout ce qui demande de sortir. Rentrer le linge, ranger les tôles, les seaux, les chaises de jardin, tout ce qui peut voler. Remplir des bouteilles d’eau. Charger les téléphones. Vérifier la lampe de poche, et surtout ses piles. En classe 3, on ne sort plus si l’on peut l’éviter ; en classe 4, on ne sort plus du tout.<br><br>
<b>Le journal :</b> Pourquoi certaines personnes sortent-elles quand même ?<br>
<b>Mme Rousset :</b> À cause de l’œil. Le centre du cyclone est calme. Le vent tombe, le soleil revient parfois, et les gens pensent que c’est fini. Puis le mur de l’œil arrive, et le vent souffle dans l’autre sens, souvent plus fort qu’avant. Les accidents les plus graves arrivent à ce moment-là. Tant que l’avis de classe 4 n’est pas levé, la fin n’est pas la fin.<br><br>
<b>Le journal :</b> Comment prévoit-on la trajectoire d’un cyclone ?<br>
<b>Mme Rousset :</b> Avec les images des satellites, les mesures des bouées, les ballons-sondes que nous lâchons deux fois par jour, et des modèles informatiques qui calculent plusieurs chemins possibles. Nous ne donnons jamais une seule ligne : nous donnons un cône. Plus le cyclone est loin, plus le cône est large.<br><br>
<b>Le journal :</b> Quelle erreur les élèves commettent-ils le plus souvent ?<br>
<b>Mme Rousset :</b> Regarder uniquement le vent. La pluie tue davantage. Un cyclone lent qui reste deux jours au large peut noyer une région sans jamais casser un arbre.<br><br>
<b>Le journal :</b> Un dernier conseil ?<br>
<b>Mme Rousset :</b> Écoutez la radio, pas les messages qui circulent sur les téléphones. Chaque fois qu’un cyclone approche, quelqu’un annonce une classe 4 qui n’existe pas. Les avis officiels sont diffusés à des heures précises. Attendez-les.
`, '#2563eb');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7fr-rcp-006-m1', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P6 + 'Que signifie un avis de cyclone de classe 3 ?',
    options:['Vents dangereux dans six heures.','Vents dangereux dans douze heures.','Vents dangereux dans deux jours.','Vents dangereux déjà présents.'],
    answer:'Vents dangereux dans six heures.',
    hint:'Les quatre classes sont expliquées l’une après l’autre dans la première réponse. (All four classes are listed in the first answer.)',
    explanation:'« Une classe 2 veut dire que des vents dangereux sont attendus dans les douze heures. Une <b>classe 3, dans les six heures</b>. » (Class 3 = dangerous winds within six hours.)' }),

  makeMCQ({ id:'g7fr-rcp-006-m2', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P6 + 'Quelle classe indique que les vents dangereux soufflent déjà ?',
    options:['la classe 4','la classe 3','la classe 2','la classe 1'],
    answer:'la classe 4',
    hint:'C’est la dernière classe citée par Mme Rousset. (It is the last class she names.)',
    explanation:'« Une <b>classe 4</b> veut dire que les vents dangereux soufflent déjà. » C’est pourquoi, en classe 4, on ne sort plus du tout. (Class 4 means the winds are already blowing.)' }),

  makeMCQ({ id:'g7fr-rcp-006-m3', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P6 + 'Dans « tant que l’avis de classe 4 n’est pas levé », que veut dire « levé » ?',
    options:['annulé','répété','signé','affiché'],
    answer:'annulé',
    hint:'Un avis « levé » n’est plus en vigueur. (A warning that is lifted no longer applies.)',
    explanation:'« Lever un avis », c’est le <b>retirer</b>, mettre fin à l’alerte. Tant qu’il n’est pas levé, le danger continue, même si le vent est tombé. (To lift a warning.)' }),

  makeMCQ({ id:'g7fr-rcp-006-m4', chapterId:CH, difficulty:3, subsection:'idee_principale',
    question:_P6 + 'Quel est le but principal de cet entretien ?',
    options:['Expliquer ce que veulent dire les classes.','Raconter l’histoire du cyclone Berenice.','Vendre des lampes et des piles neuves.','Décrire le métier des satellites.'],
    answer:'Expliquer ce que veulent dire les classes.',
    hint:'Regardez le titre et la toute première question posée. (Look at the title and the first question.)',
    explanation:'Le titre annonce « Une classe 3 n’est pas une classe 4 », et la première réponse corrige « le malentendu le plus répandu ». L’entretien sert à <b>expliquer</b>. (It explains what the classes mean.)' }),

  makeMCQ({ id:'g7fr-rcp-006-m5', chapterId:CH, difficulty:4, subsection:'idee_principale',
    question:_P6 + 'Pourquoi Mme Rousset dit-elle que « la fin n’est pas la fin » ?',
    options:['Le vent revient après l’œil.','La pluie dure plusieurs jours.','Les avis sortent toujours trop tard.','Le cône devient de plus en plus large.'],
    answer:'Le vent revient après l’œil.',
    hint:'Elle vient d’expliquer ce qui se passe quand le mur de l’œil arrive. (She has just described the eye wall.)',
    explanation:'« Le vent tombe, le soleil revient parfois, et les gens pensent que c’est fini. Puis <b>le mur de l’œil arrive, et le vent souffle dans l’autre sens</b>, souvent plus fort. » Le calme est trompeur. (The calm eye is not the end.)' }),

  makeText({ id:'g7fr-rcp-006-o1', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P6 + 'Combien de temps reste-t-il, en principe, lorsqu’un avis de classe 2 est annoncé ? (trois mots au maximum)',
    answer:'douze heures', alsoAccept:['12 heures','environ douze heures','moins de douze heures'],
    hint:'Comparez les quatre classes dans la première réponse. (Compare the four classes.)',
    explanation:'« Une classe 2 veut dire que des vents dangereux sont attendus dans les <b>douze heures</b>. » (Twelve hours.)' }),

  makeText({ id:'g7fr-rcp-006-o2', chapterId:CH, difficulty:2, subsection:'information_explicite',
    question:_P6 + 'Combien de fois par jour la station lâche-t-elle des ballons-sondes ? (trois mots au maximum)',
    answer:'deux fois', alsoAccept:['2 fois','deux','deux fois par jour'],
    hint:'La réponse est dans le paragraphe sur la trajectoire. (It is in the paragraph about forecasting.)',
    explanation:'« les ballons-sondes que nous lâchons <b>deux fois par jour</b> ». (Twice a day.)' }),

  makeText({ id:'g7fr-rcp-006-o3', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P6 + 'Quel mot de l’entretien désigne le chemin que suit un cyclone ? (un seul mot)',
    answer:'trajectoire', alsoAccept:['la trajectoire','sa trajectoire','une trajectoire'],
    hint:'Le journal emploie ce mot dans une de ses questions. (The interviewer uses the word.)',
    explanation:'« Comment prévoit-on la <b>trajectoire</b> d’un cyclone ? » La trajectoire est le chemin suivi ; les prévisionnistes en donnent un cône, pas une ligne. (The track.)' }),

  makeText({ id:'g7fr-rcp-006-o4', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P6 + 'Quel mot de l’entretien désigne le centre calme d’un cyclone ? (deux mots au maximum)',
    answer:'l’œil', alsoAccept:['œil','oeil','l’oeil','le centre'],
    hint:'C’est une partie du corps qui donne son nom à cette zone. (A part of the body gives the name.)',
    explanation:'« À cause de l’<b>œil</b>. Le centre du cyclone est calme. » Autour de lui se trouve le mur de l’œil, où le vent est le plus violent. (The eye of the storm.)' }),

  makeText({ id:'g7fr-rcp-006-o5', chapterId:CH, difficulty:3, subsection:'idee_principale',
    question:_P6 + 'Quel dernier conseil Mme Rousset donne-t-elle ? (trois mots au maximum)',
    answer:'écouter la radio', alsoAccept:['la radio','écoutez la radio','suivre la radio'],
    hint:'C’est la toute dernière réponse de l’entretien. (It is the closing answer.)',
    explanation:'« <b>Écoutez la radio</b>, pas les messages qui circulent sur les téléphones… Les avis officiels sont diffusés à des heures précises. » (Listen to the radio, not to forwarded messages.)' })
);

})();
