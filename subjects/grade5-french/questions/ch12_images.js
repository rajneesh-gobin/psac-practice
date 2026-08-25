'use strict';
// Grade 5 French - Chapitre : Description d'Images
// IDs format: g5fr-img-NNN
//
// Deux formats de l'épreuve : UNE image à décrire, et TROIS images qui
// racontent une histoire. La séquence « le chat dans le sac » reprend celle du
// cahier d'entraînement Grade 5 (Day 40, écriture 8-10 phrases).
//
// SVG en ligne plutôt que photos : pas de 404, fonctionne hors ligne dans la
// PWA, et le contenu est connu exactement, donc chaque réponse est vérifiable.
// Pas de <title> descriptif, il révélerait les réponses.

function _g5imgSvg(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img"
    style="max-width:100%;max-height:300px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.15);background:#fff;margin:6px 0">
    <title>Image à décrire</title>${body}</svg>`;
}
function _g5imgEmoji(x, y, size, ch) {
  return `<text x="${x}" y="${y}" font-size="${size}" text-anchor="middle">${ch}</text>`;
}
function _g5imgLabel(x, y, txt, size, colour) {
  return `<text x="${x}" y="${y}" font-size="${size || 11}" font-family="sans-serif"
    fill="${colour || '#1e293b'}" text-anchor="middle">${txt}</text>`;
}
function _g5imgPanel(x, n, skyFill, groundFill, inner) {
  return `<g transform="translate(${x},0)">
    <rect x="0" y="0" width="210" height="190" fill="${skyFill}" stroke="#475569" stroke-width="2" rx="8"/>
    <rect x="2" y="132" width="206" height="56" fill="${groundFill}"/>
    ${inner}
    <circle cx="20" cy="20" r="14" fill="#1e3a5f"/>
    <text x="20" y="26" font-size="17" font-weight="bold" fill="#fff" text-anchor="middle" font-family="sans-serif">${n}</text>
  </g>`;
}

// ── SCÈNE 1 : une seule image - le marché ─────────────────────────────
const _G5IMG_MARCHE = _g5imgSvg(400, 240, `
  <rect x="0" y="0" width="400" height="240" fill="#fef9ef"/>
  <rect x="0" y="0" width="400" height="30" fill="#dc2626"/>
  <g>
    <rect x="0" y="0" width="40" height="30" fill="#fff"/>
    <rect x="80" y="0" width="40" height="30" fill="#fff"/>
    <rect x="160" y="0" width="40" height="30" fill="#fff"/>
    <rect x="240" y="0" width="40" height="30" fill="#fff"/>
    <rect x="320" y="0" width="40" height="30" fill="#fff"/>
  </g>
  <line x1="0" y1="30" x2="400" y2="30" stroke="#7f1d1d" stroke-width="2"/>
  <rect x="30" y="120" width="250" height="14" fill="#a16207"/>
  <rect x="34" y="134" width="10" height="66" fill="#78350f"/>
  <rect x="266" y="134" width="10" height="66" fill="#78350f"/>
  <rect x="300" y="52" width="86" height="52" fill="#fff" stroke="#334155" stroke-width="2" rx="4"/>
  ${_g5imgLabel(343, 68, 'PRIX DU JOUR', 10, '#b91c1c')}
  ${_g5imgLabel(343, 84, 'Mangue  Rs 50', 11)}
  ${_g5imgLabel(343, 98, 'Banane  Rs 30', 11)}
  ${_g5imgEmoji(70, 116, 26, '🥭')}
  ${_g5imgEmoji(112, 116, 26, '🍌')}
  ${_g5imgEmoji(154, 116, 26, '🍍')}
  ${_g5imgEmoji(196, 116, 26, '🥥')}
  ${_g5imgEmoji(240, 116, 24, '⚖️')}
  ${_g5imgEmoji(150, 84, 44, '👨')}
  ${_g5imgEmoji(96, 196, 42, '👩')}
  ${_g5imgEmoji(128, 204, 26, '🧺')}
  ${_g5imgEmoji(196, 198, 34, '👧')}
  ${_g5imgEmoji(330, 196, 32, '🐕')}
  ${_g5imgEmoji(368, 150, 26, '🌂')}
`);

// ── SCÈNE 2 : trois images - le chat dans le sac ──────────────────────
const _G5IMG_CHAT = _g5imgSvg(660, 190, `
  ${_g5imgPanel(0, 1, '#fef3c7', '#d6d3d1', `
    <rect x="16" y="92" width="72" height="40" fill="#93c5fd" stroke="#1e40af"/>
    <rect x="16" y="82" width="26" height="14" fill="#fff" stroke="#1e40af"/>
    ${_g5imgEmoji(126, 124, 34, '👧')}
    ${_g5imgEmoji(158, 154, 28, '🎒')}
    ${_g5imgEmoji(182, 128, 20, '📚')}
    ${_g5imgEmoji(58, 156, 26, '🐈')}
  `)}
  ${_g5imgPanel(225, 2, '#bfe4ff', '#9ca3af', `
    <circle cx="34" cy="34" r="17" fill="#fcd34d"/>
    <rect x="120" y="62" width="80" height="70" fill="#fed7aa" stroke="#9a3412"/>
    <rect x="132" y="76" width="16" height="16" fill="#bfdbfe" stroke="#9a3412"/>
    <rect x="158" y="76" width="16" height="16" fill="#bfdbfe" stroke="#9a3412"/>
    <rect x="146" y="104" width="18" height="28" fill="#7c2d12"/>
    ${_g5imgLabel(160, 58, 'ÉCOLE', 11, '#9a3412')}
    <line x1="2" y1="160" x2="208" y2="160" stroke="#fff" stroke-width="3" stroke-dasharray="12 10"/>
    ${_g5imgEmoji(62, 148, 36, '👧')}
    ${_g5imgEmoji(42, 140, 22, '🎒')}
  `)}
  ${_g5imgPanel(450, 3, '#ecfdf5', '#d6d3d1', `
    <rect x="14" y="36" width="86" height="46" fill="#14532d" stroke="#052e16" stroke-width="2" rx="3"/>
    <rect x="26" y="112" width="70" height="10" fill="#a16207"/>
    <rect x="118" y="112" width="70" height="10" fill="#a16207"/>
    ${_g5imgEmoji(150, 108, 26, '🎒')}
    ${_g5imgEmoji(150, 90, 24, '🐈')}
    ${_g5imgEmoji(52, 152, 30, '🧒')}
    ${_g5imgEmoji(92, 152, 30, '🧒')}
    ${_g5imgEmoji(180, 152, 30, '😲')}
    ${_g5imgEmoji(176, 76, 28, '👩')}
  `)}
`);

const _G5IMG_C1 = `<div style="background:#eef2ff;border-left:4px solid #6366f1;border-radius:6px;padding:8px 12px;margin:6px 0;font-size:0.93em"><b>Observe l'image, puis réponds à la question.</b></div>`;
const _G5IMG_C3 = `<div style="background:#eef2ff;border-left:4px solid #6366f1;border-radius:6px;padding:8px 12px;margin:6px 0;font-size:0.93em"><b>Observe les trois images dans l'ordre, puis réponds à la question.</b></div>`;

STATIC_QUESTIONS.push(

  // ── IMAGE UNIQUE : le marché ───────────────────────────────────────
  makeMCQ({ id:`g5fr-img-001`, chapterId:`fr-images`, difficulty:1,
    question:`${_G5IMG_C1}${_G5IMG_MARCHE}Où se passe cette scène ?`,
    options:[`Au marché`, `À la plage`, `Dans une salle de classe`, `À l'hôpital`],
    answer:`Au marché`,
    hint:`Regarde l'étal, les fruits, la balance et le panneau des prix.`,
    explanation:`Un <b>étal</b> couvert d'un auvent rayé, des <b>fruits</b>, une <b>balance</b> et un <b>panneau de prix</b> : nous sommes <b>au marché</b>. La première phrase d'une description situe toujours la scène : « <i>Cette image représente un marché.</i> »` }),

  makeMCQ({ id:`g5fr-img-002`, chapterId:`fr-images`, difficulty:1,
    question:`${_G5IMG_C1}${_G5IMG_MARCHE}Combien de personnes y a-t-il sur l'image ?`,
    options:[`Trois`, `Deux`, `Quatre`, `Cinq`],
    answer:`Trois`,
    hint:`Compte l'homme derrière l'étal et les clientes devant.`,
    explanation:`Il y a <b>trois personnes</b> : le marchand derrière l'étal, une dame avec un panier et une fille. Le chien ne compte pas - c'est un animal, pas une personne.` }),

  makeMCQ({ id:`g5fr-img-003`, chapterId:`fr-images`, difficulty:2,
    question:`${_G5IMG_C1}${_G5IMG_MARCHE}Où se tient le marchand par rapport à l'étal ?`,
    options:[`Derrière l'étal`, `Devant l'étal`, `Sous l'étal`, `À côté du chien`],
    answer:`Derrière l'étal`,
    hint:`Le marchand et les clientes ne sont pas du même côté de la table.`,
    explanation:`Le marchand se tient <b>derrière l'étal</b> et les clientes <b>devant</b>. Les prépositions de lieu structurent toute la description : <b>devant, derrière, sur, sous, à côté de, entre, au fond de, au premier plan</b>.` }),

  makeMCQ({ id:`g5fr-img-004`, chapterId:`fr-images`, difficulty:2,
    question:`${_G5IMG_C1}${_G5IMG_MARCHE}Combien coûte une mangue, d'après le panneau ?`,
    options:[`Rs 50`, `Rs 30`, `Rs 80`, `Le prix n'est pas écrit`],
    answer:`Rs 50`,
    hint:`Lis les deux lignes du panneau blanc, à droite.`,
    explanation:`Le panneau indique « Mangue <b>Rs 50</b> » et « Banane Rs 30 ». Dans une image d'examen, tout texte visible (panneau, enseigne, étiquette) fait partie des informations à utiliser.` }),

  makeMCQ({ id:`g5fr-img-005`, chapterId:`fr-images`, difficulty:2,
    question:`${_G5IMG_C1}${_G5IMG_MARCHE}Que tient la dame à la main ?`,
    options:[`Un panier`, `Un parapluie`, `Une balance`, `Un ananas`],
    answer:`Un panier`,
    hint:`C'est l'objet dans lequel on met ses achats.`,
    explanation:`Elle tient un <b>panier</b> pour transporter ses achats. Le parapluie est posé plus loin, à droite, et la balance appartient au marchand.` }),

  makeMCQ({ id:`g5fr-img-006`, chapterId:`fr-images`, difficulty:2,
    question:`${_G5IMG_C1}${_G5IMG_MARCHE}Quelle phrase utilise correctement « être en train de » pour décrire le marchand ?`,
    options:[
      `Le marchand est en train de vendre des fruits.`,
      `Le marchand est en train vendre des fruits.`,
      `Le marchand est en train de vend des fruits.`,
      `Le marchand en train de vendre des fruits.`
    ],
    answer:`Le marchand est en train de vendre des fruits.`,
    hint:`La structure complète est : être + en train + DE + infinitif.`,
    explanation:`La formule exacte est <b>être + en train + de + infinitif</b> : « Le marchand <b>est en train de vendre</b> des fruits. » Elle insiste sur une action <b>en cours au moment de l'image</b> - très utile pour décrire une photo ou un dessin.` }),

  makeMCQ({ id:`g5fr-img-007`, chapterId:`fr-images`, difficulty:3,
    question:`${_G5IMG_C1}${_G5IMG_MARCHE}Quelle phrase décrit l'image AVEC PRÉCISION ?`,
    options:[
      `Au premier plan, une dame et une fille choisissent des fruits ; derrière l'étal, le marchand les sert.`,
      `Au premier plan, le marchand pèse un poisson pendant que la pluie tombe.`,
      `Trois enfants jouent au ballon devant une école.`,
      `Une dame vend des mangues à un marchand assis par terre.`
    ],
    answer:`Au premier plan, une dame et une fille choisissent des fruits ; derrière l'étal, le marchand les sert.`,
    hint:`Vérifie chaque détail : qui fait quoi, et de quel côté de l'étal.`,
    explanation:`Seule la première phrase respecte tout : les <b>clientes au premier plan</b>, le <b>marchand derrière l'étal</b>, et des <b>fruits</b> (pas de poisson, pas de pluie). Les expressions <b>au premier plan / à l'arrière-plan</b> sont attendues dans une bonne description.` }),

  makeMCQ({ id:`g5fr-img-008`, chapterId:`fr-images`, difficulty:3,
    question:`${_G5IMG_C1}${_G5IMG_MARCHE}Tu dois imaginer le dialogue entre la dame et le marchand. Quelle réplique est la plus vraisemblable ?`,
    options:[
      `« Bonjour, monsieur. Combien coûtent les mangues, s'il vous plaît ? »`,
      `« Bonjour, monsieur. Où est la salle de classe ? »`,
      `« Bonjour, monsieur. Puis-je emprunter votre voiture ? »`,
      `« Bonjour, monsieur. Le train part à quelle heure ? »`
    ],
    answer:`« Bonjour, monsieur. Combien coûtent les mangues, s'il vous plaît ? »`,
    hint:`Le dialogue doit correspondre au lieu et à la situation de l'image.`,
    explanation:`Au marché, on demande le <b>prix</b> : « Combien coûtent les mangues ? » Un dialogue inventé doit rester <b>cohérent avec la scène</b> : le lieu, les personnages et ce qu'ils sont en train de faire.` }),

  makeMCQ({ id:`g5fr-img-009`, chapterId:`fr-images`, difficulty:4,
    question:`${_G5IMG_C1}${_G5IMG_MARCHE}La dame achète 2 mangues et 3 bananes. Elle donne un billet de Rs 200. Combien le marchand lui rend-il ?`,
    options:[`Rs 10`, `Rs 20`, `Rs 30`, `Rs 60`],
    answer:`Rs 10`,
    hint:`Calcule d'abord le total à partir des prix du panneau, puis soustrais de 200.`,
    explanation:`2 mangues × Rs 50 = Rs 100. 3 bananes × Rs 30 = Rs 90. Total = <b>Rs 190</b>. Sur Rs 200, le marchand rend <b>Rs 10</b>. Une image d'examen peut aussi servir de support à un petit calcul : lis toujours les chiffres affichés.` }),

  makeMCQ({ id:`g5fr-img-010`, chapterId:`fr-images`, difficulty:4,
    question:`${_G5IMG_C1}${_G5IMG_MARCHE}Tu dois écrire huit phrases sur cette image. Quel plan est le meilleur ?`,
    options:[
      `Le lieu et le moment, puis les personnages, puis leurs actions, puis les objets et les prix, puis mon impression`,
      `Huit phrases qui commencent toutes par « Il y a »`,
      `Une phrase par couleur visible sur l'image`,
      `Décrire d'abord le chien, puis répéter la même idée`
    ],
    answer:`Le lieu et le moment, puis les personnages, puis leurs actions, puis les objets et les prix, puis mon impression`,
    hint:`Une description va du général au détail et se termine par ce que tu ressens.`,
    explanation:`On suit un ordre <b>du général au particulier</b> : (1) le lieu et le moment, (2) qui est là, (3) ce que chacun fait, (4) les objets et les détails écrits, (5) l'impression finale. Commencer huit phrases par « Il y a » donnerait un texte plat et répétitif.` }),

  // ── TROIS IMAGES : le chat dans le sac ─────────────────────────────
  makeMCQ({ id:`g5fr-img-011`, chapterId:`fr-images`, difficulty:1,
    question:`${_G5IMG_C3}${_G5IMG_CHAT}Que fait la fille sur l'image 1 ?`,
    options:[
      `Elle prépare son sac d'école dans sa chambre`,
      `Elle nourrit son chat dans la cuisine`,
      `Elle fait ses devoirs à l'école`,
      `Elle dort dans son lit`
    ],
    answer:`Elle prépare son sac d'école dans sa chambre`,
    hint:`Regarde le sac ouvert et les livres, ainsi que le lit derrière elle.`,
    explanation:`Sur l'image 1, la fille met ses <b>livres</b> dans son <b>sac d'école</b>, dans sa chambre : elle <b>prépare son sac</b>. C'est la <b>situation initiale</b> de l'histoire.` }),

  makeMCQ({ id:`g5fr-img-012`, chapterId:`fr-images`, difficulty:2,
    question:`${_G5IMG_C3}${_G5IMG_CHAT}Quel détail de l'image 1 annonce la suite de l'histoire ?`,
    options:[
      `Le chat qui observe le sac ouvert`,
      `Le lit qui est bien fait`,
      `La fenêtre de la chambre`,
      `La couleur du sac`
    ],
    answer:`Le chat qui observe le sac ouvert`,
    hint:`Quel personnage réapparaît sur la troisième image ?`,
    explanation:`Le <b>chat</b> regarde le sac ouvert : c'est l'<b>indice</b> qui prépare la surprise de l'image 3. Dans une histoire en images, un détail du début annonce presque toujours l'événement de la fin - il faut le repérer avant d'écrire.` }),

  makeMCQ({ id:`g5fr-img-013`, chapterId:`fr-images`, difficulty:1,
    question:`${_G5IMG_C3}${_G5IMG_CHAT}Que montre l'image 2 ?`,
    options:[
      `La fille marche vers l'école avec son sac sur le dos`,
      `La fille rentre chez elle en pleurant`,
      `La fille attend l'autobus sous la pluie`,
      `La fille joue dans la cour avec ses amies`
    ],
    answer:`La fille marche vers l'école avec son sac sur le dos`,
    hint:`Regarde le bâtiment à l'arrière-plan et la route.`,
    explanation:`Elle avance sur la route, son <b>sac sur le dos</b>, vers un bâtiment marqué <b>ÉCOLE</b>, sous le soleil. L'image 2 assure le <b>déplacement</b> entre la maison et la classe.` }),

  makeMCQ({ id:`g5fr-img-014`, chapterId:`fr-images`, difficulty:2,
    question:`${_G5IMG_C3}${_G5IMG_CHAT}Que se passe-t-il sur l'image 3 ?`,
    options:[
      `Le chat sort du sac en classe et tout le monde est surpris`,
      `La maîtresse distribue les cahiers`,
      `Les élèves sortent en récréation`,
      `La fille a oublié ses livres à la maison`
    ],
    answer:`Le chat sort du sac en classe et tout le monde est surpris`,
    hint:`Regarde ce qui sort du sac posé sur le bureau, puis les visages autour.`,
    explanation:`En classe, le <b>chat sort du sac</b> : les élèves et la maîtresse sont <b>surpris</b>. C'est l'<b>élément de surprise</b>, le point culminant de l'histoire.` }),

  makeMCQ({ id:`g5fr-img-015`, chapterId:`fr-images`, difficulty:2,
    question:`${_G5IMG_C3}${_G5IMG_CHAT}Quelle suite de connecteurs convient pour raconter les trois images ?`,
    options:[
      `Ce matin-là… Ensuite… Soudain…`,
      `Parce que… Cependant… Bien que…`,
      `Premièrement… Deuxièmement… Troisièmement…`,
      `Où… Quand… Pourquoi…`
    ],
    answer:`Ce matin-là… Ensuite… Soudain…`,
    hint:`Il faut des connecteurs de TEMPS, et un mot fort pour la surprise finale.`,
    explanation:`<b>Ce matin-là</b> plante le décor, <b>Ensuite</b> assure la suite, et <b>Soudain</b> annonce la surprise : c'est exactement le rythme d'une histoire. « Premièrement / Deuxièmement » convient à une liste, pas à un récit, et « Parce que / Cependant » exprime la cause ou l'opposition, pas le temps.` }),

  makeMCQ({ id:`g5fr-img-016`, chapterId:`fr-images`, difficulty:3,
    question:`${_G5IMG_C3}${_G5IMG_CHAT}Pour raconter cette histoire au passé, quelle phrase est correcte ?`,
    options:[
      `Pendant qu'elle marchait vers l'école, le chat dormait dans son sac.`,
      `Pendant qu'elle a marché vers l'école, le chat a dormi dans son sac.`,
      `Pendant qu'elle marcher vers l'école, le chat dormir dans son sac.`,
      `Pendant qu'elle marchait vers l'école, le chat a dormait dans son sac.`
    ],
    answer:`Pendant qu'elle marchait vers l'école, le chat dormait dans son sac.`,
    hint:`Deux actions qui durent en même temps se mettent au même temps du passé.`,
    explanation:`Deux actions <b>qui durent</b> en arrière-plan se mettent à l'<b>imparfait</b> : « elle <b>marchait</b> » et « le chat <b>dormait</b> ». Le passé composé serait réservé à l'événement bref et soudain : « Soudain, le chat <b>est sorti</b> du sac. »` }),

  makeMCQ({ id:`g5fr-img-017`, chapterId:`fr-images`, difficulty:3,
    question:`${_G5IMG_C3}${_G5IMG_CHAT}Quelle phrase raconte le mieux le moment de surprise de l'image 3 ?`,
    options:[
      `Soudain, le chat est sorti du sac et toute la classe a éclaté de rire.`,
      `Le chat était gris et le sac était bleu.`,
      `D'abord, la fille a préparé son sac.`,
      `Le lendemain, elle est retournée à l'école.`
    ],
    answer:`Soudain, le chat est sorti du sac et toute la classe a éclaté de rire.`,
    hint:`Le moment de surprise se raconte au passé composé, avec un mot comme « Soudain ».`,
    explanation:`« <b>Soudain</b>, le chat <b>est sorti</b>… » : un connecteur de rupture + le <b>passé composé</b> pour l'action brusque, plus la <b>réaction</b> des personnages. Décrire des couleurs ou revenir au début n'exprime aucune surprise.` }),

  makeTF({ id:`g5fr-img-018`, chapterId:`fr-images`, difficulty:2,
    question:`${_G5IMG_C3}${_G5IMG_CHAT}Dans un récit en images, il faut décrire chaque image dans l'ordre où elle est numérotée.`,
    answer:true,
    hint:`Que se passe-t-il si on raconte la fin avant le début ?`,
    explanation:`<b>Vrai.</b> Les images sont numérotées pour imposer l'ordre <b>chronologique</b> : 1, puis 2, puis 3. Raconter la surprise avant le départ de la maison rendrait l'histoire incompréhensible et ferait perdre des points.` }),

  makeMCQ({ id:`g5fr-img-019`, chapterId:`fr-images`, difficulty:4,
    question:`${_G5IMG_C3}${_G5IMG_CHAT}Tu dois écrire dix lignes sur cette histoire. Que faut-il ajouter que les images ne montrent PAS ?`,
    options:[
      `Les sentiments des personnages et une phrase de conclusion`,
      `Les mesures exactes de la salle de classe`,
      `La liste de toutes les matières scolaires`,
      `L'adresse complète de l'école`
    ],
    answer:`Les sentiments des personnages et une phrase de conclusion`,
    hint:`Les images montrent des actions ; un bon récit ajoute ce qui se passe à l'intérieur des personnages.`,
    explanation:`Les images montrent les <b>actions</b> ; c'est à toi d'ajouter les <b>sentiments</b> (« elle était gênée », « la maîtresse a souri ») et une <b>conclusion</b> (« le soir, elle a ramené le chat à la maison »). C'est ce qui transforme une légende d'images en véritable récit.` }),

  makeMCQ({ id:`g5fr-img-020`, chapterId:`fr-images`, difficulty:3,
    question:`${_G5IMG_C3}${_G5IMG_CHAT}Quel titre convient le mieux à cette histoire ?`,
    options:[`Le chat dans le sac`, `La leçon de natation`, `Le marché du samedi`, `Le cyclone de janvier`],
    answer:`Le chat dans le sac`,
    hint:`Le titre doit annoncer l'événement central sans tout raconter.`,
    explanation:`<b>« Le chat dans le sac »</b> nomme l'élément qui déclenche toute l'histoire. Un bon titre est <b>court</b>, il <b>intrigue</b>, et il ne révèle pas la fin.` }),

);
