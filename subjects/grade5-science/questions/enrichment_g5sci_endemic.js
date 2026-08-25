'use strict';
// Grade 5 Science - Enrichment: Mauritius Endemic Species
// Photo identification of rare and endemic animals and plants of Mauritius.
// @enrichment — Derived from Animals & Habitats and Conservation chapters.
// IDs format: g5sci-enr-end-NNN

STATIC_QUESTIONS.push(

  /* ── PHOTO IDENTIFICATION (questions 001–006) ─────────────────────────── */

  makeMCQ({ id:'g5sci-enr-end-001', chapterId:'g5sci-enr-endemic', difficulty:1,
    question:'<img src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Pink_pigeon_%28Nesoenas_mayeri%29_1.jpg" alt="A pale pink dove perched on a branch" style="max-width:320px;border-radius:8px;display:block;margin:0 auto 10px"><br>This endangered bird is endemic to Mauritius. What is its name?',
    options:['Pink Pigeon','Common Wood Pigeon','Turtle Dove','Mauritius Dove'],
    answer:'Pink Pigeon',
    hint:'Its name describes its soft, rosy plumage. It is found ONLY in Mauritius.',
    explanation:'This is the <b>Pink Pigeon</b> (<i>Nesoenas mayeri</i>), an endangered bird endemic to Mauritius. It came very close to extinction in the 1990s when fewer than 10 wild birds remained. Thanks to breeding programmes and nature reserves, its population has recovered to several hundred.' }),

  makeMCQ({ id:'g5sci-enr-end-002', chapterId:'g5sci-enr-endemic', difficulty:1,
    question:'<img src="https://upload.wikimedia.org/wikipedia/commons/3/36/Echo_parakeet_%28Psittacula_eques_echo%29_-at_Durrell_Trust.jpg" alt="A bright green parrot with a red beak" style="max-width:320px;border-radius:8px;display:block;margin:0 auto 10px"><br>This green parrot is the only surviving parrot species endemic to Mauritius. What is it called?',
    options:['Echo Parakeet','Rose-ringed Parakeet','Alexandrine Parakeet','Rainbow Lorikeet'],
    answer:'Echo Parakeet',
    hint:'It is Mauritius\'s only native parrot and was once listed as critically endangered.',
    explanation:'This is the <b>Echo Parakeet</b> (<i>Psittacula eques</i>), found only in Mauritius. It is the last surviving endemic parrot of the Mascarene Islands and was once the world\'s rarest parrot, with fewer than 20 individuals in the 1980s. Intensive conservation work has raised its numbers to several hundred.' }),

  makeMCQ({ id:'g5sci-enr-end-003', chapterId:'g5sci-enr-endemic', difficulty:2,
    question:'<img src="https://upload.wikimedia.org/wikipedia/commons/f/f4/Pezophaps_solitaria.jpg" alt="An artistic reconstruction of a large flightless bird" style="max-width:320px;border-radius:8px;display:block;margin:0 auto 10px"><br>This illustration shows a large flightless bird that was endemic to Rodrigues and is now extinct. What was this bird called?',
    options:['Rodrigues Solitaire','Dodo','Rodrigues Rail','Mauritius Blue Pigeon'],
    answer:'Rodrigues Solitaire',
    hint:'It lived on the island of Rodrigues, not Mauritius. It was related to the Dodo.',
    explanation:'This illustration shows the <b>Rodrigues Solitaire</b> (<i>Pezophaps solitaria</i>), a large flightless bird that was endemic to the island of Rodrigues. Like the Dodo of Mauritius, it became extinct in the 18th century due to hunting by sailors and the introduction of rats and other predators.' }),

  makeMCQ({ id:'g5sci-enr-end-004', chapterId:'g5sci-enr-endemic', difficulty:1,
    question:'<img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Pteropus_niger.JPG" alt="A large dark fruit bat hanging from a branch" style="max-width:320px;border-radius:8px;display:block;margin:0 auto 10px"><br>This large bat is endemic to Mauritius and plays an important role in pollinating trees. What is it called?',
    options:['Mauritius Flying Fox','Common Bat','Indian Fruit Bat','African Straw-coloured Bat'],
    answer:'Mauritius Flying Fox',
    hint:'It is sometimes called the Mauritius fruit bat and is the largest native mammal in Mauritius.',
    explanation:'This is the <b>Mauritius Flying Fox</b> (<i>Pteropus niger</i>), the largest native land animal of Mauritius. It is a fruit bat that feeds on fruit and nectar, making it an important <b>pollinator</b> and <b>seed disperser</b> for Mauritius\'s forests. It is classified as endangered due to habitat loss and culling.' }),

  makeMCQ({ id:'g5sci-enr-end-005', chapterId:'g5sci-enr-endemic', difficulty:1,
    question:'<img src="https://upload.wikimedia.org/wikipedia/commons/6/67/Trochetia_boutoniana_flower.jpg" alt="Bright red tubular flowers with distinctive petals" style="max-width:320px;border-radius:8px;display:block;margin:0 auto 10px"><br>This beautiful red flower is the national flower of Mauritius and is endemic to the island. What is its name?',
    options:['Trochetia boutoniana (Boucle d\'oreille)','Hibiscus','Red Anthurium','Flame of the Forest'],
    answer:'Trochetia boutoniana (Boucle d\'oreille)',
    hint:'Its Creole name "boucle d\'oreille" means earring in English.',
    explanation:'This is <b>Trochetia boutoniana</b>, known locally as <b>Boucle d\'Oreille</b> (earring flower). It is Mauritius\'s <b>national flower</b> and is endemic to the island, meaning it is found nowhere else in the world. It is endangered in the wild, growing mainly on cliff faces in the Black River area.' }),

  makeMCQ({ id:'g5sci-enr-end-006', chapterId:'g5sci-enr-endemic', difficulty:2,
    question:'<img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Mauritius_kestrel_%28Falco_punctatus%29_2.jpg" alt="A small speckled falcon perched on a branch" style="max-width:320px;border-radius:8px;display:block;margin:0 auto 10px"><br>This small falcon was once declared the world\'s rarest bird. It is endemic to Mauritius. What is it called?',
    options:['Mauritius Kestrel','Common Kestrel','Peregrine Falcon','Mauritius Sparrowhawk'],
    answer:'Mauritius Kestrel',
    hint:'By 1974, only four of these birds existed in the wild.',
    explanation:'This is the <b>Mauritius Kestrel</b> (<i>Falco punctatus</i>), a small falcon endemic to Mauritius. In 1974, it was declared the <b>world\'s rarest bird</b> with only 4 wild individuals remaining. An intensive captive-breeding programme led by Carl Jones saved the species. Its population has now recovered to several hundred birds, making it one of the greatest conservation success stories in the world.' }),

  /* ── TEXT-BASED MCQs (questions 007–017) ─────────────────────────────── */

  makeMCQ({ id:'g5sci-enr-end-007', chapterId:'g5sci-enr-endemic', difficulty:1,
    question:'What does the word "endemic" mean when describing a plant or animal?',
    options:[
      'It is found only in one specific place in the world and nowhere else naturally',
      'It is a dangerous species that threatens other animals',
      'It was brought to the island from another country by settlers',
      'It is common and widespread across many countries'
    ],
    answer:'It is found only in one specific place in the world and nowhere else naturally',
    hint:'The prefix "en-" suggests "in" or "within" a specific place.',
    explanation:'<b>Endemic</b> means that a species is <b>native to and found only in one specific geographic location</b> — such as a single island, country, or region — and does not occur naturally anywhere else in the world. Mauritius has many endemic species because it has been isolated in the Indian Ocean for millions of years.' }),

  makeMCQ({ id:'g5sci-enr-end-008', chapterId:'g5sci-enr-endemic', difficulty:2,
    question:'Which of the following is the MAIN reason why so many endemic species of Mauritius became endangered or extinct after humans arrived?',
    options:[
      'Deforestation removed their habitat AND introduced animals (rats, cats, monkeys) preyed on their eggs and young',
      'The animals were too friendly and allowed themselves to be caught easily',
      'A large volcanic eruption destroyed most of the island\'s forests',
      'Climate change caused temperatures to rise, killing off most species'
    ],
    answer:'Deforestation removed their habitat AND introduced animals (rats, cats, monkeys) preyed on their eggs and young',
    hint:'Two combined threats caused the most damage: habitat loss and new predators.',
    explanation:'Endemic species of Mauritius suffered from two main threats after human settlement: (1) <b>Deforestation</b> — settlers cleared most of Mauritius\'s native forests for farming and building, destroying the habitat of native animals; (2) <b>Introduced predators</b> — rats, cats, dogs, pigs and macaque monkeys arrived with settlers and ate the eggs and chicks of ground-nesting birds that had evolved without any predators and had no natural defences.' }),

  makeMCQ({ id:'g5sci-enr-end-009', chapterId:'g5sci-enr-endemic', difficulty:1,
    question:'What is the Black River Gorges National Park in Mauritius?',
    options:[
      'A large protected area of native forest that conserves endemic plants and animals',
      'A tourist beach resort on the west coast of Mauritius',
      'A factory reserve where sugar cane is processed',
      'An underwater marine reserve protecting coral reefs'
    ],
    answer:'A large protected area of native forest that conserves endemic plants and animals',
    hint:'It is the largest national park in Mauritius, covering the south-west uplands.',
    explanation:'<b>Black River Gorges National Park</b> is the largest national park in Mauritius, covering over 6,500 hectares of native forest in the south-west of the island. It protects endemic species including the Pink Pigeon, Echo Parakeet, Mauritius Kestrel and many endemic plants. It is a key site for conservation and eco-tourism.' }),

  makeMCQ({ id:'g5sci-enr-end-010', chapterId:'g5sci-enr-endemic', difficulty:2,
    question:'What is special about Île aux Aigrettes as a conservation site?',
    options:[
      'It is a coral island being restored to its original state with endemic species reintroduced',
      'It is a factory island where animal food supplements are produced',
      'It is an island exclusively for tourists to see caged rare animals',
      'It is a volcanic island with a crater lake that attracts rare birds naturally'
    ],
    answer:'It is a coral island being restored to its original state with endemic species reintroduced',
    hint:'This small island off south-east Mauritius is being managed to recreate the ancient ecosystem.',
    explanation:'<b>Île aux Aigrettes</b> is a small coral island off the south-east coast of Mauritius. The Mauritian Wildlife Foundation manages it as a <b>nature restoration project</b>: introduced predators (rats, cats) have been removed, and endemic species such as Pink Pigeons and Giant Aldabra Tortoises (acting as replacements for the extinct Mauritius Giant Tortoise) have been reintroduced, recreating how the island looked before humans arrived.' }),

  makeMCQ({ id:'g5sci-enr-end-011', chapterId:'g5sci-enr-endemic', difficulty:2,
    question:'Which of the following conservation measures helps protect the Echo Parakeet in Mauritius?',
    options:[
      'Removing invasive predators from nesting areas and using nest boxes to increase breeding success',
      'Keeping all Echo Parakeets in large glass cages in Port Louis',
      'Feeding them only imported food to keep them healthy',
      'Moving their nests from trees to underground burrows for safety'
    ],
    answer:'Removing invasive predators from nesting areas and using nest boxes to increase breeding success',
    hint:'Conservation involves making the wild environment safer for the birds to breed.',
    explanation:'Conservation of the Echo Parakeet involves: (1) <b>Removing invasive predators</b> (rats, macaques) from nesting areas; (2) Providing <b>nest boxes</b> in tall trees to give safe nesting sites; (3) Supplementary feeding during scarce seasons; (4) Hand-rearing chicks when parents fail. This combination of actions helped the population recover from fewer than 20 to several hundred birds.' }),

  makeMCQ({ id:'g5sci-enr-end-012', chapterId:'g5sci-enr-endemic', difficulty:1,
    question:'The Dodo became extinct in the late 17th century. Which TWO factors caused its extinction?',
    options:[
      'Hunting by sailors AND predation by introduced animals such as rats and pigs',
      'A volcanic eruption AND flooding of its habitat',
      'Disease brought by parrots AND too much rain',
      'Competition with imported chickens AND overheating due to climate change'
    ],
    answer:'Hunting by sailors AND predation by introduced animals such as rats and pigs',
    hint:'The Dodo was unafraid of humans and had no experience of ground predators.',
    explanation:'The <b>Dodo</b> became extinct due to: (1) <b>Hunting</b> — sailors found it easy to catch because it had evolved without predators and was unafraid of humans; (2) <b>Introduced animals</b> — rats, pigs and other animals brought by sailors ate the Dodo\'s eggs and chicks, which were laid in ground-level nests. The last confirmed sighting was in 1662.' }),

  makeMCQ({ id:'g5sci-enr-end-013', chapterId:'g5sci-enr-endemic', difficulty:3,
    question:'Why do island species like those of Mauritius tend to become extinct more easily than mainland species?',
    options:[
      'Island species evolved in isolation without predators, so they have no defences and small populations with nowhere to retreat to',
      'Island species are much smaller than mainland species and cannot compete',
      'Islands receive less sunlight, so island plants grow more slowly',
      'Island animals reproduce less frequently than mainland animals'
    ],
    answer:'Island species evolved in isolation without predators, so they have no defences and small populations with nowhere to retreat to',
    hint:'Islands are isolated — what pressures did species face, and what happened when new threats arrived?',
    explanation:'Island species evolve in <b>isolation</b> over millions of years. Because there were no predators, Mauritius birds (like the Dodo) lost the ability to fly and lost fear of predators. When humans arrived, these species: (1) Had <b>no natural defences</b> against new predators; (2) Lived in <b>small populations</b> on a limited island with nowhere to flee; (3) Had <b>slow reproduction rates</b>. All these factors make island endemics extremely vulnerable to extinction once new threats arrive.' }),

  makeMCQ({ id:'g5sci-enr-end-014', chapterId:'g5sci-enr-endemic', difficulty:2,
    question:'Which organisation leads conservation work for endangered wildlife in Mauritius, including Pink Pigeons and Echo Parakeets?',
    options:['Mauritian Wildlife Foundation','Mauritius Sugar Industry Research Institute','UNESCO Mauritius Office','National Parks and Conservation Service only'],
    answer:'Mauritian Wildlife Foundation',
    hint:'This non-governmental organisation works specifically on Mauritius wildlife.',
    explanation:'The <b>Mauritian Wildlife Foundation (MWF)</b> is the leading organisation for wildlife conservation in Mauritius. It runs captive breeding programmes, manages Île aux Aigrettes, and coordinates predator control and nest monitoring for endangered endemic species such as the Pink Pigeon, Echo Parakeet and Mauritius Kestrel.' }),

  makeMCQ({ id:'g5sci-enr-end-015', chapterId:'g5sci-enr-endemic', difficulty:3,
    question:'A nature reserve on a small island removes all introduced predators and plants only native trees. Over 20 years, the Pink Pigeon population increases from 8 to 120. What are TWO reasons for this population increase?',
    options:[
      'Fewer predators kill fewer birds AND native trees provide better food and nesting sites',
      'The birds flew in from other islands AND the climate became warmer',
      'Pink Pigeons became larger and stronger due to better food AND they started breeding earlier in life',
      'Scientists gave the birds medicine AND built artificial nesting towers'
    ],
    answer:'Fewer predators kill fewer birds AND native trees provide better food and nesting sites',
    hint:'Think about what was limiting the population: death rate and food/habitat quality.',
    explanation:'Two key reasons for the population increase: (1) <b>Fewer predators</b> — removing rats and cats means fewer eggs, chicks and adult birds are killed, so the <b>death rate falls</b> while the birth rate remains the same; (2) <b>Native trees</b> provide the <b>natural fruits and seeds</b> Pink Pigeons evolved to eat, improving nutrition and breeding success, and they provide appropriate nesting sites. Together, lower deaths and better breeding conditions explain the rapid population growth.' }),

  makeMCQ({ id:'g5sci-enr-end-016', chapterId:'g5sci-enr-endemic', difficulty:2,
    question:'Mauritius\'s national flower, Trochetia boutoniana, grows mainly on cliff faces. Why does growing on cliff faces help it survive?',
    options:[
      'Cliff faces are difficult for introduced deer, rabbits and other herbivores to reach, so the plant is protected from being eaten',
      'Cliff faces receive more rainfall so the plant grows faster',
      'Cliff faces are warmer and the plant needs heat to flower',
      'Cliff faces are near the sea and the salt air helps the plant grow'
    ],
    answer:'Cliff faces are difficult for introduced deer, rabbits and other herbivores to reach, so the plant is protected from being eaten',
    hint:'Think about what threatens plants in accessible areas of Mauritius.',
    explanation:'<i>Trochetia boutoniana</i> grows mainly on steep cliff faces because these locations are <b>inaccessible to introduced herbivores</b> such as deer and rabbits, which would otherwise eat the plant. In areas that animals can reach, the national flower has nearly disappeared. The cliff face acts as a natural refuge.' }),

  makeMCQ({ id:'g5sci-enr-end-017', chapterId:'g5sci-enr-endemic', difficulty:4,
    question:'A student says: "We should spend money on human problems, not on saving rare birds." Give the BEST scientific argument for why saving endemic species matters.',
    options:[
      'Endemic species are part of a balanced ecosystem — losing one species can trigger a chain reaction affecting plants, insects and other animals that humans also depend on',
      'Rare birds are beautiful and tourists pay to see them, so they are economically useful',
      'Scientists need rare birds for experiments in laboratories',
      'It is important to save them so future generations can see them in zoos'
    ],
    answer:'Endemic species are part of a balanced ecosystem — losing one species can trigger a chain reaction affecting plants, insects and other animals that humans also depend on',
    hint:'Think beyond the individual species — what role does it play in the ecosystem?',
    explanation:'Endemic species are part of <b>interconnected ecosystems</b>. For example, the Mauritius Flying Fox pollinates and disperses seeds of native trees; losing it would affect forest regeneration. The Echo Parakeet is part of forest food webs. <b>Biodiversity loss creates cascade effects</b>: when one species disappears, it can cause the decline of others, destabilising ecosystems that provide clean water, clean air, soil fertility and food — resources humans depend on. Conservation is ultimately about protecting the health of the whole system, not just individual species.' })

);
