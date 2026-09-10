'use strict';
(function () {

// Grade 3 Health Education — topup questions (subsections 031–040)
// Brings all 9 subsections from 10 to 20 questions each.

STATIC_QUESTIONS.push(

  // ── body_hygiene (031–040) ────────────────────────────────────────────────

  makeMCQ({ id:'g3he-hyg-031', chapterId:'g3he-hygiene', difficulty:2, subsection:'body_hygiene',
    question:'Why do people who do heavy physical work (like farmers) need to bathe more often?',
    options:['They sweat much more','They sweat much less','Work makes skin cleaner','Sweat does not matter'],
    answer:'They sweat much more',
    hint:'Think about the link between activity and sweat.',
    explanation:'Heavy physical work causes more sweating. Sweat left on skin <b>feeds bacteria</b>, causing odour and increasing the risk of skin infections. More activity means more frequent washing is needed.' }),

  makeTF({ id:'g3he-hyg-032', chapterId:'g3he-hygiene', difficulty:1, subsection:'body_hygiene',
    question:'Using antibacterial soap is always better than ordinary soap for everyday hand washing.',
    answer:false,
    explanation:'<b>False.</b> Ordinary soap used correctly (20+ seconds, all surfaces) is equally effective for everyday hand washing. Antibacterial soap overuse can contribute to antibiotic resistance.' }),

  makeMCQ({ id:'g3he-hyg-033', chapterId:'g3he-hygiene', difficulty:2, subsection:'body_hygiene',
    question:'Why is it important to dry between the toes properly after bathing?',
    options:['Damp skin lets fungus grow','Wet toes give us colds','Toe skin needs fresh air','There is no real reason'],
    answer:'Damp skin lets fungus grow',
    hint:'Think about fungi and moist environments.',
    explanation:'Fungi thrive in moist, warm conditions. Failing to dry between the toes creates <b>ideal conditions for athlete\'s foot</b> and other fungal infections.' }),

  makeTF({ id:'g3he-hyg-034', chapterId:'g3he-hygiene', difficulty:1, subsection:'body_hygiene',
    question:'Our nails grow about 3 mm per month and should be trimmed every few weeks.',
    answer:true,
    explanation:'<b>True.</b> Nails grow continuously. Trimming every 2-3 weeks keeps them at a hygienic length that does not collect dirt and germs.' }),

  makeMCQ({ id:'g3he-hyg-035', chapterId:'g3he-hygiene', difficulty:1, subsection:'body_hygiene',
    question:'Which practice specifically helps prevent body odour?',
    options:['Washing the armpits daily','Wearing thicker clothes','Eating more at meals','Sleeping longer hours'],
    answer:'Washing the armpits daily',
    hint:'Odour comes from bacteria in warm, moist areas.',
    explanation:'Armpits have sweat glands and bacteria thrive there. <b>Washing with soap daily</b> removes bacteria and sweat, preventing body odour.' }),

  makeMCQ({ id:'g3he-hyg-036', chapterId:'g3he-hygiene', difficulty:2, subsection:'body_hygiene',
    question:'Why is it important to wear clean, breathable clothing (like cotton) in Mauritius\'s hot climate?',
    options:['Cotton lets the skin breathe','Cotton looks much smarter','Cotton costs less to buy','Clothing does not affect skin'],
    answer:'Cotton lets the skin breathe',
    hint:'In hot climates, what happens to sweat?',
    explanation:'In Mauritius\'s tropical heat, <b>breathable cotton absorbs sweat</b>, allowing it to evaporate. Trapped sweat in synthetic fabrics creates a warm, moist layer that promotes bacteria and skin rashes.' }),

  makeTF({ id:'g3he-hyg-037', chapterId:'g3he-hygiene', difficulty:1, subsection:'body_hygiene',
    question:'It is good hygiene practice to wash our hair at least twice a week.',
    answer:true,
    explanation:'<b>True.</b> Hair collects dirt, sweat and pollutants. Washing at least twice a week keeps the scalp clean and healthy.' }),

  makeMCQ({ id:'g3he-hyg-038', chapterId:'g3he-hygiene', difficulty:1, subsection:'body_hygiene',
    question:'What is the main benefit of wearing clean, properly fitting shoes?',
    options:['They protect the feet','They look fashionable','They make feet sweat','They change our height'],
    answer:'They protect the feet',
    hint:'Shoes do more than just cover the feet.',
    explanation:'Well-fitting, clean shoes <b>protect against injury, cuts and infections</b>, while properly sized shoes support foot development and posture during childhood.' }),

  makeTF({ id:'g3he-hyg-039', chapterId:'g3he-hygiene', difficulty:1, subsection:'body_hygiene',
    question:'Sharing towels between family members is acceptable hygiene practice.',
    answer:false,
    explanation:'<b>False.</b> Towels carry bacteria, skin cells and potentially fungi. Each person should use their own towel to prevent sharing infections.' }),

  makeMCQ({ id:'g3he-hyg-040', chapterId:'g3he-hygiene', difficulty:2, subsection:'body_hygiene',
    question:'A child notices a red, itchy rash after using a new soap. What should they do?',
    options:['Stop using it, tell an adult','Wash more with the same soap','Ignore it for a few days','Put toothpaste on the rash'],
    answer:'Stop using it, tell an adult',
    hint:'Rashes after using a new product suggest a reaction.',
    explanation:'A red, itchy rash after using a new product suggests an <b>allergic reaction or skin sensitivity</b>. Stop using the product immediately and consult a pharmacist or doctor.' }),

  // ── disease_prevention (031–040) ──────────────────────────────────────────

  makeMCQ({ id:'g3he-hyg-041', chapterId:'g3he-hygiene', difficulty:2, subsection:'disease_prevention',
    question:'What is "herd immunity"?',
    options:['Enough people are vaccinated','Only old people are vaccinated','Animals protect people','A disease becomes stronger'],
    answer:'Enough people are vaccinated',
    hint:'Think about what happens when most people are immune.',
    explanation:'<b>Herd immunity</b> occurs when a high percentage of the population is vaccinated, making it difficult for a disease to spread — even those who cannot be vaccinated are protected.' }),

  makeTF({ id:'g3he-hyg-042', chapterId:'g3he-hygiene', difficulty:1, subsection:'disease_prevention',
    question:'Antibiotics are effective against bacterial infections but do NOT work against viral infections like the common cold.',
    answer:true,
    explanation:'<b>True.</b> Antibiotics kill bacteria. Viruses (cold, flu) are not affected by antibiotics. Taking them for colds is ineffective and contributes to antibiotic resistance.' }),

  makeMCQ({ id:'g3he-hyg-043', chapterId:'g3he-hygiene', difficulty:1, subsection:'disease_prevention',
    question:'Which disease is spread by drinking contaminated water?',
    options:['Cholera','Chicken pox','Measles','Tooth decay'],
    answer:'Cholera',
    hint:'Think about diseases linked to unclean water.',
    explanation:'<b>Cholera</b> is a bacterial infection spread through water contaminated with faeces. It causes severe diarrhoea and dehydration and can be fatal without treatment.' }),

  makeTF({ id:'g3he-hyg-044', chapterId:'g3he-hygiene', difficulty:1, subsection:'disease_prevention',
    question:'Regular exercise boosts our immune system, helping us fight off illness more effectively.',
    answer:true,
    explanation:'<b>True.</b> Regular moderate exercise improves circulation and immune cell production, helping the body detect and fight infections more efficiently.' }),

  makeMCQ({ id:'g3he-hyg-045', chapterId:'g3he-hygiene', difficulty:2, subsection:'disease_prevention',
    question:'In Mauritius, what is the most important season to be extra careful about mosquito-borne diseases?',
    options:['The hot, rainy summer','The cool, dry winter','Only during cyclones','Every season is the same'],
    answer:'The hot, rainy summer',
    hint:'Think about when mosquitoes breed most.',
    explanation:'Dengue and other Aedes mosquito-borne diseases peak in <b>Mauritius\'s hot, rainy summer</b> (November–April) when standing water is abundant and temperatures favour mosquito breeding.' }),

  makeMCQ({ id:'g3he-hyg-046', chapterId:'g3he-hygiene', difficulty:1, subsection:'disease_prevention',
    question:'Which practice reduces the risk of food-borne illness?',
    options:['Cooking food thoroughly','Tasting food to check it','Sharing one chopping board','Leaving food out all day'],
    answer:'Cooking food thoroughly',
    hint:'Food safety involves preparation, cooking and storage.',
    explanation:'Food safety requires <b>clean hands, thorough cooking and proper storage</b>. Using the same board for raw meat and vegetables causes cross-contamination.' }),

  makeTF({ id:'g3he-hyg-047', chapterId:'g3he-hygiene', difficulty:1, subsection:'disease_prevention',
    question:'Sharing needles or syringes is extremely dangerous and can spread diseases like HIV and hepatitis.',
    answer:true,
    explanation:'<b>True.</b> Shared needles carry blood which may contain serious blood-borne viruses. Even a tiny amount of infected blood can transmit HIV or hepatitis B and C.' }),

  makeMCQ({ id:'g3he-hyg-048', chapterId:'g3he-hygiene', difficulty:2, subsection:'disease_prevention',
    question:'Why do some diseases spread more easily in overcrowded places?',
    options:['People are close together','Crowds make people stronger','Crowds give people energy','Crowding makes no difference'],
    answer:'People are close together',
    hint:'Think about what happens to coughs and sneezes in a crowded space.',
    explanation:'Overcrowded spaces allow <b>cough/sneeze droplets and surface contact germs to travel quickly</b> from person to person. Ventilation and spacing reduce risk.' }),

  makeTF({ id:'g3he-hyg-049', chapterId:'g3he-hygiene', difficulty:1, subsection:'disease_prevention',
    question:'Getting enough sleep helps our immune system stay strong.',
    answer:true,
    explanation:'<b>True.</b> During sleep, the body produces cytokines — proteins that fight infection and inflammation. Poor sleep weakens the immune system.' }),

  makeMCQ({ id:'g3he-hyg-050', chapterId:'g3he-hygiene', difficulty:1, subsection:'disease_prevention',
    question:'Which is the best description of a "healthy lifestyle" that prevents disease?',
    options:['Exercise, good food and sleep','Eating as much as possible','Sleeping all day, no exercise','Only taking medicine'],
    answer:'Exercise, good food and sleep',
    hint:'Good health comes from multiple positive habits together.',
    explanation:'A <b>healthy lifestyle</b> combines exercise, balanced nutrition, sleep, hydration, hygiene and avoiding harmful substances — all working together to prevent disease.' }),

  // ── community_hygiene (031–040) ───────────────────────────────────────────

  makeMCQ({ id:'g3he-hyg-051', chapterId:'g3he-hygiene', difficulty:2, subsection:'community_hygiene',
    question:'How does poor rubbish disposal in a community contribute to disease?',
    options:['It attracts flies and rats','It only smells unpleasant','It only looks untidy','It only affects factories'],
    answer:'It attracts flies and rats',
    hint:'Think about what rubbish attracts.',
    explanation:'Uncollected rubbish <b>attracts flies (spreading cholera, dysentery) and rats (spreading leptospirosis)</b>. Blocked drains create mosquito breeding grounds for dengue fever.' }),

  makeTF({ id:'g3he-hyg-052', chapterId:'g3he-hygiene', difficulty:1, subsection:'community_hygiene',
    question:'Open-air burning of rubbish is a safe and healthy way to dispose of waste.',
    answer:false,
    explanation:'<b>False.</b> Burning rubbish releases toxic gases and particles that cause respiratory disease. Safe disposal in bins or at recycling centres is far healthier for the community.' }),

  makeMCQ({ id:'g3he-hyg-053', chapterId:'g3he-hygiene', difficulty:1, subsection:'community_hygiene',
    question:'What is recycling, and why is it good for community health?',
    options:['Making waste into new things','Throwing waste in the river','Burning waste in the yard','Leaving waste in the fields'],
    answer:'Making waste into new things',
    hint:'Think about what happens to glass, paper and plastic when recycled.',
    explanation:'<b>Recycling</b> converts waste into useful materials, reducing landfill sites, water and air pollution — making the community environment healthier for everyone.' }),

  makeTF({ id:'g3he-hyg-054', chapterId:'g3he-hygiene', difficulty:1, subsection:'community_hygiene',
    question:'A community with access to clean piped water and good sanitation has lower rates of water-borne disease.',
    answer:true,
    explanation:'<b>True.</b> Safe water and sanitation (toilets and sewage systems) directly prevent cholera, typhoid and diarrhoeal diseases — some of history\'s greatest killers.' }),

  makeMCQ({ id:'g3he-hyg-055', chapterId:'g3he-hygiene', difficulty:2, subsection:'community_hygiene',
    question:'After a cyclone in Mauritius, why is it especially important to boil water before drinking?',
    options:['Floodwater can carry germs','Floodwater adds minerals','Rain changes the taste','Water is always safe'],
    answer:'Floodwater can carry germs',
    hint:'Think about what flood water mixes with.',
    explanation:'After cyclones, <b>floodwater can contaminate pipes with sewage and bacteria</b>. Authorities advise boiling water until the supply is confirmed safe, to prevent disease outbreaks.' }),

  makeMCQ({ id:'g3he-hyg-056', chapterId:'g3he-hygiene', difficulty:1, subsection:'community_hygiene',
    question:'What is the purpose of a community health clinic?',
    options:['To care for local people','To sell medicines only','To treat emergencies only','To help elderly people only'],
    answer:'To care for local people',
    hint:'Community clinics serve the whole local population.',
    explanation:'Community health clinics provide <b>primary healthcare, immunisations and health education</b> to local residents, promoting wellness and preventing disease before it spreads.' }),

  makeTF({ id:'g3he-hyg-057', chapterId:'g3he-hygiene', difficulty:1, subsection:'community_hygiene',
    question:'Every member of a community, including children, has a role in keeping the environment clean.',
    answer:true,
    explanation:'<b>True.</b> Community cleanliness is everyone\'s responsibility. Even children can contribute by not littering, picking up litter and encouraging others to do the same.' }),

  makeMCQ({ id:'g3he-hyg-058', chapterId:'g3he-hygiene', difficulty:1, subsection:'community_hygiene',
    question:'Why should we not wash cars, clothes or animals directly in rivers or streams?',
    options:['Soap pollutes the water','Rivers are only for boats','Rivers flow too quickly','Rivers are always too cold'],
    answer:'Soap pollutes the water',
    hint:'Think about where that soapy water goes.',
    explanation:'Detergents and chemicals from washing <b>pollute rivers</b>, destroying aquatic ecosystems and contaminating water sources that communities may rely on for drinking.' }),

  makeTF({ id:'g3he-hyg-059', chapterId:'g3he-hygiene', difficulty:1, subsection:'community_hygiene',
    question:'Reporting a broken drain or sewage pipe to local authorities helps protect the whole community\'s health.',
    answer:true,
    explanation:'<b>True.</b> A broken sewage pipe releases bacteria into the environment. Reporting it quickly allows repairs that prevent disease spreading through the neighbourhood.' }),

  makeMCQ({ id:'g3he-hyg-060', chapterId:'g3he-hygiene', difficulty:2, subsection:'community_hygiene',
    question:'Schools can help improve community health by:',
    options:['Teaching good hygiene habits','Teaching only maths','Selling sweets and drinks','Leaving health to hospitals'],
    answer:'Teaching good hygiene habits',
    hint:'Schools are part of the community and can lead by example.',
    explanation:'Schools are <b>powerful community health resources</b> — health education, hygiene practices taught to children spread to families and communities, creating a ripple effect of improved health.' }),

  // ── nutrients (031–040) ───────────────────────────────────────────────────

  makeMCQ({ id:'g3he-nut-031', chapterId:'g3he-nutrition', difficulty:2, subsection:'nutrients',
    question:'Which nutrients provide the building material for ALL body cells?',
    options:['Proteins','Carbohydrates','Fats','Water'],
    answer:'Proteins',
    hint:'Building material for the body.',
    explanation:'<b>Proteins</b> are the fundamental building material for every cell, enzyme, hormone and antibody in the body. Without adequate protein, growth and repair cannot happen.' }),

  makeTF({ id:'g3he-nut-032', chapterId:'g3he-nutrition', difficulty:1, subsection:'nutrients',
    question:'Vitamin C is found in citrus fruits, guavas and tomatoes, and helps the body absorb iron.',
    answer:true,
    explanation:'<b>True.</b> Vitamin C enhances the absorption of non-haem iron (from plant sources like spinach). Eating a guava with a lentil dish, for example, doubles the iron absorbed.' }),

  makeMCQ({ id:'g3he-nut-033', chapterId:'g3he-nutrition', difficulty:2, subsection:'nutrients',
    question:'Which of these PAIRS of nutrients works together: one helps build bones, the other helps the body absorb it?',
    options:['Calcium and Vitamin D','Sugar and salt','Fat and Vitamin C','Iron and cooking oil'],
    answer:'Calcium and Vitamin D',
    hint:'Think about what makes bones strong.',
    explanation:'<b>Calcium</b> builds bones, but without <b>Vitamin D</b> the gut cannot absorb calcium properly. That\'s why milk (calcium) is often fortified with Vitamin D.' }),

  makeTF({ id:'g3he-nut-034', chapterId:'g3he-nutrition', difficulty:1, subsection:'nutrients',
    question:'Eating too much salt (sodium) over a long period can raise blood pressure and increase the risk of heart disease.',
    answer:true,
    explanation:'<b>True.</b> Excess sodium causes the body to retain water, increasing blood pressure. High blood pressure damages blood vessels and is a leading cause of heart disease and stroke.' }),

  makeMCQ({ id:'g3he-nut-035', chapterId:'g3he-nutrition', difficulty:1, subsection:'nutrients',
    question:'Omega-3 fatty acids, found in fish like tuna and sardines, are important for:',
    options:['Brain development','Shiny hair only','Quick energy only','Building bones only'],
    answer:'Brain development',
    hint:'These fats are often linked to brain health.',
    explanation:'<b>Omega-3 fatty acids</b> support brain development, improve memory and concentration, and reduce inflammation. Fish common in Mauritius (tuna, sardines) are excellent sources.' }),

  makeMCQ({ id:'g3he-nut-036', chapterId:'g3he-nutrition', difficulty:2, subsection:'nutrients',
    question:'Why do children need MORE iron in their diet than adults (per body weight)?',
    options:['They are growing quickly','They think more often','They sweat out more iron','Iron needs never change'],
    answer:'They are growing quickly',
    hint:'Think about why growing bodies need more of certain nutrients.',
    explanation:'As children grow, their blood volume increases rapidly. More red blood cells (which contain iron) are needed, so <b>iron requirements are proportionally higher during childhood</b>.' }),

  makeTF({ id:'g3he-nut-037', chapterId:'g3he-nutrition', difficulty:1, subsection:'nutrients',
    question:'Potassium, found in bananas and potatoes, helps muscles (including the heart) contract properly.',
    answer:true,
    explanation:'<b>True.</b> Potassium is essential for nerve signal transmission and muscle contraction, including the heart muscle. Deficiency can cause muscle cramps and heart irregularities.' }),

  makeMCQ({ id:'g3he-nut-038', chapterId:'g3he-nutrition', difficulty:2, subsection:'nutrients',
    question:'A child who does not eat enough iron-rich food may become:',
    options:['Anaemic, pale and tired','Overweight very quickly','Much more energetic','Unable to swallow food'],
    answer:'Anaemic, pale and tired',
    hint:'Iron is needed for red blood cells.',
    explanation:'Iron deficiency causes <b>anaemia</b> — too few red blood cells to carry oxygen efficiently. Symptoms include fatigue, pallor, breathlessness and poor concentration.' }),

  makeTF({ id:'g3he-nut-039', chapterId:'g3he-nutrition', difficulty:1, subsection:'nutrients',
    question:'Most vitamins and minerals work best when obtained from FOOD, rather than supplements, because food provides them alongside other helpful compounds.',
    answer:true,
    explanation:'<b>True.</b> Whole foods provide nutrients together with fibre, antioxidants and other compounds that aid absorption. Supplements provide isolated nutrients and are less effective overall.' }),

  makeMCQ({ id:'g3he-nut-040', chapterId:'g3he-nutrition', difficulty:1, subsection:'nutrients',
    question:'Which of the following is NOT a macronutrient (the three main nutrient groups)?',
    options:['Vitamin C','Carbohydrates','Proteins','Fats'],
    answer:'Vitamin C',
    hint:'Macronutrients are needed in large amounts; micronutrients in small amounts.',
    explanation:'The three <b>macronutrients</b> are carbohydrates, proteins and fats — needed in large amounts. Vitamin C is a <b>micronutrient</b> (vitamin), needed only in small amounts.' }),

  // ── food_energy (031–040) ─────────────────────────────────────────────────

  makeMCQ({ id:'g3he-nut-041', chapterId:'g3he-nutrition', difficulty:2, subsection:'food_energy',
    question:'Why do children need more calories (food energy) per kilogram of body weight than adults?',
    options:['They are growing and active','They have smaller stomachs','They burn energy slowly','There is no difference'],
    answer:'They are growing and active',
    hint:'Growth and development require extra energy.',
    explanation:'Children\'s bodies are <b>growing, active and developing</b> simultaneously, requiring proportionally more energy than adult bodies that are only maintaining themselves.' }),

  makeTF({ id:'g3he-nut-042', chapterId:'g3he-nutrition', difficulty:1, subsection:'food_energy',
    question:'Fried foods contain more calories than the same food cooked by boiling or grilling.',
    answer:true,
    explanation:'<b>True.</b> Frying adds significant fat (and therefore calories) to food. Boiling and grilling use little or no added fat, producing lower-calorie versions of the same foods.' }),

  makeMCQ({ id:'g3he-nut-043', chapterId:'g3he-nutrition', difficulty:1, subsection:'food_energy',
    question:'Which meal best provides slow-release energy to keep a child alert throughout a school morning?',
    options:['Wholemeal bread and egg','A doughnut and a cola','Sugar in warm water','Sweets and chocolate bars'],
    answer:'Wholemeal bread and egg',
    hint:'Slow-release energy comes from complex carbohydrates, not sugar.',
    explanation:'<b>Wholemeal bread</b> provides complex carbohydrates for slow-release energy. Egg adds protein. Fruit adds vitamins. Together they sustain concentration for hours, unlike sugar which spikes then crashes.' }),

  makeTF({ id:'g3he-nut-044', chapterId:'g3he-nutrition', difficulty:1, subsection:'food_energy',
    question:'If we eat more energy (food) than we use through activity, the extra is stored as fat in the body.',
    answer:true,
    explanation:'<b>True.</b> Unused energy is converted to and stored as body fat. Over time, consistently eating more than we need leads to weight gain and associated health problems.' }),

  makeMCQ({ id:'g3he-nut-045', chapterId:'g3he-nutrition', difficulty:2, subsection:'food_energy',
    question:'Reena walks 3 km to school every day but has a desk job mother who uses a car. Who needs more calories per day?',
    options:['Reena, who walks 3 km','The mother, an adult','Both need the same','Neither needs any food'],
    answer:'Reena, who walks 3 km',
    hint:'Activity level determines energy expenditure.',
    explanation:'<b>Physical activity is one of the biggest factors in energy needs.</b> Reena burns more energy walking 3 km daily and needs more calories to replace it.' }),

  makeMCQ({ id:'g3he-nut-046', chapterId:'g3he-nutrition', difficulty:1, subsection:'food_energy',
    question:'Which Mauritian food is an excellent plant-based protein that also provides carbohydrate energy?',
    options:['Red kidney beans','Plain white sugar','Cooking oil','Fizzy drinks'],
    answer:'Red kidney beans',
    hint:'Think about popular Mauritian legume dishes.',
    explanation:'<b>Red kidney beans (pois rouge)</b> are a staple in Mauritian cuisine. They provide both protein (for growth) and complex carbohydrates (for energy) — a highly nutritious combination.' }),

  makeTF({ id:'g3he-nut-047', chapterId:'g3he-nutrition', difficulty:1, subsection:'food_energy',
    question:'Eating protective foods (fruits and vegetables) with energy foods helps our immune system use the energy efficiently.',
    answer:true,
    explanation:'<b>True.</b> Vitamins and minerals in protective foods are often co-factors for enzymes that metabolise energy. A balanced meal works synergistically, not in isolation.' }),

  makeMCQ({ id:'g3he-nut-048', chapterId:'g3he-nutrition', difficulty:2, subsection:'food_energy',
    question:'Marco eats a large bowl of plain white rice for lunch every day but no protein or vegetables. Over months, what might happen?',
    options:['His growth may slow down','He will grow very fast','His muscles will grow','Nothing at all will change'],
    answer:'His growth may slow down',
    hint:'What is missing from a diet of only plain rice?',
    explanation:'Plain white rice provides only carbohydrates. Over time, <b>protein and vitamin deficiency</b> leads to stunted growth, muscle loss, weakened immunity and nutrient-deficiency diseases.' }),

  makeTF({ id:'g3he-nut-049', chapterId:'g3he-nutrition', difficulty:1, subsection:'food_energy',
    question:'Brown rice is more nutritious than white rice because the outer bran layer contains fibre, vitamins and minerals.',
    answer:true,
    explanation:'<b>True.</b> Milling removes the bran from white rice, stripping away fibre, B vitamins and minerals. Brown rice retains these, making it more nutritious.' }),

  makeMCQ({ id:'g3he-nut-050', chapterId:'g3he-nutrition', difficulty:1, subsection:'food_energy',
    question:'What is the role of fats in the diet (in the right amount)?',
    options:['They store energy','They only add flavour','They only add weight','They do nothing useful'],
    answer:'They store energy',
    hint:'Fats do more than just provide calories.',
    explanation:'<b>Dietary fats</b> provide concentrated energy, help absorb vitamins A, D, E and K, insulate the body against temperature changes and cushion organs. Healthy fats are necessary.' }),

  // ── water_diet (031–040) ──────────────────────────────────────────────────

  makeMCQ({ id:'g3he-nut-051', chapterId:'g3he-nutrition', difficulty:2, subsection:'water_diet',
    question:'Why is urine colour a useful indicator of hydration?',
    options:['Dark urine shows dehydration','Urine colour means nothing','Clear urine shows thirst','Dark urine is healthier'],
    answer:'Dark urine shows dehydration',
    hint:'The kidneys concentrate urine when water intake is low.',
    explanation:'<b>Urine colour</b> is a reliable hydration signal. Pale yellow = well-hydrated. Dark yellow/orange = dehydrated — the kidneys are conserving water by concentrating urine.' }),

  makeTF({ id:'g3he-nut-052', chapterId:'g3he-nutrition', difficulty:1, subsection:'water_diet',
    question:'In Mauritius\'s hot summer, children should drink more water than in the cooler months.',
    answer:true,
    explanation:'<b>True.</b> Heat increases sweating, which increases water loss. More water must be drunk to replace it and prevent dehydration.' }),

  makeMCQ({ id:'g3he-nut-053', chapterId:'g3he-nutrition', difficulty:2, subsection:'water_diet',
    question:'Why is it dangerous to drink seawater if you are stranded without fresh water?',
    options:['The salt makes thirst worse','It is safe in small amounts','It gives useful minerals','Only the taste is bad'],
    answer:'The salt makes thirst worse',
    hint:'Think about what the kidneys must do to remove excess salt.',
    explanation:'Seawater has far more salt than body fluids. To excrete that salt, the kidneys use <b>more water than was drunk</b>, accelerating dehydration. It is a survival myth that seawater helps.' }),

  makeTF({ id:'g3he-nut-054', chapterId:'g3he-nutrition', difficulty:1, subsection:'water_diet',
    question:'Fruits and vegetables also contribute to our daily water intake because they contain a high percentage of water.',
    answer:true,
    explanation:'<b>True.</b> Cucumbers, watermelon, tomatoes and most fruits are over 80% water. Eating them contributes significantly to daily hydration.' }),

  makeMCQ({ id:'g3he-nut-055', chapterId:'g3he-nutrition', difficulty:2, subsection:'water_diet',
    question:'Which of these is NOT part of a balanced diet?',
    options:['Sweets at every meal','Fruit and vegetables daily','Enough water each day','Protein foods regularly'],
    answer:'Sweets at every meal',
    hint:'A balanced diet includes some of everything — but not all in equal measure.',
    explanation:'<b>Sweets and fried food</b> are high in sugar/fat and low in nutrients. They should be occasional treats, not the main component of meals. A balanced diet is built on nutrient-dense foods.' }),

  makeMCQ({ id:'g3he-nut-056', chapterId:'g3he-nutrition', difficulty:1, subsection:'water_diet',
    question:'What happens to the body\'s performance when mildly dehydrated (as little as 2% water loss)?',
    options:['Concentration drops','Nothing changes at all','The body works better','Only athletes notice'],
    answer:'Concentration drops',
    hint:'Even mild dehydration affects the brain.',
    explanation:'Just <b>2% water loss</b> (mild dehydration) measurably reduces concentration, mental alertness and physical performance. Children should drink water regularly, not only when very thirsty.' }),

  makeTF({ id:'g3he-nut-057', chapterId:'g3he-nutrition', difficulty:1, subsection:'water_diet',
    question:'A balanced diet that includes all food groups in appropriate amounts helps maintain a healthy body weight.',
    answer:true,
    explanation:'<b>True.</b> When energy intake matches energy expenditure and the diet is nutritionally complete, the body maintains a healthy weight and functions optimally.' }),

  makeMCQ({ id:'g3he-nut-058', chapterId:'g3he-nutrition', difficulty:2, subsection:'water_diet',
    question:'The concept of "eating a rainbow" (red, orange, green, purple foods) is helpful because:',
    options:['Colours mean different vitamins','Colourful food tastes better','Only orange food has vitamins','Colour shows added dye'],
    answer:'Colours mean different vitamins',
    hint:'Think about why different colours exist in plants.',
    explanation:'Plant colours come from <b>phytonutrients and antioxidants</b>: red = lycopene, orange = beta-carotene, green = chlorophyll/lutein. "Eating a rainbow" maximises nutrient variety.' }),

  makeTF({ id:'g3he-nut-059', chapterId:'g3he-nutrition', difficulty:1, subsection:'water_diet',
    question:'Drinking water with meals helps digestion.',
    answer:true,
    explanation:'<b>True.</b> Water helps break down food, allows digestive enzymes to work effectively and helps transport nutrients through the digestive system.' }),

  makeMCQ({ id:'g3he-nut-060', chapterId:'g3he-nutrition', difficulty:1, subsection:'water_diet',
    question:'Which meal plan best represents a full day of balanced eating?',
    options:['Egg, dhal, fish and vegetables','Fried food and cola at every meal','Only salad at every meal','One large dessert only'],
    answer:'Egg, dhal, fish and vegetables',
    hint:'Look for the plan that includes all food groups at every meal.',
    explanation:'This plan includes <b>protein, carbohydrate, vegetables and hydration at every meal</b> — a genuinely balanced day of eating for a growing child in Mauritius.' }),

  // ── accident_prevention (031–040) ─────────────────────────────────────────

  makeMCQ({ id:'g3he-saf-031', chapterId:'g3he-safety', difficulty:2, subsection:'accident_prevention',
    question:'Why is distracted walking (looking at a phone while walking) dangerous?',
    options:['You do not see hazards','You walk more slowly','It affects adults only','It is a danger at night only'],
    answer:'You do not see hazards',
    hint:'Think about what you cannot see when looking at a screen.',
    explanation:'Distracted walking means your attention is on the screen, not the environment. You miss <b>steps, obstacles, cyclists and traffic</b> — causing trips, falls and being hit by vehicles.' }),

  makeTF({ id:'g3he-saf-032', chapterId:'g3he-safety', difficulty:1, subsection:'accident_prevention',
    question:'A spill on the floor should be cleaned up immediately to prevent someone slipping.',
    answer:true,
    explanation:'<b>True.</b> Liquid on a floor creates an invisible hazard. Slips on wet floors are a leading cause of serious injuries. Clean spills up the moment they happen.' }),

  makeMCQ({ id:'g3he-saf-033', chapterId:'g3he-safety', difficulty:1, subsection:'accident_prevention',
    question:'Why should we not run near a swimming pool?',
    options:['Wet floors are slippery','Running splashes the water','Running is too noisy','It makes the pool dirty'],
    answer:'Wet floors are slippery',
    hint:'Think about the surface condition near pools.',
    explanation:'Pool surrounds are always wet. Running on wet surfaces causes falls. If you hit your head on the pool edge or the hard ground, the result can be <b>fatal</b>. Always walk near pools.' }),

  makeTF({ id:'g3he-saf-034', chapterId:'g3he-safety', difficulty:1, subsection:'accident_prevention',
    question:'Keeping walkways and corridors clear of bags and equipment prevents trip-and-fall accidents.',
    answer:true,
    explanation:'<b>True.</b> Objects in walkways cause people to trip, especially when they are carrying something and cannot see the floor. Clear paths are a simple accident prevention measure.' }),

  makeMCQ({ id:'g3he-saf-035', chapterId:'g3he-safety', difficulty:2, subsection:'accident_prevention',
    question:'Why should we never mix household cleaning chemicals (like bleach and ammonia)?',
    options:['They make poisonous gas','They cancel each other out','They only smell bad','They work much faster'],
    answer:'They make poisonous gas',
    hint:'Chemical reactions between cleaning products can be deadly.',
    explanation:'Bleach + ammonia creates <b>toxic chloramine gases</b> that damage the respiratory system. Mixing any cleaning chemicals is dangerous. Read labels and never mix products.' }),

  makeMCQ({ id:'g3he-saf-036', chapterId:'g3he-safety', difficulty:1, subsection:'accident_prevention',
    question:'When using scissors or a craft knife for a school project, which practice prevents cuts?',
    options:['Cut away from yourself','Cut towards yourself','Work as fast as you can','Hold the sharp edge'],
    answer:'Cut away from yourself',
    hint:'Safe cutting technique keeps the blade away from the body.',
    explanation:'Always <b>cut away from yourself</b>, keep fingers well behind the blade and use the appropriate tool. Most craft cuts happen when people cut towards themselves or rush.' }),

  makeTF({ id:'g3he-saf-037', chapterId:'g3he-safety', difficulty:1, subsection:'accident_prevention',
    question:'Wearing appropriate personal protective equipment (PPE) reduces the risk of injury during hazardous activities.',
    answer:true,
    explanation:'<b>True.</b> PPE like helmets for cycling, goggles for science experiments and gloves for gardening directly reduces injury risk by forming a barrier between the body and hazards.' }),

  makeMCQ({ id:'g3he-saf-038', chapterId:'g3he-safety', difficulty:1, subsection:'accident_prevention',
    question:'Which of these is a common cause of house fires in Mauritius?',
    options:['Cooking left unattended','Lights left on too long','Running inside the house','Too many books indoors'],
    answer:'Cooking left unattended',
    hint:'Think about heat sources and electrical wiring.',
    explanation:'<b>Unattended cooking and faulty electrical wiring</b> are leading causes of house fires globally and in Mauritius. Never leave cooking unattended; check wiring regularly.' }),

  makeTF({ id:'g3he-saf-039', chapterId:'g3he-safety', difficulty:1, subsection:'accident_prevention',
    question:'Children under 12 should not be left alone to supervise younger siblings, as accidents can happen that they cannot manage alone.',
    answer:true,
    explanation:'<b>True.</b> Young children lack the knowledge, strength and emotional maturity to safely supervise a younger child in an emergency. Adult supervision is needed.' }),

  makeMCQ({ id:'g3he-saf-040', chapterId:'g3he-safety', difficulty:2, subsection:'accident_prevention',
    question:'You notice a loose wire coming out of a wall socket at school. What should you do?',
    options:['Tell a teacher at once','Tape it back yourself','Ignore it for now','Ask a friend to look'],
    answer:'Tell a teacher at once',
    hint:'Electrical faults need qualified repair — not DIY.',
    explanation:'A loose wire is an electrical hazard that could cause shock or fire. <b>Report it immediately</b> to a teacher. Never touch or attempt to fix electrical problems — only qualified electricians should do this.' }),

  // ── road_water_safety (031–040) ───────────────────────────────────────────

  makeMCQ({ id:'g3he-saf-041', chapterId:'g3he-safety', difficulty:2, subsection:'road_water_safety',
    question:'During the Mauritian cyclone season, why is it especially dangerous to walk near rivers and drains?',
    options:['They can flood very fast','They stay calm in storms','They are deeper in winter','They only smell bad'],
    answer:'They can flood very fast',
    hint:'Cyclones bring very heavy rain.',
    explanation:'Cyclone rainfall is intense. Rivers and drains can <b>rise from ankle to head height in minutes</b>, creating powerful currents that sweep people and vehicles away. Stay well back during heavy rain.' }),

  makeTF({ id:'g3he-saf-042', chapterId:'g3he-safety', difficulty:1, subsection:'road_water_safety',
    question:'All occupants of a vehicle, including children in the back seat, should wear a seatbelt.',
    answer:true,
    explanation:'<b>True.</b> Rear passengers can be thrown forward violently in a crash, injuring themselves and front-seat passengers. Seatbelts save lives in all seats.' }),

  makeMCQ({ id:'g3he-saf-043', chapterId:'g3he-safety', difficulty:1, subsection:'road_water_safety',
    question:'What does a FLASHING red traffic light signal mean?',
    options:['Treat it as a stop sign','Speed up to get through','Treat it as a green light','Stop and wait for help'],
    answer:'Treat it as a stop sign',
    hint:'A flashing light requires more caution than a steady green.',
    explanation:'A <b>flashing red light</b> means treat the intersection as a stop sign: stop completely, check all directions are clear, then proceed carefully. It signals a malfunction or extra caution needed.' }),

  makeTF({ id:'g3he-saf-044', chapterId:'g3he-safety', difficulty:1, subsection:'road_water_safety',
    question:'Open water (sea, rivers, lakes) is more dangerous than a swimming pool because there are unpredictable currents, no lane markers and no trained lifeguard.',
    answer:true,
    explanation:'<b>True.</b> Open water has hidden currents, sudden depth changes, weeds, and no lifeguard. Even strong swimmers have drowned in open water. Always swim in supervised, designated areas.' }),

  makeMCQ({ id:'g3he-saf-045', chapterId:'g3he-safety', difficulty:1, subsection:'road_water_safety',
    question:'Which piece of road safety equipment is legally required for a motorcycle rider in Mauritius?',
    options:['A correctly fitted helmet','A bright jacket only','Gloves only','No specific equipment is required'],
    answer:'A correctly fitted helmet',
    hint:'Head protection is the most critical safety item for two-wheeled vehicles.',
    explanation:'Mauritius law requires motorcycle riders to wear <b>a helmet</b>. In a collision, a helmet is the most effective single item in preventing fatal head injuries.' }),

  makeMCQ({ id:'g3he-saf-046', chapterId:'g3he-safety', difficulty:2, subsection:'road_water_safety',
    question:'A child sees a friend in distress in the sea, waving and unable to swim back. What is the SAFEST response?',
    options:['Shout and throw a float','Swim out to save them','Call their name and wait','Run away from the beach'],
    answer:'Shout and throw a float',
    hint:'Untrained rescuers often become additional victims.',
    explanation:'<b>Reach or throw before you go.</b> Throw a lifeline, ring or any floating object. Shout for the lifeguard or an adult. An untrained person jumping in often results in two drowning victims.' }),

  makeTF({ id:'g3he-saf-047', chapterId:'g3he-safety', difficulty:1, subsection:'road_water_safety',
    question:'Using a mobile phone while cycling is as dangerous as using one while driving a car.',
    answer:true,
    explanation:'<b>True.</b> Distraction from a phone affects reaction time and attention for both cyclists and drivers. In Mauritius, using a hand-held phone while driving is illegal for good reason.' }),

  makeMCQ({ id:'g3he-saf-048', chapterId:'g3he-safety', difficulty:1, subsection:'road_water_safety',
    question:'What should you do before entering deep water when you are unsure of your swimming ability?',
    options:['Wear a life jacket','Enter the water quickly','Close your eyes and jump','Nothing special is needed'],
    answer:'Wear a life jacket',
    hint:'Safety equipment and supervision protect those who cannot yet swim well.',
    explanation:'<b>A life jacket and adult supervision</b> are essential for non-swimmers or weak swimmers in deep water. These measures prevent drowning when skill is not enough.' }),

  makeTF({ id:'g3he-saf-049', chapterId:'g3he-safety', difficulty:1, subsection:'road_water_safety',
    question:'During a school fire drill, students should walk calmly to the exit, not run, to avoid falls and crowding.',
    answer:true,
    explanation:'<b>True.</b> Running during an evacuation causes falls and crowd surges that injure people. Walking in an orderly line is faster and safer for the whole group.' }),

  makeMCQ({ id:'g3he-saf-050', chapterId:'g3he-safety', difficulty:2, subsection:'road_water_safety',
    question:'Why are reflective road markers (cats\' eyes) built into roads?',
    options:['They reflect car headlights','They make their own light','They warn about potholes','They are only decoration'],
    answer:'They reflect car headlights',
    hint:'Think about what happens to light when it hits a reflective surface.',
    explanation:'Cats\' eyes contain a reflective element that <b>bounces headlight beams back to drivers</b>, marking road lanes clearly in darkness and heavy rain when painted lines are invisible.' }),

  // ── emergency_response (031–040) ──────────────────────────────────────────

  makeMCQ({ id:'g3he-saf-051', chapterId:'g3he-safety', difficulty:1, subsection:'emergency_response',
    question:'What is the emergency telephone number in Mauritius?',
    options:['999, 114 and 115','911, 100 and 101','101, 102 and 103','133, 144 and 155'],
    answer:'999, 114 and 115',
    hint:'These numbers are specific to Mauritius.',
    explanation:'In Mauritius: <b>999 for police, 114 for SAMU (medical emergency), 115 for fire brigade</b>. Memorise these — you may need them in a crisis.' }),

  makeTF({ id:'g3he-saf-052', chapterId:'g3he-safety', difficulty:1, subsection:'emergency_response',
    question:'If someone is unconscious but breathing normally, placing them in the recovery position prevents choking.',
    answer:true,
    explanation:'<b>True.</b> The recovery position (on their side, head tilted) keeps the airway open and allows vomit or fluid to drain from the mouth rather than blocking the airway.' }),

  makeMCQ({ id:'g3he-saf-053', chapterId:'g3he-safety', difficulty:2, subsection:'emergency_response',
    question:'CPR (Cardiopulmonary Resuscitation) is used when someone:',
    options:['Has stopped breathing','Has a mild headache','Has a sprained ankle','Is fast asleep'],
    answer:'Has stopped breathing',
    hint:'CPR keeps blood moving when the heart is not.',
    explanation:'<b>CPR</b> is performed when a person is unresponsive, not breathing and has no heartbeat. Chest compressions and rescue breaths circulate blood until medical help arrives.' }),

  makeTF({ id:'g3he-saf-054', chapterId:'g3he-safety', difficulty:1, subsection:'emergency_response',
    question:'In an emergency, giving the exact location is the most important piece of information for emergency services.',
    answer:true,
    explanation:'<b>True.</b> Emergency services cannot help if they do not know where to go. Always give the full address, nearest landmark or GPS location first when calling for help.' }),

  makeMCQ({ id:'g3he-saf-055', chapterId:'g3he-safety', difficulty:1, subsection:'emergency_response',
    question:'What should you do if someone is having an epileptic seizure?',
    options:['Move hard objects away','Hold them down firmly','Put a spoon in their mouth','Give them water at once'],
    answer:'Move hard objects away',
    hint:'Your job is to protect from injury, not to stop the seizure.',
    explanation:'During a seizure: <b>move hard objects away, time it, call for help, place in recovery position when still</b>. Never restrain — it increases injury risk. Never put anything in the mouth — it blocks the airway.' }),

  makeMCQ({ id:'g3he-saf-056', chapterId:'g3he-safety', difficulty:2, subsection:'emergency_response',
    question:'A DRSABC framework helps remember the steps of emergency response. What does the "D" stand for?',
    options:['Danger','Doctor','Dial','Drink'],
    answer:'Danger',
    hint:'You cannot help if you become a casualty yourself.',
    explanation:'<b>D = Danger:</b> check the environment is safe before approaching a casualty. A second victim (the rescuer) doubles the problem. Safety first is ALWAYS first in emergency response.' }),

  makeTF({ id:'g3he-saf-057', chapterId:'g3he-safety', difficulty:1, subsection:'emergency_response',
    question:'A first aid kit should contain plasters, clean bandages, antiseptic wipes, scissors and a list of emergency numbers.',
    answer:true,
    explanation:'<b>True.</b> These are the basic first aid kit essentials. Plasters and bandages cover wounds; antiseptic wipes clean them; scissors cut bandages; emergency numbers ensure help is called.' }),

  makeMCQ({ id:'g3he-saf-058', chapterId:'g3he-safety', difficulty:1, subsection:'emergency_response',
    question:'If you accidentally swallow a chemical or household poison, what should you do?',
    options:['Call SAMU on 114 at once','Drink lots of water','Wait to see how you feel','Make yourself vomit'],
    answer:'Call SAMU on 114 at once',
    hint:'Some poisons cause more damage when vomited back up.',
    explanation:'Call <b>SAMU 114</b> with the substance name. Do NOT induce vomiting — some chemicals (acids, alkalis) cause more damage coming back up than going down. Follow the operator\'s instructions.' }),

  makeTF({ id:'g3he-saf-059', chapterId:'g3he-safety', difficulty:1, subsection:'emergency_response',
    question:'Learning the fire escape plan for your home and practising it makes a real fire evacuation faster and safer.',
    answer:true,
    explanation:'<b>True.</b> In a real fire, smoke reduces visibility and panic sets in quickly. A practised escape route becomes automatic, allowing faster, calmer evacuation even under stress.' }),

  makeMCQ({ id:'g3he-saf-060', chapterId:'g3he-safety', difficulty:2, subsection:'emergency_response',
    question:'You arrive at school and find a classmate lying unconscious outside. Which is the CORRECT first step?',
    options:['Check that the scene is safe','Roll them over immediately','Give them food and drink','Take a photograph first'],
    answer:'Check that the scene is safe',
    hint:'Safety → responsiveness → airway → breathing — in that order.',
    explanation:'Following DRSABC: first ensure <b>no danger to yourself</b>, then check for <b>response</b> by calling their name and tapping their shoulder. If no response, call for help immediately and check breathing.' })

);

})();
