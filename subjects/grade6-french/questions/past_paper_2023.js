'use strict';
// PSAC Grade 6 French 2023 — past-paper questions adapted to MCQ format.
// Source: MES Primary School Achievement Certificate Assessment 2023, French P130.
// Q2 (grammar fill-in) + Q3B (vocabulary) + Q4B MCQs → STATIC_QUESTIONS.

STATIC_QUESTIONS.push(

  // ── Q2 : Grammar fill-in (10 marks) ──────────────────────────────────────

  makeMCQ({ id:'g6fr-pp23-001', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:1,
    question:'Les singes descendent ……………… la montagne.',
    options:['du','de','un','une'], answer:'de',
    hint:'Cherche si le mot « montagne » est masculin ou féminin pour trouver la bonne contraction.',
    explanation:'<em>Descendre de</em> la montagne. Devant « la montagne » (féminin), on écrit <em>de la</em> : le blanc = <em>de</em>.' }),

  makeMCQ({ id:'g6fr-pp23-002', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:1,
    question:'……………… surprise ! Je te croyais encore à Paris.',
    options:['Quelles','Quels','Quel','Quelle'], answer:'Quelle',
    hint:'Identifie le genre et le nombre du nom « surprise » pour choisir le bon adjectif exclamatif.',
    explanation:'<em>Quelle</em> s\'accorde avec le nom féminin singulier <em>surprise</em>. (Quel/beau/belle/beaux/belles : même logique.)' }),

  makeMCQ({ id:'g6fr-pp23-003', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:1,
    question:'Bravo ! Tu ……………… réussi tes examens.',
    options:['as','a','es','ai'], answer:'as',
    hint:'Quel est l\'auxiliaire de « réussir » et comment se conjugue-t-il avec le sujet « tu » ?',
    explanation:'Passé composé de <em>réussir</em> : tu <em>as</em> réussi. (Réussir prend l\'auxiliaire avoir.)' }),

  makeMCQ({ id:'g6fr-pp23-004', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'Ce tableau a été acheté ……………… mon oncle.',
    options:['en','par','après','depuis'], answer:'par',
    hint:'Reconnais la structure passive de la phrase et cherche la préposition qui introduit l\'auteur de l\'action.',
    explanation:'Dans la voix passive, le complément d\'agent se construit avec <em>par</em> : acheté <em>par</em> mon oncle.' }),

  makeMCQ({ id:'g6fr-pp23-005', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:1,
    question:'Ma mère et moi ……………… avec des amis ce soir.',
    options:['sors','sort','sortons','sortent'], answer:'sortons',
    hint:'Identifie à quelle personne grammaticale équivaut « ma mère et moi » et conjugue « sortir » en conséquence.',
    explanation:'<em>Ma mère et moi</em> = <em>nous</em>. Sortir au présent : nous <em>sortons</em>.' }),

  makeMCQ({ id:'g6fr-pp23-006', chapterId:'g6fr-subordonnees', subsection:'analyse', difficulty:2,
    question:'La fille ……………… tu vois est la sœur de mon meilleur ami.',
    options:['qui','que','quoi','dont'], answer:'que',
    hint:'La fille est-elle sujet ou complément du verbe « vois » dans la proposition relative ?',
    explanation:'<em>Que</em> est le pronom relatif COD (complément d\'objet direct). Tu vois <em>qui</em> ? → la fille <em>que</em> tu vois.' }),

  makeMCQ({ id:'g6fr-pp23-007', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'……………… de fumer dans les espaces publics !',
    options:['Défense','Défendre','Défendu','Défend'], answer:'Défense',
    hint:'Expression figée : « ……… de + infinitif » = il est interdit de.',
    explanation:'<em>Défense de</em> + infinitif est une expression d\'interdiction (équivaut à « il est interdit de »).' }),

  makeMCQ({ id:'g6fr-pp23-008', chapterId:'g6fr-subordonnees', subsection:'analyse', difficulty:2,
    question:'L\'endroit ……………… tu habites est magnifique.',
    options:['y','où','chez','à'], answer:'où',
    hint:'Tu cherches un mot qui peut introduire une proposition relative indiquant un lieu.',
    explanation:'<em>Où</em> est le pronom relatif de lieu (et de temps). L\'endroit <em>où</em> tu habites = dans lequel tu habites.' }),

  makeMCQ({ id:'g6fr-pp23-009', chapterId:'g6fr-imparfait', subsection:'formation', difficulty:1,
    question:'Autrefois, les gens ……………… dans les maisons en paille.',
    options:['vivront','vivent','vivaient','vécus'], answer:'vivaient',
    hint:'Cherche le mot qui indique le temps dans la phrase. Décris-il une habitude ou un événement ponctuel dans le passé ?',
    explanation:'<em>Autrefois</em> signale une action habituelle dans le passé → imparfait : <em>vivaient</em>.' }),

  makeMCQ({ id:'g6fr-pp23-010', chapterId:'g6fr-futur', subsection:'formation', difficulty:2,
    question:'Pierre rendra visite à Anne ……………… il ira à Curepipe.',
    options:['pendant','avant','tant','quand'], answer:'quand',
    hint:'La phrase contient deux actions futures liées par le temps → conjonction de temps.',
    explanation:'<em>Quand</em> + futur simple pour une action future : Pierre rendra visite <em>quand</em> il ira à Curepipe.' }),

  // ── Q3B : Vocabulaire MCQ (5 marks) ──────────────────────────────────────

  makeMCQ({ id:'g6fr-pp23-011', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'C\'est ……………… ! Je n\'ai jamais dit une telle chose.',
    options:['faible','féroce','faux','fade'], answer:'faux',
    hint:'Quelqu\'un nie avoir dit quelque chose → ce que l\'autre affirme est ……….',
    explanation:'<em>Faux</em> = contraire de vrai. Ce n\'est pas vrai = c\'est <em>faux</em>.' }),

  makeMCQ({ id:'g6fr-pp23-012', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'Luc est furieux. Il crie de ……………….',
    options:['joie','tristesse','peur','rage'], answer:'rage',
    hint:'Quelqu\'un de furieux ressent une émotion très forte et négative.',
    explanation:'<em>La rage</em> est une colère violente. Quelqu\'un de furieux crie de <em>rage</em>.' }),

  makeMCQ({ id:'g6fr-pp23-013', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'Pour ……………… en bonne santé, il est nécessaire de faire de l\'exercice.',
    options:['dormir','être','venir','avoir'], answer:'être',
    hint:'L\'exercice aide à maintenir sa ……….',
    explanation:'On fait de l\'exercice pour <em>être</em> en bonne santé. « Pour + infinitif » exprime le but.' }),

  makeMCQ({ id:'g6fr-pp23-014', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'La randonnée était ……………… en raison des nombreux obstacles sur le parcours.',
    options:['difficile','facile','favorable','agréable'], answer:'difficile',
    hint:'Des obstacles nombreux rendent un parcours ………….',
    explanation:'Des obstacles rendent la randonnée <em>difficile</em>, pas facile ou agréable.' }),

  makeMCQ({ id:'g6fr-pp23-015', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'Je me suis levé en sursaut avec la ……………… du réveille-matin.',
    options:['pâtisserie','menuiserie','broderie','sonnerie'], answer:'sonnerie',
    hint:'Ce que produit un réveille-matin pour signaler l\'heure.',
    explanation:'Un réveille-matin émet une <em>sonnerie</em> (bruit d\'alarme) pour réveiller.' }),

  // ── Q4B : Compréhension MCQ — «&nbsp;Mon chou&nbsp;» (Mme Michat et Sam) ──

  makeMCQ({ id:'g6fr-pp23-016', chapterId:'g6fr-textes', subsection:'recit', difficulty:2,
    question:'<em>Mme Michat appelle toujours son fils Sam « mon chou ». Sam a horreur de ce nom.</em><br><br>Sam n\'aime pas être comparé à ……………….',
    options:['une boisson','un légume','une fleur','un fruit'], answer:'un légume',
    hint:'Réfléchis aux quatre catégories proposées et à laquelle appartient un chou dans la cuisine.',
    explanation:'Un <em>chou</em> est un légume. Sam n\'aime pas être comparé à <em>un légume</em>.' }),

  makeMCQ({ id:'g6fr-pp23-017', chapterId:'g6fr-textes', subsection:'recit', difficulty:2,
    question:'<em>Mme Michat lave des assiettes dans l\'évier pendant que son fils prend son petit déjeuner.</em><br><br>Que lave Mme Michat dans l\'évier ?',
    options:['Des patates','Des assiettes','Des choux','Des serviettes'], answer:'Des assiettes',
    hint:'Le texte le dit directement.',
    explanation:'Le texte précise que Mme Michat <em>lave des assiettes</em> dans l\'évier.' }),

  makeMCQ({ id:'g6fr-pp23-018', chapterId:'g6fr-textes', subsection:'recit', difficulty:2,
    question:'<em>Mme Michat se retourne et pousse un cri d\'effroi : à la place de son fils, sur la chaise, il y a un chou !</em><br><br>« Mme Michat se retourne et pousse un cri d\'effroi. » Pourquoi ?',
    options:['Elle est effrayée.','Elle est heureuse.','Elle est soulagée.','Elle est découragée.'], answer:'Elle est effrayée.',
    hint:'Pense à l\'émotion que ressent quelqu\'un qui pousse un cri en voyant quelque chose d\'inattendu.',
    explanation:'L\'<em>effroi</em> est une grande peur. Mme Michat pousse un cri parce qu\'elle est <em>effrayée</em>.' }),

  makeMCQ({ id:'g6fr-pp23-019', chapterId:'g6fr-textes', subsection:'recit', difficulty:2,
    question:'<em>Elle prend le chou dans ses bras, le caresse, le cajole, l\'embrasse, le console.</em><br><br>Pourquoi prend-elle le chou dans ses bras ?',
    options:['Pour le cuisiner.','Pour le découper.','Pour le consoler.','Pour le manger.'], answer:'Pour le consoler.',
    hint:'Elle le caresse et l\'embrasse comme si c\'était son fils.',
    explanation:'Elle le caresse, le cajole, le console → elle prend le chou dans ses bras <em>pour le consoler</em> (elle croit que c\'est son fils transformé).' }),

  makeMCQ({ id:'g6fr-pp23-020', chapterId:'g6fr-textes', subsection:'recit', difficulty:2,
    question:'<em>L\'instituteur regarde Mme Michat d\'un air surpris et dit : « Mais oui, Mme Michat. Vous feriez mieux de rentrer chez vous. »</em><br><br>Que ressent l\'instituteur en voyant le chou ?',
    options:['Il est étonné.','Il est en colère.','Il est satisfait.','Il est content.'], answer:'Il est étonné.',
    hint:'L\'instituteur ne s\'attendait pas à voir cela — quelle réaction cela provoque-t-il ?',
    explanation:'L\'instituteur regarde d\'un <em>air surpris</em> → il est <em>étonné</em> de voir Mme Michat arriver avec un chou.' })

);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g6fr-pp23-pdf-001', chapterId:'g6fr-textes', marks:10, year:2023, grade:6, subject:'French',
    question:'Q4A — Lis le texte « Le jamblon » et réponds : Vrai/Faux (le jamblon est très connu), un autre nom du jamblon, une maladie traitée, deux pays d\'origine du jamelonier, taille/durée de vie du jamelonier, fruit similaire, couleur à maturité, une caractéristique de sa peau.', type:'short' },
  { id:'g6fr-pp23-pdf-002', chapterId:'g6fr-textes', marks:15, year:2023, grade:6, subject:'French',
    question:'Q4B — Réponds aux questions sur le texte « Mon chou » (Mme Michat et Sam) : Q6 = pourquoi se dépêcher ; Q7 = pourquoi Sam ne répond pas ; Q8 = deux raisons d\'aller à l\'école ; Q9 = un adjectif qui décrit Sam ; Q10 = un adjectif qui décrit Mme Michat ; Q11 = remettre 4 événements dans l\'ordre.', type:'short' }
);
