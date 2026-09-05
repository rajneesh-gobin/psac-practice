'use strict';
// Grade 5 French - Chapitre : Textes & Types de Textes (compréhension)
// IDs format: g5fr-txt-NNN
// Cinq types de textes : courriel, lettre amicale, récit, annonce, poème.
// Le texte est répété dans chaque question : pratique et examen tirent les
// questions une par une, au hasard.

function _g5txtBox(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

const _G5TXT_COURRIEL = _g5txtBox(`
<b style="color:#1e40af">Lis le courriel, puis réponds à la question.</b><br><br>
<div style="border:1px solid #cbd5e1;border-radius:8px;overflow:hidden;background:#fff">
<div style="background:#eef2ff;padding:8px 10px;font-size:0.95em;line-height:1.5">
<b>De :</b> famille.appadoo@gmail.com<br>
<b>À :</b> mme.hurgobin@ecolecurepipe.mu<br>
<b>Objet :</b> Autorisation pour la sortie au Jardin de Pamplemousses
</div>
<div style="padding:10px">
Madame,<br><br>
Je vous écris au sujet de la sortie scolaire au Jardin botanique de Pamplemousses, prévue le vendredi 3 octobre.<br><br>
J\'autorise avec plaisir ma fille Anjali à y participer. J\'ai déjà remis les Rs 250 au secrétariat et je joins le reçu à ce message.<br><br>
Puis-je vous poser deux questions ? D\'abord, à quelle heure le car rentrera-t-il à l\'école ? Ensuite, Anjali est allergique aux arachides : le pique-nique contiendra-t-il des cacahuètes ?<br><br>
Je vous remercie d\'organiser cette sortie. Anjali parle du grand nénuphar depuis une semaine.<br><br>
Veuillez agréer, Madame, mes salutations distinguées.<br><br>
<b>Priya Appadoo</b><br>
(mère d\'Anjali Appadoo, Grade 5B)
</div>
</div>
`, '#3b82f6');

const _G5TXT_LETTRE = _g5txtBox(`
<b style="color:#7c3aed">Lis la lettre, puis réponds à la question.</b><br><br>
<div style="text-align:right">17, avenue des Flamboyants<br>Quatre Bornes<br>le 8 août</div><br>
Chère Mamie,<br><br>
Merci beaucoup pour le colis d\'anniversaire. Le cahier bleu est magnifique et j\'ai déjà commencé à y écrire mes histoires.<br><br>
À l\'école, tout va bien, mais les mathématiques sont difficiles ce trimestre. Nous avons commencé la division la semaine dernière et j\'ai raté les quatre premières opérations. Dimanche, Papa s\'est assis avec moi et maintenant je comprends où placer le reste. J\'ai eu huit sur dix au contrôle de mardi !<br><br>
Te souviens-tu du goyavier derrière la cuisine ? Il est encore couvert de fruits. Maman dit que nous ferons de la confiture et que nous garderons un pot pour toi.<br><br>
Écris-moi vite pour me dire comment va ton genou. Est-ce qu\'il te fait encore mal quand il pleut ?<br><br>
Je t\'embrasse très fort,<br>
<b>Yashna</b>
`, '#8b5cf6');

const _G5TXT_RECIT = _g5txtBox(`
<b style="color:#0e7490">Lis le texte, puis réponds à la question.</b><br><br>
<b>La nuit du cyclone</b><br><br>
J\'avais neuf ans la nuit où le cyclone est passé sur Maurice. Dès six heures du soir, le ciel avait la couleur du ciment mouillé et le manguier devant ma fenêtre se pliait comme un arc.<br><br>
Papa a cloué une planche de contreplaqué devant la fenêtre de la cuisine pendant que Maman remplissait d\'eau tous les seaux et toutes les bassines. Mon petit frère Kiran croyait que c\'était un jeu : il allumait et éteignait la torche sans arrêt, jusqu\'à ce que Maman la lui prenne.<br><br>
À huit heures et demie, la lumière s\'est éteinte. Toute la rue est devenue noire en même temps et, pendant une seconde, personne n\'a parlé. Puis Papa a ri, il a allumé deux bougies et il a dit : « Maintenant, on raconte des histoires. »<br><br>
Le vent a hurlé toute la nuit. Je n\'ai pas beaucoup dormi. Mais le matin, le soleil est revenu, les voisins sont sortis avec leurs balais et, à midi, la route était dégagée. Je me souviens mieux des bougies que du vent.
`, '#06b6d4');

const _G5TXT_ANNONCE = _g5txtBox(`
<b style="color:#b45309">Lis l\'annonce, puis réponds à la question.</b><br><br>
<div style="border:3px solid #f59e0b;border-radius:10px;padding:12px;background:#fffbeb">
<div style="text-align:center;font-size:1.2em;font-weight:800;color:#b45309">CLUB DE NATATION DE L\'ÉCOLE</div>
<div style="text-align:center;font-style:italic;margin-bottom:8px">Apprends à nager - ou nage plus vite que jamais !</div>
Entraînement tous les <b>mercredis et samedis</b>, de 14 h 00 à 16 h 00,<br>
à la piscine municipale de Quatre Bornes.<br><br>
&bull; Ouvert aux élèves des Grades 4, 5 et 6<br>
&bull; Cotisation : <b>Rs 150 par mois</b> (Rs 100 si un frère ou une sœur est déjà membre)<br>
&bull; À apporter : maillot, serviette, bonnet, bouteille d\'eau<br>
&bull; Débutants bienvenus - Coach Devi entraîne des nageurs nationaux depuis 12 ans<br><br>
<div style="border-top:1px dashed #d97706;padding-top:6px">
Les places sont limitées à <b>30 élèves</b>. Remets ta fiche à M. Ramful avant le <b>vendredi 20 septembre</b>.
</div>
</div>
`, '#f59e0b');

const _G5TXT_POEME = _g5txtBox(`
<b style="color:#15803d">Lis le poème, puis réponds à la question.</b><br><br>
<b>Le vieux pêcheur</b><br><br>
<div style="font-style:italic;line-height:1.9">
Avant que le soleil ne quitte son lit,<br>
Il pousse à l\'eau sa barque délavée ;<br>
Le lagon dort, tout plat, tout gris,<br>
Comme un miroir qu\'on n\'a pas dérangé.<br><br>
Ses mains sont des cartes de trente années,<br>
De cordes, de sel et de matins trop froids ;<br>
Il ne chante pas, il ne dit rien -<br>
La mer connaît déjà toutes ses histoires.<br><br>
Et quand il revient à travers le récif,<br>
L\'argent des poissons brillant dans son filet,<br>
Il regarde encore une fois vers le large,<br>
Comme s\'il devait quelque chose à la mer.
</div>
`, '#22c55e');

STATIC_QUESTIONS.push(

  // ── TEXTE A : le courriel ──────────────────────────────────────────
  makeMCQ({ id:`g5fr-txt-001`, chapterId:'fr-textes', subsection:'courriel', difficulty:1,
    question:`${_G5TXT_COURRIEL}Quel est le but principal de ce courriel ?`,
    options:[
      `Autoriser sa fille à participer à une sortie scolaire`,
      `Se plaindre du prix de la sortie`,
      `Demander une place en Grade 5B`,
      `Inviter la maîtresse à un anniversaire`
    ],
    answer:`Autoriser sa fille à participer à une sortie scolaire`,
    hint:`La ligne « Objet » d\'un courriel annonce son but en quelques mots.`,
    explanation:`L\'objet est « <b>Autorisation pour la sortie au Jardin de Pamplemousses</b> » et le deuxième paragraphe dit « J\'autorise avec plaisir ma fille Anjali à y participer ». Tout le reste n\'est que détail au service de ce but.` }),

  makeMCQ({ id:`g5fr-txt-002`, chapterId:'fr-textes', subsection:'courriel', difficulty:1,
    question:`${_G5TXT_COURRIEL}Combien Mme Appadoo a-t-elle déjà payé ?`,
    options:[`Rs 250`, `Rs 150`, `Rs 300`, `Rien pour l\'instant`],
    answer:`Rs 250`,
    hint:`Cherche la phrase qui parle du secrétariat.`,
    explanation:`« J\'ai <b>déjà remis les Rs 250</b> au secrétariat et je joins le reçu. » Le mot <b>déjà</b> montre que le paiement est fait, et non prévu.` }),

  makeMCQ({ id:`g5fr-txt-003`, chapterId:'fr-textes', subsection:'courriel', difficulty:2,
    question:`${_G5TXT_COURRIEL}Pourquoi la mère parle-t-elle des arachides ?`,
    options:[
      `Parce que sa fille y est allergique et que le pique-nique doit être vérifié`,
      `Parce qu\'elle veut qu\'on ajoute des cacahuètes au pique-nique`,
      `Parce qu\'elle vend des cacahuètes au marché`,
      `Parce que les cacahuètes coûtent moins cher`
    ],
    answer:`Parce que sa fille y est allergique et que le pique-nique doit être vérifié`,
    hint:`La cause et la demande sont dans la même phrase.`,
    explanation:`« Anjali est <b>allergique aux arachides</b> : le pique-nique contiendra-t-il des cacahuètes ? » Une allergie est une raison médicale : c\'est pour cela qu\'un parent la met par écrit plutôt que de la dire au portail.` }),

  makeMCQ({ id:`g5fr-txt-004`, chapterId:'fr-textes', subsection:'courriel', difficulty:3,
    question:`${_G5TXT_COURRIEL}Quelle formule montre que ce courriel est FORMEL (et non un message à une amie) ?`,
    options:[
      `« Veuillez agréer, Madame, mes salutations distinguées. »`,
      `« Je vous écris au sujet de la sortie scolaire. »`,
      `« Puis-je vous poser deux questions ? »`,
      `« Anjali parle du grand nénuphar depuis une semaine. »`
    ],
    answer:`« Veuillez agréer, Madame, mes salutations distinguées. »`,
    hint:`Cherche la formule de politesse tout à la fin.`,
    explanation:`« <b>Veuillez agréer, Madame, mes salutations distinguées</b> » est la formule de politesse des lettres et courriels <b>formels</b>. À une amie, on écrirait plutôt « Bises » ou « À bientôt ». Les autres phrases sont polies, mais elles s\'écriraient aussi dans un message ordinaire.` }),

  makeMCQ({ id:`g5fr-txt-005`, chapterId:'fr-textes', subsection:'courriel', difficulty:3,
    question:`${_G5TXT_COURRIEL}Pourquoi la mère écrit-elle « (mère d\'Anjali Appadoo, Grade 5B) » sous sa signature ?`,
    options:[
      `Pour que la maîtresse sache immédiatement de quelle élève il s\'agit`,
      `Pour rendre le courriel plus long`,
      `Parce que la loi l\'exige`,
      `Pour remplacer la ligne « Objet »`
    ],
    answer:`Pour que la maîtresse sache immédiatement de quelle élève il s\'agit`,
    hint:`Une maîtresse peut avoir cent élèves et ne pas reconnaître un nom de famille seul.`,
    explanation:`Une enseignante reçoit beaucoup de messages. Donner <b>le nom de l\'enfant et la classe</b> lui permet de retrouver l\'élève tout de suite. Dans un écrit formel, bien s\'identifier à la fin est une marque de politesse et fait gagner du temps au lecteur.` }),

  // ── TEXTE B : la lettre amicale ────────────────────────────────────
  makeMCQ({ id:`g5fr-txt-006`, chapterId:'fr-textes', subsection:'poeme', difficulty:1,
    question:`${_G5TXT_LETTRE}Où se trouvent l\'adresse et la date dans cette lettre ?`,
    options:[`En haut à droite`, `En haut à gauche`, `En bas à droite`, `Sous la signature`],
    answer:`En haut à droite`,
    hint:`Regarde comment l\'adresse et la date sont alignées.`,
    explanation:`Dans une lettre, l\'adresse de celui qui écrit et la date se placent <b>en haut à droite</b>. La formule d\'appel (« Chère Mamie, ») commence ensuite à gauche.` }),

  makeMCQ({ id:`g5fr-txt-007`, chapterId:'fr-textes', subsection:'poeme', difficulty:2,
    question:`${_G5TXT_LETTRE}Qu\'y avait-il dans le colis d\'anniversaire ?`,
    options:[`Un cahier bleu`, `Un pot de confiture de goyaves`, `Un livre de mathématiques`, `Une photo de Mamie`],
    answer:`Un cahier bleu`,
    hint:`Le remerciement est dans le tout premier paragraphe.`,
    explanation:`« Le <b>cahier bleu</b> est magnifique et j\'ai déjà commencé à y écrire mes histoires. » La confiture, elle, sera <i>envoyée à</i> Mamie plus tard : ce n\'est pas un cadeau reçu.` }),

  makeMCQ({ id:`g5fr-txt-008`, chapterId:'fr-textes', subsection:'poeme', difficulty:2,
    question:`${_G5TXT_LETTRE}Comment sait-on que Yashna a progressé en mathématiques ?`,
    options:[
      `Elle a eu huit sur dix au contrôle de mardi`,
      `Elle dit que la division est facile pour tout le monde`,
      `La maîtresse l\'a changée de groupe`,
      `Elle n\'a plus de devoirs de mathématiques`
    ],
    answer:`Elle a eu huit sur dix au contrôle de mardi`,
    hint:`Cherche une preuve chiffrée, pas une opinion.`,
    explanation:`Elle a raté les quatre premières opérations, Papa l\'a aidée, puis « <b>J\'ai eu huit sur dix au contrôle de mardi !</b> » La note est la <b>preuve</b>. Quand on demande « comment sait-on ? », il faut toujours montrer la preuve dans le texte.` }),

  makeTF({ id:`g5fr-txt-009`, chapterId:'fr-textes', subsection:'poeme', difficulty:2,
    question:`${_G5TXT_LETTRE}Yashna pose une question à sa grand-mère dans sa lettre.`,
    answer:true,
    hint:`Cherche un point d\'interrogation vers la fin.`,
    explanation:`<b>Vrai.</b> Elle écrit : « Est-ce qu\'il te fait encore mal quand il pleut ? » Poser une question, c\'est inviter l\'autre à répondre : cela fait vivre la correspondance.` }),

  makeMCQ({ id:`g5fr-txt-010`, chapterId:'fr-textes', subsection:'poeme', difficulty:3,
    question:`${_G5TXT_LETTRE}Quel élément montre qu\'il s\'agit d\'une lettre AMICALE et non d\'une lettre officielle ?`,
    options:[
      `Elle se termine par « Je t\'embrasse très fort » et parle du genou de Mamie`,
      `Elle porte une date en haut`,
      `Elle est écrite en paragraphes`,
      `Elle commence par un mot d\'appel`
    ],
    answer:`Elle se termine par « Je t\'embrasse très fort » et parle du genou de Mamie`,
    hint:`La date, les paragraphes et le mot d\'appel existent dans les DEUX sortes de lettres.`,
    explanation:`Date, paragraphes et formule d\'appel se trouvent dans les deux types de lettres. Ce qui marque la lettre amicale, c\'est la <b>formule affectueuse</b> (« Je t\'embrasse très fort ») et la <b>question personnelle</b> sur la santé de Mamie. Une lettre officielle finirait par « Veuillez agréer… ».` }),

  // ── TEXTE C : le récit ─────────────────────────────────────────────
  makeMCQ({ id:`g5fr-txt-011`, chapterId:'fr-textes', subsection:'legende', difficulty:1,
    question:`${_G5TXT_RECIT}À quelle heure la lumière s\'est-elle éteinte ?`,
    options:[`À huit heures et demie`, `À six heures`, `À minuit`, `Au lever du soleil`],
    answer:`À huit heures et demie`,
    hint:`Le texte donne deux heures : attribue la bonne à la bonne action.`,
    explanation:`« <b>À huit heures et demie</b>, la lumière s\'est éteinte. » Six heures du soir, c\'est le moment où le ciel a changé de couleur, plus tôt. Un bon lecteur relie chaque heure à son événement.` }),

  makeMCQ({ id:`g5fr-txt-012`, chapterId:'fr-textes', subsection:'legende', difficulty:2,
    question:`${_G5TXT_RECIT}« Le manguier se pliait comme un arc. » Qu\'est-ce que cette comparaison montre ?`,
    options:[
      `Le vent était si fort qu\'il courbait l\'arbre`,
      `L\'arbre était vieux et mourant`,
      `Quelqu\'un grimpait dans l\'arbre`,
      `L\'arbre avait été coupé`
    ],
    answer:`Le vent était si fort qu\'il courbait l\'arbre`,
    hint:`Imagine la forme d\'un arc de tir à l\'arc.`,
    explanation:`Un arc est courbé en demi-cercle. Dire que l\'arbre se pliait « <b>comme un arc</b> » montre la <b>force du vent</b>. Une image construite avec <i>comme</i> s\'appelle une <b>comparaison</b>.` }),

  makeMCQ({ id:`g5fr-txt-013`, chapterId:'fr-textes', subsection:'legende', difficulty:2,
    question:`${_G5TXT_RECIT}Pourquoi Maman remplit-elle tous les seaux et toutes les bassines ?`,
    options:[
      `Pour stocker de l\'eau au cas où l\'eau serait coupée`,
      `Pour arroser le jardin après la tempête`,
      `Pour éteindre les bougies en cas d\'incendie`,
      `Pour laver la planche avant de la clouer`
    ],
    answer:`Pour stocker de l\'eau au cas où l\'eau serait coupée`,
    hint:`Que font toutes les familles mauriciennes avant un cyclone ?`,
    explanation:`Stocker de l\'eau fait partie de la <b>préparation au cyclone</b> : pendant un cyclone, l\'électricité et l\'eau sont souvent coupées. Le texte ne le dit pas : tu le <b>déduis</b> de ce que tu sais des cyclones.` }),

  makeMCQ({ id:`g5fr-txt-014`, chapterId:'fr-textes', subsection:'legende', difficulty:3,
    question:`${_G5TXT_RECIT}Le texte se termine par : « Je me souviens mieux des bougies que du vent. » Que veut dire l\'auteur ?`,
    options:[
      `Ce qui lui reste, c\'est la famille réunie, pas la peur`,
      `Elle a oublié presque toute cette nuit-là`,
      `Les bougies éclairaient plus qu\'elle ne le pensait`,
      `Elle était trop jeune pour comprendre le cyclone`
    ],
    answer:`Ce qui lui reste, c\'est la famille réunie, pas la peur`,
    hint:`À quoi servaient les bougies ? Que s\'est-il passé à la lumière des bougies ?`,
    explanation:`Les bougies, c\'est le moment où Papa a ri et a dit « Maintenant, on raconte des histoires » : la <b>partie chaleureuse</b> d\'une nuit effrayante. Terminer sur les bougies plutôt que sur le vent montre ce que l\'auteur retient vraiment. C\'est une <b>chute qui donne du sens</b> au récit.` }),

  makeMCQ({ id:`g5fr-txt-015`, chapterId:'fr-textes', subsection:'legende', difficulty:4,
    question:`${_G5TXT_RECIT}Ta classe doit écrire un récit personnel sur une tempête. Quelle première phrase reprend le mieux la technique de ce texte ?`,
    options:[
      `J\'avais huit ans le soir où le toit de notre cabanon s\'est envolé.`,
      `Un cyclone est une forte tempête tropicale avec du vent et de la pluie.`,
      `Il y a beaucoup de cyclones à Maurice chaque année.`,
      `Dans cette rédaction, je vais décrire un cyclone.`
    ],
    answer:`J\'avais huit ans le soir où le toit de notre cabanon s\'est envolé.`,
    hint:`Un récit personnel se raconte à la première personne et commence à un moment précis.`,
    explanation:`Le texte commence par « <b>J\'avais neuf ans la nuit où</b> le cyclone est passé sur Maurice » : première personne, un moment précis, et une accroche qui donne envie de lire la suite. Les autres propositions sont des débuts de <b>texte documentaire</b> ou de <b>rédaction scolaire</b>, pas de récit.` }),

  // ── TEXTE D : l\'annonce ────────────────────────────────────────────
  makeMCQ({ id:`g5fr-txt-016`, chapterId:'fr-textes', subsection:'affiche', difficulty:1,
    question:`${_G5TXT_ANNONCE}Quels jours le club de natation s\'entraîne-t-il ?`,
    options:[`Le mercredi et le samedi`, `Le lundi et le jeudi`, `Tous les jours de la semaine`, `Le samedi seulement`],
    answer:`Le mercredi et le samedi`,
    hint:`Les jours sont écrits en gras, en haut de l\'annonce.`,
    explanation:`Entraînement les <b>mercredis et samedis</b>, de 14 h 00 à 16 h 00. Une annonce met les informations essentielles en gras pour que même un lecteur pressé les remarque.` }),

  makeMCQ({ id:`g5fr-txt-017`, chapterId:'fr-textes', subsection:'affiche', difficulty:2,
    question:`${_G5TXT_ANNONCE}La grande sœur de Rahul est déjà membre du club. Combien Rahul paiera-t-il par mois ?`,
    options:[`Rs 100`, `Rs 150`, `Rs 50`, `Rien`],
    answer:`Rs 100`,
    hint:`Lis les mots entre parenthèses après la cotisation.`,
    explanation:`« Cotisation : Rs 150 par mois (<b>Rs 100 si un frère ou une sœur est déjà membre</b>) ». La sœur de Rahul est membre : il paiera donc <b>Rs 100</b>. Les conditions entre parenthèses changent le prix - lis-les toujours.` }),

  makeMCQ({ id:`g5fr-txt-018`, chapterId:'fr-textes', subsection:'affiche', difficulty:3,
    question:`${_G5TXT_ANNONCE}Pourquoi l\'annonce précise-t-elle que Coach Devi entraîne des nageurs nationaux depuis 12 ans ?`,
    options:[
      `Pour convaincre les parents que l\'entraînement est de qualité`,
      `Pour expliquer pourquoi la cotisation est de Rs 150`,
      `Pour prévenir que les débutants ne sont pas acceptés`,
      `Pour indiquer l\'âge de Coach Devi`
    ],
    answer:`Pour convaincre les parents que l\'entraînement est de qualité`,
    hint:`Une annonce donne des informations sur les personnes dans un but précis.`,
    explanation:`Citer l\'expérience de l\'entraîneur est un <b>procédé pour convaincre</b> : les parents se disent que leur argent sera bien employé. L\'annonce dit d\'ailleurs « Débutants bienvenus » : elle ne les décourage donc pas du tout.` }),

  makeMCQ({ id:`g5fr-txt-019`, chapterId:'fr-textes', subsection:'affiche', difficulty:4,
    question:`${_G5TXT_ANNONCE}Sofia décide le lundi 23 septembre qu\'elle veut s\'inscrire. Quel est son problème ?`,
    options:[
      `La date limite pour remettre la fiche est déjà passée`,
      `Elle est en Grade 4, donc trop jeune`,
      `Elle devra payer Rs 150 au lieu de Rs 100`,
      `Le lundi n\'est pas un jour d\'entraînement`
    ],
    answer:`La date limite pour remettre la fiche est déjà passée`,
    hint:`Compare le 23 septembre avec la date écrite dans la dernière ligne.`,
    explanation:`Les fiches devaient parvenir à M. Ramful <b>avant le vendredi 20 septembre</b>. Le lundi 23 septembre, c\'est <b>après</b> : Sofia a manqué la date limite. Les élèves de Grade 4 sont acceptés, donc l\'âge n\'est pas le problème - c\'est le calendrier.` }),

  // ── TEXTE E : le poème ─────────────────────────────────────────────
  makeMCQ({ id:`g5fr-txt-020`, chapterId:'fr-textes', subsection:'poeme', difficulty:2,
    question:`${_G5TXT_POEME}« Avant que le soleil ne quitte son lit » signifie que le pêcheur part…`,
    options:[`Avant le lever du soleil`, `À midi`, `Au coucher du soleil`, `Seulement quand il pleut`],
    answer:`Avant le lever du soleil`,
    hint:`Où est le soleil quand il est encore « dans son lit » ?`,
    explanation:`Le soleil « dans son lit » n\'est pas encore levé : le pêcheur part donc <b>avant le lever du soleil</b>. Donner au soleil une action humaine (dormir) s\'appelle une <b>personnification</b>.` }),

  makeMCQ({ id:`g5fr-txt-021`, chapterId:'fr-textes', subsection:'poeme', difficulty:3,
    question:`${_G5TXT_POEME}« Ses mains sont des cartes de trente années. » Que veut vraiment dire ce vers ?`,
    options:[
      `Ses mains sont marquées et ridées par trente ans de travail en mer`,
      `Il dessine des cartes du lagon pendant son temps libre`,
      `Il a voyagé dans trente pays différents`,
      `Il a exactement trente ans`
    ],
    answer:`Ses mains sont marquées et ridées par trente ans de travail en mer`,
    hint:`À quoi ressemblent les traits d\'une carte ? Que font les cordes et le sel aux mains ?`,
    explanation:`Une carte est couverte de lignes. Dire que ses mains <i>sont</i> des cartes (et non « comme » des cartes) est une <b>métaphore</b> : trente ans « de cordes, de sel et de matins trop froids » ont creusé ses mains, et on y lit sa vie de travail.` }),

);
