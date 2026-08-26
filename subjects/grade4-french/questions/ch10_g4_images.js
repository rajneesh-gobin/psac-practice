'use strict';
// Grade 4 French - Chapitre : Description d'Images
// IDs format: g4fr-img-NNN
//
// L'image unique est une PHOTOGRAPHIE réelle (Wikimedia Commons) : le rendu
// emoji d'origine ressemblait à un dessin animé et se décrivait mal. Chaque
// question a été rédigée en regardant la photo et ne porte que sur ce qui y est
// réellement visible.
//
// La séquence de trois images reste dessinée : il n'existe pas de série de
// photos libres montrant le même enfant à trois moments d'une même histoire.
//
// ⚠ Le texte alternatif doit rester générique - il ne doit JAMAIS donner la
//   réponse. Idem pour le <title> des SVG.
// ⚠ Photos sous licence CC BY / CC BY-SA : le crédit affiché sous chaque image
//   est une obligation de la licence, pas une décoration. Ne pas le retirer.

function _g4imgSvg(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img"
    style="max-width:100%;max-height:300px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.15);background:#fff;margin:6px 0">
    <title>Image à décrire</title>${body}</svg>`;
}
function _g4imgEmoji(x, y, size, ch) {
  return `<text x="${x}" y="${y}" font-size="${size}" text-anchor="middle">${ch}</text>`;
}
function _g4imgTree(x, groundY) {
  return `<rect x="${x - 6}" y="${groundY - 42}" width="12" height="42" fill="#92400e" rx="2"/>
    <circle cx="${x}" cy="${groundY - 56}" r="26" fill="#16a34a"/>
    <circle cx="${x - 18}" cy="${groundY - 46}" r="19" fill="#22c55e"/>
    <circle cx="${x + 18}" cy="${groundY - 46}" r="19" fill="#15803d"/>`;
}
function _g4imgHouse(x, groundY) {
  return `<rect x="${x}" y="${groundY - 44}" width="60" height="44" fill="#fca5a5" stroke="#7f1d1d"/>
    <polygon points="${x - 8},${groundY - 44} ${x + 30},${groundY - 72} ${x + 68},${groundY - 44}" fill="#b91c1c"/>
    <rect x="${x + 24}" y="${groundY - 26}" width="16" height="26" fill="#7c2d12"/>
    <rect x="${x + 6}" y="${groundY - 36}" width="13" height="13" fill="#bfdbfe" stroke="#7f1d1d"/>`;
}
function _g4imgPanel(x, n, inner) {
  return `<g transform="translate(${x},0)">
    <rect x="0" y="0" width="210" height="190" fill="#e0f2fe" stroke="#475569" stroke-width="2" rx="8"/>
    <rect x="0" y="130" width="210" height="60" fill="#86efac"/>
    ${inner}
    <circle cx="20" cy="20" r="14" fill="#1e3a5f"/>
    <text x="20" y="26" font-size="17" font-weight="bold" fill="#fff" text-anchor="middle" font-family="sans-serif">${n}</text>
  </g>`;
}

// ── SCÈNE 1 : une seule image - la plage ──────────────────────────────
// Photographie réelle. Le rendu emoji précédent ressemblait à un dessin animé
// et se décrivait mal. Chaque question ci-dessous a été écrite en regardant
// cette photo, et ne porte que sur ce qui y est réellement visible.
// alt générique : il ne doit JAMAIS donner la réponse.
function _g4imgPhoto(file, credit) {
  return `<figure style="margin:6px 0">
    <img src="https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=900"
      alt="Une image à décrire" loading="lazy"
      style="width:100%;max-width:520px;height:auto;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.15)">
    <figcaption style="font-size:.68em;color:#94a3b8;margin-top:3px">${credit}</figcaption>
  </figure>`;
}

const _G4IMG_PLAGE = _g4imgPhoto(
  'Children%20playing%20in%20the%20sands%20on%20a%20beach%20in%20the%20Philippines.jpg',
  'Photo : Øyvind Holmstad, Wikimedia Commons, CC BY-SA 4.0');

// ── SCÈNE 2 : trois images - le ballon perdu ──────────────────────────
const _G4IMG_BALLON = _g4imgSvg(660, 190, `
  ${_g4imgPanel(0, 1, `${_g4imgHouse(14, 130)}${_g4imgTree(168, 130)}
    ${_g4imgEmoji(105, 160, 34, '👦')}${_g4imgEmoji(135, 168, 22, '⚽')}`)}
  ${_g4imgPanel(225, 2, `${_g4imgHouse(14, 130)}${_g4imgTree(168, 130)}
    ${_g4imgEmoji(168, 84, 20, '⚽')}
    ${_g4imgEmoji(112, 160, 34, '🙍')}`)}
  ${_g4imgPanel(450, 3, `${_g4imgHouse(14, 130)}${_g4imgTree(168, 130)}
    <line x1="140" y1="130" x2="156" y2="66" stroke="#78350f" stroke-width="4"/>
    <line x1="158" y1="130" x2="174" y2="66" stroke="#78350f" stroke-width="4"/>
    <line x1="144" y1="115" x2="161" y2="115" stroke="#78350f" stroke-width="3"/>
    <line x1="148" y1="100" x2="165" y2="100" stroke="#78350f" stroke-width="3"/>
    <line x1="152" y1="85" x2="169" y2="85" stroke="#78350f" stroke-width="3"/>
    ${_g4imgEmoji(126, 112, 26, '👨')}
    ${_g4imgEmoji(72, 162, 32, '👦')}${_g4imgEmoji(96, 150, 20, '⚽')}`)}
`);

const _G4IMG_CONS1 = `<div style="background:#eef2ff;border-left:4px solid #6366f1;border-radius:6px;padding:8px 12px;margin:6px 0;font-size:0.93em"><b>Observe l'image, puis réponds à la question.</b></div>`;
const _G4IMG_CONS3 = `<div style="background:#eef2ff;border-left:4px solid #6366f1;border-radius:6px;padding:8px 12px;margin:6px 0;font-size:0.93em"><b>Observe les trois images dans l'ordre, puis réponds à la question.</b></div>`;

STATIC_QUESTIONS.push(

  // ── IMAGE UNIQUE : la plage ────────────────────────────────────────
  makeMCQ({ id:`g4fr-img-001`, chapterId:'g4fr-images', subsection:'une_image', difficulty:1,
    question:`${_G4IMG_CONS1}${_G4IMG_PLAGE}Où se passe la scène ?`,
    options:[`À la plage, au bord de la mer`, `Dans la cour de l'école`, `Au marché`, `Dans la cuisine`],
    answer:`À la plage, au bord de la mer`,
    hint:`Regarde le sable et ce qu'il y a derrière les enfants.`,
    explanation:`On voit du <b>sable</b>, de l'eau et des <b>vagues</b> : la scène se passe <b>à la plage</b>. Pour décrire une image, commence toujours par le lieu : « <i>Cette image représente une plage.</i> »` }),

  makeMCQ({ id:`g4fr-img-002`, chapterId:'g4fr-images', subsection:'une_image', difficulty:1,
    question:`${_G4IMG_CONS1}${_G4IMG_PLAGE}Que font les enfants ?`,
    options:[`Ils jouent dans le sable`, `Ils font leurs devoirs`, `Ils mangent à table`, `Ils dorment`],
    answer:`Ils jouent dans le sable`,
    hint:`Regarde ce qu'ils ont sous les mains.`,
    explanation:`Les enfants sont accroupis et creusent : <b>ils jouent dans le sable</b>. Pour dire ce que font les personnages, on utilise le <b>présent</b> : <i>ils jouent, il creuse, elle regarde</i>.` }),

  makeMCQ({ id:`g4fr-img-003`, chapterId:'g4fr-images', subsection:'une_image', difficulty:1,
    question:`${_G4IMG_CONS1}${_G4IMG_PLAGE}Combien d'enfants y a-t-il, environ ?`,
    options:[`Plus de cinq`, `Un seul`, `Deux`, `Aucun`],
    answer:`Plus de cinq`,
    hint:`Compte les enfants debout ET ceux qui sont accroupis.`,
    explanation:`Il y a <b>plus de cinq enfants</b> : certains sont debout, d'autres sont accroupis dans le sable. Quand il y a beaucoup de personnages, on n'est pas obligé de donner un nombre exact : « <i>un groupe d'enfants</i> » ou « <i>plusieurs enfants</i> » suffit.` }),

  makeMCQ({ id:`g4fr-img-004`, chapterId:'g4fr-images', subsection:'une_image', difficulty:2,
    question:`${_G4IMG_CONS1}${_G4IMG_PLAGE}Y a-t-il des adultes sur cette image ?`,
    options:[`Non, il n'y a que des enfants`, `Oui, deux adultes`, `Oui, un seul adulte`, `Oui, toute une famille`],
    answer:`Non, il n'y a que des enfants`,
    hint:`Regarde bien la taille de chaque personnage.`,
    explanation:`Tous les personnages sont des <b>enfants</b> : aucun adulte n'apparaît. Remarquer ce qui <b>n'est pas</b> sur une image est aussi utile que décrire ce qui y est.` }),

  makeMCQ({ id:`g4fr-img-005`, chapterId:'g4fr-images', subsection:'une_image', difficulty:2,
    question:`${_G4IMG_CONS1}${_G4IMG_PLAGE}Complète : « Les enfants jouent ______ le sable. »`,
    options:[`sur`, `sous`, `dans le ciel`, `derrière`],
    answer:`sur`,
    hint:`Ils sont posés dessus, pas enterrés dessous.`,
    explanation:`On dit « les enfants jouent <b>sur</b> le sable » : ils sont <b>à la surface</b>. Les prépositions de lieu sont indispensables pour décrire une image : <b>sur, sous, dans, devant, derrière, à côté de, entre</b>.` }),

  makeMCQ({ id:`g4fr-img-006`, chapterId:'g4fr-images', subsection:'une_image', difficulty:2,
    question:`${_G4IMG_CONS1}${_G4IMG_PLAGE}Qu'y a-t-il derrière les enfants, tout au fond ?`,
    options:[`La mer et les vagues`, `Une forêt`, `Une grande ville`, `Une montagne`],
    answer:`La mer et les vagues`,
    hint:`Regarde la partie la plus haute de la photo.`,
    explanation:`Au fond, on voit <b>la mer</b> et de petites <b>vagues</b> blanches. Ce qui est loin, tout au fond, s'appelle l'<b>arrière-plan</b> ; ce qui est près de nous s'appelle le <b>premier plan</b>.` }),

  makeMCQ({ id:`g4fr-img-007`, chapterId:'g4fr-images', subsection:'une_image', difficulty:3,
    question:`${_G4IMG_CONS1}${_G4IMG_PLAGE}Au premier plan, le sable est mouillé. Que voit-on dedans ?`,
    options:[`Le reflet des enfants`, `Des poissons`, `Des coquillages roses`, `Un bateau`],
    answer:`Le reflet des enfants`,
    hint:`Le sable mouillé se comporte un peu comme un miroir.`,
    explanation:`Le sable mouillé du premier plan renvoie le <b>reflet</b> des enfants, comme un miroir. Repérer ce genre de détail est ce qui distingue une bonne description d'une simple liste.` }),

  makeMCQ({ id:`g4fr-img-008`, chapterId:'g4fr-images', subsection:'une_image', difficulty:3,
    question:`${_G4IMG_CONS1}${_G4IMG_PLAGE}Quelle phrase décrit CORRECTEMENT l'image ?`,
    options:[
      `Un groupe d'enfants joue dans le sable, au bord de la mer.`,
      `Deux adultes se promènent sur une plage déserte.`,
      `Des enfants nagent loin dans la mer avec un bateau.`,
      `Un enfant dort sous un palmier pendant qu'il pleut.`
    ],
    answer:`Un groupe d'enfants joue dans le sable, au bord de la mer.`,
    hint:`Vérifie chaque phrase détail par détail : qui, où, quoi.`,
    explanation:`Seule la première phrase correspond à ce qu'on voit : <b>un groupe d'enfants</b>, <b>dans le sable</b>, <b>au bord de la mer</b>. Il n'y a ni adulte, ni bateau, ni palmier, et personne ne nage.` }),

  makeMCQ({ id:`g4fr-img-009`, chapterId:'g4fr-images', subsection:'une_image', difficulty:3,
    question:`${_G4IMG_CONS1}${_G4IMG_PLAGE}Pour commencer une description, quelle phrase est la MEILLEURE ?`,
    options:[
      `Cette image représente des enfants qui jouent sur une plage.`,
      `Le sable est mouillé.`,
      `J'aime beaucoup la mer.`,
      `Il y a un short jaune.`
    ],
    answer:`Cette image représente des enfants qui jouent sur une plage.`,
    hint:`Une bonne première phrase donne une vue d'ensemble, pas un petit détail.`,
    explanation:`On commence toujours par une <b>vue d'ensemble</b> : <i>où</i> et <i>qui</i>. Les détails (le sable mouillé, un short jaune) viennent ensuite, et l'opinion personnelle (« j'aime ») se garde pour la <b>fin</b>.` }),

  makeMCQ({ id:`g4fr-img-010`, chapterId:'g4fr-images', subsection:'une_image', difficulty:4,
    question:`${_G4IMG_CONS1}${_G4IMG_PLAGE}Tu dois écrire cinq phrases sur cette image. Quel plan suivras-tu ?`,
    options:[
      `Le lieu, puis les personnages, puis leurs actions, puis un détail, puis mon avis`,
      `Mon avis, puis mon avis, puis mon avis`,
      `Les couleurs uniquement, une phrase par couleur`,
      `Cinq fois la même phrase avec des mots différents`
    ],
    answer:`Le lieu, puis les personnages, puis leurs actions, puis un détail, puis mon avis`,
    hint:`Va du plus général au plus précis, et termine par ce que tu ressens.`,
    explanation:`Le plan d'une description va <b>du général au particulier</b> : (1) le lieu, (2) qui est là, (3) ce qu'ils font, (4) un détail intéressant, (5) ce que tu en penses. Ce plan te garantit cinq phrases différentes et ordonnées, sans répétition.` }),

  // ── TROIS IMAGES : le ballon perdu ─────────────────────────────────
  makeMCQ({ id:`g4fr-img-011`, chapterId:'g4fr-images', subsection:'trois_images', difficulty:1,
    question:`${_G4IMG_CONS3}${_G4IMG_BALLON}Sur l'image 1, que fait le garçon ?`,
    options:[`Il joue au ballon dans le jardin`, `Il monte à l'échelle`, `Il pleure`, `Il rentre dans la maison`],
    answer:`Il joue au ballon dans le jardin`,
    hint:`Regarde ce qu'il y a à ses pieds, sur l'herbe.`,
    explanation:`Sur l'image 1, le garçon est dans le jardin avec son ballon : <b>il joue au ballon</b>. La première image d'une histoire présente toujours la <b>situation de départ</b> : qui, où, et quoi.` }),

  makeMCQ({ id:`g4fr-img-012`, chapterId:'g4fr-images', subsection:'trois_images', difficulty:2,
    question:`${_G4IMG_CONS3}${_G4IMG_BALLON}Que s'est-il passé sur l'image 2 ?`,
    options:[
      `Le ballon est tombé dans l'arbre et le garçon est triste`,
      `Le garçon a cassé la fenêtre de la maison`,
      `Le chien a pris le ballon`,
      `Le garçon a gagné un match`
    ],
    answer:`Le ballon est tombé dans l'arbre et le garçon est triste`,
    hint:`Cherche où se trouve le ballon sur la deuxième image, puis regarde le visage du garçon.`,
    explanation:`Le ballon est maintenant <b>dans l'arbre</b> et le garçon fait une tête triste. La deuxième image est le <b>problème</b> de l'histoire : c'est presque toujours là que quelque chose tourne mal.` }),

  makeMCQ({ id:`g4fr-img-013`, chapterId:'g4fr-images', subsection:'trois_images', difficulty:2,
    question:`${_G4IMG_CONS3}${_G4IMG_BALLON}Qui vient aider le garçon sur l'image 3 ?`,
    options:[`Son père, avec une échelle`, `Sa maîtresse`, `Un voisin, avec un chien`, `Personne`],
    answer:`Son père, avec une échelle`,
    hint:`Regarde l'objet en bois appuyé contre l'arbre.`,
    explanation:`Sur l'image 3, <b>son père</b> monte sur une <b>échelle</b> pour attraper le ballon, et le garçon le tient de nouveau. La troisième image est la <b>solution</b> : le problème est réglé.` }),

  makeMCQ({ id:`g4fr-img-014`, chapterId:'g4fr-images', subsection:'trois_images', difficulty:2,
    question:`${_G4IMG_CONS3}${_G4IMG_BALLON}Quels mots servent à raconter les trois images DANS L'ORDRE ?`,
    options:[
      `D'abord… Ensuite… Enfin…`,
      `Parce que… Parce que… Parce que…`,
      `Mais… Mais… Mais…`,
      `Où… Quand… Comment…`
    ],
    answer:`D'abord… Ensuite… Enfin…`,
    hint:`Ces mots indiquent l'ordre dans le temps.`,
    explanation:`<b>D'abord, Ensuite, Enfin</b> sont des <b>connecteurs de temps</b> : ils rangent les événements dans l'ordre. On peut aussi utiliser <i>Un jour, Puis, Soudain, Alors, Finalement</i>. Sans connecteurs, une histoire en images ressemble à une liste.` }),

  makeMCQ({ id:`g4fr-img-015`, chapterId:'g4fr-images', subsection:'trois_images', difficulty:3,
    question:`${_G4IMG_CONS3}${_G4IMG_BALLON}Quel titre convient le mieux à cette histoire ?`,
    options:[`Le ballon perdu`, `La leçon de mathématiques`, `Le chien de Maya`, `Une journée à la plage`],
    answer:`Le ballon perdu`,
    hint:`Le titre doit résumer le problème principal de l'histoire.`,
    explanation:`<b>« Le ballon perdu »</b> résume le problème et la solution en trois mots. Un bon titre nomme <b>l'objet ou l'événement central</b> - pas un détail, et pas quelque chose qui n'est pas sur les images.` }),

  makeMCQ({ id:`g4fr-img-016`, chapterId:'g4fr-images', subsection:'trois_images', difficulty:3,
    question:`${_G4IMG_CONS3}${_G4IMG_BALLON}Pour raconter cette histoire AU PASSÉ, quelle phrase est correcte ?`,
    options:[
      `Le ballon est tombé dans l'arbre.`,
      `Le ballon tomber dans l'arbre.`,
      `Le ballon a tombé dans l'arbre.`,
      `Le ballon est tomber dans l'arbre.`
    ],
    answer:`Le ballon est tombé dans l'arbre.`,
    hint:`Le verbe « tomber » se conjugue avec l'auxiliaire ÊTRE au passé composé.`,
    explanation:`<b>Tomber</b> fait partie des verbes qui utilisent l'auxiliaire <b>être</b> au passé composé : « Le ballon <b>est tombé</b>. » On écrit <i>tombé</i> (participe passé), et non <i>tomber</i> (infinitif). Avec <i>avoir</i>, ce serait une erreur.` }),

  makeMCQ({ id:`g4fr-img-017`, chapterId:'g4fr-images', subsection:'trois_images', difficulty:3,
    question:`${_G4IMG_CONS3}${_G4IMG_BALLON}Quelle phrase pourrait terminer l'histoire ?`,
    options:[
      `Enfin, le garçon a remercié son père et ils ont joué ensemble.`,
      `D'abord, le garçon prend son ballon.`,
      `Le ballon est rouge et blanc.`,
      `Ensuite, le ballon monte dans l'arbre.`
    ],
    answer:`Enfin, le garçon a remercié son père et ils ont joué ensemble.`,
    hint:`Une fin arrive après la solution et commence souvent par « Enfin » ou « Finalement ».`,
    explanation:`La phrase de fin vient <b>après</b> la solution et referme l'histoire : « <b>Enfin</b>, le garçon a remercié son père… ». Les autres phrases racontent le début, un détail, ou le problème : elles ne peuvent pas conclure.` }),

  makeTF({ id:`g4fr-img-018`, chapterId:'g4fr-images', subsection:'trois_images', difficulty:2,
    question:`${_G4IMG_CONS3}${_G4IMG_BALLON}Dans une histoire en trois images, la deuxième image montre le problème.`,
    answer:true,
    hint:`Pense à la structure : début, problème, solution.`,
    explanation:`<b>Vrai.</b> La structure habituelle est : <b>image 1 = la situation de départ</b>, <b>image 2 = le problème</b>, <b>image 3 = la solution ou la fin</b>. Repérer cette structure t'aide à savoir quoi écrire pour chaque image.` }),

  makeMCQ({ id:`g4fr-img-019`, chapterId:'g4fr-images', subsection:'trois_images', difficulty:4,
    question:`${_G4IMG_CONS3}${_G4IMG_BALLON}Tu dois écrire six phrases sur ces trois images. Comment les répartis-tu le mieux ?`,
    options:[
      `Deux phrases par image, en gardant l'ordre 1, 2, 3`,
      `Six phrases sur l'image 1, car c'est la plus jolie`,
      `Une phrase pour l'image 1 et cinq pour l'image 3`,
      `Les six phrases dans le désordre, ce n'est pas important`
    ],
    answer:`Deux phrases par image, en gardant l'ordre 1, 2, 3`,
    hint:`Chaque image raconte une étape : aucune ne doit être oubliée.`,
    explanation:`Chaque image est une <b>étape</b> de l'histoire, donc chacune mérite la même place : <b>deux phrases par image</b>. Et surtout, on respecte l'<b>ordre 1, 2, 3</b> : une histoire racontée dans le désordre devient incompréhensible.` }),

);
