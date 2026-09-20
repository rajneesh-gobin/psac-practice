'use strict';
// Grade 6 History & Geography - Land Use, second file: the Grade 6 outcomes the
// chapter was not asking, and the first figures it has ever had.
//
// ⚠ WHY THIS FILE EXISTS. scripts/fact-ledgers/grade6-history.json, built from the
//   MIE Grade 6 LAND USE table (Geography TLS, printed pages 22-25), reported five
//   outcomes with no question behind them:
//     lnd-03  give reasons to account for the different types of land use
//     lnd-04  define the term 'wasteland'
//     lnd-06  define 'agriculture' and explain its importance
//     lnd-22  draw and label a map showing types of land use, with all the key
//             items (title, scale, direction, key)
//     lnd-23  read and interpret data, maps, pictures and diagrams on land use
//             and on CHANGES in land use
//   ⚠ The last two cannot be asked without a map to read. The chapter held 125
//     questions and NOT ONE figure, so those two outcomes were unaskable rather
//     than merely unasked.
//
// ⚠ One new subsection, `land_use_types`, declared in _manifest.js. Declared and
//   tagged ids must match exactly or scripts/test-subsection-invariant.js fails.
//
// ⚠ The map and the questions must agree to the pixel: the scale bar is 17px to
//   the kilometre, so the village and the hotel (68px apart on the same row) are
//   4 km apart, and the key carries exactly four types.
//
// IDs: g6hg-lu-020 onwards (the first land-use file ends at 019).

const _SVG_LU_MAP = `<svg viewBox="0 0 250 192" width="250" height="192" role="img" aria-label="A district map shaded into areas, with a key" style="display:block;margin:6px auto;background:#f8fafc;border-radius:8px;border:1px solid #cbd5e1">
  <text x="92" y="16" text-anchor="middle" font-size="9" font-weight="bold" fill="#0f172a">Land use in Belle Plaine district</text>
  <rect x="14" y="24" width="96" height="72" fill="#86efac"/>
  <rect x="14" y="96" width="34" height="44" fill="#15803d"/>
  <rect x="48" y="96" width="80" height="44" fill="#d6d3d1"/>
  <rect x="128" y="24" width="22" height="116" fill="#fb923c"/>
  <rect x="110" y="24" width="18" height="72" fill="#86efac"/>
  <rect x="150" y="24" width="20" height="116" fill="#bae6fd"/>
  <text x="160" y="86" text-anchor="middle" font-size="5.5" fill="#0369a1" transform="rotate(-90 160 86)">Indian Ocean</text>
  <rect x="14" y="24" width="156" height="116" fill="none" stroke="#334155" stroke-width="1"/>
  <line x1="72" y1="118" x2="140" y2="118" stroke="#78350f" stroke-width="1.4" stroke-dasharray="4,2"/>
  <circle cx="72" cy="118" r="3" fill="#1e293b"/><text x="66" y="132" font-size="7" fill="#1e293b">V</text>
  <circle cx="140" cy="118" r="3" fill="#1e293b"/><text x="136" y="132" font-size="7" fill="#1e293b">H</text>
  <line x1="20" y1="158" x2="54" y2="158" stroke="#0f172a" stroke-width="2"/>
  <line x1="20" y1="154" x2="20" y2="162" stroke="#0f172a" stroke-width="2"/>
  <line x1="54" y1="154" x2="54" y2="162" stroke="#0f172a" stroke-width="2"/>
  <text x="20" y="172" text-anchor="middle" font-size="6.5" fill="#0f172a">0</text>
  <text x="56" y="172" text-anchor="middle" font-size="6.5" fill="#0f172a">2 km</text>
  <polygon points="100,150 95,164 105,164" fill="#0f172a"/>
  <text x="100" y="178" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#0f172a">N</text>
  <rect x="178" y="26" width="66" height="68" fill="#fff" stroke="#334155" stroke-width="1"/>
  <text x="211" y="37" text-anchor="middle" font-size="7" font-weight="bold" fill="#0f172a">Key</text>
  <rect x="183" y="43" width="9" height="7" fill="#86efac"/><text x="196" y="50" font-size="6.5" fill="#0f172a">sugar cane</text>
  <rect x="183" y="55" width="9" height="7" fill="#15803d"/><text x="196" y="62" font-size="6.5" fill="#0f172a">forest</text>
  <rect x="183" y="67" width="9" height="7" fill="#d6d3d1"/><text x="196" y="74" font-size="6.5" fill="#0f172a">town</text>
  <rect x="183" y="79" width="9" height="7" fill="#fb923c"/><text x="196" y="86" font-size="6.5" fill="#0f172a">hotels</text>
  <text x="211" y="110" text-anchor="middle" font-size="6" fill="#475569">V = village</text>
  <text x="211" y="120" text-anchor="middle" font-size="6" fill="#475569">H = hotel</text>
</svg>`;

const _SVG_LU_THEN_NOW = `<svg viewBox="0 0 260 168" width="260" height="168" role="img" aria-label="Two maps of the same district at two different dates" style="display:block;margin:6px auto;background:#fffbeb;border-radius:8px;border:1px solid #fcd34d">
  <text x="66" y="16" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#78350f">The district in 1975</text>
  <rect x="14" y="22" width="104" height="82" fill="#86efac"/>
  <rect x="14" y="86" width="22" height="18" fill="#d6d3d1"/>
  <rect x="104" y="22" width="14" height="82" fill="#bae6fd"/>
  <rect x="14" y="22" width="104" height="82" fill="none" stroke="#78350f" stroke-width="1"/>
  <text x="194" y="16" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#78350f">The same district today</text>
  <rect x="142" y="22" width="104" height="82" fill="#86efac"/>
  <rect x="142" y="70" width="58" height="34" fill="#d6d3d1"/>
  <rect x="218" y="22" width="14" height="82" fill="#fb923c"/>
  <rect x="232" y="22" width="14" height="82" fill="#bae6fd"/>
  <rect x="142" y="22" width="104" height="82" fill="none" stroke="#78350f" stroke-width="1"/>
  <rect x="40" y="124" width="9" height="7" fill="#86efac"/><text x="53" y="131" font-size="6.5" fill="#78350f">sugar cane</text>
  <rect x="110" y="124" width="9" height="7" fill="#d6d3d1"/><text x="123" y="131" font-size="6.5" fill="#78350f">houses</text>
  <rect x="168" y="124" width="9" height="7" fill="#fb923c"/><text x="181" y="131" font-size="6.5" fill="#78350f">hotels</text>
  <rect x="218" y="124" width="9" height="7" fill="#bae6fd"/><text x="231" y="131" font-size="6.5" fill="#78350f">sea</text>
  <text x="130" y="150" text-anchor="middle" font-size="6.5" fill="#92400e">Both maps show the same area, drawn at two different dates</text>
</svg>`;

const _TBL_LU = `<table style="border-collapse:collapse;margin:8px auto;font-size:.85rem">
  <caption style="font-weight:700;padding-bottom:4px">Land in one district, in hectares</caption>
  <tr><th style="border:1px solid #94a3b8;padding:3px 10px">How the land is used</th><th style="border:1px solid #94a3b8;padding:3px 10px">Hectares</th></tr>
  <tr><td style="border:1px solid #94a3b8;padding:3px 10px">Sugar cane</td><td style="border:1px solid #94a3b8;padding:3px 10px">1 250</td></tr>
  <tr><td style="border:1px solid #94a3b8;padding:3px 10px">Forest</td><td style="border:1px solid #94a3b8;padding:3px 10px">500</td></tr>
  <tr><td style="border:1px solid #94a3b8;padding:3px 10px">Houses and roads</td><td style="border:1px solid #94a3b8;padding:3px 10px">500</td></tr>
  <tr><td style="border:1px solid #94a3b8;padding:3px 10px">Hotels</td><td style="border:1px solid #94a3b8;padding:3px 10px">150</td></tr>
  <tr><td style="border:1px solid #94a3b8;padding:3px 10px">Wasteland</td><td style="border:1px solid #94a3b8;padding:3px 10px">100</td></tr>
</table>`;

STATIC_QUESTIONS.push(

  // ── What the types are, and why ─────────────────────────────────────────
  makeMCQ({ id:'g6hg-lu-020', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:1,
    question:'A block of flats and a street of houses are examples of which type of land use?',
    options:['Residential','Industrial','Commercial','Agricultural'], answer:'Residential',
    hint:'Think about what people do in a house: they reside, or live, there.',
    explanation:'Land built on for people to live on is <b>residential</b> land use. "Reside" means to live somewhere.' }),

  makeMCQ({ id:'g6hg-lu-021', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:1,
    question:'A textile factory and a cement works are examples of which type of land use?',
    options:['Industrial','Residential','Recreational','Agricultural'], answer:'Industrial',
    hint:'Factories make things, and the making of things is industry.',
    explanation:'Land used for making goods is <b>industrial</b> land use. In Mauritius much of it is grouped into industrial zones.' }),

  makeMCQ({ id:'g6hg-lu-022', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:2,
    question:'A market, a bank and a row of shops are examples of which type of land use?',
    options:['Commercial','Industrial','Residential','Recreational'], answer:'Commercial',
    hint:'All three are places where things are bought and sold.',
    explanation:'Land used for buying and selling is <b>commercial</b> land use. Commerce means trade.' }),

  makeMCQ({ id:'g6hg-lu-023', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:2,
    question:'What is meant by <b>wasteland</b>?',
    options:['Land that is not used for anything','Land where rubbish is buried','Land that has been built on','Land kept for growing crops'], answer:'Land that is not used for anything',
    hint:'The word describes land that is going to waste, not land full of waste.',
    explanation:'<b>Wasteland</b> is land that is left unused &mdash; too rocky, too steep or too poor to farm or build on. It does not mean a rubbish dump, which is a use of land.' }),

  makeMCQ({ id:'g6hg-lu-024', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:3,
    question:'Why is some land in Mauritius left as wasteland instead of being farmed?',
    options:['It is too rocky or too steep to use','It belongs to nobody at all','The law forbids using it','It is always under water'], answer:'It is too rocky or too steep to use',
    hint:'Think about what a farmer needs from a piece of ground.',
    explanation:'Land that is <b>too rocky, too steep or too poor</b> cannot be ploughed or built on easily, so it is left unused. The shape and quality of the land is one of the reasons land use differs from place to place.' }),

  makeMCQ({ id:'g6hg-lu-025', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:3,
    question:'Why is flat, deep soil usually planted with sugar cane while steep slopes are left under forest?',
    options:['Flat land is easier to plough and harvest','Cane cannot grow in a cool place','Forest trees need steep ground','Flat land receives no rain'], answer:'Flat land is easier to plough and harvest',
    hint:'Picture a tractor working on a steep hillside.',
    explanation:'Machines work safely on <b>flat land</b>, and the soil there is deeper, so it is used for cane. Steep slopes are hard to work and are left wooded, which also holds the soil in place.' }),

  makeMCQ({ id:'g6hg-lu-026', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:3,
    question:'Why do factories and warehouses cluster near Port Louis harbour?',
    options:['Goods can be shipped in and out quickly','The land there is the cheapest','The air is cooler by the sea','Farming is forbidden near a port'], answer:'Goods can be shipped in and out quickly',
    hint:'Think about what a factory needs to receive and to send away.',
    explanation:'A factory near the harbour can <b>bring in raw materials and send out goods quickly</b>, which cuts transport costs. Nearness to a port is one of the reasons land is used the way it is.' }),

  makeMCQ({ id:'g6hg-lu-027', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:2,
    question:'Which of these best explains why land use is not the same everywhere on the island?',
    options:['Different places suit different uses','All the land belongs to the state','Every district makes its own law','Land use is decided by chance'], answer:'Different places suit different uses',
    hint:'Think of the coast, the flat cane land and the steep uplands.',
    explanation:'The slope, the soil, the rainfall and the nearness of a road, a town or the sea all decide what a piece of land is good for, so <b>different places suit different uses</b>.' }),

  makeMCQ({ id:'g6hg-lu-028', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:4,
    question:'A flat field beside a main road on the edge of a growing town is sold. Which use is it most likely to be put to?',
    options:['Houses and shops','A nature reserve','A deep-water harbour','A mountain trail'], answer:'Houses and shops',
    hint:'Weigh up the three clues together: flat, beside a road, beside a growing town.',
    explanation:'Flat land on a road at the edge of a growing town is exactly where a town spreads, so <b>houses and shops</b> are most likely. A harbour needs the sea and a trail needs a mountain.' }),

  makeMCQ({ id:'g6hg-lu-029', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:2,
    question:'A field of sugar cane, a hotel and a forest are three different:',
    options:['types of land use','kinds of soil','map scales','compass directions'], answer:'types of land use',
    hint:'Each one is a different answer to the question "what is this land used for?"',
    explanation:'Each is a different answer to "what is this land used for?", so each is a <b>type of land use</b>.' }),

  // ── Reading a land-use map ──────────────────────────────────────────────
  makeMCQ({ id:'g6hg-lu-030', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:1,
    question:`${_SVG_LU_MAP}How many types of land use does the key on this map show?`,
    options:['Four','Three','Five','Six'], answer:'Four',
    hint:'Count the entries inside the box marked Key.',
    explanation:'The key lists <b>four</b>: sugar cane, forest, town and hotels. The sea is labelled on the map itself and is not a land use.' }),

  makeMCQ({ id:'g6hg-lu-031', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:1,
    question:`${_SVG_LU_MAP}According to the key, what covers the largest part of this district?`,
    options:['Sugar cane','Forest','Hotels','The town'], answer:'Sugar cane',
    hint:'Match each colour in the key to the areas on the map, then compare their sizes.',
    explanation:'The pale green of <b>sugar cane</b> covers more of the map than any other colour &mdash; the usual pattern in a Mauritian district.' }),

  makeMCQ({ id:'g6hg-lu-032', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:2,
    question:`${_SVG_LU_MAP}Which four items does this map carry, as every good map should?`,
    options:['Title, scale, direction and key','Title, colour, border and date','Key, photo, border and name','Scale, grid, photo and title'], answer:'Title, scale, direction and key',
    hint:'Look at the top, the bottom left, the bottom middle and the box on the right.',
    explanation:'It has a <b>title</b> (which district), a <b>scale</b> (0 to 2 km), a <b>direction</b> arrow pointing north and a <b>key</b>. A land-use map you draw yourself must carry all four.' }),

  makeMCQ({ id:'g6hg-lu-033', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:2,
    question:`${_SVG_LU_MAP}Where on this map are the hotels built?`,
    options:['Along the coast','Around the forest','In the middle of the cane','Beside the town square'], answer:'Along the coast',
    hint:'Find the hotel colour in the key, then see which edge of the map it follows.',
    explanation:'The orange strip runs down the edge beside the Indian Ocean, so the hotels are <b>along the coast</b> &mdash; where nearly all Mauritian hotels are built, near the sandy beaches.' }),

  makeMCQ({ id:'g6hg-lu-034', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:2,
    question:`${_SVG_LU_MAP}In which direction is the forest from the town?`,
    options:['West','East','North','South'], answer:'West',
    hint:'The north arrow is below the map, so west is to the left.',
    explanation:'With north at the top, the left of the map is west, and the dark green forest lies to the left of the grey town, so it is <b>west</b> of it.' }),

  makeMCQ({ id:'g6hg-lu-035', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:3,
    question:`${_SVG_LU_MAP}Using the scale, about how far is the village V from the hotel H?`,
    options:['About 4 km','About 2 km','About 8 km','About 1 km'], answer:'About 4 km',
    hint:'The scale bar is 2 km long. How many scale bars fit between V and H?',
    explanation:'The gap between V and H is about two scale bars, and each bar is 2&nbsp;km, so the distance is <b>about 4&nbsp;km</b>. A scale turns a length on paper into a real distance.' }),

  makeMCQ({ id:'g6hg-lu-036', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:2,
    question:`${_SVG_LU_MAP}The land between the town and the hotels is shown in the hotel colour. What does that tell you?`,
    options:['Hotels reach right up to the town','The town has no hotels at all','The hotels are inland','The town is beside the forest'], answer:'Hotels reach right up to the town',
    hint:'Follow the orange strip and see where it stops.',
    explanation:'The orange strip runs all the way down to meet the town, so the <b>hotel land reaches the edge of the town</b>. Reading where one use meets another is part of reading a land-use map.' }),

  makeMCQ({ id:'g6hg-lu-037', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:3,
    question:'A pupil draws a land-use map but leaves out the key. What can a reader no longer do?',
    options:['Tell what each colour stands for','Tell which way is north','Work out real distances','Tell which district it shows'], answer:'Tell what each colour stands for',
    hint:'Take each of the four map items away in turn and ask what is lost.',
    explanation:'Without a key the colours mean nothing, so the reader cannot <b>tell what each one stands for</b>. The north arrow, the scale and the title would still do their own jobs.' }),

  makeMCQ({ id:'g6hg-lu-038', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:3,
    question:'A land-use map is drawn with a key and a title but no scale. Which question can it no longer answer?',
    options:['How far apart two places are','What each colour means','Which area is shown','Which way is north'], answer:'How far apart two places are',
    hint:'Work out which item is missing, then what that item was for.',
    explanation:'The scale is what turns a length on the paper into a real distance, so without it you cannot say <b>how far apart two places are</b>.' }),

  makeMCQ({ id:'g6hg-lu-039', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:4,
    question:`${_SVG_LU_MAP}A company wants to build a new hotel in this district. Using the map, where should it go and why?`,
    options:['Beside the sea, next to the other hotels','In the middle of the cane fields','Inside the forest on the west','In the centre of the town'], answer:'Beside the sea, next to the other hotels',
    hint:'Look at where every hotel already on the map has been built.',
    explanation:'Every hotel on the map lies <b>beside the sea</b>, because tourists come for the beaches &mdash; so that is where a new one belongs. Using a map to decide something is the hardest thing the syllabus asks of you.' }),

  makeMCQ({ id:'g6hg-lu-040', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:2,
    question:`${_TBL_LU}Which use takes up the most land in this district?`,
    options:['Sugar cane','Forest','Houses and roads','Hotels'], answer:'Sugar cane',
    hint:'Look down the Hectares column for the largest number.',
    explanation:'Sugar cane covers 1&nbsp;250 hectares, more than any other use in the table.' }),

  makeMCQ({ id:'g6hg-lu-041', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:3,
    question:`${_TBL_LU}The district covers 2 500 hectares in all. What fraction of it is under sugar cane?`,
    options:['A half','A quarter','A third','A fifth'], answer:'A half',
    hint:'Compare 1 250 with 2 500.',
    explanation:'1&nbsp;250 out of 2&nbsp;500 is <b>a half</b> of the district. Turning two numbers from a table into a fraction is a Level 3 skill.' }),

  makeMCQ({ id:'g6hg-lu-042', chapterId:'g6-land-use', subsection:'land_use_types', difficulty:2,
    question:`${_TBL_LU}Which two uses cover exactly the same area?`,
    options:['Forest and houses','Cane and forest','Hotels and wasteland','Houses and hotels'], answer:'Forest and houses',
    hint:'Look for two rows with the same number beside them.',
    explanation:'Forest and houses and roads both take <b>500 hectares</b>. Spotting equal values is one of the things a table makes easy.' }),

  // ── Reading a CHANGE in land use ────────────────────────────────────────
  makeMCQ({ id:'g6hg-lu-043', chapterId:'g6-land-use', subsection:'change', difficulty:2,
    question:`${_SVG_LU_THEN_NOW}Comparing the two maps, what now stands on the land beside the sea?`,
    options:['Hotels','Forest','Sugar cane','Nothing at all'], answer:'Hotels',
    hint:'Find the colour that appears on the second map but not on the first.',
    explanation:'The orange strip beside the sea appears only on the second map, so <b>hotels</b> have been built on land that was cane in 1975.' }),

  makeMCQ({ id:'g6hg-lu-044', chapterId:'g6-land-use', subsection:'change', difficulty:2,
    question:`${_SVG_LU_THEN_NOW}Which land use has shrunk between the two dates?`,
    options:['Sugar cane','Houses','Hotels','The sea'], answer:'Sugar cane',
    hint:'Compare how much of each map is pale green.',
    explanation:'The pale green area is smaller on the second map, so <b>sugar cane</b> has lost ground to houses and hotels.' }),

  makeMCQ({ id:'g6hg-lu-045', chapterId:'g6-land-use', subsection:'change', difficulty:3,
    question:`${_SVG_LU_THEN_NOW}Why is it useful to have two maps of the same place at different dates?`,
    options:['They show how the land use has changed','They show which map is more correct','They show the height of the land','They show the way to the beach'], answer:'They show how the land use has changed',
    hint:'Neither map alone could tell you this.',
    explanation:'One map shows what is there; two maps of different dates show <b>what has changed</b>, and how fast. That is why the syllabus asks you to compare them.' }),

  makeMCQ({ id:'g6hg-lu-046', chapterId:'g6-land-use', subsection:'change', difficulty:4,
    question:`${_SVG_LU_THEN_NOW}Give the most likely reason for the change these two maps show.`,
    options:['Tourism grew and needed land','The soil stopped growing cane','The sea rose over the fields','People moved away from the district'], answer:'Tourism grew and needed land',
    hint:'Look at what the new land use beside the sea is for.',
    explanation:'Hotels and a larger town mean <b>tourism grew and needed land</b>, which in Mauritius is the main reason land has passed from agriculture to other uses.' }),

  makeMCQ({ id:'g6hg-lu-047', chapterId:'g6-land-use', subsection:'change', difficulty:3,
    question:'A photograph of a district in 1970 shows cane to the shoreline; one taken today shows hotels there. What has this land changed from and to?',
    options:['From agriculture to tourism','From tourism to agriculture','From forest to wasteland','From industry to housing'], answer:'From agriculture to tourism',
    hint:'Name the use in the old picture first, then the use in the new one.',
    explanation:'Cane is agriculture and hotels are tourism, so the land has passed <b>from agriculture to tourism</b>. A pair of photographs is read the same way as a pair of maps.' }),

  // ── Agriculture and why it matters ──────────────────────────────────────
  makeMCQ({ id:'g6hg-lu-048', chapterId:'g6-land-use', subsection:'agriculture', difficulty:1,
    question:'What is meant by <b>agriculture</b>?',
    options:['Growing crops and rearing animals','Building houses and roads','Catching fish out at sea','Making goods in a factory'], answer:'Growing crops and rearing animals',
    hint:'It covers both what is planted and what is kept.',
    explanation:'<b>Agriculture</b> is the growing of crops and the rearing of animals for food and for sale.' }),

  makeMCQ({ id:'g6hg-lu-049', chapterId:'g6-land-use', subsection:'agriculture', difficulty:2,
    question:'Why is agriculture important to Mauritius?',
    options:['It gives food, work and goods to sell','It keeps the island cool','It stops cyclones forming','It makes the rainfall heavier'], answer:'It gives food, work and goods to sell',
    hint:'Think of three different things a cane field or a vegetable plot provides.',
    explanation:'Agriculture <b>feeds people, gives them work and produces goods to sell abroad</b> &mdash; sugar above all. That is why so much land is kept for it.' }),

  makeMCQ({ id:'g6hg-lu-050', chapterId:'g6-land-use', subsection:'agriculture', difficulty:3,
    question:'Why does Mauritius try to grow more of its own vegetables instead of buying them abroad?',
    options:['To depend less on other countries','To make the island larger','To increase the rainfall','To reduce the number of hotels'], answer:'To depend less on other countries',
    hint:'Think what happens if ships stop arriving.',
    explanation:'Food grown at home means the island <b>depends less on other countries</b>, and no ship or price abroad can leave it short.' }),

  makeMCQ({ id:'g6hg-lu-051', chapterId:'g6-land-use', subsection:'agriculture', difficulty:4,
    question:'If every cane field near a town were built on, what problem would the country face?',
    options:['Less land to grow its own food','Fewer roads to the town','Less rain falling on the town','Fewer tourists visiting the town'], answer:'Less land to grow its own food',
    hint:'Once land is built on, it is very hard to farm again.',
    explanation:'Building is almost impossible to undo, so the country would be left with <b>less land to grow its own food</b> and would have to import more. That is why land-use change is planned rather than left to chance.' })

);
