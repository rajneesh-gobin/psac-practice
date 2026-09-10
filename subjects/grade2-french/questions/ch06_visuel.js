'use strict';
// grade2-french - visual bank: images, couleurs, schemas, syllabes.
// IDs: g2fr-co-076..093 · g2fr-eo-076..093 · g2fr-lec-076..093 ·
//      g2fr-ecr-076..093 · g2fr-grm-076..093
// Chaque figure est un <svg> en ligne : muet pour la lecture a voix haute,
// donc l'image ne donne jamais la reponse a l'oreille.

(function () {

const CH_CO  = 'g2fr-comprehension-orale';
const CH_EO  = 'g2fr-expression-orale';
const CH_LEC = 'g2fr-lecture';
const CH_ECR = 'g2fr-ecriture';
const CH_GRM = 'g2fr-grammaire';

// ── Compréhension orale ───────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  // texte_oral (076–081)

  makeMCQ({ id:'g2fr-co-076', chapterId:CH_CO, difficulty:1, subsection:'texte_oral',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une scène dessinée">' +
      '<svg viewBox="0 0 240 140" style="width:100%;max-width:260px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="0" y="98" width="240" height="42" fill="#3B82F6"/>' +
      '<circle cx="202" cy="32" r="18" fill="#FACC15" stroke="#F59E0B" stroke-width="2"/>' +
      '<polygon points="60,98 160,98 145,120 75,120" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<line x1="110" y1="32" x2="110" y2="98" stroke="#111827" stroke-width="3"/>' +
      '<polygon points="114,38 154,92 114,92" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Écoute : « Le bateau avance. Le soleil brille. » Où est le bateau ?',
    options:['Sur la mer','Sur la route','Dans la cour','Sous un arbre'],
    answer:'Sur la mer',
    hint:'Regarde ce qu’il y a tout autour du bateau. (Look at what is all around the boat.)',
    explanation:'Le bateau flotte sur l’eau bleue : il est <b>sur la mer</b>. 🚤 (The boat floats on the blue water: it is on the sea.)' }),

  makeMCQ({ id:'g2fr-co-077', chapterId:CH_CO, difficulty:1, subsection:'texte_oral',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un objet ouvert et des traits qui tombent">' +
      '<svg viewBox="0 0 180 140" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="180" height="140" rx="8" fill="#ffffff"/>' +
      '<path d="M20 70 A70 70 0 0 1 160 70 Z" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<line x1="90" y1="70" x2="90" y2="118" stroke="#111827" stroke-width="3"/>' +
      '<path d="M90 118 A9 9 0 0 0 108 118" fill="none" stroke="#111827" stroke-width="3"/>' +
      '<line x1="34" y1="92" x2="27" y2="114" stroke="#3B82F6" stroke-width="3"/>' +
      '<line x1="58" y1="102" x2="51" y2="124" stroke="#3B82F6" stroke-width="3"/>' +
      '<line x1="122" y1="102" x2="115" y2="124" stroke="#3B82F6" stroke-width="3"/>' +
      '<line x1="146" y1="92" x2="139" y2="114" stroke="#3B82F6" stroke-width="3"/>' +
      '</svg></div>' +
      'Écoute : « Sita ouvre son parapluie avant de sortir. » Quel temps fait-il ?',
    options:['Il pleut','Il neige','Il gèle','Il vente'],
    answer:'Il pleut',
    hint:'Regarde les petits traits bleus qui tombent. (Look at the little blue lines falling down.)',
    explanation:'Les traits bleus sont des gouttes : <b>il pleut</b>. ☔ (The blue lines are raindrops: it is raining.)' }),

  makeMCQ({ id:'g2fr-co-078', chapterId:CH_CO, difficulty:1, subsection:'texte_oral',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une maison dessinée">' +
      '<svg viewBox="0 0 200 150" style="width:100%;max-width:220px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="150" rx="8" fill="#ffffff"/>' +
      '<polygon points="20,70 100,25 180,70" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<rect x="35" y="70" width="130" height="70" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<rect x="88" y="98" width="26" height="42" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="48" y="82" width="28" height="26" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="126" y="82" width="28" height="26" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Écoute : « Voici la maison de Ravi. » Combien de fenêtres a la maison ?',
    options:['2','1','3','4'],
    answer:'2',
    hint:'Compte les carrés bleus sur le mur. (Count the blue squares on the wall.)',
    explanation:'Il y a <b>2 fenêtres</b>, une de chaque côté de la porte. 🏠 (There are 2 windows, one on each side of the door.)' }),

  makeMCQ({ id:'g2fr-co-079', chapterId:CH_CO, difficulty:1, subsection:'texte_oral',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un panier et deux objets à côté">' +
      '<svg viewBox="0 0 210 140" style="width:100%;max-width:230px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="210" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="18" y="72" width="72" height="56" rx="6" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<path d="M34 72 A20 20 0 0 1 74 72" fill="none" stroke="#111827" stroke-width="3"/>' +
      '<ellipse cx="126" cy="106" rx="32" ry="18" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="162" y="58" width="30" height="52" rx="5" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<rect x="170" y="44" width="14" height="16" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Écoute : « Sita revient du marché. Elle a acheté du pain et du lait. » Qu’a-t-elle acheté ?',
    options:['Du pain et du lait','Du pain et du riz','Du riz et du lait','Du thé et du pain'],
    answer:'Du pain et du lait',
    hint:'Écoute bien la fin de la phrase. (Listen carefully to the end of the sentence.)',
    explanation:'Sita a acheté <b>du pain et du lait</b>. 🥖🥛 (Sita bought bread and milk.)' }),

  makeMCQ({ id:'g2fr-co-080', chapterId:CH_CO, difficulty:2, subsection:'texte_oral',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un arbre avec des fruits">' +
      '<svg viewBox="0 0 180 160" style="width:100%;max-width:190px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="180" height="160" rx="8" fill="#ffffff"/>' +
      '<rect x="82" y="95" width="16" height="55" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="90" cy="65" r="52" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="66" cy="60" r="11" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="112" cy="52" r="11" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="96" cy="88" r="11" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Écoute : « L’arbre porte ses mangues. Le vent en fait tomber une. » Combien de mangues restent sur l’arbre ?',
    options:['2','3','1','4'],
    answer:'2',
    hint:'Compte les mangues, puis enlève celle qui tombe. (Count the mangoes, then take away the one that falls.)',
    explanation:'Il y a 3 mangues et 1 tombe : il en reste <b>2</b>. 🥭 (There are 3 mangoes and 1 falls: 2 are left.)' }),

  makeMCQ({ id:'g2fr-co-081', chapterId:CH_CO, difficulty:1, subsection:'texte_oral',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un meuble et un objet dessinés">' +
      '<svg viewBox="0 0 180 150" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="180" height="150" rx="8" fill="#ffffff"/>' +
      '<rect x="50" y="25" width="12" height="75" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="50" y="88" width="82" height="12" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="52" y="100" width="8" height="40" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="122" y="100" width="8" height="40" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="80" y="112" width="28" height="20" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="94" cy="133" rx="30" ry="7" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Écoute : « Où est passé mon chapeau ? » Regarde l’image : où est le chapeau ?',
    options:['Sous la chaise','Sur la chaise','Sous la table','Sur la table'],
    answer:'Sous la chaise',
    hint:'Le chapeau est-il au-dessus ou en dessous du siège ? (Is the hat above or below the seat?)',
    explanation:'Le chapeau est <b>sous la chaise</b>, en dessous du siège. 🎩 (The hat is under the chair, below the seat.)' }),

  // sequence_evenements (082–087)

  makeMCQ({ id:'g2fr-co-082', chapterId:CH_CO, difficulty:2, subsection:'sequence_evenements',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="trois images marquées A, B et C">' +
      '<svg viewBox="0 0 300 130" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="8" y="8" width="86" height="92" rx="8" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="2"/>' +
      '<rect x="107" y="8" width="86" height="92" rx="8" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="2"/>' +
      '<rect x="206" y="8" width="86" height="92" rx="8" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="2"/>' +
      '<ellipse cx="51" cy="58" rx="11" ry="15" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<line x1="150" y1="92" x2="150" y2="52" stroke="#22C55E" stroke-width="4"/>' +
      '<circle cx="140" cy="38" r="9" fill="#EC4899" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="160" cy="38" r="9" fill="#EC4899" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="150" cy="26" r="9" fill="#EC4899" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="150" cy="40" r="7" fill="#FACC15" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="249" y1="92" x2="249" y2="62" stroke="#22C55E" stroke-width="4"/>' +
      '<ellipse cx="236" cy="62" rx="12" ry="6" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<ellipse cx="262" cy="62" rx="12" ry="6" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="51" y="120" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">A</text>' +
      '<text x="150" y="120" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">B</text>' +
      '<text x="249" y="120" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">C</text>' +
      '</svg></div>' +
      'A : une graine · B : une fleur · C : une jeune pousse. Dans quel ordre la plante grandit-elle ?',
    options:['A, C, B','A, B, C','C, A, B','B, C, A'],
    answer:'A, C, B',
    hint:'Tout commence sous la terre. (Everything starts under the ground.)',
    explanation:'La graine (A) devient une pousse (C), puis une fleur (B) : <b>A, C, B</b>. 🌱 (The seed becomes a shoot, then a flower.)' }),

  makeMCQ({ id:'g2fr-co-083', chapterId:CH_CO, difficulty:2, subsection:'sequence_evenements',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="quatre objets de hauteurs différentes marqués A, B, C et D">' +
      '<svg viewBox="0 0 300 140" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="30" y="70" width="24" height="40" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="42,56 48,70 36,70" fill="#F97316" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="100" y="96" width="24" height="14" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="112,82 118,96 106,96" fill="#F97316" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="170" y="50" width="24" height="60" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="182,36 188,50 176,50" fill="#F97316" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="240" y="84" width="24" height="26" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="252,70 258,84 246,84" fill="#F97316" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="42" y="132" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">A</text>' +
      '<text x="112" y="132" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">B</text>' +
      '<text x="182" y="132" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">C</text>' +
      '<text x="252" y="132" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">D</text>' +
      '</svg></div>' +
      'Ce sont quatre bougies allumées. Quelle image vient en premier ?',
    options:['C','A','B','D'],
    answer:'C',
    hint:'Une bougie qui vient d’être allumée est encore entière. (A candle that has just been lit is still whole.)',
    explanation:'La bougie <b>C</b> est la plus haute : elle a brûlé le moins longtemps. 🕯️ (Candle C is the tallest, so it has burned the least.)' }),

  makeMCQ({ id:'g2fr-co-084', chapterId:CH_CO, difficulty:2, subsection:'sequence_evenements',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="quatre récipients contenant des quantités différentes, marqués A, B, C et D">' +
      '<svg viewBox="0 0 300 130" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="27" y="46" width="26" height="52" fill="#F97316"/>' +
      '<polygon points="20,42 60,42 54,100 26,100" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="90,42 130,42 124,100 96,100" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<rect x="167" y="60" width="26" height="38" fill="#F97316"/>' +
      '<polygon points="160,42 200,42 194,100 166,100" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<rect x="237" y="72" width="26" height="26" fill="#F97316"/>' +
      '<polygon points="230,42 270,42 264,100 236,100" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<text x="40" y="122" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">A</text>' +
      '<text x="110" y="122" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">B</text>' +
      '<text x="180" y="122" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">C</text>' +
      '<text x="250" y="122" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">D</text>' +
      '</svg></div>' +
      'Ravi boit son jus petit à petit. Quelle image vient en dernier ?',
    options:['B','A','C','D'],
    answer:'B',
    hint:'À la fin, il ne reste plus rien à boire. (At the end there is nothing left to drink.)',
    explanation:'Le verre <b>B</b> est vide : c’est la dernière image. 🥤 (Glass B is empty, so it comes last.)' }),

  makeMCQ({ id:'g2fr-co-085', chapterId:CH_CO, difficulty:2, subsection:'sequence_evenements',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="trois cases, celle du milieu porte un point d’interrogation">' +
      '<svg viewBox="0 0 300 130" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="8" y="12" width="86" height="98" rx="8" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="2"/>' +
      '<rect x="107" y="12" width="86" height="98" rx="8" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="2"/>' +
      '<rect x="206" y="12" width="86" height="98" rx="8" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="2"/>' +
      '<rect x="47" y="82" width="8" height="24" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="51" cy="72" r="16" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<text x="150" y="78" font-size="44" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">?</text>' +
      '<rect x="245" y="72" width="12" height="34" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="251" cy="56" r="32" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Un arbre grandit. Il manque l’image du milieu. Que montre-t-elle ?',
    options:['Un arbre moyen','Un arbre coupé','Une petite fleur','Une grande maison'],
    answer:'Un arbre moyen',
    hint:'Entre tout petit et très grand, il y a une étape. (Between very small and very big there is a step.)',
    explanation:'Au milieu, l’arbre est déjà plus grand mais pas encore adulte : c’est <b>un arbre moyen</b>. 🌳 (In the middle the tree is bigger but not yet full grown.)' }),

  makeMCQ({ id:'g2fr-co-086', chapterId:CH_CO, difficulty:2, subsection:'sequence_evenements',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="quatre petits dessins marqués A, B, C et D">' +
      '<svg viewBox="0 0 300 140" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="140" rx="8" fill="#ffffff"/>' +
      '<ellipse cx="42" cy="70" rx="32" ry="14" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="98" cy="66" r="16" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="120" cy="60" r="20" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="142" cy="66" r="16" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<path d="M176 66 A32 32 0 0 1 240 66 Z" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<line x1="208" y1="66" x2="208" y2="96" stroke="#111827" stroke-width="3"/>' +
      '<circle cx="268" cy="60" r="18" fill="#FACC15" stroke="#F59E0B" stroke-width="2"/>' +
      '<line x1="268" y1="28" x2="268" y2="38" stroke="#F59E0B" stroke-width="3"/>' +
      '<line x1="292" y1="60" x2="282" y2="60" stroke="#F59E0B" stroke-width="3"/>' +
      '<text x="42" y="124" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">A</text>' +
      '<text x="120" y="124" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">B</text>' +
      '<text x="208" y="124" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">C</text>' +
      '<text x="268" y="124" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">D</text>' +
      '</svg></div>' +
      'Ces images racontent un jour de pluie. Quelle image ne va pas avec les autres ?',
    options:['D','A','B','C'],
    answer:'D',
    hint:'Cherche celle qui parle de beau temps. (Look for the one that shows fine weather.)',
    explanation:'La flaque, le nuage gris et le parapluie parlent de pluie. Le soleil <b>D</b> ne va pas avec eux. ☀️ (The puddle, grey cloud and umbrella all mean rain; the sun does not fit.)' }),

  makeMCQ({ id:'g2fr-co-087', chapterId:CH_CO, difficulty:1, subsection:'sequence_evenements',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une forme grise au-dessus d’une maison">' +
      '<svg viewBox="0 0 220 150" style="width:100%;max-width:240px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="150" rx="8" fill="#ffffff"/>' +
      '<circle cx="72" cy="48" r="22" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="108" cy="38" r="28" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="144" cy="48" r="22" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="58,112 108,82 158,112" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<rect x="70" y="112" width="76" height="34" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Le ciel est tout gris au-dessus de la maison. Que va-t-il se passer après ?',
    options:['Il va pleuvoir','Il va neiger','Il va geler','Le vent tombe'],
    answer:'Il va pleuvoir',
    hint:'À Maurice, un gros nuage gris annonce quelque chose. (In Mauritius a big grey cloud announces something.)',
    explanation:'Un gros nuage gris annonce la pluie : <b>il va pleuvoir</b>. 🌧️ (A big grey cloud means rain is coming.)' }),

  // vocabulaire (088–093)

  makeMCQ({ id:'g2fr-co-088', chapterId:CH_CO, difficulty:1, subsection:'vocabulaire',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un objet coloré avec une longue queue">' +
      '<svg viewBox="0 0 180 165" style="width:100%;max-width:190px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="180" height="165" rx="8" fill="#ffffff"/>' +
      '<polygon points="90,15 125,60 90,112 55,60" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
      '<line x1="90" y1="15" x2="90" y2="112" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="55" y1="60" x2="125" y2="60" stroke="#111827" stroke-width="1.5"/>' +
      '<path d="M90 112 Q102 128 86 138 Q74 148 92 158" fill="none" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Comment s’appelle cet objet en français ?',
    options:['un cerf-volant','un parapluie','un bateau','un ballon'],
    answer:'un cerf-volant',
    hint:'On le fait voler dans le vent, au bord de la mer. (You fly it in the wind, by the sea.)',
    explanation:'C’est <b>un cerf-volant</b> : un losange de papier avec une queue. 🪁 (It is a kite: a paper diamond with a tail.)' }),

  makeMCQ({ id:'g2fr-co-089', chapterId:CH_CO, difficulty:2, subsection:'vocabulaire',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une rangée de ronds colorés, le dernier porte un point d’interrogation">' +
      '<svg viewBox="0 0 300 80" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="80" rx="8" fill="#ffffff"/>' +
      '<circle cx="35" cy="40" r="20" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="95" cy="40" r="20" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="155" cy="40" r="20" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="215" cy="40" r="20" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="275" cy="40" r="20" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<text x="275" y="49" font-size="24" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">?</text>' +
      '</svg></div>' +
      'Regarde les perles. Quelle couleur vient ensuite ?',
    options:['Rouge','Bleu','Vert','Jaune'],
    answer:'Rouge',
    hint:'Répète tout haut : rouge, bleu, rouge, bleu… (Say it out loud: red, blue, red, blue…)',
    explanation:'La suite fait rouge, bleu, rouge, bleu, donc la perle suivante est <b>rouge</b>. 🔴 (The pattern is red, blue, red, blue, so the next bead is red.)' }),

  makeMCQ({ id:'g2fr-co-090', chapterId:CH_CO, difficulty:1, subsection:'vocabulaire',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une forme allongée avec un trait au milieu">' +
      '<svg viewBox="0 0 180 130" style="width:100%;max-width:190px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="180" height="130" rx="8" fill="#ffffff"/>' +
      '<path d="M90 15 Q140 62 90 112 Q40 62 90 15 Z" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<line x1="90" y1="20" x2="90" y2="108" stroke="#111827" stroke-width="2"/>' +
      '<line x1="90" y1="45" x2="112" y2="38" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="90" y1="45" x2="68" y2="38" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="90" y1="72" x2="112" y2="65" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="90" y1="72" x2="68" y2="65" stroke="#111827" stroke-width="1.5"/>' +
      '</svg></div>' +
      'De quelle couleur est cette feuille ?',
    options:['Verte','Rouge','Jaune','Grise'],
    answer:'Verte',
    hint:'C’est la couleur des arbres et de l’herbe. (It is the colour of trees and grass.)',
    explanation:'La feuille est <b>verte</b>. On dit « une feuille verte » parce que « feuille » est féminin. 🍃 (The leaf is green — feminine, so « verte » with an e.)' }),

  makeMCQ({ id:'g2fr-co-091', chapterId:CH_CO, difficulty:1, subsection:'vocabulaire',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="quatre objets marqués A, B, C et D">' +
      '<svg viewBox="0 0 300 130" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="130" rx="8" fill="#ffffff"/>' +
      '<ellipse cx="40" cy="58" rx="30" ry="15" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="40" cy="58" rx="18" ry="8" fill="none" stroke="#9CA3AF" stroke-width="2"/>' +
      '<rect x="105" y="22" width="16" height="58" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="105,80 121,80 113,95" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="188" cy="58" r="26" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<rect x="244" y="36" width="34" height="42" rx="4" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<path d="M278 46 A11 11 0 0 1 278 68" fill="none" stroke="#111827" stroke-width="3"/>' +
      '<text x="40" y="116" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">A</text>' +
      '<text x="113" y="116" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">B</text>' +
      '<text x="188" y="116" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">C</text>' +
      '<text x="261" y="116" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">D</text>' +
      '</svg></div>' +
      'Quel objet sert à écrire ?',
    options:['B','A','C','D'],
    answer:'B',
    hint:'Cherche l’objet long avec une pointe. (Look for the long object with a point.)',
    explanation:'L’objet <b>B</b> est un crayon : c’est avec lui qu’on écrit. ✏️ (Object B is a pencil — that is what you write with.)' }),

  makeMCQ({ id:'g2fr-co-092', chapterId:CH_CO, difficulty:2, subsection:'vocabulaire',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une rangée de ronds violets">' +
      '<svg viewBox="0 0 240 70" style="width:100%;max-width:250px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="70" rx="8" fill="#ffffff"/>' +
      '<circle cx="60" cy="35" r="20" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="120" cy="35" r="20" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="180" cy="35" r="20" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Chaque rond est un battement de syllabe. Quel mot a autant de syllabes qu’il y a de ronds ?',
    options:['la banane','le cahier','le pain','la maison'],
    answer:'la banane',
    hint:'Tape dans tes mains pour chaque mot. (Clap your hands for each word.)',
    explanation:'Il y a 3 ronds. <b>ba-na-ne</b> fait 3 battements ; cahier et maison en font 2, pain 1. 🍌 (Three beats: ba-na-ne.)' }),

  makeMCQ({ id:'g2fr-co-093', chapterId:CH_CO, difficulty:1, subsection:'vocabulaire',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="trois objets dessinés côte à côte">' +
      '<svg viewBox="0 0 260 120" style="width:100%;max-width:280px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="120" rx="8" fill="#ffffff"/>' +
      '<ellipse cx="52" cy="62" rx="38" ry="18" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="52" cy="62" rx="22" ry="9" fill="none" stroke="#9CA3AF" stroke-width="2"/>' +
      '<polygon points="118,32 156,32 150,90 124,90" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<rect x="124" y="58" width="26" height="30" fill="#F97316"/>' +
      '<ellipse cx="212" cy="44" rx="14" ry="9" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<line x1="212" y1="53" x2="212" y2="92" stroke="#9CA3AF" stroke-width="6"/>' +
      '</svg></div>' +
      'Une assiette, un verre et une cuillère. Où trouve-t-on ces objets ?',
    options:['Dans la cuisine','Dans le jardin','Dans la classe','Dans la voiture'],
    answer:'Dans la cuisine',
    hint:'Pense à la pièce où l’on mange et où l’on cuisine. (Think of the room where you eat and cook.)',
    explanation:'L’assiette, le verre et la cuillère sont <b>dans la cuisine</b>. 🍽️ (The plate, glass and spoon are in the kitchen.)' })

);

// ── Expression orale ──────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  // description_images (076–081)

  makeMCQ({ id:'g2fr-eo-076', chapterId:CH_EO, difficulty:1, subsection:'description_images',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une maison dessinée avec une porte et deux fenêtres">' +
      '<svg viewBox="0 0 200 150" style="width:100%;max-width:220px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="150" rx="8" fill="#ffffff"/>' +
      '<polygon points="20,70 100,25 180,70" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="35" y="70" width="130" height="70" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<rect x="88" y="98" width="28" height="42" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<rect x="48" y="82" width="26" height="24" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="128" y="82" width="26" height="24" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Décris l’image. De quelle couleur est la porte ?',
    options:['Rouge','Bleue','Verte','Jaune'],
    answer:'Rouge',
    hint:'La porte est la grande ouverture au milieu du mur. (The door is the big opening in the middle of the wall.)',
    explanation:'La porte est <b>rouge</b>. On dit « la porte est rouge » — rouge ne change pas au féminin. 🚪 (The door is red.)' }),

  makeMCQ({ id:'g2fr-eo-077', chapterId:CH_EO, difficulty:1, subsection:'description_images',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une scène dessinée dans une zone bleue">' +
      '<svg viewBox="0 0 240 130" style="width:100%;max-width:260px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="20" width="220" height="100" rx="8" fill="#3B82F6"/>' +
      '<ellipse cx="120" cy="70" rx="46" ry="26" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="74,70 44,50 44,90" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="146" cy="62" r="5" fill="#111827"/>' +
      '<path d="M120 52 Q132 60 120 68" fill="none" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Que vois-tu sur cette image ?',
    options:['Un poisson dans l’eau','Un oiseau dans le ciel','Un ballon sur l’herbe','Un bateau sur la mer'],
    answer:'Un poisson dans l’eau',
    hint:'Regarde la couleur du fond : bleu comme la mer. (Look at the background colour: blue like the sea.)',
    explanation:'C’est <b>un poisson dans l’eau</b> : un corps ovale et une queue en triangle. 🐟 (It is a fish in the water.)' }),

  makeMCQ({ id:'g2fr-eo-078', chapterId:CH_EO, difficulty:1, subsection:'description_images',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un panier contenant des fruits">' +
      '<svg viewBox="0 0 220 150" style="width:100%;max-width:240px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="150" rx="8" fill="#ffffff"/>' +
      '<circle cx="72" cy="62" r="16" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="110" cy="54" r="16" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="148" cy="62" r="16" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="91" cy="82" r="16" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="129" cy="82" r="16" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="46,80 174,80 158,138 62,138" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<line x1="60" y1="96" x2="160" y2="96" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="66" y1="116" x2="154" y2="116" stroke="#111827" stroke-width="1.5"/>' +
      '</svg></div>' +
      'Combien de mangues y a-t-il dans le panier ?',
    options:['5','4','6','3'],
    answer:'5',
    hint:'Compte les fruits un par un avec ton doigt. (Count the fruits one by one with your finger.)',
    explanation:'Il y a <b>5 mangues</b> : 3 derrière et 2 devant. 🥭 (There are 5 mangoes: 3 behind and 2 in front.)' }),

  makeMCQ({ id:'g2fr-eo-079', chapterId:CH_EO, difficulty:1, subsection:'description_images',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un meuble avec deux objets posés dessus">' +
      '<svg viewBox="0 0 240 150" style="width:100%;max-width:260px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="150" rx="8" fill="#ffffff"/>' +
      '<ellipse cx="80" cy="86" rx="38" ry="12" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="80" cy="86" rx="22" ry="6" fill="none" stroke="#9CA3AF" stroke-width="2"/>' +
      '<polygon points="150,44 186,44 180,88 156,88" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<rect x="156" y="62" width="24" height="26" fill="#F97316"/>' +
      '<rect x="20" y="90" width="200" height="12" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="34" y="102" width="12" height="40" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="194" y="102" width="12" height="40" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Qu’y a-t-il sur la table ?',
    options:['Un verre et une assiette','Un verre et une cuillère','Une tasse et une assiette','Une tasse et une cuillère'],
    answer:'Un verre et une assiette',
    hint:'Un objet est plat et rond, l’autre est haut. (One object is flat and round, the other is tall.)',
    explanation:'Sur la table il y a <b>un verre et une assiette</b>. 🍽️ (On the table there is a glass and a plate.)' }),

  makeMCQ({ id:'g2fr-eo-080', chapterId:CH_EO, difficulty:1, subsection:'description_images',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une boîte et une balle dessinées">' +
      '<svg viewBox="0 0 220 150" style="width:100%;max-width:240px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="150" rx="8" fill="#ffffff"/>' +
      '<circle cx="110" cy="56" r="24" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<path d="M88 46 Q110 62 132 46" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<rect x="58" y="80" width="104" height="58" rx="4" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<line x1="58" y1="100" x2="162" y2="100" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Où est le ballon ?',
    options:['Sur la boîte','Sous la boîte','Dans la boîte','Près du mur'],
    answer:'Sur la boîte',
    hint:'Le ballon est-il au-dessus ou en dessous ? (Is the ball above or below?)',
    explanation:'Le ballon est posé <b>sur la boîte</b>, tout en haut. ⚽ (The ball sits on top of the box.)' }),

  makeMCQ({ id:'g2fr-eo-081', chapterId:CH_EO, difficulty:2, subsection:'description_images',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="deux éléments dessinés côte à côte">' +
      '<svg viewBox="0 0 280 150" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="280" height="150" rx="8" fill="#ffffff"/>' +
      '<rect x="62" y="88" width="14" height="52" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="69" cy="62" r="38" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="140,78 200,42 260,78" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<rect x="152" y="78" width="96" height="62" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<rect x="188" y="104" width="24" height="36" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Où est l’arbre ?',
    options:['À côté de la maison','Devant la voiture','Derrière le bateau','Sous la table'],
    answer:'À côté de la maison',
    hint:'L’arbre est-il devant, derrière, ou juste à gauche de la maison ? (Is the tree in front, behind, or just to the left of the house?)',
    explanation:'L’arbre est <b>à côté de la maison</b>, à sa gauche. 🌳🏠 (The tree is next to the house, on its left.)' }),

  // recit_simple (082–087)

  makeMCQ({ id:'g2fr-eo-082', chapterId:CH_EO, difficulty:2, subsection:'recit_simple',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="trois images du ciel marquées A, B et C">' +
      '<svg viewBox="0 0 300 130" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="8" y="8" width="86" height="92" rx="8" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="2"/>' +
      '<rect x="107" y="8" width="86" height="92" rx="8" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="2"/>' +
      '<rect x="206" y="8" width="86" height="92" rx="8" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="2"/>' +
      '<ellipse cx="51" cy="40" rx="30" ry="15" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<line x1="34" y1="60" x2="30" y2="82" stroke="#3B82F6" stroke-width="3"/>' +
      '<line x1="51" y1="60" x2="47" y2="82" stroke="#3B82F6" stroke-width="3"/>' +
      '<line x1="68" y1="60" x2="64" y2="82" stroke="#3B82F6" stroke-width="3"/>' +
      '<rect x="115" y="16" width="70" height="76" rx="6" fill="#BFDBFE"/>' +
      '<circle cx="150" cy="52" r="20" fill="#FACC15" stroke="#F59E0B" stroke-width="2"/>' +
      '<ellipse cx="249" cy="52" rx="34" ry="18" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<text x="51" y="120" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">A</text>' +
      '<text x="150" y="120" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">B</text>' +
      '<text x="249" y="120" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">C</text>' +
      '</svg></div>' +
      'A : il pleut · B : le ciel bleu et le soleil · C : un gros nuage gris. Dans quel ordre la journée se passe-t-elle ?',
    options:['B, C, A','A, B, C','C, B, A','A, C, B'],
    answer:'B, C, A',
    hint:'D’abord le beau temps, puis le nuage arrive. (First the fine weather, then the cloud arrives.)',
    explanation:'Le soleil (B), puis le nuage gris (C), puis la pluie (A) : <b>B, C, A</b>. 🌤️🌧️ (Sun, then grey cloud, then rain.)' }),

  makeMCQ({ id:'g2fr-eo-083', chapterId:CH_EO, difficulty:1, subsection:'recit_simple',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une maison sous une forme grise avec des traits">' +
      '<svg viewBox="0 0 240 160" style="width:100%;max-width:250px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="160" rx="8" fill="#ffffff"/>' +
      '<ellipse cx="120" cy="34" rx="72" ry="24" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<line x1="70" y1="62" x2="64" y2="84" stroke="#3B82F6" stroke-width="3"/>' +
      '<line x1="102" y1="62" x2="96" y2="84" stroke="#3B82F6" stroke-width="3"/>' +
      '<line x1="138" y1="62" x2="132" y2="84" stroke="#3B82F6" stroke-width="3"/>' +
      '<line x1="170" y1="62" x2="164" y2="84" stroke="#3B82F6" stroke-width="3"/>' +
      '<polygon points="62,112 120,80 178,112" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<rect x="76" y="112" width="88" height="42" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<rect x="110" y="128" width="22" height="26" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Raconte cette image en une phrase. Laquelle convient ?',
    options:['Il pleut sur la maison','Il neige sur la maison','Le soleil brille fort','Le vent souffle fort'],
    answer:'Il pleut sur la maison',
    hint:'Les traits bleus tombent du nuage. (The blue lines fall from the cloud.)',
    explanation:'Le nuage gris laisse tomber des gouttes : <b>il pleut sur la maison</b>. 🌧️ (The grey cloud drops raindrops on the house.)' }),

  makeMCQ({ id:'g2fr-eo-084', chapterId:CH_EO, difficulty:2, subsection:'recit_simple',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="trois images de briques marquées A, B et C">' +
      '<svg viewBox="0 0 300 130" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="8" y="8" width="86" height="92" rx="8" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="2"/>' +
      '<rect x="107" y="8" width="86" height="92" rx="8" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="2"/>' +
      '<rect x="206" y="8" width="86" height="92" rx="8" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="2"/>' +
      '<rect x="30" y="74" width="42" height="18" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="129" y="74" width="42" height="18" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="129" y="54" width="42" height="18" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="129" y="34" width="42" height="18" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="129" y="14" width="42" height="18" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="228" y="74" width="42" height="18" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="228" y="54" width="42" height="18" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<text x="51" y="120" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">A</text>' +
      '<text x="150" y="120" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">B</text>' +
      '<text x="249" y="120" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">C</text>' +
      '</svg></div>' +
      'On construit un mur de briques. Dans quel ordre ?',
    options:['A, C, B','A, B, C','B, C, A','C, A, B'],
    answer:'A, C, B',
    hint:'On pose les briques une par une, de la plus petite pile à la plus haute. (Bricks are laid one by one, from the smallest pile to the tallest.)',
    explanation:'1 brique (A), puis 2 briques (C), puis le mur de 4 briques (B) : <b>A, C, B</b>. 🧱 (One brick, then two, then the finished wall.)' }),

  makeMCQ({ id:'g2fr-eo-085', chapterId:CH_EO, difficulty:2, subsection:'recit_simple',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une scène avec un arbre, une échelle et un récipient">' +
      '<svg viewBox="0 0 260 170" style="width:100%;max-width:270px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="170" rx="8" fill="#ffffff"/>' +
      '<rect x="96" y="86" width="16" height="60" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="104" cy="60" r="46" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="82" cy="52" r="10" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="122" cy="46" r="10" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="110" cy="80" r="10" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<line x1="140" y1="146" x2="160" y2="46" stroke="#92400E" stroke-width="4"/>' +
      '<line x1="160" y1="146" x2="180" y2="46" stroke="#92400E" stroke-width="4"/>' +
      '<line x1="146" y1="118" x2="166" y2="118" stroke="#92400E" stroke-width="3"/>' +
      '<line x1="150" y1="94" x2="170" y2="94" stroke="#92400E" stroke-width="3"/>' +
      '<line x1="154" y1="70" x2="174" y2="70" stroke="#92400E" stroke-width="3"/>' +
      '<polygon points="196,110 252,110 244,150 204,150" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="214" cy="104" r="9" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="234" cy="104" r="9" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Quel titre convient à cette image ?',
    options:['La cueillette des fruits','La visite au marché','La pêche en bateau','Le voyage en autobus'],
    answer:'La cueillette des fruits',
    hint:'À quoi sert l’échelle posée contre l’arbre ? (What is the ladder against the tree for?)',
    explanation:'L’échelle sert à monter dans l’arbre et le panier reçoit les mangues : c’est <b>la cueillette des fruits</b>. 🪜🥭 (The ladder and basket show fruit picking.)' }),

  makeMCQ({ id:'g2fr-eo-086', chapterId:CH_EO, difficulty:2, subsection:'recit_simple',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un objet penché et une tache au sol">' +
      '<svg viewBox="0 0 220 140" style="width:100%;max-width:240px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="112" width="200" height="8" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="46,64 82,52 96,96 60,108" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="146" cy="106" rx="48" ry="10" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<path d="M96 90 Q118 96 130 104" fill="none" stroke="#3B82F6" stroke-width="4"/>' +
      '</svg></div>' +
      'Que s’est-il passé ?',
    options:['Le verre est tombé','Le verre est plein','Le verre est propre','Le verre est neuf'],
    answer:'Le verre est tombé',
    hint:'Le verre est-il debout ou couché ? (Is the glass standing up or lying down?)',
    explanation:'Le verre est couché et le jus a coulé sur la table : <b>le verre est tombé</b>. 💧 (The glass is on its side and the drink has spilled.)' }),

  makeMCQ({ id:'g2fr-eo-087', chapterId:CH_EO, difficulty:1, subsection:'recit_simple',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une pièce dessinée avec du mobilier">' +
      '<svg viewBox="0 0 260 150" style="width:100%;max-width:280px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="150" rx="8" fill="#ffffff"/>' +
      '<rect x="26" y="14" width="128" height="72" rx="4" fill="#22C55E" stroke="#92400E" stroke-width="5"/>' +
      '<line x1="44" y1="40" x2="118" y2="40" stroke="#ffffff" stroke-width="3"/>' +
      '<line x1="44" y1="58" x2="102" y2="58" stroke="#ffffff" stroke-width="3"/>' +
      '<rect x="60" y="104" width="150" height="10" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="72" y="114" width="10" height="30" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="188" y="114" width="10" height="30" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="112" y="88" width="48" height="16" rx="2" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<line x1="136" y1="88" x2="136" y2="104" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Où se passe cette histoire ?',
    options:['À l’école','À la plage','Au marché','À la maison'],
    answer:'À l’école',
    hint:'Cherche le grand tableau vert accroché au mur. (Look for the big green board on the wall.)',
    explanation:'Le tableau, la table et le cahier montrent une salle de classe : c’est <b>à l’école</b>. 🏫 (The board, desk and exercise book show a classroom.)' }),

  // questions_reponses (088–093)

  makeMCQ({ id:'g2fr-eo-088', chapterId:CH_EO, difficulty:2, subsection:'questions_reponses',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un cadran rond avec des chiffres et deux aiguilles">' +
      '<svg viewBox="0 0 160 160" style="width:100%;max-width:180px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="160" height="160" rx="8" fill="#ffffff"/>' +
      '<circle cx="80" cy="80" r="66" fill="#ffffff" stroke="#111827" stroke-width="3"/>' +
      '<text x="80" y="35" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">12</text>' +
      '<text x="105" y="42" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">1</text>' +
      '<text x="123" y="60" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">2</text>' +
      '<text x="130" y="85" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">3</text>' +
      '<text x="123" y="110" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">4</text>' +
      '<text x="105" y="128" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">5</text>' +
      '<text x="80" y="135" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">6</text>' +
      '<text x="55" y="128" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">7</text>' +
      '<text x="37" y="110" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">8</text>' +
      '<text x="30" y="85" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">9</text>' +
      '<text x="37" y="60" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">10</text>' +
      '<text x="55" y="42" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">11</text>' +
      '<line x1="80" y1="80" x2="45" y2="100" stroke="#111827" stroke-width="5"/>' +
      '<line x1="80" y1="80" x2="80" y2="28" stroke="#EF4444" stroke-width="3"/>' +
      '<circle cx="80" cy="80" r="4" fill="#111827"/>' +
      '</svg></div>' +
      'Quelle heure est-il ?',
    options:['Il est huit heures','Il est neuf heures','Il est six heures','Il est deux heures'],
    answer:'Il est huit heures',
    hint:'La petite aiguille noire donne l’heure. (The short black hand gives the hour.)',
    explanation:'La grande aiguille est sur le 12 et la petite sur le 8 : <b>il est huit heures</b>. 🕗 (The big hand is on 12 and the small hand on 8.)' }),

  makeMCQ({ id:'g2fr-eo-089', chapterId:CH_EO, difficulty:1, subsection:'questions_reponses',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="deux boîtes contenant des balles, marquées A et B">' +
      '<svg viewBox="0 0 280 145" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="280" height="145" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="42" width="100" height="72" rx="6" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="46" cy="90" r="15" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="80" cy="90" r="15" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="63" cy="62" r="15" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="160" y="42" width="100" height="72" rx="6" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="184" cy="94" r="14" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="212" cy="94" r="14" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="240" cy="94" r="14" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="198" cy="66" r="14" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="226" cy="66" r="14" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<text x="70" y="136" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">A</text>' +
      '<text x="210" y="136" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">B</text>' +
      '</svg></div>' +
      'Quelle boîte a le plus de balles ?',
    options:['La boîte B','La boîte A','Les deux','Aucune boîte'],
    answer:'La boîte B',
    hint:'Compte les balles dans chaque boîte, puis compare. (Count the balls in each box, then compare.)',
    explanation:'La boîte A a 3 balles et la boîte B en a 5 : <b>la boîte B</b> en a le plus. (Box A has 3 balls, box B has 5.)' }),

  makeMCQ({ id:'g2fr-eo-090', chapterId:CH_EO, difficulty:1, subsection:'questions_reponses',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une boîte décorée avec un ruban">' +
      '<svg viewBox="0 0 180 150" style="width:100%;max-width:190px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="180" height="150" rx="8" fill="#ffffff"/>' +
      '<rect x="36" y="58" width="108" height="76" rx="4" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
      '<rect x="82" y="58" width="16" height="76" fill="#FACC15" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="36" y="84" width="108" height="16" fill="#FACC15" stroke="#111827" stroke-width="1.5"/>' +
      '<ellipse cx="70" cy="46" rx="18" ry="11" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="110" cy="46" rx="18" ry="11" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Ton ami t’offre ce cadeau. Que lui dis-tu ?',
    options:['Merci beaucoup','S’il te plaît','Au revoir','Bonjour'],
    answer:'Merci beaucoup',
    hint:'Que dit-on quand on reçoit quelque chose ? (What do you say when you receive something?)',
    explanation:'Quand on reçoit un cadeau, on dit <b>merci beaucoup</b>. 🎁 (When you receive a gift you say thank you very much.)' }),

  makeMCQ({ id:'g2fr-eo-091', chapterId:CH_EO, difficulty:1, subsection:'questions_reponses',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une bouteille dessinée">' +
      '<svg viewBox="0 0 140 170" style="width:100%;max-width:150px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="140" height="170" rx="8" fill="#ffffff"/>' +
      '<rect x="45" y="52" width="50" height="100" rx="8" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<rect x="50" y="92" width="40" height="56" rx="4" fill="#3B82F6"/>' +
      '<rect x="60" y="30" width="20" height="24" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<rect x="56" y="18" width="28" height="14" rx="3" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Tu as très soif. Que fais-tu ?',
    options:['Je bois de l’eau','Je mange du pain','Je lis un livre','Je ferme la porte'],
    answer:'Je bois de l’eau',
    hint:'Regarde ce que contient la bouteille. (Look at what the bottle contains.)',
    explanation:'Quand on a soif, <b>on boit de l’eau</b>. 💧 (When you are thirsty you drink water.)' }),

  makeMCQ({ id:'g2fr-eo-092', chapterId:CH_EO, difficulty:1, subsection:'questions_reponses',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un panneau vertical avec trois ronds">' +
      '<svg viewBox="0 0 120 200" style="width:100%;max-width:130px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="120" height="200" rx="8" fill="#ffffff"/>' +
      '<rect x="30" y="14" width="60" height="140" rx="10" fill="#374151" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="60" cy="48" r="18" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="60" cy="90" r="18" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="60" cy="132" r="18" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<rect x="52" y="154" width="16" height="40" fill="#374151" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Le feu est rouge. Que fais-tu ?',
    options:['Je m’arrête','Je traverse','Je cours vite','Je saute haut'],
    answer:'Je m’arrête',
    hint:'Rouge veut dire « danger » sur la route. (Red means danger on the road.)',
    explanation:'Au feu rouge, on ne traverse pas : <b>je m’arrête</b>. 🚦 (At a red light you stop.)' }),

  makeMCQ({ id:'g2fr-eo-093', chapterId:CH_EO, difficulty:1, subsection:'questions_reponses',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="quatre objets marqués A, B, C et D">' +
      '<svg viewBox="0 0 300 130" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="16" y="28" width="52" height="62" rx="3" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<line x1="26" y1="48" x2="58" y2="48" stroke="#ffffff" stroke-width="2"/>' +
      '<line x1="26" y1="62" x2="58" y2="62" stroke="#ffffff" stroke-width="2"/>' +
      '<rect x="92" y="52" width="52" height="34" rx="4" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<rect x="144" y="62" width="26" height="7" fill="#111827"/>' +
      '<rect x="196" y="34" width="10" height="56" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="196" y="62" width="46" height="8" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="234" y="62" width="8" height="28" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="262,44 296,44 290,90 268,90" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<path d="M266 44 A14 14 0 0 1 292 44" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<text x="42" y="118" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">A</text>' +
      '<text x="122" y="118" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">B</text>' +
      '<text x="216" y="118" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">C</text>' +
      '<text x="279" y="118" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">D</text>' +
      '</svg></div>' +
      'Que mets-tu dans ton sac d’école ?',
    options:['A','B','C','D'],
    answer:'A',
    hint:'Cherche l’objet dans lequel on écrit ses leçons. (Look for the object you write your lessons in.)',
    explanation:'L’objet <b>A</b> est un cahier : il va dans le sac d’école. La casserole, la chaise et le seau restent à la maison. 📘 (Object A is an exercise book.)' })

);

// ── Compréhension écrite (Lecture) ────────────────────────────────────────────

STATIC_QUESTIONS.push(

  // decodage_syllabes (076–083)

  makeMCQ({ id:'g2fr-lec-076', chapterId:CH_LEC, difficulty:1, subsection:'decodage_syllabes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="trois cases, celle du milieu est vide">' +
      '<svg viewBox="0 0 260 90" style="width:100%;max-width:280px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="90" rx="8" fill="#ffffff"/>' +
      '<rect x="15" y="20" width="70" height="52" rx="8" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<rect x="95" y="20" width="70" height="52" rx="8" fill="#F3F4F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="175" y="20" width="70" height="52" rx="8" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<text x="50" y="56" font-size="24" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">fe</text>' +
      '<text x="130" y="58" font-size="28" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">?</text>' +
      '<text x="210" y="56" font-size="24" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">tre</text>' +
      '</svg></div>' +
      'Quelle syllabe manque dans la case vide pour écrire « fenêtre » ?',
    options:['nê','ne','na','no'],
    answer:'nê',
    hint:'Dis le mot tout haut : fe – nê – tre. (Say the word out loud: fe – nê – tre.)',
    explanation:'fe + <b>nê</b> + tre = <b>fenêtre</b>. N’oublie pas l’accent circonflexe. 🪟 (fe + nê + tre = fenêtre — window.)' }),

  makeMCQ({ id:'g2fr-lec-077', chapterId:CH_LEC, difficulty:2, subsection:'decodage_syllabes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une rangée de ronds bleus">' +
      '<svg viewBox="0 0 300 70" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="70" rx="8" fill="#ffffff"/>' +
      '<circle cx="55" cy="35" r="22" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="120" cy="35" r="22" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="185" cy="35" r="22" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="250" cy="35" r="22" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Un rond = un battement de syllabe. Quel mot a autant de syllabes qu’il y a de ronds ?',
    options:['la bicyclette','la banane','le crayon','le pain'],
    answer:'la bicyclette',
    hint:'Tape dans tes mains en disant chaque mot. (Clap your hands as you say each word.)',
    explanation:'Il y a 4 ronds. <b>bi-cy-clet-te</b> fait 4 battements. 🚲 (Four beats: bi-cy-clet-te.)' }),

  makeMCQ({ id:'g2fr-lec-078', chapterId:CH_LEC, difficulty:2, subsection:'decodage_syllabes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="trois cases contenant chacune un groupe de lettres">' +
      '<svg viewBox="0 0 260 90" style="width:100%;max-width:280px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="90" rx="8" fill="#ffffff"/>' +
      '<rect x="15" y="20" width="70" height="52" rx="8" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<rect x="95" y="20" width="70" height="52" rx="8" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<rect x="175" y="20" width="70" height="52" rx="8" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<text x="50" y="56" font-size="24" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">ba</text>' +
      '<text x="130" y="56" font-size="24" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">na</text>' +
      '<text x="210" y="56" font-size="24" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">ne</text>' +
      '</svg></div>' +
      'Le mot des cases est coupé en syllabes. Quel autre mot a le même nombre de syllabes ?',
    options:['le parapluie','la voiture','le crayon','la maison'],
    answer:'le parapluie',
    hint:'Les cases donnent 3 syllabes. Coupe chaque mot proposé. (The boxes give 3 syllables. Cut each word up.)',
    explanation:'<b>pa-ra-pluie</b> a 3 syllabes comme ba-na-ne. Voiture, crayon et maison n’en ont que 2. ☂️ (Parapluie has 3 syllables, like banane.)' }),

  makeMCQ({ id:'g2fr-lec-079', chapterId:CH_LEC, difficulty:2, subsection:'decodage_syllabes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="quatre dessins marqués A, B, C et D">' +
      '<svg viewBox="0 0 300 130" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="130" rx="8" fill="#ffffff"/>' +
      '<polygon points="14,66 74,66 66,86 22,86" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<line x1="44" y1="24" x2="44" y2="66" stroke="#111827" stroke-width="3"/>' +
      '<polygon points="47,28 70,62 47,62" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<path d="M96 40 Q142 46 142 84 Q124 92 106 78 Q94 62 96 40 Z" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="176,58 216,32 256,58" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<rect x="188" y="58" width="56" height="34" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<rect x="278" y="28" width="14" height="46" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="278,74 292,74 285,90" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<text x="44" y="118" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">A</text>' +
      '<text x="119" y="118" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">B</text>' +
      '<text x="216" y="118" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">C</text>' +
      '<text x="285" y="118" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">D</text>' +
      '</svg></div>' +
      'Quels deux dessins commencent par la même syllabe ?',
    options:['A et B','A et C','B et C','B et D'],
    answer:'A et B',
    hint:'A = bateau · B = banane · C = maison · D = crayon. Dis la première syllabe de chacun. (Say the first syllable of each.)',
    explanation:'<b>ba</b>-teau et <b>ba</b>-nane commencent tous les deux par « ba » : <b>A et B</b>. 🚤🍌 (Both start with the syllable "ba".)' }),

  makeMCQ({ id:'g2fr-lec-080', chapterId:CH_LEC, difficulty:1, subsection:'decodage_syllabes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un véhicule dessiné avec deux roues visibles">' +
      '<svg viewBox="0 0 200 130" style="width:100%;max-width:220px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="24" y="58" width="152" height="36" rx="8" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="58,58 82,32 124,32 144,58" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<rect x="86" y="38" width="32" height="18" fill="#BFDBFE" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="62" cy="98" r="16" fill="#111827"/>' +
      '<circle cx="62" cy="98" r="6" fill="#9CA3AF"/>' +
      '<circle cx="140" cy="98" r="16" fill="#111827"/>' +
      '<circle cx="140" cy="98" r="6" fill="#9CA3AF"/>' +
      '</svg></div>' +
      'Coupe en syllabes le nom de cet objet : « voiture ». Quelle coupure est correcte ?',
    options:['voi-ture','voit-ure','vo-iture','voitu-re'],
    answer:'voi-ture',
    hint:'Chaque syllabe doit pouvoir se dire toute seule. (Each syllable must be sayable on its own.)',
    explanation:'On coupe <b>voi-ture</b> : deux battements, voi puis ture. 🚗 (We cut it voi-ture: two beats.)' }),

  makeMCQ({ id:'g2fr-lec-081', chapterId:CH_LEC, difficulty:1, subsection:'decodage_syllabes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un objet plat avec des lignes">' +
      '<svg viewBox="0 0 180 140" style="width:100%;max-width:190px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="180" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="36" y="18" width="108" height="106" rx="4" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="36" y="18" width="16" height="106" fill="#1D4ED8" stroke="#111827" stroke-width="2"/>' +
      '<line x1="62" y1="46" x2="132" y2="46" stroke="#ffffff" stroke-width="3"/>' +
      '<line x1="62" y1="68" x2="132" y2="68" stroke="#ffffff" stroke-width="3"/>' +
      '<line x1="62" y1="90" x2="132" y2="90" stroke="#ffffff" stroke-width="3"/>' +
      '</svg></div>' +
      'Combien de syllabes a le nom de cet objet ?',
    options:['2','1','3','4'],
    answer:'2',
    hint:'C’est un cahier. Tape les battements : ca – hier. (It is an exercise book. Clap the beats: ca – hier.)',
    explanation:'<b>ca-hier</b> a 2 syllabes. 📘 (Cahier has 2 syllables.)' }),

  makeMCQ({ id:'g2fr-lec-082', chapterId:CH_LEC, difficulty:1, subsection:'decodage_syllabes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une case contenant deux lettres">' +
      '<svg viewBox="0 0 200 90" style="width:100%;max-width:210px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="90" rx="8" fill="#ffffff"/>' +
      '<rect x="55" y="16" width="90" height="58" rx="10" fill="#FEF3C7" stroke="#111827" stroke-width="3"/>' +
      '<text x="100" y="58" font-size="30" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">ma</text>' +
      '</svg></div>' +
      'Quel mot commence par la syllabe écrite dans la case ?',
    options:['la maison','le cahier','la banane','le poisson'],
    answer:'la maison',
    hint:'Dis la première syllabe de chaque mot. (Say the first syllable of each word.)',
    explanation:'<b>mai</b>-son commence par le son « ma ». Cahier commence par « ca », banane par « ba » et poisson par « poi ». 🏠 (Maison starts with the "ma" sound.)' }),

  makeMCQ({ id:'g2fr-lec-083', chapterId:CH_LEC, difficulty:2, subsection:'decodage_syllabes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="deux cases dont la seconde est vide, et un objet rectangulaire">' +
      '<svg viewBox="0 0 260 150" style="width:100%;max-width:280px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="150" rx="8" fill="#ffffff"/>' +
      '<rect x="60" y="12" width="62" height="50" rx="8" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<rect x="136" y="12" width="62" height="50" rx="8" fill="#F3F4F6" stroke="#111827" stroke-width="2"/>' +
      '<text x="91" y="46" font-size="24" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">ta</text>' +
      '<text x="167" y="48" font-size="28" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">?</text>' +
      '<rect x="46" y="78" width="168" height="60" rx="4" fill="#22C55E" stroke="#92400E" stroke-width="5"/>' +
      '<line x1="66" y1="102" x2="150" y2="102" stroke="#ffffff" stroke-width="3"/>' +
      '<line x1="66" y1="120" x2="126" y2="120" stroke="#ffffff" stroke-width="3"/>' +
      '</svg></div>' +
      'Quelle syllabe manque pour écrire le nom de cet objet, « tableau » ?',
    options:['bleau','bleu','beau','blau'],
    answer:'bleau',
    hint:'ta + ? = tableau. Écoute bien la fin du mot. (ta + ? = tableau. Listen to the end of the word.)',
    explanation:'ta + <b>bleau</b> = <b>tableau</b>. « bleu » et « beau » sont d’autres mots. (ta + bleau = tableau — blackboard.)' }),

  // lecture_comprehension (084–088)

  makeMCQ({ id:'g2fr-lec-084', chapterId:CH_LEC, difficulty:1, subsection:'lecture_comprehension',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un objet avec une étiquette portant un prix">' +
      '<svg viewBox="0 0 230 140" style="width:100%;max-width:250px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="230" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="22" y="26" width="102" height="92" rx="4" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="22" y="26" width="14" height="92" fill="#1D4ED8" stroke="#111827" stroke-width="2"/>' +
      '<line x1="46" y1="52" x2="112" y2="52" stroke="#ffffff" stroke-width="3"/>' +
      '<line x1="46" y1="74" x2="112" y2="74" stroke="#ffffff" stroke-width="3"/>' +
      '<rect x="140" y="46" width="76" height="46" rx="6" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="152" cy="58" r="4" fill="#ffffff" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="182" y="78" font-size="19" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">Rs 25</text>' +
      '</svg></div>' +
      'Lis : « Sita achète ce cahier. » Combien paie-t-elle ?',
    options:['Rs 25','Rs 20','Rs 52','Rs 15'],
    answer:'Rs 25',
    hint:'Le prix est écrit sur la petite étiquette. (The price is written on the small tag.)',
    explanation:'L’étiquette indique <b>Rs 25</b>. 💰 (The tag shows Rs 25.)' }),

  makeMCQ({ id:'g2fr-lec-085', chapterId:CH_LEC, difficulty:1, subsection:'lecture_comprehension',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une feuille avec plusieurs lignes de texte">' +
      '<svg viewBox="0 0 240 160" style="width:100%;max-width:260px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="160" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="14" width="200" height="132" rx="6" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<text x="120" y="52" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">FÊTE À L’ÉCOLE</text>' +
      '<line x1="52" y1="64" x2="188" y2="64" stroke="#111827" stroke-width="2"/>' +
      '<text x="120" y="98" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">SAMEDI</text>' +
      '<text x="120" y="130" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">14 h</text>' +
      '</svg></div>' +
      'Regarde l’affiche. Quel jour est la fête ?',
    options:['Samedi','Lundi','Mardi','Vendredi'],
    answer:'Samedi',
    hint:'Le jour est écrit en grosses lettres au milieu. (The day is written in big letters in the middle.)',
    explanation:'L’affiche annonce la fête <b>samedi</b> à 14 h. 🎉 (The poster announces the party on Saturday at 2 p.m.)' }),

  makeMCQ({ id:'g2fr-lec-086', chapterId:CH_LEC, difficulty:1, subsection:'lecture_comprehension',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une feuille avec des points et des mots">' +
      '<svg viewBox="0 0 220 150" style="width:100%;max-width:230px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="150" rx="8" fill="#ffffff"/>' +
      '<rect x="25" y="10" width="170" height="130" rx="6" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<text x="110" y="36" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">LISTE</text>' +
      '<circle cx="52" cy="62" r="5" fill="#111827"/>' +
      '<text x="70" y="68" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">pain</text>' +
      '<circle cx="52" cy="90" r="5" fill="#111827"/>' +
      '<text x="70" y="96" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">lait</text>' +
      '<circle cx="52" cy="118" r="5" fill="#111827"/>' +
      '<text x="70" y="124" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">riz</text>' +
      '</svg></div>' +
      'Maman a écrit sa liste. Combien d’articles doit-elle acheter ?',
    options:['3','2','4','5'],
    answer:'3',
    hint:'Compte les points noirs devant les mots. (Count the black dots in front of the words.)',
    explanation:'Il y a 3 points : pain, lait et riz, donc <b>3 articles</b>. 🛒 (Three dots: bread, milk and rice.)' }),

  makeMCQ({ id:'g2fr-lec-087', chapterId:CH_LEC, difficulty:1, subsection:'lecture_comprehension',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un panneau sur un poteau avec un mot et une flèche">' +
      '<svg viewBox="0 0 240 150" style="width:100%;max-width:250px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="150" rx="8" fill="#ffffff"/>' +
      '<rect x="26" y="20" width="188" height="66" rx="6" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<text x="88" y="62" font-size="21" fill="#ffffff" font-family="system-ui, sans-serif" text-anchor="middle">ÉCOLE</text>' +
      '<polygon points="140,46 172,46 172,36 200,53 172,70 172,60 140,60" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<rect x="115" y="86" width="10" height="56" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Tu lis ce panneau dans la rue. De quel côté est l’école ?',
    options:['À droite','À gauche','Tout droit','En arrière'],
    answer:'À droite',
    hint:'Suis la pointe de la flèche blanche. (Follow the point of the white arrow.)',
    explanation:'La flèche montre le côté droit : l’école est <b>à droite</b>. ➡️ (The arrow points right.)' }),

  makeMCQ({ id:'g2fr-lec-088', chapterId:CH_LEC, difficulty:2, subsection:'lecture_comprehension',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="deux embarcations dessinées, marquées A et B">' +
      '<svg viewBox="0 0 300 140" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="140" rx="8" fill="#ffffff"/>' +
      '<polygon points="20,84 130,84 116,108 34,108" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<line x1="75" y1="20" x2="75" y2="84" stroke="#111827" stroke-width="3"/>' +
      '<polygon points="79,26 118,78 79,78" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="170,84 280,84 266,108 184,108" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<line x1="225" y1="20" x2="225" y2="84" stroke="#111827" stroke-width="3"/>' +
      '<polygon points="229,26 268,78 229,78" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<text x="75" y="130" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">A</text>' +
      '<text x="225" y="130" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">B</text>' +
      '</svg></div>' +
      'Lis : « Le bateau de Ravi a une voile bleue. » Quel bateau est celui de Ravi ?',
    options:['Le bateau A','Le bateau B','Les deux','Aucun bateau'],
    answer:'Le bateau A',
    hint:'Cherche la couleur écrite dans la phrase, puis regarde les voiles. (Find the colour in the sentence, then look at the sails.)',
    explanation:'La voile bleue est celle du bateau <b>A</b> ; celle de B est rouge. ⛵ (The blue sail belongs to boat A.)' }),

  // type_texte (089–093)

  makeMCQ({ id:'g2fr-lec-089', chapterId:CH_LEC, difficulty:1, subsection:'type_texte',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une grande feuille avec quelques mots en gros">' +
      '<svg viewBox="0 0 240 155" style="width:100%;max-width:250px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="155" rx="8" fill="#ffffff"/>' +
      '<rect x="18" y="12" width="204" height="130" rx="6" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<text x="120" y="50" font-size="19" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">GRANDE VENTE</text>' +
      '<line x1="50" y1="62" x2="190" y2="62" stroke="#111827" stroke-width="2"/>' +
      '<text x="120" y="94" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">DIMANCHE</text>' +
      '<text x="120" y="126" font-size="19" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">Rs 50</text>' +
      '</svg></div>' +
      'Quel type de texte est-ce ?',
    options:['Une affiche','Une recette','Une lettre','Un poème'],
    answer:'Une affiche',
    hint:'Peu de mots, très gros, pour être lus de loin. (Few words, very big, to be read from far away.)',
    explanation:'De gros mots qui annoncent un événement et un prix : c’est <b>une affiche</b>. 📢 (Big words announcing an event: a poster.)' }),

  makeMCQ({ id:'g2fr-lec-090', chapterId:CH_LEC, difficulty:1, subsection:'type_texte',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une feuille avec des mots les uns sous les autres">' +
      '<svg viewBox="0 0 220 160" style="width:100%;max-width:230px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="160" rx="8" fill="#ffffff"/>' +
      '<rect x="26" y="10" width="168" height="140" rx="6" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="54" cy="42" r="5" fill="#111827"/>' +
      '<text x="72" y="48" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">riz</text>' +
      '<circle cx="54" cy="72" r="5" fill="#111827"/>' +
      '<text x="72" y="78" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">sel</text>' +
      '<circle cx="54" cy="102" r="5" fill="#111827"/>' +
      '<text x="72" y="108" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">thé</text>' +
      '<circle cx="54" cy="132" r="5" fill="#111827"/>' +
      '<text x="72" y="138" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">pain</text>' +
      '</svg></div>' +
      'Quel type de texte est-ce ?',
    options:['Une liste','Une lettre','Une affiche','Une recette'],
    answer:'Une liste',
    hint:'Des mots courts, un par ligne, avec un point devant. (Short words, one per line, with a dot in front.)',
    explanation:'Des articles écrits un par ligne forment <b>une liste</b> de courses. 🛍️ (Items written one per line make a shopping list.)' }),

  makeMCQ({ id:'g2fr-lec-091', chapterId:CH_LEC, difficulty:1, subsection:'type_texte',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une feuille écrite avec une ligne au début et une signature à la fin">' +
      '<svg viewBox="0 0 240 160" style="width:100%;max-width:250px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="160" rx="8" fill="#ffffff"/>' +
      '<rect x="22" y="10" width="196" height="140" rx="6" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<text x="40" y="44" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">Chère Anne,</text>' +
      '<line x1="40" y1="68" x2="198" y2="68" stroke="#9CA3AF" stroke-width="3"/>' +
      '<line x1="40" y1="88" x2="198" y2="88" stroke="#9CA3AF" stroke-width="3"/>' +
      '<line x1="40" y1="108" x2="152" y2="108" stroke="#9CA3AF" stroke-width="3"/>' +
      '<text x="160" y="138" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">Paul</text>' +
      '</svg></div>' +
      'Quel type de texte est-ce ?',
    options:['Une lettre','Une liste','Une affiche','Une recette'],
    answer:'Une lettre',
    hint:'On dit bonjour à quelqu’un au début et on signe à la fin. (You greet someone at the start and sign at the end.)',
    explanation:'« Chère Anne, » au début et « Paul » à la fin : c’est <b>une lettre</b>. ✉️ (A greeting at the top and a signature at the bottom: a letter.)' }),

  makeMCQ({ id:'g2fr-lec-092', chapterId:CH_LEC, difficulty:2, subsection:'type_texte',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une feuille avec une petite liste puis des étapes numérotées">' +
      '<svg viewBox="0 0 250 165" style="width:100%;max-width:260px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="250" height="165" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="10" width="210" height="145" rx="6" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<text x="34" y="40" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">Ingrédients :</text>' +
      '<text x="42" y="64" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">farine, sucre, œufs</text>' +
      '<line x1="34" y1="78" x2="216" y2="78" stroke="#9CA3AF" stroke-width="2"/>' +
      '<text x="34" y="102" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">1. Mélanger le tout.</text>' +
      '<text x="34" y="126" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">2. Cuire 30 minutes.</text>' +
      '</svg></div>' +
      'À quoi sert ce texte ?',
    options:['À faire un gâteau','À raconter une histoire','À inviter des amis','À vendre un objet'],
    answer:'À faire un gâteau',
    hint:'Regarde la liste du haut, puis les étapes numérotées. (Look at the list at the top, then the numbered steps.)',
    explanation:'Des ingrédients puis des étapes : c’est une recette, elle sert <b>à faire un gâteau</b>. 🍰 (Ingredients then steps: a recipe.)' }),

  makeMCQ({ id:'g2fr-lec-093', chapterId:CH_LEC, difficulty:2, subsection:'type_texte',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un tableau à deux colonnes et trois lignes">' +
      '<svg viewBox="0 0 260 140" style="width:100%;max-width:270px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="14" width="220" height="112" rx="4" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<line x1="20" y1="50" x2="240" y2="50" stroke="#111827" stroke-width="2"/>' +
      '<line x1="20" y1="88" x2="240" y2="88" stroke="#111827" stroke-width="2"/>' +
      '<line x1="112" y1="14" x2="112" y2="126" stroke="#111827" stroke-width="2"/>' +
      '<text x="66" y="38" font-size="14" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">Lundi</text>' +
      '<text x="176" y="38" font-size="14" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">Français</text>' +
      '<text x="66" y="76" font-size="14" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">Mardi</text>' +
      '<text x="176" y="76" font-size="14" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">Maths</text>' +
      '<text x="66" y="114" font-size="14" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">Jeudi</text>' +
      '<text x="176" y="114" font-size="14" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">Dessin</text>' +
      '</svg></div>' +
      'Que montre ce document ?',
    options:['Les jours de classe','Le prix des livres','La liste des amis','Le nom de l’école'],
    answer:'Les jours de classe',
    hint:'Regarde ce qui est écrit dans la colonne de gauche. (Look at what is written in the left column.)',
    explanation:'Chaque ligne donne un jour et sa leçon : c’est un emploi du temps, il montre <b>les jours de classe</b>. 🗓️ (Each row gives a day and its lesson.)' })

);

// ── Expression écrite ─────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  // phrases_courtes (076–081)

  makeMCQ({ id:'g2fr-ecr-076', chapterId:CH_ECR, difficulty:1, subsection:'phrases_courtes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un objet rond posé sur une bande verte">' +
      '<svg viewBox="0 0 200 140" style="width:100%;max-width:210px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="106" width="180" height="26" rx="4" fill="#22C55E"/>' +
      '<circle cx="100" cy="72" r="34" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<path d="M70 60 Q100 82 130 60" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<path d="M70 84 Q100 62 130 84" fill="none" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Quelle phrase décrit bien l’image ?',
    options:['Le ballon est rouge','Le ballon est jaune','Le ballon est carré','La balle est cassée'],
    answer:'Le ballon est rouge',
    hint:'Regarde d’abord la forme, puis la couleur. (Look first at the shape, then at the colour.)',
    explanation:'Le ballon est rond et rouge : <b>le ballon est rouge</b>. ⚽ (The ball is round and red.)' }),

  makeMCQ({ id:'g2fr-ecr-077', chapterId:CH_ECR, difficulty:1, subsection:'phrases_courtes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="des objets longs avec une pointe">' +
      '<svg viewBox="0 0 200 130" style="width:100%;max-width:210px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="62" y="20" width="18" height="66" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="62,86 80,86 71,106" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="118" y="20" width="18" height="66" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="118,86 136,86 127,106" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Complète la phrase : « J’ai ___ crayons. »',
    options:['deux','trois','quatre','cinq'],
    answer:'deux',
    hint:'Compte les crayons dessinés. (Count the drawn pencils.)',
    explanation:'Il y a 2 crayons, donc on écrit « J’ai <b>deux</b> crayons. » ✏️✏️ (There are two pencils.)' }),

  makeMCQ({ id:'g2fr-ecr-078', chapterId:CH_ECR, difficulty:1, subsection:'phrases_courtes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une scène de plein air dessinée">' +
      '<svg viewBox="0 0 220 150" style="width:100%;max-width:230px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="150" rx="8" fill="#ffffff"/>' +
      '<circle cx="172" cy="40" r="22" fill="#FACC15" stroke="#F59E0B" stroke-width="2"/>' +
      '<line x1="172" y1="4" x2="172" y2="14" stroke="#F59E0B" stroke-width="3"/>' +
      '<line x1="208" y1="40" x2="198" y2="40" stroke="#F59E0B" stroke-width="3"/>' +
      '<line x1="146" y1="14" x2="153" y2="21" stroke="#F59E0B" stroke-width="3"/>' +
      '<line x1="198" y1="14" x2="191" y2="21" stroke="#F59E0B" stroke-width="3"/>' +
      '<rect x="62" y="92" width="16" height="50" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="70" cy="68" r="40" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Quelle phrase va avec l’image ?',
    options:['Le soleil brille','La pluie tombe','La nuit arrive','Le vent souffle'],
    answer:'Le soleil brille',
    hint:'Regarde le rond jaune avec ses rayons. (Look at the yellow circle with its rays.)',
    explanation:'Le rond jaune avec des rayons est le soleil : <b>le soleil brille</b>. ☀️ (The yellow circle with rays is the sun.)' }),

  makeMCQ({ id:'g2fr-ecr-079', chapterId:CH_ECR, difficulty:2, subsection:'phrases_courtes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="des formes ovales dans une zone bleue">' +
      '<svg viewBox="0 0 260 120" style="width:100%;max-width:270px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="120" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="14" width="240" height="92" rx="8" fill="#3B82F6"/>' +
      '<ellipse cx="60" cy="44" rx="26" ry="15" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="34,44 16,32 16,56" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="150" cy="44" rx="26" ry="15" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="124,44 106,32 106,56" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="105" cy="84" rx="26" ry="15" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="79,84 61,72 61,96" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Remets les mots dans l’ordre : poissons / trois / y a / Il',
    options:['Il y a trois poissons','Trois il y a poissons','Poissons trois il y a','Il trois y a poissons'],
    answer:'Il y a trois poissons',
    hint:'Une phrase française commence souvent par « Il y a… ». (A French sentence often starts with "Il y a…".)',
    explanation:'La bonne phrase est <b>Il y a trois poissons</b>, avec la majuscule au début. 🐟 (The correct sentence is "Il y a trois poissons".)' }),

  makeMCQ({ id:'g2fr-ecr-080', chapterId:CH_ECR, difficulty:1, subsection:'phrases_courtes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un objet avec une poignée et une bande">' +
      '<svg viewBox="0 0 200 150" style="width:100%;max-width:210px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="150" rx="8" fill="#ffffff"/>' +
      '<path d="M78 44 A22 22 0 0 1 122 44" fill="none" stroke="#111827" stroke-width="4"/>' +
      '<rect x="40" y="44" width="120" height="92" rx="10" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="40" y="44" width="120" height="34" rx="10" fill="#B45309" stroke="#111827" stroke-width="2"/>' +
      '<rect x="88" y="70" width="24" height="18" rx="3" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Complète la phrase : « Je mets mes livres dans mon ___ . »',
    options:['sac','lit','bol','pot'],
    answer:'sac',
    hint:'C’est l’objet qu’on porte sur le dos pour aller à l’école. (It is the thing you carry on your back to school.)',
    explanation:'On met ses livres dans son <b>sac</b> d’école. 🎒 (You put your books in your school bag.)' }),

  makeMCQ({ id:'g2fr-ecr-081', chapterId:CH_ECR, difficulty:2, subsection:'phrases_courtes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="deux plantes de tailles différentes, marquées A et B">' +
      '<svg viewBox="0 0 240 155" style="width:100%;max-width:250px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="155" rx="8" fill="#ffffff"/>' +
      '<line x1="66" y1="122" x2="66" y2="62" stroke="#22C55E" stroke-width="6"/>' +
      '<circle cx="48" cy="46" r="17" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="84" cy="46" r="17" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="66" cy="26" r="17" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="66" cy="48" r="12" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<line x1="176" y1="122" x2="176" y2="94" stroke="#22C55E" stroke-width="5"/>' +
      '<circle cx="167" cy="86" r="9" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="185" cy="86" r="9" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="176" cy="74" r="9" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="176" cy="87" r="6" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<text x="66" y="146" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">A</text>' +
      '<text x="176" y="146" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">B</text>' +
      '</svg></div>' +
      'Quelle phrase est vraie pour l’image ?',
    options:['La fleur A est grande','La fleur B est grande','Les deux sont petites','Les deux sont grandes'],
    answer:'La fleur A est grande',
    hint:'Compare la hauteur des deux tiges. (Compare the height of the two stems.)',
    explanation:'La fleur A monte beaucoup plus haut que la fleur B : <b>la fleur A est grande</b>. 🌸 (Flower A is much taller than flower B.)' }),

  // ponctuation_de_base (082–087)

  makeMCQ({ id:'g2fr-ecr-082', chapterId:CH_ECR, difficulty:1, subsection:'ponctuation_de_base',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un signe de ponctuation dessiné en très grand">' +
      '<svg viewBox="0 0 160 120" style="width:100%;max-width:170px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="160" height="120" rx="8" fill="#ffffff"/>' +
      '<rect x="30" y="12" width="100" height="96" rx="10" fill="#FEF3C7" stroke="#111827" stroke-width="3"/>' +
      '<text x="80" y="92" font-size="76" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">?</text>' +
      '</svg></div>' +
      'Comment s’appelle ce signe ?',
    options:['Interrogation','Exclamation','Point final','Virgule'],
    answer:'Interrogation',
    hint:'On le met quand on pose une question. (You use it when you ask a question.)',
    explanation:'Ce signe est le point d’<b>interrogation</b> : il termine une question. ❓ (This is the question mark.)' }),

  makeMCQ({ id:'g2fr-ecr-083', chapterId:CH_ECR, difficulty:1, subsection:'ponctuation_de_base',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une phrase écrite suivie d’une case vide">' +
      '<svg viewBox="0 0 300 90" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="90" rx="8" fill="#ffffff"/>' +
      '<text x="26" y="56" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">Tu viens avec moi</text>' +
      '<rect x="242" y="32" width="32" height="32" rx="5" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Quel signe faut-il mettre dans la case ?',
    options:['?','.','!',','],
    answer:'?',
    hint:'Cette phrase demande quelque chose à quelqu’un. (This sentence asks somebody something.)',
    explanation:'« Tu viens avec moi <b>?</b> » est une question : elle se termine par un point d’interrogation. (It is a question, so it ends with a question mark.)' }),

  makeMCQ({ id:'g2fr-ecr-084', chapterId:CH_ECR, difficulty:2, subsection:'ponctuation_de_base',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une phrase écrite suivie d’une case vide">' +
      '<svg viewBox="0 0 300 90" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="90" rx="8" fill="#ffffff"/>' +
      '<text x="26" y="56" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">Quel beau bateau</text>' +
      '<rect x="230" y="32" width="32" height="32" rx="5" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Cette phrase montre la surprise et la joie. Quel signe faut-il mettre dans la case ?',
    options:['!','?','.',','],
    answer:'!',
    hint:'Ce signe se lit d’une voix forte et joyeuse. (This mark is read in a loud, happy voice.)',
    explanation:'« Quel beau bateau <b>!</b> » : le point d’exclamation montre la surprise ou la joie. ⛵ (The exclamation mark shows surprise or joy.)' }),

  makeMCQ({ id:'g2fr-ecr-085', chapterId:CH_ECR, difficulty:1, subsection:'ponctuation_de_base',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une phrase écrite avec un cercle rouge autour de son premier signe">' +
      '<svg viewBox="0 0 300 110" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="110" rx="8" fill="#ffffff"/>' +
      '<text x="44" y="66" font-size="24" fill="#1f2937" font-family="system-ui, sans-serif">Le chat dort.</text>' +
      '<circle cx="53" cy="58" r="20" fill="none" stroke="#EF4444" stroke-width="3"/>' +
      '</svg></div>' +
      'Qu’est-ce qui est entouré en rouge au début de la phrase ?',
    options:['Une majuscule','Une virgule','Un point','Un chiffre'],
    answer:'Une majuscule',
    hint:'Compare la première lettre avec les autres lettres. (Compare the first letter with the other letters.)',
    explanation:'Le « L » est plus grand que les autres lettres : c’est <b>une majuscule</b>. Toute phrase en commence une. (Every sentence starts with a capital letter.)' }),

  makeMCQ({ id:'g2fr-ecr-086', chapterId:CH_ECR, difficulty:2, subsection:'ponctuation_de_base',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une suite de mots écrite sans marque au début ni à la fin">' +
      '<svg viewBox="0 0 300 100" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="100" rx="8" fill="#ffffff"/>' +
      '<rect x="16" y="20" width="268" height="60" rx="8" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="2"/>' +
      '<text x="40" y="60" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">la porte est verte</text>' +
      '</svg></div>' +
      'Qu’est-ce qui manque à cette phrase ?',
    options:['La majuscule et le point','La majuscule seulement','Le point seulement','La virgule seulement'],
    answer:'La majuscule et le point',
    hint:'Regarde le tout premier signe, puis le tout dernier. (Look at the very first mark, then the very last.)',
    explanation:'Il faut écrire « <b>L</b>a porte est verte<b>.</b> » : une majuscule au début et un point à la fin. (A capital at the start and a full stop at the end.)' }),

  makeMCQ({ id:'g2fr-ecr-087', chapterId:CH_ECR, difficulty:2, subsection:'ponctuation_de_base',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="trois mots écrits avec des signes rouges entre eux">' +
      '<svg viewBox="0 0 300 100" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="100" rx="8" fill="#ffffff"/>' +
      '<text x="40" y="60" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">pain</text>' +
      '<text x="95" y="62" font-size="26" fill="#EF4444" font-family="system-ui, sans-serif">,</text>' +
      '<text x="112" y="60" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">lait</text>' +
      '<text x="164" y="62" font-size="26" fill="#EF4444" font-family="system-ui, sans-serif">,</text>' +
      '<text x="182" y="60" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">riz</text>' +
      '</svg></div>' +
      'À quoi servent les signes rouges dans cette phrase ?',
    options:['À séparer les mots','À finir la phrase','À poser une question','À montrer la joie'],
    answer:'À séparer les mots',
    hint:'Regarde où ils sont placés : entre deux mots. (Look where they are placed: between two words.)',
    explanation:'La virgule sert <b>à séparer les mots</b> d’une liste : pain, lait, riz. (The comma separates the words in a list.)' }),

  // orthographe_mots (088–093)

  makeMCQ({ id:'g2fr-ecr-088', chapterId:CH_ECR, difficulty:2, subsection:'orthographe_mots',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un objet rond posé sur une assiette avec des petites tiges dessus">' +
      '<svg viewBox="0 0 220 150" style="width:100%;max-width:230px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="150" rx="8" fill="#ffffff"/>' +
      '<rect x="46" y="66" width="128" height="52" rx="6" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<rect x="46" y="66" width="128" height="18" rx="6" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
      '<rect x="76" y="40" width="7" height="26" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="106" y="40" width="7" height="26" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="136" y="40" width="7" height="26" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
      '<ellipse cx="110" cy="122" rx="82" ry="12" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Comment écrit-on le nom de cet objet ?',
    options:['gâteau','gateau','gâtau','gatteau'],
    answer:'gâteau',
    hint:'Il y a un accent circonflexe sur le a. (There is a circumflex accent on the a.)',
    explanation:'On écrit <b>gâteau</b>, avec un accent circonflexe et un seul t. 🎂 (It is spelled gâteau.)' }),

  makeMCQ({ id:'g2fr-ecr-089', chapterId:CH_ECR, difficulty:2, subsection:'orthographe_mots',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="une forme ovale avec une queue triangulaire">' +
      '<svg viewBox="0 0 220 120" style="width:100%;max-width:230px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="120" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="14" width="200" height="92" rx="8" fill="#3B82F6"/>' +
      '<ellipse cx="126" cy="60" rx="46" ry="26" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="80,60 48,40 48,80" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="150" cy="52" r="5" fill="#111827"/>' +
      '</svg></div>' +
      'Un seul animal est dessiné. Comment l’écrit-on ?',
    options:['poisson','poison','poisonn','poissons'],
    answer:'poisson',
    hint:'Écoute le son « ss » au milieu du mot, puis compte les animaux dans l’eau. (Listen for the "ss" sound in the middle, then count the animals in the water.)',
    explanation:'On écrit <b>poisson</b> avec deux s. « Poison » avec un seul s est un autre mot, et « poissons » serait plusieurs. 🐟 (Poisson has two s.)' }),

  makeMCQ({ id:'g2fr-ecr-090', chapterId:CH_ECR, difficulty:2, subsection:'orthographe_mots',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un cadre carré partagé par deux traits croisés">' +
      '<svg viewBox="0 0 160 150" style="width:100%;max-width:170px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="160" height="150" rx="8" fill="#ffffff"/>' +
      '<rect x="26" y="16" width="108" height="102" fill="#BFDBFE" stroke="#92400E" stroke-width="6"/>' +
      '<line x1="80" y1="16" x2="80" y2="118" stroke="#92400E" stroke-width="6"/>' +
      '<line x1="26" y1="67" x2="134" y2="67" stroke="#92400E" stroke-width="6"/>' +
      '<rect x="18" y="118" width="124" height="12" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Quel mot est bien écrit ?',
    options:['fenêtre','fenétre','fenètre','fenetre'],
    answer:'fenêtre',
    hint:'L’accent ressemble à un petit chapeau. (The accent looks like a little hat.)',
    explanation:'On écrit <b>fenêtre</b> avec un accent circonflexe sur le e. 🪟 (Fenêtre takes a circumflex accent.)' }),

  makeMCQ({ id:'g2fr-ecr-091', chapterId:CH_ECR, difficulty:1, subsection:'orthographe_mots',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un objet long et fin avec une pointe">' +
      '<svg viewBox="0 0 160 150" style="width:100%;max-width:160px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="160" height="150" rx="8" fill="#ffffff"/>' +
      '<rect x="66" y="18" width="28" height="86" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<rect x="66" y="18" width="28" height="14" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="66,104 94,104 80,134" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="74,122 86,122 80,134" fill="#111827"/>' +
      '</svg></div>' +
      'Complète le nom de cet objet : « cra___ »',
    options:['yon','ion','illon','yion'],
    answer:'yon',
    hint:'Le mot se prononce cra-yon, avec un y. (The word is said cra-yon, with a y.)',
    explanation:'cra + <b>yon</b> = <b>crayon</b>. ✏️ (cra + yon = crayon — pencil.)' }),

  makeMCQ({ id:'g2fr-ecr-092', chapterId:CH_ECR, difficulty:2, subsection:'orthographe_mots',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un objet plat avec des lignes et un bord épais">' +
      '<svg viewBox="0 0 180 140" style="width:100%;max-width:190px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="180" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="36" y="16" width="108" height="108" rx="4" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<rect x="36" y="16" width="16" height="108" fill="#C2410C" stroke="#111827" stroke-width="2"/>' +
      '<line x1="62" y1="44" x2="132" y2="44" stroke="#ffffff" stroke-width="3"/>' +
      '<line x1="62" y1="68" x2="132" y2="68" stroke="#ffffff" stroke-width="3"/>' +
      '<line x1="62" y1="92" x2="132" y2="92" stroke="#ffffff" stroke-width="3"/>' +
      '</svg></div>' +
      'Quel mot est bien écrit ?',
    options:['cahier','caier','cahié','cayer'],
    answer:'cahier',
    hint:'Le h ne s’entend pas, mais il s’écrit. (The h is silent, but you still write it.)',
    explanation:'On écrit <b>cahier</b> : le h est muet mais il est là. 📘 (Cahier has a silent h.)' }),

  makeMCQ({ id:'g2fr-ecr-093', chapterId:CH_ECR, difficulty:2, subsection:'orthographe_mots',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="des fruits ronds dessinés côte à côte">' +
      '<svg viewBox="0 0 240 130" style="width:100%;max-width:250px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="130" rx="8" fill="#ffffff"/>' +
      '<circle cx="56" cy="76" r="30" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<line x1="56" y1="46" x2="56" y2="30" stroke="#92400E" stroke-width="4"/>' +
      '<ellipse cx="70" cy="30" rx="12" ry="6" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="122" cy="76" r="30" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<line x1="122" y1="46" x2="122" y2="30" stroke="#92400E" stroke-width="4"/>' +
      '<ellipse cx="136" cy="30" rx="12" ry="6" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="188" cy="76" r="30" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<line x1="188" y1="46" x2="188" y2="30" stroke="#92400E" stroke-width="4"/>' +
      '<ellipse cx="202" cy="30" rx="12" ry="6" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '</svg></div>' +
      'Comment écrit-on ce que tu vois sur l’image ?',
    options:['trois pommes','trois pomme','trois pommess','trois pomes'],
    answer:'trois pommes',
    hint:'Quand il y en a plusieurs, le nom prend un s. (When there is more than one, the noun takes an s.)',
    explanation:'Il y a plusieurs fruits, donc on écrit <b>trois pommes</b> avec un s à la fin. 🍎 (More than one, so pommes takes an s.)' })

);

// ── Grammaire ─────────────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  // nom_determinant (076–081)

  makeMCQ({ id:'g2fr-grm-076', chapterId:CH_GRM, difficulty:1, subsection:'nom_determinant',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un fruit rond dessiné">' +
      '<svg viewBox="0 0 150 140" style="width:100%;max-width:160px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="150" height="140" rx="8" fill="#ffffff"/>' +
      '<circle cx="75" cy="86" r="38" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<line x1="75" y1="48" x2="75" y2="28" stroke="#92400E" stroke-width="5"/>' +
      '<ellipse cx="94" cy="28" rx="16" ry="8" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Complète : « ___ pomme. »',
    options:['une','un','des','les'],
    answer:'une',
    hint:'Il n’y en a qu’un seul fruit, et « pomme » est féminin. (There is only one fruit, and « pomme » is feminine.)',
    explanation:'On écrit <b>une pomme</b> : un seul fruit, et le mot est féminin. 🍎 (One apple, feminine: une pomme.)' }),

  makeMCQ({ id:'g2fr-grm-077', chapterId:CH_GRM, difficulty:1, subsection:'nom_determinant',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="plusieurs fruits allongés dessinés">' +
      '<svg viewBox="0 0 260 130" style="width:100%;max-width:270px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="130" rx="8" fill="#ffffff"/>' +
      '<path d="M22 34 Q66 40 66 82 Q48 92 32 76 Q20 58 22 34 Z" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<path d="M84 34 Q128 40 128 82 Q110 92 94 76 Q82 58 84 34 Z" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<path d="M146 34 Q190 40 190 82 Q172 92 156 76 Q144 58 146 34 Z" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<path d="M204 34 Q248 40 248 82 Q230 92 214 76 Q202 58 204 34 Z" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Quel groupe de mots va avec l’image ?',
    options:['des bananes','une banane','la banane','ma banane'],
    answer:'des bananes',
    hint:'Compte les fruits : un seul ou plusieurs ? (Count the fruits: one or several?)',
    explanation:'Il y en a plusieurs, donc on dit <b>des bananes</b>, au pluriel. 🍌 (There are several, so it is « des bananes ».)' }),

  makeMCQ({ id:'g2fr-grm-078', chapterId:CH_GRM, difficulty:1, subsection:'nom_determinant',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="des objets rectangulaires posés côte à côte">' +
      '<svg viewBox="0 0 220 140" style="width:100%;max-width:230px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="24" y="24" width="80" height="98" rx="4" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="24" y="24" width="14" height="98" fill="#15803D" stroke="#111827" stroke-width="2"/>' +
      '<rect x="118" y="24" width="80" height="98" rx="4" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
      '<rect x="118" y="24" width="14" height="98" fill="#7E22CE" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'On dit « les livres ». Ce groupe de mots est-il au singulier ou au pluriel ?',
    options:['Pluriel','Singulier','Les deux','Aucun'],
    answer:'Pluriel',
    hint:'Il y a plus d’un livre sur l’image. (There is more than one book in the picture.)',
    explanation:'Il y a 2 livres, donc « les livres » est au <b>pluriel</b>. 📗📕 (Two books, so it is plural.)' }),

  makeMCQ({ id:'g2fr-grm-079', chapterId:CH_GRM, difficulty:1, subsection:'nom_determinant',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un meuble bas avec un coussin">' +
      '<svg viewBox="0 0 220 130" style="width:100%;max-width:230px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="24" y="40" width="18" height="72" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="182" y="60" width="16" height="52" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="24" y="72" width="174" height="20" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="46" y="56" width="52" height="18" rx="6" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Quel déterminant convient : « ___ lit » ?',
    options:['le','la','les','des'],
    answer:'le',
    hint:'Un seul objet, et « lit » est masculin. (One object, and « lit » is masculine.)',
    explanation:'On dit <b>le lit</b> : un seul, et le mot est masculin. 🛏️ (One bed, masculine: le lit.)' }),

  makeMCQ({ id:'g2fr-grm-080', chapterId:CH_GRM, difficulty:1, subsection:'nom_determinant',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un objet fin avec une petite flamme">' +
      '<svg viewBox="0 0 140 160" style="width:100%;max-width:150px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="140" height="160" rx="8" fill="#ffffff"/>' +
      '<rect x="54" y="52" width="32" height="88" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<line x1="70" y1="44" x2="70" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="70,18 82,44 58,44" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Quel déterminant convient : « ___ bougie » ?',
    options:['la','le','les','des'],
    answer:'la',
    hint:'Une seule, et « bougie » est féminin. (Only one, and « bougie » is feminine.)',
    explanation:'On dit <b>la bougie</b> : une seule, et le mot est féminin. 🕯️ (One candle, feminine: la bougie.)' }),

  makeMCQ({ id:'g2fr-grm-081', chapterId:CH_GRM, difficulty:2, subsection:'nom_determinant',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un pot contenant plusieurs objets longs">' +
      '<svg viewBox="0 0 200 170" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="170" rx="8" fill="#ffffff"/>' +
      '<rect x="52" y="24" width="14" height="80" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="52,18 66,18 59,4" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="80" y="22" width="14" height="82" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="80,16 94,16 87,4" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="108" y="24" width="14" height="80" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="108,18 122,18 115,4" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="136" y="32" width="14" height="72" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="136,26 150,26 143,12" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
      '<polygon points="40,100 162,100 148,158 54,158" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Quelle phrase va avec l’image ?',
    options:['Ce sont des crayons','C’est un crayon','C’est le crayon','C’est mon crayon'],
    answer:'Ce sont des crayons',
    hint:'Y a-t-il un seul crayon dans le pot, ou plusieurs ? (Is there one pencil in the pot, or several?)',
    explanation:'Il y a 4 crayons, donc on dit <b>Ce sont des crayons</b>. 🖍️ (There are four pencils, so we use the plural.)' }),

  // verbe_etre_avoir (082–087)

  makeMCQ({ id:'g2fr-grm-082', chapterId:CH_GRM, difficulty:1, subsection:'verbe_etre_avoir',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un objet arrondi avec un bord plat">' +
      '<svg viewBox="0 0 200 130" style="width:100%;max-width:210px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="66" y="34" width="68" height="52" rx="8" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="66" y="74" width="68" height="12" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="100" cy="90" rx="76" ry="14" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Complète : « Ravi ___ un chapeau. »',
    options:['a','est','sont','ont'],
    answer:'a',
    hint:'On possède un chapeau : on l’a. (You own a hat: you “have” it.)',
    explanation:'Ravi possède un chapeau, donc on emploie le verbe avoir : « Ravi <b>a</b> un chapeau. » 🎩 (He has a hat.)' }),

  makeMCQ({ id:'g2fr-grm-083', chapterId:CH_GRM, difficulty:1, subsection:'verbe_etre_avoir',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un rond avec des rayons autour">' +
      '<svg viewBox="0 0 160 160" style="width:100%;max-width:170px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="160" height="160" rx="8" fill="#ffffff"/>' +
      '<circle cx="80" cy="80" r="42" fill="#FACC15" stroke="#F59E0B" stroke-width="3"/>' +
      '<line x1="80" y1="14" x2="80" y2="30" stroke="#F59E0B" stroke-width="4"/>' +
      '<line x1="80" y1="130" x2="80" y2="146" stroke="#F59E0B" stroke-width="4"/>' +
      '<line x1="14" y1="80" x2="30" y2="80" stroke="#F59E0B" stroke-width="4"/>' +
      '<line x1="130" y1="80" x2="146" y2="80" stroke="#F59E0B" stroke-width="4"/>' +
      '<line x1="33" y1="33" x2="45" y2="45" stroke="#F59E0B" stroke-width="4"/>' +
      '<line x1="127" y1="33" x2="115" y2="45" stroke="#F59E0B" stroke-width="4"/>' +
      '<line x1="33" y1="127" x2="45" y2="115" stroke="#F59E0B" stroke-width="4"/>' +
      '<line x1="127" y1="127" x2="115" y2="115" stroke="#F59E0B" stroke-width="4"/>' +
      '</svg></div>' +
      'Quel mot manque : « Le soleil ___ jaune. »',
    options:['est','a','sont','ont'],
    answer:'est',
    hint:'On dit comment il est, pas ce qu’il possède. (We say how it “is”, not what it owns.)',
    explanation:'Jaune est une couleur, donc on emploie le verbe être : « Le soleil <b>est</b> jaune. » ☀️ (Yellow is a colour, so we use “être”.)' }),

  makeMCQ({ id:'g2fr-grm-084', chapterId:CH_GRM, difficulty:2, subsection:'verbe_etre_avoir',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="trois plantes à pétales dessinées">' +
      '<svg viewBox="0 0 260 150" style="width:100%;max-width:270px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="150" rx="8" fill="#ffffff"/>' +
      '<line x1="58" y1="136" x2="58" y2="72" stroke="#22C55E" stroke-width="6"/>' +
      '<circle cx="42" cy="58" r="16" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="74" cy="58" r="16" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="58" cy="38" r="16" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="58" cy="60" r="11" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<line x1="130" y1="136" x2="130" y2="72" stroke="#22C55E" stroke-width="6"/>' +
      '<circle cx="114" cy="58" r="16" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="146" cy="58" r="16" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="130" cy="38" r="16" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="130" cy="60" r="11" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<line x1="202" y1="136" x2="202" y2="72" stroke="#22C55E" stroke-width="6"/>' +
      '<circle cx="186" cy="58" r="16" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="218" cy="58" r="16" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="202" cy="38" r="16" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="202" cy="60" r="11" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Choisis le bon verbe : « Les fleurs ___ rouges. »',
    options:['sont','est','ont','a'],
    answer:'sont',
    hint:'Il y a plusieurs fleurs : le verbe change au pluriel. (There are several flowers: the verb changes in the plural.)',
    explanation:'Plusieurs fleurs + une couleur : « Les fleurs <b>sont</b> rouges. » 🌺 (Several flowers and a colour, so “sont”.)' }),

  makeMCQ({ id:'g2fr-grm-085', chapterId:CH_GRM, difficulty:2, subsection:'verbe_etre_avoir',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un meuble vu de face avec ses pieds">' +
      '<svg viewBox="0 0 220 140" style="width:100%;max-width:230px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="18" y="40" width="184" height="16" rx="3" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="30" y="56" width="14" height="66" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="60" y="56" width="12" height="52" fill="#B45309" stroke="#111827" stroke-width="2"/>' +
      '<rect x="148" y="56" width="12" height="52" fill="#B45309" stroke="#111827" stroke-width="2"/>' +
      '<rect x="176" y="56" width="14" height="66" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Complète : « La table ___ quatre pieds. »',
    options:['a','est','sont','ont'],
    answer:'a',
    hint:'La table possède ses pieds. (The table “has” its legs.)',
    explanation:'On compte ce que la table possède, donc verbe avoir : « La table <b>a</b> quatre pieds. » (The table has four legs.)' }),

  makeMCQ({ id:'g2fr-grm-086', chapterId:CH_GRM, difficulty:2, subsection:'verbe_etre_avoir',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="deux récipients hauts dessinés">' +
      '<svg viewBox="0 0 220 130" style="width:100%;max-width:230px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="47" y="46" width="36" height="58" fill="#F97316"/>' +
      '<polygon points="40,26 90,26 83,110 47,110" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<rect x="137" y="46" width="36" height="58" fill="#F97316"/>' +
      '<polygon points="130,26 180,26 173,110 137,110" fill="none" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Quelle forme convient : « Nous ___ deux verres. »',
    options:['avons','sommes','avez','êtes'],
    answer:'avons',
    hint:'Avec « nous », le verbe avoir devient… (With « nous », the verb “avoir” becomes…)',
    explanation:'Nous possédons deux verres : « Nous <b>avons</b> deux verres. » 🥤 (With “nous”, “avoir” becomes “avons”.)' }),

  makeMCQ({ id:'g2fr-grm-087', chapterId:CH_GRM, difficulty:2, subsection:'verbe_etre_avoir',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un objet plat coloré avec des lignes">' +
      '<svg viewBox="0 0 180 140" style="width:100%;max-width:190px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="180" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="36" y="16" width="108" height="108" rx="4" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="36" y="16" width="16" height="108" fill="#1D4ED8" stroke="#111827" stroke-width="2"/>' +
      '<line x1="62" y1="46" x2="132" y2="46" stroke="#ffffff" stroke-width="3"/>' +
      '<line x1="62" y1="70" x2="132" y2="70" stroke="#ffffff" stroke-width="3"/>' +
      '<line x1="62" y1="94" x2="132" y2="94" stroke="#ffffff" stroke-width="3"/>' +
      '</svg></div>' +
      'Quelle phrase est correcte ?',
    options:['Le cahier est bleu','Le cahier a bleu','Le cahier ont bleu','Le cahier sont bleu'],
    answer:'Le cahier est bleu',
    hint:'Bleu dit comment est le cahier, pas ce qu’il possède. (Blue says how the book “is”, not what it owns.)',
    explanation:'Une couleur va avec le verbe être, au singulier : <b>Le cahier est bleu</b>. 📘 (A colour goes with “être”, singular.)' }),

  // adjectifs_simples (088–093)

  makeMCQ({ id:'g2fr-grm-088', chapterId:CH_GRM, difficulty:1, subsection:'adjectifs_simples',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="deux objets ronds de tailles différentes, marqués A et B">' +
      '<svg viewBox="0 0 240 150" style="width:100%;max-width:250px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="150" rx="8" fill="#ffffff"/>' +
      '<circle cx="66" cy="66" r="46" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="180" cy="88" r="22" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<text x="66" y="140" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">A</text>' +
      '<text x="180" y="140" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">B</text>' +
      '</svg></div>' +
      'Quel ballon est le plus grand ?',
    options:['Le ballon A','Le ballon B','Les deux','Aucun ballon'],
    answer:'Le ballon A',
    hint:'Compare la largeur des deux ronds. (Compare how wide the two circles are.)',
    explanation:'Le ballon <b>A</b> est beaucoup plus large : c’est le plus grand. (Ball A is much wider, so it is the bigger one.)' }),

  makeMCQ({ id:'g2fr-grm-089', chapterId:CH_GRM, difficulty:1, subsection:'adjectifs_simples',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="deux objets pointus de longueurs différentes, marqués A et B">' +
      '<svg viewBox="0 0 220 160" style="width:100%;max-width:230px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="160" rx="8" fill="#ffffff"/>' +
      '<rect x="52" y="18" width="22" height="94" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="52,112 74,112 63,134" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="146" y="76" width="22" height="36" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="146,112 168,112 157,134" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<text x="63" y="152" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">A</text>' +
      '<text x="157" y="152" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">B</text>' +
      '</svg></div>' +
      'Comment est le crayon B ?',
    options:['Court','Long','Gros','Plein'],
    answer:'Court',
    hint:'Les deux crayons sont posés sur la même ligne. Lequel monte le moins haut ? (Both pencils sit on the same line. Which one is shorter?)',
    explanation:'Le crayon B est bien plus petit que le crayon A : il est <b>court</b>. ✏️ (Pencil B is much shorter, so it is “court”.)' }),

  makeMCQ({ id:'g2fr-grm-090', chapterId:CH_GRM, difficulty:1, subsection:'adjectifs_simples',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="deux récipients dont un seul contient quelque chose, marqués A et B">' +
      '<svg viewBox="0 0 220 150" style="width:100%;max-width:230px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="150" rx="8" fill="#ffffff"/>' +
      '<rect x="47" y="30" width="36" height="76" fill="#3B82F6"/>' +
      '<polygon points="40,26 90,26 83,110 47,110" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="130,26 180,26 173,110 137,110" fill="none" stroke="#111827" stroke-width="2"/>' +
      '<text x="65" y="140" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">A</text>' +
      '<text x="155" y="140" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif" text-anchor="middle">B</text>' +
      '</svg></div>' +
      'Complète : « Le verre A est ___ . »',
    options:['plein','vide','propre','cassé'],
    answer:'plein',
    hint:'Regarde jusqu’où monte le liquide dans le verre A. (Look how high the liquid goes in glass A.)',
    explanation:'Le verre A est rempli jusqu’en haut : il est <b>plein</b>. Le verre B, lui, est vide. 🥛 (Glass A is full; glass B is empty.)' }),

  makeMCQ({ id:'g2fr-grm-091', chapterId:CH_GRM, difficulty:2, subsection:'adjectifs_simples',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un panneau rectangulaire debout avec une petite boule">' +
      '<svg viewBox="0 0 140 170" style="width:100%;max-width:150px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="140" height="170" rx="8" fill="#ffffff"/>' +
      '<rect x="30" y="14" width="80" height="142" rx="4" fill="#22C55E" stroke="#111827" stroke-width="3"/>' +
      '<line x1="30" y1="82" x2="110" y2="82" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="98" cy="94" r="6" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Complète : « La porte est ___ . »',
    options:['verte','vert','vertes','verts'],
    answer:'verte',
    hint:'« Porte » est féminin et il n’y en a qu’une. (« Porte » is feminine and there is only one.)',
    explanation:'Féminin singulier : on ajoute un e, « La porte est <b>verte</b>. » 🚪 (Feminine singular takes an e: verte.)' }),

  makeMCQ({ id:'g2fr-grm-092', chapterId:CH_GRM, difficulty:2, subsection:'adjectifs_simples',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="trois objets ronds de la même couleur">' +
      '<svg viewBox="0 0 260 130" style="width:100%;max-width:270px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="130" rx="8" fill="#ffffff"/>' +
      '<circle cx="60" cy="66" r="34" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="130" cy="66" r="34" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="200" cy="66" r="34" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Complète : « Les ballons sont ___ . »',
    options:['bleus','bleu','bleues','bleue'],
    answer:'bleus',
    hint:'« Ballons » est masculin et il y en a plusieurs. (« Ballons » is masculine and there are several.)',
    explanation:'Masculin pluriel : on ajoute un s, « Les ballons sont <b>bleus</b>. » 🔵 (Masculine plural takes an s: bleus.)' }),

  makeMCQ({ id:'g2fr-grm-093', chapterId:CH_GRM, difficulty:2, subsection:'adjectifs_simples',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="un récipient avec une anse">' +
      '<svg viewBox="0 0 180 140" style="width:100%;max-width:190px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="180" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="42" y="36" width="82" height="72" rx="6" fill="#ffffff" stroke="#111827" stroke-width="3"/>' +
      '<path d="M124 54 A20 20 0 0 1 124 92" fill="none" stroke="#111827" stroke-width="4"/>' +
      '<ellipse cx="83" cy="112" rx="52" ry="9" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Complète : « La tasse est ___ . »',
    options:['blanche','blanc','blanches','blancs'],
    answer:'blanche',
    hint:'« Tasse » est féminin, et il n’y en a qu’une. (« Tasse » is feminine, and there is only one.)',
    explanation:'Au féminin singulier, blanc devient <b>blanche</b> : « La tasse est blanche. » ☕ (Blanc becomes blanche in the feminine singular.)' })

);

})();
