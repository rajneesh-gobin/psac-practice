'use strict';
// grade8-french — compréhension écrite : 6 textes originaux, 10 questions chacun.
// IDs : g8fr-rcp-001-m1 … g8fr-rcp-006-o5
//
// Tous les textes sont ORIGINAUX et écrits pour ce dépôt. Aucun n'est copié
// d'un journal, d'un manuel ou d'un site : le contexte est mauricien (Rose-Hill,
// Beau-Bassin, Mahébourg, Blue Bay) mais les personnes, les rues, les numéros
// d'avis et les entreprises sont inventés.
//
// Les trois sous-sections déclarées du chapitre g8fr-ce décident des textes :
//   registres_langue → deux textes sur le même sujet, deux niveaux de langue
//   idee_implicite   → une publicité, un journal intime, une interview évasive
//   analyse_texte    → un éditorial construit, un avis administratif argumenté
(function () {
const CH = 'g8fr-ce';

function box(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

// ══ PASSAGE 1 · lettre officielle + message amical · registres de langue ═══
const _P1 = box(`
<b style="color:#1e40af">Lisez les deux textes, puis répondez à la question.</b><br><br>
<b>Deux façons de se plaindre</b><br><br>
Depuis trois semaines, la rue Labourdonnais, à Rose-Hill, se change en rivière dès qu’il pleut. Deux habitants du quartier ont réagi, chacun à sa manière. Voici leurs textes.<br><br>
<b>TEXTE A — Lettre adressée au Conseil municipal</b><br><br>
Rose-Hill, le 12 mars<br><br>
Monsieur le Maire,<br><br>
J’ai l’honneur de porter à votre connaissance l’état préoccupant de la chaussée de la rue Labourdonnais, dans le quartier des Trèfles.<br><br>
Depuis le 20 février, à la suite des fortes précipitations, l’eau stagne devant les numéros 14 à 22 sur une hauteur d’environ quarante centimètres. Les riverains ne peuvent plus regagner leur domicile sans traverser cette étendue d’eau. Je me permets d’ajouter que les élèves du collège voisin empruntent ce trottoir chaque matin et qu’un accident demeure possible.<br><br>
Il apparaît que les avaloirs situés à l’angle de la rue Sainte-Croix sont obstrués par des feuilles mortes et des sacs plastiques. Une intervention des services techniques permettrait sans doute de rétablir l’écoulement dans les meilleurs délais.<br><br>
Dans l’attente d’une réponse de votre part, je vous prie d’agréer, Monsieur le Maire, l’expression de ma considération distinguée.<br><br>
R. Appadoo<br><br>
<b>TEXTE B — Message envoyé à un ami</b><br><br>
Eh frère, t’as vu la rue devant chez moi ? C’est plus une rue, c’est un lagon ! Ce matin j’ai dû enlever mes souliers pour aller jusqu’à l’arrêt de bus, je te jure. Trois semaines que ça dure et personne bouge.<br><br>
Les bouches d’égout au coin, elles sont bouchées à mort : des feuilles, des sacs, même une chaise en plastique. Le vieux monsieur du 14, hier, il est sorti avec un bâton pour déboucher tout ça lui-même. À son âge ! Sa femme criait depuis la véranda qu’il allait tomber.<br><br>
Mon voisin, lui, il a écrit une belle lettre au maire, bien polie, avec des « je vous prie d’agréer » et tout le tralala. Moi j’ai pas la patience, franchement. Je vais poster une vidéo, tu vas voir, ça ira plus vite que sa lettre.<br><br>
Bref, si tu passes demain, viens en voiture. Pas à pied.<br><br>
<b>Note</b><br><br>
Les deux textes disent la même chose : la rue est inondée, les avaloirs sont bouchés, la mairie doit intervenir. Ils ne le disent pas de la même manière, et ce choix n’est pas innocent. On n’écrit pas à un maire comme on écrit à un copain, non parce que l’un mériterait plus de respect que l’autre, mais parce que chaque situation a ses codes. Le premier auteur veut être pris au sérieux par une administration ; le second veut être compris tout de suite par quelqu’un qui le connaît déjà.
`, '#2563eb');

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g8fr-rcp-001-m1', chapterId:CH, difficulty:2, subsection:'registres_langue',
    question:_P1 + 'Quel registre de langue le TEXTE A emploie-t-il ?',
    options:['le registre soutenu','le registre familier','le registre enfantin','le registre argotique'],
    answer:'le registre soutenu',
    hint:'Regardez les formules d’ouverture et de clôture de la lettre.',
    explanation:'C’est le <b>registre soutenu</b> : « J’ai l’honneur de porter à votre connaissance », « je vous prie d’agréer ». Vocabulaire choisi, phrases longues, aucune familiarité. <i>(Formal register: elevated vocabulary and set polite formulas.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-001-m2', chapterId:CH, difficulty:3, subsection:'registres_langue',
    question:_P1 + 'Laquelle de ces expressions du TEXTE B relève nettement du registre familier ?',
    options:['Eh frère, t’as vu','Depuis le 20 février','les bouches d’égout','une chaise en plastique'],
    answer:'Eh frère, t’as vu',
    hint:'Cherchez l’interpellation du tout premier mot du message.',
    explanation:'« <b>Eh frère, t’as vu</b> » : interpellation, appellatif affectueux et « tu as » réduit à « t’as ». « Bouches d’égout » est simplement du courant. <i>(Familiar register: informal address and dropped syllables.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-001-m3', chapterId:CH, difficulty:3, subsection:'analyse_texte',
    question:_P1 + 'Quelle est la fonction de la phrase « je vous prie d’agréer… » dans le TEXTE A ?',
    options:['clore poliment la lettre','résumer le problème posé','donner une date précise','exiger une réparation'],
    answer:'clore poliment la lettre',
    hint:'Regardez à quel endroit de la lettre cette phrase se trouve.',
    explanation:'C’est la <b>formule de politesse finale</b>, obligatoire dans une lettre administrative française : elle ferme le texte juste avant la signature. <i>(A fixed closing formula, not an argument.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-001-m4', chapterId:CH, difficulty:4, subsection:'idee_implicite',
    question:_P1 + 'Que laisse entendre l’auteur du TEXTE B en écrivant « ça ira plus vite que sa lettre » ?',
    options:['Il doute que la lettre serve à quelque chose.','Il trouve que la lettre est bien trop courte.','Il pense que le maire a déjà répondu au voisin.','Il veut apprendre à écrire comme son voisin.'],
    answer:'Il doute que la lettre serve à quelque chose.',
    hint:'Il compare deux moyens d’action ; lequel présente-t-il comme le plus lent ?',
    explanation:'Il ne dit pas « la lettre est inutile », il le suggère par la comparaison : si la vidéo « ira plus vite », c’est que la lettre, selon lui, n’aboutira pas. <i>(Implied: he has no faith in the official route.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-001-m5', chapterId:CH, difficulty:3, subsection:'registres_langue',
    question:_P1 + 'Pourquoi R. Appadoo a-t-il choisi ce registre plutôt qu’un autre ?',
    options:['Parce qu’il écrit à une autorité publique.','Parce qu’il connaît très bien le maire.','Parce qu’il est en colère contre son voisin.','Parce qu’il veut amuser les gens du quartier.'],
    answer:'Parce qu’il écrit à une autorité publique.',
    hint:'Demandez-vous à qui chaque texte est adressé.',
    explanation:'La note l’explique : « chaque situation a ses codes… Le premier auteur veut être pris au sérieux par une <b>administration</b>. » Le destinataire commande le registre. <i>(Register is chosen for the reader, not the mood.)</i>' }),

  makeText({ id:'g8fr-rcp-001-o1', chapterId:CH, difficulty:2, subsection:'registres_langue',
    question:_P1 + 'En un seul mot, quel registre l’auteur du TEXTE B emploie-t-il ?',
    answer:'familier', alsoAccept:['le familier','registre familier','langage familier'],
    hint:'Pensez au registre qu’on emploie avec un copain, pas avec un maire.',
    explanation:'<b>Familier</b> : « frère », « t’as », « à mort », « tout le tralala », « j’ai pas la patience ». <i>(Familiar / informal.)</i>' }),

  makeText({ id:'g8fr-rcp-001-o2', chapterId:CH, difficulty:2, subsection:'analyse_texte',
    question:_P1 + 'Nommez la rue dont il est question dans les deux textes.',
    answer:'Labourdonnais', alsoAccept:['rue Labourdonnais','la rue Labourdonnais'],
    hint:'Elle est nommée dès la première ligne de l’introduction.',
    explanation:'« la rue <b>Labourdonnais</b>, à Rose-Hill, se change en rivière dès qu’il pleut ». Le TEXTE A la nomme de nouveau au premier paragraphe. <i>(Same street in both texts.)</i>' }),

  makeText({ id:'g8fr-rcp-001-o3', chapterId:CH, difficulty:3, subsection:'idee_implicite',
    question:_P1 + 'Avec quel objet le vieux monsieur du 14 essaie-t-il de déboucher l’égout ?',
    answer:'un bâton', alsoAccept:['bâton','avec un bâton'],
    hint:'C’est raconté dans le deuxième paragraphe du TEXTE B.',
    explanation:'« il est sorti avec <b>un bâton</b> pour déboucher tout ça lui-même ». Le détail sert à montrer que personne d’officiel n’est venu. <i>(A stick — the point is that no one else came.)</i>' }),

  makeText({ id:'g8fr-rcp-001-o4', chapterId:CH, difficulty:3, subsection:'analyse_texte',
    question:_P1 + 'En deux mots, à qui la lettre du TEXTE A est-elle adressée ?',
    answer:'au maire', alsoAccept:['le maire','Monsieur le Maire','au Conseil municipal'],
    hint:'Regardez la ligne qui suit la date.',
    explanation:'« <b>Monsieur le Maire</b>, » — la lettre part au Conseil municipal de Rose-Hill. <i>(To the mayor.)</i>' }),

  makeText({ id:'g8fr-rcp-001-o5', chapterId:CH, difficulty:4, subsection:'registres_langue',
    question:_P1 + 'En quelques mots, par quel moyen l’auteur du TEXTE B compte-t-il faire réagir la mairie ?',
    answer:'une vidéo', alsoAccept:['vidéo','poster une vidéo','en postant une vidéo'],
    hint:'Il annonce son intention juste après avoir parlé de la lettre du voisin.',
    explanation:'« Je vais poster <b>une vidéo</b>, tu vas voir, ça ira plus vite que sa lettre. » Il oppose la pression publique à la voie administrative. <i>(He plans to post a video.)</i>' })
);

// ══ PASSAGE 2 · publicité · ce qu’une promesse ne promet pas ══════════════
const _P2 = box(`
<b style="color:#1e40af">Lisez cette publicité, puis répondez à la question.</b><br><br>
<b>ZAP JEUNE — le forfait qui te comprend</b><br><br>
TU EN AS ASSEZ DE COMPTER TES GIGAS ?<br><br>
Avec ZAP JEUNE, tu profites de <b>jusqu’à 100 Go</b> par mois, <b>à partir de Rs 199</b>. Oui, tu as bien lu.<br><br>
Appels illimités vers trois numéros de ton choix. Réseaux sociaux presque illimités. Un réseau parmi les plus rapides de l’île. Et, chaque vendredi, un bonus surprise que tes amis vont t’envier.<br><br>
<b>CE QUE TU FAIS AVEC 100 Go</b><br><br>
Regarder tes séries dans le bus. Envoyer les photos du week-end sans les compresser. Jouer en ligne le soir sans que la partie se coupe au pire moment. Suivre un cours de révision en vidéo la veille de l’examen. Tout cela sans regarder ton compteur toutes les cinq minutes.<br><br>
<b>TROIS RAISONS DE CHOISIR ZAP JEUNE</b><br><br>
1. Le prix. À partir de Rs 199, c’est l’un des forfaits les plus abordables du marché.<br>
2. La liberté. Tu changes de formule quand tu veux, directement depuis l’application.<br>
3. La communauté. Plus de 40 000 jeunes ont déjà rejoint ZAP JEUNE. Ils ne peuvent pas tous se tromper.<br><br>
« Depuis que je suis passé à ZAP JEUNE, je ne me pose plus de questions. » — Kévin, 15 ans (nom modifié)<br><br>
<b>ET SI TU CHANGES D’AVIS ?</b><br><br>
Aucun problème. Ton conseiller ZAP est joignable sept jours sur sept par messagerie, et la boutique de ton centre commercial t’accueille sans rendez-vous. Nous répondons en moyenne en moins de deux minutes, montre en main.<br><br>
<b>ILS EN PARLENT MIEUX QUE NOUS</b><br><br>
« Avant, je devais choisir entre appeler ma mère et finir ma série. » — Anaïs, 17 ans<br>
« Mon petit frère m’a pris mon téléphone rien que pour le forfait. » — Ryan, 16 ans<br><br>
<b>POURQUOI ATTENDRE ?</b><br><br>
Active ton forfait en trois clics sur l’application. Pas de paperasse. Pas d’attente au comptoir. Ton premier mois t’est offert si tu t’inscris avant le 30 juin.<br><br>
ZAP JEUNE. Parce que ta vie ne se met pas en pause.<br><br>
<i>Conditions, en petits caractères au bas de l’affiche :</i> offre réservée aux 13-19 ans, sur présentation d’une pièce d’identité et de l’autorisation écrite d’un parent ou tuteur. Le tarif de Rs 199 s’applique aux trois premiers mois, puis passe à Rs 349. Le volume de 100 Go correspond à l’offre maximale du forfait ZAP JEUNE PLUS, facturée séparément. Au-delà de 15 Go, la vitesse de connexion est réduite jusqu’à la fin du cycle de facturation. Les appels illimités excluent les numéros internationaux et les numéros courts. Le bonus du vendredi varie selon les stocks disponibles et ne peut être ni échangé ni remboursé. Engagement de douze mois. Frais de résiliation anticipée : Rs 600. L’offre du premier mois offert n’est pas cumulable avec une autre promotion en cours. Les témoignages reproduits sur cette affiche ont été recueillis auprès de clients volontaires ayant participé à un jeu-concours. Le délai de réponse indiqué est une moyenne constatée aux heures ouvrables.
`, '#2563eb');

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g8fr-rcp-002-m1', chapterId:CH, difficulty:3, subsection:'idee_implicite',
    question:_P2 + 'Que signifie exactement la formule « jusqu’à 100 Go » ?',
    options:['on peut recevoir bien moins','on reçoit toujours 100 Go','on reçoit au moins 100 Go','on peut recevoir bien plus'],
    answer:'on peut recevoir bien moins',
    hint:'« Jusqu’à » annonce un plafond, pas un plancher.',
    explanation:'« Jusqu’à » fixe un <b>maximum</b> : tout chiffre inférieur respecte la promesse. Les conditions le confirment — les 100 Go appartiennent au forfait ZAP JEUNE PLUS, « facturé séparément ». <i>("Up to" caps the offer; it guarantees nothing.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-002-m2', chapterId:CH, difficulty:3, subsection:'idee_implicite',
    question:_P2 + 'Que laisse entendre la formule « à partir de Rs 199 » ?',
    options:['le prix peut être plus élevé','le prix est le même pour tous','le prix baisse chaque mois','le prix inclut le téléphone'],
    answer:'le prix peut être plus élevé',
    hint:'Comparez cette formule avec la ligne des conditions sur les trois premiers mois.',
    explanation:'« À partir de » donne le <b>prix le plus bas possible</b>. Les conditions précisent : Rs 199 « s’applique aux trois premiers mois, puis passe à Rs 349 ». <i>("From Rs 199" is a floor, not the price.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-002-m3', chapterId:CH, difficulty:2, subsection:'registres_langue',
    question:_P2 + 'Le tutoiement (« le forfait qui te comprend ») montre que la publicité s’adresse d’abord :',
    options:['aux adolescents','aux enseignants','aux entreprises','aux retraités'],
    answer:'aux adolescents',
    hint:'Regardez aussi la tranche d’âge indiquée dans les conditions.',
    explanation:'Le « tu » crée une proximité de copain, et les conditions réservent l’offre aux <b>13-19 ans</b>. Le registre choisi désigne la cible. <i>(The informal "tu" targets teenagers.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-002-m4', chapterId:CH, difficulty:3, subsection:'analyse_texte',
    question:_P2 + 'Quel est le rôle du paragraphe écrit en petits caractères ?',
    options:['poser les vraies conditions','répéter les avantages cités','donner l’avis d’un client','décrire le réseau mobile'],
    answer:'poser les vraies conditions',
    hint:'Comparez ce que ce paragraphe dit et ce que les gros titres promettent.',
    explanation:'Ce paragraphe <b>restreint</b> chaque promesse du haut de l’affiche : durée du tarif, plafond de vitesse, engagement, frais de résiliation. Il est écrit petit pour être lu en dernier, ou pas du tout. <i>(The small print sets the real terms.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-002-m5', chapterId:CH, difficulty:4, subsection:'idee_implicite',
    question:_P2 + 'Pourquoi la publicité écrit-elle « parmi les plus rapides » et non « le plus rapide » ?',
    options:['Parce que la phrase ne peut être vérifiée.','Parce que le réseau est vraiment très lent.','Parce que la place manquait sur l’affiche.','Parce que la loi interdit d’écrire ce mot.'],
    answer:'Parce que la phrase ne peut être vérifiée.',
    hint:'Demandez-vous laquelle des deux phrases un concurrent pourrait contester.',
    explanation:'« Le plus rapide » est une affirmation <b>mesurable</b>, donc contestable ; « parmi les plus rapides » ne désigne aucun rang précis et reste vraie quoi qu’il arrive. La publicité promet sans promettre. <i>(A vague claim cannot be proved false.)</i>' }),

  makeText({ id:'g8fr-rcp-002-o1', chapterId:CH, difficulty:2, subsection:'idee_implicite',
    question:_P2 + 'Combien de gigaoctets par mois l’affiche annonce-t-elle en gros caractères ?',
    answer:'100 Go', alsoAccept:['100','cent','cent gigaoctets'],
    hint:'C’est le chiffre mis en gras au début de l’affiche.',
    explanation:'« tu profites de jusqu’à <b>100 Go</b> par mois ». Ce chiffre est un maximum, pas une garantie. <i>(100 GB, advertised as a ceiling.)</i>' }),

  makeText({ id:'g8fr-rcp-002-o2', chapterId:CH, difficulty:3, subsection:'idee_implicite',
    question:_P2 + 'Au-delà de combien de gigaoctets la vitesse de connexion est-elle réduite ?',
    answer:'15 Go', alsoAccept:['15','quinze','quinze gigaoctets'],
    hint:'La réponse ne se trouve pas dans les gros titres.',
    explanation:'Petits caractères : « Au-delà de <b>15 Go</b>, la vitesse de connexion est réduite jusqu’à la fin du cycle de facturation. » Loin des 100 Go annoncés. <i>(Throttled after 15 GB.)</i>' }),

  makeText({ id:'g8fr-rcp-002-o3', chapterId:CH, difficulty:3, subsection:'idee_implicite',
    question:_P2 + 'Pendant combien de mois le tarif de Rs 199 s’applique-t-il ?',
    answer:'trois', alsoAccept:['3','trois mois','3 mois'],
    hint:'Cherchez la phrase des conditions qui parle du tarif.',
    explanation:'« Le tarif de Rs 199 s’applique aux <b>trois</b> premiers mois, puis passe à Rs 349. » <i>(Three months, then almost double.)</i>' }),

  makeText({ id:'g8fr-rcp-002-o4', chapterId:CH, difficulty:3, subsection:'registres_langue',
    question:_P2 + 'En un mot, quel pronom la publicité emploie-t-elle pour s’adresser au lecteur ?',
    answer:'tu', alsoAccept:['toi','te'],
    hint:'Relisez le slogan du titre.',
    explanation:'« le forfait qui <b>te</b> comprend », « <b>tu</b> profites », « ton forfait ». Le tutoiement installe une fausse intimité. <i>(The informal "tu".)</i>' }),

  makeText({ id:'g8fr-rcp-002-o5', chapterId:CH, difficulty:2, subsection:'analyse_texte',
    question:_P2 + 'Quel est le nom du forfait annoncé ?',
    answer:'Zap Jeune', alsoAccept:['Zap','le forfait Zap Jeune'],
    hint:'Il est répété à chaque section de l’affiche.',
    explanation:'Le forfait s’appelle <b>ZAP JEUNE</b> ; la version à 100 Go, elle, s’appelle ZAP JEUNE PLUS et se facture à part. <i>(Zap Jeune — note the different name in the small print.)</i>' })
);

// ══ PASSAGE 3 · éditorial · construction, connecteurs, ton ════════════════
const _P3 = box(`
<b style="color:#1e40af">Lisez cet éditorial, puis répondez à la question.</b><br><br>
<b>Le plastique n’est pas une fatalité</b><br>
<i>Éditorial</i><br><br>
Il y a, dans chaque ravine de l’île, un second lit. Sous l’eau brune coule un courant de bouteilles, de gobelets et de sachets qui, lui, ne s’arrête jamais. À la première grosse pluie, tout cela descend vers la mer, et le lagon avale en une nuit ce que nous avons jeté en un mois.<br><br>
En effet, les chiffres sont connus. Une étude municipale menée l’an dernier a relevé, sur un seul kilomètre de canal à Beau-Bassin, plus de deux mille déchets plastiques. Neuf sur dix étaient des emballages à usage unique : des objets fabriqués pour durer des siècles et utilisés pendant quatre minutes. Le même relevé, refait trois mois plus tard au même endroit, en a compté davantage encore, alors que deux campagnes de nettoyage avaient eu lieu entre-temps. Ramasser, à soi seul, ne suffit donc pas : l’eau ramène ce que la main retire.<br><br>
Certes, l’interdiction des sacs de caisse a produit des résultats. Les caissières ne les proposent plus, les cabas en tissu se sont imposés, et personne aujourd’hui ne réclame le retour des sacs d’autrefois. Mais l’emballage a simplement changé de forme : la barquette, la bouteille, le film transparent autour de trois bananes.<br><br>
Or c’est là que le raisonnement habituel se trompe. On répète aux enfants qu’il faut « bien jeter ». On leur apprend le tri, la couleur des bacs, les gestes propres. C’est utile, et c’est insuffisant. Un déchet correctement jeté reste un déchet ; le seul emballage vraiment propre est celui qui n’a jamais été fabriqué.<br><br>
Nous entendons déjà l’objection : Maurice est un petit pays, sa part dans la pollution mondiale est minuscule, et ce n’est pas une consigne sur les bouteilles qui sauvera les océans. C’est vrai. Ce n’est pourtant pas un argument. Une île qui vit du tourisme, de la pêche et de la beauté de ses eaux n’a pas le luxe d’attendre que les grands pays se décident. Ce que nous jetons ici retombe ici.<br><br>
Que faire, alors ? Trois mesures nous paraissent réalistes. Premièrement, une consigne sur les bouteilles : quelques roupies rendues au retour, et la bouteille cesse d’être un déchet pour redevenir une matière. Deuxièmement, l’obligation, pour les grandes surfaces, de tenir un rayon de vrac. Troisièmement, une taxe sur les emballages à usage unique, dont le produit financerait le nettoyage des ravines.<br><br>
Enfin, il reste le mot lui-même. Tant que nous dirons « déchet », nous continuerons à jeter. Le jour où nous dirons « matière », nous commencerons à ramasser. Le lagon, lui, n’attend pas notre vocabulaire : il se remplit.
`, '#2563eb');

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g8fr-rcp-003-m1', chapterId:CH, difficulty:2, subsection:'analyse_texte',
    question:_P3 + 'Quel connecteur introduit la concession, c’est-à-dire ce que l’auteur reconnaît à ses adversaires ?',
    options:['Certes','En effet','Enfin','Or'],
    answer:'Certes',
    hint:'Cherchez le connecteur suivi plus loin d’un « Mais ».',
    explanation:'« <b>Certes</b>, l’interdiction des sacs de caisse a produit des résultats… <b>Mais</b> l’emballage a simplement changé de forme. » Le couple « certes… mais » est la marque de la concession. <i>("Certes… mais" = admittedly… but.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-003-m2', chapterId:CH, difficulty:3, subsection:'analyse_texte',
    question:_P3 + 'Quel est le plan général de cet éditorial ?',
    options:['constat, concession, propositions','récit, dialogue, conclusion','définition, exemple, résumé','question, réponse, question'],
    answer:'constat, concession, propositions',
    hint:'Regardez ce que fait chaque paragraphe, dans l’ordre.',
    explanation:'Image et <b>constat</b> chiffré, puis <b>concession</b> (« Certes… ») et réfutation de l’objection, puis <b>trois propositions</b> et une chute sur le vocabulaire. <i>(Observation → concession → proposals.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-003-m3', chapterId:CH, difficulty:3, subsection:'analyse_texte',
    question:_P3 + 'Quel est le rôle du troisième paragraphe, celui qui commence par « Certes » ?',
    options:['reconnaître un progrès réel','donner les chiffres de l’étude','proposer une nouvelle taxe','décrire l’état des ravines'],
    answer:'reconnaître un progrès réel',
    hint:'Un texte argumentatif solide accorde quelque chose avant de repartir.',
    explanation:'L’auteur <b>accorde</b> que l’interdiction des sacs a marché — « personne aujourd’hui ne réclame le retour des sacs d’autrefois » — avant d’objecter que l’emballage a changé de forme. Concéder rend l’argument suivant plus fort. <i>(Conceding a real gain first.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-003-m4', chapterId:CH, difficulty:4, subsection:'analyse_texte',
    question:_P3 + 'Quelle figure de style l’auteur emploie-t-il en écrivant « le lagon avale » ?',
    options:['une personnification','une comparaison','une énumération','une répétition'],
    answer:'une personnification',
    hint:'Demandez-vous qui, normalement, peut avaler.',
    explanation:'<b>Personnification</b> : le lagon reçoit une action humaine, « avaler ». La dernière phrase reprend le procédé — « Le lagon, lui, n’attend pas notre vocabulaire ». <i>(Personification: the lagoon swallows, waits.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-003-m5', chapterId:CH, difficulty:3, subsection:'registres_langue',
    question:_P3 + 'Quel registre l’éditorialiste emploie-t-il tout au long du texte ?',
    options:['un registre soutenu','un registre familier','un registre enfantin','un registre technique'],
    answer:'un registre soutenu',
    hint:'Observez le pronom « nous » et le choix des mots.',
    explanation:'Registre <b>soutenu</b> : « il apparaît », « nous paraissent réalistes », « dont le produit financerait ». Le « nous » du journal remplace le « je », signe du registre de l’éditorial. <i>(Formal editorial "we".)</i>' }),

  makeText({ id:'g8fr-rcp-003-o1', chapterId:CH, difficulty:2, subsection:'analyse_texte',
    question:_P3 + 'Combien de déchets plastiques l’étude a-t-elle relevés sur un kilomètre de canal ?',
    answer:'deux mille', alsoAccept:['2000','2 000','plus de deux mille'],
    hint:'Le chiffre est dans le paragraphe qui commence par « En effet ».',
    explanation:'« sur un seul kilomètre de canal à Beau-Bassin, plus de <b>deux mille</b> déchets plastiques ». <i>(Over two thousand.)</i>' }),

  makeText({ id:'g8fr-rcp-003-o2', chapterId:CH, difficulty:2, subsection:'analyse_texte',
    question:_P3 + 'En quelques mots, de quel type de texte s’agit-il ?',
    answer:'un éditorial', alsoAccept:['éditorial','une tribune','un article d’opinion'],
    hint:'Le sous-titre en italique donne la réponse.',
    explanation:'C’est <b>un éditorial</b> : un article où le journal donne son opinion et propose des mesures, au lieu de rapporter des faits seulement. <i>(An editorial — opinion, not news.)</i>' }),

  makeText({ id:'g8fr-rcp-003-o3', chapterId:CH, difficulty:3, subsection:'analyse_texte',
    question:_P3 + 'En quelques mots, quel geste l’auteur juge « utile » mais « insuffisant » ?',
    answer:'le tri', alsoAccept:['tri','le tri des déchets','trier les déchets'],
    hint:'Regardez le paragraphe qui commence par « Or ».',
    explanation:'« On leur apprend <b>le tri</b>, la couleur des bacs, les gestes propres. C’est utile, et c’est insuffisant. » <i>(Sorting waste: useful, not enough.)</i>' }),

  makeText({ id:'g8fr-rcp-003-o4', chapterId:CH, difficulty:3, subsection:'analyse_texte',
    question:_P3 + 'Combien de mesures concrètes l’auteur propose-t-il ?',
    answer:'trois', alsoAccept:['3','trois mesures'],
    hint:'Elles sont annoncées puis numérotées par des connecteurs.',
    explanation:'« <b>Trois</b> mesures nous paraissent réalistes » : consigne sur les bouteilles, rayon de vrac obligatoire, taxe sur l’usage unique. <i>(Three, announced then numbered.)</i>' }),

  makeText({ id:'g8fr-rcp-003-o5', chapterId:CH, difficulty:4, subsection:'idee_implicite',
    question:_P3 + 'En un mot, par quel terme l’auteur voudrait-il remplacer le mot « déchet » ?',
    answer:'matière', alsoAccept:['la matière','une matière'],
    hint:'La réponse est dans la toute dernière partie du texte.',
    explanation:'« Le jour où nous dirons « <b>matière</b> », nous commencerons à ramasser. » Changer le mot, suggère-t-il, c’est changer le geste. <i>(Call it "material", not "waste".)</i>' })
);

// ══ PASSAGE 4 · journal intime · ce que la narratrice ne dit pas ══════════
const _P4 = box(`
<b style="color:#1e40af">Lisez ces pages de journal, puis répondez à la question.</b><br><br>
<b>Journal — trois jours</b><br><br>
<b>Mercredi 14 février, 21 h 40</b><br><br>
Alerte de classe 2 depuis midi. Papa a rentré les chaises, la table en plastique et les plantes de maman. Moi, j’ai aidé pour les volets du salon, ceux qui coincent toujours. Après, on a mangé tôt et j’ai lu dans ma chambre jusqu’à ce que la lumière se mette à trembler.<br><br>
Yohan n’arrête pas de demander si son vélo est bien rangé. Je lui ai dit oui. Il a huit ans, il ne va pas aller vérifier sous la pluie.<br><br>
Tout va bien.<br><br>
<b>Jeudi 15 février, 15 h 10</b><br><br>
Classe 3 à onze heures. Le bruit sur le toit, c’est comme si quelqu’un jetait des poignées de gravier, sans jamais s’arrêter. On a joué aux cartes avec la lampe de poche posée debout au milieu de la table. Maman a gagné trois fois de suite et elle en a fait toute une histoire.<br><br>
Vers deux heures, j’ai entendu un choc du côté de la cour. Papa a dit que c’était sans doute la tôle du voisin. Je n’ai rien dit. J’ai regardé par la fente du volet, mais on ne voyait que du blanc.<br><br>
J’ai relu ce que j’ai écrit hier. « Je lui ai dit oui. » Quatre mots. Sur le moment, ça ne coûtait rien du tout.<br><br>
De toute façon, ce vélo était vieux. La chaîne sautait, le frein arrière ne servait à rien, et Yohan a beaucoup grandi cette année. Papa lui en aurait acheté un autre à Noël.<br><br>
Tout va bien.<br><br>
<b>Vendredi 16 février, 10 h 25</b><br><br>
Le vent est tombé pendant la nuit. Ce matin, le jardin est couvert de feuilles arrachées et de mangues vertes tombées trop tôt. La barrière du fond est pliée vers l’intérieur et le filao du voisin a perdu une branche entière.<br><br>
Yohan est sorti le premier. Il est resté longtemps debout près du manguier, à regarder l’endroit où on range les vélos, et il n’a rien dit du tout. C’est ça qui est le pire. S’il avait crié, s’il m’avait accusée, j’aurais pu me défendre.<br><br>
Maman a demandé qui devait rentrer les vélos mardi soir. Papa a répondu qu’il ne se souvenait plus. Il me regardait quand il l’a dit.<br><br>
Je vais tout raconter ce soir. Ou demain, peut-être, quand le courant sera revenu et que tout le monde sera de meilleure humeur. Il paraît que ça peut prendre trois jours.<br><br>
Tout va bien.
`, '#2563eb');

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g8fr-rcp-004-m1', chapterId:CH, difficulty:3, subsection:'idee_implicite',
    question:_P4 + 'Que la narratrice cache-t-elle depuis le premier jour ?',
    options:['Elle n’a pas rentré le vélo.','Elle a cassé la barrière du fond.','Elle a perdu la lampe de poche.','Elle a ouvert le volet du salon.'],
    answer:'Elle n’a pas rentré le vélo.',
    hint:'Reliez sa réponse à Yohan le mercredi et le choc entendu le jeudi.',
    explanation:'Elle répond « oui » à Yohan sans avoir vérifié, entend un choc dans la cour, ne dit rien, puis explique que « ce vélo était vieux ». Rien n’est avoué : tout est suggéré. <i>(She never brought the bicycle in.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-004-m2', chapterId:CH, difficulty:4, subsection:'idee_implicite',
    question:_P4 + 'À quoi sert la phrase « De toute façon, ce vélo était vieux » ?',
    options:['atténuer sa propre faute','décrire un objet cassé','demander un vélo neuf','accuser son petit frère'],
    answer:'atténuer sa propre faute',
    hint:'Demandez-vous à qui elle s’adresse en écrivant cela dans un journal privé.',
    explanation:'Personne ne l’accuse encore : elle se défend donc <b>devant elle-même</b>. « De toute façon » signale une justification qui vient après coup. <i>(Self-justification, not description.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-004-m3', chapterId:CH, difficulty:3, subsection:'registres_langue',
    question:_P4 + 'Quel registre la narratrice emploie-t-elle dans son journal ?',
    options:['le registre courant','le registre soutenu','le registre technique','le registre juridique'],
    answer:'le registre courant',
    hint:'Comparez ces phrases avec celles d’une lettre officielle.',
    explanation:'Registre <b>courant</b> : phrases simples, « on a joué aux cartes », « ça ne coûtait rien ». Ni les formules du soutenu, ni l’argot du familier — c’est la langue de tous les jours. <i>(Everyday register.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-004-m4', chapterId:CH, difficulty:4, subsection:'idee_implicite',
    question:_P4 + 'Pourquoi le silence de Yohan est-il, pour elle, « le pire » ?',
    options:['Parce qu’elle ne peut pas se défendre.','Parce qu’il ne l’a pas encore vue.','Parce qu’il pleure devant ses parents.','Parce qu’il refuse de sortir du salon.'],
    answer:'Parce qu’elle ne peut pas se défendre.',
    hint:'Elle le dit elle-même juste après, dans une phrase avec « si ».',
    explanation:'« S’il avait crié, s’il m’avait accusée, <b>j’aurais pu me défendre</b>. » Une accusation lui donnerait un rôle ; le silence la laisse seule avec sa faute. <i>(An accusation would let her argue back.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-004-m5', chapterId:CH, difficulty:3, subsection:'analyse_texte',
    question:_P4 + 'Quel effet produit la répétition de « Tout va bien » à la fin de chaque jour ?',
    options:['elle sonne de plus en plus faux','elle rassure vraiment le lecteur','elle marque la fin du cyclone','elle imite la voix du père'],
    answer:'elle sonne de plus en plus faux',
    hint:'Comparez la formule avec ce que raconte le paragraphe qui la précède.',
    explanation:'Chaque fois, la formule suit un aveu de plus en plus lourd : le mensonge à Yohan, le choc entendu, le silence de son frère. La répétition <b>dément</b> ce qu’elle affirme. <i>(A refrain that contradicts itself.)</i>' }),

  makeText({ id:'g8fr-rcp-004-o1', chapterId:CH, difficulty:2, subsection:'idee_implicite',
    question:_P4 + 'En deux mots, quel objet la narratrice a-t-elle laissé dehors ?',
    answer:'le vélo', alsoAccept:['vélo','un vélo','la bicyclette'],
    hint:'C’est l’objet dont Yohan parle dès le mercredi soir.',
    explanation:'<b>Le vélo</b> de Yohan : « Yohan n’arrête pas de demander si son vélo est bien rangé. Je lui ai dit oui. » <i>(The bicycle.)</i>' }),

  makeText({ id:'g8fr-rcp-004-o2', chapterId:CH, difficulty:2, subsection:'analyse_texte',
    question:_P4 + 'Combien de jours ce journal couvre-t-il ?',
    answer:'trois', alsoAccept:['3','trois jours'],
    hint:'Comptez les dates écrites en gras.',
    explanation:'<b>Trois</b> jours : mercredi 14, jeudi 15 et vendredi 16 février. Les dates et les heures sont la marque du journal intime. <i>(Three dated entries.)</i>' }),

  makeText({ id:'g8fr-rcp-004-o3', chapterId:CH, difficulty:2, subsection:'analyse_texte',
    question:_P4 + 'Quelle classe d’alerte cyclonique est annoncée le jeudi à onze heures ?',
    answer:'classe 3', alsoAccept:['3','classe III','la classe 3'],
    hint:'C’est la toute première phrase de la page du jeudi.',
    explanation:'« <b>Classe 3</b> à onze heures. » La veille, l’alerte n’était qu’en classe 2 : la montée de l’alerte accompagne la montée de son malaise. <i>(Class 3 warning.)</i>' }),

  makeText({ id:'g8fr-rcp-004-o4', chapterId:CH, difficulty:3, subsection:'idee_implicite',
    question:_P4 + 'À qui appartient l’objet resté dehors ?',
    answer:'à Yohan', alsoAccept:['Yohan','son frère','à son frère'],
    hint:'Il a huit ans.',
    explanation:'À <b>Yohan</b>, son petit frère de huit ans. C’est ce qui rend la faute difficile à avouer. <i>(Her eight-year-old brother.)</i>' }),

  makeText({ id:'g8fr-rcp-004-o5', chapterId:CH, difficulty:4, subsection:'idee_implicite',
    question:_P4 + 'En un mot, quel sentiment la narratrice cherche-t-elle à cacher ?',
    answer:'la culpabilité', alsoAccept:['culpabilité','la honte','le remords'],
    hint:'Ce mot n’apparaît jamais dans le texte ; tout le journal le montre.',
    explanation:'<b>La culpabilité</b>. Elle ne l’écrit pas une seule fois : elle la trahit par le « De toute façon », par le silence devant le choc, et par le « Tout va bien » répété. <i>(Guilt, never named.)</i>' })
);

// ══ PASSAGE 5 · interview · registres croisés et question esquivée ════════
const _P5 = box(`
<b style="color:#1e40af">Lisez cet entretien, puis répondez à la question.</b><br><br>
<b>« Le lagon n’est plus le même » — entretien avec Dev Sinatambou, pêcheur à Mahébourg</b><br>
<i>Propos recueillis par notre correspondant.</i><br><br>
<b>— Monsieur Sinatambou, vous exercez ce métier depuis combien de temps ?</b><br><br>
— Quarante ans, mon fils. Quarante ans que je sors avant le jour. Mon père faisait pareil, et son père avant lui.<br><br>
<b>— Diriez-vous que l’état du lagon s’est modifié de manière significative au cours de cette période ?</b><br><br>
— Modifié ? Ah, ça… <i>(il rit)</i> Vous parlez comme la radio. Moi je vous dis simplement : avant, je mettais la nasse là, derrière les trois cocos, et le soir elle était pleine. Aujourd’hui je vais deux fois plus loin pour deux fois moins. Le corail, là-bas, il est blanc comme du sel.<br><br>
<b>— À quoi attribuez-vous ce phénomène ?</b><br><br>
— L’eau est plus chaude, tout le monde le dit. Et puis il y a ce qui descend des rivières après la pluie. La terre rouge, les engrais, les bouteilles. Le lagon, c’est une cuvette : ce que vous jetez en haut, il le garde en bas.<br><br>
<b>— Les autorités ont délimité une zone de réserve où la pêche est interdite. Y allez-vous encore ?</b><br><br>
— <i>(silence)</i> Vous savez, la mer, il n’y a pas de lignes dessus. On regarde la côte, on regarde le vent. Un jour, le vent vous pousse. Enfin… moi je respecte, hein. Mais il faut nourrir la famille. Vous, vous mangez tous les jours ?<br><br>
<b>— Comment envisagez-vous l’avenir de la profession ?</b><br><br>
— Les jeunes ne veulent plus. Mon neveu, il est parti travailler dans les hôtels, à Blue Bay. Il gagne plus que moi, il a un uniforme, il rentre le soir. Je ne peux pas lui donner tort. Nous, on est une dizaine à sortir encore, et le plus jeune a quarante-huit ans. Dans dix ans, vous viendrez ici, vous trouverez des bateaux et personne dedans.<br><br>
<b>— Quelles mesures souhaiteriez-vous voir mises en œuvre ?</b><br><br>
— De grands mots… Bon. Qu’on nous écoute, déjà. On connaît chaque trou du lagon, chaque courant, chaque heure de marée. Quand ils ont fait leur étude, ils ont interrogé qui ? Des messieurs de Port-Louis. Pas un pêcheur. Donnez-nous une place à la table et vous verrez que nous ne sommes pas contre la réserve. On veut juste qu’elle serve à quelque chose.<br><br>
<b>— Un dernier mot ?</b><br><br>
— Venez à cinq heures du matin. On parlera mieux sur l’eau que dans un bureau.
`, '#2563eb');

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g8fr-rcp-005-m1', chapterId:CH, difficulty:2, subsection:'registres_langue',
    question:_P5 + 'Quel registre le journaliste emploie-t-il dans ses questions ?',
    options:['le registre soutenu','le registre familier','le registre enfantin','le registre argotique'],
    answer:'le registre soutenu',
    hint:'Regardez des tournures comme « Diriez-vous que… » ou « mises en œuvre ».',
    explanation:'Registre <b>soutenu</b> : « Diriez-vous que l’état du lagon s’est modifié de manière significative », « À quoi attribuez-vous ce phénomène ». Inversion du sujet et vocabulaire abstrait. <i>(Formal interviewer.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-005-m2', chapterId:CH, difficulty:3, subsection:'registres_langue',
    question:_P5 + 'Laquelle de ces réponses du pêcheur relève le plus nettement du registre familier ?',
    options:['Quarante ans, mon fils.','L’eau est plus chaude.','Le corail est tout blanc.','Les jeunes ne veulent plus.'],
    answer:'Quarante ans, mon fils.',
    hint:'Cherchez la façon dont il appelle le journaliste.',
    explanation:'« <b>mon fils</b> » : un appellatif affectueux adressé à un inconnu plus jeune, impossible dans le registre soutenu. Le pêcheur répond familièrement à une question soutenue, et ce décalage est le sujet du texte. <i>(A familiar form of address.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-005-m3', chapterId:CH, difficulty:4, subsection:'idee_implicite',
    question:_P5 + 'Que laisse entendre le pêcheur par sa réponse sur la zone de réserve ?',
    options:['Qu’il lui arrive d’y pêcher.','Qu’il ignore où elle se trouve.','Qu’il approuve son extension.','Qu’il n’y est jamais allé.'],
    answer:'Qu’il lui arrive d’y pêcher.',
    hint:'Comptez ce qu’il dit avant d’arriver enfin au mot « je respecte ».',
    explanation:'Le « <i>(silence)</i> », puis « il n’y a pas de lignes dessus », « le vent vous pousse », et seulement ensuite « Enfin… moi je respecte, hein » suivi d’un « Mais ». Il n’avoue rien et n’a rien nié. <i>(Evasion, not denial.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-005-m4', chapterId:CH, difficulty:3, subsection:'analyse_texte',
    question:_P5 + 'Pourquoi le journaliste a-t-il transcrit la mention « <i>(silence)</i> » ?',
    options:['Pour montrer une hésitation gênée.','Pour indiquer une coupure du son.','Pour marquer la fin de l’entretien.','Pour signaler une faute de langue.'],
    answer:'Pour montrer une hésitation gênée.',
    hint:'Cette mention apparaît après une seule des sept questions.',
    explanation:'Elle suit la seule question <b>embarrassante</b>. Dans un entretien écrit, une didascalie de ce genre transmet ce que les mots ne disent pas — ici, la gêne. <i>(A stage direction carrying the discomfort.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-005-m5', chapterId:CH, difficulty:3, subsection:'idee_implicite',
    question:_P5 + 'Que suggère la remarque « le plus jeune a quarante-huit ans » ?',
    options:['Le métier va disparaître.','Le métier attire les jeunes.','Le métier paie très bien.','Le métier devient plus sûr.'],
    answer:'Le métier va disparaître.',
    hint:'Reliez cette phrase à celle sur les bateaux, dix ans plus tard.',
    explanation:'S’il n’entre plus personne, le groupe vieillit et s’éteint : « Dans dix ans… vous trouverez des bateaux et <b>personne dedans</b>. » Un chiffre remplace toute une explication. <i>(A dying trade, shown by one number.)</i>' }),

  makeText({ id:'g8fr-rcp-005-o1', chapterId:CH, difficulty:2, subsection:'analyse_texte',
    question:_P5 + 'Dans quelle localité le pêcheur travaille-t-il ?',
    answer:'Mahébourg', alsoAccept:['à Mahébourg','le village de Mahébourg'],
    hint:'C’est indiqué dans le titre de l’entretien.',
    explanation:'« entretien avec Dev Sinatambou, pêcheur à <b>Mahébourg</b> ». Son neveu, lui, travaille à Blue Bay. <i>(Mahébourg, in the south-east.)</i>' }),

  makeText({ id:'g8fr-rcp-005-o2', chapterId:CH, difficulty:2, subsection:'analyse_texte',
    question:_P5 + 'Depuis combien d’années exerce-t-il ce métier ?',
    answer:'quarante ans', alsoAccept:['40','40 ans','quarante'],
    hint:'C’est le premier chiffre de sa première réponse.',
    explanation:'« <b>Quarante ans</b>, mon fils. Quarante ans que je sors avant le jour. » La répétition insiste sur la durée. <i>(Forty years.)</i>' }),

  makeText({ id:'g8fr-rcp-005-o3', chapterId:CH, difficulty:3, subsection:'analyse_texte',
    question:_P5 + 'En un mot, de quelle couleur est devenu le corail dont il parle ?',
    answer:'blanc', alsoAccept:['blanche','tout blanc','blanc comme du sel'],
    hint:'Il emploie une comparaison avec un produit de cuisine.',
    explanation:'« Le corail, là-bas, il est <b>blanc</b> comme du sel. » C’est le blanchissement du corail, décrit sans le mot savant. <i>(Bleached white — coral bleaching.)</i>' }),

  makeText({ id:'g8fr-rcp-005-o4', chapterId:CH, difficulty:4, subsection:'idee_implicite',
    question:_P5 + 'En quelques mots, où le neveu du pêcheur est-il parti travailler ?',
    answer:'dans les hôtels', alsoAccept:['les hôtels','à Blue Bay','dans un hôtel'],
    hint:'Il donne aussi le nom de l’endroit.',
    explanation:'« Mon neveu, il est parti travailler <b>dans les hôtels</b>, à Blue Bay. » Le pêcheur ne le lui reproche pas : « Je ne peux pas lui donner tort. » <i>(Hotel work at Blue Bay.)</i>' }),

  makeText({ id:'g8fr-rcp-005-o5', chapterId:CH, difficulty:3, subsection:'registres_langue',
    question:_P5 + 'En un mot, quel registre le pêcheur emploie-t-il face au journaliste ?',
    answer:'familier', alsoAccept:['le familier','registre familier','langage familier'],
    hint:'Pensez à « mon fils », « Ah, ça… », « hein », « Bon ».',
    explanation:'<b>Familier</b> : appellatifs, interjections (« hein », « Bon »), phrases inachevées. Le contraste avec les questions soutenues est voulu par le journaliste. <i>(Familiar, against a formal interviewer.)</i>' })
);

// ══ PASSAGE 6 · avis administratif + lettre argumentée · construction ═════
const _P6 = box(`
<b style="color:#1e40af">Lisez les deux textes, puis répondez à la question.</b><br><br>
<b>Deux textes affichés au même tableau</b><br><br>
<b>TEXTE A — Avis de la Direction</b><br><br>
COLLÈGE DU CENTRE — AVIS N° 14/2026<br>
Objet : port de l’uniforme<br><br>
Il a été constaté, au cours du dernier trimestre, un relâchement dans le port de l’uniforme scolaire, notamment en ce qui concerne les chaussures et le port du pull hors saison.<br><br>
Il est rappelé aux élèves et à leurs parents que l’uniforme complet est obligatoire dès l’entrée dans l’enceinte de l’établissement. À compter du 1er avril, tout élève ne s’y conformant pas sera renvoyé chez lui pour la journée.<br><br>
Aucune dérogation ne sera accordée en dehors des cas médicaux dûment attestés.<br><br>
La Direction<br><br>
<b>TEXTE B — Lettre des délégués de classe</b><br><br>
Le 21 mars<br><br>
Madame la Directrice,<br><br>
Les délégués des classes de Grade 7 à Grade 9 ont pris connaissance de l’avis n° 14/2026 et souhaitent vous exposer respectueusement leur point de vue.<br><br>
Nous tenons d’abord à dire que nous ne contestons pas le principe de l’uniforme. Il évite les comparaisons entre familles et nous en mesurons l’utilité.<br><br>
Toutefois, la mesure annoncée nous paraît difficile à appliquer, pour trois raisons.<br><br>
Premièrement, le pull. Les salles du bâtiment nord ne sont pas ventilées comme celles du bâtiment sud ; en avril, il fait plusieurs degrés de plus dans les secondes, et un élève qui garde son pull en classe le supporte mal.<br><br>
Deuxièmement, les chaussures. Le modèle exigé n’est vendu que dans deux magasins de la capitale et coûte plus de mille roupies. Cependant, plusieurs familles doivent déjà les renouveler deux fois par an, la marche jusqu’à l’arrêt de bus les usant vite.<br><br>
Troisièmement, la sanction. Renvoyer un élève chez lui pour une paire de chaussures le prive d’une journée de cours ; en revanche, cela ne lui procure pas les chaussures manquantes.<br><br>
Nous ne demandons pas la suppression de la règle. Nous demandons une réunion, avant le 1er avril, entre la Direction, deux délégués par niveau et un représentant des parents, afin d’examiner ensemble les points ci-dessus.<br><br>
Dans l’attente de votre réponse, nous vous prions de croire, Madame la Directrice, à notre respectueuse considération.<br><br>
Les délégués de classe<br><br>
<b>Note</b><br><br>
Les deux affiches se répondent. La première emploie des tournures impersonnelles — « il a été constaté », « il est rappelé », « aucune dérogation ne sera accordée » — qui font disparaître celui qui parle : la règle semble venir de nulle part, donc de partout. La seconde dit « nous », annonce son plan, numérote ses arguments et se termine par une demande précise. Les élèves auraient pu écrire qu’ils trouvaient l’avis injuste. Ils ont préféré emprunter la langue de l’administration pour lui parler.
`, '#2563eb');

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g8fr-rcp-006-m1', chapterId:CH, difficulty:3, subsection:'analyse_texte',
    question:_P6 + 'Comment la lettre des délégués est-elle construite ?',
    options:['accord, trois arguments, demande','récit, dialogue, conclusion','question, exemple, résumé','refus, menace, condition'],
    answer:'accord, trois arguments, demande',
    hint:'Regardez ce que fait chaque paragraphe, du premier au dernier.',
    explanation:'Ils <b>accordent</b> d’abord le principe (« nous ne contestons pas »), présentent <b>trois</b> raisons numérotées, puis formulent <b>une demande</b> précise : une réunion avant le 1er avril. <i>(Concede, argue, request.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-006-m2', chapterId:CH, difficulty:4, subsection:'registres_langue',
    question:_P6 + 'Pourquoi les délégués ont-ils choisi un registre soutenu plutôt que familier ?',
    options:['Pour être pris au sérieux par la Direction.','Pour amuser les autres élèves du collège.','Pour cacher le nom de leurs camarades.','Pour allonger inutilement leur lettre.'],
    answer:'Pour être pris au sérieux par la Direction.',
    hint:'La note finale explique ce choix en une phrase.',
    explanation:'« Ils ont préféré <b>emprunter la langue de l’administration</b> pour lui parler. » Adopter le registre du destinataire, c’est se placer sur le même terrain que lui. <i>(Speak the reader’s register to be heard.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-006-m3', chapterId:CH, difficulty:4, subsection:'idee_implicite',
    question:_P6 + 'Que produit la tournure « Il a été constaté » au début de l’avis ?',
    options:['Personne n’est nommé comme responsable.','La Direction s’excuse de cette mesure.','Les parents ont demandé cette règle.','Les élèves ont rédigé ce paragraphe.'],
    answer:'Personne n’est nommé comme responsable.',
    hint:'Demandez-vous qui, exactement, a constaté quelque chose.',
    explanation:'La voix passive sans complément d’agent <b>efface celui qui parle</b>, comme le dit la note : « la règle semble venir de nulle part, donc de partout ». C’est le propre du style administratif. <i>(Agentless passive hides the speaker.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-006-m4', chapterId:CH, difficulty:2, subsection:'analyse_texte',
    question:_P6 + 'Quel connecteur marque le passage de l’accord à l’objection dans la lettre ?',
    options:['Toutefois','Premièrement','Deuxièmement','Troisièmement'],
    answer:'Toutefois',
    hint:'Il ouvre le paragraphe qui suit « nous ne contestons pas le principe ».',
    explanation:'« <b>Toutefois</b>, la mesure annoncée nous paraît difficile à appliquer. » Les trois autres connecteurs numérotent les arguments, ils n’opposent rien. <i>("Toutefois" = however.)</i>' }),

  makeMCQ({ id:'g8fr-rcp-006-m5', chapterId:CH, difficulty:3, subsection:'registres_langue',
    question:_P6 + 'Quel registre l’avis de la Direction emploie-t-il ?',
    options:['un registre administratif','un registre publicitaire','un registre familier','un registre poétique'],
    answer:'un registre administratif',
    hint:'Observez les tournures impersonnelles et le futur employé.',
    explanation:'Registre <b>administratif</b>, variété du soutenu : « il est rappelé », « dès l’entrée dans l’enceinte de l’établissement », « aucune dérogation ne sera accordée ». Aucun « je », aucun « vous » personnel. <i>(Administrative register.)</i>' }),

  makeText({ id:'g8fr-rcp-006-o1', chapterId:CH, difficulty:2, subsection:'analyse_texte',
    question:_P6 + 'À partir de quelle date la nouvelle mesure s’applique-t-elle ?',
    answer:'le 1er avril', alsoAccept:['1er avril','le premier avril','1 avril'],
    hint:'La date figure dans le deuxième paragraphe de l’avis.',
    explanation:'« À compter du <b>1er avril</b>, tout élève ne s’y conformant pas sera renvoyé chez lui pour la journée. » Les délégués demandent une réunion avant cette date. <i>(1 April.)</i>' }),

  makeText({ id:'g8fr-rcp-006-o2', chapterId:CH, difficulty:2, subsection:'analyse_texte',
    question:_P6 + 'Combien d’arguments les délégués présentent-ils ?',
    answer:'trois', alsoAccept:['3','trois arguments','trois raisons'],
    hint:'Ils les annoncent avant de les numéroter.',
    explanation:'« pour <b>trois</b> raisons » : le pull, les chaussures, la sanction. Annoncer le nombre avant de développer est une marque de texte structuré. <i>(Three, announced then numbered.)</i>' }),

  makeText({ id:'g8fr-rcp-006-o3', chapterId:CH, difficulty:3, subsection:'analyse_texte',
    question:_P6 + 'Citez un connecteur d’opposition employé par les délégués.',
    answer:'Toutefois', alsoAccept:['Cependant','en revanche'],
    hint:'Il y en a trois dans la lettre ; un seul suffit.',
    explanation:'« <b>Toutefois</b> », « <b>Cependant</b> » et « <b>en revanche</b> » marquent tous les trois une opposition. Les délégués s’en servent pour nuancer sans jamais élever le ton. <i>(However / yet / on the other hand.)</i>' }),

  makeText({ id:'g8fr-rcp-006-o4', chapterId:CH, difficulty:3, subsection:'idee_implicite',
    question:_P6 + 'En deux mots, que demandent finalement les délégués à la Directrice ?',
    answer:'une réunion', alsoAccept:['une rencontre','un rendez-vous','de se réunir'],
    hint:'Leur demande est dans l’avant-dernier paragraphe de la lettre.',
    explanation:'« Nous demandons <b>une réunion</b>, avant le 1er avril, entre la Direction, deux délégués par niveau et un représentant des parents. » Ils ne demandent pas la suppression de la règle. <i>(A meeting, not a repeal.)</i>' }),

  makeText({ id:'g8fr-rcp-006-o5', chapterId:CH, difficulty:3, subsection:'registres_langue',
    question:_P6 + 'En un mot, quel pronom les délégués emploient-ils pour se désigner ?',
    answer:'nous', alsoAccept:['le pronom nous','le nous'],
    hint:'Comparez avec l’avis, où personne ne se désigne.',
    explanation:'« <b>Nous</b> tenons d’abord à dire… », « <b>nous</b> demandons une réunion ». Face à un texte sans sujet, ils assument le leur. <i>(They say "we"; the notice says no one.)</i>' })
);

})();
