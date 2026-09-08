'use strict';
// Grade 6 French - COMPRÉHENSION sur deux textes.
//
// WHY THIS FILE EXISTS
// Measured 2026-09-08 against the French 2024 paper's own mark allocations:
//
//                        paper   bank    gap
//   grammaire & phrase   32.2%   79.7%   +47.5
//   vocabulaire          22.2%    9.3%   -12.9
//   compréhension        27.8%    8.5%   -19.3
//   production (écrire)  17.8%    2.5%   -15.3
//
// ⚠ The paper column was corrected 2026-09-08. An earlier pass scored Q7A
//   (correcting mistakes in a text) as comprehension and treated the Q6
//   gap-fill marks as unclaimed; both belong to grammar-and-word-level work.
//   The gap this file exists to close is smaller than first reported, and real.
//
// This is the most unbalanced pack in the repo: nearly four fifths of it is
// conjugation drill, against a paper that spends 32.2% there. Comprehension is
// short by 19.3 points - the largest reading gap of the five packs.
//
// ⚠ Production cannot be closed here either: Q8A (histoire en images, 6) and
//   Q9 (rédaction, 10) require writing. 16 marks are out of an MCQ's reach.
//
// The two texts follow the paper's own shapes: one INFORMATIF answered by
// repérage (like the 2024 Soleil text and the 2023 jamblon text), and one
// RÉCIT answered by inference (like the 2024 Wang et Chong tale).

const _TORTUE = `<div style="background:#f8fafc;border-left:3px solid #94a3b8;padding:8px 10px;margin:8px 0;border-radius:4px;line-height:1.6">
<b>La tortue géante de Rodrigues</b><br>
Il y a quatre cents ans, des milliers de tortues géantes vivaient à Rodrigues. Elles
étaient si nombreuses que les marins écrivaient qu'on pouvait marcher sur leurs
carapaces sans toucher le sol.<br><br>
Ces tortues ne mangeaient que des plantes. Elles se déplaçaient lentement et ne
craignaient personne, car l'île n'avait aucun prédateur. C'est pourquoi elles se
laissaient approcher sans fuir.<br><br>
Les bateaux qui passaient emportaient les tortues vivantes dans leurs cales : elles
pouvaient survivre des mois sans manger et fournissaient de la viande fraîche pendant
le voyage. En <b>1800</b>, il n'en restait plus une seule à Rodrigues.<br><br>
Aujourd'hui, à la réserve François Leguat, on élève des tortues venues d'Aldabra, une
île voisine. Elles ressemblent beaucoup à celles qui ont disparu et jouent le même
rôle : en broutant, elles aident les graines des plantes indigènes à germer.</div>`;

const _MARCHE = `<div style="background:#f8fafc;border-left:3px solid #94a3b8;padding:8px 10px;margin:8px 0;border-radius:4px;line-height:1.6">
Le samedi, Ayaan accompagnait toujours son grand-père au marché. Il portait le panier,
et son grand-père portait les histoires.<br><br>
Ce matin-là, devant l'étal du marchand de légumes, le vieil homme s'arrêta plus
longtemps que d'habitude. Il regardait ses mains. « J'ai oublié la liste », dit-il
enfin, et il rit, mais son rire ne dura pas.<br><br>
Ayaan sentit quelque chose se serrer dans sa poitrine. Il connaissait la liste par
cœur : des brèdes, deux kilos de tomates, du piment, et toujours, toujours, un ananas
pour sa grand-mère.<br><br>
« Ce n'est pas grave, dit Ayaan en prenant le bras de son grand-père. Aujourd'hui,
c'est moi qui me souviens. »</div>`;

STATIC_QUESTIONS.push(

  // ── Texte 1 : informatif - repérage ─────────────────────────────────────

  makeMCQ({ id:'g6fr-comp-101', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'Lis le texte, puis réponds à la question.' + _TORTUE +
      'En quelle année n\'y avait-il plus aucune tortue à Rodrigues ?',
    options:['En 1800','En 1600','En 1900','En 1400'], answer:'En 1800',
    hint:'La date est écrite en gras dans le troisième paragraphe.',
    explanation:'Le texte dit : « En <b>1800</b>, il n\'en restait plus une seule à Rodrigues. »' }),

  makeMCQ({ id:'g6fr-comp-102', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'Lis le texte, puis réponds à la question.' + _TORTUE +
      'De quoi se nourrissaient ces tortues ?',
    options:['De plantes','De petits poissons','D\'insectes','De graines seulement'], answer:'De plantes',
    hint:'La réponse est au début du deuxième paragraphe.',
    explanation:'Le texte précise : « Ces tortues ne mangeaient que <b>des plantes</b>. »' }),

  makeMCQ({ id:'g6fr-comp-103', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:3,
    question:'Lis le texte, puis réponds à la question.' + _TORTUE +
      'Pourquoi les marins emportaient-ils les tortues sur les bateaux ?',
    options:['Elles vivaient longtemps sans manger','Elles nettoyaient la cale du bateau','Elles portaient chance aux marins','Elles étaient faciles à vendre en Europe'],
    answer:'Elles vivaient longtemps sans manger',
    hint:'Cherche l\'avantage pratique expliqué dans le troisième paragraphe.',
    explanation:'Le texte explique qu\'elles « pouvaient survivre des mois sans manger et fournissaient de la viande fraîche pendant le voyage » - c\'était donc de la nourriture qui se conservait vivante.' }),

  makeMCQ({ id:'g6fr-comp-104', chapterId:'g6fr-lecture', subsection:'inference', difficulty:3,
    question:'Lis le texte, puis réponds à la question.' + _TORTUE +
      'Pourquoi les tortues « se laissaient approcher sans fuir » ?',
    options:['L\'île n\'avait aucun prédateur','Elles étaient trop vieilles pour courir','Elles aimaient la compagnie des marins','Elles étaient attachées par les marins'],
    answer:'L\'île n\'avait aucun prédateur',
    hint:'Un animal qui n\'a jamais été chassé n\'a jamais appris à avoir peur.',
    explanation:'Le texte dit qu\'elles « ne craignaient personne, car l\'île n\'avait <b>aucun prédateur</b> ». N\'ayant jamais été chassées, elles ne fuyaient pas - ce qui les rendait faciles à capturer.' }),

  makeMCQ({ id:'g6fr-comp-105', chapterId:'g6fr-lecture', subsection:'vocabulaire', difficulty:2,
    question:'Lis le texte, puis réponds à la question.' + _TORTUE +
      'Dans le texte, que veut dire le mot « <b>indigènes</b> » ?',
    options:['Qui poussent naturellement dans l\'île','Qui viennent d\'un autre pays','Qui sont cultivées dans un jardin','Qui ont totalement disparu'],
    answer:'Qui poussent naturellement dans l\'île',
    hint:'Le contraire serait « importées ».',
    explanation:'Une plante <b>indigène</b> pousse naturellement dans la région depuis toujours, contrairement à une plante importée ou cultivée.' }),

  makeMCQ({ id:'g6fr-comp-106', chapterId:'g6fr-lecture', subsection:'idee_principale', difficulty:3,
    question:'Lis le texte, puis réponds à la question.' + _TORTUE +
      'Quel titre conviendrait le mieux à ce texte ?',
    options:['Disparues, puis remplacées','Les bateaux d\'autrefois','Comment élever une tortue','Les plantes de Rodrigues'],
    answer:'Disparues, puis remplacées',
    hint:'Un bon titre couvre tout le texte, pas seulement un paragraphe.',
    explanation:'Le texte raconte la disparition des tortues de Rodrigues, puis leur remplacement par celles d\'Aldabra : <b>Disparues, puis remplacées</b> couvre l\'ensemble.' }),

  // ── Texte 2 : récit - inference ─────────────────────────────────────────

  makeMCQ({ id:'g6fr-comp-107', chapterId:'g6fr-textes', subsection:'recit', difficulty:2,
    question:'Lis le texte, puis réponds à la question.' + _MARCHE +
      'Où se passe cette histoire ?',
    options:['Au marché','À l\'école','Dans un jardin','Sur la plage'], answer:'Au marché',
    hint:'La première phrase le dit.',
    explanation:'Le texte commence : « Le samedi, Ayaan accompagnait toujours son grand-père <b>au marché</b>. »' }),

  makeMCQ({ id:'g6fr-comp-108', chapterId:'g6fr-lecture', subsection:'interpretation', difficulty:3,
    question:'Lis le texte, puis réponds à la question.' + _MARCHE +
      '« Il portait le panier, et son grand-père portait les histoires. » Que veut dire cette phrase ?',
    options:['Le grand-père racontait pendant qu\'Ayaan aidait','Le grand-père portait un deuxième panier','Ayaan écrivait les histoires dans un cahier','Les deux portaient la même charge'],
    answer:'Le grand-père racontait pendant qu\'Ayaan aidait',
    hint:'On ne « porte » pas vraiment une histoire. Que fait le grand-père ?',
    explanation:'C\'est une image : Ayaan porte le poids réel, le panier, et le grand-père apporte les <b>récits</b>. Chacun contribue à sa façon.' }),

  makeMCQ({ id:'g6fr-comp-109', chapterId:'g6fr-lecture', subsection:'inference', difficulty:3,
    question:'Lis le texte, puis réponds à la question.' + _MARCHE +
      'Pourquoi le rire du grand-père « ne dura pas » ?',
    options:['Il était inquiet d\'avoir oublié','Il avait mal à la gorge','Il trouvait le marché trop bruyant','Il avait perdu son argent'],
    answer:'Il était inquiet d\'avoir oublié',
    hint:'Il rit d\'abord, puis s\'arrête. Qu\'est-ce qui le préoccupe ?',
    explanation:'Il rit pour cacher sa gêne, mais l\'oubli l\'<b>inquiète</b> : il regardait déjà ses mains avant de parler. Le texte ne mentionne ni gorge, ni bruit, ni argent.' }),

  makeMCQ({ id:'g6fr-comp-110', chapterId:'g6fr-lecture', subsection:'inference', difficulty:3,
    question:'Lis le texte, puis réponds à la question.' + _MARCHE +
      '« Ayaan sentit quelque chose se serrer dans sa poitrine. » Que ressent Ayaan ?',
    options:['De l\'inquiétude pour son grand-père','De la colère contre le marchand','De la joie d\'aller au marché','De la faim avant le déjeuner'],
    answer:'De l\'inquiétude pour son grand-père',
    hint:'Cette sensation vient juste après le rire qui s\'arrête.',
    explanation:'Le serrement dans la poitrine exprime l\'<b>inquiétude</b> : Ayaan comprend que son grand-père perd la mémoire, et cela lui fait peur.' }),

  makeMCQ({ id:'g6fr-comp-111', chapterId:'g6fr-lecture', subsection:'interpretation', difficulty:3,
    question:'Lis le texte, puis réponds à la question.' + _MARCHE +
      '« Aujourd\'hui, c\'est moi qui me souviens. » Pourquoi Ayaan dit-il cela ?',
    options:['Pour rassurer son grand-père','Pour se moquer gentiment de lui','Pour montrer qu\'il est plus intelligent','Pour rentrer plus vite à la maison'],
    answer:'Pour rassurer son grand-père',
    hint:'Il prend le bras de son grand-père en même temps qu\'il parle.',
    explanation:'En prenant le bras du vieil homme et en disant « ce n\'est pas grave », Ayaan le <b>rassure</b> : il prend à son tour le rôle de celui qui se souvient.' }),

  makeMCQ({ id:'g6fr-comp-112', chapterId:'g6fr-lecture', subsection:'vrai_faux', difficulty:2,
    question:'Lis le texte, puis réponds à la question.' + _MARCHE +
      'Selon le texte, quel fruit était toujours sur la liste ?',
    options:['Un ananas','Une mangue','Une banane','Une papaye'], answer:'Un ananas',
    hint:'Ayaan connaît la liste par cœur. Que contient-elle ?',
    explanation:'Le texte précise : « et toujours, toujours, un <b>ananas</b> pour sa grand-mère ».' })

);
