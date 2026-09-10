'use strict';
// grade5-french — compréhension écrite : 4 textes originaux, 10 questions chacun.
// IDs : g5fr-rcp-001-m1 … g5fr-rcp-004-o5
//
// Un bloc = un texte + 5 makeMCQ + 5 makeText. L'assembleur d'examen distribue
// le bloc entier, donc 5 et 5 exactement.
//
// Les quatre textes sont écrits pour ce dépôt (aucun emprunt) et évitent les
// contextes déjà pris dans ce pack : la journée à Flic en Flac (ch07_lecture),
// la nuit du cyclone, le vieux pêcheur et la sortie à Pamplemousses
// (ch11_textes), la scène de marché (ch12_images).
(function () {
const CH = 'fr-lecture';

function box(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}
const LIS = '<b style="color:#1e40af">Lisez le texte, puis répondez à la question.</b><br><br>';

// ══ TEXTE 1 · récit · ~390 mots ══════════════════════════════════════════
const _P1 = box(LIS + `
<b>Le manguier de la barrière</b><br><br>
Le manguier pousse exactement sur la barrière, entre la cour de Tante Vimla et celle des Sooriah. Personne ne sait qui l'a planté. Tante Vimla dit que c'est son père ; Monsieur Sooriah dit que c'est sa mère. Les deux ont peut-être raison, ou les deux se trompent, et cela dure depuis trente ans.<br><br>
Chaque année, en novembre, les mangues jaunissent comme de petites lampes accrochées dans le feuillage. Et chaque année, la même dispute recommence. Les branches qui penchent vers la cour de Tante Vimla portent les plus grosses mangues ; celles qui penchent vers les Sooriah reçoivent le soleil du matin et mûrissent les premières. Tante Vimla ramasse ce qui tombe chez elle. Monsieur Sooriah ramasse ce qui tombe chez lui. Ni l'un ni l'autre ne lève jamais les yeux vers l'autre cour. Le manguier, lui, ne prend jamais parti.<br><br>
Cette année-là, Anjali, la petite-fille de Tante Vimla, a eu dix ans. Elle avait remarqué une chose que les adultes ne voyaient plus : sur la branche la plus haute, six mangues énormes pendaient juste au-dessus de la barrière. Ni d'un côté ni de l'autre. Au milieu.<br><br>
Un samedi matin, Anjali a pris l'échelle de son grand-père et l'a posée contre le tronc. Rohan, le garçon des Sooriah, l'a vue par la fenêtre et est sorti en courant.<br>
— Cette branche est à nous, a-t-il dit.<br>
— Regarde bien, a répondu Anjali. Elle n'est à personne.<br><br>
Ils sont restés là un moment, la tête levée, à mesurer l'ombre de la branche sur le sol. L'ombre tombait des deux côtés.<br><br>
Ils ont cueilli les six mangues ensemble : Anjali sur l'échelle, Rohan tenant les barreaux. Puis ils en ont posé trois sur la véranda de Tante Vimla et trois sur celle des Sooriah, sans rien dire, et ils sont rentrés chacun chez soi.<br><br>
Le soir, Tante Vimla a regardé les trois mangues et n'a posé aucune question. De l'autre côté, Monsieur Sooriah a fait pareil. Mais le dimanche suivant, une assiette de confiture de mangue est apparue sur le mur de la barrière, à l'endroit exact où l'ombre tombe. L'assiette était vide le lundi, et lavée.<br><br>
La dispute, elle, continue. Les adultes ont besoin de leurs habitudes. Mais depuis ce mois de novembre, les six mangues du milieu ne sont plus jamais tombées par terre.
`, '#2563eb');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-rcp-001-m1', chapterId:CH, difficulty:2, subsection:'reperage',
    question:_P1 + 'En quel mois les mangues jaunissent-elles ?',
    options:['novembre','octobre','décembre','janvier'],
    answer:'novembre',
    hint:'Relisez la première phrase du deuxième paragraphe. (Look at the start of paragraph 2.)',
    explanation:'Le texte dit : « Chaque année, en <b>novembre</b>, les mangues jaunissent. » (The month is stated directly.)' }),

  makeMCQ({ id:'g5fr-rcp-001-m2', chapterId:CH, difficulty:3, subsection:'narration',
    question:_P1 + 'Le narrateur de ce texte est :',
    options:['extérieur à l’histoire','Anjali, la petite-fille','Rohan, le voisin','Tante Vimla, la grand-mère'],
    answer:'extérieur à l’histoire',
    hint:'Cherchez un « je » dans le texte : y en a-t-il un ? (Is there a "je" anywhere ?)',
    explanation:'Personne ne dit « je ». Le texte parle d’Anjali et de Rohan à la troisième personne : « <b>Ils</b> sont restés là un moment. » Le narrateur est donc <b>extérieur à l’histoire</b>. (Third-person narrator.)' }),

  makeMCQ({ id:'g5fr-rcp-001-m3', chapterId:CH, difficulty:3, subsection:'figures_style',
    question:_P1 + 'Dans « Le manguier, lui, ne prend jamais parti », quelle figure de style l’auteur emploie-t-il ?',
    options:['une personnification','une comparaison','une énumération','une exagération'],
    answer:'une personnification',
    hint:'Un arbre peut-il vraiment choisir un camp ? (Can a tree really take sides ?)',
    explanation:'« Prendre parti » est une action humaine, prêtée ici à un arbre : c’est une <b>personnification</b>. Une comparaison aurait employé « comme », comme dans « jaunissent <b>comme</b> de petites lampes ». (Human action given to a tree.)' }),

  makeMCQ({ id:'g5fr-rcp-001-m4', chapterId:CH, difficulty:3, subsection:'inference',
    question:_P1 + 'Pourquoi l’assiette de confiture est-elle apparue sur le mur de la barrière ?',
    options:['Pour remercier sans avoir à parler.','Pour montrer qui possède l’arbre.','Pour vendre la confiture aux voisins.','Pour cacher les mangues cueillies.'],
    answer:'Pour remercier sans avoir à parler.',
    hint:'Regardez ce que font les adultes après le geste des enfants, et ce qu’ils ne disent pas. (Watch what the adults do — and do not say.)',
    explanation:'Tante Vimla « n’a posé aucune question », Monsieur Sooriah « a fait pareil », puis l’assiette apparaît et revient « vide le lundi, et lavée ». Le remerciement passe par le geste, pas par les mots. (A thank-you without words.)' }),

  makeMCQ({ id:'g5fr-rcp-001-m5', chapterId:CH, difficulty:3, subsection:'idee_principale',
    question:_P1 + 'Quelle phrase résume le mieux le texte ?',
    options:['Deux enfants trouvent un partage que les adultes refusent.','Deux voisins finissent par se réconcilier complètement.','Un manguier meurt après une longue dispute de famille.','Une fillette vend des mangues pour aider sa grand-mère.'],
    answer:'Deux enfants trouvent un partage que les adultes refusent.',
    hint:'Une bonne idée principale doit couvrir tout le texte, y compris la dernière ligne. (The main idea must cover the ending too.)',
    explanation:'Anjali et Rohan partagent les six mangues du milieu, mais « <b>La dispute, elle, continue</b> ». Les adultes ne se réconcilient pas : ce sont les enfants qui trouvent la solution. (Children solve what adults will not.)' }),

  makeText({ id:'g5fr-rcp-001-o1', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P1 + 'En un seul mot, quel verbe du texte signifie « devenir jaune » ?',
    answer:'jaunissent', alsoAccept:['jaunir','jaunissaient'],
    hint:'Il est au début du deuxième paragraphe, juste après « en novembre ». (Second paragraph, right after the month.)',
    explanation:'« Chaque année, en novembre, les mangues <b>jaunissent</b>. » Le verbe est formé sur l’adjectif « jaune ». (jaunir = to turn yellow.)' }),

  makeText({ id:'g5fr-rcp-001-o2', chapterId:CH, difficulty:2, subsection:'reperage',
    question:_P1 + 'Combien de mangues pendaient juste au-dessus de la barrière ? Écrivez le nombre en lettres.',
    answer:'six', alsoAccept:['6','six mangues'],
    hint:'Le nombre est donné deux fois dans le texte. (The number appears twice.)',
    explanation:'« Sur la branche la plus haute, <b>six</b> mangues énormes pendaient juste au-dessus de la barrière. » (Six mangoes.)' }),

  makeText({ id:'g5fr-rcp-001-o3', chapterId:CH, difficulty:2, subsection:'vrai_faux',
    question:_P1 + 'Vrai ou faux : à la fin du texte, les adultes ont arrêté de se disputer. Répondez par « vrai » ou « faux ».',
    answer:'faux', alsoAccept:['fausse','c’est faux'],
    hint:'La réponse est dans le tout dernier paragraphe. (Check the last paragraph.)',
    explanation:'Faux : « <b>La dispute, elle, continue.</b> Les adultes ont besoin de leurs habitudes. » Seul le sort des six mangues a changé. (The quarrel goes on.)' }),

  makeText({ id:'g5fr-rcp-001-o4', chapterId:CH, difficulty:3, subsection:'grammaire',
    question:_P1 + 'Dans « Ils ont cueilli les six mangues ensemble », à quel temps le verbe « ont cueilli » est-il conjugué ? Nommez le temps en deux mots.',
    answer:'passé composé', alsoAccept:['le passé composé','au passé composé'],
    hint:'Un auxiliaire au présent, plus un participe passé. (Auxiliary in the present + past participle.)',
    explanation:'« ont » (auxiliaire avoir au présent) + « cueilli » (participe passé) = <b>passé composé</b>. C’est le temps du récit dans tout ce texte. (Perfect tense.)' }),

  makeText({ id:'g5fr-rcp-001-o5', chapterId:CH, difficulty:2, subsection:'type_ton',
    question:_P1 + 'Quel est le ton de la fin du texte : moqueur, apaisé ou inquiet ? Écrivez un seul mot.',
    answer:'apaisé', alsoAccept:['calme','paisible'],
    hint:'Regardez l’assiette lavée et la dernière phrase du texte. (Look at the washed plate and the last line.)',
    explanation:'L’assiette rendue « vide le lundi, et lavée » et les mangues qui « ne sont plus jamais tombées par terre » ferment le texte sur une note <b>apaisée</b>, sans cris ni moquerie. (A calm, settled ending.)' })
);

// ══ TEXTE 2 · journal intime · ~400 mots ═════════════════════════════════
const _P2 = box(LIS + `
<b>Le carnet de Krishna</b><br><br>
<b>Mardi 14 mai</b><br>
Il pleuvait à l'arrêt de bus, près du marché de Rose-Hill, et j'attendais depuis vingt minutes. C'est là que j'ai vu le porte-monnaie, contre le pied du banc, à moitié dans une flaque. Il était marron, usé, fermé par un élastique.<br><br>
Je l'ai ouvert. Il y avait deux mille cinq cents roupies, une carte d'identité au nom de Madame Fatima Joomun, un ticket de loterie et la photo d'un bébé qui rit.<br><br>
Je n'ai rien dit à personne dans le bus. J'ai mis le porte-monnaie au fond de mon sac et je l'ai senti là pendant tout le trajet, lourd comme une pierre.<br><br>
<b>Mercredi 15 mai</b><br>
Je n'ai pas bien dormi. Deux mille cinq cents roupies, c'est exactement le prix du vélo d'occasion que Vikash veut vendre. J'y pense depuis février. Personne ne m'a vu ramasser le porte-monnaie. Personne ne saurait jamais.<br><br>
Mais il y a la photo du bébé. Je l'ai regardée trois fois hier soir. Je n'arrive pas à décider si cela rend les choses plus faciles ou plus difficiles.<br><br>
À midi, j'ai demandé à Madame Coret, ma maîtresse, ce qu'on fait quand on trouve quelque chose. Elle a répondu : « On le rend, et on n'en parle plus. » Elle n'a même pas levé la tête de ses copies. Pour elle, ce n'était pas une question.<br><br>
<b>Jeudi 16 mai</b><br>
L'adresse était sur la carte d'identité : une petite maison bleue derrière la station-service. Maman est venue avec moi, mais elle est restée sur le trottoir.<br><br>
Madame Joomun a ouvert la porte. Quand elle a vu le porte-monnaie, elle a mis la main sur sa bouche et elle n'a rien dit pendant un long moment. Puis elle a compté l'argent devant moi, ce qui m'a un peu vexé, et ensuite elle a eu l'air gênée d'avoir compté.<br><br>
Elle a voulu me donner deux cents roupies. J'ai dit non. Elle a insisté. J'ai dit non encore, et cette fois c'était plus facile.<br><br>
Sur le chemin du retour, Maman n'a pas parlé du porte-monnaie. Elle a seulement acheté deux glaces, ce qu'elle ne fait jamais un jeudi.<br><br>
Le vélo de Vikash est toujours à vendre. Je crois que je vais attendre.
`, '#7c3aed');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-rcp-002-m1', chapterId:CH, difficulty:2, subsection:'narration',
    question:_P2 + 'Qui raconte ce texte ?',
    options:['Krishna lui-même','Madame Joomun','la maîtresse Coret','la mère de Krishna'],
    answer:'Krishna lui-même',
    hint:'Comptez les « je » : à qui appartiennent-ils ? (Whose "je" is it ?)',
    explanation:'Le texte est un journal intime écrit à la première personne : « <b>J’</b>ai mis le porte-monnaie au fond de mon sac. » Le carnet porte son nom. (First-person diary.)' }),

  makeMCQ({ id:'g5fr-rcp-002-m2', chapterId:CH, difficulty:2, subsection:'reperage',
    question:_P2 + 'Que contenait le porte-monnaie, en plus de l’argent ?',
    options:['Une carte d’identité et une photo.','Un carnet et une clé de maison.','Un ticket de bus et un stylo.','Une lettre et deux timbres.'],
    answer:'Une carte d’identité et une photo.',
    hint:'La liste est donnée à la fin de la journée du mardi. (The list is in Tuesday’s entry.)',
    explanation:'« Il y avait deux mille cinq cents roupies, une <b>carte d’identité</b> au nom de Madame Fatima Joomun, un ticket de loterie et la <b>photo</b> d’un bébé qui rit. » (Careful : the ticket is a lottery ticket, not a bus ticket.)' }),

  makeMCQ({ id:'g5fr-rcp-002-m3', chapterId:CH, difficulty:3, subsection:'inference',
    question:_P2 + 'Pourquoi Krishna sent-il le porte-monnaie « lourd comme une pierre » pendant tout le trajet ?',
    options:['Parce que sa conscience le gênait déjà.','Parce que son sac était trop petit.','Parce que le cuir était encore mouillé.','Parce qu’il avait peur des voleurs.'],
    answer:'Parce que sa conscience le gênait déjà.',
    hint:'Un porte-monnaie ne pèse presque rien : le poids est donc autre chose. (A wallet weighs nothing.)',
    explanation:'Il « n’a rien dit à personne » et, le lendemain, il « n’a pas bien dormi ». Le poids n’est pas celui du cuir mais celui du silence : c’est sa <b>conscience</b>. (The weight is guilt, not leather.)' }),

  makeMCQ({ id:'g5fr-rcp-002-m4', chapterId:CH, difficulty:3, subsection:'figures_style',
    question:_P2 + 'Dans « lourd comme une pierre », quelle figure de style est employée ?',
    options:['une comparaison','une métaphore','une personnification','une répétition'],
    answer:'une comparaison',
    hint:'Un petit mot de trois lettres relie les deux idées. (One short link-word gives it away.)',
    explanation:'Le mot outil « <b>comme</b> » rapproche deux choses sans les confondre : c’est une <b>comparaison</b>. Sans « comme », on aurait une métaphore. (Simile, marked by "comme".)' }),

  makeMCQ({ id:'g5fr-rcp-002-m5', chapterId:CH, difficulty:3, subsection:'idee_principale',
    question:_P2 + 'Quelle phrase résume le mieux ces trois journées ?',
    options:['Un garçon hésite, puis rend ce qu’il a trouvé.','Un garçon perd son porte-monnaie dans le bus.','Une dame accuse un garçon d’avoir volé son sac.','Un garçon achète enfin le vélo qu’il voulait.'],
    answer:'Un garçon hésite, puis rend ce qu’il a trouvé.',
    hint:'Le mercredi entier est consacré à une hésitation. (Wednesday is all hesitation.)',
    explanation:'Mardi il trouve, mercredi il hésite (« Personne ne saurait jamais »), jeudi il rend. Et à la fin : « Le vélo de Vikash est toujours à vendre. » (He hesitates, then gives it back.)' }),

  makeText({ id:'g5fr-rcp-002-o1', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P2 + 'Dans « ce qui m’a un peu vexé », que veut dire « vexé » : content, blessé ou fatigué ? Écrivez un seul mot.',
    answer:'blessé', alsoAccept:['froissé','offensé'],
    hint:'Madame Joomun compte l’argent devant lui : comment se sent-il ? (She counts the money in front of him.)',
    explanation:'Compter l’argent devant lui revient à douter de son honnêteté : Krishna se sent <b>blessé</b> dans sa fierté. « Vexé » ne veut dire ni content ni fatigué. (vexé = hurt in one’s pride.)' }),

  makeText({ id:'g5fr-rcp-002-o2', chapterId:CH, difficulty:2, subsection:'reperage',
    question:_P2 + 'Quel jour Krishna rend-il le porte-monnaie ? Écrivez le jour.',
    answer:'jeudi', alsoAccept:['le jeudi','jeudi 16 mai'],
    hint:'Regardez le titre de la troisième journée du carnet. (The third dated entry.)',
    explanation:'La visite à la maison bleue est racontée sous la date « <b>Jeudi 16 mai</b> ». (Thursday.)' }),

  makeText({ id:'g5fr-rcp-002-o3', chapterId:CH, difficulty:3, subsection:'vrai_faux',
    question:_P2 + 'Vrai ou faux : Krishna accepte les deux cents roupies que Madame Joomun lui offre. Répondez par « vrai » ou « faux ».',
    answer:'faux', alsoAccept:['fausse','c’est faux'],
    hint:'Il refuse une fois, puis une seconde fois. (He refuses — how many times ?)',
    explanation:'Faux : « Elle a voulu me donner deux cents roupies. <b>J’ai dit non.</b> Elle a insisté. <b>J’ai dit non encore</b>, et cette fois c’était plus facile. » (He refuses twice.)' }),

  makeText({ id:'g5fr-rcp-002-o4', chapterId:CH, difficulty:3, subsection:'grammaire',
    question:_P2 + 'Dans « Il pleuvait à l’arrêt de bus », à quel temps le verbe « pleuvait » est-il conjugué ? Écrivez un seul mot.',
    answer:'imparfait', alsoAccept:['l’imparfait','à l’imparfait'],
    hint:'La terminaison « -ait » décrit un décor qui dure. (The -ait ending sets a lasting scene.)',
    explanation:'« pleuv-<b>ait</b> » est à l’<b>imparfait</b> : le temps du décor et de la durée. Les actions ponctuelles du carnet, elles, sont au passé composé (« j’ai vu »). (Imperfect for background.)' }),

  makeText({ id:'g5fr-rcp-002-o5', chapterId:CH, difficulty:2, subsection:'type_ton',
    question:_P2 + 'Quel type de texte est-ce : une lettre, un journal intime ou une recette ? Répondez en trois mots au plus.',
    answer:'un journal intime', alsoAccept:['journal intime','le journal intime'],
    hint:'Des dates en tête de paragraphe, et un « je » qui se confie. (Dates + a private "je".)',
    explanation:'Trois dates (« Mardi 14 mai », « Mercredi 15 mai », « Jeudi 16 mai ») et des pensées personnelles que l’auteur n’a dites à personne : c’est un <b>journal intime</b>. (A diary.)' })
);

// ══ TEXTE 3 · lettre de demande · ~380 mots ══════════════════════════════
const _P3 = box(LIS + `
<b>Lettre</b><br><br>
Yashvi Ramsamy<br>
Grade 5, école primaire de Mahébourg<br><br>
Monsieur le Président<br>
Conseil de village de Pointe d'Esny<br><br>
Mahébourg, le 2 septembre<br><br>
<b>Objet : demande de deux bacs de tri à l'entrée de la plage publique</b><br><br>
Monsieur le Président,<br><br>
Le samedi 23 août, ma classe et onze parents ont nettoyé la plage publique de Pointe d'Esny, entre le parking et le vieux filao. Nous y sommes restés trois heures. Nous avons rempli quarante et un sacs.<br><br>
Nous n'avons pas seulement ramassé : nous avons compté. Dans ces quarante et un sacs, nous avons relevé 612 bouteilles en plastique, 1 043 bouchons, 380 pailles et 74 sandales dépareillées. Le reste était surtout des morceaux de plastique trop petits pour être identifiés. Notre maîtresse nous a expliqué que ce sont ces morceaux-là que les poissons avalent.<br><br>
Vous nous répondrez peut-être que la plage est déjà équipée. C'est vrai : il y a une poubelle près du parking. Mais elle est unique, elle n'a pas de couvercle, et le dimanche à dix heures elle débordait déjà. Le vent fait le reste. Une poubelle qui déborde n'est plus une poubelle, c'est un tas.<br><br>
Nous vous demandons donc deux choses.<br><br>
Premièrement, deux bacs de tri, un pour le plastique et un pour le reste, placés à l'entrée du sentier et non près du parking, où personne ne passe en repartant.<br><br>
Deuxièmement, un panneau indiquant le nombre de sacs ramassés chaque mois. Nous pensons qu'un chiffre affiché fait plus honte qu'une interdiction.<br><br>
Nous savons que deux bacs coûtent de l'argent. Mais le camion municipal passe déjà à Pointe d'Esny le mardi : il ne s'agit donc pas d'un nouveau trajet, seulement d'un arrêt de plus.<br><br>
Notre lagon n'est pas une poubelle à ciel ouvert. Il est la première chose que les visiteurs photographient et la seule chose que nous, nous ne pourrons pas remplacer.<br><br>
Ma classe se propose de nettoyer la plage une fois par trimestre si les bacs sont installés. Nous attendons votre réponse avant les vacances d'octobre.<br><br>
Veuillez agréer, Monsieur le Président, l'expression de mes salutations respectueuses.<br><br>
Yashvi Ramsamy, Grade 5
`, '#0d9488');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-rcp-003-m1', chapterId:CH, difficulty:2, subsection:'reperage',
    question:_P3 + 'Combien de sacs la classe a-t-elle remplis ?',
    options:['quarante et un','quarante-quatre','cinquante et un','trente et un'],
    answer:'quarante et un',
    hint:'Le nombre revient deux fois, au début de la lettre. (The number is given twice.)',
    explanation:'« Nous avons rempli <b>quarante et un</b> sacs », puis « Dans ces <b>quarante et un</b> sacs… ». (41 bags.)' }),

  makeMCQ({ id:'g5fr-rcp-003-m2', chapterId:CH, difficulty:3, subsection:'idee_principale',
    question:_P3 + 'Que demande exactement cette lettre ?',
    options:['Deux bacs de tri et un panneau.','Un nouveau parking et un banc.','Une sortie scolaire chaque mois.','Un camion municipal le mardi.'],
    answer:'Deux bacs de tri et un panneau.',
    hint:'La lettre annonce « deux choses » : lisez les deux paragraphes qui suivent. (She announces two requests.)',
    explanation:'« Premièrement, <b>deux bacs de tri</b>… Deuxièmement, un <b>panneau</b> indiquant le nombre de sacs ramassés chaque mois. » Le camion, lui, passe déjà. (Two bins and a sign.)' }),

  makeMCQ({ id:'g5fr-rcp-003-m3', chapterId:CH, difficulty:3, subsection:'inference',
    question:_P3 + 'Pourquoi Yashvi veut-elle les bacs à l’entrée du sentier plutôt qu’au parking ?',
    options:['Parce qu’on y passe en repartant.','Parce que le parking est trop loin.','Parce que le vent y souffle moins.','Parce que le camion s’y arrête.'],
    answer:'Parce qu’on y passe en repartant.',
    hint:'Quand une personne jette-t-elle ses déchets : en arrivant ou en partant ? (When do people throw things away ?)',
    explanation:'« placés à l’entrée du sentier et non près du parking, <b>où personne ne passe en repartant</b> ». Un bac n’est utile que là où l’on passe les mains pleines. (Bins work where people walk out.)' }),

  makeMCQ({ id:'g5fr-rcp-003-m4', chapterId:CH, difficulty:2, subsection:'type_ton',
    question:_P3 + 'De quel type de texte s’agit-il ?',
    options:['une lettre de demande','un article de journal','une recette de cuisine','un journal intime'],
    answer:'une lettre de demande',
    hint:'Repérez la ligne « Objet : » et la formule finale. (Look at the "Objet" line and the closing.)',
    explanation:'Une ligne « <b>Objet</b> : demande de deux bacs… », un destinataire nommé et la formule « Veuillez agréer… » : c’est une <b>lettre de demande</b> (lettre formelle). (A formal request letter.)' }),

  makeMCQ({ id:'g5fr-rcp-003-m5', chapterId:CH, difficulty:3, subsection:'figures_style',
    question:_P3 + 'Dans « Notre lagon n’est pas une poubelle à ciel ouvert », quelle figure de style est employée ?',
    options:['une métaphore','une comparaison','une énumération','une répétition'],
    answer:'une métaphore',
    hint:'Il n’y a ni « comme » ni « pareil à » dans la phrase. (No "comme" here.)',
    explanation:'Le lagon est directement appelé « poubelle », sans mot outil : c’est une <b>métaphore</b> (niée, ici, pour frapper l’esprit). Avec « comme », ce serait une comparaison. (A metaphor, not a simile.)' }),

  makeText({ id:'g5fr-rcp-003-o1', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P3 + 'Les sandales ramassées sont « dépareillées ». En un seul mot, qu’est-ce qu’elles ne forment donc pas ?',
    answer:'paire', alsoAccept:['une paire','paires'],
    hint:'Pensez au préfixe « dé- » devant « pareil ». (Think of the prefix dé-.)',
    explanation:'« Dépareillé » veut dire « qui a perdu son pareil » : les 74 sandales ne forment plus de <b>paire</b>. (Odd shoes, no matching pair.)' }),

  makeText({ id:'g5fr-rcp-003-o2', chapterId:CH, difficulty:2, subsection:'reperage',
    question:_P3 + 'Combien de pailles la classe a-t-elle comptées ? Écrivez le nombre en chiffres.',
    answer:'380', alsoAccept:['380 pailles','trois cent quatre-vingts'],
    hint:'La liste chiffrée se trouve dans le deuxième paragraphe. (The counted list is in paragraph 2.)',
    explanation:'« 612 bouteilles en plastique, 1 043 bouchons, <b>380 pailles</b> et 74 sandales dépareillées. » (380 straws.)' }),

  makeText({ id:'g5fr-rcp-003-o3', chapterId:CH, difficulty:3, subsection:'vrai_faux',
    question:_P3 + 'Vrai ou faux : il n’y a aucune poubelle sur cette plage. Répondez par « vrai » ou « faux ».',
    answer:'faux', alsoAccept:['fausse','c’est faux'],
    hint:'Yashvi répond elle-même à cette objection. (She answers this objection herself.)',
    explanation:'Faux : « C’est vrai : <b>il y a une poubelle près du parking.</b> Mais elle est unique, elle n’a pas de couvercle… » Le problème n’est pas l’absence, c’est le nombre. (There is one bin — just one.)' }),

  makeText({ id:'g5fr-rcp-003-o4', chapterId:CH, difficulty:3, subsection:'grammaire',
    question:_P3 + 'Dans « Nous vous demandons donc deux choses », quel est le sujet du verbe « demandons » ? Écrivez un seul mot.',
    answer:'nous', alsoAccept:['le sujet est nous','pronom nous'],
    hint:'Posez la question « qui est-ce qui demande ? ». (Ask : who is asking ?)',
    explanation:'« Qui est-ce qui demande ? » → <b>nous</b>. La terminaison « -ons » confirme la première personne du pluriel ; « vous » est ici le complément. (Subject = nous.)' }),

  makeText({ id:'g5fr-rcp-003-o5', chapterId:CH, difficulty:3, subsection:'inference',
    question:_P3 + 'Quel sentiment Yashvi espère-t-elle provoquer avec le panneau des chiffres : la honte, la joie ou la peur ? Écrivez un ou deux mots.',
    answer:'la honte', alsoAccept:['honte','de la honte'],
    hint:'Elle compare son panneau à une interdiction. (She compares her sign to a ban.)',
    explanation:'« Nous pensons qu’un chiffre affiché fait plus <b>honte</b> qu’une interdiction. » Elle mise sur le regard des autres plutôt que sur une règle. (Shame, not a ban.)' })
);

// ══ TEXTE 4 · courriel · ~370 mots ═══════════════════════════════════════
const _P4 = box(LIS + `
<b>Courriel</b><br><br>
<b>De :</b> Papa<br>
<b>À :</b> Dhiren<br>
<b>Cc :</b> Maman<br>
<b>Objet :</b> ton téléphone, et nos trois règles<br><br>
Dhiren,<br><br>
Je t'écris au lieu de te parler, parce qu'un courriel se relit et qu'une dispute, non.<br><br>
Le téléphone est à toi. Nous ne te l'avons pas prêté, nous te l'avons donné. Ce n'est pas une punition, c'est un apprentissage, et un apprentissage se fait avec des règles. Il y en aura trois. Elles ont été discutées avec ta mère et elles valent pour toute la maison.<br><br>
<b>Un.</b> À partir de vingt heures, le téléphone dort dans la cuisine, dans le tiroir près du grille-pain. Il dort là, tous les soirs, y compris le samedi. La raison n'est pas que nous te soupçonnons : la raison est que personne, à onze ans ou à quarante-trois, ne dort bien avec un écran à trente centimètres de la tête.<br><br>
<b>Deux.</b> On répond à sa grand-mère avant de répondre à un jeu. Ajita t'appelle le dimanche. Depuis trois semaines, tu réponds « je te rappelle » et tu ne rappelles pas. Un téléphone est comme une porte ouverte sur la rue : il laisse entrer autant qu'il laisse sortir, et c'est à toi de choisir qui passe en premier.<br><br>
<b>Trois.</b> Tout ce que tu écris doit pouvoir être lu à voix haute, à cette table, devant nous. Cette règle-là est la plus dure des trois, et je vais être honnête avec toi : c'est moi qu'elle gêne le plus. J'ai déjà envoyé des messages en colère que je n'aurais pas voulu relire le lendemain, encore moins à voix haute. C'est justement pour cela que je te la donne.<br><br>
Nous ne regarderons pas ton téléphone en cachette. Si nous voulons voir quelque chose, nous te le demanderons, devant toi. En échange, nous attendons que tu ne mettes pas de mot de passe que nous ne connaissons pas.<br><br>
Dans un mois, le 30 du mois prochain, nous nous asseyons tous les trois et nous relisons ces trois règles. Si l'une d'elles est bête, nous la changerons. Tu auras le droit d'en proposer une pour nous.<br><br>
Papa
`, '#ea580c');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-rcp-004-m1', chapterId:CH, difficulty:2, subsection:'narration',
    question:_P4 + 'Qui écrit ce courriel, et à qui ?',
    options:['Le père, à son fils.','La mère, à son fils.','Le fils, à son père.','Le fils, à sa tante.'],
    answer:'Le père, à son fils.',
    hint:'Lisez l’en-tête du courriel et la signature. (Read the header and the signature.)',
    explanation:'L’en-tête donne « <b>De :</b> Papa » et « <b>À :</b> Dhiren », et le message est signé « Papa ». La mère est seulement en copie (Cc). (Father to son.)' }),

  makeMCQ({ id:'g5fr-rcp-004-m2', chapterId:CH, difficulty:2, subsection:'reperage',
    question:_P4 + 'À partir de quelle heure le téléphone reste-t-il dans la cuisine ?',
    options:['à vingt heures','à dix-neuf heures','à vingt-deux heures','à vingt et une heures'],
    answer:'à vingt heures',
    hint:'L’heure est donnée dans la première règle. (The hour is in rule one.)',
    explanation:'« À partir de <b>vingt heures</b>, le téléphone dort dans la cuisine, dans le tiroir près du grille-pain. » (8 p.m.)' }),

  makeMCQ({ id:'g5fr-rcp-004-m3', chapterId:CH, difficulty:3, subsection:'idee_principale',
    question:_P4 + 'Quelle phrase résume le mieux ce courriel ?',
    options:['Des règles expliquées, non imposées.','Un cadeau retiré après une faute.','Une punition pour de mauvaises notes.','Une liste de courses pour la famille.'],
    answer:'Des règles expliquées, non imposées.',
    hint:'Comptez combien de fois le père donne une raison. (Count how often he gives a reason.)',
    explanation:'Chaque règle est suivie d’un « la raison est que… » ou d’un aveu, et le père annonce qu’on les relira dans un mois. « Ce n’est pas une punition, c’est un <b>apprentissage</b>. » (Rules with reasons.)' }),

  makeMCQ({ id:'g5fr-rcp-004-m4', chapterId:CH, difficulty:3, subsection:'inference',
    question:_P4 + 'Pourquoi le père dit-il que la troisième règle le gêne, lui, le plus ?',
    options:['Parce qu’il écrit trop vite, en colère.','Parce qu’il n’a pas de téléphone.','Parce qu’il ne sait pas écrire.','Parce qu’il travaille toute la nuit.'],
    answer:'Parce qu’il écrit trop vite, en colère.',
    hint:'Il fait un aveu juste après avoir annoncé la règle. (He admits something straight after.)',
    explanation:'« J’ai déjà envoyé des messages <b>en colère</b> que je n’aurais pas voulu relire le lendemain, encore moins à voix haute. » La règle le juge lui aussi. (The rule catches him too.)' }),

  makeMCQ({ id:'g5fr-rcp-004-m5', chapterId:CH, difficulty:3, subsection:'type_ton',
    question:_P4 + 'Quel est le ton de ce courriel ?',
    options:['ferme et affectueux','moqueur et distant','triste et découragé','furieux et menaçant'],
    answer:'ferme et affectueux',
    hint:'Les règles sont nettes, mais comment le père parle-t-il de lui-même ? (Firm rules — but how does he speak of himself ?)',
    explanation:'Les règles ne se discutent pas (« Il dort là, tous les soirs »), mais le père s’inclut, s’excuse presque et promet de les relire. Le ton est <b>ferme et affectueux</b>, jamais menaçant. (Firm, but warm.)' }),

  makeText({ id:'g5fr-rcp-004-o1', chapterId:CH, difficulty:3, subsection:'vocabulaire',
    question:_P4 + 'Dans le courriel, quel mot le père oppose-t-il à « punition » ? Écrivez un seul mot.',
    answer:'apprentissage', alsoAccept:['un apprentissage','l’apprentissage'],
    hint:'La phrase contient « ce n’est pas… c’est… ». (Look for "ce n’est pas… c’est…".)',
    explanation:'« Ce n’est pas une punition, c’est un <b>apprentissage</b>, et un apprentissage se fait avec des règles. » (Learning, not punishment.)' }),

  makeText({ id:'g5fr-rcp-004-o2', chapterId:CH, difficulty:2, subsection:'reperage',
    question:_P4 + 'Combien de règles le père donne-t-il ? Écrivez le nombre en lettres.',
    answer:'trois', alsoAccept:['3','trois règles'],
    hint:'Le nombre est annoncé avant les règles, puis répété à la fin. (Announced first, repeated at the end.)',
    explanation:'« Il y en aura <b>trois</b>. » Les paragraphes sont d’ailleurs numérotés Un, Deux, Trois. (Three rules.)' }),

  makeText({ id:'g5fr-rcp-004-o3', chapterId:CH, difficulty:2, subsection:'vrai_faux',
    question:_P4 + 'Vrai ou faux : les règles ne s’appliquent qu’à Dhiren. Répondez par « vrai » ou « faux ».',
    answer:'faux', alsoAccept:['fausse','c’est faux'],
    hint:'Relisez la fin du deuxième paragraphe. (Re-read the end of paragraph two.)',
    explanation:'Faux : « elles valent pour <b>toute la maison</b> », et le père ajoute que la troisième règle est celle qui le gêne le plus. (They apply to everyone.)' }),

  makeText({ id:'g5fr-rcp-004-o4', chapterId:CH, difficulty:3, subsection:'grammaire',
    question:_P4 + 'Dans « Tu auras le droit d’en proposer une », à quel temps le verbe « auras » est-il conjugué ? Écrivez un seul mot.',
    answer:'futur', alsoAccept:['futur simple','au futur'],
    hint:'La terminaison « -as » annonce ce qui n’est pas encore arrivé. (The -as ending points forward.)',
    explanation:'« tu aur-<b>as</b> » est au <b>futur</b> (futur simple) : la rencontre est prévue « dans un mois, le 30 du mois prochain ». (Future tense.)' }),

  makeText({ id:'g5fr-rcp-004-o5', chapterId:CH, difficulty:3, subsection:'figures_style',
    question:_P4 + 'Dans « Un téléphone est comme une porte ouverte sur la rue », quelle figure de style le père emploie-t-il ? Écrivez un ou deux mots.',
    answer:'comparaison', alsoAccept:['une comparaison','la comparaison'],
    hint:'Cherchez le petit mot outil qui relie le téléphone et la porte. (Find the link-word.)',
    explanation:'Le mot « <b>comme</b> » rapproche le téléphone et la porte : c’est une <b>comparaison</b>. Elle sert l’argument : « il laisse entrer autant qu’il laisse sortir ». (A simile.)' })
);

})();
