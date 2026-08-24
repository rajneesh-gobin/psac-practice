'use strict';
// Grade 4 French - Chapitre : Les Adjectifs
// IDs format: g4fr-adj-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4fr-adj-001', chapterId:'g4fr-adjectifs', difficulty:1,
    question:'Comment dit-on "big/large" en français pour un nom masculin singulier ?',
    options:['grande','grands','grand','grandes'],
    answer:'grand',
    hint:'"Grand" est la forme de base (masculin singulier). Les adjectifs s\'accordent avec le nom.',
    explanation:'"<b>Grand</b>" est la forme masculine singulière. Les 4 formes de "grand" : grand (m.sg.), grand<b>e</b> (f.sg.), grand<b>s</b> (m.pl.), grand<b>es</b> (f.pl.). Exemples : un grand arbre (m.), une grande maison (f.), de grands garçons (m.pl.).' }),

  makeMCQ({ id:'g4fr-adj-002', chapterId:'g4fr-adjectifs', difficulty:1,
    question:'Quelle est la forme FÉMININE de l\'adjectif "petit" ?',
    options:['petits','petit','petite','petites'],
    answer:'petite',
    hint:'La plupart des adjectifs forment leur féminin en ajoutant -e.',
    explanation:'"<b>Petite</b>" est la forme féminine de "petit". Règle générale : adjectif masculin + <b>-e</b> = féminin. Exemples : petit → petite, grand → grande, vert → verte, noir → noire. Si l\'adjectif masculin se termine déjà en -e, il ne change pas : rouge (m. et f.), jaune, orange.' }),

  makeTF({ id:'g4fr-adj-003', chapterId:'g4fr-adjectifs', difficulty:1,
    question:'"Une robe rouge" place l\'adjectif correctement en français.',
    answer:true,
    hint:'En général, les adjectifs de couleur se placent après le nom en français.',
    explanation:'<b>Vrai.</b> En français, les adjectifs de couleur se placent <b>après le nom</b> : une robe <b>rouge</b>, un livre <b>vert</b>, une voiture <b>bleue</b>. C\'est l\'inverse de l\'anglais (a red dress). Exception : certains adjectifs courants comme "grand, petit, bon, mauvais" se placent avant le nom.' }),

  makeMCQ({ id:'g4fr-adj-004', chapterId:'g4fr-adjectifs', difficulty:2,
    question:'"Un grand garçon" - comment dit-on la même chose au FÉMININ ?',
    options:['Une grand fille','Une grande fille','Une grandes fille','Un grande fille'],
    answer:'Une grande fille',
    hint:'L\'article change (un → une) et l\'adjectif s\'accorde au féminin (grand → grande).',
    explanation:'"<b>Une grande fille</b>" - deux changements : (1) l\'article "un" → "<b>une</b>" (féminin), (2) l\'adjectif "grand" → "<b>grande</b>" (féminin, ajoute -e). Les adjectifs s\'accordent en genre ET en nombre avec le nom qu\'ils décrivent.' }),

  makeMCQ({ id:'g4fr-adj-005', chapterId:'g4fr-adjectifs', difficulty:2,
    question:'Choisis la forme correcte : "Les ___ filles jouent." (petit)',
    options:['petit','petite','petites','petits'],
    answer:'petites',
    hint:'"Filles" est féminin ET pluriel. L\'adjectif doit s\'accorder en genre et en nombre.',
    explanation:'"Les <b>petites</b> filles" - "filles" est féminin pluriel, donc l\'adjectif prend la forme féminine plurielle : petit → petit<b>e</b> (f.) → petit<b>es</b> (f.pl.). Les 4 formes : petit / petite / petits / petites.' }),

  makeMCQ({ id:'g4fr-adj-006', chapterId:'g4fr-adjectifs', difficulty:2,
    question:'Que signifie "Le livre vert" en anglais ?',
    options:['The green book','The book is large','A green book','The big book'],
    answer:'The green book',
    hint:'"Vert" est un adjectif de couleur. Quelle couleur est "vert" ?',
    explanation:'"<b>Le livre vert</b>" = The green book. "Vert" = green (m.sg.). Formes : vert (m.sg.), verte (f.sg.), verts (m.pl.), vertes (f.pl.). Exemple : un stylo vert, une feuille verte, des arbres verts, des plantes vertes.' }),

  makeMCQ({ id:'g4fr-adj-007', chapterId:'g4fr-adjectifs', difficulty:2,
    question:'Complète : "J\'ai une voiture ___." (bleu - accorde avec "voiture", féminin)',
    options:['bleu','bleus','bleue','bleues'],
    answer:'bleue',
    hint:'"Voiture" est féminin singulier. L\'adjectif doit être au féminin singulier.',
    explanation:'"Une voiture <b>bleue</b>" - "voiture" est féminin singulier, donc "bleu" → "<b>bleue</b>" (ajoute -e pour le féminin). Formes de "bleu" : bleu (m.sg.), blue (f.sg.), bleus (m.pl.), bleues (f.pl.).' }),

  makeMCQ({ id:'g4fr-adj-008', chapterId:'g4fr-adjectifs', difficulty:2,
    question:'Quelle phrase utilise l\'adjectif CORRECTEMENT ?',
    options:[
      'Un rouge ballon.',
      'Un ballon rouge.',
      'Un ballon rouges.',
      'Une ballon rouge.'
    ],
    answer:'Un ballon rouge.',
    hint:'Les adjectifs de couleur viennent après le nom. "Ballon" est masculin.',
    explanation:'"<b>Un ballon rouge.</b>" est correct. Règle : couleur <b>après</b> le nom. "Ballon" est masculin singulier → "rouge" ne change pas (rouge se termine déjà en -e pour les deux genres). "Un rouge ballon" ✗ (ordre incorrect). "Un ballon rouges" ✗ (pas d\'accord de nombre).' }),

  makeMCQ({ id:'g4fr-adj-009', chapterId:'g4fr-adjectifs', difficulty:3,
    question:'Comment dit-on "a beautiful white cat" en français ? ("chat" = m., "beau" = m., "blanc/blanche" = couleur)',
    options:[
      'Un blanc beau chat.',
      'Un beau chat blanc.',
      'Un belle chat blanche.',
      'Un beau chats blanc.'
    ],
    answer:'Un beau chat blanc.',
    hint:'"Beau" est un des adjectifs qui va AVANT le nom. La couleur va APRÈS le nom.',
    explanation:'"<b>Un beau chat blanc.</b>" - "beau" (beauty adjective, BAGS rule) se place <b>avant</b> le nom : un beau chat. "Blanc" (couleur) se place <b>après</b> le nom : chat blanc. L\'ordre est donc : article + beau + nom + blanc. "Chat" est masculin → beau ✓, blanc ✓.' }),

  makeMCQ({ id:'g4fr-adj-010', chapterId:'g4fr-adjectifs', difficulty:4,
    question:'Layla décrit sa chambre : "J\'ai ___ (petit-f.sg.) chambre avec ___ (grand-f.sg.) fenêtre. Les murs sont ___." (blanc-m.pl.) Quelle série d\'adjectifs accordés est correcte ?',
    options:[
      'petite / grande / blancs',
      'petites / grande / blanc',
      'petite / grands / blancs',
      'petit / grande / blancs'
    ],
    answer:'petite / grande / blancs',
    hint:'Chambre (f.sg.), fenêtre (f.sg.), murs (m.pl.) - accordez chaque adjectif.',
    explanation:'"<b>Petite</b>" (chambre = f.sg. → petit+e). "<b>Grande</b>" (fenêtre = f.sg. → grand+e). "<b>Blancs</b>" (murs = m.pl. → blanc+s). Les adjectifs doivent s\'accorder en genre et en nombre avec chaque nom séparément. C\'est la règle d\'accord des adjectifs.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4fr-adj-011', chapterId:'g4fr-adjectifs', difficulty:1,
    question:'Quelle est la forme FÉMININE de l\'adjectif "bon" (good) ?',
    options:['bons','bone','bon','bonne'],
    answer:'bonne',
    hint:'"Bon" est un adjectif irrégulier au féminin - il double le "n".',
    explanation:'"<b>Bonne</b>" est la forme féminine de "bon" - on double le "n" et on ajoute -e. Formes : bon (m.sg.), bonne (f.sg.), bons (m.pl.), bonnes (f.pl.). Exemples : un bon repas (m.), une bonne réponse (f.).' }),

  makeMCQ({ id:'g4fr-adj-012', chapterId:'g4fr-adjectifs', difficulty:1,
    question:'Quel adjectif possessif utilise-t-on devant "livre" (book, masculin) pour dire "my book" ?',
    options:['ma','mes','mon','sa'],
    answer:'mon',
    hint:'"Livre" est masculin singulier. Adjectif possessif masculin singulier = ?',
    explanation:'"<b>Mon livre</b>" = my book. Adjectifs possessifs (my) : <b>mon</b> (m.sg.), <b>ma</b> (f.sg.), <b>mes</b> (pl.). Exemples : mon père (my father), ma mère (my mother), mes amis (my friends).' }),

  makeMCQ({ id:'g4fr-adj-013', chapterId:'g4fr-adjectifs', difficulty:1,
    question:'Accorde l\'adjectif "joli" (pretty) avec "fleur" (féminin singulier) : une ___ fleur.',
    options:['joli','jolie','jolis','jolies'],
    answer:'jolie',
    hint:'"Fleur" est féminin singulier. Féminin = base + -e.',
    explanation:'"Une <b>jolie</b> fleur" - "joli" va avant le nom (BAGS). Féminin : joli → jolie (+e). Formes : joli (m.sg.), jolie (f.sg.), jolis (m.pl.), jolies (f.pl.). Exemples : un joli garçon, une jolie fille.' }),

  makeMCQ({ id:'g4fr-adj-014', chapterId:'g4fr-adjectifs', difficulty:2,
    question:'Comment dit-on "my school" en français ? ("école" est féminin mais commence par une voyelle)',
    options:['ma école','mon école','mes école','l\'école'],
    answer:'mon école',
    hint:'Devant un nom féminin qui commence par une voyelle, on utilise "mon" pour éviter deux voyelles consécutives.',
    explanation:'"<b>Mon école</b>" - règle spéciale : devant un nom féminin commençant par une voyelle, on utilise "<b>mon</b>" (pas "ma") : "ma école" ✗ → "mon école" ✓. De même : mon amie (f.), mon erreur (f.). C\'est l\'euphonie.' }),

  makeMCQ({ id:'g4fr-adj-015', chapterId:'g4fr-adjectifs', difficulty:2,
    question:'Quelle est la forme FÉMININE SINGULIÈRE de "nouveau" (new) ?',
    options:['nouveaus','nouvel','nouvelles','nouvelle'],
    answer:'nouvelle',
    hint:'"Nouveau" est irrégulier au féminin - il double le "l" et ajoute -e.',
    explanation:'"<b>Nouvelle</b>" - "nouveau" est irrégulier : nouveau (m.sg.), <b>nouvelle</b> (f.sg.), nouveaux (m.pl.), nouvelles (f.pl.). Devant m.sg. + voyelle : "<b>nouvel</b>" : un nouvel ami. Exemples : un nouveau livre (m.), une nouvelle maison (f.).' }),

  makeTF({ id:'g4fr-adj-016', chapterId:'g4fr-adjectifs', difficulty:2,
    question:'"Mes" est l\'adjectif possessif pluriel qui signifie "my" pour plusieurs choses.',
    answer:true,
    hint:'"Mon livre" (sg.) → "___ livres" (pl.) = ?',
    explanation:'<b>Vrai.</b> "<b>Mes</b>" est l\'adjectif possessif pluriel pour "my" - il s\'utilise avec les noms masculins ET féminins au pluriel. Exemples : mes livres (my books), mes amies (my female friends), mes parents (my parents). Résumé : mon (m.sg.), ma (f.sg.), mes (pl.).' }),

  makeMCQ({ id:'g4fr-adj-017', chapterId:'g4fr-adjectifs', difficulty:2,
    question:'Comment dit-on "beautiful boys" en français ? ("beau" au pluriel masculin = "beaux")',
    options:['de beau garçons','des beaux garçons','de beaux garçons','des beau garçons'],
    answer:'de beaux garçons',
    hint:'Pluriel de "beau" = "beaux". Quand l\'adjectif précède le nom au pluriel, "des" → "de".',
    explanation:'"<b>De beaux garçons</b>" - deux règles : (1) Pluriel de "beau" = "<b>beaux</b>". (2) Quand l\'adjectif PRÉCÈDE le nom au pluriel, "des" → "<b>de</b>" : des garçons mais <b>de</b> beaux garçons. C\'est une règle avancée !' }),

  makeMCQ({ id:'g4fr-adj-018', chapterId:'g4fr-adjectifs', difficulty:3,
    question:'Réécris au FÉMININ SINGULIER : "Le petit garçon a un nouveau livre blanc."',
    options:[
      'La petite fille a une nouvelle livre blanche.',
      'La petite fille a un nouvelle livre blanche.',
      'La petite fille a une nouvelle livre blanc.',
      'La petite filles a une nouvelle livre blanche.'
    ],
    answer:'La petite fille a une nouvelle livre blanche.',
    hint:'Change : le → la, garçon → fille, petit → petite, un → une, nouveau → nouvelle, blanc → blanche.',
    explanation:'"<b>La petite fille a une nouvelle livre blanche.</b>" - Changements : le → la, garçon → fille, petit → petite (+e), un → une, nouveau → nouvelle (irrégulier), blanc → blanche (irrégulier, +che). Chaque mot s\'accorde avec le genre féminin.' }),

  makeMCQ({ id:'g4fr-adj-019', chapterId:'g4fr-adjectifs', difficulty:4,
    question:'Layla décrit sa maison : "J\'ai ___ chambre bleue. Dans ma chambre, il y a ___ lit confortable et ___ jolis rideaux blancs." Quelle série est correcte ?',
    options:[
      'mon / un / de',
      'ma / un / de',
      'ma / une / des',
      'ma / un / des'
    ],
    answer:'ma / un / de',
    hint:'"Chambre" = f.sg. (possessif?), "lit" = m.sg. indéfini (article?), "rideaux" = m.pl. avec adjectif avant le nom ("jolis rideaux" → des → ?).',
    explanation:'"<b>Ma</b> chambre" (f.sg. → ma). "<b>Un</b> lit confortable" (m.sg. indéfini → un). "<b>De</b> jolis rideaux blancs" (pluriel avec adjectif avant le nom → des → de). Trois règles en une phrase : adjectif possessif, article indéfini, et la règle "de" devant adjectif + nom pluriel.' }),

  makeMCQ({ id:'g4fr-adj-020', chapterId:'g4fr-adjectifs', difficulty:1,
    question:'Quel adjectif démonstratif s\'utilise avec "livre" (masculin singulier commençant par consonne) ?',
    options:['cette','cet','ces','ce'],
    answer:'ce',
    hint:'"Livre" = masculin singulier, commence par consonne.',
    explanation:'"<b>Ce</b> livre" - Les adjectifs démonstratifs : <b>ce</b> (m.sg. consonne), <b>cet</b> (m.sg. voyelle/h muet), <b>cette</b> (f.sg.), <b>ces</b> (pluriel). "Livre" est masculin et commence par "l" (consonne) → <b>ce</b>.' }),

  makeMCQ({ id:'g4fr-adj-021', chapterId:'g4fr-adjectifs', difficulty:1,
    question:'Comment dit-on "Mauritian" (nationality adjective, feminine) ?',
    options:['mauricien','mauriciens','mauricienne','mauriciennes'],
    answer:'mauricienne',
    hint:'Féminin des adjectifs en -ien : ajoute -ne.',
    explanation:'<b>mauricienne</b> - Les adjectifs de nationalité en -<b>ien</b> font leur féminin en -<b>ienne</b> : mauricien → <b>mauricienne</b>, indien → indienne, australien → australienne. À ne pas confondre avec "mauriciennes" (féminin pluriel).' }),

  makeTF({ id:'g4fr-adj-022', chapterId:'g4fr-adjectifs', difficulty:1,
    question:'"Cet" s\'utilise devant un nom masculin singulier commençant par une voyelle.',
    answer:true,
    hint:'Cet arbre, cet hôtel, cet ami.',
    explanation:'<b>Vrai.</b> <b>cet</b> = adjectif démonstratif masculin singulier devant <b>voyelle ou h muet</b>. Exemples : <b>cet</b> arbre, <b>cet</b> enfant, <b>cet</b> hôtel, <b>cet</b> homme. Si le nom commence par une consonne → ce : ce livre, ce garçon.' }),

  makeMCQ({ id:'g4fr-adj-023', chapterId:'g4fr-adjectifs', difficulty:1,
    question:'Comment dit-on "French" (nationality adjective, masculine) ?',
    options:['française','français','françaises','franças'],
    answer:'français',
    hint:'"Français" masculin = sans -e final.',
    explanation:'"<b>français</b>" (masculin) / "<b>française</b>" (féminin). Les adjectifs en -<b>ais</b> : masculin = français, féminin = française (+e). Autres nationalités : anglais/anglaise, chinois/chinoise, portugais/portugaise.' }),

  makeMCQ({ id:'g4fr-adj-024', chapterId:'g4fr-adjectifs', difficulty:2,
    question:'Quel adjectif démonstratif complète : "___ enfants jouent dehors."',
    options:['ce','cet','cette','ces'],
    answer:'ces',
    hint:'"Enfants" = pluriel.',
    explanation:'"<b>Ces</b> enfants jouent dehors." - <b>ces</b> s\'utilise pour <b>tous les pluriels</b> (masculin et féminin). Exemples : <b>ces</b> livres, <b>ces</b> fleurs, <b>ces</b> enfants. Le pluriel ne distingue pas le genre.' }),

  makeMCQ({ id:'g4fr-adj-025', chapterId:'g4fr-adjectifs', difficulty:2,
    question:'Laquelle de ces phrases suit la règle BAGS (adjectif AVANT le nom) ?',
    options:[
      'une maison grande',
      'un beau jardin',
      'un enfant intelligent',
      'une fleur rouge'
    ],
    answer:'un beau jardin',
    hint:'BAGS = Beauty, Age, Goodness, Size - ces adjectifs vont AVANT le nom.',
    explanation:'"Un <b>beau</b> jardin" - <b>beau</b> (beautiful) appartient à la catégorie BAGS (Beauty) → il se place <b>avant</b> le nom. "Grand", "petit", "bon", "jeune", "nouveau", "vieux" aussi. Les autres adjectifs (intelligent, rouge) se placent <b>après</b> le nom.' }),

  makeMCQ({ id:'g4fr-adj-026', chapterId:'g4fr-adjectifs', difficulty:2,
    question:'Comment dit-on "an Indian student" (féminin) en français ?',
    options:['une étudiante indien','une étudiante indienne','une étudiant indienne','un étudiante indien'],
    answer:'une étudiante indienne',
    hint:'"Étudiant" f. = étudiante. "Indien" f. = indienne.',
    explanation:'"<b>une étudiante indienne</b>" - Deux accords : (1) "étudiante" (féminin de étudiant). (2) "indienne" (féminin de indien → -ien + -ne = -ienne). Les deux mots s\'accordent en genre avec le sujet féminin.' }),

  makeMCQ({ id:'g4fr-adj-027', chapterId:'g4fr-adjectifs', difficulty:2,
    question:'Quel adjectif démonstratif complète : "___ arbre est très grand."',
    options:['ce','cet','cette','ces'],
    answer:'cet',
    hint:'"Arbre" = masculin singulier commençant par "a" (voyelle).',
    explanation:'"<b>Cet</b> arbre est très grand." - "arbre" est masculin singulier et commence par "a" (voyelle) → on utilise <b>cet</b> (pas "ce") pour éviter deux voyelles consécutives (ce + a = difficile à prononcer). Mémo : cet ami, cet enfant, cet homme, cet arbre.' }),

  makeMCQ({ id:'g4fr-adj-028', chapterId:'g4fr-adjectifs', difficulty:3,
    question:'Quelle phrase utilise correctement les adjectifs de nationalité ?',
    options:[
      'Elle est mauricien et elle parle français.',
      'Elle est mauricienne et elle parle français.',
      'Elle est mauricienne et elle parle française.',
      'Elle est mauriciens et elle parle français.'
    ],
    answer:'Elle est mauricienne et elle parle français.',
    hint:'"Elle" = féminin. La nationalité s\'accorde. La langue en français = invariable ici.',
    explanation:'"Elle est <b>mauricienne</b>" - sujet féminin → adjectif féminin (mauricienne). "elle parle <b>français</b>" - après "parler une langue", la langue est invariable (pas de -e féminin) : parler français, anglais, chinois. Deux règles différentes en une phrase !' }),

  makeMCQ({ id:'g4fr-adj-029', chapterId:'g4fr-adjectifs', difficulty:3,
    question:'Identifie l\'adjectif qui va APRÈS le nom (pas dans BAGS) :',
    options:['vieux','nouveau','rouge','bon'],
    answer:'rouge',
    hint:'BAGS = Beauty, Age, Goodness, Size. "Rouge" n\'est dans aucune de ces catégories.',
    explanation:'"<b>Rouge</b>" va après le nom : "un chapeau rouge", "une fleur rouge". Les adjectifs BAGS (vieux, nouveau, bon, grand, petit, beau, jeune, long...) vont avant le nom. "Rouge" décrit une couleur, qui ne fait pas partie de BAGS → après le nom.' }),

  makeMCQ({ id:'g4fr-adj-030', chapterId:'g4fr-adjectifs', difficulty:3,
    question:'Complète : "___ histoire est très intéressante. J\'aime ___ genre de livre."',
    options:['Cette / ce','Cet / ces','Ces / ce','Cette / cet'],
    answer:'Cette / ce',
    hint:'"Histoire" = f.sg. → ? "Genre" = m.sg. (consonne) → ?',
    explanation:'"<b>Cette</b> histoire" (histoire = féminin singulier → cette). "ce <b>genre</b> de livre" (genre = masculin singulier, commence par g = consonne → ce). Rappel : ce (m.sg. consonne), cet (m.sg. voyelle), cette (f.sg.), ces (pluriel).' }),

  makeMCQ({ id:'g4fr-adj-031', chapterId:'g4fr-adjectifs', difficulty:3,
    question:'Quelle phrase utilise correctement un adjectif BAGS devant le nom ?',
    options:[
      'C\'est un enfant intelligent petit.',
      'C\'est un petit enfant intelligent.',
      'C\'est un enfant petit intelligent.',
      'C\'est intelligent petit enfant.'
    ],
    answer:"C'est un petit enfant intelligent.",
    hint:'"Petit" = BAGS (Size) → avant. "Intelligent" = hors BAGS → après.',
    explanation:'"C\'est un <b>petit</b> enfant <b>intelligent</b>." - <b>petit</b> (Size = BAGS) se place <b>avant</b> le nom. <b>intelligent</b> (qualité non-BAGS) se place <b>après</b> le nom. Quand il y a deux adjectifs : BAGS + nom + non-BAGS.' }),

  makeMCQ({ id:'g4fr-adj-032', chapterId:'g4fr-adjectifs', difficulty:4,
    question:'Priya décrit sa classe : "Dans ma classe, il y a ___ (this) professeur chinoise et ___ (some) élèves mauriciens et ___ (some) élèves français." Bonne série ?',
    options:[
      'cette / des / des',
      'cet / les / les',
      'cette / ces / ces',
      'ce / des / des'
    ],
    answer:'cette / des / des',
    hint:'"Professeur" f. sg → ? "Élèves" pluriel indéfini → ?',
    explanation:'"<b>cette</b> professeur" (féminin singulier → cette). "<b>des</b> élèves mauriciens" (pluriel indéfini → des). "<b>des</b> élèves français" (pluriel indéfini → des). Démonstratif pour "cette" puis article indéfini pluriel pour les deux groupes.' }),

  makeMCQ({ id:'g4fr-adj-033', chapterId:'g4fr-adjectifs', difficulty:4,
    question:'Décris ta famille : "Mon grand-père est ___ (Chinese). Ma grand-mère est ___. Mon père est ___ (Mauritian, masc.). Ma mère est ___." Bonne série ?',
    options:[
      'chinois / chinoise / mauricien / mauricienne',
      'chinoise / chinois / mauricienne / mauricien',
      'chinois / chinois / mauricien / mauricien',
      'chinoise / chinoise / mauricienne / mauricienne'
    ],
    answer:'chinois / chinoise / mauricien / mauricienne',
    hint:'Grand-père = m., grand-mère = f., père = m., mère = f. Accorde chaque adjectif.',
    explanation:'Grand-père (m.) → <b>chinois</b>, grand-mère (f.) → <b>chinoise</b> (+e). Père (m.) → <b>mauricien</b>, mère (f.) → <b>mauricienne</b> (+ne). Chaque adjectif de nationalité s\'accorde avec le genre du nom de la personne.' }),

  makeMCQ({ id:'g4fr-adj-034', chapterId:'g4fr-adjectifs', difficulty:4,
    question:'Complète la description : "___ (this) nouvelle école a ___ (old, m.) bâtiments et un ___ (new, m.) jardin. ___ (these) professeurs sont excellents !"',
    options:[
      'Cette / vieux / nouveau / Ces',
      'Cet / vieux / nouveau / Ces',
      'Cette / vieil / nouvelles / Ces',
      'Ce / vieux / nouvelle / Cette'
    ],
    answer:'Cette / vieux / nouveau / Ces',
    hint:'"École" f. → cette. "Bâtiments" m.pl. → vieux (BAGS). "Jardin" m.sg. → nouveau (BAGS). "Professeurs" pl. → ces.',
    explanation:'"<b>Cette</b> nouvelle école" (f.sg. → cette). "<b>vieux</b> bâtiments" (BAGS, m.pl. → vieux, invariable en genre). "un <b>nouveau</b> jardin" (BAGS, m.sg. → nouveau). "<b>Ces</b> professeurs" (pluriel → ces). Quatre règles en une phrase !' }),

  makeMCQ({ id:'g4fr-adj-035', chapterId:'g4fr-adjectifs', difficulty:4,
    question:'Shanvi écrit une carte postale : "___ (this, f.) île est magnifique ! Les plages sont belles et les gens sont très accueillants. Mon ___ (French, m.) ami dit que c\'est ___ (better, m.) que les ___ (French, f.pl.) plages !" Bonne série ?',
    options:[
      'Cette / français / meilleur / françaises',
      'Cet / français / meilleur / françaises',
      'Cette / françaises / meilleur / français',
      'Ces / français / meilleurs / françaises'
    ],
    answer:'Cette / français / meilleur / françaises',
    hint:'"Île" = f.sg. "ami" = m.sg. "que" modifie m.sg. "plages" = f.pl.',
    explanation:'"<b>Cette</b> île" (f.sg. → cette). "Mon ami <b>français</b>" (m.sg. → français). "c\'est <b>meilleur</b>" (better, m.sg. → meilleur). "les plages <b>françaises</b>" (f.pl. → françaises). Quatre accords d\'adjectifs de nationalité et démonstratif !' })

);
