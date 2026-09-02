'use strict';
// Lightweight, offline learning map: an illustrated map rather than a live
// navigation service. Marker positions are approximate and intended for study.
//
// TWO SURFACES SHARE THIS MODULE AND MUST STAY IN STEP:
//   • the child's map      → GeoMap.render(el)
//   • the admin map editor → GeoMap.renderEditor(el)
// They paint the SAME markup through the SAME projection, so a pin dragged onto
// a coastline in the editor lands on that coastline for the child. Three things
// used to break that correspondence and each is fixed here rather than worked
// around:
//   1. the editor drew a bare <img> in a fixed 28rem box while the child's map
//      is an aspect-ratio box — the same percentage pointed at different places;
//   2. the editor's zoom scaled only the image and left the pins behind, so the
//      editor actively lied about placement at any zoom other than 100%;
//   3. the district overlay used its own projection (a uniform "meet" fit of a
//      0.92-aspect viewBox inside a 0.86-aspect box), letterboxing it 6.8%
//      vertically against markers that fill the box — measured, not guessed.
//
// Publishing is the other half of the coordination. Edits are a DRAFT until
// published; publishing writes mm_data.geo_map_content and every client merges
// that payload over the built-in catalogue on load.
const GeoMap = (() => {

  // ── Catalogue ──────────────────────────────────────────────────────────────
  // lx / ly are the label offset in px from the marked point. They live ON the
  // feature. They used to be a positional LABEL_OFFSETS array read by
  // FEATURES.indexOf(f), so every feature the editor appended inherited one
  // fallback offset and stacked its label on its own pin.
  const DEFAULTS = [
    { id:'grse', type:'river', lon:57.7587, lat:-20.2889, icon:'💧', name:'Grand River South East', label:'Grand River S.E.', lx:-125, ly:-10, fact:'One of Mauritius’s important rivers. It flows in the south-east and is known for the Grand River South East waterfall.' },
    { id:'black-river', type:'river', lon:57.3738, lat:-20.362, icon:'💧', name:'Black River', label:'Black River', lx:-39, ly:-40, fact:'A river in the south-west of Mauritius, near the Black River Gorges area.' },
    { id:'rempart-river', type:'river', lon:57.6927, lat:-20.1082, icon:'💧', name:'Rivière du Rempart', label:'Rivière du Rempart', lx:-61, ly:-40, fact:'A river in northern Mauritius. Rivers carry fresh water from higher land towards the sea.' },
    { id:'petite-riviere', type:'mountain', lon:57.4077, lat:-20.4088, icon:'⛰️', name:'Piton de la Petite Rivière Noire', label:'Highest peak', lx:-44, ly:-40, fact:'At about 828 metres, this is the highest mountain peak in Mauritius. It lies in the south-west.' },
    { id:'pieter-both', type:'mountain', lon:57.5561, lat:-20.1913, icon:'⛰️', name:'Pieter Both', label:'Pieter Both', lx:-38, ly:21, fact:'A well-known mountain in the Moka Range. Its unusual rounded summit makes it easy to recognise.' },
    { id:'le-morne', type:'mountain', lon:57.3213, lat:-20.4541, icon:'⛰️', name:'Le Morne Brabant', label:'Le Morne', lx:21, ly:-10, fact:'A mountain on the south-west coast. Le Morne Cultural Landscape is a UNESCO World Heritage site linked to the history of slavery.' },
    { id:'mare-vacoas', type:'water', lon:57.5051, lat:-20.374, icon:'💦', name:'Mare aux Vacoas Reservoir', label:'Mare aux Vacoas', lx:-55, ly:-40, fact:'The largest reservoir in Mauritius. It stores fresh water for homes, farms and other uses.' },
    { id:'midlands', type:'water', lon:57.5885, lat:-20.3215, icon:'💦', name:'Midlands Dam', label:'Midlands Dam', lx:-46, ly:35, fact:'A reservoir in the central part of Mauritius. Dams collect and store water.' },
    { id:'grand-bassin', type:'water', lon:57.4923, lat:-20.4182, icon:'💦', name:'Grand Bassin', label:'Grand Bassin', lx:-44, ly:21, fact:'A lake in a volcanic crater. It is also an important place of worship, known as Ganga Talao.' },
    { id:'port-louis', type:'port', lon:57.5028, lat:-20.1625, icon:'⚓', name:'Port Louis Harbour', label:'Port Louis', lx:-35, ly:-40, fact:'Mauritius’s main port and capital city. It is a major place for trade, ships and businesses.' },
    { id:'mahebourg', type:'port', lon:57.7061, lat:-20.4111, icon:'⚓', name:'Mahébourg / Grand Port', label:'Mahébourg', lx:-38, ly:-40, fact:'A historic south-east coastal town near Grand Port, an important harbour area in Mauritian history.' },
    { id:'aapravasi', type:'heritage', lon:57.503, lat:-20.1585, icon:'🏛️', name:'Aapravasi Ghat', label:'Aapravasi Ghat', lx:-120, ly:-10, fact:'A UNESCO World Heritage site in Port Louis. It remembers the arrival of indentured labourers in Mauritius.' },
    { id:'blue-penny', type:'heritage', lon:57.4975, lat:-20.1609, icon:'🏛️', name:'Blue Penny Museum', label:'Blue Penny Museum', lx:-63, ly:21, fact:'A museum in Port Louis with collections about Mauritian history, art and the famous Blue Penny stamps.' },
    { id:'rodrigues-limon', island:'rodrigues', type:'mountain', lon:63.4466, lat:-19.7066, icon:'⛰️', name:'Mont Limon', label:'Mont Limon', lx:-100, ly:-10, fact:'At 398 metres, Mont Limon is the highest point in Rodrigues. It is part of the central ridge of this volcanic island.' },
    { id:'rodrigues-grande-montagne', island:'rodrigues', type:'mountain', lon:63.4627, lat:-19.7052, icon:'⛰️', name:'Grande Montagne', label:'Grande Montagne', lx:-57, ly:-40, fact:'Grande Montagne is part of the hilly central area of Rodrigues. The island has a steep ridge and many valleys.' },
    { id:'rodrigues-plaine-corail', island:'rodrigues', type:'coast', lon:63.3609, lat:-19.7567, icon:'🏝️', name:'Plaine Corail', label:'Plaine Corail', lx:-42, ly:-40, fact:'A coral-limestone plain in western Rodrigues. Its name reminds us that parts of Rodrigues have coral limestone as well as volcanic rock.' },
    { id:'rodrigues-port-mathurin', island:'rodrigues', type:'port', lon:63.4221, lat:-19.6808, icon:'⚓', name:'Port Mathurin', label:'Port Mathurin', lx:-45, ly:-40, fact:'The capital and main harbour of Rodrigues. Ships and boats are important for travel and trade with Mauritius.' },
    { id:'rodrigues-baie-huitres', island:'rodrigues', type:'coast', lon:63.4091, lat:-19.6871, icon:'🌊', name:'Baie aux Huîtres', label:'Baie aux Huîtres', lx:-54, ly:-40, fact:'A bay on the eastern side of Rodrigues. Bays, reefs and lagoons are important coastal features of the island.' },
    { id:'rodrigues-ile-cocos', island:'rodrigues', type:'island', lon:63.2998, lat:-19.7221, icon:'🐦', name:'Île aux Cocos', label:'Île aux Cocos', lx:-45, ly:21, fact:'A small islet in the Rodrigues lagoon, known for seabirds and its natural environment.' },
    { id:'rodrigues-lagoon', island:'rodrigues', type:'water', lon:63.42, lat:-19.795, icon:'💦', name:'Rodrigues Lagoon & Coral Reef', label:'Lagoon & reef', lx:-47, ly:-40, fact:'Rodrigues is surrounded by a very large lagoon and coral reef. The reef helps protect the coast and provides a habitat for sea life.' },
    { id:'rodrigues-tortoise', island:'rodrigues', type:'heritage', lon:63.37, lat:-19.7563, icon:'🐢', name:'François Leguat Giant Tortoise Reserve', label:'Tortoise reserve', lx:-53, ly:-40, fact:'A nature reserve where visitors can learn about giant tortoises, caves and the protection of Rodrigues’ wildlife.' },
    { id:'le-pouce', type:'mountain', lon:57.5288172, lat:-20.198113, icon:'⛰️', name:'Le Pouce', label:'Le Pouce', lx:-85, ly:-10, fact:'At 812 metres, Le Pouce is the third highest mountain in Mauritius. Its summit looks like a thumb pointing at the sky, which is how it got its name.' },
    { id:'montagne-cocotte', type:'mountain', lon:57.4673346, lat:-20.43959, icon:'⛰️', name:'Montagne Cocotte', label:'Mt Cocotte', lx:-38, ly:-40, fact:'At 780 metres this is one of the highest points on the island. It stands on the wet central plateau, where a great deal of rain falls.' },
    { id:'corps-de-garde', type:'mountain', lon:57.4522647, lat:-20.259758, icon:'⛰️', name:'Corps de Garde', label:'Corps de Garde', lx:-51, ly:-40, fact:'A 740-metre mountain above Quatre Bornes. Its long ridge is a landmark of the Plaines Wilhems district.' },
    { id:'deux-mamelles', type:'mountain', lon:57.56815, lat:-20.197305, icon:'⛰️', name:'Les Deux Mamelles', label:'Deux Mamelles', lx:-50, ly:-40, fact:'Two peaks of the Moka Range that rise side by side, close to Pieter Both and Le Pouce.' },
    { id:'trois-mamelles', type:'mountain', lon:57.449655, lat:-20.310622, icon:'⛰️', name:'Les Trois Mamelles', label:'Trois Mamelles', lx:-49, ly:21, fact:'Three sharp peaks that rise together in the west. They are what remains of very old volcanic rock, worn down over millions of years.' },
    { id:'montagne-rempart', type:'mountain', lon:57.4311341, lat:-20.303021, icon:'⛰️', name:'Montagne du Rempart', label:'Mt du Rempart', lx:35, ly:-10, fact:'A steep, pointed mountain in the west, often photographed with Les Trois Mamelles behind it.' },
    { id:'lion-mountain', type:'mountain', lon:57.7252789, lat:-20.36115, icon:'⛰️', name:'Lion Mountain', label:'Lion Mountain', lx:-46, ly:21, fact:'A mountain near Vieux Grand Port in the south-east. Seen from the coast, its shape looks like a resting lion.' },
    { id:'chat-souris', type:'mountain', lon:57.755824, lat:-20.31349, icon:'⛰️', name:'Le Chat et La Souris', label:'Chat et Souris', lx:-114, ly:-10, fact:'Two peaks in the east whose names mean “the cat and the mouse”, because a smaller peak sits beside a larger one.' },
    { id:'signal-mountain', type:'mountain', lon:57.491308, lat:-20.171925, icon:'⛰️', name:'Signal Mountain', label:'Signal Mountain', lx:-52, ly:-40, fact:'A hill above Port Louis. Long ago, flags were raised here to signal to the town that ships were arriving.' },
    { id:'chamarel-falls', type:'waterfall', lon:57.3859833, lat:-20.443052, icon:'🏞️', name:'Chamarel Waterfall', label:'Chamarel Falls', lx:-49, ly:21, fact:'Water drops about 100 metres here in a single fall, making it one of the tallest waterfalls in Mauritius.' },
    { id:'rochester-falls', type:'waterfall', lon:57.5169589, lat:-20.502581, icon:'🏞️', name:'Rochester Falls', label:'Rochester Falls', lx:-50, ly:-40, fact:'A wide waterfall near Souillac. The rock beneath it has broken into shapes like square columns.' },
    { id:'alexandra-falls', type:'waterfall', lon:57.4574473, lat:-20.433497, icon:'🏞️', name:'Alexandra Falls', label:'Alexandra Falls', lx:-50, ly:-40, fact:'A waterfall in the Black River Gorges. From the viewpoint above it you can see across the forest to the southern coast.' },
    { id:'tamarin-falls', type:'waterfall', lon:57.4635199, lat:-20.351524, icon:'🏞️', name:'Tamarin Falls', label:'Tamarin Falls', lx:-45, ly:-40, fact:'Also called the Seven Cascades, because the river drops over a series of steps one after another.' },
    { id:'la-ferme', type:'water', lon:57.4313627, lat:-20.255852, icon:'💦', name:'La Ferme Reservoir', label:'La Ferme', lx:-33, ly:-40, fact:'A large reservoir in the west of the island. It stores water for farms and for homes.' },
    { id:'bagatelle-dam', type:'water', lon:57.5223018, lat:-20.248699, icon:'💦', name:'Bagatelle Dam', label:'Bagatelle Dam', lx:-48, ly:-40, fact:'One of the newest dams in Mauritius. It supplies drinking water to Port Louis and the north.' },
    { id:'piton-milieu', type:'water', lon:57.5804469, lat:-20.29231, icon:'💦', name:'Piton du Milieu Reservoir', label:'Piton du Milieu', lx:21, ly:-10, fact:'A reservoir on the central plateau, surrounded by forest.' },
    { id:'ile-cerfs', type:'island', lon:57.8038, lat:-20.272035, icon:'🏝️', name:'Île aux Cerfs', label:'Île aux Cerfs', lx:-105, ly:-10, fact:'An island in the lagoon off the east coast, known for its beaches and shallow blue water.' },
    { id:'ile-aigrettes', type:'island', lon:57.7332009, lat:-20.420197, icon:'🏝️', name:'Île aux Aigrettes', label:'Île aux Aigrettes', lx:-54, ly:21, fact:'A small coral island that is now a nature reserve. Rare Mauritian plants and giant tortoises are protected here.' },
    { id:'ile-benitiers', type:'island', lon:57.345923, lat:-20.421131, icon:'🏝️', name:'Île aux Bénitiers', label:'Île aux Bénitiers', lx:21, ly:-10, fact:'A low island inside the lagoon on the west coast, near Le Morne.' },
    { id:'ile-ambre', type:'island', lon:57.7005456, lat:-20.033644, icon:'🏝️', name:'Île d’Ambre', label:'Île d’Ambre', lx:-39, ly:-40, fact:'An island off the north-east coast, covered in mangrove trees that grow in salty water.' },
    { id:'ile-fouquets', type:'island', lon:57.7776835, lat:-20.395478, icon:'🏝️', name:'Île aux Fouquets', label:'Île aux Fouquets', lx:-128, ly:-10, fact:'Also called Île au Phare. Its ruined lighthouse once guided ships into Grand Port, and the islets at this entrance were fought over during the naval battle of 1810.' },
    { id:'black-river-gorges', type:'reserve', lon:57.473064, lat:-20.408361, icon:'🌿', name:'Black River Gorges National Park', label:'Black River Gorges', lx:-61, ly:-40, fact:'The largest national park in Mauritius. It protects native forest and rare birds such as the pink pigeon and the Mauritius kestrel.' },
    { id:'bras-deau', type:'reserve', lon:57.7336672, lat:-20.131721, icon:'🌿', name:'Bras d’Eau National Park', label:'Bras d’Eau NP', lx:-47, ly:-40, fact:'A national park in the north-east. Its forest is home to the rare Mauritius olive white-eye.' },
    { id:'bel-ombre', type:'reserve', lon:57.4405275, lat:-20.500818, icon:'🌿', name:'Bel Ombre Nature Reserve', label:'Bel Ombre', lx:-36, ly:-40, fact:'A protected forest in the south, linked to the Black River Gorges by a corridor of native trees.' },
    { id:'terre-rouge', type:'reserve', lon:57.5024131, lat:-20.13934, icon:'🌿', name:'Rivulet Terre Rouge Bird Sanctuary', label:'Terre Rouge', lx:-41, ly:-40, fact:'An estuary near Port Louis where migrating water birds rest and feed. It is a protected wetland.' },
    { id:'balaclava', type:'reserve', lon:57.5115745, lat:-20.083408, icon:'🌿', name:'Réserve Marine de Balaclava', label:'Balaclava Marine', lx:-55, ly:-40, fact:'A marine protected area in the north-west. Fishing is limited here so that corals and fish can recover.' },
    { id:'ssr-garden', type:'heritage', lon:57.5804141, lat:-20.106873, icon:'🏛️', name:'Sir Seewoosagur Ramgoolam Botanical Garden', label:'Pamplemousses Garden', lx:21, ly:-10, fact:'The botanical garden at Pamplemousses, one of the oldest in the southern hemisphere. It is famous for its giant water lilies.' },
    { id:'fort-adelaide', type:'heritage', lon:57.5102535, lat:-20.163729, icon:'🏛️', name:'Fort Adelaide (the Citadel)', label:'Fort Adelaide', lx:-45, ly:-54, fact:'A stone fort built above Port Louis in the 1830s. It is also called the Citadel, and it looks out over the harbour.' },
    { id:'labourdonnais', type:'heritage', lon:57.6175449, lat:-20.071733, icon:'🏛️', name:'Château de Labourdonnais', label:'Labourdonnais', lx:-48, ly:-40, fact:'A colonial house of 1856 in the north, built of teak wood and surrounded by orchards.' },
    { id:'aventure-sucre', type:'heritage', lon:57.5741799, lat:-20.097685, icon:'🏛️', name:'L’Aventure du Sucre', label:'Aventure du Sucre', lx:-138, ly:-10, fact:'A museum inside an old sugar factory at Beau Plan. It tells the story of sugar cane in Mauritius.' },
    { id:'frederik-hendrik', type:'heritage', lon:57.7220636, lat:-20.374962, icon:'🏛️', name:'Frederik Hendrik Museum', label:'Frederik Hendrik', lx:-54, ly:-40, fact:'A museum at Vieux Grand Port, where the Dutch first settled in 1638. The ruins of their fort are close by.' },
    { id:'martello', type:'heritage', lon:57.3618344, lat:-20.354655, icon:'🏛️', name:'La Tour Martello', label:'Tour Martello', lx:-44, ly:-40, fact:'A round stone tower built at La Preneuse in the 1830s to defend the west coast.' },
    { id:'pere-laval', type:'heritage', lon:57.5295679, lat:-20.147799, icon:'🏛️', name:'Caveau du Père Laval', label:'Père Laval', lx:21, ly:-10, fact:'The shrine of Père Laval at Sainte-Croix. Thousands of pilgrims come here every year.' },
    { id:'curepipe', type:'town', lon:57.5211497, lat:-20.315051, icon:'🏘️', name:'Curepipe', label:'Curepipe', lx:-32, ly:35, fact:'A town on the central plateau. It is one of the coolest and rainiest places in Mauritius.' },
    { id:'quatre-bornes', type:'town', lon:57.4800061, lat:-20.264301, icon:'🏘️', name:'Quatre Bornes', label:'Quatre Bornes', lx:21, ly:-10, fact:'A town in the Plaines Wilhems district, well known for its market. Its name means “four boundary stones”.' },
    { id:'vacoas-phoenix', type:'town', lon:57.4978036, lat:-20.293376, icon:'🏘️', name:'Vacoas-Phoenix', label:'Vacoas-Phoenix', lx:-52, ly:35, fact:'A town on the central plateau, formed by joining the two neighbouring towns of Vacoas and Phoenix.' },
    { id:'beau-bassin', type:'town', lon:57.4693447, lat:-20.234269, icon:'🏘️', name:'Beau Bassin-Rose Hill', label:'Beau Bassin', lx:-42, ly:-40, fact:'A town on the road between Port Louis and Quatre Bornes, across the plateau.' },
    { id:'grand-baie', type:'town', lon:57.584627, lat:-20.013019, icon:'🏘️', name:'Grand Baie', label:'Grand Baie', lx:-38, ly:21, fact:'A sheltered bay and village in the north, and one of the busiest holiday places on the island.' },
    { id:'flacq', type:'town', lon:57.7229652, lat:-20.194889, icon:'🏘️', name:'Centre de Flacq', label:'Centre de Flacq', lx:-51, ly:-40, fact:'The main town of the Flacq district in the east, with one of the largest open markets in Mauritius.' },
    { id:'goodlands', type:'town', lon:57.6525315, lat:-20.038446, icon:'🏘️', name:'Goodlands', label:'Goodlands', lx:-36, ly:-40, fact:'A large village in the north, surrounded by fields of sugar cane.' },
    { id:'souillac', type:'town', lon:57.522503, lat:-20.518723, icon:'🏘️', name:'Souillac', label:'Souillac', lx:-29, ly:-40, fact:'A village on the wild southern coast, near the Gris Gris cliffs where the sea strikes the rocks.' },
    { id:'blue-bay', type:'coast', lon:57.7122933, lat:-20.446804, icon:'🏖️', name:'Blue Bay', label:'Blue Bay', lx:-31, ly:-40, fact:'A bay in the south-east with a marine park. Glass-bottom boats let visitors look down at the coral.' },
    { id:'gris-gris', type:'coast', lon:57.5321848, lat:-20.524, icon:'🏖️', name:'Gris Gris', label:'Gris Gris', lx:-31, ly:-40, fact:'A cliff on the south coast. There is no reef here, so waves from the open ocean strike the rocks directly.' },
    { id:'flic-en-flac', type:'coast', lon:57.366856, lat:-20.284071, icon:'🏖️', name:'Flic en Flac', label:'Flic en Flac', lx:-39, ly:-40, fact:'A long sandy beach on the west coast, sheltered by the lagoon and its reef.' },
    { id:'pointe-diable', type:'coast', lon:57.7792829, lat:-20.337471, icon:'🏖️', name:'Pointe du Diable', label:'Pointe du Diable', lx:-126, ly:-10, fact:'A rocky headland on the east coast, where an old cannon battery once guarded the coastline.' },
    { id:'rodrigues-mont-lubin', island:'rodrigues', type:'mountain', lon:63.4413222, lat:-19.707384, icon:'⛰️', name:'Mont Lubin', label:'Mont Lubin', lx:-96, ly:-40, fact:'At 342 metres, Mont Lubin is one of the highest points of Rodrigues and sits close to the middle of the island.' },
    { id:'rodrigues-mont-cheri', island:'rodrigues', type:'mountain', lon:63.4677735, lat:-19.730866, icon:'⛰️', name:'Mont Chéri', label:'Mont Chéri', lx:-37, ly:21, fact:'A hill in the centre-east of Rodrigues. The island’s ridge runs from west to east through hills like this one.' },
    { id:'rodrigues-mount-topaze', island:'rodrigues', type:'mountain', lon:63.3645326, lat:-19.740687, icon:'⛰️', name:'Mount Topaze', label:'Mount Topaze', lx:-46, ly:-40, fact:'A hill in the west of Rodrigues, rising above the dry limestone plain.' },
    { id:'rodrigues-caverne-patate', island:'rodrigues', type:'cave', lon:63.3868419, lat:-19.754733, icon:'🕳️', name:'Caverne Patate', label:'Caverne Patate', lx:-50, ly:21, fact:'A long limestone cave in the south-west, with stalactites hanging from its roof. Rodrigues has many caves because part of the island is coral limestone.' },
    { id:'rodrigues-grande-caverne', island:'rodrigues', type:'cave', lon:63.3705474, lat:-19.753059, icon:'🕳️', name:'La Grande Caverne', label:'Grande Caverne', lx:-52, ly:-40, fact:'A large cave near the François Leguat reserve, hollowed out of coral limestone by rainwater over a very long time.' },
    { id:'rodrigues-grande-montagne-reserve', island:'rodrigues', type:'reserve', lon:63.4652121, lat:-19.706551, icon:'🌿', name:'Réserve Naturelle de Grande Montagne', label:'Grande Montagne NR', lx:-67, ly:-40, fact:'A nature reserve where native Rodriguan trees are being replanted. The Rodrigues fody and the Rodrigues warbler live here.' },
    { id:'rodrigues-port-sud-est', island:'rodrigues', type:'port', lon:63.4540717, lat:-19.739637, icon:'⚓', name:'Port Sud Est', label:'Port Sud Est', lx:-42, ly:-40, fact:'A fishing harbour on the southern coast of Rodrigues, inside the lagoon.' },
    { id:'rodrigues-la-ferme', island:'rodrigues', type:'town', lon:63.3780376, lat:-19.722084, icon:'🏘️', name:'La Ferme', label:'La Ferme', lx:-33, ly:-40, fact:'A village in the west of Rodrigues, in the drier part of the island.' },
    { id:'rodrigues-pointe-coton', island:'rodrigues', type:'coast', lon:63.4951286, lat:-19.684956, icon:'🏖️', name:'Pointe Coton', label:'Pointe Coton', lx:-43, ly:-40, fact:'A beach at the eastern tip of Rodrigues, known for its white sand.' },
    { id:'rodrigues-trou-argent', island:'rodrigues', type:'coast', lon:63.5011918, lat:-19.713508, icon:'🏖️', name:'Trou d’Argent', label:'Trou d’Argent', lx:-110, ly:-10, fact:'A small bay on the wild eastern coast, reached on foot along the coastal path.' },
    { id:'rodrigues-saint-francois', island:'rodrigues', type:'coast', lon:63.4946048, lat:-19.700714, icon:'🏖️', name:'Saint François', label:'Saint François', lx:-115, ly:-10, fact:'A wide beach and bay on the east coast of Rodrigues.' },
    { id:'rodrigues-ile-hermitage', island:'rodrigues', type:'island', lon:63.4429654, lat:-19.751513, icon:'🏝️', name:'Île Hermitage', label:'Île Hermitage', lx:-45, ly:-40, fact:'An islet in the southern lagoon. Old stories say that treasure was once buried here.' },
    { id:'rodrigues-ile-sables', island:'rodrigues', type:'island', lon:63.3057654, lat:-19.701843, icon:'🏝️', name:'Île aux Sables', label:'Île aux Sables', lx:-47, ly:-40, fact:'A sand islet in the western lagoon, next to Île aux Cocos. Seabirds nest on both.' },
    { id:'rodrigues-ile-gombrani', island:'rodrigues', type:'island', lon:63.41749, lat:-19.769415, icon:'🏝️', name:'Île Gombrani', label:'Île Gombrani', lx:-43, ly:21, fact:'An islet in the lagoon to the south of Rodrigues.' },
    { id:'rodrigues-musee', island:'rodrigues', type:'heritage', lon:63.4277606, lat:-19.677827, icon:'🏛️', name:'Musée de Rodrigues', label:'Musée de Rodrigues', lx:-64, ly:-40, fact:'A museum in Port Mathurin about the history, the people and the nature of Rodrigues.' },
    // World map: real lon/lat through the Robinson projection fitted above.
    // These were a hand-placed percentage grid, and it put Vesuvius in the
    // Sahara, Kilimanjaro in the Congo, Fuji in the Philippine Sea, Everest in
    // Laos, Europe in the Mediterranean and the Arctic Ocean on Svalbard.
    { id:'world-north-america', island:'world', type:'continent', lon:-100, lat:45, icon:'🟨', name:'North America', label:'North America', lx:-48, ly:-40, fact:'North America is a continent in the Northern and Western Hemispheres. Canada, the United States and Mexico are part of it.' },
    { id:'world-south-america', island:'world', type:'continent', lon:-58, lat:-12, icon:'🟨', name:'South America', label:'South America', lx:-48, ly:-40, fact:'South America lies mostly in the Southern Hemisphere. The Amazon rainforest and the Andes Mountains are found here.' },
    { id:'world-europe', island:'world', type:'continent', lon:18, lat:50, icon:'🟨', name:'Europe', label:'Europe', lx:-26, ly:-40, fact:'Europe is a continent north of Africa and west of Asia. It has many countries close together.' },
    { id:'world-africa', island:'world', type:'continent', lon:21, lat:3, icon:'🟨', name:'Africa', label:'Africa', lx:-23, ly:-40, fact:'Africa is the second-largest continent. The Equator crosses its middle region.' },
    { id:'world-asia', island:'world', type:'continent', lon:90, lat:47, icon:'🟨', name:'Asia', label:'Asia', lx:-19, ly:-40, fact:'Asia is the largest continent. It includes the Himalayas and Mount Everest.' },
    { id:'world-australia', island:'world', type:'continent', lon:134, lat:-25, icon:'🟨', name:'Australia', label:'Australia', lx:-32, ly:-40, fact:'Australia is both a country and the smallest continent. It lies in the Southern Hemisphere.' },
    { id:'world-oceania', island:'world', type:'region', lon:165, lat:-13, icon:'🏝️', name:'Oceania', label:'Oceania region', lx:-120, ly:-10, fact:'Oceania is a geographic region, not just Australia. It includes Australia, New Zealand, Papua New Guinea and thousands of islands across the Pacific Ocean.' },
    { id:'world-antarctica', island:'world', type:'continent', lon:20, lat:-80, icon:'🟨', name:'Antarctica', label:'Antarctica', lx:-36, ly:-40, fact:'Antarctica is the coldest continent. It surrounds the South Pole and is covered mostly by ice.' },
    { id:'world-pacific', island:'world', type:'ocean', lon:-150, lat:0, icon:'🌊', name:'Pacific Ocean', label:'Pacific Ocean', lx:21, ly:-10, fact:'The Pacific Ocean is the largest and deepest ocean. It lies between Asia and the Americas.' },
    { id:'world-atlantic', island:'world', type:'ocean', lon:-32, lat:5, icon:'🌊', name:'Atlantic Ocean', label:'Atlantic Ocean', lx:-49, ly:-40, fact:'The Atlantic Ocean lies between the Americas and Europe and Africa.' },
    { id:'world-indian', island:'world', type:'ocean', lon:78, lat:-28, icon:'🌊', name:'Indian Ocean', label:'Indian Ocean', lx:-44, ly:-40, fact:'The Indian Ocean lies between Africa, Asia, Australia and Antarctica. Mauritius is in this ocean.' },
    { id:'world-arctic', island:'world', type:'ocean', lon:-45, lat:85, icon:'🌊', name:'Arctic Ocean', label:'Arctic Ocean', lx:-44, ly:21, fact:'The Arctic Ocean surrounds the North Pole. Much of it is covered by sea ice for part of the year.' },
    { id:'world-southern', island:'world', type:'ocean', lon:40, lat:-62, icon:'🌊', name:'Southern Ocean', label:'Southern Ocean', lx:21, ly:-10, fact:'The Southern Ocean surrounds Antarctica and connects the Atlantic, Indian and Pacific Oceans.' },
    { id:'world-everest', island:'world', type:'mountain', lon:86.925, lat:27.9881, icon:'⛰️', name:'Mount Everest', label:'Mount Everest', lx:-47, ly:-40, fact:'Mount Everest, in the Himalayas, is the highest mountain above sea level at about 8,849 metres.' },
    { id:'world-andes', island:'world', type:'mountain', lon:-70.0119, lat:-22.8894, icon:'⛰️', name:'Andes Mountains', label:'Andes', lx:-24, ly:-40, fact:'The Andes run along the western edge of South America. They are the longest continental mountain range.' },
    { id:'world-kilimanjaro', island:'world', type:'mountain', lon:37.3556, lat:-3.0674, icon:'⛰️', name:'Mount Kilimanjaro', label:'Kilimanjaro', lx:-39, ly:-40, fact:'Mount Kilimanjaro is a very high mountain in Tanzania, Africa. It is a dormant volcano.' },
    { id:'world-fuji', island:'world', type:'volcano', lon:138.7274, lat:35.3606, icon:'🌋', name:'Mount Fuji', label:'Mount Fuji', lx:-36, ly:-40, fact:'Mount Fuji is a famous volcano in Japan. It is part of the Pacific Ring of Fire.' },
    { id:'world-vesuvius', island:'world', type:'volcano', lon:14.426, lat:40.821, icon:'🌋', name:'Mount Vesuvius', label:'Vesuvius', lx:-32, ly:-40, fact:'Mount Vesuvius is a volcano in Italy. Its eruption in AD 79 buried the ancient city of Pompeii.' },
    { id:'world-equator', island:'world', type:'latitude', lon:0, lat:0, icon:'↔️', name:'Equator (0° latitude)', label:'Equator 0°', lx:-36, ly:-40, fact:'The Equator is an imaginary line at 0° latitude. It divides Earth into the Northern and Southern Hemispheres.' },
    { id:'world-prime-meridian', island:'world', type:'longitude', lon:0, lat:51.4779, icon:'↕️', name:'Prime Meridian (0° longitude)', label:'0° longitude', lx:-40, ly:-40, fact:'The Prime Meridian is an imaginary line at 0° longitude. It passes through Greenwich in the United Kingdom and divides east from west.' },
  ];

  const TYPES = [['all','✨','All features'],['mountain','⛰️','Mountains'],['river','💧','Rivers'],['waterfall','🏞️','Waterfalls'],['water','💦','Lakes & reservoirs'],['coast','🏖️','Bays & beaches'],['island','🏝️','Islands & islets'],['reserve','🌿','Parks & reserves'],['cave','🕳️','Caves'],['port','⚓','Ports'],['town','🏘️','Towns & villages'],['heritage','🏛️','Heritage & museums'],['continent','🟨','Continents'],['region','🏝️','World regions'],['ocean','🌊','Oceans'],['volcano','🌋','Volcanoes'],['latitude','↔️','Latitude lines'],['longitude','↕️','Longitude lines']];
  const TYPE_ICONS = { river:['💧','🌊','🏞️'], mountain:['⛰️','🏔️','🗻'], water:['💦','🏞️','🛶'], coast:['🏝️','🌊','🐚','🐦'], port:['⚓','🚢','🛳️'], heritage:['🏛️','🏰','🗿','🐢','📜'], waterfall:['🏞️','💧'], island:['🏝️','🏖️','🐦'], reserve:['🌿','🌳','🦜'], cave:['🕳️','🦇'], town:['🏘️','🏙️','🏠'], continent:['🟨','🗺️'], region:['🏝️','🌏'], ocean:['🌊','🐋'], volcano:['🌋'], latitude:['↔️','🌐'], longitude:['↕️','🌐'] };

  // ⚠ `aspect` is width ÷ height of the painted box and is defined HERE, not in
  // style.css, because the editor and the child's map must letterbox the base
  // image identically for one percentage to mean one point on both. The values
  // are the base images' own intrinsic ratios (755×874 and 1700×1600), so
  // `object-fit: contain` fills the box exactly and a percentage of the box is
  // a percentage of the artwork.
  const ISLANDS = {
    mauritius: { name:'Mauritius', tab:'🇲🇺 Mauritius', src:'assets/mauritius-blank-map.svg', alt:'Blank map of Mauritius with rivers', aspect:755/874, districts:true,
                 credit:' Mauritius base map: <a href="https://commons.wikimedia.org/wiki/File:Mauritius_blank_map.svg" target="_blank" rel="noopener noreferrer">public-domain Wikimedia Commons</a>.' },
    rodrigues: { name:'Rodrigues', tab:'🏝️ Rodrigues', src:'assets/rodrigues-location-map.svg', alt:'Topographic map of Rodrigues', aspect:1700/1600, districts:false,
                 credit:' Rodrigues base map: <a href="https://commons.wikimedia.org/wiki/File:Rodrigues_Island_location_map.svg" target="_blank" rel="noopener noreferrer">Wikimedia Commons, CC BY-SA 3.0</a>.' },
    world: { name:'World', tab:'🌍 World', src:'assets/world-map.svg', alt:'World map with continents', aspect:2752.8/1537.6, districts:false,
             credit:' World base map: <a href="https://commons.wikimedia.org/wiki/File:World_Map_Blank.svg" target="_blank" rel="noopener noreferrer">Wikimedia Commons, public domain</a>.' },
  };

  // The district GeoJSON's own bounding box, to 7 dp. Markers and district
  // polygons are projected through THIS ONE definition; they cannot drift apart.
  // Verified by rasterising the base map: its land spans the full canvas to
  // within 1px, so a percentage of the box IS this bounding box.
  const MAURITIUS_BOUNDS = { minLon:57.3082066, maxLon:57.8064537, minLat:-20.5241457, maxLat:-19.9839966 };
  // The Rodrigues location map's own declared extent, from its Commons file
  // page: N 19°37'09.97"S, S 19°51'02.05"S, W 63°15'34.66"E, E 63°31'14.68"E.
  // ⚠ The island fills only 14.5–92.8% × 20.1–71.8% of that image (measured),
  // which is why the old hand-placed x/y grid could not be reasoned about: it
  // had no geographic meaning at all, so "a bit left" was the only way to move
  // a pin and there was nothing to check a position against.
  const RODRIGUES_BOUNDS = { minLon:63.2596278, maxLon:63.5207444, minLat:-19.8505694, maxLat:-19.6194361 };
  // Fallback for a legacy row still carrying the old Rodrigues x/y grid.
  const RODRIGUES_SCALE = { x:4.4, y:5.6 };
  const WORLD_SCALE = { x:10, y:10 };
  // Which islands are geographic. The world map deliberately is not: a blank
  // world map's projection is not documented anywhere in this repo, so its
  // features stay on a percentage grid rather than pretending to a lon/lat it
  // cannot honour.
  // ── The world map is a ROBINSON projection ────────────────────────────────
  // Established by measurement, not assumption: the artwork's SVG carries eight
  // id'd country paths (Iceland, Czechia, Mongolia, Uzbekistan, Madagascar,
  // Eswatini, Lesotho, Tasmania), and fitting those against candidate
  // projections picks Robinson by an order of magnitude —
  //   Robinson  x rms 5.8px  y rms 0.58px      plate carrée  12.9 / 3.0
  //   Eckert IV      6.9 / 10.3                Mollweide     13.6 / 5.2
  // on a 2753×1538 canvas. Robinson also puts the poles at 6.95% and 97.72% of
  // the height, which is exactly where the artwork's land starts and stops.
  // Longitude carries ~0.2% of width of residual near the fitted countries and
  // rather more extrapolated to ±180°, which is far inside a marker's own width.
  const ROBINSON = [ // |lat| 0..90 by 5: [parallel length, distance from equator]
    [1.0000,0.0000],[0.9986,0.0620],[0.9954,0.1240],[0.9900,0.1860],[0.9822,0.2480],
    [0.9730,0.3100],[0.9600,0.3720],[0.9427,0.4340],[0.9216,0.4958],[0.8962,0.5571],
    [0.8679,0.6176],[0.8350,0.6769],[0.7986,0.7346],[0.7597,0.7903],[0.7186,0.8435],
    [0.6732,0.8936],[0.6213,0.9394],[0.5722,0.9761],[0.5322,1.0000],
  ];
  const _rob = (lat, k) => {
    const a = Math.min(Math.abs(lat), 90) / 5, i = Math.min(Math.floor(a), 17), t = a - i;
    return ROBINSON[i][k] * (1 - t) + ROBINSON[i + 1][k] * t;
  };
  const robX = lat => _rob(lat, 0);
  const robY = lat => (lat < 0 ? -1 : 1) * _rob(lat, 1);
  const WORLD_FIT = { a:7.616, b:1308.66, c:697.8696, d:804.68, w:2752.766, h:1537.631 };

  // A projection is just a percentage ↔ lon/lat pair. Rectangular for the two
  // island maps, Robinson for the world one; every caller works in percentages
  // and never needs to know which.
  function rectProjection(b) {
    return {
      toPct: (lon, lat) => ({ left:(lon - b.minLon) / (b.maxLon - b.minLon) * 100,
                              top:(b.maxLat - lat) / (b.maxLat - b.minLat) * 100 }),
      toGeo: (left, top) => ({ lon:b.minLon + (left / 100) * (b.maxLon - b.minLon),
                               lat:b.maxLat - (top / 100) * (b.maxLat - b.minLat) }),
    };
  }
  function robinsonProjection(f) {
    const topOf = lat => (f.c * (-robY(lat)) + f.d) / f.h * 100;
    // Y is monotonic in latitude but has no closed-form inverse; bisection is
    // exact enough at 48 steps and this only runs when an admin drags a pin.
    const latOf = top => {
      let lo = -90, hi = 90;
      for (let i = 0; i < 48; i++) { const m = (lo + hi) / 2; if (topOf(m) > top) lo = m; else hi = m; }
      return (lo + hi) / 2;
    };
    return {
      toPct: (lon, lat) => ({ left:(f.a * lon * robX(lat) + f.b) / f.w * 100, top:topOf(lat) }),
      toGeo: (left, top) => {
        const lat = latOf(top);
        return { lon:clamp(((left / 100) * f.w - f.b) / (f.a * robX(lat)), -180, 180), lat };
      },
      graticule: true,
    };
  }
  const PROJECTIONS = {
    mauritius: rectProjection(MAURITIUS_BOUNDS),
    rodrigues: rectProjection(RODRIGUES_BOUNDS),
    world:     robinsonProjection(WORLD_FIT),
  };
  const projectionOf = island => PROJECTIONS[island] || null;
  const scaleOf  = island => (island === 'world' ? WORLD_SCALE : RODRIGUES_SCALE);
  const isGeographic = island => !!PROJECTIONS[island];

  const MM_KEY        = 'geo_map_content';
  const PUBLISHED_KEY = 'psac-geo-map-published-v2';
  const DRAFT_KEY     = 'psac-geo-map-draft-v2';
  const LEGACY_KEY    = 'psac-geo-map-features-v1';
  // Every field the editor may override. Anything absent from this list is
  // owned by the code and keeps flowing to published installs on deploy.
  const OVERRIDABLE = ['island','type','icon','name','label','fact','lon','lat','x','y','lx','ly','hidden'];

  const esc      = v => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const clamp    = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const clone    = rows => rows.map(r => ({ ...r }));
  const islandOf = f => (f.island || 'mauritius');
  const typeMeta = t => TYPES.find(x => x[0] === t);

  // ── Geometry: ONE projection, and its exact inverse ───────────────────────
  // ⚠ The bounds are chosen by ISLAND, never by "the row happens to have a lon".
  // Reading every lon/lat through Mauritius's bounds is exactly the bug that
  // made Rodrigues unfixable: two maps, two extents, one projection.
  function markerPosition(f) {
    const P = projectionOf(islandOf(f));
    if (P && f.lon != null && f.lat != null) return P.toPct(f.lon, f.lat);
    const scale = scaleOf(islandOf(f));
    return { left:(f.x || 0) / scale.x, top:(f.y || 0) / scale.y };
  }
  function setPosition(f, island, left, top) {
    left = clamp(left, 0, 100); top = clamp(top, 0, 100);
    const P = projectionOf(island);
    if (P) {
      const g = P.toGeo(left, top);
      f.lon = g.lon; f.lat = g.lat;
      f.x = null; f.y = null;
    } else {
      const scale = scaleOf(island);
      f.x = left * scale.x; f.y = top * scale.y;
      f.lon = null; f.lat = null;
    }
  }
  // Percentage of the painted box under a pointer. Reads the ZOOM LAYER's own
  // rect, so the answer stays correct at any zoom instead of only at 100%.
  function pointerPct(event, layer) {
    const r = layer.getBoundingClientRect();
    return { left:clamp((event.clientX - r.left) / r.width * 100, 0, 100), top:clamp((event.clientY - r.top) / r.height * 100, 0, 100) };
  }

  // ── Published content ─────────────────────────────────────────────────────
  let FEATURES = clone(DEFAULTS);
  let _published = [];
  let _loadPromise = null;
  const _mounted = [];

  function readJSON(key) { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (_) { return null; } }
  function writeJSON(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {} }

  function mergeOverrides(rows) {
    const out = clone(DEFAULTS);
    (rows || []).forEach(row => {
      if (!row || !row.id) return;
      const i = out.findIndex(f => f.id === row.id);
      if (i >= 0) Object.assign(out[i], row);
      else if (row.name) out.push({ ...row });
    });
    return out;
  }
  // Only the DIFFERENCES from the built-in catalogue are published, so a later
  // code change to a built-in fact still reaches installs that have published
  // an unrelated edit. Removing a built-in is a `hidden` flag, never a deletion:
  // it stays restorable and its id never comes to mean something else.
  function diffFromDefaults(rows) {
    const out = [];
    rows.forEach(f => {
      const d = DEFAULTS.find(x => x.id === f.id);
      if (!d) { out.push({ ...f }); return; }
      const delta = { id:f.id };
      let changed = false;
      OVERRIDABLE.forEach(k => { if ((f[k] ?? null) !== (d[k] ?? null)) { delta[k] = f[k] ?? null; changed = true; } });
      if (changed) out.push(delta);
    });
    DEFAULTS.forEach(d => { if (!rows.some(f => f.id === d.id)) out.push({ id:d.id, hidden:true }); });
    return out;
  }

  function applyPublished(rows, { repaint = true } = {}) {
    const before = JSON.stringify(_published);
    _published = rows || [];
    FEATURES = mergeOverrides(_published);
    if (repaint && before !== JSON.stringify(_published)) repaintMounted();
  }

  function repaintMounted() {
    for (let i = _mounted.length - 1; i >= 0; i--) {
      const el = _mounted[i];
      if (!el || !el.isConnected) { _mounted.splice(i, 1); continue; }
      // A container the editor is previewing into paints from its own draft.
      // A container app.js has emptied (the subject has no map) stays empty —
      // a late server answer must not put the card back on a screen that
      // deliberately took it away.
      if (el.__geo && el.__geo.features) continue;
      if (!el.querySelector('.geo-map-card')) continue;
      render(el);
    }
  }

  // Local cache first so the first paint is never blank and works offline; the
  // server answer then merges in and repaints only if it actually differs.
  // A child is `anon` and Store.mmGet answers null for them until the
  // geo_map_content read policy has been applied — the cache and the built-in
  // catalogue are the fallback, so nothing breaks either way.
  function loadPublished() {
    if (_loadPromise) return _loadPromise;
    const cached = readJSON(PUBLISHED_KEY) || legacyPayload();
    if (cached && Array.isArray(cached.markers)) applyPublished(cached.markers, { repaint:false });
    _loadPromise = Promise.resolve()
      .then(() => (typeof Store !== 'undefined' && Store.mmGet) ? Store.mmGet(MM_KEY) : null)
      .then(payload => {
        if (!payload || !Array.isArray(payload.markers)) return null;
        writeJSON(PUBLISHED_KEY, { markers:payload.markers, updatedAt:payload.updatedAt || null });
        applyPublished(payload.markers);
        return payload;
      })
      .catch(() => null);
    return _loadPromise;
  }
  // v1 stored whole feature rows rather than a diff. Merging them is the same
  // operation, so an admin's existing local edits survive the upgrade.
  function legacyPayload() {
    const rows = readJSON(LEGACY_KEY);
    return Array.isArray(rows) && rows.length ? { markers:rows } : null;
  }

  // ── Shared marker markup (child's map AND editor) ─────────────────────────
  function markerInner(f) {
    const dx = Number(f.lx ?? 16), dy = Number(f.ly ?? -22);
    const length = Math.max(8, Math.hypot(dx, dy) - 5).toFixed(1);
    const angle  = (Math.atan2(dy, dx) * 180 / Math.PI).toFixed(1);
    return `<span class="geo-marker-pin" aria-hidden="true"><span class="geo-marker-icon">${esc(f.icon)}</span></span>`
         + `<span class="geo-marker-leader" aria-hidden="true" style="--leader-length:${length}px;--leader-angle:${angle}deg"></span>`
         + `<span class="geo-marker-label" style="--label-x:${dx}px;--label-y:${dy}px">${esc(f.label || f.name)}</span>`;
  }
  function markerHtml(f, { selected = false, editor = false } = {}) {
    const pos = markerPosition(f);
    const attr = editor ? `data-ed-feature="${esc(f.id)}"` : `data-feature-id="${esc(f.id)}"`;
    const cls  = ['geo-map-marker', `geo-${esc(f.type)}`, selected ? 'is-selected' : '', editor ? 'geo-ed-marker' : '', f.hidden ? 'is-hidden-feature' : ''].filter(Boolean).join(' ');
    return `<button type="button" class="${cls}" ${attr} style="left:${pos.left.toFixed(2)}%;top:${pos.top.toFixed(2)}%" aria-label="${editor ? 'Edit' : 'Learn about'} ${esc(f.name)}">${markerInner(f)}</button>`;
  }

  // ── District overlay ──────────────────────────────────────────────────────
  let districtGeoJSON = null, districtLoad = null;
  function loadDistricts() {
    if (districtGeoJSON) return Promise.resolve(districtGeoJSON);
    if (!districtLoad) districtLoad = fetch('assets/mauritius-districts.geojson')
      .then(r => r.ok ? r.json() : Promise.reject(new Error('district map unavailable')))
      .then(data => {
        if (data?.type !== 'FeatureCollection' || !Array.isArray(data.features)) throw new Error('invalid district map');
        districtGeoJSON = data; return data;
      }).catch(() => null);
    return districtLoad;
  }
  // ⚠ Projected through MAURITIUS_BOUNDS with preserveAspectRatio="none", i.e.
  // exactly the mapping markerPosition() uses. It previously derived its own
  // bounding box and used a uniform "meet" fit, which letterboxed the districts
  // 6.8% vertically inside a box the markers fill — so every marker near the top
  // or bottom of the island sat about 15px off its own district.
  function districtSvg(selectedDistrict) {
    if (!districtGeoJSON) return '';
    const b = MAURITIUS_BOUNDS;
    const polygons = districtGeoJSON.features.filter(f => f?.geometry?.type === 'Polygon');
    const point = ([x, y]) => `${((x - b.minLon) / (b.maxLon - b.minLon) * 100).toFixed(3)},${((b.maxLat - y) / (b.maxLat - b.minLat) * 100).toFixed(3)}`;
    const paths = polygons.map((f, i) => {
      const nm = f.properties?.STATE_NAME || 'District';
      return `<path class="geo-district ${selectedDistrict === nm ? 'is-selected' : ''}" data-district="${esc(nm)}" d="${f.geometry.coordinates.map(ring => `M ${ring.map(point).join(' L ')} Z`).join(' ')}" style="--district-h:${i * 31}"></path>`;
    }).join('');
    return `<svg class="geo-district-svg" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Mauritius districts map">${paths}</svg>`;
  }

  // ══ CHILD'S MAP ═══════════════════════════════════════════════════════════
  // View state lives on the element, not on the module: the editor's live
  // preview and the child's own map can then be mounted at the same time
  // without one stealing the other's island, filter or selection.
  function viewState(el) {
    if (!el.__geo) el.__geo = { island:'mauritius', type:'all', selectedId:null, district:null, features:null };
    return el.__geo;
  }
  const featuresFor = st => (st.features || FEATURES).filter(f => !f.hidden);
  const visibleIn   = st => featuresFor(st).filter(f => islandOf(f) === st.island && (st.type === 'all' || f.type === st.type));

  function renderInfo(root, st) {
    const info = root.querySelector('[data-geo-info]');
    if (!info) return;
    if (st.district) {
      info.innerHTML = `<div class="geo-info-icon">🧭</div><div><div class="geo-info-type">District boundary</div><h4>${esc(st.district)}</h4><p>This district boundary comes from the real map data. Tap a river, mountain, port or heritage marker to keep exploring.</p></div>`;
      return;
    }
    const f = featuresFor(st).find(row => row.id === st.selectedId);
    if (!f) { info.innerHTML = `<div class="geo-info-icon">🗺️</div><div><div class="geo-info-type">Explore</div><h4>Pick a marker</h4><p>Tap any marker on the map to read about that place.</p></div>`; return; }
    info.innerHTML = `<div class="geo-info-icon">${esc(f.icon)}</div><div><div class="geo-info-type">${esc(typeMeta(f.type)?.[2] || 'Feature')}</div><h4>${esc(f.name)}</h4><p>${esc(f.fact)}</p></div>`;
  }

  function paintDistricts(root, st) {
    const target = root.querySelector('[data-district-map]');
    if (!target || !districtGeoJSON || st.island !== 'mauritius') return;
    target.querySelector('.geo-district-svg')?.remove();
    target.insertAdjacentHTML('beforeend', districtSvg(st.district));
    target.querySelectorAll('[data-district]').forEach(path => path.addEventListener('click', () => {
      st.district = st.district === path.dataset.district ? null : path.dataset.district;
      paintDistricts(root, st); renderInfo(root, st);
    }));
  }

  // Only the categories the current island actually has. Offering a child
  // "Volcanoes" on the Mauritius map, or "Caves" on the world map, is a filter
  // that can only ever empty the map — and with eleven categories the chip row
  // is already three lines deep on a phone.
  const typesOn = st => {
    const present = new Set(featuresFor(st).filter(f => islandOf(f) === st.island).map(f => f.type));
    return TYPES.filter(([id]) => id === 'all' || present.has(id));
  };

  // Above this many pins, every caption at once is a wall of text rather than a
  // map. Past it, only the selected (or hovered) marker keeps its label, and the
  // category filters become the way to read a whole group at once.
  const LABEL_LIMIT = 15;

  function paint(root, st) {
    const rows = visibleIn(st);
    if (!rows.some(f => f.id === st.selectedId)) st.selectedId = rows[0]?.id || null;
    const markers = root.querySelector('[data-geo-markers]');
    if (!markers) return;
    const quiet = rows.length > LABEL_LIMIT;
    markers.classList.toggle('labels-quiet', quiet);
    const hint = root.querySelector('[data-geo-hint]');
    if (hint) hint.textContent = quiet
      ? `Showing ${rows.length} places — tap any marker for its name, or pick a category above to label a group.`
      : '';
    markers.innerHTML = rows.map(f => markerHtml(f, { selected:f.id === st.selectedId })).join('');
    markers.querySelectorAll('[data-feature-id]').forEach(btn => btn.addEventListener('click', () => {
      st.selectedId = btn.dataset.featureId; st.district = null; paint(root, st); paintDistricts(root, st);
    }));
    root.querySelectorAll('[data-geo-filter]').forEach(btn => {
      const on = btn.dataset.geoFilter === st.type;
      btn.classList.toggle('is-active', on); btn.setAttribute('aria-pressed', String(on));
    });
    renderInfo(root, st);
  }

  // A gentle graticule gives children a visual anchor for latitude and
  // longitude without turning the map into a dense atlas. The labelled centre
  // lines are the Equator (0° latitude) and Prime Meridian (0° longitude).
  // ⚠ Drawn FROM the projection, not from evenly spaced CSS gradients. The grid
  // used to be `background-size: 16.6667%` with the Equator and Prime Meridian
  // hard-coded at 50%/50%. On this artwork the Equator is at 52.33% and the
  // Prime Meridian at 47.54%, and Robinson's parallels are not evenly spaced at
  // all — so a card that names the Equator was pointing a child at the wrong
  // line. Meridians curve in Robinson; parallels stay straight.
  function worldGridHtml() {
    const P = PROJECTIONS.world;
    const pt = (lon, lat) => { const q = P.toPct(lon, lat); return `${q.left.toFixed(2)},${q.top.toFixed(2)}`; };
    const parts = [];
    for (let lon = -180; lon <= 180; lon += 30) {
      const pts = [];
      for (let lat = -90; lat <= 90; lat += 5) pts.push(pt(lon, lat));
      parts.push(`<polyline class="geo-grat${lon === 0 ? ' is-prime' : ''}" points="${pts.join(' ')}"/>`);
    }
    for (let lat = -60; lat <= 60; lat += 30) {
      parts.push(`<polyline class="geo-grat${lat === 0 ? ' is-equator' : ''}" points="${pt(-180, lat)} ${pt(180, lat)}"/>`);
    }
    const eq = P.toPct(-180, 0), pm = P.toPct(0, 90);
    return `<svg class="geo-world-grid" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${parts.join('')}</svg>`
         + `<span class="geo-world-equator" style="top:${eq.top.toFixed(2)}%">0° latitude · Equator</span>`
         + `<span class="geo-world-prime" style="left:${pm.left.toFixed(2)}%">0° longitude</span>`;
  }

  function render(container, opts = {}) {
    if (!container) return;
    const st = viewState(container);
    if (opts.features) st.features = opts.features;
    if (opts.island) st.island = opts.island;
    if (!_mounted.includes(container)) _mounted.push(container);

    const isle  = ISLANDS[st.island] || ISLANDS.mauritius;
    const base  = `<img class="geo-source-map${st.island === 'rodrigues' ? ' geo-rodrigues-source' : ''}${st.island === 'world' ? ' geo-world-source' : ''}" src="${isle.src}" alt="${esc(isle.alt)}" draggable="false">${st.island === 'world' ? worldGridHtml() : ''}`;
    const shape = isle.districts ? `<div class="geo-district-map" data-district-map>${base}</div>` : base;
    const tabs  = Object.entries(ISLANDS).map(([id, m]) => `<button type="button" data-geo-island="${id}" class="geo-island-tab ${st.island === id ? 'is-active' : ''}" aria-pressed="${st.island === id}">${m.tab}</button>`).join('');

    container.innerHTML = `<section class="geo-map-card" aria-label="${esc(isle.name)} interactive map">`
      + `<div class="geo-map-head"><div><h3>🗺️ Interactive Maps</h3><p>Choose an island and feature, then tap a marker to discover why it matters.</p></div><span class="geo-map-bonus">✨ Bonus explorer</span></div>`
      + `<div class="geo-island-tabs" role="group" aria-label="Choose an island">${tabs}</div>`
      + `<div class="geo-map-filters" role="group" aria-label="Filter map features">${typesOn(st).map(([id, icon, label]) => `<button type="button" class="geo-filter" data-geo-filter="${id}" aria-pressed="false">${icon} ${esc(label)}</button>`).join('')}</div>`
      + `<div class="geo-map-layout"><div class="geo-map-wrap" style="aspect-ratio:${isle.aspect.toFixed(5)}"><div class="geo-north">N ↑</div>${shape}<div class="geo-markers" data-geo-markers></div></div>`
      + `<aside class="geo-map-info" data-geo-info aria-live="polite"></aside></div>`
      + `<p class="geo-map-hint" data-geo-hint></p>`
      + `<p class="geo-map-note">Each connector line joins a label to its marked location. Use an atlas for exact coordinates.${isle.credit}</p></section>`;

    container.querySelectorAll('[data-geo-filter]').forEach(btn => btn.addEventListener('click', () => { st.type = btn.dataset.geoFilter || 'all'; paint(container, st); }));
    container.querySelectorAll('[data-geo-island]').forEach(btn => btn.addEventListener('click', () => {
      st.island = btn.dataset.geoIsland || 'mauritius'; st.type = 'all'; st.district = null; st.selectedId = null; render(container, {});
    }));
    paint(container, st);
    if (isle.districts) loadDistricts().then(() => paintDistricts(container, st));
    if (!st.features) loadPublished();
  }

  // ══ ADMIN MAP EDITOR ══════════════════════════════════════════════════════
  //  Works on a DRAFT copy. Nothing an admin drags or types touches the array
  //  the child's map paints until Publish — the old editor mutated the live
  //  FEATURES on pointerdown, so an abandoned edit stayed on screen for the rest
  //  of the session, and Save wrote whatever happened to be left in the form
  //  (which, after a drag, was the previously selected feature's text).
  let ed = null;

  function newEditor(root) {
    const draft = readJSON(DRAFT_KEY);
    const rows  = draft && Array.isArray(draft.rows) ? mergeOverrides(draft.rows) : clone(FEATURES);
    return {
      root, rows, island:'mauritius', filter:'all', search:'', zoom:100,
      selectedId:rows.find(f => islandOf(f) === 'mauritius')?.id || rows[0]?.id || null,
      district:null, districts:true, labels:true, placeMode:false,
      dirty:!!draft, undo:[], status:'', statusKind:'',
    };
  }
  const edSelected   = () => ed.rows.find(f => f.id === ed.selectedId) || null;
  const edIslandRows = () => ed.rows.filter(f => islandOf(f) === ed.island);
  function edListRows() {
    const q = ed.search.trim().toLowerCase();
    return edIslandRows().filter(f => (ed.filter === 'all' || f.type === ed.filter)
      && (!q || `${f.name} ${f.label || ''} ${f.type}`.toLowerCase().includes(q)));
  }
  // The selected feature is always drawn, whatever the filter and search say —
  // a filter that hides the pin you are dragging is a trap, not a filter.
  function edCanvasRows() {
    const q = ed.search.trim().toLowerCase();
    return edIslandRows().filter(f => f.id === ed.selectedId
      || ((ed.filter === 'all' || f.type === ed.filter) && (!q || `${f.name} ${f.label || ''}`.toLowerCase().includes(q))));
  }

  function pushUndo() {
    ed.undo.push(JSON.stringify({ rows:ed.rows, selectedId:ed.selectedId }));
    if (ed.undo.length > 30) ed.undo.shift();
  }
  function markDirty() {
    ed.dirty = true;
    writeJSON(DRAFT_KEY, { rows:diffFromDefaults(ed.rows), savedAt:new Date().toISOString() });
  }
  function edStatus(msg, kind) { ed.status = msg || ''; ed.statusKind = kind || ''; paintStatus(); }

  function renderEditor(container) {
    if (!container) return;
    if (!ed || ed.root !== container) ed = newEditor(container);
    loadPublished();

    container.innerHTML = `
      <div class="geo-ed">
        <div class="geo-ed-head">
          <div>
            <h3>🗺️ Interactive Map Editor</h3>
            <p>This canvas is the child's map — same base image, same projection, same labels. A drag creates a draft; use <b>Save &amp; publish</b> to send it to students.</p>
          </div>
          <div class="geo-ed-actions">
            <span class="geo-ed-dirty" data-ed-dirty></span>
            <button type="button" class="geo-ed-btn" data-ed-undo>↶ Undo</button>
            <button type="button" class="geo-ed-btn" data-ed-discard>Discard draft</button>
            <button type="button" class="geo-ed-btn is-primary" data-ed-publish>💾 Save &amp; publish</button>
          </div>
        </div>
        <p class="geo-ed-status hidden" data-ed-status></p>
        <div class="geo-ed-body">
          <div class="geo-ed-main">
            <div class="geo-ed-toolbar">
              <select data-ed-island class="geo-editor-input geo-ed-island">${Object.entries(ISLANDS).map(([id, m]) => `<option value="${id}">${m.tab}</option>`).join('')}</select>
              <span class="geo-ed-chips" data-ed-filters></span>
            </div>
            <div class="geo-ed-toolbar">
              <label class="geo-ed-toggle"><input type="checkbox" data-ed-districts> Districts</label>
              <label class="geo-ed-toggle"><input type="checkbox" data-ed-labels> Labels</label>
              <label class="geo-ed-toggle"><input type="checkbox" data-ed-place> Click map to place</label>
              <label class="geo-ed-zoom">Zoom <input data-ed-zoom type="range" min="100" max="400" step="10" value="100"><span data-ed-zoomval>100%</span></label>
              <button type="button" class="geo-ed-btn" data-ed-zoomreset>Reset view</button>
            </div>
            <div class="geo-ed-canvas" data-ed-canvas>
              <div class="geo-ed-zoomlayer" data-ed-zoomlayer></div>
            </div>
            <p class="geo-ed-hint" data-ed-hint></p>
            <div class="geo-ed-save-bar">
              <span data-ed-save-copy>Changes are saved as a draft on this device until you publish.</span>
              <button type="button" class="geo-ed-btn is-primary" data-ed-publish>💾 Save &amp; publish to student map</button>
            </div>
          </div>
          <aside class="geo-ed-side">
            <input data-ed-search class="geo-editor-input" type="search" placeholder="Search features…" autocomplete="off">
            <div class="geo-ed-list" data-ed-list></div>
            <div class="geo-ed-form" data-ed-form></div>
          </aside>
        </div>
        <details class="geo-ed-preview">
          <summary>Preview exactly what a child sees</summary>
          <div data-ed-preview></div>
        </details>
      </div>`;

    bindShell(container);
    paintAll();
  }

  function bindShell(root) {
    const q = sel => root.querySelector(sel);
    q('[data-ed-island]').value = ed.island;
    q('[data-ed-island]').addEventListener('change', e => {
      ed.island = e.target.value; ed.district = null;
      const cur = edSelected();
      if (!cur || islandOf(cur) !== ed.island) ed.selectedId = edIslandRows()[0]?.id || null;
      paintAll();
    });
    // The chips are rebuilt per island by paintFilters(), so the click handler
    // is delegated rather than bound to buttons that will not survive.
    root.querySelector('[data-ed-filters]').addEventListener('click', e => {
      const btn = e.target.closest('[data-ed-filter]');
      if (!btn) return;
      ed.filter = btn.dataset.edFilter; paintFilters(); paintCanvas(); paintList();
    });
    q('[data-ed-search]').addEventListener('input', e => { ed.search = e.target.value; paintList(); paintCanvas(); });
    q('[data-ed-districts]').addEventListener('change', e => { ed.districts = e.target.checked; paintCanvas(); });
    q('[data-ed-labels]').addEventListener('change', e => { ed.labels = e.target.checked; paintCanvas(); });
    q('[data-ed-place]').addEventListener('change', e => {
      ed.placeMode = e.target.checked;
      q('[data-ed-canvas]').classList.toggle('is-placing', ed.placeMode);
      paintHint();
    });
    q('[data-ed-zoom]').addEventListener('input', e => { ed.zoom = Number(e.target.value); applyZoom(); });
    q('[data-ed-zoomreset]').addEventListener('click', () => { ed.zoom = 100; q('[data-ed-zoom]').value = 100; applyZoom(); q('[data-ed-canvas]').scrollTo({ left:0, top:0 }); });
    q('[data-ed-undo]').addEventListener('click', undo);
    q('[data-ed-discard]').addEventListener('click', discardDraft);
    root.querySelectorAll('[data-ed-publish]').forEach(btn => btn.addEventListener('click', publish));
    root.querySelector('.geo-ed-preview').addEventListener('toggle', e => { if (e.target.open) paintPreview(); });
  }

  function paintAll() { paintStatus(); paintFilters(); paintToggles(); paintCanvas(); paintList(); paintForm(); paintHint(); }

  function paintStatus() {
    const root = ed.root;
    const dirty = root.querySelector('[data-ed-dirty]');
    if (dirty) { dirty.textContent = ed.dirty ? '● Unpublished draft' : '✓ Matches what children see'; dirty.className = `geo-ed-dirty ${ed.dirty ? 'is-dirty' : ''}`; }
    const st = root.querySelector('[data-ed-status]');
    if (st) { st.textContent = ed.status; st.className = `geo-ed-status ${ed.statusKind ? 'is-' + ed.statusKind : ''}`; st.classList.toggle('hidden', !ed.status); }
    const undoBtn = root.querySelector('[data-ed-undo]');
    if (undoBtn) undoBtn.disabled = !ed.undo.length;
  }
  function paintFilters() {
    const box = ed.root.querySelector('[data-ed-filters]');
    // Same rule as the child's map: only categories this island actually has.
    const present = new Set(ed.rows.filter(f => islandOf(f) === ed.island).map(f => f.type));
    const types = TYPES.filter(([id]) => id === 'all' || present.has(id));
    if (!types.some(([id]) => id === ed.filter)) ed.filter = 'all';
    box.innerHTML = types.map(t => `<button type="button" data-ed-filter="${t[0]}" class="geo-editor-filter">${t[1]} ${esc(t[2])}</button>`).join('');
    ed.root.querySelectorAll('[data-ed-filter]').forEach(btn => btn.classList.toggle('is-active', btn.dataset.edFilter === ed.filter));
  }
  function paintToggles() {
    const root = ed.root, isle = ISLANDS[ed.island];
    const d = root.querySelector('[data-ed-districts]');
    d.checked = ed.districts && isle.districts; d.disabled = !isle.districts;
    d.closest('.geo-ed-toggle').classList.toggle('is-disabled', !isle.districts);
    root.querySelector('[data-ed-labels]').checked = ed.labels;
    root.querySelector('[data-ed-place]').checked = ed.placeMode;
  }
  function paintHint() {
    const el = ed.root.querySelector('[data-ed-hint]');
    if (!el) return;
    const f = edSelected();
    const where = !f ? '—' : (isGeographic(islandOf(f)) && f.lon != null)
      ? `lon ${Number(f.lon).toFixed(4)}, lat ${Number(f.lat).toFixed(4)}`
      : `x ${Math.round(f.x || 0)}, y ${Math.round(f.y || 0)}`;
    el.innerHTML = `Drag a <b>pin</b> to move the place · drag its <b>label</b> to move the caption${ed.placeMode ? ' · click the map to place the selected pin' : ''} — <span class="geo-ed-coord">${esc(where)}</span>`;
  }

  function applyZoom() {
    const layer = ed.root.querySelector('[data-ed-zoomlayer]');
    const val   = ed.root.querySelector('[data-ed-zoomval]');
    // Height, not width: the map is taller than it is wide, so the canvas is
    // height-bounded and 100% must mean "fits". Width follows from aspect-ratio.
    if (layer) layer.style.height = ed.zoom + '%';
    if (val) val.textContent = ed.zoom + '%';
  }

  // ⚠ Zoom resizes the LAYER holding the base image AND every pin together, so
  // a percentage still means the same point. The old editor scaled the <img>
  // alone and left the pins where they were: at any zoom but 100% it showed a
  // placement that existed nowhere.
  function paintCanvas() {
    const isle  = ISLANDS[ed.island];
    const layer = ed.root.querySelector('[data-ed-zoomlayer]');
    if (!layer) return;
    endDrag();
    const rows = edCanvasRows();
    layer.style.aspectRatio = isle.aspect.toFixed(5);
    layer.classList.toggle('hide-labels', !ed.labels);
    layer.innerHTML = `<img class="geo-source-map${ed.island === 'world' ? ' geo-world-source' : ''}" src="${isle.src}" alt="${esc(isle.alt)}" draggable="false">`
      + (ed.island === 'world' ? worldGridHtml() : '')
      + (isle.districts && ed.districts ? districtSvg(ed.district) : '')
      + `<div class="geo-markers">${rows.map(f => markerHtml(f, { selected:f.id === ed.selectedId, editor:true })).join('')}</div>`;
    applyZoom();

    layer.querySelectorAll('[data-district]').forEach(path => path.addEventListener('click', () => {
      if (ed.placeMode) return;
      ed.district = ed.district === path.dataset.district ? null : path.dataset.district; paintCanvas();
    }));
    layer.querySelectorAll('[data-ed-feature]').forEach(btn => bindMarker(btn, layer));
    // Do not redraw merely because the request settled. When the district file
    // is unavailable (offline, stale cache, or a bad deployment), loadDistricts
    // resolves to null; repainting then starts the same failed request again in
    // a microtask loop and can freeze the entire Admin page.
    if (isle.districts && ed.districts && !districtGeoJSON) {
      // Capture what this paint was FOR. `root` is not in scope here, and
      // reaching for it threw on every editor open that happened before the
      // district file was cached — which is every first open.
      const forRoot = ed.root, forIsland = ed.island;
      loadDistricts().then(data => {
        if (data && ed && ed.root === forRoot && ed.island === forIsland && ed.districts) paintCanvas();
      });
    }

    layer.addEventListener('pointerdown', e => {
      const f = edSelected();
      if (!ed.placeMode || !f || e.target.closest('[data-ed-feature]')) return;
      pushUndo();
      const p = pointerPct(e, layer);
      setPosition(f, ed.island, p.left, p.top);
      markDirty(); paintCanvas(); paintForm(); paintHint(); paintStatus();
    });
  }

  // ⚠ A drag NEVER repaints the canvas. Selecting on pointerdown used to call
  // paintCanvas(), which replaces the markers' innerHTML and so destroys the very
  // button the pointer is on: the pointerup that ends the drag then has no
  // element to land on, the move listener is never removed, and the next drag on
  // ANY marker fires both handlers. Measured in the harness: a label drag on one
  // feature silently rewrote a different feature's coordinates. Selection during
  // a drag therefore only toggles a class and repaints the side panel.
  let _drag = null;
  function endDrag() {
    if (!_drag) return;
    _drag.el.removeEventListener('pointermove', _drag.move);
    _drag.el.removeEventListener('pointerup', _drag.end);
    _drag.el.removeEventListener('pointercancel', _drag.end);
    _drag = null;
  }

  function bindMarker(btn, layer) {
    const id = btn.dataset.edFeature;
    const label = btn.querySelector('.geo-marker-label');
    // A full repaint is right for a plain click — the filter may have to bring
    // the newly selected pin back onto the canvas. In-place is right mid-drag.
    const select = () => { if (ed.selectedId !== id) { ed.selectedId = id; paintCanvas(); paintList(); paintForm(); paintHint(); } };
    const selectInPlace = () => {
      if (ed.selectedId === id) return;
      ed.selectedId = id;
      layer.querySelectorAll('[data-ed-feature]').forEach(b => b.classList.toggle('is-selected', b.dataset.edFeature === id));
      paintList(); paintForm(); paintHint();
    };

    const startDrag = (event, kind) => {
      event.preventDefault(); event.stopPropagation();
      endDrag();
      // ⚠ Select FIRST, and repaint the side panel with it. The old editor
      // changed the selection on pointerdown and left the panel showing the
      // previous feature, so the next Save wrote one place's name and fact onto
      // another.
      selectInPlace();
      const f = ed.rows.find(x => x.id === id);
      if (!f) return;
      pushUndo();
      const start = { x:event.clientX, y:event.clientY, lx:Number(f.lx ?? 16), ly:Number(f.ly ?? -22) };
      let moved = false;
      try { btn.setPointerCapture(event.pointerId); } catch (_) {}
      const move = e => {
        moved = true;
        if (kind === 'pin') {
          const p = pointerPct(e, layer);
          setPosition(f, ed.island, p.left, p.top);
          btn.style.left = p.left.toFixed(2) + '%';
          btn.style.top  = p.top.toFixed(2) + '%';
        } else {
          f.lx = Math.round(start.lx + (e.clientX - start.x));
          f.ly = Math.round(start.ly + (e.clientY - start.y));
          const lbl = btn.querySelector('.geo-marker-label');
          const leader = btn.querySelector('.geo-marker-leader');
          lbl.style.setProperty('--label-x', f.lx + 'px');
          lbl.style.setProperty('--label-y', f.ly + 'px');
          leader.style.setProperty('--leader-length', Math.max(8, Math.hypot(f.lx, f.ly) - 5).toFixed(1) + 'px');
          leader.style.setProperty('--leader-angle', (Math.atan2(f.ly, f.lx) * 180 / Math.PI).toFixed(1) + 'deg');
        }
        paintHint();
      };
      const end = () => {
        endDrag();
        if (!moved) { ed.undo.pop(); paintStatus(); return; }
        markDirty(); paintForm(); paintStatus();
        edStatus(`Moved “${f.name}”. Publish to send it to children.`, 'info');
      };
      _drag = { el:btn, move, end };
      btn.addEventListener('pointermove', move);
      btn.addEventListener('pointerup', end);
      btn.addEventListener('pointercancel', end);
    };

    btn.addEventListener('pointerdown', e => { if (!e.target.closest('.geo-marker-label')) startDrag(e, 'pin'); });
    if (label) label.addEventListener('pointerdown', e => startDrag(e, 'label'));
    btn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); select(); });
  }

  // 21 features and growing: hunting for one by clicking pins is not a way to
  // find anything. The list is the selector; the map is for placement.
  function paintList() {
    const box = ed.root.querySelector('[data-ed-list]');
    if (!box) return;
    const rows = edListRows();
    box.innerHTML = rows.length
      ? rows.map(f => `<button type="button" class="geo-ed-row ${f.id === ed.selectedId ? 'is-active' : ''}" data-ed-pick="${esc(f.id)}">`
          + `<span class="geo-ed-row-icon geo-${esc(f.type)}">${esc(f.icon)}</span>`
          + `<span class="geo-ed-row-text"><b>${esc(f.name)}</b><i>${esc(typeMeta(f.type)?.[2] || f.type)}${f.hidden ? ' · hidden' : ''}${DEFAULTS.some(d => d.id === f.id) ? '' : ' · custom'}</i></span></button>`).join('')
      : `<p class="geo-ed-empty">No features match.</p>`;
    box.querySelectorAll('[data-ed-pick]').forEach(btn => btn.addEventListener('click', () => {
      ed.selectedId = btn.dataset.edPick; paintList(); paintCanvas(); paintForm(); paintHint();
    }));
  }

  function paintForm() {
    const box = ed.root.querySelector('[data-ed-form]');
    if (!box) return;
    const f = edSelected();
    if (!f) {
      box.innerHTML = `<p class="geo-ed-empty">Nothing selected.</p><button type="button" class="geo-ed-btn is-primary geo-ed-wide" data-ed-add>+ Add feature</button>`;
      box.querySelector('[data-ed-add]').addEventListener('click', addFeature);
      return;
    }
    const isDefault = DEFAULTS.some(d => d.id === f.id);
    // Mauritius and Rodrigues carry real lon/lat; the world map is a percentage
    // grid. The numeric fields follow whichever this feature actually uses, so
    // the boxes never invite a coordinate the projection would ignore.
    const onMauritius = isGeographic(islandOf(f)) && f.lon != null;
    const icons = [...new Set([...(TYPE_ICONS[f.type] || []), f.icon])];
    box.innerHTML = `
      <div class="geo-ed-form-head"><span class="geo-ed-row-icon geo-${esc(f.type)}">${esc(f.icon)}</span><b>${esc(f.name)}</b></div>
      <label class="geo-ed-label">Name — the heading on the fact card</label>
      <input data-f="name" class="geo-editor-input" value="${esc(f.name)}">
      <label class="geo-ed-label">Map label — keep it short, it sits on the map</label>
      <input data-f="label" class="geo-editor-input" value="${esc(f.label || '')}" placeholder="${esc(f.name)}">
      <label class="geo-ed-label">Category — sets the filter it appears under and the pin colour</label>
      <select data-f="type" class="geo-editor-input">${TYPES.slice(1).map(t => `<option value="${t[0]}" ${t[0] === f.type ? 'selected' : ''}>${t[1]} ${esc(t[2])}</option>`).join('')}</select>
      <label class="geo-ed-label">Icon</label>
      <div class="geo-ed-icons">${icons.map(ic => `<button type="button" class="geo-ed-icon ${ic === f.icon ? 'is-active' : ''}" data-ed-icon="${esc(ic)}">${esc(ic)}</button>`).join('')}<input data-f="icon" class="geo-editor-input geo-ed-icon-input" value="${esc(f.icon)}" maxlength="4" aria-label="Custom icon"></div>
      <label class="geo-ed-label">Island</label>
      <select data-f="island" class="geo-editor-input">${Object.entries(ISLANDS).map(([id, m]) => `<option value="${id}" ${islandOf(f) === id ? 'selected' : ''}>${m.tab}</option>`).join('')}</select>
      <label class="geo-ed-label">Learning fact</label>
      <textarea data-f="fact" class="geo-editor-input geo-ed-fact">${esc(f.fact)}</textarea>
      <label class="geo-ed-label">Position${onMauritius ? ' — longitude, latitude' : ' — x, y'}</label>
      <div class="geo-ed-pair">
        <input data-f="${onMauritius ? 'lon' : 'x'}" type="number" step="${onMauritius ? '0.0001' : '1'}" class="geo-editor-input" value="${onMauritius ? Number(f.lon).toFixed(4) : Math.round(f.x || 0)}">
        <input data-f="${onMauritius ? 'lat' : 'y'}" type="number" step="${onMauritius ? '0.0001' : '1'}" class="geo-editor-input" value="${onMauritius ? Number(f.lat).toFixed(4) : Math.round(f.y || 0)}">
      </div>
      <label class="geo-ed-label">Label offset from the pin — px across, px down</label>
      <div class="geo-ed-pair">
        <input data-f="lx" type="number" step="1" class="geo-editor-input" value="${Math.round(Number(f.lx ?? 16))}">
        <input data-f="ly" type="number" step="1" class="geo-editor-input" value="${Math.round(Number(f.ly ?? -22))}">
      </div>
      <div class="geo-ed-form-actions">
        <button type="button" class="geo-ed-btn is-primary geo-ed-wide" data-ed-add>+ Add feature</button>
        <button type="button" class="geo-ed-btn" data-ed-duplicate>Duplicate</button>
        ${isDefault ? `<button type="button" class="geo-ed-btn" data-ed-reset>Reset to built-in</button>` : ''}
        <button type="button" class="geo-ed-btn is-danger" data-ed-remove>${f.hidden ? 'Show on map' : (isDefault ? 'Hide from map' : 'Delete')}</button>
      </div>`;

    box.querySelectorAll('[data-f]').forEach(input => {
      const key = input.dataset.f;
      const commit = () => {
        const cur = edSelected();
        if (!cur) return;
        if (key === 'island') {
          const value = input.value;
          if (value === islandOf(cur)) return;
          pushUndo();
          // Keep the same relative spot on the new island rather than dropping
          // the pin at 0,0 in a coordinate system it has never been in.
          const pos = markerPosition(cur);
          if (value === 'mauritius') delete cur.island; else cur.island = value;
          setPosition(cur, value, pos.left, pos.top);
          ed.island = value;
          markDirty(); paintAll();
          return;
        }
        if (['lon','lat','x','y','lx','ly'].includes(key)) {
          const n = Number(input.value);
          if (!Number.isFinite(n)) return;
          cur[key] = n;
        } else if (key === 'name')  { cur.name  = input.value.trim() || cur.name; }
        else if (key === 'label')   { cur.label = input.value.trim() || cur.name; }
        else if (key === 'icon')    { cur.icon  = input.value.trim() || cur.icon; }
        else if (key === 'type')    { cur.type  = input.value; paintForm(); }
        else                        { cur[key]  = input.value; }
        markDirty(); paintCanvas(); paintList(); paintHint(); paintStatus();
      };
      input.addEventListener('input', commit);
      input.addEventListener('change', commit);
    });
    box.querySelectorAll('[data-ed-icon]').forEach(btn => btn.addEventListener('click', () => {
      const cur = edSelected(); if (!cur) return;
      cur.icon = btn.dataset.edIcon; markDirty(); paintForm(); paintCanvas(); paintList(); paintStatus();
    }));
    box.querySelector('[data-ed-add]').addEventListener('click', addFeature);
    box.querySelector('[data-ed-duplicate]').addEventListener('click', duplicateFeature);
    box.querySelector('[data-ed-remove]').addEventListener('click', toggleRemove);
    box.querySelector('[data-ed-reset]')?.addEventListener('click', resetFeature);
  }

  function addFeature() {
    pushUndo();
    const f = { id:`custom-${Date.now().toString(36)}`, type:'heritage', icon:'📍',
                name:'New feature', label:'New feature', lx:16, ly:-22, fact:'Add a learning fact.' };
    if (ed.island === 'rodrigues') f.island = 'rodrigues';
    setPosition(f, ed.island, 50, 50);
    ed.rows.push(f); ed.selectedId = f.id;
    markDirty(); paintAll();
    ed.root.querySelector('[data-f="name"]')?.focus();
    edStatus('Added a feature at the centre of the map — drag its pin into place.', 'info');
  }
  function duplicateFeature() {
    const src = edSelected(); if (!src) return;
    pushUndo();
    const f = { ...src, id:`custom-${Date.now().toString(36)}`, name:`${src.name} (copy)`, label:`${src.label || src.name} (copy)`, hidden:false };
    ed.rows.push(f); ed.selectedId = f.id;
    markDirty(); paintAll();
  }
  // A built-in is hidden rather than deleted: its id then still means one thing
  // on every install, and a published payload can bring it back.
  function toggleRemove() {
    const f = edSelected(); if (!f) return;
    if (DEFAULTS.some(d => d.id === f.id)) { pushUndo(); f.hidden = !f.hidden; }
    else {
      if (!confirm(`Delete “${f.name}”? Undo can bring it back until you publish.`)) return;
      pushUndo();
      ed.rows = ed.rows.filter(x => x.id !== f.id);
      ed.selectedId = edIslandRows()[0]?.id || null;
    }
    markDirty(); paintAll();
  }
  function resetFeature() {
    const f = edSelected(); if (!f) return;
    const d = DEFAULTS.find(x => x.id === f.id); if (!d) return;
    pushUndo();
    ed.rows[ed.rows.indexOf(f)] = { ...d };
    markDirty(); paintAll();
    edStatus(`“${d.name}” restored to its built-in version.`, 'info');
  }
  function undo() {
    const snap = ed.undo.pop(); if (!snap) return;
    const prev = JSON.parse(snap);
    ed.rows = prev.rows; ed.selectedId = prev.selectedId;
    markDirty(); paintAll();
  }
  function discardDraft() {
    if (ed.dirty && !confirm('Discard every unpublished change and go back to the published map?')) return;
    try { localStorage.removeItem(DRAFT_KEY); } catch (_) {}
    ed = newEditor(ed.root);
    renderEditor(ed.root);
    edStatus('Draft discarded — showing the published map.', 'info');
  }

  // The real child component, rendered from the draft: the last check before
  // publishing is the thing itself, not a description of it.
  function paintPreview() {
    const box = ed.root.querySelector('[data-ed-preview]');
    if (!box) return;
    box.__geo = null;
    render(box, { features:clone(ed.rows), island:ed.island });
  }

  // ── Publish ───────────────────────────────────────────────────────────────
  // ⚠ The old save was fire-and-forget through Store.mmSet and toasted success
  // whatever happened. It also never reached a child: nothing on any client ever
  // read the key back. Both halves are fixed here — this awaits the write, then
  // probes the row AS AN ANONYMOUS CALLER, which is exactly what a child's
  // session is, and reports what it actually found.
  async function publish() {
    const buttons = [...ed.root.querySelectorAll('[data-ed-publish]')];
    buttons.forEach(btn => { btn.disabled = true; btn.textContent = 'Publishing…'; });
    const markers = diffFromDefaults(ed.rows);
    const payload = { version:2, updatedAt:new Date().toISOString(), markers };
    let res = { ok:false, error:'Supabase is not available.' };
    try {
      if (typeof Store !== 'undefined' && Store.mmSave) res = await Store.mmSave(MM_KEY, payload);
    } catch (e) { res = { ok:false, error:e?.message || String(e) }; }
    buttons.forEach(btn => { btn.disabled = false; btn.textContent = btn.closest('.geo-ed-save-bar') ? '💾 Save & publish to student map' : '💾 Save & publish'; });

    if (!res.ok) { edStatus(`Not published — ${res.error || 'the server refused the write'}. Your draft is still here.`, 'bad'); return; }

    writeJSON(PUBLISHED_KEY, { markers, updatedAt:payload.updatedAt });
    try { localStorage.removeItem(DRAFT_KEY); } catch (_) {}
    applyPublished(markers);
    ed.dirty = false;
    paintStatus();
    const readable = await probePublicRead();
    if (readable === false)     edStatus('Saved — but children cannot read it yet: the geo_map_content read policy is missing. Run supabase-geo-map.sql, then publish again to re-check.', 'warn');
    else if (readable === null) edStatus('Published. The public-read check could not run (offline?).', 'good');
    else                        edStatus('Published, and confirmed readable by a child session.', 'good');
    paintAll();
    if (typeof toast === 'function') toast('Map published.', 2500);
  }

  // A deliberate raw fetch with the publishable key and NO Authorization header:
  // that runs as `anon`, the role a child's session actually uses. Asking the
  // admin's own session would answer "yes" whatever the policy says. RLS denies
  // by returning an empty array, not an error, so the row count is the answer.
  async function probePublicRead() {
    if (typeof SB_URL === 'undefined' || typeof SB_KEY === 'undefined') return null;
    try {
      const r = await fetch(`${SB_URL}/rest/v1/mm_data?key=eq.${MM_KEY}&select=key`, { headers:{ apikey:SB_KEY, accept:'application/json' } });
      if (!r.ok) return false;
      const rows = await r.json();
      return Array.isArray(rows) && rows.length === 1;
    } catch (_) { return null; }
  }

  return { render, renderEditor, loadPublished, markerPosition, DEFAULTS };
})();
