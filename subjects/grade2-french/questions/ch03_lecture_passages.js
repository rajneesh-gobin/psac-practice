'use strict';
// Grade 2 Français — Lecture : textes plus longs.
// IDs: g2fr-pass-001 … g2fr-pass-032
//
// WHY THIS FILE EXISTS
// Measured across ch03_lecture.js, every reading stimulus in the Grade 2 French
// bank is 8–18 words — a single sentence. A child can answer those by scanning
// for one word, so the chapter never tests sustained reading, inference across
// sentences, or holding the order of events in mind. These eight passages are
// 35–45 words (4–5 sentences) and each carries four question kinds:
// littérale, inférence, sens d'un mot d'après le contexte, idée principale /
// ordre des événements. Same chapter, same three declared subsections — only
// the length of what has to be read changes.

(function () {
  const P = {
    ecole: "Lundi matin, Léa met son uniforme bleu et prend son sac. Elle marche vers l'école avec sa maman. Dans la classe, la maîtresse écrit la date au tableau. Léa sort son cahier et son crayon. Elle sourit.",
    marche: "Samedi, papa et Sami vont au marché de Flacq. Il y a des mangues, des bananes et des tomates. Sami porte le grand panier. Papa achète le poisson frais. Sur le chemin du retour, Sami boit son jus froid.",
    plage: "Dimanche, la famille de Nita va à la plage. Le sable est chaud et la mer est bleue. Nita nage avec son frère Ravi. Maman prépare des sandwichs sous un filao. Le soir, tout le monde rentre à la maison.",
    pluie: "Il pleut très fort ce matin. Les enfants restent dans la classe pendant la récréation. Yann regarde les gouttes sur la vitre. Sa copine Ines dessine un arc-en-ciel. Le maître raconte une histoire drôle et tout le monde rit.",
    animaux: "Dans le jardin de grand-mère, il y a un chien, deux chats et trois poules. Le chien s'appelle Bruno. Il aime courir derrière le ballon. Les poules pondent des œufs chaque matin. Grand-mère leur donne du maïs.",
    famille: "La famille de Kevin est grande. Son papa est pêcheur et sa maman est infirmière. Kevin a une petite sœur qui s'appelle Anaïs. Le dimanche, ils mangent tous ensemble chez grand-père. Après le repas, les enfants jouent aux cartes.",
    fete: "Aujourd'hui, Sarah a sept ans. Sa maman prépare un gâteau au chocolat. Les amis de Sarah arrivent à trois heures avec des cadeaux. Ils chantent, dansent et mangent du gâteau. Sarah souffle ses bougies et fait un vœu.",
    livres: "Le mardi, la classe de Rita va à la bibliothèque. Rita choisit un livre sur les dauphins. Elle s'assoit près de la fenêtre et lit en silence. La dame de la bibliothèque note son nom dans un grand cahier.",
  };
  const ask = (n, key, sub, diff, q, opts, ans, hint, exp) => STATIC_QUESTIONS.push(
    makeMCQ({ id: `g2fr-pass-${String(n).padStart(3, '0')}`, chapterId: 'g2fr-lecture',
      difficulty: diff, subsection: sub,
      question: `Lis : "${P[key]}"<br><br>${q}`,
      options: opts, answer: ans, hint, explanation: exp }));

  // ── 1. À l'école ───────────────────────────────────────────────────────────
  ask(1, 'ecole', 'lecture_comprehension', 1, "De quelle couleur est l'uniforme de Léa ?",
    ['Il est bleu', 'Il est vert', 'Il est jaune', 'Il est noir'],
    'Il est bleu', 'Relis la première phrase du texte.',
    "<b>Il est bleu</b> — le texte dit « son uniforme bleu ».");

  ask(2, 'ecole', 'lecture_comprehension', 2, 'Que va faire Léa juste après ?',
    ['Elle va travailler', 'Elle va se coucher', 'Elle va cuisiner', 'Elle va nager'],
    'Elle va travailler', "Regarde ce que Léa sort de son sac.",
    "<b>Elle va travailler</b> — son cahier et son crayon sont prêts.");

  ask(3, 'ecole', 'lecture_comprehension', 2, 'Dans le texte, que veut dire « uniforme » ?',
    ["Un habit d'école", 'Un livre de classe', 'Un sac de sport', 'Un repas chaud'],
    "Un habit d'école", 'Léa le met avant de partir.',
    "<b>Un habit d'école</b> — on le met pour aller en classe.");

  ask(4, 'ecole', 'lecture_comprehension', 2, "Quelle est l'idée principale du texte ?",
    ['Léa arrive en classe', 'Léa joue dans la cour', 'Léa dort chez sa tante', 'Léa mange une banane'],
    'Léa arrive en classe', 'Demande-toi de quoi parle tout le texte.',
    '<b>Léa arrive en classe</b> — le texte raconte son arrivée à l’école.');

  // ── 2. Au marché ───────────────────────────────────────────────────────────
  ask(5, 'marche', 'lecture_comprehension', 1, 'Que papa achète-t-il au marché ?',
    ['Le poisson frais', 'Le fromage de chèvre', 'Le poulet rôti', 'Le pain de maïs'],
    'Le poisson frais', 'Cherche le verbe « achète » dans le texte.',
    '<b>Le poisson frais</b> — le texte le dit clairement.');

  ask(6, 'marche', 'lecture_comprehension', 2, 'Pourquoi Sami boit-il un jus froid ?',
    ["Parce qu'il a chaud", "Parce qu'il est triste", "Parce qu'il a froid", "Parce qu'il a peur"],
    "Parce qu'il a chaud", 'Pense au grand panier et au long chemin.',
    "<b>Parce qu'il a chaud</b> — il a porté le panier au soleil.");

  ask(7, 'marche', 'lecture_comprehension', 2, 'Dans le texte, que veut dire « panier » ?',
    ['Un sac pour porter', 'Un banc pour dormir', 'Un plat pour manger', 'Un livre pour lire'],
    'Un sac pour porter', 'Sami le porte pendant les courses.',
    '<b>Un sac pour porter</b> — on y met les fruits du marché.');

  ask(8, 'marche', 'lecture_comprehension', 1, 'Que fait Sami en dernier ?',
    ['Il boit son jus froid', 'Il prend le grand panier', 'Il regarde les tomates', 'Il part vers le marché'],
    'Il boit son jus froid', 'Regarde la dernière phrase.',
    '<b>Il boit son jus froid</b> — sur le chemin du retour.');

  // ── 3. À la plage ──────────────────────────────────────────────────────────
  ask(9, 'plage', 'lecture_comprehension', 1, 'Avec qui Nita nage-t-elle ?',
    ['Avec son frère', 'Avec sa grande sœur', 'Avec son papa', 'Avec sa tante'],
    'Avec son frère', 'Cherche le mot « nage » dans le texte.',
    '<b>Avec son frère</b> — Ravi nage avec elle.');

  ask(10, 'plage', 'lecture_comprehension', 2, 'Quel temps fait-il ce jour-là ?',
    ['Il fait beau', 'Il fait froid', 'Il fait nuit', 'Il pleut fort'],
    'Il fait beau', 'Le sable est chaud et la mer est bleue.',
    '<b>Il fait beau</b> — sable chaud et mer bleue le montrent.');

  ask(11, 'plage', 'lecture_comprehension', 2, 'Dans le texte, que veut dire « filao » ?',
    ['un grand arbre', 'un petit bateau', 'un gros poisson', 'un beau coquillage'],
    'un grand arbre', 'Maman prépare les sandwichs dessous.',
    '<b>un grand arbre</b> — on peut s’asseoir à son ombre.');

  ask(12, 'plage', 'lecture_comprehension', 2, "Quelle est l'idée principale du texte ?",
    ['Une sortie à la plage', 'Une visite chez le docteur', 'Une leçon de calcul', 'Un match de football'],
    'Une sortie à la plage', 'De quoi parle tout le texte ?',
    '<b>Une sortie à la plage</b> — la famille y passe la journée.');

  // ── 4. Un jour de pluie ────────────────────────────────────────────────────
  ask(13, 'pluie', 'lecture_comprehension', 1, 'Que dessine Ines ?',
    ['Un arc-en-ciel', 'Un gros bateau', 'Un petit chien', 'Un beau jardin'],
    'Un arc-en-ciel', 'Cherche le nom « Ines » dans le texte.',
    '<b>Un arc-en-ciel</b> — le texte le dit.');

  ask(14, 'pluie', 'lecture_comprehension', 2, 'Pourquoi les enfants restent-ils en classe ?',
    ["Parce qu'il pleut", "Parce qu'il fait nuit", "Parce qu'il est tard", "Parce qu'il a faim"],
    "Parce qu'il pleut", 'Regarde la première phrase du texte.',
    "<b>Parce qu'il pleut</b> — ils ne peuvent pas sortir.");

  ask(15, 'pluie', 'lecture_comprehension', 2, 'Dans le texte, que veut dire « gouttes » ?',
    ["De l'eau qui tombe", 'De la neige qui fond', 'Du vent qui souffle', 'Du feu qui brûle'],
    "De l'eau qui tombe", 'Yann les regarde sur la vitre.',
    "<b>De l'eau qui tombe</b> — la pluie fait des gouttes.");

  ask(16, 'pluie', 'lecture_comprehension', 2, 'De quoi parle le texte ?',
    ["D'un jour de pluie", "D'un jour de chaleur", "D'un jour de sport", "D'un jour de fête"],
    "D'un jour de pluie", 'Pense au temps qu’il fait dans le texte.',
    "<b>D'un jour de pluie</b> — la classe reste dedans.");

  // ── 5. Les animaux de grand-mère ───────────────────────────────────────────
  ask(17, 'animaux', 'lecture_comprehension', 1, 'Combien de poules y a-t-il ?',
    ['Trois poules', 'Quatre poules', 'Deux poules', 'Cinq poules'],
    'Trois poules', 'Compte dans la première phrase.',
    '<b>Trois poules</b> — le texte le dit.');

  ask(18, 'animaux', 'lecture_comprehension', 2, 'Que mangent les poules ?',
    ['Elles mangent du maïs', 'Elles mangent des mangues', 'Elles mangent du pain', 'Elles mangent du riz'],
    'Elles mangent du maïs', 'Regarde ce que grand-mère leur donne.',
    '<b>Elles mangent du maïs</b> — grand-mère leur en donne.');

  ask(19, 'animaux', 'lecture_comprehension', 2, 'Dans le texte, que veut dire « pondent » ?',
    ['font des œufs', 'font une sieste', 'font un trou', 'font du bruit'],
    'font des œufs', 'Relis la phrase sur les poules.',
    '<b>font des œufs</b> — les poules pondent chaque matin.');

  ask(20, 'animaux', 'lecture_comprehension', 2, "Quelle est l'idée principale du texte ?",
    ['Les animaux du jardin', 'Les repas de la famille', 'Les fleurs du jardin', 'Les jouets de Bruno'],
    'Les animaux du jardin', 'De quoi parle chaque phrase ?',
    '<b>Les animaux du jardin</b> — chien, chats et poules.');

  // ── 6. La famille de Kevin ─────────────────────────────────────────────────
  ask(21, 'famille', 'lecture_comprehension', 1, 'Quel est le métier du papa de Kevin ?',
    ['Il est pêcheur', 'Il est boulanger', 'Il est chauffeur', 'Il est jardinier'],
    'Il est pêcheur', 'Cherche le mot « papa » dans le texte.',
    '<b>Il est pêcheur</b> — le texte le dit.');

  ask(22, 'famille', 'lecture_comprehension', 2, "Kevin est-il plus âgé qu'Anaïs ?",
    ['Oui, il est plus âgé', 'Non, il est plus jeune', 'Oui, il est plus petit', 'Non, ils sont jumeaux'],
    'Oui, il est plus âgé', 'Anaïs est sa <i>petite</i> sœur.',
    '<b>Oui, il est plus âgé</b> — Anaïs est la petite sœur.');

  ask(23, 'famille', 'lecture_comprehension', 2, 'Dans le texte, que veut dire « infirmière » ?',
    ['Elle soigne les gens', 'Elle répare les vélos', 'Elle vend des fruits', 'Elle conduit un bus'],
    'Elle soigne les gens', 'On la trouve à l’hôpital.',
    '<b>Elle soigne les gens</b> — la maman travaille à l’hôpital.');

  ask(24, 'famille', 'lecture_comprehension', 1, 'Que font les enfants après le repas ?',
    ['Ils jouent aux cartes', 'Ils rangent la cuisine', 'Ils lisent un livre', 'Ils font la sieste'],
    'Ils jouent aux cartes', 'Regarde la dernière phrase.',
    '<b>Ils jouent aux cartes</b> — après le repas du dimanche.');

  // ── 7. La fête de Sarah ────────────────────────────────────────────────────
  ask(25, 'fete', 'lecture_comprehension', 1, 'Quel âge a Sarah ?',
    ['Elle a sept ans', 'Elle a huit ans', 'Elle a neuf ans', 'Elle a cinq ans'],
    'Elle a sept ans', 'Relis la première phrase.',
    '<b>Elle a sept ans</b> — le texte le dit.');

  ask(26, 'fete', 'lecture_comprehension', 2, 'Que fête Sarah aujourd’hui ?',
    ['Un anniversaire', 'Une belle victoire', 'Un jour de classe', 'Un long voyage'],
    'Un anniversaire', 'Pense au gâteau et aux bougies.',
    '<b>Un anniversaire</b> — bougies, cadeaux et gâteau.');

  ask(27, 'fete', 'lecture_comprehension', 2, 'Dans le texte, que veut dire « vœu » ?',
    ['Un joli souhait', 'Un grand chapeau', 'Un joli cadeau', 'Un gros gâteau'],
    'Un joli souhait', 'On le fait en soufflant les bougies.',
    '<b>Un joli souhait</b> — Sarah souhaite quelque chose.');

  ask(28, 'fete', 'lecture_comprehension', 1, 'Que fait Sarah à la fin du texte ?',
    ['Elle souffle ses bougies', 'Elle range tous les cadeaux', 'Elle coupe le gâteau', 'Elle ouvre la porte'],
    'Elle souffle ses bougies', 'Regarde la dernière phrase.',
    '<b>Elle souffle ses bougies</b> — puis elle fait un vœu.');

  // ── 8. À la bibliothèque ───────────────────────────────────────────────────
  ask(29, 'livres', 'lecture_comprehension', 1, 'Sur quoi est le livre de Rita ?',
    ['Sur les dauphins', 'Sur les grands avions', 'Sur les volcans', 'Sur les tortues'],
    'Sur les dauphins', 'Cherche le verbe « choisit ».',
    '<b>Sur les dauphins</b> — le texte le dit.');

  ask(30, 'livres', 'lecture_comprehension', 2, 'Pourquoi la dame note-t-elle le nom de Rita ?',
    ['Rita emporte le livre', 'Rita chante une chanson', 'Rita change de classe', 'Rita perd son cahier'],
    'Rita emporte le livre', 'On note les noms pour les prêts.',
    '<b>Rita emporte le livre</b> — la dame garde une trace.');

  ask(31, 'livres', 'lecture_comprehension', 2, 'Dans le texte, que veut dire « en silence » ?',
    ['sans faire de bruit', 'sans bouger les mains', 'sans ouvrir les yeux', 'sans manger le midi'],
    'sans faire de bruit', 'On lit ainsi à la bibliothèque.',
    '<b>sans faire de bruit</b> — Rita ne parle pas.');

  ask(32, 'livres', 'lecture_comprehension', 2, 'Quel titre convient le mieux à ce texte ?',
    ['Rita lit un livre', 'Rita mange une glace', 'Rita joue au ballon', 'Rita perd son sac'],
    'Rita lit un livre', 'Pense à ce que Rita fait partout dans le texte.',
    '<b>Rita lit un livre</b> — tout le texte parle de sa lecture.');
})();
