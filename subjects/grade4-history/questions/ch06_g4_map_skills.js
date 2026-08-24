'use strict';
// Grade 4 Geography - Chapter: Map Skills
// IDs format: g4ge-maps-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4ge-maps-001', chapterId:'g4ge-map-skills', difficulty:1,
    question:'What is a map?',
    options:[
      'A photograph taken from an aeroplane',
      'A drawing that shows an area of land from above, with symbols to represent features',
      'A book about different countries',
      'A type of chart that shows the weather'
    ],
    answer:'A drawing that shows an area of land from above, with symbols to represent features',
    hint:'A map gives us a "bird\'s eye view" of an area.',
    explanation:'A <b>map</b> is a flat drawing or picture that represents an area of land as seen from above (a bird\'s eye view). It uses symbols and colours to show features like roads, rivers, mountains, towns and forests.' }),

  makeMCQ({ id:'g4ge-maps-002', chapterId:'g4ge-map-skills', difficulty:1,
    question:'What is a map legend (or key)?',
    options:[
      'The title of the map',
      'A box that explains what the symbols and colours on the map mean',
      'The north arrow on the map',
      'The scale of the map'
    ],
    answer:'A box that explains what the symbols and colours on the map mean',
    hint:'Without this, you would not know what the map symbols mean.',
    explanation:'A <b>legend</b> (also called a <b>key</b>) is a box or table on the map that explains what each symbol and colour represents. For example, a blue line = a river; a green area = a forest; a red dot = a town.' }),

  makeMCQ({ id:'g4ge-maps-003', chapterId:'g4ge-map-skills', difficulty:1,
    question:'Which direction does a compass needle always point towards?',
    options:['South','East','North','West'],
    answer:'North',
    hint:'The red end of a compass needle is attracted to the magnetic North Pole.',
    explanation:'A compass needle always points towards <b>magnetic North</b>. This allows us to find our direction. The four main compass directions are <b>North (N), South (S), East (E) and West (W)</b>.' }),

  makeTF({ id:'g4ge-maps-004', chapterId:'g4ge-map-skills', difficulty:1,
    question:'On most maps, North is shown at the top of the map.',
    answer:true,
    hint:'This is a standard map-making convention.',
    explanation:'By convention, <b>most maps are drawn with North at the top</b>. This is why when you hold a map normally and face the top, you are facing North. A north arrow or compass rose on the map confirms this.' }),

  makeMCQ({ id:'g4ge-maps-005', chapterId:'g4ge-map-skills', difficulty:1,
    question:'If you face North on a map, which direction is to your RIGHT?',
    options:['South','North','West','East'],
    answer:'East',
    hint:'Use the compass: North, South, East, West. Standing facing North, what is on your right?',
    explanation:'Standing and facing <b>North</b>, <b>East</b> is to your right, West is to your left and South is behind you. A useful way to remember the compass points in order (clockwise) is: <b>Never Eat Shredded Wheat</b> (N, E, S, W).' }),

  makeMCQ({ id:'g4ge-maps-006', chapterId:'g4ge-map-skills', difficulty:1,
    question:'What does the SCALE on a map tell us?',
    options:[
      'The title of the map',
      'How the symbols are explained',
      'The relationship between distance on the map and real distance on the ground',
      'Which direction is North'
    ],
    answer:'The relationship between distance on the map and real distance on the ground',
    hint:'For example: 1 cm on the map = 10 km in real life.',
    explanation:'The <b>scale</b> of a map shows the relationship between map distance and real-world distance. For example, a scale of "1 cm = 5 km" means every 1 centimetre on the map represents 5 kilometres in real life. Scale helps us estimate real distances from a map.' }),

  makeTF({ id:'g4ge-maps-007', chapterId:'g4ge-map-skills', difficulty:1,
    question:'A map symbol is a picture or shape that stands for a real feature in the world.',
    answer:true,
    hint:'Symbols make maps simpler and easier to read.',
    explanation:'A <b>map symbol</b> is a small picture, shape or colour used to represent a real feature. For example, a blue wavy line represents a river, a small house shape represents a building, and a green patch represents a forest.' }),

  makeMCQ({ id:'g4ge-maps-008', chapterId:'g4ge-map-skills', difficulty:2,
    question:'On a map of Mauritius, a blue line is used to show a river. What part of the map tells you this?',
    options:['The scale','The north arrow','The title','The legend (key)'],
    answer:'The legend (key)',
    hint:'It is the box that explains what each symbol and colour means.',
    explanation:'The <b>legend (key)</b> explains that a blue line represents a river. Without the legend, you would not know what the blue line means. Always check the legend when reading an unfamiliar map.' }),

  makeMCQ({ id:'g4ge-maps-009', chapterId:'g4ge-map-skills', difficulty:2,
    question:'Port Louis is to the NORTH-WEST of Curepipe on a map of Mauritius. What does this tell us about the direction from Curepipe to Port Louis?',
    options:[
      'Port Louis is south of Curepipe',
      'To travel from Curepipe to Port Louis, you would go in a north-westerly direction',
      'Port Louis and Curepipe are the same distance from the coast',
      'Curepipe is north-west of Port Louis'
    ],
    answer:'To travel from Curepipe to Port Louis, you would go in a north-westerly direction',
    hint:'If Port Louis is north-west of Curepipe, you travel north-west FROM Curepipe to GET TO Port Louis.',
    explanation:'If Port Louis is <b>north-west of Curepipe</b>, then to travel from Curepipe to Port Louis, you travel in a <b>north-westerly direction</b>. Port Louis is on the north-west coast of Mauritius, while Curepipe is on the central plateau inland.' }),

  makeMCQ({ id:'g4ge-maps-010', chapterId:'g4ge-map-skills', difficulty:1,
    question:'What is the title of a map for?',
    options:[
      'To show the scale of the map',
      'To tell us the name of the area shown and what the map is about',
      'To show compass directions',
      'To list all the symbols used'
    ],
    answer:'To tell us the name of the area shown and what the map is about',
    hint:'Every good map has a title so you know what area it is showing.',
    explanation:'The <b>title</b> of a map tells us the name of the area being shown and what the map is about. For example: "Map of Mauritius - Physical Features" or "Map of Port Louis - Tourist Guide".' })

);

STATIC_QUESTIONS.push(

  makeTF({ id:'g4ge-maps-011', chapterId:'g4ge-map-skills', difficulty:2,
    question:'If the scale of a map is 1 cm = 10 km, and two towns are 3 cm apart on the map, they are 30 km apart in real life.',
    answer:true,
    hint:'Multiply the map distance by the scale: 3 × 10 = 30.',
    explanation:'Using the scale: if 1 cm = 10 km, then 3 cm = <b>3 × 10 = 30 km</b> in real life. This is how we use map scale to calculate real distances.' }),

  makeMCQ({ id:'g4ge-maps-012', chapterId:'g4ge-map-skills', difficulty:2,
    question:'On a map of Mauritius, you want to travel from Grand Baie (north) to Mahébourg (south-east). In which general direction would you travel?',
    options:['North-west','North','South-east','West'],
    answer:'South-east',
    hint:'Grand Baie is in the north; Mahébourg is in the south-east - so you travel away from north towards south-east.',
    explanation:'Grand Baie is in the <b>north</b> of Mauritius and Mahébourg is in the <b>south-east</b>. To travel from Grand Baie to Mahébourg, you would travel in a <b>south-easterly direction</b>.' }),

  makeMCQ({ id:'g4ge-maps-013', chapterId:'g4ge-map-skills', difficulty:1,
    question:'What are the four main compass directions?',
    options:[
      'Up, down, left, right',
      'North, South, East, West',
      'Sunrise, Sunset, Midday, Midnight',
      'Hot, Cold, Wet, Dry'
    ],
    answer:'North, South, East, West',
    hint:'Remember: Never Eat Shredded Wheat.',
    explanation:'The four main <b>compass directions</b> are <b>North, South, East and West</b>. A useful memory trick is: <b>Never Eat Shredded Wheat</b> - going clockwise from North.' }),

  makeTF({ id:'g4ge-maps-014', chapterId:'g4ge-map-skills', difficulty:2,
    question:'Without a legend, it is easy to understand every symbol on an unfamiliar map.',
    answer:false,
    hint:'Different maps may use different symbols for the same feature.',
    explanation:'Without a <b>legend</b>, it is very difficult to understand an unfamiliar map. Different maps may use different symbols for the same features. The legend is essential for reading and interpreting a map correctly.' }),

  makeMCQ({ id:'g4ge-maps-015', chapterId:'g4ge-map-skills', difficulty:2,
    question:'On a map, a small aeroplane symbol is shown at a location near Plaine Magnien. What does this symbol most likely represent?',
    options:['A mountain','An airport','A school','A beach'],
    answer:'An airport',
    hint:'The symbol matches the real thing it represents.',
    explanation:'An <b>aeroplane symbol</b> on a map represents an <b>airport</b>. SSR International Airport (Sir Seewoosagur Ramgoolam International Airport) is located near Plaine Magnien in the south-east of Mauritius.' }),

  makeMCQ({ id:'g4ge-maps-016', chapterId:'g4ge-map-skills', difficulty:1,
    question:'If you are facing East and turn to face the direction behind you, which direction are you now facing?',
    options:['North','East','West','South'],
    answer:'West',
    hint:'Opposite directions on a compass: North↔South, East↔West.',
    explanation:'If you face <b>East</b> and turn 180° to face the opposite direction, you are now facing <b>West</b>. The opposite pairs are: North↔South and East↔West.' }),

  makeTF({ id:'g4ge-maps-017', chapterId:'g4ge-map-skills', difficulty:1,
    question:'A map is always drawn to show the exact same size as the real area it represents.',
    answer:false,
    hint:'If maps were the same size as real places, they would be impossible to use!',
    explanation:'Maps are always <b>smaller</b> than the real areas they show. The <b>scale</b> tells us how much smaller the map is compared to reality. For example, a map of all of Mauritius fits on one page, but the real island is 65 km long.' }),

  makeMCQ({ id:'g4ge-maps-018', chapterId:'g4ge-map-skills', difficulty:3,
    question:'A map shows Blue Bay (south-east coast) and Grand Baie (north coast). The scale is 1 cm = 5 km. On the map, the two places are 8 cm apart. What is the real distance between them?',
    options:['8 km','13 km','40 km','5 km'],
    answer:'40 km',
    hint:'Real distance = map distance × scale. 8 × 5 = ?',
    explanation:'Using the scale: real distance = map distance × scale value. <br>8 cm × 5 km/cm = <b>40 km</b>. Blue Bay and Grand Baie are approximately 40 km apart in real life.' }),

  makeMCQ({ id:'g4ge-maps-019', chapterId:'g4ge-map-skills', difficulty:2,
    question:'When drawing a map of your school, which of the following would you include to make the map useful?',
    options:[
      'A title, a legend (key), a north arrow and a scale',
      'Only a drawing of the buildings with no labels',
      'Only the north arrow',
      'A photograph of the school taken from the front gate'
    ],
    answer:'A title, a legend (key), a north arrow and a scale',
    hint:'A good map always has these four important parts.',
    explanation:'A good map needs: a <b>title</b> (what it shows), a <b>legend/key</b> (what the symbols mean), a <b>north arrow</b> (to show direction) and a <b>scale</b> (to show real distances). Without these, the map would be confusing and hard to use.' })

);
