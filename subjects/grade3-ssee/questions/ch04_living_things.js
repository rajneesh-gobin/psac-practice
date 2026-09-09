'use strict';
(function () {

// Grade 3 SSEE — Unit 4: Living and Non-living Things
// Source: MIE SSEE Grade 3 Part 1 pp.93-124
// IDs: g3ssee-liv-001 onwards

// ── living_things (001-030) ────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g3ssee-liv-001', chapterId:'g3ssee-living', difficulty:1, subsection:'living_things',
    question:'Which of the following is a LIVING thing?',
    options:['A cat','A stone','A plastic cup','A metal spoon'],
    answer:'A cat',
    hint:'Living things breathe, grow and reproduce.',
    explanation:'A <b>cat</b> is living — it breathes, eats, grows, moves and reproduces. A stone, plastic cup and metal spoon are non-living.' }),

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
    options:['Sensitivity (responding to stimuli)','Excretion','Nutrition','Reproduction'],
    answer:'Sensitivity (responding to stimuli)',
    hint:'The plant is detecting and responding to a change in its environment.',
    explanation:'Growing towards light shows <b>sensitivity</b> — the ability to detect and respond to changes (stimuli) in the environment. Plants respond to light; animals respond to sound, pain, heat, etc.' }),

  makeMCQ({ id:'g3ssee-liv-007', chapterId:'g3ssee-living', difficulty:1, subsection:'living_things',
    question:'Which characteristic of living things refers to producing offspring?',
    options:['Reproduction','Nutrition','Growth','Excretion'],
    answer:'Reproduction',
    hint:'This is how living things make more of themselves.',
    explanation:'<b>Reproduction</b> is the production of offspring (young). Animals mate and produce young; plants produce seeds.' }),

  makeTF({ id:'g3ssee-liv-008', chapterId:'g3ssee-living', difficulty:1, subsection:'living_things',
    question:'All living things need food (nutrition).',
    answer:true,
    explanation:'Yes! <b>Nutrition</b> — obtaining food — is a characteristic of all living things. Plants make their own food; animals eat other organisms.' }),

  makeMCQ({ id:'g3ssee-liv-009', chapterId:'g3ssee-living', difficulty:2, subsection:'living_things',
    question:'Which of the following shows that a baby kitten is ALIVE?',
    options:['It breathes, drinks milk and grows bigger every week','It is soft and fluffy','It is found in a pet shop','It has four legs'],
    answer:'It breathes, drinks milk and grows bigger every week',
    hint:'Living things show life processes such as breathing, eating and growing.',
    explanation:'A kitten showing <b>breathing, nutrition and growth</b> demonstrates life processes that prove it is a living thing.' }),

  makeMCQ({ id:'g3ssee-liv-010', chapterId:'g3ssee-living', difficulty:2, subsection:'living_things',
    question:'Are mushrooms living things?',
    options:['Yes, they grow, respire and reproduce','No, they cannot move','No, they cannot make food','No, they do not have leaves'],
    answer:'Yes, they grow, respire and reproduce',
    hint:'Mushrooms are a type of fungi — they show life processes.',
    explanation:'Yes! <b>Mushrooms</b> are living things (fungi). They grow, respire and reproduce by releasing spores, even though they cannot make their own food or move around like animals.' }),

  makeMCQ({ id:'g3ssee-liv-011', chapterId:'g3ssee-living', difficulty:3, subsection:'living_things',
    question:'A fire grows in size, moves (spreads) and produces waste gases. Is it ALIVE?',
    options:['No, because it cannot reproduce or respond to stimuli like living things','Yes, because it grows and moves','Yes, because it needs oxygen','No, because it has no colour'],
    answer:'No, because it cannot reproduce or respond to stimuli like living things',
    hint:'Consider ALL the characteristics of living things.',
    explanation:'Fire <b>is not alive</b> because it cannot reproduce, it has no cells, and it does not respond to stimuli in the way living things do. It only mimics a few life processes.' }),

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
    options:['Microorganisms','Rocks','Minerals','Machines'],
    answer:'Microorganisms',
    hint:'Micro means very small.',
    explanation:'Bacteria are <b>microorganisms</b> — living things that are too small to see with the naked eye. A microscope is needed to see them.' }),

// ── non_living (016-045) ──────────────────────────────────────────────────

  makeMCQ({ id:'g3ssee-liv-016', chapterId:'g3ssee-living', difficulty:1, subsection:'non_living',
    question:'Which of the following is a NON-LIVING thing?',
    options:['A rock','A frog','A tree','A butterfly'],
    answer:'A rock',
    hint:'Non-living things do not breathe, grow or reproduce.',
    explanation:'A <b>rock</b> is non-living — it does not breathe, eat, grow or reproduce. Frogs, trees and butterflies are all living things.' }),

  makeMCQ({ id:'g3ssee-liv-017', chapterId:'g3ssee-living', difficulty:1, subsection:'non_living',
    question:'Which of the following is a NON-LIVING thing?',
    options:['Water','Seagull','Ant','Cactus plant'],
    answer:'Water',
    hint:'This substance does not breathe, grow, eat or reproduce.',
    explanation:'<b>Water</b> is non-living. Although it is essential for life, water itself does not show the characteristics of living things.' }),

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
    options:['Non-living','Dead','Extinct','Dormant'],
    answer:'Non-living',
    hint:'These things have never shown life processes.',
    explanation:'<b>Non-living things</b> (like rocks, water and air) have never been alive and do not show any life processes.' }),

  makeMCQ({ id:'g3ssee-liv-021', chapterId:'g3ssee-living', difficulty:2, subsection:'non_living',
    question:'What is the difference between a DEAD thing and a NON-LIVING thing?',
    options:['A dead thing was once alive; a non-living thing was never alive','There is no difference','A dead thing never had life; a non-living thing is alive','A non-living thing can grow; a dead thing cannot'],
    answer:'A dead thing was once alive; a non-living thing was never alive',
    hint:'Think about a fallen leaf vs. a rock.',
    explanation:'A <b>dead</b> thing (like a fallen leaf or a skeleton) was once alive. A <b>non-living</b> thing (like a rock or plastic) was never alive at all.' }),

  makeTF({ id:'g3ssee-liv-022', chapterId:'g3ssee-living', difficulty:1, subsection:'non_living',
    question:'Air is a non-living thing.',
    answer:true,
    explanation:'<b>Air</b> is non-living — it does not breathe, eat, grow or reproduce. However, it is essential for the survival of most living things.' }),

  makeMCQ({ id:'g3ssee-liv-023', chapterId:'g3ssee-living', difficulty:3, subsection:'non_living',
    question:'A crystal grows in size over time. Does this make it a living thing?',
    options:['No, because growth in crystals is a chemical process, not a life process','Yes, because it grows','Yes, because it changes shape','No, because it is too small'],
    answer:'No, because growth in crystals is a chemical process, not a life process',
    hint:'Living things grow because of biological processes involving cells.',
    explanation:'Crystal growth is a <b>chemical/physical process</b>, not a biological one. Crystals do not have cells, cannot reproduce, breathe or eat — they are non-living.' }),

  makeMCQ({ id:'g3ssee-liv-024', chapterId:'g3ssee-living', difficulty:1, subsection:'non_living',
    question:'Which of the following is a non-living thing that living things depend on?',
    options:['Soil','A fish','A worm','A tree'],
    answer:'Soil',
    hint:'Plants grow in this substance.',
    explanation:'<b>Soil</b> is a non-living substance (though it contains living organisms). Plants depend on soil for support and nutrients; animals depend on plants that grow in soil.' }),

  makeMCQ({ id:'g3ssee-liv-025', chapterId:'g3ssee-living', difficulty:2, subsection:'non_living',
    question:'Carbon dioxide is a gas in the air. Is it living or non-living?',
    options:['Non-living','Living','Dead','Dormant'],
    answer:'Non-living',
    explanation:'<b>Carbon dioxide</b> (CO₂) is a non-living gas — a chemical compound. It is not alive, even though plants absorb it during photosynthesis.' }),

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
    options:['No, because fire cannot reproduce or carry out all life processes','Yes, because it moves and needs oxygen','Yes, because it grows and produces waste','No, because fire is cold'],
    answer:'No, because fire cannot reproduce or carry out all life processes',
    hint:'One or two characteristics of life are not enough to be alive.',
    explanation:'Fire is <b>not alive</b>. While it consumes oxygen and produces CO₂ (like respiration), it cannot reproduce, has no cells, and does not carry out all 7 life processes.' }),

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
    options:['The shell, leaf and feather','Only the pebble','Only the leaf','All four objects'],
    answer:'The shell, leaf and feather',
    hint:'Which of these were produced by living organisms?',
    explanation:'The <b>shell</b> (made by a snail/mollusc), <b>leaf</b> (from a plant) and <b>feather</b> (from a bird) were all once produced by living things. The pebble is non-living.' }),

  makeTF({ id:'g3ssee-liv-034', chapterId:'g3ssee-living', difficulty:1, subsection:'classifying',
    question:'Classifying objects helps scientists to study and understand them better.',
    answer:true,
    explanation:'Yes! <b>Classification</b> is an important scientific skill — sorting objects into groups based on their characteristics makes it easier to study and understand them.' }),

  makeMCQ({ id:'g3ssee-liv-035', chapterId:'g3ssee-living', difficulty:2, subsection:'classifying',
    question:'Which criterion is used to separate living from non-living things?',
    options:['Whether the object shows life processes','Whether it is green or brown','Whether it is big or small','Whether it is wet or dry'],
    answer:'Whether the object shows life processes',
    explanation:'We classify objects as living or non-living based on whether they show <b>life processes</b> such as growth, respiration and reproduction.' }),

  makeMCQ({ id:'g3ssee-liv-036', chapterId:'g3ssee-living', difficulty:2, subsection:'classifying',
    question:'Which of the following is an example of CLASSIFYING animals?',
    options:['Sorting them into groups: those with a backbone and those without','Counting how many are on an island','Giving all animals the same name','Feeding all animals the same food'],
    answer:'Sorting them into groups: those with a backbone and those without',
    explanation:'Sorting animals into <b>vertebrates</b> (with backbone) and <b>invertebrates</b> (without backbone) is an example of classification.' }),

  makeMCQ({ id:'g3ssee-liv-037', chapterId:'g3ssee-living', difficulty:1, subsection:'classifying',
    question:'Ali is sorting objects on a table into two groups. He puts seeds and beans in Group A, and coins and buttons in Group B. What is the basis of his classification?',
    options:['Living vs. non-living','Big vs. small','Round vs. square','Heavy vs. light'],
    answer:'Living vs. non-living',
    hint:'Seeds and beans come from plants. Coins and buttons do not.',
    explanation:'Seeds and beans are (or were) <b>living</b>; coins and buttons are <b>non-living</b>. Ali is classifying by living vs. non-living.' }),

  makeMCQ({ id:'g3ssee-liv-038', chapterId:'g3ssee-living', difficulty:3, subsection:'classifying',
    question:'A scientist finds an unknown object. It does not move, but it grows slowly and releases spores. Is it living?',
    options:['Yes — it shows growth and reproduction (spore release)','No — it cannot move','No — it is not green','Yes — it lives in water'],
    answer:'Yes — it shows growth and reproduction (spore release)',
    hint:'Movement is not required for all living things — plants do not move from place to place.',
    explanation:'The object is most likely a <b>fungus</b> or <b>plant</b>. Not all living things move; growth and reproduction by spores are life processes, confirming it is living.' }),

  makeMCQ({ id:'g3ssee-liv-039', chapterId:'g3ssee-living', difficulty:2, subsection:'classifying',
    question:'Which of these correctly sorts plants into two groups?',
    options:['Flowering plants (mango, rose) and non-flowering plants (fern, pine)','Big plants and small plants','Green plants and red plants','Wet plants and dry plants'],
    answer:'Flowering plants (mango, rose) and non-flowering plants (fern, pine)',
    explanation:'Plants are classified as <b>flowering</b> (produce flowers, fruit and seeds — like mango and rose) and <b>non-flowering</b> (reproduce by spores — like ferns and mosses).' }),

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
    options:['It helps scientists study, compare and understand different organisms','It makes all organisms look the same','It prevents animals from moving','It stops plants from growing'],
    answer:'It helps scientists study, compare and understand different organisms',
    explanation:'Classification helps scientists <b>organise living things</b> into groups based on shared features, making it easier to study, compare and understand them.' }),

  makeMCQ({ id:'g3ssee-liv-043', chapterId:'g3ssee-living', difficulty:1, subsection:'classifying',
    question:'Sort: dog, cloud, chair, tree, river. How many are LIVING?',
    options:['2','1','3','5'],
    answer:'2',
    hint:'Which of these breathe, eat, grow and reproduce?',
    explanation:'Only the <b>dog</b> and the <b>tree</b> are living (2 things). Cloud, chair and river are non-living.' }),

  makeMCQ({ id:'g3ssee-liv-044', chapterId:'g3ssee-living', difficulty:3, subsection:'classifying',
    question:'A wood carving in the shape of a fish is made from a log. Which statement is TRUE?',
    options:['The carving is non-living, but the wood it came from was once living','The carving is living because wood comes from a tree','The carving is living because it has a fish shape','The carving is non-living because it is brown'],
    answer:'The carving is non-living, but the wood it came from was once living',
    hint:'Consider the original source of the wood.',
    explanation:'The <b>carving is non-living</b> — it shows no life processes. However, the <b>wood came from a tree</b>, which was once a living organism.' }),

  makeMCQ({ id:'g3ssee-liv-045', chapterId:'g3ssee-living', difficulty:2, subsection:'classifying',
    question:'Which set of characteristics would a scientist use to classify an organism as an ANIMAL?',
    options:['It can move, breathes, eats other organisms and cannot make its own food','It makes its own food using sunlight','It has no cells and does not breathe','It only lives in water'],
    answer:'It can move, breathes, eats other organisms and cannot make its own food',
    hint:'Animals are consumers — they cannot produce their own food.',
    explanation:'Animals are classified as organisms that <b>move, breathe, eat other organisms</b> (they cannot make their own food like plants do), and reproduce.' })

);

})();
