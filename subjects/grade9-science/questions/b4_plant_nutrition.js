'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - B4 · Nutrition in Plants   (examWeight 3)
//
//  ⚠ THE LEAF CROSS-SECTION IS A STANDARD PAPER FIGURE and is drawn here as
//    inline SVG with the layers lettered, so an item can ask which layer holds
//    most chloroplasts without naming it. §X.5.1: the labelled line diagram is
//    the workhorse of every science paper, every year.
//
//  ⚠ THE CLASSIC EXPERIMENTS ARE EXAMINED ON PAPER, NOT IN A LAB (§X.6). The
//    destarching step, the variegated leaf, the leaf in a bag of soda lime, the
//    boiling in ethanol - the papers ask WHY each step is done and what the
//    result shows. That is what the `photosynthesis_experiments` items do; none
//    of them asks a child to carry the experiment out.
//
//  ⚠ ETHANOL IS BOILED IN A WATER BATH, NEVER OVER A FLAME, and one item makes
//    that the point. Writing "heat the ethanol with a Bunsen" into a school
//    science bank would be teaching a genuine fire risk.
//
//  ⚠ <i> IS AN HTML BREAKOUT TAG AND MUST NEVER APPEAR INSIDE AN <svg>.
//
//  Source: NCE Science (Biology) 2021-2025; NCF Grades 7-9 §B4.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-b4-plant-nutrition';

// ── Leaf cross-section, layers lettered top to bottom:
//    W waxy cuticle/upper epidermis, X palisade, Y spongy layer, Z stoma.
const leafSection = () => {
  let g = '<svg viewBox="0 0 280 170" width="280" role="img" aria-label="a cross-section through a leaf">';
  g += '<rect x="40" y="24" width="200" height="14" fill="#fde68a" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<rect x="40" y="38" width="200" height="42" fill="#bbf7d0" stroke="#0f172a" stroke-width="1.5"/>';
  for (let x = 46; x < 236; x += 16) {
    g += '<rect x="' + x + '" y="42" width="11" height="34" fill="#86efac" stroke="#15803d" stroke-width="1"/>';
    g += '<circle cx="' + (x + 5.5) + '" cy="52" r="2.5" fill="#15803d"/>';
    g += '<circle cx="' + (x + 5.5) + '" cy="66" r="2.5" fill="#15803d"/>';
  }
  g += '<rect x="40" y="80" width="200" height="44" fill="#dcfce7" stroke="#0f172a" stroke-width="1.5"/>';
  [60, 96, 132, 168, 204].forEach(x => {
    g += '<circle cx="' + x + '" cy="94" r="8" fill="#86efac" stroke="#15803d" stroke-width="1"/>';
    g += '<circle cx="' + (x + 18) + '" cy="110" r="8" fill="#86efac" stroke="#15803d" stroke-width="1"/>';
  });
  g += '<rect x="40" y="124" width="200" height="14" fill="#fde68a" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<rect x="128" y="124" width="24" height="14" fill="#ffffff" stroke="none"/>';
  g += '<path d="M 128 124 q 12 8 24 0" fill="none" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<path d="M 128 138 q 12 -8 24 0" fill="none" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<text x="26" y="35" font-size="12" font-weight="bold" text-anchor="middle" fill="#1d4ed8">W</text>';
  g += '<text x="26" y="63" font-size="12" font-weight="bold" text-anchor="middle" fill="#1d4ed8">X</text>';
  g += '<text x="26" y="106" font-size="12" font-weight="bold" text-anchor="middle" fill="#1d4ed8">Y</text>';
  g += '<text x="140" y="156" font-size="12" font-weight="bold" text-anchor="middle" fill="#1d4ed8">Z</text>';
  g += '<line x1="140" y1="146" x2="140" y2="139" stroke="#1d4ed8" stroke-width="1"/>';
  g += '<text x="256" y="18" font-size="8" fill="#334155">light</text>';
  [70, 110, 150, 190].forEach(x => {
    g += '<line x1="' + x + '" y1="6" x2="' + x + '" y2="20" stroke="#f59e0b" stroke-width="1.5"/>';
    g += '<polygon points="' + x + ',24 ' + (x - 3) + ',18 ' + (x + 3) + ',18" fill="#f59e0b"/>';
  });
  return g + '</svg>';
};

const LEAF = leafSection();

const MCQ = [
  ['g9s-b4-001', 'photosynthesis', 1,
   'What is <b>photosynthesis</b>?',
   ['The process by which green plants make their own food',
    'The process by which plants take in their oxygen at night',
    'The way a plant takes water up its stem',
    'The way a plant spreads its seeds'],
   'The process by which green plants make their own food',
   'The plant makes food rather than taking it in.',
   'Photosynthesis is how a green plant makes glucose using light energy.'],

  ['g9s-b4-002', 'photosynthesis', 1,
   'Which gas do plants take in for photosynthesis?',
   ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], 'Carbon dioxide',
   'It enters through the stomata.',
   'Carbon dioxide is taken in from the air and used to build glucose.'],

  ['g9s-b4-003', 'photosynthesis', 1,
   'Which gas do plants give out during photosynthesis?',
   ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Methane'], 'Oxygen',
   'It is the waste product of the process.',
   'Oxygen is released as a by-product of photosynthesis.'],

  ['g9s-b4-004', 'photosynthesis', 2,
   'Which green substance in a leaf absorbs the light energy?',
   ['Chlorophyll', 'Cellulose', 'Starch', 'Glucose'], 'Chlorophyll',
   'It is what makes a leaf green.',
   'Chlorophyll absorbs light energy and makes it available for photosynthesis.'],

  ['g9s-b4-005', 'photosynthesis', 2,
   'Where in a plant cell does photosynthesis take place?',
   ['In the chloroplasts', 'In the nucleus',
    'In the cell wall', 'In the vacuole'],
   'In the chloroplasts',
   'They are the structures that contain the chlorophyll.',
   'Chloroplasts contain the chlorophyll, so photosynthesis happens inside them.'],

  ['g9s-b4-006', 'photosynthesis', 3,
   'Why is photosynthesis important for animals as well as plants?',
   ['It supplies the oxygen animals breathe and the food chains start there',
    'It removes all of the nitrogen from the air that animals breathe',
    'It keeps the soil warm enough for animals to live in',
    'It provides animals with the water they drink'],
   'It supplies the oxygen animals breathe and the food chains start there',
   'Think about what animals get from plants, directly or indirectly.',
   'Photosynthesis releases the oxygen animals need and makes the food that every food chain begins with.'],

  ['g9s-b4-007', 'word_equation', 2,
   'Which is the correct word equation for photosynthesis?',
   ['carbon dioxide + water &rarr; glucose + oxygen',
    'glucose + oxygen &rarr; carbon dioxide + water',
    'carbon dioxide + oxygen &rarr; glucose + water',
    'glucose + water &rarr; carbon dioxide + oxygen'],
   'carbon dioxide + water &rarr; glucose + oxygen',
   'The raw materials are on the left.',
   'Carbon dioxide and water are the raw materials; glucose and oxygen are the products.'],

  ['g9s-b4-008', 'word_equation', 2,
   'In the word equation for photosynthesis, what is needed but is NOT a reactant?',
   ['Light energy and chlorophyll',
    'Carbon dioxide and water',
    'Glucose and oxygen',
    'Nitrogen and hydrogen'],
   'Light energy and chlorophyll',
   'They are usually written above the arrow.',
   'Light and chlorophyll are needed for the reaction but are not used up as raw materials, so they go above the arrow.'],

  ['g9s-b4-009', 'word_equation', 3,
   'The word equation for respiration is the reverse of photosynthesis. Which equation is it?',
   ['glucose + oxygen &rarr; carbon dioxide + water',
    'carbon dioxide + water &rarr; glucose + oxygen',
    'glucose + water &rarr; carbon dioxide + oxygen',
    'oxygen + water &rarr; glucose + carbon dioxide'],
   'glucose + oxygen &rarr; carbon dioxide + water',
   'Swap the two sides of the photosynthesis equation.',
   'Respiration uses glucose and oxygen and releases carbon dioxide and water - the reverse of photosynthesis.'],

  ['g9s-b4-010', 'leaf_adaptation', 2,
   'In the leaf shown, which layer contains the most chloroplasts?<br>' + LEAF,
   ['X, the layer of tall cells packed near the top',
    'W, the thin protective layer on the surface',
    'Y, the loosely packed layer lower down',
    'Z, the small opening in the lower surface'],
   'X, the layer of tall cells packed near the top',
   'Which layer is nearest the light and most tightly packed?',
   'X is the palisade layer: tall cells packed just under the surface, holding most of the chloroplasts to catch the light.'],

  ['g9s-b4-011', 'leaf_adaptation', 2,
   'In the leaf shown, what is the opening marked Z?<br>' + LEAF,
   ['A stoma, which lets gases in and out',
    'A vein, which carries water to the leaf',
    'A chloroplast, which absorbs the light',
    'A root hair, which takes in water'],
   'A stoma, which lets gases in and out',
   'It is a gap in the lower surface.',
   'Z is a stoma: a pore in the lower epidermis through which carbon dioxide enters and oxygen and water vapour leave.'],

  ['g9s-b4-012', 'leaf_adaptation', 2,
   'In the leaf shown, why does the layer marked Y have large air spaces between its cells?<br>' + LEAF,
   ['So gases can move easily through the leaf',
    'So the leaf can store more water there',
    'So the leaf is stronger in the wind',
    'So light can be reflected back upwards'],
   'So gases can move easily through the leaf',
   'Think about what has to travel between the stoma and the cells.',
   'The air spaces of the spongy layer let carbon dioxide diffuse to the cells and oxygen diffuse out.'],

  ['g9s-b4-013', 'leaf_adaptation', 3,
   'Why is a leaf broad and flat?',
   ['It gives a large surface area to absorb light',
    'It makes the leaf heavier so it does not blow away',
    'It stops any water from reaching the leaf',
    'It allows the leaf to store a lot of starch'],
   'It gives a large surface area to absorb light',
   'Think about catching as much light as possible.',
   'A broad flat leaf presents a large surface to the light and a short distance for gases to diffuse.'],

  ['g9s-b4-014', 'leaf_adaptation', 3,
   'Why is a leaf thin?',
   ['Gases have only a short distance to diffuse',
    'It allows the leaf to fall off more easily',
    'It reduces the amount of chlorophyll needed',
    'It stops insects from eating the leaf'],
   'Gases have only a short distance to diffuse',
   'Think about how far a gas has to travel inside it.',
   'A thin leaf means a short diffusion path, so carbon dioxide reaches the cells quickly.'],

  ['g9s-b4-015', 'leaf_adaptation', 2,
   'What is the job of the veins in a leaf?',
   ['To carry water in and carry the food made away',
    'To absorb all the light energy for photosynthesis',
    'To let gases pass in and out of the leaf',
    'To protect the leaf from being eaten'],
   'To carry water in and carry the food made away',
   'They are the transport system.',
   'The veins bring water to the leaf cells and carry the glucose made away to the rest of the plant.'],

  ['g9s-b4-016', 'factors_for_photosynthesis', 1,
   'Which of these is NOT needed for photosynthesis?',
   ['Oxygen', 'Light', 'Carbon dioxide', 'Water'], 'Oxygen',
   'One of these is a product, not a requirement.',
   'Oxygen is released by photosynthesis; light, carbon dioxide and water are what it needs.'],

  ['g9s-b4-017', 'factors_for_photosynthesis', 2,
   'A plant is kept in complete darkness for a week. What happens to photosynthesis?',
   ['It stops, because there is no light energy',
    'It speeds up, because the plant rests',
    'It continues at the same rate as before',
    'It continues, but produces carbon dioxide instead'],
   'It stops, because there is no light energy',
   'Light is one of the essential factors.',
   'Without light there is no energy to drive the reaction, so photosynthesis stops.'],

  ['g9s-b4-018', 'factors_for_photosynthesis', 3,
   'A plant is given more light and photosynthesis speeds up, then stops speeding up. What is the likely reason?',
   ['Another factor, such as carbon dioxide, has become limiting',
    'The plant has completely run out of its chlorophyll',
    'Light has stopped being needed by the plant',
    'The plant has begun to respire instead'],
   'Another factor, such as carbon dioxide, has become limiting',
   'Something else must be in short supply.',
   'Once light is plentiful, the rate is held back by whichever factor is now in shortest supply.'],

  ['g9s-b4-019', 'factors_for_photosynthesis', 2,
   'Why does a plant kept without water stop photosynthesising?',
   ['Water is one of the raw materials it needs',
    'Water is the product it must get rid of',
    'Water is what absorbs the light energy',
    'Water is needed only by the roots'],
   'Water is one of the raw materials it needs',
   'Look at the left-hand side of the word equation.',
   'Water is a reactant in photosynthesis, so without it the reaction cannot proceed.'],

  ['g9s-b4-020', 'photosynthesis_experiments', 2,
   'Which chemical is used to test a leaf for starch, and what colour shows starch is present?',
   ['Iodine solution, which turns blue-black',
    'Limewater, which turns milky',
    'Iodine solution, which turns bright red',
    'Limewater, which turns blue-black'],
   'Iodine solution, which turns blue-black',
   'Limewater is the test for a gas, not for starch.',
   'Iodine solution turns from brown to blue-black where starch is present.'],

  ['g9s-b4-021', 'photosynthesis_experiments', 3,
   'Why is a plant kept in the dark for two days before a starch test?',
   ['To remove the starch already stored in its leaves',
    'To make the leaves greener before testing',
    'To let the plant absorb more carbon dioxide',
    'To make the iodine work more quickly'],
   'To remove the starch already stored in its leaves',
   'The test must show only starch made during the experiment.',
   'Destarching empties the leaves first, so any starch found afterwards must have been made during the test.'],

  ['g9s-b4-022', 'photosynthesis_experiments', 3,
   'Why is a leaf boiled in ethanol before the iodine is added?',
   ['To remove the green chlorophyll so the colour change can be seen',
    'To kill any insects living on the leaf surface',
    'To add some extra starch to the leaf before it is tested',
    'To make the leaf absorb the iodine more slowly'],
   'To remove the green chlorophyll so the colour change can be seen',
   'The leaf is green, and so is the result hard to read.',
   'Ethanol dissolves the chlorophyll, decolourising the leaf so the blue-black of the iodine test is visible.'],

  ['g9s-b4-023', 'photosynthesis_experiments', 3,
   'Why is the ethanol heated in a water bath rather than directly over a flame?',
   ['Ethanol catches fire very easily',
    'Ethanol will not become hot enough over a flame',
    'A water bath heats the ethanol much faster',
    'A flame would turn the ethanol into starch'],
   'Ethanol catches fire very easily',
   'It is a safety precaution.',
   'Ethanol is highly flammable, so it is heated indirectly in hot water and never over a naked flame.'],

  ['g9s-b4-024', 'photosynthesis_experiments', 3,
   'A variegated leaf, green in the middle and white at the edges, is tested for starch after a day in the light. What is the result?',
   ['Only the green part turns blue-black',
    'Only the white part turns blue-black',
    'The whole leaf turns blue-black',
    'No part of the leaf turns blue-black'],
   'Only the green part turns blue-black',
   'Which part contains chlorophyll?',
   'Only the green parts have chlorophyll, so only they photosynthesise and make starch.'],

  ['g9s-b4-025', 'photosynthesis_experiments', 3,
   'A leaf is sealed in a flask with soda lime, which absorbs carbon dioxide. After a day in the light, the starch test is negative. What does this show?',
   ['Carbon dioxide is needed for photosynthesis',
    'Light is needed for photosynthesis',
    'Water is needed for photosynthesis',
    'Chlorophyll is needed for photosynthesis'],
   'Carbon dioxide is needed for photosynthesis',
   'Only one factor was removed by the soda lime.',
   'The only thing taken away was carbon dioxide, and no starch was made, so carbon dioxide is essential.'],

  ['g9s-b4-026', 'photosynthesis_experiments', 3,
   'In that experiment, why is a second identical leaf set up without the soda lime?',
   ['As a control, to show the result is due to the missing carbon dioxide',
    'To give the first leaf a great deal more light to work with',
    'To use up the oxygen made by the first leaf',
    'To make the experiment take a shorter time'],
   'As a control, to show the result is due to the missing carbon dioxide',
   'A fair test needs something to compare against.',
   'The control is identical except for the one factor being tested, so any difference must be caused by that factor.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const SHORT = [
  ['g9s-b4-027', 'photosynthesis', 1,
   'Name the green pigment that absorbs light for photosynthesis.',
   'Chlorophyll', ['chlorophyl', 'the chlorophyll'],
   'It makes leaves green.', 'Chlorophyll absorbs the light energy used in photosynthesis.'],
  ['g9s-b4-028', 'word_equation', 2,
   'Complete the word equation: carbon dioxide + water &rarr; glucose + ______',
   'Oxygen', ['oxygen gas', 'o2'],
   'It is the gas given off.', 'Photosynthesis produces glucose and oxygen.'],
  ['g9s-b4-029', 'leaf_adaptation', 2,
   'Name the small openings in the lower surface of a leaf that let gases in and out.',
   'Stomata', ['stoma', 'the stomata', 'stomates'],
   'Each one is called a stoma.', 'Gases pass in and out through the stomata.'],
  ['g9s-b4-030', 'photosynthesis_experiments', 1,
   'Name the solution used to test a leaf for starch.',
   'Iodine', ['iodine solution', 'the iodine solution'],
   'It turns blue-black if starch is present.',
   'Iodine solution is the test for starch.'],
  ['g9s-b4-031', 'factors_for_photosynthesis', 2,
   'State one factor, apart from water, that is essential for photosynthesis.',
   'Light', ['carbon dioxide', 'chlorophyll', 'sunlight', 'light energy'],
   'Look at what appears above and to the left of the arrow.',
   'Light, carbon dioxide and chlorophyll are all essential.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
