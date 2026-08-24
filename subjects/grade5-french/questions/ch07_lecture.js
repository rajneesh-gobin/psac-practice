'use strict';
// Grade 5 French - Chapter: Lecture & Compréhension
// IDs format: g5fr-lec-NNN

const _TEXTE_FR = `<div style="background:#f8fafc;border-left:4px solid #7c3aed;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7">
<b style="color:#5b21b6">Lisez le texte attentivement, puis répondez aux questions.</b><br><br>
<b>Une journée à Maurice</b><br><br>
Demain, c'est samedi. La famille Dupont va passer la journée à la mer. Le père, Monsieur Dupont, prépare le pique-nique dans la cuisine. Il fait des sandwichs au fromage et au jambon. La mère, Madame Dupont, met les serviettes et les maillots de bain dans un grand sac bleu.<br><br>
Les deux enfants, Luc et Sophie, sont très contents. Luc a neuf ans et Sophie a sept ans. Luc veut faire du snorkeling parce qu'il adore les poissons. Sophie préfère construire des châteaux de sable avec ses amies.<br><br>
Ils partent à huit heures du matin. La plage se trouve à vingt kilomètres de leur maison, à Flic en Flac. L'eau est chaude et cristalline. Toute la famille passe une magnifique journée ensemble.
</div>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-lec-001', chapterId:'fr-lecture', difficulty:1,
    question:`${_TEXTE_FR}Quel jour est-ce que la famille Dupont va à la mer ?`,
    options:['vendredi','dimanche','samedi','lundi'],
    answer:'samedi',
    hint:'Regardez la première phrase du texte.',
    explanation:'"<b>Samedi</b>" - Le texte commence : "Demain, c\'est <b>samedi</b>. La famille Dupont va passer la journée à la mer."' }),

  makeMCQ({ id:'g5fr-lec-002', chapterId:'fr-lecture', difficulty:1,
    question:`${_TEXTE_FR}Qu'est-ce que Monsieur Dupont prépare ?`,
    options:['une salade','un pique-nique','du jus d\'orange','des gâteaux'],
    answer:'un pique-nique',
    hint:'Le texte dit ce que le père prépare dans la cuisine.',
    explanation:'"<b>Un pique-nique</b>" - "Le père, Monsieur Dupont, <b>prépare le pique-nique</b> dans la cuisine." Il fait des sandwichs au fromage et au jambon.' }),

  makeMCQ({ id:'g5fr-lec-003', chapterId:'fr-lecture', difficulty:1,
    question:`${_TEXTE_FR}Quel âge a Sophie ?`,
    options:['neuf ans','huit ans','sept ans','dix ans'],
    answer:'sept ans',
    hint:'Les âges des deux enfants sont mentionnés dans le deuxième paragraphe.',
    explanation:'"<b>Sept ans</b>" - "Luc a neuf ans et Sophie a <b>sept ans</b>." En français, on dit "avoir X ans" pour exprimer l\'âge.' }),

  makeMCQ({ id:'g5fr-lec-004', chapterId:'fr-lecture', difficulty:2,
    question:`${_TEXTE_FR}Pourquoi est-ce que Luc veut faire du snorkeling ?`,
    options:[
      'Parce qu\'il aime nager vite.',
      'Parce qu\'il adore les poissons.',
      'Parce que Sophie ne veut pas.',
      'Parce que l\'eau est froide.'
    ],
    answer:'Parce qu\'il adore les poissons.',
    hint:'Cherchez le mot "parce que" dans le texte.',
    explanation:'"<b>Parce qu\'il adore les poissons</b>" - "Luc veut faire du snorkeling <b>parce qu\'il adore les poissons</b>." Le connecteur "parce que" introduit la raison.' }),

  makeMCQ({ id:'g5fr-lec-005', chapterId:'fr-lecture', difficulty:2,
    question:`${_TEXTE_FR}Où se trouve la plage ?`,
    options:['À vingt kilomètres, à Belle Mare','À dix kilomètres, à Grand Baie','À vingt kilomètres, à Flic en Flac','À huit kilomètres de la maison'],
    answer:'À vingt kilomètres, à Flic en Flac',
    hint:'Le troisième paragraphe donne les détails sur la plage.',
    explanation:'"<b>À vingt kilomètres, à Flic en Flac</b>" - "La plage se trouve à <b>vingt kilomètres</b> de leur maison, <b>à Flic en Flac</b>." Flic en Flac est une plage célèbre de Maurice.' }),

  makeMCQ({ id:'g5fr-lec-006', chapterId:'fr-lecture', difficulty:2,
    question:`${_TEXTE_FR}Qu'est-ce que Madame Dupont met dans le sac ?`,
    options:[
      'Des sandwichs et de l\'eau.',
      'Des serviettes et des maillots de bain.',
      'Des jouets et des livres.',
      'Un pique-nique et des fruits.'
    ],
    answer:'Des serviettes et des maillots de bain.',
    hint:'Le texte décrit ce que la mère fait.',
    explanation:'"<b>Des serviettes et des maillots de bain</b>" - "La mère... met <b>les serviettes et les maillots de bain</b> dans un grand sac bleu."' }),

  makeTF({ id:'g5fr-lec-007', chapterId:'fr-lecture', difficulty:1,
    question:`${_TEXTE_FR}Vrai ou Faux : Sophie préfère faire du snorkeling.`,
    answer:false,
    hint:'Lisez ce que Sophie préfère faire.',
    explanation:'<b>Faux.</b> C\'est <b>Luc</b> qui veut faire du snorkeling. "<b>Sophie préfère construire des châteaux de sable</b> avec ses amies." Il ne faut pas confondre les deux enfants.' }),

  makeMCQ({ id:'g5fr-lec-008', chapterId:'fr-lecture', difficulty:2,
    question:`${_TEXTE_FR}Comment est l'eau à la plage ?`,
    options:['froide et sale','chaude et cristalline','profonde et dangereuse','bleue et agitée'],
    answer:'chaude et cristalline',
    hint:'La description de l\'eau est dans le dernier paragraphe.',
    explanation:'"<b>Chaude et cristalline</b>" - "L\'eau est <b>chaude et cristalline</b>." "Cristalline" veut dire très claire, comme du cristal - un adjectif qui décrit une eau très propre et transparente.' }),

  makeMCQ({ id:'g5fr-lec-009', chapterId:'fr-lecture', difficulty:1,
    question:`${_TEXTE_FR}À quelle heure est-ce que la famille part ?`,
    options:['à sept heures','à huit heures du matin','à neuf heures','à midi'],
    answer:'à huit heures du matin',
    hint:'L\'heure du départ est mentionnée dans le dernier paragraphe.',
    explanation:'"<b>À huit heures du matin</b>" - "Ils partent à <b>huit heures du matin</b>." Du matin = in the morning (a.m.).' }),

  makeMCQ({ id:'g5fr-lec-010', chapterId:'fr-lecture', difficulty:2,
    question:`${_TEXTE_FR}Quel est le sentiment des enfants avant la sortie ?`,
    options:['tristes','fatigués','très contents','nerveux'],
    answer:'très contents',
    hint:'Comment sont Luc et Sophie ? Cherchez l\'adjectif qui les décrit.',
    explanation:'"<b>Très contents</b>" - "Les deux enfants, Luc et Sophie, sont <b>très contents</b>." Contents = happy/pleased. Très = very. L\'adjectif "content" est au masculin pluriel car il décrit les deux enfants (un garçon et une fille → masculin pluriel en français).' })

);

// Deuxième passage - "Une sortie pas comme les autres" (PSAC 2025)
const _TEXTE_FR_B = `<div style="background:#f8fafc;border-left:4px solid #f59e0b;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7">
<b style="color:#92400e">Lisez le texte attentivement, puis répondez aux questions.</b><br><br>
<b>Une sortie pas comme les autres</b><br><br>
Très tôt le matin, alors que le soleil ne s'est même pas encore levé, deux amis, Sanjeev et Marcelin, vont faire une partie de pêche.<br><br>
La mer est très calme, l'air doux et toutes les conditions sont réunies pour passer une belle journée.<br><br>
Les deux gamins montent à bord de leur petite barque en bois et s'éloignent lentement du rivage. Tout semble parfait. Les poissons mordent rapidement à l'hameçon. En quelques heures, leur seau est presque rempli. Ravis, ils s'amusent et parlent même de revenir le lendemain.<br><br>
Mais, soudain, le ciel devient sombre. De gros nuages gris apparaissent et un vent violent se lève. La mer, qui plus tôt était paisible, se transforme en vagues déchaînées. Leur barque finit par chavirer.<br><br>
Sur la plage, quelques personnes assistent à la scène. Affolées, elles appellent immédiatement les secours. En quelques minutes, un hélicoptère de sauvetage arrive et survole la zone. Heureusement, Sanjeev et Marcelin sont secourus et ramenés sur la plage. Là, des gardes-côtes leur donnent les premiers soins, une boisson chaude et des couvertures car ils tremblent de froid. Leurs parents, inquiets, arrivent en courant et poussent un ouf de soulagement dès qu'ils réalisent que les enfants sont sains et saufs.
</div>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-lec-011', chapterId:'fr-lecture', difficulty:1,
    question:`${_TEXTE_FR_B}Quelle est la relation entre Sanjeev et Marcelin ?`,
    options:['frères','camarades / amis','cousins','voisins'],
    answer:'camarades / amis',
    hint:'Le texte décrit leur relation dès la première phrase.',
    explanation:'"<b>camarades / amis</b>" - Le texte commence : "deux <b>amis</b>, Sanjeev et Marcelin". La question PSAC 2025 utilisait "camarade" et "ami" comme options correctes pour une réponse à choix multiple.' }),

  makeMCQ({ id:'g5fr-lec-012', chapterId:'fr-lecture', difficulty:1,
    question:`${_TEXTE_FR_B}Où est-ce que Sanjeev et Marcelin mettent les poissons ?`,
    options:['dans un sac','dans un panier','dans un seau','dans une boîte'],
    answer:'dans un seau',
    hint:'Cherchez le mot qui désigne le contenant utilisé pour les poissons.',
    explanation:'"<b>dans un seau</b>" - "En quelques heures, leur <b>seau</b> est presque rempli." Un seau = a bucket. Ils avaient eu beaucoup de succès en pêchant !' }),

  makeMCQ({ id:'g5fr-lec-013', chapterId:'fr-lecture', difficulty:1,
    question:`${_TEXTE_FR_B}Pourquoi le ciel devient-il sombre ?`,
    options:[
      'Le soleil se couche',
      'La nuit approche',
      'Le temps est beau',
      'Il y a de gros nuages gris'
    ],
    answer:'Il y a de gros nuages gris',
    hint:'Le texte décrit ce qui apparaît quand le ciel devient sombre.',
    explanation:'"<b>Il y a de gros nuages gris</b>" - "De gros nuages gris apparaissent et un vent violent se lève." Ce sont les nuages qui assombrissent le ciel, marquant le début de la tempête.' }),

  makeMCQ({ id:'g5fr-lec-014', chapterId:'fr-lecture', difficulty:2,
    question:`${_TEXTE_FR_B}Qui a appelé les secours ?`,
    options:[
      'Les gardes-côtes',
      'Les parents',
      'Les gens sur la plage',
      'Les deux garçons'
    ],
    answer:'Les gens sur la plage',
    hint:'Regardez ce que font les personnes qui assistent à la scène depuis la plage.',
    explanation:'"<b>Les gens sur la plage</b>" - "Sur la plage, quelques personnes assistent à la scène. Affolées, elles appellent immédiatement les secours." Ce sont les témoins sur la plage, pas les parents ni les gardes-côtes, qui ont lancé l\'alerte.' }),

  makeMCQ({ id:'g5fr-lec-015', chapterId:'fr-lecture', difficulty:2,
    question:`${_TEXTE_FR_B}Pourquoi les gardes-côtes donnent-ils des couvertures aux garçons ?`,
    options:[
      'Ils sont blessés',
      'Ils ont froid et tremblent',
      'Ils ont sommeil',
      'Ils sont fatigués'
    ],
    answer:'Ils ont froid et tremblent',
    hint:'Le texte explique la raison directement avec "car".',
    explanation:'"<b>Ils ont froid et tremblent</b>" - "des gardes-côtes leur donnent les premiers soins, une boisson chaude et des couvertures <b>car ils tremblent de froid</b>." Le mot "car" = because, indique la raison.' }),

  makeTF({ id:'g5fr-lec-016', chapterId:'fr-lecture', difficulty:1,
    question:`${_TEXTE_FR_B}Vrai ou Faux : Sanjeev et Marcelin ont pu rentrer chez eux avant la tempête.`,
    answer:false,
    hint:'Que s\'est-il passé à leur barque ?',
    explanation:'<b>Faux.</b> La barque a chaviré pendant la tempête : "Leur barque finit par <b>chavirer</b>." Les deux garçons ont dû être secourus par hélicoptère. Ils n\'ont pas pu rentrer seuls - ils ont été ramenés sur la plage par les secours.' }),

  makeMCQ({ id:'g5fr-lec-017', chapterId:'fr-lecture', difficulty:2,
    question:`${_TEXTE_FR_B}Que signifie "sains et saufs" dans ce texte ?`,
    options:[
      'blessés mais vivants',
      'en bonne santé et hors de danger',
      'rentrés chez eux',
      'heureux et contents'
    ],
    answer:'en bonne santé et hors de danger',
    hint:'Les parents "poussent un ouf de soulagement" en voyant les enfants "sains et saufs".',
    explanation:'"<b>en bonne santé et hors de danger</b>" - "sain et sauf" (safe and sound) signifie que les enfants n\'ont pas été blessés malgré l\'accident. Les parents ont poussé "un ouf de soulagement" (a sigh of relief) car ils étaient très inquiets.' }),

  makeMCQ({ id:'g5fr-lec-018', chapterId:'fr-lecture', difficulty:3,
    question:`${_TEXTE_FR_B}Que signifie "affolées" dans "Affolées, elles appellent les secours" ?`,
    options:[
      'très calmes',
      'très courageuses',
      'paniquées et très inquiètes',
      'très contentes'
    ],
    answer:'paniquées et très inquiètes',
    hint:'Les personnes viennent de voir la barque chavirer. Comment se sentiraient-elles ?',
    explanation:'"<b>paniquées et très inquiètes</b>" - "affolées" vient du verbe "affoler" = to panic, to throw into a panic. Les témoins ont vu un accident grave : la barque a chaviré avec deux enfants à bord. Leur réaction naturelle était la panique, d\'où l\'appel immédiat aux secours.' }),

  makeMCQ({ id:'g5fr-lec-019', chapterId:'fr-lecture', difficulty:4,
    question:`${_TEXTE_FR_B}Quel est le message principal de ce texte ?`,
    options:[
      'La pêche est une activité très dangereuse qu\'il ne faut jamais pratiquer.',
      'Le danger peut surgir soudainement ; la nature est imprévisible et les secours sont essentiels.',
      'Il faut toujours prévenir ses parents avant de sortir.',
      'Les hélicoptères de sauvetage sont très rapides.'
    ],
    answer:'Le danger peut surgir soudainement ; la nature est imprévisible et les secours sont essentiels.',
    hint:'La situation passe de "parfaite" à "dangereuse" très rapidement. Que nous apprend cette transformation ?',
    explanation:'Le texte montre que même une journée qui "semble parfaite" peut devenir dangereuse très vite ("soudain, le ciel devient sombre"). Les thèmes clés sont : l\'<b>imprévisibilité de la nature</b>, l\'importance des <b>services de secours</b>, et la <b>solidarité</b> des témoins. Ce n\'est pas un texte contre la pêche, mais une leçon sur la prudence et l\'importance de l\'entraide.' }),

  makeMCQ({ id:'g5fr-lec-020', chapterId:'fr-lecture', difficulty:2,
    question:'Dans une lettre formelle, quelle formule utilise-t-on pour commencer ?',
    options:['Salut !','Cher ami,','Madame / Monsieur,','Bonjour tout le monde,'],
    answer:'Madame / Monsieur,',
    hint:'Les lettres formelles utilisent des formules de politesse.',
    explanation:'"<b>Madame / Monsieur,</b>" - Dans une lettre formelle (à un directeur, une autorité, un inconnu), on commence par "Madame," ou "Monsieur," ou "Madame, Monsieur,". Pour une lettre informelle (ami, famille) : "Cher Paul," / "Ma chère Marie,".' }),

  makeMCQ({ id:'g5fr-lec-021', chapterId:'fr-lecture', difficulty:1,
    question:'Quel est le meilleur synonyme de "magnifique" ?',
    options:['ordinaire','splendide','ennuyeux','petit'],
    answer:'splendide',
    hint:'"Magnifique" = très beau, extraordinaire.',
    explanation:'"<b>splendide</b>" = magnificent, wonderful. Synonymes de magnifique : splendide, superbe, merveilleux, somptueux, grandiose. Antonymes : ordinaire, banal, terne.' }),

  makeTF({ id:'g5fr-lec-022', chapterId:'fr-lecture', difficulty:1,
    question:'Une comparaison (simile) utilise "comme" ou "tel que" pour relier deux choses.',
    answer:true,
    hint:'"Il nage comme un poisson" est une comparaison.',
    explanation:'<b>Vrai.</b> La <b>comparaison</b> utilise des mots de liaison : <b>comme</b>, <b>tel que</b>, <b>pareil à</b>. Exemples : "Il nage <b>comme</b> un poisson." "Elle est courageuse <b>tel un</b> lion." La comparaison rapproche deux choses en les comparant explicitement.' }),

  makeMCQ({ id:'g5fr-lec-023', chapterId:'fr-lecture', difficulty:2,
    question:'"Il nage comme un poisson." Cette figure de style est...',
    options:['une métaphore','une comparaison','une exagération','une personnification'],
    answer:'une comparaison',
    hint:'Cherchez le mot de comparaison.',
    explanation:'"<b>une comparaison</b>" - "comme" est le mot de comparaison. Structure : A est comme B. La métaphore dirait : "C\'est un poisson" (sans "comme"). La comparaison garde explicitement le lien entre les deux éléments comparés.' }),

  makeMCQ({ id:'g5fr-lec-024', chapterId:'fr-lecture', difficulty:2,
    question:'"Sa voix est de la musique." Cette figure de style est...',
    options:['une comparaison','une métaphore','une répétition','une question rhétorique'],
    answer:'une métaphore',
    hint:'Il n\'y a pas de "comme" - la voix EST de la musique (directement).',
    explanation:'"<b>une métaphore</b>" - La métaphore compare deux choses DIRECTEMENT, sans "comme" : "Sa voix <b>est</b> de la musique." Une comparaison dirait : "Sa voix <b>est comme</b> de la musique." La métaphore est plus forte et plus poétique.' }),

  makeMCQ({ id:'g5fr-lec-025', chapterId:'fr-lecture', difficulty:1,
    question:'Dans un texte écrit à la première personne, le narrateur utilise principalement...',
    options:['il/elle/ils','je/me/moi','vous/votre','on/soi'],
    answer:'je/me/moi',
    hint:'La première personne = "je".',
    explanation:'"<b>je/me/moi</b>" - Un texte à la <b>première personne</b> utilise "je" : "Aujourd\'hui, je suis allé au marché..." Un texte à la <b>troisième personne</b> utilise "il/elle" : "Pierre est allé au marché..." Le point de vue change la relation entre le lecteur et l\'histoire.' }),

  makeTF({ id:'g5fr-lec-026', chapterId:'fr-lecture', difficulty:1,
    question:'Un texte narratif raconte une histoire avec un début, un développement et une fin.',
    answer:true,
    hint:'Pense à tous les contes et histoires que tu as lus.',
    explanation:'<b>Vrai.</b> Un texte <b>narratif</b> a une structure : début (situation initiale), développement (péripéties/événements), fin (résolution). Types de textes : narratif (raconte), descriptif (décrit), argumentatif (convainc), informatif (explique).' }),

  makeMCQ({ id:'g5fr-lec-027', chapterId:'fr-lecture', difficulty:1,
    question:'La "conclusion" d\'un texte se trouve...',
    options:['au début','au milieu','à la fin','dans le titre'],
    answer:'à la fin',
    hint:'Introduction → développement → conclusion.',
    explanation:'"<b>à la fin</b>" - Structure d\'un texte organisé : <b>introduction</b> (début, présente le sujet), <b>développement</b> (milieu, développe les idées), <b>conclusion</b> (fin, résume ou conclut). La conclusion répond à la question posée ou tire la leçon.' }),

  makeMCQ({ id:'g5fr-lec-028', chapterId:'fr-lecture', difficulty:2,
    question:'"Vous devez remettre votre rapport demain." C\'est un registre...',
    options:['informel','familier','formel','vulgaire'],
    answer:'formel',
    hint:'"Vous" (et non "tu") + vocabulaire soutenu = registre formel.',
    explanation:'"<b>formel</b>" - Le registre <b>formel/soutenu</b> utilise "vous", un vocabulaire précis et des phrases complètes. Le registre <b>informel/familier</b> utilise "tu", des abréviations, du slang : "T\'as fini ton truc ?"' }),

  makeMCQ({ id:'g5fr-lec-029', chapterId:'fr-lecture', difficulty:1,
    question:'"T\'as vu le film ?" C\'est un registre...',
    options:['formel','soutenu','informel','professionnel'],
    answer:'informel',
    hint:'Abréviation de "tu as" + langage parlé = registre informel.',
    explanation:'"<b>informel</b>" - "T\'as" = tu as (forme parlée abrégée). Le registre informel s\'utilise entre amis et en famille. La version formelle serait : "Avez-vous vu le film ?" ou "As-tu vu le film ?"' }),

  makeMCQ({ id:'g5fr-lec-030', chapterId:'fr-lecture', difficulty:2,
    question:'Choisissez le meilleur synonyme pour "immense" : "Le parc est immense."',
    options:['petit','gigantesque','moyen','coloré'],
    answer:'gigantesque',
    hint:'"Immense" = très grand → cherchez un synonyme de grande taille.',
    explanation:'"<b>gigantesque</b>" = enormously large. Synonymes d\'immense : gigantesque, colossal, vaste, étendu, spacieux. Antonymes : petit, minuscule, étroit.' }),

  makeTF({ id:'g5fr-lec-031', chapterId:'fr-lecture', difficulty:2,
    question:'Une métaphore compare deux choses directement, sans utiliser "comme".',
    answer:true,
    hint:'Comparaison = avec "comme". Métaphore = sans "comme".',
    explanation:'<b>Vrai.</b> Métaphore : A <b>est</b> B (directement). Comparaison : A <b>est comme</b> B (avec mot de liaison). Exemples - Comparaison : "Il est fort <b>comme</b> un lion." Métaphore : "C\'est <b>un lion</b>" (en parlant de lui).' }),

  makeMCQ({ id:'g5fr-lec-032', chapterId:'fr-lecture', difficulty:2,
    question:'"Je t\'écris pour te demander des nouvelles." Cette phrase d\'une lettre indique que l\'auteur...',
    options:[
      'veut donner de mauvaises nouvelles',
      'veut savoir comment va le destinataire',
      'veut inviter le destinataire',
      'veut se plaindre de quelque chose'
    ],
    answer:'veut savoir comment va le destinataire',
    hint:'"Demander des nouvelles" = s\'informer de l\'état de quelqu\'un.',
    explanation:'"<b>veut savoir comment va le destinataire</b>" - "demander des nouvelles de quelqu\'un" = to ask how someone is doing. C\'est une formule courante dans les lettres : "Je t\'écris pour avoir de tes nouvelles" / "Je voulais prendre de tes nouvelles."' }),

  makeMCQ({ id:'g5fr-lec-033', chapterId:'fr-lecture', difficulty:2,
    question:'Quel est l\'antonyme de "courageux" ?',
    options:['brave','timide','lâche','généreux'],
    answer:'lâche',
    hint:'"Lâche" = quelqu\'un qui manque de courage, qui a peur.',
    explanation:'"<b>lâche</b>" = cowardly (the opposite of courageous). Courageux ↔ lâche. Ne pas confondre avec "timide" (shy) qui est une caractéristique de personnalité différente. Un pompier est courageux. Quelqu\'un qui fuit le danger est lâche.' }),

  makeMCQ({ id:'g5fr-lec-034', chapterId:'fr-lecture', difficulty:2,
    question:'Identifiez le point de vue : "Elle regarda l\'horizon et soupira."',
    options:['première personne (je)','deuxième personne (tu/vous)','troisième personne (il/elle)','quatrième personne'],
    answer:'troisième personne (il/elle)',
    hint:'"Elle" = pronom de la troisième personne.',
    explanation:'"<b>troisième personne</b>" - "Elle regarda" utilise "elle" (3ème personne du singulier). Un narrateur à la 3ème personne raconte l\'histoire de l\'extérieur. Un narrateur à la 1ère personne dirait : "Je regardai l\'horizon et soupirai."' }),

  makeMCQ({ id:'g5fr-lec-035', chapterId:'fr-lecture', difficulty:4,
    question:'"Le soleil se couchait, peignant le ciel de rouge et d\'orange. C\'était un spectacle ___." Quel mot complète le mieux la phrase ?',
    options:['ennuyeux','splendide','ordinaire','bruyant'],
    answer:'splendide',
    hint:'Le soleil peint le ciel de couleurs vives - c\'est une belle description.',
    explanation:'"C\'était un spectacle <b>splendide</b>." - Le contexte décrit un coucher de soleil coloré et poétique ("peignant le ciel de rouge et d\'orange"). "Splendide" (= magnificent, wonderful) correspond parfaitement. "Ennuyeux" et "ordinaire" s\'opposent au contexte positif. "Bruyant" s\'applique au son, pas à la vue.' })

);
