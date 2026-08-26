'use strict';
// Grade 6 History & Geography - Chapter: Map Skills (contour lines, scale, grid references)
// IDs format: g6hg-ms-NNN  (Grade 6, extends Grade 5 lat/lon work)

// Contour map showing a hill
const _SVG_CONTOUR = `<svg viewBox="0 0 220 185" width="220" height="185" style="display:block;margin:6px auto;background:#f0fdf4;border-radius:8px;border:1px solid #86efac">
  <ellipse cx="110" cy="88" rx="100" ry="80" fill="none" stroke="#22c55e" stroke-width="1.8"/>
  <text x="12" y="92" font-size="7" fill="#15803d">100m</text>
  <ellipse cx="110" cy="88" rx="80" ry="63" fill="none" stroke="#16a34a" stroke-width="1.8"/>
  <text x="30" y="92" font-size="7" fill="#15803d">200m</text>
  <ellipse cx="110" cy="88" rx="60" ry="46" fill="none" stroke="#15803d" stroke-width="1.8"/>
  <text x="50" y="92" font-size="7" fill="#15803d">300m</text>
  <ellipse cx="110" cy="88" rx="40" ry="30" fill="none" stroke="#166534" stroke-width="1.8"/>
  <text x="70" y="92" font-size="7" fill="#166534">400m</text>
  <ellipse cx="110" cy="88" rx="20" ry="15" fill="#14532d" opacity="0.35" stroke="#14532d" stroke-width="1.8"/>
  <text x="110" y="91" text-anchor="middle" font-size="7" fill="#052e16" font-weight="bold">500m</text>
  <line x1="110" y1="8" x2="110" y2="165" stroke="#94a3b8" stroke-width="0.6" stroke-dasharray="3,3"/>
  <text x="110" y="6" text-anchor="middle" font-size="5.5" fill="#94a3b8">N</text>
  <text x="40" y="152" font-size="6.5" fill="#475569">Lines far apart =</text>
  <text x="40" y="161" font-size="6.5" fill="#475569">gentle slope</text>
  <text x="140" y="152" font-size="6.5" fill="#475569">Lines close =</text>
  <text x="140" y="161" font-size="6.5" fill="#475569">steep slope</text>
  <text x="110" y="178" text-anchor="middle" font-size="6" fill="#64748b">Contour map of a hill (each line = 100m height)</text>
</svg>`;

// Simple 4×4 grid for grid reference practice
const _SVG_GRID_REF = `<svg viewBox="0 0 180 180" width="180" height="180" style="display:block;margin:6px auto;background:#f0f9ff;border-radius:8px;border:1px solid #bae6fd">
  <line x1="30" y1="20" x2="30" y2="160" stroke="#94a3b8" stroke-width="1"/>
  <line x1="75" y1="20" x2="75" y2="160" stroke="#94a3b8" stroke-width="1"/>
  <line x1="120" y1="20" x2="120" y2="160" stroke="#94a3b8" stroke-width="1"/>
  <line x1="165" y1="20" x2="165" y2="160" stroke="#94a3b8" stroke-width="1"/>
  <line x1="15" y1="30" x2="170" y2="30" stroke="#94a3b8" stroke-width="1"/>
  <line x1="15" y1="75" x2="170" y2="75" stroke="#94a3b8" stroke-width="1"/>
  <line x1="15" y1="120" x2="170" y2="120" stroke="#94a3b8" stroke-width="1"/>
  <line x1="15" y1="160" x2="170" y2="160" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="170" font-size="8" fill="#475569" text-anchor="middle">1</text>
  <text x="75" y="170" font-size="8" fill="#475569" text-anchor="middle">2</text>
  <text x="120" y="170" font-size="8" fill="#475569" text-anchor="middle">3</text>
  <text x="165" y="170" font-size="8" fill="#475569" text-anchor="middle">4</text>
  <text x="10" y="30" font-size="8" fill="#475569" text-anchor="middle">D</text>
  <text x="10" y="75" font-size="8" fill="#475569" text-anchor="middle">C</text>
  <text x="10" y="120" font-size="8" fill="#475569" text-anchor="middle">B</text>
  <text x="10" y="160" font-size="8" fill="#475569" text-anchor="middle">A</text>
  <text x="52" y="52" font-size="14" fill="#dc2626" text-anchor="middle">&#9733;</text>
  <text x="52" y="62" font-size="6.5" fill="#dc2626" text-anchor="middle">School</text>
  <circle cx="120" cy="95" r="6" fill="#2563eb"/>
  <text x="128" y="99" font-size="6.5" fill="#2563eb">Lake</text>
  <text x="90" y="178" font-size="6.5" fill="#64748b" text-anchor="middle">Grid reference: column letter first, then row (e.g. 1D, 3B)</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6hg-ms-001', chapterId:'g6-map-skills', subsection:'contours', difficulty:1,
    question:`${_SVG_CONTOUR}What are CONTOUR LINES on a map?`,
    options:[
      'Lines that show the direction of rivers',
      'Lines connecting all points of equal altitude (height above sea level)',
      'Lines showing the boundaries between countries',
      'Lines connecting places with the same temperature'
    ],
    answer:'Lines connecting all points of equal altitude (height above sea level)',
    hint:'Each line in the diagram is labelled with a height in metres.',
    explanation:'<b>Contour lines</b> are lines on a map that connect all points at the same <b>altitude (height)</b> above sea level. By reading the contour lines, you can work out the shape and steepness of the land.' }),

  makeMCQ({ id:'g6hg-ms-002', chapterId:'g6-map-skills', subsection:'contours', difficulty:2,
    question:`${_SVG_CONTOUR}On the contour map above, what does it mean when contour lines are CLOSE TOGETHER?`,
    options:[
      'The land is very flat in that area',
      'The height difference is very small',
      'The slope is steep - the land rises sharply',
      'The area is below sea level'
    ],
    answer:'The slope is steep - the land rises sharply',
    hint:'If you have to gain a lot of height in a short horizontal distance, the slope is steep.',
    explanation:'<b>Closely spaced contour lines</b> show a <b>steep slope</b> - the land rises quickly over a short distance. <b>Widely spaced lines</b> show a gentle, gradual slope. This is shown in the note at the bottom of the diagram.' }),

  makeMCQ({ id:'g6hg-ms-003', chapterId:'g6-map-skills', subsection:'contours', difficulty:2,
    question:`${_SVG_CONTOUR}Using the contour map, what is the approximate height of the hill at its summit?`,
    options:['100 m','300 m','500 m','1000 m'],
    answer:'500 m',
    hint:'Look at the innermost (smallest) contour line - it is labelled.',
    explanation:'The summit (top) of the hill is shown by the innermost contour. The diagram labels it <b>500 m</b>. The contour lines at 100 m, 200 m, 300 m, 400 m and 500 m show the hill rising in stages.' }),

  makeMCQ({ id:'g6hg-ms-004', chapterId:'g6-map-skills', subsection:'coordinates', difficulty:2,
    question:`${_SVG_GRID_REF}Using the grid reference system in the diagram, what is the grid reference of the SCHOOL (star symbol)?`,
    options:['1C','2D','1D','2C'],
    answer:'1D',
    hint:'Read the column number FIRST (along the bottom), then the row letter (up the side). The star is in column 1, row D.',
    explanation:'Grid references are read by going <b>along the bottom first</b> (easting/column) <b>then up</b> (northing/row). The star (school) is in column <b>1</b>, row <b>D</b> - so the grid reference is <b>1D</b>.' }),

  makeMCQ({ id:'g6hg-ms-005', chapterId:'g6-map-skills', subsection:'coordinates', difficulty:2,
    question:`${_SVG_GRID_REF}What is the grid reference of the LAKE (blue circle)?`,
    options:['3A','3B','2C','3C'],
    answer:'3B',
    hint:'Count along the bottom to find the column, then up to find the row.',
    explanation:'The lake (blue circle) is in column <b>3</b> and row <b>B</b> - so its grid reference is <b>3B</b>. Always read the column (left-right/easting) BEFORE the row (up-down/northing).' }),

  makeMCQ({ id:'g6hg-ms-006', chapterId:'g6-map-skills', subsection:'scale', difficulty:2,
    question:'A map has a scale of 1:50,000. What does this mean?',
    options:[
      '1 cm on the map = 50,000 km in reality',
      '1 cm on the map = 500 m (0.5 km) in reality',
      '1 cm on the map = 50 cm in reality',
      '50,000 maps fit into 1 square km'
    ],
    answer:'1 cm on the map = 500 m (0.5 km) in reality',
    hint:'1:50,000 means 1 unit on the map = 50,000 of the same units in reality. Convert: 50,000 cm = 500 m.',
    explanation:'A scale of <b>1:50,000</b> means 1 cm on the map represents 50,000 cm (= 500 m = 0.5 km) in real life. To find a real distance: measure map distance in cm, then multiply by 500 m.' }),

  makeMCQ({ id:'g6hg-ms-007', chapterId:'g6-map-skills', subsection:'scale', difficulty:2,
    question:'On a map with scale 1:50,000, two towns are 6 cm apart. What is the real distance between them?',
    options:['6 km','3 km','30 km','300 m'],
    answer:'3 km',
    hint:'6 cm × 500 m per cm = ? m, then convert to km.',
    explanation:'Scale 1:50,000 → 1 cm = 500 m. Real distance = 6 × 500 m = 3,000 m = <b>3 km</b>.' }),

  makeMCQ({ id:'g6hg-ms-008', chapterId:'g6-map-skills', subsection:'symbols', difficulty:1,
    question:'What is a map LEGEND (key)?',
    options:[
      'The title of the map',
      'A box explaining what each symbol and colour on the map means',
      'The grid reference system',
      'The name of the person who drew the map'
    ],
    answer:'A box explaining what each symbol and colour on the map means',
    hint:'Without this, you cannot understand what the symbols on the map represent.',
    explanation:'A map <b>legend (key)</b> is a box that explains the meaning of all symbols, colours and patterns used on the map. For example: blue = water, green = forest, dotted line = path, triangle = peak. It is essential for correctly reading a map.' }),

  makeTF({ id:'g6hg-ms-009', chapterId:'g6-map-skills', subsection:'contours', difficulty:1,
    question:'Contour lines on a map that are very far apart indicate very steep slopes.',
    answer:false,
    hint:'Think about the relationship between line spacing and steepness.',
    explanation:'Widely spaced contour lines indicate <b>gentle slopes</b>. Steeply sloped areas have <b>closely spaced</b> contour lines because the altitude changes rapidly over a short horizontal distance.' }),

  makeMCQ({ id:'g6hg-ms-010', chapterId:'g6-map-skills', subsection:'contours', difficulty:2,
    question:'A hill on a contour map shows all lines forming closed loops around a centre. What does the INNERMOST (smallest) loop represent?',
    options:['The lowest point of the hill (valley)','The steepest side of the hill','The highest point (summit) of the hill','The base of the hill at sea level'],
    answer:'The highest point (summit) of the hill',
    hint:'As you move inward on the loops, you are going uphill.',
    explanation:'On a contour map of a hill, the lines form concentric loops. The <b>innermost (smallest) loop</b> represents the <b>highest point - the summit</b>. Each outward loop shows a lower contour level going down towards the base of the hill.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6hg-ms-011', chapterId:'g6-map-skills', subsection:'using_map', difficulty:1,
    question:'An area of flat and low land is called a: (PSAC 2025 Q1)',
    options:['Gorge','Plateau','Plain','Valley'],
    answer:'Plain',
    hint:'Think of the Northern Plains of Mauritius - flat, low land perfect for sugar cane.',
    explanation:'A <b>plain</b> is an area of flat and low land. In Mauritius, the <b>Northern Plains</b> (around Triolet, Mapou and Poudre d\'Or) are the main plain - flat, low-lying areas ideal for sugar cane cultivation. A <b>plateau</b> is flat but HIGH (like the central plateau of Mauritius). A <b>valley</b> is a low area between hills. A <b>gorge</b> is a narrow, deep valley.' }),

  makeMCQ({ id:'g6hg-ms-012', chapterId:'g6-map-skills', subsection:'coordinates', difficulty:2,
    question:'The line of latitude at 0° is called the: (PSAC 2025 Q8b)',
    options:['Prime Meridian','Tropic of Cancer','International Date Line','Equator'],
    answer:'Equator',
    hint:'It divides the Earth into the Northern and Southern Hemispheres.',
    explanation:'The <b>Equator</b> is the line of latitude at <b>0°</b>. It circles the Earth horizontally at its widest point, dividing it into the <b>Northern Hemisphere</b> (above) and <b>Southern Hemisphere</b> (below). Mauritius is located south of the Equator (approximately 20°S latitude). The <b>Prime Meridian</b> is the line of longitude at 0° (running through Greenwich, London).' }),

  makeMCQ({ id:'g6hg-ms-013', chapterId:'g6-map-skills', subsection:'using_map', difficulty:2,
    question:'A plane leaves SSR International Airport in Mauritius for Madagascar. In which direction does it fly? (PSAC 2025 Q8d)',
    options:['North','South-East','West','North-East'],
    answer:'West',
    hint:'Look at a map of the Indian Ocean - where is Madagascar relative to Mauritius?',
    explanation:'Madagascar lies to the <b>west</b> of Mauritius (approximately 800 km to the west-northwest). Therefore, a plane from SSR International Airport (Mauritius) heading to Madagascar would fly <b>west</b>. The PSAC 2025 Q8 tested compass direction reading from a map of the Indian Ocean region. Knowing cardinal directions (N, S, E, W) and the relative positions of Indian Ocean islands is important in Grade 6.' }),

  makeMCQ({ id:'g6hg-ms-014', chapterId:'g6-map-skills', subsection:'using_map', difficulty:2,
    question:'The district of GRAND BAIE is described in the PSAC 2025 map as a busy tourist resort. Where is Grand Baie located?',
    options:['On the south coast','On the east coast','On the north coast','On the west coast'],
    answer:'On the north coast',
    hint:'Grand Baie is the most famous beach resort area in Mauritius - it is in the North district.',
    explanation:'<b>Grand Baie</b> is located on the <b>north coast</b> of Mauritius (in the Rivière du Rempart district). It is Mauritius\'s most famous tourist resort, known for its beautiful beach, water sports, restaurants and shopping. PSAC 2025 Q3 used a map of Mauritius and asked students to identify Grand Baie as a "busy tourist resort" and identify the Fort Frederik Hendrik Museum at Vieux Grand Port.' }),

  makeMCQ({ id:'g6hg-ms-015', chapterId:'g6-map-skills', subsection:'contours', difficulty:2,
    question:'What does a SPOT HEIGHT on a map show?',
    options:[
      'The exact depth of a river at that point',
      'The precise altitude (height above sea level) of a specific point on the land, shown as a number',
      'The distance from that point to the nearest town',
      'The temperature at that point on the map'
    ],
    answer:'The precise altitude (height above sea level) of a specific point on the land, shown as a number',
    hint:'You often see a small dot with a number like ".643" on a topographic map - that is the height in metres.',
    explanation:'A <b>spot height</b> is a precise measurement of height above sea level at a specific point, shown as a dot (•) with a number on a topographic map. Unlike contour lines (which show height bands), spot heights give the <b>exact elevation</b> at one point. Mountain peaks and hilltops are often marked with spot heights. Example: "• 828" next to Pieter Both means it is 828 metres above sea level.' }),

  makeTF({ id:'g6hg-ms-016', chapterId:'g6-map-skills', subsection:'coordinates', difficulty:1,
    question:'When reading a grid reference, you read the column number (along the bottom) BEFORE the row letter (up the side).',
    answer:true,
    hint:'Remember: "along the corridor, then up the stairs."',
    explanation:'<b>True.</b> The correct order for grid references is: <b>column first (left to right), then row (bottom to top)</b>. The memory phrase used in schools is "<b>along the corridor, then up the stairs.</b>" For example, if a school is in column 1, row D, the grid reference is "1D." Always give the horizontal (easting) coordinate before the vertical (northing) coordinate.' }),

  makeMCQ({ id:'g6hg-ms-017', chapterId:'g6-map-skills', subsection:'using_map', difficulty:2,
    question:'The Chagos Archipelago is a group of islands in the Indian Ocean. How is it classified in the MIE Grade 6 textbook?',
    options:['A volcanic island group','A coral atoll group','A continental island group','A mangrove island group'],
    answer:'A coral atoll group',
    hint:'Atolls are ring-shaped coral islands that form on the rims of underwater volcanoes.',
    explanation:'The MIE Grade 6 H&G textbook classifies the islands of Mauritius as: volcanic islands (Mauritius and Rodrigues), coral islands (Agaléga, Saint Brandon/Cargados Carajos, Tromelin, Chagos Archipelago), and coral atoll (Diego Garcia, part of the Chagos Archipelago). The <b>Chagos Archipelago</b> is listed as a <b>coral island group</b> that forms part of the territory of Mauritius.' }),

  makeMCQ({ id:'g6hg-ms-018', chapterId:'g6-map-skills', subsection:'scale', difficulty:3,
    question:'On a map with scale 1:25,000, two villages are 4 cm apart. What is the REAL distance between them?',
    options:['100 m','250 m','1 km','25 km'],
    answer:'1 km',
    hint:'Scale 1:25,000 → 1 cm = 25,000 cm. Convert 25,000 cm to metres and then km.',
    explanation:'Scale 1:25,000 means 1 cm on the map = 25,000 cm in real life. 25,000 cm = <b>250 m</b> per cm. Real distance = 4 cm × 250 m = <b>1,000 m = 1 km</b>. Compare with 1:50,000 scale: 1 cm = 500 m (used in PSAC). The larger the second number in a scale, the smaller the map features appear relative to real life.' }),

  makeMCQ({ id:'g6hg-ms-019', chapterId:'g6-map-skills', subsection:'using_map', difficulty:4,
    question:'A map shows mountain range P with the label "Himalayas", and group of islands R as the "Chagos Archipelago." These are tested in a map of the INDIAN OCEAN REGION (PSAC 2025 Q8). In which direction are the Himalayas from Mauritius?',
    options:['South','West','North','East'],
    answer:'North',
    hint:'The Himalayas are in Asia - is Asia north or south of Mauritius?',
    explanation:'The <b>Himalayas</b> are located in <b>north</b> Asia (spanning Nepal, India, Bhutan, Tibet and Pakistan) - to the <b>north</b> of Mauritius. Mauritius is at approximately 20°S latitude; the Himalayas are at approximately 28–36°N latitude. PSAC 2025 Q8 used a map of the Indian Ocean region requiring students to identify the Himalayas (mountain range P) and the Chagos Archipelago (island group R), and understand compass directions in this regional context.' })

);

// ── Mauritius Physical Map — river & mountain reading questions ──────────────
const _SVG_G6_MUS_PHYS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 400" style="max-width:100%;max-height:280px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"><rect width="420" height="400" fill="#dbeafe"/><text x="210" y="18" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a" font-family="sans-serif">Mauritius — Physical Features</text><path d="M 85,105 Q 120,60 200,30 Q 270,20 330,75 Q 370,130 370,210 Q 365,270 335,315 Q 270,360 200,360 Q 140,355 90,290 Q 55,240 55,180 Q 58,130 85,105 Z" fill="#d1fae5" stroke="#6ee7b7" stroke-width="2"/><path d="M 210,220 Q 260,250 340,295" fill="none" stroke="#3b82f6" stroke-width="2"/><text x="255" y="243" font-size="7" fill="#1d4ed8" font-style="italic" font-family="sans-serif">Gd. R. South East</text><path d="M 140,250 Q 100,255 62,240" fill="none" stroke="#3b82f6" stroke-width="2"/><text x="78" y="251" font-size="7" fill="#1d4ed8" font-style="italic" font-family="sans-serif">Black River</text><path d="M 205,185 Q 215,120 225,45" fill="none" stroke="#3b82f6" stroke-width="2"/><text x="220" y="115" font-size="7" fill="#1d4ed8" font-style="italic" font-family="sans-serif">R. du Rempart</text><path d="M 175,175 Q 135,145 88,118" fill="none" stroke="#3b82f6" stroke-width="2"/><text x="105" y="137" font-size="7" fill="#1d4ed8" font-style="italic" font-family="sans-serif">Gd. R. NW</text><text x="108" y="256" font-size="12" fill="#dc2626" font-family="sans-serif">▲</text><text x="118" y="253" font-size="8" fill="#991b1b" font-weight="bold" font-family="sans-serif">Piton PNR ★</text><text x="118" y="262" font-size="7" fill="#991b1b" font-family="sans-serif">828m (highest)</text><text x="233" y="167" font-size="12" fill="#dc2626" font-family="sans-serif">▲</text><text x="241" y="163" font-size="8" fill="#991b1b" font-family="sans-serif">Pieter Both</text><text x="241" y="172" font-size="7" fill="#991b1b" font-family="sans-serif">823m</text><text x="148" y="132" font-size="12" fill="#dc2626" font-family="sans-serif">▲</text><text x="156" y="128" font-size="8" fill="#991b1b" font-family="sans-serif">Le Pouce</text><text x="156" y="137" font-size="7" fill="#991b1b" font-family="sans-serif">811m</text><text x="183" y="237" font-size="12" fill="#dc2626" font-family="sans-serif">▲</text><text x="190" y="233" font-size="7" fill="#991b1b" font-family="sans-serif">Corps de Garde</text><text x="190" y="242" font-size="7" fill="#991b1b" font-family="sans-serif">720m</text><text x="151" y="212" font-size="12" fill="#dc2626" font-family="sans-serif">▲</text><text x="122" y="210" font-size="7" fill="#991b1b" font-family="sans-serif">Trois Mamelles 629m</text><circle cx="82" cy="108" r="4" fill="#fbbf24" stroke="#92400e" stroke-width="1.2"/><text x="89" y="106" font-size="8" fill="#92400e" font-weight="bold" font-family="sans-serif">Port Louis ★</text><text x="89" y="115" font-size="7" fill="#92400e" font-family="sans-serif">Capital</text><circle cx="210" cy="248" r="3" fill="#fbbf24" stroke="#92400e" stroke-width="1"/><text x="216" y="252" font-size="7" fill="#374151" font-family="sans-serif">Curepipe</text><circle cx="328" cy="296" r="3" fill="#fbbf24" stroke="#92400e" stroke-width="1"/><text x="290" y="293" font-size="7" fill="#374151" font-family="sans-serif">Mahebourg</text><circle cx="178" cy="232" r="3" fill="#fbbf24" stroke="#92400e" stroke-width="1"/><text x="132" y="230" font-size="7" fill="#374151" font-family="sans-serif">Quatre Bornes</text><line x1="390" y1="22" x2="390" y2="52" stroke="#374151" stroke-width="1.2"/><line x1="375" y1="37" x2="405" y2="37" stroke="#374151" stroke-width="1.2"/><polygon points="390,22 386,32 390,28 394,32" fill="#1e3a8a"/><text x="390" y="20" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e3a8a" font-family="sans-serif">N</text><text x="407" y="40" font-size="7" fill="#374151" font-family="sans-serif">E</text><text x="373" y="40" text-anchor="end" font-size="7" fill="#374151" font-family="sans-serif">W</text><text x="390" y="60" text-anchor="middle" font-size="7" fill="#374151" font-family="sans-serif">S</text><rect x="10" y="335" width="128" height="58" rx="4" fill="white" fill-opacity="0.88" stroke="#d1d5db" stroke-width="1"/><text x="16" y="348" font-size="8" font-weight="bold" fill="#374151" font-family="sans-serif">Legend</text><line x1="16" y1="356" x2="32" y2="356" stroke="#3b82f6" stroke-width="2"/><text x="36" y="360" font-size="7" fill="#374151" font-family="sans-serif">River</text><text x="16" y="370" font-size="10" fill="#dc2626" font-family="sans-serif">▲</text><text x="28" y="371" font-size="7" fill="#374151" font-family="sans-serif">Mountain peak</text><text x="16" y="382" font-size="9" fill="#dc2626" font-family="sans-serif">▲★</text><text x="28" y="383" font-size="7" fill="#374151" font-family="sans-serif">Highest peak</text><circle cx="18" cy="390" r="3" fill="#fbbf24" stroke="#92400e" stroke-width="1"/><text x="24" y="393" font-size="7" fill="#374151" font-family="sans-serif">Town  ★=Capital</text></svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6hg-ms-020', chapterId:'g6-map-skills', subsection:'directions', difficulty:2,
    question:`<div style="text-align:center;margin-bottom:12px">${_SVG_G6_MUS_PHYS}</div><b>Using the map, identify the river that drains the BLACK RIVER GORGES area toward the south-west coast.</b>`,
    options:['Rivière du Rempart','Grand River South East','Grand River North West','Black River (Rivière Noire)'],
    answer:'Black River (Rivière Noire)',
    hint:'Black River Gorges is in the south-west. Which river on the map flows in that direction?',
    explanation:'The <b>Black River (Rivière Noire)</b> drains the south-west highlands — including the Black River Gorges National Park area — and flows to the south-west coast. The Black River Gorges National Park, Mauritius\'s largest nature reserve, is named after this river.' }),

  makeMCQ({ id:'g6hg-ms-021', chapterId:'g6-map-skills', subsection:'using_map', difficulty:3,
    question:`<div style="text-align:center;margin-bottom:12px">${_SVG_G6_MUS_PHYS}</div><b>Which TWO mountains on the map have elevations above 820 metres?</b>`,
    options:['Le Pouce (811m) and Corps de Garde (720m)','Trois Mamelles (629m) and Le Pouce (811m)','Corps de Garde (720m) and Pieter Both (823m)','Piton de la Petite Rivière Noire (828m) and Pieter Both (823m)'],
    answer:'Piton de la Petite Rivière Noire (828m) and Pieter Both (823m)',
    hint:'Read the elevation labels on the map carefully. Which two numbers are greater than 820?',
    explanation:'Only <b>Piton de la Petite Rivière Noire (828m)</b> and <b>Pieter Both (823m)</b> exceed 820m. Le Pouce is 811m (just below 820m), Corps de Garde is 720m, and Trois Mamelles is 629m. These two highest peaks dominate the central mountain range of Mauritius.' }),

  makeMCQ({ id:'g6hg-ms-022', chapterId:'g6-map-skills', subsection:'directions', difficulty:3,
    question:`<div style="text-align:center;margin-bottom:12px">${_SVG_G6_MUS_PHYS}</div><b>A geographer states: "This river rises on the central plateau and flows northward to the coast." Which river is described?</b>`,
    options:['Black River (Rivière Noire)','Grand River South East','Grand River North West','Rivière du Rempart'],
    answer:'Rivière du Rempart',
    hint:'Trace the river paths on the map. Which one flows from the central area straight northward?',
    explanation:'<b>Rivière du Rempart</b> rises on the central plateau and flows <b>northward</b> to the north coast. It passes through the Rivière du Rempart district which takes its name from the river. A geographer can determine a river\'s drainage direction by reading the map and checking which coast the river reaches.' }),

  makeMCQ({ id:'g6hg-ms-023', chapterId:'g6-map-skills', subsection:'using_map', difficulty:2,
    question:`<div style="text-align:center;margin-bottom:12px">${_SVG_G6_MUS_PHYS}</div><b>Which mountain on the map lies between Port Louis and Curepipe?</b>`,
    options:['Pieter Both (823m)','Corps de Garde (720m)','Trois Mamelles (629m)','Le Pouce (811m)'],
    answer:'Le Pouce (811m)',
    hint:'Find Port Louis (north-west) and Curepipe (central south). Which mountain is between them?',
    explanation:'<b>Le Pouce</b> (811m) lies between Port Louis on the north-west coast and Curepipe on the central plateau. Its name means "The Thumb" in French. It is visible from Port Louis and is a landmark that hikers use to gauge the direction to the capital.' }),

  makeMCQ({ id:'g6hg-ms-024', chapterId:'g6-map-skills', subsection:'using_map', difficulty:2,
    question:`<div style="text-align:center;margin-bottom:12px">${_SVG_G6_MUS_PHYS}</div><b>The town of Mahebourg is located on which coast of Mauritius?</b>`,
    options:['North coast','West coast','South-West coast','South-East coast'],
    answer:'South-East coast',
    hint:'Find the dot for Mahebourg on the map and look at which edge of the island it is near.',
    explanation:'<b>Mahebourg</b> is on the <b>south-east coast</b> of Mauritius, near the mouth of the Grand River South East. It is a historically important town — the Battle of Grand Port (1810) was fought nearby. Today it is known for its National History Museum and the Blue Bay Marine Park.' }),

  makeMCQ({ id:'g6hg-ms-025', chapterId:'g6-map-skills', subsection:'using_map', difficulty:3,
    question:`<div style="text-align:center;margin-bottom:12px">${_SVG_G6_MUS_PHYS}</div><b>Based on this map, which statement about the rivers of Mauritius is TRUE?</b>`,
    options:[
      'All rivers flow northward because Mauritius is in the Southern Hemisphere',
      'Rivers rise in the central highlands and flow outward to all coasts',
      'Mauritius has only one major river — the Grand River South East',
      'Rivers in Mauritius flow from the coast toward the central plateau'
    ],
    answer:'Rivers rise in the central highlands and flow outward to all coasts',
    hint:'Look at all four river paths on the map — where do they start and where do they go?',
    explanation:'The map shows that <b>all rivers rise in the central highlands</b> and flow <b>outward</b> in different directions — north (R. du Rempart), north-west (Grand R. NW), south-west (Black River), and south-east (Grand R. SE). This radial drainage pattern is typical of volcanic islands where the central plateau is the highest point and rivers flow down in all directions to the coast.' })

);
