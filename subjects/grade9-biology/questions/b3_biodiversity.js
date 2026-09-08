'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - B3 · Biodiversity   (examWeight 3)
//
//  ⚠ THIS IS WHERE THE MAURITIAN CONTENT LIVES. blueprint-science §X.7 finds
//    localised material concentrated in Biology - endemic species, the pink
//    pigeon, cyclone damage, deforestation. Every Mauritian fact used here is
//    real and checkable: the dodo, the pink pigeon, the Mauritius kestrel, Black
//    River Gorges, the giant tortoise, and invasive species. A made-up local
//    fact in a science bank is worse than no local content at all.
//
//  ⚠ QUADRAT SAMPLING IS AN ARITHMETIC OUTCOME AND IT IS FULLY MARKABLE. The
//    syllabus asks learners to "use quadrats to estimate species in an
//    ecosystem"; the paper supplies the counts and asks for the estimate. The
//    figure below is a supplied quadrat grid, and the numeric items scale a
//    sample up to a whole field, which is exactly the mark.
//
//  ⚠ ENDEMIC, NATIVE AND INVASIVE ARE THREE DIFFERENT WORDS and the difference
//    is examinable. Endemic means found nowhere else on Earth - which is the
//    whole reason a Mauritian extinction is a world extinction.
//
//  ⚠ <i> IS AN HTML BREAKOUT TAG AND MUST NEVER APPEAR INSIDE AN <svg>.
//
//  Source: NCE Science (Biology) 2021-2025; NCF Grades 7-9 §B3.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-b3-biodiversity';

// ── A 1 m x 1 m quadrat divided into 25 squares, with plants scattered in it.
//    The count is readable, so the estimate question is genuinely answerable.
const quadrat = (cells) => {
  const X0 = 30, Y0 = 20, S = 24;
  let g = '<svg viewBox="0 0 210 180" width="220" role="img" aria-label="a square sampling frame containing plants">';
  g += '<rect x="' + X0 + '" y="' + Y0 + '" width="' + (S * 5) + '" height="' + (S * 5) + '" fill="#f0fdf4" stroke="#0f172a" stroke-width="2"/>';
  for (let i = 1; i < 5; i++) {
    g += '<line x1="' + (X0 + i * S) + '" y1="' + Y0 + '" x2="' + (X0 + i * S) + '" y2="' + (Y0 + 5 * S) + '" stroke="#94a3b8" stroke-width="1"/>';
    g += '<line x1="' + X0 + '" y1="' + (Y0 + i * S) + '" x2="' + (X0 + 5 * S) + '" y2="' + (Y0 + i * S) + '" stroke="#94a3b8" stroke-width="1"/>';
  }
  cells.forEach(c => {
    const cx = X0 + (c[0] + 0.5) * S, cy = Y0 + (c[1] + 0.5) * S;
    g += '<circle cx="' + cx + '" cy="' + cy + '" r="6" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>';
    g += '<line x1="' + cx + '" y1="' + (cy + 6) + '" x2="' + cx + '" y2="' + (cy + 10) + '" stroke="#15803d" stroke-width="1.5"/>';
  });
  g += '<line x1="' + X0 + '" y1="' + (Y0 + 5 * S + 14) + '" x2="' + (X0 + 5 * S) + '" y2="' + (Y0 + 5 * S + 14) + '" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<text x="' + (X0 + 2.5 * S) + '" y="' + (Y0 + 5 * S + 30) + '" font-size="10" text-anchor="middle" fill="#0f172a">1 m</text>';
  return g + '</svg>';
};

const Q8 = quadrat([[0, 0], [2, 0], [4, 1], [1, 2], [3, 2], [0, 3], [2, 4], [4, 4]]);

const MCQ = [
  ['g9s-b3-001', 'what_is_biodiversity', 1,
   'What does <b>biodiversity</b> mean?',
   ['The variety of living things in an area',
    'The total number of animals in an area',
    'The size of the largest animal in an area',
    'The amount of water available in an area'],
   'The variety of living things in an area',
   'The key word is variety.',
   'Biodiversity is the variety of different living species found in an area.'],

  ['g9s-b3-002', 'what_is_biodiversity', 2,
   'Two forests hold the same number of trees. Forest A has 30 species and forest B has 4. Which has the greater biodiversity?',
   ['Forest A, because it has more species',
    'Forest B, because its trees are all the same',
    'They are equal, because they have the same number of trees',
    'It cannot be decided without knowing their areas'],
   'Forest A, because it has more species',
   'Biodiversity counts species, not individuals.',
   'Biodiversity is about the variety of species, so 30 species is greater biodiversity than 4.'],

  ['g9s-b3-003', 'what_is_biodiversity', 2,
   'What does <b>endemic</b> mean?',
   ['Found naturally in one place and nowhere else on Earth',
    'Found in every country of the world',
    'Brought to a place by human beings',
    'Kept only in zoos and in botanical gardens abroad'],
   'Found naturally in one place and nowhere else on Earth',
   'It is stronger than simply "native".',
   'An endemic species occurs naturally in one place only, which is why losing it there loses it everywhere.'],

  ['g9s-b3-004', 'what_is_biodiversity', 3,
   'The dodo was endemic to Mauritius. Why did its extinction matter to the whole world?',
   ['It existed nowhere else, so the species was lost completely',
    'It was the largest bird ever to have lived',
    'It could still be found again in several other countries today',
    'It was the only bird that could not fly'],
   'It existed nowhere else, so the species was lost completely',
   'Think about what endemic means.',
   'Being endemic to Mauritius, once it was gone from the island it was gone from the Earth.'],

  ['g9s-b3-005', 'importance_of_biodiversity', 2,
   'Why does biodiversity matter to people?',
   ['It provides food, medicines and materials, and keeps ecosystems stable',
    'It makes the weather warmer all through the year',
    'It increases the amount of land that is available for building',
    'It removes the need to protect any habitat'],
   'It provides food, medicines and materials, and keeps ecosystems stable',
   'Think about what we get from living things.',
   'A varied living world supplies food, medicine and materials and keeps ecosystems working.'],

  ['g9s-b3-006', 'importance_of_biodiversity', 3,
   'Why is an ecosystem with high biodiversity better able to survive a disease?',
   ['If one species is lost, others can still do a similar job',
    'Diseases cannot spread where there are many species',
    'The species combine to fight the disease together',
    'High biodiversity stops diseases from ever appearing'],
   'If one species is lost, others can still do a similar job',
   'Think about what happens when one link disappears.',
   'Variety spreads the risk: losing one species from a varied system leaves others to fill its role.'],

  ['g9s-b3-007', 'importance_of_biodiversity', 3,
   'Which is the strongest reason for protecting Black River Gorges National Park?',
   ['It protects the habitat of many species found only in Mauritius',
    'It provides land that can be cleared for farming later',
    'It is the only forest that grows anywhere in Africa',
    'It stops cyclones from reaching the island'],
   'It protects the habitat of many species found only in Mauritius',
   'Think about what the park actually conserves.',
   'The park conserves native forest and the endemic plants and animals that depend on it.'],

  ['g9s-b3-008', 'quadrat_sampling', 2,
   'What is a <b>quadrat</b> used for?',
   ['Sampling the organisms in a measured square of ground',
    'Measuring the temperature of a habitat each day',
    'Catching animals that move quickly',
    'Measuring the depth of the soil'],
   'Sampling the organisms in a measured square of ground',
   'It is a frame of a known size.',
   'A quadrat is a square frame of known area placed on the ground so the organisms inside it can be counted.'],

  ['g9s-b3-009', 'quadrat_sampling', 2,
   'The quadrat shown is 1 m by 1 m. How many plants of this species are inside it?<br>' + Q8,
   ['8', '6', '10', '5'], '8',
   'Count the plants drawn in the frame.',
   'There are 8 plants inside the quadrat.'],

  ['g9s-b3-010', 'quadrat_sampling', 3,
   'Why are quadrats placed at random rather than where the plants look thickest?',
   ['So the sample fairly represents the whole area',
    'So the counting takes a shorter time',
    'So the quadrat does not damage the plants',
    'So the same plants are counted twice'],
   'So the sample fairly represents the whole area',
   'Think about what choosing the best patch would do to the estimate.',
   'Random placing avoids bias; choosing thick patches would give an estimate that is far too high.'],

  ['g9s-b3-011', 'quadrat_sampling', 3,
   'Why is the count from several quadrats averaged before the estimate is made?',
   ['One quadrat may not be typical of the whole area',
    'Averaging makes the number smaller and easier to use',
    'It is the only way to make the count a whole number',
    'The quadrat changes size each time it is used'],
   'One quadrat may not be typical of the whole area',
   'Think about how much one square metre can tell you.',
   'Several samples averaged give a far more reliable estimate than any single square.'],

  ['g9s-b3-012', 'natural_threats', 1,
   'Which natural event is a serious threat to biodiversity in Mauritius?',
   ['A cyclone', 'A light shower of rain',
    'A cool night in winter', 'A high tide'],
   'A cyclone',
   'Think about which of these does real damage.',
   'Cyclones strip and uproot trees and destroy habitats, which is a serious natural threat.'],

  ['g9s-b3-013', 'natural_threats', 2,
   'How does a drought threaten the living things in an area?',
   ['Plants die from lack of water, so the animals lose food and shelter',
    'The soil becomes far too rich for any of the plants to grow',
    'Animals are washed away by the moving water',
    'The air becomes too cold for animals to survive'],
   'Plants die from lack of water, so the animals lose food and shelter',
   'Follow the effect through the food chain.',
   'Without water the plants die, and the animals that depend on them for food and shelter are lost too.'],

  ['g9s-b3-014', 'natural_threats', 3,
   'Why can a cyclone be more damaging to an endemic species than to a widespread one?',
   ['The endemic species has nowhere else in the world to survive',
    'The endemic species is always physically weaker',
    'Cyclones only ever strike endemic species',
    'The widespread species cannot move to a new area at all'],
   'The endemic species has nowhere else in the world to survive',
   'Think about where each species could survive.',
   'A widespread species survives elsewhere; an endemic one has only this island, so one event can destroy all of it.'],

  ['g9s-b3-015', 'human_threats', 1,
   'What is <b>deforestation</b>?',
   ['The clearing of forests by cutting down trees',
    'The planting of new trees in an area',
    'The natural death of trees in winter',
    'The spread of a forest into new land'],
   'The clearing of forests by cutting down trees',
   'The prefix means removing.',
   'Deforestation is the large-scale removal of forest.'],

  ['g9s-b3-016', 'human_threats', 2,
   'How does deforestation reduce biodiversity?',
   ['Animals and plants lose the habitat they depend on',
    'The remaining trees grow much more slowly',
    'The soil becomes too rich for any plant',
    'It increases the rainfall in the area'],
   'Animals and plants lose the habitat they depend on',
   'What happens to the species that lived there?',
   'Removing the forest destroys the habitat, so the species that need it disappear from the area.'],

  ['g9s-b3-017', 'human_threats', 2,
   'What is an <b>invasive alien species</b>?',
   ['A species brought from elsewhere that harms the native species',
    'A species that has always lived on the island itself',
    'A species found nowhere else in the world',
    'A species that is kept only in a zoo'],
   'A species brought from elsewhere that harms the native species',
   'Alien means it came from somewhere else.',
   'An invasive alien species is introduced from outside and spreads at the expense of the native wildlife.'],

  ['g9s-b3-018', 'human_threats', 3,
   'Rats and monkeys were brought to Mauritius by people. Why are they a threat to native birds?',
   ['They eat the eggs and chicks in the nests',
    'They cut down the trees the birds nest in',
    'They carry the birds away to other islands',
    'They make the island too cold for the birds'],
   'They eat the eggs and chicks in the nests',
   'Think about what happens to a nest on the ground or in a low tree.',
   'Introduced predators take eggs and chicks from nests, and the native birds evolved with no defence against them.'],

  ['g9s-b3-019', 'human_threats', 3,
   'Which pair of actions would best protect biodiversity in Mauritius?',
   ['Protecting native forest and controlling introduced predators',
    'Clearing more forest and importing more new species',
    'Building more roads and draining the wetlands',
    'Collecting rare plants and keeping them at home'],
   'Protecting native forest and controlling introduced predators',
   'Deal with the habitat and with the introduced species.',
   'Conserving the remaining native habitat and removing invasive predators are the two measures that work together.'],

  ['g9s-b3-020', 'human_threats', 3,
   'The Mauritius kestrel recovered from very few birds through a captive breeding programme. What does this show?',
   ['Conservation work can bring a species back from near extinction',
    'Extinction can always be reversed once it has happened',
    'Captive breeding works for every species equally',
    'The kestrel was never really in danger at all'],
   'Conservation work can bring a species back from near extinction',
   'The birds were bred and then released.',
   'Careful conservation rebuilt the population, which shows that action taken in time can succeed.'],

  ['g9s-b3-021', 'human_threats', 2,
   'How does pollution of a lagoon reduce biodiversity?',
   ['It kills or drives away the species living there',
    'It makes the water clearer for the fish',
    'It adds useful minerals for the coral',
    'It lowers the temperature of the water'],
   'It kills or drives away the species living there',
   'Pollution adds something harmful.',
   'Pollutants poison or smother the organisms, so the number of species living in the lagoon falls.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const NUM = [
  ['g9s-b3-022', 'quadrat_sampling', 2,
   'A 1 m by 1 m quadrat contains 8 plants. Estimate the number of plants in a field of 200 m&sup2;.',
   1600, 'Multiply the number per square metre by the area.',
   '8 &times; 200 = 1600 plants.'],
  ['g9s-b3-023', 'quadrat_sampling', 3,
   'Five 1 m&sup2; quadrats give counts of 4, 6, 5, 7 and 3. Calculate the mean number of plants per square metre.',
   5, 'Add the five counts and divide by five.', '(4 + 6 + 5 + 7 + 3) / 5 = 25 / 5 = 5.'],
  ['g9s-b3-024', 'quadrat_sampling', 3,
   'The mean count is 5 plants per square metre. Estimate the number in a field of 350 m&sup2;.',
   1750, 'Multiply the mean by the area.', '5 &times; 350 = 1750 plants.'],
];

NUM.forEach(([id, subsection, difficulty, question, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeNum({ id, chapterId: CH, subsection, difficulty,
    question, answer, hint, explanation }));
});

const SHORT = [
  ['g9s-b3-025', 'what_is_biodiversity', 1,
   'Give the term for the variety of living species found in an area.',
   'Biodiversity', ['bio-diversity', 'biological diversity'],
   'One word.', 'Biodiversity is the variety of living things in an area.'],
  ['g9s-b3-026', 'what_is_biodiversity', 2,
   'Give the term for a species found naturally in one place and nowhere else on Earth.',
   'Endemic', ['endemic species', 'an endemic species'],
   'The dodo was one.', 'An endemic species occurs naturally in one place only.'],
  ['g9s-b3-027', 'quadrat_sampling', 2,
   'Name the square frame used to sample the organisms in a measured area of ground.',
   'Quadrat', ['a quadrat', 'quadrant'],
   'It is placed at random on the ground.',
   'A quadrat samples a measured square so the organisms in it can be counted.'],
  ['g9s-b3-028', 'human_threats', 1,
   'Give the term for the large-scale cutting down of forest.',
   'Deforestation', ['deforestation.', 'de-forestation'],
   'One word.', 'Deforestation is the clearing of forest on a large scale.'],
  ['g9s-b3-029', 'human_threats', 3,
   'State one way of protecting biodiversity in Mauritius.',
   'Protect the native forest',
   ['control invasive species', 'create nature reserves', 'captive breeding',
    'protect habitats', 'remove introduced predators', 'reduce pollution',
    'plant native trees'],
   'Think about habitat, or about introduced species.',
   'Protecting habitat, controlling invasive species and captive breeding all help.'],
  ['g9s-b3-030', 'natural_threats', 1,
   'Name the natural event, common in Mauritius, that destroys habitats by uprooting trees.',
   'Cyclone', ['a cyclone', 'cyclones'],
   'It arrives in the summer months.',
   'Cyclones strip and uproot trees, destroying habitat.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
