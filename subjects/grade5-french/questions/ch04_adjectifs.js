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
