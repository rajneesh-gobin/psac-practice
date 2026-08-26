'use strict';
// PSAC Grade 6 French 2021-2022 — past-paper questions adapted to MCQ format.
// Source: MES Primary School Achievement Certificate Assessment 2021-2022, French P130.
// (This is the combined/delayed PSAC session. Folder year: 2022.)

STATIC_QUESTIONS.push(

  // ── Q2 : Grammar fill-in (10 marks) ──────────────────────────────────────

  makeMCQ({ id:'g6fr-pp22-001', chapterId:'g6fr-lecture', difficulty:1,
    question:'Des pêcheurs ont vu ……………… requin dans le lagon.',
    options:['du','de','une','un'], answer:'un',
    hint:'Cherche le genre de « requin » pour choisir le bon article indéfini.',
    explanation:'<em>Un requin</em> — masculin singulier, article indéfini : <em>un</em>.' }),

  makeMCQ({ id:'g6fr-pp22-002', chapterId:'g6fr-lecture', difficulty:1,
    question:'L\'artiste peint le portrait de Jena ……………… un pinceau fin.',
    options:['dans','pour','avec','vers'], answer:'avec',
    hint:'Quelle préposition exprime le moyen ou l\'instrument utilisé ?',
    explanation:'La préposition <em>avec</em> exprime le moyen : peindre <em>avec</em> un pinceau.' }),

  makeMCQ({ id:'g6fr-pp22-003', chapterId:'g6fr-lecture', difficulty:2,
    question:'Le beurre est trop ……………… ! Mets-le dans le réfrigérateur.',
    options:['mou','mous','molle','molles'], answer:'mou',
    hint:'Identifie le genre et le nombre de « le beurre » pour accorder l\'adjectif.',
    explanation:'<em>Mou</em> est la forme masculine singulière. (Mol devant voyelle ; molle = féminin.)' }),

  makeMCQ({ id:'g6fr-pp22-004', chapterId:'g6fr-lecture', difficulty:2,
    question:'Les randonneurs ont vu des singes en ……………… la colline.',
    options:['descendre','descendent','descendant','descends'], answer:'descendant',
    hint:'Quelle forme verbale accompagne toujours la préposition « en » pour exprimer la simultanéité ?',
    explanation:'Le gérondif se forme avec <em>en</em> + participe présent : <em>descendant</em>. « En descendant la colline. »' }),

  makeMCQ({ id:'g6fr-pp22-005', chapterId:'g6fr-lecture', difficulty:1,
    question:'Julie aide toujours ses grands-parents. ……………… adorable petite fille !',
    options:['Quel','Quelle','Quels','Quelles'], answer:'Quelle',
    hint:'Identifie le genre et le nombre du nom « fille » pour choisir le bon adjectif exclamatif.',
    explanation:'<em>Quelle</em> s\'accorde avec le nom féminin singulier <em>fille</em>. Quelle adorable petite fille !' }),

  makeMCQ({ id:'g6fr-pp22-006', chapterId:'g6fr-lecture', difficulty:1,
    question:'Les poissons de cette rivière ……………… quand on marche dans l\'eau.',
    options:['se cache','se cachent','se caches','se cacher'], answer:'se cachent',
    hint:'Identifie le sujet du verbe et détermine sa personne grammaticale.',
    explanation:'<em>Les poissons</em> est un sujet pluriel (3e personne du pluriel) → <em>se cachent</em>.' }),

  makeMCQ({ id:'g6fr-pp22-007', chapterId:'g6fr-lecture', difficulty:1,
    question:'Des pains dorés ……………… croustillants sortent du four.',
    options:['alors','puis','ni','et'], answer:'et',
    hint:'On coordonne deux adjectifs qui qualifient les mêmes pains.',
    explanation:'On relie deux adjectifs (dorés <em>et</em> croustillants) par la conjonction de coordination <em>et</em>.' }),

  makeMCQ({ id:'g6fr-pp22-008', chapterId:'g6fr-lecture', difficulty:2,
    question:'L\'infirmière est ……………… au secours des personnes blessées.',
    options:['venu','venus','venue','venues'], answer:'venue',
    hint:'Identifie le genre et le nombre du sujet « l\'infirmière » pour accorder le participe passé.',
    explanation:'<em>L\'infirmière</em> est féminin singulier → participe passé <em>venue</em>.' }),

  makeMCQ({ id:'g6fr-pp22-009', chapterId:'g6fr-lecture', difficulty:2,
    question:'Je suis allé chez le coiffeur ce matin. Daren ……………… va cet après-midi.',
    options:['y','en','le','la'], answer:'y',
    hint:'Quel pronom peut remplacer un lieu ou un complément introduit par « à » / « chez » ?',
    explanation:'<em>Y</em> remplace un lieu : Daren <em>y</em> va = Daren va chez le coiffeur.' }),

  makeMCQ({ id:'g6fr-pp22-010', chapterId:'g6fr-imparfait', difficulty:2,
    question:'Pendant que le chat dormait, le perroquet ……………… pour le réveiller.',
    options:['crie','crient','criait','crier'], answer:'criait',
    hint:'Cherche l\'indicateur de temps et détermine si l\'action est en cours ou ponctuelle dans le passé.',
    explanation:'<em>Pendant que</em> exprime deux actions simultanées dans le passé → imparfait : <em>criait</em>.' }),

  // ── Q3B : Vocabulaire MCQ (5 marks) ──────────────────────────────────────

  makeMCQ({ id:'g6fr-pp22-011', chapterId:'g6fr-lecture', difficulty:2,
    question:'En voyant le chien se précipiter vers lui, le voleur ……………… à toute vitesse.',
    options:['se promène','se repose','s\'arrête','s\'enfuit'], answer:'s\'enfuit',
    hint:'Que fait-on quand un chien court vers vous et qu\'on a peur ?',
    explanation:'Par peur du chien, le voleur <em>s\'enfuit</em> (= part en courant rapidement).' }),

  makeMCQ({ id:'g6fr-pp22-012', chapterId:'g6fr-lecture', difficulty:2,
    question:'Le temps est ensoleillé. Le linge est déjà ……………….',
    options:['déchiré','cuit','sec','mouillé'], answer:'sec',
    hint:'Sous le soleil, le linge humide change d\'état. Lequel de ces mots décrit cet état ?',
    explanation:'Le soleil fait sécher le linge → le linge est <em>sec</em>.' }),

  makeMCQ({ id:'g6fr-pp22-013', chapterId:'g6fr-lecture', difficulty:2,
    question:'Le métro est sur le point de partir. Les passagers marchent ……………… vers la gare.',
    options:['hâtivement','lentement','poliment','timidement'], answer:'hâtivement',
    hint:'Si le métro va partir, les passagers doivent se dépêcher → ils marchent comment ?',
    explanation:'<em>Hâtivement</em> = rapidement, à la hâte. En urgence, on se dépêche.' }),

  makeMCQ({ id:'g6fr-pp22-014', chapterId:'g6fr-lecture', difficulty:2,
    question:'Le téléphone portable est un outil ……………… qui a changé le monde.',
    options:['environnemental','technologique','médical','météorologique'], answer:'technologique',
    hint:'Le téléphone est un produit de quelle science/domaine ?',
    explanation:'Le téléphone est un outil <em>technologique</em> (= lié à la technologie, à l\'informatique).' }),

  makeMCQ({ id:'g6fr-pp22-015', chapterId:'g6fr-lecture', difficulty:2,
    question:'Ces ……………… statues datent de plus de mille ans.',
    options:['nouvelles','anciennes','récentes','futures'], answer:'anciennes',
    hint:'L\'âge de ces statues te donnera un indice sur l\'adjectif qui les décrit le mieux.',
    explanation:'Mille ans d\'âge → ce sont de très <em>anciennes</em> statues.' }),

  // ── Q4B : Compréhension MCQ — « Gontran le géant » ─────────────────

  makeMCQ({ id:'g6fr-pp22-016', chapterId:'g6fr-textes', difficulty:2,
    question:'<em>Au château, tout le monde se réveille en sursaut. Le roi bondit. Le soldat Lucas lui explique : « C\'est Gontran le géant qui ronfle terriblement. »</em><br><br>Le bruit qui réveille tout le monde est causé par',
    options:['une tempête.','Gontran qui ronfle.','une trompette.','le roi qui hurle.'], answer:'Gontran qui ronfle.',
    hint:'Lucas explique la cause du bruit.',
    explanation:'Le soldat Lucas précise : « C\'est <em>Gontran le géant qui ronfle</em> terriblement. »' }),

  makeMCQ({ id:'g6fr-pp22-017', chapterId:'g6fr-textes', difficulty:2,
    question:'<em>Lucas court voir son ami le géant et lui dit : « Tes ronflements réveillent tout le monde. »</em><br><br>Gontran est un',
    options:['soldat.','roi.','seigneur.','géant.'], answer:'géant.',
    hint:'Le texte décrit le personnage dès le début.',
    explanation:'Lucas va voir <em>son ami le géant</em> → Gontran est un <em>géant</em>.' }),

  makeMCQ({ id:'g6fr-pp22-018', chapterId:'g6fr-textes', difficulty:2,
    question:'<em>Le roi hurle : « Il est interdit de ronfler après minuit ! »</em><br><br>Gontran ne respecte pas la loi car il',
    options:['dort trop le jour.','refuse de dormir le jour.','joue de la trompette après minuit.','ronfle terriblement après minuit.'], answer:'ronfle terriblement après minuit.',
    hint:'Que dit la loi et que fait Gontran ?',
    explanation:'La loi interdit de <em>ronfler après minuit</em> — c\'est exactement ce que fait Gontran.' }),

  makeMCQ({ id:'g6fr-pp22-019', chapterId:'g6fr-textes', difficulty:2,
    question:'<em>Lucas dit à Gontran : « Tes ronflements réveillent tout le monde. Le roi est en colère. Tu ferais mieux de dormir le jour. Ça t\'éviterait des ennuis ! »</em><br><br>Lucas donne des conseils à Gontran pour qu\'il ne soit pas',
    options:['puni.','fatigué.','jaloux.','agacé.'], answer:'puni.',
    hint:'Le roi est en colère et peut punir Gontran.',
    explanation:'Le roi veut le punir → Lucas conseille Gontran pour qu\'il ne soit pas <em>puni</em>.' }),

  makeMCQ({ id:'g6fr-pp22-020', chapterId:'g6fr-textes', difficulty:2,
    question:'<em>Le roi dit à Gontran : « Je regrette de t\'avoir chassé. Tu peux rester parmi nous, mais il faut quand même trouver une solution à tes ronflements. »</em><br><br>À la fin, le roi demande à Gontran',
    options:['de quitter le village.','d\'aller sur la montagne.','de rester au village.','d\'aller au bord de la route.'], answer:'de rester au village.',
    hint:'Le roi regrette d\'avoir chassé Gontran et lui dit « tu peux rester ».',
    explanation:'Le roi dit « tu peux rester parmi nous » → il demande à Gontran <em>de rester au village</em>.' })

);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g6fr-pp22-pdf-001', chapterId:'g6fr-textes', marks:10, year:2022, grade:6, subject:'French',
    question:'Q4A — Lis le texte sur l\'Île d\'Ambre et réponds : localisation, moyen de transport, superficie, ce qui borde l\'île, une plante indigène, nom du crabe, deux actions du gouvernement pour préserver l\'île, événement de 1744, nom du roman inspiré de cet événement.', type:'short' },
  { id:'g6fr-pp22-pdf-002', chapterId:'g6fr-textes', marks:15, year:2022, grade:6, subject:'French',
    question:'Q4B — Réponds aux questions sur « Gontran le géant » : Q6 = deux problèmes causés par Gontran (nuit/jour) ; Q7 = preuve que les soldats n\'étaient pas prêts ; Q8 = pourquoi le roi regrette d\'avoir chassé Gontran ; Q9 = cause des ronflements ; Q10 = solution trouvée ; Q11 = remettre 4 événements dans l\'ordre.', type:'short' }
);
