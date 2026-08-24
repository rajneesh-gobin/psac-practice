'use strict';
// Grade 4 French — Chapitre : Les Noms & Articles
// IDs format: g4fr-nom-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4fr-nom-001', chapterId:'g4fr-noms', difficulty:1,
    question:'L\'article "le" s\'utilise avec les noms... ?',
    options:['féminins singuliers','masculins singuliers','féminins pluriels','masculins pluriels'],
    answer:'masculins singuliers',
    hint:'Articles définis : le (m. sg.), la (f. sg.), les (pluriel).',
    explanation:'"<b>Le</b>" est l\'article défini masculin singulier. Exemples : le chat (the cat), le livre (the book). "<b>La</b>" est l\'article défini féminin singulier : la maison (the house). "<b>Les</b>" est l\'article pluriel (m. et f.) : les chats, les maisons.' }),

  makeMCQ({ id:'g4fr-nom-002', chapterId:'g4fr-noms', difficulty:1,
    question:'"Une maison" — le mot "maison" est... ?',
    options:['masculin','féminin','pluriel','invariable'],
    answer:'féminin',
    hint:'"Une" est l\'article indéfini féminin. L\'article indique le genre du nom.',
    explanation:'"<b>Maison</b>" est un nom <b>féminin</b> — c\'est pourquoi on utilise "une" (féminin) et non "un" (masculin). En français, chaque nom a un genre. Il faut apprendre le genre avec le mot. Exemples féminins : la maison, la fleur, la fille. Exemples masculins : le chat, le garçon, le livre.' }),

  makeTF({ id:'g4fr-nom-003', chapterId:'g4fr-noms', difficulty:1,
    question:'"La chien" est correct en français.',
    answer:false,
    hint:'"Chien" (dog) est-il masculin ou féminin ?',
    explanation:'<b>Faux.</b> "Chien" (dog) est un nom <b>masculin</b>, donc on dit "<b>le chien</b>" et non "la chien". Articles définis : le (m.) / la (f.). Articles indéfinis : un (m.) / une (f.). On dit aussi "un chien" (a dog).' }),

  makeMCQ({ id:'g4fr-nom-004', chapterId:'g4fr-noms', difficulty:1,
    question:'Comment forme-t-on le pluriel de la plupart des noms en français ?',
    options:['On ajoute -es','On ajoute -s','On double la dernière lettre','On ne change rien'],
    answer:'On ajoute -s',
    hint:'C\'est la même règle générale qu\'en anglais pour la plupart des noms.',
    explanation:'Pour former le pluriel de la plupart des noms en français, on <b>ajoute -s</b> : le chat → les chat<b>s</b>, la fleur → les fleur<b>s</b>, le livre → les livre<b>s</b>. Exception : les noms qui se terminent en -eau prennent -x : le bateau → les bateaux.' }),

  makeMCQ({ id:'g4fr-nom-005', chapterId:'g4fr-noms', difficulty:2,
    question:'Quel article utilise-t-on devant "ami" (friend, masculine) ?',
    options:['le','la','l\'','les'],
    answer:"l'",
    hint:'"Ami" commence par une voyelle. Quel article utilise-t-on devant une voyelle ?',
    explanation:'"<b>L\'ami</b>" — devant un nom commençant par une voyelle (a, e, i, o, u) ou un h muet, on utilise <b>l\'</b> au lieu de "le" ou "la". Exemples : l\'ami (m.), l\'école (f.), l\'hôpital (m.), l\'orange (f.). C\'est l\'élision.' }),

  makeMCQ({ id:'g4fr-nom-006', chapterId:'g4fr-noms', difficulty:2,
    question:'Quelle est la forme plurielle de "le chat" ?',
    options:['la chats','le chats','les chat','les chats'],
    answer:'les chats',
    hint:'Au pluriel, l\'article défini est toujours "les". N\'oublie pas le -s au nom.',
    explanation:'"<b>Les chats</b>" — au pluriel, l\'article défini est toujours "<b>les</b>" (pour les noms masculins et féminins). On ajoute aussi un <b>-s</b> au nom. Le -s ne se prononce généralement pas en français.' }),

  makeMCQ({ id:'g4fr-nom-007', chapterId:'g4fr-noms', difficulty:2,
    question:'Quel article indéfini utilise-t-on avec "stylo" (pen, masculin) ?',
    options:['une','un','des','la'],
    answer:'un',
    hint:'"Un" pour les noms masculins, "une" pour les noms féminins.',
    explanation:'"<b>Un stylo</b>" — "stylo" est masculin, donc on utilise l\'article indéfini masculin "<b>un</b>". Articles indéfinis : un (m. sg.), une (f. sg.), des (pluriel). Exemples : un garçon, une fille, des livres.' }),

  makeMCQ({ id:'g4fr-nom-008', chapterId:'g4fr-noms', difficulty:2,
    question:'"Des" est l\'article indéfini utilisé pour... ?',
    options:['Les noms masculins singuliers','Les noms féminins singuliers','Les noms pluriels (m. et f.)','Les noms commençant par une voyelle'],
    answer:'Les noms pluriels (m. et f.)',
    hint:'"Des" est la forme plurielle de "un" et "une".',
    explanation:'"<b>Des</b>" est l\'article indéfini pluriel — il s\'utilise avec les noms masculins ET féminins au pluriel. Exemples : des chats (m.pl.), des maisons (f.pl.), des amis (m.pl.). En anglais, "des" correspond à "some" ou peut ne pas être traduit : des enfants = children / some children.' }),

  makeMCQ({ id:'g4fr-nom-009', chapterId:'g4fr-noms', difficulty:3,
    question:'Choisis la phrase qui utilise les articles CORRECTEMENT.',
    options:[
      'Le fille mange une pomme.',
      'La garçon a un stylo.',
      'La fille mange une pomme.',
      'Un école est grande.'
    ],
    answer:'La fille mange une pomme.',
    hint:'Vérifie le genre de chaque nom : fille (f.), garçon (m.), école (f.).',
    explanation:'"<b>La fille mange une pomme.</b>" est correct. "Fille" est féminin → la fille ✓. "Pomme" est féminin → une pomme ✓. Les erreurs dans les autres : "Le fille" ✗ (fille est féminin), "La garçon" ✗ (garçon est masculin), "Un école" ✗ (école est féminin → une école ou l\'école).' }),

  makeMCQ({ id:'g4fr-nom-010', chapterId:'g4fr-noms', difficulty:4,
    question:'Luc écrit : "Je vois ___ chat noir dans ___ jardin." Les blancs sont dans l\'ordre : article défini + article défini. Quelle paire est correcte ?',
    options:['une / le','un / le','le / le','un / un'],
    answer:'un / le',
    hint:'Premier blanc : on ne connaît pas ce chat spécifique → article indéfini. Deuxième blanc : "le jardin" (masculin, défini — le jardin de Luc).',
    explanation:'"Je vois <b>un</b> chat noir dans <b>le</b> jardin." Premier blanc : "<b>un</b>" (article indéfini masculin) — c\'est un chat inconnu, pas un chat spécifique. Deuxième blanc : "<b>le</b>" jardin (article défini masculin) — il s\'agit d\'un jardin précis (celui de Luc). Règle : article indéfini = chose non identifiée; article défini = chose identifiée/spécifique.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4fr-nom-011', chapterId:'g4fr-noms', difficulty:1,
    question:'Quelle est la forme plurielle de "le bateau" ?',
    options:['les bateaus','les bateau','les bateaux','les bateux'],
    answer:'les bateaux',
    hint:'Les noms qui se terminent en -eau forment leur pluriel en -eaux.',
    explanation:'"<b>Les bateaux</b>" — les noms en <b>-eau</b> prennent <b>-x</b> au pluriel (pas -s) : bateau → bateaux, gâteau → gâteaux, chapeau → chapeaux. C\'est une règle importante à retenir !' }),

  makeMCQ({ id:'g4fr-nom-012', chapterId:'g4fr-noms', difficulty:1,
    question:'Que signifie "du" dans "Je mange du pain" ?',
    options:['some — article partitif masculin','the — article défini masculin','a — article indéfini masculin','many — beaucoup de'],
    answer:'some — article partitif masculin',
    hint:'"Du" = de + le. On l\'utilise pour une quantité indéfinie.',
    explanation:'"<b>Du</b>" est l\'article partitif masculin (de + le). Il exprime une quantité indéfinie : "Je mange du pain" = I eat some bread. Articles partitifs : du (m.), de la (f.), de l\' (voyelle), des (pluriel).' }),

  makeTF({ id:'g4fr-nom-013', chapterId:'g4fr-noms', difficulty:1,
    question:'"Le soleil" est un nom masculin.',
    answer:true,
    hint:'L\'article "le" indique le genre. "Le" = masculin.',
    explanation:'<b>Vrai.</b> "Soleil" (sun) est masculin — on dit "<b>le soleil</b>". En français, le genre des noms n\'est pas toujours logique : "le soleil" (masculin), "la lune" (féminin — the moon). Il faut apprendre le genre avec chaque mot nouveau.' }),

  makeMCQ({ id:'g4fr-nom-014', chapterId:'g4fr-noms', difficulty:2,
    question:'Comment dit-on "a school" en français ? ("école" est féminin et commence par une voyelle)',
    options:['un école','le école','une école','l\'école'],
    answer:'une école',
    hint:'Article indéfini féminin = "une". L\'article INDÉFINI ne change pas devant une voyelle.',
    explanation:'"<b>Une école</b>" = a school. L\'article indéfini ne change pas devant une voyelle : une école ✓. C\'est l\'article DÉFINI qui change : "la école" → "<b>l\'école</b>". Règle : un/une restent toujours un/une (jamais un\' ou une\'). Défini: l\'école. Indéfini: une école.' }),

  makeMCQ({ id:'g4fr-nom-015', chapterId:'g4fr-noms', difficulty:2,
    question:'Que signifie "au" dans "Je vais au marché" ? ("marché" est masculin)',
    options:['au = à + la (féminin)','au = à + le (masculin)','au = à + les (pluriel)','au = à + l\' (voyelle)'],
    answer:'au = à + le (masculin)',
    hint:'"Marché" est masculin. La contraction obligatoire : à + le = ?',
    explanation:'"<b>Au</b>" = <b>à + le</b> (contraction obligatoire). On ne dit jamais "à le marché" ✗ — on dit "au marché" ✓. Contractions : à + le = <b>au</b>, à + les = <b>aux</b>. "À la" et "à l\'" ne se contractent pas. Exemples : au cinéma, aux enfants.' }),

  makeMCQ({ id:'g4fr-nom-016', chapterId:'g4fr-noms', difficulty:2,
    question:'Quelle est la forme plurielle de "l\'oiseau" (the bird) ?',
    options:['les oiseaus','les oiseau','les oiseaux','les oyseaux'],
    answer:'les oiseaux',
    hint:'"Oiseau" se termine en -eau. Rappelle la règle pour les noms en -eau.',
    explanation:'"<b>Les oiseaux</b>" — comme "bateau → bateaux", les noms en -eau ajoutent -x au pluriel : oiseau → oiseaux. L\'article passe de "l\'" (devant voyelle sg.) à "les" (pluriel). Le -x final ne se prononce généralement pas.' }),

  makeTF({ id:'g4fr-nom-017', chapterId:'g4fr-noms', difficulty:2,
    question:'Les noms propres (comme "Priya" ou "Maurice") prennent toujours une majuscule en français.',
    answer:true,
    hint:'Qu\'est-ce qu\'un nom propre ? Pense aux prénoms et aux noms de villes.',
    explanation:'<b>Vrai.</b> En français, les <b>noms propres</b> (prénoms, noms de famille, noms de villes et de pays) prennent toujours une majuscule : Priya, Ravi, Maurice, Port-Louis. Les noms communs (chat, livre, école) ne prennent pas de majuscule (sauf en début de phrase).' }),

  makeMCQ({ id:'g4fr-nom-018', chapterId:'g4fr-noms', difficulty:3,
    question:'Choisis la phrase où TOUS les articles sont correctement utilisés.',
    options:[
      'Le filles jouent avec les ballon rouge.',
      'Les filles jouent avec le ballon rouge.',
      'La filles jouent avec les ballons rouge.',
      'Les fille jouent avec un ballons rouge.'
    ],
    answer:'Les filles jouent avec le ballon rouge.',
    hint:'Vérifie : "filles" = féminin pluriel, "ballon" = masculin singulier.',
    explanation:'"<b>Les filles jouent avec le ballon rouge.</b>" — "filles" f.pl. → les filles ✓. "ballon" m.sg. → le ballon ✓. "rouge" avec ballon (m.sg.) → rouge ✓ (invariable). Les erreurs des autres options : mauvais genre, mauvais nombre ou accord incorrect.' }),

  makeMCQ({ id:'g4fr-nom-019', chapterId:'g4fr-noms', difficulty:4,
    question:'Luc écrit : "Je vais ___ cinéma avec ___ amis. Après, nous mangeons ___ gâteau." Complète avec les bons articles dans l\'ordre.',
    options:[
      'au / les / un',
      'à le / des / un',
      'au / des / un',
      'au / des / de la'
    ],
    answer:'au / des / un',
    hint:'"Cinéma" m. (à + le = ?), "amis" pluriel indéfini (= ?), "gâteau" m.sg. indéfini (= ?)',
    explanation:'"Je vais <b>au</b> cinéma" (à + le = au, masculin singulier). "avec <b>des</b> amis" (des = article indéfini pluriel = some). "nous mangeons <b>un</b> gâteau" (un = article indéfini masculin singulier). Trois articles différents, trois règles différentes !' })

);
