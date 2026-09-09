'use strict';
// Grade 5 French - Chapitre : Description d\'Images
// IDs format: g5fr-img-NNN
//
// Deux formats de l\'épreuve : UNE image à décrire, et TROIS images qui
// racontent une histoire. La séquence « le chat dans le sac » reprend celle du
// cahier d\'entraînement Grade 5 (Day 40, écriture 8-10 phrases).
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
//   Les émojis de personne (👧 👩 🧒) sont des têtes seules dans Noto : posés
//   sur le sol ils ressemblaient à des têtes coupées. Un visage sur un corps
//   dessiné se lit comme un personnage debout, et l'émotion (😀 😲) reste
//   lisible. La couleur du tee-shirt identifie le personnage d'une case à
//   l'autre : c'est ce qui dit à l'enfant que c'est la même fille.
function _g5imgEmoji(x, y, size, ch) {
  return `<text x="${x}" y="${y}" font-size="${size}" text-anchor="middle">${ch}</text>`;
}
function _g5imgLabel(x, y, txt, size, colour) {
  return `<text x="${x}" y="${y}" font-size="${size || 11}" font-family="sans-serif"
    font-weight="bold" fill="${colour || '#1e293b'}" text-anchor="middle">${txt}</text>`;
}
function _g5imgPerson(x, feetY, shirt, face, scale) {
  const k = scale || 1;
  const legH = 12 * k, torsoH = 21 * k, torsoW = 30 * k, head = 27 * k;
  const torsoY = feetY - legH - torsoH;
  return `<rect x="${x - 10 * k}" y="${feetY - legH}" width="${7 * k}" height="${legH}" fill="#3730a3" rx="2"/>
    <rect x="${x + 3 * k}" y="${feetY - legH}" width="${7 * k}" height="${legH}" fill="#3730a3" rx="2"/>
    <rect x="${x - torsoW / 2}" y="${torsoY}" width="${torsoW}" height="${torsoH}" rx="${8 * k}" fill="${shirt}"/>
    <rect x="${x - torsoW / 2 - 5 * k}" y="${torsoY + 3 * k}" width="${5 * k}" height="${13 * k}" rx="${2.5 * k}" fill="${shirt}"/>
    <rect x="${x + torsoW / 2}" y="${torsoY + 3 * k}" width="${5 * k}" height="${13 * k}" rx="${2.5 * k}" fill="${shirt}"/>
    ${_g5imgEmoji(x, torsoY + 4 * k, head, face)}`;
}
// Le cartable : le rabat relevé et l'ouverture sombre sont ce qui rend le sac
// « ouvert » - c'est le détail sur lequel porte g5fr-img-012.
function _g5imgBagOpen(x, baseY) {
  return `<polygon points="${x - 17},${baseY - 26} ${x - 21},${baseY - 44} ${x + 15},${baseY - 42} ${x + 17},${baseY - 26}"
      fill="#ec4899" stroke="#9d174d" stroke-width="2" stroke-linejoin="round"/>
    <rect x="${x - 17}" y="${baseY - 28}" width="34" height="8" fill="#4c0519"/>
    <rect x="${x - 17}" y="${baseY - 24}" width="34" height="24" rx="4" fill="#f472b6" stroke="#9d174d" stroke-width="2"/>
    <rect x="${x - 7}" y="${baseY - 14}" width="14" height="9" rx="2" fill="#fbcfe8" stroke="#9d174d"/>`;
}
function _g5imgBagClosed(x, baseY, w, h) {
  return `<rect x="${x - w / 2}" y="${baseY - h}" width="${w}" height="${h}" rx="4" fill="#f472b6" stroke="#9d174d" stroke-width="2"/>
    <rect x="${x - w / 2}" y="${baseY - h + 4}" width="${w}" height="${h * 0.42}" fill="#ec4899" stroke="#9d174d" stroke-width="2"/>`;
}
// ⚠ Le sol est un path, pas un rect : un rect à angles droits dépasse des
//   coins arrondis du cadre. Et pas de clipPath : il faudrait un id, or
//   plusieurs figures peuvent coexister dans la même page.
function _g5imgPanel(n, sky, ground, inner) {
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
function _g5imgStrip(panels) {
  return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));
    gap:8px;margin:8px 0;max-width:680px">${panels.join('')}</div>`;
}

// ── SCÈNE 1 : une seule image - le marché ─────────────────────────────
// Photographie réelle : le rendu emoji d\'origine ressemblait à du clipart.
// Les questions ont été écrites en regardant la photo.
function _g5imgPhoto(file, credit) {
  return `<figure style="margin:6px 0">
    <img src="assets/questions/${file}"
      alt="Une image à décrire" loading="lazy"
      style="width:100%;max-width:520px;height:auto;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.15)">
    <figcaption style="font-size:.68em;color:#94a3b8;margin-top:3px">${credit}</figcaption>
  </figure>`;
}

const _G5IMG_MARCHE = _g5imgPhoto(
  'scene-marche.jpg',
  'Photo : PattayaPatrol, Wikimedia Commons, CC BY-SA 4.0');

// ── SCÈNE 2 : trois images - le chat dans le sac ──────────────────────
// Image 1 = situation de départ, image 2 = le trajet, image 3 = la surprise.
// Chaque case doit répondre seule aux questions g5fr-img-011 à 020 :
//   1 la fille prépare son sac dans sa chambre, le chat observe le sac OUVERT
//   2 la fille marche vers l'école, le sac sur le dos
//   3 le chat sort du sac en classe, tout le monde est surpris
const _G5IMG_GIRL = '#7c3aed';
const _G5IMG_CHAT = _g5imgStrip([
  _g5imgPanel(1, '#fef3c7', '#d6d3d1', `
    <rect x="128" y="30" width="48" height="36" fill="#bfdbfe" stroke="#94a3b8" stroke-width="2"/>
    <line x1="152" y1="30" x2="152" y2="66" stroke="#94a3b8" stroke-width="2"/>
    <line x1="128" y1="48" x2="176" y2="48" stroke="#94a3b8" stroke-width="2"/>
    <rect x="6" y="96" width="62" height="26" rx="3" fill="#93c5fd" stroke="#1e40af" stroke-width="2"/>
    <rect x="9" y="86" width="24" height="12" rx="3" fill="#fff" stroke="#1e40af" stroke-width="2"/>
    <rect x="10" y="122" width="6" height="12" fill="#1e40af"/>
    <rect x="58" y="122" width="6" height="12" fill="#1e40af"/>
    ${_g5imgPerson(88, 152, _G5IMG_GIRL, '😊')}
    ${_g5imgBagOpen(128, 152)}
    ${_g5imgEmoji(168, 154, 32, '🐈')}
  `),
  _g5imgPanel(2, '#bfe4ff', '#9ca3af', `
    <circle cx="26" cy="28" r="14" fill="#fcd34d"/>
    <rect x="112" y="50" width="82" height="70" fill="#fed7aa" stroke="#9a3412" stroke-width="2"/>
    <rect x="120" y="62" width="18" height="18" fill="#bfdbfe" stroke="#9a3412" stroke-width="2"/>
    <rect x="168" y="62" width="18" height="18" fill="#bfdbfe" stroke="#9a3412" stroke-width="2"/>
    <rect x="143" y="92" width="22" height="28" fill="#7c2d12"/>
    ${_g5imgLabel(153, 44, 'ÉCOLE', 13, '#9a3412')}
    <line x1="8" y1="158" x2="192" y2="158" stroke="#fff" stroke-width="4" stroke-dasharray="14 11"/>
    ${_g5imgBagClosed(38, 140, 24, 26)}
    ${_g5imgPerson(56, 146, _G5IMG_GIRL, '😊')}
  `),
  _g5imgPanel(3, '#ecfdf5', '#d6d3d1', `
    <rect x="8" y="22" width="88" height="48" rx="3" fill="#14532d" stroke="#052e16" stroke-width="2"/>
    <rect x="96" y="112" width="76" height="9" fill="#a16207"/>
    <rect x="102" y="121" width="6" height="24" fill="#78350f"/>
    <rect x="160" y="121" width="6" height="24" fill="#78350f"/>
    ${_g5imgBagClosed(120, 112, 26, 22)}
    ${_g5imgEmoji(146, 108, 30, '🐈')}
    ${_g5imgPerson(178, 150, '#0f766e', '😮', 0.8)}
    ${_g5imgPerson(34, 156, _G5IMG_GIRL, '😲', 0.85)}
    ${_g5imgPerson(72, 156, '#ea580c', '😲', 0.85)}
  `)
]);

const _G5IMG_C1 = `<div style="background:#eef2ff;border-left:4px solid #6366f1;border-radius:6px;padding:8px 12px;margin:6px 0;font-size:0.93em"><b>Observe l\'image, puis réponds à la question.</b></div>`;
const _G5IMG_C3 = `<div style="background:#eef2ff;border-left:4px solid #6366f1;border-radius:6px;padding:8px 12px;margin:6px 0;font-size:0.93em"><b>Observe les trois images dans l\'ordre, puis réponds à la question.</b></div>`;

STATIC_QUESTIONS.push(

  // ── IMAGE UNIQUE : le marché ───────────────────────────────────────
  makeMCQ({ id:`g5fr-img-001`, chapterId:'fr-images', subsection:'une_image', difficulty:1,
    question:`${_G5IMG_C1}${_G5IMG_MARCHE}Où se passe cette scène ?`,
    options:[`Dans un marché de fruits et légumes`, `À la plage`, `Dans une salle de classe`, `À l\'hôpital`],
    answer:`Dans un marché de fruits et légumes`,
    hint:`Regarde les cageots empilés et ce qu\'ils contiennent.`,
    explanation:`On voit des <b>cageots</b> et des <b>bassines</b> remplis de légumes, des étals et des clients : la scène se passe <b>dans un marché</b>. La première phrase d\'une description situe toujours le lieu : « <i>Cette image représente un marché.</i> »` }),

  makeMCQ({ id:`g5fr-img-002`, chapterId:'fr-images', subsection:'une_image', difficulty:1,
    question:`${_G5IMG_C1}${_G5IMG_MARCHE}Que vend-on surtout sur ce marché ?`,
    options:[`Des légumes`, `Des vêtements`, `Des livres`, `Des jouets`],
    answer:`Des légumes`,
    hint:`Regarde ce qui remplit les caisses et les bassines.`,
    explanation:`Partout on voit des <b>légumes</b> : des verts en botte, des choux, des oignons rouges dans un filet. C\'est un marché de <b>fruits et légumes</b>, pas un marché de vêtements.` }),

  makeMCQ({ id:`g5fr-img-003`, chapterId:'fr-images', subsection:'une_image', difficulty:2,
    question:`${_G5IMG_C1}${_G5IMG_MARCHE}Ce marché est-il désert ou animé ?`,
    options:[`Animé : il y a plusieurs personnes`, `Désert : il n\'y a personne`, `Fermé pour la nuit`, `Réservé aux enfants`],
    answer:`Animé : il y a plusieurs personnes`,
    hint:`Compte les personnes, au premier plan comme au fond.`,
    explanation:`<b>Plusieurs personnes</b> travaillent et circulent entre les étals : le marché est <b>animé</b>. Décrire l\'ambiance d\'une image - animée, calme, joyeuse, triste - vaut autant que d\'énumérer les objets.` }),

  makeMCQ({ id:`g5fr-img-004`, chapterId:'fr-images', subsection:'une_image', difficulty:2,
    question:`${_G5IMG_C1}${_G5IMG_MARCHE}Que tient dans les mains l\'homme au tablier ?`,
    options:[`Un grand sac de légumes verts`, `Un parapluie`, `Un téléphone`, `Un ballon`],
    answer:`Un grand sac de légumes verts`,
    hint:`Regarde ce qu\'il porte devant lui, à hauteur de la taille.`,
    explanation:`Il tient un grand <b>sac en plastique rempli de légumes verts</b> qu\'il est en train de ranger sur l\'étal. Pour décrire une personne, dis d\'abord ce qu\'elle porte, puis ce qu\'elle fait.` }),

  makeMCQ({ id:`g5fr-img-005`, chapterId:'fr-images', subsection:'une_image', difficulty:2,
    question:`${_G5IMG_C1}${_G5IMG_MARCHE}Qu\'y a-t-il au PREMIER PLAN, tout près de nous ?`,
    options:[`Un chariot chargé de caisses`, `Un chien endormi`, `Une voiture rouge`, `Un arbre en fleurs`],
    answer:`Un chariot chargé de caisses`,
    hint:`Le premier plan, c\'est le bas de l\'image, ce qui est le plus proche.`,
    explanation:`Au <b>premier plan</b> se trouve un <b>chariot métallique</b> chargé de caisses vertes et d\'un filet d\'oignons. Le vocabulaire attendu : <b>au premier plan</b> (près) / <b>à l\'arrière-plan</b> (loin).` }),

  makeMCQ({ id:`g5fr-img-006`, chapterId:'fr-images', subsection:'une_image', difficulty:2,
    question:`${_G5IMG_C1}${_G5IMG_MARCHE}Quelle phrase utilise correctement « être en train de » ?`,
    options:[
      `Le marchand est en train de ranger ses légumes.`,
      `Le marchand est en train ranger ses légumes.`,
      `Le marchand est en train de range ses légumes.`,
      `Le marchand en train de ranger ses légumes.`
    ],
    answer:`Le marchand est en train de ranger ses légumes.`,
    hint:`La structure complète est : être + en train + DE + infinitif.`,
    explanation:`La formule exacte est <b>être + en train + de + infinitif</b> : « Le marchand <b>est en train de ranger</b> ses légumes. » Elle insiste sur une action <b>en cours au moment de l\'image</b> - parfaite pour décrire une photo.` }),

  makeMCQ({ id:`g5fr-img-007`, chapterId:'fr-images', subsection:'une_image', difficulty:3,
    question:`${_G5IMG_C1}${_G5IMG_MARCHE}Quelle phrase décrit l\'image AVEC PRÉCISION ?`,
    options:[
      `Au premier plan, un chariot est chargé de caisses ; derrière, des marchands s\'occupent de leurs étals de légumes.`,
      `Au premier plan, un pêcheur vend du poisson sur une plage ensoleillée.`,
      `Trois enfants jouent au ballon devant une école.`,
      `Une dame vend des fleurs dans un magasin vide.`
    ],
    answer:`Au premier plan, un chariot est chargé de caisses ; derrière, des marchands s\'occupent de leurs étals de légumes.`,
    hint:`Vérifie chaque détail : qui, où, et à quel plan.`,
    explanation:`Seule la première phrase respecte tout : le <b>chariot au premier plan</b>, les <b>marchands derrière</b>, et des <b>légumes</b>. Pas de poisson, pas de plage, pas d\'enfants, et le lieu n\'est pas vide.` }),

  makeMCQ({ id:`g5fr-img-008`, chapterId:'fr-images', subsection:'une_image', difficulty:3,
    question:`${_G5IMG_C1}${_G5IMG_MARCHE}Tu dois imaginer un dialogue entre une cliente et le marchand. Quelle réplique est la plus vraisemblable ?`,
    options:[
      `« Bonjour, monsieur. Combien coûte le kilo de légumes verts, s\'il vous plaît ? »`,
      `« Bonjour, monsieur. Où est la salle de classe ? »`,
      `« Bonjour, monsieur. Puis-je emprunter votre voiture ? »`,
      `« Bonjour, monsieur. Le train part à quelle heure ? »`
    ],
    answer:`« Bonjour, monsieur. Combien coûte le kilo de légumes verts, s\'il vous plaît ? »`,
    hint:`Le dialogue doit correspondre au lieu et à la situation de l\'image.`,
    explanation:`Au marché, on demande le <b>prix</b> : « Combien coûte le kilo… ? » Un dialogue inventé doit rester <b>cohérent avec la scène</b> : le lieu, les personnages et ce qu\'ils sont en train de faire.` }),

  makeMCQ({ id:`g5fr-img-009`, chapterId:'fr-images', subsection:'une_image', difficulty:3,
    question:`${_G5IMG_C1}${_G5IMG_MARCHE}Quels mots appartiennent au CHAMP LEXICAL de cette image ?`,
    options:[
      `le marchand, l\'étal, la caisse, peser, vendre`,
      `la voile, l\'ancre, le port, naviguer`,
      `la fraction, le quotient, additionner`,
      `l\'ordonnance, l\'infirmière, guérir`
    ],
    answer:`le marchand, l\'étal, la caisse, peser, vendre`,
    hint:`Un champ lexical regroupe tous les mots liés à un même thème.`,
    explanation:`Le thème est le <b>marché</b> : <i>le marchand, la cliente, l\'étal, la caisse, le cageot, peser, vendre, acheter, le prix</i>. Employer le bon champ lexical est ce qui rend une description précise plutôt que vague.` }),

  makeMCQ({ id:`g5fr-img-010`, chapterId:'fr-images', subsection:'une_image', difficulty:4,
    question:`${_G5IMG_C1}${_G5IMG_MARCHE}Tu dois écrire huit phrases sur cette image. Quel plan est le meilleur ?`,
    options:[
      `Le lieu, puis les personnages, puis leurs actions, puis les objets et les couleurs, puis mon impression`,
      `Huit phrases qui commencent toutes par « Il y a »`,
      `Une phrase par couleur visible sur l\'image`,
      `Décrire d\'abord le chariot, puis répéter la même idée`
    ],
    answer:`Le lieu, puis les personnages, puis leurs actions, puis les objets et les couleurs, puis mon impression`,
    hint:`Une description va du général au détail et se termine par ce que tu ressens.`,
    explanation:`On suit un ordre <b>du général au particulier</b> : (1) le lieu, (2) qui est là, (3) ce que chacun fait, (4) les objets et les couleurs, (5) l\'impression finale. Commencer huit phrases par « Il y a » donnerait un texte plat et répétitif.` }),

  // ── TROIS IMAGES : le chat dans le sac ─────────────────────────────
  makeMCQ({ id:`g5fr-img-011`, chapterId:'fr-images', subsection:'trois_images', difficulty:1,
    question:`${_G5IMG_C3}${_G5IMG_CHAT}Que fait la fille sur l\'image 1 ?`,
    options:[
      `Elle prépare son sac d\'école dans sa chambre`,
      `Elle nourrit son chat dans la cuisine`,
      `Elle fait ses devoirs à l\'école`,
      `Elle dort dans son lit`
    ],
    answer:`Elle prépare son sac d\'école dans sa chambre`,
    hint:`Regarde le sac ouvert et les livres, ainsi que le lit derrière elle.`,
    explanation:`Sur l\'image 1, la fille met ses <b>livres</b> dans son <b>sac d\'école</b>, dans sa chambre : elle <b>prépare son sac</b>. C\'est la <b>situation initiale</b> de l\'histoire.` }),

  makeMCQ({ id:`g5fr-img-012`, chapterId:'fr-images', subsection:'trois_images', difficulty:2,
    question:`${_G5IMG_C3}${_G5IMG_CHAT}Quel détail de l\'image 1 annonce la suite de l\'histoire ?`,
    options:[
      `Le chat qui observe le sac ouvert`,
      `Le lit qui est bien fait`,
      `La fenêtre de la chambre`,
      `La couleur du sac`
    ],
    answer:`Le chat qui observe le sac ouvert`,
    hint:`Quel personnage réapparaît sur la troisième image ?`,
    explanation:`Le <b>chat</b> regarde le sac ouvert : c\'est l'<b>indice</b> qui prépare la surprise de l\'image 3. Dans une histoire en images, un détail du début annonce presque toujours l\'événement de la fin - il faut le repérer avant d\'écrire.` }),

  makeMCQ({ id:`g5fr-img-013`, chapterId:'fr-images', subsection:'trois_images', difficulty:1,
    question:`${_G5IMG_C3}${_G5IMG_CHAT}Que montre l\'image 2 ?`,
    options:[
      `La fille marche vers l\'école avec son sac sur le dos`,
      `La fille rentre chez elle en pleurant`,
      `La fille attend l\'autobus sous la pluie`,
      `La fille joue dans la cour avec ses amies`
    ],
    answer:`La fille marche vers l\'école avec son sac sur le dos`,
    hint:`Regarde le bâtiment à l\'arrière-plan et la route.`,
    explanation:`Elle avance sur la route, son <b>sac sur le dos</b>, vers un bâtiment marqué <b>ÉCOLE</b>, sous le soleil. L\'image 2 assure le <b>déplacement</b> entre la maison et la classe.` }),

  makeMCQ({ id:`g5fr-img-014`, chapterId:'fr-images', subsection:'trois_images', difficulty:2,
    question:`${_G5IMG_C3}${_G5IMG_CHAT}Que se passe-t-il sur l\'image 3 ?`,
    options:[
      `Le chat sort du sac en classe et tout le monde est surpris`,
      `La maîtresse distribue les cahiers`,
      `Les élèves sortent en récréation`,
      `La fille a oublié ses livres à la maison`
    ],
    answer:`Le chat sort du sac en classe et tout le monde est surpris`,
    hint:`Regarde ce qui sort du sac posé sur le bureau, puis les visages autour.`,
    explanation:`En classe, le <b>chat sort du sac</b> : les élèves et la maîtresse sont <b>surpris</b>. C\'est l'<b>élément de surprise</b>, le point culminant de l\'histoire.` }),

  makeMCQ({ id:`g5fr-img-015`, chapterId:'fr-images', subsection:'trois_images', difficulty:2,
    question:`${_G5IMG_C3}${_G5IMG_CHAT}Quelle suite de connecteurs convient pour raconter les trois images ?`,
    options:[
      `Ce matin-là… Ensuite… Soudain…`,
      `Parce que… Cependant… Bien que…`,
      `Premièrement… Deuxièmement… Troisièmement…`,
      `Où… Quand… Pourquoi…`
    ],
    answer:`Ce matin-là… Ensuite… Soudain…`,
    hint:`Il faut des connecteurs de TEMPS, et un mot fort pour la surprise finale.`,
    explanation:`<b>Ce matin-là</b> plante le décor, <b>Ensuite</b> assure la suite, et <b>Soudain</b> annonce la surprise : c\'est exactement le rythme d\'une histoire. « Premièrement / Deuxièmement » convient à une liste, pas à un récit, et « Parce que / Cependant » exprime la cause ou l\'opposition, pas le temps.` }),

  makeMCQ({ id:`g5fr-img-016`, chapterId:'fr-images', subsection:'trois_images', difficulty:3,
    question:`${_G5IMG_C3}${_G5IMG_CHAT}Pour raconter cette histoire au passé, quelle phrase est correcte ?`,
    options:[
      `Pendant qu\'elle marchait vers l\'école, le chat dormait dans son sac.`,
      `Pendant qu\'elle a marché vers l\'école, le chat a dormi dans son sac.`,
      `Pendant qu\'elle marcher vers l\'école, le chat dormir dans son sac.`,
      `Pendant qu\'elle marchait vers l\'école, le chat a dormait dans son sac.`
    ],
    answer:`Pendant qu\'elle marchait vers l\'école, le chat dormait dans son sac.`,
    hint:`Deux actions qui durent en même temps se mettent au même temps du passé.`,
    explanation:`Deux actions <b>qui durent</b> en arrière-plan se mettent à l'<b>imparfait</b> : « elle <b>marchait</b> » et « le chat <b>dormait</b> ». Le passé composé serait réservé à l\'événement bref et soudain : « Soudain, le chat <b>est sorti</b> du sac. »` }),

  makeMCQ({ id:`g5fr-img-017`, chapterId:'fr-images', subsection:'trois_images', difficulty:3,
    question:`${_G5IMG_C3}${_G5IMG_CHAT}Quelle phrase raconte le mieux le moment de surprise de l\'image 3 ?`,
    options:[
      `Soudain, le chat est sorti du sac et toute la classe a éclaté de rire.`,
      `Le chat était gris et le sac était bleu.`,
      `D\'abord, la fille a préparé son sac.`,
      `Le lendemain, elle est retournée à l\'école.`
    ],
    answer:`Soudain, le chat est sorti du sac et toute la classe a éclaté de rire.`,
    hint:`Le moment de surprise se raconte au passé composé, avec un mot comme « Soudain ».`,
    explanation:`« <b>Soudain</b>, le chat <b>est sorti</b>… » : un connecteur de rupture + le <b>passé composé</b> pour l\'action brusque, plus la <b>réaction</b> des personnages. Décrire des couleurs ou revenir au début n\'exprime aucune surprise.` }),

  makeTF({ id:`g5fr-img-018`, chapterId:'fr-images', subsection:'trois_images', difficulty:2,
    question:`${_G5IMG_C3}${_G5IMG_CHAT}Dans un récit en images, il faut décrire chaque image dans l\'ordre où elle est numérotée.`,
    answer:true,
    hint:`Que se passe-t-il si on raconte la fin avant le début ?`,
    explanation:`<b>Vrai.</b> Les images sont numérotées pour imposer l\'ordre <b>chronologique</b> : 1, puis 2, puis 3. Raconter la surprise avant le départ de la maison rendrait l\'histoire incompréhensible et ferait perdre des points.` }),

  makeMCQ({ id:`g5fr-img-019`, chapterId:'fr-images', subsection:'trois_images', difficulty:4,
    question:`${_G5IMG_C3}${_G5IMG_CHAT}Tu dois écrire dix lignes sur cette histoire. Que faut-il ajouter que les images ne montrent PAS ?`,
    options:[
      `Les sentiments des personnages et une phrase de conclusion`,
      `Les mesures exactes de la salle de classe`,
      `La liste de toutes les matières scolaires`,
      `L\'adresse complète de l\'école`
    ],
    answer:`Les sentiments des personnages et une phrase de conclusion`,
    hint:`Les images montrent des actions ; un bon récit ajoute ce qui se passe à l\'intérieur des personnages.`,
    explanation:`Les images montrent les <b>actions</b> ; c\'est à toi d\'ajouter les <b>sentiments</b> (« elle était gênée », « la maîtresse a souri ») et une <b>conclusion</b> (« le soir, elle a ramené le chat à la maison »). C\'est ce qui transforme une légende d\'images en véritable récit.` }),

  makeMCQ({ id:`g5fr-img-020`, chapterId:'fr-images', subsection:'trois_images', difficulty:3,
    question:`${_G5IMG_C3}${_G5IMG_CHAT}Quel titre convient le mieux à cette histoire ?`,
    options:[`Le chat dans le sac`, `La leçon de natation`, `Le marché du samedi`, `Le cyclone de janvier`],
    answer:`Le chat dans le sac`,
    hint:`Le titre doit annoncer l\'événement central sans tout raconter.`,
    explanation:`<b>« Le chat dans le sac »</b> nomme l\'élément qui déclenche toute l\'histoire. Un bon titre est <b>court</b>, il <b>intrigue</b>, et il ne révèle pas la fin.` }),

);
