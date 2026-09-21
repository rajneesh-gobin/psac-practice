'use strict';

(function () {

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g6sc-hard-001', chapterId: 'g6-ecosystems', subsection: 'food_webs', difficulty: 3,
    question: 'In a food chain: grass → grasshopper → frog → snake → eagle. The entire frog population is wiped out by disease. Which TWO populations would be most directly affected?',
    options: [
      'Grasshoppers increase AND snakes decrease',
      'Grass decreases AND eagles increase',
      'Grasshoppers decrease AND snakes decrease',
      'Grass increases AND eagles decrease'
    ],
    answer: 'Grasshoppers increase AND snakes decrease',
    hint: 'With frogs gone, what happens to the organism frogs ate, and the organism that ate frogs?',
    explanation: 'Frogs ate grasshoppers, so without frogs the grasshopper population is no longer controlled and <b>increases</b>. Snakes ate frogs, so without frogs the snakes lose their food source and their population <b>decreases</b>. The grass and eagles are one step further away and are not as directly or immediately affected.'
  }),

  makeMCQ({
    id: 'g6sc-hard-002', chapterId: 'g6-ecosystems', subsection: 'food_webs', difficulty: 4,
    question: 'In any ecosystem there are always far more grass plants than zebras, and far more zebras than lions. Why are there always fewer organisms at higher levels of a food chain?',
    options: [
      'Predators are larger, so fewer can fit in one area',
      'Energy is lost at each link in the food chain as heat and movement',
      'There is not enough water available for predators to drink',
      'Top predators compete with each other and reduce their own numbers'
    ],
    answer: 'Energy is lost at each link in the food chain as heat and movement',
    hint: 'Think about what happens to the energy from food when an animal moves, keeps warm and grows.',
    explanation: 'When an animal eats, only about 10% of the energy in its food is stored in its own body. The rest is lost as <b>heat</b> (keeping warm), movement (respiration) and in waste. This means each level of a food chain can support far fewer organisms than the level below it, which is why pyramids of numbers and biomass narrow towards the top.'
  }),

  makeMCQ({
    id: 'g6sc-hard-003', chapterId: 'g6-ecosystems', subsection: 'habitats', difficulty: 3,
    question: 'A cactus has a thick swollen stem, a waxy waterproof skin, and long sharp spines instead of broad flat leaves. Which environmental conditions is the cactus adapted to survive?',
    options: [
      'Cold temperatures and high rainfall throughout the year',
      'Intense sunlight and very little rainfall',
      'High humidity and strong coastal winds',
      'Nutrient-poor soil and frequent flooding'
    ],
    answer: 'Intense sunlight and very little rainfall',
    hint: 'Think about why the cactus stores water in its stem and why broad leaves would be a disadvantage.',
    explanation: 'The thick stem stores water for dry periods; the waxy skin reduces water loss by evaporation; the spines replace leaves to minimise the surface area through which water could evaporate. Spines also deter animals from eating the plant in search of its stored water. These features all point to survival in a <b>hot, dry desert</b> environment with intense sunlight and very little rain.'
  }),

  makeMCQ({
    id: 'g6sc-hard-004', chapterId: 'g6-ecosystems', subsection: 'food_webs', difficulty: 3,
    question: 'A food chain in Mauritius runs: leaves → caterpillar → bulbul bird → mongoose. A farmer traps and removes all the mongooses from his land. What is the most likely effect on the caterpillar population over the following months?',
    options: [
      'Caterpillars increase because mongooses previously ate them directly',
      'Caterpillars decrease because bulbul birds now have fewer predators and eat more caterpillars',
      'Caterpillars stay exactly the same because mongooses never affected them',
      'Caterpillars die out completely because the whole food web collapses'
    ],
    answer: 'Caterpillars decrease because bulbul birds now have fewer predators and eat more caterpillars',
    hint: 'Mongooses eat bulbul birds. With fewer mongooses, what happens to the bulbul population — and what do bulbuls eat?',
    explanation: 'Removing mongooses means bulbul birds have fewer predators, so the bulbul population <b>increases</b>. More bulbuls eat more caterpillars, so the caterpillar population <b>decreases</b>. This indirect effect — where removing a top predator harms an organism two steps below it — is called a trophic cascade.'
  }),

  makeMCQ({
    id: 'g6sc-hard-005', chapterId: 'g6-plants', subsection: 'photosynthesis', difficulty: 3,
    question: 'A healthy green plant is placed inside a sealed transparent box in bright sunlight for 6 hours. What happens to the level of oxygen inside the box?',
    options: [
      'Oxygen decreases because the plant uses oxygen for respiration',
      'Oxygen increases because photosynthesis produces more oxygen than the plant uses in respiration during daylight',
      'Oxygen stays exactly the same because photosynthesis and respiration cancel each other out',
      'Oxygen decreases because the plant absorbs oxygen through its roots'
    ],
    answer: 'Oxygen increases because photosynthesis produces more oxygen than the plant uses in respiration during daylight',
    hint: 'Both photosynthesis and respiration happen at the same time. Which process is faster in bright light?',
    explanation: 'Plants carry out <b>respiration</b> continuously (using oxygen, releasing carbon dioxide). In bright light they also carry out <b>photosynthesis</b>, which produces oxygen and uses carbon dioxide. During the day, photosynthesis runs much faster than respiration, so the plant releases <b>more oxygen than it consumes</b>. The net result is a rise in oxygen level inside the sealed box.'
  }),

  makeMCQ({
    id: 'g6sc-hard-006', chapterId: 'g6-plants', subsection: 'photosynthesis', difficulty: 4,
    question: 'A student covers one half of a green leaf with black paper and leaves it in sunlight for 48 hours. She then removes the paper and tests the whole leaf for starch using iodine solution. What result should she expect?',
    options: [
      'The whole leaf turns blue-black because starch is present everywhere',
      'The covered half turns yellow-brown and the uncovered half turns blue-black',
      'The whole leaf turns yellow-brown because no starch was produced in the dark',
      'The covered half turns blue-black because it stored extra starch without light'
    ],
    answer: 'The covered half turns yellow-brown and the uncovered half turns blue-black',
    hint: 'Iodine turns blue-black where starch is present. Which half had light for photosynthesis?',
    explanation: 'Photosynthesis requires <b>light</b>. The uncovered half received sunlight and carried out photosynthesis, producing <b>starch</b> — iodine turns it <b>blue-black</b>. The covered half was in the dark, could not photosynthesise, made no starch, and iodine stays <b>yellow-brown</b>. This experiment demonstrates that light is a necessary condition for photosynthesis.'
  }),

  makeMCQ({
    id: 'g6sc-hard-007', chapterId: 'g6-plants', subsection: 'photosynthesis', difficulty: 3,
    question: 'A plant in a dark room is lit only by a lamp that emits green light. Compared with white light, what happens to the rate of photosynthesis?',
    options: [
      'Photosynthesis increases because plants grow best under green light',
      'Photosynthesis is very slow or stops because plant leaves reflect green light and cannot absorb it',
      'Photosynthesis doubles because green light carries the highest energy',
      'The rate of photosynthesis is unchanged regardless of light colour'
    ],
    answer: 'Photosynthesis is very slow or stops because plant leaves reflect green light and cannot absorb it',
    hint: 'Why do leaves look green to us? Think about which colours of light they reflect and which they absorb.',
    explanation: 'Leaves appear green because the pigment <b>chlorophyll</b> <b>reflects</b> green light rather than absorbing it. Chlorophyll absorbs mainly red and blue light, which it uses to drive photosynthesis. Under pure green light, very little light energy is absorbed, so photosynthesis slows dramatically or stops. This is why a green light is used in dark rooms where photosynthesis experiments are prepared.'
  }),

  makeMCQ({
    id: 'g6sc-hard-008', chapterId: 'g6-materials', subsection: 'rusting', difficulty: 3,
    question: 'A student sets up four test tubes for one week: A — iron nail in completely dry air; B — iron nail in boiled water covered by a layer of oil; C — iron nail in ordinary tap water open to air; D — iron nail in salty water open to air. Rank the test tubes from MOST to LEAST rusting after one week.',
    options: [
      'D, C, A, B',
      'A, B, C, D',
      'C, D, A, B',
      'B, A, C, D'
    ],
    answer: 'D, C, A, B',
    hint: 'Rusting needs both water AND oxygen. Salt water speeds rusting up. Boiled water has had its dissolved oxygen removed.',
    explanation: '<b>D</b> (salty water + air): most rusting — salt speeds up the process by making water a better conductor for the chemical reaction. <b>C</b> (tap water + air): moderate rusting — both water and dissolved oxygen are present. <b>A</b> (dry air only): very slow rusting — no water present. <b>B</b> (boiled, oil-sealed water): no rusting — boiling removes dissolved oxygen, and the oil layer prevents re-entry of air. Rusting requires both <b>water</b> and <b>oxygen</b>; remove either and it stops.'
  }),

  makeMCQ({
    id: 'g6sc-hard-009', chapterId: 'g6-materials', subsection: 'rusting', difficulty: 4,
    question: 'Steel bridges are protected by coating them with zinc, a process called galvanising. Even when the zinc surface is scratched and the iron is exposed, the iron underneath does not rust immediately. Why?',
    options: [
      'The zinc layer acts as a physical barrier that repairs itself after scratching',
      'Zinc is more reactive than iron, so zinc corrodes first and protects the iron beneath it',
      'The scratch heals through a process of metal crystallisation in air',
      'Iron becomes less reactive when it is in contact with zinc'
    ],
    answer: 'Zinc is more reactive than iron, so zinc corrodes first and protects the iron beneath it',
    hint: 'Think about the reactivity series. Which metal — zinc or iron — reacts more readily with oxygen and water?',
    explanation: 'Zinc is <b>higher than iron</b> in the reactivity series, meaning it reacts more readily with oxygen and water. Even after a scratch exposes the iron, the surrounding zinc corrodes (reacts) <b>preferentially</b>, sacrificing itself to protect the iron. This is called <b>sacrificial protection</b> or cathodic protection. The iron only begins to rust once all the zinc nearby has been consumed.'
  }),

  makeMCQ({
    id: 'g6sc-hard-010', chapterId: 'g6-materials', subsection: 'properties', difficulty: 3,
    question: 'A student tests four materials for electrical conductivity using a circuit with a battery and bulb: wood, copper wire, rubber, graphite (from a pencil). Which TWO materials allow the bulb to light up?',
    options: [
      'Wood and rubber',
      'Copper and graphite',
      'Wood and graphite',
      'Copper and rubber'
    ],
    answer: 'Copper and graphite',
    hint: 'Most non-metals are insulators. Graphite is unusual — it is a non-metal that conducts electricity.',
    explanation: '<b>Copper</b> is a metal and an excellent electrical conductor — its outer electrons move freely, carrying charge. <b>Graphite</b> is a form of carbon where each atom leaves one electron free to move along the layers, making it a conductor despite being a non-metal. Wood and rubber are both <b>insulators</b>: their electrons are tightly held and cannot flow to carry a current, so the bulb stays dark when the circuit includes them.'
  }),

  makeMCQ({
    id: 'g6sc-hard-011', chapterId: 'g6-energy', subsection: 'transfer', difficulty: 4,
    question: 'A metal spoon placed in a cup of hot tea becomes too hot to hold after a few minutes. A wooden spoon placed in the same cup stays cool enough to hold throughout. Which statement best explains the difference?',
    options: [
      'Wood is a better conductor of heat than metal',
      'The metal conducts heat energy from the hot tea along the spoon to your hand; wood is a poor conductor (insulator) and does not transfer heat efficiently',
      'Metal absorbs a larger total amount of heat energy than wood at the same temperature',
      'Wood reflects heat energy away from your hand'
    ],
    answer: 'The metal conducts heat energy from the hot tea along the spoon to your hand; wood is a poor conductor (insulator) and does not transfer heat efficiently',
    hint: 'Heat travels through a material by conduction. Which material conducts heat well and which does not?',
    explanation: '<b>Metals</b> have free electrons that can carry heat energy rapidly from the hot end to the cool end — this is why they are good <b>thermal conductors</b>. <b>Wood</b> has no free electrons and its particles transfer energy slowly — it is a <b>thermal insulator</b>. This is why metal saucepan handles become dangerously hot while wooden or plastic handles stay cool even on a hot stove.'
  }),

  makeMCQ({
    id: 'g6sc-hard-012', chapterId: 'g6-energy', subsection: 'forms', difficulty: 3,
    question: 'When a petrol-engine car accelerates along a road, which set of energy conversions takes place inside the engine?',
    options: [
      'Electrical energy → kinetic energy only',
      'Chemical energy stored in petrol → kinetic energy + heat energy + sound energy',
      'Solar energy → chemical energy → kinetic energy',
      'Gravitational potential energy → kinetic energy → electrical energy'
    ],
    answer: 'Chemical energy stored in petrol → kinetic energy + heat energy + sound energy',
    hint: 'Petrol is a fuel — what form of energy is stored in a fuel? What useful and wasted forms come out of combustion?',
    explanation: 'Petrol is a <b>chemical fuel</b>: burning it releases the <b>chemical energy</b> stored in its molecules. This energy is converted mainly into <b>kinetic energy</b> (movement of the car), but also into <b>heat energy</b> (the engine gets hot — this is wasted energy) and <b>sound energy</b> (the engine noise). No energy conversion is 100% efficient; the heat and sound represent energy that is not used for movement.'
  }),

  makeMCQ({
    id: 'g6sc-hard-013', chapterId: 'g6-air', subsection: 'pollution', difficulty: 3,
    question: 'Burning coal and petrol releases sulfur dioxide gas. When sulfur dioxide dissolves in rainwater, it forms sulfuric acid, creating acid rain. Which TWO effects does acid rain have on the environment?',
    options: [
      'It makes lake water more alkaline, which improves survival for fish',
      'It damages the leaves of trees and lowers the pH of lakes and rivers, harming aquatic life',
      'It cools the climate by reflecting sunlight back into space',
      'It increases soil fertility by adding useful sulfur compounds'
    ],
    answer: 'It damages the leaves of trees and lowers the pH of lakes and rivers, harming aquatic life',
    hint: 'Acid rain is harmful — think about what acid does to living things and to water chemistry.',
    explanation: 'Acid rain has a <b>low pH</b> (it is acidic). When it falls on forests it <b>damages and kills leaves</b> by breaking down the waxy coating that protects them, eventually killing trees. When it drains into lakes and rivers it <b>lowers their pH</b>, killing acid-sensitive organisms such as fish, amphibian eggs and invertebrates. Acid rain does not cool the climate; that effect is associated with volcanic dust or aerosols. It does not improve soil fertility.'
  }),

  makeMCQ({
    id: 'g6sc-hard-014', chapterId: 'g6-air', subsection: 'composition', difficulty: 3,
    question: 'Air is approximately 78% nitrogen, 21% oxygen, 0.04% carbon dioxide and traces of other gases. A candle placed inside a sealed glass jar burns for a short time and then goes out, even though there is still plenty of wax left. Why does the flame go out?',
    options: [
      'The nitrogen in the jar is used up and the candle has nothing left to burn',
      'The oxygen level falls too low to support the combustion reaction',
      'The carbon dioxide level drops below the minimum needed for burning',
      'The wax melts away because the sealed jar traps heat and raises the temperature'
    ],
    answer: 'The oxygen level falls too low to support the combustion reaction',
    hint: 'Combustion is a reaction between a fuel and oxygen. What gas does a flame consume?',
    explanation: 'Burning (combustion) requires <b>oxygen</b>. As the candle burns inside the sealed jar, it uses up the oxygen in the air. Nitrogen does not support combustion. Once the oxygen level falls below about 16%, the flame can no longer sustain the combustion reaction and <b>goes out</b>. Carbon dioxide produced by the burning also accumulates, which further inhibits the flame, but the primary reason is oxygen depletion.'
  }),

  makeMCQ({
    id: 'g6sc-hard-015', chapterId: 'g6-air', subsection: 'breathing', difficulty: 3,
    question: 'When you breathe in (inhale), your diaphragm muscle contracts and moves downward (flattens). What effect does this have on the volume of your chest cavity and the air pressure inside your lungs?',
    options: [
      'Volume decreases and pressure increases — air is pushed out of the lungs',
      'Volume increases and air pressure inside decreases — air flows in from outside',
      'Volume stays the same but pressure increases sharply',
      'Volume decreases and pressure also decreases — causing a partial vacuum in the throat'
    ],
    answer: 'Volume increases and air pressure inside decreases — air flows in from outside',
    hint: 'Think of a bicycle pump in reverse. If you increase the space inside a sealed container, what happens to the pressure of the gas inside?',
    explanation: 'When the diaphragm contracts and flattens, the <b>volume of the chest cavity increases</b>. By Boyle\'s law, when volume increases, pressure decreases. The air pressure inside the lungs falls <b>below</b> the atmospheric pressure outside. Air always flows from high pressure to low pressure, so air rushes <b>into</b> the lungs through the nose and mouth. When the diaphragm relaxes and rises, the volume decreases, pressure rises above atmospheric, and air is pushed out (exhalation).'
  })

);

})();
