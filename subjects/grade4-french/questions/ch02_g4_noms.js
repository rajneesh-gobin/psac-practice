'use strict';
// Grade 4 French - Chapitre : Les Noms & Articles
// IDs format: g4fr-nom-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4fr-nom-001', chapterId:'g4fr-noms', difficulty:1,
    question:'L\'article "le" s\'utilise avec les noms... ?',
    options:['féminins singuliers','masculins singuliers','féminins pluriels','masculins pluriels'],
    answer:'masculins singuliers',
    hint:'Articles définis : le (m. sg.), la (f. sg.), les (pluriel).',
    explanation:'"<b>Le</b>" est l\'article défini masculin singulier. Exemples : le chat (the cat), le livre (the book). "<b>La</b>" est l\'article défini féminin singulier : la maison (the house). "<b>Les</b>" est l\'article pluriel (m. et f.) : les chats, les maisons.' }),

  makeMCQ({ id:'g4fr-nom-002', chapterId:'g4fr-noms', difficulty:1,
    question:'"Une maison" - le mot "maison" est... ?',
    options:['masculin','féminin','pluriel','invariable'],
    answer:'féminin',
    hint:'"Une" est l\'article indéfini féminin. L\'article indique le genre du nom.',
    explanation:'"<b>Maison</b>" est un nom <b>féminin</b> - c\'est pourquoi on utilise "une" (féminin) et non "un" (masculin). En français, chaque nom a un genre. Il faut apprendre le genre avec le mot. Exemples féminins : la maison, la fleur, la fille. Exemples masculins : le chat, le garçon, le livre.' }),

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
    explanation:'"<b>L\'ami</b>" - devant un nom commençant par une voyelle (a, e, i, o, u) ou un h muet, on utilise <b>l\'</b> au lieu de "le" ou "la". Exemples : l\'ami (m.), l\'école (f.), l\'hôpital (m.), l\'orange (f.). C\'est l\'élision.' }),

  makeMCQ({ id:'g4fr-nom-006', chapterId:'g4fr-noms', difficulty:2,
    question:'Quelle est la forme plurielle de "le chat" ?',
    options:['la chats','le chats','les chat','les chats'],
    answer:'les chats',
    hint:'Au pluriel, l\'article défini est toujours "les". N\'oublie pas le -s au nom.',
    explanation:'"<b>Les chats</b>" - au pluriel, l\'article défini est toujours "<b>les</b>" (pour les noms masculins et féminins). On ajoute aussi un <b>-s</b> au nom. Le -s ne se prononce généralement pas en français.' }),

  makeMCQ({ id:'g4fr-nom-007', chapterId:'g4fr-noms', difficulty:2,
    question:'Quel article indéfini utilise-t-on avec "stylo" (pen, masculin) ?',
    options:['une','un','des','la'],
    answer:'un',
    hint:'"Un" pour les noms masculins, "une" pour les noms féminins.',
    explanation:'"<b>Un stylo</b>" - "stylo" est masculin, donc on utilise l\'article indéfini masculin "<b>un</b>". Articles indéfinis : un (m. sg.), une (f. sg.), des (pluriel). Exemples : un garçon, une fille, des livres.' }),

  makeMCQ({ id:'g4fr-nom-008', chapterId:'g4fr-noms', difficulty:2,
    question:'"Des" est l\'article indéfini utilisé pour... ?',
    options:['Les noms masculins singuliers','Les noms féminins singuliers','Les noms pluriels (m. et f.)','Les noms commençant par une voyelle'],
    answer:'Les noms pluriels (m. et f.)',
    hint:'"Des" est la forme plurielle de "un" et "une".',
    explanation:'"<b>Des</b>" est l\'article indéfini pluriel - il s\'utilise avec les noms masculins ET féminins au pluriel. Exemples : des chats (m.pl.), des maisons (f.pl.), des amis (m.pl.). En anglais, "des" correspond à "some" ou peut ne pas être traduit : des enfants = children / some children.' }),

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
    hint:'Premier blanc : on ne connaît pas ce chat spécifique → article indéfini. Deuxième blanc : "le jardin" (masculin, défini - le jardin de Luc).',
    explanation:'"Je vois <b>un</b> chat noir dans <b>le</b> jardin." Premier blanc : "<b>un</b>" (article indéfini masculin) - c\'est un chat inconnu, pas un chat spécifique. Deuxième blanc : "<b>le</b>" jardin (article défini masculin) - il s\'agit d\'un jardin précis (celui de Luc). Règle : article indéfini = chose non identifiée; article défini = chose identifiée/spécifique.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4fr-nom-011', chapterId:'g4fr-noms', difficulty:1,
    question:'Quelle est la forme plurielle de "le bateau" ?',
    options:['les bateaus','les bateau','les bateaux','les bateux'],
    answer:'les bateaux',
    hint:'Les noms qui se terminent en -eau forment leur pluriel en -eaux.',
    explanation:'"<b>Les bateaux</b>" - les noms en <b>-eau</b> prennent <b>-x</b> au pluriel (pas -s) : bateau → bateaux, gâteau → gâteaux, chapeau → chapeaux. C\'est une règle importante à retenir !' }),

  makeMCQ({ id:'g4fr-nom-012', chapterId:'g4fr-noms', difficulty:1,
    question:'Que signifie "du" dans "Je mange du pain" ?',
    options:['some - article partitif masculin','the - article défini masculin','a - article indéfini masculin','many - beaucoup de'],
    answer:'some - article partitif masculin',
    hint:'"Du" = de + le. On l\'utilise pour une quantité indéfinie.',
    explanation:'"<b>Du</b>" est l\'article partitif masculin (de + le). Il exprime une quantité indéfinie : "Je mange du pain" = I eat some bread. Articles partitifs : du (m.), de la (f.), de l\' (voyelle), des (pluriel).' }),

  makeTF({ id:'g4fr-nom-013', chapterId:'g4fr-noms', difficulty:1,
    question:'"Le soleil" est un nom masculin.',
    answer:true,
    hint:'L\'article "le" indique le genre. "Le" = masculin.',
    explanation:'<b>Vrai.</b> "Soleil" (sun) est masculin - on dit "<b>le soleil</b>". En français, le genre des noms n\'est pas toujours logique : "le soleil" (masculin), "la lune" (féminin - the moon). Il faut apprendre le genre avec chaque mot nouveau.' }),

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
    explanation:'"<b>Au</b>" = <b>à + le</b> (contraction obligatoire). On ne dit jamais "à le marché" ✗ - on dit "au marché" ✓. Contractions : à + le = <b>au</b>, à + les = <b>aux</b>. "À la" et "à l\'" ne se contractent pas. Exemples : au cinéma, aux enfants.' }),

  makeMCQ({ id:'g4fr-nom-016', chapterId:'g4fr-noms', difficulty:2,
    question:'Quelle est la forme plurielle de "l\'oiseau" (the bird) ?',
    options:['les oiseaus','les oiseau','les oiseaux','les oyseaux'],
    answer:'les oiseaux',
    hint:'"Oiseau" se termine en -eau. Rappelle la règle pour les noms en -eau.',
    explanation:'"<b>Les oiseaux</b>" - comme "bateau → bateaux", les noms en -eau ajoutent -x au pluriel : oiseau → oiseaux. L\'article passe de "l\'" (devant voyelle sg.) à "les" (pluriel). Le -x final ne se prononce généralement pas.' }),

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
    explanation:'"<b>Les filles jouent avec le ballon rouge.</b>" - "filles" f.pl. → les filles ✓. "ballon" m.sg. → le ballon ✓. "rouge" avec ballon (m.sg.) → rouge ✓ (invariable). Les erreurs des autres options : mauvais genre, mauvais nombre ou accord incorrect.' }),

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
    explanation:'"Je vais <b>au</b> cinéma" (à + le = au, masculin singulier). "avec <b>des</b> amis" (des = article indéfini pluriel = some). "nous mangeons <b>un</b> gâteau" (un = article indéfini masculin singulier). Trois articles différents, trois règles différentes !' }),

  makeMCQ({ id:'g4fr-nom-020', chapterId:'g4fr-noms', difficulty:1,
    question:'Quel article partitif complète : "Je mange ___ pain" ?',
    options:['le','un','du','de la'],
    answer:'du',
    hint:'"Pain" est masculin singulier. L\'article partitif masculin = ?',
    explanation:'"Je mange <b>du</b> pain." - <b>du</b> = de + le (article partitif masculin singulier). On utilise l\'article partitif pour une quantité non comptée : du pain (some bread), de la soupe, de l\'eau. Pas "le pain" (le = the, pas some).' }),

  makeMCQ({ id:'g4fr-nom-021', chapterId:'g4fr-noms', difficulty:1,
    question:'Quel article partitif complète : "Je bois ___ eau" ?',
    options:['du','de la','de l\'','des'],
    answer:"de l'",
    hint:'"Eau" commence par une voyelle.',
    explanation:'"Je bois <b>de l\'</b>eau." - Devant un mot commençant par une voyelle ou un h muet, on utilise <b>de l\'</b> (partitif). Exemples : de l\'eau (water), de l\'orange (orange juice), de l\'huile (oil). La règle s\'applique aux deux genres.' }),

  makeTF({ id:'g4fr-nom-022', chapterId:'g4fr-noms', difficulty:1,
    question:'"Au" est la contraction de "à + le".',
    answer:true,
    hint:'"À + le" → on ne peut pas dire "à le", on dit "au".',
    explanation:'<b>Vrai.</b> <b>au</b> = à + le. On ne peut pas dire "à le cinéma" → on dit "au cinéma". De même : <b>aux</b> = à + les (je parle aux élèves). Mais "à la" et "à l\'" ne se contractent pas : à la maison, à l\'école.' }),

  makeMCQ({ id:'g4fr-nom-023', chapterId:'g4fr-noms', difficulty:1,
    question:'Le pluriel irrégulier de "œil" est...',
    options:['œils','œiles','yeux','œil'],
    answer:'yeux',
    hint:'Ce mot pluriel est complètement différent du singulier.',
    explanation:'<b>œil → yeux</b> - c\'est un pluriel très irrégulier ! C\'est l\'un des rares mots français qui change complètement au pluriel. Exemples d\'usage : "J\'ai deux <b>yeux</b>." "Ses <b>yeux</b> sont bleus."' }),

  makeMCQ({ id:'g4fr-nom-024', chapterId:'g4fr-noms', difficulty:2,
    question:'Quel article partitif complète : "Elle mange ___ salade" ?',
    options:['du','de l\'','de la','des'],
    answer:'de la',
    hint:'"Salade" est féminin singulier.',
    explanation:'"Elle mange <b>de la</b> salade." - <b>de la</b> = article partitif féminin singulier. Règle : <b>du</b> (m. sg. consonne), <b>de la</b> (f. sg. consonne), <b>de l\'</b> (voyelle), <b>des</b> (pluriel). Salade = féminin → de la.' }),

  makeMCQ({ id:'g4fr-nom-025', chapterId:'g4fr-noms', difficulty:2,
    question:'Quelle est la forme correcte pour "à + les parcs" ?',
    options:['à les parcs','aus parcs','aux parcs','au parcs'],
    answer:'aux parcs',
    hint:'à + les = ?',
    explanation:'"à + les" → <b>aux</b>. On ne dit jamais "à les" en français. Exemples : "Je vais <b>aux</b> parcs." "Il parle <b>aux</b> enfants." Mémo : au (m.sg.) / aux (pluriel) / à la (f.sg.) / à l\' (voyelle).' }),

  makeMCQ({ id:'g4fr-nom-026', chapterId:'g4fr-noms', difficulty:2,
    question:'Quel est le pluriel de "cheval" ?',
    options:['chevals','chevales','chevaux','les cheval'],
    answer:'chevaux',
    hint:'Les noms en -al font leur pluriel en -aux.',
    explanation:'"Cheval" → <b>chevaux</b>. Les noms en <b>-al</b> font généralement leur pluriel en <b>-aux</b> : cheval → chevaux, animal → animaux, journal → journaux, hôpital → hôpitaux.' }),

  makeMCQ({ id:'g4fr-nom-027', chapterId:'g4fr-noms', difficulty:2,
    question:'Complète : "Il va ___ école chaque matin."',
    options:['à le','au','à la','à l\''],
    answer:"à l'",
    hint:'"École" commence par une voyelle.',
    explanation:'"Il va <b>à l\'</b>école." - "école" est féminin et commence par une voyelle. On ne peut pas dire "à la école" → on élide : <b>à l\'</b>. Autres exemples : à l\'université, à l\'hôpital, à l\'église.' }),

  makeTF({ id:'g4fr-nom-028', chapterId:'g4fr-noms', difficulty:2,
    question:'"Du" peut remplacer "de + le" ET être un article partitif.',
    answer:true,
    hint:'"Du" a deux rôles : contraction et partitif.',
    explanation:'<b>Vrai.</b> "Du" a deux fonctions : (1) <b>Contraction</b> : "Je viens du marché" (de + le marché). (2) <b>Partitif</b> : "Je mange du riz" (some rice). Dans les deux cas, il s\'écrit "du" et précède un nom masculin singulier commençant par une consonne.' }),

  makeMCQ({ id:'g4fr-nom-029', chapterId:'g4fr-noms', difficulty:3,
    question:'Choisissez la phrase correcte :',
    options:[
      'Je bois de la eau.',
      "Je bois de l'eau.",
      'Je bois du eau.',
      'Je bois des eaux.'
    ],
    answer:"Je bois de l'eau.",
    hint:'"Eau" commence par une voyelle → article partitif = ?',
    explanation:'"Je bois <b>de l\'</b>eau." - devant une voyelle (ici "e" de "eau"), l\'article partitif devient <b>de l\'</b>. "De la eau" est impossible (élision obligatoire). "Du eau" aussi impossible (eau = féminin). "Des eaux" = pluriel (plusieurs types d\'eau) - rare dans ce contexte.' }),

  makeMCQ({ id:'g4fr-nom-030', chapterId:'g4fr-noms', difficulty:3,
    question:'Complète : "Nous parlons ___ professeurs de l\'école."',
    options:['à les','aux','au','de les'],
    answer:'aux',
    hint:'"Professeurs" est pluriel → à + les = ?',
    explanation:'"Nous parlons <b>aux</b> professeurs." - "à + les" = <b>aux</b> (contraction obligatoire au pluriel). "À les" n\'existe pas en français standard. Rappel : au (à + le), aux (à + les), à la, à l\'.' }),

  makeMCQ({ id:'g4fr-nom-031', chapterId:'g4fr-noms', difficulty:3,
    question:'Quel groupe utilise CORRECTEMENT les articles partitifs ?',
    options:[
      'Je mange de la viande et je bois du lait.',
      'Je mange la viande et je bois le lait.',
      'Je mange une viande et je bois un lait.',
      'Je mange des viande et je bois des lait.'
    ],
    answer:'Je mange de la viande et je bois du lait.',
    hint:'Pour une quantité non définie de nourriture/boisson → article partitif.',
    explanation:'"Je mange <b>de la</b> viande et je bois <b>du</b> lait." - viande = f.sg. → <b>de la</b>. Lait = m.sg. → <b>du</b>. Les articles partitifs expriment une quantité indéfinie (some). "La viande / le lait" = avec "the" (défini), moins naturel ici.' }),

  makeMCQ({ id:'g4fr-nom-032', chapterId:'g4fr-noms', difficulty:3,
    question:'Quel est le pluriel de "journal" ?',
    options:['journals','journaus','journaux','journales'],
    answer:'journaux',
    hint:'Comme "cheval → chevaux", les noms en -al → -aux.',
    explanation:'"Journal" → <b>journaux</b>. Règle : noms en <b>-al</b> → <b>-aux</b> au pluriel : journal → journaux, animal → animaux, cheval → chevaux, hôpital → hôpitaux. Exception notable : bal → bals, festival → festivals.' }),

  makeMCQ({ id:'g4fr-nom-033', chapterId:'g4fr-noms', difficulty:4,
    question:'Lina écrit : "Ce matin, je mange ___ céréales et je bois ___ jus d\'orange. Ma mère mange ___ yaourt." Bonne série d\'articles partitifs ?',
    options:[
      'des / du / un',
      'les / le / le',
      'des / du / du',
      'de la / de l\' / de la'
    ],
    answer:'des / du / un',
    hint:'"Céréales" pluriel, "jus" m.sg., "yaourt" m.sg. - partitif ou indéfini ?',
    explanation:'"je mange <b>des</b> céréales" (pluriel → des). "je bois <b>du</b> jus d\'orange" (m.sg. → du). "ma mère mange <b>un</b> yaourt" (un seul yaourt dénombrable → un, pas du). Différence : <b>du/de la/des</b> = quantité indéfinie ; <b>un/une</b> = un exemplaire.' }),

  makeMCQ({ id:'g4fr-nom-034', chapterId:'g4fr-noms', difficulty:4,
    question:'Complète : "Je vais ___ supermarché et j\'achète ___ légumes pour ___ soupe de ma grand-mère."',
    options:[
      'au / des / la',
      'à le / les / une',
      'au / les / une',
      'aux / des / la'
    ],
    answer:'au / des / la',
    hint:'"supermarché" m.sg. (à + le = ?), "légumes" pluriel indéfini, "soupe" = défini car "de ma grand-mère" le précise.',
    explanation:'"Je vais <b>au</b> supermarché" (à + le = au). "j\'achète <b>des</b> légumes" (pluriel indéfini = des). "pour <b>la</b> soupe de ma grand-mère" (défini - on sait de quelle soupe il s\'agit → la). Trois règles différentes en une phrase !' }),

  makeMCQ({ id:'g4fr-nom-035', chapterId:'g4fr-noms', difficulty:4,
    question:'Priya fait ses devoirs : "Les ___ (horse-PL) de la ferme mangent ___ herbe. Le ___ (eye) du cheval est très grand." Bonne série ?',
    options:[
      'chevals / de l\' / yeux',
      'chevaux / de l\' / œil',
      'chevaux / du / yeux',
      'chevals / de la / œil'
    ],
    answer:"chevaux / de l' / œil",
    hint:'"Horse" pluriel = ? (irrégulier). "Herbe" commence par une voyelle. "Eye" singulier = ?',
    explanation:'"Les <b>chevaux</b>" (cheval → chevaux, pluriel en -aux). "mangent <b>de l\'</b>herbe" (herbe = f., commence par h muet → de l\'). "Le <b>œil</b> du cheval" - singulier → œil (le pluriel serait yeux). Trois irrégularités en une phrase !' })

);
