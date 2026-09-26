'use strict';
// NCE 2021 Grade 9 Biology — past-paper questions adapted to MCQ format.
// Source: Mauritius Examinations Syndicate.
// ⚠ Alt text never names the answer.

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp21b-001', chapterId:'g9s-b2-reproductive', subsection:'stds', difficulty:1,
    question:'Which one of the following is a <b>non-communicable</b> disease?',
    options:['Stroke','Syphilis','Gonorrhoea','Influenza'], answer:'Stroke',
    hint:'A non-communicable disease cannot be passed from one person to another.',
    explanation:'<b>Stroke</b> is a cardiovascular condition caused by a blocked or burst blood vessel in the brain — it is not caused by a pathogen and cannot be transmitted. Syphilis, gonorrhoea and influenza are all communicable infections. 📄 NCE 2021 Biology exam.' }),

  makeMCQ({ id:'g9s-pp21b-002', chapterId:'g9s-b1-circulatory', subsection:'components_of_blood', difficulty:1,
    question:'Which part of human blood <b>fights against foreign bodies</b>?',
    options:['Plasma','Red blood cells','White blood cells','Platelets'], answer:'White blood cells',
    hint:'Which component produces antibodies and engulfs pathogens?',
    explanation:'<b>White blood cells</b> defend the body — some engulf and digest pathogens, others produce antibodies. Plasma is the liquid carrier, red cells carry oxygen and platelets clot the blood. 📄 NCE 2021 Biology exam.' }),

  makeMCQ({ id:'g9s-pp21b-003', chapterId:'g9s-b3-biodiversity', subsection:'human_threats', difficulty:2,
    question:'Which of the following gases <b>causes acid rain</b>?',
    options:['Carbon monoxide','Sulfur dioxide','Oxygen','Hydrogen'], answer:'Sulfur dioxide',
    hint:'Acid rain forms when a gas from burning fossil fuels dissolves in atmospheric water.',
    explanation:'<b>Sulfur dioxide</b> released by burning fossil fuels dissolves in rainwater to form sulfuric acid, producing acid rain that damages plants, soils and aquatic ecosystems. Carbon monoxide causes poisoning, not acid rain, and oxygen and hydrogen are not pollutants here. 📄 NCE 2021 Biology exam.' }),

  makeMCQ({ id:'g9s-pp21b-004', chapterId:'g9s-b3-biodiversity', subsection:'what_is_biodiversity', difficulty:1,
    question:'What is meant by the term <b>biodiversity</b>?',
    options:['The place where different species live','The variety of species in a defined area','The conditions in which different species live','The number of organisms of the same species'],
    answer:'The variety of species in a defined area',
    hint:'Think of what "bio" (life) + "diversity" (variety) means together.',
    explanation:'<b>Biodiversity</b> is the variety of different species found in a habitat or area. It is not about the number of individuals of one species, nor about the physical conditions of the habitat. 📄 NCE 2021 Biology exam.' }),

  makeMCQ({ id:'g9s-pp21b-005', chapterId:'g9s-b3-biodiversity', subsection:'human_threats', difficulty:2,
    question:'A farmer releases fertilisers into a nearby river, causing algae to grow rapidly and fish to die. What harmful process is shown?',
    options:['Global warming','Ozone depletion','Deforestation','Eutrophication'], answer:'Eutrophication',
    hint:'Excess nutrients in water feed algae; when algae die bacteria consume oxygen, suffocating fish.',
    explanation:'<b>Eutrophication</b> occurs when excess nutrients (from fertilisers) cause algal blooms. When algae die, decomposers use up oxygen, depriving fish and other aquatic organisms of it. Global warming and ozone depletion involve atmospheric changes, and deforestation removes trees. 📄 NCE 2021 Biology exam.' }),

  makeMCQ({ id:'g9s-pp21b-006', chapterId:'g9s-b3-biodiversity', subsection:'human_threats', difficulty:1,
    question:'What are <b>invasive alien species</b>?',
    options:['Exotic species which affect native species','Endemic species found naturally in a specific region','Species that have become extinct','Species that are endangered'],
    answer:'Exotic species which affect native species',
    hint:'They have been introduced from outside and outcompete or harm local organisms.',
    explanation:'<b>Invasive alien species</b> are non-native (exotic) species introduced to a new area, where they often outcompete, predate or otherwise harm the native species. They are the opposite of endemic species, which are found naturally in one place. 📄 NCE 2021 Biology exam.' }),

  makeMCQ({ id:'g9s-pp21b-007', chapterId:'g9s-b4-plant-nutrition', subsection:'leaf_adaptation', difficulty:2,
    question:'Carbon dioxide enters a leaf by the process of <b>diffusion</b>. What happens to particles during diffusion?',
    options:['They move from a region of high concentration to a region of low concentration',
             'They move from a region of low concentration to a region of high concentration',
             'They move from a hot region of the leaf to a cold one',
             'They move from a cold region of the leaf to a hot one'],
    answer:'They move from a region of high concentration to a region of low concentration',
    hint:'Diffusion is a passive process — particles spread out naturally.',
    explanation:'During <b>diffusion</b>, particles move <b>down</b> their concentration gradient — from where they are more concentrated to where they are less concentrated — until the concentrations equalise. CO₂ enters through stomata because CO₂ concentration is lower inside the leaf (it is used up in photosynthesis) than outside. 📄 NCE 2021 Biology exam.' }),

  makeMCQ({ id:'g9s-pp21b-008', chapterId:'g9s-b2-reproductive', subsection:'male_reproductive_system', difficulty:1,
    question:'What is the <b>male sex cell</b> called?',
    options:['Penis','Scrotum','Sperm','Testis'], answer:'Sperm',
    hint:'It is produced in the testes and swims to fertilise the egg.',
    explanation:'The male sex cell (gamete) is the <b>sperm</b>. The testis is the organ that produces sperm; the scrotum holds the testes; and the penis transfers sperm during intercourse. 📄 NCE 2021 Biology exam.' }),

  makeMCQ({ id:'g9s-pp21b-009', chapterId:'g9s-b2-reproductive', subsection:'stds', difficulty:2,
    question:'Which of the following actions would help <b>control the spread of HIV</b>?',
    options:['Carrying out regular physical exercise','Using protection during sexual contact','Washing hands regularly','Eating healthy food'],
    answer:'Using protection during sexual contact',
    hint:'HIV travels in body fluids; which option blocks that route?',
    explanation:'HIV is spread through certain body fluids, including during sexual contact. <b>Using protection (condoms)</b> during intercourse greatly reduces the risk of transmission. Exercise, handwashing and diet maintain general health but do not specifically block the sexual transmission route of HIV. 📄 NCE 2021 Biology exam.' }),

  makeMCQ({ id:'g9s-pp21b-010', chapterId:'g9s-b2-reproductive', subsection:'reproduction_basics', difficulty:2,
    question:'A diagram shows the steps in the fertilisation process. An egg and a sperm fuse, producing a cell <b>X</b>, which develops into a foetus. What does cell <b>X</b> represent?',
    options:['Embryo','Foetus','Ovum','Zygote'], answer:'Zygote',
    hint:'Fertilisation means a sperm fuses with an egg to form a single new cell — what is that cell called?',
    explanation:'When a sperm fertilises an egg (ovum), the single cell formed is called a <b>zygote</b>. The zygote divides to become an embryo, and later a foetus. 📄 NCE 2021 Biology exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp21b-pdf-001', chapterId:'g9s-b4-plant-nutrition', marks:8, year:2021, grade:9, subject:'Science (Biology)', type:'written',
    question:'Question 2. Figure 2.1 shows the skeleton of a leaf. Part A is labelled "Leaf apex". (a) Label parts B, C and D. [3] (b) Write down the word equation for photosynthesis. [1] (c) Give two ways in which leaves are adapted for photosynthesis. [2] (d) Explain how each adaptation you mentioned in part (c) helps the plant carry out photosynthesis. [2]',
    markScheme:'(a) B = Leaf margin (the outer edge); C = Network of veins (the branching smaller veins); D = Midrib (the thick central vein). (b) Carbon dioxide + water → (light energy) → glucose + oxygen. (c) Any two of: broad/flat shape; presence of chlorophyll; presence of stomata; network of veins. (d) Broad/flat shape — maximises surface area for absorbing sunlight. Presence of chlorophyll — traps light energy needed for photosynthesis. Stomata — allow CO₂ to enter and O₂ to leave the leaf. Network of veins — transport water to the leaf cells and carry away glucose.' },

  { id:'g9s-pp21b-pdf-002', chapterId:'g9s-b2-reproductive', marks:9, year:2021, grade:9, subject:'Science (Biology)', type:'written',
    question:'Question 3. Sexual and asexual reproduction are the two main ways organisms reproduce. (a) State the importance of reproduction for living organisms. [1] (b) Give two differences between sexual and asexual reproduction. [2] (c) Give one example of an organism that reproduces asexually. [1] (d) Match each organ of the reproductive system in Column A to its correct function in Column B. Organs: Ovary, Uterus, Oviduct, Scrotum, Testis. Functions: Where sperms are produced / Where a foetus grows / Carries sperms to the urethra / Holds the testis / Where fertilisation occurs / Produces eggs. [5]',
    markScheme:'(a) Reproduction ensures the continuation/survival of the species. (b) Any two: Sexual — needs two parents, produces varied offspring; Asexual — needs one parent, produces genetically identical offspring. Second difference must contrast the same feature for both. (c) Any one organism that reproduces asexually: Amoeba, yeast, potato (vegetative propagation), ginger, onion, strawberry, fern, moss, bacteria. (d) Ovary → Produces eggs; Uterus → Where a foetus grows; Oviduct → Where fertilisation occurs; Scrotum → Holds the testis; Testis → Where sperms are produced.' },

  { id:'g9s-pp21b-pdf-003', chapterId:'g9s-b1-circulatory', marks:14, year:2021, grade:9, subject:'Science (Biology)', type:'written',
    question:'Question 4. Figure 4.1 shows cross-sections of an artery, a vein and a capillary. (a) Observe Figure 4.1. Give two visible differences between the artery and the vein. [2] (b) Give the function of each blood vessel: 1. Artery, 2. Vein, 3. Capillary. [3] (c) For each blood vessel, give one way in which its structure is adapted to its function: 1. Artery, 2. Vein, 3. Capillary. [3] (d) Table 1 shows the rate of blood supply (cm³/min) to different body parts of an athlete at rest and during exercise. Body parts given: Digestive system, Kidney, Skin, Brain, Arteries of the heart, Muscles of the skeleton, Bone. (i) Use Table 1 to complete Table 2 showing whether blood supply is Reduced, Unchanged or Increased during exercise. [3] (ii) Which part of the athlete\'s body was supplied with most blood during exercise? [1] (iii) Give two reasons why this part received the most blood supply during exercise. [2]',
    markScheme:'(a) Any two visible differences: Artery has a thicker wall than vein; Artery has a narrower lumen than vein; Artery wall is more rounded/regular in shape. (b) Artery: carries blood away from the heart at high pressure; Vein: carries blood back to the heart; Capillary: allows exchange of substances (oxygen, nutrients, CO₂, waste) between blood and body cells. (c) Artery: thick muscular wall — withstands high pressure; Vein: has valves — prevents backflow; Capillary: wall is one cell thick — allows easy diffusion/exchange. (d)(i) Kidney → Reduced; Skin → Increased; Brain → Unchanged; Arteries of heart → Increased; Muscles → Increased; Bone → Reduced. (Digestive → Reduced, given as example.) (ii) Muscles of the skeleton (8000 cm³/min). (iii) Any two: muscles need more oxygen for increased respiration; muscles need more glucose for energy; muscles need more blood to remove CO₂ and other waste products of exercise.' },

  { id:'g9s-pp21b-pdf-004', chapterId:'g9s-b3-biodiversity', marks:9, year:2021, grade:9, subject:'Science (Biology)', type:'written',
    question:'Question 5. A student is exploring the biodiversity of an ecosystem using quadrats. She lays out five quadrats. The organisms found are: slugs, snails and marigold flowers. Table 3 gives the counts for each quadrat (with some data missing). Snails: Q1=4, Q2=3, Q3=4, Q4=3, Q5=3, mean=3.4. (a)(i) Give the missing number of organisms in the quadrats (Slugs Q5 = ?, Marigold Q2 = ?). (a)(ii) Calculate the mean number of each organism per quadrat. [4] (b) Using the information from Table 3, construct a bar chart of the mean number of each type of organism per quadrat. [3] (c) What can you observe from the bar chart you have drawn in part (b)? [1] (d) The student wants to get a better estimate of the number of organisms in the defined area of the ecosystem. What must she do? [1]',
    markScheme:'(a)(i) Count from figure: Slugs Q5 ≈ 2 (accept range consistent with figure); Marigold Q2 ≈ 2 (accept range). (a)(ii) Slugs mean = sum of all five quadrats ÷ 5; Marigold mean = sum ÷ 5 (accept correct arithmetic). (b) Bar chart: correctly labelled axes (type of organism on x-axis; mean number on y-axis); bars drawn accurately to scale; bars not touching. (c) Any valid observation, e.g. snails are the most numerous organism per quadrat; marigolds are the least common. (d) She must use more quadrats / use a larger number of quadrats to get a more representative sample.' }
);
