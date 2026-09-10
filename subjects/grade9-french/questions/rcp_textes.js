'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  grade9-french — compréhension écrite : 6 textes originaux, 10 questions
//  chacun (5 makeMCQ + 5 makeText).
//  IDs : g9fr-rcp-001-m1 … g9fr-rcp-006-o5
//
//  POURQUOI CE FICHIER. Le chapitre g9fr-comprehension tenait 33 items, mais
//  AUCUN texte partagé : chaque question portait son propre extrait de 150 à
//  165 mots et posait une seule question dessus. Or Q8 du papier NCE, c'est
//  UN texte long et une dizaine de questions dessus. C'est ce trou-là que ce
//  fichier comble.
//
//  ⚠ Textes ORIGINAUX, écrits pour ce dépôt. Rien n'est copié d'un journal,
//    d'un manuel ni d'un autre site. Contextes mauriciens, et volontairement
//    DIFFÉRENTS de ceux déjà présents dans family_expansion.js (la marchande
//    de gâteaux piments, le pêcheur Jayen, le carnet de notes de Nadia, les
//    poubelles du collège, l'oncle et la neige).
//
//  ⚠ SIX TYPES DE TEXTE DIFFÉRENTS, parce qu'un chapitre fait de six récits
//    n'entraîne qu'une seule compétence : reportage, compte rendu de visite,
//    texte d'opinion, entretien, récit à la première personne, journal intime.
//
//  ⚠ Le texte est REPRIS EN ENTIER sur les dix questions du bloc. C'est
//    voulu, et c'est ce que font les autres packs : l'enfant reste sur un
//    seul texte et n'a jamais à remonter vers une question qu'il a quittée.
//
//  ⚠ Les chiffres cités dans les textes documentaires sont attribués dans le
//    texte lui-même (« un relevé », « les chiffres publics ») : ce sont des
//    textes d'examen, la question porte sur la lecture, pas sur la statistique.
// ══════════════════════════════════════════════════════════════════════════
(function () {

const CH = 'g9fr-comprehension';

// ⚠ background ET color sont posés explicitement, tous les deux. L'appli a un
//   thème sombre : une boîte avec seulement un fond hérite d'un texte blanc sur
//   blanc, et une boîte avec seulement une couleur devient invisible sur fond
//   sombre.
function box(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

// ══ TEXTE 1 · reportage · le blanchissement du corail à Blue Bay ═══════════
const _P1 = box(`
<b style="color:#1d4ed8">Lis le texte, puis réponds à la question.</b><br><br>
<b>Blue Bay : le lagon qui a perdu ses couleurs</b><br>
<i>Reportage — Mahébourg, mars</i><br><br>
À sept heures du matin, vue de la plage, la mer de Blue Bay ressemble encore à une carte postale : un bleu tranquille, deux pirogues amarrées, l'odeur du sel. C'est en descendant sous la surface que l'histoire change. Là où les dépliants touristiques promettent un jardin, il reste, par endroits, un cimetière blanc.<br><br>
« Avant, on ne voyait pas le fond tellement il y avait de poissons », raconte Ravin Sooprayen, cinquante-quatre ans, président de la coopérative des pêcheurs de Mahébourg. Il fait glisser sa main sur le rebord usé de sa pirogue. « Aujourd'hui, le corail est blanc comme du sel. »<br><br>
Le phénomène porte un nom : le blanchissement. Il ne s'agit pas d'une maladie ordinaire. Le corail vit en association avec une algue microscopique qui loge dans ses tissus, lui donne sa couleur et le nourrit. Lorsque l'eau reste trop chaude pendant plusieurs semaines, le corail expulse cette algue. Il perd d'un seul coup son manteau et sa cuisine. Il devient blanc. S'il ne récupère pas, il meurt.<br><br>
Les relevés effectués l'an dernier par une équipe de chercheurs de l'université sont sévères : sur les stations suivies dans le sud-est, un quart des colonies étaient blanchies en février, et la moitié d'entre elles n'avaient pas retrouvé leur couleur en juin. Deux causes reviennent dans le rapport : la chaleur anormale de l'eau et les sédiments que les rivières charrient après les fortes pluies, qui étouffent les colonies déjà affaiblies.<br><br>
Pour les pêcheurs, la conséquence tient en une phrase. « Un corail mort, c'est un poisson qui déménage », résume Ravin. Le récif abrite les jeunes poissons, les nourrit, les cache. Quand il s'effondre, il ne reste qu'un tapis de gravats où rien ne s'accroche. Les prises de la coopérative ont baissé de trente pour cent en cinq ans. Certains membres partent au large, plus loin, plus longtemps, avec plus de carburant à payer.<br><br>
La coopérative n'a pourtant pas croisé les bras. Depuis trois ans, ses vingt-huit membres ont accepté deux mesures que personne n'aurait votées autrefois. La première : une zone de repos, six hectares de lagon interdits à la pêche entre novembre et février, la saison où les poissons se reproduisent. La seconde : l'abandon des filets à petites mailles, qui ramassaient les alevins avec le reste.<br><br>
« On a beaucoup discuté, et on s'est fâchés », admet Sarita, la trésorière. « Mais un pêcheur qui vide son lagon scie la branche sur laquelle il est assis. »<br><br>
Il y a aussi de la patience à avoir. Dans une pépinière installée à quelques centaines de mètres du rivage, des fragments de corail poussent sur des structures métalliques avant d'être replantés. Ils grandissent d'un à deux centimètres par an. « Ce n'est pas nous qui verrons le résultat », dit Ravin sans amertume. « C'est mon petit-fils. »<br><br>
Sur la plage, un groupe d'élèves de Grade 9 note les températures de l'eau dans un carnet. À la fin de la matinée, l'un d'eux demande au pêcheur si le lagon guérira. Ravin regarde longuement l'eau avant de répondre : « Si on lui laisse le temps. Et si le monde entier arrête de chauffer la marmite. »
`, '#2563eb');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g9fr-rcp-001-m1', chapterId:CH, difficulty:3, subsection:'synonymes_contexte',
    question:_P1 + 'Par quel mot peut-on remplacer <b>charrient</b> dans « les sédiments que les rivières charrient » ?',
    options:['transportent', 'refroidissent', 'réchauffent', 'nettoient'],
    answer:'transportent',
    hint:'Demande-toi ce qu’une rivière en crue fait de la terre qu’elle emporte.',
    explanation:'Charrier, c’est <b>transporter</b> en entraînant avec le courant. Le texte ajoute que ces sédiments « étouffent les colonies déjà affaiblies » : ils arrivent donc dans le lagon, ils ne le nettoient pas. (Charrier = to carry along.)' }),

  makeMCQ({ id:'g9fr-rcp-001-m2', chapterId:CH, difficulty:4, subsection:'expression_imagee',
    question:_P1 + 'Sarita dit qu’un pêcheur qui vide son lagon « scie la branche sur laquelle il est assis ». Que veut-elle dire ?',
    options:['il détruit lui-même ce qui le fait vivre',
             'il travaille dur pour nourrir sa famille',
             'il refuse tout conseil de ses collègues',
             'il prépare son avenir avec prudence'],
    answer:'il détruit lui-même ce qui le fait vivre',
    hint:'Imagine la scène : que se passe-t-il pour celui qui scie sa propre branche ?',
    explanation:'L’image dit qu’on se nuit à soi-même : le lagon nourrit le pêcheur, donc le vider, c’est <b>supprimer sa propre ressource</b>. Sarita l’emploie pour justifier la zone de repos. (To saw off the branch you are sitting on.)' }),

  makeMCQ({ id:'g9fr-rcp-001-m3', chapterId:CH, difficulty:4, subsection:'inference',
    question:_P1 + 'Pourquoi Ravin dit-il « Ce n’est pas nous qui verrons le résultat » ?',
    options:['Parce que le corail replanté grandit très lentement.',
             'Parce que la pépinière sera bientôt fermée par l’État.',
             'Parce qu’il a décidé de vendre sa pirogue cette année.',
             'Parce que les jeunes pêcheurs quittent tous la région.'],
    answer:'Parce que le corail replanté grandit très lentement.',
    hint:'Relis la phrase qui précède : elle donne un chiffre par an.',
    explanation:'Les fragments « grandissent d’un à deux centimètres par an » : un récif met donc des dizaines d’années à revenir, d’où « C’est mon petit-fils ». (The coral grows one to two centimetres a year.)' }),

  makeMCQ({ id:'g9fr-rcp-001-m4', chapterId:CH, difficulty:4, subsection:'avis_personnel',
    question:_P1 + 'Un lecteur veut défendre l’idée que la coopérative agit avec courage. Sur quel élément du texte doit-il s’appuyer ?',
    options:['Ses membres ont interdit la pêche dans une zone de reproduction.',
             'Ses membres pêchent désormais plus loin pour gagner davantage.',
             'Ses membres ont demandé un carburant moins cher à l’État.',
             'Ses membres ont refusé de parler aux chercheurs de l’université.'],
    answer:'Ses membres ont interdit la pêche dans une zone de reproduction.',
    hint:'Cherche la décision que les pêcheurs ont prise CONTRE leur intérêt immédiat.',
    explanation:'Se fermer six hectares de lagon pendant quatre mois coûte de l’argent tout de suite pour un bénéfice lointain : c’est cela qui montre du courage. Les trois autres options ne sont pas dans le texte. (An opinion is only defensible if a line of the text carries it.)' }),

  makeMCQ({ id:'g9fr-rcp-001-m5', chapterId:CH, difficulty:3, subsection:'reponses_multiples',
    question:_P1 + 'Le rapport des chercheurs cite <b>deux</b> causes du blanchissement. Lesquelles ?',
    options:['la chaleur de l’eau et les sédiments des rivières',
             'la chaleur de l’eau et les filets à petites mailles',
             'le carburant des pirogues et les sédiments apportés',
             'les touristes du lagon et la chaleur anormale de l’eau'],
    answer:'la chaleur de l’eau et les sédiments des rivières',
    hint:'Une seule phrase du texte commence par « Deux causes reviennent ».',
    explanation:'« Deux causes reviennent dans le rapport : <b>la chaleur anormale de l’eau</b> et <b>les sédiments</b> que les rivières charrient. » Les filets, eux, sont une décision de la coopérative, pas une cause du blanchissement. (Two causes, both named in one sentence.)' }),

  makeText({ id:'g9fr-rcp-001-o1', chapterId:CH, difficulty:2, subsection:'reperage_explicite',
    question:_P1 + 'Combien de membres compte la coopérative ? Écris le nombre en chiffres.',
    answer:'28', alsoAccept:['vingt-huit', 'vingt huit', '28 membres'],
    hint:'Le paragraphe qui parle des deux mesures donne le nombre.',
    explanation:'« ses <b>vingt-huit</b> membres ont accepté deux mesures ». (Twenty-eight members.)' }),

  makeText({ id:'g9fr-rcp-001-o2', chapterId:CH, difficulty:2, subsection:'reperage_explicite',
    question:_P1 + 'La zone de repos est interdite à la pêche entre deux mois. Cite le PREMIER mois nommé.',
    answer:'novembre', alsoAccept:['en novembre', 'le mois de novembre'],
    hint:'Cherche la phrase qui commence par « La première : une zone de repos ».',
    explanation:'« six hectares de lagon interdits à la pêche entre <b>novembre</b> et février ». C’est la saison de reproduction des poissons. (From November to February.)' }),

  makeText({ id:'g9fr-rcp-001-o3', chapterId:CH, difficulty:3, subsection:'synonymes_contexte',
    question:_P1 + 'Par quel adjectif d’un seul mot peut-on remplacer <b>sévères</b> dans « les relevés […] sont sévères » ?',
    answer:'inquiétants', alsoAccept:['alarmants', 'préoccupants', 'graves', 'mauvais'],
    hint:'Il ne s’agit pas d’une personne stricte : que disent ces relevés ?',
    explanation:'Appliqué à des résultats, <b>sévère</b> veut dire <b>inquiétant</b>, <b>alarmant</b> : un quart des colonies blanchies, la moitié non rétablies. (Here « sévère » means alarming, not strict.)' }),

  makeText({ id:'g9fr-rcp-001-o4', chapterId:CH, difficulty:3, subsection:'inference',
    question:_P1 + 'En un seul mot, quel sentiment Ravin exprime-t-il en disant « C’est mon petit-fils » ?',
    answer:'espoir', alsoAccept:['de l’espoir', 'l’espoir', 'confiance', 'optimisme'],
    hint:'Le texte précise qu’il le dit « sans amertume ». Que reste-t-il, alors ?',
    explanation:'Il sait qu’il ne verra pas le récif revenir, et il le dit « sans amertume » : il travaille pour la génération suivante, ce qui est de l’<b>espoir</b>, pas du renoncement. (Hope, not bitterness.)' }),

  makeText({ id:'g9fr-rcp-001-o5', chapterId:CH, difficulty:4, subsection:'expression_imagee',
    question:_P1 + 'Le texte compare le récif effondré à un sol couvert de débris. Recopie le mot qui désigne ces débris (un seul mot).',
    answer:'gravats', alsoAccept:['des gravats', 'les gravats', 'un tapis de gravats'],
    hint:'Relis la phrase qui suit « Quand il s’effondre ».',
    explanation:'« il ne reste qu’un tapis de <b>gravats</b> où rien ne s’accroche ». Le mot vient du chantier de démolition : l’image transforme le récif en ruine. (Rubble.)' })

);

// ══ TEXTE 2 · compte rendu de visite · l'Aapravasi Ghat et l'engagisme ═════
const _P2 = box(`
<b style="color:#0f766e">Lis le texte, puis réponds à la question.</b><br><br>
<b>Seize marches</b><br>
<i>Compte rendu de la visite du Grade 9B à l'Aapravasi Ghat, Port-Louis, le 12 mai</i><br><br>
Nous sommes partis du collège à huit heures. Dans le bus, personne ne s'attendait à grand-chose : on nous avait dit que nous allions voir « des vieilles pierres ». Nous sommes revenus silencieux, et ce n'était pas la fatigue.<br><br>
L'Aapravasi Ghat se trouve au bord du port, coincé entre un rond-point et des immeubles de bureaux. De la rue, on ne voit presque rien. Notre guide, madame Bhujun, nous a d'abord fait asseoir à l'ombre, puis elle a écrit un mot au tableau blanc : « engagisme ».<br><br>
Entre 1834 et 1920, environ un demi-million de travailleurs sont arrivés à Maurice par ce dépôt, venus surtout de l'Inde, mais aussi de Chine, d'Afrique de l'Est et de Madagascar. Ils avaient signé un contrat. Ce contrat promettait un salaire, une ration et un logement, contre cinq ans de travail dans les champs de canne. Beaucoup ne savaient pas lire ce qu'ils signaient. Beaucoup ne sont jamais repartis.<br><br>
Madame Bhujun nous a montré les seize marches de pierre qui montent depuis le quai. C'est par là que les nouveaux arrivants entraient. « Chacun a monté ces marches une seule fois dans sa vie », a-t-elle dit. « Après, on ne redescendait pas. » Nous les avons montées en file, sans parler. Elles sont basses, irrégulières, creusées au milieu.<br><br>
En haut, il reste les fondations du hangar où les gens dormaient, les latrines et un bassin. On les faisait attendre là, parfois plusieurs jours, le temps qu'un propriétaire de sucrerie vienne les choisir. Chacun recevait un numéro. Sur les registres, le numéro vient avant le nom.<br><br>
Ce détail m'a frappé plus que tout le reste. Un numéro n'oublie rien et ne raconte rien.<br><br>
Nous avons ensuite regardé des photographies et des fiches d'immatriculation : un nom, un âge, un village, une taille, parfois une cicatrice notée à l'encre. Madame Bhujun nous a expliqué que ces fiches servent aujourd'hui à autre chose : des familles mauriciennes viennent y chercher leur arrière-arrière-grand-père. « Le papier qui servait à contrôler sert maintenant à retrouver », a-t-elle dit.<br><br>
Une camarade a demandé si l'engagisme était de l'esclavage. La réponse a pris du temps. Non, a dit la guide : l'esclavage avait été aboli en 1835, et les engagés étaient légalement libres, payés, sous contrat. Mais un homme qui a traversé un océan, qui ne parle pas la langue du pays, qui doit encore son voyage et qui ne peut pas quitter la propriété sans laissez-passer n'est pas vraiment libre non plus. « La liberté sur le papier ne remplit pas une assiette », a-t-elle ajouté.<br><br>
Le site est inscrit au patrimoine mondial depuis 2006. Il occupe moins d'un hectare, et les grues du port passent au-dessus. Cela peut sembler peu. Pourtant, presque toutes les familles de mon quartier descendent de quelqu'un qui a monté ces seize marches.<br><br>
Dans le bus du retour, notre professeur nous a demandé ce que nous retenions de la matinée. Kevin a répondu : « Que l'histoire n'est pas loin. » Je crois que c'est la meilleure phrase de la journée.
`, '#0d9488');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g9fr-rcp-002-m1', chapterId:CH, difficulty:2, subsection:'reperage_explicite',
    question:_P2 + 'En quelle année le site a-t-il été inscrit au patrimoine mondial ?',
    options:['2006', '1920', '1835', '1834'],
    answer:'2006',
    hint:'L’avant-dernier paragraphe donne la date.',
    explanation:'« Le site est inscrit au patrimoine mondial depuis <b>2006</b>. » Les trois autres dates appartiennent à l’histoire de l’engagisme, pas à celle du classement. (World Heritage since 2006.)' }),

  makeMCQ({ id:'g9fr-rcp-002-m2', chapterId:CH, difficulty:3, subsection:'synonymes_contexte',
    question:_P2 + 'Par quel mot peut-on remplacer <b>coincé</b> dans « coincé entre un rond-point et des immeubles » ?',
    options:['serré', 'perdu', 'caché', 'posé'],
    answer:'serré',
    hint:'Le mot dit la place que le site occupe entre deux voisins encombrants.',
    explanation:'Coincé entre deux choses veut dire <b>serré</b>, pris à l’étroit. Le texte le confirme : « Il occupe moins d’un hectare, et les grues du port passent au-dessus. » (Squeezed in.)' }),

  makeMCQ({ id:'g9fr-rcp-002-m3', chapterId:CH, difficulty:4, subsection:'expression_imagee',
    question:_P2 + '« La liberté sur le papier ne remplit pas une assiette. » Que veut dire la guide ?',
    options:['un droit écrit ne suffit pas à faire vivre',
             'les engagés recevaient une ration correcte',
             'les contrats étaient rédigés en trois langues',
             'la nourriture coûtait cher au dépôt du port'],
    answer:'un droit écrit ne suffit pas à faire vivre',
    hint:'Oppose ce qui est écrit sur le contrat et ce que l’homme a réellement.',
    explanation:'L’assiette représente les besoins concrets. La guide vient d’expliquer qu’un engagé « doit encore son voyage » et ne peut pas partir sans laissez-passer : sa liberté est écrite, pas vécue. (Rights on paper do not feed anyone.)' }),

  makeMCQ({ id:'g9fr-rcp-002-m4', chapterId:CH, difficulty:4, subsection:'avis_personnel',
    question:_P2 + 'Un élève affirme : « Ce site devrait être visité par tous les collégiens. » Quelle phrase du compte rendu soutient le mieux cet avis ?',
    options:['Presque toutes les familles du quartier en descendent.',
             'Le site occupe aujourd’hui moins d’un hectare de terrain.',
             'Les grues du port passent juste au-dessus des ruines.',
             'La visite de la classe a commencé à huit heures du matin.'],
    answer:'Presque toutes les familles du quartier en descendent.',
    hint:'Quel détail relie le site à la vie des élèves eux-mêmes ?',
    explanation:'Un avis ne tient que s’il s’appuie sur le texte. « presque toutes les familles de mon quartier descendent de quelqu’un qui a monté ces seize marches » fait du site l’histoire des visiteurs, pas un décor. Les trois autres phrases décrivent la taille du lieu ou l’horaire. (Only one option is load-bearing.)' }),

  makeMCQ({ id:'g9fr-rcp-002-m5', chapterId:CH, difficulty:4, subsection:'inference',
    question:_P2 + 'Pourquoi l’élève écrit-il que le retour s’est fait en silence « et ce n’était pas la fatigue » ?',
    options:['La visite les a émus plus qu’ils ne s’y attendaient.',
             'Le trajet en bus avait été particulièrement long.',
             'Le professeur leur avait interdit de parler fort.',
             'Ils avaient été déçus par de simples vieilles pierres.'],
    answer:'La visite les a émus plus qu’ils ne s’y attendaient.',
    hint:'Compare cette phrase avec ce que la classe attendait dans le bus de l’aller.',
    explanation:'Au départ ils croyaient voir « des vieilles pierres » ; en écartant la fatigue, l’auteur dit que le silence vient de l’<b>émotion</b>. La suite du texte (le numéro avant le nom) le confirme. (They were moved, not tired.)' }),

  makeText({ id:'g9fr-rcp-002-o1', chapterId:CH, difficulty:2, subsection:'reperage_explicite',
    question:_P2 + 'Combien de marches de pierre montent depuis le quai ? Écris le nombre en chiffres.',
    answer:'16', alsoAccept:['seize', 'seize marches', '16 marches'],
    hint:'Le titre du compte rendu donne déjà la réponse.',
    explanation:'« les <b>seize</b> marches de pierre qui montent depuis le quai ». C’est aussi le titre du texte. (Sixteen steps.)' }),

  makeText({ id:'g9fr-rcp-002-o2', chapterId:CH, difficulty:3, subsection:'reponses_multiples',
    question:_P2 + 'Le contrat promettait trois choses aux engagés. Cite la PREMIÈRE nommée dans le texte.',
    answer:'un salaire', alsoAccept:['salaire', 'le salaire', 'une paye', 'de l’argent'],
    hint:'Une seule phrase énumère les trois promesses, séparées par des virgules.',
    explanation:'« Ce contrat promettait <b>un salaire</b>, une ration et un logement. » Les deux autres éléments sont la ration et le logement. (Wage, ration, lodging — in that order.)' }),

  makeText({ id:'g9fr-rcp-002-o3', chapterId:CH, difficulty:3, subsection:'synonymes_contexte',
    question:_P2 + 'Par quel mot d’un seul mot peut-on remplacer <b>aboli</b> dans « l’esclavage avait été aboli en 1835 » ?',
    answer:'supprimé', alsoAccept:['interdit', 'abandonné', 'annulé', 'effacé'],
    hint:'Il s’agit d’une loi : que fait une loi à une pratique qu’elle refuse ?',
    explanation:'Abolir une loi ou une pratique, c’est la <b>supprimer</b>, l’interdire officiellement. (Abolished = done away with.)' }),

  makeText({ id:'g9fr-rcp-002-o4', chapterId:CH, difficulty:4, subsection:'inference',
    question:_P2 + 'D’après la guide, un engagé était libre sur le papier sans l’être vraiment. En deux mots, qu’est-ce qu’il devait encore rembourser ?',
    answer:'son voyage', alsoAccept:['le voyage', 'voyage', 'la traversée', 'son passage'],
    hint:'Relis la longue phrase qui commence par « Mais un homme qui a traversé un océan ».',
    explanation:'« qui doit encore <b>son voyage</b> » : une dette attache l’homme à la propriété aussi sûrement qu’une chaîne, même si le contrat le dit libre. (He still owed his passage.)' }),

  makeText({ id:'g9fr-rcp-002-o5', chapterId:CH, difficulty:4, subsection:'expression_imagee',
    question:_P2 + '« Le papier qui servait à contrôler sert maintenant à retrouver. » En deux mots, que désigne ici le mot « papier » ?',
    answer:'les fiches', alsoAccept:['fiches', 'les registres', 'les documents', 'les fiches d’immatriculation'],
    hint:'La guide vient de montrer un type de document à la classe.',
    explanation:'Le « papier » désigne <b>les fiches</b> d’immatriculation (nom, âge, village, taille). L’image retourne l’objet : outil de contrôle hier, outil de mémoire familiale aujourd’hui. (The registration cards.)' })

);

// ══ TEXTE 3 · texte d'opinion · le tourisme et l'eau ══════════════════════
const _P3 = box(`
<b style="color:#9a3412">Lis le texte, puis réponds à la question.</b><br><br>
<b>Faut-il compter l'eau des piscines ?</b><br>
<i>Point de vue</i><br><br>
On nous répète que l'eau ne manque pas à Maurice : il tombe près de deux mille millimètres de pluie par an sur le plateau central. C'est vrai. Et pourtant, chaque année, entre septembre et décembre, des camions-citernes remontent les rues de certains quartiers et des familles font la queue avec des bidons. Ce n'est pas la pluie qui manque. C'est ce que nous en faisons.<br><br>
Commençons par une évidence, parce qu'elle est vraie : le tourisme fait vivre le pays. Il emploie des dizaines de milliers de personnes, du cuisinier au chauffeur, du jardinier à la fille de mon voisin qui a payé ses études en travaillant à la réception. Un hôtel n'est pas un ennemi, et celui qui l'écrit se trompe d'adversaire.<br><br>
Mais un hôtel n'est pas non plus une maison. Un client consomme, selon les estimations les plus prudentes, trois à quatre fois plus d'eau par jour qu'un habitant : la douche deux fois, la piscine, le linge changé chaque matin, le jardin arrosé, le terrain de golf tondu et vert au mois de novembre, quand les champs autour sont jaunes. Ce contraste, on ne peut pas ne pas le voir. Un gazon vert au milieu d'un pays assoiffé, c'est une vitrine qui gêne.<br><br>
Faut-il pour autant fermer les piscines ? Non, et l'argument mérite mieux que des slogans. Les hôtels ne sont pas la première cause de nos coupures. Les canalisations vieillissantes perdent, selon les chiffres publics, près de la moitié de l'eau traitée avant qu'elle n'arrive au robinet. Un demi-litre sur deux se vide dans le sol. Aucune piscine ne pèse cela.<br><br>
Le vrai reproche est ailleurs : c'est celui de l'ordre des priorités. Quand la pression baisse, ce sont les quartiers d'habitation qui sont rationnés en premier, jamais les zones hôtelières. Une famille de Rose-Hill qui remplit un seau à cinq heures du matin regarde, à la télévision, un reportage sur une nouvelle station balnéaire.<br><br>
Trois mesures simples changeraient beaucoup de choses. D'abord, obliger tout nouvel hôtel à recycler ses eaux grises pour l'arrosage : la technique existe, elle est banale ailleurs. Ensuite, tarifer l'eau au-delà d'un certain volume, pour que celui qui remplit une piscine paie ce que cela coûte réellement. Enfin, publier chaque année, hôtel par hôtel, la consommation d'eau. Rien ne discipline autant qu'un chiffre que tout le monde peut lire.<br><br>
On m'objectera que le touriste ira ailleurs. J'en doute. On ne choisit pas Maurice pour la longueur de ses douches. Et un pays qui laisse ses quartiers à sec finira par abîmer précisément ce qu'il vend : une île où il fait bon vivre.<br><br>
L'eau tombe du ciel gratuitement. Elle ne se stocke pas gratuitement, elle ne se transporte pas gratuitement, et elle ne se partage pas toute seule. Compter l'eau des piscines ne fera pas fuir les touristes. Cela nous obligera seulement à regarder en face un partage que nous préférons ne pas nommer.
`, '#c2410c');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g9fr-rcp-003-m1', chapterId:CH, difficulty:4, subsection:'avis_personnel',
    question:_P3 + 'Quelle position l’auteur défend-il réellement dans ce texte ?',
    options:['Mesurer et facturer l’eau que les hôtels consomment.',
             'Interdire la construction de toute nouvelle piscine.',
             'Réduire le nombre de touristes accueillis chaque année.',
             'Laisser le marché fixer seul le prix de l’eau du pays.'],
    answer:'Mesurer et facturer l’eau que les hôtels consomment.',
    hint:'Relis les trois mesures proposées, puis la phrase « Faut-il pour autant fermer les piscines ? ».',
    explanation:'L’auteur écrit noir sur blanc « Un hôtel n’est pas un ennemi » et refuse de fermer les piscines. Ses trois mesures sont le recyclage, la <b>tarification</b> au-delà d’un volume et la <b>publication</b> des consommations. (Measure and charge, not ban.)' }),

  makeMCQ({ id:'g9fr-rcp-003-m2', chapterId:CH, difficulty:4, subsection:'expression_imagee',
    question:_P3 + '« Un gazon vert au milieu d’un pays assoiffé, c’est une vitrine qui gêne. » Que reproche l’auteur ?',
    options:['Un luxe visible pendant que d’autres manquent d’eau.',
             'Une décoration trop coûteuse pour les hôteliers.',
             'Un gaspillage d’engrais sur les terrains de golf.',
             'Une publicité mensongère faite par les agences.'],
    answer:'Un luxe visible pendant que d’autres manquent d’eau.',
    hint:'Une vitrine, c’est fait pour être vu. Que voit-on juste à côté du gazon ?',
    explanation:'Le mot <b>vitrine</b> insiste sur ce qui s’expose : le vert de l’hôtel s’affiche à côté des champs jaunes et des bidons. Ce qui gêne, ce n’est pas le gazon, c’est le contraste. (A shop window: it is meant to be seen.)' }),

  makeMCQ({ id:'g9fr-rcp-003-m3', chapterId:CH, difficulty:4, subsection:'inference',
    question:_P3 + 'Pourquoi l’auteur parle-t-il des canalisations qui perdent la moitié de l’eau traitée ?',
    options:['Pour admettre que les hôtels ne sont pas la seule cause.',
             'Pour montrer que les hôtels gaspillent plus que les foyers.',
             'Pour réclamer la fermeture immédiate de toutes les piscines.',
             'Pour expliquer pourquoi la pluie tombe moins qu’autrefois.'],
    answer:'Pour admettre que les hôtels ne sont pas la seule cause.',
    hint:'Regarde le mot qui ouvre ce paragraphe : « Non ».',
    explanation:'C’est une concession : l’auteur reconnaît une cause plus lourde que les hôtels (« Aucune piscine ne pèse cela ») avant de revenir à son vrai reproche, l’ordre des priorités. Concéder rend un argument plus solide, pas plus faible. (A concession strengthens the argument.)' }),

  makeMCQ({ id:'g9fr-rcp-003-m4', chapterId:CH, difficulty:3, subsection:'synonymes_contexte',
    question:_P3 + 'Par quel groupe de mots peut-on remplacer <b>assoiffé</b> dans « un pays assoiffé » ?',
    options:['privé d’eau', 'très fatigué', 'très ensoleillé', 'bien arrosé'],
    answer:'privé d’eau',
    hint:'Le mot contient « soif ». Que dit le premier paragraphe des bidons et des camions ?',
    explanation:'Un pays assoiffé est un pays <b>privé d’eau</b>. « bien arrosé » dit exactement le contraire, et c’est le piège de la question. (Thirsty = short of water.)' }),

  makeMCQ({ id:'g9fr-rcp-003-m5', chapterId:CH, difficulty:3, subsection:'reponses_multiples',
    question:_P3 + 'Quelles sont les <b>deux premières</b> mesures proposées par l’auteur ?',
    options:['recycler les eaux grises et tarifer les gros volumes',
             'recycler les eaux grises et publier les consommations',
             'creuser de nouveaux réservoirs et tarifer les volumes',
             'réparer les canalisations et fermer les golfs privés'],
    answer:'recycler les eaux grises et tarifer les gros volumes',
    hint:'Le paragraphe des mesures est organisé par « D’abord », « Ensuite », « Enfin ».',
    explanation:'« <b>D’abord</b>, obliger tout nouvel hôtel à recycler ses eaux grises […] <b>Ensuite</b>, tarifer l’eau au-delà d’un certain volume ». La publication des consommations est la troisième, annoncée par « Enfin ». (The connectors give the order.)' }),

  makeText({ id:'g9fr-rcp-003-o1', chapterId:CH, difficulty:2, subsection:'reperage_explicite',
    question:_P3 + 'Les camions-citernes passent entre deux mois de l’année. Cite le PREMIER mois nommé.',
    answer:'septembre', alsoAccept:['en septembre', 'le mois de septembre'],
    hint:'La réponse est dans la deuxième phrase du texte.',
    explanation:'« chaque année, entre <b>septembre</b> et décembre, des camions-citernes remontent les rues ». C’est la fin de la saison sèche. (September to December.)' }),

  makeText({ id:'g9fr-rcp-003-o2', chapterId:CH, difficulty:3, subsection:'reperage_explicite',
    question:_P3 + 'Selon les estimations les plus prudentes, un client d’hôtel consomme au moins combien de fois plus d’eau qu’un habitant ? Écris le chiffre.',
    answer:'3', alsoAccept:['trois', 'trois fois', '3 fois'],
    hint:'Le texte donne une fourchette : retiens le plus petit des deux nombres.',
    explanation:'« <b>trois</b> à quatre fois plus d’eau par jour qu’un habitant ». « Les plus prudentes » et « au moins » indiquent le bas de la fourchette. (At least three times.)' }),

  makeText({ id:'g9fr-rcp-003-o3', chapterId:CH, difficulty:3, subsection:'synonymes_contexte',
    question:_P3 + 'Par quel adjectif d’un seul mot peut-on remplacer <b>banale</b> dans « la technique existe, elle est banale ailleurs » ?',
    answer:'courante', alsoAccept:['commune', 'ordinaire', 'répandue', 'habituelle'],
    hint:'L’auteur veut dire que cette technique n’a rien d’exceptionnel.',
    explanation:'Banal veut dire ici <b>courant</b>, ordinaire : la technique est déjà employée partout, donc le refus n’est pas technique mais politique. (Commonplace, not dull.)' }),

  makeText({ id:'g9fr-rcp-003-o4', chapterId:CH, difficulty:4, subsection:'inference',
    question:_P3 + 'Quand la pression baisse, qui est rationné en premier, d’après l’auteur ? Réponds en deux mots.',
    answer:'les quartiers', alsoAccept:['les habitants', 'les quartiers d’habitation', 'les familles', 'quartiers'],
    hint:'Cherche le paragraphe qui parle de « l’ordre des priorités ».',
    explanation:'« ce sont <b>les quartiers d’habitation</b> qui sont rationnés en premier, jamais les zones hôtelières ». C’est là, et non dans la piscine elle-même, que l’auteur place l’injustice. (Homes first, hotels never.)' }),

  makeText({ id:'g9fr-rcp-003-o5', chapterId:CH, difficulty:4, subsection:'expression_imagee',
    question:_P3 + 'Recopie, dans le dernier paragraphe, le nom qui désigne le fait de répartir l’eau entre tous (un seul mot).',
    answer:'partage', alsoAccept:['le partage', 'un partage', 'répartition'],
    hint:'C’est le tout dernier nom du texte, celui que l’auteur dit qu’on préfère taire.',
    explanation:'« un <b>partage</b> que nous préférons ne pas nommer ». Le texte se termine sur ce mot exprès : dire « partage » oblige à dire qui reçoit et qui attend. (Sharing — the word the writer says we avoid.)' })

);

// ══ TEXTE 4 · entretien · les fossiles de dodo à Mare aux Songes ══════════
const _P4 = box(`
<b style="color:#6d28d9">Lis le texte, puis réponds à la question.</b><br><br>
<b>Sous la boue de Mare aux Songes</b><br>
<i>Entretien avec Anjali Curpen, paléontologue, entre deux journées de fouille.</i><br><br>
<b>— Qu'est-ce que Mare aux Songes, exactement ?</b><br>
— Une ancienne mare devenue un marécage, à quelques centaines de mètres de la mer, près de l'aéroport. Sous la boue, il y a une couche d'os. On y a trouvé des dodos, mais aussi des tortues géantes, des perroquets, des chauves-souris, des graines, du bois, des insectes. C'est ce mélange qui fait la valeur du site : ce n'est pas une vitrine à dodos, c'est un morceau d'île entier, conservé.<br><br>
<b>— Pourquoi les os se sont-ils conservés là et pas ailleurs ?</b><br>
— Parce que la boue les a mis à l'abri de l'air. Un os laissé à la surface se délite en quelques dizaines d'années sous notre climat. Enfoui dans une vase saturée d'eau, il traverse les siècles. Mare aux Songes est une sorte de coffre-fort mal fermé : il a gardé, mais il a mélangé.<br><br>
<b>— Mélangé ?</b><br>
— Les os n'ont pas été déposés dans l'ordre. Ils ont été charriés, roulés, empilés par des crues successives. Nous trouvons rarement un squelette complet et articulé. Il faut donc reconstituer un animal à partir d'os venus d'individus différents, ce qui demande beaucoup de prudence.<br><br>
<b>— Que sait-on du dodo aujourd'hui qu'on ignorait il y a vingt ans ?</b><br>
— Trois choses, au moins. D'abord, il n'était pas obèse : les tableaux anciens montrent des oiseaux engraissés en captivité, loin de chez eux. L'analyse des os décrit un animal robuste et coureur, adapté à la forêt. Ensuite, il ne pondait qu'un seul œuf, ce qui rend une espèce très fragile. Enfin, sa disparition n'est pas seulement une histoire de chasse : les rats, les cochons et les singes débarqués des navires mangeaient les œufs posés au sol.<br><br>
<b>— On dit pourtant « bête comme un dodo ».</b><br>
— C'est une injustice de langage. Le dodo n'était pas stupide ; il était sans peur, ce qui n'est pas la même chose. Une île sans prédateur ne fabrique pas des animaux méfiants. Quand l'homme est arrivé, l'oiseau n'a pas fui, parce que rien, en un million d'années, ne lui avait appris à fuir.<br><br>
<b>— Le site est-il menacé ?</b><br>
— Il l'est. Un marécage, cela se draine, cela se remblaie, cela se construit. Nous avons de la chance : celui-ci est protégé et suivi. Mais la fouille elle-même est destructrice : ce que nous sortons, nous ne pourrons jamais le remettre en place. Nous laissons donc volontairement des zones intactes pour les chercheurs qui viendront après nous, avec des méthodes que nous n'imaginons pas.<br><br>
<b>— Un conseil pour un élève qui voudrait faire votre métier ?</b><br>
— Soyez patient, et apprenez la chimie. On imagine le paléontologue avec un pinceau ; il passe surtout ses journées à trier des fragments gros comme un grain de riz. Le dodo qu'on admire au musée, ce sont des milliers d'heures de tri. Et puis regardez autour de vous : Maurice perd encore des espèces aujourd'hui. Le dodo n'est pas une histoire terminée. C'est un avertissement qui a quatre cents ans.
`, '#7c3aed');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g9fr-rcp-004-m1', chapterId:CH, difficulty:2, subsection:'reperage_explicite',
    question:_P4 + 'Où se trouve le site de Mare aux Songes ?',
    options:['dans un marécage près de l’aéroport',
             'dans une forêt du plateau central',
             'sur une falaise de la côte ouest',
             'au fond du lagon de Blue Bay'],
    answer:'dans un marécage près de l’aéroport',
    hint:'La toute première réponse de la paléontologue situe le lieu.',
    explanation:'« Une ancienne mare devenue un <b>marécage</b>, à quelques centaines de mètres de la mer, <b>près de l’aéroport</b>. » (A marsh near the airport.)' }),

  makeMCQ({ id:'g9fr-rcp-004-m2', chapterId:CH, difficulty:3, subsection:'synonymes_contexte',
    question:_P4 + 'Par quel verbe peut-on remplacer <b>se délite</b> dans « un os laissé à la surface se délite » ?',
    options:['s’effrite', 'se durcit', 'se remplit', 'se colore'],
    answer:'s’effrite',
    hint:'Le contraire est dit juste après : enfoui dans la vase, l’os « traverse les siècles ».',
    explanation:'Se déliter, c’est se défaire en morceaux, <b>s’effriter</b>. L’opposition du passage est claire : à l’air l’os se détruit, dans la vase il se conserve. (To crumble apart.)' }),

  makeMCQ({ id:'g9fr-rcp-004-m3', chapterId:CH, difficulty:4, subsection:'expression_imagee',
    question:_P4 + 'La paléontologue appelle le site « une sorte de coffre-fort mal fermé ». Que veut-elle dire ?',
    options:['il a bien conservé les os mais les a mélangés',
             'il a été pillé plusieurs fois par des voleurs',
             'il contient des objets de très grande valeur',
             'il reste fermé au public depuis quinze ans'],
    answer:'il a bien conservé les os mais les a mélangés',
    hint:'Elle explique elle-même son image dans la phrase qui suit les deux points.',
    explanation:'Un coffre-fort garde, mais « mal fermé » il laisse tout remuer : « il a gardé, mais il a mélangé ». La réponse suivante développe ce désordre — os charriés, roulés, empilés par les crues. (A strongbox that kept everything but shuffled it.)' }),

  makeMCQ({ id:'g9fr-rcp-004-m4', chapterId:CH, difficulty:4, subsection:'inference',
    question:_P4 + 'Pourquoi l’équipe laisse-t-elle volontairement des zones intactes ?',
    options:['Parce que la fouille détruit ce qu’elle explore.',
             'Parce que le budget de la fouille est limité.',
             'Parce que ces zones sont trop humides à fouiller.',
             'Parce que la loi interdit de fouiller partout.'],
    answer:'Parce que la fouille détruit ce qu’elle explore.',
    hint:'Une phrase de la même réponse commence par « Mais la fouille elle-même ».',
    explanation:'« ce que nous sortons, nous ne pourrons jamais le remettre en place ». Fouiller, c’est démonter : garder des zones vierges, c’est laisser du matériel aux méthodes futures. (Excavation is irreversible.)' }),

  makeMCQ({ id:'g9fr-rcp-004-m5', chapterId:CH, difficulty:4, subsection:'avis_personnel',
    question:_P4 + 'Un lecteur écrit : « Dire “bête comme un dodo” est injuste. » Sur quelle idée de l’entretien s’appuie-t-il le mieux ?',
    options:['Il était sans peur, faute de prédateur sur l’île.',
             'Il ne pondait qu’un seul œuf à chaque saison.',
             'Il était robuste et bien adapté à la vie en forêt.',
             'Il a été peint engraissé par les navigateurs.'],
    answer:'Il était sans peur, faute de prédateur sur l’île.',
    hint:'Cherche la phrase où la paléontologue distingue deux mots qu’on confond.',
    explanation:'« Le dodo n’était pas stupide ; il était <b>sans peur</b>, ce qui n’est pas la même chose. » L’absence de méfiance s’explique par l’absence de prédateur, pas par un manque d’intelligence. Les autres options sont vraies mais ne portent pas cet avis. (Fearless is not the same as foolish.)' }),

  makeText({ id:'g9fr-rcp-004-o1', chapterId:CH, difficulty:2, subsection:'reperage_explicite',
    question:_P4 + 'Combien d’œufs le dodo pondait-il ? Écris le nombre en chiffres.',
    answer:'1', alsoAccept:['un', 'un seul', 'un œuf'],
    hint:'C’est la deuxième des « trois choses » que l’on sait aujourd’hui.',
    explanation:'« il ne pondait qu’<b>un seul œuf</b>, ce qui rend une espèce très fragile ». Une espèce qui pond peu se reconstitue lentement. (One egg.)' }),

  makeText({ id:'g9fr-rcp-004-o2', chapterId:CH, difficulty:3, subsection:'reponses_multiples',
    question:_P4 + 'La paléontologue nomme trois animaux débarqués des navires qui mangeaient les œufs. Cite le PREMIER.',
    answer:'les rats', alsoAccept:['rats', 'le rat', 'des rats'],
    hint:'Ils sont énumérés dans la même phrase, séparés par des virgules.',
    explanation:'« <b>les rats</b>, les cochons et les singes débarqués des navires mangeaient les œufs posés au sol ». Les deux autres sont les cochons et les singes. (Rats, pigs, monkeys — in that order.)' }),

  makeText({ id:'g9fr-rcp-004-o3', chapterId:CH, difficulty:3, subsection:'synonymes_contexte',
    question:_P4 + 'Par quel adjectif d’un seul mot peut-on remplacer <b>méfiants</b> dans « ne fabrique pas des animaux méfiants » ?',
    answer:'prudents', alsoAccept:['craintifs', 'peureux', 'soupçonneux', 'vigilants'],
    hint:'Pense à l’animal qui se sauve dès qu’il entend un bruit.',
    explanation:'Un animal méfiant est <b>prudent</b>, craintif : il se tient sur ses gardes. Le dodo ne l’était pas, faute de danger pendant un million d’années. (Wary, on its guard.)' }),

  makeText({ id:'g9fr-rcp-004-o4', chapterId:CH, difficulty:4, subsection:'inference',
    question:_P4 + 'En deux mots, qu’est-ce qui a protégé les os pendant des siècles ?',
    answer:'la boue', alsoAccept:['boue', 'la vase', 'vase', 'le marécage'],
    hint:'La paléontologue oppose l’os laissé à l’air et l’os enfoui.',
    explanation:'« Parce que <b>la boue</b> les a mis à l’abri de l’air. […] Enfoui dans une vase saturée d’eau, il traverse les siècles. » C’est l’absence d’air, pas le froid ni la roche, qui conserve. (The mud sealed them from the air.)' }),

  makeText({ id:'g9fr-rcp-004-o5', chapterId:CH, difficulty:4, subsection:'expression_imagee',
    question:_P4 + 'Dans sa dernière réponse, la paléontologue dit que le dodo doit servir de leçon pour aujourd’hui. Recopie le nom qu’elle emploie (un seul mot).',
    answer:'avertissement', alsoAccept:['un avertissement', 'l’avertissement'],
    hint:'C’est le dernier nom de tout l’entretien.',
    explanation:'« Le dodo n’est pas une histoire terminée. C’est un <b>avertissement</b> qui a quatre cents ans. » Le mot déplace le dodo du passé vers le présent : Maurice perd encore des espèces. (A warning four hundred years old.)' })

);

// ══ TEXTE 5 · récit à la première personne · un jeune Rodriguais à Maurice ═
const _P5 = box(`
<b style="color:#9f1239">Lis le texte, puis réponds à la question.</b><br><br>
<b>Le bruit</b><br><br>
Le bateau met vingt-huit heures entre Port-Mathurin et Port-Louis, et pendant vingt-huit heures j'ai cru que j'allais bien.<br><br>
J'ai dix-neuf ans. À Rodrigues, mon père élève des cabris sur une pente au-dessus de Baie aux Huîtres, et il y a un an il a fait ce que font tous les pères de là-bas quand la récolte d'oignons ne suffit pas : il a parlé de Maurice. Un cousin y travaillait dans un hôtel de la côte est. On m'a trouvé une place aux cuisines. Ma mère a repassé deux chemises et les a pliées dans un sac de riz vide.<br><br>
Ce qui m'a frappé en premier, ce n'est pas la taille de Port-Louis, ni les immeubles, ni les voitures. C'est le bruit. À Rodrigues, la nuit, on entend la mer et un chien. Ici, la nuit a un moteur. Elle ne s'arrête jamais. La première semaine, j'ai dormi quatre heures par nuit et j'ai cru que j'étais malade.<br><br>
À la cuisine, on m'a mis à l'épluchage des légumes. Deux cent trente couverts le soir. Le chef s'appelle Dev ; il crie, mais il crie sur tout le monde de la même façon, et j'ai fini par comprendre que ce n'était pas contre moi. Le premier jour, il m'a demandé mon nom et je l'ai dit trop bas. Il a répété : « Plus fort. Ici, si on ne t'entend pas, tu n'existes pas. »<br><br>
Il y a eu des choses drôles. Mon créole n'est pas exactement le leur ; les mots ne tombent pas au même endroit, et j'ai des tournures qui font sourire. Au début, on m'a appelé « Rodrig », comme si c'était un prénom. J'ai ri avec eux, ce n'était pas méchant. Mais le soir, dans la chambre que je partage avec trois autres, j'ai compté les jours qui me séparaient du prochain bateau, et il y en avait beaucoup.<br><br>
J'envoie de l'argent le premier de chaque mois. Cela, personne ne le voit. Mon salaire, je le partage en trois : la chambre, ce que j'envoie à Rodrigues, et une petite part que je garde dans une boîte en fer. Dans la boîte, il y a aussi un caillou de la plage de Saint-François, ce qui est ridicule, je le sais.<br><br>
Ma mère téléphone le dimanche. Elle demande toujours si je mange. Je réponds toujours oui. Elle ne demande jamais si je suis heureux, et je crois que c'est exprès : il y a des questions qu'on ne pose pas quand on connaît déjà la réponse et qu'on ne peut rien y faire.<br><br>
En janvier, Dev m'a mis aux sauces. C'est une promotion. Il ne l'a pas dit comme ça ; il a posé une casserole devant moi et il a dit : « Toi. » J'ai compris. Ce soir-là, j'ai appelé mon père, et pour la première fois depuis le bateau, c'est moi qui ai parlé le plus longtemps.<br><br>
Je ne dis pas que je suis d'ici. Je dis que le bruit, maintenant, je ne l'entends plus. On s'habitue à tout, et ce n'est pas seulement une bonne nouvelle : le jour où l'on cesse d'entendre le bruit, on cesse aussi d'entendre un peu la mer et le chien.<br><br>
Le prochain bateau part le douze. Je ne serai pas dessus. Mais j'ai regardé l'horaire, comme on touche une clé dans sa poche pour être sûr qu'elle y est encore.
`, '#be123c');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g9fr-rcp-005-m1', chapterId:CH, difficulty:2, subsection:'reperage_explicite',
    question:_P5 + 'Quel travail confie-t-on d’abord au narrateur à l’hôtel ?',
    options:['l’épluchage des légumes',
             'le nettoyage des chambres',
             'le service en salle',
             'les sauces du soir'],
    answer:'l’épluchage des légumes',
    hint:'Le paragraphe qui présente le chef Dev commence par ce détail.',
    explanation:'« À la cuisine, on m’a mis à l’<b>épluchage des légumes</b>. » Les sauces ne viendront qu’en janvier, et c’est justement la promotion. (Peeling vegetables first.)' }),

  makeMCQ({ id:'g9fr-rcp-005-m2', chapterId:CH, difficulty:4, subsection:'expression_imagee',
    question:_P5 + '« Ici, la nuit a un moteur. » Que veut dire le narrateur ?',
    options:['la ville ne cesse jamais de faire du bruit',
             'les voitures roulent toute la nuit en ville',
             'l’hôtel fonctionne avec un générateur',
             'le bateau part toujours après minuit'],
    answer:'la ville ne cesse jamais de faire du bruit',
    hint:'Compare avec la phrase juste avant, sur les nuits de Rodrigues.',
    explanation:'La métaphore prête à la nuit un moteur qui tourne sans arrêt : « Elle ne s’arrête jamais. » Elle s’oppose à Rodrigues, « on entend la mer et un chien ». Il ne s’agit pas des voitures seules, mais du bruit continu de la ville. (The night has an engine.)' }),

  makeMCQ({ id:'g9fr-rcp-005-m3', chapterId:CH, difficulty:4, subsection:'inference',
    question:_P5 + 'Pourquoi la mère ne demande-t-elle jamais à son fils s’il est heureux ?',
    options:['Parce qu’elle devine la réponse et ne peut rien changer.',
             'Parce qu’elle n’a pas assez de crédit pour parler longtemps.',
             'Parce qu’elle pense que le travail rend toujours heureux.',
             'Parce qu’elle oublie de poser la question chaque dimanche.'],
    answer:'Parce qu’elle devine la réponse et ne peut rien changer.',
    hint:'Le narrateur explique lui-même la règle, juste après les deux points.',
    explanation:'« il y a des questions qu’on ne pose pas quand on connaît déjà la réponse et qu’on ne peut rien y faire ». Le silence est une délicatesse, pas un oubli. (She spares them both.)' }),

  makeMCQ({ id:'g9fr-rcp-005-m4', chapterId:CH, difficulty:3, subsection:'synonymes_contexte',
    question:_P5 + 'Par quel adjectif peut-on remplacer <b>exprès</b> dans « je crois que c’est exprès » ?',
    options:['volontaire', 'inutile', 'amusant', 'impossible'],
    answer:'volontaire',
    hint:'Le narrateur pense que sa mère se tait pour une raison.',
    explanation:'Faire quelque chose exprès, c’est le faire <b>volontairement</b>. Le narrateur suppose que le silence de sa mère est choisi. (On purpose = deliberate.)' }),

  makeMCQ({ id:'g9fr-rcp-005-m5', chapterId:CH, difficulty:4, subsection:'avis_personnel',
    question:_P5 + 'Un lecteur affirme : « Le narrateur commence à trouver sa place. » Quel détail du récit soutient le mieux cet avis ?',
    options:['Dev lui confie les sauces et il téléphone à son père.',
             'Il compte encore les jours avant le prochain bateau.',
             'Il garde un caillou de Saint-François dans sa boîte.',
             'Ses collègues l’appellent « Rodrig » pour rire.'],
    answer:'Dev lui confie les sauces et il téléphone à son père.',
    hint:'Cherche le seul moment où c’est le narrateur qui parle le plus longtemps.',
    explanation:'La promotion et l’appel où « c’est moi qui ai parlé le plus longtemps » marquent un tournant. Les trois autres détails disent au contraire le manque du pays. (Only one detail shows him moving forward.)' }),

  makeText({ id:'g9fr-rcp-005-o1', chapterId:CH, difficulty:2, subsection:'reperage_explicite',
    question:_P5 + 'Combien d’heures dure la traversée entre Port-Mathurin et Port-Louis ? Écris le nombre en chiffres.',
    answer:'28', alsoAccept:['vingt-huit', 'vingt huit', '28 heures'],
    hint:'C’est la toute première phrase du récit.',
    explanation:'« Le bateau met <b>vingt-huit</b> heures entre Port-Mathurin et Port-Louis. » La phrase répète le nombre pour insister sur la longueur du voyage. (Twenty-eight hours.)' }),

  makeText({ id:'g9fr-rcp-005-o2', chapterId:CH, difficulty:3, subsection:'inference',
    question:_P5 + 'En deux mots, qu’est-ce qui empêche le narrateur de dormir pendant sa première semaine ?',
    answer:'le bruit', alsoAccept:['bruit', 'les bruits', 'le bruit de la ville'],
    hint:'Il croit être malade, mais le paragraphe donne la vraie cause.',
    explanation:'« C’est <b>le bruit</b>. […] La première semaine, j’ai dormi quatre heures par nuit et j’ai cru que j’étais malade. » Ce n’était pas une maladie mais un dépaysement. (The noise, not an illness.)' }),

  makeText({ id:'g9fr-rcp-005-o3', chapterId:CH, difficulty:3, subsection:'reponses_multiples',
    question:_P5 + 'Le narrateur partage son salaire en trois parts. Cite la PREMIÈRE nommée dans le texte.',
    answer:'la chambre', alsoAccept:['chambre', 'le loyer', 'sa chambre'],
    hint:'Une seule phrase énumère les trois parts après les deux points.',
    explanation:'« je le partage en trois : <b>la chambre</b>, ce que j’envoie à Rodrigues, et une petite part que je garde ». (Rent, remittance, savings — in that order.)' }),

  makeText({ id:'g9fr-rcp-005-o4', chapterId:CH, difficulty:3, subsection:'synonymes_contexte',
    question:_P5 + 'Par quel adjectif d’un seul mot peut-on remplacer <b>ridicule</b> dans « ce qui est ridicule, je le sais » ?',
    answer:'idiot', alsoAccept:['bête', 'absurde', 'stupide', 'insensé'],
    hint:'Le narrateur juge lui-même son geste, sans se plaindre.',
    explanation:'Il trouve son caillou <b>idiot</b>, absurde — et il le garde quand même : c’est ce décalage qui rend la phrase touchante. (He calls it silly, and keeps it.)' }),

  makeText({ id:'g9fr-rcp-005-o5', chapterId:CH, difficulty:4, subsection:'expression_imagee',
    question:_P5 + 'À la fin, le narrateur compare l’horaire du bateau à un objet qu’on touche dans sa poche. Quel est cet objet ?',
    answer:'une clé', alsoAccept:['clé', 'la clé', 'sa clé'],
    hint:'La comparaison est introduite par « comme on touche… ».',
    explanation:'« comme on touche <b>une clé</b> dans sa poche pour être sûr qu’elle y est encore ». La clé, c’est la possibilité du retour : il ne s’en sert pas, il vérifie qu’elle existe. (A key: the way home, kept but unused.)' })

);

// ══ TEXTE 6 · journal intime · le temps passé devant les écrans ═══════════
const _P6 = box(`
<b style="color:#075985">Lis le texte, puis réponds à la question.</b><br><br>
<b>Sept jours</b><br>
<i>Extraits du carnet de Yashna, Grade 9.</i><br><br>
<b>Lundi 3, 21 h 40.</b> Le défi commence demain. En classe, madame Rousseau nous a proposé une semaine sans écran en dehors du travail scolaire : pas de réseaux, pas de vidéos, pas de jeux. Vingt-trois d'entre nous ont signé la feuille. Kevin a dit que c'était impossible. Moi, j'ai signé la première, ce qui, je le vois maintenant, était surtout de l'orgueil.<br><br>
<b>Mardi 4.</b> Journée facile. J'ai lu quarante pages, j'ai aidé ma sœur pour ses tables, j'ai même rangé mon tiroir. J'ai regardé l'heure onze fois. J'ai attrapé mon téléphone quatre fois sans raison, et chaque fois ma main était partie avant moi.<br><br>
<b>Mercredi 5.</b> Le plus dur n'est pas de ne pas regarder. Le plus dur est de ne pas savoir. Le groupe de la classe continue sans moi ; quand je reviendrai, il y aura deux cents messages et une blague que je ne comprendrai pas. Ce n'est pas l'écran qui me manque, c'est d'être dedans.<br><br>
<b>Jeudi 6.</b> Dispute à table. Mon père m'a félicitée pour le défi en tenant son téléphone dans l'autre main. Je le lui ai fait remarquer. Il a répondu que lui, c'était pour le travail. Ma mère a ri. Personne n'a rien changé, mais on en a parlé pour la première fois, et c'est déjà quelque chose. On dirait que dans cette maison, chacun garde son écran comme un parapluie ouvert à l'intérieur.<br><br>
<b>Vendredi 7.</b> Dormi huit heures. Cela ne m'était pas arrivé depuis… je ne sais pas. Je crois que je m'endormais toujours en descendant la page. Ce matin je me suis réveillée sans le poids sur la tête. C'est le seul résultat vraiment mesurable de la semaine, et il est arrivé sans que je le cherche.<br><br>
<b>Samedi 8.</b> Grand-mère est venue. Je me suis assise avec elle sur la varangue et je lui ai posé des questions pendant une heure et demie : son école, le cyclone de 1975, son premier salaire. Je connais maintenant le nom de son institutrice. L'an dernier, je crois que j'aurais tenu dix minutes. Ce n'est pas que le téléphone m'aurait interdit d'écouter ; c'est qu'il m'aurait donné, toutes les deux minutes, une bonne raison de m'arrêter.<br><br>
<b>Dimanche 9.</b> Kevin a abandonné mercredi. Il l'a annoncé sans honte, ce que je trouve honnête. Sur les vingt-trois, nous sommes onze à avoir terminé. Madame Rousseau a demandé ce que nous en gardions. Trois filles ont répondu « rien ». Je ne crois pas qu'elles mentent : une semaine, c'est court.<br><br>
<b>Lundi 10, 22 h.</b> J'ai repris mon téléphone à sept heures. Deux cent quarante-huit messages, et la blague, effectivement, je ne l'ai pas comprise. En vingt minutes, j'étais revenue exactement où j'étais. C'est cela qui m'inquiète, et non la semaine passée. Alors j'ai décidé quelque chose de plus petit et de plus tenable : pas d'écran après vingt et une heures, et le téléphone hors de la chambre la nuit. Une semaine sans écran ne change rien à une vie. Une heure par jour, peut-être.
`, '#0369a1');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g9fr-rcp-006-m1', chapterId:CH, difficulty:2, subsection:'reperage_explicite',
    question:_P6 + 'Combien d’élèves ont signé la feuille au départ ?',
    options:['vingt-trois', 'quarante-huit', 'deux cents', 'onze'],
    answer:'vingt-trois',
    hint:'La première entrée du carnet donne le nombre de signatures.',
    explanation:'« <b>Vingt-trois</b> d’entre nous ont signé la feuille. » Onze est le nombre de ceux qui ont terminé, ce qui n’est pas la même chose. (Twenty-three signed, eleven finished.)' }),

  makeMCQ({ id:'g9fr-rcp-006-m2', chapterId:CH, difficulty:4, subsection:'inference',
    question:_P6 + 'Pourquoi Yashna écrit-elle que signer la première était « surtout de l’orgueil » ?',
    options:['Elle voulait montrer aux autres qu’elle y arriverait.',
             'Elle voulait faire plaisir à madame Rousseau ce jour-là.',
             'Elle croyait que le défi serait noté sur le bulletin.',
             'Elle pensait que Kevin abandonnerait avant mercredi.'],
    answer:'Elle voulait montrer aux autres qu’elle y arriverait.',
    hint:'Regarde qui vient de parler juste avant qu’elle ne signe.',
    explanation:'Kevin venait de dire « que c’était impossible » : signer la première était une réponse à ce défi, donc de la fierté plus qu’une conviction. Elle le reconnaît elle-même, « je le vois maintenant ». (Pride, in answer to Kevin.)' }),

  makeMCQ({ id:'g9fr-rcp-006-m3', chapterId:CH, difficulty:4, subsection:'expression_imagee',
    question:_P6 + '« chacun garde son écran comme un parapluie ouvert à l’intérieur » suggère que l’écran…',
    options:['protège de quelque chose là où il n’y a rien',
             'appartient à une seule personne à la fois',
             'sert surtout pendant la saison des pluies',
             'abîme les meubles de la maison familiale'],
    answer:'protège de quelque chose là où il n’y a rien',
    hint:'Demande-toi à quoi sert un parapluie, puis où il est ouvert ici.',
    explanation:'Un parapluie ouvert dans une maison ne sert à rien et gêne tout le monde : l’image dit que chacun se protège des siens alors qu’aucun danger ne l’exige. C’est écrit juste après la dispute à table. (An umbrella opened indoors.)' }),

  makeMCQ({ id:'g9fr-rcp-006-m4', chapterId:CH, difficulty:3, subsection:'synonymes_contexte',
    question:_P6 + 'Par quel adjectif peut-on remplacer <b>tenable</b> dans « quelque chose de plus petit et de plus tenable » ?',
    options:['réaliste', 'ennuyeux', 'coûteux', 'bruyant'],
    answer:'réaliste',
    hint:'Elle compare cette décision à la semaine entière qui vient de finir.',
    explanation:'Tenable veut dire ici « qu’on peut tenir dans la durée », donc <b>réaliste</b>. Elle oppose une règle quotidienne modeste à un exploit d’une semaine. (Sustainable, workable.)' }),

  makeMCQ({ id:'g9fr-rcp-006-m5', chapterId:CH, difficulty:4, subsection:'avis_personnel',
    question:_P6 + 'Un lecteur écrit : « Yashna tire de la semaine une leçon modeste mais honnête. » Sur quelle décision finale s’appuie-t-il ?',
    options:['Elle s’interdit les écrans après vingt et une heures.',
             'Elle décide de refaire le défi pendant un mois entier.',
             'Elle rend son téléphone à ses parents jusqu’aux examens.',
             'Elle promet de ne plus jamais ouvrir les réseaux.'],
    answer:'Elle s’interdit les écrans après vingt et une heures.',
    hint:'La dernière entrée du carnet énonce une règle en deux parties.',
    explanation:'« pas d’écran après vingt et une heures, et le téléphone hors de la chambre la nuit ». La leçon est petite exprès : « Une semaine sans écran ne change rien à une vie. Une heure par jour, peut-être. » (A small rule she can keep.)' }),

  makeText({ id:'g9fr-rcp-006-o1', chapterId:CH, difficulty:2, subsection:'reperage_explicite',
    question:_P6 + 'Combien d’élèves ont terminé le défi ? Écris le nombre en chiffres.',
    answer:'11', alsoAccept:['onze', 'onze élèves', '11 élèves'],
    hint:'L’entrée du dimanche fait le compte.',
    explanation:'« Sur les vingt-trois, nous sommes <b>onze</b> à avoir terminé. » (Eleven out of twenty-three.)' }),

  makeText({ id:'g9fr-rcp-006-o2', chapterId:CH, difficulty:4, subsection:'expression_imagee',
    question:_P6 + 'Yashna écrit : « je m’endormais toujours en descendant la page ». Recopie le verbe qui décrit ce geste du doigt sur l’écran (un seul mot).',
    answer:'descendant', alsoAccept:['descendre', 'en descendant', 'je descendais'],
    hint:'Le verbe est au participe présent, juste après « en ».',
    explanation:'« en <b>descendant</b> la page » : le mot ordinaire du défilement, employé sans nom de marque, dit à la fois le geste et l’absence de fin — une page qui descend toujours. (Scrolling down.)' }),

  makeText({ id:'g9fr-rcp-006-o3', chapterId:CH, difficulty:3, subsection:'reponses_multiples',
    question:_P6 + 'Le lundi 10, Yashna prend deux décisions. La SECONDE concerne l’endroit où le téléphone passe la nuit. Où doit-il être ?',
    answer:'hors de la chambre', alsoAccept:['hors de sa chambre', 'pas dans la chambre', 'en dehors de la chambre'],
    hint:'La règle est écrite en deux parties, reliées par « et ».',
    explanation:'« pas d’écran après vingt et une heures, et le téléphone <b>hors de la chambre</b> la nuit ». La première décision porte sur l’heure, la seconde sur le lieu. (Out of the bedroom at night.)' }),

  makeText({ id:'g9fr-rcp-006-o4', chapterId:CH, difficulty:3, subsection:'synonymes_contexte',
    question:_P6 + 'Par quel adjectif d’un seul mot peut-on remplacer <b>mesurable</b> dans « le seul résultat vraiment mesurable » ?',
    answer:'concret', alsoAccept:['chiffrable', 'visible', 'réel', 'net'],
    hint:'Elle vient de donner un nombre d’heures de sommeil.',
    explanation:'Mesurable veut dire ici <b>concret</b>, chiffrable : huit heures de sommeil se comptent, alors que « se sentir mieux » ne se compte pas. (Something you can actually count.)' }),

  makeText({ id:'g9fr-rcp-006-o5', chapterId:CH, difficulty:4, subsection:'inference',
    question:_P6 + 'En deux mots, quel bénéfice physique Yashna constate-t-elle le vendredi ?',
    answer:'le sommeil', alsoAccept:['sommeil', 'du sommeil', 'un meilleur sommeil', 'le repos'],
    hint:'L’entrée du vendredi commence par deux mots seulement.',
    explanation:'« Dormi huit heures. » Le seul gain qu’elle accepte d’appeler un résultat est <b>le sommeil</b>, « et il est arrivé sans que je le cherche ». (Sleep — the one measurable gain.)' })

);

})();
