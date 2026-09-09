'use strict';
(function () {

STATIC_QUESTIONS.push(

  // ── Eutrophication scene (2021 NCE Bio Fig 1.1) ──────────────────────────
  // Farmer releasing fertilisers → algae bloom → dead fish in river.

  makeMCQ({ id: 'g9s-bdm-001', chapterId: 'g9s-b3-biodiversity', subsection: 'human_impact', difficulty: 2,
    question: 'The diagram below shows a scene near a river.<br><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 130" width="300" height="130" style="display:block;margin:8px auto">' +
      '<rect x="0" y="0" width="300" height="130" fill="#f0f8ff" stroke="#ccc" stroke-width="1"/>' +
      '<rect x="0" y="85" width="120" height="45" fill="#8fbc8f"/>' +
      '<text x="15" y="78" font-size="9" fill="#333">Release of</text>' +
      '<text x="15" y="88" font-size="9" fill="#333">fertilisers</text>' +
      '<line x1="60" y1="82" x2="115" y2="82" stroke="#555" stroke-width="1.5" marker-end="url(#a)"/>' +
      '<defs><marker id="a" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#555"/></marker></defs>' +
      '<rect x="120" y="60" width="180" height="70" fill="#4488cc" opacity="0.5"/>' +
      '<ellipse cx="160" cy="72" rx="18" ry="8" fill="#2d8a2d" opacity="0.8"/>' +
      '<ellipse cx="195" cy="78" rx="22" ry="10" fill="#2d8a2d" opacity="0.8"/>' +
      '<text x="220" y="70" font-size="9" fill="#1a5c1a">Growth of</text>' +
      '<text x="220" y="80" font-size="9" fill="#1a5c1a">algae</text>' +
      '<line x1="148" y1="95" x2="180" y2="100" stroke="#888" stroke-width="1.5"/>' +
      '<ellipse cx="145" cy="95" rx="12" ry="5" fill="#ffcc88" stroke="#996600" stroke-width="1"/>' +
      '<line x1="175" y1="108" x2="210" y2="113" stroke="#888" stroke-width="1.5"/>' +
      '<ellipse cx="172" cy="108" rx="12" ry="5" fill="#ffcc88" stroke="#996600" stroke-width="1"/>' +
      '<text x="220" y="100" font-size="9" fill="#663300">Dead fish</text>' +
      '</svg>A farmer releases <b>fertilisers</b> from agricultural land into a nearby river. Algae grows rapidly and fish die. Which harmful environmental process does this diagram show?',
    options: ['Eutrophication', 'Global warming', 'Ozone depletion', 'Deforestation'],
    answer: 'Eutrophication',
    hint: 'Think about what happens when excess nutrients enter a water body.',
    explanation: '<b>Eutrophication</b> occurs when excess fertilisers (containing nitrates and phosphates) run off agricultural land into rivers or lakes. This causes a rapid bloom of algae, which blocks sunlight and depletes oxygen when decomposed, leading to the death of fish and other aquatic life.' }),

  // ── Fertilisation sequence (2021 NCE Bio Fig 1.2) ──────────────────────────
  // sperm + ovum → zygote (X) → foetus

  makeMCQ({ id: 'g9s-bdm-002', chapterId: 'g9s-b2-reproductive', subsection: 'fertilisation', difficulty: 2,
    question: 'A diagram shows the steps in the fertilisation process:<br><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80" width="300" height="80" style="display:block;margin:8px auto">' +
      '<circle cx="40" cy="40" r="24" fill="#ffe0f0" stroke="#cc66aa" stroke-width="2"/>' +
      '<ellipse cx="40" cy="40" rx="12" ry="9" fill="#dd88bb"/>' +
      '<line x1="24" y1="48" x2="16" y2="58" stroke="#cc66aa" stroke-width="1.5"/>' +
      '<text x="28" y="72" font-size="9" fill="#333" text-anchor="middle">Sperm + Ovum</text>' +
      '<text x="78" y="38" font-size="9" fill="#555" text-anchor="middle">fertilisation</text>' +
      '<line x1="67" y1="42" x2="90" y2="42" stroke="#555" stroke-width="1.5" marker-end="url(#b)"/>' +
      '<defs><marker id="b" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#555"/></marker></defs>' +
      '<circle cx="120" cy="40" r="22" fill="#fff0e0" stroke="#cc8844" stroke-width="2"/>' +
      '<ellipse cx="120" cy="40" rx="10" ry="8" fill="#ddaa88"/>' +
      '<text x="120" y="72" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">X</text>' +
      '<line x1="145" y1="40" x2="168" y2="40" stroke="#555" stroke-width="2.5" marker-end="url(#c)"/>' +
      '<defs><marker id="c" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#555"/></marker></defs>' +
      '<ellipse cx="230" cy="36" rx="40" ry="28" fill="#ffddcc" stroke="#cc7744" stroke-width="2"/>' +
      '<circle cx="225" cy="32" r="10" fill="#cc9977"/>' +
      '<text x="230" y="72" font-size="9" fill="#333" text-anchor="middle">Foetus</text>' +
      '</svg>In the diagram, what does stage <b>X</b> represent?',
    options: ['Zygote', 'Embryo', 'Foetus', 'Ovum'],
    answer: 'Zygote',
    hint: 'X is the stage immediately after fertilisation — the result of the sperm and ovum joining.',
    explanation: 'When a sperm cell fertilises an ovum, a <b>zygote</b> is formed. The zygote is the first stage after fertilisation (a single cell with a full set of 46 chromosomes). It then divides repeatedly to form an embryo, then a foetus.' }),

  // ── Leaf skeleton labels (2021 NCE Bio Fig 2.1) ────────────────────────────
  // A=leaf apex (given). B = midrib (central main vein).

  makeMCQ({ id: 'g9s-bdm-003', chapterId: 'g9s-b4-plant-nutrition', subsection: 'leaf_structure', difficulty: 2,
    question: 'A diagram of a leaf skeleton shows four labelled parts. Part A is already identified as the <b>Leaf apex</b>. Part B points to the thick central vein running from the base to the tip of the leaf. What is part B called?',
    options: ['Midrib', 'Lamina', 'Petiole', 'Leaf margin'],
    answer: 'Midrib',
    hint: 'The central main vein forms the backbone of the leaf.',
    explanation: 'The <b>midrib</b> is the central, thickest vein of a leaf, running from the petiole (stalk) to the leaf apex. It supports the leaf and carries vascular tissue (xylem and phloem). The lamina is the flat blade; the petiole is the leaf stalk; the leaf margin is the edge.' }),

  // ── Blood vessel cross-sections (2021 NCE Bio Fig 4.1) ─────────────────────
  // Three cross-sections: artery (thick wall, narrow lumen), vein (thin wall,
  // wide lumen), capillary (tiny, one-cell wall).

  makeMCQ({ id: 'g9s-bdm-004', chapterId: 'g9s-b1-circulatory', subsection: 'blood_vessels', difficulty: 2,
    question: 'Cross-sections of three blood vessels are shown below.<br><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 100" width="260" height="100" style="display:block;margin:8px auto">' +
      '<circle cx="45" cy="45" r="35" fill="#888" stroke="#333" stroke-width="1.5"/>' +
      '<circle cx="45" cy="45" r="18" fill="#ffaaaa"/>' +
      '<text x="45" y="88" font-size="10" text-anchor="middle" fill="#333">Artery</text>' +
      '<circle cx="140" cy="45" r="32" fill="#bbb" stroke="#333" stroke-width="1.5"/>' +
      '<circle cx="140" cy="45" r="24" fill="#ffaaaa"/>' +
      '<text x="140" y="88" font-size="10" text-anchor="middle" fill="#333">Vein</text>' +
      '<circle cx="220" cy="45" r="12" fill="#ddd" stroke="#333" stroke-width="1"/>' +
      '<circle cx="220" cy="45" r="9" fill="#ffaaaa"/>' +
      '<text x="220" y="88" font-size="10" text-anchor="middle" fill="#333">Capillary</text>' +
      '</svg>Which blood vessel has the <b>thickest muscular wall</b>?',
    options: ['Artery', 'Vein', 'Capillary', 'All three are equal'],
    answer: 'Artery',
    hint: 'This vessel must withstand the highest blood pressure directly from the heart.',
    explanation: 'The <b>artery</b> has the thickest muscular wall because it carries blood at high pressure directly from the heart. The thick muscular and elastic walls allow it to stretch and recoil with each heartbeat. Veins have thinner walls and wider lumens; capillaries are one cell thick to allow diffusion of substances.' }),

  // ── Sperm cells (2023 NCE Bio Fig 1.1) ────────────────────────────────────
  // Tadpole-shaped cells with oval head and long tail.

  makeMCQ({ id: 'g9s-bdm-005', chapterId: 'g9s-b2-reproductive', subsection: 'reproduction', difficulty: 1,
    question: 'A microscope slide shows several cells that each have an <b>oval head</b> and a long, whip-like <b>tail</b>. Which cells are these?',
    options: ['Sperm cells', 'Epidermal cells', 'Muscle cells', 'Ovum'],
    answer: 'Sperm cells',
    hint: 'The tail (flagellum) is used for swimming toward the egg cell.',
    explanation: '<b>Sperm cells (spermatozoa)</b> are the male sex cells, each with an oval head containing the nucleus (with genetic material) and a long flagellum (tail) that propels it through fluid. The acrosome on the head contains enzymes to penetrate the ovum during fertilisation.' }),

  // ── Leaf structure X (2023 NCE Bio Fig 1.2) ───────────────────────────────
  // Arrow X points to the flat blade of the leaf = Lamina.

  makeMCQ({ id: 'g9s-bdm-006', chapterId: 'g9s-b4-plant-nutrition', subsection: 'leaf_structure', difficulty: 1,
    question: 'A diagram of a leaf shows an arrow labelled <b>X</b> pointing to the broad, flat blade of the leaf (the main surface between the veins). What is structure X?',
    options: ['Lamina', 'Midrib', 'Leaf apex', 'Leaf margin'],
    answer: 'Lamina',
    hint: 'This is the large flat area of the leaf where photosynthesis mainly occurs.',
    explanation: 'The <b>lamina</b> is the flat, blade-like part of a leaf. It is broad and thin to maximise light absorption for photosynthesis and has a large surface area for gas exchange through stomata. The midrib is the central vein; the leaf apex is the tip; the leaf margin is the edge.' }),

  // ── Blood sample A/B/C labels (2023 NCE Bio Fig 2.1) ──────────────────────
  // A = RBC (large biconcave red cells), B = platelets, C = WBC.

  makeMCQ({ id: 'g9s-bdm-007', chapterId: 'g9s-b1-circulatory', subsection: 'components_of_blood', difficulty: 2,
    question: 'A blood smear diagram labels three components A, B and C. The word bank includes: <b>White blood cell, Red blood cell, Plasma, Platelets</b>. Label A points to the most numerous cells — large, round, biconcave disc-shaped red cells. What is label A?',
    options: ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'],
    answer: 'Red blood cells',
    hint: 'These cells contain haemoglobin and give blood its red colour.',
    explanation: 'Label A represents <b>red blood cells (erythrocytes)</b>. They are the most numerous blood cells, biconcave in shape, and packed with haemoglobin to carry oxygen. They have no nucleus in mature form, which gives more space for haemoglobin.' }),

  // ── Vein valve P (2023 NCE Bio Fig 2.2) ───────────────────────────────────
  // Longitudinal section of a vein showing two flap-like semi-lunar valves (P).

  makeMCQ({ id: 'g9s-bdm-008', chapterId: 'g9s-b1-circulatory', subsection: 'blood_vessels', difficulty: 2,
    question: 'A diagram shows a longitudinal section of a vein. Structure <b>P</b> is formed by two flap-like folds of the vein wall that project inward, touching at their tips. What is the <b>function</b> of structure P?',
    options: [
      'It prevents blood from flowing backward',
      'It prevents the passage of nutrients into cells',
      'It prevents the entry of germs into the bloodstream',
      'It increases blood pressure in the vein'
    ],
    answer: 'It prevents blood from flowing backward',
    hint: 'Veins carry blood at low pressure — without this structure, gravity would cause backflow.',
    explanation: 'Structure P is a <b>valve (semi-lunar valve)</b>. Valves in veins prevent the backflow of blood. Because veins carry blood at low pressure (especially in the legs, against gravity), the valves close when blood starts to flow backwards, keeping blood moving toward the heart in one direction.' }),

  // ── Female reproductive system (2023 NCE Bio Fig 3.1) ──────────────────────
  // Labelled diagram: Oviduct, Ovary, Uterus, Cervix, Vagina.

  makeMCQ({ id: 'g9s-bdm-009', chapterId: 'g9s-b2-reproductive', subsection: 'reproductive_system', difficulty: 2,
    question: 'A labelled diagram of the female reproductive system shows: Oviduct, Ovary, Uterus, Cervix and Vagina. In which structure does <b>fertilisation</b> normally take place?',
    options: ['Oviduct', 'Ovary', 'Uterus', 'Cervix'],
    answer: 'Oviduct',
    hint: 'Fertilisation occurs as the egg travels from the ovary toward the uterus.',
    explanation: 'Fertilisation normally occurs in the <b>oviduct (Fallopian tube)</b>. After an egg is released from the ovary (ovulation), it travels along the oviduct. If sperm are present, fertilisation occurs here, forming a zygote that then implants in the uterus wall.' }),

  // ── Photosynthesis rate experiment (2023 NCE Bio Fig 6.1) ──────────────────
  // Lamp at varying distances from pond plant; count oxygen bubbles per minute.

  makeMCQ({ id: 'g9s-bdm-010', chapterId: 'g9s-b4-plant-nutrition', subsection: 'photosynthesis', difficulty: 2,
    question: 'An experiment places a pond plant in water in a tube. A lamp is placed at distances of 20, 40, 60, 80 and 100 cm from the plant. The number of oxygen bubbles per minute is recorded: 20 cm → 29 bubbles; 40 cm → 16; 60 cm → 8; 80 cm → 3; 100 cm → 1. What conclusion can be drawn?',
    options: [
      'As distance decreases, the rate of photosynthesis increases',
      'As distance decreases, the rate of photosynthesis decreases',
      'Distance has no effect on the rate of photosynthesis',
      'The plant stops photosynthesising at 100 cm'
    ],
    answer: 'As distance decreases, the rate of photosynthesis increases',
    hint: 'More bubbles = more oxygen produced = higher rate of photosynthesis.',
    explanation: 'As the lamp is moved <b>closer</b> to the plant, the <b>light intensity increases</b>, so more oxygen is produced per minute (29 bubbles at 20 cm vs 1 at 100 cm). This shows that light intensity is a limiting factor for photosynthesis: the closer the lamp, the faster the rate. Word equation: CO₂ + H₂O → glucose + O₂.' })

);

})();
