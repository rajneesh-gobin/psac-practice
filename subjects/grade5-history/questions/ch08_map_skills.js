'use strict';
// Grade 5 History & Geography — Chapter: Map Skills (Latitude & Longitude)
// IDs format: g5hg-ms-NNN

// Latitude/longitude grid with Mauritius marked
const _SVG_GRID = `<svg viewBox="0 0 260 160" width="260" height="160" style="display:block;margin:6px auto;background:#e0f2fe;border-radius:8px;border:1px solid #7dd3fc">
  <line x1="35" y1="10" x2="35" y2="150" stroke="#94a3b8" stroke-width="0.8" stroke-dasharray="3,2"/>
  <line x1="75" y1="10" x2="75" y2="150" stroke="#94a3b8" stroke-width="0.8" stroke-dasharray="3,2"/>
  <line x1="115" y1="10" x2="115" y2="150" stroke="#1e40af" stroke-width="2.5"/>
  <line x1="155" y1="10" x2="155" y2="150" stroke="#94a3b8" stroke-width="0.8" stroke-dasharray="3,2"/>
  <line x1="195" y1="10" x2="195" y2="150" stroke="#94a3b8" stroke-width="0.8" stroke-dasharray="3,2"/>
  <line x1="235" y1="10" x2="235" y2="150" stroke="#94a3b8" stroke-width="0.8" stroke-dasharray="3,2"/>
  <line x1="15" y1="30" x2="255" y2="30" stroke="#94a3b8" stroke-width="0.8" stroke-dasharray="3,2"/>
  <line x1="15" y1="60" x2="255" y2="60" stroke="#94a3b8" stroke-width="0.8" stroke-dasharray="3,2"/>
  <line x1="15" y1="90" x2="255" y2="90" stroke="#dc2626" stroke-width="2.5"/>
  <line x1="15" y1="120" x2="255" y2="120" stroke="#94a3b8" stroke-width="0.8" stroke-dasharray="3,2"/>
  <text x="110" y="8" font-size="7" fill="#1e40af" text-anchor="middle">0&#176; (Greenwich Meridian)</text>
  <text x="1" y="93" font-size="6.5" fill="#dc2626">0&#176;</text>
  <text x="1" y="63" font-size="6" fill="#475569">30&#176;N</text>
  <text x="1" y="33" font-size="6" fill="#475569">60&#176;N</text>
  <text x="1" y="123" font-size="6" fill="#475569">30&#176;S</text>
  <text x="75" y="103" font-size="6.5" fill="#dc2626">Equator</text>
  <text x="157" y="8" font-size="6" fill="#475569">30&#176;E</text>
  <text x="197" y="8" font-size="6" fill="#475569">60&#176;E</text>
  <text x="237" y="8" font-size="6" fill="#475569">90&#176;E</text>
  <text x="35" y="8" font-size="6" fill="#475569">30&#176;W</text>
  <text x="72" y="8" font-size="6" fill="#475569">0&#176;</text>
  <circle cx="195" cy="108" r="6" fill="#f97316" stroke="#ea580c" stroke-width="2"/>
  <text x="202" y="105" font-size="7" fill="#ea580c" font-weight="bold">Mauritius</text>
  <text x="202" y="114" font-size="6" fill="#ea580c">~20&#176;S, 57&#176;E</text>
  <text x="235" y="75" font-size="9" fill="#475569" font-weight="bold">N</text>
  <text x="235" y="110" font-size="9" fill="#475569" font-weight="bold">S</text>
  <text x="20" y="93" font-size="7" fill="#475569">W</text>
  <text x="245" y="93" font-size="7" fill="#475569">E</text>
</svg>`;

// Simple compass rose
const _SVG_COMPASS = `<svg viewBox="0 0 120 120" width="120" height="120" style="display:block;margin:6px auto;background:#f8fafc;border-radius:50%;border:2px solid #cbd5e1">
  <circle cx="60" cy="60" r="55" fill="white" stroke="#e2e8f0" stroke-width="1"/>
  <polygon points="60,10 55,60 60,55 65,60" fill="#dc2626"/>
  <polygon points="60,110 55,60 60,65 65,60" fill="#334155"/>
  <polygon points="10,60 60,55 55,60 60,65" fill="#334155"/>
  <polygon points="110,60 60,55 65,60 60,65" fill="#334155"/>
  <text x="60" y="8" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">N</text>
  <text x="60" y="118" text-anchor="middle" font-size="12" font-weight="bold" fill="#334155">S</text>
  <text x="6" y="64" font-size="12" font-weight="bold" fill="#334155">W</text>
  <text x="108" y="64" font-size="12" font-weight="bold" fill="#334155">E</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5hg-ms-001', chapterId:'map-skills', difficulty:1,
    question:'What are LINES OF LATITUDE on a map or globe?',
    options:[
      'Vertical lines running from the North Pole to the South Pole',
      'Horizontal lines running east-west, parallel to the Equator',
      'Lines showing the height of mountains',
      'Lines showing the direction of rivers'
    ],
    answer:'Horizontal lines running east-west, parallel to the Equator',
    hint:'Latitude lines go around the globe horizontally like the rungs of a ladder.',
    explanation:'<b>Lines of latitude</b> (also called parallels) are horizontal lines that circle the Earth parallel to the Equator. They measure how far north or south a place is from the Equator, in degrees.' }),

  makeMCQ({ id:'g5hg-ms-002', chapterId:'map-skills', difficulty:1,
    question:'What are LINES OF LONGITUDE on a map or globe?',
    options:[
      'Horizontal lines running east-west',
      'Lines showing ocean depth',
      'Vertical lines running from the North Pole to the South Pole',
      'Lines connecting places with the same temperature'
    ],
    answer:'Vertical lines running from the North Pole to the South Pole',
    hint:'Longitude lines run up and down (north-south) on a map.',
    explanation:'<b>Lines of longitude</b> (also called meridians) are vertical lines that run from the North Pole to the South Pole. They measure how far east or west a place is from the Greenwich Meridian, in degrees.' }),

  makeMCQ({ id:'g5hg-ms-003', chapterId:'map-skills', difficulty:1,
    question:`${_SVG_GRID}Look at the grid map above. What is the thick horizontal red line at 0° called?`,
    options:['The Greenwich Meridian','The International Date Line','The Equator','The Tropic of Cancer'],
    answer:'The Equator',
    hint:'This line divides the Earth into the Northern and Southern hemispheres.',
    explanation:'The thick red horizontal line at <b>0° latitude</b> is the <b>Equator</b>. It circles the Earth exactly halfway between the North and South poles, dividing the planet into the Northern and Southern hemispheres.' }),

  makeMCQ({ id:'g5hg-ms-004', chapterId:'map-skills', difficulty:1,
    question:`${_SVG_GRID}On the grid above, what is the thick blue VERTICAL line at 0° longitude called?`,
    options:['The Equator','The Tropic of Capricorn','The Greenwich Meridian (Prime Meridian)','The International Date Line'],
    answer:'The Greenwich Meridian (Prime Meridian)',
    hint:'It is named after the Royal Observatory in Greenwich, London.',
    explanation:'The thick blue vertical line at <b>0° longitude</b> is the <b>Greenwich Meridian</b> (also called the Prime Meridian). It runs through Greenwich, London, and divides the Earth into Eastern and Western hemispheres.' }),

  makeMCQ({ id:'g5hg-ms-005', chapterId:'map-skills', difficulty:2,
    question:`${_SVG_GRID}Using the grid above, Mauritius is located at approximately 20°S and 57°E. What does 20°S tell us?`,
    options:[
      'Mauritius is 20 degrees east of the Greenwich Meridian',
      'Mauritius is 20 degrees south of the Equator',
      'Mauritius is 20 km from the coast of Africa',
      'Mauritius is 20 degrees north of the Equator'
    ],
    answer:'Mauritius is 20 degrees south of the Equator',
    hint:'S after a number means south of the Equator.',
    explanation:'<b>20°S</b> means 20 degrees of latitude <b>south of the Equator</b>. Mauritius is in the Southern Hemisphere. The "S" always means south; "N" means north.' }),

  makeMCQ({ id:'g5hg-ms-006', chapterId:'map-skills', difficulty:2,
    question:`${_SVG_GRID}Using the grid, what does 57°E (the longitude of Mauritius) tell us?`,
    options:[
      'Mauritius is 57 degrees north of the Equator',
      'Mauritius is 57 km east of Africa',
      'Mauritius is 57 degrees east of the Greenwich Meridian',
      'Mauritius is 57 degrees west of the Greenwich Meridian'
    ],
    answer:'Mauritius is 57 degrees east of the Greenwich Meridian',
    hint:'E after a number means east of the 0° line.',
    explanation:'<b>57°E</b> means 57 degrees of longitude <b>east of the Greenwich Meridian</b>. Since Mauritius is east of the 0° line, it is in the Eastern Hemisphere.' }),

  makeMCQ({ id:'g5hg-ms-007', chapterId:'map-skills', difficulty:1,
    question:`${_SVG_COMPASS}Look at the compass rose. If you face North and then turn to your RIGHT, which direction are you now facing?`,
    options:['West','South','East','North-East'],
    answer:'East',
    hint:'Imagine you are facing up (North). Turn 90° clockwise to your right.',
    explanation:'If you face <b>North</b> and turn 90° to your right (clockwise), you will be facing <b>East</b>. The cardinal directions in clockwise order are: North → East → South → West.' }),

  makeTF({ id:'g5hg-ms-008', chapterId:'map-skills', difficulty:1,
    question:'The Equator is a line of longitude that divides the Earth into Northern and Southern hemispheres.',
    answer:false,
    hint:'Is the Equator a horizontal or vertical line? And is it latitude or longitude?',
    explanation:'The Equator is a line of <b>latitude</b> (not longitude). Latitude lines are horizontal. The Equator at 0° latitude divides the Earth into the Northern and Southern hemispheres. Longitude lines (like the Greenwich Meridian) divide East from West.' }),

  makeMCQ({ id:'g5hg-ms-009', chapterId:'map-skills', difficulty:2,
    question:'A map KEY (legend) is important because it:',
    options:[
      'Shows the name of the map maker',
      'Explains what the symbols and colours used on the map mean',
      'Tells you how old the map is',
      'Shows the exact GPS coordinates of every location'
    ],
    answer:'Explains what the symbols and colours used on the map mean',
    hint:'Without this, you cannot read what the symbols on a map represent.',
    explanation:'A map <b>key (legend)</b> is a box on a map that explains what each symbol, colour or line represents. For example, a blue line = river, a triangle = mountain peak, dotted line = border. Without a key, the map is very hard to read.' }),

  makeMCQ({ id:'g5hg-ms-010', chapterId:'map-skills', difficulty:2,
    question:'On a map, the SCALE shows that 1 cm = 10 km. If two towns are 4 cm apart on the map, what is the real distance between them?',
    options:['4 km','10 km','14 km','40 km'],
    answer:'40 km',
    hint:'Multiply the map distance by the scale value.',
    explanation:'If 1 cm on the map = 10 km in reality, then 4 cm = 4 × 10 = <b>40 km</b>. The scale of a map helps you calculate real-world distances from measurements on the map.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5hg-ms-011', chapterId:'map-skills', difficulty:1,
    question:'At which latitude does the ARCTIC CIRCLE lie?',
    options:[
      '0° — it is another name for the Equator',
      'Approximately 66.5° North latitude',
      '23.5° North — the Tropic of Cancer',
      '90° North — the North Pole itself'
    ],
    answer:'Approximately 66.5° North latitude',
    hint:'It is well into the far north, above Europe and Russia.',
    explanation:'The <b>Arctic Circle</b> is a line of latitude at approximately <b>66.5° North</b>. Above this line, the sun does not set in midsummer (midnight sun) and does not rise in midwinter (polar night). Mauritius at ~20°S is very far from the Arctic Circle.' }),

  makeMCQ({ id:'g5hg-ms-012', chapterId:'map-skills', difficulty:1,
    question:'Which continent is the LARGEST in the world by area?',
    options:['Africa','North America','Europe','Asia'],
    answer:'Asia',
    hint:'It includes countries like China, India, Russia and Saudi Arabia.',
    explanation:'<b>Asia</b> is the world\'s largest continent by both area (about 44.6 million km²) and population (over 4.5 billion people). It covers about one-third of Earth\'s total land area.' }),

  makeMCQ({ id:'g5hg-ms-013', chapterId:'map-skills', difficulty:2,
    question:'What do CONTOUR LINES on a topographic map show?',
    options:[
      'Lines joining places with the same rainfall',
      'Lines joining places with the same temperature',
      'Lines joining places at the same height (altitude) above sea level',
      'Lines showing the borders between countries'
    ],
    answer:'Lines joining places at the same height (altitude) above sea level',
    hint:'They show the shape and height of the land.',
    explanation:'<b>Contour lines</b> connect all points at the <b>same altitude above sea level</b>. They show the shape, height and slope of the land: contour lines close together mean a steep slope; lines far apart mean gentle or flat land.' }),

  makeMCQ({ id:'g5hg-ms-014', chapterId:'map-skills', difficulty:2,
    question:'On a topographic map, contour lines are very CLOSE TOGETHER on the mountainside and very FAR APART on the coastal plain. What does this indicate?',
    options:[
      'The mountain is warmer than the plain',
      'The mountain has steep slopes (height changes quickly); the plain is nearly flat',
      'The plain receives more rainfall than the mountain',
      'The contour lines are drawn incorrectly'
    ],
    answer:'The mountain has steep slopes (height changes quickly); the plain is nearly flat',
    hint:'Closely packed contour lines = height changes rapidly over a short horizontal distance.',
    explanation:'Closely spaced contour lines indicate a <b>steep slope</b> — the land rises or falls rapidly. Widely spaced contour lines indicate <b>gentle or flat land</b>. Looking at a map of Mauritius, the mountainous south-west has closely packed contours, while the northern coastal plains have widely spaced ones.' }),

  makeTF({ id:'g5hg-ms-015', chapterId:'map-skills', difficulty:1,
    question:'The Tropic of Capricorn is a line of latitude at 23.5° South.',
    answer:true,
    hint:'Mauritius at ~20°S lies just north of the Tropic of Capricorn.',
    explanation:'True. The <b>Tropic of Capricorn</b> is at <b>23.5° South</b> latitude. It marks the southernmost point where the sun can be directly overhead (on the December solstice). Mauritius (~20°S) lies just north of this line, placing it in the tropics — explaining its warm tropical climate.' }),

  makeMCQ({ id:'g5hg-ms-016', chapterId:'map-skills', difficulty:2,
    question:'A map has a scale of 1:50,000. What does this mean?',
    options:[
      '1 cm on the map equals 50 cm in real life',
      '1 cm on the map equals 50,000 cm (500 metres) in real life',
      '1 cm on the map equals 50 km in real life',
      '50 cm on the map equals 1 cm in real life'
    ],
    answer:'1 cm on the map equals 50,000 cm (500 metres) in real life',
    hint:'A scale of 1:50,000 means the map is 50,000 times smaller than reality.',
    explanation:'A scale of <b>1:50,000</b> means every 1 unit on the map equals 50,000 of the same unit in reality. So 1 cm on the map = 50,000 cm = <b>500 metres</b> in real life. To find real distance: map measurement (cm) × 50,000 = real distance in cm, then convert to metres or km.' }),

  makeMCQ({ id:'g5hg-ms-017', chapterId:'map-skills', difficulty:3,
    question:'A rainfall map shows isohyets at 1,000 mm, 2,000 mm and 3,000 mm. Port Louis falls between 1,000 and 2,000 mm. Curepipe falls between 2,000 and 3,000 mm. What can you CONCLUDE?',
    options:[
      'Port Louis receives more rainfall than Curepipe',
      'Curepipe receives more rainfall than Port Louis, consistent with orographic rainfall on the central plateau',
      'Both cities receive identical rainfall because they are on the same island',
      'The isohyets must be incorrect — all of Mauritius receives the same rainfall'
    ],
    answer:'Curepipe receives more rainfall than Port Louis, consistent with orographic rainfall on the central plateau',
    hint:'Higher isohyet values = more rain; higher altitude = more orographic rain.',
    explanation:'Curepipe (central plateau, ~550 m) lies between 2,000 and 3,000 mm isohyets — more than 2,000 mm per year. Port Louis (low-lying, leeward coast) lies between 1,000 and 2,000 mm — less than 2,000 mm. This is consistent with <b>orographic rainfall</b>: trade winds drop moisture on the plateau before reaching the rain shadow where Port Louis lies.' }),

  makeMCQ({ id:'g5hg-ms-018', chapterId:'map-skills', difficulty:3,
    question:'Port Louis is on the NORTH-WEST coast; Curepipe is on the SOUTH-EAST of the central plateau. In which direction do you travel from Port Louis to Curepipe?',
    options:['North','West','South-East','North-East'],
    answer:'South-East',
    hint:'If you start north-west and go to south-east, which direction are you heading?',
    explanation:'To travel from Port Louis (north-west) to Curepipe (south-east), you head <b>south-east</b>. On a compass, south-east is approximately 135°. This is consistent with the actual geography of Mauritius — Port Louis is on the north-west coast and Curepipe is in the south-east of the central plateau.' }),

  makeMCQ({ id:'g5hg-ms-019', chapterId:'map-skills', difficulty:4,
    question:'A geographer wants to find where in Mauritius gets the most rain, where the land is highest, and which towns are in the rain shadow. Which THREE types of map would they need?',
    options:[
      'A rainfall map (isohyets show rainfall), a topographic map (contours show altitude) and a political/settlement map (to locate town names)',
      'A population map, a road map and a temperature map',
      'A tourist map, a road map and a language map',
      'Any single combined map — there is no need for three separate maps'
    ],
    answer:'A rainfall map (isohyets show rainfall), a topographic map (contours show altitude) and a political/settlement map (to locate town names)',
    hint:'Match each question to the type of map that answers it.',
    explanation:'Three map types are needed: (1) <b>Rainfall map (isohyets)</b> — shows how much rain each area receives; (2) <b>Topographic map (contours)</b> — shows altitude and relief of the land; (3) <b>Political/settlement map</b> — names the towns so the geographer knows which communities are in the rain shadow or on high ground. Using all three together gives a complete picture of the relationship between relief, rainfall and settlement.' })

);
