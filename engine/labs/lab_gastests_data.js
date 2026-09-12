'use strict';
// ══════════════════════════════════════════════
//  Science Labs - the science behind Gas Tests (Science, Grade 7).
//
//  ⚠ THE SCIENCE LIVES HERE, NOT IN THE ANIMATION. Every gas property,
//    test result, hazard, fact, guide step, discovery, mission and quiz
//    question the bench can show comes from this file. lab_gastests.js
//    only draws and animates. If something looks wrong on screen, fix it HERE.
//  ⚠ Grounded in Grade 7 Science, chapter g7s-air
//    ("Test for the presence of oxygen and carbon dioxide", syllabus):
//    - g7s-hd-096: glowing splint relights = oxygen (supports burning)
//    - g7s-hd-097: limewater turns milky = carbon dioxide
//    - g7s-hd-104: a splint going out does NOT prove CO₂; need limewater too
//    - g7s-air-019: limewater (calcium hydroxide solution) turns milky for CO₂
//    - g7s-hd-098: only oxygen supports burning; nitrogen does not
//    - g7s-hd-106: air is a mixture, not a compound
//    scripts/test-labs-gastests-data.js checks every equation and result.
//
//  Hydrogen is included as the third standard gas test taught in Mauritian
//  secondary science. Its source reaction (Zn + 2HCl → ZnCl₂ + H₂) and the
//  squeaky-pop test are Grade 7/8 syllabus content in the MIE NCF.
//
//  Equations:
//    O₂ from H₂O₂:   2H₂O₂ → 2H₂O + O₂  (MnO₂ catalyst)
//    CO₂ from acid:   CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂
//    CO₂ test:        CO₂ + Ca(OH)₂ → CaCO₃ + H₂O
//    H₂ from acid:    Zn + 2HCl → ZnCl₂ + H₂
//    H₂ burning:      2H₂ + O₂ → 2H₂O
//  Time-lapse: 1 second on the bench = about 30 seconds in a real lab.
// ══════════════════════════════════════════════
const LabGastestsData = (() => {

  const GRADES = [7];
  const forGrade = (list, g) => list.filter(x => (x.grades || [7]).includes(g));

  // ── Gases ─────────────────────────────────────────────────────────────────
  // Each gas: its name, formula, how it is made in the lab, how it is collected,
  // its colour on screen, and the visual state of the collection tube.
  const GASES = {
    o2: {
      id: 'o2', name: 'Oxygen', formula: 'O₂', icon: '🌬️',
      color: '#DFF0FF', bubbleColor: '#BDDFF7',
      generator: 'hydrogen peroxide + manganese dioxide',
      generatorFull: 'hydrogen peroxide (H₂O₂) with manganese dioxide (MnO₂) as a catalyst',
      reaction: '2H₂O₂ → 2H₂O + O₂',
      collection: 'upward displacement of water',
      collectNote: 'Oxygen is denser than water vapour, so it can be collected by upward displacement.',
      stationColor: '#BDD7F2',
      meta: 'Colourless, slightly denser than air, supports burning',
    },
    co2: {
      id: 'co2', name: 'Carbon dioxide', formula: 'CO₂', icon: '🌫️',
      color: '#E0EEE0', bubbleColor: '#B5D4B5',
      generator: 'marble chips + dilute hydrochloric acid',
      generatorFull: 'marble chips (calcium carbonate, CaCO₃) and dilute hydrochloric acid (HCl)',
      reaction: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂',
      collection: 'downward displacement of air',
      collectNote: 'Carbon dioxide is denser than air, so it sinks and fills a test tube pointing downward.',
      stationColor: '#C0D8C0',
      meta: 'Colourless, denser than air, does not support burning, turns limewater milky',
    },
    h2: {
      id: 'h2', name: 'Hydrogen', formula: 'H₂', icon: '💥',
      color: '#FFF5CC', bubbleColor: '#FFE47A',
      generator: 'zinc + dilute hydrochloric acid',
      generatorFull: 'zinc granules (Zn) and dilute hydrochloric acid (HCl)',
      reaction: 'Zn + 2HCl → ZnCl₂ + H₂',
      collection: 'upward displacement of water',
      collectNote: 'Hydrogen is the lightest gas, far less dense than air, so it rises and fills a downward-pointing tube.',
      stationColor: '#F5E8B0',
      meta: 'Colourless, much less dense than air, burns with a squeaky pop',
    },
  };
  const GAS_ORDER = ['o2', 'co2', 'h2'];

  // ── Tests ─────────────────────────────────────────────────────────────────
  const TESTS = {
    glowing: {
      id: 'glowing', name: 'Glowing splint', icon: '🪵',
      desc: 'A wooden splint is lit, blown out, and the glowing tip is lowered into the gas.',
      key: 'glowing splint',
    },
    lit: {
      id: 'lit', name: 'Lighted splint', icon: '🔥',
      desc: 'A burning (lit) wooden splint is held at the mouth of the tube.',
      key: 'lighted splint',
    },
    limewater: {
      id: 'limewater', name: 'Limewater', icon: '🥛',
      desc: 'The gas is bubbled through clear limewater (calcium hydroxide solution).',
      key: 'limewater test',
    },
  };

  // testResult: what happens when a test is applied to a gas.
  // correct = true when this is the proper test for this gas.
  // fx = the canvas animation id.
  function testResult(gasId, testId) {
    const r = (correct, saw, learn, fx, word, sym) => ({ correct, saw, learn, fx, word, sym: sym || '' });
    if (gasId === 'o2') {
      if (testId === 'glowing') return r(true,
        'The glowing splint burst back into flame.',
        'Oxygen supports burning. It restored the conditions the splint needed to keep alight — so the glowing tip caught fire again. This is called relighting.',
        'relight',
        'oxygen + splint → flame (relighting)',
        'O₂ restores combustion');
      if (testId === 'lit') return r(false,
        'The lit splint went on burning, but nothing else happened.',
        'A burning splint stays lit in oxygen — it does not distinguish oxygen from ordinary air. The correct test uses a GLOWING splint. A glowing splint relights in pure oxygen but not in air.',
        'nothing',
        '— glowing splint needed, not a lit one',
        '');
      if (testId === 'limewater') return r(false,
        'The limewater stayed clear — no change.',
        'Limewater stays clear in oxygen. Limewater tests for carbon dioxide, not for oxygen. Use the glowing splint for the oxygen test.',
        'clear',
        '— limewater stays clear (oxygen is not CO₂)',
        '');
    }
    if (gasId === 'co2') {
      if (testId === 'limewater') return r(true,
        'The limewater turned milky (cloudy white).',
        'Carbon dioxide reacts with calcium hydroxide in limewater to form tiny solid particles of calcium carbonate, which scatter light and make the solution appear milky. Say "milky" or "cloudy", not "white" — the precipitate is suspended.',
        'milky',
        'carbon dioxide + calcium hydroxide → calcium carbonate + water',
        'CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O');
      if (testId === 'glowing') return r(false,
        'The glowing splint went out.',
        'Carbon dioxide does not support burning, so the splint goes out. But nitrogen and most other gases also put a splint out. A splint going out only shows "not oxygen" — it does not identify the gas. Always follow up with limewater.',
        'out',
        '— glowing splint goes out (but nitrogen does too)',
        '');
      if (testId === 'lit') return r(false,
        'The lit splint went out.',
        'Carbon dioxide smothers a flame. But so does nitrogen. A flame going out does not tell you which non-oxygen gas is present. Use the limewater test to confirm carbon dioxide.',
        'out',
        '— flame goes out (not specific to CO₂)',
        '');
    }
    if (gasId === 'h2') {
      if (testId === 'lit') return r(true,
        'There was a squeaky pop and a small flash of flame at the tube mouth.',
        'Hydrogen burns rapidly in air, combining with oxygen to form water. The small volume in the tube burns very quickly, producing a characteristic sharp pop — the squeaky-pop test. Water is the only product.',
        'pop',
        'hydrogen + oxygen → water',
        '2H₂ + O₂ → 2H₂O');
      if (testId === 'glowing') return r(false,
        'There was a small pop, but the splint was damaged in the flash.',
        'The glowing splint can set off the hydrogen, but it risks a more violent reaction and the splint tip is inside the tube — it could shatter the glass. Always use a lighted splint held at the MOUTH of the tube for the hydrogen test.',
        'danger',
        '— lit splint at the mouth, not glowing splint inside the tube',
        '');
      if (testId === 'limewater') return r(false,
        'The limewater stayed clear — no change.',
        'Hydrogen does not react with limewater. Limewater only turns milky in carbon dioxide. Use the lighted splint at the mouth of the tube to test for hydrogen.',
        'clear',
        '— limewater stays clear (hydrogen is not CO₂)',
        '');
    }
    return null;
  }

  // Which test is the correct one for each gas.
  const CORRECT_TEST = { o2: 'glowing', co2: 'limewater', h2: 'lit' };

  // hazardFor: returns a hazard id if performing this test on this gas without
  // goggles risks a specific danger, or null if it is safe.
  function hazardFor(gasId, testId, goggles) {
    if (!goggles && gasId === 'h2') return 'no_goggles_h2';
    if (!goggles && gasId === 'o2' && testId === 'lit') return 'no_goggles_lit_o2';
    if (gasId === 'h2' && testId === 'glowing') return 'glowing_in_h2';
    return null;
  }

  // ── Hazards ───────────────────────────────────────────────────────────────
  // Every hazard has: signs, fx, title(), happened(), why, instead, exam.
  // `signs` are kinds from Labs.SIGN_LABELS + the ones added in lab_core.js.
  const HAZARDS = {
    no_goggles_h2: {
      grades: [7],
      signs: ['goggles', 'hot'],
      fx: 'splash',
      title: () => 'Stop — protect your eyes',
      happened: () => 'You held a lighted splint near the hydrogen tube without safety goggles. The pop sent a brief flash toward your face.',
      why: 'Hydrogen burns explosively in air. Even a small tube can produce a bright flash. A drop of hot water can also be ejected. Eyes are the most vulnerable organ in the lab.',
      instead: 'Always put on safety goggles before testing any gas. Tap 🥽 at the top before you apply a test.',
      exam: () => 'In the science exam: you may be asked to name a safety precaution when testing gases — "wear safety goggles" is always a correct answer.',
    },
    no_goggles_lit_o2: {
      grades: [7],
      signs: ['goggles', 'hot'],
      fx: 'splash',
      title: () => 'Stop — goggles on before testing',
      happened: () => 'You lowered a lit splint into the oxygen tube without goggles. A brief flash of flame appeared at the mouth of the tube.',
      why: 'Pure oxygen makes things burn far more vigorously than normal. A lit splint in oxygen burns brightly and suddenly. Goggles protect against heat and any ejected material.',
      instead: 'Put on safety goggles before applying any test to a collected gas. For the oxygen test, the correct tool is a GLOWING splint, not a lit one.',
      exam: () => 'In the science exam: safety goggles must be worn when handling gases in the laboratory, especially when using a flame near a combustion-supporting gas like oxygen.',
    },
    glowing_in_h2: {
      grades: [7],
      signs: ['goggles', 'hot'],
      fx: 'pop',
      title: () => 'Wrong splint for hydrogen — and unsafe',
      happened: () => 'You lowered a glowing splint inside the hydrogen tube. The splint tip ignited the hydrogen inside the tube and produced a small explosion.',
      why: 'A glowing splint placed inside a tube of hydrogen ignites the gas where it is most concentrated. The reaction is faster than at the mouth of the tube and can crack the glass or spray hot water.',
      instead: 'For the hydrogen test, hold a LIGHTED splint at the MOUTH (opening) of the tube — not inside it. The squeaky pop happens safely at the opening. The glowing splint is the test for oxygen, not hydrogen.',
      exam: () => 'In the science exam: a common trap is confusing the glowing splint (oxygen) with the lighted splint (hydrogen). Remember: GLOW → O₂, LIT → H₂.',
    },
    no_goggles_acid: {
      grades: [7],
      signs: ['goggles', 'irritant'],
      fx: 'splash',
      title: () => 'Goggles on — hydrochloric acid is in use',
      happened: () => 'You started setting up the hydrogen generator without safety goggles. A small spray of dilute hydrochloric acid reached your face.',
      why: 'Dilute hydrochloric acid irritates the eyes and skin. Even a small splash in the eye is painful and can cause injury.',
      instead: 'Put on safety goggles before you begin setting up any station that uses acid — the hydrogen station uses dilute hydrochloric acid. Tap 🥽 at the top.',
      exam: () => 'In the science exam: safety goggles must be worn whenever dilute acid is used in the laboratory.',
    },
  };

  // ── Result cards (wrong-but-safe mistakes) ────────────────────────────────
  const RESULTS = {
    excess_co2: {
      grades: [7],
      icon: '🔄',
      title: () => 'The limewater cleared again',
      happened: () => 'You bubbled a lot of carbon dioxide through the limewater. It first went milky, then the cloudiness disappeared and the solution became clear again.',
      instead: 'The limewater goes milky as CaCO₃ forms. With excess CO₂ the CaCO₃ dissolves to form calcium hydrogencarbonate (Ca(HCO₃)₂), which is soluble, so the solution clears. The test is still positive — milky is the result to report. Stop bubbling as soon as it goes milky.',
      exam: () => 'In the science exam: "turns milky" is the correct result for the limewater test. The excess CO₂ clearing is beyond the Grade 7 syllabus but a good observation.',
    },
    stale_gas: {
      grades: [7],
      icon: '💨',
      title: () => 'Result was unreliable — air in the tube',
      happened: () => 'You applied the test before enough gas had collected. The tube still contained mostly air, so the test result was not clear.',
      instead: 'Wait until the generator is producing a steady stream of bubbles, then collect for several seconds before testing. The tube should be mostly full of the gas, not air.',
      exam: () => 'In the science exam: the collected gas must displace all or nearly all the air from the tube before the test is applied. Otherwise the result is diluted and unreliable.',
    },
    wrong_splint: {
      grades: [7],
      icon: '🎯',
      title: () => 'Splint type matters — glowing vs lit',
      happened: () => 'You used the wrong type of splint and the result did not identify the gas. In the oxygen test a GLOWING splint is used; in the hydrogen test a LIGHTED (burning) splint is held at the mouth.',
      instead: 'Remember: glowing splint → oxygen test (the splint relights). Lighted splint at the mouth → hydrogen test (squeaky pop). Using the lit splint for oxygen or the glowing splint inside hydrogen both give uncertain or dangerous results.',
      exam: () => 'In the science exam: a glowing splint that relights = oxygen. A lighted splint that pops = hydrogen. This distinction is a common exam question.',
    },
  };

  // ── Discoveries ───────────────────────────────────────────────────────────
  // `how` lists guide tokens in order. The bench plays them end to end; the
  // discovery unlocks once the key event (`unlock`) fires.
  // `unlock` = the token that completes it.
  const DISCOVERIES = [
    // ── Oxygen ──
    { id: 'd_o2_source', icon: '⚗️', title: 'Where lab oxygen comes from', grades: [7],
      hint: 'Set up the oxygen generator and watch it work',
      how: ['goggles', 'station:o2', 'setup', 'collect'],
      unlock: 'collect:o2',
      saw: 'Bubbles formed in the hydrogen peroxide the moment the manganese dioxide was added. Gas filled the tube steadily.',
      learn: 'Manganese dioxide is a catalyst — it speeds up the decomposition of hydrogen peroxide into water and oxygen without being used up itself. Equation: 2H₂O₂ → 2H₂O + O₂.' },

    { id: 'd_o2_test', icon: '🪵', title: 'Glowing splint relights in oxygen', grades: [7],
      hint: 'Collect oxygen and use the glowing splint',
      how: ['goggles', 'station:o2', 'setup', 'collect', 'test:glowing'],
      unlock: 'result:o2:glowing',
      saw: 'The glowing splint burst back into flame the moment it entered the oxygen tube.',
      learn: 'Oxygen supports combustion. The glowing tip had enough energy to restart burning once surrounded by pure oxygen. This is the standard lab test for oxygen — if the splint relights, the gas is oxygen (g7s-hd-096).' },

    { id: 'd_o2_air', icon: '🌍', title: 'Air is 78% nitrogen and 21% oxygen', grades: [7],
      hint: 'Open the air-composition display at the oxygen station',
      how: ['station:o2', 'aircomp'],
      unlock: 'aircomp',
      saw: 'The pie chart showed nitrogen at about 78%, oxygen at about 21%, and less than 1% for everything else combined.',
      learn: 'Dry air is mainly nitrogen (about 78%) and oxygen (about 21%). Carbon dioxide is only about 0.04%. The rest is mostly argon. Only the oxygen part supports burning (g7s-hd-098).' },

    { id: 'd_nitrogen_splint', icon: '❌', title: 'Nitrogen puts the glowing splint out', grades: [7],
      hint: 'Test a tube of nitrogen with the glowing splint',
      how: ['station:o2', 'test_nitrogen', 'test:glowing'],
      unlock: 'result:n2:glowing',
      saw: 'The glowing splint went straight out when it entered the nitrogen tube.',
      learn: 'Nitrogen does not support burning — it is a very unreactive gas. A glowing splint going OUT only shows "not oxygen". It does NOT identify the gas (g7s-hd-104). The limewater test is needed to confirm CO₂.' },

    { id: 'd_o2_physical_chem', icon: '🔬', title: 'Collecting gas is a physical change', grades: [7],
      hint: 'Compare the generator before and after collecting',
      how: ['goggles', 'station:o2', 'setup', 'collect', 'observe'],
      unlock: 'observe:o2',
      saw: 'The gas collected was still oxygen — the same substance as left the generator. No new substance was formed in the collection step.',
      learn: 'Collecting gas by displacement is a physical change — you have separated and moved a substance without changing what it is. The decomposition of H₂O₂ that made the oxygen was the chemical change.' },

    // ── Carbon dioxide ──
    { id: 'd_co2_source', icon: '🧪', title: 'Where lab CO₂ comes from', grades: [7],
      hint: 'Set up the CO₂ generator',
      how: ['goggles', 'station:co2', 'setup', 'collect'],
      unlock: 'collect:co2',
      saw: 'Vigorous bubbling started as soon as the acid touched the marble chips. The tube filled with gas.',
      learn: 'Marble chips are calcium carbonate (CaCO₃). Hydrochloric acid reacts with it to give calcium chloride, water and carbon dioxide gas. Equation: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂.' },

    { id: 'd_co2_test', icon: '🥛', title: 'Limewater goes milky in CO₂', grades: [7],
      hint: 'Collect CO₂ and bubble it through limewater',
      how: ['goggles', 'station:co2', 'setup', 'collect', 'test:limewater'],
      unlock: 'result:co2:limewater',
      saw: 'The clear limewater turned milky (cloudy white) as the gas bubbled through it.',
      learn: 'Carbon dioxide reacts with calcium hydroxide in limewater to form tiny particles of calcium carbonate, which scatter light and make the solution appear milky. Equation: CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O. Say "milky" or "cloudy", not "white" (g7s-air-019, g7s-hd-097).' },

    { id: 'd_co2_equation', icon: '⚗️', title: 'The CO₂ test equation', grades: [7],
      hint: 'Read the equation on the limewater test result',
      how: ['goggles', 'station:co2', 'setup', 'collect', 'test:limewater', 'equation'],
      unlock: 'equation:co2',
      saw: 'The equation appeared: CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O.',
      learn: 'Calcium carbonate (CaCO₃) is the milky solid. It has a downward arrow (↓) because it is a precipitate — a solid that forms inside a solution. Calcium hydroxide is the solute in limewater.' },

    { id: 'd_co2_no_burn', icon: '🕯️', title: 'CO₂ does not support burning', grades: [7],
      hint: 'Try the glowing splint in CO₂',
      how: ['goggles', 'station:co2', 'setup', 'collect', 'test:glowing'],
      unlock: 'result:co2:glowing',
      saw: 'The glowing splint went straight out.',
      learn: 'Carbon dioxide does not support burning. Fire extinguishers use CO₂ to smother flames. But a splint going out is not proof of CO₂ — nitrogen does the same. Use limewater to confirm (g7s-hd-104).' },

    { id: 'd_acid_carbonate', icon: '🫧', title: 'Acid + carbonate → CO₂', grades: [7],
      hint: 'Watch the marble chips react with the acid',
      how: ['goggles', 'station:co2', 'setup', 'observe'],
      unlock: 'observe:co2',
      saw: 'The marble chips fizzing and shrinking as they reacted with the acid.',
      learn: 'This is the acid + carbonate reaction pattern. Any carbonate or hydrogencarbonate with an acid gives off carbon dioxide. Marble, chalk and limestone are all forms of CaCO₃ and all react this way.' },

    // ── Hydrogen ──
    { id: 'd_h2_source', icon: '⚗️', title: 'Where lab hydrogen comes from', grades: [7],
      hint: 'Set up the hydrogen generator',
      how: ['goggles', 'station:h2', 'setup', 'collect'],
      unlock: 'collect:h2',
      saw: 'Bubbles formed at the surface of the zinc granules as soon as the acid was added.',
      learn: 'Zinc reacts with dilute hydrochloric acid to give zinc chloride and hydrogen gas. Equation: Zn + 2HCl → ZnCl₂ + H₂. Many metals react with dilute acids in this way to give hydrogen.' },

    { id: 'd_h2_test', icon: '💥', title: 'Squeaky pop — the hydrogen test', grades: [7],
      hint: 'Collect hydrogen and hold a lighted splint at the tube mouth',
      how: ['goggles', 'station:h2', 'setup', 'collect', 'test:lit'],
      unlock: 'result:h2:lit',
      saw: 'There was a sharp squeaky pop and a brief flash at the mouth of the tube.',
      learn: 'Hydrogen burns rapidly in air, combining with oxygen to form water: 2H₂ + O₂ → 2H₂O. The small volume burns in a fraction of a second, producing the characteristic squeaky pop. The only product is water (steam).' },

    { id: 'd_h2_water', icon: '💧', title: 'Burning hydrogen makes water', grades: [7],
      hint: 'Look at the inside of the tube after the squeaky pop',
      how: ['goggles', 'station:h2', 'setup', 'collect', 'test:lit', 'afterpop'],
      unlock: 'afterpop',
      saw: 'Tiny droplets of liquid appeared on the inside of the tube after the pop.',
      learn: 'The product of hydrogen burning in oxygen is water (H₂O). This is why hydrogen is studied as a clean fuel — burning it releases energy and produces no carbon dioxide, only water.' },

    { id: 'd_glow_vs_lit', icon: '🎯', title: 'Glowing vs lighted splint', grades: [7],
      hint: 'Try the wrong splint at each station and read the result',
      how: ['goggles', 'station:o2', 'setup', 'collect', 'test:lit'],
      unlock: 'wrongtest:o2:lit',
      saw: 'The lit splint in oxygen kept burning but gave no clear result — and the correct test requires a GLOWING splint.',
      learn: 'The two tests use different splints on purpose. For OXYGEN: glowing splint, which relights. For HYDROGEN: lighted splint held at the mouth, which pops. Swapping them gives an unclear or unsafe result — this is a classic exam trap (g7s-hd-096).' },

    { id: 'd_two_tests_co2', icon: '🔍', title: 'One test is not enough to identify CO₂', grades: [7],
      hint: 'Test CO₂ with the glowing splint, then with limewater',
      how: ['goggles', 'station:co2', 'setup', 'collect', 'test:glowing'],
      unlock: 'wrongtest:co2:glowing',
      saw: 'The glowing splint went out in CO₂ — but nitrogen would do the same.',
      learn: 'A splint going out only shows "this gas is not oxygen". Carbon dioxide AND nitrogen both extinguish a glowing splint. To confirm CO₂, you MUST use the limewater test (g7s-hd-104).' },

    { id: 'd_excess_co2', icon: '🔄', title: 'Too much CO₂ clears the limewater', grades: [7],
      hint: 'Keep bubbling CO₂ through limewater past the milky point',
      how: ['goggles', 'station:co2', 'setup', 'collect', 'test:limewater', 'excess'],
      unlock: 'excess:co2',
      saw: 'The limewater first turned milky, then gradually cleared again as more CO₂ was bubbled through.',
      learn: 'With excess CO₂ the insoluble calcium carbonate (CaCO₃) reacts further to form soluble calcium hydrogencarbonate: CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂. This is beyond the Grade 7 syllabus but a real observation. Stop as soon as the limewater goes milky.' },
  ];

  // ── Facts ─────────────────────────────────────────────────────────────────
  const FACTS = [
    { t: 'Air is about 78% nitrogen and 21% oxygen. The remaining 1% is mostly argon and a tiny amount of carbon dioxide.', grades: [7] },
    { t: 'Oxygen supports burning. A glowing splint relights in pure oxygen because combustion can continue.', grades: [7] },
    { t: 'Carbon dioxide is used in fire extinguishers because it does not support burning and is denser than air.', grades: [7] },
    { t: 'Hydrogen is the lightest element. It is about 14 times lighter than air.', grades: [7] },
    { t: 'Limewater is a solution of calcium hydroxide — Ca(OH)₂ — in water. It is colourless when pure.', grades: [7] },
    { t: 'Burning hydrogen produces only water — no carbon dioxide. Scientists study it as a clean fuel.', grades: [7] },
    { t: 'Manganese dioxide is a catalyst in the H₂O₂ decomposition — it speeds the reaction but is not used up.', grades: [7] },
    { t: 'Marble, limestone and chalk are all calcium carbonate (CaCO₃). They all fizz with any acid.', grades: [7] },
    { t: 'A squeaky pop is the sound of a small volume of hydrogen burning very fast — almost instantly.', grades: [7] },
    { t: 'Nitrogen makes up most of the air but is very unreactive. It does not support burning or turn limewater milky.', grades: [7] },
    { t: 'The milky solid in the limewater test is calcium carbonate (CaCO₃) — tiny particles suspended in the liquid.', grades: [7] },
    { t: 'Collecting gas by displacement is a physical change. The gas is the same substance before and after collection.', grades: [7] },
    { t: 'Many metals react with dilute acids to produce hydrogen gas. Zinc + HCl is the safest version for a school lab.', grades: [7] },
  ];

  // ── Guided experiments ─────────────────────────────────────────────────────
  // Steps: one token each. `btn` = a button appears in the guide box; no `btn`
  // = a "watch" step that completes automatically.
  // Tokens: goggles · station:<id> · setup · collect · test:<id> ·
  //         observe · equation · aircomp · excess · afterpop · test_nitrogen
  const GUIDES = [
    { id: 'g_o2', icon: '🪵', title: 'Test for oxygen', grades: [7],
      blurb: 'Collect oxygen from hydrogen peroxide, then lower a glowing splint into the tube.',
      lesson: 'A glowing splint relights in pure oxygen — this is the standard test for oxygen. Oxygen supports combustion: it allows burning to continue.',
      steps: [
        { on: 'goggles',      say: 'Tap 🥽 Goggles at the top to put them on first!' },
        { on: 'station:o2',   say: 'Tap the 🌬️ Oxygen station button above the canvas.' },
        { on: 'setup',        say: 'Tap ⚗️ Set up to add the chemicals and watch the bubbles start.' },
        { on: 'collect',      say: 'Tap 🧪 Collect gas to fill the tube.' },
        { on: 'test:glowing', say: 'Tap 🪵 Glowing splint in the toolbar to test the gas.' },
        { on: 'observe',      say: 'Watch what happens to the splint…' },
      ] },
    { id: 'g_co2', icon: '🥛', title: 'Test for carbon dioxide', grades: [7],
      blurb: 'Collect CO₂ from marble chips and acid, then bubble it through limewater.',
      lesson: 'Limewater goes milky in carbon dioxide. The milky colour comes from tiny particles of calcium carbonate (CaCO₃) — a precipitate.',
      steps: [
        { on: 'goggles',        say: 'Tap 🥽 Goggles — the generator uses acid!' },
        { on: 'station:co2',    say: 'Tap the 🌫️ CO₂ station button above the canvas.' },
        { on: 'setup',          say: 'Tap ⚗️ Set up to add marble chips and acid. The fizzing is your CO₂!' },
        { on: 'collect',        say: 'Tap 🧪 Collect gas to fill the tube.' },
        { on: 'test:limewater', say: 'Tap 🥛 Limewater in the toolbar to bubble the gas through it.' },
        { on: 'observe',        say: 'Watch the limewater…' },
      ] },
    { id: 'g_h2', icon: '💥', title: 'Test for hydrogen', grades: [7],
      blurb: 'Collect hydrogen from zinc and acid, then hold a lighted splint at the tube mouth.',
      lesson: 'Hydrogen burns rapidly in air to give water. The small volume in the tube burns almost instantly — the squeaky pop.',
      steps: [
        { on: 'goggles',    say: 'Tap 🥽 Goggles — you\'re working with acid and a flammable gas!' },
        { on: 'station:h2', say: 'Tap the 💥 Hydrogen station button above the canvas.' },
        { on: 'setup',      say: 'Tap ⚗️ Set up to add zinc and acid.' },
        { on: 'collect',    say: 'Tap 🧪 Collect gas to fill the tube.' },
        { on: 'test:lit',   say: 'Tap 🔥 Lighted splint — hold it at the MOUTH of the tube, not inside.' },
        { on: 'observe',    say: 'Listen for the pop…' },
      ] },
  ];

  // ── Missions ───────────────────────────────────────────────────────────────
  // `quiz`: first option is the answer (shuffled on screen).
  const MISSIONS = [
    {
      id: 'unknown_gas', icon: '❔', title: 'Identify the unknown gas', grades: [7],
      blurb: 'A mystery gas has been collected. Apply each test in turn and work out which gas it is.',
      intro: 'Three unlabelled tubes — only one is real and ready. Apply the correct tests and follow the results to identify the gas.',
      quiz: [
        { q: 'A glowing splint is lowered into a gas jar and bursts back into flame. What is the gas?',
          options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'],
          why: 'Relighting a glowing splint is the standard test for oxygen. Carbon dioxide and nitrogen would put the splint out instead.' },
        { q: 'Clear limewater turns milky when a gas is bubbled through it. What is the gas?',
          options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'],
          why: 'Limewater turns milky only in carbon dioxide: CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O.' },
        { q: 'A lighted splint held at the mouth of a test tube produces a squeaky pop. What is the gas?',
          options: ['Hydrogen', 'Oxygen', 'Carbon dioxide', 'Nitrogen'],
          why: 'Hydrogen burns rapidly in air, giving a squeaky pop. The only product is water: 2H₂ + O₂ → 2H₂O.' },
        { q: 'A glowing splint is lowered into a gas and goes out. What does this tell you?',
          options: ['The gas is not oxygen', 'The gas is carbon dioxide', 'The gas is nitrogen', 'The gas is hydrogen'],
          why: 'A splint going out only shows "not oxygen". Both carbon dioxide and nitrogen extinguish a glowing splint. You need the limewater test to confirm CO₂ (g7s-hd-104).' },
        { q: 'Which gas is produced when marble chips react with dilute hydrochloric acid?',
          options: ['Carbon dioxide', 'Oxygen', 'Hydrogen', 'Nitrogen'],
          why: 'Marble is CaCO₃. The reaction is CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂, so carbon dioxide is given off.' },
      ],
    },
    {
      id: 'gas_expert', icon: '🏅', title: 'Gas test expert', grades: [7],
      blurb: 'Given a result, name the gas and the correct test. Show you know all three.',
      intro: 'Gas test expert! For each question, use what you know about the three gas tests to give the right answer.',
      quiz: [
        { q: 'What is the correct test for oxygen?',
          options: ['Lower a glowing splint into the gas', 'Bubble the gas through limewater', 'Hold a lighted splint at the tube mouth', 'Dip red litmus paper into the gas'],
          why: 'The glowing splint test for oxygen: the splint relights in pure oxygen because oxygen supports combustion (g7s-hd-096).' },
        { q: 'What is the correct test for carbon dioxide?',
          options: ['Bubble the gas through limewater', 'Lower a glowing splint into the gas', 'Hold a lighted splint at the tube mouth', 'Add universal indicator to the gas'],
          why: 'Limewater turns milky (cloudy) in carbon dioxide: CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O (g7s-air-019).' },
        { q: 'What is the correct test for hydrogen?',
          options: ['Hold a lighted splint at the mouth of the tube', 'Bubble the gas through limewater', 'Lower a glowing splint into the gas', 'Heat the gas with a Bunsen burner'],
          why: 'The lighted splint at the tube mouth: hydrogen burns rapidly in air and gives a squeaky pop.' },
        { q: 'In the oxygen test, why must the splint be glowing and not burning?',
          options: ['A burning splint does not show a clear result in oxygen', 'A glowing splint is safer and easier to carry', 'A burning splint would put the oxygen out', 'A glowing splint is the test for hydrogen'],
          why: 'A burning splint stays lit in oxygen but gives no distinctive result. Only a GLOWING splint clearly relights, showing that oxygen is present and supporting renewed combustion.' },
        { q: 'A student says a glowing splint going out proves the gas is carbon dioxide. What is wrong?',
          options: ['Nitrogen also puts a glowing splint out, so one test is not enough', 'Only a lit splint can go out in carbon dioxide', 'Carbon dioxide always relights a glowing splint', 'A glowing splint cannot be used to test any gas'],
          why: 'Carbon dioxide and nitrogen both extinguish a glowing splint. The result only tells you "not oxygen". The limewater test is needed to confirm CO₂ (g7s-hd-104).' },
      ],
    },
  ];

  // ── SIGN label look-up (shared with lab_core.js) ─────────────────────────
  const SIGN_LABELS = { hot: 'Hot surface', irritant: 'Harmful', goggles: 'Eye protection required' };

  // ══════════════════════════════════════════════
  return {
    GRADES, forGrade,
    GASES, GAS_ORDER, TESTS,
    testResult, hazardFor, CORRECT_TEST,
    HAZARDS, RESULTS,
    DISCOVERIES, FACTS,
    GUIDES, MISSIONS,
    SIGN_LABELS,
  };
})();

if (typeof window !== 'undefined') window.LabGastestsData = LabGastestsData;
