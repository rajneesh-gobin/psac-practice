'use strict';
(function () {

// Grade 3 SSEE — Unit 7: Water
// Source: MIE SSEE Grade 3 Part 2 pp.62-95
// IDs: g3ssee-wat-001 onwards

// ── states_of_water (001-030) ─────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g3ssee-wat-001', chapterId:'g3ssee-water', difficulty:1, subsection:'states_of_water',
    question:'Water can exist in THREE states. What are they?',
    options:['Liquid, solid and gas','Liquid, cloud and ice','Liquid, oil and steam','Water, rain and snow'],
    answer:'Liquid, solid and gas',
    hint:'Think about water in a glass, ice in a freezer, and steam from a kettle.',
    explanation:'Water exists as a <b>liquid</b> (water), a <b>solid</b> (ice) and a <b>gas</b> (water vapour or steam) — the same substance in three different states. Cloud, rain, snow and oil are not states of matter.'}),

  makeMCQ({ id:'g3ssee-wat-002', chapterId:'g3ssee-water', difficulty:1, subsection:'states_of_water',
    question:'What is water in its SOLID state called?',
    options:['Ice','Steam','Rain','Vapour'],
    answer:'Ice',
    hint:'What forms in the freezer?',
    explanation:'Frozen water — cooled below 0°C — is a solid called <b>ice</b>. Steam and vapour are the gas state, and rain is liquid.'}),

  makeMCQ({ id:'g3ssee-wat-003', chapterId:'g3ssee-water', difficulty:1, subsection:'states_of_water',
    question:'What happens to water when it is HEATED strongly?',
    options:['It boils and turns into steam','It freezes into hard solid ice','It becomes much heavier to lift','It turns a bright green colour'],
    answer:'It boils and turns into steam',
    hint:'Think about water boiling in a pot.',
    explanation:'Heated to 100°C, water <b>boils</b> and changes into water vapour (steam) — the gas state. Heating never freezes water or changes its weight or its colour.'}),

  makeMCQ({ id:'g3ssee-wat-004', chapterId:'g3ssee-water', difficulty:1, subsection:'states_of_water',
    question:'What happens to ice when it is WARMED?',
    options:['It melts and becomes liquid water','It becomes steam almost at once','It becomes much heavier to lift','It turns into a different substance'],
    answer:'It melts and becomes liquid water',
    hint:'What happens to an ice cube left on the counter?',
    explanation:'Warmed above 0°C, ice <b>melts</b> into liquid water. It is still water — melting changes the state, not the substance.'}),

  makeTF({ id:'g3ssee-wat-005', chapterId:'g3ssee-water', difficulty:1, subsection:'states_of_water',
    question:'Water vapour (steam) is invisible.',
    answer:true,
    explanation:'Yes! <b>Water vapour is a gas and is invisible.</b> What we see as "steam" rising from a kettle is actually tiny droplets of liquid water that form as the vapour cools — the vapour itself is invisible.' }),

  makeMCQ({ id:'g3ssee-wat-006', chapterId:'g3ssee-water', difficulty:2, subsection:'states_of_water',
    question:'What is EVAPORATION?',
    options:['Liquid water turning into vapour','Rain falling down from the clouds','Water freezing hard into solid ice','Water flowing along a wide river'],
    answer:'Liquid water turning into vapour',
    hint:'This is how puddles disappear on a sunny day.',
    explanation:'<b>Evaporation</b> is liquid water turning into water vapour. It happens when water is heated — by the sun, for instance — and the vapour rises into the air.'}),

  makeMCQ({ id:'g3ssee-wat-007', chapterId:'g3ssee-water', difficulty:2, subsection:'states_of_water',
    question:'What is CONDENSATION?',
    options:['Water vapour cooling into liquid','Rain forming inside the clouds','Water boiling in a metal pan','Ice melting on a warm day'],
    answer:'Water vapour cooling into liquid',
    hint:'Think about water droplets forming on a cold glass.',
    explanation:'<b>Condensation</b> is the opposite of evaporation: water vapour cools and turns back into liquid droplets. That is how dew forms on leaves and how drops appear on a cold glass.'}),

  makeMCQ({ id:'g3ssee-wat-008', chapterId:'g3ssee-water', difficulty:2, subsection:'states_of_water',
    question:'Why do water droplets appear on the OUTSIDE of a cold bottle taken from the fridge?',
    options:['Water vapour condensed on the cold glass','Water seeped out through the glass','Rain fell on the outside of the bottle','The bottle is leaking from the cap'],
    answer:'Water vapour condensed on the cold glass',
    hint:'The cold surface cools the air touching it.',
    explanation:'Warm air touching the cold bottle is cooled, so the <b>water vapour</b> in it condenses into liquid droplets on the outside. The glass does not leak and the water does not come from inside.'}),

  makeMCQ({ id:'g3ssee-wat-009', chapterId:'g3ssee-water', difficulty:1, subsection:'states_of_water',
    question:'At what temperature does water FREEZE?',
    options:['0°C','50°C','10°C','100°C'],
    answer:'0°C',
    explanation:'Water freezes — turns from liquid to solid ice — at <b>0°C</b> (zero degrees Celsius).'}),

  makeMCQ({ id:'g3ssee-wat-010', chapterId:'g3ssee-water', difficulty:1, subsection:'states_of_water',
    question:'At what temperature does water BOIL?',
    options:['100°C','50°C','37°C','0°C'],
    answer:'100°C',
    explanation:'At sea level water boils — turns from liquid to gas — at <b>100°C</b> (one hundred degrees Celsius).'}),

  makeMCQ({ id:'g3ssee-wat-011', chapterId:'g3ssee-water', difficulty:2, subsection:'states_of_water',
    question:'A puddle forms after rain. The sun comes out and the puddle disappears. What happened?',
    options:['The water evaporated in the sun','The ground soaked it all up','Animals drank all of the water','The water turned into solid ice'],
    answer:'The water evaporated in the sun',
    hint:'The sun provides heat energy.',
    explanation:'Heat from the sun made the puddle <b>evaporate</b>: the water turned into vapour and rose into the air. It did not vanish — it changed state.'}),

  makeMCQ({ id:'g3ssee-wat-012', chapterId:'g3ssee-water', difficulty:3, subsection:'states_of_water',
    question:'Sipho puts wet washing on the line on a sunny, windy day. The clothes dry faster than on a still, cloudy day. Which TWO factors help the water evaporate faster?',
    options:['Heat from the sun and moving wind','Only the colour of the wet clothes','Only the weight of the wet clothes','Only the type of fabric being used'],
    answer:'Heat from the sun and moving wind',
    hint:'What increases the rate of evaporation?',
    explanation:'Heat gives the water enough energy to evaporate, and <b>wind</b> carries the vapour away from the clothes so still more can evaporate. Both together make the washing dry faster.'}),

  makeTF({ id:'g3ssee-wat-013', chapterId:'g3ssee-water', difficulty:1, subsection:'states_of_water',
    question:'Water is the only substance that exists in three states in nature.',
    answer:false,
    explanation:'Many substances can exist in solid, liquid and gas states. However, water is <b>unique</b> in being commonly found in all three states naturally on Earth.' }),

  makeMCQ({ id:'g3ssee-wat-014', chapterId:'g3ssee-water', difficulty:2, subsection:'states_of_water',
    question:'When water vapour rises into the cold upper atmosphere, it condenses to form ___.',
    options:['Clouds','Rivers','Wind','Dust'],
    answer:'Clouds',
    hint:'Look up at the sky on a cloudy day.',
    explanation:'Rising water vapour cools in the upper atmosphere and condenses on tiny dust particles into droplets, forming <b>clouds</b>.'}),

  makeMCQ({ id:'g3ssee-wat-015', chapterId:'g3ssee-water', difficulty:2, subsection:'states_of_water',
    question:'Snow and hail are forms of water in its ___ state.',
    options:['Solid','Liquid','Gas','All three'],
    answer:'Solid',
    explanation:'<b>Snow</b> (frozen water crystals) and <b>hail</b> (balls of ice) are both forms of water in the <b>solid</b> state. They form when water freezes in clouds or falls through freezing air.' }),

// ── uses_of_water (016-045) ───────────────────────────────────────────────

  makeMCQ({ id:'g3ssee-wat-016', chapterId:'g3ssee-water', difficulty:1, subsection:'uses_of_water',
    question:'Which of the following is a USE of water?',
    options:['Drinking to stay healthy','Breathing air in and out','Keeping warm on a cold night','Making a very loud noise'],
    answer:'Drinking to stay healthy',
    hint:'Our bodies are mostly water.',
    explanation:'Drinking water is the most vital use — our bodies need it to work. Water is also used for cooking, washing and irrigation. We breathe air, not water.'}),

  makeTF({ id:'g3ssee-wat-017', chapterId:'g3ssee-water', difficulty:1, subsection:'uses_of_water',
    question:'Plants need water to grow.',
    answer:true,
    explanation:'Yes! Plants need <b>water</b> for photosynthesis, to transport nutrients from soil to leaves, and to keep their cells firm and healthy. Without water, plants wilt and die.' }),

  makeMCQ({ id:'g3ssee-wat-018', chapterId:'g3ssee-water', difficulty:1, subsection:'uses_of_water',
    question:'Farmers in Mauritius use water to ___.',
    options:['Irrigate their crops in the fields','Build new roads across the island','Clean the factory machines only','Make electricity for the village'],
    answer:'Irrigate their crops in the fields',
    hint:'Plants need water to grow.',
    explanation:'Farmers <b>irrigate</b> their crops — they water the fields so the plants grow. In Mauritius sugar cane, vegetables and tropical fruit are all irrigated.'}),

  makeMCQ({ id:'g3ssee-wat-019', chapterId:'g3ssee-water', difficulty:2, subsection:'uses_of_water',
    question:'In Mauritius, water from reservoirs such as La Nicolière and Mare aux Vacoas is used for ___.',
    options:['Supplying drinking water to homes','Producing food in the fields alone','Generating wind power on the coast','Making fire for the sugar factory'],
    answer:'Supplying drinking water to homes',
    hint:'These are Mauritius\'s main water storage locations.',
    explanation:'La Nicolière and Mare aux Vacoas store fresh water. It is treated and piped to homes, schools, hospitals and businesses as <b>drinking water</b>.'}),

  makeMCQ({ id:'g3ssee-wat-020', chapterId:'g3ssee-water', difficulty:1, subsection:'uses_of_water',
    question:'How is water used in COOKING?',
    options:['For boiling, steaming and washing food','Only for washing up the dirty plates','Only for drinking alongside the meal','Only for making ice cubes in the fridge'],
    answer:'For boiling, steaming and washing food',
    explanation:'Water is used all through cooking — boiling rice, steaming vegetables, washing food and making drinks such as tea.'}),

  makeMCQ({ id:'g3ssee-wat-021', chapterId:'g3ssee-water', difficulty:2, subsection:'uses_of_water',
    question:'Hydroelectric power stations use ___ to generate electricity.',
    options:['The force of flowing water','The heat of the bright sun','The burning of black coal','The wind blowing on sails'],
    answer:'The force of flowing water',
    hint:'Think about a water wheel.',
    explanation:'<b>Hydroelectric</b> power uses the force of flowing or falling water to spin turbines, which drive generators. Mauritius uses some hydroelectric power alongside other sources.'}),

  makeTF({ id:'g3ssee-wat-022', chapterId:'g3ssee-water', difficulty:1, subsection:'uses_of_water',
    question:'Animals need water to survive.',
    answer:true,
    explanation:'Yes! All animals need <b>water</b> to survive. Water makes up a large part of an animal\'s body and is essential for digestion, temperature regulation and all body processes.' }),

  makeMCQ({ id:'g3ssee-wat-023', chapterId:'g3ssee-water', difficulty:2, subsection:'uses_of_water',
    question:'How do fish and other aquatic animals use water?',
    options:['It is their habitat and holds their oxygen','They drink it exactly as human beings do','They use it only to build their own nests','They swim through it only to look for food'],
    answer:'It is their habitat and holds their oxygen',
    explanation:'For fish, water is their <b>habitat</b> — where they live and move — and their gills take dissolved oxygen straight out of it.'}),

  makeMCQ({ id:'g3ssee-wat-024', chapterId:'g3ssee-water', difficulty:1, subsection:'uses_of_water',
    question:'Why is it important to SAVE water in Mauritius?',
    options:['Fresh water is limited, so wasting leaves less','Only the farmers really need to save water','Only the factories really need to save water','Water is so plentiful that saving is pointless'],
    answer:'Fresh water is limited, so wasting leaves less',
    hint:'Think about dry seasons in Mauritius.',
    explanation:'Mauritius is surrounded by sea, but <b>fresh</b> water is limited and unevenly spread. In dry seasons some areas run short, so saving water matters for everyone — homes, farms and factories alike.'}),

  makeMCQ({ id:'g3ssee-wat-025', chapterId:'g3ssee-water', difficulty:2, subsection:'uses_of_water',
    question:'Which of the following is a good way to SAVE WATER at home?',
    options:['Turning the tap off while brushing teeth','Leaving the garden hose running all day','Washing one item at a time in the machine','Taking a very long shower every morning'],
    answer:'Turning the tap off while brushing teeth',
    explanation:'Turning the tap off while you brush saves several litres each time. Other good ways are fixing leaks, running full loads and collecting rainwater.'}),

// ── water_cycle (026-075) ─────────────────────────────────────────────────

  makeMCQ({ id:'g3ssee-wat-026', chapterId:'g3ssee-water', difficulty:1, subsection:'water_cycle',
    question:'What is the WATER CYCLE?',
    options:['The endless movement of water on Earth','A bicycle that runs on water power alone','The amount of water inside a full glass','A machine that purifies the dirty water'],
    answer:'The endless movement of water on Earth',
    hint:'This cycle never stops — water is always moving.',
    explanation:'The <b>water cycle</b> is the endless movement of water between the Earth\'s surface and the atmosphere, through evaporation, condensation and precipitation.'}),

  makeMCQ({ id:'g3ssee-wat-027', chapterId:'g3ssee-water', difficulty:1, subsection:'water_cycle',
    question:'Which is the FIRST step of the water cycle over the ocean?',
    options:['Evaporation — the sun heats the sea','Condensation — vapour forms clouds','Precipitation — rain falls to earth','Runoff — water flows back to sea'],
    answer:'Evaporation — the sun heats the sea',
    hint:'The sun heats the water.',
    explanation:'The cycle begins with <b>evaporation</b>: heat from the sun turns liquid water from the ocean into vapour, which rises into the atmosphere.'}),

  makeMCQ({ id:'g3ssee-wat-028', chapterId:'g3ssee-water', difficulty:2, subsection:'water_cycle',
    question:'In the water cycle, clouds form when water vapour ___.',
    options:['Rises, cools and condenses into droplets','Flows along the rivers down to the sea','Falls as heavy rain onto the dry ground','Heats up and then evaporates even more'],
    answer:'Rises, cools and condenses into droplets',
    hint:'The upper atmosphere is cooler than near the ground.',
    explanation:'Water vapour rises into the cooler upper atmosphere and <b>condenses</b> on tiny dust particles into droplets — and a mass of those droplets is a cloud.'}),

  makeMCQ({ id:'g3ssee-wat-029', chapterId:'g3ssee-water', difficulty:1, subsection:'water_cycle',
    question:'What is PRECIPITATION?',
    options:['Water falling as rain, hail or snow','The forming of the clouds in the sky','Water rising up out of the warm ocean','Water flowing along in the wide rivers'],
    answer:'Water falling as rain, hail or snow',
    hint:'Look out of the window when it rains.',
    explanation:'<b>Precipitation</b> is water falling from clouds to the ground as rain, hail, sleet or snow. In Mauritius almost all of it is rain.'}),

  makeMCQ({ id:'g3ssee-wat-030', chapterId:'g3ssee-water', difficulty:2, subsection:'water_cycle',
    question:'After rain falls in Mauritius, some water flows along rivers and streams back to the ocean. This is called ___.',
    options:['Runoff','Transpiration','Condensation','Evaporation'],
    answer:'Runoff',
    hint:'Water flows downhill.',
    explanation:'<b>Runoff</b> is water flowing over the land into streams and rivers and back to the ocean. In Mauritius runoff from the central plateau feeds rivers such as the Grand River North West.'}),

  makeMCQ({ id:'g3ssee-wat-031', chapterId:'g3ssee-water', difficulty:2, subsection:'water_cycle',
    question:'What role does the SUN play in the water cycle?',
    options:['It gives the heat that drives evaporation','It produces the rain inside the clouds','It fills the reservoirs with fresh water','It makes the clouds form all by itself'],
    answer:'It gives the heat that drives evaporation',
    hint:'Without the sun, the water cycle would stop.',
    explanation:'The sun is the engine of the water cycle: its <b>heat energy</b> causes evaporation. Without it, water would not evaporate and the cycle would stop.'}),

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
    options:['Moist winds from the Indian Ocean','Snowfall on the central plateau','Cold air from the South Atlantic','Desert winds bringing dust storms'],
    answer:'Moist winds from the Indian Ocean',
    hint:'Think about Mauritius\'s location and geography.',
    explanation:'Moist south-east trade winds carry water vapour off the <b>Indian Ocean</b>. When they meet the mountains of the central plateau the air rises, cools and the vapour condenses — heavy rain, especially in the wet season (November–April).'}),

  makeMCQ({ id:'g3ssee-wat-035', chapterId:'g3ssee-water', difficulty:2, subsection:'water_cycle',
    question:'Why do Mauritius\'s reservoirs fill up more in the WET SEASON than in the dry season?',
    options:['More rain means more runoff into them','Hot weather causes more condensation','The government fills them by hand','They move closer to the sea in summer'],
    answer:'More rain means more runoff into them',
    hint:'More rain = more water flowing into reservoirs.',
    explanation:'In the wet season (roughly November to April) Mauritius gets far more rain, so more <b>runoff</b> flows over the land and down the rivers that feed reservoirs such as La Nicolière and Mare aux Vacoas.'}),

  makeMCQ({ id:'g3ssee-wat-036', chapterId:'g3ssee-water', difficulty:1, subsection:'water_cycle',
    question:'Some rain soaks into the ground and becomes GROUNDWATER. What is this process called?',
    options:['Infiltration','Condensation','Transpiration','Evaporation'],
    answer:'Infiltration',
    hint:'Water moves downward through soil and rock.',
    explanation:'Rain that soaks into the soil and works down through the rock becomes groundwater; the process is called <b>infiltration</b> (or percolation). Groundwater can emerge as springs or be pumped from wells.'}),

  makeMCQ({ id:'g3ssee-wat-037', chapterId:'g3ssee-water', difficulty:2, subsection:'water_cycle',
    question:'Why is it important to PROTECT forests and vegetation in Mauritius\'s watersheds?',
    options:['They hold rainwater and reduce runoff','They make more rain by blocking the sun','They add to the air pollution in towns','They stop evaporation from happening'],
    answer:'They hold rainwater and reduce runoff',
    hint:'Think about what happens to rain when it falls in a forest versus on bare rock.',
    explanation:'Watershed forests slow runoff so that rain soaks in and recharges the groundwater, and tree roots hold the soil against erosion. That keeps rivers and reservoirs supplied with clean water all year.'}),

  makeTF({ id:'g3ssee-wat-038', chapterId:'g3ssee-water', difficulty:1, subsection:'water_cycle',
    question:'Water in the ocean is salty and cannot be used for drinking directly.',
    answer:true,
    explanation:'Yes! The oceans hold about 97% of Earth\'s water, but it is <b>salty (saline)</b> and cannot be drunk. Only <b>fresh water</b> — from rivers, lakes, groundwater and rain — is suitable for drinking.' }),

  makeMCQ({ id:'g3ssee-wat-039', chapterId:'g3ssee-water', difficulty:2, subsection:'water_cycle',
    question:'Which part of the water cycle happens when dew forms on leaves early in the morning?',
    options:['Condensation — vapour cools on the leaf','Precipitation — rain forms on the leaf','Evaporation — water rises off the leaf','Runoff — water flows away off the leaf'],
    answer:'Condensation — vapour cools on the leaf',
    explanation:'Dew is <b>condensation</b>: water vapour in the air touches the cold surface of a leaf overnight and turns into tiny liquid droplets.'}),

  makeMCQ({ id:'g3ssee-wat-040', chapterId:'g3ssee-water', difficulty:3, subsection:'water_cycle',
    question:'A class measures rainfall in Mauritius over a year and finds that much more rain falls in the wet season on the eastern side of the island than on the western side. What is the most likely reason?',
    options:['The central mountains block the moist winds','The sun is much stronger on the west side','The sea to the west of the island is deeper','The eastern side lies closer to the equator'],
    answer:'The central mountains block the moist winds',
    hint:'The central plateau of Mauritius divides the island into windward and leeward sides.',
    explanation:'This is the <b>rain shadow</b> effect. South-east trade winds carry moisture off the Indian Ocean; when they meet the mountains of the central plateau the air rises, cools and drops its rain on the eastern (windward) side. By the time the air sinks again on the western (leeward) side it has lost most of its moisture, so the west is drier.'})

);

})();
