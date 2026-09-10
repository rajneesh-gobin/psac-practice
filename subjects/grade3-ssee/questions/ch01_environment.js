'use strict';
(function () {

// Grade 3 SSEE — Unit 1: Looking at Our Environment
// Source: MIE SSEE Grade 3 Part 1 pp.1-26
// IDs: g3ssee-env-001 onwards

// ── our_senses (001-030) ──────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g3ssee-env-001', chapterId:'g3ssee-environment', difficulty:1, subsection:'our_senses',
    question:'Which sense do we use to HEAR a bird singing?',
    options:['Hearing','Sight','Touch','Smell'],
    answer:'Hearing',
    hint:'Think about which body part you use to listen.',
    explanation:'We use the sense of <b>hearing</b> (our ears) to detect sounds like a bird singing.' }),

  makeMCQ({ id:'g3ssee-env-002', chapterId:'g3ssee-environment', difficulty:1, subsection:'our_senses',
    question:'Which sense do we use to SEE the colours of a flower?',
    options:['Sight','Hearing','Smell','Taste'],
    answer:'Sight',
    hint:'Think about which body part you use to see.',
    explanation:'We use the sense of <b>sight</b> (our eyes) to see colours and shapes.' }),

  makeMCQ({ id:'g3ssee-env-003', chapterId:'g3ssee-environment', difficulty:1, subsection:'our_senses',
    question:'Which sense do we use to SMELL a flower?',
    options:['Smell','Taste','Touch','Hearing'],
    answer:'Smell',
    hint:'Which body part do we use to detect smells?',
    explanation:'We use the sense of <b>smell</b> (our nose) to detect pleasant and unpleasant smells.' }),

  makeMCQ({ id:'g3ssee-env-004', chapterId:'g3ssee-environment', difficulty:1, subsection:'our_senses',
    question:'Which sense do we use to feel that a stone is ROUGH?',
    options:['Touch','Sight','Hearing','Taste'],
    answer:'Touch',
    hint:'Think about which body part you use to feel textures.',
    explanation:'We use the sense of <b>touch</b> (our skin) to feel textures such as rough, smooth, hard or soft.' }),

  makeMCQ({ id:'g3ssee-env-005', chapterId:'g3ssee-environment', difficulty:1, subsection:'our_senses',
    question:'Which sense do we use to know that a mango is SWEET?',
    options:['Taste','Smell','Sight','Touch'],
    answer:'Taste',
    hint:'Which body part do we use to taste food?',
    explanation:'We use the sense of <b>taste</b> (our tongue) to taste flavours such as sweet, sour, salty or bitter.' }),

  makeMCQ({ id:'g3ssee-env-006', chapterId:'g3ssee-environment', difficulty:1, subsection:'our_senses',
    question:'How many senses do we have?',
    options:['5','3','4','6'],
    answer:'5',
    hint:'Count them: sight, hearing, smell, taste, touch.',
    explanation:'We have <b>five</b> senses: sight, hearing, smell, taste and touch.' }),

  makeTF({ id:'g3ssee-env-007', chapterId:'g3ssee-environment', difficulty:1, subsection:'our_senses',
    question:'We use our ears to see things.',
    answer:false,
    explanation:'We use our <b>eyes</b> to see. Our ears are used for hearing.' }),

  makeMCQ({ id:'g3ssee-env-008', chapterId:'g3ssee-environment', difficulty:1, subsection:'our_senses',
    question:'Riya puts her hand in cold water. Which sense is she using?',
    options:['Touch','Taste','Sight','Hearing'],
    answer:'Touch',
    explanation:'Riya feels the temperature of the water using the sense of <b>touch</b>.' }),

  makeMCQ({ id:'g3ssee-env-009', chapterId:'g3ssee-environment', difficulty:2, subsection:'our_senses',
    question:'Priya smells smoke and looks to find where it is coming from. Which TWO senses is she using?',
    options:['Smell and sight','Taste and hearing','Touch and smell','Sight and taste'],
    answer:'Smell and sight',
    hint:'She first smells the smoke, then looks for its source.',
    explanation:'Priya is using <b>smell</b> (nose) to detect the smoke and <b>sight</b> (eyes) to look for it.' }),

  makeMCQ({ id:'g3ssee-env-010', chapterId:'g3ssee-environment', difficulty:1, subsection:'our_senses',
    question:'Which sense organ do we use to hear thunder during a storm?',
    options:['Ears','Eyes','Nose','Tongue'],
    answer:'Ears',
    explanation:'We use our <b>ears</b> to hear sounds, including loud thunder.' }),

  makeMCQ({ id:'g3ssee-env-011', chapterId:'g3ssee-environment', difficulty:2, subsection:'our_senses',
    question:'A person who is blind cannot see. Which sense has been affected?',
    options:['Sight','Hearing','Touch','Smell'],
    answer:'Sight',
    explanation:'Being blind means the sense of <b>sight</b> is affected. A blind person cannot use their eyes to see.' }),

  makeTF({ id:'g3ssee-env-012', chapterId:'g3ssee-environment', difficulty:1, subsection:'our_senses',
    question:'Our nose helps us to smell things around us.',
    answer:true,
    explanation:'Yes! The <b>nose</b> is the organ for the sense of <b>smell</b>.' }),

  makeMCQ({ id:'g3ssee-env-013', chapterId:'g3ssee-environment', difficulty:2, subsection:'our_senses',
    question:'Alisha touches a hot cup and quickly moves her hand away. Which sense warned her?',
    options:['Her sense of touch','Her sense of sight','Her sense of hearing','Her sense of taste'],
    answer:'Her sense of touch',
    hint:'The sense of touch helps us respond to hot, cold, pain.',
    explanation:'The sense of <b>touch</b> (our skin) detects heat and pain, warning us to move the hand away from danger. Sight, hearing and taste cannot tell us that a cup is hot.'}),

  makeMCQ({ id:'g3ssee-env-014', chapterId:'g3ssee-environment', difficulty:1, subsection:'our_senses',
    question:'Which sense would help you find out if milk has gone sour?',
    options:['Smell and taste','Sight and hearing','Touch and hearing','Sight and touch'],
    answer:'Smell and taste',
    explanation:'Smell tells you the milk smells bad, and taste confirms that it is sour. Sight, hearing and touch cannot detect sourness.'}),

  makeMCQ({ id:'g3ssee-env-015', chapterId:'g3ssee-environment', difficulty:1, subsection:'our_senses',
    question:'Which sense organ matches the sense of TASTE?',
    options:['Tongue','Nose','Ears','Skin'],
    answer:'Tongue',
    explanation:'The <b>tongue</b> is the organ for the sense of taste. It detects sweet, sour, salty and bitter flavours.' }),

// ── types_environment (016-045) ───────────────────────────────────────────

  makeMCQ({ id:'g3ssee-env-016', chapterId:'g3ssee-environment', difficulty:1, subsection:'types_environment',
    question:'Which of these is an example of a SCHOOL environment?',
    options:['Classroom','Market','Hospital','Forest'],
    answer:'Classroom',
    hint:'Think about where you learn every day.',
    explanation:'A <b>classroom</b> is part of the school environment, where children learn.' }),

  makeMCQ({ id:'g3ssee-env-017', chapterId:'g3ssee-environment', difficulty:1, subsection:'types_environment',
    question:'Which of these is a NATURAL environment?',
    options:['Forest','School','Hospital','Market'],
    answer:'Forest',
    hint:'A natural environment is one made by nature, not by people.',
    explanation:'A <b>forest</b> is a natural environment — it is made up of trees and plants that grow naturally.' }),

  makeMCQ({ id:'g3ssee-env-018', chapterId:'g3ssee-environment', difficulty:1, subsection:'types_environment',
    question:'The environment around our HOME is called a _____ environment.',
    options:['home','school','beach','natural'],
    answer:'home',
    explanation:'The area around where we live is our <b>home</b> environment.' }),

  makeTF({ id:'g3ssee-env-019', chapterId:'g3ssee-environment', difficulty:1, subsection:'types_environment',
    question:'A forest is a man-made environment.',
    answer:false,
    explanation:'A forest is a <b>natural</b> environment — it grows naturally without being built by people.' }),

  makeMCQ({ id:'g3ssee-env-020', chapterId:'g3ssee-environment', difficulty:2, subsection:'types_environment',
    question:'Which of the following is a MAN-MADE environment?',
    options:['A shopping mall','A coral reef','A rocky mountain','A sandy beach'],
    answer:'A shopping mall',
    hint:'Man-made means built by people.',
    explanation:'A shopping mall is <b>man-made</b> — people built it. Coral reefs, mountains and beaches are natural; nobody built them.'}),

  makeMCQ({ id:'g3ssee-env-021', chapterId:'g3ssee-environment', difficulty:1, subsection:'types_environment',
    question:'Mauritius has beautiful beaches and coral reefs. These are part of the _____ environment.',
    options:['natural','school','home','market'],
    answer:'natural',
    explanation:'Beaches and coral reefs are part of the <b>natural</b> environment — they were not built by people.' }),

  makeMCQ({ id:'g3ssee-env-022', chapterId:'g3ssee-environment', difficulty:2, subsection:'types_environment',
    question:'What do we call the surroundings in which a living thing lives?',
    options:['Environment','Habitat','Community','Ecosystem'],
    answer:'Environment',
    hint:'This word means everything around us.',
    explanation:'The <b>environment</b> includes everything that surrounds a living thing: air, water, soil, other organisms and man-made objects.' }),

  makeMCQ({ id:'g3ssee-env-023', chapterId:'g3ssee-environment', difficulty:1, subsection:'types_environment',
    question:'Which of the following would you find in a school environment?',
    options:['A playground','A sugar cane field','A mangrove forest','A coral reef'],
    answer:'A playground',
    explanation:'A <b>playground</b> is found in a school environment where children play during break time.' }),

  makeTF({ id:'g3ssee-env-024', chapterId:'g3ssee-environment', difficulty:1, subsection:'types_environment',
    question:'The sea around Mauritius is part of our natural environment.',
    answer:true,
    explanation:'Yes! The sea, lagoon and coral reef around Mauritius are all part of our <b>natural environment</b>.' }),

  makeMCQ({ id:'g3ssee-env-025', chapterId:'g3ssee-environment', difficulty:2, subsection:'types_environment',
    question:'Ali describes his environment as having big trees, birds and rivers. What type of environment does Ali live near?',
    options:['Natural environment','School environment','Home environment','Market environment'],
    answer:'Natural environment',
    explanation:'Big trees, birds and rivers are features of the <b>natural environment</b> — they occur naturally in nature.' }),

  makeMCQ({ id:'g3ssee-env-026', chapterId:'g3ssee-environment', difficulty:2, subsection:'types_environment',
    question:'Which of the following BEST describes a built environment?',
    options:['Buildings and roads','Trees and rivers','Clouds and rain','Animals and plants'],
    answer:'Buildings and roads',
    explanation:'A built (or man-made) environment is made of buildings, roads and other structures put up by people. Trees, rivers, clouds, rain, animals and plants all belong to the natural environment.'}),

  makeMCQ({ id:'g3ssee-env-027', chapterId:'g3ssee-environment', difficulty:1, subsection:'types_environment',
    question:'Where does a Grade 3 pupil spend most of their weekday daytime hours?',
    options:['School','Beach','Market','Forest'],
    answer:'School',
    explanation:'A pupil spends most weekday daytime hours in the <b>school</b> environment — in classrooms, the library and the playground.'}),

  makeMCQ({ id:'g3ssee-env-028', chapterId:'g3ssee-environment', difficulty:2, subsection:'types_environment',
    question:'The sugar cane fields of Mauritius are best described as which type of environment?',
    options:['A farming environment','A natural environment','A school environment','A home environment'],
    answer:'A farming environment',
    hint:'Sugar cane is grown by people as a crop.',
    explanation:'Sugar cane fields are a <b>farming</b> (agricultural) environment — people plant and manage them to grow a crop. They are not natural, and they are neither a home nor a school.'}),

  makeTF({ id:'g3ssee-env-029', chapterId:'g3ssee-environment', difficulty:1, subsection:'types_environment',
    question:'A hospital is a natural environment.',
    answer:false,
    explanation:'A hospital is a <b>man-made</b> environment — it was built by people to provide healthcare.' }),

  makeMCQ({ id:'g3ssee-env-030', chapterId:'g3ssee-environment', difficulty:2, subsection:'types_environment',
    question:'Which TWO items below belong to the natural environment of Mauritius?',
    options:['Forest and coral reef','Market and bus station','Road and hospital','School and shop'],
    answer:'Forest and coral reef',
    hint:'The natural environment is not built by people.',
    explanation:'A forest such as Black River Gorges and a coral reef are both <b>natural</b> — they were not built by people. Markets, bus stations, roads, hospitals, schools and shops are all built.'}),

// ── caring_environment (031-075) ──────────────────────────────────────────

  makeMCQ({ id:'g3ssee-env-031', chapterId:'g3ssee-environment', difficulty:1, subsection:'caring_environment',
    question:'Which of the following helps to keep our environment CLEAN?',
    options:['Putting rubbish in a bin','Dropping litter on the road','Pouring oil in the river','Burning plastic in the yard'],
    answer:'Putting rubbish in a bin',
    hint:'Think about what the right thing to do with rubbish is.',
    explanation:'We should always put rubbish in a bin to keep our environment clean and healthy. Littering, pouring oil into a river and burning plastic all make it dirtier.'}),

  makeMCQ({ id:'g3ssee-env-032', chapterId:'g3ssee-environment', difficulty:1, subsection:'caring_environment',
    question:'Planting trees helps to _____ our environment.',
    options:['protect','pollute','dirty','damage'],
    answer:'protect',
    hint:'Trees are good for the environment.',
    explanation:'<b>Planting trees</b> helps protect and improve our environment by providing oxygen, shade and habitats for animals.' }),

  makeTF({ id:'g3ssee-env-033', chapterId:'g3ssee-environment', difficulty:1, subsection:'caring_environment',
    question:'Dropping litter on the beach is good for the environment.',
    answer:false,
    explanation:'Dropping litter on the beach <b>pollutes</b> the environment. We must always use a bin.' }),

  makeMCQ({ id:'g3ssee-env-034', chapterId:'g3ssee-environment', difficulty:1, subsection:'caring_environment',
    question:'What should you do with an empty plastic bottle?',
    options:['Put it in a recycling bin','Drop it on the playground','Throw it into the river','Burn it in the garden'],
    answer:'Put it in a recycling bin',
    hint:'Plastic can be recycled to make new products.',
    explanation:'An empty plastic bottle belongs in a <b>recycling bin</b>, where it can be processed and made into something new. Dropping, throwing or burning it pollutes the land, the water or the air.'}),

  makeMCQ({ id:'g3ssee-env-035', chapterId:'g3ssee-environment', difficulty:2, subsection:'caring_environment',
    question:'Why should we save water at home?',
    options:['Water is precious and can run out','Water is free and never runs out','Water is not needed for life','Water always makes people sick'],
    answer:'Water is precious and can run out',
    hint:'Think about what happens if there is no water.',
    explanation:'Water is a precious, limited resource. If we waste it, less is left for everyone. Water is not free, it is not endless, and clean water does not make us sick.'}),

  makeMCQ({ id:'g3ssee-env-036', chapterId:'g3ssee-environment', difficulty:1, subsection:'caring_environment',
    question:'Which of the following is an example of POLLUTION?',
    options:['Pouring factory waste into a river','Turning the tap off after washing','Planting young trees along the road','Putting rubbish into the right bin'],
    answer:'Pouring factory waste into a river',
    hint:'Pollution means making the environment dirty or harmful.',
    explanation:'Pouring factory waste into a river is <b>pollution</b> — it makes the water dirty and harms the animals and people who depend on it. The other three actions protect the environment.'}),

  makeTF({ id:'g3ssee-env-037', chapterId:'g3ssee-environment', difficulty:1, subsection:'caring_environment',
    question:'We should save electricity by turning off lights when we leave a room.',
    answer:true,
    explanation:'Yes! Turning off lights when leaving a room <b>saves electricity</b> and reduces pollution from power stations.' }),

  makeMCQ({ id:'g3ssee-env-038', chapterId:'g3ssee-environment', difficulty:2, subsection:'caring_environment',
    question:'What does the word "recycle" mean?',
    options:['To make new things from old ones','To burn rubbish in the garden','To bury waste under the ground','To throw things into the sea'],
    answer:'To make new things from old ones',
    hint:'The prefix "re-" means again.',
    explanation:'To <b>recycle</b> means to collect used materials — paper, glass or plastic — and turn them into new products instead of throwing them away.'}),

  makeMCQ({ id:'g3ssee-env-039', chapterId:'g3ssee-environment', difficulty:1, subsection:'caring_environment',
    question:'Which action is HARMFUL to the coral reef around Mauritius?',
    options:['Throwing plastic into the sea','Snorkelling without touching','Using a reef-safe sunscreen','Watching fish from a distance'],
    answer:'Throwing plastic into the sea',
    explanation:'Throwing plastic into the sea harms the coral reef and the animals that live in it. Snorkelling carefully, using reef-safe sunscreen and watching from a distance do not damage the reef.'}),

  makeMCQ({ id:'g3ssee-env-040', chapterId:'g3ssee-environment', difficulty:2, subsection:'caring_environment',
    question:'What is the 3R rule for protecting the environment?',
    options:['Reduce, Reuse, Recycle','Read, Repeat, Remember','Remove, Replace, Repair','Run, Rest, Relax'],
    answer:'Reduce, Reuse, Recycle',
    hint:'The 3Rs help us manage waste wisely.',
    explanation:'The <b>3R rule</b> stands for: Reduce (use less), Reuse (use again) and Recycle (turn into new products). These steps protect our environment.' }),

  makeMCQ({ id:'g3ssee-env-041', chapterId:'g3ssee-environment', difficulty:1, subsection:'caring_environment',
    question:'Which of the following helps to keep the SEA clean?',
    options:['Not throwing rubbish on the beach','Pouring old oil into the sea','Leaving plastic bags on the sand','Burning waste near the beach'],
    answer:'Not throwing rubbish on the beach',
    explanation:'Keeping the beach free of rubbish prevents litter from washing into the sea, helping to keep it <b>clean</b>.' }),

  makeTF({ id:'g3ssee-env-042', chapterId:'g3ssee-environment', difficulty:1, subsection:'caring_environment',
    question:'Cutting down all the trees in a forest is good for the environment.',
    answer:false,
    explanation:'Cutting down all trees is <b>harmful</b>. Trees provide oxygen, prevent soil erosion and provide homes for animals.' }),

  makeMCQ({ id:'g3ssee-env-043', chapterId:'g3ssee-environment', difficulty:2, subsection:'caring_environment',
    question:'Why is burning plastic bags bad for the environment?',
    options:['It releases harmful gases','It makes the soil fertile','It helps young plants grow','It cleans the river water'],
    answer:'It releases harmful gases',
    hint:'Think about what happens when plastic burns.',
    explanation:'Burning plastic releases <b>toxic gases</b> that pollute the air and harm the health of people and animals. It does not improve the soil, help plants or clean water.'}),

  makeMCQ({ id:'g3ssee-env-044', chapterId:'g3ssee-environment', difficulty:1, subsection:'caring_environment',
    question:'Which of these would you find in a COMPOST bin?',
    options:['Fruit and vegetable peels','Old batteries and wires','Glass bottles and jars','Plastic bags and straws'],
    answer:'Fruit and vegetable peels',
    hint:'Compost is made from natural food waste.',
    explanation:'Fruit and vegetable peels rot down in a compost bin and become natural fertiliser for plants. Batteries, glass and plastic do not rot and must never go into compost.'}),

  makeMCQ({ id:'g3ssee-env-045', chapterId:'g3ssee-environment', difficulty:3, subsection:'caring_environment',
    question:'Alisha wants to reduce her family\'s impact on the environment. Which action would help MOST?',
    options:['Walking to school instead of driving','Buying a new plastic toy each week','Leaving the lights on all night','Throwing food waste into the sea'],
    answer:'Walking to school instead of driving',
    hint:'Cars burn fuel and release pollution.',
    explanation:'Walking instead of going by car uses no fuel, so none of the gases that pollute the air are released. Buying more plastic, wasting electricity and dumping food waste all make things worse.'}),

  makeMCQ({ id:'g3ssee-env-046', chapterId:'g3ssee-environment', difficulty:2, subsection:'caring_environment',
    question:'What does "reduce" mean when we talk about caring for the environment?',
    options:['To use less of something','To burn old things quickly','To buy more new things','To throw things away fast'],
    answer:'To use less of something',
    explanation:'To <b>reduce</b> means to use less — less plastic, less water, less electricity — so that less waste and pollution are produced.'}),

  makeTF({ id:'g3ssee-env-047', chapterId:'g3ssee-environment', difficulty:1, subsection:'caring_environment',
    question:'We can help the environment by turning off the tap while brushing our teeth.',
    answer:true,
    explanation:'Yes! Turning off the tap while brushing teeth <b>saves water</b>, which helps conserve this precious resource.' }),

  makeMCQ({ id:'g3ssee-env-048', chapterId:'g3ssee-environment', difficulty:2, subsection:'caring_environment',
    question:'A pupil uses both sides of a sheet of paper before throwing it away. Which R is this?',
    options:['Reuse','Reduce','Recycle','Remove'],
    answer:'Reuse',
    hint:'The pupil is using the same paper again on the other side.',
    explanation:'Using both sides of paper is an example of <b>reuse</b> — the same resource is used more than once before being discarded.' }),

  makeMCQ({ id:'g3ssee-env-049', chapterId:'g3ssee-environment', difficulty:2, subsection:'caring_environment',
    question:'Why is littering harmful to animals in Mauritius?',
    options:['Animals can eat it or get trapped','Animals enjoy collecting the litter','Animals get extra food from litter','Litter does not bother animals'],
    answer:'Animals can eat it or get trapped',
    hint:'Think about what happens if a sea turtle swallows a plastic bag.',
    explanation:'Animals such as sea turtles mistake plastic for food. They can swallow litter or get trapped in it, and that causes injury or death. Litter is never food and never harmless.'}),

  makeMCQ({ id:'g3ssee-env-050', chapterId:'g3ssee-environment', difficulty:3, subsection:'caring_environment',
    question:'Which of these actions best follows the 3R principle to help the environment?',
    options:['Taking old newspapers to a recycling centre','Buying a new plastic water bottle each day','Burning the garden waste behind the house','Leaving food to rot on the kitchen floor'],
    answer:'Taking old newspapers to a recycling centre',
    hint:'This action turns old material into something useful again.',
    explanation:'Taking newspapers to a recycling centre is <b>recycling</b> — the paper is processed into new paper products, so less waste goes to landfill. Buying, burning and leaving waste to rot follow none of the 3Rs.'})

);

})();
