'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - B4 · Plant Nutrition  volume batch (63 questions)
//  IDs: g9s-b4-v001 through g9s-b4-v063
//  Source: NCE Science (Biology) 2021-2025; NCF Grades 7-9 §B4.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-b4-plant-nutrition';

const MCQ = [

  // ── photosynthesis (v001–v012) ─────────────────────────────────────────

  ['g9s-b4-v001', 'photosynthesis', 1,
   'In which organelle does photosynthesis take place in plant cells?',
   ['Chloroplast', 'Mitochondrion', 'Vacuole', 'Cell wall'],
   'Chloroplast',
   'It is the green organelle found in plant cells.',
   'Photosynthesis takes place in the chloroplasts, where the pigment chlorophyll captures light energy to drive the reaction.'],

  ['g9s-b4-v002', 'photosynthesis', 1,
   'Which two substances are the raw materials (reactants) for photosynthesis?',
   ['Carbon dioxide and water', 'Oxygen and glucose', 'Nitrogen and carbon dioxide', 'Water and starch'],
   'Carbon dioxide and water',
   'Think about what the plant takes in — from the air and from the soil.',
   'Plants absorb carbon dioxide from the air through their stomata and water from the soil through their roots — these are the two reactants for photosynthesis.'],

  ['g9s-b4-v003', 'photosynthesis', 1,
   'What are the two main products made during photosynthesis?',
   ['Glucose and oxygen', 'Carbon dioxide and water', 'Starch and carbon dioxide', 'Water and oxygen only'],
   'Glucose and oxygen',
   'One product stores energy; the other is a gas released into the air.',
   'Photosynthesis produces glucose (stored as chemical energy) and oxygen (released as a by-product through the stomata).'],

  ['g9s-b4-v004', 'photosynthesis', 2,
   'What is the role of chlorophyll during photosynthesis?',
   ['To absorb light energy to drive the reaction', 'To produce carbon dioxide for use in the leaf', 'To pump water upward from the roots to the leaf', 'To remove excess oxygen that builds up in the cell'],
   'To absorb light energy to drive the reaction',
   'It is a pigment — its job is to capture light.',
   'Chlorophyll is a green pigment that absorbs light energy (mainly red and blue wavelengths) and transfers it to drive the chemical reactions of photosynthesis.'],

  ['g9s-b4-v005', 'photosynthesis', 2,
   'Photosynthesis converts one form of energy into another. Which of the following correctly describes this conversion?',
   ['Light energy is converted into chemical energy stored in glucose', 'Chemical energy in glucose is converted into light energy in the leaf', 'Heat energy from the air is converted into glucose by the chloroplasts', 'Electrical energy from the soil is converted into light energy in the chloroplast'],
   'Light energy is converted into chemical energy stored in glucose',
   'Energy is captured from sunlight and locked away in a sugar molecule.',
   'Photosynthesis is an energy-conversion process: light energy absorbed by chlorophyll is used to build glucose molecules, storing the energy as chemical potential energy.'],

  ['g9s-b4-v006', 'photosynthesis', 2,
   'After photosynthesis, the glucose produced in a leaf can be used for which of the following?',
   ['Aerobic respiration to release energy for the plant', 'Breaking down carbon dioxide into carbon and oxygen', 'Absorbing mineral ions directly from the soil', 'Producing more chlorophyll without any additional energy'],
   'Aerobic respiration to release energy for the plant',
   'Glucose is a fuel — what do living things do with fuel?',
   'Plants use glucose as a respiratory substrate to release energy for growth and other life processes; they can also convert it to starch for storage or cellulose for cell walls.'],

  ['g9s-b4-v007', 'photosynthesis', 1,
   'Where does the carbon in the glucose produced during photosynthesis originally come from?',
   ['From carbon dioxide absorbed from the air', 'From minerals taken up by the roots from the soil', 'From the carbon atoms inside the chlorophyll molecule', 'From water molecules absorbed through the stomata'],
   'From carbon dioxide absorbed from the air',
   'Trace the carbon — where does CO₂ go once inside the leaf?',
   'CO₂ diffuses into the leaf through the stomata; during photosynthesis, its carbon atoms are incorporated into glucose molecules.'],

  ['g9s-b4-v008', 'photosynthesis', 2,
   'A plant is kept in the dark for 48 hours. What happens to its rate of photosynthesis?',
   ['Photosynthesis stops completely because there is no light energy', 'Photosynthesis slows slightly but continues using stored energy', 'Photosynthesis increases because darkness stimulates chlorophyll production', 'Photosynthesis continues unchanged using heat energy instead of light'],
   'Photosynthesis stops completely because there is no light energy',
   'Light is an essential requirement, not just an accelerator.',
   'Without light, chlorophyll cannot absorb energy, and the reactions of photosynthesis cannot proceed; the rate falls to zero in total darkness.'],

  ['g9s-b4-v009', 'photosynthesis', 2,
   'Why is glucose often converted to starch for storage in plant leaves rather than remaining as glucose?',
   ['Starch is insoluble, so it does not affect the osmotic balance of the cell', 'Glucose is too reactive and would damage the cell membrane over time', 'Starch releases more energy than glucose when broken down in respiration', 'Starch molecules are small enough to be transported easily in the phloem'],
   'Starch is insoluble, so it does not affect the osmotic balance of the cell',
   'Think about what would happen to the cell if a lot of soluble glucose built up inside it.',
   'Glucose is soluble and would raise the solute concentration inside the cell, causing water to enter by osmosis; starch is insoluble and has no osmotic effect, making it a safer long-term store.'],

  ['g9s-b4-v010', 'photosynthesis', 3,
   'A sealed transparent container holds a plant in bright light. After several hours, what would you expect to happen to the CO₂ concentration inside the container?',
   ['It falls, because the plant uses CO₂ faster than it produces it in the light', 'It rises, because plants release CO₂ during the day the same as at night', 'It stays the same, because photosynthesis and respiration always balance exactly', 'It falls to zero within minutes as the plant absorbs all available CO₂'],
   'It falls, because the plant uses CO₂ faster than it produces it in the light',
   'In bright light, which process dominates — photosynthesis or respiration?',
   'In bright light, the rate of photosynthesis exceeds the rate of respiration, so CO₂ is consumed faster than it is produced; the net result is a fall in CO₂ concentration inside the container.'],

  ['g9s-b4-v011', 'photosynthesis', 3,
   'A plant is placed in a sealed dark container. What would you expect to happen to the O₂ concentration over time?',
   ['It falls, because the plant consumes oxygen in respiration without replacing it by photosynthesis', 'It rises, because plants always produce oxygen regardless of light conditions', 'It stays the same, because dark conditions switch off all gas exchange completely', 'It rises sharply, because darkness triggers an increase in the rate of photosynthesis'],
   'It falls, because the plant consumes oxygen in respiration without replacing it by photosynthesis',
   'Plants respire continuously but only photosynthesise in light.',
   'All living cells, including plant cells, carry out aerobic respiration at all times and consume oxygen; in darkness, photosynthesis (which produces oxygen) stops, so the O₂ concentration falls.'],

  ['g9s-b4-v012', 'photosynthesis', 3,
   'Which of the following correctly explains why plants are described as producers in a food chain?',
   ['They manufacture their own food from inorganic materials using light energy', 'They produce oxygen, which all other organisms in the food chain require', 'They produce carbon dioxide that feeds the consumers higher in the chain', 'They manufacture food by breaking down organic material in the soil'],
   'They manufacture their own food from inorganic materials using light energy',
   'The word "produce" here refers to making food, not just releasing a gas.',
   'Producers are organisms that manufacture organic molecules (glucose) from inorganic raw materials (CO₂ and water) using an external energy source (sunlight); this is photosynthesis.'],

  // ── word_equation (v014–v023) ─────────────────────────────────────────

  ['g9s-b4-v014', 'word_equation', 1,
   'Which of the following correctly shows the word equation for photosynthesis?',
   ['carbon dioxide + water → glucose + oxygen',
    'oxygen + glucose → carbon dioxide + water',
    'water + oxygen → glucose + carbon dioxide',
    'glucose + carbon dioxide → water + oxygen'],
   'carbon dioxide + water → glucose + oxygen',
   'The reactants go before the arrow; the products go after it.',
   'Carbon dioxide and water are the reactants; glucose and oxygen are the products. This is the reverse of the word equation for aerobic respiration.'],

  ['g9s-b4-v015', 'word_equation', 1,
   'In the word equation for photosynthesis, which two substances appear as reactants on the left of the arrow?',
   ['Carbon dioxide and water', 'Glucose and oxygen', 'Oxygen and carbon dioxide', 'Water and glucose'],
   'Carbon dioxide and water',
   'These are the two substances the plant takes in.',
   'Carbon dioxide (taken in through the stomata) and water (taken up through the roots) are the two reactants in the photosynthesis equation.'],

  ['g9s-b4-v016', 'word_equation', 1,
   'In the word equation for photosynthesis, which two substances appear as products on the right of the arrow?',
   ['Glucose and oxygen', 'Carbon dioxide and water', 'Starch and carbon dioxide', 'Water and oxygen only'],
   'Glucose and oxygen',
   'These are the two substances the plant makes.',
   'Glucose (the energy-storing product) and oxygen (the gaseous by-product) are the two products shown on the right-hand side of the word equation.'],

  ['g9s-b4-v017', 'word_equation', 2,
   'Where does the oxygen that is released during photosynthesis come from?',
   ['From the splitting of water molecules during the reaction', 'From carbon dioxide that is broken apart by chlorophyll', 'From the breakdown of glucose molecules at the end of the reaction', 'From air spaces inside the leaf that already contained oxygen'],
   'From the splitting of water molecules during the reaction',
   'Look at the word equation — which reactant contains oxygen?',
   'Both water and CO₂ contain oxygen, but the oxygen gas released as a product comes specifically from the water molecules, which are split during the light-dependent stage of photosynthesis.'],

  ['g9s-b4-v018', 'word_equation', 2,
   'Two conditions must be written above the arrow in the word equation for photosynthesis. Which option correctly states both?',
   ['Light energy and chlorophyll', 'Carbon dioxide and water only', 'Glucose and oxygen in sunlight', 'Starch and water in darkness'],
   'Light energy and chlorophyll',
   'One is an energy source; the other is a pigment inside the leaf.',
   'Light energy (the energy source) and chlorophyll (the pigment that absorbs it) are the two conditions written above the arrow; without both, the reaction cannot proceed.'],

  ['g9s-b4-v019', 'word_equation', 2,
   'A student writes: glucose + oxygen → carbon dioxide + water. Which biological process does this equation represent?',
   ['Aerobic respiration, not photosynthesis', 'Photosynthesis in reverse, which is the same process', 'The light-independent stage of photosynthesis only', 'The process plants use to make glucose at night'],
   'Aerobic respiration, not photosynthesis',
   'Compare this equation with the word equation for photosynthesis.',
   'This is the word equation for aerobic respiration — photosynthesis is the exact reverse: carbon dioxide + water → glucose + oxygen. The two processes are opposite in their reactants, products and energy changes.'],

  ['g9s-b4-v020', 'word_equation', 2,
   'What is the role of water in the word equation for photosynthesis?',
   ['It is a reactant that provides hydrogen atoms used to build glucose', 'It is a product released as water vapour through the stomata only', 'It acts as the energy carrier that drives the whole reaction forward', 'It is absorbed from the air through the stomata and broken down'],
   'It is a reactant that provides hydrogen atoms used to build glucose',
   'Water is on the left side of the equation — so it is used up, not made.',
   'Water is split during photosynthesis; its hydrogen atoms are combined with carbon dioxide to form glucose. The oxygen atoms from water are released as O₂.'],

  ['g9s-b4-v021', 'word_equation', 2,
   'The arrow in the word equation for photosynthesis represents:',
   ['A chemical change in which reactants are converted into products', 'An equilibrium in which both forward and reverse reactions occur', 'The direction in which energy flows out of the reaction', 'The path taken by water molecules moving through the leaf'],
   'A chemical change in which reactants are converted into products',
   'Arrows in word equations show the direction of a chemical change.',
   'The arrow indicates that carbon dioxide and water (reactants) are chemically changed into glucose and oxygen (products); it is a one-way transformation, not a reversible equilibrium under normal conditions.'],

  ['g9s-b4-v022', 'word_equation', 3,
   'A student notices that the word equation for photosynthesis is the reverse of the word equation for aerobic respiration. What does this suggest about the relationship between the two processes?',
   ['Photosynthesis stores energy in glucose; respiration releases the same energy from glucose', 'Photosynthesis and respiration are the same chemical process running in different directions', 'Photosynthesis produces oxygen; respiration breaks down the same oxygen molecules', 'Respiration is faster than photosynthesis so the plant always has a surplus of CO₂'],
   'Photosynthesis stores energy in glucose; respiration releases the same energy from glucose',
   'One process builds glucose using energy; the other breaks it down to release energy.',
   'The two equations are mirror images: photosynthesis converts CO₂ and water into glucose and O₂, storing light energy; respiration converts glucose and O₂ back into CO₂ and water, releasing that stored energy.'],

  ['g9s-b4-v023', 'word_equation', 3,
   'Hydrogen is not mentioned in the word equation for photosynthesis, yet it plays an essential role. Which statement is correct?',
   ['Hydrogen comes from water; it is transferred to CO₂ to build glucose', 'Hydrogen comes from CO₂; it is combined with oxygen to form glucose', 'Hydrogen is produced by the plant as a waste gas alongside oxygen', 'Hydrogen atoms in chlorophyll are used up during every reaction cycle'],
   'Hydrogen comes from water; it is transferred to CO₂ to build glucose',
   'Water is H₂O — think about what happens when it is split.',
   'When water is split during photosynthesis, it releases hydrogen (and electrons); the hydrogen is combined with carbon dioxide to form the organic molecule glucose, while the leftover oxygen is released as O₂.'],

  // ── leaf_adaptation (v026–v036) ───────────────────────────────────────

  ['g9s-b4-v026', 'leaf_adaptation', 1,
   'Which layer of cells in a leaf contains the most chloroplasts and carries out the most photosynthesis?',
   ['The palisade mesophyll layer', 'The spongy mesophyll layer', 'The upper epidermis', 'The lower epidermis'],
   'The palisade mesophyll layer',
   'It is the layer of tall, tightly packed cells just below the upper surface.',
   'Palisade mesophyll cells are tall, columnar and densely packed with chloroplasts; their position near the upper surface maximises exposure to incoming light.'],

  ['g9s-b4-v027', 'leaf_adaptation', 1,
   'What is the main function of the stomata in a leaf?',
   ['To allow gases (CO₂ and O₂) to enter and leave the leaf', 'To support the leaf and keep it rigid in the wind', 'To absorb light energy directly for photosynthesis', 'To transport water from the stem to the blade of the leaf'],
   'To allow gases (CO₂ and O₂) to enter and leave the leaf',
   'They are tiny pores, mainly on the underside of a leaf.',
   'Stomata are pores surrounded by guard cells; they allow carbon dioxide to diffuse in for photosynthesis and oxygen to diffuse out, as well as controlling water vapour loss (transpiration).'],

  ['g9s-b4-v028', 'leaf_adaptation', 2,
   'Why are palisade mesophyll cells packed closely together near the upper surface of the leaf?',
   ['To maximise absorption of light entering from above', 'To allow carbon dioxide to diffuse easily between the cells', 'To prevent water loss through the upper surface of the leaf', 'To create a large surface area for water absorption from the air'],
   'To maximise absorption of light entering from above',
   'Think about where sunlight comes from and which layer it hits first.',
   'Palisade cells are positioned at the top of the leaf where light intensity is greatest; their tight packing and many chloroplasts ensure as much light as possible is absorbed before it can pass further down.'],

  ['g9s-b4-v029', 'leaf_adaptation', 2,
   'What is the function of the waxy cuticle on the upper surface of a leaf?',
   ['To reduce water loss by evaporation from the upper surface', 'To absorb more sunlight energy for photosynthesis to occur', 'To allow oxygen from the air to enter the leaf easily from above', 'To transport sugars produced in the leaf to the rest of the plant'],
   'To reduce water loss by evaporation from the upper surface',
   'The cuticle is waterproof — what problem does this solve?',
   'The waxy cuticle is a waterproof layer secreted by the epidermis; it greatly reduces the evaporation of water from the leaf surface, helping the plant conserve water.'],

  ['g9s-b4-v030', 'leaf_adaptation', 2,
   'Most stomata are found on the lower surface of a leaf rather than the upper surface. What is the main advantage of this?',
   ['The lower surface is cooler and shadier, reducing water loss through the pores', 'CO₂ is denser than air and sinks naturally to the lower surface of the leaf', 'The lower surface receives more direct sunlight to keep the stomata open', 'Water vapour produced in photosynthesis rises and exits from the lower surface'],
   'The lower surface is cooler and shadier, reducing water loss through the pores',
   'Less heat and direct light means less water vapour escapes through the stomata.',
   'The lower surface is shaded from direct sunlight; it is therefore cooler and the air immediately above it is more humid, both of which reduce the rate of water loss through the stomata compared with the upper surface.'],

  ['g9s-b4-v031', 'leaf_adaptation', 1,
   'What is the main function of the veins (vascular bundles) in a leaf?',
   ['To supply water and remove the glucose produced by photosynthesis', 'To provide the main location where photosynthesis happens in the leaf', 'To control the opening and closing of the stomata on the leaf surface', 'To absorb carbon dioxide from the surrounding air into the leaf cells'],
   'To supply water and remove the glucose produced by photosynthesis',
   'Veins contain xylem and phloem — one carries water in, the other sugars out.',
   'Xylem in the veins delivers water to photosynthesising cells; phloem transports the glucose (as sucrose) away from the leaf to other parts of the plant.'],

  ['g9s-b4-v032', 'leaf_adaptation', 2,
   'The spongy mesophyll layer contains large air spaces between its cells. What is the main advantage of these air spaces?',
   ['They allow CO₂ and O₂ to diffuse quickly to all photosynthesising cells', 'They store extra glucose produced during periods of high photosynthesis', 'They trap heat inside the leaf and speed up the enzyme-controlled reactions', 'They prevent the oxygen produced in the palisade layer from escaping'],
   'They allow CO₂ and O₂ to diffuse quickly to all photosynthesising cells',
   'Air spaces increase surface area and shorten diffusion distances.',
   'The interconnected air spaces create a large internal surface area and allow gases to diffuse rapidly from the stomata to every cell in the leaf without having to pass through many layers of cells.'],

  ['g9s-b4-v033', 'leaf_adaptation', 3,
   'A leaf has a large surface area and is very thin. How do both of these features help it photosynthesise efficiently?',
   ['A large area captures more light; being thin shortens the diffusion distance for gases', 'A large area absorbs more water; being thin allows more chloroplasts per unit volume', 'A large area provides more stomata; being thin allows the leaf to track the sun', 'A large area reduces water loss; being thin slows the movement of gases inward'],
   'A large area captures more light; being thin shortens the diffusion distance for gases',
   'Think about two separate advantages — one for light, one for gas diffusion.',
   'A broad, flat shape intercepts more sunlight; a thin blade means CO₂ and O₂ only have to diffuse a short distance between the stomata and the photosynthesising cells inside.'],

  ['g9s-b4-v034', 'leaf_adaptation', 3,
   'Guard cells become turgid in bright light and cause the stomata to open. Why is this advantageous for photosynthesis during the day?',
   ['Open stomata allow more CO₂ to enter the leaf, increasing the rate of photosynthesis', 'Open stomata allow more O₂ to enter the leaf, which is needed as a reactant', 'Open stomata reduce water loss by allowing water vapour to condense at the pore', 'Open stomata allow light to pass directly to the chloroplasts of palisade cells'],
   'Open stomata allow more CO₂ to enter the leaf, increasing the rate of photosynthesis',
   'CO₂ is a reactant — the more that enters, the faster photosynthesis can proceed.',
   'When stomata are open, CO₂ from the air can diffuse down its concentration gradient into the leaf; in bright light, photosynthesis is rapid and CO₂ inside the leaf is low, so a large concentration gradient exists, driving more CO₂ inward.'],

  ['g9s-b4-v035', 'leaf_adaptation', 2,
   'Why does a leaf appear green to the human eye?',
   ['Chlorophyll absorbs red and blue light but reflects green light back', 'Chlorophyll absorbs green light and reflects red and blue light back', 'The cell walls contain a green pigment that reflects all wavelengths equally', 'Water stored in the vacuoles of the cells scatters green light outward'],
   'Chlorophyll absorbs red and blue light but reflects green light back',
   'The colour we see is the wavelength that is NOT absorbed.',
   'Chlorophyll has peak absorption in the red and blue regions of the visible spectrum; green wavelengths are mostly reflected, so the leaf appears green.'],

  ['g9s-b4-v036', 'leaf_adaptation', 3,
   'Which structural feature of a palisade mesophyll cell makes it particularly well-suited for carrying out photosynthesis?',
   ['Its tall, columnar shape allows many chloroplasts to be stacked along its length', 'Its very thin cell wall allows light to pass through without any absorption', 'Its large central vacuole stores the chlorophyll needed for light absorption', 'Its position next to a stoma provides direct access to CO₂ from the air outside'],
   'Its tall, columnar shape allows many chloroplasts to be stacked along its length',
   'Think about how shape relates to the number of chloroplasts a cell can hold.',
   'The tall column shape maximises the volume of cytoplasm available for chloroplasts; a single palisade cell can contain 50 or more chloroplasts, all oriented to intercept light entering from above.'],

  // ── factors_for_photosynthesis (v039–v048) ────────────────────────────

  ['g9s-b4-v039', 'factors_for_photosynthesis', 1,
   'Which of the following is NOT a factor that plants need for photosynthesis?',
   ['Oxygen from the surrounding air', 'Carbon dioxide from the atmosphere', 'Water absorbed from the soil', 'Light energy from the sun'],
   'Oxygen from the surrounding air',
   'Oxygen is a product of photosynthesis, not a reactant.',
   'Carbon dioxide, water, and light energy are all required for photosynthesis; oxygen is a product of the reaction and does not need to be taken in.'],

  ['g9s-b4-v040', 'factors_for_photosynthesis', 1,
   'What name is given to a factor that is in shortest supply and therefore controls the rate of photosynthesis?',
   ['The limiting factor', 'The rate-determining factor', 'The inhibiting substance', 'The threshold variable'],
   'The limiting factor',
   'It is the factor that is "holding back" the rate.',
   'A limiting factor is the factor present in the smallest amount relative to the plant\'s needs; increasing it will raise the rate of photosynthesis, while increasing any other factor will have no effect until the limiting factor is supplied.'],

  ['g9s-b4-v041', 'factors_for_photosynthesis', 2,
   'A plant receives plenty of water and carbon dioxide but is kept in dim light. What is most likely limiting its rate of photosynthesis?',
   ['Light intensity, because light energy is needed to drive the reaction', 'Carbon dioxide concentration, because CO₂ levels are always the lowest', 'Water availability, because water is the first factor to run short', 'Temperature, because dim light means the leaf is also cold'],
   'Light intensity, because light energy is needed to drive the reaction',
   'If two factors are adequate but one is scarce, the scarce one is limiting.',
   'When CO₂ and water are plentiful, the factor that controls the rate is the one in shortest supply — in dim light, that is light intensity.'],

  ['g9s-b4-v042', 'factors_for_photosynthesis', 2,
   'As carbon dioxide concentration increases (with light and water constant), the rate of photosynthesis:',
   ['Increases up to a point, then levels off as another factor becomes limiting', 'Increases steadily without any upper limit as long as CO₂ keeps rising', 'Decreases because high CO₂ concentrations are toxic to the chloroplasts', 'Stays unchanged because CO₂ concentration never limits photosynthesis'],
   'Increases up to a point, then levels off as another factor becomes limiting',
   'No factor can increase the rate indefinitely — what happens when CO₂ is no longer limiting?',
   'Increasing CO₂ raises the rate until a different factor (such as light intensity or temperature) becomes the new limiting factor; the graph then plateaus.'],

  ['g9s-b4-v043', 'factors_for_photosynthesis', 2,
   'A graph of rate of photosynthesis against light intensity shows the rate levelling off at high intensities. What does the plateau indicate?',
   ['Another factor such as CO₂ concentration or temperature is now limiting the rate', 'Light is no longer needed once the rate reaches its maximum possible value', 'The chloroplasts are being destroyed by excessively bright light', 'The plant has produced all the glucose it can store and stops photosynthesising'],
   'Another factor such as CO₂ concentration or temperature is now limiting the rate',
   'Something must be holding the rate back even when light is no longer scarce.',
   'Once light is no longer limiting, a different factor (CO₂ concentration or temperature) becomes the bottleneck; increasing light intensity further has no additional effect.'],

  ['g9s-b4-v044', 'factors_for_photosynthesis', 3,
   'A tomato grower pumps extra CO₂ gas into a greenhouse lit with strong lamps. Why does this increase the yield of tomatoes?',
   ['More CO₂ raises the rate of photosynthesis, producing more glucose for growth and fruit', 'Extra CO₂ lowers the temperature inside the greenhouse, speeding up all reactions', 'CO₂ acts as a soil fertiliser that is absorbed through the roots to feed the plant', 'More CO₂ displaces excess oxygen, which would otherwise slow down photosynthesis'],
   'More CO₂ raises the rate of photosynthesis, producing more glucose for growth and fruit',
   'CO₂ is a reactant — more of it means more product can be made.',
   'With strong light provided, CO₂ concentration is the limiting factor; adding extra CO₂ removes that limit, increasing the rate of photosynthesis, the production of glucose, and ultimately the yield of fruit.'],

  ['g9s-b4-v045', 'factors_for_photosynthesis', 2,
   'At which temperature would the rate of photosynthesis generally be higher, and why?',
   ['30 °C, because enzymes controlling photosynthesis work faster at higher temperatures (up to their optimum)', '10 °C, because cold temperatures reduce water loss and keep stomata open longer', '30 °C, because heat provides the activation energy that directly splits water molecules', '10 °C, because photosynthesis does not involve enzymes and benefits from stable conditions'],
   '30 °C, because enzymes controlling photosynthesis work faster at higher temperatures (up to their optimum)',
   'Photosynthesis is controlled by enzymes — how does temperature affect enzymes?',
   'The reactions of photosynthesis are enzyme-controlled; as temperature rises toward the enzyme\'s optimum (typically around 30–40 °C for many plants), the rate of enzyme activity — and therefore photosynthesis — increases.'],

  ['g9s-b4-v046', 'factors_for_photosynthesis', 3,
   'At very high temperatures, the rate of photosynthesis falls sharply even if light and CO₂ are plentiful. What is the best explanation?',
   ['Enzymes controlling the reactions are denatured and lose their shape permanently', 'Light energy is converted to heat rather than being absorbed by chlorophyll', 'The stomata close in extreme heat, preventing CO₂ from leaving, not entering', 'Water molecules are broken apart too quickly, producing excess oxygen that is harmful'],
   'Enzymes controlling the reactions are denatured and lose their shape permanently',
   'What happens to enzyme molecules at temperatures far above their optimum?',
   'At very high temperatures the active sites of photosynthetic enzymes are permanently denatured; they can no longer bind their substrates and the reaction stops, explaining the sharp fall in rate.'],

  ['g9s-b4-v047', 'factors_for_photosynthesis', 3,
   'In an experiment, a plant photosynthesises at 20 units per hour under standard conditions. When CO₂ concentration is doubled while keeping light and temperature constant, the rate rises to 36 units per hour. When light intensity is then also doubled, the rate rises to 70 units per hour. What can be concluded?',
   ['Under the original conditions, both CO₂ and light were limiting factors', 'Under the original conditions, neither CO₂ nor light was a limiting factor', 'Under the original conditions, only temperature was the limiting factor', 'Under the original conditions, CO₂ was not limiting but light was the only limit'],
   'Under the original conditions, both CO₂ and light were limiting factors',
   'If increasing each factor separately raises the rate, both must have been limiting.',
   'Both CO₂ and light intensity increased the rate when raised, which means both were in short supply (limiting) under the original conditions; when one was increased, the other still held the rate back until it too was increased.'],

  ['g9s-b4-v048', 'factors_for_photosynthesis', 1,
   'Through which organ does a plant absorb the water needed as a raw material for photosynthesis?',
   ['The roots', 'The stomata', 'The leaves', 'The stem'],
   'The roots',
   'Water is taken from the soil — which structure is in the soil?',
   'Water is absorbed from the soil by root hair cells (by osmosis) and transported up the stem in xylem vessels to the leaves, where it is used in photosynthesis.'],

  // ── photosynthesis_experiments (v051–v062) ────────────────────────────

  ['g9s-b4-v051', 'photosynthesis_experiments', 1,
   'Which reagent is used to test a leaf for the presence of starch?',
   ['Iodine solution', 'Benedict\'s solution', 'Biuret reagent', 'Lime water'],
   'Iodine solution',
   'It is the yellow-brown liquid used in the starch test.',
   'Iodine solution (iodine dissolved in potassium iodide) turns blue-black in the presence of starch; in its absence it remains orange-brown.'],

  ['g9s-b4-v052', 'photosynthesis_experiments', 1,
   'What colour change shows that starch IS present when iodine solution is added to a leaf?',
   ['Blue-black', 'Orange-brown', 'Pale yellow to green', 'Red to purple'],
   'Blue-black',
   'The colour is distinctive — it looks almost black.',
   'When iodine solution contacts starch, it forms a blue-black complex; a leaf containing starch will turn blue-black, while a leaf with no starch leaves the iodine orange-brown.'],

  ['g9s-b4-v053', 'photosynthesis_experiments', 2,
   'In the leaf starch test, a leaf is boiled in ethanol after first being placed in boiling water. What is the purpose of the ethanol stage?',
   ['To remove the green chlorophyll so the iodine colour change can be seen clearly', 'To kill the leaf cells so that all the starch breaks down completely', 'To dissolve the starch out of the leaf before the iodine is applied', 'To make the leaf cells more permeable to the iodine solution'],
   'To remove the green chlorophyll so the iodine colour change can be seen clearly',
   'The green colour would mask the blue-black of the iodine test.',
   'Ethanol dissolves chlorophyll, turning the leaf white or cream; this allows the blue-black (starch present) or orange-brown (no starch) colour to be seen clearly when iodine solution is added.'],

  ['g9s-b4-v054', 'photosynthesis_experiments', 2,
   'Why must a plant be destarched before carrying out a photosynthesis experiment?',
   ['So any starch found at the end must have been made during the experiment', 'So the plant can carry out photosynthesis faster at the start of the experiment', 'So iodine solution can penetrate the leaf more quickly during testing', 'So the experiment will show whether the leaf can absorb water from the air'],
   'So any starch found at the end must have been made during the experiment',
   'If starch is already there at the start, how do you know when it was made?',
   'Destarching removes all starch from the leaves before the experiment begins; any starch detected afterwards must have been produced during the experiment, making the results valid.'],

  ['g9s-b4-v055', 'photosynthesis_experiments', 2,
   'How is a plant destarched before an experiment?',
   ['By keeping it in the dark for 24–48 hours so it uses up all stored starch', 'By watering it with warm water until the starch dissolves and drains away', 'By removing all the leaves and replacing them with freshly grown leaves', 'By placing it under very bright light until its starch stores are converted to glucose'],
   'By keeping it in the dark for 24–48 hours so it uses up all stored starch',
   'In the dark, photosynthesis stops; the plant uses its starch stores for respiration.',
   'Without light, the plant cannot photosynthesise; any existing starch is broken down and used in respiration; after 24–48 hours in the dark, the starch stores in the leaves are depleted.'],

  ['g9s-b4-v056', 'photosynthesis_experiments', 2,
   'A destarched plant is set up with one leaf covered by black paper and another leaf left in the light. After 6 hours both leaves are tested with iodine. What result would confirm that light is needed for photosynthesis?',
   ['Covered leaf: orange-brown; exposed leaf: blue-black', 'Both leaves: blue-black (starch present in both)', 'Exposed leaf: orange-brown; covered leaf: blue-black', 'Both leaves: orange-brown (no starch in either)'],
   'Covered leaf: orange-brown; exposed leaf: blue-black',
   'Starch is a product of photosynthesis — where would it appear?',
   'The covered leaf had no light and therefore could not photosynthesise, so no starch formed (orange-brown); the exposed leaf received light, photosynthesised, and produced starch (blue-black). This shows light is essential.'],

  ['g9s-b4-v057', 'photosynthesis_experiments', 2,
   'A variegated leaf has green and white (non-green) regions. After being destarched and left in the light, then tested with iodine, which result is expected?',
   ['Only the green regions turn blue-black because they contain chlorophyll', 'Only the white regions turn blue-black because they absorb more light energy', 'Both regions turn blue-black because all leaf cells can carry out photosynthesis', 'Neither region turns blue-black because variegated leaves cannot photosynthesise'],
   'Only the green regions turn blue-black because they contain chlorophyll',
   'Chlorophyll is needed for photosynthesis — which parts of the leaf have it?',
   'Green regions contain chlorophyll and can photosynthesise; white (etiolated) regions lack chlorophyll and cannot make starch even in bright light. Only the green parts turn blue-black with iodine.'],

  ['g9s-b4-v058', 'photosynthesis_experiments', 3,
   'In the variegated leaf experiment, what conclusion is drawn from the fact that only the green regions turn blue-black with iodine?',
   ['Chlorophyll is essential for photosynthesis to take place', 'Light intensity is the most important factor for photosynthesis', 'Starch is produced in the white regions and moves to the green parts', 'Iodine only reacts with the pigment present in green leaf cells'],
   'Chlorophyll is essential for photosynthesis to take place',
   'The only difference between the green and white regions is the presence of chlorophyll.',
   'The green and white regions of a variegated leaf receive the same light, CO₂ and water; only the green parts make starch, and the only difference is that they contain chlorophyll. Therefore, chlorophyll is essential for photosynthesis.'],

  ['g9s-b4-v059', 'photosynthesis_experiments', 2,
   'An Elodea (pondweed) plant is placed in water and illuminated. Bubbles of gas are seen rising from the cut stem. What gas is in these bubbles?',
   ['Oxygen, produced as a by-product of photosynthesis', 'Carbon dioxide, released by the plant during respiration', 'Water vapour evaporating from the cut surface of the stem', 'Nitrogen released from the water as light warms the container'],
   'Oxygen, produced as a by-product of photosynthesis',
   'Photosynthesis releases a gas — which one?',
   'During photosynthesis, water is split and oxygen is released; the O₂ dissolves in the surrounding water and also escapes as bubbles from the cut stem — counting bubbles gives an indirect measure of the rate of photosynthesis.'],

  ['g9s-b4-v060', 'photosynthesis_experiments', 3,
   'A student measures the number of oxygen bubbles produced by Elodea per minute at distances of 10 cm, 20 cm, 30 cm and 40 cm from a lamp. What pattern of results should the student expect?',
   ['More bubbles per minute at 10 cm than at 40 cm, because the light is more intense', 'More bubbles per minute at 40 cm than at 10 cm, as the plant avoids being overheated', 'The same bubble count at all distances, because distance does not affect light intensity', 'Fewer bubbles at 10 cm than at 20 cm, because high intensity damages the chloroplasts'],
   'More bubbles per minute at 10 cm than at 40 cm, because the light is more intense',
   'Light intensity falls as distance from the source increases.',
   'Light intensity decreases with distance from the lamp (roughly following an inverse-square relationship); higher light intensity drives faster photosynthesis, producing more O₂ and more bubbles per minute.'],

  ['g9s-b4-v061', 'photosynthesis_experiments', 3,
   'Even when the lamp is moved very close to the Elodea, the bubble count stops increasing beyond a certain rate. What is the most likely explanation?',
   ['Another factor, such as CO₂ concentration, has become the new limiting factor', 'The Elodea has used up all the oxygen available in the water around it', 'The heat from the close lamp has denatured the plant\'s chlorophyll permanently', 'Bubbles are dissolving back into the water at exactly the same rate as they form'],
   'Another factor, such as CO₂ concentration, has become the new limiting factor',
   'Once light is no longer limiting, what else could hold the rate back?',
   'When the rate levels off despite further increases in light intensity, a different factor has become limiting; in an aquarium with no added CO₂, it is most likely the low CO₂ concentration of the water.'],

  ['g9s-b4-v062', 'photosynthesis_experiments', 2,
   'In an experiment to show that CO₂ is needed for photosynthesis, sodium hydroxide solution is placed alongside a destarched plant in a sealed transparent container. What is the role of the sodium hydroxide?',
   ['It absorbs CO₂ from the air inside, depriving the plant of carbon dioxide', 'It releases extra CO₂ into the air to increase the rate of photosynthesis', 'It acts as an indicator that changes colour when photosynthesis takes place', 'It absorbs the oxygen produced by the plant, preventing any build-up inside'],
   'It absorbs CO₂ from the air inside, depriving the plant of carbon dioxide',
   'NaOH is a CO₂ absorber — it reacts with CO₂ to remove it from the air.',
   'Sodium hydroxide reacts with CO₂ (CO₂ + 2NaOH → Na₂CO₃ + H₂O), removing it from the enclosed air; if the leaf cannot photosynthesise without CO₂, it will produce no starch despite adequate light, proving CO₂ is essential.'],

];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const SHORT = [

  // ── photosynthesis (v013) ─────────────────────────────────────────────
  ['g9s-b4-v013', 'photosynthesis', 1,
   'Name the green pigment found in chloroplasts that absorbs light energy for photosynthesis.',
   'Chlorophyll', ['chlorophyl', 'the chlorophyll'],
   'It gives plants their green colour.',
   'Chlorophyll is the green pigment in chloroplasts that absorbs light energy (mainly red and blue wavelengths) to power the reactions of photosynthesis.'],

  // ── word_equation (v024–v025) ─────────────────────────────────────────
  ['g9s-b4-v024', 'word_equation', 1,
   'Complete the word equation for photosynthesis: carbon dioxide + water → _____ + _____',
   'glucose + oxygen', ['oxygen + glucose', 'glucose and oxygen', 'oxygen and glucose'],
   'One product stores energy; the other is a gas.',
   'Carbon dioxide and water are the reactants; glucose and oxygen are the two products of photosynthesis.'],

  ['g9s-b4-v025', 'word_equation', 2,
   'Other than light energy, name the condition written above the arrow in the word equation for photosynthesis.',
   'Chlorophyll', ['chlorophyl', 'the chlorophyll'],
   'It is the green substance inside the chloroplasts.',
   'The two conditions written above the arrow are light energy and chlorophyll; both are required for the reaction to proceed.'],

  // ── leaf_adaptation (v037–v038) ───────────────────────────────────────
  ['g9s-b4-v037', 'leaf_adaptation', 1,
   'Name the cells that surround each stoma and control its opening and closing.',
   'Guard cells', ['guard cell', 'the guard cells'],
   'They change shape when they absorb or lose water.',
   'Guard cells are kidney-shaped cells that flank each stoma; when they absorb water and become turgid, the stoma opens; when they lose water, it closes.'],

  ['g9s-b4-v038', 'leaf_adaptation', 1,
   'Name the layer of tall, column-shaped cells packed near the upper surface of a leaf that contains the most chloroplasts.',
   'Palisade mesophyll', ['palisade layer', 'palisade cells', 'palisade mesophyll layer', 'palisade mesophyll cells'],
   'It is positioned directly below the upper epidermis.',
   'The palisade mesophyll is a layer of elongated cells densely packed with chloroplasts just beneath the upper epidermis, where light intensity is highest.'],

  // ── factors_for_photosynthesis (v049–v050) ────────────────────────────
  ['g9s-b4-v049', 'factors_for_photosynthesis', 2,
   'State one factor, other than light intensity, that can act as a limiting factor for the rate of photosynthesis.',
   'Carbon dioxide concentration', ['CO₂ concentration', 'temperature', 'water', 'carbon dioxide', 'CO2 concentration'],
   'Think about the other requirements for photosynthesis.',
   'Carbon dioxide concentration, temperature and water availability can all limit the rate of photosynthesis; increasing any one of them (when it is the limiting factor) will increase the rate.'],

  ['g9s-b4-v050', 'factors_for_photosynthesis', 1,
   'What term is used for the factor that is present in the smallest amount relative to what is needed, and therefore controls the rate of photosynthesis?',
   'Limiting factor', ['the limiting factor', 'limiting factors'],
   'It is the factor "holding back" the rate.',
   'The limiting factor is the one in shortest supply; increasing it will raise the rate of photosynthesis, whereas increasing any other factor has no effect until the limiting factor is no longer limiting.'],

  // ── photosynthesis_experiments (v063) ────────────────────────────────
  ['g9s-b4-v063', 'photosynthesis_experiments', 2,
   'In the leaf starch test, why is the leaf first placed in boiling water before being transferred to ethanol?',
   'To kill the cells and soften the leaf so the ethanol can extract the chlorophyll',
   ['to kill the cells', 'to soften the leaf', 'to stop enzyme activity', 'to break down the cell membranes', 'to make the leaf softer'],
   'Think about what the boiling water does to living cells.',
   'Boiling water kills the cells and breaks down cell membranes, softening the leaf so that ethanol can penetrate easily and dissolve all the chlorophyll; it also stops enzymatic breakdown of starch.'],

];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
