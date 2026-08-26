'use strict';
// Grade 5 Science - Chapter: Plants
// Uses STATIC_QUESTIONS + helpers from engine/helpers.js
// IDs format: g5sci-pl-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5sci-pl-001', chapterId:'plants', difficulty:1,
    question:'What is the main function of the leaf in a plant?',
    options:['It absorbs water from the soil','It makes food for the plant','It holds the plant firmly in the soil','It protects the seed'],
    answer:'It makes food for the plant',
    hint:'The leaf carries out photosynthesis.',
    explanation:'The leaf makes food for the plant through photosynthesis - using sunlight, water and carbon dioxide to produce glucose and oxygen.',
    learnMore:'The word equation for photosynthesis: <b>Carbon dioxide + Water → Glucose + Oxygen</b> (using sunlight and chlorophyll).<br><br>Chlorophyll is the green pigment inside leaf cells that captures sunlight energy. This is why leaves are green! Glucose is used by the plant for energy and to build new cells; oxygen is released as a by-product — which is why plants are essential for life on Earth. A single large tree can produce enough oxygen for two people to breathe for a year.' }),

  makeMCQ({ id:'g5sci-pl-002', chapterId:'plants', difficulty:1,
    question:'Which part of the plant anchors it firmly in the soil AND absorbs water and minerals?',
    options:['The stem','The leaf','The root','The flower'],
    answer:'The root',
    hint:'This part is underground.',
    explanation:'The root anchors the plant in the soil and absorbs water and minerals from the soil.' }),

  makeTF({ id:'g5sci-pl-003', chapterId:'plants', difficulty:1,
    question:'The leaf of a plant is responsible for absorbing water from the soil.',
    answer:false,
    hint:'Which part of the plant is underground?',
    explanation:'The <b>root</b> absorbs water from the soil. The leaf makes food through photosynthesis.' }),

  makeMCQ({ id:'g5sci-pl-004', chapterId:'plants', difficulty:1,
    question:'What is the main function of the stem in a plant?',
    options:['It absorbs sunlight','It produces seeds','It transports water from roots to leaves','It absorbs water from the soil'],
    answer:'It transports water from roots to leaves',
    hint:'The stem acts like a pipe.',
    explanation:'The stem transports water and minerals from the roots up to the leaves, and carries food made in the leaves down to other parts of the plant.' }),

  makeMCQ({ id:'g5sci-pl-005', chapterId:'plants', difficulty:2,
    question:'Which conditions are needed for a seed to germinate?',
    options:['Water, warmth and air','Sunlight, soil and water','Water, air and fertiliser','Sunlight, warmth and soil'],
    answer:'Water, warmth and air',
    hint:'A seed does not need light to germinate.',
    explanation:'Seeds need water (to activate enzymes), warmth (for chemical reactions) and air/oxygen (for respiration) to germinate. Sunlight is NOT needed for germination.',
    learnMore:'You can prove seeds don\'t need light to germinate by planting one in a dark cupboard — it will sprout just as well as one on a windowsill. Once the seedling\'s first leaves appear, it urgently needs light to begin photosynthesis, or it will run out of stored food energy and die.<br><br>The food energy a seedling uses before its first leaves open comes from the <b>seed\'s own food store</b> (cotyledons, or "seed leaves"). This is why bigger seeds (like beans) can survive longer underground than tiny seeds.' }),

  makeTF({ id:'g5sci-pl-006', chapterId:'plants', difficulty:1,
    question:'Sunlight is needed for a seed to germinate.',
    answer:false,
    hint:'Think about what a seed buried deep in the ground needs to start growing.',
    explanation:'Seeds do not need sunlight to germinate. They need water, warmth and air. Sunlight is needed later, for the seedling to make food.' }),

  makeMCQ({ id:'g5sci-pl-007', chapterId:'plants', difficulty:1,
    question:'What is soil erosion?',
    options:[
      'The process of planting new trees',
      'The removal of topsoil by wind or water',
      'The mixing of soil with fertilisers',
      'The process of soil becoming hard'
    ],
    answer:'The removal of topsoil by wind or water',
    hint:'Erosion means wearing away - something is being removed.',
    explanation:'Soil erosion is the removal and transport of topsoil by wind, running water or waves, leaving the land less fertile.' }),

  makeMCQ({ id:'g5sci-pl-008', chapterId:'plants', difficulty:2,
    question:'Which measure helps to PREVENT soil erosion on slopes?',
    options:[
      'Cutting down all trees on the slope',
      'Leaving land bare after harvesting',
      'Planting trees and plants on slopes',
      'Using heavy machinery on slopes'
    ],
    answer:'Planting trees and plants on slopes',
    hint:'Plant roots hold the soil in place.',
    explanation:'Planting trees and plants on slopes prevents soil erosion because the roots bind the soil together and prevent it from being washed or blown away.' }),

  makeMCQ({ id:'g5sci-pl-009', chapterId:'plants', difficulty:2,
    question:'What happens during pollination?',
    options:[
      'Pollen is transferred from the male part to the female part of a flower',
      'A seed is transferred to the soil',
      'Water is transferred from roots to leaves',
      'Pollen is transferred from the female part to the male part'
    ],
    answer:'Pollen is transferred from the male part to the female part of a flower',
    hint:'Pollination is needed for seeds to form.',
    explanation:'Pollination is the transfer of pollen from the stamen (male part) to the stigma (female part) of a flower, enabling fertilisation and seed formation.' }),

  makeMCQ({ id:'g5sci-pl-010', chapterId:'plants', difficulty:1,
    question:'Which part of a plant is responsible for reproduction - producing seeds?',
    options:['Root','Stem','Leaf','Flower'],
    answer:'Flower',
    hint:'Seeds develop after this part does its job.',
    explanation:'The flower is the reproductive organ of a plant. After pollination, the flower produces seeds that can grow into new plants.' }),

  makeMatch({ id:'g5sci-pl-011', chapterId:'plants', difficulty:1,
    leftItem:'Root',
    allRights:['Absorbs water and minerals from the soil','Transports water from roots to leaves','Makes food through photosynthesis','Produces seeds through reproduction'],
    correctRight:'Absorbs water and minerals from the soil',
    hint:'The root is underground.',
    explanation:'The root absorbs water and minerals from the soil and anchors the plant.' }),

  makeMatch({ id:'g5sci-pl-012', chapterId:'plants', difficulty:1,
    leftItem:'Stem',
    allRights:['Absorbs water and minerals from the soil','Transports water from roots to leaves','Makes food through photosynthesis','Produces seeds through reproduction'],
    correctRight:'Transports water from roots to leaves',
    hint:'The stem acts like a pipe or straw.',
    explanation:'The stem transports water and nutrients between the roots and leaves.' }),

  makeMCQ({ id:'g5sci-pl-013', chapterId:'plants', difficulty:2,
    question:'A farmer notices that heavy rain is washing away the topsoil from his field. What should he plant to help prevent this?',
    options:['More crops that leave the soil bare between rows','Trees and grass along the edges of the field','Large stones to block rainwater','Nothing - rain erosion cannot be stopped'],
    answer:'Trees and grass along the edges of the field',
    hint:'Roots are nature\'s anchor for soil.',
    explanation:'Trees and grass have extensive root systems that bind soil particles together, reducing the impact of rain and preventing topsoil from being washed away.' }),

  makeMCQ({ id:'g5sci-pl-014', chapterId:'plants', difficulty:1,
    question:'Which part of a plant attracts insects for pollination?',
    options:['Root','Stem','Flower','Leaf'],
    answer:'Flower',
    hint:'This brightly coloured part draws in bees and butterflies.',
    explanation:'The <b>flower</b> attracts insects for pollination. Its bright colours, patterns and sweet scent attract bees, butterflies and other insects that carry pollen from flower to flower.' }),

  makeMCQ({ id:'g5sci-pl-015', chapterId:'plants', difficulty:1,
    question:'The root of which of these plants is usually used as food by humans?',
    options:['Sugarcane','Grass','Carrot','Vetiver'],
    answer:'Carrot',
    hint:'You eat this underground orange vegetable.',
    explanation:'The <b>carrot</b> plant stores food in its root, which humans eat. Other examples of edible roots include cassava, sweet potato and radish.' }),

  makeMCQ({ id:'g5sci-pl-016', chapterId:'plants', difficulty:2,
    question:'Which gas do plants absorb from the air to make their own food (photosynthesis)?',
    options:['Oxygen','Nitrogen','Carbon dioxide','Hydrogen'],
    answer:'Carbon dioxide',
    hint:'Plants "breathe in" this gas and breathe out oxygen.',
    explanation:'Plants absorb <b>carbon dioxide</b> from the air through small openings in their leaves. They combine it with water (from the roots) and light energy to make glucose during photosynthesis.' }),

  makeMCQ({ id:'g5sci-pl-017', chapterId:'plants', difficulty:2,
    question:'The cactus plant grows in the desert. Which feature of the cactus allows it to survive with very little water?',
    options:[
      'It has large broad leaves that collect rain',
      'It has a thick stem that stores water',
      'It has many flowers to attract insects',
      'It has deep roots that reach underground rivers'
    ],
    answer:'It has a thick stem that stores water',
    hint:'The thick, fleshy stem of a cactus is like a water tank.',
    explanation:'The cactus has a <b>thick, fleshy stem</b> that stores large amounts of water. This allows it to survive in the desert where there is very little rainfall. The stem also has a waxy coating to reduce water loss.' }),

  makeNum({ id:'g5sci-pl-018', chapterId:'plants', difficulty:2,
    question:'A cactus has thin, sharp __________ instead of leaves to reduce water loss. (One word)',
    answer:'spines', acceptableAnswers:['spines','thorns','needles'],
    hint:'These sharp structures also protect the cactus from animals that might eat it.',
    explanation:'The cactus has <b>spines</b> (sharp thorns/needles) instead of leaves. Leaves would lose too much water through transpiration in the hot desert. Spines have a much smaller surface area, so less water is lost.' }),

  makeMCQ({ id:'g5sci-pl-019', chapterId:'plants', difficulty:2,
    question:'What is the first part to appear when a seed germinates?',
    options:['Leaf','Stem','Root','Flower'],
    answer:'Root',
    hint:'The plant needs to anchor itself and find water before it grows upward.',
    explanation:'During germination, the <b>root</b> appears first. It grows downward into the soil to anchor the seedling and absorb water and minerals before the shoot (stem and leaves) emerges above ground.' }),

  makeTF({ id:'g5sci-pl-020', chapterId:'plants', difficulty:2,
    question:'A germinating seed becomes smaller because it uses its stored food to grow.',
    answer:true,
    hint:'Before the seedling can make its own food, where does it get energy from?',
    explanation:'True. A seed contains stored food (starch, oils). During germination, before the seedling has leaves to make food by photosynthesis, it uses up this stored food for energy and growth. This is why the seed shrinks and loses mass.' }),

  makeMCQ({ id:'g5sci-pl-021', chapterId:'plants', difficulty:3,
    question:'Jim places a balsam plant in red-coloured water. After two days, the stem turns red. What does this experiment show?',
    options:[
      'The stem produces red pigment when exposed to sunlight',
      'The stem transports water from the roots upward through the plant',
      'The stem absorbs water from the air',
      'The roots of the balsam plant release red chemicals'
    ],
    answer:'The stem transports water from the roots upward through the plant',
    hint:'The red colour travels up the stem with the water.',
    explanation:'The red-coloured water travels up through the stem from the roots. When the stem turns red, it proves that the <b>stem transports water upward</b> throughout the plant. This is a classic experiment demonstrating the transport function of the stem.' }),

  makeMCQ({ id:'g5sci-pl-022', chapterId:'plants', difficulty:3,
    question:'Seed A is placed in wet cotton wool and Seed B in dry cotton wool, both at room temperature. Which seed will germinate and why?',
    options:[
      'Seed A - because water is one of the conditions needed for germination',
      'Seed B - because dry conditions help germination',
      'Both seeds - temperature is the only factor that matters',
      'Neither seed - seeds need sunlight to germinate'
    ],
    answer:'Seed A - because water is one of the conditions needed for germination',
    hint:'What are the three conditions needed for germination?',
    explanation:'<b>Seed A</b> will germinate because it has <b>water</b> - one of the three conditions needed (water, warmth, air/oxygen). Seed B has no water so it cannot start the chemical reactions needed for germination. Sunlight is NOT needed for germination.' }),

  makeMCQ({ id:'g5sci-pl-023', chapterId:'plants', difficulty:3,
    question:'A plant is placed in a room with good lighting, but the room has no air flow and all the windows are sealed. Why might the plant eventually stop growing well?',
    options:[
      'The plant will overheat without any breeze',
      'The plant will use up the carbon dioxide in the air and have none left for photosynthesis',
      'The plant cannot grow without wind to spread its seeds',
      'The sealed room traps too much oxygen, which poisons the plant'
    ],
    answer:'The plant will use up the carbon dioxide in the air and have none left for photosynthesis',
    hint:'What gas does the plant need from the air to make food?',
    explanation:'Plants need <b>carbon dioxide</b> for photosynthesis. In a completely sealed room, the plant would gradually use up all the CO₂. With no fresh CO₂ coming in, photosynthesis slows and the plant cannot make enough food to grow.' }),

  makeMCQ({ id:'g5sci-pl-024', chapterId:'plants', difficulty:4,
    question:'Ryan investigates whether water is needed for germination. He sets up two cups of soil with identical seeds. Cup A receives 5 ml of water daily; Cup B receives no water. After 10 days, only the seed in Cup A has germinated. His friend says, "Temperature also changed during the experiment." Why does this make the experiment UNFAIR?',
    options:[
      'Because a fair test must change two things at a time',
      'Because a fair test changes only ONE variable - if temperature also changed, we cannot be sure water caused the germination',
      'Because seeds always germinate when watered, so the result is obvious',
      'Because the friend should have done the experiment themselves'
    ],
    answer:'Because a fair test changes only ONE variable - if temperature also changed, we cannot be sure water caused the germination',
    hint:'In a fair test (controlled experiment), only the variable being tested should change.',
    explanation:'In a <b>fair test</b>, only the <b>independent variable</b> (here: water) should change. All other conditions (temperature, type of seed, type of soil, light) must stay the same. If temperature also changed, we cannot be sure whether it was the water or the temperature change that caused Cup A\'s seed to germinate.' }),

  makeMCQ({ id:'g5sci-pl-025', chapterId:'plants', difficulty:4,
    question:'A pupil notices that a field with no plants erodes quickly in heavy rain, but a nearby field covered in thick grass does not. Give TWO reasons why the grassy field is protected from soil erosion.',
    options:[
      'Grass roots bind the soil, and grass leaves slow the rain drops before they hit the soil',
      'Grass makes the soil harder and drier so rain cannot penetrate',
      'Grass attracts birds that eat the rain drops before they reach the soil',
      'Grass produces chemicals that repel rainwater'
    ],
    answer:'Grass roots bind the soil, and grass leaves slow the rain drops before they hit the soil',
    hint:'Think about what the roots do underground AND what the leaves do above ground.',
    explanation:'The grassy field is protected in two ways: (1) The <b>roots bind soil particles together</b>, making it harder for water to wash the soil away; (2) The <b>leaves/blades of grass slow the rain drops</b> as they fall, reducing the force with which they hit the soil surface.' }),

  makeMCQ({ id:'g5sci-pl-026', chapterId:'plants', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Diagram_showing_the_parts_of_a_plant_CRUK_371.svg" alt="a plant diagram" style="max-height:220px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.12)"></div><b>In the diagram above, which part absorbs water and minerals from the soil?</b>',
    options:['Stem','Leaf','Root','Flower'],
    answer:'Root',
    hint:'This part grows underground and holds the plant firmly in place.',
    explanation:'The <b>root</b> absorbs water and minerals from the soil and also anchors the plant. In the diagram it is the underground part at the base of the plant.' }),

  makeMCQ({ id:'g5sci-pl-027', chapterId:'plants', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Maize_seeds_germination.jpg" alt="a germinating seed photo" style="max-height:220px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.12)"></div><b>The photo above shows seeds that have started to sprout tiny roots and shoots. What is this process called?</b>',
    options:['Germination','Pollination','Photosynthesis','Erosion'],
    answer:'Germination',
    hint:'This process requires water, warmth and air — NOT sunlight — to begin.',
    explanation:'<b>Germination</b> is the process by which a seed sprouts and begins to grow into a new plant. The root (radicle) appears first, pushing into the soil to anchor the seedling and absorb water, before the shoot emerges.' }),

  makeMCQ({ id:'g5sci-pl-028', chapterId:'plants', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Erosion.jpg" alt="a field with eroded bare soil" style="max-height:220px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.12)"></div><b>The photo above shows bare soil being stripped away by rain and wind. What is this process called, and what would PREVENT it?</b>',
    options:[
      'Pollination — prevented by adding fertiliser',
      'Soil erosion — prevented by planting trees and grass whose roots bind the soil',
      'Photosynthesis — prevented by removing leaves',
      'Germination — prevented by watering crops'
    ],
    answer:'Soil erosion — prevented by planting trees and grass whose roots bind the soil',
    hint:'Plant roots act like anchors — they hold soil particles together.',
    explanation:'<b>Soil erosion</b> is the removal of topsoil by wind or running water. Bare fields with no plant roots to hold soil in place are very vulnerable. <b>Planting trees and grasses</b> helps prevent erosion because their roots bind soil particles and their leaves slow the impact of raindrops.' }),

  makeMCQ({ id:'g5sci-pl-029', chapterId:'plants', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Simple_photosynthesis_overview.svg" alt="a photosynthesis diagram" style="max-height:220px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.12)"></div><b>The diagram shows photosynthesis taking place in a leaf. Which gas does the leaf RELEASE as a by-product of this process?</b>',
    options:['Carbon dioxide','Nitrogen','Oxygen','Hydrogen'],
    answer:'Oxygen',
    hint:'We need this gas to breathe — plants release it while making food.',
    explanation:'During photosynthesis, leaves use sunlight, water and carbon dioxide to make food (glucose). <b>Oxygen</b> is released as a by-product through the stomata. This is why plants are essential for producing the air we breathe.' }),

  makeMCQ({ id:'g5sci-pl-030', chapterId:'plants', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Prop_roots_of_Maize_plant.jpg" alt="a plant root system photo" style="max-height:220px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.12)"></div><b>The photo shows the root system of a plant. What are the TWO main functions of roots?</b>',
    options:[
      'They absorb water and minerals from the soil, AND anchor the plant firmly in the soil',
      'They make food through photosynthesis AND transport it to the leaves',
      'They attract insects for pollination AND produce seeds',
      'They store seeds AND release oxygen into the soil'
    ],
    answer:'They absorb water and minerals from the soil, AND anchor the plant firmly in the soil',
    hint:'Roots have one job underground related to what they take in, and one job holding the plant in place.',
    explanation:'Roots have two main functions: (1) <b>Absorb water and minerals</b> from the soil to supply the rest of the plant; (2) <b>Anchor the plant</b> firmly in the soil so it does not topple over.' })

);
