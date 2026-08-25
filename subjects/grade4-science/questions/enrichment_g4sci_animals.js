'use strict';
// Grade 4 Science — Enrichment: Animals in Pictures
// Photo identification of Mauritius endemic and common animals.
// IDs format: g4sci-enr-ani-NNN

STATIC_QUESTIONS.push(

  // ── Photo-identification questions ───────────────────────────────────────────

  makeMCQ({ id:'g4sci-enr-ani-001', chapterId:'g4sci-enr-animals', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Edwards%27_Dodo.jpg" alt="An animal" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>What animal is shown in this picture?</b>',
    options:['Dodo','Pink Pigeon','Echo Parakeet','Flying Fox'],
    answer:'Dodo',
    hint:'This bird from Mauritius is now extinct and could not fly.',
    explanation:'The <b>Dodo</b> (Raphus cucullatus) was a flightless bird endemic to Mauritius. It became extinct around 1681 due to hunting by sailors and settlers, and because animals they brought (rats, pigs) destroyed its eggs and habitat.' }),

  makeMCQ({ id:'g4sci-enr-ani-002', chapterId:'g4sci-enr-animals', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Pink_pigeon_%28Nesoenas_mayeri%29_1.jpg" alt="A bird" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>What bird is shown in this picture?</b>',
    options:['Pink Pigeon','Dodo','Echo Parakeet','Common Pigeon'],
    answer:'Pink Pigeon',
    hint:'This endangered bird is endemic to Mauritius and is known for its pinkish-brown colour.',
    explanation:'The <b>Pink Pigeon</b> (Nesoenas mayeri) is an endangered bird found only in Mauritius. Conservation efforts by the Durrell Wildlife Conservation Trust helped bring it back from near-extinction. It lives in the Black River Gorges National Park.' }),

  makeMCQ({ id:'g4sci-enr-ani-003', chapterId:'g4sci-enr-animals', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Echo_parakeet_%28Psittacula_eques_echo%29_-at_Durrell_Trust.jpg" alt="A parrot" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>Which endangered Mauritian parrot is shown in this picture?</b>',
    options:['Echo Parakeet','Pink Pigeon','Indian Ring-necked Parakeet','Alexandrine Parakeet'],
    answer:'Echo Parakeet',
    hint:'This is the only surviving parrot species endemic to Mauritius.',
    explanation:'The <b>Echo Parakeet</b> (Psittacula eques) is endemic to Mauritius. It was once critically endangered with fewer than 10 individuals in the wild. Intensive conservation work has raised its numbers to over 700, making it one of the great conservation success stories.' }),

  makeMCQ({ id:'g4sci-enr-ani-004', chapterId:'g4sci-enr-animals', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Pteropus_niger.JPG" alt="A flying mammal" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>What animal is shown in this picture?</b>',
    options:['Mauritian Flying Fox (Fruit Bat)','Eagle','Pink Pigeon','Barn Owl'],
    answer:'Mauritian Flying Fox (Fruit Bat)',
    hint:'This is Mauritius\'s only native land mammal — it is a large bat that feeds on fruit.',
    explanation:'The <b>Mauritian Flying Fox</b> (Pteropus niger) is a large fruit bat and Mauritius\'s only native land mammal. It plays a vital role in pollinating plants and spreading seeds across the island\'s forests. It is active mainly at dusk and night.' }),

  makeMCQ({ id:'g4sci-enr-ani-005', chapterId:'g4sci-enr-animals', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Aldabra.giant.tortoise.arp.jpg" alt="A large reptile" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>What animal is shown in this picture?</b>',
    options:['Giant Tortoise','Crocodile','Sea Turtle','Iguana'],
    answer:'Giant Tortoise',
    hint:'This very large reptile has a thick shell and can live for over 100 years.',
    explanation:'The <b>Aldabra Giant Tortoise</b> (Aldabrachelys gigantea) is one of the largest tortoises in the world. Giant tortoises were once native to Mauritius too but became extinct there. They still live on Aldabra Atoll (Seychelles) and some are kept in Mauritian nature parks as a conservation symbol.' }),

  makeMCQ({ id:'g4sci-enr-ani-006', chapterId:'g4sci-enr-animals', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:14px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Mauritius_ornate_day_gecko_%28Phelsuma_ornata%29.jpg" alt="A small reptile" style="max-height:200px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.18)"></div><b>What reptile endemic to Mauritius is shown here?</b>',
    options:['Mauritius Ornate Day Gecko','Chameleon','Iguana','Common House Gecko'],
    answer:'Mauritius Ornate Day Gecko',
    hint:'This bright green gecko (Phelsuma ornata) is found only on Mauritius.',
    explanation:'The <b>Mauritius Ornate Day Gecko</b> (Phelsuma ornata) is a species of day gecko endemic to Mauritius. It is active during the day (unlike most geckos) and can be recognised by its vibrant green colour with red and blue markings. It feeds on nectar, pollen, and small insects, and is an important pollinator.' }),

  // ── Text-based questions ─────────────────────────────────────────────────────

  makeMCQ({ id:'g4sci-enr-ani-007', chapterId:'g4sci-enr-animals', difficulty:1,
    question:'In a food chain, what name is given to the first living thing — the one that makes its own food using sunlight?',
    options:['Producer','Consumer','Predator','Decomposer'],
    answer:'Producer',
    hint:'Plants make their own food through photosynthesis.',
    explanation:'A <b>producer</b> is a living thing that makes its own food using sunlight — usually a green plant. In every food chain, energy starts with a producer. Example: <b>Grass → Grasshopper → Frog → Eagle</b>. Grass is the producer.' }),

  makeMCQ({ id:'g4sci-enr-ani-008', chapterId:'g4sci-enr-animals', difficulty:1,
    question:'What do we call an animal that eats <b>only plants</b>?',
    options:['Herbivore','Carnivore','Omnivore','Predator'],
    answer:'Herbivore',
    hint:'Think: "herb" means plant.',
    explanation:'A <b>herbivore</b> is an animal that eats only plants. Examples include cows, rabbits, deer, and elephants. In the food chain, herbivores are the first consumers (they eat the producers).' }),

  makeMCQ({ id:'g4sci-enr-ani-009', chapterId:'g4sci-enr-animals', difficulty:1,
    question:'What do we call an animal that eats <b>only other animals</b>?',
    options:['Carnivore','Herbivore','Omnivore','Producer'],
    answer:'Carnivore',
    hint:'"Carn" means meat or flesh.',
    explanation:'A <b>carnivore</b> is an animal that eats only other animals (meat). Examples include lions, sharks, eagles, and crocodiles. Carnivores are usually predators at or near the top of a food chain.' }),

  makeMCQ({ id:'g4sci-enr-ani-010', chapterId:'g4sci-enr-animals', difficulty:1,
    question:'What do we call an animal that eats <b>both plants and animals</b>?',
    options:['Omnivore','Herbivore','Carnivore','Scavenger'],
    answer:'Omnivore',
    hint:'"Omni" means "all" or "everything".',
    explanation:'An <b>omnivore</b> eats both plants and animals. Examples include humans, pigs, bears, and crows. Omnivores are very adaptable because they can eat from many food sources.' }),

  makeMCQ({ id:'g4sci-enr-ani-011', chapterId:'g4sci-enr-animals', difficulty:2,
    question:'In the food chain: <b>Seagrass → Sea urchin → Fish → Shark</b>, what is the role of the shark?',
    options:['Top predator (it hunts but is not hunted in this chain)','Producer','Herbivore (first consumer)','Decomposer'],
    answer:'Top predator (it hunts but is not hunted in this chain)',
    hint:'The shark is at the very end of this food chain.',
    explanation:'In the chain <b>Seagrass → Sea urchin → Fish → Shark</b>, the <b>shark</b> is the <b>top predator</b>. It hunts fish and is not hunted by anything else in this chain. The seagrass is the producer; the sea urchin and fish are consumers.' }),

  makeMCQ({ id:'g4sci-enr-ani-012', chapterId:'g4sci-enr-animals', difficulty:2,
    question:'Which habitat in Mauritius would you most likely find coral reef fish?',
    options:['The ocean (sea / lagoon)','A freshwater river','A mountain forest','A sugarcane field'],
    answer:'The ocean (sea / lagoon)',
    hint:'Coral reefs form underwater in warm, clear, shallow seawater.',
    explanation:'Coral reef fish live in <b>the ocean</b> — specifically in the warm, shallow lagoons inside Mauritius\'s coral reef. Mauritius is surrounded by a beautiful barrier reef that provides habitat for hundreds of colourful fish and marine creatures.' }),

  makeMCQ({ id:'g4sci-enr-ani-013', chapterId:'g4sci-enr-animals', difficulty:2,
    question:'What does the word "<b>endemic</b>" mean when describing an animal like the Pink Pigeon?',
    options:['Found naturally in one specific place and nowhere else in the wild','Almost extinct and nearly gone forever','Dangerous to humans and other animals','Living only in water habitats'],
    answer:'Found naturally in one specific place and nowhere else in the wild',
    hint:'The Pink Pigeon lives wild only on Mauritius — not on any other island or continent.',
    explanation:'"<b>Endemic</b>" means an animal (or plant) is found naturally in only one specific place — such as a single island or country — and does not exist wild anywhere else in the world. The Pink Pigeon and Echo Parakeet are endemic to Mauritius.' }),

  makeMCQ({ id:'g4sci-enr-ani-014', chapterId:'g4sci-enr-animals', difficulty:2,
    question:'Why did the Dodo become extinct?',
    options:['Hunting by humans and destruction of its habitat and eggs by introduced animals','A volcanic eruption destroyed all the forests of Mauritius','Climate change made the island too hot for the Dodo to survive','A disease spread by migrating birds wiped out the Dodo population'],
    answer:'Hunting by humans and destruction of its habitat and eggs by introduced animals',
    hint:'The Dodo could not fly and had no natural fear of humans — making it easy to hunt.',
    explanation:'The <b>Dodo</b> became extinct around 1681. Because it was flightless and had no natural predators before humans arrived, it had no fear of people and was easy to hunt for food. Rats, pigs, and monkeys brought by settlers destroyed its eggs and young. Deforestation also removed its forest habitat.' }),

  makeMCQ({ id:'g4sci-enr-ani-015', chapterId:'g4sci-enr-animals', difficulty:2,
    question:'What is an "<b>endangered</b>" species?',
    options:['A species at serious risk of becoming extinct if nothing is done to protect it','A species that has already become completely extinct','A species that is dangerous and harmful to humans','A species that can only be found living in zoos'],
    answer:'A species at serious risk of becoming extinct if nothing is done to protect it',
    hint:'Think about what "in danger" means for a living species.',
    explanation:'An <b>endangered species</b> is one whose population has fallen so low that it is at serious risk of extinction. The Pink Pigeon and Echo Parakeet of Mauritius are classified as endangered. Conservation efforts can save endangered species before they go the way of the Dodo.' }),

  makeMCQ({ id:'g4sci-enr-ani-016', chapterId:'g4sci-enr-animals', difficulty:3,
    question:'Which adaptation helps the Mauritian Flying Fox (fruit bat) find ripe fruit at night?',
    options:['A highly developed sense of smell and keen eyesight','Echolocation — sending out sound pulses like insect-eating bats','The ability to see colours of fruit in total darkness without any light','A long sticky tongue that can feel the shape of fruit from a distance'],
    answer:'A highly developed sense of smell and keen eyesight',
    hint:'It is a fruit bat — it locates ripe fruit mainly by smell and sight, not echolocation.',
    explanation:'Unlike insect-eating bats, <b>fruit bats (flying foxes)</b> rely mainly on their highly developed <b>sense of smell and large eyes</b> to locate ripe fruit at night. They are vital pollinators and seed dispersers in Mauritius — helping forests regenerate by carrying seeds across the island.' }),

  makeMCQ({ id:'g4sci-enr-ani-017', chapterId:'g4sci-enr-animals', difficulty:3,
    question:'In a pond food chain, if all the frogs suddenly disappeared, what would most likely happen?',
    options:['Grasshoppers would increase in number while herons would decrease in number','The grass in the pond would disappear completely','Herons would grow much larger in size','Nothing would change — all other animals would adapt immediately'],
    answer:'Grasshoppers would increase in number while herons would decrease in number',
    hint:'Frogs eat grasshoppers (prey) and are eaten by herons (predators).',
    explanation:'If frogs disappeared: <b>grasshoppers</b> (which frogs eat) would <b>increase</b> because they have fewer predators. Meanwhile, <b>herons</b> (which eat frogs) would have less food and their numbers would <b>decrease</b>. This shows how removing one link in a food chain affects the whole ecosystem.' }),

  makeMCQ({ id:'g4sci-enr-ani-018', chapterId:'g4sci-enr-animals', difficulty:3,
    question:'Which of the following is a good example of an <b>adaptation</b> that helps a fish survive underwater?',
    options:['Gills that absorb dissolved oxygen from the water','Large lungs for breathing air at the surface','A thick layer of fur for warmth in cold water','Wings to leap clear of the water and fly to safety'],
    answer:'Gills that absorb dissolved oxygen from the water',
    hint:'Fish need to "breathe" underwater — but not with lungs like we have.',
    explanation:'Fish have <b>gills</b> which extract dissolved oxygen directly from the water. This is an <b>adaptation</b> — a feature that makes an animal well suited to its habitat. Gills allow fish to "breathe" without ever coming to the surface, making them perfectly adapted to an aquatic life.' }),

  makeMCQ({ id:'g4sci-enr-ani-019', chapterId:'g4sci-enr-animals', difficulty:4,
    question:'Which statement BEST explains why conserving endemic animals like the Echo Parakeet is important?',
    options:[
      'If they go extinct they are gone forever — they cannot be brought back and biodiversity is permanently lost',
      'They are useful for making medicines and should be kept in zoos for scientific research only',
      'They help to control the weather on the island by living in the forest canopy and releasing moisture',
      'They attract tourists who pay to see them, so protecting them is mainly for economic benefit'
    ],
    answer:'If they go extinct they are gone forever — they cannot be brought back and biodiversity is permanently lost',
    hint:'Think about what "extinction" means permanently for the planet.',
    explanation:'When an endemic species like the <b>Echo Parakeet</b> goes extinct, it is <b>gone forever</b> — no other place in the world has them. Extinction permanently reduces <b>biodiversity</b> (the variety of life on Earth), which weakens ecosystems and removes species that may have roles we do not fully understand yet. This is the most fundamental reason for conservation.' })

);
