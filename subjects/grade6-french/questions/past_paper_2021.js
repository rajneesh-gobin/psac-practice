'use strict';
// PSAC Grade 6 French March 2021 — past-paper questions adapted to MCQ format.
// Source: MES Primary School Achievement Certificate Assessment, March 2021, French P130.

STATIC_QUESTIONS.push(

  // ── Q2 : Grammar fill-in (10 marks) ──────────────────────────────────────

  makeMCQ({ id:'g6fr-pp21-001', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:1,
    question:'Pauline est contente. Elle a retrouvé ……………… chat.',
    options:['sa','son','ses','se'], answer:'son',
    hint:'Cherche le genre et le nombre de « chat » pour choisir le bon adjectif possessif.',
    explanation:'<em>Chat</em> est masculin singulier → adjectif possessif <em>son</em>. (Sa/son/ses → accord avec le nom, pas le possesseur.)' }),

  makeMCQ({ id:'g6fr-pp21-002', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:1,
    question:'Grand-père a trouvé une chenille ……………… la papaye.',
    options:['dans','pour','sans','par'], answer:'dans',
    hint:'La chenille se trouve à l\'intérieur du fruit.',
    explanation:'La chenille est <em>dans</em> la papaye (à l\'intérieur).' }),

  makeMCQ({ id:'g6fr-pp21-003', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'Le perroquet est un ……………… oiseau.',
    options:['beau','belle','bel','beaux'], answer:'bel',
    hint:'L\'adjectif « beau » a une forme spéciale devant un nom masculin qui commence par une voyelle.',
    explanation:'Devant un nom masculin singulier commençant par une voyelle, on utilise <em>bel</em> : un <em>bel</em> oiseau.' }),

  makeMCQ({ id:'g6fr-pp21-004', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:1,
    question:'……………… coûte sa nouvelle montre ?',
    options:['Pourquoi','Qui','Combien','Où'], answer:'Combien',
    hint:'On demande le prix → quel mot interrogatif ?',
    explanation:'<em>Combien</em> s\'utilise pour demander une quantité ou un prix.' }),

  makeMCQ({ id:'g6fr-pp21-005', chapterId:'g6fr-futur', subsection:'formation', difficulty:1,
    question:'Ton cousin et toi ……………… en voyage cette année.',
    options:['partiront','partirez','partirai','partirons'], answer:'partirez',
    hint:'Identifie la personne grammaticale de « ton cousin et toi » pour conjuguer au futur.',
    explanation:'<em>Ton cousin et toi</em> = <em>vous</em>. Partir au futur simple : vous <em>partirez</em>.' }),

  makeMCQ({ id:'g6fr-pp21-006', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:1,
    question:'N\'oublie pas de ……………… le robinet quand tu te brosses les dents.',
    options:['fermé','fermais','fermer','fermez'], answer:'fermer',
    hint:'Après « de », on utilise l\'infinitif du verbe.',
    explanation:'La préposition <em>de</em> est toujours suivie de l\'infinitif : n\'oublie pas <em>de fermer</em>.' }),

  makeMCQ({ id:'g6fr-pp21-007', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:1,
    question:'Elle devra choisir entre le football ……………… le tennis.',
    options:['et','mais','car','ni'], answer:'et',
    hint:'La construction « entre A __ B » utilise quelle conjonction ?',
    explanation:'En français, « entre A <em>et</em> B » : choisir entre le football <em>et</em> le tennis.' }),

  makeMCQ({ id:'g6fr-pp21-008', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'Jay voit un mendiant sur le parking. Il ……………… donne une pièce.',
    options:['le','lui','leur','la'], answer:'lui',
    hint:'Identifie le rôle du pronom : remplace-t-il un COD ou un COI ?',
    explanation:'<em>Lui</em> est le pronom COI singulier (complément d\'objet indirect) : il <em>lui</em> donne une pièce.' }),

  makeMCQ({ id:'g6fr-pp21-009', chapterId:'g6fr-subordonnees', subsection:'analyse', difficulty:2,
    question:'Le sari ……………… porte la mariée est en soie.',
    options:['qui','que','quoi','dont'], answer:'que',
    hint:'Analyse si le sari est sujet ou objet du verbe « porte » dans la subordonnée.',
    explanation:'<em>Que</em> (COD) remplace « le sari » : le sari <em>que</em> porte la mariée. (Que = objet ; qui = sujet.)' }),

  makeMCQ({ id:'g6fr-pp21-010', chapterId:'g6fr-imparfait', subsection:'formation', difficulty:1,
    question:'Autrefois le train ……………… la canne jusqu\'au moulin.',
    options:['transporte','transportera','transporter','transportait'], answer:'transportait',
    hint:'Quel mot-clé indique le temps et le type d\'action — habituelle ou ponctuelle — dans cette phrase ?',
    explanation:'<em>Autrefois</em> exprime une habitude passée → imparfait : <em>transportait</em>.' }),

  // ── Q3B : Vocabulaire MCQ (5 marks) ──────────────────────────────────────

  makeMCQ({ id:'g6fr-pp21-011', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'Mon thé est trop fade. Je vais y ajouter du ……………….',
    options:['sel','poivre','sucre','piment'], answer:'sucre',
    hint:'Le thé est fade — quelle saveur lui manque-t-il pour être plus agréable à boire ?',
    explanation:'Un thé fade manque de saveur. Pour le rendre moins fade et plus agréable, on y ajoute du <em>sucre</em>.' }),

  makeMCQ({ id:'g6fr-pp21-012', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'Le ……………… est tombé de son cheval pendant la course.',
    options:['boutiquier','facteur','chauffeur','jockey'], answer:'jockey',
    hint:'Quel professionnel monte à cheval pendant une course ?',
    explanation:'Un <em>jockey</em> est un cavalier professionnel qui monte des chevaux lors des courses hippiques.' }),

  makeMCQ({ id:'g6fr-pp21-013', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'Le couloir est trop ………………. Les visiteurs doivent y passer l\'un après l\'autre.',
    options:['étroit','large','profond','haut'], answer:'étroit',
    hint:'Si les visiteurs ne peuvent pas passer côte à côte, quel adjectif décrit le couloir ?',
    explanation:'<em>Étroit</em> = peu large. Un couloir trop étroit oblige à passer en file indienne.' }),

  makeMCQ({ id:'g6fr-pp21-014', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'On dit que le dodo ne pouvait pas ……………… à cause de ses petites ailes.',
    options:['chanter','voler','courir','ramper'], answer:'voler',
    hint:'Les ailes servent normalement à quelle action ?',
    explanation:'Les ailes servent à <em>voler</em>. Le dodo avait de trop petites ailes pour voler.' }),

  makeMCQ({ id:'g6fr-pp21-015', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'Comme il y a des inondations, l\'école restera fermée ……………… mardi prochain.',
    options:['depuis','jusqu\'à','dans','pour'], answer:'jusqu\'à',
    hint:'L\'école est fermée de maintenant ……… (limite) mardi prochain.',
    explanation:'<em>Jusqu\'à</em> indique la limite dans le temps : fermée <em>jusqu\'à</em> mardi prochain.' }),

  // ── Q4B : Compréhension MCQ — « Renard et les marchands » ───────

  makeMCQ({ id:'g6fr-pp21-016', chapterId:'g6fr-textes', subsection:'recit', difficulty:2,
    question:'<em>Un matin d\'hiver, Renard sort de sa tanière. L\'animal a faim, mais ne trouve rien à manger dans ce désert blanc.</em><br><br>Renard habite dans',
    options:['une charrette.','une tanière.','un panier.','un village.'], answer:'une tanière.',
    hint:'Le texte précise le type d\'abri de Renard dès la première phrase.',
    explanation:'Le texte dit : « Renard sort de sa <em>tanière</em>. » (Abri creusé dans le sol.)' }),

  makeMCQ({ id:'g6fr-pp21-017', chapterId:'g6fr-textes', subsection:'recit', difficulty:2,
    question:'<em>Renard voit passer une charrette avec deux marchands qui vendent du poisson. « Renard ne peut pas laisser passer cette chance. Il faut réfléchir et agir vite ! »</em><br><br>La charrette qui passe est une chance pour Renard de',
    options:['réfléchir.','mourir.','se coucher.','se nourrir.'], answer:'se nourrir.',
    hint:'Renard a faim → il veut saisir cette chance pour ……….',
    explanation:'Renard est affamé → la charrette de poissons est une chance de <em>se nourrir</em>.' }),

  makeMCQ({ id:'g6fr-pp21-018', chapterId:'g6fr-textes', subsection:'recit', difficulty:2,
    question:'<em>Un des hommes dit : « Méfions-nous, c\'est peut-être encore un de ses tours. »</em><br><br>Les marchands se méfient de Renard car il a l\'habitude de',
    options:['jouer des tours.','retenir son souffle.','manger du poisson.','dormir sur la route.'], answer:'jouer des tours.',
    hint:'Pourquoi l\'un des marchands dit-il « méfions-nous » ?',
    explanation:'Le marchand se méfie parce que Renard a l\'habitude de <em>jouer des tours</em> (= faire des ruses).' }),

  makeMCQ({ id:'g6fr-pp21-019', chapterId:'g6fr-textes', subsection:'recit', difficulty:2,
    question:'<em>Surpris, les deux hommes réalisent que Renard les a trompés. Inutile de le poursuivre : il est déjà hors de vue.</em><br><br>À la fin, les marchands ne poursuivent pas Renard parce qu\'ils',
    options:['ont peur de lui.','ne le voient plus.','ont encore quelques anguilles.','sont pressés.'], answer:'ne le voient plus.',
    hint:'Le texte dit « inutile de le poursuivre : il est déjà ……… ».',
    explanation:'Renard est déjà <em>hors de vue</em> (= on ne le voit plus) → inutile de courir après lui.' }),

  makeMCQ({ id:'g6fr-pp21-020', chapterId:'g6fr-textes', subsection:'recit', difficulty:2,
    question:'<em>La ruse de Renard a marché. Il dévore les délicieux poissons l\'un après l\'autre pendant que nos deux marchands ne se doutent de rien.</em><br><br>D\'après l\'histoire, Renard est',
    options:['égoïste.','têtu.','malin.','peureux.'], answer:'malin.',
    hint:'Il réussit à tromper les marchands grâce à son intelligence.',
    explanation:'Renard invente une ruse brillante → il est <em>malin</em> (= rusé, intelligent).' })

);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g6fr-pp21-pdf-001', chapterId:'g6fr-textes', marks:10, year:2021, grade:6, subject:'French',
    question:'Q4A — Lis le texte sur la Trochetia Boutoniana (fleur nationale de Maurice) et complète la fiche : nom, type de fleur, botaniste, hauteur, saison de floraison, couleur, forme, climat, lieu précis, activité organisée.', type:'short' },
  { id:'g6fr-pp21-pdf-002', chapterId:'g6fr-textes', marks:15, year:2021, grade:6, subject:'French',
    question:'Q4B — Réponds aux questions sur « Renard et les marchands » (Roman de Renart) : Q6 = pourquoi Renard marche tristement ; Q7 = comment il sait qu\'il y a du poisson ; Q8 = que vont faire les marchands de l\'animal ; Q9 = pourquoi il est prudent en se levant ; Q10 = ce qu\'il fait dans la charrette ; Q11 = mot montrant que les marchands ne s\'attendent pas à le voir vivant ; Q12 = remettre 4 actions dans l\'ordre.', type:'short' }
);
