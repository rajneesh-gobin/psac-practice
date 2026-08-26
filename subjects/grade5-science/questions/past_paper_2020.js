'use strict';
// PSAC Grade 5 Science 2020 — questions drawn from the March 2021 paper (the same paper
// was used for the 2020 sitting). Questions are rephrased/reframed to avoid exact duplication
// with past_paper_2021.js. Focus here is on the longer-question sections.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5sc-pp20-001', chapterId:'animals', difficulty:1,
    question:'A spider uses its <strong>silk web</strong> for two main purposes. Which of the following is one of them?',
    options:['To attract a mate with colour','To catch food','To store water for dry seasons','To make honey'], answer:'To catch food',
    hint:'Think about what happens to a fly that lands on a web.',
    explanation:'Spiders use their silk webs to trap insects for food. The sticky threads hold the prey until the spider arrives to eat it.' }),

  makeMCQ({ id:'g5sc-pp20-002', chapterId:'energy', difficulty:2,
    question:'In a survey, <strong>10 families</strong> used solar water heaters, <strong>2 families</strong> used electric water heaters, and <strong>6 families</strong> used gas water heaters. Which type of water heater was <strong>least popular</strong>?',
    options:['Electric water heater','Gas water heater','Solar water heater','All equally popular'], answer:'Electric water heater',
    hint:'Look at which number is the smallest.',
    explanation:'Only 2 families used electric water heaters, making it the least popular choice. Solar heaters were the most popular (10 families) as Mauritius has abundant sunshine.' }),

  makeMCQ({ id:'g5sc-pp20-003', chapterId:'energy', difficulty:2,
    question:'Why do <strong>more families in Mauritius</strong> choose solar water heaters than electric ones?',
    options:['Solar heaters work better at night.','Mauritius has plenty of sunshine, so solar energy is free and renewable.','Electric heaters are more expensive to buy.','Solar heaters heat water faster.'], answer:'Mauritius has plenty of sunshine, so solar energy is free and renewable.',
    hint:'Mauritius is a tropical island near the equator — what does it have plenty of?',
    explanation:'Mauritius is close to the equator and receives lots of sunlight all year. Solar energy is free and renewable, making solar water heaters cheaper to run than electric ones.' }),

  makeMCQ({ id:'g5sc-pp20-004', chapterId:'plants', difficulty:1,
    question:'Tina\'s experiment shows that water is drawn up through the root cutting. Which part of the plant is responsible for <strong>absorbing water from the soil</strong>?',
    options:['Flower','Leaf','Root','Stem'], answer:'Root',
    hint:'This part grows downward into the soil.',
    explanation:'Roots absorb water and mineral salts from the soil through tiny root hair cells. The absorbed water is then transported up the stem to the leaves.' }),

  makeMCQ({ id:'g5sc-pp20-005', chapterId:'plants', difficulty:1,
    question:'A plant makes food in its leaves using sunlight. Which gas does it take from the air during this process?',
    options:['Carbon dioxide','Nitrogen','Oxygen','Water vapour'], answer:'Carbon dioxide',
    hint:'This gas is also what humans breathe out.',
    explanation:'Plants absorb carbon dioxide from the air through their stomata (pores in leaves) and use it, along with sunlight and water, to make food through photosynthesis.' }),

  makeMCQ({ id:'g5sc-pp20-006', chapterId:'electricity', difficulty:1,
    question:'In a simple circuit, the <strong>switch</strong> is open (up position). What happens to the bulb?',
    options:['The bulb lights up brightly.','The bulb flickers.','The bulb does not light up.','The bulb becomes hot only.'], answer:'The bulb does not light up.',
    hint:'An open switch breaks the circuit — what happens to current flow?',
    explanation:'When the switch is open, it creates a break in the circuit. No current can flow, so the bulb does not light up. The circuit must be complete (closed) for current to flow.' }),

  makeMCQ({ id:'g5sc-pp20-007', chapterId:'electricity', difficulty:2,
    question:'Which of the following objects would allow a bulb to light up if placed to <strong>bridge a gap in a circuit</strong>?',
    options:['A plastic spoon','A rubber eraser','An iron nail','A wooden stick'], answer:'An iron nail',
    hint:'Only one of these materials is a metal.',
    explanation:'An iron nail is made of metal, which is a conductor of electricity. When placed to bridge the gap in the circuit, current flows through it and lights the bulb. Plastic, rubber, and wood are insulators.' }),

  makeMCQ({ id:'g5sc-pp20-008', chapterId:'water-matter', difficulty:2,
    question:'Jim places containers of water at 55°C, 65°C and 75°C outside. Which container will <strong>lose water fastest</strong> through evaporation?',
    options:['Container P at 55°C','Container Q at 65°C','Container R at 75°C','All containers evaporate at the same rate'], answer:'Container R at 75°C',
    hint:'Higher temperature means the water molecules have more energy to escape into the air.',
    explanation:'The container at 75°C loses water fastest because higher temperature gives water molecules more energy to break free from the liquid surface and evaporate. The rate of evaporation increases with temperature.' }),

  makeMCQ({ id:'g5sc-pp20-009', chapterId:'water-matter', difficulty:2,
    question:'During the water cycle, <strong>precipitation</strong> refers to:',
    options:['Water vapour rising from oceans','Water vapour cooling to form clouds','Water falling from clouds as rain, hail, or snow','Water soaking into the ground'], answer:'Water falling from clouds as rain, hail, or snow',
    hint:'This is the step where water finally comes back down to the earth\'s surface.',
    explanation:'Precipitation is any form of water that falls from clouds to the ground, including rain, hail, sleet, and snow. It is a key step in the water cycle.' }),

  makeMCQ({ id:'g5sc-pp20-010', chapterId:'animals', difficulty:2,
    question:'The Mauritius Kestrel was once the <strong>world\'s rarest bird</strong>. What was the main cause of its near-extinction?',
    options:['Hunting by fishermen','Loss of natural forest habitat and introduction of predators','Severe cyclones destroying nests','Overfishing of its food supply'], answer:'Loss of natural forest habitat and introduction of predators',
    hint:'Think about what happens when forests are cut down and new animals are brought to an island.',
    explanation:'The Mauritius Kestrel nearly went extinct due to destruction of its forest habitat, use of pesticides (DDT), and predation by introduced animals like rats and monkeys.' }),

  makeMCQ({ id:'g5sc-pp20-011', chapterId:'energy', difficulty:1,
    question:'A boy is cycling to school. The energy transformation taking place is:',
    options:['Chemical energy → movement energy','Electrical energy → movement energy','Solar energy → movement energy','Movement energy → chemical energy'], answer:'Chemical energy → movement energy',
    hint:'The boy ate breakfast before cycling — food gives chemical energy.',
    explanation:'When cycling, the body converts chemical energy from food into movement (kinetic) energy. The muscles use food energy to power the pedalling motion.' }),

  makeMCQ({ id:'g5sc-pp20-012', chapterId:'plants', difficulty:2,
    question:'Which of the following actions <strong>prevents soil erosion</strong>?',
    options:['Cutting down trees on hillsides','Planting dense vegetation and trees','Overgrazing by cattle','Burning grass and shrubs'], answer:'Planting dense vegetation and trees',
    hint:'Plant roots help hold the soil in place.',
    explanation:'Planting trees and dense vegetation prevents soil erosion because plant roots bind the soil together and the plant cover protects it from the impact of rain and wind.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g5sc-pp20-pdf-001', chapterId:'electricity', marks:3, year:2020, grade:5, subject:'Science',
    question:'Draw a circuit diagram with one dry cell, one switch, and two bulbs connected in series. Show the switch in the open position.', type:'draw' },
  { id:'g5sc-pp20-pdf-002', chapterId:'animals', marks:2, year:2020, grade:5, subject:'Science',
    question:'Name two endangered animals found in Mauritius and give one reason why each is endangered.', type:'write' },
  { id:'g5sc-pp20-pdf-003', chapterId:'water-matter', marks:2, year:2020, grade:5, subject:'Science',
    question:'Name the process that changes water vapour into liquid water. Give ONE place in everyday life where you can observe this process.', type:'write' }
);
