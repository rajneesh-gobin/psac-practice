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
