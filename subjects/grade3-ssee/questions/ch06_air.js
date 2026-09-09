'use strict';
(function () {

// Grade 3 SSEE — Unit 6: Air Around Us
// Source: MIE SSEE Grade 3 Part 2 pp.33-61
// IDs: g3ssee-air-001 onwards

// ── properties_air (001-030) ──────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g3ssee-air-001', chapterId:'g3ssee-air', difficulty:1, subsection:'properties_air',
    question:'What is AIR made of?',
    options:['A mixture of gases including nitrogen and oxygen','Only oxygen','Only water vapour','Only carbon dioxide'],
    answer:'A mixture of gases including nitrogen and oxygen',
    hint:'We breathe a mixture of gases.',
    explanation:'<b>Air</b> is a mixture of gases. It is mostly <b>nitrogen</b> (about 78%) and <b>oxygen</b> (about 21%), with small amounts of other gases.' }),

  makeMCQ({ id:'g3ssee-air-002', chapterId:'g3ssee-air', difficulty:1, subsection:'properties_air',
    question:'Can we SEE air?',
    options:['No, air is invisible','Yes, air is blue','Yes, air glows in the dark','No, air is always black'],
    answer:'No, air is invisible',
    hint:'Look around you — you can\'t see what you\'re breathing.',
    explanation:'<b>Air is invisible</b> — we cannot see it, but we can feel it when it moves (as wind) and we know it is there because we breathe it.' }),

  makeTF({ id:'g3ssee-air-003', chapterId:'g3ssee-air', difficulty:1, subsection:'properties_air',
    question:'Air takes up space.',
    answer:true,
    explanation:'Yes! <b>Air takes up space</b>. When you blow up a balloon, air fills the space inside. A fully inflated balloon is proof that air occupies space.' }),

  makeMCQ({ id:'g3ssee-air-004', chapterId:'g3ssee-air', difficulty:1, subsection:'properties_air',
    question:'Which experiment proves that AIR TAKES UP SPACE?',
    options:['Pushing a balloon into a bottle and trying to blow it up','Putting ice in water','Boiling water on a stove','Mixing sugar in water'],
    answer:'Pushing a balloon into a bottle and trying to blow it up',
    hint:'If air is already filling the space, you cannot add more.',
    explanation:'If you push a balloon into a bottle and try to blow it up, the air already in the bottle prevents the balloon from inflating fully — proving that <b>air takes up space</b>.' }),

  makeMCQ({ id:'g3ssee-air-005', chapterId:'g3ssee-air', difficulty:2, subsection:'properties_air',
    question:'What happens when you press air into a smaller container (compress it)?',
    options:['The air is squeezed into a smaller space — it can be compressed','The air disappears','The air turns into water','The air becomes heavier and falls to the ground'],
    answer:'The air is squeezed into a smaller space — it can be compressed',
    hint:'Think of pumping up a bicycle tyre.',
    explanation:'Air can be <b>compressed</b> — squeezed into a smaller space. A bicycle pump compresses air into the tyre, increasing the pressure.' }),

  makeMCQ({ id:'g3ssee-air-006', chapterId:'g3ssee-air', difficulty:2, subsection:'properties_air',
    question:'What is WIND?',
    options:['Moving air','Hot water vapour','A type of rain','A solid substance'],
    answer:'Moving air',
    hint:'Think about what makes a kite fly.',
    explanation:'<b>Wind</b> is moving air. When air moves from one place to another — due to differences in air pressure — we feel it as wind.' }),

  makeTF({ id:'g3ssee-air-007', chapterId:'g3ssee-air', difficulty:1, subsection:'properties_air',
    question:'Air has weight.',
    answer:true,
    explanation:'Yes! <b>Air has weight</b> — it is pulled down by gravity like everything else. A ball inflated with air is slightly heavier than the same flat ball.' }),

  makeMCQ({ id:'g3ssee-air-008', chapterId:'g3ssee-air', difficulty:2, subsection:'properties_air',
    question:'How can we feel air even though we cannot see it?',
    options:['By feeling wind on our skin or watching leaves move in the breeze','By tasting it','By smelling it directly','By holding it in our hand'],
    answer:'By feeling wind on our skin or watching leaves move in the breeze',
    hint:'We feel air when it moves.',
    explanation:'We can detect air by feeling the <b>wind on our skin</b> or by observing its effects — leaves moving, kites flying, flags waving in the breeze.' }),

  makeMCQ({ id:'g3ssee-air-009', chapterId:'g3ssee-air', difficulty:2, subsection:'properties_air',
    question:'A diving tank holds compressed air. Why can a diver stay underwater for a long time?',
    options:['Compressed air holds more oxygen in a smaller space, giving a longer supply','Compressed air is heavier and sinks','Compressed air makes the water cleaner','Compressed air helps fish breathe'],
    answer:'Compressed air holds more oxygen in a smaller space, giving a longer supply',
    explanation:'A diving tank <b>compresses air</b> so that more oxygen fits into the tank. This gives the diver a larger supply of air to breathe underwater.' }),

  makeMCQ({ id:'g3ssee-air-010', chapterId:'g3ssee-air', difficulty:1, subsection:'properties_air',
    question:'Air pressure is the weight of air pushing on ___.',
    options:['Everything it surrounds, including us','Only water','Only metal objects','Only clouds'],
    answer:'Everything it surrounds, including us',
    hint:'Air is all around us and above us.',
    explanation:'<b>Air pressure</b> is the force exerted by the weight of air on everything it surrounds — including the ground, water and our bodies.' }),

  makeMCQ({ id:'g3ssee-air-011', chapterId:'g3ssee-air', difficulty:3, subsection:'properties_air',
    question:'A pupil fills a sealed plastic bag with air and squeezes it. What does she observe?',
    options:['The bag resists being squeezed because air inside is being compressed','The bag gets lighter','The air escapes immediately','The bag deflates instantly'],
    answer:'The bag resists being squeezed because air inside is being compressed',
    hint:'Consider what happens to the air molecules when you squeeze.',
    explanation:'The sealed bag resists squeezing because the air inside is being <b>compressed</b> — the air molecules are being pushed closer together and they push back.' }),

  makeMCQ({ id:'g3ssee-air-012', chapterId:'g3ssee-air', difficulty:1, subsection:'properties_air',
    question:'Which of the following is a PROPERTY of air?',
    options:['Air takes up space','Air is yellow in colour','Air is always warm','Air is a liquid'],
    answer:'Air takes up space',
    explanation:'A key <b>property of air</b> is that it takes up space. Air is also invisible, a mixture of gases, has weight and can be compressed.' }),

  makeMCQ({ id:'g3ssee-air-013', chapterId:'g3ssee-air', difficulty:2, subsection:'properties_air',
    question:'Why does a flat tyre make cycling difficult?',
    options:['The tyre has lost the compressed air that gives it shape and cushioning','The tyre has become too heavy','The tyre has filled with water','The wheel has broken'],
    answer:'The tyre has lost the compressed air that gives it shape and cushioning',
    explanation:'A <b>flat tyre</b> has lost its compressed air. Without air, the tyre cannot keep its round shape or cushion the ride, making cycling difficult and slow.' }),

  makeTF({ id:'g3ssee-air-014', chapterId:'g3ssee-air', difficulty:1, subsection:'properties_air',
    question:'Both animals and plants need air to survive.',
    answer:true,
    explanation:'Yes! Animals need <b>oxygen</b> (from air) to breathe; plants need <b>carbon dioxide</b> (from air) for photosynthesis. All living things depend on air.' }),

  makeMCQ({ id:'g3ssee-air-015', chapterId:'g3ssee-air', difficulty:2, subsection:'properties_air',
    question:'What does a weather vane (girouette) measure?',
    options:['Wind direction','Rainfall','Temperature','Air pressure'],
    answer:'Wind direction',
    explanation:'A <b>weather vane (girouette)</b> shows which direction the wind is blowing from. It turns to point into the wind.' }),

// ── uses_of_air (016-045) ──────────────────────────────────────────────────

  makeMCQ({ id:'g3ssee-air-016', chapterId:'g3ssee-air', difficulty:1, subsection:'uses_of_air',
    question:'What is the MAIN use of air for humans?',
    options:['Breathing (respiration)','Cooking food','Washing clothes','Building houses'],
    answer:'Breathing (respiration)',
    hint:'Without this, we cannot survive more than a few minutes.',
    explanation:'The main use of air for humans is <b>breathing (respiration)</b> — we inhale oxygen from air and exhale carbon dioxide.' }),

  makeMCQ({ id:'g3ssee-air-017', chapterId:'g3ssee-air', difficulty:1, subsection:'uses_of_air',
    question:'Windmills use _____ to generate electricity or grind grain.',
    options:['Wind (moving air)','Water','Fire','Sunlight alone'],
    answer:'Wind (moving air)',
    hint:'Moving air makes the blades of a windmill turn.',
    explanation:'Windmills use <b>wind (moving air)</b> to turn their blades. This rotational energy can grind grain or generate electricity (in wind turbines).' }),

  makeTF({ id:'g3ssee-air-018', chapterId:'g3ssee-air', difficulty:1, subsection:'uses_of_air',
    question:'Air is used to inflate tyres on cars and bicycles.',
    answer:true,
    explanation:'Yes! <b>Compressed air</b> is pumped into tyres on cars, bicycles and other vehicles to keep them round, firm and safe to use.' }),

  makeMCQ({ id:'g3ssee-air-019', chapterId:'g3ssee-air', difficulty:2, subsection:'uses_of_air',
    question:'Hot air balloons use heated air to fly. Why does heating air help a balloon rise?',
    options:['Hot air is lighter than cool air, so it rises','Hot air is heavier and sinks','Hot air turns into water and floats','Hot air smells nice and attracts birds to lift it'],
    answer:'Hot air is lighter than cool air, so it rises',
    hint:'Think about why warm things rise.',
    explanation:'<b>Hot air is less dense (lighter) than cool air</b> — it rises. A hot air balloon rises because the heated air inside is lighter than the cooler air outside.' }),

  makeMCQ({ id:'g3ssee-air-020', chapterId:'g3ssee-air', difficulty:1, subsection:'uses_of_air',
    question:'How does a kite fly in the air?',
    options:['Moving air (wind) pushes against the kite surface and lifts it','The string pulls it up','The sun melts the kite string','The kite is made of very heavy material'],
    answer:'Moving air (wind) pushes against the kite surface and lifts it',
    explanation:'A kite flies because <b>wind (moving air) pushes against its surface</b>, providing lift. Without wind, a kite cannot fly.' }),

  makeMCQ({ id:'g3ssee-air-021', chapterId:'g3ssee-air', difficulty:2, subsection:'uses_of_air',
    question:'Which of the following uses air pressure to work?',
    options:['A bicycle pump','A hammer','A paintbrush','A pencil'],
    answer:'A bicycle pump',
    hint:'This device compresses air into a small space.',
    explanation:'A <b>bicycle pump</b> uses air pressure — it compresses air and forces it through the valve into the tyre, increasing the tyre\'s air pressure.' }),

  makeMCQ({ id:'g3ssee-air-022', chapterId:'g3ssee-air', difficulty:1, subsection:'uses_of_air',
    question:'Birds and aeroplanes use _____ to fly.',
    options:['Air (the lift it provides)','Water','Fire','Sunlight'],
    answer:'Air (the lift it provides)',
    explanation:'Birds and aeroplanes rely on <b>air</b> — the shape of wings creates lift by using differences in air pressure above and below the wing.' }),

  makeTF({ id:'g3ssee-air-023', chapterId:'g3ssee-air', difficulty:1, subsection:'uses_of_air',
    question:'Fish need air to breathe, just like humans.',
    answer:false,
    explanation:'Fish breathe <b>oxygen dissolved in water</b> using gills — not the same as breathing air directly like humans do. However, fish still need oxygen from the air that dissolves into water.' }),

  makeMCQ({ id:'g3ssee-air-024', chapterId:'g3ssee-air', difficulty:2, subsection:'uses_of_air',
    question:'In Mauritius, sugar cane fields use _____ to spread seeds of some weeds.',
    options:['Wind','Fire','Water alone','Robots'],
    answer:'Wind',
    hint:'Wind can carry light seeds over long distances.',
    explanation:'<b>Wind</b> disperses the light seeds of many plants (including weeds) over long distances — a use of moving air in nature.' }),

  makeMCQ({ id:'g3ssee-air-025', chapterId:'g3ssee-air', difficulty:3, subsection:'uses_of_air',
    question:'An astronaut on the Moon needs a spacesuit with an oxygen supply. Why?',
    options:['The Moon has no atmosphere with breathable air','The Moon is too cold for clothes','The Moon has too much oxygen','The Moon\'s gravity is too strong'],
    answer:'The Moon has no atmosphere with breathable air',
    hint:'What is different about the Moon\'s environment compared to Earth?',
    explanation:'The Moon has <b>no atmosphere</b> — there is no air to breathe. An astronaut must carry their own supply of oxygen in their spacesuit to survive.' }),

// ── air_pollution (026-075) ───────────────────────────────────────────────

  makeMCQ({ id:'g3ssee-air-026', chapterId:'g3ssee-air', difficulty:1, subsection:'air_pollution',
    question:'What is AIR POLLUTION?',
    options:['The presence of harmful substances in the air','A strong wind','A type of weather','The movement of clouds'],
    answer:'The presence of harmful substances in the air',
    hint:'When something bad gets into the air, it pollutes it.',
    explanation:'<b>Air pollution</b> occurs when harmful substances — such as smoke, fumes and dust — are released into the air, making it unhealthy to breathe.' }),

  makeMCQ({ id:'g3ssee-air-027', chapterId:'g3ssee-air', difficulty:1, subsection:'air_pollution',
    question:'Which of the following CAUSES air pollution?',
    options:['Car exhaust fumes','Planting flowers','Riding a bicycle','Watering plants'],
    answer:'Car exhaust fumes',
    hint:'This comes out of a car\'s exhaust pipe.',
    explanation:'<b>Car exhaust fumes</b> contain harmful gases (such as carbon monoxide and nitrogen dioxide) that pollute the air and damage health.' }),

  makeTF({ id:'g3ssee-air-028', chapterId:'g3ssee-air', difficulty:1, subsection:'air_pollution',
    question:'Burning plastic releases toxic gases that pollute the air.',
    answer:true,
    explanation:'Yes! <b>Burning plastic</b> releases toxic gases and particles into the air, causing air pollution that is harmful to health and the environment.' }),

  makeMCQ({ id:'g3ssee-air-029', chapterId:'g3ssee-air', difficulty:2, subsection:'air_pollution',
    question:'Which of the following is a HEALTH EFFECT of breathing polluted air?',
    options:['Coughing, difficulty breathing and lung problems','Better eyesight','Faster running','Improved hearing'],
    answer:'Coughing, difficulty breathing and lung problems',
    hint:'Think about how your body reacts to smoke.',
    explanation:'Breathing polluted air can cause <b>coughing, asthma attacks, difficulty breathing and long-term lung problems</b> such as respiratory disease.' }),

  makeMCQ({ id:'g3ssee-air-030', chapterId:'g3ssee-air', difficulty:2, subsection:'air_pollution',
    question:'How do TREES help reduce air pollution?',
    options:['They absorb carbon dioxide and release oxygen, improving air quality','They produce more smoke to cover the pollution','They blow the pollution away with their leaves','They burn car fumes'],
    answer:'They absorb carbon dioxide and release oxygen, improving air quality',
    hint:'Trees use carbon dioxide for photosynthesis.',
    explanation:'<b>Trees</b> help reduce air pollution by absorbing carbon dioxide (a greenhouse gas) and releasing clean oxygen through photosynthesis, improving air quality.' }),

  makeMCQ({ id:'g3ssee-air-031', chapterId:'g3ssee-air', difficulty:1, subsection:'air_pollution',
    question:'In Mauritius, sugar cane fields are sometimes BURNT after harvest. What does this cause?',
    options:['Air pollution from smoke and ash','Clean fresh air','More rain','Healthier soil only'],
    answer:'Air pollution from smoke and ash',
    hint:'Burning releases smoke.',
    explanation:'Burning sugar cane fields releases <b>smoke and ash</b> into the air, causing air pollution — this is a known environmental concern in Mauritius.' }),

  makeMCQ({ id:'g3ssee-air-032', chapterId:'g3ssee-air', difficulty:2, subsection:'air_pollution',
    question:'Which of the following actions would REDUCE air pollution in Mauritius?',
    options:['Using buses or bicycles instead of cars','Burning more rubbish','Using more diesel generators','Cutting down more trees'],
    answer:'Using buses or bicycles instead of cars',
    hint:'Fewer vehicles burning fuel = less exhaust fumes.',
    explanation:'Using <b>public transport or bicycles</b> reduces the number of cars on the road, decreasing exhaust fumes and air pollution.' }),

  makeTF({ id:'g3ssee-air-033', chapterId:'g3ssee-air', difficulty:1, subsection:'air_pollution',
    question:'Factory smoke is a cause of air pollution.',
    answer:true,
    explanation:'Yes! <b>Factory smoke</b> (from burning fossil fuels and industrial processes) releases harmful gases and particles that pollute the air.' }),

  makeMCQ({ id:'g3ssee-air-034', chapterId:'g3ssee-air', difficulty:2, subsection:'air_pollution',
    question:'Which gas released by cars and factories contributes to GLOBAL WARMING?',
    options:['Carbon dioxide','Oxygen','Nitrogen','Argon'],
    answer:'Carbon dioxide',
    hint:'This gas is produced when fossil fuels are burned.',
    explanation:'<b>Carbon dioxide (CO₂)</b> is a greenhouse gas produced when fossil fuels (petrol, coal, gas) are burned. It traps heat in the atmosphere, contributing to global warming.' }),

  makeMCQ({ id:'g3ssee-air-035', chapterId:'g3ssee-air', difficulty:3, subsection:'air_pollution',
    question:'A child in Port Louis notices that the air smells of fumes during rush hour traffic. What is the most likely cause?',
    options:['Many cars and buses burning fuel and releasing exhaust gases','A strong sea breeze from the ocean','Trees releasing pollen','A rainstorm nearby'],
    answer:'Many cars and buses burning fuel and releasing exhaust gases',
    explanation:'During rush hour, many vehicles are on the road. <b>Car and bus exhaust fumes</b> contain harmful gases that cause the air to smell bad and pollute the environment.' }),

  makeMCQ({ id:'g3ssee-air-036', chapterId:'g3ssee-air', difficulty:2, subsection:'air_pollution',
    question:'What can we do at home to reduce air pollution?',
    options:['Save electricity by turning off lights and avoiding burning rubbish','Buy more plastic products','Use more air fresheners','Leave all windows closed all day'],
    answer:'Save electricity by turning off lights and avoiding burning rubbish',
    hint:'Less electricity use = less fuel burned at power stations.',
    explanation:'<b>Saving electricity</b> reduces the need for power stations to burn fuel (reducing CO₂ output). <b>Not burning rubbish</b> prevents toxic smoke from entering the air.' }),

  makeTF({ id:'g3ssee-air-037', chapterId:'g3ssee-air', difficulty:1, subsection:'air_pollution',
    question:'Air pollution only affects humans and not animals or plants.',
    answer:false,
    explanation:'Air pollution affects <b>all living things</b> — animals can develop respiratory problems, and plants may suffer damage to their leaves and reduced growth.' }),

  makeMCQ({ id:'g3ssee-air-038', chapterId:'g3ssee-air', difficulty:2, subsection:'air_pollution',
    question:'The use of solar panels in Mauritius helps to reduce air pollution because ___.',
    options:['Solar panels generate electricity without burning fuel','Solar panels produce exhaust gases','Solar panels release oxygen','Solar panels cool the air directly'],
    answer:'Solar panels generate electricity without burning fuel',
    hint:'Solar panels use sunlight, not fuel.',
    explanation:'<b>Solar panels</b> convert sunlight into electricity without burning any fuel, so they do not produce exhaust gases or air pollution.' }),

  makeMCQ({ id:'g3ssee-air-039', chapterId:'g3ssee-air', difficulty:1, subsection:'air_pollution',
    question:'Why should we never burn plastic, rubber or household waste in the garden?',
    options:['It releases poisonous gases and black smoke that pollute the air','It makes the garden cleaner','It is a good way to get rid of all waste','It helps plants grow better'],
    answer:'It releases poisonous gases and black smoke that pollute the air',
    explanation:'Burning plastic, rubber and household waste releases <b>poisonous gases and black smoke</b> that pollute the air and harm the health of everyone nearby.' }),

  makeMCQ({ id:'g3ssee-air-040', chapterId:'g3ssee-air', difficulty:3, subsection:'air_pollution',
    question:'Two neighbourhoods in Mauritius are compared. Neighbourhood A has many trees and parks; Neighbourhood B has many factories and busy roads. Which neighbourhood is likely to have CLEANER air?',
    options:['Neighbourhood A — trees absorb CO₂ and there are fewer pollution sources','Neighbourhood B — factories produce clean oxygen','Both will have equally clean air','Neither will have any clean air'],
    answer:'Neighbourhood A — trees absorb CO₂ and there are fewer pollution sources',
    hint:'Think about both sources of pollution and natural air cleaners.',
    explanation:'<b>Neighbourhood A</b> will have cleaner air because trees absorb carbon dioxide and other pollutants, AND there are fewer factories and vehicles releasing exhaust fumes.' })

);

})();
