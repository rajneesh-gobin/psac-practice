'use strict';
// Grade 4 History & Geography — Chapter: Working with Maps
// IDs format: g4h-map-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4h-map-001', chapterId:'g4hist-maps', difficulty:1,
    question:'What is a MAP?',
    options:[
      'A photograph taken from a plane',
      'A flat drawing that shows a place or area from above',
      'A list of places in alphabetical order',
      'A 3-D model of a country'
    ],
    answer:'A flat drawing that shows a place or area from above',
    hint:'A map is drawn as if you are looking down at the land from above.',
    explanation:'A <b>map</b> is a flat (2-dimensional) drawing or diagram that represents an area of land or sea as seen from above. Maps use symbols, colours and lines to show features like roads, rivers, mountains and buildings. Maps can show the whole world, a country, or just a small area.' }),

  makeMCQ({ id:'g4h-map-002', chapterId:'g4hist-maps', difficulty:1,
    question:'What does the KEY (or LEGEND) on a map show?',
    options:[
      'The name of the person who drew the map',
      'The date the map was made',
      'What each symbol or colour on the map means',
      'The distance between two cities'
    ],
    answer:'What each symbol or colour on the map means',
    hint:'The key is like a "dictionary" for the map\'s symbols.',
    explanation:'The <b>key</b> (or legend) on a map explains what each symbol, colour and line represents. For example: a blue line might mean a river, a green area might mean a forest, a red line might mean a main road. Without the key, you cannot correctly read a map.' }),

  makeMCQ({ id:'g4h-map-003', chapterId:'g4hist-maps', difficulty:1,
    question:'On most maps, which direction is shown at the TOP of the map?',
    options:['South','East','West','North'],
    answer:'North',
    hint:'Most maps are drawn with this direction at the top. A compass arrow usually points this way.',
    explanation:'By convention, most maps are drawn with <b>North at the top</b>. This means South is at the bottom, East is to the right and West is to the left. A compass rose (direction symbol) on the map usually shows this arrangement. Some special maps are drawn differently, but North-at-top is the standard.' }),

  makeTF({ id:'g4h-map-004', chapterId:'g4hist-maps', difficulty:1,
    question:'A compass helps you find directions (North, South, East, West).',
    answer:true,
    hint:'A compass has a magnetised needle that always points to magnetic North.',
    explanation:'<b>True.</b> A compass is a tool used to find directions. Its magnetised needle always points towards <b>magnetic North</b>. Once you know where North is, you can find South (opposite), East (right of North) and West (left of North). Compasses are used in navigation, hiking and reading maps.' }),

  makeMCQ({ id:'g4h-map-005', chapterId:'g4hist-maps', difficulty:2,
    question:'What are the FOUR main compass directions?',
    options:[
      'Up, Down, Left, Right',
      'North, South, East, West',
      'Top, Bottom, Front, Back',
      'Forward, Backward, Sideways, Diagonal'
    ],
    answer:'North, South, East, West',
    hint:'These are abbreviated as N, S, E and W.',
    explanation:'The four main compass directions are <b>North (N), South (S), East (E) and West (W)</b>. A helpful memory trick: "Never Eat Soggy Waffles" — N, E, S, W going clockwise. Between these are the intercardinal directions: NE (North-East), NW (North-West), SE (South-East), SW (South-West).' }),

  makeMCQ({ id:'g4h-map-006', chapterId:'g4hist-maps', difficulty:2,
    question:'On a compass, what direction is DIRECTLY OPPOSITE to North?',
    options:['East','West','South','North-East'],
    answer:'South',
    hint:'Think of a compass — North is at the top. What is at the bottom?',
    explanation:'"<b>South</b>" is directly opposite North on a compass. The four main directions in order clockwise: North (top) → East (right) → South (bottom) → West (left). North and South are opposites; East and West are opposites.' }),

  makeMCQ({ id:'g4h-map-007', chapterId:'g4hist-maps', difficulty:2,
    question:'What does the SCALE on a map tell you?',
    options:[
      'The title of the map',
      'The name of the mapmaker',
      'The relationship between distances on the map and real distances on the ground',
      'The colours used on the map'
    ],
    answer:'The relationship between distances on the map and real distances on the ground',
    hint:'Because a map is smaller than the real place, scale tells you how much smaller.',
    explanation:'The <b>scale</b> on a map shows the relationship between the map\'s measurements and the actual real-world distances. For example, a scale of "1 cm = 1 km" means every centimetre on the map represents 1 kilometre in real life. Scale allows you to estimate real distances using a ruler on the map.' }),

  makeMCQ({ id:'g4h-map-008', chapterId:'g4hist-maps', difficulty:2,
    question:'On a map, you travel from Town A to Town B. The map scale is 1 cm = 5 km. The distance on the map is 4 cm. What is the REAL distance?',
    options:['4 km','9 km','20 km','5 km'],
    answer:'20 km',
    hint:'Multiply the map distance by the scale: 4 cm × 5 km.',
    explanation:'Real distance = map distance × scale. 4 cm × 5 km = <b>20 km</b>. Scale is used to calculate real distances from map measurements. Always check the scale before measuring distances on a map.' }),

  makeMCQ({ id:'g4h-map-009', chapterId:'g4hist-maps', difficulty:3,
    question:'A map has a title, a key, a scale and a compass rose. Priya wants to find a forest on the map. Which part of the map should she look at FIRST?',
    options:[
      'The scale — to measure the size of the forest',
      'The compass rose — to find which direction the forest is',
      'The key — to find out which symbol or colour represents a forest',
      'The title — to check the map\'s name'
    ],
    answer:'The key — to find out which symbol or colour represents a forest',
    hint:'Before you can find a feature on a map, you need to know what symbol represents it.',
    explanation:'Priya should look at the <b>key first</b> to find out which symbol or colour represents a forest. Once she knows the forest symbol (e.g. green area or a tree icon), she can scan the map to find it. The key is the essential starting point for reading any map feature.' }),

  makeMCQ({ id:'g4h-map-010', chapterId:'g4hist-maps', difficulty:4,
    question:'A map of Mauritius shows: Port Louis in the NORTH-WEST, Mahébourg in the SOUTH-EAST, and Curepipe in the CENTRE. If you travel from Mahébourg to Port Louis, in which direction are you going?',
    options:[
      'From North-West to South-East (South-Eastwards)',
      'From South-East to North-West (North-Westwards)',
      'From East to West (Westwards)',
      'From South to North (Northwards)'
    ],
    answer:'From South-East to North-West (North-Westwards)',
    hint:'You are leaving South-East (Mahébourg) and heading towards North-West (Port Louis). What direction is that?',
    explanation:'Mahébourg is in the <b>South-East</b> and Port Louis is in the <b>North-West</b>. Travelling FROM South-East TO North-West means you are travelling in a <b>North-Westerly direction</b>. The direction of travel is named by where you are going TO, not where you are coming from. This is a key compass direction skill.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4h-map-011', chapterId:'g4hist-maps', difficulty:1,
    question:'NE (North-East) is located exactly between which two cardinal directions?',
    options:['North and West','South and East','North and East','South and West'],
    answer:'North and East',
    hint:'"N" is for North, "E" is for East. NE is halfway between them.',
    explanation:'"<b>NE</b>" stands for <b>North-East</b>, located exactly halfway between <b>North</b> and <b>East</b>. The four intermediate (intercardinal) directions are: NE (between N and E), SE (between S and E), SW (between S and W), and NW (between N and W). These are sometimes called the four "ordinal" directions.' }),

  makeMCQ({ id:'g4h-map-012', chapterId:'g4hist-maps', difficulty:1,
    question:'On a grid map, what is a grid reference used for?',
    options:['To show the height of the land','To find the exact location of a place using letters and numbers','To measure distances between towns','To show the weather of different areas'],
    answer:'To find the exact location of a place using letters and numbers',
    hint:'If a town is in column C, row 3, its grid reference is C3.',
    explanation:'A <b>grid reference</b> uses a system of <b>letters and numbers</b> to identify the exact location of a place on a map. The columns are usually labelled with letters (A, B, C…) and the rows with numbers (1, 2, 3…). For example, "B3" means column B, row 3. Grid references make it easy to find and describe any location on a map accurately.' }),

  makeMCQ({ id:'g4h-map-013', chapterId:'g4hist-maps', difficulty:1,
    question:'What do contour lines on a map show?',
    options:['The direction of rivers','The location of roads','The height (elevation) of the land','The boundaries between countries'],
    answer:'The height (elevation) of the land',
    hint:'Contour lines connect all points at the same height above sea level.',
    explanation:'<b>Contour lines</b> show the <b>height (elevation) of the land</b> above sea level. Each line connects all points at the same altitude. If contour lines are <b>close together</b>, the land is steep. If they are <b>far apart</b>, the land is gently sloping. By reading contour lines, you can tell if an area is a mountain, a valley, a plateau, or flat ground.' }),

  makeMCQ({ id:'g4h-map-014', chapterId:'g4hist-maps', difficulty:2,
    question:'A PHYSICAL map shows which of the following?',
    options:['Country borders and capital cities','Natural features like mountains, rivers, plains, and oceans','Where schools and hospitals are located','Which areas have the most people'],
    answer:'Natural features like mountains, rivers, plains, and oceans',
    hint:'Think about natural features of the Earth — landforms and water.',
    explanation:'A <b>physical map</b> shows <b>natural features</b> of the Earth\'s surface: mountains, rivers, lakes, plains, coasts, and oceans. Physical maps often use colour to show elevation (green = low, brown/white = high). They focus on the natural landscape, not on human-made boundaries. A <b>political map</b>, by contrast, shows country borders, capital cities, and administrative divisions.' }),

  makeMCQ({ id:'g4h-map-015', chapterId:'g4hist-maps', difficulty:2,
    question:'A POLITICAL map is most useful for finding which of the following?',
    options:['Mountain heights and river lengths','Where the rainforest ends and the desert begins','Country borders, capitals, and major cities','Undersea features and ocean depths'],
    answer:'Country borders, capitals, and major cities',
    hint:'Political maps show human-made boundaries and places — things governments created.',
    explanation:'A <b>political map</b> shows human-made features: <b>country borders, capital cities, major towns, and administrative divisions</b>. It does not show natural landforms like mountains or rivers (that is a physical map\'s job). Political maps are useful for geography, travel, and understanding how land is divided between countries and regions.' }),

  makeTF({ id:'g4h-map-016', chapterId:'g4hist-maps', difficulty:2,
    question:'NW (North-West) and SW (South-West) are the same direction.',
    answer:false,
    hint:'NW is between North and West. SW is between South and West. They are different.',
    explanation:'<b>False.</b> <b>NW (North-West)</b> is located between North and West — towards the upper-left on a standard map. <b>SW (South-West)</b> is located between South and West — towards the lower-left. They share the "West" component but NW is in the upper half of the compass and SW is in the lower half.' }),

  makeNum({ id:'g4h-map-017', chapterId:'g4hist-maps', difficulty:3,
    question:'A map has a scale of 1 cm = 5 km. Two towns are 4 cm apart on the map. What is the REAL distance between the two towns in kilometres?',
    answer:20,
    hint:'Multiply the map distance by the scale value: 4 cm × 5 km = ?',
    explanation:'<b>4 cm × 5 km = 20 km.</b> The real distance is <b>20 km</b>. To find the real distance: map distance × scale = real distance. Scale reading is an essential map skill — the scale tells you how many km each cm on the map represents.' }),

  makeMCQ({ id:'g4h-map-018', chapterId:'g4hist-maps', difficulty:3,
    question:'What is an ATLAS?',
    options:['A single large map of one country','A map showing only roads and transport routes','A book or collection of maps, often including maps of different countries and topics','A picture drawn from the air looking straight down'],
    answer:'A book or collection of maps, often including maps of different countries and topics',
    hint:'An atlas is something you find in a library or classroom — it is not just one map.',
    explanation:'An <b>atlas</b> is a <b>book or collection of maps</b>. It typically includes maps of the world, individual continents, countries, and may include thematic maps (climate, population, physical features). Atlases also often include a gazetteer (index of place names). They are an essential reference tool in geography.' }),

  makeMCQ({ id:'g4h-map-019', chapterId:'g4hist-maps', difficulty:4,
    question:'Shanvi\'s map has a scale of 1 cm = 10 km. Port Louis to Curepipe = 2 cm; Curepipe to Mahébourg = 3 cm; Port Louis to Mahébourg directly = 4 cm. If Shanvi travels via Curepipe and her friend travels directly, how much FURTHER (in km) does Shanvi travel?',
    options:['5 km further','10 km further','20 km further','Both travel the same distance'],
    answer:'10 km further',
    hint:'Route via Curepipe = (2+3) × 10. Direct route = 4 × 10. Find the difference.',
    explanation:'<b>Shanvi\'s route (via Curepipe):</b> (2 + 3) cm × 10 km = 5 × 10 = <b>50 km</b>. <b>Direct route:</b> 4 cm × 10 km = <b>40 km</b>. <b>Difference:</b> 50 − 40 = <b>10 km further</b>. Shanvi travels 10 km more by going via Curepipe. This demonstrates how routes via intermediate points are longer than direct routes, and how scale calculations apply to real journeys.' })

);
