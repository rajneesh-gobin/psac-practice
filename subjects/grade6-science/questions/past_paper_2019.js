'use strict';
// PSAC Grade 6 Science 2019 — past-paper questions adapted to MCQ format.
// Source: Modular August 2019 paper.
STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6sc-pp19-001', chapterId:'g6-air', subsection:'breathing', difficulty:1,
    question:'Which one of the following gases is used as a <b>fire extinguisher</b>?',
    options:['Oxygen','Carbon dioxide','Water vapour','Nitrogen'], answer:'Carbon dioxide',
    hint:'This gas smothers a fire by removing the oxygen supply.',
    explanation:'Carbon dioxide (CO₂) is used in fire extinguishers — it is heavier than air and forms a blanket over the fire, cutting off oxygen and extinguishing the flame.' }),

  makeMCQ({ id:'g6sc-pp19-002', chapterId:'g6-animals', subsection:'habitats', difficulty:1,
    question:'How many teeth are there in a full set of <b>permanent teeth</b> in human adults?',
    options:['14','20','26','32'], answer:'32',
    hint:'Children have 20 milk teeth; adults have more.',
    explanation:'Adults have 32 permanent teeth: 8 incisors, 4 canines, 8 pre-molars, and 12 molars. Children have only 20 milk (deciduous) teeth.' }),

  makeMCQ({ id:'g6sc-pp19-003', chapterId:'g6-air', subsection:'composition', difficulty:1,
    question:'What is the <b>percentage of oxygen</b> gas in the atmosphere?',
    options:['0.01%','0.03%','21.0%','78.1%'], answer:'21.0%',
    hint:'Nitrogen is the biggest at 78%. Oxygen is the second-biggest.',
    explanation:'Oxygen makes up approximately 21% of the atmosphere. Nitrogen accounts for about 78%. Carbon dioxide is only about 0.03%; 78.1% would be nitrogen, not oxygen.' }),

  makeMCQ({ id:'g6sc-pp19-004', chapterId:'g6-materials', subsection:'properties', difficulty:1,
    question:'Which one of the following materials is obtained from an <b>animal</b>?',
    options:['Cotton','Paper','Rubber','Silk'], answer:'Silk',
    hint:'This material is produced by a small creature that spins a cocoon.',
    explanation:'Silk is obtained from the silkworm (an animal) — it unravels the silk fibre from the silkworm cocoon. Cotton comes from the cotton plant; paper from wood (plant); rubber from the rubber tree (plant).' }),

  makeMCQ({ id:'g6sc-pp19-005', chapterId:'g6-animals', subsection:'classification', difficulty:1,
    question:'Which one of the following is a characteristic of <b>birds</b>?',
    options:['They have feathers on their body','They have a hard exoskeleton','They give birth to their young ones','They move by crawling'], answer:'They have feathers on their body',
    hint:'No other animal group has this covering on its body.',
    explanation:'Feathers are unique to birds — no other animal has them. Exoskeletons belong to insects/crustaceans; giving birth to live young is a mammal trait; crawling is associated with reptiles and some insects.' }),

  makeMCQ({ id:'g6sc-pp19-006', chapterId:'g6-animals', subsection:'classification', difficulty:1,
    question:'Food for the body falls into three groups. Bread and butter provide energy. Fish and lentils help the body grow. Which group do cucumbers and carrots belong to?',
    options:['Food for energy','Food for growth','Food for health','Food for strength'], answer:'Food for health',
    hint:'Vegetables like cucumbers and carrots are rich in vitamins and minerals.',
    explanation:'Cucumbers and carrots are vegetables rich in vitamins and minerals — they belong to the food for health group. Carbohydrates (bread, rice) give energy; proteins (fish, meat, lentils) support growth.' }),

  makeMCQ({ id:'g6sc-pp19-007', chapterId:'g6-materials', subsection:'natural_manmade', difficulty:2,
    question:'In an experiment, water takes 5 seconds to pass through tissue paper, does not pass through a plastic sheet, takes 2 minutes through carton, and 5 hours through leather. Which material is <b>most permeable</b> to water?',
    options:['Carton','Leather','Plastic sheet','Tissue paper'], answer:'Tissue paper',
    hint:'The most permeable material lets water through the fastest.',
    explanation:'Tissue paper lets water through in only 5 seconds — the fastest — making it the most permeable. Leather (5 hours) is least permeable among those that allow water; plastic sheet is completely impermeable.' }),

  makeMCQ({ id:'g6sc-pp19-008', chapterId:'g6-materials', subsection:'natural_manmade', difficulty:2,
    question:'Using the same experiment results (tissue paper: 5s, plastic sheet: water does not pass, carton: 2min, leather: 5hr), which material is most suitable to make a <b>raincoat</b>?',
    options:['Carton','Leather','Plastic sheet','Tissue paper'], answer:'Plastic sheet',
    hint:'A raincoat must not let water through at all.',
    explanation:'A raincoat needs to be completely impermeable. Plastic sheet is the only material in the experiment through which water does not pass at all — making it ideal for a raincoat.' }),

  makeMCQ({ id:'g6sc-pp19-009', chapterId:'g6-solar-system', subsection:'planets', difficulty:1,
    question:'Which movement of the Earth takes a <b>year</b> to complete?',
    options:['One rotation on its own axis','One revolution around the Moon','One revolution around the Sun','One rotation of the Moon around the Earth'], answer:'One revolution around the Sun',
    hint:'A year is how long Earth takes to travel all the way around the star at the centre of our solar system.',
    explanation:'One complete revolution (orbit) of the Earth around the Sun takes 365¼ days — one year. This movement also causes the seasons. One rotation on its own axis takes only 24 hours.' }),

  makeMCQ({ id:'g6sc-pp19-010', chapterId:'g6-energy', subsection:'renewable', difficulty:1,
    question:'In Mauritius, electricity is produced from falling water, heavy oil, bagasse, and wind. Which one of these is a <b>non-renewable</b> source?',
    options:['Falling water','Heavy oil','Bagasse','Wind'], answer:'Heavy oil',
    hint:'This source is a fossil fuel that took millions of years to form underground.',
    explanation:'Heavy oil is a fossil fuel — non-renewable because it cannot be replenished once used. Falling water (hydro), bagasse (from sugarcane), and wind are all renewable sources.' }),

  makeMCQ({ id:'g6sc-pp19-011', chapterId:'g6-energy', subsection:'renewable', difficulty:1,
    question:'From the sources used in Mauritius (falling water, heavy oil, bagasse, wind), which one is a <b>renewable</b> source that also produces no direct air pollution when generating electricity?',
    options:['Falling water','Heavy oil','Bagasse','All of them'], answer:'Falling water',
    hint:'Think about which source uses only the movement of water with no burning involved.',
    explanation:'Falling water (hydro power) generates electricity by spinning turbines with the force of falling water — no fuel is burned, so no air pollution is produced directly. It is also renewable.' }),

  makeMCQ({ id:'g6sc-pp19-012', chapterId:'g6-ecosystems', subsection:'food_webs', difficulty:2,
    question:'Snails eat lettuce plants in a garden. The lettuce plants depend on the Sun. Which correctly shows the food chain in this garden ecosystem?',
    options:['Sun → Snail → Lettuce','Lettuce → Snail → Sun','Sun → Lettuce → Snail','Snail → Lettuce → Sun'], answer:'Sun → Lettuce → Snail',
    hint:'Energy flows from the Sun → producer → consumer.',
    explanation:'Sun → Lettuce → Snail is correct. The lettuce is a producer (uses sunlight to make food); the snail is a consumer (eats the lettuce). Energy always flows from sun to plants to animals.' }),

  makeMCQ({ id:'g6sc-pp19-013', chapterId:'g6-ecosystems', subsection:'habitats', difficulty:2,
    question:'A stone crusher next to a forest releases dust into the air. How does this <b>air pollution</b> affect the trees in the forest?',
    options:['It helps the trees grow faster by adding minerals','It blocks sunlight reaching the leaves, reducing photosynthesis','It increases rainfall around the forest','It increases the oxygen level in the forest'], answer:'It blocks sunlight reaching the leaves, reducing photosynthesis',
    hint:'Trees need sunlight for photosynthesis. What happens if their leaves are covered in dust?',
    explanation:'Dust from the stone crusher settles on leaves and blocks sunlight, reducing photosynthesis. Less food is produced, weakening the trees. Pollutants may also damage leaf tissue directly.' })

);
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g6sc-pp19-pdf-001', chapterId:'g6-animals', marks:3, year:2019, grade:6, subject:'Science',
    question:'Draw lines to match each food item in Column A to its main function in Column B: Bread and butter / Fish and lentils / Cucumber and carrots → Provide vitamins for health / Provide energy for activities / Provide materials for growth.', type:'match' },
  { id:'g6sc-pp19-pdf-002', chapterId:'g6-materials', marks:5, year:2019, grade:6, subject:'Science',
    question:'Three girls want to build a dog house using iron, wood, or glass. Fill in the table: give one advantage and one disadvantage of each material. (Example given: iron disadvantage = rusts when exposed to air and water.)', type:'table' },
  { id:'g6sc-pp19-pdf-003', chapterId:'g6-solar-system', marks:4, year:2019, grade:6, subject:'Science',
    question:'Fill in each blank using words from the list (Earth, planet, sun, moon, solar): (i) There are eight planets in the _____ system. (ii) The _____ is a natural satellite. (iii) The _____ takes 24 hours to complete a rotation on itself. (iv) The _____ is the main source of energy for plants.', type:'fill' },
  { id:'g6sc-pp19-pdf-004', needsArtwork:true, chapterId:'g6-ecosystems', marks:2, year:2019, grade:6, subject:'Science',
    question:'A diagram shows lettuce plants with snails eating them. Complete the food chain boxes: [___] → [___] → Sun to show how the living things depend on each other.', type:'fill' }
);
