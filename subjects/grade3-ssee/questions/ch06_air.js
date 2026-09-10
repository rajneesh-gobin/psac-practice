'use strict';
(function () {

// Grade 3 SSEE — Unit 6: Air Around Us
// Source: MIE SSEE Grade 3 Part 2 pp.33-61
// IDs: g3ssee-air-001 onwards

// ── properties_air (001-030) ──────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g3ssee-air-001', chapterId:'g3ssee-air', difficulty:1, subsection:'properties_air',
    question:'What is AIR made of?',
    options:['A mixture of many gases','Only pure oxygen gas','Only warm water vapour','Only carbon dioxide gas'],
    answer:'A mixture of many gases',
    hint:'We breathe a mixture of gases.',
    explanation:'Air is a <b>mixture of gases</b> — mostly nitrogen (about 78%) and oxygen (about 21%), with small amounts of others including carbon dioxide and water vapour.'}),

  makeMCQ({ id:'g3ssee-air-002', chapterId:'g3ssee-air', difficulty:1, subsection:'properties_air',
    question:'Can we SEE air?',
    options:['No, air is invisible','Yes, air glows red','Yes, air looks blue','No, air is jet black'],
    answer:'No, air is invisible',
    hint:'Look around you — you can\'t see what you\'re breathing.',
    explanation:'Air is <b>invisible</b> — we cannot see it, but we feel it when it moves as wind and we know it is there because we breathe it.'}),

  makeTF({ id:'g3ssee-air-003', chapterId:'g3ssee-air', difficulty:1, subsection:'properties_air',
    question:'Air takes up space.',
    answer:true,
    explanation:'Yes! <b>Air takes up space</b>. When you blow up a balloon, air fills the space inside. A fully inflated balloon is proof that air occupies space.' }),

  makeMCQ({ id:'g3ssee-air-004', chapterId:'g3ssee-air', difficulty:1, subsection:'properties_air',
    question:'Which experiment proves that AIR TAKES UP SPACE?',
    options:['Blowing up a balloon inside a bottle','Putting some ice cubes into cold water','Mixing spoons of sugar into warm water','Boiling a pan of water on a hot stove'],
    answer:'Blowing up a balloon inside a bottle',
    hint:'If air is already filling the space, you cannot add more.',
    explanation:'Push a balloon into a bottle and try to blow it up: the air already inside the bottle is in the way, so the balloon cannot inflate. That proves <b>air takes up space</b>.'}),

  makeMCQ({ id:'g3ssee-air-005', chapterId:'g3ssee-air', difficulty:2, subsection:'properties_air',
    question:'What happens when you press air into a smaller container (compress it)?',
    options:['It is squeezed into a smaller space','It disappears completely from view','It turns into drops of cold water','It becomes heavier and falls down'],
    answer:'It is squeezed into a smaller space',
    hint:'Think of pumping up a bicycle tyre.',
    explanation:'Air can be <b>compressed</b> — squeezed into a smaller space. A bicycle pump does exactly this, forcing air into the tyre and raising the pressure.'}),

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
    options:['By feeling the wind on our skin','By holding some of it in our hand','By smelling it inside the room','By tasting it on our own tongue'],
    answer:'By feeling the wind on our skin',
    hint:'We feel air when it moves.',
    explanation:'We detect air by <b>feeling the wind</b> on our skin and by watching what it does — leaves moving, kites flying, flags waving. Air has no taste and no smell, and you cannot hold it in your hand.'}),

  makeMCQ({ id:'g3ssee-air-009', chapterId:'g3ssee-air', difficulty:2, subsection:'properties_air',
    question:'A diving tank holds compressed air. Why can a diver stay underwater for a long time?',
    options:['Compressed air holds more oxygen in the tank','Compressed air is heavier and so it sinks','Compressed air helps the fish to breathe','Compressed air makes the water much cleaner'],
    answer:'Compressed air holds more oxygen in the tank',
    explanation:'Squeezing air into the tank packs <b>more oxygen into a smaller space</b>, so the diver carries a bigger supply and can stay under water for longer.'}),

  makeMCQ({ id:'g3ssee-air-010', chapterId:'g3ssee-air', difficulty:1, subsection:'properties_air',
    question:'Air pressure is the weight of air pushing on ___.',
    options:['Everything around it, including us','Only the clouds high up in the sky','Only the water in the deep blue sea','Only the objects that are made of metal'],
    answer:'Everything around it, including us',
    hint:'Air is all around us and above us.',
    explanation:'Air pressure is the force of the weight of air pressing on <b>everything it surrounds</b> — the ground, the sea, buildings and our own bodies.'}),

  makeMCQ({ id:'g3ssee-air-011', chapterId:'g3ssee-air', difficulty:3, subsection:'properties_air',
    question:'A pupil fills a sealed plastic bag with air and squeezes it. What does she observe?',
    options:['The bag pushes back as air is squeezed','The bag goes flat again almost at once','The air escapes out through the plastic','The bag becomes much lighter to hold'],
    answer:'The bag pushes back as air is squeezed',
    hint:'Consider what happens to the air molecules when you squeeze.',
    explanation:'The sealed bag <b>resists</b> being squeezed because the air inside is being compressed — the particles are pushed closer together and push back.'}),

  makeMCQ({ id:'g3ssee-air-012', chapterId:'g3ssee-air', difficulty:1, subsection:'properties_air',
    question:'Which of the following is a PROPERTY of air?',
    options:['Air takes up space','Air is a liquid','Air is always warm','Air is bright yellow'],
    answer:'Air takes up space',
    explanation:'A key property of air is that it <b>takes up space</b>. Air is also invisible, colourless, a mixture of gases, and it can be compressed. It is a gas, not a liquid.'}),

  makeMCQ({ id:'g3ssee-air-013', chapterId:'g3ssee-air', difficulty:2, subsection:'properties_air',
    question:'Why does a flat tyre make cycling difficult?',
    options:['The tyre has lost its compressed air','The tyre has become far too heavy now','The tyre has filled up with rain water','The wheel itself has been badly broken'],
    answer:'The tyre has lost its compressed air',
    explanation:'A flat tyre has lost its <b>compressed air</b>, so it can no longer keep its round shape or cushion the ride. That makes cycling slow and hard.'}),

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
    options:['Breathing in and out','Cooking a hot meal','Building a new house','Washing dirty clothes'],
    answer:'Breathing in and out',
    hint:'Without this, we cannot survive more than a few minutes.',
    explanation:'The main use of air is <b>breathing</b> (respiration) — we take in oxygen and breathe out carbon dioxide.'}),

  makeMCQ({ id:'g3ssee-air-017', chapterId:'g3ssee-air', difficulty:1, subsection:'uses_of_air',
    question:'Windmills use _____ to generate electricity or grind grain.',
    options:['Wind (moving air)','Sunlight on its own','Fast-running water','Burning wood fire'],
    answer:'Wind (moving air)',
    hint:'Moving air makes the blades of a windmill turn.',
    explanation:'A windmill uses <b>wind</b> — moving air — to turn its blades, and that turning can grind grain or drive a generator.'}),

  makeTF({ id:'g3ssee-air-018', chapterId:'g3ssee-air', difficulty:1, subsection:'uses_of_air',
    question:'Air is used to inflate tyres on cars and bicycles.',
    answer:true,
    explanation:'Yes! <b>Compressed air</b> is pumped into tyres on cars, bicycles and other vehicles to keep them round, firm and safe to use.' }),

  makeMCQ({ id:'g3ssee-air-019', chapterId:'g3ssee-air', difficulty:2, subsection:'uses_of_air',
    question:'Hot air balloons use heated air to fly. Why does heating air help a balloon rise?',
    options:['Hot air is lighter than cool air','Hot air is heavier and so it sinks','Hot air turns into water and floats','Hot air smells nice and attracts birds'],
    answer:'Hot air is lighter than cool air',
    hint:'Think about why warm things rise.',
    explanation:'Hot air is <b>less dense (lighter)</b> than the cooler air around it, so it rises — and it carries the balloon up with it.'}),

  makeMCQ({ id:'g3ssee-air-020', chapterId:'g3ssee-air', difficulty:1, subsection:'uses_of_air',
    question:'How does a kite fly in the air?',
    options:['Moving air pushes against the kite','The string alone pulls the kite up','The kite is made of heavy material','The sun melts the string of the kite'],
    answer:'Moving air pushes against the kite',
    explanation:'A kite flies because <b>moving air (wind)</b> pushes against its surface and lifts it. Without wind a kite will not fly, however hard you pull the string.'}),

  makeMCQ({ id:'g3ssee-air-021', chapterId:'g3ssee-air', difficulty:2, subsection:'uses_of_air',
    question:'Which of the following uses air pressure to work?',
    options:['A bicycle pump','A hammer','A paintbrush','A pencil'],
    answer:'A bicycle pump',
    hint:'This device compresses air into a small space.',
    explanation:'A <b>bicycle pump</b> uses air pressure — it compresses air and forces it through the valve into the tyre, increasing the tyre\'s air pressure.' }),

  makeMCQ({ id:'g3ssee-air-022', chapterId:'g3ssee-air', difficulty:1, subsection:'uses_of_air',
    question:'Birds and aeroplanes use _____ to fly.',
    options:['Air','Water','Fire','Sunlight'],
    answer:'Air',
    explanation:'Birds and aeroplanes fly on <b>air</b>: the shape of a wing makes the air pressure below it greater than above it, and that difference gives lift.'}),

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
    options:['The Moon has no air to breathe','The Moon is far too cold for clothes','The gravity on the Moon is too strong','The Moon has far too much oxygen'],
    answer:'The Moon has no air to breathe',
    hint:'What is different about the Moon\'s environment compared to Earth?',
    explanation:'The Moon has <b>no atmosphere</b>, so there is no air to breathe. An astronaut must carry their own supply of oxygen inside the spacesuit.'}),

// ── air_pollution (026-075) ───────────────────────────────────────────────

  makeMCQ({ id:'g3ssee-air-026', chapterId:'g3ssee-air', difficulty:1, subsection:'air_pollution',
    question:'What is AIR POLLUTION?',
    options:['Harmful substances in the air','The slow movement of the clouds','A very strong wind from the sea','A type of wet, rainy weather'],
    answer:'Harmful substances in the air',
    hint:'When something bad gets into the air, it pollutes it.',
    explanation:'<b>Air pollution</b> is harmful substances — smoke, fumes, dust — released into the air, making it unhealthy to breathe. Wind, clouds and rain are ordinary weather.'}),

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
    options:['Coughing and trouble breathing','Hearing that becomes sharper','Eyesight that becomes better','Running that becomes faster'],
    answer:'Coughing and trouble breathing',
    hint:'Think about how your body reacts to smoke.',
    explanation:'Breathing polluted air causes <b>coughing, asthma attacks and difficulty breathing</b>, and over the years it can damage the lungs. It never improves hearing, sight or fitness.'}),

  makeMCQ({ id:'g3ssee-air-030', chapterId:'g3ssee-air', difficulty:2, subsection:'air_pollution',
    question:'How do TREES help reduce air pollution?',
    options:['They take in carbon dioxide and give out oxygen','They make more smoke to hide the pollution','They blow the pollution away with their leaves','They burn up the car fumes in their branches'],
    answer:'They take in carbon dioxide and give out oxygen',
    hint:'Trees use carbon dioxide for photosynthesis.',
    explanation:'Through photosynthesis, trees <b>absorb carbon dioxide</b> and <b>release oxygen</b>, and their leaves also trap dust. That improves the air quality.'}),

  makeMCQ({ id:'g3ssee-air-031', chapterId:'g3ssee-air', difficulty:1, subsection:'air_pollution',
    question:'In Mauritius, sugar cane fields are sometimes BURNT after harvest. What does this cause?',
    options:['Air pollution from smoke','Healthier soil for cane','Cleaner and fresher air','More rain in the area'],
    answer:'Air pollution from smoke',
    hint:'Burning releases smoke.',
    explanation:'Burning cane fields sends smoke and ash into the air, causing <b>air pollution</b> — a known environmental concern in Mauritius. It does not clean the air, improve the soil or bring rain.'}),

  makeMCQ({ id:'g3ssee-air-032', chapterId:'g3ssee-air', difficulty:2, subsection:'air_pollution',
    question:'Which of the following actions would REDUCE air pollution in Mauritius?',
    options:['Using buses instead of cars','Using more diesel generators','Burning much more rubbish','Cutting down many more trees'],
    answer:'Using buses instead of cars',
    hint:'Fewer vehicles burning fuel = less exhaust fumes.',
    explanation:'Taking a <b>bus or a bicycle</b> instead of driving puts fewer cars on the road, so fewer exhaust fumes reach the air. Diesel generators, burning rubbish and felling trees all make pollution worse.'}),

  makeTF({ id:'g3ssee-air-033', chapterId:'g3ssee-air', difficulty:1, subsection:'air_pollution',
    question:'Factory smoke is a cause of air pollution.',
    answer:true,
    explanation:'Yes! <b>Factory smoke</b> (from burning fossil fuels and industrial processes) releases harmful gases and particles that pollute the air.' }),

  makeMCQ({ id:'g3ssee-air-034', chapterId:'g3ssee-air', difficulty:2, subsection:'air_pollution',
    question:'Which gas released by cars and factories contributes to GLOBAL WARMING?',
    options:['Carbon dioxide','Pure nitrogen','Pure oxygen','Argon gas'],
    answer:'Carbon dioxide',
    hint:'This gas is produced when fossil fuels are burned.',
    explanation:'<b>Carbon dioxide</b> is released when petrol, coal and gas are burned. It traps heat in the atmosphere and so contributes to global warming.'}),

  makeMCQ({ id:'g3ssee-air-035', chapterId:'g3ssee-air', difficulty:3, subsection:'air_pollution',
    question:'A child in Port Louis notices that the air smells of fumes during rush hour traffic. What is the most likely cause?',
    options:['Many cars and buses burning fuel','A heavy rainstorm somewhere near','A strong sea breeze off the ocean','Trees in the street releasing pollen'],
    answer:'Many cars and buses burning fuel',
    explanation:'At rush hour hundreds of vehicles are on the road, and their <b>exhaust fumes</b> contain gases that smell and pollute. Rain, sea breezes and pollen do not smell of fumes.'}),

  makeMCQ({ id:'g3ssee-air-036', chapterId:'g3ssee-air', difficulty:2, subsection:'air_pollution',
    question:'What can we do at home to reduce air pollution?',
    options:['Save electricity and never burn rubbish','Use many more air fresheners at home','Keep all of the windows closed all day','Buy many more new plastic products'],
    answer:'Save electricity and never burn rubbish',
    hint:'Less electricity use = less fuel burned at power stations.',
    explanation:'Using less electricity means power stations burn less fuel, and never burning rubbish keeps toxic smoke out of the air. Air fresheners, closed windows and more plastic do not help.'}),

  makeTF({ id:'g3ssee-air-037', chapterId:'g3ssee-air', difficulty:1, subsection:'air_pollution',
    question:'Air pollution only affects humans and not animals or plants.',
    answer:false,
    explanation:'Air pollution affects <b>all living things</b> — animals can develop respiratory problems, and plants may suffer damage to their leaves and reduced growth.' }),

  makeMCQ({ id:'g3ssee-air-038', chapterId:'g3ssee-air', difficulty:2, subsection:'air_pollution',
    question:'The use of solar panels in Mauritius helps to reduce air pollution because ___.',
    options:['They make electricity without burning fuel','They release fresh oxygen into the open air','They produce exhaust gases as they work','They cool the air all around them directly'],
    answer:'They make electricity without burning fuel',
    hint:'Solar panels use sunlight, not fuel.',
    explanation:'Solar panels turn sunlight straight into electricity, <b>burning no fuel at all</b>, so they give off no exhaust gases and no smoke.'}),

  makeMCQ({ id:'g3ssee-air-039', chapterId:'g3ssee-air', difficulty:1, subsection:'air_pollution',
    question:'Why should we never burn plastic, rubber or household waste in the garden?',
    options:['It releases poisonous gases and smoke','It makes the whole garden much cleaner','It helps the young plants to grow better','It is a very good way to clear the waste'],
    answer:'It releases poisonous gases and smoke',
    explanation:'Burning plastic, rubber and household waste gives off <b>poisonous gases and black smoke</b> that pollute the air and harm the health of everyone nearby.'}),

  makeMCQ({ id:'g3ssee-air-040', chapterId:'g3ssee-air', difficulty:3, subsection:'air_pollution',
    question:'Two neighbourhoods in Mauritius are compared. Neighbourhood A has many trees and parks; Neighbourhood B has many factories and busy roads. Which neighbourhood is likely to have CLEANER air?',
    options:['Neighbourhood A — trees and fewer fumes','Neighbourhood B — factories make oxygen','Both will have exactly the same clean air','Neither of them will have any clean air'],
    answer:'Neighbourhood A — trees and fewer fumes',
    hint:'Think about both sources of pollution and natural air cleaners.',
    explanation:'Neighbourhood <b>A</b> has cleaner air: its trees absorb carbon dioxide and trap dust, and there are far fewer factories and vehicles releasing fumes. Factories do not make oxygen.'})

);

})();
