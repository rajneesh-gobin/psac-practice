'use strict';
// Grade 6 Science — Enrichment: Ecosystems in Pictures
// Photo identification of ecosystem types and habitats, plus food chain & web questions
// IDs format: g6sci-enr-eco-NNN

STATIC_QUESTIONS.push(

  // ── PHOTO IDENTIFICATION: Ecosystem Types ────────────────────────────────

  makeMCQ({ id:'g6sci-enr-eco-001', chapterId:'g6sci-enr-ecosystems', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Blue_Linckia_Starfish.JPG/250px-Blue_Linckia_Starfish.JPG" alt="An underwater scene with a blue starfish and colourful coral formations and fish" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>What type of ecosystem is shown in this underwater photograph?</b>',
    options:['Freshwater pond ecosystem','Coral reef ecosystem','Mangrove forest ecosystem','Open ocean (deep sea) ecosystem'],
    answer:'Coral reef ecosystem',
    hint:'Look for the colourful corals and diverse marine life living together in shallow, warm, clear water.',
    explanation:'This image shows a <b>coral reef ecosystem</b> — a warm, shallow, sunlit marine habitat built by tiny coral polyps. Coral reefs cover less than 1% of the ocean floor but support around 25% of all marine species. Mauritius has a coral reef lagoon surrounding much of the island, which is a key ecosystem for its marine biodiversity.' }),

  makeMCQ({ id:'g6sci-enr-eco-002', chapterId:'g6sci-enr-ecosystems', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Sonneratia_alba_-_Manado_%282%29.JPG/330px-Sonneratia_alba_-_Manado_%282%29.JPG" alt="Trees growing directly in coastal saltwater with visible roots" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>What type of coastal ecosystem is shown in this photograph?</b>',
    options:['Coral reef ecosystem','Tropical rainforest ecosystem','Mangrove forest ecosystem','Desert ecosystem'],
    answer:'Mangrove forest ecosystem',
    hint:'Notice how these trees are growing directly in salty coastal water — only one type of forest can survive this.',
    explanation:'This is a <b>mangrove forest ecosystem</b>. Mangrove trees are specially adapted to grow in salty, coastal water. Their tangled root systems trap sediment, protect coastlines from wave erosion and provide nursery habitat for fish, crabs and birds. Mauritius has mangrove areas along its coastline that are protected as important ecosystems.' }),

  makeMCQ({ id:'g6sci-enr-eco-003', chapterId:'g6sci-enr-ecosystems', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Aerial_view_of_the_Amazon_Rainforest.jpg/330px-Aerial_view_of_the_Amazon_Rainforest.jpg" alt="An aerial view of a vast, dense green forest stretching to the horizon" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>What type of ecosystem is shown in this aerial photograph?</b>',
    options:['Savanna ecosystem','Desert ecosystem','Tropical rainforest ecosystem','Arctic tundra ecosystem'],
    answer:'Tropical rainforest ecosystem',
    hint:'This ecosystem receives very heavy rainfall year-round and supports the greatest variety of species on Earth.',
    explanation:'This aerial photo shows a <b>tropical rainforest ecosystem</b> — the Amazon rainforest in South America. Tropical rainforests are characterised by dense, layered vegetation, very high rainfall and extraordinary biodiversity. They are home to more than half of all animal and plant species on Earth. The Black River Gorges National Park in Mauritius preserves a smaller but important native forest ecosystem.' }),

  makeMCQ({ id:'g6sci-enr-eco-004', chapterId:'g6sci-enr-ecosystems', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Tarangire-Natpark800600.jpg/250px-Tarangire-Natpark800600.jpg" alt="A dry, open landscape with scattered flat-topped trees and dry yellow grass" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>What type of ecosystem is shown in this photograph from East Africa?</b>',
    options:['Tropical rainforest ecosystem','Desert ecosystem','Savanna (grassland) ecosystem','Freshwater lake ecosystem'],
    answer:'Savanna (grassland) ecosystem',
    hint:'This ecosystem has scattered trees, dry grass and distinct wet and dry seasons — it is common in Africa.',
    explanation:'This photograph shows a <b>savanna (grassland) ecosystem</b> at Tarangire National Park in Tanzania. Savannas have open grassland with scattered trees and shrubs, and distinct wet and dry seasons. They support large herds of animals such as elephants, zebras, wildebeest and lions. This biome covers much of sub-Saharan Africa.' }),

  makeMCQ({ id:'g6sci-enr-eco-005', chapterId:'g6sci-enr-ecosystems', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Rub_al_Khali_002.JPG/320px-Rub_al_Khali_002.JPG" alt="A vast landscape of golden sand dunes with no vegetation visible" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>What type of ecosystem is shown in this photograph?</b>',
    options:['Savanna ecosystem','Freshwater lake ecosystem','Tropical rainforest ecosystem','Desert ecosystem'],
    answer:'Desert ecosystem',
    hint:'Virtually no rain falls here; organisms that live here must survive extreme heat and a severe lack of water.',
    explanation:'This is a <b>desert ecosystem</b> — specifically the Rub\' al Khali, the largest continuous sand desert in the world. Deserts receive very little rainfall (less than 250 mm per year). Animals such as the camel and plants such as the cactus are specially adapted to survive heat, dry conditions and scarce food. Deserts cover about one-third of Earth\'s land surface.' }),

  makeMCQ({ id:'g6sci-enr-eco-006', chapterId:'g6sci-enr-ecosystems', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Pacific_Ocean_as_viewed_from_GOES-18_on_September_23%2C_2023.jpg/330px-Pacific_Ocean_as_viewed_from_GOES-18_on_September_23%2C_2023.jpg" alt="A satellite view of the vast deep blue ocean covering most of what is visible from space" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>What type of ecosystem is shown in this satellite image?</b>',
    options:['Freshwater lake ecosystem','Desert ecosystem','Marine (ocean) ecosystem','Mangrove forest ecosystem'],
    answer:'Marine (ocean) ecosystem',
    hint:'This vast, deep, saltwater environment covers more than 70% of Earth\'s surface.',
    explanation:'This satellite image shows a <b>marine (ocean) ecosystem</b> — the Pacific Ocean, the largest ocean on Earth. Marine ecosystems are saltwater environments covering over 70% of Earth\'s surface. They range from sunlit shallow waters (where coral reefs grow) to the dark, cold deep ocean. Marine ecosystems support enormous biodiversity, from microscopic plankton to blue whales. Mauritius sits within the marine ecosystem of the Indian Ocean.' }),

  makeMCQ({ id:'g6sci-enr-eco-007', chapterId:'g6sci-enr-ecosystems', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Lake_Idro_Italy_2005-08-16.jpg/330px-Lake_Idro_Italy_2005-08-16.jpg" alt="A calm, clear blue lake surrounded by green hills and vegetation" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>What type of ecosystem is shown in this photograph?</b>',
    options:['Marine (ocean) ecosystem','Coral reef ecosystem','Desert ecosystem','Freshwater lake ecosystem'],
    answer:'Freshwater lake ecosystem',
    hint:'This is an inland body of water. Unlike the ocean, the water here contains very little salt.',
    explanation:'This photograph shows a <b>freshwater lake ecosystem</b>. Lakes, rivers, ponds and streams are freshwater ecosystems — they contain non-salty water. They support fish, frogs, water birds, aquatic plants and insects. Mauritius has several freshwater reservoirs and rivers that support freshwater organisms and provide drinking water for the population.' }),

  // ── TEXT-BASED QUESTIONS: Food Chains, Food Webs, Producers/Consumers/Decomposers ──

  makeMCQ({ id:'g6sci-enr-eco-008', chapterId:'g6sci-enr-ecosystems', difficulty:1,
    question:'In a food chain, what is a PRODUCER?',
    options:[
      'An animal that hunts and eats other animals',
      'A living thing that makes its own food using sunlight through photosynthesis',
      'An organism that breaks down dead matter and returns nutrients to the soil',
      'An animal that eats only plants'
    ],
    answer:'A living thing that makes its own food using sunlight through photosynthesis',
    hint:'Producers do not need to eat other organisms — they create their own energy from sunlight.',
    explanation:'A <b>producer</b> is a living thing (usually a green plant or alga) that <b>makes its own food</b> through <b>photosynthesis</b>, using sunlight, water and carbon dioxide. Producers form the base of every food chain. Examples: grass, trees, algae, seagrass. Without producers, no other life in the ecosystem could survive.' }),

  makeMCQ({ id:'g6sci-enr-eco-009', chapterId:'g6sci-enr-ecosystems', difficulty:1,
    question:'In a food chain, what is a CONSUMER?',
    options:[
      'A plant that makes its own food through photosynthesis',
      'An organism that breaks down dead leaves and wood in the soil',
      'An organism that cannot make its own food and must eat other organisms to get energy',
      'A non-living part of an ecosystem, such as water or sunlight'
    ],
    answer:'An organism that cannot make its own food and must eat other organisms to get energy',
    hint:'Consumers must eat either plants or other animals to get energy — they cannot make their own food.',
    explanation:'A <b>consumer</b> is an organism that <b>cannot make its own food</b> and must eat (consume) other organisms for energy. <b>Primary consumers</b> (herbivores) eat plants; <b>secondary consumers</b> eat primary consumers; <b>tertiary consumers</b> eat secondary consumers. Examples: a caterpillar eating a leaf (primary consumer), a bird eating the caterpillar (secondary consumer).' }),

  makeMCQ({ id:'g6sci-enr-eco-010', chapterId:'g6sci-enr-ecosystems', difficulty:1,
    question:'What is a DECOMPOSER in an ecosystem?',
    options:[
      'A large predator at the top of the food chain',
      'A plant that photosynthesises to produce food for other organisms',
      'An organism that breaks down dead organic matter and returns nutrients to the soil',
      'A consumer that eats both plants and animals'
    ],
    answer:'An organism that breaks down dead organic matter and returns nutrients to the soil',
    hint:'Think about what happens to dead leaves and fallen trees on a forest floor — something must break them down.',
    explanation:'<b>Decomposers</b> (mainly bacteria and fungi) <b>break down dead plants, dead animals and waste matter</b>, releasing the nutrients stored in them back into the soil. This nutrient recycling is essential — it feeds the producers (plants), completing the cycle of life. Without decomposers, dead matter would accumulate and nutrients would be permanently locked away.' }),

  makeMCQ({ id:'g6sci-enr-eco-011', chapterId:'g6sci-enr-ecosystems', difficulty:2,
    question:'Which of the following shows a CORRECT food chain?',
    options:[
      'Sun → Grasshopper → Grass → Frog → Snake',
      'Grass → Sun → Grasshopper → Frog → Snake',
      'Sun → Grass → Grasshopper → Frog → Snake',
      'Snake → Frog → Grasshopper → Grass → Sun'
    ],
    answer:'Sun → Grass → Grasshopper → Frog → Snake',
    hint:'Energy always flows from the Sun to the producer first, then passes to each consumer in order.',
    explanation:'The correct food chain is: <b>Sun → Grass → Grasshopper → Frog → Snake</b>. The Sun provides energy to grass (the <b>producer</b>) via photosynthesis. The grasshopper (<b>primary consumer</b>/herbivore) eats grass. The frog (<b>secondary consumer</b>/carnivore) eats the grasshopper. The snake (<b>tertiary consumer</b>) eats the frog. Energy flows in one direction — from producer to top predator.' }),

  makeMCQ({ id:'g6sci-enr-eco-012', chapterId:'g6sci-enr-ecosystems', difficulty:2,
    question:'What is the key difference between a FOOD CHAIN and a FOOD WEB?',
    options:[
      'A food chain shows all organisms in an ecosystem; a food web shows only one feeding relationship',
      'A food chain shows a single, straight sequence of who eats whom; a food web shows many food chains linked together',
      'A food chain only exists in water ecosystems; a food web only exists on land',
      'There is no difference — they are two names for the same thing'
    ],
    answer:'A food chain shows a single, straight sequence of who eats whom; a food web shows many food chains linked together',
    hint:'Think of a chain (one straight line) versus a spider\'s web (many connected strands).',
    explanation:'A <b>food chain</b> is a <b>single, straight sequence</b> showing one feeding path (e.g., Grass → Rabbit → Fox). A <b>food web</b> shows <b>many food chains linked together</b> in a network — it is more realistic because most animals eat more than one food source and are eaten by more than one predator. Food webs show the true complexity of feeding relationships in an ecosystem.' }),

  makeMCQ({ id:'g6sci-enr-eco-013', chapterId:'g6sci-enr-ecosystems', difficulty:2,
    question:'Why is BIODIVERSITY important for an ecosystem?',
    options:[
      'Because having fewer species makes an ecosystem easier to study and manage',
      'Because a variety of species makes an ecosystem more stable and resilient — if one species declines, others can maintain the ecosystem\'s balance',
      'Because biodiversity only benefits humans by producing more food crops',
      'Biodiversity is not important — ecosystems function perfectly well with only a few species'
    ],
    answer:'Because a variety of species makes an ecosystem more stable and resilient — if one species declines, others can maintain the ecosystem\'s balance',
    hint:'Think of an ecosystem as a structure — the more different parts it has, the harder it is to destroy.',
    explanation:'<b>Biodiversity</b> (variety of species) makes ecosystems <b>more stable and resilient</b>. In a high-biodiversity ecosystem, if one species declines, others that play a similar role can fill the gap. Low-biodiversity ecosystems are fragile — the loss of one species can trigger a collapse. Mauritius has lost many endemic species, weakening its natural ecosystems.' }),

  makeMCQ({ id:'g6sci-enr-eco-014', chapterId:'g6sci-enr-ecosystems', difficulty:2,
    question:'What is one DIRECT EFFECT of deforestation on an ecosystem?',
    options:[
      'Deforestation increases the number of tree species in a forest',
      'Deforestation improves soil quality by making more nutrients available',
      'Deforestation destroys habitats, forcing animals out and reducing biodiversity',
      'Deforestation helps prevent flooding by removing trees that slow down river flow'
    ],
    answer:'Deforestation destroys habitats, forcing animals out and reducing biodiversity',
    hint:'When trees are removed, what happens to all the animals and plants that lived in and on those trees?',
    explanation:'<b>Deforestation</b> (cutting down forests) <b>destroys habitats</b> for thousands of species. Animals lose their homes, food sources and shelter — many species die or move away. Deforestation also causes: soil erosion (roots no longer hold soil in place), increased flooding, loss of the carbon stored in trees (contributing to climate change), and reduced rainfall in the region.' }),

  makeMCQ({ id:'g6sci-enr-eco-015', chapterId:'g6sci-enr-ecosystems', difficulty:2,
    question:'In the food chain: Aquatic plants → Small fish → Large fish → Shark. What role do the AQUATIC PLANTS play?',
    options:['Primary consumers','Secondary consumers','Decomposers','Producers'],
    answer:'Producers',
    hint:'The aquatic plants make their own food through photosynthesis — they start the food chain.',
    explanation:'In this food chain, the <b>aquatic plants</b> are the <b>producers</b> — they make their own food through photosynthesis and provide energy for the entire chain. The <b>small fish</b> are the primary consumer (herbivore). The <b>large fish</b> are the secondary consumer. The <b>shark</b> is the tertiary consumer (top predator). Energy flows from the producers all the way up to the top predator.' }),

  makeMCQ({ id:'g6sci-enr-eco-016', chapterId:'g6sci-enr-ecosystems', difficulty:3,
    question:'Food web: Grass → Rabbit → Fox; Grass → Mouse → Fox. If all foxes are removed, what happens to the rabbit and mouse populations?',
    options:[
      'Both rabbit and mouse populations would decrease',
      'Rabbit population stays the same; only the mouse population increases',
      'Both rabbit and mouse populations would increase rapidly, leading to overgrazing of grass',
      'The grass would immediately grow faster'
    ],
    answer:'Both rabbit and mouse populations would increase rapidly, leading to overgrazing of grass',
    hint:'The fox is the predator keeping both populations in check — remove the predator and what happens to its prey?',
    explanation:'With no foxes, neither rabbits nor mice have a predator controlling their numbers. Both populations would <b>increase rapidly</b>. This would then cause the <b>grass to decrease</b> heavily (overgrazing). Eventually, with little grass left, rabbit and mouse populations would also crash due to starvation. This chain reaction shows why <b>top predators are vital</b> for maintaining ecosystem balance.' }),

  makeMCQ({ id:'g6sci-enr-eco-017', chapterId:'g6sci-enr-ecosystems', difficulty:3,
    question:'If all DECOMPOSERS disappeared from a forest ecosystem, what would eventually happen?',
    options:[
      'The forest would become healthier because energy would not be wasted on breaking down dead matter',
      'Dead plants and animals would pile up; nutrients would not return to the soil; producers would eventually die from nutrient shortage',
      'Consumers would quickly take over the role of decomposers and the ecosystem would continue unchanged',
      'The forest would grow faster because there would be less competition for resources'
    ],
    answer:'Dead plants and animals would pile up; nutrients would not return to the soil; producers would eventually die from nutrient shortage',
    hint:'Decomposers recycle nutrients back into the soil so plants can absorb them — remove this recycling and what happens to the plants?',
    explanation:'Without <b>decomposers</b> (bacteria, fungi), dead organic matter would <b>not be broken down</b>. Nutrients locked in dead material would not return to the soil, so <b>plants (producers) would slowly starve</b> — they could not absorb the minerals they need for growth. Eventually the entire food chain would collapse: no healthy producers means no consumers can survive either. Decomposers are as essential as producers.' })

);
