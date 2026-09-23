'use strict';
(function () {

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g5sc-hard-001', chapterId: 'plants', subsection: 'photosynthesis', difficulty: 3,
    question: 'A student tests a leaf for starch using iodine solution after the plant has been in bright sunlight for 6 hours. The leaf turns blue-black. What does this prove?',
    options: [
      'The plant made starch during photosynthesis',
      'The leaf absorbed blue light from the sunlight',
      'Iodine is a source of energy for plants',
      'The leaf is dead and has stopped respiring'
    ],
    answer: 'The plant made starch during photosynthesis',
    hint: 'Iodine solution turns blue-black only in the presence of starch.',
    explanation: 'Iodine solution is used to test for starch. The blue-black colour confirms that <b>starch is present</b>, which means the plant carried out <b>photosynthesis</b> in sunlight and stored the glucose produced as starch. If the plant had been kept in the dark, the leaf would remain brown-yellow (no starch).'
  }),

  makeMCQ({
    id: 'g5sc-hard-002', chapterId: 'plants', subsection: 'parts', difficulty: 3,
    question: 'Water lily leaves float on the surface of a pond and have waxy upper surfaces. What is the main advantage of the waxy coating?',
    options: ["It repels water so the leaf does not become waterlogged and can still absorb sunlight","It increases photosynthesis by reflecting light from the pond back up into the leaf","It provides nutrients by absorbing dissolved minerals straight from the pond surface","It allows the leaf to take in extra water directly through its upper surface"],
    answer: 'It repels water so the leaf does not become waterlogged and can still absorb sunlight',
    hint: 'Think about what would happen to the leaf if water sat on top of it for long periods.',
    explanation: 'The waxy surface is <b>hydrophobic</b> — it repels water. This prevents water from pooling on the leaf and blocking sunlight. A waterlogged leaf cannot photosynthesise efficiently. The stomata (pores) of water lilies are also on the upper surface so they can exchange gases with the air above the water.'
  }),

  makeMCQ({
    id: 'g5sc-hard-003', chapterId: 'plants', subsection: 'parts', difficulty: 4,
    question: 'A desert plant has small thick leaves coated in wax, a very long taproot, and a thick fleshy stem. Which statement about these adaptations is INCORRECT?',
    options: [
      'Waxy leaves increase water absorption from the dry air',
      'Small leaves reduce the surface area and so reduce water loss',
      'A long taproot reaches deep underground water sources',
      'The thick fleshy stem stores water for use during dry periods'
    ],
    answer: 'Waxy leaves increase water absorption from the dry air',
    hint: 'The wax coating prevents water movement — think about which direction.',
    explanation: 'A waxy coat <b>reduces water loss</b> through the leaf surface — it does not absorb water from the air. The other three statements are correct desert adaptations: small leaves reduce transpiration, a long taproot accesses deep groundwater, and a fleshy stem acts as a water reservoir. Confusing the direction of water movement is a common exam error.'
  }),

  makeMCQ({
    id: 'g5sc-hard-004', chapterId: 'plants', subsection: 'parts', difficulty: 3,
    question: 'A white carnation flower is placed in red-dyed water. After a few hours the petals turn pink. What does this demonstrate?',
    options: ["Water moves up through the stem carrying the dye, showing upward transport of water in plants","The dye reacted chemically with the petals and produced an entirely new pink pigment","The flower absorbed red light from the dyed water and changed its own pigment to match","Flowers change colour when they are under stress from being cut and left in water"],
    answer: 'Water moves up through the stem carrying the dye, showing upward transport of water in plants',
    hint: 'The dye does not change the water — it travels with the water through the stem.',
    explanation: 'This experiment demonstrates <b>transpiration and upward water transport</b>. Water is absorbed through the roots (or cut stem) and pulled upward through tube-like vessels called xylem. The red dye is carried along with the water and deposited in the petals, turning them pink. Cutting the stem and looking at its cross-section would show the coloured xylem vessels.'
  }),

  makeMCQ({
    id: 'g5sc-hard-005', chapterId: 'animals', subsection: 'habitats', difficulty: 3,
    question: 'A polar bear has thick fur, a thick layer of fat (blubber) under its skin, and white colouring. Which adaptation is MOST important for keeping the bear warm in freezing temperatures?',
    options: [
      'The thick fat layer, which insulates the body and reduces heat loss',
      'The white colouring, which reflects sunlight to warm the fur',
      'The thick fur, which absorbs heat directly from the icy water',
      'The white colour, which makes the bear invisible to prey in the snow'
    ],
    answer: 'The thick fat layer, which insulates the body and reduces heat loss',
    hint: 'Insulation slows the transfer of heat from a warm body to a cold environment.',
    explanation: 'Blubber (thick fat) is an excellent <b>thermal insulator</b> — it slows the flow of heat from the warm body to the freezing environment. White fur helps with camouflage for hunting and also traps some air for insulation, but blubber is the primary heat-retention adaptation in polar mammals. Fat stores energy too, which is useful during food-scarce winters.'
  }),

  makeMCQ({
    id: 'g5sc-hard-006', chapterId: 'animals', subsection: 'classification', difficulty: 3,
    question: 'A whale breathes air through lungs, gives birth to live young and feeds them milk. Despite living entirely in the sea, a whale is classified as:',
    options: ["A mammal, because it breathes air through lungs, gives birth to live young and feeds them milk","A fish, because it lives its whole life in the sea and has a smooth streamlined body","An amphibian, because it can survive both under the water and at the surface to breathe","A reptile, because it has smooth hairless skin and lives in the warm tropical seas"],
    answer: 'A mammal, because it breathes air through lungs, gives birth to live young and feeds them milk',
    hint: 'Classification is based on body features, not where an animal lives.',
    explanation: 'Mammals are defined by three key features: breathing air through lungs, giving birth to live young, and feeding young with milk. A whale has all three, so it is a mammal. <b>Habitat does not determine classification</b> — bats are mammals that fly, and seals are mammals that spend most of their lives in water. Fish breathe through gills and are cold-blooded; reptiles have scales; amphibians have moist skin and lay eggs in water.'
  }),

  makeMCQ({
    id: 'g5sc-hard-007', chapterId: 'animals', subsection: 'habitats', difficulty: 4,
    question: 'A saltwater coral reef fish is placed into a freshwater lake. It dies within hours. What is the most likely scientific reason?',
    options: ["The difference in salt concentration between the fish body fluids and the fresh water causes water to enter the fish cells, making them swell and burst","Fresh water contains far too much dissolved oxygen for a reef fish to cope with, so its gills are overwhelmed and it can no longer breathe properly","The lake has no coral structures for the fish to shelter inside, so it is left exposed and quickly dies of stress from having nowhere at all to hide","The lake water is far too cold compared with the warm tropical reef it came from, so its body slows down until it can no longer swim or feed itself"],
    answer: 'The difference in salt concentration between the fish body fluids and the fresh water causes water to enter the fish cells, making them swell and burst',
    hint: 'Water moves from a region of lower salt concentration to higher salt concentration through a process called osmosis.',
    explanation: 'Saltwater fish have body fluids with a high salt concentration, matched to sea water. Fresh water has very low salt concentration. By <b>osmosis</b>, water moves into the fish from the surrounding fresh water (from low salt to high salt), causing cells to swell and burst. The fish cannot regulate this water balance in fresh water and dies quickly. This is why most fish are adapted to either fresh water or salt water, not both.'
  }),

  makeMCQ({
    id: 'g5sc-hard-008', chapterId: 'water-matter', subsection: 'states', difficulty: 3,
    question: 'When water evaporates from a puddle, the water molecules:',
    options: ["Gain enough energy to escape from the liquid surface and move freely as an invisible gas","Slow down and join together to form small ice crystals in the air above the puddle","Break apart into separate hydrogen and oxygen atoms which then drift away in the air","Sink down into the soil below and become part of the groundwater under the puddle"],
    answer: 'Gain enough energy to escape from the liquid surface and move freely as an invisible gas',
    hint: 'Evaporation is a change of state from liquid to gas — the molecules themselves do not break apart.',
    explanation: '<b>Evaporation</b> is the process where liquid water molecules at the surface gain enough energy (from the Sun or air temperature) to overcome the forces holding them in the liquid and escape as water vapour (an invisible gas). The water molecules stay as H₂O — they do not split into hydrogen and oxygen. This is a physical change, not a chemical one.'
  }),

  makeMCQ({
    id: 'g5sc-hard-009', chapterId: 'water-matter', subsection: 'water_cycle', difficulty: 4,
    question: 'In the water cycle, water evaporates from oceans and lakes, rises into the atmosphere, cools, condenses into clouds, and falls as rain. What provides the energy that drives evaporation?',
    options: ["The Sun's heat energy, which warms water at the surface until molecules can escape as vapour","The Moon's gravitational pull, which draws water molecules upward away from the ocean surface","Wind pressure at the surface, which pushes water molecules off the water and into the air","The Earth's internal heat, which rises up through the ocean floor and warms the water above"],
    answer: 'The Sun\'s heat energy, which warms water at the surface until molecules can escape as vapour',
    hint: 'Think about what dries a puddle faster — a sunny day or a cloudy day?',
    explanation: 'The <b>Sun</b> is the engine of the water cycle. Solar energy heats the surface water, giving molecules enough kinetic energy to evaporate. On a hot sunny day puddles dry quickly; on a cold cloudy day they persist much longer. The Moon affects tides (through gravity) but plays no role in evaporation. Wind can speed evaporation by removing moist air, but it is not the energy source.'
  }),

  makeMCQ({
    id: 'g5sc-hard-010', chapterId: 'water-matter', subsection: 'states', difficulty: 3,
    question: 'Ice floats on liquid water. For most substances, the solid sinks in its own liquid. Why is ice different?',
    options: ["Ice has a lower density than liquid water because its molecules form a regular open structure with more space between them","Ice is lighter in colour than liquid water, and a pale substance is always less dense than a darker one of the same kind","Ice is colder than the water around it, so it rises to the surface in just the same way that cold air rises in a warm room","Ice always contains many air bubbles that become trapped inside it during freezing, and those bubbles make the whole block float"],
    answer: 'Ice has a lower density than liquid water because its molecules form a regular open structure with more space between them',
    hint: 'Density = mass per unit volume. If ice takes up more space for the same mass, it is less dense.',
    explanation: 'When water freezes, the molecules arrange themselves into a regular hexagonal crystal structure that actually takes up <b>more space</b> than the same molecules in liquid water. More volume for the same mass means lower density. Since density of ice (about 0.92 g/cm³) is less than liquid water (1.00 g/cm³), ice floats. This property is vital for aquatic life — the ice layer insulates the water below and keeps it liquid in winter.'
  }),

  makeMCQ({
    id: 'g5sc-hard-011', chapterId: 'water-matter', subsection: 'properties', difficulty: 3,
    question: 'A student dissolves salt in water to make a solution, then heats the solution gently until all the water evaporates. What will they find in the dish?',
    options: [
      'The original salt, showing that dissolving is a reversible physical change',
      'Nothing — the salt was destroyed when it dissolved',
      'A new substance formed by the chemical reaction of salt and water',
      'Water vapour and salt bonded together as a solid foam'
    ],
    answer: 'The original salt, showing that dissolving is a reversible physical change',
    hint: 'Dissolving is a physical change, not a chemical one — the salt particles are still there.',
    explanation: 'When salt dissolves in water, it spreads evenly through the water but is NOT destroyed. The salt particles (ions) separate and mix with water molecules. Heating evaporates the water, leaving behind the <b>original salt</b>. This is a <b>reversible physical change</b> — no new substance is made. This is how salt is produced commercially: sea water is evaporated in shallow ponds, leaving sea salt behind.'
  }),

  makeMCQ({
    id: 'g5sc-hard-012', chapterId: 'energy', subsection: 'transfer', difficulty: 3,
    question: 'When you rub your hands together quickly, they become warm. Which energy transfer is taking place?',
    options: [
      'Kinetic (movement) energy is converted to heat energy through friction',
      'Chemical energy in your muscles is directly converted to heat in your skin',
      'Electrical energy from nerve signals is converted to heat at your palms',
      'Sound energy from the rubbing noise is converted to heat in your hands'
    ],
    answer: 'Kinetic (movement) energy is converted to heat energy through friction',
    hint: 'The hands are moving — what type of energy does a moving object have?',
    explanation: 'Your moving hands have <b>kinetic energy</b>. When the surfaces rub together, <b>friction</b> acts between them, converting kinetic energy into <b>heat (thermal) energy</b>. This is why rough surfaces cause more friction and produce more heat than smooth surfaces. The same principle is used in fire-starting with sticks and explains why car brakes get hot when a driver brakes hard.'
  }),

  makeMCQ({
    id: 'g5sc-hard-013', chapterId: 'energy', subsection: 'transfer', difficulty: 4,
    question: 'A student says: "Energy is used up when a light bulb shines." Why is this statement scientifically incorrect?',
    options: ["Energy cannot be created or destroyed — it is transformed from electrical energy into light and heat, and the total amount stays the same","It is correct: the electrical energy completely disappears once the bulb shines, which is why the battery eventually goes flat and stops working","The bulb stores the energy inside its glass and releases it again slowly over time, so none of the energy is ever actually used up at all","Light energy does not require any input energy at all to be produced, so nothing is used up whenever a light bulb is switched on and shines"],
    answer: 'Energy cannot be created or destroyed — it is transformed from electrical energy into light and heat, and the total amount stays the same',
    hint: 'Think about the Law of Conservation of Energy — energy cannot disappear.',
    explanation: 'The <b>Law of Conservation of Energy</b> states that energy cannot be created or destroyed — only <b>transformed</b> from one form to another. In a light bulb, electrical energy is transformed into light energy and heat energy. The total energy output (light + heat) equals the electrical energy input. We say energy is "used" in everyday language, but scientifically it is <b>converted</b>, not destroyed. Nothing is ever truly "used up" in science.'
  }),

  makeMCQ({
    id: 'g5sc-hard-014', chapterId: 'electricity', subsection: 'circuits', difficulty: 3,
    question: 'A circuit contains a battery, a switch and two bulbs connected in SERIES (one after the other). The switch is opened (circuit broken). What happens to the bulbs?',
    options: ["Both bulbs go out because opening the switch breaks the complete circuit and current stops flowing","Only the bulb closest to the switch goes out, because the break happens nearest to that one","One bulb stays alight because it is connected directly to the battery on the other side","Both bulbs glow more brightly because the current no longer has to be shared between them"],
    answer: 'Both bulbs go out because opening the switch breaks the complete circuit and current stops flowing',
    hint: 'In a series circuit, all components are in one single loop. If one part breaks, what happens to the rest?',
    explanation: 'In a <b>series circuit</b>, there is only one path for current to flow. Opening the switch creates a gap (break) in that single path, so <b>current stops flowing everywhere</b> in the circuit — both bulbs go out immediately. This is a disadvantage of series circuits: if one component fails, all others stop working. In a parallel circuit, each branch has its own path, so one broken branch does not affect others.'
  }),

  makeMCQ({
    id: 'g5sc-hard-015', chapterId: 'electricity', subsection: 'conductors', difficulty: 3,
    question: 'A student tests five materials in a circuit with a bulb and battery. The bulb glows for: copper wire (YES), plastic ruler (NO), graphite pencil lead (YES), rubber eraser (NO), iron nail (YES). What conclusion is best supported by these results?',
    options: [
      'Metals and graphite conduct electricity; plastic and rubber do not',
      'All metals are conductors and all non-metals are insulators, without exception',
      'Only iron can conduct electricity among all solid materials',
      'The battery voltage is what determines whether a material conducts'
    ],
    answer: 'Metals and graphite conduct electricity; plastic and rubber do not',
    hint: 'Look carefully at the results — is graphite a metal? What does that tell you about the rule?',
    explanation: 'The results show that <b>copper (metal), iron (metal) and graphite (non-metal) are conductors</b>, while plastic and rubber are insulators. This tells us the rule is NOT simply "all metals conduct, all non-metals do not" — graphite is a non-metal that conducts. The accurate conclusion is that <b>metals and graphite conduct electricity</b>. Graphite conducts because it has free electrons in its structure, unlike most other non-metals. This is why graphite is used in pencil leads and in electrodes.'
  })

);

})();
