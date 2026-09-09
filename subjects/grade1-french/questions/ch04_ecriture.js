'use strict';
// Grade 1 French — Expression écrite (Écriture)
// IDs: g1fr-ecr-001 … g1fr-ecr-075

(function () {

STATIC_QUESTIONS.push(

  // ── lettres_minuscules ───────────────────────────────────────────────────

  makeMCQ({ id:'g1fr-ecr-001', chapterId:'g1fr-ecriture', difficulty:1, subsection:'lettres_minuscules',
    question:'Laquelle de ces lettres est une <b>minuscule</b> ?',
    options:['a','A','B','C'],
    answer:'a',
    hint:'Les minuscules sont les petites lettres. (Lowercase letters are the small ones.)',
    explanation:'<b>a</b> est une lettre <b>minuscule</b> (petite). Les grandes lettres comme A, B, C sont des <b>majuscules</b>. Bravo !' }),

  makeMCQ({ id:'g1fr-ecr-002', chapterId:'g1fr-ecriture', difficulty:1, subsection:'lettres_minuscules',
    question:'Laquelle de ces lettres est une <b>majuscule</b> ?',
    options:['M','m','n','p'],
    answer:'M',
    hint:'Les majuscules sont les grandes lettres. (Uppercase letters are the big ones.)',
    explanation:'<b>M</b> est une lettre <b>majuscule</b> (grande). La minuscule correspondante est <b>m</b>. Super !' }),

  makeMCQ({ id:'g1fr-ecr-003', chapterId:'g1fr-ecriture', difficulty:1, subsection:'lettres_minuscules',
    question:'Quelle est la <b>majuscule</b> de la lettre <b>"a"</b> ?',
    options:['A','B','E','O'],
    answer:'A',
    hint:'Chaque lettre minuscule a une majuscule correspondante. (Each lowercase letter has a matching uppercase.)',
    explanation:'La majuscule de <b>a</b> est <b>A</b>. On utilise les majuscules au début d\'une phrase et pour les noms propres. Excellent !' }),

  makeMCQ({ id:'g1fr-ecr-004', chapterId:'g1fr-ecriture', difficulty:1, subsection:'lettres_minuscules',
    question:'Quelle est la <b>minuscule</b> de la lettre <b>"S"</b> ?',
    options:['s','c','o','z'],
    answer:'s',
    hint:'La minuscule est la petite version de la même lettre. (The lowercase is the small version of the same letter.)',
    explanation:'La minuscule de <b>S</b> est <b>s</b>. Exemple : <i>S comme Soleil → s comme soleil</i>. Très bien !' }),

  makeMCQ({ id:'g1fr-ecr-005', chapterId:'g1fr-ecriture', difficulty:1, subsection:'lettres_minuscules',
    question:'Dans l\'alphabet, quelle lettre vient juste <b>avant</b> la lettre <b>"E"</b> ?',
    options:['D','F','C','G'],
    answer:'D',
    hint:'A, B, C, D, E — quelle lettre est avant E ? (A, B, C, D, E — which letter is before E?)',
    explanation:'Dans l\'alphabet, <b>D</b> vient avant E : A, B, C, <b>D</b>, E, F, G... Bravo !' }),

  makeMCQ({ id:'g1fr-ecr-006', chapterId:'g1fr-ecriture', difficulty:1, subsection:'lettres_minuscules',
    question:'Dans l\'alphabet, quelle lettre vient juste <b>après</b> la lettre <b>"H"</b> ?',
    options:['I','G','J','K'],
    answer:'I',
    hint:'G, H, I, J — quelle lettre vient après H ? (G, H, I, J — which letter comes after H?)',
    explanation:'Dans l\'alphabet, <b>I</b> vient après H : ...G, H, <b>I</b>, J, K... Super !' }),

  makeMCQ({ id:'g1fr-ecr-007', chapterId:'g1fr-ecriture', difficulty:1, subsection:'lettres_minuscules',
    question:'On utilise une <b>majuscule</b> ...',
    options:['au début d\'une phrase','au milieu d\'un mot','à la fin d\'un mot','pour tous les mots'],
    answer:'au début d\'une phrase',
    hint:'La première lettre d\'une phrase est toujours grande. (The first letter of a sentence is always big.)',
    explanation:'On utilise une <b>majuscule au début d\'une phrase</b>. Par exemple : "<b>L</b>e chat est mignon." On l\'utilise aussi pour les noms propres comme <i>Maurice, Sophie</i>. Excellent !' }),

  makeMCQ({ id:'g1fr-ecr-008', chapterId:'g1fr-ecriture', difficulty:1, subsection:'lettres_minuscules',
    question:'Laquelle de ces lettres n\'est <b>pas</b> une voyelle ?',
    options:['b','a','e','i'],
    answer:'b',
    hint:'Les voyelles sont : a, e, i, o, u. (Vowels are: a, e, i, o, u.)',
    explanation:'<b>B</b> est une consonne, pas une voyelle. Les voyelles sont : a, e, i, o, u. Très bien !' }),

  makeMCQ({ id:'g1fr-ecr-009', chapterId:'g1fr-ecriture', difficulty:1, subsection:'lettres_minuscules',
    question:'Combien de voyelles y a-t-il en français ?',
    options:['5','3','7','10'],
    answer:'5',
    hint:'Les voyelles sont : a, e, i, o, u — compte-les ! (Vowels are a, e, i, o, u — count them!)',
    explanation:'Il y a <b>5 voyelles</b> en français : <b>a, e, i, o, u</b>. (Plus le y qui peut être une semi-voyelle, mais les 5 principales sont a, e, i, o, u.) Bravo !' }),

  makeMCQ({ id:'g1fr-ecr-010', chapterId:'g1fr-ecriture', difficulty:1, subsection:'lettres_minuscules',
    question:'Quelle est la bonne façon de tenir un crayon ?',
    options:[
      'Entre le pouce et l\'index, reposé sur le majeur.',
      'Avec toute la main fermée.',
      'Avec seulement le petit doigt.',
      'Dans la paume de la main.',
    ],
    answer:'Entre le pouce et l\'index, reposé sur le majeur.',
    hint:'On tient le crayon légèrement — pas trop serré ! (Hold the pencil lightly — not too tight!)',
    explanation:'On tient le crayon <b>entre le pouce et l\'index, reposé sur le majeur</b>. Il ne faut pas serrer trop fort pour ne pas se fatiguer ! Super !' }),

  makeMCQ({ id:'g1fr-ecr-011', chapterId:'g1fr-ecriture', difficulty:1, subsection:'lettres_minuscules',
    question:'Quelle est la <b>minuscule</b> de la lettre <b>"L"</b> ?',
    options:['l','i','t','j'],
    answer:'l',
    hint:'C\'est une longue ligne droite vers le bas. (It is a long straight line downwards.)',
    explanation:'La minuscule de <b>L</b> est <b>l</b>. Attention — elle ressemble à <i>i</i> et <i>t</i>, mais elle est plus longue. Excellent !' }),

  makeMCQ({ id:'g1fr-ecr-012', chapterId:'g1fr-ecriture', difficulty:1, subsection:'lettres_minuscules',
    question:'Laquelle de ces lettres est la minuscule de <b>"P"</b> ?',
    options:['p','q','d','b'],
    answer:'p',
    hint:'La lettre p a un "ventre" vers le bas. (The letter p has a belly going down.)',
    explanation:'La minuscule de <b>P</b> est <b>p</b>. Attention aux lettres similaires : p, q, b, d — regarde bien dans quelle direction va le "ventre" ! Très bien !' }),

  makeMCQ({ id:'g1fr-ecr-013', chapterId:'g1fr-ecriture', difficulty:1, subsection:'lettres_minuscules',
    question:'Dans l\'alphabet, quelle lettre est la <b>première</b> ?',
    options:['A','B','Z','M'],
    answer:'A',
    hint:'La chanson de l\'alphabet commence par... (The alphabet song starts with...)',
    explanation:'La première lettre de l\'alphabet est <b>A</b>. L\'alphabet va de A à Z : A, B, C, D, E, F, G... Z ! Bravo !' }),

  // ── copie_mots ───────────────────────────────────────────────────────────

  makeMCQ({ id:'g1fr-ecr-014', chapterId:'g1fr-ecriture', difficulty:1, subsection:'copie_mots',
    question:'Quelle est l\'orthographe correcte du mot qui veut dire <b>"cat"</b> ?',
    options:['chat','shat','chatt','cha'],
    answer:'chat',
    hint:'Ce mot a 4 lettres : ch-a-t. (This word has 4 letters: ch-a-t.)',
    explanation:'<b>Chat</b> est l\'orthographe correcte. C\'est le mot français pour "cat". c-h-a-t — quatre lettres ! Super !' }),

  makeMCQ({ id:'g1fr-ecr-015', chapterId:'g1fr-ecriture', difficulty:1, subsection:'copie_mots',
    question:'Quelle est l\'orthographe correcte du mot qui veut dire <b>"house"</b> ?',
    options:['maison','mezon','maizon','maisson'],
    answer:'maison',
    hint:'Ce mot commence par "mai" et finit par "son". (This word starts with "mai" and ends with "son".)',
    explanation:'<b>Maison</b> est l\'orthographe correcte — m-a-i-s-o-n. C\'est le mot français pour "house". Excellent !' }),

  makeMCQ({ id:'g1fr-ecr-016', chapterId:'g1fr-ecriture', difficulty:1, subsection:'copie_mots',
    question:'Quelle est l\'orthographe correcte du mot qui veut dire <b>"sun"</b> ?',
    options:['soleil','solleil','solei','solel'],
    answer:'soleil',
    hint:'Ce mot commence par "sole" et finit par "il". (This word starts with "sole" and ends with "il".)',
    explanation:'<b>Soleil</b> est l\'orthographe correcte — s-o-l-e-i-l. Le soleil brille dans le ciel ! Très bien !' }),

  makeMCQ({ id:'g1fr-ecr-017', chapterId:'g1fr-ecriture', difficulty:1, subsection:'copie_mots',
    question:'Quelle est l\'orthographe correcte du mot qui veut dire <b>"book"</b> ?',
    options:['livre','livr','livrre','livvr'],
    answer:'livre',
    hint:'Ce mot a 5 lettres : l-i-v-r-e. (This word has 5 letters: l-i-v-r-e.)',
    explanation:'<b>Livre</b> est l\'orthographe correcte — l-i-v-r-e. On lit un livre pour apprendre et pour s\'amuser ! Bravo !' }),

  makeMCQ({ id:'g1fr-ecr-018', chapterId:'g1fr-ecriture', difficulty:1, subsection:'copie_mots',
    question:'Quelle est l\'orthographe correcte du mot qui veut dire <b>"balloon"</b> ?',
    options:['ballon','balon','balllon','ballonn'],
    answer:'ballon',
    hint:'Ce mot a deux "l" au milieu. (This word has two "l" in the middle.)',
    explanation:'<b>Ballon</b> est l\'orthographe correcte — b-a-l-l-o-n. Attention : deux "l" ! Super !' }),

  makeMCQ({ id:'g1fr-ecr-019', chapterId:'g1fr-ecriture', difficulty:1, subsection:'copie_mots',
    question:'Quelle est l\'orthographe correcte du mot qui veut dire <b>"flower"</b> ?',
    options:['fleur','fleur','flour','fleur'],
    answer:'fleur',
    hint:'Ce mot commence par "fl" et finit par "eur". (This word starts with "fl" and ends with "eur".)',
    explanation:'<b>Fleur</b> est l\'orthographe correcte — f-l-e-u-r. Les fleurs sont belles et sentent bon ! Excellent !' }),

  makeMCQ({ id:'g1fr-ecr-020', chapterId:'g1fr-ecriture', difficulty:1, subsection:'copie_mots',
    question:'Quelle est l\'orthographe correcte du mot qui veut dire <b>"school"</b> ?',
    options:['école','ecole','esole','ekol'],
    answer:'école',
    hint:'Ce mot commence par un é avec un accent. (This word starts with é with an accent.)',
    explanation:'<b>École</b> est l\'orthographe correcte — é-c-o-l-e. Attention à l\'accent sur le é ! Très bien !' }),

  makeMCQ({ id:'g1fr-ecr-021', chapterId:'g1fr-ecriture', difficulty:1, subsection:'copie_mots',
    question:'Quelle est l\'orthographe correcte du mot qui veut dire <b>"apple"</b> ?',
    options:['pomme','pome','pomm','pome'],
    answer:'pomme',
    hint:'Ce mot a deux "m" au milieu. (This word has two "m" in the middle.)',
    explanation:'<b>Pomme</b> est l\'orthographe correcte — p-o-m-m-e. Attention : deux "m" ! Une pomme par jour éloigne le médecin ! Bravo !' }),

  makeMCQ({ id:'g1fr-ecr-022', chapterId:'g1fr-ecriture', difficulty:1, subsection:'copie_mots',
    question:'Quelle est l\'orthographe correcte du mot qui veut dire <b>"rabbit"</b> ?',
    options:['lapin','lappin','lapen','lapain'],
    answer:'lapin',
    hint:'Ce mot se termine par "in". (This word ends with "in".)',
    explanation:'<b>Lapin</b> est l\'orthographe correcte — l-a-p-i-n. Le lapin est un animal doux avec de grandes oreilles ! Super !' }),

  makeMCQ({ id:'g1fr-ecr-023', chapterId:'g1fr-ecriture', difficulty:1, subsection:'copie_mots',
    question:'Quelle est l\'orthographe correcte du mot qui veut dire <b>"water"</b> ?',
    options:['eau','eo','eeau','ao'],
    answer:'eau',
    hint:'Ce mot très court a seulement 3 lettres. (This very short word has only 3 letters.)',
    explanation:'<b>Eau</b> est l\'orthographe correcte — e-a-u. C\'est un mot court mais très important ! Bois de l\'eau tous les jours ! Excellent !' }),

  // ── phrases_simples ──────────────────────────────────────────────────────

  makeMCQ({ id:'g1fr-ecr-024', chapterId:'g1fr-ecriture', difficulty:1, subsection:'phrases_simples',
    question:'Laquelle de ces suites de mots est une <b>phrase complète</b> ?',
    options:[
      'Le chat mange.',
      'mange chat le',
      'Le mange.',
      'chat mange le grand',
    ],
    answer:'Le chat mange.',
    hint:'Une phrase a un sujet (qui ?) et un verbe (fait quoi ?), et commence par une majuscule. (A sentence has a subject and a verb, and starts with a capital letter.)',
    explanation:'"<b>Le chat mange.</b>" est une phrase complète — sujet : <i>Le chat</i>, verbe : <i>mange</i>, et elle se termine par un point. Bravo !' }),

  makeMCQ({ id:'g1fr-ecr-025', chapterId:'g1fr-ecriture', difficulty:1, subsection:'phrases_simples',
    question:'Une phrase en français doit commencer par ...',
    options:['une lettre majuscule','une lettre minuscule','un chiffre','un point'],
    answer:'une lettre majuscule',
    hint:'La première lettre d\'une phrase est toujours grande. (The first letter of a sentence is always big.)',
    explanation:'Une phrase commence toujours par <b>une lettre majuscule</b>. Par exemple : "<b>L</b>a fleur est belle." Super !' }),

  makeMCQ({ id:'g1fr-ecr-026', chapterId:'g1fr-ecriture', difficulty:1, subsection:'phrases_simples',
    question:'Une phrase en français doit se terminer par ...',
    options:['un point (.)','une virgule (,)','une lettre majuscule','un mot'],
    answer:'un point (.)',
    hint:'Le signe à la fin d\'une phrase est rond et petit. (The sign at the end of a sentence is round and small.)',
    explanation:'Une phrase se termine par <b>un point (.)</b>. On peut aussi finir par <b>?</b> (question) ou <b>!</b> (exclamation). Excellent !' }),

  makeMCQ({ id:'g1fr-ecr-027', chapterId:'g1fr-ecriture', difficulty:1, subsection:'phrases_simples',
    question:'Entre les mots dans une phrase, il faut mettre ...',
    options:['un espace','un point','une virgule','rien'],
    answer:'un espace',
    hint:'Sans espace, les mots se collent et on ne peut pas lire. (Without spaces, words stick together and we cannot read.)',
    explanation:'Il faut mettre <b>un espace</b> entre chaque mot. Par exemple : "<b>Le</b> <b>chien</b> <b>joue.</b>" — chaque mot est séparé. Très bien !' }),

  makeMCQ({ id:'g1fr-ecr-028', chapterId:'g1fr-ecriture', difficulty:1, subsection:'phrases_simples',
    question:'Laquelle de ces phrases est <b>correcte</b> ?',
    options:[
      'La fleur est belle.',
      'la fleur est belle.',
      'La fleur est belle',
      'la fleur est belle',
    ],
    answer:'La fleur est belle.',
    hint:'Vérifie la majuscule au début et le point à la fin. (Check the capital letter at the start and the full stop at the end.)',
    explanation:'"<b>La fleur est belle.</b>" est correcte — majuscule au début, point à la fin. Bravo !' }),

  makeMCQ({ id:'g1fr-ecr-029', chapterId:'g1fr-ecriture', difficulty:1, subsection:'phrases_simples',
    question:'Remets les mots dans le bon ordre : <b>joue / Le / ballon / enfant / avec le</b>',
    options:[
      'L\'enfant joue avec le ballon.',
      'Joue l\'enfant ballon le avec.',
      'Le ballon joue l\'enfant avec.',
      'Avec le ballon joue l\'enfant.',
    ],
    answer:'L\'enfant joue avec le ballon.',
    hint:'Le sujet (qui ?) est en premier, puis le verbe (fait quoi ?). (Subject first, then the verb.)',
    explanation:'"<b>L\'enfant joue avec le ballon.</b>" est la bonne phrase. Sujet : <i>L\'enfant</i>, verbe : <i>joue</i>. Super !' }),

  makeMCQ({ id:'g1fr-ecr-030', chapterId:'g1fr-ecriture', difficulty:1, subsection:'phrases_simples',
    question:'Laquelle de ces phrases parle d\'un animal ?',
    options:['Le chat dort.','La maison est grande.','Le soleil brille.','L\'eau est froide.'],
    answer:'Le chat dort.',
    hint:'Un animal est un être vivant. (An animal is a living being.)',
    explanation:'"<b>Le chat dort.</b>" parle d\'un animal — le chat. Les autres phrases parlent d\'une maison, du soleil et de l\'eau. Excellent !' }),

  makeMCQ({ id:'g1fr-ecr-031', chapterId:'g1fr-ecriture', difficulty:1, subsection:'phrases_simples',
    question:'Quelle phrase dit que quelque chose est <b>grand</b> ?',
    options:['L\'éléphant est grand.','Le chat est petit.','La fleur est rouge.','L\'eau est froide.'],
    answer:'L\'éléphant est grand.',
    hint:'Cherche la phrase qui utilise le mot "grand". (Find the sentence that uses the word "grand".)',
    explanation:'"<b>L\'éléphant est grand.</b>" dit que l\'éléphant est grand. C\'est vrai — les éléphants sont les plus grands animaux terrestres ! Très bien !' }),

  makeMCQ({ id:'g1fr-ecr-032', chapterId:'g1fr-ecriture', difficulty:1, subsection:'phrases_simples',
    question:'Laquelle est une phrase sur la <b>famille</b> ?',
    options:['Maman fait la cuisine.','Le chat joue.','L\'école est grande.','La fleur est belle.'],
    answer:'Maman fait la cuisine.',
    hint:'La famille, c\'est maman, papa, frère, sœur... (Family includes mum, dad, brother, sister...)',
    explanation:'"<b>Maman fait la cuisine.</b>" parle de maman, qui fait partie de la famille. Bravo !' })

);

})();
