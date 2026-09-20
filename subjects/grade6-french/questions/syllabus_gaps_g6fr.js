'use strict';
// Grade 6 Français - les huit points de grammaire que le syllabus nomme pour le
// Grade 6 et que le pack n'interrogeait pas.
//
// ⚠ POURQUOI CE FICHIER. scripts/fact-ledgers/grade6-french.json est bâti sur la
//   liste « LA GRAMMAIRE / Grade 6 » du syllabus MIE (page imprimée 21). Sur
//   2 337 questions - le plus gros pack de l'application - huit points n'avaient
//   AUCUNE question derrière eux :
//     ⚠ « groupe nominal » et « groupe verbal » : zéro occurrence.
//     ⚠ « declarative », « imperative », « exclamative » : zéro. Seules
//       l'interrogative et la négative étaient traitées, donc deux des quatre
//       types de phrase et une des deux formes manquaient.
//     ⚠ « coordination » : zéro. La conjonction de coordination est pourtant
//       nommée telle quelle dans la liste du Grade 6.
//
// ⚠ Une nouvelle sous-section, `types_phrases`, reprend l'identifiant que
//   grade3-french utilise déjà (g3fr-grammaire/types_phrases) plutôt que d'en
//   inventer un. Elle est déclarée dans _manifest.js : les identifiants déclarés
//   et les identifiants posés sur les questions doivent coïncider exactement,
//   sinon scripts/test-subsection-invariant.js échoue.
//
// ⚠ Les groupes de la phrase vont dans `analyse`, et la coordination dans
//   `conjonctions` : ces deux sous-sections existent déjà dans g6fr-subordonnees.
//
// IDs : g6fr-syl-001 et suivants.

STATIC_QUESTIONS.push(

  // ── Le groupe nominal et le groupe verbal ───────────────────────────────
  makeMCQ({ id:'g6fr-syl-001', chapterId:'g6fr-subordonnees', subsection:'analyse', difficulty:1,
    question:'De quoi une phrase simple est-elle formée ?',
    options:['D&rsquo;un groupe nominal et d&rsquo;un groupe verbal','De deux groupes nominaux','De deux groupes verbaux','D&rsquo;un seul groupe de mots'],
    answer:'D&rsquo;un groupe nominal et d&rsquo;un groupe verbal',
    hint:'L&rsquo;un dit de qui on parle, l&rsquo;autre ce qu&rsquo;il fait.',
    explanation:'Une phrase simple se compose d&rsquo;un <b>groupe nominal</b> (de qui ou de quoi on parle) et d&rsquo;un <b>groupe verbal</b> (ce que l&rsquo;on en dit).' }),

  makeMCQ({ id:'g6fr-syl-002', chapterId:'g6fr-subordonnees', subsection:'analyse', difficulty:1,
    question:'Quel est le <b>groupe nominal</b> sujet dans : <i>Les petits oiseaux chantent dans l&rsquo;arbre.</i>',
    options:['Les petits oiseaux','chantent dans l&rsquo;arbre','dans l&rsquo;arbre','chantent'],
    answer:'Les petits oiseaux',
    hint:'Pose la question : qui est-ce qui chante ?',
    explanation:'« Qui est-ce qui chante ? » &mdash; <b>les petits oiseaux</b>. C&rsquo;est le groupe nominal sujet, construit autour du nom « oiseaux ».' }),

  makeMCQ({ id:'g6fr-syl-003', chapterId:'g6fr-subordonnees', subsection:'analyse', difficulty:2,
    question:'Quel est le <b>groupe verbal</b> dans : <i>Ma petite soeur mange une pomme.</i>',
    options:['mange une pomme','Ma petite soeur','une pomme','petite soeur'],
    answer:'mange une pomme',
    hint:'C&rsquo;est le groupe construit autour du verbe.',
    explanation:'Le groupe verbal est <b>mange une pomme</b> : le verbe et ce qui le complète. « Ma petite soeur » est le groupe nominal sujet.' }),

  makeMCQ({ id:'g6fr-syl-004', chapterId:'g6fr-subordonnees', subsection:'analyse', difficulty:2,
    question:'Autour de quel mot se construit un <b>groupe nominal</b> ?',
    options:['Autour d&rsquo;un nom','Autour d&rsquo;un verbe','Autour d&rsquo;un adverbe','Autour d&rsquo;une préposition'],
    answer:'Autour d&rsquo;un nom',
    hint:'Le nom du groupe le dit.',
    explanation:'Un <b>groupe nominal</b> se construit autour d&rsquo;un nom, appelé le nom noyau, souvent accompagné d&rsquo;un déterminant et d&rsquo;un adjectif.' }),

  makeMCQ({ id:'g6fr-syl-005', chapterId:'g6fr-subordonnees', subsection:'analyse', difficulty:2,
    question:'Dans le groupe nominal <i>une vieille maison blanche</i>, quel est le nom noyau ?',
    options:['maison','vieille','blanche','une'],
    answer:'maison',
    hint:'Enlève les autres mots : lequel garde un sens tout seul ?',
    explanation:'Le nom noyau est <b>maison</b>. « Une » est le déterminant, « vieille » et « blanche » sont des adjectifs qui le complètent.' }),

  makeMCQ({ id:'g6fr-syl-006', chapterId:'g6fr-subordonnees', subsection:'analyse', difficulty:3,
    question:'Dans <i>Le vieux pêcheur répare son filet</i>, quels sont les deux groupes ?',
    options:['GN : Le vieux pêcheur / GV : répare son filet','GN : répare son filet / GV : Le vieux pêcheur','GN : Le vieux / GV : pêcheur répare','GN : son filet / GV : Le vieux pêcheur'],
    answer:'GN : Le vieux pêcheur / GV : répare son filet',
    hint:'Le groupe verbal contient toujours le verbe conjugué.',
    explanation:'<b>Le vieux pêcheur</b> est le groupe nominal sujet et <b>répare son filet</b> le groupe verbal, car il contient le verbe conjugué.' }),

  makeMCQ({ id:'g6fr-syl-007', chapterId:'g6fr-subordonnees', subsection:'analyse', difficulty:3,
    question:'Dans « Mes deux cousins arrivent demain. », quel est le <b>groupe nominal</b> sujet ?',
    options:['Mes deux cousins','arrivent demain','cousins arrivent','demain'],
    answer:'Mes deux cousins',
    hint:'Le groupe sujet répond en entier à « qui est-ce qui ? ».',
    explanation:'Le groupe nominal sujet est <b>Mes deux cousins</b> tout entier : le déterminant, le nombre et le nom vont ensemble et ne se séparent pas.' }),

  makeMCQ({ id:'g6fr-syl-008', chapterId:'g6fr-subordonnees', subsection:'analyse', difficulty:4,
    question:'Pourquoi dit-on que le <b>groupe verbal</b> est le coeur de la phrase ?',
    options:['Il porte le verbe conjugué','Il est toujours le plus long','Il se place toujours en premier','Il contient toujours un adjectif'],
    answer:'Il porte le verbe conjugué',
    hint:'Demande-toi ce qui manquerait si on l&rsquo;enlevait.',
    explanation:'Sans verbe conjugué il n&rsquo;y a pas de phrase : c&rsquo;est le <b>groupe verbal</b> qui le porte, et c&rsquo;est lui qui dit ce que fait le sujet.' }),

  // ── Les quatre types de phrase ──────────────────────────────────────────
  makeMCQ({ id:'g6fr-syl-009', chapterId:'g6fr-subordonnees', subsection:'types_phrases', difficulty:1,
    question:'Combien y a-t-il de types de phrase en français ?',
    options:['Quatre','Deux','Trois','Cinq'],
    answer:'Quatre',
    hint:'Déclarative, interrogative, impérative, exclamative.',
    explanation:'Il y a <b>quatre</b> types de phrase : déclarative, interrogative, impérative et exclamative.' }),

  makeMCQ({ id:'g6fr-syl-010', chapterId:'g6fr-subordonnees', subsection:'types_phrases', difficulty:1,
    question:'De quel type est cette phrase ? <i>Les enfants jouent dans la cour.</i>',
    options:['Déclarative','Interrogative','Impérative','Exclamative'],
    answer:'Déclarative',
    hint:'Elle raconte simplement quelque chose et se termine par un point.',
    explanation:'Elle déclare un fait et se termine par un point : c&rsquo;est une phrase <b>déclarative</b>.' }),

  makeMCQ({ id:'g6fr-syl-011', chapterId:'g6fr-subordonnees', subsection:'types_phrases', difficulty:1,
    question:'À quoi sert une phrase <b>déclarative</b> ?',
    options:['À dire ou à raconter quelque chose','À poser une question','À donner un ordre','À exprimer une émotion forte'],
    answer:'À dire ou à raconter quelque chose',
    hint:'C&rsquo;est le type le plus courant dans un récit.',
    explanation:'La phrase <b>déclarative</b> sert à dire ou à raconter quelque chose. Elle se termine par un point.' }),

  makeMCQ({ id:'g6fr-syl-012', chapterId:'g6fr-subordonnees', subsection:'types_phrases', difficulty:1,
    question:'De quel type est cette phrase ? <i>Ferme la porte, s&rsquo;il te plaît.</i>',
    options:['Impérative','Déclarative','Interrogative','Exclamative'],
    answer:'Impérative',
    hint:'Elle demande à quelqu&rsquo;un de faire quelque chose.',
    explanation:'Elle donne un ordre ou un conseil : c&rsquo;est une phrase <b>impérative</b>. Son verbe est souvent à l&rsquo;impératif.' }),

  makeMCQ({ id:'g6fr-syl-013', chapterId:'g6fr-subordonnees', subsection:'types_phrases', difficulty:2,
    question:'À quoi sert une phrase <b>impérative</b> ?',
    options:['À donner un ordre ou un conseil','À raconter un fait passé','À poser une question','À décrire un paysage'],
    answer:'À donner un ordre ou un conseil',
    hint:'Pense à une recette de cuisine ou à une consigne.',
    explanation:'La phrase <b>impérative</b> donne un ordre, un conseil ou une consigne : <i>Range tes affaires. Mélangez bien.</i>' }),

  makeMCQ({ id:'g6fr-syl-014', chapterId:'g6fr-subordonnees', subsection:'types_phrases', difficulty:1,
    question:'De quel type est cette phrase ? <i>Quelle belle surprise !</i>',
    options:['Exclamative','Déclarative','Interrogative','Impérative'],
    answer:'Exclamative',
    hint:'Regarde le signe de ponctuation final.',
    explanation:'Elle exprime une émotion et se termine par un point d&rsquo;exclamation : c&rsquo;est une phrase <b>exclamative</b>.' }),

  makeMCQ({ id:'g6fr-syl-015', chapterId:'g6fr-subordonnees', subsection:'types_phrases', difficulty:2,
    question:'À quoi sert une phrase <b>exclamative</b> ?',
    options:['À exprimer un sentiment fort','À poser une question précise','À donner une consigne','À énumérer des faits'],
    answer:'À exprimer un sentiment fort',
    hint:'Joie, surprise, colère, admiration.',
    explanation:'La phrase <b>exclamative</b> exprime un sentiment fort &mdash; la joie, la surprise, la colère &mdash; et se termine par un point d&rsquo;exclamation.' }),

  makeMCQ({ id:'g6fr-syl-016', chapterId:'g6fr-subordonnees', subsection:'types_phrases', difficulty:2,
    question:'De quel type est cette phrase ? <i>Où as-tu mis mon cahier ?</i>',
    options:['Interrogative','Déclarative','Impérative','Exclamative'],
    answer:'Interrogative',
    hint:'Elle attend une réponse.',
    explanation:'Elle pose une question et se termine par un point d&rsquo;interrogation : c&rsquo;est une phrase <b>interrogative</b>.' }),

  makeMCQ({ id:'g6fr-syl-017', chapterId:'g6fr-subordonnees', subsection:'types_phrases', difficulty:2,
    question:'Quel signe de ponctuation termine une phrase <b>impérative</b> le plus souvent ?',
    options:['Un point','Un point d&rsquo;interrogation','Des points de suspension','Deux points'],
    answer:'Un point',
    hint:'Elle peut aussi se terminer par un point d&rsquo;exclamation si l&rsquo;ordre est fort.',
    explanation:'La phrase impérative se termine le plus souvent par <b>un point</b>, et par un point d&rsquo;exclamation quand l&rsquo;ordre est vif.' }),

  makeMCQ({ id:'g6fr-syl-018', chapterId:'g6fr-subordonnees', subsection:'types_phrases', difficulty:3,
    question:'Transforme en phrase <b>impérative</b> : <i>Tu ranges ta chambre.</i>',
    options:['Range ta chambre.','Tu ranges ta chambre ?','Quelle chambre rangée !','Tu as rangé ta chambre.'],
    answer:'Range ta chambre.',
    hint:'On enlève le sujet et on met le verbe à l&rsquo;impératif.',
    explanation:'À l&rsquo;impératif le sujet disparaît : <b>Range ta chambre.</b> Le « s » tombe aussi à la deuxième personne des verbes en -er.' }),

  makeMCQ({ id:'g6fr-syl-019', chapterId:'g6fr-subordonnees', subsection:'types_phrases', difficulty:3,
    question:'Transforme en phrase <b>exclamative</b> : <i>Ce gâteau est bon.</i>',
    options:['Comme ce gâteau est bon !','Ce gâteau est-il bon ?','Mange ce gâteau.','Ce gâteau n&rsquo;est pas bon.'],
    answer:'Comme ce gâteau est bon !',
    hint:'On ajoute souvent « comme » ou « quel » et un point d&rsquo;exclamation.',
    explanation:'<b>Comme ce gâteau est bon !</b> &mdash; « comme » et « quel » servent à construire une exclamative.' }),

  makeMCQ({ id:'g6fr-syl-020', chapterId:'g6fr-subordonnees', subsection:'types_phrases', difficulty:3,
    question:'Laquelle de ces phrases est <b>déclarative</b> ?',
    options:['Le bus arrive à sept heures.','Le bus arrive-t-il à sept heures ?','Attends le bus ici.','Enfin, voilà le bus !'],
    answer:'Le bus arrive à sept heures.',
    hint:'Cherche celle qui se contente de donner une information.',
    explanation:'Seule la première <b>déclare</b> un fait. Les autres interrogent, ordonnent et s&rsquo;exclament.' }),

  // ── Les formes affirmative et négative ─────────────────────────────────
  makeMCQ({ id:'g6fr-syl-021', chapterId:'g6fr-subordonnees', subsection:'types_phrases', difficulty:1,
    question:'De quelle forme est cette phrase ? <i>Paul aime le riz.</i>',
    options:['Forme affirmative','Forme négative','Forme interrogative','Forme impérative'],
    answer:'Forme affirmative',
    hint:'Elle dit que oui, pas que non.',
    explanation:'Elle affirme quelque chose sans le nier : elle est à la <b>forme affirmative</b>.' }),

  makeMCQ({ id:'g6fr-syl-022', chapterId:'g6fr-subordonnees', subsection:'types_phrases', difficulty:2,
    question:'Quelles sont les deux <b>formes</b> d&rsquo;une phrase ?',
    options:['Affirmative et négative','Simple et complexe','Courte et longue','Écrite et orale'],
    answer:'Affirmative et négative',
    hint:'Chaque type de phrase peut se dire de ces deux façons.',
    explanation:'Toute phrase est soit à la forme <b>affirmative</b>, soit à la forme <b>négative</b>, quel que soit son type.' }),

  makeMCQ({ id:'g6fr-syl-023', chapterId:'g6fr-subordonnees', subsection:'types_phrases', difficulty:2,
    question:'Mets à la forme <b>affirmative</b> : <i>Je ne comprends pas la question.</i>',
    options:['Je comprends la question.','Je ne comprends jamais.','Comprends la question.','Est-ce que je comprends ?'],
    answer:'Je comprends la question.',
    hint:'Il suffit d&rsquo;enlever les deux mots de la négation.',
    explanation:'On retire « ne » et « pas » : <b>Je comprends la question.</b> Passer d&rsquo;une forme à l&rsquo;autre ne change pas le type de la phrase.' }),

  makeMCQ({ id:'g6fr-syl-024', chapterId:'g6fr-subordonnees', subsection:'types_phrases', difficulty:3,
    question:'<i>Ne sors pas !</i> De quel type et de quelle forme est cette phrase ?',
    options:['Impérative et négative','Déclarative et négative','Impérative et affirmative','Exclamative et affirmative'],
    answer:'Impérative et négative',
    hint:'Le type dit ce qu&rsquo;elle fait, la forme dit si elle nie.',
    explanation:'Elle donne un ordre, donc elle est <b>impérative</b>, et elle contient « ne... pas », donc elle est <b>négative</b>. Type et forme se cumulent.' }),

  makeMCQ({ id:'g6fr-syl-025', chapterId:'g6fr-subordonnees', subsection:'types_phrases', difficulty:4,
    question:'Pourquoi peut-on dire qu&rsquo;une phrase a toujours un type <b>et</b> une forme ?',
    options:['Ce sont deux questions différentes','C&rsquo;est une règle sans raison','La forme remplace le type','Le type dépend de la longueur'],
    answer:'Ce sont deux questions différentes',
    hint:'L&rsquo;une demande « que fait-elle ? », l&rsquo;autre « nie-t-elle ? ».',
    explanation:'Le type répond à « que fait la phrase ? » et la forme à « affirme-t-elle ou nie-t-elle ? ». <b>Ce sont deux questions différentes</b>, donc les deux réponses existent toujours.' }),

  // ── La conjonction de coordination ─────────────────────────────────────
  makeMCQ({ id:'g6fr-syl-026', chapterId:'g6fr-subordonnees', subsection:'conjonctions', difficulty:1,
    question:'À quoi sert une <b>conjonction de coordination</b> ?',
    options:['À relier deux mots ou deux phrases de même niveau','À poser une question au lecteur','À remplacer un nom déjà cité','À donner un ordre poli'],
    answer:'À relier deux mots ou deux phrases de même niveau',
    hint:'Elle met les deux éléments sur un pied d&rsquo;égalité.',
    explanation:'Une <b>conjonction de coordination</b> relie deux mots, deux groupes ou deux phrases de même niveau, sans que l&rsquo;un dépende de l&rsquo;autre.' }),

  makeMCQ({ id:'g6fr-syl-027', chapterId:'g6fr-subordonnees', subsection:'conjonctions', difficulty:1,
    question:'Quelle est la liste des <b>conjonctions de coordination</b> ?',
    options:['mais, ou, et, donc, or, ni, car','qui, que, quoi, dont, où','le, la, les, un, une','très, trop, peu, assez'],
    answer:'mais, ou, et, donc, or, ni, car',
    hint:'On les retient avec la phrase « Mais où est donc Ornicar ? ».',
    explanation:'Ce sont <b>mais, ou, et, donc, or, ni, car</b> &mdash; retenues par la formule « Mais où est donc Ornicar ? ».' }),

  makeMCQ({ id:'g6fr-syl-028', chapterId:'g6fr-subordonnees', subsection:'conjonctions', difficulty:2,
    question:'Quelle conjonction de coordination complète la phrase ? <i>Il a couru, ___ il est arrivé en retard.</i>',
    options:['mais','et','car','ni'],
    answer:'mais',
    hint:'Les deux faits s&rsquo;opposent.',
    explanation:'<b>Mais</b> marque l&rsquo;opposition : il a couru, et pourtant il est arrivé en retard.' }),

  makeMCQ({ id:'g6fr-syl-029', chapterId:'g6fr-subordonnees', subsection:'conjonctions', difficulty:2,
    question:'Quelle conjonction de coordination exprime la <b>cause</b> ?',
    options:['car','mais','ou','ni'],
    answer:'car',
    hint:'On peut souvent la remplacer par « parce que ».',
    explanation:'<b>Car</b> introduit la cause : <i>Il est resté chez lui, car il pleuvait.</i>' }),

  makeMCQ({ id:'g6fr-syl-030', chapterId:'g6fr-subordonnees', subsection:'conjonctions', difficulty:2,
    question:'Quelle conjonction de coordination exprime la <b>conséquence</b> ?',
    options:['donc','mais','ni','ou'],
    answer:'donc',
    hint:'Elle annonce le résultat de ce qui vient d&rsquo;être dit.',
    explanation:'<b>Donc</b> introduit la conséquence : <i>Il pleuvait, donc il est resté chez lui.</i>' }),

  makeMCQ({ id:'g6fr-syl-031', chapterId:'g6fr-subordonnees', subsection:'conjonctions', difficulty:2,
    question:'Quelle conjonction de coordination exprime le <b>choix</b> ?',
    options:['ou','et','car','donc'],
    answer:'ou',
    hint:'Entre deux possibilités, il faut choisir.',
    explanation:'<b>Ou</b> propose un choix : <i>Tu prends le bus ou tu marches ?</i>' }),

  makeMCQ({ id:'g6fr-syl-032', chapterId:'g6fr-subordonnees', subsection:'conjonctions', difficulty:3,
    question:'Quelle conjonction complète cette phrase négative ? <i>Elle n&rsquo;aime ___ le café ___ le thé.</i>',
    options:['ni ... ni','ou ... ou','et ... et','car ... car'],
    answer:'ni ... ni',
    hint:'C&rsquo;est la conjonction qui va avec la négation.',
    explanation:'<b>Ni ... ni</b> s&rsquo;emploie dans une phrase négative : <i>Elle n&rsquo;aime ni le café ni le thé.</i>' }),

  makeMCQ({ id:'g6fr-syl-033', chapterId:'g6fr-subordonnees', subsection:'conjonctions', difficulty:3,
    question:'Dans <i>Je voulais sortir, mais il pleuvait</i>, que relie la conjonction ?',
    options:['Deux propositions de même niveau','Un nom et son adjectif','Un verbe et son sujet','Une phrase et un titre'],
    answer:'Deux propositions de même niveau',
    hint:'Regarde ce qu&rsquo;il y a de chaque côté de la virgule.',
    explanation:'Elle relie <b>deux propositions de même niveau</b>, dont chacune pourrait être une phrase à elle seule. C&rsquo;est la marque de la coordination.' }),

  makeMCQ({ id:'g6fr-syl-034', chapterId:'g6fr-subordonnees', subsection:'conjonctions', difficulty:3,
    question:'Quelle différence y a-t-il entre <b>car</b> et <b>donc</b> ?',
    options:['Car donne la cause, donc la conséquence','Donc donne la cause, car la conséquence','Les deux donnent la cause','Les deux marquent une opposition'],
    answer:'Car donne la cause, donc la conséquence',
    hint:'Demande-toi laquelle répond à « pourquoi ? ».',
    explanation:'<b>Car</b> répond à « pourquoi ? » et <b>donc</b> annonce le résultat. Elles relient les deux mêmes faits, mais dans l&rsquo;ordre inverse.' }),

  makeMCQ({ id:'g6fr-syl-035', chapterId:'g6fr-subordonnees', subsection:'conjonctions', difficulty:4,
    question:'Réunis ces deux phrases avec la bonne conjonction : <i>La route était coupée. Nous avons fait demi-tour.</i>',
    options:['La route était coupée, donc nous avons fait demi-tour.','La route était coupée, ou nous avons fait demi-tour.','La route était coupée, ni nous avons fait demi-tour.','La route était coupée, mais nous avons fait demi-tour.'],
    answer:'La route était coupée, donc nous avons fait demi-tour.',
    hint:'La seconde phrase est le résultat de la première.',
    explanation:'Le demi-tour est la <b>conséquence</b> de la route coupée, donc c&rsquo;est « donc » qu&rsquo;il faut. « Mais » supposerait une opposition, qui n&rsquo;existe pas ici.' }),

  makeMCQ({ id:'g6fr-syl-036', chapterId:'g6fr-subordonnees', subsection:'conjonctions', difficulty:4,
    question:'Pourquoi « Mais où est donc Ornicar ? » aide-t-il à retenir les conjonctions de coordination ?',
    options:['Chaque son de la phrase en rappelle une','C&rsquo;est le titre d&rsquo;un livre connu','Elle contient sept verbes','C&rsquo;est une phrase impérative'],
    answer:'Chaque son de la phrase en rappelle une',
    hint:'Prononce la phrase lentement et écoute les sept mots.',
    explanation:'Chaque son rappelle une conjonction : <b>mais, ou, et, donc, or, ni, car</b>. C&rsquo;est un moyen mnémotechnique, pas une règle.' })

);
