'use strict';
// Grade 1 French — Compréhension écrite (Lecture)
// IDs: g1fr-lec-001 … g1fr-lec-075

(function () {

STATIC_QUESTIONS.push(

  // ── conscience_phonique ──────────────────────────────────────────────────

  makeMCQ({ id:'g1fr-lec-001', chapterId:'g1fr-lecture', difficulty:1, subsection:'conscience_phonique',
    question:'Combien de syllabes a le mot <b>"ma-man"</b> ?',
    options:['2','1','3','4'],
    answer:'2',
    hint:'Tape dans tes mains une fois par syllabe : ma — man. (Clap once per syllable.)',
    explanation:'"Ma-man" a <b>2 syllabes</b> : <b>ma</b> + <b>man</b>. Tape dans tes mains en disant le mot et tu entendras 2 claps ! Bravo !' }),

  makeMCQ({ id:'g1fr-lec-002', chapterId:'g1fr-lecture', difficulty:1, subsection:'conscience_phonique',
    question:'Combien de syllabes a le mot <b>"ba-na-ne"</b> ?',
    options:['3','2','1','4'],
    answer:'3',
    hint:'Tape dans tes mains : ba — na — ne. (Clap: ba — na — ne.)',
    explanation:'"Ba-na-ne" a <b>3 syllabes</b> : <b>ba</b> + <b>na</b> + <b>ne</b>. C\'est un fruit jaune délicieux ! Super !' }),

  makeMCQ({ id:'g1fr-lec-003', chapterId:'g1fr-lecture', difficulty:1, subsection:'conscience_phonique',
    question:'Combien de syllabes a le mot <b>"sol"</b> ?',
    options:['1','2','3','4'],
    answer:'1',
    hint:'C\'est un mot court avec une seule syllabe. (It is a short word with one syllable.)',
    explanation:'"Sol" a <b>1 syllabe</b>. Les mots courts comme <i>chat, rat, sol, eau</i> ont souvent une seule syllabe. Excellent !' }),

  makeMCQ({ id:'g1fr-lec-004', chapterId:'g1fr-lecture', difficulty:1, subsection:'conscience_phonique',
    question:'Combien de syllabes a le mot <b>"pa-pi-lon"</b> ?',
    options:['3','2','1','4'],
    answer:'3',
    hint:'Tape dans tes mains : pa — pi — lon. (Clap: pa — pi — lon.)',
    explanation:'"Pa-pi-lon" a <b>3 syllabes</b>. Un papillon est un bel insecte avec des ailes colorées ! Très bien !' }),

  makeMCQ({ id:'g1fr-lec-005', chapterId:'g1fr-lecture', difficulty:1, subsection:'conscience_phonique',
    question:'Combien de syllabes a le mot <b>"é-lé-phant"</b> ?',
    options:['3','2','4','1'],
    answer:'3',
    hint:'Tape dans tes mains : é — lé — phant. (Clap: é — lé — phant.)',
    explanation:'"É-lé-phant" a <b>3 syllabes</b>. C\'est un grand animal gris avec une trompe ! Bravo !' }),

  makeMCQ({ id:'g1fr-lec-006', chapterId:'g1fr-lecture', difficulty:1, subsection:'conscience_phonique',
    question:'Combien de syllabes a le mot <b>"chat"</b> ?',
    options:['1','2','3','4'],
    answer:'1',
    hint:'Chat est un mot très court. (Chat is a very short word.)',
    explanation:'"Chat" a <b>1 syllabe</b>. Les mots d\'une syllabe sont les plus courts ! Super !' }),

  makeMCQ({ id:'g1fr-lec-007', chapterId:'g1fr-lecture', difficulty:1, subsection:'conscience_phonique',
    question:'Combien de syllabes a le mot <b>"mai-son"</b> ?',
    options:['2','1','3','4'],
    answer:'2',
    hint:'Tape dans tes mains : mai — son. (Clap: mai — son.)',
    explanation:'"Mai-son" a <b>2 syllabes</b> : <b>mai</b> + <b>son</b>. On habite dans une maison ! Excellent !' }),

  makeMCQ({ id:'g1fr-lec-008', chapterId:'g1fr-lecture', difficulty:1, subsection:'conscience_phonique',
    question:'Combien de syllabes a le mot <b>"o-range"</b> ?',
    options:['2','1','3','4'],
    answer:'2',
    hint:'Tape dans tes mains : o — range. (Clap: o — range.)',
    explanation:'"O-range" a <b>2 syllabes</b> : <b>o</b> + <b>range</b>. L\'orange est un fruit et aussi une couleur ! Très bien !' }),

  makeMCQ({ id:'g1fr-lec-009', chapterId:'g1fr-lecture', difficulty:1, subsection:'conscience_phonique',
    question:'Lequel de ces mots a <b>2 syllabes</b> ?',
    options:['ballon','chat','pa-pi-lon','so-leil-il'],
    answer:'ballon',
    hint:'Bal-lon — deux syllabes ! (Bal-lon — two syllables!)',
    explanation:'<b>Bal-lon</b> a 2 syllabes : <b>bal</b> + <b>lon</b>. "Chat" = 1 syllabe, "papillon" = 3 syllabes. Bravo !' }),

  makeMCQ({ id:'g1fr-lec-010', chapterId:'g1fr-lecture', difficulty:1, subsection:'conscience_phonique',
    question:'Combien de syllabes a le mot <b>"é-co-le"</b> ?',
    options:['3','2','1','4'],
    answer:'3',
    hint:'Tape dans tes mains : é — co — le. (Clap: é — co — le.)',
    explanation:'"É-co-le" a <b>3 syllabes</b> : <b>é</b> + <b>co</b> + <b>le</b>. C\'est où tu vas apprendre chaque jour ! Super !' }),

  makeMCQ({ id:'g1fr-lec-011', chapterId:'g1fr-lecture', difficulty:1, subsection:'conscience_phonique',
    question:'Lequel de ces mots a <b>1 syllabe</b> ?',
    options:['eau','ba-na-ne','mai-son','pa-pa'],
    answer:'eau',
    hint:'Cherche le mot le plus court. (Find the shortest word.)',
    explanation:'<b>Eau</b> a <b>1 syllabe</b>. C\'est le mot le plus court ! "Eau" veut dire water en anglais. Excellent !' }),

  makeMCQ({ id:'g1fr-lec-012', chapterId:'g1fr-lecture', difficulty:1, subsection:'conscience_phonique',
    question:'Combien de syllabes a le mot <b>"ta-bleau"</b> ?',
    options:['2','1','3','4'],
    answer:'2',
    hint:'Ta-bleau — tape deux fois ! (Ta-bleau — clap twice.)',
    explanation:'"Ta-bleau" a <b>2 syllabes</b> : <b>ta</b> + <b>bleau</b>. Le tableau est dans ta classe ! Très bien !' }),

  makeMCQ({ id:'g1fr-lec-013', chapterId:'g1fr-lecture', difficulty:1, subsection:'conscience_phonique',
    question:'Dans le mot <b>"ballon"</b>, quelle syllabe est la première ?',
    options:['bal','lon','ball','an'],
    answer:'bal',
    hint:'La première syllabe est au début du mot. (The first syllable is at the beginning.)',
    explanation:'Dans "ballon", la première syllabe est <b>"bal"</b>. On divise : <b>bal</b> — lon. Bravo !' }),

  // ── lettres_sons ─────────────────────────────────────────────────────────

  makeMCQ({ id:'g1fr-lec-014', chapterId:'g1fr-lecture', difficulty:1, subsection:'lettres_sons',
    question:'La lettre <b>"S"</b> fait quel son dans "soleil" ?',
    options:['/s/ comme serpent','/b/ comme ballon','/m/ comme maison','/p/ comme pomme'],
    answer:'/s/ comme serpent',
    hint:'Le son /s/ est doux, comme le vent. (The /s/ sound is soft, like the wind.)',
    explanation:'La lettre <b>S</b> fait le son <b>/s/</b> dans "soleil" — comme dans <i>serpent, sel, sac</i>. Super !' }),

  makeMCQ({ id:'g1fr-lec-015', chapterId:'g1fr-lecture', difficulty:1, subsection:'lettres_sons',
    question:'La lettre <b>"M"</b> fait quel son dans "maman" ?',
    options:['/m/ comme mère','/s/ comme sel','/b/ comme bébé','/f/ comme feu'],
    answer:'/m/ comme mère',
    hint:'Le son /m/ est dans "maman", "mouton", "maison". (The /m/ sound is in "maman".)',
    explanation:'La lettre <b>M</b> fait le son <b>/m/</b> — comme dans <i>maman, mouton, mer, main</i>. Excellent !' }),

  makeMCQ({ id:'g1fr-lec-016', chapterId:'g1fr-lecture', difficulty:1, subsection:'lettres_sons',
    question:'La lettre <b>"P"</b> fait quel son dans "papa" ?',
    options:['/p/ comme pain','/b/ comme ballon','/d/ comme dent','/v/ comme vache'],
    answer:'/p/ comme pain',
    hint:'Quand tu dis /p/, tes lèvres se touchent puis s\'ouvrent. (When you say /p/, your lips touch then open.)',
    explanation:'La lettre <b>P</b> fait le son <b>/p/</b> — comme dans <i>pain, pomme, pied, papa</i>. Très bien !' }),

  makeMCQ({ id:'g1fr-lec-017', chapterId:'g1fr-lecture', difficulty:1, subsection:'lettres_sons',
    question:'La lettre <b>"L"</b> fait quel son dans "lapin" ?',
    options:['/l/ comme lune','/r/ comme rose','/n/ comme nuit','/m/ comme maison'],
    answer:'/l/ comme lune',
    hint:'La langue touche le haut de la bouche pour faire le son /l/. (The tongue touches the top of the mouth for /l/.)',
    explanation:'La lettre <b>L</b> fait le son <b>/l/</b> — comme dans <i>lapin, lait, lune, livre</i>. Bravo !' }),

  makeMCQ({ id:'g1fr-lec-018', chapterId:'g1fr-lecture', difficulty:1, subsection:'lettres_sons',
    question:'La lettre <b>"A"</b> est ...',
    options:['une voyelle','une consonne','un chiffre','un mot'],
    answer:'une voyelle',
    hint:'Les voyelles en français sont : a, e, i, o, u. (The vowels in French are: a, e, i, o, u.)',
    explanation:'La lettre <b>A</b> est <b>une voyelle</b>. Les 5 voyelles sont : <b>a, e, i, o, u</b>. Toutes les autres lettres sont des consonnes. Super !' }),

  makeMCQ({ id:'g1fr-lec-019', chapterId:'g1fr-lecture', difficulty:1, subsection:'lettres_sons',
    question:'Laquelle de ces lettres est une <b>voyelle</b> ?',
    options:['i','s','m','p'],
    answer:'i',
    hint:'Les voyelles sont : a, e, i, o, u. (Vowels are: a, e, i, o, u.)',
    explanation:'<b>I</b> est une voyelle. Les voyelles sont <b>a, e, i, o, u</b>. Les consonnes incluent s, m, p, b, l… Excellent !' }),

  makeMCQ({ id:'g1fr-lec-020', chapterId:'g1fr-lecture', difficulty:1, subsection:'lettres_sons',
    question:'La lettre <b>"B"</b> fait quel son dans "ballon" ?',
    options:['/b/ comme bébé','/p/ comme pain','/d/ comme dent','/v/ comme vent'],
    answer:'/b/ comme bébé',
    hint:'Le son /b/ est fort. (The /b/ sound is strong.)',
    explanation:'La lettre <b>B</b> fait le son <b>/b/</b> — comme dans <i>ballon, bébé, bateau, bras</i>. Très bien !' }),

  makeMCQ({ id:'g1fr-lec-021', chapterId:'g1fr-lecture', difficulty:1, subsection:'lettres_sons',
    question:'Quelle lettre correspond au son <b>/f/</b> comme dans "fille" ?',
    options:['F','S','M','L'],
    answer:'F',
    hint:'"Fille, fleur, feu" — elles commencent toutes par le même son. (Fille, fleur, feu all start with the same sound.)',
    explanation:'La lettre <b>F</b> correspond au son /f/ — comme dans <i>fille, fleur, feu, forêt</i>. Bravo !' }),

  makeMCQ({ id:'g1fr-lec-022', chapterId:'g1fr-lecture', difficulty:1, subsection:'lettres_sons',
    question:'Combien de lettres y a-t-il dans l\'alphabet français ?',
    options:['26','20','30','24'],
    answer:'26',
    hint:'C\'est le même nombre qu\'en anglais ! (It is the same number as in English!)',
    explanation:'L\'alphabet français a <b>26 lettres</b> — exactement comme en anglais. On les chante dans la même chanson : A B C D E F G... Super !' }),

  makeMCQ({ id:'g1fr-lec-023', chapterId:'g1fr-lecture', difficulty:1, subsection:'lettres_sons',
    question:'Quelle lettre vient après <b>"D"</b> dans l\'alphabet ?',
    options:['E','F','C','G'],
    answer:'E',
    hint:'A, B, C, D, ... ? (A, B, C, D, then what?)',
    explanation:'Après D vient <b>E</b> : A, B, C, <b>D, E</b>, F, G... Excellent !' }),

  makeMCQ({ id:'g1fr-lec-024', chapterId:'g1fr-lecture', difficulty:1, subsection:'lettres_sons',
    question:'Laquelle de ces lettres est une <b>consonne</b> ?',
    options:['b','a','e','o'],
    answer:'b',
    hint:'Les voyelles sont a, e, i, o, u. Tout le reste est une consonne. (Vowels are a, e, i, o, u. Everything else is a consonant.)',
    explanation:'<b>B</b> est une consonne. Les voyelles sont a, e, i, o, u — toutes les autres lettres sont des consonnes. Très bien !' }),

  makeMCQ({ id:'g1fr-lec-025', chapterId:'g1fr-lecture', difficulty:1, subsection:'lettres_sons',
    question:'La lettre <b>"R"</b> fait quel son dans "rose" ?',
    options:['/r/ comme rue','/l/ comme lune','/n/ comme nuit','/s/ comme sol'],
    answer:'/r/ comme rue',
    hint:'Le son /r/ vient du fond de la gorge en français. (The /r/ sound comes from the back of the throat in French.)',
    explanation:'La lettre <b>R</b> fait le son <b>/r/</b> — comme dans <i>rose, rue, rat, rivière</i>. Bravo !' }),

  // ── mots_simples ──────────────────────────────────────────────────────────

  makeMCQ({ id:'g1fr-lec-026', chapterId:'g1fr-lecture', difficulty:1, subsection:'mots_simples',
    question:'Quel mot veut dire une <b>couleur</b> ?',
    options:['rouge','maison','chat','sauter'],
    answer:'rouge',
    hint:'Une couleur décrit l\'apparence d\'un objet. (A colour describes the appearance of an object.)',
    explanation:'<b>Rouge</b> est une couleur (red). Les autres couleurs en français : bleu (blue), vert (green), jaune (yellow). Super !' }),

  makeMCQ({ id:'g1fr-lec-027', chapterId:'g1fr-lecture', difficulty:1, subsection:'mots_simples',
    question:'Quel mot veut dire <b>"dog"</b> en français ?',
    options:['chien','chat','lapin','oiseau'],
    answer:'chien',
    hint:'Cet animal fait "ouaf ouaf". (This animal says "woof woof".)',
    explanation:'<b>Chien</b> veut dire dog. Le chat = cat, le lapin = rabbit, l\'oiseau = bird. Excellent !' }),

  makeMCQ({ id:'g1fr-lec-028', chapterId:'g1fr-lecture', difficulty:1, subsection:'mots_simples',
    question:'Quel mot veut dire <b>"house"</b> en français ?',
    options:['maison','jardin','école','chambre'],
    answer:'maison',
    hint:'On habite dans cet endroit. (We live in this place.)',
    explanation:'<b>Maison</b> veut dire house. Le jardin = garden, l\'école = school, la chambre = bedroom. Très bien !' }),

  makeMCQ({ id:'g1fr-lec-029', chapterId:'g1fr-lecture', difficulty:1, subsection:'mots_simples',
    question:'Quel mot veut dire <b>"book"</b> en français ?',
    options:['livre','cahier','crayon','sac'],
    answer:'livre',
    hint:'On lit cet objet. (We read this object.)',
    explanation:'<b>Livre</b> veut dire book. Le cahier = exercise book, le crayon = pencil, le sac = bag. Bravo !' }),

  makeMCQ({ id:'g1fr-lec-030', chapterId:'g1fr-lecture', difficulty:1, subsection:'mots_simples',
    question:'Quel mot veut dire <b>"sun"</b> en français ?',
    options:['soleil','lune','étoile','nuage'],
    answer:'soleil',
    hint:'Il brille dans le ciel pendant la journée. (It shines in the sky during the day.)',
    explanation:'<b>Soleil</b> veut dire sun. La lune = moon, l\'étoile = star, le nuage = cloud. Super !' }),

  makeMCQ({ id:'g1fr-lec-031', chapterId:'g1fr-lecture', difficulty:1, subsection:'mots_simples',
    question:'Quel mot veut dire <b>"water"</b> en français ?',
    options:['eau','lait','jus','soupe'],
    answer:'eau',
    hint:'On en boit tous les jours — c\'est essentiel ! (We drink it every day — it is essential!)',
    explanation:'<b>Eau</b> veut dire water. Le lait = milk, le jus = juice, la soupe = soup. Excellent !' }),

  makeMCQ({ id:'g1fr-lec-032', chapterId:'g1fr-lecture', difficulty:1, subsection:'mots_simples',
    question:'Quel mot veut dire <b>"cat"</b> en français ?',
    options:['chat','chien','rat','lapin'],
    answer:'chat',
    hint:'Cet animal fait "miaou". (This animal says "meow".)',
    explanation:'<b>Chat</b> veut dire cat. Le chien = dog, le rat = rat, le lapin = rabbit. Très bien !' }),

  makeMCQ({ id:'g1fr-lec-033', chapterId:'g1fr-lecture', difficulty:1, subsection:'mots_simples',
    question:'Quel mot veut dire <b>"school"</b> en français ?',
    options:['école','maison','jardin','marché'],
    answer:'école',
    hint:'C\'est où tu vas apprendre chaque jour ! (This is where you go to learn every day!)',
    explanation:'<b>École</b> veut dire school. On aime aller à l\'école pour apprendre ! Bravo !' }),

  makeMCQ({ id:'g1fr-lec-034', chapterId:'g1fr-lecture', difficulty:1, subsection:'mots_simples',
    question:'Quel mot veut dire <b>"apple"</b> en français ?',
    options:['pomme','poire','banane','orange'],
    answer:'pomme',
    hint:'C\'est un fruit rouge ou vert. (It is a red or green fruit.)',
    explanation:'<b>Pomme</b> veut dire apple. La poire = pear, la banane = banana, l\'orange = orange. Super !' }),

  makeMCQ({ id:'g1fr-lec-035', chapterId:'g1fr-lecture', difficulty:1, subsection:'mots_simples',
    question:'Quel mot veut dire <b>"bird"</b> en français ?',
    options:['oiseau','poisson','lapin','chat'],
    answer:'oiseau',
    hint:'Cet animal a des ailes et peut voler. (This animal has wings and can fly.)',
    explanation:'<b>Oiseau</b> veut dire bird. Le poisson = fish, le lapin = rabbit, le chat = cat. Excellent !' }),

  makeMCQ({ id:'g1fr-lec-036', chapterId:'g1fr-lecture', difficulty:1, subsection:'mots_simples',
    question:'Quel mot veut dire <b>"flower"</b> en français ?',
    options:['fleur','arbre','herbe','feuille'],
    answer:'fleur',
    hint:'C\'est beau et ça sent bon dans le jardin. (It is beautiful and smells nice in the garden.)',
    explanation:'<b>Fleur</b> veut dire flower. L\'arbre = tree, l\'herbe = grass, la feuille = leaf. Très bien !' }),

  makeMCQ({ id:'g1fr-lec-037', chapterId:'g1fr-lecture', difficulty:1, subsection:'mots_simples',
    question:'Quel mot veut dire <b>"friend"</b> en français ?',
    options:['ami','ennemi','famille','voisin'],
    answer:'ami',
    hint:'C\'est quelqu\'un qu\'on aime beaucoup. (It is someone we like a lot.)',
    explanation:'<b>Ami</b> veut dire friend (ami pour un garçon, amie pour une fille). On dit "mon ami" ou "ma meilleure amie". Bravo !' }),

  makeMCQ({ id:'g1fr-lec-038', chapterId:'g1fr-lecture', difficulty:1, subsection:'mots_simples',
    question:'Quel mot veut dire <b>"happy"</b> en français ?',
    options:['heureux','triste','fatigué','en colère'],
    answer:'heureux',
    hint:'C\'est l\'opposé de triste (sad). (It is the opposite of sad.)',
    explanation:'<b>Heureux</b> veut dire happy (heureux pour un garçon, heureuse pour une fille). On est heureux quand on joue et quand on rit ! Super !' })

);

})();
