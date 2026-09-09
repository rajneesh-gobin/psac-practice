'use strict';
// Grade 3 Science — top-up to reach 20 per subsection.
// ch03 (mat): uses_objects +5 (066-070)
// ch04 (wat): sources_water +3 (061-063), uses_water +5 (064-068), properties_water +4 (069-072), conservation_water +8 (073-080)
// ch05 (air): presence_air +3 (051-053), uses_air +3 (054-056), properties_air +4 (057-060)
// ch06 (env): pollution_types +3 (051-053), keeping_clean +3 (054-056), effects_pollution +4 (057-060)

(function () {

// ── ch03 materials ───────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g3sc-mat-066', chapterId:'g3sc-materials', difficulty:1, subsection:'uses_objects',
    question:'Which material is best for making a window?',
    options:['glass','wood','paper','cloth'],
    answer:'glass',
    hint:'You need to see through it and it keeps the rain out.',
    explanation:'<b>Glass</b> is used for windows because it is transparent (you can see through it) and waterproof.' }),

  makeMCQ({ id:'g3sc-mat-067', chapterId:'g3sc-materials', difficulty:1, subsection:'uses_objects',
    question:'Which material would you use to make a shopping bag?',
    options:['plastic or cloth','glass','wood','paper'],
    answer:'plastic or cloth',
    hint:'Shopping bags need to be strong and carry heavy items.',
    explanation:'<b>Plastic or cloth</b> bags are strong and flexible — good for carrying shopping.' }),

  makeMCQ({ id:'g3sc-mat-068', chapterId:'g3sc-materials', difficulty:1, subsection:'uses_objects',
    question:'Paper is most useful for ___.',
    options:['writing and drawing','making chairs','building walls','cooking food'],
    answer:'writing and drawing',
    hint:'You use paper in school every day.',
    explanation:'<b>Paper</b> is used for writing and drawing because it is flat, light and easy to mark on.' }),

  makeMCQ({ id:'g3sc-mat-069', chapterId:'g3sc-materials', difficulty:1, subsection:'uses_objects',
    question:'Which material is used to make a wooden chair?',
    options:['wood','glass','plastic','paper'],
    answer:'wood',
    hint:'It comes from trees and is hard and strong.',
    explanation:'A chair is made from <b>wood</b> — it is strong enough to hold a person sitting on it.' }),

  makeMCQ({ id:'g3sc-mat-070', chapterId:'g3sc-materials', difficulty:1, subsection:'uses_objects',
    question:'Why do we use glass bottles to store some liquids?',
    options:['Glass does not react with most liquids and is easy to clean','Glass is soft and flexible','Glass is the cheapest material','Glass absorbs liquid'],
    answer:'Glass does not react with most liquids and is easy to clean',
    hint:'Think about why glass is a good container for drinks.',
    explanation:'<b>Glass</b> is used for bottles because it does not react with liquids and can be washed and reused.' })
);

// ── ch04 water ───────────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g3sc-wat-061', chapterId:'g3sc-water', difficulty:1, subsection:'sources_water',
    question:'Which of these is a source of fresh water that we can drink?',
    options:['a spring','the sea','a swimming pool','a mud puddle'],
    answer:'a spring',
    hint:'Fresh water comes from natural sources on land.',
    explanation:'A <b>spring</b> is a natural source of fresh water that comes up from the ground.' }),

  makeMCQ({ id:'g3sc-wat-062', chapterId:'g3sc-water', difficulty:1, subsection:'sources_water',
    question:'What do we call the large container that collects and stores rain water for our use?',
    options:['reservoir','river','well','pond'],
    answer:'reservoir',
    hint:'In Mauritius, La Mare aux Vacoas is one of these.',
    explanation:'A <b>reservoir</b> is a large lake or container built to store water for drinking and daily use.' }),

  makeMCQ({ id:'g3sc-wat-063', chapterId:'g3sc-water', difficulty:1, subsection:'sources_water',
    question:'Rain water falls from the sky and collects in ___.',
    options:['rivers, lakes and reservoirs','rocks and stones','trees','the air'],
    answer:'rivers, lakes and reservoirs',
    hint:'Where does rain water go after it falls on the land?',
    explanation:'Rain water flows downhill and collects in <b>rivers, lakes and reservoirs</b>.' }),

  makeMCQ({ id:'g3sc-wat-064', chapterId:'g3sc-water', difficulty:1, subsection:'uses_water',
    question:'Which of these is NOT a use of water?',
    options:['making electricity from coal','drinking','cooking','bathing'],
    answer:'making electricity from coal',
    hint:'Coal is a solid fuel used to make electricity — does it need water?',
    explanation:'<b>Making electricity from coal</b> does not directly use water as a material. Drinking, cooking and bathing all use water.' }),

  makeMCQ({ id:'g3sc-wat-065', chapterId:'g3sc-water', difficulty:1, subsection:'uses_water',
    question:'Farmers use water to ___.',
    options:['irrigate their crops','fuel their tractors','build their houses','make their tools'],
    answer:'irrigate their crops',
    hint:'Plants need water to grow. How do farmers give water to their fields?',
    explanation:'Farmers <b>irrigate their crops</b> — they give water to their plants so they grow well.' }),

  makeMCQ({ id:'g3sc-wat-066', chapterId:'g3sc-water', difficulty:1, subsection:'uses_water',
    question:'In Mauritius, which activity uses a lot of sea water?',
    options:['fishing and water sports','cooking rice','making bread','painting houses'],
    answer:'fishing and water sports',
    hint:'The sea surrounds Mauritius. What do people do there?',
    explanation:'In Mauritius, people use the sea for <b>fishing and water sports</b> like swimming, snorkelling and sailing.' }),

  makeMCQ({ id:'g3sc-wat-067', chapterId:'g3sc-water', difficulty:1, subsection:'uses_water',
    question:'Hydroelectric power stations use water to ___.',
    options:['generate electricity','make food','build roads','cool computers'],
    answer:'generate electricity',
    hint:'Moving water has energy. What can this energy be changed into?',
    explanation:'<b>Hydroelectric power stations</b> use the energy of flowing water to generate electricity.' }),

  makeMCQ({ id:'g3sc-wat-068', chapterId:'g3sc-water', difficulty:1, subsection:'uses_water',
    question:'Which of these uses water every day?',
    options:['brushing your teeth','reading a book','watching TV','drawing a picture'],
    answer:'brushing your teeth',
    hint:'Think about your morning routine.',
    explanation:'<b>Brushing your teeth</b> uses water every day — you wet your brush and rinse your mouth.' }),

  makeMCQ({ id:'g3sc-wat-069', chapterId:'g3sc-water', difficulty:1, subsection:'properties_water',
    question:'Which of the following is a property of clean water?',
    options:['It has no colour, taste or smell','It is red','It smells like flowers','It is thick like honey'],
    answer:'It has no colour, taste or smell',
    hint:'Clean, pure water looks and tastes like nothing at all.',
    explanation:'Clean water is <b>colourless</b> (no colour), <b>tasteless</b> and <b>odourless</b> (no smell).' }),

  makeMCQ({ id:'g3sc-wat-070', chapterId:'g3sc-water', difficulty:1, subsection:'properties_water',
    question:'Water always flows ___.',
    options:['downhill','uphill','sideways only','in a circle'],
    answer:'downhill',
    hint:'Gravity pulls water down. Which way does it flow?',
    explanation:'Water always flows <b>downhill</b> because of gravity — from high places to low places.' }),

  makeMCQ({ id:'g3sc-wat-071', chapterId:'g3sc-water', difficulty:1, subsection:'properties_water',
    question:'Water takes the shape of ___.',
    options:['its container','a ball','a flat square','a triangle'],
    answer:'its container',
    hint:'Pour water into a bottle, then into a bowl. What shape does it take?',
    explanation:'Water is a liquid — it takes the <b>shape of its container</b>.' }),

  makeMCQ({ id:'g3sc-wat-072', chapterId:'g3sc-water', difficulty:1, subsection:'properties_water',
    question:'Water becomes ice when it ___.',
    options:['gets very cold (freezes)','gets very hot','is mixed with salt','is poured into a cup'],
    answer:'gets very cold (freezes)',
    hint:'What happens to water in a freezer?',
    explanation:'Water <b>freezes</b> (becomes ice) when its temperature drops to 0°C or below.' }),

  makeMCQ({ id:'g3sc-wat-073', chapterId:'g3sc-water', difficulty:1, subsection:'conservation_water',
    question:'Which of these is the BEST way to save water when washing dishes?',
    options:['Fill a bowl with water instead of leaving the tap running','Leave the tap running the whole time','Wash dishes in the swimming pool','Use sea water'],
    answer:'Fill a bowl with water instead of leaving the tap running',
    hint:'Using a bowl uses much less water than a running tap.',
    explanation:'<b>Filling a bowl</b> to wash dishes uses far less water than leaving the tap running continuously.' }),

  makeMCQ({ id:'g3sc-wat-074', chapterId:'g3sc-water', difficulty:1, subsection:'conservation_water',
    question:'What happens if we waste too much water?',
    options:['There will not be enough for everyone to use','It will rain more','The sea will become smaller','Plants will grow faster'],
    answer:'There will not be enough for everyone to use',
    hint:'Water is precious. What is the danger of wasting it?',
    explanation:'If we waste water, <b>there will not be enough for everyone</b> — people, plants and animals all need it.' }),

  makeMCQ({ id:'g3sc-wat-075', chapterId:'g3sc-water', difficulty:1, subsection:'conservation_water',
    question:'Which of these helps us collect rainwater to use in the garden?',
    options:['a rain barrel (water butt)','a plastic bag','a glass window','a metal spoon'],
    answer:'a rain barrel (water butt)',
    hint:'You put a large container outside to catch rain from the roof.',
    explanation:'A <b>rain barrel</b> (water butt) collects rainwater from roofs — this water can be used to water the garden.' }),

  makeMCQ({ id:'g3sc-wat-076', chapterId:'g3sc-water', difficulty:1, subsection:'conservation_water',
    question:'Why should you water plants in the early morning or evening?',
    options:['Less water evaporates in cooler temperatures','The sun helps water sink faster','Plants only drink at night','Watering at noon makes plants grow faster'],
    answer:'Less water evaporates in cooler temperatures',
    hint:'The hot midday sun causes water to evaporate quickly.',
    explanation:'Watering plants in the <b>morning or evening</b> is better because less water evaporates in the cooler air.' }),

  makeMCQ({ id:'g3sc-wat-077', chapterId:'g3sc-water', difficulty:1, subsection:'conservation_water',
    question:'Which of these is a sign of good water conservation?',
    options:['Fixing a dripping tap quickly','Leaving sprinklers on all day','Taking very long showers','Washing the car with a running hose every day'],
    answer:'Fixing a dripping tap quickly',
    hint:'Even a slow drip wastes a lot of water over time.',
    explanation:'<b>Fixing a dripping tap</b> is good water conservation — a leaking tap can waste thousands of litres per year.' }),

  makeMCQ({ id:'g3sc-wat-078', chapterId:'g3sc-water', difficulty:1, subsection:'conservation_water',
    question:'Water is a precious resource because ___.',
    options:['not all water is clean and safe to drink, and water is needed by all living things','there is too much of it','it is easy to make','it is not used by animals'],
    answer:'not all water is clean and safe to drink, and water is needed by all living things',
    hint:'Think about why all living things — people, animals and plants — need water.',
    explanation:'Water is precious because <b>all living things need it</b> and clean drinking water is limited.' }),

  makeMCQ({ id:'g3sc-wat-079', chapterId:'g3sc-water', difficulty:1, subsection:'conservation_water',
    question:'Taking a shower instead of a bath usually ___.',
    options:['uses less water','uses more water','uses the same amount','wastes water'],
    answer:'uses less water',
    hint:'A full bath holds much more water than a short shower.',
    explanation:'A <b>shower</b> typically uses less water than filling a bath — a good way to conserve water.' }),

  makeMCQ({ id:'g3sc-wat-080', chapterId:'g3sc-water', difficulty:1, subsection:'conservation_water',
    question:'Which of these is NOT a good way to conserve water?',
    options:['Leaving the tap on while you brush your teeth','Turning off the tap while soaping your hands','Using a bucket to wash the car','Fixing leaking pipes'],
    answer:'Leaving the tap on while you brush your teeth',
    hint:'Which action wastes water instead of saving it?',
    explanation:'<b>Leaving the tap running</b> while brushing teeth wastes water. Always turn off the tap when not rinsing.' })
);

// ── ch05 air ─────────────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g3sc-air-051', chapterId:'g3sc-air', difficulty:1, subsection:'presence_air',
    question:'How do we know that air is present in an empty cup placed upside down in water?',
    options:['Bubbles come out as water tries to enter','The cup floats because of its weight','The cup fills with water immediately','Nothing happens'],
    answer:'Bubbles come out as water tries to enter',
    hint:'When you push the cup down, watch carefully — what do you see?',
    explanation:'When you push an "empty" cup into water, <b>bubbles come out</b> — that is the air escaping from the cup.' }),

  makeMCQ({ id:'g3sc-air-052', chapterId:'g3sc-air', difficulty:1, subsection:'presence_air',
    question:'Air is found in ___.',
    options:['soil, water and the atmosphere','only in balloons','only outdoors','only in our lungs'],
    answer:'soil, water and the atmosphere',
    hint:'Air is everywhere around us and inside things too.',
    explanation:'Air is found everywhere — in <b>soil</b> (helping plants and worms), in <b>water</b> (for fish), and in the atmosphere.' }),

  makeMCQ({ id:'g3sc-air-053', chapterId:'g3sc-air', difficulty:1, subsection:'presence_air',
    question:'Why do fish need air?',
    options:['Fish breathe oxygen dissolved in water','Fish breathe air from the surface','Fish do not need air','Fish breathe through their mouths above water'],
    answer:'Fish breathe oxygen dissolved in water',
    hint:'Fish have gills, not lungs. How do they get oxygen?',
    explanation:'Fish breathe <b>oxygen dissolved in water</b> using their gills — that is why air in water is important for aquatic life.' }),

  makeMCQ({ id:'g3sc-air-054', chapterId:'g3sc-air', difficulty:1, subsection:'uses_air',
    question:'Windmills use air (wind) to ___.',
    options:['grind grain or pump water or generate electricity','fly through the sky','make rain','cool the earth'],
    answer:'grind grain or pump water or generate electricity',
    hint:'Wind is moving air that has energy. What can that energy do?',
    explanation:'<b>Windmills</b> use the energy of moving air (wind) to grind grain, pump water or generate electricity.' }),

  makeMCQ({ id:'g3sc-air-055', chapterId:'g3sc-air', difficulty:1, subsection:'uses_air',
    question:'Why do bicycle tyres need to be filled with air?',
    options:['Air inside the tyre makes it round, firm and comfortable to ride','Air makes the tyre lighter','Air cools the wheel','Air makes the bike go faster automatically'],
    answer:'Air inside the tyre makes it round, firm and comfortable to ride',
    hint:'What would happen if a tyre had no air in it?',
    explanation:'<b>Air inside tyres</b> makes them firm and round, giving a smooth and comfortable ride.' }),

  makeMCQ({ id:'g3sc-air-056', chapterId:'g3sc-air', difficulty:1, subsection:'uses_air',
    question:'Singing and playing musical instruments like a flute use ___.',
    options:['air (breath)','water','sunlight','soil'],
    answer:'air (breath)',
    hint:'You blow into a flute to make music. What are you blowing?',
    explanation:'Singing and playing wind instruments use <b>air (breath)</b> — you push air through the instrument to make sound.' }),

  makeMCQ({ id:'g3sc-air-057', chapterId:'g3sc-air', difficulty:1, subsection:'properties_air',
    question:'Air has weight. This is shown by the fact that ___.',
    options:['a balloon filled with air is heavier than a flat balloon','air floats away immediately','we cannot feel air at all','air has no mass'],
    answer:'a balloon filled with air is heavier than a flat balloon',
    hint:'Compare a balloon before and after it is blown up. Which is heavier?',
    explanation:'A <b>balloon filled with air</b> is slightly heavier than a flat one — this proves that air has weight (mass).' }),

  makeMCQ({ id:'g3sc-air-058', chapterId:'g3sc-air', difficulty:1, subsection:'properties_air',
    question:'What do we call air that is moving?',
    options:['wind','cloud','smoke','fog'],
    answer:'wind',
    hint:'When air moves quickly, it creates this.',
    explanation:'<b>Wind</b> is moving air. A gentle breeze is slow-moving air; a cyclone is very fast-moving air.' }),

  makeMCQ({ id:'g3sc-air-059', chapterId:'g3sc-air', difficulty:1, subsection:'properties_air',
    question:'Air is a mixture of different ___.',
    options:['gases','liquids','solids','metals'],
    answer:'gases',
    hint:'Air is not a liquid or solid — it belongs to which state of matter?',
    explanation:'Air is a <b>mixture of gases</b> — mainly nitrogen and oxygen, with small amounts of other gases.' }),

  makeMCQ({ id:'g3sc-air-060', chapterId:'g3sc-air', difficulty:1, subsection:'properties_air',
    question:'What makes up most of the air we breathe?',
    options:['nitrogen and oxygen','water and soil','carbon dioxide only','smoke and dust'],
    answer:'nitrogen and oxygen',
    hint:'About 78% is nitrogen and 21% is oxygen.',
    explanation:'Air is mostly <b>nitrogen (78%) and oxygen (21%)</b>. We breathe oxygen; nitrogen is also important.' })
);

// ── ch06 environment ──────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g3sc-env-051', chapterId:'g3sc-environment', difficulty:1, subsection:'pollution_types',
    question:'Which of these causes water pollution?',
    options:['dumping rubbish in a river','flying a kite','riding a bicycle','planting a tree'],
    answer:'dumping rubbish in a river',
    hint:'Which action puts harmful things into the water?',
    explanation:'<b>Dumping rubbish in a river</b> causes water pollution — it harms fish and other water animals.' }),

  makeMCQ({ id:'g3sc-env-052', chapterId:'g3sc-environment', difficulty:1, subsection:'pollution_types',
    question:'Which of these is an example of noise pollution?',
    options:['very loud music played at night','a gentle breeze','birds singing','children reading quietly'],
    answer:'very loud music played at night',
    hint:'Noise pollution is unwanted, loud sound that disturbs people.',
    explanation:'<b>Very loud music at night</b> is noise pollution — it disturbs people and animals trying to sleep.' }),

  makeMCQ({ id:'g3sc-env-053', chapterId:'g3sc-environment', difficulty:1, subsection:'pollution_types',
    question:'Stagnant water (water that does not move) can ___.',
    options:['become a breeding place for mosquitoes','help plants grow better','clean the environment','make the air smell nice'],
    answer:'become a breeding place for mosquitoes',
    hint:'Mosquitoes lay their eggs in still, dirty water.',
    explanation:'<b>Stagnant water</b> is a breeding place for mosquitoes, which can spread diseases like dengue fever.' }),

  makeMCQ({ id:'g3sc-env-054', chapterId:'g3sc-environment', difficulty:1, subsection:'keeping_clean',
    question:'Which of these is a good way to keep your school environment clean?',
    options:['placing all rubbish in a bin','throwing paper on the floor','leaving food scraps outside','breaking flowerpots'],
    answer:'placing all rubbish in a bin',
    hint:'A clean school starts with each person doing the right thing.',
    explanation:'<b>Placing rubbish in a bin</b> keeps the school clean and prevents litter from polluting the environment.' }),

  makeMCQ({ id:'g3sc-env-055', chapterId:'g3sc-environment', difficulty:1, subsection:'keeping_clean',
    question:'Recycling helps the environment because it ___.',
    options:['reduces the amount of waste that goes to landfill','creates more pollution','uses more energy','makes the sea dirtier'],
    answer:'reduces the amount of waste that goes to landfill',
    hint:'When we recycle, rubbish is turned into something new instead of being thrown away.',
    explanation:'<b>Recycling</b> reduces waste going to landfill — it turns old materials (paper, glass, plastic) into new ones.' }),

  makeMCQ({ id:'g3sc-env-056', chapterId:'g3sc-environment', difficulty:1, subsection:'keeping_clean',
    question:'Planting trees helps the environment because trees ___.',
    options:['absorb carbon dioxide and give us oxygen','make the air dirty','cause flooding','use up all the water'],
    answer:'absorb carbon dioxide and give us oxygen',
    hint:'Think about what trees do during photosynthesis.',
    explanation:'Trees <b>absorb carbon dioxide and produce oxygen</b> during photosynthesis — they clean the air we breathe.' }),

  makeMCQ({ id:'g3sc-env-057', chapterId:'g3sc-environment', difficulty:1, subsection:'effects_pollution',
    question:'What can happen to people who drink polluted water?',
    options:['They can get very sick','They will get stronger','Nothing will happen','They will grow taller'],
    answer:'They can get very sick',
    hint:'Polluted water contains harmful substances that damage our bodies.',
    explanation:'Drinking <b>polluted water</b> can make people very sick — it can cause diseases like cholera and typhoid.' }),

  makeMCQ({ id:'g3sc-env-058', chapterId:'g3sc-environment', difficulty:1, subsection:'effects_pollution',
    question:'Air pollution can cause people to have ___.',
    options:['breathing problems and coughing','stronger lungs','better eyesight','more energy'],
    answer:'breathing problems and coughing',
    hint:'When the air is dirty, what happens to our lungs?',
    explanation:'<b>Air pollution</b> can cause breathing problems, coughing and serious lung diseases.' }),

  makeMCQ({ id:'g3sc-env-059', chapterId:'g3sc-environment', difficulty:1, subsection:'effects_pollution',
    question:'When animals\' habitats are destroyed by pollution, they may become ___.',
    options:['endangered or extinct','more common','stronger','healthier'],
    answer:'endangered or extinct',
    hint:'If animals lose their home and food, what might happen to them?',
    explanation:'Pollution destroys habitats, which means animals can lose their food and shelter — they may become <b>endangered or extinct</b>.' }),

  makeMCQ({ id:'g3sc-env-060', chapterId:'g3sc-environment', difficulty:1, subsection:'effects_pollution',
    question:'Oil spills in the ocean cause ___.',
    options:['death of sea animals and destruction of coral reefs','more fish to appear','cleaner beaches','more rainfall'],
    answer:'death of sea animals and destruction of coral reefs',
    hint:'Oil coats sea animals and blocks sunlight from reaching coral.',
    explanation:'<b>Oil spills</b> kill sea animals (fish, sea birds, turtles) and destroy coral reefs by blocking sunlight and oxygen.' })
);

})();
