'use strict';
// Grade 3 History & Geography — top-up to reach 20 per subsection.
// ch02 (loc): buildings_places +3 (053-055), changes_locality +3 (056-058), preserving_heritage +2 (059-060)
// ch03 (nat): natural_features +3 (055-057), man_made_features +7 (058-064)
// ch04 (wea): weather_types +3 (054-056), weather_effects +3 (057-059), weather_safety +1 (060)
// ch05 (map): map_features +3 (054-056), natural_landmarks +3 (057-059), safety_outdoors +1 (060)

(function () {

// ── ch02 my locality ─────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g3hi-loc-053', chapterId:'g3hi-my-locality', difficulty:1, subsection:'buildings_places',
    question:'What do we call the building where people borrow books to read?',
    options:['library','temple','market','hospital'],
    answer:'library',
    hint:'You go here to borrow books for free.',
    explanation:'A <b>library</b> is a building where you can borrow books to read.' }),

  makeMCQ({ id:'g3hi-loc-054', chapterId:'g3hi-my-locality', difficulty:1, subsection:'buildings_places',
    question:'Which building in your locality helps you send letters?',
    options:['post office','school','clinic','bank'],
    answer:'post office',
    hint:'You go here to send parcels and letters to other people.',
    explanation:'A <b>post office</b> is where you go to send or receive letters and parcels.' }),

  makeMCQ({ id:'g3hi-loc-055', chapterId:'g3hi-my-locality', difficulty:1, subsection:'buildings_places',
    question:'A police station is a building where ___.',
    options:['police officers work and keep people safe','people buy food','children learn','sick people are treated'],
    answer:'police officers work and keep people safe',
    hint:'The police keep us safe. Where do they work?',
    explanation:'A <b>police station</b> is where police officers work to keep the community safe.' }),

  makeMCQ({ id:'g3hi-loc-056', chapterId:'g3hi-my-locality', difficulty:1, subsection:'changes_locality',
    question:'Long ago, people lit their homes with ___.',
    options:['oil lamps and candles','electric lights','solar panels','computers'],
    answer:'oil lamps and candles',
    hint:'Before electricity, what did people use to get light at night?',
    explanation:'Before electricity, people used <b>oil lamps and candles</b> to light their homes.' }),

  makeMCQ({ id:'g3hi-loc-057', chapterId:'g3hi-my-locality', difficulty:1, subsection:'changes_locality',
    question:'Which of these is a NEW way of communicating compared to long ago?',
    options:['sending a message on a mobile phone','writing a letter by hand','sending a messenger on horseback','using a drum signal'],
    answer:'sending a message on a mobile phone',
    hint:'Long ago there were no phones or internet. Which option is from today?',
    explanation:'<b>Mobile phones</b> are a new way to communicate. Long ago, people sent handwritten letters.' }),

  makeMCQ({ id:'g3hi-loc-058', chapterId:'g3hi-my-locality', difficulty:1, subsection:'changes_locality',
    question:'How has transport changed in our locality over time?',
    options:['From horse carts to cars and buses','From aeroplanes to walking','From cars to horses','From boats to bicycles only'],
    answer:'From horse carts to cars and buses',
    hint:'Think about what people used to travel long ago versus today.',
    explanation:'Transport changed <b>from horse carts to cars and buses</b> over time — travel became faster.' }),

  makeMCQ({ id:'g3hi-loc-059', chapterId:'g3hi-my-locality', difficulty:1, subsection:'preserving_heritage',
    question:'Which word means "things passed down from past generations that we value"?',
    options:['heritage','weather','transport','education'],
    answer:'heritage',
    hint:'Old buildings, traditions and stories from our ancestors are part of our ___.',
    explanation:'<b>Heritage</b> refers to things passed down from past generations — buildings, traditions and stories.' }),

  makeMCQ({ id:'g3hi-loc-060', chapterId:'g3hi-my-locality', difficulty:1, subsection:'preserving_heritage',
    question:'Why is it important to preserve old buildings in our locality?',
    options:['They remind us of our history and culture','They are new and modern','They are cheap to build','They have no value'],
    answer:'They remind us of our history and culture',
    hint:'Old buildings tell us stories about the past.',
    explanation:'Preserving old buildings is important because <b>they remind us of our history and culture</b>.' })
);

// ── ch03 natural environment ─────────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g3hi-nat-055', chapterId:'g3hi-natural-environment', difficulty:1, subsection:'natural_features',
    question:'Which of the following is a natural feature in Mauritius?',
    options:['Chamarel Coloured Earth','the motorway','Port Louis market','a sugar factory'],
    answer:'Chamarel Coloured Earth',
    hint:'Natural features are made by nature, not by humans.',
    explanation:'<b>Chamarel Coloured Earth</b> is a natural geological feature — it was formed by nature.' }),

  makeMCQ({ id:'g3hi-nat-056', chapterId:'g3hi-natural-environment', difficulty:1, subsection:'natural_features',
    question:'What is a river?',
    options:['A natural flowing body of fresh water','A man-made canal','A type of road','A building near the sea'],
    answer:'A natural flowing body of fresh water',
    hint:'Rivers are found in nature and flow downhill into the sea.',
    explanation:'A <b>river</b> is a natural flowing body of fresh water. Grand River South East is a river in Mauritius.' }),

  makeMCQ({ id:'g3hi-nat-057', chapterId:'g3hi-natural-environment', difficulty:1, subsection:'natural_features',
    question:'Which natural feature is Rodrigues Island famous for?',
    options:['Beautiful lagoons and coral reefs','High mountains','Volcanoes','A big forest'],
    answer:'Beautiful lagoons and coral reefs',
    hint:'Rodrigues is surrounded by the Indian Ocean and has clear, shallow waters.',
    explanation:'Rodrigues is famous for its <b>beautiful lagoons and coral reefs</b> in the Indian Ocean.' }),

  makeMCQ({ id:'g3hi-nat-058', chapterId:'g3hi-natural-environment', difficulty:1, subsection:'man_made_features',
    question:'Which of these is a man-made feature?',
    options:['a sugar mill','a waterfall','a mountain','a lagoon'],
    answer:'a sugar mill',
    hint:'Man-made features are built by humans — which one did people construct?',
    explanation:'A <b>sugar mill</b> is man-made — humans built it to process sugarcane.' }),

  makeMCQ({ id:'g3hi-nat-059', chapterId:'g3hi-natural-environment', difficulty:1, subsection:'man_made_features',
    question:'A dam is ___.',
    options:['a man-made wall that holds back water','a natural hill','a type of beach','a forest'],
    answer:'a man-made wall that holds back water',
    hint:'Engineers build dams to store water for our use.',
    explanation:'A <b>dam</b> is a man-made wall built to hold back water and store it for drinking and farming.' }),

  makeMCQ({ id:'g3hi-nat-060', chapterId:'g3hi-natural-environment', difficulty:1, subsection:'man_made_features',
    question:'Port Louis is an example of a ___.',
    options:['man-made feature (a city)','natural feature','mountain','river'],
    answer:'man-made feature (a city)',
    hint:'People built Port Louis — it did not form naturally.',
    explanation:'<b>Port Louis</b> is the capital city of Mauritius — it is a man-made feature built by people.' }),

  makeMCQ({ id:'g3hi-nat-061', chapterId:'g3hi-natural-environment', difficulty:1, subsection:'man_made_features',
    question:'Which of these is a man-made feature you might find in a town?',
    options:['a hospital','a river','a hill','a lagoon'],
    answer:'a hospital',
    hint:'Which of these did humans build?',
    explanation:'A <b>hospital</b> is man-made — it was designed and built by people to care for sick patients.' }),

  makeMCQ({ id:'g3hi-nat-062', chapterId:'g3hi-natural-environment', difficulty:1, subsection:'man_made_features',
    question:'What is the difference between a natural feature and a man-made feature?',
    options:['Natural features are made by nature; man-made features are built by people','They are the same thing','Natural features are always bigger','Man-made features are always older'],
    answer:'Natural features are made by nature; man-made features are built by people',
    hint:'Think about who or what created each feature.',
    explanation:'<b>Natural features</b> (mountains, rivers) are formed by nature. <b>Man-made features</b> (roads, buildings) are built by people.' }),

  makeMCQ({ id:'g3hi-nat-063', chapterId:'g3hi-natural-environment', difficulty:1, subsection:'man_made_features',
    question:'A bridge is a man-made feature used to ___.',
    options:['cross over a river or valley','hold water','grow crops','measure rainfall'],
    answer:'cross over a river or valley',
    hint:'Bridges help us get from one side to another.',
    explanation:'A <b>bridge</b> is a man-made structure that lets people and vehicles cross over water or valleys.' }),

  makeMCQ({ id:'g3hi-nat-064', chapterId:'g3hi-natural-environment', difficulty:1, subsection:'man_made_features',
    question:'Which of these features would you see on a farm?',
    options:['irrigation canals','a waterfall','a mountain peak','a coral reef'],
    answer:'irrigation canals',
    hint:'Farmers build channels to bring water to their crops.',
    explanation:'<b>Irrigation canals</b> are man-made channels that bring water from rivers to fields for farming.' })
);

// ── ch04 weather ─────────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g3hi-wea-054', chapterId:'g3hi-weather', difficulty:1, subsection:'weather_types',
    question:'What type of weather do we have when the sky is grey and water falls from the clouds?',
    options:['rainy','sunny','windy','foggy'],
    answer:'rainy',
    hint:'When water falls from the sky, what do we call that weather?',
    explanation:'<b>Rainy</b> weather is when water falls from clouds as rain.' }),

  makeMCQ({ id:'g3hi-wea-055', chapterId:'g3hi-weather', difficulty:1, subsection:'weather_types',
    question:'What type of weather is it when the air moves strongly and trees shake?',
    options:['windy','sunny','rainy','foggy'],
    answer:'windy',
    hint:'What word describes fast-moving air?',
    explanation:'<b>Windy</b> weather is when the air moves quickly. Mauritius sometimes has strong winds during cyclones.' }),

  makeMCQ({ id:'g3hi-wea-056', chapterId:'g3hi-weather', difficulty:1, subsection:'weather_types',
    question:'In Mauritius, which season is generally hot and wet?',
    options:['summer (November to April)','winter (May to October)','spring','autumn'],
    answer:'summer (November to April)',
    hint:'Maurice has a hot and wet season between November and April.',
    explanation:'In Mauritius, <b>summer (November to April)</b> is generally hot and wet, with the risk of cyclones.' }),

  makeMCQ({ id:'g3hi-wea-057', chapterId:'g3hi-weather', difficulty:1, subsection:'weather_effects',
    question:'Heavy rain can cause ___.',
    options:['flooding in low-lying areas','very sunny weather','droughts','cold winters'],
    answer:'flooding in low-lying areas',
    hint:'When there is too much rain, what happens in areas near rivers?',
    explanation:'Heavy rain can cause <b>flooding</b> in low-lying areas — water overflows from rivers and streams.' }),

  makeMCQ({ id:'g3hi-wea-058', chapterId:'g3hi-weather', difficulty:1, subsection:'weather_effects',
    question:'Sunny weather is good for ___.',
    options:['going to the beach and drying clothes','wearing a raincoat','staying inside all day','growing mushrooms'],
    answer:'going to the beach and drying clothes',
    hint:'What activities do you enjoy on a bright sunny day?',
    explanation:'<b>Sunny weather</b> is great for outdoor activities like going to the beach and drying clothes.' }),

  makeMCQ({ id:'g3hi-wea-059', chapterId:'g3hi-weather', difficulty:1, subsection:'weather_effects',
    question:'A long period without rain is called a ___.',
    options:['drought','cyclone','flood','storm'],
    answer:'drought',
    hint:'When there is no rain for a very long time, what do we call it?',
    explanation:'A <b>drought</b> is a long period with very little or no rain. It can harm crops and cause water shortages.' }),

  makeMCQ({ id:'g3hi-wea-060', chapterId:'g3hi-weather', difficulty:1, subsection:'weather_safety',
    question:'What should you do if you see lightning during a storm?',
    options:['Stay indoors and away from windows','Stand under a tree','Go swimming','Hold a metal umbrella outside'],
    answer:'Stay indoors and away from windows',
    hint:'Lightning is dangerous outside. Where is the safest place to be?',
    explanation:'During a lightning storm, <b>stay indoors and away from windows</b>. Never stand under trees or hold metal objects outside.' })
);

// ── ch05 map skills ───────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g3hi-map-054', chapterId:'g3hi-map-skills', difficulty:1, subsection:'map_features',
    question:'What does a compass rose on a map show?',
    options:['the four directions: North, South, East, West','the height of mountains','the depth of the sea','the distance between two towns'],
    answer:'the four directions: North, South, East, West',
    hint:'The compass rose is a symbol with arrows pointing in different directions.',
    explanation:'A <b>compass rose</b> shows the four main directions: North, South, East and West.' }),

  makeMCQ({ id:'g3hi-map-055', chapterId:'g3hi-map-skills', difficulty:1, subsection:'map_features',
    question:'What does the scale on a map tell us?',
    options:['how distances on the map relate to real distances','the age of the map','the type of weather','who drew the map'],
    answer:'how distances on the map relate to real distances',
    hint:'If 1 cm on the map = 10 km in real life, that is the map\'s ___.',
    explanation:'The <b>scale</b> tells us how distances on the map relate to actual distances on the ground.' }),

  makeMCQ({ id:'g3hi-map-056', chapterId:'g3hi-map-skills', difficulty:1, subsection:'map_features',
    question:'On a map, a green colour often shows ___.',
    options:['forests and vegetation','water and sea','roads','buildings'],
    answer:'forests and vegetation',
    hint:'What colour are trees and plants?',
    explanation:'On most maps, <b>green</b> represents forests, parks and areas with lots of plants.' }),

  makeMCQ({ id:'g3hi-map-057', chapterId:'g3hi-map-skills', difficulty:1, subsection:'natural_landmarks',
    question:'Which of these is a natural landmark in the south of Mauritius?',
    options:['Blue Bay lagoon','the Sir Seewoosagur Ramgoolam International Airport','Port Louis harbour','a sugar factory'],
    answer:'Blue Bay lagoon',
    hint:'Blue Bay is known for its beautiful clear water and is a marine park.',
    explanation:'<b>Blue Bay lagoon</b> in the south of Mauritius is a famous natural landmark and marine park.' }),

  makeMCQ({ id:'g3hi-map-058', chapterId:'g3hi-map-skills', difficulty:1, subsection:'natural_landmarks',
    question:'The Black River Gorges is famous for being ___.',
    options:['Mauritius\'s largest national park with forest and wildlife','a busy shopping centre','a port for ships','a school'],
    answer:'Mauritius\'s largest national park with forest and wildlife',
    hint:'It is a large protected area in the south-west of Mauritius with rare animals.',
    explanation:'<b>Black River Gorges</b> is Mauritius\'s largest national park, home to rare birds and forest.' }),

  makeMCQ({ id:'g3hi-map-059', chapterId:'g3hi-map-skills', difficulty:1, subsection:'natural_landmarks',
    question:'Le Morne Brabant is located in which part of Mauritius?',
    options:['the south-west','the north','the east','the centre'],
    answer:'the south-west',
    hint:'Le Morne is a peninsula with a famous mountain on the western coast.',
    explanation:'<b>Le Morne Brabant</b> is located in the <b>south-west</b> of Mauritius. It is a UNESCO World Heritage Site.' }),

  makeMCQ({ id:'g3hi-map-060', chapterId:'g3hi-map-skills', difficulty:1, subsection:'safety_outdoors',
    question:'Why must you never swim alone in the sea?',
    options:['It is dangerous — currents and waves can be very strong','The water is too warm','There are no fish','It is always too cold'],
    answer:'It is dangerous — currents and waves can be very strong',
    hint:'Even strong swimmers can be in danger from sea currents.',
    explanation:'Swimming alone in the sea is <b>dangerous</b> because currents and waves can be very strong and sweep you away.' })
);

})();
