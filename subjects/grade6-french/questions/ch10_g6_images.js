'use strict';
// Grade 6 French - Chapitre : Description d\'Images
// IDs format: g6fr-img-NNN
//
// Niveau Grade 6 : au-delà du « qui / où / quoi », les questions portent sur
// le premier plan et l\'arrière-plan, le champ lexical, le discours rapporté,
// l\'hypothèse, l\'intention de l\'image et le plan de rédaction.
// La séquence « l\'oiseau blessé » reprend celle du cahier d\'entraînement
// (récit de 10 lignes).
//
// L\'image unique est une PHOTOGRAPHIE réelle (Wikimedia Commons) : le rendu
// emoji d\'origine ressemblait à du clipart et se décrivait mal. Les questions
// ont été écrites en regardant la photo.
//
// La séquence de trois images reste dessinée : il n\'existe pas de série de
// photos libres montrant les mêmes personnages à trois moments d\'une histoire.
//
// ⚠ alt et <title> restent génériques - ils ne doivent JAMAIS donner la réponse.
// ⚠ Photos sous licence CC BY / CC BY-SA : le crédit sous chaque image est une
//   obligation de la licence, pas une décoration. Ne pas le retirer.

// ⚠ La séquence de trois images est UNE GRILLE DE TROIS SVG SÉPARÉS, pas un
//   seul dessin large. L'ancienne version était un unique svg de 660 unités de
//   large : sur un téléphone les trois cases tombaient à ~110 px chacune, les
//   personnages à ~19 px, et la troisième case sortait carrément de l'écran.
//   Un enfant ne pouvait donc pas répondre aux questions sur l'image 3.
//   La grille auto-fit empile les cases sur un téléphone (chacune prend toute
//   la largeur) et les remet côte à côte dès qu'il y a la place.
// ⚠ Les personnages sont un CORPS DESSINÉ surmonté d'un émoji de VISAGE.
//   Les émojis de personne (🧒 👩 👨) sont des têtes seules dans Noto : posés
//   sur l'herbe ils ressemblaient à des têtes coupées. Un visage sur un corps
//   dessiné se lit comme un personnage debout, et l'émotion reste lisible.
//   La couleur du tee-shirt identifie le personnage d'une case à l'autre.
function _g6imgEmoji(x, y, size, ch) {
  return `<text x="${x}" y="${y}" font-size="${size}" text-anchor="middle">${ch}</text>`;
}
// wave = bras droit levé. C'est ce qui montre l'au revoir de l'image 3 sans
// poser une main émoji flottante à côté du personnage.
function _g6imgPerson(x, feetY, shirt, face, scale, wave) {
  const k = scale || 1;
  const legH = 12 * k, torsoH = 21 * k, torsoW = 30 * k, head = 27 * k;
  const torsoY = feetY - legH - torsoH;
  const armR = wave
    ? `<rect x="${x + torsoW / 2}" y="${torsoY + 3 * k}" width="${5 * k}" height="${15 * k}" rx="${2.5 * k}"
        fill="${shirt}" transform="rotate(-150 ${x + torsoW / 2} ${torsoY + 3 * k})"/>`
    : `<rect x="${x + torsoW / 2}" y="${torsoY + 3 * k}" width="${5 * k}" height="${13 * k}" rx="${2.5 * k}" fill="${shirt}"/>`;
  return `<rect x="${x - 10 * k}" y="${feetY - legH}" width="${7 * k}" height="${legH}" fill="#374151" rx="2"/>
    <rect x="${x + 3 * k}" y="${feetY - legH}" width="${7 * k}" height="${legH}" fill="#374151" rx="2"/>
    <rect x="${x - torsoW / 2}" y="${torsoY}" width="${torsoW}" height="${torsoH}" rx="${8 * k}" fill="${shirt}"/>
    <rect x="${x - torsoW / 2 - 5 * k}" y="${torsoY + 3 * k}" width="${5 * k}" height="${13 * k}" rx="${2.5 * k}" fill="${shirt}"/>
    ${armR}
    ${_g6imgEmoji(x, torsoY + 4 * k, head, face)}`;
}
function _g6imgTree(x) {
  return `<rect x="${x - 7}" y="80" width="14" height="42" fill="#92400e" rx="2"/>
    <circle cx="${x}" cy="64" r="28" fill="#16a34a"/>
    <circle cx="${x - 20}" cy="76" r="19" fill="#22c55e"/>
    <circle cx="${x + 20}" cy="76" r="19" fill="#15803d"/>`;
}
function _g6imgBench(x, seatY) {
  return `<rect x="${x}" y="${seatY}" width="62" height="8" rx="2" fill="#a16207"/>
    <rect x="${x}" y="${seatY - 14}" width="62" height="6" rx="2" fill="#a16207"/>
    <rect x="${x + 4}" y="${seatY + 8}" width="6" height="18" fill="#78350f"/>
    <rect x="${x + 52}" y="${seatY + 8}" width="6" height="18" fill="#78350f"/>`;
}
// ⚠ Le sol est un path, pas un rect : un rect à angles droits dépasse des
//   coins arrondis du cadre. Et pas de clipPath : il faudrait un id, or
//   plusieurs figures peuvent coexister dans la même page.
function _g6imgPanel(n, sky, ground, inner) {
  return `<svg viewBox="0 0 200 170" role="img" preserveAspectRatio="xMidYMid meet"
    style="width:100%;height:auto;display:block;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.15)">
    <title>Image ${n}</title>
    <rect x="1" y="1" width="198" height="168" rx="10" fill="${sky}" stroke="#475569" stroke-width="2"/>
    <path d="M3,120 H197 V159 A8,8 0 0 1 189,167 H11 A8,8 0 0 1 3,159 Z" fill="${ground}"/>
    ${inner}
    <circle cx="24" cy="24" r="16" fill="#1e3a5f"/>
    <text x="24" y="31" font-size="19" font-weight="bold" fill="#fff" text-anchor="middle" font-family="sans-serif">${n}</text>
  </svg>`;
}
function _g6imgStrip(panels) {
  return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));
    gap:8px;margin:8px 0;max-width:680px">${panels.join('')}</div>`;
}

// ── SCÈNE 1 : une seule image - la plantation d\'arbres ────────────────
// Photographie réelle : le rendu emoji d\'origine ressemblait à du clipart.
// Les questions ont été écrites en regardant la photo.
function _g6imgPhoto(file, credit) {
  return `<figure style="margin:6px 0">
    <img src="assets/questions/${file}"
      alt="Une image à décrire" loading="lazy"
      style="width:100%;max-width:520px;height:auto;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.15)">
    <figcaption style="font-size:.68em;color:#94a3b8;margin-top:3px">${credit}</figcaption>
  </figure>`;
}

const _G6IMG_PLANTATION = _g6imgPhoto(
  'scene-plantation.jpg',
  'Photo : Joena Bonnelame, Seychelles News Agency, Wikimedia Commons, CC BY 4.0');

// ── SCÈNE 2 : trois images - l'oiseau blessé ──────────────────────────
// Le récit change de LIEU à chaque case (parc, maison, extérieur) : c'est ce
// que demande g6fr-img-014, donc le décor de chaque case doit être reconnu
// sans légende. Les cases doivent répondre seules à g6fr-img-011 à 020 :
//   1 au parc, l'enfant et sa mère découvrent un oiseau tombé par terre
//   2 à la maison, ils le soignent dans une boîte et lui donnent de l'eau
//   3 dehors, l'oiseau guéri s'envole et ils lui disent au revoir
const _G6IMG_KID = '#f59e0b';
const _G6IMG_MUM = '#be123c';
const _G6IMG_OISEAU = _g6imgStrip([
  _g6imgPanel(1, '#bfe4ff', '#86efac', `
    <circle cx="30" cy="28" r="15" fill="#fcd34d"/>
    ${_g6imgTree(166)}
    ${_g6imgBench(8, 126)}
    ${_g6imgPerson(94, 150, _G6IMG_KID, '😯', 0.85)}
    ${_g6imgPerson(128, 152, _G6IMG_MUM, '🙁')}
    ${_g6imgEmoji(163, 158, 26, '🐦')}
  `),
  _g6imgPanel(2, '#fef3c7', '#d6d3d1', `
    <rect x="128" y="26" width="44" height="34" fill="#bfdbfe" stroke="#94a3b8" stroke-width="2"/>
    <line x1="150" y1="26" x2="150" y2="60" stroke="#94a3b8" stroke-width="2"/>
    <rect x="40" y="98" width="120" height="10" rx="2" fill="#a16207"/>
    <rect x="50" y="108" width="8" height="34" fill="#78350f"/>
    <rect x="142" y="108" width="8" height="34" fill="#78350f"/>
    <rect x="56" y="72" width="52" height="26" rx="3" fill="#fde68a" stroke="#92400e" stroke-width="2"/>
    <rect x="56" y="72" width="52" height="7" fill="#fbbf24" stroke="#92400e" stroke-width="2"/>
    ${_g6imgEmoji(82, 96, 20, '🐦')}
    <ellipse cx="132" cy="93" rx="13" ry="6" fill="#7dd3fc" stroke="#0369a1" stroke-width="2"/>
    <path d="M119,93 a13,6 0 0 0 26,0 l-2,5 a11,5 0 0 1 -22,0 Z" fill="#0284c7"/>
    ${_g6imgPerson(24, 152, _G6IMG_KID, '🙂', 0.8)}
    ${_g6imgPerson(176, 152, _G6IMG_MUM, '🙂', 0.85)}
  `),
  _g6imgPanel(3, '#bfe4ff', '#86efac', `
    <circle cx="30" cy="28" r="15" fill="#fcd34d"/>
    ${_g6imgTree(166)}
    ${_g6imgEmoji(112, 52, 28, '🐦')}
    <path d="M84,46 q8,-7 16,0" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
    <path d="M80,58 q8,-7 16,0" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
    ${_g6imgPerson(56, 152, _G6IMG_KID, '😀', 0.85, true)}
    ${_g6imgPerson(96, 152, _G6IMG_MUM, '😀', 1, true)}
  `)
]);

const _G6IMG_C1 = `<div style="background:#eef2ff;border-left:4px solid #6366f1;border-radius:6px;padding:8px 12px;margin:6px 0;font-size:0.93em"><b>Observe l\'image, puis réponds à la question.</b></div>`;
const _G6IMG_C3 = `<div style="background:#eef2ff;border-left:4px solid #6366f1;border-radius:6px;padding:8px 12px;margin:6px 0;font-size:0.93em"><b>Observe les trois images dans l\'ordre, puis réponds à la question.</b></div>`;

STATIC_QUESTIONS.push(

  // ── IMAGE UNIQUE : la plantation ───────────────────────────────────
  makeMCQ({ id:`g6fr-img-001`, chapterId:'g6fr-images', subsection:'une_image', difficulty:1,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Que font les trois élèves ?`,
    options:[
      `Ils plantent un jeune arbre`,
      `Ils ramassent des déchets`,
      `Ils jouent au ballon`,
      `Ils balaient la cour`
    ],
    answer:`Ils plantent un jeune arbre`,
    hint:`Regarde le trou dans la terre et ce qui s\'y trouve.`,
    explanation:`Un <b>jeune plant</b> aux larges feuilles vertes est posé dans un trou, et les élèves rebouchent autour : <b>ils plantent un arbre</b>. Sur une image d\'examen, l\'action principale se lit toujours au centre.` }),

  makeMCQ({ id:`g6fr-img-002`, chapterId:'g6fr-images', subsection:'une_image', difficulty:1,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Combien d\'élèves y a-t-il au premier plan ?`,
    options:[`Trois`, `Deux`, `Cinq`, `Un seul`],
    answer:`Trois`,
    hint:`Ne compte que ceux qui sont penchés sur le trou, pas les personnes du fond.`,
    explanation:`<b>Trois élèves</b> sont penchés autour du trou. D\'autres personnes apparaissent à l\'arrière-plan, mais elles ne participent pas à l\'action : il faut bien distinguer les deux plans.` }),

  makeMCQ({ id:`g6fr-img-003`, chapterId:'g6fr-images', subsection:'une_image', difficulty:2,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Comment sont habillés les élèves ?`,
    options:[
      `Ils portent un uniforme scolaire rose`,
      `Ils portent un maillot de bain`,
      `Ils portent un manteau d\'hiver`,
      `Ils portent une tenue de sport bleue`
    ],
    answer:`Ils portent un uniforme scolaire rose`,
    hint:`Les trois enfants sont habillés de la même façon - c\'est un indice.`,
    explanation:`Les trois enfants portent le même <b>uniforme rose à carreaux</b>, ce qui montre qu\'ils viennent de la même école. Un vêtement identique sur plusieurs personnages est toujours une information à relever.` }),

  makeMCQ({ id:`g6fr-img-004`, chapterId:'g6fr-images', subsection:'une_image', difficulty:2,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Quel outil les élèves utilisent-ils ?`,
    options:[`Des pelles`, `Un marteau`, `Un arrosoir`, `Un râteau`],
    answer:`Des pelles`,
    hint:`Regarde ce que tiennent les deux élèves qui sont debout.`,
    explanation:`Deux élèves tiennent une <b>pelle</b> pour creuser et remettre la terre. Le champ lexical du jardinage - <i>planter, creuser, la pelle, la terre, le trou, les racines, le jeune plant</i> - est exactement ce qu\'il faut réemployer.` }),

  makeMCQ({ id:`g6fr-img-005`, chapterId:'g6fr-images', subsection:'une_image', difficulty:2,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}De quelle couleur est la terre ?`,
    options:[`Rouge-orangé`, `Noire`, `Blanche comme du sable`, `Grise comme du béton`],
    answer:`Rouge-orangé`,
    hint:`Regarde autour du trou et sous les pieds des élèves.`,
    explanation:`La terre est <b>rouge-orangé</b>, typique des sols tropicaux. Nommer une couleur précise (« rouge-orangé » plutôt que « marron ») rend une description bien plus vivante.` }),

  makeMCQ({ id:`g6fr-img-006`, chapterId:'g6fr-images', subsection:'une_image', difficulty:3,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Qu\'y a-t-il à l\'ARRIÈRE-PLAN de l\'image ?`,
    options:[
      `D\'autres personnes, des bâtiments et des voitures`,
      `La mer et des bateaux`,
      `Une forêt épaisse et sombre`,
      `Rien du tout, le fond est vide`
    ],
    answer:`D\'autres personnes, des bâtiments et des voitures`,
    hint:`L\'arrière-plan, c\'est tout ce qui est loin, derrière les élèves.`,
    explanation:`Au fond on distingue <b>d\'autres personnes debout</b>, des <b>bâtiments</b> et des <b>voitures</b> : la plantation a lieu lors d\'un événement collectif. Le correcteur attend ce vocabulaire : <b>au premier plan / au second plan / à l\'arrière-plan</b>.` }),

  makeMCQ({ id:`g6fr-img-007`, chapterId:'g6fr-images', subsection:'une_image', difficulty:3,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Quel est le MESSAGE que cette image fait passer ?`,
    options:[
      `Les jeunes peuvent agir concrètement pour protéger l\'environnement`,
      `Le jardinage est un métier difficile`,
      `Les écoles manquent de terrain de sport`,
      `Il faut arroser les plantes le matin`
    ],
    answer:`Les jeunes peuvent agir concrètement pour protéger l\'environnement`,
    hint:`Qui agit sur l\'image, et pour quel résultat à long terme ?`,
    explanation:`Ce sont des <b>élèves</b>, et non des adultes, qui plantent l\'arbre : l\'image montre que <b>les jeunes peuvent agir</b> pour l\'environnement. Distinguer ce que l\'image <i>montre</i> de ce qu\'elle <i>veut dire</i> est une compétence attendue en Grade 6.` }),

  makeMCQ({ id:`g6fr-img-008`, chapterId:'g6fr-images', subsection:'une_image', difficulty:3,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Transforme au DISCOURS INDIRECT : L\'enseignante dit : « Arrosez bien le jeune arbre. »`,
    options:[
      `L\'enseignante leur demande d\'arroser bien le jeune arbre.`,
      `L\'enseignante dit qu\'arrosez bien le jeune arbre.`,
      `L\'enseignante demande : arrosez bien le jeune arbre.`,
      `L\'enseignante a dit « d\'arroser bien le jeune arbre ».`
    ],
    answer:`L\'enseignante leur demande d\'arroser bien le jeune arbre.`,
    hint:`Un ordre rapporté indirectement devient : demander DE + infinitif.`,
    explanation:`Un <b>impératif</b> rapporté au discours indirect devient <b>demander de + infinitif</b> : « Arrosez ! » → « elle leur <b>demande d\'arroser</b> ». On supprime les guillemets et les deux-points, et on ne garde jamais la forme conjuguée de l\'ordre.` }),

  makeMCQ({ id:`g6fr-img-009`, chapterId:'g6fr-images', subsection:'une_image', difficulty:4,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Quelle phrase exprime correctement une HYPOTHÈSE sur la suite ?`,
    options:[
      `Si chaque classe plante un arbre, la cour de l\'école sera bientôt ombragée.`,
      `Si chaque classe planterait un arbre, la cour sera ombragée.`,
      `Si chaque classe plantera un arbre, la cour serait ombragée.`,
      `Si chaque classe plante un arbre, la cour serait-elle ombragée.`
    ],
    answer:`Si chaque classe plante un arbre, la cour de l\'école sera bientôt ombragée.`,
    hint:`Après « si », on n\'emploie jamais le futur ni le conditionnel.`,
    explanation:`L\'hypothèse réalisable se construit <b>si + présent → futur simple</b> : « <b>Si</b> chaque classe <b>plante</b>…, la cour <b>sera</b>… ». Écrire « si… planterait » ou « si… plantera » est une faute classique : après <b>si</b>, pas de <i>-rais</i> ni de <i>-ra</i>.` }),

  makeMCQ({ id:`g6fr-img-010`, chapterId:'g6fr-images', subsection:'une_image', difficulty:4,
    question:`${_G6IMG_C1}${_G6IMG_PLANTATION}Tu dois rédiger dix lignes sur cette image. Quel plan te fera gagner le plus de points ?`,
    options:[
      `Situer la scène, décrire l\'arrière-plan puis le premier plan, rapporter une parole, puis dire ce que l\'image défend`,
      `Énumérer tous les objets visibles, un par ligne`,
      `Raconter une histoire qui n\'a aucun rapport avec l\'image`,
      `Décrire uniquement les couleurs, du plus clair au plus foncé`
    ],
    answer:`Situer la scène, décrire l\'arrière-plan puis le premier plan, rapporter une parole, puis dire ce que l\'image défend`,
    hint:`Un texte de Grade 6 doit à la fois décrire ET interpréter.`,
    explanation:`Le plan attendu combine <b>description organisée</b> (arrière-plan → premier plan), <b>vie</b> (une parole rapportée, un sentiment) et <b>interprétation</b> (le message de l\'image). Une simple énumération d\'objets reste au niveau du Grade 4 et plafonne la note.` }),

  // ── TROIS IMAGES : l\'oiseau blessé ─────────────────────────────────
  makeMCQ({ id:`g6fr-img-011`, chapterId:'g6fr-images', subsection:'trois_images', difficulty:1,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Que découvrent l\'enfant et sa mère sur l\'image 1 ?`,
    options:[
      `Un petit oiseau tombé par terre dans le parc`,
      `Un nid vide dans un arbre`,
      `Un chat endormi sous un banc`,
      `Un ballon perdu dans l\'herbe`
    ],
    answer:`Un petit oiseau tombé par terre dans le parc`,
    hint:`Regarde ce qui se trouve au sol, aux pieds de l\'enfant.`,
    explanation:`Sur l\'image 1, dans un parc (banc, arbre, soleil), l\'enfant et sa mère trouvent un <b>petit oiseau à terre</b>. C\'est la <b>situation initiale</b> et, en même temps, l'<b>élément déclencheur</b> du récit.` }),

  makeMCQ({ id:`g6fr-img-012`, chapterId:'g6fr-images', subsection:'trois_images', difficulty:2,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Que font les personnages sur l\'image 2 ?`,
    options:[
      `Ils soignent l\'oiseau à la maison et lui donnent de l\'eau`,
      `Ils relâchent l\'oiseau dans le jardin`,
      `Ils emmènent l\'oiseau chez le vétérinaire`,
      `Ils construisent un nid dans l\'arbre`
    ],
    answer:`Ils soignent l\'oiseau à la maison et lui donnent de l\'eau`,
    hint:`Le décor a changé : regarde la table, la boîte et la goutte d\'eau.`,
    explanation:`Le décor est devenu un <b>intérieur</b> : l\'oiseau est installé dans une boîte sur la table, avec de l'<b>eau</b> à côté. L\'image 2 correspond aux <b>péripéties</b> : ce que les personnages font pour résoudre le problème.` }),

  makeMCQ({ id:`g6fr-img-013`, chapterId:'g6fr-images', subsection:'trois_images', difficulty:2,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Comment se termine l\'histoire ?`,
    options:[
      `L\'oiseau guéri s\'envole et la famille lui dit au revoir`,
      `L\'oiseau reste dans sa boîte pour toujours`,
      `La famille offre l\'oiseau à un voisin`,
      `L\'oiseau s\'échappe pendant la nuit`
    ],
    answer:`L\'oiseau guéri s\'envole et la famille lui dit au revoir`,
    hint:`Sur l\'image 3, où se trouve l\'oiseau, et que fait la main levée ?`,
    explanation:`Sur l\'image 3, on est de retour dehors : l\'oiseau <b>vole dans le ciel</b> et la famille <b>fait un signe d\'au revoir</b> de la main. C\'est la <b>situation finale</b> : le problème est résolu et la situation a changé pour de bon.` }),

  makeMCQ({ id:`g6fr-img-014`, chapterId:'g6fr-images', subsection:'trois_images', difficulty:2,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Quel changement de LIEU se produit entre les trois images ?`,
    options:[
      `Le parc, puis la maison, puis de nouveau l\'extérieur`,
      `L\'école, puis le marché, puis la plage`,
      `La maison, puis la maison, puis la maison`,
      `Aucun : les trois images se passent au même endroit`
    ],
    answer:`Le parc, puis la maison, puis de nouveau l\'extérieur`,
    hint:`Compare la couleur du sol et le décor de chaque vignette.`,
    explanation:`Le récit se déplace : <b>parc → maison → extérieur</b>. Signaler ces changements avec des compléments de lieu (« <i>de retour à la maison</i> », « <i>le lendemain, dans le jardin</i> ») rend le texte beaucoup plus clair.` }),

  makeMCQ({ id:`g6fr-img-015`, chapterId:'g6fr-images', subsection:'trois_images', difficulty:3,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Quelle phrase mélange correctement l\'IMPARFAIT et le PASSÉ COMPOSÉ ?`,
    options:[
      `Nous nous promenions dans le parc quand mon fils a aperçu un oiseau blessé.`,
      `Nous nous sommes promenés dans le parc quand mon fils apercevait un oiseau blessé.`,
      `Nous nous promenions dans le parc quand mon fils apercevait un oiseau blessé.`,
      `Nous nous sommes promenés dans le parc quand mon fils a aperçu un oiseau blessé.`
    ],
    answer:`Nous nous promenions dans le parc quand mon fils a aperçu un oiseau blessé.`,
    hint:`L\'action longue qui sert de décor va à l\'imparfait ; l\'événement bref qui la coupe va au passé composé.`,
    explanation:`L'<b>imparfait</b> plante le décor qui dure (« nous nous <b>promenions</b> ») et le <b>passé composé</b> marque l\'événement bref qui l\'interrompt (« il <b>a aperçu</b> »). C\'est la règle des deux plans du récit : <i>arrière-plan à l\'imparfait, premier plan au passé composé</i>.` }),

  makeMCQ({ id:`g6fr-img-016`, chapterId:'g6fr-images', subsection:'trois_images', difficulty:3,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Quelle phrase ajoute un SENTIMENT que les images ne montrent pas directement ?`,
    options:[
      `Mon fils s\'est agenouillé, le cœur serré, devant le petit corps immobile.`,
      `Il y a un oiseau par terre.`,
      `La table est en bois.`,
      `L\'arbre est vert.`
    ],
    answer:`Mon fils s\'est agenouillé, le cœur serré, devant le petit corps immobile.`,
    hint:`Cherche l\'expression qui décrit une émotion, pas un objet.`,
    explanation:`« <b>le cœur serré</b> » exprime une <b>émotion</b>, que le dessin ne peut pas montrer. Les images donnent les actions ; c\'est à l\'auteur d\'ajouter les sentiments, les pensées et les sensations - c\'est ce qui distingue un récit d\'une simple légende d\'image.` }),

  makeMCQ({ id:`g6fr-img-017`, chapterId:'g6fr-images', subsection:'trois_images', difficulty:3,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Quelle est la MORALE de cette histoire ?`,
    options:[
      `Prendre soin des animaux, même les plus petits, est une belle action`,
      `Il ne faut jamais aller au parc en famille`,
      `Les oiseaux blessés doivent rester en cage`,
      `Il vaut mieux ne pas s\'occuper de ce qui ne nous regarde pas`
    ],
    answer:`Prendre soin des animaux, même les plus petits, est une belle action`,
    hint:`Que gagnent les personnages à la fin, et qu\'ont-ils fait pour cela ?`,
    explanation:`La famille prend soin d\'un oiseau fragile, et l\'histoire se termine sur sa <b>liberté retrouvée</b> : la morale est qu\'il faut <b>protéger les animaux</b>. Une bonne conclusion de récit peut énoncer cette leçon en une phrase, sans la répéter trois fois.` }),

  makeTF({ id:`g6fr-img-018`, chapterId:'g6fr-images', subsection:'trois_images', difficulty:2,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Dans un récit à partir d\'images, il est permis d\'inventer des détails qui ne sont pas dessinés, à condition qu\'ils restent cohérents avec l\'histoire.`,
    answer:true,
    hint:`Pense aux prénoms, aux paroles et aux sentiments des personnages.`,
    explanation:`<b>Vrai.</b> On attend même que tu inventes : des <b>prénoms</b>, des <b>paroles</b>, des <b>sentiments</b>, un <b>moment de la journée</b>. La seule règle est la <b>cohérence</b> : rien ne doit contredire ce que montrent les images.` }),

  makeMCQ({ id:`g6fr-img-019`, chapterId:'g6fr-images', subsection:'trois_images', difficulty:4,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Tu dois écrire le récit à la première personne, du point de vue de la MÈRE. Quelle ouverture convient ?`,
    options:[
      `Ce dimanche-là, j\'avais emmené mon fils au parc pour profiter du beau temps.`,
      `Ce dimanche-là, le garçon et sa mère sont allés au parc.`,
      `Ce dimanche-là, j\'étais un petit oiseau tombé de mon nid.`,
      `Ce dimanche-là, la mère a décidé d\'aller au parc avec son fils.`
    ],
    answer:`Ce dimanche-là, j\'avais emmené mon fils au parc pour profiter du beau temps.`,
    hint:`À la première personne, la mère dit « je » et parle de « mon fils ».`,
    explanation:`Du point de vue de la mère, il faut « <b>je</b> » et « <b>mon fils</b> ». Les propositions 2 et 4 sont à la <b>troisième personne</b> ; la 3 adopte le point de vue de l\'oiseau, ce qui n\'est pas ce qui est demandé. Choisir le bon <b>narrateur</b> et s\'y tenir jusqu\'au bout est essentiel.` }),

  makeMCQ({ id:`g6fr-img-020`, chapterId:'g6fr-images', subsection:'trois_images', difficulty:4,
    question:`${_G6IMG_C3}${_G6IMG_OISEAU}Ton récit doit faire dix lignes. Comment répartis-tu le mieux ton texte ?`,
    options:[
      `Deux lignes d\'introduction, puis trois lignes par image, en respectant l\'ordre`,
      `Neuf lignes sur l\'image 1 et une ligne pour les deux autres`,
      `Dix lignes de description du parc, sans raconter la suite`,
      `Trois lignes par image, dans l\'ordre 3, 1, 2, pour créer le suspense`
    ],
    answer:`Deux lignes d\'introduction, puis trois lignes par image, en respectant l\'ordre`,
    hint:`Chaque image est une étape du récit et mérite une place équivalente.`,
    explanation:`Une <b>courte introduction</b> (le moment, le lieu, les personnages) puis <b>trois lignes par image</b> donne un texte équilibré de dix lignes. Traiter une seule image, ou bouleverser l\'ordre 1-2-3, fait perdre des points même si la langue est correcte.` }),

);
