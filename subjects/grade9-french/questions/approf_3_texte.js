'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  grade9-french — lot « approfondissement 3 »   ·   IDs g9fr-ap3-001 … 065
//
//  DEUX CHAPITRES, 65 items :
//    g9fr-comprehension (27) — trois textes ORIGINAUX, contexte mauricien,
//      repris en entier sur chaque question du bloc, comme le fait déjà
//      rcp_textes.js : l'enfant ne doit jamais remonter vers une question
//      qu'il a quittée.
//    g9fr-redaction (38) — les COMPOSANTES de l'écriture, toutes corrigeables
//      automatiquement : ordre d'un plan, phrase d'accroche, cohérence des
//      temps, reprise pronominale, découpage en paragraphes, registre de
//      langue, connecteurs, choix du temps du récit.
//
//  ⚠⚠ AUCUN ITEM DE CE FICHIER NE DEMANDE DE RÉDIGER UN TEXTE LONG, et aucun
//     ne suppose une manière de corriger une rédaction. docs/nce-grade9/
//     batch_plan.md §4 dit que le traitement des réponses écrites longues
//     (Q9, 15 points) est une décision NON PRISE. Écrire ici un item
//     « Rédige un paragraphe de 80 mots » reviendrait à trancher cette
//     décision par la bande, donc rien de tel n'a été écrit : tout item de
//     g9fr-redaction ci-dessous se corrige par un choix ou par un mot recopié.
//
//  ⚠ Les trois textes sont écrits pour ce dépôt. Rien n'est repris d'un
//    journal, d'un manuel, d'un site ni d'une œuvre publiée. Les sujets sont
//    volontairement DIFFÉRENTS de ceux déjà présents dans le pack (le corail
//    de Blue Bay, l'Aapravasi Ghat, l'eau et le tourisme, les fossiles de
//    dodo, le jeune Rodriguais, le journal des écrans, la marchande de
//    gâteaux piments, le pêcheur Jayen, le carnet de Nadia, les poubelles du
//    collège, l'oncle et la neige).
//
//  ⚠ Les listes d'options évitent de poser côte à côte deux connecteurs
//    interchangeables (cependant / pourtant, enfin / finalement) : deux
//    options synonymes s'éliminent l'une l'autre sans connaître le français.
//    Voir scripts/test-option-synonyms.js.
// ══════════════════════════════════════════════════════════════════════════
(function () {

const CO = 'g9fr-comprehension';
const RE = 'g9fr-redaction';

// ⚠ background ET color sont posés tous les deux : l'appli a un thème sombre,
//   et une boîte qui ne fixe que son fond hérite d'un texte blanc sur blanc.
function box(inner, accent) {
  return '<div style="background:#f8fafc;border-left:4px solid ' + accent +
    ';border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">' +
    inner + '</div>';
}

// ══ TEXTE A · compte rendu de visite · le camion-bibliothèque ══════════════
const _TA = box(`
<b style="color:#1d4ed8">Lis le texte, puis réponds à la question.</b><br><br>
<b>Le camion qui prête des livres</b><br>
<i>Compte rendu de visite — Chemin Grenier, août</i><br><br>
Le mardi, à deux heures précises, un camion blanc se gare devant l’école de Chemin Grenier. Sur son flanc, une phrase peinte à la main : « Un livre voyage plus loin qu’un bateau. » Les portes arrière s’ouvrent et découvrent trois rangées d’étagères, quatre cent vingt ouvrages, un tabouret et une lampe.<br><br>
Le camion appartient à une association de quartier fondée il y a six ans par une ancienne institutrice, Mme Perrine Lagesse. « Au village, la bibliothèque la plus proche est à onze kilomètres », explique-t-elle. « Pour un enfant de dix ans sans transport, onze kilomètres, c’est l’autre bout du monde. » Elle a donc décidé que ce seraient les livres qui feraient le trajet.<br><br>
Le prêt est gratuit. Chaque lecteur inscrit repart avec deux ouvrages et les rapporte la semaine suivante. Deux bénévoles tiennent le registre : Yashvin, dix-sept ans, et Sandrine, retraitée des postes. « Les enfants viennent pour les bandes dessinées, admet Yashvin en riant. Ils repartent souvent avec autre chose. »<br><br>
L’association suit deux règles que Mme Lagesse défend avec fermeté. La première : aucun livre abîmé n’est facturé. « Un livre déchiré, cela veut dire qu’il a été lu dans un lit, sous une table, dans un bus. C’est exactement ce que nous voulons. » La seconde : le mercredi, le camion s’arrête aussi devant le dispensaire et devant le terrain de foot, et non plus seulement devant l’école, pour atteindre ceux qui n’y vont plus.<br><br>
Les chiffres tenus par l’association sont modestes : trente-deux inscrits la première année, deux cent quarante aujourd’hui. Le carburant reste la dépense la plus lourde ; les dons de livres, eux, ne manquent pas.<br><br>
À quatre heures, le camion repart. Sandrine range la lampe. « On ne remplit pas une salle, dit-elle. On remplit des sacs. »
`, '#2563eb');

STATIC_QUESTIONS.push(

  makeText({ id:'g9fr-ap3-001', chapterId:CO, difficulty:1, subsection:'reperage_explicite',
    question:_TA + 'Combien de kilomètres séparent le village de la bibliothèque la plus proche ? Écris le nombre en chiffres.',
    answer:'11', alsoAccept:['onze', '11 km', 'onze kilomètres', '11 kilomètres'],
    hint:'Le chiffre est donné dans une phrase entre guillemets, prononcée par Mme Lagesse.',
    explanation:'« Au village, la bibliothèque la plus proche est à <b>onze</b> kilomètres. » Les autres nombres du texte comptent des livres, des années ou des lecteurs : avant de recopier un nombre, demande-toi toujours ce qu’il compte. (Eleven kilometres.)' }),

  makeMCQ({ id:'g9fr-ap3-002', chapterId:CO, difficulty:2, subsection:'synonymes_contexte',
    question:_TA + 'Par quel groupe de mots peut-on remplacer <b>modestes</b> dans « Les chiffres […] sont modestes » ?',
    options:['peu élevés', 'très élevés', 'mal comptés', 'bien connus'],
    answer:'peu élevés',
    hint:'Il ne s’agit pas ici d’une personne qui ne se vante pas, mais de nombres.',
    explanation:'Appliqué à des chiffres, <b>modeste</b> veut dire <b>peu élevé</b> : trente-deux inscrits, puis deux cent quarante, pour une région entière. Le piège est de garder le sens de « modeste » appliqué à une personne (qui ne se vante pas) : un mot change de sens selon ce qu’il accompagne. (Modest here = small.)' }),

  makeMCQ({ id:'g9fr-ap3-003', chapterId:CO, difficulty:2, subsection:'expression_imagee',
    question:_TA + 'Mme Lagesse dit : « onze kilomètres, c’est l’autre bout du monde ». Que veut-elle dire ?',
    options:['pour un enfant à pied, c’est hors d’atteinte',
             'pour un enfant, c’est un voyage très amusant',
             'pour un adulte, c’est une promenade banale',
             'pour tout le village, c’est la route habituelle'],
    answer:'pour un enfant à pied, c’est hors d’atteinte',
    hint:'Regarde à qui elle pense dans la phrase : elle vient de nommer quelqu’un de précis.',
    explanation:'Elle parle d’« un enfant de dix ans sans transport » : pour lui, onze kilomètres sont aussi inaccessibles qu’un autre continent. L’expression exagère la distance pour faire sentir l’obstacle ; lue au sens propre, elle deviendrait fausse, puisque onze kilomètres ne font pas le tour de la Terre. (The other side of the world.)' }),

  makeMCQ({ id:'g9fr-ap3-004', chapterId:CO, difficulty:2, subsection:'reponses_multiples',
    question:_TA + 'Le mercredi, devant quels <b>deux</b> lieux le camion s’arrête-t-il en plus de l’école ?',
    options:['devant le dispensaire et le terrain de foot',
             'devant la bibliothèque et le terrain de foot',
             'devant le dispensaire et la gare des autobus',
             'devant la boutique du coin et le dispensaire'],
    answer:'devant le dispensaire et le terrain de foot',
    hint:'La réponse est dans la phrase qui commence par « La seconde ».',
    explanation:'« le camion s’arrête aussi devant le <b>dispensaire</b> et devant le <b>terrain de foot</b> ». La bibliothèque, justement, est à onze kilomètres : c’est le problème, pas un arrêt. Quand une question demande deux éléments, les deux doivent venir de la même phrase du texte. (Two stops, one sentence.)' }),

  makeMCQ({ id:'g9fr-ap3-005', chapterId:CO, difficulty:1, subsection:'reponses_multiples',
    question:_TA + 'Qui sont les <b>deux</b> bénévoles qui tiennent le registre ?',
    options:['Yashvin et Sandrine', 'Yashvin et Perrine', 'Perrine et Sandrine', 'Sandrine et Ludovic'],
    answer:'Yashvin et Sandrine',
    hint:'Les deux noms se suivent après deux points, dans le paragraphe sur le prêt.',
    explanation:'« Deux bénévoles tiennent le registre : <b>Yashvin</b>, dix-sept ans, et <b>Sandrine</b>, retraitée des postes. » Perrine Lagesse a fondé l’association : elle est citée ailleurs, ce qui en fait un piège facile pour qui lit vite. (Two volunteers, named together.)' }),

  makeMCQ({ id:'g9fr-ap3-006', chapterId:CO, difficulty:3, subsection:'reponses_multiples',
    question:_TA + 'Quelles sont les <b>deux</b> règles que l’association défend ?',
    options:['ne rien facturer et desservir d’autres lieux que l’école',
             'ne rien facturer et n’accepter que des livres vraiment neufs',
             'prêter quatre ouvrages et desservir d’autres lieux',
             'prêter quatre ouvrages et n’ouvrir que le mardi matin'],
    answer:'ne rien facturer et desservir d’autres lieux que l’école',
    hint:'Le texte annonce « deux règles », puis les introduit par « La première » et « La seconde ».',
    explanation:'La première règle : « aucun livre abîmé n’est facturé ». La seconde : le camion s’arrête aussi au dispensaire et au terrain de foot. Le texte dit par ailleurs que chaque lecteur emporte <b>deux</b> ouvrages, pas quatre, et que les dons de livres « ne manquent pas » — il n’exige nulle part des livres neufs. (Two rules, both signposted.)' }),

  makeText({ id:'g9fr-ap3-007', chapterId:CO, difficulty:1, subsection:'reponses_multiples',
    question:_TA + 'L’association donne <b>deux</b> nombres d’inscrits. Écris en chiffres celui de la première année.',
    answer:'32', alsoAccept:['trente-deux', 'trente deux', '32 inscrits'],
    hint:'Les deux nombres sont dans la même phrase, séparés par une virgule.',
    explanation:'« <b>trente-deux</b> inscrits la première année, deux cent quarante aujourd’hui ». Le second nombre est le plus gros, donc le plus visible : quand une phrase donne deux chiffres, relis la fin de chacun pour savoir lequel la question demande. (Thirty-two, then two hundred and forty.)' }),

  makeMCQ({ id:'g9fr-ap3-008', chapterId:CO, difficulty:2, subsection:'avis_personnel',
    question:_TA + 'Un lecteur veut défendre l’idée que l’association pense aux enfants qui ont quitté l’école. Sur quel élément du texte doit-il s’appuyer ?',
    options:['le camion s’arrête aussi loin de l’école le mercredi',
             'le camion transporte quatre cent vingt ouvrages en tout',
             'le prêt des deux ouvrages est entièrement gratuit',
             'les enfants viennent surtout pour les bandes dessinées'],
    answer:'le camion s’arrête aussi loin de l’école le mercredi',
    hint:'Cherche la décision prise expressément « pour atteindre ceux qui n’y vont plus ».',
    explanation:'Le texte justifie lui-même le second arrêt : « pour atteindre ceux qui n’y vont plus ». La gratuité et le nombre d’ouvrages servent tous les lecteurs, y compris ceux qui sont scolarisés : un avis n’est défendable que si une ligne précise du texte le porte. (An opinion needs its line.)' }),

  makeMCQ({ id:'g9fr-ap3-009', chapterId:CO, difficulty:3, subsection:'avis_personnel',
    question:_TA + 'Un lecteur affirme que Mme Lagesse préfère qu’un livre soit lu plutôt que bien conservé. Quelle phrase le montre ?',
    options:['« Un livre déchiré, cela veut dire qu’il a été lu. »',
             '« Un livre voyage plus loin qu’un bateau. »',
             '« Les enfants viennent pour les bandes dessinées. »',
             '« On ne remplit pas une salle. On remplit des sacs. »'],
    answer:'« Un livre déchiré, cela veut dire qu’il a été lu. »',
    hint:'Une seule des quatre phrases parle de l’<b>état</b> du livre.',
    explanation:'Elle transforme le dégât en preuve d’usage, et ajoute : « C’est exactement ce que nous voulons. » Les trois autres phrases sont belles, mais elles parlent du voyage du livre, du goût des enfants ou du prêt à domicile, pas de l’état du livre. (Torn = read.)' }),

  makeMCQ({ id:'g9fr-ap3-010', chapterId:CO, difficulty:3, subsection:'avis_personnel',
    question:_TA + 'Un lecteur trouve que le projet reste fragile malgré sa réussite. Quel élément du texte lui donne raison ?',
    options:['la dépense de carburant pèse sur l’association',
             'la bibliothèque la plus proche est à onze kilomètres',
             'les enfants empruntent surtout des bandes dessinées',
             'le camion ne se gare devant l’école que le mardi'],
    answer:'la dépense de carburant pèse sur l’association',
    hint:'Cherche la seule difficulté que le texte présente comme non résolue.',
    explanation:'« Le carburant reste la dépense la plus lourde ; les dons de livres, eux, ne manquent pas. » Le texte oppose les deux : les livres arrivent, l’argent du trajet non. Les trois autres options décrivent le projet, elles ne disent rien de sa solidité. (Fuel is the unsolved cost.)' })

);

// ══ TEXTE B · récit à la première personne · la nuit du cyclone ════════════
const _TB = box(`
<b style="color:#b45309">Lis le texte, puis réponds à la question.</b><br><br>
<b>La nuit où le vent a tout pris</b><br>
<i>Récit — Quatre Bornes</i><br><br>
J’avais douze ans le soir où le cyclone est entré chez nous. À six heures, la radio a annoncé la classe III et mon père a cloué la dernière planche sur la fenêtre de la cuisine. Ma mère avait rempli la baignoire, deux seaux et toutes les bouteilles vides ; elle disait que l’eau partirait avant l’électricité. Elle avait raison sur les deux.<br><br>
Nous nous sommes installés dans le couloir, le seul endroit de la maison sans fenêtre. Ma grand-mère a posé à côté d’elle une boîte en carton et n’a plus voulu la lâcher. Dedans, il n’y avait ni argent ni bijoux : des photographies, un carnet de recettes et le certificat de mariage de mes parents.<br><br>
Vers dix heures, le bruit a changé. Jusque-là, le vent sifflait ; il s’est mis à cogner. On aurait dit quelqu’un qui frappait le toit avec le plat de la main, de plus en plus vite. Mon petit frère s’est bouché les oreilles. Mon père, lui, regardait le plafond et ne disait rien, et c’est ce silence-là qui m’a fait le plus peur.<br><br>
À minuit, quelque chose est parti sur le toit. Un bruit sec, puis de l’eau. Nous avons poussé les matelas contre le mur du fond et nous avons attendu jusqu’au matin, serrés, sans dormir.<br><br>
Quand mon père a ouvert la porte, le jardin avait disparu sous les tôles des voisins. Le manguier de ma grand-mère, qu’elle avait planté à la naissance de ma mère, était couché en travers de la cour. Elle est restée un long moment devant lui. Puis elle a dit, en serrant sa boîte : « Le vent a pris l’arbre. Il n’a pas pris ce qu’il y avait dedans. »<br><br>
Nous avons mis trois semaines à retrouver l’électricité et deux ans à refaire le toit.
`, '#d97706');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g9fr-ap3-011', chapterId:CO, difficulty:3, subsection:'inference',
    question:_TB + 'Le texte ne dit jamais pourquoi la boîte compte autant pour la grand-mère. Que peut-on en <b>déduire</b> ?',
    options:['elle y garde ce qui ne se rachète pas',
             'elle y garde les économies de la famille',
             'elle y garde des papiers pour les voisins',
             'elle y garde de quoi réparer le toit percé'],
    answer:'elle y garde ce qui ne se rachète pas',
    hint:'Relis la liste de ce que la boîte contient — et surtout ce qu’elle ne contient pas.',
    explanation:'« il n’y avait ni argent ni bijoux : des photographies, un carnet de recettes et le certificat de mariage ». Le texte écarte lui-même la valeur marchande : ce qui reste est irremplaçable. Déduire, c’est ajouter ce que le texte laisse entendre ; recopier « des photographies » serait seulement relever. (Nothing there can be bought again.)' }),

  makeMCQ({ id:'g9fr-ap3-012', chapterId:CO, difficulty:2, subsection:'expression_imagee',
    question:_TB + '« On aurait dit quelqu’un qui frappait le toit avec le plat de la main. » Que fait cette image ?',
    options:['elle rend le bruit du vent presque humain',
             'elle explique comment le toit a été posé',
             'elle montre que quelqu’un était sur le toit',
             'elle compare le vent à une pluie très fine'],
    answer:'elle rend le bruit du vent presque humain',
    hint:'Demande-toi à quoi le narrateur compare le vent, et si cette comparaison est vraie.',
    explanation:'« On aurait dit » annonce une comparaison, pas un fait : le vent est prêté à une main qui frappe, ce qui rend le bruit plus proche et plus menaçant. Lire l’image au sens propre conduirait à croire qu’un homme était réellement sur le toit en pleine nuit de cyclone. (A simile, not a fact.)' }),

  makeText({ id:'g9fr-ap3-013', chapterId:CO, difficulty:2, subsection:'synonymes_contexte',
    question:_TB + 'Relève dans le texte le verbe à l’infinitif qui signifie « frapper à coups sourds », employé pour le vent.',
    answer:'cogner', alsoAccept:['à cogner', 'se mettre à cogner'],
    hint:'Le texte oppose deux bruits du vent : celui d’avant dix heures et celui d’après.',
    explanation:'« Jusque-là, le vent sifflait ; il s’est mis à <b>cogner</b>. » Le point-virgule marque le changement : siffler est aigu et continu, cogner est sourd et répété. « Relever » veut dire recopier le mot de l’auteur, pas proposer un synonyme de sa tête. (To knock, to bang.)' }),

  makeMCQ({ id:'g9fr-ap3-014', chapterId:CO, difficulty:1, subsection:'reponses_multiples',
    question:_TB + 'La boîte de la grand-mère contient <b>trois</b> choses. Lesquelles ?',
    options:['des photos, un carnet de recettes, un certificat',
             'des photos, des bijoux anciens, un vieux certificat',
             'de l’argent, un carnet de recettes, de vieilles photos',
             'des photos, un carnet de recettes, quelques bougies'],
    answer:'des photos, un carnet de recettes, un certificat',
    hint:'La liste se trouve après les deux points, à la fin du deuxième paragraphe.',
    explanation:'« Dedans, il n’y avait ni argent ni bijoux : des <b>photographies</b>, un <b>carnet de recettes</b> et le <b>certificat de mariage</b> de mes parents. » Argent et bijoux sont écrits dans la phrase, mais précédés de « ni » : une lecture trop rapide les compte comme présents. (Three items, after the colon.)' }),

  makeMCQ({ id:'g9fr-ap3-015', chapterId:CO, difficulty:2, subsection:'reponses_multiples',
    question:_TB + 'Dans quels contenants la mère a-t-elle mis de l’eau ? Le texte en nomme trois.',
    options:['la baignoire, deux seaux et les bouteilles vides',
             'la baignoire, deux bassines et les bouteilles vides',
             'la citerne du jardin, deux seaux et les bouteilles',
             'la baignoire, deux seaux et les casseroles vides'],
    answer:'la baignoire, deux seaux et les bouteilles vides',
    hint:'La phrase se trouve dans le premier paragraphe, avant le point-virgule.',
    explanation:'« Ma mère avait rempli la <b>baignoire</b>, <b>deux seaux</b> et toutes les <b>bouteilles vides</b>. » La suite explique pourquoi : « l’eau partirait avant l’électricité ». Les trois éléments sont dans une seule énumération, séparés par des virgules et par « et ». (One list, three containers.)' }),

  makeText({ id:'g9fr-ap3-016', chapterId:CO, difficulty:1, subsection:'reponses_multiples',
    question:_TB + 'La dernière phrase donne <b>deux</b> durées. Écris en chiffres le nombre de semaines qu’il a fallu pour retrouver l’électricité.',
    answer:'3', alsoAccept:['trois', '3 semaines', 'trois semaines'],
    hint:'La phrase relie deux durées par « et » : l’une compte des semaines, l’autre des années.',
    explanation:'« Nous avons mis <b>trois semaines</b> à retrouver l’électricité et deux ans à refaire le toit. » Les deux nombres sont dans la même phrase : c’est l’unité — semaines ou années — qui dit lequel la question demande. (Three weeks, then two years.)' }),

  makeMCQ({ id:'g9fr-ap3-017', chapterId:CO, difficulty:3, subsection:'reponses_multiples',
    question:_TB + 'Le récit donne trois heures de la nuit. Que se passe-t-il à chacune, dans l’ordre ?',
    options:['la radio annonce, le vent cogne, le toit cède',
             'le vent cogne, la radio annonce, le toit cède',
             'le toit cède, la radio annonce, le vent cogne',
             'la radio annonce, le toit cède, le vent cogne'],
    answer:'la radio annonce, le vent cogne, le toit cède',
    hint:'Repère les trois repères de temps : six heures, dix heures, minuit.',
    explanation:'À six heures « la radio a annoncé la classe III » ; vers dix heures « il s’est mis à cogner » ; à minuit « quelque chose est parti sur le toit ». Dans un récit, les indications d’heure sont le squelette : elles fixent l’ordre même quand les phrases sont longues. (Six, ten, midnight.)' }),

  makeMCQ({ id:'g9fr-ap3-018', chapterId:CO, difficulty:2, subsection:'avis_personnel',
    question:_TB + 'Un lecteur affirme que la mère avait bien préparé cette nuit-là. Sur quel élément du texte s’appuyer ?',
    options:['elle avait mis de l’eau de côté avant la coupure',
             'elle avait cloué une planche sur la fenêtre',
             'elle avait poussé les matelas contre le mur',
             'elle avait gardé la boîte en carton près d’elle'],
    answer:'elle avait mis de l’eau de côté avant la coupure',
    hint:'Trois des quatre gestes sont faits par quelqu’un d’autre, ou trop tard.',
    explanation:'C’est elle qui remplit la baignoire, les seaux et les bouteilles, « elle disait que l’eau partirait avant l’électricité », et le texte ajoute : « Elle avait raison sur les deux. » La planche est clouée par le père, et les matelas sont poussés par toute la famille à minuit, une fois le toit ouvert. (Her own action, before the storm.)' }),

  makeMCQ({ id:'g9fr-ap3-019', chapterId:CO, difficulty:3, subsection:'avis_personnel',
    question:_TB + 'D’après toi, la dernière phrase de la grand-mère est-elle triste ou courageuse ? Quelle réponse tient compte du texte ?',
    options:['courageuse : elle sauve ce que le vent n’a pas pris',
             'triste : elle pleure l’arbre qu’elle avait planté',
             'courageuse : elle annonce qu’elle replantera l’arbre',
             'triste : elle refuse de parler à sa famille ce jour-là'],
    answer:'courageuse : elle sauve ce que le vent n’a pas pris',
    hint:'Relis son geste en même temps que ses mots : que tient-elle pendant qu’elle parle ?',
    explanation:'Elle parle « en serrant sa boîte » : elle reconnaît la perte (« Le vent a pris l’arbre ») et désigne aussitôt ce qui reste. Le texte ne dit nulle part qu’elle pleure, ni qu’elle replantera, ni qu’elle se tait : un avis personnel se justifie avec le texte, pas avec ce qu’on imagine. (She names the loss, then what survived.)' }),

  makeMCQ({ id:'g9fr-ap3-020', chapterId:CO, difficulty:2, subsection:'avis_personnel',
    question:_TB + 'Un lecteur écrit que le narrateur admire le courage de son père. Le texte permet-il de l’affirmer ?',
    options:['non : le texte dit que son silence lui faisait peur',
             'oui : le texte dit que son père était le plus courageux',
             'oui : le texte dit que son père a sauvé toute la famille',
             'non : le texte dit que son père avait quitté la maison'],
    answer:'non : le texte dit que son silence lui faisait peur',
    hint:'Relis la phrase qui suit « Mon père, lui, regardait le plafond ».',
    explanation:'« c’est ce silence-là qui m’a fait le plus peur » : le texte dit l’effroi, pas l’admiration. Les deux options qui commencent par « oui » inventent des phrases absentes du récit, et la dernière contredit le texte. Avant de prêter un sentiment à un personnage, cherche la ligne qui le porte. (Fear, not admiration.)' })

);

// ══ TEXTE C · compte rendu · le potager du collège ═════════════════════════
const _TC = box(`
<b style="color:#15803d">Lis le texte, puis réponds à la question.</b><br><br>
<b>Le potager derrière le laboratoire</b><br>
<i>Compte rendu — collège de Rivière-du-Rempart, septembre</i><br><br>
Derrière le laboratoire de sciences, sur un terrain de quinze mètres sur huit qui servait autrefois de dépôt, quarante élèves de Grade 8 et de Grade 9 cultivent depuis deux ans des brèdes, des tomates et du piment.<br><br>
Le projet est né d’un cours. « Nous étudiions le sol, et personne dans la classe n’avait jamais touché de terre », raconte M. Appadoo, le professeur de sciences. Il a demandé le terrain au recteur, qui a répondu oui à une condition : que le potager ne coûte rien au collège.<br><br>
Il n’a rien coûté. Les graines viennent des familles, l’eau de deux fûts posés sous la gouttière du laboratoire, le compost des restes de la cantine. Seuls les outils ont été achetés, grâce à la vente des tomates de la première récolte.<br><br>
Le travail est réparti : chaque classe assure une semaine de garde, et un cahier passe de main en main. On y note la pluie, ce qui a été semé, et ce qui a été mangé par les insectes.<br><br>
Tout ne pousse pas. Les carottes ont échoué deux fois. « C’est aussi une leçon, dit M. Appadoo. Un potager ne ment pas : si vous oubliez d’arroser, la plante le dit avant vous. »<br><br>
Depuis la rentrée, trois autres collèges de la région ont demandé à venir voir le terrain.
`, '#16a34a');

STATIC_QUESTIONS.push(

  makeText({ id:'g9fr-ap3-021', chapterId:CO, difficulty:1, subsection:'reperage_explicite',
    question:_TC + 'Depuis combien d’années les élèves cultivent-ils ce terrain ? Écris le nombre en chiffres.',
    answer:'2', alsoAccept:['deux', '2 ans', 'deux ans'],
    hint:'Le premier paragraphe donne plusieurs nombres : cherche celui qui compte des années.',
    explanation:'« quarante élèves […] cultivent depuis <b>deux</b> ans ». Les autres nombres de la phrase mesurent le terrain (quinze mètres sur huit) ou comptent les élèves (quarante) : un nombre ne se recopie qu’après avoir vérifié ce qu’il compte. (Two years.)' }),

  makeMCQ({ id:'g9fr-ap3-022', chapterId:CO, difficulty:3, subsection:'inference',
    question:_TC + 'Le texte ne dit pas pourquoi le recteur a posé une condition. Que peut-on en <b>déduire</b> ?',
    options:['le collège ne pouvait rien payer pour ce projet',
             'le recteur ne croyait pas du tout à ce projet',
             'le terrain appartenait déjà à une autre classe',
             'les élèves avaient déjà acheté tous les outils'],
    answer:'le collège ne pouvait rien payer pour ce projet',
    hint:'Regarde en quoi consiste exactement la condition, et ce qu’elle protège.',
    explanation:'La condition est « que le potager ne coûte rien au collège » : elle porte sur l’argent, donc elle suppose un budget qui ne peut pas s’étendre. Le recteur a dit oui, ce qui écarte l’idée qu’il n’y croyait pas ; et les outils ont été achetés <i>après</i>, avec la vente des tomates. (The condition is about money.)' }),

  makeMCQ({ id:'g9fr-ap3-023', chapterId:CO, difficulty:1, subsection:'reponses_multiples',
    question:_TC + 'Quelles <b>trois</b> cultures pousse-t-on dans ce potager ?',
    options:['des brèdes, des tomates et du piment',
             'des brèdes, des carottes et du piment',
             'des brèdes, des tomates et des oignons',
             'des haricots, des tomates et du piment'],
    answer:'des brèdes, des tomates et du piment',
    hint:'La liste termine la toute première phrase du texte.',
    explanation:'« cultivent depuis deux ans des <b>brèdes</b>, des <b>tomates</b> et du <b>piment</b> ». Les carottes sont citées plus loin, mais justement parce qu’elles « ont échoué deux fois » : un mot présent dans le texte n’est pas forcément une bonne réponse. (Three crops, first sentence.)' }),

  makeMCQ({ id:'g9fr-ap3-024', chapterId:CO, difficulty:2, subsection:'reponses_multiples',
    question:_TC + 'D’où viennent les graines, l’eau et le compost ?',
    options:['des familles, de la gouttière, de la cantine',
             'des familles, de la citerne, de la cantine',
             'du recteur, de la gouttière, de la cantine',
             'des familles, de la gouttière, du marché'],
    answer:'des familles, de la gouttière, de la cantine',
    hint:'Une seule phrase du texte donne les trois origines à la suite.',
    explanation:'« Les graines viennent des <b>familles</b>, l’eau de deux fûts posés sous la <b>gouttière</b> du laboratoire, le compost des restes de la <b>cantine</b>. » Trois éléments, trois origines, une seule phrase : l’ordre de la phrase est l’ordre de la question. (Three sources in one sentence.)' }),

  makeText({ id:'g9fr-ap3-025', chapterId:CO, difficulty:2, subsection:'reponses_multiples',
    question:_TC + 'Le cahier de garde sert à noter trois choses. Recopie la <b>première</b> nommée dans le texte.',
    answer:'la pluie', alsoAccept:['pluie', 'il pleut', 'la pluie tombée'],
    hint:'La phrase commence par « On y note » : la réponse suit immédiatement.',
    explanation:'« On y note <b>la pluie</b>, ce qui a été semé, et ce qui a été mangé par les insectes. » Les trois éléments sont donnés dans un ordre précis ; quand une question demande le premier, il faut lire l’énumération jusqu’au bout pour être sûr de ne pas s’être arrêté au milieu. (Rain comes first.)' }),

  makeMCQ({ id:'g9fr-ap3-026', chapterId:CO, difficulty:2, subsection:'avis_personnel',
    question:_TC + 'Un lecteur écrit que ce projet apprend autre chose que le jardinage. Sur quel élément du texte s’appuyer ?',
    options:['l’échec des carottes est présenté comme une leçon',
             'les graines sont apportées par les familles des élèves',
             'le terrain servait autrefois de dépôt au collège',
             'trois collèges ont demandé à visiter le terrain'],
    answer:'l’échec des carottes est présenté comme une leçon',
    hint:'Cherche le seul moment où le professeur commente un ÉCHEC.',
    explanation:'« Les carottes ont échoué deux fois. “C’est aussi une leçon”, dit M. Appadoo. » Il en tire une règle qui dépasse le potager : le résultat dit la vérité sur le travail fourni. Les trois autres options racontent l’organisation du projet, pas ce qu’il enseigne. (Failure as a lesson.)' }),

  makeMCQ({ id:'g9fr-ap3-027', chapterId:CO, difficulty:3, subsection:'avis_personnel',
    question:_TC + 'Un lecteur affirme que le potager est devenu un modèle pour la région. Quelle phrase du texte le soutient ?',
    options:['trois autres collèges ont demandé à le visiter',
             'quarante élèves de deux niveaux y travaillent',
             'le recteur a donné le terrain sans rien payer',
             'chaque classe assure une semaine de garde'],
    answer:'trois autres collèges ont demandé à le visiter',
    hint:'Un « modèle » se reconnaît à ce que font les autres, pas à ce que fait le collège lui-même.',
    explanation:'« trois autres collèges de la région ont demandé à venir voir le terrain » : la demande vient de l’extérieur, ce qui est exactement ce que veut dire « modèle ». Les trois autres options décrivent le fonctionnement interne du projet, qui pourrait très bien n’intéresser personne au-dehors. (Others come to look.)' })

);

// ══════════════════════════════════════════════════════════════════════════
//  g9fr-redaction — LES COMPOSANTES DE L'ÉCRITURE, toutes auto-corrigeables.
//
//  ⚠ Pas un seul item ne demande de produire un texte long, et aucun ne
//    suppose un mode de correction pour la Q9. Chaque item porte sur une
//    décision d'écriture précise — un temps, un connecteur, un ordre, un
//    registre, une reprise, une coupure de paragraphe — et se corrige par un
//    choix ou par un mot recopié du brouillon donné.
// ══════════════════════════════════════════════════════════════════════════

// ── le récit ──────────────────────────────────────────────────────────────
STATIC_QUESTIONS.push(

  makeMCQ({ id:'g9fr-ap3-028', chapterId:RE, difficulty:1, subsection:'recit',
    question:'Un récit au passé commence ainsi : « Il faisait nuit quand le portail grinça. » Quel temps porte l’action soudaine ?',
    options:['le passé simple', 'le futur simple', 'le conditionnel', 'l’imparfait'],
    answer:'le passé simple',
    hint:'Compare les deux verbes : l’un dure, l’autre survient d’un coup.',
    explanation:'« faisait » est à l’imparfait et installe le décor qui dure ; « grinça » est au <b>passé simple</b> et marque l’action brève qui arrive dans ce décor. C’est le couple de base du récit écrit : imparfait pour la toile de fond, passé simple pour ce qui se produit. (Background vs event.)' }),

  makeMCQ({ id:'g9fr-ap3-029', chapterId:RE, difficulty:1, subsection:'recit',
    question:'Tu dois trouver une phrase d’accroche pour ton récit. Lequel de ces débuts plonge tout de suite le lecteur dans la scène ?',
    options:['Le portail grinça dans le noir.',
             'Je vais raconter mon histoire.',
             'Mon récit parle d’une soirée.',
             'Voici le titre de mon récit.'],
    answer:'Le portail grinça dans le noir.',
    hint:'Trois de ces débuts parlent du texte lui-même ; un seul parle de ce qui arrive.',
    explanation:'Une accroche commence l’histoire, elle ne l’annonce pas : « Le portail grinça dans le noir » donne un lieu, un bruit et une heure en cinq mots. « Je vais raconter », « Mon récit parle de » et « Voici le titre » parlent de la copie et font perdre la première phrase, qui est la plus lue. (Start the story, don’t announce it.)' }),

  makeMCQ({ id:'g9fr-ap3-030', chapterId:RE, difficulty:2, subsection:'recit',
    question:'Dans ton récit, un événement arrive sans prévenir. Quel mot marque le mieux cette rupture brutale ?',
    options:['Soudain', 'Chaque année', 'En général', 'D’habitude'],
    answer:'Soudain',
    hint:'Trois de ces mots décrivent une habitude ; un seul décrit une seule fois.',
    explanation:'<b>Soudain</b> (ou « tout à coup ») annonce une action unique et imprévue. « Chaque année », « En général » et « D’habitude » marquent au contraire la répétition : employés dans un récit, ils annoncent une habitude et détruisent la surprise que la phrase suivante essaie de créer. (One-off vs habitual.)' }),

  makeText({ id:'g9fr-ap3-031', chapterId:RE, difficulty:2, subsection:'recit',
    question:'Dans ce brouillon de récit au passé, un verbe n’est pas au passé : « Il ouvrit la porte, regarda dehors et referme aussitôt. » Recopie ce verbe.',
    answer:'referme', alsoAccept:['il referme', 'referme aussitôt'],
    hint:'Les trois verbes sont coordonnés : lis-les l’un après l’autre et écoute celui qui détonne.',
    explanation:'« ouvrit » et « regarda » sont au passé simple ; <b>referme</b> est au présent. Dans une même phrase, les verbes coordonnés se mettent au même temps : « referma ». C’est l’erreur la plus fréquente en fin de phrase, quand on écrit plus vite que l’on ne relit. (Tense must hold across a sentence.)' }),

  makeMCQ({ id:'g9fr-ap3-032', chapterId:RE, difficulty:2, subsection:'recit',
    question:'Ton brouillon répète le sujet : « Karim vit un chien. Karim recula. » Quelle reprise évite la répétition sans créer de confusion ?',
    options:['Karim vit un chien. Il recula.',
             'Karim vit un chien. Lui recula.',
             'Karim vit un chien. Celui-ci recula.',
             'Karim vit un chien. On recula.'],
    answer:'Karim vit un chien. Il recula.',
    hint:'Demande-toi, pour chaque proposition, qui exactement a reculé.',
    explanation:'<b>Il</b> reprend le sujet de la phrase précédente, c’est-à-dire Karim. « Celui-ci » désigne le nom le plus proche, donc le chien : la phrase change de sens. « Lui recula » n’est pas français comme sujet, et « On » efface le personnage. Une reprise pronominale ne vaut que si l’on sait qui elle remplace. (Pronoun reference.)' }),

  makeMCQ({ id:'g9fr-ap3-033', chapterId:RE, difficulty:3, subsection:'recit',
    question:'Un élève écrit son récit d’une seule traite, sans aller à la ligne. À quel endroit doit-il ouvrir un nouveau paragraphe ?',
    options:['quand le lieu ou le moment change',
             'quand une phrase dépasse dix mots',
             'quand il emploie un verbe au passé',
             'quand il cite un nom de personne'],
    answer:'quand le lieu ou le moment change',
    hint:'Un paragraphe regroupe ce qui va ensemble : demande-toi ce qui, dans un récit, change vraiment.',
    explanation:'Dans un récit, on va à la ligne quand on change d’étape : un nouveau lieu, un nouveau moment, ou une nouvelle personne qui parle. La longueur d’une phrase, le temps des verbes et les noms propres ne découpent rien du tout ; un récit coupé selon ces critères donne des paragraphes qui ne veulent rien dire. (Paragraphs follow the story, not the page.)' }),

  makeText({ id:'g9fr-ap3-034', chapterId:RE, difficulty:3, subsection:'recit',
    question:'Le décor d’un récit au passé se met à l’imparfait. Écris le verbe entre parenthèses au temps qui convient : « La pluie (tomber) depuis le matin. » Écris seulement le verbe conjugué.',
    answer:'tombait', alsoAccept:['elle tombait'],
    hint:'Le complément « depuis le matin » dit que l’action dure ; choisis le temps qui dure.',
    explanation:'« depuis le matin » indique une action qui se prolonge : c’est l’<b>imparfait</b>, « tombait ». Le passé simple « tomba » enfermerait la pluie dans un instant unique, ce qui contredirait « depuis le matin ». Le complément de temps commande le temps du verbe. (Ongoing background = imparfait.)' }),

  makeMCQ({ id:'g9fr-ap3-035', chapterId:RE, difficulty:4, subsection:'recit',
    question:'Voici trois phrases d’un même paragraphe, dans le désordre :<br>(1) Je poussai la porte et je compris tout.<br>(2) Ce matin-là, la maison était étrangement silencieuse.<br>(3) Pourtant, la radio de mon père jouait chaque matin à six heures.<br>Laquelle doit ouvrir le paragraphe, et pourquoi ?',
    options:['la (2), parce qu’elle plante le décor avant l’action',
             'la (1), parce qu’elle annonce la fin de l’histoire',
             'la (3), parce qu’elle donne une heure très précise',
             'la (1), parce qu’une action accroche mieux le lecteur'],
    answer:'la (2), parce qu’elle plante le décor avant l’action',
    hint:'Deux des trois phrases ne peuvent pas être comprises sans celle qui les précède. Cherche laquelle se suffit à elle-même.',
    explanation:'La (2) est à l’imparfait et pose le lieu, le moment et l’étrangeté ; la (3) commence par « Pourtant », qui suppose une phrase avant elle ; la (1) est au passé simple et raconte le dénouement, donc elle ferme le paragraphe. Ordre : 2, 3, 1. Un connecteur d’opposition en tête de paragraphe est le signe le plus sûr qu’une phrase a été déplacée. (Setting, contrast, then event.)' }),

  makeMCQ({ id:'g9fr-ap3-036', chapterId:RE, difficulty:4, subsection:'recit',
    question:'Brouillon : « Le bus démarra. Je courus derrière lui en criant. Le chauffeur ne m’entend pas et continue sa route. » Où le récit change-t-il de temps ?',
    options:['à partir de « ne m’entend pas »',
             'à partir de « Je courus derrière »',
             'à partir de « Le bus démarra »',
             'nulle part : tout le passage est au passé'],
    answer:'à partir de « ne m’entend pas »',
    hint:'Conjugue mentalement chaque verbe au passé simple et vois lequel a déjà changé de forme.',
    explanation:'« démarra » et « courus » sont au passé simple ; <b>« entend »</b> et « continue » sont au présent. La rupture commence donc à la troisième phrase et se corrige en « n’entendit pas et continua ». La rupture de temps est très fréquente au moment le plus tendu du récit, parce que le présent vient naturellement quand on revit la scène. (The tense slips where the story speeds up.)' }),

  makeText({ id:'g9fr-ap3-037', chapterId:RE, difficulty:4, subsection:'recit',
    question:'Ce brouillon est au passé, mais deux verbes sont passés au présent : « Nous marchions depuis une heure quand la pluie commence. Nous courons vers l’abri. » Recopie le <b>premier</b> de ces deux verbes.',
    answer:'commence', alsoAccept:['la pluie commence', 'commence.'],
    hint:'Relis dans l’ordre d’écriture, pas dans l’ordre d’importance : le premier fautif est dans la première phrase.',
    explanation:'« marchions » est à l’imparfait, puis <b>commence</b> passe au présent, et « courons » suit. Il fallait « commença » et « courûmes ». Le piège est de repérer d’abord « courons », plus visible parce qu’il ouvre une phrase : quand une question demande le premier, l’ordre du texte prime sur ce qui saute aux yeux. (First in the text, not first noticed.)' }),

  makeMCQ({ id:'g9fr-ap3-038', chapterId:RE, difficulty:4, subsection:'recit',
    question:'Ton récit doit être écrit à la première personne du début à la fin. Quelle phrase respecte cette consigne ?',
    options:['Je sortis et je vis que la rue était vide.',
             'Je sortis et il vit que la rue était vide.',
             'Il sortit et je vis que la rue était vide.',
             'On sortit et il vit que la rue était vide.'],
    answer:'Je sortis et je vis que la rue était vide.',
    hint:'Il y a deux verbes dans chaque phrase : vérifie le sujet des deux, pas seulement du premier.',
    explanation:'Seule la première phrase garde « je » pour les deux verbes. Les trois autres glissent vers « il » ou « on » en cours de route, si bien que le lecteur ne sait plus qui regarde la rue. Le changement de personne se produit presque toujours au deuxième verbe, quand la consigne a été oubliée. (Hold the person across both verbs.)' }),

  makeMCQ({ id:'g9fr-ap3-039', chapterId:RE, difficulty:4, subsection:'recit',
    question:'Le sujet demande de raconter une grande peur. Quelle phrase fait <b>sentir</b> la peur au lecteur au lieu de la nommer ?',
    options:['Mes jambes refusaient d’avancer.',
             'J’avais très peur à ce moment-là.',
             'La peur était vraiment immense.',
             'J’étais mort de peur, vraiment.'],
    answer:'Mes jambes refusaient d’avancer.',
    hint:'Une seule de ces phrases décrit ce qui se passe dans le corps, sans employer le mot du sentiment.',
    explanation:'La bonne phrase montre un effet physique et laisse le lecteur nommer lui-même le sentiment ; les trois autres écrivent « peur » et ajoutent un intensificateur (« très », « vraiment », « immense ») qui ne prouve rien. Dire qu’un sentiment est fort n’est pas le faire éprouver. (Show, don’t tell.)' })

);

// ── la description ────────────────────────────────────────────────────────
STATIC_QUESTIONS.push(

  makeMCQ({ id:'g9fr-ap3-040', chapterId:RE, difficulty:1, subsection:'description',
    question:'Tu décris un décor à l’intérieur d’un récit au passé. Quel temps peint ce décor qui dure ?',
    options:['l’imparfait', 'le passé simple', 'le passé composé', 'le plus-que-parfait'],
    answer:'l’imparfait',
    hint:'Choisis le temps qui étale l’action dans la durée au lieu de la refermer.',
    explanation:'L’<b>imparfait</b> montre un état qui dure : « la cour était vide, les volets claquaient ». Le passé simple et le passé composé enferment l’action dans un point du temps, et le plus-que-parfait la place avant le récit : aucun des trois ne peut tenir une description. (Description sits in the imparfait.)' }),

  makeMCQ({ id:'g9fr-ap3-041', chapterId:RE, difficulty:1, subsection:'description',
    question:'Dans une description, quel groupe de mots organise l’<b>espace</b> ?',
    options:['au premier plan', 'tout à coup', 'par conséquent', 'il y a deux ans'],
    answer:'au premier plan',
    hint:'Trois de ces groupes situent dans le temps ou expliquent ; un seul situe dans le lieu.',
    explanation:'« <b>Au premier plan</b> », « au fond », « à droite » placent le lecteur devant le tableau et lui disent où regarder. « Tout à coup » et « il y a deux ans » situent dans le temps, et « par conséquent » annonce une conséquence : dans une description, ils désorganisent le regard. (Space words guide the eye.)' }),

  makeMCQ({ id:'g9fr-ap3-042', chapterId:RE, difficulty:2, subsection:'description',
    question:'Ta description d’une cuisine ne parle que de ce qui se voit. Quelle phrase ajoute une autre sensation ?',
    options:['L’odeur de vanille montait du four.',
             'La cuisine était grande et claire.',
             'Le carrelage était bleu et propre.',
             'La fenêtre donnait sur le jardin.'],
    answer:'L’odeur de vanille montait du four.',
    hint:'Demande-toi, pour chaque phrase, quel sens du corps est sollicité.',
    explanation:'Trois phrases décrivent ce que l’œil voit (taille, lumière, couleur, ouverture) ; seule la première fait appel à l’odorat. Une description qui mobilise plusieurs sens — odeur, bruit, chaleur, toucher — donne une impression de présence qu’une accumulation de couleurs n’obtient jamais. (Bring in a second sense.)' }),

  makeText({ id:'g9fr-ap3-043', chapterId:RE, difficulty:2, subsection:'description',
    question:'Écris le verbe entre parenthèses à l’imparfait, comme le demande une description au passé : « Le vent (soulever) la poussière du chemin. » Écris seulement le verbe conjugué.',
    answer:'soulevait', alsoAccept:['il soulevait'],
    hint:'Attention à la lettre qui précède la terminaison : le radical de ce verbe change à l’oreille.',
    explanation:'À l’imparfait, « soulever » donne <b>soulevait</b> : le e du radical prend un accent grave devant une syllabe muette (je soulève), mais reste sans accent ici, devant -ait prononcé. Beaucoup d’élèves écrivent « soulèvait » par analogie avec le présent. (Regular -er verb, watch the accent.)' }),

  makeMCQ({ id:'g9fr-ap3-044', chapterId:RE, difficulty:2, subsection:'description',
    question:'Ta description répète le même sujet : « La maison était basse. La maison sentait le bois. » Quelle reprise allège la phrase ?',
    options:['La maison était basse. Elle sentait le bois.',
             'La maison était basse. Cette maison sentait le bois.',
             'La maison était basse. La maison-là sentait le bois.',
             'La maison était basse. Celle-là sentait bien le bois.'],
    answer:'La maison était basse. Elle sentait le bois.',
    hint:'La reprise la plus simple est souvent la plus courte : compte les mots de chaque proposition.',
    explanation:'Le pronom <b>elle</b> reprend « la maison » sans rien ajouter, et il n’y a qu’un nom féminin dans le voisinage, donc aucune ambiguïté. « Cette maison » et « Celle-là » alourdissent en désignant à nouveau, et « La maison-là » n’appartient pas à la langue écrite. Deux phrases de suite peuvent d’ailleurs être fondues : « La maison, basse, sentait le bois. » (Simplest reprise wins.)' }),

  makeMCQ({ id:'g9fr-ap3-045', chapterId:RE, difficulty:3, subsection:'description',
    question:'Un élève décrit une plage en passant du sable au ciel, puis de nouveau au sable, puis à la mer. Quel est le défaut de sa description ?',
    options:['la description n’a pas d’ordre suivi',
             'la description emploie trop d’adjectifs',
             'la description manque de verbes d’action',
             'la description est écrite au présent'],
    answer:'la description n’a pas d’ordre suivi',
    hint:'Suis le regard du lecteur d’une phrase à l’autre : combien de fois revient-il en arrière ?',
    explanation:'Le regard saute du sol au ciel, revient au sol, repart vers la mer : le lecteur ne peut pas construire l’image. Une description se parcourt dans un ordre tenu — du plus proche au plus lointain, de gauche à droite, du haut vers le bas. Rien n’indique ici un problème d’adjectifs, de verbes ni de temps. (Keep one path for the eye.)' }),

  makeText({ id:'g9fr-ap3-046', chapterId:RE, difficulty:3, subsection:'description',
    question:'Dans ce brouillon descriptif, un verbe n’est pas à l’imparfait : « Le sentier montait, les fougères touchaient nos bras et un oiseau siffla au loin. » Recopie ce verbe.',
    answer:'siffla', alsoAccept:['il siffla', 'un oiseau siffla'],
    hint:'Deux verbes décrivent un état qui dure ; le troisième raconte un événement ponctuel.',
    explanation:'« montait » et « touchaient » sont à l’imparfait ; <b>siffla</b> est au passé simple et fait basculer la phrase de la description au récit. Dans une description, il faut « sifflait ». Le passé simple n’est pas fautif en soi : il est fautif <i>ici</i>, parce qu’il introduit une action là où le texte peint un décor. (Right tense, wrong place.)' }),

  makeMCQ({ id:'g9fr-ap3-047', chapterId:RE, difficulty:4, subsection:'description',
    question:'Trois phrases d’une description de la gare de Curepipe, dans le désordre :<br>(1) Sur le quai, des vendeurs de bananes passaient entre les valises.<br>(2) De loin, la gare n’était qu’un long toit de tôle grise.<br>(3) Tout au fond, derrière un grillage, dormaient deux autobus hors d’usage.<br>Laquelle doit ouvrir la description, et pourquoi ?',
    options:['la (2), parce qu’on décrit du plus large au plus précis',
             'la (1), parce qu’elle contient le plus de détails précis',
             'la (3), parce qu’elle décrit le fond du tableau',
             'la (1), parce qu’elle met des personnes en premier'],
    answer:'la (2), parce qu’on décrit du plus large au plus précis',
    hint:'Chaque phrase porte une indication de distance. Classe-les de la plus éloignée à la plus proche.',
    explanation:'« De loin » pose la vue d’ensemble, « Sur le quai » resserre sur les gens, « Tout au fond » vient chercher un détail : l’ordre 2, 1, 3 suit un regard qui s’approche. Commencer par le détail (la (3)) oblige le lecteur à imaginer un fond qu’il n’a pas encore vu. Le nombre de détails d’une phrase ne dit rien de sa place. (Wide shot first.)' }),

  makeMCQ({ id:'g9fr-ap3-048', chapterId:RE, difficulty:4, subsection:'description',
    question:'Ta description doit garder le registre courant attendu à l’écrit. Quelle phrase convient ?',
    options:['La salle était petite et mal éclairée.',
             'La salle était vachement petite, quoi.',
             'La salle, elle était trop petite grave.',
             'La salle c’était tout petit, en vrai.'],
    answer:'La salle était petite et mal éclairée.',
    hint:'Lis chaque phrase à voix haute et demande-toi laquelle pourrait s’écrire dans un livre.',
    explanation:'« vachement », « grave », « quoi », « en vrai » et la reprise « La salle, elle » appartiennent à l’oral familier : à l’écrit, ils font perdre des points sans rien apporter à l’image. La première phrase dit la même chose avec deux informations utiles — la taille et la lumière. Le registre courant n’est pas un registre pauvre. (Spoken fillers don’t survive on paper.)' }),

  makeMCQ({ id:'g9fr-ap3-049', chapterId:RE, difficulty:4, subsection:'description',
    question:'Quelle comparaison aide vraiment le lecteur à <b>voir</b> le décor ?',
    options:['Le toit de tôle brillait comme un miroir.',
             'Le toit de tôle brillait comme d’habitude.',
             'Le toit de tôle était comme un vrai toit.',
             'Le toit de tôle était comme il était alors.'],
    answer:'Le toit de tôle brillait comme un miroir.',
    hint:'Une comparaison n’aide que si le second terme apporte une image nouvelle.',
    explanation:'Seul « un miroir » ajoute quelque chose que le lecteur peut se représenter : l’éclat dur de la lumière sur le métal. « comme d’habitude » compare à une habitude que le lecteur ne connaît pas, et les deux dernières comparent le toit à lui-même, ce qui ne décrit rien. Le mot « comme » ne suffit pas à faire une comparaison. (The second term must add an image.)' }),

  makeText({ id:'g9fr-ap3-050', chapterId:RE, difficulty:4, subsection:'description',
    question:'Cette phrase descriptive glisse du passé au présent : « La véranda donnait sur la cour, et trois poules picorent entre les chaises. » Recopie le verbe fautif.',
    answer:'picorent', alsoAccept:['picorent entre les chaises', 'trois poules picorent'],
    hint:'Les deux verbes sont reliés par « et » : compare leur terminaison avant de choisir.',
    explanation:'« donnait » est à l’imparfait ; <b>picorent</b> est au présent et doit devenir « picoraient ». La rupture est difficile à entendre, parce que « picorent » et « picoraient » se prononcent presque de la même manière : c’est en relisant l’œil sur la terminaison, et non l’oreille, qu’on la repère. (The ear misses this one.)' }),

  makeMCQ({ id:'g9fr-ap3-051', chapterId:RE, difficulty:4, subsection:'description',
    question:'Ta description compte huit phrases : quatre sur la cour, quatre sur la salle de classe. Comment la découper en paragraphes ?',
    options:['en deux paragraphes, un par lieu décrit',
             'en un seul paragraphe, puisque le sujet est le même',
             'en huit paragraphes, un par phrase écrite',
             'en deux paragraphes, coupés au milieu d’un lieu'],
    answer:'en deux paragraphes, un par lieu décrit',
    hint:'Le découpage doit se voir sur la page avant même d’être lu : qu’est-ce qui change au milieu du texte ?',
    explanation:'Le texte change de lieu à la cinquième phrase : c’est exactement là que se place le blanc. Un bloc unique oblige le lecteur à trouver seul la frontière ; huit paragraphes hachent la description ; et couper au milieu d’un lieu place le blanc là où rien ne change, ce qui trompe le lecteur. (The blank line marks the real change.)' })

);

// ── le texte d'opinion ────────────────────────────────────────────────────
STATIC_QUESTIONS.push(

  makeMCQ({ id:'g9fr-ap3-052', chapterId:RE, difficulty:1, subsection:'texte_opinion',
    question:'Dans un texte d’opinion, que doit contenir la première phrase ?',
    options:['la position que tu vas défendre',
             'le dernier argument de ton texte',
             'un exemple tiré de ton quartier',
             'la liste des mots de liaison'],
    answer:'la position que tu vas défendre',
    hint:'Demande-toi ce que le lecteur doit savoir avant de pouvoir suivre tes arguments.',
    explanation:'Un lecteur ne peut juger un argument que s’il sait ce qu’il défend : la position s’annonce donc d’entrée. Les arguments et les exemples viennent ensuite, la conclusion ferme, et la liste des connecteurs ne s’écrit jamais — elle se répartit dans le texte. (State your position first.)' }),

  makeMCQ({ id:'g9fr-ap3-053', chapterId:RE, difficulty:1, subsection:'texte_opinion',
    question:'Laquelle de ces phrases est un <b>fait</b>, et non une opinion ?',
    options:['Le collège ouvre ses portes à sept heures.',
             'Le collège ouvre vraiment beaucoup trop tôt.',
             'Le collège devrait ouvrir une heure plus tard.',
             'Le collège a des horaires tout à fait épuisants.'],
    answer:'Le collège ouvre ses portes à sept heures.',
    hint:'Un fait peut être vérifié par n’importe qui ; une opinion ne peut être que partagée ou non.',
    explanation:'On peut aller vérifier l’heure d’ouverture : c’est un fait. « trop tôt », « devrait » et « épuisants » expriment un jugement, donc une opinion. Un bon texte d’opinion appuie chaque jugement sur au moins un fait vérifiable ; sans cela, il n’est qu’une suite d’affirmations. (Checkable = fact.)' }),

  makeMCQ({ id:'g9fr-ap3-054', chapterId:RE, difficulty:2, subsection:'texte_opinion',
    question:'Tu viens de citer l’avis contraire au tien et tu veux y répondre. Quel connecteur introduit ton objection ?',
    options:['Cependant', 'Par exemple', 'C’est pourquoi', 'D’abord'],
    answer:'Cependant',
    hint:'Cherche le seul mot qui annonce que la suite va s’opposer à ce qui précède.',
    explanation:'<b>Cependant</b> (comme « toutefois » ou « en revanche ») annonce une opposition, ce qui est exactement le rôle d’une objection. « Par exemple » illustre, « C’est pourquoi » tire une conséquence et « D’abord » ouvre une énumération : aucun des trois ne prévient le lecteur qu’on va contredire. Un connecteur est un panneau de direction — le mauvais panneau égare. (Signal the turn.)' }),

  makeText({ id:'g9fr-ap3-055', chapterId:RE, difficulty:2, subsection:'texte_opinion',
    question:'Écris le verbe entre parenthèses à la forme qui convient : « Il faut que le collège (être) ouvert le samedi matin. » Écris seulement le verbe conjugué.',
    answer:'soit', alsoAccept:['qu’il soit', "qu'il soit"],
    hint:'« Il faut que » commande un mode particulier : ce n’est pas l’indicatif.',
    explanation:'Après « il faut que », le verbe se met au subjonctif : « qu’il <b>soit</b> ». La forme « est » est de l’indicatif et sonne juste à l’oreille, ce qui la rend très fréquente dans les brouillons. Le texte d’opinion est le lieu naturel de ce mode, parce qu’il exprime sans cesse ce qui devrait être. (il faut que + subjonctif.)' }),

  makeMCQ({ id:'g9fr-ap3-056', chapterId:RE, difficulty:4, subsection:'texte_opinion',
    question:'Ton argument est que la lecture calme la classe. Quel exemple l’appuie vraiment ?',
    options:['Après vingt minutes de lecture, le bruit de la classe baisse.',
             'Après vingt minutes de lecture, les livres rentrent dans le sac.',
             'Après vingt minutes de lecture, la classe change de salle.',
             'Après vingt minutes de lecture, la cloche de midi sonne.'],
    answer:'Après vingt minutes de lecture, le bruit de la classe baisse.',
    hint:'Un exemple n’appuie l’argument que s’il montre l’effet annoncé, pas seulement le moment.',
    explanation:'L’argument porte sur le calme : seul le premier exemple montre un effet sur le bruit. Les trois autres se déroulent bien après la lecture, mais ils ne disent rien de son effet — ils décrivent l’emploi du temps. Un exemple mal choisi affaiblit un argument plus sûrement que l’absence d’exemple, parce qu’il donne au lecteur l’impression que l’on n’a rien trouvé de mieux. (An example must show the claimed effect.)' }),

  makeMCQ({ id:'g9fr-ap3-057', chapterId:RE, difficulty:3, subsection:'texte_opinion',
    question:'Un élève commence chacun de ses quatre paragraphes par « Je pense que ». Que lui conseilles-tu ?',
    options:['varier les formules qui introduisent son avis',
             'supprimer complètement tout avis de son texte',
             'écrire ses quatre paragraphes au présent',
             'réduire son texte à un seul paragraphe'],
    answer:'varier les formules qui introduisent son avis',
    hint:'Le problème n’est pas d’avoir un avis, mais de l’annoncer toujours de la même façon.',
    explanation:'« À mon sens », « Il me semble que », « Je suis convaincu que », « Selon moi » disent la même chose sans lasser. Supprimer l’avis viderait le texte d’opinion de son objet, et ni le temps des verbes ni le nombre de paragraphes n’ont de rapport avec la répétition. (Vary the formula, keep the stance.)' }),

  makeMCQ({ id:'g9fr-ap3-058', chapterId:RE, difficulty:3, subsection:'texte_opinion',
    question:'Voici les trois parties d’un texte d’opinion, dans le désordre : (1) mes arguments, (2) ma conclusion, (3) ma position de départ. Quel est le bon ordre ?',
    options:['3, 1, 2', '1, 3, 2', '2, 1, 3', '1, 2, 3'],
    answer:'3, 1, 2',
    hint:'Demande-toi ce que le lecteur doit connaître en premier, et ce qu’il doit retenir en dernier.',
    explanation:'On annonce sa position (3), on la soutient par des arguments (1), puis on referme par une conclusion (2). Placer la conclusion avant les arguments (2, 1, 3) donne un texte qui se termine au milieu ; commencer par les arguments (1, 3, 2) oblige le lecteur à deviner ce qu’ils défendent. (Position, arguments, conclusion.)' }),

  makeText({ id:'g9fr-ap3-059', chapterId:RE, difficulty:3, subsection:'texte_opinion',
    question:'Ce brouillon d’opinion passe au passé sans raison : « Je pense que le sport est nécessaire. Il aidait les élèves à mieux dormir. » Recopie le verbe qui rompt le présent.',
    answer:'aidait', alsoAccept:['il aidait', 'aidait les élèves'],
    hint:'Compare la terminaison des deux verbes : l’un vaut pour aujourd’hui, l’autre pour autrefois.',
    explanation:'« est » est au présent ; <b>aidait</b> est à l’imparfait et laisse croire que le sport n’aide plus. Il fallait « aide ». Un texte d’opinion se tient au présent, parce qu’il parle de ce qui est vrai maintenant : basculer au passé affaiblit l’argument sans que l’élève s’en aperçoive. (Opinion lives in the present.)' }),

  makeMCQ({ id:'g9fr-ap3-060', chapterId:RE, difficulty:3, subsection:'texte_opinion',
    question:'Quelle phrase reconnaît l’avis contraire avant de le réfuter ?',
    options:['Certains trouvent cela cher ; pourtant, tout le monde y gagne.',
             'Certains trouvent cela cher, et ils ont entièrement raison.',
             'Certains trouvent cela cher, alors je ne dirai rien de plus.',
             'Certains trouvent cela très cher, et cela reste bien vrai.'],
    answer:'Certains trouvent cela cher ; pourtant, tout le monde y gagne.',
    hint:'Cherche la seule phrase qui cite l’objection ET ajoute une suite qui la combat.',
    explanation:'Reconnaître une objection puis la dépasser — « Certains disent X ; pourtant Y » — montre que l’on a pensé contre soi-même, et c’est ce qui rend un texte d’opinion solide. Les trois autres phrases citent l’objection et s’y rendent, ou s’arrêtent : la concession y devient un abandon. (Concede, then answer.)' }),

  makeMCQ({ id:'g9fr-ap3-061', chapterId:RE, difficulty:4, subsection:'texte_opinion',
    question:'Trois phrases d’un même paragraphe d’opinion, dans le désordre :<br>(1) À Rose-Hill, deux clubs ont dû fermer faute de joueurs.<br>(2) Je crois que le collège doit garder son club de football.<br>(3) Sans club, ces élèves passeront leur samedi devant un écran.<br>Laquelle doit ouvrir le paragraphe, et pourquoi ?',
    options:['la (2), parce qu’un paragraphe s’ouvre sur son idée',
             'la (1), parce qu’un exemple chiffré frappe le lecteur',
             'la (3), parce qu’elle annonce la suite du paragraphe',
             'la (1), parce qu’elle nomme un lieu que l’on connaît'],
    answer:'la (2), parce qu’un paragraphe s’ouvre sur son idée',
    hint:'Deux de ces phrases servent l’autre. Cherche celle qui n’a besoin d’aucune des deux pour se comprendre.',
    explanation:'La (2) est l’idée défendue ; la (1) est l’exemple qui la soutient ; la (3) en tire la conséquence. Ordre : 2, 1, 3. Un exemple placé en tête (« À Rose-Hill… ») laisse le lecteur chercher ce qu’il prouve, et « Sans club » suppose déjà que la fermeture a été évoquée. Un exemple frappant reste un exemple : il ne remplace pas l’idée. (Claim, evidence, consequence.)' }),

  makeMCQ({ id:'g9fr-ap3-062', chapterId:RE, difficulty:4, subsection:'texte_opinion',
    question:'Ton texte d’opinion est adressé au directeur du collège. Quelle formulation convient à ce destinataire ?',
    options:['Je me permets de vous proposer une autre solution.',
             'Franchement, votre idée ne tient pas la route du tout.',
             'Vous devriez arrêter tout ça, c’est vraiment pénible.',
             'Je vous écris vite fait pour dire que c’est nul.'],
    answer:'Je me permets de vous proposer une autre solution.',
    hint:'Le désaccord peut rester entier : c’est le ton, pas l’idée, qui doit changer selon le destinataire.',
    explanation:'On peut contredire un directeur sans l’agresser : « Je me permets de » garde le désaccord et la politesse. « Franchement », « tout ça », « vite fait » et « c’est nul » relèvent de l’oral familier et, adressés à un adulte que l’on ne tutoie pas, ils font perdre le lecteur avant l’argument. Le registre se choisit d’après celui à qui l’on écrit. (Same disagreement, different register.)' }),

  makeText({ id:'g9fr-ap3-063', chapterId:RE, difficulty:4, subsection:'texte_opinion',
    question:'Ce brouillon mélange deux registres : « Cette décision me paraît injuste, elle est carrément nulle. » Recopie l’<b>adjectif</b> qui appartient au langage familier.',
    answer:'nulle', alsoAccept:['nul', 'carrément nulle'],
    hint:'La phrase contient deux adjectifs : l’un s’écrirait dans un journal, l’autre seulement dans une conversation.',
    explanation:'« injuste » est courant et s’écrit partout ; <b>nulle</b> est familier et n’apporte aucun argument — il répète le jugement en plus fort. À l’écrit, on le remplace par « inacceptable » ou « mal fondée ». Le mot « carrément » est un adverbe, pas un adjectif : la question demandait bien l’adjectif. (Familiar register spotted by class of word.)' }),

  makeMCQ({ id:'g9fr-ap3-064', chapterId:RE, difficulty:4, subsection:'texte_opinion',
    question:'Ton paragraphe défend l’idée que la cantine doit servir des fruits. Quelle phrase n’y a pas sa place ?',
    options:['La cour du collège aurait besoin d’un nouveau portail.',
             'Un fruit coûte bien moins cher qu’un paquet de biscuits.',
             'Les élèves qui déjeunent mal s’endorment en classe.',
             'La cantine jette beaucoup de gâteaux invendus.'],
    answer:'La cour du collège aurait besoin d’un nouveau portail.',
    hint:'Relis l’idée défendue, puis demande-toi laquelle des quatre phrases ne parle ni de fruits ni de repas.',
    explanation:'Les trois autres phrases touchent au prix, aux effets d’un mauvais repas et au gaspillage de la cantine : toutes servent l’idée. Le portail concerne la cour et n’a aucun lien avec l’alimentation. Une phrase hors sujet dans un paragraphe coûte plus qu’elle ne rapporte : elle laisse croire que l’on n’avait pas assez d’arguments. (One idea per paragraph.)' }),

  makeMCQ({ id:'g9fr-ap3-065', chapterId:RE, difficulty:4, subsection:'texte_opinion',
    question:'Ton texte d’opinion tient en un seul bloc : la position, trois arguments, la conclusion. Comment le découper ?',
    options:['un paragraphe par argument, plus l’ouverture et la clôture',
             'un seul paragraphe, puisque le sujet reste le même partout',
             'un paragraphe par phrase, pour aérer la page du lecteur',
             'deux paragraphes, coupés au milieu du deuxième argument'],
    answer:'un paragraphe par argument, plus l’ouverture et la clôture',
    hint:'Compte les idées distinctes du texte : le nombre de paragraphes se lit dans le plan, pas dans la longueur.',
    explanation:'Cinq idées distinctes donnent cinq paragraphes : position, argument 1, argument 2, argument 3, conclusion. Le bloc unique cache le plan ; un paragraphe par phrase le hache ; et couper au milieu d’un argument place le blanc là où l’idée continue, ce qui trompe le lecteur sur la structure. (The plan decides the paragraphs.)' })

);

})();
