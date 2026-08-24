'use strict';
// Grade 4 French — Chapitre : Les Adjectifs
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
    question:'"Un grand garçon" — comment dit-on la même chose au FÉMININ ?',
    options:['Une grand fille','Une grande fille','Une grandes fille','Un grande fille'],
    answer:'Une grande fille',
    hint:'L\'article change (un → une) et l\'adjectif s\'accorde au féminin (grand → grande).',
    explanation:'"<b>Une grande fille</b>" — deux changements : (1) l\'article "un" → "<b>une</b>" (féminin), (2) l\'adjectif "grand" → "<b>grande</b>" (féminin, ajoute -e). Les adjectifs s\'accordent en genre ET en nombre avec le nom qu\'ils décrivent.' }),

  makeMCQ({ id:'g4fr-adj-005', chapterId:'g4fr-adjectifs', difficulty:2,
    question:'Choisis la forme correcte : "Les ___ filles jouent." (petit)',
    options:['petit','petite','petites','petits'],
    answer:'petites',
    hint:'"Filles" est féminin ET pluriel. L\'adjectif doit s\'accorder en genre et en nombre.',
    explanation:'"Les <b>petites</b> filles" — "filles" est féminin pluriel, donc l\'adjectif prend la forme féminine plurielle : petit → petit<b>e</b> (f.) → petit<b>es</b> (f.pl.). Les 4 formes : petit / petite / petits / petites.' }),

  makeMCQ({ id:'g4fr-adj-006', chapterId:'g4fr-adjectifs', difficulty:2,
    question:'Que signifie "Le livre vert" en anglais ?',
    options:['The green book','The book is large','A green book','The big book'],
    answer:'The green book',
    hint:'"Vert" est un adjectif de couleur. Quelle couleur est "vert" ?',
    explanation:'"<b>Le livre vert</b>" = The green book. "Vert" = green (m.sg.). Formes : vert (m.sg.), verte (f.sg.), verts (m.pl.), vertes (f.pl.). Exemple : un stylo vert, une feuille verte, des arbres verts, des plantes vertes.' }),

  makeMCQ({ id:'g4fr-adj-007', chapterId:'g4fr-adjectifs', difficulty:2,
    question:'Complète : "J\'ai une voiture ___." (bleu — accorde avec "voiture", féminin)',
    options:['bleu','bleus','bleue','bleues'],
    answer:'bleue',
    hint:'"Voiture" est féminin singulier. L\'adjectif doit être au féminin singulier.',
    explanation:'"Une voiture <b>bleue</b>" — "voiture" est féminin singulier, donc "bleu" → "<b>bleue</b>" (ajoute -e pour le féminin). Formes de "bleu" : bleu (m.sg.), blue (f.sg.), bleus (m.pl.), bleues (f.pl.).' }),

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
    explanation:'"<b>Un beau chat blanc.</b>" — "beau" (beauty adjective, BAGS rule) se place <b>avant</b> le nom : un beau chat. "Blanc" (couleur) se place <b>après</b> le nom : chat blanc. L\'ordre est donc : article + beau + nom + blanc. "Chat" est masculin → beau ✓, blanc ✓.' }),

  makeMCQ({ id:'g4fr-adj-010', chapterId:'g4fr-adjectifs', difficulty:4,
    question:'Layla décrit sa chambre : "J\'ai ___ (petit-f.sg.) chambre avec ___ (grand-f.sg.) fenêtre. Les murs sont ___." (blanc-m.pl.) Quelle série d\'adjectifs accordés est correcte ?',
    options:[
      'petite / grande / blancs',
      'petites / grande / blanc',
      'petite / grands / blancs',
      'petit / grande / blancs'
    ],
    answer:'petite / grande / blancs',
    hint:'Chambre (f.sg.), fenêtre (f.sg.), murs (m.pl.) — accordez chaque adjectif.',
    explanation:'"<b>Petite</b>" (chambre = f.sg. → petit+e). "<b>Grande</b>" (fenêtre = f.sg. → grand+e). "<b>Blancs</b>" (murs = m.pl. → blanc+s). Les adjectifs doivent s\'accorder en genre et en nombre avec chaque nom séparément. C\'est la règle d\'accord des adjectifs.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4fr-adj-011', chapterId:'g4fr-adjectifs', difficulty:1,
    question:'Quelle est la forme FÉMININE de l\'adjectif "bon" (good) ?',
    options:['bons','bone','bon','bonne'],
    answer:'bonne',
    hint:'"Bon" est un adjectif irrégulier au féminin — il double le "n".',
    explanation:'"<b>Bonne</b>" est la forme féminine de "bon" — on double le "n" et on ajoute -e. Formes : bon (m.sg.), bonne (f.sg.), bons (m.pl.), bonnes (f.pl.). Exemples : un bon repas (m.), une bonne réponse (f.).' }),

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
    explanation:'"Une <b>jolie</b> fleur" — "joli" va avant le nom (BAGS). Féminin : joli → jolie (+e). Formes : joli (m.sg.), jolie (f.sg.), jolis (m.pl.), jolies (f.pl.). Exemples : un joli garçon, une jolie fille.' }),

  makeMCQ({ id:'g4fr-adj-014', chapterId:'g4fr-adjectifs', difficulty:2,
    question:'Comment dit-on "my school" en français ? ("école" est féminin mais commence par une voyelle)',
    options:['ma école','mon école','mes école','l\'école'],
    answer:'mon école',
    hint:'Devant un nom féminin qui commence par une voyelle, on utilise "mon" pour éviter deux voyelles consécutives.',
    explanation:'"<b>Mon école</b>" — règle spéciale : devant un nom féminin commençant par une voyelle, on utilise "<b>mon</b>" (pas "ma") : "ma école" ✗ → "mon école" ✓. De même : mon amie (f.), mon erreur (f.). C\'est l\'euphonie.' }),

  makeMCQ({ id:'g4fr-adj-015', chapterId:'g4fr-adjectifs', difficulty:2,
    question:'Quelle est la forme FÉMININE SINGULIÈRE de "nouveau" (new) ?',
    options:['nouveaus','nouvel','nouvelles','nouvelle'],
    answer:'nouvelle',
    hint:'"Nouveau" est irrégulier au féminin — il double le "l" et ajoute -e.',
    explanation:'"<b>Nouvelle</b>" — "nouveau" est irrégulier : nouveau (m.sg.), <b>nouvelle</b> (f.sg.), nouveaux (m.pl.), nouvelles (f.pl.). Devant m.sg. + voyelle : "<b>nouvel</b>" : un nouvel ami. Exemples : un nouveau livre (m.), une nouvelle maison (f.).' }),

  makeTF({ id:'g4fr-adj-016', chapterId:'g4fr-adjectifs', difficulty:2,
    question:'"Mes" est l\'adjectif possessif pluriel qui signifie "my" pour plusieurs choses.',
    answer:true,
    hint:'"Mon livre" (sg.) → "___ livres" (pl.) = ?',
    explanation:'<b>Vrai.</b> "<b>Mes</b>" est l\'adjectif possessif pluriel pour "my" — il s\'utilise avec les noms masculins ET féminins au pluriel. Exemples : mes livres (my books), mes amies (my female friends), mes parents (my parents). Résumé : mon (m.sg.), ma (f.sg.), mes (pl.).' }),

  makeMCQ({ id:'g4fr-adj-017', chapterId:'g4fr-adjectifs', difficulty:2,
    question:'Comment dit-on "beautiful boys" en français ? ("beau" au pluriel masculin = "beaux")',
    options:['de beau garçons','des beaux garçons','de beaux garçons','des beau garçons'],
    answer:'de beaux garçons',
    hint:'Pluriel de "beau" = "beaux". Quand l\'adjectif précède le nom au pluriel, "des" → "de".',
    explanation:'"<b>De beaux garçons</b>" — deux règles : (1) Pluriel de "beau" = "<b>beaux</b>". (2) Quand l\'adjectif PRÉCÈDE le nom au pluriel, "des" → "<b>de</b>" : des garçons mais <b>de</b> beaux garçons. C\'est une règle avancée !' }),

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
    explanation:'"<b>La petite fille a une nouvelle livre blanche.</b>" — Changements : le → la, garçon → fille, petit → petite (+e), un → une, nouveau → nouvelle (irrégulier), blanc → blanche (irrégulier, +che). Chaque mot s\'accorde avec le genre féminin.' }),

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
    explanation:'"<b>Ma</b> chambre" (f.sg. → ma). "<b>Un</b> lit confortable" (m.sg. indéfini → un). "<b>De</b> jolis rideaux blancs" (pluriel avec adjectif avant le nom → des → de). Trois règles en une phrase : adjectif possessif, article indéfini, et la règle "de" devant adjectif + nom pluriel.' })

);
