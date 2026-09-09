'use strict';
(function () {

// Grade 3 SSEE — Unit 7: Water
// Source: MIE SSEE Grade 3 Part 2 pp.62-95
// IDs: g3ssee-wat-001 onwards

// ── states_of_water (001-030) ─────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g3ssee-wat-001', chapterId:'g3ssee-water', difficulty:1, subsection:'states_of_water',
    question:'Water can exist in THREE states. What are they?',
    options:['Liquid, solid and gas (water vapour)','Liquid, oil and steam','Liquid, cloud and ice','Water, rain and snow only'],
    answer:'Liquid, solid and gas (water vapour)',
    hint:'Think about water in a glass, ice in a freezer, and steam from a kettle.',
    explanation:'Water exists in <b>three states</b>: <b>liquid</b> (water), <b>solid</b> (ice) and <b>gas</b> (water vapour/steam). These are the same substance in different states.' }),

  makeMCQ({ id:'g3ssee-wat-002', chapterId:'g3ssee-water', difficulty:1, subsection:'states_of_water',
    question:'What is water in its SOLID state called?',
    options:['Ice','Steam','Water vapour','Rain'],
    answer:'Ice',
    hint:'What forms in the freezer?',
    explanation:'When water is frozen (cooled below 0°C), it becomes a <b>solid</b> called <b>ice</b>.' }),

  makeMCQ({ id:'g3ssee-wat-003', chapterId:'g3ssee-water', difficulty:1, subsection:'states_of_water',
    question:'What happens to water when it is HEATED strongly?',
    options:['It boils and turns into water vapour (steam)','It freezes into ice','It becomes heavier','It turns green'],
    answer:'It boils and turns into water vapour (steam)',
    hint:'Think about water boiling in a pot.',
    explanation:'When water is heated to 100°C, it <b>boils</b> and changes into <b>water vapour (steam)</b> — a gas. This process is called <b>evaporation</b> (or vaporisation at 100°C, boiling).' }),

  makeMCQ({ id:'g3ssee-wat-004', chapterId:'g3ssee-water', difficulty:1, subsection:'states_of_water',
    question:'What happens to ice when it is WARMED?',
    options:['It melts and becomes liquid water','It becomes steam immediately','It becomes heavier','It turns into a different substance'],
    answer:'It melts and becomes liquid water',
    hint:'What happens to an ice cube left on the counter?',
    explanation:'When ice is warmed above 0°C, it <b>melts</b> and becomes <b>liquid water</b>. This change of state from solid to liquid is called <b>melting</b>.' }),

  makeTF({ id:'g3ssee-wat-005', chapterId:'g3ssee-water', difficulty:1, subsection:'states_of_water',
    question:'Water vapour (steam) is invisible.',
    answer:true,
    explanation:'Yes! <b>Water vapour is a gas and is invisible.</b> What we see as "steam" rising from a kettle is actually tiny droplets of liquid water that form as the vapour cools — the vapour itself is invisible.' }),

  makeMCQ({ id:'g3ssee-wat-006', chapterId:'g3ssee-water', difficulty:2, subsection:'states_of_water',
    question:'What is EVAPORATION?',
    options:['The process of liquid water turning into water vapour','Water freezing into ice','Rain falling from clouds','Water flowing in a river'],
    answer:'The process of liquid water turning into water vapour',
    hint:'This is how puddles disappear on a sunny day.',
    explanation:'<b>Evaporation</b> is the process by which liquid water turns into <b>water vapour (gas)</b>. It happens when water is heated — by the sun, for example — and rises into the air.' }),

  makeMCQ({ id:'g3ssee-wat-007', chapterId:'g3ssee-water', difficulty:2, subsection:'states_of_water',
    question:'What is CONDENSATION?',
    options:['The process of water vapour cooling and turning back into liquid water','Water boiling','Ice melting','Rain forming in clouds'],
    answer:'The process of water vapour cooling and turning back into liquid water',
    hint:'Think about water droplets forming on a cold glass.',
    explanation:'<b>Condensation</b> is the opposite of evaporation — water vapour <b>cools</b> and turns back into <b>liquid water droplets</b>. This is how dew forms on leaves in the morning and how water droplets appear on a cold glass.' }),

  makeMCQ({ id:'g3ssee-wat-008', chapterId:'g3ssee-water', difficulty:2, subsection:'states_of_water',
    question:'Why do water droplets appear on the OUTSIDE of a cold bottle taken from the fridge?',
    options:['Water vapour in the warm air condenses on the cold surface of the bottle','The bottle is leaking','Rain fell on the bottle','Water seeped through the glass'],
    answer:'Water vapour in the warm air condenses on the cold surface of the bottle',
    hint:'The cold surface cools the air touching it.',
    explanation:'The warm air around the cold bottle cools when it touches the bottle\'s surface. This causes <b>water vapour in the air to condense</b> into liquid water droplets on the outside of the bottle.' }),

  makeMCQ({ id:'g3ssee-wat-009', chapterId:'g3ssee-water', difficulty:1, subsection:'states_of_water',
    question:'At what temperature does water FREEZE?',
    options:['0°C (zero degrees Celsius)','100°C','50°C','10°C'],
    answer:'0°C (zero degrees Celsius)',
    explanation:'Water freezes (turns from liquid to solid ice) at <b>0°C (zero degrees Celsius)</b>.' }),

  makeMCQ({ id:'g3ssee-wat-010', chapterId:'g3ssee-water', difficulty:1, subsection:'states_of_water',
    question:'At what temperature does water BOIL?',
    options:['100°C (one hundred degrees Celsius)','0°C','50°C','37°C'],
    answer:'100°C (one hundred degrees Celsius)',
    explanation:'Water boils (turns from liquid to gas) at <b>100°C (one hundred degrees Celsius)</b> at sea level.' }),

  makeMCQ({ id:'g3ssee-wat-011', chapterId:'g3ssee-water', difficulty:2, subsection:'states_of_water',
    question:'A puddle forms after rain. The sun comes out and the puddle disappears. What happened?',
    options:['The water evaporated — heat from the sun turned it into water vapour','The ground absorbed all the water immediately','Animals drank all the water','The water turned into ice'],
    answer:'The water evaporated — heat from the sun turned it into water vapour',
    hint:'The sun provides heat energy.',
    explanation:'Heat from the sun caused the water in the puddle to <b>evaporate</b> — it turned into water vapour and rose into the air. The puddle seemed to disappear but the water was still there, just in a different state.' }),

  makeMCQ({ id:'g3ssee-wat-012', chapterId:'g3ssee-water', difficulty:3, subsection:'states_of_water',
    question:'Sipho puts wet washing on the line on a sunny, windy day. The clothes dry faster than on a still, cloudy day. Which TWO factors help the water evaporate faster?',
    options:['Heat from the sun and wind moving the air','Only the colour of the clothes and the amount of water','Only the weight of the clothes','Only the type of fabric'],
    answer:'Heat from the sun and wind moving the air',
    hint:'What increases the rate of evaporation?',
    explanation:'<b>Heat</b> (from the sun) gives water molecules more energy to evaporate, and <b>wind</b> removes water vapour from near the clothes so more can evaporate. Both speed up drying.' }),

  makeTF({ id:'g3ssee-wat-013', chapterId:'g3ssee-water', difficulty:1, subsection:'states_of_water',
    question:'Water is the only substance that exists in three states in nature.',
    answer:false,
    explanation:'Many substances can exist in solid, liquid and gas states. However, water is <b>unique</b> in being commonly found in all three states naturally on Earth.' }),

  makeMCQ({ id:'g3ssee-wat-014', chapterId:'g3ssee-water', difficulty:2, subsection:'states_of_water',
    question:'When water vapour rises into the cold upper atmosphere, it condenses to form ___.',
    options:['Clouds','Rain immediately','Ice on the ground','Rivers'],
    answer:'Clouds',
    hint:'Look up at the sky on a cloudy day.',
    explanation:'When water vapour rises into the <b>cooler upper atmosphere</b>, it condenses into tiny water droplets around dust particles, forming <b>clouds</b>.' }),

  makeMCQ({ id:'g3ssee-wat-015', chapterId:'g3ssee-water', difficulty:2, subsection:'states_of_water',
    question:'Snow and hail are forms of water in its ___ state.',
    options:['Solid','Liquid','Gas','All three'],
    answer:'Solid',
    explanation:'<b>Snow</b> (frozen water crystals) and <b>hail</b> (balls of ice) are both forms of water in the <b>solid</b> state. They form when water freezes in clouds or falls through freezing air.' }),

// ── uses_of_water (016-045) ───────────────────────────────────────────────

  makeMCQ({ id:'g3ssee-wat-016', chapterId:'g3ssee-water', difficulty:1, subsection:'uses_of_water',
    question:'Which of the following is a USE of water?',
    options:['Drinking and staying hydrated','Breathing','Making noise','Keeping warm at night alone'],
    answer:'Drinking and staying hydrated',
    hint:'Our bodies are mostly water.',
    explanation:'<b>Drinking water</b> is the most vital use of water — our bodies need water to function. Water is also used for cooking, washing, irrigation and many other purposes.' }),

  makeTF({ id:'g3ssee-wat-017', chapterId:'g3ssee-water', difficulty:1, subsection:'uses_of_water',
    question:'Plants need water to grow.',
    answer:true,
    explanation:'Yes! Plants need <b>water</b> for photosynthesis, to transport nutrients from soil to leaves, and to keep their cells firm and healthy. Without water, plants wilt and die.' }),

  makeMCQ({ id:'g3ssee-wat-018', chapterId:'g3ssee-water', difficulty:1, subsection:'uses_of_water',
    question:'Farmers in Mauritius use water to ___.',
    options:['Irrigate crops such as sugar cane, vegetables and fruit','Make electricity only','Clean factory machines only','Build roads'],
    answer:'Irrigate crops such as sugar cane, vegetables and fruit',
    hint:'Plants need water to grow.',
    explanation:'Farmers use water to <b>irrigate crops</b> — to water their fields so plants can grow. In Mauritius, sugar cane, vegetables and tropical fruit are all irrigated.' }),

  makeMCQ({ id:'g3ssee-wat-019', chapterId:'g3ssee-water', difficulty:2, subsection:'uses_of_water',
    question:'In Mauritius, water from reservoirs such as La Nicolière and Mare aux Vacoas is used for ___.',
    options:['Supplying drinking water to homes and businesses','Generating wind power','Making fire','Producing food alone'],
    answer:'Supplying drinking water to homes and businesses',
    hint:'These are Mauritius\'s main water storage locations.',
    explanation:'Reservoirs like <b>La Nicolière</b> and <b>Mare aux Vacoas</b> store fresh water in Mauritius. This water is treated and piped to homes, schools, hospitals and businesses as <b>drinking water</b>.' }),

  makeMCQ({ id:'g3ssee-wat-020', chapterId:'g3ssee-water', difficulty:1, subsection:'uses_of_water',
    question:'How is water used in COOKING?',
    options:['For boiling, steaming, washing food and making drinks','Only for drinking','Only for washing plates','Only for making ice'],
    answer:'For boiling, steaming, washing food and making drinks',
    explanation:'Water is essential in cooking — for <b>boiling</b> rice or pasta, <b>steaming</b> vegetables, <b>washing</b> food, making soups and broths, and preparing drinks like tea and juice.' }),

  makeMCQ({ id:'g3ssee-wat-021', chapterId:'g3ssee-water', difficulty:2, subsection:'uses_of_water',
    question:'Hydroelectric power stations use ___ to generate electricity.',
    options:['The force of flowing water turning turbines','The heat of the sun','Wind blowing on turbines','Burning coal'],
    answer:'The force of flowing water turning turbines',
    hint:'Think about a water wheel.',
    explanation:'<b>Hydroelectric power</b> is generated by using the force of flowing or falling water to spin <b>turbines</b>, which generate electricity. Mauritius uses some hydroelectric power alongside solar and other sources.' }),

  makeTF({ id:'g3ssee-wat-022', chapterId:'g3ssee-water', difficulty:1, subsection:'uses_of_water',
    question:'Animals need water to survive.',
    answer:true,
    explanation:'Yes! All animals need <b>water</b> to survive. Water makes up a large part of an animal\'s body and is essential for digestion, temperature regulation and all body processes.' }),

  makeMCQ({ id:'g3ssee-wat-023', chapterId:'g3ssee-water', difficulty:2, subsection:'uses_of_water',
    question:'How do fish and other aquatic animals use water?',
    options:['Water is their habitat — they live in it and breathe oxygen dissolved in water through their gills','They drink water like humans','They use water to build nests','They swim through water to get to food only'],
    answer:'Water is their habitat — they live in it and breathe oxygen dissolved in water through their gills',
    explanation:'For fish and aquatic animals, water is their <b>habitat</b> — it is where they live, move and breathe. Their <b>gills</b> extract dissolved oxygen directly from the water.' }),

  makeMCQ({ id:'g3ssee-wat-024', chapterId:'g3ssee-water', difficulty:1, subsection:'uses_of_water',
    question:'Why is it important to SAVE water in Mauritius?',
    options:['Fresh water is limited and not all areas get enough; wasting it means less for everyone','Water is so plentiful that saving is not necessary','Only factories need to save water','Only farmers need to save water'],
    answer:'Fresh water is limited and not all areas get enough; wasting it means less for everyone',
    hint:'Think about dry seasons in Mauritius.',
    explanation:'Although Mauritius is an island surrounded by sea, <b>fresh water</b> (the kind we can drink) is limited and unevenly distributed. During dry seasons, some areas face water shortages, so <b>saving water</b> is important for everyone.' }),

  makeMCQ({ id:'g3ssee-wat-025', chapterId:'g3ssee-water', difficulty:2, subsection:'uses_of_water',
    question:'Which of the following is a good way to SAVE WATER at home?',
    options:['Turning off the tap while brushing your teeth','Leaving the hose running in the garden all day','Having very long showers every day','Washing one item at a time in the washing machine'],
    answer:'Turning off the tap while brushing your teeth',
    explanation:'<b>Turning off the tap</b> while brushing teeth saves several litres of water each time. Other ways to save water include fixing leaks, using full loads in washing machines, and collecting rainwater.' }),

// ── water_cycle (026-075) ─────────────────────────────────────────────────

  makeMCQ({ id:'g3ssee-wat-026', chapterId:'g3ssee-water', difficulty:1, subsection:'water_cycle',
    question:'What is the WATER CYCLE?',
    options:['The continuous movement of water between the Earth\'s surface and the atmosphere','A bicycle that runs on water','A machine that purifies water','The amount of water in a glass'],
    answer:'The continuous movement of water between the Earth\'s surface and the atmosphere',
    hint:'This cycle never stops — water is always moving.',
    explanation:'The <b>water cycle (hydrological cycle)</b> is the continuous process by which water moves between the Earth\'s surface (oceans, rivers, land) and the atmosphere through evaporation, condensation and precipitation.' }),

  makeMCQ({ id:'g3ssee-wat-027', chapterId:'g3ssee-water', difficulty:1, subsection:'water_cycle',
    question:'Which is the FIRST step of the water cycle over the ocean?',
    options:['Evaporation — the sun heats ocean water and it turns into water vapour','Precipitation — rain falls from clouds','Condensation — water vapour forms clouds','Runoff — water flows back to the sea'],
    answer:'Evaporation — the sun heats ocean water and it turns into water vapour',
    hint:'The sun heats the water.',
    explanation:'The water cycle begins with <b>evaporation</b> — heat from the sun turns liquid water from oceans, lakes and rivers into <b>water vapour</b> that rises into the atmosphere.' }),

  makeMCQ({ id:'g3ssee-wat-028', chapterId:'g3ssee-water', difficulty:2, subsection:'water_cycle',
    question:'In the water cycle, clouds form when water vapour ___.',
    options:['Rises into the cooler upper atmosphere and condenses into tiny water droplets','Heats up and evaporates further','Falls as rain to the ground','Flows along rivers'],
    answer:'Rises into the cooler upper atmosphere and condenses into tiny water droplets',
    hint:'The upper atmosphere is cooler than near the ground.',
    explanation:'When water vapour rises into the cooler upper atmosphere, it <b>condenses</b> — tiny water droplets form around dust particles, creating <b>clouds</b>.' }),

  makeMCQ({ id:'g3ssee-wat-029', chapterId:'g3ssee-water', difficulty:1, subsection:'water_cycle',
    question:'What is PRECIPITATION?',
    options:['Water falling from clouds as rain, hail or snow','Water rising from the ocean','Cloud formation','Water in rivers'],
    answer:'Water falling from clouds as rain, hail or snow',
    hint:'Look out of the window when it rains.',
    explanation:'<b>Precipitation</b> is water that falls from clouds to the Earth\'s surface as <b>rain, hail, sleet or snow</b>. In Mauritius, most precipitation is as rain.' }),

  makeMCQ({ id:'g3ssee-wat-030', chapterId:'g3ssee-water', difficulty:2, subsection:'water_cycle',
    question:'After rain falls in Mauritius, some water flows along rivers and streams back to the ocean. This is called ___.',
    options:['Runoff (or surface run-off)','Evaporation','Condensation','Transpiration'],
    answer:'Runoff (or surface run-off)',
    hint:'Water flows downhill.',
    explanation:'<b>Runoff</b> is water that flows over the land surface into rivers, streams and eventually back to the ocean. In Mauritius, runoff from the central plateau flows down rivers like the Grand River North West.' }),

  makeMCQ({ id:'g3ssee-wat-031', chapterId:'g3ssee-water', difficulty:2, subsection:'water_cycle',
    question:'What role does the SUN play in the water cycle?',
    options:['The sun provides heat energy that powers evaporation, driving the whole cycle','The sun makes clouds form directly','The sun produces rain','The sun fills reservoirs'],
    answer:'The sun provides heat energy that powers evaporation, driving the whole cycle',
    hint:'Without the sun, the water cycle would stop.',
    explanation:'The <b>sun</b> is the engine of the water cycle — it provides the heat energy that causes <b>evaporation</b>. Without the sun\'s energy, water would not evaporate and the cycle would stop.' }),

  makeTF({ id:'g3ssee-wat-032', chapterId:'g3ssee-water', difficulty:1, subsection:'water_cycle',
    question:'The water cycle is a continuous, never-ending process.',
    answer:true,
    explanation:'Yes! The water cycle is <b>continuous</b> — water keeps moving between the Earth\'s surface and the atmosphere through evaporation, condensation and precipitation, over and over without stopping.' }),

  makeMCQ({ id:'g3ssee-wat-033', chapterId:'g3ssee-water', difficulty:2, subsection:'water_cycle',
    question:'Plants release water vapour through their leaves in a process called ___.',
    options:['Transpiration','Evaporation','Precipitation','Condensation'],
    answer:'Transpiration',
    hint:'This process adds to the water in the atmosphere.',
    explanation:'<b>Transpiration</b> is the process by which plants release water vapour through tiny pores (stomata) in their leaves. Together with evaporation, this is sometimes called <b>evapotranspiration</b> and adds water to the atmosphere.' }),

  makeMCQ({ id:'g3ssee-wat-034', chapterId:'g3ssee-water', difficulty:3, subsection:'water_cycle',
    question:'Mauritius gets most of its rainfall from ___.',
    options:['Moist winds from the Indian Ocean that drop rain on the mountains, especially in the wet season','Desert air bringing dust storms','The South Atlantic Ocean','Snowfall on the central plateau'],
    answer:'Moist winds from the Indian Ocean that drop rain on the mountains, especially in the wet season',
    hint:'Think about Mauritius\'s location and geography.',
    explanation:'Mauritius is located in the <b>Indian Ocean</b>. Moist south-east trade winds carry water vapour from the ocean; when these winds hit the mountains of the central plateau, the air rises, cools, and the water vapour <b>condenses</b> — causing heavy rainfall, especially in the wet season (November–April).' }),

  makeMCQ({ id:'g3ssee-wat-035', chapterId:'g3ssee-water', difficulty:2, subsection:'water_cycle',
    question:'Why do Mauritius\'s reservoirs fill up more in the WET SEASON than in the dry season?',
    options:['More rainfall means more runoff collecting in the reservoirs','Reservoirs are closer to the sea in the wet season','The government fills them manually','Hot weather causes more condensation'],
    answer:'More rainfall means more runoff collecting in the reservoirs',
    hint:'More rain = more water flowing into reservoirs.',
    explanation:'In the <b>wet season</b> (roughly November to April), Mauritius receives much more rainfall. More rain means more <b>runoff</b> — water flows over the land and into rivers that feed reservoirs like La Nicolière and Mare aux Vacoas.' }),

  makeMCQ({ id:'g3ssee-wat-036', chapterId:'g3ssee-water', difficulty:1, subsection:'water_cycle',
    question:'Some rain soaks into the ground and becomes GROUNDWATER. What is this process called?',
    options:['Infiltration (or percolation)','Evaporation','Runoff','Condensation'],
    answer:'Infiltration (or percolation)',
    hint:'Water moves downward through soil and rock.',
    explanation:'When rain soaks into the soil and moves down through rock, it becomes <b>groundwater</b>. This process is called <b>infiltration</b> or percolation. Groundwater can emerge as springs or be pumped from wells.' }),

  makeMCQ({ id:'g3ssee-wat-037', chapterId:'g3ssee-water', difficulty:2, subsection:'water_cycle',
    question:'Why is it important to PROTECT forests and vegetation in Mauritius\'s watersheds?',
    options:['Forests hold rainwater in the soil, reduce runoff, and help keep rivers and reservoirs flowing','Forests increase air pollution','Forests produce more rain by blocking the sun','Forests stop all evaporation'],
    answer:'Forests hold rainwater in the soil, reduce runoff, and help keep rivers and reservoirs flowing',
    hint:'Think about what happens to rain when it falls in a forest versus on bare rock.',
    explanation:'<b>Forests</b> in watershed areas slow rainwater runoff, allowing it to <b>infiltrate the soil</b> and recharge groundwater. Tree roots hold the soil, preventing erosion and keeping rivers and reservoirs supplied with clean water throughout the year.' }),

  makeTF({ id:'g3ssee-wat-038', chapterId:'g3ssee-water', difficulty:1, subsection:'water_cycle',
    question:'Water in the ocean is salty and cannot be used for drinking directly.',
    answer:true,
    explanation:'Yes! The oceans hold about 97% of Earth\'s water, but it is <b>salty (saline)</b> and cannot be drunk. Only <b>fresh water</b> — from rivers, lakes, groundwater and rain — is suitable for drinking.' }),

  makeMCQ({ id:'g3ssee-wat-039', chapterId:'g3ssee-water', difficulty:2, subsection:'water_cycle',
    question:'Which part of the water cycle happens when dew forms on leaves early in the morning?',
    options:['Condensation — water vapour in the air cools on the cold leaf surface and becomes liquid','Evaporation — water rises from the leaf','Precipitation — rain forms from the leaf','Runoff — water flows off the leaf'],
    answer:'Condensation — water vapour in the air cools on the cold leaf surface and becomes liquid',
    explanation:'<b>Dew</b> forms when water vapour in the air comes into contact with the cool surface of a leaf (or grass) at night or early morning and <b>condenses</b> into tiny droplets of liquid water.' }),

  makeMCQ({ id:'g3ssee-wat-040', chapterId:'g3ssee-water', difficulty:3, subsection:'water_cycle',
    question:'A class measures rainfall in Mauritius over a year and finds that much more rain falls in the wet season on the eastern side of the island than on the western side. What is the most likely reason?',
    options:['The mountains in the centre block the moist south-east trade winds, causing rain on the windward east side and leaving the west drier (rain shadow effect)','The western sea is deeper','The sun is stronger on the west side','The eastern side is closer to the equator'],
    answer:'The mountains in the centre block the moist south-east trade winds, causing rain on the windward east side and leaving the west drier (rain shadow effect)',
    hint:'The central plateau of Mauritius divides the island into windward and leeward sides.',
    explanation:'This is the <b>rain shadow effect</b>. South-east trade winds carry moisture from the Indian Ocean. When they hit the mountains of the central plateau, the air rises, cools, and <b>rain falls on the eastern (windward) side</b>. By the time the air descends on the western (leeward) side, it has lost most of its moisture, leaving the west drier.' })

);

})();
