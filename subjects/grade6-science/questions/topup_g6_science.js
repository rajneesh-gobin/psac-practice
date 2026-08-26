'use strict';
// Grade 6 Science — top-up questions.

// --- g6-conservation (8 questions: g6sc-cons-050..057) ---
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g6sc-cons-050', chapterId:'g6-conservation', subsection:'pollution', difficulty:1,
    question:'Which gas is the main cause of the greenhouse effect on Earth?',
    options:['Oxygen','Carbon dioxide','Nitrogen','Hydrogen'],
    answer:'Carbon dioxide',
    hint:'This gas is released when fossil fuels are burned.',
    explanation:'Carbon dioxide (CO₂) traps heat in the atmosphere, preventing it from escaping into space. This is the main driver of the greenhouse effect and global warming.' }),

  makeMCQ({ id:'g6sc-cons-051', chapterId:'g6-conservation', subsection:'endangered', difficulty:1,
    question:'Which national park in Mauritius protects endangered wildlife such as the Pink Pigeon and Echo Parakeet?',
    options:['Pamplemousses Botanical Garden','Black River Gorges National Park','Ile aux Aigrettes Reserve','Mahebourg Waterfront Park'],
    answer:'Black River Gorges National Park',
    hint:'This park is Mauritius\'s most important nature reserve for endemic wildlife.',
    explanation:'Black River Gorges National Park is Mauritius\'s main nature reserve. It protects endemic species including the Pink Pigeon, Echo Parakeet, and Mauritius Kestrel.' }),

  makeMCQ({ id:'g6sc-cons-052', chapterId:'g6-conservation', subsection:'deforestation', difficulty:2,
    question:'What is the main consequence of deforestation on soil?',
    options:['The soil becomes more fertile','Soil erosion increases','More water is stored in the soil','The soil temperature decreases'],
    answer:'Soil erosion increases',
    hint:'Without tree roots, what holds the soil in place during heavy rain?',
    explanation:'Tree roots bind soil particles together. When trees are removed, rainfall washes the topsoil away — a process called soil erosion. This damages farmland and causes flooding.' }),

  makeMCQ({ id:'g6sc-cons-053', chapterId:'g6-conservation', subsection:'pollution', difficulty:1,
    question:'Which type of pollution is caused by oil spills at sea?',
    options:['Air pollution','Land pollution','Water pollution','Noise pollution'],
    answer:'Water pollution',
    hint:'Oil spills occur in the ocean.',
    explanation:'Oil spills pollute water, coating the feathers of seabirds, clogging the gills of fish, and smothering coral reefs. They are a major form of water pollution.' }),

  makeMCQ({ id:'g6sc-cons-054', chapterId:'g6-conservation', subsection:'recycling', difficulty:2,
    question:'Of the 3 Rs — Reduce, Reuse, Recycle — which is considered the MOST effective way to conserve resources?',
    options:['Recycle','Reuse','Reduce','All three are equally effective'],
    answer:'Reduce',
    hint:'The best approach is to avoid creating waste in the first place.',
    explanation:'"Reduce" is the most effective because it means using fewer resources and creating less waste from the start, rather than managing waste after it has already been produced.' }),

  makeMCQ({ id:'g6sc-cons-055', chapterId:'g6-conservation', subsection:'pollution', difficulty:2,
    question:'A person\'s carbon footprint refers to the total amount of ______ they produce through their daily activities.',
    options:['Plastic waste','Water used','Greenhouse gases','Noise'],
    answer:'Greenhouse gases',
    hint:'It is measured in tonnes of CO₂ equivalent.',
    explanation:'A carbon footprint measures the total greenhouse gases (mainly CO₂) released by a person\'s actions — such as travel, electricity use, and food choices. Reducing it helps slow climate change.' }),

  makeMCQ({ id:'g6sc-cons-056', chapterId:'g6-conservation', subsection:'pollution', difficulty:3,
    question:'Which of the following best explains how the greenhouse effect leads to global warming?',
    options:[
      'The ozone layer reflects sunlight back into space, heating the surface',
      'Carbon dioxide in the atmosphere traps heat that would otherwise escape into space',
      'The Sun produces more energy than it did in the past',
      'Oceans absorb all the heat from the Sun and then release it'],
    answer:'Carbon dioxide in the atmosphere traps heat that would otherwise escape into space',
    hint:'Think about what CO₂ does to heat trying to leave Earth\'s atmosphere.',
    explanation:'CO₂ and other greenhouse gases act like a blanket — they let sunlight through to warm Earth\'s surface, but trap the resulting heat (infrared radiation) so it cannot escape into space, causing temperatures to rise.' }),

  makeMCQ({ id:'g6sc-cons-057', chapterId:'g6-conservation', subsection:'pollution', difficulty:4,
    question:'A factory produces 120 kg of waste per day. After introducing a recycling programme, it recycles 35% of its waste. How many kilograms of waste does it now send to landfill each day?',
    options:['42 kg','78 kg','85 kg','35 kg'],
    answer:'78 kg',
    hint:'Find 35% of 120 first, then subtract from 120.',
    explanation:'35% of 120 = 0.35 × 120 = 42 kg recycled. Waste sent to landfill = 120 − 42 = 78 kg per day.' })
);

// --- g6-solar-system (6 questions: g6sc-sol-050..055) ---
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g6sc-sol-050', chapterId:'g6-solar-system', subsection:'planets', difficulty:1,
    question:'Which planet is known as the Red Planet because of iron oxide on its surface?',
    options:['Jupiter','Saturn','Mars','Venus'],
    answer:'Mars',
    hint:'Iron oxide is commonly known as rust.',
    explanation:'Mars appears red because its surface is covered with iron oxide (rust). It is the fourth planet from the Sun and has two small moons, Phobos and Deimos.' }),

  makeMCQ({ id:'g6sc-sol-051', chapterId:'g6-solar-system', subsection:'planets', difficulty:1,
    question:'Approximately how many days does the Moon take to complete one full orbit around Earth?',
    options:['7 days','14 days','28 days','365 days'],
    answer:'28 days',
    hint:'This is approximately one lunar month.',
    explanation:'The Moon takes about 28 days (roughly 4 weeks) to orbit Earth once. This is why we see a complete cycle of moon phases — from new moon to full moon and back — each month.' }),

  makeMCQ({ id:'g6sc-sol-052', chapterId:'g6-solar-system', subsection:'sun_moon', difficulty:2,
    question:'During a lunar eclipse, which object comes between the Sun and the Moon?',
    options:['Venus','Mars','Earth','A comet'],
    answer:'Earth',
    hint:'The Moon passes through Earth\'s shadow.',
    explanation:'A lunar eclipse occurs when Earth moves directly between the Sun and the Moon, casting Earth\'s shadow on the Moon. The Moon can appear red-orange during a total lunar eclipse.' }),

  makeMCQ({ id:'g6sc-sol-053', chapterId:'g6-solar-system', subsection:'planets', difficulty:2,
    question:'What causes day and night on Earth?',
    options:[
      'Earth revolving around the Sun once a year',
      'The Moon blocking sunlight from reaching Earth',
      'Earth rotating on its own axis once every 24 hours',
      'Clouds covering the Sun at night'],
    answer:'Earth rotating on its own axis once every 24 hours',
    hint:'This movement takes 24 hours to complete.',
    explanation:'Earth spins (rotates) on its axis once every 24 hours. The side of Earth facing the Sun experiences day; the side facing away from the Sun experiences night.' }),

  makeMCQ({ id:'g6sc-sol-054', chapterId:'g6-solar-system', subsection:'planets', difficulty:1,
    question:'How many planets are currently recognised in our Solar System?',
    options:['7','8','9','10'],
    answer:'8',
    hint:'Pluto was reclassified as a dwarf planet in 2006.',
    explanation:'There are 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Pluto was reclassified as a dwarf planet in 2006 and is no longer counted.' }),

  makeMCQ({ id:'g6sc-sol-055', chapterId:'g6-solar-system', subsection:'planets', difficulty:3,
    question:'During which phase of the Moon can we NOT see it from Earth, because its unlit side faces us?',
    options:['Full Moon','First Quarter','New Moon','Last Quarter'],
    answer:'New Moon',
    hint:'At this phase the Moon is positioned between Earth and the Sun.',
    explanation:'During a New Moon, the Moon lies between Earth and the Sun. The side of the Moon lit by the Sun faces away from Earth, so the Moon is invisible from Earth\'s surface.' })
);

// --- g6-plants (5 questions: g6sc-plt-050..054) ---
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g6sc-plt-050', chapterId:'g6-plants', subsection:'parts', difficulty:1,
    question:'What is the name of the national flower of Mauritius, an endemic plant found in Black River Gorges?',
    options:['Bougainvillea','Trochetia boutoniana','Latania palm','Tambourissa'],
    answer:'Trochetia boutoniana',
    hint:'Look for the option that is a native Mauritian endemic species rather than an introduced ornamental plant.',
    explanation:'Trochetia boutoniana is the national flower of Mauritius. It is an endemic species — found only in Mauritius — and grows mainly in the Black River Gorges region.' }),

  makeMCQ({ id:'g6sc-plt-051', chapterId:'g6-plants', subsection:'growth', difficulty:2,
    question:'In a food chain, what term is used for plants that make their own food using sunlight?',
    options:['Consumers','Decomposers','Producers','Predators'],
    answer:'Producers',
    hint:'They "produce" food through photosynthesis.',
    explanation:'Plants are called producers because they produce their own food through photosynthesis, using sunlight, water, and carbon dioxide. They are the starting point of every food chain.' }),

  makeMCQ({ id:'g6sc-plt-052', chapterId:'g6-plants', subsection:'parts', difficulty:2,
    question:'What is the role of decomposers such as fungi and bacteria in an ecosystem?',
    options:[
      'They produce food using sunlight',
      'They hunt and eat other animals',
      'They break down dead organisms and return nutrients to the soil',
      'They pollinate flowers so that plants can reproduce'],
    answer:'They break down dead organisms and return nutrients to the soil',
    hint:'They "decompose" — they break things down.',
    explanation:'Decomposers break down dead plants and animals, releasing nutrients back into the soil. These nutrients are then absorbed by plants, completing the nutrient cycle in an ecosystem.' }),

  makeMCQ({ id:'g6sc-plt-053', chapterId:'g6-plants', subsection:'photosynthesis', difficulty:1,
    question:'Which gas do plants absorb from the air during photosynthesis?',
    options:['Oxygen','Nitrogen','Carbon dioxide','Hydrogen'],
    answer:'Carbon dioxide',
    hint:'This is the same gas we breathe out.',
    explanation:'During photosynthesis, plants absorb carbon dioxide (CO₂) from the air. Combined with water and light energy, CO₂ is converted into glucose. Oxygen is released as a by-product.' }),

  makeMCQ({ id:'g6sc-plt-054', chapterId:'g6-plants', subsection:'parts', difficulty:3,
    question:'In the food chain: Grass → Grasshopper → Frog → Snake, if all the frogs were removed, what would most likely happen?',
    options:[
      'The grass would die because frogs fertilise it',
      'Grasshopper numbers would increase and snake numbers would decrease',
      'Snake numbers would increase because they now eat more grasshoppers',
      'Nothing would change — each organism feeds independently'],
    answer:'Grasshopper numbers would increase and snake numbers would decrease',
    hint:'Who eats grasshoppers? What do snakes eat in this chain?',
    explanation:'Without frogs, grasshoppers have no predator, so their numbers rise. Snakes lose their main food source (frogs), so their numbers fall. This demonstrates interdependence in food chains.' })
);

// --- g6sci-enr-ecosystems (14 questions: g6sc-enr-eco-050..063) ---
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g6sc-enr-eco-050', chapterId:'g6sci-enr-ecosystems', subsection:'habitats', difficulty:1,
    question:'In which type of water are coral reef ecosystems typically found?',
    options:['Cold, deep ocean water','Warm, shallow coastal water','Freshwater rivers and lakes','Polar ice-melt water'],
    answer:'Warm, shallow coastal water',
    hint:'Corals need sunlight to reach the seabed.',
    explanation:'Coral reefs grow in warm, shallow, clear coastal water where enough sunlight reaches the coral for the algae living inside it (zooxanthellae) to photosynthesise.' }),

  makeMCQ({ id:'g6sc-enr-eco-051', chapterId:'g6sci-enr-ecosystems', subsection:'habitats', difficulty:1,
    question:'What does the term "endemic" mean when describing a plant or animal?',
    options:[
      'Found all over the world',
      'Endangered and nearly extinct',
      'Found naturally only in one specific place on Earth',
      'Imported from another country'],
    answer:'Found naturally only in one specific place on Earth',
    hint:'The Pink Pigeon is endemic to Mauritius — it lives nowhere else.',
    explanation:'"Endemic" means a species occurs naturally only in one particular region. The Mauritius Kestrel, Echo Parakeet, and Pink Pigeon are all endemic to Mauritius.' }),

  makeMCQ({ id:'g6sc-enr-eco-052', chapterId:'g6sci-enr-ecosystems', subsection:'habitats', difficulty:2,
    question:'What is the main cause of coral bleaching in Mauritius\'s lagoons?',
    options:['Overfishing reducing the number of fish','Rising sea-water temperature linked to climate change','Underwater earthquakes shaking the reef','Excess sunlight during summer'],
    answer:'Rising sea-water temperature linked to climate change',
    hint:'This threat is linked to global warming.',
    explanation:'Coral bleaching occurs when ocean temperatures rise above normal. The coral expels the colourful algae living inside it, turning white (bleaching). Without the algae, coral may die.' }),

  makeMCQ({ id:'g6sc-enr-eco-053', chapterId:'g6sci-enr-ecosystems', subsection:'habitats', difficulty:1,
    question:'Which of the following is a living organism found in a coral reef ecosystem?',
    options:['Pine tree','Sea anemone','Cactus','Mushroom'],
    answer:'Sea anemone',
    hint:'It attaches to rocks underwater and has tentacles that sting prey.',
    explanation:'Sea anemones are marine animals that live in coral reef ecosystems. They often have a symbiotic relationship with clownfish. Pine trees, cacti, and mushrooms are land organisms.' }),

  makeMCQ({ id:'g6sc-enr-eco-054', chapterId:'g6sci-enr-ecosystems', subsection:'habitats', difficulty:2,
    question:'Which national park protects Mauritius\'s most important forest ecosystem, home to the Echo Parakeet?',
    options:['Mahebourg National Park','Black River Gorges National Park','Pamplemousses Botanical Garden','Rodrigues Nature Reserve'],
    answer:'Black River Gorges National Park',
    hint:'This park is Mauritius\'s largest protected area of native forest.',
    explanation:'Black River Gorges National Park covers about 6,500 hectares of native forest. It is the last refuge for endemic birds like the Echo Parakeet, Pink Pigeon, and Mauritius Kestrel.' }),

  makeMCQ({ id:'g6sc-enr-eco-055', chapterId:'g6sci-enr-ecosystems', subsection:'habitats', difficulty:2,
    question:'What is an invasive species?',
    options:[
      'A species that has lived in Mauritius since before humans arrived',
      'A non-native species introduced from elsewhere that spreads and harms native wildlife',
      'A species that is endangered and needs legal protection',
      'A species that only survives in ocean ecosystems'],
    answer:'A non-native species introduced from elsewhere that spreads and harms native wildlife',
    hint:'They come from outside and outcompete native species.',
    explanation:'Invasive species are non-native organisms introduced to an area (often by humans) that spread rapidly and damage local ecosystems by competing for food, space, and resources.' }),

  makeMCQ({ id:'g6sc-enr-eco-056', chapterId:'g6sci-enr-ecosystems', subsection:'habitats', difficulty:1,
    question:'What type of ecosystem is found inside the coral reef, with calm water and seagrass beds?',
    options:['River ecosystem','Mangrove ecosystem','Lagoon ecosystem','Open ocean ecosystem'],
    answer:'Lagoon ecosystem',
    hint:'The reef acts as a barrier protecting this sheltered body of water.',
    explanation:'A lagoon is a calm, shallow body of water enclosed or partly enclosed by the coral reef. It supports seagrass beds, sea turtles, and many fish species.' }),

  makeMCQ({ id:'g6sc-enr-eco-057', chapterId:'g6sci-enr-ecosystems', subsection:'food_webs', difficulty:3,
    question:'Food chain: Leaves → Caterpillar → Echo Parakeet → Hawk. If Echo Parakeet numbers greatly decreased, what would most likely happen?',
    options:[
      'Caterpillar numbers would fall and hawk numbers would rise',
      'Caterpillar numbers would rise and hawk numbers would fall',
      'Hawk numbers would rise because they switch to eating caterpillars',
      'Nothing in the ecosystem would change'],
    answer:'Caterpillar numbers would rise and hawk numbers would fall',
    hint:'Who eats caterpillars? What do hawks eat in this chain?',
    explanation:'Fewer Echo Parakeets means caterpillars have less predation, so they increase. Hawks lose a food source, so their numbers fall. This shows how interdependence links every level of a food chain.' }),

  makeMCQ({ id:'g6sc-enr-eco-058', chapterId:'g6sci-enr-ecosystems', subsection:'habitats', difficulty:2,
    question:'Fertiliser from farmland runs into a lagoon, causing a rapid algae bloom. What problem does this create for the lagoon ecosystem?',
    options:[
      'More fish can live in the lagoon because algae is a food source',
      'The water becomes cleaner and clearer',
      'Algae blocks sunlight, killing seagrass, and uses up oxygen as it decomposes',
      'Coral reefs grow faster when nutrients increase'],
    answer:'Algae blocks sunlight, killing seagrass, and uses up oxygen as it decomposes',
    hint:'Too much algae prevents light from reaching the seabed.',
    explanation:'Dense algae blocks sunlight needed by seagrass. When the algae dies and decomposes, bacteria use up oxygen in the water, suffocating fish and other marine life — a process called eutrophication.' }),

  makeMCQ({ id:'g6sc-enr-eco-059', chapterId:'g6sci-enr-ecosystems', subsection:'food_webs', difficulty:1,
    question:'In the food chain "Seagrass → Sea turtle → Tiger shark", which organism is the primary consumer?',
    options:['Seagrass','Tiger shark','Sea turtle','Plankton'],
    answer:'Sea turtle',
    hint:'The primary consumer is the first animal to eat in the chain.',
    explanation:'Seagrass is the producer. The sea turtle eats the seagrass directly, making it the primary consumer. The tiger shark eats the turtle, making it the secondary consumer.' }),

  makeMCQ({ id:'g6sc-enr-eco-060', chapterId:'g6sci-enr-ecosystems', subsection:'habitats', difficulty:2,
    question:'Why is biodiversity important in an ecosystem?',
    options:[
      'It makes ecosystems look more colourful and attractive',
      'A greater variety of species makes an ecosystem more stable and resilient to change',
      'It reduces competition so individual species grow larger',
      'It means there are always more predators than prey'],
    answer:'A greater variety of species makes an ecosystem more stable and resilient to change',
    hint:'Think about what happens when one species disappears in a diverse ecosystem versus a simple one.',
    explanation:'High biodiversity means if one species disappears, others can partially fill its role, keeping the ecosystem functioning. A low-biodiversity ecosystem collapses more easily when one species is lost.' }),

  makeMCQ({ id:'g6sc-enr-eco-061', chapterId:'g6sci-enr-ecosystems', subsection:'habitats', difficulty:3,
    question:'A coral reef covers 2 km² and supports 500 species. If 30% of the reef is destroyed by bleaching, how many km² of reef remains?',
    options:['0.3 km²','0.6 km²','1.4 km²','1.7 km²'],
    answer:'1.4 km²',
    hint:'If 30% is destroyed, 70% remains. Find 70% of 2.',
    explanation:'70% of 2 km² = 0.70 × 2 = 1.4 km² of reef remains after 30% is destroyed by bleaching.' }),

  makeMCQ({ id:'g6sc-enr-eco-062', chapterId:'g6sci-enr-ecosystems', subsection:'habitats', difficulty:2,
    question:'Which action would BEST protect the lagoon ecosystem in Mauritius?',
    options:[
      'Increasing the number of tourist boats operating in the lagoon',
      'Allowing factory waste water to flow directly into rivers that reach the sea',
      'Treating sewage properly and reducing fertiliser run-off from farmland',
      'Removing all fish from the lagoon so coral is undisturbed'],
    answer:'Treating sewage properly and reducing fertiliser run-off from farmland',
    hint:'Pollution is the main threat — so reducing it is the solution.',
    explanation:'Treating sewage and managing fertiliser run-off prevents excess nutrients from entering the lagoon, protecting seagrass and coral from algae blooms and chemical pollution.' }),

  makeMCQ({ id:'g6sc-enr-eco-063', chapterId:'g6sci-enr-ecosystems', subsection:'habitats', difficulty:3,
    question:'Which example BEST demonstrates the concept of interdependence in an ecosystem?',
    options:[
      'A plant grows towards sunlight',
      'Bees pollinate flowers; without bees, flowers cannot seed; without seeds, many animals lose their food source',
      'A fish swims away quickly when a shark approaches',
      'A tree drops its leaves during the dry season'],
    answer:'Bees pollinate flowers; without bees, flowers cannot seed; without seeds, many animals lose their food source',
    hint:'Which option shows a chain of effects linking multiple different species?',
    explanation:'The bee-flower example shows interdependence across species: bees need nectar, flowers need pollination, and animals need the resulting fruit. Remove one, and the whole chain is affected.' })
);

// --- g6sci-enr-solar (16 questions: g6sc-enr-sol-050..065) ---
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g6sc-enr-sol-050', chapterId:'g6sci-enr-solar', subsection:'planets', difficulty:1,
    question:'Which is the smallest planet in our Solar System?',
    options:['Mars','Mercury','Venus','Earth'],
    answer:'Mercury',
    hint:'Of the inner rocky planets, one is noticeably smaller than all the others.',
    explanation:'Mercury is the smallest of the 8 planets and the closest to the Sun. Its diameter is about 4,880 km, roughly 38% of Earth\'s diameter.' }),

  makeMCQ({ id:'g6sc-enr-sol-051', chapterId:'g6sci-enr-solar', subsection:'planets', difficulty:1,
    question:'Which planet is the hottest in the Solar System, even though it is not the closest to the Sun?',
    options:['Mercury','Mars','Venus','Jupiter'],
    answer:'Venus',
    hint:'Its thick atmosphere is the key reason.',
    explanation:'Venus is the hottest planet (≈465°C) despite being farther from the Sun than Mercury. Its thick CO₂ atmosphere traps heat in an extreme greenhouse effect, keeping temperatures constantly high.' }),

  makeMCQ({ id:'g6sc-enr-sol-052', chapterId:'g6sci-enr-solar', subsection:'planets', difficulty:1,
    question:'Which is the largest planet in our Solar System?',
    options:['Saturn','Neptune','Jupiter','Uranus'],
    answer:'Jupiter',
    hint:'Of the four gas giants, one is by far the most massive.',
    explanation:'Jupiter is the largest planet, with a diameter more than 11 times that of Earth. Its Great Red Spot is a giant storm that has been observed for over 350 years.' }),

  makeMCQ({ id:'g6sc-enr-sol-053', chapterId:'g6sci-enr-solar', subsection:'planets', difficulty:2,
    question:'What are Saturn\'s rings made of?',
    options:['Liquid water and gas','Ice and rock','Lava and volcanic dust','Metal and hydrogen gas'],
    answer:'Ice and rock',
    hint:'The rings glitter because of one of these materials reflecting sunlight.',
    explanation:'Saturn\'s rings are made of billions of pieces of ice and rock, ranging from tiny grains to large boulders. The ice reflects sunlight, making the rings appear bright and beautiful.' }),

  makeMCQ({ id:'g6sc-enr-sol-054', chapterId:'g6sci-enr-solar', subsection:'planets', difficulty:2,
    question:'Why does Uranus appear blue-green in colour when viewed from space?',
    options:[
      'It is covered with shallow liquid oceans',
      'Methane in its atmosphere absorbs red light and reflects blue-green light',
      'Its icy surface reflects only blue and green wavelengths',
      'It reflects light from the blue planet Neptune beside it'],
    answer:'Methane in its atmosphere absorbs red light and reflects blue-green light',
    hint:'The same gas gives Neptune its deep blue colour.',
    explanation:'Uranus contains methane (CH₄) in its upper atmosphere. Methane absorbs red wavelengths of sunlight and reflects blue-green wavelengths back, giving Uranus its distinctive colour.' }),

  makeMCQ({ id:'g6sc-enr-sol-055', chapterId:'g6sci-enr-solar', subsection:'planets', difficulty:1,
    question:'The Asteroid Belt is located between which two planets?',
    options:['Earth and Mars','Mars and Jupiter','Jupiter and Saturn','Saturn and Uranus'],
    answer:'Mars and Jupiter',
    hint:'It separates the inner rocky planets from the outer gas giants.',
    explanation:'The Asteroid Belt lies between Mars and Jupiter and contains millions of rocky objects called asteroids. It marks the boundary between the inner Solar System and the outer gas giants.' }),

  makeMCQ({ id:'g6sc-enr-sol-056', chapterId:'g6sci-enr-solar', subsection:'sun_moon', difficulty:2,
    question:'What are comets made of, and why do they develop a bright tail as they approach the Sun?',
    options:[
      'Molten rock and gas; heat melts the rock into glowing lava',
      'Ice and dust; heat from the Sun vaporises the ice, forming a glowing tail',
      'Iron and nickel; sunlight makes the metal shine',
      'Water and oxygen; sunlight splits them into hydrogen and helium'],
    answer:'Ice and dust; heat from the Sun vaporises the ice, forming a glowing tail',
    hint:'The tail always points away from the Sun.',
    explanation:'Comets are made of ice and dust. As they approach the Sun, solar heat vaporises the ice, creating a cloud of gas and dust (the coma) and a tail that always points away from the Sun.' }),

  makeMCQ({ id:'g6sc-enr-sol-057', chapterId:'g6sci-enr-solar', subsection:'planets', difficulty:2,
    question:'Approximately how long does light from the Sun take to reach Earth?',
    options:['8 seconds','8 minutes','8 hours','8 days'],
    answer:'8 minutes',
    hint:'Light travels at 300,000 km per second; the Sun is 150 million km away.',
    explanation:'Light travels at about 300,000 km per second. The Sun is approximately 150 million km from Earth, so sunlight takes about 8 minutes to reach us.' }),

  makeMCQ({ id:'g6sc-enr-sol-058', chapterId:'g6sci-enr-solar', subsection:'space', difficulty:1,
    question:'What is the name of the galaxy that contains our Solar System?',
    options:['Andromeda','The Milky Way','The Solar Galaxy','Orion Nebula'],
    answer:'The Milky Way',
    hint:'On a clear dark night, it looks like a faint band of white light across the sky.',
    explanation:'Our Solar System is part of the Milky Way, a spiral galaxy containing hundreds of billions of stars. From Earth, the galaxy\'s central band appears as a faint white streak across the night sky.' }),

  makeMCQ({ id:'g6sc-enr-sol-059', chapterId:'g6sci-enr-solar', subsection:'planets', difficulty:2,
    question:'Mars has two small moons. What are their names?',
    options:['Io and Europa','Titan and Triton','Phobos and Deimos','Ganymede and Callisto'],
    answer:'Phobos and Deimos',
    hint:'Both names come from Greek mythology — they are the sons of Ares (Mars).',
    explanation:'Mars\'s two moons are Phobos (fear) and Deimos (dread), named after the sons of Ares, the Greek god of war. They are much smaller and less regular in shape than Earth\'s Moon.' }),

  makeMCQ({ id:'g6sc-enr-sol-060', chapterId:'g6sci-enr-solar', subsection:'planets', difficulty:2,
    question:'Which feature of Jupiter is actually a massive storm larger than Earth that has lasted for centuries?',
    options:['The Blue Ring','The Great Red Spot','The Asteroid Belt','The White Oval'],
    answer:'The Great Red Spot',
    hint:'This storm feature has been observed through telescopes since the 1600s.',
    explanation:'Jupiter\'s Great Red Spot is a giant anticyclonic storm wider than Earth. It has been observed by astronomers for at least 350 years and is one of the most recognisable features in the Solar System.' }),

  makeMCQ({ id:'g6sc-enr-sol-061', chapterId:'g6sci-enr-solar', subsection:'planets', difficulty:3,
    question:'Which planet rotates on its side, with its axis tilted at nearly 98° to its orbital plane, so it essentially rolls around the Sun?',
    options:['Neptune','Saturn','Uranus','Jupiter'],
    answer:'Uranus',
    hint:'Scientists believe a giant collision knocked it over long ago.',
    explanation:'Uranus has an extreme axial tilt of about 98°, meaning it rotates nearly on its side. Its poles receive more sunlight over a full orbit than its equator — the opposite of most other planets.' }),

  makeMCQ({ id:'g6sc-enr-sol-062', chapterId:'g6sci-enr-solar', subsection:'planets', difficulty:1,
    question:'What force keeps the planets in orbit around the Sun?',
    options:['Magnetism','Friction','Gravity','Wind'],
    answer:'Gravity',
    hint:'This is the same force that makes objects fall to the ground on Earth.',
    explanation:'Gravity is the attractive force between objects with mass. The Sun\'s enormous mass creates a gravitational pull that keeps all eight planets in their orbital paths around it.' }),

  makeMCQ({ id:'g6sc-enr-sol-063', chapterId:'g6sci-enr-solar', subsection:'planets', difficulty:3,
    question:'Venus is closer to the Sun than Mercury, yet Venus is hotter. What best explains this?',
    options:[
      'Venus is much larger than Mercury, so it holds more heat',
      'Venus has a thick CO₂ atmosphere that traps heat through the greenhouse effect, while Mercury has almost no atmosphere',
      'Venus orbits the Sun faster, so it absorbs more energy per day',
      'The Sun emits more energy in the direction of Venus than Mercury'],
    answer:'Venus has a thick CO₂ atmosphere that traps heat through the greenhouse effect, while Mercury has almost no atmosphere',
    hint:'Mercury has almost no atmosphere, so any heat it gains escapes immediately.',
    explanation:'Venus\'s thick CO₂ atmosphere creates an extreme greenhouse effect, trapping solar heat and raising surface temperatures to ≈465°C. Mercury has almost no atmosphere, so heat escapes into space easily, giving it very cold nights.' }),

  makeMCQ({ id:'g6sc-enr-sol-064', chapterId:'g6sci-enr-solar', subsection:'planets', difficulty:2,
    question:'Saturn is the least dense planet in the Solar System. If you could find a large enough bathtub, Saturn would ______.',
    options:['Sink immediately because of its great size','Dissolve slowly in the water','Float on water because its density is less than water\'s','Turn to solid ice in cold water'],
    answer:'Float on water because its density is less than water\'s',
    hint:'Water has a density of 1.0 g/cm³. Saturn\'s average density is about 0.69 g/cm³.',
    explanation:'Saturn\'s average density (≈0.69 g/cm³) is less than that of water (1.0 g/cm³). This means Saturn would float — it is the only planet in the Solar System less dense than water.' }),

  makeMCQ({ id:'g6sc-enr-sol-065', chapterId:'g6sci-enr-solar', subsection:'planets', difficulty:4,
    question:'Earth takes 365.25 days to orbit the Sun. Every 4 years, the extra quarter-days add up to give a leap year of 366 days. How many leap years occur in a 40-year period?',
    options:['8','9','10','11'],
    answer:'10',
    hint:'A leap year occurs every 4 years. Divide 40 by 4.',
    explanation:'40 ÷ 4 = 10. There are 10 leap years in any 40-year period (assuming no century adjustments). The extra day in each leap year compensates for the 0.25-day overshoot each ordinary year.' })
);
