'use strict';
// Grade 6 French - Chapitre : Description d'Images
// IDs format: g6fr-img-NNN
//
// Niveau Grade 6 : au-delà du « qui / où / quoi », les questions portent sur
// le premier plan et l'arrière-plan, le champ lexical, le discours rapporté,
// l'hypothèse, l'intention de l'image et le plan de rédaction.
// La séquence « l'oiseau blessé » reprend celle du cahier d'entraînement
// (récit de 10 lignes).
//
// L'image unique est une PHOTOGRAPHIE réelle (Wikimedia Commons) : le rendu
// emoji d'origine ressemblait à du clipart et se décrivait mal. Les questions
// ont été écrites en regardant la photo.
//
// La séquence de trois images reste dessinée : il n'existe pas de série de
// photos libres montrant les mêmes personnages à trois moments d'une histoire.
//
// ⚠ alt et <title> restent génériques - ils ne doivent JAMAIS donner la réponse.
// ⚠ Photos sous licence CC BY / CC BY-SA : le crédit sous chaque image est une
//   obligation de la licence, pas une décoration. Ne pas le retirer.

function _g6imgSvg(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img"
    style="max-width:100%;max-height:300px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.15);background:#fff;margin:6px 0">
    <title>Image à décrire</title>${body}</svg>`;
}
function _g6imgEmoji(x, y, size, ch) {
  return `<text x="${x}" y="${y}" font-size="${size}" text-anchor="middle">${ch}</text>`;
}
function _g6imgPanel(x, n, skyFill, groundFill, inner) {
  return `<g transform="translate(${x},0)">
    <rect x="0" y="0" width="210" height="190" fill="${skyFill}" stroke="#475569" stroke-width="2" rx="8"/>
    <rect x="2" y="130" width="206" height="58" fill="${groundFill}"/>
    ${inner}
    <circle cx="20" cy="20" r="14" fill="#1e3a5f"/>
    <text x="20" y="26" font-size="17" font-weight="bold" fill="#fff" text-anchor="middle" font-family="sans-serif">${n}</text>
  </g>`;
}

// ── SCÈNE 1 : une seule image - la plantation d'arbres ────────────────
// Photographie réelle : le rendu emoji d'origine ressemblait à du clipart.
// Les questions ont été écrites en regardant la photo.
function _g6imgPhoto(file, credit) {
  return `<figure style="margin:6px 0">
    <img src="https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=900"
      alt="Une image à décrire" loading="lazy"
      style="width:100%;max-width:520px;height:auto;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.15)">
    <figcaption style="font-size:.68em;color:#94a3b8;margin-top:3px">${credit}</figcaption>
  </figure>`;
}

const _G6IMG_PLANTATION = _g6imgPhoto(
  'Children%20planting%20plants%20in%20Seychelles.jpg',
  'Photo : Joena Bonnelame, Seychelles News Agency, Wikimedia Commons, CC BY 4.0');

// ── SCÈNE 2 : trois images - l'oiseau blessé ──────────────────────────
const _G6IMG_OISEAU = _g6imgSvg(660, 190, `
  ${_g6imgPanel(0, 1, '#bfe4ff', '#86efac', `
    <circle cx="30" cy="30" r="16" fill="#fcd34d"/>
    <rect x="160" y="96" width="10" height="36" fill="#92400e"/>
    <circle cx="165" cy="82" r="24" fill="#16a34a"/>
    <rect x="20" y="116" width="56" height="7" fill="#a16207"/>
    <rect x="24" y="123" width="6" height="12" fill="#78350f"/>
    <rect x="66" y="123" width="6" height="12" fill="#78350f"/>
    ${_g6imgEmoji(112, 150, 32, '🧒')}
    ${_g6imgEmoji(150, 148, 32, '👩')}
    ${_g6imgEmoji(112, 176, 18, '🐦')}
  `)}
  ${_g6imgPanel(225, 2, '#fef3c7', '#d6d3d1', `
    <rect x="60" y="108" width="96" height="24" fill="#a16207"/>
    <rect x="78" y="86" width="46" height="24" rx="3" fill="#fde68a" stroke="#92400e" stroke-width="2"/>
    ${_g6imgEmoji(101, 104, 17, '🐦')}
    ${_g6imgEmoji(140, 104, 15, '💧')}
    ${_g6imgEmoji(60, 152, 32, '🧒')}
    ${_g6imgEmoji(150, 152, 32, '👩')}
  `)}
  ${_g6imgPanel(450, 3, '#bfe4ff', '#86efac', `
    <circle cx="30" cy="28" r="16" fill="#fcd34d"/>
    <rect x="160" y="96" width="10" height="36" fill="#92400e"/>
    <circle cx="165" cy="82" r="24" fill="#16a34a"/>
    ${_g6imgEmoji(112, 52, 20, '🐦')}
    <path d="M92 66 l8 -6 l8 6" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
    ${_g6imgEmoji(58, 152, 32, '🧒')}
    ${_g6imgEmoji(96, 150, 32, '👩')}
    ${_g6imgEmoji(132, 150, 24, '👋')}
  `)}
`);

const _G6IMG_C1 = `<div style="background:#eef2ff;border-left:4px solid #6366f1;border-radius:6px;padding:8px 12px;margin:6px 0;font-size:0.93em"><b>Observe l'image, puis réponds à la question.</b></div>`;
const _G6IMG_C3 = `<div style="background:#eef2ff;border-left:4px solid #6366f1;border-radius:6px;padding:8px 12px;margin:6px 0;font-size:0.93em"><b>Observe les trois images dans l'ordre, puis réponds à la question.</b></div>`;

STATIC_QUESTIONS.push(

  // ── IMAGE UNIQUE : la plantation ───────────────────────────────────
  makeMCQ({ id:`g6fr-img-001`, chapterId:`g6fr-images`, difficulty:1,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Que font les trois élèves ?`,
    options:[
      `Ils plantent un jeune arbre`,
      `Ils ramassent des déchets`,
      `Ils jouent au ballon`,
      `Ils balaient la cour`
    ],
    answer:`Ils plantent un jeune arbre`,
    hint:`Regarde le trou dans la terre et ce qui s'y trouve.`,
    explanation:`Un <b>jeune plant</b> aux larges feuilles vertes est posé dans un trou, et les élèves rebouchent autour : <b>ils plantent un arbre</b>. Sur une image d'examen, l'action principale se lit toujours au centre.` }),

  makeMCQ({ id:`g6fr-img-002`, chapterId:`g6fr-images`, difficulty:1,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Combien d'élèves y a-t-il au premier plan ?`,
    options:[`Trois`, `Deux`, `Cinq`, `Un seul`],
    answer:`Trois`,
    hint:`Ne compte que ceux qui sont penchés sur le trou, pas les personnes du fond.`,
    explanation:`<b>Trois élèves</b> sont penchés autour du trou. D'autres personnes apparaissent à l'arrière-plan, mais elles ne participent pas à l'action : il faut bien distinguer les deux plans.` }),

  makeMCQ({ id:`g6fr-img-003`, chapterId:`g6fr-images`, difficulty:2,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Comment sont habillés les élèves ?`,
    options:[
      `Ils portent un uniforme scolaire rose`,
      `Ils portent un maillot de bain`,
      `Ils portent un manteau d'hiver`,
      `Ils portent une tenue de sport bleue`
    ],
    answer:`Ils portent un uniforme scolaire rose`,
    hint:`Les trois enfants sont habillés de la même façon - c'est un indice.`,
    explanation:`Les trois enfants portent le même <b>uniforme rose à carreaux</b>, ce qui montre qu'ils viennent de la même école. Un vêtement identique sur plusieurs personnages est toujours une information à relever.` }),

  makeMCQ({ id:`g6fr-img-004`, chapterId:`g6fr-images`, difficulty:2,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Quel outil les élèves utilisent-ils ?`,
    options:[`Des pelles`, `Un marteau`, `Un arrosoir`, `Un râteau`],
    answer:`Des pelles`,
    hint:`Regarde ce que tiennent les deux élèves qui sont debout.`,
    explanation:`Deux élèves tiennent une <b>pelle</b> pour creuser et remettre la terre. Le champ lexical du jardinage - <i>planter, creuser, la pelle, la terre, le trou, les racines, le jeune plant</i> - est exactement ce qu'il faut réemployer.` }),

  makeMCQ({ id:`g6fr-img-005`, chapterId:`g6fr-images`, difficulty:2,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}De quelle couleur est la terre ?`,
    options:[`Rouge-orangé`, `Noire`, `Blanche comme du sable`, `Grise comme du béton`],
    answer:`Rouge-orangé`,
    hint:`Regarde autour du trou et sous les pieds des élèves.`,
    explanation:`La terre est <b>rouge-orangé</b>, typique des sols tropicaux. Nommer une couleur précise (« rouge-orangé » plutôt que « marron ») rend une description bien plus vivante.` }),

  makeMCQ({ id:`g6fr-img-006`, chapterId:`g6fr-images`, difficulty:3,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Qu'y a-t-il à l'ARRIÈRE-PLAN de l'image ?`,
    options:[
      `D'autres personnes, des bâtiments et des voitures`,
      `La mer et des bateaux`,
      `Une forêt épaisse et sombre`,
      `Rien du tout, le fond est vide`
    ],
    answer:`D'autres personnes, des bâtiments et des voitures`,
    hint:`L'arrière-plan, c'est tout ce qui est loin, derrière les élèves.`,
    explanation:`Au fond on distingue <b>d'autres personnes debout</b>, des <b>bâtiments</b> et des <b>voitures</b> : la plantation a lieu lors d'un événement collectif. Le correcteur attend ce vocabulaire : <b>au premier plan / au second plan / à l'arrière-plan</b>.` }),

  makeMCQ({ id:`g6fr-img-007`, chapterId:`g6fr-images`, difficulty:3,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Quel est le MESSAGE que cette image fait passer ?`,
    options:[
      `Les jeunes peuvent agir concrètement pour protéger l'environnement`,
      `Le jardinage est un métier difficile`,
      `Les écoles manquent de terrain de sport`,
      `Il faut arroser les plantes le matin`
    ],
    answer:`Les jeunes peuvent agir concrètement pour protéger l'environnement`,
    hint:`Qui agit sur l'image, et pour quel résultat à long terme ?`,
    explanation:`Ce sont des <b>élèves</b>, et non des adultes, qui plantent l'arbre : l'image montre que <b>les jeunes peuvent agir</b> pour l'environnement. Distinguer ce que l'image <i>montre</i> de ce qu'elle <i>veut dire</i> est une compétence attendue en Grade 6.` }),

  makeMCQ({ id:`g6fr-img-008`, chapterId:`g6fr-images`, difficulty:3,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Transforme au DISCOURS INDIRECT : L'enseignante dit : « Arrosez bien le jeune arbre. »`,
    options:[
      `L'enseignante leur demande d'arroser bien le jeune arbre.`,
      `L'enseignante dit qu'arrosez bien le jeune arbre.`,
      `L'enseignante demande : arrosez bien le jeune arbre.`,
      `L'enseignante a dit « d'arroser bien le jeune arbre ».`
    ],
    answer:`L'enseignante leur demande d'arroser bien le jeune arbre.`,
    hint:`Un ordre rapporté indirectement devient : demander DE + infinitif.`,
    explanation:`Un <b>impératif</b> rapporté au discours indirect devient <b>demander de + infinitif</b> : « Arrosez ! » → « elle leur <b>demande d'arroser</b> ». On supprime les guillemets et les deux-points, et on ne garde jamais la forme conjuguée de l'ordre.` }),

  makeMCQ({ id:`g6fr-img-009`, chapterId:`g6fr-images`, difficulty:4,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Quelle phrase exprime correctement une HYPOTHÈSE sur la suite ?`,
    options:[
      `Si chaque classe plante un arbre, la cour de l'école sera bientôt ombragée.`,
      `Si chaque classe planterait un arbre, la cour sera ombragée.`,
      `Si chaque classe plantera un arbre, la cour serait ombragée.`,
      `Si chaque classe plante un arbre, la cour serait-elle ombragée.`
    ],
    answer:`Si chaque classe plante un arbre, la cour de l'école sera bientôt ombragée.`,
    hint:`Après « si », on n'emploie jamais le futur ni le conditionnel.`,
    explanation:`L'hypothèse réalisable se construit <b>si + présent → futur simple</b> : « <b>Si</b> chaque classe <b>plante</b>…, la cour <b>sera</b>… ». Écrire « si… planterait » ou « si… plantera » est une faute classique : après <b>si</b>, pas de <i>-rais</i> ni de <i>-ra</i>.` }),

  makeMCQ({ id:`g6fr-img-010`, chapterId:`g6fr-images`, difficulty:4,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Tu dois rédiger dix lignes sur cette image. Quel plan te fera gagner le plus de points ?`,
    options:[
      `Situer la scène, décrire l'arrière-plan puis le premier plan, rapporter une parole, puis dire ce que l'image défend`,
      `Énumérer tous les objets visibles, un par ligne`,
      `Raconter une histoire qui n'a aucun rapport avec l'image`,
      `Décrire uniquement les couleurs, du plus clair au plus foncé`
    ],
    answer:`Situer la scène, décrire l'arrière-plan puis le premier plan, rapporter une parole, puis dire ce que l'image défend`,
    hint:`Un texte de Grade 6 doit à la fois décrire ET interpréter.`,
    explanation:`Le plan attendu combine <b>description organisée</b> (arrière-plan → premier plan), <b>vie</b> (une parole rapportée, un sentiment) et <b>interprétation</b> (le message de l'image). Une simple énumération d'objets reste au niveau du Grade 4 et plafonne la note.` }),

  // ── TROIS IMAGES : l'oiseau blessé ─────────────────────────────────
  makeMCQ({ id:`g6fr-img-011`, chapterId:`g6fr-images`, difficulty:1,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Que découvrent l'enfant et sa mère sur l'image 1 ?`,
    options:[
      `Un petit oiseau tombé par terre dans le parc`,
      `Un nid vide dans un arbre`,
      `Un chat endormi sous un banc`,
      `Un ballon perdu dans l'herbe`
    ],
    answer:`Un petit oiseau tombé par terre dans le parc`,
    hint:`Regarde ce qui se trouve au sol, aux pieds de l'enfant.`,
    explanation:`Sur l'image 1, dans un parc (banc, arbre, soleil), l'enfant et sa mère trouvent un <b>petit oiseau à terre</b>. C'est la <b>situation initiale</b> et, en même temps, l'<b>élément déclencheur</b> du récit.` }),

  makeMCQ({ id:`g6fr-img-012`, chapterId:`g6fr-images`, difficulty:2,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Que font les personnages sur l'image 2 ?`,
    options:[
      `Ils soignent l'oiseau à la maison et lui donnent de l'eau`,
      `Ils relâchent l'oiseau dans le jardin`,
      `Ils emmènent l'oiseau chez le vétérinaire`,
      `Ils construisent un nid dans l'arbre`
    ],
    answer:`Ils soignent l'oiseau à la maison et lui donnent de l'eau`,
    hint:`Le décor a changé : regarde la table, la boîte et la goutte d'eau.`,
    explanation:`Le décor est devenu un <b>intérieur</b> : l'oiseau est installé dans une boîte sur la table, avec de l'<b>eau</b> à côté. L'image 2 correspond aux <b>péripéties</b> : ce que les personnages font pour résoudre le problème.` }),

  makeMCQ({ id:`g6fr-img-013`, chapterId:`g6fr-images`, difficulty:2,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Comment se termine l'histoire ?`,
    options:[
      `L'oiseau guéri s'envole et la famille lui fait au revoir`,
      `L'oiseau reste dans sa boîte pour toujours`,
      `La famille offre l'oiseau à un voisin`,
      `L'oiseau s'échappe pendant la nuit`
    ],
    answer:`L'oiseau guéri s'envole et la famille lui fait au revoir`,
    hint:`Sur l'image 3, où se trouve l'oiseau, et que fait la main levée ?`,
    explanation:`Sur l'image 3, on est de retour dehors : l'oiseau <b>vole dans le ciel</b> et la famille <b>fait au revoir</b> de la main. C'est la <b>situation finale</b> : le problème est résolu et la situation a changé pour de bon.` }),

  makeMCQ({ id:`g6fr-img-014`, chapterId:`g6fr-images`, difficulty:2,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Quel changement de LIEU se produit entre les trois images ?`,
    options:[
      `Le parc, puis la maison, puis de nouveau l'extérieur`,
      `L'école, puis le marché, puis la plage`,
      `La maison, puis la maison, puis la maison`,
      `Aucun : les trois images se passent au même endroit`
    ],
    answer:`Le parc, puis la maison, puis de nouveau l'extérieur`,
    hint:`Compare la couleur du sol et le décor de chaque vignette.`,
    explanation:`Le récit se déplace : <b>parc → maison → extérieur</b>. Signaler ces changements avec des compléments de lieu (« <i>de retour à la maison</i> », « <i>le lendemain, dans le jardin</i> ») rend le texte beaucoup plus clair.` }),

  makeMCQ({ id:`g6fr-img-015`, chapterId:`g6fr-images`, difficulty:3,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Quelle phrase mélange correctement l'IMPARFAIT et le PASSÉ COMPOSÉ ?`,
    options:[
      `Nous nous promenions dans le parc quand mon fils a aperçu un oiseau blessé.`,
      `Nous nous sommes promenés dans le parc quand mon fils apercevait un oiseau blessé.`,
      `Nous nous promenions dans le parc quand mon fils apercevait un oiseau blessé.`,
      `Nous nous sommes promenés dans le parc quand mon fils a aperçu un oiseau blessé.`
    ],
    answer:`Nous nous promenions dans le parc quand mon fils a aperçu un oiseau blessé.`,
    hint:`L'action longue qui sert de décor va à l'imparfait ; l'événement bref qui la coupe va au passé composé.`,
    explanation:`L'<b>imparfait</b> plante le décor qui dure (« nous nous <b>promenions</b> ») et le <b>passé composé</b> marque l'événement bref qui l'interrompt (« il <b>a aperçu</b> »). C'est la règle des deux plans du récit : <i>arrière-plan à l'imparfait, premier plan au passé composé</i>.` }),

  makeMCQ({ id:`g6fr-img-016`, chapterId:`g6fr-images`, difficulty:3,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Quelle phrase ajoute un SENTIMENT que les images ne montrent pas directement ?`,
    options:[
      `Mon fils s'est agenouillé, le cœur serré, devant le petit corps immobile.`,
      `Il y a un oiseau par terre.`,
      `La table est en bois.`,
      `L'arbre est vert.`
    ],
    answer:`Mon fils s'est agenouillé, le cœur serré, devant le petit corps immobile.`,
    hint:`Cherche l'expression qui décrit une émotion, pas un objet.`,
    explanation:`« <b>le cœur serré</b> » exprime une <b>émotion</b>, que le dessin ne peut pas montrer. Les images donnent les actions ; c'est à l'auteur d'ajouter les sentiments, les pensées et les sensations - c'est ce qui distingue un récit d'une simple légende d'image.` }),

  makeMCQ({ id:`g6fr-img-017`, chapterId:`g6fr-images`, difficulty:3,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Quelle est la MORALE de cette histoire ?`,
    options:[
      `Prendre soin des animaux, même les plus petits, est une belle action`,
      `Il ne faut jamais aller au parc en famille`,
      `Les oiseaux blessés doivent rester en cage`,
      `Il vaut mieux ne pas s'occuper de ce qui ne nous regarde pas`
    ],
    answer:`Prendre soin des animaux, même les plus petits, est une belle action`,
    hint:`Que gagnent les personnages à la fin, et qu'ont-ils fait pour cela ?`,
    explanation:`La famille prend soin d'un oiseau fragile, et l'histoire se termine sur sa <b>liberté retrouvée</b> : la morale est qu'il faut <b>protéger les animaux</b>. Une bonne conclusion de récit peut énoncer cette leçon en une phrase, sans la répéter trois fois.` }),

  makeTF({ id:`g6fr-img-018`, chapterId:`g6fr-images`, difficulty:2,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Dans un récit à partir d'images, il est permis d'inventer des détails qui ne sont pas dessinés, à condition qu'ils restent cohérents avec l'histoire.`,
    answer:true,
    hint:`Pense aux prénoms, aux paroles et aux sentiments des personnages.`,
    explanation:`<b>Vrai.</b> On attend même que tu inventes : des <b>prénoms</b>, des <b>paroles</b>, des <b>sentiments</b>, un <b>moment de la journée</b>. La seule règle est la <b>cohérence</b> : rien ne doit contredire ce que montrent les images.` }),

  makeMCQ({ id:`g6fr-img-019`, chapterId:`g6fr-images`, difficulty:4,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Tu dois écrire le récit à la première personne, du point de vue de la MÈRE. Quelle ouverture convient ?`,
    options:[
      `Ce dimanche-là, j'avais emmené mon fils au parc pour profiter du beau temps.`,
      `Ce dimanche-là, le garçon et sa mère sont allés au parc.`,
      `Ce dimanche-là, j'étais un petit oiseau tombé de mon nid.`,
      `Ce dimanche-là, la mère a décidé d'aller au parc avec son fils.`
    ],
    answer:`Ce dimanche-là, j'avais emmené mon fils au parc pour profiter du beau temps.`,
    hint:`À la première personne, la mère dit « je » et parle de « mon fils ».`,
    explanation:`Du point de vue de la mère, il faut « <b>je</b> » et « <b>mon fils</b> ». Les propositions 2 et 4 sont à la <b>troisième personne</b> ; la 3 adopte le point de vue de l'oiseau, ce qui n'est pas ce qui est demandé. Choisir le bon <b>narrateur</b> et s'y tenir jusqu'au bout est essentiel.` }),

  makeMCQ({ id:`g6fr-img-020`, chapterId:`g6fr-images`, difficulty:4,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Ton récit doit faire dix lignes. Comment répartis-tu le mieux ton texte ?`,
    options:[
      `Deux lignes d'introduction, puis trois lignes par image, en respectant l'ordre`,
      `Neuf lignes sur l'image 1 et une ligne pour les deux autres`,
      `Dix lignes de description du parc, sans raconter la suite`,
      `Trois lignes par image, dans l'ordre 3, 1, 2, pour créer le suspense`
    ],
    answer:`Deux lignes d'introduction, puis trois lignes par image, en respectant l'ordre`,
    hint:`Chaque image est une étape du récit et mérite une place équivalente.`,
    explanation:`Une <b>courte introduction</b> (le moment, le lieu, les personnages) puis <b>trois lignes par image</b> donne un texte équilibré de dix lignes. Traiter une seule image, ou bouleverser l'ordre 1-2-3, fait perdre des points même si la langue est correcte.` }),

);
