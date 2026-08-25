'use strict';
// Grade 4 History & Geography - Chapter 3: Voyages of Discovery
// MIE Syllabus: Indian Ocean trade, Mauritius before humans, endemic species, nature reserves
// IDs format: g4h-voy-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4h-voy-001', chapterId:'g4hist-voyages', difficulty:1,
    question:'Which OCEAN surrounds Mauritius and was used by traders for thousands of years?',
    options:['Atlantic Ocean','Pacific Ocean','Indian Ocean','Arctic Ocean'],
    answer:'Indian Ocean',
    hint:'Mauritius is an island in the ocean named after India.',
    explanation:'Mauritius is situated in the <b>Indian Ocean</b>. This vast ocean was used by traders from Arabia, India, China and Africa for thousands of years. The Indian Ocean was like a "highway" connecting different countries through trade. Mauritius sits in an important position in the middle of this ocean.' }),

  makeMCQ({ id:'g4h-voy-002', chapterId:'g4hist-voyages', difficulty:1,
    question:'Which group of traders were among the FIRST to sail the Indian Ocean regularly, trading spices and using seasonal winds called MONSOONS?',
    options:['Portuguese sailors','Arab traders','Chinese traders','British merchants'],
    answer:'Arab traders',
    hint:'These traders used dhow sailboats and were expert navigators of the Indian Ocean.',
    explanation:'<b>Arab traders</b> were among the first and most skilled navigators of the Indian Ocean. They used <b>dhow</b> sailboats and knew how to use the <b>monsoon winds</b> (seasonal winds) to sail east in summer and west in winter. They traded spices, silk, gold and other goods between East Africa, Arabia, India and beyond.' }),

  makeMCQ({ id:'g4h-voy-003', chapterId:'g4hist-voyages', difficulty:1,
    question:'What were SPICES - like pepper, cinnamon and cloves - used for in the past that made them so VALUABLE?',
    options:[
      'As building materials for houses',
      'To preserve food, flavour meals, and as medicines - they were as valuable as gold',
      'To make clothing and textiles',
      'As fuel for ships'
    ],
    answer:'To preserve food, flavour meals, and as medicines - they were as valuable as gold',
    hint:'Before refrigerators existed, spices had a very important practical purpose.',
    explanation:'<b>Spices</b> were extremely valuable because they were used to <b>preserve food</b> (before refrigerators), <b>flavour meals</b> and as <b>medicines</b>. Pepper, cinnamon, cloves and nutmeg were so precious they were sometimes traded for gold. The <b>spice trade</b> was the main reason European nations sent ships to find sea routes to Asia.' }),

  makeMCQ({ id:'g4h-voy-004', chapterId:'g4hist-voyages', difficulty:1,
    question:'Which European country sent VASCO DA GAMA on a voyage around Africa to find a sea route to India?',
    options:['Spain','France','England','Portugal'],
    answer:'Portugal',
    hint:'Portugal is a small country in south-west Europe that was a great sea power in the 1400s-1500s.',
    explanation:'<b>Portugal</b> sent <b>Vasco da Gama</b> on a famous voyage (1497–1499) around the southern tip of Africa (Cape of Good Hope) to reach India by sea. This opened up the <b>sea route to India</b> and gave Portugal control over the spice trade. Portuguese sailors were the first Europeans to sail the Indian Ocean regularly.' }),

  makeTF({ id:'g4h-voy-005', chapterId:'g4hist-voyages', difficulty:1,
    question:'Mauritius was UNINHABITED (had no human beings) before the arrival of the first settlers.',
    answer:true,
    hint:'Was anyone living on Mauritius before the Arabs, Portuguese and Dutch arrived?',
    explanation:'<b>True.</b> Mauritius was <b>uninhabited</b> - no humans lived there - before the first settlers arrived. Arab sailors knew of the island but did not settle. The <b>Dutch</b> were the first to colonise Mauritius (1638). Before humans arrived, the island was home to many unique animals and plants found nowhere else on Earth.' }),

  makeMCQ({ id:'g4h-voy-006', chapterId:'g4hist-voyages', difficulty:2,
    question:'What does ENDEMIC mean when describing plants and animals in Mauritius?',
    options:[
      'Found in many countries around the world',
      'Recently introduced from another country',
      'Found naturally ONLY in Mauritius and nowhere else on Earth',
      'An animal that has recently become extinct'
    ],
    answer:'Found naturally ONLY in Mauritius and nowhere else on Earth',
    hint:'The prefix "en-" can mean "within" - within one specific place.',
    explanation:'<b>Endemic</b> means <b>found naturally only in one specific place</b> and nowhere else on Earth. Mauritius has many endemic species - animals and plants that evolved on the island over millions of years and are unique to Mauritius. Examples: the <b>Dodo, Echo Parakeet, Pink Pigeon</b> (birds), the <b>Ebony tree</b> and <b>Trochetia</b> (plants). Protecting endemic species is crucial because if they disappear from Mauritius, they are gone forever.' }),

  makeMCQ({ id:'g4h-voy-007', chapterId:'g4hist-voyages', difficulty:2,
    question:'The DODO was a large flightless bird that was endemic to Mauritius. Why did the Dodo become EXTINCT?',
    options:[
      'It flew away to another island',
      'It died from a very cold winter',
      'It was hunted by sailors for food, and rats and other animals introduced by humans ate its eggs',
      'It was taken to Europe as a pet and never came back'
    ],
    answer:'It was hunted by sailors for food, and rats and other animals introduced by humans ate its eggs',
    hint:'Think about what changed when humans first arrived on Mauritius.',
    explanation:'The <b>Dodo</b> became extinct (disappeared forever) because of humans arriving on Mauritius. Sailors <b>hunted Dodos for food</b> (they could not fly so they were easy to catch). Animals brought by humans - <b>rats, pigs and monkeys</b> - ate the Dodo\'s eggs, which were laid on the ground. Combined with <b>deforestation</b> (clearing forests), the Dodo\'s population collapsed. The last Dodo was seen around <b>1681</b>.' }),

  makeMCQ({ id:'g4h-voy-008', chapterId:'g4hist-voyages', difficulty:2,
    question:'Which of these is an endemic BIRD of Mauritius that nearly became extinct but has been saved by conservation efforts?',
    options:['Flamingo','Ostrich','Echo Parakeet','Penguin'],
    answer:'Echo Parakeet',
    hint:'This is a bright green parrot found only in Mauritius.',
    explanation:'The <b>Echo Parakeet</b> (<i>Psittacula eques</i>) is an endemic parrot found only in Mauritius. By 1986 only about <b>10-15 birds</b> remained - it was nearly extinct. Thanks to conservation efforts (captive breeding, protecting nests, controlling introduced predators), the population grew to over 700 birds by 2015. It is one of the greatest conservation success stories in Africa.' }),

  makeMCQ({ id:'g4h-voy-009', chapterId:'g4hist-voyages', difficulty:2,
    question:'What is DEFORESTATION and how did it affect Mauritius?',
    options:[
      'Planting more trees on the island - it made Mauritius greener',
      'Cutting down forests for farming, building and fuel - it destroyed the habitat of many endemic species',
      'A type of weather event that killed trees',
      'Building roads through forests without cutting any trees'
    ],
    answer:'Cutting down forests for farming, building and fuel - it destroyed the habitat of many endemic species',
    hint:'De- means "remove." Forestation means forests.',
    explanation:'<b>Deforestation</b> means <b>cutting down forests</b>. When settlers arrived in Mauritius, they cleared vast areas of forest for <b>sugar cane farming, buildings and fuel</b>. Mauritius once had forests covering almost the entire island; today only about 2% of original native forest remains. Deforestation destroyed the habitat of many endemic animals and plants, causing several species (like the Dodo) to become extinct.' }),

  makeMCQ({ id:'g4h-voy-010', chapterId:'g4hist-voyages', difficulty:3,
    question:'Why was the BLACK RIVER GORGES NATIONAL PARK established in Mauritius?',
    options:[
      'To build a new city for more people',
      'To protect what remains of Mauritius\'s original native forests and the endemic species that live there',
      'To create a racing circuit for cars',
      'To grow more sugar cane'
    ],
    answer:'To protect what remains of Mauritius\'s original native forests and the endemic species that live there',
    hint:'National parks protect nature - what does Mauritius need to protect most urgently?',
    explanation:'<b>Black River Gorges National Park</b> (established 1994) covers about 6,574 hectares in the south-west of Mauritius. It protects <b>the last significant areas of native Mauritian forest</b> and the endemic species that live there - including the Echo Parakeet, Pink Pigeon, Mauritius Kestrel, and rare plants like the Ebony tree. It is vital for preserving Mauritius\'s unique natural heritage.' }),

  makeMCQ({ id:'g4h-voy-011', chapterId:'g4hist-voyages', difficulty:1,
    question:'Chinese traders played an important role in Indian Ocean trade. What were they famous for exporting (sending to other countries)?',
    options:['Rubber and coconut oil','Silk, porcelain (fine pottery) and tea','Gold and diamonds','Spices like pepper and cloves'],
    answer:'Silk, porcelain (fine pottery) and tea',
    hint:'The famous "Silk Road" trade route connected China to the rest of the world.',
    explanation:'<b>Chinese traders</b> were famous for exporting <b>silk, porcelain</b> (fine china pottery) <b>and tea</b> - goods that were highly prized in Europe, Arabia and India. The trade routes connecting China to other parts of Asia and beyond were collectively known as the "Silk Road." Chinese trading ships called <b>junks</b> sailed the Indian Ocean carrying these valuable goods.' }),

  makeMCQ({ id:'g4h-voy-012', chapterId:'g4hist-voyages', difficulty:1,
    question:'What is the PINK PIGEON - and why is it special to Mauritius?',
    options:['A common bird found all over the world','An endemic bird of Mauritius that was nearly extinct and is now protected','A bird introduced from India','A type of flamingo that visits Mauritius'],
    answer:'An endemic bird of Mauritius that was nearly extinct and is now protected',
    hint:'It is pink in colour and found only on this island.',
    explanation:'The <b>Pink Pigeon</b> (<i>Nesoenas mayeri</i>) is an <b>endemic bird found only in Mauritius</b>. It was nearly extinct in the 1990s with fewer than 10 birds in the wild. Conservation efforts (breeding programmes, predator control, habitat protection) helped the population recover to over 400 birds. It is a symbol of successful conservation in Mauritius and is protected by law.' }),

  makeMCQ({ id:'g4h-voy-013', chapterId:'g4hist-voyages', difficulty:2,
    question:'ILE AUX AIGRETTES is a small coral island off the east coast of Mauritius. What is its main purpose today?',
    options:[
      'A holiday resort for tourists',
      'A nature reserve where Mauritius\'s original coastal ecosystem is being restored, including giant tortoises',
      'A military base',
      'A sugar cane farm'
    ],
    answer:'A nature reserve where Mauritius\'s original coastal ecosystem is being restored, including giant tortoises',
    hint:'Its name means "Island of Egrets" in French. It is managed by the Mauritian Wildlife Foundation.',
    explanation:'<b>Ile aux Aigrettes</b> is a <b>nature reserve</b> managed by the Mauritian Wildlife Foundation. It is being restored to resemble what Mauritius\'s coastal ecosystem looked like before humans arrived. Giant Aldabra tortoises (similar to the extinct Mauritian giant tortoise) have been introduced to restore ecological functions. It is also home to Pink Pigeons, Mauritius Fodies and rare plants.' }),

  makeMCQ({ id:'g4h-voy-014', chapterId:'g4hist-voyages', difficulty:2,
    question:'What were MONSOON WINDS and why were they important to Indian Ocean traders?',
    options:[
      'Violent storms that destroyed ships',
      'Predictable seasonal winds that allowed sailors to plan voyages - blowing towards Asia in summer and back towards Africa in winter',
      'Winds that only blew on the island of Mauritius',
      'Strong winds that only occurred in the Atlantic Ocean'
    ],
    answer:'Predictable seasonal winds that allowed sailors to plan voyages - blowing towards Asia in summer and back towards Africa in winter',
    hint:'Monsoon winds are seasonal - they change direction with the seasons.',
    explanation:'<b>Monsoon winds</b> are <b>predictable seasonal winds</b> that blow across the Indian Ocean. In summer (roughly April–September), they blow north-east towards Asia; in winter (October–March), they reverse and blow south-west towards Africa. Arab, Indian and Chinese sailors used these winds to plan voyages - sailing to Asia in one season and returning in another. Without understanding monsoon winds, long Indian Ocean voyages would have been extremely difficult.' }),

  makeTF({ id:'g4h-voy-015', chapterId:'g4hist-voyages', difficulty:2,
    question:'The giant tortoise that once lived in Mauritius is now extinct.',
    answer:true,
    hint:'Were giant tortoises endemic to Mauritius? What happened to them?',
    explanation:'<b>True.</b> Two species of <b>giant tortoise</b> were endemic to Mauritius - the Domed Mauritius Giant Tortoise and the Saddle-backed Mauritius Giant Tortoise. Both became <b>extinct</b> due to being hunted by sailors (tortoises were kept alive on ships as a food supply for long voyages) and habitat destruction. Today, Aldabra giant tortoises (from the Seychelles) are used in conservation programmes like Ile aux Aigrettes to replace their ecological role.' }),

  makeMCQ({ id:'g4h-voy-016', chapterId:'g4hist-voyages', difficulty:3,
    question:'CASELA NATURE PARK in Mauritius serves both as a tourist attraction AND a conservation centre. What is a key benefit of combining these two roles?',
    options:[
      'It allows animals to be sold to other countries',
      'Tourism generates money that can fund conservation of threatened species',
      'It means the animals do not need to be fed',
      'Tourists help to hunt the animals that threaten conservation'
    ],
    answer:'Tourism generates money that can fund conservation of threatened species',
    hint:'Conservation is expensive. Where can the money come from?',
    explanation:'Combining <b>tourism and conservation</b> is an important strategy: <b>tourist visits generate income</b> that can be used to fund the care of threatened animals, run breeding programmes, and maintain the park. This makes conservation financially sustainable. Casela Nature Park in the Black River district houses a variety of animals including Mauritian species and supports conservation while educating visitors.' }),

  makeMCQ({ id:'g4h-voy-017', chapterId:'g4hist-voyages', difficulty:3,
    question:'Indian traders brought HINDUISM and ISLAM to different parts of the Indian Ocean world through trade. What does this show about ancient trade routes?',
    options:[
      'Trade was only about goods - cultures never mixed',
      'Trade routes also spread ideas, religions, languages and cultures between civilisations',
      'Religions spread only through wars and conquest',
      'Indian traders kept their culture completely secret'
    ],
    answer:'Trade routes also spread ideas, religions, languages and cultures between civilisations',
    hint:'When people travel and trade, they bring more than just goods.',
    explanation:'Ancient <b>Indian Ocean trade routes</b> were not just about goods - they also <b>spread ideas, religions, languages and cultures</b>. <b>Hinduism</b> spread to South-East Asia (Bali, Cambodia, Thailand); <b>Islam</b> spread via Arab and Indian Muslim traders to East Africa, South-East Asia and beyond. The <b>Swahili</b> language on Africa\'s east coast developed partly from Arabic-Bantu contact through trade. Mauritius itself reflects this - its population descends from people connected by Indian Ocean trade routes.' }),

  makeMCQ({ id:'g4h-voy-018', chapterId:'g4hist-voyages', difficulty:3,
    question:'The EBONY TREE is endemic to Mauritius and was nearly logged to extinction. Why is ebony so valuable?',
    options:[
      'It produces a fruit that is very sweet',
      'Its extremely hard, dense, dark wood was prized for fine furniture, musical instruments and carvings',
      'It can survive in salt water',
      'Its leaves are used to make a popular tea'
    ],
    answer:'Its extremely hard, dense, dark wood was prized for fine furniture, musical instruments and carvings',
    hint:'Ebony is one of the hardest and darkest woods in the world.',
    explanation:'<b>Ebony</b> (<i>Diospyros</i> species) is valuable because its wood is <b>extremely hard, dense and dark</b> - it was prized for making fine furniture, piano keys, musical instruments, and decorative carvings. When Dutch and French settlers arrived, ebony forests were massively logged for export. Today, Mauritian ebony is protected and conservation projects are working to restore ebony forests, particularly in Black River Gorges National Park.' }),

  makeMCQ({ id:'g4h-voy-019', chapterId:'g4hist-voyages', difficulty:4,
    question:'A student argues: "The animals and plants that went extinct in Mauritius are gone forever - there is nothing we can do about the past. We should not worry about conservation now." How would a conservation scientist RESPOND to this argument?',
    options:[
      'The student is correct - extinct species cannot come back so there is no point in conservation',
      'Although extinct species cannot be brought back, many of Mauritius\'s endemic species are STILL alive but endangered - conservation NOW can prevent MORE extinctions; what we do today determines what survives for future generations',
      'The student is correct - Mauritius has no endemic species left to protect',
      'Conservation is only important in large countries, not small islands like Mauritius'
    ],
    answer:'Although extinct species cannot be brought back, many of Mauritius\'s endemic species are STILL alive but endangered - conservation NOW can prevent MORE extinctions; what we do today determines what survives for future generations',
    hint:'The Dodo is gone forever - but the Echo Parakeet and Pink Pigeon are still alive. What does that mean for our choices today?',
    explanation:'A conservation scientist would respond that <b>while extinct species cannot be recovered, many endemic Mauritian species are still alive but endangered</b> - including the Echo Parakeet, Pink Pigeon, Mauritius Kestrel, and many rare plants. Successful conservation of these species (e.g. Echo Parakeet population grew from ~12 to 700+) proves that action <b>works</b>. Every species that disappears is an irreplaceable loss to the world\'s biodiversity. <b>What we do today determines what future generations inherit.</b>' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4h-voy-020', chapterId:'g4hist-voyages', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Dodo.jpg" alt="a painting of a large flightless bird" style="max-height:220px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>What is the name of this famous extinct bird that was endemic to Mauritius?</b>',
    options:['Ostrich','Emu','Dodo','Penguin'],
    answer:'Dodo',
    hint:'This bird could not fly and was hunted to extinction around 1681.',
    explanation:'The <b>Dodo</b> (<i>Raphus cucullatus</i>) was a large flightless bird that lived only on the island of Mauritius. When humans arrived, Dodos were hunted for food and rats, pigs and monkeys introduced by settlers ate their eggs. The last Dodo was seen around <b>1681</b>. The Dodo is now one of the most famous symbols of extinction and of Mauritius.' }),

  makeMCQ({ id:'g4h-voy-021', chapterId:'g4hist-voyages', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Pink_pigeon.jpg" alt="a pink-coloured bird perched on a branch" style="max-height:220px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>This endangered endemic bird was saved from near-extinction by conservation efforts in Mauritius. What is it called?</b>',
    options:['Flamingo','Pink Pigeon','Echo Parakeet','Mauritius Fody'],
    answer:'Pink Pigeon',
    hint:'By the 1990s fewer than 10 of these birds remained in the wild.',
    explanation:'The <b>Pink Pigeon</b> (<i>Nesoenas mayeri</i>) is an endemic bird found only in Mauritius. It was nearly extinct in the early 1990s with fewer than 10 birds in the wild. Thanks to conservation efforts — breeding programmes, predator control and habitat protection — the population recovered to over 400 birds. It is one of the greatest conservation success stories in the region.' }),

  makeMCQ({ id:'g4h-voy-022', chapterId:'g4hist-voyages', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Black_River_Gorges_National_Park,_Mauritius.jpg" alt="a lush green forested gorge landscape" style="max-height:220px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>What is the name of this protected nature reserve in south-west Mauritius?</b>',
    options:['Casela Nature Park','Ile aux Aigrettes','Black River Gorges National Park','Pamplemousses Botanical Garden'],
    answer:'Black River Gorges National Park',
    hint:'It was established in 1994 to protect Mauritius\'s last areas of native forest.',
    explanation:'<b>Black River Gorges National Park</b> was established in 1994 and covers about 6,574 hectares in south-west Mauritius. It protects the last significant areas of native Mauritian forest and the endemic species that live there — including the Echo Parakeet, Pink Pigeon, Mauritius Kestrel and rare plants like the Mauritian ebony tree.' }),

  makeMCQ({ id:'g4h-voy-023', chapterId:'g4hist-voyages', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Ile_aux_Aigrettes.jpg" alt="a small coral island with trees near the sea" style="max-height:220px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>What type of site is Ile aux Aigrettes, this small island off the east coast of Mauritius?</b>',
    options:['A military base','A tourist hotel resort','A nature reserve being restored to its pre-human ecosystem','A sugar cane plantation'],
    answer:'A nature reserve being restored to its pre-human ecosystem',
    hint:'It is managed by the Mauritian Wildlife Foundation and giant tortoises have been reintroduced.',
    explanation:'<b>Ile aux Aigrettes</b> is a <b>nature reserve</b> managed by the Mauritian Wildlife Foundation. The coral island is being restored to resemble what Mauritius\'s coastal ecosystem looked like before humans arrived. Giant Aldabra tortoises (similar to the now-extinct Mauritian giant tortoise) have been introduced, alongside Pink Pigeons, Mauritius Fodies and rare endemic plants.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4h-voy-024', chapterId:'g4hist-voyages', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Sailing_ship.jpg" alt="a large wooden sailing vessel" style="max-height:200px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>Early explorers like the Dutch, Portuguese and French travelled to Mauritius using vessels like this. What are they called?</b>',
    options:['Steamships','Sailing ships','Submarines','Ferries'],
    answer:'Sailing ships',
    hint:'They use large cloth sheets, powered by wind, to move across the ocean.',
    explanation:'<b>Sailing ships</b> used large sails to catch the wind and travel across oceans. Before engines were invented, all long sea voyages - including the discovery of Mauritius - depended entirely on wind power and sailing ships.' }),

  makeMCQ({ id:'g4h-voy-025', chapterId:'g4hist-voyages', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Compass.jpg" alt="a navigation instrument with a needle" style="max-height:200px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>Explorers used this instrument to find their direction at sea. What is it called?</b>',
    options:['Telescope','Compass','Sextant','Barometer'],
    answer:'Compass',
    hint:'Its needle always points towards magnetic North.',
    explanation:'A <b>compass</b> has a magnetic needle that always points towards North, helping sailors navigate the open ocean where there are no landmarks. It was an essential tool for explorers discovering new lands like Mauritius.' })

);
