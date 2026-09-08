'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  NCE 2024 Science - past-paper questions adapted to MCQ format, plus the
//  written questions for the past-papers screen.
//  Source: Mauritius Examinations Syndicate,
//    past-papers/nce/science-biology/2024-Biology.pdf    (N530, 50 marks)
//    past-papers/nce/science-chemistry/2024-Chemistry.pdf (50 marks)
//
//  ⚠⚠ PHYSICS 2024 IS NOT IN THIS REPOSITORY. The NCE assesses Science as
//     three separate papers (Biology, Chemistry, Physics) and this pack
//     carries the exam's own B/C/P split, but past-papers/nce/science-physics/
//     holds only 2021, 2022, 2023 and 2025 - there is no 2024 paper to read.
//     So this file covers TWO of the three 2024 papers, and the g9s-p1..p5
//     chapters get nothing from it. Do not read the absence as "physics was
//     not examined in 2024"; the paper is simply missing here.
//
//  ⚠ Nine figures are cropped into assets/past-papers/g9-science-2024/. They
//    were rendered through Chrome's PDF viewer over CDP and cropped with
//    Page.captureScreenshot's `clip` (scratchpad/pdf-crop.js) - poppler on this
//    machine is pdftotext ONLY, with no pdftoppm or pdftocairo.
//
//  ⚠⚠ ONE QUESTION DELIBERATELY DID NOT BECOME A PRACTICE ITEM. Biology
//     Q4(e)(ii) gives a white blood cell "with a magnification of x 8000" and
//     asks for its ACTUAL size - the child measures the printed drawing with a
//     ruler and divides. A crop displayed at whatever size the browser picks is
//     a different measurement, so a practice version of it would mark a correct
//     reading wrong. It is kept as a written item whose mark scheme teaches the
//     METHOD (actual = image size / magnification), and the adapted item asks
//     for that method rather than for a number.
//
//  ⚠ Alt text never names the answer.
// ══════════════════════════════════════════════════════════════════════════

// ⚠ THIS NAME MUST BE UNIQUE ACROSS EVERY PACK. Question files are plain
//   scripts and several harnesses (and file:// dev) execute the whole corpus in
//   ONE context, so a bare top-level const collides the moment a second pack
//   declares it - which is exactly what the science split caused when all three
//   copies inherited _g9sc24. Same collision class as CHAPTERS and SYLLABUS.
const _g9bio24 = (file, alt) =>
  `<img src="assets/past-papers/g9-science-2024/${file}.png" alt="${alt}"` +
  ` style="display:block;margin:8px auto;max-width:min(100%,420px);height:auto;` +
  `border-radius:6px;background:#fff">`;

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp24b-001', chapterId:'g9s-b1-circulatory', subsection:'components_of_blood', difficulty:1,
    question:'Which component of blood helps in <b>blood clotting</b>?',
    options:['Platelets','Red blood cells','White blood cells','Plasma'], answer:'Platelets',
    hint:'It is the smallest of the cell fragments in blood.',
    explanation:'<b>Platelets</b> clump together at a wound and trigger the clotting process that seals it. Red cells carry oxygen, white cells fight infection and plasma is the liquid they all travel in.' }),
  makeMCQ({ id:'g9s-pp24b-002', chapterId:'g9s-b1-circulatory', subsection:'blood_vessels', difficulty:2,
    question:'The diagram shows a section through an <b>artery</b>. What does <b>X</b> represent?' +
      _g9bio24('b1-artery', 'A cross-section of a blood vessel with a thick wall and a central opening, with a label line pointing to the centre'),
    options:['A small lumen','A large lumen','A thick layer of muscle and elastic fibres','A thin layer of muscle and elastic fibres'],
    answer:'A small lumen',
    hint:'X points at the space in the middle, not at the wall. Compare how wide that space is with the thickness of the wall around it.',
    explanation:'The label points to the central channel, the <b>lumen</b>, and in an artery it is narrow compared with the very thick muscular wall. That thick wall and narrow lumen are what let an artery withstand high pressure; a vein has the reverse.' }),
  makeMCQ({ id:'g9s-pp24b-003', chapterId:'g9s-b2-reproductive', subsection:'sexual_asexual', difficulty:1,
    question:'Which one of the following reproduces <b>asexually</b>?',
    options:['Amoeba','Cats','Elephants','Pigeons'], answer:'Amoeba',
    hint:'Asexual reproduction needs only one parent and no gametes.',
    explanation:'An <b>amoeba</b> is a single-celled organism that simply divides in two, so one parent produces two identical offspring. Cats, elephants and pigeons all reproduce sexually.' }),
  makeMCQ({ id:'g9s-pp24b-004', chapterId:'g9s-b2-reproductive', subsection:'stds', difficulty:1,
    question:'Which of the following is a <b>sexually transmitted disease</b>?',
    options:['Gonorrhoea','Cholera','COVID-19','Stroke'], answer:'Gonorrhoea',
    hint:'Which one is passed on through sexual contact?',
    explanation:'<b>Gonorrhoea</b> is a bacterial infection spread by sexual contact. Cholera comes from contaminated water, COVID-19 spreads through the air and a stroke is not an infection at all.' }),
  makeMCQ({ id:'g9s-pp24b-005', chapterId:'g9s-b2-reproductive', subsection:'stds', difficulty:2,
    question:'Which of the following may lead to an <b>increase in the spread of AIDS</b>?',
    options:['Sharing contaminated needles','Using condoms during intercourse','Eating a healthy balanced diet','Taking regular exercise'],
    answer:'Sharing contaminated needles',
    hint:'HIV travels in body fluids. Which option moves blood from one person to another?',
    explanation:'A used needle carries blood, so <b>sharing needles</b> passes HIV directly from one person to another. Condoms reduce the spread, and diet and exercise do not transmit the virus either way.' }),
  makeMCQ({ id:'g9s-pp24b-006', chapterId:'g9s-b2-reproductive', subsection:'female_reproductive_system', difficulty:1,
    question:'Which part of the <b>female reproductive system produces eggs</b>?',
    options:['Ovary','Oviduct','Uterus','Vagina'], answer:'Ovary',
    hint:'Its name comes from the Latin for egg.',
    explanation:'The <b>ovary</b> produces and releases the egg cells. The oviduct carries the egg, the uterus is where a fertilised egg develops and the vagina is the entrance to the system.' }),
  makeMCQ({ id:'g9s-pp24b-007', chapterId:'g9s-b3-biodiversity', subsection:'quadrat_sampling', difficulty:2,
    question:'Which of the following can be estimated using a <b>quadrat</b>?',
    options:['Algae','Birds','Dogs','Fish'], answer:'Algae',
    hint:'A quadrat is a fixed square frame laid on the ground. What kind of organism stays inside it long enough to be counted?',
    explanation:'A quadrat counts organisms that do not move away, so it suits plants and <b>algae</b>. Birds, dogs and fish move around, so they would be counted twice or missed entirely.' }),
  makeMCQ({ id:'g9s-pp24b-008', chapterId:'g9s-b4-plant-nutrition', subsection:'photosynthesis', difficulty:1,
    question:'Which <b>green pigment</b>, present in leaves, traps light energy?',
    options:['Chlorophyll','Haemoglobin','Plasma','Starch'], answer:'Chlorophyll',
    hint:'It is what makes a leaf green.',
    explanation:'<b>Chlorophyll</b> absorbs light energy for photosynthesis and gives leaves their green colour. Haemoglobin is the red pigment in blood, and starch is the food that photosynthesis produces.' }),
  makeMCQ({ id:'g9s-pp24b-009', chapterId:'g9s-b4-plant-nutrition', subsection:'leaf_adaptation', difficulty:2,
    question:'The diagram shows the structure of a leaf. What do <b>P</b> and <b>Q</b> represent?' +
      _g9bio24('b2-leaf', 'A drawing of a leaf with two label lines, one to its outer edge and one to a central line running down it'),
    options:['P leaf margin, Q midrib','P network of veins, Q midrib','P leaf apex, Q network of veins','P leaf margin, Q network of veins'],
    answer:'P leaf margin, Q midrib',
    hint:'One label points at the outer EDGE of the leaf, the other at the single thick line running down its centre.',
    explanation:'P points to the outer edge, the <b>leaf margin</b>. Q points to the single thick vein running from the stalk to the tip, the <b>midrib</b>. The finer branching lines would be the network of veins, and the tip would be the apex.' }),
  makeMCQ({ id:'g9s-pp24b-010', chapterId:'g9s-b4-plant-nutrition', subsection:'photosynthesis_experiments', difficulty:2,
    question:'Why should a leaf be <b>heated in alcohol</b> before testing it for starch?',
    options:['To remove colour from the leaf','To stop all chemical reactions in the leaf','To make the leaf softer','To remove oxygen from the leaf'],
    answer:'To remove colour from the leaf',
    hint:'The starch test uses iodine, which turns blue-black. What would stop you seeing that colour change?',
    explanation:'Alcohol dissolves the green <b>chlorophyll</b> out of the leaf. Without that step the leaf stays green and the blue-black iodine colour cannot be seen. Boiling in water is what kills the leaf and stops reactions.' }),

  // ── Questions 2-5: adapted from the written parts ───────────────────────,
  makeMCQ({ id:'g9s-pp24b-011', chapterId:'g9s-b2-reproductive', subsection:'sexual_asexual', difficulty:3,
    question:'What is a <b>difference</b> between sexual and asexual reproduction?',
    options:['Sexual reproduction needs two parents; asexual reproduction needs only one','Sexual reproduction needs only one parent; asexual reproduction needs two','Only asexual reproduction produces offspring that vary','Only sexual reproduction produces identical offspring'],
    answer:'Sexual reproduction needs two parents; asexual reproduction needs only one',
    hint:'Count the parents, and think about whether the offspring are identical.',
    explanation:'Sexual reproduction joins gametes from <b>two</b> parents, so the offspring vary. Asexual reproduction uses <b>one</b> parent and produces offspring genetically identical to it.' }),
  makeMCQ({ id:'g9s-pp24b-012', chapterId:'g9s-b2-reproductive', subsection:'sexual_asexual', difficulty:2,
    question:'Which pair of plants reproduces <b>asexually</b>?',
    options:['Potato and ginger','Mango and litchi','Maize and rice','Bean and pea'], answer:'Potato and ginger',
    hint:'Which of these are grown by planting a piece of the parent plant rather than a seed?',
    explanation:'A <b>potato</b> tuber and a <b>ginger</b> rhizome each grow into a new plant identical to the parent, with no seed and no second parent. The others are all grown from seed, which is sexual reproduction.' }),
  makeMCQ({ id:'g9s-pp24b-013', chapterId:'g9s-b3-biodiversity', subsection:'what_is_biodiversity', difficulty:2,
    question:'What is meant by <b>biodiversity</b>?',
    options:['The variety of living organisms in an area','The total number of animals in an area','The number of plants grown on a farm','The variety of rocks and soils in an area'],
    answer:'The variety of living organisms in an area',
    hint:'The word joins "bio" (life) with "diversity" (variety).',
    explanation:'Biodiversity is the <b>variety of living organisms</b> in a habitat - the range of different species, not simply how many individuals there are.' }),
  makeMCQ({ id:'g9s-pp24b-014', chapterId:'g9s-b3-biodiversity', subsection:'natural_threats', difficulty:2,
    question:'Which pair are <b>natural calamities</b> that affect biodiversity?',
    options:['Cyclone and drought','Pollution and deforestation','Deforestation and drought','Cyclone and pollution'],
    answer:'Cyclone and drought',
    hint:'Which two happen without any human action?',
    explanation:'A <b>cyclone</b> and a <b>drought</b> are natural events. Pollution and deforestation are caused by people, so they are human activities rather than natural calamities.' }),
  makeMCQ({ id:'g9s-pp24b-015', chapterId:'g9s-b3-biodiversity', subsection:'importance_of_biodiversity', difficulty:3,
    question:'Which is an <b>ecological</b> benefit of biodiversity?',
    options:['It keeps food chains and food webs stable','It attracts tourists to the country','It provides jobs in the fishing industry','It earns foreign currency from exports'],
    answer:'It keeps food chains and food webs stable',
    hint:'Ecological means about the ecosystem itself, not about money or people.',
    explanation:'A varied community keeps <b>food chains and webs stable</b>, so losing one species does not collapse the system. Tourism, jobs and export earnings are socio-economic benefits.' }),
  makeMCQ({ id:'g9s-pp24b-016', chapterId:'g9s-b1-circulatory', subsection:'blood_vessels', difficulty:2,
    question:'The diagram shows part of the circulatory system, with an artery on one side and a vein on the other. What does structure <b>A</b> represent?' +
      _g9bio24('b4-circulatory', 'A diagram of two large vessels joined by a dense network of very fine vessels, with a label pointing to the network'),
    options:['Capillaries','Veins','Arteries','Valves'], answer:'Capillaries',
    hint:'A points to the fine network between the artery and the vein.',
    explanation:'The mesh of extremely fine vessels linking the artery to the vein is the <b>capillary</b> network. Their walls are one cell thick, which is what allows exchange with the surrounding tissue.' }),
  makeMCQ({ id:'g9s-pp24b-017', chapterId:'g9s-b1-circulatory', subsection:'blood_vessels', difficulty:2,
    question:'What is the <b>function of capillaries</b>?',
    options:['To allow exchange of substances between blood and body cells','To carry blood away from the heart at high pressure','To return blood to the heart against gravity','To stop blood flowing backwards'],
    answer:'To allow exchange of substances between blood and body cells',
    hint:'Their walls are only one cell thick. What does that make possible?',
    explanation:'Capillary walls are one cell thick, so oxygen and nutrients pass out to the cells and waste passes in - the <b>exchange</b> the whole circulatory system exists to deliver. Carrying blood at pressure is the artery’s job, and valves stop backflow in veins.' }),
  makeMCQ({ id:'g9s-pp24b-018', chapterId:'g9s-b1-circulatory', subsection:'blood_vessels', difficulty:3,
    question:'Which statement correctly describes a difference in the way <b>arteries and veins</b> carry blood?',
    options:['Arteries carry blood away from the heart; veins carry blood towards it','Arteries carry blood towards the heart; veins carry blood away from it','Both carry blood at the same pressure','Veins carry blood in spurts; arteries carry it steadily'],
    answer:'Arteries carry blood away from the heart; veins carry blood towards it',
    hint:'Think about direction first, then pressure.',
    explanation:'Arteries carry blood <b>away from</b> the heart, at high pressure and in surges; veins return it <b>towards</b> the heart at low pressure and steadily, which is why they need valves.' }),
  makeMCQ({ id:'g9s-pp24b-019', chapterId:'g9s-b1-circulatory', subsection:'pulse', difficulty:2,
    question:'What is the <b>stretching and recoiling of the artery walls</b> known as?',
    options:['The pulse','The heartbeat','Blood pressure','Circulation'], answer:'The pulse',
    hint:'You can feel it at the wrist.',
    explanation:'Each surge of blood from the heart stretches the artery wall, which then recoils. That wave is the <b>pulse</b>, and it can be felt wherever an artery runs close to the skin.' }),
  makeMCQ({ id:'g9s-pp24b-020', chapterId:'g9s-b1-circulatory', subsection:'cardiovascular_disease', difficulty:2,
    question:'Which pair are <b>risk factors</b> for coronary heart disease?',
    options:['Smoking and a diet high in fat','Regular exercise and a balanced diet','Drinking water and sleeping well','Eating vegetables and walking daily'],
    answer:'Smoking and a diet high in fat',
    hint:'Which habits damage or narrow the arteries?',
    explanation:'<b>Smoking</b> damages artery walls and a <b>high-fat diet</b> builds fatty deposits that narrow the coronary arteries. The other options all reduce the risk.' }),
  makeMCQ({ id:'g9s-pp24b-021', chapterId:'g9s-b1-circulatory', subsection:'components_of_blood', difficulty:2,
    question:'How do <b>white blood cells</b> protect the body from germs?',
    options:['They engulf germs and produce antibodies','They carry oxygen to the germs','They clot the blood around germs','They dissolve germs with stomach acid'],
    answer:'They engulf germs and produce antibodies',
    hint:'There are two kinds of white blood cell, and they defend in two different ways.',
    explanation:'Some white blood cells <b>engulf and digest</b> germs; others make <b>antibodies</b> that stick to germs and destroy them. Carrying oxygen is the red cell’s job and clotting is the platelet’s.' }),
  makeMCQ({ id:'g9s-pp24b-022', chapterId:'g9s-b1-circulatory', subsection:'magnification', difficulty:3,
    question:'A drawing of a cell is printed at a magnification of <b>&times; 8000</b>. How is the <b>actual size</b> of the cell worked out?',
    options:['Measure the drawing, then divide by 8000','Measure the drawing, then multiply by 8000','Divide 8000 by the size of the drawing','Measure the drawing and add 8000'],
    answer:'Measure the drawing, then divide by 8000',
    hint:'The drawing is 8000 times bigger than the real cell. To undo that, do the opposite operation.',
    explanation:'Magnification = image size &divide; actual size, so <b>actual size = image size &divide; magnification</b>. Measure the drawing with a ruler and divide by 8000. Multiplying would make an already-enlarged picture larger still.' }),
  makeMCQ({ id:'g9s-pp24b-023', chapterId:'g9s-b4-plant-nutrition', subsection:'leaf_adaptation', difficulty:1,
    question:'What are the <b>small pores</b> in a leaf called?',
    options:['Stomata','Veins','Chloroplasts','Cuticles'], answer:'Stomata',
    hint:'They are mostly on the underside of the leaf and can open and close.',
    explanation:'The pores are <b>stomata</b> (one is a stoma). Each is opened and closed by a pair of guard cells.' }),
  makeMCQ({ id:'g9s-pp24b-024', chapterId:'g9s-b4-plant-nutrition', subsection:'leaf_adaptation', difficulty:2,
    question:'What is the <b>function of the stomata</b> in a leaf?',
    options:['To allow gases to enter and leave the leaf','To absorb water from the soil','To trap light energy for photosynthesis','To transport food to the roots'],
    answer:'To allow gases to enter and leave the leaf',
    hint:'Photosynthesis needs one gas in and gives another out.',
    explanation:'Stomata let <b>carbon dioxide in and oxygen out</b> (and water vapour escapes through them too). Light is trapped by chlorophyll, water is absorbed by roots and food is carried in the phloem.' }),
  makeMCQ({ id:'g9s-pp24b-025', chapterId:'g9s-b4-plant-nutrition', subsection:'factors_for_photosynthesis', difficulty:4,
    question:'In an experiment on pond weed carried out in a dark room, bubbles were produced only when <b>both</b> light and a carbon dioxide source were present; with either one missing, no bubbles were produced.' +
      _g9bio24('b6-photosynthesis-setup', 'A drawing of laboratory apparatus: a lamp beside a beaker holding a funnel, a test tube and a water plant') +
      'What conclusion can be drawn?',
    options:['Both light and carbon dioxide are needed for photosynthesis','Light alone is enough for photosynthesis','Carbon dioxide alone is enough for photosynthesis','Neither light nor carbon dioxide affects photosynthesis'],
    answer:'Both light and carbon dioxide are needed for photosynthesis',
    hint:'Compare the test where both were present with the three where one or both were missing.',
    explanation:'Bubbles of oxygen appeared only when light AND carbon dioxide were both present, so <b>both are required</b>. Removing either one stopped photosynthesis, which is exactly what a controlled experiment is designed to show.' }),
  makeMCQ({ id:'g9s-pp24b-026', chapterId:'g9s-inquiry', subsection:'hypothesis_testing', difficulty:3,
    question:'In the pond-weed experiment, light and carbon dioxide were changed between tests. Which variable should be <b>kept constant</b>?',
    options:['The temperature of the water','The number of bubbles produced','Whether the lamp is switched on','Whether a carbon dioxide source is added'],
    answer:'The temperature of the water',
    hint:'A controlled variable is one you hold still. Two here are being changed on purpose, and one is what you measure.',
    explanation:'<b>Temperature</b> (and the type and amount of pond weed) must be held constant, or a change in bubbles could be caused by something other than light or carbon dioxide. Those two are the independent variables and the bubble count is the dependent one.' }),

  // ══ CHEMISTRY ════════════════════════════════════════════════════════════
  // ── Question 1: ten one-mark items ──────────────────────────────────────
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp24b-pdf-001', chapterId:'g9s-b2-reproductive', marks:7, year:2024, grade:9, subject:'Science (Biology)', type:'written',
    image:'assets/past-papers/g9-science-2024/b3-sexual-reproduction.png',
    imageAlt:'A flow diagram from a female and a male figure through several cell stages to a developing baby, with four labels A to D',
    question:'Question 2. (a) The diagram shows features of sexual reproduction in humans. Using the words provided, identify A, B, C and D. [zygote, foetus, ovum, sperm, embryo] There is one extra word. [4] (b) Some plants reproduce asexually. (i) Give one difference between sexual and asexual reproduction. [1] (ii) Give two examples of plants that reproduce asexually. [2]',
    markScheme:'(a) A = ovum (produced by the female); B = sperm (produced by the male); C = zygote, the single cell formed at fertilisation; D = foetus, the recognisably formed stage. “embryo” is the extra word. (b)(i) Sexual reproduction needs two parents and gametes and gives varied offspring; asexual reproduction needs one parent and gives identical offspring. (ii) Any two of: potato, ginger, onion, sugar cane, bryophyllum, strawberry.' },
  { id:'g9s-pp24b-pdf-002', chapterId:'g9s-b3-biodiversity', marks:10, year:2024, grade:9, subject:'Science (Biology)', type:'written',
    question:'Question 3. (a)(i) Define biodiversity. [2] (a)(ii) Complete the table to indicate whether the following are examples of natural calamities or human activities: cyclone, pollution, deforestation, drought. [4] (b) Give two ecological benefits of biodiversity. [2] (c) Give two socio-economic benefits of biodiversity. [2]',
    markScheme:'(a)(i) The variety of living organisms - the range of different species - found in a habitat or on Earth. (a)(ii) Natural calamities: cyclone, drought. Human activities: pollution, deforestation. (b) Any two of: keeps food chains and webs stable, maintains balance in the ecosystem, aids pollination and seed dispersal, keeps soil fertile, helps the ecosystem recover from disturbance. (c) Any two of: food and raw materials, medicines, tourism income, jobs, cultural and recreational value.' },
  { id:'g9s-pp24b-pdf-003', chapterId:'g9s-b1-circulatory', marks:11, year:2024, grade:9, subject:'Science (Biology)', type:'written',
    image:'assets/past-papers/g9-science-2024/b4-circulatory.png',
    imageAlt:'A diagram of two large vessels joined by a dense network of very fine vessels, with a label pointing to the network',
    question:'Question 4. (a) The diagram shows part of the circulatory system in humans. (i) What does structure A represent? [1] (ii) Give the function of structure A. [1] (b) Give two differences in the way arteries and veins carry blood. [2] (c) How is the stretching and recoiling of the artery walls known as? [1] (d) State two factors that may increase the risk of coronary heart disease. [2] (e)(i) Describe how white blood cells protect the body from germs. [2]',
    markScheme:'(a)(i) Capillaries. (a)(ii) They allow exchange of substances - oxygen and nutrients out to the cells, carbon dioxide and waste in - because their walls are one cell thick. (b) Arteries carry blood away from the heart, veins towards it; arteries carry it at high pressure in surges, veins at low pressure and steadily; arteries carry oxygenated blood and veins deoxygenated (the pulmonary vessels are the exception). (c) The pulse. (d) Any two of: smoking, a diet high in saturated fat, lack of exercise, obesity, high blood pressure, stress, family history. (e)(i) Some engulf and digest germs; others produce antibodies that destroy germs or neutralise their toxins.' },
  { id:'g9s-pp24b-pdf-004', chapterId:'g9s-b1-circulatory', marks:2, year:2024, grade:9, subject:'Science (Biology)', type:'written',
    image:'assets/past-papers/g9-science-2024/b5-white-blood-cell.png',
    imageAlt:'A drawing of a rounded cell containing a large irregular shaded structure',
    question:'Question 4(e)(ii). The diagram shows a white blood cell drawn at a magnification of x 8000. Calculate the actual size of the white blood cell. Show your working. Answer in mm.',
    markScheme:'Measure the diameter of the PRINTED drawing with a ruler, then divide by the magnification: actual size = image size / 8000. A drawing measuring 40 mm across therefore represents a cell of 40 / 8000 = 0.005 mm. ⚠ The number depends on the size of the printed figure, so measure the paper - a picture on a screen is a different size and gives a different answer.' },
  { id:'g9s-pp24b-pdf-005', chapterId:'g9s-b4-plant-nutrition', marks:12, year:2024, grade:9, subject:'Science (Biology)', type:'written',
    image:'assets/past-papers/g9-science-2024/b6-photosynthesis-setup.png',
    imageAlt:'A drawing of laboratory apparatus: a lamp beside a beaker holding a funnel, a test tube and a water plant',
    question:'Question 5. (a) Leaves contain small pores. (i) How are the small pores in the leaves called? [1] (ii) What is the function of the small pores? [1] (b) A student investigates the effects of light and carbon dioxide on photosynthesis, in a dark room whose only light is a lamp. Results: Test 1 light present, carbon dioxide absent, 0 bubbles/min. Test 2 light absent, carbon dioxide present, 0. Test 3 light present, carbon dioxide present, 20. Test 4 light absent, carbon dioxide absent, 0. (i) Give one variable that needs to be kept constant in each experiment. [1] (ii) Give two conclusions that the student can draw from this investigation. [2]',
    markScheme:'(a)(i) Stomata. (a)(ii) They allow gases in and out of the leaf - carbon dioxide in, oxygen out - and water vapour escapes through them. (b)(i) Any one of: temperature of the water, distance of the lamp from the beaker, type and mass of pond weed, volume of water, time the readings are taken over. (b)(ii) Any two of: photosynthesis needs BOTH light and carbon dioxide; with either one missing no photosynthesis occurs; the gas produced (oxygen) is only given off when both are present.' }
);
