'use strict';
// Grade 8 Science — Core questions, all 13 chapters
// IDs: g8s-<chapter>-NNN

(function () {

STATIC_QUESTIONS.push(

  // ── g8s-inquiry ─────────────────────────────────────────────────────────────

  makeMCQ({ id:'g8s-inquiry-001', chapterId:'g8s-inquiry', difficulty:1, subsection:'lab_procedures',
    question:'Before starting any laboratory experiment, what should a student do first?',
    options:['Read and understand the safety rules and experimental procedure','Mix all the chemicals together','Switch on all equipment','Taste the solutions to identify them'],
    answer:'Read and understand the safety rules and experimental procedure',
    hint:'Planning and safety come before any practical action.',
    explanation:'A student should always <b>read and understand the safety rules and procedure</b> first. This prevents accidents and ensures the experiment is carried out correctly.' }),

  makeMCQ({ id:'g8s-inquiry-002', chapterId:'g8s-inquiry', difficulty:2, subsection:'lab_procedures',
    question:'A scientist repeats an experiment three times and records each result. Why?',
    options:['To check for consistency and calculate a reliable average','Because one result is never enough to publish','To impress the teacher','Because the first two results are always wrong'],
    answer:'To check for consistency and calculate a reliable average',
    hint:'Repeated readings improve reliability.',
    explanation:'Repeating an experiment allows the scientist to <b>check consistency and calculate an average</b>. This reduces the effect of random errors and makes results more reliable.' }),

  makeMCQ({ id:'g8s-inquiry-003', chapterId:'g8s-inquiry', difficulty:1, subsection:'recording_data',
    question:'Which of these is the correct way to record data in a science experiment?',
    options:['In a neat table with headings and units','On any scrap of paper','By remembering the numbers','Drawing pictures only'],
    answer:'In a neat table with headings and units',
    hint:'Good data recording makes analysis and comparison easier.',
    explanation:'Data should be recorded <b>in a neat table with clear headings and units</b>. This makes it easy to compare results, spot patterns and draw conclusions.' }),

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
    options:['Carbohydrates','Proteins','Vitamins','Minerals'],
    answer:'Carbohydrates',
    hint:'Bread, rice and pasta are rich in this nutrient.',
    explanation:'<b>Carbohydrates</b> are the body\'s primary energy source. They are broken down into glucose, which cells use to produce energy through respiration.' }),

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
    options:['A diet that contains the correct amounts of all essential nutrients','A diet that contains only fruit and vegetables','A diet with no fat at all','A diet that has the same amount of every food'],
    answer:'A diet that contains the correct amounts of all essential nutrients',
    hint:'All nutrients are needed — in the right proportions.',
    explanation:'A <b>balanced diet</b> contains the correct proportions of carbohydrates, proteins, fats, vitamins, minerals, fibre and water. Different amounts are needed depending on age, activity level and health.' }),

  // ── g8s-mixtures ────────────────────────────────────────────────────────────

  makeMCQ({ id:'g8s-mixtures-001', chapterId:'g8s-mixtures', difficulty:1, subsection:'types_mixtures',
    question:'What is a mixture?',
    options:['Two or more substances combined together but not chemically joined','A pure substance with one type of molecule','A substance that cannot be separated','A substance made by chemical reaction'],
    answer:'Two or more substances combined together but not chemically joined',
    hint:'The components can be separated by physical means.',
    explanation:'A <b>mixture</b> contains two or more substances that are combined but not chemically joined. The components keep their own properties and can be separated by physical methods.' }),

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
    options:['Iron is magnetic and sand is not','Iron is heavier than sand','Iron dissolves in water but sand does not','Iron is larger than sand particles'],
    answer:'Iron is magnetic and sand is not',
    hint:'Only magnetic materials are attracted to a magnet.',
    explanation:'The magnet attracts the iron filings but not the sand because <b>iron is magnetic and sand is not</b>. This is the principle behind magnetic separation.' }),

  makeMCQ({ id:'g8s-mixtures-005', chapterId:'g8s-mixtures', difficulty:3, subsection:'principles_separation',
    question:'A student has muddy water (mud + water). Which sequence of techniques will give her pure water?',
    options:['Filtration then evaporation is wrong — she should use filtration then distillation','Filtration only','Evaporation only','Decantation then evaporation'],
    answer:'Decantation then evaporation is wrong — she should use filtration then distillation',
    hint:'Filtration removes the mud; distillation separates water from dissolved salts.',
    explanation:'First, <b>filtration</b> removes the mud (insoluble solid). Then <b>distillation</b> is needed to separate pure water from any dissolved substances. Evaporation alone would give solid residue, not pure liquid water.' }),

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
    options:['Mechanical digestion breaks food into smaller pieces physically; chemical digestion uses enzymes to break molecules apart','They are the same process','Mechanical uses chemicals; chemical uses teeth','Only chemical digestion occurs in humans'],
    answer:'Mechanical digestion breaks food into smaller pieces physically; chemical digestion uses enzymes to break molecules apart',
    hint:'One involves physical force; the other involves chemical reactions.',
    explanation:'<b>Mechanical digestion</b> involves physically breaking food into smaller pieces (chewing, stomach churning). <b>Chemical digestion</b> uses enzymes to break large food molecules into smaller ones that can be absorbed.' }),

  makeMCQ({ id:'g8s-digestive-004', chapterId:'g8s-digestive', difficulty:2, subsection:'structure_function',
    question:'Where are digested nutrients absorbed into the bloodstream?',
    options:['Small intestine','Large intestine','Stomach','Oesophagus'],
    answer:'Small intestine',
    hint:'This organ has tiny finger-like projections called villi to increase surface area.',
    explanation:'Digested nutrients are absorbed in the <b>small intestine</b>. Its inner surface is covered with millions of tiny villi (and microvilli), which greatly increase the surface area for efficient absorption.' }),

  makeMCQ({ id:'g8s-digestive-005', chapterId:'g8s-digestive', difficulty:2, subsection:'structure_function',
    question:'What is the function of the large intestine?',
    options:['To absorb water from undigested food and form faeces','To digest proteins','To produce enzymes','To absorb nutrients from food'],
    answer:'To absorb water from undigested food and form faeces',
    hint:'By the time food reaches here, digestion is complete.',
    explanation:'The <b>large intestine</b> absorbs water from the remaining undigested material, making the waste more solid. The resulting faeces are stored in the rectum until they are expelled.' }),

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
    options:['It contracts and moves downwards, increasing lung volume','It relaxes and moves upwards','It stays still','It pushes air out of the lungs'],
    answer:'It contracts and moves downwards, increasing lung volume',
    hint:'A larger chest volume means lower pressure inside, so air rushes in.',
    explanation:'During inhalation, the <b>diaphragm contracts and flattens downwards</b>. Combined with the rib cage moving up and out, this increases the volume of the chest, lowering air pressure inside so air rushes into the lungs.' }),

  makeMCQ({ id:'g8s-respiratory-005', chapterId:'g8s-respiratory', difficulty:3, subsection:'breathing_process',
    question:'Why do the alveoli have such a large total surface area (about 70 m²)?',
    options:['A large surface area allows more gas exchange to occur quickly, meeting the body\'s oxygen demands','A large surface area keeps the lungs warm','A large surface area stops bacteria from entering','A large surface area allows more mucus to be produced'],
    answer:'A large surface area allows more gas exchange to occur quickly, meeting the body\'s oxygen demands',
    hint:'Think about why increasing surface area speeds up diffusion.',
    explanation:'The enormous surface area of the alveoli (~70 m²) ensures that <b>maximum gas exchange</b> can occur rapidly. More surface area means more oxygen can diffuse into the blood (and more CO₂ can leave) in a shorter time.' }),

  // ── g8s-chem-language ───────────────────────────────────────────────────────

  makeMCQ({ id:'g8s-chem-language-001', chapterId:'g8s-chem-language', difficulty:1, subsection:'symbols_formulae',
    question:'What does the chemical formula H₂O tell us?',
    options:['One molecule of water contains 2 hydrogen atoms and 1 oxygen atom','Water contains 3 atoms total of the same element','H and O are two different compounds','Water has 2 oxygen atoms'],
    answer:'One molecule of water contains 2 hydrogen atoms and 1 oxygen atom',
    hint:'The subscript 2 after H means two hydrogen atoms.',
    explanation:'H₂O tells us that one molecule of water contains <b>2 hydrogen atoms and 1 oxygen atom</b>. The subscript number shows how many atoms of each element are present.' }),

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
    options:['Carbon dioxide: 1 carbon atom and 2 oxygen atoms','Carbon monoxide: 2 carbon atoms and 1 oxygen atom','A mixture of carbon and oxygen','Two molecules of carbon oxide'],
    answer:'Carbon dioxide: 1 carbon atom and 2 oxygen atoms',
    hint:'CO₂ is the gas produced by burning and by respiration.',
    explanation:'CO₂ is <b>carbon dioxide</b>: one carbon atom (C) and two oxygen atoms (O₂). It is the gas we exhale and the gas plants absorb for photosynthesis.' }),

  // ── g8s-diseases ────────────────────────────────────────────────────────────

  makeMCQ({ id:'g8s-diseases-001', chapterId:'g8s-diseases', difficulty:1, subsection:'communicable_noncommunicable',
    question:'What is a communicable disease?',
    options:['A disease that can be passed from one person to another','A disease caused by unhealthy eating','A disease caused by genetic factors only','A disease that cannot be prevented'],
    answer:'A disease that can be passed from one person to another',
    hint:'"Communicable" means it can be communicated (spread) to others.',
    explanation:'A <b>communicable disease</b> is one that can spread from an infected person to others, usually via pathogens (bacteria, viruses, fungi or parasites). Examples include tuberculosis, malaria and influenza.' }),

  makeMCQ({ id:'g8s-diseases-002', chapterId:'g8s-diseases', difficulty:1, subsection:'communicable_noncommunicable',
    question:'Which of these is a non-communicable disease?',
    options:['Diabetes','Influenza (flu)','Tuberculosis','Malaria'],
    answer:'Diabetes',
    hint:'This disease cannot be caught from another person.',
    explanation:'<b>Diabetes</b> is a non-communicable disease — it cannot spread from person to person. It is caused by the body\'s inability to regulate blood sugar properly. Influenza, tuberculosis and malaria can all spread between people.' }),

  makeMCQ({ id:'g8s-diseases-003', chapterId:'g8s-diseases', difficulty:2, subsection:'disease_spread',
    question:'How does malaria spread from person to person?',
    options:['Through the bite of an infected female Anopheles mosquito','By touching an infected person','By drinking contaminated water','By breathing in the air near an infected person'],
    answer:'Through the bite of an infected female Anopheles mosquito',
    hint:'A mosquito acts as the vector (carrier) of the Plasmodium parasite.',
    explanation:'Malaria spreads <b>through the bite of an infected female Anopheles mosquito</b>. The mosquito carries the Plasmodium parasite and injects it into the blood when it bites. Mauritius has been declared malaria-free.' }),

  makeMCQ({ id:'g8s-diseases-004', chapterId:'g8s-diseases', difficulty:2, subsection:'prevention_control',
    question:'Which of these is the best way to prevent the spread of communicable diseases?',
    options:['Vaccination and good hygiene','Eating more sugar','Avoiding all exercise','Taking painkillers daily'],
    answer:'Vaccination and good hygiene',
    hint:'Vaccines build immunity; hygiene reduces the spread of pathogens.',
    explanation:'<b>Vaccination</b> stimulates the immune system to produce antibodies without causing the disease. Combined with <b>good hygiene</b> (handwashing, covering coughs), these are the most effective ways to prevent the spread of communicable diseases.' }),

  makeMCQ({ id:'g8s-diseases-005', chapterId:'g8s-diseases', difficulty:3, subsection:'prevention_control',
    question:'Why is it important to complete a full course of antibiotics, even when you feel better?',
    options:['To kill all the bacteria — stopping early lets resistant bacteria survive and multiply','Because antibiotics are expensive and must be used up','Antibiotics become poisonous if not finished','The doctor\'s prescription is only valid for the full course'],
    answer:'To kill all the bacteria — stopping early lets resistant bacteria survive and multiply',
    hint:'The bacteria that survive early antibiotic treatment may be the most resistant ones.',
    explanation:'Stopping antibiotics early leaves the most <b>resistant bacteria alive</b>. These reproduce and pass on their resistance, making future infections harder to treat. Completing the full course ensures all bacteria are killed.' }),

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
    options:['A salt, water and carbon dioxide','A salt and hydrogen only','Water and hydrogen only','Only a salt'],
    answer:'A salt, water and carbon dioxide',
    hint:'The CO₂ produces effervescence (fizzing).',
    explanation:'Acid + carbonate → <b>salt + water + carbon dioxide</b>. For example: HCl + CaCO₃ → CaCl₂ + H₂O + CO₂. The carbon dioxide causes fizzing.' }),

  makeMCQ({ id:'g8s-acids-005', chapterId:'g8s-acids', difficulty:2, subsection:'neutralisation',
    question:'What is neutralisation?',
    options:['The reaction between an acid and a base to form a salt and water','Mixing two acids together','Dissolving a metal in water','The process of boiling an acid'],
    answer:'The reaction between an acid and a base to form a salt and water',
    hint:'The acid and base cancel each other out, producing a neutral salt solution.',
    explanation:'<b>Neutralisation</b> is the reaction between an acid and a base: Acid + Base → Salt + Water. The product is neutral (pH 7) or close to it. Antacids neutralise excess stomach acid.' }),

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
    options:['Spring balance (newtonmeter)','Thermometer','Measuring cylinder','Stopwatch'],
    answer:'Spring balance (newtonmeter)',
    hint:'It uses a stretched spring whose extension is proportional to the force applied.',
    explanation:'A <b>spring balance (newtonmeter)</b> measures force. When a force stretches the spring, the reading on the scale shows the force in Newtons.' }),

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
    options:['Because water pressure increases with depth and would crush an unprotected body','Because the water is too cold at depth','Because there is no oxygen at depth','Because light does not reach the deep sea'],
    answer:'Because water pressure increases with depth and would crush an unprotected body',
    hint:'Pressure in a fluid increases with depth.',
    explanation:'Water pressure <b>increases with depth</b>. At great depths, the pressure is enormous — strong enough to crush an unprotected human body. Deep-sea suits are reinforced to withstand this pressure.' }),

  makeMCQ({ id:'g8s-pressure-004', chapterId:'g8s-pressure', difficulty:3, subsection:'pressure_calculations',
    question:'Why are drawing pins designed with a sharp point?',
    options:['The small area of the point means high pressure from a small force, allowing the pin to enter a surface easily','The sharp point is just for decoration','A blunt pin would be too heavy','Sharp points conduct electricity better'],
    answer:'The small area of the point means high pressure from a small force, allowing the pin to enter a surface easily',
    hint:'Small area + same force = higher pressure.',
    explanation:'A drawing pin\'s sharp point has a <b>very small area</b>. Since Pressure = Force ÷ Area, the small area concentrates the same pushing force into a very high pressure, allowing the pin to pierce surfaces easily.' }),

  makeMCQ({ id:'g8s-pressure-005', chapterId:'g8s-pressure', difficulty:2, subsection:'pressure_in_fluids',
    question:'Atmospheric pressure decreases as you go higher up a mountain. Why?',
    options:['There is less air above you at high altitude, so the weight of air pressing down is less','Air becomes heavier at high altitude','Oxygen disappears at high altitude','The mountain blocks air pressure'],
    answer:'There is less air above you at high altitude, so the weight of air pressing down is less',
    hint:'Atmospheric pressure is caused by the weight of the air column above.',
    explanation:'Atmospheric pressure is caused by the <b>weight of air above</b>. At higher altitudes, there is less air above you, so the pressure is lower. This is why it is harder to breathe on high mountains.' }),

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
    options:['At its poles','In the middle','Evenly distributed throughout','Only at the north pole'],
    answer:'At its poles',
    hint:'Magnetic field lines are most concentrated here.',
    explanation:'A magnet is strongest <b>at its poles</b> (north and south). The magnetic field is most concentrated here, as shown by iron filings clustering at the poles when sprinkled on paper above a bar magnet.' }),

  makeMCQ({ id:'g8s-magnetism-004', chapterId:'g8s-magnetism', difficulty:2, subsection:'uses_magnets',
    question:'Which everyday device uses a magnet to indicate direction?',
    options:['Compass','Thermometer','Barometer','Ruler'],
    answer:'Compass',
    hint:'It aligns with the Earth\'s magnetic field.',
    explanation:'A <b>compass</b> uses a magnetised needle that aligns with Earth\'s magnetic field to point towards magnetic north. It is an essential navigation tool used by sailors and hikers.' }),

  makeMCQ({ id:'g8s-magnetism-005', chapterId:'g8s-magnetism', difficulty:3, subsection:'uses_magnets',
    question:'How are magnets used in electric motors?',
    options:['The interaction between magnetic fields and electric current creates a turning force (rotation)','Magnets store electricity inside the motor','Magnets cool the motor down','Magnets measure the speed of the motor'],
    answer:'The interaction between magnetic fields and electric current creates a turning force (rotation)',
    hint:'Current in a wire inside a magnetic field experiences a force.',
    explanation:'In an electric motor, <b>a current-carrying wire inside a magnetic field experiences a force</b>. By arranging the coil and magnets correctly, this force causes rotation, converting electrical energy to kinetic energy.' }),

  // ── g8s-work-energy ─────────────────────────────────────────────────────────

  makeMCQ({ id:'g8s-work-energy-001', chapterId:'g8s-work-energy', difficulty:1, subsection:'work_done',
    question:'What is the formula for work done?',
    options:['Work = Force × distance','Work = Mass × speed','Work = Force ÷ time','Work = Power × area'],
    answer:'Work = Force × distance',
    hint:'Work is done when a force causes movement in the direction of the force.',
    explanation:'<b>Work = Force × distance</b>. The unit of work is the Joule (J). Work is done only when a force causes movement in the direction of the force.' }),

  makeMCQ({ id:'g8s-work-energy-002', chapterId:'g8s-work-energy', difficulty:2, subsection:'work_done',
    question:'A force of 10 N moves a box 5 m. How much work is done?',
    options:['50 J','2 J','15 J','55 J'],
    answer:'50 J',
    hint:'Work = Force × distance = 10 × 5.',
    explanation:'Work = Force × distance = 10 × 5 = <b>50 J</b>.' }),

  makeMCQ({ id:'g8s-work-energy-003', chapterId:'g8s-work-energy', difficulty:1, subsection:'power_rate',
    question:'What is the formula for power?',
    options:['Power = Work done ÷ time taken','Power = Force × distance','Power = Mass × acceleration','Power = Energy × time'],
    answer:'Power = Work done ÷ time taken',
    hint:'Power measures how quickly work is done.',
    explanation:'<b>Power = Work done ÷ time taken</b>. The unit of power is the Watt (W). 1 W = 1 J/s. A more powerful machine does the same work in less time.' }),

  makeMCQ({ id:'g8s-work-energy-004', chapterId:'g8s-work-energy', difficulty:2, subsection:'power_rate',
    question:'A motor does 1000 J of work in 5 seconds. What is its power?',
    options:['200 W','5000 W','995 W','100 W'],
    answer:'200 W',
    hint:'Power = Work ÷ time = 1000 ÷ 5.',
    explanation:'Power = Work ÷ time = 1000 ÷ 5 = <b>200 W</b>.' }),

  makeMCQ({ id:'g8s-work-energy-005', chapterId:'g8s-work-energy', difficulty:3, subsection:'work_energy_power',
    question:'A person carries a heavy bag across a room without raising or lowering it. Have they done any work (in the scientific sense)?',
    options:['No — work requires a force in the direction of motion; the force is upward and motion is sideways','Yes — they used effort to carry it','Yes — the bag moved','No — because they are not tired'],
    answer:'No — work requires a force in the direction of motion; the force is upward and motion is sideways',
    hint:'Work (physics) = force × displacement in the direction of the force.',
    explanation:'In physics, <b>no work is done</b> here. The force supporting the bag acts upward, but displacement is horizontal. Work = Force × displacement in the direction of the force, so W = 0 J. (This differs from everyday use of "work".)' }),

  // ── g8s-sts ─────────────────────────────────────────────────────────────────

  makeMCQ({ id:'g8s-sts-001', chapterId:'g8s-sts', difficulty:1, subsection:'science_society',
    question:'How does science contribute to controlling diseases in society?',
    options:['By developing vaccines, medicines and understanding how diseases spread','By building roads and bridges','By improving art and music','By creating new political systems'],
    answer:'By developing vaccines, medicines and understanding how diseases spread',
    hint:'Think about the role of germ theory and vaccination.',
    explanation:'Science contributes to disease control by <b>developing vaccines, medicines and understanding transmission</b>. Louis Pasteur\'s germ theory, for example, led directly to vaccines and antiseptic surgery.' }),

  makeMCQ({ id:'g8s-sts-002', chapterId:'g8s-sts', difficulty:2, subsection:'technology_impact',
    question:'Antacid tablets use neutralisation chemistry to treat indigestion. Which statement explains how they work?',
    options:['The alkaline antacid neutralises excess stomach acid, reducing pain','The antacid tablet absorbs the food causing indigestion','The tablet produces more acid to balance the stomach','The tablet cools the stomach down'],
    answer:'The alkaline antacid neutralises excess stomach acid, reducing pain',
    hint:'Antacids contain bases like magnesium hydroxide or calcium carbonate.',
    explanation:'Antacids work by <b>neutralising excess hydrochloric acid</b> in the stomach. They contain bases such as magnesium hydroxide or calcium carbonate that react with the acid, raising the pH and relieving indigestion.' }),

  makeMCQ({ id:'g8s-sts-003', chapterId:'g8s-sts', difficulty:2, subsection:'contributions_humanity',
    question:'Alexander Fleming\'s discovery of penicillin in 1928 is an example of ___.',
    options:['How scientific observation and curiosity can lead to life-saving medicines','How technology can harm people','How science has no benefit to society','A discovery that was never used'],
    answer:'How scientific observation and curiosity can lead to life-saving medicines',
    hint:'He noticed that mould killed bacteria on his petri dish by accident.',
    explanation:'Fleming noticed mould (<i>Penicillium</i>) killing bacteria by accident. His curiosity led to the development of <b>penicillin</b>, the first antibiotic — one of the most important medical discoveries ever, saving hundreds of millions of lives.' }),

  makeMCQ({ id:'g8s-sts-004', chapterId:'g8s-sts', difficulty:2, subsection:'contributions_humanity',
    question:'Neutralisation is used in agriculture to treat acidic soil. What substance is added to acidic soil?',
    options:['Lime (calcium hydroxide or calcium carbonate)','More fertiliser','Water only','Salt (sodium chloride)'],
    answer:'Lime (calcium hydroxide or calcium carbonate)',
    hint:'A base is added to neutralise the acid in the soil.',
    explanation:'Farmers add <b>lime</b> (calcium hydroxide or calcium carbonate) to acidic soil. The lime is a base that neutralises the soil\'s acidity, raising the pH to a level suitable for most crops.' }),

  makeMCQ({ id:'g8s-sts-005', chapterId:'g8s-sts', difficulty:3, subsection:'science_society',
    question:'Which of the following best describes a limitation of science and technology?',
    options:['Science can explain how things work but cannot always determine what is ethically right or wrong','Science knows everything','Technology always solves all human problems','Science has no limitations'],
    answer:'Science can explain how things work but cannot always determine what is ethically right or wrong',
    hint:'Science describes the world; ethics evaluates whether actions are right or wrong.',
    explanation:'A key limitation of science is that it describes <b>how</b> things work but cannot decide <b>what ought to be done</b>. Ethical, social and political considerations go beyond what experiments can answer.' })

);

})();
