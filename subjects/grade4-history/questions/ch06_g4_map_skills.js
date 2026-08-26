'use strict';
// Grade 4 Geography - Chapter: Map Skills
// IDs format: g4ge-maps-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4ge-maps-001', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:1,
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

  makeMCQ({ id:'g4ge-maps-002', chapterId:'g4ge-map-skills', subsection:'symbols', difficulty:1,
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

  makeMCQ({ id:'g4ge-maps-003', chapterId:'g4ge-map-skills', subsection:'directions', difficulty:1,
    question:'Which direction does a compass needle always point towards?',
    options:['South','East','North','West'],
    answer:'North',
    hint:'The red end of a compass needle is attracted to the magnetic North Pole.',
    explanation:'A compass needle always points towards <b>magnetic North</b>. This allows us to find our direction. The four main compass directions are <b>North (N), South (S), East (E) and West (W)</b>.' }),

  makeTF({ id:'g4ge-maps-004', chapterId:'g4ge-map-skills', subsection:'directions', difficulty:1,
    question:'On most maps, North is shown at the top of the map.',
    answer:true,
    hint:'This is a standard map-making convention.',
    explanation:'By convention, <b>most maps are drawn with North at the top</b>. This is why when you hold a map normally and face the top, you are facing North. A north arrow or compass rose on the map confirms this.' }),

  makeMCQ({ id:'g4ge-maps-005', chapterId:'g4ge-map-skills', subsection:'directions', difficulty:1,
    question:'If you face North on a map, which direction is to your RIGHT?',
    options:['South','North','West','East'],
    answer:'East',
    hint:'Use the compass: North, South, East, West. Standing facing North, what is on your right?',
    explanation:'Standing and facing <b>North</b>, <b>East</b> is to your right, West is to your left and South is behind you. A useful way to remember the compass points in order (clockwise) is: <b>Never Eat Shredded Wheat</b> (N, E, S, W).' }),

  makeMCQ({ id:'g4ge-maps-006', chapterId:'g4ge-map-skills', subsection:'parts_of_map', difficulty:1,
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

  makeTF({ id:'g4ge-maps-007', chapterId:'g4ge-map-skills', subsection:'symbols', difficulty:1,
    question:'A map symbol is a picture or shape that stands for a real feature in the world.',
    answer:true,
    hint:'Symbols make maps simpler and easier to read.',
    explanation:'A <b>map symbol</b> is a small picture, shape or colour used to represent a real feature. For example, a blue wavy line represents a river, a small house shape represents a building, and a green patch represents a forest.' }),

  makeMCQ({ id:'g4ge-maps-008', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:2,
    question:'On a map of Mauritius, a blue line is used to show a river. What part of the map tells you this?',
    options:['The scale','The north arrow','The title','The legend (key)'],
    answer:'The legend (key)',
    hint:'It is the box that explains what each symbol and colour means.',
    explanation:'The <b>legend (key)</b> explains that a blue line represents a river. Without the legend, you would not know what the blue line means. Always check the legend when reading an unfamiliar map.' }),

  makeMCQ({ id:'g4ge-maps-009', chapterId:'g4ge-map-skills', subsection:'directions', difficulty:2,
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

  makeMCQ({ id:'g4ge-maps-010', chapterId:'g4ge-map-skills', subsection:'parts_of_map', difficulty:1,
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

  makeTF({ id:'g4ge-maps-011', chapterId:'g4ge-map-skills', subsection:'parts_of_map', difficulty:2,
    question:'If the scale of a map is 1 cm = 10 km, and two towns are 3 cm apart on the map, they are 30 km apart in real life.',
    answer:true,
    hint:'Multiply the map distance by the scale: 3 × 10 = 30.',
    explanation:'Using the scale: if 1 cm = 10 km, then 3 cm = <b>3 × 10 = 30 km</b> in real life. This is how we use map scale to calculate real distances.' }),

  makeMCQ({ id:'g4ge-maps-012', chapterId:'g4ge-map-skills', subsection:'directions', difficulty:2,
    question:'On a map of Mauritius, you want to travel from Grand Baie (north) to Mahébourg (south-east). In which general direction would you travel?',
    options:['North-west','North','South-east','West'],
    answer:'South-east',
    hint:'Grand Baie is in the north; Mahébourg is in the south-east - so you travel away from north towards south-east.',
    explanation:'Grand Baie is in the <b>north</b> of Mauritius and Mahébourg is in the <b>south-east</b>. To travel from Grand Baie to Mahébourg, you would travel in a <b>south-easterly direction</b>.' }),

  makeMCQ({ id:'g4ge-maps-013', chapterId:'g4ge-map-skills', subsection:'directions', difficulty:1,
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

  makeTF({ id:'g4ge-maps-014', chapterId:'g4ge-map-skills', subsection:'symbols', difficulty:2,
    question:'Without a legend, it is easy to understand every symbol on an unfamiliar map.',
    answer:false,
    hint:'Different maps may use different symbols for the same feature.',
    explanation:'Without a <b>legend</b>, it is very difficult to understand an unfamiliar map. Different maps may use different symbols for the same features. The legend is essential for reading and interpreting a map correctly.' }),

  makeMCQ({ id:'g4ge-maps-015', chapterId:'g4ge-map-skills', subsection:'symbols', difficulty:2,
    question:'On a map, a small aeroplane symbol is shown at a location near Plaine Magnien. What does this symbol most likely represent?',
    options:['A mountain','An airport','A school','A beach'],
    answer:'An airport',
    hint:'The symbol matches the real thing it represents.',
    explanation:'An <b>aeroplane symbol</b> on a map represents an <b>airport</b>. SSR International Airport (Sir Seewoosagur Ramgoolam International Airport) is located near Plaine Magnien in the south-east of Mauritius.' }),

  makeMCQ({ id:'g4ge-maps-016', chapterId:'g4ge-map-skills', subsection:'directions', difficulty:1,
    question:'If you are facing East and turn to face the direction behind you, which direction are you now facing?',
    options:['North','East','West','South'],
    answer:'West',
    hint:'Opposite directions on a compass: North↔South, East↔West.',
    explanation:'If you face <b>East</b> and turn 180° to face the opposite direction, you are now facing <b>West</b>. The opposite pairs are: North↔South and East↔West.' }),

  makeTF({ id:'g4ge-maps-017', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:1,
    question:'A map is always drawn to show the exact same size as the real area it represents.',
    answer:false,
    hint:'If maps were the same size as real places, they would be impossible to use!',
    explanation:'Maps are always <b>smaller</b> than the real areas they show. The <b>scale</b> tells us how much smaller the map is compared to reality. For example, a map of all of Mauritius fits on one page, but the real island is 65 km long.' }),

  makeMCQ({ id:'g4ge-maps-018', chapterId:'g4ge-map-skills', subsection:'directions', difficulty:3,
    question:'A map shows Blue Bay (south-east coast) and Grand Baie (north coast). The scale is 1 cm = 5 km. On the map, the two places are 8 cm apart. What is the real distance between them?',
    options:['8 km','13 km','40 km','5 km'],
    answer:'40 km',
    hint:'Real distance = map distance × scale. 8 × 5 = ?',
    explanation:'Using the scale: real distance = map distance × scale value. <br>8 cm × 5 km/cm = <b>40 km</b>. Blue Bay and Grand Baie are approximately 40 km apart in real life.' }),

  makeMCQ({ id:'g4ge-maps-019', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:2,
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

// ── Mauritius Physical Map — river & mountain reading questions ──────────────
const _SVG_G4_MUS_PHYS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 400" style="max-width:100%;max-height:280px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"><rect width="420" height="400" fill="#dbeafe"/><text x="210" y="18" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a" font-family="sans-serif">Mauritius — Physical Features</text><path d="M 85,105 Q 120,60 200,30 Q 270,20 330,75 Q 370,130 370,210 Q 365,270 335,315 Q 270,360 200,360 Q 140,355 90,290 Q 55,240 55,180 Q 58,130 85,105 Z" fill="#d1fae5" stroke="#6ee7b7" stroke-width="2"/><path d="M 210,220 Q 260,250 340,295" fill="none" stroke="#3b82f6" stroke-width="2"/><text x="255" y="243" font-size="7" fill="#1d4ed8" font-style="italic" font-family="sans-serif">Gd. R. South East</text><path d="M 140,250 Q 100,255 62,240" fill="none" stroke="#3b82f6" stroke-width="2"/><text x="78" y="251" font-size="7" fill="#1d4ed8" font-style="italic" font-family="sans-serif">Black River</text><path d="M 205,185 Q 215,120 225,45" fill="none" stroke="#3b82f6" stroke-width="2"/><text x="220" y="115" font-size="7" fill="#1d4ed8" font-style="italic" font-family="sans-serif">R. du Rempart</text><path d="M 175,175 Q 135,145 88,118" fill="none" stroke="#3b82f6" stroke-width="2"/><text x="105" y="137" font-size="7" fill="#1d4ed8" font-style="italic" font-family="sans-serif">Gd. R. NW</text><text x="108" y="256" font-size="12" fill="#dc2626" font-family="sans-serif">▲</text><text x="118" y="253" font-size="8" fill="#991b1b" font-weight="bold" font-family="sans-serif">Piton PNR ★</text><text x="118" y="262" font-size="7" fill="#991b1b" font-family="sans-serif">828m (highest)</text><text x="233" y="167" font-size="12" fill="#dc2626" font-family="sans-serif">▲</text><text x="241" y="163" font-size="8" fill="#991b1b" font-family="sans-serif">Pieter Both</text><text x="241" y="172" font-size="7" fill="#991b1b" font-family="sans-serif">823m</text><text x="148" y="132" font-size="12" fill="#dc2626" font-family="sans-serif">▲</text><text x="156" y="128" font-size="8" fill="#991b1b" font-family="sans-serif">Le Pouce</text><text x="156" y="137" font-size="7" fill="#991b1b" font-family="sans-serif">811m</text><text x="183" y="237" font-size="12" fill="#dc2626" font-family="sans-serif">▲</text><text x="190" y="233" font-size="7" fill="#991b1b" font-family="sans-serif">Corps de Garde</text><text x="190" y="242" font-size="7" fill="#991b1b" font-family="sans-serif">720m</text><text x="151" y="212" font-size="12" fill="#dc2626" font-family="sans-serif">▲</text><text x="122" y="210" font-size="7" fill="#991b1b" font-family="sans-serif">Trois Mamelles 629m</text><circle cx="82" cy="108" r="4" fill="#fbbf24" stroke="#92400e" stroke-width="1.2"/><text x="89" y="106" font-size="8" fill="#92400e" font-weight="bold" font-family="sans-serif">Port Louis ★</text><text x="89" y="115" font-size="7" fill="#92400e" font-family="sans-serif">Capital</text><circle cx="210" cy="248" r="3" fill="#fbbf24" stroke="#92400e" stroke-width="1"/><text x="216" y="252" font-size="7" fill="#374151" font-family="sans-serif">Curepipe</text><circle cx="328" cy="296" r="3" fill="#fbbf24" stroke="#92400e" stroke-width="1"/><text x="290" y="293" font-size="7" fill="#374151" font-family="sans-serif">Mahebourg</text><circle cx="178" cy="232" r="3" fill="#fbbf24" stroke="#92400e" stroke-width="1"/><text x="132" y="230" font-size="7" fill="#374151" font-family="sans-serif">Quatre Bornes</text><line x1="390" y1="22" x2="390" y2="52" stroke="#374151" stroke-width="1.2"/><line x1="375" y1="37" x2="405" y2="37" stroke="#374151" stroke-width="1.2"/><polygon points="390,22 386,32 390,28 394,32" fill="#1e3a8a"/><text x="390" y="20" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e3a8a" font-family="sans-serif">N</text><text x="407" y="40" font-size="7" fill="#374151" font-family="sans-serif">E</text><text x="373" y="40" text-anchor="end" font-size="7" fill="#374151" font-family="sans-serif">W</text><text x="390" y="60" text-anchor="middle" font-size="7" fill="#374151" font-family="sans-serif">S</text><rect x="10" y="335" width="128" height="58" rx="4" fill="white" fill-opacity="0.88" stroke="#d1d5db" stroke-width="1"/><text x="16" y="348" font-size="8" font-weight="bold" fill="#374151" font-family="sans-serif">Legend</text><line x1="16" y1="356" x2="32" y2="356" stroke="#3b82f6" stroke-width="2"/><text x="36" y="360" font-size="7" fill="#374151" font-family="sans-serif">River</text><text x="16" y="370" font-size="10" fill="#dc2626" font-family="sans-serif">▲</text><text x="28" y="371" font-size="7" fill="#374151" font-family="sans-serif">Mountain peak</text><text x="16" y="382" font-size="9" fill="#dc2626" font-family="sans-serif">▲★</text><text x="28" y="383" font-size="7" fill="#374151" font-family="sans-serif">Highest peak</text><circle cx="18" cy="390" r="3" fill="#fbbf24" stroke="#92400e" stroke-width="1"/><text x="24" y="393" font-size="7" fill="#374151" font-family="sans-serif">Town  ★=Capital</text></svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4ge-maps-020', chapterId:'g4ge-map-skills', subsection:'directions', difficulty:1,
    question:`<div style="text-align:center;margin-bottom:12px">${_SVG_G4_MUS_PHYS}</div><b>Which river on the map flows towards the SOUTH-EAST coast?</b>`,
    options:['Black River (Rivière Noire)','Rivière du Rempart','Grand River South East','Grand River North West'],
    answer:'Grand River South East',
    hint:'Look at the river that flows from the central area toward the bottom-right of the map.',
    explanation:'The <b>Grand River South East</b> (Grande Rivière Sud-Est) flows from the central highlands toward the south-east coast. It is one of the most important rivers in Mauritius and flows into the sea near Mahebourg in the south-east.' }),

  makeMCQ({ id:'g4ge-maps-021', chapterId:'g4ge-map-skills', subsection:'directions', difficulty:1,
    question:`<div style="text-align:center;margin-bottom:12px">${_SVG_G4_MUS_PHYS}</div><b>Which river on the map flows towards Port Louis in the NORTH-WEST?</b>`,
    options:['Black River (Rivière Noire)','Rivière du Rempart','Grand River South East','Grand River North West'],
    answer:'Grand River North West',
    hint:'Find Port Louis (marked ★ on the north-west coast) and look for the river flowing toward it.',
    explanation:'The <b>Grand River North West</b> (Grande Rivière Nord-Ouest) flows from the central plateau toward the north-west coast where Port Louis is located. All rivers in Mauritius flow outward from the central highlands to the coast.' }),

  makeMCQ({ id:'g4ge-maps-022', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:1,
    question:`<div style="text-align:center;margin-bottom:12px">${_SVG_G4_MUS_PHYS}</div><b>Which mountain on the map is the HIGHEST point in Mauritius?</b>`,
    options:['Le Pouce (811m)','Pieter Both (823m)','Corps de Garde (720m)','Piton de la Petite Rivière Noire (828m)'],
    answer:'Piton de la Petite Rivière Noire (828m)',
    hint:'Look for the ★ symbol next to a mountain name — it marks the highest peak.',
    explanation:'<b>Piton de la Petite Rivière Noire</b> (828 metres) is the highest mountain in Mauritius. It is located in the south-west of the island in the Black River Gorges area. On the map it is marked with a ★ to show it is the highest peak.' }),

  makeMCQ({ id:'g4ge-maps-023', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:2,
    question:`<div style="text-align:center;margin-bottom:12px">${_SVG_G4_MUS_PHYS}</div><b>In which part of Mauritius is the Black River (Rivière Noire) located?</b>`,
    options:['North-East','North-West','South-East','South-West'],
    answer:'South-West',
    hint:'Find the river labeled "Black River" on the map and look at which corner of the island it is in.',
    explanation:'The <b>Black River (Rivière Noire)</b> is in the <b>south-west</b> of Mauritius. It flows through the Black River Gorges — Mauritius\'s largest national park — and drains into the sea on the south-west coast.' }),

  makeMCQ({ id:'g4ge-maps-024', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:1,
    question:`<div style="text-align:center;margin-bottom:12px">${_SVG_G4_MUS_PHYS}</div><b>Which town is shown as the CAPITAL of Mauritius on this map?</b>`,
    options:['Curepipe','Mahebourg','Quatre Bornes','Port Louis'],
    answer:'Port Louis',
    hint:'The capital city is marked with a ★ symbol on the map.',
    explanation:'<b>Port Louis</b> is the capital city of Mauritius. It is on the <b>north-west coast</b> and is the country\'s main port, financial centre and largest city. It was made the capital during the French colonial period by Governor Mahé de Labourdonnais.' }),

  makeMCQ({ id:'g4ge-maps-025', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:1,
    question:`<div style="text-align:center;margin-bottom:12px">${_SVG_G4_MUS_PHYS}</div><b>How many rivers are labeled on this map of Mauritius?</b>`,
    options:['2','3','4','5'],
    answer:'4',
    hint:'Count the blue river lines and their labels carefully.',
    explanation:'There are <b>4 rivers</b> labeled on this map: (1) <b>Grand River South East</b>, (2) <b>Black River (Rivière Noire)</b>, (3) <b>Rivière du Rempart</b>, and (4) <b>Grand River North West</b>. All four rise in the central highlands and flow outward to different coasts.' })

);
