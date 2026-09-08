'use strict';
// Grade 5 Science - depth for the chapters the real papers lean on hardest.
//
// WHY THIS FILE EXISTS
// examWeight is now set from the 2024 and 2025 Grade 5 papers (see the block
// above `chapters:` in _manifest.js). Electricity and Energy each take 20% of
// the marks and now supply 8 questions of every 40-question exam from pools of
// 44 and 41 - five mock exams and the chapter was used up. Measured 2026-09-08.
//
// ⚠ Options are written ANSWER FIRST in the table purely so the item is easy
//   to read and check: options[0] is always the answer. It does NOT set where
//   the answer appears on screen - makeMCQ() shuffles the options itself
//   (engine/helpers.js), so the A/B/C/D spread comes from that Fisher-Yates
//   shuffle, not from anything here. What DOES matter is keeping all four
//   options the same grammatical shape and length: the real papers average a
//   6.8-character spread, and scripts/test-option-parity.js measures it.
//
// ⚠ Nothing here is tagged `diagrams`. That subsection is for items that carry
//   a picture, and these are text-only.

(function () {
  let n = 0;
  const q = (chapterId, subsection, difficulty, question, options, hint, explanation) => {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g5sc-dep-${String(n).padStart(3, '0')}`,
      chapterId, subsection, difficulty, question,
      options,
      answer: options[0], hint, explanation
    }));
  };

  // ══ energy (39) ═════════════════════════════════════════════════════════
  // sources (12)
  q('energy', 'sources', 1, 'What is the main source of energy for the Earth?',
    ['The sun', 'The moon', 'The wind', 'The sea'],
    'Almost all other sources begin with it.',
    '<b>The sun</b> is the main source of energy. Wind, rain and the food plants make all begin with sunlight.');
  q('energy', 'sources', 1, 'Which source of energy does a sailing boat use?',
    ['Wind', 'Petrol', 'Coal', 'Sunlight'],
    'Look at what fills the sail.',
    'A sailing boat is pushed along by the <b>wind</b>, which is a free and renewable source of energy.');
  q('energy', 'sources', 1, 'Which source of energy does a motorcycle use?',
    ['Petrol', 'Wind', 'Water', 'Sunlight'],
    'It is poured into the tank.',
    'A motorcycle burns <b>petrol</b>, a fuel made from oil.');
  q('energy', 'sources', 1, 'Which fuel is burnt in a thermal power station in Mauritius?',
    ['Heavy oil', 'Falling water', 'Sunlight', 'Wind'],
    'A thermal station makes heat by burning something.',
    'A thermal power station burns <b>heavy oil</b> or coal to boil water and make steam.');
  q('energy', 'sources', 2, 'Which source of energy is used to dry octopus in Rodrigues?',
    ['The sun', 'Petrol', 'Coal', 'Electricity'],
    'It is spread outside in the open.',
    'Octopus is dried by <b>the sun</b>, which costs nothing and uses no fuel.');
  q('energy', 'sources', 2, 'A hydro power station uses the energy of ...',
    ['falling water', 'burning coal', 'blowing wind', 'moving sand'],
    'The prefix "hydro" means water.',
    'A hydro power station uses <b>falling water</b> to turn a turbine, which drives a generator.');
  q('energy', 'sources', 2, 'Bagasse, the fibre left after crushing sugar cane, is used to ...',
    ['produce electricity', 'build stone walls', 'make window glass', 'feed sea fish'],
    'It is burned at the sugar factory.',
    'Bagasse is burned to <b>produce electricity</b>, so nothing from the cane is wasted.');
  q('energy', 'sources', 2, 'Which of these is a fossil fuel?',
    ['Coal', 'Wind', 'Sunlight', 'Falling water'],
    'It was formed from dead plants long ago.',
    '<b>Coal</b> is a fossil fuel, formed over millions of years from the remains of plants.');
  q('energy', 'sources', 2, 'Fossil fuels were formed from ...',
    ['dead plants and animals', 'melted rock from volcanoes', 'sand from the seashore', 'salt left by the sea'],
    'They took millions of years to form.',
    'Fossil fuels were formed from the remains of <b>dead plants and animals</b> buried under rock.');
  q('energy', 'sources', 3, 'Give one disadvantage of using heavy oil in a power station.',
    ['It pollutes the air', 'It never runs out', 'It costs nothing at all', 'It makes no heat'],
    'Think about the chimney.',
    'Burning heavy oil <b>pollutes the air</b> with smoke and carbon dioxide, and the oil must be imported.');
  q('energy', 'sources', 3, 'Why does Mauritius import most of its fuel?',
    ['It has no oil of its own', 'It has too much oil', 'Its ships are too small', 'Its cars use no fuel'],
    'Think about what is under the island.',
    'Mauritius <b>has no oil of its own</b>, so petrol, diesel and heavy oil must all be bought from abroad.');
  q('energy', 'sources', 3, 'Which source of energy would work best on a roof in a sunny place?',
    ['Solar panels', 'A water turbine', 'A coal furnace', 'A petrol engine'],
    'Use what is freely available there.',
    '<b>Solar panels</b> turn sunlight into electricity, and a sunny roof receives sunlight all day.');

  // renewable and non-renewable (10)
  q('energy', 'renewable', 1, 'Which one of these is a renewable source of energy?',
    ['Wind', 'Coal', 'Petrol', 'Diesel'],
    'Which one will never be used up?',
    '<b>Wind</b> is renewable: it keeps blowing however much we use. The others run out once burnt.');
  q('energy', 'renewable', 1, 'Which one of these is a non-renewable source of energy?',
    ['Coal', 'Wind', 'Sunlight', 'Falling water'],
    'Which one cannot be replaced?',
    '<b>Coal</b> took millions of years to form, so once it is burnt it cannot be replaced.');
  q('energy', 'renewable', 2, 'What does "renewable" mean when describing energy?',
    ['It is replaced naturally', 'It is very expensive', 'It gives out no heat', 'It is used only at night'],
    'Nature keeps supplying it.',
    'A renewable source <b>is replaced naturally</b>, so using it today does not reduce what is there tomorrow.');
  q('energy', 'renewable', 2, 'Give one advantage of using solar panels.',
    ['They cause no pollution', 'They burn cheap coal', 'They work best at night', 'They need no sunlight'],
    'Nothing is burned.',
    'Solar panels burn no fuel, so <b>they cause no pollution</b> and the sunlight they use is free.');
  q('energy', 'renewable', 2, 'Give one disadvantage of using solar panels.',
    ['They do not work at night', 'They pollute the air badly', 'They use up all the coal', 'They need heavy oil'],
    'When is there no sunlight?',
    '<b>They do not work at night</b>, or well on a cloudy day, so batteries or another supply are needed.');
  q('energy', 'renewable', 2, 'Wind energy is captured by a ...',
    ['wind turbine', 'solar panel', 'water pump', 'steam boiler'],
    'It has long blades that spin.',
    'A <b>wind turbine</b> has blades that the wind turns, driving a generator that makes electricity.');
  q('energy', 'renewable', 3, 'Why should we use more renewable energy?',
    ['Fossil fuels will run out', 'Renewables cost much more', 'Fossil fuels never pollute', 'Renewables use more oil'],
    'Think about the future supply.',
    '<b>Fossil fuels will run out</b> and they pollute, while renewable sources keep being replaced and are much cleaner.');
  q('energy', 'renewable', 3, 'Bagasse is described as a renewable source of energy because it ...',
    ['grows again each year', 'was formed long ago', 'is dug out of the ground', 'is imported by ship'],
    'Sugar cane is replanted.',
    'Sugar cane <b>grows again each year</b>, so the bagasse it produces is replaced naturally.');
  q('energy', 'renewable', 3, 'Which pair contains only renewable sources of energy?',
    ['Wind and sunlight', 'Coal and petrol', 'Diesel and gas', 'Oil and coal'],
    'Both members of the pair must be replaced naturally.',
    '<b>Wind and sunlight</b> are both renewable. Every other pair listed is a fossil fuel.');
  q('energy', 'renewable', 3, 'A hydro power station is better for the environment than a thermal one because it ...',
    ['burns no fuel at all', 'uses much more coal', 'produces more smoke', 'needs no water supply'],
    'What comes out of the chimney?',
    'A hydro station <b>burns no fuel at all</b>, so it releases no smoke and no carbon dioxide.');

  // forms of energy (9)
  q('energy', 'forms', 1, 'What form of energy do we get from a lit lamp?',
    ['Light energy', 'Sound energy', 'Chemical energy', 'Wind energy'],
    'It is what lets you see.',
    'A lamp gives out <b>light energy</b>, and also some heat energy.');
  q('energy', 'forms', 1, 'What form of energy is stored in food?',
    ['Chemical energy', 'Light energy', 'Sound energy', 'Wind energy'],
    'It is released when the body uses the food.',
    'Food stores <b>chemical energy</b>, which the body releases to move, grow and keep warm.');
  q('energy', 'forms', 1, 'What form of energy does a drum give out when beaten?',
    ['Sound energy', 'Light energy', 'Chemical energy', 'Solar energy'],
    'It is what the ear picks up.',
    'A beaten drum gives out <b>sound energy</b>, which travels through the air to our ears.');
  q('energy', 'forms', 2, 'What form of energy does a moving car have?',
    ['Movement energy', 'Sound energy', 'Light energy', 'Chemical energy'],
    'It is sometimes called kinetic energy.',
    'Anything that moves has <b>movement energy</b>, also called kinetic energy.');
  q('energy', 'forms', 2, 'A cell in a torch stores which form of energy?',
    ['Chemical energy', 'Light energy', 'Sound energy', 'Movement energy'],
    'It is released as the torch is used.',
    'A cell stores <b>chemical energy</b>, which is changed into electrical energy when the torch is switched on.');
  q('energy', 'forms', 2, 'Which form of energy is used by solar panels?',
    ['Light energy', 'Sound energy', 'Chemical energy', 'Movement energy'],
    'It comes from the sun.',
    'Solar panels use the <b>light energy</b> of the sun and change it into electrical energy.');
  q('energy', 'forms', 3, 'When a television is switched on, which two forms of energy are given out?',
    ['Light and sound', 'Wind and rain', 'Chemical and wind', 'Sound and chemical'],
    'What do you see and hear?',
    'A television gives out <b>light and sound</b> energy, and a little heat as well.');
  q('energy', 'forms', 3, 'A heater changes electrical energy mainly into ...',
    ['heat energy', 'sound energy', 'chemical energy', 'wind energy'],
    'That is what it is for.',
    'A heater changes electrical energy into <b>heat energy</b>, which warms the room.');
  q('energy', 'forms', 3, 'Which appliance changes electrical energy into movement energy?',
    ['An electric fan', 'A table lamp', 'A radio speaker', 'An electric heater'],
    'Which one turns?',
    'An <b>electric fan</b> changes electrical energy into the movement energy of the spinning blades.');

  // energy transfer and saving (8)
  q('energy', 'transfer', 2, 'A girl runs in a park. The energy change is chemical energy to ...',
    ['movement energy', 'light energy', 'sound energy', 'solar energy'],
    'Where does the food energy go?',
    'The chemical energy in her food is changed into <b>movement energy</b> as she runs, and some heat.');
  q('energy', 'transfer', 2, 'A tree makes its food. The energy change is light energy to ...',
    ['chemical energy', 'sound energy', 'movement energy', 'electrical energy'],
    'The food stores energy.',
    'In photosynthesis the tree changes light energy from the sun into <b>chemical energy</b> stored in its food.');
  q('energy', 'transfer', 2, 'In a thermal power station the energy change is heat energy to movement energy to ...',
    ['electrical energy', 'chemical energy', 'sound energy', 'light energy'],
    'What comes out along the wires?',
    'Steam turns the turbine, and the generator turns that movement into <b>electrical energy</b>.');
  q('energy', 'transfer', 2, 'A candle changes chemical energy into ...',
    ['heat and light', 'sound and wind', 'movement and rain', 'electrical and sound'],
    'What does a candle give you?',
    'The wax stores chemical energy, and burning changes it into <b>heat and light</b>.');
  q('energy', 'transfer', 2, 'Give one way of saving electricity at home.',
    ['Switch off unused lights', 'Leave the fridge door open', 'Boil a full kettle daily', 'Keep the television on'],
    'Stop using what nobody needs.',
    '<b>Switching off unused lights</b> stops electricity being wasted in empty rooms.');
  q('energy', 'transfer', 3, 'Why is it wasteful to leave a television on when nobody is watching?',
    ['Electricity is used for nothing', 'The screen becomes brighter', 'The set uses less power', 'The sound becomes clearer'],
    'What is being paid for?',
    '<b>Electricity is used for nothing</b>, which costs money and burns fuel at the power station for no reason.');
  q('energy', 'transfer', 3, 'Drying clothes on a line instead of in a machine saves energy because ...',
    ['the sun and wind are free', 'the machine uses no power', 'clothes dry more slowly', 'the line uses electricity'],
    'What does the line use?',
    '<b>The sun and wind are free</b> and use no electricity, while a drying machine uses a great deal.');
  q('energy', 'transfer', 3, 'Which change would save the most energy in a classroom?',
    ['Opening windows instead of using fans', 'Turning on every light at noon', 'Leaving computers on all night', 'Closing all the curtains at noon'],
    'Use what nature provides.',
    '<b>Opening windows instead of using fans</b> cools the room with no electricity at all.');

  // ══ electricity (36) ════════════════════════════════════════════════════
  // components (10)
  q('electricity', 'components', 1, 'Which component supplies the energy in a simple circuit?',
    ['The cell', 'The bulb', 'The wire', 'The switch'],
    'It is sometimes called a battery.',
    '<b>The cell</b> supplies the energy that pushes the current around the circuit.');
  q('electricity', 'components', 1, 'What is the function of the bulb in a circuit?',
    ['It gives out light', 'It stores the energy', 'It carries the current', 'It breaks the circuit'],
    'It is the part you can see working.',
    'The bulb changes electrical energy into light, so <b>it gives out light</b>.');
  q('electricity', 'components', 1, 'What is the function of the wire in a circuit?',
    ['It carries the current', 'It stores the energy', 'It gives out light', 'It opens the circuit'],
    'It joins the parts together.',
    'The wire <b>carries the current</b> from the cell to the bulb and back again.');
  q('electricity', 'components', 1, 'What is the function of the switch in a circuit?',
    ['It opens and closes the circuit', 'It supplies the energy', 'It gives out the light', 'It stores the current'],
    'It lets you turn the bulb on and off.',
    'The switch <b>opens and closes the circuit</b>, so the current can be stopped and started.');
  q('electricity', 'components', 2, 'Two or more cells joined together form a ...',
    ['battery', 'circuit', 'switch', 'conductor'],
    'It is what a torch usually takes.',
    'A <b>battery</b> is two or more cells joined together, which gives a bigger push than one cell.');
  q('electricity', 'components', 2, 'Which material is the outer covering of an electric wire made of?',
    ['Rubber', 'Copper', 'Iron', 'Aluminium'],
    'It must keep the current in.',
    'The covering is <b>rubber</b> or plastic, which are insulators, so the wire is safe to touch.');
  q('electricity', 'components', 2, 'Which material is the inside of an electric wire made of?',
    ['Copper', 'Rubber', 'Plastic', 'Wood'],
    'The current must flow through it.',
    'The inside is <b>copper</b>, a good conductor, so the current flows easily along the wire.');
  q('electricity', 'components', 3, 'A torch does not light although the bulb is good. What should be checked next?',
    ['Whether the cell is flat', 'Whether the glass is clean', 'Whether the torch is heavy', 'Whether the torch is old'],
    'Something must supply the energy.',
    'The most likely fault is a flat cell, so check <b>whether the cell is flat</b> before anything else.');
  q('electricity', 'components', 3, 'Why is a fuse placed in an electric circuit at home?',
    ['To break the circuit if unsafe', 'To make the bulb brighter', 'To store extra electricity', 'To carry more current'],
    'It protects the wiring.',
    'A fuse melts and <b>breaks the circuit</b> if too much current flows, which prevents fire.');
  q('electricity', 'components', 3, 'Which drawing symbol stands for a cell in a circuit diagram?',
    ['A long line and a short line', 'A circle with a cross inside', 'A single zigzag line', 'A small empty square box'],
    'One line is longer than the other.',
    'A cell is drawn as <b>a long line and a short line</b>. The long line is the positive terminal.');

  // circuits (12)
  q('electricity', 'circuits', 1, 'What is a closed circuit?',
    ['A complete path for the current', 'A circuit with a break in it', 'A circuit with no cell', 'A circuit with no wire'],
    'The current can go all the way round.',
    'A closed circuit is <b>a complete path</b>, so the current flows and the bulb lights.');
  q('electricity', 'circuits', 1, 'What is an open circuit?',
    ['A circuit with a gap in it', 'A circuit with no gap', 'A circuit with two cells', 'A circuit with two bulbs'],
    'Something is broken or switched off.',
    'An open circuit has <b>a gap in it</b>, so the current cannot flow and the bulb stays off.');
  q('electricity', 'circuits', 2, 'In an open circuit the bulb does not light because ...',
    ['the current cannot flow', 'the cell is too strong', 'the wire is too short', 'the bulb is too bright'],
    'The path is broken.',
    'The gap stops the path, so <b>the current cannot flow</b> and no energy reaches the bulb.');
  q('electricity', 'circuits', 2, 'When the switch is pressed, the circuit becomes ...',
    ['closed', 'open', 'broken', 'empty'],
    'The bulb lights up.',
    'Pressing the switch joins the two ends, so the circuit becomes <b>closed</b> and the current flows.');
  q('electricity', 'circuits', 2, 'What happens to the bulb if one wire is disconnected?',
    ['It goes out', 'It shines brighter', 'It changes colour', 'It stays the same'],
    'The path is no longer complete.',
    'The circuit is open, so no current flows and the bulb <b>goes out</b>.');
  q('electricity', 'circuits', 2, 'What happens if a second cell is added correctly to a circuit?',
    ['The bulb shines brighter', 'The bulb goes out', 'The wire melts at once', 'The switch stops working'],
    'There is a bigger push behind the current.',
    'Two cells give a bigger push, so more current flows and <b>the bulb shines brighter</b>.');
  q('electricity', 'circuits', 3, 'Two bulbs are joined one after the other in a circuit. If one is removed, the other ...',
    ['goes out', 'shines brighter', 'stays the same', 'changes colour'],
    'Removing one leaves a gap in the single path.',
    'In a series circuit there is only one path, so removing a bulb opens the circuit and the other <b>goes out</b>.');
  q('electricity', 'circuits', 3, 'Why does a circuit need a cell as well as wires?',
    ['The cell pushes the current', 'The wires store the energy', 'The cell gives out the light', 'The wires open the circuit'],
    'Wires alone do nothing.',
    'Wires only carry the current; <b>the cell pushes it</b> round the circuit by supplying the energy.');
  q('electricity', 'circuits', 3, 'A pupil builds a circuit but the bulb does not light. Which is the least likely cause?',
    ['The wires are too thin', 'The cell is flat', 'A wire is loose', 'The bulb is broken'],
    'Three of these really do break a circuit.',
    'A flat cell, a loose wire and a broken bulb all stop the current. <b>Thin wires</b> would still carry it.');
  q('electricity', 'circuits', 3, 'Why is a switch useful in a circuit?',
    ['It saves energy when off', 'It makes the bulb brighter', 'It stores extra current', 'It replaces the cell'],
    'Think about what happens when nobody needs the light.',
    'A switch lets the circuit be opened, so no current flows and <b>energy is saved when it is off</b>.');
  q('electricity', 'circuits', 2, 'In which direction does current flow in a simple circuit?',
    ['Round the whole circuit', 'Only into the bulb', 'Only into the cell', 'Backwards and forwards'],
    'It must return to where it started.',
    'The current flows <b>round the whole circuit</b>, out of the cell, through the bulb and back to the cell.');
  q('electricity', 'circuits', 2, 'What is needed for a bulb to light in a circuit?',
    ['A complete path and a cell', 'A switch and no wires', 'A gap in the wire', 'Two broken bulbs'],
    'Both a source and a path are needed.',
    'A bulb lights only when there is <b>a complete path and a cell</b> to push the current round it.');

  // conductors and insulators (14)
  q('electricity', 'conductors', 1, 'What is a conductor of electricity?',
    ['A material current flows through', 'A material that stops current', 'A material that gives out light', 'A material that stores heat'],
    'The current can pass along it.',
    'A conductor is <b>a material current flows through</b> easily. Most metals are conductors.');
  q('electricity', 'conductors', 1, 'What is an insulator of electricity?',
    ['A material that stops current', 'A material current flows through', 'A material that stores current', 'A material that makes current'],
    'It blocks the current.',
    'An insulator <b>stops the current</b>. Plastic, rubber, wood and glass are insulators.');
  q('electricity', 'conductors', 3, 'A metal paper clip in a working circuit is swapped for an identical one made of plastic. What happens to the bulb?',
    ['It goes out, because plastic does not conduct', 'It glows more brightly than it did before', 'It glows, but a good deal more dimly', 'It glows once the plastic has warmed up'],
    'Something has to bridge the gap that current can actually flow through.',
    'Plastic is an <b>insulator</b>, so current cannot flow and the circuit is no longer complete: the bulb goes out altogether. It does not simply dim - a circuit is either complete or it is not.');
  q('electricity', 'conductors', 1, 'Which one of these is an insulator?',
    ['A wooden spoon', 'An iron nail', 'A copper wire', 'A steel key'],
    'Three of them are metals.',
    'A <b>wooden spoon</b> is an insulator. Iron, copper and steel are all conductors.');
  q('electricity', 'conductors', 2, 'Which metal is most often used to make electric wires?',
    ['Copper', 'Lead', 'Zinc', 'Tin'],
    'It is a reddish-brown metal.',
    '<b>Copper</b> is used because it conducts electricity very well and can be drawn into thin wires.');
  q('electricity', 'conductors', 2, 'A pupil tests a paper clip in a circuit and the bulb lights. The paper clip is ...',
    ['a conductor', 'an insulator', 'a cell', 'a switch'],
    'The current got through it.',
    'The bulb lit, so the current passed through the paper clip, which means it is <b>a conductor</b>.');
  q('electricity', 'conductors', 2, 'A pupil tests a rubber band and the bulb does not light. The rubber band is ...',
    ['an insulator', 'a conductor', 'a cell', 'a switch'],
    'The current was blocked.',
    'No current passed, so the rubber band is <b>an insulator</b>.');
  q('electricity', 'conductors', 2, 'Why is the handle of a screwdriver made of plastic?',
    ['Plastic is an insulator', 'Plastic is a conductor', 'Plastic is transparent', 'Plastic is magnetic'],
    'It keeps the user safe.',
    '<b>Plastic is an insulator</b>, so current cannot pass from the metal blade to the hand.');
  q('electricity', 'conductors', 2, 'Why should a plug never be touched with wet hands?',
    ['Water conducts electricity', 'Water is an insulator', 'Water cools the plug', 'Water cleans the metal'],
    'Think about what water does to current.',
    '<b>Water conducts electricity</b>, so wet hands let the current pass into the body and cause a shock.');
  q('electricity', 'conductors', 3, 'Give one safety rule when using electricity at home.',
    ['Never touch bare wires', 'Always use wet hands', 'Pull plugs by the cable', 'Cover sockets with cloth'],
    'Bare metal carries the current.',
    '<b>Never touch bare wires.</b> The current would pass through the body and could kill.');
  q('electricity', 'conductors', 3, 'Why are birds not hurt when they sit on an electric cable?',
    ['The current stays in the cable', 'Birds are good insulators', 'The cable carries no current', 'Feathers store electricity'],
    'The current has no reason to leave the wire.',
    'The bird touches only one cable, so there is no complete path to the ground and <b>the current stays in the cable</b>.');
  q('electricity', 'conductors', 3, 'Which pair contains only insulators?',
    ['Glass and rubber', 'Copper and iron', 'Steel and water', 'Aluminium and tin'],
    'Both must block the current.',
    '<b>Glass and rubber</b> are both insulators. Every other pair contains conductors.');
  q('electricity', 'conductors', 3, 'The outer part of an electric wire is made of rubber so that ...',
    ['the wire is safe to touch', 'the current flows faster', 'the wire is much heavier', 'the wire gives out light'],
    'Rubber blocks the current.',
    'Rubber is an insulator, so <b>the wire is safe to touch</b> even while current flows inside it.');
  q('electricity', 'conductors', 3, 'A pupil wants to test whether a material conducts electricity. What should be done?',
    ['Put it in a gap in a circuit', 'Hold it near a bright lamp', 'Drop it into a glass of water', 'Weigh it on a balance'],
    'See whether the bulb lights.',
    '<b>Put it in a gap in a circuit.</b> If the bulb lights, the current passed through and the material is a conductor.');

  // ══ water-matter (17) ═══════════════════════════════════════════════════
  q('water-matter', 'states', 2, 'In which state of matter are the particles packed most closely together?',
    ['Solid', 'Liquid', 'Gas', 'They are packed equally in all three'],
    'Think about which one keeps its own shape.',
    'In a <b>solid</b> the particles are packed tightly in a fixed pattern, which is why a solid keeps its shape. In a liquid they are still close but can slide past one another, and in a gas they are far apart.');
  q('water-matter', 'states', 1, 'When ice is left in a warm room it ...',
    ['melts', 'freezes', 'condenses', 'evaporates'],
    'Solid becomes liquid.',
    'Ice <b>melts</b>: the solid takes in heat and becomes liquid water.');
  q('water-matter', 'states', 2, 'What is the change from liquid water to ice called?',
    ['Freezing', 'Melting', 'Boiling', 'Condensation'],
    'Liquid becomes solid.',
    'Water <b>freezes</b> into ice when it loses enough heat.');
  q('water-matter', 'states', 2, 'Ice cubes are put into a glass of water. After some time the water becomes ...',
    ['colder', 'warmer', 'thicker', 'saltier'],
    'The ice takes heat from the water.',
    'The melting ice takes heat from the water, so the water becomes <b>colder</b> and its temperature falls.');
  q('water-matter', 'states', 3, 'Which property of ice makes it useful for the relief of pain?',
    ['It is cold', 'It is hard', 'It is slippery', 'It is solid'],
    'Think about what it does to a swelling.',
    '<b>It is cold</b>, so it takes heat from the injured part and reduces swelling and pain.');

  q('water-matter', 'water_cycle', 1, 'What is the change from liquid water to water vapour called?',
    ['Evaporation', 'Condensation', 'Freezing', 'Melting'],
    'It happens when a puddle dries in the sun.',
    '<b>Evaporation</b> is the change from liquid to gas, and it is faster when it is hot and windy.');
  q('water-matter', 'water_cycle', 1, 'What is the change from water vapour back to liquid water called?',
    ['Condensation', 'Evaporation', 'Melting', 'Freezing'],
    'It makes droplets on a cold glass.',
    '<b>Condensation</b> is the change from gas to liquid, which happens when water vapour is cooled.');
  q('water-matter', 'water_cycle', 2, 'Droplets form on the outside of a cold glass by the process of ...',
    ['condensation', 'evaporation', 'melting', 'freezing'],
    'The water comes from the air, not the glass.',
    'Water vapour in the air touches the cold glass, cools and turns to liquid: this is <b>condensation</b>.');
  q('water-matter', 'water_cycle', 2, 'Rain falling from a cloud is called ...',
    ['precipitation', 'evaporation', 'condensation', 'transpiration'],
    'It is the stage where water returns to the ground.',
    '<b>Precipitation</b> is water falling from clouds as rain, and in some countries as snow or hail.');
  q('water-matter', 'water_cycle', 2, 'In the water cycle, water rises from the sea by ...',
    ['evaporation', 'condensation', 'precipitation', 'freezing'],
    'The sun heats the sea surface.',
    'The sun heats the sea and water rises as vapour: this is <b>evaporation</b>, the first stage of the cycle.');
  q('water-matter', 'water_cycle', 3, 'Apart from the water cycle, give one example of the importance of evaporation.',
    ['Drying clothes on a line', 'Making ice in a freezer', 'Boiling rice in a pot', 'Cooling a drink with ice'],
    'Water has to leave something.',
    '<b>Drying clothes on a line</b> works by evaporation: the water in the cloth turns to vapour and goes into the air.');

  q('water-matter', 'properties', 2, 'Which instrument would you use to measure the volume of a liquid accurately?',
    ['A measuring cylinder', 'A thermometer', 'A spring balance', 'A stopwatch'],
    'Look at what each instrument is marked in.',
    'A <b>measuring cylinder</b> is marked in millilitres and measures volume. A thermometer measures temperature, a spring balance measures force, and a stopwatch measures time.');
  q('water-matter', 'properties', 2, 'Which liquid is found in the bulb of many thermometers?',
    ['Mercury', 'Water', 'Oil', 'Petrol'],
    'It is a silvery liquid metal.',
    '<b>Mercury</b> or coloured alcohol is used, because it expands evenly as the temperature rises.');
  q('water-matter', 'properties', 2, 'Water boils at a temperature of ...',
    ['100 °C', '0 °C', '50 °C', '37 °C'],
    'It is the highest of these.',
    'Water boils at <b>100 °C</b> at sea level, and freezes at 0 °C.');
  q('water-matter', 'properties', 2, 'Water freezes at a temperature of ...',
    ['0 °C', '100 °C', '25 °C', '37 °C'],
    'It is the lowest of these.',
    'Water freezes at <b>0 °C</b>, the point at which liquid water becomes ice.');
  q('water-matter', 'properties', 3, 'Evaporation is fastest when the weather is ...',
    ['hot and windy', 'cold and still', 'cool and damp', 'wet and cloudy'],
    'Think of the best day to dry washing.',
    'Evaporation is fastest when it is <b>hot and windy</b>, because heat supplies energy and wind carries the vapour away.');
  q('water-matter', 'properties', 3, 'Give one way of conserving water at home.',
    ['Repair leaking taps', 'Leave taps running', 'Wash cars every day', 'Water plants at noon'],
    'Stop what is being wasted.',
    '<b>Repairing leaking taps</b> stops clean water running away for nothing, which saves a great deal over a year.');

  // ══ plants (9) ══════════════════════════════════════════════════════════
  q('plants', 'photosynthesis', 1, 'Which gas do plants take in to make their food?',
    ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Water vapour'],
    'It is the gas we breathe out.',
    'Plants take in <b>carbon dioxide</b> through their leaves and use it to make food.');
  q('plants', 'photosynthesis', 2, 'Apart from carbon dioxide, name one condition needed for photosynthesis.',
    ['Sunlight', 'Darkness', 'Strong wind', 'Cold air'],
    'The process needs energy.',
    '<b>Sunlight</b> supplies the energy, and water is also needed. The green chlorophyll traps the light.');
  q('plants', 'photosynthesis', 3, 'Give one difference between photosynthesis and respiration.',
    ['One makes food, one uses it', 'Both take place at night', 'Both give out oxygen', 'Neither needs any water'],
    'Think about which gas each one takes in.',
    'Photosynthesis makes food and takes in carbon dioxide; respiration uses food and takes in oxygen. <b>One makes food, the other uses it.</b>');
  q('plants', 'parts', 1, 'Which part of a plant takes water and minerals from the soil?',
    ['The root', 'The leaf', 'The flower', 'The fruit'],
    'It grows downwards.',
    '<b>The root</b> absorbs water and minerals, and also holds the plant firmly in the ground.');
  q('plants', 'parts', 2, 'Which part of a plant holds up the branches and leaves?',
    ['The stem', 'The root', 'The flower', 'The seed'],
    'It also carries water upwards.',
    '<b>The stem</b> supports the plant and carries water and food between the roots and the leaves.');
  q('plants', 'reproduction', 3, 'Why do many flowers produce sweet nectar?',
    ['To reward the insects that carry their pollen', 'To feed the seeds while they are growing', 'To stop the petals from drying out', 'To protect the flower against disease'],
    'Ask what the plant gets back in return.',
    'Nectar is a <b>reward</b>. Insects come for it and carry pollen from flower to flower as they go, so the plant spends energy making nectar because being pollinated is worth more to it.');
  q('plants', 'reproduction', 3, 'A flower is white, strongly scented, and opens only at night. Which is most likely to pollinate it?',
    ['A moth', 'A butterfly', 'A honey bee', 'The wind'],
    'Which of these is active after dark, and how would it find the flower?',
    'A <b>moth</b> flies at night and finds flowers by scent, so pale, strongly scented, night-opening flowers are usually moth-pollinated. Butterflies and bees fly by day, and wind-pollinated flowers have no scent and no bright petals at all.');
  q('plants', 'growth', 2, 'Which one of these is needed for a seed to germinate?',
    ['Water', 'Sunlight', 'Soil', 'Wind'],
    'A seed can germinate on damp cotton wool.',
    'A seed needs <b>water</b>, air and warmth to germinate. It does not need light or soil at first.');
  q('plants', 'growth', 3, 'A seed on dry cotton wool does not germinate. Which condition is missing?',
    ['Water', 'Air', 'Warmth', 'Space'],
    'Compare it with the damp one.',
    '<b>Water</b> is missing. Water softens the seed coat and starts the changes that make the seed grow.');

  // ══ conservation (5) ════════════════════════════════════════════════════
  q('conservation', 'pollution', 3, 'Which of these would best reduce soil erosion on a steep hillside?',
    ['Planting trees and grasses across the slope', 'Clearing the slope of all its vegetation', 'Digging channels straight down the slope', 'Covering the slope with loose dry sand'],
    'What holds soil in place, and what would make water run faster?',
    '<b>Roots bind the soil</b> and leaves break the force of the rain, so planting is the best protection. Clearing removes that hold, and channels running straight downhill make water flow faster, which carries away more soil.');
  q('conservation', 'deforestation', 2, 'Give one human activity that causes soil erosion.',
    ['Cutting down trees', 'Planting more grass', 'Building stone terraces', 'Digging drainage ditches'],
    'What removes the roots that hold the soil?',
    '<b>Cutting down trees</b> removes the roots that hold the soil, so rain washes it away.');
  q('conservation', 'deforestation', 3, 'How can soil erosion lead to flooding?',
    ['Soil washed into rivers blocks them', 'Soil makes the rain heavier', 'Soil stops the rivers flowing', 'Soil absorbs all the rain'],
    'Where does the washed-away soil end up?',
    'The soil is carried into rivers and <b>blocks them</b>, so the water cannot flow away and spills over the banks.');
  q('conservation', 'why_protect', 3, 'Give one way dense forest prevents soil erosion.',
    ['Roots hold the soil together', 'Leaves make the rain heavier', 'Trees push the soil downhill', 'Branches dry out the soil'],
    'Think about what is under the ground.',
    'Tree <b>roots hold the soil together</b>, and the leaves break the fall of the rain so it does not strike the ground hard.');
  q('conservation', 'recycling', 2, 'Which measure best prevents soil erosion on the slope of a hill?',
    ['Building terraces', 'Removing all plants', 'Ploughing straight down', 'Burning the grass'],
    'Slow the water down.',
    '<b>Building terraces</b> makes flat steps on the slope, so rainwater runs off slowly and carries less soil away.');

})();
