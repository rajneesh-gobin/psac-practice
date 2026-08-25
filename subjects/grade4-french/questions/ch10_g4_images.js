'use strict';
// Grade 4 French - Chapitre : Description d'Images
// IDs format: g4fr-img-NNN
//
// Les scènes sont des SVG en ligne, pas des photos : elles ne peuvent pas
// tomber en 404, elles fonctionnent hors ligne dans la PWA, et le contenu de
// l'image est connu exactement - donc chaque question a une réponse vérifiable.
// Le décor est dessiné (formes simples) ; les personnages sont des emoji.
// Aucun <title> descriptif : il révélerait les réponses.

function _g4imgSvg(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img"
    style="max-width:100%;max-height:300px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.15);background:#fff;margin:6px 0">
    <title>Image à décrire</title>${body}</svg>`;
}
function _g4imgEmoji(x, y, size, ch) {
  return `<text x="${x}" y="${y}" font-size="${size}" text-anchor="middle">${ch}</text>`;
}
function _g4imgBird(x, y) {
  return `<path d="M${x} ${y} l7 -5 l7 5" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round"/>`;
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
const _G4IMG_PLAGE = _g4imgSvg(400, 240, `
  <rect x="0" y="0" width="400" height="120" fill="#bfe4ff"/>
  <circle cx="48" cy="40" r="22" fill="#fcd34d"/>
  ${_g4imgBird(150, 35)}${_g4imgBird(186, 26)}${_g4imgBird(216, 46)}
  <rect x="0" y="120" width="400" height="46" fill="#38bdf8"/>
  <path d="M0 132 q20 -7 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="#0ea5e9" stroke-width="2"/>
  <path d="M0 152 q20 -7 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="#0ea5e9" stroke-width="2"/>
  <rect x="0" y="166" width="400" height="74" fill="#f5e3b3"/>
  ${_g4imgEmoji(287, 145, 30, '⛵')}
  ${_g4imgEmoji(92, 152, 28, '🏊')}
  ${_g4imgEmoji(44, 218, 36, '⛱️')}
  ${_g4imgEmoji(152, 218, 34, '👧')}
  ${_g4imgEmoji(196, 226, 22, '🏐')}
  ${_g4imgEmoji(252, 220, 28, '🐕')}
  ${_g4imgEmoji(348, 212, 52, '🌴')}
  ${_g4imgEmoji(312, 232, 18, '🦀')}
`);

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
  makeMCQ({ id:`g4fr-img-001`, chapterId:`g4fr-images`, difficulty:1,
    question:`${_G4IMG_CONS1}${_G4IMG_PLAGE}Où se passe la scène ?`,
    options:[`À la plage`, `Dans la cour de l'école`, `Au marché`, `Dans la cuisine`],
    answer:`À la plage`,
    hint:`Regarde le sable, la mer et le palmier.`,
    explanation:`On voit le <b>sable</b>, la <b>mer</b>, un <b>palmier</b> et un <b>parasol</b> : la scène se passe <b>à la plage</b>. Pour décrire une image, commence toujours par le lieu : « <i>Cette image représente une plage.</i> »` }),

  makeMCQ({ id:`g4fr-img-002`, chapterId:`g4fr-images`, difficulty:1,
    question:`${_G4IMG_CONS1}${_G4IMG_PLAGE}Combien d'enfants y a-t-il sur l'image ?`,
    options:[`Deux`, `Un`, `Trois`, `Quatre`],
    answer:`Deux`,
    hint:`Un enfant est dans la mer, l'autre est sur le sable.`,
    explanation:`Il y a <b>deux enfants</b> : un garçon qui nage dans la mer et une fille debout sur le sable. Quand on décrit une image, on compte les personnages avant de les présenter : « <i>Il y a deux enfants.</i> »` }),

  makeMCQ({ id:`g4fr-img-003`, chapterId:`g4fr-images`, difficulty:1,
    question:`${_G4IMG_CONS1}${_G4IMG_PLAGE}Quel temps fait-il ?`,
    options:[`Il fait beau, le soleil brille`, `Il pleut`, `Il y a un cyclone`, `Il neige`],
    answer:`Il fait beau, le soleil brille`,
    hint:`Regarde le ciel : y a-t-il des nuages gris ?`,
    explanation:`Le ciel est bleu et le <b>soleil brille</b> : <b>il fait beau</b>. Le temps qu'il fait est l'une des premières choses à dire dans une description : <i>il fait beau / il pleut / il fait chaud / il y a du vent</i>.` }),

  makeMCQ({ id:`g4fr-img-004`, chapterId:`g4fr-images`, difficulty:2,
    question:`${_G4IMG_CONS1}${_G4IMG_PLAGE}Que fait le garçon ?`,
    options:[`Il nage dans la mer`, `Il dort sous le palmier`, `Il joue avec le chien`, `Il mange une glace`],
    answer:`Il nage dans la mer`,
    hint:`Regarde où se trouve le garçon : sur le sable ou dans l'eau ?`,
    explanation:`Le garçon est dans l'eau : <b>il nage dans la mer</b>. Pour dire ce que fait un personnage, on utilise le <b>présent</b> : <i>il nage, elle joue, le chien court</i>.` }),

  makeMCQ({ id:`g4fr-img-005`, chapterId:`g4fr-images`, difficulty:2,
    question:`${_G4IMG_CONS1}${_G4IMG_PLAGE}Complète : « Le bateau est ______ la mer. »`,
    options:[`sur`, `sous`, `dans`, `derrière`],
    answer:`sur`,
    hint:`Le bateau flotte : il n'est pas au fond de l'eau.`,
    explanation:`On dit « le bateau est <b>sur</b> la mer » parce qu'il <b>flotte à la surface</b>. Attention : le poisson, lui, est <i>dans</i> la mer. Les prépositions de lieu sont indispensables pour décrire une image : <b>sur, sous, dans, devant, derrière, à côté de, entre</b>.` }),

  makeMCQ({ id:`g4fr-img-006`, chapterId:`g4fr-images`, difficulty:2,
    question:`${_G4IMG_CONS1}${_G4IMG_PLAGE}Combien d'oiseaux volent dans le ciel ?`,
    options:[`Trois`, `Deux`, `Quatre`, `Aucun`],
    answer:`Trois`,
    hint:`Cherche les petites formes grises en haut de l'image.`,
    explanation:`Il y a <b>trois oiseaux</b> dans le ciel. Compter les petits détails est un bon réflexe : les questions de description portent souvent sur ce qu'on ne regarde pas en premier.` }),

  makeMCQ({ id:`g4fr-img-007`, chapterId:`g4fr-images`, difficulty:2,
    question:`${_G4IMG_CONS1}${_G4IMG_PLAGE}Quel animal se trouve sur le sable, à droite de la fille ?`,
    options:[`Un chien`, `Un chat`, `Un cheval`, `Une vache`],
    answer:`Un chien`,
    hint:`C'est l'animal domestique le plus courant à la plage.`,
    explanation:`C'est <b>un chien</b>. Il y a aussi un petit <b>crabe</b> près du palmier. En français, on présente les animaux avec <i>il y a</i> : « <b>Il y a</b> un chien sur le sable. »` }),

  makeMCQ({ id:`g4fr-img-008`, chapterId:`g4fr-images`, difficulty:3,
    question:`${_G4IMG_CONS1}${_G4IMG_PLAGE}Quelle phrase décrit CORRECTEMENT l'image ?`,
    options:[
      `Une fille joue au ballon sur le sable et un garçon nage dans la mer.`,
      `Deux filles nagent dans la mer avec un chien.`,
      `Un garçon dort sous le palmier pendant qu'il pleut.`,
      `Une fille mange un crabe à côté du bateau.`
    ],
    answer:`Une fille joue au ballon sur le sable et un garçon nage dans la mer.`,
    hint:`Vérifie chaque phrase détail par détail : qui, où, quoi.`,
    explanation:`Seule la première phrase correspond à tout ce qu'on voit : la <b>fille + le ballon + le sable</b> et le <b>garçon + la mer</b>. Le mot <b>et</b> relie deux actions dans une même phrase - c'est très utile pour décrire une image sans faire de listes.` }),

  makeMCQ({ id:`g4fr-img-009`, chapterId:`g4fr-images`, difficulty:3,
    question:`${_G4IMG_CONS1}${_G4IMG_PLAGE}Pour commencer une description, quelle phrase est la MEILLEURE ?`,
    options:[
      `Cette image représente une plage ensoleillée à Maurice.`,
      `Le crabe est petit.`,
      `J'aime beaucoup la mer.`,
      `Il y a un ballon.`
    ],
    answer:`Cette image représente une plage ensoleillée à Maurice.`,
    hint:`Une bonne première phrase donne une vue d'ensemble, pas un petit détail.`,
    explanation:`On commence toujours par une <b>vue d'ensemble</b> : <i>où</i> et <i>quelle impression générale</i>. Les détails (le crabe, le ballon) viennent ensuite, et l'opinion personnelle (« j'aime ») se garde pour la <b>fin</b>.` }),

  makeMCQ({ id:`g4fr-img-010`, chapterId:`g4fr-images`, difficulty:4,
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
  makeMCQ({ id:`g4fr-img-011`, chapterId:`g4fr-images`, difficulty:1,
    question:`${_G4IMG_CONS3}${_G4IMG_BALLON}Sur l'image 1, que fait le garçon ?`,
    options:[`Il joue au ballon dans le jardin`, `Il monte à l'échelle`, `Il pleure`, `Il rentre dans la maison`],
    answer:`Il joue au ballon dans le jardin`,
    hint:`Regarde ce qu'il y a à ses pieds, sur l'herbe.`,
    explanation:`Sur l'image 1, le garçon est dans le jardin avec son ballon : <b>il joue au ballon</b>. La première image d'une histoire présente toujours la <b>situation de départ</b> : qui, où, et quoi.` }),

  makeMCQ({ id:`g4fr-img-012`, chapterId:`g4fr-images`, difficulty:2,
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

  makeMCQ({ id:`g4fr-img-013`, chapterId:`g4fr-images`, difficulty:2,
    question:`${_G4IMG_CONS3}${_G4IMG_BALLON}Qui vient aider le garçon sur l'image 3 ?`,
    options:[`Son père, avec une échelle`, `Sa maîtresse`, `Un voisin, avec un chien`, `Personne`],
    answer:`Son père, avec une échelle`,
    hint:`Regarde l'objet en bois appuyé contre l'arbre.`,
    explanation:`Sur l'image 3, <b>son père</b> monte sur une <b>échelle</b> pour attraper le ballon, et le garçon le tient de nouveau. La troisième image est la <b>solution</b> : le problème est réglé.` }),

  makeMCQ({ id:`g4fr-img-014`, chapterId:`g4fr-images`, difficulty:2,
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

  makeMCQ({ id:`g4fr-img-015`, chapterId:`g4fr-images`, difficulty:3,
    question:`${_G4IMG_CONS3}${_G4IMG_BALLON}Quel titre convient le mieux à cette histoire ?`,
    options:[`Le ballon perdu`, `La leçon de mathématiques`, `Le chien de Maya`, `Une journée à la plage`],
    answer:`Le ballon perdu`,
    hint:`Le titre doit résumer le problème principal de l'histoire.`,
    explanation:`<b>« Le ballon perdu »</b> résume le problème et la solution en trois mots. Un bon titre nomme <b>l'objet ou l'événement central</b> - pas un détail, et pas quelque chose qui n'est pas sur les images.` }),

  makeMCQ({ id:`g4fr-img-016`, chapterId:`g4fr-images`, difficulty:3,
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

  makeMCQ({ id:`g4fr-img-017`, chapterId:`g4fr-images`, difficulty:3,
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

  makeTF({ id:`g4fr-img-018`, chapterId:`g4fr-images`, difficulty:2,
    question:`${_G4IMG_CONS3}${_G4IMG_BALLON}Dans une histoire en trois images, la deuxième image montre le problème.`,
    answer:true,
    hint:`Pense à la structure : début, problème, solution.`,
    explanation:`<b>Vrai.</b> La structure habituelle est : <b>image 1 = la situation de départ</b>, <b>image 2 = le problème</b>, <b>image 3 = la solution ou la fin</b>. Repérer cette structure t'aide à savoir quoi écrire pour chaque image.` }),

  makeMCQ({ id:`g4fr-img-019`, chapterId:`g4fr-images`, difficulty:4,
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
