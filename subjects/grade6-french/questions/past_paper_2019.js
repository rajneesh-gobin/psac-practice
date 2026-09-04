'use strict';
// PSAC Grade 6 French October 2019 — past-paper questions adapted to MCQ format.
// Source: MES Primary School Achievement Certificate Assessment, October 2019, French P130.

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-pp19-001', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:1,
    question:'Comme le ciel est gris, ……………… restons à la maison.',
    options:['ils','elles','nous','vous'], answer:'nous',
    hint:'Le verbe « restons » est à quelle personne ? Cherche le pronom sujet correspondant.',
    explanation:'<em>Restons</em> est la 1re personne du pluriel de « rester » → pronom sujet <em>nous</em>.' }),

  makeMCQ({ id:'g6fr-pp19-002', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:1,
    question:'« Ali, regarde ……………… camion rouge ! Qu\'il est grand ! »',
    options:['cet','cette','ce','ces'], answer:'ce',
    hint:'Détermine le genre et le nombre de « camion », et regarde s\'il commence par une voyelle ou une consonne.',
    explanation:'Devant un nom masculin singulier commençant par une consonne : <em>ce</em>. (Cet = devant voyelle ou h muet.)' }),

  makeMCQ({ id:'g6fr-pp19-003', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:1,
    question:'Tu gardes les billes ……………… ta poche pour ne pas les perdre.',
    options:['dans','entre','sous','sur'], answer:'dans',
    hint:'Les billes sont à l\'intérieur de la poche.',
    explanation:'<em>Dans</em> indique l\'intérieur : les billes sont <em>dans</em> ta poche.' }),

  makeMCQ({ id:'g6fr-pp19-004', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:1,
    question:'Beaucoup d\'athlètes ont participé ……………… Jeux des Îles.',
    options:['au','de','aux','des'], answer:'aux',
    hint:'« à + les Jeux » → contraction au pluriel.',
    explanation:'<em>À + les</em> se contracte en <em>aux</em> : participer <em>aux</em> Jeux des Îles.' }),

  makeMCQ({ id:'g6fr-pp19-005', chapterId:'g6fr-futur', subsection:'formation', difficulty:1,
    question:'Tes amis et toi ……………… une promenade en pirogue dimanche prochain.',
    options:['ferons','ferez','feras','feront'], answer:'ferez',
    hint:'À quelle personne grammaticale correspond « tes amis et toi » ? Conjugue « faire » au futur pour cette personne.',
    explanation:'<em>Tes amis et toi</em> = <em>vous</em>. Faire au futur : vous <em>ferez</em>.' }),

  makeMCQ({ id:'g6fr-pp19-006', chapterId:'g6fr-subordonnees', subsection:'analyse', difficulty:2,
    question:'J\'ai lu le livre ……………… j\'ai eu en cadeau.',
    options:['que','qui','dont','où'], answer:'que',
    hint:'Analyse le rôle de « le livre » dans la subordonnée — est-il sujet ou objet du verbe « ai eu » ?',
    explanation:'<em>Que</em> = pronom relatif COD : le livre <em>que</em> j\'ai eu en cadeau (= j\'ai eu le livre en cadeau).' }),

  makeMCQ({ id:'g6fr-pp19-007', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'Les élèves sont ravis. Leur enseignant ……………… emmène en excursion.',
    options:['le','lui','les','leur'], answer:'les',
    hint:'Le pronom COD remplace « les élèves » — pluriel.',
    explanation:'<em>Les élèves</em> est pluriel → pronom COD <em>les</em> : leur enseignant <em>les</em> emmène.' }),

  makeMCQ({ id:'g6fr-pp19-008', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:1,
    question:'Les enfants vont ……………… au stade pour la compétition.',
    options:['court','courent','couru','courir'], answer:'courir',
    hint:'Après « aller + » quel mode du verbe ?',
    explanation:'Futur proche : aller + infinitif. Les enfants vont <em>courir</em> au stade.' }),

  makeMCQ({ id:'g6fr-pp19-009', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:1,
    question:'J\'ai eu mal au genou ……………… je suis tombé.',
    options:['mais','quand','si','alors'], answer:'quand',
    hint:'Le mal est survenu au même moment que la chute → conjonction de temps.',
    explanation:'<em>Quand</em> exprime la simultanéité : j\'ai eu mal au genou <em>quand</em> je suis tombé.' }),

  makeMCQ({ id:'g6fr-pp19-010', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'J\'ai oublié mon crayon. J\'ai emprunté ……………… de Poonam.',
    options:['celle','ceux','celles','celui'], answer:'celui',
    hint:'Le pronom démonstratif doit s\'accorder en genre et en nombre avec le nom qu\'il remplace — quel est le genre et le nombre de « crayon » ?',
    explanation:'<em>Celui</em> remplace un nom masculin singulier (le crayon). <em>Celle</em> = féminin ; <em>ceux/celles</em> = pluriel.' }),

  makeMCQ({ id:'g6fr-pp19-011', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'Toto a bien chanté. Maman l\'a ……………….',
    options:['grondé','puni','excusé','félicité'], answer:'félicité',
    hint:'Si l\'on chante bien, on mérite d\'être ……….',
    explanation:'Bien chanter est une réussite → maman a <em>félicité</em> Toto (= lui a dit bravo, l\'a complimenté).' }),

  makeMCQ({ id:'g6fr-pp19-012', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'Bruno s\'est blessé à la jambe. Il marche ……………….',
    options:['brutalement','facilement','lentement','dangereusement'], answer:'lentement',
    hint:'Une blessure à la jambe affecte la façon de marcher → comment ?',
    explanation:'Avec une blessure à la jambe, on a du mal à marcher vite → on marche <em>lentement</em>.' }),

  makeMCQ({ id:'g6fr-pp19-013', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'Un accident est arrivé près de chez moi. On attend ……………… pour les soins.',
    options:['l\'ambulance','le camion','la bicyclette','la motocyclette'], answer:'l\'ambulance',
    hint:'Quel véhicule transporte les blessés vers l\'hôpital ?',
    explanation:'On appelle <em>l\'ambulance</em> pour transporter les blessés et leur donner les premiers soins.' }),

  makeMCQ({ id:'g6fr-pp19-014', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'Pour comprendre le mot difficile, Kevin le cherche dans ……………….',
    options:['le journal','l\'atlas','l\'annuaire','le dictionnaire'], answer:'le dictionnaire',
    hint:'Quel ouvrage explique le sens des mots ?',
    explanation:'<em>Le dictionnaire</em> donne la définition et le sens des mots.' }),

  makeMCQ({ id:'g6fr-pp19-015', chapterId:'g6fr-lecture', subsection:'reperage', difficulty:2,
    question:'Demain, on ira ……………… pour voir le clown faire son spectacle.',
    options:['au musée','au cirque','à l\'hôpital','à la boutique'], answer:'au cirque',
    hint:'Les clowns font leur spectacle dans quel lieu ?',
    explanation:'Les clowns se produisent <em>au cirque</em>.' }),

  makeMCQ({ id:'g6fr-pp19-016', chapterId:'g6fr-textes', subsection:'recit', difficulty:2,
    question:'<em>L\'escargot souffrait en randonnée avec ses trois compagnons : la coccinelle, rapide comme une souris, le mille-pattes qui ne connaissait pas la fatigue, et l\'abeille qui prenait le temps de voler parmi les fleurs.</em><br><br>Les trois compagnons de l\'escargot étaient',
    options:['une coccinelle, une souris et un mille-pattes.','une coccinelle, un mille-pattes et une abeille.','une coccinelle, une abeille et un papillon.','une coccinelle, une souris et un papillon.'], answer:'une coccinelle, un mille-pattes et une abeille.',
    hint:'Relisez la liste des trois compagnons dans la première phrase.',
    explanation:'Les trois compagnons sont : la <em>coccinelle</em>, le <em>mille-pattes</em> et l\'<em>abeille</em>.' }),

  makeMCQ({ id:'g6fr-pp19-017', chapterId:'g6fr-textes', subsection:'recit', difficulty:2,
    question:'<em>Le pauvre petit escargot marchait avec peine en soufflant et en transpirant, loin derrière et tout seul.</em><br><br>Contrairement à ses compagnons, l\'escargot était',
    options:['lent.','rapide.','impatient.','paresseux.'], answer:'lent.',
    hint:'Il marchait « avec peine » et était « loin derrière ».',
    explanation:'L\'escargot marchait avec peine, loin derrière → il était <em>lent</em>. Les autres étaient rapides.' }),

  makeMCQ({ id:'g6fr-pp19-018', chapterId:'g6fr-textes', subsection:'recit', difficulty:2,
    question:'<em>Quand l\'escargot parvenait enfin à rejoindre le groupe, les autres petites bêtes s\'étaient déjà bien reposées et avaient bien mangé. Et comme il n\'y avait plus de place, l\'escargot devait coucher à la belle étoile.</em><br><br>Quand l\'escargot rejoignait ses compagnons, tous',
    options:['mangeaient.','l\'attendaient.','jouaient.','dormaient.'], answer:'dormaient.',
    hint:'Le texte dit qu\'ils avaient déjà mangé et se reposaient — que faisaient-ils ?',
    explanation:'Les autres « s\'étaient déjà bien reposées et avaient bien mangé », et il ne restait plus de place pour se coucher : quand l\'escargot arrivait, tous <em>dormaient</em> déjà.' }),

  makeMCQ({ id:'g6fr-pp19-019', chapterId:'g6fr-textes', subsection:'recit', difficulty:2,
    question:'<em>L\'escargot alla voir le coquillage de plus près et inspecta l\'intérieur attentivement. Curieux, et comme la chose ne bougeait pas, il y pénétra.</em><br><br>L\'escargot entra dans le coquillage parce qu\'il était',
    options:['curieux.','têtu.','blessé.','fatigué.'], answer:'curieux.',
    hint:'Le texte emploie directement un mot pour qualifier l\'escargot à ce moment.',
    explanation:'Le texte dit : « <em>Curieux</em>, et comme la chose ne bougeait pas, il y pénétra. »' }),

  makeMCQ({ id:'g6fr-pp19-020', chapterId:'g6fr-textes', subsection:'recit', difficulty:2,
    question:'<em>En fin de compte, il n\'y eut de coquillage que pour l\'escargot. Et depuis ce jour-là, l\'escargot porte son coquillage sur le dos.</em><br><br>Cette histoire explique pourquoi l\'escargot',
    options:['prépare un abri.','a beaucoup d\'amis.','a une coquille sur le dos.','part en randonnée.'], answer:'a une coquille sur le dos.',
    hint:'La dernière phrase du texte le dit clairement.',
    explanation:'La dernière phrase : « l\'escargot porte son coquillage sur le dos » → l\'histoire explique pourquoi l\'escargot <em>a une coquille sur le dos</em>.' })

);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g6fr-pp19-pdf-001', chapterId:'g6fr-textes', marks:10, year:2019, grade:6, subject:'French',
    question:'Q4A — Lis le texte sur le kangourou et complète : pays, façon de se déplacer, deux rôles de la queue, célébrité de la femelle, nom du bébé, une nourriture, phrase montrant qu\'il boit peu, un ennemi, endroit où il se défend.', type:'short' },
  { id:'g6fr-pp19-pdf-002', chapterId:'g6fr-textes', marks:15, year:2019, grade:6, subject:'French',
    question:'Q4B — Réponds aux questions sur « Le petit escargot » : Q6 = ce qui montre qu\'il avançait difficilement ; Q7 = ce qu\'il faisait quand il s\'est cogné ; Q8 = deux raisons pour lesquelles le coquillage était parfait ; Q9 = deux raisons pour lesquelles les autres bêtes voulaient une maison pareille ; Q10 = remettre 4 événements dans l\'ordre.', type:'short' }
);
