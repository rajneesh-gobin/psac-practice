'use strict';
// @enrichment - Bonus chapter "Relier les Phrases". DERIVED from the syllabus
// (pronoms relatifs, conjonctions), NOT a direct MIE chapter. DO NOT remove
// during syllabus alignment audits.
//
// Grade 4 level: qui / que / où only - no "dont", no subjunctive, no "bien que".
// Those arrive in Grade 5 and Grade 6, which carry the same five subsections so
// a child meets the same five ideas three years running, each time harder.
//
// ⚠ Apostrophes are the typographic ’ (U+2019) throughout, so nothing needs
//   escaping inside single-quoted JS strings. Do not "normalise" them to '.
(function () {
  const CH = 'g4fr-enr-relier';
  let n = 0;
  const J = (sub, diff, given, a, b, right, wrong, hint, why) => {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g4fr-rel-${String(n).padStart(3, '0')}`,
      chapterId: CH, subsection: sub, difficulty: diff,
      question: `Relie les deux phrases avec « <b>${given}</b> ». `
        + `Fais les changements nécessaires s’il y a lieu.<br>`
        + `<i>${a}</i> &nbsp; <i>${b}</i>`,
      options: [right, ...wrong], answer: right, hint, explanation: why,
    }));
  };

  // ── 1 · PRONOMS RELATIFS (qui / que / où) ───────────────────────────────
  J('relatifs', 1, 'qui', 'Je vois un oiseau.', 'L’oiseau chante.',
    'Je vois un oiseau qui chante.',
    ['Je vois un oiseau que chante.',
     'Je vois un oiseau où chante.',
     'Je vois un oiseau qui l’oiseau chante.'],
    'Qui fait l’action de chanter ?',
    'C’est l’oiseau qui chante : il est <b>sujet</b>, donc on emploie <b>qui</b>. Le nom répété disparaît.');

  J('relatifs', 2, 'que', 'Voici le gâteau.', 'Maman a préparé le gâteau.',
    'Voici le gâteau que maman a préparé.',
    ['Voici le gâteau qui maman a préparé.',
     'Voici le gâteau où maman a préparé.',
     'Voici le gâteau que maman a préparé le gâteau.'],
    '« le gâteau » subit l’action : c’est le COD.',
    'Le gâteau ne fait rien, il <b>est préparé</b> : c’est le COD, donc <b>que</b>.');

  J('relatifs', 2, 'où', 'Voici l’école.', 'J’apprends le français dans cette école.',
    'Voici l’école où j’apprends le français.',
    ['Voici l’école que j’apprends le français.',
     'Voici l’école qui j’apprends le français.',
     'Voici l’école où j’apprends le français dans cette école.'],
    'Un lieu → « où ».',
    '« dans cette école » indique un <b>lieu</b> : on le remplace par <b>où</b>.');

  J('relatifs', 1, 'qui', 'J’ai un ami.', 'Mon ami habite à Curepipe.',
    'J’ai un ami qui habite à Curepipe.',
    ['J’ai un ami que habite à Curepipe.',
     'J’ai un ami où habite à Curepipe.',
     'J’ai un ami qui mon ami habite à Curepipe.'],
    'Après « qui », le verbe vient tout de suite.',
    'L’ami fait l’action d’habiter : il est sujet, donc <b>qui</b>, suivi directement du verbe.');

  J('relatifs', 2, 'que', 'Le film est amusant.', 'Nous regardons le film.',
    'Le film que nous regardons est amusant.',
    ['Le film qui nous regardons est amusant.',
     'Le film où nous regardons est amusant.',
     'Le film que nous regardons le film est amusant.'],
    'Le pronom relatif se place juste après le nom.',
    '« Le film » est le COD de « regardons » → <b>que</b>. La relative se glisse entre le nom et son verbe.');

  J('relatifs', 2, 'où', 'C’est la maison.', 'Ma grand-mère habite dans cette maison.',
    'C’est la maison où ma grand-mère habite.',
    ['C’est la maison que ma grand-mère habite.',
     'C’est la maison qui ma grand-mère habite.',
     'C’est la maison où ma grand-mère habite dans cette maison.'],
    'On parle d’un endroit.',
    'Pour un endroit, le pronom relatif est <b>où</b>.');

  J('relatifs', 3, 'qui', 'Le chat dort.', 'Le chat est noir et blanc.',
    'Le chat qui est noir et blanc dort.',
    ['Le chat que est noir et blanc dort.',
     'Le chat qui il est noir et blanc dort.',
     'Le chat dort qui est noir et blanc le chat.'],
    'La description se place juste après le nom.',
    '« Le chat <b>qui est noir et blanc</b> dort. » La relative décrit le chat et s’insère avant le verbe principal.');

  J('relatifs', 3, 'que', 'J’aime la chanson.', 'Tu chantes cette chanson.',
    'J’aime la chanson que tu chantes.',
    ['J’aime la chanson qui tu chantes.',
     'J’aime la chanson où tu chantes.',
     'J’aime la chanson que tu chantes cette chanson.'],
    'C’est toi qui chantes : la chanson est le COD.',
    'Le sujet est « tu », la chanson subit l’action : on emploie <b>que</b>.');

  J('relatifs', 2, 'qui', 'Regarde le bateau.', 'Le bateau entre dans le port.',
    'Regarde le bateau qui entre dans le port.',
    ['Regarde le bateau que entre dans le port.',
     'Regarde le bateau où entre dans le port.',
     'Regarde le bateau qui le bateau entre dans le port.'],
    'Le bateau fait l’action d’entrer.',
    'Sujet du verbe « entre » → <b>qui</b>.');

  J('relatifs', 3, 'où', 'Je me souviens du jour.', 'Nous avons gagné le match ce jour-là.',
    'Je me souviens du jour où nous avons gagné le match.',
    ['Je me souviens du jour que nous avons gagné le match.',
     'Je me souviens du jour qui nous avons gagné le match.',
     'Je me souviens du jour où nous avons gagné le match ce jour-là.'],
    '« où » ne sert pas qu’aux lieux.',
    '<b>où</b> s’emploie aussi pour le <b>temps</b> : « le jour <b>où</b> », « le moment <b>où</b> ».');

  // ── 2 · EXPRIMER LA CAUSE ───────────────────────────────────────────────
  J('cause', 1, 'parce que', 'Je mets mon pull.', 'Il fait froid.',
    'Je mets mon pull parce qu’il fait froid.',
    ['Je mets mon pull parce que il fait froid.',
     'Parce que je mets mon pull, il fait froid.',
     'Je mets parce que mon pull il fait froid.'],
    'Attention à ce qui se passe devant « il ».',
    '« que » s’élide devant une voyelle : <b>parce qu’il</b>. Et la cause (le froid) suit « parce que ».');

  J('cause', 1, 'parce que', 'Le chat se cache.', 'Le bruit lui fait peur.',
    'Le chat se cache parce que le bruit lui fait peur.',
    ['Parce que le chat se cache, le bruit lui fait peur.',
     'Le chat parce que se cache le bruit lui fait peur.',
     'Le bruit lui fait peur parce que le chat se cache.'],
    'Quelle phrase explique l’autre ?',
    'La peur est la <b>cause</b> ; elle se place après « parce que ».');

  J('cause', 2, 'car', 'Nous rentrons vite.', 'La nuit tombe.',
    'Nous rentrons vite, car la nuit tombe.',
    ['Car nous rentrons vite, la nuit tombe.',
     'Nous car rentrons vite la nuit tombe.',
     'Car la nuit tombe, nous rentrons vite.'],
    '« car » ne commence jamais une phrase.',
    '<b>car</b> se place au milieu, après une virgule : « Nous rentrons vite<b>, car</b> la nuit tombe. »');

  J('cause', 3, 'comme', 'Il pleut.', 'Nous restons à la maison.',
    'Comme il pleut, nous restons à la maison.',
    ['Nous restons à la maison comme il pleut.',
     'Comme nous restons à la maison, il pleut.',
     'Il pleut comme nous restons à la maison.'],
    '« comme » causal ouvre la phrase.',
    'Quand <b>comme</b> exprime la cause, il se met <b>en tête de phrase</b>, suivi d’une virgule.');

  J('cause', 1, 'parce que', 'Elle sourit.', 'Elle est contente.',
    'Elle sourit parce qu’elle est contente.',
    ['Elle sourit parce que elle est contente.',
     'Parce qu’elle sourit, elle est contente.',
     'Elle parce qu’elle sourit est contente.'],
    'Élision devant « elle ».',
    'Devant une voyelle, « que » devient <b>qu’</b> : « parce <b>qu’elle</b> est contente ».');

  J('cause', 2, 'parce que', 'Je prends un parapluie.', 'La pluie tombe.',
    'Je prends un parapluie parce que la pluie tombe.',
    ['Parce que je prends un parapluie, la pluie tombe.',
     'Je prends parce que un parapluie la pluie tombe.',
     'La pluie tombe parce que je prends un parapluie.'],
    'Le parapluie ne fait pas tomber la pluie !',
    'La pluie est la <b>cause</b>, le parapluie la conséquence : « parce que » se place devant la cause.');

  J('cause', 2, 'car', 'Papa allume la lampe.', 'La pièce est sombre.',
    'Papa allume la lampe, car la pièce est sombre.',
    ['Car papa allume la lampe, la pièce est sombre.',
     'Papa car allume la lampe la pièce est sombre.',
     'Car la pièce est sombre, papa allume la lampe.'],
    'Virgule + « car » + explication.',
    '<b>car</b> apporte l’explication et reste à l’intérieur de la phrase.');

  J('cause', 3, 'comme', 'Le bus est en retard.', 'Nous attendons à l’arrêt.',
    'Comme le bus est en retard, nous attendons à l’arrêt.',
    ['Nous attendons à l’arrêt comme le bus est en retard.',
     'Comme nous attendons à l’arrêt, le bus est en retard.',
     'Le bus est en retard comme nous attendons à l’arrêt.'],
    'Cause d’abord, virgule, puis le résultat.',
    '<b>Comme</b> causal se place toujours au début : « <b>Comme</b> le bus est en retard, nous attendons. »');

  J('cause', 2, 'parce que', 'Les fleurs poussent bien.', 'Le jardinier les arrose.',
    'Les fleurs poussent bien parce que le jardinier les arrose.',
    ['Parce que les fleurs poussent bien, le jardinier les arrose.',
     'Les fleurs parce que poussent bien le jardinier les arrose.',
     'Le jardinier les arrose parce que les fleurs poussent bien.'],
    'L’arrosage explique la belle pousse.',
    'La cause est l’arrosage : elle vient après <b>parce que</b>.');

  J('cause', 2, 'parce que', 'Je ferme la fenêtre.', 'Le vent souffle.',
    'Je ferme la fenêtre parce que le vent souffle.',
    ['Parce que je ferme la fenêtre, le vent souffle.',
     'Je ferme parce que la fenêtre le vent souffle.',
     'Le vent souffle parce que je ferme la fenêtre.'],
    'Qu’est-ce qui explique quoi ?',
    'Le vent est la raison de fermer : c’est la <b>cause</b>, placée après « parce que ».');

  // ── 3 · EXPRIMER L’OPPOSITION ───────────────────────────────────────────
  J('opposition', 1, 'mais', 'Il est fatigué.', 'Il continue à marcher.',
    'Il est fatigué, mais il continue à marcher.',
    ['Mais il est fatigué, il continue à marcher.',
     'Il est mais fatigué il continue à marcher.',
     'Il est fatigué il continue mais à marcher.'],
    '« mais » se place après la virgule.',
    '<b>mais</b> relie deux idées contraires et ne commence pas la phrase.');

  J('opposition', 1, 'mais', 'Le gâteau est petit.', 'Il est délicieux.',
    'Le gâteau est petit, mais il est délicieux.',
    ['Mais le gâteau est petit, il est délicieux.',
     'Le gâteau mais est petit il est délicieux.',
     'Le gâteau est petit, il est mais délicieux.'],
    'Virgule, puis « mais ».',
    'La deuxième idée corrige la première : « petit<b>, mais</b> délicieux ».');

  J('opposition', 2, 'mais', 'Il fait beau.', 'L’eau est encore froide.',
    'Il fait beau, mais l’eau est encore froide.',
    ['Mais il fait beau, l’eau est encore froide.',
     'Il fait mais beau l’eau est encore froide.',
     'Il fait beau, l’eau mais est encore froide.'],
    'Deux faits qui ne vont pas ensemble.',
    'On attendrait une eau chaude par beau temps : <b>mais</b> marque cette opposition.');

  J('opposition', 2, 'mais', 'J’ai cherché partout.', 'Je n’ai pas trouvé mes clés.',
    'J’ai cherché partout, mais je n’ai pas trouvé mes clés.',
    ['Mais j’ai cherché partout, je n’ai pas trouvé mes clés.',
     'J’ai mais cherché partout je n’ai pas trouvé mes clés.',
     'J’ai cherché partout, je n’ai mais pas trouvé mes clés.'],
    'Le résultat est contraire à l’effort.',
    'Chercher partout devrait suffire : <b>mais</b> annonce l’échec inattendu.');

  J('opposition', 3, 'pourtant', 'Ce problème est facile.', 'Personne n’a trouvé la réponse.',
    'Ce problème est facile ; pourtant, personne n’a trouvé la réponse.',
    ['Pourtant ce problème est facile personne n’a trouvé la réponse.',
     'Ce problème est pourtant facile, personne n’a trouvé pourtant.',
     'Ce problème est facile, personne n’a trouvé la pourtant réponse.'],
    '« pourtant » annonce une surprise.',
    '<b>pourtant</b> souligne un résultat inattendu, après un point-virgule et suivi d’une virgule.');

  J('opposition', 2, 'mais', 'Elle a peur de l’eau.', 'Elle veut apprendre à nager.',
    'Elle a peur de l’eau, mais elle veut apprendre à nager.',
    ['Mais elle a peur de l’eau, elle veut apprendre à nager.',
     'Elle a mais peur de l’eau elle veut apprendre à nager.',
     'Elle a peur de l’eau, elle veut mais apprendre à nager.'],
    'Peur et volonté s’opposent.',
    'Les deux idées se contredisent : <b>mais</b> est le mot qui les relie.');

  J('opposition', 2, 'mais', 'Le sac est lourd.', 'Je peux le porter.',
    'Le sac est lourd, mais je peux le porter.',
    ['Mais le sac est lourd, je peux le porter.',
     'Le sac est mais lourd je peux le porter.',
     'Le sac est lourd, je peux mais le porter.'],
    'Après la virgule vient « mais ».',
    'Le poids devrait empêcher de porter : <b>mais</b> montre que ce n’est pas le cas.');

  J('opposition', 3, 'pourtant', 'Il a mangé un grand repas.', 'Il a encore faim.',
    'Il a mangé un grand repas ; pourtant, il a encore faim.',
    ['Pourtant il a mangé un grand repas il a encore faim.',
     'Il a pourtant mangé un grand repas, il a encore pourtant faim.',
     'Il a mangé un grand repas, il a encore pourtant faim.'],
    'Le résultat étonne.',
    'Après un grand repas, on n’a plus faim : <b>pourtant</b> marque l’étonnement.');

  J('opposition', 2, 'mais', 'La leçon est longue.', 'Elle est intéressante.',
    'La leçon est longue, mais elle est intéressante.',
    ['Mais la leçon est longue, elle est intéressante.',
     'La leçon mais est longue elle est intéressante.',
     'La leçon est longue, elle mais est intéressante.'],
    'Virgule + « mais » + seconde idée.',
    'Une leçon longue paraît ennuyeuse : <b>mais</b> corrige cette impression.');

  J('opposition', 3, 'mais', 'Sami s’est levé tôt.', 'Il a raté le bus.',
    'Sami s’est levé tôt, mais il a raté le bus.',
    ['Mais Sami s’est levé tôt, il a raté le bus.',
     'Sami s’est mais levé tôt il a raté le bus.',
     'Sami s’est levé tôt, il a mais raté le bus.'],
    'Se lever tôt devrait éviter cela.',
    'Le résultat est contraire à ce qu’on attendait : c’est le rôle de <b>mais</b>.');

  // ── 4 · SITUER DANS LE TEMPS ────────────────────────────────────────────
  J('temps', 1, 'quand', 'La cloche sonne.', 'Les élèves sortent en récréation.',
    'Quand la cloche sonne, les élèves sortent en récréation.',
    ['La cloche sonne quand, les élèves sortent en récréation.',
     'Quand les élèves sortent en récréation, la cloche sonne.',
     'La cloche quand sonne les élèves sortent en récréation.'],
    'Le moment d’abord, puis l’action.',
    '<b>Quand</b> ouvre la phrase et une virgule sépare les deux parties.');

  J('temps', 1, 'quand', 'Je rentre de l’école.', 'Je goûte.',
    'Quand je rentre de l’école, je goûte.',
    ['Je rentre de l’école quand, je goûte.',
     'Quand je goûte, je rentre de l’école.',
     'Je quand rentre de l’école je goûte.'],
    'Que fais-tu en premier ?',
    'Le retour vient avant le goûter : il se place après <b>quand</b>.');

  J('temps', 2, 'pendant que', 'Papa conduit.', 'Nous chantons dans la voiture.',
    'Pendant que papa conduit, nous chantons dans la voiture.',
    ['Papa conduit pendant que, nous chantons dans la voiture.',
     'Pendant que nous chantons dans la voiture pendant que papa conduit.',
     'Papa pendant que conduit nous chantons dans la voiture.'],
    'Les deux actions ont lieu en même temps.',
    '<b>Pendant que</b> montre deux actions <b>simultanées</b>.');

  J('temps', 2, 'quand', 'Le soleil se lève.', 'Les coqs chantent.',
    'Quand le soleil se lève, les coqs chantent.',
    ['Le soleil se lève quand, les coqs chantent.',
     'Quand les coqs chantent, le soleil se lève quand.',
     'Le soleil quand se lève les coqs chantent.'],
    'Le lever du soleil donne le moment.',
    'Le moment se place après <b>quand</b>, puis vient ce qui se passe.');

  J('temps', 3, 'pendant que', 'Maman lit son journal.', 'Le bébé dort.',
    'Pendant que maman lit son journal, le bébé dort.',
    ['Maman lit son journal pendant que, le bébé dort.',
     'Pendant que le bébé dort pendant que maman lit son journal.',
     'Maman lit pendant que son journal le bébé dort.'],
    'Deux choses en même temps.',
    '<b>Pendant que</b> relie deux actions qui durent ensemble.');

  J('temps', 2, 'quand', 'Il pleut.', 'Nous jouons à l’intérieur.',
    'Quand il pleut, nous jouons à l’intérieur.',
    ['Il pleut quand, nous jouons à l’intérieur.',
     'Quand nous jouons à l’intérieur, il pleut.',
     'Il quand pleut nous jouons à l’intérieur.'],
    'La pluie donne le moment.',
    '« <b>Quand</b> il pleut » indique dans quel cas on joue dedans.');

  J('temps', 4, 'quand', 'J’aurai dix ans.', 'J’apprendrai à nager.',
    'Quand j’aurai dix ans, j’apprendrai à nager.',
    ['Quand j’ai dix ans, j’apprendrai à nager.',
     'Quand j’aurai dix ans, j’apprends à nager.',
     'J’apprendrai à nager quand, j’aurai dix ans.'],
    'Les deux actions sont dans le futur.',
    '⚠ Après <b>quand</b>, le français met le <b>futur</b> si l’action est future : « Quand j’<b>aurai</b>… j’<b>apprendrai</b>… ».');

  J('temps', 2, 'quand', 'La récréation se termine.', 'Nous retournons en classe.',
    'Quand la récréation se termine, nous retournons en classe.',
    ['La récréation se termine quand, nous retournons en classe.',
     'Quand nous retournons en classe, la récréation se termine.',
     'La récréation quand se termine nous retournons en classe.'],
    'La fin de la récréation est le moment.',
    'Le moment vient après <b>quand</b>, l’action ensuite.');

  J('temps', 2, 'pendant que', 'Le maître explique.', 'Les élèves écoutent.',
    'Pendant que le maître explique, les élèves écoutent.',
    ['Le maître explique pendant que, les élèves écoutent.',
     'Pendant que les élèves écoutent pendant que le maître explique.',
     'Le maître pendant que explique les élèves écoutent.'],
    'Les deux se passent en même temps.',
    'Explication et écoute sont <b>simultanées</b> : « pendant que » convient.');

  J('temps', 4, 'quand', 'Nous arriverons à la plage.', 'Nous chercherons des coquillages.',
    'Quand nous arriverons à la plage, nous chercherons des coquillages.',
    ['Quand nous arrivons à la plage, nous chercherons des coquillages.',
     'Quand nous arriverons à la plage, nous cherchons des coquillages.',
     'Nous chercherons des coquillages quand, nous arriverons à la plage.'],
    'Tout se passe plus tard : quel temps ?',
    'Les deux verbes sont au <b>futur</b> : « Quand nous <b>arriverons</b>… nous <b>chercherons</b>… ».');

  // ── 5 · LE BUT & LA CONSÉQUENCE ─────────────────────────────────────────
  J('but_consequence', 2, 'donc', 'Il n’y a plus de pain.', 'Je vais à la boutique.',
    'Il n’y a plus de pain, donc je vais à la boutique.',
    ['Donc il n’y a plus de pain, je vais à la boutique.',
     'Il n’y a donc plus de pain je vais à la boutique donc.',
     'Je vais à la boutique, donc il n’y a plus de pain.'],
    '« donc » annonce le résultat.',
    'Le manque de pain est la cause ; aller à la boutique en est la <b>conséquence</b>, après « donc ».');

  J('but_consequence', 3, 'pour', 'Je me dépêche.', 'Je veux arriver à l’heure.',
    'Je me dépêche pour arriver à l’heure.',
    ['Je me dépêche pour que j’arrive à l’heure.',
     'Je me dépêche pour je veux arriver à l’heure.',
     'Pour arriver à l’heure je me dépêche pour.'],
    'Le sujet est le même dans les deux phrases.',
    'Même sujet (je / je) → <b>pour + infinitif</b> : « pour <b>arriver</b> à l’heure ».');

  J('but_consequence', 2, 'donc', 'Le magasin est fermé.', 'Nous reviendrons demain.',
    'Le magasin est fermé, donc nous reviendrons demain.',
    ['Donc le magasin est fermé, nous reviendrons demain.',
     'Le magasin est donc fermé nous reviendrons donc demain.',
     'Nous reviendrons demain, donc le magasin est fermé.'],
    'Quelle phrase est le résultat ?',
    'Revenir demain est la <b>conséquence</b> de la fermeture.');

  J('but_consequence', 4, 'pour', 'Lina économise son argent.', 'Elle veut acheter un livre.',
    'Lina économise son argent pour acheter un livre.',
    ['Lina économise son argent pour qu’elle achète un livre.',
     'Lina économise son argent pour elle veut acheter un livre.',
     'Pour acheter un livre Lina économise pour son argent.'],
    'C’est Lina qui économise ET qui achètera.',
    'Un seul sujet → <b>pour + infinitif</b>. On n’emploie « pour que » que si les sujets sont différents.');

  J('but_consequence', 2, 'alors', 'Il commençait à pleuvoir.', 'Nous sommes rentrés.',
    'Il commençait à pleuvoir, alors nous sommes rentrés.',
    ['Alors il commençait à pleuvoir, nous sommes rentrés.',
     'Il commençait alors à pleuvoir nous sommes rentrés alors.',
     'Nous sommes rentrés, alors il commençait à pleuvoir.'],
    '« alors » introduit ce qui s’ensuit.',
    'La pluie provoque le retour : <b>alors</b> annonce la conséquence.');

  J('but_consequence', 3, 'pour', 'Nous rangeons la classe.', 'Nous voulons faire plaisir au maître.',
    'Nous rangeons la classe pour faire plaisir au maître.',
    ['Nous rangeons la classe pour que nous fassions plaisir au maître.',
     'Nous rangeons la classe pour nous voulons faire plaisir au maître.',
     'Pour faire plaisir au maître nous rangeons pour la classe.'],
    'Même sujet des deux côtés.',
    'Sujet identique (nous / nous) → <b>pour + infinitif</b>.');

  J('but_consequence', 2, 'donc', 'J’ai oublié mon cahier.', 'Je ne peux pas faire l’exercice.',
    'J’ai oublié mon cahier, donc je ne peux pas faire l’exercice.',
    ['Donc j’ai oublié mon cahier, je ne peux pas faire l’exercice.',
     'J’ai donc oublié mon cahier je ne peux donc pas faire l’exercice.',
     'Je ne peux pas faire l’exercice, donc j’ai oublié mon cahier.'],
    'L’oubli vient en premier.',
    'Ne pas pouvoir travailler est la <b>conséquence</b> de l’oubli.');

  J('but_consequence', 2, 'alors', 'Le bus était plein.', 'Nous avons attendu le suivant.',
    'Le bus était plein, alors nous avons attendu le suivant.',
    ['Alors le bus était plein, nous avons attendu le suivant.',
     'Le bus était alors plein nous avons alors attendu le suivant.',
     'Nous avons attendu le suivant, alors le bus était plein.'],
    'Que s’est-il passé ensuite ?',
    'Attendre le bus suivant est ce qui découle du premier bus plein : <b>alors</b>.');

  J('but_consequence', 4, 'pour', 'Papa se lève tôt.', 'Il veut préparer le petit-déjeuner.',
    'Papa se lève tôt pour préparer le petit-déjeuner.',
    ['Papa se lève tôt pour qu’il prépare le petit-déjeuner.',
     'Papa se lève tôt pour il veut préparer le petit-déjeuner.',
     'Pour préparer le petit-déjeuner papa se lève pour tôt.'],
    'Papa fait les deux actions.',
    'Même sujet → <b>pour + infinitif</b> : « pour <b>préparer</b> le petit-déjeuner ».');

  J('but_consequence', 2, 'donc', 'Il fait très chaud aujourd’hui.', 'Nous buvons beaucoup d’eau.',
    'Il fait très chaud aujourd’hui, donc nous buvons beaucoup d’eau.',
    ['Donc il fait très chaud aujourd’hui, nous buvons beaucoup d’eau.',
     'Il fait donc très chaud aujourd’hui nous buvons donc beaucoup d’eau.',
     'Nous buvons beaucoup d’eau, donc il fait très chaud aujourd’hui.'],
    'La chaleur explique la soif.',
    'Boire beaucoup est la <b>conséquence</b> de la chaleur : elle suit « donc ».');
})();
