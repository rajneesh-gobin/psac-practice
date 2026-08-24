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
