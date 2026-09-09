'use strict';
(function () {

STATIC_QUESTIONS.push(

  // ── Heart diagram: labelled vessels Q and R ─────────────────────────────
  // NCE paper pattern: Fig. 4.1 shows a simplified heart with two blood
  // vessels labelled Q and R; students identify which vessel each label names.

  makeMCQ({ id: 'g9s-bdiag-001', chapterId: 'g9s-b1-circulatory', subsection: 'blood_vessels', difficulty: 2,
    question: 'The diagram below shows a simplified heart with two blood vessels labelled Q and R.<br><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 170" width="240" height="170" style="display:block;margin:8px auto">' +
      '<rect x="70" y="55" width="100" height="85" rx="8" fill="#ffe0e0" stroke="#c0392b" stroke-width="2.5"/>' +
      '<line x1="120" y1="55" x2="120" y2="140" stroke="#c0392b" stroke-width="1.5" stroke-dasharray="5,3"/>' +
      '<text x="92" y="102" font-size="10" fill="#c0392b" text-anchor="middle">Right</text>' +
      '<text x="148" y="102" font-size="10" fill="#c0392b" text-anchor="middle">Left</text>' +
      '<rect x="20" y="60" width="50" height="16" rx="3" fill="#6699cc" stroke="#336699" stroke-width="1.5"/>' +
      '<text x="45" y="72" font-size="10" fill="#fff" text-anchor="middle">Q</text>' +
      '<line x1="70" y1="68" x2="70" y2="68" stroke="#336699" stroke-width="2"/>' +
      '<polygon points="70,63 76,68 70,73" fill="#6699cc"/>' +
      '<rect x="170" y="60" width="50" height="16" rx="3" fill="#cc4444" stroke="#991111" stroke-width="1.5"/>' +
      '<text x="195" y="72" font-size="10" fill="#fff" text-anchor="middle">R</text>' +
      '<polygon points="170,63 164,68 170,73" fill="#cc4444"/>' +
      '<text x="120" y="155" font-size="11" fill="#333" text-anchor="middle">Simplified diagram of the heart</text>' +
      '</svg>Which blood vessel is labelled <b>Q</b>?',
    options: ['Vena cava', 'Aorta', 'Pulmonary artery', 'Pulmonary vein'],
    answer: 'Vena cava',
    hint: 'Q enters the right side of the heart carrying deoxygenated blood from the body.',
    explanation: 'Vessel Q enters the <b>right atrium</b> from the body — this is the <b>vena cava</b>, which carries deoxygenated blood back to the heart. The aorta (R) leaves the left ventricle to carry oxygenated blood to the body.' }),

  makeMCQ({ id: 'g9s-bdiag-002', chapterId: 'g9s-b1-circulatory', subsection: 'blood_vessels', difficulty: 2,
    question: 'Using the same heart diagram (Q = vena cava entering the right side), which blood vessel is labelled <b>R</b> leaving the left side of the heart?',
    options: ['Aorta', 'Vena cava', 'Pulmonary vein', 'Coronary artery'],
    answer: 'Aorta',
    hint: 'R leaves the left ventricle — it is the largest artery in the body.',
    explanation: 'Vessel R leaves the <b>left ventricle</b> carrying oxygenated blood to the entire body — this is the <b>aorta</b>, the largest artery. The vena cava (Q) brings deoxygenated blood <em>back</em> to the heart.' }),

  // ── Blood microscopy: 4 numbered components ─────────────────────────────
  // NCE paper pattern: Fig. 1.2 shows a blood smear with four components
  // (1 = RBC, 2 = platelet, 3 = plasma, 4 = WBC); student identifies which
  // numbered component contains haemoglobin.

  makeMCQ({ id: 'g9s-bdiag-003', chapterId: 'g9s-b1-circulatory', subsection: 'components_of_blood', difficulty: 2,
    question: 'The diagram below shows a blood smear with four components numbered 1–4.<br><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 130" width="260" height="130" style="display:block;margin:8px auto">' +
      '<rect x="0" y="0" width="260" height="130" fill="#fff9f0" stroke="#ccc" stroke-width="1"/>' +
      '<text x="130" y="12" font-size="9" fill="#999" text-anchor="middle">Blood smear (microscope view)</text>' +
      '<ellipse cx="45" cy="65" rx="24" ry="16" fill="#ff8888" stroke="#cc2222" stroke-width="1.5"/>' +
      '<ellipse cx="45" cy="65" rx="10" ry="6" fill="#ffbbbb"/>' +
      '<text x="45" y="100" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">1</text>' +
      '<ellipse cx="110" cy="65" rx="7" ry="5" fill="#ffcc88" stroke="#cc8800" stroke-width="1.5"/>' +
      '<text x="110" y="100" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">2</text>' +
      '<text x="175" y="65" font-size="10" fill="#aaaaaa" text-anchor="middle">· · ·</text>' +
      '<text x="175" y="80" font-size="9" fill="#aaaaaa" text-anchor="middle">Plasma</text>' +
      '<text x="175" y="100" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">3</text>' +
      '<circle cx="230" cy="62" r="20" fill="#aaddaa" stroke="#336633" stroke-width="1.5"/>' +
      '<ellipse cx="230" cy="60" rx="10" ry="8" fill="#669966" stroke="none"/>' +
      '<text x="230" y="100" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">4</text>' +
      '</svg>In which component is <b>haemoglobin</b> found?',
    options: ['Component 1', 'Component 4', 'Component 2', 'Component 3'],
    answer: 'Component 1',
    hint: 'Haemoglobin is the red protein that carries oxygen — think about which component gives blood its red colour.',
    explanation: '<b>Haemoglobin</b> is found in <b>Component 1 — red blood cells (RBCs)</b>. The biconcave shape and red colour of RBCs are due to haemoglobin. Component 2 = platelets, 3 = plasma, 4 = white blood cell.' }),

  makeMCQ({ id: 'g9s-bdiag-004', chapterId: 'g9s-b1-circulatory', subsection: 'components_of_blood', difficulty: 2,
    question: 'In the blood smear diagram with four numbered components (1 = RBC, 2 = platelet, 3 = plasma, 4 = WBC), which component is responsible for <b>fighting infection</b>?',
    options: ['Component 4', 'Component 1', 'Component 2', 'Component 3'],
    answer: 'Component 4',
    hint: 'This component has an irregular shape and a visible nucleus.',
    explanation: '<b>Component 4 — white blood cells (WBCs/leucocytes)</b> fight infection by engulfing pathogens (phagocytosis) and producing antibodies. They are the largest and least numerous blood component, recognisable by their large lobed nucleus.' }),

  // ── Photosynthesis arrows A/B/C (text MCQ — no SVG needed) ─────────────
  // NCE paper pattern: Fig. 2.1 shows arrows into/out of a leaf; students
  // identify what substance each arrow represents.

  makeMCQ({ id: 'g9s-bdiag-005', chapterId: 'g9s-b4-plant-nutrition', subsection: 'photosynthesis', difficulty: 2,
    question: 'In a diagram of a leaf during photosynthesis, three arrows are shown: Arrow A points <b>into</b> the leaf from the air above; Arrow B points <b>out of</b> the leaf into the air; Arrow C points <b>up</b> through the stem into the leaf. Which row correctly identifies arrows A, B and C?',
    options: [
      'A = carbon dioxide; B = oxygen; C = water',
      'A = oxygen; B = carbon dioxide; C = water',
      'A = water; B = carbon dioxide; C = oxygen',
      'A = carbon dioxide; B = water; C = oxygen'
    ],
    answer: 'A = carbon dioxide; B = oxygen; C = water',
    hint: 'Recall the word equation: carbon dioxide + water → glucose + oxygen.',
    explanation: 'In photosynthesis: <b>carbon dioxide</b> (A) is absorbed from the air through stomata; <b>oxygen</b> (B) is released as a by-product into the air; <b>water</b> (C) is absorbed by roots and travels up the stem. Word equation: CO₂ + H₂O → glucose + O₂.' })

);

})();
