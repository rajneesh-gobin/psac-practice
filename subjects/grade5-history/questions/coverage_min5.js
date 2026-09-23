'use strict';
(function(){
const G5HG_EXPL = {
  'g5hg-min5-water-0': "<b>Grand River South East</b> is one of the longest rivers in Mauritius, running down to the east coast.",
  'g5hg-min5-water-1': "Water always runs downhill, and on an island it keeps going until it reaches <b>the sea</b>.",
  'g5hg-min5-water-2': "People drink and wash with river water and animals live in it, so keeping it clean <b>protects people and wildlife</b> alike.",
  'g5hg-min5-water-3': "A river wears away the land it runs over, so a valley is shaped by <b>the river flowing through it</b>, over a very long time.",
  'g5hg-min5-coast-0': "<b>Coral reefs</b> lie offshore and break the force of the waves before they reach the beach, which is why the lagoon inside is calm.",
  'g5hg-min5-rocks-0': "Mauritius was built by volcanoes, and cooled lava forms <b>basalt</b> — the dark rock used in old walls all over the island.",
  'g5hg-min5-rocks-1': "<b>Rivers</b> carry fine soil and sand along and drop it where they slow down. That deposit is called alluvium.",
  'g5hg-min5-rocks-2': "<b>Rodrigues</b> has raised coral limestone, which is why it has caves such as Caverne Patate — something mainland Mauritius lacks.",
  'g5hg-min5-conserve-0': "Once a habitat or a resource is gone it cannot be made again, so conservation <b>protects habitats and resources</b> for the future.",
  'g5hg-min5-conserve-1': "<b>Planting native trees</b> restores the habitat that local animals already depend on, which imported species cannot do.",
  'g5hg-min5-conserve-2': "A nature reserve is land set aside and protected by law, so <b>plants and animals</b> in it are safe from clearing and building.",
  'g5hg-min5-conserve-3': "Children can do the everyday things: <b>avoid littering and save resources</b> such as water and electricity.",
  'g5hg-min5-scale-0': "Each centimetre stands for 2 km, so 3 cm stands for 3 × 2 = <b>6 km</b>.",
  'g5hg-min5-scale-1': "A map is much smaller than the real place, so the scale is what lets you <b>work out the real distance</b> from it.",
  'g5hg-min5-scale-2': "The scale is shown as <b>a line or a statement of distance</b>, usually near the edge of the map with the key.",
  'g5hg-min5-symbols-0': "The <b>key</b>, also called the legend, lists each symbol and says what it stands for.",
  'g5hg-min5-symbols-1': "Blue is used for water, so a blue line usually marks <b>a river</b>.",
  'g5hg-min5-symbols-2': "A map is small but the real place is large, so symbols <b>show features clearly in very little space</b>.",
  'g5hg-min5-season-0': "Mauritian summer runs from about <b>November to April</b>. It is the hot, wet season, and the cyclone season too.",
  'g5hg-min5-season-1': "Winter, from about May to October, is <b>cooler and drier</b>, with the south-east trade winds blowing steadily.",
  'g5hg-min5-impact-0': "Rain, drought and cyclones all decide whether a crop survives, so <b>weather affects crops</b> directly.",
  'g5hg-min5-impact-1': "A small fishing boat can be swamped or capsized in a heavy sea, so rough water <b>may be unsafe for boats</b>.",
  'g5hg-min5-impact-2': "Much of what tourists come for happens outdoors, so <b>visitors plan their activities using the forecast</b>.",
  'g5hg-min5-unesco-0': "UNESCO lists a site when it has <b>important cultural or natural value</b> — worth protecting for the whole world, not one country.",
  'g5hg-min5-unesco-1': "<b>Aapravasi Ghat</b> in Port Louis is where indentured labourers first set foot in Mauritius, which is why it is listed.",
};
const add=(id,c,s,q,o,a,h)=>STATIC_QUESTIONS.push(makeMCQ({id,chapterId:c,subsection:s,difficulty:2,question:q,options:o,answer:a,hint:h,explanation:G5HG_EXPL[id]||`<b>${a}</b> is correct.`}));
const rows=(p,c,s,data,opts,h)=>data.forEach(([q,a],i)=>add(`g5hg-min5-${p}-${i}`,c,s,q,opts,a,h));

// water — broken shared opts replaced with per-question options
add('g5hg-min5-water-0','natural-env','water','Which river is found in Mauritius?',
  ['Grand River South East','Loire','Amazon','Rhine'],'Grand River South East',
  'Think about flowing fresh water and how we care for it.');
add('g5hg-min5-water-1','natural-env','water','A river usually flows towards…',
  ['the sea, or the ocean','higher ground','mountain peaks','into the air'],'the sea, or the ocean',
  'Think about flowing fresh water and how we care for it.');
add('g5hg-min5-water-2','natural-env','water','Why should rivers be kept clean?',
  ['to protect people and wildlife','to make water flow faster','to prevent evaporation','to keep rivers cold'],'to protect people and wildlife',
  'Think about flowing fresh water and how we care for it.');
add('g5hg-min5-water-3','natural-env','water','A river valley is land shaped by…',
  ['a river flowing through','ocean tides','strong winds','heavy rainfall only'],'a river flowing through',
  'Think about flowing fresh water and how we care for it.');

// coast — one question with its own correct distractors, kept as rows()
rows('coast','natural-env','coast',[['What protects much of the Mauritian coast from strong waves?','coral reefs']],['coral reefs','sand dunes','sugar cane fields','mountain slopes'],'Think about the lagoon and the reef.');

// rocks — broken shared opts replaced with per-question options
add('g5hg-min5-rocks-0','volcanism','rocks_soil','What rock is common in volcanic Mauritius?',
  ['basalt','granite','sandstone','marble'],'basalt',
  'Use the clues about volcanoes, rivers and Rodrigues.');
add('g5hg-min5-rocks-1','volcanism','rocks_soil','What are alluvium deposits carried by?',
  ['rivers','glaciers','wind','volcanic eruptions'],'rivers',
  'Use the clues about volcanoes, rivers and Rodrigues.');
add('g5hg-min5-rocks-2','volcanism','rocks_soil','Limestone is especially important in…',
  ['Rodrigues','Port Louis','Mahebourg','Curepipe'],'Rodrigues',
  'Use the clues about volcanoes, rivers and Rodrigues.');

// conservation — broken shared opts replaced with per-question options
add('g5hg-min5-conserve-0','env-problems','conservation','Why do we conserve natural places?',
  ['to protect habitats and resources','to build more hotels','to clear land for farming','to increase tourist numbers'],'to protect habitats and resources',
  'Choose the action that protects nature for the future.');
add('g5hg-min5-conserve-1','env-problems','conservation','Which action helps conservation?',
  ['planting native trees','cutting down old trees','draining wetlands','introducing new animal species'],'planting native trees',
  'Choose the action that protects nature for the future.');
add('g5hg-min5-conserve-2','env-problems','conservation','Why are nature reserves important?',
  ['they protect plants and animals','they provide building land','they generate electricity','they store sugar cane'],'they protect plants and animals',
  'Choose the action that protects nature for the future.');
add('g5hg-min5-conserve-3','env-problems','conservation','What can children do to help conservation?',
  ['avoid littering and save resources','use more electricity','leave taps running','buy more plastic packaging'],'avoid littering and save resources',
  'Choose the action that protects nature for the future.');

// map scale — broken shared opts replaced with per-question options
add('g5hg-min5-scale-0','map-skills','scale','A map scale of 1 cm = 2 km means 3 cm represents…',
  ['6 km','3 km','4 km','9 km'],'6 km',
  'Multiply the map distance by the scale.');
add('g5hg-min5-scale-1','map-skills','scale','Why is a scale useful?',
  ['it helps calculate real distance','it shows weather patterns','it names every city','it shows the depth of rivers'],'it helps calculate real distance',
  'Multiply the map distance by the scale.');
add('g5hg-min5-scale-2','map-skills','scale','Which map part shows the scale?',
  ["a line or statement of distance","the key or legend of symbols","the title written at the top","the compass rose showing north"],'a line or statement of distance',
  'Multiply the map distance by the scale.');

// map symbols — broken shared opts replaced with per-question options
add('g5hg-min5-symbols-0','map-skills','symbols','Where do you find the meaning of a map symbol?',
  ['the key or legend','the title','the scale bar','the compass rose'],'the key or legend',
  'Use the map key to understand symbols.');
add('g5hg-min5-symbols-1','map-skills','symbols','A blue line on a map often represents…',
  ['a river','a road','a railway','a boundary'],'a river',
  'Use the map key to understand symbols.');
add('g5hg-min5-symbols-2','map-skills','symbols','Why do maps use symbols?',
  ["to show features clearly in little space","to list the name of every single building","to make the map look bright and colourful","to mark the exact weather on any given day"],'to show features clearly in little space',
  'Use the map key to understand symbols.');

// seasons — broken shared opts replaced with per-question options
add('g5hg-min5-season-0','g5ge-weather','seasons','Mauritian summer usually lasts from…',
  ['November to April','April to October','June to September','January to June'],'November to April',
  'Recall Mauritius\'s two main seasons.');
add('g5hg-min5-season-1','g5ge-weather','seasons','Mauritian winter is generally…',
  ['cooler and drier','hotter and wetter','cold and snowy','very windy and stormy'],'cooler and drier',
  'Recall Mauritius\'s two main seasons.');

// weather impact — broken shared opts replaced with per-question options
add('g5hg-min5-impact-0','g5ge-weather','impact','Why do farmers watch weather forecasts?',
  ['weather affects crops','to plan their holidays','to set market prices','to decide on school hours'],'weather affects crops',
  'Think about farming, fishing and visitors.');
add('g5hg-min5-impact-1','g5ge-weather','impact','Why can rough seas stop fishing?',
  ['it may be unsafe for boats','fish swim deeper in calm water','the wind blows away the fish','heavy rain fills the boats'],'it may be unsafe for boats',
  'Think about farming, fishing and visitors.');
add('g5hg-min5-impact-2','g5ge-weather','impact','Why does weather matter for tourism?',
  ['visitors plan outdoor activities using forecasts','tourists always stay indoors','airlines cancel all flights in sunshine','hotels close during dry weather'],'visitors plan outdoor activities using forecasts',
  'Think about farming, fishing and visitors.');

// UNESCO — broken shared opts replaced with per-question options
add('g5hg-min5-unesco-0','g5enr-landmarks','unesco','A UNESCO World Heritage Site is recognised for…',
  ['important cultural or natural value','being the largest country','having the most tourists','producing the most food'],'important cultural or natural value',
  'Think about heritage that should be understood and protected.');
add('g5hg-min5-unesco-1','g5enr-landmarks','unesco','Aapravasi Ghat is important because it is linked to…',
  ['the arrival of indentured labourers','the first French settlers','the independence of Mauritius','the arrival of the Dutch'],'the arrival of indentured labourers',
  'Think about heritage that should be understood and protected.');
})();
