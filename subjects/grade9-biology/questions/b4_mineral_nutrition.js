'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Biology - B4 Nutrition in Plants: mineral nutrition
//
//  ⚠ THIS SUBSECTION IS NOT ONE OF THE FIVE SYLLABUS STATEMENTS for B4, which
//    are all about photosynthesis. It is declared because the chapter is
//    "Nutrition in Plants", the 2025 paper asks mineral ions, and five items
//    (g9s-bpi-056..060) were already tagged `mineral_nutrition` with nothing
//    declared behind them - so they were hidden from the Practise screen.
//    This file takes the subsection to 20.
//
//  ⚠ MINERALS ARE RAW MATERIALS, NOT FOOD. The whole point of the chapter is
//    that the plant makes its own food by photosynthesis; a question that
//    calls minerals the plant's food teaches the misconception the syllabus
//    is trying to remove. g9s-b4mn-009 attacks it head on.
//
//  ⚠ IDS TAKE THEIR OWN `b4mn` BLOCK. The bare g9s-b4-NNN numbering is shared
//    with b4_plant_nutrition.js and b4_volume.js, and the importer keys on
//    ids, so a continuation of that block would collide silently.
//
//  Source: NCE Biology 2021-2025 (mineral ion items: 2025 Q3, 2022 Q5(b));
//  NCF Grades 7-9 §Nutrition in Plants.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-b4-plant-nutrition';
const SUB = 'mineral_nutrition';

const MCQ = [
  ['g9s-b4mn-001', 1,
   'Through which part of a plant do mineral ions enter from the soil?',
   ['The root hair cells of the roots',
    'The waxy cuticle of the leaves',
    'The guard cells beside the stomata',
    'The woody bark covering the stem'],
   'The root hair cells of the roots',
   'Only one part of the plant is in contact with soil water.',
   'Mineral ions dissolved in soil water enter through root hair cells, which give the root an enormous surface area, and are then carried up the xylem to the rest of the plant.'],

  ['g9s-b4mn-002', 1,
   'In what form must a mineral be before a root can absorb it?',
   ['Dissolved as ions in soil water',
    'As solid grains between soil particles',
    'As a gas in the air spaces of the soil',
    'As large molecules inside dead leaves'],
   'Dissolved as ions in soil water',
   'A root can only take in what the water can carry.',
   'Minerals must be dissolved as ions before they can be absorbed. Solid grains and undecayed remains have to be weathered or broken down by decomposers first.'],

  ['g9s-b4mn-003', 1,
   'Which mineral ion does a plant need for its enzymes to work and for flowers and fruit to form?',
   ['Potassium ions',
    'Chloride ions',
    'Calcium ions',
    'Sodium ions'],
   'Potassium ions',
   'Growers add extra of this one before the flowering season.',
   'Potassium ions help enzymes to work and are needed for flowering and fruiting. A shortage shows first as browning, scorched-looking leaf edges and poor fruit.'],

  ['g9s-b4mn-004', 2,
   'A bag of fertiliser is labelled NPK. Which three elements does it supply?',
   ['Nitrogen, phosphorus and potassium',
    'Nitrogen, phosphorus and platinum',
    'Nitrogen, potassium and calcium',
    'Neon, phosphorus and potassium'],
   'Nitrogen, phosphorus and potassium',
   'Read the three letters as the initials of three elements.',
   'NPK is nitrogen (N), phosphorus (P) and potassium (K) - the three minerals crops use in the largest amounts, which is why they are sold together as a compound fertiliser.'],

  ['g9s-b4mn-005', 2,
   'A young tomato plant is short and its lower leaves are turning pale yellow-green all over, although it is watered daily and stands in full sun. Which mineral is most likely to be short?',
   ['Nitrate, which is needed to make proteins',
    'Phosphate, which is needed for the cuticle',
    'Potassium, which is needed to make chlorophyll',
    'Calcium, which is needed to carry water up'],
   'Nitrate, which is needed to make proteins',
   'Which shortage would slow the building of new cells everywhere at once?',
   'Without enough nitrate the plant cannot make amino acids and proteins, so growth is stunted and whole leaves pale. Older leaves show it first because nitrogen is moved on to the growing tip.'],

  ['g9s-b4mn-006', 3,
   'A cane grower spreads fertiliser and then several days of heavy rain fall. Two weeks later the crop is still growing poorly. What is the most likely reason?',
   ['The dissolved minerals were washed below the roots',
    'The rain water diluted the sugar inside the cane',
    'The heavy rain cooled the soil below freezing point',
    'The clouds stopped photosynthesis for a fortnight'],
   'The dissolved minerals were washed below the roots',
   'Minerals travel wherever the water goes.',
   'Draining rain water carries dissolved ions down past the root zone - leaching. It is why fertiliser is best applied a little at a time rather than in one heavy dose before rain.'],

  ['g9s-b4mn-007', 2,
   'In a water culture experiment, one seedling is grown in a solution containing every mineral. What is that seedling for?',
   ['It is the control the others are compared with',
    'It supplies minerals to the other seedlings',
    'It shows the water level to keep in each jar',
    'It proves that the seedlings all began alike'],
   'It is the control the others are compared with',
   'Every experiment needs something to judge the others against.',
   'The complete solution shows how a seedling grows when nothing is missing, so any difference in the other jars can be put down to the single mineral that was left out.'],

  ['g9s-b4mn-008', 2,
   'A seedling is grown in a solution containing every mineral except nitrate. After three weeks, how will it compare with the control?',
   ['Smaller, with pale yellowing older leaves',
    'Larger, with dark green curled-over leaves',
    'The same size, but with no roots at all',
    'Taller, with a thicker stem and more roots'],
   'Smaller, with pale yellowing older leaves',
   'Think about what the missing ion is used to build.',
   'With no nitrate the seedling cannot make enough amino acids and proteins, so it grows slowly and its older leaves yellow as nitrogen is moved to the growing tip.'],

  ['g9s-b4mn-009', 2,
   'A student says that minerals from the soil are the plant\'s food and give it energy. Why is this wrong?',
   ['Minerals are raw materials; glucose gives the energy',
    'Minerals are made in the leaves and stored in the root',
    'Minerals are absorbed by the leaves, never by the roots',
    'Minerals are needed only when a plant is kept dark'],
   'Minerals are raw materials; glucose gives the energy',
   'Ask where the energy in a plant actually comes from.',
   'A plant makes its own food, glucose, by photosynthesis. Mineral ions are raw materials for building proteins, chlorophyll and DNA - they release no energy at all.'],

  ['g9s-b4mn-010', 1,
   'How does the long, narrow shape of a root hair cell help a plant to take in minerals?',
   ['It gives a large surface area for absorption',
    'It stores the minerals until they are needed',
    'It stops water from leaving the root at night',
    'It carries sugars down from the leaves to soil'],
   'It gives a large surface area for absorption',
   'Think about the area in contact with soil water.',
   'Each root hair is a long extension of a single cell. Thousands of them together give the root a huge surface area touching soil water, so ions and water are absorbed quickly.'],

  ['g9s-b4mn-011', 3,
   'Soil water usually holds a lower concentration of nitrate than the root cells do. What does this tell you about how nitrate gets in?',
   ['It is taken in actively, using energy from respiration',
    'It moves in by diffusion, down its concentration gradient',
    'It is pushed in by the pressure of water in the soil',
    'It leaks in through gaps in the waxy root covering'],
   'It is taken in actively, using energy from respiration',
   'Moving from a low to a high concentration cannot happen on its own.',
   'Diffusion only moves particles from high to low concentration. Taking nitrate in against the gradient needs active transport, powered by energy that respiration releases in the root cells.'],

  ['g9s-b4mn-012', 3,
   'A field stays flooded for a week and the crop turns pale, although the soil is rich in minerals. Why does mineral uptake fall in waterlogged soil?',
   ['Water fills the air spaces, so the roots lack oxygen',
    'Water dissolves the minerals so they cannot be taken in',
    'Water cools the roots, so the plant shuts every stoma',
    'Water washes the root hairs off the surface of the root'],
   'Water fills the air spaces, so the roots lack oxygen',
   'Active uptake needs energy, and energy needs something from the air.',
   'Flooding drives air out of the soil. Without oxygen the root cells cannot respire aerobically, so they release too little energy for active transport and mineral uptake falls.'],

  ['g9s-b4mn-013', 2,
   'Why does a grower who digs compost into the soil each season usually need less mineral fertiliser?',
   ['Decaying compost releases minerals slowly into the soil',
    'Compost stops rain water from draining through the soil',
    'Compost turns sunlight into minerals inside the soil',
    'Compost adds chlorophyll that roots pass to the leaves'],
   'Decaying compost releases minerals slowly into the soil',
   'Think about what happens as dead material breaks down.',
   'Decomposers break compost down and release its mineral ions over months. The compost also holds water and improves soil structure, so less manufactured fertiliser is needed.'],

  ['g9s-b4mn-014', 2,
   'Lettuce is grown with its roots in a tank of solution instead of soil. What must that solution contain?',
   ['All the mineral ions the plants need, dissolved',
    'Glucose and starch dissolved in warm water',
    'Chlorophyll and green dye to colour the leaves',
    'Carbon dioxide gas dissolved to feed the roots'],
   'All the mineral ions the plants need, dissolved',
   'The tank has to replace everything the soil used to supply.',
   'In hydroponics the solution supplies the mineral ions a plant would take from soil. The plant still makes its own glucose by photosynthesis in its leaves, so no sugar is added.'],

  ['g9s-b4mn-015', 4,
   'Three seedlings each grow in a solution missing one mineral. Seedling A is small with whole older leaves gone pale; seedling B has yellowing between the veins of its older leaves; seedling C has purple-tinged leaves and a weak root system. Which set of shortages fits?',
   ['A lacks nitrate, B lacks magnesium, C lacks phosphate',
    'A lacks magnesium, B lacks phosphate, C lacks nitrate',
    'A lacks phosphate, B lacks nitrate, C lacks magnesium',
    'A lacks nitrate, B lacks phosphate, C lacks magnesium'],
   'A lacks nitrate, B lacks magnesium, C lacks phosphate',
   'Match each symptom to the job that mineral does in the plant.',
   'Nitrate shortage stunts growth and pales whole older leaves; magnesium shortage breaks chlorophyll down between the veins, so the veins stay green; phosphate shortage gives purple-tinged leaves and poor roots.'],
];

MCQ.forEach(([id, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection: SUB, difficulty,
    question, options, answer, hint, explanation }));
});

})();
