'use strict';
// Grade 5 French - fills the four chapters that examWeight now draws on but
// that had almost nothing in them.
//
// WHY THIS FILE EXISTS
// fr-verbes-present holds 515 questions - a quarter of the pack - because its
// generator produces 16 verbs x 6 people x 5 completions. Present tense is
// revision of Grades 3-4, so it was weighted down to 1 and the core chapters up
// to 2-3. That is the right shape, but it points the exam builder and the study
// planner at pools that were far too small to support it: fr-textes had 21
// questions on weight 3, fr-adjectifs and fr-grammaire 35 each, fr-noms 41.
// A chapter asked for three questions a paper out of a pool of 21 repeats
// within a fortnight.
//
// ⚠ No present-tense question was removed to achieve the balance - all 515 are
//   still there and a child who opens that chapter still practises every one.
//   The pack is rebalanced by FILLING the thin chapters, not by emptying the
//   fat one.
//
// ⚠ Only the subsection ids already declared in _manifest.js are used here:
//   fr-noms (pluriel/partitifs/genre/articles_indef/articles_def),
//   fr-adjectifs (comparatif/possessifs/demonstratifs/accord),
//   fr-grammaire (negation/prepositions/articles/conjugaison/divers),
//   fr-textes (courriel/affiche/poeme/legende).
//   A tagged id that is not declared hides its questions from the syllabus
//   screen; a declared id with none opens an empty screen.
//
// ⚠ fr-images is deliberately NOT topped up here. Its questions carry real
//   Wikimedia photographs, and an image URL must be verified against the
//   action=query API before it is written into a question. That is picture
//   research, not question writing, and guessing a filename ships a 404.
//
// ⚠ Apostrophes are the typographic ’ (U+2019) throughout, so nothing needs
//   escaping inside single-quoted JS strings.
(function () {
  let n = 0;
  const Q = (chapterId, subsection, difficulty, question, options, answer, hint, explanation) => {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g5fr-bal-${String(n).padStart(3, '0')}`,
      chapterId, subsection, difficulty, question, options, answer, hint, explanation,
    }));
  };

  // ══ fr-noms ═══════════════════════════════════════════════════════════════
  const NOMS = [
    ['pluriel', 3, 'Quel est le pluriel de « un pneu » ?', 'des pneus',
      ['des pneux', 'des pneaux', 'des pneues'],
      'Presque tous les noms en <b>-eu</b> prennent un x… mais pas celui-ci.',
      'On écrit <b>des pneus</b>. Les noms en <i>-eu</i> prennent normalement un <b>-x</b> (des jeux, des feux, des cheveux), mais <i>pneu</i> et <i>bleu</i> font exception et prennent un <b>-s</b>.'],
    ['pluriel', 2, 'Quel est le pluriel de « le bateau » ?', 'les bateaux',
      ['les bateaus', 'les bateaies', 'des bateau'],
      'Les noms en <b>-eau</b> prennent un <b>-x</b>.',
      'Les noms en <i>-eau</i>, <i>-au</i> et <i>-eu</i> prennent un <b>-x</b> : bateaux, chapeaux, jeux.'],
    ['pluriel', 3, 'Quel est le pluriel de « un festival » ?', 'des festivals',
      ['des festivaux', 'des festivales', 'des festival'],
      'La règle des <i>journaux</i> ne vaut pas pour tous les noms en -al.',
      'On dit <b>des festivals</b>. La plupart des noms en <i>-al</i> font <i>-aux</i> (un journal → des journaux), mais quelques-uns gardent le <b>-s</b> : bal, carnaval, festival, récital, chacal.'],
    ['pluriel', 3, 'Quel est le pluriel de « le travail » ?', 'les travaux',
      ['les travails', 'les travailles', 'les travailes'],
      'Encore un nom en -ail qui se termine en -aux.',
      'Un travail → des <b>travaux</b>, comme <i>vitrail → vitraux</i>. La plupart des noms en <i>-ail</i> prennent pourtant un simple -s (des détails).'],
    ['pluriel', 2, 'Quel est le pluriel de « le nez » ?', 'les nez',
      ['les nezs', 'les nezes', 'les néz'],
      'Que se passe-t-il pour un nom déjà terminé par -s, -x ou -z ?',
      'Un nom qui finit déjà par <b>-s, -x ou -z</b> ne change pas au pluriel : le nez → les <b>nez</b>.'],
    ['pluriel', 3, 'Quel est le pluriel de « madame » ?', 'mesdames',
      ['madames', 'mesdame', 'madammes'],
      'Les deux parties du mot changent.',
      '« Madame » est formé de <i>ma + dame</i> : au pluriel les deux changent → <b>mesdames</b>. De même <i>monsieur → messieurs</i>.'],
    ['genre', 2, 'Le mot « problème » est-il masculin ou féminin ?', 'masculin',
      ['féminin', 'les deux sont corrects', 'cela dépend de la phrase'],
      'Attention : le -e final ne veut pas dire féminin.',
      'On dit <b>un</b> problème. Comme <i>un poème</i>, <i>un système</i>, <i>un thème</i> : les noms en <b>-ème</b> sont masculins malgré le -e.'],
    ['genre', 3, 'Quel groupe est correct ?', 'une belle eau claire',
      ['un belle eau claire', 'une bel eau claire', 'un bel eau claires'],
      '« eau » est féminin.',
      '« Eau » est <b>féminin</b> : une <b>belle</b> eau <b>claire</b>. L’article élidé « l’ » cache souvent le genre, il faut le connaître.'],
    ['genre', 2, 'Le mot « page » est-il masculin ou féminin ?', 'féminin',
      ['masculin', 'les deux', 'ni l’un ni l’autre'],
      'On dit « la première ___ du livre ».',
      'On dit <b>une</b> page, <b>la</b> page. Attention à <i>un</i> personnage, qui est masculin.'],
    ['genre', 3, 'Dans « l’hôpital », le nom est :', 'masculin',
      ['féminin', 'impossible à savoir', 'toujours pluriel'],
      'Essaie de remplacer « l’ » par « un » ou « une ».',
      'On dit <b>un</b> hôpital, donc le nom est <b>masculin</b>. Devant un h muet ou une voyelle, l’article s’élide et ne montre plus le genre.'],
    ['articles_def', 1, 'Choisis l’article défini : « ___ arbre du jardin est très vieux. »', 'L’',
      ['Le', 'La', 'Les'],
      '« arbre » commence par une voyelle.',
      'Devant une voyelle, <i>le</i> et <i>la</i> deviennent <b>l’</b> : <b>l’</b>arbre.'],
    ['articles_def', 2, 'Choisis la forme correcte : « Je reviens ___ marché. »', 'du',
      ['de le', 'de la', 'des'],
      '« de » + « le » ne s’écrivent jamais côte à côte.',
      '<i>de + le</i> se contracte en <b>du</b> : je reviens <b>du</b> marché. De même <i>à + le = au</i>.'],
    ['articles_def', 2, 'Choisis la forme correcte : « Nous allons ___ bibliothèque. »', 'à la',
      ['au', 'à le', 'aux'],
      '« bibliothèque » est féminin.',
      'Devant un nom féminin on garde <b>à la</b>. La contraction <i>au</i> n’existe que pour <i>à + le</i>.'],
    ['articles_indef', 2, 'Choisis l’article : « Il y a ___ enfants dans la cour. »', 'des',
      ['un', 'une', 'du'],
      'Combien d’enfants ?',
      '<b>des</b> est l’article indéfini <b>pluriel</b> : des enfants.'],
    ['articles_indef', 3, 'Mets à la forme négative : « J’ai un stylo. »', 'Je n’ai pas de stylo.',
      ['Je n’ai pas un stylo.', 'Je n’ai pas du stylo.', 'Je n’ai pas des stylo.'],
      'Après une négation, l’article indéfini change.',
      '⚠ Après la négation, <i>un / une / des</i> deviennent <b>de</b> : « Je n’ai pas <b>de</b> stylo. »'],
    ['partitifs', 2, 'Choisis l’article partitif : « Je bois ___ eau. »', 'de l’',
      ['du', 'de la', 'des'],
      '« eau » est féminin et commence par une voyelle.',
      'Le partitif féminin <i>de la</i> s’élide devant une voyelle : <b>de l’</b>eau.'],
    ['partitifs', 2, 'Choisis l’article partitif : « Maman achète ___ riz au marché. »', 'du',
      ['de la', 'des', 'de l’'],
      '« riz » est masculin.',
      'Le partitif masculin est <b>du</b> : du riz, du pain, du sucre. Il indique une quantité qu’on ne compte pas.'],
    ['partitifs', 3, 'Mets à la forme négative : « Il mange de la viande. »', 'Il ne mange pas de viande.',
      ['Il ne mange pas de la viande.', 'Il ne mange pas du viande.', 'Il ne mange pas des viande.'],
      'Le partitif se comporte comme l’article indéfini après une négation.',
      'Après la négation, <i>du / de la / des</i> deviennent <b>de</b> : « pas <b>de</b> viande ».'],
    ['partitifs', 3, 'Choisis la forme correcte : « J’ai acheté beaucoup ___ fruits. »', 'de',
      ['des', 'du', 'de les'],
      'Après une expression de quantité, l’article disparaît.',
      'Après <i>beaucoup, peu, assez, trop, un kilo…</i> on emploie simplement <b>de</b> : beaucoup <b>de</b> fruits.'],
    ['partitifs', 2, 'Choisis la forme correcte : « Veux-tu ___ gâteau ? »', 'du',
      ['de le', 'des', 'un peu des'],
      'On parle d’une part, pas du gâteau entier.',
      '<b>du</b> gâteau = une partie du gâteau. C’est le rôle de l’article partitif.'],
  ];
  NOMS.forEach(r => Q('fr-noms', r[0], r[1], r[2], [r[3], ...r[4]], r[3], r[5], r[6]));

  // ══ fr-adjectifs ══════════════════════════════════════════════════════════
  const ADJ = [
    ['accord', 2, 'Complète : « une robe ___ » (blanc)', 'blanche',
      ['blanc', 'blanque', 'blanches'],
      'Le féminin de « blanc » est irrégulier.',
      'blanc → <b>blanche</b>. Comme <i>franc → franche</i>, <i>sec → sèche</i>.'],
    ['accord', 2, 'Complète : « une histoire ___ » (heureux)', 'heureuse',
      ['heureux', 'heureuxe', 'heureuses'],
      'Les adjectifs en -eux font leur féminin en -euse.',
      'heureux → <b>heureuse</b>, comme <i>sérieux → sérieuse</i>, <i>curieux → curieuse</i>.'],
    ['accord', 3, 'Complète : « des exercices ___ » (facile)', 'faciles',
      ['facile', 'faciless', 'facilles'],
      'L’adjectif s’accorde avec un nom masculin pluriel.',
      'Un adjectif déjà terminé par <b>-e</b> ne change pas au féminin, mais il prend bien le <b>-s</b> du pluriel : <b>faciles</b>.'],
    ['accord', 3, 'Complète : « une leçon ___ » (nouveau)', 'nouvelle',
      ['nouveau', 'nouvelles', 'nouvel'],
      'Cet adjectif a une forme féminine à part.',
      'nouveau → <b>nouvelle</b>. La forme <i>nouvel</i> ne sert qu’au masculin devant une voyelle : un <i>nouvel</i> ami.'],
    ['accord', 4, 'Complète : « Les élèves et les maîtresses sont ___ » (content)', 'contents',
      ['contentes', 'content', 'contentes et contents'],
      'Il y a un groupe masculin et un groupe féminin.',
      '⚠ Quand un adjectif se rapporte à un ensemble <b>masculin + féminin</b>, il se met au <b>masculin pluriel</b> : <b>contents</b>.'],
    ['accord', 4, 'Complète : « une chemise et un pantalon ___ » (bleu)', 'bleus',
      ['bleues', 'bleu', 'bleue'],
      'Deux noms, deux genres.',
      'Masculin + féminin → l’accord se fait au <b>masculin pluriel</b> : <b>bleus</b>.'],
    ['accord', 3, 'Complète : « une longue journée ___ » (fatigant)', 'fatigante',
      ['fatigant', 'fatigantes', 'fatiguante'],
      'Accord avec « journée », féminin singulier.',
      'fatigant → <b>fatigante</b> au féminin singulier, pour s’accorder avec « journée ».'],
    ['comparatif', 2, 'Complète : « Ce livre est ___ intéressant que l’autre. » (supériorité)', 'plus',
      ['plus de', 'le plus', 'aussi'],
      'On compare deux choses : l’une dépasse l’autre.',
      'Le comparatif de supériorité est <b>plus … que</b> : plus intéressant <b>que</b> l’autre.'],
    ['comparatif', 3, 'Quel est le comparatif de supériorité de « bon » ?', 'meilleur',
      ['plus bon', 'plus meilleur', 'mieux'],
      '« plus bon » ne se dit pas.',
      '⚠ bon → <b>meilleur</b> (jamais « plus bon »). <i>Mieux</i> est le comparatif de l’adverbe <i>bien</i>, pas de l’adjectif.'],
    ['comparatif', 3, 'Complète : « Rodrigues est ___ grande île de la République. » (superlatif d’infériorité)', 'la moins',
      ['le moins', 'moins', 'la plus moins'],
      'Superlatif = article + moins.',
      'Le superlatif d’infériorité est <b>la moins</b> + adjectif, avec l’article accordé au nom féminin « île ».'],
    ['comparatif', 4, 'Complète : « Il y a ___ élèves cette année que l’année dernière. »', 'moins d’',
      ['moins des', 'moins de les', 'le moins d’'],
      'On compare une quantité, pas une qualité.',
      'Pour comparer des quantités on emploie <b>moins de / plus de / autant de</b> + nom, qui s’élide devant une voyelle : <b>moins d’</b>élèves.'],
    ['possessifs', 2, 'Complète : « ___ amie s’appelle Anaya. » (à moi)', 'Mon',
      ['Ma', 'Mes', 'Mien'],
      '« amie » commence par une voyelle.',
      '⚠ Devant un nom féminin commençant par une <b>voyelle</b>, on emploie <b>mon</b> et non « ma » : <b>mon</b> amie. C’est plus facile à prononcer.'],
    ['possessifs', 2, 'Complète : « Les enfants rangent ___ cahiers. »', 'leurs',
      ['leur', 'ses', 'leur’s'],
      'Plusieurs enfants, plusieurs cahiers.',
      '<b>leurs</b> s’accorde avec le nom qui suit : plusieurs cahiers → <b>leurs</b> cahiers.'],
    ['possessifs', 3, 'Complète : « Chaque élève apporte ___ propre stylo. »', 'son',
      ['leur', 'ses', 'leurs'],
      '« Chaque élève » est singulier.',
      '« Chaque élève » est un sujet <b>singulier</b>, donc <b>son</b> propre stylo, même s’il y a plusieurs élèves en tout.'],
    ['demonstratifs', 2, 'Complète : « ___ homme travaille au marché. »', 'Cet',
      ['Ce', 'Cette', 'Ces'],
      '« homme » commence par un h muet.',
      'Devant une voyelle ou un <b>h muet</b>, <i>ce</i> devient <b>cet</b> : <b>cet</b> homme, <b>cet</b> arbre.'],
    ['demonstratifs', 2, 'Complète : « ___ mangues sont bien mûres. »', 'Ces',
      ['Cette', 'Ce', 'Cet'],
      'Combien de mangues ?',
      '<b>ces</b> est le démonstratif <b>pluriel</b>, pour le masculin comme pour le féminin.'],
    ['demonstratifs', 3, 'Complète : « ___ histoire m’a beaucoup plu. »', 'Cette',
      ['Cet', 'Ce', 'Ces'],
      '« histoire » est féminin singulier.',
      '<b>cette</b> est la forme féminine singulière. <i>Cet</i> est masculin, malgré la ressemblance.'],
  ];
  ADJ.forEach(r => Q('fr-adjectifs', r[0], r[1], r[2], [r[3], ...r[4]], r[3], r[5], r[6]));

  // ══ fr-grammaire ══════════════════════════════════════════════════════════
  const GRAM = [
    ['negation', 2, 'Mets à la forme négative : « Il voit quelque chose. »', 'Il ne voit rien.',
      ['Il ne voit pas quelque chose.', 'Il ne voit rien pas.', 'Il voit ne rien.'],
      '« quelque chose » a son propre contraire.',
      'Le contraire de <i>quelque chose</i> est <b>ne … rien</b> : « Il <b>ne</b> voit <b>rien</b>. »'],
    ['negation', 3, 'Mets à la forme négative : « Il y a encore du pain. »', 'Il n’y a plus de pain.',
      ['Il n’y a pas encore du pain.', 'Il n’y a plus du pain.', 'Il n’y a rien de pain.'],
      'Deux changements : la négation ET l’article.',
      '<i>encore</i> devient <b>ne … plus</b>, et le partitif <i>du</i> devient <b>de</b> après la négation.'],
    ['negation', 3, 'Mets à la forme négative : « Tout le monde est arrivé. »', 'Personne n’est arrivé.',
      ['Tout le monde n’est pas arrivé.', 'Personne est arrivé.', 'Rien n’est arrivé.'],
      'Le contraire de « tout le monde » est un pronom.',
      '<b>Personne ne …</b> est la négation de <i>tout le monde</i>. Le « ne » reste obligatoire à l’écrit.'],
    ['negation', 4, 'Mets à la forme négative : « J’ai déjà vu ce film. »', 'Je n’ai jamais vu ce film.',
      ['Je n’ai pas déjà vu ce film.', 'Je n’ai jamais pas vu ce film.', 'Je n’ai vu jamais ce film.'],
      'Au passé composé, où se placent les deux mots de la négation ?',
      '<i>déjà</i> devient <b>ne … jamais</b>, et au passé composé la négation <b>entoure l’auxiliaire</b> : « je <b>n’</b>ai <b>jamais</b> vu ».'],
    ['negation', 4, 'Mets à la forme négative : « Je veux sortir. »', 'Je ne veux pas sortir.',
      ['Je ne veux sortir pas.', 'Je veux ne pas sortir.', 'Je ne pas veux sortir.'],
      'Un seul verbe est conjugué ici.',
      'La négation entoure le <b>verbe conjugué</b> (« veux »), pas l’infinitif : « Je <b>ne</b> veux <b>pas</b> sortir. »'],
    ['prepositions', 2, 'Complète : « Nous partons ___ Maurice demain. »', 'de',
      ['à', 'en', 'du'],
      'On quitte le pays.',
      'Pour indiquer d’où l’on part, on emploie <b>de</b> : partir <b>de</b> Maurice.'],
    ['prepositions', 3, 'Complète : « Ma tante habite ___ France. »', 'en',
      ['à', 'au', 'dans la'],
      'La France est un pays féminin.',
      'Devant un pays <b>féminin</b>, on emploie <b>en</b> : en France, en Inde. Devant un pays masculin, <i>au</i> : au Canada.'],
    ['prepositions', 3, 'Complète : « Le livre est ___ la table. »', 'sur',
      ['dans', 'sous', 'entre'],
      'Il est posé dessus.',
      '<b>sur</b> = dessus. <i>sous</i> = dessous, <i>dans</i> = à l’intérieur.'],
    ['prepositions', 2, 'Complète : « Il joue ___ football tous les samedis. »', 'au',
      ['le', 'du', 'à'],
      'Jouer + à + un sport.',
      'On dit jouer <b>à</b> un sport, et <i>à + le</i> se contracte : jouer <b>au</b> football.'],
    ['articles', 2, 'Complète : « J’aime ___ musique séga. »', 'la',
      ['de la', 'une', 'des'],
      'Après « aimer », on parle de la chose en général.',
      'Après <i>aimer, adorer, détester</i>, on emploie l’article <b>défini</b> : j’aime <b>la</b> musique.'],
    ['articles', 3, 'Complète : « Elle est ___ institutrice. »', 'institutrice sans article',
      ['une institutrice', 'l’institutrice', 'de l’institutrice'],
      'Que se passe-t-il après le verbe « être » + un métier ?',
      '⚠ Après <i>être</i> + un métier, le français n’emploie <b>pas d’article</b> : « Elle est <b>institutrice</b>. » L’anglais, lui, dirait « a teacher ».'],
    ['conjugaison', 2, 'Complète : « Nous ___ un gâteau. » (manger, présent)', 'mangeons',
      ['mangons', 'mangeions', 'manjons'],
      'Il faut garder le son [j] devant « -ons ».',
      'Les verbes en <b>-ger</b> gardent le <b>e</b> devant <i>-ons</i> : nous <b>mangeons</b>, nous <i>nageons</i>.'],
    ['conjugaison', 3, 'Complète : « Nous ___ par le début. » (commencer, présent)', 'commençons',
      ['commencons', 'commencions', 'commenceons'],
      'Comment garder le son [s] devant « o » ?',
      'Les verbes en <b>-cer</b> prennent une <b>cédille</b> devant <i>-ons</i> : nous <b>commençons</b>.'],
    ['conjugaison', 3, 'Complète : « Elle ___ la fenêtre. » (ouvrir, présent)', 'ouvre',
      ['ouvrit', 'ouvre pas', 'ouvrit pas'],
      '« ouvrir » se conjugue comme un verbe en -er au présent.',
      '⚠ Malgré son infinitif en <i>-ir</i>, <b>ouvrir</b> prend les terminaisons des verbes en <i>-er</i> : j’ouvre, tu ouvres, elle <b>ouvre</b>.'],
    ['divers', 3, 'Quelle phrase est correctement ponctuée ?', 'Où vas-tu, Aditi ?',
      ['Où vas-tu Aditi ?', 'Où vas-tu, Aditi.', 'ou vas-tu, Aditi ?'],
      'Quand on appelle quelqu’un, on l’isole.',
      'Le nom de la personne à qui l’on parle est séparé par une <b>virgule</b>, et la question se termine par un <b>point d’interrogation</b>.'],
    ['divers', 3, 'Quelle phrase est à la forme interrogative soutenue ?', 'Aimes-tu la lecture ?',
      ['Tu aimes la lecture ?', 'Est-ce tu aimes la lecture ?', 'Tu aimes-tu la lecture ?'],
      'On inverse le sujet et le verbe.',
      'L’<b>inversion</b> du sujet (<i>Aimes-tu</i>) est la forme la plus soutenue. « Est-ce que tu aimes… ? » est correct aussi, mais « Est-ce tu… » ne l’est pas.'],
    ['divers', 4, 'Transforme au discours indirect : Il dit : « Je suis fatigué. »', 'Il dit qu’il est fatigué.',
      ['Il dit qu’il suis fatigué.', 'Il dit que je suis fatigué.', 'Il dit : qu’il est fatigué.'],
      'Le pronom ET le verbe changent de personne.',
      'Au discours indirect, « je » devient <b>il</b> et le verbe s’accorde : « Il dit <b>qu’il est</b> fatigué. » Les guillemets disparaissent.'],
    ['divers', 4, 'Quelle phrase emploie correctement « leur » ?', 'Je leur ai donné les cahiers.',
      ['Je leurs ai donné les cahiers.', 'Je leur ai donné leur cahiers.', 'Je les leurs ai donné.'],
      'Ici « leur » remplace « à eux » : c’est un pronom.',
      '⚠ Le pronom <b>leur</b> (= à eux) est <b>invariable</b> : « Je <b>leur</b> ai donné… ». Seul l’adjectif possessif prend un -s : <i>leurs</i> cahiers.'],
  ];
  GRAM.forEach(r => Q('fr-grammaire', r[0], r[1], r[2], [r[3], ...r[4]], r[3], r[5], r[6]));

  // ══ fr-textes ═════════════════════════════════════════════════════════════
  // Each stimulus is written out once and reused by its questions, exactly the
  // shape the existing fr-textes questions have.
  const box = (t) => `<div style="background:#f8fafc;border-left:4px solid #6366f1;padding:10px 12px;margin-bottom:10px;border-radius:8px;font-size:0.95em">${t}</div>`;

  const COURRIEL = box(
    '<b>De :</b> club.nature@ecolerosehill.mu<br>'
    + '<b>À :</b> parents5b@ecolerosehill.mu<br>'
    + '<b>Objet :</b> Sortie au Jardin de Pamplemousses - samedi 18 mai<br><br>'
    + 'Chers parents,<br>'
    + 'Le Club Nature organise une sortie au Jardin de Pamplemousses le <b>samedi 18 mai</b>. '
    + 'Le bus partira de l’école à <b>7 h 30</b> et sera de retour à <b>15 h</b>. '
    + 'Chaque enfant apportera un chapeau, une bouteille d’eau et son pique-nique. '
    + 'La participation est de <b>Rs 150</b> par élève. '
    + 'Cette somme couvre le transport et l’entrée du jardin.<br><br>'
    + 'Au programme : une visite guidée de l’allée des palmiers et du bassin aux nénuphars '
    + 'géants, puis un atelier sur les arbres endémiques de Maurice. Un guide du jardin '
    + 'accompagnera le groupe toute la journée.<br><br>'
    + 'Merci de prévoir des chaussures fermées : certains sentiers restent glissants après '
    + 'la pluie. Si votre enfant suit un traitement ou souffre d’une allergie, indiquez-le '
    + 'dans votre réponse afin que nous puissions en tenir compte.<br><br>'
    + 'Les places sont limitées à trente élèves. '
    + 'Merci de répondre à ce courriel <b>avant le 10 mai</b>.<br>'
    + 'Cordialement,<br>Mme Ramdin, responsable du Club Nature');
  const CO = [
    [1, 'À quelle heure le bus part-il de l’école ?', '7 h 30', ['15 h', '18 h', '10 h'],
      'Cherche l’heure du départ, pas celle du retour.',
      'Le courriel précise : « Le bus partira de l’école à <b>7 h 30</b> ».'],
    [2, 'Quelle est la date limite pour répondre ?', 'le 10 mai', ['le 18 mai', 'le 15 mai', 'le 5 mai'],
      'Deux dates apparaissent : celle de la sortie et celle de la réponse.',
      '« Merci de répondre à ce courriel <b>avant le 10 mai</b> » - le 18 mai est la date de la sortie.'],
    [2, 'Que doit apporter chaque enfant ?', 'un chapeau, de l’eau et un pique-nique',
      ['seulement Rs 150', 'un cahier et un stylo', 'rien du tout'],
      'La liste est donnée dans une seule phrase.',
      'Le courriel demande « un chapeau, une bouteille d’eau et son pique-nique ».'],
    [2, 'Combien coûte la participation par élève ?', 'Rs 150', ['Rs 15', 'Rs 1 500', 'Elle est gratuite'],
      'Le prix est écrit en gras.',
      '« La participation est de <b>Rs 150</b> par élève. »'],
    [3, 'À quoi sert la ligne « Objet » d’un courriel ?', 'Elle annonce le sujet du message en quelques mots',
      ['Elle donne l’adresse du destinataire', 'Elle indique la date d’envoi', 'Elle sert à signer le message'],
      'C’est la première chose que lit le destinataire.',
      'La ligne <b>Objet</b> résume le but du message pour qu’on sache tout de suite de quoi il s’agit.'],
    [3, 'Qui envoie ce courriel ?', 'Mme Ramdin, du Club Nature',
      ['Les parents de la classe 5B', 'Le directeur de l’école', 'Le chauffeur du bus'],
      'Regarde la signature, en bas.',
      'Le message est signé « Mme Ramdin, responsable du Club Nature », et l’adresse d’envoi est celle du club.'],
    [3, 'Quelle formule termine ce courriel ?', 'Cordialement',
      ['Je t’embrasse', 'Bisous', 'Salut'],
      'C’est un message poli adressé à des adultes.',
      '<b>Cordialement</b> est une formule polie adaptée à un courriel officiel. « Je t’embrasse » serait réservé à la famille.'],
    [4, 'Combien de temps dure la sortie, du départ au retour ?', 'sept heures et demie',
      ['sept heures', 'huit heures', 'six heures'],
      'Calcule entre 7 h 30 et 15 h.',
      'De <b>7 h 30</b> à <b>15 h</b>, cela fait <b>7 h 30 min</b>. Il faut relier deux informations données à des endroits différents.'],
    [4, 'Une famille inscrit deux enfants. Combien paiera-t-elle ?', 'Rs 300',
      ['Rs 150', 'Rs 450', 'Rs 250'],
      'Le prix est donné « par élève ».',
      'Rs 150 <b>par élève</b> × 2 enfants = <b>Rs 300</b>. Le mot « par » est la clé de la question.'],
    [4, 'Pourquoi demande-t-on un chapeau et de l’eau ?', 'Parce que la sortie se passe dehors, en plein soleil',
      ['Parce que l’école les vend', 'Parce que le bus n’a pas de fenêtres', 'Parce que c’est écrit dans le règlement'],
      'Le courriel ne le dit pas : il faut le déduire.',
      'Un jardin se visite <b>dehors</b>, toute la matinée : le chapeau et l’eau protègent du soleil et de la chaleur. C’est une <b>inférence</b>.'],
  ];
  CO.forEach(r => Q('fr-textes', 'courriel', r[0], COURRIEL + r[1], [r[2], ...r[3]], r[2], r[4], r[5]));

  const AFFICHE = box(
    '<div style="text-align:center"><b style="font-size:1.15em">GRANDE FOIRE DU LIVRE</b><br>'
    + '<b>Salle des fêtes, Curepipe</b><br>'
    + 'Du <b>vendredi 6</b> au <b>dimanche 8 septembre</b><br>'
    + 'de 9 h à 17 h<br><br>'
    + 'Entrée : <b>Rs 50</b> - <i>gratuite pour les moins de 12 ans</i><br>'
    + 'Plus de 200 auteurs · Ateliers d’écriture · Contes pour enfants à 14 h<br><br>'
    + '<i>Renseignements : 5 123 4567</i></div>');
  const AF = [
    [1, 'Où se déroule la foire du livre ?', 'à la salle des fêtes de Curepipe',
      ['au Jardin de Pamplemousses', 'à Port Louis', 'à l’école de Rose Hill'],
      'Le lieu est écrit sous le titre.',
      'L’affiche indique « Salle des fêtes, <b>Curepipe</b> ».'],
    [1, 'Combien de jours dure la foire ?', 'trois jours', ['deux jours', 'une semaine', 'un jour'],
      'Du vendredi 6 au dimanche 8.',
      'Vendredi, samedi et dimanche : <b>trois</b> jours.'],
    [2, 'Combien paie un enfant de 10 ans ?', 'rien, l’entrée est gratuite',
      ['Rs 50', 'Rs 25', 'Rs 100'],
      'Lis la ligne en italique sous le prix.',
      '« <i>gratuite pour les moins de 12 ans</i> » : à 10 ans, l’enfant entre <b>gratuitement</b>.'],
    [2, 'À quelle heure ont lieu les contes pour enfants ?', 'à 14 h', ['à 9 h', 'à 17 h', 'à 12 h'],
      'Une seule activité a une heure précise.',
      'L’affiche annonce « Contes pour enfants à <b>14 h</b> ».'],
    [3, 'Pourquoi le titre est-il écrit en très gros caractères ?', 'Pour qu’on voie tout de suite de quoi il s’agit',
      ['Parce qu’il n’y avait plus de place', 'Pour cacher le prix', 'Parce que c’est la règle des affiches'],
      'Une affiche se lit de loin, en marchant.',
      'Sur une affiche, la taille des lettres <b>hiérarchise</b> l’information : le plus gros se lit en premier, de loin.'],
    [3, 'Que faire pour obtenir plus d’informations ?', 'téléphoner au 5 123 4567',
      ['écrire une lettre à la mairie', 'se rendre à l’école', 'envoyer un courriel'],
      'Regarde la dernière ligne.',
      'L’affiche donne un numéro : « <i>Renseignements : 5 123 4567</i> ».'],
    [3, 'Quelle information n’apparaît PAS sur cette affiche ?', 'le nom des auteurs présents',
      ['le prix de l’entrée', 'les horaires', 'le lieu'],
      'Compare chaque proposition avec l’affiche.',
      'L’affiche annonce « plus de 200 auteurs » mais ne <b>nomme</b> personne. Les trois autres informations y figurent.'],
    [4, 'Une mère et ses deux enfants de 8 et 14 ans viennent. Combien paient-ils ?', 'Rs 100',
      ['Rs 150', 'Rs 50', 'Rs 200'],
      'Qui a moins de 12 ans ?',
      'La mère paie Rs 50, l’enfant de 14 ans aussi (il a plus de 12 ans), celui de 8 ans entre gratuitement : <b>Rs 100</b>.'],
    [4, 'Quel est le but principal de cette affiche ?', 'Donner envie de venir et informer sur les détails pratiques',
      ['Raconter une histoire', 'Expliquer comment écrire un livre', 'Vendre des livres par correspondance'],
      'Une affiche a toujours deux buts en même temps.',
      'Une affiche <b>attire</b> (le titre, les activités) et <b>informe</b> (lieu, dates, prix, contact).'],
    [4, 'Un élève arrive le lundi 9 septembre à 10 h. Que se passe-t-il ?', 'La foire est terminée',
      ['Il entre gratuitement', 'Il doit payer Rs 50', 'Les contes commencent'],
      'Vérifie les dates avant l’heure.',
      'La foire se termine le <b>dimanche 8</b>. Le lundi 9, elle est finie - l’horaire « 9 h à 17 h » ne s’applique plus.'],
  ];
  AF.forEach(r => Q('fr-textes', 'affiche', r[0], AFFICHE + r[1], [r[2], ...r[3]], r[2], r[4], r[5]));

  const POEME = box(
    '<i>Le filao</i><br><br>'
    + 'Sur la plage endormie, le vieux filao chante,<br>'
    + 'Ses aiguilles de vert peignent le vent salé.<br>'
    + 'Il garde les secrets que la mer lui raconte<br>'
    + 'Et compte les bateaux comme un berger fatigué.');
  const PO = [
    [2, 'Combien de vers compte ce poème ?', 'quatre', ['trois', 'cinq', 'deux'],
      'Un vers est une ligne du poème.',
      'Le poème compte <b>quatre</b> lignes, donc quatre <b>vers</b>. Un groupe de vers s’appelle une <i>strophe</i>.'],
    [3, 'Dans « le vieux filao chante », quelle figure de style est employée ?', 'une personnification',
      ['une comparaison', 'une métaphore', 'une répétition'],
      'Un arbre peut-il vraiment chanter ?',
      'Donner à un objet ou à une plante une action <b>humaine</b> (chanter, garder, compter) est une <b>personnification</b>.'],
    [3, 'Dans « comme un berger fatigué », quelle figure de style reconnais-tu ?', 'une comparaison',
      ['une personnification', 'une métaphore', 'une énumération'],
      'Cherche le petit mot qui relie les deux images.',
      'Le mot <b>comme</b> signale une <b>comparaison</b> : le filao est comparé à un berger.'],
    [3, 'Que veut dire « la plage endormie » ?', 'La plage est calme et déserte',
      ['La plage dort vraiment', 'Il y a beaucoup de monde', 'La plage a disparu'],
      'C’est une image, pas une information.',
      'Une plage ne dort pas : l’image veut dire qu’elle est <b>calme, silencieuse, sans personne</b>.'],
    [2, 'Où se passe la scène du poème ?', 'sur une plage', ['dans une forêt', 'à l’école', 'au marché'],
      'Le premier vers donne le lieu.',
      '« Sur la <b>plage</b> endormie » situe la scène dès le premier vers.'],
    [4, 'Quel sentiment ce poème cherche-t-il à faire naître ?', 'un calme un peu mélancolique',
      ['la peur', 'la colère', 'l’amusement'],
      'Regarde les mots : endormie, vieux, secrets, fatigué.',
      'Les mots <i>endormie, vieux, secrets, fatigué</i> créent une atmosphère <b>paisible et un peu triste</b>.'],
    [4, 'Que suggère « Il garde les secrets que la mer lui raconte » ?', 'Le filao est là depuis très longtemps et a tout vu',
      ['La mer parle réellement', 'Le filao est bavard', 'Il y a un trésor sous l’arbre'],
      'Pourquoi un arbre aurait-il des secrets ?',
      'Un arbre qui « garde des secrets » est un arbre <b>ancien</b>, témoin de tout ce qui s’est passé sur la plage. C’est une inférence.'],
    [3, 'Dans « ses aiguilles de vert », que désigne le mot « aiguilles » ?', 'les fines feuilles du filao',
      ['des aiguilles à coudre', 'les aiguilles d’une horloge', 'des épines de cactus'],
      'De quoi parle-t-on depuis le début ?',
      'Les feuilles du filao sont fines et pointues : le poète les appelle des <b>aiguilles</b>.'],
    [4, 'Pourquoi le poète écrit-il « peignent le vent » ?', 'Parce que les aiguilles filtrent le vent comme un peigne les cheveux',
      ['Parce que le vent est coloré', 'Parce que le filao dessine un tableau', 'Parce que le vent se coiffe'],
      'Le verbe « peigner » a deux sens possibles ici.',
      'Il s’agit du <b>peigne</b> : les fines aiguilles laissent passer le vent comme un peigne dans les cheveux. Le double sens fait l’image.'],
    [2, 'Quel titre conviendrait aussi à ce poème ?', 'L’arbre de la plage',
      ['La tempête', 'Le marché de Curepipe', 'La rentrée des classes'],
      'Un bon titre résume le sujet.',
      'Le poème parle d’un <b>arbre</b> qui se tient sur une <b>plage</b> : « L’arbre de la plage » convient. Les autres titres n’ont aucun lien.'],
  ];
  PO.forEach(r => Q('fr-textes', 'poeme', r[0], POEME + r[1], [r[2], ...r[3]], r[2], r[4], r[5]));

  const LEGENDE = box(
    '<b>La légende du Morne</b><br><br>'
    + 'On raconte qu’autrefois, des hommes et des femmes se réfugièrent au sommet du Morne '
    + 'pour vivre libres. La montagne est haute et ses parois sont raides ; vue d’en bas, '
    + 'elle a l’air impossible à gravir. C’était précisément pour cela qu’ils l’avaient choisie.<br><br>'
    + 'Ils y vécurent longtemps. Ils connaissaient chaque sentier, chaque grotte, chaque source. '
    + 'Ils savaient quelles plantes se mangent et lesquelles soignent, repéraient la fumée d’un '
    + 'feu à des kilomètres, et apprirent à marcher sans laisser de traces. Les enfants nés '
    + 'là-haut ne connaissaient pas d’autre maison que le sommet, ni d’autre bruit, la nuit, '
    + 'que celui du vent.<br><br>'
    + 'Un matin, ils virent monter des soldats. Les hommes montaient lentement, en file, sans '
    + 'se cacher. On dit qu’ils portaient un message et non des armes, et que ce message '
    + 'annonçait la fin de l’esclavage. Mais du sommet on ne voyait que des uniformes, et '
    + 'personne là-haut n’avait de raison d’attendre une bonne nouvelle de ce côté-là.<br><br>'
    + 'Croyant qu’on venait les reprendre, ils '
    + 'refusèrent de redescendre.<br><br>'
    + 'On ne sait pas ce qu’il advint d’eux ce matin-là, et c’est peut-être pour cette raison '
    + 'que l’histoire s’est transmise si longtemps : chacun la termine à sa façon. Certains '
    + 'disent qu’ils choisirent la liberté jusqu’au bout. D’autres racontent qu’ils '
    + 'redescendirent beaucoup plus tard, une fois les soldats repartis, et qu’ils vécurent '
    + 'libres dans les villages de la côte. Les vieux du sud, eux, refusent de trancher.<br><br>'
    + 'Aujourd’hui, des visiteurs viennent du monde entier et montent le sentier en une '
    + 'matinée. Tout en haut, il n’y a rien à voir qu’une vue immense et beaucoup de vent. '
    + 'Les guides disent que c’est déjà beaucoup.<br><br>'
    + 'Depuis ce jour, dit-on, le vent qui souffle sur la montagne '
    + 'répète leurs noms, et le Morne veille sur l’île comme un gardien de pierre.');
  const LE = [
    [1, 'Où se passe cette légende ?', 'au Morne', ['à Port Louis', 'à Rodrigues', 'au Jardin de Pamplemousses'],
      'Le titre donne déjà le lieu.',
      'La légende se déroule au <b>Morne</b>, la montagne du sud-ouest de Maurice.'],
    [2, 'Pourquoi ces hommes et ces femmes étaient-ils montés au sommet ?', 'pour vivre libres',
      ['pour cultiver la terre', 'pour observer les bateaux', 'pour construire un village'],
      'La réponse est dans la première phrase.',
      '« … se réfugièrent au sommet du Morne <b>pour vivre libres</b> ».'],
    [2, 'Que virent-ils un matin ?', 'des soldats qui montaient', ['un bateau', 'un incendie', 'la mer monter'],
      'Un seul événement déclenche la suite.',
      '« Un matin, ils virent monter des <b>soldats</b>. »'],
    [3, 'Quel temps verbal domine ce récit ?', 'le passé simple',
      ['le présent', 'le futur simple', 'le conditionnel'],
      'Regarde « se réfugièrent », « virent », « refusèrent ».',
      'Les verbes <i>se réfugièrent, virent, refusèrent</i> sont au <b>passé simple</b>, le temps du récit écrit.'],
    [3, 'Qu’est-ce qui montre que ce texte est une légende et non un fait ?', 'Les expressions « on raconte » et « dit-on »',
      ['Les noms de lieux', 'La longueur du texte', 'La présence de soldats'],
      'Cherche les mots qui prennent des distances avec la vérité.',
      '« <b>On raconte</b> » et « <b>dit-on</b> » signalent une histoire transmise oralement, pas un fait vérifié : c’est la marque de la légende.'],
    [3, 'Que veut dire « ils connaissaient chaque sentier » ?', 'Ils connaissaient très bien la montagne',
      ['Ils avaient construit les sentiers', 'Ils comptaient les sentiers', 'Ils se perdaient souvent'],
      '« chaque » insiste sur quelque chose.',
      'Connaître <b>chaque</b> sentier, grotte et source veut dire connaître la montagne <b>parfaitement</b>.'],
    [4, 'Pourquoi ont-ils refusé de redescendre ?', 'Parce qu’ils croyaient qu’on venait les reprendre',
      ['Parce que le chemin était coupé', 'Parce qu’ils avaient froid', 'Parce qu’ils attendaient un bateau'],
      'Le texte donne la raison de leur croyance.',
      '« <b>Croyant qu’on venait les reprendre</b>, ils refusèrent de redescendre. » C’est ce qu’ils pensaient, pas forcément la vérité.'],
    [4, 'Que signifie « le Morne veille sur l’île comme un gardien de pierre » ?', 'La montagne protège l’île, comme un souvenir immobile',
      ['Un gardien habite au sommet', 'La montagne est faite de statues', 'Le Morne surveille les bateaux la nuit'],
      'C’est une comparaison, pas une description.',
      'La montagne est comparée à un <b>gardien</b> : elle domine l’île et garde la mémoire de ces personnes. « De pierre » rappelle qu’elle ne bouge pas.'],
    [4, 'Quelle est la fonction de la dernière phrase dans une légende ?', 'Elle explique une chose qu’on peut encore voir ou entendre aujourd’hui',
      ['Elle donne la morale', 'Elle présente les personnages', 'Elle situe l’action dans le temps'],
      'Que relie-t-elle au présent ?',
      'Une légende se termine souvent en <b>expliquant le présent</b> : ici, le vent qui souffle et la montagne qui veille.'],
    [3, 'Dans quel ordre les événements se déroulent-ils ?', 'ils montent · ils voient les soldats · ils refusent de descendre',
      ['ils voient les soldats · ils montent · ils refusent',
       'ils refusent · ils montent · ils voient les soldats',
       'ils montent · ils refusent · ils voient les soldats'],
      'Relis le récit du début à la fin.',
      'L’ordre est : ils se réfugient au sommet, puis <b>un matin</b> ils voient les soldats, puis ils refusent de redescendre.'],
  ];
  LE.forEach(r => Q('fr-textes', 'legende', r[0], LEGENDE + r[1], [r[2], ...r[3]], r[2], r[4], r[5]));
})();
