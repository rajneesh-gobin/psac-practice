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
    options:['To support the plant and carry water from roots to leaves','To absorb water from the soil','To make seeds','To attract insects for pollination'],
    answer:'To support the plant and carry water from roots to leaves',
    hint:'The stem is like a highway for water transport.',
    explanation:'The <b>stem</b> supports the plant and acts as a transport highway, carrying water and minerals from the roots up to the leaves.' }),

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
    options:['Sunlight, water and carbon dioxide','Only water','Only sunlight','Sunlight and soil only'],
    answer:'Sunlight, water and carbon dioxide',
    hint:'Plants are like factories that need three raw materials.',
    explanation:'Plants use <b>sunlight, water</b> (from the soil) and <b>carbon dioxide</b> (from the air) to make their own food through photosynthesis.' }),

  makeMCQ({ id:'g3ssee-nat-007', chapterId:'g3ssee-natural', difficulty:1, subsection:'plants',
    question:'Which gas do plants release during photosynthesis that humans breathe?',
    options:['Oxygen','Carbon dioxide','Nitrogen','Hydrogen'],
    answer:'Oxygen',
    explanation:'During photosynthesis, plants release <b>oxygen</b> into the air. Humans and animals breathe oxygen to survive.' }),

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
    options:['Trochetia boutoniana (bouton d\'or)','Rose bush','Cactus','Sunflower'],
    answer:'Trochetia boutoniana (bouton d\'or)',
    hint:'The national flower of Mauritius.',
    explanation:'The <b>Trochetia boutoniana</b>, also called "bouton d\'or" or "boucle d\'oreille", is the national flower of Mauritius and is native to the island.' }),

  makeMCQ({ id:'g3ssee-nat-013', chapterId:'g3ssee-natural', difficulty:2, subsection:'plants',
    question:'Why is it important to protect the forests of Mauritius such as the Black River Gorges?',
    options:['They are home to rare and native species of plants and animals','They produce sugar for export','They are where buses park at night','They are sources of electricity'],
    answer:'They are home to rare and native species of plants and animals',
    explanation:'Forests like the <b>Black River Gorges</b> protect rare and endemic Mauritian species of plants and animals that are found nowhere else on Earth.' }),

  makeTF({ id:'g3ssee-nat-014', chapterId:'g3ssee-natural', difficulty:1, subsection:'plants',
    question:'Cutting down all trees in a forest has no effect on the environment.',
    answer:false,
    explanation:'Cutting down all trees is very harmful. It destroys <b>habitats</b>, causes soil erosion and reduces oxygen production.' }),

  makeMCQ({ id:'g3ssee-nat-015', chapterId:'g3ssee-natural', difficulty:3, subsection:'plants',
    question:'A plant is placed in a dark cupboard for several days. What will most likely happen?',
    options:['The plant will turn yellow and die without sunlight','The plant will grow very fast','The plant will produce more flowers','The plant will stay exactly the same'],
    answer:'The plant will turn yellow and die without sunlight',
    hint:'Think about what plants need to make food.',
    explanation:'Without sunlight, plants cannot carry out photosynthesis to make food. The leaves will <b>turn yellow</b> (as chlorophyll breaks down) and the plant will eventually die.' }),

// ── animals (016-045) ──────────────────────────────────────────────────────

  makeMCQ({ id:'g3ssee-nat-016', chapterId:'g3ssee-natural', difficulty:1, subsection:'animals',
    question:'The Dodo was a bird that lived only in Mauritius. What happened to the dodo?',
    options:['It became extinct','It flew to Africa','It moved to the sea','It lives in zoos today'],
    answer:'It became extinct',
    hint:'The dodo was last seen in the 17th century.',
    explanation:'The <b>dodo became extinct</b> around 1681, mainly because of hunting by sailors and the introduction of predators such as rats and dogs.' }),

  makeMCQ({ id:'g3ssee-nat-017', chapterId:'g3ssee-natural', difficulty:1, subsection:'animals',
    question:'Which of the following is a native bird of Mauritius that is now endangered?',
    options:['Pink pigeon','Dodo','Ostrich','Parrot'],
    answer:'Pink pigeon',
    hint:'This beautiful bird is still alive but at risk.',
    explanation:'The <b>pink pigeon</b> (pigeon rose) is a native Mauritian bird that is endangered — its numbers are very small and conservation efforts are needed to save it.' }),

  makeTF({ id:'g3ssee-nat-018', chapterId:'g3ssee-natural', difficulty:1, subsection:'animals',
    question:'Animals with a backbone are called vertebrates.',
    answer:true,
    explanation:'Yes! Animals with a backbone (spine) are called <b>vertebrates</b>. Examples include fish, frogs, birds, reptiles and mammals.' }),

  makeMCQ({ id:'g3ssee-nat-019', chapterId:'g3ssee-natural', difficulty:2, subsection:'animals',
    question:'Which of the following is an INVERTEBRATE (no backbone)?',
    options:['Butterfly','Dog','Fish','Pigeon'],
    answer:'Butterfly',
    hint:'Invertebrates do NOT have a backbone.',
    explanation:'A <b>butterfly</b> is an invertebrate — it has no backbone. Dogs, fish and pigeons all have a backbone, making them vertebrates.' }),

  makeMCQ({ id:'g3ssee-nat-020', chapterId:'g3ssee-natural', difficulty:1, subsection:'animals',
    question:'Which group of vertebrates breathes through gills?',
    options:['Fish','Birds','Mammals','Reptiles'],
    answer:'Fish',
    hint:'These animals live in water and breathe underwater.',
    explanation:'<b>Fish</b> breathe through gills, which extract dissolved oxygen from water.' }),

  makeMCQ({ id:'g3ssee-nat-021', chapterId:'g3ssee-natural', difficulty:2, subsection:'animals',
    question:'The Mauritius kestrel is a bird of prey found only in Mauritius. It eats ___.',
    options:['Lizards and insects','Only grass and leaves','Only fish','Only other birds'],
    answer:'Lizards and insects',
    hint:'This bird is a predator — it hunts for food.',
    explanation:'The <b>Mauritius kestrel</b> is a small falcon that hunts and eats lizards, insects and small birds.' }),

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
    options:['It is an endangered species that helps keep the ocean ecosystem healthy','It produces sugarcane','It builds houses for other animals','It makes the sea salty'],
    answer:'It is an endangered species that helps keep the ocean ecosystem healthy',
    explanation:'The <b>green turtle</b> is endangered and plays an important role in marine ecosystems by grazing on sea grass, which keeps it healthy.' }),

  makeMCQ({ id:'g3ssee-nat-027', chapterId:'g3ssee-natural', difficulty:1, subsection:'animals',
    question:'What is a habitat?',
    options:['The natural place where an animal or plant lives','A type of food','A school subject','A weather measurement'],
    answer:'The natural place where an animal or plant lives',
    explanation:'A <b>habitat</b> is the natural environment where a plant or animal lives — for example, a forest, a coral reef or a freshwater stream.' }),

  makeTF({ id:'g3ssee-nat-028', chapterId:'g3ssee-natural', difficulty:1, subsection:'animals',
    question:'Cutting down forests destroys animal habitats.',
    answer:true,
    explanation:'Yes! Deforestation (cutting down forests) <b>destroys habitats</b> for many animals, leading to a loss of biodiversity.' }),

  makeMCQ({ id:'g3ssee-nat-029', chapterId:'g3ssee-natural', difficulty:3, subsection:'animals',
    question:'The dodo became extinct partly because sailors hunted it. Why were dodos easy to catch?',
    options:['They could not fly and had no fear of humans','They were very fast runners','They were very small','They could swim away quickly'],
    answer:'They could not fly and had no fear of humans',
    hint:'The dodo had lived on an island without predators before humans arrived.',
    explanation:'Because dodos had <b>never encountered humans or predators</b> before, they had no fear. They also could not fly, making them very easy to catch.' }),

  makeMCQ({ id:'g3ssee-nat-030', chapterId:'g3ssee-natural', difficulty:2, subsection:'animals',
    question:'Which of the following animals is NOT native to Mauritius?',
    options:['Lion','Mauritius kestrel','Pink pigeon','Green gecko'],
    answer:'Lion',
    hint:'This animal is native to Africa, not islands in the Indian Ocean.',
    explanation:'<b>Lions</b> are native to Africa and are not found naturally in Mauritius. The Mauritius kestrel, pink pigeon and green gecko are all native to Mauritius.' }),

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
    options:['Decayed plant and animal material that makes soil fertile','A type of rock','A form of water','A layer of sand'],
    answer:'Decayed plant and animal material that makes soil fertile',
    explanation:'<b>Humus</b> is the dark, rich material in soil made from decayed plants and animals. It provides nutrients for plant growth and makes soil fertile.' }),

  makeMCQ({ id:'g3ssee-nat-036', chapterId:'g3ssee-natural', difficulty:2, subsection:'soil_rocks',
    question:'Mauritius has reddish-brown soil called "latosol" in many areas. What gives it this colour?',
    options:['Iron compounds','Blue clay','White sand','Green algae'],
    answer:'Iron compounds',
    hint:'Rust is also reddish-brown and contains iron.',
    explanation:'The reddish-brown colour of Mauritian <b>latosol</b> comes from iron compounds (iron oxide) in the soil, similar to how rust forms on metal.' }),

  makeMCQ({ id:'g3ssee-nat-037', chapterId:'g3ssee-natural', difficulty:1, subsection:'soil_rocks',
    question:'What is the main difference between a ROCK and SOIL?',
    options:['Rock is hard and solid; soil is a mixture of small particles and organic matter','Rock is wet; soil is dry','Rock is black; soil is white','Rock is light; soil is very heavy'],
    answer:'Rock is hard and solid; soil is a mixture of small particles and organic matter',
    explanation:'<b>Rocks</b> are hard, solid pieces of mineral matter. <b>Soil</b> is a mixture of tiny rock particles, organic matter (humus), water, air and living organisms.' }),

  makeMCQ({ id:'g3ssee-nat-038', chapterId:'g3ssee-natural', difficulty:2, subsection:'soil_rocks',
    question:'What happens to soil when there are no plants to hold it in place?',
    options:['It is washed away by rain — this is called soil erosion','It becomes harder and richer','It turns into rock','It stays exactly the same'],
    answer:'It is washed away by rain — this is called soil erosion',
    hint:'Without roots, the soil has nothing to hold it.',
    explanation:'Without plant roots to hold soil in place, <b>soil erosion</b> occurs — rainwater washes the soil away, making land less fertile.' }),

  makeTF({ id:'g3ssee-nat-039', chapterId:'g3ssee-natural', difficulty:1, subsection:'soil_rocks',
    question:'Earthworms are helpful to plants because they loosen and improve the soil.',
    answer:true,
    explanation:'Yes! <b>Earthworms</b> burrow through soil, loosening it so air and water can reach plant roots. They also help break down dead organic matter into humus.' }),

  makeMCQ({ id:'g3ssee-nat-040', chapterId:'g3ssee-natural', difficulty:3, subsection:'soil_rocks',
    question:'A farmer notices that plants grow well in one part of the field but poorly in another. What might explain this difference?',
    options:['The soil types are different — one area may have more nutrients','The plants choose where to grow','The weather is different on each side of the field','The rocks are a different colour'],
    answer:'The soil types are different — one area may have more nutrients',
    hint:'Soil quality affects plant growth.',
    explanation:'Plants grow better in <b>fertile soil</b> rich in nutrients. If one area has better soil (more humus, good drainage), plants will thrive there.' }),

  makeMCQ({ id:'g3ssee-nat-041', chapterId:'g3ssee-natural', difficulty:2, subsection:'soil_rocks',
    question:'Which layer of soil contains most of the nutrients and living organisms?',
    options:['Topsoil','Subsoil','Bedrock','Sand layer'],
    answer:'Topsoil',
    hint:'This is the top layer — the dark, rich one.',
    explanation:'The <b>topsoil</b> is the uppermost layer of soil. It contains the most humus, nutrients and living organisms, which is why it is the most important layer for plant growth.' }),

  makeMCQ({ id:'g3ssee-nat-042', chapterId:'g3ssee-natural', difficulty:1, subsection:'soil_rocks',
    question:'How are rocks broken down into smaller particles over time?',
    options:['By weathering — the action of wind, water and temperature changes','By animals eating them','By plants watering them','By the moon\'s gravity'],
    answer:'By weathering — the action of wind, water and temperature changes',
    explanation:'<b>Weathering</b> is the process by which rocks are broken into smaller particles over time by the action of wind, rain and temperature changes.' }),

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
    options:['The clay holds its shape in a solid lump','The clay crumbles immediately','The clay turns into sand','The clay dissolves in the water'],
    answer:'The clay holds its shape in a solid lump',
    hint:'Clay particles are very fine and stick together when wet.',
    explanation:'<b>Clay soil</b> is very sticky when wet. When squeezed, it holds its shape because the fine clay particles bind tightly together.' })

);

})();
