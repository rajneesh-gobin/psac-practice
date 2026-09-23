'use strict';
// Grade 9 Biology — challenging application questions (L3–L4)
// IDs: g9s-bhard-001 to g9s-bhard-015
// Inspired by NCE exam style; all figures original.

(function () {

const B1 = 'g9s-b1-circulatory';
const B2 = 'g9s-b2-reproductive';
const B3 = 'g9s-b3-biodiversity';
const B4 = 'g9s-b4-plant-nutrition';

STATIC_QUESTIONS.push(

  // ── B1 Circulatory ──────────────────────────────────────────────────────

  makeNum({
    id: 'g9s-bhard-001', chapterId: B1, subsection: 'magnification', difficulty: 3,
    question: 'A student draws a red blood cell that appears 4 mm wide under the microscope. The actual width of the cell is 0.008 mm. Calculate the magnification used.',
    answer: 500,
    acceptableAnswers: ['500', '500x', '×500'],
    hint: 'Magnification = image size ÷ actual size. Make sure both measurements are in the same unit.',
    explanation: 'Magnification = image size ÷ actual size = 4 mm ÷ 0.008 mm = <b>500</b>. The answer has no unit — magnification is a ratio. Both sizes must be in the same unit before dividing.'
  }),

  makeMCQ({
    id: 'g9s-bhard-002', chapterId: B1, subsection: 'components_of_blood', difficulty: 3,
    question: 'Red blood cells are unusual because they have no nucleus when mature. What is the main advantage of this adaptation?',
    options: [
      'To allow more space for haemoglobin to carry oxygen',
      'Because they do not need to reproduce',
      'So they can squeeze through capillaries more easily',
      'Because they are produced in the spleen, not the bone marrow'
    ],
    answer: 'To allow more space for haemoglobin to carry oxygen',
    hint: 'Think about what red blood cells are specialised to do — and what takes up space inside a cell.',
    explanation: 'The absence of a nucleus leaves the entire cell volume available for <b>haemoglobin</b>, the protein that binds and carries oxygen. More haemoglobin per cell means more oxygen transported per trip. While red blood cells also have a biconcave shape that helps them pass through narrow capillaries, the primary reason for no nucleus is maximising haemoglobin content.'
  }),

  makeMCQ({
    id: 'g9s-bhard-003', chapterId: B1, subsection: 'blood_vessels', difficulty: 3,
    question: 'A blood vessel contains valves to prevent backflow and carries deoxygenated blood towards the heart. What type of vessel is this?',
    options: ['Artery', 'Vein', 'Capillary', 'Aorta'],
    answer: 'Vein',
    hint: 'Which vessels carry blood TOWARDS the heart? Which vessels have valves?',
    explanation: '<b>Veins</b> carry blood towards the heart (with the exception of the pulmonary veins, which carry oxygenated blood from the lungs). Because blood in veins is at low pressure, veins have semi-lunar valves to stop blood flowing backwards. Arteries carry blood away from the heart at high pressure and do not need valves. Capillaries are single-cell-thick exchange vessels.'
  }),

  makeMCQ({
    id: 'g9s-bhard-004', chapterId: B1, subsection: 'cardiovascular_disease', difficulty: 4,
    question: 'A 50-year-old man eats a diet high in saturated fats and is significantly overweight. His doctor finds that fatty deposits have partly blocked his coronary arteries. Which condition does this describe, and what is the most immediate risk?',
    options: [
      'Coronary heart disease — risk of heart attack',
      'Arteriosclerosis — risk of kidney failure',
      'Hypertension — risk of stroke only',
      'Anaemia — risk of oxygen shortage to muscles'
    ],
    answer: 'Coronary heart disease — risk of heart attack',
    hint: 'Coronary arteries supply the heart muscle itself. What happens if they become blocked?',
    explanation: '<b>Coronary heart disease (CHD)</b> occurs when fatty deposits (atherosclerotic plaques) build up inside the coronary arteries, narrowing the lumen and reducing blood flow to the heart muscle. If a clot forms and completely blocks a coronary artery, the section of heart muscle it supplies is starved of oxygen — a <b>heart attack (myocardial infarction)</b>. Risk factors include high saturated-fat diet, obesity, smoking, and lack of exercise.'
  }),

  makeMCQ({
    id: 'g9s-bhard-005', chapterId: B1, subsection: 'components_of_blood', difficulty: 3,
    question: 'Haemoglobin picks up oxygen in the lungs to form oxyhaemoglobin. In the body tissues, oxyhaemoglobin releases the oxygen. Which conditions in body tissues trigger this release?',
    options: [
      'High CO₂ concentration and low oxygen concentration',
      'Low CO₂ concentration and high oxygen concentration',
      'Low temperature and high atmospheric pressure',
      'High pH and low blood-flow rate'
    ],
    answer: 'High CO₂ concentration and low oxygen concentration',
    hint: 'Active tissues produce CO₂ and use up O₂. How does this affect haemoglobin?',
    explanation: 'In respiring tissues, oxygen is consumed (lowering O₂ concentration) and CO₂ is produced. The high CO₂ lowers pH (the Bohr effect), which reduces haemoglobin\'s affinity for oxygen. As a result, <b>oxyhaemoglobin releases O₂</b> to the cells that need it. The reverse happens in the lungs: low CO₂ and high O₂ cause haemoglobin to load up with oxygen.'
  }),

  // ── B3 Biodiversity ─────────────────────────────────────────────────────

  makeNum({
    id: 'g9s-bhard-006', chapterId: B3, subsection: 'quadrat_sampling', difficulty: 4,
    question: 'A student uses a 0.5 m × 0.5 m quadrat to sample daisies in a meadow. She counts 6 daisies inside the quadrat. The total area of the meadow is 100 m². Estimate the total number of daisies in the meadow.',
    answer: 2400,
    acceptableAnswers: ['2400'],
    hint: 'Step 1: calculate the area of the quadrat. Step 2: find the density (daisies per m²). Step 3: multiply by total area.',
    explanation: 'Quadrat area = 0.5 × 0.5 = 0.25 m². Density = 6 ÷ 0.25 = 24 daisies per m². Estimated total = 24 × 100 = <b>2400 daisies</b>. This assumes the sample quadrat is representative of the whole meadow — random placement is essential for this assumption to be valid.'
  }),

  makeMCQ({
    id: 'g9s-bhard-007', chapterId: B3, subsection: 'human_threats', difficulty: 3,
    question: 'Which of the following human activities directly causes habitat loss and is widely regarded as the single greatest threat to global biodiversity?',
    options: [
      'Deforestation and land clearance for agriculture',
      'Overuse of chemical pesticides on farms',
      'Hunting and poaching of large animals',
      'Release of greenhouse gases into the atmosphere'
    ],
    answer: 'Deforestation and land clearance for agriculture',
    hint: 'Which activity physically destroys the places where species live?',
    explanation: '<b>Deforestation and land clearance</b> directly destroy habitats — the places where species feed, breed and shelter. Without habitat, populations cannot survive. Agriculture (including cattle ranching and palm-oil cultivation) is responsible for over 80 % of tropical deforestation globally. Pesticides, hunting and climate change also threaten biodiversity but affect it more indirectly or selectively.'
  }),

  makeMCQ({
    id: 'g9s-bhard-008', chapterId: B3, subsection: 'importance_of_biodiversity', difficulty: 4,
    question: 'An invasive snake species is accidentally introduced to a small island. It has no natural predators and feeds heavily on native ground-nesting birds. What is the most likely long-term outcome?',
    options: [
      'Native bird species will decline and some may become extinct',
      'The snakes will die out because they cannot adapt to native prey',
      'Bird diversity will increase as snakes control competing predators',
      'The island ecosystem will stay balanced through natural selection'
    ],
    answer: 'Native bird species will decline and some may become extinct',
    hint: 'An invasive predator with no natural checks on its population will grow unchecked.',
    explanation: 'Without natural predators to control its numbers, the snake population grows rapidly, exerting sustained predation pressure on ground-nesting birds. Over decades, bird populations drop and species with small ranges or slow reproduction can be driven to <b>extinction</b>. This scenario has happened on many islands (e.g. brown tree snake in Guam). Natural selection cannot act fast enough to save species facing an entirely new, unchecked predator.'
  }),

  makeMCQ({
    id: 'g9s-bhard-009', chapterId: B3, subsection: 'what_is_biodiversity', difficulty: 3,
    question: 'A pine forest contains 200 trees, all of the same species. A nearby meadow contains 200 plants belonging to 25 different species. Which area has greater biodiversity, and why?',
    options: [
      'The meadow, because it has greater species diversity',
      'The forest, because it has larger and older individual trees',
      'They are equal, because both contain exactly 200 plants',
      'The forest, because trees provide more ecosystem services'
    ],
    answer: 'The meadow, because it has greater species diversity',
    hint: 'Biodiversity is about the variety of species, not just the number of individual organisms.',
    explanation: '<b>Biodiversity</b> refers to the variety of life — including the number of different species (species richness) and the evenness of their distribution. The meadow has 25 species versus only 1 in the pine forest. Greater species diversity means more complex food webs, greater resilience to disease or environmental change, and more ecological functions. The total number of individual plants is the same in both areas, so that is not the deciding factor.'
  }),

  // ── B4 Plant Nutrition ──────────────────────────────────────────────────

  makeMCQ({
    id: 'g9s-bhard-010', chapterId: B4, subsection: 'photosynthesis', difficulty: 3,
    question: 'A potted plant is kept in complete darkness for 48 hours. A leaf is then removed and tested with iodine solution. What result is expected, and why?',
    options: ["Yellow-brown — the leaf contains no starch because it was used up in respiration during the dark period","Blue-black — photosynthesis continued slowly in the dark, so the leaf carried on producing fresh starch","Green — the chlorophyll in the leaf reacts with the iodine solution to give a bright green colour","Blue-black — the starch stored in the leaf before the experiment began is still present inside it"],
    answer: 'Yellow-brown — the leaf contains no starch because it was used up in respiration during the dark period',
    hint: 'Photosynthesis requires light. What happens to stored starch when a plant cannot make more?',
    explanation: 'In darkness, photosynthesis cannot occur. The plant continues to respire, using the starch already stored in the leaf for energy. After 48 hours, the starch is depleted. Iodine solution stays <b>yellow-brown</b> in the absence of starch. A blue-black colour would only appear if starch were present. This procedure (de-starching) is the first step in many classic leaf experiments to ensure any starch detected afterwards was made during the experiment.'
  }),

  makeMCQ({
    id: 'g9s-bhard-011', chapterId: B4, subsection: 'leaf_adaptation', difficulty: 4,
    question: 'A leaf has a thick waxy cuticle covering its upper surface and the majority of its stomata on the lower surface. Which statement best explains the advantage of this arrangement?',
    options: ["It reduces water loss through the exposed upper surface while allowing gas exchange through the shaded lower surface","It prevents insects from landing on the upper surface, where most of the leaf's chlorophyll is concentrated","It increases the rate of photosynthesis on the upper and the lower surfaces of the leaf at the same time","It maximises light absorption on the top of the leaf and reflects the excess heat away from the bottom"],
    answer: 'It reduces water loss through the exposed upper surface while allowing gas exchange through the shaded lower surface',
    hint: 'The waxy cuticle is waterproof. Stomata allow both gas exchange and water vapour to escape.',
    explanation: 'The <b>waxy cuticle</b> on the upper surface is waterproof, preventing evaporation from the side exposed to direct sunlight and wind. Placing most <b>stomata on the cooler, shaded lower surface</b> allows the necessary CO₂ in and O₂ out for photosynthesis, while reducing the rate of water loss by transpiration. This is a key adaptation for plants living in warm, sunny or dry environments.'
  }),

  makeNum({
    id: 'g9s-bhard-012', chapterId: B4, subsection: 'photosynthesis', difficulty: 3,
    question: 'A plant photosynthesises for 8 hours per day, producing 48 mg of glucose per hour. It respires continuously for the full 24 hours, consuming 6 mg of glucose per hour. How many milligrams of glucose are stored by the plant in one day?',
    answer: 240,
    acceptableAnswers: ['240', '240 mg'],
    hint: 'Calculate total glucose produced, then total glucose used in respiration. Net stored = produced − consumed.',
    explanation: 'Glucose produced by photosynthesis = 48 mg/h × 8 h = 384 mg. Glucose consumed by respiration = 6 mg/h × 24 h = 144 mg. Net glucose stored = 384 − 144 = <b>240 mg</b>. Only the excess glucose after respiration needs are met can be converted to starch or used for growth.'
  }),

  // ── B2 Reproductive ─────────────────────────────────────────────────────

  makeMCQ({
    id: 'g9s-bhard-013', chapterId: B2, subsection: 'reproduction_basics', difficulty: 3,
    question: 'A bee visits a flower, brushes against the stamens and collects pollen on its body. It then flies to a second flower of the same species and the pollen is deposited on the stigma. What process has occurred?',
    options: [
      'Pollination',
      'Fertilisation',
      'Germination',
      'Vegetative reproduction'
    ],
    answer: 'Pollination',
    hint: 'Pollination and fertilisation are different steps. Which one involves transfer of pollen to the stigma?',
    explanation: '<b>Pollination</b> is the transfer of pollen from an anther (male part) to a stigma (female part). In this case it is cross-pollination because the pollen moves between two different flowers. <b>Fertilisation</b> happens later, inside the ovary, when the male gamete (from the pollen tube) fuses with the female gamete (egg cell). Germination applies to seeds, not pollen.'
  }),

  makeMCQ({
    id: 'g9s-bhard-014', chapterId: B2, subsection: 'female_reproductive_system', difficulty: 3,
    question: 'During the menstrual cycle the uterine lining thickens to prepare for a fertilised egg. If fertilisation does not occur, what happens next?',
    options: [
      'The uterine lining breaks down and is shed during menstruation',
      'The egg develops into an embryo within the uterus',
      'Progesterone levels rise, maintaining the thickened lining indefinitely',
      'The ovary immediately releases a second egg to allow another chance of fertilisation'
    ],
    answer: 'The uterine lining breaks down and is shed during menstruation',
    hint: 'If no egg is fertilised, progesterone levels fall. What does the uterine lining do without hormonal support?',
    explanation: 'If fertilisation does not occur, the corpus luteum degenerates and <b>progesterone levels fall</b>. Without progesterone to maintain it, the thickened uterine lining (endometrium) breaks down and is shed as <b>menstruation</b> — a process lasting about 5 days and marking the start of the next cycle. The cycle then repeats, with a new egg maturing in the ovary.'
  }),

  makeMCQ({
    id: 'g9s-bhard-015', chapterId: B2, subsection: 'reproduction_basics', difficulty: 4,
    question: 'A farmer has a mango tree that produces unusually large, sweet fruit. He wants to grow many new trees that are genetically identical to this one. Which method should he use?',
    options: [
      'Vegetative propagation — taking cuttings or grafting',
      'Cross-pollination with a nearby mango tree to produce seeds',
      'Collecting seeds from the fruit and planting them',
      'Selective breeding over several generations'
    ],
    answer: 'Vegetative propagation — taking cuttings or grafting',
    hint: 'Genetic identity requires asexual reproduction. Which method does NOT involve fertilisation?',
    explanation: '<b>Vegetative propagation</b> (e.g. stem cuttings, grafting, or budding) is a form of asexual reproduction — no gametes are involved, so the offspring are <b>genetically identical clones</b> of the parent. Seeds (produced by sexual reproduction) combine genes from two parents and will therefore show genetic variation — the desirable traits may not be passed on reliably. Selective breeding takes many generations. For instant, guaranteed copying of a superior genotype, vegetative propagation is the correct choice.'
  })

);

})();
