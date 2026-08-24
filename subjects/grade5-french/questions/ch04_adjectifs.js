'use strict';
// Grade 5 French — Chapitre : Les Adjectifs
// IDs format: g5fr-adj-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-adj-001', chapterId:'fr-adjectifs', difficulty:1,
    question:'Comment forme-t-on généralement le féminin d\'un adjectif ?',
    options:['On ajoute -s','On ajoute -e','On change tout le mot','On ajoute -es'],
    answer:'On ajoute -e',
    hint:'Masculin : petit → féminin : petite.',
    explanation:'En général, on ajoute <b>-e</b> pour former le féminin d\'un adjectif : grand → grand<b>e</b>, petit → petit<b>e</b>, joli → joli<b>e</b>. Si l\'adjectif se termine déjà par -e, il ne change pas : rouge, facile, honnête.' }),

  makeMCQ({ id:'g5fr-adj-002', chapterId:'fr-adjectifs', difficulty:1,
    question:'Quel est le féminin de l\'adjectif "grand" ?',
    options:['grande','grands','grandes','grandi'],
    answer:'grande',
    hint:'Masculin : grand → féminin : grand + ?',
    explanation:'"<b>Grande</b>" est le féminin de "grand". Règle générale : masculin + <b>-e</b> = féminin. La consonne finale qui était muette devient prononcée : "gran" → "grand<b>e</b>" (le d se prononce).' }),

  makeMCQ({ id:'g5fr-adj-003', chapterId:'fr-adjectifs', difficulty:2,
    question:'Quel est le féminin de "beau" ?',
    options:['beaue','belle','beau','beaux'],
    answer:'belle',
    hint:'"Beau" a une forme irrégulière au féminin.',
    explanation:'"<b>Belle</b>" est le féminin de "beau". Adjectifs irréguliers : beau → <b>belle</b>, nouveau → <b>nouvelle</b>, vieux → <b>vieille</b>. "Beau" → "bel" devant une voyelle (un bel homme).' }),

  makeMCQ({ id:'g5fr-adj-004', chapterId:'fr-adjectifs', difficulty:2,
    question:'Où se place généralement l\'adjectif de COULEUR en français ?',
    options:['Avant le nom','Après le nom','N\'importe où dans la phrase','Au début de la phrase'],
    answer:'Après le nom',
    hint:'En français, la couleur vient après le nom qu\'elle décrit.',
    explanation:'Les adjectifs de couleur se placent <b>après</b> le nom : une robe <b>rouge</b>, un chat <b>noir</b>, des yeux <b>bleus</b>. En anglais, les adjectifs sont avant le nom (a red dress), mais en français, beaucoup d\'adjectifs viennent après.' }),

  makeMCQ({ id:'g5fr-adj-005', chapterId:'fr-adjectifs', difficulty:2,
    question:'Complétez : "C\'est une ___ maison." (petit)',
    options:['petit','petits','petite','petites'],
    answer:'petite',
    hint:'"Maison" est féminin. L\'adjectif doit s\'accorder.',
    explanation:'"C\'est une <b>petite</b> maison." — "Maison" est féminin singulier, donc l\'adjectif prend la forme féminine singulière : petit → petit<b>e</b>. Les adjectifs s\'accordent toujours en genre et en nombre avec le nom.' }),

  makeMCQ({ id:'g5fr-adj-006', chapterId:'fr-adjectifs', difficulty:2,
    question:'Quel est le pluriel de "un nouveau livre" ?',
    options:['des nouveaux livres','des nouvelles livres','des nouveau livres','des nouvel livres'],
    answer:'des nouveaux livres',
    hint:'"Nouveau" → pluriel masculin = nouveaux. "Livre" est masculin.',
    explanation:'"<b>Des nouveaux livres</b>" — "nouveau" (masc. sing.) → <b>nouveaux</b> (masc. plur.). Tableau : nouveau → nouveaux, nouvelle → nouvelles. Devant voyelle : bel, nouvel, vieil (singulier masculin seulement).' }),

  makeTF({ id:'g5fr-adj-007', chapterId:'fr-adjectifs', difficulty:1,
    question:'En français, les adjectifs s\'accordent en genre et en nombre avec le nom qu\'ils décrivent.',
    answer:true,
    hint:'Un adjectif modifie un nom — il doit lui "correspondre".',
    explanation:'<b>Vrai.</b> Les adjectifs français s\'accordent toujours avec le nom : masculin/féminin, singulier/pluriel. Exemples : un garçon <b>grand</b> / une fille <b>grande</b> / des garçons <b>grands</b> / des filles <b>grandes</b>.' }),

  makeMCQ({ id:'g5fr-adj-008', chapterId:'fr-adjectifs', difficulty:2,
    question:'Complétez : "Les enfants sont ___." (heureux)',
    options:['heureuse','heureux','heureuses','heureux'],
    answer:'heureux',
    hint:'"Enfants" est masculin pluriel. La forme masculine de "heureux" ne change pas au pluriel.',
    explanation:'"Les enfants sont <b>heureux</b>." — "Heureux" est masculin pluriel (et aussi masculin singulier — la forme ne change pas). Féminin singulier/pluriel : heureus<b>e</b> / heureus<b>es</b>. Les adjectifs en -eux/-euse suivent ce modèle.' }),

  makeMCQ({ id:'g5fr-adj-009', chapterId:'fr-adjectifs', difficulty:2,
    question:'Quel est le féminin de "vieux" ?',
    options:['vieuxe','vielle','vieille','vieux'],
    answer:'vieille',
    hint:'"Vieux" est irrégulier comme "beau" et "nouveau".',
    explanation:'"<b>Vieille</b>" est le féminin de "vieux". Les trois irréguliers : beau → belle, nouveau → nouvelle, <b>vieux → vieille</b>. Devant voyelle (masculin singulier) : vieil (un vieil homme).' }),

  makeMCQ({ id:'g5fr-adj-010', chapterId:'fr-adjectifs', difficulty:2,
    question:'Parmi ces adjectifs, lequel se place généralement AVANT le nom ?',
    options:['rouge','français','grand','intéressant'],
    answer:'grand',
    hint:'Les adjectifs BAGS (Beauté, Âge, Grandeur, Forme courte) se placent avant le nom.',
    explanation:'"<b>Grand</b>" se place <b>avant</b> le nom : un <b>grand</b> immeuble, une <b>grande</b> ville. Règle BAGS : Beauté (beau, joli), Âge (jeune, vieux), Grandeur/nombre (grand, petit, gros), formes courtes (bon, mauvais) → avant le nom. Les autres (couleurs, nationalités, etc.) → après.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-adj-011', chapterId:'fr-adjectifs', difficulty:1,
    question:'Quelle est la forme féminine de "blanc" ?',
    options:['blanche','blance','blanque','blanc'],
    answer:'blanche',
    hint:'Les adjectifs en -nc forment généralement leur féminin en -che.',
    explanation:'"<b>blanche</b>" — blanc → blanche. Autres adjectifs en -c → -che : sec → sèche, franc → franche. Note : "public" → "publique" est différent. Féminin : une fleur blanche, une voiture blanche.' }),

  makeMCQ({ id:'g5fr-adj-012', chapterId:'fr-adjectifs', difficulty:1,
    question:'Quelle est la forme féminine de "sportif" ?',
    options:['sportive','sportife','sportiève','sportife'],
    answer:'sportive',
    hint:'Les adjectifs en -if changent en -ive au féminin.',
    explanation:'"<b>sportive</b>" — -if → -ive : sportif → sportive. Autres exemples : actif → active, naïf → naïve, attentif → attentive, négatif → négative. Question type très courante au PSAC !' }),

  makeMCQ({ id:'g5fr-adj-013', chapterId:'fr-adjectifs', difficulty:2,
    question:'Complétez : "Cette fille est très ___ ." (heureux)',
    options:['heureux','heureuse','heureuses','heureux'],
    answer:'heureuse',
    hint:'"Fille" est féminin singulier → forme féminine singulière de l\'adjectif.',
    explanation:'"<b>heureuse</b>" — heureux (masc.) → heureuse (fém.). Schéma -eux → -euse : heureux/heureuse, courageux/courageuse, sérieux/sérieuse, dangereux/dangereuse. L\'adjectif doit s\'accorder en genre et en nombre avec le nom qu\'il qualifie.' }),

  makeMCQ({ id:'g5fr-adj-014', chapterId:'fr-adjectifs', difficulty:2,
    question:'Quel est le comparatif de supériorité de "grand" ?',
    options:['aussi grand','plus grand','le plus grand','très grand'],
    answer:'plus grand',
    hint:'Comparatif = more than → "plus + adjectif". Superlatif = the most → "le/la plus + adjectif".',
    explanation:'"<b>plus grand</b>" — le comparatif de supériorité. Structures : plus + adj (+ que) → comparatif de supériorité. aussi + adj (+ que) → comparatif d\'égalité. moins + adj (+ que) → comparatif d\'infériorité. Superlatif : le/la/les plus + adj.' }),

  makeMCQ({ id:'g5fr-adj-015', chapterId:'fr-adjectifs', difficulty:2,
    question:'Dans "son ventre est aussi doux que Caramel", pourquoi "doux" est-il au masculin ?',
    options:[
      '"doux" est toujours masculin',
      '"ventre" (stomach) est masculin → l\'adjectif est masculin',
      '"Caramel" est masculin',
      '"doux" ne change pas au féminin'
    ],
    answer:'"ventre" (stomach) est masculin → l\'adjectif est masculin',
    hint:'L\'adjectif s\'accorde avec le nom qu\'il qualifie. Quel nom "doux" qualifie-t-il ici ?',
    explanation:'"<b>ventre</b>" est masculin → "doux" reste au masculin. Si "ventre" était féminin, on dirait "douce". Règle d\'accord : l\'adjectif s\'accorde en genre ET en nombre avec le nom qu\'il qualifie. (Exemple tiré du manuel scolaire MIE Grade 5, PSAC 2025.)' }),

  makeTF({ id:'g5fr-adj-016', chapterId:'fr-adjectifs', difficulty:2,
    question:'"La forme féminine de \'bon\' est \'bone\'."',
    answer:false,
    hint:'"Bon" a une forme féminine irrégulière.',
    explanation:'<b>Faux.</b> La forme féminine de "bon" est "<b>bonne</b>" (double n). Bon → bonne, mignon → mignonne, ancien → ancienne, moyen → moyenne. Ces adjectifs doublent la consonne finale au féminin. Autres irréguliers : beau → belle, vieux → vieille, nouveau → nouvelle.' }),

  makeMCQ({ id:'g5fr-adj-017', chapterId:'fr-adjectifs', difficulty:3,
    question:'Corrigez l\'ordre des adjectifs : "C\'est une voiture rouge vieille."',
    options:[
      'C\'est une rouge voiture vieille.',
      'C\'est une vieille voiture rouge.',
      'C\'est une voiture vieille rouge.',
      'C\'est une rouge vieille voiture.'
    ],
    answer:'C\'est une vieille voiture rouge.',
    hint:'"Vieille" (âge) = BAGS → avant le nom. "Rouge" (couleur) → après le nom.',
    explanation:'"<b>une vieille voiture rouge</b>" — Les adjectifs BAGS (Beauté, Âge, Bonté, Grandeur) se placent AVANT le nom : belle, vieille, bonne, grande. Les adjectifs de couleur se placent TOUJOURS après le nom : rouge, bleu, vert. Donc : vieille (avant) + voiture + rouge (après).' }),

  makeMCQ({ id:'g5fr-adj-018', chapterId:'fr-adjectifs', difficulty:3,
    question:'Quel est le superlatif de supériorité de "intelligent" pour un groupe masculin pluriel ?',
    options:['le plus intelligent','les plus intelligents','très intelligent','plus intelligent'],
    answer:'les plus intelligents',
    hint:'Superlatif + accord pluriel masculin.',
    explanation:'"<b>les plus intelligents</b>" — superlatif pour un groupe masculin pluriel : les + plus + adj (accordé au pluriel). "Ce sont les élèves les plus intelligents de l\'école." Féminin singulier : la plus intelligente. Pluriel féminin : les plus intelligentes.' }),

  makeMCQ({ id:'g5fr-adj-019', chapterId:'fr-adjectifs', difficulty:4,
    question:'Quelle phrase utilise les adjectifs CORRECTEMENT ?',
    options:[
      'Il porte un chapeau grand noir.',
      'Elle a de beaux yeux marron.',
      'C\'est une fille intelligente belle.',
      'Il a des cheveux noirs très longues.'
    ],
    answer:'Elle a de beaux yeux marron.',
    hint:'"Beau" (BAGS) est avant le nom ; "marron" (couleur) est après. Vérifiez aussi les accords.',
    explanation:'"<b>Elle a de beaux yeux marron.</b>" ✓ — beau (BAGS) → beaux (avant, masc. plur.), marron (couleur invariable → après, pas d\'accord). Erreurs : (1) "chapeau <b>grand</b> noir" → "grand" (BAGS) doit être avant : un <b>grand</b> chapeau noir ; (2) "fille intelligente belle" → beau (BAGS) doit être avant : une <b>belle</b> fille intelligente ; (3) "cheveux... <b>longues</b>" → cheveux est masculin → longs.' })

);
