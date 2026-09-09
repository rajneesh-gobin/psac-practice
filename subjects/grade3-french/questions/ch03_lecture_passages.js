'use strict';
// Grade 3 Français — Lecture : textes de compréhension plus longs.
// IDs: g3fr-pass-001 … g3fr-pass-040
//
// WHY THIS FILE EXISTS
// Measured 2026-09-09: g3fr-lecture held 75 items over 23 passages of 6 to 27
// words — three short sentences at most. Every question was "trouve le mot dans
// la phrase". A Grade 3 child reads a paragraph and holds it while answering
// several questions about it, which is a different skill.
//
// TEN passages of 50-65 French words, FOUR questions each. The four are
// deliberately different kinds of work:
//   1. LITTÉRALE     — la réponse est écrite dans le texte
//   2. INFÉRENCE     — la réponse est sous-entendue, jamais écrite
//   3. VOCABULAIRE   — le sens d'un mot d'après son contexte
//   4. IDÉE PRINCIPALE / ORDRE — de quoi parle tout le texte, ou dans quel ordre
//
// ⚠ The passage is repeated in every question that uses it, matching
//   ch03_lecture.js. The child must see the text while answering and there is
//   no passage-header mechanism in the renderer.
//
// ⚠ makeMCQ SHUFFLES its options, so authoring answer-first positions nothing.
//   All four must stay the same grammatical shape and a similar length —
//   `scripts/test-option-parity.js` fails on length leaks, and a child who
//   spots the longest option is not reading.
//
// ⚠ Accents matter and this file is UTF-8. A mangled « é » is a spelling error
//   in front of a child learning to spell.
//
// ⚠ Settings are Mauritian and everyday: le marché, la plage, la pluie, l'école,
//   la cour de récréation. A child should not decode an unfamiliar world before
//   decoding the sentence.
//
// ⚠ Difficulty stays 1-2, matching the rest of the pack. grade3-french is a
//   `noDifficulty: true` pack, so no level is ever shown — the labels stay
//   honest anyway.

(function () {

  const P = {
    marche: "Le samedi matin, Sanjay accompagne sa mère au marché de Rose-Hill. Les étals débordent de letchis, de mangues et d'ananas. Sa mère s'arrête toujours chez la même marchande, qui lui garde les plus beaux fruits. Sanjay porte le panier jusqu'à la maison. Il ne se plaint jamais, car il sait qu'il y aura du jus frais à midi.",
    pluie: "Il n'avait pas plu depuis un mois. Les feuilles du manguier étaient sèches et le petit ruisseau derrière l'école ne coulait presque plus. Chaque soir, les jardiniers regardaient le ciel. Un mercredi, les nuages sont enfin arrivés, gris et lourds, et la pluie est tombée si fort que les enfants sont sortis danser dessous.",
    chat: "Un petit chat gris s'est installé sous le banc de la cour. Il tremblait et miaulait doucement. Nadia lui a apporté un peu de lait dans une soucoupe. Le chat a d'abord reculé, puis il s'est approché lentement. Depuis ce jour, il attend Nadia chaque matin près de la grille de l'école.",
    plage: "Dimanche, la famille de Kavi est allée à la plage de Flic-en-Flac. Son père a étendu une natte sous les filaos. Kavi a construit un château de sable avec sa petite sœur, puis une vague est venue le renverser. Sa sœur allait pleurer, mais Kavi lui a dit qu'ils pouvaient en construire un plus grand.",
    velo: "Amina voulait apprendre à faire du vélo. Son grand frère a tenu la selle pendant qu'elle pédalait dans l'allée. Elle est tombée trois fois et s'est écorché le genou. Le quatrième jour, son frère a lâché la selle sans rien dire. Amina a roulé jusqu'au bout de l'allée avant de comprendre qu'elle était toute seule.",
    tortue: "Chaque année, les tortues vertes nagent très loin pour venir pondre sur la plage où elles sont nées. La femelle creuse un trou profond dans le sable pendant la nuit, dépose ses œufs et les recouvre avec soin. Elle ne verra jamais ses petits. À leur naissance, ils doivent trouver seuls le chemin de la mer.",
    jardin: "Rita a semé des graines de haricot dans un pot près de la cuisine. Elle les arrosait tous les matins avant l'école. Pendant deux semaines, il ne s'est rien passé. Rita commençait à perdre patience. Un dimanche, elle a découvert une petite tige verte, et elle a compris que tout se passait sous la terre.",
    ecole: "La nouvelle bibliothèque de l'école a ouvert un lundi. Yash a été le premier élève à entrer. Il s'attendait à une petite salle, mais les étagères montaient jusqu'au plafond. La bibliothécaire lui a montré comment trouver un livre grâce aux étiquettes de couleur. Yash a emprunté deux livres et a lu le premier avant le dîner.",
    fete: "Les tambours ont commencé après le coucher du soleil. Léa regardait sa tante nouer une jupe rouge et entrer dans le cercle des danseurs. La ravanne donnait le rythme et bientôt tout le monde tapait des mains. Léa était trop timide pour danser. Puis sa tante lui a tendu la main, et Léa s'est retrouvée au milieu du cercle.",
    dodo: "Le dodo était un grand oiseau qui vivait seulement à Maurice. Il ne savait pas voler, car il n'avait rien à fuir : pendant des milliers d'années, l'île n'avait ni chats, ni chiens, ni rats. Quand les marins sont arrivés, ils ont amené ces animaux avec eux. Le dodo n'avait jamais appris à se cacher.",
  };

  const ask = (n, key, sub, diff, q, opts, ans, hint, exp) => STATIC_QUESTIONS.push(
    makeMCQ({ id: `g3fr-pass-${String(n).padStart(3, '0')}`, chapterId: 'g3fr-lecture',
      difficulty: diff, subsection: sub,
      question: `Lis : "${P[key]}"<br><br>${q}`,
      options: opts, answer: ans, hint, explanation: exp }));

  // ── 1. Le marché ──────────────────────────────────────────────────────────
  ask(1, 'marche', 'lecture_comprehension', 1, "Qui garde les plus beaux fruits pour la mère de Sanjay ?",
    ["La marchande du marché", "La voisine de Sanjay", "La sœur de sa mère", "La dame de l'école"],
    "La marchande du marché", "Le texte la nomme.",
    "<b>La marchande du marché</b> — le texte dit que sa mère s'arrête « chez la même marchande, qui lui garde les plus beaux fruits ».");
  ask(2, 'marche', 'lecture_comprehension', 2, "Pourquoi Sanjay ne se plaint-il jamais de porter le panier ?",
    ["Il pense au jus frais de midi", "Le panier est très léger", "Sa mère l'aide à le porter", "Le chemin est vraiment court"],
    "Il pense au jus frais de midi", "La dernière phrase donne la raison.",
    "<b>Il pense au jus frais de midi</b> — « car il sait qu'il y aura du jus frais à midi ».");
  ask(3, 'marche', 'lecture_comprehension', 2, "Dans ce texte, « les étals débordent » veut dire qu'il y a ___.",
    ["beaucoup de fruits partout", "de l'eau sur les tables", "très peu de marchands", "des étals bien rangés"],
    "beaucoup de fruits partout", "Regarde ce qui déborde des étals.",
    "<b>Beaucoup de fruits partout</b> — « débordent de letchis, de mangues et d'ananas » décrit une grande quantité.");
  ask(4, 'marche', 'lecture_comprehension', 2, "De quoi parle surtout ce texte ?",
    ["D'une sortie au marché", "De la cuisine de sa mère", "Des fruits de Maurice", "Du chemin de l'école"],
    "D'une sortie au marché", "Cherche ce qui réunit toutes les phrases.",
    "<b>D'une sortie au marché</b> — chaque phrase fait partie de cette même matinée du samedi.");

  // ── 2. La pluie ───────────────────────────────────────────────────────────
  ask(5, 'pluie', 'lecture_comprehension', 1, "Depuis combien de temps n'avait-il pas plu ?",
    ["Depuis un mois", "Depuis une semaine", "Depuis deux jours", "Depuis un an"],
    "Depuis un mois", "La première phrase le dit.",
    "<b>Depuis un mois</b> — « Il n'avait pas plu depuis un mois. »");
  ask(6, 'pluie', 'lecture_comprehension', 2, "Pourquoi les jardiniers regardaient-ils le ciel chaque soir ?",
    ["Ils espéraient la pluie", "Ils comptaient les oiseaux", "Ils cherchaient la lune", "Ils avaient peur du vent"],
    "Ils espéraient la pluie", "Le texte ne le dit pas. Pense à ce qui manquait.",
    "<b>Ils espéraient la pluie</b> — les feuilles étaient sèches et le ruisseau ne coulait presque plus.");
  ask(7, 'pluie', 'lecture_comprehension', 2, "Ici, « sèches » décrit des feuilles qui ___.",
    ["manquent d'eau", "sont très vertes", "viennent de pousser", "tombent de l'arbre"],
    "manquent d'eau", "Que fait un mois sans pluie à un arbre ?",
    "<b>Manquent d'eau</b> — après un mois sans pluie, les feuilles du manguier se dessèchent.");
  ask(8, 'pluie', 'lecture_comprehension', 2, "Que s'est-il passé en dernier dans le texte ?",
    ["Les enfants ont dansé dehors", "Le ruisseau a cessé de couler", "Les nuages sont arrivés", "Les feuilles ont séché"],
    "Les enfants ont dansé dehors", "Suis l'ordre du récit.",
    "<b>Les enfants ont dansé dehors</b> — cela arrive après l'arrivée des nuages et de la pluie.");

  // ── 3. Le chat ────────────────────────────────────────────────────────────
  ask(9, 'chat', 'lecture_comprehension', 1, "Où le petit chat s'est-il installé ?",
    ["Sous le banc de la cour", "Près de la grille verte", "Dans la salle de classe", "Sous un arbre du jardin"],
    "Sous le banc de la cour", "La première phrase donne l'endroit.",
    "<b>Sous le banc de la cour</b> — « Un petit chat gris s'est installé sous le banc de la cour. »");
  ask(10, 'chat', 'lecture_comprehension', 2, "Que nous apprend le geste de Nadia sur elle ?",
    ["Elle est douce avec les animaux", "Elle a très peur des chats", "Elle aime beaucoup le lait", "Elle arrive souvent en retard"],
    "Elle est douce avec les animaux", "Le texte ne le dit pas. Regarde ce qu'elle fait.",
    "<b>Elle est douce avec les animaux</b> — elle apporte du lait à un chat qui tremble, sans le brusquer.");
  ask(11, 'chat', 'lecture_comprehension', 2, "Ici, « a reculé » veut dire que le chat ___.",
    ["s'est éloigné un peu", "a bu tout le lait", "s'est mis à courir", "est monté sur le banc"],
    "s'est éloigné un peu", "Que fait un animal timide quand on approche ?",
    "<b>S'est éloigné un peu</b> — il recule d'abord, « puis il s'est approché lentement ».");
  ask(12, 'chat', 'lecture_comprehension', 2, "Quel est le meilleur titre pour ce texte ?",
    ["Nadia et le chat de la cour", "Le lait de la récréation", "Une journée sous la pluie", "La grille de notre école"],
    "Nadia et le chat de la cour", "Un bon titre couvre tout le texte.",
    "<b>Nadia et le chat de la cour</b> — le chat et Nadia sont ensemble le sujet du texte entier.");

  // ── 4. La plage ───────────────────────────────────────────────────────────
  ask(13, 'plage', 'lecture_comprehension', 1, "Qu'a fait le père de Kavi en arrivant ?",
    ["Il a étendu une natte", "Il a bâti un château", "Il a nagé dans la mer", "Il a coupé des filaos"],
    "Il a étendu une natte", "Une phrase dit exactement ce qu'il a fait.",
    "<b>Il a étendu une natte</b> — « Son père a étendu une natte sous les filaos. »");
  ask(14, 'plage', 'lecture_comprehension', 2, "Pourquoi la petite sœur allait-elle pleurer ?",
    ["Son château était détruit", "Le sable était trop chaud", "Elle avait perdu sa natte", "La mer était très froide"],
    "Son château était détruit", "Regarde ce qui vient juste avant.",
    "<b>Son château était détruit</b> — « une vague est venue le renverser » juste avant sa réaction.");
  ask(15, 'plage', 'lecture_comprehension', 2, "Ici, « renverser » veut dire que la vague a ___.",
    ["fait tomber le château", "rempli le seau de sable", "mouillé la natte du père", "emporté les coquillages"],
    "fait tomber le château", "Que fait une vague à un château de sable ?",
    "<b>Fait tomber le château</b> — la vague abat ce que Kavi et sa sœur avaient construit.");
  ask(16, 'plage', 'lecture_comprehension', 2, "Que montre la réponse de Kavi à sa sœur ?",
    ["Il sait la consoler", "Il est fâché contre elle", "Il veut rentrer chez lui", "Il a peur de la mer"],
    "Il sait la consoler", "Le texte ne le dit pas. Écoute ce qu'il propose.",
    "<b>Il sait la consoler</b> — il lui propose d'en construire un plus grand plutôt que de se plaindre.");

  // ── 5. Le vélo ────────────────────────────────────────────────────────────
  ask(17, 'velo', 'lecture_comprehension', 1, "Combien de fois Amina est-elle tombée ?",
    ["Trois fois", "Deux fois", "Quatre fois", "Une seule fois"],
    "Trois fois", "Le texte donne le nombre.",
    "<b>Trois fois</b> — « Elle est tombée trois fois et s'est écorché le genou. »");
  ask(18, 'velo', 'lecture_comprehension', 2, "Pourquoi le frère a-t-il lâché la selle sans rien dire ?",
    ["Pour qu'elle roule sans le savoir", "Parce qu'il était très fatigué", "Parce qu'elle le lui avait demandé", "Pour aller chercher son vélo"],
    "Pour qu'elle roule sans le savoir", "Le texte ne le dit pas. Regarde ce qui arrive ensuite.",
    "<b>Pour qu'elle roule sans le savoir</b> — elle roule jusqu'au bout « avant de comprendre qu'elle était toute seule ».");
  ask(19, 'velo', 'lecture_comprehension', 2, "Ici, « s'est écorché » veut dire qu'Amina s'est ___.",
    ["blessé la peau", "cogné la tête", "sali la jupe", "tordu le pied"],
    "blessé la peau", "Cela arrive juste après une chute.",
    "<b>Blessé la peau</b> — s'écorcher le genou, c'est se faire une éraflure en tombant.");
  ask(20, 'velo', 'lecture_comprehension', 2, "De quoi parle surtout ce texte ?",
    ["D'Amina qui apprend à rouler", "D'une promenade en famille", "D'un genou qui fait très mal", "D'un vélo neuf et rouge"],
    "D'Amina qui apprend à rouler", "Cherche ce qui réunit tout le texte.",
    "<b>D'Amina qui apprend à rouler</b> — les chutes et le frère font partie de cet apprentissage.");

  // ── 6. Les tortues ────────────────────────────────────────────────────────
  ask(21, 'tortue', 'lecture_comprehension', 1, "Quand la femelle creuse-t-elle son trou ?",
    ["Pendant la nuit", "Au lever du jour", "En plein midi", "Avant la pluie"],
    "Pendant la nuit", "Une phrase donne le moment.",
    "<b>Pendant la nuit</b> — « La femelle creuse un trou profond dans le sable pendant la nuit. »");
  ask(22, 'tortue', 'lecture_comprehension', 2, "Pourquoi la mère ne verra-t-elle jamais ses petits ?",
    ["Elle repart avant leur naissance", "Elle pond sur une autre plage", "Les petits naissent le matin", "Elle oublie où sont les œufs"],
    "Elle repart avant leur naissance", "Regarde ce qu'elle fait après avoir recouvert les œufs.",
    "<b>Elle repart avant leur naissance</b> — elle recouvre les œufs et retourne à la mer.");
  ask(23, 'tortue', 'lecture_comprehension', 2, "Ici, « pondre » veut dire ___.",
    ["déposer ses œufs", "creuser le sable", "nager très loin", "nourrir ses petits"],
    "déposer ses œufs", "Le texte parle des œufs juste après.",
    "<b>Déposer ses œufs</b> — la femelle vient pondre, c'est-à-dire déposer ses œufs dans le sable.");
  ask(24, 'tortue', 'lecture_comprehension', 2, "Que doivent faire les petites tortues à leur naissance ?",
    ["Trouver seules la mer", "Attendre leur mère", "Rester dans le trou", "Suivre les autres tortues"],
    "Trouver seules la mer", "La dernière phrase le dit.",
    "<b>Trouver seules la mer</b> — « ils doivent trouver seuls le chemin de la mer ».");

  // ── 7. Le jardin ──────────────────────────────────────────────────────────
  ask(25, 'jardin', 'lecture_comprehension', 1, "Que faisait Rita tous les matins ?",
    ["Elle arrosait ses graines", "Elle comptait ses pots", "Elle changeait la terre", "Elle cueillait des haricots"],
    "Elle arrosait ses graines", "Une phrase dit ce qu'elle faisait avant l'école.",
    "<b>Elle arrosait ses graines</b> — « Elle les arrosait tous les matins avant l'école. »");
  ask(26, 'jardin', 'lecture_comprehension', 2, "Qu'a compris Rita à la fin du texte ?",
    ["Tout poussait sous la terre", "Les graines étaient mortes", "Il fallait plus d'eau", "Le pot était trop petit"],
    "Tout poussait sous la terre", "La dernière phrase donne sa découverte.",
    "<b>Tout poussait sous la terre</b> — « elle a compris que tout se passait sous la terre ».");
  ask(27, 'jardin', 'lecture_comprehension', 2, "Ici, « perdre patience » veut dire que Rita ___.",
    ["se lassait d'attendre", "oubliait d'arroser", "avait perdu un pot", "travaillait très vite"],
    "se lassait d'attendre", "Rien ne s'était passé pendant deux semaines.",
    "<b>Se lassait d'attendre</b> — après deux semaines sans rien voir, l'attente lui pesait.");
  ask(28, 'jardin', 'lecture_comprehension', 2, "Que s'est-il passé en premier dans le texte ?",
    ["Rita a semé des graines", "Une tige verte est sortie", "Rita a perdu patience", "Deux semaines ont passé"],
    "Rita a semé des graines", "Cherche l'événement dont tout le reste découle.",
    "<b>Rita a semé des graines</b> — tout le reste du texte suit ce premier geste.");

  // ── 8. La bibliothèque ────────────────────────────────────────────────────
  ask(29, 'ecole', 'lecture_comprehension', 1, "Combien de livres Yash a-t-il empruntés ?",
    ["Deux", "Un", "Trois", "Quatre"],
    "Deux", "La dernière phrase le dit.",
    "<b>Deux</b> — « Yash a emprunté deux livres et a lu le premier avant le dîner. »");
  ask(30, 'ecole', 'lecture_comprehension', 2, "En quoi la bibliothèque était-elle différente de ce qu'il croyait ?",
    ["Elle était bien plus grande", "Elle ouvrait plus tard", "Elle avait moins de livres", "Elle était fermée ce jour-là"],
    "Elle était bien plus grande", "Compare ce qu'il attendait et ce qu'il a vu.",
    "<b>Elle était bien plus grande</b> — il s'attendait à une petite salle, mais les étagères montaient au plafond.");
  ask(31, 'ecole', 'lecture_comprehension', 2, "À quoi servent les étiquettes de couleur ?",
    ["À retrouver un livre", "À décorer les étagères", "À compter les élèves", "À fermer la bibliothèque"],
    "À retrouver un livre", "La bibliothécaire lui montre quelque chose.",
    "<b>À retrouver un livre</b> — « comment trouver un livre grâce aux étiquettes de couleur ».");
  ask(32, 'ecole', 'lecture_comprehension', 2, "De quoi parle surtout ce texte ?",
    ["De la visite de Yash", "Du travail d'un lundi", "Des couleurs des livres", "Du dîner de la famille"],
    "De la visite de Yash", "Choisis ce qui couvre tout le texte.",
    "<b>De la visite de Yash</b> — l'ouverture, la surprise et l'emprunt font partie de cette visite.");

  // ── 9. La fête ────────────────────────────────────────────────────────────
  ask(33, 'fete', 'lecture_comprehension', 1, "Qu'est-ce qui donnait le rythme ?",
    ["La ravanne", "La jupe rouge", "Le coucher du soleil", "Le cercle des danseurs"],
    "La ravanne", "Une phrase le dit exactement.",
    "<b>La ravanne</b> — « La ravanne donnait le rythme et bientôt tout le monde tapait des mains. »");
  ask(34, 'fete', 'lecture_comprehension', 2, "Comment les sentiments de Léa ont-ils changé ?",
    ["De timide à joyeuse", "De fâchée à calme", "De fatiguée à pressée", "De surprise à timide"],
    "De timide à joyeuse", "Compare le début et la fin.",
    "<b>De timide à joyeuse</b> — « trop timide pour danser » au début, au milieu du cercle à la fin.");
  ask(35, 'fete', 'lecture_comprehension', 2, "Ici, « tendu la main » veut dire que la tante l'a ___.",
    ["invitée à danser", "aidée à se relever", "saluée de très loin", "grondée gentiment"],
    "invitée à danser", "Que se passe-t-il juste après ce geste ?",
    "<b>Invitée à danser</b> — juste après, Léa se retrouve au milieu du cercle.");
  ask(36, 'fete', 'lecture_comprehension', 2, "Qu'est-ce qui a décidé Léa à danser ?",
    ["Le geste de sa tante", "Le bruit des tambours", "La jupe rouge offerte", "Le rire des enfants"],
    "Le geste de sa tante", "Un petit geste change tout.",
    "<b>Le geste de sa tante</b> — le texte place ce geste juste avant qu'elle entre dans le cercle.");

  // ── 10. Le dodo ───────────────────────────────────────────────────────────
  ask(37, 'dodo', 'lecture_comprehension', 1, "Où vivait le dodo ?",
    ["Seulement à Maurice", "Sur plusieurs îles", "Dans les forêts d'Afrique", "Sur les bateaux des marins"],
    "Seulement à Maurice", "La première phrase le dit.",
    "<b>Seulement à Maurice</b> — « un grand oiseau qui vivait seulement à Maurice ».");
  ask(38, 'dodo', 'lecture_comprehension', 2, "Pourquoi ne pas voler n'était-il pas un problème ?",
    ["Rien ne le chassait sur l'île", "Il courait plus vite qu'eux", "Il savait très bien nager", "Il était trop grand à prendre"],
    "Rien ne le chassait sur l'île", "Le texte donne la raison dans la même phrase.",
    "<b>Rien ne le chassait sur l'île</b> — « l'île n'avait ni chats, ni chiens, ni rats ».");
  ask(39, 'dodo', 'lecture_comprehension', 2, "Ici, « à fuir » veut dire que le dodo n'avait rien à ___.",
    ["éviter en se sauvant", "manger dans la forêt", "chercher sur la plage", "construire pour dormir"],
    "éviter en se sauvant", "Fuir, c'est partir devant un danger.",
    "<b>Éviter en se sauvant</b> — aucun animal ne le poursuivait, donc il n'avait pas besoin de s'enfuir.");
  ask(40, 'dodo', 'lecture_comprehension', 2, "Qu'est-ce qui a changé quand les marins sont arrivés ?",
    ["Ils ont amené des animaux", "Ils ont planté des arbres", "Ils ont bâti une grande ville", "Ils ont appris à voler"],
    "Ils ont amené des animaux", "Regarde ce qui arrive sur l'île avec eux.",
    "<b>Ils ont amené des animaux</b> — « ils ont amené ces animaux avec eux », et le dodo ne savait pas se cacher.");

})();
