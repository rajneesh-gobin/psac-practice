'use strict';
// Grade 5 Science — top-up questions.

// --- conservation (8 questions: g5sc-cons-050..057) ---
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5sc-cons-050', chapterId:'conservation', difficulty:1,
    question:'Which of the following is a cause of AIR pollution?',
    options:['Pouring chemicals into rivers','Dumping plastic on beaches','Vehicle exhaust fumes and factory smoke','Sewage flowing into the sea'],
    answer:'Vehicle exhaust fumes and factory smoke',
    hint:'Think about what goes up into the atmosphere.',
    explanation:'Vehicle exhaust fumes and factory smoke release harmful gases and tiny particles (soot) into the air, causing air pollution. Breathing polluted air can cause respiratory diseases like asthma.' }),

  makeMCQ({ id:'g5sc-cons-051', chapterId:'conservation', difficulty:2,
    question:'Why are tree roots important for protecting soil?',
    options:[
      'Roots produce oxygen which hardens the soil into rock',
      'Roots hold soil particles together and prevent erosion by rain and wind',
      'Roots attract rain which keeps the soil moist all year',
      'Roots provide shade which lowers the soil temperature'],
    answer:'Roots hold soil particles together and prevent erosion by rain and wind',
    hint:'What happens to bare soil on a hillside during heavy rain?',
    explanation:'Tree roots bind soil particles together. Without trees, heavy rainfall washes the topsoil away — a process called soil erosion. This damages farmland, causes flooding, and destroys habitats.' }),

  makeMCQ({ id:'g5sc-cons-052', chapterId:'conservation', difficulty:1,
    question:'Which of the 3 Rs means finding a new use for something rather than throwing it away?',
    options:['Reduce','Recycle','Reuse','Recover'],
    answer:'Reuse',
    hint:'Using an old glass jar as a pencil holder is an example.',
    explanation:'"Reuse" means using an item again, for the same or a different purpose. For example, using old newspapers to wrap presents instead of buying new wrapping paper.' }),

  makeMCQ({ id:'g5sc-cons-053', chapterId:'conservation', difficulty:2,
    question:'Fish are dying in a river near a factory. What is the most likely cause?',
    options:['Too much sunlight on the water','Chemicals and untreated waste water from the factory flowing into the river','Too much rainfall filling the river','Too many water plants growing in the river'],
    answer:'Chemicals and untreated waste water from the factory flowing into the river',
    hint:'Think about water pollution from industrial sites.',
    explanation:'Factories sometimes release chemicals and untreated waste water into nearby rivers. These pollutants are toxic to fish and reduce the oxygen levels in the water, causing fish to die.' }),

  makeMCQ({ id:'g5sc-cons-054', chapterId:'conservation', difficulty:1,
    question:'Which national park in Mauritius protects the Pink Pigeon, Echo Parakeet, and Mauritius Kestrel?',
    options:['Pamplemousses Botanical Garden','Black River Gorges National Park','Rodrigues Marine Park','Mahebourg Waterfront'],
    answer:'Black River Gorges National Park',
    hint:'This national park is Mauritius\'s main wildlife sanctuary.',
    explanation:'Black River Gorges National Park is Mauritius\'s most important nature reserve. It protects many endemic species — animals and plants found only in Mauritius — including these three endangered birds.' }),

  makeMCQ({ id:'g5sc-cons-055', chapterId:'conservation', difficulty:2,
    question:'Coral bleaching in Mauritius\'s lagoons is mainly caused by which change in the environment?',
    options:['An increase in the fish population','A rise in sea-water temperature linked to climate change','A decrease in sunlight reaching the sea','An increase in rainfall and river water'],
    answer:'A rise in sea-water temperature linked to climate change',
    hint:'This threat is linked to global warming.',
    explanation:'When sea temperatures rise above normal (due to climate change), coral expels the algae living inside it, turning white — this is bleaching. Without the algae, coral loses its colour and may die.' }),

  makeMCQ({ id:'g5sc-cons-056', chapterId:'conservation', difficulty:3,
    question:'A school collects 240 plastic bottles for recycling. If each bottle weighs 50 grams, what is the total mass of plastic collected, in kilograms?',
    options:['10 kg','12 kg','120 kg','1,200 kg'],
    answer:'12 kg',
    hint:'Start by finding the total mass in grams, then convert to kilograms.',
    explanation:'240 × 50 g = 12,000 g. Converting: 12,000 ÷ 1,000 = 12 kg of plastic collected for recycling.' }),

  makeMCQ({ id:'g5sc-cons-057', chapterId:'conservation', difficulty:3,
    question:'Which statement correctly links a cause of deforestation to TWO of its consequences?',
    options:[
      'Cutting down trees leads to more oxygen in the air and reduced flooding',
      'Cutting down trees leads to soil erosion and loss of habitat for wildlife',
      'Cutting down trees produces cleaner rivers and better farmland',
      'Cutting down trees leads to more rainfall and lower temperatures'],
    answer:'Cutting down trees leads to soil erosion and loss of habitat for wildlife',
    hint:'Think about what happens to the soil and the animals when trees are removed.',
    explanation:'When trees are cut, their roots no longer hold the soil — causing erosion. Animals that depended on those trees lose their homes — causing habitat loss. Both consequences reduce biodiversity.' })
);
