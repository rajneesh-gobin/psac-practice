'use strict';
(function () {

// Grade 3 SSEE — Unit 3: Our Natural Environment
// Source: MIE SSEE Grade 3 Part 1 pp.65-92
// IDs: g3ssee-nat-001 onwards

// ── plants (001-030) ──────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g3ssee-nat-001', chapterId:'g3ssee-natural', difficulty:1, subsection:'plants',
    question:'Which part of a plant takes in water and minerals from the soil?',
    options:['Roots','Leaves','Flowers','Fruit'],
    answer:'Roots',
    hint:'This part is underground.',
    explanation:'<b>Roots</b> are found underground. They anchor the plant in the soil and absorb water and minerals needed for growth.' }),

  makeMCQ({ id:'g3ssee-nat-002', chapterId:'g3ssee-natural', difficulty:1, subsection:'plants',
    question:'Which part of a plant uses sunlight to make food?',
    options:['Leaves','Roots','Stem','Fruit'],
    answer:'Leaves',
    hint:'This part is green and flat, and faces the sun.',
    explanation:'<b>Leaves</b> contain a green substance called chlorophyll that captures sunlight. Leaves use sunlight, water and carbon dioxide to make food through photosynthesis.' }),

  makeMCQ({ id:'g3ssee-nat-003', chapterId:'g3ssee-natural', difficulty:1, subsection:'plants',
    question:'What is the main function of the STEM of a plant?',
    options:['To hold the plant up and carry water','To take water in from the soil surface','To attract insects to the plant flowers','To store the seeds until they drop'],
    answer:'To hold the plant up and carry water',
    hint:'The stem is like a highway for water transport.',
    explanation:'The <b>stem</b> holds the plant upright and works as a transport highway, carrying water and minerals from the roots up to the leaves. Roots take in water, flowers attract insects and fruits hold the seeds.'}),

  makeTF({ id:'g3ssee-nat-004', chapterId:'g3ssee-natural', difficulty:1, subsection:'plants',
    question:'Flowers help plants to reproduce by producing seeds.',
    answer:true,
    explanation:'Yes! <b>Flowers</b> are the reproductive parts of a plant. After pollination, flowers form fruit containing seeds that grow into new plants.' }),

  makeMCQ({ id:'g3ssee-nat-005', chapterId:'g3ssee-natural', difficulty:1, subsection:'plants',
    question:'Which part of a plant contains seeds?',
    options:['Fruit','Stem','Root','Leaf'],
    answer:'Fruit',
    hint:'Think about what is inside a mango or papaya.',
    explanation:'The <b>fruit</b> of a plant contains seeds. When the fruit is eaten or falls to the ground, seeds can grow into new plants.' }),

  makeMCQ({ id:'g3ssee-nat-006', chapterId:'g3ssee-natural', difficulty:2, subsection:'plants',
    question:'What do plants need to make their own food through photosynthesis?',
    options:['Sunlight, water and carbon dioxide','Sunlight, water and salty seawater','Moonlight, water and oxygen gas','Darkness, sand and carbon dioxide'],
    answer:'Sunlight, water and carbon dioxide',
    hint:'Plants are like factories that need three raw materials.',
    explanation:'Plants make their own food using <b>sunlight</b>, <b>water</b> from the soil and <b>carbon dioxide</b> from the air. Moonlight, darkness and seawater cannot drive photosynthesis.'}),

  makeMCQ({ id:'g3ssee-nat-007', chapterId:'g3ssee-natural', difficulty:1, subsection:'plants',
    question:'Which gas do plants release during photosynthesis that humans breathe?',
    options:['Oxygen','Hydrogen','Nitrogen','Helium'],
    answer:'Oxygen',
    explanation:'During photosynthesis plants release <b>oxygen</b> into the air, and humans and animals breathe it to stay alive. Hydrogen, nitrogen and helium are not released by leaves.'}),

  makeMCQ({ id:'g3ssee-nat-008', chapterId:'g3ssee-natural', difficulty:2, subsection:'plants',
    question:'A mango tree is an example of a ___ plant.',
    options:['flowering','non-flowering','aquatic','parasitic'],
    answer:'flowering',
    hint:'Does a mango tree produce flowers and fruit?',
    explanation:'A mango tree is a <b>flowering plant</b> — it produces flowers that become fruit (mangoes) containing seeds.' }),

  makeTF({ id:'g3ssee-nat-009', chapterId:'g3ssee-natural', difficulty:1, subsection:'plants',
    question:'All plants need sunlight to grow properly.',
    answer:true,
    explanation:'Yes! All plants need <b>sunlight</b> (or artificial light) to carry out photosynthesis and make food to survive and grow.' }),

  makeMCQ({ id:'g3ssee-nat-010', chapterId:'g3ssee-natural', difficulty:2, subsection:'plants',
    question:'The sugarcane plant is very important in Mauritius. What part of it is harvested for sugar?',
    options:['The stem','The roots','The leaves','The flowers'],
    answer:'The stem',
    hint:'Sugar is extracted from the juice inside the thick stalk.',
    explanation:'The <b>stem</b> of the sugarcane plant is harvested. Its juice contains sugar that is extracted to make sugar products.' }),

  makeMCQ({ id:'g3ssee-nat-011', chapterId:'g3ssee-natural', difficulty:2, subsection:'plants',
    question:'What is the process by which seeds are scattered away from the parent plant?',
    options:['Seed dispersal','Photosynthesis','Pollination','Germination'],
    answer:'Seed dispersal',
    hint:'Seeds need to move away from the parent plant to find space to grow.',
    explanation:'<b>Seed dispersal</b> is the process by which seeds are spread away from the parent plant by wind, water, animals or explosion.' }),

  makeMCQ({ id:'g3ssee-nat-012', chapterId:'g3ssee-natural', difficulty:1, subsection:'plants',
    question:'Which of the following is a plant that is native to Mauritius?',
    options:['Trochetia boutoniana','Yellow garden sunflower','Red climbing rose bush','Spiky desert cactus'],
    answer:'Trochetia boutoniana',
    hint:'The national flower of Mauritius.',
    explanation:'The <b>Trochetia boutoniana</b>, also called "bouton d\'or", is the national flower of Mauritius and grows naturally nowhere else. Sunflowers, roses and cacti were all brought here from other countries.'}),

  makeMCQ({ id:'g3ssee-nat-013', chapterId:'g3ssee-natural', difficulty:2, subsection:'plants',
    question:'Why is it important to protect the forests of Mauritius such as the Black River Gorges?',
    options:['They are home to rare native species','They produce sugar for export','They are a source of electricity','They are where buses park at night'],
    answer:'They are home to rare native species',
    explanation:'Forests like the Black River Gorges shelter rare <b>endemic</b> plants and animals found nowhere else on Earth. They do not grow sugar, make electricity or park buses.'}),

  makeTF({ id:'g3ssee-nat-014', chapterId:'g3ssee-natural', difficulty:1, subsection:'plants',
    question:'Cutting down all trees in a forest has no effect on the environment.',
    answer:false,
    explanation:'Cutting down all trees is very harmful. It destroys <b>habitats</b>, causes soil erosion and reduces oxygen production.' }),

  makeMCQ({ id:'g3ssee-nat-015', chapterId:'g3ssee-natural', difficulty:3, subsection:'plants',
    question:'A plant is placed in a dark cupboard for several days. What will most likely happen?',
    options:['It will turn yellow and slowly die','It will grow much faster than usual','It will produce many more flowers','It will stay exactly as it is now'],
    answer:'It will turn yellow and slowly die',
    hint:'Think about what plants need to make food.',
    explanation:'Without sunlight a plant cannot photosynthesise to make food. Its chlorophyll breaks down, the leaves turn <b>yellow</b> and in the end the plant dies. Darkness never speeds up growth or flowering.'}),

// ── animals (016-045) ──────────────────────────────────────────────────────

  makeMCQ({ id:'g3ssee-nat-016', chapterId:'g3ssee-natural', difficulty:1, subsection:'animals',
    question:'The Dodo was a bird that lived only in Mauritius. What happened to the dodo?',
    options:['It became extinct','It flew to Africa','It moved to the sea','It lives in zoos today'],
    answer:'It became extinct',
    hint:'The dodo was last seen in the 17th century.',
    explanation:'The <b>dodo became extinct</b> around 1681, mainly because of hunting by sailors and the introduction of predators such as rats and dogs.' }),

  makeMCQ({ id:'g3ssee-nat-017', chapterId:'g3ssee-natural', difficulty:1, subsection:'animals',
    question:'Which of the following is a native bird of Mauritius that is now endangered?',
    options:['Pink pigeon','Grey parrot','Common crow','Grey ostrich'],
    answer:'Pink pigeon',
    hint:'This beautiful bird is still alive but at risk.',
    explanation:'The <b>pink pigeon</b> (pigeon rose) is a native Mauritian bird that came close to extinction and is still endangered. Parrots, crows and ostriches are not native Mauritian birds.'}),

  makeTF({ id:'g3ssee-nat-018', chapterId:'g3ssee-natural', difficulty:1, subsection:'animals',
    question:'Animals with a backbone are called vertebrates.',
    answer:true,
    explanation:'Yes! Animals with a backbone (spine) are called <b>vertebrates</b>. Examples include fish, frogs, birds, reptiles and mammals.' }),

  makeMCQ({ id:'g3ssee-nat-019', chapterId:'g3ssee-natural', difficulty:2, subsection:'animals',
    question:'Which of the following is an INVERTEBRATE (no backbone)?',
    options:['Butterfly','Sparrow','Mongoose','Goldfish'],
    answer:'Butterfly',
    hint:'Invertebrates do NOT have a backbone.',
    explanation:'A <b>butterfly</b> is an invertebrate — it has no backbone. Sparrows, mongooses and goldfish all have a backbone, so they are vertebrates.'}),

  makeMCQ({ id:'g3ssee-nat-020', chapterId:'g3ssee-natural', difficulty:1, subsection:'animals',
    question:'Which group of vertebrates breathes through gills?',
    options:['Fish','Birds','Mammals','Reptiles'],
    answer:'Fish',
    hint:'These animals live in water and breathe underwater.',
    explanation:'<b>Fish</b> breathe through gills, which extract dissolved oxygen from water.' }),

  makeMCQ({ id:'g3ssee-nat-021', chapterId:'g3ssee-natural', difficulty:2, subsection:'animals',
    question:'The Mauritius kestrel is a bird of prey found only in Mauritius. It eats ___.',
    options:['Lizards and insects','Grass and dry leaves','Only fish from rivers','Fruit and tree bark'],
    answer:'Lizards and insects',
    hint:'This bird is a predator — it hunts for food.',
    explanation:'The Mauritius kestrel is a small falcon that hunts <b>lizards, insects</b> and small birds. It does not eat plants and it does not fish.'}),

  makeMCQ({ id:'g3ssee-nat-022', chapterId:'g3ssee-natural', difficulty:1, subsection:'animals',
    question:'Which of the following is a MAMMAL?',
    options:['Dolphin','Shark','Crocodile','Parrot'],
    answer:'Dolphin',
    hint:'Mammals breathe air, are warm-blooded and feed their young with milk.',
    explanation:'A <b>dolphin</b> is a mammal — it breathes air (coming to the surface), is warm-blooded and feeds its young with milk. Dolphins are often seen around Mauritius.' }),

  makeTF({ id:'g3ssee-nat-023', chapterId:'g3ssee-natural', difficulty:1, subsection:'animals',
    question:'Birds are the only animals that have wings.',
    answer:false,
    explanation:'Bats (mammals) and some insects (such as butterflies and bees) also have wings. So <b>not only birds</b> have wings.' }),

  makeMCQ({ id:'g3ssee-nat-024', chapterId:'g3ssee-natural', difficulty:2, subsection:'animals',
    question:'What do we call an animal that eats only plants?',
    options:['Herbivore','Carnivore','Omnivore','Predator'],
    answer:'Herbivore',
    hint:'Herbi- relates to herbs and plants.',
    explanation:'An animal that eats only plants is called a <b>herbivore</b>. Examples include cows, rabbits and deer.' }),

  makeMCQ({ id:'g3ssee-nat-025', chapterId:'g3ssee-natural', difficulty:2, subsection:'animals',
    question:'An animal that eats both plants AND animals is called an ___.',
    options:['omnivore','herbivore','carnivore','decomposer'],
    answer:'omnivore',
    hint:'Omni- means all or everything.',
    explanation:'An <b>omnivore</b> eats both plants and animals. Humans are omnivores — we eat vegetables and meat.' }),

  makeMCQ({ id:'g3ssee-nat-026', chapterId:'g3ssee-natural', difficulty:2, subsection:'animals',
    question:'The green turtle is sometimes seen around Mauritius. Why is it important to protect it?',
    options:['It is endangered and keeps the sea healthy','It makes the seawater around the island salty','It builds underwater homes for other animals','It grows the sugar cane found on the beach'],
    answer:'It is endangered and keeps the sea healthy',
    explanation:'The green turtle is an <b>endangered species</b>, and by grazing on sea grass it keeps the ocean ecosystem healthy. It does not make the sea salty, build homes or grow crops.'}),

  makeMCQ({ id:'g3ssee-nat-027', chapterId:'g3ssee-natural', difficulty:1, subsection:'animals',
    question:'What is a habitat?',
    options:['The place where an animal lives','A measurement of the weather','A subject studied at school','A type of food that animals eat'],
    answer:'The place where an animal lives',
    explanation:'A <b>habitat</b> is the natural place where a plant or animal lives — a forest, a coral reef or a freshwater stream, for example.'}),

  makeTF({ id:'g3ssee-nat-028', chapterId:'g3ssee-natural', difficulty:1, subsection:'animals',
    question:'Cutting down forests destroys animal habitats.',
    answer:true,
    explanation:'Yes! Deforestation (cutting down forests) <b>destroys habitats</b> for many animals, leading to a loss of biodiversity.' }),

  makeMCQ({ id:'g3ssee-nat-029', chapterId:'g3ssee-natural', difficulty:3, subsection:'animals',
    question:'The dodo became extinct partly because sailors hunted it. Why was the dodo easy to catch?',
    options:['It could not fly and had no fear','It was smaller than a chicken','It could run faster than a horse','It could swim away very quickly'],
    answer:'It could not fly and had no fear',
    hint:'The dodo had lived on an island without predators before humans arrived.',
    explanation:'Dodos had never met humans or predators, so they had <b>no fear</b> of them, and they <b>could not fly</b> away. They were not small, not fast and not swimmers.'}),

  makeMCQ({ id:'g3ssee-nat-030', chapterId:'g3ssee-natural', difficulty:2, subsection:'animals',
    question:'Which of the following animals is NOT native to Mauritius?',
    options:['African lion','Mauritius kestrel','Pink pigeon','Green gecko'],
    answer:'African lion',
    hint:'This animal is native to Africa, not islands in the Indian Ocean.',
    explanation:'Lions live naturally in Africa and have never lived wild in Mauritius. The <b>Mauritius kestrel</b>, the <b>pink pigeon</b> and the <b>green gecko</b> are all native Mauritian animals.'}),

// ── soil_rocks (031-075) ──────────────────────────────────────────────────

  makeMCQ({ id:'g3ssee-nat-031', chapterId:'g3ssee-natural', difficulty:1, subsection:'soil_rocks',
    question:'Which type of soil drains water very quickly?',
    options:['Sandy soil','Clay soil','Loamy soil','Humus-rich soil'],
    answer:'Sandy soil',
    hint:'Think of what happens when water touches sand on a beach.',
    explanation:'<b>Sandy soil</b> has large particles with big spaces between them, so water drains through it very quickly.' }),

  makeMCQ({ id:'g3ssee-nat-032', chapterId:'g3ssee-natural', difficulty:1, subsection:'soil_rocks',
    question:'Which type of soil holds water and can become waterlogged?',
    options:['Clay soil','Sandy soil','Gravel','Loamy soil'],
    answer:'Clay soil',
    hint:'This soil has tiny particles that pack closely together.',
    explanation:'<b>Clay soil</b> has very fine particles that stick together and do not allow water to drain easily, so it holds water and can become waterlogged.' }),

  makeMCQ({ id:'g3ssee-nat-033', chapterId:'g3ssee-natural', difficulty:2, subsection:'soil_rocks',
    question:'Which type of soil is BEST for growing most crops?',
    options:['Loamy soil','Sandy soil','Rocky soil','Clay soil'],
    answer:'Loamy soil',
    hint:'This soil has a balanced mixture of sand, silt and clay.',
    explanation:'<b>Loamy soil</b> is the best for growing crops because it holds enough water and nutrients while also draining well, giving roots the air they need.' }),

  makeTF({ id:'g3ssee-nat-034', chapterId:'g3ssee-natural', difficulty:1, subsection:'soil_rocks',
    question:'Soil contains tiny living organisms that help break down dead material.',
    answer:true,
    explanation:'Yes! Soil is home to many <b>microorganisms</b> (bacteria, fungi) and animals like earthworms that break down dead plants and animals, making the soil fertile.' }),

  makeMCQ({ id:'g3ssee-nat-035', chapterId:'g3ssee-natural', difficulty:1, subsection:'soil_rocks',
    question:'What is HUMUS in soil?',
    options:['Decayed plant and animal material','A hard layer of solid volcanic rock','A form of water found underground','A layer of very fine white sand'],
    answer:'Decayed plant and animal material',
    explanation:'<b>Humus</b> is the dark, rich material in soil formed from decayed plants and animals. It feeds plants and makes soil fertile. It is not rock, water or sand.'}),

  makeMCQ({ id:'g3ssee-nat-036', chapterId:'g3ssee-natural', difficulty:2, subsection:'soil_rocks',
    question:'Mauritius has reddish-brown soil called "latosol" in many areas. What gives it this colour?',
    options:['Iron compounds','Green algae','White chalk','Blue crystals'],
    answer:'Iron compounds',
    hint:'Rust is also reddish-brown and contains iron.',
    explanation:'The reddish-brown colour of Mauritian latosol comes from <b>iron compounds</b> (iron oxide) in the soil — the same chemistry that makes rust on metal.'}),

  makeMCQ({ id:'g3ssee-nat-037', chapterId:'g3ssee-natural', difficulty:1, subsection:'soil_rocks',
    question:'What is the main difference between a ROCK and SOIL?',
    options:['Rock is solid; soil is a loose mixture','Rock is light; soil is very heavy','Rock is always wet; soil is always dry','Rock is always black; soil is always white'],
    answer:'Rock is solid; soil is a loose mixture',
    explanation:'A <b>rock</b> is hard, solid mineral matter. <b>Soil</b> is a loose mixture of tiny rock particles, humus, water, air and living things. Colour and weight are not what tells them apart.'}),

  makeMCQ({ id:'g3ssee-nat-038', chapterId:'g3ssee-natural', difficulty:2, subsection:'soil_rocks',
    question:'What happens to soil when there are no plants to hold it in place?',
    options:['It is washed away by the rain','It becomes harder and richer','It turns slowly into solid rock','It stays exactly as it was'],
    answer:'It is washed away by the rain',
    hint:'Without roots, the soil has nothing to hold it.',
    explanation:'Without plant roots to hold it, rain washes the soil away — this is <b>soil erosion</b>, and it leaves the land less fertile. Bare soil does not get richer, turn to rock or stay the same.'}),

  makeTF({ id:'g3ssee-nat-039', chapterId:'g3ssee-natural', difficulty:1, subsection:'soil_rocks',
    question:'Earthworms are helpful to plants because they loosen and improve the soil.',
    answer:true,
    explanation:'Yes! <b>Earthworms</b> burrow through soil, loosening it so air and water can reach plant roots. They also help break down dead organic matter into humus.' }),

  makeMCQ({ id:'g3ssee-nat-040', chapterId:'g3ssee-natural', difficulty:3, subsection:'soil_rocks',
    question:'A farmer notices that plants grow well in one part of the field but poorly in another. What might explain this difference?',
    options:['The two soils hold different nutrients','The plants choose where they grow','The rocks there are a different colour','The weather differs across the field'],
    answer:'The two soils hold different nutrients',
    hint:'Soil quality affects plant growth.',
    explanation:'Plants grow better in fertile soil rich in <b>nutrients</b> and with good drainage. One part of a field can have quite different soil from another, which is why the growth differs.'}),

  makeMCQ({ id:'g3ssee-nat-041', chapterId:'g3ssee-natural', difficulty:2, subsection:'soil_rocks',
    question:'Which layer of soil contains most of the nutrients and living organisms?',
    options:['Topsoil','Subsoil','Bedrock','Sand layer'],
    answer:'Topsoil',
    hint:'This is the top layer — the dark, rich one.',
    explanation:'The <b>topsoil</b> is the uppermost layer of soil. It contains the most humus, nutrients and living organisms, which is why it is the most important layer for plant growth.' }),

  makeMCQ({ id:'g3ssee-nat-042', chapterId:'g3ssee-natural', difficulty:1, subsection:'soil_rocks',
    question:'How are rocks broken down into smaller particles over time?',
    options:['By weathering from wind, water and heat','By animals chewing them into small pieces','By plants pouring rainwater over them','By the pull of the moon during the night'],
    answer:'By weathering from wind, water and heat',
    explanation:'<b>Weathering</b> is the slow breaking down of rock into smaller particles by wind, rain and changes in temperature. Animals, plants and the moon do not grind rock down.'}),

  makeTF({ id:'g3ssee-nat-043', chapterId:'g3ssee-natural', difficulty:1, subsection:'soil_rocks',
    question:'Planting trees on a hill can prevent soil erosion.',
    answer:true,
    explanation:'Yes! Tree roots <b>hold soil in place</b>, preventing it from being washed away by rain on slopes and hills.' }),

  makeMCQ({ id:'g3ssee-nat-044', chapterId:'g3ssee-natural', difficulty:2, subsection:'soil_rocks',
    question:'What is the name given to the group of organisms that break down dead material in soil?',
    options:['Decomposers','Producers','Consumers','Predators'],
    answer:'Decomposers',
    hint:'They decompose (break down) dead organic material.',
    explanation:'<b>Decomposers</b> — such as bacteria, fungi and earthworms — break down dead plant and animal material in the soil, releasing nutrients back into the ground.' }),

  makeMCQ({ id:'g3ssee-nat-045', chapterId:'g3ssee-natural', difficulty:3, subsection:'soil_rocks',
    question:'A pupil squeezes a handful of wet clay soil tightly. What will she observe?',
    options:['It holds its shape in a solid lump','It dissolves away into the water','It changes into dry sandy grains','It crumbles apart almost at once'],
    answer:'It holds its shape in a solid lump',
    hint:'Clay particles are very fine and stick together when wet.',
    explanation:'Wet <b>clay</b> soil is very sticky: its fine particles bind tightly, so a squeezed handful keeps its shape. Clay does not dissolve, turn into sand or crumble.'})

);

})();
