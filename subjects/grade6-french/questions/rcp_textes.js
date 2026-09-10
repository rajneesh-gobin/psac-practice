'use strict';
// grade6-french — compréhension écrite : 4 textes originaux, 10 questions chacun.
// IDs : g6fr-rcp-001-m1 … g6fr-rcp-004-o5
//
// Un bloc = un texte + 5 makeMCQ + 5 makeText. L'assembleur d'examen distribue
// le bloc entier, donc 5 et 5 exactement.
//
// ⚠ LONGUEUR. Les textes de compréhension déjà présents dans ce pack ont été
// mesurés à 109-252 mots, très en dessous du sujet réel (le français du PSAC
// tourne entre 305 et 743 mots). Ces quatre-ci sont écrits à pleine longueur.
//
// Textes originaux (aucun emprunt), et contextes choisis pour ne pas répéter
// ceux du pack : l'environnement et le plastique, le dodo, la tortue de
// Rodrigues (ch06_lecture, comprehension_textes), le dépliant de Rodrigues, la
// notice du filtre à eau, le courriel des poubelles et la légende de Pieter
// Both (ch09_g6_textes).
(function () {
const CH = 'g6fr-lecture';

function box(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}
const LIS = '<b style="color:#1e40af">Lisez le texte, puis répondez à la question.</b><br><br>';

// ══ TEXTE 1 · article de journal (reportage) · ~430 mots ═════════════════
const _P1 = box(LIS + `
<b>Quatre heures du matin : le marché qui ne dort pas</b><br>
<i>Reportage — Port-Louis</i><br><br>
Il est quatre heures dix et la halle aux légumes est déjà pleine. La ville, elle, dort encore. Sur le trottoir, un fleuve de cageots descend des camions, passe de main en main et remonte vers les étals sans jamais s'arrêter.<br><br>
« Nous commençons à deux heures », dit Devanand Bhagwan, marchand de légumes depuis vingt-neuf ans. « À sept heures, le plus dur est fait. Les gens qui viennent acheter à neuf heures croient voir un marché. Ils voient la fin d'un marché. »<br><br>
Chaque nuit, environ deux cent quarante camionnettes entrent dans le quartier, venues pour la plupart de Plaine Wilhems et du Nord. Elles déchargent des giraumons, des brèdes, des piments, des ananas de Victoria. Le bruit est constant : moteurs, chariots métalliques, cris courts d'un homme à un autre.<br><br>
Les étals de fruits, eux, ouvrent plus tard. Leur marchandise supporte mal la manipulation, et les letchis, en saison, sont posés grappe par grappe, presque avec précaution.<br><br>
Pourtant, ce marché n'a rien d'un désordre. Chaque marchand a sa place, héritée le plus souvent d'un parent, et chaque camionneur connaît l'ordre de passage. « Si tu prends la place d'un autre, personne ne crie », explique Marie-Ange Félicité, qui vend des herbes. « On te laisse faire une fois. Une seule. »<br><br>
À cinq heures, les premiers restaurateurs arrivent. Ce sont eux qui achètent en gros, et c'est pourquoi les prix de la nuit ne ressemblent pas à ceux de la journée. Un kilo de tomates part à 35 roupies avant l'aube, contre soixante ou soixante-dix plus tard dans la matinée, selon Monsieur Bhagwan.<br><br>
En revanche, le travail de nuit a un prix. Les porteurs, souvent jeunes, chargent jusqu'à quarante cageots à l'heure. Nous en avons interrogé deux ; aucun n'a voulu donner son nom.<br><br>
Vers six heures trente, la lumière change. Les néons deviennent inutiles. Les balayeurs passent, la halle respire enfin, et les premières ménagères entrent, sans savoir que le marché qu'elles découvrent a déjà cinq heures d'existence derrière lui.<br><br>
La municipalité prévoit de rénover la halle l'an prochain. Contactée, elle n'a pas répondu à nos questions sur le calendrier des travaux ni sur le sort des marchands pendant le chantier.<br><br>
D'ailleurs, personne, cette nuit-là, ne nous a parlé de la rénovation. À quatre heures du matin, on pense au cageot suivant.
`, '#2563eb');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-rcp-001-m1', chapterId:CH, difficulty:3, subsection:'reperage',
    question:_P1 + 'Combien de camionnettes entrent chaque nuit dans le quartier ?',
    options:['environ deux cent quarante','environ trois cent quarante','environ cent quarante','environ vingt-quatre'],
    answer:'environ deux cent quarante',
    hint:'Le chiffre est donné au troisième paragraphe. (The figure is in paragraph three.)',
    explanation:'« Chaque nuit, <b>environ deux cent quarante</b> camionnettes entrent dans le quartier. » (About 240 vans.)' }),

  makeMCQ({ id:'g6fr-rcp-001-m2', chapterId:CH, difficulty:3, subsection:'connecteurs',
    question:_P1 + 'Dans « En revanche, le travail de nuit a un prix », que fait le connecteur « en revanche » ?',
    options:['Il oppose ce qui précède.','Il annonce une conclusion.','Il indique une cause.','Il ajoute un exemple.'],
    answer:'Il oppose ce qui précède.',
    hint:'Comparez le paragraphe précédent (les prix avantageux) et celui-ci. (Compare the two paragraphs.)',
    explanation:'Le paragraphe d’avant vante les prix bas de la nuit ; celui-ci en montre le coût humain. « <b>En revanche</b> » marque donc une <b>opposition</b>, comme « pourtant » plus haut. (A contrast connector.)' }),

  makeMCQ({ id:'g6fr-rcp-001-m3', chapterId:CH, difficulty:4, subsection:'esprit_critique',
    question:_P1 + 'De tous les gens cités, quel point de vue manque le plus dans cet article ?',
    options:['Celui des porteurs de nuit.','Celui des marchands de légumes.','Celui des camionneurs du Nord.','Celui de la vendeuse d’herbes.'],
    answer:'Celui des porteurs de nuit.',
    hint:'Qui est mentionné dans l’article sans qu’on l’entende jamais parler ? (Who is named but never quoted ?)',
    explanation:'Deux marchands sont cités entre guillemets, mais des porteurs on ne lit qu’une ligne : « Nous en avons interrogé deux ; <b>aucun n’a voulu donner son nom.</b> » Ceux qui portent quarante cageots à l’heure sont les seuls à n’avoir pas de voix. (The porters are described, never quoted.)' }),

  makeMCQ({ id:'g6fr-rcp-001-m4', chapterId:CH, difficulty:3, subsection:'figures_style',
    question:_P1 + 'Dans « un fleuve de cageots descend des camions », quelle figure de style est employée ?',
    options:['une métaphore','une comparaison','une énumération','une répétition'],
    answer:'une métaphore',
    hint:'Y a-t-il un mot outil comme « comme » ou « tel que » ? (Is there a link-word ?)',
    explanation:'Les cageots sont directement appelés « fleuve », sans « comme » : c’est une <b>métaphore</b>. Elle rend le mouvement continu et sans arrêt. (Metaphor, not simile.)' }),

  makeMCQ({ id:'g6fr-rcp-001-m5', chapterId:CH, difficulty:3, subsection:'type_ton',
    question:_P1 + 'Quel est le ton de cet article ?',
    options:['informatif et observateur','nostalgique et triste','militant et indigné','ironique et moqueur'],
    answer:'informatif et observateur',
    hint:'Le journaliste donne-t-il son avis, ou décrit-il ce qu’il voit ? (Does he judge, or describe ?)',
    explanation:'Le journaliste compte, cite et décrit (« Il est quatre heures dix… », « environ deux cent quarante… ») sans jamais dire ce qu’il faudrait faire. Le ton est <b>informatif et observateur</b>. (Reporting, not campaigning.)' }),

  makeText({ id:'g6fr-rcp-001-o1', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P1 + 'Les restaurateurs « achètent en gros ». Cela veut dire qu’ils achètent en grande quantité, à crédit ou au détail ? Répondez en trois mots au plus.',
    answer:'en grande quantité', alsoAccept:['grande quantité','beaucoup à la fois'],
    hint:'La suite de la phrase explique pourquoi leurs prix sont différents. (The rest of the sentence explains it.)',
    explanation:'« Ce sont eux qui achètent <b>en gros</b>, et c’est pourquoi les prix de la nuit ne ressemblent pas à ceux de la journée. » Acheter en gros, c’est acheter <b>en grande quantité</b>, donc moins cher l’unité. (Wholesale.)' }),

  makeText({ id:'g6fr-rcp-001-o2', chapterId:CH, difficulty:3, subsection:'reperage',
    question:_P1 + 'À quel prix, en roupies, un kilo de tomates part-il avant l’aube ? Écrivez le nombre en chiffres.',
    answer:'35', alsoAccept:['35 roupies','trente-cinq'],
    hint:'Le prix du matin et celui de la journée sont donnés dans la même phrase. (Both prices are in one sentence.)',
    explanation:'« Un kilo de tomates part à <b>35 roupies</b> avant l’aube, contre soixante ou soixante-dix plus tard dans la matinée. » (Rs 35 before dawn.)' }),

  makeText({ id:'g6fr-rcp-001-o3', chapterId:CH, difficulty:3, subsection:'idee_principale',
    question:_P1 + 'Quel titre résumerait le mieux l’article : « Le marché de nuit », « La cuisine mauricienne » ou « Les prix des légumes » ? Répondez en quatre mots au plus.',
    answer:'Le marché de nuit', alsoAccept:['marché de nuit','le marché nocturne'],
    hint:'Un bon titre couvre tout le texte, pas seulement un paragraphe. (A title must cover the whole text.)',
    explanation:'Les prix n’occupent qu’un paragraphe et la cuisine aucun. Tout le reste — les camionnettes, les places héritées, les porteurs, les balayeurs — décrit <b>le marché de nuit</b>. (The whole article is about the night market.)' }),

  makeText({ id:'g6fr-rcp-001-o4', chapterId:CH, difficulty:3, subsection:'vrai_faux',
    question:_P1 + 'Vrai ou faux : la municipalité a expliqué au journaliste le calendrier des travaux. Répondez par « vrai » ou « faux ».',
    answer:'faux', alsoAccept:['fausse','c’est faux'],
    hint:'L’avant-dernier paragraphe dit ce que la municipalité a fait. (See the second-to-last paragraph.)',
    explanation:'Faux : « Contactée, elle <b>n’a pas répondu</b> à nos questions sur le calendrier des travaux ni sur le sort des marchands pendant le chantier. » (No answer was given.)' }),

  makeText({ id:'g6fr-rcp-001-o5', chapterId:CH, difficulty:4, subsection:'interpretation',
    question:_P1 + 'Relevez dans la dernière phrase les mots qui montrent à quoi l’on pense au marché à quatre heures du matin. Trois mots au plus.',
    answer:'le cageot suivant', alsoAccept:['cageot suivant','au cageot suivant'],
    hint:'La toute dernière ligne oppose les grands projets et le geste immédiat. (The last line sets plans against the next task.)',
    explanation:'« À quatre heures du matin, on pense <b>au cageot suivant</b>. » La phrase répond à la rénovation dont personne ne parle : quand le travail est là, l’avenir attend. (The next crate, nothing further.)' })
);

// ══ TEXTE 2 · entretien (interview) · ~430 mots ══════════════════════════
const _P2 = box(LIS + `
<b>« Mes disques, je ne les vends pas »</b><br>
<i>Entretien avec Sylvie Labonne, 78 ans, à Quatre-Bornes.</i><br><br>
<b>Le journal :</b> Vous gardez chez vous une collection de disques de séga. Combien en avez-vous ?<br>
<b>Sylvie Labonne :</b> Deux cent quatorze. Je les ai comptés en janvier, à cause de l'assurance. Des 45 tours, presque tous. Le plus vieux date de 1963.<br><br>
<b>Le journal :</b> D'où viennent-ils ?<br>
<b>S. L. :</b> De mon père. Il jouait de la ravanne, une ravanne qu'il fabriquait lui-même, avec une peau de cabri qu'il chauffait au feu avant de jouer. Un soir, dit-il, il a joué à côté de Fanfan Lataniers, à Pointe-aux-Sables. Je n'ai jamais vérifié. Dans une famille, certaines histoires ne se vérifient pas, elles se répètent.<br><br>
<b>Le journal :</b> Votre mère aimait-elle cette musique ?<br>
<b>S. L. :</b> Non. À l'époque, on disait que ce n'était pas convenable. Une jeune fille qui écoutait du séga, cela se remarquait. Ma mère n'a jamais interdit les disques, mais elle ne voulait pas les voir. Je les gardais dans une boîte, sous mon lit, et je les sortais quand elle allait au marché.<br><br>
<b>Le journal :</b> Vous en avez eu honte ?<br>
<b>S. L. :</b> J'ai eu honte, oui. Pendant des années. Aujourd'hui on met le séga sur les affiches de l'aéroport, et les mêmes familles qui baissaient la voix trouvent cela magnifique. Cela m'amuse, un peu. Cela me fatigue, aussi.<br><br>
<b>Le journal :</b> Votre petit-fils copie vos disques sur ordinateur. Qu'en pensez-vous ?<br>
<b>S. L. :</b> C'est lui qui a proposé, et j'ai dit oui tout de suite. Une maison peut brûler ; un fichier, non. Il en a déjà transféré cent trente. Mais je vais vous dire ce qui se perd : un disque, il faut se lever pour le retourner. On écoutait quatre chansons, puis on se levait. Sur son ordinateur, la musique continue toute seule et plus personne ne se lève. Ce n'est pas la même écoute.<br><br>
<b>Le journal :</b> Un collectionneur vous en a offert un bon prix, dit-on.<br>
<b>S. L. :</b> Trois fois. Pourtant, je ne les ai jamais vendus, et je ne les vendrai pas. Ils iront au petit-fils, avec la ravanne. Il en manque un, d'ailleurs : je l'ai prêté en 1979 et je sais très bien à qui. Je n'ai jamais redemandé. C'est ma manière à moi de garder l'histoire ouverte.
`, '#7c3aed');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-rcp-002-m1', chapterId:CH, difficulty:3, subsection:'narration',
    question:_P2 + 'Dans cet entretien, qui pose les questions ?',
    options:['Le journaliste.','Sylvie Labonne.','Le petit-fils.','Le père de Sylvie.'],
    answer:'Le journaliste.',
    hint:'Regardez ce qui est écrit en gras au début de chaque réplique. (Look at the bold labels.)',
    explanation:'Chaque question est annoncée par « <b>Le journal :</b> » et chaque réponse par « <b>S. L. :</b> ». Le texte alterne donc journaliste et interviewée. (Interviewer and interviewee.)' }),

  makeMCQ({ id:'g6fr-rcp-002-m2', chapterId:CH, difficulty:3, subsection:'reperage',
    question:_P2 + 'Combien de disques Madame Labonne possède-t-elle ?',
    options:['deux cent quatorze','trois cent quatorze','deux cent quarante','cent quatorze'],
    answer:'deux cent quatorze',
    hint:'Elle les a comptés, et elle dit pourquoi. (She counted them — and says why.)',
    explanation:'« <b>Deux cent quatorze.</b> Je les ai comptés en janvier, à cause de l’assurance. » Attention : cent trente sont déjà copiés, ce n’est pas le total. (214 records.)' }),

  makeMCQ({ id:'g6fr-rcp-002-m3', chapterId:CH, difficulty:4, subsection:'esprit_critique',
    question:_P2 + 'Quelle affirmation de Madame Labonne n’est appuyée par aucune preuve ?',
    options:['Que son père jouait avec Fanfan.','Que ses disques sont bien 214.','Que son petit-fils les copie.','Que le séga était mal vu.'],
    answer:'Que son père jouait avec Fanfan.',
    hint:'Une seule fois, elle dit elle-même qu’elle n’a rien vérifié. (Once, she says so herself.)',
    explanation:'« Un soir, <b>dit-il</b>, il a joué à côté de Fanfan Lataniers… <b>Je n’ai jamais vérifié.</b> » L’information vient de son père, rapportée par elle : deux intermédiaires, aucune preuve. Les autres faits sont comptés ou observés. (Hearsay, and she admits it.)' }),

  makeMCQ({ id:'g6fr-rcp-002-m4', chapterId:CH, difficulty:3, subsection:'connecteurs',
    question:_P2 + 'Dans « Trois fois. Pourtant, je ne les ai jamais vendus », que marque « pourtant » ?',
    options:['une opposition','une conséquence','une explication','une addition'],
    answer:'une opposition',
    hint:'Que ferait normalement quelqu’un à qui l’on offre trois fois un bon prix ? (What would most people do ?)',
    explanation:'On attendrait qu’elle finisse par vendre ; elle ne vend pas. « <b>Pourtant</b> » introduit ce qui contredit l’attente : une <b>opposition</b>. (Contrast against expectation.)' }),

  makeMCQ({ id:'g6fr-rcp-002-m5', chapterId:CH, difficulty:3, subsection:'type_ton',
    question:_P2 + 'De quel type de texte s’agit-il ?',
    options:['un entretien','un mode d’emploi','une légende','un poème'],
    answer:'un entretien',
    hint:'Deux voix se répondent, chacune annoncée par son nom. (Two named voices take turns.)',
    explanation:'Questions et réponses alternent, chacune précédée du nom de celui qui parle : c’est un <b>entretien</b> (une interview). (An interview.)' }),

  makeText({ id:'g6fr-rcp-002-o1', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P2 + 'Dans « ce n’était pas convenable », que veut dire « convenable » : bruyant, correct ou ancien ? Écrivez un seul mot.',
    answer:'correct', alsoAccept:['acceptable','comme il faut'],
    hint:'La phrase suivante dit ce que l’on pensait d’une jeune fille. (The next sentence explains.)',
    explanation:'« On disait que ce n’était pas <b>convenable</b>. Une jeune fille qui écoutait du séga, cela se remarquait. » Convenable = <b>correct</b>, conforme à ce que la société acceptait. (Proper, respectable.)' }),

  makeText({ id:'g6fr-rcp-002-o2', chapterId:CH, difficulty:4, subsection:'inference',
    question:_P2 + 'Pourquoi cachait-elle ses disques sous son lit : par honte, par peur du vol ou par manque de place ? Répondez en deux mots au plus.',
    answer:'par honte', alsoAccept:['honte','la honte'],
    hint:'Elle emploie elle-même le mot, un peu plus loin dans l’entretien. (She uses the word herself, later on.)',
    explanation:'« Ma mère… ne voulait pas les voir », puis, à la question suivante : « <b>J’ai eu honte, oui. Pendant des années.</b> » Ce n’est ni le vol ni la place. (Shame, by her own word.)' }),

  makeText({ id:'g6fr-rcp-002-o3', chapterId:CH, difficulty:4, subsection:'interpretation',
    question:_P2 + 'Relevez le nom de l’instrument que le père de Madame Labonne fabriquait lui-même. Écrivez un seul mot.',
    answer:'ravanne', alsoAccept:['la ravanne','une ravanne'],
    hint:'L’objet revient deux fois : au début, puis dans la toute dernière réponse. (It appears twice.)',
    explanation:'« Il jouait de la <b>ravanne</b>, une ravanne qu’il fabriquait lui-même, avec une peau de cabri. » Elle ira au petit-fils avec les disques. (The ravanne, the Mauritian frame drum.)' }),

  makeText({ id:'g6fr-rcp-002-o4', chapterId:CH, difficulty:3, subsection:'vrai_faux',
    question:_P2 + 'Vrai ou faux : Madame Labonne est contre la copie de ses disques sur ordinateur. Répondez par « vrai » ou « faux ».',
    answer:'faux', alsoAccept:['fausse','c’est faux'],
    hint:'Distinguez ce qu’elle accepte de ce qu’elle regrette. (Separate what she accepts from what she regrets.)',
    explanation:'Faux : « C’est lui qui a proposé, et <b>j’ai dit oui tout de suite</b>. Une maison peut brûler ; un fichier, non. » Elle approuve la copie, mais regrette une écoute perdue : ce n’est pas la même chose. (She agrees — with one reservation.)' }),

  makeText({ id:'g6fr-rcp-002-o5', chapterId:CH, difficulty:3, subsection:'idee_principale',
    question:_P2 + 'Que refuse-t-elle absolument de faire de ses disques : les vendre, les jeter ou les copier ? Répondez en trois mots au plus.',
    answer:'les vendre', alsoAccept:['vendre','les vendre tous'],
    hint:'Le titre de l’entretien donne déjà la réponse. (The headline says it.)',
    explanation:'Le titre est « <b>Mes disques, je ne les vends pas</b> », et elle le confirme : « je ne les ai jamais vendus, et je ne les vendrai pas ». Elle accepte en revanche la copie. (She will not sell them.)' })
);

// ══ TEXTE 3 · affiche scolaire · ~400 mots ═══════════════════════════════
const _P3 = box(LIS + `
<b>SORTIE SCOLAIRE — ÎLE AUX AIGRETTES</b><br>
<i>Classes de Grade 6 · Affiche à lire avec un adulte</i><br><br>
<b>QUAND</b><br>
Le samedi 11 octobre. Départ du portail de l'école à 7 h 15 précises. Le bus ne repart pas pour les retardataires.<br>
Retour à l'école vers 14 h 30.<br><br>
<b>OÙ</b><br>
Bus jusqu'à Pointe Jérôme, puis bateau (dix minutes) jusqu'à l'île. L'île aux Aigrettes est une réserve naturelle de vingt-six hectares, à cinq cents mètres de la côte.<br><br>
<b>CE QUE NOUS VERRONS</b><br>
La dernière forêt d'ébéniers du pays. Des tortues géantes d'Aldabra, qui remplacent les tortues mauriciennes disparues. Le pigeon des mares et la grosse cateau verte, deux oiseaux endémiques : cela signifie qu'ils ne vivent nulle part ailleurs sur la Terre.<br><br>
<b>ACCOMPAGNATEURS</b><br>
Trois enseignants et deux parents volontaires accompagnent le groupe. Madame Ramful dirige la sortie, et un guide de la réserve nous attend au débarcadère de l'île.<br><br>
<b>À APPORTER</b><br>
Chaussures fermées. Chapeau. Une bouteille d'eau par élève. Un carnet et un crayon. Un vêtement de pluie léger.<br><br>
<b>À NE PAS APPORTER</b><br>
Aucune nourriture ne descend du bateau. Pas de graines, pas de fruits, pas de sandwichs : une seule graine étrangère peut faire pousser une plante qui étouffera les ébéniers. Pas de ballon. Pas de haut-parleur.<br><br>
<b>SUR L'ÎLE, LA RÈGLE EST SIMPLE</b><br>
On regarde. On écoute. On ne cueille rien.<br>
Et l'on reste sur le sentier, toujours sur le sentier, du premier au dernier pas : hors du sentier, on écrase les jeunes pousses sans même les voir.<br><br>
<b>TARIF</b><br>
Rs 250 par élève (bus, bateau, guide de la réserve).*<br>
<i>*Aucun élève ne restera à l'école faute d'argent. Voyez Madame Ramful discrètement, avant le 3 octobre.</i><br><br>
<b>COUPON-RÉPONSE</b><br>
À rendre signé avant le vendredi 3 octobre. Un coupon rendu après cette date ne pourra pas être accepté : la réserve limite les visites à trente personnes par jour et les places sont réservées à l'avance.<br><br>
<b>EN CAS DE FORTE PLUIE</b><br>
La sortie est reportée au samedi 18 octobre. La décision est prise le vendredi soir et annoncée par message aux parents.<br><br>
<b>Vingt-six hectares. Et, dessus, des espèces qui ne poussent nulle part ailleurs.</b>
`, '#0d9488');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-rcp-003-m1', chapterId:CH, difficulty:3, subsection:'reperage',
    question:_P3 + 'Quel jour la sortie a-t-elle lieu, si le temps le permet ?',
    options:['le samedi 11 octobre','le samedi 18 octobre','le vendredi 3 octobre','le samedi 4 octobre'],
    answer:'le samedi 11 octobre',
    hint:'Attention : trois dates différentes figurent sur l’affiche. (Three different dates appear.)',
    explanation:'« <b>Le samedi 11 octobre.</b> » Le 3 octobre est la date du coupon, et le 18 octobre la date de report en cas de forte pluie. (The 11th ; the others are the form deadline and the rain date.)' }),

  makeMCQ({ id:'g6fr-rcp-003-m2', chapterId:CH, difficulty:3, subsection:'type_ton',
    question:_P3 + 'De quel type de document s’agit-il ?',
    options:['une affiche d’information','une lettre personnelle','un article de journal','un journal intime'],
    answer:'une affiche d’information',
    hint:'Regardez la mise en page : des titres en majuscules, des listes courtes. (Look at the layout.)',
    explanation:'Des rubriques en majuscules (QUAND, OÙ, TARIF), des phrases courtes, un coupon-réponse et un astérisque : c’est une <b>affiche d’information</b>, faite pour être lue debout. (An information notice.)' }),

  makeMCQ({ id:'g6fr-rcp-003-m3', chapterId:CH, difficulty:4, subsection:'inference',
    question:_P3 + 'Pourquoi faut-il voir Madame Ramful « discrètement » ?',
    options:['Pour ne pas gêner les familles.','Pour éviter le bruit en classe.','Pour gagner du temps le matin.','Pour garder les places libres.'],
    answer:'Pour ne pas gêner les familles.',
    hint:'De quoi parle la phrase juste avant l’astérisque ? (What is the sentence about ?)',
    explanation:'La note dit : « <b>Aucun élève ne restera à l’école faute d’argent.</b> » Elle concerne les familles qui ne peuvent pas payer ; le mot « discrètement » leur épargne d’avoir à le dire devant les autres. (It is about money, and dignity.)' }),

  makeMCQ({ id:'g6fr-rcp-003-m4', chapterId:CH, difficulty:4, subsection:'esprit_critique',
    question:_P3 + 'Quelle information, pourtant utile, l’affiche ne donne-t-elle nulle part ?',
    options:['Où les élèves déjeuneront.','À quelle heure part le bus.','Ce qu’il faut apporter.','Qui accompagne la classe.'],
    answer:'Où les élèves déjeuneront.',
    hint:'Le retour est prévu à 14 h 30, et aucune nourriture ne descend du bateau. (Return at 2.30 p.m., no food on the island.)',
    explanation:'L’affiche interdit toute nourriture sur l’île et annonce un retour « vers 14 h 30 », mais ne dit <b>jamais</b> où ni quand les élèves mangeront. L’heure du bus (7 h 15), la liste du matériel et les accompagnateurs, eux, y sont. (A real gap in the notice.)' }),

  makeMCQ({ id:'g6fr-rcp-003-m5', chapterId:CH, difficulty:3, subsection:'figures_style',
    question:_P3 + 'Dans « On regarde. On écoute. On ne cueille rien. », quelle figure de style est employée ?',
    options:['une anaphore','une comparaison','une métaphore','une hyperbole'],
    answer:'une anaphore',
    hint:'Regardez le premier mot de chacune des trois phrases. (Look at the first word of each sentence.)',
    explanation:'Le même mot, « On », ouvre les trois phrases : c’est une <b>anaphore</b>. La répétition transforme trois consignes en une seule règle facile à retenir. (Same word repeated at the start of each clause.)' }),

  makeText({ id:'g6fr-rcp-003-o1', chapterId:CH, difficulty:3, subsection:'reperage',
    question:_P3 + 'À quelle heure le bus part-il du portail de l’école ? Écrivez l’heure.',
    answer:'7 h 15', alsoAccept:['7h15','sept heures quinze'],
    hint:'La rubrique QUAND donne l’heure, et prévient les retardataires. (See the QUAND section.)',
    explanation:'« Départ du portail de l’école à <b>7 h 15</b> précises. Le bus ne repart pas pour les retardataires. » (7.15 a.m. sharp.)' }),

  makeText({ id:'g6fr-rcp-003-o2', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P3 + 'Quel adjectif de l’affiche qualifie une espèce qui ne vit nulle part ailleurs sur la Terre ? Écrivez un seul mot.',
    answer:'endémique', alsoAccept:['endémiques','espèce endémique'],
    hint:'L’affiche définit le mot juste après l’avoir employé. (The notice defines it on the spot.)',
    explanation:'« Le pigeon des mares et la grosse cateau verte, deux oiseaux <b>endémiques</b> : cela signifie qu’ils ne vivent nulle part ailleurs sur la Terre. » (Endemic.)' }),

  makeText({ id:'g6fr-rcp-003-o3', chapterId:CH, difficulty:3, subsection:'vrai_faux',
    question:_P3 + 'Vrai ou faux : chaque élève peut emporter son pique-nique sur l’île. Répondez par « vrai » ou « faux ».',
    answer:'faux', alsoAccept:['fausse','c’est faux'],
    hint:'Lisez la rubrique « À NE PAS APPORTER » jusqu’au bout. (Read that section to the end.)',
    explanation:'Faux : « <b>Aucune nourriture ne descend du bateau.</b> Pas de graines, pas de fruits, pas de sandwichs : une seule graine étrangère peut faire pousser une plante qui étouffera les ébéniers. » Seule l’eau est autorisée. (Water only.)' }),

  makeText({ id:'g6fr-rcp-003-o4', chapterId:CH, difficulty:3, subsection:'connecteurs',
    question:_P3 + 'Dans « En cas de forte pluie, la sortie est reportée », le début de la phrase exprime-t-il la condition, la cause ou le but ? Répondez en deux mots au plus.',
    answer:'la condition', alsoAccept:['condition','une condition'],
    hint:'La pluie n’est pas encore tombée : elle est seulement possible. (The rain has not fallen yet.)',
    explanation:'« En cas de » introduit une hypothèse : le report n’aura lieu <b>que si</b> la pluie tombe. C’est donc une <b>condition</b>, non une cause (qui, elle, serait déjà vraie). (A condition, not a cause.)' }),

  makeText({ id:'g6fr-rcp-003-o5', chapterId:CH, difficulty:3, subsection:'idee_principale',
    question:_P3 + 'Quelle consigne l’affiche répète-t-elle pour protéger les jeunes pousses ? Répondez en quatre mots au plus.',
    answer:'rester sur le sentier', alsoAccept:['sur le sentier','rester sur le chemin'],
    hint:'La consigne est écrite deux fois dans la même phrase. (It is written twice in one sentence.)',
    explanation:'« Et l’on reste <b>sur le sentier, toujours sur le sentier</b>, du premier au dernier pas : hors du sentier, on écrase les jeunes pousses sans même les voir. » (Stay on the path.)' })
);

// ══ TEXTE 4 · poème · ~270 mots ══════════════════════════════════════════
// ⚠ POURQUOI CELUI-CI EST PLUS COURT que la bande 350-480 mots. Un poème ne se
// lit pas comme un récit : vingt-quatre vers courts se relisent trois fois dans
// le temps qu'il faut pour lire une page en prose, et allonger le poème pour
// atteindre un quota le rendrait bavard - c'est-à-dire mauvais. Le chapeau de
// présentation et la note finale portent le texte à ~270 mots, et les questions
// (strophes, répétition, personnification, relevé d'un vers) demandent une
// relecture ligne à ligne, pas un balayage. Les packs existants font le même
// choix pour leurs poèmes et leurs affiches.
const _P4 = box(LIS + `
<b>Le bus de six heures</b><br>
<i>Poème en six quatrains, écrit pour ce recueil.</i><br><br>
Le trajet dure quarante minutes : de la côte, où il fait chaud, jusqu'à Curepipe, où il pleut presque tous les jours. Le bus part avant le jour et se remplit à chaque arrêt. Le poème le suit du départ à l'arrivée, sans jamais descendre. Lisez-le deux fois, lentement, avant de répondre aux questions.<br><br>
Il monte, il monte, il monte encore,<br>
la route se plie sous ses roues ;<br>
Curepipe attend dans la brume<br>
comme une ville sous un drap.<br><br>
À Quatre-Bornes, une dame monte<br>
avec deux sacs et un parapluie ;<br>
elle s'assoit près de la fenêtre<br>
et pose son front sur le verre froid.<br><br>
Le vendeur de gâteaux-piments<br>
descend au feu, sans dire au revoir ;<br>
le bus repart, l'odeur reste,<br>
passagère qui n'a pas payé.<br><br>
La pluie arrive avant la ville,<br>
fine, patiente, sans colère ;<br>
elle lave les vitres du dehors,<br>
nous respirons sur elles du dedans.<br><br>
Personne ne parle. Le moteur parle.<br>
Il raconte toujours la même histoire :<br>
la mer en bas, le froid en haut,<br>
et vingt-six kilomètres entre les deux.<br><br>
Quand les portes s'ouvrent, il est sept heures.<br>
Le froid entre et compte les têtes.<br>
Chacun descend dans son manteau,<br>
et la brume referme la porte.<br><br>
<i>Note de l'auteur : le trajet dure quarante minutes ; le poème dure une minute. C'est tout ce qu'un poème promet. Un texte en prose vous raconterait le voyage ; un poème vous demande de le refaire vous-même, vers après vers, et c'est pour cela qu'il faut le relire.</i>
`, '#ea580c');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-rcp-004-m1', chapterId:CH, difficulty:3, subsection:'poesie',
    question:_P4 + 'Combien de strophes le poème compte-t-il ?',
    options:['six','quatre','cinq','huit'],
    answer:'six',
    hint:'Une strophe est un groupe de vers séparé du suivant par un blanc. (Count the blocks of lines.)',
    explanation:'Le sous-titre l’annonce — « Poème en <b>six</b> quatrains » — et l’on compte bien six groupes de quatre vers. (Six four-line stanzas.)' }),

  makeMCQ({ id:'g6fr-rcp-004-m2', chapterId:CH, difficulty:4, subsection:'poesie',
    question:_P4 + 'Que produit la répétition « Il monte, il monte, il monte encore » ?',
    options:['La lenteur de la montée.','La vitesse du moteur.','La joie des voyageurs.','La peur de la brume.'],
    answer:'La lenteur de la montée.',
    hint:'Dites le vers à voix haute : combien de temps met-il à avancer ? (Say the line aloud.)',
    explanation:'Trois fois le même verbe pour un seul mouvement : le vers met du temps à finir, comme le bus met du temps à grimper. La répétition imite la <b>lenteur</b> de la montée. (The line climbs as slowly as the bus.)' }),

  makeMCQ({ id:'g6fr-rcp-004-m3', chapterId:CH, difficulty:3, subsection:'figures_style',
    question:_P4 + 'Dans « Personne ne parle. Le moteur parle. », quelle figure de style est employée ?',
    options:['une personnification','une comparaison','une énumération','une hyperbole'],
    answer:'une personnification',
    hint:'Un moteur peut faire du bruit, mais peut-il raconter ? (An engine makes noise — but can it tell a story ?)',
    explanation:'Le moteur « parle » et « raconte toujours la même histoire » : des actions humaines prêtées à une machine, donc une <b>personnification</b>. Au vers 4, « comme une ville sous un drap » est, lui, une comparaison. (Human speech given to a machine.)' }),

  makeMCQ({ id:'g6fr-rcp-004-m4', chapterId:CH, difficulty:4, subsection:'interpretation',
    question:_P4 + 'Quel vers donne la longueur du trajet ?',
    options:['et vingt-six kilomètres entre les deux','Il raconte toujours la même histoire','la mer en bas, le froid en haut','Curepipe attend dans la brume'],
    answer:'et vingt-six kilomètres entre les deux',
    hint:'Cherchez le seul vers qui contient un nombre. (Only one line carries a number.)',
    explanation:'« <b>et vingt-six kilomètres entre les deux</b> » clôt la cinquième strophe. Le vers précédent, « la mer en bas, le froid en haut », donne les deux extrémités ; celui-ci donne la distance. (The distance is in that one line.)' }),

  makeMCQ({ id:'g6fr-rcp-004-m5', chapterId:CH, difficulty:3, subsection:'narration',
    question:_P4 + 'Qui semble parler dans le poème ?',
    options:['Un voyageur du bus.','Le chauffeur du bus.','La dame au parapluie.','Le vendeur de gâteaux.'],
    answer:'Un voyageur du bus.',
    hint:'Un seul pronom, à la quatrième strophe, dit d’où l’on regarde. (One pronoun says where the voice sits.)',
    explanation:'« <b>nous</b> respirons sur elles du dedans » : la voix est à l’intérieur du bus, parmi les passagers. Le chauffeur, la dame et le vendeur sont vus de l’extérieur. (The voice is a passenger.)' }),

  makeText({ id:'g6fr-rcp-004-o1', chapterId:CH, difficulty:3, subsection:'poesie',
    question:_P4 + 'Le poème oppose deux climats. En un seul mot, quel temps fait-il à l’arrivée, à Curepipe : chaud, froid ou sec ?',
    answer:'froid', alsoAccept:['il fait froid','frais'],
    hint:'Deux vers de la fin le disent, dont un avec le mot « manteau ». (Two closing lines say it.)',
    explanation:'« la mer en bas, le <b>froid</b> en haut », puis « Le <b>froid</b> entre et compte les têtes… Chacun descend dans son manteau. » (Cold at the top of the island.)' }),

  makeText({ id:'g6fr-rcp-004-o2', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P4 + 'Dans « Curepipe attend dans la brume », qu’est-ce que la brume : un brouillard léger, une pluie forte ou un vent ? Répondez en deux mots au plus.',
    answer:'brouillard', alsoAccept:['un brouillard','brouillard léger'],
    hint:'La brume revient au dernier vers et cache la ville. (It returns in the last line, hiding the town.)',
    explanation:'La brume est un <b>brouillard</b> léger : elle voile la ville « comme une ville sous un drap », et au dernier vers elle « referme la porte ». La pluie, elle, est nommée séparément à la quatrième strophe. (Mist, a light fog.)' }),

  makeText({ id:'g6fr-rcp-004-o3', chapterId:CH, difficulty:4, subsection:'inference',
    question:_P4 + 'Pourquoi les vitres sont-elles mouillées à l’intérieur : à cause de la pluie, de la buée ou de la mer ? Répondez en deux mots au plus.',
    answer:'la buée', alsoAccept:['buée','de la buée'],
    hint:'La pluie lave « du dehors » ; que font les passagers « du dedans » ? (Rain outside — what happens inside ?)',
    explanation:'« elle lave les vitres du dehors, <b>nous respirons sur elles du dedans</b> » : le souffle chaud sur le verre froid dépose de la <b>buée</b>. La pluie, elle, reste à l’extérieur. (Breath on cold glass.)' }),

  makeText({ id:'g6fr-rcp-004-o4', chapterId:CH, difficulty:3, subsection:'type_ton',
    question:_P4 + 'Quel est le ton de ce poème : calme, furieux ou comique ? Écrivez un seul mot.',
    answer:'calme', alsoAccept:['paisible','apaisé'],
    hint:'Regardez les adjectifs de la pluie, à la quatrième strophe. (Look at how the rain is described.)',
    explanation:'La pluie est « fine, patiente, <b>sans colère</b> », personne ne parle, chacun descend sans bruit : le ton est <b>calme</b> d’un bout à l’autre. (Quiet throughout.)' }),

  makeText({ id:'g6fr-rcp-004-o5', chapterId:CH, difficulty:3, subsection:'reperage',
    question:_P4 + 'À quel arrêt la dame aux deux sacs monte-t-elle ? Nommez la ville.',
    answer:'Quatre-Bornes', alsoAccept:['à Quatre-Bornes','Quatre Bornes'],
    hint:'Le nom ouvre la deuxième strophe. (It opens the second stanza.)',
    explanation:'« À <b>Quatre-Bornes</b>, une dame monte / avec deux sacs et un parapluie. » (Quatre-Bornes, between the coast and Curepipe.)' })
);

})();
