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
// SVG en ligne plutôt que photos : pas de 404, fonctionne hors ligne dans la
// PWA, contenu connu exactement. Pas de <title> descriptif : il révélerait
// les réponses.

function _g6imgSvg(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img"
    style="max-width:100%;max-height:300px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.15);background:#fff;margin:6px 0">
    <title>Image à décrire</title>${body}</svg>`;
}
function _g6imgEmoji(x, y, size, ch) {
  return `<text x="${x}" y="${y}" font-size="${size}" text-anchor="middle">${ch}</text>`;
}
function _g6imgLabel(x, y, txt, size, colour, weight) {
  return `<text x="${x}" y="${y}" font-size="${size || 11}" font-family="sans-serif"
    font-weight="${weight || 'normal'}" fill="${colour || '#1e293b'}" text-anchor="middle">${txt}</text>`;
}
function _g6imgSapling(x, groundY) {
  return `<line x1="${x}" y1="${groundY}" x2="${x}" y2="${groundY - 26}" stroke="#78350f" stroke-width="3"/>
    <polygon points="${x},${groundY - 26} ${x - 13},${groundY - 33} ${x - 2},${groundY - 40}" fill="#16a34a"/>
    <polygon points="${x},${groundY - 26} ${x + 13},${groundY - 33} ${x + 2},${groundY - 40}" fill="#22c55e"/>
    <ellipse cx="${x}" cy="${groundY}" rx="14" ry="5" fill="#78350f"/>`;
}
function _g6imgWateringCan(x, y) {
  return `<rect x="${x}" y="${y}" width="26" height="20" rx="3" fill="#38bdf8" stroke="#0369a1"/>
    <polygon points="${x + 26},${y + 4} ${x + 42},${y - 6} ${x + 42},${y - 1} ${x + 26},${y + 10}" fill="#38bdf8" stroke="#0369a1"/>
    <path d="M${x + 4} ${y} q9 -12 18 0" fill="none" stroke="#0369a1" stroke-width="2.5"/>`;
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

// ── SCÈNE 1 : une seule image - la journée de l'environnement ─────────
const _G6IMG_PLANTATION = _g6imgSvg(400, 240, `
  <rect x="0" y="0" width="400" height="152" fill="#bfe4ff"/>
  <circle cx="360" cy="34" r="20" fill="#fcd34d"/>
  <path d="M96 44 l7 -5 l7 5" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
  <path d="M128 34 l7 -5 l7 5" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
  <rect x="248" y="72" width="130" height="80" fill="#fed7aa" stroke="#9a3412" stroke-width="2"/>
  <polygon points="240,72 313,42 386,72" fill="#9a3412"/>
  <rect x="264" y="92" width="20" height="20" fill="#bfdbfe" stroke="#9a3412"/>
  <rect x="300" y="92" width="20" height="20" fill="#bfdbfe" stroke="#9a3412"/>
  <rect x="336" y="92" width="20" height="20" fill="#bfdbfe" stroke="#9a3412"/>
  <rect x="300" y="124" width="22" height="28" fill="#7c2d12"/>
  <rect x="20" y="18" width="200" height="34" rx="5" fill="#fff" stroke="#15803d" stroke-width="3"/>
  ${_g6imgLabel(120, 33, "JOURNÉE DE L'ENVIRONNEMENT", 11, '#15803d', 'bold')}
  ${_g6imgLabel(120, 46, 'Plantons 50 arbres !', 10, '#15803d')}
  <rect x="0" y="152" width="400" height="88" fill="#86efac"/>
  ${_g6imgSapling(74, 206)}
  ${_g6imgSapling(150, 206)}
  ${_g6imgSapling(226, 206)}
  <line x1="196" y1="212" x2="212" y2="168" stroke="#78350f" stroke-width="4"/>
  <polygon points="210,164 220,164 218,178 208,178" fill="#94a3b8" stroke="#475569"/>
  ${_g6imgWateringCan(258, 196)}
  ${_g6imgEmoji(50, 206, 34, '🧒')}
  ${_g6imgEmoji(120, 200, 34, '🧒')}
  ${_g6imgEmoji(196, 232, 30, '🧒')}
  ${_g6imgEmoji(330, 208, 36, '👩')}
`);

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
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Quel événement cette image représente-t-elle ?`,
    options:[
      `Une journée de l'environnement dans une école`,
      `Une compétition sportive`,
      `Une visite au jardin botanique`,
      `Une kermesse de fin d'année`
    ],
    answer:`Une journée de l'environnement dans une école`,
    hint:`Lis la banderole en haut de l'image.`,
    explanation:`La banderole annonce « <b>JOURNÉE DE L'ENVIRONNEMENT - Plantons 50 arbres !</b> » et l'on voit des élèves planter devant un bâtiment scolaire. Sur une image d'examen, <b>tout texte affiché</b> (banderole, panneau, enseigne) est une information à exploiter.` }),

  makeMCQ({ id:`g6fr-img-002`, chapterId:`g6fr-images`, difficulty:1,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Combien de jeunes arbres ont déjà été plantés ?`,
    options:[`Trois`, `Deux`, `Cinquante`, `Aucun`],
    answer:`Trois`,
    hint:`Compte les petits arbres en terre, pas le nombre écrit sur la banderole.`,
    explanation:`On voit <b>trois jeunes arbres</b> déjà en terre. Attention au piège : « 50 arbres » est l'<b>objectif</b> annoncé sur la banderole, pas ce qui est réellement planté sur l'image. Ne confonds jamais ce qui est <i>écrit</i> avec ce qui est <i>montré</i>.` }),

  makeMCQ({ id:`g6fr-img-003`, chapterId:`g6fr-images`, difficulty:2,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Qu'y a-t-il à l'ARRIÈRE-PLAN de l'image ?`,
    options:[
      `Le bâtiment de l'école et le ciel`,
      `L'arrosoir et la pelle`,
      `Les trois jeunes arbres`,
      `Les élèves qui plantent`
    ],
    answer:`Le bâtiment de l'école et le ciel`,
    hint:`L'arrière-plan, c'est ce qui est loin, tout au fond.`,
    explanation:`À l'<b>arrière-plan</b> on trouve le <b>bâtiment de l'école</b>, le ciel et les oiseaux. Les élèves, les outils et les arbres sont au <b>premier plan</b>. Un correcteur attend ce vocabulaire : <b>au premier plan / au second plan / à l'arrière-plan</b>.` }),

  makeMCQ({ id:`g6fr-img-004`, chapterId:`g6fr-images`, difficulty:2,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Quels outils voit-on sur l'image ?`,
    options:[
      `Une pelle et un arrosoir`,
      `Un marteau et une scie`,
      `Une brouette et un râteau`,
      `Une balance et un panier`
    ],
    answer:`Une pelle et un arrosoir`,
    hint:`Cherche l'objet planté en terre près d'un arbre, et l'objet bleu à bec.`,
    explanation:`On distingue une <b>pelle</b> plantée dans la terre et un <b>arrosoir</b> bleu posé au sol. Le champ lexical du jardinage - <i>planter, creuser, arroser, la pelle, l'arrosoir, la terre, le jeune plant</i> - est exactement ce qu'il faut réemployer dans la description.` }),

  makeMCQ({ id:`g6fr-img-005`, chapterId:`g6fr-images`, difficulty:3,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Quels mots appartiennent au CHAMP LEXICAL de cette image ?`,
    options:[
      `planter, arroser, creuser, la terre, l'arrosoir`,
      `naviguer, l'ancre, la voile, le port`,
      `additionner, la fraction, le quotient`,
      `guérir, l'ordonnance, l'infirmière`
    ],
    answer:`planter, arroser, creuser, la terre, l'arrosoir`,
    hint:`Un champ lexical regroupe tous les mots liés à un même thème.`,
    explanation:`Un <b>champ lexical</b> réunit les mots d'un même thème. Ici, le thème est la <b>plantation</b> : <i>planter, arroser, creuser, la terre, l'arrosoir, le jeune plant, les racines</i>. Utiliser le bon champ lexical est ce qui rend une description précise plutôt que vague.` }),

  makeMCQ({ id:`g6fr-img-006`, chapterId:`g6fr-images`, difficulty:3,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Quel est le MESSAGE que cette image cherche à faire passer ?`,
    options:[
      `Les jeunes peuvent agir concrètement pour protéger l'environnement`,
      `Le jardinage est un métier difficile`,
      `Les écoles manquent de terrain de sport`,
      `Il faut arroser les plantes le matin`
    ],
    answer:`Les jeunes peuvent agir concrètement pour protéger l'environnement`,
    hint:`Qui agit sur l'image, et pour quel objectif annoncé ?`,
    explanation:`Ce sont des <b>élèves</b>, encadrés par une enseignante, qui plantent des arbres sous une banderole écologique : l'image montre que <b>les jeunes peuvent agir</b> pour l'environnement. Distinguer ce que l'image <i>montre</i> de ce qu'elle <i>veut dire</i> est une compétence attendue en Grade 6.` }),

  makeMCQ({ id:`g6fr-img-007`, chapterId:`g6fr-images`, difficulty:3,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Transforme au DISCOURS INDIRECT : L'enseignante dit : « Arrosez bien les jeunes arbres. »`,
    options:[
      `L'enseignante leur demande d'arroser bien les jeunes arbres.`,
      `L'enseignante dit qu'arrosez bien les jeunes arbres.`,
      `L'enseignante demande : arrosez bien les jeunes arbres.`,
      `L'enseignante a dit « d'arroser bien les jeunes arbres ».`
    ],
    answer:`L'enseignante leur demande d'arroser bien les jeunes arbres.`,
    hint:`Un ordre rapporté indirectement devient : demander DE + infinitif.`,
    explanation:`Un <b>impératif</b> rapporté au discours indirect devient <b>demander de + infinitif</b> : « Arrosez ! » → « elle leur <b>demande d'arroser</b> ». On supprime les guillemets et les deux-points, et on ne garde jamais la forme conjuguée de l'ordre.` }),

  makeMCQ({ id:`g6fr-img-008`, chapterId:`g6fr-images`, difficulty:4,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Quelle phrase exprime correctement une HYPOTHÈSE sur la suite ?`,
    options:[
      `Si chaque classe plante trois arbres, l'école atteindra son objectif de cinquante arbres.`,
      `Si chaque classe planterait trois arbres, l'école atteindra son objectif.`,
      `Si chaque classe plantera trois arbres, l'école atteindrait son objectif.`,
      `Si chaque classe plante trois arbres, l'école atteindrait-elle son objectif.`
    ],
    answer:`Si chaque classe plante trois arbres, l'école atteindra son objectif de cinquante arbres.`,
    hint:`Après « si », on n'emploie jamais le futur ni le conditionnel.`,
    explanation:`L'hypothèse réalisable se construit <b>si + présent → futur simple</b> : « <b>Si</b> chaque classe <b>plante</b>…, l'école <b>atteindra</b>… ». Écrire « si… planterait » ou « si… plantera » est une faute classique : après <b>si</b>, pas de <i>-rais</i> ni de <i>-ra</i>.` }),

  makeMCQ({ id:`g6fr-img-009`, chapterId:`g6fr-images`, difficulty:4,
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
  makeMCQ({ id:`g6fr-img-010`, chapterId:`g6fr-images`, difficulty:1,
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

  makeMCQ({ id:`g6fr-img-011`, chapterId:`g6fr-images`, difficulty:2,
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

  makeMCQ({ id:`g6fr-img-012`, chapterId:`g6fr-images`, difficulty:2,
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

  makeMCQ({ id:`g6fr-img-013`, chapterId:`g6fr-images`, difficulty:2,
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

  makeMCQ({ id:`g6fr-img-014`, chapterId:`g6fr-images`, difficulty:3,
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

  makeMCQ({ id:`g6fr-img-015`, chapterId:`g6fr-images`, difficulty:3,
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

  makeMCQ({ id:`g6fr-img-016`, chapterId:`g6fr-images`, difficulty:3,
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

  makeTF({ id:`g6fr-img-017`, chapterId:`g6fr-images`, difficulty:2,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Dans un récit à partir d'images, il est permis d'inventer des détails qui ne sont pas dessinés, à condition qu'ils restent cohérents avec l'histoire.`,
    answer:true,
    hint:`Pense aux prénoms, aux paroles et aux sentiments des personnages.`,
    explanation:`<b>Vrai.</b> On attend même que tu inventes : des <b>prénoms</b>, des <b>paroles</b>, des <b>sentiments</b>, un <b>moment de la journée</b>. La seule règle est la <b>cohérence</b> : rien ne doit contredire ce que montrent les images.` }),

  makeMCQ({ id:`g6fr-img-018`, chapterId:`g6fr-images`, difficulty:4,
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

  makeMCQ({ id:`g6fr-img-019`, chapterId:`g6fr-images`, difficulty:4,
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
