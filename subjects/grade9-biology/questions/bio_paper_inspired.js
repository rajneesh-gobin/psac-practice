'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 NCE Biology — Paper-Inspired questions
//  IDs: g9s-bpi-001 through g9s-bpi-060  (60 questions)
//  Based on 2025 NCE Biology (N530) paper patterns.
//  B1 circulatory 001-020 · B2 reproductive 021-030
//  B3 biodiversity 031-040 · B4 plant nutrition 041-060
// ══════════════════════════════════════════════════════════════════════════

(function () {

// ── B1: Blood Circulatory System (IDs 001–020) ───────────────────────────

const B1 = 'g9s-b1-circulatory';

const MCQ_B1 = [

  // ── components_of_blood ──────────────────────────────────────────────

  ['g9s-bpi-001', 'components_of_blood', 1,
   'Which component of blood transports dissolved food substances, hormones and carbon dioxide around the body?',
   ['Plasma',
    'Red blood cells',
    'White blood cells',
    'Platelets'],
   'Plasma',
   'Think about which component is the liquid part of blood.',
   'Plasma is the pale yellow liquid part of blood; it carries dissolved nutrients, hormones, urea and carbon dioxide in solution between organs.'],

  ['g9s-bpi-002', 'components_of_blood', 1,
   'In which blood component is the protein haemoglobin found?',
   ['Red blood cells (erythrocytes)',
    'Plasma',
    'Platelets (thrombocytes)',
    'White blood cells (leucocytes)'],
   'Red blood cells (erythrocytes)',
   'This component gives blood its red colour.',
   'Haemoglobin is packed into red blood cells; it binds oxygen in the lungs and releases it to respiring tissues, giving red blood cells their characteristic colour.'],

  ['g9s-bpi-003', 'components_of_blood', 2,
   'A diagram labels four numbered components of blood: (1) red blood cells, (2) plasma, (3) platelets, (4) white blood cells. Which component is responsible for clotting blood at a wound site?',
   ['Component 3 — platelets, which clump together and release clotting factors',
    'Component 1 — red blood cells, which form a solid plug across the wound',
    'Component 2 — plasma, which dries out and forms a scab directly',
    'Component 4 — white blood cells, which seal wounds by engulfing damaged cells'],
   'Component 3 — platelets, which clump together and release clotting factors',
   'Think about which component is specifically involved in the clotting response.',
   'Platelets are cell fragments that aggregate at a wound and release chemicals triggering a clotting cascade, forming a fibrin mesh that seals the break and prevents blood loss.'],

  ['g9s-bpi-004', 'components_of_blood', 2,
   'Why do red blood cells have no nucleus?',
   ['To create more space to carry haemoglobin and transport more oxygen',
    'To allow them to divide rapidly and replace themselves every few days',
    'To reduce their size so they can squeeze through the smallest capillaries',
    'To prevent them from being destroyed by the immune system'],
   'To create more space to carry haemoglobin and transport more oxygen',
   'Consider what the main job of a red blood cell is.',
   'By losing their nucleus during development, red blood cells gain extra cytoplasmic space for haemoglobin molecules, maximising oxygen-carrying capacity per cell.'],

  // ── blood_vessels ────────────────────────────────────────────────────

  ['g9s-bpi-005', 'blood_vessels', 1,
   'Which feature of an artery allows it to withstand the high pressure of blood pumped directly from the heart?',
   ['A thick wall containing muscle and elastic fibres',
    'A wide lumen relative to its wall thickness',
    'Pocket valves at regular intervals along its length',
    'A wall only one cell thick to allow rapid exchange'],
   'A thick wall containing muscle and elastic fibres',
   'High pressure requires strong walls.',
   'Arteries carry blood at high pressure directly from the heart; their thick walls with elastic and smooth muscle tissue stretch and recoil with each heartbeat, preventing rupture and maintaining flow.'],

  ['g9s-bpi-006', 'blood_vessels', 2,
   'A cross-section of an artery is compared with that of a vein of similar diameter. Which statement correctly describes the difference between them?',
   ['The artery has a thicker wall and narrower lumen; the vein has a thinner wall and wider lumen',
    'The artery has a thinner wall and wider lumen; the vein has a thicker wall and narrower lumen',
    'The artery and vein have walls of equal thickness but the artery has more valves',
    'The artery has valves throughout; the vein has no valves at any point'],
   'The artery has a thicker wall and narrower lumen; the vein has a thinner wall and wider lumen',
   'Think about the pressure each vessel must handle.',
   'Arteries operate at high pressure and need thick walls; veins return blood at low pressure and rely on a wide lumen and valves rather than wall thickness to keep blood moving.'],

  ['g9s-bpi-007', 'blood_vessels', 3,
   'A patient has plaque (atheroma) building up inside a coronary artery. Which two consequences follow directly from the narrowing of this vessel\'s lumen?',
   ['Reduced blood flow to the heart muscle and raised blood pressure within the narrowed region',
    'Increased oxygen delivery to the heart muscle and lower resting pulse rate',
    'Blocked lymph drainage from the heart and swelling of surrounding tissue',
    'Reduced carbon dioxide removal from the lungs and increased plasma volume'],
   'Reduced blood flow to the heart muscle and raised blood pressure within the narrowed region',
   'What happens when a pipe becomes narrower while the same volume of fluid must pass through?',
   'A narrowed lumen reduces the volume of blood reaching the heart muscle per minute and raises resistance, increasing pressure upstream; together these raise heart attack risk.'],

  // ── cardiovascular_disease ───────────────────────────────────────────

  ['g9s-bpi-008', 'cardiovascular_disease', 1,
   'What is coronary heart disease?',
   ['A condition in which the coronary arteries become narrowed, reducing blood supply to the heart muscle',
    'A condition in which the heart beats too slowly to supply enough blood to the body',
    'A condition in which valves inside the heart become stiff and unable to open fully',
    'A condition in which veins carry blood backwards because their valves have failed'],
   'A condition in which the coronary arteries become narrowed, reducing blood supply to the heart muscle',
   'Think about which arteries supply the heart itself.',
   'Coronary arteries supply oxygenated blood to the heart muscle; when they are narrowed by atheroma the muscle is starved of oxygen, causing chest pain (angina) or, if fully blocked, a heart attack.'],

  ['g9s-bpi-009', 'cardiovascular_disease', 2,
   'Which sequence correctly describes how a diet high in saturated fat can lead to a heart attack?',
   ['High saturated fat → raised blood cholesterol → fatty plaque in artery walls → narrowed coronary artery → blocked blood supply → heart muscle dies',
    'High saturated fat → raised blood glucose → excess insulin → inflammation of heart valves → valve failure → heart attack',
    'High saturated fat → reduced red blood cell production → less oxygen in blood → slower heart rate → cardiac arrest',
    'High saturated fat → hardened capillary walls → raised venous pressure → fluid leaks into tissue → heart failure'],
   'High saturated fat → raised blood cholesterol → fatty plaque in artery walls → narrowed coronary artery → blocked blood supply → heart muscle dies',
   'Trace the mechanism step by step from diet to final outcome.',
   'Saturated fats raise LDL cholesterol; excess LDL deposits as atheroma in artery walls, narrowing the lumen; a clot on the plaque can completely block a coronary artery, starving heart muscle of oxygen.'],

  ['g9s-bpi-010', 'cardiovascular_disease', 2,
   'Which combination of lifestyle factors carries the highest risk of developing cardiovascular disease?',
   ['Smoking, eating a diet high in saturated fat, and taking no regular exercise',
    'Eating plenty of fruit and vegetables, cycling daily, and drinking no alcohol',
    'Sleeping eight hours per night, maintaining a healthy weight, and not smoking',
    'Eating oily fish twice a week, walking daily, and having a low-salt diet'],
   'Smoking, eating a diet high in saturated fat, and taking no regular exercise',
   'Which combination stacks multiple independent risk factors together?',
   'Smoking damages artery walls, a high saturated-fat diet raises LDL cholesterol, and inactivity lowers HDL cholesterol and raises blood pressure; these three factors together multiply cardiovascular risk.'],

  ['g9s-bpi-011', 'cardiovascular_disease', 1,
   'Which of the following is a risk factor for cardiovascular disease that a person CAN change?',
   ['Eating a diet high in saturated fat and salt',
    'Having a family history of heart disease',
    'Being 65 years of age or older',
    'Being born male'],
   'Eating a diet high in saturated fat and salt',
   'A modifiable risk factor is one the person can control through their own choices.',
   'Diet is a modifiable (lifestyle) risk factor; family history, age and sex are non-modifiable risk factors that cannot be changed by the individual.'],

  ['g9s-bpi-012', 'cardiovascular_disease', 3,
   'A cardiologist advises a patient to stop smoking immediately. The patient asks why smoking specifically damages the heart. Which explanation is most scientifically accurate?',
   ['Smoking chemicals damage artery walls, trigger plaque formation, raise blood pressure and reduce oxygen carried by red blood cells',
    'Smoking slows the heart rate so much that insufficient blood reaches the muscles during exercise',
    'Smoking destroys white blood cells so the body cannot remove cholesterol from the blood',
    'Smoking causes red blood cells to clump together, forming clots only inside the veins'],
   'Smoking chemicals damage artery walls, trigger plaque formation, raise blood pressure and reduce oxygen carried by red blood cells',
   'Consider multiple mechanisms by which cigarette chemicals affect the cardiovascular system.',
   'Carbon monoxide binds haemoglobin, reducing oxygen delivery; nicotine raises heart rate and blood pressure; other chemicals damage endothelium and promote plaque formation — smoking acts through several cardiovascular pathways simultaneously.'],

  // ── pulse ────────────────────────────────────────────────────────────

  ['g9s-bpi-013', 'pulse', 1,
   'What does measuring the pulse rate tell you about the heart?',
   ['The number of times the heart beats per minute',
    'The volume of blood pumped out with each heartbeat',
    'The pressure of blood flowing through the aorta',
    'The oxygen concentration in the blood leaving the left ventricle'],
   'The number of times the heart beats per minute',
   'Each pulse corresponds to one contraction of the heart.',
   'The pulse is a pressure wave sent through arteries each time the left ventricle contracts; counting pulses per minute gives the heart rate in beats per minute (bpm).'],

  ['g9s-bpi-014', 'pulse', 1,
   'What is the typical resting heart rate for a healthy adult?',
   ['Approximately 60–80 beats per minute',
    'Approximately 30–40 beats per minute',
    'Approximately 100–120 beats per minute',
    'Approximately 150–180 beats per minute'],
   'Approximately 60–80 beats per minute',
   'An average healthy adult at rest has a heart rate close to 70 bpm.',
   'The normal resting heart rate for an adult is between 60 and 100 bpm; well-trained athletes may have resting rates below 60 bpm because their hearts pump more blood per beat.'],

  ['g9s-bpi-015', 'pulse', 2,
   'A student measures her pulse rate before, during and after a five-minute run. What pattern would she expect to observe?',
   ['Pulse rate rises during exercise and gradually returns to the resting rate during recovery',
    'Pulse rate falls during exercise then rises sharply once she stops running',
    'Pulse rate stays constant throughout because the heart always beats at the same speed',
    'Pulse rate rises during exercise and then remains elevated permanently even after rest'],
   'Pulse rate rises during exercise and gradually returns to the resting rate during recovery',
   'Think about the muscles\' demand for oxygen during exercise compared with rest.',
   'Exercising muscles need more oxygen and glucose; the heart beats faster to deliver them; once exercise stops, demand falls and the heart rate gradually returns to its resting value as the body recovers.'],

  ['g9s-bpi-016', 'pulse', 2,
   'Where on the body can the pulse most easily be felt, and why?',
   ['At the wrist (radial artery) or neck (carotid artery), because arteries are close to the skin surface there',
    'At the back of the knee (popliteal vein), because veins have the highest pressure at that point',
    'In the middle of the palm, because capillaries in the hand are close to the surface',
    'At the top of the foot, because the aorta divides there and pressure peaks'],
   'At the wrist (radial artery) or neck (carotid artery), because arteries are close to the skin surface there',
   'The pulse is felt where an artery runs close to the skin over a bone.',
   'The radial artery at the wrist and the carotid artery at the neck run close to the skin surface over underlying bone, allowing the pressure wave of each heartbeat to be felt by pressing lightly with fingers.'],

  // ── circulatory_overview ─────────────────────────────────────────────

  ['g9s-bpi-017', 'circulatory_overview', 2,
   'The heart has four chambers. Which chamber pumps oxygenated blood to the rest of the body via the aorta?',
   ['Left ventricle',
    'Right ventricle',
    'Left atrium',
    'Right atrium'],
   'Left ventricle',
   'The left side of the heart deals with oxygenated blood; ventricles pump blood OUT of the heart.',
   'The left ventricle receives oxygenated blood from the left atrium and pumps it under high pressure into the aorta for distribution to all body tissues.'],

  ['g9s-bpi-018', 'circulatory_overview', 2,
   'What is the function of the valves inside the heart?',
   ['To prevent blood from flowing backwards between chambers and into blood vessels',
    'To regulate the heart rate by sending electrical signals to the muscle',
    'To absorb oxygen from the coronary arteries as blood passes through the chambers',
    'To filter waste products from the blood before it leaves the heart'],
   'To prevent blood from flowing backwards between chambers and into blood vessels',
   'Valves are one-way gates.',
   'Heart valves (atrioventricular and semilunar) open when pressure pushes blood forward and snap shut when pressure would push blood backward, ensuring one-directional flow through the heart.'],

  ['g9s-bpi-019', 'circulatory_overview', 2,
   'What do the coronary arteries supply, and why are they important?',
   ['They supply the heart muscle with oxygenated blood and glucose needed for it to keep beating',
    'They supply the lungs with deoxygenated blood so that gas exchange can take place',
    'They supply the brain with oxygenated blood and nutrients to maintain consciousness',
    'They supply the kidneys with blood to allow filtration of waste products from the body'],
   'They supply the heart muscle with oxygenated blood and glucose needed for it to keep beating',
   'The heart is a muscle — it needs a blood supply of its own.',
   'The coronary arteries branch from the aorta and wrap around the heart wall; they deliver the oxygen and glucose the cardiac muscle needs to contract continuously; blockage causes a heart attack.'],

  // ── interpreting_health_data ─────────────────────────────────────────

  ['g9s-bpi-020', 'interpreting_health_data', 3,
   'A table shows cardiovascular death rates (per 1000 people) for four countries alongside their average daily salt intake (g per person). Countries with higher salt intake consistently show higher death rates. What is the MOST accurate conclusion from this data?',
   ['There is a positive correlation between salt intake and cardiovascular death rate, but this alone does not prove causation',
    'High salt intake directly causes cardiovascular disease in every individual who consumes it',
    'Reducing salt intake will completely eliminate cardiovascular disease in all four countries',
    'The data is unreliable because countries differ in many other ways, so no conclusion can be drawn at all'],
   'There is a positive correlation between salt intake and cardiovascular death rate, but this alone does not prove causation',
   'What can correlation data support, and what does it NOT prove on its own?',
   'A consistent pattern across countries shows a positive correlation; however, countries differ in diet, healthcare, activity levels and many other factors, so the data supports an association rather than proof of a direct causal link.'],

];

MCQ_B1.forEach(([id, subsection, difficulty, question, options, answer, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: B1, subsection, difficulty,
    question, options, answer, explanation }));
});

// ── B2: Reproductive System (IDs 021–030) ────────────────────────────────

const B2 = 'g9s-b2-reproductive';

const MCQ_B2 = [

  ['g9s-bpi-021', 'male_reproductive_system', 1,
   'What is the function of the testes in the male reproductive system?',
   ['To produce sperm cells and the hormone testosterone',
    'To store urine and release it through the urethra during urination',
    'To carry sperm from the epididymis directly to the uterus',
    'To produce oestrogen to regulate the menstrual cycle'],
   'To produce sperm cells and the hormone testosterone',
   'The testes are the male gonads — think about what gonads produce.',
   'The testes produce sperm cells (spermatogenesis) and secrete testosterone, the male sex hormone that controls secondary sexual characteristics.'],

  ['g9s-bpi-022', 'male_reproductive_system', 2,
   'The urethra in males serves a dual function. What are these two functions?',
   ['To carry urine from the bladder and to carry semen out of the body',
    'To carry oxygenated blood to the testes and to drain lymph from the scrotum',
    'To produce seminal fluid and to carry sperm to the epididymis for storage',
    'To transport hormones from the testes to the bloodstream and to regulate body temperature'],
   'To carry urine from the bladder and to carry semen out of the body',
   'It runs through the penis and connects to both the bladder and the reproductive ducts.',
   'The male urethra is a shared channel: it carries urine from the bladder during urination and carries semen (sperm mixed with seminal fluid) during ejaculation; a muscular valve prevents both occurring simultaneously.'],

  ['g9s-bpi-023', 'female_reproductive_system', 1,
   'Where does fertilisation normally take place in the female reproductive system?',
   ['In the oviduct (fallopian tube)',
    'In the uterus (womb)',
    'In the ovary',
    'In the vagina'],
   'In the oviduct (fallopian tube)',
   'An egg released from the ovary travels along a tube — where does sperm normally meet it?',
   'After ovulation, the egg passes into the oviduct; sperm swim up from the vagina and fertilisation typically occurs in the upper third of the oviduct before the fertilised egg travels to the uterus for implantation.'],

  ['g9s-bpi-024', 'female_reproductive_system', 1,
   'What is the function of the uterus in reproduction?',
   ['To provide a site for the fertilised egg to implant and develop into a baby',
    'To produce eggs each month and release them at ovulation',
    'To be the site where sperm from the male first enter the female body',
    'To filter waste products from the developing embryo during pregnancy'],
   'To provide a site for the fertilised egg to implant and develop into a baby',
   'The uterus is the womb — think about what happens inside it during pregnancy.',
   'The fertilised egg travels from the oviduct and implants into the lining of the uterus (endometrium); the uterus then nourishes and protects the developing embryo and foetus throughout pregnancy.'],

  ['g9s-bpi-025', 'female_reproductive_system', 2,
   'A student labels a diagram of the female reproductive system. Which label correctly describes the vagina\'s role?',
   ['The birth canal through which the baby passes during delivery, and the passage for menstrual blood',
    'The organ that produces and releases one egg per month under hormonal control',
    'The tube that carries the egg from the ovary to the site of fertilisation',
    'The gland that secretes hormones to maintain pregnancy after implantation'],
   'The birth canal through which the baby passes during delivery, and the passage for menstrual blood',
   'The vagina is the external opening of the female reproductive tract.',
   'The vagina connects the uterus to the outside; it serves as the birth canal during labour, the passage for menstrual blood, and the entry point for sperm deposited during intercourse.'],

  ['g9s-bpi-026', 'stis_and_contraception', 1,
   'Which of the following sexually transmitted infections (STIs) is caused by a virus?',
   ['HIV/AIDS',
    'Gonorrhoea',
    'Syphilis',
    'Chlamydia'],
   'HIV/AIDS',
   'Some STIs are caused by bacteria and some by viruses — which of the options is viral?',
   'HIV (Human Immunodeficiency Virus) is a retrovirus that attacks the immune system; gonorrhoea, syphilis and chlamydia are all caused by bacteria and can be treated with antibiotics, which have no effect on HIV.'],

  ['g9s-bpi-027', 'stis_and_contraception', 1,
   'Which type of micro-organism causes gonorrhoea?',
   ['A bacterium (Neisseria gonorrhoeae)',
    'A virus',
    'A fungus',
    'A protozoan'],
   'A bacterium (Neisseria gonorrhoeae)',
   'Consider which class of micro-organism can be treated by antibiotics.',
   'Gonorrhoea is caused by the bacterium Neisseria gonorrhoeae; because it is bacterial, it can in principle be treated with antibiotics, although antibiotic-resistant strains are increasingly common.'],

  ['g9s-bpi-028', 'stis_and_contraception', 2,
   'Which of the following is NOT a route by which HIV can be transmitted from one person to another?',
   ['Sharing food or drinking from the same cup',
    'Unprotected sexual intercourse with an infected partner',
    'Sharing contaminated needles or syringes',
    'Transfer of infected blood during a blood transfusion'],
   'Sharing food or drinking from the same cup',
   'HIV is transmitted through body fluids — think about whether sharing food involves infectious body fluids.',
   'HIV is present in blood, semen, vaginal fluid and breast milk; it is NOT transmitted through saliva, sweat, tears, casual contact, or sharing food and drink, because virus concentrations in saliva are too low to cause infection.'],

  ['g9s-bpi-029', 'stis_and_contraception', 2,
   'Which method provides the most effective protection against both unintended pregnancy AND sexually transmitted infections?',
   ['Using a condom correctly during every sexual encounter',
    'Taking the combined contraceptive pill every day',
    'Using a copper intrauterine device (IUD)',
    'Relying on the rhythm method (avoiding sex on fertile days)'],
   'Using a condom correctly during every sexual encounter',
   'Think about which method creates a physical barrier to both sperm and pathogens.',
   'Condoms are the only contraceptive method that acts as a physical barrier, preventing both sperm and infectious pathogens from being transferred; other methods prevent pregnancy but offer no protection against STIs.'],

  ['g9s-bpi-030', 'stis_and_contraception', 3,
   'A table shows HIV infection rates (new cases per 1000 people) in a country over five years: Year 1: 8.2, Year 2: 7.5, Year 3: 6.1, Year 4: 5.3, Year 5: 4.0. A health campaign was launched at the start of Year 2. What is the mean infection rate over all five years, and what trend does the data show?',
   ['Mean of 6.2 new cases per 1000 per year; a consistent downward trend suggesting the campaign may have contributed to falling rates',
    'Mean of 5.3 new cases per 1000 per year; a steady upward trend showing the campaign had no effect',
    'Mean of 8.2 new cases per 1000 per year; no clear trend because the figures fluctuate randomly each year',
    'Mean of 4.0 new cases per 1000 per year; a downward trend that proves the campaign caused the reduction'],
   'Mean of 6.2 new cases per 1000 per year; a consistent downward trend suggesting the campaign may have contributed to falling rates',
   'Calculate: (8.2 + 7.5 + 6.1 + 5.3 + 4.0) ÷ 5. Then describe the direction of change carefully.',
   '(8.2 + 7.5 + 6.1 + 5.3 + 4.0) ÷ 5 = 31.1 ÷ 5 = 6.22 ≈ 6.2; the figures fall each year (a consistent downward trend); the campaign is associated with the fall but causation cannot be confirmed without ruling out other factors.'],

];

MCQ_B2.forEach(([id, subsection, difficulty, question, options, answer, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: B2, subsection, difficulty,
    question, options, answer, explanation }));
});

// ── B3: Biodiversity (IDs 031–040) ───────────────────────────────────────

const B3 = 'g9s-b3-biodiversity';

const MCQ_B3 = [

  ['g9s-bpi-031', 'quadrat_method', 1,
   'What is a quadrat used for in a field study of biodiversity?',
   ['To count or estimate the number of organisms in a defined sample area',
    'To measure the speed at which organisms move through a habitat',
    'To collect soil samples for analysis of mineral content in a habitat',
    'To trap mobile animals for tagging and later population estimates'],
   'To count or estimate the number of organisms in a defined sample area',
   'A quadrat is a frame placed on the ground — think about what a stationary frame can help you count.',
   'A quadrat is a square frame placed randomly in a habitat; the organisms within it are counted or estimated to give a sample from which population size can be extrapolated.'],

  ['g9s-bpi-032', 'quadrat_method', 1,
   'Why is the quadrat method best suited to studying plants and slow-moving animals rather than birds or fish?',
   ['Plants and slow-moving animals stay within the quadrat long enough to be counted accurately',
    'Plants and slow-moving animals have brighter colours that make them easier to see inside the frame',
    'Birds and fish are too rare to be found in any standard-sized quadrat',
    'The quadrat method works only in aquatic habitats, where birds cannot be found'],
   'Plants and slow-moving animals stay within the quadrat long enough to be counted accurately',
   'Think about what happens when you put a frame on the ground and a fast-moving animal is present.',
   'Mobile organisms such as birds escape or move out of the quadrat before they can be counted; immobile or slow-moving organisms (plants, snails, limpets) remain stationary, giving an accurate count.'],

  ['g9s-bpi-033', 'quadrat_method', 2,
   'A student places five quadrats of area 0.25 m² in a meadow and counts the daisies in each: 4, 7, 3, 6, 5. What is the estimated mean number of daisies per square metre in the meadow?',
   ['20 daisies per m²',
    '5 daisies per m²',
    '10 daisies per m²',
    '25 daisies per m²'],
   '20 daisies per m²',
   'First find the mean per quadrat, then scale up to 1 m².',
   'Mean per quadrat = (4+7+3+6+5) ÷ 5 = 25 ÷ 5 = 5 daisies per 0.25 m²; to convert to per m²: 5 ÷ 0.25 = 20 daisies per m².'],

  ['g9s-bpi-034', 'threats_to_biodiversity', 1,
   'How does a severe cyclone typically affect the biodiversity of a coastal habitat?',
   ['It destroys vegetation and kills animals, reducing species variety and population sizes',
    'It increases biodiversity by mixing organisms from different habitats together',
    'It has no lasting effect because all species quickly return to their original numbers',
    'It removes invasive species only, allowing native species to recover and thrive'],
   'It destroys vegetation and kills animals, reducing species variety and population sizes',
   'Think about the physical effects of extreme wind and flooding on living organisms.',
   'Cyclones cause physical destruction of vegetation, flooding, and habitat loss; many individuals die and some species may be locally wiped out, reducing both species richness and population sizes in the affected area.'],

  ['g9s-bpi-035', 'threats_to_biodiversity', 2,
   'Which of the following best explains why deforestation is considered a major threat to biodiversity?',
   ['It permanently removes the habitat on which many species depend for food, shelter and reproduction',
    'It introduces new tree species that compete with existing plants and animals',
    'It increases soil fertility so much that only fast-growing weeds can survive',
    'It causes rivers to warm up, which kills only aquatic species but leaves land species unaffected'],
   'It permanently removes the habitat on which many species depend for food, shelter and reproduction',
   'Consider what forest species rely on trees for.',
   'Forests are among the most biodiverse habitats on Earth; clearing them removes food sources, nesting sites and microhabitats, causing population crashes and local extinctions of species unable to relocate.'],

  ['g9s-bpi-036', 'threats_to_biodiversity', 2,
   'An invasive plant species is introduced to an island and spreads rapidly. What is the most likely immediate threat it poses to native species?',
   ['It out-competes native plants for light, water and nutrients, reducing their populations',
    'It provides additional food sources that allow all native animal populations to increase',
    'It improves soil quality by fixing nitrogen, benefiting all plants equally',
    'It repels invasive animal species, preventing predation of native organisms'],
   'It out-competes native plants for light, water and nutrients, reducing their populations',
   'Invasive species succeed because they often lack natural predators and grow faster than native species.',
   'Invasive species that compete for the same resources as native species can reduce or eliminate them; without natural predators to control their numbers they spread rapidly and cause native populations to crash.'],

  ['g9s-bpi-037', 'conservation', 2,
   'Many modern medicines have been developed from chemicals originally found in wild plants. Which benefit of biodiversity does this illustrate?',
   ['Medical and pharmaceutical value — wild species provide compounds used in drug development',
    'Ecological value — species maintain nutrient cycling and clean water in ecosystems',
    'Economic value from ecotourism — visitors pay to see wild species in their natural habitat',
    'Food security value — wild species can be bred into crops to improve agricultural yields'],
   'Medical and pharmaceutical value — wild species provide compounds used in drug development',
   'Think about which type of benefit is specifically related to medicines derived from nature.',
   'Many important drugs (e.g. aspirin from willow bark, penicillin from moulds, anti-malarials from plants) came from wild species; reducing biodiversity risks losing organisms whose chemical compounds could cure future diseases.'],

  ['g9s-bpi-038', 'conservation', 2,
   'Mauritius earns significant revenue from tourists visiting wildlife reserves to observe rare endemic species. Which benefit of biodiversity does this represent?',
   ['Economic benefit through ecotourism, where the value of wildlife attracts paying visitors',
    'Ecological benefit through nutrient cycling provided by endemic animal species',
    'Medical benefit through chemicals extracted from native animals for drug manufacture',
    'Agricultural benefit through wild species improving the genetic diversity of local crops'],
   'Economic benefit through ecotourism, where the value of wildlife attracts paying visitors',
   'Think about which category of biodiversity benefit involves people paying money to see wildlife.',
   'Ecotourism generates income directly from the existence of biodiversity; this economic incentive gives governments and local communities a financial reason to protect rather than destroy natural habitats.'],

  ['g9s-bpi-039', 'food_webs', 3,
   'In a food web: grass → grasshopper → lizard → hawk. The hawk population is hunted to near extinction. Predict the most likely effect on the grasshopper population.',
   ['The grasshopper population decreases, because fewer hawks means more lizards survive and eat more grasshoppers',
    'The grasshopper population increases, because hawks fed on grasshoppers and removing them relieves predation pressure',
    'The grasshopper population stays unchanged, because hawks and grasshoppers are not directly linked in this food web',
    'The grasshopper population decreases, because without hawks the grass disappears and grasshoppers starve'],
   'The grasshopper population decreases, because fewer hawks means more lizards survive and eat more grasshoppers',
   'Trace the chain: hawk → lizard → grasshopper. Remove the hawk and work through each link.',
   'Fewer hawks → lizard population rises (less predation) → more lizards eat more grasshoppers → grasshopper population falls; this is a trophic cascade where removing a top predator has knock-on effects down the food web.'],

  ['g9s-bpi-040', 'biodiversity_overview', 3,
   'A conservation team surveys a forest using quadrats and finds the following number of tree species in five quadrats: 12, 8, 15, 10, 10. What is the mean number of tree species per quadrat, and what does a higher mean value indicate about the forest?',
   ['Mean = 11 species per quadrat; a higher mean indicates greater species richness, suggesting a healthier and more biodiverse ecosystem',
    'Mean = 10 species per quadrat; a higher mean indicates that the forest is being degraded by human activity',
    'Mean = 15 species per quadrat; a higher mean indicates that invasive species are dominating the habitat',
    'Mean = 55 species per quadrat; a higher mean indicates that fewer quadrats should have been used'],
   'Mean = 11 species per quadrat; a higher mean indicates greater species richness, suggesting a healthier and more biodiverse ecosystem',
   'Calculate: sum all values then divide by the number of quadrats. Then interpret what more species means.',
   '(12+8+15+10+10) ÷ 5 = 55 ÷ 5 = 11; a higher mean species count per quadrat reflects greater species richness, which is a positive indicator of biodiversity and ecosystem health.'],

];

MCQ_B3.forEach(([id, subsection, difficulty, question, options, answer, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: B3, subsection, difficulty,
    question, options, answer, explanation }));
});

// ── B4: Plant Nutrition (IDs 041–060) ────────────────────────────────────

const B4 = 'g9s-b4-plant-nutrition';

const MCQ_B4 = [

  // ── testing_for_starch ───────────────────────────────────────────────

  ['g9s-bpi-041', 'testing_for_starch', 1,
   'What colour change indicates the presence of starch when iodine solution is added?',
   ['The iodine turns from orange-brown to blue-black',
    'The iodine turns from blue-black to orange-brown',
    'The iodine turns from orange-brown to red',
    'The iodine turns from orange-brown to colourless'],
   'The iodine turns from orange-brown to blue-black',
   'Iodine is orange-brown by default — recall what colour starch turns it.',
   'Iodine solution is orange-brown; in the presence of starch it forms a blue-black complex with the amylose chains. No colour change (remains orange-brown) indicates starch is absent.'],

  ['g9s-bpi-042', 'testing_for_starch', 1,
   'What is the FIRST step when testing a leaf for starch using the standard iodine test?',
   ['Boil the leaf in water to kill it and stop enzyme activity',
    'Dip the leaf in iodine solution to see whether starch is present',
    'Boil the leaf in ethanol to remove the green chlorophyll pigment',
    'Rinse the leaf in cold water to remove any surface chlorophyll'],
   'Boil the leaf in water to kill it and stop enzyme activity',
   'Think about why the leaf must be prepared before being placed in ethanol.',
   'The leaf is first boiled in water to kill the cells and break down cell membranes; this stops all enzyme activity and makes the leaf more permeable, allowing ethanol to extract chlorophyll in the next step.'],

  ['g9s-bpi-043', 'testing_for_starch', 2,
   'In the iodine starch test, why is the leaf boiled in ethanol (alcohol)?',
   ['To remove the chlorophyll so the colour change from iodine can be seen clearly',
    'To dissolve the starch out of the leaf before the iodine test is applied',
    'To kill any bacteria on the leaf surface that could affect the result',
    'To harden the leaf tissue so that it does not tear during the iodine step'],
   'To remove the chlorophyll so the colour change from iodine can be seen clearly',
   'A green leaf would mask the blue-black colour — what must be removed first?',
   'Chlorophyll masks the blue-black colour of the starch-iodine complex; boiling in ethanol dissolves and removes the green pigment, leaving the leaf pale yellow-white so that any blue-black staining is clearly visible.'],

  ['g9s-bpi-044', 'testing_for_starch', 2,
   'A variegated leaf (green and white sections) is kept in light, then tested for starch with iodine. What result is expected and what does it show?',
   ['Blue-black colour only in the green sections; white sections stay orange-brown — showing that chlorophyll is needed for photosynthesis',
    'Blue-black colour only in the white sections; green sections stay orange-brown — showing that light is blocked in the white regions',
    'Blue-black colour in all sections, showing that all parts of the leaf can make starch equally',
    'No colour change anywhere, showing that variegated leaves cannot carry out photosynthesis'],
   'Blue-black colour only in the green sections; white sections stay orange-brown — showing that chlorophyll is needed for photosynthesis',
   'White sections lack chlorophyll — trace what this means for their ability to make starch.',
   'Green sections contain chlorophyll and produce starch by photosynthesis, turning blue-black with iodine; white sections lack chlorophyll, cannot photosynthesise, produce no starch, and remain orange-brown — the experiment demonstrates that chlorophyll is essential for photosynthesis.'],

  ['g9s-bpi-045', 'testing_for_starch', 3,
   'A student carries out a starch test on a leaf and lists the steps in this order: (P) add iodine solution, (Q) boil leaf in ethanol, (R) wash leaf in cold water, (S) boil leaf in water. What is the CORRECT sequence?',
   ['S → Q → R → P',
    'Q → S → R → P',
    'S → R → Q → P',
    'P → S → Q → R'],
   'S → Q → R → P',
   'Think through each step\'s purpose: which must come before which?',
   'Step S (boil in water) kills the leaf and softens cells; Step Q (boil in ethanol) removes chlorophyll; Step R (wash in cold water) removes ethanol and re-softens the leaf; Step P (add iodine) gives the colour result. Correct order: S → Q → R → P.'],

  // ── photosynthesis ───────────────────────────────────────────────────

  ['g9s-bpi-046', 'photosynthesis', 1,
   'What are the two products of photosynthesis?',
   ['Glucose and oxygen',
    'Carbon dioxide and water',
    'Glucose and carbon dioxide',
    'Oxygen and water'],
   'Glucose and oxygen',
   'Photosynthesis converts raw materials into products — recall the word equation.',
   'Photosynthesis: carbon dioxide + water → glucose + oxygen (using light energy absorbed by chlorophyll). Glucose is used for energy and growth; oxygen is released as a by-product.'],

  ['g9s-bpi-047', 'photosynthesis', 1,
   'Which two raw materials does a plant take in for photosynthesis?',
   ['Carbon dioxide from the air and water from the soil',
    'Oxygen from the air and glucose from the soil',
    'Carbon dioxide from the air and glucose from the roots',
    'Nitrogen from the air and water from the leaves'],
   'Carbon dioxide from the air and water from the soil',
   'Think about the word equation: what goes INTO the reaction?',
   'Carbon dioxide diffuses through stomata from the air; water is absorbed from the soil through roots and transported up the stem in the xylem; both are raw materials for the photosynthesis reaction.'],

  ['g9s-bpi-048', 'photosynthesis', 2,
   'In which organelle of a plant cell does photosynthesis take place?',
   ['The chloroplast',
    'The mitochondrion',
    'The cell wall',
    'The vacuole'],
   'The chloroplast',
   'Think about which organelle contains the green pigment chlorophyll.',
   'Chloroplasts contain the pigment chlorophyll, which absorbs light energy; all the reactions of photosynthesis — both the light-dependent and light-independent stages — occur within the chloroplast.'],

  ['g9s-bpi-049', 'photosynthesis', 2,
   'Which equation correctly summarises photosynthesis?',
   ['Carbon dioxide + water → glucose + oxygen (using light energy)',
    'Glucose + oxygen → carbon dioxide + water (using light energy)',
    'Carbon dioxide + oxygen → glucose + water (using light energy)',
    'Glucose + water → carbon dioxide + oxygen (using light energy)'],
   'Carbon dioxide + water → glucose + oxygen (using light energy)',
   'Recall which substances go in and which come out, and where the energy comes from.',
   'The photosynthesis equation: CO₂ + H₂O → C₆H₁₂O₆ + O₂ (in the presence of light and chlorophyll). This is the reverse of aerobic respiration.'],

  ['g9s-bpi-050', 'photosynthesis', 3,
   'A plant is kept in a sealed transparent box and CO₂ concentration is measured over 24 hours. During daylight the CO₂ level falls; at night it rises. What is the correct explanation?',
   ['During the day photosynthesis removes more CO₂ than respiration releases; at night only respiration occurs, releasing CO₂',
    'During the day the plant stops respiring so CO₂ falls; at night it begins respiring and CO₂ rises',
    'During the day CO₂ is converted to oxygen, which then turns back to CO₂ at night by a reversal reaction',
    'During the day CO₂ dissolves in the soil and is absorbed by roots; at night the roots release it back'],
   'During the day photosynthesis removes more CO₂ than respiration releases; at night only respiration occurs, releasing CO₂',
   'Plants photosynthesise AND respire — consider the balance between the two processes in light versus dark.',
   'In daylight, the rate of photosynthesis exceeds respiration, creating a net uptake of CO₂; at night, photosynthesis stops but respiration continues, so CO₂ accumulates in the box. Plants always respire but only photosynthesise in light.'],

  // ── leaf_structure ───────────────────────────────────────────────────

  ['g9s-bpi-051', 'leaf_structure', 1,
   'How does the broad, flat shape of a leaf help it to carry out photosynthesis efficiently?',
   ['It provides a large surface area to absorb the maximum amount of light',
    'It reduces the amount of water lost through the leaf surface during the day',
    'It allows more carbon dioxide to be stored inside the leaf overnight',
    'It prevents insects from landing on the leaf and damaging the chloroplasts'],
   'It provides a large surface area to absorb the maximum amount of light',
   'A large, flat surface is ideal for capturing something that travels in straight lines from above.',
   'A broad, flat lamina maximises the surface area exposed to sunlight, allowing chloroplasts in the cells to absorb as much light energy as possible for photosynthesis.'],

  ['g9s-bpi-052', 'leaf_structure', 1,
   'What is the function of the stomata found on the underside of most leaves?',
   ['To allow carbon dioxide in and oxygen out, and to let water vapour escape during transpiration',
    'To absorb sunlight and convert it to chemical energy stored in glucose',
    'To transport water and minerals from the roots to the rest of the leaf',
    'To anchor the leaf to the stem and prevent it from falling off in strong wind'],
   'To allow carbon dioxide in and oxygen out, and to let water vapour escape during transpiration',
   'Stomata are pores — think about what gases need to move in and out of a leaf.',
   'Stomata are tiny pores flanked by guard cells; they allow CO₂ to diffuse in for photosynthesis, O₂ to diffuse out, and water vapour to exit during transpiration; they open in the light and close in the dark.'],

  ['g9s-bpi-053', 'leaf_structure', 2,
   'Leaves are very thin, typically less than 1 mm. How does this thinness benefit photosynthesis?',
   ['It minimises the distance that carbon dioxide must diffuse to reach the chloroplasts inside cells',
    'It reduces the mass of the leaf, allowing it to orient itself towards the sun more easily',
    'It prevents excess glucose from being stored in the leaf and blocking the cells',
    'It allows the leaf to absorb minerals directly from rainwater that falls on its surface'],
   'It minimises the distance that carbon dioxide must diffuse to reach the chloroplasts inside cells',
   'Diffusion is slow over long distances — a thin leaf means a short journey for gases.',
   'Diffusion rate is inversely related to distance; a thin leaf means CO₂ entering through stomata travels only a very short distance to the photosynthetic cells, keeping the rate of gas exchange high.'],

  ['g9s-bpi-054', 'leaf_structure', 2,
   'What do the veins (vascular bundles) in a leaf transport, and what structural role do they play?',
   ['They transport water and minerals in (xylem) and sugars out (phloem), and they support the leaf blade',
    'They transport only glucose to the stem for storage, and they contain chlorophyll for photosynthesis',
    'They carry gases between the stomata and the spongy mesophyll, and they absorb sunlight for energy',
    'They carry oxygen from photosynthesis to the stem, and they anchor the leaf to the petiole'],
   'They transport water and minerals in (xylem) and sugars out (phloem), and they support the leaf blade',
   'Veins contain xylem and phloem — recall what each tissue carries.',
   'Xylem in leaf veins supplies water (needed as a reactant in photosynthesis) and dissolved minerals; phloem carries sucrose (made from glucose) away to the rest of the plant; the veins also form a rigid framework that supports the flat leaf surface.'],

  ['g9s-bpi-055', 'leaf_structure', 3,
   'Palisade mesophyll cells are found in the upper layer of the leaf, just below the upper epidermis. Why is this position ideal for their function?',
   ['They are closest to the light source and are packed with chloroplasts to maximise the rate of photosynthesis',
    'They are closest to the stomata and absorb carbon dioxide directly before it diffuses to other cells',
    'They are in contact with the veins and absorb water directly from the xylem without diffusion losses',
    'They are protected from overheating by the upper epidermis, which reflects excess light away'],
   'They are closest to the light source and are packed with chloroplasts to maximise the rate of photosynthesis',
   'Think about where in the leaf light is most intense and what these cells are packed with.',
   'Palisade cells are tall, tightly packed and filled with chloroplasts; their position at the top of the leaf means they intercept the most light before it is absorbed or scattered further; this arrangement maximises photosynthetic output.'],

  // ── mineral_nutrition ────────────────────────────────────────────────

  ['g9s-bpi-056', 'mineral_nutrition', 1,
   'Which mineral ion do plants absorb from the soil to use in the synthesis of proteins?',
   ['Nitrate ions',
    'Magnesium ions',
    'Phosphate ions',
    'Potassium ions'],
   'Nitrate ions',
   'Proteins contain nitrogen — which mineral ion provides it?',
   'Nitrate ions (NO₃⁻) are absorbed through the roots and provide the nitrogen needed to make amino acids, which are joined together to build proteins essential for growth and enzyme production.'],

  ['g9s-bpi-057', 'mineral_nutrition', 1,
   'Which mineral ion is essential for the production of chlorophyll in plants?',
   ['Magnesium ions',
    'Nitrate ions',
    'Phosphate ions',
    'Calcium ions'],
   'Magnesium ions',
   'Chlorophyll molecules contain a central atom — which mineral provides it?',
   'Each chlorophyll molecule contains a magnesium atom at its centre; without adequate magnesium ions, plants cannot synthesise enough chlorophyll, causing yellowing of leaves (chlorosis), especially the older lower leaves.'],

  ['g9s-bpi-058', 'mineral_nutrition', 2,
   'What roles do phosphate ions play in plant growth?',
   ['They are components of ATP (for energy transfer) and DNA (for genetic information), and they promote healthy root development',
    'They are the main component of chlorophyll and they promote the growth of new leaves in spring',
    'They provide nitrogen for protein synthesis and they strengthen cell walls in the stem',
    'They regulate water uptake by root hair cells and they produce the sugars used in respiration'],
   'They are components of ATP (for energy transfer) and DNA (for genetic information), and they promote healthy root development',
   'Think about which major molecules contain phosphorus in a cell.',
   'Phosphate is essential for ATP synthesis (the energy currency of the cell), DNA and RNA (carrying genetic information), and phospholipid membranes; it is particularly important for root growth, and deficient plants show purple-tinged leaves and poor root systems.'],

  ['g9s-bpi-059', 'mineral_nutrition', 2,
   'A plant grown without magnesium ions shows yellowing (chlorosis) of its older leaves first. Which explanation is most accurate?',
   ['Magnesium is mobile in the plant and is moved from older to younger leaves when supplies are low, so older leaves show deficiency first',
    'Older leaves are more exposed to sunlight and the magnesium is bleached out of the chlorophyll by UV radiation',
    'The roots absorb magnesium last, so it takes longest to reach the older leaves at the bottom of the plant',
    'Older leaves make more chlorophyll than young leaves, so they use up the available magnesium supply faster'],
   'Magnesium is mobile in the plant and is moved from older to younger leaves when supplies are low, so older leaves show deficiency first',
   'Consider which leaves the plant "sacrifices" first when a mobile nutrient is scarce.',
   'Magnesium is a mobile element; when supply is limited, the plant remobilises it from mature (older) leaves and transports it to actively growing young tissues; the older leaves are therefore the first to show yellowing from chlorophyll breakdown.'],

  ['g9s-bpi-060', 'mineral_nutrition', 3,
   'A farmer notices that his plants have small, pale yellow leaves (chlorosis) and very poor root growth. Testing shows adequate nitrate but very low magnesium and phosphate. Which treatment would MOST effectively address both symptoms?',
   ['Apply a fertiliser containing both magnesium and phosphate to correct the two identified deficiencies',
    'Apply a fertiliser containing only nitrogen compounds, as all symptoms result from protein deficiency',
    'Apply more water to improve mineral uptake, since dehydration causes chlorosis and poor roots',
    'Remove the affected leaves so that healthy leaves receive all available minerals from the soil'],
   'Apply a fertiliser containing both magnesium and phosphate to correct the two identified deficiencies',
   'Match each symptom to its cause: chlorosis → magnesium; poor root growth → phosphate.',
   'Chlorosis (pale yellow leaves) in the presence of adequate nitrate indicates magnesium deficiency (needed for chlorophyll); poor root growth indicates phosphate deficiency (needed for ATP and root development); adding both minerals addresses both symptoms directly.'],

];

MCQ_B4.forEach(([id, subsection, difficulty, question, options, answer, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: B4, subsection, difficulty,
    question, options, answer, explanation }));
});

})();
