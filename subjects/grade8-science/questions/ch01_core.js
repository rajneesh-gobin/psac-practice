'use strict';
// Grade 8 Science — Core questions, all 13 chapters
// IDs: g8s-<chapter>-NNN

(function () {

STATIC_QUESTIONS.push(

  // ── g8s-inquiry ─────────────────────────────────────────────────────────────

  makeMCQ({ id:'g8s-inquiry-001', chapterId:'g8s-inquiry', difficulty:1, subsection:'lab_procedures',
    question:'Before starting any laboratory experiment, what should a student do first?',
    options:['Read the safety rules first','Switch on all the equipment','Mix the chemicals together','Taste each solution first'],
    answer:'Read the safety rules first',
    hint:'Planning and safety come before any practical action.',
    explanation:'You should always <b>read and understand the safety rules and the procedure</b> before touching anything. This prevents accidents and makes sure the experiment is carried out correctly. Chemicals are never tasted in a laboratory.' }),

  makeMCQ({ id:'g8s-inquiry-002', chapterId:'g8s-inquiry', difficulty:2, subsection:'lab_procedures',
    question:'A scientist repeats an experiment three times and records each result. Why?',
    options:['To check the results are consistent','To impress the science teacher','Because the first result is wrong','Because one result cannot be published'],
    answer:'To check the results are consistent',
    hint:'Repeated readings improve reliability.',
    explanation:'Repeating an experiment lets the scientist <b>check that the results are consistent and calculate a reliable average</b>. This reduces the effect of random errors and makes the conclusion far more trustworthy.' }),

  makeMCQ({ id:'g8s-inquiry-003', chapterId:'g8s-inquiry', difficulty:1, subsection:'recording_data',
    question:'Which of these is the correct way to record data in a science experiment?',
    options:['In a table with headings','By remembering the numbers','On any scrap of paper','By drawing pictures only'],
    answer:'In a table with headings',
    hint:'Good data recording makes analysis and comparison easier.',
    explanation:'Data should be recorded <b>in a neat table with clear headings and units</b>. A table makes it easy to compare results, spot patterns and draw a conclusion.' }),

  makeMCQ({ id:'g8s-inquiry-004', chapterId:'g8s-inquiry', difficulty:2, subsection:'density_volume',
    question:'A student drops a stone into a measuring cylinder containing 50 cm³ of water. The level rises to 65 cm³. What is the volume of the stone?',
    options:['15 cm³','65 cm³','50 cm³','115 cm³'],
    answer:'15 cm³',
    hint:'Volume of stone = final reading − initial reading.',
    explanation:'Volume of stone = 65 − 50 = <b>15 cm³</b>. This is the water displacement method for finding the volume of an irregular solid.' }),

  makeMCQ({ id:'g8s-inquiry-005', chapterId:'g8s-inquiry', difficulty:3, subsection:'density_volume',
    question:'A block has a mass of 120 g and a volume of 40 cm³. What is its density?',
    options:['3 g/cm³','0.33 g/cm³','80 g/cm³','4800 g/cm³'],
    answer:'3 g/cm³',
    hint:'Density = mass ÷ volume.',
    explanation:'Density = mass ÷ volume = 120 ÷ 40 = <b>3 g/cm³</b>. Density tells us how much mass is packed into a given volume.' }),

  // ── g8s-food ────────────────────────────────────────────────────────────────

  makeMCQ({ id:'g8s-food-001', chapterId:'g8s-food', difficulty:1, subsection:'food_groups_nutrients',
    question:'Which nutrient provides the body with its main source of energy?',
    options:['Carbohydrates','Dietary fibre','Minerals','Vitamins'],
    answer:'Carbohydrates',
    hint:'Bread, rice and pasta are rich in this nutrient.',
    explanation:'<b>Carbohydrates</b> are the body\'s main energy source. They are broken down into glucose, which cells use to release energy in respiration. Fibre, minerals and vitamins are essential but supply no energy.' }),

  makeMCQ({ id:'g8s-food-002', chapterId:'g8s-food', difficulty:1, subsection:'food_groups_nutrients',
    question:'Which nutrient is needed for growth and repair of body tissues?',
    options:['Protein','Carbohydrates','Fats','Vitamins'],
    answer:'Protein',
    hint:'Meat, fish, eggs and beans are rich in this nutrient.',
    explanation:'<b>Protein</b> is essential for the growth and repair of cells and tissues. It is made of amino acids and is found in foods like meat, fish, eggs and legumes.' }),

  makeMCQ({ id:'g8s-food-003', chapterId:'g8s-food', difficulty:2, subsection:'deficiency_diseases',
    question:'Which disease is caused by a lack of vitamin C in the diet?',
    options:['Scurvy','Rickets','Anaemia','Kwashiorkor'],
    answer:'Scurvy',
    hint:'This disease causes bleeding gums and was common among sailors who ate no fresh fruit.',
    explanation:'<b>Scurvy</b> is caused by vitamin C deficiency. Symptoms include bleeding gums, slow wound healing and weakness. Fresh fruits like oranges and lemons prevent and cure it.' }),

  makeMCQ({ id:'g8s-food-004', chapterId:'g8s-food', difficulty:2, subsection:'deficiency_diseases',
    question:'Kwashiorkor is a deficiency disease caused by lack of ___.',
    options:['Protein','Vitamin D','Iron','Calcium'],
    answer:'Protein',
    hint:'It is common in young children who eat mainly starchy foods with little protein.',
    explanation:'<b>Kwashiorkor</b> is caused by severe protein deficiency. It affects children and causes symptoms including a swollen belly, stunted growth and muscle wasting.' }),

  makeMCQ({ id:'g8s-food-005', chapterId:'g8s-food', difficulty:2, subsection:'balanced_diet',
    question:'What is a balanced diet?',
    options:['The right amount of every nutrient','The same amount of every food group','A diet with no fat at all','Only fruit and vegetables'],
    answer:'The right amount of every nutrient',
    hint:'All nutrients are needed — in the right proportions.',
    explanation:'A balanced diet contains the <b>correct proportions</b> of carbohydrates, proteins, fats, vitamins, minerals, fibre and water. The amounts needed depend on age, activity level and health — equal amounts of every food would not be balanced.' }),

  // ── g8s-mixtures ────────────────────────────────────────────────────────────

  makeMCQ({ id:'g8s-mixtures-001', chapterId:'g8s-mixtures', difficulty:1, subsection:'types_mixtures',
    question:'What is a mixture?',
    options:['Substances mixed but not joined','Substances joined chemically','A pure single substance','Substances that never separate'],
    answer:'Substances mixed but not joined',
    hint:'The components can be separated by physical means.',
    explanation:'A mixture contains two or more substances that are combined but <b>not chemically joined</b>. Each component keeps its own properties, and they can be separated again by physical methods such as filtering or evaporating.' }),

  makeMCQ({ id:'g8s-mixtures-002', chapterId:'g8s-mixtures', difficulty:1, subsection:'separation_techniques',
    question:'Which technique separates a solid from a liquid by passing the mixture through filter paper?',
    options:['Filtration','Evaporation','Decantation','Distillation'],
    answer:'Filtration',
    hint:'The solid stays on the filter paper; the liquid passes through.',
    explanation:'<b>Filtration</b> separates an insoluble solid from a liquid. The mixture is poured through filter paper; the solid (residue) stays on the paper and the liquid (filtrate) passes through.' }),

  makeMCQ({ id:'g8s-mixtures-003', chapterId:'g8s-mixtures', difficulty:2, subsection:'separation_techniques',
    question:'To obtain salt from a salt solution, which separation technique is used?',
    options:['Evaporation','Filtration','Decantation','Magnetic separation'],
    answer:'Evaporation',
    hint:'The water is removed by heating, leaving the salt behind.',
    explanation:'<b>Evaporation</b> is used to obtain dissolved salt from a solution. The solution is heated until the water evaporates, leaving the solid salt crystals behind.' }),

  makeMCQ({ id:'g8s-mixtures-004', chapterId:'g8s-mixtures', difficulty:2, subsection:'principles_separation',
    question:'Which principle allows a magnet to separate iron filings from sand?',
    options:['Iron is magnetic, sand is not','Iron is heavier than sand','Iron dissolves but sand does not','Iron is larger than sand'],
    answer:'Iron is magnetic, sand is not',
    hint:'Only magnetic materials are attracted to a magnet.',
    explanation:'The magnet attracts the iron filings but not the sand, because <b>iron is a magnetic material and sand is not</b>. This is the principle behind magnetic separation.' }),

  makeMCQ({ id:'g8s-mixtures-005', chapterId:'g8s-mixtures', difficulty:3, subsection:'principles_separation',
    question:'A student has muddy water (mud + water). Which sequence of techniques will give her pure water?',
    options:['Filtration then distillation','Decantation then evaporation','Evaporation then filtration','Decantation then filtration'],
    answer:'Filtration then distillation',
    hint:'Filtration removes the mud; distillation separates water from dissolved salts.',
    explanation:'<b>Filtration</b> first removes the mud, which is an insoluble solid. <b>Distillation</b> is then needed to separate pure water from anything still dissolved in it. Evaporation would leave the dissolved solids behind but would not collect the pure water.' }),

  // ── g8s-digestive ───────────────────────────────────────────────────────────

  makeMCQ({ id:'g8s-digestive-001', chapterId:'g8s-digestive', difficulty:1, subsection:'digestive_organs',
    question:'Where does digestion begin?',
    options:['The mouth','The stomach','The small intestine','The oesophagus'],
    answer:'The mouth',
    hint:'Chewing is mechanical digestion; saliva starts chemical digestion.',
    explanation:'Digestion begins in the <b>mouth</b>. Teeth break food into smaller pieces (mechanical digestion) and saliva contains amylase, an enzyme that starts breaking down starch (chemical digestion).' }),

  makeMCQ({ id:'g8s-digestive-002', chapterId:'g8s-digestive', difficulty:1, subsection:'digestive_organs',
    question:'Which organ produces acid and enzymes to digest protein?',
    options:['Stomach','Mouth','Small intestine','Liver'],
    answer:'Stomach',
    hint:'It churns food and uses acid to kill bacteria.',
    explanation:'The <b>stomach</b> produces hydrochloric acid and the enzyme pepsin to digest protein. It also churns food into a liquid called chyme.' }),

  makeMCQ({ id:'g8s-digestive-003', chapterId:'g8s-digestive', difficulty:2, subsection:'digestion_process',
    question:'What is the difference between mechanical and chemical digestion?',
    options:['Mechanical breaks food up physically','Mechanical uses enzymes to break food','Mechanical happens only in the stomach','Mechanical and chemical are the same'],
    answer:'Mechanical breaks food up physically',
    hint:'One involves physical force; the other involves chemical reactions.',
    explanation:'Mechanical digestion <b>physically breaks food into smaller pieces</b> — chewing in the mouth and churning in the stomach. Chemical digestion is different: it uses enzymes to break large food molecules into small ones that can be absorbed.' }),

  makeMCQ({ id:'g8s-digestive-004', chapterId:'g8s-digestive', difficulty:2, subsection:'structure_function',
    question:'Where are digested nutrients absorbed into the bloodstream?',
    options:['Small intestine','Large intestine','Stomach','Oesophagus'],
    answer:'Small intestine',
    hint:'This organ has tiny finger-like projections called villi to increase surface area.',
    explanation:'Digested nutrients are absorbed in the <b>small intestine</b>. Its inner surface is covered with millions of tiny villi (and microvilli), which greatly increase the surface area for efficient absorption.' }),

  makeMCQ({ id:'g8s-digestive-005', chapterId:'g8s-digestive', difficulty:2, subsection:'structure_function',
    question:'What is the function of the large intestine?',
    options:['It absorbs water from the waste','It absorbs nutrients from food','It produces digestive enzymes','It digests proteins into acids'],
    answer:'It absorbs water from the waste',
    hint:'By the time food reaches here, digestion is complete.',
    explanation:'The large intestine <b>absorbs water</b> from the remaining undigested material, making the waste more solid. The resulting faeces are stored in the rectum until they are expelled. Nutrients are absorbed earlier, in the small intestine.' }),

  // ── g8s-respiratory ─────────────────────────────────────────────────────────

  makeMCQ({ id:'g8s-respiratory-001', chapterId:'g8s-respiratory', difficulty:1, subsection:'respiratory_organs',
    question:'Which tube carries air from the throat down to the lungs?',
    options:['Trachea','Bronchus','Oesophagus','Alveolus'],
    answer:'Trachea',
    hint:'It is also called the windpipe.',
    explanation:'The <b>trachea</b> (windpipe) carries air from the larynx (voice box) down to the lungs. It is held open by C-shaped rings of cartilage.' }),

  makeMCQ({ id:'g8s-respiratory-002', chapterId:'g8s-respiratory', difficulty:1, subsection:'respiratory_organs',
    question:'Where does gas exchange take place in the lungs?',
    options:['Alveoli','Bronchi','Trachea','Bronchioles'],
    answer:'Alveoli',
    hint:'These are tiny air sacs with very thin walls and a rich blood supply.',
    explanation:'Gas exchange occurs in the <b>alveoli</b> — millions of tiny air sacs in the lungs. Oxygen passes from the alveoli into the blood, and carbon dioxide passes from the blood into the alveoli.' }),

  makeMCQ({ id:'g8s-respiratory-003', chapterId:'g8s-respiratory', difficulty:2, subsection:'gas_exchange',
    question:'Which gas passes from the blood into the alveoli to be breathed out?',
    options:['Carbon dioxide','Oxygen','Nitrogen','Water vapour'],
    answer:'Carbon dioxide',
    hint:'This is the waste gas produced by cellular respiration.',
    explanation:'<b>Carbon dioxide</b> produced by cellular respiration diffuses from the blood (where its concentration is high) into the alveoli (where its concentration is lower) to be breathed out.' }),

  makeMCQ({ id:'g8s-respiratory-004', chapterId:'g8s-respiratory', difficulty:2, subsection:'breathing_process',
    question:'During inhalation (breathing in), what happens to the diaphragm?',
    options:['It contracts and moves down','It relaxes and moves upward','It pushes air out of the lungs','It stays completely still'],
    answer:'It contracts and moves down',
    hint:'A larger chest volume means lower pressure inside, so air rushes in.',
    explanation:'During inhalation the diaphragm <b>contracts and flattens downwards</b>. Together with the rib cage moving up and out this increases the volume of the chest, lowering the pressure inside so that air rushes into the lungs.' }),

  makeMCQ({ id:'g8s-respiratory-005', chapterId:'g8s-respiratory', difficulty:3, subsection:'breathing_process',
    question:'Why do the alveoli have such a large total surface area (about 70 m²)?',
    options:['More gas can be exchanged quickly','More mucus can be produced daily','More bacteria can be trapped there','More heat can be kept in the lungs'],
    answer:'More gas can be exchanged quickly',
    hint:'Think about why increasing surface area speeds up diffusion.',
    explanation:'The enormous surface area of the alveoli (about 70 m&sup2;) means <b>more oxygen can diffuse into the blood, and more carbon dioxide out of it, in a shorter time</b> — enough to meet the body\'s oxygen demand even during exercise.' }),

  // ── g8s-chem-language ───────────────────────────────────────────────────────

  makeMCQ({ id:'g8s-chem-language-001', chapterId:'g8s-chem-language', difficulty:1, subsection:'symbols_formulae',
    question:'What does the chemical formula H₂O tell us?',
    options:['2 hydrogen atoms, 1 oxygen atom','1 hydrogen atom, 2 oxygen atoms','2 hydrogen atoms, 2 oxygen atoms','3 atoms of one single element'],
    answer:'2 hydrogen atoms, 1 oxygen atom',
    hint:'The subscript 2 after H means two hydrogen atoms.',
    explanation:'H&#8322;O tells us that one molecule of water contains <b>two hydrogen atoms and one oxygen atom</b>. The small subscript number shows how many atoms of the element before it are present; no subscript means one.' }),

  makeMCQ({ id:'g8s-chem-language-002', chapterId:'g8s-chem-language', difficulty:2, subsection:'valencies_radicals',
    question:'What is the valency of sodium (Na)?',
    options:['1','2','3','4'],
    answer:'1',
    hint:'Sodium is in Group 1 of the Periodic Table.',
    explanation:'Sodium (Na) has a valency of <b>1</b>. It is in Group 1 of the Periodic Table and forms compounds by losing one electron, giving it a +1 charge.' }),

  makeMCQ({ id:'g8s-chem-language-003', chapterId:'g8s-chem-language', difficulty:2, subsection:'valencies_radicals',
    question:'What is the formula of calcium chloride, given that Ca has valency 2 and Cl has valency 1?',
    options:['CaCl₂','CaCl','Ca₂Cl','Ca₂Cl₂'],
    answer:'CaCl₂',
    hint:'Swap the valencies: Ca(2) Cl(1) → CaCl₂.',
    explanation:'Using the cross-valency method: Ca (valency 2) and Cl (valency 1) gives <b>CaCl₂</b>. Two chloride ions are needed to balance the 2+ charge of one calcium ion.' }),

  makeMCQ({ id:'g8s-chem-language-004', chapterId:'g8s-chem-language', difficulty:3, subsection:'balancing_equations',
    question:'Which equation for the reaction of hydrogen and oxygen to form water is correctly balanced?',
    options:['2H₂ + O₂ → 2H₂O','H₂ + O₂ → H₂O','H₂ + O → H₂O','2H + O₂ → H₂O'],
    answer:'2H₂ + O₂ → 2H₂O',
    hint:'Count atoms on each side — they must be equal.',
    explanation:'<b>2H₂ + O₂ → 2H₂O</b> is balanced: left side has 4 H and 2 O; right side has 4 H and 2 O. Atoms are conserved — you cannot create or destroy them in a chemical reaction.' }),

  makeMCQ({ id:'g8s-chem-language-005', chapterId:'g8s-chem-language', difficulty:1, subsection:'symbols_formulae',
    question:'What does the formula CO₂ represent?',
    options:['1 carbon atom, 2 oxygen atoms','2 carbon atoms, 1 oxygen atom','A mixture of carbon and oxygen','Two molecules of carbon oxide'],
    answer:'1 carbon atom, 2 oxygen atoms',
    hint:'CO₂ is the gas produced by burning and by respiration.',
    explanation:'CO&#8322; is carbon dioxide: <b>one carbon atom chemically joined to two oxygen atoms</b>. It is a compound, not a mixture. It is the gas we breathe out and the gas plants take in for photosynthesis.' }),

  // ── g8s-diseases ────────────────────────────────────────────────────────────

  makeMCQ({ id:'g8s-diseases-001', chapterId:'g8s-diseases', difficulty:1, subsection:'communicable_noncommunicable',
    question:'What is a communicable disease?',
    options:['One that spreads between people','One that is caused by bad diet','One caused by genes alone','One that cannot be prevented'],
    answer:'One that spreads between people',
    hint:'"Communicable" means it can be communicated (spread) to others.',
    explanation:'A communicable disease is one that can <b>spread from an infected person to others</b>, usually through pathogens — bacteria, viruses, fungi or parasites. Tuberculosis, malaria and influenza are examples.' }),

  makeMCQ({ id:'g8s-diseases-002', chapterId:'g8s-diseases', difficulty:1, subsection:'communicable_noncommunicable',
    question:'Which of these is a non-communicable disease?',
    options:['Diabetes','Influenza (flu)','Tuberculosis','Malaria'],
    answer:'Diabetes',
    hint:'This disease cannot be caught from another person.',
    explanation:'<b>Diabetes</b> is a non-communicable disease — it cannot spread from person to person. It is caused by the body\'s inability to regulate blood sugar properly. Influenza, tuberculosis and malaria can all spread between people.' }),

  makeMCQ({ id:'g8s-diseases-003', chapterId:'g8s-diseases', difficulty:2, subsection:'disease_spread',
    question:'How does malaria spread from person to person?',
    options:['By the bite of a mosquito','By drinking dirty water','By touching an ill person','By breathing infected air'],
    answer:'By the bite of a mosquito',
    hint:'A mosquito acts as the vector (carrier) of the Plasmodium parasite.',
    explanation:'Malaria spreads through the bite of an infected female <i>Anopheles</i> mosquito, which carries the <i>Plasmodium</i> parasite and injects it into the blood. Mauritius has been declared malaria-free.' }),

  makeMCQ({ id:'g8s-diseases-004', chapterId:'g8s-diseases', difficulty:2, subsection:'prevention_control',
    question:'Which of these is the best way to prevent the spread of communicable diseases?',
    options:['Vaccination and good hygiene','Eating much more sugar daily','Avoiding all forms of exercise','Taking painkillers every day'],
    answer:'Vaccination and good hygiene',
    hint:'Vaccines build immunity; hygiene reduces the spread of pathogens.',
    explanation:'Vaccination trains the immune system to make antibodies without causing the disease. Combined with <b>good hygiene</b> — handwashing, covering coughs — it is the most effective way to stop communicable diseases spreading. Painkillers treat symptoms only.' }),

  makeMCQ({ id:'g8s-diseases-005', chapterId:'g8s-diseases', difficulty:3, subsection:'prevention_control',
    question:'Why is it important to complete a full course of antibiotics, even when you feel better?',
    options:['To kill every last bacterium','Because the tablets are costly','Because they turn poisonous','Because the prescription ends'],
    answer:'To kill every last bacterium',
    hint:'The bacteria that survive early antibiotic treatment may be the most resistant ones.',
    explanation:'Stopping antibiotics early leaves the <b>most resistant bacteria alive</b>. They reproduce and pass on their resistance, making future infections harder to treat. Finishing the course kills them all.' }),

  // ── g8s-acids ───────────────────────────────────────────────────────────────

  makeMCQ({ id:'g8s-acids-001', chapterId:'g8s-acids', difficulty:1, subsection:'acids_bases_indicators',
    question:'What colour does litmus turn in an acidic solution?',
    options:['Red','Blue','Green','Yellow'],
    answer:'Red',
    hint:'The colour change is: acids turn litmus red.',
    explanation:'Acids turn litmus indicator <b>red</b>. Bases (alkalis) turn litmus blue. The mnemonic "Acid turns litmus Red, base turns litmus Blue" — A before R, B before Bl in the alphabet.' }),

  makeMCQ({ id:'g8s-acids-002', chapterId:'g8s-acids', difficulty:1, subsection:'acids_bases_indicators',
    question:'Which of these is a common laboratory acid?',
    options:['Hydrochloric acid (HCl)','Sodium hydroxide (NaOH)','Calcium carbonate (CaCO₃)','Copper sulfate (CuSO₄)'],
    answer:'Hydrochloric acid (HCl)',
    hint:'It is produced in your stomach to help digest food.',
    explanation:'<b>Hydrochloric acid (HCl)</b> is a common strong acid used in laboratories. It is also found in the stomach (gastric acid). Sodium hydroxide is a base; calcium carbonate and copper sulfate are salts.' }),

  makeMCQ({ id:'g8s-acids-003', chapterId:'g8s-acids', difficulty:2, subsection:'reactions_acids',
    question:'What gas is produced when an acid reacts with a metal such as zinc?',
    options:['Hydrogen','Oxygen','Carbon dioxide','Nitrogen'],
    answer:'Hydrogen',
    hint:'This gas burns with a squeaky pop.',
    explanation:'When an acid reacts with a metal (like zinc), <b>hydrogen gas</b> is produced along with a salt. The test for hydrogen is a lighted splint — it burns with a squeaky pop.' }),

  makeMCQ({ id:'g8s-acids-004', chapterId:'g8s-acids', difficulty:2, subsection:'reactions_acids',
    question:'What is formed when an acid reacts with a carbonate?',
    options:['Salt + water + carbon dioxide','Salt + water + hydrogen gas','Salt + hydrogen + oxygen gas','Water + carbon + hydrogen gas'],
    answer:'Salt + water + carbon dioxide',
    hint:'The CO₂ produces effervescence (fizzing).',
    explanation:'Acid + carbonate &rarr; <b>salt + water + carbon dioxide</b>. For example HCl + CaCO&#8323; &rarr; CaCl&#8322; + H&#8322;O + CO&#8322;. It is the carbon dioxide that causes the fizzing.' }),

  makeMCQ({ id:'g8s-acids-005', chapterId:'g8s-acids', difficulty:2, subsection:'neutralisation',
    question:'What is neutralisation?',
    options:['An acid and a base forming salt','Two strong acids mixed together','An acid boiled until dry','A metal dissolved in water'],
    answer:'An acid and a base forming salt',
    hint:'The acid and base cancel each other out, producing a neutral salt solution.',
    explanation:'Neutralisation is the reaction <b>acid + base &rarr; salt + water</b>. The product is neutral (pH 7) or close to it. Antacid tablets work by neutralising excess stomach acid.' }),

  // ── g8s-forces ──────────────────────────────────────────────────────────────

  makeMCQ({ id:'g8s-forces-001', chapterId:'g8s-forces', difficulty:1, subsection:'types_forces',
    question:'What is the SI unit for measuring force?',
    options:['Newton (N)','Kilogram (kg)','Joule (J)','Pascal (Pa)'],
    answer:'Newton (N)',
    hint:'Named after Sir Isaac Newton.',
    explanation:'The SI unit for force is the <b>Newton (N)</b>, named after Sir Isaac Newton. A force of 1 N is approximately the weight of a 100 g mass.' }),

  makeMCQ({ id:'g8s-forces-002', chapterId:'g8s-forces', difficulty:1, subsection:'types_forces',
    question:'Which force acts between two surfaces in contact and opposes motion?',
    options:['Friction','Gravity','Upthrust','Tension'],
    answer:'Friction',
    hint:'It is why your shoes grip the floor and why machines need oil.',
    explanation:'<b>Friction</b> is a contact force that acts between surfaces in contact and opposes relative motion. It can be useful (allowing walking) or wasteful (causing wear in machines).' }),

  makeMCQ({ id:'g8s-forces-003', chapterId:'g8s-forces', difficulty:1, subsection:'measuring_force',
    question:'Which instrument is used to measure force?',
    options:['Spring balance','Measuring cylinder','Thermometer','Stopwatch'],
    answer:'Spring balance',
    hint:'It uses a stretched spring whose extension is proportional to the force applied.',
    explanation:'A <b>spring balance (newtonmeter)</b> measures force. The force stretches a spring, and the reading on the scale gives the force in newtons (N).' }),

  makeMCQ({ id:'g8s-forces-004', chapterId:'g8s-forces', difficulty:2, subsection:'gravity_effects',
    question:'A ball is thrown upwards. What force pulls it back down?',
    options:['Gravity','Friction','Magnetism','Tension'],
    answer:'Gravity',
    hint:'This force acts between all masses and pulls them towards the Earth\'s centre.',
    explanation:'<b>Gravity</b> is the force of attraction between masses. Earth\'s gravity pulls the ball downwards, decelerating it as it rises and accelerating it back down.' }),

  makeMCQ({ id:'g8s-forces-005', chapterId:'g8s-forces', difficulty:3, subsection:'gravity_effects',
    question:'On the Moon, the gravitational force is about 1/6 of that on Earth. If a person weighs 600 N on Earth, what is their weight on the Moon?',
    options:['100 N','600 N','3600 N','0 N'],
    answer:'100 N',
    hint:'Weight on Moon = Weight on Earth ÷ 6.',
    explanation:'Weight on Moon = 600 ÷ 6 = <b>100 N</b>. The person\'s mass remains the same (60 kg) but their weight is less because the Moon\'s gravitational field is weaker.' }),

  // ── g8s-pressure ────────────────────────────────────────────────────────────

  makeMCQ({ id:'g8s-pressure-001', chapterId:'g8s-pressure', difficulty:1, subsection:'pressure_definition',
    question:'What is the formula for pressure?',
    options:['Pressure = Force ÷ Area','Pressure = Force × Area','Pressure = Mass × Gravity','Pressure = Weight ÷ Volume'],
    answer:'Pressure = Force ÷ Area',
    hint:'Pressure is the force applied per unit area.',
    explanation:'<b>Pressure = Force ÷ Area</b>. The SI unit of pressure is the Pascal (Pa), where 1 Pa = 1 N/m². Smaller area → greater pressure for the same force.' }),

  makeMCQ({ id:'g8s-pressure-002', chapterId:'g8s-pressure', difficulty:2, subsection:'pressure_definition',
    question:'A force of 200 N acts on an area of 4 m². What is the pressure?',
    options:['50 Pa','800 Pa','204 Pa','196 Pa'],
    answer:'50 Pa',
    hint:'Pressure = Force ÷ Area = 200 ÷ 4.',
    explanation:'Pressure = Force ÷ Area = 200 ÷ 4 = <b>50 Pa</b>.' }),

  makeMCQ({ id:'g8s-pressure-003', chapterId:'g8s-pressure', difficulty:2, subsection:'pressure_in_fluids',
    question:'Why do deep-sea divers need specially designed suits?',
    options:['Water pressure rises with depth','There is no oxygen down there','The water is far too salty there','Divers cannot swim fast enough'],
    answer:'Water pressure rises with depth',
    hint:'Pressure in a fluid increases with depth.',
    explanation:'Water pressure <b>increases with depth</b>. At great depth the pressure is enormous — strong enough to crush an unprotected human body — so deep-sea suits are reinforced to withstand it.' }),

  makeMCQ({ id:'g8s-pressure-004', chapterId:'g8s-pressure', difficulty:3, subsection:'pressure_calculations',
    question:'Why are drawing pins designed with a sharp point?',
    options:['A small area gives high pressure','A blunt pin would be too heavy','Sharp points conduct heat better','The sharp point is for decoration'],
    answer:'A small area gives high pressure',
    hint:'Small area + same force = higher pressure.',
    explanation:'Since pressure = force &divide; area, the <b>very small area of the sharp point</b> concentrates the same pushing force into a very high pressure, which lets the pin pierce the surface easily.' }),

  makeMCQ({ id:'g8s-pressure-005', chapterId:'g8s-pressure', difficulty:2, subsection:'pressure_in_fluids',
    question:'Atmospheric pressure decreases as you go higher up a mountain. Why?',
    options:['There is less air above you there','Air becomes heavier higher up','The mountain blocks the pressure','Oxygen disappears higher up'],
    answer:'There is less air above you there',
    hint:'Atmospheric pressure is caused by the weight of the air column above.',
    explanation:'Atmospheric pressure is caused by the weight of the air above. Higher up the mountain there is <b>less air above you</b>, so the weight pressing down — and therefore the pressure — is smaller. That is why breathing is harder at altitude.' }),

  // ── g8s-magnetism ───────────────────────────────────────────────────────────

  makeMCQ({ id:'g8s-magnetism-001', chapterId:'g8s-magnetism', difficulty:1, subsection:'magnetic_materials',
    question:'Which of these materials is magnetic?',
    options:['Iron','Aluminium','Copper','Plastic'],
    answer:'Iron',
    hint:'Magnetic materials contain iron, nickel or cobalt.',
    explanation:'<b>Iron</b> is a magnetic material — it is attracted to magnets. Aluminium, copper and plastic are non-magnetic. Only materials containing iron, nickel or cobalt are magnetic.' }),

  makeMCQ({ id:'g8s-magnetism-002', chapterId:'g8s-magnetism', difficulty:1, subsection:'poles_fields',
    question:'What happens when two like poles of magnets are brought together?',
    options:['They repel each other','They attract each other','Nothing happens','They lose their magnetism'],
    answer:'They repel each other',
    hint:'Like poles repel; unlike poles attract.',
    explanation:'<b>Like poles repel each other</b>. North repels north; south repels south. Unlike poles (north and south) attract each other. This is a fundamental rule of magnetism.' }),

  makeMCQ({ id:'g8s-magnetism-003', chapterId:'g8s-magnetism', difficulty:2, subsection:'poles_fields',
    question:'Where is a magnet strongest?',
    options:['At its poles','In the middle','At north pole only','Equally all over'],
    answer:'At its poles',
    hint:'Magnetic field lines are most concentrated here.',
    explanation:'A magnet is strongest <b>at its poles</b>, both north and south. The magnetic field is most concentrated there, which is why iron filings cluster at the ends of a bar magnet.' }),

  makeMCQ({ id:'g8s-magnetism-004', chapterId:'g8s-magnetism', difficulty:2, subsection:'uses_magnets',
    question:'Which everyday device uses a magnet to indicate direction?',
    options:['Compass','Thermometer','Barometer','Ruler'],
    answer:'Compass',
    hint:'It aligns with the Earth\'s magnetic field.',
    explanation:'A <b>compass</b> uses a magnetised needle that aligns with Earth\'s magnetic field to point towards magnetic north. It is an essential navigation tool used by sailors and hikers.' }),

  makeMCQ({ id:'g8s-magnetism-005', chapterId:'g8s-magnetism', difficulty:3, subsection:'uses_magnets',
    question:'How are magnets used in electric motors?',
    options:['Magnetic fields and current turn the coil','Magnets measure the speed of the motor','Magnets cool the motor down while running','Magnets store electricity inside the motor'],
    answer:'Magnetic fields and current turn the coil',
    hint:'Current in a wire inside a magnetic field experiences a force.',
    explanation:'A current-carrying coil inside a magnetic field experiences a force. With the coil and magnets arranged correctly this force <b>turns the coil</b>, converting electrical energy into kinetic energy.' }),

  // ── g8s-work-energy ─────────────────────────────────────────────────────────

  makeMCQ({ id:'g8s-work-energy-001', chapterId:'g8s-work-energy', difficulty:1, subsection:'work_done',
    question:'What is the formula for work done?',
    options:['Work = Force × distance','Work = Force × time taken','Work = Power × distance','Work = Mass × acceleration'],
    answer:'Work = Force × distance',
    hint:'Work is done when a force causes movement in the direction of the force.',
    explanation:'<b>Work = Force × distance</b>, measured in joules (J). Work is only done when a force makes something move in the direction of that force. Mass × acceleration gives force, not work.' }),

  makeMCQ({ id:'g8s-work-energy-002', chapterId:'g8s-work-energy', difficulty:2, subsection:'work_done',
    question:'A force of 10 N moves a box 5 m. How much work is done?',
    options:['50 J','2 J','15 J','55 J'],
    answer:'50 J',
    hint:'Work = Force × distance = 10 × 5.',
    explanation:'Work = Force × distance = 10 × 5 = <b>50 J</b>.' }),

  makeMCQ({ id:'g8s-work-energy-003', chapterId:'g8s-work-energy', difficulty:1, subsection:'power_rate',
    question:'What is the formula for power?',
    options:['Power = Work ÷ time taken','Power = Force × distance','Power = Energy × time taken','Power = Mass × acceleration'],
    answer:'Power = Work ÷ time taken',
    hint:'Power measures how quickly work is done.',
    explanation:'<b>Power = work done ÷ time taken</b>, measured in watts (W), where 1 W = 1 J/s. A more powerful machine does the same work in less time. Force × distance is work, not power.' }),

  makeMCQ({ id:'g8s-work-energy-004', chapterId:'g8s-work-energy', difficulty:2, subsection:'power_rate',
    question:'A motor does 1000 J of work in 5 seconds. What is its power?',
    options:['200 W','5000 W','995 W','100 W'],
    answer:'200 W',
    hint:'Power = Work ÷ time = 1000 ÷ 5.',
    explanation:'Power = Work ÷ time = 1000 ÷ 5 = <b>200 W</b>.' }),

  makeMCQ({ id:'g8s-work-energy-005', chapterId:'g8s-work-energy', difficulty:3, subsection:'work_energy_power',
    question:'A person carries a heavy bag across a room without raising or lowering it. Have they done any work (in the scientific sense)?',
    options:['No — the force is not along the motion','No — because they never once feel tired','Yes — they used effort to carry it','Yes — the bag moved across the room'],
    answer:'No — the force is not along the motion',
    hint:'Work (physics) = force × displacement in the direction of the force.',
    explanation:'In physics no work is done here. The force holding the bag up acts <b>upward</b>, while the movement is <b>sideways</b>. Work = force × distance moved in the direction of the force, so W = 0 J — even though it feels like hard work.' }),

  // ── g8s-sts ─────────────────────────────────────────────────────────────────

  makeMCQ({ id:'g8s-sts-001', chapterId:'g8s-sts', difficulty:1, subsection:'science_society',
    question:'How does science contribute to controlling diseases in society?',
    options:['By developing vaccines and medicines','By building new roads and bridges','By improving art, music and design','By creating new political systems'],
    answer:'By developing vaccines and medicines',
    hint:'Think about the role of germ theory and vaccination.',
    explanation:'Science controls disease by <b>developing vaccines and medicines and by understanding how diseases spread</b>. Louis Pasteur\'s germ theory, for example, led directly to vaccines and to antiseptic surgery.' }),

  makeMCQ({ id:'g8s-sts-002', chapterId:'g8s-sts', difficulty:2, subsection:'technology_impact',
    question:'Antacid tablets use neutralisation chemistry to treat indigestion. Which statement explains how they work?',
    options:['The alkali neutralises stomach acid','The tablet makes more stomach acid','The tablet cools the stomach down','The tablet absorbs all the food'],
    answer:'The alkali neutralises stomach acid',
    hint:'Antacids contain bases like magnesium hydroxide or calcium carbonate.',
    explanation:'Antacids contain bases such as magnesium hydroxide or calcium carbonate. These <b>neutralise the excess hydrochloric acid</b> in the stomach, raising the pH and relieving the pain of indigestion.' }),

  makeMCQ({ id:'g8s-sts-003', chapterId:'g8s-sts', difficulty:2, subsection:'contributions_humanity',
    question:'Alexander Fleming\'s discovery of penicillin in 1928 is an example of ___.',
    options:['How curiosity can save lives','How science harms society','A discovery never put to use','How technology can hurt people'],
    answer:'How curiosity can save lives',
    hint:'He noticed that mould killed bacteria on his petri dish by accident.',
    explanation:'Fleming noticed by accident that <i>Penicillium</i> mould was killing bacteria on a dish. His <b>curiosity about that observation</b> led to penicillin, the first antibiotic and one of the most important medical discoveries ever made.' }),

  makeMCQ({ id:'g8s-sts-004', chapterId:'g8s-sts', difficulty:2, subsection:'contributions_humanity',
    question:'Neutralisation is used in agriculture to treat acidic soil. What substance is added to acidic soil?',
    options:['Lime (calcium hydroxide)','Salt (sodium chloride)','Sand (silicon dioxide)','Vinegar (acetic acid)'],
    answer:'Lime (calcium hydroxide)',
    hint:'A base is added to neutralise the acid in the soil.',
    explanation:'Farmers add <b>lime</b> — calcium hydroxide or calcium carbonate — to acidic soil. Lime is a base, so it neutralises the acid and raises the pH to a level that suits most crops. Adding vinegar would make the soil more acidic still.' }),

  makeMCQ({ id:'g8s-sts-005', chapterId:'g8s-sts', difficulty:3, subsection:'science_society',
    question:'Which of the following best describes a limitation of science and technology?',
    options:['It cannot decide what is right or wrong','It can answer every question ever asked','It has no limitations of any kind at all','It always solves every human problem'],
    answer:'It cannot decide what is right or wrong',
    hint:'Science describes the world; ethics evaluates whether actions are right or wrong.',
    explanation:'A key limitation of science is that it can explain <b>how</b> things work but cannot decide what <b>ought</b> to be done. Ethical, social and political questions go beyond what any experiment can answer.' })

);

})();
