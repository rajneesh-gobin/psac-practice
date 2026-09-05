'use strict';
// Grade 5 French - Chapter: Lecture & Compréhension
// IDs format: g5fr-lec-NNN

const _TEXTE_FR = `<div style="background:#f8fafc;border-left:4px solid #7c3aed;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a">
<b style="color:#5b21b6">Lisez le texte attentivement, puis répondez aux questions.</b><br><br>
<b>Une journée à Maurice</b><br><br>
Demain, c\'est samedi. La famille Dupont va passer la journée à la mer. Le père, Monsieur Dupont, prépare le pique-nique dans la cuisine. Il fait des sandwichs au fromage et au jambon. La mère, Madame Dupont, met les serviettes et les maillots de bain dans un grand sac bleu.<br><br>
Les deux enfants, Luc et Sophie, sont très contents. Luc a neuf ans et Sophie a sept ans. Luc veut faire du snorkeling parce qu\'il adore les poissons. Sophie préfère construire des châteaux de sable avec ses amies.<br><br>
Ils partent à huit heures du matin. La plage se trouve à vingt kilomètres de leur maison, à Flic en Flac. L\'eau est chaude et cristalline. Toute la famille passe une magnifique journée ensemble.
</div>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-lec-001', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:`${_TEXTE_FR}Quel jour est-ce que la famille Dupont va à la mer ?`,
    options:['vendredi','dimanche','samedi','lundi'],
    answer:'samedi',
    hint:'Regardez la première phrase du texte.',
    explanation:'"<b>Samedi</b>" - Le texte commence : "Demain, c\'est <b>samedi</b>. La famille Dupont va passer la journée à la mer."' }),

  makeMCQ({ id:'g5fr-lec-002', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:`${_TEXTE_FR}Qu\'est-ce que Monsieur Dupont prépare ?`,
    options:['une salade','un pique-nique','du jus d\'orange','des gâteaux'],
    answer:'un pique-nique',
    hint:'Le texte dit ce que le père prépare dans la cuisine.',
    explanation:'"<b>Un pique-nique</b>" - "Le père, Monsieur Dupont, <b>prépare le pique-nique</b> dans la cuisine." Il fait des sandwichs au fromage et au jambon.' }),

  makeMCQ({ id:'g5fr-lec-003', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:`${_TEXTE_FR}Quel âge a Sophie ?`,
    options:['neuf ans','huit ans','sept ans','dix ans'],
    answer:'sept ans',
    hint:'Les âges des deux enfants sont mentionnés dans le deuxième paragraphe.',
    explanation:'"<b>Sept ans</b>" - "Luc a neuf ans et Sophie a <b>sept ans</b>." En français, on dit "avoir X ans" pour exprimer l\'âge.' }),

  makeMCQ({ id:'g5fr-lec-004', chapterId:'fr-lecture', subsection:'inference', difficulty:2,
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

  makeMCQ({ id:'g5fr-lec-005', chapterId:'fr-lecture', subsection:'reperage', difficulty:2,
    question:`${_TEXTE_FR}Où se trouve la plage ?`,
    options:['À vingt kilomètres, à Belle Mare','À dix kilomètres, à Grand Baie','À vingt kilomètres, à Flic en Flac','À huit kilomètres de la maison'],
    answer:'À vingt kilomètres, à Flic en Flac',
    hint:'Le troisième paragraphe donne les détails sur la plage.',
    explanation:'"<b>À vingt kilomètres, à Flic en Flac</b>" - "La plage se trouve à <b>vingt kilomètres</b> de leur maison, <b>à Flic en Flac</b>." Flic en Flac est une plage célèbre de Maurice.' }),

  makeMCQ({ id:'g5fr-lec-006', chapterId:'fr-lecture', subsection:'reperage', difficulty:2,
    question:`${_TEXTE_FR}Qu\'est-ce que Madame Dupont met dans le sac ?`,
    options:[
      'Des sandwichs et de l\'eau.',
      'Des serviettes et des maillots de bain.',
      'Des jouets et des livres.',
      'Un pique-nique et des fruits.'
    ],
    answer:'Des serviettes et des maillots de bain.',
    hint:'Le texte décrit ce que la mère fait.',
    explanation:'"<b>Des serviettes et des maillots de bain</b>" - "La mère... met <b>les serviettes et les maillots de bain</b> dans un grand sac bleu."' }),

  makeTF({ id:'g5fr-lec-007', chapterId:'fr-lecture', subsection:'vrai_faux', difficulty:1,
    question:`${_TEXTE_FR}Vrai ou Faux : Sophie préfère faire du snorkeling.`,
    answer:false,
    hint:'Lisez ce que Sophie préfère faire.',
    explanation:'<b>Faux.</b> C\'est <b>Luc</b> qui veut faire du snorkeling. "<b>Sophie préfère construire des châteaux de sable</b> avec ses amies." Il ne faut pas confondre les deux enfants.' }),

  makeMCQ({ id:'g5fr-lec-008', chapterId:'fr-lecture', subsection:'reperage', difficulty:2,
    question:`${_TEXTE_FR}Comment est l\'eau à la plage ?`,
    options:['froide et sale','chaude et cristalline','profonde et dangereuse','bleue et agitée'],
    answer:'chaude et cristalline',
    hint:'La description de l\'eau est dans le dernier paragraphe.',
    explanation:'"<b>Chaude et cristalline</b>" - "L\'eau est <b>chaude et cristalline</b>." "Cristalline" veut dire très claire, comme du cristal - un adjectif qui décrit une eau très propre et transparente.' }),

  makeMCQ({ id:'g5fr-lec-009', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:`${_TEXTE_FR}À quelle heure est-ce que la famille part ?`,
    options:['à sept heures','à huit heures du matin','à neuf heures','à midi'],
    answer:'à huit heures du matin',
    hint:'L\'heure du départ est mentionnée dans le dernier paragraphe.',
    explanation:'"<b>À huit heures du matin</b>" - "Ils partent à <b>huit heures du matin</b>." Du matin = in the morning (a.m.).' }),

  makeMCQ({ id:'g5fr-lec-010', chapterId:'fr-lecture', subsection:'inference', difficulty:2,
    question:`${_TEXTE_FR}Quel est le sentiment des enfants avant la sortie ?`,
    options:['tristes','fatigués','très contents','nerveux'],
    answer:'très contents',
    hint:'Comment sont Luc et Sophie ? Cherchez l\'adjectif qui les décrit.',
    explanation:'"<b>Très contents</b>" - "Les deux enfants, Luc et Sophie, sont <b>très contents</b>." Contents = happy/pleased. Très = very. L\'adjectif "content" est au masculin pluriel car il décrit les deux enfants (un garçon et une fille → masculin pluriel en français).' })

);

// Deuxième passage - "Une sortie pas comme les autres" (PSAC 2025)
const _TEXTE_FR_B = `<div style="background:#f8fafc;border-left:4px solid #f59e0b;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a">
<b style="color:#92400e">Lisez le texte attentivement, puis répondez aux questions.</b><br><br>
<b>Une sortie pas comme les autres</b><br><br>
Très tôt le matin, alors que le soleil ne s\'est même pas encore levé, deux amis, Sanjeev et Marcelin, vont faire une partie de pêche.<br><br>
La mer est très calme, l\'air doux et toutes les conditions sont réunies pour passer une belle journée.<br><br>
Les deux gamins montent à bord de leur petite barque en bois et s\'éloignent lentement du rivage. Tout semble parfait. Les poissons mordent rapidement à l\'hameçon. En quelques heures, leur seau est presque rempli. Ravis, ils s\'amusent et parlent même de revenir le lendemain.<br><br>
Mais, soudain, le ciel devient sombre. De gros nuages gris apparaissent et un vent violent se lève. La mer, qui plus tôt était paisible, se transforme en vagues déchaînées. Leur barque finit par chavirer.<br><br>
Sur la plage, quelques personnes assistent à la scène. Affolées, elles appellent immédiatement les secours. En quelques minutes, un hélicoptère de sauvetage arrive et survole la zone. Heureusement, Sanjeev et Marcelin sont secourus et ramenés sur la plage. Là, des gardes-côtes leur donnent les premiers soins, une boisson chaude et des couvertures car ils tremblent de froid. Leurs parents, inquiets, arrivent en courant et poussent un ouf de soulagement dès qu\'ils réalisent que les enfants sont sains et saufs.
</div>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-lec-011', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:`${_TEXTE_FR_B}Quelle est la relation entre Sanjeev et Marcelin ?`,
    options:['frères','camarades / amis','cousins','voisins'],
    answer:'camarades / amis',
    hint:'Le texte décrit leur relation dès la première phrase.',
    explanation:'"<b>camarades / amis</b>" - Le texte commence : "deux <b>amis</b>, Sanjeev et Marcelin". La question PSAC 2025 utilisait "camarade" et "ami" comme options correctes pour une réponse à choix multiple.' }),

  makeMCQ({ id:'g5fr-lec-012', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:`${_TEXTE_FR_B}Où est-ce que Sanjeev et Marcelin mettent les poissons ?`,
    options:['dans un sac','dans un panier','dans un seau','dans une boîte'],
    answer:'dans un seau',
    hint:'Cherchez le mot qui désigne le contenant utilisé pour les poissons.',
    explanation:'"<b>dans un seau</b>" - "En quelques heures, leur <b>seau</b> est presque rempli." Un seau = a bucket. Ils avaient eu beaucoup de succès en pêchant !' }),

  makeMCQ({ id:'g5fr-lec-013', chapterId:'fr-lecture', subsection:'inference', difficulty:1,
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

  makeMCQ({ id:'g5fr-lec-014', chapterId:'fr-lecture', subsection:'reperage', difficulty:2,
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

  makeMCQ({ id:'g5fr-lec-015', chapterId:'fr-lecture', subsection:'inference', difficulty:2,
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

  makeTF({ id:'g5fr-lec-016', chapterId:'fr-lecture', subsection:'vrai_faux', difficulty:1,
    question:`${_TEXTE_FR_B}Vrai ou Faux : Sanjeev et Marcelin ont pu rentrer chez eux avant la tempête.`,
    answer:false,
    hint:'Qu\'est-il arrivé à leur barque ?',
    explanation:'<b>Faux.</b> La barque a chaviré pendant la tempête : "Leur barque finit par <b>chavirer</b>." Les deux garçons ont dû être secourus par hélicoptère. Ils n\'ont pas pu rentrer seuls - ils ont été ramenés sur la plage par les secours.' }),

  makeMCQ({ id:'g5fr-lec-017', chapterId:'fr-lecture', subsection:'vocabulaire', difficulty:2,
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

  makeMCQ({ id:'g5fr-lec-018', chapterId:'fr-lecture', subsection:'vocabulaire', difficulty:3,
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

  makeMCQ({ id:'g5fr-lec-019', chapterId:'fr-lecture', subsection:'reperage', difficulty:4,
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

  makeMCQ({ id:'g5fr-lec-020', chapterId:'fr-lecture', subsection:'reperage', difficulty:2,
    question:'Dans une lettre formelle, quelle formule utilise-t-on pour commencer ?',
    options:['Salut !','Cher ami,','Madame / Monsieur,','Bonjour tout le monde,'],
    answer:'Madame / Monsieur,',
    hint:'Les lettres formelles utilisent des formules de politesse.',
    explanation:'"<b>Madame / Monsieur,</b>" - Dans une lettre formelle (à un directeur, une autorité, un inconnu), on commence par "Madame," ou "Monsieur," ou "Madame, Monsieur,". Pour une lettre informelle (ami, famille) : "Cher Paul," / "Ma chère Marie,".' }),

  makeMCQ({ id:'g5fr-lec-021', chapterId:'fr-lecture', subsection:'vocabulaire', difficulty:1,
    question:'Quel est le meilleur synonyme de "magnifique" ?',
    options:['ordinaire','splendide','ennuyeux','petit'],
    answer:'splendide',
    hint:'"Magnifique" = très beau, extraordinaire.',
    explanation:'"<b>splendide</b>" = magnificent, wonderful. Synonymes de magnifique : splendide, superbe, merveilleux, somptueux, grandiose. Antonymes : ordinaire, banal, terne.' }),

  makeTF({ id:'g5fr-lec-022', chapterId:'fr-lecture', subsection:'figures_style', difficulty:1,
    question:'Une comparaison (simile) utilise "comme" ou "tel que" pour relier deux choses.',
    answer:true,
    hint:'"Il nage comme un poisson" est une comparaison.',
    explanation:'<b>Vrai.</b> La <b>comparaison</b> utilise des mots de liaison : <b>comme</b>, <b>tel que</b>, <b>pareil à</b>. Exemples : "Il nage <b>comme</b> un poisson." "Elle est courageuse <b>tel un</b> lion." La comparaison rapproche deux choses en les comparant explicitement.' }),

  makeMCQ({ id:'g5fr-lec-023', chapterId:'fr-lecture', subsection:'figures_style', difficulty:2,
    question:'"Il nage comme un poisson." Cette figure de style est...',
    options:['une métaphore','une comparaison','une exagération','une personnification'],
    answer:'une comparaison',
    hint:'Cherchez le mot de comparaison.',
    explanation:'"<b>une comparaison</b>" - "comme" est le mot de comparaison. Structure : A est comme B. La métaphore dirait : "C\'est un poisson" (sans "comme"). La comparaison garde explicitement le lien entre les deux éléments comparés.' }),

  makeMCQ({ id:'g5fr-lec-024', chapterId:'fr-lecture', subsection:'figures_style', difficulty:2,
    question:'"Sa voix est de la musique." Cette figure de style est...',
    options:['une comparaison','une métaphore','une répétition','une question rhétorique'],
    answer:'une métaphore',
    hint:'Il n\'y a pas de "comme" - la voix EST de la musique (directement).',
    explanation:'"<b>une métaphore</b>" - La métaphore compare deux choses DIRECTEMENT, sans "comme" : "Sa voix <b>est</b> de la musique." Une comparaison dirait : "Sa voix <b>est comme</b> de la musique." La métaphore est plus forte et plus poétique.' }),

  makeMCQ({ id:'g5fr-lec-025', chapterId:'fr-lecture', subsection:'narration', difficulty:1,
    question:'Dans un texte écrit à la première personne, le narrateur utilise principalement...',
    options:['il/elle/ils','je/me/moi','vous/votre','on/soi'],
    answer:'je/me/moi',
    hint:'La première personne = "je".',
    explanation:'"<b>je/me/moi</b>" - Un texte à la <b>première personne</b> utilise "je" : "Aujourd\'hui, je suis allé au marché..." Un texte à la <b>troisième personne</b> utilise "il/elle" : "Pierre est allé au marché..." Le point de vue change la relation entre le lecteur et l\'histoire.' }),

  makeTF({ id:'g5fr-lec-026', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'Un texte narratif raconte une histoire avec un début, un développement et une fin.',
    answer:true,
    hint:'Pense à tous les contes et histoires que tu as lus.',
    explanation:'<b>Vrai.</b> Un texte <b>narratif</b> a une structure : début (situation initiale), développement (péripéties/événements), fin (résolution). Types de textes : narratif (raconte), descriptif (décrit), argumentatif (convainc), informatif (explique).' }),

  makeMCQ({ id:'g5fr-lec-027', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:'La "conclusion" d\'un texte se trouve...',
    options:['au début','au milieu','à la fin','dans le titre'],
    answer:'à la fin',
    hint:'Introduction → développement → conclusion.',
    explanation:'"<b>à la fin</b>" - Structure d\'un texte organisé : <b>introduction</b> (début, présente le sujet), <b>développement</b> (milieu, développe les idées), <b>conclusion</b> (fin, résume ou conclut). La conclusion répond à la question posée ou tire la leçon.' }),

  makeMCQ({ id:'g5fr-lec-028', chapterId:'fr-lecture', subsection:'type_ton', difficulty:2,
    question:'"Vous devez remettre votre rapport demain." C\'est un registre...',
    options:['informel','familier','formel','vulgaire'],
    answer:'formel',
    hint:'"Vous" (et non "tu") + vocabulaire soutenu = registre formel.',
    explanation:'"<b>formel</b>" - Le registre <b>formel/soutenu</b> utilise "vous", un vocabulaire précis et des phrases complètes. Le registre <b>informel/familier</b> utilise "tu", des abréviations, du slang : "T\'as fini ton truc ?"' }),

  makeMCQ({ id:'g5fr-lec-029', chapterId:'fr-lecture', subsection:'type_ton', difficulty:1,
    question:'"T\'as vu le film ?" C\'est un registre...',
    options:['formel','soutenu','informel','professionnel'],
    answer:'informel',
    hint:'Abréviation de "tu as" + langage parlé = registre informel.',
    explanation:'"<b>informel</b>" - "T\'as" = tu as (forme parlée abrégée). Le registre informel s\'utilise entre amis et en famille. La version formelle serait : "Avez-vous vu le film ?" ou "As-tu vu le film ?"' }),

  makeMCQ({ id:'g5fr-lec-030', chapterId:'fr-lecture', subsection:'vocabulaire', difficulty:2,
    question:'Choisissez le meilleur synonyme pour "immense" : "Le parc est immense."',
    options:['petit','gigantesque','moyen','coloré'],
    answer:'gigantesque',
    hint:'"Immense" = très grand → cherchez un synonyme de grande taille.',
    explanation:'"<b>gigantesque</b>" = enormously large. Synonymes d\'immense : gigantesque, colossal, vaste, étendu, spacieux. Antonymes : petit, minuscule, étroit.' }),

  makeTF({ id:'g5fr-lec-031', chapterId:'fr-lecture', subsection:'figures_style', difficulty:2,
    question:'Une métaphore compare deux choses directement, sans utiliser "comme".',
    answer:true,
    hint:'Comparaison = avec "comme". Métaphore = sans "comme".',
    explanation:'<b>Vrai.</b> Métaphore : A <b>est</b> B (directement). Comparaison : A <b>est comme</b> B (avec mot de liaison). Exemples - Comparaison : "Il est fort <b>comme</b> un lion." Métaphore : "C\'est <b>un lion</b>" (en parlant de lui).' }),

  makeMCQ({ id:'g5fr-lec-032', chapterId:'fr-lecture', subsection:'reperage', difficulty:2,
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

  makeMCQ({ id:'g5fr-lec-033', chapterId:'fr-lecture', subsection:'reperage', difficulty:2,
    question:'Quel est l\'antonyme de "courageux" ?',
    options:['brave','timide','lâche','généreux'],
    answer:'lâche',
    hint:'"Lâche" = quelqu\'un qui manque de courage, qui a peur.',
    explanation:'"<b>lâche</b>" = cowardly (the opposite of courageous). Courageux ↔ lâche. Ne pas confondre avec "timide" (shy) qui est une caractéristique de personnalité différente. Un pompier est courageux. Quelqu\'un qui fuit le danger est lâche.' }),

  makeMCQ({ id:'g5fr-lec-034', chapterId:'fr-lecture', subsection:'reperage', difficulty:2,
    question:'Identifiez le point de vue : "Elle regarda l\'horizon et soupira."',
    options:['première personne (je)','deuxième personne (tu/vous)','troisième personne (il/elle)','quatrième personne'],
    answer:'troisième personne (il/elle)',
    hint:'"Elle" = pronom de la troisième personne.',
    explanation:'"<b>troisième personne</b>" - "Elle regarda" utilise "elle" (3ème personne du singulier). Un narrateur à la 3ème personne raconte l\'histoire de l\'extérieur. Un narrateur à la 1ère personne dirait : "Je regardai l\'horizon et soupirai."' }),

  makeMCQ({ id:'g5fr-lec-035', chapterId:'fr-lecture', subsection:'reperage', difficulty:4,
    question:'"Le soleil se couchait, peignant le ciel de rouge et d\'orange. C\'était un spectacle ___." Quel mot complète le mieux la phrase ?',
    options:['ennuyeux','splendide','ordinaire','bruyant'],
    answer:'splendide',
    hint:'Le soleil peint le ciel de couleurs vives - c\'est une belle description.',
    explanation:'"C\'était un spectacle <b>splendide</b>." - Le contexte décrit un coucher de soleil coloré et poétique ("peignant le ciel de rouge et d\'orange"). "Splendide" (= magnificent, wonderful) correspond parfaitement. "Ennuyeux" et "ordinaire" s\'opposent au contexte positif. "Bruyant" s\'applique au son, pas à la vue.' }),

);

// ── Passage C : La plage polluée ────────────────────────────────────────────
const _TEXTE_FR_C = `<div style="background:#f8fafc;border-left:4px solid #0891b2;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#164e63">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>La plage polluée</b><br><br>Un mardi matin, Nadia et Samuel se promenaient sur la plage de Belle Mare quand ils ont remarqué quelque chose d\'inquiétant : des bouteilles en plastique, des sacs et des emballages jonchaient le sable blanc. La plage, qui ressemblait normalement à un paradis, avait l\'air d\'une décharge.<br><br>Profondément choqués, ils ont décidé de parler à leur professeur, M. Bérenger. Celui-ci a organisé une grande journée de nettoyage avec toute la classe. Armés de gants et de sacs poubelle, les élèves ont ramassé plus de cinquante kilos de déchets en une seule matinée.<br><br>Ce soir-là, M. Bérenger a expliqué que les plastiques rejetés en mer empoisonnent les poissons et les oiseaux marins. Il a demandé à chacun de vérifier la plage tous les mois.<br><br>Depuis, Nadia et Samuel n\'ont plus jamais jeté un seul déchet sur la plage.</div>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-lec-036', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:`${_TEXTE_FR_C}Où se trouvaient Nadia et Samuel au début de l\'histoire ?`,
    options:['À Port Louis','À la plage de Belle Mare','Dans leur salle de classe','Dans un parc national'],
    answer:'À la plage de Belle Mare',
    hint:'Lisez la première phrase du texte.',
    explanation:'"Nadia et Samuel se promenaient sur <b>la plage de Belle Mare</b>…" — La première phrase indique clairement le lieu.' }),

  makeMCQ({ id:'g5fr-lec-037', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:`${_TEXTE_FR_C}Combien de kilos de déchets les élèves ont-ils ramassés ?`,
    options:['Dix kilos','Vingt kilos','Plus de cinquante kilos','Exactement cent kilos'],
    answer:'Plus de cinquante kilos',
    hint:'Cherchez le chiffre mentionné lors de la journée de nettoyage.',
    explanation:'"les élèves ont ramassé <b>plus de cinquante kilos</b> de déchets en une seule matinée" — Le texte donne ce chiffre précis.' }),

  makeMCQ({ id:'g5fr-lec-038', chapterId:'fr-lecture', subsection:'vocabulaire', difficulty:2,
    question:`${_TEXTE_FR_C}Que veut dire le mot "jonchaient" dans "des emballages jonchaient le sable" ?`,
    options:['Nettoyaient','Étaient éparpillés sur','Enterraient','Comptaient'],
    answer:'Étaient éparpillés sur',
    hint:'Imaginez le sable couvert de déchets partout.',
    explanation:'"des emballages <b>jonchaient</b> le sable blanc" — "Joncher" signifie <b>couvrir en étant éparpillé</b>. On dit aussi "Les feuilles mortes jonchent le sol en automne." C\'est une image forte qui montre l\'étendue de la pollution.' }),

  makeMCQ({ id:'g5fr-lec-039', chapterId:'fr-lecture', subsection:'figures_style', difficulty:2,
    question:`${_TEXTE_FR_C}Dans le texte, on compare la plage polluée à une décharge. Quelle figure de style est utilisée ?`,
    options:['Une métaphore','Une comparaison','Une personnification','Une répétition'],
    answer:'Une comparaison',
    hint:'Le texte utilise "avait l\'air de" pour relier deux choses différentes.',
    explanation:'"La plage… avait l\'air d\'<b>une décharge</b>" — C\'est une <b>comparaison</b> (le mot comparatif est "avait l\'air de"). Elle met en contraste la beauté habituelle de la plage avec son état pollué. Une métaphore dirait directement "la plage était une décharge" sans mot comparatif.' }),

  makeMCQ({ id:'g5fr-lec-040', chapterId:'fr-lecture', subsection:'inference', difficulty:2,
    question:`${_TEXTE_FR_C}Pourquoi M. Bérenger a-t-il demandé aux élèves de vérifier la plage tous les mois ?`,
    options:[
      'Pour qu\'ils fassent leur sport mensuel',
      'Pour éviter que la pollution revienne et maintenir la plage propre',
      'Parce que les pêcheurs avaient besoin d\'aide',
      'Pour préparer un reportage pour la télévision'
    ],
    answer:'Pour éviter que la pollution revienne et maintenir la plage propre',
    hint:'Pourquoi fait-on une vérification régulière ?',
    explanation:'M. Bérenger a expliqué les dangers du plastique, puis "<b>demandé à chacun de vérifier la plage tous les mois</b>". Une surveillance régulière permet d\'agir tôt si des déchets réapparaissent, évitant ainsi une nouvelle accumulation.' }),

  makeMCQ({ id:'g5fr-lec-041', chapterId:'fr-lecture', subsection:'figures_style', difficulty:3,
    question:`${_TEXTE_FR_C}"La plage, qui ressemblait normalement à un paradis, avait l\'air d\'une décharge." Quel est l\'effet de ce contraste sur le lecteur ?`,
    options:[
      'Il montre que les plages mauriciennes sont toujours propres',
      'Il souligne le choc causé par la pollution en opposant l\'idéal à la réalité',
      'Il explique pourquoi les enfants aiment aller à la plage',
      'Il décrit la beauté des plages de Belle Mare en général'
    ],
    answer:'Il souligne le choc causé par la pollution en opposant l\'idéal à la réalité',
    hint:'Pensez à ce que ressent le lecteur quand il lit "paradis" puis "décharge" dans la même phrase.',
    explanation:'Le contraste entre <b>"paradis"</b> (beau, idéal) et <b>"décharge"</b> (sale, repoussant) dans la même phrase crée un effet de choc. Cela traduit l\'émotion de Nadia et Samuel et renforce l\'idée que la pollution défigure des endroits magnifiques.' }),

  makeMCQ({ id:'g5fr-lec-042', chapterId:'fr-lecture', subsection:'inference', difficulty:3,
    question:`${_TEXTE_FR_C}Quelle leçon M. Bérenger a-t-il voulu donner aux élèves, au-delà du simple nettoyage ?`,
    options:[
      'Que les plages doivent être réservées aux adultes',
      'Que les plastiques en mer mettent en danger la vie marine et que chacun est responsable',
      'Qu\'il faut contacter la police si on voit des déchets',
      'Que Belle Mare est la plus belle plage de Maurice'
    ],
    answer:'Que les plastiques en mer mettent en danger la vie marine et que chacun est responsable',
    hint:'Lisez ce que M. Bérenger a expliqué le soir et ce qu\'il a demandé ensuite.',
    explanation:'M. Bérenger a expliqué que "<b>les plastiques rejetés en mer empoisonnent les poissons et les oiseaux marins</b>" et a demandé à chacun de surveiller la plage. Sa leçon va au-delà du nettoyage : il s\'agit de <b>responsabilité individuelle</b> face à la pollution.' }),

  makeMCQ({ id:'g5fr-lec-043', chapterId:'fr-lecture', subsection:'idee_principale', difficulty:4,
    question:`${_TEXTE_FR_C}En quoi le comportement de Nadia et Samuel à la fin du texte montre-t-il l\'effet de leur expérience ?`,
    options:[
      'Ils ont créé une association officielle contre la pollution',
      'Ils ont décidé de ne plus jamais aller à la plage',
      'Leur expérience a changé leur comportement : ils ne jettent plus jamais de déchets',
      'Ils ont demandé à M. Bérenger de recommencer le nettoyage chaque semaine'
    ],
    answer:'Leur expérience a changé leur comportement : ils ne jettent plus jamais de déchets',
    hint:'Lisez la dernière phrase du texte.',
    explanation:'"Depuis, Nadia et Samuel <b>n\'ont plus jamais jeté un seul déchet</b> sur la plage." — Cette phrase montre que leur expérience a eu un impact durable sur leurs habitudes. L\'éducation a transformé leur comportement, ce qui est le vrai message du texte.' }),

);

// ── Passage D : La fête des moissons ────────────────────────────────────────
const _TEXTE_FR_D = `<div style="background:#f8fafc;border-left:4px solid #16a34a;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#14532d">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>La fête des moissons</b><br><br>Chaque année au mois d\'avril, le village de Rivière du Rempart célèbre la fête des moissons. Les agriculteurs remercient la terre pour ses richesses : la canne à sucre, les légumes et les fruits qui ont nourri leurs familles toute l\'année.<br><br>Le matin, les habitants cuisinent ensemble. Des marmites de briani, de dholl puri et de gâteaux au miel embaument les ruelles. Chacun apporte quelque chose et les voisins partagent leurs plats avec entrain.<br><br>L\'après-midi, le grand-père de Leila, un vieil homme aux mains calleuses, s\'assoit sous les filaos et raconte l\'histoire de la première fête : comment les ancêtres ont survécu à une sécheresse grâce à une récolte miraculeuse. Les enfants écoutent, les yeux grands ouverts.<br><br>Au coucher du soleil, musique et danses emplissent la place du village. Ce soir-là, tout le monde est une grande famille.</div>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-lec-044', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:`${_TEXTE_FR_D}En quel mois a lieu la fête des moissons ?`,
    options:['En janvier','En mars','En avril','En décembre'],
    answer:'En avril',
    hint:'Lisez la première phrase du texte.',
    explanation:'"Chaque année <b>au mois d\'avril</b>, le village de Rivière du Rempart célèbre la fête des moissons." — La date est indiquée dès le début.' }),

  makeMCQ({ id:'g5fr-lec-045', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:`${_TEXTE_FR_D}Citez deux plats mentionnés dans le texte.`,
    options:[
      'Le riz frit et les nouilles',
      'Le briani et le dholl puri',
      'La soupe et le pain',
      'Le poisson grillé et la salade'
    ],
    answer:'Le briani et le dholl puri',
    hint:'Lisez le deuxième paragraphe sur la cuisine.',
    explanation:'"Des marmites de <b>briani</b>, de <b>dholl puri</b> et de gâteaux au miel embaument les ruelles." — Le briani et le dholl puri sont deux plats traditionnels mauriciens mentionnés explicitement.' }),

  makeMCQ({ id:'g5fr-lec-046', chapterId:'fr-lecture', subsection:'vocabulaire', difficulty:2,
    question:`${_TEXTE_FR_D}Que veut dire "mains calleuses" pour décrire le grand-père ?`,
    options:[
      'Des mains propres et soignées',
      'Des mains dures et rugueuses à cause du travail manuel',
      'Des mains très grandes et larges',
      'Des mains froides et pâles'
    ],
    answer:'Des mains dures et rugueuses à cause du travail manuel',
    hint:'Le grand-père est agriculteur — pensez à quel type de mains on a quand on travaille la terre.',
    explanation:'"un vieil homme aux <b>mains calleuses</b>" — Des <b>mains calleuses</b> sont dures et rugueuses, résultat d\'années de travail manuel. Les agriculteurs développent des callosités à force de manier des outils. Cela montre que le grand-père a travaillé dur toute sa vie.' }),

  makeMCQ({ id:'g5fr-lec-047', chapterId:'fr-lecture', subsection:'inference', difficulty:2,
    question:`${_TEXTE_FR_D}Pourquoi les agriculteurs célèbrent-ils la fête des moissons ?`,
    options:[
      'Pour marquer la fin de l\'année scolaire',
      'Pour remercier la terre pour les richesses qu\'elle leur a données',
      'Pour accueillir des touristes dans le village',
      'Pour vendre leurs produits au meilleur prix'
    ],
    answer:'Pour remercier la terre pour les richesses qu\'elle leur a données',
    hint:'Lisez la fin de la première phrase du texte.',
    explanation:'"Les agriculteurs <b>remercient la terre</b> pour ses richesses : la canne à sucre, les légumes et les fruits qui ont nourri leurs familles toute l\'année." — La fête est un acte de <b>gratitude envers la nature</b>.' }),

  makeMCQ({ id:'g5fr-lec-048', chapterId:'fr-lecture', subsection:'figures_style', difficulty:3,
    question:`${_TEXTE_FR_D}"Ce soir-là, tout le monde est une grande famille." Identifiez la figure de style et expliquez son sens.`,
    options:[
      'Une comparaison — les gens ont tous les mêmes parents',
      'Une métaphore — elle exprime la solidarité et l\'unité des habitants du village',
      'Une personnification — la famille prend la parole dans le texte',
      'Une hyperbole — les habitants ont vraiment trop de familles'
    ],
    answer:'Une métaphore — elle exprime la solidarité et l\'unité des habitants du village',
    hint:'Le texte ne dit pas "comme une famille" — c\'est une affirmation directe.',
    explanation:'"tout le monde est <b>une grande famille</b>" est une <b>métaphore</b> (affirmation directe sans "comme" ni "ressemble à"). Elle exprime l\'idée que lors de cette fête, les habitants du village partagent, s\'entraident et vivent comme une seule famille unie, même s\'ils n\'ont pas de lien de sang.' }),

  makeMCQ({ id:'g5fr-lec-049', chapterId:'fr-lecture', subsection:'inference', difficulty:3,
    question:`${_TEXTE_FR_D}Quel est le rôle du grand-père dans cette fête ?`,
    options:[
      'Il organise les danses et la musique',
      'Il distribue la nourriture aux enfants',
      'Il transmet l\'histoire et les traditions orales aux jeunes générations',
      'Il représente le village auprès des autorités'
    ],
    answer:'Il transmet l\'histoire et les traditions orales aux jeunes générations',
    hint:'Que fait-il l\'après-midi, sous les filaos ?',
    explanation:'"le grand-père de Leila… <b>raconte l\'histoire de la première fête</b> : comment les ancêtres ont survécu à une sécheresse…" — Son rôle est de <b>transmettre la mémoire collective</b> et les traditions aux enfants qui "écoutent, les yeux grands ouverts". C\'est la tradition de la transmission orale.' }),

  makeMCQ({ id:'g5fr-lec-050', chapterId:'fr-lecture', subsection:'idee_principale', difficulty:4,
    question:`${_TEXTE_FR_D}En quoi cette fête illustre-t-elle les valeurs de la société mauricienne selon le texte ?`,
    options:[
      'Elle montre que les Mauriciens préfèrent les fêtes religieuses aux fêtes culturelles',
      'Elle illustre le partage, la gratitude envers la nature et la transmission des traditions entre générations',
      'Elle prouve que l\'agriculture est la principale activité économique de Maurice',
      'Elle démontre que les habitants de Rivière du Rempart sont les plus joyeux de l\'île'
    ],
    answer:'Elle illustre le partage, la gratitude envers la nature et la transmission des traditions entre générations',
    hint:'Pensez à tout ce qui se passe dans le texte : la nourriture partagée, les remerciements, les histoires racontées.',
    explanation:'Le texte montre trois valeurs clés : 1) <b>la gratitude</b> (remercier la terre), 2) <b>le partage et la solidarité</b> (chacun apporte quelque chose, les voisins partagent), 3) <b>la transmission des traditions</b> (le grand-père raconte l\'histoire aux enfants). Ces trois éléments reflètent l\'esprit communautaire mauricien.' })

);

// ── Passage E : Le jardin scolaire ──────────────────────────────────────────
const _TEXTE_FR_E = `<div style="background:#f8fafc;border-left:4px solid #a855f7;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7;color:#0f172a"><b style="color:#6b21a8">Lisez le texte attentivement, puis répondez aux questions.</b><br><br><b>Le jardin scolaire</b><br><br>Cette année, les élèves de la classe de Mme Ramkissoon ont décidé de créer un jardin potager dans un coin inutilisé de la cour d\'école.<br><br>Au mois de mars, ils ont préparé la terre, enlevé les mauvaises herbes et creusé des sillons. Ils ont planté des tomates, des haricots et des herbes aromatiques comme la coriandre et le thym.<br><br>Chaque groupe d\'élèves est responsable d\'un jour d\'arrosage. « Comme de vrais petits agriculteurs ! » plaisante Mme Ramkissoon. Elle leur explique aussi comment les plantes fabriquent leur propre nourriture grâce à la photosynthèse.<br><br>En juin, la première récolte a été magnifique. Les tomates bien rouges et les haricots verts ont été confiés à la cantine. Le chef cuisinier les a utilisés pour préparer un rougail tomates pour toute l\'école.<br><br>Si chaque école à Maurice créait son jardin, les enfants apprendraient à respecter la nature et à mieux manger.</div>`;

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5fr-lec-051', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:`${_TEXTE_FR_E}Quels légumes et herbes les élèves ont-ils plantés ?`,
    options:[
      'Des pommes de terre, des carottes et de la menthe',
      'Des tomates, des haricots et des herbes aromatiques',
      'Du maïs, des haricots et du persil',
      'Des tomates, des aubergines et du basilic'
    ],
    answer:'Des tomates, des haricots et des herbes aromatiques',
    hint:'Cherchez la liste dans le deuxième paragraphe.',
    explanation:'"Ils ont planté des <b>tomates</b>, des <b>haricots</b> et des <b>herbes aromatiques</b> comme la coriandre et le thym." — La liste est donnée clairement dans le deuxième paragraphe.' }),

  makeMCQ({ id:'g5fr-lec-052', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:`${_TEXTE_FR_E}En quel mois les élèves ont-ils préparé la terre ?`,
    options:['En janvier','En mars','En juin','En septembre'],
    answer:'En mars',
    hint:'Le deuxième paragraphe mentionne le mois précis.',
    explanation:'"<b>Au mois de mars</b>, ils ont préparé la terre…" — Mars marque le début des travaux de jardinage. La récolte a eu lieu en juin, trois mois plus tard.' }),

  makeMCQ({ id:'g5fr-lec-053', chapterId:'fr-lecture', subsection:'reperage', difficulty:1,
    question:`${_TEXTE_FR_E}Quel processus Mme Ramkissoon explique-t-elle aux élèves ?`,
    options:['La germination des graines','La rotation des cultures','La photosynthèse','Le compostage'],
    answer:'La photosynthèse',
    hint:'Cherchez le mot scientifique utilisé dans le troisième paragraphe.',
    explanation:'"Elle leur explique aussi comment les plantes fabriquent leur propre nourriture grâce à la <b>photosynthèse</b>." — Ce processus transforme la lumière du soleil, l\'eau et le dioxyde de carbone en sucres nourrissants.' }),

  makeMCQ({ id:'g5fr-lec-054', chapterId:'fr-lecture', subsection:'vocabulaire', difficulty:2,
    question:`${_TEXTE_FR_E}Que veut dire "un jardin potager" dans ce texte ?`,
    options:[
      'Un jardin décoratif avec des fleurs',
      'Un jardin où l\'on cultive des légumes',
      'Un grand parc public ouvert à tous',
      'Un jardin avec des plantes médicinales uniquement'
    ],
    answer:'Un jardin où l\'on cultive des légumes',
    hint:'Le texte mentionne des tomates, des haricots et des herbes — des aliments.',
    explanation:'"Potager" vient du mot "potage" (soupe). Un <b>jardin potager</b> est un jardin où l\'on fait pousser des <b>légumes et des herbes</b> destinés à la consommation. Le contexte confirme : tomates, haricots, coriandre, thym — tous des aliments.' }),

  makeMCQ({ id:'g5fr-lec-055', chapterId:'fr-lecture', subsection:'vocabulaire', difficulty:2,
    question:`${_TEXTE_FR_E}Dans "ils ont creusé des sillons", que veut dire "des sillons" ?`,
    options:[
      'Des pots en terre cuite',
      'Des petites tranchées creusées dans la terre pour planter les graines',
      'Des étiquettes pour identifier les plantes',
      'Des trous remplis d\'eau pour arroser'
    ],
    answer:'Des petites tranchées creusées dans la terre pour planter les graines',
    hint:'Le contexte indique qu\'ils ont "préparé la terre, enlevé les mauvaises herbes et creusé des sillons" avant de planter.',
    explanation:'Un <b>sillon</b> est une petite rainure ou tranchée creusée dans la terre dans laquelle on dépose les graines. Cette technique permet d\'aligner les plantations et de contrôler l\'espacement entre les plantes.' }),

  makeMCQ({ id:'g5fr-lec-056', chapterId:'fr-lecture', subsection:'inference', difficulty:2,
    question:`${_TEXTE_FR_E}Pourquoi chaque groupe est-il "responsable d\'un jour d\'arrosage" ?`,
    options:[
      'Parce qu\'il n\'y a pas assez d\'eau pour arroser tous les jours',
      'Pour partager le travail équitablement et apprendre la responsabilité',
      'Parce que les plantes ne doivent être arrosées qu\'une fois par semaine',
      'Parce que la maîtresse n\'a pas le temps de faire l\'arrosage elle-même'
    ],
    answer:'Pour partager le travail équitablement et apprendre la responsabilité',
    hint:'Pensez à ce que ce projet d\'école cherche à apprendre aux élèves.',
    explanation:'Le texte précise que ce jardin est un projet d\'apprentissage. Chaque groupe ayant son jour d\'arrosage, c\'est une façon de <b>partager les tâches équitablement</b> et de donner à chaque élève le sens de la <b>responsabilité</b> — si son groupe n\'arrose pas, les plantes souffrent.' }),

  makeMCQ({ id:'g5fr-lec-057', chapterId:'fr-lecture', subsection:'figures_style', difficulty:3,
    question:`${_TEXTE_FR_E}"Comme de vrais petits agriculteurs !" — quelle figure de style est utilisée ici ?`,
    options:['Une métaphore','Une comparaison','Une personnification','Une hyperbole'],
    answer:'Une comparaison',
    hint:'Le mot "comme" est la clé pour identifier cette figure de style.',
    explanation:'"Comme de vrais petits agriculteurs" est une <b>comparaison</b> : elle utilise le mot "<b>comme</b>" pour rapprocher les élèves et de vrais agriculteurs. Si le texte avait dit "Ce sont de vrais petits agriculteurs", ce serait une métaphore.' }),

  makeMCQ({ id:'g5fr-lec-058', chapterId:'fr-lecture', subsection:'inference', difficulty:3,
    question:`${_TEXTE_FR_E}Qu\'est devenue la récolte de juin selon le texte ?`,
    options:[
      'Les élèves l\'ont rapportée chez eux',
      'Elle a été vendue au marché pour financer le jardin',
      'Elle a été donnée à la cantine pour préparer un plat pour toute l\'école',
      'Elle a été mise de côté pour la prochaine saison de plantation'
    ],
    answer:'Elle a été donnée à la cantine pour préparer un plat pour toute l\'école',
    hint:'Lisez le quatrième paragraphe pour trouver ce qu\'il est advenu des légumes.',
    explanation:'"Les tomates bien rouges et les haricots verts ont été confiés à <b>la cantine</b>. Le chef cuisinier les a utilisés pour préparer un <b>rougail tomates pour toute l\'école</b>." — La récolte a profité à l\'ensemble de l\'établissement, pas seulement à la classe.' }),

  makeMCQ({ id:'g5fr-lec-059', chapterId:'fr-lecture', subsection:'grammaire', difficulty:4,
    question:`${_TEXTE_FR_E}Dans la dernière phrase "Si chaque école créait son jardin, les enfants apprendraient…", quel temps est utilisé après "si" et que cela exprime-t-il ?`,
    options:[
      'Le présent — une action qui se passe maintenant',
      'L\'imparfait — une hypothèse sur quelque chose qui pourrait arriver',
      'Le passé composé — une action déjà réalisée',
      'Le futur — une certitude sur ce qui se passera'
    ],
    answer:'L\'imparfait — une hypothèse sur quelque chose qui pourrait arriver',
    hint:'La structure "Si + imparfait + conditionnel" exprime une condition hypothétique.',
    explanation:'"Si chaque école <b>créait</b>" → l\'imparfait après "si" indique une <b>hypothèse</b> (ce n\'est pas encore réel). Le conditionnel "apprendraient" montre la conséquence possible. Cette structure (Si + imparfait → conditionnel présent) exprime un <b>souhait ou une suggestion</b> de l\'auteur.' }),

  makeMCQ({ id:'g5fr-lec-060', chapterId:'fr-lecture', subsection:'idee_principale', difficulty:4,
    question:`${_TEXTE_FR_E}Selon ce texte, quels sont les deux bénéfices principaux d\'un jardin scolaire ?`,
    options:[
      'Gagner de l\'argent en vendant les légumes et réduire les dépenses de la cantine',
      'Apprendre des connaissances scientifiques (photosynthèse, agriculture) et développer de bonnes habitudes alimentaires',
      'Occuper les élèves pendant la récréation et décorer la cour d\'école',
      'Prouver que l\'agriculture est la meilleure profession et encourager les élèves à devenir fermiers'
    ],
    answer:'Apprendre des connaissances scientifiques (photosynthèse, agriculture) et développer de bonnes habitudes alimentaires',
    hint:'Pensez à ce que les élèves apprennent (en classe, dehors) et à ce que dit la dernière phrase.',
    explanation:'Le texte montre deux bénéfices : 1) <b>l\'apprentissage scientifique</b> (Mme Ramkissoon explique la photosynthèse, les élèves apprennent les techniques agricoles) ; 2) <b>manger sainement</b> (la dernière phrase : "les enfants apprendraient à respecter la nature et à mieux manger"). La récolte qui finit en rougail pour toute l\'école illustre ce deuxième bénéfice.' })
);
