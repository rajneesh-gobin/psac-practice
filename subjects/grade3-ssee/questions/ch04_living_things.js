'use strict';
(function () {

// Grade 3 SSEE — Unit 4: Living and Non-living Things
// Source: MIE SSEE Grade 3 Part 1 pp.93-124
// IDs: g3ssee-liv-001 onwards

// ── living_things (001-030) ────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g3ssee-liv-001', chapterId:'g3ssee-living', difficulty:1, subsection:'living_things',
    question:'Which of the following is a LIVING thing?',
    options:['A cat','A stone','A cup','A spoon'],
    answer:'A cat',
    hint:'Living things breathe, grow and reproduce.',
    explanation:'A <b>cat</b> is living — it breathes, eats, grows, moves and reproduces. A stone, a cup and a spoon are non-living.'}),

  makeMCQ({ id:'g3ssee-liv-002', chapterId:'g3ssee-living', difficulty:1, subsection:'living_things',
    question:'How many main characteristics do living things share?',
    options:['7','2','10','1'],
    answer:'7',
    hint:'MRS GREN is a useful way to remember them.',
    explanation:'Living things share <b>7 characteristics</b>: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion and Nutrition (MRS GREN).' }),

  makeTF({ id:'g3ssee-liv-003', chapterId:'g3ssee-living', difficulty:1, subsection:'living_things',
    question:'All living things grow.',
    answer:true,
    explanation:'Yes! <b>Growth</b> is a characteristic of all living things. Animals grow from young to adult; plants grow from seed to mature plant.' }),

  makeMCQ({ id:'g3ssee-liv-004', chapterId:'g3ssee-living', difficulty:1, subsection:'living_things',
    question:'Which characteristic of living things refers to getting rid of waste products from the body?',
    options:['Excretion','Nutrition','Growth','Sensitivity'],
    answer:'Excretion',
    hint:'Think of how our body removes wastes it no longer needs.',
    explanation:'<b>Excretion</b> is the process by which living things remove waste products from their bodies — for example, humans breathe out carbon dioxide and excrete urine.' }),

  makeMCQ({ id:'g3ssee-liv-005', chapterId:'g3ssee-living', difficulty:1, subsection:'living_things',
    question:'What is RESPIRATION in living things?',
    options:['The process of using food to release energy','The process of making food using sunlight','The ability to move from place to place','The ability to feel and respond to changes'],
    answer:'The process of using food to release energy',
    hint:'Animals breathe in oxygen for this process.',
    explanation:'<b>Respiration</b> is the process by which living things use food (glucose) and oxygen to release energy for their activities.' }),

  makeMCQ({ id:'g3ssee-liv-006', chapterId:'g3ssee-living', difficulty:2, subsection:'living_things',
    question:'A plant grows towards a light source. Which characteristic of living things does this show?',
    options:['Sensitivity','Reproduction','Respiration','Excretion'],
    answer:'Sensitivity',
    hint:'The plant is detecting and responding to a change in its environment.',
    explanation:'Growing towards light shows <b>sensitivity</b> — detecting and responding to a change (a stimulus) in the surroundings. Reproduction makes offspring, respiration releases energy and excretion removes waste.'}),

  makeMCQ({ id:'g3ssee-liv-007', chapterId:'g3ssee-living', difficulty:1, subsection:'living_things',
    question:'Which characteristic of living things refers to producing offspring?',
    options:['Reproduction','Respiration','Excretion','Nutrition'],
    answer:'Reproduction',
    hint:'This is how living things make more of themselves.',
    explanation:'<b>Reproduction</b> is the making of offspring: animals produce young and plants produce seeds. Respiration releases energy, excretion removes waste and nutrition is feeding.'}),

  makeTF({ id:'g3ssee-liv-008', chapterId:'g3ssee-living', difficulty:1, subsection:'living_things',
    question:'All living things need food (nutrition).',
    answer:true,
    explanation:'Yes! <b>Nutrition</b> — obtaining food — is a characteristic of all living things. Plants make their own food; animals eat other organisms.' }),

  makeMCQ({ id:'g3ssee-liv-009', chapterId:'g3ssee-living', difficulty:2, subsection:'living_things',
    question:'Which of the following shows that a baby kitten is ALIVE?',
    options:['It breathes, feeds and grows bigger','It has four legs and a long tail','It is soft, fluffy and warm to hold','It was bought from a pet shop'],
    answer:'It breathes, feeds and grows bigger',
    hint:'Living things show life processes such as breathing, eating and growing.',
    explanation:'Breathing, feeding and growing are <b>life processes</b>, and together they show the kitten is alive. Legs, fur and where it came from tell us nothing about whether a thing is living.'}),

  makeMCQ({ id:'g3ssee-liv-010', chapterId:'g3ssee-living', difficulty:2, subsection:'living_things',
    question:'Are mushrooms living things?',
    options:['Yes, they grow and reproduce','No, they have no green leaves','No, they cannot make their food','No, they cannot move about'],
    answer:'Yes, they grow and reproduce',
    hint:'Mushrooms are a type of fungi — they show life processes.',
    explanation:'Yes — mushrooms are living things (fungi). They grow, respire and reproduce by releasing spores, even though they cannot make their own food or move around as animals do.'}),

  makeMCQ({ id:'g3ssee-liv-011', chapterId:'g3ssee-living', difficulty:3, subsection:'living_things',
    question:'A fire grows in size, moves (spreads) and produces waste gases. Is it ALIVE?',
    options:['No, it cannot reproduce or respond','Yes, it grows and it moves about','Yes, it needs oxygen to keep going','No, it has no colour of its own'],
    answer:'No, it cannot reproduce or respond',
    hint:'Consider ALL the characteristics of living things.',
    explanation:'Fire is <b>not alive</b>: it has no cells, it cannot reproduce, and it does not respond to stimuli the way living things do. It only copies a few life processes.'}),

  makeMCQ({ id:'g3ssee-liv-012', chapterId:'g3ssee-living', difficulty:2, subsection:'living_things',
    question:'What do ALL living things — from bacteria to elephants — have in common?',
    options:['They are all made of cells','They all have a backbone','They all live in water','They all produce seeds'],
    answer:'They are all made of cells',
    hint:'The cell is the basic unit of life.',
    explanation:'All living things are made of <b>cells</b> — the basic building blocks of life. Some organisms (like bacteria) have only one cell; others (like humans) have trillions.' }),

  makeTF({ id:'g3ssee-liv-013', chapterId:'g3ssee-living', difficulty:1, subsection:'living_things',
    question:'Plants are living things because they grow and reproduce.',
    answer:true,
    explanation:'Yes! Plants are <b>living things</b> — they grow, reproduce (by seeds or other means), respire and respond to their environment.' }),

  makeMCQ({ id:'g3ssee-liv-014', chapterId:'g3ssee-living', difficulty:2, subsection:'living_things',
    question:'Which of the following animals shows MOVEMENT as a life process?',
    options:['A fish swimming in the sea','A stone rolling down a hill','A leaf blowing in the wind','A ball bouncing on the ground'],
    answer:'A fish swimming in the sea',
    hint:'Movement controlled by the organism itself is a life process.',
    explanation:'A <b>fish swimming</b> shows self-controlled movement — a life process. Stones and leaves moving are caused by external forces (gravity and wind), not by life processes.' }),

  makeMCQ({ id:'g3ssee-liv-015', chapterId:'g3ssee-living', difficulty:1, subsection:'living_things',
    question:'Bacteria are very tiny living things that cannot be seen without a microscope. What are they?',
    options:['Microorganisms','Small machines','Tiny minerals','Ground rocks'],
    answer:'Microorganisms',
    hint:'Micro means very small.',
    explanation:'Bacteria are <b>microorganisms</b> — living things far too small to see with the naked eye, so a microscope is needed. They are not machines, minerals or rocks.'}),

// ── non_living (016-045) ──────────────────────────────────────────────────

  makeMCQ({ id:'g3ssee-liv-016', chapterId:'g3ssee-living', difficulty:1, subsection:'non_living',
    question:'Which of the following is a NON-LIVING thing?',
    options:['A rock','A frog','A tree','A butterfly'],
    answer:'A rock',
    hint:'Non-living things do not breathe, grow or reproduce.',
    explanation:'A <b>rock</b> is non-living — it does not breathe, eat, grow or reproduce. Frogs, trees and butterflies are all living things.' }),

  makeMCQ({ id:'g3ssee-liv-017', chapterId:'g3ssee-living', difficulty:1, subsection:'non_living',
    question:'Which of the following is a NON-LIVING thing?',
    options:['Water','Cactus','Seagull','Ant'],
    answer:'Water',
    hint:'This substance does not breathe, grow, eat or reproduce.',
    explanation:'<b>Water</b> is non-living. It is essential for life, but it does not grow, breathe or reproduce. A cactus, a seagull and an ant all do.'}),

  makeTF({ id:'g3ssee-liv-018', chapterId:'g3ssee-living', difficulty:1, subsection:'non_living',
    question:'A car can move, so it is a living thing.',
    answer:false,
    explanation:'A car <b>is not alive</b>. Although it can move, movement alone does not make something living. A car cannot grow, breathe, eat or reproduce.' }),

  makeMCQ({ id:'g3ssee-liv-019', chapterId:'g3ssee-living', difficulty:2, subsection:'non_living',
    question:'Which of the following is a non-living thing that living things NEED to survive?',
    options:['Sunlight','A mushroom','An earthworm','A butterfly'],
    answer:'Sunlight',
    hint:'Non-living things can still be essential for life.',
    explanation:'<b>Sunlight</b> is non-living, but it is essential for life — plants use it for photosynthesis, and animals depend on plants for food and oxygen.' }),

  makeMCQ({ id:'g3ssee-liv-020', chapterId:'g3ssee-living', difficulty:2, subsection:'non_living',
    question:'What is the correct term for things that have never been alive and show no life processes?',
    options:['Non-living','Long dead','Dormant','Extinct'],
    answer:'Non-living',
    hint:'These things have never shown life processes.',
    explanation:'<b>Non-living</b> things — rocks, water, air — have never been alive and show no life processes. Dead, dormant and extinct all describe things that were once alive.'}),

  makeMCQ({ id:'g3ssee-liv-021', chapterId:'g3ssee-living', difficulty:2, subsection:'non_living',
    question:'What is the difference between a DEAD thing and a NON-LIVING thing?',
    options:['Dead was once alive; non-living never was','Dead was never alive; non-living is alive','Non-living can grow; dead cannot grow','There is no difference between them'],
    answer:'Dead was once alive; non-living never was',
    hint:'Think about a fallen leaf vs. a rock.',
    explanation:'A <b>dead</b> thing — a fallen leaf, a skeleton — was once alive. A <b>non-living</b> thing — a rock, a piece of plastic — was never alive at all.'}),

  makeTF({ id:'g3ssee-liv-022', chapterId:'g3ssee-living', difficulty:1, subsection:'non_living',
    question:'Air is a non-living thing.',
    answer:true,
    explanation:'<b>Air</b> is non-living — it does not breathe, eat, grow or reproduce. However, it is essential for the survival of most living things.' }),

  makeMCQ({ id:'g3ssee-liv-023', chapterId:'g3ssee-living', difficulty:3, subsection:'non_living',
    question:'A crystal grows in size over time. Does this make it a living thing?',
    options:['No, crystal growth is a chemical change','No, because a crystal is far too small','Yes, because it grows bigger in size','Yes, because it changes its own shape'],
    answer:'No, crystal growth is a chemical change',
    hint:'Living things grow because of biological processes involving cells.',
    explanation:'A crystal grows by a <b>chemical</b> process, not a life process. Crystals have no cells and cannot reproduce, breathe or feed, so they are non-living.'}),

  makeMCQ({ id:'g3ssee-liv-024', chapterId:'g3ssee-living', difficulty:1, subsection:'non_living',
    question:'Which of the following is a non-living thing that living things depend on?',
    options:['Soil','A fish','A worm','A tree'],
    answer:'Soil',
    hint:'Plants grow in this substance.',
    explanation:'<b>Soil</b> is a non-living substance (though it contains living organisms). Plants depend on soil for support and nutrients; animals depend on plants that grow in soil.' }),

  makeMCQ({ id:'g3ssee-liv-025', chapterId:'g3ssee-living', difficulty:2, subsection:'non_living',
    question:'Carbon dioxide is a gas in the air. Is it living or non-living?',
    options:['Non-living','Once living','Dormant','Extinct'],
    answer:'Non-living',
    explanation:'Carbon dioxide is a <b>non-living</b> gas — a chemical compound. It was never alive, even though plants take it in during photosynthesis.'}),

  makeMCQ({ id:'g3ssee-liv-026', chapterId:'g3ssee-living', difficulty:1, subsection:'non_living',
    question:'Which list contains ONLY non-living things?',
    options:['Rock, water, plastic, metal','Tree, rock, fish, air','Bird, water, book, cat','Mushroom, book, dog, pencil'],
    answer:'Rock, water, plastic, metal',
    explanation:'<b>Rock, water, plastic and metal</b> are all non-living things. Trees, fish, birds, mushrooms and dogs are all living things.' }),

  makeTF({ id:'g3ssee-liv-027', chapterId:'g3ssee-living', difficulty:1, subsection:'non_living',
    question:'A dead tree is a non-living thing.',
    answer:false,
    explanation:'A dead tree is <b>not</b> non-living — it is a <b>dead</b> living thing. Non-living things (like rocks) were never alive. The dead tree was once alive.' }),

  makeMCQ({ id:'g3ssee-liv-028', chapterId:'g3ssee-living', difficulty:2, subsection:'non_living',
    question:'Which of these non-living things is MOST important for plants to survive?',
    options:['Water','Plastic','Metal','Glass'],
    answer:'Water',
    hint:'Plants wilt and die when they do not get this.',
    explanation:'<b>Water</b> is the most important non-living substance for plant survival — plants use it for photosynthesis and to transport nutrients through their stems.' }),

  makeMCQ({ id:'g3ssee-liv-029', chapterId:'g3ssee-living', difficulty:2, subsection:'non_living',
    question:'Which non-living factor affects where animals and plants can live?',
    options:['Temperature','Colour of rocks','Number of roads','Speed of cars'],
    answer:'Temperature',
    hint:'Some organisms can only survive in warm or cool conditions.',
    explanation:'<b>Temperature</b> is a non-living (abiotic) factor that greatly affects where organisms can survive. For example, polar bears live in cold Arctic temperatures.' }),

  makeMCQ({ id:'g3ssee-liv-030', chapterId:'g3ssee-living', difficulty:3, subsection:'non_living',
    question:'A pupil says "fire is alive because it moves and needs oxygen." Is the pupil correct?',
    options:['No, fire cannot carry out all life processes','No, because fire is always cold to the touch','Yes, because it moves about and needs oxygen','Yes, because it grows and makes waste gases'],
    answer:'No, fire cannot carry out all life processes',
    hint:'One or two characteristics of life are not enough to be alive.',
    explanation:'The pupil is wrong. Fire uses oxygen and gives off carbon dioxide, which looks like respiration, but it has no cells and cannot reproduce, so it does not carry out all the life processes.'}),

// ── classifying (031-075) ──────────────────────────────────────────────────

  makeMCQ({ id:'g3ssee-liv-031', chapterId:'g3ssee-living', difficulty:1, subsection:'classifying',
    question:'Sort these into LIVING and NON-LIVING: butterfly, stone, water, flower. Which list is correct?',
    options:['Living: butterfly, flower | Non-living: stone, water','Living: stone, water | Non-living: butterfly, flower','Living: butterfly, stone | Non-living: water, flower','Living: water, flower | Non-living: butterfly, stone'],
    answer:'Living: butterfly, flower | Non-living: stone, water',
    explanation:'<b>Butterfly and flower</b> are living; <b>stone and water</b> are non-living.' }),

  makeMCQ({ id:'g3ssee-liv-032', chapterId:'g3ssee-living', difficulty:2, subsection:'classifying',
    question:'Which group correctly classifies these as living or non-living: ant, cloud, tree, sand?',
    options:['Living: ant, tree | Non-living: cloud, sand','Living: ant, cloud | Non-living: tree, sand','Living: tree, sand | Non-living: ant, cloud','Living: cloud, sand | Non-living: ant, tree'],
    answer:'Living: ant, tree | Non-living: cloud, sand',
    explanation:'<b>Ants and trees</b> are living; <b>clouds and sand</b> are non-living.' }),

  makeMCQ({ id:'g3ssee-liv-033', chapterId:'g3ssee-living', difficulty:1, subsection:'classifying',
    question:'A pupil collects the following: a shell, a leaf with no stem, a pebble, a feather. Which are once-living (dead)?',
    options:['The shell, leaf and feather','All four of the objects here','Only the small grey pebble','Only the leaf with no stem'],
    answer:'The shell, leaf and feather',
    hint:'Which of these were produced by living organisms?',
    explanation:'The shell (made by a mollusc), the leaf (from a plant) and the feather (from a bird) were all once part of living things. The <b>pebble</b> is non-living and never was alive.'}),

  makeTF({ id:'g3ssee-liv-034', chapterId:'g3ssee-living', difficulty:1, subsection:'classifying',
    question:'Classifying objects helps scientists to study and understand them better.',
    answer:true,
    explanation:'Yes! <b>Classification</b> is an important scientific skill — sorting objects into groups based on their characteristics makes it easier to study and understand them.' }),

  makeMCQ({ id:'g3ssee-liv-035', chapterId:'g3ssee-living', difficulty:2, subsection:'classifying',
    question:'Which criterion is used to separate living from non-living things?',
    options:['Whether it shows life processes','Whether it is green or dark brown','Whether it is big or small','Whether it is wet or dry'],
    answer:'Whether it shows life processes',
    explanation:'We sort things as living or non-living by whether they show <b>life processes</b> — growth, respiration, reproduction and the rest. Colour, size and wetness tell us nothing.'}),

  makeMCQ({ id:'g3ssee-liv-036', chapterId:'g3ssee-living', difficulty:2, subsection:'classifying',
    question:'Which of the following is an example of CLASSIFYING animals?',
    options:['Sorting them by whether they have a backbone','Counting how many of them live on an island','Giving every animal in the zoo the same name','Feeding every animal in the zoo the same food'],
    answer:'Sorting them by whether they have a backbone',
    explanation:'Sorting animals into <b>vertebrates</b> (with a backbone) and <b>invertebrates</b> (without one) is classification — putting them into groups by a shared feature. Counting, naming and feeding are not.'}),

  makeMCQ({ id:'g3ssee-liv-037', chapterId:'g3ssee-living', difficulty:1, subsection:'classifying',
    question:'Ali is sorting objects on a table into two groups. He puts seeds and beans in Group A, and coins and buttons in Group B. What is the basis of his classification?',
    options:['Living vs. non-living','Bright vs. dull colour','Heavy vs. very light','Round vs. square shape'],
    answer:'Living vs. non-living',
    hint:'Seeds and beans come from plants. Coins and buttons do not.',
    explanation:'Seeds and beans are (or once were) living; coins and buttons are non-living. Ali is sorting by <b>living vs. non-living</b>, not by colour, weight or shape.'}),

  makeMCQ({ id:'g3ssee-liv-038', chapterId:'g3ssee-living', difficulty:3, subsection:'classifying',
    question:'A scientist finds an unknown object. It does not move, but it grows slowly and releases spores. Is it living?',
    options:['Yes — it grows and reproduces by spores','No — it cannot move from place to place','No — it is not green in colour like a plant','Yes — it must be living in the water'],
    answer:'Yes — it grows and reproduces by spores',
    hint:'Movement is not required for all living things — plants do not move from place to place.',
    explanation:'Growth and reproduction by <b>spores</b> are life processes, so the object is living — most likely a fungus. Not every living thing moves, and not every living thing is green.'}),

  makeMCQ({ id:'g3ssee-liv-039', chapterId:'g3ssee-living', difficulty:2, subsection:'classifying',
    question:'Which of these correctly sorts plants into two groups?',
    options:['Flowering plants and non-flowering plants','Green plants and reddish-brown plants','Wet-season plants and dry-season plants','Big garden plants and small garden plants'],
    answer:'Flowering plants and non-flowering plants',
    explanation:'Plants are classified as <b>flowering</b> (mango, rose — they produce flowers, fruit and seeds) and <b>non-flowering</b> (fern, pine, moss — they reproduce by spores or cones). Size, colour and season are not classification groups.'}),

  makeTF({ id:'g3ssee-liv-040', chapterId:'g3ssee-living', difficulty:1, subsection:'classifying',
    question:'We can classify animals by what they eat: herbivores, carnivores and omnivores.',
    answer:true,
    explanation:'Yes! Animals can be classified by their diet: <b>herbivores</b> (plant eaters), <b>carnivores</b> (meat eaters) and <b>omnivores</b> (eat both plants and meat).' }),

  makeMCQ({ id:'g3ssee-liv-041', chapterId:'g3ssee-living', difficulty:2, subsection:'classifying',
    question:'Priya finds five objects in the garden: a stone, a snail, a dead leaf, a plastic bag and a mushroom. How many are living?',
    options:['2','1','3','5'],
    answer:'2',
    hint:'Only count objects showing current life processes.',
    explanation:'The <b>snail</b> and the <b>mushroom</b> are living (2 objects). The stone and plastic bag are non-living. The dead leaf is dead — once living, now no longer showing life processes.' }),

  makeMCQ({ id:'g3ssee-liv-042', chapterId:'g3ssee-living', difficulty:2, subsection:'classifying',
    question:'Why is it important to classify plants and animals into groups?',
    options:['It helps scientists study and compare them','It makes all of the organisms look the same','It stops the plants from growing any taller','It prevents wild animals from moving around'],
    answer:'It helps scientists study and compare them',
    explanation:'Classification sorts living things into groups by shared features, so scientists can <b>study, compare and understand</b> them more easily.'}),

  makeMCQ({ id:'g3ssee-liv-043', chapterId:'g3ssee-living', difficulty:1, subsection:'classifying',
    question:'Sort: dog, cloud, chair, tree, river. How many are LIVING?',
    options:['2','1','3','5'],
    answer:'2',
    hint:'Which of these breathe, eat, grow and reproduce?',
    explanation:'Only the <b>dog</b> and the <b>tree</b> are living (2 things). Cloud, chair and river are non-living.' }),

  makeMCQ({ id:'g3ssee-liv-044', chapterId:'g3ssee-living', difficulty:3, subsection:'classifying',
    question:'A wood carving in the shape of a fish is made from a log. Which statement is TRUE?',
    options:['Non-living, but the wood was once alive','Living, because it has a fish shape','Living, because wood comes from a tree','Non-living, because it is brown wood'],
    answer:'Non-living, but the wood was once alive',
    hint:'Consider the original source of the wood.',
    explanation:'The carving shows no life processes, so it is <b>non-living</b>. The wood it was cut from, however, came from a tree that was once alive.'}),

  makeMCQ({ id:'g3ssee-liv-045', chapterId:'g3ssee-living', difficulty:2, subsection:'classifying',
    question:'Which set of characteristics would a scientist use to classify an organism as an ANIMAL?',
    options:['It moves, breathes and eats other living things','It makes its own food using the light of the sun','It has no cells at all and never breathes at all','It can only ever live inside the salty sea water'],
    answer:'It moves, breathes and eats other living things',
    hint:'Animals are consumers — they cannot produce their own food.',
    explanation:'Animals <b>move</b>, <b>breathe</b> and <b>eat other organisms</b>, because they cannot make their own food the way plants do. Having no cells means not being alive at all, and plenty of animals live on land.'})

);

})();
